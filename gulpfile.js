

var gulp = require('gulp');


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
