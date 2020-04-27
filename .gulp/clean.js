const { src } = require('gulp')
const config = require('config')
const clean = require('gulp-clean')

const STYLES_DISTRIBUTION = config.get('gulp.styles.distribution')
const STYLES_DESTINATION = config.get('gulp.styles.destination')
const SCRIPTS_DISTRIBUTION = config.get('gulp.scripts.distribution')
const SCRIPTS_DESTINATION = config.get('gulp.scripts.destination')

const fnc_delete = function () {
  return src(
    [
      STYLES_DISTRIBUTION + '/**/*',
      STYLES_DESTINATION + '/**/*',
      SCRIPTS_DISTRIBUTION + '/**/*',
      SCRIPTS_DESTINATION + '/**/*',
    ],
    {
      read: false,
    }
  ).pipe(clean())
}

module.exports.clean = fnc_delete
