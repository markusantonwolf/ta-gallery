const plugin = require('tailwindcss/plugin')
const utilities = require('./utilities')
const keyframes = require('./keyframes')
const _ = require('lodash')

const ta_config_defaults = {
    animations: ['swing', 'swipe', 'slide', 'rotate', 'snake', 'window', 'scroll', 'fade', 'dynamic'],
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

const ta_plugin_defaults = {
    variants: ['responsive'],
    respectPrefix: false,
    respectImportant: true,
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

module.exports = plugin.withOptions((options = {}) => {
    return function ({ addComponents, theme, variants, config, postcss }) {
        const ta_config = _.defaultsDeep({}, theme('taGallery'), ta_config_defaults)
        const ta_plugin = _.defaultsDeep(options, { variants: variants('taGallery') }, ta_plugin_defaults)

        let index = 0
        for (index = 0; index < ta_config.aspect_ratios.length; index++) {
            if (typeof ta_config.aspect_ratios[index] === 'string') {
                if (typeof aspect_ratios[ta_config.aspect_ratios[index]] !== 'undefined') {
                    ta_config.aspect_ratios[index] = {
                        name: ta_config.aspect_ratios[index],
                        value: aspect_ratios[ta_config.aspect_ratios[index]],
                    }
                }
            } else {
                for (const key in ta_config.aspect_ratios[index]) {
                    if (Object.hasOwnProperty.call(ta_config.aspect_ratios[index], key)) {
                        ta_config.aspect_ratios[index] = {
                            name: key,
                            value: ta_config.aspect_ratios[index][key],
                        }
                    }
                }
            }
        }

        const new_utilities = {}
        const new_keyframes = {}

        _.merge(new_utilities, utilities(ta_config))
        _.merge(new_keyframes, keyframes(ta_config))

        addComponents(new_utilities, ta_plugin)
        addComponents(new_keyframes, {
            variants: [],
            respectPrefix: ta_plugin.respectPrefix,
            respectImportant: ta_plugin.respectImportant,
        })
    }
})
