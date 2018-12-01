// NOTE: Sample!

import * as React from 'react';

interface IPageLinkProps {
  to: string;
  onClick?: ((e: any) => void) | (() => {}) | undefined;
  children: any;
}

// export default class Main extends React.Component<IMainProps, IMainState> {
export default class PageLink extends React.Component<IPageLinkProps> {
  public render() {
    const { to } = this.props;
    const hash = '#' + (to || '/');
    return (
      <a href={hash} onClick={this.props.onClick}>{this.props.children}</a>
    );
  }
}
