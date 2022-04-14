window.taGallery = () => {
    return {
        previous_slide: 0,
        active_slide: 0,
        next_slide: 0,
        loaded: false,
        modal: false,
        timing: 0,
        interval: false,
        autoplay: false,
        class_names: {
            ri: 'ta-gallery-anim-right-in',
            ro: 'ta-gallery-anim-right-out',
            li: 'ta-gallery-anim-left-in',
            lo: 'ta-gallery-anim-left-out',
        },
        options: {
            item: 'ta-gallery-element',
            size: 'ta-gallery-size',
            active: 'ta-gallery-element-active',
            lazy: 'ta-gallery-image-lazy',
            minHeight: '10rem',
            start: 0,
            duration: '0.3s',
            origin: 'center center',
            timing: 'ease-in-out',
            autoplay: false,
            interval: 5000,
            pauseonhover: true,
        },
        elements: [],
        init(values) {
            if (typeof values !== 'undefined') {
                for (let [key, value] of Object.entries(values)) {
                    this.options[key] = value
                }
            }

            // checks if options are defined by data
            for (let [key, value] of Object.entries(this.$el.dataset)) {
                if (typeof this.options[key] !== 'undefined') {
                    this.options[key] = value
                }
            }

            this.options.start = parseInt(this.options.start)
            if (this.options.start > 0) {
                this.options.start -= 1
            }

            this.options.automatically = String(this.options.automatically).toLowerCase() === 'true'
            this.options.pauseonhover = String(this.options.pauseonhover).toLowerCase() === 'true'
            this.options.timing = parseInt(this.options.timing)

            this.setDuration(this.options.duration)
            this.setOrigin(this.options.origin)
            this.setTiming(this.options.timing)

            if (this.$el.classList.contains(this.options.size) && this.options.minHeight != 'false') {
                this.setMinHeight(this.options.minHeight)
            }

            var ref_obj = null
            var ref_types = ['height', 'width', 'size']
            var ref_type = ''
            var count_loaded = 0

            ref_types.forEach((item) => {
                if (typeof this.$refs[item] !== 'undefined') {
                    ref_type = item
                    ref_obj = this.$refs[item]
                    if (this.$refs[item].nodeName !== 'IMG') {
                        ref_obj = this.$refs[item].querySelector('img')
                    }
                    return
                }
            })

            // if size defined image is not part of elements
            // set onload and resize after loaded
            if (ref_obj !== null) {
                if (!ref_obj.classList.contains(this.options.item)) {
                    var ref_image_virtual = new Image()
                    ref_image_virtual.src = ref_obj.src
                    ref_image_virtual.onload = (event) => {
                        this.setSize(ref_type, event.target)
                    }
                }
            }

            // get all items inside the gallery
            var items = this.$el.querySelectorAll('.' + this.options.item)

            // walk through every element and create a virtual image for onload
            items.forEach((item) => {
                this.elements.push(item)

                // define image inside of item
                var image = item.querySelector('img')
                if (image === null) {
                    count_loaded++
                    if (count_loaded >= this.elements.length) {
                        this.loaded = true
                    }
                    return
                }

                // check if the image uses lazy loading
                var isLazy = false
                if (image.classList.contains(this.options.lazy) && typeof image.dataset.src !== 'undefined') {
                    isLazy = true
                    this.setMinHeight(this.options.minHeight)
                }

                // virtual image
                var image_virtual = new Image()
                image_virtual.onload = (event) => {
                    // count the amount of images that are loaded and if
                    // all images are loaded set param to true
                    count_loaded++
                    if (count_loaded >= this.elements.length) {
                        this.loaded = true
                    }

                    const image_source = event.target.src

                    if (isLazy) {
                        setTimeout((event) => {
                            image.classList.remove(this.options.lazy)
                            image.src = image_source
                        }, 0)
                    }

                    if (ref_obj !== null) {
                        if (ref_obj.src === image_source) {
                            this.setSize(ref_type, event.target)
                        }
                    }
                }

                // set the image src for the virtual image
                if (isLazy) {
                    image_virtual.src = image.dataset.src
                } else {
                    image_virtual.src = image.src
                }

                // remove animation classes after animation ended
                // important to have a borderless animation experience
                item.addEventListener('animationend', (event) => {
                    const splited = event.animationName.split('-')
                    splited[2] = 'anim'
                    event.target.classList.remove(splited.join('-'))
                })
            })
            this.elements[this.options.start].classList.add(this.options.active)
            this.active_slide = this.options.start
            this.previous_slide = this.getPrevious()
            this.next_slide = this.getNext()

            if (this.options.autoplay) {
                this.setAutoplay()
            }

            this.$watch('modal', (value) => {
                var event_name = 'ta-gallery-modal-hide'
                var event_object = {
                    show: false,
                    index: this.active_slide,
                    src: this.elements[this.active_slide].src,
                }
                if (value === true) {
                    event_name = 'ta-gallery-modal-show'
                    event_object.show = true
                }
                const event = new CustomEvent(event_name, { detail: event_object })
                window.dispatchEvent(event)
            })
        },
        next() {
            this.previous_slide = this.active_slide
            this.active_slide = this.getNext()
            this.next_slide = this.getNext()
            this.elements[this.active_slide].classList.remove(
                this.class_names.lo,
                this.class_names.li,
                this.class_names.ro
            )
            this.elements[this.active_slide].classList.toggle(this.options.active)
            this.elements[this.previous_slide].classList.toggle(this.options.active)
            this.elements[this.active_slide].classList.add(this.class_names.ri)
            this.elements[this.previous_slide].classList.add(this.class_names.ro)
            this.elements[this.previous_slide].classList.remove(
                this.class_names.lo,
                this.class_names.li,
                this.class_names.ri
            )
            this.timing = 0
        },
        previous() {
            this.previous_slide = this.active_slide
            this.active_slide = this.getPrevious()
            this.next_slide = this.getNext()
            this.elements[this.active_slide].classList.remove(
                this.class_names.ri,
                this.class_names.ro,
                this.class_names.lo
            )
            this.elements[this.active_slide].classList.toggle(this.options.active)
            this.elements[this.previous_slide].classList.toggle(this.options.active)
            this.elements[this.active_slide].classList.add(this.class_names.li)
            this.elements[this.previous_slide].classList.add(this.class_names.lo)
            this.elements[this.previous_slide].classList.remove(
                this.class_names.ri,
                this.class_names.ro,
                this.class_names.li
            )
            this.timing = 0
        },
        stop() {
            clearInterval(this.interval)
        },
        pause() {
            this.autoplay = false
        },
        resume() {
            this.autoplay = true
        },
        togglePlay() {
            this.autoplay = !this.autoplay
        },
        toggleModal() {
            this.modal = !this.modal
        },
        getNext() {
            if (this.elements.length > this.active_slide + 1) {
                return this.active_slide + 1
            }
            return 0
        },
        getPrevious() {
            if (this.active_slide - 1 >= 0) {
                return this.active_slide - 1
            }
            return this.elements.length - 1
        },
        focusIsChild() {
            return this.$el.contains(document.activeElement)
        },
        setMinHeight(min_height) {
            this.$el.style.setProperty('--ta-gallery-min-height', min_height)
        },
        setDuration(duration) {
            this.$el.style.setProperty('--ta-gallery-anim-duration', duration)
        },
        setOrigin(origin) {
            this.$el.style.setProperty('--ta-gallery-anim-origin', origin)
        },
        setTiming(timing) {
            this.$el.style.setProperty('--ta-gallery-anim-timing', timing)
        },
        setSize(ref_type, image) {
            var aspect_ratio = image.naturalWidth / image.naturalHeight
            if (ref_type === 'height') {
                this.$el.style.setProperty('--ta-gallery-height', image.height + 'px')
            } else if (ref_type === 'width') {
                this.$el.style.setProperty('--ta-gallery-width', image.width + 'px')
                this.$el.style.setProperty('--ta-gallery-height', Math.floor(image.width / aspect_ratio) + 'px')
            } else if (ref_type === 'size') {
                this.$el.style.setProperty('--ta-gallery-width', image.width + 'px')
                this.$el.style.setProperty('--ta-gallery-height', image.height + 'px')
            }
        },
        setAutoplay() {
            this.autoplay = true
            this.interval = setInterval(() => {
                if (this.autoplay === false) {
                    return
                }
                this.timing += 1000
                if (this.timing >= this.options.interval) {
                    this.timing = 0
                    this.next()
                }
            }, 1000)
            if (this.options.pauseonhover) {
                this.$el.addEventListener('mouseover', () => {
                    this.autoplay = false
                })
                this.$el.addEventListener('mouseout', () => {
                    if (!this.focusIsChild()) {
                        this.autoplay = true
                    }
                })
            }
            window.addEventListener('focus', () => {
                if (!this.focusIsChild()) {
                    this.autoplay = true
                }
            })
            window.addEventListener('blur', () => {
                this.autoplay = false
            })
        },
    }
}
