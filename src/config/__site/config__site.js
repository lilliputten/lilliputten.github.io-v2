/* eslint-env commonjs, browser, node */
/**
 * @module config__site
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.09.26, 23:11
 * @version 2018.11.17, 06:57
 */

const siteAddr = 'https://lilliputten.github.io'

// Sample url: https://res.cloudinary.com/lilliputten/image/upload/v1544482091/Projects/Printing/1411-Bonjour/pages-07-08.jpg
const galleryRoot = 'https://res.cloudinary.com/lilliputten/image/upload/'
const galleryId = 'v1542040058'
const siteName = 'Lilliputten & Noble'

/** configSite ** {{{ */
const configSite = /** @lends config__site.prototype */ {

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

}/*}}}*/

module.exports = configSite
