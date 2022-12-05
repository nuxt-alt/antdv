import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore
import lessToJs from 'less-vars-to-js';

const colorLess = fs.readFileSync(path.resolve('node_modules/ant-design-vue/es/style/color/colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.resolve('node_modules/ant-design-vue/es/style/themes/default.less'), 'utf8');

const defaultPaletteLess = lessToJs(`${colorLess}${defaultLess}`, {
    stripPrefix: true,
    resolveVariables: false,
});

export default defaultPaletteLess;