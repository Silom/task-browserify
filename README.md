# Task-Browserify

Builds a bundle.js file from a valid ES6 modularized source.
Also there is Babel.js included, so you can use ES6+ syntax.

``npm install --save task-browserify``

If you have any idea on other tasks that you need in your project, just tell me and I will most likely create it for you :).


## Configurations

Task will have the name ``'browserify:watch'`` and ``browserify:build``.

Build will build one time.
Watch will build on change, all watcher will be resolved automatically.

##### rootFile

Glop for the initial JS-file.

Please note that the watcher will resolve all required files and activate listener.

##### output

Glop for the destination of the bundle.js.

*Example:*

```
require("task-browserify")(gulp, {
  rootFile: './src/app.js',
  output: dest + 'js/'
})
```

### Advanced

Add this line to your gulp object:

```
gulp.isProduction = true
```

Will add source maps to your code.
