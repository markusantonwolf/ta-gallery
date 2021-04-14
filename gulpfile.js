process.env.NODE_CONFIG_DIR = './.config'

const config = require('config')
const gls = require('gulp-live-server')
const { series, watch, parallel } = require('gulp')
const { clean } = require('./.gulp/clean')
const { copy } = require('./.gulp/copy')
const { html } = require('./.gulp/html')
const { styles } = require('./.gulp/styles')
const { scripts } = require('./.gulp/scripts')

const WATCH_STYLES = config.get('watch.styles')
const WATCH_SCRIPTS = config.get('watch.scripts')
const WATCH_VIEWS = config.get('watch.views')
const WATCH_SNIPPETS = config.get('watch.snippets')

const watch_changes = () => {
    var server = gls.static('public')
    server.start()

    watch(WATCH_STYLES, series(styles, copy))
    watch(WATCH_SCRIPTS, series(scripts, copy))
    watch(WATCH_VIEWS, series(html, copy))
    watch(WATCH_SNIPPETS, series(html, copy))
}

exports.build = series(clean, parallel(styles, scripts), html, copy)
exports.serve = series(clean, parallel(styles, scripts), html, copy, watch_changes)
