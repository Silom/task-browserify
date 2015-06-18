'use strict';

var plugins = {
  plumber: require('gulp-plumber'),
  browserify: require('browserify'),
  watchify: require('watchify'),
  babelify: require('babelify'),
  gutil: require('gulp-util'),
  transform: require('vinyl-transform'),
  exorcist: require('exorcist'),
  source: require('source-stream')
}

module.exports = function (gulp, param) {
  var browserify = plugins.browserify({
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: gulp.configs.isProduction ? false : true
  })
  browserify.add(param.rootFile)

  browserify.transform(plugins.babelify.configure({
    sourceMaps: gulp.configs.sourceMap
  }))


  // Browserify build and concat (We use watchify for browserify, so we dont lose in performance)
  gulp.task('browserify:watch', ['browserify:build'], function() {
    browserify = plugins.watchify(browserify)
    .on('update', function() {
      gulp.start('browserify:build')
    })
  })

  gulp.task('browserify:build', function () {
    browserify.bundle()
    .on('error', function(err){
      plugins.gutil.log(plugins.gutil.colors.red(err.message))
      this.emit('end')
    })
    .pipe(plugins.source('bundle.js'))
    .pipe(
      gulp.configs.isProduction ?
      plugins.gutil.noop() :
      plugins.transform(function () {
        return plugins.exorcist(param.output + 'bundle.js.map')
      })
    )
    .pipe(gulp.dest(param.output))
  })
}
