
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/triangle.js';
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
 * Triangle
 * @class geomUtils.Triangle
 */
var triangle = /*#__PURE__*/function () {
  /**
   * create a new triangle
   * @method create
   * @param {number} ax
   * @param {number} ay
   * @param {number} az
   * @param {number} bx
   * @param {number} by
   * @param {number} bz
   * @param {number} cx
   * @param {number} cy
   * @param {number} cz
   * @return {geomUtils.Triangle}
   */
  triangle.create = function create(ax, ay, az, bx, by, bz, cx, cy, cz) {
    return new triangle(ax, ay, az, bx, by, bz, cx, cy, cz);
  }
  /**
   * clone a new triangle
   * @method clone
   * @param {geomUtils.Triangle} t the source plane
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.clone = function clone(t) {
    return new triangle(t.a.x, t.a.y, t.a.z, t.b.x, t.b.y, t.b.z, t.c.x, t.c.y, t.c.z);
  }
  /**
   * copy the values from one triangle to another
   * @method copy
   * @param {geomUtils.Triangle} out the receiving triangle
   * @param {geomUtils.Triangle} t the source triangle
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.copy = function copy(out, t) {
    _vec["default"].copy(out.a, t.a);

    _vec["default"].copy(out.b, t.b);

    _vec["default"].copy(out.c, t.c);

    return out;
  }
  /**
   * Create a triangle from three points
   * @method fromPoints
   * @param {geomUtils.Triangle} out the receiving triangle
   * @param {Vec3} a
   * @param {Vec3} b
   * @param {Vec3} c
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.fromPoints = function fromPoints(out, a, b, c) {
    _vec["default"].copy(out.a, a);

    _vec["default"].copy(out.b, b);

    _vec["default"].copy(out.c, c);

    return out;
  }
  /**
   * Set the components of a triangle to the given values
   *
   * @method set
   * @param {geomUtils.Triangle} out the receiving plane
   * @param {number} ax X component of a
   * @param {number} ay Y component of a
   * @param {number} az Z component of a
   * @param {number} bx X component of b
   * @param {number} by Y component of b
   * @param {number} bz Z component of b
   * @param {number} cx X component of c
   * @param {number} cy Y component of c
   * @param {number} cz Z component of c
   * @return {Plane}
   */
  ;

  triangle.set = function set(out, ax, ay, az, bx, by, bz, cx, cy, cz) {
    out.a.x = ax;
    out.a.y = ay;
    out.a.z = az;
    out.b.x = bx;
    out.b.y = by;
    out.b.z = bz;
    out.c.x = cx;
    out.c.y = cy;
    out.c.z = cz;
    return out;
  }
  /**
   * @property {Vec3} a
   */
  ;

  /**
   * create a new triangle
   * @constructor
   * @param {number} ax
   * @param {number} ay
   * @param {number} az
   * @param {number} bx
   * @param {number} by
   * @param {number} bz
   * @param {number} cx
   * @param {number} cy
   * @param {number} cz
   */
  function triangle(ax, ay, az, bx, by, bz, cx, cy, cz) {
    this.a = void 0;
    this.b = void 0;
    this.c = void 0;
    this._type = void 0;
    this.a = new _vec["default"](ax, ay, az);
    this.b = new _vec["default"](bx, by, bz);
    this.c = new _vec["default"](cx, cy, cz);
    this._type = _enums["default"].SHAPE_TRIANGLE;
    ;
  }

  return triangle;
}();

exports["default"] = triangle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXHRyaWFuZ2xlLnRzIl0sIm5hbWVzIjpbInRyaWFuZ2xlIiwiY3JlYXRlIiwiYXgiLCJheSIsImF6IiwiYngiLCJieSIsImJ6IiwiY3giLCJjeSIsImN6IiwiY2xvbmUiLCJ0IiwiYSIsIngiLCJ5IiwieiIsImIiLCJjIiwiY29weSIsIm91dCIsIlZlYzMiLCJmcm9tUG9pbnRzIiwic2V0IiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX1RSSUFOR0xFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOzs7O0FBMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7QUFFakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtXQUNrQkMsU0FBZCxnQkFBc0JDLEVBQXRCLEVBQTBCQyxFQUExQixFQUE4QkMsRUFBOUIsRUFBa0NDLEVBQWxDLEVBQXNDQyxFQUF0QyxFQUEwQ0MsRUFBMUMsRUFBOENDLEVBQTlDLEVBQWtEQyxFQUFsRCxFQUFzREMsRUFBdEQsRUFBMEQ7QUFDdEQsV0FBTyxJQUFJVixRQUFKLENBQWFFLEVBQWIsRUFBaUJDLEVBQWpCLEVBQXFCQyxFQUFyQixFQUF5QkMsRUFBekIsRUFBNkJDLEVBQTdCLEVBQWlDQyxFQUFqQyxFQUFxQ0MsRUFBckMsRUFBeUNDLEVBQXpDLEVBQTZDQyxFQUE3QyxDQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztXQUNrQkMsUUFBZCxlQUFxQkMsQ0FBckIsRUFBd0I7QUFDcEIsV0FBTyxJQUFJWixRQUFKLENBQ0hZLENB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NkdDLEVBQTdHLEVBQXlIO0FBQUEsU0E1QnpIRyxDQTRCeUg7QUFBQSxTQXhCekhJLENBd0J5SDtBQUFBLFNBcEJ6SEMsQ0FvQnlIO0FBQUEsU0FmekhNLEtBZXlIO0FBQ3JILFNBQUtYLENBQUwsR0FBUyxJQUFJUSxlQUFKLENBQVNuQixFQUFULEVBQWFDLEVBQWIsRUFBaUJDLEVBQWpCLENBQVQ7QUFDQSxTQUFLYSxDQUFMLEdBQVMsSUFBSUksZUFBSixDQUFTaEIsRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixDQUFUO0FBQ0EsU0FBS1csQ0FBTCxHQUFTLElBQUlHLGVBQUosQ0FBU2IsRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixDQUFUO0FBQ0EsU0FBS2MsS0FBTCxHQUFhQyxrQkFBTUMsY0FBbkI7QUFBa0M7QUFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmVjMyBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMzJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xyXG5cclxuLyoqXHJcbiAqIFRyaWFuZ2xlXHJcbiAqIEBjbGFzcyBnZW9tVXRpbHMuVHJpYW5nbGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRyaWFuZ2xlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG5ldyB0cmlhbmdsZVxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGF5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBieFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJ5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnpcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjeFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN5XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3pcclxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5UcmlhbmdsZX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKGF4LCBheSwgYXosIGJ4LCBieSwgYnosIGN4LCBjeSwgY3opIHtcclxuICAgICAgICByZXR1cm4gbmV3IHRyaWFuZ2xlKGF4LCBheSwgYXosIGJ4LCBieSwgYnosIGN4LCBjeSwgY3opO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2xvbmUgYSBuZXcgdHJpYW5nbGVcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEBwYXJhbSB7Z2VvbVV0aWxzLlRyaWFuZ2xlfSB0IHRoZSBzb3VyY2UgcGxhbmVcclxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5UcmlhbmdsZX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSAodCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgdHJpYW5nbGUoXHJcbiAgICAgICAgICAgIHQuYS54LCB0LmEueSwgdC5hLnosXHJcbiAgICAgICAgICAgIHQuYi54LCB0LmIueSwgdC5iLnosXHJcbiAgICAgICAgICAgIHQuYy54LCB0LmMueSwgdC5jLnpcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29weSB0aGUgdmFsdWVzIGZyb20gb25lIHRyaWFuZ2xlIHRvIGFub3RoZXJcclxuICAgICAqIEBtZXRob2QgY29weVxyXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuVHJpYW5nbGV9IG91dCB0aGUgcmVjZWl2aW5nIHRyaWFuZ2xlXHJcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gdCB0aGUgc291cmNlIHRyaWFuZ2xlXHJcbiAgICAgKiBAcmV0dXJuIHtnZW9tVXRpbHMuVHJpYW5nbGV9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0LCB0KSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5hLCB0LmEpO1xyXG4gICAgICAgIFZlYzMuY29weShvdXQuYiwgdC5iKTtcclxuICAgICAgICBWZWMzLmNvcHkob3V0LmMsIHQuYyk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSB0cmlhbmdsZSBmcm9tIHRocmVlIHBvaW50c1xyXG4gICAgICogQG1ldGhvZCBmcm9tUG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gb3V0IHRoZSByZWNlaXZpbmcgdHJpYW5nbGVcclxuICAgICAqIEBwYXJhbSB7VmVjM30gYVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBiXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGNcclxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5UcmlhbmdsZX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUG9pbnRzIChvdXQsIGEsIGIsIGMpIHtcclxuICAgICAgICBWZWMzLmNvcHkob3V0LmEsIGEpO1xyXG4gICAgICAgIFZlYzMuY29weShvdXQuYiwgYik7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5jLCBjKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdHJpYW5nbGUgdG8gdGhlIGdpdmVuIHZhbHVlc1xyXG4gICAgICpcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gb3V0IHRoZSByZWNlaXZpbmcgcGxhbmVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheCBYIGNvbXBvbmVudCBvZiBhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXkgWSBjb21wb25lbnQgb2YgYVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGF6IFogY29tcG9uZW50IG9mIGFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBieCBYIGNvbXBvbmVudCBvZiBiXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnkgWSBjb21wb25lbnQgb2YgYlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJ6IFogY29tcG9uZW50IG9mIGJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjeCBYIGNvbXBvbmVudCBvZiBjXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3kgWSBjb21wb25lbnQgb2YgY1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN6IFogY29tcG9uZW50IG9mIGNcclxuICAgICAqIEByZXR1cm4ge1BsYW5lfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCAob3V0LCBheCwgYXksIGF6LCBieCwgYnksIGJ6LCBjeCwgY3ksIGN6KSB7XHJcbiAgICAgICAgb3V0LmEueCA9IGF4O1xyXG4gICAgICAgIG91dC5hLnkgPSBheTtcclxuICAgICAgICBvdXQuYS56ID0gYXo7XHJcblxyXG4gICAgICAgIG91dC5iLnggPSBieDtcclxuICAgICAgICBvdXQuYi55ID0gYnk7XHJcbiAgICAgICAgb3V0LmIueiA9IGJ6O1xyXG5cclxuICAgICAgICBvdXQuYy54ID0gY3g7XHJcbiAgICAgICAgb3V0LmMueSA9IGN5O1xyXG4gICAgICAgIG91dC5jLnogPSBjejtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYVxyXG4gICAgICovXHJcbiAgICBhOiBWZWMzO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGJcclxuICAgICAqL1xyXG4gICAgYjogVmVjMztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBjXHJcbiAgICAgKi9cclxuICAgIGM6IFZlYzM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZW9tZXRyeSB0eXBlXHJcbiAgICAgKi9cclxuICAgIF90eXBlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYSBuZXcgdHJpYW5nbGVcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGF4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhelxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJ4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnlcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBielxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN4XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3lcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjelxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAoYXg6IG51bWJlciwgYXk6IG51bWJlciwgYXo6IG51bWJlciwgYng6IG51bWJlciwgYnk6IG51bWJlciwgYno6IG51bWJlciwgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYSA9IG5ldyBWZWMzKGF4LCBheSwgYXopO1xyXG4gICAgICAgIHRoaXMuYiA9IG5ldyBWZWMzKGJ4LCBieSwgYnopO1xyXG4gICAgICAgIHRoaXMuYyA9IG5ldyBWZWMzKGN4LCBjeSwgY3opO1xyXG4gICAgICAgIHRoaXMuX3R5cGUgPSBlbnVtcy5TSEFQRV9UUklBTkdMRTs7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=