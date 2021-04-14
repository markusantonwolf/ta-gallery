const config = require('config')
const { src, dest, parallel, series } = require('gulp')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

const SOURCE_ALPINE = config.get('source.alpine_js')
const NAME_ALPINE = config.get('name.alpine_js')
const DESTINATION_ALPINE = config.get('destination.alpine_js')

const SOURCE_PLUGIN_JS = config.get('source.plugin_js')
const NAME_PLUGIN_JS = config.get('name.plugin_js')
const DESTINATION_PLUGIN_JS = config.get('destination.plugin_js')

const SOURCE_PLUGIN_ALPINE_JS = config.get('source.plugin_alpine_js')
const NAME_PLUGIN_ALPINE_JS = config.get('name.plugin_alpine_js')
const DESTINATION_PLUGIN_ALPINE_JS = config.get('destination.plugin_alpine_js')

const alpine_js = () => {
    return src(SOURCE_ALPINE)
        .pipe(concat(NAME_ALPINE))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(DESTINATION_ALPINE))
}
const ta_script = () => {
    return src(SOURCE_PLUGIN_JS)
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(concat(NAME_PLUGIN_JS))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(DESTINATION_PLUGIN_JS))
}
const ta_script_alpine = () => {
    return src(SOURCE_PLUGIN_ALPINE_JS)
        .pipe(concat(NAME_PLUGIN_ALPINE_JS))
        .pipe(
            minify({
                ext: {
                    min: '.min.js',
                },
                ignoreFiles: ['.min.js'],
            })
        )
        .pipe(dest(DESTINATION_PLUGIN_ALPINE_JS))
}

module.exports.scripts = series(parallel(alpine_js, ta_script), ta_script_alpine)
