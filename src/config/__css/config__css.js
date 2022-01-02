/* eslint-env commonjs, browser, node */
/**
 * @module configCss
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.09.26, 23:11
 * @version 2018.11.17, 06:57
 *
 * NOTE: Rememeber to reload dev-server (webpack or enb) for accept updates!
 *
 */

(function(){

  var textColor = '#333'
  var defaultFontSize = 16
  var primaryColor = '#c20'
  // var topBgColor = '#f20'; // '#ff1d06';
  var primaryLightColor = '#f20'

  /** configCss ** {{{
   */
  var configCss = /** @lends config__css.prototype */ {

    textColor: textColor,
    defaultTextColor: textColor,

    defaultLinkColor: primaryColor,
    defaultHoveredLinkColor: primaryLightColor,

    neutralColor: '#999',

    primaryColor,
    primaryLightColor,

    // ???
    secondaryColor: '#FFC06A',

    layoutBgColor: '#F0F0F0',
    layoutLightBgColor: '#F7F7F7',

    layoutBorderColor: '#CCC',

    headerLogoHeight: 60,
    headerHeight: 100,

    defaultFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    defaultFontSize: defaultFontSize,
    fontSize: defaultFontSize,
    fontSizeM: defaultFontSize,
    fontSizeSm: defaultFontSize - 2,
    fontSizeXs: defaultFontSize - 4,
    fontSizeLg: defaultFontSize + 2,
    fontSizeXl: defaultFontSize + 4,
    titleFontSize: defaultFontSize + 12,
    defaultFontWeight: 400,
    defaultBemFontSize: defaultFontSize,

    // Breakpoints (from bootstrap)
    breakpoint_xs: 0,
    breakpoint_sm_pre: 575.98,
    breakpoint_sm: 576,
    breakpoint_md_pre: 767.98,
    breakpoint_md: 768,
    breakpoint_lg_pre: 991.98,
    breakpoint_lg: 992,
    breakpoint_xl_pre: 1199.98,
    breakpoint_xl: 1200,

    // Timeouts...
    animationTimeout: 250,
    pageTransitionTimeout: 1000,
    pageEffectsTimeout: 500,

  }/*}}}*/

  /** extend configCss ** {{{
   */
  Object.assign(configCss, /** @lends config__css.prototype */ {

    defaultBgColor: '#fff',
    pageBgColor: '#fff',

    // Questionnaire...

    // layoutBorderColor: configCss.layoutBorderColor,
    QFrameColor: configCss.layoutBgColor, // UNUSED
    QHeaderBgColor: configCss.layoutLightBgColor, // UNUSED

    testColor: 'green', // DEBUG!

    // textColor: configCss.textColor,
    defaultTextColor: configCss.textColor,

    linkColor: configCss.primaryColor,

    // Container & paddings...

    containerPadding: 15,

    // Custom breakpoints

    // Demo...

    demoBorderRadius: 5,

    // Spinner
    spinnerSize: 100,
    spinnerColor: configCss.neutralColor,

  })/*}}}*/

  /** Universal export... ** {{{ */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = configCss
  }/*}}}*/
  /** YM export... ** {{{ */
  if (typeof modules === 'object' && typeof modules.define === 'function') {
    modules.define('config__css', [], function(provide) {
      provide(configCss)
    })
  }/*}}}*/

})()
