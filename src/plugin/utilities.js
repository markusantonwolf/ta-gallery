const fnc = require('./functions');
const animations = require('./keyframes.json');

module.exports = (config, e) => {
    var new_utilities = {};

    new_utilities['.ta-gallery'] = {
        position: 'relative',
        minHeight: 'var(--ta-gallery-min-height)',
        maxWidth: 'var(--ta-gallery-width, 100%)',
        maxHeight: 'var(--ta-gallery-height, 100%)',
        perspective: '1000px',
        perspectiveOrigin: 'center center',
    };

    new_utilities['.ta-gallery-size'] = {
        width: 'var(--ta-gallery-width, 100%)',
        height: 'var(--ta-gallery-height, 100%)',
        minHeight: 'var(--ta-gallery-min-height, 100%)',
    };
    let index = 0;
    for (index = 0; index < config.aspect_ratios.length; index++) {
        new_utilities['.ta-gallery-aspect-' + config.aspect_ratios[index].name] = {
            '--ta-gallery-aspect-ratio': Number.parseFloat(
                config.aspect_ratios[index].value
            ).toFixed(3),
            '--ta-gallery-width': '100%',
            height: '0px',
            paddingBottom: 'calc(100% / var(--ta-gallery-aspect-ratio))',
        };
    }

    new_utilities['.ta-gallery-element'] = {
        ...fnc.getInset(),
    };
    new_utilities['.ta-gallery-background'] = {
        ...fnc.getInset(),
        zIndex: '0',
    };
    new_utilities['.ta-gallery-background-image'] = {
        ...fnc.getInset(),
        zIndex: '0',
    };
    new_utilities['.ta-gallery-element'] = {
        ...fnc.getInset(),
        zIndex: '1',
        animationTimingFunction: 'var(--ta-galley-anim-timing, ease-in-out)',
        animationFillMode: 'both',
        animationDuration: 'var(--ta-gallery-anim-duration, 0.3s)',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        visibility: 'hidden',
        opacity: '0',
        '--ta-gallery-anim-right-in': 'ta-gallery-' + config.animation_default + '-right-in',
        '--ta-gallery-anim-right-out': 'ta-gallery-' + config.animation_default + '-right-out',
        '--ta-gallery-anim-left-in': 'ta-gallery-' + config.animation_default + '-left-in',
        '--ta-gallery-anim-left-out': 'ta-gallery-' + config.animation_default + '-left-out',
    };
    new_utilities['.ta-gallery-element-active'] = {
        // ['\n\/\* purgecss ignore current \*\/\npurgecss']: 'block',
        visibility: 'visible',
        zIndex: '2',
        opacity: '1',
    };
    new_utilities['.ta-gallery-image'] = {
        ...fnc.getInset(),
        objectFit: 'cover',
        objectPosition: 'center center',
    };
    new_utilities['.ta-gallery-image-lazy'] = {
        width: '20vw',
        maxWidth: '100px',
        height: '10rem',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    };
    new_utilities['.ta-gallery-button'] = {
        position: 'absolute',
        top: '50%',
        zIndex: '10',
        transform: 'translateY(-50%)',
    };
    new_utilities['.ta-gallery-button-left'] = {
        left: '0.5rem',
    };
    new_utilities['.ta-gallery-button-right'] = {
        right: '0.5rem',
    };

    for (index = 0; index < config.animations.length; index++) {
        const animation = {
            '--ta-gallery-anim-right-in': 'ta-gallery-' + config.animations[index] + '-right-in',
            '--ta-gallery-anim-right-out': 'ta-gallery-' + config.animations[index] + '-right-out',
            '--ta-gallery-anim-left-in': 'ta-gallery-' + config.animations[index] + '-left-in',
            '--ta-gallery-anim-left-out': 'ta-gallery-' + config.animations[index] + '-left-out',
        };
        if (typeof animations[config.animations[index]].origin !== 'undefined') {
            animation['--ta-gallery-origin-right-in'] =
                animations[config.animations[index]].origin.rightIn;
            animation['--ta-gallery-origin-right-out'] =
                animations[config.animations[index]].origin.rightOut;
            animation['--ta-gallery-origin-left-in'] =
                animations[config.animations[index]].origin.leftIn;
            animation['--ta-gallery-origin-left-out'] =
                animations[config.animations[index]].origin.leftOut;
        }
        new_utilities['.ta-gallery-anim-' + config.animations[index]] = animation;
    }

    new_utilities['.ta-gallery-anim-right-in'] = {
        visibility: 'visible',
        transformOrigin: 'var(--ta-gallery-origin-right-in)',
        animationName: 'var(--ta-gallery-anim-right-in, ta-gallery-right-in)',
        animationDelay: 'calc(var(--ta-gallery-anim-duration) / 2)',
    };
    new_utilities['.ta-gallery-anim-right-out'] = {
        visibility: 'visible',
        transformOrigin: 'var(--ta-gallery-origin-right-out)',
        animationName: 'var(--ta-gallery-anim-right-out, ta-gallery-right-out)',
        animationDelay: '0s',
    };
    new_utilities['.ta-gallery-anim-left-in'] = {
        visibility: 'visible',
        transformOrigin: 'var(--ta-gallery-origin-left-in)',
        animationName: 'var(--ta-gallery-anim-left-in, ta-gallery-left-in)',
        animationDelay: 'calc(var(--ta-gallery-anim-duration) / 2)',
    };
    new_utilities['.ta-gallery-anim-left-out'] = {
        visibility: 'visible',
        transformOrigin: 'var(--ta-gallery-origin-left-out)',
        animationName: 'var(--ta-gallery-anim-left-out, ta-gallery-left-out)',
        animationDelay: '0s',
    };
    new_utilities['.ta-gallery-image-caption'] = {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 'auto',
        bottom: 0,
        width: '100%',
        zIndex: 1,
    };

    return new_utilities;
};
