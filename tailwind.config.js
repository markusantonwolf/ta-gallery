module.exports = {
    purge: {
        enabled: false,
    },
    theme: {
        fontFamily: {
            sans: ['Raleway', 'Helvetica', 'Arial', 'sans-serif'],
            mono: ['"Fira Code"', 'Consolas', 'Monaco', 'Andale', 'Mono', '"Ubuntu Mon"', 'monospace'],
        },
        customColorPalette: {
            colors: {
                primary: '#841F3D',
                secondary: '#2975A5',
                gray: '#737b80',
                teal: '#408075',
            },
            steps: 50,
        },
        taGallery: {
            animations: ['swing', 'swipe', 'slide', 'rotate', 'snake', 'window', 'scroll', 'fade'],
            animation_default: 'slide', // default value
            aspect_ratios: [
                'wide',
                'hd',
                'super',
                'common',
                'modern',
                {
                    instagram: 3 / 5,
                },
            ],
        },
        extend: {},
    },
    variants: {
        taGallery: ['responsive'],
    },
    plugins: [
        require('./src/plugin/index.js'),
        require('@markusantonwolf/tailwind-css-plugin-filters'),
        require('@markusantonwolf/tailwind-css-plugin-custom-color-palette'),
    ],
}
