
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/line.js';
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
 * line
 * !#zh
 * 直线
 * @class geomUtils.Line
 */
var line = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new line
   * !#zh
   * 创建一个新的 line。
   * @method create
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   * @return {Line}
   */
  line.create = function create(sx, sy, sz, ex, ey, ez) {
    return new line(sx, sy, sz, ex, ey, ez);
  }
  /**
   * !#en
   * Creates a new line initialized with values from an existing line
   * !#zh
   * 克隆一个新的 line。
   * @method clone
   * @param {Line} a The source of cloning.
   * @return {Line} The cloned object.
   */
  ;

  line.clone = function clone(a) {
    return new line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
  }
  /**
   * !#en
   * Copy the values from one line to another
   * !#zh
   * 复制一个线的值到另一个。
   * @method copy
   * @param {Line} out The object that accepts the action.
   * @param {Line} a The source of the copy.
   * @return {Line} The object that accepts the action.
   */
  ;

  line.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.s, a.s);

    _valueTypes.Vec3.copy(out.e, a.e);

    return out;
  }
  /**
   * !#en
   * create a line from two points
   * !#zh
   * 用两个点创建一个线。
   * @method fromPoints
   * @param {Line} out The object that accepts the action.
   * @param {Vec3} start The starting point.
   * @param {Vec3} end At the end.
   * @return {Line} out The object that accepts the action.
   */
  ;

  line.fromPoints = function fromPoints(out, start, end) {
    _valueTypes.Vec3.copy(out.s, start);

    _valueTypes.Vec3.copy(out.e, end);

    return out;
  }
  /**
   * !#en
   * Set the components of a Vec3 to the given values
   * !#zh
   * 将给定线的属性设置为给定值。
   * @method set
   * @param {Line} out The object that accepts the action.
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   * @return {Line} out The object that accepts the action.
   */
  ;

  line.set = function set(out, sx, sy, sz, ex, ey, ez) {
    out.s.x = sx;
    out.s.y = sy;
    out.s.z = sz;
    out.e.x = ex;
    out.e.y = ey;
    out.e.z = ez;
    return out;
  }
  /**
   * !#en
   * Calculate the length of the line.
   * !#zh
   * 计算线的长度。
   * @method len
   * @param {Line} a The line to calculate.
   * @return {Number} Length.
   */
  ;

  line.len = function len(a) {
    return _valueTypes.Vec3.distance(a.s, a.e);
  }
  /**
   * !#en
   * Start points.
   * !#zh
   * 起点。
   * @property {Vec3} s
   */
  ;

  /**
   * !#en Construct a line.
   * !#zh 构造一条线。
   * @constructor
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   */
  function line(sx, sy, sz, ex, ey, ez) {
    if (sx === void 0) {
      sx = 0;
    }

    if (sy === void 0) {
      sy = 0;
    }

    if (sz === void 0) {
      sz = 0;
    }

    if (ex === void 0) {
      ex = 0;
    }

    if (ey === void 0) {
      ey = 0;
    }

    if (ez === void 0) {
      ez = -1;
    }

    this.s = void 0;
    this.e = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_LINE;
    this.s = new _valueTypes.Vec3(sx, sy, sz);
    this.e = new _valueTypes.Vec3(ex, ey, ez);
  }
  /**
   * !#en
   * Calculate the length of the line.
   * !#zh
   * 计算线的长度。
   * @method length
   * @return {Number} Length.
   */


  var _proto = line.prototype;

  _proto.length = function length() {
    return _valueTypes.Vec3.distance(this.s, this.e);
  };

  return line;
}();

exports["default"] = line;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXGxpbmUudHMiXSwibmFtZXMiOlsibGluZSIsImNyZWF0ZSIsInN4Iiwic3kiLCJzeiIsImV4IiwiZXkiLCJleiIsImNsb25lIiwiYSIsInMiLCJ4IiwieSIsInoiLCJlIiwiY29weSIsIm91dCIsIlZlYzMiLCJmcm9tUG9pbnRzIiwic3RhcnQiLCJlbmQiLCJzZXQiLCJsZW4iLCJkaXN0YW5jZSIsIl90eXBlIiwiZW51bXMiLCJTSEFQRV9MSU5FIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOztBQUNBOzs7O0FBekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkE7QUFFakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtPQUNrQkMsU0FBZCxnQkFBc0JDLEVBQXRCLEVBQWtDQyxFQUFsQyxFQUE4Q0MsRUFBOUMsRUFBMERDLEVBQTFELEVBQXNFQyxFQUF0RSxFQUFrRkMsRUFBbEYsRUFBOEY7QUFDMUYsV0FBTyxJQUFJUCxJQUFKLENBQVNFLEVBQVQsRUFBYUMsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCLEVBQXlCQyxFQUF6QixFQUE2QkMsRUFBN0IsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7T0FDa0JDLFFBQWQsZUFBcUJDLENBQXJCLEVBQThCO0FBQzFCLFdBQU8sSUFBSVQsSUFBSixDQUNIUyxDQUFDLENBQUNDLENBQUYsQ0FBSUMsQ0FERCxFQUNJRixDQUFDLENBQUND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RUFBUyxHQUFKLENBQUMsQ0FBRztBQUFBOztBQUFBLFNBeEJ2REcsQ0F3QnVEO0FBQUEsU0FmdkRJLENBZXVEO0FBQUEsU0FidERVLEtBYXNEO0FBQzFELFNBQUtBLEtBQUwsR0FBYUMsa0JBQU1DLFVBQW5CO0FBQ0EsU0FBS2hCLENBQUwsR0FBUyxJQUFJTyxnQkFBSixDQUFTZixFQUFULEVBQWFDLEVBQWIsRUFBaUJDLEVBQWpCLENBQVQ7QUFDQSxTQUFLVSxDQUFMLEdBQVMsSUFBSUcsZ0JBQUosQ0FBU1osRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixDQUFUO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNXb0IsU0FBUCxrQkFBaUI7QUFDYixXQUFPVixpQkFBS00sUUFBTCxDQUFjLEtBQUtiLENBQW5CLEVBQXNCLEtBQUtJLENBQTNCLENBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gXHJcbiAqIGxpbmVcclxuICogISN6aFxyXG4gKiDnm7Tnur9cclxuICogQGNsYXNzIGdlb21VdGlscy5MaW5lXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsaW5lIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNyZWF0ZSBhIG5ldyBsaW5lXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJvlu7rkuIDkuKrmlrDnmoQgbGluZeOAglxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeCBUaGUgeCBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeSBUaGUgeSBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleCBUaGUgeCBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXkgVGhlIHkgcGFydCBvZiB0aGUgZW5kIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV6IFRoZSB6IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cclxuICAgICAqIEByZXR1cm4ge0xpbmV9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlIChzeDogbnVtYmVyLCBzeTogbnVtYmVyLCBzejogbnVtYmVyLCBleDogbnVtYmVyLCBleTogbnVtYmVyLCBlejogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBsaW5lKHN4LCBzeSwgc3osIGV4LCBleSwgZXopO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBsaW5lIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbGluZVxyXG4gICAgICogISN6aFxyXG4gICAgICog5YWL6ZqG5LiA5Liq5paw55qEIGxpbmXjgIJcclxuICAgICAqIEBtZXRob2QgY2xvbmVcclxuICAgICAqIEBwYXJhbSB7TGluZX0gYSBUaGUgc291cmNlIG9mIGNsb25pbmcuXHJcbiAgICAgKiBAcmV0dXJuIHtMaW5lfSBUaGUgY2xvbmVkIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSAoYTogbGluZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgbGluZShcclxuICAgICAgICAgICAgYS5zLngsIGEucy55LCBhLnMueixcclxuICAgICAgICAgICAgYS5lLngsIGEuZS55LCBhLmUueixcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIGxpbmUgdG8gYW5vdGhlclxyXG4gICAgICogISN6aFxyXG4gICAgICog5aSN5Yi25LiA5Liq57q/55qE5YC85Yiw5Y+m5LiA5Liq44CCXHJcbiAgICAgKiBAbWV0aG9kIGNvcHlcclxuICAgICAqIEBwYXJhbSB7TGluZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge0xpbmV9IGEgVGhlIHNvdXJjZSBvZiB0aGUgY29weS5cclxuICAgICAqIEByZXR1cm4ge0xpbmV9IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0OiBsaW5lLCBhOiBsaW5lKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dC5zLCBhLnMpO1xyXG4gICAgICAgIFZlYzMuY29weShvdXQuZSwgYS5lKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNyZWF0ZSBhIGxpbmUgZnJvbSB0d28gcG9pbnRzXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnlKjkuKTkuKrngrnliJvlu7rkuIDkuKrnur/jgIJcclxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xyXG4gICAgICogQHBhcmFtIHtMaW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7VmVjM30gc3RhcnQgVGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBlbmQgQXQgdGhlIGVuZC5cclxuICAgICAqIEByZXR1cm4ge0xpbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dDogbGluZSwgc3RhcnQ6IFZlYzMsIGVuZDogVmVjMykge1xyXG4gICAgICAgIFZlYzMuY29weShvdXQucywgc3RhcnQpO1xyXG4gICAgICAgIFZlYzMuY29weShvdXQuZSwgZW5kKTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgVmVjMyB0byB0aGUgZ2l2ZW4gdmFsdWVzXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlsIbnu5nlrprnur/nmoTlsZ7mgKforr7nva7kuLrnu5nlrprlgLzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0XHJcbiAgICAgKiBAcGFyYW0ge0xpbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN4IFRoZSB4IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN5IFRoZSB5IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN6IFRoZSB6IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV4IFRoZSB4IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleSBUaGUgeSBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXogVGhlIHogcGFydCBvZiB0aGUgZW5kIHBvaW50LlxyXG4gICAgICogQHJldHVybiB7TGluZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IChvdXQ6IGxpbmUsIHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN6OiBudW1iZXIsIGV4OiBudW1iZXIsIGV5OiBudW1iZXIsIGV6OiBudW1iZXIpIHtcclxuICAgICAgICBvdXQucy54ID0gc3g7XHJcbiAgICAgICAgb3V0LnMueSA9IHN5O1xyXG4gICAgICAgIG91dC5zLnogPSBzejtcclxuICAgICAgICBvdXQuZS54ID0gZXg7XHJcbiAgICAgICAgb3V0LmUueSA9IGV5O1xyXG4gICAgICAgIG91dC5lLnogPSBlejtcclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBsaW5lLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6h566X57q/55qE6ZW/5bqm44CCXHJcbiAgICAgKiBAbWV0aG9kIGxlblxyXG4gICAgICogQHBhcmFtIHtMaW5lfSBhIFRoZSBsaW5lIHRvIGNhbGN1bGF0ZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlbiAoYTogbGluZSkge1xyXG4gICAgICAgIHJldHVybiBWZWMzLmRpc3RhbmNlKGEucywgYS5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFN0YXJ0IHBvaW50cy5cclxuICAgICAqICEjemhcclxuICAgICAqIOi1t+eCueOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzOiBWZWMzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRW5kIHBvaW50cy5cclxuICAgICAqICEjemhcclxuICAgICAqIOe7iOeCueOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlOiBWZWMzO1xyXG5cclxuICAgIHByaXZhdGUgX3R5cGU6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29uc3RydWN0IGEgbGluZS5cclxuICAgICAqICEjemgg5p6E6YCg5LiA5p2h57q/44CCXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeCBUaGUgeCBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeSBUaGUgeSBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleCBUaGUgeCBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXkgVGhlIHkgcGFydCBvZiB0aGUgZW5kIHBvaW50LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV6IFRoZSB6IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IgKHN4ID0gMCwgc3kgPSAwLCBzeiA9IDAsIGV4ID0gMCwgZXkgPSAwLCBleiA9IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX0xJTkU7XHJcbiAgICAgICAgdGhpcy5zID0gbmV3IFZlYzMoc3gsIHN5LCBzeik7XHJcbiAgICAgICAgdGhpcy5lID0gbmV3IFZlYzMoZXgsIGV5LCBleik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiuoeeul+e6v+eahOmVv+W6puOAglxyXG4gICAgICogQG1ldGhvZCBsZW5ndGhcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcclxuICAgICAgICByZXR1cm4gVmVjMy5kaXN0YW5jZSh0aGlzLnMsIHRoaXMuZSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=