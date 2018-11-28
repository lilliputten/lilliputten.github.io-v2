// NOTE: Sample!

// import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';

import LoadingSpinner from '../../blocks/interface/LoadingSpinner/LoadingSpinner';

// import Example from '../../blocks/demo/Example/Example';
// import Example from 'blocks/demo/Example/Example';

interface IWithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & IWithLoadingProps> {
    public render() {
      const { loading, ...props } = this.props as IWithLoadingProps;
      return loading ? <LoadingSpinner /> : <Component {...props} />;
    }
  };

export default withLoading;
