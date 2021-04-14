const animations = require('./keyframes.json');

module.exports = (config) => {
    var new_keyframes = {};

    for (const property in animations) {
        if (config.animations.indexOf(property) !== -1) {
            new_keyframes['@keyframes ta-gallery-' + property + '-right-in'] = {
                from: {
                    opacity: '0',
                    ...animations[property].rightIn,
                },
                to: {
                    opacity: '1',
                    ...animations[property].default,
                },
            };
            new_keyframes['@keyframes ta-gallery-' + property + '-right-out'] = {
                from: {
                    opacity: '1',
                    ...animations[property].default,
                },
                to: {
                    opacity: '0',
                    ...animations[property].rightOut,
                },
            };
            new_keyframes['@keyframes ta-gallery-' + property + '-left-in'] = {
                from: {
                    opacity: '0',
                    ...animations[property].leftIn,
                },
                to: {
                    opacity: '1',
                    ...animations[property].default,
                },
            };
            new_keyframes['@keyframes ta-gallery-' + property + '-left-out'] = {
                from: {
                    opacity: '1',
                    ...animations[property].default,
                },
                to: {
                    opacity: '0',
                    ...animations[property].leftOut,
                },
            };
        }
    }

    return new_keyframes;
};
