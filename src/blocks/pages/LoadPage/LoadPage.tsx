// import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
// import { Link } from 'react-router-dom';
import { IPagesContext } from 'lib/pages/PagesContext';
import { IPage } from 'lib/pages/PageLoader';
import LoadedPage from 'blocks/pages/LoadedPage/LoadedPage';
import withPageContextHOC from 'lib/pages/withPageContextHOC';

import './LoadPage.css';

// const cnLoad = cn('LoadPage');

export interface ILoadPageProps extends IClassNameProps {
  text?: string; // DEBUG
  location: any;
  context: IPagesContext;
  // pageLoader: PageLoader;
}
export interface ILoadPageState {
  content?: JSX.Element | React.Component | string | null;
}

class LoadPage extends React.Component<ILoadPageProps, ILoadPageState> {

  public static defaultProps = {
    text: 'LoadPage: default',
    // className: cnLoad(),
  };

  public block = 'LoadPage';

  /** constructor ** {{{
   */
  constructor(props: ILoadPageProps) {

    super(props);

    this.state = {
    };

  }/*}}}*/

  /** componentWillMount ** {{{
   */
  public componentWillMount() {

    const props = this.props;

    const {pageLoader} = props.context;
    const {pathname} = props.location;

    pageLoader.getPage({pathname})
      .then((page: IPage) => {
        const content = (
          <LoadedPage {...props}>
            {page.content}
          </LoadedPage>
        );
        this.setState({ content });
      })
      .catch((err: any) => {
        console.error('LoadPage error', err); // tslint:disable-line no-console
        debugger; // tslint:disable-line no-debugger
      })
    ;

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
      // <div className={cnLoad()}>
      //   {this.state.content}
      // </div>
    return (
      <React.Fragment>
        {this.state.content}
      </React.Fragment>
    );
  }/*}}}*/

}

export default withPageContextHOC(LoadPage);
