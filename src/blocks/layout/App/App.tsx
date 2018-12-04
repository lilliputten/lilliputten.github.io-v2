import { cn } from '@bem-react/classname';
// import { Registry, withRegistry, RegistryConsumer } from '@bem-react/di';
import * as React from 'react';

import AppStore from 'lib/flux/AppStore';

import { PagesProvider, IPageContext } from 'lib/pages/PageContext';

import Main from 'blocks/layout/Main/Main';
import Header from 'blocks/layout/Header/Header';

import './App.css';
// import Header from './Header/App-Header';

const cnApp = cn('App');

const pagesContext: IPageContext = {
  AppStore,
};

export interface IAppProps /* extends IClassNameProps */ {
  path: string;
}

export default class App extends React.Component<IAppProps> {

  public block = 'App';

  /** render ** {{{
   */
  public render() {
    return (
      <PagesProvider value={pagesContext}>
        <div className={cnApp()}>
          <Header />
          <Main />
        </div>
      </PagesProvider>
    );
  }/*}}}*/

}
