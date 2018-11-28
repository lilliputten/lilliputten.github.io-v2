import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';

import { compose } from 'ramda';

import mod1 from 'blocks/demo/Example/_mod1/Example_mod1';
import mod2 from 'blocks/demo/Example/_mod2/Example_mod2';
import Example from 'blocks/demo/Example/Example';

import './TestPage.css';

const ExampleWithMods = compose(mod1, mod2)(Example);

const cnTestPage = cn('TestPage');

export interface ITestPageProps extends IClassNameProps {
  text?: string;
  // match?: any;
}
export interface ITestPageState {
  timestamp?: number;
}

class TestPage extends React.Component<ITestPageProps, ITestPageState> {

  public static defaultProps = {
    text: 'TestPage: default',
    className: cnTestPage(),
  };

  public block = 'TestPage';

  private timestamp: number;

  /** constructor ** {{{
   */
  constructor(props: ITestPageProps) {
    super(props);
    this.state = {
    };
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    // console.log('TestPage componentDidMount', this.timestamp, this.props, this.state);
    // debugger;
    // DEBUG!
    if (!this.timestamp) {
      this.timestamp = Date.now();
    }
    this.setState({ timestamp: this.timestamp });
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    return (
      <div className={cnTestPage(/* null, ['MainPage'] */)}>
        {this.props.text} -
        - <Link to="/">home</Link> -
        - <Link to="/info">info</Link> -
        - <Link to="/try">try</Link> -
        <ExampleWithMods mod1={true} />
        <ExampleWithMods mod1={true} mod2={true} text="Example: app" />
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(TestPage);
