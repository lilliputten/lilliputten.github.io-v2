/* eslint-env es6, node, commonjs */

// import config from './config.js';
import config = require('./config.js');

// // TODO: Export by `__submodules` list?
// module.exports.default = config;
// if (Array.isArray(config.__submodules)) {
//   config.__submodules.map((id: string) => module.exports[id] = config[id]);
// }

// Static export (due to TS errors; TODO?)
export default config;
export const css = config.css;
export const site = config.site;
export const pages = config.pages;
