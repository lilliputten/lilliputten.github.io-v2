import PageTools, { TPage, TPageId, TPagePathname, TPageUrl, TPageContent } from 'lib/pages/PageTools';

export { TPage, TPageId, TPagePathname, TPageUrl, TPageContent };

// // TODO:
// // https://blog.logrocket.com/async-rendering-in-react-with-suspense-5d0eaac886c8
// const someFetcher = createResource(async () => {
//   const res = await fetch(`https://api.github.com/search/users?q=yomete`);
//   return await res.json();
// });

export default class PageLoader {

  private pageTools: PageTools;

  /** constructor ** {{{ */
  constructor() {
    // super();
    this.pageTools = new PageTools();
  }/*}}}*/

  /** loadPage ** {{{
   */
  public loadPage(pathname: TPagePathname): Promise<TPage> {
    const id = this.pageTools.normalizeId(pathname);
    const url = this.pageTools.normalizeUrl(pathname);
    // console.log('loadPage', pathname, '->', id, url);
    // debugger;
    const promise = new Promise<TPage>((resolve, reject) => {
      if (false) {
        resolve({
          id: id,
          url: url,
          content: `page ${id} content, url: ${url}`,
        });
      }
      else {
        const message = `Fake error for page '${id}'`;
        const err = {
          error: 'cannotLoadPage',
          message,
          allowRefetchPage: true,
          id,
          url,
        };
        console.error('PageLoader:loadPage', err); // tslint:disable-line no-console
        // /*DEBUG*/debugger; // tslint:disable-line no-debugger
        reject(err);
      }
    });
    return promise;
  }/*}}}*/

}
