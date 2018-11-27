# bem-react-boilerplate-core3

## Config files

- `package.json`
- `.bemrc.js`
- `config-overrides.js`
- `jest.config.js`
- `.lvimrc`
- `tsconfig.json`
- `src/config/__css/config__css.js`
- `src/config/__site/config__site.js`

## Core node modules

bem-react-core-3:

- `node_modules/@bem-react/classname/README.md`
- `node_modules/@bem-react/di/README.md`

- `node_modules/@bem-react/core/build/cjs/core.development.js`
- `node_modules/@bem-react/classname/build/cjs/classname.development.js`
- `node_modules/@bem-react/di/build/cjs/di.development.js`

## Verbose commands

- `node node_modules/tslint/lib/tslintCli.js --help`

## Tips

### Typescript typings

```shell
npm install -D @types/react-router-dom
```

### 'value is never used' errors

For enabling/disabling errors/warnings `...is declared but its value is never
used...` set to true/false next strings in `tsconfig.json`:
```js
{
  // ...
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  // ...
}
```

## Docs & samples

- [A Simple React Router v4 Tutorial – Paul Sherman – Medium](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
- [React Router v4 <Route> Tester](https://pshrmn.github.io/route-tester/)

