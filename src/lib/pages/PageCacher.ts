import { IPage, TPageId, TPagePathname, TPageUrl, TPageContent } from 'lib/pages/PageTools';

export { TPageId, TPagePathname, TPageUrl, TPageContent };

export interface IPageStore {
  [id: string]: IPage;
}

export default class PageCacher {

  // private pageTools: PageTools = PageTools();

  private pageStore: IPageStore = {};

  /** constructor ** {{{ */
  constructor() {
    // this.pageStore = {};
  }/*}}}*/

  /** getAllPages ** {{{
   */
  public getAllPages() {
    return this.pageStore;
  }/*}}}*/

  /** isPageCached ** {{{
   */
  public isPageCached(id: TPageId): boolean {
    return !!(this.pageStore[id]);
  }/*}}}*/

  /** fetchPage ** {{{
   */
  public fetchPage(id: TPageId): IPage | null {
    return this.pageStore[id];
  }/*}}}*/

  /** savePage ** {{{
   */
  public savePage(page: IPage) {
    const id = page && page.id;
    if (id) {
      this.pageStore[id] = page;
    }
  }/*}}}*/

  /** removePage ** {{{
   */
  public removePage(id: TPageId) {
    delete this.pageStore[id];
  }/*}}}*/

}
