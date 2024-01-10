
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/distance.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.point_plane = point_plane;
exports.pt_point_plane = pt_point_plane;
exports.pt_point_aabb = pt_point_aabb;
exports.pt_point_obb = pt_point_obb;

var _valueTypes = require("../value-types");

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
var X = new _valueTypes.Vec3();
var Y = new _valueTypes.Vec3();
var Z = new _valueTypes.Vec3();
var d = new _valueTypes.Vec3();
var min = new _valueTypes.Vec3();
var max = new _valueTypes.Vec3();
var u = new Array(3);
var e = new Array(3);
/**
 * Some helpful utilities
 * @module cc.geomUtils
 */

/**
 * !#en
 * the distance between a point and a plane
 * !#zh
 * 计算点和平面之间的距离。
 * @method point_plane
 * @param {Vec3} point
 * @param {Plane} plane
 * @return {Number} Distance
 */

function point_plane(point, plane_) {
  return _valueTypes.Vec3.dot(plane_.n, point) - plane_.d;
}
/**
 * !#en
 * the closest point on plane to a given point
 * !#zh
 * 计算平面上最接近给定点的点。
 * @method pt_point_plane
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Plane} plane
 * @return {Vec3} Closest point
 */


function pt_point_plane(out, point, plane_) {
  var t = point_plane(point, plane_);
  return _valueTypes.Vec3.subtract(out, point, _valueTypes.Vec3.multiplyScalar(out, plane_.n, t));
}
/**
 * !#en
 * the closest point on aabb to a given point
 * !#zh
 * 计算 aabb 上最接近给定点的点。
 * @method pt_point_aabb
 * @param {Vec3} out Closest point.
 * @param {Vec3} point Given point.
 * @param {Aabb} aabb Align the axis around the box.
 * @return {Vec3} Closest point.
 */


function pt_point_aabb(out, point, aabb_) {
  _valueTypes.Vec3.copy(out, point);

  _valueTypes.Vec3.subtract(min, aabb_.center, aabb_.halfExtents);

  _valueTypes.Vec3.add(max, aabb_.center, aabb_.halfExtents);

  out.x = out.x < min.x ? min.x : out.x;
  out.y = out.y < min.x ? min.y : out.y;
  out.z = out.z < min.x ? min.z : out.z;
  out.x = out.x > max.x ? max.x : out.x;
  out.y = out.y > max.x ? max.y : out.y;
  out.z = out.z > max.x ? max.z : out.z;
  return out;
}
/**
 * !#en
 * the closest point on obb to a given point
 * !#zh
 * 计算 obb 上最接近给定点的点。
 * @method pt_point_obb
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Obb} obb Direction box
 * @return {Vec3} closest point
 */


function pt_point_obb(out, point, obb_) {
  var obbm = obb_.orientation.m;

  _valueTypes.Vec3.set(X, obbm[0], obbm[1], obbm[2]);

  _valueTypes.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);

  _valueTypes.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);

  u[0] = X;
  u[1] = Y;
  u[2] = Z;
  e[0] = obb_.halfExtents.x;
  e[1] = obb_.halfExtents.y;
  e[2] = obb_.halfExtents.z;

  _valueTypes.Vec3.subtract(d, point, obb_.center); // Start result at center of obb; make steps from there


  _valueTypes.Vec3.set(out, obb_.center.x, obb_.center.y, obb_.center.z); // For each OBB axis...


  for (var i = 0; i < 3; i++) {
    // ...project d onto that axis to get the distance
    // along the axis of d from the obb center
    var dist = _valueTypes.Vec3.dot(d, u[i]); // if distance farther than the obb extents, clamp to the obb


    if (dist > e[i]) {
      dist = e[i];
    }

    if (dist < -e[i]) {
      dist = -e[i];
    } // Step that distance along the axis to get world coordinate


    out.x += dist * u[i].x;
    out.y += dist * u[i].y;
    out.z += dist * u[i].z;
  }

  return out;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXGRpc3RhbmNlLnRzIl0sIm5hbWVzIjpbIlgiLCJWZWMzIiwiWSIsIloiLCJkIiwibWluIiwibWF4IiwidSIsIkFycmF5IiwiZSIsInBvaW50X3BsYW5lIiwicG9pbnQiLCJwbGFuZV8iLCJkb3QiLCJuIiwicHRfcG9pbnRfcGxhbmUiLCJvdXQiLCJ0Iiwic3VidHJhY3QiLCJtdWx0aXBseVNjYWxhciIsInB0X3BvaW50X2FhYmIiLCJhYWJiXyIsImNvcHkiLCJjZW50ZXIiLCJoYWxmRXh0ZW50cyIsImFkZCIsIngiLCJ5IiwieiIsInB0X3BvaW50X29iYiIsIm9iYl8iLCJvYmJtIiwib3JpZW50YXRpb24iLCJtIiwic2V0IiwiaSIsImRpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BLElBQU1BLENBQUMsR0FBRyxJQUFJQyxnQkFBSixFQUFWO0FBQ0EsSUFBTUMsQ0FBQyxHQUFHLElBQUlELGdCQUFKLEVBQVY7QUFDQSxJQUFNRSxDQUFDLEdBQUcsSUFBSUYsZ0JBQUosRUFBVjtBQUNBLElBQU1HLENBQUMsR0FBRyxJQUFJSCxnQkFBSixFQUFWO0FBQ0EsSUFBTUksR0FBRyxHQUFHLElBQUlKLGdCQUFKLEVBQVo7QUFDQSxJQUFNSyxHQUFHLEdBQUcsSUFBSUwsZ0JBQUosRUFBWjtBQUNBLElBQU1NLENBQUMsR0FBRyxJQUFJQyxLQUFKLENBQVUsQ0FBVixDQUFWO0FBQ0EsSUFBTUMsQ0FBQyxHQUFHLElBQUlELEtBQUosQ0FBVSxDQUFWLENBQVY7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUV4QjtBQUNBO0FBQ0EsUUFBSUMsSUFBSSxHQUFHbkMsaUJBQUtZLEdBQUwsQ0FBU1QsQ0FBVCxFQUFZRyxDQUFDLENBQUM0QixDQUFELENBQWIsQ0FBWCxDQUp3QixDQU14Qjs7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHM0IsQ0FBQyxDQUFDMEIsQ0FBRCxDQUFaLEVBQWlCO0FBQ2JDLE1BQUFBLElBQUksR0FBRzNCLENBQUMsQ0FBQzBCLENBQUQsQ0FBUjtBQUNIOztBQUNELFFBQUlDLElBQUksR0FBRyxDQUFDM0IsQ0FBQyxDQUFDMEIsQ0FBRCxDQUFiLEVBQWtCO0FBQ2RDLE1BQUFBLElBQUksR0FBRyxDQUFDM0IsQ0FBQyxDQUFDMEIsQ0FBRCxDQUFUO0FBQ0gsS0FadUIsQ0FjeEI7OztBQUNBbkIsSUFBQUEsR0FBRyxDQUFDVSxDQUFKLElBQVNVLElBQUksR0FBRzdCLENBQUMsQ0FBQzRCLENBQUQsQ0FBRCxDQUFLVCxDQUFyQjtBQUNBVixJQUFBQSxHQUFHLENBQUNXLENBQUosSUFBU1MsSUFBSSxHQUFHN0IsQ0FBQyxDQUFDNEIsQ0FBRCxDQUFELENBQUtSLENBQXJCO0FBQ0FYLElBQUFBLEdBQUcsQ0FBQ1ksQ0FBSixJQUFTUSxJQUFJLEdBQUc3QixDQUFDLENBQUM0QixDQUFELENBQUQsQ0FBS1AsQ0FBckI7QUFDSDs7QUFDRCxTQUFPWixHQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBWZWMzIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgYWFiYiBmcm9tICcuL2FhYmInO1xyXG5pbXBvcnQgb2JiIGZyb20gJy4vb2JiJztcclxuaW1wb3J0IHBsYW5lIGZyb20gJy4vcGxhbmUnO1xyXG5jb25zdCBYID0gbmV3IFZlYzMoKTtcclxuY29uc3QgWSA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IFogPSBuZXcgVmVjMygpO1xyXG5jb25zdCBkID0gbmV3IFZlYzMoKTtcclxuY29uc3QgbWluID0gbmV3IFZlYzMoKTtcclxuY29uc3QgbWF4ID0gbmV3IFZlYzMoKTtcclxuY29uc3QgdSA9IG5ldyBBcnJheSgzKTtcclxuY29uc3QgZSA9IG5ldyBBcnJheSgzKTtcclxuXHJcbi8qKlxyXG4gKiBTb21lIGhlbHBmdWwgdXRpbGl0aWVzXHJcbiAqIEBtb2R1bGUgY2MuZ2VvbVV0aWxzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogdGhlIGRpc3RhbmNlIGJldHdlZW4gYSBwb2ludCBhbmQgYSBwbGFuZVxyXG4gKiAhI3poXHJcbiAqIOiuoeeul+eCueWSjOW5s+mdouS5i+mXtOeahOi3neemu+OAglxyXG4gKiBAbWV0aG9kIHBvaW50X3BsYW5lXHJcbiAqIEBwYXJhbSB7VmVjM30gcG9pbnRcclxuICogQHBhcmFtIHtQbGFuZX0gcGxhbmVcclxuICogQHJldHVybiB7TnVtYmVyfSBEaXN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50X3BsYW5lIChwb2ludDogVmVjMywgcGxhbmVfOiBwbGFuZSkge1xyXG4gICAgcmV0dXJuIFZlYzMuZG90KHBsYW5lXy5uLCBwb2ludCkgLSBwbGFuZV8uZDtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogdGhlIGNsb3Nlc3QgcG9pbnQgb24gcGxhbmUgdG8gYSBnaXZlbiBwb2ludFxyXG4gKiAhI3poXHJcbiAqIOiuoeeul+W5s+mdouS4iuacgOaOpei/kee7meWumueCueeahOeCueOAglxyXG4gKiBAbWV0aG9kIHB0X3BvaW50X3BsYW5lXHJcbiAqIEBwYXJhbSB7VmVjM30gb3V0IENsb3Nlc3QgcG9pbnRcclxuICogQHBhcmFtIHtWZWMzfSBwb2ludCBHaXZlbiBwb2ludFxyXG4gKiBAcGFyYW0ge1BsYW5lfSBwbGFuZVxyXG4gKiBAcmV0dXJuIHtWZWMzfSBDbG9zZXN0IHBvaW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHRfcG9pbnRfcGxhbmUgKG91dDogVmVjMywgcG9pbnQ6IFZlYzMsIHBsYW5lXzogcGxhbmUpIHtcclxuICAgIGNvbnN0IHQgPSBwb2ludF9wbGFuZShwb2ludCwgcGxhbmVfKTtcclxuICAgIHJldHVybiBWZWMzLnN1YnRyYWN0KG91dCwgcG9pbnQsIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0LCBwbGFuZV8ubiwgdCkpO1xyXG59XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiB0aGUgY2xvc2VzdCBwb2ludCBvbiBhYWJiIHRvIGEgZ2l2ZW4gcG9pbnRcclxuICogISN6aFxyXG4gKiDorqHnrpcgYWFiYiDkuIrmnIDmjqXov5Hnu5nlrprngrnnmoTngrnjgIJcclxuICogQG1ldGhvZCBwdF9wb2ludF9hYWJiXHJcbiAqIEBwYXJhbSB7VmVjM30gb3V0IENsb3Nlc3QgcG9pbnQuXHJcbiAqIEBwYXJhbSB7VmVjM30gcG9pbnQgR2l2ZW4gcG9pbnQuXHJcbiAqIEBwYXJhbSB7QWFiYn0gYWFiYiBBbGlnbiB0aGUgYXhpcyBhcm91bmQgdGhlIGJveC5cclxuICogQHJldHVybiB7VmVjM30gQ2xvc2VzdCBwb2ludC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwdF9wb2ludF9hYWJiIChvdXQ6IFZlYzMsIHBvaW50OiBWZWMzLCBhYWJiXzogYWFiYik6IFZlYzMge1xyXG4gICAgVmVjMy5jb3B5KG91dCwgcG9pbnQpO1xyXG4gICAgVmVjMy5zdWJ0cmFjdChtaW4sIGFhYmJfLmNlbnRlciwgYWFiYl8uaGFsZkV4dGVudHMpO1xyXG4gICAgVmVjMy5hZGQobWF4LCBhYWJiXy5jZW50ZXIsIGFhYmJfLmhhbGZFeHRlbnRzKTtcclxuXHJcbiAgICBvdXQueCA9IChvdXQueCA8IG1pbi54KSA/IG1pbi54IDogb3V0Lng7XHJcbiAgICBvdXQueSA9IChvdXQueSA8IG1pbi54KSA/IG1pbi55IDogb3V0Lnk7XHJcbiAgICBvdXQueiA9IChvdXQueiA8IG1pbi54KSA/IG1pbi56IDogb3V0Lno7XHJcblxyXG4gICAgb3V0LnggPSAob3V0LnggPiBtYXgueCkgPyBtYXgueCA6IG91dC54O1xyXG4gICAgb3V0LnkgPSAob3V0LnkgPiBtYXgueCkgPyBtYXgueSA6IG91dC55O1xyXG4gICAgb3V0LnogPSAob3V0LnogPiBtYXgueCkgPyBtYXgueiA6IG91dC56O1xyXG4gICAgcmV0dXJuIG91dDtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogdGhlIGNsb3Nlc3QgcG9pbnQgb24gb2JiIHRvIGEgZ2l2ZW4gcG9pbnRcclxuICogISN6aFxyXG4gKiDorqHnrpcgb2JiIOS4iuacgOaOpei/kee7meWumueCueeahOeCueOAglxyXG4gKiBAbWV0aG9kIHB0X3BvaW50X29iYlxyXG4gKiBAcGFyYW0ge1ZlYzN9IG91dCBDbG9zZXN0IHBvaW50XHJcbiAqIEBwYXJhbSB7VmVjM30gcG9pbnQgR2l2ZW4gcG9pbnRcclxuICogQHBhcmFtIHtPYmJ9IG9iYiBEaXJlY3Rpb24gYm94XHJcbiAqIEByZXR1cm4ge1ZlYzN9IGNsb3Nlc3QgcG9pbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwdF9wb2ludF9vYmIgKG91dDogVmVjMywgcG9pbnQ6IFZlYzMsIG9iYl86IG9iYik6IFZlYzMge1xyXG4gICAgbGV0IG9iYm0gPSBvYmJfLm9yaWVudGF0aW9uLm07XHJcbiAgICBWZWMzLnNldChYLCBvYmJtWzBdLCBvYmJtWzFdLCBvYmJtWzJdKTtcclxuICAgIFZlYzMuc2V0KFksIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pO1xyXG4gICAgVmVjMy5zZXQoWiwgb2JibVs2XSwgb2JibVs3XSwgb2JibVs4XSk7XHJcblxyXG4gICAgdVswXSA9IFg7XHJcbiAgICB1WzFdID0gWTtcclxuICAgIHVbMl0gPSBaO1xyXG4gICAgZVswXSA9IG9iYl8uaGFsZkV4dGVudHMueDtcclxuICAgIGVbMV0gPSBvYmJfLmhhbGZFeHRlbnRzLnk7XHJcbiAgICBlWzJdID0gb2JiXy5oYWxmRXh0ZW50cy56O1xyXG5cclxuICAgIFZlYzMuc3VidHJhY3QoZCwgcG9pbnQsIG9iYl8uY2VudGVyKTtcclxuXHJcbiAgICAvLyBTdGFydCByZXN1bHQgYXQgY2VudGVyIG9mIG9iYjsgbWFrZSBzdGVwcyBmcm9tIHRoZXJlXHJcbiAgICBWZWMzLnNldChvdXQsIG9iYl8uY2VudGVyLngsIG9iYl8uY2VudGVyLnksIG9iYl8uY2VudGVyLnopO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIE9CQiBheGlzLi4uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG5cclxuICAgICAgICAvLyAuLi5wcm9qZWN0IGQgb250byB0aGF0IGF4aXMgdG8gZ2V0IHRoZSBkaXN0YW5jZVxyXG4gICAgICAgIC8vIGFsb25nIHRoZSBheGlzIG9mIGQgZnJvbSB0aGUgb2JiIGNlbnRlclxyXG4gICAgICAgIGxldCBkaXN0ID0gVmVjMy5kb3QoZCwgdVtpXSk7XHJcblxyXG4gICAgICAgIC8vIGlmIGRpc3RhbmNlIGZhcnRoZXIgdGhhbiB0aGUgb2JiIGV4dGVudHMsIGNsYW1wIHRvIHRoZSBvYmJcclxuICAgICAgICBpZiAoZGlzdCA+IGVbaV0pIHtcclxuICAgICAgICAgICAgZGlzdCA9IGVbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXN0IDwgLWVbaV0pIHtcclxuICAgICAgICAgICAgZGlzdCA9IC1lW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3RlcCB0aGF0IGRpc3RhbmNlIGFsb25nIHRoZSBheGlzIHRvIGdldCB3b3JsZCBjb29yZGluYXRlXHJcbiAgICAgICAgb3V0LnggKz0gZGlzdCAqIHVbaV0ueDtcclxuICAgICAgICBvdXQueSArPSBkaXN0ICogdVtpXS55O1xyXG4gICAgICAgIG91dC56ICs9IGRpc3QgKiB1W2ldLno7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9