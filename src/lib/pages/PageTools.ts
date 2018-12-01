
import { pages as pagesConfig } from 'config';

export type TPageId = string;
export type TPageKey = string;
export type TPagePathname = string;
export type TPageUrl = string;
export type TPageContent = React.Component | string | null;

export interface IPage {
  id: TPageId;
  url: TPageUrl;
  content: TPageContent;
}

export default class PageTools {

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
