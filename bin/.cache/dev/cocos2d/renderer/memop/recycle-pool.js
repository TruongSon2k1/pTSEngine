
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/recycle-pool.js';
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

/**
 * Recycle Pool
 * @class RecyclePool
 */
var RecyclePool = /*#__PURE__*/function () {
  function RecyclePool(fn, size) {
    this._fn = fn;
    this._count = 0;
    this._data = new Array(size);

    for (var i = 0; i < size; ++i) {
      this._data[i] = fn();
    }
  }

  var _proto = RecyclePool.prototype;

  _proto.reset = function reset() {
    this._count = 0;
  };

  _proto.resize = function resize(size) {
    if (size > this._data.length) {
      for (var i = this._data.length; i < size; ++i) {
        this._data[i] = this._fn();
      }
    }
  };

  _proto.add = function add() {
    if (this._count >= this._data.length) {
      this.resize(this._data.length * 2);
    }

    return this._data[this._count++];
  };

  _proto.remove = function remove(idx) {
    if (idx >= this._count) {
      return;
    }

    var last = this._count - 1;
    var tmp = this._data[idx];
    this._data[idx] = this._data[last];
    this._data[last] = tmp;
    this._count -= 1;
  };

  _proto.sort = function sort(cmp) {
    return (0, _timsort["default"])(this._data, 0, this._count, cmp);
  };

  _createClass(RecyclePool, [{
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

  return RecyclePool;
}();

exports["default"] = RecyclePool;
cc.RecyclePool = RecyclePool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxccmVjeWNsZS1wb29sLmpzIl0sIm5hbWVzIjpbIlJlY3ljbGVQb29sIiwiZm4iLCJzaXplIiwiX2ZuIiwiX2NvdW50IiwiX2RhdGEiLCJBcnJheSIsImkiLCJyZXNldCIsInJlc2l6ZSIsImxlbmd0aCIsImFkZCIsInJlbW92ZSIsImlkeCIsImxhc3QiLCJ0bXAiLCJzb3J0IiwiY21wIiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7QUFDbkIsdUJBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3BCLFNBQUtDLEdBQUwsR0FBV0YsRUFBWDtBQUNBLFNBQUtHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlDLEtBQUosQ0FBVUosSUFBVixDQUFiOztBQUVBLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0wsSUFBcEIsRUFBMEIsRUFBRUssQ0FBNUIsRUFBK0I7QUFDN0IsV0FBS0YsS0FBTCxDQUFXRSxDQUFYLElBQWdCTixFQUFFLEVBQWxCO0FBQ0Q7QUFDRjs7OztTQVVETyxRQUFBLGlCQUFRO0FBQ04sU0FBS0osTUFBTCxHQUFjLENBQWQ7QUFDRDs7U0FFREssU0FBQSxnQkFBT1AsSUFBUCxFQUFhO0FBQ1gsUUFBSUEsSUFBSSxHQUFHLEtBQUtHLEtBQUwsQ0FBV0ssTUFBdEIsRUFBOEI7QUFDNUIsV0FBSyxJQUFJSCxDQUFDLEdBQUcsS0FBS0YsS0FBTCxDQUFXSyxNQUF4QixFQUFnQ0gsQ0FBQyxHQUFHTCxJQUFwQyxFQUEwQyxFQUFFSyxDQUE1QyxFQUErQztBQUM3QyxhQUFLRixLQUFMLENBQVdFLENBQVgsSUFBZ0IsS0FBS0osR0FBTCxFQUFoQjtBQUNEO0FBQ0Y7QUFDRjs7U0FFRFEsTUFBQSxlQUFNO0FBQ0osUUFBSSxLQUFLUCxNQUFMLElBQWUsS0FBS0MsS0FBTCxDQUFXSyxNQUE5QixFQUFzQztBQUNwQyxXQUFLRCxNQUFMLENBQVksS0FBS0osS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQWhDO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLTCxLQUFMLENBQVcsS0FBS0QsTUFBTCxFQUFYLENBQVA7QUFDRDs7U0FFRFEsU0FBQSxnQkFBT0MsR0FBUCxFQUFZO0FBQ1YsUUFBSUEsR0FBRyxJQUFJLEtBQUtULE1BQWhCLEVBQXdCO0FBQ3RCO0FBQ0Q7O0FBRUQsUUFBSVUsSUFBSSxHQUFHLEtBQUtWLE1BQUwsR0FBYyxDQUF6QjtBQUNBLFFBQUlXLEdBQUcsR0FBRyxLQUFLVixLQUFMLENBQVdRLEdBQVgsQ0FBVjtBQUNBLFNBQUtSLEtBQUwsQ0FBV1EsR0FBWCxJQUFrQixLQUFLUixLQUFMLENBQVdTLElBQVgsQ0FBbEI7QUFDQSxTQUFLVCxLQUFMLENBQVdTLElBQVgsSUFBbUJDLEdBQW5CO0FBQ0EsU0FBS1gsTUFBTCxJQUFlLENBQWY7QUFDRDs7U0FFRFksT0FBQSxjQUFLQyxHQUFMLEVBQVU7QUFDUixXQUFPLHlCQUFLLEtBQUtaLEtBQVYsRUFBaUIsQ0FBakIsRUFBb0IsS0FBS0QsTUFBekIsRUFBaUNhLEdBQWpDLENBQVA7QUFDRDs7OztTQTFDRCxlQUFhO0FBQ1gsYUFBTyxLQUFLYixNQUFaO0FBQ0Q7OztTQUVELGVBQVc7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRDs7Ozs7OztBQXVDSGEsRUFBRSxDQUFDbEIsV0FBSCxHQUFpQkEsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc29ydCBmcm9tICcuL3RpbXNvcnQnO1xyXG5cclxuLyoqXHJcbiAqIFJlY3ljbGUgUG9vbFxyXG4gKiBAY2xhc3MgUmVjeWNsZVBvb2xcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3ljbGVQb29sIHtcclxuICBjb25zdHJ1Y3Rvcihmbiwgc2l6ZSkge1xyXG4gICAgdGhpcy5fZm4gPSBmbjtcclxuICAgIHRoaXMuX2NvdW50ID0gMDtcclxuICAgIHRoaXMuX2RhdGEgPSBuZXcgQXJyYXkoc2l6ZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcclxuICAgICAgdGhpcy5fZGF0YVtpXSA9IGZuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGEoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5fY291bnQgPSAwO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplKHNpemUpIHtcclxuICAgIGlmIChzaXplID4gdGhpcy5fZGF0YS5sZW5ndGgpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2RhdGEubGVuZ3RoOyBpIDwgc2l6ZTsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVtpXSA9IHRoaXMuX2ZuKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZCgpIHtcclxuICAgIGlmICh0aGlzLl9jb3VudCA+PSB0aGlzLl9kYXRhLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9kYXRhLmxlbmd0aCAqIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9kYXRhW3RoaXMuX2NvdW50KytdO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkeCkge1xyXG4gICAgaWYgKGlkeCA+PSB0aGlzLl9jb3VudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGxhc3QgPSB0aGlzLl9jb3VudCAtIDE7XHJcbiAgICBsZXQgdG1wID0gdGhpcy5fZGF0YVtpZHhdO1xyXG4gICAgdGhpcy5fZGF0YVtpZHhdID0gdGhpcy5fZGF0YVtsYXN0XTtcclxuICAgIHRoaXMuX2RhdGFbbGFzdF0gPSB0bXA7XHJcbiAgICB0aGlzLl9jb3VudCAtPSAxO1xyXG4gIH1cclxuXHJcbiAgc29ydChjbXApIHtcclxuICAgIHJldHVybiBzb3J0KHRoaXMuX2RhdGEsIDAsIHRoaXMuX2NvdW50LCBjbXApO1xyXG4gIH1cclxufVxyXG5cclxuY2MuUmVjeWNsZVBvb2wgPSBSZWN5Y2xlUG9vbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==