
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/mat4.js';
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

var _vec = _interopRequireDefault(require("./vec3"));

var _quat = _interopRequireDefault(require("./quat"));

var _utils = require("./utils");

var _mat = _interopRequireDefault(require("./mat3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _a00 = 0;
var _a01 = 0;
var _a02 = 0;
var _a03 = 0;
var _a10 = 0;
var _a11 = 0;
var _a12 = 0;
var _a13 = 0;
var _a20 = 0;
var _a21 = 0;
var _a22 = 0;
var _a23 = 0;
var _a30 = 0;
var _a31 = 0;
var _a32 = 0;
var _a33 = 0;
/**
 * !#en Representation of 4*4 matrix.
 * !#zh 表示 4*4 矩阵
 *
 * @class Mat4
 * @extends ValueType
 */

var Mat4 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Mat4, _ValueType);

  var _proto = Mat4.prototype;

  /**
   * !#en Multiply the current matrix with another one
   * !#zh 将当前矩阵与指定矩阵相乘
   * @method mul
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  _proto.mul = function mul(m, out) {
    return Mat4.multiply(out || new Mat4(), this, m);
  }
  /**
   * !#en Multiply each element of the matrix by a scalar.
   * !#zh 将矩阵的每一个元素都乘以指定的缩放值。
   * @method mulScalar
   * @param {Number} number amount to scale the matrix's elements by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.mulScalar = function mulScalar(num, out) {
    Mat4.multiplyScalar(out || new Mat4(), this, num);
  }
  /**
   * !#en Subtracts the current matrix with another one
   * !#zh 将当前矩阵与指定的矩阵相减
   * @method sub
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.sub = function sub(m, out) {
    Mat4.subtract(out || new Mat4(), this, m);
  }
  /**
   * Identity  of Mat4
   * @property {Mat4} IDENTITY
   * @static
   */
  ;

  /**
   * !#zh 获得指定矩阵的拷贝
   * !#en Copy of the specified matrix to obtain
   * @method clone
   * @typescript
   * clone<Out extends IMat4Like> (a: Out): Mat4
   * @static
   */
  Mat4.clone = function clone(a) {
    var m = a.m;
    return new Mat4(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]);
  }
  /**
   * !#zh 复制目标矩阵
   * !#en Copy the target matrix
   * @method copy
   * @typescript
   * copy<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.copy = function copy(out, a) {
    var m = out.m,
        am = a.m;
    m[0] = am[0];
    m[1] = am[1];
    m[2] = am[2];
    m[3] = am[3];
    m[4] = am[4];
    m[5] = am[5];
    m[6] = am[6];
    m[7] = am[7];
    m[8] = am[8];
    m[9] = am[9];
    m[10] = am[10];
    m[11] = am[11];
    m[12] = am[12];
    m[13] = am[13];
    m[14] = am[14];
    m[15] = am[15];
    return out;
  }
  /**
   * !#zh 设置矩阵值
   * !#en Setting matrix values
   * @static
   */
  ;

  Mat4.set = function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var m = out.m;
    m[0] = m00;
    m[1] = m01;
    m[2] = m02;
    m[3] = m03;
    m[4] = m10;
    m[5] = m11;
    m[6] = m12;
    m[7] = m13;
    m[8] = m20;
    m[9] = m21;
    m[10] = m22;
    m[11] = m23;
    m[12] = m30;
    m[13] = m31;
    m[14] = m32;
    m[15] = m33;
    return out;
  }
  /**
   * !#zh 将目标赋值为单位矩阵
   * !#en The target of an assignment is the identity matrix
   * @method identity
   * @typescript
   * identity<Out extends IMat4Like> (out: Out): Out
   * @static
   */
  ;

  Mat4.identity = function identity(out) {
    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 转置矩阵
   * !#en Transposed matrix
   * @method transpose
   * @typescript
   * transpose<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.transpose = function transpose(out, a) {
    var m = out.m,
        am = a.m; // If we are transposing ourselves we can skip a few steps but have to cache some values

    if (out === a) {
      var a01 = am[1],
          a02 = am[2],
          a03 = am[3],
          a12 = am[6],
          a13 = am[7],
          a23 = am[11];
      m[1] = am[4];
      m[2] = am[8];
      m[3] = am[12];
      m[4] = a01;
      m[6] = am[9];
      m[7] = am[13];
      m[8] = a02;
      m[9] = a12;
      m[11] = am[14];
      m[12] = a03;
      m[13] = a13;
      m[14] = a23;
    } else {
      m[0] = am[0];
      m[1] = am[4];
      m[2] = am[8];
      m[3] = am[12];
      m[4] = am[1];
      m[5] = am[5];
      m[6] = am[9];
      m[7] = am[13];
      m[8] = am[2];
      m[9] = am[6];
      m[10] = am[10];
      m[11] = am[14];
      m[12] = am[3];
      m[13] = am[7];
      m[14] = am[11];
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 矩阵求逆
   * !#en Matrix inversion
   * @method invert
   * @typescript
   * invert<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.invert = function invert(out, a) {
    var am = a.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11];
    _a30 = am[12];
    _a31 = am[13];
    _a32 = am[14];
    _a33 = am[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (det === 0) {
      return null;
    }

    det = 1.0 / det;
    var m = out.m;
    m[0] = (_a11 * b11 - _a12 * b10 + _a13 * b09) * det;
    m[1] = (_a02 * b10 - _a01 * b11 - _a03 * b09) * det;
    m[2] = (_a31 * b05 - _a32 * b04 + _a33 * b03) * det;
    m[3] = (_a22 * b04 - _a21 * b05 - _a23 * b03) * det;
    m[4] = (_a12 * b08 - _a10 * b11 - _a13 * b07) * det;
    m[5] = (_a00 * b11 - _a02 * b08 + _a03 * b07) * det;
    m[6] = (_a32 * b02 - _a30 * b05 - _a33 * b01) * det;
    m[7] = (_a20 * b05 - _a22 * b02 + _a23 * b01) * det;
    m[8] = (_a10 * b10 - _a11 * b08 + _a13 * b06) * det;
    m[9] = (_a01 * b08 - _a00 * b10 - _a03 * b06) * det;
    m[10] = (_a30 * b04 - _a31 * b02 + _a33 * b00) * det;
    m[11] = (_a21 * b02 - _a20 * b04 - _a23 * b00) * det;
    m[12] = (_a11 * b07 - _a10 * b09 - _a12 * b06) * det;
    m[13] = (_a00 * b09 - _a01 * b07 + _a02 * b06) * det;
    m[14] = (_a31 * b01 - _a30 * b03 - _a32 * b00) * det;
    m[15] = (_a20 * b03 - _a21 * b01 + _a22 * b00) * det;
    return out;
  }
  /**
   * !#zh 矩阵行列式
   * !#en Matrix determinant
   * @method determinant
   * @typescript
   * determinant<Out extends IMat4Like> (a: Out): number
   * @static
   */
  ;

  Mat4.determinant = function determinant(a) {
    var m = a.m;
    _a00 = m[0];
    _a01 = m[1];
    _a02 = m[2];
    _a03 = m[3];
    _a10 = m[4];
    _a11 = m[5];
    _a12 = m[6];
    _a13 = m[7];
    _a20 = m[8];
    _a21 = m[9];
    _a22 = m[10];
    _a23 = m[11];
    _a30 = m[12];
    _a31 = m[13];
    _a32 = m[14];
    _a33 = m[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  /**
   * !#zh 矩阵乘法
   * !#en Matrix Multiplication
   * @method multiply
   * @typescript
   * multiply<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.multiply = function multiply(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11];
    _a30 = am[12];
    _a31 = am[13];
    _a32 = am[14];
    _a33 = am[15]; // Cache only the current line of the second matrix

    var b0 = bm[0],
        b1 = bm[1],
        b2 = bm[2],
        b3 = bm[3];
    m[0] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[1] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[2] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[3] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[4];
    b1 = bm[5];
    b2 = bm[6];
    b3 = bm[7];
    m[4] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[5] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[6] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[7] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[8];
    b1 = bm[9];
    b2 = bm[10];
    b3 = bm[11];
    m[8] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[9] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[10] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[11] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[12];
    b1 = bm[13];
    b2 = bm[14];
    b3 = bm[15];
    m[12] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[13] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[14] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[15] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入变换
   * !#en Was added in a given transformation matrix transformation on the basis of
   * @method transform
   * @typescript
   * transform<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.transform = function transform(out, a, v) {
    var x = v.x,
        y = v.y,
        z = v.z;
    var m = out.m,
        am = a.m;

    if (a === out) {
      m[12] = am[0] * x + am[4] * y + am[8] * z + am[12];
      m[13] = am[1] * x + am[5] * y + am[9] * z + am[13];
      m[14] = am[2] * x + am[6] * y + am[10] * z + am[14];
      m[15] = am[3] * x + am[7] * y + am[11] * z + am[15];
    } else {
      _a00 = am[0];
      _a01 = am[1];
      _a02 = am[2];
      _a03 = am[3];
      _a10 = am[4];
      _a11 = am[5];
      _a12 = am[6];
      _a13 = am[7];
      _a20 = am[8];
      _a21 = am[9];
      _a22 = am[10];
      _a23 = am[11];
      _a30 = am[12];
      _a31 = am[13];
      _a32 = am[14];
      _a33 = am[15];
      m[0] = _a00;
      m[1] = _a01;
      m[2] = _a02;
      m[3] = _a03;
      m[4] = _a10;
      m[5] = _a11;
      m[6] = _a12;
      m[7] = _a13;
      m[8] = _a20;
      m[9] = _a21;
      m[10] = _a22;
      m[11] = _a23;
      m[12] = _a00 * x + _a10 * y + _a20 * z + am[12];
      m[13] = _a01 * x + _a11 * y + _a21 * z + am[13];
      m[14] = _a02 * x + _a12 * y + _a22 * z + am[14];
      m[15] = _a03 * x + _a13 * y + _a23 * z + am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新位移变换
   * !#en Add new displacement transducer in a matrix transformation on the basis of a given
   * @method translate
   * @typescript
   * translate<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.translate = function translate(out, a, v) {
    var m = out.m,
        am = a.m;

    if (a === out) {
      m[12] += v.x;
      m[13] += v.y;
      m[14] += v.z;
    } else {
      m[0] = am[0];
      m[1] = am[1];
      m[2] = am[2];
      m[3] = am[3];
      m[4] = am[4];
      m[5] = am[5];
      m[6] = am[6];
      m[7] = am[7];
      m[8] = am[8];
      m[9] = am[9];
      m[10] = am[10];
      m[11] = am[11];
      m[12] += v.x;
      m[13] += v.y;
      m[14] += v.z;
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新缩放变换
   * !#en Add new scaling transformation in a given matrix transformation on the basis of
   * @method scale
   * @typescript
   * scale<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.scale = function scale(out, a, v) {
    var x = v.x,
        y = v.y,
        z = v.z;
    var m = out.m,
        am = a.m;
    m[0] = am[0] * x;
    m[1] = am[1] * x;
    m[2] = am[2] * x;
    m[3] = am[3] * x;
    m[4] = am[4] * y;
    m[5] = am[5] * y;
    m[6] = am[6] * y;
    m[7] = am[7] * y;
    m[8] = am[8] * z;
    m[9] = am[9] * z;
    m[10] = am[10] * z;
    m[11] = am[11] * z;
    m[12] = am[12];
    m[13] = am[13];
    m[14] = am[14];
    m[15] = am[15];
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新旋转变换
   * !#en Add a new rotational transform matrix transformation on the basis of a given
   * @method rotate
   * @typescript
   * rotate<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, rad: number, axis: VecLike): Out
   * @param rad 旋转角度
   * @param axis 旋转轴
   * @static
   */
  ;

  Mat4.rotate = function rotate(out, a, rad, axis) {
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var len = Math.sqrt(x * x + y * y + z * z);

    if (Math.abs(len) < _utils.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var t = 1 - c;
    var am = a.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11]; // Construct the elements of the rotation matrix

    var b00 = x * x * t + c,
        b01 = y * x * t + z * s,
        b02 = z * x * t - y * s;
    var b10 = x * y * t - z * s,
        b11 = y * y * t + c,
        b12 = z * y * t + x * s;
    var b20 = x * z * t + y * s,
        b21 = y * z * t - x * s,
        b22 = z * z * t + c;
    var m = out.m; // Perform rotation-specific matrix multiplication

    m[0] = _a00 * b00 + _a10 * b01 + _a20 * b02;
    m[1] = _a01 * b00 + _a11 * b01 + _a21 * b02;
    m[2] = _a02 * b00 + _a12 * b01 + _a22 * b02;
    m[3] = _a03 * b00 + _a13 * b01 + _a23 * b02;
    m[4] = _a00 * b10 + _a10 * b11 + _a20 * b12;
    m[5] = _a01 * b10 + _a11 * b11 + _a21 * b12;
    m[6] = _a02 * b10 + _a12 * b11 + _a22 * b12;
    m[7] = _a03 * b10 + _a13 * b11 + _a23 * b12;
    m[8] = _a00 * b20 + _a10 * b21 + _a20 * b22;
    m[9] = _a01 * b20 + _a11 * b21 + _a21 * b22;
    m[10] = _a02 * b20 + _a12 * b21 + _a22 * b22;
    m[11] = _a03 * b20 + _a13 * b21 + _a23 * b22; // If the source and destination differ, copy the unchanged last row

    if (a !== out) {
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 X 轴的旋转变换
   * !#en Add rotational transformation around the X axis at a given matrix transformation on the basis of
   * @method rotateX
   * @typescript
   * rotateX<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateX = function rotateX(out, a, rad) {
    var m = out.m,
        am = a.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = am[4],
        a11 = am[5],
        a12 = am[6],
        a13 = am[7],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      m[0] = am[0];
      m[1] = am[1];
      m[2] = am[2];
      m[3] = am[3];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[4] = a10 * c + a20 * s;
    m[5] = a11 * c + a21 * s;
    m[6] = a12 * c + a22 * s;
    m[7] = a13 * c + a23 * s;
    m[8] = a20 * c - a10 * s;
    m[9] = a21 * c - a11 * s;
    m[10] = a22 * c - a12 * s;
    m[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 Y 轴的旋转变换
   * !#en Add about the Y axis rotation transformation in a given matrix transformation on the basis of
   * @method rotateY
   * @typescript
   * rotateY<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateY = function rotateY(out, a, rad) {
    var m = out.m,
        am = a.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a03 = am[3],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      m[4] = am[4];
      m[5] = am[5];
      m[6] = am[6];
      m[7] = am[7];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[0] = a00 * c - a20 * s;
    m[1] = a01 * c - a21 * s;
    m[2] = a02 * c - a22 * s;
    m[3] = a03 * c - a23 * s;
    m[8] = a00 * s + a20 * c;
    m[9] = a01 * s + a21 * c;
    m[10] = a02 * s + a22 * c;
    m[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 Z 轴的旋转变换
   * !#en Added about the Z axis at a given rotational transformation matrix transformation on the basis of
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateZ = function rotateZ(out, a, rad) {
    var am = a.m;
    var m = out.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a.m[0],
        a01 = a.m[1],
        a02 = a.m[2],
        a03 = a.m[3],
        a10 = a.m[4],
        a11 = a.m[5],
        a12 = a.m[6],
        a13 = a.m[7]; // If the source and destination differ, copy the unchanged last row

    if (a !== out) {
      m[8] = am[8];
      m[9] = am[9];
      m[10] = am[10];
      m[11] = am[11];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[0] = a00 * c + a10 * s;
    m[1] = a01 * c + a11 * s;
    m[2] = a02 * c + a12 * s;
    m[3] = a03 * c + a13 * s;
    m[4] = a10 * c - a00 * s;
    m[5] = a11 * c - a01 * s;
    m[6] = a12 * c - a02 * s;
    m[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * !#zh 计算位移矩阵
   * !#en Displacement matrix calculation
   * @method fromTranslation
   * @typescript
   * fromTranslation<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromTranslation = function fromTranslation(out, v) {
    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算缩放矩阵
   * !#en Scaling matrix calculation
   * @method fromScaling
   * @typescript
   * fromScaling<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromScaling = function fromScaling(out, v) {
    var m = out.m;
    m[0] = v.x;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = v.y;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = v.z;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算旋转矩阵
   * !#en Calculates the rotation matrix
   * @method fromRotation
   * @typescript
   * fromRotation<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, rad: number, axis: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRotation = function fromRotation(out, rad, axis) {
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var len = Math.sqrt(x * x + y * y + z * z);

    if (Math.abs(len) < _utils.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var t = 1 - c; // Perform rotation-specific matrix multiplication

    var m = out.m;
    m[0] = x * x * t + c;
    m[1] = y * x * t + z * s;
    m[2] = z * x * t - y * s;
    m[3] = 0;
    m[4] = x * y * t - z * s;
    m[5] = y * y * t + c;
    m[6] = z * y * t + x * s;
    m[7] = 0;
    m[8] = x * z * t + y * s;
    m[9] = y * z * t - x * s;
    m[10] = z * z * t + c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 X 轴的旋转矩阵
   * !#en Calculating rotation matrix about the X axis
   * @method fromXRotation
   * @typescript
   * fromXRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromXRotation = function fromXRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = c;
    m[6] = s;
    m[7] = 0;
    m[8] = 0;
    m[9] = -s;
    m[10] = c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 Y 轴的旋转矩阵
   * !#en Calculating rotation matrix about the Y axis
   * @method fromYRotation
   * @typescript
   * fromYRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromYRotation = function fromYRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = c;
    m[1] = 0;
    m[2] = -s;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = s;
    m[9] = 0;
    m[10] = c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 Z 轴的旋转矩阵
   * !#en Calculating rotation matrix about the Z axis
   * @method fromZRotation
   * @typescript
   * fromZRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromZRotation = function fromZRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = c;
    m[1] = s;
    m[2] = 0;
    m[3] = 0;
    m[4] = -s;
    m[5] = c;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据旋转和位移信息计算矩阵
   * !#en The rotation and displacement information calculating matrix
   * @method fromRT
   * @typescript
   * fromRT<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRT = function fromRT(out, q, v) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var m = out.m;
    m[0] = 1 - (yy + zz);
    m[1] = xy + wz;
    m[2] = xz - wy;
    m[3] = 0;
    m[4] = xy - wz;
    m[5] = 1 - (xx + zz);
    m[6] = yz + wx;
    m[7] = 0;
    m[8] = xz + wy;
    m[9] = yz - wx;
    m[10] = 1 - (xx + yy);
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 提取矩阵的位移信息, 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Extracting displacement information of the matrix, the matrix transform to the default sequential application S-> R-> T is
   * @method getTranslation
   * @typescript
   * getTranslation<Out extends IMat4Like, VecLike extends IVec3Like> (out: VecLike, mat: Out): VecLike
   * @static
   */
  ;

  Mat4.getTranslation = function getTranslation(out, mat) {
    var m = mat.m;
    out.x = m[12];
    out.y = m[13];
    out.z = m[14];
    return out;
  }
  /**
   * !#zh 提取矩阵的缩放信息, 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Scaling information extraction matrix, the matrix transform to the default sequential application S-> R-> T is
   * @method getScaling
   * @typescript
   * getScaling<Out extends IMat4Like, VecLike extends IVec3Like> (out: VecLike, mat: Out): VecLike
   * @static
   */
  ;

  Mat4.getScaling = function getScaling(out, mat) {
    var m = mat.m;
    var m3 = m3_1.m;
    var m00 = m3[0] = m[0];
    var m01 = m3[1] = m[1];
    var m02 = m3[2] = m[2];
    var m04 = m3[3] = m[4];
    var m05 = m3[4] = m[5];
    var m06 = m3[5] = m[6];
    var m08 = m3[6] = m[8];
    var m09 = m3[7] = m[9];
    var m10 = m3[8] = m[10];
    out.x = Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
    out.y = Math.sqrt(m04 * m04 + m05 * m05 + m06 * m06);
    out.z = Math.sqrt(m08 * m08 + m09 * m09 + m10 * m10); // account for refections

    if (_mat["default"].determinant(m3_1) < 0) {
      out.x *= -1;
    }

    return out;
  }
  /**
   * !#zh 提取矩阵的旋转信息, 默认输入矩阵不含有缩放信息，如考虑缩放应使用 `toRTS` 函数。
   * !#en Rotation information extraction matrix, the matrix containing no default input scaling information, such as the use of `toRTS` should consider the scaling function.
   * @method getRotation
   * @typescript
   * getRotation<Out extends IMat4Like> (out: Quat, mat: Out): Quat
   * @static
   */
  ;

  Mat4.getRotation = function getRotation(out, mat) {
    var m = mat.m;
    var trace = m[0] + m[5] + m[10];
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out.w = 0.25 * S;
      out.x = (m[6] - m[9]) / S;
      out.y = (m[8] - m[2]) / S;
      out.z = (m[1] - m[4]) / S;
    } else if (m[0] > m[5] && m[0] > m[10]) {
      S = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 2;
      out.w = (m[6] - m[9]) / S;
      out.x = 0.25 * S;
      out.y = (m[1] + m[4]) / S;
      out.z = (m[8] + m[2]) / S;
    } else if (m[5] > m[10]) {
      S = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 2;
      out.w = (m[8] - m[2]) / S;
      out.x = (m[1] + m[4]) / S;
      out.y = 0.25 * S;
      out.z = (m[6] + m[9]) / S;
    } else {
      S = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 2;
      out.w = (m[1] - m[4]) / S;
      out.x = (m[8] + m[2]) / S;
      out.y = (m[6] + m[9]) / S;
      out.z = 0.25 * S;
    }

    return out;
  }
  /**
   * !#zh 提取旋转、位移、缩放信息， 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Extracting rotational displacement, zoom information, the default matrix transformation in order S-> R-> T applications
   * @method toRTS
   * @typescript
   * toRTS<Out extends IMat4Like, VecLike extends IVec3Like> (mat: Out, q: Quat, v: VecLike, s: VecLike): void
   * @static
   */
  ;

  Mat4.toRTS = function toRTS(mat, q, v, s) {
    var m = mat.m;
    var m3 = m3_1.m;
    s.x = _vec["default"].set(v3_1, m[0], m[1], m[2]).mag();
    m3[0] = m[0] / s.x;
    m3[1] = m[1] / s.x;
    m3[2] = m[2] / s.x;
    s.y = _vec["default"].set(v3_1, m[4], m[5], m[6]).mag();
    m3[3] = m[4] / s.y;
    m3[4] = m[5] / s.y;
    m3[5] = m[6] / s.y;
    s.z = _vec["default"].set(v3_1, m[8], m[9], m[10]).mag();
    m3[6] = m[8] / s.z;
    m3[7] = m[9] / s.z;
    m3[8] = m[10] / s.z;

    var det = _mat["default"].determinant(m3_1);

    if (det < 0) {
      s.x *= -1;
      m3[0] *= -1;
      m3[1] *= -1;
      m3[2] *= -1;
    }

    _quat["default"].fromMat3(q, m3_1); // already normalized


    _vec["default"].set(v, m[12], m[13], m[14]);
  }
  /**
   * !#zh 根据旋转、位移、缩放信息计算矩阵，以 S->R->T 的顺序应用
   * !#en The rotary displacement, the scaling matrix calculation information, the order S-> R-> T applications
   * @method fromRTS
   * @typescript
   * fromRTS<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRTS = function fromRTS(out, q, v, s) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s.x;
    var sy = s.y;
    var sz = s.z;
    var m = out.m;
    m[0] = (1 - (yy + zz)) * sx;
    m[1] = (xy + wz) * sx;
    m[2] = (xz - wy) * sx;
    m[3] = 0;
    m[4] = (xy - wz) * sy;
    m[5] = (1 - (xx + zz)) * sy;
    m[6] = (yz + wx) * sy;
    m[7] = 0;
    m[8] = (xz + wy) * sz;
    m[9] = (yz - wx) * sz;
    m[10] = (1 - (xx + yy)) * sz;
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的旋转、位移、缩放及变换中心信息计算矩阵，以 S->R->T 的顺序应用
   * !#en According to the specified rotation, displacement, and scale conversion matrix calculation information center, order S-> R-> T applications
   * @method fromRTSOrigin
   * @typescript
   * fromRTSOrigin<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike, s: VecLike, o: VecLike): Out
   * @param q 旋转值
   * @param v 位移值
   * @param s 缩放值
   * @param o 指定变换中心
   * @static
   */
  ;

  Mat4.fromRTSOrigin = function fromRTSOrigin(out, q, v, s, o) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s.x;
    var sy = s.y;
    var sz = s.z;
    var ox = o.x;
    var oy = o.y;
    var oz = o.z;
    var m = out.m;
    m[0] = (1 - (yy + zz)) * sx;
    m[1] = (xy + wz) * sx;
    m[2] = (xz - wy) * sx;
    m[3] = 0;
    m[4] = (xy - wz) * sy;
    m[5] = (1 - (xx + zz)) * sy;
    m[6] = (yz + wx) * sy;
    m[7] = 0;
    m[8] = (xz + wy) * sz;
    m[9] = (yz - wx) * sz;
    m[10] = (1 - (xx + yy)) * sz;
    m[11] = 0;
    m[12] = v.x + ox - (m[0] * ox + m[4] * oy + m[8] * oz);
    m[13] = v.y + oy - (m[1] * ox + m[5] * oy + m[9] * oz);
    m[14] = v.z + oz - (m[2] * ox + m[6] * oy + m[10] * oz);
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的旋转信息计算矩阵
   * !#en The rotation matrix calculation information specified
   * @method fromQuat
   * @typescript
   * fromQuat<Out extends IMat4Like> (out: Out, q: Quat): Out
   * @static
   */
  ;

  Mat4.fromQuat = function fromQuat(out, q) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var m = out.m;
    m[0] = 1 - yy - zz;
    m[1] = yx + wz;
    m[2] = zx - wy;
    m[3] = 0;
    m[4] = yx - wz;
    m[5] = 1 - xx - zz;
    m[6] = zy + wx;
    m[7] = 0;
    m[8] = zx + wy;
    m[9] = zy - wx;
    m[10] = 1 - xx - yy;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的视锥体信息计算矩阵
   * !#en The matrix calculation information specified frustum
   * @method frustum
   * @typescript
   * frustum<Out extends IMat4Like> (out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out
   * @param left 左平面距离
   * @param right 右平面距离
   * @param bottom 下平面距离
   * @param top 上平面距离
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.frustum = function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = near * 2 * rl;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = near * 2 * tb;
    m[6] = 0;
    m[7] = 0;
    m[8] = (right + left) * rl;
    m[9] = (top + bottom) * tb;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = far * near * 2 * nf;
    m[15] = 0;
    return out;
  }
  /**
   * !#zh 计算透视投影矩阵
   * !#en Perspective projection matrix calculation
   * @method perspective
   * @typescript
   * perspective<Out extends IMat4Like> (out: Out, fovy: number, aspect: number, near: number, far: number): Out
   * @param fovy 纵向视角高度
   * @param aspect 长宽比
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.perspective = function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = f / aspect;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = f;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = 2 * far * near * nf;
    m[15] = 0;
    return out;
  }
  /**
   * !#zh 计算正交投影矩阵
   * !#en Computing orthogonal projection matrix
   * @method ortho
   * @typescript
   * ortho<Out extends IMat4Like> (out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out
   * @param left 左平面距离
   * @param right 右平面距离
   * @param bottom 下平面距离
   * @param top 上平面距离
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.ortho = function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = -2 * lr;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = -2 * bt;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 2 * nf;
    m[11] = 0;
    m[12] = (left + right) * lr;
    m[13] = (top + bottom) * bt;
    m[14] = (far + near) * nf;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据视点计算矩阵，注意 `eye - center` 不能为零向量或与 `up` 向量平行
   * !#en `Up` parallel vector or vector center` not be zero - the matrix calculation according to the viewpoint, note` eye
   * @method lookAt
   * @typescript
   * lookAt<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, eye: VecLike, center: VecLike, up: VecLike): Out
   * @param eye 当前位置
   * @param center 目标视点
   * @param up 视口上方向
   * @static
   */
  ;

  Mat4.lookAt = function lookAt(out, eye, center, up) {
    var eyex = eye.x;
    var eyey = eye.y;
    var eyez = eye.z;
    var upx = up.x;
    var upy = up.y;
    var upz = up.z;
    var centerx = center.x;
    var centery = center.y;
    var centerz = center.z;
    var z0 = eyex - centerx;
    var z1 = eyey - centery;
    var z2 = eyez - centerz;
    var len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    var x0 = upy * z2 - upz * z1;
    var x1 = upz * z0 - upx * z2;
    var x2 = upx * z1 - upy * z0;
    len = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    x0 *= len;
    x1 *= len;
    x2 *= len;
    var y0 = z1 * x2 - z2 * x1;
    var y1 = z2 * x0 - z0 * x2;
    var y2 = z0 * x1 - z1 * x0;
    var m = out.m;
    m[0] = x0;
    m[1] = y0;
    m[2] = z0;
    m[3] = 0;
    m[4] = x1;
    m[5] = y1;
    m[6] = z1;
    m[7] = 0;
    m[8] = x2;
    m[9] = y2;
    m[10] = z2;
    m[11] = 0;
    m[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    m[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    m[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算逆转置矩阵
   * !#en Reversal matrix calculation
   * @method inverseTranspose
   * @typescript
   * inverseTranspose<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.inverseTranspose = function inverseTranspose(out, a) {
    var m = a.m;
    _a00 = m[0];
    _a01 = m[1];
    _a02 = m[2];
    _a03 = m[3];
    _a10 = m[4];
    _a11 = m[5];
    _a12 = m[6];
    _a13 = m[7];
    _a20 = m[8];
    _a21 = m[9];
    _a22 = m[10];
    _a23 = m[11];
    _a30 = m[12];
    _a31 = m[13];
    _a32 = m[14];
    _a33 = m[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    m = out.m;
    m[0] = (_a11 * b11 - _a12 * b10 + _a13 * b09) * det;
    m[1] = (_a12 * b08 - _a10 * b11 - _a13 * b07) * det;
    m[2] = (_a10 * b10 - _a11 * b08 + _a13 * b06) * det;
    m[3] = 0;
    m[4] = (_a02 * b10 - _a01 * b11 - _a03 * b09) * det;
    m[5] = (_a00 * b11 - _a02 * b08 + _a03 * b07) * det;
    m[6] = (_a01 * b08 - _a00 * b10 - _a03 * b06) * det;
    m[7] = 0;
    m[8] = (_a31 * b05 - _a32 * b04 + _a33 * b03) * det;
    m[9] = (_a32 * b02 - _a30 * b05 - _a33 * b01) * det;
    m[10] = (_a30 * b04 - _a31 * b02 + _a33 * b00) * det;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 逐元素矩阵加法
   * !#en Element by element matrix addition
   * @method add
   * @typescript
   * add<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.add = function add(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] + bm[0];
    m[1] = am[1] + bm[1];
    m[2] = am[2] + bm[2];
    m[3] = am[3] + bm[3];
    m[4] = am[4] + bm[4];
    m[5] = am[5] + bm[5];
    m[6] = am[6] + bm[6];
    m[7] = am[7] + bm[7];
    m[8] = am[8] + bm[8];
    m[9] = am[9] + bm[9];
    m[10] = am[10] + bm[10];
    m[11] = am[11] + bm[11];
    m[12] = am[12] + bm[12];
    m[13] = am[13] + bm[13];
    m[14] = am[14] + bm[14];
    m[15] = am[15] + bm[15];
    return out;
  }
  /**
   * !#zh 逐元素矩阵减法
   * !#en Matrix element by element subtraction
   * @method subtract
   * @typescript
   * subtract<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.subtract = function subtract(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] - bm[0];
    m[1] = am[1] - bm[1];
    m[2] = am[2] - bm[2];
    m[3] = am[3] - bm[3];
    m[4] = am[4] - bm[4];
    m[5] = am[5] - bm[5];
    m[6] = am[6] - bm[6];
    m[7] = am[7] - bm[7];
    m[8] = am[8] - bm[8];
    m[9] = am[9] - bm[9];
    m[10] = am[10] - bm[10];
    m[11] = am[11] - bm[11];
    m[12] = am[12] - bm[12];
    m[13] = am[13] - bm[13];
    m[14] = am[14] - bm[14];
    m[15] = am[15] - bm[15];
    return out;
  }
  /**
   * !#zh 矩阵标量乘法
   * !#en Matrix scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IMat4Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Mat4.multiplyScalar = function multiplyScalar(out, a, b) {
    var m = out.m,
        am = a.m;
    m[0] = am[0] * b;
    m[1] = am[1] * b;
    m[2] = am[2] * b;
    m[3] = am[3] * b;
    m[4] = am[4] * b;
    m[5] = am[5] * b;
    m[6] = am[6] * b;
    m[7] = am[7] * b;
    m[8] = am[8] * b;
    m[9] = am[9] * b;
    m[10] = am[10] * b;
    m[11] = am[11] * b;
    m[12] = am[12] * b;
    m[13] = am[13] * b;
    m[14] = am[14] * b;
    m[15] = am[15] * b;
    return out;
  }
  /**
   * !#zh 逐元素矩阵标量乘加: A + B * scale
   * !#en Elements of the matrix by the scalar multiplication and addition: A + B * scale
   * @method multiplyScalarAndAdd
   * @typescript
   * multiplyScalarAndAdd<Out extends IMat4Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Mat4.multiplyScalarAndAdd = function multiplyScalarAndAdd(out, a, b, scale) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] + bm[0] * scale;
    m[1] = am[1] + bm[1] * scale;
    m[2] = am[2] + bm[2] * scale;
    m[3] = am[3] + bm[3] * scale;
    m[4] = am[4] + bm[4] * scale;
    m[5] = am[5] + bm[5] * scale;
    m[6] = am[6] + bm[6] * scale;
    m[7] = am[7] + bm[7] * scale;
    m[8] = am[8] + bm[8] * scale;
    m[9] = am[9] + bm[9] * scale;
    m[10] = am[10] + bm[10] * scale;
    m[11] = am[11] + bm[11] * scale;
    m[12] = am[12] + bm[12] * scale;
    m[13] = am[13] + bm[13] * scale;
    m[14] = am[14] + bm[14] * scale;
    m[15] = am[15] + bm[15] * scale;
    return out;
  }
  /**
   * !#zh 矩阵等价判断
   * !#en Analyzing the equivalent matrix
   * @method strictEquals
   * @return {bool}
   * @typescript
   * strictEquals<Out extends IMat4Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Mat4.strictEquals = function strictEquals(a, b) {
    var am = a.m,
        bm = b.m;
    return am[0] === bm[0] && am[1] === bm[1] && am[2] === bm[2] && am[3] === bm[3] && am[4] === bm[4] && am[5] === bm[5] && am[6] === bm[6] && am[7] === bm[7] && am[8] === bm[8] && am[9] === bm[9] && am[10] === bm[10] && am[11] === bm[11] && am[12] === bm[12] && am[13] === bm[13] && am[14] === bm[14] && am[15] === bm[15];
  }
  /**
   * !#zh 排除浮点数误差的矩阵近似等价判断
   * !#en Negative floating point error is approximately equivalent to determining a matrix
   * @method equals
   * @typescript
   * equals<Out extends IMat4Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Mat4.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    var am = a.m,
        bm = b.m;
    return Math.abs(am[0] - bm[0]) <= epsilon * Math.max(1.0, Math.abs(am[0]), Math.abs(bm[0])) && Math.abs(am[1] - bm[1]) <= epsilon * Math.max(1.0, Math.abs(am[1]), Math.abs(bm[1])) && Math.abs(am[2] - bm[2]) <= epsilon * Math.max(1.0, Math.abs(am[2]), Math.abs(bm[2])) && Math.abs(am[3] - bm[3]) <= epsilon * Math.max(1.0, Math.abs(am[3]), Math.abs(bm[3])) && Math.abs(am[4] - bm[4]) <= epsilon * Math.max(1.0, Math.abs(am[4]), Math.abs(bm[4])) && Math.abs(am[5] - bm[5]) <= epsilon * Math.max(1.0, Math.abs(am[5]), Math.abs(bm[5])) && Math.abs(am[6] - bm[6]) <= epsilon * Math.max(1.0, Math.abs(am[6]), Math.abs(bm[6])) && Math.abs(am[7] - bm[7]) <= epsilon * Math.max(1.0, Math.abs(am[7]), Math.abs(bm[7])) && Math.abs(am[8] - bm[8]) <= epsilon * Math.max(1.0, Math.abs(am[8]), Math.abs(bm[8])) && Math.abs(am[9] - bm[9]) <= epsilon * Math.max(1.0, Math.abs(am[9]), Math.abs(bm[9])) && Math.abs(am[10] - bm[10]) <= epsilon * Math.max(1.0, Math.abs(am[10]), Math.abs(bm[10])) && Math.abs(am[11] - bm[11]) <= epsilon * Math.max(1.0, Math.abs(am[11]), Math.abs(bm[11])) && Math.abs(am[12] - bm[12]) <= epsilon * Math.max(1.0, Math.abs(am[12]), Math.abs(bm[12])) && Math.abs(am[13] - bm[13]) <= epsilon * Math.max(1.0, Math.abs(am[13]), Math.abs(bm[13])) && Math.abs(am[14] - bm[14]) <= epsilon * Math.max(1.0, Math.abs(am[14]), Math.abs(bm[14])) && Math.abs(am[15] - bm[15]) <= epsilon * Math.max(1.0, Math.abs(am[15]), Math.abs(bm[15]));
  }
  /**
   * Calculates the adjugate of a matrix.
   *
   * @param {Mat4} out - Matrix to store result.
   * @param {Mat4} a - Matrix to calculate.
   * @returns {Mat4} out.
   */
  ;

  Mat4.adjoint = function adjoint(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a03 = am[3],
        a10 = am[4],
        a11 = am[5],
        a12 = am[6],
        a13 = am[7],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11],
        a30 = am[12],
        a31 = am[13],
        a32 = am[14],
        a33 = am[15];
    outm[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    outm[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    outm[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    outm[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    outm[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    outm[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    outm[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    outm[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    outm[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    outm[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    outm[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    outm[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    outm[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    outm[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    outm[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    outm[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  /**
   * !#zh 矩阵转数组
   * !#en Matrix transpose array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, mat: IMat4Like, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Mat4.toArray = function toArray(out, mat, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = mat.m;

    for (var i = 0; i < 16; i++) {
      out[ofs + i] = m[i];
    }

    return out;
  }
  /**
   * !#zh 数组转矩阵
   * !#en Transfer matrix array
   * @method fromArray
   * @typescript
   * fromArray <Out extends IMat4Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Mat4.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = out.m;

    for (var i = 0; i < 16; i++) {
      m[i] = arr[ofs + i];
    }

    return out;
  }
  /**
   * !#en Matrix Data
   * !#zh 矩阵数据
   * @property {Float64Array | Float32Array} m
   */
  ;

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/mat4:method"}}cc.mat4{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/mat4:method"}}cc.mat4{{/crossLink}}
   * @method constructor
   * @typescript
   * constructor ( m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number)
   */
  function Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var _this;

    if (m00 === void 0) {
      m00 = 1;
    }

    if (m01 === void 0) {
      m01 = 0;
    }

    if (m02 === void 0) {
      m02 = 0;
    }

    if (m03 === void 0) {
      m03 = 0;
    }

    if (m10 === void 0) {
      m10 = 0;
    }

    if (m11 === void 0) {
      m11 = 1;
    }

    if (m12 === void 0) {
      m12 = 0;
    }

    if (m13 === void 0) {
      m13 = 0;
    }

    if (m20 === void 0) {
      m20 = 0;
    }

    if (m21 === void 0) {
      m21 = 0;
    }

    if (m22 === void 0) {
      m22 = 1;
    }

    if (m23 === void 0) {
      m23 = 0;
    }

    if (m30 === void 0) {
      m30 = 0;
    }

    if (m31 === void 0) {
      m31 = 0;
    }

    if (m32 === void 0) {
      m32 = 0;
    }

    if (m33 === void 0) {
      m33 = 1;
    }

    _this = _ValueType.call(this) || this;
    _this.m = void 0;

    if (m00 instanceof _utils.FLOAT_ARRAY_TYPE) {
      _this.m = m00;
    } else {
      _this.m = new _utils.FLOAT_ARRAY_TYPE(16);
      var tm = _this.m;
      tm[0] = m00;
      tm[1] = m01;
      tm[2] = m02;
      tm[3] = m03;
      tm[4] = m10;
      tm[5] = m11;
      tm[6] = m12;
      tm[7] = m13;
      tm[8] = m20;
      tm[9] = m21;
      tm[10] = m22;
      tm[11] = m23;
      tm[12] = m30;
      tm[13] = m31;
      tm[14] = m32;
      tm[15] = m33;
    }

    return _this;
  }
  /**
   * !#en clone a Mat4 object
   * !#zh 克隆一个 Mat4 对象
   * @method clone
   * @return {Mat4}
   */


  _proto.clone = function clone() {
    var t = this;
    var tm = t.m;
    return new Mat4(tm[0], tm[1], tm[2], tm[3], tm[4], tm[5], tm[6], tm[7], tm[8], tm[9], tm[10], tm[11], tm[12], tm[13], tm[14], tm[15]);
  }
  /**
   * !#en Sets the matrix with another one's value
   * !#zh 用另一个矩阵设置这个矩阵的值。
   * @method set
   * @param {Mat4} srcObj
   * @return {Mat4} returns this
   * @chainable
   */
  ;

  _proto.set = function set(s) {
    var t = this;
    var tm = t.m,
        sm = s.m;
    tm[0] = sm[0];
    tm[1] = sm[1];
    tm[2] = sm[2];
    tm[3] = sm[3];
    tm[4] = sm[4];
    tm[5] = sm[5];
    tm[6] = sm[6];
    tm[7] = sm[7];
    tm[8] = sm[8];
    tm[9] = sm[9];
    tm[10] = sm[10];
    tm[11] = sm[11];
    tm[12] = sm[12];
    tm[13] = sm[13];
    tm[14] = sm[14];
    tm[15] = sm[15];
    return this;
  }
  /**
   * !#en Check whether two matrix equal
   * !#zh 当前的矩阵是否与指定的矩阵相等。
   * @method equals
   * @param {Mat4} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return Mat4.strictEquals(this, other);
  }
  /**
   * !#en Check whether two matrix equal with default degree of variance.
   * !#zh
   * 近似判断两个矩阵是否相等。<br/>
   * 判断 2 个矩阵是否在默认误差范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Mat4} other
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other) {
    return Mat4.equals(this, other);
  }
  /**
   * !#en Transform to string with matrix informations
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    var tm = this.m;

    if (tm) {
      return "[\n" + tm[0] + ", " + tm[1] + ", " + tm[2] + ", " + tm[3] + ",\n" + tm[4] + ", " + tm[5] + ", " + tm[6] + ", " + tm[7] + ",\n" + tm[8] + ", " + tm[9] + ", " + tm[10] + ", " + tm[11] + ",\n" + tm[12] + ", " + tm[13] + ", " + tm[14] + ", " + tm[15] + "\n" + "]";
    } else {
      return "[\n" + "1, 0, 0, 0\n" + "0, 1, 0, 0\n" + "0, 0, 1, 0\n" + "0, 0, 0, 1\n" + "]";
    }
  }
  /**
   * Set the matrix to the identity matrix
   * @method identity
   * @returns {Mat4} self
   * @chainable
   */
  ;

  _proto.identity = function identity() {
    return Mat4.identity(this);
  }
  /**
   * Transpose the values of a mat4
   * @method transpose
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.transpose = function transpose(out) {
    out = out || new Mat4();
    return Mat4.transpose(out, this);
  }
  /**
   * Inverts a mat4
   * @method invert
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.invert = function invert(out) {
    out = out || new Mat4();
    return Mat4.invert(out, this);
  }
  /**
   * Calculates the adjugate of a mat4
   * @method adjoint
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.adjoint = function adjoint(out) {
    out = out || new Mat4();
    return Mat4.adjoint(out, this);
  }
  /**
   * Calculates the determinant of a mat4
   * @method determinant
   * @returns {Number} determinant of a
   */
  ;

  _proto.determinant = function determinant() {
    return Mat4.determinant(this);
  }
  /**
   * Adds two Mat4
   * @method add
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.add = function add(other, out) {
    out = out || new Mat4();
    return Mat4.add(out, this, other);
  }
  /**
   * Subtracts the current matrix with another one
   * @method subtract
   * @param {Mat4} other the second operand
   * @returns {Mat4} this
   */
  ;

  _proto.subtract = function subtract(other) {
    return Mat4.subtract(this, this, other);
  }
  /**
   * Subtracts the current matrix with another one
   * @method multiply
   * @param {Mat4} other the second operand
   * @returns {Mat4} this
   */
  ;

  _proto.multiply = function multiply(other) {
    return Mat4.multiply(this, this, other);
  }
  /**
   * Multiply each element of the matrix by a scalar.
   * @method multiplyScalar
   * @param {Number} number amount to scale the matrix's elements by
   * @returns {Mat4} this
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(number) {
    return Mat4.multiplyScalar(this, this, number);
  }
  /**
   * Translate a mat4 by the given vector
   * @method translate
   * @param {Vec3} v vector to translate by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.translate = function translate(v, out) {
    out = out || new Mat4();
    return Mat4.translate(out, this, v);
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3
   * @method scale
   * @param {Vec3} v vector to scale by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.scale = function scale(v, out) {
    out = out || new Mat4();
    return Mat4.scale(out, this, v);
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   * @method rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {Vec3} axis the axis to rotate around
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.rotate = function rotate(rad, axis, out) {
    out = out || new Mat4();
    return Mat4.rotate(out, this, rad, axis);
  }
  /**
   * Returns the translation vector component of a transformation matrix.
   * @method getTranslation
   * @param  {Vec3} out Vector to receive translation component, if not provided, a new vec3 will be created
   * @return {Vec3} out
   */
  ;

  _proto.getTranslation = function getTranslation(out) {
    out = out || new _vec["default"]();
    return Mat4.getTranslation(out, this);
  }
  /**
   * Returns the scale factor component of a transformation matrix
   * @method getScale
   * @param  {Vec3} out Vector to receive scale component, if not provided, a new vec3 will be created
   * @return {Vec3} out
   */
  ;

  _proto.getScale = function getScale(out) {
    out = out || new _vec["default"]();
    return Mat4.getScaling(out, this);
  }
  /**
   * Returns the rotation factor component of a transformation matrix
   * @method getRotation
   * @param  {Quat} out Vector to receive rotation component, if not provided, a new quaternion object will be created
   * @return {Quat} out
   */
  ;

  _proto.getRotation = function getRotation(out) {
    out = out || new _quat["default"]();
    return Mat4.getRotation(out, this);
  }
  /**
   * Restore the matrix values from a quaternion rotation, vector translation and vector scale
   * @method fromRTS
   * @param {Quat} q Rotation quaternion
   * @param {Vec3} v Translation vector
   * @param {Vec3} s Scaling vector
   * @returns {Mat4} the current mat4 object
   * @chainable
   */
  ;

  _proto.fromRTS = function fromRTS(q, v, s) {
    return Mat4.fromRTS(this, q, v, s);
  }
  /**
   * Restore the matrix values from a quaternion rotation
   * @method fromQuat
   * @param {Quat} q Rotation quaternion
   * @returns {Mat4} the current mat4 object
   * @chainable
   */
  ;

  _proto.fromQuat = function fromQuat(quat) {
    return Mat4.fromQuat(this, quat);
  };

  return Mat4;
}(_valueType["default"]);

exports["default"] = Mat4;
Mat4.mul = Mat4.multiply;
Mat4.sub = Mat4.subtract;
Mat4.IDENTITY = Object.freeze(new Mat4());
var v3_1 = new _vec["default"]();
var m3_1 = new _mat["default"]();

_CCClass["default"].fastDefine('cc.Mat4', Mat4, {
  m00: 1,
  m01: 0,
  m02: 0,
  m03: 0,
  m04: 0,
  m05: 1,
  m06: 0,
  m07: 0,
  m08: 0,
  m09: 0,
  m10: 1,
  m11: 0,
  m12: 0,
  m13: 0,
  m14: 0,
  m15: 1
});

var _loop = function _loop(i) {
  Object.defineProperty(Mat4.prototype, 'm' + i, {
    get: function get() {
      return this.m[i];
    },
    set: function set(value) {
      this.m[i] = value;
    }
  });
};

for (var i = 0; i < 16; i++) {
  _loop(i);
}
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Mat4"}}cc.Mat4{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Mat4"}}cc.Mat4{{/crossLink}} 对象。
 * @method mat4
 * @param {Number} [m00] Component in column 0, row 0 position (index 0)
 * @param {Number} [m01] Component in column 0, row 1 position (index 1)
 * @param {Number} [m02] Component in column 0, row 2 position (index 2)
 * @param {Number} [m03] Component in column 0, row 3 position (index 3)
 * @param {Number} [m10] Component in column 1, row 0 position (index 4)
 * @param {Number} [m11] Component in column 1, row 1 position (index 5)
 * @param {Number} [m12] Component in column 1, row 2 position (index 6)
 * @param {Number} [m13] Component in column 1, row 3 position (index 7)
 * @param {Number} [m20] Component in column 2, row 0 position (index 8)
 * @param {Number} [m21] Component in column 2, row 1 position (index 9)
 * @param {Number} [m22] Component in column 2, row 2 position (index 10)
 * @param {Number} [m23] Component in column 2, row 3 position (index 11)
 * @param {Number} [m30] Component in column 3, row 0 position (index 12)
 * @param {Number} [m31] Component in column 3, row 1 position (index 13)
 * @param {Number} [m32] Component in column 3, row 2 position (index 14)
 * @param {Number} [m33] Component in column 3, row 3 position (index 15)
 * @return {Mat4}
 */


cc.mat4 = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var mat = new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);

  if (m00 === undefined) {
    Mat4.identity(mat);
  }

  return mat;
};

cc.Mat4 = Mat4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxtYXQ0LnRzIl0sIm5hbWVzIjpbIl9hMDAiLCJfYTAxIiwiX2EwMiIsIl9hMDMiLCJfYTEwIiwiX2ExMSIsIl9hMTIiLCJfYTEzIiwiX2EyMCIsIl9hMjEiLCJfYTIyIiwiX2EyMyIsIl9hMzAiLCJfYTMxIiwiX2EzMiIsIl9hMzMiLCJNYXQ0IiwibXVsIiwibSIsIm91dCIsIm11bHRpcGx5IiwibXVsU2NhbGFyIiwibnVtIiwibXVsdGlwbHlTY2FsYXIiLCJzdWIiLCJzdWJ0cmFjdCIsImNsb25lIiwiYSIsImNvcHkiLCJhbSIsInNldCIsIm0wMCIsIm0wMSIsIm0wMiIsIm0wMyIsIm0xMCIsIm0xMSIsIm0xMiIsIm0xMyIsIm0yMCIsIm0yMSIsIm0yMiIsIm0yMyIsIm0zMCIsIm0zMSIsIm0zMiIsIm0zMyIsImlkZW50aXR5IiwidHJhbnNwb3NlIiwiYTAxIiwiYTAyIiwiYTAzIiwiYTEyIiwiYTEzIiwiYTIzIiwiaW52ZXJ0IiwiYjAwIiwiYjAxIiwiYjAyIiwiYjAzIiwiYjA0IiwiYjA1IiwiYjA2IiwiYjA3IiwiYjA4IiwiYjA5IiwiYjEwIiwiYjExIiwiZGV0IiwiZGV0ZXJtaW5hbnQiLCJiIiwiYm0iLCJiMCIsImIxIiwiYjIiLCJiMyIsInRyYW5zZm9ybSIsInYiLCJ4IiwieSIsInoiLCJ0cmFuc2xhdGUiLCJzY2FsZSIsInJvdGF0ZSIsInJhZCIsImF4aXMiLCJsZW4iLCJNYXRoIiwic3FydCIsImFicyIsIkVQU0lMT04iLCJzIiwic2luIiwiYyIsImNvcyIsInQiLCJiMTIiLCJiMjAiLCJiMjEiLCJiMjIiLCJyb3RhdGVYIiwiYTEwIiwiYTExIiwiYTIwIiwiYTIxIiwiYTIyIiwicm90YXRlWSIsImEwMCIsInJvdGF0ZVoiLCJmcm9tVHJhbnNsYXRpb24iLCJmcm9tU2NhbGluZyIsImZyb21Sb3RhdGlvbiIsImZyb21YUm90YXRpb24iLCJmcm9tWVJvdGF0aW9uIiwiZnJvbVpSb3RhdGlvbiIsImZyb21SVCIsInEiLCJ3IiwieDIiLCJ5MiIsInoyIiwieHgiLCJ4eSIsInh6IiwieXkiLCJ5eiIsInp6Iiwid3giLCJ3eSIsInd6IiwiZ2V0VHJhbnNsYXRpb24iLCJtYXQiLCJnZXRTY2FsaW5nIiwibTMiLCJtM18xIiwibTA0IiwibTA1IiwibTA2IiwibTA4IiwibTA5IiwiTWF0MyIsImdldFJvdGF0aW9uIiwidHJhY2UiLCJTIiwidG9SVFMiLCJWZWMzIiwidjNfMSIsIm1hZyIsIlF1YXQiLCJmcm9tTWF0MyIsImZyb21SVFMiLCJzeCIsInN5Iiwic3oiLCJmcm9tUlRTT3JpZ2luIiwibyIsIm94Iiwib3kiLCJveiIsImZyb21RdWF0IiwieXgiLCJ6eCIsInp5IiwiZnJ1c3R1bSIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsInRvcCIsIm5lYXIiLCJmYXIiLCJybCIsInRiIiwibmYiLCJwZXJzcGVjdGl2ZSIsImZvdnkiLCJhc3BlY3QiLCJmIiwidGFuIiwib3J0aG8iLCJsciIsImJ0IiwibG9va0F0IiwiZXllIiwiY2VudGVyIiwidXAiLCJleWV4IiwiZXlleSIsImV5ZXoiLCJ1cHgiLCJ1cHkiLCJ1cHoiLCJjZW50ZXJ4IiwiY2VudGVyeSIsImNlbnRlcnoiLCJ6MCIsInoxIiwieDAiLCJ4MSIsInkwIiwieTEiLCJpbnZlcnNlVHJhbnNwb3NlIiwiYWRkIiwibXVsdGlwbHlTY2FsYXJBbmRBZGQiLCJzdHJpY3RFcXVhbHMiLCJlcXVhbHMiLCJlcHNpbG9uIiwibWF4IiwiYWRqb2ludCIsIm91dG0iLCJhMzAiLCJhMzEiLCJhMzIiLCJhMzMiLCJ0b0FycmF5Iiwib2ZzIiwiaSIsImZyb21BcnJheSIsImFyciIsIkZMT0FUX0FSUkFZX1RZUEUiLCJ0bSIsInNtIiwib3RoZXIiLCJmdXp6eUVxdWFscyIsInRvU3RyaW5nIiwibnVtYmVyIiwiZ2V0U2NhbGUiLCJxdWF0IiwiVmFsdWVUeXBlIiwiSURFTlRJVFkiLCJPYmplY3QiLCJmcmVlemUiLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsIm0wNyIsIm0xNCIsIm0xNSIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZ2V0IiwidmFsdWUiLCJjYyIsIm1hdDQiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQ2xFLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUNsRSxJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFDbEUsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNxQkM7Ozs7O0FBSWpCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDSUMsTUFBQSxhQUFLQyxDQUFMLEVBQWNDLEdBQWQsRUFBK0I7QUFDM0IsV0FBT0gsSUFBSSxDQUFDSSxRQUFMLENBQWNELEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQXJCLEVBQWlDLElBQWpDLEVBQXVDRSxDQUF2QyxDQUFQO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSUcsWUFBQSxtQkFBV0MsR0FBWCxF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Q0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBbkI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBbkI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBbkI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBbkI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBbkI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxF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SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FBckMsSUFDQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FEckMsSUFFQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FGckMsSUFHQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FIckMsSUFJQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FKckMsSUFLQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FMckMsSUFNQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FOckMsSUFPQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FQckMsSUFRQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FSckMsSUFTQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBbkIsS0FBMkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsQ0FBRCxDQUFYLENBQWQsRUFBK0IwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxDQUFELENBQVgsQ0FBL0IsQ0FUckMsSUFVQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBcEIsS0FBNkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsRUFBRCxDQUFYLENBQWQsRUFBZ0MwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxFQUFELENBQVgsQ0FBaEMsQ0FWdkMsSUFXQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBcEIsS0FBNkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsRUFBRCxDQUFYLENBQWQsRUFBZ0MwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxFQUFELENBQVgsQ0FBaEMsQ0FYdkMsSUFZQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBcEIsS0FBNkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsRUFBRCxDQUFYLENBQWQsRUFBZ0MwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxFQUFELENBQVgsQ0FBaEMsQ0FadkMsSUFhQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBcEIsS0FBNkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsRUFBRCxDQUFYLENBQWQsRUFBZ0MwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxFQUFELENBQVgsQ0FBaEMsQ0FidkMsSUFjQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFTMEMsRUFBRSxDQUFDLEVBQUQsQ0FBcEIsS0FBNkJzSSxPQUFPLEdBQUd0SCxJQUFJLENBQUN1SCxHQUFMLENBQVMsR0FBVCxFQUFjdkgsSUFBSSxDQUFDRSxHQUFMLENBQVM1RCxFQUFFLENBQUMsRUFBRCxDQUFYLENBQWQsRUFBZ0MwRCxJQUFJLENBQUNFLEdBQUwsQ0FBU2xCLEVBQUUsQ0FBQyxFQUFELENBQVgsQ0FBaEMsQ0FkdkMsSUFlQWdCLElBQUksQ0FBQ0UsR0FBTCxDQUFTNUQsRUFBRSxDQUFDLEVBQUQsQ0FBRixH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QUMsR0FBRyxFQUFwQixFQUF3QkEsQ0FBQyxFQUF6QixFQUE2QjtBQUFBLFFBQXBCQSxDQUFvQjtBQVM1QjtBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0F5QixFQUFFLENBQUNDLElBQUgsR0FBVSxVQUFVbE4sR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxHQUFwQixFQUF5QkMsR0FBekIsRUFBOEJDLEdBQTlCLEVBQW1DQyxHQUFuQyxFQUF3Q0MsR0FBeEMsRUFBNkNDLEdBQTdDLEVBQWtEQyxHQUFsRCxFQUF1REMsR0FBdkQsRUFBNERDLEdBQTVELEVBQWlFQyxHQUFqRSxFQUFzRUMsR0FBdEUsRUFBMkVDLEdBQTNFLEVBQWdGQyxHQUFoRixFQUFxRkMsR0FBckYsRUFBMEY7QUFDaEcsTUFBSXFGLEdBQUcsR0FBRyxJQUFJbkgsSUFBSixDQUFTZSxHQUFULEVBQWNDLEdBQWQsRUFBbUJDLEdBQW5CLEVBQXdCQyxHQUF4QixFQUE2QkMsR0FBN0IsRUFBa0NDLEdBQWxDLEVBQXVDQyxHQUF2QyxFQUE0Q0MsR0FBNUMsRUFBaURDLEdBQWpELEVBQXNEQyxHQUF0RCxFQUEyREMsR0FBM0QsRUFBZ0VDLEdBQWhFLEVBQXFFQyxHQUFyRSxFQUEwRUMsR0FBMUUsRUFBK0VDLEdBQS9FLEVBQW9GQyxHQUFwRixDQUFWOztBQUNBLE1BQUlmLEdBQUcsS0FBS21OLFNBQVosRUFBdUI7QUFDbkJsTyxJQUFBQSxJQUFJLENBQUMrQixRQUFMLENBQWNvRixHQUFkO0FBQ0g7O0FBQ0QsU0FBT0EsR0FBUDtBQUNILENBTkQ7O0FBUUE2RyxFQUFFLENBQUNoTyxJQUFILEdBQVVBLElBQVYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XHJcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xyXG5pbXBvcnQgVmVjMyBmcm9tICcuL3ZlYzMnO1xyXG5pbXBvcnQgUXVhdCBmcm9tICcuL3F1YXQnO1xyXG5pbXBvcnQgeyBFUFNJTE9OLCBGTE9BVF9BUlJBWV9UWVBFIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBNYXQzIGZyb20gJy4vbWF0Myc7XHJcblxyXG5sZXQgX2EwMDogbnVtYmVyID0gMDsgbGV0IF9hMDE6IG51bWJlciA9IDA7IGxldCBfYTAyOiBudW1iZXIgPSAwOyBsZXQgX2EwMzogbnVtYmVyID0gMDtcclxubGV0IF9hMTA6IG51bWJlciA9IDA7IGxldCBfYTExOiBudW1iZXIgPSAwOyBsZXQgX2ExMjogbnVtYmVyID0gMDsgbGV0IF9hMTM6IG51bWJlciA9IDA7XHJcbmxldCBfYTIwOiBudW1iZXIgPSAwOyBsZXQgX2EyMTogbnVtYmVyID0gMDsgbGV0IF9hMjI6IG51bWJlciA9IDA7IGxldCBfYTIzOiBudW1iZXIgPSAwO1xyXG5sZXQgX2EzMDogbnVtYmVyID0gMDsgbGV0IF9hMzE6IG51bWJlciA9IDA7IGxldCBfYTMyOiBudW1iZXIgPSAwOyBsZXQgX2EzMzogbnVtYmVyID0gMDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJlcHJlc2VudGF0aW9uIG9mIDQqNCBtYXRyaXguXHJcbiAqICEjemgg6KGo56S6IDQqNCDnn6npmLVcclxuICpcclxuICogQGNsYXNzIE1hdDRcclxuICogQGV4dGVuZHMgVmFsdWVUeXBlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXQ0IGV4dGVuZHMgVmFsdWVUeXBlIHtcclxuICAgIHN0YXRpYyBtdWwgPSBNYXQ0Lm11bHRpcGx5O1xyXG4gICAgc3RhdGljIHN1YiA9IE1hdDQuc3VidHJhY3Q7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGx5IHRoZSBjdXJyZW50IG1hdHJpeCB3aXRoIGFub3RoZXIgb25lXHJcbiAgICAgKiAhI3poIOWwhuW9k+WJjeefqemYteS4juaMh+WumuefqemYteebuOS5mFxyXG4gICAgICogQG1ldGhvZCBtdWxcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3RoZXIgdGhlIHNlY29uZCBvcGVyYW5kXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IFtvdXRdIHRoZSByZWNlaXZpbmcgbWF0cml4LCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgbWF0cml4IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyBtYXRyaXggd2lsbCBiZSBjcmVhdGVkXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gb3V0XHJcbiAgICAgKi9cclxuICAgIG11bCAobTogTWF0NCwgb3V0OiBNYXQ0KTogTWF0NCB7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQubXVsdGlwbHkob3V0IHx8IG5ldyBNYXQ0KCksIHRoaXMsIG0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxyXG4gICAgICogISN6aCDlsIbnn6npmLXnmoTmr4/kuIDkuKrlhYPntKDpg73kuZjku6XmjIflrprnmoTnvKnmlL7lgLzjgIJcclxuICAgICAqIEBtZXRob2QgbXVsU2NhbGFyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtYmVyIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgbXVsU2NhbGFyIChudW06IG51bWJlciwgb3V0OiBNYXQ0KSB7XHJcbiAgICAgICAgTWF0NC5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IE1hdDQoKSwgdGhpcywgbnVtKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdWJ0cmFjdHMgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcclxuICAgICAqICEjemgg5bCG5b2T5YmN55+p6Zi15LiO5oyH5a6a55qE55+p6Zi155u45YePXHJcbiAgICAgKiBAbWV0aG9kIHN1YlxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlciB0aGUgc2Vjb25kIG9wZXJhbmRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgc3ViIChtOiBNYXQ0LCBvdXQ6IE1hdDQpIHtcclxuICAgICAgICBNYXQ0LnN1YnRyYWN0KG91dCB8fCBuZXcgTWF0NCgpLCB0aGlzLCBtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElkZW50aXR5ICBvZiBNYXQ0XHJcbiAgICAgKiBAcHJvcGVydHkge01hdDR9IElERU5USVRZXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBJREVOVElUWSA9IE9iamVjdC5mcmVlemUobmV3IE1hdDQoKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiOt+W+l+aMh+WumuefqemYteeahOaLt+i0nVxyXG4gICAgICogISNlbiBDb3B5IG9mIHRoZSBzcGVjaWZpZWQgbWF0cml4IHRvIG9idGFpblxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGNsb25lPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCk6IE1hdDRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb25lPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCkge1xyXG4gICAgICAgIGxldCBtID0gYS5tO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0NChcclxuICAgICAgICAgICAgbVswXSwgbVsxXSwgbVsyXSwgbVszXSxcclxuICAgICAgICAgICAgbVs0XSwgbVs1XSwgbVs2XSwgbVs3XSxcclxuICAgICAgICAgICAgbVs4XSwgbVs5XSwgbVsxMF0sIG1bMTFdLFxyXG4gICAgICAgICAgICBtWzEyXSwgbVsxM10sIG1bMTRdLCBtWzE1XSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlpI3liLbnm67moIfnn6npmLVcclxuICAgICAqICEjZW4gQ29weSB0aGUgdGFyZ2V0IG1hdHJpeFxyXG4gICAgICogQG1ldGhvZCBjb3B5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29weTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb3B5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcclxuICAgICAgICBtWzBdID0gYW1bMF07XHJcbiAgICAgICAgbVsxXSA9IGFtWzFdO1xyXG4gICAgICAgIG1bMl0gPSBhbVsyXTtcclxuICAgICAgICBtWzNdID0gYW1bM107XHJcbiAgICAgICAgbVs0XSA9IGFtWzRdO1xyXG4gICAgICAgIG1bNV0gPSBhbVs1XTtcclxuICAgICAgICBtWzZdID0gYW1bNl07XHJcbiAgICAgICAgbVs3XSA9IGFtWzddO1xyXG4gICAgICAgIG1bOF0gPSBhbVs4XTtcclxuICAgICAgICBtWzldID0gYW1bOV07XHJcbiAgICAgICAgbVsxMF0gPSBhbVsxMF07XHJcbiAgICAgICAgbVsxMV0gPSBhbVsxMV07XHJcbiAgICAgICAgbVsxMl0gPSBhbVsxMl07XHJcbiAgICAgICAgbVsxM10gPSBhbVsxM107XHJcbiAgICAgICAgbVsxNF0gPSBhbVsxNF07XHJcbiAgICAgICAgbVsxNV0gPSBhbVsxNV07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6+572u55+p6Zi15YC8XHJcbiAgICAgKiAhI2VuIFNldHRpbmcgbWF0cml4IHZhbHVlc1xyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKFxyXG4gICAgICAgIG91dDogT3V0LFxyXG4gICAgICAgIG0wMDogbnVtYmVyLCBtMDE6IG51bWJlciwgbTAyOiBudW1iZXIsIG0wMzogbnVtYmVyLFxyXG4gICAgICAgIG0xMDogbnVtYmVyLCBtMTE6IG51bWJlciwgbTEyOiBudW1iZXIsIG0xMzogbnVtYmVyLFxyXG4gICAgICAgIG0yMDogbnVtYmVyLCBtMjE6IG51bWJlciwgbTIyOiBudW1iZXIsIG0yMzogbnVtYmVyLFxyXG4gICAgICAgIG0zMDogbnVtYmVyLCBtMzE6IG51bWJlciwgbTMyOiBudW1iZXIsIG0zMzogbnVtYmVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICBtWzBdID0gbTAwOyBtWzFdID0gbTAxOyBtWzJdID0gbTAyOyBtWzNdID0gbTAzO1xyXG4gICAgICAgIG1bNF0gPSBtMTA7IG1bNV0gPSBtMTE7IG1bNl0gPSBtMTI7IG1bN10gPSBtMTM7XHJcbiAgICAgICAgbVs4XSA9IG0yMDsgbVs5XSA9IG0yMTsgbVsxMF0gPSBtMjI7IG1bMTFdID0gbTIzO1xyXG4gICAgICAgIG1bMTJdID0gbTMwOyBtWzEzXSA9IG0zMTsgbVsxNF0gPSBtMzI7IG1bMTVdID0gbTMzO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWwhuebruagh+i1i+WAvOS4uuWNleS9jeefqemYtVxyXG4gICAgICogISNlbiBUaGUgdGFyZ2V0IG9mIGFuIGFzc2lnbm1lbnQgaXMgdGhlIGlkZW50aXR5IG1hdHJpeFxyXG4gICAgICogQG1ldGhvZCBpZGVudGl0eVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGlkZW50aXR5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpZGVudGl0eTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCkge1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IDE7XHJcbiAgICAgICAgbVsxXSA9IDA7XHJcbiAgICAgICAgbVsyXSA9IDA7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IDA7XHJcbiAgICAgICAgbVs1XSA9IDE7XHJcbiAgICAgICAgbVs2XSA9IDA7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IDA7XHJcbiAgICAgICAgbVs5XSA9IDA7XHJcbiAgICAgICAgbVsxMF0gPSAxO1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IDA7XHJcbiAgICAgICAgbVsxM10gPSAwO1xyXG4gICAgICAgIG1bMTRdID0gMDtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6L2s572u55+p6Zi1XHJcbiAgICAgKiAhI2VuIFRyYW5zcG9zZWQgbWF0cml4XHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zcG9zZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRyYW5zcG9zZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0cmFuc3Bvc2U8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tO1xyXG4gICAgICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcclxuICAgICAgICBpZiAob3V0ID09PSBhKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSwgYTAzID0gYW1bM10sIGExMiA9IGFtWzZdLCBhMTMgPSBhbVs3XSwgYTIzID0gYW1bMTFdO1xyXG4gICAgICAgICAgICBtWzFdID0gYW1bNF07XHJcbiAgICAgICAgICAgIG1bMl0gPSBhbVs4XTtcclxuICAgICAgICAgICAgbVszXSA9IGFtWzEyXTtcclxuICAgICAgICAgICAgbVs0XSA9IGEwMTtcclxuICAgICAgICAgICAgbVs2XSA9IGFtWzldO1xyXG4gICAgICAgICAgICBtWzddID0gYW1bMTNdO1xyXG4gICAgICAgICAgICBtWzhdID0gYTAyO1xyXG4gICAgICAgICAgICBtWzldID0gYTEyO1xyXG4gICAgICAgICAgICBtWzExXSA9IGFtWzE0XTtcclxuICAgICAgICAgICAgbVsxMl0gPSBhMDM7XHJcbiAgICAgICAgICAgIG1bMTNdID0gYTEzO1xyXG4gICAgICAgICAgICBtWzE0XSA9IGEyMztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtWzBdID0gYW1bMF07XHJcbiAgICAgICAgICAgIG1bMV0gPSBhbVs0XTtcclxuICAgICAgICAgICAgbVsyXSA9IGFtWzhdO1xyXG4gICAgICAgICAgICBtWzNdID0gYW1bMTJdO1xyXG4gICAgICAgICAgICBtWzRdID0gYW1bMV07XHJcbiAgICAgICAgICAgIG1bNV0gPSBhbVs1XTtcclxuICAgICAgICAgICAgbVs2XSA9IGFtWzldO1xyXG4gICAgICAgICAgICBtWzddID0gYW1bMTNdO1xyXG4gICAgICAgICAgICBtWzhdID0gYW1bMl07XHJcbiAgICAgICAgICAgIG1bOV0gPSBhbVs2XTtcclxuICAgICAgICAgICAgbVsxMF0gPSBhbVsxMF07XHJcbiAgICAgICAgICAgIG1bMTFdID0gYW1bMTRdO1xyXG4gICAgICAgICAgICBtWzEyXSA9IGFtWzNdO1xyXG4gICAgICAgICAgICBtWzEzXSA9IGFtWzddO1xyXG4gICAgICAgICAgICBtWzE0XSA9IGFtWzExXTtcclxuICAgICAgICAgICAgbVsxNV0gPSBhbVsxNV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOefqemYteaxgumAhlxyXG4gICAgICogISNlbiBNYXRyaXggaW52ZXJzaW9uXHJcbiAgICAgKiBAbWV0aG9kIGludmVydFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGludmVydDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnZlcnQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG4gICAgICAgIGxldCBhbSA9IGEubTtcclxuICAgICAgICBfYTAwID0gYW1bMF07IF9hMDEgPSBhbVsxXTsgX2EwMiA9IGFtWzJdOyBfYTAzID0gYW1bM107XHJcbiAgICAgICAgX2ExMCA9IGFtWzRdOyBfYTExID0gYW1bNV07IF9hMTIgPSBhbVs2XTsgX2ExMyA9IGFtWzddO1xyXG4gICAgICAgIF9hMjAgPSBhbVs4XTsgX2EyMSA9IGFtWzldOyBfYTIyID0gYW1bMTBdOyBfYTIzID0gYW1bMTFdO1xyXG4gICAgICAgIF9hMzAgPSBhbVsxMl07IF9hMzEgPSBhbVsxM107IF9hMzIgPSBhbVsxNF07IF9hMzMgPSBhbVsxNV07XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IF9hMDAgKiBfYTExIC0gX2EwMSAqIF9hMTA7XHJcbiAgICAgICAgY29uc3QgYjAxID0gX2EwMCAqIF9hMTIgLSBfYTAyICogX2ExMDtcclxuICAgICAgICBjb25zdCBiMDIgPSBfYTAwICogX2ExMyAtIF9hMDMgKiBfYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMyA9IF9hMDEgKiBfYTEyIC0gX2EwMiAqIF9hMTE7XHJcbiAgICAgICAgY29uc3QgYjA0ID0gX2EwMSAqIF9hMTMgLSBfYTAzICogX2ExMTtcclxuICAgICAgICBjb25zdCBiMDUgPSBfYTAyICogX2ExMyAtIF9hMDMgKiBfYTEyO1xyXG4gICAgICAgIGNvbnN0IGIwNiA9IF9hMjAgKiBfYTMxIC0gX2EyMSAqIF9hMzA7XHJcbiAgICAgICAgY29uc3QgYjA3ID0gX2EyMCAqIF9hMzIgLSBfYTIyICogX2EzMDtcclxuICAgICAgICBjb25zdCBiMDggPSBfYTIwICogX2EzMyAtIF9hMjMgKiBfYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOSA9IF9hMjEgKiBfYTMyIC0gX2EyMiAqIF9hMzE7XHJcbiAgICAgICAgY29uc3QgYjEwID0gX2EyMSAqIF9hMzMgLSBfYTIzICogX2EzMTtcclxuICAgICAgICBjb25zdCBiMTEgPSBfYTIyICogX2EzMyAtIF9hMjMgKiBfYTMyO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcclxuXHJcbiAgICAgICAgaWYgKGRldCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICBtWzBdID0gKF9hMTEgKiBiMTEgLSBfYTEyICogYjEwICsgX2ExMyAqIGIwOSkgKiBkZXQ7XHJcbiAgICAgICAgbVsxXSA9IChfYTAyICogYjEwIC0gX2EwMSAqIGIxMSAtIF9hMDMgKiBiMDkpICogZGV0O1xyXG4gICAgICAgIG1bMl0gPSAoX2EzMSAqIGIwNSAtIF9hMzIgKiBiMDQgKyBfYTMzICogYjAzKSAqIGRldDtcclxuICAgICAgICBtWzNdID0gKF9hMjIgKiBiMDQgLSBfYTIxICogYjA1IC0gX2EyMyAqIGIwMykgKiBkZXQ7XHJcbiAgICAgICAgbVs0XSA9IChfYTEyICogYjA4IC0gX2ExMCAqIGIxMSAtIF9hMTMgKiBiMDcpICogZGV0O1xyXG4gICAgICAgIG1bNV0gPSAoX2EwMCAqIGIxMSAtIF9hMDIgKiBiMDggKyBfYTAzICogYjA3KSAqIGRldDtcclxuICAgICAgICBtWzZdID0gKF9hMzIgKiBiMDIgLSBfYTMwICogYjA1IC0gX2EzMyAqIGIwMSkgKiBkZXQ7XHJcbiAgICAgICAgbVs3XSA9IChfYTIwICogYjA1IC0gX2EyMiAqIGIwMiArIF9hMjMgKiBiMDEpICogZGV0O1xyXG4gICAgICAgIG1bOF0gPSAoX2ExMCAqIGIxMCAtIF9hMTEgKiBiMDggKyBfYTEzICogYjA2KSAqIGRldDtcclxuICAgICAgICBtWzldID0gKF9hMDEgKiBiMDggLSBfYTAwICogYjEwIC0gX2EwMyAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgbVsxMF0gPSAoX2EzMCAqIGIwNCAtIF9hMzEgKiBiMDIgKyBfYTMzICogYjAwKSAqIGRldDtcclxuICAgICAgICBtWzExXSA9IChfYTIxICogYjAyIC0gX2EyMCAqIGIwNCAtIF9hMjMgKiBiMDApICogZGV0O1xyXG4gICAgICAgIG1bMTJdID0gKF9hMTEgKiBiMDcgLSBfYTEwICogYjA5IC0gX2ExMiAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgbVsxM10gPSAoX2EwMCAqIGIwOSAtIF9hMDEgKiBiMDcgKyBfYTAyICogYjA2KSAqIGRldDtcclxuICAgICAgICBtWzE0XSA9IChfYTMxICogYjAxIC0gX2EzMCAqIGIwMyAtIF9hMzIgKiBiMDApICogZGV0O1xyXG4gICAgICAgIG1bMTVdID0gKF9hMjAgKiBiMDMgLSBfYTIxICogYjAxICsgX2EyMiAqIGIwMCkgKiBkZXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOefqemYteihjOWIl+W8j1xyXG4gICAgICogISNlbiBNYXRyaXggZGV0ZXJtaW5hbnRcclxuICAgICAqIEBtZXRob2QgZGV0ZXJtaW5hbnRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBkZXRlcm1pbmFudDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChhOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRldGVybWluYW50PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG0gPSBhLm07XHJcbiAgICAgICAgX2EwMCA9IG1bMF07IF9hMDEgPSBtWzFdOyBfYTAyID0gbVsyXTsgX2EwMyA9IG1bM107XHJcbiAgICAgICAgX2ExMCA9IG1bNF07IF9hMTEgPSBtWzVdOyBfYTEyID0gbVs2XTsgX2ExMyA9IG1bN107XHJcbiAgICAgICAgX2EyMCA9IG1bOF07IF9hMjEgPSBtWzldOyBfYTIyID0gbVsxMF07IF9hMjMgPSBtWzExXTtcclxuICAgICAgICBfYTMwID0gbVsxMl07IF9hMzEgPSBtWzEzXTsgX2EzMiA9IG1bMTRdOyBfYTMzID0gbVsxNV07XHJcblxyXG4gICAgICAgIGNvbnN0IGIwMCA9IF9hMDAgKiBfYTExIC0gX2EwMSAqIF9hMTA7XHJcbiAgICAgICAgY29uc3QgYjAxID0gX2EwMCAqIF9hMTIgLSBfYTAyICogX2ExMDtcclxuICAgICAgICBjb25zdCBiMDIgPSBfYTAwICogX2ExMyAtIF9hMDMgKiBfYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMyA9IF9hMDEgKiBfYTEyIC0gX2EwMiAqIF9hMTE7XHJcbiAgICAgICAgY29uc3QgYjA0ID0gX2EwMSAqIF9hMTMgLSBfYTAzICogX2ExMTtcclxuICAgICAgICBjb25zdCBiMDUgPSBfYTAyICogX2ExMyAtIF9hMDMgKiBfYTEyO1xyXG4gICAgICAgIGNvbnN0IGIwNiA9IF9hMjAgKiBfYTMxIC0gX2EyMSAqIF9hMzA7XHJcbiAgICAgICAgY29uc3QgYjA3ID0gX2EyMCAqIF9hMzIgLSBfYTIyICogX2EzMDtcclxuICAgICAgICBjb25zdCBiMDggPSBfYTIwICogX2EzMyAtIF9hMjMgKiBfYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwOSA9IF9hMjEgKiBfYTMyIC0gX2EyMiAqIF9hMzE7XHJcbiAgICAgICAgY29uc3QgYjEwID0gX2EyMSAqIF9hMzMgLSBfYTIzICogX2EzMTtcclxuICAgICAgICBjb25zdCBiMTEgPSBfYTIyICogX2EzMyAtIF9hMjMgKiBfYTMyO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XHJcbiAgICAgICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg55+p6Zi15LmY5rOVXHJcbiAgICAgKiAhI2VuIE1hdHJpeCBNdWx0aXBsaWNhdGlvblxyXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG11bHRpcGx5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm0sIGJtID0gYi5tO1xyXG4gICAgICAgIF9hMDAgPSBhbVswXTsgX2EwMSA9IGFtWzFdOyBfYTAyID0gYW1bMl07IF9hMDMgPSBhbVszXTtcclxuICAgICAgICBfYTEwID0gYW1bNF07IF9hMTEgPSBhbVs1XTsgX2ExMiA9IGFtWzZdOyBfYTEzID0gYW1bN107XHJcbiAgICAgICAgX2EyMCA9IGFtWzhdOyBfYTIxID0gYW1bOV07IF9hMjIgPSBhbVsxMF07IF9hMjMgPSBhbVsxMV07XHJcbiAgICAgICAgX2EzMCA9IGFtWzEyXTsgX2EzMSA9IGFtWzEzXTsgX2EzMiA9IGFtWzE0XTsgX2EzMyA9IGFtWzE1XTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XHJcbiAgICAgICAgbGV0IGIwID0gYm1bMF0sIGIxID0gYm1bMV0sIGIyID0gYm1bMl0sIGIzID0gYm1bM107XHJcbiAgICAgICAgbVswXSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcclxuICAgICAgICBtWzFdID0gYjAgKiBfYTAxICsgYjEgKiBfYTExICsgYjIgKiBfYTIxICsgYjMgKiBfYTMxO1xyXG4gICAgICAgIG1bMl0gPSBiMCAqIF9hMDIgKyBiMSAqIF9hMTIgKyBiMiAqIF9hMjIgKyBiMyAqIF9hMzI7XHJcbiAgICAgICAgbVszXSA9IGIwICogX2EwMyArIGIxICogX2ExMyArIGIyICogX2EyMyArIGIzICogX2EzMztcclxuXHJcbiAgICAgICAgYjAgPSBibVs0XTsgYjEgPSBibVs1XTsgYjIgPSBibVs2XTsgYjMgPSBibVs3XTtcclxuICAgICAgICBtWzRdID0gYjAgKiBfYTAwICsgYjEgKiBfYTEwICsgYjIgKiBfYTIwICsgYjMgKiBfYTMwO1xyXG4gICAgICAgIG1bNV0gPSBiMCAqIF9hMDEgKyBiMSAqIF9hMTEgKyBiMiAqIF9hMjEgKyBiMyAqIF9hMzE7XHJcbiAgICAgICAgbVs2XSA9IGIwICogX2EwMiArIGIxICogX2ExMiArIGIyICogX2EyMiArIGIzICogX2EzMjtcclxuICAgICAgICBtWzddID0gYjAgKiBfYTAzICsgYjEgKiBfYTEzICsgYjIgKiBfYTIzICsgYjMgKiBfYTMzO1xyXG5cclxuICAgICAgICBiMCA9IGJtWzhdOyBiMSA9IGJtWzldOyBiMiA9IGJtWzEwXTsgYjMgPSBibVsxMV07XHJcbiAgICAgICAgbVs4XSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcclxuICAgICAgICBtWzldID0gYjAgKiBfYTAxICsgYjEgKiBfYTExICsgYjIgKiBfYTIxICsgYjMgKiBfYTMxO1xyXG4gICAgICAgIG1bMTBdID0gYjAgKiBfYTAyICsgYjEgKiBfYTEyICsgYjIgKiBfYTIyICsgYjMgKiBfYTMyO1xyXG4gICAgICAgIG1bMTFdID0gYjAgKiBfYTAzICsgYjEgKiBfYTEzICsgYjIgKiBfYTIzICsgYjMgKiBfYTMzO1xyXG5cclxuICAgICAgICBiMCA9IGJtWzEyXTsgYjEgPSBibVsxM107IGIyID0gYm1bMTRdOyBiMyA9IGJtWzE1XTtcclxuICAgICAgICBtWzEyXSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcclxuICAgICAgICBtWzEzXSA9IGIwICogX2EwMSArIGIxICogX2ExMSArIGIyICogX2EyMSArIGIzICogX2EzMTtcclxuICAgICAgICBtWzE0XSA9IGIwICogX2EwMiArIGIxICogX2ExMiArIGIyICogX2EyMiArIGIzICogX2EzMjtcclxuICAgICAgICBtWzE1XSA9IGIwICogX2EwMyArIGIxICogX2ExMyArIGIyICogX2EyMyArIGIzICogX2EzMztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXlj5jmjaJcclxuICAgICAqICEjZW4gV2FzIGFkZGVkIGluIGEgZ2l2ZW4gdHJhbnNmb3JtYXRpb24gbWF0cml4IHRyYW5zZm9ybWF0aW9uIG9uIHRoZSBiYXNpcyBvZlxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0cmFuc2Zvcm08T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgdjogVmVjTGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdHJhbnNmb3JtPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gdi54LCB5ID0gdi55LCB6ID0gdi56O1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tO1xyXG4gICAgICAgIGlmIChhID09PSBvdXQpIHtcclxuICAgICAgICAgICAgbVsxMl0gPSBhbVswXSAqIHggKyBhbVs0XSAqIHkgKyBhbVs4XSAqIHogKyBhbVsxMl07XHJcbiAgICAgICAgICAgIG1bMTNdID0gYW1bMV0gKiB4ICsgYW1bNV0gKiB5ICsgYW1bOV0gKiB6ICsgYW1bMTNdO1xyXG4gICAgICAgICAgICBtWzE0XSA9IGFtWzJdICogeCArIGFtWzZdICogeSArIGFtWzEwXSAqIHogKyBhbVsxNF07XHJcbiAgICAgICAgICAgIG1bMTVdID0gYW1bM10gKiB4ICsgYW1bN10gKiB5ICsgYW1bMTFdICogeiArIGFtWzE1XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfYTAwID0gYW1bMF07IF9hMDEgPSBhbVsxXTsgX2EwMiA9IGFtWzJdOyBfYTAzID0gYW1bM107XHJcbiAgICAgICAgICAgIF9hMTAgPSBhbVs0XTsgX2ExMSA9IGFtWzVdOyBfYTEyID0gYW1bNl07IF9hMTMgPSBhbVs3XTtcclxuICAgICAgICAgICAgX2EyMCA9IGFtWzhdOyBfYTIxID0gYW1bOV07IF9hMjIgPSBhbVsxMF07IF9hMjMgPSBhbVsxMV07XHJcbiAgICAgICAgICAgIF9hMzAgPSBhbVsxMl07IF9hMzEgPSBhbVsxM107IF9hMzIgPSBhbVsxNF07IF9hMzMgPSBhbVsxNV07XHJcblxyXG4gICAgICAgICAgICBtWzBdID0gX2EwMDsgbVsxXSA9IF9hMDE7IG1bMl0gPSBfYTAyOyBtWzNdID0gX2EwMztcclxuICAgICAgICAgICAgbVs0XSA9IF9hMTA7IG1bNV0gPSBfYTExOyBtWzZdID0gX2ExMjsgbVs3XSA9IF9hMTM7XHJcbiAgICAgICAgICAgIG1bOF0gPSBfYTIwOyBtWzldID0gX2EyMTsgbVsxMF0gPSBfYTIyOyBtWzExXSA9IF9hMjM7XHJcblxyXG4gICAgICAgICAgICBtWzEyXSA9IF9hMDAgKiB4ICsgX2ExMCAqIHkgKyBfYTIwICogeiArIGFtWzEyXTtcclxuICAgICAgICAgICAgbVsxM10gPSBfYTAxICogeCArIF9hMTEgKiB5ICsgX2EyMSAqIHogKyBhbVsxM107XHJcbiAgICAgICAgICAgIG1bMTRdID0gX2EwMiAqIHggKyBfYTEyICogeSArIF9hMjIgKiB6ICsgYW1bMTRdO1xyXG4gICAgICAgICAgICBtWzE1XSA9IF9hMDMgKiB4ICsgX2ExMyAqIHkgKyBfYTIzICogeiArIGFtWzE1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw5L2N56e75Y+Y5o2iXHJcbiAgICAgKiAhI2VuIEFkZCBuZXcgZGlzcGxhY2VtZW50IHRyYW5zZHVjZXIgaW4gYSBtYXRyaXggdHJhbnNmb3JtYXRpb24gb24gdGhlIGJhc2lzIG9mIGEgZ2l2ZW5cclxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdHJhbnNsYXRlPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zbGF0ZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKSB7XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm07XHJcbiAgICAgICAgaWYgKGEgPT09IG91dCkge1xyXG4gICAgICAgICAgICBtWzEyXSArPSB2Lng7XHJcbiAgICAgICAgICAgIG1bMTNdICs9IHYueTtcclxuICAgICAgICAgICAgbVsxNF0gKz0gdi56O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1bMF0gPSBhbVswXTsgbVsxXSA9IGFtWzFdOyBtWzJdID0gYW1bMl07IG1bM10gPSBhbVszXTtcclxuICAgICAgICAgICAgbVs0XSA9IGFtWzRdOyBtWzVdID0gYW1bNV07IG1bNl0gPSBhbVs2XTsgbVs3XSA9IGFtWzddO1xyXG4gICAgICAgICAgICBtWzhdID0gYW1bOF07IG1bOV0gPSBhbVs5XTsgbVsxMF0gPSBhbVsxMF07IG1bMTFdID0gYW1bMTFdO1xyXG4gICAgICAgICAgICBtWzEyXSArPSB2Lng7XHJcbiAgICAgICAgICAgIG1bMTNdICs9IHYueTtcclxuICAgICAgICAgICAgbVsxNF0gKz0gdi56O1xyXG4gICAgICAgICAgICBtWzE1XSA9IGFtWzE1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw57yp5pS+5Y+Y5o2iXHJcbiAgICAgKiAhI2VuIEFkZCBuZXcgc2NhbGluZyB0cmFuc2Zvcm1hdGlvbiBpbiBhIGdpdmVuIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcclxuICAgICAqIEBtZXRob2Qgc2NhbGVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzY2FsZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzY2FsZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHYueCwgeSA9IHYueSwgeiA9IHYuejtcclxuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcclxuICAgICAgICBtWzBdID0gYW1bMF0gKiB4O1xyXG4gICAgICAgIG1bMV0gPSBhbVsxXSAqIHg7XHJcbiAgICAgICAgbVsyXSA9IGFtWzJdICogeDtcclxuICAgICAgICBtWzNdID0gYW1bM10gKiB4O1xyXG4gICAgICAgIG1bNF0gPSBhbVs0XSAqIHk7XHJcbiAgICAgICAgbVs1XSA9IGFtWzVdICogeTtcclxuICAgICAgICBtWzZdID0gYW1bNl0gKiB5O1xyXG4gICAgICAgIG1bN10gPSBhbVs3XSAqIHk7XHJcbiAgICAgICAgbVs4XSA9IGFtWzhdICogejtcclxuICAgICAgICBtWzldID0gYW1bOV0gKiB6O1xyXG4gICAgICAgIG1bMTBdID0gYW1bMTBdICogejtcclxuICAgICAgICBtWzExXSA9IGFtWzExXSAqIHo7XHJcbiAgICAgICAgbVsxMl0gPSBhbVsxMl07XHJcbiAgICAgICAgbVsxM10gPSBhbVsxM107XHJcbiAgICAgICAgbVsxNF0gPSBhbVsxNF07XHJcbiAgICAgICAgbVsxNV0gPSBhbVsxNV07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw5peL6L2s5Y+Y5o2iXHJcbiAgICAgKiAhI2VuIEFkZCBhIG5ldyByb3RhdGlvbmFsIHRyYW5zZm9ybSBtYXRyaXggdHJhbnNmb3JtYXRpb24gb24gdGhlIGJhc2lzIG9mIGEgZ2l2ZW5cclxuICAgICAqIEBtZXRob2Qgcm90YXRlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcm90YXRlPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyLCBheGlzOiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOinkuW6plxyXG4gICAgICogQHBhcmFtIGF4aXMg5peL6L2s6L20XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByb3RhdGU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIsIGF4aXM6IFZlY0xpa2UpIHtcclxuICAgICAgICBsZXQgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcclxuXHJcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xyXG4gICAgICAgIHggKj0gbGVuO1xyXG4gICAgICAgIHkgKj0gbGVuO1xyXG4gICAgICAgIHogKj0gbGVuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCB0ID0gMSAtIGM7XHJcblxyXG4gICAgICAgIGxldCBhbSA9IGEubTtcclxuICAgICAgICBfYTAwID0gYW1bMF07IF9hMDEgPSBhbVsxXTsgX2EwMiA9IGFtWzJdOyBfYTAzID0gYW1bM107XHJcbiAgICAgICAgX2ExMCA9IGFtWzRdOyBfYTExID0gYW1bNV07IF9hMTIgPSBhbVs2XTsgX2ExMyA9IGFtWzddO1xyXG4gICAgICAgIF9hMjAgPSBhbVs4XTsgX2EyMSA9IGFtWzldOyBfYTIyID0gYW1bMTBdOyBfYTIzID0gYW1bMTFdO1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIGVsZW1lbnRzIG9mIHRoZSByb3RhdGlvbiBtYXRyaXhcclxuICAgICAgICBjb25zdCBiMDAgPSB4ICogeCAqIHQgKyBjLCBiMDEgPSB5ICogeCAqIHQgKyB6ICogcywgYjAyID0geiAqIHggKiB0IC0geSAqIHM7XHJcbiAgICAgICAgY29uc3QgYjEwID0geCAqIHkgKiB0IC0geiAqIHMsIGIxMSA9IHkgKiB5ICogdCArIGMsIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IHggKiB6ICogdCArIHkgKiBzLCBiMjEgPSB5ICogeiAqIHQgLSB4ICogcywgYjIyID0geiAqIHogKiB0ICsgYztcclxuXHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIG1bMF0gPSBfYTAwICogYjAwICsgX2ExMCAqIGIwMSArIF9hMjAgKiBiMDI7XHJcbiAgICAgICAgbVsxXSA9IF9hMDEgKiBiMDAgKyBfYTExICogYjAxICsgX2EyMSAqIGIwMjtcclxuICAgICAgICBtWzJdID0gX2EwMiAqIGIwMCArIF9hMTIgKiBiMDEgKyBfYTIyICogYjAyO1xyXG4gICAgICAgIG1bM10gPSBfYTAzICogYjAwICsgX2ExMyAqIGIwMSArIF9hMjMgKiBiMDI7XHJcbiAgICAgICAgbVs0XSA9IF9hMDAgKiBiMTAgKyBfYTEwICogYjExICsgX2EyMCAqIGIxMjtcclxuICAgICAgICBtWzVdID0gX2EwMSAqIGIxMCArIF9hMTEgKiBiMTEgKyBfYTIxICogYjEyO1xyXG4gICAgICAgIG1bNl0gPSBfYTAyICogYjEwICsgX2ExMiAqIGIxMSArIF9hMjIgKiBiMTI7XHJcbiAgICAgICAgbVs3XSA9IF9hMDMgKiBiMTAgKyBfYTEzICogYjExICsgX2EyMyAqIGIxMjtcclxuICAgICAgICBtWzhdID0gX2EwMCAqIGIyMCArIF9hMTAgKiBiMjEgKyBfYTIwICogYjIyO1xyXG4gICAgICAgIG1bOV0gPSBfYTAxICogYjIwICsgX2ExMSAqIGIyMSArIF9hMjEgKiBiMjI7XHJcbiAgICAgICAgbVsxMF0gPSBfYTAyICogYjIwICsgX2ExMiAqIGIyMSArIF9hMjIgKiBiMjI7XHJcbiAgICAgICAgbVsxMV0gPSBfYTAzICogYjIwICsgX2ExMyAqIGIyMSArIF9hMjMgKiBiMjI7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XHJcbiAgICAgICAgaWYgKGEgIT09IG91dCkge1xyXG4gICAgICAgICAgICBtWzEyXSA9IGFtWzEyXTtcclxuICAgICAgICAgICAgbVsxM10gPSBhbVsxM107XHJcbiAgICAgICAgICAgIG1bMTRdID0gYW1bMTRdO1xyXG4gICAgICAgICAgICBtWzE1XSA9IGFtWzE1XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBYIOi9tOeahOaXi+i9rOWPmOaNolxyXG4gICAgICogISNlbiBBZGQgcm90YXRpb25hbCB0cmFuc2Zvcm1hdGlvbiBhcm91bmQgdGhlIFggYXhpcyBhdCBhIGdpdmVuIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcclxuICAgICAqIEBtZXRob2Qgcm90YXRlWFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSByYWQg5peL6L2s6KeS5bqmXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByb3RhdGVYPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm07XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCksXHJcbiAgICAgICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxyXG4gICAgICAgICAgICBhMTAgPSBhbVs0XSxcclxuICAgICAgICAgICAgYTExID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGExMiA9IGFtWzZdLFxyXG4gICAgICAgICAgICBhMTMgPSBhbVs3XSxcclxuICAgICAgICAgICAgYTIwID0gYW1bOF0sXHJcbiAgICAgICAgICAgIGEyMSA9IGFtWzldLFxyXG4gICAgICAgICAgICBhMjIgPSBhbVsxMF0sXHJcbiAgICAgICAgICAgIGEyMyA9IGFtWzExXTtcclxuXHJcbiAgICAgICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXHJcbiAgICAgICAgICAgIG1bMF0gPSBhbVswXTtcclxuICAgICAgICAgICAgbVsxXSA9IGFtWzFdO1xyXG4gICAgICAgICAgICBtWzJdID0gYW1bMl07XHJcbiAgICAgICAgICAgIG1bM10gPSBhbVszXTtcclxuICAgICAgICAgICAgbVsxMl0gPSBhbVsxMl07XHJcbiAgICAgICAgICAgIG1bMTNdID0gYW1bMTNdO1xyXG4gICAgICAgICAgICBtWzE0XSA9IGFtWzE0XTtcclxuICAgICAgICAgICAgbVsxNV0gPSBhbVsxNV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgbVs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xyXG4gICAgICAgIG1bNV0gPSBhMTEgKiBjICsgYTIxICogcztcclxuICAgICAgICBtWzZdID0gYTEyICogYyArIGEyMiAqIHM7XHJcbiAgICAgICAgbVs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xyXG4gICAgICAgIG1bOF0gPSBhMjAgKiBjIC0gYTEwICogcztcclxuICAgICAgICBtWzldID0gYTIxICogYyAtIGExMSAqIHM7XHJcbiAgICAgICAgbVsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcclxuICAgICAgICBtWzExXSA9IGEyMyAqIGMgLSBhMTMgKiBzO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXnu5UgWSDovbTnmoTml4vovazlj5jmjaJcclxuICAgICAqICEjZW4gQWRkIGFib3V0IHRoZSBZIGF4aXMgcm90YXRpb24gdHJhbnNmb3JtYXRpb24gaW4gYSBnaXZlbiBtYXRyaXggdHJhbnNmb3JtYXRpb24gb24gdGhlIGJhc2lzIG9mXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByb3RhdGVZPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOinkuW6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tO1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpLFxyXG4gICAgICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcclxuICAgICAgICAgICAgYTAwID0gYW1bMF0sXHJcbiAgICAgICAgICAgIGEwMSA9IGFtWzFdLFxyXG4gICAgICAgICAgICBhMDIgPSBhbVsyXSxcclxuICAgICAgICAgICAgYTAzID0gYW1bM10sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzhdLFxyXG4gICAgICAgICAgICBhMjEgPSBhbVs5XSxcclxuICAgICAgICAgICAgYTIyID0gYW1bMTBdLFxyXG4gICAgICAgICAgICBhMjMgPSBhbVsxMV07XHJcblxyXG4gICAgICAgIGlmIChhICE9PSBvdXQpIHsgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xyXG4gICAgICAgICAgICBtWzRdID0gYW1bNF07XHJcbiAgICAgICAgICAgIG1bNV0gPSBhbVs1XTtcclxuICAgICAgICAgICAgbVs2XSA9IGFtWzZdO1xyXG4gICAgICAgICAgICBtWzddID0gYW1bN107XHJcbiAgICAgICAgICAgIG1bMTJdID0gYW1bMTJdO1xyXG4gICAgICAgICAgICBtWzEzXSA9IGFtWzEzXTtcclxuICAgICAgICAgICAgbVsxNF0gPSBhbVsxNF07XHJcbiAgICAgICAgICAgIG1bMTVdID0gYW1bMTVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIG1bMF0gPSBhMDAgKiBjIC0gYTIwICogcztcclxuICAgICAgICBtWzFdID0gYTAxICogYyAtIGEyMSAqIHM7XHJcbiAgICAgICAgbVsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xyXG4gICAgICAgIG1bM10gPSBhMDMgKiBjIC0gYTIzICogcztcclxuICAgICAgICBtWzhdID0gYTAwICogcyArIGEyMCAqIGM7XHJcbiAgICAgICAgbVs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xyXG4gICAgICAgIG1bMTBdID0gYTAyICogcyArIGEyMiAqIGM7XHJcbiAgICAgICAgbVsxMV0gPSBhMDMgKiBzICsgYTIzICogYztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl57uVIFog6L2055qE5peL6L2s5Y+Y5o2iXHJcbiAgICAgKiAhI2VuIEFkZGVkIGFib3V0IHRoZSBaIGF4aXMgYXQgYSBnaXZlbiByb3RhdGlvbmFsIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcclxuICAgICAqIEBtZXRob2Qgcm90YXRlWlxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSByYWQg5peL6L2s6KeS5bqmXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByb3RhdGVaPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYW0gPSBhLm07XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKSxcclxuICAgICAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXHJcbiAgICAgICAgICAgIGEwMCA9IGEubVswXSxcclxuICAgICAgICAgICAgYTAxID0gYS5tWzFdLFxyXG4gICAgICAgICAgICBhMDIgPSBhLm1bMl0sXHJcbiAgICAgICAgICAgIGEwMyA9IGEubVszXSxcclxuICAgICAgICAgICAgYTEwID0gYS5tWzRdLFxyXG4gICAgICAgICAgICBhMTEgPSBhLm1bNV0sXHJcbiAgICAgICAgICAgIGExMiA9IGEubVs2XSxcclxuICAgICAgICAgICAgYTEzID0gYS5tWzddO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xyXG4gICAgICAgIGlmIChhICE9PSBvdXQpIHtcclxuICAgICAgICAgICAgbVs4XSA9IGFtWzhdO1xyXG4gICAgICAgICAgICBtWzldID0gYW1bOV07XHJcbiAgICAgICAgICAgIG1bMTBdID0gYW1bMTBdO1xyXG4gICAgICAgICAgICBtWzExXSA9IGFtWzExXTtcclxuICAgICAgICAgICAgbVsxMl0gPSBhbVsxMl07XHJcbiAgICAgICAgICAgIG1bMTNdID0gYW1bMTNdO1xyXG4gICAgICAgICAgICBtWzE0XSA9IGFtWzE0XTtcclxuICAgICAgICAgICAgbVsxNV0gPSBhbVsxNV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgbVswXSA9IGEwMCAqIGMgKyBhMTAgKiBzO1xyXG4gICAgICAgIG1bMV0gPSBhMDEgKiBjICsgYTExICogcztcclxuICAgICAgICBtWzJdID0gYTAyICogYyArIGExMiAqIHM7XHJcbiAgICAgICAgbVszXSA9IGEwMyAqIGMgKyBhMTMgKiBzO1xyXG4gICAgICAgIG1bNF0gPSBhMTAgKiBjIC0gYTAwICogcztcclxuICAgICAgICBtWzVdID0gYTExICogYyAtIGEwMSAqIHM7XHJcbiAgICAgICAgbVs2XSA9IGExMiAqIGMgLSBhMDIgKiBzO1xyXG4gICAgICAgIG1bN10gPSBhMTMgKiBjIC0gYTAzICogcztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6h566X5L2N56e755+p6Zi1XHJcbiAgICAgKiAhI2VuIERpc3BsYWNlbWVudCBtYXRyaXggY2FsY3VsYXRpb25cclxuICAgICAqIEBtZXRob2QgZnJvbVRyYW5zbGF0aW9uXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZnJvbVRyYW5zbGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tVHJhbnNsYXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIG1bMF0gPSAxO1xyXG4gICAgICAgIG1bMV0gPSAwO1xyXG4gICAgICAgIG1bMl0gPSAwO1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG4gICAgICAgIG1bNF0gPSAwO1xyXG4gICAgICAgIG1bNV0gPSAxO1xyXG4gICAgICAgIG1bNl0gPSAwO1xyXG4gICAgICAgIG1bN10gPSAwO1xyXG4gICAgICAgIG1bOF0gPSAwO1xyXG4gICAgICAgIG1bOV0gPSAwO1xyXG4gICAgICAgIG1bMTBdID0gMTtcclxuICAgICAgICBtWzExXSA9IDA7XHJcbiAgICAgICAgbVsxMl0gPSB2Lng7XHJcbiAgICAgICAgbVsxM10gPSB2Lnk7XHJcbiAgICAgICAgbVsxNF0gPSB2Lno7XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuoeeul+e8qeaUvuefqemYtVxyXG4gICAgICogISNlbiBTY2FsaW5nIG1hdHJpeCBjYWxjdWxhdGlvblxyXG4gICAgICogQG1ldGhvZCBmcm9tU2NhbGluZ1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21TY2FsaW5nPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tU2NhbGluZzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogVmVjTGlrZSkge1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IHYueDtcclxuICAgICAgICBtWzFdID0gMDtcclxuICAgICAgICBtWzJdID0gMDtcclxuICAgICAgICBtWzNdID0gMDtcclxuICAgICAgICBtWzRdID0gMDtcclxuICAgICAgICBtWzVdID0gdi55O1xyXG4gICAgICAgIG1bNl0gPSAwO1xyXG4gICAgICAgIG1bN10gPSAwO1xyXG4gICAgICAgIG1bOF0gPSAwO1xyXG4gICAgICAgIG1bOV0gPSAwO1xyXG4gICAgICAgIG1bMTBdID0gdi56O1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IDA7XHJcbiAgICAgICAgbVsxM10gPSAwO1xyXG4gICAgICAgIG1bMTRdID0gMDtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6h566X5peL6L2s55+p6Zi1XHJcbiAgICAgKiAhI2VuIENhbGN1bGF0ZXMgdGhlIHJvdGF0aW9uIG1hdHJpeFxyXG4gICAgICogQG1ldGhvZCBmcm9tUm90YXRpb25cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyLCBheGlzOiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyLCBheGlzOiBWZWNMaWtlKSB7XHJcbiAgICAgICAgbGV0IHggPSBheGlzLngsIHkgPSBheGlzLnksIHogPSBheGlzLno7XHJcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG5cclxuICAgICAgICBpZiAoTWF0aC5hYnMobGVuKSA8IEVQU0lMT04pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xyXG4gICAgICAgIHggKj0gbGVuO1xyXG4gICAgICAgIHkgKj0gbGVuO1xyXG4gICAgICAgIHogKj0gbGVuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCB0ID0gMSAtIGM7XHJcblxyXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICBtWzBdID0geCAqIHggKiB0ICsgYztcclxuICAgICAgICBtWzFdID0geSAqIHggKiB0ICsgeiAqIHM7XHJcbiAgICAgICAgbVsyXSA9IHogKiB4ICogdCAtIHkgKiBzO1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG4gICAgICAgIG1bNF0gPSB4ICogeSAqIHQgLSB6ICogcztcclxuICAgICAgICBtWzVdID0geSAqIHkgKiB0ICsgYztcclxuICAgICAgICBtWzZdID0geiAqIHkgKiB0ICsgeCAqIHM7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IHggKiB6ICogdCArIHkgKiBzO1xyXG4gICAgICAgIG1bOV0gPSB5ICogeiAqIHQgLSB4ICogcztcclxuICAgICAgICBtWzEwXSA9IHogKiB6ICogdCArIGM7XHJcbiAgICAgICAgbVsxMV0gPSAwO1xyXG4gICAgICAgIG1bMTJdID0gMDtcclxuICAgICAgICBtWzEzXSA9IDA7XHJcbiAgICAgICAgbVsxNF0gPSAwO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDorqHnrpfnu5UgWCDovbTnmoTml4vovaznn6npmLVcclxuICAgICAqICEjZW4gQ2FsY3VsYXRpbmcgcm90YXRpb24gbWF0cml4IGFib3V0IHRoZSBYIGF4aXNcclxuICAgICAqIEBtZXRob2QgZnJvbVhSb3RhdGlvblxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21YUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tWFJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcclxuXHJcbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IDE7XHJcbiAgICAgICAgbVsxXSA9IDA7XHJcbiAgICAgICAgbVsyXSA9IDA7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IDA7XHJcbiAgICAgICAgbVs1XSA9IGM7XHJcbiAgICAgICAgbVs2XSA9IHM7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IDA7XHJcbiAgICAgICAgbVs5XSA9IC1zO1xyXG4gICAgICAgIG1bMTBdID0gYztcclxuICAgICAgICBtWzExXSA9IDA7XHJcbiAgICAgICAgbVsxMl0gPSAwO1xyXG4gICAgICAgIG1bMTNdID0gMDtcclxuICAgICAgICBtWzE0XSA9IDA7XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuoeeul+e7lSBZIOi9tOeahOaXi+i9rOefqemYtVxyXG4gICAgICogISNlbiBDYWxjdWxhdGluZyByb3RhdGlvbiBtYXRyaXggYWJvdXQgdGhlIFkgYXhpc1xyXG4gICAgICogQG1ldGhvZCBmcm9tWVJvdGF0aW9uXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZnJvbVlSb3RhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21ZUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCksIGMgPSBNYXRoLmNvcyhyYWQpO1xyXG5cclxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXHJcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcclxuICAgICAgICBtWzBdID0gYztcclxuICAgICAgICBtWzFdID0gMDtcclxuICAgICAgICBtWzJdID0gLXM7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IDA7XHJcbiAgICAgICAgbVs1XSA9IDE7XHJcbiAgICAgICAgbVs2XSA9IDA7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IHM7XHJcbiAgICAgICAgbVs5XSA9IDA7XHJcbiAgICAgICAgbVsxMF0gPSBjO1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IDA7XHJcbiAgICAgICAgbVsxM10gPSAwO1xyXG4gICAgICAgIG1bMTRdID0gMDtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6h566X57uVIFog6L2055qE5peL6L2s55+p6Zi1XHJcbiAgICAgKiAhI2VuIENhbGN1bGF0aW5nIHJvdGF0aW9uIG1hdHJpeCBhYm91dCB0aGUgWiBheGlzXHJcbiAgICAgKiBAbWV0aG9kIGZyb21aUm90YXRpb25cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tWlJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVpSb3RhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKSwgYyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIG1bMF0gPSBjO1xyXG4gICAgICAgIG1bMV0gPSBzO1xyXG4gICAgICAgIG1bMl0gPSAwO1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG4gICAgICAgIG1bNF0gPSAtcztcclxuICAgICAgICBtWzVdID0gYztcclxuICAgICAgICBtWzZdID0gMDtcclxuICAgICAgICBtWzddID0gMDtcclxuICAgICAgICBtWzhdID0gMDtcclxuICAgICAgICBtWzldID0gMDtcclxuICAgICAgICBtWzEwXSA9IDE7XHJcbiAgICAgICAgbVsxMV0gPSAwO1xyXG4gICAgICAgIG1bMTJdID0gMDtcclxuICAgICAgICBtWzEzXSA9IDA7XHJcbiAgICAgICAgbVsxNF0gPSAwO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja7ml4vovazlkozkvY3np7vkv6Hmga/orqHnrpfnn6npmLVcclxuICAgICAqICEjZW4gVGhlIHJvdGF0aW9uIGFuZCBkaXNwbGFjZW1lbnQgaW5mb3JtYXRpb24gY2FsY3VsYXRpbmcgbWF0cml4XHJcbiAgICAgKiBAbWV0aG9kIGZyb21SVFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21SVDxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVJUPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcclxuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xyXG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XHJcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XHJcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XHJcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XHJcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XHJcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XHJcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XHJcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XHJcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IDEgLSAoeXkgKyB6eik7XHJcbiAgICAgICAgbVsxXSA9IHh5ICsgd3o7XHJcbiAgICAgICAgbVsyXSA9IHh6IC0gd3k7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IHh5IC0gd3o7XHJcbiAgICAgICAgbVs1XSA9IDEgLSAoeHggKyB6eik7XHJcbiAgICAgICAgbVs2XSA9IHl6ICsgd3g7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IHh6ICsgd3k7XHJcbiAgICAgICAgbVs5XSA9IHl6IC0gd3g7XHJcbiAgICAgICAgbVsxMF0gPSAxIC0gKHh4ICsgeXkpO1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IHYueDtcclxuICAgICAgICBtWzEzXSA9IHYueTtcclxuICAgICAgICBtWzE0XSA9IHYuejtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaPkOWPluefqemYteeahOS9jeenu+S/oeaBrywg6buY6K6k55+p6Zi15Lit55qE5Y+Y5o2i5LulIFMtPlItPlQg55qE6aG65bqP5bqU55SoXHJcbiAgICAgKiAhI2VuIEV4dHJhY3RpbmcgZGlzcGxhY2VtZW50IGluZm9ybWF0aW9uIG9mIHRoZSBtYXRyaXgsIHRoZSBtYXRyaXggdHJhbnNmb3JtIHRvIHRoZSBkZWZhdWx0IHNlcXVlbnRpYWwgYXBwbGljYXRpb24gUy0+IFItPiBUIGlzXHJcbiAgICAgKiBAbWV0aG9kIGdldFRyYW5zbGF0aW9uXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZ2V0VHJhbnNsYXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCk6IFZlY0xpa2VcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFRyYW5zbGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgbWF0OiBPdXQpIHtcclxuICAgICAgICBsZXQgbSA9IG1hdC5tO1xyXG4gICAgICAgIG91dC54ID0gbVsxMl07XHJcbiAgICAgICAgb3V0LnkgPSBtWzEzXTtcclxuICAgICAgICBvdXQueiA9IG1bMTRdO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmj5Dlj5bnn6npmLXnmoTnvKnmlL7kv6Hmga8sIOm7mOiupOefqemYteS4reeahOWPmOaNouS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxyXG4gICAgICogISNlbiBTY2FsaW5nIGluZm9ybWF0aW9uIGV4dHJhY3Rpb24gbWF0cml4LCB0aGUgbWF0cml4IHRyYW5zZm9ybSB0byB0aGUgZGVmYXVsdCBzZXF1ZW50aWFsIGFwcGxpY2F0aW9uIFMtPiBSLT4gVCBpc1xyXG4gICAgICogQG1ldGhvZCBnZXRTY2FsaW5nXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZ2V0U2NhbGluZzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIG1hdDogT3V0KTogVmVjTGlrZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0U2NhbGluZzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIG1hdDogT3V0KSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBsZXQgbTMgPSBtM18xLm07XHJcbiAgICAgICAgY29uc3QgbTAwID0gbTNbMF0gPSBtWzBdO1xyXG4gICAgICAgIGNvbnN0IG0wMSA9IG0zWzFdID0gbVsxXTtcclxuICAgICAgICBjb25zdCBtMDIgPSBtM1syXSA9IG1bMl07XHJcbiAgICAgICAgY29uc3QgbTA0ID0gbTNbM10gPSBtWzRdO1xyXG4gICAgICAgIGNvbnN0IG0wNSA9IG0zWzRdID0gbVs1XTtcclxuICAgICAgICBjb25zdCBtMDYgPSBtM1s1XSA9IG1bNl07XHJcbiAgICAgICAgY29uc3QgbTA4ID0gbTNbNl0gPSBtWzhdO1xyXG4gICAgICAgIGNvbnN0IG0wOSA9IG0zWzddID0gbVs5XTtcclxuICAgICAgICBjb25zdCBtMTAgPSBtM1s4XSA9IG1bMTBdO1xyXG4gICAgICAgIG91dC54ID0gTWF0aC5zcXJ0KG0wMCAqIG0wMCArIG0wMSAqIG0wMSArIG0wMiAqIG0wMik7XHJcbiAgICAgICAgb3V0LnkgPSBNYXRoLnNxcnQobTA0ICogbTA0ICsgbTA1ICogbTA1ICsgbTA2ICogbTA2KTtcclxuICAgICAgICBvdXQueiA9IE1hdGguc3FydChtMDggKiBtMDggKyBtMDkgKiBtMDkgKyBtMTAgKiBtMTApO1xyXG4gICAgICAgIC8vIGFjY291bnQgZm9yIHJlZmVjdGlvbnNcclxuICAgICAgICBpZiAoTWF0My5kZXRlcm1pbmFudChtM18xKSA8IDApIHsgb3V0LnggKj0gLTE7IH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmj5Dlj5bnn6npmLXnmoTml4vovazkv6Hmga8sIOm7mOiupOi+k+WFpeefqemYteS4jeWQq+aciee8qeaUvuS/oeaBr++8jOWmguiAg+iZkee8qeaUvuW6lOS9v+eUqCBgdG9SVFNgIOWHveaVsOOAglxyXG4gICAgICogISNlbiBSb3RhdGlvbiBpbmZvcm1hdGlvbiBleHRyYWN0aW9uIG1hdHJpeCwgdGhlIG1hdHJpeCBjb250YWluaW5nIG5vIGRlZmF1bHQgaW5wdXQgc2NhbGluZyBpbmZvcm1hdGlvbiwgc3VjaCBhcyB0aGUgdXNlIG9mIGB0b1JUU2Agc2hvdWxkIGNvbnNpZGVyIHRoZSBzY2FsaW5nIGZ1bmN0aW9uLlxyXG4gICAgICogQG1ldGhvZCBnZXRSb3RhdGlvblxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldFJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogUXVhdCwgbWF0OiBPdXQpOiBRdWF0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRSb3RhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IFF1YXQsIG1hdDogT3V0KSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBjb25zdCB0cmFjZSA9IG1bMF0gKyBtWzVdICsgbVsxMF07XHJcbiAgICAgICAgbGV0IFMgPSAwO1xyXG5cclxuICAgICAgICBpZiAodHJhY2UgPiAwKSB7XHJcbiAgICAgICAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcclxuICAgICAgICAgICAgb3V0LncgPSAwLjI1ICogUztcclxuICAgICAgICAgICAgb3V0LnggPSAobVs2XSAtIG1bOV0pIC8gUztcclxuICAgICAgICAgICAgb3V0LnkgPSAobVs4XSAtIG1bMl0pIC8gUztcclxuICAgICAgICAgICAgb3V0LnogPSAobVsxXSAtIG1bNF0pIC8gUztcclxuICAgICAgICB9IGVsc2UgaWYgKChtWzBdID4gbVs1XSkgJiYgKG1bMF0gPiBtWzEwXSkpIHtcclxuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBtWzBdIC0gbVs1XSAtIG1bMTBdKSAqIDI7XHJcbiAgICAgICAgICAgIG91dC53ID0gKG1bNl0gLSBtWzldKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC54ID0gMC4yNSAqIFM7XHJcbiAgICAgICAgICAgIG91dC55ID0gKG1bMV0gKyBtWzRdKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC56ID0gKG1bOF0gKyBtWzJdKSAvIFM7XHJcbiAgICAgICAgfSBlbHNlIGlmIChtWzVdID4gbVsxMF0pIHtcclxuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBtWzVdIC0gbVswXSAtIG1bMTBdKSAqIDI7XHJcbiAgICAgICAgICAgIG91dC53ID0gKG1bOF0gLSBtWzJdKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC54ID0gKG1bMV0gKyBtWzRdKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC55ID0gMC4yNSAqIFM7XHJcbiAgICAgICAgICAgIG91dC56ID0gKG1bNl0gKyBtWzldKSAvIFM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBtWzEwXSAtIG1bMF0gLSBtWzVdKSAqIDI7XHJcbiAgICAgICAgICAgIG91dC53ID0gKG1bMV0gLSBtWzRdKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC54ID0gKG1bOF0gKyBtWzJdKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC55ID0gKG1bNl0gKyBtWzldKSAvIFM7XHJcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIFM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmj5Dlj5bml4vovazjgIHkvY3np7vjgIHnvKnmlL7kv6Hmga/vvIwg6buY6K6k55+p6Zi15Lit55qE5Y+Y5o2i5LulIFMtPlItPlQg55qE6aG65bqP5bqU55SoXHJcbiAgICAgKiAhI2VuIEV4dHJhY3Rpbmcgcm90YXRpb25hbCBkaXNwbGFjZW1lbnQsIHpvb20gaW5mb3JtYXRpb24sIHRoZSBkZWZhdWx0IG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBpbiBvcmRlciBTLT4gUi0+IFQgYXBwbGljYXRpb25zXHJcbiAgICAgKiBAbWV0aG9kIHRvUlRTXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9SVFM8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAobWF0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UpOiB2b2lkXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b1JUUzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChtYXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSkge1xyXG4gICAgICAgIGxldCBtID0gbWF0Lm07XHJcbiAgICAgICAgbGV0IG0zID0gbTNfMS5tO1xyXG4gICAgICAgIHMueCA9IFZlYzMuc2V0KHYzXzEsIG1bMF0sIG1bMV0sIG1bMl0pLm1hZygpO1xyXG4gICAgICAgIG0zWzBdID0gbVswXSAvIHMueDtcclxuICAgICAgICBtM1sxXSA9IG1bMV0gLyBzLng7XHJcbiAgICAgICAgbTNbMl0gPSBtWzJdIC8gcy54O1xyXG4gICAgICAgIHMueSA9IFZlYzMuc2V0KHYzXzEsIG1bNF0sIG1bNV0sIG1bNl0pLm1hZygpO1xyXG4gICAgICAgIG0zWzNdID0gbVs0XSAvIHMueTtcclxuICAgICAgICBtM1s0XSA9IG1bNV0gLyBzLnk7XHJcbiAgICAgICAgbTNbNV0gPSBtWzZdIC8gcy55O1xyXG4gICAgICAgIHMueiA9IFZlYzMuc2V0KHYzXzEsIG1bOF0sIG1bOV0sIG1bMTBdKS5tYWcoKTtcclxuICAgICAgICBtM1s2XSA9IG1bOF0gLyBzLno7XHJcbiAgICAgICAgbTNbN10gPSBtWzldIC8gcy56O1xyXG4gICAgICAgIG0zWzhdID0gbVsxMF0gLyBzLno7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gTWF0My5kZXRlcm1pbmFudChtM18xKTtcclxuICAgICAgICBpZiAoZGV0IDwgMCkgeyBzLnggKj0gLTE7IG0zWzBdICo9IC0xOyBtM1sxXSAqPSAtMTsgbTNbMl0gKj0gLTE7IH1cclxuICAgICAgICBRdWF0LmZyb21NYXQzKHEsIG0zXzEpOyAvLyBhbHJlYWR5IG5vcm1hbGl6ZWRcclxuICAgICAgICBWZWMzLnNldCh2LCBtWzEyXSwgbVsxM10sIG1bMTRdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5qC55o2u5peL6L2s44CB5L2N56e744CB57yp5pS+5L+h5oGv6K6h566X55+p6Zi177yM5LulIFMtPlItPlQg55qE6aG65bqP5bqU55SoXHJcbiAgICAgKiAhI2VuIFRoZSByb3RhcnkgZGlzcGxhY2VtZW50LCB0aGUgc2NhbGluZyBtYXRyaXggY2FsY3VsYXRpb24gaW5mb3JtYXRpb24sIHRoZSBvcmRlciBTLT4gUi0+IFQgYXBwbGljYXRpb25zXHJcbiAgICAgKiBAbWV0aG9kIGZyb21SVFNcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tUlRTPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlLCBzOiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tUlRTPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlLCBzOiBWZWNMaWtlKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcclxuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xyXG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XHJcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XHJcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XHJcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XHJcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XHJcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XHJcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XHJcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XHJcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XHJcbiAgICAgICAgY29uc3Qgc3ggPSBzLng7XHJcbiAgICAgICAgY29uc3Qgc3kgPSBzLnk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xyXG4gICAgICAgIG1bMV0gPSAoeHkgKyB3eikgKiBzeDtcclxuICAgICAgICBtWzJdID0gKHh6IC0gd3kpICogc3g7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9ICh4eSAtIHd6KSAqIHN5O1xyXG4gICAgICAgIG1bNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcclxuICAgICAgICBtWzZdID0gKHl6ICsgd3gpICogc3k7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9ICh4eiArIHd5KSAqIHN6O1xyXG4gICAgICAgIG1bOV0gPSAoeXogLSB3eCkgKiBzejtcclxuICAgICAgICBtWzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IHYueDtcclxuICAgICAgICBtWzEzXSA9IHYueTtcclxuICAgICAgICBtWzE0XSA9IHYuejtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOagueaNruaMh+WumueahOaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuWPiuWPmOaNouS4reW/g+S/oeaBr+iuoeeul+efqemYte+8jOS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxyXG4gICAgICogISNlbiBBY2NvcmRpbmcgdG8gdGhlIHNwZWNpZmllZCByb3RhdGlvbiwgZGlzcGxhY2VtZW50LCBhbmQgc2NhbGUgY29udmVyc2lvbiBtYXRyaXggY2FsY3VsYXRpb24gaW5mb3JtYXRpb24gY2VudGVyLCBvcmRlciBTLT4gUi0+IFQgYXBwbGljYXRpb25zXHJcbiAgICAgKiBAbWV0aG9kIGZyb21SVFNPcmlnaW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tUlRTT3JpZ2luPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlLCBzOiBWZWNMaWtlLCBvOiBWZWNMaWtlKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcSDml4vovazlgLxcclxuICAgICAqIEBwYXJhbSB2IOS9jeenu+WAvFxyXG4gICAgICogQHBhcmFtIHMg57yp5pS+5YC8XHJcbiAgICAgKiBAcGFyYW0gbyDmjIflrprlj5jmjaLkuK3lv4NcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21SVFNPcmlnaW48T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UsIHM6IFZlY0xpa2UsIG86IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCB4ID0gcS54LCB5ID0gcS55LCB6ID0gcS56LCB3ID0gcS53O1xyXG4gICAgICAgIGNvbnN0IHgyID0geCArIHg7XHJcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcclxuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xyXG5cclxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcclxuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcclxuICAgICAgICBjb25zdCB4eiA9IHggKiB6MjtcclxuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcclxuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcclxuICAgICAgICBjb25zdCB6eiA9IHogKiB6MjtcclxuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBjb25zdCB3eiA9IHcgKiB6MjtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ggPSBzLng7XHJcbiAgICAgICAgY29uc3Qgc3kgPSBzLnk7XHJcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XHJcblxyXG4gICAgICAgIGNvbnN0IG94ID0gby54O1xyXG4gICAgICAgIGNvbnN0IG95ID0gby55O1xyXG4gICAgICAgIGNvbnN0IG96ID0gby56O1xyXG5cclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIG1bMF0gPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcclxuICAgICAgICBtWzFdID0gKHh5ICsgd3opICogc3g7XHJcbiAgICAgICAgbVsyXSA9ICh4eiAtIHd5KSAqIHN4O1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG4gICAgICAgIG1bNF0gPSAoeHkgLSB3eikgKiBzeTtcclxuICAgICAgICBtWzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XHJcbiAgICAgICAgbVs2XSA9ICh5eiArIHd4KSAqIHN5O1xyXG4gICAgICAgIG1bN10gPSAwO1xyXG4gICAgICAgIG1bOF0gPSAoeHogKyB3eSkgKiBzejtcclxuICAgICAgICBtWzldID0gKHl6IC0gd3gpICogc3o7XHJcbiAgICAgICAgbVsxMF0gPSAoMSAtICh4eCArIHl5KSkgKiBzejtcclxuICAgICAgICBtWzExXSA9IDA7XHJcbiAgICAgICAgbVsxMl0gPSB2LnggKyBveCAtIChtWzBdICogb3ggKyBtWzRdICogb3kgKyBtWzhdICogb3opO1xyXG4gICAgICAgIG1bMTNdID0gdi55ICsgb3kgLSAobVsxXSAqIG94ICsgbVs1XSAqIG95ICsgbVs5XSAqIG96KTtcclxuICAgICAgICBtWzE0XSA9IHYueiArIG96IC0gKG1bMl0gKiBveCArIG1bNl0gKiBveSArIG1bMTBdICogb3opO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5qC55o2u5oyH5a6a55qE5peL6L2s5L+h5oGv6K6h566X55+p6Zi1XHJcbiAgICAgKiAhI2VuIFRoZSByb3RhdGlvbiBtYXRyaXggY2FsY3VsYXRpb24gaW5mb3JtYXRpb24gc3BlY2lmaWVkXHJcbiAgICAgKiBAbWV0aG9kIGZyb21RdWF0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZnJvbVF1YXQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21RdWF0PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBxOiBRdWF0KSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcclxuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xyXG4gICAgICAgIGNvbnN0IHkyID0geSArIHk7XHJcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgY29uc3QgeHggPSB4ICogeDI7XHJcbiAgICAgICAgY29uc3QgeXggPSB5ICogeDI7XHJcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XHJcbiAgICAgICAgY29uc3QgenggPSB6ICogeDI7XHJcbiAgICAgICAgY29uc3QgenkgPSB6ICogeTI7XHJcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XHJcbiAgICAgICAgY29uc3Qgd3ggPSB3ICogeDI7XHJcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IDEgLSB5eSAtIHp6O1xyXG4gICAgICAgIG1bMV0gPSB5eCArIHd6O1xyXG4gICAgICAgIG1bMl0gPSB6eCAtIHd5O1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG5cclxuICAgICAgICBtWzRdID0geXggLSB3ejtcclxuICAgICAgICBtWzVdID0gMSAtIHh4IC0geno7XHJcbiAgICAgICAgbVs2XSA9IHp5ICsgd3g7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcblxyXG4gICAgICAgIG1bOF0gPSB6eCArIHd5O1xyXG4gICAgICAgIG1bOV0gPSB6eSAtIHd4O1xyXG4gICAgICAgIG1bMTBdID0gMSAtIHh4IC0geXk7XHJcbiAgICAgICAgbVsxMV0gPSAwO1xyXG5cclxuICAgICAgICBtWzEyXSA9IDA7XHJcbiAgICAgICAgbVsxM10gPSAwO1xyXG4gICAgICAgIG1bMTRdID0gMDtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOagueaNruaMh+WumueahOinhumUpeS9k+S/oeaBr+iuoeeul+efqemYtVxyXG4gICAgICogISNlbiBUaGUgbWF0cml4IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9uIHNwZWNpZmllZCBmcnVzdHVtXHJcbiAgICAgKiBAbWV0aG9kIGZydXN0dW1cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcnVzdHVtPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIGxlZnQg5bem5bmz6Z2i6Led56a7XHJcbiAgICAgKiBAcGFyYW0gcmlnaHQg5Y+z5bmz6Z2i6Led56a7XHJcbiAgICAgKiBAcGFyYW0gYm90dG9tIOS4i+W5s+mdoui3neemu1xyXG4gICAgICogQHBhcmFtIHRvcCDkuIrlubPpnaLot53nprtcclxuICAgICAqIEBwYXJhbSBuZWFyIOi/keW5s+mdoui3neemu1xyXG4gICAgICogQHBhcmFtIGZhciDov5zlubPpnaLot53nprtcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZydXN0dW08T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHRvcDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmwgPSAxIC8gKHJpZ2h0IC0gbGVmdCk7XHJcbiAgICAgICAgY29uc3QgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XHJcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xyXG5cclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIG1bMF0gPSAobmVhciAqIDIpICogcmw7XHJcbiAgICAgICAgbVsxXSA9IDA7XHJcbiAgICAgICAgbVsyXSA9IDA7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IDA7XHJcbiAgICAgICAgbVs1XSA9IChuZWFyICogMikgKiB0YjtcclxuICAgICAgICBtWzZdID0gMDtcclxuICAgICAgICBtWzddID0gMDtcclxuICAgICAgICBtWzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcclxuICAgICAgICBtWzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcclxuICAgICAgICBtWzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xyXG4gICAgICAgIG1bMTFdID0gLTE7XHJcbiAgICAgICAgbVsxMl0gPSAwO1xyXG4gICAgICAgIG1bMTNdID0gMDtcclxuICAgICAgICBtWzE0XSA9IChmYXIgKiBuZWFyICogMikgKiBuZjtcclxuICAgICAgICBtWzE1XSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6K6h566X6YCP6KeG5oqV5b2x55+p6Zi1XHJcbiAgICAgKiAhI2VuIFBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IGNhbGN1bGF0aW9uXHJcbiAgICAgKiBAbWV0aG9kIHBlcnNwZWN0aXZlXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcGVyc3BlY3RpdmU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGZvdnk6IG51bWJlciwgYXNwZWN0OiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBmb3Z5IOe6teWQkeinhuinkumrmOW6plxyXG4gICAgICogQHBhcmFtIGFzcGVjdCDplb/lrr3mr5RcclxuICAgICAqIEBwYXJhbSBuZWFyIOi/keW5s+mdoui3neemu1xyXG4gICAgICogQHBhcmFtIGZhciDov5zlubPpnaLot53nprtcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHBlcnNwZWN0aXZlPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBmb3Z5OiBudW1iZXIsIGFzcGVjdDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKTtcclxuICAgICAgICBjb25zdCBuZiA9IDEgLyAobmVhciAtIGZhcik7XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IGYgLyBhc3BlY3Q7XHJcbiAgICAgICAgbVsxXSA9IDA7XHJcbiAgICAgICAgbVsyXSA9IDA7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IDA7XHJcbiAgICAgICAgbVs1XSA9IGY7XHJcbiAgICAgICAgbVs2XSA9IDA7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IDA7XHJcbiAgICAgICAgbVs5XSA9IDA7XHJcbiAgICAgICAgbVsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcclxuICAgICAgICBtWzExXSA9IC0xO1xyXG4gICAgICAgIG1bMTJdID0gMDtcclxuICAgICAgICBtWzEzXSA9IDA7XHJcbiAgICAgICAgbVsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XHJcbiAgICAgICAgbVsxNV0gPSAwO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuoeeul+ato+S6pOaKleW9seefqemYtVxyXG4gICAgICogISNlbiBDb21wdXRpbmcgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeFxyXG4gICAgICogQG1ldGhvZCBvcnRob1xyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG9ydGhvPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIGxlZnQg5bem5bmz6Z2i6Led56a7XHJcbiAgICAgKiBAcGFyYW0gcmlnaHQg5Y+z5bmz6Z2i6Led56a7XHJcbiAgICAgKiBAcGFyYW0gYm90dG9tIOS4i+W5s+mdoui3neemu1xyXG4gICAgICogQHBhcmFtIHRvcCDkuIrlubPpnaLot53nprtcclxuICAgICAqIEBwYXJhbSBuZWFyIOi/keW5s+mdoui3neemu1xyXG4gICAgICogQHBhcmFtIGZhciDov5zlubPpnaLot53nprtcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9ydGhvPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xyXG4gICAgICAgIGNvbnN0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIG1bMF0gPSAtMiAqIGxyO1xyXG4gICAgICAgIG1bMV0gPSAwO1xyXG4gICAgICAgIG1bMl0gPSAwO1xyXG4gICAgICAgIG1bM10gPSAwO1xyXG4gICAgICAgIG1bNF0gPSAwO1xyXG4gICAgICAgIG1bNV0gPSAtMiAqIGJ0O1xyXG4gICAgICAgIG1bNl0gPSAwO1xyXG4gICAgICAgIG1bN10gPSAwO1xyXG4gICAgICAgIG1bOF0gPSAwO1xyXG4gICAgICAgIG1bOV0gPSAwO1xyXG4gICAgICAgIG1bMTBdID0gMiAqIG5mO1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XHJcbiAgICAgICAgbVsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xyXG4gICAgICAgIG1bMTRdID0gKGZhciArIG5lYXIpICogbmY7XHJcbiAgICAgICAgbVsxNV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOagueaNruinhueCueiuoeeul+efqemYte+8jOazqOaEjyBgZXllIC0gY2VudGVyYCDkuI3og73kuLrpm7blkJHph4/miJbkuI4gYHVwYCDlkJHph4/lubPooYxcclxuICAgICAqICEjZW4gYFVwYCBwYXJhbGxlbCB2ZWN0b3Igb3IgdmVjdG9yIGNlbnRlcmAgbm90IGJlIHplcm8gLSB0aGUgbWF0cml4IGNhbGN1bGF0aW9uIGFjY29yZGluZyB0byB0aGUgdmlld3BvaW50LCBub3RlYCBleWVcclxuICAgICAqIEBtZXRob2QgbG9va0F0XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbG9va0F0PE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBleWU6IFZlY0xpa2UsIGNlbnRlcjogVmVjTGlrZSwgdXA6IFZlY0xpa2UpOiBPdXRcclxuICAgICAqIEBwYXJhbSBleWUg5b2T5YmN5L2N572uXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyIOebruagh+inhueCuVxyXG4gICAgICogQHBhcmFtIHVwIOinhuWPo+S4iuaWueWQkVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9va0F0PE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBleWU6IFZlY0xpa2UsIGNlbnRlcjogVmVjTGlrZSwgdXA6IFZlY0xpa2UpIHtcclxuICAgICAgICBjb25zdCBleWV4ID0gZXllLng7XHJcbiAgICAgICAgY29uc3QgZXlleSA9IGV5ZS55O1xyXG4gICAgICAgIGNvbnN0IGV5ZXogPSBleWUuejtcclxuICAgICAgICBjb25zdCB1cHggPSB1cC54O1xyXG4gICAgICAgIGNvbnN0IHVweSA9IHVwLnk7XHJcbiAgICAgICAgY29uc3QgdXB6ID0gdXAuejtcclxuICAgICAgICBjb25zdCBjZW50ZXJ4ID0gY2VudGVyLng7XHJcbiAgICAgICAgY29uc3QgY2VudGVyeSA9IGNlbnRlci55O1xyXG4gICAgICAgIGNvbnN0IGNlbnRlcnogPSBjZW50ZXIuejtcclxuXHJcbiAgICAgICAgbGV0IHowID0gZXlleCAtIGNlbnRlcng7XHJcbiAgICAgICAgbGV0IHoxID0gZXlleSAtIGNlbnRlcnk7XHJcbiAgICAgICAgbGV0IHoyID0gZXlleiAtIGNlbnRlcno7XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XHJcbiAgICAgICAgejAgKj0gbGVuO1xyXG4gICAgICAgIHoxICo9IGxlbjtcclxuICAgICAgICB6MiAqPSBsZW47XHJcblxyXG4gICAgICAgIGxldCB4MCA9IHVweSAqIHoyIC0gdXB6ICogejE7XHJcbiAgICAgICAgbGV0IHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcclxuICAgICAgICBsZXQgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xyXG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoeDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyKTtcclxuICAgICAgICB4MCAqPSBsZW47XHJcbiAgICAgICAgeDEgKj0gbGVuO1xyXG4gICAgICAgIHgyICo9IGxlbjtcclxuXHJcbiAgICAgICAgY29uc3QgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcclxuICAgICAgICBjb25zdCB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xyXG4gICAgICAgIGNvbnN0IHkyID0gejAgKiB4MSAtIHoxICogeDA7XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9IHgwO1xyXG4gICAgICAgIG1bMV0gPSB5MDtcclxuICAgICAgICBtWzJdID0gejA7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9IHgxO1xyXG4gICAgICAgIG1bNV0gPSB5MTtcclxuICAgICAgICBtWzZdID0gejE7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9IHgyO1xyXG4gICAgICAgIG1bOV0gPSB5MjtcclxuICAgICAgICBtWzEwXSA9IHoyO1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcclxuICAgICAgICBtWzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcclxuICAgICAgICBtWzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuoeeul+mAhui9rOe9ruefqemYtVxyXG4gICAgICogISNlbiBSZXZlcnNhbCBtYXRyaXggY2FsY3VsYXRpb25cclxuICAgICAqIEBtZXRob2QgaW52ZXJzZVRyYW5zcG9zZVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGludmVyc2VUcmFuc3Bvc2U8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW52ZXJzZVRyYW5zcG9zZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XHJcblxyXG4gICAgICAgIGxldCBtID0gYS5tO1xyXG4gICAgICAgIF9hMDAgPSBtWzBdOyBfYTAxID0gbVsxXTsgX2EwMiA9IG1bMl07IF9hMDMgPSBtWzNdO1xyXG4gICAgICAgIF9hMTAgPSBtWzRdOyBfYTExID0gbVs1XTsgX2ExMiA9IG1bNl07IF9hMTMgPSBtWzddO1xyXG4gICAgICAgIF9hMjAgPSBtWzhdOyBfYTIxID0gbVs5XTsgX2EyMiA9IG1bMTBdOyBfYTIzID0gbVsxMV07XHJcbiAgICAgICAgX2EzMCA9IG1bMTJdOyBfYTMxID0gbVsxM107IF9hMzIgPSBtWzE0XTsgX2EzMyA9IG1bMTVdO1xyXG5cclxuICAgICAgICBjb25zdCBiMDAgPSBfYTAwICogX2ExMSAtIF9hMDEgKiBfYTEwO1xyXG4gICAgICAgIGNvbnN0IGIwMSA9IF9hMDAgKiBfYTEyIC0gX2EwMiAqIF9hMTA7XHJcbiAgICAgICAgY29uc3QgYjAyID0gX2EwMCAqIF9hMTMgLSBfYTAzICogX2ExMDtcclxuICAgICAgICBjb25zdCBiMDMgPSBfYTAxICogX2ExMiAtIF9hMDIgKiBfYTExO1xyXG4gICAgICAgIGNvbnN0IGIwNCA9IF9hMDEgKiBfYTEzIC0gX2EwMyAqIF9hMTE7XHJcbiAgICAgICAgY29uc3QgYjA1ID0gX2EwMiAqIF9hMTMgLSBfYTAzICogX2ExMjtcclxuICAgICAgICBjb25zdCBiMDYgPSBfYTIwICogX2EzMSAtIF9hMjEgKiBfYTMwO1xyXG4gICAgICAgIGNvbnN0IGIwNyA9IF9hMjAgKiBfYTMyIC0gX2EyMiAqIF9hMzA7XHJcbiAgICAgICAgY29uc3QgYjA4ID0gX2EyMCAqIF9hMzMgLSBfYTIzICogX2EzMDtcclxuICAgICAgICBjb25zdCBiMDkgPSBfYTIxICogX2EzMiAtIF9hMjIgKiBfYTMxO1xyXG4gICAgICAgIGNvbnN0IGIxMCA9IF9hMjEgKiBfYTMzIC0gX2EyMyAqIF9hMzE7XHJcbiAgICAgICAgY29uc3QgYjExID0gX2EyMiAqIF9hMzMgLSBfYTIzICogX2EzMjtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIGxldCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XHJcblxyXG4gICAgICAgIGlmICghZGV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XHJcblxyXG4gICAgICAgIG0gPSBvdXQubTtcclxuICAgICAgICBtWzBdID0gKF9hMTEgKiBiMTEgLSBfYTEyICogYjEwICsgX2ExMyAqIGIwOSkgKiBkZXQ7XHJcbiAgICAgICAgbVsxXSA9IChfYTEyICogYjA4IC0gX2ExMCAqIGIxMSAtIF9hMTMgKiBiMDcpICogZGV0O1xyXG4gICAgICAgIG1bMl0gPSAoX2ExMCAqIGIxMCAtIF9hMTEgKiBiMDggKyBfYTEzICogYjA2KSAqIGRldDtcclxuICAgICAgICBtWzNdID0gMDtcclxuXHJcbiAgICAgICAgbVs0XSA9IChfYTAyICogYjEwIC0gX2EwMSAqIGIxMSAtIF9hMDMgKiBiMDkpICogZGV0O1xyXG4gICAgICAgIG1bNV0gPSAoX2EwMCAqIGIxMSAtIF9hMDIgKiBiMDggKyBfYTAzICogYjA3KSAqIGRldDtcclxuICAgICAgICBtWzZdID0gKF9hMDEgKiBiMDggLSBfYTAwICogYjEwIC0gX2EwMyAqIGIwNikgKiBkZXQ7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcblxyXG4gICAgICAgIG1bOF0gPSAoX2EzMSAqIGIwNSAtIF9hMzIgKiBiMDQgKyBfYTMzICogYjAzKSAqIGRldDtcclxuICAgICAgICBtWzldID0gKF9hMzIgKiBiMDIgLSBfYTMwICogYjA1IC0gX2EzMyAqIGIwMSkgKiBkZXQ7XHJcbiAgICAgICAgbVsxMF0gPSAoX2EzMCAqIGIwNCAtIF9hMzEgKiBiMDIgKyBfYTMzICogYjAwKSAqIGRldDtcclxuICAgICAgICBtWzExXSA9IDA7XHJcblxyXG4gICAgICAgIG1bMTJdID0gMDtcclxuICAgICAgICBtWzEzXSA9IDA7XHJcbiAgICAgICAgbVsxNF0gPSAwO1xyXG4gICAgICAgIG1bMTVdID0gMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg55+p6Zi15Yqg5rOVXHJcbiAgICAgKiAhI2VuIEVsZW1lbnQgYnkgZWxlbWVudCBtYXRyaXggYWRkaXRpb25cclxuICAgICAqIEBtZXRob2QgYWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYWRkPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xyXG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tLCBibSA9IGIubTtcclxuICAgICAgICBtWzBdID0gYW1bMF0gKyBibVswXTtcclxuICAgICAgICBtWzFdID0gYW1bMV0gKyBibVsxXTtcclxuICAgICAgICBtWzJdID0gYW1bMl0gKyBibVsyXTtcclxuICAgICAgICBtWzNdID0gYW1bM10gKyBibVszXTtcclxuICAgICAgICBtWzRdID0gYW1bNF0gKyBibVs0XTtcclxuICAgICAgICBtWzVdID0gYW1bNV0gKyBibVs1XTtcclxuICAgICAgICBtWzZdID0gYW1bNl0gKyBibVs2XTtcclxuICAgICAgICBtWzddID0gYW1bN10gKyBibVs3XTtcclxuICAgICAgICBtWzhdID0gYW1bOF0gKyBibVs4XTtcclxuICAgICAgICBtWzldID0gYW1bOV0gKyBibVs5XTtcclxuICAgICAgICBtWzEwXSA9IGFtWzEwXSArIGJtWzEwXTtcclxuICAgICAgICBtWzExXSA9IGFtWzExXSArIGJtWzExXTtcclxuICAgICAgICBtWzEyXSA9IGFtWzEyXSArIGJtWzEyXTtcclxuICAgICAgICBtWzEzXSA9IGFtWzEzXSArIGJtWzEzXTtcclxuICAgICAgICBtWzE0XSA9IGFtWzE0XSArIGJtWzE0XTtcclxuICAgICAgICBtWzE1XSA9IGFtWzE1XSArIGJtWzE1XTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDpgJDlhYPntKDnn6npmLXlh4/ms5VcclxuICAgICAqICEjZW4gTWF0cml4IGVsZW1lbnQgYnkgZWxlbWVudCBzdWJ0cmFjdGlvblxyXG4gICAgICogQG1ldGhvZCBzdWJ0cmFjdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN1YnRyYWN0PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3VidHJhY3Q8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm0sIGJtID0gYi5tO1xyXG4gICAgICAgIG1bMF0gPSBhbVswXSAtIGJtWzBdO1xyXG4gICAgICAgIG1bMV0gPSBhbVsxXSAtIGJtWzFdO1xyXG4gICAgICAgIG1bMl0gPSBhbVsyXSAtIGJtWzJdO1xyXG4gICAgICAgIG1bM10gPSBhbVszXSAtIGJtWzNdO1xyXG4gICAgICAgIG1bNF0gPSBhbVs0XSAtIGJtWzRdO1xyXG4gICAgICAgIG1bNV0gPSBhbVs1XSAtIGJtWzVdO1xyXG4gICAgICAgIG1bNl0gPSBhbVs2XSAtIGJtWzZdO1xyXG4gICAgICAgIG1bN10gPSBhbVs3XSAtIGJtWzddO1xyXG4gICAgICAgIG1bOF0gPSBhbVs4XSAtIGJtWzhdO1xyXG4gICAgICAgIG1bOV0gPSBhbVs5XSAtIGJtWzldO1xyXG4gICAgICAgIG1bMTBdID0gYW1bMTBdIC0gYm1bMTBdO1xyXG4gICAgICAgIG1bMTFdID0gYW1bMTFdIC0gYm1bMTFdO1xyXG4gICAgICAgIG1bMTJdID0gYW1bMTJdIC0gYm1bMTJdO1xyXG4gICAgICAgIG1bMTNdID0gYW1bMTNdIC0gYm1bMTNdO1xyXG4gICAgICAgIG1bMTRdID0gYW1bMTRdIC0gYm1bMTRdO1xyXG4gICAgICAgIG1bMTVdID0gYW1bMTVdIC0gYm1bMTVdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOefqemYteagh+mHj+S5mOazlVxyXG4gICAgICogISNlbiBNYXRyaXggc2NhbGFyIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbXVsdGlwbHlTY2FsYXI8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcclxuICAgICAgICBtWzBdID0gYW1bMF0gKiBiO1xyXG4gICAgICAgIG1bMV0gPSBhbVsxXSAqIGI7XHJcbiAgICAgICAgbVsyXSA9IGFtWzJdICogYjtcclxuICAgICAgICBtWzNdID0gYW1bM10gKiBiO1xyXG4gICAgICAgIG1bNF0gPSBhbVs0XSAqIGI7XHJcbiAgICAgICAgbVs1XSA9IGFtWzVdICogYjtcclxuICAgICAgICBtWzZdID0gYW1bNl0gKiBiO1xyXG4gICAgICAgIG1bN10gPSBhbVs3XSAqIGI7XHJcbiAgICAgICAgbVs4XSA9IGFtWzhdICogYjtcclxuICAgICAgICBtWzldID0gYW1bOV0gKiBiO1xyXG4gICAgICAgIG1bMTBdID0gYW1bMTBdICogYjtcclxuICAgICAgICBtWzExXSA9IGFtWzExXSAqIGI7XHJcbiAgICAgICAgbVsxMl0gPSBhbVsxMl0gKiBiO1xyXG4gICAgICAgIG1bMTNdID0gYW1bMTNdICogYjtcclxuICAgICAgICBtWzE0XSA9IGFtWzE0XSAqIGI7XHJcbiAgICAgICAgbVsxNV0gPSBhbVsxNV0gKiBiO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOmAkOWFg+e0oOefqemYteagh+mHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxyXG4gICAgICogISNlbiBFbGVtZW50cyBvZiB0aGUgbWF0cml4IGJ5IHRoZSBzY2FsYXIgbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyQW5kQWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbXVsdGlwbHlTY2FsYXJBbmRBZGQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhckFuZEFkZDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubSwgYm0gPSBiLm07XHJcbiAgICAgICAgbVswXSA9IGFtWzBdICsgKGJtWzBdICogc2NhbGUpO1xyXG4gICAgICAgIG1bMV0gPSBhbVsxXSArIChibVsxXSAqIHNjYWxlKTtcclxuICAgICAgICBtWzJdID0gYW1bMl0gKyAoYm1bMl0gKiBzY2FsZSk7XHJcbiAgICAgICAgbVszXSA9IGFtWzNdICsgKGJtWzNdICogc2NhbGUpO1xyXG4gICAgICAgIG1bNF0gPSBhbVs0XSArIChibVs0XSAqIHNjYWxlKTtcclxuICAgICAgICBtWzVdID0gYW1bNV0gKyAoYm1bNV0gKiBzY2FsZSk7XHJcbiAgICAgICAgbVs2XSA9IGFtWzZdICsgKGJtWzZdICogc2NhbGUpO1xyXG4gICAgICAgIG1bN10gPSBhbVs3XSArIChibVs3XSAqIHNjYWxlKTtcclxuICAgICAgICBtWzhdID0gYW1bOF0gKyAoYm1bOF0gKiBzY2FsZSk7XHJcbiAgICAgICAgbVs5XSA9IGFtWzldICsgKGJtWzldICogc2NhbGUpO1xyXG4gICAgICAgIG1bMTBdID0gYW1bMTBdICsgKGJtWzEwXSAqIHNjYWxlKTtcclxuICAgICAgICBtWzExXSA9IGFtWzExXSArIChibVsxMV0gKiBzY2FsZSk7XHJcbiAgICAgICAgbVsxMl0gPSBhbVsxMl0gKyAoYm1bMTJdICogc2NhbGUpO1xyXG4gICAgICAgIG1bMTNdID0gYW1bMTNdICsgKGJtWzEzXSAqIHNjYWxlKTtcclxuICAgICAgICBtWzE0XSA9IGFtWzE0XSArIChibVsxNF0gKiBzY2FsZSk7XHJcbiAgICAgICAgbVsxNV0gPSBhbVsxNV0gKyAoYm1bMTVdICogc2NhbGUpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOefqemYteetieS7t+WIpOaWrVxyXG4gICAgICogISNlbiBBbmFseXppbmcgdGhlIGVxdWl2YWxlbnQgbWF0cml4XHJcbiAgICAgKiBAbWV0aG9kIHN0cmljdEVxdWFsc1xyXG4gICAgICogQHJldHVybiB7Ym9vbH1cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBib29sZWFuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tO1xyXG4gICAgICAgIHJldHVybiBhbVswXSA9PT0gYm1bMF0gJiYgYW1bMV0gPT09IGJtWzFdICYmIGFtWzJdID09PSBibVsyXSAmJiBhbVszXSA9PT0gYm1bM10gJiZcclxuICAgICAgICAgICAgYW1bNF0gPT09IGJtWzRdICYmIGFtWzVdID09PSBibVs1XSAmJiBhbVs2XSA9PT0gYm1bNl0gJiYgYW1bN10gPT09IGJtWzddICYmXHJcbiAgICAgICAgICAgIGFtWzhdID09PSBibVs4XSAmJiBhbVs5XSA9PT0gYm1bOV0gJiYgYW1bMTBdID09PSBibVsxMF0gJiYgYW1bMTFdID09PSBibVsxMV0gJiZcclxuICAgICAgICAgICAgYW1bMTJdID09PSBibVsxMl0gJiYgYW1bMTNdID09PSBibVsxM10gJiYgYW1bMTRdID09PSBibVsxNF0gJiYgYW1bMTVdID09PSBibVsxNV07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaOkumZpOa1rueCueaVsOivr+W3rueahOefqemYtei/keS8vOetieS7t+WIpOaWrVxyXG4gICAgICogISNlbiBOZWdhdGl2ZSBmbG9hdGluZyBwb2ludCBlcnJvciBpcyBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnQgdG8gZGV0ZXJtaW5pbmcgYSBtYXRyaXhcclxuICAgICAqIEBtZXRob2QgZXF1YWxzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZXF1YWxzPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG5cclxuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzBdIC0gYm1bMF0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzBdKSwgTWF0aC5hYnMoYm1bMF0pKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhbVsxXSAtIGJtWzFdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVsxXSksIE1hdGguYWJzKGJtWzFdKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bMl0gLSBibVsyXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMl0pLCBNYXRoLmFicyhibVsyXSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzNdIC0gYm1bM10pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzNdKSwgTWF0aC5hYnMoYm1bM10pKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhbVs0XSAtIGJtWzRdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVs0XSksIE1hdGguYWJzKGJtWzRdKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bNV0gLSBibVs1XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bNV0pLCBNYXRoLmFicyhibVs1XSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzZdIC0gYm1bNl0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzZdKSwgTWF0aC5hYnMoYm1bNl0pKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhbVs3XSAtIGJtWzddKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVs3XSksIE1hdGguYWJzKGJtWzddKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bOF0gLSBibVs4XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bOF0pLCBNYXRoLmFicyhibVs4XSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzldIC0gYm1bOV0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzldKSwgTWF0aC5hYnMoYm1bOV0pKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhbVsxMF0gLSBibVsxMF0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzEwXSksIE1hdGguYWJzKGJtWzEwXSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzExXSAtIGJtWzExXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTFdKSwgTWF0aC5hYnMoYm1bMTFdKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bMTJdIC0gYm1bMTJdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVsxMl0pLCBNYXRoLmFicyhibVsxMl0pKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhbVsxM10gLSBibVsxM10pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzEzXSksIE1hdGguYWJzKGJtWzEzXSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzE0XSAtIGJtWzE0XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTRdKSwgTWF0aC5hYnMoYm1bMTRdKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bMTVdIC0gYm1bMTVdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVsxNV0pLCBNYXRoLmFicyhibVsxNV0pKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IGEgLSBNYXRyaXggdG8gY2FsY3VsYXRlLlxyXG4gICAgICogQHJldHVybnMge01hdDR9IG91dC5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkam9pbnQgKG91dCwgYSkge1xyXG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xyXG4gICAgICAgIGxldCBhMDAgPSBhbVswXSwgYTAxID0gYW1bMV0sIGEwMiA9IGFtWzJdLCBhMDMgPSBhbVszXSxcclxuICAgICAgICAgICAgYTEwID0gYW1bNF0sIGExMSA9IGFtWzVdLCBhMTIgPSBhbVs2XSwgYTEzID0gYW1bN10sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzhdLCBhMjEgPSBhbVs5XSwgYTIyID0gYW1bMTBdLCBhMjMgPSBhbVsxMV0sXHJcbiAgICAgICAgICAgIGEzMCA9IGFtWzEyXSwgYTMxID0gYW1bMTNdLCBhMzIgPSBhbVsxNF0sIGEzMyA9IGFtWzE1XTtcclxuXHJcbiAgICAgICAgb3V0bVswXSA9IChhMTEgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMSAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMxICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xyXG4gICAgICAgIG91dG1bMV0gPSAtKGEwMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzEgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XHJcbiAgICAgICAgb3V0bVsyXSA9IChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xyXG4gICAgICAgIG91dG1bM10gPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XHJcbiAgICAgICAgb3V0bVs0XSA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcclxuICAgICAgICBvdXRtWzVdID0gKGEwMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XHJcbiAgICAgICAgb3V0bVs2XSA9IC0oYTAwICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgLSBhMTAgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcclxuICAgICAgICBvdXRtWzddID0gKGEwMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTEwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XHJcbiAgICAgICAgb3V0bVs4XSA9IChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xyXG4gICAgICAgIG91dG1bOV0gPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XHJcbiAgICAgICAgb3V0bVsxMF0gPSAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcclxuICAgICAgICBvdXRtWzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcclxuICAgICAgICBvdXRtWzEyXSA9IC0oYTEwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSArIGEzMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpKTtcclxuICAgICAgICBvdXRtWzEzXSA9IChhMDAgKiAoYTIxICogYTMyIC0gYTIyICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkpO1xyXG4gICAgICAgIG91dG1bMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xyXG4gICAgICAgIG91dG1bMTVdID0gKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg55+p6Zi16L2s5pWw57uEXHJcbiAgICAgKiAhI2VuIE1hdHJpeCB0cmFuc3Bvc2UgYXJyYXlcclxuICAgICAqIEBtZXRob2QgdG9BcnJheVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIG1hdDogSU1hdDRMaWtlLCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE5YaF55qE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b0FycmF5PE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIG1hdDogSU1hdDRMaWtlLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgICAgICAgICAgb3V0W29mcyArIGldID0gbVtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5pWw57uE6L2s55+p6Zi1XHJcbiAgICAgKiAhI2VuIFRyYW5zZmVyIG1hdHJpeCBhcnJheVxyXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQXJyYXk8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcyA9IDApIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xyXG4gICAgICAgICAgICBtW2ldID0gYXJyW29mcyArIGldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNYXRyaXggRGF0YVxyXG4gICAgICogISN6aCDnn6npmLXmlbDmja5cclxuICAgICAqIEBwcm9wZXJ0eSB7RmxvYXQ2NEFycmF5IHwgRmxvYXQzMkFycmF5fSBtXHJcbiAgICAgKi9cclxuICAgIG06IEZsb2F0QXJyYXk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29uc3RydWN0b3JcclxuICAgICAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy9tYXQ0Om1ldGhvZFwifX1jYy5tYXQ0e3svY3Jvc3NMaW5rfX1cclxuICAgICAqICEjemhcclxuICAgICAqIOaehOmAoOWHveaVsO+8jOWPr+afpeeciyB7eyNjcm9zc0xpbmsgXCJjYy9tYXQ0Om1ldGhvZFwifX1jYy5tYXQ0e3svY3Jvc3NMaW5rfX1cclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb25zdHJ1Y3RvciAoIG0wMD86IG51bWJlciwgbTAxPzogbnVtYmVyLCBtMDI/OiBudW1iZXIsIG0wMz86IG51bWJlciwgbTEwPzogbnVtYmVyLCBtMTE/OiBudW1iZXIsIG0xMj86IG51bWJlciwgbTEzPzogbnVtYmVyLCBtMjA/OiBudW1iZXIsIG0yMT86IG51bWJlciwgbTIyPzogbnVtYmVyLCBtMjM/OiBudW1iZXIsIG0zMD86IG51bWJlciwgbTMxPzogbnVtYmVyLCBtMzI/OiBudW1iZXIsIG0zMz86IG51bWJlcilcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKFxyXG4gICAgICAgIG0wMDogbnVtYmVyIHwgRmxvYXRBcnJheSA9IDEsIG0wMTogbnVtYmVyID0gMCwgbTAyOiBudW1iZXIgPSAwLCBtMDM6IG51bWJlciA9IDAsXHJcbiAgICAgICAgbTEwOiBudW1iZXIgPSAwLCBtMTE6IG51bWJlciA9IDEsIG0xMjogbnVtYmVyID0gMCwgbTEzOiBudW1iZXIgPSAwLFxyXG4gICAgICAgIG0yMDogbnVtYmVyID0gMCwgbTIxOiBudW1iZXIgPSAwLCBtMjI6IG51bWJlciA9IDEsIG0yMzogbnVtYmVyID0gMCxcclxuICAgICAgICBtMzA6IG51bWJlciA9IDAsIG0zMTogbnVtYmVyID0gMCwgbTMyOiBudW1iZXIgPSAwLCBtMzM6IG51bWJlciA9IDEpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmIChtMDAgaW5zdGFuY2VvZiBGTE9BVF9BUlJBWV9UWVBFKSB7XHJcbiAgICAgICAgICAgIHRoaXMubSA9IG0wMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm0gPSBuZXcgRkxPQVRfQVJSQVlfVFlQRSgxNik7XHJcbiAgICAgICAgICAgIGxldCB0bSA9IHRoaXMubTtcclxuICAgICAgICAgICAgdG1bMF0gPSBtMDAgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICB0bVsxXSA9IG0wMTtcclxuICAgICAgICAgICAgdG1bMl0gPSBtMDI7XHJcbiAgICAgICAgICAgIHRtWzNdID0gbTAzO1xyXG4gICAgICAgICAgICB0bVs0XSA9IG0xMDtcclxuICAgICAgICAgICAgdG1bNV0gPSBtMTE7XHJcbiAgICAgICAgICAgIHRtWzZdID0gbTEyO1xyXG4gICAgICAgICAgICB0bVs3XSA9IG0xMztcclxuICAgICAgICAgICAgdG1bOF0gPSBtMjA7XHJcbiAgICAgICAgICAgIHRtWzldID0gbTIxO1xyXG4gICAgICAgICAgICB0bVsxMF0gPSBtMjI7XHJcbiAgICAgICAgICAgIHRtWzExXSA9IG0yMztcclxuICAgICAgICAgICAgdG1bMTJdID0gbTMwO1xyXG4gICAgICAgICAgICB0bVsxM10gPSBtMzE7XHJcbiAgICAgICAgICAgIHRtWzE0XSA9IG0zMjtcclxuICAgICAgICAgICAgdG1bMTVdID0gbTMzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gY2xvbmUgYSBNYXQ0IG9iamVjdFxyXG4gICAgICogISN6aCDlhYvpmobkuIDkuKogTWF0NCDlr7nosaFcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEByZXR1cm4ge01hdDR9XHJcbiAgICAgKi9cclxuICAgIGNsb25lICgpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRtID0gdC5tO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0NChcclxuICAgICAgICAgICAgdG1bMF0sIHRtWzFdLCB0bVsyXSwgdG1bM10sXHJcbiAgICAgICAgICAgIHRtWzRdLCB0bVs1XSwgdG1bNl0sIHRtWzddLFxyXG4gICAgICAgICAgICB0bVs4XSwgdG1bOV0sIHRtWzEwXSwgdG1bMTFdLFxyXG4gICAgICAgICAgICB0bVsxMl0sIHRtWzEzXSwgdG1bMTRdLCB0bVsxNV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIHRoZSBtYXRyaXggd2l0aCBhbm90aGVyIG9uZSdzIHZhbHVlXHJcbiAgICAgKiAhI3poIOeUqOWPpuS4gOS4quefqemYteiuvue9rui/meS4quefqemYteeahOWAvOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gc3JjT2JqXHJcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgc2V0IChzKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0bSA9IHQubSwgc20gPSBzLm07XHJcbiAgICAgICAgdG1bMF0gPSBzbVswXTtcclxuICAgICAgICB0bVsxXSA9IHNtWzFdO1xyXG4gICAgICAgIHRtWzJdID0gc21bMl07XHJcbiAgICAgICAgdG1bM10gPSBzbVszXTtcclxuICAgICAgICB0bVs0XSA9IHNtWzRdO1xyXG4gICAgICAgIHRtWzVdID0gc21bNV07XHJcbiAgICAgICAgdG1bNl0gPSBzbVs2XTtcclxuICAgICAgICB0bVs3XSA9IHNtWzddO1xyXG4gICAgICAgIHRtWzhdID0gc21bOF07XHJcbiAgICAgICAgdG1bOV0gPSBzbVs5XTtcclxuICAgICAgICB0bVsxMF0gPSBzbVsxMF07XHJcbiAgICAgICAgdG1bMTFdID0gc21bMTFdO1xyXG4gICAgICAgIHRtWzEyXSA9IHNtWzEyXTtcclxuICAgICAgICB0bVsxM10gPSBzbVsxM107XHJcbiAgICAgICAgdG1bMTRdID0gc21bMTRdO1xyXG4gICAgICAgIHRtWzE1XSA9IHNtWzE1XTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0d28gbWF0cml4IGVxdWFsXHJcbiAgICAgKiAhI3poIOW9k+WJjeeahOefqemYteaYr+WQpuS4juaMh+WumueahOefqemYteebuOetieOAglxyXG4gICAgICogQG1ldGhvZCBlcXVhbHNcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGVxdWFscyAob3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gTWF0NC5zdHJpY3RFcXVhbHModGhpcywgb3RoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHR3byBtYXRyaXggZXF1YWwgd2l0aCBkZWZhdWx0IGRlZ3JlZSBvZiB2YXJpYW5jZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/keS8vOWIpOaWreS4pOS4quefqemYteaYr+WQpuebuOetieOAgjxici8+XHJcbiAgICAgKiDliKTmlq0gMiDkuKrnn6npmLXmmK/lkKblnKjpu5jorqTor6/lt67ojIPlm7TkuYvlhoXvvIzlpoLmnpzlnKjliJnov5Tlm54gdHJ1Ze+8jOWPjeS5i+WImei/lOWbniBmYWxzZeOAglxyXG4gICAgICogQG1ldGhvZCBmdXp6eUVxdWFsc1xyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlclxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZnV6enlFcXVhbHMgKG90aGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuZXF1YWxzKHRoaXMsIG90aGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVHJhbnNmb3JtIHRvIHN0cmluZyB3aXRoIG1hdHJpeCBpbmZvcm1hdGlvbnNcclxuICAgICAqICEjemgg6L2s5o2i5Li65pa55L6/6ZiF6K+755qE5a2X56ym5Liy44CCXHJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRvU3RyaW5nICgpIHtcclxuICAgICAgICBsZXQgdG0gPSB0aGlzLm07XHJcbiAgICAgICAgaWYgKHRtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIltcXG5cIiArXHJcbiAgICAgICAgICAgICAgICB0bVswXSArIFwiLCBcIiArIHRtWzFdICsgXCIsIFwiICsgdG1bMl0gKyBcIiwgXCIgKyB0bVszXSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgIHRtWzRdICsgXCIsIFwiICsgdG1bNV0gKyBcIiwgXCIgKyB0bVs2XSArIFwiLCBcIiArIHRtWzddICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgdG1bOF0gKyBcIiwgXCIgKyB0bVs5XSArIFwiLCBcIiArIHRtWzEwXSArIFwiLCBcIiArIHRtWzExXSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgIHRtWzEyXSArIFwiLCBcIiArIHRtWzEzXSArIFwiLCBcIiArIHRtWzE0XSArIFwiLCBcIiArIHRtWzE1XSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJdXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiW1xcblwiICtcclxuICAgICAgICAgICAgICAgIFwiMSwgMCwgMCwgMFxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiMCwgMSwgMCwgMFxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiMCwgMCwgMSwgMFxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiMCwgMCwgMCwgMVxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiXVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbWF0cml4IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcclxuICAgICAqIEBtZXRob2QgaWRlbnRpdHlcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBzZWxmXHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGlkZW50aXR5ICgpOiB0aGlzIHtcclxuICAgICAgICByZXR1cm4gTWF0NC5pZGVudGl0eSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxyXG4gICAgICogQG1ldGhvZCB0cmFuc3Bvc2VcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gb3V0XHJcbiAgICAgKi9cclxuICAgIHRyYW5zcG9zZSAob3V0KSB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQudHJhbnNwb3NlKG91dCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnZlcnRzIGEgbWF0NFxyXG4gICAgICogQG1ldGhvZCBpbnZlcnRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gb3V0XHJcbiAgICAgKi9cclxuICAgIGludmVydCAob3V0KSB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuaW52ZXJ0KG91dCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdDRcclxuICAgICAqIEBtZXRob2QgYWRqb2ludFxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZC5cclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgYWRqb2ludCAob3V0KSB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuYWRqb2ludChvdXQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQ0XHJcbiAgICAgKiBAbWV0aG9kIGRldGVybWluYW50XHJcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXHJcbiAgICAgKi9cclxuICAgIGRldGVybWluYW50ICgpIHtcclxuICAgICAgICByZXR1cm4gTWF0NC5kZXRlcm1pbmFudCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdHdvIE1hdDRcclxuICAgICAqIEBtZXRob2QgYWRkXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG90aGVyIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZC5cclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgYWRkIChvdGhlciwgb3V0KSB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuYWRkKG91dCwgdGhpcywgb3RoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3VidHJhY3RzIHRoZSBjdXJyZW50IG1hdHJpeCB3aXRoIGFub3RoZXIgb25lXHJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG90aGVyIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gICAgICogQHJldHVybnMge01hdDR9IHRoaXNcclxuICAgICAqL1xyXG4gICAgc3VidHJhY3QgKG90aGVyKTogdGhpcyB7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuc3VidHJhY3QodGhpcywgdGhpcywgb3RoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3VidHJhY3RzIHRoZSBjdXJyZW50IG1hdHJpeCB3aXRoIGFub3RoZXIgb25lXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG90aGVyIHRoZSBzZWNvbmQgb3BlcmFuZFxyXG4gICAgICogQHJldHVybnMge01hdDR9IHRoaXNcclxuICAgICAqL1xyXG4gICAgbXVsdGlwbHkgKG90aGVyKTogdGhpcyB7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQubXVsdGlwbHkodGhpcywgdGhpcywgb3RoZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtYmVyIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGlzXHJcbiAgICAgKi9cclxuICAgIG11bHRpcGx5U2NhbGFyIChudW1iZXIpOiB0aGlzIHtcclxuICAgICAgICByZXR1cm4gTWF0NC5tdWx0aXBseVNjYWxhcih0aGlzLCB0aGlzLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zbGF0ZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlICh2LCBvdXQpIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IE1hdDQoKTtcclxuICAgICAgICByZXR1cm4gTWF0NC50cmFuc2xhdGUob3V0LCB0aGlzLCB2KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjM1xyXG4gICAgICogQG1ldGhvZCBzY2FsZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2IHZlY3RvciB0byBzY2FsZSBieVxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxyXG4gICAgICovXHJcbiAgICBzY2FsZSAodiwgb3V0KSB7XHJcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgcmV0dXJuIE1hdDQuc2NhbGUob3V0LCB0aGlzLCB2KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcclxuICAgICAqIEBtZXRob2Qgcm90YXRlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWRcclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgcm90YXRlIChyYWQsIGF4aXMsIG91dCkge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgTWF0NCgpO1xyXG4gICAgICAgIHJldHVybiBNYXQ0LnJvdGF0ZShvdXQsIHRoaXMsIHJhZCwgYXhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSB0cmFuc2xhdGlvbiB2ZWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxyXG4gICAgICogQG1ldGhvZCBnZXRUcmFuc2xhdGlvblxyXG4gICAgICogQHBhcmFtICB7VmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHRyYW5zbGF0aW9uIGNvbXBvbmVudCwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjM30gb3V0XHJcbiAgICAgKi9cclxuICAgIGdldFRyYW5zbGF0aW9uIChvdXQpIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcclxuICAgICAgICByZXR1cm4gTWF0NC5nZXRUcmFuc2xhdGlvbihvdXQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgc2NhbGUgZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeFxyXG4gICAgICogQG1ldGhvZCBnZXRTY2FsZVxyXG4gICAgICogQHBhcmFtICB7VmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxlIGNvbXBvbmVudCwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7VmVjM30gb3V0XHJcbiAgICAgKi9cclxuICAgIGdldFNjYWxlIChvdXQpIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcclxuICAgICAgICByZXR1cm4gTWF0NC5nZXRTY2FsaW5nKG91dCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByb3RhdGlvbiBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4XHJcbiAgICAgKiBAbWV0aG9kIGdldFJvdGF0aW9uXHJcbiAgICAgKiBAcGFyYW0gIHtRdWF0fSBvdXQgVmVjdG9yIHRvIHJlY2VpdmUgcm90YXRpb24gY29tcG9uZW50LCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHF1YXRlcm5pb24gb2JqZWN0IHdpbGwgYmUgY3JlYXRlZFxyXG4gICAgICogQHJldHVybiB7UXVhdH0gb3V0XHJcbiAgICAgKi9cclxuICAgIGdldFJvdGF0aW9uIChvdXQpIHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFF1YXQoKTtcclxuICAgICAgICByZXR1cm4gTWF0NC5nZXRSb3RhdGlvbihvdXQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzdG9yZSB0aGUgbWF0cml4IHZhbHVlcyBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGVcclxuICAgICAqIEBtZXRob2QgZnJvbVJUU1xyXG4gICAgICogQHBhcmFtIHtRdWF0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICAgICAqIEBwYXJhbSB7VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcclxuICAgICAqIEBwYXJhbSB7VmVjM30gcyBTY2FsaW5nIHZlY3RvclxyXG4gICAgICogQHJldHVybnMge01hdDR9IHRoZSBjdXJyZW50IG1hdDQgb2JqZWN0XHJcbiAgICAgKiBAY2hhaW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGZyb21SVFMgKHEsIHYsIHMpOiB0aGlzIHtcclxuICAgICAgICByZXR1cm4gTWF0NC5mcm9tUlRTKHRoaXMsIHEsIHYsIHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzdG9yZSB0aGUgbWF0cml4IHZhbHVlcyBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvblxyXG4gICAgICogQG1ldGhvZCBmcm9tUXVhdFxyXG4gICAgICogQHBhcmFtIHtRdWF0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGUgY3VycmVudCBtYXQ0IG9iamVjdFxyXG4gICAgICogQGNoYWluYWJsZVxyXG4gICAgICovXHJcbiAgICBmcm9tUXVhdCAocXVhdCk6IHRoaXMge1xyXG4gICAgICAgIHJldHVybiBNYXQ0LmZyb21RdWF0KHRoaXMsIHF1YXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB2M18xOiBWZWMzID0gbmV3IFZlYzMoKTtcclxuY29uc3QgbTNfMTogTWF0MyA9IG5ldyBNYXQzKCk7XHJcblxyXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLk1hdDQnLCBNYXQ0LCB7XHJcbiAgICBtMDA6IDEsIG0wMTogMCwgbTAyOiAwLCBtMDM6IDAsXHJcbiAgICBtMDQ6IDAsIG0wNTogMSwgbTA2OiAwLCBtMDc6IDAsXHJcbiAgICBtMDg6IDAsIG0wOTogMCwgbTEwOiAxLCBtMTE6IDAsXHJcbiAgICBtMTI6IDAsIG0xMzogMCwgbTE0OiAwLCBtMTU6IDFcclxufSk7XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXQ0LnByb3RvdHlwZSwgJ20nICsgaSwge1xyXG4gICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1baV07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubVtpXSA9IHZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgY29udmVuaWVuY2UgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyB7eyNjcm9zc0xpbmsgXCJNYXQ0XCJ9fWNjLk1hdDR7ey9jcm9zc0xpbmt9fS5cclxuICogISN6aCDpgJrov4for6XnroDkvr/nmoTlh73mlbDov5vooYzliJvlu7oge3sjY3Jvc3NMaW5rIFwiTWF0NFwifX1jYy5NYXQ0e3svY3Jvc3NMaW5rfX0g5a+56LGh44CCXHJcbiAqIEBtZXRob2QgbWF0NFxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20wMF0gQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcclxuICogQHBhcmFtIHtOdW1iZXJ9IFttMDFdIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTAyXSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20wM10gQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcclxuICogQHBhcmFtIHtOdW1iZXJ9IFttMTBdIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTExXSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20xMl0gQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcclxuICogQHBhcmFtIHtOdW1iZXJ9IFttMTNdIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTIwXSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20yMV0gQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcclxuICogQHBhcmFtIHtOdW1iZXJ9IFttMjJdIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20yM10gQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTMwXSBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcclxuICogQHBhcmFtIHtOdW1iZXJ9IFttMzFdIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW20zMl0gQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTMzXSBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcclxuICogQHJldHVybiB7TWF0NH1cclxuICovXHJcbmNjLm1hdDQgPSBmdW5jdGlvbiAobTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XHJcbiAgICBsZXQgbWF0ID0gbmV3IE1hdDQobTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKTtcclxuICAgIGlmIChtMDAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIE1hdDQuaWRlbnRpdHkobWF0KTtcclxuICAgIH1cclxuICAgIHJldHVybiBtYXQ7XHJcbn07XHJcblxyXG5jYy5NYXQ0ID0gTWF0NDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=