
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec3.js';
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

var _vec = _interopRequireDefault(require("./vec2"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
/**
 * !#en Representation of 3D vectors and points.
 * !#zh 表示 3D 向量和坐标
 *
 * @class Vec3
 * @extends ValueType
 */

var Vec3 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec3, _ValueType);

  var _proto = Vec3.prototype;

  // deprecated

  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method mag
   * @return {number} the result
   * @example
   * var v = cc.v3(10, 10, 10);
   * v.mag(); // return 17.320508075688775;
   */

  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method magSqr
   * @return {number} the result
   */

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.sub = function sub(vector, out) {
    return Vec3.subtract(out || new Vec3(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.mul = function mul(num, out) {
    return Vec3.multiplyScalar(out || new Vec3(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.div = function div(num, out) {
    return Vec3.multiplyScalar(out || new Vec3(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.scale = function scale(vector, out) {
    return Vec3.multiply(out || new Vec3(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.neg = function neg(out) {
    return Vec3.negate(out || new Vec3(), this);
  }
  /**
   * !#en return a Vec3 object with x = 1, y = 1, z = 1.
   * !#zh 新 Vec3 对象。
   * @property ONE
   * @type Vec3
   * @static
   */
  ;

  /**
   * !#zh 将目标赋值为零向量
   * !#en The target of an assignment zero vector
   * @method zero
   * @typescript
   * zero<Out extends IVec3Like> (out: Out): Out
   * @static
   */
  Vec3.zero = function zero(out) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    return out;
  }
  /**
   * !#zh 获得指定向量的拷贝
   * !#en Obtaining copy vectors designated
   * @method clone
   * @typescript
   * clone<Out extends IVec3Like> (a: Out): Vec3
   * @static
   */
  ;

  Vec3.clone = function clone(a) {
    return new Vec3(a.x, a.y, a.z);
  }
  /**
   * !#zh 复制目标向量
   * !#en Copy the target vector
   * @method copy
   * @typescript
   * copy<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like): Out
   * @static
   */
  ;

  Vec3.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    return out;
  }
  /**
   * !#zh 设置向量值
   * !#en Set to value
   * @method set
   * @typescript
   * set<Out extends IVec3Like> (out: Out, x: number, y: number, z: number): Out
   * @static
   */
  ;

  Vec3.set = function set(out, x, y, z) {
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * !#en Element-wise vector addition
   * @method add
   * @typescript
   * add<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * !#en Element-wise vector subtraction
   * @method subtract
   * @typescript
   * subtract<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法 (分量积)
   * !#en Element-wise vector multiplication (product component)
   * @method multiply
   * @typescript
   * multiply<Out extends IVec3Like, Vec3Like_1 extends IVec3Like, Vec3Like_2 extends IVec3Like> (out: Out, a: Vec3Like_1, b: Vec3Like_2): Out
   * @static
   */
  ;

  Vec3.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * !#en Element-wise vector division
   * @method divide
   * @typescript
   * divide<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    out.z = a.z / b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * !#en Rounding up by elements of the vector
   * @method ceil
   * @typescript
   * ceil<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    out.z = Math.ceil(a.z);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * !#en Element vector by rounding down
   * @method floor
   * @typescript
   * floor<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    out.z = Math.floor(a.z);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * !#en The minimum by-element vector
   * @method min
   * @typescript
   * min<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * !#en The maximum value of the element-wise vector
   * @method max
   * @typescript
   * max<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * !#en Element-wise vector of rounding to whole
   * @method round
   * @typescript
   * round<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    out.z = Math.round(a.z);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * !#en Vector scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like, b: number): Out
   * @static
   */
  ;

  Vec3.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * !#en Element-wise vector multiply add: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd<Out extends IVec3Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec3.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * !#en Seeking two vectors Euclidean distance
   * @method distance
   * @typescript
   * distance<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.distance = function distance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    _z = b.z - a.z;
    return Math.sqrt(_x * _x + _y * _y + _z * _z);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * !#en Euclidean distance squared seeking two vectors
   * @method squaredDistance
   * @typescript
   * squaredDistance<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.squaredDistance = function squaredDistance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    _z = b.z - a.z;
    return _x * _x + _y * _y + _z * _z;
  }
  /**
   * !#zh 求向量长度
   * !#en Seeking vector length
   * @method len
   * @typescript
   * len<Out extends IVec3Like> (a: Out): number
   * @static
   */
  ;

  Vec3.len = function len(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    return Math.sqrt(_x * _x + _y * _y + _z * _z);
  }
  /**
   * !#zh 求向量长度平方
   * !#en Seeking squared vector length
   * @method lengthSqr
   * @typescript
   * lengthSqr<Out extends IVec3Like> (a: Out): number
   * @static
   */
  ;

  Vec3.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    return _x * _x + _y * _y + _z * _z;
  }
  /**
   * !#zh 逐元素向量取负
   * !#en By taking the negative elements of the vector
   * @method negate
   * @typescript
   * negate<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * !#en Element vector by taking the inverse, return near 0 Infinity
   * @method inverse
   * @typescript
   * inverse<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    out.z = 1.0 / a.z;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * !#en Element vector by taking the inverse, return near 0 0
   * @method inverseSafe
   * @typescript
   * inverseSafe<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;

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

    return out;
  }
  /**
   * !#zh 归一化向量
   * !#en Normalized vector
   * @method normalize
   * @typescript
   * normalize<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like): Out
   * @static
   */
  ;

  Vec3.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var len = _x * _x + _y * _y + _z * _z;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * !#en Vector dot product (scalar product)
   * @method dot
   * @typescript
   * dot<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /**
   * !#zh 向量叉积（向量积）
   * !#en Vector cross product (vector product)
   * @method cross
   * @typescript
   * cross<Out extends IVec3Like, Vec3Like_1 extends IVec3Like, Vec3Like_2 extends IVec3Like> (out: Out, a: Vec3Like_1, b: Vec3Like_2): Out
   * @static
   */
  ;

  Vec3.cross = function cross(out, a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z;
    var bx = b.x,
        by = b.y,
        bz = b.z;
    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;
    return out;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * !#en Vector element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp<Out extends IVec3Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec3.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    return out;
  }
  /**
   * !#zh 生成一个在单位球体上均匀分布的随机向量
   * !#en Generates a uniformly distributed random vectors on the unit sphere
   * @method random
   * @typescript
   * random<Out extends IVec3Like> (out: Out, scale?: number): Out
   * @param scale 生成的向量长度
   * @static
   */
  ;

  Vec3.random = function random(out, scale) {
    scale = scale || 1.0;
    var phi = (0, _utils.random)() * 2.0 * Math.PI;
    var cosTheta = (0, _utils.random)() * 2 - 1;
    var sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    out.x = sinTheta * Math.cos(phi) * scale;
    out.y = sinTheta * Math.sin(phi) * scale;
    out.z = cosTheta * scale;
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第四位为 1。
   * !#en Four-dimensional vector and matrix multiplication, the default vectors fourth one.
   * @method transformMat4
   * @typescript
   * transformMat4<Out extends IVec3Like, Vec3Like extends IVec3Like, MatLike extends IMat4Like> (out: Out, a: Vec3Like, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    var rhw = m[3] * _x + m[7] * _y + m[11] * _z + m[15];
    rhw = rhw ? 1 / rhw : 1;
    out.x = (m[0] * _x + m[4] * _y + m[8] * _z + m[12]) * rhw;
    out.y = (m[1] * _x + m[5] * _y + m[9] * _z + m[13]) * rhw;
    out.z = (m[2] * _x + m[6] * _y + m[10] * _z + m[14]) * rhw;
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第四位为 0。
   * !#en Four-dimensional vector and matrix multiplication, vector fourth default is 0.
   * @method transformMat4Normal
   * @typescript
   * transformMat4Normal<Out extends IVec3Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat4Normal = function transformMat4Normal(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    var rhw = m[3] * _x + m[7] * _y + m[11] * _z;
    rhw = rhw ? 1 / rhw : 1;
    out.x = (m[0] * _x + m[4] * _y + m[8] * _z) * rhw;
    out.y = (m[1] * _x + m[5] * _y + m[9] * _z) * rhw;
    out.z = (m[2] * _x + m[6] * _y + m[10] * _z) * rhw;
    return out;
  }
  /**
   * !#zh 向量与三维矩阵乘法
   * !#en Dimensional vector matrix multiplication
   * @method transformMat3
   * @typescript
   * transformMat3<Out extends IVec3Like, MatLike extends IMat3Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat3 = function transformMat3(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    out.x = _x * m[0] + _y * m[3] + _z * m[6];
    out.y = _x * m[1] + _y * m[4] + _z * m[7];
    out.z = _x * m[2] + _y * m[5] + _z * m[8];
    return out;
  }
  /**
   * !#zh 向量仿射变换
   * !#en Affine transformation vector
   * @method transformAffine
   * @typescript
   * transformAffine<Out extends IVec3Like, VecLike extends IVec3Like, MatLike extends IMat4Like>(out: Out, v: VecLike, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformAffine = function transformAffine(out, v, mat) {
    _x = v.x;
    _y = v.y;
    _z = v.z;
    var m = mat.m;
    out.x = m[0] * _x + m[1] * _y + m[2] * _z + m[3];
    out.y = m[4] * _x + m[5] * _y + m[6] * _z + m[7];
    out.x = m[8] * _x + m[9] * _y + m[10] * _z + m[11];
    return out;
  }
  /**
   * !#zh 向量四元数乘法
   * !#en Vector quaternion multiplication
   * @method transformQuat
   * @typescript
   * transformQuat<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike> (out: Out, a: VecLike, q: QuatLike): Out
   * @static
   */
  ;

  Vec3.transformQuat = function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-Vec3-implementations
    // calculate quat * vec
    var ix = q.w * a.x + q.y * a.z - q.z * a.y;
    var iy = q.w * a.y + q.z * a.x - q.x * a.z;
    var iz = q.w * a.z + q.x * a.y - q.y * a.x;
    var iw = -q.x * a.x - q.y * a.y - q.z * a.z; // calculate result * inverse quat

    out.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
    out.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
    out.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
    return out;
  }
  /**
   * !#zh 以缩放 -> 旋转 -> 平移顺序变换向量
   * !#en To scale -> rotation -> transformation vector sequence translation
   * @method transformQuat
   * @typescript
   * transformRTS<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike>(out: Out, a: VecLike, r: QuatLike, t: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Vec3.transformRTS = function transformRTS(out, a, r, t, s) {
    var x = a.x * s.x;
    var y = a.y * s.y;
    var z = a.z * s.z;
    var ix = r.w * x + r.y * z - r.z * y;
    var iy = r.w * y + r.z * x - r.x * z;
    var iz = r.w * z + r.x * y - r.y * x;
    var iw = -r.x * x - r.y * y - r.z * z;
    out.x = ix * r.w + iw * -r.x + iy * -r.z - iz * -r.y + t.x;
    out.y = iy * r.w + iw * -r.y + iz * -r.x - ix * -r.z + t.y;
    out.z = iz * r.w + iw * -r.z + ix * -r.y - iy * -r.x + t.z;
    return out;
  }
  /**
   * !#zh 以平移 -> 旋转 -> 缩放顺序逆变换向量
   * !#en Translational -> rotation -> Zoom inverse transformation vector sequence
   * @method transformInverseRTS
   * @typescript
   * transformInverseRTS<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike>(out: Out, a: VecLike, r: QuatLike, t: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Vec3.transformInverseRTS = function transformInverseRTS(out, a, r, t, s) {
    var x = a.x - t.x;
    var y = a.y - t.y;
    var z = a.z - t.z;
    var ix = r.w * x - r.y * z + r.z * y;
    var iy = r.w * y - r.z * x + r.x * z;
    var iz = r.w * z - r.x * y + r.y * x;
    var iw = r.x * x + r.y * y + r.z * z;
    out.x = (ix * r.w + iw * r.x + iy * r.z - iz * r.y) / s.x;
    out.y = (iy * r.w + iw * r.y + iz * r.x - ix * r.z) / s.y;
    out.z = (iz * r.w + iw * r.z + ix * r.y - iy * r.x) / s.z;
    return out;
  }
  /**
   * !#zh 绕 X 轴旋转向量指定弧度
   * !#en Rotation vector specified angle about the X axis
   * @method rotateX
   * @typescript
   * rotateX<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateX = function rotateX(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _x;
    var ry = _y * cos - _z * sin;
    var rz = _y * sin + _z * cos; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 绕 Y 轴旋转向量指定弧度
   * !#en Rotation vector specified angle around the Y axis
   * @method rotateY
   * @typescript
   * rotateY<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateY = function rotateY(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _z * sin + _x * cos;
    var ry = _y;
    var rz = _z * cos - _x * sin; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 绕 Z 轴旋转向量指定弧度
   * !#en Around the Z axis specified angle vector
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateZ = function rotateZ(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _x * cos - _y * sin;
    var ry = _x * sin + _y * cos;
    var rz = _z; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 向量等价判断
   * !#en Equivalent vectors Analyzing
   * @method strictEquals
   * @typescript
   * strictEquals<Out extends IVec3Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec3.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * !#en Negative error vector floating point approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals<Out extends IVec3Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Vec3.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    var a0 = a.x,
        a1 = a.y,
        a2 = a.z;
    var b0 = b.x,
        b1 = b.y,
        b2 = b.z;
    return Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2));
  }
  /**
   * !#zh 求两向量夹角弧度
   * !#en Radian angle between two vectors seek
   * @method angle
   * @typescript
   * angle<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.angle = function angle(a, b) {
    Vec3.normalize(v3_1, a);
    Vec3.normalize(v3_2, b);
    var cosine = Vec3.dot(v3_1, v3_2);

    if (cosine > 1.0) {
      return 0;
    }

    if (cosine < -1.0) {
      return Math.PI;
    }

    return Math.acos(cosine);
  }
  /**
   * !#zh 计算向量在指定平面上的投影
   * !#en Calculating a projection vector in the specified plane
   * @method projectOnPlane
   * @typescript
   * projectOnPlane<Out extends IVec3Like> (out: Out, a: Out, n: Out): Out
   * @param a 待投影向量
   * @param n 指定平面的法线
   * @static
   */
  ;

  Vec3.projectOnPlane = function projectOnPlane(out, a, n) {
    return Vec3.subtract(out, a, Vec3.project(out, a, n));
  }
  /**
   * !#zh 计算向量在指定向量上的投影
   * !#en Projection vector calculated in the vector designated
   * @method project
   * @typescript
   * project<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @param a 待投影向量
   * @param n 目标向量
   * @static
   */
  ;

  Vec3.project = function project(out, a, b) {
    var sqrLen = Vec3.lengthSqr(b);

    if (sqrLen < 0.000001) {
      return Vec3.set(out, 0, 0, 0);
    } else {
      return Vec3.multiplyScalar(out, b, Vec3.dot(a, b) / sqrLen);
    }
  }
  /**
   * !#zh 向量转数组
   * !#en Vector transfer array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec3Like, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec3.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    out[ofs + 2] = v.z;
    return out;
  }
  /**
   * !#zh 数组转向量
   * !#en Array steering amount
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec3Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec3.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
   * @method constructor
   * @param {Vec3|number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   */
  function Vec3(x, y, z) {
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

    _this = _ValueType.call(this) || this;
    _this.mag = Vec3.prototype.len;
    _this.magSqr = Vec3.prototype.lengthSqr;
    _this.subSelf = Vec3.prototype.subtract;
    _this.mulSelf = Vec3.prototype.multiplyScalar;
    _this.divSelf = Vec3.prototype.divide;
    _this.scaleSelf = Vec3.prototype.multiply;
    _this.negSelf = Vec3.prototype.negate;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = void 0;
    _this.angle = _vec["default"].prototype.angle;
    _this.project = _vec["default"].prototype.project;

    if (x && typeof x === 'object') {
      _this.x = x.x;
      _this.y = x.y;
      _this.z = x.z;
    } else {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    }

    return _this;
  }
  /**
   * !#en clone a Vec3 value
   * !#zh 克隆一个 Vec3 值
   * @method clone
   * @return {Vec3}
   */


  _proto.clone = function clone() {
    return new Vec3(this.x, this.y, this.z);
  }
  /**
   * !#en Set the current vector value with the given vector.
   * !#zh 用另一个向量设置当前的向量对象值。
   * @method set
   * @param {Vec3} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    this.z = newValue.z;
    return this;
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec3} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.z === other.z;
  }
  /**
   * !#en Check whether two vector equal with some degree of variance.
   * !#zh
   * 近似判断两个点是否相等。<br/>
   * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Vec3} other
   * @param {Number} variance
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other, variance) {
    if (this.x - variance <= other.x && other.x <= this.x + variance) {
      if (this.y - variance <= other.y && other.y <= this.y + variance) {
        if (this.z - variance <= other.z && other.z <= this.z + variance) return true;
      }
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
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 线性插值。
   * @method lerp
   * @param {Vec3} to
   * @param {number} ratio - the interpolation coefficient
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Vec3();
    Vec3.lerp(out, this, to, ratio);
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
   * @param {Vec3} min_inclusive
   * @param {Vec3} max_inclusive
   * @return {Vec3}
   */
  ;

  _proto.clampf = function clampf(min_inclusive, max_inclusive) {
    this.x = _misc["default"].clampf(this.x, min_inclusive.x, max_inclusive.x);
    this.y = _misc["default"].clampf(this.y, min_inclusive.y, max_inclusive.y);
    this.z = _misc["default"].clampf(this.z, min_inclusive.z, max_inclusive.z);
    return this;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }
  /**
   * !#en Adds two vectors, and returns the new result.
   * !#zh 向量加法，并返回新结果。
   * @method add
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec3();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    out.z = this.z + vector.z;
    return out;
  }
  /**
   * !#en Subtracts one vector from this.
   * !#zh 向量减法。
   * @method subtract
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.subtract = function subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反。
   * @method negate
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec3} [vector]
   * @return {number} the result
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec3} vector
   * @param {Vec3} [out]
   * @return {Vec3} the result
   */
  ;

  _proto.cross = function cross(vector, out) {
    out = out || new Vec3();
    Vec3.cross(out, this, vector);
    return out;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v3(10, 10, 10);
   * v.len(); // return 17.320508075688775;
   */
  ;

  _proto.len = function len() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    Vec3.normalize(this, this);
    return this;
  };

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
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} result
   */
  _proto.normalize = function normalize(out) {
    out = out || new Vec3();
    Vec3.normalize(out, this);
    return out;
  }
  /**
   * Transforms the vec3 with a mat4. 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec3} [out] the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @returns {Vec3} out
   */
  ;

  _proto.transformMat4 = function transformMat4(m, out) {
    out = out || new Vec3();
    Vec3.transformMat4(out, this, m);
    return out;
  }
  /**
   * Returns the maximum value in x, y, and z
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y, this.z);
  }
  /**
   * !#en Get angle in radian between this and vector.
   * !#zh 夹角的弧度。
   * @method angle
   * @param {Vec3} vector
   * @return {number} from 0 to Math.PI
   */
  ;

  // Compatible with the vec2 API

  /**
   * !#en Get angle in radian between this and vector with direction. <br/>
   * In order to compatible with the vec2 API.
   * !#zh 带方向的夹角的弧度。该方法仅用做兼容 2D 计算。
   * @method signAngle
   * @param {Vec3 | Vec2} vector
   * @return {number} from -MathPI to Math.PI
   * @deprecated
   */
  _proto.signAngle = function signAngle(vector) {
    cc.warnID(1408, 'vec3.signAngle', 'v2.1', 'cc.v2(selfVector).signAngle(vector)');
    var vec1 = new _vec["default"](this.x, this.y);
    var vec2 = new _vec["default"](vector.x, vector.y);
    return vec1.signAngle(vec2);
  }
  /**
   * !#en rotate. In order to compatible with the vec2 API.
   * !#zh 返回旋转给定弧度后的新向量。该方法仅用做兼容 2D 计算。
   * @method rotate
   * @param {number} radians
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2 | Vec3} if the 'out' value is a vec3 you will get a Vec3 return.
   * @deprecated
   */
  ;

  _proto.rotate = function rotate(radians, out) {
    cc.warnID(1408, 'vec3.rotate', 'v2.1', 'cc.v2(selfVector).rotate(radians, out)');
    return _vec["default"].prototype.rotate.call(this, radians, out);
  }
  /**
   * !#en rotate self. In order to compatible with the vec2 API.
   * !#zh 按指定弧度旋转向量。该方法仅用做兼容 2D 计算。
   * @method rotateSelf
   * @param {number} radians
   * @return {Vec3} returns this
   * @chainable
   * @deprecated
   */
  ;

  _proto.rotateSelf = function rotateSelf(radians) {
    cc.warnID(1408, 'vec3.rotateSelf', 'v2.1', 'cc.v2(selfVector).rotateSelf(radians)');
    return _vec["default"].prototype.rotateSelf.call(this, radians);
  };

  _createClass(Vec3, null, [{
    key: "ONE",
    get: function get() {
      return new Vec3(1, 1, 1);
    }
  }, {
    key: "ZERO",
    get:
    /**
     * !#en return a Vec3 object with x = 0, y = 0, z = 0.
     * !#zh 返回 x = 0，y = 0，z = 0 的 Vec3 对象。
     * @property ZERO
     * @type Vec3
     * @static
     */
    function get() {
      return new Vec3();
    }
  }, {
    key: "UP",
    get:
    /**
     * !#en return a Vec3 object with x = 0, y = 1, z = 0.
     * !#zh 返回 x = 0, y = 1, z = 0 的 Vec3 对象。
     * @property UP
     * @type Vec3
     * @static
     */
    function get() {
      return new Vec3(0, 1, 0);
    }
  }, {
    key: "RIGHT",
    get:
    /**
     * !#en return a Vec3 object with x = 1, y = 0, z = 0.
     * !#zh 返回 x = 1，y = 0，z = 0 的 Vec3 对象。
     * @property RIGHT
     * @type Vec3
     * @static
     */
    function get() {
      return new Vec3(1, 0, 0);
    }
  }, {
    key: "FORWARD",
    get:
    /**
     * !#en return a Vec3 object with x = 0, y = 0, z = 1.
     * !#zh 返回 x = 0，y = 0，z = 1 的 Vec3 对象。
     * @property FORWARD
     * @type Vec3
     * @static
     */
    function get() {
      return new Vec3(0, 0, 1);
    }
  }]);

  return Vec3;
}(_valueType["default"]);

exports["default"] = Vec3;
Vec3.sub = Vec3.subtract;
Vec3.mul = Vec3.multiply;
Vec3.scale = Vec3.multiplyScalar;
Vec3.mag = Vec3.len;
Vec3.squaredMagnitude = Vec3.lengthSqr;
Vec3.div = Vec3.divide;
Vec3.ONE_R = Vec3.ONE;
Vec3.ZERO_R = Vec3.ZERO;
Vec3.UP_R = Vec3.UP;
Vec3.RIGHT_R = Vec3.RIGHT;
Vec3.FRONT_R = Vec3.FORWARD;
var v3_1 = new Vec3();
var v3_2 = new Vec3();

_CCClass["default"].fastDefine('cc.Vec3', Vec3, {
  x: 0,
  y: 0,
  z: 0
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Vec3"}}cc.Vec3{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec3"}}cc.Vec3{{/crossLink}} 对象。
 * @method v3
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [z=0]
 * @return {Vec3}
 * @example
 * var v1 = cc.v3();
 * var v2 = cc.v3(0, 0, 0);
 * var v3 = cc.v3(v2);
 * var v4 = cc.v3({x: 100, y: 100, z: 0});
 */


cc.v3 = function v3(x, y, z) {
  return new Vec3(x, y, z);
};

cc.Vec3 = Vec3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx2ZWMzLnRzIl0sIm5hbWVzIjpbIl94IiwiX3kiLCJfeiIsIlZlYzMiLCJzdWIiLCJ2ZWN0b3IiLCJvdXQiLCJzdWJ0cmFjdCIsIm11bCIsIm51bSIsIm11bHRpcGx5U2NhbGFyIiwiZGl2Iiwic2NhbGUiLCJtdWx0aXBseSIsIm5lZyIsIm5lZ2F0ZSIsInplcm8iLCJ4IiwieSIsInoiLCJjbG9uZSIsImEiLCJjb3B5Iiwic2V0IiwiYWRkIiwiYiIsImRpdmlkZSIsImNlaWwiLCJNYXRoIiwiZmxvb3IiLCJtaW4iLCJtYXgiLCJyb3VuZCIsInNjYWxlQW5kQWRkIiwiZGlzdGFuY2UiLCJzcXJ0Iiwic3F1YXJlZERpc3RhbmNlIiwibGVuIiwibGVuZ3RoU3FyIiwiaW52ZXJzZSIsImludmVyc2VTYWZlIiwiYWJzIiwiRVBTSUxPTiIsIm5vcm1hbGl6ZSIsImRvdCIsImNyb3NzIiwiYXgiLCJheSIsImF6IiwiYngiLCJieSIsImJ6IiwibGVycCIsInQiLCJyYW5kb20iLCJwaGkiLCJQSSIsImNvc1RoZXRhIiwic2luVGhldGEiLCJjb3MiLCJzaW4iLCJ0cmFuc2Zvcm1NYXQ0IiwibWF0IiwibSIsInJodyIsInRyYW5zZm9ybU1hdDROb3JtYWwiLCJ0cmFuc2Zvcm1NYXQzIiwidHJhbnNmb3JtQWZmaW5lIiwidiIsInRyYW5zZm9ybVF1YXQiLCJxIiwiaXgiLCJ3IiwiaXkiLCJpeiIsIml3IiwidHJhbnNmb3JtUlRTIiwiciIsInMiLCJ0cmFuc2Zvcm1JbnZlcnNlUlRTIiwicm90YXRlWCIsIm8iLCJyeCIsInJ5IiwicnoiLCJyb3RhdGVZIiwicm90YXRlWiIsInN0cmljdEVxdWFscyIsImVxdWFscyIsImVwc2lsb24iLCJhMCIsImExIiwiYTIiLCJiMCIsImIxIiwiYjIiLCJhbmdsZSIsInYzXzEiLCJ2M18yIiwiY29zaW5lIiwiYWNvcyIsInByb2plY3RPblBsYW5lIiwibiIsInByb2plY3QiLCJzcXJMZW4iLCJ0b0FycmF5Iiwib2ZzIiwiZnJvbUFycmF5IiwiYXJyIiwibWFnIiwicHJvdG90eXBlIiwibWFnU3FyIiwic3ViU2VsZiIsIm11bFNlbGYiLCJkaXZTZWxmIiwic2NhbGVTZWxmIiwibmVnU2VsZiIsIlZlYzIiLCJuZXdWYWx1ZSIsIm90aGVyIiwiZnV6enlFcXVhbHMiLCJ2YXJpYW5jZSIsInRvU3RyaW5nIiwidG9GaXhlZCIsInRvIiwicmF0aW8iLCJjbGFtcGYiLCJtaW5faW5jbHVzaXZlIiwibWF4X2luY2x1c2l2ZSIsIm1pc2MiLCJhZGRTZWxmIiwibm9ybWFsaXplU2VsZiIsIm1heEF4aXMiLCJzaWduQW5nbGUiLCJjYyIsIndhcm5JRCIsInZlYzEiLCJ2ZWMyIiwicm90YXRlIiwicmFkaWFucyIsImNhbGwiLCJyb3RhdGVTZWxmIiwiVmFsdWVUeXBlIiwic3F1YXJlZE1hZ25pdHVkZSIsIk9ORV9SIiwiT05FIiwiWkVST19SIiwiWkVSTyIsIlVQX1IiLCJVUCIsIlJJR0hUX1IiLCJSSUdIVCIsIkZST05UX1IiLCJGT1JXQVJEIiwiQ0NDbGFzcyIsImZhc3REZWZpbmUiLCJ2MyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQzs7Ozs7QUFDakI7O0FBUUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDSUMsTUFBQSxhQUFLQyxNQUFMLEVB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VUFBVXJKLElBQUksQ0FBQ3NKO0FBdXNDbkMsSUFBTXhELElBQUksR0FBRyxJQUFJOUYsSUFBSixFQUFiO0FBQ0EsSUFBTStGLElBQUksR0FBRyxJQUFJL0YsSUFBSixFQUFiOztBQUVBdUosb0JBQVFDLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEJ4SixJQUE5QixFQUFvQztBQUFFYyxFQUFBQSxDQUFDLEVBQUUsQ0FBTDtBQUFRQyxFQUFBQSxDQUFDLEVBQUUsQ0FBWDtBQUFjQyxFQUFBQSxDQUFDLEVBQUU7QUFBakIsQ0FBcEM7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FtSCxFQUFFLENBQUNzQixFQUFILEdBQVEsU0FBU0EsRUFBVCxDQUFhM0ksQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCO0FBQzFCLFNBQU8sSUFBSWhCLElBQUosQ0FBU2MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBUDtBQUNILENBRkQ7O0FBSUFtSCxFQUFFLENBQUNuSSxJQUFILEdBQVVBLElBQVYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XHJcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xyXG5pbXBvcnQgbWlzYyBmcm9tICcuLi91dGlscy9taXNjJztcclxuaW1wb3J0IFZlYzIgZnJvbSAnLi92ZWMyJztcclxuaW1wb3J0IE1hdDQgZnJvbSAnLi9tYXQ0JztcclxuaW1wb3J0IHsgRVBTSUxPTiwgcmFuZG9tIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5sZXQgX3g6IG51bWJlciA9IDAuMDtcclxubGV0IF95OiBudW1iZXIgPSAwLjA7XHJcbmxldCBfejogbnVtYmVyID0gMC4wO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmVwcmVzZW50YXRpb24gb2YgM0QgdmVjdG9ycyBhbmQgcG9pbnRzLlxyXG4gKiAhI3poIOihqOekuiAzRCDlkJHph4/lkozlnZDmoIdcclxuICpcclxuICogQGNsYXNzIFZlYzNcclxuICogQGV4dGVuZHMgVmFsdWVUeXBlXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjMyBleHRlbmRzIFZhbHVlVHlwZSB7XHJcbiAgICAvLyBkZXByZWNhdGVkXHJcbiAgICBzdGF0aWMgc3ViICAgPSBWZWMzLnN1YnRyYWN0O1xyXG4gICAgc3RhdGljIG11bCAgID0gVmVjMy5tdWx0aXBseTtcclxuICAgIHN0YXRpYyBzY2FsZSA9IFZlYzMubXVsdGlwbHlTY2FsYXI7XHJcbiAgICBzdGF0aWMgbWFnICAgPSBWZWMzLmxlbjtcclxuICAgIHN0YXRpYyBzcXVhcmVkTWFnbml0dWRlID0gVmVjMy5sZW5ndGhTcXI7XHJcbiAgICBzdGF0aWMgZGl2ID0gVmVjMy5kaXZpZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgICAqICEjemgg6L+U5Zue6K+l5ZCR6YeP55qE6ZW/5bqm44CCXHJcbiAgICAgKiBAbWV0aG9kIG1hZ1xyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MygxMCwgMTAsIDEwKTtcclxuICAgICAqIHYubWFnKCk7IC8vIHJldHVybiAxNy4zMjA1MDgwNzU2ODg3NzU7XHJcbiAgICAgKi9cclxuICAgIG1hZyAgPSBWZWMzLnByb3RvdHlwZS5sZW47XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puW5s+aWueOAglxyXG4gICAgICogQG1ldGhvZCBtYWdTcXJcclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBtYWdTcXIgPSBWZWMzLnByb3RvdHlwZS5sZW5ndGhTcXI7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIHN1YigpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azleOAguWmguaenOS9oOaDs+S/neWtmOe7k+aenOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBzdWIoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2Qgc3ViU2VsZlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBzdWJTZWxmICA9IFZlYzMucHJvdG90eXBlLnN1YnRyYWN0O1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WHj+azle+8jOW5tui/lOWbnuaWsOe7k+aenOOAglxyXG4gICAgICogQG1ldGhvZCBzdWJcclxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgc3ViICh2ZWN0b3I6IFZlYzMsIG91dD86IFZlYzMpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5zdWJ0cmFjdChvdXQgfHwgbmV3IFZlYzMoKSwgdGhpcywgdmVjdG9yKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHRoaXMgYnkgYSBudW1iZXIuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgbXVsKCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg57yp5pS+5b2T5YmN5ZCR6YeP44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIG11bCgpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBtdWxTZWxmXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgbXVsU2VsZiAgPSBWZWMzLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhcjtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIGJ5IGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg57yp5pS+5ZCR6YeP77yM5bm26L+U5Zue5paw57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzMgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzMgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSB0aGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIG11bCAobnVtOiBudW1iZXIsIG91dD86IFZlYzMpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IFZlYzMoKSwgdGhpcywgbnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIGRpdigpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+mZpOazleOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBkaXYoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2QgZGl2U2VsZlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGRpdlNlbGYgID0gVmVjMy5wcm90b3R5cGUuZGl2aWRlO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERpdmlkZXMgYnkgYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxyXG4gICAgICogISN6aCDlkJHph4/pmaTms5XvvIzlubbov5Tlm57mlrDnmoTnu5PmnpzjgIJcclxuICAgICAqIEBtZXRob2QgZGl2XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgZGl2IChudW06IG51bWJlciwgb3V0PzogVmVjMyk6IFZlYzMge1xyXG4gICAgICAgIHJldHVybiBWZWMzLm11bHRpcGx5U2NhbGFyKG91dCB8fCBuZXcgVmVjMygpLCB0aGlzLCAxL251bSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0d28gdmVjdG9ycy5cclxuICAgICAqICEjemgg5YiG6YeP55u45LmY44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjYWxlU2VsZlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBzY2FsZVNlbGYgPSBWZWMzLnByb3RvdHlwZS5tdWx0aXBseTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHR3byB2ZWN0b3JzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg5YiG6YeP55u45LmY77yM5bm26L+U5Zue5paw55qE57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzMgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzMgd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSB0aGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHNjYWxlICh2ZWN0b3I6IFZlYzMsIG91dD86IFZlYzMpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5tdWx0aXBseShvdXQgfHwgbmV3IFZlYzMoKSwgdGhpcywgdmVjdG9yKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOZWdhdGVzIHRoZSBjb21wb25lbnRzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIG5lZygpIGluc3RlYWQuXHJcbiAgICAgKiAhI3poIOWQkemHj+WPluWPjeOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBuZWcoKSDku6Pmm7/jgIJcclxuICAgICAqIEBtZXRob2QgbmVnU2VsZlxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIG5lZ1NlbGYgPSBWZWMzLnByb3RvdHlwZS5uZWdhdGU7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXHJcbiAgICAgKiAhI3poIOi/lOWbnuWPluWPjeWQjueahOaWsOWQkemHj+OAglxyXG4gICAgICogQG1ldGhvZCBuZWdcclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjM30gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBuZWcgKG91dD86IFZlYzMpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5uZWdhdGUob3V0IHx8IG5ldyBWZWMzKCksIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMzIG9iamVjdCB3aXRoIHggPSAxLCB5ID0gMSwgeiA9IDEuXHJcbiAgICAgKiAhI3poIOaWsCBWZWMzIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IE9ORVxyXG4gICAgICogQHR5cGUgVmVjM1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IE9ORSAoKSB7IHJldHVybiBuZXcgVmVjMygxLCAxLCAxKTsgfVxyXG4gICAgc3RhdGljIHJlYWRvbmx5IE9ORV9SID0gVmVjMy5PTkU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzMgb2JqZWN0IHdpdGggeCA9IDAsIHkgPSAwLCB6ID0gMC5cclxuICAgICAqICEjemgg6L+U5ZueIHggPSAw77yMeSA9IDDvvIx6ID0gMCDnmoQgVmVjMyDlr7nosaHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXHJcbiAgICAgKiBAdHlwZSBWZWMzXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgWkVSTyAoKSB7IHJldHVybiBuZXcgVmVjMygpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgWkVST19SID0gVmVjMy5aRVJPO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMzIG9iamVjdCB3aXRoIHggPSAwLCB5ID0gMSwgeiA9IDAuXHJcbiAgICAgKiAhI3poIOi/lOWbniB4ID0gMCwgeSA9IDEsIHogPSAwIOeahCBWZWMzIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IFVQXHJcbiAgICAgKiBAdHlwZSBWZWMzXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgVVAgKCkgeyByZXR1cm4gbmV3IFZlYzMoMCwgMSwgMCk7IH1cclxuICAgIHN0YXRpYyByZWFkb25seSBVUF9SID0gVmVjMy5VUDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gcmV0dXJuIGEgVmVjMyBvYmplY3Qgd2l0aCB4ID0gMSwgeSA9IDAsIHogPSAwLlxyXG4gICAgICogISN6aCDov5Tlm54geCA9IDHvvIx5ID0gMO+8jHogPSAwIOeahCBWZWMzIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IFJJR0hUXHJcbiAgICAgKiBAdHlwZSBWZWMzXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgUklHSFQgKCkgeyByZXR1cm4gbmV3IFZlYzMoMSwgMCwgMCk7IH1cclxuICAgIHN0YXRpYyByZWFkb25seSBSSUdIVF9SID0gVmVjMy5SSUdIVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gcmV0dXJuIGEgVmVjMyBvYmplY3Qgd2l0aCB4ID0gMCwgeSA9IDAsIHogPSAxLlxyXG4gICAgICogISN6aCDov5Tlm54geCA9IDDvvIx5ID0gMO+8jHogPSAxIOeahCBWZWMzIOWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IEZPUldBUkRcclxuICAgICAqIEB0eXBlIFZlYzNcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBGT1JXQVJEICgpIHsgcmV0dXJuIG5ldyBWZWMzKDAsIDAsIDEpOyB9XHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgRlJPTlRfUiA9IFZlYzMuRk9SV0FSRDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWwhuebruagh+i1i+WAvOS4uumbtuWQkemHj1xyXG4gICAgICogISNlbiBUaGUgdGFyZ2V0IG9mIGFuIGFzc2lnbm1lbnQgemVybyB2ZWN0b3JcclxuICAgICAqIEBtZXRob2QgemVyb1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHplcm88T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHplcm88T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IDA7XHJcbiAgICAgICAgb3V0LnkgPSAwO1xyXG4gICAgICAgIG91dC56ID0gMDtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cclxuICAgICAqICEjZW4gT2J0YWluaW5nIGNvcHkgdmVjdG9ycyBkZXNpZ25hdGVkXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2xvbmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0KTogVmVjM1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMzKGEueCwgYS55LCBhLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlpI3liLbnm67moIflkJHph49cclxuICAgICAqICEjZW4gQ29weSB0aGUgdGFyZ2V0IHZlY3RvclxyXG4gICAgICogQG1ldGhvZCBjb3B5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29weTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb3B5PE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UpIHtcclxuICAgICAgICBvdXQueCA9IGEueDtcclxuICAgICAgICBvdXQueSA9IGEueTtcclxuICAgICAgICBvdXQueiA9IGEuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDorr7nva7lkJHph4/lgLxcclxuICAgICAqICEjZW4gU2V0IHRvIHZhbHVlXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNldDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSB4O1xyXG4gICAgICAgIG91dC55ID0geTtcclxuICAgICAgICBvdXQueiA9IHo7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXHJcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgYWRkaXRpb25cclxuICAgICAqIEBtZXRob2QgYWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56ICsgYi56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WHj+azlVxyXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIHN1YnRyYWN0aW9uXHJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc3VidHJhY3Q8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzdWJ0cmFjdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcclxuICAgICAgICBvdXQueSA9IGEueSAtIGIueTtcclxuICAgICAgICBvdXQueiA9IGEueiAtIGIuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/kuZjms5UgKOWIhumHj+enrylcclxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiAocHJvZHVjdCBjb21wb25lbnQpXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbXVsdGlwbHk8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8xIGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8yIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlXzEsIGI6IFZlYzNMaWtlXzIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG11bHRpcGx5PE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMSBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMiBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZV8xLCBiOiBWZWMzTGlrZV8yKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKiBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiLnk7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKiBiLno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXHJcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgZGl2aXNpb25cclxuICAgICAqIEBtZXRob2QgZGl2aWRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGl2aWRlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGl2aWRlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gYS54IC8gYi54O1xyXG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xyXG4gICAgICAgIG91dC56ID0gYS56IC8gYi56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4iuWPluaVtFxyXG4gICAgICogISNlbiBSb3VuZGluZyB1cCBieSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIGNlaWxcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjZWlsPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNlaWw8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5jZWlsKGEueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLmNlaWwoYS55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGguY2VpbChhLnopO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxyXG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSByb3VuZGluZyBkb3duXHJcbiAgICAgKiBAbWV0aG9kIGZsb29yXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZmxvb3I8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmxvb3I8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xyXG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5mbG9vcihhLnopO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxyXG4gICAgICogISNlbiBUaGUgbWluaW11bSBieS1lbGVtZW50IHZlY3RvclxyXG4gICAgICogQG1ldGhvZCBtaW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBtaW48T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtaW48T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBNYXRoLm1pbihhLngsIGIueCk7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XHJcbiAgICAgICAgb3V0LnogPSBNYXRoLm1pbihhLnosIGIueik7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XHJcbiAgICAgKiAhI2VuIFRoZSBtYXhpbXVtIHZhbHVlIG9mIHRoZSBlbGVtZW50LXdpc2UgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIG1heFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG1heDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1heDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgubWF4KGEueiwgYi56KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcclxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBvZiByb3VuZGluZyB0byB3aG9sZVxyXG4gICAgICogQG1ldGhvZCByb3VuZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdW5kPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJvdW5kPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IE1hdGgucm91bmQoYS54KTtcclxuICAgICAgICBvdXQueSA9IE1hdGgucm91bmQoYS55KTtcclxuICAgICAgICBvdXQueiA9IE1hdGgucm91bmQoYS56KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/moIfph4/kuZjms5VcclxuICAgICAqICEjZW4gVmVjdG9yIHNjYWxhciBtdWx0aXBsaWNhdGlvblxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UsIGI6IG51bWJlcik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXI8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZSwgYjogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKiBiO1xyXG4gICAgICAgIG91dC55ID0gYS55ICogYjtcclxuICAgICAgICBvdXQueiA9IGEueiAqIGI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgbXVsdGlwbHkgYWRkOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKiBAbWV0aG9kIHNjYWxlQW5kQWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc2NhbGVBbmRBZGQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzY2FsZUFuZEFkZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIGIueCAqIHNjYWxlO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgYi55ICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKyBiLnogKiBzY2FsZTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcclxuICAgICAqICEjZW4gU2Vla2luZyB0d28gdmVjdG9ycyBFdWNsaWRlYW4gZGlzdGFuY2VcclxuICAgICAqIEBtZXRob2QgZGlzdGFuY2VcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBkaXN0YW5jZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzdGFuY2U8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBfeCA9IGIueCAtIGEueDtcclxuICAgICAgICBfeSA9IGIueSAtIGEueTtcclxuICAgICAgICBfeiA9IGIueiAtIGEuejtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfeik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxyXG4gICAgICogISNlbiBFdWNsaWRlYW4gZGlzdGFuY2Ugc3F1YXJlZCBzZWVraW5nIHR3byB2ZWN0b3JzXHJcbiAgICAgKiBAbWV0aG9kIHNxdWFyZWREaXN0YW5jZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNxdWFyZWREaXN0YW5jZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3F1YXJlZERpc3RhbmNlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBiLnggLSBhLng7XHJcbiAgICAgICAgX3kgPSBiLnkgLSBhLnk7XHJcbiAgICAgICAgX3ogPSBiLnogLSBhLno7XHJcbiAgICAgICAgcmV0dXJuIF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfejtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5rGC5ZCR6YeP6ZW/5bqmXHJcbiAgICAgKiAhI2VuIFNlZWtpbmcgdmVjdG9yIGxlbmd0aFxyXG4gICAgICogQG1ldGhvZCBsZW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZW48T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZW48T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgX3ogPSBhLno7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChfeCAqIF94ICsgX3kgKiBfeSArIF96ICogX3opO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqblubPmlrlcclxuICAgICAqICEjZW4gU2Vla2luZyBzcXVhcmVkIHZlY3RvciBsZW5ndGhcclxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbGVuZ3RoU3FyPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGVuZ3RoU3FyPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIF96ID0gYS56O1xyXG4gICAgICAgIHJldHVybiBfeCAqIF94ICsgX3kgKiBfeSArIF96ICogX3o7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPlui0n1xyXG4gICAgICogISNlbiBCeSB0YWtpbmcgdGhlIG5lZ2F0aXZlIGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3JcclxuICAgICAqIEBtZXRob2QgbmVnYXRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbmVnYXRlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5lZ2F0ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAtYS54O1xyXG4gICAgICAgIG91dC55ID0gLWEueTtcclxuICAgICAgICBvdXQueiA9IC1hLno7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIEluZmluaXR5XHJcbiAgICAgKiAhI2VuIEVsZW1lbnQgdmVjdG9yIGJ5IHRha2luZyB0aGUgaW52ZXJzZSwgcmV0dXJuIG5lYXIgMCBJbmZpbml0eVxyXG4gICAgICogQG1ldGhvZCBpbnZlcnNlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogaW52ZXJzZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnZlcnNlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IDEuMCAvIGEueDtcclxuICAgICAgICBvdXQueSA9IDEuMCAvIGEueTtcclxuICAgICAgICBvdXQueiA9IDEuMCAvIGEuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gMFxyXG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSB0YWtpbmcgdGhlIGludmVyc2UsIHJldHVybiBuZWFyIDAgMFxyXG4gICAgICogQG1ldGhvZCBpbnZlcnNlU2FmZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGludmVyc2VTYWZlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGludmVyc2VTYWZlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBfeCA9IGEueDtcclxuICAgICAgICBfeSA9IGEueTtcclxuICAgICAgICBfeiA9IGEuejtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKF94KSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgb3V0LnggPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8gX3g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMoX3kpIDwgRVBTSUxPTikge1xyXG4gICAgICAgICAgICBvdXQueSA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyBfeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhfeikgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIG91dC56ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQueiA9IDEuMCAvIF96O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5b2S5LiA5YyW5ZCR6YePXHJcbiAgICAgKiAhI2VuIE5vcm1hbGl6ZWQgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG5vcm1hbGl6ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxpemU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZSkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIF96ID0gYS56O1xyXG5cclxuICAgICAgICBsZXQgbGVuID0gX3ggKiBfeCArIF95ICogX3kgKyBfeiAqIF96O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgb3V0LnggPSBfeCAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnkgPSBfeSAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LnogPSBfeiAqIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXHJcbiAgICAgKiAhI2VuIFZlY3RvciBkb3QgcHJvZHVjdCAoc2NhbGFyIHByb2R1Y3QpXHJcbiAgICAgKiBAbWV0aG9kIGRvdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRvdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZG90PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIuejtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP5Y+J56ev77yI5ZCR6YeP56ev77yJXHJcbiAgICAgKiAhI2VuIFZlY3RvciBjcm9zcyBwcm9kdWN0ICh2ZWN0b3IgcHJvZHVjdClcclxuICAgICAqIEBtZXRob2QgY3Jvc3NcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjcm9zczxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlXzEgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlXzIgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2VfMSwgYjogVmVjM0xpa2VfMik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3Jvc3M8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8xIGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8yIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlXzEsIGI6IFZlYzNMaWtlXzIpIHtcclxuICAgICAgICBjb25zdCB7IHg6IGF4LCB5OiBheSwgejogYXogfSA9IGE7XHJcbiAgICAgICAgY29uc3QgeyB4OiBieCwgeTogYnksIHo6IGJ6IH0gPSBiO1xyXG4gICAgICAgIG91dC54ID0gYXkgKiBieiAtIGF6ICogYnk7XHJcbiAgICAgICAgb3V0LnkgPSBheiAqIGJ4IC0gYXggKiBiejtcclxuICAgICAgICBvdXQueiA9IGF4ICogYnkgLSBheSAqIGJ4O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+e6v+aAp+aPkuWAvO+8miBBICsgdCAqIChCIC0gQSlcclxuICAgICAqICEjZW4gVmVjdG9yIGVsZW1lbnQgYnkgZWxlbWVudCBsaW5lYXIgaW50ZXJwb2xhdGlvbjogQSArIHQgKiAoQiAtIEEpXHJcbiAgICAgKiBAbWV0aG9kIGxlcnBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZXJwPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZXJwPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XHJcbiAgICAgICAgb3V0LnggPSBhLnggKyB0ICogKGIueCAtIGEueCk7XHJcbiAgICAgICAgb3V0LnkgPSBhLnkgKyB0ICogKGIueSAtIGEueSk7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKyB0ICogKGIueiAtIGEueik7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg55Sf5oiQ5LiA5Liq5Zyo5Y2V5L2N55CD5L2T5LiK5Z2H5YyA5YiG5biD55qE6ZqP5py65ZCR6YePXHJcbiAgICAgKiAhI2VuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9ycyBvbiB0aGUgdW5pdCBzcGhlcmVcclxuICAgICAqIEBtZXRob2QgcmFuZG9tXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcmFuZG9tPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIHNjYWxlIOeUn+aIkOeahOWQkemHj+mVv+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmFuZG9tPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcikge1xyXG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xyXG5cclxuICAgICAgICBjb25zdCBwaGkgPSByYW5kb20oKSAqIDIuMCAqIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3QgY29zVGhldGEgPSByYW5kb20oKSAqIDIgLSAxO1xyXG4gICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zcXJ0KDEgLSBjb3NUaGV0YSAqIGNvc1RoZXRhKTtcclxuXHJcbiAgICAgICAgb3V0LnggPSBzaW5UaGV0YSAqIE1hdGguY29zKHBoaSkgKiBzY2FsZTtcclxuICAgICAgICBvdXQueSA9IHNpblRoZXRhICogTWF0aC5zaW4ocGhpKSAqIHNjYWxlO1xyXG4gICAgICAgIG91dC56ID0gY29zVGhldGEgKiBzY2FsZTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzlm5vkvY3kuLogMeOAglxyXG4gICAgICogISNlbiBGb3VyLWRpbWVuc2lvbmFsIHZlY3RvciBhbmQgbWF0cml4IG11bHRpcGxpY2F0aW9uLCB0aGUgZGVmYXVsdCB2ZWN0b3JzIGZvdXJ0aCBvbmUuXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0cmFuc2Zvcm1NYXQ0PE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UsIG1hdDogTWF0TGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtTWF0NDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlLCBtYXQ6IE1hdExpa2UpIHtcclxuICAgICAgICBfeCA9IGEueDtcclxuICAgICAgICBfeSA9IGEueTtcclxuICAgICAgICBfeiA9IGEuejtcclxuICAgICAgICBsZXQgbSA9IG1hdC5tO1xyXG4gICAgICAgIGxldCByaHcgPSBtWzNdICogX3ggKyBtWzddICogX3kgKyBtWzExXSAqIF96ICsgbVsxNV07XHJcbiAgICAgICAgcmh3ID0gcmh3ID8gMSAvIHJodyA6IDE7XHJcbiAgICAgICAgb3V0LnggPSAobVswXSAqIF94ICsgbVs0XSAqIF95ICsgbVs4XSAqIF96ICsgbVsxMl0pICogcmh3O1xyXG4gICAgICAgIG91dC55ID0gKG1bMV0gKiBfeCArIG1bNV0gKiBfeSArIG1bOV0gKiBfeiArIG1bMTNdKSAqIHJodztcclxuICAgICAgICBvdXQueiA9IChtWzJdICogX3ggKyBtWzZdICogX3kgKyBtWzEwXSAqIF96ICsgbVsxNF0pICogcmh3O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWQkemHj+S4juWbm+e7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOWbm+S9jeS4uiAw44CCXHJcbiAgICAgKiAhI2VuIEZvdXItZGltZW5zaW9uYWwgdmVjdG9yIGFuZCBtYXRyaXggbXVsdGlwbGljYXRpb24sIHZlY3RvciBmb3VydGggZGVmYXVsdCBpcyAwLlxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQ0Tm9ybWFsXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNmb3JtTWF0NE5vcm1hbDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBtYXQ6IE1hdExpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDROb3JtYWw8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKSB7XHJcbiAgICAgICAgX3ggPSBhLng7XHJcbiAgICAgICAgX3kgPSBhLnk7XHJcbiAgICAgICAgX3ogPSBhLno7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBsZXQgcmh3ID0gbVszXSAqIF94ICsgbVs3XSAqIF95ICsgbVsxMV0gKiBfejtcclxuICAgICAgICByaHcgPSByaHcgPyAxIC8gcmh3IDogMTtcclxuICAgICAgICBvdXQueCA9IChtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzhdICogX3opICogcmh3O1xyXG4gICAgICAgIG91dC55ID0gKG1bMV0gKiBfeCArIG1bNV0gKiBfeSArIG1bOV0gKiBfeikgKiByaHc7XHJcbiAgICAgICAgb3V0LnogPSAobVsyXSAqIF94ICsgbVs2XSAqIF95ICsgbVsxMF0gKiBfeikgKiByaHc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP5LiO5LiJ57u055+p6Zi15LmY5rOVXHJcbiAgICAgKiAhI2VuIERpbWVuc2lvbmFsIHZlY3RvciBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0M1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRyYW5zZm9ybU1hdDM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQzPE91dCBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSkge1xyXG4gICAgICAgIF94ID0gYS54O1xyXG4gICAgICAgIF95ID0gYS55O1xyXG4gICAgICAgIF96ID0gYS56O1xyXG4gICAgICAgIGxldCBtID0gbWF0Lm07XHJcbiAgICAgICAgb3V0LnggPSBfeCAqIG1bMF0gKyBfeSAqIG1bM10gKyBfeiAqIG1bNl07XHJcbiAgICAgICAgb3V0LnkgPSBfeCAqIG1bMV0gKyBfeSAqIG1bNF0gKyBfeiAqIG1bN107XHJcbiAgICAgICAgb3V0LnogPSBfeCAqIG1bMl0gKyBfeSAqIG1bNV0gKyBfeiAqIG1bOF07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP5Lu/5bCE5Y+Y5o2iXHJcbiAgICAgKiAhI2VuIEFmZmluZSB0cmFuc2Zvcm1hdGlvbiB2ZWN0b3JcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtQWZmaW5lXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNmb3JtQWZmaW5lPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4ob3V0OiBPdXQsIHY6IFZlY0xpa2UsIG1hdDogTWF0TGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtQWZmaW5lPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT5cclxuICAgICAgICAob3V0OiBPdXQsIHY6IFZlY0xpa2UsIG1hdDogTWF0TGlrZSkge1xyXG4gICAgICAgIF94ID0gdi54O1xyXG4gICAgICAgIF95ID0gdi55O1xyXG4gICAgICAgIF96ID0gdi56O1xyXG4gICAgICAgIGxldCBtID0gbWF0Lm07XHJcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzFdICogX3kgKyBtWzJdICogX3ogKyBtWzNdO1xyXG4gICAgICAgIG91dC55ID0gbVs0XSAqIF94ICsgbVs1XSAqIF95ICsgbVs2XSAqIF96ICsgbVs3XTtcclxuICAgICAgICBvdXQueCA9IG1bOF0gKiBfeCArIG1bOV0gKiBfeSArIG1bMTBdICogX3ogKyBtWzExXTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlkJHph4/lm5vlhYPmlbDkuZjms5VcclxuICAgICAqICEjZW4gVmVjdG9yIHF1YXRlcm5pb24gbXVsdGlwbGljYXRpb25cclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtUXVhdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRyYW5zZm9ybVF1YXQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBWZWNMaWtlLCBxOiBRdWF0TGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtUXVhdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFZlY0xpa2UsIHE6IFF1YXRMaWtlKSB7XHJcbiAgICAgICAgLy8gYmVuY2htYXJrczogaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tVmVjMy1pbXBsZW1lbnRhdGlvbnNcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcclxuICAgICAgICBjb25zdCBpeCA9IHEudyAqIGEueCArIHEueSAqIGEueiAtIHEueiAqIGEueTtcclxuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcclxuICAgICAgICBjb25zdCBpeiA9IHEudyAqIGEueiArIHEueCAqIGEueSAtIHEueSAqIGEueDtcclxuICAgICAgICBjb25zdCBpdyA9IC1xLnggKiBhLnggLSBxLnkgKiBhLnkgLSBxLnogKiBhLno7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcclxuICAgICAgICBvdXQueCA9IGl4ICogcS53ICsgaXcgKiAtcS54ICsgaXkgKiAtcS56IC0gaXogKiAtcS55O1xyXG4gICAgICAgIG91dC55ID0gaXkgKiBxLncgKyBpdyAqIC1xLnkgKyBpeiAqIC1xLnggLSBpeCAqIC1xLno7XHJcbiAgICAgICAgb3V0LnogPSBpeiAqIHEudyArIGl3ICogLXEueiArIGl4ICogLXEueSAtIGl5ICogLXEueDtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDku6XnvKnmlL4gLT4g5peL6L2sIC0+IOW5s+enu+mhuuW6j+WPmOaNouWQkemHj1xyXG4gICAgICogISNlbiBUbyBzY2FsZSAtPiByb3RhdGlvbiAtPiB0cmFuc2Zvcm1hdGlvbiB2ZWN0b3Igc2VxdWVuY2UgdHJhbnNsYXRpb25cclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtUXVhdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRyYW5zZm9ybVJUUzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPihvdXQ6IE91dCwgYTogVmVjTGlrZSwgcjogUXVhdExpa2UsIHQ6IFZlY0xpa2UsIHM6IFZlY0xpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybVJUUzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAoXHJcbiAgICAgICAgb3V0OiBPdXQsIGE6IFZlY0xpa2UsIHI6IFF1YXRMaWtlLCB0OiBWZWNMaWtlLCBzOiBWZWNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IGEueCAqIHMueDtcclxuICAgICAgICBjb25zdCB5ID0gYS55ICogcy55O1xyXG4gICAgICAgIGNvbnN0IHogPSBhLnogKiBzLno7XHJcbiAgICAgICAgY29uc3QgaXggPSByLncgKiB4ICsgci55ICogeiAtIHIueiAqIHk7XHJcbiAgICAgICAgY29uc3QgaXkgPSByLncgKiB5ICsgci56ICogeCAtIHIueCAqIHo7XHJcbiAgICAgICAgY29uc3QgaXogPSByLncgKiB6ICsgci54ICogeSAtIHIueSAqIHg7XHJcbiAgICAgICAgY29uc3QgaXcgPSAtci54ICogeCAtIHIueSAqIHkgLSByLnogKiB6O1xyXG4gICAgICAgIG91dC54ID0gaXggKiByLncgKyBpdyAqIC1yLnggKyBpeSAqIC1yLnogLSBpeiAqIC1yLnkgKyB0Lng7XHJcbiAgICAgICAgb3V0LnkgPSBpeSAqIHIudyArIGl3ICogLXIueSArIGl6ICogLXIueCAtIGl4ICogLXIueiArIHQueTtcclxuICAgICAgICBvdXQueiA9IGl6ICogci53ICsgaXcgKiAtci56ICsgaXggKiAtci55IC0gaXkgKiAtci54ICsgdC56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOS7peW5s+enuyAtPiDml4vovawgLT4g57yp5pS+6aG65bqP6YCG5Y+Y5o2i5ZCR6YePXHJcbiAgICAgKiAhI2VuIFRyYW5zbGF0aW9uYWwgLT4gcm90YXRpb24gLT4gWm9vbSBpbnZlcnNlIHRyYW5zZm9ybWF0aW9uIHZlY3RvciBzZXF1ZW5jZVxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1JbnZlcnNlUlRTXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNmb3JtSW52ZXJzZVJUUzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPihvdXQ6IE91dCwgYTogVmVjTGlrZSwgcjogUXVhdExpa2UsIHQ6IFZlY0xpa2UsIHM6IFZlY0xpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zZm9ybUludmVyc2VSVFM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKFxyXG4gICAgICAgIG91dDogT3V0LCBhOiBWZWNMaWtlLCByOiBRdWF0TGlrZSwgdDogVmVjTGlrZSwgczogVmVjTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IHggPSBhLnggLSB0Lng7XHJcbiAgICAgICAgY29uc3QgeSA9IGEueSAtIHQueTtcclxuICAgICAgICBjb25zdCB6ID0gYS56IC0gdC56O1xyXG4gICAgICAgIGNvbnN0IGl4ID0gci53ICogeCAtIHIueSAqIHogKyByLnogKiB5O1xyXG4gICAgICAgIGNvbnN0IGl5ID0gci53ICogeSAtIHIueiAqIHggKyByLnggKiB6O1xyXG4gICAgICAgIGNvbnN0IGl6ID0gci53ICogeiAtIHIueCAqIHkgKyByLnkgKiB4O1xyXG4gICAgICAgIGNvbnN0IGl3ID0gci54ICogeCArIHIueSAqIHkgKyByLnogKiB6O1xyXG4gICAgICAgIG91dC54ID0gKGl4ICogci53ICsgaXcgKiByLnggKyBpeSAqIHIueiAtIGl6ICogci55KSAvIHMueDtcclxuICAgICAgICBvdXQueSA9IChpeSAqIHIudyArIGl3ICogci55ICsgaXogKiByLnggLSBpeCAqIHIueikgLyBzLnk7XHJcbiAgICAgICAgb3V0LnogPSAoaXogKiByLncgKyBpdyAqIHIueiArIGl4ICogci55IC0gaXkgKiByLngpIC8gcy56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOe7lSBYIOi9tOaXi+i9rOWQkemHj+aMh+WumuW8p+W6plxyXG4gICAgICogISNlbiBSb3RhdGlvbiB2ZWN0b3Igc3BlY2lmaWVkIGFuZ2xlIGFib3V0IHRoZSBYIGF4aXNcclxuICAgICAqIEBtZXRob2Qgcm90YXRlWFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IE91dCwgbzogT3V0LCBhOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSB2IOW+heaXi+i9rOWQkemHj1xyXG4gICAgICogQHBhcmFtIG8g5peL6L2s5Lit5b+DXHJcbiAgICAgKiBAcGFyYW0gYSDml4vovazlvKfluqZcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IE91dCwgbzogT3V0LCBhOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBUcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxyXG4gICAgICAgIF94ID0gdi54IC0gby54O1xyXG4gICAgICAgIF95ID0gdi55IC0gby55O1xyXG4gICAgICAgIF96ID0gdi56IC0gby56O1xyXG5cclxuICAgICAgICAvLyBwZXJmb3JtIHJvdGF0aW9uXHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYSk7XHJcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYSk7XHJcbiAgICAgICAgY29uc3QgcnggPSBfeDtcclxuICAgICAgICBjb25zdCByeSA9IF95ICogY29zIC0gX3ogKiBzaW47XHJcbiAgICAgICAgY29uc3QgcnogPSBfeSAqIHNpbiArIF96ICogY29zO1xyXG5cclxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxyXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XHJcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcclxuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDnu5UgWSDovbTml4vovazlkJHph4/mjIflrprlvKfluqZcclxuICAgICAqICEjZW4gUm90YXRpb24gdmVjdG9yIHNwZWNpZmllZCBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xyXG4gICAgICogQG1ldGhvZCByb3RhdGVZXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcm90YXRlWTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogT3V0LCBvOiBPdXQsIGE6IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIHYg5b6F5peL6L2s5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0gbyDml4vovazkuK3lv4NcclxuICAgICAqIEBwYXJhbSBhIOaXi+i9rOW8p+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogT3V0LCBvOiBPdXQsIGE6IG51bWJlcikge1xyXG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXHJcbiAgICAgICAgX3ggPSB2LnggLSBvLng7XHJcbiAgICAgICAgX3kgPSB2LnkgLSBvLnk7XHJcbiAgICAgICAgX3ogPSB2LnogLSBvLno7XHJcblxyXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cclxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcclxuICAgICAgICBjb25zdCByeCA9IF96ICogc2luICsgX3ggKiBjb3M7XHJcbiAgICAgICAgY29uc3QgcnkgPSBfeTtcclxuICAgICAgICBjb25zdCByeiA9IF96ICogY29zIC0gX3ggKiBzaW47XHJcblxyXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXHJcbiAgICAgICAgb3V0LnggPSByeCArIG8ueDtcclxuICAgICAgICBvdXQueSA9IHJ5ICsgby55O1xyXG4gICAgICAgIG91dC56ID0gcnogKyBvLno7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOe7lSBaIOi9tOaXi+i9rOWQkemHj+aMh+WumuW8p+W6plxyXG4gICAgICogISNlbiBBcm91bmQgdGhlIFogYXhpcyBzcGVjaWZpZWQgYW5nbGUgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVpcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByb3RhdGVaPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBPdXQsIG86IE91dCwgYTogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gdiDlvoXml4vovazlkJHph49cclxuICAgICAqIEBwYXJhbSBvIOaXi+i9rOS4reW/g1xyXG4gICAgICogQHBhcmFtIGEg5peL6L2s5byn5bqmXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByb3RhdGVaPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBPdXQsIG86IE91dCwgYTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cclxuICAgICAgICBfeCA9IHYueCAtIG8ueDtcclxuICAgICAgICBfeSA9IHYueSAtIG8ueTtcclxuICAgICAgICBfeiA9IHYueiAtIG8uejtcclxuXHJcbiAgICAgICAgLy8gcGVyZm9ybSByb3RhdGlvblxyXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGEpO1xyXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGEpO1xyXG4gICAgICAgIGNvbnN0IHJ4ID0gX3ggKiBjb3MgLSBfeSAqIHNpbjtcclxuICAgICAgICBjb25zdCByeSA9IF94ICogc2luICsgX3kgKiBjb3M7XHJcbiAgICAgICAgY29uc3QgcnogPSBfejtcclxuXHJcbiAgICAgICAgLy8gdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cclxuICAgICAgICBvdXQueCA9IHJ4ICsgby54O1xyXG4gICAgICAgIG91dC55ID0gcnkgKyBvLnk7XHJcbiAgICAgICAgb3V0LnogPSByeiArIG8uejtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP562J5Lu35Yik5patXHJcbiAgICAgKiAhI2VuIEVxdWl2YWxlbnQgdmVjdG9ycyBBbmFseXppbmdcclxuICAgICAqIEBtZXRob2Qgc3RyaWN0RXF1YWxzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc3RyaWN0RXF1YWxzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3RyaWN0RXF1YWxzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlkJHph4/ov5HkvLznrYnku7fliKTmlq1cclxuICAgICAqICEjZW4gTmVnYXRpdmUgZXJyb3IgdmVjdG9yIGZsb2F0aW5nIHBvaW50IGFwcHJveGltYXRlbHkgZXF1aXZhbGVudCBBbmFseXppbmdcclxuICAgICAqIEBtZXRob2QgZXF1YWxzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZXF1YWxzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIGNvbnN0IHsgeDogYTAsIHk6IGExLCB6OiBhMiB9ID0gYTtcclxuICAgICAgICBjb25zdCB7IHg6IGIwLCB5OiBiMSwgejogYjIgfSA9IGI7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnMoYTAgLSBiMCkgPD1cclxuICAgICAgICAgICAgZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9XHJcbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PVxyXG4gICAgICAgICAgICBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLkuKTlkJHph4/lpLnop5LlvKfluqZcclxuICAgICAqICEjZW4gUmFkaWFuIGFuZ2xlIGJldHdlZW4gdHdvIHZlY3RvcnMgc2Vla1xyXG4gICAgICogQG1ldGhvZCBhbmdsZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGFuZ2xlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhbmdsZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzEsIGEpO1xyXG4gICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzIsIGIpO1xyXG4gICAgICAgIGNvbnN0IGNvc2luZSA9IFZlYzMuZG90KHYzXzEsIHYzXzIpO1xyXG4gICAgICAgIGlmIChjb3NpbmUgPiAxLjApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3NpbmUgPCAtMS4wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuoeeul+WQkemHj+WcqOaMh+WumuW5s+mdouS4iueahOaKleW9sVxyXG4gICAgICogISNlbiBDYWxjdWxhdGluZyBhIHByb2plY3Rpb24gdmVjdG9yIGluIHRoZSBzcGVjaWZpZWQgcGxhbmVcclxuICAgICAqIEBtZXRob2QgcHJvamVjdE9uUGxhbmVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwcm9qZWN0T25QbGFuZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBuOiBPdXQpOiBPdXRcclxuICAgICAqIEBwYXJhbSBhIOW+heaKleW9seWQkemHj1xyXG4gICAgICogQHBhcmFtIG4g5oyH5a6a5bmz6Z2i55qE5rOV57q/XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwcm9qZWN0T25QbGFuZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBuOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5zdWJ0cmFjdChvdXQsIGEsIFZlYzMucHJvamVjdChvdXQsIGEsIG4pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6h566X5ZCR6YeP5Zyo5oyH5a6a5ZCR6YeP5LiK55qE5oqV5b2xXHJcbiAgICAgKiAhI2VuIFByb2plY3Rpb24gdmVjdG9yIGNhbGN1bGF0ZWQgaW4gdGhlIHZlY3RvciBkZXNpZ25hdGVkXHJcbiAgICAgKiBAbWV0aG9kIHByb2plY3RcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwcm9qZWN0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHBhcmFtIGEg5b6F5oqV5b2x5ZCR6YePXHJcbiAgICAgKiBAcGFyYW0gbiDnm67moIflkJHph49cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHByb2plY3Q8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgY29uc3Qgc3FyTGVuID0gVmVjMy5sZW5ndGhTcXIoYik7XHJcbiAgICAgICAgaWYgKHNxckxlbiA8IDAuMDAwMDAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBWZWMzLnNldChvdXQsIDAsIDAsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBWZWMzLm11bHRpcGx5U2NhbGFyKG91dCwgYiwgVmVjMy5kb3QoYSwgYikgLyBzcXJMZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5ZCR6YeP6L2s5pWw57uEXHJcbiAgICAgKiAhI2VuIFZlY3RvciB0cmFuc2ZlciBhcnJheVxyXG4gICAgICogQG1ldGhvZCB0b0FycmF5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgdjogSVZlYzNMaWtlLCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjM0xpa2UsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXRbb2ZzICsgMF0gPSB2Lng7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gdi55O1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHYuejtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5pWw57uE6L2s5ZCR6YePXHJcbiAgICAgKiAhI2VuIEFycmF5IHN0ZWVyaW5nIGFtb3VudFxyXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0LnggPSBhcnJbb2ZzICsgMF07XHJcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XHJcbiAgICAgICAgb3V0LnogPSBhcnJbb2ZzICsgMl07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0geFxyXG4gICAgICovXHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XHJcbiAgICAgKi9cclxuICAgIHk6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHpcclxuICAgICAqL1xyXG4gICAgejogbnVtYmVyO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENvbnN0cnVjdG9yXHJcbiAgICAgKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvdmVjMzptZXRob2RcIn19Y2MudjN7ey9jcm9zc0xpbmt9fVxyXG4gICAgICogISN6aFxyXG4gICAgICog5p6E6YCg5Ye95pWw77yM5Y+v5p+l55yLIHt7I2Nyb3NzTGluayBcImNjL3ZlYzM6bWV0aG9kXCJ9fWNjLnYze3svY3Jvc3NMaW5rfX1cclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjM3xudW1iZXJ9IFt4PTBdXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF1cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbej0wXVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAoeDogVmVjMyB8IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHo6IG51bWJlciA9IDApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcclxuICAgICAgICAgICAgdGhpcy56ID0geC56O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBjbG9uZSBhIFZlYzMgdmFsdWVcclxuICAgICAqICEjemgg5YWL6ZqG5LiA5LiqIFZlYzMg5YC8XHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfVxyXG4gICAgICovXHJcbiAgICBjbG9uZSAoKTogVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGN1cnJlbnQgdmVjdG9yIHZhbHVlIHdpdGggdGhlIGdpdmVuIHZlY3Rvci5cclxuICAgICAqICEjemgg55So5Y+m5LiA5Liq5ZCR6YeP6K6+572u5b2T5YmN55qE5ZCR6YeP5a+56LGh5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBuZXdWYWx1ZSAtICEjZW4gbmV3IHZhbHVlIHRvIHNldC4gISN6aCDopoHorr7nva7nmoTmlrDlgLxcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXQgKG5ld1ZhbHVlOiBWZWMzKTogVmVjMyB7XHJcbiAgICAgICAgdGhpcy54ID0gbmV3VmFsdWUueDtcclxuICAgICAgICB0aGlzLnkgPSBuZXdWYWx1ZS55O1xyXG4gICAgICAgIHRoaXMueiA9IG5ld1ZhbHVlLno7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBlcXVhbHMgYW5vdGhlciBvbmVcclxuICAgICAqICEjemgg5b2T5YmN55qE5ZCR6YeP5piv5ZCm5LiO5oyH5a6a55qE5ZCR6YeP55u4562J44CCXHJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xyXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdGhlclxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZXF1YWxzIChvdGhlcjogVmVjMyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIuejtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdHdvIHZlY3RvciBlcXVhbCB3aXRoIHNvbWUgZGVncmVlIG9mIHZhcmlhbmNlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6L+R5Ly85Yik5pat5Lik5Liq54K55piv5ZCm55u4562J44CCPGJyLz5cclxuICAgICAqIOWIpOaWrSAyIOS4quWQkemHj+aYr+WQpuWcqOaMh+WumuaVsOWAvOeahOiMg+WbtOS5i+WGhe+8jOWmguaenOWcqOWImei/lOWbniB0cnVl77yM5Y+N5LmL5YiZ6L+U5ZueIGZhbHNl44CCXHJcbiAgICAgKiBAbWV0aG9kIGZ1enp5RXF1YWxzXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG90aGVyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFyaWFuY2VcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGZ1enp5RXF1YWxzIChvdGhlcjogVmVjMywgdmFyaWFuY2U6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLnggLSB2YXJpYW5jZSA8PSBvdGhlci54ICYmIG90aGVyLnggPD0gdGhpcy54ICsgdmFyaWFuY2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMueSAtIHZhcmlhbmNlIDw9IG90aGVyLnkgJiYgb3RoZXIueSA8PSB0aGlzLnkgKyB2YXJpYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueiAtIHZhcmlhbmNlIDw9IG90aGVyLnogJiYgb3RoZXIueiA8PSB0aGlzLnogKyB2YXJpYW5jZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYW5zZm9ybSB0byBzdHJpbmcgd2l0aCB2ZWN0b3IgaW5mb3JtYXRpb25zXHJcbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxyXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0b1N0cmluZyAoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCIoXCIgK1xyXG4gICAgICAgICAgICB0aGlzLngudG9GaXhlZCgyKSArIFwiLCBcIiArXHJcbiAgICAgICAgICAgIHRoaXMueS50b0ZpeGVkKDIpICsgXCIsIFwiICtcclxuICAgICAgICAgICAgdGhpcy56LnRvRml4ZWQoMikgKyBcIilcIlxyXG4gICAgICAgICAgICA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENhbGN1bGF0ZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiByZXN1bHQgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlciBvbmUgd2l0aCBnaXZlbiByYXRpb1xyXG4gICAgICogISN6aCDnur/mgKfmj5LlgLzjgIJcclxuICAgICAqIEBtZXRob2QgbGVycFxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB0b1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnRcclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjM31cclxuICAgICAqL1xyXG4gICAgbGVycCAodG86IFZlYzMsIHJhdGlvOiBudW1iZXIsIG91dD86IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcclxuICAgICAgICBWZWMzLmxlcnAob3V0LCB0aGlzLCB0bywgcmF0aW8pO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENsYW1wIHRoZSB2ZWN0b3IgYmV0d2VlbiBmcm9tIGZsb2F0IGFuZCB0byBmbG9hdC5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/lOWbnuaMh+WumumZkOWItuWMuuWfn+WQjueahOWQkemHj+OAgjxici8+XHJcbiAgICAgKiDlkJHph4/lpKfkuo4gbWF4X2luY2x1c2l2ZSDliJnov5Tlm54gbWF4X2luY2x1c2l2ZeOAgjxici8+XHJcbiAgICAgKiDlkJHph4/lsI/kuo4gbWluX2luY2x1c2l2ZSDliJnov5Tlm54gbWluX2luY2x1c2l2ZeOAgjxici8+XHJcbiAgICAgKiDlkKbliJnov5Tlm57oh6rouqvjgIJcclxuICAgICAqIEBtZXRob2QgY2xhbXBmXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pbl9pbmNsdXNpdmVcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4X2luY2x1c2l2ZVxyXG4gICAgICogQHJldHVybiB7VmVjM31cclxuICAgICAqL1xyXG4gICAgY2xhbXBmIChtaW5faW5jbHVzaXZlOiBWZWMzLCBtYXhfaW5jbHVzaXZlOiBWZWMzKTogVmVjMyB7XHJcbiAgICAgICAgdGhpcy54ID0gbWlzYy5jbGFtcGYodGhpcy54LCBtaW5faW5jbHVzaXZlLngsIG1heF9pbmNsdXNpdmUueCk7XHJcbiAgICAgICAgdGhpcy55ID0gbWlzYy5jbGFtcGYodGhpcy55LCBtaW5faW5jbHVzaXZlLnksIG1heF9pbmNsdXNpdmUueSk7XHJcbiAgICAgICAgdGhpcy56ID0gbWlzYy5jbGFtcGYodGhpcy56LCBtaW5faW5jbHVzaXZlLnosIG1heF9pbmNsdXNpdmUueik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFkZHMgdGhpcyB2ZWN0b3IuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgYWRkKCkgaW5zdGVhZC5cclxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV44CC5aaC5p6c5L2g5oOz5L+d5a2Y57uT5p6c5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5L2/55SoIGFkZCgpIOS7o+abv+OAglxyXG4gICAgICogQG1ldGhvZCBhZGRTZWxmXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGFkZFNlbGYgKHZlY3RvcjogVmVjMyk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCArPSB2ZWN0b3IueDtcclxuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XHJcbiAgICAgICAgdGhpcy56ICs9IHZlY3Rvci56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBZGRzIHR3byB2ZWN0b3JzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cclxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV77yM5bm26L+U5Zue5paw57uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIGFkZFxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjM30gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBhZGQgKHZlY3RvcjogVmVjMywgb3V0PzogVmVjMyk6IFZlYzMge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMygpO1xyXG4gICAgICAgIG91dC54ID0gdGhpcy54ICsgdmVjdG9yLng7XHJcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgKyB2ZWN0b3IueTtcclxuICAgICAgICBvdXQueiA9IHRoaXMueiArIHZlY3Rvci56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcy5cclxuICAgICAqICEjemgg5ZCR6YeP5YeP5rOV44CCXHJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIHN1YnRyYWN0ICh2ZWN0b3I6IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICB0aGlzLnggLT0gdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy55IC09IHZlY3Rvci55O1xyXG4gICAgICAgIHRoaXMueiAtPSB2ZWN0b3IuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGlzIGJ5IGEgbnVtYmVyLlxyXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgIJcclxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlTY2FsYXJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBtdWx0aXBseVNjYWxhciAobnVtOiBudW1iZXIpOiBWZWMzIHtcclxuICAgICAgICB0aGlzLnggKj0gbnVtO1xyXG4gICAgICAgIHRoaXMueSAqPSBudW07XHJcbiAgICAgICAgdGhpcy56ICo9IG51bTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0d28gdmVjdG9ycy5cclxuICAgICAqICEjemgg5YiG6YeP55u45LmY44CCXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5ICh2ZWN0b3I6IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICB0aGlzLnggKj0gdmVjdG9yLng7XHJcbiAgICAgICAgdGhpcy55ICo9IHZlY3Rvci55O1xyXG4gICAgICAgIHRoaXMueiAqPSB2ZWN0b3IuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlci5cclxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV44CCXHJcbiAgICAgKiBAbWV0aG9kIGRpdmlkZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGRpdmlkZSAobnVtOiBudW1iZXIpOiBWZWMzIHtcclxuICAgICAgICB0aGlzLnggLz0gbnVtO1xyXG4gICAgICAgIHRoaXMueSAvPSBudW07XHJcbiAgICAgICAgdGhpcy56IC89IG51bTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cy5cclxuICAgICAqICEjemgg5ZCR6YeP5Y+W5Y+N44CCXHJcbiAgICAgKiBAbWV0aG9kIG5lZ2F0ZVxyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIG5lZ2F0ZSAoKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcclxuICAgICAgICB0aGlzLnkgPSAtdGhpcy55O1xyXG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERvdCBwcm9kdWN0XHJcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOeCueS5mOOAglxyXG4gICAgICogQG1ldGhvZCBkb3RcclxuICAgICAqIEBwYXJhbSB7VmVjM30gW3ZlY3Rvcl1cclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBkb3QgKHZlY3RvcjogVmVjMyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnkgKyB0aGlzLnogKiB2ZWN0b3IuejtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ3Jvc3MgcHJvZHVjdFxyXG4gICAgICogISN6aCDlvZPliY3lkJHph4/kuI7mjIflrprlkJHph4/ov5vooYzlj4nkuZjjgIJcclxuICAgICAqIEBtZXRob2QgY3Jvc3NcclxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSB0aGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIGNyb3NzICh2ZWN0b3I6IFZlYzMsIG91dD86IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcclxuICAgICAgICBWZWMzLmNyb3NzKG91dCwgdGhpcywgdmVjdG9yKVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgICAqICEjemgg6L+U5Zue6K+l5ZCR6YeP55qE6ZW/5bqm44CCXHJcbiAgICAgKiBAbWV0aG9kIGxlblxyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYgPSBjYy52MygxMCwgMTAsIDEwKTtcclxuICAgICAqIHYubGVuKCk7IC8vIHJldHVybiAxNy4zMjA1MDgwNzU2ODg3NzU7XHJcbiAgICAgKi9cclxuICAgIGxlbiAoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcclxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXHJcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgbGVuZ3RoU3FyICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLno7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE1ha2UgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3RvciB0byAxLlxyXG4gICAgICogISN6aCDlkJHph4/lvZLkuIDljJbvvIzorqnov5nkuKrlkJHph4/nmoTplb/luqbkuLogMeOAglxyXG4gICAgICogQG1ldGhvZCBub3JtYWxpemVTZWxmXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgbm9ybWFsaXplU2VsZiAoKTogVmVjMyB7XHJcbiAgICAgICAgVmVjMy5ub3JtYWxpemUodGhpcywgdGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGlzIHZlY3RvciB3aXRoIGEgbWFnbml0dWRlIG9mIDEuPGJyLz5cclxuICAgICAqIDxici8+XHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGN1cnJlbnQgdmVjdG9yIGlzIHVuY2hhbmdlZCBhbmQgYSBuZXcgbm9ybWFsaXplZCB2ZWN0b3IgaXMgcmV0dXJuZWQuIElmIHlvdSB3YW50IHRvIG5vcm1hbGl6ZSB0aGUgY3VycmVudCB2ZWN0b3IsIHVzZSBub3JtYWxpemVTZWxmIGZ1bmN0aW9uLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6L+U5Zue5b2S5LiA5YyW5ZCO55qE5ZCR6YeP44CCPGJyLz5cclxuICAgICAqIDxici8+XHJcbiAgICAgKiDms6jmhI/vvIzlvZPliY3lkJHph4/kuI3lj5jvvIzlubbov5Tlm57kuIDkuKrmlrDnmoTlvZLkuIDljJblkJHph4/jgILlpoLmnpzkvaDmg7PmnaXlvZLkuIDljJblvZPliY3lkJHph4/vvIzlj6/kvb/nlKggbm9ybWFsaXplU2VsZiDlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBub3JtYWxpemUgKG91dD86IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQsIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQ0XHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtWZWMzfSBvdXRcclxuICAgICAqL1xyXG4gICAgdHJhbnNmb3JtTWF0NCAobTogTWF0NCwgb3V0PzogVmVjMyk6IFZlYzMge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMygpO1xyXG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIHRoaXMsIG0pO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlIGluIHgsIHksIGFuZCB6XHJcbiAgICAgKiBAbWV0aG9kIG1heEF4aXNcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIG1heEF4aXMgKCk6IG51bWJlciB7XHJcbiAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy54LCB0aGlzLnksIHRoaXMueik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhbmdsZSBpbiByYWRpYW4gYmV0d2VlbiB0aGlzIGFuZCB2ZWN0b3IuXHJcbiAgICAgKiAhI3poIOWkueinkueahOW8p+W6puOAglxyXG4gICAgICogQG1ldGhvZCBhbmdsZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gZnJvbSAwIHRvIE1hdGguUElcclxuICAgICAqL1xyXG4gICAgYW5nbGUgPSBWZWMyLnByb3RvdHlwZS5hbmdsZVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENhbGN1bGF0ZXMgdGhlIHByb2plY3Rpb24gb2YgdGhlIGN1cnJlbnQgdmVjdG9yIG92ZXIgdGhlIGdpdmVuIHZlY3Rvci5cclxuICAgICAqICEjemgg6L+U5Zue5b2T5YmN5ZCR6YeP5Zyo5oyH5a6aIHZlY3RvciDlkJHph4/kuIrnmoTmipXlvbHlkJHph4/jgIJcclxuICAgICAqIEBtZXRob2QgcHJvamVjdFxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzN9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHYxID0gY2MudjMoMjAsIDIwLCAyMCk7XHJcbiAgICAgKiB2YXIgdjIgPSBjYy52Myg1LCA1LCA1KTtcclxuICAgICAqIHYxLnByb2plY3QodjIpOyAvLyBWZWMzIHt4OiAyMCwgeTogMjAsIHo6IDIwfTtcclxuICAgICAqL1xyXG4gICAgcHJvamVjdCA9IFZlYzIucHJvdG90eXBlLnByb2plY3RcclxuICAgIC8vIENvbXBhdGlibGUgd2l0aCB0aGUgdmVjMiBBUElcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IGFuZ2xlIGluIHJhZGlhbiBiZXR3ZWVuIHRoaXMgYW5kIHZlY3RvciB3aXRoIGRpcmVjdGlvbi4gPGJyLz5cclxuICAgICAqIEluIG9yZGVyIHRvIGNvbXBhdGlibGUgd2l0aCB0aGUgdmVjMiBBUEkuXHJcbiAgICAgKiAhI3poIOW4puaWueWQkeeahOWkueinkueahOW8p+W6puOAguivpeaWueazleS7heeUqOWBmuWFvOWuuSAyRCDorqHnrpfjgIJcclxuICAgICAqIEBtZXRob2Qgc2lnbkFuZ2xlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzMgfCBWZWMyfSB2ZWN0b3JcclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gZnJvbSAtTWF0aFBJIHRvIE1hdGguUElcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKi9cclxuICAgIHNpZ25BbmdsZSAodmVjdG9yKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDgsICd2ZWMzLnNpZ25BbmdsZScsICd2Mi4xJywgJ2NjLnYyKHNlbGZWZWN0b3IpLnNpZ25BbmdsZSh2ZWN0b3IpJyk7XHJcbiAgICAgICAgbGV0IHZlYzEgPSBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgbGV0IHZlYzIgPSBuZXcgVmVjMih2ZWN0b3IueCwgdmVjdG9yLnkpO1xyXG4gICAgICAgIHJldHVybiB2ZWMxLnNpZ25BbmdsZSh2ZWMyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gcm90YXRlLiBJbiBvcmRlciB0byBjb21wYXRpYmxlIHdpdGggdGhlIHZlYzIgQVBJLlxyXG4gICAgICogISN6aCDov5Tlm57ml4vovaznu5nlrprlvKfluqblkI7nmoTmlrDlkJHph4/jgILor6Xmlrnms5Xku4XnlKjlgZrlhbzlrrkgMkQg6K6h566X44CCXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMyIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMyIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjMiB8IFZlYzN9IGlmIHRoZSAnb3V0JyB2YWx1ZSBpcyBhIHZlYzMgeW91IHdpbGwgZ2V0IGEgVmVjMyByZXR1cm4uXHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICByb3RhdGUgKHJhZGlhbnMsIG91dCkge1xyXG4gICAgICAgIGNjLndhcm5JRCgxNDA4LCAndmVjMy5yb3RhdGUnLCAndjIuMScsICdjYy52MihzZWxmVmVjdG9yKS5yb3RhdGUocmFkaWFucywgb3V0KScpO1xyXG4gICAgICAgIHJldHVybiBWZWMyLnByb3RvdHlwZS5yb3RhdGUuY2FsbCh0aGlzLCByYWRpYW5zLCBvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiByb3RhdGUgc2VsZi4gSW4gb3JkZXIgdG8gY29tcGF0aWJsZSB3aXRoIHRoZSB2ZWMyIEFQSS5cclxuICAgICAqICEjemgg5oyJ5oyH5a6a5byn5bqm5peL6L2s5ZCR6YeP44CC6K+l5pa55rOV5LuF55So5YGa5YW85a65IDJEIOiuoeeul+OAglxyXG4gICAgICogQG1ldGhvZCByb3RhdGVTZWxmXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkaWFuc1xyXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICByb3RhdGVTZWxmIChyYWRpYW5zKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDgsICd2ZWMzLnJvdGF0ZVNlbGYnLCAndjIuMScsICdjYy52MihzZWxmVmVjdG9yKS5yb3RhdGVTZWxmKHJhZGlhbnMpJyk7XHJcbiAgICAgICAgcmV0dXJuIFZlYzIucHJvdG90eXBlLnJvdGF0ZVNlbGYuY2FsbCh0aGlzLCByYWRpYW5zKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgdjNfMSA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IHYzXzIgPSBuZXcgVmVjMygpO1xyXG5cclxuQ0NDbGFzcy5mYXN0RGVmaW5lKCdjYy5WZWMzJywgVmVjMywgeyB4OiAwLCB5OiAwLCB6OiAwIH0pO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgY29udmVuaWVuY2UgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyB7eyNjcm9zc0xpbmsgXCJWZWMzXCJ9fWNjLlZlYzN7ey9jcm9zc0xpbmt9fS5cclxuICogISN6aCDpgJrov4for6XnroDkvr/nmoTlh73mlbDov5vooYzliJvlu7oge3sjY3Jvc3NMaW5rIFwiVmVjM1wifX1jYy5WZWMze3svY3Jvc3NMaW5rfX0g5a+56LGh44CCXHJcbiAqIEBtZXRob2QgdjNcclxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBbeD0wXVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFt6PTBdXHJcbiAqIEByZXR1cm4ge1ZlYzN9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciB2MSA9IGNjLnYzKCk7XHJcbiAqIHZhciB2MiA9IGNjLnYzKDAsIDAsIDApO1xyXG4gKiB2YXIgdjMgPSBjYy52Myh2Mik7XHJcbiAqIHZhciB2NCA9IGNjLnYzKHt4OiAxMDAsIHk6IDEwMCwgejogMH0pO1xyXG4gKi9cclxuY2MudjMgPSBmdW5jdGlvbiB2MyAoeCwgeSwgeikge1xyXG4gICAgcmV0dXJuIG5ldyBWZWMzKHgsIHksIHopO1xyXG59O1xyXG5cclxuY2MuVmVjMyA9IFZlYzM7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9