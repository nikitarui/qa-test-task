const gulp = require('gulp')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const ngAnnotate = require('gulp-ng-annotate')

const origin = 'public/app';
const dest = 'public/dist';

gulp.task('styles', () => gulp
    .src([origin + '/**/*.css'])
    .pipe(plumber())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(dest))
);

gulp.task('scripts', () => gulp
      .src([origin + '/**/*.js'])
      .pipe(ngAnnotate())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest(dest))
);

gulp.task('watch', () => {
  gulp.watch(['public/app/**/*.css'], ['styles']);
  gulp.watch(['public/app/**/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'styles']);
