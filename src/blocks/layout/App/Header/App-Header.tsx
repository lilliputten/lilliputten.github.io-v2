import { cn } from '@bem-react/classname';
import * as React from 'react';

import '../Logo/App-Logo.css';
import './App-Header.css';

const cnApp = cn('App');

const logoSvg = require('../Logo/App-Logo.svg');

export interface IElemProps {
  title: string;
}

export default class AppHeader extends React.Component<IElemProps> {
  public block = 'App';
  public elem = 'Header';

  public render() {
    return (
      <header className={cnApp('Header')}>
        <img className={cnApp('Logo')} src={logoSvg} alt="logo" />
        <h1 className={cnApp('Title')}>{this.props.title}</h1>
      </header>
    );
  }

}
