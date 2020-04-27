function gallery() {
  return {
    last: 0,
    active: 0,
    default: {
      item: 'gallery__item',
      hidden: 'gallery__hidden',
      left_in: 'gallery__anim-left-in',
      left_out: 'gallery__anim-left-out',
      right_in: 'gallery__anim-right-in',
      right_out: 'gallery__anim-right-out',
    },
    elements: [],
    init(values) {
      if (typeof values !== 'undefined') {
        for (let [key, value] of Object.entries(values)) {
          this.default[key] = value
        }
      }

      var el = this.$el
      var items = this.$el.querySelectorAll('.' + this.default.item)
      items.forEach((item) => {
        this.elements.push(item)
      })

      this.elements[0].classList.remove(this.default.hidden)

      // if (typeof this.$refs.size !== "undefined") {
      //   this.$refs.size.querySelector("img").onload = function (event) {
      //     el.style.setProperty(
      //       "--gallery_width",
      //       event.target.naturalWidth + "px"
      //     );
      //     el.style.setProperty(
      //       "--gallery_height",
      //       event.target.naturalHeight + "px"
      //     );
      //   };
      // }

      if (typeof this.$refs.height !== 'undefined') {
        this.setSize('height', this.$el)
      }
      if (typeof this.$refs.width !== 'undefined') {
        this.setSize('width', this.$el)
      }
      if (typeof this.$refs.size !== 'undefined') {
        this.setSize('size', this.$el)
      }

      // imagesLoaded(items[0], function (instance) {
      //   el.style.setProperty("--gallery_width", items[0].naturalWidth + "px");
      //   el.style.setProperty("--gallery_height", items[0].naturalHeight + "px");
      // });
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
    setSize(ref, el) {
      this.$refs[ref].querySelector('img').onload = function (event) {
        if (['width', 'size'].indexOf(ref) !== -1) {
          el.style.setProperty('--gallery_width', event.target.naturalWidth + 'px')
        }
        if (['height', 'size'].indexOf(ref) !== -1) {
          el.style.setProperty('--gallery_height', event.target.naturalHeight + 'px')
        }
      }
    },
  }
}
