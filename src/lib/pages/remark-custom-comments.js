/* eslint-env es6, node, commonjs */
/* eslint-disable no-console, no-debugger */

const yaml = require('js-yaml');

/** customCommentsPlugin ** {{{
 */
function customCommentsPlugin ({beginMarker = '<--', endMarker = '-->', type = 'customComments'} = {}) {

  /** tokenizer ** {{{
   */
  const tokenizer = (eat, value) => {

    const keepBegin = value.indexOf(beginMarker);
    const keepEnd = value.indexOf(endMarker);

    if (keepBegin !== 0 || keepEnd === -1) {
      return;
    }

    const content = value.substring(beginMarker.length, keepEnd);
    let src = content;
    let tag = '';
    let id = '';
    let data = {};

    let match = src.match(/^(\S+?)(?::(\S+))?[\n\s]/);
    if (match) {
      [match, tag, id] = match;
      src = src.substr(match.length);
      data = yaml.safeLoad(src);
    }
    src = src.trim();

    return eat(beginMarker + content + endMarker)({
      type,
      value: '',
      tag, id, data,
      content: src,
    });

  };/*}}}*/

  tokenizer.locator = (value, fromIndex) => {
    return value.indexOf(beginMarker, fromIndex);
  };

  const Parser = this.Parser;

  // Inject tokenizer
  const blockTokenizers = Parser.prototype.blockTokenizers;
  const blockMethods = Parser.prototype.blockMethods;
  blockTokenizers[type] = tokenizer;
  blockMethods.splice(blockMethods.indexOf('text'), 0, type);

  // const Compiler = this.Compiler;
  // if (Compiler) {
  //   const visitors = Compiler.prototype.visitors;
  //   if (!visitors) return;
  //   visitors[type] = (node) => {
  //     return beginMarker + node.content + endMarker;
  //   };
  // }

}/*}}}*/

module.exports = customCommentsPlugin;
