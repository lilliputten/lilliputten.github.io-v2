import * as React from 'react';
import { cn } from '@bem-react/classname';

import AppStore from 'lib/flux/AppStore';

import Logo from './Logo/Header-Logo';
import Menu from './Menu/Header-Menu';

import './Header.css';

const cnHeader = cn('Header');

export interface IHeaderProps {
}
export interface IHeaderState {
  pageType?: string;
  loading?: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {

  public block = 'Header';

  /** constructor ** {{{
   */
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
    };
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    AppStore.addListener('App_setPageType', this.onPageTypeChanged);
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {pageType: mode, loading} = this.state;
    return (
      <div className={cnHeader({mode, loading})}>
        <Logo mode={mode} />
        <Menu mode={mode} />
      </div>
    );
  }/*}}}*/

  // Events...

  /** onPageTypeChanged ** {{{
   */
  private onPageTypeChanged = () => {
    const pageType = AppStore.getPageType();
    if (pageType === 'loading') {
      this.setState({ loading: true });
    } else {
      this.setState({ pageType, loading: false });
    }
  }/*}}}*/

}
