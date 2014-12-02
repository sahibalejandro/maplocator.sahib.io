/**
 * Created by sahib on 11/30/14.
 */
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');

/* ------------------------------------------------------------
 * Task concat-js
 *
 * Concatenate script files into public directory.
 *
 */
gulp.task('concat-js', function ()
{
    return gulp.src([
        'bower_components/jquery/jquery.min.js',
        'bower_components/jquery-zclip/jquery.zclip.js',
        'bower_components/sahib-map-marker/jquery.mapmarker.js',
        'app/assets/js/main.js'
    ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js/'));
}); // concat-js

/* ------------------------------------------------------------
 * Task compile-sass
 *
 * Compile sass files
 *
 */
gulp.task('compile-sass', function ()
{
    return gulp.src('app/assets/sass/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/assets/sass'));
}); // compile-sass


/* ------------------------------------------------------------
 * Task concat-css
 *
 * Concatenate CSS files into public directory.
 */
gulp.task('concat-css', ['compile-sass'], function ()
{
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'app/assets/sass/index.css'
    ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest('public/css'));
}); // concat-css

/* ------------------------------------------------------------
 * Task publish-html
 *
 * Publish index.html
 */
gulp.task('publish-html', function ()
{
    return gulp.src('app/index.html')
        .pipe(gulp.dest('public/'));
}); // publish-html

/* ------------------------------------------------------------
 * Task publish-zclip
 *
 * Publish index.html
 */
gulp.task('publish-zclip', function ()
{
    return gulp.src('bower_components/jquery-zclip/ZeroClipboard.swf')
        .pipe(gulp.dest('public/'));
}); // publish-zclip

/* ------------------------------------------------------------
 * Task uglify
 *
 * Uglify javascript
 */
gulp.task('uglify', ['concat-js'], function ()
{
    gulp.src('public/js/all.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
}); // uglify

/* ------------------------------------------------------------
 * Task minfy-css
 *
 * Minimize CSS
 */
gulp.task('minfy-css', ['concat-css'], function ()
{
    gulp.src('public/css/all.css')
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest('public/css/'));
}); // minfy-css

/* ------------------------------------------------------------
 * Task minify-html
 *
 * Minfy HTML
 */
gulp.task('minify-html', ['publish-html'], function ()
{
    return gulp.src('public/index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('public/'));
}); // minify-html

/* ------------------------------------------------------------
 * Task live
 *
 * Watch files an send livereload signal.
 */
gulp.task('live', function ()
{
    livereload.listen();

    gulp.watch('app/assets/js/**/*.js', ['concat-js']);
    gulp.watch('app/assets/sass/**/*.scss', ['concat-css']);
    gulp.watch('app/*.html', ['publish-html']);

    gulp.watch([
        'public/*.html',
        'public/css/*.css',
        'public/js/*.js'
    ]).on('change', livereload.changed);
}); // live

/* ------------------------------------------------------------
 * Task dev
 *
 * Start development tasks.
 */
gulp.task('default', ['concat-js', 'concat-css', 'publish-html', 'publish-zclip', 'live']);
gulp.task('prod', ['uglify', 'minfy-css', 'minify-html', 'publish-zclip']);
