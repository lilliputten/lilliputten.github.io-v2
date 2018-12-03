import * as React from 'react';
import { cn } from '@bem-react/classname';

import './solarized-dark.css';

const Lowlight = require('react-lowlight');
const js = require('highlight.js/lib/languages/javascript');
Lowlight.registerLanguage('js', js);

const cnCodeBlock = cn('CodeBlock');

export interface ICodeBlockProps {
  content: string;
  language: string;
  inline: boolean;
}

export default class CodeBlock extends React.Component<ICodeBlockProps> {

  public block = 'CodeBlock';

  // ???
  // shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  // },

  /** render ** {{{
   */
  public render() {
    return (
      <div className={cnCodeBlock()}>
        <Lowlight
          language={this.props.language || 'js'}
          value={this.props.content}
          inline={this.props.inline}
        />
      </div>
    );
  }/*}}}*/

}
