import * as NuxtSchema from '@nuxt/schema'
import type { AntDesignVueResolverOptions } from 'unplugin-vue-components/resolvers'

interface ThemeConfigObject {
    theme: string
    themePrefix: string
    modifyVars: Record<string, any>
}

export interface ThemeConfig extends Array<ThemeConfigObject> {}

export interface ModuleOptions {
    themes: {
        suffix?: string
        mode?: 'light' | 'dark' | 'default' | 'both'
        prefixClass?: string
        lightVars?: Record<string, any>
        darkVars?: Record<string, any>
    }
    icons?: AntDesignVueResolverOptions['resolveIcons']
    styles?: AntDesignVueResolverOptions['importStyle']
    themeConfig?: ThemeConfig
}

declare module '@nuxt/schema' {
    interface NuxtConfig {
        antdv?: ModuleOptions
    }
    interface NuxtOptions {
        antdv?: ModuleOptions
    }
}

declare const NuxtAntdv: NuxtSchema.NuxtModule<ModuleOptions>

export default NuxtAntdv