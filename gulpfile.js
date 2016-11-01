

var gulp = require('gulp');

var rimraf = require('rimraf');

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
    'src/assets/js/**/*.js',
    'src/assets/js/*.js'
  ]

};


gulp.task('default', function() {
  // place code for your default task here
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


// Copy page templates into finished HTML files
gulp.task('pages', function() {
  var injectFiles = gulp.src('dist/**/*.{css,js}');

  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

    gulp.src('src/*.html')
      .pipe(panini({
        root: 'src/',
        layouts: 'src/assets/layouts/',
        partials: 'src/assets/partials/',
      }))
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(gulp.dest('dist'));
  });
  //end pages
