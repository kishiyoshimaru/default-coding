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
    .pipe(postcss[mqpacker()])
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss())
    .pipe(gulp.dest(`${path.destDir}/${path.dest.css}`));
}

// JS
function compileJs() {
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
    gulp.series(compilePug, reload)
  );
  gulp.watch(
    `${path.srcDir}/${path.src.css}/**/*`,
    gulp.series(compileScss, reload)
  );
  gulp.watch(
    `${path.srcDir}/${path.src.js}/**/*`,
    gulp.series(compileJs, reload)
  );
}

exports.build = gulp.parallel(compilePug, compileScss, compileJs);
exports.watch = gulp.parallel(sync, watch);
