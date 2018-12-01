import { cn } from '@bem-react/classname';
import * as React from 'react';
import PageTools from 'lib/pages/PageTools';

import LoadingSpinner from 'blocks/interface/LoadingSpinner/LoadingSpinner';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import Error from 'blocks/interface/Error/Error';

import AppActions from 'lib/flux/AppActions';
import AppStore from 'lib/flux/AppStore';

import { css as cssConfig } from 'config';

// Pages
import HomePage from 'blocks/pages/HomePage/HomePage';
import InfoPage from 'blocks/pages/InfoPage/InfoPage';
import TestPage from 'blocks/pages/TestPage/TestPage';

import './Main.css';

const cnMain = cn('Main');

type TAnimState = string | boolean | undefined;
export type TContent = any; // JSX.Element | React.Component | string | null;
export interface IMainProps /* extends IClassNameProps */ {
  timeout?: number;
  initialTimeout?: number; // Timeout before set `active` animation state
  // activeState?: string;
  loadingState?: string;
  loadingContent?: TContent; // (<LoadingSpinner />);
  appear?: boolean; // Animate on appear
}
const defaultProps: IMainProps = {
  timeout: cssConfig.pageTransitionTimeout, // Animation timeout (nust equal to real css transition)
  initialTimeout: 100, // Timeout before set `active` animation state
  // activeState: 'active',
  loadingState: 'loading',
  loadingContent: React.createElement(LoadingSpinner), // (<LoadingSpinner />);
  appear: true,
};
export interface IMainState {
  animState?: TAnimState; // Animation status: true (initial), 'active' (finished)
  id: string; // Unique content id
  content: TContent;
  prevId?: string;
  prevContent?: TContent;
  nextId?: string;
  nextContent?: TContent;
}

// export default class Main<P extends IMainProps, S extends IMainState> extends React.Component<P, S> {
export default class Main extends React.Component<IMainProps, IMainState> {

  /*{{{ Properties... */

  public static staticRoutes: { [id: string]: { content: TContent } } = {
    '/': { content: HomePage },
    '/info': { content: InfoPage },
    '/test': { content: TestPage },
  };

  /** Default component props */
  public static defaultProps = defaultProps;

  /** block name */
  public block = 'Main';

  /** Page support library */
  private pageTools = new PageTools();

  /** Animation timer */
  private animTimer: any;

  /** Events list */
  private events: Array<{ object: any, event: string, handler: any }>;

  /* ...Properties }}}*/

  // Lifecycle...

  /** constructor ** {{{
   */
  constructor(props: IMainProps) {

    super(props);

    this.state = {
      id: this.props.loadingState || '',
      content: this.props.loadingContent,
      animState: this.props.appear,
    };

    const windowObj = typeof window === 'object' && window;

    // Events list...
    this.events = [
      { object: AppStore, event: 'App_fetchPage', handler: this.onFetchPage },
      { object: AppStore, event: 'pageUpdated', handler: this.onPageUpdated },
      { object: AppStore, event: 'errorThrown', handler: this.onErrorThrown },
      { object: windowObj, event: 'hashchange', handler: this.onHashChange },
    ];

  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {

    this.registerEvents([ 'addEventListener', 'addListener' ]);

    // Fetch initial page (from location hash)...
    this.onHashChange();

  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {

    this.registerEvents([ 'removeEventListener', 'removeListener' ]);

  }/*}}}*/

  /** render ** {{{
   */
  public render() {

    const { prevId, prevContent } = this.state;
    const { id, content } = this.state;

    const showContent = [
      (prevId && prevContent) && (
        <div key="prev" className={cnMain('Show', this.getAnimationProps(true))}>
          {prevContent}
        </div>
      ),
      (id && content) && (
        <div key={id} className={cnMain('Show', this.getAnimationProps(false))}>
          {content}
        </div>
      ),
    ];

    // Set next animation state...
    this.iterateAnimState();

    return (
      <div className={cnMain()}>
        {showContent}
      </div>
    );

  }/*}}}*/

  // Events...

  /** registerEvents ** {{{ Register or release events from `this.events`
   * @param {string[]} evList - List of register method names
   * (addEventListener, addListener, removeEventListener, removeListener)
   */
  private registerEvents(evList: string[]) {
    this.events.map((ev) => {
      const method = ev.object && evList.reduce((foundMethod, evMethodName) => {
        const newMethod = ev.object[evMethodName];
        return newMethod || foundMethod;
      }, null);
      if (method && ev && ev.event && ev.handler) {
        method.call(ev.object, ev.event, ev.handler);
      }
    });
  }/*}}}*/

  /** onFetchPage ** {{{
   */
  private onFetchPage = () => {
    this.setLoadingState();
  }/*}}}*/
  /** onPageUpdated ** {{{
   */
  private onPageUpdated = () => {
    const page = AppStore.getCurrentPage();
    const id = AppStore.getCurrentPageId();
    const content = (
      <LoadedPage>
        {page && page.content}
      </LoadedPage>
    );
    // this.setState({ id, content, animState: true });
    this.changeState({ id, content });
  }/*}}}*/
  /** onErrorThrown ** {{{
   */
  private onErrorThrown = () => {
    const err = AppStore.getError();
    const id = 'error';
    const content = (
      <Error {...this.props} error={err} />
    );
    // this.setState({ id, content, animState: true });
    this.changeState({ id, content });
  }/*}}}*/

  /** onHashChange ** {{{ Set page if hash changed */
  private onHashChange = () => {

    const url = this.pageTools.getUrlFromWindow();
    this.tryFetchPage(url);

  }/*}}}*/

  // Pages...

  /** getAnimationProps ** {{{
   */
  private getAnimationProps(isPrev: boolean) {
    const {animState} = this.state;
    const id = (isPrev ? this.state.prevId : this.state.id) || '';
    const classKey = this.getPageClassId(id);
    const className = isPrev ? 'exiting' : 'entering';
    const classNameActive = className + 'Active';
    const obj = {
      key: classKey,
      [className]: !!animState,
      [classNameActive]: (animState === 'active'),
    };
    return obj;
  }/*}}}*/

  /** getPageClassId ** {{{
   */
  private getPageClassId(id: string): string {
    id = String(id || '').replace(/\W+/g, ' ').trim().replace(/ /g, '_') || 'home';
    return id;
  }/*}}}*/

  /** iterateAnimState ** {{{
   */
  private iterateAnimState() {
    const {animState} = this.state;
    if (animState) {
      const isJustStarted = (animState === true);
      const nextAnimState = isJustStarted ? 'active' : false;
      const timeout = isJustStarted ? this.props.initialTimeout : this.props.timeout;
      if (this.animTimer) {
        clearTimeout(this.animTimer);
      }
      this.animTimer = setTimeout(() => this.animTimerDone(nextAnimState), timeout);
    }
  }/*}}}*/
  /** animTimerDone ** {{{
   */
  private animTimerDone(animState: TAnimState) {
    this.animTimer = null;
    if (animState !== this.state.animState) {
      const nextState = { animState };
      // Animation end...
      if (!animState) {
        Object.assign(nextState, { prevId: undefined, prevContent: undefined });
      }
      this.setState(nextState);
    }
  }/*}}}*/

  /** changeState ** {{{
   */
  private changeState({ id, content }: { id: string, content: TContent}) {
    if (id !== this.state.id) {
      this.setState((state) => {
        const nextState = {
          animState: true,
          id,
          content,
        };
        // If no currentanimating...
        if (!this.animTimer) {
          Object.assign(nextState, {
            prevId: state.id,
            prevContent: state.content,
          });
        }
        return nextState;
      });
    }
  }/*}}}*/

  /** setLoadingState ** {{{
   */
  private setLoadingState() {
    const id = this.props.loadingState || '';
    const content = this.props.loadingContent;
    this.changeState({ id, content });
  }/*}}}*/

  /** showStaticPage ** {{{
   */
  private showStaticPage({ id }: { id: string }) {
    let {content} = Main.staticRoutes[id];
    if (typeof content === 'function') {
      content = React.createElement(content);
    }
    this.changeState({ id, content });
  }/*}}}*/

  /** fetchPage ** {{{
   */
  private fetchPage({ id, url }: { id: string, url: string }) {
    this.setLoadingState();
    if (Main.staticRoutes[id]) {
      this.showStaticPage({ id });
    } else {
      AppActions.fetchPage(url);
    }
  }/*}}}*/

  /** tryFetchPage ** {{{
   */
  private tryFetchPage(url: string) {

    // TODO: Check `pageRoutes`...

    // If not found in routes, try to fetch...
    url = this.pageTools.normalizeUrl(url);
    const id = this.pageTools.normalizeId(url);
    if (id !== this.state.id) {
      this.fetchPage({ id, url });
    }

  }/*}}}*/

}
