/* eslint-env es6, node, commonjs */

// import config from './config.js';
import config = require('./config.js');

// // TODO: Export by `__submodules` list?
// module.exports.default = config;
// if (Array.isArray(config.__submodules)) {
//   config.__submodules.map((id: string) => module.exports[id] = config[id]);
// }
//
// // Static export (due to TS errors; TODO?)
// export default config;
// export const css = config.css;
// export const site = config.site;

// TODO: Make imports compatible with VSCode Intellisense
// export const pages = config.pages;
export const css = require('./__css/config__css');
export const site = require('./__site/config__site');
export const pages = require('./__pages/config__pages');
export default { css, site, pages };
