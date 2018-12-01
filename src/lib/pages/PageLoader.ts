import PageTools, { IPage, TPageId, TPagePathname, TPageUrl, TPageContent } from 'lib/pages/PageTools';

export { IPage, TPageId, TPagePathname, TPageUrl, TPageContent };

export default class PageLoader {

  private pageTools: PageTools;

  /** constructor ** {{{ */
  constructor() {
    this.pageTools = new PageTools();
  }/*}}}*/

  /** loadPage ** {{{
   */
  public loadPage(pathname: TPagePathname): Promise<IPage> {

    const url = this.pageTools.normalizeUrl(pathname);
    const id = this.pageTools.normalizeId(url);

    const promise = this.fetchUrl(url)
      .then((content) => {
        return { id, url, content };
      })
      // TODO: Make md parser
      .catch((err) => {
        console.error('PageLoader:loadPage error (promise catch)', err); // tslint:disable-line no-console
        debugger; // tslint:disable-line no-debugger
        return Promise.reject({
          id, url,
          error: 'pageLoadError',
          message: `Cannot load page '${id}'`,
          details: err,
          allowRefetchPage: true,
        });
      })
    ;

    return promise;

  }/*}}}*/

  /** fetchUrl ** {{{
   */
  private fetchUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        return fetch(url)
          .then((result) => this.pageTools.delayPromise(3000, result))
          .then((res: any) => {
            if (res && res.status !== 200) {
              // tslint:disable-next-line no-console
              console.error('PageLoader:fetchUrl error (invalid response status)', res);
              // tslint:disable-next-line no-debugger
              debugger;
              return reject(res);
            } else {
              res.text()
                .then((content: any) => resolve(content))
              ;
            }
          })
          .catch(reject)
        ;
      } catch (err) {
        // tslint:disable-next-line no-console
        console.error('PageLoader:fetchUrl error (catch)', err);
        // tslint:disable-next-line no-debugger
        debugger;
        return reject(err);
      }});
  }/*}}}*/

}
