import PageTools, { TPage, TPageId, TPagePathname, TPageUrl, TPageContent } from 'lib/pages/PageTools';

export { TPageId, TPagePathname, TPageUrl, TPageContent };
// export type TPagePathname = string;
// export type TPageUrl = string;
// export type TPageContent = React.Component | string | null;

export type TPageStore = { [id: string]: TPage };

// // TODO:
// // https://blog.logrocket.com/async-rendering-in-react-with-suspense-5d0eaac886c8
// const someFetcher = createResource(async () => {
//   const res = await fetch(`https://api.github.com/search/users?q=yomete`);
//   return await res.json();
// });

export default class PageCacher {

  private pageTools: PageTools;

  private pageStore: TPageStore;

  /** constructor ** {{{ */
  constructor() {
    this.pageTools = new PageTools();
    this.pageStore = {};
  }/*}}}*/

  /** getAllPages ** {{{
   */
  public getAllPages() {
    return this.pageStore;
  }/*}}}*/

  /** isPageCached ** {{{
   */
  isPageCached (id: TPageId): boolean {
    return !!(this.pageStore[id]);
  }/*}}}*/

  /** fetchPage ** {{{
   */
  public fetchPage(id: TPageId): TPage | null {
    return this.pageStore[id];
  }/*}}}*/

  /** savePage ** {{{
   */
  public savePage(page: TPage) {
    const id = page && page.id;
    if (id) {
      this.pageStore[id] = page;
    }
  }/*}}}*/

  /** removePage ** {{{
   */
  removePage (id: TPageId) {
    delete this.pageStore[id];
  }/*}}}*/

}
