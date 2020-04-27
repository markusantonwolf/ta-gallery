const { dest, src, parallel } = require('gulp')
const atimport = require('postcss-import')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const tailwindcss = require('tailwindcss')
const cssnano = require('cssnano')
const config = require('config')
const touch = require('gulp-touch-fd')
const fs = require('fs')
const { getFiles } = require('./_tools')

const STYLES_BASE = config.get('gulp.styles.base')
const STYLES_DISTRIBUTION = config.get('gulp.styles.distribution')
const TAILWIND_CONFIG = config.get('gulp.tailwind.config')
const PURGE_CONTENT = config.get('gulp.purge.content')
const PURGE_WHITELIST = config.get('gulp.purge.whitelist')

const styles_bundle = getFiles(STYLES_BASE)
styles_bundle.forEach((obj) => {
  obj.dest = STYLES_DISTRIBUTION
})

const fnc_styles_develop = new Array()
const fnc_styles_build = new Array()

styles_bundle.forEach((obj) => {
  fnc_styles_develop.push(function styles_develop() {
    return src(obj.src)
      .pipe(postcss([atimport(), tailwindcss(TAILWIND_CONFIG)]))
      .pipe(dest(obj.dest))
      .pipe(touch())
  })
  fnc_styles_build.push(function styles_build() {
    let postcss_tasks = new Array()
    postcss_tasks.push(atimport())
    postcss_tasks.push(tailwindcss(TAILWIND_CONFIG))
    const file_content = fs.readFileSync(obj.src, 'utf8')
    if (file_content.substr(0, 11) !== '/* NO PURGE') {
      console.info('PURGE: ', obj.src)
      postcss_tasks.push(
        purgecss({
          content: PURGE_CONTENT,
          whitelist: PURGE_WHITELIST,
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        })
      )
    } else {
      console.info('NO PURGE: ', obj.src)
    }
    postcss_tasks.push(cssnano())
    return src(obj.src).pipe(postcss(postcss_tasks)).pipe(dest(obj.dest)).pipe(touch())
  })
})

if (fnc_styles_develop.length > 1) {
  module.exports.styles_develop = parallel(fnc_styles_develop)
} else {
  module.exports.styles_develop = fnc_styles_develop
}
if (fnc_styles_build.length > 1) {
  module.exports.styles_build = parallel(fnc_styles_build)
} else {
  module.exports.styles_build = fnc_styles_build
}
