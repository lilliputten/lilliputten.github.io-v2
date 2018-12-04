import { cn } from '@bem-react/classname';
import * as React from 'react';

import './LoadingSpinner.css';

const cnLoadingSpinner = cn('LoadingSpinner');

export interface ILoadingSpinnerProps {
}

export default class LoadingSpinner<P extends ILoadingSpinnerProps> extends React.Component<P> {

  public block = 'LoadingSpinner';

  public render() {
    return (
      <div className={cnLoadingSpinner()}>
        <div className={cnLoadingSpinner('Rotor')}>
          <div className={cnLoadingSpinner('Circle')}>
          </div>
        </div>
      </div>
    );
  }
}
