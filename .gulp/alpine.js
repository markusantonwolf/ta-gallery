const { dest, src, parallel } = require('gulp')
const concat = require('gulp-concat')
const touch = require('gulp-touch-fd')
const uglify = require('gulp-uglify-es').default
const minify = require('gulp-minify')
const config = require('config')
const { getFiles } = require('./_tools')

const ALPINEJS_BASE = config.get('gulp.alpinejs.base')
const ALPINEJS_DISTRIBUTION = config.get('gulp.alpinejs.distribution')

const alpine_bundle = getFiles(ALPINEJS_BASE)
alpine_bundle.forEach((obj) => {
  obj.dest = ALPINEJS_DISTRIBUTION
})

const fnc_alpine = new Array()

alpine_bundle.forEach((obj) => {
  fnc_alpine.push(function scripts_develop() {
    return src(obj.src)
      .pipe(concat(obj.name))
      .pipe(
        minify({
          ext: {
            min: '.min.js',
          },
          ignoreFiles: ['-min.js'],
        })
      )
      .pipe(dest(obj.dest))
      .pipe(touch())
  })
})

if (fnc_alpine.length > 1) {
  module.exports.alpinejs = parallel(fnc_alpine)
} else {
  module.exports.alpinejs = fnc_alpine
}
