// NOTE: Sample, template!
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppActions from 'lib/flux/AppActions';

import './Error.css';

const cnError = cn('Error');

export interface IErrorProps extends IClassNameProps {
  error: any;
  // location?: any;
}

export default class Error<P extends IErrorProps> extends React.Component<P> {

  public block = 'Error';

  /** onReloadClick ** {{{
   */
  onReloadClick (e: any, err: { url: string }) {
    e.preventDefault();
    e.stopPropagation();
    AppActions.fetchPage(err.url);
  }/*}}}*/

  /** getErrorContent ** {{{
   */
  private getErrorContent(err: any): any {

    if (!err) {
      return 'Undefined (empty) error';
    }
    else if (Array.isArray(err)) {
      return err.map((err) => this.getErrorContent(err));
    }
    else if (typeof err !== 'object') {
      return String(err);
    }

    // If object...

    let result;

    if (err.message) {
      result = String(err.message);
    }
    else if (err instanceof Error) {
      // ???
      // return String(err.message || err.stack || err);
      result = String(err);
    }
    else {
      // Try to fetch something...
      result = String(err.description || err.message || err.type || err.error || err);
    }

    // TODO: Make button
    if (err.allowRefetchPage) {
      // const pathname = this.props.location && this.props.location.pathname;
      result = (
        <React.Fragment>
          <div className={cnError('MainMsg')}>
            {result}
          </div>
          <div className={cnError('Button')}>
            <Link onClick={(e) => this.onReloadClick(e, err)} to="">Reload</Link>
          </div>
        </React.Fragment>
      );
    }

    return result;

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {error} = this.props;
    const errorContent = this.getErrorContent(error);
    return (
      <div className={cnError()}>
        <div className={cnError('Title')}>
          Error occured!
        </div>
        <div className={cnError('Message')}>
          {errorContent}
        </div>
      </div>
    );
  }/*}}}*/

}
