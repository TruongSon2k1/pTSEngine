
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec2.js';
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

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _x = 0.0;
var _y = 0.0;
/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Vec2
 * @extends ValueType
 */

var Vec2 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec2, _ValueType);

  var _proto = Vec2.prototype;

  // deprecated

  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method mag
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.mag(); // return 14.142135623730951;
   */

  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method magSqr
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.magSqr(); // return 200;
   */

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec2} vector
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
   * var v1 = new Vec2;
   * v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};
   */
  _proto.sub = function sub(vector, out) {
    return Vec2.subtract(out || new Vec2(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.mulSelf(5);// return Vec2 {x: 50, y: 50};
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.mul(5);      // return Vec2 {x: 50, y: 50};
   * var v1 = new Vec2;
   * v.mul(5, v1);  // return Vec2 {x: 50, y: 50};
   */
  _proto.mul = function mul(num, out) {
    return Vec2.multiplyScalar(out || new Vec2(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.divSelf(5); // return Vec2 {x: 2, y: 2};
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.div(5);      // return Vec2 {x: 2, y: 2};
   * var v1 = new Vec2;
   * v.div(5, v1);  // return Vec2 {x: 2, y: 2};
   */
  _proto.div = function div(num, out) {
    return Vec2.multiplyScalar(out || new Vec2(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.scaleSelf(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec2} vector
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.scale(cc.v2(5, 5));      // return Vec2 {x: 50, y: 50};
   * var v1 = new Vec2;
   * v.scale(cc.v2(5, 5), v1);  // return Vec2 {x: 50, y: 50};
   */
  _proto.scale = function scale(vector, out) {
    return Vec2.multiply(out || new Vec2(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.negSelf(); // return Vec2 {x: -10, y: -10};
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * var v1 = new Vec2;
   * v.neg(v1);  // return Vec2 {x: -10, y: -10};
   */
  _proto.neg = function neg(out) {
    return Vec2.negate(out || new Vec2(), this);
  }
  /**
   * !#en return a Vec2 object with x = 1 and y = 1.
   * !#zh 新 Vec2 对象。
   * @property ONE
   * @type Vec2
   * @static
   */
  ;

  /**
   * !#zh 获得指定向量的拷贝
   * @method clone
   * @typescript
   * clone <Out extends IVec2Like> (a: Out): Vec2
   * @static
   */
  Vec2.clone = function clone(a) {
    return new Vec2(a.x, a.y);
  }
  /**
   * !#zh 复制指定向量的值
   * @method copy
   * @typescript
   * copy <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    return out;
  }
  /**
   * !#zh  设置向量值
   * @method set
   * @typescript
   * set <Out extends IVec2Like> (out: Out, x: number, y: number): Out
   * @static
   */
  ;

  Vec2.set = function set(out, x, y) {
    out.x = x;
    out.y = y;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * @method add
   * @typescript
   * add <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * @method subtract
   * @typescript
   * subtract <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法
   * @method multiply
   * @typescript
   * multiply <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * @method divide
   * @typescript
   * divide <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * @method ceil
   * @typescript
   * ceil <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * @method floor
   * @typescript
   * floor <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * @method min
   * @typescript
   * min <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * @method max
   * @typescript
   * max <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * @method round
   * @typescript
   * round <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * @method multiplyScalar
   * @typescript
   * multiplyScalar <Out extends IVec2Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Vec2.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd <Out extends IVec2Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec2.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * @method distance
   * @typescript
   * distance <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.distance = function distance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    return Math.sqrt(_x * _x + _y * _y);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * @method squaredDistance
   * @typescript
   * squaredDistance <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.squaredDistance = function squaredDistance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    return _x * _x + _y * _y;
  }
  /**
   * !#zh 求向量长度
   * @method len
   * @typescript
   * len <Out extends IVec2Like> (a: Out): number
   * @static
   */
  ;

  Vec2.len = function len(a) {
    _x = a.x;
    _y = a.y;
    return Math.sqrt(_x * _x + _y * _y);
  }
  /**
   * !#zh 求向量长度平方
   * @method lengthSqr
   * @typescript
   * lengthSqr <Out extends IVec2Like> (a: Out): number
   * @static
   */
  ;

  Vec2.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    return _x * _x + _y * _y;
  }
  /**
   * !#zh 逐元素向量取负
   * @method negate
   * @typescript
   * negate <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * @method inverse
   * @typescript
   * inverse <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * @method inverseSafe
   * @typescript
   * inverseSafe <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;

    if (Math.abs(_x) < _utils.EPSILON) {
      out.x = 0;
    } else {
      out.x = 1.0 / _x;
    }

    if (Math.abs(_y) < _utils.EPSILON) {
      out.y = 0;
    } else {
      out.y = 1.0 / _y;
    }

    return out;
  }
  /**
   * !#zh 归一化向量
   * @method normalize
   * @typescript
   * normalize <Out extends IVec2Like, Vec2Like extends IVec2Like> (out: Out, a: Vec2Like): Out
   * @static
   */
  ;

  Vec2.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    var len = _x * _x + _y * _y;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * @method dot
   * @typescript
   * dot <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  /**
   * !#zh 向量叉积（向量积），注意二维向量的叉积为与 Z 轴平行的三维向量
   * @method cross
   * @typescript
   * cross <Out extends IVec2Like> (out: Vec2, a: Out, b: Out): Vec2
   * @static
   */
  ;

  Vec2.cross = function cross(out, a, b) {
    out.x = out.y = 0;
    out.z = a.x * b.y - a.y * b.x;
    return out;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp <Out extends IVec2Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec2.lerp = function lerp(out, a, b, t) {
    _x = a.x;
    _y = a.y;
    out.x = _x + t * (b.x - _x);
    out.y = _y + t * (b.y - _y);
    return out;
  }
  /**
   * !#zh 生成一个在单位圆上均匀分布的随机向量
   * @method random
   * @typescript
   * random <Out extends IVec2Like> (out: Out, scale?: number): Out
   * @static
   */
  ;

  Vec2.random = function random(out, scale) {
    scale = scale || 1.0;
    var r = (0, _utils.random)() * 2.0 * Math.PI;
    out.x = Math.cos(r) * scale;
    out.y = Math.sin(r) * scale;
    return out;
  }
  /**
   * !#zh 向量与三维矩阵乘法，默认向量第三位为 1。
   * @method transformMat3
   * @typescript
   * transformMat3 <Out extends IVec2Like, MatLike extends IMat3Like> (out: Out, a: Out, mat: IMat3Like): Out
   * @static
   */
  ;

  Vec2.transformMat3 = function transformMat3(out, a, mat) {
    _x = a.x;
    _y = a.y;
    var m = mat.m;
    out.x = m[0] * _x + m[3] * _y + m[6];
    out.y = m[1] * _x + m[4] * _y + m[7];
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
   * @method transformMat4
   * @typescript
   * transformMat4 <Out extends IVec2Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec2.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    var m = mat.m;
    out.x = m[0] * _x + m[4] * _y + m[12];
    out.y = m[1] * _x + m[5] * _y + m[13];
    return out;
  }
  /**
   * !#zh 向量等价判断
   * @method strictEquals
   * @typescript
   * strictEquals <Out extends IVec2Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec2.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * @method equals
   * @typescript
   * equals <Out extends IVec2Like> (a: Out, b: Out,  epsilon?: number): boolean
   * @static
   */
  ;

  Vec2.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y));
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * @method angle
   * @typescript
   * angle <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.angle = function angle(a, b) {
    Vec2.normalize(v2_1, a);
    Vec2.normalize(v2_2, b);
    var cosine = Vec2.dot(v2_1, v2_2);

    if (cosine > 1.0) {
      return 0;
    }

    if (cosine < -1.0) {
      return Math.PI;
    }

    return Math.acos(cosine);
  }
  /**
   * !#zh 向量转数组
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec2Like, ofs?: number): Out
   * @static
   */
  ;

  Vec2.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    return out;
  }
  /**
   * !#zh 数组转向量
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec2Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @static
   */
  ;

  Vec2.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} or {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} 或者 {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
   * @method constructor
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   */
  function Vec2(x, y) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.mag = Vec2.prototype.len;
    _this.magSqr = Vec2.prototype.lengthSqr;
    _this.subSelf = Vec2.prototype.subtract;
    _this.mulSelf = Vec2.prototype.multiplyScalar;
    _this.divSelf = Vec2.prototype.divide;
    _this.scaleSelf = Vec2.prototype.multiply;
    _this.negSelf = Vec2.prototype.negate;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = 0;

    if (x && typeof x === 'object') {
      _this.x = x.x || 0;
      _this.y = x.y || 0;
    } else {
      _this.x = x || 0;
      _this.y = y || 0;
    }

    return _this;
  }
  /**
   * !#en clone a Vec2 object
   * !#zh 克隆一个 Vec2 对象
   * @method clone
   * @return {Vec2}
   */


  _proto.clone = function clone() {
    return new Vec2(this.x, this.y);
  }
  /**
   * !#en Sets vector with another's value
   * !#zh 设置向量值。
   * @method set
   * @param {Vec2} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    return this;
  }
  /**
   * !#en Check whether two vector equal
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec2} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
  /**
   * !#en Check whether two vector equal with some degree of variance.
   * !#zh
   * 近似判断两个点是否相等。<br/>
   * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Vec2} other
   * @param {Number} variance
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other, variance) {
    if (this.x - variance <= other.x && other.x <= this.x + variance) {
      if (this.y - variance <= other.y && other.y <= this.y + variance) return true;
    }

    return false;
  }
  /**
   * !#en Transform to string with vector informations
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 线性插值。
   * @method lerp
   * @param {Vec2} to
   * @param {Number} ratio - the interpolation coefficient
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Vec2();
    var x = this.x;
    var y = this.y;
    out.x = x + (to.x - x) * ratio;
    out.y = y + (to.y - y) * ratio;
    return out;
  }
  /**
   * !#en Clamp the vector between from float and to float.
   * !#zh
   * 返回指定限制区域后的向量。<br/>
   * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
   * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
   * 否则返回自身。
   * @method clampf
   * @param {Vec2} min_inclusive
   * @param {Vec2} max_inclusive
   * @return {Vec2}
   * @example
   * var min_inclusive = cc.v2(0, 0);
   * var max_inclusive = cc.v2(20, 20);
   * var v1 = cc.v2(20, 20).clampf(min_inclusive, max_inclusive); // Vec2 {x: 20, y: 20};
   * var v2 = cc.v2(0, 0).clampf(min_inclusive, max_inclusive);   // Vec2 {x: 0, y: 0};
   * var v3 = cc.v2(10, 10).clampf(min_inclusive, max_inclusive); // Vec2 {x: 10, y: 10};
   */
  ;

  _proto.clampf = function clampf(min_inclusive, max_inclusive) {
    this.x = _misc["default"].clampf(this.x, min_inclusive.x, max_inclusive.x);
    this.y = _misc["default"].clampf(this.y, min_inclusive.y, max_inclusive.y);
    return this;
  }
  /**
   * !#en Adds this vector.
   * !#zh 向量加法。
   * @method add
   * @param {Vec2} vector
   * @param {Vec2} [out]
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.add(cc.v2(5, 5));// return Vec2 {x: 15, y: 15};
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec2();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    return out;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  /**
   * !#en Subtracts one vector from this.
   * !#zh 向量减法。
   * @method subtract
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
   */
  ;

  _proto.subtract = function subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.multiply(5);// return Vec2 {x: 50, y: 50};
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.multiply(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.divide(5); // return Vec2 {x: 2, y: 2};
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反。
   * @method negate
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.negate(); // return Vec2 {x: -10, y: -10};
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec2} [vector]
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.dot(cc.v2(5, 5)); // return 100;
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec2} [vector]
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.cross(cc.v2(5, 5)); // return 0;
   */
  ;

  _proto.cross = function cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.len(); // return 14.142135623730951;
   */
  ;

  _proto.len = function len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.lengthSqr(); // return 200;
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.normalizeSelf(); // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    var magSqr = this.x * this.x + this.y * this.y;
    if (magSqr === 1.0) return this;

    if (magSqr === 0.0) {
      return this;
    }

    var invsqrt = 1.0 / Math.sqrt(magSqr);
    this.x *= invsqrt;
    this.y *= invsqrt;
    return this;
  }
  /**
   * !#en
   * Returns this vector with a magnitude of 1.<br/>
   * <br/>
   * Note that the current vector is unchanged and a new normalized vector is returned. If you want to normalize the current vector, use normalizeSelf function.
   * !#zh
   * 返回归一化后的向量。<br/>
   * <br/>
   * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
   * @method normalize
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} result
   * var v = cc.v2(10, 10);
   * v.normalize();   // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
   */
  ;

  _proto.normalize = function normalize(out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    out.normalizeSelf();
    return out;
  }
  /**
   * !#en Get angle in radian between this and vector.
   * !#zh 夹角的弧度。
   * @method angle
   * @param {Vec2} vector
   * @return {number} from 0 to Math.PI
   */
  ;

  _proto.angle = function angle(vector) {
    var magSqr1 = this.magSqr();
    var magSqr2 = vector.magSqr();

    if (magSqr1 === 0 || magSqr2 === 0) {
      console.warn("Can't get angle between zero vector");
      return 0.0;
    }

    var dot = this.dot(vector);
    var theta = dot / Math.sqrt(magSqr1 * magSqr2);
    theta = _misc["default"].clampf(theta, -1.0, 1.0);
    return Math.acos(theta);
  }
  /**
   * !#en Get angle in radian between this and vector with direction.
   * !#zh 带方向的夹角的弧度。
   * @method signAngle
   * @param {Vec2} vector
   * @return {number} from -MathPI to Math.PI
   */
  ;

  _proto.signAngle = function signAngle(vector) {
    var angle = this.angle(vector);
    return this.cross(vector) < 0 ? -angle : angle;
  }
  /**
   * !#en rotate
   * !#zh 返回旋转给定弧度后的新向量。
   * @method rotate
   * @param {number} radians
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   */
  ;

  _proto.rotate = function rotate(radians, out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    return out.rotateSelf(radians);
  }
  /**
   * !#en rotate self
   * !#zh 按指定弧度旋转向量。
   * @method rotateSelf
   * @param {number} radians
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.rotateSelf = function rotateSelf(radians) {
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    var x = this.x;
    this.x = cos * x - sin * this.y;
    this.y = sin * x + cos * this.y;
    return this;
  }
  /**
   * !#en Calculates the projection of the current vector over the given vector.
   * !#zh 返回当前向量在指定 vector 向量上的投影向量。
   * @method project
   * @param {Vec2} vector
   * @return {Vec2}
   * @example
   * var v1 = cc.v2(20, 20);
   * var v2 = cc.v2(5, 5);
   * v1.project(v2); // Vec2 {x: 20, y: 20};
   */
  ;

  _proto.project = function project(vector) {
    return vector.multiplyScalar(this.dot(vector) / vector.dot(vector));
  }
  /**
   * Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec2} [out] the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @returns {Vec2} out
   */
  ;

  _proto.transformMat4 = function transformMat4(m, out) {
    out = out || new Vec2();
    Vec2.transformMat4(out, this, m);
    return out;
  }
  /**
   * Returns the maximum value in x, y.
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y);
  };

  _createClass(Vec2, null, [{
    key: "ONE",
    get: function get() {
      return new Vec2(1, 1);
    }
  }, {
    key: "ZERO",
    get:
    /**
     * !#en return a Vec2 object with x = 0 and y = 0.
     * !#zh 返回 x = 0 和 y = 0 的 Vec2 对象。
     * @property {Vec2} ZERO
     * @static
     */
    function get() {
      return new Vec2(0, 0);
    }
  }, {
    key: "UP",
    get:
    /**
     * !#en return a Vec2 object with x = 0 and y = 1.
     * !#zh 返回 x = 0 和 y = 1 的 Vec2 对象。
     * @property {Vec2} UP
     * @static
     */
    function get() {
      return new Vec2(0, 1);
    }
  }, {
    key: "RIGHT",
    get:
    /**
     * !#en return a readonly Vec2 object with x = 1 and y = 0.
     * !#zh 返回 x = 1 和 y = 0 的 Vec2 只读对象。
     * @property {Vec2} RIGHT
     * @static
     */
    function get() {
      return new Vec2(1, 0);
    }
  }]);

  return Vec2;
}(_valueType["default"]);

exports["default"] = Vec2;
Vec2.sub = Vec2.subtract;
Vec2.mul = Vec2.multiply;
Vec2.scale = Vec2.multiplyScalar;
Vec2.mag = Vec2.len;
Vec2.squaredMagnitude = Vec2.lengthSqr;
Vec2.div = Vec2.divide;
Vec2.ONE_R = Vec2.ONE;
Vec2.ZERO_R = Vec2.ZERO;
Vec2.UP_R = Vec2.UP;
Vec2.RIGHT_R = Vec2.RIGHT;
var v2_1 = new Vec2();
var v2_2 = new Vec2();

_CCClass["default"].fastDefine('cc.Vec2', Vec2, {
  x: 0,
  y: 0
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}} 对象。
 * @method v2
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @return {Vec2}
 * @example
 * var v1 = cc.v2();
 * var v2 = cc.v2(0, 0);
 * var v3 = cc.v2(v2);
 * var v4 = cc.v2({x: 100, y: 100});
 */


cc.v2 = function v2(x, y) {
  return new Vec2(x, y);
};

cc.Vec2 = Vec2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx2ZWMyLnRzIl0sIm5hbWVzIjpbIl94IiwiX3kiLCJWZWMyIiwic3ViIiwidmVjdG9yIiwib3V0Iiwic3VidHJhY3QiLCJtdWwiLCJudW0iLCJtdWx0aXBseVNjYWxhciIsImRpdiIsInNjYWxlIiwibXVsdGlwbHkiLCJuZWciLCJuZWdhdGUiLCJjbG9uZSIsImEiLCJ4IiwieSIsImNvcHkiLCJzZXQiLCJhZGQiLCJiIiwiZGl2aWRlIiwiY2VpbCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsIm1heCIsInJvdW5kIiwic2NhbGVBbmRBZGQiLCJkaXN0YW5jZSIsInNxcnQiLCJzcXVhcmVkRGlzdGFuY2UiLCJsZW4iLCJsZW5ndGhTcXIiLCJpbnZlcnNlIiwiaW52ZXJzZVNhZmUiLCJhYnMiLCJFUFNJTE9OIiwibm9ybWFsaXplIiwiZG90IiwiY3Jvc3MiLCJ6IiwibGVycCIsInQiLCJyYW5kb20iLCJyIiwiUEkiLCJjb3MiLCJzaW4iLCJ0cmFuc2Zvcm1NYXQzIiwibWF0IiwibSIsInRyYW5zZm9ybU1hdDQiLCJzdHJpY3RFcXVhbHMiLCJlcXVhbHMiLCJlcHNpbG9uIiwiYW5nbGUiLCJ2Ml8xIiwidjJfMiIsImNvc2luZSIsImFjb3MiLCJ0b0FycmF5IiwidiIsIm9mcyIsImZyb21BcnJheSIsImFyciIsIm1hZyIsInByb3RvdHlwZSIsIm1hZ1NxciIsInN1YlNlbGYiLCJtdWxTZWxmIiwiZGl2U2VsZiIsInNjYWxlU2VsZiIsIm5lZ1NlbGYiLCJuZXdWYWx1ZSIsIm90aGVyIiwiZnV6enlFcXVhbHMiLCJ2YXJpYW5jZSIsInRvU3RyaW5nIiwidG9GaXhlZCIsInRvIiwicmF0aW8iLCJjbGFtcGYiLCJtaW5faW5jbHVzaXZlIiwibWF4X2luY2x1c2l2ZSIsIm1pc2MiLCJhZGRTZWxmIiwibm9ybWFsaXplU2VsZiIsImludnNxcnQiLCJtYWdTcXIxIiwibWFnU3FyMiIsImNvbnNvbGUiLCJ3YXJuIiwidGhldGEiLCJzaWduQW5nbGUiLCJyb3RhdGUiLCJyYWRpYW5zIiwicm90YXRlU2VsZiIsInByb2plY3QiLCJtYXhBeGlzIiwiVmFsdWVUeXBlIiwic3F1YXJlZE1hZ25pdHVkZSIsIk9ORV9SIiwiT05FIiwiWkVST19SIiwiWkVSTyIsIlVQX1IiLCJVUCIsIlJJR0hUX1IiLCJSSUdIVCIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwiY2MiLCJ2MiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQzs7Ozs7QUFDakI7O0FBT0E7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1NBQ0lDLE1BQUEsYUFBS0MsTUFBTCxFQUFtQkMsR0FBbkIsRUFBcUM7QUFDakMsV0FBT0gsSUFBSSxDQUFDSSxRQUFMLENBQWNELEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQXJCLEVBQWlDLElBQWpDLEVBQXVDRSxNQUF2QyxDQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtTQUNJRyxNQUFBLGFBQUtDLEdBQUwsRUFBa0JILEdBQWxCLEVBQW9DO0FBQ2hDLFdBQU9ILElB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S0E4S0RzRyxRQUFRdEcsSUFBSSxDQUFDdUc7QUE5S1p2RyxLQThMRHdHLFNBQVN4RyxJQUFJLENBQUN5RztBQTlMYnpHLEtBOE1EMEcsT0FBTzFHLElBQUksQ0FBQzJHO0FBOU1YM0csS0E4TkQ0RyxVQUFVNUcsSUFBSSxDQUFDNkc7QUFvNkJuQyxJQUFNcEQsSUFBSSxHQUFHLElBQUl6RCxJQUFKLEVBQWI7QUFDQSxJQUFNMEQsSUFBSSxHQUFHLElBQUkxRCxJQUFKLEVBQWI7O0FBRUE4RyxvQkFBUUMsVUFBUixDQUFtQixTQUFuQixFQUE4Qi9HLElBQTlCLEVBQW9DO0FBQUVlLEVBQUFBLENBQUMsRUFBRSxDQUFMO0FBQVFDLEVBQUFBLENBQUMsRUFBRTtBQUFYLENBQXBDO0FBSUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQWdHLEVBQUUsQ0FBQ0MsRUFBSCxHQUFRLFNBQVNBLEVBQVQsQ0FBYWxHLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO0FBQ3ZCLFNBQU8sSUFBSWhCLElBQUosQ0FBU2UsQ0FBVCxFQUFZQyxDQUFaLENBQVA7QUFDSCxDQUZEOztBQUlBZ0csRUFBRSxDQUFDaEgsSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IFZhbHVlVHlwZSBmcm9tICcuL3ZhbHVlLXR5cGUnO1xyXG5pbXBvcnQgTWF0NCBmcm9tICcuL21hdDQnO1xyXG5pbXBvcnQgQ0NDbGFzcyBmcm9tICcuLi9wbGF0Zm9ybS9DQ0NsYXNzJztcclxuaW1wb3J0IG1pc2MgZnJvbSAnLi4vdXRpbHMvbWlzYyc7XHJcbmltcG9ydCB7IEVQU0lMT04sIHJhbmRvbSB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxubGV0IF94OiBudW1iZXIgPSAwLjA7XHJcbmxldCBfeTogbnVtYmVyID0gMC4wO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmVwcmVzZW50YXRpb24gb2YgMkQgdmVjdG9ycyBhbmQgcG9pbnRzLlxyXG4gKiAhI3poIOihqOekuiAyRCDlkJHph4/lkozlnZDmoIdcclxuICpcclxuICogQGNsYXNzIFZlYzJcclxuICogQGV4dGVuZHMgVmFsdWVUeXBlXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjMiBleHRlbmRzIFZhbHVlVHlwZSB7XHJcbiAgICAvLyBkZXByZWNhdGVkXHJcbiAgICBzdGF0aWMgc3ViICAgPSBWZWMyLnN1YnRyYWN0O1xyXG4gICAgc3RhdGljIG11bCAgID0gVmVjMi5tdWx0aXBseTtcclxuICAgIHN0YXRpYyBzY2FsZSA9IFZlYzIubXVsdGlwbHlTY2FsYXI7XHJcbiAgICBzdGF0aWMgbWFnICAgPSBWZWMyLmxlbjtcclxuICAgIHN0YXRpYyBzcXVhcmVkTWFnbml0dWRlID0gVmVjMi5sZW5ndGhTcXI7XHJcbiAgICBzdGF0aWMgZGl2ID0gVmVjMi5kaXZpZGU7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqbjgIJcclxuICAgICAqIEBtZXRob2QgbWFnXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2Lm1hZygpOyAvLyByZXR1cm4gMTQuMTQyMTM1NjIzNzMwOTUxO1xyXG4gICAgICovXHJcbiAgICBtYWcgID0gVmVjMi5wcm90b3R5cGUubGVuO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcclxuICAgICAqIEBtZXRob2QgbWFnU3FyXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2Lm1hZ1NxcigpOyAvLyByZXR1cm4gMjAwO1xyXG4gICAgICovXHJcbiAgICBtYWdTcXIgPSBWZWMyLnByb3RvdHlwZS5sZW5ndGhTcXI7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIHN1YigpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azleOAguWmguaenOS9oOaDs+S/neWtmOe7k+aenOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBzdWIoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2Qgc3ViU2VsZlxyXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYuc3ViU2VsZihjYy52Mig1LCA1KSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUsIHk6IDV9O1xyXG4gICAgICovXHJcbiAgICBzdWJTZWxmICA9IFZlYzIucHJvdG90eXBlLnN1YnRyYWN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azle+8jOW5tui/lOWbnuaWsOe7k+aenOOAglxyXG4gICAgICogQG1ldGhvZCBzdWJcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2LnN1YihjYy52Mig1LCA1KSk7ICAgICAgLy8gcmV0dXJuIFZlYzIge3g6IDUsIHk6IDV9O1xyXG4gICAgICogdmFyIHYxID0gbmV3IFZlYzI7XHJcbiAgICAgKiB2LnN1YihjYy52Mig1LCA1KSwgdjEpOyAgLy8gcmV0dXJuIFZlYzIge3g6IDUsIHk6IDV9O1xyXG4gICAgICovXHJcbiAgICBzdWIgKHZlY3RvcjogVmVjMiwgb3V0PzogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBWZWMyLnN1YnRyYWN0KG91dCB8fCBuZXcgVmVjMigpLCB0aGlzLCB2ZWN0b3IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdGhpcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBtdWwoKSBpbnN0ZWFkLlxyXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggbXVsKCkg5Luj5pu/44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bFNlbGZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYubXVsU2VsZig1KTsvLyByZXR1cm4gVmVjMiB7eDogNTAsIHk6IDUwfTtcclxuICAgICAqL1xyXG4gICAgbXVsU2VsZiAgPSBWZWMyLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhcjtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIGJ5IGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg57yp5pS+5ZCR6YeP77yM5bm26L+U5Zue5paw57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzIgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzIgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5tdWwoNSk7ICAgICAgLy8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XHJcbiAgICAgKiB2YXIgdjEgPSBuZXcgVmVjMjtcclxuICAgICAqIHYubXVsKDUsIHYxKTsgIC8vIHJldHVybiBWZWMyIHt4OiA1MCwgeTogNTB9O1xyXG4gICAgICovXHJcbiAgICBtdWwgKG51bTogbnVtYmVyLCBvdXQ/OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIFZlYzIubXVsdGlwbHlTY2FsYXIob3V0IHx8IG5ldyBWZWMyKCksIHRoaXMsIG51bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBkaXYoKSBpbnN0ZWFkLlxyXG4gICAgICogISN6aCDlkJHph4/pmaTms5XjgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggZGl2KCkg5Luj5pu/44CCXHJcbiAgICAgKiBAbWV0aG9kIGRpdlNlbGZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYuZGl2U2VsZig1KTsgLy8gcmV0dXJuIFZlYzIge3g6IDIsIHk6IDJ9O1xyXG4gICAgICovXHJcbiAgICBkaXZTZWxmICA9IFZlYzIucHJvdG90eXBlLmRpdmlkZTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV77yM5bm26L+U5Zue5paw55qE57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIGRpdlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzIgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzIgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5kaXYoNSk7ICAgICAgLy8gcmV0dXJuIFZlYzIge3g6IDIsIHk6IDJ9O1xyXG4gICAgICogdmFyIHYxID0gbmV3IFZlYzI7XHJcbiAgICAgKiB2LmRpdig1LCB2MSk7ICAvLyByZXR1cm4gVmVjMiB7eDogMiwgeTogMn07XHJcbiAgICAgKi9cclxuICAgIGRpdiAobnVtOiBudW1iZXIsIG91dD86IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gVmVjMi5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IFZlYzIoKSwgdGhpcywgMS9udW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMuXHJcbiAgICAgKiAhI3poIOWIhumHj+ebuOS5mOOAglxyXG4gICAgICogQG1ldGhvZCBzY2FsZVNlbGZcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2LnNjYWxlU2VsZihjYy52Mig1LCA1KSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XHJcbiAgICAgKi9cclxuICAgIHNjYWxlU2VsZiA9IFZlYzIucHJvdG90eXBlLm11bHRpcGx5O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxyXG4gICAgICogISN6aCDliIbph4/nm7jkuZjvvIzlubbov5Tlm57mlrDnmoTnu5PmnpzjgIJcclxuICAgICAqIEBtZXRob2Qgc2NhbGVcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2LnNjYWxlKGNjLnYyKDUsIDUpKTsgICAgICAvLyByZXR1cm4gVmVjMiB7eDogNTAsIHk6IDUwfTtcclxuICAgICAqIHZhciB2MSA9IG5ldyBWZWMyO1xyXG4gICAgICogdi5zY2FsZShjYy52Mig1LCA1KSwgdjEpOyAgLy8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XHJcbiAgICAgKi9cclxuICAgIHNjYWxlICh2ZWN0b3I6IFZlYzIsIG91dD86IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gVmVjMi5tdWx0aXBseShvdXQgfHwgbmV3IFZlYzIoKSwgdGhpcywgdmVjdG9yKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOZWdhdGVzIHRoZSBjb21wb25lbnRzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIG5lZygpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WPluWPjeOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBuZWcoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2QgbmVnU2VsZlxyXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5uZWdTZWxmKCk7IC8vIHJldHVybiBWZWMyIHt4OiAtMTAsIHk6IC0xMH07XHJcbiAgICAgKi9cclxuICAgIG5lZ1NlbGYgPSBWZWMyLnByb3RvdHlwZS5uZWdhdGU7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOi/lOWbnuWPluWPjeWQjueahOaWsOWQkemHj+OAglxyXG4gICAgICogQG1ldGhvZCBuZWdcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMyIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMyIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHZhciB2MSA9IG5ldyBWZWMyO1xyXG4gICAgICogdi5uZWcodjEpOyAgLy8gcmV0dXJuIFZlYzIge3g6IC0xMCwgeTogLTEwfTtcclxuICAgICAqL1xyXG4gICAgbmVnIChvdXQ/OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIFZlYzIubmVnYXRlKG91dCB8fCBuZXcgVmVjMigpLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gcmV0dXJuIGEgVmVjMiBvYmplY3Qgd2l0aCB4ID0gMSBhbmQgeSA9IDEuXHJcbiAgICAgKiAhI3poIOaWsCBWZWMyIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IE9ORVxyXG4gICAgICogQHR5cGUgVmVjMlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IE9ORSAoKSB7IHJldHVybiBuZXcgVmVjMigxLCAxKSB9O1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IE9ORV9SID0gVmVjMi5PTkU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzIgb2JqZWN0IHdpdGggeCA9IDAgYW5kIHkgPSAwLlxyXG4gICAgICogISN6aCDov5Tlm54geCA9IDAg5ZKMIHkgPSAwIOeahCBWZWMyIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBaRVJPXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgWkVSTyAoKSB7IHJldHVybiBuZXcgVmVjMigwLCAwKSB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIHJlYWRvbmx5IFZlYzIgb2JqZWN0IHdpdGggeCA9IDAgYW5kIHkgPSAwLlxyXG4gICAgICogISN6aCDov5Tlm57kuIDkuKogeCA9IDAg5ZKMIHkgPSAwIOeahCBWZWMyIOWPquivu+WvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBaRVJPX1JcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgWkVST19SID0gVmVjMi5aRVJPO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMyIG9iamVjdCB3aXRoIHggPSAwIGFuZCB5ID0gMS5cclxuICAgICAqICEjemgg6L+U5ZueIHggPSAwIOWSjCB5ID0gMSDnmoQgVmVjMiDlr7nosaHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gVVBcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBVUCAoKSB7IHJldHVybiBuZXcgVmVjMigwLCAxKSB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIHJlYWRvbmx5IFZlYzIgb2JqZWN0IHdpdGggeCA9IDAgYW5kIHkgPSAxLlxyXG4gICAgICogISN6aCDov5Tlm54geCA9IDAg5ZKMIHkgPSAxIOeahCBWZWMyIOWPquivu+WvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBVUF9SXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFVQX1IgPSBWZWMyLlVQO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiByZXR1cm4gYSByZWFkb25seSBWZWMyIG9iamVjdCB3aXRoIHggPSAxIGFuZCB5ID0gMC5cclxuICAgICAqICEjemgg6L+U5ZueIHggPSAxIOWSjCB5ID0gMCDnmoQgVmVjMiDlj6ror7vlr7nosaHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gUklHSFRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBSSUdIVCAoKSB7IHJldHVybiBuZXcgVmVjMigxLCAwKSB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzIgb2JqZWN0IHdpdGggeCA9IDEgYW5kIHkgPSAwLlxyXG4gICAgICogISN6aCDov5Tlm54geCA9IDEg5ZKMIHkgPSAwIOeahCBWZWMyIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBSSUdIVF9SXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlYWRvbmx5IFJJR0hUX1IgPSBWZWMyLlJJR0hUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjbG9uZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KTogVmVjMlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMihhLngsIGEueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWkjeWItuaMh+WumuWQkemHj+eahOWAvFxyXG4gICAgICogQG1ldGhvZCBjb3B5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29weSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29weSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54O1xyXG4gICAgICAgIG91dC55ID0gYS55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poICDorr7nva7lkJHph4/lgLxcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc2V0IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/liqDms5VcclxuICAgICAqIEBtZXRob2QgYWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKyBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5YeP5rOVXHJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc3VidHJhY3QgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3VidHJhY3QgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55IC0gYi55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOazlVxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAqIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGIueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/pmaTms5VcclxuICAgICAqIEBtZXRob2QgZGl2aWRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRpdmlkZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggLyBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgLyBiLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5ZCR5LiK5Y+W5pW0XHJcbiAgICAgKiBAbWV0aG9kIGNlaWxcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjZWlsIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjZWlsIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGguY2VpbChhLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxyXG4gICAgICogQG1ldGhvZCBmbG9vclxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZsb29yIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxyXG4gICAgICogQG1ldGhvZCBtaW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBtaW4gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWluIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgubWluKGEueCwgYi54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWluKGEueSwgYi55KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XHJcbiAgICAgKiBAbWV0aG9kIG1heFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG1heCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtYXggPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5tYXgoYS55LCBiLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+Wbm+iIjeS6lOWFpeWPluaVtFxyXG4gICAgICogQG1ldGhvZCByb3VuZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdW5kIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByb3VuZCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5yb3VuZChhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+agh+mHj+S5mOazlVxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAqIGI7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxyXG4gICAgICogQG1ldGhvZCBzY2FsZUFuZEFkZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIChiLnggKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyAoYi55ICogc2NhbGUpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu1xyXG4gICAgICogQG1ldGhvZCBkaXN0YW5jZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBiLnggLSBhLng7XHJcbiAgICAgICAgX3kgPSBiLnkgLSBhLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChfeCAqIF94ICsgX3kgKiBfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxyXG4gICAgICogQG1ldGhvZCBzcXVhcmVkRGlzdGFuY2VcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzcXVhcmVkRGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzcXVhcmVkRGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBiLnggLSBhLng7XHJcbiAgICAgICAgX3kgPSBiLnkgLSBhLnk7XHJcbiAgICAgICAgcmV0dXJuIF94ICogX3ggKyBfeSAqIF95O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqZcclxuICAgICAqIEBtZXRob2QgbGVuXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbGVuIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxlbiA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChfeCAqIF94ICsgX3kgKiBfeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguWQkemHj+mVv+W6puW5s+aWuVxyXG4gICAgICogQG1ldGhvZCBsZW5ndGhTcXJcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZW5ndGhTcXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGVuZ3RoU3FyIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpIHtcclxuICAgICAgICBfeCA9IGEueDtcclxuICAgICAgICBfeSA9IGEueTtcclxuICAgICAgICByZXR1cm4gX3ggKiBfeCArIF95ICogX3k7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPlui0n1xyXG4gICAgICogQG1ldGhvZCBuZWdhdGVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBuZWdhdGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5lZ2F0ZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gLWEueDtcclxuICAgICAgICBvdXQueSA9IC1hLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIEluZmluaXR5XHJcbiAgICAgKiBAbWV0aG9kIGludmVyc2VcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAxLjAgLyBhLng7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcclxuICAgICAqIEBtZXRob2QgaW52ZXJzZVNhZmVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBpbnZlcnNlU2FmZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW52ZXJzZVNhZmUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBfeCA9IGEueDtcclxuICAgICAgICBfeSA9IGEueTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKF94KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8gX3g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoX3kpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyBfeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOW9kuS4gOWMluWQkemHj1xyXG4gICAgICogQG1ldGhvZCBub3JtYWxpemVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgVmVjMkxpa2UgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogVmVjMkxpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBWZWMyTGlrZSBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBWZWMyTGlrZSkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIGxldCBsZW4gPSBfeCAqIF94ICsgX3kgKiBfeTtcclxuICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XHJcbiAgICAgICAgICAgIG91dC54ID0gX3ggKiBsZW47XHJcbiAgICAgICAgICAgIG91dC55ID0gX3kgKiBsZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+eCueenr++8iOaVsOmHj+enr++8iVxyXG4gICAgICogQG1ldGhvZCBkb3RcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBkb3QgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkb3QgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP5Y+J56ev77yI5ZCR6YeP56ev77yJ77yM5rOo5oSP5LqM57u05ZCR6YeP55qE5Y+J56ev5Li65LiOIFog6L205bmz6KGM55qE5LiJ57u05ZCR6YePXHJcbiAgICAgKiBAbWV0aG9kIGNyb3NzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY3Jvc3MgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogVmVjMiwgYTogT3V0LCBiOiBPdXQpOiBWZWMyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcm9zcyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBWZWMyLCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gb3V0LnkgPSAwO1xyXG4gICAgICAgIG91dC56ID0gYS54ICogYi55IC0gYS55ICogYi54O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+e6v+aAp+aPkuWAvO+8miBBICsgdCAqIChCIC0gQSlcclxuICAgICAqIEBtZXRob2QgbGVycFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxlcnAgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZXJwIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIG91dC54ID0gX3ggKyB0ICogKGIueCAtIF94KTtcclxuICAgICAgICBvdXQueSA9IF95ICsgdCAqIChiLnkgLSBfeSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg55Sf5oiQ5LiA5Liq5Zyo5Y2V5L2N5ZyG5LiK5Z2H5YyA5YiG5biD55qE6ZqP5py65ZCR6YePXHJcbiAgICAgKiBAbWV0aG9kIHJhbmRvbVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByYW5kb20gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcikge1xyXG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xyXG4gICAgICAgIGNvbnN0IHIgPSByYW5kb20oKSAqIDIuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5zaW4ocikgKiBzY2FsZTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/kuI7kuInnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzkuInkvY3kuLogMeOAglxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNmb3JtTWF0MyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBJTWF0M0xpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDMgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIGxldCBtID0gbWF0Lm07XHJcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzNdICogX3kgKyBtWzZdO1xyXG4gICAgICAgIG91dC55ID0gbVsxXSAqIF94ICsgbVs0XSAqIF95ICsgbVs3XTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzkuInkvY3kuLogMO+8jOesrOWbm+S9jeS4uiAx44CCXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0cmFuc2Zvcm1NYXQ0IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBtYXQ6IE1hdExpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIGxldCBtID0gbWF0Lm07XHJcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzEyXTtcclxuICAgICAgICBvdXQueSA9IG1bMV0gKiBfeCArIG1bNV0gKiBfeSArIG1bMTNdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+etieS7t+WIpOaWrVxyXG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHNcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3RyaWN0RXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5ZCR6YeP6L+R5Ly8562J5Lu35Yik5patXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQsICBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCwgIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnMoYS54IC0gYi54KSA8PVxyXG4gICAgICAgICAgICBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLngpLCBNYXRoLmFicyhiLngpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhLnkgLSBiLnkpIDw9XHJcbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5ZCR6YeP6L+R5Ly8562J5Lu35Yik5patXHJcbiAgICAgKiBAbWV0aG9kIGFuZ2xlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYW5nbGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhbmdsZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBWZWMyLm5vcm1hbGl6ZSh2Ml8xLCBhKTtcclxuICAgICAgICBWZWMyLm5vcm1hbGl6ZSh2Ml8yLCBiKTtcclxuICAgICAgICBjb25zdCBjb3NpbmUgPSBWZWMyLmRvdCh2Ml8xLCB2Ml8yKTtcclxuICAgICAgICBpZiAoY29zaW5lID4gMS4wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29zaW5lIDwgLTEuMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhjb3NpbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/ovazmlbDnu4RcclxuICAgICAqIEBtZXRob2QgdG9BcnJheVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIHY6IElWZWMyTGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjMkxpa2UsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXRbb2ZzICsgMF0gPSB2Lng7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaVsOe7hOi9rOWQkemHj1xyXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcyA9IDApIHtcclxuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcclxuICAgICAgICBvdXQueSA9IGFycltvZnMgKyAxXTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcclxuICAgICAqL1xyXG4gICAgeDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcclxuICAgICAqL1xyXG4gICAgeTogbnVtYmVyO1xyXG5cclxuICAgIC8vIGNvbXBhdGlibGUgd2l0aCB2ZWMzXHJcbiAgICB6OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy92ZWMyOm1ldGhvZFwifX1jYy52Mnt7L2Nyb3NzTGlua319IG9yIHt7I2Nyb3NzTGluayBcImNjL3A6bWV0aG9kXCJ9fWNjLnB7ey9jcm9zc0xpbmt9fVxyXG4gICAgICogISN6aFxyXG4gICAgICog5p6E6YCg5Ye95pWw77yM5Y+v5p+l55yLIHt7I2Nyb3NzTGluayBcImNjL3ZlYzI6bWV0aG9kXCJ9fWNjLnYye3svY3Jvc3NMaW5rfX0g5oiW6ICFIHt7I2Nyb3NzTGluayBcImNjL3A6bWV0aG9kXCJ9fWNjLnB7ey9jcm9zc0xpbmt9fVxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4PTBdXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKHg6IG51bWJlciB8IFZlYzIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueCB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB4LnkgfHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4IGFzIG51bWJlciB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBjbG9uZSBhIFZlYzIgb2JqZWN0XHJcbiAgICAgKiAhI3poIOWFi+mahuS4gOS4qiBWZWMyIOWvueixoVxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHJldHVybiB7VmVjMn1cclxuICAgICAqL1xyXG4gICAgY2xvbmUgKCk6IFZlYzIge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgdmVjdG9yIHdpdGggYW5vdGhlcidzIHZhbHVlXHJcbiAgICAgKiAhI3poIOiuvue9ruWQkemHj+WAvOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gbmV3VmFsdWUgLSAhI2VuIG5ldyB2YWx1ZSB0byBzZXQuICEjemgg6KaB6K6+572u55qE5paw5YC8XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgc2V0IChuZXdWYWx1ZTogVmVjMik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCA9IG5ld1ZhbHVlLng7XHJcbiAgICAgICAgdGhpcy55ID0gbmV3VmFsdWUueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0d28gdmVjdG9yIGVxdWFsXHJcbiAgICAgKiAhI3poIOW9k+WJjeeahOWQkemHj+aYr+WQpuS4juaMh+WumueahOWQkemHj+ebuOetieOAglxyXG4gICAgICogQG1ldGhvZCBlcXVhbHNcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGVxdWFscyAob3RoZXI6IFZlYzIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0d28gdmVjdG9yIGVxdWFsIHdpdGggc29tZSBkZWdyZWUgb2YgdmFyaWFuY2UuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDov5HkvLzliKTmlq3kuKTkuKrngrnmmK/lkKbnm7jnrYnjgII8YnIvPlxyXG4gICAgICog5Yik5patIDIg5Liq5ZCR6YeP5piv5ZCm5Zyo5oyH5a6a5pWw5YC855qE6IyD5Zu05LmL5YaF77yM5aaC5p6c5Zyo5YiZ6L+U5ZueIHRydWXvvIzlj43kuYvliJnov5Tlm54gZmFsc2XjgIJcclxuICAgICAqIEBtZXRob2QgZnV6enlFcXVhbHNcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gb3RoZXJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YXJpYW5jZVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZnV6enlFcXVhbHMgKG90aGVyOiBWZWMyLCB2YXJpYW5jZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnggLSB2YXJpYW5jZSA8PSBvdGhlci54ICYmIG90aGVyLnggPD0gdGhpcy54ICsgdmFyaWFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMueSAtIHZhcmlhbmNlIDw9IG90aGVyLnkgJiYgb3RoZXIueSA8PSB0aGlzLnkgKyB2YXJpYW5jZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYW5zZm9ybSB0byBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxyXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0b1N0cmluZyAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCIoXCIgK1xyXG4gICAgICAgICAgICB0aGlzLngudG9GaXhlZCgyKSArIFwiLCBcIiArXHJcbiAgICAgICAgICAgIHRoaXMueS50b0ZpeGVkKDIpICsgXCIpXCJcclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDYWxjdWxhdGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgb25lIHdpdGggZ2l2ZW4gcmF0aW9cclxuICAgICAqICEjemgg57q/5oCn5o+S5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIGxlcnBcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdG9cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYXRpbyAtIHRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGxlcnAgKHRvOiBWZWMyLCByYXRpbzogbnVtYmVyLCBvdXQ/OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLnk7XHJcbiAgICAgICAgb3V0LnggPSB4ICsgKHRvLnggLSB4KSAqIHJhdGlvO1xyXG4gICAgICAgIG91dC55ID0geSArICh0by55IC0geSkgKiByYXRpbztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gZnJvbSBmbG9hdCBhbmQgdG8gZmxvYXQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDov5Tlm57mjIflrprpmZDliLbljLrln5/lkI7nmoTlkJHph4/jgII8YnIvPlxyXG4gICAgICog5ZCR6YeP5aSn5LqOIG1heF9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1heF9pbmNsdXNpdmXjgII8YnIvPlxyXG4gICAgICog5ZCR6YeP5bCP5LqOIG1pbl9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1pbl9pbmNsdXNpdmXjgII8YnIvPlxyXG4gICAgICog5ZCm5YiZ6L+U5Zue6Ieq6Lqr44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsYW1wZlxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBtaW5faW5jbHVzaXZlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG1heF9pbmNsdXNpdmVcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIG1pbl9pbmNsdXNpdmUgPSBjYy52MigwLCAwKTtcclxuICAgICAqIHZhciBtYXhfaW5jbHVzaXZlID0gY2MudjIoMjAsIDIwKTtcclxuICAgICAqIHZhciB2MSA9IGNjLnYyKDIwLCAyMCkuY2xhbXBmKG1pbl9pbmNsdXNpdmUsIG1heF9pbmNsdXNpdmUpOyAvLyBWZWMyIHt4OiAyMCwgeTogMjB9O1xyXG4gICAgICogdmFyIHYyID0gY2MudjIoMCwgMCkuY2xhbXBmKG1pbl9pbmNsdXNpdmUsIG1heF9pbmNsdXNpdmUpOyAgIC8vIFZlYzIge3g6IDAsIHk6IDB9O1xyXG4gICAgICogdmFyIHYzID0gY2MudjIoMTAsIDEwKS5jbGFtcGYobWluX2luY2x1c2l2ZSwgbWF4X2luY2x1c2l2ZSk7IC8vIFZlYzIge3g6IDEwLCB5OiAxMH07XHJcbiAgICAgKi9cclxuICAgIGNsYW1wZiAobWluX2luY2x1c2l2ZTogVmVjMiwgbWF4X2luY2x1c2l2ZTogVmVjMik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCA9IG1pc2MuY2xhbXBmKHRoaXMueCwgbWluX2luY2x1c2l2ZS54LCBtYXhfaW5jbHVzaXZlLngpO1xyXG4gICAgICAgIHRoaXMueSA9IG1pc2MuY2xhbXBmKHRoaXMueSwgbWluX2luY2x1c2l2ZS55LCBtYXhfaW5jbHVzaXZlLnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBZGRzIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDlkJHph4/liqDms5XjgIJcclxuICAgICAqIEBtZXRob2QgYWRkXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XVxyXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5hZGQoY2MudjIoNSwgNSkpOy8vIHJldHVybiBWZWMyIHt4OiAxNSwgeTogMTV9O1xyXG4gICAgICovXHJcbiAgICBhZGQgKHZlY3RvcjogVmVjMiwgb3V0PzogVmVjMik6IFZlYzIge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMigpO1xyXG4gICAgICAgIG91dC54ID0gdGhpcy54ICsgdmVjdG9yLng7XHJcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgKyB2ZWN0b3IueTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBZGRzIHRoaXMgdmVjdG9yLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIGFkZCgpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WKoOazleOAguWmguaenOS9oOaDs+S/neWtmOe7k+aenOWIsOWPpuS4gOS4quWQkemHj++8jOS9v+eUqCBhZGQoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2QgYWRkU2VsZlxyXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBhZGRTZWxmICh2ZWN0b3I6IFZlYzIpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnggKz0gdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy55ICs9IHZlY3Rvci55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azleOAglxyXG4gICAgICogQG1ldGhvZCBzdWJ0cmFjdFxyXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYuc3ViU2VsZihjYy52Mig1LCA1KSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUsIHk6IDV9O1xyXG4gICAgICovXHJcbiAgICBzdWJ0cmFjdCAodmVjdG9yOiBWZWMyKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy54IC09IHZlY3Rvci54O1xyXG4gICAgICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGlzIGJ5IGEgbnVtYmVyLlxyXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlTY2FsYXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYubXVsdGlwbHkoNSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5U2NhbGFyIChudW06IG51bWJlcik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCAqPSBudW07XHJcbiAgICAgICAgdGhpcy55ICo9IG51bTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0d28gdmVjdG9ycy5cclxuICAgICAqICEjemgg5YiG6YeP55u45LmY44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5tdWx0aXBseShjYy52Mig1LCA1KSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5ICh2ZWN0b3I6IFZlYzIpOiB0aGlzIHtcclxuICAgICAgICB0aGlzLnggKj0gdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy55ICo9IHZlY3Rvci55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLlxyXG4gICAgICogISN6aCDlkJHph4/pmaTms5XjgIJcclxuICAgICAqIEBtZXRob2QgZGl2aWRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2LmRpdmlkZSg1KTsgLy8gcmV0dXJuIFZlYzIge3g6IDIsIHk6IDJ9O1xyXG4gICAgICovXHJcbiAgICBkaXZpZGUgKG51bTogbnVtYmVyKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy54IC89IG51bTtcclxuICAgICAgICB0aGlzLnkgLz0gbnVtO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOZWdhdGVzIHRoZSBjb21wb25lbnRzLlxyXG4gICAgICogISN6aCDlkJHph4/lj5blj43jgIJcclxuICAgICAqIEBtZXRob2QgbmVnYXRlXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2Lm5lZ2F0ZSgpOyAvLyByZXR1cm4gVmVjMiB7eDogLTEwLCB5OiAtMTB9O1xyXG4gICAgICovXHJcbiAgICBuZWdhdGUgKCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XHJcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRG90IHByb2R1Y3RcclxuICAgICAqICEjemgg5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP6L+b6KGM54K55LmY44CCXHJcbiAgICAgKiBAbWV0aG9kIGRvdFxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBbdmVjdG9yXVxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5kb3QoY2MudjIoNSwgNSkpOyAvLyByZXR1cm4gMTAwO1xyXG4gICAgICovXHJcbiAgICBkb3QgKHZlY3RvcjogVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENyb3NzIHByb2R1Y3RcclxuICAgICAqICEjemgg5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP6L+b6KGM5Y+J5LmY44CCXHJcbiAgICAgKiBAbWV0aG9kIGNyb3NzXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFt2ZWN0b3JdXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2LmNyb3NzKGNjLnYyKDUsIDUpKTsgLy8gcmV0dXJuIDA7XHJcbiAgICAgKi9cclxuICAgIGNyb3NzICh2ZWN0b3I6IFZlYzIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2ZWN0b3IueSAtIHRoaXMueSAqIHZlY3Rvci54O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puOAglxyXG4gICAgICogQG1ldGhvZCBsZW5cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYubGVuKCk7IC8vIHJldHVybiAxNC4xNDIxMzU2MjM3MzA5NTE7XHJcbiAgICAgKi9cclxuICAgIGxlbiAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcclxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XHJcbiAgICAgKiB2Lmxlbmd0aFNxcigpOyAvLyByZXR1cm4gMjAwO1xyXG4gICAgICovXHJcbiAgICBsZW5ndGhTcXIgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTWFrZSB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yIHRvIDEuXHJcbiAgICAgKiAhI3poIOWQkemHj+W9kuS4gOWMlu+8jOiuqei/meS4quWQkemHj+eahOmVv+W6puS4uiAx44CCXHJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVNlbGZcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcclxuICAgICAqIHYubm9ybWFsaXplU2VsZigpOyAvLyByZXR1cm4gVmVjMiB7eDogMC43MDcxMDY3ODExODY1NDc1LCB5OiAwLjcwNzEwNjc4MTE4NjU0NzV9O1xyXG4gICAgICovXHJcbiAgICBub3JtYWxpemVTZWxmICgpOiBWZWMyIHtcclxuICAgICAgICB2YXIgbWFnU3FyID0gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xyXG4gICAgICAgIGlmIChtYWdTcXIgPT09IDEuMClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChtYWdTcXIgPT09IDAuMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpbnZzcXJ0ID0gMS4wIC8gTWF0aC5zcXJ0KG1hZ1Nxcik7XHJcbiAgICAgICAgdGhpcy54ICo9IGludnNxcnQ7XHJcbiAgICAgICAgdGhpcy55ICo9IGludnNxcnQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGlzIHZlY3RvciB3aXRoIGEgbWFnbml0dWRlIG9mIDEuPGJyLz5cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGN1cnJlbnQgdmVjdG9yIGlzIHVuY2hhbmdlZCBhbmQgYSBuZXcgbm9ybWFsaXplZCB2ZWN0b3IgaXMgcmV0dXJuZWQuIElmIHlvdSB3YW50IHRvIG5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IsIHVzZSBub3JtYWxpemVTZWxmIGZ1bmN0aW9uLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6L+U5Zue5b2S5LiA5YyW5ZCO55qE5ZCR6YeP44CCPGJyLz5cclxuICAgICAqIDxici8+XHJcbiAgICAgKiDms6jmhI/vvIzlvZPliY3lkJHph4/kuI3lj5jvvIzlubbov5Tlm57kuIDkuKrmlrDnmoTlvZLkuIDljJblkJHph4/jgILlpoLmnpzkvaDmg7PmnaXlvZLkuIDljJblvZPliY3lkJHph4/vvIzlj6/kvb/nlKggbm9ybWFsaXplU2VsZiDlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJlc3VsdFxyXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xyXG4gICAgICogdi5ub3JtYWxpemUoKTsgICAvLyByZXR1cm4gVmVjMiB7eDogMC43MDcxMDY3ODExODY1NDc1LCB5OiAwLjcwNzEwNjc4MTE4NjU0NzV9O1xyXG4gICAgICovXHJcbiAgICBub3JtYWxpemUgKG91dD86IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcclxuICAgICAgICBvdXQueCA9IHRoaXMueDtcclxuICAgICAgICBvdXQueSA9IHRoaXMueTtcclxuICAgICAgICBvdXQubm9ybWFsaXplU2VsZigpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhbmdsZSBpbiByYWRpYW4gYmV0d2VlbiB0aGlzIGFuZCB2ZWN0b3IuXHJcbiAgICAgKiAhI3poIOWkueinkueahOW8p+W6puOAglxyXG4gICAgICogQG1ldGhvZCBhbmdsZVxyXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gZnJvbSAwIHRvIE1hdGguUElcclxuICAgICAqL1xyXG4gICAgYW5nbGUgKHZlY3RvcjogVmVjMik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIG1hZ1NxcjEgPSB0aGlzLm1hZ1NxcigpO1xyXG4gICAgICAgIHZhciBtYWdTcXIyID0gdmVjdG9yLm1hZ1NxcigpO1xyXG5cclxuICAgICAgICBpZiAobWFnU3FyMSA9PT0gMCB8fCBtYWdTcXIyID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbid0IGdldCBhbmdsZSBiZXR3ZWVuIHplcm8gdmVjdG9yXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gMC4wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRvdCA9IHRoaXMuZG90KHZlY3Rvcik7XHJcbiAgICAgICAgdmFyIHRoZXRhID0gZG90IC8gKE1hdGguc3FydChtYWdTcXIxICogbWFnU3FyMikpO1xyXG4gICAgICAgIHRoZXRhID0gbWlzYy5jbGFtcGYodGhldGEsIC0xLjAsIDEuMCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyh0aGV0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhbmdsZSBpbiByYWRpYW4gYmV0d2VlbiB0aGlzIGFuZCB2ZWN0b3Igd2l0aCBkaXJlY3Rpb24uXHJcbiAgICAgKiAhI3poIOW4puaWueWQkeeahOWkueinkueahOW8p+W6puOAglxyXG4gICAgICogQG1ldGhvZCBzaWduQW5nbGVcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGZyb20gLU1hdGhQSSB0byBNYXRoLlBJXHJcbiAgICAgKi9cclxuICAgIHNpZ25BbmdsZSAodmVjdG9yOiBWZWMyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlKHZlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3Jvc3ModmVjdG9yKSA8IDAgPyAtYW5nbGUgOiBhbmdsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gcm90YXRlXHJcbiAgICAgKiAhI3poIOi/lOWbnuaXi+i9rOe7meWumuW8p+W6puWQjueahOaWsOWQkemHj+OAglxyXG4gICAgICogQG1ldGhvZCByb3RhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcm90YXRlIChyYWRpYW5zOiBudW1iZXIsIG91dD86IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcclxuICAgICAgICBvdXQueCA9IHRoaXMueDtcclxuICAgICAgICBvdXQueSA9IHRoaXMueTtcclxuICAgICAgICByZXR1cm4gb3V0LnJvdGF0ZVNlbGYocmFkaWFucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJvdGF0ZSBzZWxmXHJcbiAgICAgKiAhI3poIOaMieaMh+WumuW8p+W6puaXi+i9rOWQkemHj+OAglxyXG4gICAgICogQG1ldGhvZCByb3RhdGVTZWxmXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaWFuc1xyXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIHJvdGF0ZVNlbGYgKHJhZGlhbnM6IG51bWJlcik6IFZlYzIge1xyXG4gICAgICAgIHZhciBzaW4gPSBNYXRoLnNpbihyYWRpYW5zKTtcclxuICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XHJcbiAgICAgICAgdGhpcy54ID0gY29zICogeCAtIHNpbiAqIHRoaXMueTtcclxuICAgICAgICB0aGlzLnkgPSBzaW4gKiB4ICsgY29zICogdGhpcy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDYWxjdWxhdGVzIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBjdXJyZW50IHZlY3RvciBvdmVyIHRoZSBnaXZlbiB2ZWN0b3IuXHJcbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeWQkemHj+WcqOaMh+WumiB2ZWN0b3Ig5ZCR6YeP5LiK55qE5oqV5b2x5ZCR6YeP44CCXHJcbiAgICAgKiBAbWV0aG9kIHByb2plY3RcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2MSA9IGNjLnYyKDIwLCAyMCk7XHJcbiAgICAgKiB2YXIgdjIgPSBjYy52Mig1LCA1KTtcclxuICAgICAqIHYxLnByb2plY3QodjIpOyAvLyBWZWMyIHt4OiAyMCwgeTogMjB9O1xyXG4gICAgICovXHJcbiAgICBwcm9qZWN0ICh2ZWN0b3I6IFZlYzIpOiBWZWMyIHtcclxuICAgICAgICByZXR1cm4gdmVjdG9yLm11bHRpcGx5U2NhbGFyKHRoaXMuZG90KHZlY3RvcikgLyB2ZWN0b3IuZG90KHZlY3RvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0NC4gM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCcsIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMyIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMyIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybnMge1ZlYzJ9IG91dFxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm1NYXQ0IChtOiBNYXQ0LCBvdXQ/OiBWZWMyKTogVmVjMiB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XHJcbiAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgdGhpcywgbSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUgaW4geCwgeS5cclxuICAgICAqIEBtZXRob2QgbWF4QXhpc1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgbWF4QXhpcyAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB2Ml8xID0gbmV3IFZlYzIoKTtcclxuY29uc3QgdjJfMiA9IG5ldyBWZWMyKCk7XHJcblxyXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLlZlYzInLCBWZWMyLCB7IHg6IDAsIHk6IDAgfSk7XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIlZlYzJcIn19Y2MuVmVjMnt7L2Nyb3NzTGlua319LlxyXG4gKiAhI3poIOmAmui/h+ivpeeugOS+v+eahOWHveaVsOi/m+ihjOWIm+W7uiB7eyNjcm9zc0xpbmsgXCJWZWMyXCJ9fWNjLlZlYzJ7ey9jcm9zc0xpbmt9fSDlr7nosaHjgIJcclxuICogQG1ldGhvZCB2MlxyXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IFt4PTBdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeT0wXVxyXG4gKiBAcmV0dXJuIHtWZWMyfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgdjEgPSBjYy52MigpO1xyXG4gKiB2YXIgdjIgPSBjYy52MigwLCAwKTtcclxuICogdmFyIHYzID0gY2MudjIodjIpO1xyXG4gKiB2YXIgdjQgPSBjYy52Mih7eDogMTAwLCB5OiAxMDB9KTtcclxuICovXHJcbmNjLnYyID0gZnVuY3Rpb24gdjIgKHgsIHkpIHtcclxuICAgIHJldHVybiBuZXcgVmVjMih4LCB5KTtcclxufTtcclxuXHJcbmNjLlZlYzIgPSBWZWMyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==