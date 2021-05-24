<p align="center">
  <img src="./public/img/logo-ta-gallery.png" width="400px" />
</p>

# **TA-Gallery** - Image, content and text slider

**You can use the light-weight, responsive and mobile first gallery, carousel, slide show or rotator for images, texts and every kind of content.**

## Demos, Documentation and Examples

[Documentation](https://ta-styled-plugins.com/ta-gallery/)

[Getting started](https://ta-styled-plugins.com/ta-gallery/getting-started/)

[Examples](https://ta-styled-plugins.com/ta-gallery/examples/)

[Configuration](https://ta-styled-plugins.com/ta-gallery/configuration/)

[Tailwind CSS plugin](https://ta-styled-plugins.com/ta-gallery/tailwind-css-plugin/)

## Features

-   Animate every content - Choose every kind of content, image, text, table or list.
-   Transitions - You can change the transition for every slide.
-   Autoplay mode - Control the gallery the way you want to
-   Supports accessibility - Actions, values and configurations
-   Based on Alpine JS - Small footprint and Vue JS inspired, like Tailwind for JavaScript
-   100% Tailwind CSS - Rapidly build modern websites without leaving your HTML

## Install

**From npm:** Install the package.

```bash

# Install using npm

npm install --save-dev @markusantonwolf/ta-gallery

# Install using yarn

yarn add -D @markusantonwolf/ta-gallery
```

**Inside tailwind.config.js:** Add the plugin to your tailwind css config file.

```js
// tailwind.config.js

const ta_gallery_safelist = require('./node_modules/@markusantonwolf/ta-gallery/src/plugin/safelist')

module.exports = {
    purge: {
        // ...
        options: {
            safelist: [...ta_gallery_safelist],
        },
        // ...
    },
    // ...
    theme: {
        // ...
        taGallery: {
            animations: ['swing', 'swipe', 'slide', 'rotate', 'snake', 'window', 'scroll', 'fade', 'dynamic'],
            animation_default: 'slide', // default value
            aspect_ratios: [
                // all aspect ratios
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
                {
                    instagram: 3 / 5, // add your own aspect ratio
                },
            ],
        },
        // ...
    },
    // ...
    variants: {
        // ...
        taGallery: ['responsive'], // default value
        extend: {
            // ...
        },
    },
    // ...
    plugins: [
        require('@markusantonwolf/ta-gallery')({
            respectPrefix: true, // respect prefix option in config: true (default) | false
            respectImportant: true, // respect important option in config: true (default) | false
        }),
    ],
}
```

## More TA-Styled-Plugins

-   [TA-Styled-Plugins](https://ta-styled-plugins.com/) - Explore all Tailwind CSS and Alpine JS styled plugins and learn how to enhance your website fast and easy.

## Local development

```bash
// To install dev dependencies run:

npm install

// To start the development server run and go to http://localhost:8888/:

npm run serve

// To make a development build run:

npm run develop

// To make a production build run:

npm run build
```

## Licence

TA-Gallery is released under the [MIT license](https://github.com/markusantonwolf/ta-gallery/blob/master/licence.md) & supports modern environments.

## Copyright

© 2021 Markus A. Wolf
<https://www.markusantonwolf.com>

<p>
<img src="./public/img/logo-ta-styled-plugins.png" width="160px" style="display:block;padding-top:4rem;" />
</p>
