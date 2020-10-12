'use strict';

const gulp = require('gulp'),
      gulpif = require('gulp-if'),
      livereload = require('gulp-livereload'),
      through = require('through2');

const fetchAndWrite = require("./node_modules/respec/tools/respecDocWriter.js").fetchAndWrite;

module.exports = function ({
  expressPort,
  liveReloadPort,
  inputDirectory,
  inputRespecFilename,
  outputDirectory,
}) {
  const EXPRESS_PORT = expressPort || 4000;
  const LIVERELOAD_PORT = liveReloadPort || 35729;
  const INPUT_DIRECTORY = inputDirectory || 'EditorsDraft'
  const INPUT_RESPEC_FILENAME = inputRespecFilename || 'edit'
  const OUTPUT_DIRECTORY = outputDirectory || 'render';

  const renderRespecFile = async function (file, enc, cb) {
    const src = `file://${file.path}`;
    console.log('Rendering ReSpec: ' + src);
    try {
      const html = await fetchAndWrite(src,
        "",
        { haltOnError: false, haltOnWarn: false },
        { timeout: 30000 });
      file.contents = new Buffer.from(html);
      cb(null, file);
    } catch (err) {
      cb(err);
    }
  }

  const render = function () {
    return gulp.src([`${INPUT_DIRECTORY}/${INPUT_RESPEC_FILENAME}.html`, `${INPUT_DIRECTORY}/*.png`])
      .pipe(gulpif(file => file.extname === '.html', through.obj(renderRespecFile)))
      .on('error', function(error) {
        console.error(`\nError: ${error.message}\n`);
      })
      .pipe(gulp.dest(OUTPUT_DIRECTORY))
      .pipe(livereload());
  }

  const express = function () {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: LIVERELOAD_PORT }));
    app.use(express.static(__dirname));
    app.listen(EXPRESS_PORT, '0.0.0.0');
    livereload.listen({ basePath: '.', port: LIVERELOAD_PORT });
  }

  const watch = async function () {
    gulp.watch(`${INPUT_DIRECTORY}/*`, render);

    console.log(`
  Watching ./${INPUT_DIRECTORY}/*
  - ReSpec: http://localhost:${EXPRESS_PORT}/${INPUT_DIRECTORY}/${INPUT_RESPEC_FILENAME}.html
  - HTML: http://localhost:${EXPRESS_PORT}/${OUTPUT_DIRECTORY}/${INPUT_RESPEC_FILENAME}.html
  `)
  }

  return {
    render,
    express,
    watch,
  }
}
