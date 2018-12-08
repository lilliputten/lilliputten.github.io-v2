
import { pages as pagesConfig } from 'config';
import { ReactElement } from 'react';

export type TPageId = string;
export type TPageKey = string;
export type TPagePathname = string;
export type TPageUrl = string;
export type TPageContent = React.Component | React.ReactElement<any> | string | null;

export default class PageTools {

  /** smartypants ** {{{ Typographic text
   */
  public smartypants(text: string): string {
    // debugger;
    return text
      /* adam-p: Adding some smart arrows */
      .replace(/<-->/g, '\u2194')
      .replace(/<--/g, '\u2190')
      .replace(/-->/g, '\u2192')
      .replace(/<==>/g, '\u21d4')
      .replace(/<==/g, '\u21d0')
      .replace(/==>/g, '\u21d2')

      // em-dashes
      .replace(/--/g, '\u2014')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      // .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u00ab')
      .replace(/(^|[-\u2014/(\[{\u2018\s])"([^\s]|$)/g, '$1\u00ab$2')
      // TODO: Test cases for opening closing quotes around tags
      // closing doubles
      .replace(/"/g, '\u00bb')
      // ellipses
      .replace(/\.{3}/g, '\u2026');
  }/*}}}*/

  /** delayPromise ** {{{ DEBUG: Timeout
   * @param {Number} [timeout=1000]
   * @param {*} [data]
   * @return {Promise}
   */
  public delayPromise(timeout: number = 1000, data: any = null): Promise<any> {
    return new Promise((resolve) => setTimeout(() => {
        resolve(data);
      }, timeout)
    );
  }/*}}}*/

  /** getUrlFromWindow ** {{{ Get hash from window location */
  public getUrlFromWindow(): string {
    if (typeof window === 'object' && window.location && window.location.hash) {
      return window.location.hash.substr(1);
    }
    return '';
  }/*}}}*/

  /** setUrlToWindow ** {{{ Set hash to window location
   * @param {String} hash
   */
  public setUrlToWindow(hash: string) {
    if (!hash.startsWith('#')) {
      hash = '#' + hash;
    }
    if ( typeof window === 'object' && window.location ) {
      window.location.hash = hash;
    }
  }/*}}}*/

  /** normalizeUrl ** {{{
   */
  public normalizeUrl(pathname: TPagePathname): TPageUrl {
    let url = pathname;
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    if (!url.startsWith(pagesConfig.urlPrefix)) {
      url = pagesConfig.urlPrefix + url;
    }
    if (url.endsWith('/')) {
      url += pagesConfig.indexName;
    }
    if (!url.endsWith(pagesConfig.extension)) {
      url += pagesConfig.extension;
    }
    return url;
  }/*}}}*/

  /** normalizeKey ** {{{
   */
  public normalizeKey(pathname: TPagePathname): TPageKey {
    const key = pathname;
    return key.replace(/\W+/g, '_');
  }/*}}}*/

  /** normalizeId ** {{{
   */
  public normalizeId(url: TPageUrl): TPageId {
    let id = url;
    if (id.startsWith(pagesConfig.urlPrefix)) {
      id = id.substr(pagesConfig.urlPrefix.length);
    }
    if (id.endsWith(pagesConfig.extension)) {
      id = id.substr(0, id.length - pagesConfig.extension.length);
    }
    if (id.endsWith(pagesConfig.indexName)) {
      id = id.substr(0, id.length - pagesConfig.indexName.length);
    }
    return id;
  }/*}}}*/

}
