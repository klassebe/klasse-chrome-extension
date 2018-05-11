var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var watch = require("gulp-watch");

gulp.task('cssmin', function() {
    gulp.src(['less/style.less'])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('../klasse_extension/css'))
});

gulp.task('cssdev', function() {
    gulp.src(['less/style.less'])
        .pipe(less())
        .pipe(gulp.dest('../klasse_extension/css'))
});


gulp.task('copyfiles', function() {
    gulp.src(['img/*'])
        .pipe(gulp.dest('../klasse_extension/img'));
    gulp.src(['js/*/**'])
        .pipe(gulp.dest('../klasse_extension/js'))
    gulp.src(['js/*.js'])
        .pipe(gulp.dest('../klasse_extension/js'))
    gulp.src(['index.html'])
        .pipe(gulp.dest('../klasse_extension'))
    gulp.src(['manifest.json','voordelen.json'])
        .pipe(gulp.dest('../klasse_extension'))
    gulp.src(['icon16.png','icon48.png','icon128.png'])
        .pipe(gulp.dest('../klasse_extension'))
});

gulp.task('dev', ['cssdev','copyfiles']);

gulp.task('default', ['cssmin','copyfiles']);

gulp.task('stream', function () {
    // Endless stream mode
    gulp.watch(['less/*.less'], ['cssdev']);
});
