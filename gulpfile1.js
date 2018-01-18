'use strict';

const gulp = require('gulp');
const pug  = require('gulp-pug');

const sass        = require('gulp-sass');
const sassGlob    = require('gulp-sass-glob');
const rename      = require('gulp-rename');
const sourcemaps  = require('gulp-sourcemaps');
const realFavicon = require ('gulp-real-favicon');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack   = require('gulp-webpack');
const webpack       = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
    root     : './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src  : 'src/templates/**/*.pug'
    },
    styles: {
        src : 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },    
    images: {
        src : 'src/img/**/*.*',
        dest: 'build/assets/img/'
    },
    scripts: {
        src : 'src/js/**/*.js',
        dest: 'build/assets/js/'
    }
} 
  // Сборка SVG-спрайта для блока sprite-svg
/*
        let spriteSvgPath = './src/img/sprite-svg/svg/';
  gulp.task('sprite:svg', function (callback) {
    if((spriteSvgPath) !== undefined) {
      const svgstore = require('gulp-svgstore');
      const svgmin   = require('gulp-svgmin');
      const cheerio  = require('gulp-cheerio');
      if(fileExist(spriteSvgPath) !== false) {
        console.log('---------- Сборка SVG спрайта');
        return gulp.src(spriteSvgPath + '*.svg')
          .pipe(svgmin(function (file) {
            return {
              plugins: [{
                cleanupIDs: {
                  minify: true
                }
              }]
            }
          }))
          .pipe(svgstore({ inlineSvg: true }))
          .pipe(cheerio({
            run: function($) {
              $('svg').attr('style',  'display:none');
            },
            parserOptions: {
              xmlMode: true
            }
          }))
          .pipe(rename('sprite-svg.svg'))
          .pipe(size({
            title    : 'Размер',
            showFiles: true,
            showTotal: false,
          }))
          .pipe(gulp.dest('./src/sprite-svg/img/'));
      }
      else {
        console.log('---------- Сборка SVG спрайта: ОТМЕНА, нет папки с картинками');
        callback();
      }
    }
    else {
      console.log('---------- Сборка SVG спрайта: ОТМЕНА, блок не используется на проекте');
      callback();
    }
  });
  */
  /*
  // Сборка растрового спрайта для блока sprite-png
  let spritePngPath = './src/sprite-png/png/';
  gulp.task('sprite:png', function (callback) {
    if(('./src/sprite-png/png/') !== undefined) {
      const spritesmith = require('gulp.spritesmith');
      const buffer      = require('vinyl-buffer');
      const merge       = require('merge-stream');
      const imagemin    = require('gulp-imagemin');
      const pngquant    = require('imagemin-pngquant');
      if(fileExist(spritePngPath) !== false) {
        del('./src/sprite-png/img/*.png');
        let fileName   = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
        let spriteData = gulp.src(spritePngPath + '*.png')
          .pipe(spritesmith({
            imgName: fileName,
            cssName: 'sprite-png.scss',
            padding: 4,
            imgPath: './img/' + fileName
          }));
        let imgStream = spriteData.img
          .pipe(buffer())
          .pipe(imagemin({
            use: [pngquant()]
          }))
          .pipe(gulp.dest('./src/sprite-png/img/'));
        let cssStream = spriteData.css
          .pipe(gulp.dest('./src/sprite-png/png/'));
        return merge(imgStream, cssStream);
      }
      else {
        console.log('---------- Сборка PNG спрайта: ОТМЕНА, нет папки с картинками');
        callback();
      }
    }
    else {
      console.log('---------- Сборка PNG спрайта: ОТМЕНА, блок не используется на проекте');
      callback();
    }
  });

*/
//=================
// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// scss
function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/js/app.js')
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}
/*
// Копирование изображений
gulp.task('copy:img', function () {
  console.log('---------- Копирование изображений');
  return gulp.src('./src/img')
    .pipe(newer('./build/img'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title    : 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest(dirs.buildPath + '/img'));
});


// Копирование шрифтов
gulp.task('copy:fonts', function () {
  console.log('---------- Копирование шрифтов');
  return gulp.src('./src/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe(newer('./build/fonts'))  // оставить в потоке только изменившиеся файлы
    .pipe(size({
      title    : 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest('./build/fonts'));
});
*/

exports.templates = templates;
exports.styles    = styles;
exports.clean     = clean;
exports.images    = images;

gulp.task('default', gulp.series(
    clean,
    ['sprite:svg', 'sprite:png', 'favicons'],//===
    gulp.parallel(styles, templates, images, scripts),
    gulp.parallel(watch, server)
));

/*
var svgSprite = require('gulp-svg-sprite');

// More complex configuration example
var config					= {
	shape				: {
		dimension		: {			// Set maximum dimensions
			maxWidth : 32,
			maxHeight: 32
		},
		spacing			: {			// Add padding
			padding: 10
		},
		dest: 'src/sprite-svg/intermediate-svg'  // Keep the intermediate files
	},
	mode				: {
		view			: {			// Activate the «view» mode
      bust  : false,
      prefix: "svg-%s",
      sprite: "/src/img/sprite.svg",
      render: {
				scss: true  // Activate Sass output (with default options)
			}
		},
    symbol : true,   // Activate the «symbol» mode
    example: true    //Create an HTML example document
  }  
};

gulp.task('sprite-svg', function () {
  console.log('---------- Сборка SVG спрайта: началась');
    return gulp
    .src('*.svg', {cwd: 'src/sprite-svg/'})
	.pipe(svgSprite(config))
	.pipe(gulp.dest('src/sprite-svg/'));

});
*/
/*
const spriteSvgIn  = 'src/img/sprite-svg/';
const spriteSvgOut = 'dist/img/sprite-svg/';
const svgstore     = require('gulp-svgstore');
const svgmin       = require('gulp-svgmin');
const path         = require('path');

gulp.task('sprite-svg', function () {
  console.log('---------- Сборка SVG спрайта: началась');
    return gulp
        .src(spriteSvgIn +'/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(spriteSvgOut))
        console.log('---------- Сборка SVG спрайта: завершилась успешно');
});
*/