> [Ant Design Vue](https://antdv.com) module for [Nuxt](https://nuxt.com)

## Infos
A somewhat comprehensive module for Ant Design Vue

## Setup

1. Add `@nuxt-alt/antdv` and `less` dependency to your project

```bash
yarn add @nuxt-alt/antdv less
```

2. Add `@nuxt-alt/antdv` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
    modules: [
        '@nuxt-alt/antdv'
    ],
    antdv: {
        /* module options */
    }
});

```

## Options

### `styles`

- Type: `String`
- Default: `less`

Whether to use `less` or `css` for procesing. Do note that all `themes` options will not work with `css` as it is a pre-generated file.

| Style | Description |
| --- | --- |
| less | Renders the stylesheet in less |
| css | Renders the stylesheet in css |

### `icons`

- Type: `Boolean`
- Default: `true`

Whether to enable resolving icons for ant-design-vue.

### `themes.suffix`

- Type: `String`
- Default: `-theme`

The suffix for when using the `custom` mode.

### `themes.mode`

- Type: `String`
- Default: `default`

The theme mode to choose for ant-design-vue, choosing `default` will disable the option to use custom themes as they rely on being enclosed in a class.

| Mode | Description |
| --- | --- |
| default | Renders the default theme of ant-design-vue, which is the light theme but without being enclosed into a theme class |
| custom | disables the default theme in favor of using the light and/or dark theme |

### `themes.dark`

- Type: `Object | boolean`
- Default: `false`

Modify the properties of the default dark theme.

| Properties | Type | Description |
| --- | --- | --- |
| compact | Boolean | Whether to use compact variables |
| theme | String | The theme's name |
| themePrefix | String | Prefix of the theme to use ofr enclosing |
| modifyVars | Object | The variables to edit for the theme |

### `themes.light`

- Type: `Object | boolean`
- Default: `false`

Modify the properties of the default light theme.

| Properties | Type | Description |
| --- | --- | --- |
| compact | Boolean | Whether to use compact variables |
| theme | String | The theme's name |
| themePrefix | String | Prefix of the theme to use ofr enclosing |
| modifyVars | Object | The variables to edit for the theme |

### `themes.prefixClass`

- Type: `String`
- Default: `ant`

Set the Class prefix for all the themes. For example instead of `ant-button`, if you were to set it as `app` it would then be `app-button`. You also need to change this in your `ConfigProvider` for ant-design-vue`

### `themeConfig`

- Type: `Array`
  - Items: `Object`
- Default: `[]`

You may register any other themes you wish to include in the preprocessing options.

Example (Example of a dark theme): 

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    antdv: {
        themeConfig: [{
            theme: 'dark',
            themePrefix: 'dark',
            dark: true,
            compact: false,
            modifyVars: {
                'text-color': 'fade(@white, 65%)',
                'gray-8': '@text-color',
                'background-color-base': '#555',
                'skeleton-color': 'rgba(0,0,0,0.8)',
                'root-entry-name': 'dark'
            },
        }]
    }
});
```

Setting the `dark` property will use the dark variables, setting the `compact` proprty will use compact variables.
