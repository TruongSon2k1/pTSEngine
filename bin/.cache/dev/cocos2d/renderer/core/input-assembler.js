
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/input-assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputAssembler = /*#__PURE__*/function () {
  function InputAssembler(vb, ib, pt) {
    if (pt === void 0) {
      pt = _gfx["default"].PT_TRIANGLES;
    }

    this._vertexBuffer = vb;
    this._indexBuffer = ib;
    this._primitiveType = pt;
    this._start = 0;
    this._count = -1; // TODO: instancing data
    // this._stream = 0;
  }
  /**
   * @property {Number} count The number of indices or vertices to dispatch in the draw call.
   */


  _createClass(InputAssembler, [{
    key: "count",
    get: function get() {
      if (this._count !== -1) {
        return this._count;
      }

      if (this._indexBuffer) {
        return this._indexBuffer.count;
      }

      if (this._vertexBuffer) {
        return this._vertexBuffer.count;
      }

      return 0;
    }
  }]);

  return InputAssembler;
}();

exports["default"] = InputAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxjb3JlXFxpbnB1dC1hc3NlbWJsZXIuanMiXSwibmFtZXMiOlsiSW5wdXRBc3NlbWJsZXIiLCJ2YiIsImliIiwicHQiLCJnZngiLCJQVF9UUklBTkdMRVMiLCJfdmVydGV4QnVmZmVyIiwiX2luZGV4QnVmZmVyIiwiX3ByaW1pdGl2ZVR5cGUiLCJfc3RhcnQiLCJfY291bnQiLCJjb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztJQUVxQkE7QUFDbkIsMEJBQVlDLEVBQVosRUFBZ0JDLEVBQWhCLEVBQW9CQyxFQUFwQixFQUEyQztBQUFBLFFBQXZCQSxFQUF1QjtBQUF2QkEsTUFBQUEsRUFBdUIsR0FBbEJDLGdCQUFJQyxZQUFjO0FBQUE7O0FBQ3pDLFNBQUtDLGFBQUwsR0FBcUJMLEVBQXJCO0FBQ0EsU0FBS00sWUFBTCxHQUFvQkwsRUFBcEI7QUFDQSxTQUFLTSxjQUFMLEdBQXNCTCxFQUF0QjtBQUNBLFNBQUtNLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQUMsQ0FBZixDQUx5QyxDQU96QztBQUNBO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7O1NBQ0UsZUFBWTtBQUNWLFVBQUksS0FBS0EsTUFBTCxLQUFnQixDQUFDLENBQXJCLEVBQXdCO0FBQ3RCLGVBQU8sS0FBS0EsTUFBWjtBQUNEOztBQUVELFVBQUksS0FBS0gsWUFBVCxFQUF1QjtBQUNyQixlQUFPLEtBQUtBLFlBQUwsQ0FBa0JJLEtBQXpCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLTCxhQUFULEVBQXdCO0FBQ3RCLGVBQU8sS0FBS0EsYUFBTCxDQUFtQkssS0FBMUI7QUFDRDs7QUFFRCxhQUFPLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuaW1wb3J0IGdmeCBmcm9tICcuLi9nZngnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRBc3NlbWJsZXIge1xyXG4gIGNvbnN0cnVjdG9yKHZiLCBpYiwgcHQgPSBnZnguUFRfVFJJQU5HTEVTKSB7XHJcbiAgICB0aGlzLl92ZXJ0ZXhCdWZmZXIgPSB2YjtcclxuICAgIHRoaXMuX2luZGV4QnVmZmVyID0gaWI7XHJcbiAgICB0aGlzLl9wcmltaXRpdmVUeXBlID0gcHQ7XHJcbiAgICB0aGlzLl9zdGFydCA9IDA7XHJcbiAgICB0aGlzLl9jb3VudCA9IC0xO1xyXG5cclxuICAgIC8vIFRPRE86IGluc3RhbmNpbmcgZGF0YVxyXG4gICAgLy8gdGhpcy5fc3RyZWFtID0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjb3VudCBUaGUgbnVtYmVyIG9mIGluZGljZXMgb3IgdmVydGljZXMgdG8gZGlzcGF0Y2ggaW4gdGhlIGRyYXcgY2FsbC5cclxuICAgKi9cclxuICBnZXQgY291bnQoKSB7XHJcbiAgICBpZiAodGhpcy5fY291bnQgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5faW5kZXhCdWZmZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2luZGV4QnVmZmVyLmNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl92ZXJ0ZXhCdWZmZXIpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRleEJ1ZmZlci5jb3VudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==