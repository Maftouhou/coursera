/*GULP Job file 
***************************************
 * Automate processing for :
 *- Converting SASS to CSS and JS
 *- Minifiying
 *- joining files*/
//=====================================

// Standanrd Dependance
var gulp = require('gulp'),
	rename = require('gulp-rename'),

	// CSS Dependancies
	sass = require('gulp-sass'),
	
	// JS Dependancies
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

// Testing Task 
gulp.task('test', function(){
	console.log('This is printed in the console !');
});

// Definning CSS Taskes
gulp.task('style', function(){
	return gulp.src('sass/style.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))

	.pipe(gulp.dest('public/css/'))
	// .pipe(gulp.dest('dist/css/'))

	.pipe(rename({suffix: '.min'}))

	.pipe(gulp.dest('public/css/'))
	// .pipe(gulp.dest('dist/css/'));
});

// Definning JS Taskes

// watch All changes on CSS
gulp.task('watch', function(){
	gulp.watch('sass/*.scss', ['style']);
})