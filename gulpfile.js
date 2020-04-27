process.env.NODE_CONFIG_DIR = './.gulp/config'

const config = require('config')
const STYLES_BASE = config.get('gulp.styles.base')
const STYLES_SOURCE = config.get('gulp.styles.source')
const SCRIPTS_BASE = config.get('gulp.scripts.base')
const SCRIPTS_SOURCE = config.get('gulp.scripts.source')

const { series, parallel, watch } = require('gulp')
const { styles_develop, styles_build } = require('./.gulp/styles')
const { scripts_develop, scripts_build } = require('./.gulp/scripts')
const { alpinejs } = require('./.gulp/alpine')
const { clean } = require('./.gulp/clean')
const { copy, styles_copy, scripts_copy } = require('./.gulp/copy')
const gls = require('gulp-live-server')
const { existsSync } = require('fs')

const develop = series(clean, parallel(styles_develop, scripts_develop, alpinejs), copy)
const build = series(clean, parallel(styles_build, scripts_build, alpinejs), copy)

const fnc_serve = function () {
  var server = gls.static('public', 8888)
  server.start()

  if (existsSync(STYLES_BASE)) {
    console.info('watching: ' + STYLES_SOURCE)
    watch(STYLES_SOURCE, series(styles_develop, styles_copy))
    watch(STYLES_SOURCE, function () {
      server.start.bind(server)()
    })
  }
  if (existsSync(SCRIPTS_BASE)) {
    console.info('watching: ' + SCRIPTS_SOURCE)
    watch(SCRIPTS_SOURCE, series(scripts_develop, scripts_copy))
    watch(SCRIPTS_SOURCE, function () {
      server.start.bind(server)()
    })
  }
}

exports.develop = develop
exports.build = build
exports.serve = series(develop, fnc_serve)
