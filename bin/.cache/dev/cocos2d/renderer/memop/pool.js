
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var Pool = /*#__PURE__*/function () {
  function Pool(fn, size) {
    this._fn = fn;
    this._idx = size - 1;
    this._frees = new Array(size);

    for (var i = 0; i < size; ++i) {
      this._frees[i] = fn();
    }
  }

  var _proto = Pool.prototype;

  _proto._expand = function _expand(size) {
    var old = this._frees;
    this._frees = new Array(size);
    var len = size - old.length;

    for (var i = 0; i < len; ++i) {
      this._frees[i] = this._fn();
    }

    for (var _i = len, j = 0; _i < size; ++_i, ++j) {
      this._frees[_i] = old[j];
    }

    this._idx += len;
  };

  _proto.alloc = function alloc() {
    // create some more space (expand by 20%, minimum 1)
    if (this._idx < 0) {
      this._expand(Math.round(this._frees.length * 1.2) + 1);
    }

    var ret = this._frees[this._idx];
    this._frees[this._idx] = null;
    --this._idx;
    return ret;
  };

  _proto.free = function free(obj) {
    ++this._idx;
    this._frees[this._idx] = obj;
  }
  /**
   * 清除对象池。
   * @param fn 清除回调，对每个释放的对象调用一次。
   */
  ;

  _proto.clear = function clear(fn) {
    for (var i = 0; i <= this._idx; i++) {
      if (fn) {
        fn(this._frees[i]);
      }
    }

    this._frees.length = 0;
    this._idx = -1;
  };

  return Pool;
}();

exports["default"] = Pool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxccG9vbC5qcyJdLCJuYW1lcyI6WyJQb29sIiwiZm4iLCJzaXplIiwiX2ZuIiwiX2lkeCIsIl9mcmVlcyIsIkFycmF5IiwiaSIsIl9leHBhbmQiLCJvbGQiLCJsZW4iLCJsZW5ndGgiLCJqIiwiYWxsb2MiLCJNYXRoIiwicm91bmQiLCJyZXQiLCJmcmVlIiwib2JqIiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBO0FBQ25CLGdCQUFZQyxFQUFaLEVBQWdCQyxJQUFoQixFQUFzQjtBQUNwQixTQUFLQyxHQUFMLEdBQVdGLEVBQVg7QUFDQSxTQUFLRyxJQUFMLEdBQVlGLElBQUksR0FBRyxDQUFuQjtBQUNBLFNBQUtHLE1BQUwsR0FBYyxJQUFJQyxLQUFKLENBQVVKLElBQVYsQ0FBZDs7QUFFQSxTQUFLLElBQUlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdMLElBQXBCLEVBQTBCLEVBQUVLLENBQTVCLEVBQStCO0FBQzdCLFdBQUtGLE1BQUwsQ0FBWUUsQ0FBWixJQUFpQk4sRUFBRSxFQUFuQjtBQUNEO0FBQ0Y7Ozs7U0FFRE8sVUFBQSxpQkFBUU4sSUFBUixFQUFjO0FBQ1osUUFBSU8sR0FBRyxHQUFHLEtBQUtKLE1BQWY7QUFDQSxTQUFLQSxNQUFMLEdBQWMsSUFBSUMsS0FBSixDQUFVSixJQUFWLENBQWQ7QUFFQSxRQUFJUSxHQUFHLEdBQUdSLElBQUksR0FBR08sR0FBRyxDQUFDRSxNQUFyQjs7QUFDQSxTQUFLLElBQUlKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdHLEdBQXBCLEVBQXlCLEVBQUVILENBQTNCLEVBQThCO0FBQzVCLFdBQUtGLE1BQUwsQ0FBWUUsQ0FBWixJQUFpQixLQUFLSixHQUFMLEVBQWpCO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJSSxFQUFDLEdBQUdHLEdBQVIsRUFBYUUsQ0FBQyxHQUFHLENBQXRCLEVBQXlCTCxFQUFDLEdBQUdMLElBQTdCLEVBQW1DLEVBQUVLLEVBQUYsRUFBSyxFQUFFSyxDQUExQyxFQUE2QztBQUMzQyxXQUFLUCxNQUFMLENBQVlFLEVBQVosSUFBaUJFLEdBQUcsQ0FBQ0csQ0FBRCxDQUFwQjtBQUNEOztBQUVELFNBQUtSLElBQUwsSUFBYU0sR0FBYjtBQUNEOztTQUVERyxRQUFBLGlCQUFRO0FBQ047QUFDQSxRQUFJLEtBQUtULElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNqQixXQUFLSSxPQUFMLENBQWFNLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtWLE1BQUwsQ0FBWU0sTUFBWixHQUFxQixHQUFoQyxJQUF1QyxDQUFwRDtBQUNEOztBQUVELFFBQUlLLEdBQUcsR0FBRyxLQUFLWCxNQUFMLENBQVksS0FBS0QsSUFBakIsQ0FBVjtBQUNBLFNBQUtDLE1BQUwsQ0FBWSxLQUFLRCxJQUFqQixJQUF5QixJQUF6QjtBQUNBLE1BQUUsS0FBS0EsSUFBUDtBQUVBLFdBQU9ZLEdBQVA7QUFDRDs7U0FFREMsT0FBQSxjQUFLQyxHQUFMLEVBQVU7QUFDUixNQUFFLEtBQUtkLElBQVA7QUFDQSxTQUFLQyxNQUFMLENBQVksS0FBS0QsSUFBakIsSUFBeUJjLEdBQXpCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7O1NBQ0VDLFFBQUEsZUFBT2xCLEVBQVAsRUFBVztBQUNULFNBQUssSUFBSU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSSxLQUFLSCxJQUExQixFQUFnQ0csQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxVQUFJTixFQUFKLEVBQVE7QUFDSkEsUUFBQUEsRUFBRSxDQUFDLEtBQUtJLE1BQUwsQ0FBWUUsQ0FBWixDQUFELENBQUY7QUFDSDtBQUNKOztBQUNELFNBQUtGLE1BQUwsQ0FBWU0sTUFBWixHQUFxQixDQUFyQjtBQUNBLFNBQUtQLElBQUwsR0FBWSxDQUFDLENBQWI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xyXG4gIGNvbnN0cnVjdG9yKGZuLCBzaXplKSB7XHJcbiAgICB0aGlzLl9mbiA9IGZuO1xyXG4gICAgdGhpcy5faWR4ID0gc2l6ZSAtIDE7XHJcbiAgICB0aGlzLl9mcmVlcyA9IG5ldyBBcnJheShzaXplKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7ICsraSkge1xyXG4gICAgICB0aGlzLl9mcmVlc1tpXSA9IGZuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZXhwYW5kKHNpemUpIHtcclxuICAgIGxldCBvbGQgPSB0aGlzLl9mcmVlcztcclxuICAgIHRoaXMuX2ZyZWVzID0gbmV3IEFycmF5KHNpemUpO1xyXG5cclxuICAgIGxldCBsZW4gPSBzaXplIC0gb2xkLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgdGhpcy5fZnJlZXNbaV0gPSB0aGlzLl9mbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSBsZW4sIGogPSAwOyBpIDwgc2l6ZTsgKytpLCArK2opIHtcclxuICAgICAgdGhpcy5fZnJlZXNbaV0gPSBvbGRbal07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faWR4ICs9IGxlbjtcclxuICB9XHJcblxyXG4gIGFsbG9jKCkge1xyXG4gICAgLy8gY3JlYXRlIHNvbWUgbW9yZSBzcGFjZSAoZXhwYW5kIGJ5IDIwJSwgbWluaW11bSAxKVxyXG4gICAgaWYgKHRoaXMuX2lkeCA8IDApIHtcclxuICAgICAgdGhpcy5fZXhwYW5kKE1hdGgucm91bmQodGhpcy5fZnJlZXMubGVuZ3RoICogMS4yKSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXQgPSB0aGlzLl9mcmVlc1t0aGlzLl9pZHhdO1xyXG4gICAgdGhpcy5fZnJlZXNbdGhpcy5faWR4XSA9IG51bGw7XHJcbiAgICAtLXRoaXMuX2lkeDtcclxuXHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH1cclxuXHJcbiAgZnJlZShvYmopIHtcclxuICAgICsrdGhpcy5faWR4O1xyXG4gICAgdGhpcy5fZnJlZXNbdGhpcy5faWR4XSA9IG9iajtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOa4hemZpOWvueixoeaxoOOAglxyXG4gICAqIEBwYXJhbSBmbiDmuIXpmaTlm57osIPvvIzlr7nmr4/kuKrph4rmlL7nmoTlr7nosaHosIPnlKjkuIDmrKHjgIJcclxuICAgKi9cclxuICBjbGVhciAoZm4pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuX2lkeDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGZuKSB7XHJcbiAgICAgICAgICAgIGZuKHRoaXMuX2ZyZWVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9mcmVlcy5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5faWR4ID0gLTE7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=