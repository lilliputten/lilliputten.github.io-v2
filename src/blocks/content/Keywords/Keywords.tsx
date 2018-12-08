import * as React from 'react';
import { classnames, cn } from '@bem-react/classname';
import { compose, IClassNameProps } from '@bem-react/core';

// NOTE: Import own styles before mods!
import './Keywords.css';

import { KeywordsDelimited, IKeywordsDelimitedProps } from './_delimited/Keywords_delimited';

import KeywordsItem from './-Item/Keywords-Item';


const cnKeywords = cn('Keywords');

export {cnKeywords};

export interface IKeywordsProps extends IKeywordsDelimitedProps, IClassNameProps {
  tags?: string[];
  title?: string;
  // children?: React.ReactNode; // NOTE: children not used (See `Example`...)
}

class Keywords<P extends IKeywordsProps> extends React.Component<P> {

  public block = 'Keywords';

  /** render ** {{{
   */
  public render() {
    const {tags, title} = this.props;
    const list = Array.isArray(tags) && tags.map((tag) => <KeywordsItem key={tag} name={tag} />);
    const className = classnames(cnKeywords(), this.props.className);
    return (
      <div className={className}>
        {title && (<span className={cnKeywords('Title')}>
          {title}
        </span>)}
        {list && (<ul className={cnKeywords('List')}>
          {list}
        </ul>)}
      </div>
    );
  }/*}}}*/

}

export default compose.apply(null, [
  KeywordsDelimited,
])(Keywords);

