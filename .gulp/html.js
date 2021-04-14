const config = require('config')
const { src, dest } = require('gulp')
const fileinclude = require('gulp-file-include')

const SOURCE_VIEWS = config.get('source.views')
const DESTINATION_VIEWS = config.get('destination.views')

module.exports.html = () => {
    return src(SOURCE_VIEWS)
        .pipe(
            fileinclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(dest(DESTINATION_VIEWS))
}
