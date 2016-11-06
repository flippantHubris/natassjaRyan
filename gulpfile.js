
var gulp = require('gulp');
var rimraf = require('rimraf');
var sequence = require('run-sequence');
var browser  = require('browser-sync');
var $ = require('gulp-load-plugins')();
var panini = require('panini');


// Port to use for the development server.
var PORT = 8000;

// File paths to various assets are defined here.
var PATHS = {
  sass: [
    'src/assets/scss/*.scss',
    'src/assets/scss/**/*.scss'
  ],
  javascript: [
    'src/scripts/*.js'
  ]

};


gulp.task('build', function(done) {
  sequence('clean',[ 'scripts', 'img', 'styles' ], 'pages', done);
});

//clean function: basically just deletes the dist dir
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

//copy fonts to dist
gulp.task('fonts', function() {
  return gulp.src([
    'src/assets/fonts/**/*'
  ])
    .pipe(gulp.dest('dist/fonts/'));
});

//transfer imgages to dist
gulp.task('img', function() {
  return gulp.src([
    'src/assets/img/**/*.jpg'
  ])
    .pipe(gulp.dest('dist/img/'));
});

//compile and copy sass to dist
gulp.task('styles', function() {
  return gulp.src([
    'src/styles/*.scss'
  ])
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('dist/styles'));
});

//combine and copy scripts to dist
gulp.task('scripts', function() {
    gulp.src(PATHS.javascript)
      .pipe(gulp.dest('dist/scripts/'));
  });

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  var injectFiles = gulp.src('dist/**/*.{css,js}');

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

    gulp.src('src/assets/pages/**/*.html')
      .pipe(panini({
        root: 'src/assets/pages/',
        layouts: 'src/assets/layouts/',
        partials: 'src/assets/partials/',
      }))
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(gulp.dest('dist'));
  });
  //end pages


gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});

  // Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});


// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(['src/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/assets/{layouts,partials,pages}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/styles/**/*.scss'], [ 'styles', browser.reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['img', browser.reload]);
});
