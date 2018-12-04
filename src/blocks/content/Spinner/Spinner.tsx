import { cn } from '@bem-react/classname';
import * as React from 'react';

import './Spinner.css';

const cnSpinner = cn('Spinner');

export interface ISpinnerProps {
}

export default class Spinner<P extends ISpinnerProps> extends React.Component<P> {

  public block = 'Spinner';

  public render() {
    return (
      <div className={cnSpinner()}>
        <div className={cnSpinner('Rotor')}>
          <div className={cnSpinner('Circle')} />
        </div>
      </div>
    );
  }
}
