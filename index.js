'use strict';

var plugins = {
  browserify: require('browserify'),
  watchify: require('watchify'),
  babelify: require('babelify'),
  gutil: require('gulp-util'),
  transform: require('vinyl-transform'),
  source: require('vinyl-source-stream')
}

module.exports = function (gulp, param) {
  var browserify = plugins.browserify(param.rootFile, {
    debug: gulp.isProduction ? false : true
  })

  browserify.transform(plugins.babelify)

  // Browserify build and concat (We use watchify for browserify, so we dont lose in performance)
  gulp.task('browserify:watch', ['browserify:build'], function() {
    browserify = plugins.watchify(browserify)
    .on('update', function() {
      gulp.start('browserify:build')
    })
  })

  gulp.task('browserify:build', function () {
    browserify.bundle()
    .on('error', function(err) {
      plugins.gutil.log(plugins.gutil.colors.red(err.message))
      this.emit('end')
    })
    .pipe(plugins.source('bundle.js'))
    .pipe(gulp.dest(param.output))
  })
}
