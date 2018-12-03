import { cn } from '@bem-react/classname';
// import { Registry, withRegistry, RegistryConsumer } from '@bem-react/di';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';

import AppStore from 'lib/flux/AppStore';

import { PagesProvider, IPageContext } from 'lib/pages/PageContext';
// import PageLoader from 'lib/pages/PageLoader';

import Main from 'blocks/layout/Main/Main';

import './App.css';
import Header from './Header/App-Header';

// DEMO: Import config:
// import { pages as pagesConfig } from 'config';

const cnApp = cn('App');

// const pageLoader = new PageLoader();
const pagesContext: IPageContext = {
  // pageLoader,
  AppStore,
};

// const AppRegistry = new Registry({ id: cnApp(), inverted: true });
// AppRegistry.set('pageLoader', pageLoader);

export interface IAppProps extends IClassNameProps {
  path: string;
}

export interface IAppState {
  title: string;
}

export default class App extends React.Component<IAppProps, IAppState> {

  public static defaultProps = {
    className: cnApp(),
  };

  public block = 'App';

  /** constructor ** {{{
   */
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      title: 'not loaded',
    };
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    this.setState({ title: 'Welcome!' });
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    return (
      <PagesProvider value={pagesContext}>
        <div className={this.props.className}>
          <Header title={this.state.title}/>
          <Main />
        </div>
      </PagesProvider>
    );
  }/*}}}*/

}
