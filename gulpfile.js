'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const plumber = require('gulp-plumber');
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
    .pipe(cleanCss())
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

// 画像
function minifyImage() {
  return gulp
    .src(`${path.srcDir}/${path.src.image}/*`)
    .pipe(plumber())
    .pipe(
      imagemin([
        pngquant({
          quality: [0.65, 0.8],
          speed: 1,
        }),
        mozjpeg({
          quality: 80,
        }),
        imagemin.gifsicle({
          interlaced: false,
        }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest(`${path.destDir}/${path.dest.image}`));
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
  gulp.watch(`${path.srcDir}/${path.src.js}/*`, gulp.series(compileJs, reload));
  gulp.watch(
    `${path.srcDir}/${path.src.image}/*`,
    gulp.series(minifyImage, reload)
  );
}

exports.build = gulp.parallel(compilePug, compileScss, compileJs, minifyImage);
exports.watch = gulp.parallel(sync, watch);
