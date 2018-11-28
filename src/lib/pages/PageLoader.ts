
export interface IPage {
  content: React.Component | string | null;
}

// // TODO:
// // https://blog.logrocket.com/async-rendering-in-react-with-suspense-5d0eaac886c8
// const someFetcher = createResource(async () => {
//   const res = await fetch(`https://api.github.com/search/users?q=yomete`);
//   return await res.json();
// });

export default class PageLoader {

  // /** constructor ** {{{ */
  // constructor(props?: P) {
  //   console.log(props);
  // }/*}}}*/

  /** getPage ** {{{
   */
  public getPage({ pathname }: { pathname: string }): Promise<IPage> {
    const promise = new Promise<IPage>((resolve/* , reject */) => {
      resolve({
        content: `page ${pathname} content`,
      });
    });
    return promise;
  }/*}}}*/

}
