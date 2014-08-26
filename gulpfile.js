var gulp        = require('gulp');
var harp        = require('harp');
var mustache = require("gulp-mustache");
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');

gulp.task('serve', function () {
    harp.server('app', { port: 9000 }, function () {
        browserSync({
              proxy: "localhost:9000",
              /* Hide the notification. It gets annoying */
              notify: {
                styles: ['opacity: 0', 'position: absolute']
              }
            });
    });

    gulp.watch("**/*.ejs", function(){
        browserSync.reload();
    });
    gulp.watch("**/*.sass", function () {
      browserSync.reload("styles/core.css", {stream: true});
    });
});

gulp.task('default', ['serve']);
