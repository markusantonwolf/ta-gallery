const { src, dest, parallel } = require('gulp')
const config = require('config')
const print = require('gulp-print').default

const STYLES_DISTRIBUTION = config.get('gulp.styles.distribution')
const STYLES_DESTINATION = config.get('gulp.styles.destination')
const SCRIPTS_DISTRIBUTION = config.get('gulp.scripts.distribution')
const SCRIPTS_DESTINATION = config.get('gulp.scripts.destination')

const fnc_styles_copy = function () {
  return src([STYLES_DISTRIBUTION + '/**/*.css'])
    .pipe(dest(STYLES_DESTINATION))
    .pipe(print())
}

const fnc_scripts_copy = function () {
  return src([SCRIPTS_DISTRIBUTION + '/**/*.js'])
    .pipe(dest(SCRIPTS_DESTINATION))
    .pipe(print())
}

module.exports.styles_copy = fnc_styles_copy
module.exports.scripts_copy = fnc_scripts_copy
module.exports.copy = parallel(fnc_styles_copy, fnc_scripts_copy)
