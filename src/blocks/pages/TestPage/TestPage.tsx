import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { compose } from 'ramda';

import mod1 from 'blocks/demo/Example/_mod1/Example_mod1';
import mod2 from 'blocks/demo/Example/_mod2/Example_mod2';
import Example from 'blocks/demo/Example/Example';

// import { Transition, Spring, animated, config } from 'react-spring';
// import Transition from 'react-transition-group';
import Transition from 'react-transition-group/Transition';

import './TestPage.css';

const ExampleWithMods = compose(mod1, mod2)(Example);

const cnTest = cn('TestPage');

export interface ITestProps extends IClassNameProps {
  text?: string;
  match?: any;
  // style?: any;
}
export interface ITestState {
  show: boolean;
  entered: boolean;
}

// export default class TestPage<P extends ITestProps> extends React.Component<P> {
export default class TestPage extends React.Component<ITestProps, ITestState> {

  public static defaultProps = {
    text: 'TestPage: default',
    className: cnTest(),
  };

  public block = 'TestPage';

  /** render ** {{{
   */
  public render() {
    return (
      <div className={cnTest(/* null, ['MainPage'] */)}>
        {this.props.text} -
        - <Link to="/">home</Link> -
        - <Link to="/info">info</Link> -
        <ExampleWithMods mod1={true} />
        <ExampleWithMods mod1={true} mod2={true} text="Example: app" />
      </div>
    );
  }/*}}}*/

}
