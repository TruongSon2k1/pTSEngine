
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/size.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueType = _interopRequireDefault(require("./value-type"));

var _CCClass = _interopRequireDefault(require("../platform/CCClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * !#en
 * cc.Size is the class for size object,<br/>
 * please do not use its constructor to create sizes,<br/>
 * use {{#crossLink "cc/size:method"}}{{/crossLink}} alias function instead.<br/>
 * It will be deprecated soon, please use cc.Vec2 instead.
 *
 * !#zh
 * cc.Size 是 size 对象的类。<br/>
 * 请不要使用它的构造函数创建的 size，<br/>
 * 使用 {{#crossLink "cc/size:method"}}{{/crossLink}} 别名函数。<br/>
 * 它不久将被取消，请使用cc.Vec2代替。
 *
 * @class Size
 */

/**
 * @method constructor
 * @param {Number|Size} width
 * @param {Number} [height]
 */
var Size = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Size, _ValueType);

  function Size(width, height) {
    var _this;

    if (width === void 0) {
      width = 0;
    }

    if (height === void 0) {
      height = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.width = void 0;
    _this.height = void 0;

    if (width && typeof width === 'object') {
      _this.width = width.width;
      _this.height = width.height;
    } else {
      _this.width = width || 0;
      _this.height = height || 0;
    }

    return _this;
  }
  /**
   * !#en TODO
   * !#zh 克隆 size 对象。
   * @method clone
   * @return {Size}
   * @example
   * var a = new cc.size(10, 10);
   * a.clone();// return Size {width: 0, height: 0};
   */


  var _proto = Size.prototype;

  _proto.clone = function clone() {
    return new Size(this.width, this.height);
  }
  /**
   * !#en TODO
   * !#zh 当前 Size 对象是否等于指定 Size 对象。
   * @method equals
   * @param {Size} other
   * @return {Boolean}
   * @example
   * var a = new cc.size(10, 10);
   * a.equals(new cc.size(10, 10));// return true;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.width === other.width && this.height === other.height;
  }
  /**
   * !#en TODO
   * !#zh 线性插值。
   * @method lerp
   * @param {Rect} to
   * @param {Number} ratio - the interpolation coefficient.
   * @param {Size} [out] - optional, the receiving vector.
   * @return {Size}
   * @example
   * var a = new cc.size(10, 10);
   * var b = new cc.rect(50, 50, 100, 100);
   * update (dt) {
   *    // method 1;
   *    var c = a.lerp(b, dt * 0.1);
   *    // method 2;
   *    a.lerp(b, dt * 0.1, c);
   * }
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Size();
    var width = this.width;
    var height = this.height;
    out.width = width + (to.width - width) * ratio;
    out.height = height + (to.height - height) * ratio;
    return out;
  };

  _proto.set = function set(source) {
    this.width = source.width;
    this.height = source.height;
    return this;
  }
  /**
   * !#en TODO
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {String}
   * @example
   * var a = new cc.size(10, 10);
   * a.toString();// return "(10.00, 10.00)";
   */
  ;

  _proto.toString = function toString() {
    return '(' + this.width.toFixed(2) + ', ' + this.height.toFixed(2) + ')';
  };

  _createClass(Size, null, [{
    key: "ZERO",
    get:
    /**
     * !#en return a Size object with width = 0 and height = 0.
     * !#zh 返回一个宽度为 0 和高度为 0 的 Size 对象。
     * @property ZERO
     * @type {Size}
     * @default new Size(0, 0)
     * @static
     */
    function get() {
      return new Size();
    }
  }]);

  return Size;
}(_valueType["default"]);

exports["default"] = Size;
Size.ZERO_R = Size.ZERO;

_CCClass["default"].fastDefine('cc.Size', Size, {
  width: 0,
  height: 0
});
/**
 * @module cc
 */

/**
 * !#en
 * Helper function that creates a cc.Size.<br/>
 * Please use cc.p or cc.v2 instead, it will soon replace cc.Size.
 * !#zh
 * 创建一个 cc.Size 对象的帮助函数。<br/>
 * 注意：可以使用 cc.p 或者是 cc.v2 代替，它们将很快取代 cc.Size。
 * @method size
 * @param {Number|Size} w - width or a size object
 * @param {Number} [h] - height
 * @return {Size}
 * @example {@link cocos2d/core/value-types/CCSize/size.js}
 */


cc.size = function (w, h) {
  return new Size(w, h);
};

cc.Size = Size;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxzaXplLnRzIl0sIm5hbWVzIjpbIlNpemUiLCJ3aWR0aCIsImhlaWdodCIsImNsb25lIiwiZXF1YWxzIiwib3RoZXIiLCJsZXJwIiwidG8iLCJyYXRpbyIsIm91dCIsInNldCIsInNvdXJjZSIsInRvU3RyaW5nIiwidG9GaXhlZCIsIlZhbHVlVHlwZSIsIlpFUk9fUiIsIlpFUk8iLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsImNjIiwic2l6ZSIsInciLCJoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7OztBQXNCakIsZ0JBQWFDLEtBQWIsRUFBdUNDLE1BQXZDLEVBQTJEO0FBQUE7O0FBQUEsUUFBOUNELEtBQThDO0FBQTlDQSxNQUFBQSxLQUE4QyxHQUF2QixDQUF1QjtBQUFBOztBQUFBLFFBQXBCQyxNQUFvQjtBQUFwQkEsTUFBQUEsTUFBb0IsR0FBSCxDQUFHO0FBQUE7O0FBQ3ZEO0FBRHVELFVBTjNERCxLQU0yRDtBQUFBLFVBRjNEQyxNQUUyRDs7QUFFdkQsUUFBSUQsS0FBSyxJQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBOUIsRUFBd0M7QUFDcEMsWUFBS0EsS0FBTCxHQUFhQSxLQUFLLENBQUNBLEtBQW5CO0FBQ0EsWUFBS0MsTUFBTCxHQUFjRCxLQUFLLENBQUNDLE1BQXBCO0FBQ0gsS0FIRCxNQUlLO0FBQ0QsWUFBS0QsS0FBTCxHQUFhQSxLQUFLLElBQWMsQ0FBaEM7QUFDQSxZQUFLQyxNQUFMLEdBQWNBLE1BQU0sSUFBSSxDQUF4QjtBQUNIOztBQVRzRDtBQVUxRDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDSUMsUUFBQSxpQkFBZTtBQUNYLFdBQU8sSUFBSUgsSUFBSixDQUFTLEtBQUtDLEtBQWQsRUFBcUIsS0FBS0MsTUFBMUIsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNJRSxTQUFBLGdCQUFRQyxLQUFSLEVBQThCO0FBQzFCLFdBQU9BLEtBQUssSUFDUixLQUFLSixLQUFMLEtBQWVJLEtBQUssQ0FBQ0osS0FEbEIsSUFFSCxLQUFLQyxNQUFMLEtBQWdCRyxLQUFLLENBQUNILE1BRjFCO0FBR0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNJSSxPQUFBLGNBQU1DLEVBQU4sRUFBZ0JDLEtBQWhCLEVBQStCQyxHQUEvQixFQUFpRDtBQUM3Q0EsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUksSUFBSVQsSUFBSixFQUFiO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtBLEtBQWpCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEtBQUtBLE1BQWxCO0FBQ0FPLElBQUFBLEdBQUcsQ0FBQ1IsS0FBSixHQUFZQSxLQUFLLEdBQUcsQ0FBQ00sRUFBRSxDQUFDTixLQUFILEdBQVdBLEtBQVosSUFBcUJPLEtBQXpDO0FBQ0FDLElBQUFBLEdBQUcsQ0FBQ1AsTUFBSixHQUFhQSxNQUFNLEdBQUcsQ0FBQ0ssRUFBRSxDQUFDTCxNQUFILEdBQVlBLE1BQWIsSUFBdUJNLEtBQTdDO0FBQ0EsV0FBT0MsR0FBUDtBQUNIOztTQUVEQyxNQUFBLGFBQUtDLE1BQUwsRUFBbUI7QUFDZixTQUFLVixLQUFMLEdBQWFVLE1BQU0sQ0FBQ1YsS0FBcEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNTLE1BQU0sQ0FBQ1QsTUFBckI7QUFDQSxXQUFPLElBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ0lVLFdBQUEsb0JBQW9CO0FBQ2hCLFdBQU8sTUFBTSxLQUFLWCxLQUFMLENBQVdZLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBTixHQUE4QixJQUE5QixHQUFxQyxLQUFLWCxNQUFMLENBQVlXLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBckMsR0FBOEQsR0FBckU7QUFDSDs7Ozs7QUF6R0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUFtQjtBQUFFLGFBQU8sSUFBSWIsSUFBSixFQUFQO0FBQW9COzs7O0VBVlhjOzs7QUFBYmQsS0FXRGUsU0FBU2YsSUFBSSxDQUFDZ0I7O0FBbUdsQ0Msb0JBQVFDLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEJsQixJQUE5QixFQUFvQztBQUFFQyxFQUFBQSxLQUFLLEVBQUUsQ0FBVDtBQUFZQyxFQUFBQSxNQUFNLEVBQUU7QUFBcEIsQ0FBcEM7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBaUIsRUFBRSxDQUFDQyxJQUFILEdBQVUsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3RCLFNBQU8sSUFBSXRCLElBQUosQ0FBU3FCLENBQVQsRUFBWUMsQ0FBWixDQUFQO0FBQ0gsQ0FGRDs7QUFJQUgsRUFBRSxDQUFDbkIsSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IFZhbHVlVHlwZSBmcm9tICcuL3ZhbHVlLXR5cGUnO1xyXG5pbXBvcnQgQ0NDbGFzcyBmcm9tICcuLi9wbGF0Zm9ybS9DQ0NsYXNzJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIGNjLlNpemUgaXMgdGhlIGNsYXNzIGZvciBzaXplIG9iamVjdCw8YnIvPlxyXG4gKiBwbGVhc2UgZG8gbm90IHVzZSBpdHMgY29uc3RydWN0b3IgdG8gY3JlYXRlIHNpemVzLDxici8+XHJcbiAqIHVzZSB7eyNjcm9zc0xpbmsgXCJjYy9zaXplOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBhbGlhcyBmdW5jdGlvbiBpbnN0ZWFkLjxici8+XHJcbiAqIEl0IHdpbGwgYmUgZGVwcmVjYXRlZCBzb29uLCBwbGVhc2UgdXNlIGNjLlZlYzIgaW5zdGVhZC5cclxuICpcclxuICogISN6aFxyXG4gKiBjYy5TaXplIOaYryBzaXplIOWvueixoeeahOexu+OAgjxici8+XHJcbiAqIOivt+S4jeimgeS9v+eUqOWug+eahOaehOmAoOWHveaVsOWIm+W7uueahCBzaXpl77yMPGJyLz5cclxuICog5L2/55SoIHt7I2Nyb3NzTGluayBcImNjL3NpemU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOWIq+WQjeWHveaVsOOAgjxici8+XHJcbiAqIOWug+S4jeS5heWwhuiiq+WPlua2iO+8jOivt+S9v+eUqGNjLlZlYzLku6Pmm7/jgIJcclxuICpcclxuICogQGNsYXNzIFNpemVcclxuICovXHJcbi8qKlxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfFNpemV9IHdpZHRoXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2l6ZSBleHRlbmRzIFZhbHVlVHlwZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIFNpemUgb2JqZWN0IHdpdGggd2lkdGggPSAwIGFuZCBoZWlnaHQgPSAwLlxyXG4gICAgICogISN6aCDov5Tlm57kuIDkuKrlrr3luqbkuLogMCDlkozpq5jluqbkuLogMCDnmoQgU2l6ZSDlr7nosaHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXHJcbiAgICAgKiBAdHlwZSB7U2l6ZX1cclxuICAgICAqIEBkZWZhdWx0IG5ldyBTaXplKDAsIDApXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgWkVSTyAoKSB7IHJldHVybiBuZXcgU2l6ZSgpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgWkVST19SID0gU2l6ZS5aRVJPO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXHJcbiAgICAgKi9cclxuICAgIHdpZHRoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcclxuICAgICAqL1xyXG4gICAgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHdpZHRoOiBTaXplIHwgbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAod2lkdGggJiYgdHlwZW9mIHdpZHRoID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGgud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIGFzIG51bWJlciB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVE9ET1xyXG4gICAgICogISN6aCDlhYvpmoYgc2l6ZSDlr7nosaHjgIJcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGEgPSBuZXcgY2Muc2l6ZSgxMCwgMTApO1xyXG4gICAgICogYS5jbG9uZSgpOy8vIHJldHVybiBTaXplIHt3aWR0aDogMCwgaGVpZ2h0OiAwfTtcclxuICAgICAqL1xyXG4gICAgY2xvbmUgKCk6IFNpemUge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRPRE9cclxuICAgICAqICEjemgg5b2T5YmNIFNpemUg5a+56LGh5piv5ZCm562J5LqO5oyH5a6aIFNpemUg5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHBhcmFtIHtTaXplfSBvdGhlclxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5zaXplKDEwLCAxMCk7XHJcbiAgICAgKiBhLmVxdWFscyhuZXcgY2Muc2l6ZSgxMCwgMTApKTsvLyByZXR1cm4gdHJ1ZTtcclxuICAgICAqL1xyXG4gICAgZXF1YWxzIChvdGhlcjogU2l6ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvdGhlciAmJlxyXG4gICAgICAgICAgICB0aGlzLndpZHRoID09PSBvdGhlci53aWR0aCAmJlxyXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9PT0gb3RoZXIuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvOOAglxyXG4gICAgICogQG1ldGhvZCBsZXJwXHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHRvXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5cclxuICAgICAqIEBwYXJhbSB7U2l6ZX0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IuXHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBhID0gbmV3IGNjLnNpemUoMTAsIDEwKTtcclxuICAgICAqIHZhciBiID0gbmV3IGNjLnJlY3QoNTAsIDUwLCAxMDAsIDEwMCk7XHJcbiAgICAgKiB1cGRhdGUgKGR0KSB7XHJcbiAgICAgKiAgICAvLyBtZXRob2QgMTtcclxuICAgICAqICAgIHZhciBjID0gYS5sZXJwKGIsIGR0ICogMC4xKTtcclxuICAgICAqICAgIC8vIG1ldGhvZCAyO1xyXG4gICAgICogICAgYS5sZXJwKGIsIGR0ICogMC4xLCBjKTtcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgbGVycCAodG86IFNpemUsIHJhdGlvOiBudW1iZXIsIG91dD86IFNpemUpOiBTaXplIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFNpemUoKTtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICBvdXQud2lkdGggPSB3aWR0aCArICh0by53aWR0aCAtIHdpZHRoKSAqIHJhdGlvO1xyXG4gICAgICAgIG91dC5oZWlnaHQgPSBoZWlnaHQgKyAodG8uaGVpZ2h0IC0gaGVpZ2h0KSAqIHJhdGlvO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IChzb3VyY2UpOiBTaXplIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gc291cmNlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc291cmNlLmhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVE9ET1xyXG4gICAgICogISN6aCDovazmjaLkuLrmlrnkvr/pmIXor7vnmoTlrZfnrKbkuLLjgIJcclxuICAgICAqIEBtZXRob2QgdG9TdHJpbmdcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5zaXplKDEwLCAxMCk7XHJcbiAgICAgKiBhLnRvU3RyaW5nKCk7Ly8gcmV0dXJuIFwiKDEwLjAwLCAxMC4wMClcIjtcclxuICAgICAqL1xyXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcoJyArIHRoaXMud2lkdGgudG9GaXhlZCgyKSArICcsICcgKyB0aGlzLmhlaWdodC50b0ZpeGVkKDIpICsgJyknO1xyXG4gICAgfVxyXG59XHJcblxyXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLlNpemUnLCBTaXplLCB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgY2MuU2l6ZS48YnIvPlxyXG4gKiBQbGVhc2UgdXNlIGNjLnAgb3IgY2MudjIgaW5zdGVhZCwgaXQgd2lsbCBzb29uIHJlcGxhY2UgY2MuU2l6ZS5cclxuICogISN6aFxyXG4gKiDliJvlu7rkuIDkuKogY2MuU2l6ZSDlr7nosaHnmoTluK7liqnlh73mlbDjgII8YnIvPlxyXG4gKiDms6jmhI/vvJrlj6/ku6Xkvb/nlKggY2MucCDmiJbogIXmmK8gY2MudjIg5Luj5pu/77yM5a6D5Lus5bCG5b6I5b+r5Y+W5LujIGNjLlNpemXjgIJcclxuICogQG1ldGhvZCBzaXplXHJcbiAqIEBwYXJhbSB7TnVtYmVyfFNpemV9IHcgLSB3aWR0aCBvciBhIHNpemUgb2JqZWN0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaF0gLSBoZWlnaHRcclxuICogQHJldHVybiB7U2l6ZX1cclxuICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS92YWx1ZS10eXBlcy9DQ1NpemUvc2l6ZS5qc31cclxuICovXHJcbmNjLnNpemUgPSBmdW5jdGlvbiAodywgaCkge1xyXG4gICAgcmV0dXJuIG5ldyBTaXplKHcsIGgpO1xyXG59O1xyXG5cclxuY2MuU2l6ZSA9IFNpemU7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9