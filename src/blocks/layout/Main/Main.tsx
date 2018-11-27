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

import './Main.css';
import '../PageTransition/PageTransition.css';

const cnMain = cn('Main');
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
    return (
        <Route
          render={({ location }) => (
            <TransitionGroup className={cnMain()}>
              <CSSTransition
                key={location.pathname}
                timeout={cssConfig.pageTransitionTimeout}
                classNames={{
                  appear: cnPageTransition({ appear: true }),
                  appearActive: cnPageTransition({ appear: 'active' }),
                  enter: cnPageTransition({ entering: true }),
                  enterActive: cnPageTransition({ entering: 'active' }),
                  // enterDone: cnPageTransition({ entered: true }),
                  exit: cnPageTransition({ exiting: true }),
                  exitActive: cnPageTransition({ exiting: 'active' }),
                  // exitDone: cnPageTransition({ exited: true }),
                }}
              >
                <Switch location={location}>
                  <Route exact path="/" component={HomePage}/>
                  <Route path="/info" component={InfoPage}/>
                  <Route path="/test" component={TestPage}/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
    );
  }
}
