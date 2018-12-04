/* eslint-env commonjs, browser, node */
/* globals modules */
/**
 * @module config__site
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.09.26, 23:11
 * @version 2018.11.17, 06:57
 */

(function(){

  var siteAddr = 'https://lilliputten.github.io';

  var galleryRoot = 'https://res.cloudinary.com/lilliputten/image/upload/';
  var galleryId = 'v1542040058';
  var siteName = 'Lilliputten & Noble';

  /** configSite ** {{{ */
  var configSite = /** @lends config__site.prototype */ {

    headerTitle: siteName,
    // headerLogo: '/img/Logo/itu-logo-white.svg',
    headerLink: '/',

    titleDelim: ' — ',

    siteName: siteName,

    siteAddr: siteAddr,
    siteUrl: 'http://' + siteAddr,

    // Gallery...
    galleryRoot,
    galleryId,
    galleryThumb: ({url, width, height}) => `${galleryRoot}c_thumb${width ? ',w_' + width : ''}${height ? ',h_' + height : ''},g_face/${galleryId}/${url}`,
    galleryImage: ({url}) => `${galleryRoot}${galleryId}/${url}`,

    /** mainMenu ** {{{
     */
    mainMenu: [
      { url: '/About', text: 'About' },
      { url: '/Projects', text: 'Projects' },
      { url: '/Contacts', text: 'Contacts' },
    ],/*}}}*/

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
