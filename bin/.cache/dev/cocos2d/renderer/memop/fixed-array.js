
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/fixed-array.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _timsort = _interopRequireDefault(require("./timsort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FixedArray = /*#__PURE__*/function () {
  function FixedArray(size) {
    this._count = 0;
    this._data = new Array(size);
  }

  var _proto = FixedArray.prototype;

  _proto._resize = function _resize(size) {
    if (size > this._data.length) {
      for (var i = this._data.length; i < size; ++i) {
        this._data[i] = undefined;
      }
    }
  };

  _proto.reset = function reset() {
    for (var i = 0; i < this._count; ++i) {
      this._data[i] = undefined;
    }

    this._count = 0;
  };

  _proto.push = function push(val) {
    if (this._count >= this._data.length) {
      this._resize(this._data.length * 2);
    }

    this._data[this._count] = val;
    ++this._count;
  };

  _proto.pop = function pop() {
    --this._count;

    if (this._count < 0) {
      this._count = 0;
    }

    var ret = this._data[this._count];
    this._data[this._count] = undefined;
    return ret;
  };

  _proto.fastRemove = function fastRemove(idx) {
    if (idx >= this._count || idx < 0) {
      return;
    }

    var last = this._count - 1;
    this._data[idx] = this._data[last];
    this._data[last] = undefined;
    this._count -= 1;
  };

  _proto.indexOf = function indexOf(val) {
    return this._data.indexOf(val);
  };

  _proto.sort = function sort(cmp) {
    return (0, _timsort["default"])(this._data, 0, this._count, cmp);
  };

  _createClass(FixedArray, [{
    key: "length",
    get: function get() {
      return this._count;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);

  return FixedArray;
}();

exports["default"] = FixedArray;
module.exports = exports["default"];
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxcZml4ZWQtYXJyYXkuanMiXSwibmFtZXMiOlsiRml4ZWRBcnJheSIsInNpemUiLCJfY291bnQiLCJfZGF0YSIsIkFycmF5IiwiX3Jlc2l6ZSIsImxlbmd0aCIsImkiLCJ1bmRlZmluZWQiLCJyZXNldCIsInB1c2giLCJ2YWwiLCJwb3AiLCJyZXQiLCJmYXN0UmVtb3ZlIiwiaWR4IiwibGFzdCIsImluZGV4T2YiLCJzb3J0IiwiY21wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQTtBQUNuQixzQkFBWUMsSUFBWixFQUFrQjtBQUNoQixTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxLQUFKLENBQVVILElBQVYsQ0FBYjtBQUNEOzs7O1NBRURJLFVBQUEsaUJBQVFKLElBQVIsRUFBYztBQUNaLFFBQUlBLElBQUksR0FBRyxLQUFLRSxLQUFMLENBQVdHLE1BQXRCLEVBQThCO0FBQzVCLFdBQUssSUFBSUMsQ0FBQyxHQUFHLEtBQUtKLEtBQUwsQ0FBV0csTUFBeEIsRUFBZ0NDLENBQUMsR0FBR04sSUFBcEMsRUFBMEMsRUFBRU0sQ0FBNUMsRUFBK0M7QUFDN0MsYUFBS0osS0FBTCxDQUFXSSxDQUFYLElBQWdCQyxTQUFoQjtBQUNEO0FBQ0Y7QUFDRjs7U0FVREMsUUFBQSxpQkFBUTtBQUNOLFNBQUssSUFBSUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLTCxNQUF6QixFQUFpQyxFQUFFSyxDQUFuQyxFQUFzQztBQUNwQyxXQUFLSixLQUFMLENBQVdJLENBQVgsSUFBZ0JDLFNBQWhCO0FBQ0Q7O0FBRUQsU0FBS04sTUFBTCxHQUFjLENBQWQ7QUFDRDs7U0FFRFEsT0FBQSxjQUFLQyxHQUFMLEVBQVU7QUFDUixRQUFJLEtBQUtULE1BQUwsSUFBZSxLQUFLQyxLQUFMLENBQVdHLE1BQTlCLEVBQXNDO0FBQ3BDLFdBQUtELE9BQUwsQ0FBYSxLQUFLRixLQUFMLENBQVdHLE1BQVgsR0FBb0IsQ0FBakM7QUFDRDs7QUFFRCxTQUFLSCxLQUFMLENBQVcsS0FBS0QsTUFBaEIsSUFBMEJTLEdBQTFCO0FBQ0EsTUFBRSxLQUFLVCxNQUFQO0FBQ0Q7O1NBRURVLE1BQUEsZUFBTTtBQUNKLE1BQUUsS0FBS1YsTUFBUDs7QUFFQSxRQUFJLEtBQUtBLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUNuQixXQUFLQSxNQUFMLEdBQWMsQ0FBZDtBQUNEOztBQUVELFFBQUlXLEdBQUcsR0FBRyxLQUFLVixLQUFMLENBQVcsS0FBS0QsTUFBaEIsQ0FBVjtBQUNBLFNBQUtDLEtBQUwsQ0FBVyxLQUFLRCxNQUFoQixJQUEwQk0sU0FBMUI7QUFFQSxXQUFPSyxHQUFQO0FBQ0Q7O1NBRURDLGFBQUEsb0JBQVdDLEdBQVgsRUFBZ0I7QUFDZCxRQUFJQSxHQUFHLElBQUksS0FBS2IsTUFBWixJQUFzQmEsR0FBRyxHQUFHLENBQWhDLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQsUUFBSUMsSUFBSSxHQUFHLEtBQUtkLE1BQUwsR0FBYyxDQUF6QjtBQUNBLFNBQUtDLEtBQUwsQ0FBV1ksR0FBWCxJQUFrQixLQUFLWixLQUFMLENBQVdhLElBQVgsQ0FBbEI7QUFDQSxTQUFLYixLQUFMLENBQVdhLElBQVgsSUFBbUJSLFNBQW5CO0FBQ0EsU0FBS04sTUFBTCxJQUFlLENBQWY7QUFDRDs7U0FFRGUsVUFBQSxpQkFBUU4sR0FBUixFQUFhO0FBQ1gsV0FBTyxLQUFLUixLQUFMLENBQVdjLE9BQVgsQ0FBbUJOLEdBQW5CLENBQVA7QUFDRDs7U0FFRE8sT0FBQSxjQUFLQyxHQUFMLEVBQVU7QUFDUixXQUFPLHlCQUFLLEtBQUtoQixLQUFWLEVBQWlCLENBQWpCLEVBQW9CLEtBQUtELE1BQXpCLEVBQWlDaUIsR0FBakMsQ0FBUDtBQUNEOzs7O1NBdkRELGVBQWE7QUFDWCxhQUFPLEtBQUtqQixNQUFaO0FBQ0Q7OztTQUVELGVBQVc7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzb3J0IGZyb20gJy4vdGltc29ydCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXhlZEFycmF5IHtcclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgICB0aGlzLl9kYXRhID0gbmV3IEFycmF5KHNpemUpO1xyXG4gIH1cclxuXHJcbiAgX3Jlc2l6ZShzaXplKSB7XHJcbiAgICBpZiAoc2l6ZSA+IHRoaXMuX2RhdGEubGVuZ3RoKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9kYXRhLmxlbmd0aDsgaSA8IHNpemU7ICsraSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGFbaV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBsZW5ndGgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY291bnQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0YSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdW50OyArK2kpIHtcclxuICAgICAgdGhpcy5fZGF0YVtpXSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgfVxyXG5cclxuICBwdXNoKHZhbCkge1xyXG4gICAgaWYgKHRoaXMuX2NvdW50ID49IHRoaXMuX2RhdGEubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX3Jlc2l6ZSh0aGlzLl9kYXRhLmxlbmd0aCAqIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGFbdGhpcy5fY291bnRdID0gdmFsO1xyXG4gICAgKyt0aGlzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIHBvcCgpIHtcclxuICAgIC0tdGhpcy5fY291bnQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvdW50IDwgMCkge1xyXG4gICAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJldCA9IHRoaXMuX2RhdGFbdGhpcy5fY291bnRdO1xyXG4gICAgdGhpcy5fZGF0YVt0aGlzLl9jb3VudF0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIGZhc3RSZW1vdmUoaWR4KSB7XHJcbiAgICBpZiAoaWR4ID49IHRoaXMuX2NvdW50IHx8IGlkeCA8IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsYXN0ID0gdGhpcy5fY291bnQgLSAxO1xyXG4gICAgdGhpcy5fZGF0YVtpZHhdID0gdGhpcy5fZGF0YVtsYXN0XTtcclxuICAgIHRoaXMuX2RhdGFbbGFzdF0gPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLl9jb3VudCAtPSAxO1xyXG4gIH1cclxuXHJcbiAgaW5kZXhPZih2YWwpIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhLmluZGV4T2YodmFsKTtcclxuICB9XHJcblxyXG4gIHNvcnQoY21wKSB7XHJcbiAgICByZXR1cm4gc29ydCh0aGlzLl9kYXRhLCAwLCB0aGlzLl9jb3VudCwgY21wKTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==