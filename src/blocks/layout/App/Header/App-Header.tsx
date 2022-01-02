import * as React from 'react'
import { cn } from '@bem-react/classname'
import AppStore from 'lib/flux/AppStore'

import '../Logo/App-Logo.css'
import './App-Header.css'

const cnApp = cn('App')

const logoSvg = require('../Logo/App-Logo.svg')

export interface IAppHeaderProps {
  title: string;
}

export interface IAppHeaderState {
  pageType?: string;
  loading?: boolean;
}

export default class AppHeader extends React.Component<IAppHeaderProps, IAppHeaderState> {

  public block = 'App'
  public elem = 'Header'

  /** constructor ** {{{
   */
  constructor(props: IAppHeaderProps) {
    super(props)
    this.state = {
    }
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    AppStore.addListener('App_setPageType', this.onPageTypeChanged)
  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {
    AppStore.removeListener('App_setPageType', this.onPageTypeChanged)
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {pageType: mode, loading} = this.state
    return (
      <header className={cnApp('Header', {mode, loading})}>
        <img className={cnApp('Logo')} src={logoSvg} alt="logo" />
        <h1 className={cnApp('Title')}>{this.props.title}</h1>
      </header>
    )
  }/*}}}*/

  // Events...

  /** onPageTypeChanged ** {{{
   */
  private onPageTypeChanged = () => {
    const pageType = AppStore.getPageType()
    if (pageType === 'loading') {
      this.setState({ loading: true })
    } else {
      this.setState({ pageType, loading: false })
    }
  }/*}}}*/

}
