const config = require('config')
const { src, dest, parallel } = require('gulp')
const print = require('gulp-print').default

const DISTRIBUTION_STYLES = config.get('distribution.styles')
const DISTRIBUTION_SCRIPTS = config.get('distribution.scripts')
const PUBLIC_SCRIPTS = config.get('public.scripts')
const PUBLIC_STYLES = config.get('public.styles')

const copy_css = () => {
    return src(DISTRIBUTION_STYLES, {
        allowEmpty: true,
    })
        .pipe(dest(PUBLIC_STYLES))
        .pipe(print())
}
const copy_js = () => {
    return src(DISTRIBUTION_SCRIPTS, {
        allowEmpty: true,
    })
        .pipe(dest(PUBLIC_SCRIPTS))
        .pipe(print())
}

module.exports.copy = parallel(copy_css, copy_js)
