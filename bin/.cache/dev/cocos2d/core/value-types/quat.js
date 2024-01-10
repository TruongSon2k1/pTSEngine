
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/quat.js';
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

var _mat = _interopRequireDefault(require("./mat3"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
var _w = 0.0;
/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Quat
 * @extends ValueType
 */

/**
 * !#en
 * Constructor
 * see {{#crossLink "cc/quat:method"}}cc.quat{{/crossLink}}
 * !#zh
 * 构造函数，可查看 {{#crossLink "cc/quat:method"}}cc.quat{{/crossLink}}
 * @method constructor
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [z=0]
 * @param {number} [w=1]
 */

var Quat = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Quat, _ValueType);

  var _proto = Quat.prototype;

  /**
   * !#en Calculate the multiply result between this quaternion and another one
   * !#zh 计算四元数乘积的结果
   * @method mul
   * @param {Quat} other
   * @param {Quat} [out]
   * @returns {Quat} out
   */
  _proto.mul = function mul(other, out) {
    return Quat.multiply(out || new Quat(), this, other);
  };

  /**
   * !#zh 获得指定四元数的拷贝
   * !#en Obtaining copy specified quaternion
   * @method clone
   * @typescript
   * clone<Out extends IQuatLike> (a: Out): Quat
   * @static
   */
  Quat.clone = function clone(a) {
    return new Quat(a.x, a.y, a.z, a.w);
  }
  /**
   * !#zh 复制目标四元数
   * !#en Copy quaternion target
   * @method copy
   * @typescript
   * copy<Out extends IQuatLike, QuatLike extends IQuatLike> (out: Out, a: QuatLike): Out
   * @static
   */
  ;

  Quat.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 设置四元数值
   * !#en Provided Quaternion Value
   * @method set
   * @typescript
   * set<Out extends IQuatLike> (out: Out, x: number, y: number, z: number, w: number): Out
   * @static
   */
  ;

  Quat.set = function set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * !#zh 将目标赋值为单位四元数
   * !#en The target of an assignment as a unit quaternion
   * @method identity
   * @typescript
   * identity<Out extends IQuatLike> (out: Out): Out
   * @static
   */
  ;

  Quat.identity = function identity(out) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    out.w = 1;
    return out;
  }
  /**
   * !#zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
   * !#en Set quaternion rotation is the shortest path between two vectors, the default two vectors are normalized
   * @method rotationTo
   * @typescript
   * rotationTo<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, a: VecLike, b: VecLike): Out
   * @static
   */
  ;

  Quat.rotationTo = function rotationTo(out, a, b) {
    var dot = _vec["default"].dot(a, b);

    if (dot < -0.999999) {
      _vec["default"].cross(v3_1, _vec["default"].RIGHT, a);

      if (v3_1.mag() < 0.000001) {
        _vec["default"].cross(v3_1, _vec["default"].UP, a);
      }

      _vec["default"].normalize(v3_1, v3_1);

      Quat.fromAxisAngle(out, v3_1, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 1;
      return out;
    } else {
      _vec["default"].cross(v3_1, a, b);

      out.x = v3_1.x;
      out.y = v3_1.y;
      out.z = v3_1.z;
      out.w = 1 + dot;
      return Quat.normalize(out, out);
    }
  }
  /**
   * !#zh 获取四元数的旋转轴和旋转弧度
   * !#en Get the rotary shaft and the arc of rotation quaternion
   * @method getAxisAngle
   * @param {Vec3} outAxis - 旋转轴输出
   * @param {Quat} q - 源四元数
   * @return {Number} - 旋转弧度
   * @typescript
   * getAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (outAxis: VecLike, q: Out): number
   * @static
   */
  ;

  Quat.getAxisAngle = function getAxisAngle(outAxis, q) {
    var rad = Math.acos(q.w) * 2.0;
    var s = Math.sin(rad / 2.0);

    if (s !== 0.0) {
      outAxis.x = q.x / s;
      outAxis.y = q.y / s;
      outAxis.z = q.z / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      outAxis.x = 1;
      outAxis.y = 0;
      outAxis.z = 0;
    }

    return rad;
  }
  /**
   * !#zh 四元数乘法
   * !#en Quaternion multiplication
   * @method multiply
   * @typescript
   * multiply<Out extends IQuatLike, QuatLike_1 extends IQuatLike, QuatLike_2 extends IQuatLike> (out: Out, a: QuatLike_1, b: QuatLike_2): Out
   * @static
   */
  ;

  Quat.multiply = function multiply(out, a, b) {
    _x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;
    _y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;
    _z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;
    _w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
    out.x = _x;
    out.y = _y;
    out.z = _z;
    out.w = _w;
    return out;
  }
  /**
   * !#zh 四元数标量乘法
   * !#en Quaternion scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IQuatLike> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Quat.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * !#zh 四元数乘加：A + B * scale
   * !#en Quaternion multiplication and addition: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd<Out extends IQuatLike> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Quat.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * !#zh 绕 X 轴旋转指定四元数
   * !#en About the X axis specified quaternion
   * @method rotateX
   * @typescript
   * rotateX<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateX = function rotateX(out, a, rad) {
    rad *= 0.5;
    var bx = Math.sin(rad);
    var bw = Math.cos(rad);
    _x = a.x * bw + a.w * bx;
    _y = a.y * bw + a.z * bx;
    _z = a.z * bw - a.y * bx;
    _w = a.w * bw - a.x * bx;
    out.x = _x;
    out.y = _y;
    out.z = _z;
    out.w = _w;
    return out;
  }
  /**
   * !#zh 绕 Y 轴旋转指定四元数
   * !#en Rotation about the Y axis designated quaternion
   * @method rotateY
   * @typescript
   * rotateY<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateY = function rotateY(out, a, rad) {
    rad *= 0.5;
    var by = Math.sin(rad);
    var bw = Math.cos(rad);
    _x = a.x * bw - a.z * by;
    _y = a.y * bw + a.w * by;
    _z = a.z * bw + a.x * by;
    _w = a.w * bw - a.y * by;
    out.x = _x;
    out.y = _y;
    out.z = _z;
    out.w = _w;
    return out;
  }
  /**
   * !#zh 绕 Z 轴旋转指定四元数
   * !#en Around the Z axis specified quaternion
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateZ = function rotateZ(out, a, rad) {
    rad *= 0.5;
    var bz = Math.sin(rad);
    var bw = Math.cos(rad);
    _x = a.x * bw + a.y * bz;
    _y = a.y * bw - a.x * bz;
    _z = a.z * bw + a.w * bz;
    _w = a.w * bw - a.z * bz;
    out.x = _x;
    out.y = _y;
    out.z = _z;
    out.w = _w;
    return out;
  }
  /**
   * !#zh 绕世界空间下指定轴旋转四元数
   * !#en Space around the world at a given axis of rotation quaternion
   * @method rotateAround
   * @typescript
   * rotateAround<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, rot: Out, axis: VecLike, rad: number): Out
   * @param axis 旋转轴，默认已归一化
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateAround = function rotateAround(out, rot, axis, rad) {
    // get inv-axis (local to rot)
    Quat.invert(qt_1, rot);

    _vec["default"].transformQuat(v3_1, axis, qt_1); // rotate by inv-axis


    Quat.fromAxisAngle(qt_1, v3_1, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * !#zh 绕本地空间下指定轴旋转四元数
   * !#en Local space around the specified axis rotation quaternion
   * @method rotateAroundLocal
   * @typescript
   * rotateAroundLocal<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, rot: Out, axis: VecLike, rad: number): Out
   * @param axis 旋转轴
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateAroundLocal = function rotateAroundLocal(out, rot, axis, rad) {
    Quat.fromAxisAngle(qt_1, axis, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * !#zh 根据 xyz 分量计算 w 分量，默认已归一化
   * !#en The component w xyz components calculated, normalized by default
   * @method calculateW
   * @typescript
   * calculateW<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.calculateW = function calculateW(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = Math.sqrt(Math.abs(1.0 - a.x * a.x - a.y * a.y - a.z * a.z));
    return out;
  }
  /**
   * !#zh 四元数点积（数量积）
   * !#en Quaternion dot product (scalar product)
   * @method dot
   * @typescript
   * dot<Out extends IQuatLike> (a: Out, b: Out): number
   * @static
   */
  ;

  Quat.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * !#zh 逐元素线性插值： A + t * (B - A)
   * !#en Element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp<Out extends IQuatLike> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Quat.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * !#zh 四元数球面插值
   * !#en Spherical quaternion interpolation
   * @method slerp
   * @typescript
   * slerp<Out extends IQuatLike, QuatLike_1 extends IQuatLike, QuatLike_2 extends IQuatLike>(out: Out, a: QuatLike_1, b: QuatLike_2, t: number): Out
   * @static
   */
  ;

  Quat.slerp = function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var scale0 = 0;
    var scale1 = 0; // calc cosine

    var cosom = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      b.x = -b.x;
      b.y = -b.y;
      b.z = -b.z;
      b.w = -b.w;
    } // calculate coefficients


    if (1.0 - cosom > 0.000001) {
      // standard case (slerp)
      var omega = Math.acos(cosom);
      var sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out.x = scale0 * a.x + scale1 * b.x;
    out.y = scale0 * a.y + scale1 * b.y;
    out.z = scale0 * a.z + scale1 * b.z;
    out.w = scale0 * a.w + scale1 * b.w;
    return out;
  }
  /**
   * !#zh 带两个控制点的四元数球面插值
   * !#en Quaternion with two spherical interpolation control points
   * @method sqlerp
   * @typescript
   * sqlerp<Out extends IQuatLike> (out: Out, a: Out, b: Out, c: Out, d: Out, t: number): Out
   * @static
   */
  ;

  Quat.sqlerp = function sqlerp(out, a, b, c, d, t) {
    Quat.slerp(qt_1, a, d, t);
    Quat.slerp(qt_2, b, c, t);
    Quat.slerp(out, qt_1, qt_2, 2 * t * (1 - t));
    return out;
  }
  /**
   * !#zh 四元数求逆
   * !#en Quaternion inverse
   * @method invert
   * @typescript
   * invert<Out extends IQuatLike, QuatLike extends IQuatLike> (out: Out, a: QuatLike): Out
   * @static
   */
  ;

  Quat.invert = function invert(out, a) {
    var dot = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out.x = -a.x * invDot;
    out.y = -a.y * invDot;
    out.z = -a.z * invDot;
    out.w = a.w * invDot;
    return out;
  }
  /**
   * !#zh 求共轭四元数，对单位四元数与求逆等价，但更高效
   * !#en Conjugating a quaternion, and the unit quaternion equivalent to inversion, but more efficient
   * @method conjugate
   * @typescript
   * conjugate<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.conjugate = function conjugate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 求四元数长度
   * !#en Seek length quaternion
   * @method len
   * @typescript
   * len<Out extends IQuatLike> (a: Out): number
   * @static
   */
  ;

  Quat.len = function len(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  }
  /**
   * !#zh 求四元数长度平方
   * !#en Seeking quaternion square of the length
   * @method lengthSqr
   * @typescript
   * lengthSqr<Out extends IQuatLike> (a: Out): number
   * @static
   */
  ;

  Quat.lengthSqr = function lengthSqr(a) {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  }
  /**
   * !#zh 归一化四元数
   * !#en Normalized quaternions
   * @method normalize
   * @typescript
   * normalize<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.normalize = function normalize(out, a) {
    var len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = a.x * len;
      out.y = a.y * len;
      out.z = a.z * len;
      out.w = a.w * len;
    }

    return out;
  }
  /**
   * !#zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
   * !#en Calculated according to the local orientation quaternion coordinate axis, the default three vectors are normalized and mutually perpendicular
   * @method fromAxes
   * @typescript
   * fromAxes<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, xAxis: VecLike, yAxis: VecLike, zAxis: VecLike): Out
   * @static
   */
  ;

  Quat.fromAxes = function fromAxes(out, xAxis, yAxis, zAxis) {
    _mat["default"].set(m3_1, xAxis.x, xAxis.y, xAxis.z, yAxis.x, yAxis.y, yAxis.z, zAxis.x, zAxis.y, zAxis.z);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * !#zh 根据视口的前方向和上方向计算四元数
   * !#en The forward direction and the direction of the viewport computing quaternion
   * @method fromViewUp
   * @typescript
   * fromViewUp<Out extends IQuatLike> (out: Out, view: Vec3, up?: Vec3): Out
   * @param view 视口面向的前方向，必须归一化
   * @param up 视口的上方向，必须归一化，默认为 (0, 1, 0)
   * @static
   */
  ;

  Quat.fromViewUp = function fromViewUp(out, view, up) {
    _mat["default"].fromViewUp(m3_1, view, up);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * !#zh 根据旋转轴和旋转弧度计算四元数
   * !#en The quaternion calculated and the arc of rotation of the rotary shaft
   * @method fromAxisAngle
   * @typescript
   * fromAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, axis: VecLike, rad: number): Out
   * @static
   */
  ;

  Quat.fromAxisAngle = function fromAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out.x = s * axis.x;
    out.y = s * axis.y;
    out.z = s * axis.z;
    out.w = Math.cos(rad);
    return out;
  }
  /**
   * Set a quaternion from the given euler angle 0, 0, z.
   *
   * @param {Quat} out - Quaternion to store result.
   * @param {number} z - Angle to rotate around Z axis in degrees.
   * @returns {Quat}
   * @function
   */
  ;

  Quat.fromAngleZ = function fromAngleZ(out, z) {
    z *= halfToRad;
    out.x = out.y = 0;
    out.z = Math.sin(z);
    out.w = Math.cos(z);
    return out;
  }
  /**
   * !#zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
   * !#en Calculating the three-dimensional quaternion matrix information, default zoom information input matrix does not contain
   * @method fromMat3
   * @typescript
   * fromMat3<Out extends IQuatLike> (out: Out, mat: Mat3): Out
   * @static
   */
  ;

  Quat.fromMat3 = function fromMat3(out, mat) {
    var m = mat.m;
    var m00 = m[0],
        m10 = m[1],
        m20 = m[2],
        m01 = m[3],
        m11 = m[4],
        m21 = m[5],
        m02 = m[6],
        m12 = m[7],
        m22 = m[8];
    var trace = m00 + m11 + m22;

    if (trace > 0) {
      var s = 0.5 / Math.sqrt(trace + 1.0);
      out.w = 0.25 / s;
      out.x = (m21 - m12) * s;
      out.y = (m02 - m20) * s;
      out.z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
      var _s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);

      out.w = (m21 - m12) / _s;
      out.x = 0.25 * _s;
      out.y = (m01 + m10) / _s;
      out.z = (m02 + m20) / _s;
    } else if (m11 > m22) {
      var _s2 = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);

      out.w = (m02 - m20) / _s2;
      out.x = (m01 + m10) / _s2;
      out.y = 0.25 * _s2;
      out.z = (m12 + m21) / _s2;
    } else {
      var _s3 = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);

      out.w = (m10 - m01) / _s3;
      out.x = (m02 + m20) / _s3;
      out.y = (m12 + m21) / _s3;
      out.z = 0.25 * _s3;
    }

    return out;
  }
  /**
   * !#zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
   * !#en The quaternion calculated Euler angle information, rotation order YZX
   * @method fromEuler
   * @typescript
   * fromEuler<Out extends IQuatLike> (out: Out, x: number, y: number, z: number): Out
   * @static
   */
  ;

  Quat.fromEuler = function fromEuler(out, x, y, z) {
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out.x = sx * cy * cz + cx * sy * sz;
    out.y = cx * sy * cz + sx * cy * sz;
    out.z = cx * cy * sz - sx * sy * cz;
    out.w = cx * cy * cz - sx * sy * sz;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 X 轴向量
   * !#en This returns the result of the quaternion coordinate system X-axis vector
   * @method toAxisX
   * @typescript
   * toAxisX<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisX = function toAxisX(out, q) {
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = 1.0 - fy * q.y - fz * q.z;
    out.y = fy * q.x + fz * q.w;
    out.z = fz * q.x + fy * q.w;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 Y 轴向量
   * !#en This returns the result of the quaternion coordinate system Y axis vector
   * @method toAxisY
   * @typescript
   * toAxisY<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisY = function toAxisY(out, q) {
    var fx = 2.0 * q.x;
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = fy * q.x - fz * q.w;
    out.y = 1.0 - fx * q.x - fz * q.z;
    out.z = fz * q.y + fx * q.w;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 Z 轴向量
   * !#en This returns the result of the quaternion coordinate system the Z-axis vector
   * @method toAxisZ
   * @typescript
   * toAxisZ<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisZ = function toAxisZ(out, q) {
    var fx = 2.0 * q.x;
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = fz * q.x - fy * q.w;
    out.y = fz * q.y - fx * q.w;
    out.z = 1.0 - fx * q.x - fy * q.y;
    return out;
  }
  /**
   * !#zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
   * !#en The quaternion calculated Euler angles, return angle x, y in the [-180, 180] interval, z default the range [-90, 90] interval, the rotation order YZX
   * @method toEuler
   * @typescript
   * toEuler<Out extends IVec3Like> (out: Out, q: IQuatLike, outerZ?: boolean): Out
   * @param outerZ z 取值范围区间改为 [-180, -90] U [90, 180]
   * @static
   */
  ;

  Quat.toEuler = function toEuler(out, q, outerZ) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var bank = 0;
    var heading = 0;
    var attitude = 0;
    var test = x * y + z * w;

    if (test > 0.499999) {
      bank = 0; // default to zero

      heading = (0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = 90;
    } else if (test < -0.499999) {
      bank = 0; // default to zero

      heading = -(0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = -90;
    } else {
      var sqx = x * x;
      var sqy = y * y;
      var sqz = z * z;
      bank = (0, _utils.toDegree)(Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz));
      heading = (0, _utils.toDegree)(Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz));
      attitude = (0, _utils.toDegree)(Math.asin(2 * test));

      if (outerZ) {
        bank = -180 * Math.sign(bank + 1e-6) + bank;
        heading = -180 * Math.sign(heading + 1e-6) + heading;
        attitude = 180 * Math.sign(attitude + 1e-6) - attitude;
      }
    }

    out.x = bank;
    out.y = heading;
    out.z = attitude;
    return out;
  }
  /**
   * !#zh 四元数等价判断
   * !#en Analyzing quaternion equivalent
   * @method strictEquals
   * @typescript
   * strictEquals<Out extends IQuatLike> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Quat.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * !#zh 排除浮点数误差的四元数近似等价判断
   * !#en Negative floating point error quaternion approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals<Out extends IQuatLike> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Quat.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * !#zh 四元数转数组
   * !#en Quaternion rotation array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, q: IQuatLike, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Quat.toArray = function toArray(out, q, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = q.x;
    out[ofs + 1] = q.y;
    out[ofs + 2] = q.z;
    out[ofs + 3] = q.w;
    return out;
  }
  /**
   * !#zh 数组转四元数
   * !#en Array to a quaternion
   * @method fromArray
   * @typescript
   * fromArray <Out extends IQuatLike> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Quat.fromArray = function fromArray(out, arr, ofs) {
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

  function Quat(x, y, z, w) {
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
      w = 1;
    }

    _this = _ValueType.call(this) || this;
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
   * !#en clone a Quat object and return the new object
   * !#zh 克隆一个四元数并返回
   * @method clone
   * @return {Quat}
   */


  _proto.clone = function clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }
  /**
   * !#en Set values with another quaternion
   * !#zh 用另一个四元数的值设置到当前对象上。
   * @method set
   * @param {Quat} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Quat} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    this.z = newValue.z;
    this.w = newValue.w;
    return this;
  }
  /**
   * !#en Check whether current quaternion equals another
   * !#zh 当前的四元数是否与指定的四元数相等。
   * @method equals
   * @param {Quat} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * !#en Convert quaternion to euler
   * !#zh 转换四元数到欧拉角
   * @method toEuler
   * @param {Vec3} out
   * @return {Vec3}
   */
  ;

  _proto.toEuler = function toEuler(out) {
    return Quat.toEuler(out, this);
  }
  /**
   * !#en Convert euler to quaternion
   * !#zh 转换欧拉角到四元数
   * @method fromEuler
   * @param {Vec3} euler
   * @return {Quat}
   */
  ;

  _proto.fromEuler = function fromEuler(euler) {
    return Quat.fromEuler(this, euler.x, euler.y, euler.z);
  }
  /**
   * !#en Calculate the interpolation result between this quaternion and another one with given ratio
   * !#zh 计算四元数的插值结果
   * @member lerp
   * @param {Quat} to
   * @param {Number} ratio
   * @param {Quat} [out]
   * @returns {Quat} out
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Quat();
    Quat.slerp(out, this, to, ratio);
    return out;
  }
  /**
   * !#en Calculate the multiply result between this quaternion and another one
   * !#zh 计算四元数乘积的结果
   * @member multiply
   * @param {Quat} other
   * @returns {Quat} this
   */
  ;

  _proto.multiply = function multiply(other) {
    return Quat.multiply(this, this, other);
  }
  /**
   * !#en Rotates a quaternion by the given angle (in radians) about a world space axis.
   * !#zh 围绕世界空间轴按给定弧度旋转四元数
   * @member rotateAround
   * @param {Quat} rot - Quaternion to rotate
   * @param {Vec3} axis - The axis around which to rotate in world space
   * @param {Number} rad - Angle (in radians) to rotate
   * @param {Quat} [out] - Quaternion to store result
   * @returns {Quat} out
   */
  ;

  _proto.rotateAround = function rotateAround(rot, axis, rad, out) {
    out = out || new Quat();
    return Quat.rotateAround(out, rot, axis, rad);
  };

  return Quat;
}(_valueType["default"]);

exports["default"] = Quat;
Quat.mul = Quat.multiply;
Quat.scale = Quat.multiplyScalar;
Quat.mag = Quat.len;
Quat.IDENTITY = Object.freeze(new Quat());
var qt_1 = new Quat();
var qt_2 = new Quat();
var v3_1 = new _vec["default"]();
var m3_1 = new _mat["default"]();
var halfToRad = 0.5 * Math.PI / 180.0;

_CCClass["default"].fastDefine('cc.Quat', Quat, {
  x: 0,
  y: 0,
  z: 0,
  w: 1
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Quat"}}cc.Quat{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Quat"}}cc.Quat{{/crossLink}} 对象。
 * @method quat
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [z=0]
 * @param {Number} [w=1]
 * @return {Quat}
 */


cc.quat = function quat(x, y, z, w) {
  return new Quat(x, y, z, w);
};

cc.Quat = Quat;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFxxdWF0LnRzIl0sIm5hbWVzIjpbIl94IiwiX3kiLCJfeiIsIl93IiwiUXVhdCIsIm11bCIsIm90aGVyIiwib3V0IiwibXVsdGlwbHkiLCJjbG9uZSIsImEiLCJ4IiwieSIsInoiLCJ3IiwiY29weSIsInNldCIsImlkZW50aXR5Iiwicm90YXRpb25UbyIsImIiLCJkb3QiLCJWZWMzIiwiY3Jvc3MiLCJ2M18xIiwiUklHSFQiLCJtYWciLCJVUCIsIm5vcm1hbGl6ZSIsImZyb21BeGlzQW5nbGUiLCJNYXRoIiwiUEkiLCJnZXRBeGlzQW5nbGUiLCJvdXRBeGlzIiwicSIsInJhZCIsImFjb3MiLCJzIiwic2luIiwibXVsdGlwbHlTY2FsYXIiLCJzY2FsZUFuZEFkZCIsInNjYWxlIiwicm90YXRlWCIsImJ4IiwiYnciLCJjb3MiLCJyb3RhdGVZIiwiYnkiLCJyb3RhdGVaIiwiYnoiLCJyb3RhdGVBcm91bmQiLCJyb3QiLCJheGlzIiwiaW52ZXJ0IiwicXRfMSIsInRyYW5zZm9ybVF1YXQiLCJyb3RhdGVBcm91bmRMb2NhbCIsImNhbGN1bGF0ZVciLCJzcXJ0IiwiYWJzIiwibGVycCIsInQiLCJzbGVycCIsInNjYWxlMCIsInNjYWxlMSIsImNvc29tIiwib21lZ2EiLCJzaW5vbSIsInNxbGVycCIsImMiLCJkIiwicXRfMiIsImludkRvdCIsImNvbmp1Z2F0ZSIsImxlbiIsImxlbmd0aFNxciIsImZyb21BeGVzIiwieEF4aXMiLCJ5QXhpcyIsInpBeGlzIiwiTWF0MyIsIm0zXzEiLCJmcm9tTWF0MyIsImZyb21WaWV3VXAiLCJ2aWV3IiwidXAiLCJmcm9tQW5nbGVaIiwiaGFsZlRvUmFkIiwibWF0IiwibSIsIm0wMCIsIm0xMCIsIm0yMCIsIm0wMSIsIm0xMSIsIm0yMSIsIm0wMiIsIm0xMiIsIm0yMiIsInRyYWNlIiwiZnJvbUV1bGVyIiwic3giLCJjeCIsInN5IiwiY3kiLCJzeiIsImN6IiwidG9BeGlzWCIsImZ5IiwiZnoiLCJ0b0F4aXNZIiwiZngiLCJ0b0F4aXNaIiwidG9FdWxlciIsIm91dGVyWiIsImJhbmsiLCJoZWFkaW5nIiwiYXR0aXR1ZGUiLCJ0ZXN0IiwiYXRhbjIiLCJzcXgiLCJzcXkiLCJzcXoiLCJhc2luIiwic2lnbiIsInN0cmljdEVxdWFscyIsImVxdWFscyIsImVwc2lsb24iLCJFUFNJTE9OIiwibWF4IiwidG9BcnJheSIsIm9mcyIsImZyb21BcnJheSIsImFyciIsIm5ld1ZhbHVlIiwiZXVsZXIiLCJ0byIsInJhdGlvIiwiVmFsdWVUeXBlIiwiSURFTlRJVFkiLCJPYmplY3QiLCJmcmVlemUiLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsImNjIiwicXVhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJQSxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBQ3FCQzs7Ozs7QUFLakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtTQUNJQyxNQUFBLGFBQUtDLEtBQUwsRUFBa0JDLEdBQWxCLEVBQW9DO0FBQ2hDLFdBQU9ILElBQUksQ0FBQ0ksUUFBTCxDQUFjRCxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFyQixFQUFpQyxJQUFqQyxFQUF1Q0UsS0FBdkMsQ0FBUDtBQUNIOztBQUlEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7T0FDV0csUUFBUCxlQUFxQ0MsQ0FBckMsRUFBNkM7QUFDekMsV0FBTyxJQUFJTixJQUFKLENBQVNNLENBQUMsQ0FBQ0Ms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LEVBQWI7QUFDQSxJQUFNbUIsSUFBSSxHQUFHLElBQUlGLGVBQUosRUFBYjtBQUNBLElBQU0yRCxJQUFJLEdBQUcsSUFBSUQsZUFBSixFQUFiO0FBQ0EsSUFBTU8sU0FBUyxHQUFHLE1BQU16RCxJQUFJLENBQUNDLEVBQVgsR0FBZ0IsS0FBbEM7O0FBRUErRyxvQkFBUUMsVUFBUixDQUFtQixTQUFuQixFQUE4QjFJLElBQTlCLEVBQW9DO0FBQUVPLEVBQUFBLENBQUMsRUFBRSxDQUFMO0FBQVFDLEVBQUFBLENBQUMsRUFBRSxDQUFYO0FBQWNDLEVBQUFBLENBQUMsRUFBRSxDQUFqQjtBQUFvQkMsRUFBQUEsQ0FBQyxFQUFFO0FBQXZCLENBQXBDO0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQWlJLEVBQUUsQ0FBQ0MsSUFBSCxHQUFVLFNBQVNBLElBQVQsQ0FBZXJJLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkI7QUFDakMsU0FBTyxJQUFJVixJQUFKLENBQVNPLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixDQUFQO0FBQ0gsQ0FGRDs7QUFJQWlJLEVBQUUsQ0FBQzNJLElBQUgsR0FBVUEsSUFBViIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcclxuaW1wb3J0IENDQ2xhc3MgZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzcyc7XHJcbmltcG9ydCBWZWMzIGZyb20gJy4vdmVjMyc7XHJcbmltcG9ydCBNYXQzIGZyb20gJy4vbWF0Myc7XHJcbmltcG9ydCB7IEVQU0lMT04sIHRvRGVncmVlIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5sZXQgX3g6IG51bWJlciA9IDAuMDtcclxubGV0IF95OiBudW1iZXIgPSAwLjA7XHJcbmxldCBfejogbnVtYmVyID0gMC4wO1xyXG5sZXQgX3c6IG51bWJlciA9IDAuMDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJlcHJlc2VudGF0aW9uIG9mIDJEIHZlY3RvcnMgYW5kIHBvaW50cy5cclxuICogISN6aCDooajnpLogMkQg5ZCR6YeP5ZKM5Z2Q5qCHXHJcbiAqXHJcbiAqIEBjbGFzcyBRdWF0XHJcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENvbnN0cnVjdG9yXHJcbiAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy9xdWF0Om1ldGhvZFwifX1jYy5xdWF0e3svY3Jvc3NMaW5rfX1cclxuICogISN6aFxyXG4gKiDmnoTpgKDlh73mlbDvvIzlj6/mn6XnnIsge3sjY3Jvc3NMaW5rIFwiY2MvcXVhdDptZXRob2RcIn19Y2MucXVhdHt7L2Nyb3NzTGlua319XHJcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtudW1iZXJ9IFt4PTBdXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXVxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3o9MF1cclxuICogQHBhcmFtIHtudW1iZXJ9IFt3PTFdXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWF0IGV4dGVuZHMgVmFsdWVUeXBlIHtcclxuICAgIHN0YXRpYyBtdWwgPSBRdWF0Lm11bHRpcGx5O1xyXG4gICAgc3RhdGljIHNjYWxlID0gUXVhdC5tdWx0aXBseVNjYWxhcjtcclxuICAgIHN0YXRpYyBtYWcgPSBRdWF0LmxlbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2FsY3VsYXRlIHRoZSBtdWx0aXBseSByZXN1bHQgYmV0d2VlbiB0aGlzIHF1YXRlcm5pb24gYW5kIGFub3RoZXIgb25lXHJcbiAgICAgKiAhI3poIOiuoeeul+Wbm+WFg+aVsOS5mOenr+eahOe7k+aenFxyXG4gICAgICogQG1ldGhvZCBtdWxcclxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3RoZXJcclxuICAgICAqIEBwYXJhbSB7UXVhdH0gW291dF1cclxuICAgICAqIEByZXR1cm5zIHtRdWF0fSBvdXRcclxuICAgICAqL1xyXG4gICAgbXVsIChvdGhlcjogUXVhdCwgb3V0PzogUXVhdCk6IFF1YXQge1xyXG4gICAgICAgIHJldHVybiBRdWF0Lm11bHRpcGx5KG91dCB8fCBuZXcgUXVhdCgpLCB0aGlzLCBvdGhlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6I635b6X5oyH5a6a5Zub5YWD5pWw55qE5ou36LSdXHJcbiAgICAgKiAhI2VuIE9idGFpbmluZyBjb3B5IHNwZWNpZmllZCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2xvbmU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KTogUXVhdFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KGEueCwgYS55LCBhLnosIGEudyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWkjeWItuebruagh+Wbm+WFg+aVsFxyXG4gICAgICogISNlbiBDb3B5IHF1YXRlcm5pb24gdGFyZ2V0XHJcbiAgICAgKiBAbWV0aG9kIGNvcHlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb3B5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvcHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZSkge1xyXG4gICAgICAgIG91dC54ID0gYS54O1xyXG4gICAgICAgIG91dC55ID0gYS55O1xyXG4gICAgICAgIG91dC56ID0gYS56O1xyXG4gICAgICAgIG91dC53ID0gYS53O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuvue9ruWbm+WFg+aVsOWAvFxyXG4gICAgICogISNlbiBQcm92aWRlZCBRdWF0ZXJuaW9uIFZhbHVlXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNldDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0geDtcclxuICAgICAgICBvdXQueSA9IHk7XHJcbiAgICAgICAgb3V0LnogPSB6O1xyXG4gICAgICAgIG91dC53ID0gdztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlsIbnm67moIfotYvlgLzkuLrljZXkvY3lm5vlhYPmlbBcclxuICAgICAqICEjZW4gVGhlIHRhcmdldCBvZiBhbiBhc3NpZ25tZW50IGFzIGEgdW5pdCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAbWV0aG9kIGlkZW50aXR5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogaWRlbnRpdHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlkZW50aXR5PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSAwO1xyXG4gICAgICAgIG91dC55ID0gMDtcclxuICAgICAgICBvdXQueiA9IDA7XHJcbiAgICAgICAgb3V0LncgPSAxO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOiuvue9ruWbm+WFg+aVsOS4uuS4pOWQkemHj+mXtOeahOacgOefrei3r+W+hOaXi+i9rO+8jOm7mOiupOS4pOWQkemHj+mDveW3suW9kuS4gOWMllxyXG4gICAgICogISNlbiBTZXQgcXVhdGVybmlvbiByb3RhdGlvbiBpcyB0aGUgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIHR3byB2ZWN0b3JzLCB0aGUgZGVmYXVsdCB0d28gdmVjdG9ycyBhcmUgbm9ybWFsaXplZFxyXG4gICAgICogQG1ldGhvZCByb3RhdGlvblRvXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcm90YXRpb25UbzxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjTGlrZSwgYjogVmVjTGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRpb25UbzxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjTGlrZSwgYjogVmVjTGlrZSkge1xyXG4gICAgICAgIGNvbnN0IGRvdCA9IFZlYzMuZG90KGEsIGIpO1xyXG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcclxuICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBWZWMzLlJJR0hULCBhKTtcclxuICAgICAgICAgICAgaWYgKHYzXzEubWFnKCkgPCAwLjAwMDAwMSkge1xyXG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBWZWMzLlVQLCBhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZSh2M18xLCB2M18xKTtcclxuICAgICAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKG91dCwgdjNfMSwgTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkb3QgPiAwLjk5OTk5OSkge1xyXG4gICAgICAgICAgICBvdXQueCA9IDA7XHJcbiAgICAgICAgICAgIG91dC55ID0gMDtcclxuICAgICAgICAgICAgb3V0LnogPSAwO1xyXG4gICAgICAgICAgICBvdXQudyA9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBhLCBiKTtcclxuICAgICAgICAgICAgb3V0LnggPSB2M18xLng7XHJcbiAgICAgICAgICAgIG91dC55ID0gdjNfMS55O1xyXG4gICAgICAgICAgICBvdXQueiA9IHYzXzEuejtcclxuICAgICAgICAgICAgb3V0LncgPSAxICsgZG90O1xyXG4gICAgICAgICAgICByZXR1cm4gUXVhdC5ub3JtYWxpemUob3V0LCBvdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6I635Y+W5Zub5YWD5pWw55qE5peL6L2s6L205ZKM5peL6L2s5byn5bqmXHJcbiAgICAgKiAhI2VuIEdldCB0aGUgcm90YXJ5IHNoYWZ0IGFuZCB0aGUgYXJjIG9mIHJvdGF0aW9uIHF1YXRlcm5pb25cclxuICAgICAqIEBtZXRob2QgZ2V0QXhpc0FuZ2xlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dEF4aXMgLSDml4vovazovbTovpPlh7pcclxuICAgICAqIEBwYXJhbSB7UXVhdH0gcSAtIOa6kOWbm+WFg+aVsFxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAtIOaXi+i9rOW8p+W6plxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldEF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXRBeGlzOiBWZWNMaWtlLCBxOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXRBeGlzOiBWZWNMaWtlLCBxOiBPdXQpIHtcclxuICAgICAgICBjb25zdCByYWQgPSBNYXRoLmFjb3MocS53KSAqIDIuMDtcclxuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkIC8gMi4wKTtcclxuICAgICAgICBpZiAocyAhPT0gMC4wKSB7XHJcbiAgICAgICAgICAgIG91dEF4aXMueCA9IHEueCAvIHM7XHJcbiAgICAgICAgICAgIG91dEF4aXMueSA9IHEueSAvIHM7XHJcbiAgICAgICAgICAgIG91dEF4aXMueiA9IHEueiAvIHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSWYgcyBpcyB6ZXJvLCByZXR1cm4gYW55IGF4aXMgKG5vIHJvdGF0aW9uIC0gYXhpcyBkb2VzIG5vdCBtYXR0ZXIpXHJcbiAgICAgICAgICAgIG91dEF4aXMueCA9IDE7XHJcbiAgICAgICAgICAgIG91dEF4aXMueSA9IDA7XHJcbiAgICAgICAgICAgIG91dEF4aXMueiA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWbm+WFg+aVsOS5mOazlVxyXG4gICAgICogISNlbiBRdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uXHJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbXVsdGlwbHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG11bHRpcGx5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZV8xLCBiOiBRdWF0TGlrZV8yKSB7XHJcbiAgICAgICAgX3ggPSBhLnggKiBiLncgKyBhLncgKiBiLnggKyBhLnkgKiBiLnogLSBhLnogKiBiLnk7XHJcbiAgICAgICAgX3kgPSBhLnkgKiBiLncgKyBhLncgKiBiLnkgKyBhLnogKiBiLnggLSBhLnggKiBiLno7XHJcbiAgICAgICAgX3ogPSBhLnogKiBiLncgKyBhLncgKiBiLnogKyBhLnggKiBiLnkgLSBhLnkgKiBiLng7XHJcbiAgICAgICAgX3cgPSBhLncgKiBiLncgLSBhLnggKiBiLnggLSBhLnkgKiBiLnkgLSBhLnogKiBiLno7XHJcbiAgICAgICAgb3V0LnggPSBfeDtcclxuICAgICAgICBvdXQueSA9IF95O1xyXG4gICAgICAgIG91dC56ID0gX3o7XHJcbiAgICAgICAgb3V0LncgPSBfdztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlm5vlhYPmlbDmoIfph4/kuZjms5VcclxuICAgICAqICEjZW4gUXVhdGVybmlvbiBzY2FsYXIgbXVsdGlwbGljYXRpb25cclxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlTY2FsYXJcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICogYjtcclxuICAgICAgICBvdXQueSA9IGEueSAqIGI7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xyXG4gICAgICAgIG91dC53ID0gYS53ICogYjtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlm5vlhYPmlbDkuZjliqDvvJpBICsgQiAqIHNjYWxlXHJcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gbXVsdGlwbGljYXRpb24gYW5kIGFkZGl0aW9uOiBBICsgQiAqIHNjYWxlXHJcbiAgICAgKiBAbWV0aG9kIHNjYWxlQW5kQWRkXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc2NhbGVBbmRBZGQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzY2FsZUFuZEFkZDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcclxuICAgICAgICBvdXQueCA9IGEueCArIGIueCAqIHNjYWxlO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgYi55ICogc2NhbGU7XHJcbiAgICAgICAgb3V0LnogPSBhLnogKyBiLnogKiBzY2FsZTtcclxuICAgICAgICBvdXQudyA9IGEudyArIGIudyAqIHNjYWxlO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOe7lSBYIOi9tOaXi+i9rOaMh+WumuWbm+WFg+aVsFxyXG4gICAgICogISNlbiBBYm91dCB0aGUgWCBheGlzIHNwZWNpZmllZCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVhcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByb3RhdGVYPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlWDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJhZCAqPSAwLjU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ4ID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIF94ID0gYS54ICogYncgKyBhLncgKiBieDtcclxuICAgICAgICBfeSA9IGEueSAqIGJ3ICsgYS56ICogYng7XHJcbiAgICAgICAgX3ogPSBhLnogKiBidyAtIGEueSAqIGJ4O1xyXG4gICAgICAgIF93ID0gYS53ICogYncgLSBhLnggKiBieDtcclxuXHJcbiAgICAgICAgb3V0LnggPSBfeDtcclxuICAgICAgICBvdXQueSA9IF95O1xyXG4gICAgICAgIG91dC56ID0gX3o7XHJcbiAgICAgICAgb3V0LncgPSBfdztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg57uVIFkg6L205peL6L2s5oyH5a6a5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIFJvdGF0aW9uIGFib3V0IHRoZSBZIGF4aXMgZGVzaWduYXRlZCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByb3RhdGVZPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJhZCAqPSAwLjU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ5ID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIF94ID0gYS54ICogYncgLSBhLnogKiBieTtcclxuICAgICAgICBfeSA9IGEueSAqIGJ3ICsgYS53ICogYnk7XHJcbiAgICAgICAgX3ogPSBhLnogKiBidyArIGEueCAqIGJ5O1xyXG4gICAgICAgIF93ID0gYS53ICogYncgLSBhLnkgKiBieTtcclxuXHJcbiAgICAgICAgb3V0LnggPSBfeDtcclxuICAgICAgICBvdXQueSA9IF95O1xyXG4gICAgICAgIG91dC56ID0gX3o7XHJcbiAgICAgICAgb3V0LncgPSBfdztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg57uVIFog6L205peL6L2s5oyH5a6a5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIEFyb3VuZCB0aGUgWiBheGlzIHNwZWNpZmllZCBxdWF0ZXJuaW9uXHJcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVpcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByb3RhdGVaPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcm90YXRlWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xyXG4gICAgICAgIHJhZCAqPSAwLjU7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ6ID0gTWF0aC5zaW4ocmFkKTtcclxuICAgICAgICBjb25zdCBidyA9IE1hdGguY29zKHJhZCk7XHJcblxyXG4gICAgICAgIF94ID0gYS54ICogYncgKyBhLnkgKiBiejtcclxuICAgICAgICBfeSA9IGEueSAqIGJ3IC0gYS54ICogYno7XHJcbiAgICAgICAgX3ogPSBhLnogKiBidyArIGEudyAqIGJ6O1xyXG4gICAgICAgIF93ID0gYS53ICogYncgLSBhLnogKiBiejtcclxuXHJcbiAgICAgICAgb3V0LnggPSBfeDtcclxuICAgICAgICBvdXQueSA9IF95O1xyXG4gICAgICAgIG91dC56ID0gX3o7XHJcbiAgICAgICAgb3V0LncgPSBfdztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg57uV5LiW55WM56m66Ze05LiL5oyH5a6a6L205peL6L2s5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIFNwYWNlIGFyb3VuZCB0aGUgd29ybGQgYXQgYSBnaXZlbiBheGlzIG9mIHJvdGF0aW9uIHF1YXRlcm5pb25cclxuICAgICAqIEBtZXRob2Qgcm90YXRlQXJvdW5kXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcm90YXRlQXJvdW5kPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBheGlzIOaXi+i9rOi9tO+8jOm7mOiupOW3suW9kuS4gOWMllxyXG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJvdGF0ZUFyb3VuZDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gZ2V0IGludi1heGlzIChsb2NhbCB0byByb3QpXHJcbiAgICAgICAgUXVhdC5pbnZlcnQocXRfMSwgcm90KTtcclxuICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQodjNfMSwgYXhpcywgcXRfMSk7XHJcbiAgICAgICAgLy8gcm90YXRlIGJ5IGludi1heGlzXHJcbiAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKHF0XzEsIHYzXzEsIHJhZCk7XHJcbiAgICAgICAgUXVhdC5tdWx0aXBseShvdXQsIHJvdCwgcXRfMSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg57uV5pys5Zyw56m66Ze05LiL5oyH5a6a6L205peL6L2s5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIExvY2FsIHNwYWNlIGFyb3VuZCB0aGUgc3BlY2lmaWVkIGF4aXMgcm90YXRpb24gcXVhdGVybmlvblxyXG4gICAgICogQG1ldGhvZCByb3RhdGVBcm91bmRMb2NhbFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJvdGF0ZUFyb3VuZExvY2FsPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBheGlzIOaXi+i9rOi9tFxyXG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJvdGF0ZUFyb3VuZExvY2FsPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICBRdWF0LmZyb21BeGlzQW5nbGUocXRfMSwgYXhpcywgcmFkKTtcclxuICAgICAgICBRdWF0Lm11bHRpcGx5KG91dCwgcm90LCBxdF8xKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja4geHl6IOWIhumHj+iuoeeulyB3IOWIhumHj++8jOm7mOiupOW3suW9kuS4gOWMllxyXG4gICAgICogISNlbiBUaGUgY29tcG9uZW50IHcgeHl6IGNvbXBvbmVudHMgY2FsY3VsYXRlZCwgbm9ybWFsaXplZCBieSBkZWZhdWx0XHJcbiAgICAgKiBAbWV0aG9kIGNhbGN1bGF0ZVdcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjYWxjdWxhdGVXPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNhbGN1bGF0ZVc8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xyXG5cclxuICAgICAgICBvdXQueCA9IGEueDtcclxuICAgICAgICBvdXQueSA9IGEueTtcclxuICAgICAgICBvdXQueiA9IGEuejtcclxuICAgICAgICBvdXQudyA9IE1hdGguc3FydChNYXRoLmFicygxLjAgLSBhLnggKiBhLnggLSBhLnkgKiBhLnkgLSBhLnogKiBhLnopKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlm5vlhYPmlbDngrnnp6/vvIjmlbDph4/np6/vvIlcclxuICAgICAqICEjZW4gUXVhdGVybmlvbiBkb3QgcHJvZHVjdCAoc2NhbGFyIHByb2R1Y3QpXHJcbiAgICAgKiBAbWV0aG9kIGRvdFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRvdDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZG90PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6YCQ5YWD57Sg57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxyXG4gICAgICogISNlbiBFbGVtZW50IGJ5IGVsZW1lbnQgbGluZWFyIGludGVycG9sYXRpb246IEEgKyB0ICogKEIgLSBBKVxyXG4gICAgICogQG1ldGhvZCBsZXJwXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcikge1xyXG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xyXG4gICAgICAgIG91dC55ID0gYS55ICsgdCAqIChiLnkgLSBhLnkpO1xyXG4gICAgICAgIG91dC56ID0gYS56ICsgdCAqIChiLnogLSBhLnopO1xyXG4gICAgICAgIG91dC53ID0gYS53ICsgdCAqIChiLncgLSBhLncpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOWbm+WFg+aVsOeQg+mdouaPkuWAvFxyXG4gICAgICogISNlbiBTcGhlcmljYWwgcXVhdGVybmlvbiBpbnRlcnBvbGF0aW9uXHJcbiAgICAgKiBAbWV0aG9kIHNsZXJwXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogc2xlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPihvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMiwgdDogbnVtYmVyKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzEgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzIgZXh0ZW5kcyBJUXVhdExpa2U+XHJcbiAgICAgICAgKG91dDogT3V0LCBhOiBRdWF0TGlrZV8xLCBiOiBRdWF0TGlrZV8yLCB0OiBudW1iZXIpIHtcclxuICAgICAgICAvLyBiZW5jaG1hcmtzOlxyXG4gICAgICAgIC8vICAgIGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tc2xlcnAtaW1wbGVtZW50YXRpb25zXHJcblxyXG4gICAgICAgIGxldCBzY2FsZTAgPSAwO1xyXG4gICAgICAgIGxldCBzY2FsZTEgPSAwO1xyXG5cclxuICAgICAgICAvLyBjYWxjIGNvc2luZVxyXG4gICAgICAgIGxldCBjb3NvbSA9IGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcclxuICAgICAgICAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcclxuICAgICAgICBpZiAoY29zb20gPCAwLjApIHtcclxuICAgICAgICAgICAgY29zb20gPSAtY29zb207XHJcbiAgICAgICAgICAgIGIueCA9IC1iLng7XHJcbiAgICAgICAgICAgIGIueSA9IC1iLnk7XHJcbiAgICAgICAgICAgIGIueiA9IC1iLno7XHJcbiAgICAgICAgICAgIGIudyA9IC1iLnc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcclxuICAgICAgICBpZiAoKDEuMCAtIGNvc29tKSA+IDAuMDAwMDAxKSB7XHJcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxyXG4gICAgICAgICAgICBjb25zdCBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpbm9tID0gTWF0aC5zaW4ob21lZ2EpO1xyXG4gICAgICAgICAgICBzY2FsZTAgPSBNYXRoLnNpbigoMS4wIC0gdCkgKiBvbWVnYSkgLyBzaW5vbTtcclxuICAgICAgICAgICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcclxuICAgICAgICAgICAgLy8gIC4uLiBzbyB3ZSBjYW4gZG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvblxyXG4gICAgICAgICAgICBzY2FsZTAgPSAxLjAgLSB0O1xyXG4gICAgICAgICAgICBzY2FsZTEgPSB0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYWxjdWxhdGUgZmluYWwgdmFsdWVzXHJcbiAgICAgICAgb3V0LnggPSBzY2FsZTAgKiBhLnggKyBzY2FsZTEgKiBiLng7XHJcbiAgICAgICAgb3V0LnkgPSBzY2FsZTAgKiBhLnkgKyBzY2FsZTEgKiBiLnk7XHJcbiAgICAgICAgb3V0LnogPSBzY2FsZTAgKiBhLnogKyBzY2FsZTEgKiBiLno7XHJcbiAgICAgICAgb3V0LncgPSBzY2FsZTAgKiBhLncgKyBzY2FsZTEgKiBiLnc7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOW4puS4pOS4quaOp+WItueCueeahOWbm+WFg+aVsOeQg+mdouaPkuWAvFxyXG4gICAgICogISNlbiBRdWF0ZXJuaW9uIHdpdGggdHdvIHNwaGVyaWNhbCBpbnRlcnBvbGF0aW9uIGNvbnRyb2wgcG9pbnRzXHJcbiAgICAgKiBAbWV0aG9kIHNxbGVycFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNxbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIGM6IE91dCwgZDogT3V0LCB0OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNxbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIGM6IE91dCwgZDogT3V0LCB0OiBudW1iZXIpIHtcclxuICAgICAgICBRdWF0LnNsZXJwKHF0XzEsIGEsIGQsIHQpO1xyXG4gICAgICAgIFF1YXQuc2xlcnAocXRfMiwgYiwgYywgdCk7XHJcbiAgICAgICAgUXVhdC5zbGVycChvdXQsIHF0XzEsIHF0XzIsIDIgKiB0ICogKDEgLSB0KSk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5Zub5YWD5pWw5rGC6YCGXHJcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gaW52ZXJzZVxyXG4gICAgICogQG1ldGhvZCBpbnZlcnRcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBpbnZlcnQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW52ZXJ0PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpIHtcclxuICAgICAgICBjb25zdCBkb3QgPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XHJcbiAgICAgICAgY29uc3QgaW52RG90ID0gZG90ID8gMS4wIC8gZG90IDogMDtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogV291bGQgYmUgZmFzdGVyIHRvIHJldHVybiBbMCwwLDAsMF0gaW1tZWRpYXRlbHkgaWYgZG90ID09IDBcclxuXHJcbiAgICAgICAgb3V0LnggPSAtYS54ICogaW52RG90O1xyXG4gICAgICAgIG91dC55ID0gLWEueSAqIGludkRvdDtcclxuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnZEb3Q7XHJcbiAgICAgICAgb3V0LncgPSBhLncgKiBpbnZEb3Q7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5rGC5YWx6L2t5Zub5YWD5pWw77yM5a+55Y2V5L2N5Zub5YWD5pWw5LiO5rGC6YCG562J5Lu377yM5L2G5pu06auY5pWIXHJcbiAgICAgKiAhI2VuIENvbmp1Z2F0aW5nIGEgcXVhdGVybmlvbiwgYW5kIHRoZSB1bml0IHF1YXRlcm5pb24gZXF1aXZhbGVudCB0byBpbnZlcnNpb24sIGJ1dCBtb3JlIGVmZmljaWVudFxyXG4gICAgICogQG1ldGhvZCBjb25qdWdhdGVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb25qdWdhdGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29uanVnYXRlPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBvdXQueCA9IC1hLng7XHJcbiAgICAgICAgb3V0LnkgPSAtYS55O1xyXG4gICAgICAgIG91dC56ID0gLWEuejtcclxuICAgICAgICBvdXQudyA9IGEudztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLlm5vlhYPmlbDplb/luqZcclxuICAgICAqICEjZW4gU2VlayBsZW5ndGggcXVhdGVybmlvblxyXG4gICAgICogQG1ldGhvZCBsZW5cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsZW48T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KTogbnVtYmVyXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsZW48T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmsYLlm5vlhYPmlbDplb/luqblubPmlrlcclxuICAgICAqICEjZW4gU2Vla2luZyBxdWF0ZXJuaW9uIHNxdWFyZSBvZiB0aGUgbGVuZ3RoXHJcbiAgICAgKiBAbWV0aG9kIGxlbmd0aFNxclxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxlbmd0aFNxcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQpOiBudW1iZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxlbmd0aFNxcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlvZLkuIDljJblm5vlhYPmlbBcclxuICAgICAqICEjZW4gTm9ybWFsaXplZCBxdWF0ZXJuaW9uc1xyXG4gICAgICogQG1ldGhvZCBub3JtYWxpemVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBub3JtYWxpemU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbm9ybWFsaXplPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcclxuICAgICAgICBsZXQgbGVuID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcclxuICAgICAgICAgICAgb3V0LnggPSBhLnggKiBsZW47XHJcbiAgICAgICAgICAgIG91dC55ID0gYS55ICogbGVuO1xyXG4gICAgICAgICAgICBvdXQueiA9IGEueiAqIGxlbjtcclxuICAgICAgICAgICAgb3V0LncgPSBhLncgKiBsZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOagueaNruacrOWcsOWdkOagh+i9tOacneWQkeiuoeeul+Wbm+WFg+aVsO+8jOm7mOiupOS4ieWQkemHj+mDveW3suW9kuS4gOWMluS4lOebuOS6kuWeguebtFxyXG4gICAgICogISNlbiBDYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgbG9jYWwgb3JpZW50YXRpb24gcXVhdGVybmlvbiBjb29yZGluYXRlIGF4aXMsIHRoZSBkZWZhdWx0IHRocmVlIHZlY3RvcnMgYXJlIG5vcm1hbGl6ZWQgYW5kIG11dHVhbGx5IHBlcnBlbmRpY3VsYXJcclxuICAgICAqIEBtZXRob2QgZnJvbUF4ZXNcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXhlczxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeEF4aXM6IFZlY0xpa2UsIHlBeGlzOiBWZWNMaWtlLCB6QXhpczogVmVjTGlrZSk6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbUF4ZXM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHhBeGlzOiBWZWNMaWtlLCB5QXhpczogVmVjTGlrZSwgekF4aXM6IFZlY0xpa2UpIHtcclxuICAgICAgICBNYXQzLnNldChtM18xLFxyXG4gICAgICAgICAgICB4QXhpcy54LCB4QXhpcy55LCB4QXhpcy56LFxyXG4gICAgICAgICAgICB5QXhpcy54LCB5QXhpcy55LCB5QXhpcy56LFxyXG4gICAgICAgICAgICB6QXhpcy54LCB6QXhpcy55LCB6QXhpcy56LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgUXVhdC5mcm9tTWF0MyhvdXQsIG0zXzEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5qC55o2u6KeG5Y+j55qE5YmN5pa55ZCR5ZKM5LiK5pa55ZCR6K6h566X5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIFRoZSBmb3J3YXJkIGRpcmVjdGlvbiBhbmQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgdmlld3BvcnQgY29tcHV0aW5nIHF1YXRlcm5pb25cclxuICAgICAqIEBtZXRob2QgZnJvbVZpZXdVcFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZyb21WaWV3VXA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHZpZXc6IFZlYzMsIHVwPzogVmVjMyk6IE91dFxyXG4gICAgICogQHBhcmFtIHZpZXcg6KeG5Y+j6Z2i5ZCR55qE5YmN5pa55ZCR77yM5b+F6aG75b2S5LiA5YyWXHJcbiAgICAgKiBAcGFyYW0gdXAg6KeG5Y+j55qE5LiK5pa55ZCR77yM5b+F6aG75b2S5LiA5YyW77yM6buY6K6k5Li6ICgwLCAxLCAwKVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVZpZXdVcDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgdmlldzogVmVjMywgdXA/OiBWZWMzKSB7XHJcbiAgICAgICAgTWF0My5mcm9tVmlld1VwKG0zXzEsIHZpZXcsIHVwKTtcclxuICAgICAgICByZXR1cm4gUXVhdC5ub3JtYWxpemUob3V0LCBRdWF0LmZyb21NYXQzKG91dCwgbTNfMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja7ml4vovazovbTlkozml4vovazlvKfluqborqHnrpflm5vlhYPmlbBcclxuICAgICAqICEjZW4gVGhlIHF1YXRlcm5pb24gY2FsY3VsYXRlZCBhbmQgdGhlIGFyYyBvZiByb3RhdGlvbiBvZiB0aGUgcm90YXJ5IHNoYWZ0XHJcbiAgICAgKiBAbWV0aG9kIGZyb21BeGlzQW5nbGVcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcik6IE91dFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZnJvbUF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcclxuICAgICAgICByYWQgPSByYWQgKiAwLjU7XHJcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XHJcbiAgICAgICAgb3V0LnggPSBzICogYXhpcy54O1xyXG4gICAgICAgIG91dC55ID0gcyAqIGF4aXMueTtcclxuICAgICAgICBvdXQueiA9IHMgKiBheGlzLno7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyhyYWQpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgYSBxdWF0ZXJuaW9uIGZyb20gdGhlIGdpdmVuIGV1bGVyIGFuZ2xlIDAsIDAsIHouXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtRdWF0fSBvdXQgLSBRdWF0ZXJuaW9uIHRvIHN0b3JlIHJlc3VsdC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0gQW5nbGUgdG8gcm90YXRlIGFyb3VuZCBaIGF4aXMgaW4gZGVncmVlcy5cclxuICAgICAqIEByZXR1cm5zIHtRdWF0fVxyXG4gICAgICogQGZ1bmN0aW9uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQW5nbGVaIChvdXQ6IFF1YXQsIHo6IG51bWJlcik6IFF1YXQge1xyXG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xyXG4gICAgICAgIG91dC54ID0gb3V0LnkgPSAwO1xyXG4gICAgICAgIG91dC56ID0gTWF0aC5zaW4oeik7XHJcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyh6KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja7kuInnu7Tnn6npmLXkv6Hmga/orqHnrpflm5vlhYPmlbDvvIzpu5jorqTovpPlhaXnn6npmLXkuI3lkKvmnInnvKnmlL7kv6Hmga9cclxuICAgICAqICEjZW4gQ2FsY3VsYXRpbmcgdGhlIHRocmVlLWRpbWVuc2lvbmFsIHF1YXRlcm5pb24gbWF0cml4IGluZm9ybWF0aW9uLCBkZWZhdWx0IHpvb20gaW5mb3JtYXRpb24gaW5wdXQgbWF0cml4IGRvZXMgbm90IGNvbnRhaW5cclxuICAgICAqIEBtZXRob2QgZnJvbU1hdDNcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tTWF0MzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgbWF0OiBNYXQzKTogT3V0XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tTWF0MzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgbWF0OiBNYXQzKSB7XHJcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcclxuICAgICAgICBsZXQgbTAwID0gbVswXSwgbTEwID0gbVsxXSwgbTIwID0gbVsyXSxcclxuICAgICAgICAgICAgbTAxID0gbVszXSwgbTExID0gbVs0XSwgbTIxID0gbVs1XSxcclxuICAgICAgICAgICAgbTAyID0gbVs2XSwgbTEyID0gbVs3XSwgbTIyID0gbVs4XTtcclxuXHJcbiAgICAgICAgY29uc3QgdHJhY2UgPSBtMDAgKyBtMTEgKyBtMjI7XHJcblxyXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCh0cmFjZSArIDEuMCk7XHJcblxyXG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzO1xyXG4gICAgICAgICAgICBvdXQueCA9IChtMjEgLSBtMTIpICogcztcclxuICAgICAgICAgICAgb3V0LnkgPSAobTAyIC0gbTIwKSAqIHM7XHJcbiAgICAgICAgICAgIG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKChtMDAgPiBtMTEpICYmIChtMDAgPiBtMjIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTAwIC0gbTExIC0gbTIyKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53ID0gKG0yMSAtIG0xMikgLyBzO1xyXG4gICAgICAgICAgICBvdXQueCA9IDAuMjUgKiBzO1xyXG4gICAgICAgICAgICBvdXQueSA9IChtMDEgKyBtMTApIC8gcztcclxuICAgICAgICAgICAgb3V0LnogPSAobTAyICsgbTIwKSAvIHM7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobTExID4gbTIyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTExIC0gbTAwIC0gbTIyKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53ID0gKG0wMiAtIG0yMCkgLyBzO1xyXG4gICAgICAgICAgICBvdXQueCA9IChtMDEgKyBtMTApIC8gcztcclxuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogcztcclxuICAgICAgICAgICAgb3V0LnogPSAobTEyICsgbTIxKSAvIHM7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTIyIC0gbTAwIC0gbTExKTtcclxuXHJcbiAgICAgICAgICAgIG91dC53ID0gKG0xMCAtIG0wMSkgLyBzO1xyXG4gICAgICAgICAgICBvdXQueCA9IChtMDIgKyBtMjApIC8gcztcclxuICAgICAgICAgICAgb3V0LnkgPSAobTEyICsgbTIxKSAvIHM7XHJcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja7mrKfmi4nop5Lkv6Hmga/orqHnrpflm5vlhYPmlbDvvIzml4vovazpobrluo/kuLogWVpYXHJcbiAgICAgKiAhI2VuIFRoZSBxdWF0ZXJuaW9uIGNhbGN1bGF0ZWQgRXVsZXIgYW5nbGUgaW5mb3JtYXRpb24sIHJvdGF0aW9uIG9yZGVyIFlaWFxyXG4gICAgICogQG1ldGhvZCBmcm9tRXVsZXJcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tRXVsZXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZyb21FdWxlcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgICAgIHggKj0gaGFsZlRvUmFkO1xyXG4gICAgICAgIHkgKj0gaGFsZlRvUmFkO1xyXG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xyXG5cclxuICAgICAgICBjb25zdCBzeCA9IE1hdGguc2luKHgpO1xyXG4gICAgICAgIGNvbnN0IGN4ID0gTWF0aC5jb3MoeCk7XHJcbiAgICAgICAgY29uc3Qgc3kgPSBNYXRoLnNpbih5KTtcclxuICAgICAgICBjb25zdCBjeSA9IE1hdGguY29zKHkpO1xyXG4gICAgICAgIGNvbnN0IHN6ID0gTWF0aC5zaW4oeik7XHJcbiAgICAgICAgY29uc3QgY3ogPSBNYXRoLmNvcyh6KTtcclxuXHJcbiAgICAgICAgb3V0LnggPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XHJcbiAgICAgICAgb3V0LnkgPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XHJcbiAgICAgICAgb3V0LnogPSBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3o7XHJcbiAgICAgICAgb3V0LncgPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOi/lOWbnuWumuS5ieatpOWbm+WFg+aVsOeahOWdkOagh+ezuyBYIOi9tOWQkemHj1xyXG4gICAgICogISNlbiBUaGlzIHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgcXVhdGVybmlvbiBjb29yZGluYXRlIHN5c3RlbSBYLWF4aXMgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIHRvQXhpc1hcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0b0F4aXNYPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KTogVmVjTGlrZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9BeGlzWDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xyXG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xyXG4gICAgICAgIG91dC54ID0gMS4wIC0gZnkgKiBxLnkgLSBmeiAqIHEuejtcclxuICAgICAgICBvdXQueSA9IGZ5ICogcS54ICsgZnogKiBxLnc7XHJcbiAgICAgICAgb3V0LnogPSBmeiAqIHEueCArIGZ5ICogcS53O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDov5Tlm57lrprkuYnmraTlm5vlhYPmlbDnmoTlnZDmoIfns7sgWSDovbTlkJHph49cclxuICAgICAqICEjZW4gVGhpcyByZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIHF1YXRlcm5pb24gY29vcmRpbmF0ZSBzeXN0ZW0gWSBheGlzIHZlY3RvclxyXG4gICAgICogQG1ldGhvZCB0b0F4aXNZXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9BeGlzWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCk6IFZlY0xpa2VcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHRvQXhpc1k8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBxOiBPdXQpIHtcclxuICAgICAgICBjb25zdCBmeCA9IDIuMCAqIHEueDtcclxuICAgICAgICBjb25zdCBmeSA9IDIuMCAqIHEueTtcclxuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcclxuICAgICAgICBvdXQueCA9IGZ5ICogcS54IC0gZnogKiBxLnc7XHJcbiAgICAgICAgb3V0LnkgPSAxLjAgLSBmeCAqIHEueCAtIGZ6ICogcS56O1xyXG4gICAgICAgIG91dC56ID0gZnogKiBxLnkgKyBmeCAqIHEudztcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg6L+U5Zue5a6a5LmJ5q2k5Zub5YWD5pWw55qE5Z2Q5qCH57O7IFog6L205ZCR6YePXHJcbiAgICAgKiAhI2VuIFRoaXMgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBxdWF0ZXJuaW9uIGNvb3JkaW5hdGUgc3lzdGVtIHRoZSBaLWF4aXMgdmVjdG9yXHJcbiAgICAgKiBAbWV0aG9kIHRvQXhpc1pcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiB0b0F4aXNaPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KTogVmVjTGlrZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdG9BeGlzWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCkge1xyXG4gICAgICAgIGNvbnN0IGZ4ID0gMi4wICogcS54O1xyXG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xyXG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xyXG4gICAgICAgIG91dC54ID0gZnogKiBxLnggLSBmeSAqIHEudztcclxuICAgICAgICBvdXQueSA9IGZ6ICogcS55IC0gZnggKiBxLnc7XHJcbiAgICAgICAgb3V0LnogPSAxLjAgLSBmeCAqIHEueCAtIGZ5ICogcS55O1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDmoLnmja7lm5vlhYPmlbDorqHnrpfmrKfmi4nop5LvvIzov5Tlm57op5LluqYgeCwgeSDlnKggWy0xODAsIDE4MF0g5Yy66Ze05YaFLCB6IOm7mOiupOWcqCBbLTkwLCA5MF0g5Yy66Ze05YaF77yM5peL6L2s6aG65bqP5Li6IFlaWFxyXG4gICAgICogISNlbiBUaGUgcXVhdGVybmlvbiBjYWxjdWxhdGVkIEV1bGVyIGFuZ2xlcywgcmV0dXJuIGFuZ2xlIHgsIHkgaW4gdGhlIFstMTgwLCAxODBdIGludGVydmFsLCB6IGRlZmF1bHQgdGhlIHJhbmdlIFstOTAsIDkwXSBpbnRlcnZhbCwgdGhlIHJvdGF0aW9uIG9yZGVyIFlaWFxyXG4gICAgICogQG1ldGhvZCB0b0V1bGVyXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9FdWxlcjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogSVF1YXRMaWtlLCBvdXRlclo/OiBib29sZWFuKTogT3V0XHJcbiAgICAgKiBAcGFyYW0gb3V0ZXJaIHog5Y+W5YC86IyD5Zu05Yy66Ze05pS55Li6IFstMTgwLCAtOTBdIFUgWzkwLCAxODBdXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b0V1bGVyPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UsIG91dGVyWj86IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XHJcbiAgICAgICAgbGV0IGJhbmsgPSAwO1xyXG4gICAgICAgIGxldCBoZWFkaW5nID0gMDtcclxuICAgICAgICBsZXQgYXR0aXR1ZGUgPSAwO1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSB4ICogeSArIHogKiB3O1xyXG4gICAgICAgIGlmICh0ZXN0ID4gMC40OTk5OTkpIHtcclxuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xyXG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoMiAqIE1hdGguYXRhbjIoeCwgdykpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IDkwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGVzdCA8IC0wLjQ5OTk5OSkge1xyXG4gICAgICAgICAgICBiYW5rID0gMDsgLy8gZGVmYXVsdCB0byB6ZXJvXHJcbiAgICAgICAgICAgIGhlYWRpbmcgPSAtdG9EZWdyZWUoMiAqIE1hdGguYXRhbjIoeCwgdykpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IC05MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBzcXggPSB4ICogeDtcclxuICAgICAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNxeiA9IHogKiB6O1xyXG4gICAgICAgICAgICBiYW5rID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeCAqIHcgLSAyICogeSAqIHosIDEgLSAyICogc3F4IC0gMiAqIHNxeikpO1xyXG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikpO1xyXG4gICAgICAgICAgICBhdHRpdHVkZSA9IHRvRGVncmVlKE1hdGguYXNpbigyICogdGVzdCkpO1xyXG4gICAgICAgICAgICBpZiAob3V0ZXJaKSB7XHJcbiAgICAgICAgICAgICAgICBiYW5rID0gLTE4MCAqIE1hdGguc2lnbihiYW5rICsgMWUtNikgKyBiYW5rO1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZyA9IC0xODAgKiBNYXRoLnNpZ24oaGVhZGluZyArIDFlLTYpICsgaGVhZGluZztcclxuICAgICAgICAgICAgICAgIGF0dGl0dWRlID0gMTgwICogTWF0aC5zaWduKGF0dGl0dWRlICsgMWUtNikgLSBhdHRpdHVkZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQueCA9IGJhbms7IG91dC55ID0gaGVhZGluZzsgb3V0LnogPSBhdHRpdHVkZTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlm5vlhYPmlbDnrYnku7fliKTmlq1cclxuICAgICAqICEjZW4gQW5hbHl6aW5nIHF1YXRlcm5pb24gZXF1aXZhbGVudFxyXG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHNcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBib29sZWFuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcclxuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkgJiYgYS56ID09PSBiLnogJiYgYS53ID09PSBiLnc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poIOaOkumZpOa1rueCueaVsOivr+W3rueahOWbm+WFg+aVsOi/keS8vOetieS7t+WIpOaWrVxyXG4gICAgICogISNlbiBOZWdhdGl2ZSBmbG9hdGluZyBwb2ludCBlcnJvciBxdWF0ZXJuaW9uIGFwcHJveGltYXRlbHkgZXF1aXZhbGVudCBBbmFseXppbmdcclxuICAgICAqIEBtZXRob2QgZXF1YWxzXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZXF1YWxzPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5hYnMoYS54IC0gYi54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLngpLCBNYXRoLmFicyhiLngpKSAmJlxyXG4gICAgICAgICAgICBNYXRoLmFicyhhLnkgLSBiLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueSksIE1hdGguYWJzKGIueSkpICYmXHJcbiAgICAgICAgICAgIE1hdGguYWJzKGEueiAtIGIueikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS56KSwgTWF0aC5hYnMoYi56KSkgJiZcclxuICAgICAgICAgICAgTWF0aC5hYnMoYS53IC0gYi53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLncpLCBNYXRoLmFicyhiLncpKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aCDlm5vlhYPmlbDovazmlbDnu4RcclxuICAgICAqICEjZW4gUXVhdGVybmlvbiByb3RhdGlvbiBhcnJheVxyXG4gICAgICogQG1ldGhvZCB0b0FycmF5XHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgcTogSVF1YXRMaWtlLCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE5YaF55qE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UsIG9mcyA9IDApIHtcclxuICAgICAgICBvdXRbb2ZzICsgMF0gPSBxLng7XHJcbiAgICAgICAgb3V0W29mcyArIDFdID0gcS55O1xyXG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHEuejtcclxuICAgICAgICBvdXRbb2ZzICsgM10gPSBxLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemgg5pWw57uE6L2s5Zub5YWD5pWwXHJcbiAgICAgKiAhI2VuIEFycmF5IHRvIGEgcXVhdGVybmlvblxyXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcclxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnMgPSAwKSB7XHJcbiAgICAgICAgb3V0LnggPSBhcnJbb2ZzICsgMF07XHJcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XHJcbiAgICAgICAgb3V0LnogPSBhcnJbb2ZzICsgMl07XHJcbiAgICAgICAgb3V0LncgPSBhcnJbb2ZzICsgM107XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0geFxyXG4gICAgICovXHJcbiAgICB4OiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XHJcbiAgICAgKi9cclxuICAgIHk6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHpcclxuICAgICAqL1xyXG4gICAgejogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gd1xyXG4gICAgICovXHJcbiAgICB3OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHg6IFF1YXQgfCBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB6OiBudW1iZXIgPSAwLCB3OiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy55ID0geC55O1xyXG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHggYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgICAgICB0aGlzLnogPSB6O1xyXG4gICAgICAgICAgICB0aGlzLncgPSB3O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gY2xvbmUgYSBRdWF0IG9iamVjdCBhbmQgcmV0dXJuIHRoZSBuZXcgb2JqZWN0XHJcbiAgICAgKiAhI3poIOWFi+mahuS4gOS4quWbm+WFg+aVsOW5tui/lOWbnlxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHJldHVybiB7UXVhdH1cclxuICAgICAqL1xyXG4gICAgY2xvbmUgKCk6IFF1YXQge1xyXG4gICAgICAgIHJldHVybiBuZXcgUXVhdCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdmFsdWVzIHdpdGggYW5vdGhlciBxdWF0ZXJuaW9uXHJcbiAgICAgKiAhI3poIOeUqOWPpuS4gOS4quWbm+WFg+aVsOeahOWAvOiuvue9ruWIsOW9k+WJjeWvueixoeS4iuOAglxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSB7UXVhdH0gbmV3VmFsdWUgLSAhI2VuIG5ldyB2YWx1ZSB0byBzZXQuICEjemgg6KaB6K6+572u55qE5paw5YC8XHJcbiAgICAgKiBAcmV0dXJuIHtRdWF0fSByZXR1cm5zIHRoaXNcclxuICAgICAqIEBjaGFpbmFibGVcclxuICAgICAqL1xyXG4gICAgc2V0IChuZXdWYWx1ZTogUXVhdCk6IHRoaXMge1xyXG4gICAgICAgIHRoaXMueCA9IG5ld1ZhbHVlLng7XHJcbiAgICAgICAgdGhpcy55ID0gbmV3VmFsdWUueTtcclxuICAgICAgICB0aGlzLnogPSBuZXdWYWx1ZS56O1xyXG4gICAgICAgIHRoaXMudyA9IG5ld1ZhbHVlLnc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgY3VycmVudCBxdWF0ZXJuaW9uIGVxdWFscyBhbm90aGVyXHJcbiAgICAgKiAhI3poIOW9k+WJjeeahOWbm+WFg+aVsOaYr+WQpuS4juaMh+WumueahOWbm+WFg+aVsOebuOetieOAglxyXG4gICAgICogQG1ldGhvZCBlcXVhbHNcclxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGVxdWFscyAob3RoZXI6IFF1YXQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueSAmJiB0aGlzLnogPT09IG90aGVyLnogJiYgdGhpcy53ID09PSBvdGhlci53O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb252ZXJ0IHF1YXRlcm5pb24gdG8gZXVsZXJcclxuICAgICAqICEjemgg6L2s5o2i5Zub5YWD5pWw5Yiw5qyn5ouJ6KeSXHJcbiAgICAgKiBAbWV0aG9kIHRvRXVsZXJcclxuICAgICAqIEBwYXJhbSB7VmVjM30gb3V0XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMzfVxyXG4gICAgICovXHJcbiAgICB0b0V1bGVyIChvdXQ6IFZlYzMpOiBWZWMzIHtcclxuICAgICAgICByZXR1cm4gUXVhdC50b0V1bGVyKG91dCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbnZlcnQgZXVsZXIgdG8gcXVhdGVybmlvblxyXG4gICAgICogISN6aCDovazmjaLmrKfmi4nop5LliLDlm5vlhYPmlbBcclxuICAgICAqIEBtZXRob2QgZnJvbUV1bGVyXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGV1bGVyXHJcbiAgICAgKiBAcmV0dXJuIHtRdWF0fVxyXG4gICAgICovXHJcbiAgICBmcm9tRXVsZXIgKGV1bGVyOiBWZWMzKTogdGhpcyB7XHJcbiAgICAgICAgcmV0dXJuIFF1YXQuZnJvbUV1bGVyKHRoaXMsIGV1bGVyLngsIGV1bGVyLnksIGV1bGVyLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDYWxjdWxhdGUgdGhlIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvXHJcbiAgICAgKiAhI3poIOiuoeeul+Wbm+WFg+aVsOeahOaPkuWAvOe7k+aenFxyXG4gICAgICogQG1lbWJlciBsZXJwXHJcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHRvXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW9cclxuICAgICAqIEBwYXJhbSB7UXVhdH0gW291dF1cclxuICAgICAqIEByZXR1cm5zIHtRdWF0fSBvdXRcclxuICAgICAqL1xyXG4gICAgbGVycCAodG86IFF1YXQsIHJhdGlvOiBudW1iZXIsIG91dD86IFF1YXQpOiBRdWF0IHtcclxuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFF1YXQoKTtcclxuICAgICAgICBRdWF0LnNsZXJwKG91dCwgdGhpcywgdG8sIHJhdGlvKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDYWxjdWxhdGUgdGhlIG11bHRpcGx5IHJlc3VsdCBiZXR3ZWVuIHRoaXMgcXVhdGVybmlvbiBhbmQgYW5vdGhlciBvbmVcclxuICAgICAqICEjemgg6K6h566X5Zub5YWD5pWw5LmY56ev55qE57uT5p6cXHJcbiAgICAgKiBAbWVtYmVyIG11bHRpcGx5XHJcbiAgICAgKiBAcGFyYW0ge1F1YXR9IG90aGVyXHJcbiAgICAgKiBAcmV0dXJucyB7UXVhdH0gdGhpc1xyXG4gICAgICovXHJcbiAgICBtdWx0aXBseSAob3RoZXI6IFF1YXQpOiB0aGlzIHtcclxuICAgICAgICByZXR1cm4gUXVhdC5tdWx0aXBseSh0aGlzLCB0aGlzLCBvdGhlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSAoaW4gcmFkaWFucykgYWJvdXQgYSB3b3JsZCBzcGFjZSBheGlzLlxyXG4gICAgICogISN6aCDlm7Tnu5XkuJbnlYznqbrpl7TovbTmjInnu5nlrprlvKfluqbml4vovazlm5vlhYPmlbBcclxuICAgICAqIEBtZW1iZXIgcm90YXRlQXJvdW5kXHJcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHJvdCAtIFF1YXRlcm5pb24gdG8gcm90YXRlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGF4aXMgLSBUaGUgYXhpcyBhcm91bmQgd2hpY2ggdG8gcm90YXRlIGluIHdvcmxkIHNwYWNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIC0gQW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxyXG4gICAgICogQHBhcmFtIHtRdWF0fSBbb3V0XSAtIFF1YXRlcm5pb24gdG8gc3RvcmUgcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJucyB7UXVhdH0gb3V0XHJcbiAgICAgKi9cclxuICAgIHJvdGF0ZUFyb3VuZCAocm90OiBRdWF0LCBheGlzOiBWZWMzLCByYWQ6IG51bWJlciwgb3V0PzogUXVhdCk6IFF1YXQge1xyXG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgUXVhdCgpO1xyXG4gICAgICAgIHJldHVybiBRdWF0LnJvdGF0ZUFyb3VuZChvdXQsIHJvdCwgYXhpcywgcmFkKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcXRfMSA9IG5ldyBRdWF0KCk7XHJcbmNvbnN0IHF0XzIgPSBuZXcgUXVhdCgpO1xyXG5jb25zdCB2M18xID0gbmV3IFZlYzMoKTtcclxuY29uc3QgbTNfMSA9IG5ldyBNYXQzKCk7XHJcbmNvbnN0IGhhbGZUb1JhZCA9IDAuNSAqIE1hdGguUEkgLyAxODAuMDtcclxuXHJcbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuUXVhdCcsIFF1YXQsIHsgeDogMCwgeTogMCwgejogMCwgdzogMSB9KTtcclxuXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIlF1YXRcIn19Y2MuUXVhdHt7L2Nyb3NzTGlua319LlxyXG4gKiAhI3poIOmAmui/h+ivpeeugOS+v+eahOWHveaVsOi/m+ihjOWIm+W7uiB7eyNjcm9zc0xpbmsgXCJRdWF0XCJ9fWNjLlF1YXR7ey9jcm9zc0xpbmt9fSDlr7nosaHjgIJcclxuICogQG1ldGhvZCBxdWF0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW3g9MF1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFt5PTBdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbej0wXVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3c9MV1cclxuICogQHJldHVybiB7UXVhdH1cclxuICovXHJcbmNjLnF1YXQgPSBmdW5jdGlvbiBxdWF0ICh4LCB5LCB6LCB3KSB7XHJcbiAgICByZXR1cm4gbmV3IFF1YXQoeCwgeSwgeiwgdyk7XHJcbn07XHJcblxyXG5jYy5RdWF0ID0gUXVhdDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=