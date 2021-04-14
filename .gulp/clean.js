const config = require('config')
const { src } = require('gulp')
const clean = require('gulp-clean')

const CLEAN = config.get('clean')

module.exports.clean = () => {
    return src(CLEAN, {
        read: false,
        allowEmpty: true,
    }).pipe(clean())
}
