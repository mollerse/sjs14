var http = require('http');
var gulp = require('gulp');
var sass = require('gulp-sass');
var refresh = require('gulp-livereload');
var embedlr = require('gulp-embedlr');
var ecstatic = require('ecstatic');

var serverport = 1337;

gulp.task('styles', function() {
    return gulp.src(['css/theme/source/scotlandjs.scss'])
        .pipe(sass({
            includePaths: ['css/theme/template']
        }))
        .on('error', console.log)
        .pipe(gulp.dest('css/theme'))
        .pipe(refresh());
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dir
  http.createServer(ecstatic({ root: __dirname })).listen(serverport);
});


gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(refresh());
});

gulp.task('watch', function () {
    gulp.watch('css/theme/source/*.scss', ['styles']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['styles', 'serve', 'watch']);