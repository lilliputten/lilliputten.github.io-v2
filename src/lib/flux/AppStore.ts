import AppDispatcher from './AppDispatcher';
import { IPage } from 'lib/pages/PageLoader';
import { EventEmitter } from 'events';

type TEventName = string | symbol;
type TEventListener = (...args: any[]) => void;

// @see https://nodejs.org/api/events.html

const _pages: IPage[] = [];
// const _pagesApproved = [];

export class AppStoreClass extends EventEmitter {

  private dispatchToken: string;

  /** constructor ** {{{
   */
  constructor() {

    super();

    // Flux actions dispatcher
    this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));

  }/*}}}*/

  public getAll() {
    return _pages;
  }

  /** emitChange ** {{{
   */
  public emitChange(eventName: TEventName): boolean {
    return this.emit(eventName);
  }/*}}}*/

  // public getApproved() {
  //  return _pagesApproved;
  // }

  /** showPage ** {{{
   */
  public showPage(page: IPage) {
    _pages.push(page);
  }/*}}}*/

  /** removePage ** {{{
   */
  public removePage(key: number) {
    _pages.splice(key, 1);
    // _pagesApproved.splice(key,1);
  }/*}}}*/

  // public approvePage(page) {
  //   if (page.length <= 10) {
  //     _pagesApproved.push('[Approved]:' + page);
  //   }
  //   else {
  //     _pagesApproved.push('[Rejected]:' + page);
  //   }
  // }

  public addChangeListener(eventName: TEventName, listener: TEventListener): this {
    return this.on(eventName, listener);
  }

  public removeChangeListener(eventName: TEventName, listener: TEventListener): this {
    return this.off(eventName, listener);
  }

  /** dispatcherCallback ** {{{ Dispatch flux actions
   * @param {String} action
   * @return {Boolean}
   */
  private dispatcherCallback(action: any) {

    switch (action.actionType) {
      case 'showPage':
        this.showPage(action.value);
        break;
    }

    this.emitChange('App_' + action.actionType);

    return true;

  }/*}}}*/

}

export default new AppStoreClass();
