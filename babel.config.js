/** @module babel.config
 *  @desc Babel configuration
 *  @since 2019.03.06, 12:00
 *  @changed 2021.11.24, 22:32
 */

const srcPath = './src'

/* // TODO: module-resolver...
 * // Prepare path aliases for `module-resolver` plugin (from `tsconfig.json:compilerOptions.paths`)...
 * const tsconfig = require('./tsconfig.json')
 * const tsconfigPaths = tsconfig.compilerOptions.paths
 * // prettier-ignore
 * const pathAliases = Object.entries(tsconfigPaths).reduce((result, [id, dirs]) => {
 *   const match = id.match(/^(@.*)\/\*$/)
 *   const setId = match && match[1]
 *   const dir = setId && Array.isArray(dirs) && dirs[0]
 *   if (setId && dir) {
 *     const cleanDir = dir.replace(/\[>\*$/, '')
 *     result[setId] = [srcPath, cleanDir].filter(Boolean).join('/')
 *   }
 *   return result
 * }, {})
 */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // targets: { ie: '11' },
        // useBuiltIns: 'usage', // NOTE: Causes over-transpiling (eg, for userAgent) and crashing in Chrome's DevTool with "Cannot assign to read only property 'exports' of object '#<Object>'" for config ES5 modules
        // corejs: 3,
        loose: true,
      },
    ],
    // ['@babel/preset-flow'],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    // '@babel/plugin-proposal-class-properties',
    // '@babel/plugin-transform-arrow-functions',
    // '@babel/plugin-proposal-optional-chaining',
    // '@babel/plugin-proposal-export-default-from', // Single-line export syntax
    // '@babel/plugin-syntax-export-namespace-from', // Single-line reexport as namespace -- https://www.npmjs.com/package/@babel/plugin-syntax-export-namespace-from
    /* // TODO: moudle-resolver...
     * [
     *   'module-resolver',
     *   {
     *     // https://github.com/tleunen/babel-plugin-module-resolver
     *     root: [srcPath],
     *     extenstions: ['.ts', '.tsx', '.js', '.jsx'],
     *     alias: pathAliases,
     *     // alias: pathAliasesOld,
     *   },
     * ],
     */
    // ['directory-resolver', { moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'] }], // https://github.com/mgcrea/babel-plugin-directory-resolver
  ],
}
