// Requires gulp
var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('sass', function () {
	return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
	.pipe(sass()) // Using the gulp sass plugin
	.pipe(gulp.dest('app/css'))
});