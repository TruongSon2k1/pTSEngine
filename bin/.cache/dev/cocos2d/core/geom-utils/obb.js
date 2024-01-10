
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/obb.js';
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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _v3_tmp = new _valueTypes.Vec3();

var _v3_tmp2 = new _valueTypes.Vec3();

var _m3_tmp = new _valueTypes.Mat3(); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/


var transform_extent_m3 = function transform_extent_m3(out, extent, m3) {
  var m3_tmpm = _m3_tmp.m,
      m3m = m3.m;
  m3_tmpm[0] = Math.abs(m3m[0]);
  m3_tmpm[1] = Math.abs(m3m[1]);
  m3_tmpm[2] = Math.abs(m3m[2]);
  m3_tmpm[3] = Math.abs(m3m[3]);
  m3_tmpm[4] = Math.abs(m3m[4]);
  m3_tmpm[5] = Math.abs(m3m[5]);
  m3_tmpm[6] = Math.abs(m3m[6]);
  m3_tmpm[7] = Math.abs(m3m[7]);
  m3_tmpm[8] = Math.abs(m3m[8]);

  _valueTypes.Vec3.transformMat3(out, extent, _m3_tmp);
};
/**
 * !#en obb
 * !#zh
 * 基础几何  方向包围盒。
 * @class geomUtils.Obb
 */


var obb = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new obb
   * !#zh
   * 创建一个新的 obb 实例。
   * @method create
   * @param {Number} cx X coordinates of the shape relative to the origin.
   * @param {Number} cy Y coordinates of the shape relative to the origin.
   * @param {Number} cz Z coordinates of the shape relative to the origin.
   * @param {Number} hw Obb is half the width.
   * @param {Number} hh Obb is half the height.
   * @param {Number} hl Obb is half the Length.
   * @param {Number} ox_1 Direction matrix parameter.
   * @param {Number} ox_2 Direction matrix parameter.
   * @param {Number} ox_3 Direction matrix parameter.
   * @param {Number} oy_1 Direction matrix parameter.
   * @param {Number} oy_2 Direction matrix parameter.
   * @param {Number} oy_3 Direction matrix parameter.
   * @param {Number} oz_1 Direction matrix parameter.
   * @param {Number} oz_2 Direction matrix parameter.
   * @param {Number} oz_3 Direction matrix parameter.
   * @return {Obb} Direction Box.
   */
  obb.create = function create(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    return new obb(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * !#en
   * clone a new obb
   * !#zh
   * 克隆一个 obb。
   * @method clone
   * @param {Obb} a The target of cloning.
   * @returns {Obb} New object cloned.
   */
  ;

  obb.clone = function clone(a) {
    var aom = a.orientation.m;
    return new obb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z, aom[0], aom[1], aom[2], aom[3], aom[4], aom[5], aom[6], aom[7], aom[8]);
  }
  /**
   * !#en
   * copy the values from one obb to another
   * !#zh
   * 将从一个 obb 的值复制到另一个 obb。
   * @method copy
   * @param {Obb} out Obb that accepts the operation.
   * @param {Obb} a Obb being copied.
   * @return {Obb} out Obb that accepts the operation.
   */
  ;

  obb.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.center, a.center);

    _valueTypes.Vec3.copy(out.halfExtents, a.halfExtents);

    _valueTypes.Mat3.copy(out.orientation, a.orientation);

    return out;
  }
  /**
   * !#en
   * create a new obb from two corner points
   * !#zh
   * 用两个点创建一个新的 obb。
   * @method fromPoints
   * @param {Obb} out Obb that accepts the operation.
   * @param {Vec3} minPos The smallest point of obb.
   * @param {Vec3} maxPos Obb's maximum point.
   * @returns {Obb} out Obb that accepts the operation.
   */
  ;

  obb.fromPoints = function fromPoints(out, minPos, maxPos) {
    _valueTypes.Vec3.multiplyScalar(out.center, _valueTypes.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    _valueTypes.Vec3.multiplyScalar(out.halfExtents, _valueTypes.Vec3.subtract(_v3_tmp2, maxPos, minPos), 0.5);

    _valueTypes.Mat3.identity(out.orientation);

    return out;
  }
  /**
   * !#en
   * Set the components of a obb to the given values
   * !#zh
   * 将给定 obb 的属性设置为给定的值。
   * @method set
   * @param {Number} cx X coordinates of the shape relative to the origin.
   * @param {Number} cy Y coordinates of the shape relative to the origin.
   * @param {Number} cz Z coordinates of the shape relative to the origin.
   * @param {Number} hw Obb is half the width.
   * @param {Number} hh Obb is half the height.
   * @param {Number} hl Obb is half the Length.
   * @param {Number} ox_1 Direction matrix parameter.
   * @param {Number} ox_2 Direction matrix parameter.
   * @param {Number} ox_3 Direction matrix parameter.
   * @param {Number} oy_1 Direction matrix parameter.
   * @param {Number} oy_2 Direction matrix parameter.
   * @param {Number} oy_3 Direction matrix parameter.
   * @param {Number} oz_1 Direction matrix parameter.
   * @param {Number} oz_2 Direction matrix parameter.
   * @param {Number} oz_3 Direction matrix parameter.
   * @return {Obb} out
   */
  ;

  obb.set = function set(out, cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    _valueTypes.Vec3.set(out.center, cx, cy, cz);

    _valueTypes.Vec3.set(out.halfExtents, hw, hh, hl);

    _valueTypes.Mat3.set(out.orientation, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);

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

  function obb(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    if (cx === void 0) {
      cx = 0;
    }

    if (cy === void 0) {
      cy = 0;
    }

    if (cz === void 0) {
      cz = 0;
    }

    if (hw === void 0) {
      hw = 1;
    }

    if (hh === void 0) {
      hh = 1;
    }

    if (hl === void 0) {
      hl = 1;
    }

    if (ox_1 === void 0) {
      ox_1 = 1;
    }

    if (ox_2 === void 0) {
      ox_2 = 0;
    }

    if (ox_3 === void 0) {
      ox_3 = 0;
    }

    if (oy_1 === void 0) {
      oy_1 = 0;
    }

    if (oy_2 === void 0) {
      oy_2 = 1;
    }

    if (oy_3 === void 0) {
      oy_3 = 0;
    }

    if (oz_1 === void 0) {
      oz_1 = 0;
    }

    if (oz_2 === void 0) {
      oz_2 = 0;
    }

    if (oz_3 === void 0) {
      oz_3 = 1;
    }

    this.center = void 0;
    this.halfExtents = void 0;
    this.orientation = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_OBB;
    this.center = new _valueTypes.Vec3(cx, cy, cz);
    this.halfExtents = new _valueTypes.Vec3(hw, hh, hl);
    this.orientation = new _valueTypes.Mat3(ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * !#en
   * Get the bounding points of this shape
   * !#zh
   * 获取 obb 的最小点和最大点。
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */


  var _proto = obb.prototype;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    transform_extent_m3(_v3_tmp, this.halfExtents, this.orientation);

    _valueTypes.Vec3.subtract(minPos, this.center, _v3_tmp);

    _valueTypes.Vec3.add(maxPos, this.center, _v3_tmp);
  }
  /**
   * !#en Transform this shape
   * !#zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @method transform
   * @param {Mat4} m The transformation matrix.
   * @param {Vec3} pos The position part of the transformation.
   * @param {Quat} rot The rotating part of the transformation.
   * @param {Vec3} scale The scaling part of the transformation.
   * @param {Obb} out Target of transformation.
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _valueTypes.Mat3.fromQuat(out.orientation, rot);

    _valueTypes.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  }
  /**
   * !#en
   * Transform out based on this obb data.
   * !#zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @method translateAndRotate
   * @param {Mat4} m The transformation matrix.
   * @param {Quat} rot The rotating part of the transformation.
   * @param {Obb} out Target of transformation.
   */
  ;

  _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _valueTypes.Mat3.fromQuat(out.orientation, rot);
  }
  /**
   * !#en
   * Scale out based on this obb data.
   * !#zh
   * 将 out 根据这个 obb 的数据进行缩放。
   * @method setScale
   * @param {Vec3} scale Scale value.
   * @param {Obb} out Scaled target.
   */
  ;

  _proto.setScale = function setScale(scale, out) {
    _valueTypes.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  };

  _createClass(obb, [{
    key: "type",
    get:
    /**
     * !#zh
     * 获取形状的类型。
     * @property {number} type
     * @readonly
     */
    function get() {
      return this._type;
    }
  }]);

  return obb;
}();

exports["default"] = obb;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXG9iYi50cyJdLCJuYW1lcyI6WyJfdjNfdG1wIiwiVmVjMyIsIl92M190bXAyIiwiX20zX3RtcCIsIk1hdDMiLCJ0cmFuc2Zvcm1fZXh0ZW50X20zIiwib3V0IiwiZXh0ZW50IiwibTMiLCJtM190bXBtIiwibSIsIm0zbSIsIk1hdGgiLCJhYnMiLCJ0cmFuc2Zvcm1NYXQzIiwib2JiIiwiY3JlYXRlIiwiY3giLCJjeSIsImN6IiwiaHciLCJoaCIsImhsIiwib3hfMSIsIm94XzIiLCJveF8zIiwib3lfMSIsIm95XzIiLCJveV8zIiwib3pfMSIsIm96XzIiLCJvel8zIiwiY2xvbmUiLCJhIiwiYW9tIiwib3JpZW50YXRpb24iLCJjZW50ZXIiLCJ4IiwieSIsInoiLCJoYWxmRXh0ZW50cyIsImNvcHkiLCJmcm9tUG9pbnRzIiwibWluUG9zIiwibWF4UG9zIiwibXVsdGlwbHlTY2FsYXIiLCJhZGQiLCJzdWJ0cmFjdCIsImlkZW50aXR5Iiwic2V0IiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX09CQiIsImdldEJvdW5kYXJ5IiwidHJhbnNmb3JtIiwicG9zIiwicm90Iiwic2NhbGUiLCJ0cmFuc2Zvcm1NYXQ0IiwiZnJvbVF1YXQiLCJtdWx0aXBseSIsInRyYW5zbGF0ZUFuZFJvdGF0ZSIsInNldFNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLE9BQU8sR0FBRyxJQUFJQyxnQkFBSixFQUFoQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUcsSUFBSUQsZ0JBQUosRUFBakI7O0FBQ0EsSUFBTUUsT0FBTyxHQUFHLElBQUlDLGdCQUFKLEVBQWhCLEVBRUE7OztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBQ0MsR0FBRCxFQUFZQyxNQUFaLEVBQTBCQyxFQUExQixFQUF1QztBQUMvRCxNQUFJQyxPQUFPLEdBQUdO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RUFBaURDLEtBQWpELEVBQThEbkQsR0FBOUQsRUFBd0U7QUFDcEVMLHFCQUFLeUQsYUFBTCxDQUFtQnBELEdBQUcsQ0FBQzhCLE1BQXZCLEVBQStCLEtBQUtBLE1BQXBDLEVBQTRDMUIsQ0FBNUMsRUFEb0UsQ0FFcEU7OztBQUNBTixxQkFBS3VELFFBQUwsQ0FBY3JELEdBQUcsQ0FBQzZCLFdBQWxCLEVBQStCcUIsR0FBL0I7O0FBQ0F2RCxxQkFBSzJELFFBQUwsQ0FBY3RELEdBQUcsQ0FBQ2tDLFdBQWxCLEVBQStCLEtBQUtBLFdBQXBDLEVBQWlEaUIsS0FBakQ7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV0kscUJBQVAsNEJBQTJCbkQsQ0FBM0IsRUFBb0M4QyxHQUFwQyxFQUErQ2xELEdBQS9DLEVBQXdEO0FBQ3BETCxxQkFBS3lELGFBQUwsQ0FBbUJwRCxHQUFHLENBQUM4QixNQUF2QixFQUErQixLQUFLQSxNQUFwQyxFQUE0QzFCLENBQTVDLEVBRG9ELENBRXBEOzs7QUFDQU4scUJBQUt1RCxRQUFMLENBQWNyRCxHQUFHLENBQUM2QixXQUFsQixFQUErQnFCLEdBQS9CO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXTSxXQUFQLGtCQUFpQkwsS0FBakIsRUFBOEJuRCxHQUE5QixFQUF3QztBQUNwQ0wscUJBQUsyRCxRQUFMLENBQWN0RCxHQUFHLENBQUNrQyxXQUFsQixFQUErQixLQUFLQSxXQUFwQyxFQUFpRGlCLEtBQWpEO0FBQ0g7Ozs7O0FBeE9EO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUFZO0FBQ1IsYUFBTyxLQUFLUCxLQUFaO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBNYXQzLCBNYXQ0LCBRdWF0LCBWZWMzIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XHJcblxyXG5jb25zdCBfdjNfdG1wID0gbmV3IFZlYzMoKTtcclxuY29uc3QgX3YzX3RtcDIgPSBuZXcgVmVjMygpO1xyXG5jb25zdCBfbTNfdG1wID0gbmV3IE1hdDMoKTtcclxuXHJcbi8vIGh0dHBzOi8vemV1eGNnLm9yZy8yMDEwLzEwLzE3L2FhYmItZnJvbS1vYmItd2l0aC1jb21wb25lbnQtd2lzZS1hYnMvXHJcbmNvbnN0IHRyYW5zZm9ybV9leHRlbnRfbTMgPSAob3V0OiBWZWMzLCBleHRlbnQ6IFZlYzMsIG0zOiBNYXQzKSA9PiB7XHJcbiAgICBsZXQgbTNfdG1wbSA9IF9tM190bXAubSwgbTNtID0gbTMubTtcclxuICAgIG0zX3RtcG1bMF0gPSBNYXRoLmFicyhtM21bMF0pOyBtM190bXBtWzFdID0gTWF0aC5hYnMobTNtWzFdKTsgbTNfdG1wbVsyXSA9IE1hdGguYWJzKG0zbVsyXSk7XHJcbiAgICBtM190bXBtWzNdID0gTWF0aC5hYnMobTNtWzNdKTsgbTNfdG1wbVs0XSA9IE1hdGguYWJzKG0zbVs0XSk7IG0zX3RtcG1bNV0gPSBNYXRoLmFicyhtM21bNV0pO1xyXG4gICAgbTNfdG1wbVs2XSA9IE1hdGguYWJzKG0zbVs2XSk7IG0zX3RtcG1bN10gPSBNYXRoLmFicyhtM21bN10pOyBtM190bXBtWzhdID0gTWF0aC5hYnMobTNtWzhdKTtcclxuICAgIFZlYzMudHJhbnNmb3JtTWF0MyhvdXQsIGV4dGVudCwgX20zX3RtcCk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBvYmJcclxuICogISN6aFxyXG4gKiDln7rnoYDlh6DkvZUgIOaWueWQkeWMheWbtOebkuOAglxyXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLk9iYlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgb2JiIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluW9oueKtueahOexu+Wei+OAglxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHR5cGVcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBnZXQgdHlwZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgb2JiXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJvlu7rkuIDkuKrmlrDnmoQgb2JiIOWunuS+i+OAglxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeCBYIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN5IFkgY29vcmRpbmF0ZXMgb2YgdGhlIHNoYXBlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3ogWiBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBodyBPYmIgaXMgaGFsZiB0aGUgd2lkdGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGggT2JiIGlzIGhhbGYgdGhlIGhlaWdodC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBobCBPYmIgaXMgaGFsZiB0aGUgTGVuZ3RoLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG94XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3hfMiBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveF8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG95XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3lfMiBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveV8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG96XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3pfMiBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvel8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHJldHVybiB7T2JifSBEaXJlY3Rpb24gQm94LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAoXHJcbiAgICAgICAgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcixcclxuICAgICAgICBodzogbnVtYmVyLCBoaDogbnVtYmVyLCBobDogbnVtYmVyLFxyXG4gICAgICAgIG94XzE6IG51bWJlciwgb3hfMjogbnVtYmVyLCBveF8zOiBudW1iZXIsXHJcbiAgICAgICAgb3lfMTogbnVtYmVyLCBveV8yOiBudW1iZXIsIG95XzM6IG51bWJlcixcclxuICAgICAgICBvel8xOiBudW1iZXIsIG96XzI6IG51bWJlciwgb3pfMzogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBvYmIoY3gsIGN5LCBjeiwgaHcsIGhoLCBobCwgb3hfMSwgb3hfMiwgb3hfMywgb3lfMSwgb3lfMiwgb3lfMywgb3pfMSwgb3pfMiwgb3pfMyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjbG9uZSBhIG5ldyBvYmJcclxuICAgICAqICEjemhcclxuICAgICAqIOWFi+mahuS4gOS4qiBvYmLjgIJcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEBwYXJhbSB7T2JifSBhIFRoZSB0YXJnZXQgb2YgY2xvbmluZy5cclxuICAgICAqIEByZXR1cm5zIHtPYmJ9IE5ldyBvYmplY3QgY2xvbmVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIChhOiBvYmIpIHtcclxuICAgICAgICBsZXQgYW9tID0gYS5vcmllbnRhdGlvbi5tO1xyXG4gICAgICAgIHJldHVybiBuZXcgb2JiKGEuY2VudGVyLngsIGEuY2VudGVyLnksIGEuY2VudGVyLnosXHJcbiAgICAgICAgICAgIGEuaGFsZkV4dGVudHMueCwgYS5oYWxmRXh0ZW50cy55LCBhLmhhbGZFeHRlbnRzLnosXHJcbiAgICAgICAgICAgIGFvbVswXSwgYW9tWzFdLCBhb21bMl0sXHJcbiAgICAgICAgICAgIGFvbVszXSwgYW9tWzRdLCBhb21bNV0sXHJcbiAgICAgICAgICAgIGFvbVs2XSwgYW9tWzddLCBhb21bOF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogY29weSB0aGUgdmFsdWVzIGZyb20gb25lIG9iYiB0byBhbm90aGVyXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlsIbku47kuIDkuKogb2JiIOeahOWAvOWkjeWItuWIsOWPpuS4gOS4qiBvYmLjgIJcclxuICAgICAqIEBtZXRob2QgY29weVxyXG4gICAgICogQHBhcmFtIHtPYmJ9IG91dCBPYmIgdGhhdCBhY2NlcHRzIHRoZSBvcGVyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge09iYn0gYSBPYmIgYmVpbmcgY29waWVkLlxyXG4gICAgICogQHJldHVybiB7T2JifSBvdXQgT2JiIHRoYXQgYWNjZXB0cyB0aGUgb3BlcmF0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgKG91dDogb2JiLCBhOiBvYmIpOiBvYmIge1xyXG4gICAgICAgIFZlYzMuY29weShvdXQuY2VudGVyLCBhLmNlbnRlcik7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5oYWxmRXh0ZW50cywgYS5oYWxmRXh0ZW50cyk7XHJcbiAgICAgICAgTWF0My5jb3B5KG91dC5vcmllbnRhdGlvbiwgYS5vcmllbnRhdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgb2JiIGZyb20gdHdvIGNvcm5lciBwb2ludHNcclxuICAgICAqICEjemhcclxuICAgICAqIOeUqOS4pOS4queCueWIm+W7uuS4gOS4quaWsOeahCBvYmLjgIJcclxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xyXG4gICAgICogQHBhcmFtIHtPYmJ9IG91dCBPYmIgdGhhdCBhY2NlcHRzIHRoZSBvcGVyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pblBvcyBUaGUgc21hbGxlc3QgcG9pbnQgb2Ygb2JiLlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBtYXhQb3MgT2JiJ3MgbWF4aW11bSBwb2ludC5cclxuICAgICAqIEByZXR1cm5zIHtPYmJ9IG91dCBPYmIgdGhhdCBhY2NlcHRzIHRoZSBvcGVyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVBvaW50cyAob3V0OiBvYmIsIG1pblBvczogVmVjMywgbWF4UG9zOiBWZWMzKTogb2JiIHtcclxuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKG91dC5jZW50ZXIsIFZlYzMuYWRkKF92M190bXAsIG1pblBvcywgbWF4UG9zKSwgMC41KTtcclxuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKG91dC5oYWxmRXh0ZW50cywgVmVjMy5zdWJ0cmFjdChfdjNfdG1wMiwgbWF4UG9zLCBtaW5Qb3MpLCAwLjUpO1xyXG4gICAgICAgIE1hdDMuaWRlbnRpdHkob3V0Lm9yaWVudGF0aW9uKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgb2JiIHRvIHRoZSBnaXZlbiB2YWx1ZXNcclxuICAgICAqICEjemhcclxuICAgICAqIOWwhue7meWumiBvYmIg55qE5bGe5oCn6K6+572u5Li657uZ5a6a55qE5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGN4IFggY29vcmRpbmF0ZXMgb2YgdGhlIHNoYXBlIHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3kgWSBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeiBaIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGh3IE9iYiBpcyBoYWxmIHRoZSB3aWR0aC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoaCBPYmIgaXMgaGFsZiB0aGUgaGVpZ2h0LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhsIE9iYiBpcyBoYWxmIHRoZSBMZW5ndGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3hfMSBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveF8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG94XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3lfMSBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveV8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG95XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3pfMSBEaXJlY3Rpb24gbWF0cml4IHBhcmFtZXRlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvel8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG96XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXHJcbiAgICAgKiBAcmV0dXJuIHtPYmJ9IG91dFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCAoXHJcbiAgICAgICAgb3V0OiBvYmIsXHJcbiAgICAgICAgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcixcclxuICAgICAgICBodzogbnVtYmVyLCBoaDogbnVtYmVyLCBobDogbnVtYmVyLFxyXG4gICAgICAgIG94XzE6IG51bWJlciwgb3hfMjogbnVtYmVyLCBveF8zOiBudW1iZXIsXHJcbiAgICAgICAgb3lfMTogbnVtYmVyLCBveV8yOiBudW1iZXIsIG95XzM6IG51bWJlcixcclxuICAgICAgICBvel8xOiBudW1iZXIsIG96XzI6IG51bWJlciwgb3pfMzogbnVtYmVyKTogb2JiIHtcclxuICAgICAgICBWZWMzLnNldChvdXQuY2VudGVyLCBjeCwgY3ksIGN6KTtcclxuICAgICAgICBWZWMzLnNldChvdXQuaGFsZkV4dGVudHMsIGh3LCBoaCwgaGwpO1xyXG4gICAgICAgIE1hdDMuc2V0KG91dC5vcmllbnRhdGlvbiwgb3hfMSwgb3hfMiwgb3hfMywgb3lfMSwgb3lfMiwgb3lfMywgb3pfMSwgb3pfMiwgb3pfMyk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBjZW50ZXIgb2YgdGhlIGxvY2FsIGNvb3JkaW5hdGUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmnKzlnLDlnZDmoIfnmoTkuK3lv4PngrnjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gY2VudGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjZW50ZXI6IFZlYzM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBIYWxmIHRoZSBsZW5ndGgsIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6ZW/5a696auY55qE5LiA5Y2K44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGhhbGZFeHRlbnRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYWxmRXh0ZW50czogVmVjMztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIERpcmVjdGlvbiBtYXRyaXguXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmlrnlkJHnn6npmLXjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TWF0M30gb3JpZW50YXRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIG9yaWVudGF0aW9uOiBNYXQzO1xyXG5cclxuICAgIHByb3RlY3RlZCBfdHlwZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChjeCA9IDAsIGN5ID0gMCwgY3ogPSAwLFxyXG4gICAgICAgICAgICAgICAgIGh3ID0gMSwgaGggPSAxLCBobCA9IDEsXHJcbiAgICAgICAgICAgICAgICAgb3hfMSA9IDEsIG94XzIgPSAwLCBveF8zID0gMCxcclxuICAgICAgICAgICAgICAgICBveV8xID0gMCwgb3lfMiA9IDEsIG95XzMgPSAwLFxyXG4gICAgICAgICAgICAgICAgIG96XzEgPSAwLCBvel8yID0gMCwgb3pfMyA9IDEpIHtcclxuICAgICAgICB0aGlzLl90eXBlID0gZW51bXMuU0hBUEVfT0JCO1xyXG4gICAgICAgIHRoaXMuY2VudGVyID0gbmV3IFZlYzMoY3gsIGN5LCBjeik7XHJcbiAgICAgICAgdGhpcy5oYWxmRXh0ZW50cyA9IG5ldyBWZWMzKGh3LCBoaCwgaGwpO1xyXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBuZXcgTWF0MyhveF8xLCBveF8yLCBveF8zLCBveV8xLCBveV8yLCBveV8zLCBvel8xLCBvel8yLCBvel8zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgYm91bmRpbmcgcG9pbnRzIG9mIHRoaXMgc2hhcGVcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPliBvYmIg55qE5pyA5bCP54K55ZKM5pyA5aSn54K544CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEJvdW5kYXJ5XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pblBvc1xyXG4gICAgICogQHBhcmFtIHtWZWMzfSBtYXhQb3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJvdW5kYXJ5IChtaW5Qb3M6IFZlYzMsIG1heFBvczogVmVjMykge1xyXG4gICAgICAgIHRyYW5zZm9ybV9leHRlbnRfbTMoX3YzX3RtcCwgdGhpcy5oYWxmRXh0ZW50cywgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChtaW5Qb3MsIHRoaXMuY2VudGVyLCBfdjNfdG1wKTtcclxuICAgICAgICBWZWMzLmFkZChtYXhQb3MsIHRoaXMuY2VudGVyLCBfdjNfdG1wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVHJhbnNmb3JtIHRoaXMgc2hhcGVcclxuICAgICAqICEjemhcclxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIG9iYiDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG0gVGhlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC5cclxuICAgICAqIEBwYXJhbSB7VmVjM30gcG9zIFRoZSBwb3NpdGlvbiBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSB7UXVhdH0gcm90IFRoZSByb3RhdGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqIEBwYXJhbSB7VmVjM30gc2NhbGUgVGhlIHNjYWxpbmcgcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IFRhcmdldCBvZiB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zZm9ybSAobTogTWF0NCwgcG9zOiBWZWMzLCByb3Q6IFF1YXQsIHNjYWxlOiBWZWMzLCBvdXQ6IG9iYikge1xyXG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQuY2VudGVyLCB0aGlzLmNlbnRlciwgbSk7XHJcbiAgICAgICAgLy8gcGFyZW50IHNoYXBlIGRvZXNuJ3QgY29udGFpbiByb3RhdGlvbnMgZm9yIG5vd1xyXG4gICAgICAgIE1hdDMuZnJvbVF1YXQob3V0Lm9yaWVudGF0aW9uLCByb3QpO1xyXG4gICAgICAgIFZlYzMubXVsdGlwbHkob3V0LmhhbGZFeHRlbnRzLCB0aGlzLmhhbGZFeHRlbnRzLCBzY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUcmFuc2Zvcm0gb3V0IGJhc2VkIG9uIHRoaXMgb2JiIGRhdGEuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlsIYgb3V0IOagueaNrui/meS4qiBvYmIg55qE5pWw5o2u6L+b6KGM5Y+Y5o2i44CCXHJcbiAgICAgKiBAbWV0aG9kIHRyYW5zbGF0ZUFuZFJvdGF0ZVxyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBtIFRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXHJcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHJvdCBUaGUgcm90YXRpbmcgcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IFRhcmdldCBvZiB0cmFuc2Zvcm1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zbGF0ZUFuZFJvdGF0ZSAobTogTWF0NCwgcm90OiBRdWF0LCBvdXQ6IG9iYil7XHJcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dC5jZW50ZXIsIHRoaXMuY2VudGVyLCBtKTtcclxuICAgICAgICAvLyBwYXJlbnQgc2hhcGUgZG9lc24ndCBjb250YWluIHJvdGF0aW9ucyBmb3Igbm93XHJcbiAgICAgICAgTWF0My5mcm9tUXVhdChvdXQub3JpZW50YXRpb24sIHJvdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTY2FsZSBvdXQgYmFzZWQgb24gdGhpcyBvYmIgZGF0YS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIG9iYiDnmoTmlbDmja7ov5vooYznvKnmlL7jgIJcclxuICAgICAqIEBtZXRob2Qgc2V0U2NhbGVcclxuICAgICAqIEBwYXJhbSB7VmVjM30gc2NhbGUgU2NhbGUgdmFsdWUuXHJcbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IFNjYWxlZCB0YXJnZXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTY2FsZSAoc2NhbGU6IFZlYzMsIG91dDogb2JiKSB7XHJcbiAgICAgICAgVmVjMy5tdWx0aXBseShvdXQuaGFsZkV4dGVudHMsIHRoaXMuaGFsZkV4dGVudHMsIHNjYWxlKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==