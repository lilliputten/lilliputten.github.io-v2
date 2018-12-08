import { cn } from '@bem-react/classname';
import * as React from 'react';
// import Link from 'lib/pages/PageLink'; // 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';
import Keywords from 'blocks/content/Keywords/Keywords';

import './LoadedPage.css';

const cnLoadedPage = cn('LoadedPage');

export interface ILoadedPageProps {
  tags?: string[];
}

class LoadedPage extends React.Component<ILoadedPageProps> {

  public block = 'LoadedPage';

  /** render ** {{{
   */
  public render() {
    const {tags} = this.props;
    return (
      <div className={cnLoadedPage()}>
        {this.props.children}
        {tags && (<Keywords className={cnLoadedPage('Tags')} delimited={true} title="Tags" tags={tags} />)}
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(LoadedPage);
