import * as NuxtSchema from '@nuxt/schema'
import type { AntDesignVueResolverOptions } from 'unplugin-vue-components/resolvers'

interface ThemeConfigObject {
    theme?: string
    themePrefix: string
    compact: boolean
    dark: boolean
    modifyVars?: Record<string, any>
}

export interface ThemeConfig extends Array<ThemeConfigObject> {}

export interface ModuleOptions {
    themes: {
        light?: boolean | {
            compact?: boolean
            modifyVars?: Record<string, any>
        }
        dark?: boolean | {
            compact?: boolean
            modifyVars?: Record<string, any>
        }
        suffix?: string
        mode?: 'default' | 'custom'
        prefixClass?: string
    }
    themeConfig?: ThemeConfig
    icons?: AntDesignVueResolverOptions['resolveIcons']
    styles?: AntDesignVueResolverOptions['importStyle']
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