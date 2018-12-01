import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink'; // 'react-router-dom';

const cnHomePage = cn('HomePage');

export interface IHomeProps extends IClassNameProps {
  text?: string;
}

export default class HomePage<P extends IHomeProps> extends React.Component<P> {

  public static defaultProps = {
    text: 'HomePage: default',
    className: cnHomePage(),
  };

  public block = 'HomePage';

  public render() {
    return (
      <div className={this.props.className}>
        {this.props.text} -
        - <Link to="/info">info</Link> -
        - <Link to="/test">test</Link> -
      </div>
    );
  }
}
