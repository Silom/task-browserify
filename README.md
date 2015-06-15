# Task-Browserify

Builds a bundle.js file from a valid ES6 modularized source.
Also there is Babel.js included, so you can use ES6+ syntax.


## Configurations

##### rootFile

Glop for the initial JS-file.

Please note that the watcher will resolve all required files and activate watcher.

##### output

Glop for the destination of the bundle.js.

*Example:*

```
{
  rootFile: './src/app.js',
  output: dest + 'js/'
}
```


## Dependencies

- gulp-plumber
- gulp-util
- transform
- browserify
- watchify
- babelify
- exorcist

Either install dependencies within this task, or type ``npm install --save-dev [dependencies]``.
