// NOTE: Sample!

import * as React from 'react';

import LoadingSpinner from '../../blocks/interface/LoadingSpinner/LoadingSpinner';

interface IWithLoadingProps {
  loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>): React.SFC<P & IWithLoadingProps> =>
  ({ loading, ...props }: IWithLoadingProps) =>
    loading ? <LoadingSpinner /> : <Component {...props} />;

export default withLoading;
