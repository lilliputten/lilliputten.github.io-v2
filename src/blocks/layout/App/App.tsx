import { cn } from '@bem-react/classname';
// import { Registry, withRegistry, RegistryConsumer } from '@bem-react/di';
import * as React from 'react';

import AppStore from 'lib/flux/AppStore';

import { PagesProvider, IPageContext } from 'lib/pages/PageContext';

import Main from 'blocks/layout/Main/Main';
import Header from 'blocks/layout/Header/Header';

import './App.css';

const cnApp = cn('App');

const pagesContext: IPageContext = {
  AppStore,
};

export interface IAppProps /* extends IClassNameProps */ {
  path: string;
}
export interface IAppState {
  mode?: string;
  prevMode?: string;
  loading?: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {

  public block = 'App';

  /** constructor ** {{{
   */
  constructor(props: IAppProps) {
    super(props);
    this.state = {
    };
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    AppStore.addListener('App_setPageType', this.onPageTypeChanged);
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {mode, prevMode, loading} = this.state;
    return (
      <PagesProvider value={pagesContext}>
        <div className={cnApp({ mode, prevMode, loading })}>
          <Header mode={mode} loading={loading} />
          <Main mode={mode} prevMode={prevMode} />
        </div>
      </PagesProvider>
    );
  }/*}}}*/

  // Events...

  /** onPageTypeChanged ** {{{
   */
  private onPageTypeChanged = () => {
    const prevMode = this.state.mode;
    const mode = AppStore.getPageType();
    if (mode === 'loading') {
      this.setState({ loading: true });
    } else /* if (mode !== prevMode) */ {
      this.setState({ mode, prevMode, loading: false });
    }
  }/*}}}*/

}
