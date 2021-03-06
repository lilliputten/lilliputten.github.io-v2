import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink'; // 'react-router-dom';
import regularPageHOC from 'lib/pages/regularPageHOC';

const cnInfoPage = cn('InfoPage');

export interface IInfoProps extends IClassNameProps {
  text?: string;
}

class InfoPage<P extends IInfoProps> extends React.Component<P> {

  public static defaultProps = {
    text: 'InfoPage: default',
    className: cnInfoPage(),
  };

  public block = 'InfoPage';

  /** render ** {{{
   */
  public render() {
    return (
      <div className={this.props.className}>
        {this.props.text} -
        - <Link to="/">home</Link> -
        - <Link to="/test">test</Link> -
      </div>
    );
  }/*}}}*/

}

export default regularPageHOC(InfoPage);
