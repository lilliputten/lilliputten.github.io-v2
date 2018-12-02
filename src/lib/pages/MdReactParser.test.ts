import * as React from 'react';

import { pages as pagesConfig } from '../../config';
import MdReactParser from './MdReactParser';

/** Do test for fail cases? */
const TO_TEST_FAIL_PROMISES = false;

let mdReactParser: MdReactParser;

describe('MdReactParser', () => {

  /*{{{*/beforeAll(() => {
    mdReactParser = new MdReactParser();
  });/*}}}*/

  /*{{{*/describe('should have basic features', () => {

    /*{{{*/it('should create instance without crashing', () => {
      expect(typeof mdReactParser).toBe('object');
      expect(mdReactParser instanceof MdReactParser).toBe(true);
    });/*}}}*/

    /*{{{*/it('should have parse method', () => {
      expect(typeof mdReactParser.parse).toBe('function');
    });/*}}}*/

  });/*}}}*/

  /*{{{*/describe('parse method', () => {

    const mdContent = `
---
param: value
number: 1
---

# title

text
`;

    let mdParsed: any;

    /*{{{*/beforeAll(() => {
      mdParsed = mdReactParser.parse({ source: mdContent });
    });/*}}}*/

    /*{{{*/it('should return object', () => {
      expect(typeof mdParsed).toBe('object');
    });/*}}}*/

    /*{{{*/describe('returned object', () => {

      /*{{{*/it('should have property frontmatter', () => {
        expect(mdParsed).toHaveProperty('frontmatter')
      });/*}}}*/

      /*{{{*/it('should have property content', () => {
        expect(mdParsed).toHaveProperty('content')
      });/*}}}*/

      /*{{{*/describe('frontmatter property', () => {

        /*{{{*/it('should be object', () => {
          expect(typeof mdParsed.frontmatter).toBe('object');
        });/*}}}*/

        /*{{{*/it('should contain parsed parameters', () => {
          expect(mdParsed.frontmatter.param).toBe('value');
          expect(typeof mdParsed.frontmatter.number).toBe('number');
        });/*}}}*/

      });/*}}}*/

      /*{{{*/describe('content property', () => {

        /*{{{*/it('should be object', () => {
          expect(typeof mdParsed.content).toBe('object');
        });/*}}}*/

        /*{{{*/it('should be valid react element', () => {
          expect(React.isValidElement(mdParsed.content)).toBe(true);
        });/*}}}*/

      });/*}}}*/

    });/*}}}*/

  });/*}}}*/

});
