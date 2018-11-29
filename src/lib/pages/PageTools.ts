
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

  /** normalizeId ** {{{
   */
  public normalizeId(pathname: TPagePathname): TPageId {
    let id = pathname;
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

  /** normalizeUrl ** {{{
   */
  public normalizeUrl(pathname: TPagePathname): TPageUrl {
    let url = pagesConfig.urlPrefix + pathname;
    if (url.endsWith('/')) {
      url += pagesConfig.indexName;
    }
    if (!url.endsWith(pagesConfig.extension)) {
      url += pagesConfig.extension;
    }
    return url;
  }/*}}}*/

}
