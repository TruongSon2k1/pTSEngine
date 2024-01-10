
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/mat3.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../value-types/utils");

var _vec = _interopRequireDefault(require("./vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Mathematical 3x3 matrix.
 *
 * NOTE: we use column-major matrix for all matrix calculation.
 *
 * This may lead to some confusion when referencing OpenGL documentation,
 * however, which represents out all matricies in column-major format.
 * This means that while in code a matrix may be typed out as:
 *
 * [1, 0, 0, 0,
 *  0, 1, 0, 0,
 *  0, 0, 1, 0,
 *  x, y, z, 0]
 *
 * The same matrix in the [OpenGL documentation](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)
 * is written as:
 *
 *  1 0 0 x
 *  0 1 0 y
 *  0 0 1 z
 *  0 0 0 0
 *
 * Please rest assured, however, that they are the same thing!
 * This is not unique to glMatrix, either, as OpenGL developers have long been confused by the
 * apparent lack of consistency between the memory layout and the documentation.
 *
 * @class Mat3
 * @extends ValueType
 */
var Mat3 = /*#__PURE__*/function () {
  /**
   * Identity  of Mat3
   * @property {Mat3} IDENTITY
   * @static
   */

  /**
   * Creates a matrix, with elements specified separately.
   *
   * @param {Number} m00 - Value assigned to element at column 0 row 0.
   * @param {Number} m01 - Value assigned to element at column 0 row 1.
   * @param {Number} m02 - Value assigned to element at column 0 row 2.
   * @param {Number} m03 - Value assigned to element at column 1 row 0.
   * @param {Number} m04 - Value assigned to element at column 1 row 1.
   * @param {Number} m05 - Value assigned to element at column 1 row 2.
   * @param {Number} m06 - Value assigned to element at column 2 row 0.
   * @param {Number} m07 - Value assigned to element at column 2 row 1.
   * @param {Number} m08 - Value assigned to element at column 2 row 2.
   * @returns {Mat3} The newly created matrix.
   * @static
   */
  Mat3.create = function create(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
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

    if (m04 === void 0) {
      m04 = 1;
    }

    if (m05 === void 0) {
      m05 = 0;
    }

    if (m06 === void 0) {
      m06 = 0;
    }

    if (m07 === void 0) {
      m07 = 0;
    }

    if (m08 === void 0) {
      m08 = 1;
    }

    return new Mat3(m00, m01, m02, m03, m04, m05, m06, m07, m08);
  }
  /**
   * Clone a matrix.
   *
   * @param {Mat3} a - Matrix to clone.
   * @returns {Mat3} The newly created matrix.
   * @static
   */
  ;

  Mat3.clone = function clone(a) {
    var am = a.m;
    return new Mat3(am[0], am[1], am[2], am[3], am[4], am[5], am[6], am[7], am[8]);
  }
  /**
   * Copy content of a matrix into another.
   *
   * @param {Mat3} out - Matrix to modified.
   * @param {Mat3} a - The specified matrix.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.copy = function copy(out, a) {
    out.m.set(a.m);
    return out;
  }
  /**
   * Sets the elements of a matrix to the given values.
   *
   * @param {Mat3} out - The matrix to modified.
   * @param {Number} m00 - Value assigned to element at column 0 row 0.
   * @param {Number} m01 - Value assigned to element at column 0 row 1.
   * @param {Number} m02 - Value assigned to element at column 0 row 2.
   * @param {Number} m10 - Value assigned to element at column 1 row 0.
   * @param {Number} m11 - Value assigned to element at column 1 row 1.
   * @param {Number} m12 - Value assigned to element at column 1 row 2.
   * @param {Number} m20 - Value assigned to element at column 2 row 0.
   * @param {Number} m21 - Value assigned to element at column 2 row 1.
   * @param {Number} m22 - Value assigned to element at column 2 row 2.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.set = function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var outm = out.m;
    outm[0] = m00;
    outm[1] = m01;
    outm[2] = m02;
    outm[3] = m10;
    outm[4] = m11;
    outm[5] = m12;
    outm[6] = m20;
    outm[7] = m21;
    outm[8] = m22;
    return out;
  }
  /**
   * return an identity matrix.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.identity = function identity(out) {
    var outm = out.m;
    outm[0] = 1;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = 1;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Transposes a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to transpose.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.transpose = function transpose(out, a) {
    var am = a.m,
        outm = out.m; // If we are transposing ourselves we can skip a few steps but have to cache some values

    if (out === a) {
      var a01 = am[1],
          a02 = am[2],
          a12 = am[5];
      outm[1] = am[3];
      outm[2] = am[6];
      outm[3] = a01;
      outm[5] = am[7];
      outm[6] = a02;
      outm[7] = a12;
    } else {
      outm[0] = am[0];
      outm[1] = am[3];
      outm[2] = am[6];
      outm[3] = am[1];
      outm[4] = am[4];
      outm[5] = am[7];
      outm[6] = am[2];
      outm[7] = am[5];
      outm[8] = am[8];
    }

    return out;
  }
  /**
   * Inverts a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to invert.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.invert = function invert(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return out;
    }

    det = 1.0 / det;
    outm[0] = b01 * det;
    outm[1] = (-a22 * a01 + a02 * a21) * det;
    outm[2] = (a12 * a01 - a02 * a11) * det;
    outm[3] = b11 * det;
    outm[4] = (a22 * a00 - a02 * a20) * det;
    outm[5] = (-a12 * a00 + a02 * a10) * det;
    outm[6] = b21 * det;
    outm[7] = (-a21 * a00 + a01 * a20) * det;
    outm[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to calculate.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.adjoint = function adjoint(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    outm[0] = a11 * a22 - a12 * a21;
    outm[1] = a02 * a21 - a01 * a22;
    outm[2] = a01 * a12 - a02 * a11;
    outm[3] = a12 * a20 - a10 * a22;
    outm[4] = a00 * a22 - a02 * a20;
    outm[5] = a02 * a10 - a00 * a12;
    outm[6] = a10 * a21 - a11 * a20;
    outm[7] = a01 * a20 - a00 * a21;
    outm[8] = a00 * a11 - a01 * a10;
    return out;
  }
  /**
   * Calculates the determinant of a matrix.
   *
   * @param {Mat3} a - Matrix to calculate.
   * @returns {Number} Determinant of a.
   * @static
   */
  ;

  Mat3.determinant = function determinant(a) {
    var am = a.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  /**
   * Multiply two matrices explicitly.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiply = function multiply(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b00 = bm[0],
        b01 = bm[1],
        b02 = bm[2];
    var b10 = bm[3],
        b11 = bm[4],
        b12 = bm[5];
    var b20 = bm[6],
        b21 = bm[7],
        b22 = bm[8];
    outm[0] = b00 * a00 + b01 * a10 + b02 * a20;
    outm[1] = b00 * a01 + b01 * a11 + b02 * a21;
    outm[2] = b00 * a02 + b01 * a12 + b02 * a22;
    outm[3] = b10 * a00 + b11 * a10 + b12 * a20;
    outm[4] = b10 * a01 + b11 * a11 + b12 * a21;
    outm[5] = b10 * a02 + b11 * a12 + b12 * a22;
    outm[6] = b20 * a00 + b21 * a10 + b22 * a20;
    outm[7] = b20 * a01 + b21 * a11 + b22 * a21;
    outm[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * !#en Take the first third order of the fourth order matrix and multiply by the third order matrix
   * !#zh 取四阶矩阵的前三阶，与三阶矩阵相乘
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyMat4 = function multiplyMat4(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b00 = bm[0],
        b01 = bm[1],
        b02 = bm[2];
    var b10 = bm[4],
        b11 = bm[5],
        b12 = bm[6];
    var b20 = bm[8],
        b21 = bm[9],
        b22 = bm[10];
    outm[0] = b00 * a00 + b01 * a10 + b02 * a20;
    outm[1] = b00 * a01 + b01 * a11 + b02 * a21;
    outm[2] = b00 * a02 + b01 * a12 + b02 * a22;
    outm[3] = b10 * a00 + b11 * a10 + b12 * a20;
    outm[4] = b10 * a01 + b11 * a11 + b12 * a21;
    outm[5] = b10 * a02 + b11 * a12 + b12 * a22;
    outm[6] = b20 * a00 + b21 * a10 + b22 * a20;
    outm[7] = b20 * a01 + b21 * a11 + b22 * a21;
    outm[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * Multiply a matrix with a translation matrix given by a translation offset.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to multiply.
   * @param {vec2} v - The translation offset.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.translate = function translate(out, a, v) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var x = v.x,
        y = v.y;
    outm[0] = a00;
    outm[1] = a01;
    outm[2] = a02;
    outm[3] = a10;
    outm[4] = a11;
    outm[5] = a12;
    outm[6] = x * a00 + y * a10 + a20;
    outm[7] = x * a01 + y * a11 + a21;
    outm[8] = x * a02 + y * a12 + a22;
    return out;
  }
  /**
   * Rotates a matrix by the given angle.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to rotate.
   * @param {Number} rad - The rotation angle.
   * @returns {Mat3} out
   * @static
   */
  ;

  Mat3.rotate = function rotate(out, a, rad) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    outm[0] = c * a00 + s * a10;
    outm[1] = c * a01 + s * a11;
    outm[2] = c * a02 + s * a12;
    outm[3] = c * a10 - s * a00;
    outm[4] = c * a11 - s * a01;
    outm[5] = c * a12 - s * a02;
    outm[6] = a20;
    outm[7] = a21;
    outm[8] = a22;
    return out;
  }
  /**
   * Multiply a matrix with a scale matrix given by a scale vector.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to multiply.
   * @param {vec2} v - The scale vector.
   * @returns {Mat3} out
   **/
  ;

  Mat3.scale = function scale(out, a, v) {
    var x = v.x,
        y = v.y;
    var am = a.m,
        outm = out.m;
    outm[0] = x * am[0];
    outm[1] = x * am[1];
    outm[2] = x * am[2];
    outm[3] = y * am[3];
    outm[4] = y * am[4];
    outm[5] = y * am[5];
    outm[6] = am[6];
    outm[7] = am[7];
    outm[8] = am[8];
    return out;
  }
  /**
   * Copies the upper-left 3x3 values of a 4x4 matrix into a 3x3 matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {mat4} a - The 4x4 matrix.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromMat4 = function fromMat4(out, a) {
    var am = a.m,
        outm = out.m;
    outm[0] = am[0];
    outm[1] = am[1];
    outm[2] = am[2];
    outm[3] = am[4];
    outm[4] = am[5];
    outm[5] = am[6];
    outm[6] = am[8];
    outm[7] = am[9];
    outm[8] = am[10];
    return out;
  }
  /**
   * Creates a matrix from a translation offset.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec2} v - The translation offset.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromTranslation = function fromTranslation(out, v) {
    var outm = out.m;
    outm[0] = 1;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = 1;
    outm[5] = 0;
    outm[6] = v.x;
    outm[7] = v.y;
    outm[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Number} rad - The rotation angle.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromRotation = function fromRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    var outm = out.m;
    outm[0] = c;
    outm[1] = s;
    outm[2] = 0;
    outm[3] = -s;
    outm[4] = c;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a scale vector.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec2} v - Scale vector.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromScaling = function fromScaling(out, v) {
    var outm = out.m;
    outm[0] = v.x;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = v.y;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from the given quaternion.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {quat} q - The quaternion.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromQuat = function fromQuat(out, q) {
    var outm = out.m;
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
    outm[0] = 1 - yy - zz;
    outm[3] = yx - wz;
    outm[6] = zx + wy;
    outm[1] = yx + wz;
    outm[4] = 1 - xx - zz;
    outm[7] = zy - wx;
    outm[2] = zx - wy;
    outm[5] = zy + wx;
    outm[8] = 1 - xx - yy;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from view direction and up direction.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec3} view - View direction (must be normalized).
   * @param {vec3} [up] - Up direction, default is (0,1,0) (must be normalized).
   *
   * @returns {Mat3} out
   * @static
   */
  ;

  Mat3.fromViewUp = function fromViewUp(out, view, up) {
    var _fromViewUpIIFE = function () {
      var default_up = new _vec["default"](0, 1, 0);
      var x = new _vec["default"]();
      var y = new _vec["default"]();
      return function (out, view, up) {
        if (_vec["default"].lengthSqr(view) < _utils.EPSILON * _utils.EPSILON) {
          Mat3.identity(out);
          return out;
        }

        up = up || default_up;

        _vec["default"].normalize(x, _vec["default"].cross(x, up, view));

        if (_vec["default"].lengthSqr(x) < _utils.EPSILON * _utils.EPSILON) {
          Mat3.identity(out);
          return out;
        }

        _vec["default"].cross(y, view, x);

        Mat3.set(out, x.x, x.y, x.z, y.x, y.y, y.z, view.x, view.y, view.z);
        return out;
      };
    }();

    return _fromViewUpIIFE(out, view, up);
  }
  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {mat4} a - A 4x4 matrix to derive the normal matrix from.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.normalFromMat4 = function normalFromMat4(out, a) {
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
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return out;
    }

    det = 1.0 / det;
    outm[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    outm[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    outm[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    outm[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    outm[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    outm[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    outm[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    outm[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    outm[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  /**
   * Returns Frobenius norm of a matrix.
   *
   * @param {Mat3} a - Matrix to calculate Frobenius norm of.
   * @returns {Number} - The frobenius norm.
   * @static
   */
  ;

  Mat3.frob = function frob(a) {
    var am = a.m;
    return Math.sqrt(Math.pow(am[0], 2) + Math.pow(am[1], 2) + Math.pow(am[2], 2) + Math.pow(am[3], 2) + Math.pow(am[4], 2) + Math.pow(am[5], 2) + Math.pow(am[6], 2) + Math.pow(am[7], 2) + Math.pow(am[8], 2));
  }
  /**
   * Adds two matrices.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.add = function add(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] + bm[0];
    outm[1] = am[1] + bm[1];
    outm[2] = am[2] + bm[2];
    outm[3] = am[3] + bm[3];
    outm[4] = am[4] + bm[4];
    outm[5] = am[5] + bm[5];
    outm[6] = am[6] + bm[6];
    outm[7] = am[7] + bm[7];
    outm[8] = am[8] + bm[8];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.subtract = function subtract(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] - bm[0];
    outm[1] = am[1] - bm[1];
    outm[2] = am[2] - bm[2];
    outm[3] = am[3] - bm[3];
    outm[4] = am[4] - bm[4];
    outm[5] = am[5] - bm[5];
    outm[6] = am[6] - bm[6];
    outm[7] = am[7] - bm[7];
    outm[8] = am[8] - bm[8];
    return out;
  }
  /**
   * Multiply each element of a matrix by a scalar number.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to scale
   * @param {Number} b - The scale number.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyScalar = function multiplyScalar(out, a, b) {
    var am = a.m,
        outm = out.m;
    outm[0] = am[0] * b;
    outm[1] = am[1] * b;
    outm[2] = am[2] * b;
    outm[3] = am[3] * b;
    outm[4] = am[4] * b;
    outm[5] = am[5] * b;
    outm[6] = am[6] * b;
    outm[7] = am[7] * b;
    outm[8] = am[8] * b;
    return out;
  }
  /**
   * Adds two matrices after multiplying each element of the second operand by a scalar number.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @param {Number} scale - The scale number.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyScalarAndAdd = function multiplyScalarAndAdd(out, a, b, scale) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] + bm[0] * scale;
    outm[1] = am[1] + bm[1] * scale;
    outm[2] = am[2] + bm[2] * scale;
    outm[3] = am[3] + bm[3] * scale;
    outm[4] = am[4] + bm[4] * scale;
    outm[5] = am[5] + bm[5] * scale;
    outm[6] = am[6] + bm[6] * scale;
    outm[7] = am[7] + bm[7] * scale;
    outm[8] = am[8] + bm[8] * scale;
    return out;
  }
  /**
   * Returns whether the specified matrices are equal. (Compared using ===)
   *
   * @param {Mat3} a - The first matrix.
   * @param {Mat3} b - The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   * @static
   */
  ;

  Mat3.exactEquals = function exactEquals(a, b) {
    var am = a.m,
        bm = b.m;
    return am[0] === bm[0] && am[1] === bm[1] && am[2] === bm[2] && am[3] === bm[3] && am[4] === bm[4] && am[5] === bm[5] && am[6] === bm[6] && am[7] === bm[7] && am[8] === bm[8];
  }
  /**
   * Returns whether the specified matrices are approximately equal.
   *
   * @param {Mat3} a - The first matrix.
   * @param {Mat3} b - The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   * @static
   */
  ;

  Mat3.equals = function equals(a, b) {
    var am = a.m,
        bm = b.m;
    var a0 = am[0],
        a1 = am[1],
        a2 = am[2],
        a3 = am[3],
        a4 = am[4],
        a5 = am[5],
        a6 = am[6],
        a7 = am[7],
        a8 = am[8];
    var b0 = bm[0],
        b1 = bm[1],
        b2 = bm[2],
        b3 = bm[3],
        b4 = bm[4],
        b5 = bm[5],
        b6 = bm[6],
        b7 = bm[7],
        b8 = bm[8];
    return Math.abs(a0 - b0) <= _utils.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _utils.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _utils.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _utils.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _utils.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _utils.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _utils.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _utils.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _utils.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
  }
  /**
   * !#zh 矩阵转数组
   * !#en Matrix transpose array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, mat: IMat3Like, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Mat3.toArray = function toArray(out, mat, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = mat.m;

    for (var i = 0; i < 9; i++) {
      out[ofs + i] = m[i];
    }

    return out;
  }
  /**
   * !#zh 数组转矩阵
   * !#en Transfer matrix array
   * @method fromArray
   * @typescript
   * fromArray <Out extends IMat3Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Mat3.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = out.m;

    for (var i = 0; i < 9; i++) {
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
   * @method constructor
   * @typescript
   * constructor (m00?: number | Float32Array, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number)
   */
  function Mat3(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
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

    if (m04 === void 0) {
      m04 = 1;
    }

    if (m05 === void 0) {
      m05 = 0;
    }

    if (m06 === void 0) {
      m06 = 0;
    }

    if (m07 === void 0) {
      m07 = 0;
    }

    if (m08 === void 0) {
      m08 = 1;
    }

    this.m = void 0;

    if (m00 instanceof _utils.FLOAT_ARRAY_TYPE) {
      this.m = m00;
    } else {
      this.m = new _utils.FLOAT_ARRAY_TYPE(9);
      var m = this.m;
      /**
       * The element at column 0 row 0.
       * @type {number}
       * */

      m[0] = m00;
      /**
       * The element at column 0 row 1.
       * @type {number}
       * */

      m[1] = m01;
      /**
       * The element at column 0 row 2.
       * @type {number}
       * */

      m[2] = m02;
      /**
       * The element at column 1 row 0.
       * @type {number}
       * */

      m[3] = m03;
      /**
       * The element at column 1 row 1.
       * @type {number}
       * */

      m[4] = m04;
      /**
       * The element at column 1 row 2.
       * @type {number}
       * */

      m[5] = m05;
      /**
       * The element at column 2 row 0.
       * @type {number}
       * */

      m[6] = m06;
      /**
       * The element at column 2 row 1.
       * @type {number}
       * */

      m[7] = m07;
      /**
       * The element at column 2 row 2.
       * @type {number}
       * */

      m[8] = m08;
    }
  }
  /**
   * Returns a string representation of a matrix.
   *
   * @param {Mat3} a - The matrix.
   * @returns {String} String representation of this matrix.
   */


  var _proto = Mat3.prototype;

  _proto.toString = function toString() {
    var am = this.m;
    return "mat3(" + am[0] + ", " + am[1] + ", " + am[2] + ", " + am[3] + ", " + am[4] + ", " + am[5] + ", " + am[6] + ", " + am[7] + ", " + am[8] + ")";
  };

  return Mat3;
}();

exports["default"] = Mat3;
Mat3.sub = Mat3.subtract;
Mat3.mul = Mat3.multiply;
Mat3.IDENTITY = Object.freeze(new Mat3());
cc.Mat3 = Mat3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxtYXQzLnRzIl0sIm5hbWVzIjpbIk1hdDMiLCJjcmVhdGUiLCJtMDAiLCJtMDEiLCJtMDIiLCJtMDMiLCJtMDQiLCJtMDUiLCJtMDYiLCJtMDciLCJtMDgiLCJjbG9uZSIsImEiLCJhbSIsIm0iLCJjb3B5Iiwib3V0Iiwic2V0IiwibTEwIiwibTExIiwibTEyIiwibTIwIiwibTIxIiwibTIyIiwib3V0bSIsImlkZW50aXR5IiwidHJhbnNwb3NlIiwiYTAxIiwiYTAyIiwiYTEyIiwiaW52ZXJ0IiwiYTAwIiwiYTEwIiwiYTExIiwiYTIwIiwiYTIxIiwiYTIyIiwiYjAxIiwiYjExIiwiYjIxIiwiZGV0IiwiYWRqb2ludCIsImRldGVybWluYW50IiwibXVsdGlwbHkiLCJiIiwiYm0iLCJiMDAiLCJiMDIiLCJiMTAiLCJiMTIiLCJiMjAiLCJiMjIiLCJtdWx0aXBseU1hdDQiLCJ0cmFuc2xhdGUiLCJ2IiwieCIsInkiLCJyb3RhdGUiLCJyYWQiLCJzIiwiTWF0aCIsInNpbiIsImMiLCJjb3MiLCJzY2FsZSIsImZyb21NYXQ0IiwiZnJvbVRyYW5zbGF0aW9uIiwiZnJvbVJvdGF0aW9uIiwiZnJvbVNjYWxpbmciLCJmcm9tUXVhdCIsInEiLCJ6IiwidyIsIngyIiwieTIiLCJ6MiIsInh4IiwieXgiLCJ5eSIsInp4IiwienkiLCJ6eiIsInd4Iiwid3kiLCJ3eiIsImZyb21WaWV3VXAiLCJ2aWV3IiwidXAiLCJfZnJvbVZpZXdVcElJRkUiLCJkZWZhdWx0X3VwIiwiVmVjMyIsImxlbmd0aFNxciIsIkVQU0lMT04iLCJub3JtYWxpemUiLCJjcm9zcyIsIm5vcm1hbEZyb21NYXQ0IiwiYTAzIiwiYTEzIiwiYTIzIiwiYTMwIiwiYTMxIiwiYTMyIiwiYTMzIiwiYjAzIiwiYjA0IiwiYjA1IiwiYjA2IiwiYjA3IiwiYjA4IiwiYjA5IiwiZnJvYiIsInNxcnQiLCJwb3ciLCJhZGQiLCJzdWJ0cmFjdCIsIm11bHRpcGx5U2NhbGFyIiwibXVsdGlwbHlTY2FsYXJBbmRBZGQiLCJleGFjdEVxdWFscyIsImVxdWFscyIsImEwIiwiYTEiLCJhMiIsImEzIiwiYTQiLCJhNSIsImE2IiwiYTciLCJhOCIsImIwIiwiYjEiLCJiMiIsImIzIiwiYjQiLCJiNSIsImI2IiwiYjciLCJiOCIsImFicyIsIm1heCIsInRvQXJyYXkiLCJtYXQiLCJvZnMiLCJpIiwiZnJvbUFycmF5IiwiYXJyIiwiRkxPQVRfQVJSQVlfVFlQRSIsInRvU3RyaW5nIiwic3ViIiwibXVsIiwiSURFTlRJVFkiLCJPYmplY3QiLCJmcmVlemUiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7QUFJakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFHSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7T0FDV0MsU0FBUCxnQkFBZUMsR0FBZixFQUFnQ0MsR0FBaEMsRUFBaURDLEdBQWpELEVBQWtFQyxHQUFsRSxFQUFtRkMsR0FBbkYsRUFBb0dDLEdBQXBHLEVBQXFIQyxHQUFySCxFQUFzSUMsR0FBdEksRUFBdUpDLEdBQXZKLEVBQThLO0FBQUEsUUFBL0pSLEdBQStKO0FBQS9KQSxNQUFBQSxHQUErSixHQUFqSixDQUFpSjtBQUFBOztBQUFBLFFBQTlJQyxHQUE4STtBQUE5SUEsTUFBQUEsR0FBOEksR0FBaEksQ0FBZ0k7QUFBQTs7QUFBQSxRQUE3SEMsR0FBNkg7QUFBN0hBLE1BQUFBLEdBQTZILEdBQS9HLENBQStHO0FBQUE7O0FBQUEsUUFBNUdDLEdBQTRHO0FB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Q0FBaEMsRUFBK0M7QUFDM0MsUUFBSS9CLEVBQUUsR0FBR0QsQ0FBQyxDQUFDRSxDQUFYO0FBQUEsUUFBYytCLEVBQUUsR0FBR0QsQ0FBQyxDQUFDOUIsQ0FBckI7QUFBQSxRQUF3QlUsSUFBSSxHQUFHUixHQUFHLENBQUNGLENBQW5DO0FBQ0FVLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxDQUFDLENBQUQsQ0FBcEI7QUFDQXJCLElBQUFBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVVgsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRZ0MsRUFBRSxD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QUosRUFBZDtBQWczQnRCd0osRUFBRSxDQUFDeEosSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVBTSUxPTiwgRkxPQVRfQVJSQVlfVFlQRSB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzL3V0aWxzJztcclxuaW1wb3J0IFZlYzMgZnJvbSAnLi92ZWMzJztcclxuaW1wb3J0IFZlYzIgZnJvbSAnLi92ZWMyJztcclxuaW1wb3J0IE1hdDQgZnJvbSAnLi9tYXQ0JztcclxuaW1wb3J0IFF1YXQgZnJvbSAnLi9xdWF0JztcclxuXHJcbi8qKlxyXG4gKiBNYXRoZW1hdGljYWwgM3gzIG1hdHJpeC5cclxuICpcclxuICogTk9URTogd2UgdXNlIGNvbHVtbi1tYWpvciBtYXRyaXggZm9yIGFsbCBtYXRyaXggY2FsY3VsYXRpb24uXHJcbiAqXHJcbiAqIFRoaXMgbWF5IGxlYWQgdG8gc29tZSBjb25mdXNpb24gd2hlbiByZWZlcmVuY2luZyBPcGVuR0wgZG9jdW1lbnRhdGlvbixcclxuICogaG93ZXZlciwgd2hpY2ggcmVwcmVzZW50cyBvdXQgYWxsIG1hdHJpY2llcyBpbiBjb2x1bW4tbWFqb3IgZm9ybWF0LlxyXG4gKiBUaGlzIG1lYW5zIHRoYXQgd2hpbGUgaW4gY29kZSBhIG1hdHJpeCBtYXkgYmUgdHlwZWQgb3V0IGFzOlxyXG4gKlxyXG4gKiBbMSwgMCwgMCwgMCxcclxuICogIDAsIDEsIDAsIDAsXHJcbiAqICAwLCAwLCAxLCAwLFxyXG4gKiAgeCwgeSwgeiwgMF1cclxuICpcclxuICogVGhlIHNhbWUgbWF0cml4IGluIHRoZSBbT3BlbkdMIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L09wZW5HTC1SZWZwYWdlcy9nbDIuMS94aHRtbC9nbFRyYW5zbGF0ZS54bWwpXHJcbiAqIGlzIHdyaXR0ZW4gYXM6XHJcbiAqXHJcbiAqICAxIDAgMCB4XHJcbiAqICAwIDEgMCB5XHJcbiAqICAwIDAgMSB6XHJcbiAqICAwIDAgMCAwXHJcbiAqXHJcbiAqIFBsZWFzZSByZXN0IGFzc3VyZWQsIGhvd2V2ZXIsIHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgdGhpbmchXHJcbiAqIFRoaXMgaXMgbm90IHVuaXF1ZSB0byBnbE1hdHJpeCwgZWl0aGVyLCBhcyBPcGVuR0wgZGV2ZWxvcGVycyBoYXZlIGxvbmcgYmVlbiBjb25mdXNlZCBieSB0aGVcclxuICogYXBwYXJlbnQgbGFjayBvZiBjb25zaXN0ZW5jeSBiZXR3ZWVuIHRoZSBtZW1vcnkgbGF5b3V0IGFuZCB0aGUgZG9jdW1lbnRhdGlvbi5cclxuICpcclxuICogQGNsYXNzIE1hdDNcclxuICogQGV4dGVuZHMgVmFsdWVUeXBlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXQzIHtcclxuICAgIHN0YXRpYyBzdWIgPSBNYXQzLnN1YnRyYWN0O1xyXG4gICAgc3RhdGljIG11bCA9IE1hdDMubXVsdGlwbHk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZGVudGl0eSAgb2YgTWF0M1xyXG4gICAgICogQHByb3BlcnR5IHtNYXQzfSBJREVOVElUWVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQzKCkpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCwgd2l0aCBlbGVtZW50cyBzcGVjaWZpZWQgc2VwYXJhdGVseS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAwIHJvdyAxLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMiAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAzIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMDQgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAxIHJvdyAxLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wNSAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTA2IC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMDcgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAyIHJvdyAxLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wOCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDIuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gVGhlIG5ld2x5IGNyZWF0ZWQgbWF0cml4LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlIChtMDA6IG51bWJlciA9IDEsIG0wMTogbnVtYmVyID0gMCwgbTAyOiBudW1iZXIgPSAwLCBtMDM6IG51bWJlciA9IDAsIG0wNDogbnVtYmVyID0gMSwgbTA1OiBudW1iZXIgPSAwLCBtMDY6IG51bWJlciA9IDAsIG0wNzogbnVtYmVyID0gMCwgbTA4OiBudW1iZXIgPSAxKTogTWF0MyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXQzKG0wMCwgbTAxLCBtMDIsIG0wMywgbTA0LCBtMDUsIG0wNiwgbTA3LCBtMDgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmUgYSBtYXRyaXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIGNsb25lLlxyXG4gICAgICogQHJldHVybnMge01hdDN9IFRoZSBuZXdseSBjcmVhdGVkIG1hdHJpeC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb25lIChhOiBNYXQzKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0MyhcclxuICAgICAgICAgICAgYW1bMF0sIGFtWzFdLCBhbVsyXSxcclxuICAgICAgICAgICAgYW1bM10sIGFtWzRdLCBhbVs1XSxcclxuICAgICAgICAgICAgYW1bNl0sIGFtWzddLCBhbVs4XVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IGNvbnRlbnQgb2YgYSBtYXRyaXggaW50byBhbm90aGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIG1vZGlmaWVkLlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIHNwZWNpZmllZCBtYXRyaXguXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29weSAob3V0OiBNYXQzLCBhOiBNYXQzKTogTWF0MyB7XHJcbiAgICAgICAgb3V0Lm0uc2V0KGEubSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGVsZW1lbnRzIG9mIGEgbWF0cml4IHRvIHRoZSBnaXZlbiB2YWx1ZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBUaGUgbWF0cml4IHRvIG1vZGlmaWVkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDAuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMS5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAwIHJvdyAyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDAuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTExIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMS5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAxIHJvdyAyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDAuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMS5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgLSBWYWx1ZSBhc3NpZ25lZCB0byBlbGVtZW50IGF0IGNvbHVtbiAyIHJvdyAyLlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldCAob3V0OiBNYXQzLCBtMDA6IG51bWJlciwgbTAxOiBudW1iZXIsIG0wMjogbnVtYmVyLCBtMTA6IG51bWJlciwgbTExOiBudW1iZXIsIG0xMjogbnVtYmVyLCBtMjA6IG51bWJlciwgbTIxOiBudW1iZXIsIG0yMjogbnVtYmVyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcclxuICAgICAgICBvdXRtWzBdID0gbTAwO1xyXG4gICAgICAgIG91dG1bMV0gPSBtMDE7XHJcbiAgICAgICAgb3V0bVsyXSA9IG0wMjtcclxuICAgICAgICBvdXRtWzNdID0gbTEwO1xyXG4gICAgICAgIG91dG1bNF0gPSBtMTE7XHJcbiAgICAgICAgb3V0bVs1XSA9IG0xMjtcclxuICAgICAgICBvdXRtWzZdID0gbTIwO1xyXG4gICAgICAgIG91dG1bN10gPSBtMjE7XHJcbiAgICAgICAgb3V0bVs4XSA9IG0yMjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIGFuIGlkZW50aXR5IG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaWRlbnRpdHkgKG91dDogTWF0Myk6IE1hdDMge1xyXG4gICAgICAgIGxldCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgb3V0bVswXSA9IDE7XHJcbiAgICAgICAgb3V0bVsxXSA9IDA7XHJcbiAgICAgICAgb3V0bVsyXSA9IDA7XHJcbiAgICAgICAgb3V0bVszXSA9IDA7XHJcbiAgICAgICAgb3V0bVs0XSA9IDE7XHJcbiAgICAgICAgb3V0bVs1XSA9IDA7XHJcbiAgICAgICAgb3V0bVs2XSA9IDA7XHJcbiAgICAgICAgb3V0bVs3XSA9IDA7XHJcbiAgICAgICAgb3V0bVs4XSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zcG9zZXMgYSBtYXRyaXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIHRyYW5zcG9zZS5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0cmFuc3Bvc2UgKG91dDogTWF0MywgYTogTWF0Myk6IE1hdDMge1xyXG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xyXG4gICAgICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcclxuICAgICAgICBpZiAob3V0ID09PSBhKSB7XHJcbiAgICAgICAgICAgIGxldCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sIGExMiA9IGFtWzVdO1xyXG4gICAgICAgICAgICBvdXRtWzFdID0gYW1bM107XHJcbiAgICAgICAgICAgIG91dG1bMl0gPSBhbVs2XTtcclxuICAgICAgICAgICAgb3V0bVszXSA9IGEwMTtcclxuICAgICAgICAgICAgb3V0bVs1XSA9IGFtWzddO1xyXG4gICAgICAgICAgICBvdXRtWzZdID0gYTAyO1xyXG4gICAgICAgICAgICBvdXRtWzddID0gYTEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG91dG1bMF0gPSBhbVswXTtcclxuICAgICAgICAgICAgb3V0bVsxXSA9IGFtWzNdO1xyXG4gICAgICAgICAgICBvdXRtWzJdID0gYW1bNl07XHJcbiAgICAgICAgICAgIG91dG1bM10gPSBhbVsxXTtcclxuICAgICAgICAgICAgb3V0bVs0XSA9IGFtWzRdO1xyXG4gICAgICAgICAgICBvdXRtWzVdID0gYW1bN107XHJcbiAgICAgICAgICAgIG91dG1bNl0gPSBhbVsyXTtcclxuICAgICAgICAgICAgb3V0bVs3XSA9IGFtWzVdO1xyXG4gICAgICAgICAgICBvdXRtWzhdID0gYW1bOF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52ZXJ0cyBhIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gaW52ZXJ0LlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGludmVydCAob3V0OiBNYXQzLCBhOiBNYXQzKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXHJcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XHJcblxyXG4gICAgICAgIGxldCBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjE7XHJcbiAgICAgICAgbGV0IGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjA7XHJcbiAgICAgICAgbGV0IGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMDtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIGxldCBkZXQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XHJcblxyXG4gICAgICAgIGlmICghZGV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgb3V0bVswXSA9IGIwMSAqIGRldDtcclxuICAgICAgICBvdXRtWzFdID0gKC1hMjIgKiBhMDEgKyBhMDIgKiBhMjEpICogZGV0O1xyXG4gICAgICAgIG91dG1bMl0gPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcclxuICAgICAgICBvdXRtWzNdID0gYjExICogZGV0O1xyXG4gICAgICAgIG91dG1bNF0gPSAoYTIyICogYTAwIC0gYTAyICogYTIwKSAqIGRldDtcclxuICAgICAgICBvdXRtWzVdID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xyXG4gICAgICAgIG91dG1bNl0gPSBiMjEgKiBkZXQ7XHJcbiAgICAgICAgb3V0bVs3XSA9ICgtYTIxICogYTAwICsgYTAxICogYTIwKSAqIGRldDtcclxuICAgICAgICBvdXRtWzhdID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0cml4LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBjYWxjdWxhdGUuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRqb2ludCAob3V0OiBNYXQzLCBhOiBNYXQzKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXHJcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XHJcblxyXG4gICAgICAgIG91dG1bMF0gPSAoYTExICogYTIyIC0gYTEyICogYTIxKTtcclxuICAgICAgICBvdXRtWzFdID0gKGEwMiAqIGEyMSAtIGEwMSAqIGEyMik7XHJcbiAgICAgICAgb3V0bVsyXSA9IChhMDEgKiBhMTIgLSBhMDIgKiBhMTEpO1xyXG4gICAgICAgIG91dG1bM10gPSAoYTEyICogYTIwIC0gYTEwICogYTIyKTtcclxuICAgICAgICBvdXRtWzRdID0gKGEwMCAqIGEyMiAtIGEwMiAqIGEyMCk7XHJcbiAgICAgICAgb3V0bVs1XSA9IChhMDIgKiBhMTAgLSBhMDAgKiBhMTIpO1xyXG4gICAgICAgIG91dG1bNl0gPSAoYTEwICogYTIxIC0gYTExICogYTIwKTtcclxuICAgICAgICBvdXRtWzddID0gKGEwMSAqIGEyMCAtIGEwMCAqIGEyMSk7XHJcbiAgICAgICAgb3V0bVs4XSA9IChhMDAgKiBhMTEgLSBhMDEgKiBhMTApO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gY2FsY3VsYXRlLlxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gRGV0ZXJtaW5hbnQgb2YgYS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRldGVybWluYW50IChhOiBNYXQzKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW0gPSBhLm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXHJcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XHJcblxyXG4gICAgICAgIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVsdGlwbHkgdHdvIG1hdHJpY2VzIGV4cGxpY2l0bHkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG9wZXJhbmQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGIgLSBUaGUgc2Vjb25kIG9wZXJhbmQuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbXVsdGlwbHkgKG91dDogTWF0MywgYTogTWF0MywgYjogTWF0Myk6IE1hdDMge1xyXG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm0sIG91dG0gPSBvdXQubTtcclxuICAgICAgICBsZXQgYTAwID0gYW1bMF0sIGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSxcclxuICAgICAgICAgICAgYTEwID0gYW1bM10sIGExMSA9IGFtWzRdLCBhMTIgPSBhbVs1XSxcclxuICAgICAgICAgICAgYTIwID0gYW1bNl0sIGEyMSA9IGFtWzddLCBhMjIgPSBhbVs4XTtcclxuXHJcbiAgICAgICAgbGV0IGIwMCA9IGJtWzBdLCBiMDEgPSBibVsxXSwgYjAyID0gYm1bMl07XHJcbiAgICAgICAgbGV0IGIxMCA9IGJtWzNdLCBiMTEgPSBibVs0XSwgYjEyID0gYm1bNV07XHJcbiAgICAgICAgbGV0IGIyMCA9IGJtWzZdLCBiMjEgPSBibVs3XSwgYjIyID0gYm1bOF07XHJcblxyXG4gICAgICAgIG91dG1bMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XHJcbiAgICAgICAgb3V0bVsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcclxuICAgICAgICBvdXRtWzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xyXG5cclxuICAgICAgICBvdXRtWzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xyXG4gICAgICAgIG91dG1bNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XHJcbiAgICAgICAgb3V0bVs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcclxuXHJcbiAgICAgICAgb3V0bVs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcclxuICAgICAgICBvdXRtWzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xyXG4gICAgICAgIG91dG1bOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGFrZSB0aGUgZmlyc3QgdGhpcmQgb3JkZXIgb2YgdGhlIGZvdXJ0aCBvcmRlciBtYXRyaXggYW5kIG11bHRpcGx5IGJ5IHRoZSB0aGlyZCBvcmRlciBtYXRyaXhcclxuICAgICAqICEjemgg5Y+W5Zub6Zi255+p6Zi155qE5YmN5LiJ6Zi277yM5LiO5LiJ6Zi255+p6Zi155u45LmYXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBUaGUgZmlyc3Qgb3BlcmFuZC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYiAtIFRoZSBzZWNvbmQgb3BlcmFuZC5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtdWx0aXBseU1hdDQgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IElNYXQ0TGlrZSkge1xyXG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm0sIG91dG0gPSBvdXQubTtcclxuICAgICAgICBsZXQgYTAwID0gYW1bMF0sIGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSxcclxuICAgICAgICAgICAgYTEwID0gYW1bM10sIGExMSA9IGFtWzRdLCBhMTIgPSBhbVs1XSxcclxuICAgICAgICAgICAgYTIwID0gYW1bNl0sIGEyMSA9IGFtWzddLCBhMjIgPSBhbVs4XTtcclxuXHJcbiAgICAgICAgY29uc3QgYjAwID0gYm1bMF0sIGIwMSA9IGJtWzFdLCBiMDIgPSBibVsyXTtcclxuICAgICAgICBjb25zdCBiMTAgPSBibVs0XSwgYjExID0gYm1bNV0sIGIxMiA9IGJtWzZdO1xyXG4gICAgICAgIGNvbnN0IGIyMCA9IGJtWzhdLCBiMjEgPSBibVs5XSwgYjIyID0gYm1bMTBdO1xyXG5cclxuICAgICAgICBvdXRtWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xyXG4gICAgICAgIG91dG1bMV0gPSBiMDAgKiBhMDEgKyBiMDEgKiBhMTEgKyBiMDIgKiBhMjE7XHJcbiAgICAgICAgb3V0bVsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcclxuICAgICAgICBvdXRtWzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xyXG4gICAgICAgIG91dG1bNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XHJcbiAgICAgICAgb3V0bVs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcclxuICAgICAgICBvdXRtWzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xyXG4gICAgICAgIG91dG1bN10gPSBiMjAgKiBhMDEgKyBiMjEgKiBhMTEgKyBiMjIgKiBhMjE7XHJcbiAgICAgICAgb3V0bVs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTXVsdGlwbHkgYSBtYXRyaXggd2l0aCBhIHRyYW5zbGF0aW9uIG1hdHJpeCBnaXZlbiBieSBhIHRyYW5zbGF0aW9uIG9mZnNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gbXVsdGlwbHkuXHJcbiAgICAgKiBAcGFyYW0ge3ZlYzJ9IHYgLSBUaGUgdHJhbnNsYXRpb24gb2Zmc2V0LlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRyYW5zbGF0ZSAob3V0OiBNYXQzLCBhOiBNYXQzLCB2OiBWZWMyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXHJcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XHJcbiAgICAgICAgbGV0IHggPSB2LngsIHkgPSB2Lnk7XHJcblxyXG4gICAgICAgIG91dG1bMF0gPSBhMDA7XHJcbiAgICAgICAgb3V0bVsxXSA9IGEwMTtcclxuICAgICAgICBvdXRtWzJdID0gYTAyO1xyXG5cclxuICAgICAgICBvdXRtWzNdID0gYTEwO1xyXG4gICAgICAgIG91dG1bNF0gPSBhMTE7XHJcbiAgICAgICAgb3V0bVs1XSA9IGExMjtcclxuXHJcbiAgICAgICAgb3V0bVs2XSA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xyXG4gICAgICAgIG91dG1bN10gPSB4ICogYTAxICsgeSAqIGExMSArIGEyMTtcclxuICAgICAgICBvdXRtWzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byByb3RhdGUuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIC0gVGhlIHJvdGF0aW9uIGFuZ2xlLlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlIChvdXQ6IE1hdDMsIGE6IE1hdDMsIHJhZDogbnVtYmVyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXHJcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXHJcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XHJcblxyXG4gICAgICAgIGxldCBzID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBsZXQgYyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIG91dG1bMF0gPSBjICogYTAwICsgcyAqIGExMDtcclxuICAgICAgICBvdXRtWzFdID0gYyAqIGEwMSArIHMgKiBhMTE7XHJcbiAgICAgICAgb3V0bVsyXSA9IGMgKiBhMDIgKyBzICogYTEyO1xyXG5cclxuICAgICAgICBvdXRtWzNdID0gYyAqIGExMCAtIHMgKiBhMDA7XHJcbiAgICAgICAgb3V0bVs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xyXG4gICAgICAgIG91dG1bNV0gPSBjICogYTEyIC0gcyAqIGEwMjtcclxuXHJcbiAgICAgICAgb3V0bVs2XSA9IGEyMDtcclxuICAgICAgICBvdXRtWzddID0gYTIxO1xyXG4gICAgICAgIG91dG1bOF0gPSBhMjI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGx5IGEgbWF0cml4IHdpdGggYSBzY2FsZSBtYXRyaXggZ2l2ZW4gYnkgYSBzY2FsZSB2ZWN0b3IuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIG11bHRpcGx5LlxyXG4gICAgICogQHBhcmFtIHt2ZWMyfSB2IC0gVGhlIHNjYWxlIHZlY3Rvci5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXRcclxuICAgICAqKi9cclxuICAgIHN0YXRpYyBzY2FsZSAob3V0OiBNYXQzLCBhOiBNYXQzLCB2OiBWZWMyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IHggPSB2LngsIHkgPSB2Lnk7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcblxyXG4gICAgICAgIG91dG1bMF0gPSB4ICogYW1bMF07XHJcbiAgICAgICAgb3V0bVsxXSA9IHggKiBhbVsxXTtcclxuICAgICAgICBvdXRtWzJdID0geCAqIGFtWzJdO1xyXG5cclxuICAgICAgICBvdXRtWzNdID0geSAqIGFtWzNdO1xyXG4gICAgICAgIG91dG1bNF0gPSB5ICogYW1bNF07XHJcbiAgICAgICAgb3V0bVs1XSA9IHkgKiBhbVs1XTtcclxuXHJcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdO1xyXG4gICAgICAgIG91dG1bN10gPSBhbVs3XTtcclxuICAgICAgICBvdXRtWzhdID0gYW1bOF07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIG9mIGEgNHg0IG1hdHJpeCBpbnRvIGEgM3gzIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge21hdDR9IGEgLSBUaGUgNHg0IG1hdHJpeC5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tTWF0NCAob3V0OiBNYXQzLCBhOiBNYXQ0KTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdO1xyXG4gICAgICAgIG91dG1bMV0gPSBhbVsxXTtcclxuICAgICAgICBvdXRtWzJdID0gYW1bMl07XHJcbiAgICAgICAgb3V0bVszXSA9IGFtWzRdO1xyXG4gICAgICAgIG91dG1bNF0gPSBhbVs1XTtcclxuICAgICAgICBvdXRtWzVdID0gYW1bNl07XHJcbiAgICAgICAgb3V0bVs2XSA9IGFtWzhdO1xyXG4gICAgICAgIG91dG1bN10gPSBhbVs5XTtcclxuICAgICAgICBvdXRtWzhdID0gYW1bMTBdO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB0cmFuc2xhdGlvbiBvZmZzZXQuXHJcbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICAgICAqXHJcbiAgICAgKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcclxuICAgICAqICAgICBtYXQzLnRyYW5zbGF0ZShkZXN0LCBkZXN0LCB2ZWMpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7dmVjMn0gdiAtIFRoZSB0cmFuc2xhdGlvbiBvZmZzZXQuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVRyYW5zbGF0aW9uIChvdXQ6IE1hdDMsIHY6IFZlYzIpOiBNYXQzIHtcclxuICAgICAgICBsZXQgb3V0bSA9IG91dC5tO1xyXG4gICAgICAgIG91dG1bMF0gPSAxO1xyXG4gICAgICAgIG91dG1bMV0gPSAwO1xyXG4gICAgICAgIG91dG1bMl0gPSAwO1xyXG4gICAgICAgIG91dG1bM10gPSAwO1xyXG4gICAgICAgIG91dG1bNF0gPSAxO1xyXG4gICAgICAgIG91dG1bNV0gPSAwO1xyXG4gICAgICAgIG91dG1bNl0gPSB2Lng7XHJcbiAgICAgICAgb3V0bVs3XSA9IHYueTtcclxuICAgICAgICBvdXRtWzhdID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUuXHJcbiAgICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcclxuICAgICAqXHJcbiAgICAgKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcclxuICAgICAqICAgICBtYXQzLnJvdGF0ZShkZXN0LCBkZXN0LCByYWQpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgLSBUaGUgcm90YXRpb24gYW5nbGUuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVJvdGF0aW9uIChvdXQ6IE1hdDMsIHJhZDogbnVtYmVyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBsZXQgb3V0bSA9IG91dC5tO1xyXG5cclxuICAgICAgICBvdXRtWzBdID0gYztcclxuICAgICAgICBvdXRtWzFdID0gcztcclxuICAgICAgICBvdXRtWzJdID0gMDtcclxuXHJcbiAgICAgICAgb3V0bVszXSA9IC1zO1xyXG4gICAgICAgIG91dG1bNF0gPSBjO1xyXG4gICAgICAgIG91dG1bNV0gPSAwO1xyXG5cclxuICAgICAgICBvdXRtWzZdID0gMDtcclxuICAgICAgICBvdXRtWzddID0gMDtcclxuICAgICAgICBvdXRtWzhdID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgc2NhbGUgdmVjdG9yLlxyXG4gICAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XHJcbiAgICAgKlxyXG4gICAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XHJcbiAgICAgKiAgICAgbWF0My5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7dmVjMn0gdiAtIFNjYWxlIHZlY3Rvci5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tU2NhbGluZyAob3V0OiBNYXQzLCB2OiBWZWMyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcclxuICAgICAgICBvdXRtWzBdID0gdi54O1xyXG4gICAgICAgIG91dG1bMV0gPSAwO1xyXG4gICAgICAgIG91dG1bMl0gPSAwO1xyXG5cclxuICAgICAgICBvdXRtWzNdID0gMDtcclxuICAgICAgICBvdXRtWzRdID0gdi55O1xyXG4gICAgICAgIG91dG1bNV0gPSAwO1xyXG5cclxuICAgICAgICBvdXRtWzZdID0gMDtcclxuICAgICAgICBvdXRtWzddID0gMDtcclxuICAgICAgICBvdXRtWzhdID0gMTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXHJcbiAgICAgKiBAcGFyYW0ge3F1YXR9IHEgLSBUaGUgcXVhdGVybmlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVF1YXQgKG91dDogTWF0MywgcTogUXVhdCk6IE1hdDMge1xyXG4gICAgICAgIGxldCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IHggPSBxLngsIHkgPSBxLnksIHogPSBxLnosIHcgPSBxLnc7XHJcbiAgICAgICAgbGV0IHgyID0geCArIHg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIHk7XHJcbiAgICAgICAgbGV0IHoyID0geiArIHo7XHJcblxyXG4gICAgICAgIGxldCB4eCA9IHggKiB4MjtcclxuICAgICAgICBsZXQgeXggPSB5ICogeDI7XHJcbiAgICAgICAgbGV0IHl5ID0geSAqIHkyO1xyXG4gICAgICAgIGxldCB6eCA9IHogKiB4MjtcclxuICAgICAgICBsZXQgenkgPSB6ICogeTI7XHJcbiAgICAgICAgbGV0IHp6ID0geiAqIHoyO1xyXG4gICAgICAgIGxldCB3eCA9IHcgKiB4MjtcclxuICAgICAgICBsZXQgd3kgPSB3ICogeTI7XHJcbiAgICAgICAgbGV0IHd6ID0gdyAqIHoyO1xyXG5cclxuICAgICAgICBvdXRtWzBdID0gMSAtIHl5IC0geno7XHJcbiAgICAgICAgb3V0bVszXSA9IHl4IC0gd3o7XHJcbiAgICAgICAgb3V0bVs2XSA9IHp4ICsgd3k7XHJcblxyXG4gICAgICAgIG91dG1bMV0gPSB5eCArIHd6O1xyXG4gICAgICAgIG91dG1bNF0gPSAxIC0geHggLSB6ejtcclxuICAgICAgICBvdXRtWzddID0genkgLSB3eDtcclxuXHJcbiAgICAgICAgb3V0bVsyXSA9IHp4IC0gd3k7XHJcbiAgICAgICAgb3V0bVs1XSA9IHp5ICsgd3g7XHJcbiAgICAgICAgb3V0bVs4XSA9IDEgLSB4eCAtIHl5O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB2aWV3IGRpcmVjdGlvbiBhbmQgdXAgZGlyZWN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7dmVjM30gdmlldyAtIFZpZXcgZGlyZWN0aW9uIChtdXN0IGJlIG5vcm1hbGl6ZWQpLlxyXG4gICAgICogQHBhcmFtIHt2ZWMzfSBbdXBdIC0gVXAgZGlyZWN0aW9uLCBkZWZhdWx0IGlzICgwLDEsMCkgKG11c3QgYmUgbm9ybWFsaXplZCkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVZpZXdVcCAob3V0OiBNYXQzLCB2aWV3OiBWZWMzLCB1cD86IFZlYzMpOiBNYXQzIHtcclxuICAgICAgICBsZXQgX2Zyb21WaWV3VXBJSUZFID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRfdXAgPSBuZXcgVmVjMygwLCAxLCAwKTtcclxuICAgICAgICAgICAgbGV0IHggPSBuZXcgVmVjMygpO1xyXG4gICAgICAgICAgICBsZXQgeSA9IG5ldyBWZWMzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG91dCwgdmlldywgdXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChWZWMzLmxlbmd0aFNxcih2aWV3KSA8IEVQU0lMT04gKiBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0My5pZGVudGl0eShvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXAgPSB1cCB8fCBkZWZhdWx0X3VwO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoeCwgVmVjMy5jcm9zcyh4LCB1cCwgdmlldykpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChWZWMzLmxlbmd0aFNxcih4KSA8IEVQU0lMT04gKiBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0My5pZGVudGl0eShvdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyh5LCB2aWV3LCB4KTtcclxuICAgICAgICAgICAgICAgIE1hdDMuc2V0KFxyXG4gICAgICAgICAgICAgICAgICAgIG91dCxcclxuICAgICAgICAgICAgICAgICAgICB4LngsIHgueSwgeC56LFxyXG4gICAgICAgICAgICAgICAgICAgIHkueCwgeS55LCB5LnosXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy54LCB2aWV3LnksIHZpZXcuelxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgcmV0dXJuIF9mcm9tVmlld1VwSUlGRShvdXQsIHZpZXcsIHVwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgYSAzeDMgbm9ybWFsIG1hdHJpeCAodHJhbnNwb3NlIGludmVyc2UpIGZyb20gdGhlIDR4NCBtYXRyaXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHttYXQ0fSBhIC0gQSA0eDQgbWF0cml4IHRvIGRlcml2ZSB0aGUgbm9ybWFsIG1hdHJpeCBmcm9tLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxGcm9tTWF0NCAob3V0OiBNYXQzLCBhOiBNYXQ0KTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sIGEwMyA9IGFtWzNdLFxyXG4gICAgICAgICAgICBhMTAgPSBhbVs0XSwgYTExID0gYW1bNV0sIGExMiA9IGFtWzZdLCBhMTMgPSBhbVs3XSxcclxuICAgICAgICAgICAgYTIwID0gYW1bOF0sIGEyMSA9IGFtWzldLCBhMjIgPSBhbVsxMF0sIGEyMyA9IGFtWzExXSxcclxuICAgICAgICAgICAgYTMwID0gYW1bMTJdLCBhMzEgPSBhbVsxM10sIGEzMiA9IGFtWzE0XSwgYTMzID0gYW1bMTVdO1xyXG5cclxuICAgICAgICBsZXQgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xyXG4gICAgICAgIGxldCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XHJcbiAgICAgICAgbGV0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcclxuICAgICAgICBsZXQgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xyXG4gICAgICAgIGxldCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XHJcbiAgICAgICAgbGV0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcclxuICAgICAgICBsZXQgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xyXG4gICAgICAgIGxldCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XHJcbiAgICAgICAgbGV0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcclxuICAgICAgICBsZXQgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xyXG4gICAgICAgIGxldCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XHJcbiAgICAgICAgbGV0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxyXG4gICAgICAgIGxldCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XHJcblxyXG4gICAgICAgIGlmICghZGV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcclxuXHJcbiAgICAgICAgb3V0bVswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xyXG4gICAgICAgIG91dG1bMV0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcclxuICAgICAgICBvdXRtWzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XHJcblxyXG4gICAgICAgIG91dG1bM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcclxuICAgICAgICBvdXRtWzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XHJcbiAgICAgICAgb3V0bVs1XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xyXG5cclxuICAgICAgICBvdXRtWzZdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XHJcbiAgICAgICAgb3V0bVs3XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xyXG4gICAgICAgIG91dG1bOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXRyaXguXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZi5cclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0gVGhlIGZyb2Jlbml1cyBub3JtLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvYiAoYTogTWF0Myk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tO1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5zcXJ0KE1hdGgucG93KGFtWzBdLCAyKSArIE1hdGgucG93KGFtWzFdLCAyKSArIE1hdGgucG93KGFtWzJdLCAyKSArIE1hdGgucG93KGFtWzNdLCAyKSArIE1hdGgucG93KGFtWzRdLCAyKSArIE1hdGgucG93KGFtWzVdLCAyKSArIE1hdGgucG93KGFtWzZdLCAyKSArIE1hdGgucG93KGFtWzddLCAyKSArIE1hdGgucG93KGFtWzhdLCAyKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0d28gbWF0cmljZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG9wZXJhbmQuXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGIgLSBUaGUgc2Vjb25kIG9wZXJhbmQuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkIChvdXQ6IE1hdDMsIGE6IE1hdDMsIGI6IE1hdDMpOiBNYXQzIHtcclxuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdICsgYm1bMF07XHJcbiAgICAgICAgb3V0bVsxXSA9IGFtWzFdICsgYm1bMV07XHJcbiAgICAgICAgb3V0bVsyXSA9IGFtWzJdICsgYm1bMl07XHJcbiAgICAgICAgb3V0bVszXSA9IGFtWzNdICsgYm1bM107XHJcbiAgICAgICAgb3V0bVs0XSA9IGFtWzRdICsgYm1bNF07XHJcbiAgICAgICAgb3V0bVs1XSA9IGFtWzVdICsgYm1bNV07XHJcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdICsgYm1bNl07XHJcbiAgICAgICAgb3V0bVs3XSA9IGFtWzddICsgYm1bN107XHJcbiAgICAgICAgb3V0bVs4XSA9IGFtWzhdICsgYm1bOF07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBmaXJzdCBvcGVyYW5kLlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kLlxyXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHN1YnRyYWN0IChvdXQ6IE1hdDMsIGE6IE1hdDMsIGI6IE1hdDMpOiBNYXQzIHtcclxuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdIC0gYm1bMF07XHJcbiAgICAgICAgb3V0bVsxXSA9IGFtWzFdIC0gYm1bMV07XHJcbiAgICAgICAgb3V0bVsyXSA9IGFtWzJdIC0gYm1bMl07XHJcbiAgICAgICAgb3V0bVszXSA9IGFtWzNdIC0gYm1bM107XHJcbiAgICAgICAgb3V0bVs0XSA9IGFtWzRdIC0gYm1bNF07XHJcbiAgICAgICAgb3V0bVs1XSA9IGFtWzVdIC0gYm1bNV07XHJcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdIC0gYm1bNl07XHJcbiAgICAgICAgb3V0bVs3XSA9IGFtWzddIC0gYm1bN107XHJcbiAgICAgICAgb3V0bVs4XSA9IGFtWzhdIC0gYm1bOF07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiBhIG1hdHJpeCBieSBhIHNjYWxhciBudW1iZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIHNjYWxlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYiAtIFRoZSBzY2FsZSBudW1iZXIuXHJcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgKG91dDogTWF0MywgYTogTWF0MywgYjogbnVtYmVyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XHJcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdICogYjtcclxuICAgICAgICBvdXRtWzFdID0gYW1bMV0gKiBiO1xyXG4gICAgICAgIG91dG1bMl0gPSBhbVsyXSAqIGI7XHJcbiAgICAgICAgb3V0bVszXSA9IGFtWzNdICogYjtcclxuICAgICAgICBvdXRtWzRdID0gYW1bNF0gKiBiO1xyXG4gICAgICAgIG91dG1bNV0gPSBhbVs1XSAqIGI7XHJcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdICogYjtcclxuICAgICAgICBvdXRtWzddID0gYW1bN10gKiBiO1xyXG4gICAgICAgIG91dG1bOF0gPSBhbVs4XSAqIGI7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgdHdvIG1hdHJpY2VzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgbnVtYmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBmaXJzdCBvcGVyYW5kLlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIC0gVGhlIHNjYWxlIG51bWJlci5cclxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhckFuZEFkZCAob3V0OiBNYXQzLCBhOiBNYXQzLCBiOiBNYXQzLCBzY2FsZTogbnVtYmVyKTogTWF0MyB7XHJcbiAgICAgICAgbGV0IGFtID0gYS5tLCBibSA9IGIubSwgb3V0bSA9IG91dC5tO1xyXG4gICAgICAgIG91dG1bMF0gPSBhbVswXSArIChibVswXSAqIHNjYWxlKTtcclxuICAgICAgICBvdXRtWzFdID0gYW1bMV0gKyAoYm1bMV0gKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0bVsyXSA9IGFtWzJdICsgKGJtWzJdICogc2NhbGUpO1xyXG4gICAgICAgIG91dG1bM10gPSBhbVszXSArIChibVszXSAqIHNjYWxlKTtcclxuICAgICAgICBvdXRtWzRdID0gYW1bNF0gKyAoYm1bNF0gKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0bVs1XSA9IGFtWzVdICsgKGJtWzVdICogc2NhbGUpO1xyXG4gICAgICAgIG91dG1bNl0gPSBhbVs2XSArIChibVs2XSAqIHNjYWxlKTtcclxuICAgICAgICBvdXRtWzddID0gYW1bN10gKyAoYm1bN10gKiBzY2FsZSk7XHJcbiAgICAgICAgb3V0bVs4XSA9IGFtWzhdICsgKGJtWzhdICogc2NhbGUpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgZXF1YWwuIChDb21wYXJlZCB1c2luZyA9PT0pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG1hdHJpeC5cclxuICAgICAqIEBwYXJhbSB7TWF0M30gYiAtIFRoZSBzZWNvbmQgbWF0cml4LlxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXhhY3RFcXVhbHMgKGE6IE1hdDMsIGI6IE1hdDMpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tO1xyXG4gICAgICAgIHJldHVybiBhbVswXSA9PT0gYm1bMF0gJiYgYW1bMV0gPT09IGJtWzFdICYmIGFtWzJdID09PSBibVsyXSAmJlxyXG4gICAgICAgICAgICBhbVszXSA9PT0gYm1bM10gJiYgYW1bNF0gPT09IGJtWzRdICYmIGFtWzVdID09PSBibVs1XSAmJlxyXG4gICAgICAgICAgICBhbVs2XSA9PT0gYm1bNl0gJiYgYW1bN10gPT09IGJtWzddICYmIGFtWzhdID09PSBibVs4XTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBmaXJzdCBtYXRyaXguXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGVxdWFscyAoYTogTWF0MywgYjogTWF0Myk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm07XHJcbiAgICAgICAgbGV0IGEwID0gYW1bMF0sIGExID0gYW1bMV0sIGEyID0gYW1bMl0sIGEzID0gYW1bM10sIGE0ID0gYW1bNF0sIGE1ID0gYW1bNV0sIGE2ID0gYW1bNl0sIGE3ID0gYW1bN10sIGE4ID0gYW1bOF07XHJcbiAgICAgICAgbGV0IGIwID0gYm1bMF0sIGIxID0gYm1bMV0sIGIyID0gYm1bMl0sIGIzID0gYm1bM10sIGI0ID0gYm1bNF0sIGI1ID0gYm1bNV0sIGI2ID0gYm1bNl0sIGI3ID0gYm1bN10sIGI4ID0gYm1bOF07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGExIC0gYjEpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYTMgLSBiMykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGE0IC0gYjQpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhNSAtIGI1KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYTYgLSBiNikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTYpLCBNYXRoLmFicyhiNikpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGE3IC0gYjcpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE3KSwgTWF0aC5hYnMoYjcpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhOCAtIGI4KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOCksIE1hdGguYWJzKGI4KSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDnn6npmLXovazmlbDnu4RcclxuICAgICAqICEjZW4gTWF0cml4IHRyYW5zcG9zZSBhcnJheVxyXG4gICAgICogQG1ldGhvZCB0b0FycmF5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgbWF0OiBJTWF0M0xpa2UsIG9mcz86IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4TlhoXnmoTotbflp4vlgY/np7vph49cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIG1hdDogSU1hdDNMaWtlLCBvZnMgPSAwKSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICAgICAgICBvdXRbb2ZzICsgaV0gPSBtW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmlbDnu4Tovaznn6npmLVcclxuICAgICAqICEjZW4gVHJhbnNmZXIgbWF0cml4IGFycmF5XHJcbiAgICAgKiBAbWV0aG9kIGZyb21BcnJheVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcz86IG51bWJlcik6IE91dFxyXG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSU1hdDNMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcyA9IDApIHtcclxuICAgICAgICBsZXQgbSA9IG91dC5tO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1baV0gPSBhcnJbb2ZzICsgaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE1hdHJpeCBEYXRhXHJcbiAgICAgKiAhI3poIOefqemYteaVsOaNrlxyXG4gICAgICogQHByb3BlcnR5IHtGbG9hdDY0QXJyYXkgfCBGbG9hdDMyQXJyYXl9IG1cclxuICAgICAqL1xyXG4gICAgbTogRmxvYXRBcnJheTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29uc3RydWN0b3IgKG0wMD86IG51bWJlciB8IEZsb2F0MzJBcnJheSwgbTAxPzogbnVtYmVyLCBtMDI/OiBudW1iZXIsIG0wMz86IG51bWJlciwgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsIG0wNj86IG51bWJlciwgbTA3PzogbnVtYmVyLCBtMDg/OiBudW1iZXIpXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yIChcclxuICAgICAgICBtMDA6IG51bWJlciB8IEZsb2F0QXJyYXkgPSAxLCBtMDEgPSAwLCBtMDIgPSAwLFxyXG4gICAgICAgIG0wMyA9IDAsIG0wNCA9IDEsIG0wNSA9IDAsXHJcbiAgICAgICAgbTA2ID0gMCwgbTA3ID0gMCwgbTA4ID0gMVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKG0wMCBpbnN0YW5jZW9mIEZMT0FUX0FSUkFZX1RZUEUpIHtcclxuICAgICAgICAgICAgdGhpcy5tID0gbTAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubSA9IG5ldyBGTE9BVF9BUlJBWV9UWVBFKDkpO1xyXG4gICAgICAgICAgICBsZXQgbSA9IHRoaXMubTtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFRoZSBlbGVtZW50IGF0IGNvbHVtbiAwIHJvdyAwLlxyXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICBtWzBdID0gbTAwIGFzIG51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMS5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVsxXSA9IG0wMTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMi5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVsyXSA9IG0wMjtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMC5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVszXSA9IG0wMztcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMS5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVs0XSA9IG0wNDtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMi5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVs1XSA9IG0wNTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMC5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVs2XSA9IG0wNjtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMS5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVs3XSA9IG0wNztcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMi5cclxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgbVs4XSA9IG0wODtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdHJpeC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBUaGUgbWF0cml4LlxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gU3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgbWF0cml4LlxyXG4gICAgICovXHJcbiAgICB0b1N0cmluZyAoKSB7XHJcbiAgICAgICAgbGV0IGFtID0gdGhpcy5tO1xyXG4gICAgICAgIHJldHVybiBgbWF0Mygke2FtWzBdfSwgJHthbVsxXX0sICR7YW1bMl19LCAke2FtWzNdfSwgJHthbVs0XX0sICR7YW1bNV19LCAke2FtWzZdfSwgJHthbVs3XX0sICR7YW1bOF19KWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNjLk1hdDMgPSBNYXQzO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==