import * as React from 'react';
import { cn } from '@bem-react/classname';
import AppStore from 'lib/flux/AppStore';
import Link from 'lib/pages/PageLink';

import { site as siteConfig } from 'config';

import './Header-Menu.css';

const cnAppMenu = cn('App', 'Menu');

export interface IAppMenuProps {
  mode?: string;
}

export interface IAppMenuState {
}

export default class AppMenu extends React.Component<IAppMenuProps, IAppMenuState> {

  public block = 'App';
  public elem = 'Menu';

  /** render ** {{{
   */
  public render() {
    const menu = siteConfig.mainMenu;
    const menuContent = menu.map(({url, text}: {url: string, text: string}) => (<Link to={url}>{text}</Link>));
    return (
      <span className={cnAppMenu()}>
      {menuContent}
      </span>
    );
  }/*}}}*/

}
