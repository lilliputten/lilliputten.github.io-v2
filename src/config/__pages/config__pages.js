/* eslint-env commonjs, browser, node */
/* globals modules */
/**
 * @module config__pages
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.11.29, 01:38
 * @version 2018.11.29, 01:38
 */

(function(){

  /** pages ** {{{ */
  var pages = /** @lends config__pages.prototype */ {

    urlPrefix: '/site',

    indexName: 'index',
    extension: '.md',

  };/*}}}*/

  /** Universal export... ** {{{ */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = pages;
  }/*}}}*/
  /** YM export... ** {{{ */
  if (typeof modules === 'object' && typeof modules.define === 'function') {
    modules.define('config__pages', [], function(provide) {
      provide(pages);
    });
  }/*}}}*/

})();
