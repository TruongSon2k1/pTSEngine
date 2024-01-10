
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/plane.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../value-types");

var _enums = _interopRequireDefault(require("./enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var v1 = new _valueTypes.Vec3(0, 0, 0);
var v2 = new _valueTypes.Vec3(0, 0, 0);
var temp_mat = cc.mat4();
var temp_vec4 = cc.v4();
/**
 * !#en
 * plane。
 * !#zh
 * 平面。
 * @class geomUtils.Plane
 */

var plane = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new plane
   * !#zh
   * 创建一个新的 plane。
   * @method create
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   * @return {Plane}
   */
  plane.create = function create(nx, ny, nz, d) {
    return new plane(nx, ny, nz, d);
  }
  /**
   * !#en
   * clone a new plane
   * !#zh
   * 克隆一个新的 plane。
   * @method clone
   * @param {Plane} p The source of cloning.
   * @return {Plane} The cloned object.
   */
  ;

  plane.clone = function clone(p) {
    return new plane(p.n.x, p.n.y, p.n.z, p.d);
  }
  /**
   * !#en
   * copy the values from one plane to another
   * !#zh
   * 复制一个平面的值到另一个。
   * @method copy
   * @param {Plane} out The object that accepts the action.
   * @param {Plane} p The source of the copy.
   * @return {Plane} The object that accepts the action.
   */
  ;

  plane.copy = function copy(out, p) {
    _valueTypes.Vec3.copy(out.n, p.n);

    out.d = p.d;
    return out;
  }
  /**
   * !#en
   * create a plane from three points
   * !#zh
   * 用三个点创建一个平面。
   * @method fromPoints
   * @param {Plane} out The object that accepts the action.
   * @param {Vec3} a Point a。
   * @param {Vec3} b Point b。
   * @param {Vec3} c Point c。
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.fromPoints = function fromPoints(out, a, b, c) {
    _valueTypes.Vec3.subtract(v1, b, a);

    _valueTypes.Vec3.subtract(v2, c, a);

    _valueTypes.Vec3.normalize(out.n, _valueTypes.Vec3.cross(out.n, v1, v2));

    out.d = _valueTypes.Vec3.dot(out.n, a);
    return out;
  }
  /**
   * !#en
   * Set the components of a plane to the given values
   * !#zh
   * 将给定平面的属性设置为给定值。
   * @method set
   * @param {Plane} out The object that accepts the action.
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.set = function set(out, nx, ny, nz, d) {
    out.n.x = nx;
    out.n.y = ny;
    out.n.z = nz;
    out.d = d;
    return out;
  }
  /**
   * !#en
   * create plane from normal and point
   * !#zh
   * 用一条法线和一个点创建平面。
   * @method fromNormalAndPoint
   * @param {Plane} out The object that accepts the action.
   * @param {Vec3} normal The normal of a plane.
   * @param {Vec3} point A point on the plane.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.fromNormalAndPoint = function fromNormalAndPoint(out, normal, point) {
    _valueTypes.Vec3.copy(out.n, normal);

    out.d = _valueTypes.Vec3.dot(normal, point);
    return out;
  }
  /**
   * !#en
   * normalize a plane
   * !#zh
   * 归一化一个平面。
   * @method normalize
   * @param {Plane} out The object that accepts the action.
   * @param {Plane} a Source data for operations.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.normalize = function normalize(out, a) {
    var len = a.n.len();

    _valueTypes.Vec3.normalize(out.n, a.n);

    if (len > 0) {
      out.d = a.d / len;
    }

    return out;
  }
  /**
   * !#en
   * A normal vector.
   * !#zh
   * 法线向量。
   * @property {Vec3} n
   */
  ;

  /**
   * !#en Construct a plane.
   * !#zh 构造一个平面。
   * @constructor
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   */
  function plane(nx, ny, nz, d) {
    if (nx === void 0) {
      nx = 0;
    }

    if (ny === void 0) {
      ny = 1;
    }

    if (nz === void 0) {
      nz = 0;
    }

    if (d === void 0) {
      d = 0;
    }

    this.n = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_PLANE;
    this.n = new _valueTypes.Vec3(nx, ny, nz);
    this.d = d;
  }
  /**
   * !#en
   * Transform a plane.
   * !#zh
   * 变换一个平面。
   * @method transform
   * @param {Mat4} mat
   */


  var _proto = plane.prototype;

  _proto.transform = function transform(mat) {
    _valueTypes.Mat4.invert(temp_mat, mat);

    _valueTypes.Mat4.transpose(temp_mat, temp_mat);

    _valueTypes.Vec4.set(temp_vec4, this.n.x, this.n.y, this.n.z, this.d);

    _valueTypes.Vec4.transformMat4(temp_vec4, temp_vec4, temp_mat);

    _valueTypes.Vec3.set(this.n, temp_vec4.x, temp_vec4.y, temp_vec4.z);

    this.d = temp_vec4.w;
  };

  return plane;
}();

exports["default"] = plane;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXHBsYW5lLnRzIl0sIm5hbWVzIjpbInYxIiwiVmVjMyIsInYyIiwidGVtcF9tYXQiLCJjYyIsIm1hdDQiLCJ0ZW1wX3ZlYzQiLCJ2NCIsInBsYW5lIiwiY3JlYXRlIiwibngiLCJueSIsIm56IiwiZCIsImNsb25lIiwicCIsIm4iLCJ4IiwieSIsInoiLCJjb3B5Iiwib3V0IiwiZnJvbVBvaW50cyIsImEiLCJiIiwiYyIsInN1YnRyYWN0Iiwibm9ybWFsaXplIiwiY3Jvc3MiLCJkb3QiLCJzZXQiLCJmcm9tTm9ybWFsQW5kUG9pbnQiLCJub3JtYWwiLCJwb2ludCIsImxlbiIsIl90eXBlIiwiZW51bXMiLCJTSEFQRV9QTEFORSIsInRyYW5zZm9ybSIsIm1hdCIsIk1hdDQiLCJpbnZlcnQiLCJ0cmFuc3Bvc2UiLCJWZWM0IiwidHJhbnNmb3JtTWF0NCIsInciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7Ozs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0EsSUFBTUEsRUFBRSxHQUFHLElBQUlDLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQVg7QUFDQSxJQUFNQyxFQUFFLEdBQUcsSUFBSUQsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBWDtBQUNBLElBQU1FLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxJQUFILEVBQWpCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixFQUFFLENBQUNHLEVBQUgsRUFBbEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFDcUJDO0FBRWpCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtRQUNrQkMsU0FBZCxnQkFBc0JDLEVBQXRCLEVBQWtDQyxFQUFsQyxFQUE4Q0MsRUFBOUMsRUFBMERDLENBQTFELEVBQXFFO0FBQ2pFLFdBQU8sSUFBSUwsS0FBSixDQUFVRSxFQUFWLEVBQWNDLEVBQWQsRUFBa0JDLEVBQWxCLEVBQXNCQyxDQUF0QixDQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztRQUNrQkMsUUFBZCxlQUFxQkMsQ0FBckIsRUFBK0I7QUFDM0IsV0FBTyxJQUFJUCxLQUFKLENBQVVPLENBQUMsQ0FBQ0MsQ0FBRixDQUFJQyxDQUFkLEVBQWlCRixDQUFDLENBQUNDLENBQUYsQ0FBSUUsQ0FBckIsRUFBd0JILENBQUMsQ0FBQ0MsQ0FBRixDQUFJRyxDQUE1QixFQUErQkosQ0FBQyxDQUFDRixDQUFqQyxDQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1FBQ2tCTyxPQUFkLGNBQW9CQyxHQUFwQixFQUFnQ04sQ0FBaEMsRUFBMEM7QUFDdENkLHFCQUFLbUIsSUFBTCxDQUFVQyxHQUFHLENBQUNMLENBQWQsRUFBaUJELENBQUMsQ0FBQ0MsQ0FBbkI7O0FBQ0FLLElBQUFBLEdBQUcsQ0FBQ1IsQ0FBSixHQUFRRSxDQUFDLENBQUNGLENBQVY7QUFFQSxXQUFPUSxHQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztRQUNrQkMsYUFBZCxvQkFBMEJELEdBQTFCLEVBQXNDRSxDQUF0QyxFQUErQ0MsQ0FBL0MsRUFBd0RDLENBQXhELEVBQWlFO0FBQzdEeEIscUJBQUt5QixRQUFMLENBQWMxQixFQUFkLEVBQWtCd0IsQ0FBbEIsRUFBcUJELENBQXJCOztBQUNBdEIscUJBQUt5QixRQUFMLENBQWN4QixFQUFkLEVBQWtCdUIsQ0FBbEIsRUFBcUJGLENBQXJCOztBQUVBdEIscUJBQUswQixTQUFMLENBQWVOLEdBQUcsQ0FBQ0wsQ0FBbkIsRUFBc0JmLGlCQUFLMkIsS0FBTCxDQUFXUCxHQUFHLENBQUNMLENBQWYsRUFBa0JoQixFQUFsQixFQUFzQkUsRUFBdEIsQ0FBdEI7O0FBQ0FtQixJQUFBQSxHQUFHLENBQUNSLENBQUosR0FBUVosaUJBQUs0QixHQUFMLENBQVNSLEdBQUcsQ0FBQ0wsQ0FBYixFQUFnQk8sQ0FBaEIsQ0FBUjtBQUVBLFdBQU9GLEdBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7UUFDa0JTLE1BQWQsYUFBbUJULEdBQW5CLEVBQStCWCxFQUEvQixFQUEyQ0MsRUFBM0MsRUFBdURDLEVBQXZELEVBQW1FQyxDQUFuRSxFQUE4RTtBQUMxRVEsSUFBQUEsR0FBRyxDQUFDTCxDQUFKLENBQU1DLENBQU4sR0FBVVAsRUFBVjtBQUNBVyxJQUFBQSxHQUFHLENBQUNMLENBQUosQ0FBTUUsQ0FBTixHQUFVUCxFQUFWO0FBQ0FVLElBQUFBLEdBQUcsQ0FBQ0wsQ0FBSixDQUFNRyxDQUFOLEdBQVVQLEVBQVY7QUFDQVMsSUFBQUEsR0FBRyxDQUFDUixDQUFKLEdBQVFBLENBQVI7QUFFQSxXQUFPUSxHQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7UUFDa0JVLHFCQUFkLDRCQUFrQ1YsR0FBbEMsRUFBOENXLE1BQTlDLEVBQTREQyxLQUE1RCxFQUF5RTtBQUNyRWhDLHFCQUFLbUIsSUFBTCxDQUFVQyxHQUFHLENBQUNMLENBQWQsRUFBaUJnQixNQUFqQjs7QUFDQVgsSUFBQUEsR0FBRyxDQUFDUixDQUFKLEdBQVFaLGlCQUFLNEIsR0FBTCxDQUFTRyxNQUFULEVBQWlCQyxLQUFqQixDQUFSO0FBRUEsV0FBT1osR0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztRQUNrQk0sWUFBZCxtQkFBeUJOLEdBQXpCLEVBQXFDRSxDQUFyQyxFQUErQztBQUMzQyxRQUFNVyxHQUFHLEdBQUdYLENBQUMsQ0FBQ1AsQ0FBRixDQUFJa0IsR0FBSixFQUFaOztBQUNBakMscUJBQUswQixTQUFMLENBQWVOLEdBQUcsQ0FBQ0wsQ0FBbkIsRUFBc0JPLENBQUMsQ0FBQ1AsQ0FBeEI7O0FBQ0EsUUFBSWtCLEdBQUcsR0FBRyxDQUFWLEVBQWE7QUFDVGIsTUFBQUEsR0FBRyxDQUFDUixDQUFKLEdBQVFVLENBQUMsQ0FBQ1YsQ0FBRixHQUFNcUIsR0FBZDtBQUNIOztBQUNELFdBQU9iLEdBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFjSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxpQkFBYVgsRUFBYixFQUFxQkMsRUFBckIsRUFBNkJDLEVBQTdCLEVBQXFDQyxDQUFyQyxFQUE0QztBQUFBLFFBQS9CSCxFQUErQjtBQUEvQkEsTUFBQUEsRUFBK0IsR0FBMUIsQ0FBMEI7QUFBQTs7QUFBQSxRQUF2QkMsRUFBdUI7QUFBdkJBLE1BQUFBLEVBQXVCLEdBQWxCLENBQWtCO0FBQUE7O0FBQUEsUUFBZkMsRUFBZTtBQUFmQSxNQUFBQSxFQUFlLEdBQVYsQ0FBVTtBQUFBOztBQUFBLFFBQVBDLENBQU87QUFBUEEsTUFBQUEsQ0FBTyxHQUFILENBQUc7QUFBQTs7QUFBQSxTQXRCckNHLENBc0JxQztBQUFBLFNBYnJDSCxDQWFxQztBQUFBLFNBWHBDc0IsS0FXb0M7QUFDeEMsU0FBS0EsS0FBTCxHQUFhQyxrQkFBTUMsV0FBbkI7QUFDQSxTQUFLckIsQ0FBTCxHQUFTLElBQUlmLGdCQUFKLENBQVNTLEVBQVQsRUFBYUMsRUFBYixFQUFpQkMsRUFBakIsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDV3lCLFlBQVAsbUJBQWtCQyxHQUFsQixFQUFtQztBQUMvQkMscUJBQUtDLE1BQUwsQ0FBWXRDLFFBQVosRUFBc0JvQyxHQUF0Qjs7QUFDQUMscUJBQUtFLFNBQUwsQ0FBZXZDLFFBQWYsRUFBeUJBLFFBQXpCOztBQUNBd0MscUJBQUtiLEdBQUwsQ0FBU3hCLFNBQVQsRUFBb0IsS0FBS1UsQ0FBTCxDQUFPQyxDQUEzQixFQUE4QixLQUFLRCxDQUFMLENBQU9FLENBQXJDLEVBQXdDLEtBQUtGLENBQUwsQ0FBT0csQ0FBL0MsRUFBa0QsS0FBS04sQ0FBdkQ7O0FBQ0E4QixxQkFBS0MsYUFBTCxDQUFtQnRDLFNBQW5CLEVBQThCQSxTQUE5QixFQUF5Q0gsUUFBekM7O0FBQ0FGLHFCQUFLNkIsR0FBTCxDQUFTLEtBQUtkLENBQWQsRUFBaUJWLFNBQVMsQ0FBQ1csQ0FBM0IsRUFBOEJYLFNBQVMsQ0FBQ1ksQ0FBeEMsRUFBMkNaLFNBQVMsQ0FBQ2EsQ0FBckQ7O0FBQ0EsU0FBS04sQ0FBTCxHQUFTUCxTQUFTLENBQUN1QyxDQUFuQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgTWF0NCwgVmVjMywgVmVjNCB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xyXG5cclxuY29uc3QgdjEgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuY29uc3QgdjIgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuY29uc3QgdGVtcF9tYXQgPSBjYy5tYXQ0KCk7XHJcbmNvbnN0IHRlbXBfdmVjNCA9IGNjLnY0KCk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBwbGFuZeOAglxyXG4gKiAhI3poXHJcbiAqIOW5s+mdouOAglxyXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLlBsYW5lXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGFuZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgcGxhbmVcclxuICAgICAqICEjemhcclxuICAgICAqIOWIm+W7uuS4gOS4quaWsOeahCBwbGFuZeOAglxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueCBUaGUgeCBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG55IFRoZSB5IHBhcnQgb2YgdGhlIG5vcm1hbCBjb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnogVGhlIHogcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIERpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi5cclxuICAgICAqIEByZXR1cm4ge1BsYW5lfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAobng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgZDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBwbGFuZShueCwgbnksIG56LCBkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNsb25lIGEgbmV3IHBsYW5lXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhYvpmobkuIDkuKrmlrDnmoQgcGxhbmXjgIJcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEBwYXJhbSB7UGxhbmV9IHAgVGhlIHNvdXJjZSBvZiBjbG9uaW5nLlxyXG4gICAgICogQHJldHVybiB7UGxhbmV9IFRoZSBjbG9uZWQgb2JqZWN0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIChwOiBwbGFuZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcGxhbmUocC5uLngsIHAubi55LCBwLm4ueiwgcC5kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBwbGFuZSB0byBhbm90aGVyXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlpI3liLbkuIDkuKrlubPpnaLnmoTlgLzliLDlj6bkuIDkuKrjgIJcclxuICAgICAqIEBtZXRob2QgY29weVxyXG4gICAgICogQHBhcmFtIHtQbGFuZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBwIFRoZSBzb3VyY2Ugb2YgdGhlIGNvcHkuXHJcbiAgICAgKiBAcmV0dXJuIHtQbGFuZX0gVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5IChvdXQ6IHBsYW5lLCBwOiBwbGFuZSkge1xyXG4gICAgICAgIFZlYzMuY29weShvdXQubiwgcC5uKTtcclxuICAgICAgICBvdXQuZCA9IHAuZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNyZWF0ZSBhIHBsYW5lIGZyb20gdGhyZWUgcG9pbnRzXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnlKjkuInkuKrngrnliJvlu7rkuIDkuKrlubPpnaLjgIJcclxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xyXG4gICAgICogQHBhcmFtIHtQbGFuZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGEgUG9pbnQgYeOAglxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBiIFBvaW50IGLjgIJcclxuICAgICAqIEBwYXJhbSB7VmVjM30gYyBQb2ludCBj44CCXHJcbiAgICAgKiBAcmV0dXJuIHtQbGFuZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVBvaW50cyAob3V0OiBwbGFuZSwgYTogVmVjMywgYjogVmVjMywgYzogVmVjMykge1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QodjEsIGIsIGEpO1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QodjIsIGMsIGEpO1xyXG5cclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQubiwgVmVjMy5jcm9zcyhvdXQubiwgdjEsIHYyKSk7XHJcbiAgICAgICAgb3V0LmQgPSBWZWMzLmRvdChvdXQubiwgYSk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBwbGFuZSB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlsIbnu5nlrprlubPpnaLnmoTlsZ7mgKforr7nva7kuLrnu5nlrprlgLzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueCBUaGUgeCBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG55IFRoZSB5IHBhcnQgb2YgdGhlIG5vcm1hbCBjb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnogVGhlIHogcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIERpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi5cclxuICAgICAqIEByZXR1cm4ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKG91dDogcGxhbmUsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIGQ6IG51bWJlcikge1xyXG4gICAgICAgIG91dC5uLnggPSBueDtcclxuICAgICAgICBvdXQubi55ID0gbnk7XHJcbiAgICAgICAgb3V0Lm4ueiA9IG56O1xyXG4gICAgICAgIG91dC5kID0gZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNyZWF0ZSBwbGFuZSBmcm9tIG5vcm1hbCBhbmQgcG9pbnRcclxuICAgICAqICEjemhcclxuICAgICAqIOeUqOS4gOadoeazlee6v+WSjOS4gOS4queCueWIm+W7uuW5s+mdouOAglxyXG4gICAgICogQG1ldGhvZCBmcm9tTm9ybWFsQW5kUG9pbnRcclxuICAgICAqIEBwYXJhbSB7UGxhbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBub3JtYWwgVGhlIG5vcm1hbCBvZiBhIHBsYW5lLlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBwb2ludCBBIHBvaW50IG9uIHRoZSBwbGFuZS5cclxuICAgICAqIEByZXR1cm4ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tTm9ybWFsQW5kUG9pbnQgKG91dDogcGxhbmUsIG5vcm1hbDogVmVjMywgcG9pbnQ6IFZlYzMpIHtcclxuICAgICAgICBWZWMzLmNvcHkob3V0Lm4sIG5vcm1hbCk7XHJcbiAgICAgICAgb3V0LmQgPSBWZWMzLmRvdChub3JtYWwsIHBvaW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIG5vcm1hbGl6ZSBhIHBsYW5lXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlvZLkuIDljJbkuIDkuKrlubPpnaLjgIJcclxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXHJcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7UGxhbmV9IGEgU291cmNlIGRhdGEgZm9yIG9wZXJhdGlvbnMuXHJcbiAgICAgKiBAcmV0dXJuIHtQbGFuZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbm9ybWFsaXplIChvdXQ6IHBsYW5lLCBhOiBwbGFuZSkge1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGEubi5sZW4oKTtcclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQubiwgYS5uKTtcclxuICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICBvdXQuZCA9IGEuZCAvIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEEgbm9ybWFsIHZlY3Rvci5cclxuICAgICAqICEjemhcclxuICAgICAqIOazlee6v+WQkemHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuOiBWZWMzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byB0aGUgcGxhbmUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDljp/ngrnliLDlubPpnaLnmoTot53nprvjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHlwZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb25zdHJ1Y3QgYSBwbGFuZS5cclxuICAgICAqICEjemgg5p6E6YCg5LiA5Liq5bmz6Z2i44CCXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueCBUaGUgeCBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG55IFRoZSB5IHBhcnQgb2YgdGhlIG5vcm1hbCBjb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnogVGhlIHogcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIERpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKG54ID0gMCwgbnkgPSAxLCBueiA9IDAsIGQgPSAwKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX1BMQU5FO1xyXG4gICAgICAgIHRoaXMubiA9IG5ldyBWZWMzKG54LCBueSwgbnopO1xyXG4gICAgICAgIHRoaXMuZCA9IGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUcmFuc2Zvcm0gYSBwbGFuZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWPmOaNouS4gOS4quW5s+mdouOAglxyXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7TWF0NH0gbWF0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0gKG1hdDogTWF0NCk6IHZvaWQge1xyXG4gICAgICAgIE1hdDQuaW52ZXJ0KHRlbXBfbWF0LCBtYXQpO1xyXG4gICAgICAgIE1hdDQudHJhbnNwb3NlKHRlbXBfbWF0LCB0ZW1wX21hdCk7XHJcbiAgICAgICAgVmVjNC5zZXQodGVtcF92ZWM0LCB0aGlzLm4ueCwgdGhpcy5uLnksIHRoaXMubi56LCB0aGlzLmQpO1xyXG4gICAgICAgIFZlYzQudHJhbnNmb3JtTWF0NCh0ZW1wX3ZlYzQsIHRlbXBfdmVjNCwgdGVtcF9tYXQpO1xyXG4gICAgICAgIFZlYzMuc2V0KHRoaXMubiwgdGVtcF92ZWM0LngsIHRlbXBfdmVjNC55LCB0ZW1wX3ZlYzQueik7XHJcbiAgICAgICAgdGhpcy5kID0gdGVtcF92ZWM0Lnc7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=