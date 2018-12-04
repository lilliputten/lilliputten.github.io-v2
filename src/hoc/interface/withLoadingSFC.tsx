// NOTE: Sample!

import * as React from 'react';

import Spinner from '../../blocks/interface/Spinner/Spinner';

interface IWithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>): React.SFC<P & IWithLoadingProps> =>
  ({ loading, ...props }: IWithLoadingProps) =>
    loading ? <Spinner /> : <Component {...props} />;

export default withLoading;
