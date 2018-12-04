import * as React from 'react';
import { cn } from '@bem-react/classname';

import AppStore from 'lib/flux/AppStore';
import AppActions from 'lib/flux/AppActions';
import PageTools from 'lib/pages/PageTools';

import Logo from './Logo/Header-Logo';
import Menu from './Menu/Header-Menu';

import './Header.css';

const cnHeader = cn('Header');

export interface IHeaderProps {
  mode?: string;
  loading?: boolean;
}

export default class Header extends React.Component<IHeaderProps> {

  public block = 'Header';

  private pageTools = new PageTools();

  /** render ** {{{
   */
  public render() {
    const {mode, loading} = this.props;
    return (
      <div className={cnHeader({mode, loading})}>
        <div className={cnHeader('Container')}>
          <Logo onClick={this.onLogoClick} mode={mode} />
          <Menu mode={mode} />
        </div>
      </div>
    );
  }/*}}}*/

  /** onLogoClick ** {{{
   */
  private onLogoClick = (e: any) => {
    if (this.props.mode !== 'home') {
      this.pageTools.setUrlToWindow('/');
    }
  }/*}}}*/

}
