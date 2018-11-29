import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';
import { css as cssConfig } from 'config';

import './LoadedPage.css';

const cnLoadedPage = cn('LoadedPage');
const cnPageTransition = cn('PageTransition');

export interface ILoadedPageProps {
  // text?: string; // DEBUG
}
export interface ILoadedPageState {
  // content?: React.Component | string | null;
  className: string;
}

class LoadedPage extends React.Component<ILoadedPageProps, ILoadedPageState> {

  // public static defaultProps = {
  // };

  public block = 'LoadedPage';

  /** constructor ** {{{
   */
  constructor(props: ILoadedPageProps) {

    super(props);

    // Initialize inactive animation
    this.state = {
      className: cnLoadedPage(),
      // className: [cnLoadedPage(), cnPageTransition({ entering: true })].join(' '),
    };

  }/*}}}*/
  // /** componentWillMount ** {{{
  //  */
  // public componentWillMount() {
  // }/*}}}*/
  // /** componentDidMount ** {{{
  //  */
  // public componentDidMount() {
  //   // Animation not works?
  //   // Start animation
  //   this.setState({
  //     className: [cnLoadedPage(), cnPageTransition({ entering: true }), cnPageTransition({ entering: 'active' })].join(' '),
  //   });
  //   // // DEBUG!
  //   // setTimeout(() => {
  //   //   console.log(this.state);
  //   //   debugger;
  //   // }, 0);
  //   // Clear animation
  //   setTimeout(() => this.setState({
  //     className: cnLoadedPage(),
  //   }), cssConfig.pageTransitionTimeout);
  // }/*}}}*/

  /** render ** {{{
   */
  public render() {
    return (
      <div className={this.state.className}>
        <div className={cnLoadedPage('Debug')}>
          LoadedPage -
          - <Link to="/">home</Link> -
          - <Link to="/info">info</Link> -
          - <Link to="/test">test</Link> -
        </div>
        {this.props.children}
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(LoadedPage);
