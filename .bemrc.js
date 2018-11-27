/* eslint-env es6, node, commonjs */
module.exports = {
  levels: [
    { path: 'src/blocks/layout', layer: 'common' },
    { path: 'src/blocks/pages', layer: 'common' },
    { path: 'src/blocks/demo', layer: 'common' },
    // {
    //   layer: 'desktop',
    //   path: 'src/desktop'
    // },
    // {
    //   layer: 'touch',
    //   path: 'src/touch'
    // }
  ].map(level => Object.assign({
    schemeOptions: 'react',
    naming: 'react',
    scheme: 'nested' }, level)
  ),
  // remove sets to build one universal bundle for index.html
  // sets: {
  //   desktop: 'common desktop',
  //   touch: 'common touch'
  // },
  modules: {
    'bem-tools': {
      plugins: {
        create: {
          levels: {
            'src/blocks/layout': { default: true }
          },
          techs: ['tsx', 'css'],
          templates: {
            tsx: '.bem/templates/tsx.js'
          }
        }
      }
    }
  }
};
