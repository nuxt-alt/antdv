import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore
import lessToJs from 'less-vars-to-js';

const darkLess = fs.readFileSync(path.resolve('node_modules/ant-design-vue/es/style/themes/dark.less'), 'utf8');

const darkPaletteLess = lessToJs(darkLess, {
    stripPrefix: true,
    resolveVariables: false,
});

export default darkPaletteLess;