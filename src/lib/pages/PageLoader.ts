import PageTools, { TPageId, TPagePathname, TPageUrl, TPageContent } from 'lib/pages/PageTools';
import MdReactParser from './MdReactParser';

export { TPageId, TPagePathname, TPageUrl, TPageContent };

export interface IPage {
  id: TPageId;
  title: string;
  url: TPageUrl;
  source?: string;
  frontmatter: object;
  content: TPageContent;
}

export default class PageLoader {

  private pageTools: PageTools;
  private mdReactParser: MdReactParser;

  /** constructor ** {{{ */
  constructor() {
    this.pageTools = new PageTools();
    this.mdReactParser = new MdReactParser();
  }/*}}}*/

  /** loadPage ** {{{
   */
  public loadPage(pathname: TPagePathname): Promise<IPage | any> {

    const url = this.pageTools.normalizeUrl(pathname);
    const id = this.pageTools.normalizeId(url);

    const promise = this.fetchUrl(url)
      .then((source: any) => {
        // Error?
        if (typeof source !== 'string' || source.startsWith('<!DOCTYPE') || source.startsWith('<html')) {
          // tslint:disable-next-line no-console
          console.error('PageLoader:loadPage error (invalid response content)', source);
          debugger; // tslint:disable-line no-debugger
          throw new Error('Invalid response content (received html instead of markdown)');
        }
        // Precoess received data...
        const {frontmatter, content} = this.mdReactParser.parse({ source });
        const title = frontmatter.title || this.fetchTitle(source)
          || id.replace(/\//g, ' ').replace(/\s\s+/g, ' ').trim();
        return {
          id,
          title,
          url,
          source,
          frontmatter,
          content,
        };
      })
      // Error?
      .catch((err: any) => {
        // tslint:disable-next-line no-console
        console.error('PageLoader:loadPage error (promise catch)', err);
        // debugger; // tslint:disable-line no-debugger
        return Promise.reject({
          id, url,
          error: 'pageLoadError',
          message: `Cannot load page '${id}'`,
          details: err,
          allowReloadLink: true,
          allowHomeLink: true,
        });
      })
    ;

    return promise;

  }/*}}}*/

  /** fetchTitle ** {{{
   */
  private fetchTitle(source: string): string | null {
    const match = source.match(/(?:^\n*|\n\n)# ([\s\S]*?)\n\n/m) || source.match(/(?:^\n*|\n\n)([\s\S]*?)\n==+\n\n/m);
    if (match) {
      const title = match[1]
        .replace(/[\n\t]/g, ' ')
        .replace(/\s\s+/g, ' ')
      .trim();
      return title;
    }
    return null;
  }/*}}}*/

  /** fetchUrl ** {{{
   */
  private fetchUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        return fetch(url)
          // .then((result) => this.pageTools.delayPromise(10000, result))
          .then((res: any) => {
            if (!res || res.status !== 200) {
              // tslint:disable-next-line no-console
              console.error('PageLoader:fetchUrl error (invalid response status)', res);
              // debugger; // tslint:disable-line no-debugger
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
        // debugger; // tslint:disable-line no-debugger
        return reject(err);
      }});
  }/*}}}*/

}
