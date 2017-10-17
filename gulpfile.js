var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('less', function() {
  return gulp.src('app/less/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src([
      'app/libs/jquery-2.2.4.min.js',
      'app/libs/jquery.mobile-1.4.5.min.js',
    ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('accordion', function() {
  return gulp.src([
      'app/components/modernizr.min.js',
      'app/components/bootstrap.js',
    ])
  .pipe(concat('accordion.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('watch', ['browser-sync', 'scripts', 'accordion'], function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "app"
    },
    notyfy: false
  });
});

gulp.task('build', ['clean', 'less', 'scripts'], function() {

  var buildCss = gulp.src([
    'app/css/main.css',
    'app/css/accordion.min.css',
    ])
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

  var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('dist/img'));
});