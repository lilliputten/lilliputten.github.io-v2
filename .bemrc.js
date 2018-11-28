/* eslint-env es6, node, commonjs */

const levelsPath = 'src/blocks/';

const levelsList = [
  'interface',
  'layout',
  'pages',
  'demo',
];

const defaultLevel = 'interface';

module.exports = {

  levelsPath,
  levelsList,
  defaultLevel,

  levels: levelsList.map((path) => ({
    path: levelsPath + path,
    layer: 'common',
    schemeOptions: 'react',
    naming: 'react',
    scheme: 'nested',
  })),

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
            [levelsPath + defaultLevel]: { default: true },
          },
          techs: ['tsx', 'css'],
          templates: {
            tsx: '.bem/templates/tsx.js',
          },
        },
      },
    },
  },

};
