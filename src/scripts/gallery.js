function gallery() {
  return {
    last: 0,
    active: 0,
    default: {
      item: 'gallery__item',
      hidden: 'gallery__item--hidden',
      left_in: 'gallery__anim-left-in',
      left_out: 'gallery__anim-left-out',
      right_in: 'gallery__anim-right-in',
      right_out: 'gallery__anim-right-out',
      lazy: 'gallery__image--lazy',
      index: 0,
    },
    elements: [],
    init(values) {
      if (typeof values !== 'undefined') {
        for (let [key, value] of Object.entries(values)) {
          this.default[key] = value
        }
      }

      // like super on react 😃
      var self = this
      var el = this.$el

      var ref_obj = null
      var ref_types = ['height', 'width', 'size']
      var ref_type = ''
      ref_types.forEach(function (item) {
        if (typeof self.$refs[item] !== 'undefined') {
          ref_obj = self.$refs[item].querySelector('img')
          ref_type = item
        }
      })

      // get all items inside the gallery
      var items = this.$el.querySelectorAll('.' + this.default.item)

      // walk through every element and create a virtual image for onload
      items.forEach((item) => {
        this.elements.push(item)

        // define image inside of item
        var image = item.querySelector('img')
        if (image === null) {
          return false
        }

        // check if the image uses lazy loading
        var isLazy = false
        if (image.classList.contains(this.default.lazy) && typeof image.dataset.src !== 'undefined') {
          isLazy = true
        }

        // virtual image
        var image_virtual = new Image()
        image_virtual.onload = function () {
          if (isLazy) {
            image.classList.remove(self.default.lazy)
            image.src = image_virtual.src
          }
          var aspect_ratio = image_virtual.naturalWidth / image_virtual.naturalHeight
          if (ref_obj !== null) {
            if (ref_obj.src === image.src) {
              if (ref_type === 'height') {
                el.style.setProperty('--gallery_height', image_virtual.height + 'px')
              } else if (ref_type === 'width') {
                el.style.setProperty('--gallery_width', image_virtual.width + 'px')
                el.style.setProperty('--gallery_height', Math.floor(image.width / aspect_ratio) + 'px')
              } else if (ref_type === 'size') {
                el.style.setProperty('--gallery_width', image_virtual.width + 'px')
                el.style.setProperty('--gallery_height', image_virtual.height + 'px')
              }
            }
          }
        }

        // set the image src for the virtual image
        if (isLazy) {
          image_virtual.src = image.dataset.src
        } else {
          image_virtual.src = image.src
        }
      })
      this.elements[0].classList.remove(this.default.hidden)
    },
    next() {
      this.last = this.active
      if (this.elements.length > this.active + 1) {
        this.active++
      } else {
        this.active = 0
      }
      var left_remove = [this.default.left_out, this.default.left_in]
      this.elements[this.active].classList.remove(
        this.default.left_out,
        this.default.left_in,
        this.default.right_out,
        this.default.hidden
      )
      this.elements[this.active].classList.add(this.default.right_in)
      this.elements[this.last].classList.add(this.default.right_out, this.default.hidden)
      this.elements[this.last].classList.remove(this.default.left_out, this.default.left_in, this.default.right_in)
    },
    previous() {
      this.last = this.active
      if (this.active - 1 >= 0) {
        this.active--
      } else {
        this.active = this.elements.length - 1
      }
      this.elements[this.active].classList.remove(
        this.default.right_in,
        this.default.right_out,
        this.default.left_out,
        this.default.hidden
      )
      this.elements[this.active].classList.add(this.default.left_in)
      this.elements[this.last].classList.add(this.default.hidden, this.default.left_out)
      this.elements[this.last].classList.remove(this.default.right_in, this.default.right_out, this.default.left_in)
    },
  }
}
