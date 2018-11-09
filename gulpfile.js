const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const packagejson = require('./package.json');

gulp.task('scss', function() {
  gulp
    .src('src/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  gulp
    .src('src/index.js')
    .pipe(uglify())
    .pipe(rename(`epub-debugger-${packagejson.version}.js`))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scss', 'js']);
