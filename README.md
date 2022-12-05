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

The suffix for when using the `dark` and/or `light` theme modes 

### `themes.mode`

- Type: `String`
- Default: `default`

The theme mode to choose for ant-design-vue

| Mode | Description |
| --- | --- |
| default | Renders the default theme of ant-design-vue, which is the light theme but without being enclosed into a theme class |
| dark | Renders only the dark theme of ant-design-vue enclosed in a dark theme class |
| light | Renders only the light theme of ant-design-vue enclosed in a light theme class |
| both | Renders both the dark and light theme of ant-design-vue enclosed in both a dark and light theme class |

### `themes.prefixClass`

- Type: `String`
- Default: `ant`

Set the Class prefix for all the themes. For example instead of `ant-button`, if you were to set it as `app` it would then be `app-button`. You also need to change this in your `ConfigProvider` for ant-design-vue`

### `themes.lightVars`

- Type: `Array`
  - Items: `String`
- Default: `[]`

Modify the varibles that are set for the light theme.

### `themes.darkVars`

- Type: `Array`
  - Items: `String`
- Default: `[]`

Modify the varibles that are set for the dark theme.

### `themeConfig`

- Type: `Array`
  - Items: `Object`
- Default: `[]`

You may register any other themes you wish to include in the preprocessing options. This options is pretty complicated to set up as you need some dependencies to work with.

Example (Example of the dark theme): 

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    antdv: {
        themeConfig: [{
            theme: 'dark',
            themePrefix: 'dark',
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

If the theme name has `dark` in it it will incorporate the dark variables so you just need to specify the variables you want to alter, otherwise it will use the default theme
