var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var pkg = require('./package.json'),
    paths = {
        www: 'assets_public',
        dev: 'assets_dev'
    },
    paths = {
        js: {
            src: [paths.dev+'/js/**/*.js'],
            destFile: 'main.js',
            destFolder: paths.www+'/js/'
        },
        sass: {
            src: [paths.dev+'/sass/main.scss'],
            all: [paths.dev+'/sass/**/*.scss'],
            destFile: 'main.min.css',
            destFolder: paths.www+'/css/'
        }
    };
 
gulp.task('connect', function(){
    connect.server({
        livereload: true,
        host: '0.0.0.0',
        port: 9000,
        root: '.'
    });
});

gulp.task('watch', function(){
    gulp.watch(paths.js.src, ['concat']);
    gulp.watch(paths.sass.all, ['css']);
});

gulp.task('sass', function () {
    gulp.src(paths.sass.src)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename(paths.sass.destFile))
        .pipe(gulp.dest(paths.sass.destFolder));
});

gulp.task('autoprefixer', function () {
    gulp.src(paths.sass.destFolder+paths.sass.destFile)
        .pipe(autoprefixer({
            expand: true,
            flatten: true,
            browsers: ['last 20 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(paths.sass.destFolder));
});

gulp.task('concat', function() {
    gulp.src(paths.js.src)
        .pipe(concat(paths.js.destFile))
        .pipe(gulp.dest(paths.js.destFolder));
});

gulp.task('uglify', function() {
    gulp.src(paths.js.src)
        .pipe(uglify())
        .pipe(rename(paths.js.destFile))
        .pipe(gulp.dest(paths.js.destFolder));
});

gulp.task('css', ['sass']);
gulp.task('js', ['concat', 'uglify']);

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['css', 'js']);
