import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { HashRouter } from 'react-router-dom';

import Main from 'blocks/layout/Main/Main';

import './App.css';
import Header from './Header/App-Header';

// DEMO: Import config:
// import { css as cssConfig } from 'config';
// console.log(cssConfig);
// // import * as config from 'config';
// // console.log(config);
// debugger;

const cnApp = cn('App');

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

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      title: 'not loaded',
    };
  }

  public componentDidMount() {
    this.setState({ title: 'Welcome to BEM in the TypeScript world' });
  }

  public render() {
      // <Fragment>
      //   <Header title={this.state.title}/>
      //   <ExampleWithMods mod1 />
      //   <ExampleWithMods mod1 mod2 />
      //   <Bem block='App' elem='Intro'>
      //     To get started, edit <code>{this.props.path}</code> and save to reload.
      //   </Bem>
      //   <div className={cnApp('Intro')}>
      //     To get started, edit <code>{this.props.path}</code> and save to reload.
      //   </div>
      // </Fragment>
    return (
      <HashRouter>
        <div className={this.props.className}>
          <Header title={this.state.title}/>
          <Main text="Main: content" />
        </div>
      </HashRouter>
    );
  }
}
