import type { ModuleOptions, ThemeConfig } from './types'
import { name, version } from '../package.json'
import { addImports, addPlugin, defineNuxtModule, createResolver } from '@nuxt/kit'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { defu } from 'defu'

import path from 'node:path'
import Components from 'unplugin-vue-components/vite'

import less from 'less'
import defaultVars from './default-vars'
import dark from './dark-vars'
import compactPaletteLess from './compact-vars'

const CONFIG_KEY = 'antdv'

export default defineNuxtModule({
    meta: {
        name,
        version,
        configKey: CONFIG_KEY,
        compatibility: {
            nuxt: '^3.0.0'
        }
    },
    defaults: {
        styles: 'less',
        icons: true,
        themes: {
            dark: false,
            light: false,
            prefixClass: 'ant',
            suffix: '-theme',
            mode: 'default'
        },
        themeConfig: []
    } as ModuleOptions,
    async setup(moduleOptions, nuxt) {
        const options: ModuleOptions = moduleOptions
        const { resolve } = createResolver(import.meta.url)

        if (options.styles === 'css') {
            nuxt.options.css.unshift('ant-design-vue/dist/antd.css')
        }

        if (options.styles === 'less' && options.themes.mode === 'default') {
            nuxt.options.css.unshift('ant-design-vue/dist/antd.less')
        }

        // Transpile
        nuxt.options.build = defu(nuxt.options.build, {
            transpile: [
                ...(nuxt.options.dev ? []: ['@babel/runtime']),
                ...(options.icons ? ['@ant-design/icons-vue'] : []),
                'dayjs',
                'ant-design-vue',
                'lodash-es'
            ]
        })

        nuxt.hook('vite:extendConfig', config => {
            if (options.styles === 'less' && options.themes.mode === 'custom') {
                const themes = [
                    ...options.themes.dark ? darkTheme(options) : [],
                    ...options.themes.light ? lightTheme(options) : [],
                    ...options.themeConfig!
                ]

                config.css = defu(config.css, {
                    preprocessorOptions: {
                        less: {
                            javascriptEnabled: true,
                            additionalData: (content: string, filename: string) => additionalData(options, themes, content, filename),
                        }
                    }
                })
            }

            if (options.styles === 'less' && options.themes.mode === 'default') {
                config.css = defu(config.css, {
                    preprocessorOptions: {
                        less: {
                            javascriptEnabled: true
                        }
                    }
                })
            }

            config.optimizeDeps = defu(config.optimizeDeps, {
                includes: [
                    ...(options.icons ? ['@ant-design/icons-vue'] : []),
                    'lodash-es',
                    'dayjs',
                ]
            })

            // Vuetify plugin configuration
            config.plugins = [
                ...(config.plugins || []),
                Components({
                    resolvers: [
                        AntDesignVueResolver({
                            cjs: false,
                            resolveIcons: options.icons,
                            importStyle: options.styles
                        })
                    ]
                }),
            ]

            config.ssr = defu(config.ssr, {
                noExternal: ['ant-design-vue']
            })
        })

        addPlugin({
            src: resolve('./runtime/templates/plugin')
        })

        // vuetify-specific composables
        addImports([
            { from: 'ant-design-vue/es/form', name: 'useForm' },
        ])
    }
})

const darkTheme = (options: ModuleOptions) => [defu({
    theme: 'dark',
    themePrefix: 'dark',
    compact: false,
    modifyVars: {
        'text-color': 'fade(@white, 65%)',
        'gray-8': '@text-color',
        'background-color-base': '#555',
        'skeleton-color': 'rgba(0,0,0,0.8)'
    },
}, { 
    ...typeof options.themes.dark === 'object' ? options.themes.dark : {},
    dark: true,
})];

const lightTheme = (options: ModuleOptions) => [defu({
    theme: 'light',
    themePrefix: 'light',
    compact: false,
    modifyVars: {},
}, { 
    ...typeof options.themes.light === 'object' ? options.themes.light : {},
    dark: false,
})];

const additionalData = async (opts: ModuleOptions, themes: ThemeConfig, content: string, filename: string): Promise<string> => {
    const themePromises = themes.map(async theme => {
        const vars = theme.dark ? defu({ ...defaultVars, ...dark }) : defaultVars
        const compact = theme.compact ? defu(compactPaletteLess) : {}

        theme.modifyVars = Object.assign({
            hack: `true;@import "${path.resolve('node_modules/ant-design-vue/es/style/color/colorPalette.less')}";`,
            ...vars,
            ...compact
        }, theme.modifyVars)

        theme.modifyVars!['root-entry-name'] = theme.dark ? 'dark' : 'default'
        theme.modifyVars!['ant-prefix'] = opts.themes.prefixClass

        const { themePrefix, modifyVars = {} } = theme;

        const options = {
            javascriptEnabled: true,
            modifyVars,
            relativeUrls: true,
            filename
        };

        try {
            const { css } = await less.render(content, options);
            let res = '';
            if (themePrefix && css) {
                res = `
        .${themePrefix}${opts.themes.suffix} {
            ${css}
        }
        `;
            }
            return Promise.resolve(res);
        } catch (error) {
            console.log(error);
            return Promise.reject(content);
        }
    });

    let res = content;
    for (const themePromise of themePromises) {
        const theme = await themePromise;
        res += theme;
    }

    return res;
};