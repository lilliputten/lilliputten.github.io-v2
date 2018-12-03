// NOTE: Sample, template!
import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink'; // 'react-router-dom';
import AppActions from 'lib/flux/AppActions';

import './Error.css';

const cnError = cn('Error');

export interface IErrorProps extends IClassNameProps {
  error: any;
  // location?: any;
}

export default class Error<P extends IErrorProps> extends React.Component<P> {

  public block = 'Error';

  /** render ** {{{
   */
  public render() {
    const {error} = this.props;
    const errorContent = this.getErrorContent(error);
    return (
      <div className={cnError()}>
        <div className={cnError('Message')}>
          {errorContent}
        </div>
      </div>
    );
  }/*}}}*/

  /** fetchLink ** {{{
   */
  private fetchLink(url: string, e: any) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    AppActions.fetchPage(url);
  }/*}}}*/

  /** getErrorContent ** {{{
   */
  private getErrorContent(err: any): any {

    if (!err) {
      return 'Undefined (empty) error';
    } else if (Array.isArray(err)) {
      return err.map((errItem) => this.getErrorContent(errItem));
    } else if (typeof err !== 'object') {
      return String(err);
    }

    // If object...

    let result;

    if (err.message) {
      result = String(err.message);
    } else if (err instanceof Error) {
      // ???
      // return String(err.message || err.stack || err);
      result = String(err);
    // } else if (typeof err.status === 'number') {
    } else if (err instanceof Response) {
      result = err.statusText || 'Unknown network error';
      if (err.status) {
        result += ` (${err.status})`;
      }
    } else {
      // Try to fetch something...
      result = String(err.description || err.message || err.type || err.error || err);
    }

    result = (
      <div className={cnError('Error')}>
        {result}
      </div>
    );

    if (err.details) {
      const details = this.getErrorContent(err.details);
      result = (
        <React.Fragment>
          {result}
          {details}
        </React.Fragment>
      );
    }

    // Make buttons...
    if (err.allowHomeLink || err.allowReloadLink) {
      result = (
        <React.Fragment>
          {result}
          <div className={cnError('Actions')}>
            {err.allowReloadLink && (<div className={cnError('Button')}>
              <Link onClick={(e) => this.fetchLink(err.url, e)} to={err.url}>Reload</Link>
            </div>)}
            {err.allowHomeLink && (<div className={cnError('Button')}>
              <Link to="/">Home</Link>
            </div>)}
          </div>
        </React.Fragment>
      );
    }

    return result;

  }/*}}}*/

}
