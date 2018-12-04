/* eslint-env es6, node, commonjs */
/* eslint-disable no-console */

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const dateformat = require('dateformat');
const through = require('gulp-through'); // https://www.npmjs.com/package/gulp-through
const gulpDebug = true && require('gulp-debug') || through('noDebug', () => null);

const now = new Date();
// const dateTag = dateformat(now, 'yymmdd-HHMMss');
const dateStr = dateformat(now, 'yyyy.mm.dd, HH:MM');

const ghOptions = {
  // remoteUrl: 'https://github.com/lilliputten/lilliputten.github.io.git',
  remoteUrl: 'git@github.com:lilliputten/lilliputten.github.io.git',
  branch: 'master',
  message: `Update ${dateStr}`,
};

gulp.task('publish', function() {
  return gulp.src([
    './build/**/*',
    '!**/.*',
    '!**/*{_,-}',
  ])
    .pipe(gulpDebug({ title: 'publish <-' }))
    .pipe(ghPages(ghOptions));
});
