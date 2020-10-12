# gulp-respec
This package provides gulp tasks to render ReSpec files, which provides a live preview during editing.

## Installation

Install `gulp` and this library:
```sh
npm install gulp --save
npm install github:openactive/gulp-respec --save
```

Then simply add a file in the root of your specification repository with the name `Gulpfile.js`, and the contents:
```javascript
const gulp = require('gulp');
const {render, serve, watch, renderOrFail} = require('gulp-respec')();

gulp.task('default', gulp.series(render, serve, watch));
gulp.task('render', renderOrFail));
```

## Usage

To run during development, simply use the command:
```sh
gulp
```

To run in CI, simply use the following commands as part of your CI script (the first two lines for GitHub Actions only):
```sh
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome
npm install
gulp render
```

## Configuration

Additional configuration parameters are available, as follows:
```javascript
const gulp = require('gulp');
const {render, serve, watch, renderOrFail} = require('gulp-respec')({
  serverPort: 4000, // Port to serve local copy of specification
  liveReloadPort: 35729, // Port to trigger live reload of spec
  inputDirectory: 'EditorsDraft', // Directory of spec
  inputRespecFilename: 'edit', // Filename of spec (e.g. 'edit' for 'edit.html')
  outputDirectory: 'render', // Output directory of rendered spec
});

gulp.task('default', gulp.series(render, serve, watch));
gulp.task('render', renderOrFail));
```
