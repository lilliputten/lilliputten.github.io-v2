import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink'; // 'react-router-dom';

import './HomePage.css';

const cnHomePage = cn('HomePage');

export default class HomePage extends React.Component {

  public block = 'HomePage';

  public render() {
    return (
      <div className={cnHomePage()} />
    );
  }
}
