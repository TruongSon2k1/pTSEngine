
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/ray.js';
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

/**
 * !#en
 * ray
 * !#zh
 * 射线。
 * @class geomUtils.Ray
 */
var ray = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new ray
   * !#zh
   * 创建一条射线。
   * @method create
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   * @return {Ray}
   */
  ray.create = function create(ox, oy, oz, dx, dy, dz) {
    if (ox === void 0) {
      ox = 0;
    }

    if (oy === void 0) {
      oy = 0;
    }

    if (oz === void 0) {
      oz = 0;
    }

    if (dx === void 0) {
      dx = 0;
    }

    if (dy === void 0) {
      dy = 0;
    }

    if (dz === void 0) {
      dz = 1;
    }

    return new ray(ox, oy, oz, dx, dy, dz);
  }
  /**
   * !#en
   * Creates a new ray initialized with values from an existing ray
   * !#zh
   * 从一条射线克隆出一条新的射线。
   * @method clone
   * @param {Ray} a Clone target
   * @return {Ray} Clone result
   */
  ;

  ray.clone = function clone(a) {
    return new ray(a.o.x, a.o.y, a.o.z, a.d.x, a.d.y, a.d.z);
  }
  /**
   * !#en
   * Copy the values from one ray to another
   * !#zh
   * 将从一个 ray 的值复制到另一个 ray。
   * @method copy
   * @param {Ray} out Accept the ray of the operation.
   * @param {Ray} a Copied ray.
   * @return {Ray} out Accept the ray of the operation.
   */
  ;

  ray.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.o, a.o);

    _valueTypes.Vec3.copy(out.d, a.d);

    return out;
  }
  /**
   * !#en
   * create a ray from two points
   * !#zh
   * 用两个点创建一条射线。
   * @method fromPoints
   * @param {Ray} out Receive the operating ray.
   * @param {Vec3} origin Origin of ray
   * @param {Vec3} target A point on a ray.
   * @return {Ray} out Receive the operating ray.
   */
  ;

  ray.fromPoints = function fromPoints(out, origin, target) {
    _valueTypes.Vec3.copy(out.o, origin);

    _valueTypes.Vec3.normalize(out.d, _valueTypes.Vec3.subtract(out.d, target, origin));

    return out;
  }
  /**
   * !#en
   * Set the components of a ray to the given values
   * !#zh
   * 将给定射线的属性设置为给定的值。
   * @method set
   * @param {Ray} out Receive the operating ray.
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   * @return {Ray} out Receive the operating ray.
   */
  ;

  ray.set = function set(out, ox, oy, oz, dx, dy, dz) {
    out.o.x = ox;
    out.o.y = oy;
    out.o.z = oz;
    out.d.x = dx;
    out.d.y = dy;
    out.d.z = dz;
    return out;
  }
  /**
   * !#en
   * Start point.
   * !#zh
   * 起点。
   * @property {Vec3} o
   */
  ;

  /**
   * !#en Construct a ray.
   * !#zh 构造一条射线。
   * @constructor
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   */
  function ray(ox, oy, oz, dx, dy, dz) {
    if (ox === void 0) {
      ox = 0;
    }

    if (oy === void 0) {
      oy = 0;
    }

    if (oz === void 0) {
      oz = 0;
    }

    if (dx === void 0) {
      dx = 0;
    }

    if (dy === void 0) {
      dy = 0;
    }

    if (dz === void 0) {
      dz = -1;
    }

    this.o = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_RAY;
    this.o = new _valueTypes.Vec3(ox, oy, oz);
    this.d = new _valueTypes.Vec3(dx, dy, dz);
  }
  /**
   * !#en Compute hit.
   * @method computeHit
   * @param {IVec3Like} out
   * @param {number} distance
   */


  var _proto = ray.prototype;

  _proto.computeHit = function computeHit(out, distance) {
    _valueTypes.Vec3.normalize(out, this.d);

    _valueTypes.Vec3.scaleAndAdd(out, this.o, out, distance);
  };

  return ray;
}();

exports["default"] = ray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXHJheS50cyJdLCJuYW1lcyI6WyJyYXkiLCJjcmVhdGUiLCJveCIsIm95Iiwib3oiLCJkeCIsImR5IiwiZHoiLCJjbG9uZSIsImEiLCJvIiwieCIsInkiLCJ6IiwiZCIsImNvcHkiLCJvdXQiLCJWZWMzIiwiZnJvbVBvaW50cyIsIm9yaWdpbiIsInRhcmdldCIsIm5vcm1hbGl6ZSIsInN1YnRyYWN0Iiwic2V0IiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX1JBWSIsImNvbXB1dGVIaXQiLCJkaXN0YW5jZSIsInNjYWxlQW5kQWRkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOzs7O0FBMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7QUFFakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtNQUNrQkMsU0FBZCxnQkFBc0JDLEVBQXRCLEVBQXNDQyxFQUF0QyxFQUFzREMsRUFBdEQsRUFBc0VDLEVBQXRFLEVBQXNGQyxFQUF0RixFQUFzR0MsRUFBdEcsRUFBMkg7QUFBQSxRQUFyR0wsRUFBcUc7QUFBckdBLE1BQUFBLEVBQXFHLEdBQXhGLENBQXdGO0FBQUE7O0FBQUEsUUFBckZDLEVBQXFGO0FBQXJGQSxNQUFBQSxFQUFxRixHQUF4RSxDQUF3RTtBQUFBOztBQUFBLFFBQXJFQyxFQUFxRTtBQUFyRUEsTUFBQUEsRUFBcUUsR0FBeEQsQ0FBd0Q7QUFBQTs7QUFBQSxRQUFyREMsRUFBcUQ7QUFBckRBLE1BQUFBLEVBQXFELEdBQXhDLENBQXdDO0FBQUE7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R0FEM0IsQ0FDMkI7QUFBQTs7QUFBQSxRQUR4QkMsRUFDd0I7QUFEeEJBLE1BQUFBLEVBQ3dCLEdBRFgsQ0FDVztBQUFBOztBQUFBLFFBRFJDLEVBQ1E7QUFEUkEsTUFBQUEsRUFDUSxHQURLLENBQ0w7QUFBQTs7QUFBQSxRQUFqREMsRUFBaUQ7QUFBakRBLE1BQUFBLEVBQWlELEdBQXBDLENBQW9DO0FBQUE7O0FBQUEsUUFBakNDLEVBQWlDO0FBQWpDQSxNQUFBQSxFQUFpQyxHQUFwQixDQUFvQjtBQUFBOztBQUFBLFFBQWpCQyxFQUFpQjtBQUFqQkEsTUFBQUEsRUFBaUIsR0FBSixDQUFDLENBQUc7QUFBQTs7QUFBQSxTQXpCOUNHLENBeUI4QztBQUFBLFNBaEI5Q0ksQ0FnQjhDO0FBQUEsU0FkN0NVLEtBYzZDO0FBQ2pELFNBQUtBLEtBQUwsR0FBYUMsa0JBQU1DLFNBQW5CO0FBQ0EsU0FBS2hCLENBQUwsR0FBUyxJQUFJTyxnQkFBSixDQUFTZixFQUFULEVBQWFDLEVBQWIsRUFBaUJDLEVBQWpCLENBQVQ7QUFDQSxTQUFLVSxDQUFMLEdBQVMsSUFBSUcsZ0JBQUosQ0FBU1osRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixDQUFUO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O1NBQ1dvQixhQUFQLG9CQUFtQlgsR0FBbkIsRUFBbUNZLFFBQW5DLEVBQXFEO0FBQ2pEWCxxQkFBS0ksU0FBTCxDQUFlTCxHQUFmLEVBQW9CLEtBQUtGLENBQXpCOztBQUNBRyxxQkFBS1ksV0FBTCxDQUFpQmIsR0FBakIsRUFBc0IsS0FBS04sQ0FBM0IsRUFBOEJNLEdBQTlCLEVBQW1DWSxRQUFuQztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xyXG5pbXBvcnQgeyBJVmVjM0xpa2UgfSBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXRoJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIHJheVxyXG4gKiAhI3poXHJcbiAqIOWwhOe6v+OAglxyXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLlJheVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmF5IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNyZWF0ZSBhIG5ldyByYXlcclxuICAgICAqICEjemhcclxuICAgICAqIOWIm+W7uuS4gOadoeWwhOe6v+OAglxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveCBUaGUgeCBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveSBUaGUgeSBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeCBYIGluIHRoZSBkaXJlY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHkgWSBpbiB0aGUgZGlyZWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR6IFogaW4gdGhlIGRpcmVjdGlvbi5cclxuICAgICAqIEByZXR1cm4ge1JheX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKG94OiBudW1iZXIgPSAwLCBveTogbnVtYmVyID0gMCwgb3o6IG51bWJlciA9IDAsIGR4OiBudW1iZXIgPSAwLCBkeTogbnVtYmVyID0gMCwgZHo6IG51bWJlciA9IDEpOiByYXkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcmF5KG94LCBveSwgb3osIGR4LCBkeSwgZHopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyByYXkgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyByYXlcclxuICAgICAqICEjemhcclxuICAgICAqIOS7juS4gOadoeWwhOe6v+WFi+mahuWHuuS4gOadoeaWsOeahOWwhOe6v+OAglxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHBhcmFtIHtSYXl9IGEgQ2xvbmUgdGFyZ2V0XHJcbiAgICAgKiBAcmV0dXJuIHtSYXl9IENsb25lIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIChhOiByYXkpOiByYXkge1xyXG4gICAgICAgIHJldHVybiBuZXcgcmF5KFxyXG4gICAgICAgICAgICBhLm8ueCwgYS5vLnksIGEuby56LFxyXG4gICAgICAgICAgICBhLmQueCwgYS5kLnksIGEuZC56LFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcmF5IHRvIGFub3RoZXJcclxuICAgICAqICEjemhcclxuICAgICAqIOWwhuS7juS4gOS4qiByYXkg55qE5YC85aSN5Yi25Yiw5Y+m5LiA5LiqIHJheeOAglxyXG4gICAgICogQG1ldGhvZCBjb3B5XHJcbiAgICAgKiBAcGFyYW0ge1JheX0gb3V0IEFjY2VwdCB0aGUgcmF5IG9mIHRoZSBvcGVyYXRpb24uXHJcbiAgICAgKiBAcGFyYW0ge1JheX0gYSBDb3BpZWQgcmF5LlxyXG4gICAgICogQHJldHVybiB7UmF5fSBvdXQgQWNjZXB0IHRoZSByYXkgb2YgdGhlIG9wZXJhdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5IChvdXQ6IHJheSwgYTogcmF5KTogcmF5IHtcclxuICAgICAgICBWZWMzLmNvcHkob3V0Lm8sIGEubyk7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5kLCBhLmQpO1xyXG5cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogY3JlYXRlIGEgcmF5IGZyb20gdHdvIHBvaW50c1xyXG4gICAgICogISN6aFxyXG4gICAgICog55So5Lik5Liq54K55Yib5bu65LiA5p2h5bCE57q/44CCXHJcbiAgICAgKiBAbWV0aG9kIGZyb21Qb2ludHNcclxuICAgICAqIEBwYXJhbSB7UmF5fSBvdXQgUmVjZWl2ZSB0aGUgb3BlcmF0aW5nIHJheS5cclxuICAgICAqIEBwYXJhbSB7VmVjM30gb3JpZ2luIE9yaWdpbiBvZiByYXlcclxuICAgICAqIEBwYXJhbSB7VmVjM30gdGFyZ2V0IEEgcG9pbnQgb24gYSByYXkuXHJcbiAgICAgKiBAcmV0dXJuIHtSYXl9IG91dCBSZWNlaXZlIHRoZSBvcGVyYXRpbmcgcmF5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dDogcmF5LCBvcmlnaW46IFZlYzMsIHRhcmdldDogVmVjMyk6IHJheSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5vLCBvcmlnaW4pO1xyXG4gICAgICAgIFZlYzMubm9ybWFsaXplKG91dC5kLCBWZWMzLnN1YnRyYWN0KG91dC5kLCB0YXJnZXQsIG9yaWdpbikpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSByYXkgdG8gdGhlIGdpdmVuIHZhbHVlc1xyXG4gICAgICogISN6aFxyXG4gICAgICog5bCG57uZ5a6a5bCE57q/55qE5bGe5oCn6K6+572u5Li657uZ5a6a55qE5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHBhcmFtIHtSYXl9IG91dCBSZWNlaXZlIHRoZSBvcGVyYXRpbmcgcmF5LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG94IFRoZSB4IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG95IFRoZSB5IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG96IFRoZSB6IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR4IFggaW4gdGhlIGRpcmVjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeSBZIGluIHRoZSBkaXJlY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHogWiBpbiB0aGUgZGlyZWN0aW9uLlxyXG4gICAgICogQHJldHVybiB7UmF5fSBvdXQgUmVjZWl2ZSB0aGUgb3BlcmF0aW5nIHJheS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKG91dDogcmF5LCBveDogbnVtYmVyLCBveTogbnVtYmVyLCBvejogbnVtYmVyLCBkeDogbnVtYmVyLCBkeTogbnVtYmVyLCBkejogbnVtYmVyKTogcmF5IHtcclxuICAgICAgICBvdXQuby54ID0gb3g7XHJcbiAgICAgICAgb3V0Lm8ueSA9IG95O1xyXG4gICAgICAgIG91dC5vLnogPSBvejtcclxuICAgICAgICBvdXQuZC54ID0gZHg7XHJcbiAgICAgICAgb3V0LmQueSA9IGR5O1xyXG4gICAgICAgIG91dC5kLnogPSBkejtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFN0YXJ0IHBvaW50LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6LW354K544CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IG9cclxuICAgICAqL1xyXG4gICAgcHVibGljIG86IFZlYzM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VcclxuICAgICAqIERpcmVjdGlvblxyXG4gICAgICogISN6aFxyXG4gICAgICog5pa55ZCR44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGQ6IFZlYzM7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHlwZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb25zdHJ1Y3QgYSByYXkuXHJcbiAgICAgKiAhI3poIOaehOmAoOS4gOadoeWwhOe6v+OAglxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3ggVGhlIHggcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3kgVGhlIHkgcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3ogVGhlIHogcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHggWCBpbiB0aGUgZGlyZWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR5IFkgaW4gdGhlIGRpcmVjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeiBaIGluIHRoZSBkaXJlY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yIChveDogbnVtYmVyID0gMCwgb3k6IG51bWJlciA9IDAsIG96OiBudW1iZXIgPSAwLFxyXG4gICAgICAgIGR4OiBudW1iZXIgPSAwLCBkeTogbnVtYmVyID0gMCwgZHo6IG51bWJlciA9IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX1JBWTtcclxuICAgICAgICB0aGlzLm8gPSBuZXcgVmVjMyhveCwgb3ksIG96KTtcclxuICAgICAgICB0aGlzLmQgPSBuZXcgVmVjMyhkeCwgZHksIGR6KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29tcHV0ZSBoaXQuXHJcbiAgICAgKiBAbWV0aG9kIGNvbXB1dGVIaXRcclxuICAgICAqIEBwYXJhbSB7SVZlYzNMaWtlfSBvdXRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29tcHV0ZUhpdCAob3V0OiBJVmVjM0xpa2UsIGRpc3RhbmNlOiBudW1iZXIpIHtcclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQsIHRoaXMuZClcclxuICAgICAgICBWZWMzLnNjYWxlQW5kQWRkKG91dCwgdGhpcy5vLCBvdXQsIGRpc3RhbmNlKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==