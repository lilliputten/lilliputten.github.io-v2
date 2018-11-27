/* eslint-env es6, node, commonjs */

const config = require('./config.js');
// const { css } = config;
//
// export default config;
// export { css };
// export {...config};
module.exports = config;
module.exports.site = config.site;
module.exports.css = config.css;
