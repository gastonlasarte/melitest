var gulp,
	sass,
	browserSync,
	uglify,
	gulpIf,
	useref,
	cssnano,
	del,
	runSequence,
  imagemin,
  cache;

// Requires
gulp = require('gulp');
sass = require('gulp-sass');
browserSync = require('browser-sync');
useref = require('gulp-useref');
uglify = require('gulp-uglify');
gulpIf = require('gulp-if');
cssnano = require('gulp-cssnano');
del = require('del');
runSequence = require('run-sequence');
imagemin = require('gulp-imagemin');
cache = require('gulp-cache');

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
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
    }))
});

//images & cache handler
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// moving fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// Watchers
gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', ['sass']); // Watch all sass files
	gulp.watch('app/*.html', browserSync.reload); // Reloads the browser whenever HTML files change
	gulp.watch('app/js/**/*.js', browserSync.reload); // Reloads the browser whenever JS files change
});

// For minifying
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Builds
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})