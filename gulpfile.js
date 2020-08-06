'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

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
  baseDir: './dist', // browser-syncのbaseDir
};

// HTML
function compilePug() {
  return gulp
    .src(`${path.srcDir}/${path.src.html}/*.pug`)
    .pipe(pug({ pretty: 2 }))
    .pipe(gulp.dest(`${path.destDir}/${path.dest.html}`));
}

// ホットリロード
function sync() {
  browserSync.init({
    server: path.baseDir,
  });
}
function reload(done) {
  browserSync.reload();
  done();
}
function watch() {
  gulp.watch(
    `${path.srcDir}/${path.src.html}/*.html`,
    gulp.series(compilePug, reload)
  );
}

exports.build = gulp.parallel(compilePug);
exports.watch = gulp.parallel(sync, watch);
