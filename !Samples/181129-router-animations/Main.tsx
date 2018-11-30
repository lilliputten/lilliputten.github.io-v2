import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { css as cssConfig } from 'config';

// Pages
import HomePage from 'blocks/pages/HomePage/HomePage';
import InfoPage from 'blocks/pages/InfoPage/InfoPage';
import TestPage from 'blocks/pages/TestPage/TestPage';
import LoadPage from 'blocks/pages/LoadPage/LoadPage';

import './Main.css';
import '../PageTransition/PageTransition.css';

const cnMain = cn('Main');

// TODO: Extract `PageTransition` to HOC?
const cnPageTransition = cn('PageTransition');

export interface IMainProps extends IClassNameProps {
  text?: string;
}

export default class Main<P extends IMainProps> extends React.Component<P> {

  public static defaultProps = {
    text: 'Main: default',
    // className: cnMain(),
  };

  public block = 'Main';

  public render() {
              // onExited={(arg) => {
              //   console.log(arg, arguments);
              //   debugger;
              // }}
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup className={cnMain()}>
            <CSSTransition
              in={true}
              appear={true}
              key={location.pathname}
              timeout={cssConfig.pageTransitionTimeout}
              classNames={{
                appear: cnPageTransition({ entering: true }),
                appearActive: cnPageTransition({ entering: 'active' }),
                enter: cnPageTransition({ entering: true }),
                enterActive: cnPageTransition({ entering: 'active' }),
                enterDone: cnPageTransition(),
                exit: cnPageTransition({ exiting: true }),
                exitActive: cnPageTransition({ exiting: 'active' }),
                exitDone: cnPageTransition(),
              }}
            >
              <Switch location={location}>
                <Route exact path="/" component={HomePage} />
                <Route path="/info" component={InfoPage} />
                <Route path="/test" component={TestPage} />
                <Route component={LoadPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}
