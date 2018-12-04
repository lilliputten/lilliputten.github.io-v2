import * as React from 'react';
import { cn } from '@bem-react/classname';
import AppStore from 'lib/flux/AppStore';
import Link from 'lib/pages/PageLink';

import { site as siteConfig } from 'config';

import './Header-Menu.css';

const cnHeaderMenu = cn('Header', 'Menu');

export interface IHeaderMenuProps {
  mode?: string;
}

export default class HeaderMenu extends React.Component<IHeaderMenuProps> {

  public block = 'Header';
  public elem = 'Menu';

  /** render ** {{{
   */
  public render() {
    const menu = siteConfig.mainMenu;
    const menuContent = menu.map(({url, text}: {url: string, text: string}) =>
      (<Link key={url} to={url}>{text}</Link>));
    return (
      <div className={cnHeaderMenu()}>
      {menuContent}
      </div>
    );
  }/*}}}*/

}
