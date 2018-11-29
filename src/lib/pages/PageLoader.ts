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

  /** fetchUrl ** {{{
   */
  private fetchUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        return fetch(url)
          // .then((result) => this.pageTools.delay(3000, result))
          .then((res: any) => {
            if (res && res.status !== 200) {
              console.error('PageLoader:fetchUrl error (invalid response status)', res); // tslint:disable-line no-console
              /*DEBUG*/debugger; // tslint:disable-line no-debugger
              return reject(res);
            }
            // else if (!res.text) {
            //   const err = { error: 'cannotHandleResponse', message: 'Cannot handle response', details: res };
            //   console.error('PageLoader:fetchUrl error (invalid response)', err); // tslint:disable-line no-console
            //   /*DEBUG*/debugger; // tslint:disable-line no-debugger
            //   reject(err);
            // }
            else {
              res.text()
                .then((content: any) => resolve(content))
              ;
            }
          })
          .catch(reject)
        ;
      }
      catch(err) {
        console.error('PageLoader:fetchUrl error (catch)', err); // tslint:disable-line no-console
        /*DEBUG*/debugger; // tslint:disable-line no-debugger
        return reject(err);
      }
    });
  }/*}}}*/

  /** loadPage ** {{{
   */
  public loadPage(pathname: TPagePathname): Promise<TPage> {

    const url = this.pageTools.normalizeUrl(pathname);
    const id = this.pageTools.normalizeId(url);

    const promise = this.fetchUrl(url)
      .then((content) => {
        return {
          id: id,
          url: url,
          content,
          // content: `page ${id} content, url: ${url}`,
        };
      })
      // TODO: Make md parser
      .catch((err) => {
        console.error('PageLoader:loadPage error (promise catch)', err); // tslint:disable-line no-console
        /*DEBUG*/debugger; // tslint:disable-line no-debugger
        return Promise.reject({
          error: 'pageLoadError',
          message: `Cannot load page '${id}'`,
          details: err,
          allowRefetchPage: true,
          id,
          url,
        });
      })
    ;

    return promise;

    // // {{{ SAMPLE
    // const promise = new Promise<TPage>((resolve, reject) => {
    //   if (false) {
    //     resolve({
    //       id: id,
    //       url: url,
    //       content: `page ${id} content, url: ${url}`,
    //     });
    //   }
    //   else {
    //     const message = `Fake error for page '${id}'`;
    //     const err = {
    //       error: 'cannotLoadPage',
    //       message,
    //       allowRefetchPage: true,
    //       id,
    //       url,
    //     };
    //     console.error('PageLoader:loadPage', err); // tslint:disable-line no-console
    //     // /*DEBUG*/debugger; // tslint:disable-line no-debugger
    //     reject(err);
    //   }
    // });
    // // SAMPLE }}}

    // return promise;

  }/*}}}*/

}
