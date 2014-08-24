var gulp        = require('gulp');
var harp        = require('harp');
var mustache = require("gulp-mustache");
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');

gulp.task('styles', function() {
    gulp.src('public/styles/core.sass')
    .pipe(sass())
    .pipe(gulp.dest('public/styles/css'));
});



gulp.task('serve', function () {
    harp.server('public/', { port: 9000 }, function () {
        browserSync({
            proxy: "localhost:9000",
            notify: {
                styles: ['opacity: 0', 'position: absolute']
            }
        });
    });

    gulp.watch('**/*.sass', ['styles']);

    gulp.watch("**/*.ejs", function(){
        browserSync.reload();
    });
});

gulp.task('default', ['serve']);