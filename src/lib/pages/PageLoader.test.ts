
import { pages as pagesConfig } from '../../config';
import PageLoader from './PageLoader';

/** Do test for fail cases? */
const TO_TEST_FAIL_PROMISES = false;

let pageLoader: PageLoader;

describe('PageLoader', () => {

  /*{{{*/beforeAll(() => {
    pageLoader = new PageLoader();
  });/*}}}*/

  /*{{{*/describe('should have basic features', () => {

    /*{{{*/it('should create instance without crashing', () => {
      expect(typeof pageLoader).toBe('object');
    });/*}}}*/

    /*{{{*/it('should have fetchUrl private method', () => {
      expect(typeof (pageLoader as any).fetchUrl).toBe('function');
    });/*}}}*/

    /*{{{*/it('should have loadPage method', () => {
      expect(typeof pageLoader.loadPage).toBe('function');
    });/*}}}*/

  });/*}}}*/

  /*{{{*/describe('loadPage method', () => {

    const successId = '/success';
    const failId = '/fail';

    /*{{{*/beforeAll(() => {
      window.fetch = jest.fn().mockImplementation((url) => {
        const successContent = `
---
frontmatter: value
---

# success

text
`;
        const successResponse = { status: 200, text: () => Promise.resolve(successContent) };
        const failResponse = { status: 500 };
        const res = url.startsWith(pagesConfig.urlPrefix + successId) ? successResponse : failResponse;
        return Promise.resolve(res);
      });
    });/*}}}*/
    /*{{{*/afterAll(() => {
      delete window.fetch;
    });/*}}}*/

    /*{{{*/it('should return promise', () => {
      const successPromise = pageLoader.loadPage(successId);
      expect(successPromise instanceof Promise).toBe(true);
    });/*}}}*/

    /*{{{*/describe('success promise', () => {

      let successPromise: Promise<any>;

      /*{{{*/beforeAll(() => {
        successPromise = pageLoader.loadPage(successId);
      });/*}}}*/

      /*{{{*/it('should resolve object', () => {
        return successPromise
          .then((res) => {
            expect(typeof res).toBe('object');
            expect(res).toMatchSnapshot();
          })
        ;
      });/*}}}*/

    });/*}}}*/

    /*{{{*/TO_TEST_FAIL_PROMISES && describe('fail promise', () => {

      let failPromise: Promise<any>;

      /*{{{*/beforeAll(() => {
        failPromise = pageLoader.loadPage(failId);
      });/*}}}*/

      /*{{{*/it('should reject object', () => {
        return failPromise
          .catch((err) => {
            expect(typeof err).toBe('object');
            // expect(err).toMatchSnapshot();
          })
        ;
      });/*}}}*/

    });/*}}}*/

  });/*}}}*/

});
