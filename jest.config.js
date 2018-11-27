module.exports = {
  testURL : 'http://localhost',
  testPathIgnorePatterns : ['node_modules'],
  moduleFileExtensions : ['ts', 'tsx', 'js'],
  transform : {
      '^.+\\.(ts|tsx)$' : 'ts-jest'
  },
  testMatch : [
      '**/src/**/*.test.+(ts|tsx)'
  ],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|svg)$': '<rootDir>/__mocks__/style.ts'
  },
  modulePaths : [
    '<rootDir>/src',
  ],
};
