import * as React from 'react';
import { cn } from '@bem-react/classname';
import AppStore from 'lib/flux/AppStore';

import './Header-Logo.css';

const cnAppLogo = cn('App', 'Logo');

// const logoSvg = require('../Logo/App-Logo.svg');

export interface IAppLogoProps {
  mode?: string;
}

export interface IAppLogoState {
}

export default class AppLogo extends React.Component<IAppLogoProps, IAppLogoState> {

  public block = 'App';
  public elem = 'Logo';

  /** render ** {{{
   */
  public render() {
    return (
      <span className={cnAppLogo()}>
        Logo
      </span>
    );
  }/*}}}*/

}
