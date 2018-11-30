import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { IPageContext } from 'lib/pages/PageContext';
import { TPage } from 'lib/pages/PageTools';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import Error from 'blocks/interface/Error/Error';
import withPageContextHOC from 'lib/pages/withPageContextHOC';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { css as cssConfig } from 'config';

import AppActions from 'lib/flux/AppActions';
import AppStore from 'lib/flux/AppStore';

import './LoadPage.css';

const cnLoadPage = cn('LoadPage');
const cnPageTransition = cn('PageTransition');

export interface ILoadPageProps extends IClassNameProps {
  text?: string; // DEBUG
  location: any;
  context: IPageContext;
}
export interface ILoadPageState {
  key: string;
  content: JSX.Element | React.Component | string | null;
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
      key: 'loading',
      content: 'loading...',
    };

    this.onPageUpdated = this.onPageUpdated.bind(this);
    this.onErrorThrown = this.onErrorThrown.bind(this);

  }/*}}}*/

  /** onPageUpdated ** {{{
   */
  onPageUpdated() {
    const page = AppStore.getCurrentPage();
    const key = AppStore.getCurrentPageKey();
    const content = (
      <LoadedPage key={key} {...this.props}>
        {page && page.content}
      </LoadedPage>
    );
    this.setState({ key, content });
  }/*}}}*/
  /** onErrorThrown ** {{{
   */
  onErrorThrown() {
    const err = AppStore.getError();
    const key = 'error';
    const content = (
      <Error key={key} {...this.props} error={err} />
    );
    this.setState({ key, content });
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
    return (
      <CSSTransition
        in={true}
        appear={true}
        key={location.pathname}
        timeout={cssConfig.pageTransitionTimeout}
        classNames={{
          appear: cnPageTransition({ entering: true }),
          appearActive: cnPageTransition({ entering: 'active' }),
          enter: cnPageTransition({ entering: true }),
          enterActive: cnPageTransition({ entering: 'active' }),
          enterDone: cnPageTransition(),
          exit: cnPageTransition({ exiting: true }),
          exitActive: cnPageTransition({ exiting: 'active' }),
          exitDone: cnPageTransition(),
        }}
      >
        <div key={this.state.key} className={cnLoadPage({ key: this.state.key }, ['PageTransition'])}>
          {this.state.content}
        </div>
      </CSSTransition>
    );
  }/*}}}*/

}

export default withPageContextHOC(LoadPage);
