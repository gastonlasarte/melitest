var gulp,
	sass,
	browserSync,
	useref;

gulp = require('gulp'); // Requires gulp
sass = require('gulp-sass'); // Requires the gulp-sass plugin
browserSync = require('browser-sync'); // Requieres BrowserSync
useref = require('gulp-useref');

// BrowserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

// Sass tasks that compiles SASS to CSS
gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
	.pipe(sass()) // Using the gulp sass plugin
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
    }))
});

// Watchers
gulp.task('watch', ['browserSync', 'sass', 'useref'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']); // Watch all sass files
	gulp.watch('app/*.html', browserSync.reload); // Reloads the browser whenever HTML files change
	gulp.watch('app/js/**/*.js', browserSync.reload); // Reloads the browser whenever JS files change
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});