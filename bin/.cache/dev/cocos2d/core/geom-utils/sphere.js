
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/sphere.js';
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
var _v3_tmp = new _valueTypes.Vec3();
/**
 * !#en
 * Sphere.
 * !#zh
 * 轴对齐球。
 * @class geomUtils.Sphere
 */


var sphere = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new sphere
   * !#zh
   * 创建一个新的 sphere 实例。
   * @method create
   * @param cx X coordinates of the shape relative to the origin.
   * @param cy Y coordinates of the shape relative to the origin.
   * @param cz Z coordinates of the shape relative to the origin.
   * @param r Radius of sphere
   * @return {Sphere} Returns a sphere.
   */
  sphere.create = function create(cx, cy, cz, r) {
    return new sphere(cx, cy, cz, r);
  }
  /**
   * !#en
   * clone a new sphere
   * !#zh
   * 克隆一个新的 sphere 实例。
   * @method clone
   * @param {Sphere} p The target of cloning.
   * @return {Sphere} The cloned instance.
   */
  ;

  sphere.clone = function clone(p) {
    return new sphere(p.center.x, p.center.y, p.center.z, p.radius);
  }
  /**
   * !#en
   * copy the values from one sphere to another
   * !#zh
   * 将从一个 sphere 的值复制到另一个 sphere。
   * @method copy
   * @param {Sphere} out Accept the sphere of operations.
   * @param {Sphere} a Sphere being copied.
   * @return {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.copy = function copy(out, p) {
    _valueTypes.Vec3.copy(out.center, p.center);

    out.radius = p.radius;
    return out;
  }
  /**
   * !#en
   * create a new bounding sphere from two corner points
   * !#zh
   * 从两个点创建一个新的 sphere。
   * @method fromPoints
   * @param out - Accept the sphere of operations.
   * @param minPos - The smallest point of sphere.
   * @param maxPos - The maximum point of sphere.
   * @returns {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.fromPoints = function fromPoints(out, minPos, maxPos) {
    _valueTypes.Vec3.multiplyScalar(out.center, _valueTypes.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    out.radius = _valueTypes.Vec3.subtract(_v3_tmp, maxPos, minPos).len() * 0.5;
    return out;
  }
  /**
   * !#en Set the components of a sphere to the given values
   * !#zh 将球体的属性设置为给定的值。
   * @method set
   * @param {Sphere} out Accept the sphere of operations.
   * @param cx X coordinates of the shape relative to the origin.
   * @param cy Y coordinates of the shape relative to the origin.
   * @param cz Z coordinates of the shape relative to the origin.
   * @param {number} r Radius.
   * @return {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.set = function set(out, cx, cy, cz, r) {
    out.center.x = cx;
    out.center.y = cy;
    out.center.z = cz;
    out.radius = r;
    return out;
  }
  /**
   * !#en
   * The center of the local coordinate.
   * !#zh
   * 本地坐标的中心点。
   * @property {Vec3} center
   */
  ;

  /**
   * !#en
   * Construct a sphere.
   * !#zh
   * 构造一个球。
   * @constructor
   * @param cx The x-coordinate of the sphere's world coordinates.
   * @param cy The y-coordinate of the sphere's world coordinates.
   * @param cz The z-coordinate of the sphere's world coordinates.
   * @param {number} r Radius.
   */
  function sphere(cx, cy, cz, r) {
    if (cx === void 0) {
      cx = 0;
    }

    if (cy === void 0) {
      cy = 0;
    }

    if (cz === void 0) {
      cz = 0;
    }

    if (r === void 0) {
      r = 1;
    }

    this.center = void 0;
    this.radius = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_SPHERE;
    this.center = new _valueTypes.Vec3(cx, cy, cz);
    this.radius = r;
  }
  /**
   * !#en
   * Clone.
   * !#zh
   * 获得克隆。
   * @method clone
   */


  var _proto = sphere.prototype;

  _proto.clone = function clone() {
    return sphere.clone(this);
  }
  /**
   * !#en
   * Copy sphere
   * !#zh
   * 拷贝对象。
   * @method copy
   * @param a Copy target.
   */
  ;

  _proto.copy = function copy(a) {
    return sphere.copy(this, a);
  }
  /**
   * !#en
   * Get the bounding points of this shape
   * !#zh
   * 获取此形状的边界点。
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */
  ;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    _valueTypes.Vec3.set(minPos, this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius);

    _valueTypes.Vec3.set(maxPos, this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius);
  }
  /**
   * !#en
   * Transform this shape
   * !#zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @method transform
   * @param m The transformation matrix.
   * @param pos The position part of the transformation.
   * @param rot The rotating part of the transformation.
   * @param scale The scaling part of the transformation.
   * @param out The target of the transformation.
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m);

    out.radius = this.radius * scale.maxAxis();
  }
  /**
   * !#zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @translateAndRotate
   * @param m The transformation matrix.
   * @param rot The rotating part of the transformation.
   * @param out The target of the transformation.
   */
  ;

  _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m);
  }
  /**
   * !#en
   * Scale out based on the sphere data.
   * !#zh
   * 将 out 根据这个 sphere 的数据进行缩放。
   * @method setScale
   * @param scale Scale value
   * @param out Scale target
   */
  ;

  _proto.setScale = function setScale(scale, out) {
    out.radius = this.radius * scale.maxAxis();
  };

  return sphere;
}();

exports["default"] = sphere;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXHNwaGVyZS50cyJdLCJuYW1lcyI6WyJfdjNfdG1wIiwiVmVjMyIsInNwaGVyZSIsImNyZWF0ZSIsImN4IiwiY3kiLCJjeiIsInIiLCJjbG9uZSIsInAiLCJjZW50ZXIiLCJ4IiwieSIsInoiLCJyYWRpdXMiLCJjb3B5Iiwib3V0IiwiZnJvbVBvaW50cyIsIm1pblBvcyIsIm1heFBvcyIsIm11bHRpcGx5U2NhbGFyIiwiYWRkIiwic3VidHJhY3QiLCJsZW4iLCJzZXQiLCJfdHlwZSIsImVudW1zIiwiU0hBUEVfU1BIRVJFIiwiYSIsImdldEJvdW5kYXJ5IiwidHJhbnNmb3JtIiwibSIsInBvcyIsInJvdCIsInNjYWxlIiwidHJhbnNmb3JtTWF0NCIsIm1heEF4aXMiLCJ0cmFuc2xhdGVBbmRSb3RhdGUiLCJzZXRTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQSxJQUFNQSxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosRUFBaEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBQ3FCQztBQUVqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDa0JDLFNBQWQsZ0JBQXNCQyxFQUF0QixFQUFrQ0MsRUFBbEMsRUFBOENDLEVBQTlDLEVBQTBEQyxDQUExRCxFQUE2RTtBQUN6RSxXQUFPLElBQUlMLE1BQUosQ0FBV0UsRUFBWCxFQUFlQyxFQUFmLEVBQW1CQyxFQUFuQixFQUF1QkMsQ0FBdkIsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV0MscUJBQVAsNEJBQTJCTixDQUEzQixFQUFvQ0UsR0FBcEMsRUFBK0NqQixHQUEvQyxFQUEyRDtBQUN2RGYscUJBQUtrQyxhQUFMLENBQW1CbkIsR0FBRyxDQUFDTixNQUF2QixFQUErQixLQUFLQSxNQUFwQyxFQUE0Q3FCLENBQTVDO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXTyxXQUFQLGtCQUFpQkosS0FBakIsRUFBOEJsQixHQUE5QixFQUEyQztBQUN2Q0EsSUFBQUEsR0FBRyxDQUFDRixNQUFKLEdBQWEsS0FBS0EsTUFBTCxHQUFjb0IsS0FBSyxDQUFDRSxPQUFOLEVBQTNCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBNYXQ0LCBRdWF0LCBWZWMzIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XHJcblxyXG5jb25zdCBfdjNfdG1wID0gbmV3IFZlYzMoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFNwaGVyZS5cclxuICogISN6aFxyXG4gKiDovbTlr7npvZDnkIPjgIJcclxuICogQGNsYXNzIGdlb21VdGlscy5TcGhlcmVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNwaGVyZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgc3BoZXJlXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJvlu7rkuIDkuKrmlrDnmoQgc3BoZXJlIOWunuS+i+OAglxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSBjeCBYIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxyXG4gICAgICogQHBhcmFtIGN5IFkgY29vcmRpbmF0ZXMgb2YgdGhlIHNoYXBlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4uXHJcbiAgICAgKiBAcGFyYW0gY3ogWiBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cclxuICAgICAqIEBwYXJhbSByIFJhZGl1cyBvZiBzcGhlcmVcclxuICAgICAqIEByZXR1cm4ge1NwaGVyZX0gUmV0dXJucyBhIHNwaGVyZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIGN6OiBudW1iZXIsIHI6IG51bWJlcik6IHNwaGVyZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBzcGhlcmUoY3gsIGN5LCBjeiwgcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjbG9uZSBhIG5ldyBzcGhlcmVcclxuICAgICAqICEjemhcclxuICAgICAqIOWFi+mahuS4gOS4quaWsOeahCBzcGhlcmUg5a6e5L6L44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAcGFyYW0ge1NwaGVyZX0gcCBUaGUgdGFyZ2V0IG9mIGNsb25pbmcuXHJcbiAgICAgKiBAcmV0dXJuIHtTcGhlcmV9IFRoZSBjbG9uZWQgaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgKHA6IHNwaGVyZSk6IHNwaGVyZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBzcGhlcmUocC5jZW50ZXIueCwgcC5jZW50ZXIueSwgcC5jZW50ZXIueiwgcC5yYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogY29weSB0aGUgdmFsdWVzIGZyb20gb25lIHNwaGVyZSB0byBhbm90aGVyXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlsIbku47kuIDkuKogc3BoZXJlIOeahOWAvOWkjeWItuWIsOWPpuS4gOS4qiBzcGhlcmXjgIJcclxuICAgICAqIEBtZXRob2QgY29weVxyXG4gICAgICogQHBhcmFtIHtTcGhlcmV9IG91dCBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxyXG4gICAgICogQHBhcmFtIHtTcGhlcmV9IGEgU3BoZXJlIGJlaW5nIGNvcGllZC5cclxuICAgICAqIEByZXR1cm4ge1NwaGVyZX0gb3V0IEFjY2VwdCB0aGUgc3BoZXJlIG9mIG9wZXJhdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0OiBzcGhlcmUsIHA6IHNwaGVyZSk6IHNwaGVyZSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5jZW50ZXIsIHAuY2VudGVyKTtcclxuICAgICAgICBvdXQucmFkaXVzID0gcC5yYWRpdXM7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgYm91bmRpbmcgc3BoZXJlIGZyb20gdHdvIGNvcm5lciBwb2ludHNcclxuICAgICAqICEjemhcclxuICAgICAqIOS7juS4pOS4queCueWIm+W7uuS4gOS4quaWsOeahCBzcGhlcmXjgIJcclxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xyXG4gICAgICogQHBhcmFtIG91dCAtIEFjY2VwdCB0aGUgc3BoZXJlIG9mIG9wZXJhdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gbWluUG9zIC0gVGhlIHNtYWxsZXN0IHBvaW50IG9mIHNwaGVyZS5cclxuICAgICAqIEBwYXJhbSBtYXhQb3MgLSBUaGUgbWF4aW11bSBwb2ludCBvZiBzcGhlcmUuXHJcbiAgICAgKiBAcmV0dXJucyB7U3BoZXJlfSBvdXQgQWNjZXB0IHRoZSBzcGhlcmUgb2Ygb3BlcmF0aW9ucy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUG9pbnRzIChvdXQ6IHNwaGVyZSwgbWluUG9zOiBWZWMzLCBtYXhQb3M6IFZlYzMpOiBzcGhlcmUge1xyXG4gICAgICAgIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0LmNlbnRlciwgVmVjMy5hZGQoX3YzX3RtcCwgbWluUG9zLCBtYXhQb3MpLCAwLjUpO1xyXG4gICAgICAgIG91dC5yYWRpdXMgPSBWZWMzLnN1YnRyYWN0KF92M190bXAsIG1heFBvcywgbWluUG9zKS5sZW4oKSAqIDAuNTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBzcGhlcmUgdG8gdGhlIGdpdmVuIHZhbHVlc1xyXG4gICAgICogISN6aCDlsIbnkIPkvZPnmoTlsZ7mgKforr7nva7kuLrnu5nlrprnmoTlgLzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAcGFyYW0ge1NwaGVyZX0gb3V0IEFjY2VwdCB0aGUgc3BoZXJlIG9mIG9wZXJhdGlvbnMuXHJcbiAgICAgKiBAcGFyYW0gY3ggWCBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cclxuICAgICAqIEBwYXJhbSBjeSBZIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxyXG4gICAgICogQHBhcmFtIGN6IFogY29vcmRpbmF0ZXMgb2YgdGhlIHNoYXBlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gciBSYWRpdXMuXHJcbiAgICAgKiBAcmV0dXJuIHtTcGhlcmV9IG91dCBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCAob3V0OiBzcGhlcmUsIGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIGN6OiBudW1iZXIsIHI6IG51bWJlcik6IHNwaGVyZSB7XHJcbiAgICAgICAgb3V0LmNlbnRlci54ID0gY3g7XHJcbiAgICAgICAgb3V0LmNlbnRlci55ID0gY3k7XHJcbiAgICAgICAgb3V0LmNlbnRlci56ID0gY3o7XHJcbiAgICAgICAgb3V0LnJhZGl1cyA9IHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgY2VudGVyIG9mIHRoZSBsb2NhbCBjb29yZGluYXRlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5pys5Zyw5Z2Q5qCH55qE5Lit5b+D54K544CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNlbnRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2VudGVyOiBWZWMzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Y2K5b6E44CCXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gcmFkaXVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByYWRpdXM6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3R5cGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENvbnN0cnVjdCBhIHNwaGVyZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaehOmAoOS4gOS4queQg+OAglxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gY3ggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgc3BoZXJlJ3Mgd29ybGQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiBAcGFyYW0gY3kgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgc3BoZXJlJ3Mgd29ybGQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiBAcGFyYW0gY3ogVGhlIHotY29vcmRpbmF0ZSBvZiB0aGUgc3BoZXJlJ3Mgd29ybGQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gciBSYWRpdXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yIChjeDogbnVtYmVyID0gMCwgY3k6IG51bWJlciA9IDAsIGN6OiBudW1iZXIgPSAwLCByOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX1NQSEVSRTtcclxuICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWMzKGN4LCBjeSwgY3opO1xyXG4gICAgICAgIHRoaXMucmFkaXVzID0gcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENsb25lLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635b6X5YWL6ZqG44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNwaGVyZS5jbG9uZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENvcHkgc3BoZXJlXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmi7fotJ3lr7nosaHjgIJcclxuICAgICAqIEBtZXRob2QgY29weVxyXG4gICAgICogQHBhcmFtIGEgQ29weSB0YXJnZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb3B5IChhOiBzcGhlcmUpIHtcclxuICAgICAgICByZXR1cm4gc3BoZXJlLmNvcHkodGhpcywgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIGJvdW5kaW5nIHBvaW50cyBvZiB0aGlzIHNoYXBlXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bmraTlvaLnirbnmoTovrnnlYzngrnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0Qm91bmRhcnlcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbWluUG9zXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1heFBvc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Qm91bmRhcnkgKG1pblBvczogVmVjMywgbWF4UG9zOiBWZWMzKSB7XHJcbiAgICAgICAgVmVjMy5zZXQobWluUG9zLCB0aGlzLmNlbnRlci54IC0gdGhpcy5yYWRpdXMsIHRoaXMuY2VudGVyLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5jZW50ZXIueiAtIHRoaXMucmFkaXVzKTtcclxuICAgICAgICBWZWMzLnNldChtYXhQb3MsIHRoaXMuY2VudGVyLnggKyB0aGlzLnJhZGl1cywgdGhpcy5jZW50ZXIueSArIHRoaXMucmFkaXVzLCB0aGlzLmNlbnRlci56ICsgdGhpcy5yYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVHJhbnNmb3JtIHRoaXMgc2hhcGVcclxuICAgICAqICEjemhcclxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIHNwaGVyZSDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0gbSBUaGUgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxyXG4gICAgICogQHBhcmFtIHBvcyBUaGUgcG9zaXRpb24gcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0gcm90IFRoZSByb3RhdGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBzY2FsZSBUaGUgc2NhbGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBvdXQgVGhlIHRhcmdldCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2Zvcm0gKG06IE1hdDQsIHBvczogVmVjMywgcm90OiBRdWF0LCBzY2FsZTogVmVjMywgb3V0OiBzcGhlcmUpIHtcclxuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LmNlbnRlciwgdGhpcy5jZW50ZXIsIG0pO1xyXG4gICAgICAgIG91dC5yYWRpdXMgPSB0aGlzLnJhZGl1cyAqIHNjYWxlLm1heEF4aXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemhcclxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIHNwaGVyZSDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcclxuICAgICAqIEB0cmFuc2xhdGVBbmRSb3RhdGVcclxuICAgICAqIEBwYXJhbSBtIFRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXHJcbiAgICAgKiBAcGFyYW0gcm90IFRoZSByb3RhdGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSBvdXQgVGhlIHRhcmdldCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2xhdGVBbmRSb3RhdGUgKG06IE1hdDQsIHJvdDogUXVhdCwgb3V0OiBzcGhlcmUpe1xyXG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQuY2VudGVyLCB0aGlzLmNlbnRlciwgbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTY2FsZSBvdXQgYmFzZWQgb24gdGhlIHNwaGVyZSBkYXRhLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5bCGIG91dCDmoLnmja7ov5nkuKogc3BoZXJlIOeahOaVsOaNrui/m+ihjOe8qeaUvuOAglxyXG4gICAgICogQG1ldGhvZCBzZXRTY2FsZVxyXG4gICAgICogQHBhcmFtIHNjYWxlIFNjYWxlIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gb3V0IFNjYWxlIHRhcmdldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U2NhbGUgKHNjYWxlOiBWZWMzLCBvdXQ6IHNwaGVyZSkge1xyXG4gICAgICAgIG91dC5yYWRpdXMgPSB0aGlzLnJhZGl1cyAqIHNjYWxlLm1heEF4aXMoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==