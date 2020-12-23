'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const packageImporter = require('node-sass-package-importer');

const path = {
  srcDir: './src',
  src: {
    html: 'pug',
    css: 'scss',
    js: 'js',
  },
  destDir: './dist',
  dest: {
    html: '',
    css: 'assets/css',
    js: 'assets/js',
  },
  baseDir: './dist', // browser-syncのbaseDir
};

// HTML
function buildPug() {
  return gulp
    .src(`${path.srcDir}/${path.src.html}/*.pug`)
    .pipe(pug({ pretty: 2 }))
    .pipe(gulp.dest(`${path.destDir}/${path.dest.html}`));
}

// CSS
function buildScss() {
  return gulp
    .src(`${path.srcDir}/${path.src.css}/*.scss`)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        importer: packageImporter({
          extensions: ['.scss', '.css'],
        }),
        outputStyle: 'expanded',
      })
    )
    .pipe(postcss([mqpacker(), autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${path.destDir}/${path.dest.css}`));
}

// JS
function buildJs() {
  return gulp
    .src(`${path.srcDir}/${path.src.js}/*.js`)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest(`${path.destDir}/${path.dest.js}`));
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
    `${path.srcDir}/${path.src.html}/**/*`,
    gulp.series(buildPug, reload)
  );
  gulp.watch(
    `${path.srcDir}/${path.src.css}/**/*`,
    gulp.series(buildScss, reload)
  );
  gulp.watch(
    `${path.srcDir}/${path.src.js}/**/*`,
    gulp.series(buildJs, reload)
  );
}

exports.build = gulp.parallel(buildPug, buildScss, buildJs);
exports.watch = gulp.parallel(sync, watch);
