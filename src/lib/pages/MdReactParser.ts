import * as React from 'react';

import CodeBlock from 'blocks/content/CodeBlock/CodeBlock';
import Gallery from 'blocks/content/Gallery/Gallery';
import List from 'blocks/content/List/List';
import LoadingSpinner from 'blocks/content/LoadingSpinner/LoadingSpinner';

/**
 * @see https://github.com/rexxars/react-markdown
 * @see https://github.com/remarkjs/remark/blob/master/doc/plugins.md
 * @see https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-comments
 */
// const ReactMarkdown = require('react-markdown');
const ReactMarkdown = require('react-markdown/lib/with-html');
const remarkCustomComments = require('./remark-custom-comments');
const yaml = require('js-yaml');

export type TParseResult = React.Component; // | string | null;
export interface IParseProps {
  source: string;
  className?: string;
}

export default class MdReactParser {

  /** plugins[] */
  private plugins: Array<any | null> = [
    [ remarkCustomComments ],
  ];

  /** customTagHandlers */
  private customTagHandlers: { [id: string]: any } = {
    COMMENTS: null,
    SPINNER: (props: any) => React.createElement(LoadingSpinner),
    GALLERY: (props: any) => React.createElement(Gallery, {...props.data, id: props.id}),
  };

  /** renderers{} ** {{{
   * @see node_modules/react-markdown/lib/renderers.js
   */
  private renderers = {
    /** customComments ** {{{
     */
    customComments: (props: any) => {
      const result = (props.tag && this.customTagHandlers[props.tag]) ? this.customTagHandlers[props.tag] : null;
      return (typeof result === 'function') ? result(props) : result;
    },/*}}}*/
    /** heading ** {{{
     */
    heading: (props: any) => {
      const inner = React.createElement('span', {className: 'inner'}, props.children);
      return React.createElement('h'.concat(props.level), {}, inner);
    },/*}}}*/
    /** text ** {{{
     */
    text: (props: any) => {
      const text = (typeof props.children === 'string') ? this.smartypants(props.children) : props.children;
      return text;
    },/*}}}*/
    /** code ** {{{
     */
    code: (props: any) => {
      const codeProps = {
        content: props.value,
        language: props.language,
      };
      return React.createElement(CodeBlock, codeProps, null);
    },/*}}}*/
    /** list ** {{{
     */
    list: (props: any) => {
      return React.createElement(List, props, props.children);
    },/*}}}*/
    // listItem: ListItem,
  };
  /*}}}*/

  /** parse() ** {{{
   */
  public parse(props: IParseProps): {frontmatter: object, content: React.ReactElement<any>} {
    const {plugins, renderers} = this;
    const {frontmatter, source} = this.parseFrontmatter(props.source);
    const content = React.createElement(ReactMarkdown, {
      ...props,
      escapeHtml: false,
      source,
      plugins,
      renderers,
    });
    return {frontmatter, content};
  }/*}}}*/

  /** smartypants ** {{{
   */
  private smartypants(text: string): string {
    return text
      /* adam-p: Adding some smart arrows */
      .replace(/<-->/g, '\u2194')
      .replace(/<--/g, '\u2190')
      .replace(/-->/g, '\u2192')
      .replace(/<==>/g, '\u21d4')
      .replace(/<==/g, '\u21d0')
      .replace(/==>/g, '\u21d2')

      // em-dashes
      .replace(/--/g, '\u2014')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u00ab')
      // closing doubles
      .replace(/"/g, '\u00bb')
      // ellipses
      .replace(/\.{3}/g, '\u2026');
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

}
