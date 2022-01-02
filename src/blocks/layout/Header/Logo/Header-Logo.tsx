import * as React from 'react'
import { cn } from '@bem-react/classname'
import AppStore from 'lib/flux/AppStore'

import './Header-Logo.css'

const cnHeaderLogo = cn('Header', 'Logo')

const logoSvg = require('./LogoW.svg')

export interface IHeaderLogoProps {
  mode?: string;
  onClick: (e: any) => void;
}

export default class HeaderLogo extends React.Component<IHeaderLogoProps> {

  public block = 'Header'
  public elem = 'Logo'

  /** render ** {{{
   */
  public render() {
    return (
      <div onClick={this.props.onClick} className={cnHeaderLogo()}>
        <img className={cnHeaderLogo('LogoImg')} src={logoSvg} alt="Logo" />
      </div>
    )
  }/*}}}*/

}
