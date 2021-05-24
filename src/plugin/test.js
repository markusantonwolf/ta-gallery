const fnc = require('./functions')
const utilities = require('./utilities')
const keyframes = require('./keyframes')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const ta_config_defaults = {
    animations: ['swing', 'swipe', 'slide', 'rotate', 'snake', 'window', 'scroll', 'fade'],
    animation_default: 'slide',
    aspect_ratios: [
        'square',
        'movietone',
        'large',
        'tv',
        'academy',
        'imax',
        'classic',
        'still',
        'modern',
        'common',
        'golden',
        'super',
        'hd',
        'wide',
    ],
    debug: false,
    export: false,
}

const aspect_ratios = {
    square: 1 / 1,
    movietone: 6 / 5,
    large: 5 / 4,
    tv: 4 / 3,
    academy: 11 / 8,
    imax: 1.43 / 1,
    classic: 3 / 2,
    still: 3 / 2,
    modern: 14 / 9,
    common: 16 / 10,
    golden: 1.618 / 1,
    super: 5 / 3,
    hd: 16 / 9,
    wide: 1.85 / 1,
}

let index = 0
for (index = 0; index < ta_config_defaults.aspect_ratios.length; index++) {
    if (typeof ta_config_defaults.aspect_ratios[index] === 'string') {
        if (typeof aspect_ratios[ta_config_defaults.aspect_ratios[index]] !== 'undefined') {
            ta_config_defaults.aspect_ratios[index] = {
                name: ta_config_defaults.aspect_ratios[index],
                value: aspect_ratios[ta_config_defaults.aspect_ratios[index]],
            }
        }
    } else {
        for (const key in ta_config_defaults.aspect_ratios[index]) {
            if (Object.hasOwnProperty.call(ta_config_defaults.aspect_ratios[index], key)) {
                ta_config_defaults.aspect_ratios[index] = {
                    name: key,
                    value: ta_config_defaults.aspect_ratios[index][key],
                }
            }
        }
    }
}

const new_utilities = {}

_.merge(new_utilities, utilities(ta_config_defaults))
_.merge(new_utilities, keyframes(ta_config_defaults))

const dest_path = path.join(__dirname, '..', '..', 'test', 'ta-gallery-utilities.css')
if (fs.existsSync(dest_path)) {
    fs.writeFileSync(dest_path, fnc.flattenObject(new_utilities))
} else {
    dest_folder = path.join(__dirname, '..', '..', 'test')
    if (!fs.existsSync(dest_folder)) {
        fs.mkdirSync(dest_folder)
    }
    fs.writeFileSync(dest_path, fnc.flattenObject(new_utilities))
}
