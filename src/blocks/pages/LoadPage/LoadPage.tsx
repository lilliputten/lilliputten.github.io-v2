// import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { IPageContext } from 'lib/pages/PageContext';
import { TPage } from 'lib/pages/PageTools';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import Error from 'blocks/interface/Error/Error';
import withPageContextHOC from 'lib/pages/withPageContextHOC';
import { Route, Switch } from 'react-router-dom';

import AppActions from 'lib/flux/AppActions';
import AppStore from 'lib/flux/AppStore';

import './LoadPage.css';

// const cnLoadPage = cn('LoadPage');

export interface ILoadPageProps extends IClassNameProps {
  text?: string; // DEBUG
  location: any;
  context: IPageContext;
}
export interface ILoadPageState {
  content?: JSX.Element | React.Component | string | null;
}

class LoadPage extends React.Component<ILoadPageProps, ILoadPageState> {

  public static defaultProps = {
    text: 'LoadPage: default',
    // className: cnLoadPage(),
  };

  public block = 'LoadPage';

  /** constructor ** {{{
   */
  constructor(props: ILoadPageProps) {

    super(props);

    this.state = {
    };

    this.onPageUpdated = this.onPageUpdated.bind(this);
    this.onErrorThrown = this.onErrorThrown.bind(this);

  }/*}}}*/

  /** onPageUpdated ** {{{
   */
  onPageUpdated() {
    const page = AppStore.getCurrentPage();
    const content = (
      <LoadedPage {...this.props}>
        {page && page.content}
      </LoadedPage>
    );
    this.setState({ content });
  }/*}}}*/
  /** onErrorThrown ** {{{
   */
  onErrorThrown() {
    const err = AppStore.getError();
    const content = (
      <Error {...this.props} error={err} />
    );
    this.setState({ content });
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {

    const props = this.props;

    const {pathname} = props.location;

    AppStore.addListener('pageUpdated', this.onPageUpdated);
    AppStore.addListener('errorThrown', this.onErrorThrown);

    AppActions.fetchPage(pathname);

  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {

    AppStore.removeListener('pageUpdated', this.onPageUpdated);
    AppStore.removeListener('errorThrown', this.onErrorThrown);

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
      // <div className={cnLoadPage()}>
      //   {this.state.content}
      // </div>
      // <React.Fragment>
      //   {this.state.content}
      // </React.Fragment>
      // <Route
      //   render={
      //     ({ location }) => state.content || null
      //   }
      // />
    // TODO: Animate rendered content?
    // const state = this.state;
    return (
      <React.Fragment>
        {this.state.content}
      </React.Fragment>
    );
  }/*}}}*/

}

export default withPageContextHOC(LoadPage);
