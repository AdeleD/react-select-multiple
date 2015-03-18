var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['app', 'example']);
  gulp.watch('./example/example.jsx', ['example']);
});

gulp.task('app', function() {
  return browserify('./js/app.js', {'standalone': 'ReactMultiselect'})
    .transform(reactify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build'));
});

gulp.task('example', function() {
  return browserify('./example/example.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./example'));
});

gulp.task('default', ['app', 'example']);
