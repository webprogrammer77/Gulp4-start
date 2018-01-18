const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const del = require('del');
const jshint = require('gulp-jshint');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
  root: './dist',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles/'
  },
  images: {
    src: 'src/img/**/*.*',
    srcPuth: 'src/img/',
    dest: 'dist/img/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
}
// конвертацмя шрифтов
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');

// gulp.task('ttf2woff2', function(){
//  gulp.src(['fonts/**/*.ttf'])
//    .pipe(ttf2woff2())
//    .pipe(gulp.dest('fonts/'));
// });
// var ttf2woff = require('gulp-ttf2woff');

// gulp.task('ttf2woff', function(){
//  gulp.src(['fonts/**/*.ttf'])
//    .pipe(ttf2woff())
//    .pipe(gulp.dest('fonts/'));
// });
function towoffTwo() {
  console.log('---------- Конвертация шрифтов ttf в woff2');
  return gulp.src(['fonts/src/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('fonts/woff/'));
}

function towoff() {
  console.log('---------- Конвертация шрифтов ttf в woff');
  return gulp.src(['fonts/src/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('fonts/woff/'));
}
// Сборка SVG-спрайта для блока sprite-svg
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const baseDir = 'src/sprite-svg/'; // <-- Set to your SVG base directory
const svgGlob = '*.svg'; // <-- Glob to match your SVG files
const outDir = 'src/sprite-svg-out/';
const outSpriteSvg = 'src/img/sprite-svg/'; // <-- Main output directory
const dirSprite = 'src/sprite-svg-out/symbol/svg/';
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const svgmin = require('gulp-svgmin');
config = {
  shape: {
    dimension: { // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    },
    spacing: { // Add padding
      padding: 10
    },
    dest: outSpriteSvg  // Keep the intermediate files: 'out/intermediate-svg'
  },
  mode: {
    view: { // Activate the «view» mode
      bust: false,
      render: {
        scss: true // Activate Sass output (with default options)
      }
    },
    symbol: true // Activate the «symbol» mode
  }
};

gulp.task('sprite-made-svg', function () {
  console.log('---------- Сборка PNG спрайта: началась');
  return del(outDir),
    gulp
    .src(svgGlob, {
      cwd: baseDir
    })
    // remove all fill and style declarations in out shapes
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    // cheerio plugin create unnecessary string '>', so replace it.
    .pipe(replace('&gt;', '>'))
    .pipe(plumber())
    .pipe(svgSprite(config)).on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest(outDir));
});
gulp.task('sprite-svg-copy', function () {
  return del(outSpriteSvg),
    gulp
    .src(svgGlob, {
      cwd: dirSprite
    })
    .pipe(gulp.dest(outSpriteSvg));
});

// Сборка растрового спрайта для блока sprite-png

const spritePngIn = 'src/sprite-png/';
const spritePngOut = 'src/img/sprite-png/';
gulp.task('sprite-png', function (callback) {
  if (spritePngIn !== undefined) {
    const spritesmith = require('gulp.spritesmith');
    const buffer = require('vinyl-buffer');
    const merge = require('merge-stream');
    const imagemin = require('gulp-imagemin');
    const pngquant = require('imagemin-pngquant');
    if ((spritePngIn + '*.png') !== false) {
      console.log('---------- Сборка PNG спрайта: началась');
      del(spritePngOut);
      let fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
      let spriteData = gulp.src(spritePngIn + '*.png')
        .pipe(spritesmith({
          imgName: fileName,
          cssName: 'sprite-png.scss',
          padding: 4,
          imgPath: '../img/' + fileName
        }));
      let imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
          use: [pngquant()]
        }))
        .pipe(gulp.dest(spritePngOut));
      let cssStream = spriteData.css
        .pipe(gulp.dest(spritePngOut));
      return merge(imgStream, cssStream);
      console.log('---------- Сборка PNG спрайта закончилась успешно');
    } else {
      console.log('---------- Сборка PNG спрайта: ОТМЕНА, нет папки с картинками');
      callback();
    }
  } else {
    console.log('---------- Сборка PNG спрайта: ОТМЕНА, блок не используется на проекте');
    callback();
  }
});

// pug
function templates() {
  console.log('---------- PUG компилирование');
  return gulp.src(paths.templates.pages)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
  console.log('---------- Стили SASS компилирование');
  return gulp.src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

// очистка
function clean() {
  console.log('---------- Удаление папка выхода');
  return del(paths.root);
}

// webpack
function scripts() {
  console.log('---------- Webpack запущен');
  return gulp.src('src/js/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Копирование шрифтов

let fontsIn = 'src/fonts/**/*.*';
let fontsOut = 'dist/fonts/';

function fontscopy() {
  console.log('---------- Kопирование шрифтов');
  return gulp.src(fontsIn)
    .pipe(gulp.dest(fontsOut));
  console.log('---------- Шрифты скопированы успешно');
}


// галповский вотчер
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
  console.log('---------- Ты сделал еще один шаг к успеху');
}

// локальный сервер + livereload (встроенный)
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
  console.log('---------- Ты работай Я присматриваю за твоими папками');
}

// просто переносим картинки

function images() {
  console.log('---------- Просто перенос картинок');
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}
// Lint JS // jshint.reporter()
function lintjs() {
  return gulp.src('src/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', {
      verbose: true
    }));
}

// Ручная оптимизация изображений
// Использование: folderIn=src/img и gulp imgopt
const folderIn = paths.images.src;
const folderOut = 'dist/img/';
gulp.task('imgopt', function (callback) {
  const imagemin = require('gulp-imagemin');
  const pngquant = require('imagemin-pngquant');
  if (folder) {
    console.log('---------- Оптимизация картинок');
    return gulp.src(folder)
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/img/'));
  } else {
    console.log('---------- Оптимизация картинок: ошибка (не указана папка)');
    // console.log('---------- Пример вызова команды: folder=src/blocks/block-name/img npm start img:opt');
    callback();
  }
});

function hipi() {
  return
  console.log('---------- Можешь начинать работу');
  return
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.lintjs = lintjs;
exports.fontscopy = fontscopy;
// exports.towoffTwo = towoffTwo;
// exports.towoff = towoff;
// exports.hipi      = hipi;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(styles, templates, images, scripts, fontscopy),
  gulp.parallel(watch, server, lintjs),
  hipi
));


gulp.task('sprite-svg', gulp.series(
  ['sprite-made-svg', 'sprite-svg-copy']
));
gulp.task('sprite', gulp.series(
  ['sprite-svg', 'sprite-png']
));
gulp.task('convert', gulp.series(
  towoffTwo, towoff
));