import { cn } from '@bem-react/classname';
import * as React from 'react';
import PageTools from 'lib/pages/PageTools';

import LoadingSpinner from 'blocks/interface/LoadingSpinner/LoadingSpinner';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import Error from 'blocks/interface/Error/Error';

import AppActions from 'lib/flux/AppActions';
import AppStore from 'lib/flux/AppStore';

// import { css as cssConfig } from 'config';

// Pages
import HomePage from 'blocks/pages/HomePage/HomePage';
import InfoPage from 'blocks/pages/InfoPage/InfoPage';
import TestPage from 'blocks/pages/TestPage/TestPage';

import './Main.css';
import '../PageTransition/PageTransition.css';

const cnMain = cn('Main');

// TODO: Extract `PageTransition` to HOC?
// const cnPageTransition = cn('PageTransition');

export interface IMainProps /* extends IClassNameProps */ {
  text?: string;
  location?: any;
}
export interface IMainState {
  id: string;
  content: any; // JSX.Element | React.Component | string | null;
  prevId?: string;
  prevContent?: any; // JSX.Element | React.Component | string | null;
  className: string;
}

// export default class Main<P extends IMainProps, S extends IMainState> extends React.Component<P, S> {
export default class Main extends React.Component<IMainProps, IMainState> {

  /*{{{ Properties... */

  public static loadingState = 'loading';
  public static loadingContent = React.createElement(LoadingSpinner); // (<LoadingSpinner />);
  public static staticRoutes: { [id: string]: { content: any } } = {
    '/': { content: HomePage },
    '/info': { content: InfoPage },
    '/test': { content: TestPage },
  };

  public static defaultProps = {
    text: 'Main: default',
  };

  public block = 'Main';

  private pageTools = new PageTools();

  private appStoreEvents: Array<{ object: any, event: string, handler: any }>;

  /* ...Properties }}}*/

  // Lifecycle...

  /** constructor ** {{{
   */
  constructor(props: IMainProps) {

    super(props);

    // // HomePage.__proto__.name
    // console.log(HomePage, Main.loadingContent, Main.loadingContent instanceof React.Component, typeof HomePage,
    //   /* HomePage.__proto__, */ HomePage instanceof React.Component, Main.staticRoutes);
    // debugger;

    this.state = {
      id: Main.loadingState,
      content: Main.loadingContent,
      className: cnMain(),
    };

    // Events list...
    this.appStoreEvents = [
      { object: AppStore, event: 'App_fetchPage', handler: this.onFetchPage },
      { object: AppStore, event: 'pageUpdated', handler: this.onPageUpdated },
      { object: AppStore, event: 'errorThrown', handler: this.onErrorThrown },
      { object: typeof window === 'object' && window, event: 'hashchange', handler: this.onHashChange },
    ];
    // if (typeof window === 'object') {
    //   window.addEventListener('hashchange', this.handleHashChange.bind(this), false);
    // }

  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {

    this.appStoreEvents.map((ev) => {
      const method = ev.object && (ev.object.addEventListener || ev.object.addListener);
      if (method) {
        method.call(ev.object, ev.event, ev.handler);
      }
    });

    // Fetch initial page (from location hash)...
    this.onHashChange();

  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {

    this.appStoreEvents.map((ev) => {
      const method = ev.object && (ev.object.removeEventListener || ev.object.removeListener);
      if (method) {
        method.call(ev.object, ev.event, ev.handler);
      }
    });

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const { id, content } = this.state;
    return (
      <div className={cnMain()}>
        <div key={id} className={cnMain('Show', { id: id.replace(/\W+/g, '') })}>
          {content}
        </div>
      </div>
    );
  }/*}}}*/

  // Events...

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
    this.setState({ id, content });
  }/*}}}*/
  /** onErrorThrown ** {{{
   */
  private onErrorThrown = () => {
    const err = AppStore.getError();
    const id = 'error';
    const content = (
      <Error {...this.props} error={err} />
    );
    this.setState({ id, content });
  }/*}}}*/

  /** onHashChange ** {{{ Set page if hash changed */
  private onHashChange = () => {

    const url = this.pageTools.getUrlFromWindow();
    this.tryFetchPage(url);

  }/*}}}*/

  // Pages...

  /** changeState ** {{{
   */
  private changeState({ id, content }: { id: string, content: any}) {
    if (id !== this.state.id) {
      this.setState((state) => {
        return Object.assign({
          prevId: state.id,
          prevContent: state.content,
          id,
          content,
        });
      });
    }
  }/*}}}*/

  /** setLoadingState ** {{{
   */
  private setLoadingState() {
    const id = Main.loadingState;
    const content = Main.loadingContent;
    this.changeState({ id, content });
  }/*}}}*/

  /** showStaticPage ** {{{
   */
  private showStaticPage({ id/* , url */ }: { id: string/* , url: string */ }) {
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
