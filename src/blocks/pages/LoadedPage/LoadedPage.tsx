import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import regularPageHOC from 'lib/pages/regularPageHOC';

import './LoadedPage.css';

const cnLoad = cn('LoadedPage');

// export interface ILoadedPageProps extends IClassNameProps {
//   // text?: string; // DEBUG
// }
// export interface ILoadedPageState {
//   // content?: React.Component | string | null;
// }

// TODO: Load page with `this.props.location.pathname`
class LoadedPage extends React.Component/* <ILoadedPageProps, ILoadedPageState> */ {

  public static defaultProps = {
    // text: 'LoadedPage: default',
    // className: cnLoad(),
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
      <div className={cnLoad()}>
        {this.props.children}
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(LoadedPage);
