import * as React from 'react';
import { cn } from '@bem-react/classname';

import './CodeBlock.css';
import 'highlight.js/styles/solarized-dark.css';

const Lowlight = require('react-lowlight');

// Used languages list
const usedLanguages: { [id: string]: any } = {
  'js,javascript': require('highlight.js/lib/languages/javascript'),
  'shell': require('highlight.js/lib/languages/shell'),
  'sh,bash': require('highlight.js/lib/languages/shell'),
  'html,xml': require('highlight.js/lib/languages/xml'),
  'css': require('highlight.js/lib/languages/css'),
};

// Init languages...
Object.keys(usedLanguages).map((names) => {
  names.split(',').map((name) => {
    Lowlight.registerLanguage(name, usedLanguages[names]);
  });
});

const cnCodeBlock = cn('CodeBlock');

export interface ICodeBlockProps {
  content: string;
  language: string;
}

export default class CodeBlock extends React.Component<ICodeBlockProps> {

  public block = 'CodeBlock';

  /** render ** {{{
   */
  public render() {
    const {language, content} = this.props;
    const hasLanguage = language && Lowlight.hasLanguage(language);
    return (
      <div className={cnCodeBlock()}>
      { hasLanguage ? (
          <Lowlight
            language={language}
            value={content}
            inline={false}
          />
        ) : (
          <pre>
            <code className={['hljs'].concat(language).filter((_) => _).join(' ')}>{content}</code>
          </pre>
        )
      }
      </div>
    );
  }/*}}}*/

}
