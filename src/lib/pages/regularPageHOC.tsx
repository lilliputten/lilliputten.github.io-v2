import * as React from 'react'

interface IRegularPageHOCProps {
  location?: object;
}

export default <P extends object>(Component: React.ComponentType<P>) =>
  class RegularPageHOC extends React.Component<P & IRegularPageHOCProps> {

    // /** componentDidMount ** {{{
    //  */
    // public componentDidMount() {
    //   console.log('regularPageHOC componentDidMount', this.props, this.state);
    //   debugger;
    // }/*}}}*/

    /** render ** {{{
     */
    public render() {
      return (
        <Component {...this.props} />
      )
    }/*}}}*/

  }
