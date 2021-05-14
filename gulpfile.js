const gulp = require('gulp');
const html = require('gulp-html');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const less = require('gulp-less');
const clean = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const reload = browserSync.reload;


// Minify  HTML 
gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist'))
});

// PUG-HTML 
gulp.task('pug', () => {
    return gulp.src('src/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('src'))
});

// SASS -CSS 
gulp.task('sass', () => {
    return gulp.src('src/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/assets/css'))
});

// WATCH SCSS CHANGE
gulp.task('sass:watch', () => {
    return gulp.watch('./src/assets/css/main.scss', gulp.series('sass'))
});

// LESS-CSS 
gulp.task('less', () => {
    return gulp.src('src/assets/css/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/assets/css'))
});

// WATCH LESS CHANGE
gulp.task('less:watch', () => {
    return gulp.watch('./src/assets/css/**/*.less', gulp.series('less'))
});

// CLEAN CSS
gulp.task('cleanCSS', () => {
    return gulp.src('src/assets/css//main.css')
        .pipe(clean())
        .pipe(autoprefixer({ cascade: true }))
})

// MINIFY JS
gulp.task('minifyJS', () => {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(minify({
            ext: {
                min: '.js '
            }
        }))
        .pipe(gulp.dest('dist/assets/js'))
});

// IMAGE MINIFY
gulp.task('imageMin', () => {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
})

// ICON MINIFY
gulp.task('iconMin', () => {
    return gulp.src('./src/assets/icons/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/icons'))
});


// BROWSER SYNC
gulp.task('serve', () => {
    var files = [
        './src/**/*.html',
        './src/**/*.pug',
        './src/assets/css/**/*.scss',
        './src/assets/css/**/*.less',
        './src/assets/js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './src'
        }
    });
    gulp.watch(['./src/**/*.html'], reload);
    gulp.watch(['./src/**/*.pug'], gulp.series('pug'), reload);
    gulp.watch(['./src/assets/css/**/*.scss'], gulp.series('sass'), reload);
    gulp.watch(['./src/assets/css/**/*.less'], gulp.series('less'), reload);
    gulp.watch(['./src/assets/js/**/*.js'], reload);
});

//GULP-METHOD
gulp.task('dev', gulp.series('serve'));
gulp.task('build', gulp.series('html', 'cleanCSS', 'minifyJS', 'imageMin', 'iconMin'));