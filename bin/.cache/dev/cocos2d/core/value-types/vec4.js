
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec4.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.v4 = v4;
exports["default"] = void 0;

var _CCClass = _interopRequireDefault(require("../platform/CCClass"));

var _valueType = _interopRequireDefault(require("./value-type"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
var _w = 0.0;
/**
 * !#en Representation of 3D vectors and points.
 * !#zh 表示 3D 向量和坐标
 *
 * @class Vec4
 * @extends ValueType
 */

var Vec4 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec4, _ValueType);

  var _proto = Vec4.prototype;

  // deprecated

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.sub = function sub(vector, out) {
    return Vec4.subtract(out || new Vec4(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.mul = function mul(num, out) {
    return Vec4.multiplyScalar(out || new Vec4(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.div = function div(num, out) {
    return Vec4.multiplyScalar(out || new Vec4(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.scale = function scale(vector, out) {
    return Vec4.multiply(out || new Vec4(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.neg = function neg(out) {
    return Vec4.negate(out || new Vec4(), this);
  };

  /**
   * !#zh 获得指定向量的拷贝
   * !#en Obtaining copy vectors designated
   * @method clone
   * @typescript
   * clone <Out extends IVec4Like> (a: Out): Vec4
   * @static
   */
  Vec4.clone = function clone(a) {
    return new Vec4(a.x, a.y, a.z, a.w);
  }
  /**
   * !#zh 复制目标向量
   * !#en Copy the target vector
   * @method copy
   * @typescript
   * copy <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 设置向量值
   * !#en Set to value
   * @method set
   * @typescript
   * set <Out extends IVec4Like> (out: Out, x: number, y: number, z: number, w: number): Out
   * @static
   */
  ;

  Vec4.set = function set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * !#en Element-wise vector addition
   * @method add
   * @typescript
   * add <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    out.w = a.w + b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * !#en Element-wise vector subtraction
   * @method subtract
   * @typescript
   * subtract <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    out.w = a.w - b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法
   * !#en Element-wise vector multiplication
   * @method multiply
   * @typescript
   * multiply <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    out.w = a.w * b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * !#en Element-wise vector division
   * @method divide
   * @typescript
   * divide <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    out.z = a.z / b.z;
    out.w = a.w / b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * !#en Rounding up by elements of the vector
   * @method ceil
   * @typescript
   * ceil <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    out.z = Math.ceil(a.z);
    out.w = Math.ceil(a.w);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * !#en Element vector by rounding down
   * @method floor
   * @typescript
   * floor <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    out.z = Math.floor(a.z);
    out.w = Math.floor(a.w);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * !#en The minimum by-element vector
   * @method min
   * @typescript
   * min <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    out.w = Math.min(a.w, b.w);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * !#en The maximum value of the element-wise vector
   * @method max
   * @typescript
   * max <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    out.w = Math.max(a.w, b.w);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * !#en Element-wise vector of rounding to whole
   * @method round
   * @typescript
   * round <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    out.z = Math.round(a.z);
    out.w = Math.round(a.w);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * !#en Vector scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar <Out extends IVec4Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Vec4.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * !#en Element-wise vector multiply add: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd <Out extends IVec4Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec4.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * !#en Seeking two vectors Euclidean distance
   * @method distance
   * @typescript
   * distance <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.distance = function distance(a, b) {
    var x = b.x - a.x;
    var y = b.y - a.y;
    var z = b.z - a.z;
    var w = b.w - a.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * !#en Euclidean distance squared seeking two vectors
   * @method squaredDistance
   * @typescript
   * squaredDistance <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.squaredDistance = function squaredDistance(a, b) {
    var x = b.x - a.x;
    var y = b.y - a.y;
    var z = b.z - a.z;
    var w = b.w - a.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * !#zh 求向量长度
   * !#en Seeking vector length
   * @method len
   * @typescript
   * len <Out extends IVec4Like> (a: Out): number
   * @static
   */
  ;

  Vec4.len = function len(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    return Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
  }
  /**
   * !#zh 求向量长度平方
   * !#en Seeking squared vector length
   * @method lengthSqr
   * @typescript
   * lengthSqr <Out extends IVec4Like> (a: Out): number
   * @static
   */
  ;

  Vec4.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    return _x * _x + _y * _y + _z * _z + _w * _w;
  }
  /**
   * !#zh 逐元素向量取负
   * !#en By taking the negative elements of the vector
   * @method negate
   * @typescript
   * negate <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = -a.w;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * !#en Element vector by taking the inverse, return near 0 Infinity
   * @method inverse
   * @typescript
   * inverse <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    out.z = 1.0 / a.z;
    out.w = 1.0 / a.w;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * !#en Element vector by taking the inverse, return near 0 0
   * @method inverseSafe
   * @typescript
   * inverseSafe <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;

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

    if (Math.abs(_z) < _utils.EPSILON) {
      out.z = 0;
    } else {
      out.z = 1.0 / _z;
    }

    if (Math.abs(_w) < _utils.EPSILON) {
      out.w = 0;
    } else {
      out.w = 1.0 / _w;
    }

    return out;
  }
  /**
   * !#zh 归一化向量
   * !#en Normalized vector
   * @method normalize
   * @typescript
   * normalize <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    var len = _x * _x + _y * _y + _z * _z + _w * _w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
      out.w = _w * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * !#en Vector dot product (scalar product)
   * @method dot
   * @typescript
   * dot <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * !#en Vector element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp <Out extends IVec4Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec4.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * !#zh 生成一个在单位球体上均匀分布的随机向量
   * !#en Generates a uniformly distributed random vectors on the unit sphere
   * @method random
   * @typescript
   * random <Out extends IVec4Like> (out: Out, scale?: number): Out
   * @param scale 生成的向量长度
   * @static
   */
  ;

  Vec4.random = function random(out, scale) {
    scale = scale || 1.0;
    var phi = (0, _utils.random)() * 2.0 * Math.PI;
    var cosTheta = (0, _utils.random)() * 2 - 1;
    var sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    out.x = sinTheta * Math.cos(phi) * scale;
    out.y = sinTheta * Math.sin(phi) * scale;
    out.z = cosTheta * scale;
    out.w = 0;
    return out;
  }
  /**
   * !#zh 向量矩阵乘法
   * !#en Vector matrix multiplication
   * @method transformMat4
   * @typescript
   * transformMat4 <Out extends IVec4Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec4.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    var m = mat.m;
    out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
    out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
    out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
    out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
    return out;
  }
  /**
   * !#zh 向量仿射变换
   * !#en Affine transformation vector
   * @method transformAffine
   * @typescript
   * transformAffine<Out extends IVec4Like, VecLike extends IVec4Like, MatLike extends IMat4Like>(out: Out, v: VecLike, mat: MatLike): Out
   * @static
   */
  ;

  Vec4.transformAffine = function transformAffine(out, v, mat) {
    _x = v.x;
    _y = v.y;
    _z = v.z;
    _w = v.w;
    var m = mat.m;
    out.x = m[0] * _x + m[1] * _y + m[2] * _z + m[3] * _w;
    out.y = m[4] * _x + m[5] * _y + m[6] * _z + m[7] * _w;
    out.x = m[8] * _x + m[9] * _y + m[10] * _z + m[11] * _w;
    out.w = v.w;
    return out;
  }
  /**
   * !#zh 向量四元数乘法
   * !#en Vector quaternion multiplication
   * @method transformQuat
   * @typescript
   * transformQuat <Out extends IVec4Like, QuatLike extends IQuatLike> (out: Out, a: Out, q: QuatLike): Out
   * @static
   */
  ;

  Vec4.transformQuat = function transformQuat(out, a, q) {
    var x = a.x,
        y = a.y,
        z = a.z;
    _x = q.x;
    _y = q.y;
    _z = q.z;
    _w = q.w; // calculate quat * vec

    var ix = _w * x + _y * z - _z * y;
    var iy = _w * y + _z * x - _x * z;
    var iz = _w * z + _x * y - _y * x;
    var iw = -_x * x - _y * y - _z * z; // calculate result * inverse quat

    out.x = ix * _w + iw * -_x + iy * -_z - iz * -_y;
    out.y = iy * _w + iw * -_y + iz * -_x - ix * -_z;
    out.z = iz * _w + iw * -_z + ix * -_y - iy * -_x;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 向量等价判断
   * !#en Equivalent vectors Analyzing
   * @method strictEquals
   * @typescript
   * strictEquals <Out extends IVec4Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec4.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * !#en Negative error vector floating point approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals <Out extends IVec4Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Vec4.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * !#zh 向量转数组
   * !#en Vector transfer array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec4Like, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec4.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    out[ofs + 2] = v.z;
    out[ofs + 3] = v.w;
    return out;
  }
  /**
   * !#zh 数组转向量
   * !#en Array steering amount
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec4Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec4.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    out.w = arr[ofs + 3];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
   * @method constructor
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @param {number} [w=0]
   */
  function Vec4(x, y, z, w) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    if (w === void 0) {
      w = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.mag = Vec4.prototype.len;
    _this.magSqr = Vec4.prototype.lengthSqr;
    _this.subSelf = Vec4.prototype.subtract;
    _this.mulSelf = Vec4.prototype.multiplyScalar;
    _this.divSelf = Vec4.prototype.divide;
    _this.scaleSelf = Vec4.prototype.multiply;
    _this.negSelf = Vec4.prototype.negate;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = void 0;
    _this.w = void 0;

    if (x && typeof x === 'object') {
      _this.x = x.x;
      _this.y = x.y;
      _this.z = x.z;
      _this.w = x.w;
    } else {
      _this.x = x;
      _this.y = y;
      _this.z = z;
      _this.w = w;
    }

    return _this;
  }
  /**
   * !#en clone a Vec4 value
   * !#zh 克隆一个 Vec4 值
   * @method clone
   * @return {Vec4}
   */


  _proto.clone = function clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }
  /**
   * !#en Set the current vector value with the given vector.
   * !#zh 用另一个向量设置当前的向量对象值。
   * @method set
   * @param {Vec4} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec4} returns this
   */
  ;

  _proto.set = function set(x, y, z, w) {
    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w || 0;
    }

    return this;
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec4} other
   * @param {number} [epsilon]
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)) && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w));
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 判断当前向量是否在误差范围内与指定分量的向量相等。
   * @method equals4f
   * @param {number} x - 相比较的向量的 x 分量。
   * @param {number} y - 相比较的向量的 y 分量。
   * @param {number} z - 相比较的向量的 z 分量。
   * @param {number} w - 相比较的向量的 w 分量。
   * @param {number} [epsilon] - 允许的误差，应为非负数。
   * @returns {Boolean} - 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
   */
  ;

  _proto.equals4f = function equals4f(x, y, z, w, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)) && Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z)) && Math.abs(this.w - w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(w));
  }
  /**
   * !#en Check whether strict equals other Vec4
   * !#zh 判断当前向量是否与指定向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
   * @method strictEquals
   * @param {Vec4} other - 相比较的向量。
   * @returns {boolean}
   */
  ;

  _proto.strictEquals = function strictEquals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * !#en Check whether strict equals other Vec4
   * !#zh 判断当前向量是否与指定分量的向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
   * @method strictEquals4f
   * @param {number} x - 指定向量的 x 分量。
   * @param {number} y - 指定向量的 y 分量。
   * @param {number} z - 指定向量的 z 分量。
   * @param {number} w - 指定向量的 w 分量。
   * @returns {boolean}
   */
  ;

  _proto.strictEquals4f = function strictEquals4f(x, y, z, w) {
    return this.x === x && this.y === y && this.z === z && this.w === w;
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
   * @method lerp
   * @param {Vec4} to 目标向量。
   * @param {number} ratio 插值比率，范围为 [0,1]。
   * @returns {Vec4}
   */
  ;

  _proto.lerp = function lerp(to, ratio) {
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    this.x = _x + ratio * (to.x - _x);
    this.y = _y + ratio * (to.y - _y);
    this.z = _z + ratio * (to.z - _z);
    this.w = _w + ratio * (to.w - _w);
    return this;
  }
  /**
   * !#en Transform to string with vector informations
   * !#zh 返回当前向量的字符串表示。
   * @method toString
   * @returns {string} 当前向量的字符串表示。
   */
  ;

  _proto.toString = function toString() {
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ", " + this.w.toFixed(2) + ")";
  }
  /**
   * !#en Clamp the vector between minInclusive and maxInclusive.
   * !#zh 设置当前向量的值，使其各个分量都处于指定的范围内。
   * @method clampf
   * @param {Vec4} minInclusive 每个分量都代表了对应分量允许的最小值。
   * @param {Vec4} maxInclusive 每个分量都代表了对应分量允许的最大值。
   * @returns {Vec4}
   */
  ;

  _proto.clampf = function clampf(minInclusive, maxInclusive) {
    this.x = (0, _utils.clamp)(this.x, minInclusive.x, maxInclusive.x);
    this.y = (0, _utils.clamp)(this.y, minInclusive.y, maxInclusive.y);
    this.z = (0, _utils.clamp)(this.z, minInclusive.z, maxInclusive.z);
    this.w = (0, _utils.clamp)(this.w, minInclusive.w, maxInclusive.w);
    return this;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    this.w += vector.w;
    return this;
  }
  /**
   * !#en Adds two vectors, and returns the new result.
   * !#zh 向量加法，并返回新结果。
   * @method add
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec4();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    out.z = this.z + vector.z;
    out.w = this.w + vector.w;
    return out;
  }
  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method subtract
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  ;

  _proto.subtract = function subtract(vector, out) {
    out = out || new Vec4();
    out.x = this.x - vector.x;
    out.y = this.y - vector.y;
    out.z = this.z - vector.z;
    out.w = this.w - vector.w;
    return out;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    this.w *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    this.w *= vector.w;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    this.w /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反
   * @method negate
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec4} [vector]
   * @return {number} the result
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec4} vector
   * @param {Vec4} [out]
   * @return {Vec4} the result
   */
  ;

  _proto.cross = function cross(vector, out) {
    out = out || new Vec4();
    var ax = this.x,
        ay = this.y,
        az = this.z;
    var bx = vector.x,
        by = vector.y,
        bz = vector.z;
    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;
    return out;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v4(10, 10);
   * v.len(); // return 14.142135623730951;
   */
  ;

  _proto.len = function len() {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    this.normalize(this);
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
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} result
   */
  ;

  _proto.normalize = function normalize(out) {
    out = out || new Vec4();
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    var len = _x * _x + _y * _y + _z * _z + _w * _w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
      out.w = _w * len;
    }

    return out;
  }
  /**
   * Transforms the vec4 with a mat4. 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec4} [out] the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @returns {Vec4} out
   */
  ;

  _proto.transformMat4 = function transformMat4(matrix, out) {
    out = out || new Vec4();
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    var m = matrix.m;
    out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
    out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
    out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
    out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
    return out;
  }
  /**
   * Returns the maximum value in x, y, z, w.
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y, this.z, this.w);
  };

  _createClass(Vec4, null, [{
    key: "ZERO",
    get: function get() {
      return new Vec4(0, 0, 0, 0);
    }
  }, {
    key: "ONE",
    get: function get() {
      return new Vec4(1, 1, 1, 1);
    }
  }, {
    key: "NEG_ONE",
    get: function get() {
      return new Vec4(-1, -1, -1, -1);
    }
  }]);

  return Vec4;
}(_valueType["default"]);

exports["default"] = Vec4;
Vec4.sub = Vec4.subtract;
Vec4.mul = Vec4.multiply;
Vec4.div = Vec4.divide;
Vec4.scale = Vec4.multiplyScalar;
Vec4.mag = Vec4.len;
Vec4.squaredMagnitude = Vec4.lengthSqr;
Vec4.ZERO_R = Vec4.ZERO;
Vec4.ONE_R = Vec4.ONE;
Vec4.NEG_ONE_R = Vec4.NEG_ONE;

_CCClass["default"].fastDefine('cc.Vec4', Vec4, {
  x: 0,
  y: 0,
  z: 0,
  w: 0
});

function v4(x, y, z, w) {
  return new Vec4(x, y, z, w);
}

cc.v4 = v4;
cc.Vec4 = Vec4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx2ZWM0LnRzIl0sIm5hbWVzIjpbIl94IiwiX3kiLCJfeiIsIl93IiwiVmVjNCIsInN1YiIsInZlY3RvciIsIm91dCIsInN1YnRyYWN0IiwibXVsIiwibnVtIiwibXVsdGlwbHlTY2FsYXIiLCJkaXYiLCJzY2FsZSIsIm11bHRpcGx5IiwibmVnIiwibmVnYXRlIiwiY2xvbmUiLCJhIiwieCIsInkiLCJ6IiwidyIsImNvcHkiLCJzZXQiLCJhZGQiLCJiIiwiZGl2aWRlIiwiY2VpbCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsIm1heCIsInJvdW5kIiwic2NhbGVBbmRBZGQiLCJkaXN0YW5jZSIsInNxcnQiLCJzcXVhcmVkRGlzdGFuY2UiLCJsZW4iLCJsZW5ndGhTcXIiLCJpbnZlcnNlIiwiaW52ZXJzZVNhZmUiLCJhYnMiLCJFUFNJTE9OIiwibm9ybWFsaXplIiwiZG90IiwibGVycCIsInQiLCJyYW5kb20iLCJwaGkiLCJQSSIsImNvc1RoZXRhIiwic2luVGhldGEiLCJjb3MiLCJzaW4iLCJ0cmFuc2Zvcm1NYXQ0IiwibWF0IiwibSIsInRyYW5zZm9ybUFmZmluZSIsInYiLCJ0cmFuc2Zvcm1RdWF0IiwicSIsIml4IiwiaXkiLCJpeiIsIml3Iiwic3RyaWN0RXF1YWxzIiwiZXF1YWxzIiwiZXBzaWxvbiIsInRvQXJyYXkiLCJvZnMiLCJmcm9tQXJyYXkiLCJhcnIiLCJtYWciLCJwcm90b3R5cGUiLCJtYWdTcXIiLCJzdWJTZWxmIiwibXVsU2VsZiIsImRpdlNlbGYiLCJzY2FsZVNlbGYiLCJuZWdTZWxmIiwib3RoZXIiLCJlcXVhbHM0ZiIsInN0cmljdEVxdWFsczRmIiwidG8iLCJyYXRpbyIsInRvU3RyaW5nIiwidG9GaXhlZCIsImNsYW1wZiIsIm1pbkluY2x1c2l2ZSIsIm1heEluY2x1c2l2ZSIsImFkZFNlbGYiLCJjcm9zcyIsImF4IiwiYXkiLCJheiIsImJ4IiwiYnkiLCJieiIsIm5vcm1hbGl6ZVNlbGYiLCJtYXRyaXgiLCJtYXhBeGlzIiwiVmFsdWVUeXBlIiwic3F1YXJlZE1hZ25pdHVkZSIsIlpFUk9fUiIsIlpFUk8iLCJPTkVfUiIsIk9ORSIsIk5FR19PTkVfUiIsIk5FR19PTkUiLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsInY0IiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDcUJDOzs7OztBQUNqQjs7QUFTQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDSUMsTUFBQSxhQUFLQyxNQUFMLEVBQW1CQyxHQUFuQixFQUErQjtBQUMzQixXQUFPSCxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBRyxJQUFJLElBQUlILElBQUosRUFBckIsRUFBaUMsSUFBakMsRUFBdUNFLE1BQXZDLENBQVA7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDSUcsTUFBQSxhQUFLQyxHQUFMLEVBQWtCSCxHQUFsQixFQUE4QjtBQUMxQixXQUFPSCxJQUFJLENBQUNPLGNBQUwsQ0FBb0JKLEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQTNCLEVBQXVDLElBQXZDLEVBQTZDTSxHQUE3QyxDQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1NBQ0lFLE1BQUEs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QyxLQThHTW9HLFNBQVNwRyxJQUFJLENBQUNxRztBQTlHcEJyRyxLQWlITXNHLFFBQVF0RyxJQUFJLENBQUN1RztBQWpIbkJ2RyxLQW9ITXdHLFlBQVl4RyxJQUFJLENBQUN5Rzs7QUEwK0I1Q0Msb0JBQVFDLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEIzRyxJQUE5QixFQUFvQztBQUFFZSxFQUFBQSxDQUFDLEVBQUUsQ0FBTDtBQUFRQyxFQUFBQSxDQUFDLEVBQUUsQ0FBWDtBQUFjQyxFQUFBQSxDQUFDLEVBQUUsQ0FBakI7QUFBb0JDLEVBQUFBLENBQUMsRUFBRTtBQUF2QixDQUFwQzs7QUFLTyxTQUFTMEYsRUFBVCxDQUFhN0YsQ0FBYixFQUFnQ0MsQ0FBaEMsRUFBNENDLENBQTVDLEVBQXdEQyxDQUF4RCxFQUFvRTtBQUN2RSxTQUFPLElBQUlsQixJQUFKLENBQVNlLENBQVQsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsQ0FBUDtBQUNIOztBQUVEMkYsRUFBRSxDQUFDRCxFQUFILEdBQVFBLEVBQVI7QUFDQUMsRUFBRSxDQUFDN0csSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuIENvcHlyaWdodCAoYykgMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zLmNvbVxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuaW1wb3J0IENDQ2xhc3MgZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzcyc7XHJcbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcclxuaW1wb3J0IE1hdDQgZnJvbSAnLi9tYXQ0JztcclxuaW1wb3J0IHsgY2xhbXAsIEVQU0lMT04sIHJhbmRvbSB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxubGV0IF94OiBudW1iZXIgPSAwLjA7XHJcbmxldCBfeTogbnVtYmVyID0gMC4wO1xyXG5sZXQgX3o6IG51bWJlciA9IDAuMDtcclxubGV0IF93OiBudW1iZXIgPSAwLjA7XHJcblxyXG4vKipcclxuICogISNlbiBSZXByZXNlbnRhdGlvbiBvZiAzRCB2ZWN0b3JzIGFuZCBwb2ludHMuXHJcbiAqICEjemgg6KGo56S6IDNEIOWQkemHj+WSjOWdkOagh1xyXG4gKlxyXG4gKiBAY2xhc3MgVmVjNFxyXG4gKiBAZXh0ZW5kcyBWYWx1ZVR5cGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlYzQgZXh0ZW5kcyBWYWx1ZVR5cGUge1xyXG4gICAgLy8gZGVwcmVjYXRlZFxyXG4gICAgcHVibGljIHN0YXRpYyBzdWIgICA9IFZlYzQuc3VidHJhY3Q7XHJcbiAgICBwdWJsaWMgc3RhdGljIG11bCAgID0gVmVjNC5tdWx0aXBseTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZGl2ID0gVmVjNC5kaXZpZGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlID0gVmVjNC5tdWx0aXBseVNjYWxhcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgbWFnICAgPSBWZWM0LmxlbjtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3F1YXJlZE1hZ25pdHVkZSA9IFZlYzQubGVuZ3RoU3FyO1xyXG4gICAgbWFnICA9IFZlYzQucHJvdG90eXBlLmxlbjtcclxuICAgIG1hZ1NxciA9IFZlYzQucHJvdG90eXBlLmxlbmd0aFNxcjtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2Ugc3ViKCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg5ZCR6YeP5YeP5rOV44CC5aaC5p6c5L2g5oOz5L+d5a2Y57uT5p6c5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIHN1YigpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBzdWJTZWxmXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIHN1YlNlbGYgID0gVmVjNC5wcm90b3R5cGUuc3VidHJhY3Q7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg5ZCR6YeP5YeP5rOV77yM5bm26L+U5Zue5paw57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIHN1YlxyXG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWM0IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWM0IHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjNH0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBzdWIgKHZlY3RvcjogVmVjNCwgb3V0PzogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiBWZWM0LnN1YnRyYWN0KG91dCB8fCBuZXcgVmVjNCgpLCB0aGlzLCB2ZWN0b3IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdGhpcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBtdWwoKSBpbnN0ZWFkLlxyXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggbXVsKCkg5Luj5pu/44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bFNlbGZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBtdWxTZWxmICA9IFZlYzQucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgYnkgYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxyXG4gICAgICogISN6aCDnvKnmlL7lkJHph4/vvIzlubbov5Tlm57mlrDnu5PmnpzjgIJcclxuICAgICAqIEBtZXRob2QgbXVsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgbXVsIChudW06IG51bWJlciwgb3V0PzogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiBWZWM0Lm11bHRpcGx5U2NhbGFyKG91dCB8fCBuZXcgVmVjNCgpLCB0aGlzLCBudW0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERpdmlkZXMgYnkgYSBudW1iZXIuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgZGl2KCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIGRpdigpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBkaXZTZWxmXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgZGl2U2VsZiAgPSBWZWM0LnByb3RvdHlwZS5kaXZpZGU7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlciwgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOWQkemHj+mZpOazle+8jOW5tui/lOWbnuaWsOeahOe7k+aenOOAglxyXG4gICAgICogQG1ldGhvZCBkaXZcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWM0IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWM0IHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjNH0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBkaXYgKG51bTogbnVtYmVyLCBvdXQ/OiBWZWM0KTogVmVjNCB7XHJcbiAgICAgICAgcmV0dXJuIFZlYzQubXVsdGlwbHlTY2FsYXIob3V0IHx8IG5ldyBWZWM0KCksIHRoaXMsIDEvbnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHR3byB2ZWN0b3JzLlxyXG4gICAgICogISN6aCDliIbph4/nm7jkuZjjgIJcclxuICAgICAqIEBtZXRob2Qgc2NhbGVTZWxmXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIHNjYWxlU2VsZiA9IFZlYzQucHJvdG90eXBlLm11bHRpcGx5O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxyXG4gICAgICogISN6aCDliIbph4/nm7jkuZjvvIzlubbov5Tlm57mlrDnmoTnu5PmnpzjgIJcclxuICAgICAqIEBtZXRob2Qgc2NhbGVcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgc2NhbGUgKHZlY3RvcjogVmVjNCwgb3V0PzogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiBWZWM0Lm11bHRpcGx5KG91dCB8fCBuZXcgVmVjNCgpLCB0aGlzLCB2ZWN0b3IpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgbmVnKCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg5ZCR6YeP5Y+W5Y+N44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIG5lZygpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBuZWdTZWxmXHJcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgbmVnU2VsZiA9IFZlYzQucHJvdG90eXBlLm5lZ2F0ZTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOZWdhdGVzIHRoZSBjb21wb25lbnRzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg6L+U5Zue5Y+W5Y+N5ZCO55qE5paw5ZCR6YeP44CCXHJcbiAgICAgKiBAbWV0aG9kIG5lZ1xyXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSB0aGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIG5lZyAob3V0PzogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiBWZWM0Lm5lZ2F0ZShvdXQgfHwgbmV3IFZlYzQoKSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgWkVSTyAoKSB7IHJldHVybiBuZXcgVmVjNCgwLCAwLCAwLCAwKTsgfVxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBaRVJPX1IgPSBWZWM0LlpFUk87XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgT05FICgpIHsgcmV0dXJuIG5ldyBWZWM0KDEsIDEsIDEsIDEpOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9ORV9SID0gVmVjNC5PTkU7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTkVHX09ORSAoKSB7IHJldHVybiBuZXcgVmVjNCgtMSwgLTEsIC0xLCAtMSk7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTkVHX09ORV9SID0gVmVjNC5ORUdfT05FO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cclxuICAgICAqICEjZW4gT2J0YWluaW5nIGNvcHkgdmVjdG9ycyBkZXNpZ25hdGVkXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2xvbmUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCk6IFZlYzRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KGEueCwgYS55LCBhLnosIGEudyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWkjeWItuebruagh+WQkemHj1xyXG4gICAgICogISNlbiBDb3B5IHRoZSB0YXJnZXQgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIGNvcHlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb3B5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54O1xyXG4gICAgICAgIG91dC55ID0gYS55O1xyXG4gICAgICAgIG91dC56ID0gYS56O1xyXG4gICAgICAgIG91dC53ID0gYS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuvue9ruWQkemHj+WAvFxyXG4gICAgICogISNlbiBTZXQgdG8gdmFsdWVcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc2V0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICBvdXQueiA9IHo7XHJcbiAgICAgICAgb3V0LncgPSB3O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WKoOazlVxyXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGFkZGl0aW9uXHJcbiAgICAgKiBAbWV0aG9kIGFkZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGFkZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSArIGIueTtcclxuICAgICAgICBvdXQueiA9IGEueiArIGIuejtcclxuICAgICAgICBvdXQudyA9IGEudyArIGIudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lh4/ms5VcclxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvblxyXG4gICAgICogQG1ldGhvZCBzdWJ0cmFjdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN1YnRyYWN0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggLSBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLnogLSBiLno7XHJcbiAgICAgICAgb3V0LncgPSBhLncgLSBiLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5rOVXHJcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgbXVsdGlwbGljYXRpb25cclxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBtdWx0aXBseSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHkgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55ICogYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56ICogYi56O1xyXG4gICAgICAgIG91dC53ID0gYS53ICogYi53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+mZpOazlVxyXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uXHJcbiAgICAgKiBAbWV0aG9kIGRpdmlkZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRpdmlkZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAvIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAvIGIueTtcclxuICAgICAgICBvdXQueiA9IGEueiAvIGIuejtcclxuICAgICAgICBvdXQudyA9IGEudyAvIGIudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lkJHkuIrlj5bmlbRcclxuICAgICAqICEjZW4gUm91bmRpbmcgdXAgYnkgZWxlbWVudHMgb2YgdGhlIHZlY3RvclxyXG4gICAgICogQG1ldGhvZCBjZWlsXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2VpbCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNlaWwgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGguY2VpbChhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5jZWlsKGEueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLmNlaWwoYS56KTtcclxuICAgICAgICBvdXQudyA9IE1hdGguY2VpbChhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxyXG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSByb3VuZGluZyBkb3duXHJcbiAgICAgKiBAbWV0aG9kIGZsb29yXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZmxvb3IgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5mbG9vcihhLnopO1xyXG4gICAgICAgIG91dC53ID0gTWF0aC5mbG9vcihhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxyXG4gICAgICogISNlbiBUaGUgbWluaW11bSBieS1lbGVtZW50IHZlY3RvclxyXG4gICAgICogQG1ldGhvZCBtaW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBtaW4gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG1pbiA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLm1pbihhLngsIGIueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLm1pbihhLnosIGIueik7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLm1pbihhLncsIGIudyk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XHJcbiAgICAgKiAhI2VuIFRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBlbGVtZW50LXdpc2UgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIG1heFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG1heCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWF4IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgubWF4KGEueiwgYi56KTtcclxuICAgICAgICBvdXQudyA9IE1hdGgubWF4KGEudywgYi53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcclxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBvZiByb3VuZGluZyB0byB3aG9sZVxyXG4gICAgICogQG1ldGhvZCByb3VuZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdW5kIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcm91bmQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgucm91bmQoYS54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgucm91bmQoYS55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgucm91bmQoYS56KTtcclxuICAgICAgICBvdXQudyA9IE1hdGgucm91bmQoYS53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/moIfph4/kuZjms5VcclxuICAgICAqICEjZW4gVmVjdG9yIHNjYWxhciBtdWx0aXBsaWNhdGlvblxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKiBiO1xyXG4gICAgICAgIG91dC55ID0gYS55ICogYjtcclxuICAgICAgICBvdXQueiA9IGEueiAqIGI7XHJcbiAgICAgICAgb3V0LncgPSBhLncgKiBiO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxyXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIG11bHRpcGx5IGFkZDogQSArIEIgKiBzY2FsZVxyXG4gICAgICogQG1ldGhvZCBzY2FsZUFuZEFkZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzY2FsZUFuZEFkZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKyAoYi54ICogc2NhbGUpO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgKGIueSAqIHNjYWxlKTtcclxuICAgICAgICBvdXQueiA9IGEueiArIChiLnogKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0LncgPSBhLncgKyAoYi53ICogc2NhbGUpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu1xyXG4gICAgICogISNlbiBTZWVraW5nIHR3byB2ZWN0b3JzIEV1Y2xpZGVhbiBkaXN0YW5jZVxyXG4gICAgICogQG1ldGhvZCBkaXN0YW5jZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IHggPSBiLnggLSBhLng7XHJcbiAgICAgICAgY29uc3QgeSA9IGIueSAtIGEueTtcclxuICAgICAgICBjb25zdCB6ID0gYi56IC0gYS56O1xyXG4gICAgICAgIGNvbnN0IHcgPSBiLncgLSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxyXG4gICAgICogISNlbiBFdWNsaWRlYW4gZGlzdGFuY2Ugc3F1YXJlZCBzZWVraW5nIHR3byB2ZWN0b3JzXHJcbiAgICAgKiBAbWV0aG9kIHNxdWFyZWREaXN0YW5jZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzcXVhcmVkRGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGIueCAtIGEueDtcclxuICAgICAgICBjb25zdCB5ID0gYi55IC0gYS55O1xyXG4gICAgICAgIGNvbnN0IHogPSBiLnogLSBhLno7XHJcbiAgICAgICAgY29uc3QgdyA9IGIudyAtIGEudztcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguWQkemHj+mVv+W6plxyXG4gICAgICogISNlbiBTZWVraW5nIHZlY3RvciBsZW5ndGhcclxuICAgICAqIEBtZXRob2QgbGVuXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbGVuIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZW4gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIF96ID0gYS56O1xyXG4gICAgICAgIF93ID0gYS53O1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoX3ggKiBfeCArIF95ICogX3kgKyBfeiAqIF96ICsgX3cgKiBfdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguWQkemHj+mVv+W6puW5s+aWuVxyXG4gICAgICogISNlbiBTZWVraW5nIHNxdWFyZWQgdmVjdG9yIGxlbmd0aFxyXG4gICAgICogQG1ldGhvZCBsZW5ndGhTcXJcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZW5ndGhTcXIgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlbmd0aFNxciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgX3ogPSBhLno7XHJcbiAgICAgICAgX3cgPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfeiArIF93ICogX3c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPlui0n1xyXG4gICAgICogISNlbiBCeSB0YWtpbmcgdGhlIG5lZ2F0aXZlIGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEBtZXRob2QgbmVnYXRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAtYS54O1xyXG4gICAgICAgIG91dC55ID0gLWEueTtcclxuICAgICAgICBvdXQueiA9IC1hLno7XHJcbiAgICAgICAgb3V0LncgPSAtYS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniBJbmZpbml0eVxyXG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSB0YWtpbmcgdGhlIGludmVyc2UsIHJldHVybiBuZWFyIDAgSW5maW5pdHlcclxuICAgICAqIEBtZXRob2QgaW52ZXJzZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGludmVyc2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAxLjAgLyBhLng7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XHJcbiAgICAgICAgb3V0LnogPSAxLjAgLyBhLno7XHJcbiAgICAgICAgb3V0LncgPSAxLjAgLyBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIDBcclxuICAgICAqICEjZW4gRWxlbWVudCB2ZWN0b3IgYnkgdGFraW5nIHRoZSBpbnZlcnNlLCByZXR1cm4gbmVhciAwIDBcclxuICAgICAqIEBtZXRob2QgaW52ZXJzZVNhZmVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBpbnZlcnNlU2FmZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGludmVyc2VTYWZlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgX3ogPSBhLno7XHJcbiAgICAgICAgX3cgPSBhLnc7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhfeCkgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIG91dC54ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQueCA9IDEuMCAvIF94O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKF95KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC55ID0gMS4wIC8gX3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoX3opIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueiA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnogPSAxLjAgLyBfejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhfdykgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIG91dC53ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQudyA9IDEuMCAvIF93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5b2S5LiA5YyW5ZCR6YePXHJcbiAgICAgKiAhI2VuIE5vcm1hbGl6ZWQgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIF96ID0gYS56O1xyXG4gICAgICAgIF93ID0gYS53O1xyXG4gICAgICAgIGxldCBsZW4gPSBfeCAqIF94ICsgX3kgKiBfeSArIF96ICogX3ogKyBfdyAqIF93O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgb3V0LnggPSBfeCAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnkgPSBfeSAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnogPSBfeiAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LncgPSBfdyAqIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXHJcbiAgICAgKiAhI2VuIFZlY3RvciBkb3QgcHJvZHVjdCAoc2NhbGFyIHByb2R1Y3QpXHJcbiAgICAgKiBAbWV0aG9kIGRvdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRvdCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkb3QgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxyXG4gICAgICogISNlbiBWZWN0b3IgZWxlbWVudCBieSBlbGVtZW50IGxpbmVhciBpbnRlcnBvbGF0aW9uOiBBICsgdCAqIChCIC0gQSlcclxuICAgICAqIEBtZXRob2QgbGVycFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxlcnAgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIHQgKiAoYi54IC0gYS54KTtcclxuICAgICAgICBvdXQueSA9IGEueSArIHQgKiAoYi55IC0gYS55KTtcclxuICAgICAgICBvdXQueiA9IGEueiArIHQgKiAoYi56IC0gYS56KTtcclxuICAgICAgICBvdXQudyA9IGEudyArIHQgKiAoYi53IC0gYS53KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDnlJ/miJDkuIDkuKrlnKjljZXkvY3nkIPkvZPkuIrlnYfljIDliIbluIPnmoTpmo/mnLrlkJHph49cclxuICAgICAqICEjZW4gR2VuZXJhdGVzIGEgdW5pZm9ybWx5IGRpc3RyaWJ1dGVkIHJhbmRvbSB2ZWN0b3JzIG9uIHRoZSB1bml0IHNwaGVyZVxyXG4gICAgICogQG1ldGhvZCByYW5kb21cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByYW5kb20gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIHNjYWxlIOeUn+aIkOeahOWQkemHj+mVv+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBoaSA9IHJhbmRvbSgpICogMi4wICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBjb3NUaGV0YSA9IHJhbmRvbSgpICogMiAtIDE7XHJcbiAgICAgICAgY29uc3Qgc2luVGhldGEgPSBNYXRoLnNxcnQoMSAtIGNvc1RoZXRhICogY29zVGhldGEpO1xyXG5cclxuICAgICAgICBvdXQueCA9IHNpblRoZXRhICogTWF0aC5jb3MocGhpKSAqIHNjYWxlO1xyXG4gICAgICAgIG91dC55ID0gc2luVGhldGEgKiBNYXRoLnNpbihwaGkpICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnogPSBjb3NUaGV0YSAqIHNjYWxlO1xyXG4gICAgICAgIG91dC53ID0gMDtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/nn6npmLXkuZjms5VcclxuICAgICAqICEjZW4gVmVjdG9yIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQ0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgX3ogPSBhLno7XHJcbiAgICAgICAgX3cgPSBhLnc7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBvdXQueCA9IG1bMF0gKiBfeCArIG1bNF0gKiBfeSArIG1bOF0gICogX3ogKyBtWzEyXSAqIF93O1xyXG4gICAgICAgIG91dC55ID0gbVsxXSAqIF94ICsgbVs1XSAqIF95ICsgbVs5XSAgKiBfeiArIG1bMTNdICogX3c7XHJcbiAgICAgICAgb3V0LnogPSBtWzJdICogX3ggKyBtWzZdICogX3kgKyBtWzEwXSAqIF96ICsgbVsxNF0gKiBfdztcclxuICAgICAgICBvdXQudyA9IG1bM10gKiBfeCArIG1bN10gKiBfeSArIG1bMTFdICogX3ogKyBtWzE1XSAqIF93O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+S7v+WwhOWPmOaNolxyXG4gICAgICogISNlbiBBZmZpbmUgdHJhbnNmb3JtYXRpb24gdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybUFmZmluZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRyYW5zZm9ybUFmZmluZTxPdXQgZXh0ZW5kcyBJVmVjNExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjNExpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0NExpa2U+KG91dDogT3V0LCB2OiBWZWNMaWtlLCBtYXQ6IE1hdExpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1BZmZpbmU8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPlxyXG4gICAgICAgIChvdXQ6IE91dCwgdjogVmVjTGlrZSwgbWF0OiBNYXRMaWtlKSB7XHJcbiAgICAgICAgX3ggPSB2Lng7XHJcbiAgICAgICAgX3kgPSB2Lnk7XHJcbiAgICAgICAgX3ogPSB2Lno7XHJcbiAgICAgICAgX3cgPSB2Lnc7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBvdXQueCA9IG1bMF0gKiBfeCArIG1bMV0gKiBfeSArIG1bMl0gICogX3ogKyBtWzNdICogX3c7XHJcbiAgICAgICAgb3V0LnkgPSBtWzRdICogX3ggKyBtWzVdICogX3kgKyBtWzZdICAqIF96ICsgbVs3XSAqIF93O1xyXG4gICAgICAgIG91dC54ID0gbVs4XSAqIF94ICsgbVs5XSAqIF95ICsgbVsxMF0gKiBfeiArIG1bMTFdICogX3c7XHJcbiAgICAgICAgb3V0LncgPSB2Lnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP5Zub5YWD5pWw5LmY5rOVXHJcbiAgICAgKiAhI2VuIFZlY3RvciBxdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybVF1YXRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0cmFuc2Zvcm1RdWF0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcTogUXVhdExpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0cmFuc2Zvcm1RdWF0IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcTogUXVhdExpa2UpIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XHJcblxyXG4gICAgICAgIF94ID0gcS54O1xyXG4gICAgICAgIF95ID0gcS55O1xyXG4gICAgICAgIF96ID0gcS56O1xyXG4gICAgICAgIF93ID0gcS53O1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGUgcXVhdCAqIHZlY1xyXG4gICAgICAgIGNvbnN0IGl4ID0gX3cgKiB4ICsgX3kgKiB6IC0gX3ogKiB5O1xyXG4gICAgICAgIGNvbnN0IGl5ID0gX3cgKiB5ICsgX3ogKiB4IC0gX3ggKiB6O1xyXG4gICAgICAgIGNvbnN0IGl6ID0gX3cgKiB6ICsgX3ggKiB5IC0gX3kgKiB4O1xyXG4gICAgICAgIGNvbnN0IGl3ID0gLV94ICogeCAtIF95ICogeSAtIF96ICogejtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxyXG4gICAgICAgIG91dC54ID0gaXggKiBfdyArIGl3ICogLV94ICsgaXkgKiAtX3ogLSBpeiAqIC1feTtcclxuICAgICAgICBvdXQueSA9IGl5ICogX3cgKyBpdyAqIC1feSArIGl6ICogLV94IC0gaXggKiAtX3o7XHJcbiAgICAgICAgb3V0LnogPSBpeiAqIF93ICsgaXcgKiAtX3ogKyBpeCAqIC1feSAtIGl5ICogLV94O1xyXG4gICAgICAgIG91dC53ID0gYS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+etieS7t+WIpOaWrVxyXG4gICAgICogISNlbiBFcXVpdmFsZW50IHZlY3RvcnMgQW5hbHl6aW5nXHJcbiAgICAgKiBAbWV0aG9kIHN0cmljdEVxdWFsc1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN0cmljdEVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBib29sZWFuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaWN0RXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueSAmJiBhLnogPT09IGIueiAmJiBhLncgPT09IGIudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5ZCR6YeP6L+R5Ly8562J5Lu35Yik5patXHJcbiAgICAgKiAhI2VuIE5lZ2F0aXZlIGVycm9yIHZlY3RvciBmbG9hdGluZyBwb2ludCBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnQgQW5hbHl6aW5nXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGVxdWFscyA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24/OiBudW1iZXIpOiBib29sZWFuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCwgZXBzaWxvbiA9IEVQU0lMT04pIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEueCAtIGIueCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS54KSwgTWF0aC5hYnMoYi54KSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYS55IC0gYi55KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnkpLCBNYXRoLmFicyhiLnkpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhLnogLSBiLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueiksIE1hdGguYWJzKGIueikpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGEudyAtIGIudykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS53KSwgTWF0aC5hYnMoYi53KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/ovazmlbDnu4RcclxuICAgICAqICEjZW4gVmVjdG9yIHRyYW5zZmVyIGFycmF5XHJcbiAgICAgKiBAbWV0aG9kIHRvQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjNExpa2UsIG9mcz86IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjNExpa2UsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXRbb2ZzICsgMF0gPSB2Lng7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHYuejtcclxuICAgICAgICBvdXRbb2ZzICsgM10gPSB2Lnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5pWw57uE6L2s5ZCR6YePXHJcbiAgICAgKiAhI2VuIEFycmF5IHN0ZWVyaW5nIGFtb3VudFxyXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb2ZzID0gMCkge1xyXG4gICAgICAgIG91dC54ID0gYXJyW29mcyArIDBdO1xyXG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xyXG4gICAgICAgIG91dC56ID0gYXJyW29mcyArIDJdO1xyXG4gICAgICAgIG91dC53ID0gYXJyW29mcyArIDNdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0geFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB6OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gd1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdzogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy92ZWM0Om1ldGhvZFwifX1jYy52NHt7L2Nyb3NzTGlua319XHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmnoTpgKDlh73mlbDvvIzlj6/mn6XnnIsge3sjY3Jvc3NMaW5rIFwiY2MvdmVjNDptZXRob2RcIn19Y2MudjR7ey9jcm9zc0xpbmt9fVxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbej0wXVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFt3PTBdXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yICh4OiBudW1iZXIgfCBWZWM0ID0gMCwgeTogbnVtYmVyID0gMCwgejogbnVtYmVyID0gMCwgdzogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4IGFzIG51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICAgICAgdGhpcy56ID0gejtcclxuICAgICAgICAgICAgdGhpcy53ID0gdztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGNsb25lIGEgVmVjNCB2YWx1ZVxyXG4gICAgICogISN6aCDlhYvpmobkuIDkuKogVmVjNCDlgLxcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWM0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgY3VycmVudCB2ZWN0b3IgdmFsdWUgd2l0aCB0aGUgZ2l2ZW4gdmVjdG9yLlxyXG4gICAgICogISN6aCDnlKjlj6bkuIDkuKrlkJHph4/orr7nva7lvZPliY3nmoTlkJHph4/lr7nosaHlgLzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IG5ld1ZhbHVlIC0gISNlbiBuZXcgdmFsdWUgdG8gc2V0LiAhI3poIOimgeiuvue9rueahOaWsOWAvFxyXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXQgKG90aGVyOiBWZWM0KTtcclxuXHJcbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKTtcclxuXHJcbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xyXG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcclxuICAgICAgICAgICAgdGhpcy56ID0geC56O1xyXG4gICAgICAgICAgICB0aGlzLncgPSB4Lnc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geCBhcyBudW1iZXIgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHcgfHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBlcXVhbHMgYW5vdGhlciBvbmVcclxuICAgICAqICEjemgg5b2T5YmN55qE5ZCR6YeP5piv5ZCm5LiO5oyH5a6a55qE5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHBhcmFtIHtWZWM0fSBvdGhlclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtlcHNpbG9uXVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVxdWFscyAob3RoZXI6IFZlYzQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLngpLCBNYXRoLmFicyhvdGhlci54KSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55IC0gb3RoZXIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMob3RoZXIueSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMueiAtIG90aGVyLnopIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueiksIE1hdGguYWJzKG90aGVyLnopKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLncgLSBvdGhlci53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLncpLCBNYXRoLmFicyhvdGhlci53KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgZXF1YWxzIGFub3RoZXIgb25lXHJcbiAgICAgKiAhI3poIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuWcqOivr+W3ruiMg+WbtOWGheS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAglxyXG4gICAgICogQG1ldGhvZCBlcXVhbHM0ZlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSDnm7jmr5TovoPnmoTlkJHph4/nmoQgeCDliIbph4/jgIJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g55u45q+U6L6D55qE5ZCR6YeP55qEIHkg5YiG6YeP44CCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geiAtIOebuOavlOi+g+eahOWQkemHj+eahCB6IOWIhumHj+OAglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgLSDnm7jmr5TovoPnmoTlkJHph4/nmoQgdyDliIbph4/jgIJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZXBzaWxvbl0gLSDlhYHorrjnmoTor6/lt67vvIzlupTkuLrpnZ7otJ/mlbDjgIJcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSAtIOW9k+S4pOWQkemHj+eahOWQhOWIhumHj+mDveWcqOaMh+WumueahOivr+W3ruiMg+WbtOWGheWIhuWIq+ebuOetieaXtu+8jOi/lOWbniBgdHJ1ZWDvvJvlkKbliJnov5Tlm54gYGZhbHNlYOOAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXF1YWxzNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlciwgZXBzaWxvbiA9IEVQU0lMT04pIHtcclxuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMueCAtIHgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnkgLSB5KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnkpLCBNYXRoLmFicyh5KSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy56IC0geikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy56KSwgTWF0aC5hYnMoeikpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMudyAtIHcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMudyksIE1hdGguYWJzKHcpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgc3RyaWN0IGVxdWFscyBvdGhlciBWZWM0XHJcbiAgICAgKiAhI3poIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWQkemHj+ebuOetieOAguS4pOWQkemHj+eahOWQhOWIhumHj+mDveWIhuWIq+ebuOetieaXtui/lOWbniBgdHJ1ZWDvvJvlkKbliJnov5Tlm54gYGZhbHNlYOOAglxyXG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHNcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gb3RoZXIgLSDnm7jmr5TovoPnmoTlkJHph4/jgIJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzIChvdGhlcjogVmVjNCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIueiAmJiB0aGlzLncgPT09IG90aGVyLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgc3RyaWN0IGVxdWFscyBvdGhlciBWZWM0XHJcbiAgICAgKiAhI3poIOWIpOaWreW9k+WJjeWQkemHj+aYr+WQpuS4juaMh+WumuWIhumHj+eahOWQkemHj+ebuOetieOAguS4pOWQkemHj+eahOWQhOWIhumHj+mDveWIhuWIq+ebuOetieaXtui/lOWbniBgdHJ1ZWDvvJvlkKbliJnov5Tlm54gYGZhbHNlYOOAglxyXG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHM0ZlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSDmjIflrprlkJHph4/nmoQgeCDliIbph4/jgIJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g5oyH5a6a5ZCR6YeP55qEIHkg5YiG6YeP44CCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geiAtIOaMh+WumuWQkemHj+eahCB6IOWIhumHj+OAglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgLSDmjIflrprlkJHph4/nmoQgdyDliIbph4/jgIJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IHggJiYgdGhpcy55ID09PSB5ICYmIHRoaXMueiA9PT0geiAmJiB0aGlzLncgPT09IHc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENhbGN1bGF0ZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiByZXN1bHQgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciBvbmUgd2l0aCBnaXZlbiByYXRpb1xyXG4gICAgICogISN6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lkJHph4/liLDnm67moIflkJHph4/kuYvpl7TlgZrmj5LlgLzjgIJcclxuICAgICAqIEBtZXRob2QgbGVycFxyXG4gICAgICogQHBhcmFtIHtWZWM0fSB0byDnm67moIflkJHph4/jgIJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyDmj5LlgLzmr5TnjofvvIzojIPlm7TkuLogWzAsMV3jgIJcclxuICAgICAqIEByZXR1cm5zIHtWZWM0fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVycCAodG86IFZlYzQsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgICAgICBfeCA9IHRoaXMueDtcclxuICAgICAgICBfeSA9IHRoaXMueTtcclxuICAgICAgICBfeiA9IHRoaXMuejtcclxuICAgICAgICBfdyA9IHRoaXMudztcclxuICAgICAgICB0aGlzLnggPSBfeCArIHJhdGlvICogKHRvLnggLSBfeCk7XHJcbiAgICAgICAgdGhpcy55ID0gX3kgKyByYXRpbyAqICh0by55IC0gX3kpO1xyXG4gICAgICAgIHRoaXMueiA9IF96ICsgcmF0aW8gKiAodG8ueiAtIF96KTtcclxuICAgICAgICB0aGlzLncgPSBfdyArIHJhdGlvICogKHRvLncgLSBfdyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYW5zZm9ybSB0byBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeWQkemHj+eahOWtl+espuS4suihqOekuuOAglxyXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xyXG4gICAgICogQHJldHVybnMge3N0cmluZ30g5b2T5YmN5ZCR6YeP55qE5a2X56ym5Liy6KGo56S644CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b1N0cmluZyAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYCgke3RoaXMueC50b0ZpeGVkKDIpfSwgJHt0aGlzLnkudG9GaXhlZCgyKX0sICR7dGhpcy56LnRvRml4ZWQoMil9LCAke3RoaXMudy50b0ZpeGVkKDIpfSlgO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gbWluSW5jbHVzaXZlIGFuZCBtYXhJbmNsdXNpdmUuXHJcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeWQkemHj+eahOWAvO+8jOS9v+WFtuWQhOS4quWIhumHj+mDveWkhOS6juaMh+WumueahOiMg+WbtOWGheOAglxyXG4gICAgICogQG1ldGhvZCBjbGFtcGZcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gbWluSW5jbHVzaXZlIOavj+S4quWIhumHj+mDveS7o+ihqOS6huWvueW6lOWIhumHj+WFgeiuuOeahOacgOWwj+WAvOOAglxyXG4gICAgICogQHBhcmFtIHtWZWM0fSBtYXhJbmNsdXNpdmUg5q+P5Liq5YiG6YeP6YO95Luj6KGo5LqG5a+55bqU5YiG6YeP5YWB6K6455qE5pyA5aSn5YC844CCXHJcbiAgICAgKiBAcmV0dXJucyB7VmVjNH1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsYW1wZiAobWluSW5jbHVzaXZlOiBWZWM0LCBtYXhJbmNsdXNpdmU6IFZlYzQpIHtcclxuICAgICAgICB0aGlzLnggPSBjbGFtcCh0aGlzLngsIG1pbkluY2x1c2l2ZS54LCBtYXhJbmNsdXNpdmUueCk7XHJcbiAgICAgICAgdGhpcy55ID0gY2xhbXAodGhpcy55LCBtaW5JbmNsdXNpdmUueSwgbWF4SW5jbHVzaXZlLnkpO1xyXG4gICAgICAgIHRoaXMueiA9IGNsYW1wKHRoaXMueiwgbWluSW5jbHVzaXZlLnosIG1heEluY2x1c2l2ZS56KTtcclxuICAgICAgICB0aGlzLncgPSBjbGFtcCh0aGlzLncsIG1pbkluY2x1c2l2ZS53LCBtYXhJbmNsdXNpdmUudyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFkZHMgdGhpcyB2ZWN0b3IuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgYWRkKCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV44CC5aaC5p6c5L2g5oOz5L+d5a2Y57uT5p6c5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5L2/55SoIGFkZCgpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBhZGRTZWxmXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGFkZFNlbGYgKHZlY3RvcjogVmVjNCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCArPSB2ZWN0b3IueDtcclxuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XHJcbiAgICAgICAgdGhpcy56ICs9IHZlY3Rvci56O1xyXG4gICAgICAgIHRoaXMudyArPSB2ZWN0b3IudztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWRkcyB0d28gdmVjdG9ycywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WKoOazle+8jOW5tui/lOWbnuaWsOe7k+aenOOAglxyXG4gICAgICogQG1ldGhvZCBhZGRcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgYWRkICh2ZWN0b3I6IFZlYzQsIG91dD86IFZlYzQpOiBWZWM0IHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzQoKTtcclxuICAgICAgICBvdXQueCA9IHRoaXMueCArIHZlY3Rvci54O1xyXG4gICAgICAgIG91dC55ID0gdGhpcy55ICsgdmVjdG9yLnk7XHJcbiAgICAgICAgb3V0LnogPSB0aGlzLnogKyB2ZWN0b3IuejtcclxuICAgICAgICBvdXQudyA9IHRoaXMudyArIHZlY3Rvci53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azle+8jOW5tui/lOWbnuaWsOe7k+aenOOAglxyXG4gICAgICogQG1ldGhvZCBzdWJ0cmFjdFxyXG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWM0IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWM0IHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjNH0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBzdWJ0cmFjdCAodmVjdG9yOiBWZWM0LCBvdXQ/OiBWZWM0KTogVmVjNCB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWM0KCk7XHJcbiAgICAgICAgb3V0LnggPSB0aGlzLnggLSB2ZWN0b3IueDtcclxuICAgICAgICBvdXQueSA9IHRoaXMueSAtIHZlY3Rvci55O1xyXG4gICAgICAgIG91dC56ID0gdGhpcy56IC0gdmVjdG9yLno7XHJcbiAgICAgICAgb3V0LncgPSB0aGlzLncgLSB2ZWN0b3IudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHRoaXMgYnkgYSBudW1iZXIuXHJcbiAgICAgKiAhI3poIOe8qeaUvuW9k+WJjeWQkemHj+OAglxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5U2NhbGFyIChudW06IG51bWJlcik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCAqPSBudW07XHJcbiAgICAgICAgdGhpcy55ICo9IG51bTtcclxuICAgICAgICB0aGlzLnogKj0gbnVtO1xyXG4gICAgICAgIHRoaXMudyAqPSBudW07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMuXHJcbiAgICAgKiAhI3poIOWIhumHj+ebuOS5mOOAglxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVxyXG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBtdWx0aXBseSAodmVjdG9yOiBWZWM0KTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy54ICo9IHZlY3Rvci54O1xyXG4gICAgICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcclxuICAgICAgICB0aGlzLnogKj0gdmVjdG9yLno7XHJcbiAgICAgICAgdGhpcy53ICo9IHZlY3Rvci53O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLlxyXG4gICAgICogISN6aCDlkJHph4/pmaTms5XjgIJcclxuICAgICAqIEBtZXRob2QgZGl2aWRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgZGl2aWRlIChudW06IG51bWJlcik6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCAvPSBudW07XHJcbiAgICAgICAgdGhpcy55IC89IG51bTtcclxuICAgICAgICB0aGlzLnogLz0gbnVtO1xyXG4gICAgICAgIHRoaXMudyAvPSBudW07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMuXHJcbiAgICAgKiAhI3poIOWQkemHj+WPluWPjVxyXG4gICAgICogQG1ldGhvZCBuZWdhdGVcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBuZWdhdGUgKCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XHJcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcclxuICAgICAgICB0aGlzLnogPSAtdGhpcy56O1xyXG4gICAgICAgIHRoaXMudyA9IC10aGlzLnc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERvdCBwcm9kdWN0XHJcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOeCueS5mOOAglxyXG4gICAgICogQG1ldGhvZCBkb3RcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW3ZlY3Rvcl1cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBkb3QgKHZlY3RvcjogVmVjNCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnkgKyB0aGlzLnogKiB2ZWN0b3IueiArIHRoaXMudyAqIHZlY3Rvci53O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDcm9zcyBwcm9kdWN0XHJcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOWPieS5mOOAglxyXG4gICAgICogQG1ldGhvZCBjcm9zc1xyXG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF1cclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgY3Jvc3MgKHZlY3RvcjogVmVjNCwgb3V0PzogVmVjNCk6IFZlYzQge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjNCgpO1xyXG4gICAgICAgIGNvbnN0IHsgeDogYXgsIHk6IGF5LCB6OiBheiB9ID0gdGhpcztcclxuICAgICAgICBjb25zdCB7IHg6IGJ4LCB5OiBieSwgejogYnogfSA9IHZlY3RvcjtcclxuXHJcbiAgICAgICAgb3V0LnggPSBheSAqIGJ6IC0gYXogKiBieTtcclxuICAgICAgICBvdXQueSA9IGF6ICogYnggLSBheCAqIGJ6O1xyXG4gICAgICAgIG91dC56ID0gYXggKiBieSAtIGF5ICogYng7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqbjgIJcclxuICAgICAqIEBtZXRob2QgbGVuXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdiA9IGNjLnY0KDEwLCAxMCk7XHJcbiAgICAgKiB2LmxlbigpOyAvLyByZXR1cm4gMTQuMTQyMTM1NjIzNzMwOTUxO1xyXG4gICAgICovXHJcbiAgICBsZW4gKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLngsXHJcbiAgICAgICAgICB5ID0gdGhpcy55LFxyXG4gICAgICAgICAgeiA9IHRoaXMueixcclxuICAgICAgICAgIHcgPSB0aGlzLnc7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcclxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgbGVuZ3RoU3FyICgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB4ID0gdGhpcy54LFxyXG4gICAgICAgICAgeSA9IHRoaXMueSxcclxuICAgICAgICAgIHogPSB0aGlzLnosXHJcbiAgICAgICAgICB3ID0gdGhpcy53O1xyXG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTWFrZSB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yIHRvIDEuXHJcbiAgICAgKiAhI3poIOWQkemHj+W9kuS4gOWMlu+8jOiuqei/meS4quWQkemHj+eahOmVv+W6puS4uiAx44CCXHJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVNlbGZcclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBub3JtYWxpemVTZWxmICgpIHtcclxuICAgICAgICB0aGlzLm5vcm1hbGl6ZSh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJldHVybnMgdGhpcyB2ZWN0b3Igd2l0aCBhIG1hZ25pdHVkZSBvZiAxLjxici8+XHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICogTm90ZSB0aGF0IHRoZSBjdXJyZW50IHZlY3RvciBpcyB1bmNoYW5nZWQgYW5kIGEgbmV3IG5vcm1hbGl6ZWQgdmVjdG9yIGlzIHJldHVybmVkLiBJZiB5b3Ugd2FudCB0byBub3JtYWxpemUgdGhlIGN1cnJlbnQgdmVjdG9yLCB1c2Ugbm9ybWFsaXplU2VsZiBmdW5jdGlvbi5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/lOWbnuW9kuS4gOWMluWQjueahOWQkemHj+OAgjxici8+XHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICog5rOo5oSP77yM5b2T5YmN5ZCR6YeP5LiN5Y+Y77yM5bm26L+U5Zue5LiA5Liq5paw55qE5b2S5LiA5YyW5ZCR6YeP44CC5aaC5p6c5L2g5oOz5p2l5b2S5LiA5YyW5b2T5YmN5ZCR6YeP77yM5Y+v5L2/55SoIG5vcm1hbGl6ZVNlbGYg5Ye95pWw44CCXHJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxyXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgbm9ybWFsaXplIChvdXQ/OiBWZWM0KTogVmVjNCB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWM0KCk7XHJcbiAgICAgICAgX3ggPSB0aGlzLng7XHJcbiAgICAgICAgX3kgPSB0aGlzLnk7XHJcbiAgICAgICAgX3ogPSB0aGlzLno7XHJcbiAgICAgICAgX3cgPSB0aGlzLnc7XHJcbiAgICAgICAgbGV0IGxlbiA9IF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfeiArIF93ICogX3c7XHJcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcclxuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xyXG4gICAgICAgICAgICBvdXQueCA9IF94ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQueSA9IF95ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQueiA9IF96ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQudyA9IF93ICogbGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC4gNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0NFxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxyXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7VmVjNH0gb3V0XHJcbiAgICAgKi9cclxuICAgIHRyYW5zZm9ybU1hdDQgKG1hdHJpeDogTWF0NCwgb3V0OiBWZWM0KTogVmVjNCB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWM0KCk7XHJcbiAgICAgICAgX3ggPSB0aGlzLng7XHJcbiAgICAgICAgX3kgPSB0aGlzLnk7XHJcbiAgICAgICAgX3ogPSB0aGlzLno7XHJcbiAgICAgICAgX3cgPSB0aGlzLnc7XHJcbiAgICAgICAgbGV0IG0gPSBtYXRyaXgubTtcclxuICAgICAgICBvdXQueCA9IG1bMF0gKiBfeCArIG1bNF0gKiBfeSArIG1bOF0gICogX3ogKyBtWzEyXSAqIF93O1xyXG4gICAgICAgIG91dC55ID0gbVsxXSAqIF94ICsgbVs1XSAqIF95ICsgbVs5XSAgKiBfeiArIG1bMTNdICogX3c7XHJcbiAgICAgICAgb3V0LnogPSBtWzJdICogX3ggKyBtWzZdICogX3kgKyBtWzEwXSAqIF96ICsgbVsxNF0gKiBfdztcclxuICAgICAgICBvdXQudyA9IG1bM10gKiBfeCArIG1bN10gKiBfeSArIG1bMTFdICogX3ogKyBtWzE1XSAqIF93O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlIGluIHgsIHksIHosIHcuXHJcbiAgICAgKiBAbWV0aG9kIG1heEF4aXNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIG1heEF4aXMgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuVmVjNCcsIFZlYzQsIHsgeDogMCwgeTogMCwgejogMCwgdzogMCB9KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2NCAob3RoZXI6IFZlYzQpOiBWZWM0O1xyXG5leHBvcnQgZnVuY3Rpb24gdjQgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiBWZWM0O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHY0ICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWM0KHggYXMgYW55LCB5LCB6LCB3KTtcclxufVxyXG5cclxuY2MudjQgPSB2NDtcclxuY2MuVmVjNCA9IFZlYzQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9