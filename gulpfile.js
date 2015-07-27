var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    // fixmyjs = require("gulp-fixmyjs"),
    // jshint = require('gulp-jshint'),
    react = require('gulp-react'),
    sass = require('gulp-sass');

gulp.task('default', ['browser-sync','watch']);

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'));
});

gulp.task('reactify',function() {
  return gulp.src('./src/*.js')
          .pipe(react())
          .pipe(gulp.dest('./build'));
});

gulp.task('browser-sync', function () {
   var files = [
      'index.html'
   ];
   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

gulp.task('watch', function () {
   gulp.watch('./sass/**/*.scss', ['sass']);
   gulp.watch('./src/*.js', ['reactify']);
});