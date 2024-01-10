
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/aabb.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vec = _interopRequireDefault(require("../value-types/vec3"));

var _mat = _interopRequireDefault(require("../value-types/mat3"));

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
var _v3_tmp = new _vec["default"]();

var _v3_tmp2 = new _vec["default"]();

var _m3_tmp = new _mat["default"](); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/


var transform_extent_m4 = function transform_extent_m4(out, extent, m4) {
  var _m3_tmpm = _m3_tmp.m,
      m4m = m4.m;
  _m3_tmpm[0] = Math.abs(m4m[0]);
  _m3_tmpm[1] = Math.abs(m4m[1]);
  _m3_tmpm[2] = Math.abs(m4m[2]);
  _m3_tmpm[3] = Math.abs(m4m[4]);
  _m3_tmpm[4] = Math.abs(m4m[5]);
  _m3_tmpm[5] = Math.abs(m4m[6]);
  _m3_tmpm[6] = Math.abs(m4m[8]);
  _m3_tmpm[7] = Math.abs(m4m[9]);
  _m3_tmpm[8] = Math.abs(m4m[10]);

  _vec["default"].transformMat3(out, extent, _m3_tmp);
};
/**
 * Aabb
 * @class geomUtils.Aabb
 */


var aabb = /*#__PURE__*/function () {
  /**
   * create a new aabb
   * @method create
   * @param {number} px X coordinates for aabb's original point
   * @param {number} py Y coordinates for aabb's original point
   * @param {number} pz Z coordinates for aabb's original point
   * @param {number} w the half of aabb width
   * @param {number} h the half of aabb height
   * @param {number} l the half of aabb length
   * @return {geomUtils.Aabb}
   */
  aabb.create = function create(px, py, pz, w, h, l) {
    return new aabb(px, py, pz, w, h, l);
  }
  /**
   * clone a new aabb
   * @method clone
   * @param {geomUtils.Aabb} a the source aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.clone = function clone(a) {
    return new aabb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z);
  }
  /**
   * copy the values from one aabb to another
   * @method copy
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {geomUtils.Aabb} a the source aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.copy = function copy(out, a) {
    _vec["default"].copy(out.center, a.center);

    _vec["default"].copy(out.halfExtents, a.halfExtents);

    return out;
  }
  /**
   * create a new aabb from two corner points
   * @method fromPoints
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {Vec3} minPos lower corner position of the aabb
   * @param {Vec3} maxPos upper corner position of the aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.fromPoints = function fromPoints(out, minPos, maxPos) {
    _vec["default"].scale(out.center, _vec["default"].add(_v3_tmp, minPos, maxPos), 0.5);

    _vec["default"].scale(out.halfExtents, _vec["default"].sub(_v3_tmp2, maxPos, minPos), 0.5);

    return out;
  }
  /**
   * Set the components of a aabb to the given values
   * @method set
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {number} px X coordinates for aabb's original point
   * @param {number} py Y coordinates for aabb's original point
   * @param {number} pz Z coordinates for aabb's original point
   * @param {number} w the half of aabb width
   * @param {number} h the half of aabb height
   * @param {number} l the half of aabb length
   * @return {geomUtils.Aabb} out
   */
  ;

  aabb.set = function set(out, px, py, pz, w, h, l) {
    _vec["default"].set(out.center, px, py, pz);

    _vec["default"].set(out.halfExtents, w, h, l);

    return out;
  }
  /**
   * @property {Vec3} center
   */
  ;

  function aabb(px, py, pz, w, h, l) {
    this.center = void 0;
    this.halfExtents = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_AABB;
    this.center = new _vec["default"](px, py, pz);
    this.halfExtents = new _vec["default"](w, h, l);
  }
  /**
   * Get the bounding points of this shape
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */


  var _proto = aabb.prototype;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    _vec["default"].sub(minPos, this.center, this.halfExtents);

    _vec["default"].add(maxPos, this.center, this.halfExtents);
  }
  /**
   * Transform this shape
   * @method transform
   * @param {Mat4} m the transform matrix
   * @param {Vec3} pos the position part of the transform
   * @param {Quat} rot the rotation part of the transform
   * @param {Vec3} scale the scale part of the transform
   * @param {geomUtils.Aabb} [out] the target shape
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    if (!out) out = this;

    _vec["default"].transformMat4(out.center, this.center, m);

    transform_extent_m4(out.halfExtents, this.halfExtents, m);
  };

  return aabb;
}();

exports["default"] = aabb;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXGFhYmIudHMiXSwibmFtZXMiOlsiX3YzX3RtcCIsIlZlYzMiLCJfdjNfdG1wMiIsIl9tM190bXAiLCJNYXQzIiwidHJhbnNmb3JtX2V4dGVudF9tNCIsIm91dCIsImV4dGVudCIsIm00IiwiX20zX3RtcG0iLCJtIiwibTRtIiwiTWF0aCIsImFicyIsInRyYW5zZm9ybU1hdDMiLCJhYWJiIiwiY3JlYXRlIiwicHgiLCJweSIsInB6IiwidyIsImgiLCJsIiwiY2xvbmUiLCJhIiwiY2VudGVyIiwieCIsInkiLCJ6IiwiaGFsZkV4dGVudHMiLCJjb3B5IiwiZnJvbVBvaW50cyIsIm1pblBvcyIsIm1heFBvcyIsInNjYWxlIiwiYWRkIiwic3ViIiwic2V0IiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX0FBQkIiLCJnZXRCb3VuZGFyeSIsInRyYW5zZm9ybSIsInBvcyIsInJvdCIsInRyYW5zZm9ybU1hdDQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7Ozs7QUEzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUEsSUFBSUEsT0FBTyxHQUFHLElBQUlDLGVBQUosRUFBZDs7QUFDQSxJQUFJQyxRQUFRLEdBQUcsSUFBSUQsZUFBSixFQUFmOztBQUNBLElBQUlFLE9BQU8sR0FBRyxJQUFJQyxlQUFKLEVBQWQsRUFFQTs7O0FBQ0EsSUFBSUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFVQyxHQUFWLEVBQWVDLE1BQWYsRUFBdUJDLEVBQXZCLEVBQTJCO0FBQ2pELE1BQUlDLFFBQVEsR0FBR04sT0FBTyxDQUFDTyxDQUF2QjtBQUFBLE1BQTBCQyxHQUFHLEdBQUdILEVBQUUsQ0FBQ0Us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TCxHQUFtQixJQUFJNUIsZUFBSixDQUFTbUIsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBbkI7QUFDSDtBQUdEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDSW1CLGNBQUEscUJBQWFULE1BQWIsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQ3pCaEMsb0JBQUttQyxHQUFMLENBQVNKLE1BQVQsRUFBaUIsS0FBS1AsTUFBdEIsRUFBOEIsS0FBS0ksV0FBbkM7O0FBQ0E1QixvQkFBS2tDLEdBQUwsQ0FBU0YsTUFBVCxFQUFpQixLQUFLUixNQUF0QixFQUE4QixLQUFLSSxXQUFuQztBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSWEsWUFBQSxtQkFBV2hDLENBQVgsRUFBY2lDLEdBQWQsRUFBbUJDLEdBQW5CLEVBQXdCVixLQUF4QixFQUErQjVCLEdBQS9CLEVBQW9DO0FBQ2hDLFFBQUksQ0FBQ0EsR0FBTCxFQUFVQSxHQUFHLEdBQUcsSUFBTjs7QUFDVkwsb0JBQUs0QyxhQUFMLENBQW1CdkMsR0FBRyxDQUFDbUIsTUFBdkIsRUFBK0IsS0FBS0EsTUFBcEMsRUFBNENmLENBQTVDOztBQUNBTCxJQUFBQSxtQkFBbUIsQ0FBQ0MsR0FBRyxDQUFDdUIsV0FBTCxFQUFrQixLQUFLQSxXQUF2QixFQUFvQ25CLENBQXBDLENBQW5CO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmVjMyBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMzJztcclxuaW1wb3J0IE1hdDMgZnJvbSAnLi4vdmFsdWUtdHlwZXMvbWF0Myc7XHJcbmltcG9ydCBlbnVtcyBmcm9tICcuL2VudW1zJztcclxuXHJcbmxldCBfdjNfdG1wID0gbmV3IFZlYzMoKTtcclxubGV0IF92M190bXAyID0gbmV3IFZlYzMoKTtcclxubGV0IF9tM190bXAgPSBuZXcgTWF0MygpO1xyXG5cclxuLy8gaHR0cHM6Ly96ZXV4Y2cub3JnLzIwMTAvMTAvMTcvYWFiYi1mcm9tLW9iYi13aXRoLWNvbXBvbmVudC13aXNlLWFicy9cclxubGV0IHRyYW5zZm9ybV9leHRlbnRfbTQgPSBmdW5jdGlvbiAob3V0LCBleHRlbnQsIG00KSB7XHJcbiAgICBsZXQgX20zX3RtcG0gPSBfbTNfdG1wLm0sIG00bSA9IG00Lm07XHJcbiAgICBfbTNfdG1wbVswXSA9IE1hdGguYWJzKG00bVswXSk7IF9tM190bXBtWzFdID0gTWF0aC5hYnMobTRtWzFdKTsgX20zX3RtcG1bMl0gPSBNYXRoLmFicyhtNG1bMl0pO1xyXG4gICAgX20zX3RtcG1bM10gPSBNYXRoLmFicyhtNG1bNF0pOyBfbTNfdG1wbVs0XSA9IE1hdGguYWJzKG00bVs1XSk7IF9tM190bXBtWzVdID0gTWF0aC5hYnMobTRtWzZdKTtcclxuICAgIF9tM190bXBtWzZdID0gTWF0aC5hYnMobTRtWzhdKTsgX20zX3RtcG1bN10gPSBNYXRoLmFicyhtNG1bOV0pOyBfbTNfdG1wbVs4XSA9IE1hdGguYWJzKG00bVsxMF0pO1xyXG4gICAgVmVjMy50cmFuc2Zvcm1NYXQzKG91dCwgZXh0ZW50LCBfbTNfdG1wKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBYWJiXHJcbiAqIEBjbGFzcyBnZW9tVXRpbHMuQWFiYlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWFiYiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgYWFiYlxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBweCBYIGNvb3JkaW5hdGVzIGZvciBhYWJiJ3Mgb3JpZ2luYWwgcG9pbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBweSBZIGNvb3JkaW5hdGVzIGZvciBhYWJiJ3Mgb3JpZ2luYWwgcG9pbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBweiBaIGNvb3JkaW5hdGVzIGZvciBhYWJiJ3Mgb3JpZ2luYWwgcG9pbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3IHRoZSBoYWxmIG9mIGFhYmIgd2lkdGhcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIHRoZSBoYWxmIG9mIGFhYmIgaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbCB0aGUgaGFsZiBvZiBhYWJiIGxlbmd0aFxyXG4gICAgICogQHJldHVybiB7Z2VvbVV0aWxzLkFhYmJ9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlIChweCwgcHksIHB6LCB3LCBoLCBsKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBhYWJiKHB4LCBweSwgcHosIHcsIGgsIGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2xvbmUgYSBuZXcgYWFiYlxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYSB0aGUgc291cmNlIGFhYmJcclxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5BYWJifVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIChhKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBhYWJiKGEuY2VudGVyLngsIGEuY2VudGVyLnksIGEuY2VudGVyLnosXHJcbiAgICAgICAgICAgIGEuaGFsZkV4dGVudHMueCwgYS5oYWxmRXh0ZW50cy55LCBhLmhhbGZFeHRlbnRzLnopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29weSB0aGUgdmFsdWVzIGZyb20gb25lIGFhYmIgdG8gYW5vdGhlclxyXG4gICAgICogQG1ldGhvZCBjb3B5XHJcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBvdXQgdGhlIHJlY2VpdmluZyBhYWJiXHJcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhIHRoZSBzb3VyY2UgYWFiYlxyXG4gICAgICogQHJldHVybiB7Z2VvbVV0aWxzLkFhYmJ9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0LCBhKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5jZW50ZXIsIGEuY2VudGVyKTtcclxuICAgICAgICBWZWMzLmNvcHkob3V0LmhhbGZFeHRlbnRzLCBhLmhhbGZFeHRlbnRzKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG5ldyBhYWJiIGZyb20gdHdvIGNvcm5lciBwb2ludHNcclxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xyXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gb3V0IHRoZSByZWNlaXZpbmcgYWFiYlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBtaW5Qb3MgbG93ZXIgY29ybmVyIHBvc2l0aW9uIG9mIHRoZSBhYWJiXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1heFBvcyB1cHBlciBjb3JuZXIgcG9zaXRpb24gb2YgdGhlIGFhYmJcclxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5BYWJifVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dCwgbWluUG9zLCBtYXhQb3MpIHtcclxuICAgICAgICBWZWMzLnNjYWxlKG91dC5jZW50ZXIsIFZlYzMuYWRkKF92M190bXAsIG1pblBvcywgbWF4UG9zKSwgMC41KTtcclxuICAgICAgICBWZWMzLnNjYWxlKG91dC5oYWxmRXh0ZW50cywgVmVjMy5zdWIoX3YzX3RtcDIsIG1heFBvcywgbWluUG9zKSwgMC41KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgYWFiYiB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gb3V0IHRoZSByZWNlaXZpbmcgYWFiYlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHB4IFggY29vcmRpbmF0ZXMgZm9yIGFhYmIncyBvcmlnaW5hbCBwb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHB5IFkgY29vcmRpbmF0ZXMgZm9yIGFhYmIncyBvcmlnaW5hbCBwb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHB6IFogY29vcmRpbmF0ZXMgZm9yIGFhYmIncyBvcmlnaW5hbCBwb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgdGhlIGhhbGYgb2YgYWFiYiB3aWR0aFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGggdGhlIGhhbGYgb2YgYWFiYiBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBsIHRoZSBoYWxmIG9mIGFhYmIgbGVuZ3RoXHJcbiAgICAgKiBAcmV0dXJuIHtnZW9tVXRpbHMuQWFiYn0gb3V0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IChvdXQsIHB4LCBweSwgcHosIHcsIGgsIGwpIHtcclxuICAgICAgICBWZWMzLnNldChvdXQuY2VudGVyLCBweCwgcHksIHB6KTtcclxuICAgICAgICBWZWMzLnNldChvdXQuaGFsZkV4dGVudHMsIHcsIGgsIGwpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNlbnRlclxyXG4gICAgICovXHJcbiAgICBjZW50ZXI6IFZlYzM7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gaGFsZkV4dGVudHNcclxuICAgICAqL1xyXG4gICAgaGFsZkV4dGVudHM6IFZlYzM7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfdHlwZVxyXG4gICAgICovXHJcbiAgICBfdHlwZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChweDogbnVtYmVyLCBweTogbnVtYmVyLCBwejogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX0FBQkI7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSBuZXcgVmVjMyhweCwgcHksIHB6KTtcclxuICAgICAgICB0aGlzLmhhbGZFeHRlbnRzID0gbmV3IFZlYzModywgaCwgbCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBib3VuZGluZyBwb2ludHMgb2YgdGhpcyBzaGFwZVxyXG4gICAgICogQG1ldGhvZCBnZXRCb3VuZGFyeVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBtaW5Qb3NcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4UG9zXHJcbiAgICAgKi9cclxuICAgIGdldEJvdW5kYXJ5IChtaW5Qb3MsIG1heFBvcykge1xyXG4gICAgICAgIFZlYzMuc3ViKG1pblBvcywgdGhpcy5jZW50ZXIsIHRoaXMuaGFsZkV4dGVudHMpO1xyXG4gICAgICAgIFZlYzMuYWRkKG1heFBvcywgdGhpcy5jZW50ZXIsIHRoaXMuaGFsZkV4dGVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNmb3JtIHRoaXMgc2hhcGVcclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG0gdGhlIHRyYW5zZm9ybSBtYXRyaXhcclxuICAgICAqIEBwYXJhbSB7VmVjM30gcG9zIHRoZSBwb3NpdGlvbiBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7UXVhdH0gcm90IHRoZSByb3RhdGlvbiBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7VmVjM30gc2NhbGUgdGhlIHNjYWxlIHBhcnQgb2YgdGhlIHRyYW5zZm9ybVxyXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gW291dF0gdGhlIHRhcmdldCBzaGFwZVxyXG4gICAgICovXHJcbiAgICB0cmFuc2Zvcm0gKG0sIHBvcywgcm90LCBzY2FsZSwgb3V0KSB7XHJcbiAgICAgICAgaWYgKCFvdXQpIG91dCA9IHRoaXM7XHJcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dC5jZW50ZXIsIHRoaXMuY2VudGVyLCBtKTtcclxuICAgICAgICB0cmFuc2Zvcm1fZXh0ZW50X200KG91dC5oYWxmRXh0ZW50cywgdGhpcy5oYWxmRXh0ZW50cywgbSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=