
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/color.js';
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

var _misc = _interopRequireDefault(require("../utils/misc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * !#en
 * Representation of RGBA colors.
 *
 * Each color component is a floating point value with a range from 0 to 255.
 *
 * You can also use the convenience method {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} to create a new Color.
 *
 * !#zh
 * cc.Color 用于表示颜色。
 *
 * 它包含 RGBA 四个以浮点数保存的颜色分量，每个的值都在 0 到 255 之间。
 *
 * 您也可以通过使用 {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} 的便捷方法来创建一个新的 Color。
 *
 * @class Color
 * @extends ValueType
 */
var Color = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Color, _ValueType);

  /**
   * Copy content of a color into another.
   * @method copy
   * @typescript
   * copy (out: Color, a: Color): Color
   * @static
   */
  Color.copy = function copy(out, a) {
    out.r = a.r;
    out.g = a.g;
    out.b = a.b;
    out.a = a.a;
    return out;
  }
  /**
   * Clone a new color.
   * @method clone
   * @typescript
   * clone (a: Color): Color
   * @static
   */
  ;

  Color.clone = function clone(a) {
    return new Color(a.r, a.g, a.b, a.a);
  }
  /**
   * Set the components of a color to the given values.
   * @method set
   * @typescript
   * set (out: Color, r?: number, g?: number, b?: number, a?: number): Color
   * @static
   */
  ;

  Color.set = function set(out, r, g, b, a) {
    if (r === void 0) {
      r = 255;
    }

    if (g === void 0) {
      g = 255;
    }

    if (b === void 0) {
      b = 255;
    }

    if (a === void 0) {
      a = 255;
    }

    out.r = r;
    out.g = g;
    out.b = b;
    out.a = a;
    return out;
  }
  /**
   * Converts the hexadecimal formal color into rgb formal.
   * @method fromHex
   * @typescript
   * fromHex (out: Color, hex: number): Color
   * @static
   * @deprecated
   */
  ;

  Color.fromHex = function fromHex(out, hex) {
    var r = (hex >> 24) / 255.0;
    var g = (hex >> 16 & 0xff) / 255.0;
    var b = (hex >> 8 & 0xff) / 255.0;
    var a = (hex & 0xff) / 255.0;
    out.r = r;
    out.g = g;
    out.b = b;
    out.a = a;
    return out;
  }
  /**
   * Converts the hexadecimal formal color into rgb formal.
   * @method fromHEX
   * @typescript
   * fromHEX (out: Color, hex: string): Color
   * @static
   */
  ;

  Color.fromHEX = function fromHEX(out, hexString) {
    hexString = hexString.indexOf('#') === 0 ? hexString.substring(1) : hexString;
    out.r = parseInt(hexString.substr(0, 2), 16) || 0;
    out.g = parseInt(hexString.substr(2, 2), 16) || 0;
    out.b = parseInt(hexString.substr(4, 2), 16) || 0;
    out.a = parseInt(hexString.substr(6, 2), 16) || 255;
    out._val = (out.a << 24 >>> 0) + (out.b << 16) + (out.g << 8) + out.r;
    return out;
  }
  /**
   * Add components of two colors, respectively.
   * @method add
   * @typescript
   * add (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.add = function add(out, a, b) {
    out.r = a.r + b.r;
    out.g = a.g + b.g;
    out.b = a.b + b.b;
    out.a = a.a + b.a;
    return out;
  }
  /**
   * Subtract components of color b from components of color a, respectively.
   * @method subtract
   * @typescript
   * subtract (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.subtract = function subtract(out, a, b) {
    out.r = a.r - b.r;
    out.g = a.g - b.g;
    out.b = a.b - b.b;
    out.a = a.a - b.a;
    return out;
  }
  /**
   * Multiply components of two colors, respectively.
   * @method multiply
   * @typescript
   * multiply (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.multiply = function multiply(out, a, b) {
    out.r = a.r * b.r;
    out.g = a.g * b.g;
    out.b = a.b * b.b;
    out.a = a.a * b.a;
    return out;
  }
  /**
   * Divide components of color a by components of color b, respectively.
   * @method divide
   * @typescript
   * divide (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.divide = function divide(out, a, b) {
    out.r = a.r / b.r;
    out.g = a.g / b.g;
    out.b = a.b / b.b;
    out.a = a.a / b.a;
    return out;
  }
  /**
   * Scales a color by a number.
   * @method scale
   * @typescript
   * scale (out: Color, a: Color, b: number): Color
   * @static
   */
  ;

  Color.scale = function scale(out, a, b) {
    out.r = a.r * b;
    out.g = a.g * b;
    out.b = a.b * b;
    out.a = a.a * b;
    return out;
  }
  /**
   * Performs a linear interpolation between two colors.
   * @method lerp
   * @typescript
   * lerp (out: Color, a: Color, b: Color, t: number): Color
   * @static
   */
  ;

  Color.lerp = function lerp(out, a, b, t) {
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        aa = a.a;
    out.r = ar + t * (b.r - ar);
    out.g = ag + t * (b.g - ag);
    out.b = ab + t * (b.b - ab);
    out.a = aa + t * (b.a - aa);
    return out;
  }
  /**
   * !#zh 颜色转数组
   * !#en Turn an array of colors
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, a: IColorLike, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Color.toArray = function toArray(out, a, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var scale = a instanceof Color || a.a > 1 ? 1 / 255 : 1;
    out[ofs + 0] = a.r * scale;
    out[ofs + 1] = a.g * scale;
    out[ofs + 2] = a.b * scale;
    out[ofs + 3] = a.a * scale;
    return out;
  }
  /**
   * !#zh 数组转颜色
   * !#en An array of colors turn
   * @method fromArray
   * @typescript
   * fromArray <Out extends IColorLike> (arr: IWritableArrayLike<number>, out: Out, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Color.fromArray = function fromArray(arr, out, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.r = arr[ofs + 0] * 255;
    out.g = arr[ofs + 1] * 255;
    out.b = arr[ofs + 2] * 255;
    out.a = arr[ofs + 3] * 255;
    return out;
  }
  /**
   * !#zh 颜色 RGB 预乘 Alpha 通道
   * !#en RGB premultiply alpha channel
   * @method premultiplyAlpha
   * @typescript
   * premultiplyAlpha <Out extends IColorLike> (out: Out, a: IColorLike)
   * @param out 返回颜色
   * @param color 预乘处理的目标颜色
   * @static
   */
  ;

  Color.premultiplyAlpha = function premultiplyAlpha(out, color) {
    var alpha = color.a / 255.0;
    out.r = color.r * alpha;
    out.g = color.g * alpha;
    out.b = color.b * alpha;

    out._fastSetA(color.a);

    return out;
  };

  /**
   * @method constructor
   * @param {Number} [r=0] - red component of the color, default value is 0.
   * @param {Number} [g=0] - green component of the color, defualt value is 0.
   * @param {Number} [b=0] - blue component of the color, default value is 0.
   * @param {Number} [a=255] - alpha component of the color, default value is 255.
   */
  function Color(r, g, b, a) {
    var _this;

    if (r === void 0) {
      r = 0;
    }

    if (g === void 0) {
      g = 0;
    }

    if (b === void 0) {
      b = 0;
    }

    if (a === void 0) {
      a = 255;
    }

    _this = _ValueType.call(this) || this;
    _this._val = 0;

    if (typeof r === 'object') {
      g = r.g;
      b = r.b;
      a = r.a;
      r = r.r;
    }

    _this._val = (a << 24 >>> 0) + (b << 16) + (g << 8) + (r | 0);
    return _this;
  }
  /**
   * !#en Clone a new color from the current color.
   * !#zh 克隆当前颜色。
   * @method clone
   * @return {Color} Newly created color.
   * @example
   * var color = new cc.Color();
   * var newColor = color.clone();// Color {r: 0, g: 0, b: 0, a: 255}
   */


  var _proto = Color.prototype;

  _proto.clone = function clone() {
    var ret = new Color();
    ret._val = this._val;
    return ret;
  }
  /**
   * !#en TODO
   * !#zh 判断两个颜色是否相等。
   * @method equals
   * @param {Color} other
   * @return {Boolean}
   * @example
   * var color1 = cc.Color.WHITE;
   * var color2 = new cc.Color(255, 255, 255);
   * cc.log(color1.equals(color2)); // true;
   * color2 = cc.Color.RED;
   * cc.log(color2.equals(color1)); // false;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this._val === other._val;
  }
  /**
   * !#en TODO
   * !#zh 线性插值
   * @method lerp
   * @param {Color} to
   * @param {number} ratio - the interpolation coefficient.
   * @param {Color} [out] - optional, the receiving vector.
   * @return {Color}
   * @example {@link cocos2d/core/value-types/CCColor/lerp.js}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Color();
    var r = this.r;
    var g = this.g;
    var b = this.b;
    var a = this.a;
    out.r = r + (to.r - r) * ratio;
    out.g = g + (to.g - g) * ratio;
    out.b = b + (to.b - b) * ratio;
    out.a = a + (to.a - a) * ratio;
    return out;
  };

  /**
   * !#en TODO
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {String}
   * @example
   * var color = cc.Color.WHITE;
   * color.toString(); // "rgba(255, 255, 255, 255)"
   */
  _proto.toString = function toString() {
    return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
  };

  /**
   * !#en Gets red channel value
   * !#zh 获取当前颜色的红色值。
   * @method getR
   * @return {Number} red value.
   */
  _proto.getR = function getR() {
    return this._val & 0x000000ff;
  }
  /**
   * !#en Sets red value and return the current color object
   * !#zh 设置当前的红色值，并返回当前对象。
   * @method setR
   * @param {Number} red - the new Red component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setR(255); // Color {r: 255, g: 0, b: 0, a: 255}
   */
  ;

  _proto.setR = function setR(red) {
    red = ~~_misc["default"].clampf(red, 0, 255);
    this._val = (this._val & 0xffffff00 | red) >>> 0;
    return this;
  }
  /**
   * !#en Gets green channel value
   * !#zh 获取当前颜色的绿色值。
   * @method getG
   * @return {Number} green value.
   */
  ;

  _proto.getG = function getG() {
    return (this._val & 0x0000ff00) >> 8;
  }
  /**
   * !#en Sets green value and return the current color object
   * !#zh 设置当前的绿色值，并返回当前对象。
   * @method setG
   * @param {Number} green - the new Green component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setG(255); // Color {r: 0, g: 255, b: 0, a: 255}
   */
  ;

  _proto.setG = function setG(green) {
    green = ~~_misc["default"].clampf(green, 0, 255);
    this._val = (this._val & 0xffff00ff | green << 8) >>> 0;
    return this;
  }
  /**
   * !#en Gets blue channel value
   * !#zh 获取当前颜色的蓝色值。
   * @method getB
   * @return {Number} blue value.
   */
  ;

  _proto.getB = function getB() {
    return (this._val & 0x00ff0000) >> 16;
  }
  /**
   * !#en Sets blue value and return the current color object
   * !#zh 设置当前的蓝色值，并返回当前对象。
   * @method setB
   * @param {Number} blue - the new Blue component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setB(255); // Color {r: 0, g: 0, b: 255, a: 255}
   */
  ;

  _proto.setB = function setB(blue) {
    blue = ~~_misc["default"].clampf(blue, 0, 255);
    this._val = (this._val & 0xff00ffff | blue << 16) >>> 0;
    return this;
  }
  /**
   * !#en Gets alpha channel value
   * !#zh 获取当前颜色的透明度值。
   * @method getA
   * @return {Number} alpha value.
   */
  ;

  _proto.getA = function getA() {
    return (this._val & 0xff000000) >>> 24;
  }
  /**
   * !#en Sets alpha value and return the current color object
   * !#zh 设置当前的透明度，并返回当前对象。
   * @method setA
   * @param {Number} alpha - the new Alpha component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setA(0); // Color {r: 0, g: 0, b: 0, a: 0}
   */
  ;

  _proto.setA = function setA(alpha) {
    alpha = ~~_misc["default"].clampf(alpha, 0, 255);
    this._val = (this._val & 0x00ffffff | alpha << 24) >>> 0;
    return this;
  }
  /**
   * !#en Convert color to css format.
   * !#zh 转换为 CSS 格式。
   * @method toCSS
   * @param {String} [opt="rgba"] - "rgba", "rgb", "#rgb" or "#rrggbb".
   * @return {String}
   * @example
   * var color = cc.Color.BLACK;
   * color.toCSS();          // "rgba(0,0,0,1.00)";
   * color.toCSS("rgba");    // "rgba(0,0,0,1.00)";
   * color.toCSS("rgb");     // "rgba(0,0,0)";
   * color.toCSS("#rgb");    // "#000";
   * color.toCSS("#rrggbb"); // "#000000";
   */
  ;

  _proto.toCSS = function toCSS(opt) {
    if (!opt || opt === 'rgba') {
      return "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255).toFixed(2) + ")";
    } else if (opt === 'rgb') {
      return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    } else {
      return '#' + this.toHEX(opt);
    }
  }
  /**
   * !#en Read hex string and store color data into the current color object, the hex string must be formated as rgba or rgb.
   * !#zh 读取 16 进制颜色。
   * @method fromHEX
   * @param {String} hexString
   * @return {Color}
   * @chainable
   * @example
   * var color = cc.Color.BLACK;
   * color.fromHEX("#FFFF33"); // Color {r: 255, g: 255, b: 51, a: 255};
   */
  ;

  _proto.fromHEX = function fromHEX(hexString) {
    hexString = hexString.indexOf('#') === 0 ? hexString.substring(1) : hexString;
    var r = parseInt(hexString.substr(0, 2), 16) || 0;
    var g = parseInt(hexString.substr(2, 2), 16) || 0;
    var b = parseInt(hexString.substr(4, 2), 16) || 0;
    var a = parseInt(hexString.substr(6, 2), 16) || 255;
    this._val = (a << 24 >>> 0) + (b << 16) + (g << 8) + r;
    return this;
  }
  /**
   * !#en convert Color to HEX color string.
   * !#zh 转换为 16 进制。
   * @method toHEX
   * @param {String} [fmt="#rrggbb"] - "#rgb", "#rrggbb" or "#rrggbbaa".
   * @return {String}
   * @example
   * var color = cc.Color.BLACK;
   * color.toHEX("#rgb");     // "000";
   * color.toHEX("#rrggbb");  // "000000";
   */
  ;

  _proto.toHEX = function toHEX(fmt) {
    var prefix = '0'; // #rrggbb

    var hex = [(this.r < 16 ? prefix : '') + this.r.toString(16), (this.g < 16 ? prefix : '') + this.g.toString(16), (this.b < 16 ? prefix : '') + this.b.toString(16)];

    if (fmt === '#rgb') {
      hex[0] = hex[0][0];
      hex[1] = hex[1][0];
      hex[2] = hex[2][0];
    } else if (fmt === '#rrggbbaa') {
      hex.push((this.a < 16 ? prefix : '') + this.a.toString(16));
    }

    return hex.join('');
  };

  /**
   * !#en Convert to 24bit rgb value.
   * !#zh 转换为 24bit 的 RGB 值。
   * @method toRGBValue
   * @return {Number}
   * @example
   * var color = cc.Color.YELLOW;
   * color.toRGBValue(); // 16771844;
   */
  _proto.toRGBValue = function toRGBValue() {
    return this._val & 0x00ffffff;
  }
  /**
   * !#en Read HSV model color and convert to RGB color
   * !#zh 读取 HSV（色彩模型）格式。
   * @method fromHSV
   * @param {Number} h
   * @param {Number} s
   * @param {Number} v
   * @return {Color}
   * @chainable
   * @example
   * var color = cc.Color.YELLOW;
   * color.fromHSV(0, 0, 1); // Color {r: 255, g: 255, b: 255, a: 255};
   */
  ;

  _proto.fromHSV = function fromHSV(h, s, v) {
    var r, g, b;

    if (s === 0) {
      r = g = b = v;
    } else {
      if (v === 0) {
        r = g = b = 0;
      } else {
        if (h === 1) h = 0;
        h *= 6;
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));

        switch (i) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;

          case 1:
            r = q;
            g = v;
            b = p;
            break;

          case 2:
            r = p;
            g = v;
            b = t;
            break;

          case 3:
            r = p;
            g = q;
            b = v;
            break;

          case 4:
            r = t;
            g = p;
            b = v;
            break;

          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
      }
    }

    r *= 255;
    g *= 255;
    b *= 255;
    this._val = (this.a << 24 >>> 0) + (b << 16) + (g << 8) + (r | 0);
    return this;
  }
  /**
   * !#en Transform to HSV model color
   * !#zh 转换为 HSV（色彩模型）格式。
   * @method toHSV
   * @return {Object} - {h: number, s: number, v: number}.
   * @example
   * var color = cc.Color.YELLOW;
   * color.toHSV(); // Object {h: 0.1533864541832669, s: 0.9843137254901961, v: 1};
   */
  ;

  _proto.toHSV = function toHSV() {
    var r = this.r / 255;
    var g = this.g / 255;
    var b = this.b / 255;
    var hsv = {
      h: 0,
      s: 0,
      v: 0
    };
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = 0;
    hsv.v = max;
    hsv.s = max ? (max - min) / max : 0;
    if (!hsv.s) hsv.h = 0;else {
      delta = max - min;
      if (r === max) hsv.h = (g - b) / delta;else if (g === max) hsv.h = 2 + (b - r) / delta;else hsv.h = 4 + (r - g) / delta;
      hsv.h /= 6;
      if (hsv.h < 0) hsv.h += 1.0;
    }
    return hsv;
  }
  /**
   * !#en Set the color
   * !#zh 设置颜色
   * @method set
   * @typescript
   * set (color: Color): Color
   * @param {Color} color
   */
  ;

  _proto.set = function set(color) {
    if (color._val) {
      this._val = color._val;
    } else {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a;
    }

    return this;
  };

  _proto._fastSetA = function _fastSetA(alpha) {
    this._val = (this._val & 0x00ffffff | alpha << 24) >>> 0;
  }
  /**
   * !#en Multiplies the current color by the specified color
   * !#zh 将当前颜色乘以与指定颜色
   * @method multiply
   * @return {Color}
   * @param {Color} other
   */
  ;

  _proto.multiply = function multiply(other) {
    var r = (this._val & 0x000000ff) * other.r >> 8;
    var g = (this._val & 0x0000ff00) * other.g >> 8;
    var b = (this._val & 0x00ff0000) * other.b >> 8;
    var a = ((this._val & 0xff000000) >>> 8) * other.a;
    this._val = a & 0xff000000 | b & 0x00ff0000 | g & 0x0000ff00 | r & 0x000000ff;
    return this;
  };

  _createClass(Color, [{
    key: "r",
    get:
    /**
     * !#en Get or set red channel value
     * !#zh 获取或者设置红色通道
     * @property {number} r
     */
    function get() {
      return this.getR();
    },
    set: function set(v) {
      this.setR(v);
    }
    /**
     * !#en Get or set green channel value
     * !#zh 获取或者设置绿色通道
     * @property {number} g
     */

  }, {
    key: "g",
    get: function get() {
      return this.getG();
    },
    set: function set(v) {
      this.setG(v);
    }
    /**
     * !#en Get or set blue channel value
     * !#zh 获取或者设置蓝色通道
     * @property {number} b
     */

  }, {
    key: "b",
    get: function get() {
      return this.getB();
    },
    set: function set(v) {
      this.setB(v);
    }
    /**
     * !#en Get or set alpha channel value
     * !#zh 获取或者设置透明通道
     * @property {number} a
     */

  }, {
    key: "a",
    get: function get() {
      return this.getA();
    },
    set: function set(v) {
      this.setA(v);
    }
  }], [{
    key: "WHITE",
    get:
    /**
     * !#en Solid white, RGBA is [255, 255, 255, 255].
     * !#zh 纯白色，RGBA 是 [255, 255, 255, 255]。
     * @property WHITE
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(255, 255, 255, 255);
    }
  }, {
    key: "BLACK",
    get:
    /**
     * !#en Solid black, RGBA is [0, 0, 0, 255].
     * !#zh 纯黑色，RGBA 是 [0, 0, 0, 255]。
     * @property BLACK
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(0, 0, 0, 255);
    }
  }, {
    key: "TRANSPARENT",
    get:
    /**
     * !#en Transparent, RGBA is [0, 0, 0, 0].
     * !#zh 透明，RGBA 是 [0, 0, 0, 0]。
     * @property TRANSPARENT
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(0, 0, 0, 0);
    }
  }, {
    key: "GRAY",
    get:
    /**
     * !#en Grey, RGBA is [127.5, 127.5, 127.5].
     * !#zh 灰色，RGBA 是 [127.5, 127.5, 127.5]。
     * @property GRAY
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(127.5, 127.5, 127.5);
    }
  }, {
    key: "RED",
    get:
    /**
     * !#en Solid red, RGBA is [255, 0, 0].
     * !#zh 纯红色，RGBA 是 [255, 0, 0]。
     * @property RED
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(255, 0, 0);
    }
  }, {
    key: "GREEN",
    get:
    /**
     * !#en Solid green, RGBA is [0, 255, 0].
     * !#zh 纯绿色，RGBA 是 [0, 255, 0]。
     * @property GREEN
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(0, 255, 0);
    }
  }, {
    key: "BLUE",
    get:
    /**
     * !#en Solid blue, RGBA is [0, 0, 255].
     * !#zh 纯蓝色，RGBA 是 [0, 0, 255]。
     * @property BLUE
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(0, 0, 255);
    }
  }, {
    key: "YELLOW",
    get:
    /**
     * !#en Yellow, RGBA is [255, 235, 4].
     * !#zh 黄色，RGBA 是 [255, 235, 4]。
     * @property YELLOW
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(255, 235, 4);
    }
  }, {
    key: "ORANGE",
    get:
    /**
     * !#en Orange, RGBA is [255, 127, 0].
     * !#zh 橙色，RGBA 是 [255, 127, 0]。
     * @property ORANGE
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(255, 127, 0);
    }
  }, {
    key: "CYAN",
    get:
    /**
     * !#en Cyan, RGBA is [0, 255, 255].
     * !#zh 青色，RGBA 是 [0, 255, 255]。
     * @property CYAN
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(0, 255, 255);
    }
  }, {
    key: "MAGENTA",
    get:
    /**
     * !#en Magenta, RGBA is [255, 0, 255].
     * !#zh 洋红色（品红色），RGBA 是 [255, 0, 255]。
     * @property MAGENTA
     * @type {Color}
     * @static
     */
    function get() {
      return new Color(255, 0, 255);
    }
  }]);

  return Color;
}(_valueType["default"]);

exports["default"] = Color;
Color.div = Color.divide;
Color.sub = Color.subtract;
Color.mul = Color.multiply;
Color.WHITE_R = Color.WHITE;
Color.BLACK_R = Color.BLACK;
Color.TRANSPARENT_R = Color.TRANSPARENT;
Color.GRAY_R = Color.GRAY;
Color.RED_R = Color.RED;
Color.GREEN_R = Color.GREEN;
Color.BLUE_R = Color.BLUE;
Color.YELLOW_R = Color.YELLOW;
Color.ORANGE_R = Color.ORANGE;
Color.CYAN_R = Color.CYAN;
Color.MAGENTA_R = Color.MAGENTA;

_CCClass["default"].fastDefine('cc.Color', Color, {
  r: 0,
  g: 0,
  b: 0,
  a: 255
});

cc.Color = Color;
/**
 * @module cc
 */

/**
 * !#en
 * The convenience method to create a new {{#crossLink "Color/Color:method"}}cc.Color{{/crossLink}}
 * Alpha channel is optional. Default value is 255.
 *
 * !#zh
 * 通过该方法来创建一个新的 {{#crossLink "Color/Color:method"}}cc.Color{{/crossLink}} 对象。
 * Alpha 通道是可选的。默认值是 255。
 *
 * @method color
 * @param {Number} [r=0]
 * @param {Number} [g=0]
 * @param {Number} [b=0]
 * @param {Number} [a=255]
 * @return {Color}
 * @example {@link cocos2d/core/value-types/CCColor/color.js}
 */

cc.color = function color(r, g, b, a) {
  if (typeof r === 'string') {
    var result = new Color();
    return result.fromHEX(r);
  }

  if (typeof r === 'object') {
    return new Color(r.r, r.g, r.b, r.a);
  }

  return new Color(r, g, b, a);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxjb2xvci50cyJdLCJuYW1lcyI6WyJDb2xvciIsImNvcHkiLCJvdXQiLCJhIiwiciIsImciLCJiIiwiY2xvbmUiLCJzZXQiLCJmcm9tSGV4IiwiaGV4IiwiZnJvbUhFWCIsImhleFN0cmluZyIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJwYXJzZUludCIsInN1YnN0ciIsIl92YWwiLCJhZGQiLCJzdWJ0cmFjdCIsIm11bHRpcGx5IiwiZGl2aWRlIiwic2NhbGUiLCJsZXJwIiwidCIsImFyIiwiYWciLCJhYiIsImFhIiwidG9BcnJheSIsIm9mcyIsImZyb21BcnJheSIsImFyciIsInByZW11bHRpcGx5QWxwaGEiLCJjb2xvciIsImFscGhhIiwiX2Zhc3RTZXRBIiwicmV0IiwiZXF1YWxzIiwib3RoZXIiLCJ0byIsInJhdGlvIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwiZ2V0UiIsInNldFIiLCJyZWQiLCJtaXNjIiwiY2xhbXBmIiwiZ2V0RyIsInNldEciLCJncmVlbiIsImdldEIiLCJzZXRCIiwiYmx1ZSIsImdldEEiLCJzZXRBIiwidG9DU1MiLCJvcHQiLCJ0b0hFWCIsImZtdCIsInByZWZpeCIsInB1c2giLCJqb2luIiwidG9SR0JWYWx1ZSIsImZyb21IU1YiLCJoIiwicyIsInYiLCJpIiwiTWF0aCIsImZsb29yIiwiZiIsInAiLCJxIiwidG9IU1YiLCJoc3YiLCJtYXgiLCJtaW4iLCJkZWx0YSIsIlZhbHVlVHlwZSIsImRpdiIsInN1YiIsIm11bCIsIldISVRFX1IiLCJXSElURSIsIkJMQUNLX1IiLCJCTEFDSyIsIlRSQU5TUEFSRU5UX1IiLCJUUkFOU1BBUkVOVCIsIkdSQVlfUiIsIkdSQVkiLCJSRURfUiIsIlJFRCIsIkdSRUVOX1IiLCJHUkVFTiIsIkJMVUVfUiIsIkJMVUUiLCJZRUxMT1dfUiIsIllFTExPVyIsIk9SQU5HRV9SIiwiT1JBTkdFIiwiQ1lBTl9SIiwiQ1lBTiIsIk1B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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTRHLEVBQUUsQ0FBQzFFLEtBQUgsR0FBVyxTQUFTQSxLQUFULENBQWdCOUIsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkgsQ0FBekIsRUFBNEI7QUFDbkMsTUFBSSxPQUFPQyxDQUFQLEtBQWEsUUFBakIsRUFBMkI7QUFDdkIsUUFBSXlHLE1BQU0sR0FBRyxJQUFJN0csS0FBSixFQUFiO0FBQ0EsV0FBTzZHLE1BQU0sQ0FBQ2xHLE9BQVAsQ0FBZVAsQ0FBZixDQUFQO0FBQ0g7O0FBQ0QsTUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBakIsRUFBMkI7QUFDdkIsV0FBTyxJQUFJSixLQUFKLENBQVVJLENBQUMsQ0FBQ0EsQ0FBWixFQUFlQSxDQUFDLENBQUNDLENBQWpCLEVBQW9CRCxDQUFDLENBQUNFLENBQXRCLEVBQXlCRixDQUFDLENBQUNELENBQTNCLENBQVA7QUFDSDs7QUFDRCxTQUFPLElBQUlILEtBQUosQ0FBVUksQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxDQUFoQixFQUFtQkgsQ0FBbkIsQ0FBUDtBQUNILENBVEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XHJcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xyXG5pbXBvcnQgbWlzYyBmcm9tICcuLi91dGlscy9taXNjJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJlcHJlc2VudGF0aW9uIG9mIFJHQkEgY29sb3JzLlxyXG4gKlxyXG4gKiBFYWNoIGNvbG9yIGNvbXBvbmVudCBpcyBhIGZsb2F0aW5nIHBvaW50IHZhbHVlIHdpdGggYSByYW5nZSBmcm9tIDAgdG8gMjU1LlxyXG4gKlxyXG4gKiBZb3UgY2FuIGFsc28gdXNlIHRoZSBjb252ZW5pZW5jZSBtZXRob2Qge3sjY3Jvc3NMaW5rIFwiY2MvY29sb3I6bWV0aG9kXCJ9fWNjLmNvbG9ye3svY3Jvc3NMaW5rfX0gdG8gY3JlYXRlIGEgbmV3IENvbG9yLlxyXG4gKlxyXG4gKiAhI3poXHJcbiAqIGNjLkNvbG9yIOeUqOS6juihqOekuuminOiJsuOAglxyXG4gKlxyXG4gKiDlroPljIXlkKsgUkdCQSDlm5vkuKrku6Xmta7ngrnmlbDkv53lrZjnmoTpopzoibLliIbph4/vvIzmr4/kuKrnmoTlgLzpg73lnKggMCDliLAgMjU1IOS5i+mXtOOAglxyXG4gKlxyXG4gKiDmgqjkuZ/lj6/ku6XpgJrov4fkvb/nlKgge3sjY3Jvc3NMaW5rIFwiY2MvY29sb3I6bWV0aG9kXCJ9fWNjLmNvbG9ye3svY3Jvc3NMaW5rfX0g55qE5L6/5o235pa55rOV5p2l5Yib5bu65LiA5Liq5paw55qEIENvbG9y44CCXHJcbiAqXHJcbiAqIEBjbGFzcyBDb2xvclxyXG4gKiBAZXh0ZW5kcyBWYWx1ZVR5cGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yIGV4dGVuZHMgVmFsdWVUeXBlIHtcclxuICAgIHN0YXRpYyBkaXYgPSBDb2xvci5kaXZpZGU7XHJcbiAgICBzdGF0aWMgc3ViID0gQ29sb3Iuc3VidHJhY3Q7XHJcbiAgICBzdGF0aWMgbXVsID0gQ29sb3IubXVsdGlwbHk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNvbGlkIHdoaXRlLCBSR0JBIGlzIFsyNTUsIDI1NSwgMjU1LCAyNTVdLlxyXG4gICAgICogISN6aCDnuq/nmb3oibLvvIxSR0JBIOaYryBbMjU1LCAyNTUsIDI1NSwgMjU1XeOAglxyXG4gICAgICogQHByb3BlcnR5IFdISVRFXHJcbiAgICAgKiBAdHlwZSB7Q29sb3J9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgV0hJVEUgKCkgeyByZXR1cm4gbmV3IENvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7IH1cclxuICAgIHN0YXRpYyByZWFkb25seSBXSElURV9SOiBDb2xvciA9IENvbG9yLldISVRFO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTb2xpZCBibGFjaywgUkdCQSBpcyBbMCwgMCwgMCwgMjU1XS5cclxuICAgICAqICEjemgg57qv6buR6Imy77yMUkdCQSDmmK8gWzAsIDAsIDAsIDI1NV3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBCTEFDS1xyXG4gICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IEJMQUNLICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAyNTUpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQkxBQ0tfUjogQ29sb3IgPSBDb2xvci5CTEFDSztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVHJhbnNwYXJlbnQsIFJHQkEgaXMgWzAsIDAsIDAsIDBdLlxyXG4gICAgICogISN6aCDpgI/mmI7vvIxSR0JBIOaYryBbMCwgMCwgMCwgMF3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBUUkFOU1BBUkVOVFxyXG4gICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IFRSQU5TUEFSRU5UICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAwKTsgfVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFRSQU5TUEFSRU5UX1I6IENvbG9yID0gQ29sb3IuVFJBTlNQQVJFTlQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdyZXksIFJHQkEgaXMgWzEyNy41LCAxMjcuNSwgMTI3LjVdLlxyXG4gICAgICogISN6aCDngbDoibLvvIxSR0JBIOaYryBbMTI3LjUsIDEyNy41LCAxMjcuNV3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBHUkFZXHJcbiAgICAgKiBAdHlwZSB7Q29sb3J9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgR1JBWSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMTI3LjUsIDEyNy41LCAxMjcuNSk7IH1cclxuICAgIHN0YXRpYyByZWFkb25seSBHUkFZX1I6IENvbG9yID0gQ29sb3IuR1JBWTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU29saWQgcmVkLCBSR0JBIGlzIFsyNTUsIDAsIDBdLlxyXG4gICAgICogISN6aCDnuq/nuqLoibLvvIxSR0JBIOaYryBbMjU1LCAwLCAwXeOAglxyXG4gICAgICogQHByb3BlcnR5IFJFRFxyXG4gICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IFJFRCAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAwKTsgfVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJFRF9SOiBDb2xvciA9IENvbG9yLlJFRDtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTb2xpZCBncmVlbiwgUkdCQSBpcyBbMCwgMjU1LCAwXS5cclxuICAgICAqICEjemgg57qv57u/6Imy77yMUkdCQSDmmK8gWzAsIDI1NSwgMF3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBHUkVFTlxyXG4gICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IEdSRUVOICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDApOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgR1JFRU5fUjogQ29sb3IgPSBDb2xvci5HUkVFTjtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTb2xpZCBibHVlLCBSR0JBIGlzIFswLCAwLCAyNTVdLlxyXG4gICAgICogISN6aCDnuq/ok53oibLvvIxSR0JBIOaYryBbMCwgMCwgMjU1XeOAglxyXG4gICAgICogQHByb3BlcnR5IEJMVUVcclxuICAgICAqIEB0eXBlIHtDb2xvcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBCTFVFICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAyNTUpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgQkxVRV9SOiBDb2xvciA9IENvbG9yLkJMVUU7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gWWVsbG93LCBSR0JBIGlzIFsyNTUsIDIzNSwgNF0uXHJcbiAgICAgKiAhI3poIOm7hOiJsu+8jFJHQkEg5pivIFsyNTUsIDIzNSwgNF3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBZRUxMT1dcclxuICAgICAqIEB0eXBlIHtDb2xvcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBZRUxMT1cgKCkgeyByZXR1cm4gbmV3IENvbG9yKDI1NSwgMjM1LCA0KTsgfVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IFlFTExPV19SOiBDb2xvciA9IENvbG9yLllFTExPVztcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBPcmFuZ2UsIFJHQkEgaXMgWzI1NSwgMTI3LCAwXS5cclxuICAgICAqICEjemgg5qmZ6Imy77yMUkdCQSDmmK8gWzI1NSwgMTI3LCAwXeOAglxyXG4gICAgICogQHByb3BlcnR5IE9SQU5HRVxyXG4gICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IE9SQU5HRSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAxMjcsIDApOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgT1JBTkdFX1I6IENvbG9yID0gQ29sb3IuT1JBTkdFO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEN5YW4sIFJHQkEgaXMgWzAsIDI1NSwgMjU1XS5cclxuICAgICAqICEjemgg6Z2S6Imy77yMUkdCQSDmmK8gWzAsIDI1NSwgMjU1XeOAglxyXG4gICAgICogQHByb3BlcnR5IENZQU5cclxuICAgICAqIEB0eXBlIHtDb2xvcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBDWUFOICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDI1NSk7IH1cclxuICAgIHN0YXRpYyByZWFkb25seSBDWUFOX1I6IENvbG9yID0gQ29sb3IuQ1lBTjtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNYWdlbnRhLCBSR0JBIGlzIFsyNTUsIDAsIDI1NV0uXHJcbiAgICAgKiAhI3poIOa0i+e6ouiJsu+8iOWTgee6ouiJsu+8ie+8jFJHQkEg5pivIFsyNTUsIDAsIDI1NV3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBNQUdFTlRBXHJcbiAgICAgKiBAdHlwZSB7Q29sb3J9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgTUFHRU5UQSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAyNTUpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgTUFHRU5UQV9SOiBDb2xvciA9IENvbG9yLk1BR0VOVEE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IGNvbnRlbnQgb2YgYSBjb2xvciBpbnRvIGFub3RoZXIuXHJcbiAgICAgKiBAbWV0aG9kIGNvcHlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb3B5IChvdXQ6IENvbG9yLCBhOiBDb2xvcik6IENvbG9yXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb3B5IChvdXQ6IENvbG9yLCBhOiBDb2xvcik6IENvbG9yIHtcclxuICAgICAgICBvdXQuciA9IGEucjtcclxuICAgICAgICBvdXQuZyA9IGEuZztcclxuICAgICAgICBvdXQuYiA9IGEuYjtcclxuICAgICAgICBvdXQuYSA9IGEuYTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmUgYSBuZXcgY29sb3IuXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2xvbmUgKGE6IENvbG9yKTogQ29sb3JcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb25lIChhOiBDb2xvcik6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKGEuciwgYS5nLCBhLmIsIGEuYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBjb2xvciB0byB0aGUgZ2l2ZW4gdmFsdWVzLlxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzZXQgKG91dDogQ29sb3IsIHI/OiBudW1iZXIsIGc/OiBudW1iZXIsIGI/OiBudW1iZXIsIGE/OiBudW1iZXIpOiBDb2xvclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0IChvdXQ6IENvbG9yLCByID0gMjU1LCBnID0gMjU1LCBiID0gMjU1LCBhID0gMjU1KTogQ29sb3Ige1xyXG4gICAgICAgIG91dC5yID0gcjtcclxuICAgICAgICBvdXQuZyA9IGc7XHJcbiAgICAgICAgb3V0LmIgPSBiO1xyXG4gICAgICAgIG91dC5hID0gYTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhlIGhleGFkZWNpbWFsIGZvcm1hbCBjb2xvciBpbnRvIHJnYiBmb3JtYWwuXHJcbiAgICAgKiBAbWV0aG9kIGZyb21IZXhcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tSGV4IChvdXQ6IENvbG9yLCBoZXg6IG51bWJlcik6IENvbG9yXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbUhleCAob3V0OiBDb2xvciwgaGV4OiBudW1iZXIpOiBDb2xvciB7XHJcbiAgICAgICAgbGV0IHIgPSAoKGhleCA+PiAyNCkpIC8gMjU1LjA7XHJcbiAgICAgICAgbGV0IGcgPSAoKGhleCA+PiAxNikgJiAweGZmKSAvIDI1NS4wO1xyXG4gICAgICAgIGxldCBiID0gKChoZXggPj4gOCkgJiAweGZmKSAvIDI1NS4wO1xyXG4gICAgICAgIGxldCBhID0gKChoZXgpICYgMHhmZikgLyAyNTUuMDtcclxuXHJcbiAgICAgICAgb3V0LnIgPSByO1xyXG4gICAgICAgIG91dC5nID0gZztcclxuICAgICAgICBvdXQuYiA9IGI7XHJcbiAgICAgICAgb3V0LmEgPSBhO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyB0aGUgaGV4YWRlY2ltYWwgZm9ybWFsIGNvbG9yIGludG8gcmdiIGZvcm1hbC5cclxuICAgICAqIEBtZXRob2QgZnJvbUhFWFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21IRVggKG91dDogQ29sb3IsIGhleDogc3RyaW5nKTogQ29sb3JcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21IRVggKG91dDogQ29sb3IsIGhleFN0cmluZzogc3RyaW5nKTogQ29sb3Ige1xyXG4gICAgICAgIGhleFN0cmluZyA9IChoZXhTdHJpbmcuaW5kZXhPZignIycpID09PSAwKSA/IGhleFN0cmluZy5zdWJzdHJpbmcoMSkgOiBoZXhTdHJpbmc7XHJcbiAgICAgICAgb3V0LnIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDAsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBvdXQuZyA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMiwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIG91dC5iID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgb3V0LmEgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDYsIDIpLCAxNikgfHwgMjU1O1xyXG4gICAgICAgIG91dC5fdmFsID0gKChvdXQuYSA8PCAyNCkgPj4+IDApICsgKG91dC5iIDw8IDE2KSArIChvdXQuZyA8PCA4KSArIG91dC5yO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgY29tcG9uZW50cyBvZiB0d28gY29sb3JzLCByZXNwZWN0aXZlbHkuXHJcbiAgICAgKiBAbWV0aG9kIGFkZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGFkZCAob3V0OiBDb2xvciwgYTogQ29sb3IsIGI6IENvbG9yKTogQ29sb3JcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZCAob3V0OiBDb2xvciwgYTogQ29sb3IsIGI6IENvbG9yKTogQ29sb3Ige1xyXG4gICAgICAgIG91dC5yID0gYS5yICsgYi5yO1xyXG4gICAgICAgIG91dC5nID0gYS5nICsgYi5nO1xyXG4gICAgICAgIG91dC5iID0gYS5iICsgYi5iO1xyXG4gICAgICAgIG91dC5hID0gYS5hICsgYi5hO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdWJ0cmFjdCBjb21wb25lbnRzIG9mIGNvbG9yIGIgZnJvbSBjb21wb25lbnRzIG9mIGNvbG9yIGEsIHJlc3BlY3RpdmVseS5cclxuICAgICAqIEBtZXRob2Qgc3VidHJhY3RcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzdWJ0cmFjdCAob3V0OiBDb2xvciwgYTogQ29sb3IsIGI6IENvbG9yKTogQ29sb3JcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHN1YnRyYWN0IChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvciB7XHJcbiAgICAgICAgb3V0LnIgPSBhLnIgLSBiLnI7XHJcbiAgICAgICAgb3V0LmcgPSBhLmcgLSBiLmc7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgLSBiLmI7XHJcbiAgICAgICAgb3V0LmEgPSBhLmEgLSBiLmE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGx5IGNvbXBvbmVudHMgb2YgdHdvIGNvbG9ycywgcmVzcGVjdGl2ZWx5LlxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5IChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbXVsdGlwbHkgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvcik6IENvbG9yIHtcclxuICAgICAgICBvdXQuciA9IGEuciAqIGIucjtcclxuICAgICAgICBvdXQuZyA9IGEuZyAqIGIuZztcclxuICAgICAgICBvdXQuYiA9IGEuYiAqIGIuYjtcclxuICAgICAgICBvdXQuYSA9IGEuYSAqIGIuYTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGl2aWRlIGNvbXBvbmVudHMgb2YgY29sb3IgYSBieSBjb21wb25lbnRzIG9mIGNvbG9yIGIsIHJlc3BlY3RpdmVseS5cclxuICAgICAqIEBtZXRob2QgZGl2aWRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGl2aWRlIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGl2aWRlIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvciB7XHJcbiAgICAgICAgb3V0LnIgPSBhLnIgLyBiLnI7XHJcbiAgICAgICAgb3V0LmcgPSBhLmcgLyBiLmc7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgLyBiLmI7XHJcbiAgICAgICAgb3V0LmEgPSBhLmEgLyBiLmE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjYWxlcyBhIGNvbG9yIGJ5IGEgbnVtYmVyLlxyXG4gICAgICogQG1ldGhvZCBzY2FsZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNjYWxlIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogbnVtYmVyKTogQ29sb3JcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNjYWxlIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogbnVtYmVyKTogQ29sb3Ige1xyXG4gICAgICAgIG91dC5yID0gYS5yICogYjtcclxuICAgICAgICBvdXQuZyA9IGEuZyAqIGI7XHJcbiAgICAgICAgb3V0LmIgPSBhLmIgKiBiO1xyXG4gICAgICAgIG91dC5hID0gYS5hICogYjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBjb2xvcnMuXHJcbiAgICAgKiBAbWV0aG9kIGxlcnBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZXJwIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IsIHQ6IG51bWJlcik6IENvbG9yXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZXJwIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IsIHQ6IG51bWJlcik6IENvbG9yIHtcclxuICAgICAgICBsZXQgYXIgPSBhLnIsXHJcbiAgICAgICAgICAgIGFnID0gYS5nLFxyXG4gICAgICAgICAgICBhYiA9IGEuYixcclxuICAgICAgICAgICAgYWEgPSBhLmE7XHJcbiAgICAgICAgb3V0LnIgPSBhciArIHQgKiAoYi5yIC0gYXIpO1xyXG4gICAgICAgIG91dC5nID0gYWcgKyB0ICogKGIuZyAtIGFnKTtcclxuICAgICAgICBvdXQuYiA9IGFiICsgdCAqIChiLmIgLSBhYik7XHJcbiAgICAgICAgb3V0LmEgPSBhYSArIHQgKiAoYi5hIC0gYWEpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOminOiJsui9rOaVsOe7hFxyXG4gICAgICogISNlbiBUdXJuIGFuIGFycmF5IG9mIGNvbG9yc1xyXG4gICAgICogQG1ldGhvZCB0b0FycmF5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgYTogSUNvbG9yTGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gb2ZzIOaVsOe7hOi1t+Wni+WBj+enu+mHj1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9BcnJheTxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCBhOiBJQ29sb3JMaWtlLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAoYSBpbnN0YW5jZW9mIENvbG9yIHx8IGEuYSA+IDEpID8gMSAvIDI1NSA6IDE7XHJcbiAgICAgICAgb3V0W29mcyArIDBdID0gYS5yICogc2NhbGU7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gYS5nICogc2NhbGU7XHJcbiAgICAgICAgb3V0W29mcyArIDJdID0gYS5iICogc2NhbGU7XHJcbiAgICAgICAgb3V0W29mcyArIDNdID0gYS5hICogc2NhbGU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5pWw57uE6L2s6aKc6ImyXHJcbiAgICAgKiAhI2VuIEFuIGFycmF5IG9mIGNvbG9ycyB0dXJuXHJcbiAgICAgKiBAbWV0aG9kIGZyb21BcnJheVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG91dDogT3V0LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQXJyYXk8T3V0IGV4dGVuZHMgSUNvbG9yTGlrZT4gKGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG91dDogT3V0LCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0LnIgPSBhcnJbb2ZzICsgMF0gKiAyNTU7XHJcbiAgICAgICAgb3V0LmcgPSBhcnJbb2ZzICsgMV0gKiAyNTU7XHJcbiAgICAgICAgb3V0LmIgPSBhcnJbb2ZzICsgMl0gKiAyNTU7XHJcbiAgICAgICAgb3V0LmEgPSBhcnJbb2ZzICsgM10gKiAyNTU7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6aKc6ImyIFJHQiDpooTkuZggQWxwaGEg6YCa6YGTXHJcbiAgICAgKiAhI2VuIFJHQiBwcmVtdWx0aXBseSBhbHBoYSBjaGFubmVsXHJcbiAgICAgKiBAbWV0aG9kIHByZW11bHRpcGx5QWxwaGFcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwcmVtdWx0aXBseUFscGhhIDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGE6IElDb2xvckxpa2UpXHJcbiAgICAgKiBAcGFyYW0gb3V0IOi/lOWbnuminOiJslxyXG4gICAgICogQHBhcmFtIGNvbG9yIOmihOS5mOWkhOeQhueahOebruagh+minOiJslxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcHJlbXVsdGlwbHlBbHBoYSAob3V0LCBjb2xvcikge1xyXG4gICAgICAgIGxldCBhbHBoYSA9IGNvbG9yLmEgLyAyNTUuMDtcclxuICAgICAgICBvdXQuciA9IGNvbG9yLnIgKiBhbHBoYTtcclxuICAgICAgICBvdXQuZyA9IGNvbG9yLmcgKiBhbHBoYTtcclxuICAgICAgICBvdXQuYiA9IGNvbG9yLmIgKiBhbHBoYTtcclxuXHJcbiAgICAgICAgb3V0Ll9mYXN0U2V0QShjb2xvci5hKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBfdmFsOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyPTBdIC0gcmVkIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZz0wXSAtIGdyZWVuIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZnVhbHQgdmFsdWUgaXMgMC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYj0wXSAtIGJsdWUgY29tcG9uZW50IG9mIHRoZSBjb2xvciwgZGVmYXVsdCB2YWx1ZSBpcyAwLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFthPTI1NV0gLSBhbHBoYSBjb21wb25lbnQgb2YgdGhlIGNvbG9yLCBkZWZhdWx0IHZhbHVlIGlzIDI1NS5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKHI6IENvbG9yIHwgbnVtYmVyID0gMCwgZzogbnVtYmVyID0gMCwgYjogbnVtYmVyID0gMCwgYTogbnVtYmVyID0gMjU1KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGcgPSByLmc7XHJcbiAgICAgICAgICAgIGIgPSByLmI7XHJcbiAgICAgICAgICAgIGEgPSByLmE7XHJcbiAgICAgICAgICAgIHIgPSByLnI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWwgPSAoKGEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgKHJ8MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENsb25lIGEgbmV3IGNvbG9yIGZyb20gdGhlIGN1cnJlbnQgY29sb3IuXHJcbiAgICAgKiAhI3poIOWFi+mahuW9k+WJjeminOiJsuOAglxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHJldHVybiB7Q29sb3J9IE5ld2x5IGNyZWF0ZWQgY29sb3IuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgKiB2YXIgbmV3Q29sb3IgPSBjb2xvci5jbG9uZSgpOy8vIENvbG9yIHtyOiAwLCBnOiAwLCBiOiAwLCBhOiAyNTV9XHJcbiAgICAgKi9cclxuICAgIGNsb25lICgpOiBDb2xvciB7XHJcbiAgICAgICAgdmFyIHJldCA9IG5ldyBDb2xvcigpO1xyXG4gICAgICAgIHJldC5fdmFsID0gdGhpcy5fdmFsO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRPRE9cclxuICAgICAqICEjemgg5Yik5pat5Lik5Liq6aKc6Imy5piv5ZCm55u4562J44CCXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHBhcmFtIHtDb2xvcn0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yMSA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICogdmFyIGNvbG9yMiA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAqIGNjLmxvZyhjb2xvcjEuZXF1YWxzKGNvbG9yMikpOyAvLyB0cnVlO1xyXG4gICAgICogY29sb3IyID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICogY2MubG9nKGNvbG9yMi5lcXVhbHMoY29sb3IxKSk7IC8vIGZhbHNlO1xyXG4gICAgICovXHJcbiAgICBlcXVhbHMgKG90aGVyOiBDb2xvcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLl92YWwgPT09IG90aGVyLl92YWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRPRE9cclxuICAgICAqICEjemgg57q/5oCn5o+S5YC8XHJcbiAgICAgKiBAbWV0aG9kIGxlcnBcclxuICAgICAqIEBwYXJhbSB7Q29sb3J9IHRvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5cclxuICAgICAqIEBwYXJhbSB7Q29sb3J9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLlxyXG4gICAgICogQHJldHVybiB7Q29sb3J9XHJcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL0NDQ29sb3IvbGVycC5qc31cclxuICAgICAqL1xyXG4gICAgbGVycCAodG86IENvbG9yLCByYXRpbzogbnVtYmVyLCBvdXQ/OiBDb2xvcik6IENvbG9yIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IENvbG9yKCk7XHJcbiAgICAgICAgdmFyIHIgPSB0aGlzLnI7XHJcbiAgICAgICAgdmFyIGcgPSB0aGlzLmc7XHJcbiAgICAgICAgdmFyIGIgPSB0aGlzLmI7XHJcbiAgICAgICAgdmFyIGEgPSB0aGlzLmE7XHJcbiAgICAgICAgb3V0LnIgPSByICsgKHRvLnIgLSByKSAqIHJhdGlvO1xyXG4gICAgICAgIG91dC5nID0gZyArICh0by5nIC0gZykgKiByYXRpbztcclxuICAgICAgICBvdXQuYiA9IGIgKyAodG8uYiAtIGIpICogcmF0aW87XHJcbiAgICAgICAgb3V0LmEgPSBhICsgKHRvLmEgLSBhKSAqIHJhdGlvO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUT0RPXHJcbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxyXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xyXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLldISVRFO1xyXG4gICAgICogY29sb3IudG9TdHJpbmcoKTsgLy8gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDI1NSlcIlxyXG4gICAgICovXHJcbiAgICB0b1N0cmluZyAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKFwiICtcclxuICAgICAgICAgICAgdGhpcy5yLnRvRml4ZWQoKSArIFwiLCBcIiArXHJcbiAgICAgICAgICAgIHRoaXMuZy50b0ZpeGVkKCkgKyBcIiwgXCIgK1xyXG4gICAgICAgICAgICB0aGlzLmIudG9GaXhlZCgpICsgXCIsIFwiICtcclxuICAgICAgICAgICAgdGhpcy5hLnRvRml4ZWQoKSArIFwiKVwiO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IG9yIHNldCByZWQgY2hhbm5lbCB2YWx1ZVxyXG4gICAgICogISN6aCDojrflj5bmiJbogIXorr7nva7nuqLoibLpgJrpgZNcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByXHJcbiAgICAgKi9cclxuICAgIGdldCByICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFIoKTtcclxuICAgIH1cclxuICAgIHNldCByICh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldFIodik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBvciBzZXQgZ3JlZW4gY2hhbm5lbCB2YWx1ZVxyXG4gICAgICogISN6aCDojrflj5bmiJbogIXorr7nva7nu7/oibLpgJrpgZNcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBnXHJcbiAgICAgKi9cclxuICAgIGdldCBnICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEcoKTtcclxuICAgIH1cclxuICAgIHNldCBnICh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNldEcodik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBvciBzZXQgYmx1ZSBjaGFubmVsIHZhbHVlXHJcbiAgICAgKiAhI3poIOiOt+WPluaIluiAheiuvue9ruiTneiJsumAmumBk1xyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJcclxuICAgICAqL1xyXG4gICAgZ2V0IGIgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QigpO1xyXG4gICAgfVxyXG4gICAgc2V0IGIgKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0Qih2KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IG9yIHNldCBhbHBoYSBjaGFubmVsIHZhbHVlXHJcbiAgICAgKiAhI3poIOiOt+WPluaIluiAheiuvue9rumAj+aYjumAmumBk1xyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGFcclxuICAgICAqL1xyXG4gICAgZ2V0IGEgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IGEgKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2V0QSh2KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyByZWQgY2hhbm5lbCB2YWx1ZVxyXG4gICAgICogISN6aCDojrflj5blvZPliY3popzoibLnmoTnuqLoibLlgLzjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0UlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSByZWQgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldFIgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbCAmIDB4MDAwMDAwZmY7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyByZWQgdmFsdWUgYW5kIHJldHVybiB0aGUgY3VycmVudCBjb2xvciBvYmplY3RcclxuICAgICAqICEjemgg6K6+572u5b2T5YmN55qE57qi6Imy5YC877yM5bm26L+U5Zue5b2T5YmN5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByZWQgLSB0aGUgbmV3IFJlZCBjb21wb25lbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtDb2xvcn0gdGhpcyBjb2xvci5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29sb3IgPSBuZXcgY2MuQ29sb3IoKTtcclxuICAgICAqIGNvbG9yLnNldFIoMjU1KTsgLy8gQ29sb3Ige3I6IDI1NSwgZzogMCwgYjogMCwgYTogMjU1fVxyXG4gICAgICovXHJcbiAgICBzZXRSIChyZWQpOiB0aGlzIHtcclxuICAgICAgICByZWQgPSB+fm1pc2MuY2xhbXBmKHJlZCwgMCwgMjU1KTtcclxuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmZmZmZmMDApIHwgcmVkKSA+Pj4gMDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIGdyZWVuIGNoYW5uZWwgdmFsdWVcclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6aKc6Imy55qE57u/6Imy5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEdcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gZ3JlZW4gdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGdldEcgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSA+PiA4O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgZ3JlZW4gdmFsdWUgYW5kIHJldHVybiB0aGUgY3VycmVudCBjb2xvciBvYmplY3RcclxuICAgICAqICEjemgg6K6+572u5b2T5YmN55qE57u/6Imy5YC877yM5bm26L+U5Zue5b2T5YmN5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEdcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBncmVlbiAtIHRoZSBuZXcgR3JlZW4gY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybiB7Q29sb3J9IHRoaXMgY29sb3IuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgKiBjb2xvci5zZXRHKDI1NSk7IC8vIENvbG9yIHtyOiAwLCBnOiAyNTUsIGI6IDAsIGE6IDI1NX1cclxuICAgICAqL1xyXG4gICAgc2V0RyAoZ3JlZW4pOiB0aGlzIHtcclxuICAgICAgICBncmVlbiA9IH5+bWlzYy5jbGFtcGYoZ3JlZW4sIDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmYwMGZmKSB8IChncmVlbiA8PCA4KSkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBibHVlIGNoYW5uZWwgdmFsdWVcclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6aKc6Imy55qE6JOd6Imy5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEJcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gYmx1ZSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0QiAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX3ZhbCAmIDB4MDBmZjAwMDApID4+IDE2O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgYmx1ZSB2YWx1ZSBhbmQgcmV0dXJuIHRoZSBjdXJyZW50IGNvbG9yIG9iamVjdFxyXG4gICAgICogISN6aCDorr7nva7lvZPliY3nmoTok53oibLlgLzvvIzlubbov5Tlm57lvZPliY3lr7nosaHjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0QlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJsdWUgLSB0aGUgbmV3IEJsdWUgY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybiB7Q29sb3J9IHRoaXMgY29sb3IuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgKiBjb2xvci5zZXRCKDI1NSk7IC8vIENvbG9yIHtyOiAwLCBnOiAwLCBiOiAyNTUsIGE6IDI1NX1cclxuICAgICAqL1xyXG4gICAgc2V0QiAoYmx1ZSk6IHRoaXMge1xyXG4gICAgICAgIGJsdWUgPSB+fm1pc2MuY2xhbXBmKGJsdWUsIDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmMDBmZmZmKSB8IChibHVlIDw8IDE2KSkgPj4+IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBhbHBoYSBjaGFubmVsIHZhbHVlXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeminOiJsueahOmAj+aYjuW6puWAvOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRBXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGFscGhhIHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBnZXRBICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fdmFsICYgMHhmZjAwMDAwMCkgPj4+IDI0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgYWxwaGEgdmFsdWUgYW5kIHJldHVybiB0aGUgY3VycmVudCBjb2xvciBvYmplY3RcclxuICAgICAqICEjemgg6K6+572u5b2T5YmN55qE6YCP5piO5bqm77yM5bm26L+U5Zue5b2T5YmN5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEFcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhbHBoYSAtIHRoZSBuZXcgQWxwaGEgY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybiB7Q29sb3J9IHRoaXMgY29sb3IuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XHJcbiAgICAgKiBjb2xvci5zZXRBKDApOyAvLyBDb2xvciB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cclxuICAgICAqL1xyXG4gICAgc2V0QSAoYWxwaGEpOiB0aGlzIHtcclxuICAgICAgICBhbHBoYSA9IH5+bWlzYy5jbGFtcGYoYWxwaGEsIDAsIDI1NSk7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweDAwZmZmZmZmKSB8IChhbHBoYSA8PCAyNCkpID4+PiAwO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb252ZXJ0IGNvbG9yIHRvIGNzcyBmb3JtYXQuXHJcbiAgICAgKiAhI3poIOi9rOaNouS4uiBDU1Mg5qC85byP44CCXHJcbiAgICAgKiBAbWV0aG9kIHRvQ1NTXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdD1cInJnYmFcIl0gLSBcInJnYmFcIiwgXCJyZ2JcIiwgXCIjcmdiXCIgb3IgXCIjcnJnZ2JiXCIuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgKiBjb2xvci50b0NTUygpOyAgICAgICAgICAvLyBcInJnYmEoMCwwLDAsMS4wMClcIjtcclxuICAgICAqIGNvbG9yLnRvQ1NTKFwicmdiYVwiKTsgICAgLy8gXCJyZ2JhKDAsMCwwLDEuMDApXCI7XHJcbiAgICAgKiBjb2xvci50b0NTUyhcInJnYlwiKTsgICAgIC8vIFwicmdiYSgwLDAsMClcIjtcclxuICAgICAqIGNvbG9yLnRvQ1NTKFwiI3JnYlwiKTsgICAgLy8gXCIjMDAwXCI7XHJcbiAgICAgKiBjb2xvci50b0NTUyhcIiNycmdnYmJcIik7IC8vIFwiIzAwMDAwMFwiO1xyXG4gICAgICovXHJcbiAgICB0b0NTUyAob3B0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghb3B0IHx8IG9wdCA9PT0gJ3JnYmEnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInJnYmEoXCIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yICsgXCIsXCIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nICsgXCIsXCIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iICsgXCIsXCIgK1xyXG4gICAgICAgICAgICAgICAgKHRoaXMuYSAvIDI1NSkudG9GaXhlZCgyKSArIFwiKVwiXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG9wdCA9PT0gJ3JnYicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwicmdiKFwiICtcclxuICAgICAgICAgICAgICAgIHRoaXMuciArIFwiLFwiICtcclxuICAgICAgICAgICAgICAgIHRoaXMuZyArIFwiLFwiICtcclxuICAgICAgICAgICAgICAgIHRoaXMuYiArIFwiKVwiXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJyMnICsgdGhpcy50b0hFWChvcHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVhZCBoZXggc3RyaW5nIGFuZCBzdG9yZSBjb2xvciBkYXRhIGludG8gdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0LCB0aGUgaGV4IHN0cmluZyBtdXN0IGJlIGZvcm1hdGVkIGFzIHJnYmEgb3IgcmdiLlxyXG4gICAgICogISN6aCDor7vlj5YgMTYg6L+b5Yi26aKc6Imy44CCXHJcbiAgICAgKiBAbWV0aG9kIGZyb21IRVhcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBoZXhTdHJpbmdcclxuICAgICAqIEByZXR1cm4ge0NvbG9yfVxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICogY29sb3IuZnJvbUhFWChcIiNGRkZGMzNcIik7IC8vIENvbG9yIHtyOiAyNTUsIGc6IDI1NSwgYjogNTEsIGE6IDI1NX07XHJcbiAgICAgKi9cclxuICAgIGZyb21IRVggKGhleFN0cmluZzogc3RyaW5nKTogdGhpcyB7XHJcbiAgICAgICAgaGV4U3RyaW5nID0gKGhleFN0cmluZy5pbmRleE9mKCcjJykgPT09IDApID8gaGV4U3RyaW5nLnN1YnN0cmluZygxKSA6IGhleFN0cmluZztcclxuICAgICAgICBsZXQgciA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMCwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIGxldCBnID0gcGFyc2VJbnQoaGV4U3RyaW5nLnN1YnN0cigyLCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgbGV0IGIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDQsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBsZXQgYSA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoNiwgMiksIDE2KSB8fCAyNTU7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIHI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGNvbnZlcnQgQ29sb3IgdG8gSEVYIGNvbG9yIHN0cmluZy5cclxuICAgICAqICEjemgg6L2s5o2i5Li6IDE2IOi/m+WItuOAglxyXG4gICAgICogQG1ldGhvZCB0b0hFWFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtmbXQ9XCIjcnJnZ2JiXCJdIC0gXCIjcmdiXCIsIFwiI3JyZ2diYlwiIG9yIFwiI3JyZ2diYmFhXCIuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XHJcbiAgICAgKiBjb2xvci50b0hFWChcIiNyZ2JcIik7ICAgICAvLyBcIjAwMFwiO1xyXG4gICAgICogY29sb3IudG9IRVgoXCIjcnJnZ2JiXCIpOyAgLy8gXCIwMDAwMDBcIjtcclxuICAgICAqL1xyXG4gICAgdG9IRVggKGZtdCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcHJlZml4ID0gJzAnO1xyXG4gICAgICAgIC8vICNycmdnYmJcclxuICAgICAgICBsZXQgaGV4ID0gW1xyXG4gICAgICAgICAgICAodGhpcy5yIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5yKS50b1N0cmluZygxNiksXHJcbiAgICAgICAgICAgICh0aGlzLmcgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLmcpLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgICAgKHRoaXMuYiA8IDE2ID8gcHJlZml4IDogJycpICsgKHRoaXMuYikudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgaWYgKGZtdCA9PT0gJyNyZ2InKSB7XHJcbiAgICAgICAgICAgIGhleFswXSA9IGhleFswXVswXTtcclxuICAgICAgICAgICAgaGV4WzFdID0gaGV4WzFdWzBdO1xyXG4gICAgICAgICAgICBoZXhbMl0gPSBoZXhbMl1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZtdCA9PT0gJyNycmdnYmJhYScpIHtcclxuICAgICAgICAgICAgaGV4LnB1c2goKHRoaXMuYSA8IDE2ID8gcHJlZml4IDogJycpICsgKHRoaXMuYSkudG9TdHJpbmcoMTYpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbnZlcnQgdG8gMjRiaXQgcmdiIHZhbHVlLlxyXG4gICAgICogISN6aCDovazmjaLkuLogMjRiaXQg55qEIFJHQiDlgLzjgIJcclxuICAgICAqIEBtZXRob2QgdG9SR0JWYWx1ZVxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLllFTExPVztcclxuICAgICAqIGNvbG9yLnRvUkdCVmFsdWUoKTsgLy8gMTY3NzE4NDQ7XHJcbiAgICAgKi9cclxuICAgIHRvUkdCVmFsdWUgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbCAmIDB4MDBmZmZmZmY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlYWQgSFNWIG1vZGVsIGNvbG9yIGFuZCBjb252ZXJ0IHRvIFJHQiBjb2xvclxyXG4gICAgICogISN6aCDor7vlj5YgSFNW77yI6Imy5b2p5qih5Z6L77yJ5qC85byP44CCXHJcbiAgICAgKiBAbWV0aG9kIGZyb21IU1ZcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZcclxuICAgICAqIEByZXR1cm4ge0NvbG9yfVxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLllFTExPVztcclxuICAgICAqIGNvbG9yLmZyb21IU1YoMCwgMCwgMSk7IC8vIENvbG9yIHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAyNTV9O1xyXG4gICAgICovXHJcbiAgICBmcm9tSFNWIChoLCBzLCB2KTogdGhpcyB7XHJcbiAgICAgICAgdmFyIHIsIGcsIGI7XHJcbiAgICAgICAgaWYgKHMgPT09IDApIHtcclxuICAgICAgICAgICAgciA9IGcgPSBiID0gdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh2ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByID0gZyA9IGIgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGggPT09IDEpIGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaCAqPSA2O1xyXG4gICAgICAgICAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGYgPSBoIC0gaTtcclxuICAgICAgICAgICAgICAgIHZhciBwID0gdiAqICgxIC0gcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcSA9IHYgKiAoMSAtIChzICogZikpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHQgPSB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSB0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSBxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gcTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgciAqPSAyNTU7XHJcbiAgICAgICAgZyAqPSAyNTU7XHJcbiAgICAgICAgYiAqPSAyNTU7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLmEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgKHJ8MCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYW5zZm9ybSB0byBIU1YgbW9kZWwgY29sb3JcclxuICAgICAqICEjemgg6L2s5o2i5Li6IEhTVu+8iOiJsuW9qeaooeWei++8ieagvOW8j+OAglxyXG4gICAgICogQG1ldGhvZCB0b0hTVlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSAtIHtoOiBudW1iZXIsIHM6IG51bWJlciwgdjogbnVtYmVyfS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY29sb3IgPSBjYy5Db2xvci5ZRUxMT1c7XHJcbiAgICAgKiBjb2xvci50b0hTVigpOyAvLyBPYmplY3Qge2g6IDAuMTUzMzg2NDU0MTgzMjY2OSwgczogMC45ODQzMTM3MjU0OTAxOTYxLCB2OiAxfTtcclxuICAgICAqL1xyXG4gICAgdG9IU1YgKCkge1xyXG4gICAgICAgIHZhciByID0gdGhpcy5yIC8gMjU1O1xyXG4gICAgICAgIHZhciBnID0gdGhpcy5nIC8gMjU1O1xyXG4gICAgICAgIHZhciBiID0gdGhpcy5iIC8gMjU1O1xyXG4gICAgICAgIHZhciBoc3YgPSB7IGg6IDAsIHM6IDAsIHY6IDAgfTtcclxuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XHJcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xyXG4gICAgICAgIHZhciBkZWx0YSA9IDA7XHJcbiAgICAgICAgaHN2LnYgPSBtYXg7XHJcbiAgICAgICAgaHN2LnMgPSBtYXggPyAobWF4IC0gbWluKSAvIG1heCA6IDA7XHJcbiAgICAgICAgaWYgKCFoc3YucykgaHN2LmggPSAwO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkZWx0YSA9IG1heCAtIG1pbjtcclxuICAgICAgICAgICAgaWYgKHIgPT09IG1heCkgaHN2LmggPSAoZyAtIGIpIC8gZGVsdGE7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaHN2LmggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xyXG4gICAgICAgICAgICBlbHNlIGhzdi5oID0gNCArIChyIC0gZykgLyBkZWx0YTtcclxuICAgICAgICAgICAgaHN2LmggLz0gNjtcclxuICAgICAgICAgICAgaWYgKGhzdi5oIDwgMCkgaHN2LmggKz0gMS4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaHN2O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGNvbG9yXHJcbiAgICAgKiAhI3poIOiuvue9ruminOiJslxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzZXQgKGNvbG9yOiBDb2xvcik6IENvbG9yXHJcbiAgICAgKiBAcGFyYW0ge0NvbG9yfSBjb2xvclxyXG4gICAgICovXHJcbiAgICBzZXQgKGNvbG9yOiBDb2xvcik6IHRoaXMge1xyXG4gICAgICAgIGlmIChjb2xvci5fdmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbCA9IGNvbG9yLl92YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnIgPSBjb2xvci5yO1xyXG4gICAgICAgICAgICB0aGlzLmcgPSBjb2xvci5nO1xyXG4gICAgICAgICAgICB0aGlzLmIgPSBjb2xvci5iO1xyXG4gICAgICAgICAgICB0aGlzLmEgPSBjb2xvci5hO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBfZmFzdFNldEEgKGFscGhhKSB7XHJcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweDAwZmZmZmZmKSB8IChhbHBoYSA8PCAyNCkpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHRoZSBjdXJyZW50IGNvbG9yIGJ5IHRoZSBzcGVjaWZpZWQgY29sb3JcclxuICAgICAqICEjemgg5bCG5b2T5YmN6aKc6Imy5LmY5Lul5LiO5oyH5a6a6aKc6ImyXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAcmV0dXJuIHtDb2xvcn1cclxuICAgICAqIEBwYXJhbSB7Q29sb3J9IG90aGVyXHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5IChvdGhlcjogQ29sb3IpIHtcclxuICAgICAgICBsZXQgciA9ICgodGhpcy5fdmFsICYgMHgwMDAwMDBmZikgKiBvdGhlci5yKSA+PiA4O1xyXG4gICAgICAgIGxldCBnID0gKCh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSAqIG90aGVyLmcpID4+IDg7XHJcbiAgICAgICAgbGV0IGIgPSAoKHRoaXMuX3ZhbCAmIDB4MDBmZjAwMDApICogb3RoZXIuYikgPj4gODtcclxuICAgICAgICBsZXQgYSA9ICgodGhpcy5fdmFsICYgMHhmZjAwMDAwMCkgPj4+IDgpICogb3RoZXIuYTtcclxuICAgICAgICB0aGlzLl92YWwgPSAoYSAmIDB4ZmYwMDAwMDApIHwgKGIgJiAweDAwZmYwMDAwKSB8IChnICYgMHgwMDAwZmYwMCkgfCAociAmIDB4MDAwMDAwZmYpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLkNvbG9yJywgQ29sb3IsIHsgcjogMCwgZzogMCwgYjogMCwgYTogMjU1IH0pO1xyXG5cclxuXHJcbmNjLkNvbG9yID0gQ29sb3I7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIkNvbG9yL0NvbG9yOm1ldGhvZFwifX1jYy5Db2xvcnt7L2Nyb3NzTGlua319XHJcbiAqIEFscGhhIGNoYW5uZWwgaXMgb3B0aW9uYWwuIERlZmF1bHQgdmFsdWUgaXMgMjU1LlxyXG4gKlxyXG4gKiAhI3poXHJcbiAqIOmAmui/h+ivpeaWueazleadpeWIm+W7uuS4gOS4quaWsOeahCB7eyNjcm9zc0xpbmsgXCJDb2xvci9Db2xvcjptZXRob2RcIn19Y2MuQ29sb3J7ey9jcm9zc0xpbmt9fSDlr7nosaHjgIJcclxuICogQWxwaGEg6YCa6YGT5piv5Y+v6YCJ55qE44CC6buY6K6k5YC85pivIDI1NeOAglxyXG4gKlxyXG4gKiBAbWV0aG9kIGNvbG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcj0wXVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW2c9MF1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtiPTBdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbYT0yNTVdXHJcbiAqIEByZXR1cm4ge0NvbG9yfVxyXG4gKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL0NDQ29sb3IvY29sb3IuanN9XHJcbiAqL1xyXG5jYy5jb2xvciA9IGZ1bmN0aW9uIGNvbG9yIChyLCBnLCBiLCBhKSB7XHJcbiAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBDb2xvcigpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQuZnJvbUhFWChyKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHIuciwgci5nLCByLmIsIHIuYSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIsIGEpO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==