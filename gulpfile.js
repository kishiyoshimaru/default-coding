'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');

const path = {
  srcDir: './_src',
  src: {
    html: 'pug',
    css: 'sass',
    js: 'js',
    image: 'image',
  },
  destDir: './dist',
  dest: {
    html: '',
    css: 'assets/css',
    js: 'assets/js',
    image: 'assets/image',
  },
};

function compilePug() {
  return gulp
    .src(`${path.srcDir}/pug/*.pug`)
    .pipe(pug({ pretty: 2 }))
    .pipe(gulp.dest(`${path.destDir}`));
}

exports.build = gulp.parallel(compilePug);
