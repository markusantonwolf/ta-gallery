"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function gallery() {
  return {
    last: 0,
    active: 0,
    "default": {
      item: 'gallery__item',
      hidden: 'gallery__hidden',
      left_in: 'gallery__anim-left-in',
      left_out: 'gallery__anim-left-out',
      right_in: 'gallery__anim-right-in',
      right_out: 'gallery__anim-right-out'
    },
    elements: [],
    init: function init(values) {
      var _this = this;

      if (typeof values !== 'undefined') {
        for (var _i = 0, _Object$entries = Object.entries(values); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          this["default"][key] = value;
        }
      }

      var el = this.$el;
      var items = this.$el.querySelectorAll('.' + this["default"].item);
      items.forEach(function (item) {
        _this.elements.push(item);
      });
      this.elements[0].classList.remove(this["default"].hidden); // if (typeof this.$refs.size !== "undefined") {
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
        this.setSize('height', this.$el);
      }

      if (typeof this.$refs.width !== 'undefined') {
        this.setSize('width', this.$el);
      }

      if (typeof this.$refs.size !== 'undefined') {
        this.setSize('size', this.$el);
      } // imagesLoaded(items[0], function (instance) {
      //   el.style.setProperty("--gallery_width", items[0].naturalWidth + "px");
      //   el.style.setProperty("--gallery_height", items[0].naturalHeight + "px");
      // });

    },
    next: function next() {
      this.last = this.active;

      if (this.elements.length > this.active + 1) {
        this.active++;
      } else {
        this.active = 0;
      }

      var left_remove = [this["default"].left_out, this["default"].left_in];
      this.elements[this.active].classList.remove(this["default"].left_out, this["default"].left_in, this["default"].right_out, this["default"].hidden);
      this.elements[this.active].classList.add(this["default"].right_in);
      this.elements[this.last].classList.add(this["default"].right_out, this["default"].hidden);
      this.elements[this.last].classList.remove(this["default"].left_out, this["default"].left_in, this["default"].right_in);
    },
    previous: function previous() {
      this.last = this.active;

      if (this.active - 1 >= 0) {
        this.active--;
      } else {
        this.active = this.elements.length - 1;
      }

      this.elements[this.active].classList.remove(this["default"].right_in, this["default"].right_out, this["default"].left_out, this["default"].hidden);
      this.elements[this.active].classList.add(this["default"].left_in);
      this.elements[this.last].classList.add(this["default"].hidden, this["default"].left_out);
      this.elements[this.last].classList.remove(this["default"].right_in, this["default"].right_out, this["default"].left_in);
    },
    setSize: function setSize(ref, el) {
      this.$refs[ref].querySelector('img').onload = function (event) {
        if (['width', 'size'].indexOf(ref) !== -1) {
          el.style.setProperty('--gallery_width', event.target.naturalWidth + 'px');
        }

        if (['height', 'size'].indexOf(ref) !== -1) {
          el.style.setProperty('--gallery_height', event.target.naturalHeight + 'px');
        }
      };
    }
  };
}