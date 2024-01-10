
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/rect.js';
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

var _vec = _interopRequireDefault(require("./vec2"));

var _size = _interopRequireDefault(require("./size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * !#en A 2D rectangle defined by x, y position and width, height.
 * !#zh 通过位置和宽高定义的 2D 矩形。
 * @class Rect
 * @extends ValueType
 */

/**
 * !#en
 * Constructor of Rect class.
 * see {{#crossLink "cc/rect:method"}} cc.rect {{/crossLink}} for convenience method.
 * !#zh
 * Rect类的构造函数。可以通过 {{#crossLink "cc/rect:method"}} cc.rect {{/crossLink}} 简便方法进行创建。
 *
 * @method constructor
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [w=0]
 * @param {Number} [h=0]
 */
var Rect = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Rect, _ValueType);

  /**
   * !#en Creates a rectangle from two coordinate values.
   * !#zh 根据指定 2 个坐标创建出一个矩形区域。
   * @static
   * @method fromMinMax
   * @param {Vec2} v1
   * @param {Vec2} v2
   * @return {Rect}
   * @example
   * cc.Rect.fromMinMax(cc.v2(10, 10), cc.v2(20, 20)); // Rect {x: 10, y: 10, width: 10, height: 10};
   */
  Rect.fromMinMax = function fromMinMax(v1, v2) {
    var min_x = Math.min(v1.x, v2.x);
    var min_y = Math.min(v1.y, v2.y);
    var max_x = Math.max(v1.x, v2.x);
    var max_y = Math.max(v1.y, v2.y);
    return new Rect(min_x, min_y, max_x - min_x, max_y - min_y);
  }
  /**
   * @property {Number} x
   */
  ;

  function Rect(x, y, w, h) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (w === void 0) {
      w = 0;
    }

    if (h === void 0) {
      h = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.x = void 0;
    _this.y = void 0;
    _this.width = void 0;
    _this.height = void 0;

    if (x && typeof x === 'object') {
      y = x.y;
      w = x.width;
      h = x.height;
      x = x.x;
    }

    _this.x = x || 0;
    _this.y = y || 0;
    _this.width = w || 0;
    _this.height = h || 0;
    return _this;
  }
  /**
   * !#en TODO
   * !#zh 克隆一个新的 Rect。
   * @method clone
   * @return {Rect}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * a.clone();// Rect {x: 0, y: 0, width: 10, height: 10}
   */


  var _proto = Rect.prototype;

  _proto.clone = function clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }
  /**
   * !#en TODO
   * !#zh 是否等于指定的矩形。
   * @method equals
   * @param {Rect} other
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(0, 0, 10, 10);
   * a.equals(b);// true;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
  };

  /**
   * !#en TODO
   * !#zh 线性插值
   * @method lerp
   * @param {Rect} to
   * @param {Number} ratio - the interpolation coefficient.
   * @param {Rect} [out] - optional, the receiving vector.
   * @return {Rect}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(50, 50, 100, 100);
   * update (dt) {
   *    // method 1;
   *    var c = a.lerp(b, dt * 0.1);
   *    // method 2;
   *    a.lerp(b, dt * 0.1, c);
   * }
   */
  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Rect();
    var x = this.x;
    var y = this.y;
    var width = this.width;
    var height = this.height;
    out.x = x + (to.x - x) * ratio;
    out.y = y + (to.y - y) * ratio;
    out.width = width + (to.width - width) * ratio;
    out.height = height + (to.height - height) * ratio;
    return out;
  };

  _proto.set = function set(source) {
    this.x = source.x;
    this.y = source.y;
    this.width = source.width;
    this.height = source.height;
    return this;
  }
  /**
   * !#en Check whether the current rectangle intersects with the given one
   * !#zh 当前矩形与指定矩形是否相交。
   * @method intersects
   * @param {Rect} rect
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(0, 0, 20, 20);
   * a.intersects(b);// true
   */
  ;

  _proto.intersects = function intersects(rect) {
    var maxax = this.x + this.width,
        maxay = this.y + this.height,
        maxbx = rect.x + rect.width,
        maxby = rect.y + rect.height;
    return !(maxax < rect.x || maxbx < this.x || maxay < rect.y || maxby < this.y);
  }
  /**
   * !#en Returns the overlapping portion of 2 rectangles.
   * !#zh 返回 2 个矩形重叠的部分。
   * @method intersection
   * @param {Rect} out Stores the result
   * @param {Rect} rectB
   * @return {Rect} Returns the out parameter
   * @example
   * var a = new cc.Rect(0, 10, 20, 20);
   * var b = new cc.Rect(0, 10, 10, 10);
   * var intersection = new cc.Rect();
   * a.intersection(intersection, b); // intersection {x: 0, y: 10, width: 10, height: 10};
   */
  ;

  _proto.intersection = function intersection(out, rectB) {
    var axMin = this.x,
        ayMin = this.y,
        axMax = this.x + this.width,
        ayMax = this.y + this.height;
    var bxMin = rectB.x,
        byMin = rectB.y,
        bxMax = rectB.x + rectB.width,
        byMax = rectB.y + rectB.height;
    out.x = Math.max(axMin, bxMin);
    out.y = Math.max(ayMin, byMin);
    out.width = Math.min(axMax, bxMax) - out.x;
    out.height = Math.min(ayMax, byMax) - out.y;
    return out;
  }
  /**
   * !#en Check whether the current rect contains the given point
   * !#zh 当前矩形是否包含指定坐标点。
   * Returns true if the point inside this rectangle.
   * @method contains
   * @param {Vec2} point
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Vec2(0, 5);
   * a.contains(b);// true
   */
  ;

  _proto.contains = function contains(point) {
    return this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y;
  }
  /**
   * !#en Returns true if the other rect totally inside this rectangle.
   * !#zh 当前矩形是否包含指定矩形。
   * @method containsRect
   * @param {Rect} rect
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 20, 20);
   * var b = new cc.Rect(0, 0, 10, 10);
   * a.containsRect(b);// true
   */
  ;

  _proto.containsRect = function containsRect(rect) {
    return this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height;
  }
  /**
   * !#en Returns the smallest rectangle that contains the current rect and the given rect.
   * !#zh 返回一个包含当前矩形和指定矩形的最小矩形。
   * @method union
   * @param {Rect} out Stores the result
   * @param {Rect} rectB
   * @return {Rect} Returns the out parameter
   * @example
   * var a = new cc.Rect(0, 10, 20, 20);
   * var b = new cc.Rect(0, 10, 10, 10);
   * var union = new cc.Rect();
   * a.union(union, b); // union {x: 0, y: 10, width: 20, height: 20};
   */
  ;

  _proto.union = function union(out, rectB) {
    var ax = this.x,
        ay = this.y,
        aw = this.width,
        ah = this.height;
    var bx = rectB.x,
        by = rectB.y,
        bw = rectB.width,
        bh = rectB.height;
    out.x = Math.min(ax, bx);
    out.y = Math.min(ay, by);
    out.width = Math.max(ax + aw, bx + bw) - out.x;
    out.height = Math.max(ay + ah, by + bh) - out.y;
    return out;
  }
  /**
   * !#en Apply matrix4 to the rect.
   * !#zh 使用 mat4 对矩形进行矩阵转换。
   * @method transformMat4
   * @param out {Rect} The output rect
   * @param mat {Mat4} The matrix4
   */
  ;

  _proto.transformMat4 = function transformMat4(out, mat) {
    var ol = this.x;
    var ob = this.y;
    var or = ol + this.width;
    var ot = ob + this.height;
    var matm = mat.m;
    var lbx = matm[0] * ol + matm[4] * ob + matm[12];
    var lby = matm[1] * ol + matm[5] * ob + matm[13];
    var rbx = matm[0] * or + matm[4] * ob + matm[12];
    var rby = matm[1] * or + matm[5] * ob + matm[13];
    var ltx = matm[0] * ol + matm[4] * ot + matm[12];
    var lty = matm[1] * ol + matm[5] * ot + matm[13];
    var rtx = matm[0] * or + matm[4] * ot + matm[12];
    var rty = matm[1] * or + matm[5] * ot + matm[13];
    var minX = Math.min(lbx, rbx, ltx, rtx);
    var maxX = Math.max(lbx, rbx, ltx, rtx);
    var minY = Math.min(lby, rby, lty, rty);
    var maxY = Math.max(lby, rby, lty, rty);
    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;
    return out;
  }
  /**
   * !#en Output rect informations to string
   * !#zh 转换为方便阅读的字符串
   * @method toString
   * @return {String}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * a.toString();// "(0.00, 0.00, 10.00, 10.00)";
   */
  ;

  _proto.toString = function toString() {
    return '(' + this.x.toFixed(2) + ', ' + this.y.toFixed(2) + ', ' + this.width.toFixed(2) + ', ' + this.height.toFixed(2) + ')';
  }
  /**
   * !#en The minimum x value, equals to rect.x
   * !#zh 矩形 x 轴上的最小值，等价于 rect.x。
   * @property xMin
   * @type {Number}
   */
  ;

  _createClass(Rect, [{
    key: "xMin",
    get: function get() {
      return this.x;
    },
    set: function set(v) {
      this.width += this.x - v;
      this.x = v;
    }
    /**
    * !#en The minimum y value, equals to rect.y
    * !#zh 矩形 y 轴上的最小值。
    * @property yMin
    * @type {Number}
    */

  }, {
    key: "yMin",
    get: function get() {
      return this.y;
    },
    set: function set(v) {
      this.height += this.y - v;
      this.y = v;
    }
    /**
    * !#en The maximum x value.
    * !#zh 矩形 x 轴上的最大值。
    * @property xMax
    * @type {Number}
    */

  }, {
    key: "xMax",
    get: function get() {
      return this.x + this.width;
    },
    set: function set(value) {
      this.width = value - this.x;
    }
    /**
    * !#en The maximum y value.
    * !#zh 矩形 y 轴上的最大值。
    * @property yMax
    * @type {Number}
    */

  }, {
    key: "yMax",
    get: function get() {
      return this.y + this.height;
    },
    set: function set(value) {
      this.height = value - this.y;
    }
    /**
    * !#en The position of the center of the rectangle.
    * !#zh 矩形的中心点。
    * @property {Vec2} center
    */

  }, {
    key: "center",
    get: function get() {
      return new _vec["default"](this.x + this.width * 0.5, this.y + this.height * 0.5);
    },
    set: function set(value) {
      this.x = value.x - this.width * 0.5;
      this.y = value.y - this.height * 0.5;
    }
    /**
    * !#en The X and Y position of the rectangle.
    * !#zh 矩形的 x 和 y 坐标。
    * @property {Vec2} origin
    */

  }, {
    key: "origin",
    get: function get() {
      return new _vec["default"](this.x, this.y);
    },
    set: function set(value) {
      this.x = value.x;
      this.y = value.y;
    }
    /**
    * !#en Width and height of the rectangle.
    * !#zh 矩形的大小。
    * @property {Size} size
    */

  }, {
    key: "size",
    get: function get() {
      return new _size["default"](this.width, this.height);
    },
    set: function set(value) {
      this.width = value.width;
      this.height = value.height;
    }
  }]);

  return Rect;
}(_valueType["default"]);

exports["default"] = Rect;

_CCClass["default"].fastDefine('cc.Rect', Rect, {
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

cc.Rect = Rect;
/**
 * @module cc
 */

/**
 * !#en
 * The convenience method to create a new Rect.
 * see {{#crossLink "Rect/Rect:method"}}cc.Rect{{/crossLink}}
 * !#zh
 * 该方法用来快速创建一个新的矩形。{{#crossLink "Rect/Rect:method"}}cc.Rect{{/crossLink}}
 * @method rect
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [w=0]
 * @param {Number} [h=0]
 * @return {Rect}
 * @example
 * var a = new cc.Rect(0 , 0, 10, 0);
 */

cc.rect = function rect(x, y, w, h) {
  return new Rect(x, y, w, h);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxyZWN0LnRzIl0sIm5hbWVzIjpbIlJlY3QiLCJmcm9tTWluTWF4IiwidjEiLCJ2MiIsIm1pbl94IiwiTWF0aCIsIm1pbiIsIngiLCJtaW5feSIsInkiLCJtYXhfeCIsIm1heCIsIm1heF95IiwidyIsImgiLCJ3aWR0aCIsImhlaWdodCIsImNsb25lIiwiZXF1YWxzIiwib3RoZXIiLCJsZXJwIiwidG8iLCJyYXRpbyIsIm91dCIsInNldCIsInNvdXJjZSIsImludGVyc2VjdHMiLCJyZWN0IiwibWF4YXgiLCJtYXhheSIsIm1heGJ4IiwibWF4YnkiLCJpbnRlcnNlY3Rpb24iLCJyZWN0QiIsImF4TWluIiwiYXlNaW4iLCJheE1heCIsImF5TWF4IiwiYnhNaW4iLCJieU1pbiIsImJ4TWF4IiwiYnlNYXgiLCJjb250YWlucyIsInBvaW50IiwiY29udGFpbnNSZWN0IiwidW5pb24iLCJheCIsImF5IiwiYXciLCJhaCIsImJ4IiwiYnkiLCJidyIsImJoIiwidHJhbnNmb3JtTWF0NCIsIm1hdCIsIm9sIiwib2IiLCJvciIsIm90IiwibWF0bSIsIm0iLCJsYngiLCJsYnkiLCJyYngiLCJyYnkiLCJsdHgiLCJsdHkiLCJydHgiLCJydHkiLCJtaW5YIiwibWF4WCIsIm1pblkiLCJtYXhZIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwidiIsInZhbHVlIiwiVmVjMiIsIlNpemUiLCJWYWx1ZVR5cGUiLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsImNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFDcUJBOzs7QUFFakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0FBQzdELE1BQXBCO0FBQ0g7Ozs7RUEvVzZCZ0U7Ozs7QUFrWGxDQyxvQkFBUUMsVUFBUixDQUFtQixTQUFuQixFQUE4QmxGLElBQTlCLEVBQW9DO0FBQUVPLEVBQUFBLENBQUMsRUFBRSxDQUFMO0FBQVFFLEVBQUFBLENBQUMsRUFBRSxDQUFYO0FBQWNNLEVBQUFBLEtBQUssRUFBRSxDQUFyQjtBQUF3QkMsRUFBQUEsTUFBTSxFQUFFO0FBQWhDLENBQXBDOztBQUNBbUUsRUFBRSxDQUFDbkYsSUFBSCxHQUFVQSxJQUFWO0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQW1GLEVBQUUsQ0FBQ3hELElBQUgsR0FBVSxTQUFTQSxJQUFULENBQWVwQixDQUFmLEVBQWtCRSxDQUFsQixFQUFxQkksQ0FBckIsRUFBd0JDLENBQXhCLEVBQTJCO0FBQ2pDLFNBQU8sSUFBSWQsSUFBSixDQUFTTyxDQUFULEVBQVlFLENBQVosRUFBZUksQ0FBZixFQUFrQkMsQ0FBbEIsQ0FBUDtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XHJcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xyXG5pbXBvcnQgVmVjMiBmcm9tICcuL3ZlYzInO1xyXG5pbXBvcnQgTWF0NCBmcm9tICcuL21hdDQnO1xyXG5pbXBvcnQgU2l6ZSBmcm9tICcuL3NpemUnO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQSAyRCByZWN0YW5nbGUgZGVmaW5lZCBieSB4LCB5IHBvc2l0aW9uIGFuZCB3aWR0aCwgaGVpZ2h0LlxyXG4gKiAhI3poIOmAmui/h+S9jee9ruWSjOWuvemrmOWumuS5ieeahCAyRCDnn6nlvaLjgIJcclxuICogQGNsYXNzIFJlY3RcclxuICogQGV4dGVuZHMgVmFsdWVUeXBlXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBDb25zdHJ1Y3RvciBvZiBSZWN0IGNsYXNzLlxyXG4gKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvcmVjdDptZXRob2RcIn19IGNjLnJlY3Qge3svY3Jvc3NMaW5rfX0gZm9yIGNvbnZlbmllbmNlIG1ldGhvZC5cclxuICogISN6aFxyXG4gKiBSZWN057G755qE5p6E6YCg5Ye95pWw44CC5Y+v5Lul6YCa6L+HIHt7I2Nyb3NzTGluayBcImNjL3JlY3Q6bWV0aG9kXCJ9fSBjYy5yZWN0IHt7L2Nyb3NzTGlua319IOeugOS+v+aWueazlei/m+ihjOWIm+W7uuOAglxyXG4gKlxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeD0wXVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFt3PTBdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaD0wXVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdCBleHRlbmRzIFZhbHVlVHlwZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyZWF0ZXMgYSByZWN0YW5nbGUgZnJvbSB0d28gY29vcmRpbmF0ZSB2YWx1ZXMuXHJcbiAgICAgKiAhI3poIOagueaNruaMh+WumiAyIOS4quWdkOagh+WIm+W7uuWHuuS4gOS4quefqeW9ouWMuuWfn+OAglxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1ldGhvZCBmcm9tTWluTWF4XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHYxXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHYyXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLlJlY3QuZnJvbU1pbk1heChjYy52MigxMCwgMTApLCBjYy52MigyMCwgMjApKTsgLy8gUmVjdCB7eDogMTAsIHk6IDEwLCB3aWR0aDogMTAsIGhlaWdodDogMTB9O1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbU1pbk1heCAodjE6IFZlYzIsIHYyOiBWZWMyKSB7XHJcbiAgICAgICAgdmFyIG1pbl94ID0gTWF0aC5taW4odjEueCwgdjIueCk7XHJcbiAgICAgICAgdmFyIG1pbl95ID0gTWF0aC5taW4odjEueSwgdjIueSk7XHJcbiAgICAgICAgdmFyIG1heF94ID0gTWF0aC5tYXgodjEueCwgdjIueCk7XHJcbiAgICAgICAgdmFyIG1heF95ID0gTWF0aC5tYXgodjEueSwgdjIueSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdChtaW5feCwgbWluX3ksIG1heF94IC0gbWluX3gsIG1heF95IC0gbWluX3kpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcclxuICAgICAqL1xyXG4gICAgeDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0geVxyXG4gICAgICovXHJcbiAgICB5OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxyXG4gICAgICovXHJcbiAgICB3aWR0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XHJcbiAgICAgKi9cclxuICAgIGhlaWdodDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IgKHg6IFJlY3QgfCBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3OiBudW1iZXIgPSAwLCBoOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgeSA9IHgueTtcclxuICAgICAgICAgICAgdyA9IHgud2lkdGg7XHJcbiAgICAgICAgICAgIGggPSB4LmhlaWdodDtcclxuICAgICAgICAgICAgeCA9IHgueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54ID0geCBhcyBudW1iZXIgfHwgMDtcclxuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHcgfHwgMDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGggfHwgMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRPRE9cclxuICAgICAqICEjemgg5YWL6ZqG5LiA5Liq5paw55qEIFJlY3TjgIJcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEByZXR1cm4ge1JlY3R9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICogYS5jbG9uZSgpOy8vIFJlY3Qge3g6IDAsIHk6IDAsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMH1cclxuICAgICAqL1xyXG4gICAgY2xvbmUgKCk6IFJlY3Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOaYr+WQpuetieS6juaMh+WumueahOefqeW9ouOAglxyXG4gICAgICogQG1ldGhvZCBlcXVhbHNcclxuICAgICAqIEBwYXJhbSB7UmVjdH0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICogYS5lcXVhbHMoYik7Ly8gdHJ1ZTtcclxuICAgICAqL1xyXG4gICAgZXF1YWxzIChvdGhlcjogUmVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvdGhlciAmJlxyXG4gICAgICAgICAgICB0aGlzLnggPT09IG90aGVyLnggJiZcclxuICAgICAgICAgICAgdGhpcy55ID09PSBvdGhlci55ICYmXHJcbiAgICAgICAgICAgIHRoaXMud2lkdGggPT09IG90aGVyLndpZHRoICYmXHJcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID09PSBvdGhlci5oZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvFxyXG4gICAgICogQG1ldGhvZCBsZXJwXHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHRvXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5cclxuICAgICAqIEBwYXJhbSB7UmVjdH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IuXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBhID0gbmV3IGNjLlJlY3QoMCwgMCwgMTAsIDEwKTtcclxuICAgICAqIHZhciBiID0gbmV3IGNjLlJlY3QoNTAsIDUwLCAxMDAsIDEwMCk7XHJcbiAgICAgKiB1cGRhdGUgKGR0KSB7XHJcbiAgICAgKiAgICAvLyBtZXRob2QgMTtcclxuICAgICAqICAgIHZhciBjID0gYS5sZXJwKGIsIGR0ICogMC4xKTtcclxuICAgICAqICAgIC8vIG1ldGhvZCAyO1xyXG4gICAgICogICAgYS5sZXJwKGIsIGR0ICogMC4xLCBjKTtcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgbGVycCAodG86IFJlY3QsIHJhdGlvOiBudW1iZXIsIG91dD86IFJlY3QpOiBSZWN0IHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFJlY3QoKTtcclxuICAgICAgICB2YXIgeCA9IHRoaXMueDtcclxuICAgICAgICB2YXIgeSA9IHRoaXMueTtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICBvdXQueCA9IHggKyAodG8ueCAtIHgpICogcmF0aW87XHJcbiAgICAgICAgb3V0LnkgPSB5ICsgKHRvLnkgLSB5KSAqIHJhdGlvO1xyXG4gICAgICAgIG91dC53aWR0aCA9IHdpZHRoICsgKHRvLndpZHRoIC0gd2lkdGgpICogcmF0aW87XHJcbiAgICAgICAgb3V0LmhlaWdodCA9IGhlaWdodCArICh0by5oZWlnaHQgLSBoZWlnaHQpICogcmF0aW87XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH07XHJcblxyXG4gICAgc2V0IChzb3VyY2U6IFJlY3QpOiBSZWN0IHtcclxuICAgICAgICB0aGlzLnggPSBzb3VyY2UueDtcclxuICAgICAgICB0aGlzLnkgPSBzb3VyY2UueTtcclxuICAgICAgICB0aGlzLndpZHRoID0gc291cmNlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc291cmNlLmhlaWdodDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0aGUgY3VycmVudCByZWN0YW5nbGUgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBvbmVcclxuICAgICAqICEjemgg5b2T5YmN55+p5b2i5LiO5oyH5a6a55+p5b2i5piv5ZCm55u45Lqk44CCXHJcbiAgICAgKiBAbWV0aG9kIGludGVyc2VjdHNcclxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDAsIDEwLCAxMCk7XHJcbiAgICAgKiB2YXIgYiA9IG5ldyBjYy5SZWN0KDAsIDAsIDIwLCAyMCk7XHJcbiAgICAgKiBhLmludGVyc2VjdHMoYik7Ly8gdHJ1ZVxyXG4gICAgICovXHJcbiAgICBpbnRlcnNlY3RzIChyZWN0OiBSZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIG1heGF4ID0gdGhpcy54ICsgdGhpcy53aWR0aCxcclxuICAgICAgICAgICAgbWF4YXkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCxcclxuICAgICAgICAgICAgbWF4YnggPSByZWN0LnggKyByZWN0LndpZHRoLFxyXG4gICAgICAgICAgICBtYXhieSA9IHJlY3QueSArIHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiAhKG1heGF4IDwgcmVjdC54IHx8IG1heGJ4IDwgdGhpcy54IHx8IG1heGF5IDwgcmVjdC55IHx8IG1heGJ5IDwgdGhpcy55KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgb3ZlcmxhcHBpbmcgcG9ydGlvbiBvZiAyIHJlY3RhbmdsZXMuXHJcbiAgICAgKiAhI3poIOi/lOWbniAyIOS4quefqeW9oumHjeWPoOeahOmDqOWIhuOAglxyXG4gICAgICogQG1ldGhvZCBpbnRlcnNlY3Rpb25cclxuICAgICAqIEBwYXJhbSB7UmVjdH0gb3V0IFN0b3JlcyB0aGUgcmVzdWx0XHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RCXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSBSZXR1cm5zIHRoZSBvdXQgcGFyYW1ldGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAxMCwgMjAsIDIwKTtcclxuICAgICAqIHZhciBiID0gbmV3IGNjLlJlY3QoMCwgMTAsIDEwLCAxMCk7XHJcbiAgICAgKiB2YXIgaW50ZXJzZWN0aW9uID0gbmV3IGNjLlJlY3QoKTtcclxuICAgICAqIGEuaW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgYik7IC8vIGludGVyc2VjdGlvbiB7eDogMCwgeTogMTAsIHdpZHRoOiAxMCwgaGVpZ2h0OiAxMH07XHJcbiAgICAgKi9cclxuICAgIGludGVyc2VjdGlvbiAob3V0OiBSZWN0LCByZWN0QjogUmVjdCk6IFJlY3Qge1xyXG4gICAgICAgIHZhciBheE1pbiA9IHRoaXMueCwgYXlNaW4gPSB0aGlzLnksIGF4TWF4ID0gdGhpcy54ICsgdGhpcy53aWR0aCwgYXlNYXggPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgICAgICB2YXIgYnhNaW4gPSByZWN0Qi54LCBieU1pbiA9IHJlY3RCLnksIGJ4TWF4ID0gcmVjdEIueCArIHJlY3RCLndpZHRoLCBieU1heCA9IHJlY3RCLnkgKyByZWN0Qi5oZWlnaHQ7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLm1heChheE1pbiwgYnhNaW4pO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5tYXgoYXlNaW4sIGJ5TWluKTtcclxuICAgICAgICBvdXQud2lkdGggPSBNYXRoLm1pbihheE1heCwgYnhNYXgpIC0gb3V0Lng7XHJcbiAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWluKGF5TWF4LCBieU1heCkgLSBvdXQueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHJlY3QgY29udGFpbnMgdGhlIGdpdmVuIHBvaW50XHJcbiAgICAgKiAhI3poIOW9k+WJjeefqeW9ouaYr+WQpuWMheWQq+aMh+WumuWdkOagh+eCueOAglxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpbnNpZGUgdGhpcyByZWN0YW5nbGUuXHJcbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50XHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBhID0gbmV3IGNjLlJlY3QoMCwgMCwgMTAsIDEwKTtcclxuICAgICAqIHZhciBiID0gbmV3IGNjLlZlYzIoMCwgNSk7XHJcbiAgICAgKiBhLmNvbnRhaW5zKGIpOy8vIHRydWVcclxuICAgICAqL1xyXG4gICAgY29udGFpbnMgKHBvaW50OiBWZWMyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPD0gcG9pbnQueCAmJlxyXG4gICAgICAgICAgICB0aGlzLnggKyB0aGlzLndpZHRoID49IHBvaW50LnggJiZcclxuICAgICAgICAgICAgdGhpcy55IDw9IHBvaW50LnkgJiZcclxuICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9pbnQueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdHJ1ZSBpZiB0aGUgb3RoZXIgcmVjdCB0b3RhbGx5IGluc2lkZSB0aGlzIHJlY3RhbmdsZS5cclxuICAgICAqICEjemgg5b2T5YmN55+p5b2i5piv5ZCm5YyF5ZCr5oyH5a6a55+p5b2i44CCXHJcbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zUmVjdFxyXG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0XHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBhID0gbmV3IGNjLlJlY3QoMCwgMCwgMjAsIDIwKTtcclxuICAgICAqIHZhciBiID0gbmV3IGNjLlJlY3QoMCwgMCwgMTAsIDEwKTtcclxuICAgICAqIGEuY29udGFpbnNSZWN0KGIpOy8vIHRydWVcclxuICAgICAqL1xyXG4gICAgY29udGFpbnNSZWN0IChyZWN0OiBSZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPD0gcmVjdC54ICYmXHJcbiAgICAgICAgICAgIHRoaXMueCArIHRoaXMud2lkdGggPj0gcmVjdC54ICsgcmVjdC53aWR0aCAmJlxyXG4gICAgICAgICAgICB0aGlzLnkgPD0gcmVjdC55ICYmXHJcbiAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgc21hbGxlc3QgcmVjdGFuZ2xlIHRoYXQgY29udGFpbnMgdGhlIGN1cnJlbnQgcmVjdCBhbmQgdGhlIGdpdmVuIHJlY3QuXHJcbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWMheWQq+W9k+WJjeefqeW9ouWSjOaMh+WumuefqeW9oueahOacgOWwj+efqeW9ouOAglxyXG4gICAgICogQG1ldGhvZCB1bmlvblxyXG4gICAgICogQHBhcmFtIHtSZWN0fSBvdXQgU3RvcmVzIHRoZSByZXN1bHRcclxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdEJcclxuICAgICAqIEByZXR1cm4ge1JlY3R9IFJldHVybnMgdGhlIG91dCBwYXJhbWV0ZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDEwLCAyMCwgMjApO1xyXG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAxMCwgMTAsIDEwKTtcclxuICAgICAqIHZhciB1bmlvbiA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgKiBhLnVuaW9uKHVuaW9uLCBiKTsgLy8gdW5pb24ge3g6IDAsIHk6IDEwLCB3aWR0aDogMjAsIGhlaWdodDogMjB9O1xyXG4gICAgICovXHJcbiAgICB1bmlvbiAob3V0OiBSZWN0LCByZWN0QjogUmVjdCk6IFJlY3Qge1xyXG4gICAgICAgIHZhciBheCA9IHRoaXMueCwgYXkgPSB0aGlzLnksIGF3ID0gdGhpcy53aWR0aCwgYWggPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB2YXIgYnggPSByZWN0Qi54LCBieSA9IHJlY3RCLnksIGJ3ID0gcmVjdEIud2lkdGgsIGJoID0gcmVjdEIuaGVpZ2h0O1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5taW4oYXgsIGJ4KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWluKGF5LCBieSk7XHJcbiAgICAgICAgb3V0LndpZHRoID0gTWF0aC5tYXgoYXggKyBhdywgYnggKyBidykgLSBvdXQueDtcclxuICAgICAgICBvdXQuaGVpZ2h0ID0gTWF0aC5tYXgoYXkgKyBhaCwgYnkgKyBiaCkgLSBvdXQueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBcHBseSBtYXRyaXg0IHRvIHRoZSByZWN0LlxyXG4gICAgICogISN6aCDkvb/nlKggbWF0NCDlr7nnn6nlvaLov5vooYznn6npmLXovazmjaLjgIJcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0NFxyXG4gICAgICogQHBhcmFtIG91dCB7UmVjdH0gVGhlIG91dHB1dCByZWN0XHJcbiAgICAgKiBAcGFyYW0gbWF0IHtNYXQ0fSBUaGUgbWF0cml4NFxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm1NYXQ0IChvdXQ6IFJlY3QsIG1hdDogTWF0NCk6IFJlY3Qge1xyXG4gICAgICAgIGxldCBvbCA9IHRoaXMueDtcclxuICAgICAgICBsZXQgb2IgPSB0aGlzLnk7XHJcbiAgICAgICAgbGV0IG9yID0gb2wgKyB0aGlzLndpZHRoO1xyXG4gICAgICAgIGxldCBvdCA9IG9iICsgdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IG1hdG0gPSBtYXQubTtcclxuICAgICAgICBsZXQgbGJ4ID0gbWF0bVswXSAqIG9sICsgbWF0bVs0XSAqIG9iICsgbWF0bVsxMl07XHJcbiAgICAgICAgbGV0IGxieSA9IG1hdG1bMV0gKiBvbCArIG1hdG1bNV0gKiBvYiArIG1hdG1bMTNdO1xyXG4gICAgICAgIGxldCByYnggPSBtYXRtWzBdICogb3IgKyBtYXRtWzRdICogb2IgKyBtYXRtWzEyXTtcclxuICAgICAgICBsZXQgcmJ5ID0gbWF0bVsxXSAqIG9yICsgbWF0bVs1XSAqIG9iICsgbWF0bVsxM107XHJcbiAgICAgICAgbGV0IGx0eCA9IG1hdG1bMF0gKiBvbCArIG1hdG1bNF0gKiBvdCArIG1hdG1bMTJdO1xyXG4gICAgICAgIGxldCBsdHkgPSBtYXRtWzFdICogb2wgKyBtYXRtWzVdICogb3QgKyBtYXRtWzEzXTtcclxuICAgICAgICBsZXQgcnR4ID0gbWF0bVswXSAqIG9yICsgbWF0bVs0XSAqIG90ICsgbWF0bVsxMl07XHJcbiAgICAgICAgbGV0IHJ0eSA9IG1hdG1bMV0gKiBvciArIG1hdG1bNV0gKiBvdCArIG1hdG1bMTNdO1xyXG5cclxuICAgICAgICBsZXQgbWluWCA9IE1hdGgubWluKGxieCwgcmJ4LCBsdHgsIHJ0eCk7XHJcbiAgICAgICAgbGV0IG1heFggPSBNYXRoLm1heChsYngsIHJieCwgbHR4LCBydHgpO1xyXG4gICAgICAgIGxldCBtaW5ZID0gTWF0aC5taW4obGJ5LCByYnksIGx0eSwgcnR5KTtcclxuICAgICAgICBsZXQgbWF4WSA9IE1hdGgubWF4KGxieSwgcmJ5LCBsdHksIHJ0eSk7XHJcblxyXG4gICAgICAgIG91dC54ID0gbWluWDtcclxuICAgICAgICBvdXQueSA9IG1pblk7XHJcbiAgICAgICAgb3V0LndpZHRoID0gbWF4WCAtIG1pblg7XHJcbiAgICAgICAgb3V0LmhlaWdodCA9IG1heFkgLSBtaW5ZO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE91dHB1dCByZWN0IGluZm9ybWF0aW9ucyB0byBzdHJpbmdcclxuICAgICAqICEjemgg6L2s5o2i5Li65pa55L6/6ZiF6K+755qE5a2X56ym5LiyXHJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xyXG4gICAgICogYS50b1N0cmluZygpOy8vIFwiKDAuMDAsIDAuMDAsIDEwLjAwLCAxMC4wMClcIjtcclxuICAgICAqL1xyXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcoJyArIHRoaXMueC50b0ZpeGVkKDIpICsgJywgJyArIHRoaXMueS50b0ZpeGVkKDIpICsgJywgJyArIHRoaXMud2lkdGgudG9GaXhlZCgyKSArXHJcbiAgICAgICAgICAgICcsICcgKyB0aGlzLmhlaWdodC50b0ZpeGVkKDIpICsgJyknO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbWluaW11bSB4IHZhbHVlLCBlcXVhbHMgdG8gcmVjdC54XHJcbiAgICAgKiAhI3poIOefqeW9oiB4IOi9tOS4iueahOacgOWwj+WAvO+8jOetieS7t+S6jiByZWN0LnjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB4TWluXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgeE1pbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcclxuICAgIH1cclxuICAgIHNldCB4TWluICh2KSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCArPSB0aGlzLnggLSB2O1xyXG4gICAgICAgIHRoaXMueCA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqICEjZW4gVGhlIG1pbmltdW0geSB2YWx1ZSwgZXF1YWxzIHRvIHJlY3QueVxyXG4gICAgKiAhI3poIOefqeW9oiB5IOi9tOS4iueahOacgOWwj+WAvOOAglxyXG4gICAgKiBAcHJvcGVydHkgeU1pblxyXG4gICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgKi9cclxuICAgIGdldCB5TWluICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55O1xyXG4gICAgfVxyXG4gICAgc2V0IHlNaW4gKHYpIHtcclxuICAgICAgICB0aGlzLmhlaWdodCArPSB0aGlzLnkgLSB2O1xyXG4gICAgICAgIHRoaXMueSA9IHY7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiAhI2VuIFRoZSBtYXhpbXVtIHggdmFsdWUuXHJcbiAgICAqICEjemgg55+p5b2iIHgg6L205LiK55qE5pyA5aSn5YC844CCXHJcbiAgICAqIEBwcm9wZXJ0eSB4TWF4XHJcbiAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHhNYXggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyB0aGlzLndpZHRoO1xyXG4gICAgfVxyXG4gICAgc2V0IHhNYXggKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHZhbHVlIC0gdGhpcy54O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiAhI2VuIFRoZSBtYXhpbXVtIHkgdmFsdWUuXHJcbiAgICAqICEjemgg55+p5b2iIHkg6L205LiK55qE5pyA5aSn5YC844CCXHJcbiAgICAqIEBwcm9wZXJ0eSB5TWF4XHJcbiAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAqL1xyXG4gICAgZ2V0IHlNYXggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcclxuICAgIH1cclxuICAgIHNldCB5TWF4ICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqICEjZW4gVGhlIHBvc2l0aW9uIG9mIHRoZSBjZW50ZXIgb2YgdGhlIHJlY3RhbmdsZS5cclxuICAgICogISN6aCDnn6nlvaLnmoTkuK3lv4PngrnjgIJcclxuICAgICogQHByb3BlcnR5IHtWZWMyfSBjZW50ZXJcclxuICAgICovXHJcbiAgICBnZXQgY2VudGVyICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54ICsgdGhpcy53aWR0aCAqIDAuNSxcclxuICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgKiAwLjUpO1xyXG4gICAgfVxyXG4gICAgc2V0IGNlbnRlciAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnggPSB2YWx1ZS54IC0gdGhpcy53aWR0aCAqIDAuNTtcclxuICAgICAgICB0aGlzLnkgPSB2YWx1ZS55IC0gdGhpcy5oZWlnaHQgKiAwLjU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqICEjZW4gVGhlIFggYW5kIFkgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZS5cclxuICAgICogISN6aCDnn6nlvaLnmoQgeCDlkowgeSDlnZDmoIfjgIJcclxuICAgICogQHByb3BlcnR5IHtWZWMyfSBvcmlnaW5cclxuICAgICovXHJcbiAgICBnZXQgb3JpZ2luICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG4gICAgc2V0IG9yaWdpbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnggPSB2YWx1ZS54O1xyXG4gICAgICAgIHRoaXMueSA9IHZhbHVlLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqICEjZW4gV2lkdGggYW5kIGhlaWdodCBvZiB0aGUgcmVjdGFuZ2xlLlxyXG4gICAgKiAhI3poIOefqeW9oueahOWkp+Wwj+OAglxyXG4gICAgKiBAcHJvcGVydHkge1NpemV9IHNpemVcclxuICAgICovXHJcbiAgICBnZXQgc2l6ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIHNldCBzaXplICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHZhbHVlLmhlaWdodDtcclxuICAgIH1cclxufVxyXG5cclxuQ0NDbGFzcy5mYXN0RGVmaW5lKCdjYy5SZWN0JywgUmVjdCwgeyB4OiAwLCB5OiAwLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xyXG5jYy5SZWN0ID0gUmVjdDtcclxuXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlY3QuXHJcbiAqIHNlZSB7eyNjcm9zc0xpbmsgXCJSZWN0L1JlY3Q6bWV0aG9kXCJ9fWNjLlJlY3R7ey9jcm9zc0xpbmt9fVxyXG4gKiAhI3poXHJcbiAqIOivpeaWueazleeUqOadpeW/q+mAn+WIm+W7uuS4gOS4quaWsOeahOefqeW9ouOAgnt7I2Nyb3NzTGluayBcIlJlY3QvUmVjdDptZXRob2RcIn19Y2MuUmVjdHt7L2Nyb3NzTGlua319XHJcbiAqIEBtZXRob2QgcmVjdFxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3g9MF1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFt5PTBdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbdz0wXVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW2g9MF1cclxuICogQHJldHVybiB7UmVjdH1cclxuICogQGV4YW1wbGVcclxuICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwICwgMCwgMTAsIDApO1xyXG4gKi9cclxuY2MucmVjdCA9IGZ1bmN0aW9uIHJlY3QgKHgsIHksIHcsIGgpIHtcclxuICAgIHJldHVybiBuZXcgUmVjdCh4LCB5LCB3LCBoKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=