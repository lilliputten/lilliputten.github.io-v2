// NOTE: Sample, template!
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';

const cnLoadingSpinner = cn('LoadingSpinner');

// export interface ILoadingSpinnerProps extends IClassNameProps {
// }

export default class LoadingSpinner<P /* extends ILoadingSpinnerProps */> extends React.Component<P> {

  public block = 'LoadingSpinner';

  public render() {
    return (
      <div className={cnLoadingSpinner()}>
        Loading...
      </div>
    );
  }
}
