import * as React from 'react';

/**
 * @see https://github.com/rexxars/react-markdown
 * @see https://github.com/remarkjs/remark/blob/master/doc/plugins.md
 * @see https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-comments
 */
const ReactMarkdown = require('react-markdown');
const remarkComments = require('remark-comments');
const yaml = require('js-yaml');

export type TParseResult = React.Component; // | string | null;
export interface IParseProps {
  source: string;
  className?: string;
}

export default class MdReactParser {

  /** plugins[] ** {{{
   */
  private plugins: Array<Array<any> | null> = [
    [ remarkComments, {
      beginMarker: 'foo',
      endMarker: 'bar',
    } ],
  ];/*}}}*/

  /** renderers{} ** {{{
   */
  private renderers = {
    // Comments (TODO)
    comments: (props: any) => {
      console.log(props);
      return null;
    },
    // Our own heading...
    heading: (props: any) => {
      const inner = React.createElement('span', {className: 'inner'}, props.children)
      return React.createElement('h'.concat(props.level), {}, inner);
    },

  };/*}}}*/

  /** constructor() ** {{{ */
  constructor() {
  }/*}}}*/

  /** parseFrontmatter() ** {{{
   */
    private parseFrontmatter(source: string): {frontmatter: object, source: string} {
      let frontmatter = {};
      // Has frontmatter data?
      const match = source.match(/^\s*---\s*\n([\s\S]*)---\s*\n\s*\n/m);
      // Parse frontmatter if found...
      if (match) {
        const found = match[0];
        const frontmatterSrc = match[1];
        frontmatter = yaml.safeLoad(frontmatterSrc);
        if (!frontmatter || typeof frontmatter !== 'object') {
          throw new Error('Cannot parse frontmatter data for ""' + frontmatterSrc + '"');
        }
        // Strip frontmatter data...
        source = source.substr(found.length);
      }
      return { frontmatter, source };
  }/*}}}*/

  /** parse() ** {{{
   */
  public parse(props: IParseProps): {frontmatter: object, content: React.ReactElement<any>} {
    const {plugins, renderers} = this;
    const {frontmatter, source} = this.parseFrontmatter(props.source);
    const content = React.createElement(ReactMarkdown, {...props, source, plugins, renderers });
    return {frontmatter, content};
  }/*}}}*/

}

