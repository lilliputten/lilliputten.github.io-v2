import * as React from 'react'
// import PageLoader from 'lib/pages/PageLoader';
import { AppStoreClass } from 'lib/flux/AppStore'

export interface IPageContext {
  // pageLoader: PageLoader;
  AppStore: AppStoreClass;
}

const PageContext = React.createContext<IPageContext | null>(null)

export const PagesProvider = PageContext.Provider
export const PagesConsumer = PageContext.Consumer
