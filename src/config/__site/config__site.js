/* eslint-env commonjs, browser, node */
/* globals modules */
/**
 * @module config__site
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.09.26, 23:11
 * @version 2018.11.17, 06:57
 */

(function(){

  var siteAddr = 'dotnetweb';

  /** configSite ** {{{ */
  var configSite = /** @lends config__site.prototype */ {

    headerTitle: 'Project name',
    // headerLogo: '/img/Logo/itu-logo-white.svg',
    headerLink: '/',

    siteName: 'Site name',

    siteAddr: siteAddr,
    siteUrl: 'http://' + siteAddr,

  };/*}}}*/

  /** Universal export... ** {{{ */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = configSite;
  }/*}}}*/
  /** YM export... ** {{{ */
  if (typeof modules === 'object' && typeof modules.define === 'function') {
    modules.define('config__site', [], function(provide) {
      provide(configSite);
    });
  }/*}}}*/

})();
