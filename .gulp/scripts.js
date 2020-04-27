const { dest, src, parallel } = require('gulp')
const concat = require('gulp-concat')
const touch = require('gulp-touch-fd')
const config = require('config')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const { getFiles } = require('./_tools')

const SCRIPTS_BASE = config.get('gulp.scripts.base')
const SCRIPTS_DISTRIBUTION = config.get('gulp.scripts.distribution')
const ALPINEJS_BASE = config.get('gulp.alpinejs.base')
const ALPINEJS_DISTRIBUTION = config.get('gulp.alpinejs.distribution')

const scripts_bundle = getFiles(SCRIPTS_BASE)
scripts_bundle.forEach((obj) => {
  obj.dest = SCRIPTS_DISTRIBUTION
})

const scripts_alpinejs = getFiles(ALPINEJS_BASE)
scripts_alpinejs.forEach((obj) => {
  scripts_bundle.push({
    src: obj.src,
    name: obj.name,
    dest: ALPINEJS_DISTRIBUTION,
  })
})

const fnc_scripts_develop = new Array()
const fnc_scripts_build = new Array()

scripts_bundle.forEach((obj) => {
  fnc_scripts_develop.push(function scripts_develop() {
    return src(obj.src)
      .pipe(concat(obj.name))
      .pipe(
        babel({
          presets: ['@babel/env'],
        })
      )
      .pipe(dest(obj.dest))
      .pipe(touch())
  })
  fnc_scripts_build.push(function scripts_build() {
    return src(obj.src)
      .pipe(concat(obj.name))
      .pipe(
        babel({
          presets: ['@babel/env'],
        })
      )
      .pipe(uglify())
      .pipe(dest(obj.dest))
      .pipe(touch())
  })
})

if (fnc_scripts_develop.length > 1) {
  module.exports.scripts_develop = parallel(fnc_scripts_develop)
} else {
  module.exports.scripts_develop = fnc_scripts_develop
}
if (fnc_scripts_build.length > 1) {
  module.exports.scripts_build = parallel(fnc_scripts_build)
} else {
  module.exports.scripts_build = fnc_scripts_build
}
