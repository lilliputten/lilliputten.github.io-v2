import AppDispatcher from './AppDispatcher';
import { EventEmitter } from 'events';
import PageLoader from 'lib/pages/PageLoader';
import PageCacher from 'lib/pages/PageCacher';
import PageTools from 'lib/pages/PageTools';
import { TPage, TPageId, TPagePathname, TPageContent } from 'lib/pages/PageTools';

type TEventName = string | symbol;
type TEventListener = (...args: any[]) => void;

// @see https://nodejs.org/api/events.html
export class AppStoreClass extends EventEmitter {

  private dispatchToken: string;

  private pageLoader: PageLoader;
  private pageCacher: PageCacher;
  private pageTools: PageTools;

  private appMode: string;
  private pageId: string;

  private error: any;

  /** constructor ** {{{
   */
  constructor() {

    super();

    // Flux actions dispatcher
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));

    this.pageLoader = new PageLoader();
    this.pageCacher = new PageCacher();
    this.pageTools = new PageTools();

  }/*}}}*/

  // /** emitChange ** {{{
  //  */
  // private emitChange(eventName: TEventName): boolean {
  //   return this.emit(eventName);
  // }/*}}}*/
  // /** addChangeListener ** {{{
  //  */
  // public addChangeListener(eventName: TEventName, listener: TEventListener): this {
  //   return this.on(eventName, listener);
  // }/*}}}*/
  // /** removeChangeListener ** {{{
  //  */
  // public removeChangeListener(eventName: TEventName, listener: TEventListener): this {
  //   return this.off(eventName, listener);
  // }/*}}}*/

  /** getAllPages ** {{{
   */
  public getAllPages() {
    return this.pageCacher.getAllPages();
  }/*}}}*/
  /** isPageCached ** {{{
   */
  isPageCached(id: TPageId): boolean {
    return id ? this.pageCacher.isPageCached(id) : false;
  }/*}}}*/
  /** isPageExists ** {{{
   */
  isPageExists(id: TPageId): boolean {
    return this.isPageCached(id);
  }/*}}}*/
  /** getPage ** {{{
   */
  public getPage(id: TPageId): TPage | null {
    return this.isPageCached(id) ? this.pageCacher.fetchPage(id) : null;
  }/*}}}*/
  /** getCurrentPageId ** {{{
   */
  public getCurrentPageId(): TPageId {
    return this.pageId;
  }/*}}}*/
  /** getCurrentPage ** {{{
   */
  public getCurrentPage(): TPage | null {
    return this.getPage(this.pageId);
  }/*}}}*/

  /** getError ** {{{
   */
  public getError(): any {
    return this.error;
  }/*}}}*/

  /** setAppMode ** {{{
   */
  private setAppMode(appMode: string) {
    this.appMode = appMode;
  }/*}}}*/
  /** setPageId ** {{{
   */
  private setPageId(pageId: TPageId) {
    this.pageId = pageId;
  }/*}}}*/

  /** savePage ** {{{
   */
  private savePage(page: TPage) {
    const id = page.id;
    this.pageCacher.savePage(page);
  }/*}}}*/

  /** pageUpdated ** {{{
   */
  private pageUpdated(id: TPageId) {
    this.pageId = id;
    this.emit('pageUpdated');
  }/*}}}*/

  /** errorThrown ** {{{
   */
  private errorThrown(err: any) {
    this.error = err;
    this.emit('errorThrown');
  }/*}}}*/

  /** getOrLoadPage ** {{{
   */
  private getOrLoadPage(pathname: TPagePathname): Promise<TPage> {
    const id = this.pageTools.normalizeId(pathname);
    if (this.pageCacher.isPageCached(id)) {
      return new Promise((resolve, reject) => {
        const page = this.pageCacher.fetchPage(id);
        if (page) {
          resolve(page);
        }
        else {
          const err = new Error(`Cannot fetch page '${id} from PageCacher'`);
          console.error('AppStore:getOrLoadPage', err); // tslint:disable-line no-console
          // /*DEBUG*/debugger; // tslint:disable-line no-debugger
          reject(err);
        }
      });
    }
    else {
      return this.pageLoader.loadPage(pathname)
        .then((page: TPage) => {
          this.pageCacher.savePage(page);
          return page;
        })
      ;
    }
  }/*}}}*/

  /** fetchPage ** {{{
   */
  private fetchPage(pathname: TPagePathname) {
    this.getOrLoadPage(pathname)
      .then((page) => {
        this.pageUpdated(page.id);
      })
      .catch((err) => {
        console.error('AppStore:fetchPage', err); // tslint:disable-line no-console
        // /*DEBUG*/debugger; // tslint:disable-line no-debugger
        this.errorThrown(err);
      })
    ;
  }/*}}}*/

  /** removePage ** {{{
   */
  private removePage(id: TPageId) {
    this.pageCacher.removePage(id);
  }/*}}}*/

  /** dispatcherCallback ** {{{ Dispatch flux actions
   * @param {String} action
   * @return {Boolean}
   */
  private dispatcherCallback(action: any) {

    switch (action.actionType) {
      case 'setAppMode':
        this.setAppMode(action.value);
        break;
      case 'fetchPage':
        this.fetchPage(action.value);
        break;
    }

    this.emit('App_' + action.actionType); // ???

    return true;

  }/*}}}*/

}

export default new AppStoreClass();
