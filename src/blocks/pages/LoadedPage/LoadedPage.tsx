import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';

import './LoadedPage.css';

const cnLoadedPage = cn('LoadedPage');

// export interface ILoadedPageProps extends IClassNameProps {
//   // text?: string; // DEBUG
// }
// export interface ILoadedPageState {
//   // content?: React.Component | string | null;
// }

class LoadedPage extends React.Component/* <ILoadedPageProps, ILoadedPageState> */ {

  public static defaultProps = {
    // text: 'LoadedPage: default',
    // className: cnLoadedPage(),
  };

  public block = 'LoadedPage';

  // /** constructor ** {{{
  //  */
  // constructor(props: ILoadedPageProps) {
  //
  //   super(props);
  //
  //   this.state = {
  //   };
  //
  // }/*}}}*/
  // /** componentWillMount ** {{{
  //  */
  // public componentWillMount() {
  // }/*}}}*/

  /** render ** {{{
   */
  public render() {
    return (
      <div className={cnLoadedPage()}>
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
