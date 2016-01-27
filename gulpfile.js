var gulp,
	sass,
	browserSync,
	uglify,
	gulpIf,
	useref;

// Requires
gulp = require('gulp');
sass = require('gulp-sass');
browserSync = require('browser-sync');
useref = require('gulp-useref');
uglify = require('gulp-uglify');
gulpIf = require('gulp-if');

// BrowserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});

// Sass tasks that compiles SASS to CSS
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
	.pipe(sass()) // Using the gulp sass plugin
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
    }))
});

// Watchers
gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']); // Watch all sass files
	gulp.watch('app/*.html', browserSync.reload); // Reloads the browser whenever HTML files change
	gulp.watch('app/js/**/*.js', browserSync.reload); // Reloads the browser whenever JS files change
});

// For minifying
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify())) // Minifies only if it's a JavaScript file
    .pipe(gulp.dest('dist'))
});