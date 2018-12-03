import * as React from 'react';
import { cn } from '@bem-react/classname';
import PageTools from 'lib/pages/PageTools';

import PageAnim from 'blocks/layout/PageAnim/PageAnim';

import LoadingSpinner from 'blocks/content/LoadingSpinner/LoadingSpinner';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import Error from 'blocks/content/Error/Error';

import AppActions from 'lib/flux/AppActions';
import AppStore from 'lib/flux/AppStore';

// Pages
import HomePage from 'blocks/pages/HomePage/HomePage';
import InfoPage from 'blocks/pages/InfoPage/InfoPage';
import TestPage from 'blocks/pages/TestPage/TestPage';

import './Main.css';

const cnMain = cn('Main');

export type TContent = any; // JSX.Element | React.Component | string | null;
export interface IMainProps /* extends IClassNameProps */ {
  loadingState?: string;
  loadingContent?: TContent; // (<LoadingSpinner />);
}
const defaultProps: IMainProps = {
  loadingState: 'loading',
  loadingContent: React.createElement(LoadingSpinner), // (<LoadingSpinner />);
};
export interface IMainState {
  id?: string; // Unique content id
  content?: TContent;
}

class Main extends React.Component<IMainProps, IMainState> {

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

  /** Events list */
  private events: Array<{ object: any, event: string, handler: any }>;

  /* ...Properties }}}*/

  // Lifecycle...

  /** constructor ** {{{
   */
  constructor(props: IMainProps) {

    super(props);

    this.state = {
      // Initial state: loading spinner...
      id: this.props.loadingState || '',
      content: this.props.loadingContent,
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

    const { id, content } = this.state;

    return (
      <PageAnim className={cnMain()} id={id}>
        {content}
      </PageAnim>
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
    this.changeState({ id, content });
  }/*}}}*/
  /** onErrorThrown ** {{{
   */
  private onErrorThrown = () => {
    const err = AppStore.getError();
    const id = 'error';
    const content = (
      <React.Fragment>
        <h1>Something went wrong!</h1>
        <Error {...this.props} error={err} />
      </React.Fragment>
    );
    this.changeState({ id, content });
  }/*}}}*/

  /** onHashChange ** {{{ Set page if hash changed */
  private onHashChange = () => {

    const url = this.pageTools.getUrlFromWindow();
    this.tryFetchPage(url);

  }/*}}}*/

  // Pages...

  /** changeState ** {{{
   */
  private changeState({ id, content }: { id: string, content: TContent}) {
    if (id !== this.state.id) {
      this.setState({
        id,
        content,
      });
      const pageType = id.startsWith('/') ? ((id === '/') ? 'home' : 'page') : id;
      AppActions.setPageType(pageType);
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
    // If not found in routes, try to fetch...
    if (Main.staticRoutes[id]) {
      this.showStaticPage({ id });
    } else {
      AppActions.fetchPage(url);
    }
  }/*}}}*/

  /** tryFetchPage ** {{{
   */
  private tryFetchPage(url: string) {
    url = this.pageTools.normalizeUrl(url);
    const id = this.pageTools.normalizeId(url);
    if (id !== this.state.id) {
      this.fetchPage({ id, url });
    }
  }/*}}}*/

}

export default Main;
