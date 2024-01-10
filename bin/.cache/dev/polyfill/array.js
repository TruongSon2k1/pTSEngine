
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/array.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (callback) {
    var length = this.length;

    for (var i = 0; i < length; i++) {
      var element = this[i];

      if (callback.call(this, element, i, this)) {
        return element;
      }
    }

    return undefined;
  };
} // for ie 11


if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
  };
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXHBvbHlmaWxsXFxhcnJheS5qcyJdLCJuYW1lcyI6WyJBcnJheSIsImlzQXJyYXkiLCJhcmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJmaW5kIiwiY2FsbGJhY2siLCJsZW5ndGgiLCJpIiwiZWxlbWVudCIsInVuZGVmaW5lZCIsImluY2x1ZGVzIiwidmFsdWUiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxDQUFDQSxLQUFLLENBQUNDLE9BQVgsRUFBb0I7QUFDaEJELEVBQUFBLEtBQUssQ0FBQ0MsT0FBTixHQUFnQixVQUFVQyxHQUFWLEVBQWU7QUFDM0IsV0FBT0MsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxRQUFqQixDQUEwQkMsSUFBMUIsQ0FBK0JKLEdBQS9CLE1BQXdDLGdCQUEvQztBQUNILEdBRkQ7QUFHSDs7QUFFRCxJQUFJLENBQUNGLEtBQUssQ0FBQ0ksU0FBTixDQUFnQkcsSUFBckIsRUFBMkI7QUFDdkJQLEVBQUFBLEtBQUssQ0FBQ0ksU0FBTixDQUFnQkcsSUFBaEIsR0FBdUIsVUFBVUMsUUFBVixFQUFvQjtBQUN2QyxRQUFJQyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxNQUFwQixFQUE0QkMsQ0FBQyxFQUE3QixFQUFpQztBQUM3QixVQUFJQyxPQUFPLEdBQUcsS0FBS0QsQ0FBTCxDQUFkOztBQUNBLFVBQUlGLFFBQVEsQ0FBQ0YsSUFBVCxDQUFjLElBQWQsRUFBb0JLLE9BQXBCLEVBQTZCRCxDQUE3QixFQUFnQyxJQUFoQyxDQUFKLEVBQTJDO0FBQ3ZDLGVBQU9DLE9BQVA7QUFDSDtBQUNKOztBQUVELFdBQU9DLFNBQVA7QUFDSCxHQVZEO0FBV0gsRUFFRDs7O0FBQ0EsSUFBSSxDQUFDWixLQUFLLENBQUNJLFNBQU4sQ0FBZ0JTLFFBQXJCLEVBQStCO0FBQzNCYixFQUFBQSxLQUFLLENBQUNJLFNBQU4sQ0FBZ0JTLFFBQWhCLEdBQTJCLFVBQVVDLEtBQVYsRUFBaUI7QUFDeEMsV0FBTyxLQUFLQyxPQUFMLENBQWFELEtBQWIsTUFBd0IsQ0FBQyxDQUFoQztBQUNILEdBRkQ7QUFHSCIsInNvdXJjZXNDb250ZW50IjpbImlmICghQXJyYXkuaXNBcnJheSkge1xyXG4gICAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICB9O1xyXG59XHJcblxyXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maW5kKSB7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpc1tpXTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwodGhpcywgZWxlbWVudCwgaSwgdGhpcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gZm9yIGllIDExXHJcbmlmICghQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzKSB7XHJcbiAgICBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9