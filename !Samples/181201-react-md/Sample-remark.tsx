    const remark = require('remark');
    const remarkReact = require('remark-react');
    const remarkComments = require('remark-comments');
    /**
     * @see https://github.com/rexxars/react-markdown
     * @see https://github.com/remarkjs/remark/blob/master/doc/plugins.md
     * @see https://github.com/zestedesavoir/zmarkdown/tree/master/packages/remark-comments
     */
    const source = `
# This is a header

<!-- standard comment -->
<--COMMENTS comment 1 COMMENTS-->
<--foo comment 2 bar-->

And this is a paragraph
`;
    const result = remark()
      .use(remarkReact, {
        // createElement: (type:any, props: any, children: any) => {
        //   console.log(props, arguments);
        //   debugger;
        // },
        // remarkReactComponents: {
        //   a: MyLink,
        //   p: MyParagraph
        // },
      })
      .use(remarkComments, {
        beginMarker: 'foo',
        endMarker: 'bar',
      })
      .processSync(source).contents
    ;
    console.log(result);
