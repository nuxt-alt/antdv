import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore
import lessToJs from 'less-vars-to-js';

const compactLess = fs.readFileSync(path.resolve('node_modules/ant-design-vue/es/style/themes/compact.less'), 'utf8');

const compactPaletteLess = lessToJs(compactLess, {
    stripPrefix: true,
    resolveVariables: false,
});

export default compactPaletteLess;