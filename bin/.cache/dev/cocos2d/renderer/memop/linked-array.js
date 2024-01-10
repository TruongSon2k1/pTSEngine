
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/linked-array.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("./pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// NOTE: you must have `_prev` and `_next` field in the object returns by `fn`
var LinkedArray = /*#__PURE__*/function () {
  function LinkedArray(fn, size) {
    this._fn = fn;
    this._count = 0;
    this._head = null;
    this._tail = null;
    this._pool = new _pool["default"](fn, size);
  }

  var _proto = LinkedArray.prototype;

  _proto.add = function add() {
    var node = this._pool.alloc();

    if (!this._tail) {
      this._head = node;
    } else {
      this._tail._next = node;
      node._prev = this._tail;
    }

    this._tail = node;
    this._count += 1;
    return node;
  };

  _proto.remove = function remove(node) {
    if (node._prev) {
      node._prev._next = node._next;
    } else {
      this._head = node._next;
    }

    if (node._next) {
      node._next._prev = node._prev;
    } else {
      this._tail = node._prev;
    }

    node._next = null;
    node._prev = null;

    this._pool.free(node);

    this._count -= 1;
  };

  _proto.forEach = function forEach(fn, binder) {
    var cursor = this._head;

    if (!cursor) {
      return;
    }

    if (binder) {
      fn = fn.bind(binder);
    }

    var idx = 0;
    var next = cursor;

    while (cursor) {
      next = cursor._next;
      fn(cursor, idx, this);
      cursor = next;
      ++idx;
    }
  };

  _createClass(LinkedArray, [{
    key: "head",
    get: function get() {
      return this._head;
    }
  }, {
    key: "tail",
    get: function get() {
      return this._tail;
    }
  }, {
    key: "length",
    get: function get() {
      return this._count;
    }
  }]);

  return LinkedArray;
}();

exports["default"] = LinkedArray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxcbGlua2VkLWFycmF5LmpzIl0sIm5hbWVzIjpbIkxpbmtlZEFycmF5IiwiZm4iLCJzaXplIiwiX2ZuIiwiX2NvdW50IiwiX2hlYWQiLCJfdGFpbCIsIl9wb29sIiwiUG9vbCIsImFkZCIsIm5vZGUiLCJhbGxvYyIsIl9uZXh0IiwiX3ByZXYiLCJyZW1vdmUiLCJmcmVlIiwiZm9yRWFjaCIsImJpbmRlciIsImN1cnNvciIsImJpbmQiLCJpZHgiLCJuZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7SUFFcUJBO0FBQ25CLHVCQUFZQyxFQUFaLEVBQWdCQyxJQUFoQixFQUFzQjtBQUNwQixTQUFLQyxHQUFMLEdBQVdGLEVBQVg7QUFDQSxTQUFLRyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7QUFFQSxTQUFLQyxLQUFMLEdBQWEsSUFBSUMsZ0JBQUosQ0FBU1AsRUFBVCxFQUFhQyxJQUFiLENBQWI7QUFDRDs7OztTQWNETyxNQUFBLGVBQU07QUFDSixRQUFJQyxJQUFJLEdBQUcsS0FBS0gsS0FBTCxDQUFXSSxLQUFYLEVBQVg7O0FBRUEsUUFBSSxDQUFDLEtBQUtMLEtBQVYsRUFBaUI7QUFDZixXQUFLRCxLQUFMLEdBQWFLLElBQWI7QUFDRCxLQUZELE1BRU87QUFDTCxXQUFLSixLQUFMLENBQVdNLEtBQVgsR0FBbUJGLElBQW5CO0FBQ0FBLE1BQUFBLElBQUksQ0FBQ0csS0FBTCxHQUFhLEtBQUtQLEtBQWxCO0FBQ0Q7O0FBQ0QsU0FBS0EsS0FBTCxHQUFhSSxJQUFiO0FBQ0EsU0FBS04sTUFBTCxJQUFlLENBQWY7QUFFQSxXQUFPTSxJQUFQO0FBQ0Q7O1NBRURJLFNBQUEsZ0JBQU9KLElBQVAsRUFBYTtBQUNYLFFBQUlBLElBQUksQ0FBQ0csS0FBVCxFQUFnQjtBQUNkSCxNQUFBQSxJQUFJLENBQUNHLEtBQUwsQ0FBV0QsS0FBWCxHQUFtQkYsSUFBSSxDQUFDRSxLQUF4QjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtQLEtBQUwsR0FBYUssSUFBSSxDQUFDRSxLQUFsQjtBQUNEOztBQUVELFFBQUlGLElBQUksQ0FBQ0UsS0FBVCxFQUFnQjtBQUNkRixNQUFBQSxJQUFJLENBQUNFLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQkgsSUFBSSxDQUFDRyxLQUF4QjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtQLEtBQUwsR0FBYUksSUFBSSxDQUFDRyxLQUFsQjtBQUNEOztBQUVESCxJQUFBQSxJQUFJLENBQUNFLEtBQUwsR0FBYSxJQUFiO0FBQ0FGLElBQUFBLElBQUksQ0FBQ0csS0FBTCxHQUFhLElBQWI7O0FBQ0EsU0FBS04sS0FBTCxDQUFXUSxJQUFYLENBQWdCTCxJQUFoQjs7QUFDQSxTQUFLTixNQUFMLElBQWUsQ0FBZjtBQUNEOztTQUVEWSxVQUFBLGlCQUFRZixFQUFSLEVBQVlnQixNQUFaLEVBQW9CO0FBQ2xCLFFBQUlDLE1BQU0sR0FBRyxLQUFLYixLQUFsQjs7QUFDQSxRQUFJLENBQUNhLE1BQUwsRUFBYTtBQUNYO0FBQ0Q7O0FBRUQsUUFBSUQsTUFBSixFQUFZO0FBQ1ZoQixNQUFBQSxFQUFFLEdBQUdBLEVBQUUsQ0FBQ2tCLElBQUgsQ0FBUUYsTUFBUixDQUFMO0FBQ0Q7O0FBRUQsUUFBSUcsR0FBRyxHQUFHLENBQVY7QUFDQSxRQUFJQyxJQUFJLEdBQUdILE1BQVg7O0FBRUEsV0FBT0EsTUFBUCxFQUFlO0FBQ2JHLE1BQUFBLElBQUksR0FBR0gsTUFBTSxDQUFDTixLQUFkO0FBQ0FYLE1BQUFBLEVBQUUsQ0FBQ2lCLE1BQUQsRUFBU0UsR0FBVCxFQUFjLElBQWQsQ0FBRjtBQUVBRixNQUFBQSxNQUFNLEdBQUdHLElBQVQ7QUFDQSxRQUFFRCxHQUFGO0FBQ0Q7QUFDRjs7OztTQWxFRCxlQUFXO0FBQ1QsYUFBTyxLQUFLZixLQUFaO0FBQ0Q7OztTQUVELGVBQVc7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRDs7O1NBRUQsZUFBYTtBQUNYLGFBQU8sS0FBS0YsTUFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvb2wgZnJvbSAnLi9wb29sJztcclxuXHJcbi8vIE5PVEU6IHlvdSBtdXN0IGhhdmUgYF9wcmV2YCBhbmQgYF9uZXh0YCBmaWVsZCBpbiB0aGUgb2JqZWN0IHJldHVybnMgYnkgYGZuYFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkQXJyYXkge1xyXG4gIGNvbnN0cnVjdG9yKGZuLCBzaXplKSB7XHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG4gICAgdGhpcy5fY291bnQgPSAwO1xyXG4gICAgdGhpcy5faGVhZCA9IG51bGw7XHJcbiAgICB0aGlzLl90YWlsID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9wb29sID0gbmV3IFBvb2woZm4sIHNpemUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhlYWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faGVhZDtcclxuICB9XHJcblxyXG4gIGdldCB0YWlsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RhaWw7XHJcbiAgfVxyXG5cclxuICBnZXQgbGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gIH1cclxuXHJcbiAgYWRkKCkge1xyXG4gICAgbGV0IG5vZGUgPSB0aGlzLl9wb29sLmFsbG9jKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl90YWlsKSB7XHJcbiAgICAgIHRoaXMuX2hlYWQgPSBub2RlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fdGFpbC5fbmV4dCA9IG5vZGU7XHJcbiAgICAgIG5vZGUuX3ByZXYgPSB0aGlzLl90YWlsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fdGFpbCA9IG5vZGU7XHJcbiAgICB0aGlzLl9jb3VudCArPSAxO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKG5vZGUpIHtcclxuICAgIGlmIChub2RlLl9wcmV2KSB7XHJcbiAgICAgIG5vZGUuX3ByZXYuX25leHQgPSBub2RlLl9uZXh0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5faGVhZCA9IG5vZGUuX25leHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vZGUuX25leHQpIHtcclxuICAgICAgbm9kZS5fbmV4dC5fcHJldiA9IG5vZGUuX3ByZXY7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl90YWlsID0gbm9kZS5fcHJldjtcclxuICAgIH1cclxuXHJcbiAgICBub2RlLl9uZXh0ID0gbnVsbDtcclxuICAgIG5vZGUuX3ByZXYgPSBudWxsO1xyXG4gICAgdGhpcy5fcG9vbC5mcmVlKG5vZGUpO1xyXG4gICAgdGhpcy5fY291bnQgLT0gMTtcclxuICB9XHJcblxyXG4gIGZvckVhY2goZm4sIGJpbmRlcikge1xyXG4gICAgbGV0IGN1cnNvciA9IHRoaXMuX2hlYWQ7XHJcbiAgICBpZiAoIWN1cnNvcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJpbmRlcikge1xyXG4gICAgICBmbiA9IGZuLmJpbmQoYmluZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaWR4ID0gMDtcclxuICAgIGxldCBuZXh0ID0gY3Vyc29yO1xyXG5cclxuICAgIHdoaWxlIChjdXJzb3IpIHtcclxuICAgICAgbmV4dCA9IGN1cnNvci5fbmV4dDtcclxuICAgICAgZm4oY3Vyc29yLCBpZHgsIHRoaXMpO1xyXG5cclxuICAgICAgY3Vyc29yID0gbmV4dDtcclxuICAgICAgKytpZHg7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=