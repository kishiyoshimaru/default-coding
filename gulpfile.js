'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

const path = {
  srcDir: './_src',
  src: {
    html: 'pug',
    css: 'scss',
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

// CSS
function compileScss() {
  return gulp
    .src(`${path.srcDir}/${path.src.css}/*.scss`)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(`${path.destDir}/${path.dest.css}`));
}

// JS
function compileJs() {
  return gulp
    .src(`${path.srcDir}/${path.src.js}/*.js`)
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
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
    `${path.srcDir}/${path.src.html}/*`,
    gulp.series(compilePug, reload)
  );
  gulp.watch(
    `${path.srcDir}/${path.src.css}/*`,
    gulp.series(compileScss, reload)
  );
}

exports.build = gulp.parallel(compilePug, compileScss, compileJs);
exports.watch = gulp.parallel(sync, watch);
