/* eslint-env commonjs, browser, node */
/* globals modules */
/**
 * @module config
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.09.26, 23:11
 * @version 2018.11.29, 01:29
 *
 */

(function(__global){

  /** List of used submodules */
  var __submodules = [
    'css',
    'site',
    'pages',
  ]

  /** makeConfig ** {{{ Make config object from modules list
   * @param {Array} submodules
   * @return {Object}
   */
  function makeConfig (submodules) {

    var config = {}

    submodules.map(function(module, i){
      var id = __submodules[i]
      return config[id] = module
    })

    // Export to global scope
    __global.config = config

    return config
  }/*}}}*/

  // /** modules ** {{{ DEBUG: Fake modules object
  //  */
  // /* eslint-disable no-console, no-debugger */
  // var modules = {
  //   define: function (id, list, cb) {
  //     var provide = function(module) {
  //       console.log('provide', module);
  //     };
  //     console.log('define', id, list, cb);
  //     cb && cb.apply(window, [provide].concat(list));
  //   },
  // };/*}}}*/

  /** Universal export... ** {{{ */
  if (typeof module === 'object' && typeof module.exports === 'object') {

    /** submodules ** {{{ Make config modules list
     */
    var submodules = __submodules.map(function(id){

      // require commonjs module...
      try {
        var data = require('./__' + id + '/config__' + id + '.js')
      }
      catch(err) {
        var msg = 'Cannot load config module \'' + id + '\': '
        console.error(msg, err) // eslint-disable-line no-console
        debugger // eslint-disable-line no-debugger
        throw new Error(msg + (err.message || err))
      }

      // Export indiviudual __submodules...
      module.exports[id] = data

      return data

    })/*}}}*/

    // Make config object & store to global scope
    module.exports = makeConfig(submodules)
    module.exports.__submodules = __submodules

  }/*}}}*/
  /** YM export... ** {{{ */
  if (typeof modules === 'object' && typeof modules.define === 'function') {

    var configModuleNames = __submodules.map(function(id){ return 'config__' + id })

    modules.define('config', configModuleNames, function(provide /*, modules... */) {

      // Make config modules list from passed in arguments
      var submodules = Array.from(arguments).splice(1)

      // Make config object & store to global scope
      provide(makeConfig(submodules))

    })
  }/*}}}*/

})(typeof global !== 'undefined' ? global : typeof module !== 'undefined' ? module : typeof window !== 'undefined' ? window : this)
