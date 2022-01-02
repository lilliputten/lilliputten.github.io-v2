
// import 'core-js/es6/map'
// import 'core-js/es6/set'
// import 'raf/polyfill'
// import 'lib/core/polyfills'

import 'es5-shim/es5-shim'
import 'es5-shim/es5-sham'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from 'blocks/layout/App/App'

import 'blocks/layout/Page/Page.css'

ReactDOM.render((
    <App path="src/blocks/layout/App/App.tsx" />
), document.getElementById('root'))
