import * as React from 'react';
import PageLoader from 'lib/pages/PageLoader';

export interface IPagesContext {
  pageLoader: PageLoader;
}

const PagesContext = React.createContext<IPagesContext | null>(null);

export const PagesProvider = PagesContext.Provider;
export const PagesConsumer = PagesContext.Consumer;
