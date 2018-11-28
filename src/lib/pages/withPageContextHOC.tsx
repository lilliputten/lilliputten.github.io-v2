import * as React from 'react';
import { PagesConsumer, IPageContext } from './PageContext';

// NOTE: @see hack at [Using React Context in a TypeScript
// App](https://medium.com/@thehappybug/using-react-context-in-a-typescript-app-c4ef7504c858)
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default <
    Context extends { context?: IPageContext },
    P = Omit<Context, 'context'>
  >(Component: React.ComponentClass<Context> | React.StatelessComponent<Context>): React.SFC<P> =>
    (props: P) => (
      <PagesConsumer>
        {(context) => <Component {...props} context={context} />}
      </PagesConsumer>
    );
