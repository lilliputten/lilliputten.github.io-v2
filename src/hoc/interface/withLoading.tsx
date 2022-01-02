// NOTE: Sample!

// import { cn } from '@bem-react/classname';
// import { IClassNameProps } from '@bem-react/core';
import * as React from 'react'

import Spinner from '../../blocks/interface/Spinner/Spinner'

// import Example from '../../blocks/demo/Example/Example';
// import Example from 'blocks/demo/Example/Example';

interface IWithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & IWithLoadingProps> {
    public render() {
      const { loading, ...props } = this.props as IWithLoadingProps
      return loading ? <Spinner /> : <Component {...props} />
    }
  }

export default withLoading
