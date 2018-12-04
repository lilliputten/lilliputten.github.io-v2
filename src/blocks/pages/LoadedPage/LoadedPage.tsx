import { cn } from '@bem-react/classname';
import * as React from 'react';
// import Link from 'lib/pages/PageLink'; // 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';

import './LoadedPage.css';

const cnLoadedPage = cn('LoadedPage');

class LoadedPage extends React.Component {

  public block = 'LoadedPage';

  /** render ** {{{
   */
  public render() {
    return (
      <div className={cnLoadedPage()}>
        {this.props.children}
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(LoadedPage);
