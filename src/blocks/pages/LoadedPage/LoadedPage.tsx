import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink';
// import Link from 'lib/pages/PageLink'; // 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';
// import { css as cssConfig } from 'config';

import './LoadedPage.css';

const cnLoadedPage = cn('LoadedPage');
// const cnPageTransition = cn('PageTransition');

// export interface ILoadedPageProps {
//   // text?: string; // DEBUG
// }
// export interface ILoadedPageState {
//   // content?: React.Component | string | null;
//   // className: string;
// }

class LoadedPage extends React.Component/* <ILoadedPageProps, ILoadedPageState> */ {

  public block = 'LoadedPage';

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
