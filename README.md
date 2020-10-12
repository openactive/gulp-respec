# gulp-respec
This package provides gulp tasks to render ReSpec files

## Usage

Simply add a file in the root of your specification repository with the name `Gulpfile.js`, and the contents:
```javascript
const gulp = require('gulp');
const {render, express, watch} = require('gulp-respec')();

gulp.task('default', gulp.series(render, express, watch));
```

## Configuration

Additional configuration parameters are available, as follows:
```javascript
const gulp = require('gulp');
const {render, serve, watch} = require('gulp-respec')({
  serverPort: 4000, // Port to serve local copy of specification
  liveReloadPort: 35729, // Port to trigger live reload of spec
  inputDirectory: 'EditorsDraft', // Directory of spec
  inputRespecFilename: 'edit', // Filename of spec (e.g. 'edit' for 'edit.html')
  outputDirectory: 'render', // Output directory of rendered spec
});

gulp.task('default', gulp.series(render, express, watch));
```
