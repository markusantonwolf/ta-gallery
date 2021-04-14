const config = require('config')
const { src, dest, parallel } = require('gulp')
const postcss = require('gulp-postcss')
const purgecss = require('@fullhuman/postcss-purgecss')

const SOURCE_LAYOUT = config.get('source.layout')
const DESTINATION_LAYOUT = config.get('destination.layout')
const SOURCE_PLUGIN_CSS = config.get('source.plugin_css')
const DESTINATION_STYLES_CSS = config.get('destination.plugin_css')
const PURGE_CONTENT = config.get('purge.content')

const styles_styles = () => {
    const postcssOptions = [require('tailwindcss'), require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            purgecss({
                content: PURGE_CONTENT,
                defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
            })
        )
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src(SOURCE_LAYOUT).pipe(postcss(postcssOptions)).pipe(dest(DESTINATION_LAYOUT))
}
const styles_ta_plugin = () => {
    const postcssOptions = [require('tailwindcss'), require('autoprefixer')]
    if (process.env.NODE_ENV === 'production') {
        postcssOptions.push(
            require('cssnano')({
                preset: 'default',
            })
        )
    }
    return src(SOURCE_PLUGIN_CSS).pipe(postcss(postcssOptions)).pipe(dest(DESTINATION_STYLES_CSS))
}

module.exports.styles = parallel(styles_styles, styles_ta_plugin)
