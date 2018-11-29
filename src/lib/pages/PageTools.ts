
import { pages as pagesConfig } from 'config';

export type TPageId = string;
export type TPagePathname = string;
export type TPageUrl = string;
export type TPageContent = React.Component | string | null;

export type TPage = {
  id: TPageId;
  url: TPageUrl;
  content: TPageContent;
};

export default class PageTools {

  /** delay ** {{{ DEBUG: Timeout
   * @param {Number} [timeout=1000]
   * @param {*} [data]
   * @return {Promise}
   */
  public delay(timeout: number = 1000, data: any = null): Promise<any> {
    return new Promise((resolve) => setTimeout(() => {
        resolve(data);
      }, timeout)
    );
  }/*}}}*/

  /** normalizeUrl ** {{{
   */
  public normalizeUrl(pathname: TPagePathname): TPageUrl {
    let url = pathname;
    if (!url.startsWith(pagesConfig.urlPrefix)) {
      url = pagesConfig.urlPrefix + pathname;
    }
    if (url.endsWith('/')) {
      url += pagesConfig.indexName;
    }
    if (!url.endsWith(pagesConfig.extension)) {
      url += pagesConfig.extension;
    }
    return url;
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
