var gulp        = require('gulp');
var harp        = require('harp');
var mustache = require("gulp-mustache");
var browserSync = require('browser-sync');

gulp.task('serve', function () {
    harp.server('public/', { port: 9000 }, function () {
        browserSync({
            proxy: "localhost:9000",
            notify: {
                styles: ['opacity: 0', 'position: absolute']
            }
        });
    });

    gulp.watch("**/*.ejs", function(){
        browserSync.reload();
    });
});

gulp.task('default', ['serve']);