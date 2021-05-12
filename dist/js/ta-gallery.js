"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.taGallery = function () {
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
      lo: 'ta-gallery-anim-left-out'
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
      pauseonhover: true
    },
    elements: [],
    init: function init(values) {
      var _this = this;

      if (typeof values !== 'undefined') {
        for (var _i = 0, _Object$entries = Object.entries(values); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          this.options[key] = value;
        }
      } // checks if options are defined by data


      for (var _i2 = 0, _Object$entries2 = Object.entries(this.$el.dataset); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            _key = _Object$entries2$_i[0],
            _value = _Object$entries2$_i[1];

        if (typeof this.options[_key] !== 'undefined') {
          this.options[_key] = _value;
        }
      }

      this.options.start = parseInt(this.options.start);

      if (this.options.start > 0) {
        this.options.start -= 1;
      }

      this.options.automatically = String(this.options.automatically).toLowerCase() === 'true';
      this.options.pauseonhover = String(this.options.pauseonhover).toLowerCase() === 'true';
      this.options.timing = parseInt(this.options.timing);
      this.setDuration(this.options.duration);
      this.setOrigin(this.options.origin);
      this.setTiming(this.options.timing);

      if (this.$el.classList.contains(this.options.size) && this.options.minHeight != 'false') {
        this.setMinHeight(this.options.minHeight);
      }

      var ref_obj = null;
      var ref_types = ['height', 'width', 'size'];
      var ref_type = '';
      var count_loaded = 0;
      ref_types.forEach(function (item) {
        if (typeof _this.$refs[item] !== 'undefined') {
          ref_type = item;
          ref_obj = _this.$refs[item];

          if (_this.$refs[item].nodeName !== 'IMG') {
            ref_obj = _this.$refs[item].querySelector('img');
          }

          return;
        }
      }); // if size defined image is not part of elements
      // set onload and resize after loaded

      if (ref_obj !== null) {
        if (!ref_obj.classList.contains(this.options.item)) {
          var ref_image_virtual = new Image();
          ref_image_virtual.src = ref_obj.src;

          ref_image_virtual.onload = function (event) {
            _this.setSize(ref_type, event.target);
          };
        }
      } // get all items inside the gallery


      var items = this.$el.querySelectorAll('.' + this.options.item); // walk through every element and create a virtual image for onload

      items.forEach(function (item) {
        _this.elements.push(item); // define image inside of item


        var image = item.querySelector('img');

        if (image === null) {
          count_loaded++;

          if (count_loaded >= _this.elements.length) {
            _this.loaded = true;
          }

          return;
        } // check if the image uses lazy loading


        var isLazy = false;

        if (image.classList.contains(_this.options.lazy) && typeof image.dataset.src !== 'undefined') {
          isLazy = true;

          _this.setMinHeight(_this.options.minHeight);
        } // virtual image


        var image_virtual = new Image();

        image_virtual.onload = function (event) {
          // count the amount of images that are loaded and if
          // all images are loaded set param to true
          count_loaded++;

          if (count_loaded >= _this.elements.length) {
            _this.loaded = true;
          }

          var image_source = event.target.src;

          if (isLazy) {
            setTimeout(function (event) {
              image.classList.remove(_this.options.lazy);
              image.src = image_source;
            }, 0);
          }

          if (ref_obj !== null) {
            if (ref_obj.src === image_source) {
              _this.setSize(ref_type, event.target);
            }
          }
        }; // set the image src for the virtual image


        if (isLazy) {
          image_virtual.src = image.dataset.src;
        } else {
          image_virtual.src = image.src;
        } // remove animation classes after animation ended
        // important to have a borderless animation experience


        item.addEventListener('animationend', function (event) {
          var splited = event.animationName.split('-');
          splited[2] = 'anim';
          event.target.classList.remove(splited.join('-'));
        });
      });
      this.elements[this.options.start].classList.add(this.options.active);
      this.active_slide = this.options.start;
      this.previous_slide = this.getPrevious();
      this.next_slide = this.getNext();

      if (this.options.autoplay) {
        this.setAutoplay();
      }

      this.$watch('modal', function (value) {
        var event_name = 'ta-gallery-modal-hide';
        var event_object = {
          show: hide,
          index: _this.active_slide,
          src: _this.elements[_this.active_slide].src
        };

        if (value === true) {
          event_name = 'ta-gallery-modal-show';
          event_object.show = true;
        }

        var event = new CustomEvent(event_name, {
          detail: event_object
        });
        window.dispatchEvent(event);
      });
    },
    next: function next() {
      this.previous_slide = this.active_slide;
      this.active_slide = this.getNext();
      this.next_slide = this.getNext();
      this.elements[this.active_slide].classList.remove(this.class_names.lo, this.class_names.li, this.class_names.ro);
      this.elements[this.active_slide].classList.toggle(this.options.active);
      this.elements[this.previous_slide].classList.toggle(this.options.active);
      this.elements[this.active_slide].classList.add(this.class_names.ri);
      this.elements[this.previous_slide].classList.add(this.class_names.ro);
      this.elements[this.previous_slide].classList.remove(this.class_names.lo, this.class_names.li, this.class_names.ri);
      this.timing = 0;
    },
    previous: function previous() {
      this.previous_slide = this.active_slide;
      this.active_slide = this.getPrevious();
      this.next_slide = this.getNext();
      this.elements[this.active_slide].classList.remove(this.class_names.ri, this.class_names.ro, this.class_names.lo);
      this.elements[this.active_slide].classList.toggle(this.options.active);
      this.elements[this.previous_slide].classList.toggle(this.options.active);
      this.elements[this.active_slide].classList.add(this.class_names.li);
      this.elements[this.previous_slide].classList.add(this.class_names.lo);
      this.elements[this.previous_slide].classList.remove(this.class_names.ri, this.class_names.ro, this.class_names.li);
      this.timing = 0;
    },
    stop: function stop() {
      clearInterval(this.interval);
    },
    pause: function pause() {
      this.autoplay = false;
    },
    resume: function resume() {
      this.autoplay = true;
    },
    togglePlay: function togglePlay() {
      this.autoplay = !this.autoplay;
    },
    toggleModal: function toggleModal() {
      this.modal = !this.modal;
    },
    getNext: function getNext() {
      if (this.elements.length > this.active_slide + 1) {
        return this.active_slide + 1;
      }

      return 0;
    },
    getPrevious: function getPrevious() {
      if (this.active_slide - 1 >= 0) {
        return this.active_slide - 1;
      }

      return this.elements.length - 1;
    },
    focusIsChild: function focusIsChild() {
      return this.$el.contains(document.activeElement);
    },
    setMinHeight: function setMinHeight(min_height) {
      this.$el.style.setProperty('--ta-gallery-min-height', min_height);
    },
    setDuration: function setDuration(duration) {
      this.$el.style.setProperty('--ta-gallery-anim-duration', duration);
    },
    setOrigin: function setOrigin(origin) {
      this.$el.style.setProperty('--ta-gallery-anim-origin', origin);
    },
    setTiming: function setTiming(timing) {
      this.$el.style.setProperty('--ta-gallery-anim-timing', timing);
    },
    setSize: function setSize(ref_type, image) {
      var aspect_ratio = image.naturalWidth / image.naturalHeight;

      if (ref_type === 'height') {
        this.$el.style.setProperty('--ta-gallery-height', image.height + 'px');
      } else if (ref_type === 'width') {
        this.$el.style.setProperty('--ta-gallery-width', image.width + 'px');
        this.$el.style.setProperty('--ta-gallery-height', Math.floor(image.width / aspect_ratio) + 'px');
      } else if (ref_type === 'size') {
        this.$el.style.setProperty('--ta-gallery-width', image.width + 'px');
        this.$el.style.setProperty('--ta-gallery-height', image.height + 'px');
      }
    },
    setAutoplay: function setAutoplay() {
      var _this2 = this;

      this.autoplay = true;
      this.interval = setInterval(function () {
        if (_this2.autoplay === false) {
          return;
        }

        _this2.timing += 1000;

        if (_this2.timing >= _this2.options.interval) {
          _this2.timing = 0;

          _this2.next();
        }
      }, 1000);

      if (this.options.pauseonhover) {
        this.$el.addEventListener('mouseover', function () {
          _this2.autoplay = false;
        });
        this.$el.addEventListener('mouseout', function () {
          if (!_this2.focusIsChild()) {
            _this2.autoplay = true;
          }
        });
      }

      window.addEventListener('focus', function () {
        if (!_this2.focusIsChild()) {
          _this2.autoplay = true;
        }
      });
      window.addEventListener('blur', function () {
        _this2.autoplay = false;
      });
    }
  };
};