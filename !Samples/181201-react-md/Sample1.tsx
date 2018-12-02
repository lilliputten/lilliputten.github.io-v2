    /**
     * @see https://github.com/rexxars/react-markdown
     * @see https://github.com/remarkjs/remark/blob/master/doc/plugins.md
     * @see https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-comments
     */
    const ReactMarkdown = require('react-markdown');
    const remarkComments = require('remark-comments');
    const source = `
# This is a header

<--COMMENTS comment 1 COMMENTS-->
<--foo comment 2 bar-->

And this is a paragraph
`;
    // TODO: Make own parser plugin for special comments (gallery etc) based on `remark-comments`
    const plugins: Array<Array<any> | null> = [
      [ remarkComments, {
        beginMarker: 'foo',
        endMarker: 'bar',
      } ],
    ];
    const renderers = {
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

    };
    const result = <ReactMarkdown
      className="markdown"
      plugins={plugins}
      renderers={renderers}
      source={source}
    />;
