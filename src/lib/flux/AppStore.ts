import AppDispatcher from './AppDispatcher';
import { EventEmitter } from 'events';
import PageLoader from 'lib/pages/PageLoader';
import PageCacher from 'lib/pages/PageCacher';
import PageTools from 'lib/pages/PageTools';
import { IPage, TPageId, TPageKey, TPagePathname } from 'lib/pages/PageTools';

// type TEventName = string | symbol;
// type TEventListener = (...args: any[]) => void;

// @see https://nodejs.org/api/events.html#events_class_eventemitter
export class AppStoreClass extends EventEmitter {

  private dispatchToken: string; // tslint:disable-line no-unused-vars

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
  public isPageCached(id: TPageId): boolean {
    return id ? this.pageCacher.isPageCached(id) : false;
  }/*}}}*/
  /** isPageExists ** {{{
   */
  public isPageExists(id: TPageId): boolean {
    return this.isPageCached(id);
  }/*}}}*/
  /** getPage ** {{{
   */
  public getPage(id: TPageId): IPage | null {
    return this.isPageCached(id) ? this.pageCacher.fetchPage(id) : null;
  }/*}}}*/
  /** getDispatchToken ** {{{
   */
  public getDispatchToken() {
    return this.dispatchToken;
  }/*}}}*/
  /** getAppMode ** {{{
   */
  public getAppMode() {
    return this.appMode;
  }/*}}}*/
  /** getCurrentPageKey ** {{{
   */
  public getCurrentPageKey(): TPageKey {
    return String(this.pageId).replace(/\W+/g, '_');
  }/*}}}*/
  /** getCurrentPageId ** {{{
   */
  public getCurrentPageId(): TPageId {
    return this.pageId;
  }/*}}}*/
  /** getCurrentPage ** {{{
   */
  public getCurrentPage(): IPage | null {
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
  // /** setPageId ** {{{
  //  */
  // private setPageId(pageId: TPageId) {
  //   this.pageId = pageId;
  // }/*}}}*/

  // /** savePage ** {{{
  //  */
  // private savePage(page: IPage) {
  //   const id = page.id;
  //   this.pageCacher.savePage(page);
  // }/*}}}*/

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
  private getOrLoadPage(pathname: TPagePathname): Promise<IPage> {
    const id = this.pageTools.normalizeId(pathname);
    if (this.pageCacher.isPageCached(id)) {
      return new Promise((resolve, reject) => {
        const page = this.pageCacher.fetchPage(id);
        if (!page) {
          const err = new Error(`Cannot fetch page '${id} from PageCacher'`);
          console.error('AppStore:getOrLoadPage error (empty page object)', err); // tslint:disable-line no-console
          // /*DEBUG*/debugger; // tslint:disable-line no-debugger
          reject(err);
        } else {
          resolve(page);
        }
      });
    } else {
      return this.pageLoader.loadPage(pathname)
        .then((page: IPage) => {
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
        console.error('AppStore:fetchPage error (promise catch)', err); // tslint:disable-line no-console
        // /*DEBUG*/debugger; // tslint:disable-line no-debugger
        this.errorThrown(err);
      })
    ;
  }/*}}}*/

  // /** removePage ** {{{
  //  */
  // private removePage(id: TPageId) {
  //   this.pageCacher.removePage(id);
  // }/*}}}*/

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
