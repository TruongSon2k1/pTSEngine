
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/value-type.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _js = _interopRequireDefault(require("../platform/js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
 * !#en The base class of all value types.
 * !#zh 所有值类型的基类。
 * @class ValueType
 *
 */
var ValueType = /*#__PURE__*/function () {
  function ValueType() {}

  var _proto = ValueType.prototype;

  /**
   * !#en This method returns an exact copy of current value.
   * !#zh 克隆当前值，该方法返回一个新对象，新对象的值和原对象相等。
   * @method clone
   * @return {ValueType}
   */
  _proto.clone = function clone() {
    cc.errorID('0100', _js["default"].getClassName(this) + '.clone'); // @ts-ignore

    return null;
  }
  /**
   * !#en Compares this object with the other one.
   * !#zh 当前对象是否等于指定对象。
   * @method equals
   * @param {ValueType} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.equals');
    return false;
  }
  /**
   * !#en
   * Linearly interpolates between this value to to value by ratio which is in the range [0, 1].
   * When ratio = 0 returns this. When ratio = 1 return to. When ratio = 0.5 returns the average of this and to.
   * !#zh
   * 线性插值。<br/>
   * 当 ratio = 0 时返回自身，ratio = 1 时返回目标，ratio = 0.5 返回自身和目标的平均值。。
   * @method lerp
   * @param {ValueType} to - the to value
   * @param {number} ratio - the interpolation coefficient
   * @return {ValueType}
   */
  ;

  _proto.lerp = function lerp(to, ratio) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.lerp');
    return this.clone();
  }
  /**
   * !#en
   * Copys all the properties from another given object to this value.
   * !#zh
   * 从其它对象把所有属性复制到当前对象。
   * @method set
   * @param {ValueType} source - the source to copy
   */
  ;

  _proto.set = function set(source) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.set');
  }
  /**
   * !#en Convert to a readable string.
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return '' + {};
  };

  return ValueType;
}();

exports["default"] = ValueType;

_js["default"].setClassName('cc.ValueType', ValueType);

cc.ValueType = ValueType;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx2YWx1ZS10eXBlLnRzIl0sIm5hbWVzIjpbIlZhbHVlVHlwZSIsImNsb25lIiwiY2MiLCJlcnJvcklEIiwianMiLCJnZXRDbGFzc05hbWUiLCJlcXVhbHMiLCJvdGhlciIsImxlcnAiLCJ0byIsInJhdGlvIiwic2V0Iiwic291cmNlIiwidG9TdHJpbmciLCJzZXRDbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBQ3FCQTs7Ozs7QUFDakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO1NBQ0lDLFFBQUEsaUJBQXFCO0FBQ2pCQyxJQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxNQUFYLEVBQW1CQyxlQUFHQyxZQUFILENBQWdCLElBQWhCLElBQXdCLFFBQTNDLEVBRGlCLENBRWpCOztBQUNBLFdBQU8sSUFBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNJQyxTQUFBLGdCQUFRQyxLQUFSLEVBQWU7QUFDWEwsSUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsTUFBWCxFQUFtQkMsZUFBR0MsWUFBSCxDQUFnQixJQUFoQixJQUF3QixTQUEzQztBQUNBLFdBQU8sS0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSUcsT0FBQSxjQUFNQyxFQUFOLEVBQVVDLEtBQVYsRUFBaUI7QUFDYlIsSUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsTUFBWCxFQUFtQkMsZUFBR0MsWUFBSCxDQUFnQixJQUFoQixJQUF3QixPQUEzQztBQUNBLFdBQU8sS0FBS0osS0FBTCxFQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSVUsTUFBQSxhQUFLQyxNQUFMLEVBQWE7QUFDVFYsSUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsTUFBWCxFQUFtQkMsZUFBR0MsWUFBSCxDQUFnQixJQUFoQixJQUF3QixNQUEzQztBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSVEsV0FBQSxvQkFBWTtBQUNSLFdBQU8sS0FBSyxFQUFaO0FBQ0g7Ozs7Ozs7QUFHTFQsZUFBR1UsWUFBSCxDQUFnQixjQUFoQixFQUFnQ2QsU0FBaEM7O0FBQ0FFLEVBQUUsQ0FBQ0YsU0FBSCxHQUFlQSxTQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IGpzIGZyb20gJy4uL3BsYXRmb3JtL2pzJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBiYXNlIGNsYXNzIG9mIGFsbCB2YWx1ZSB0eXBlcy5cclxuICogISN6aCDmiYDmnInlgLznsbvlnovnmoTln7rnsbvjgIJcclxuICogQGNsYXNzIFZhbHVlVHlwZVxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsdWVUeXBlIHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIGV4YWN0IGNvcHkgb2YgY3VycmVudCB2YWx1ZS5cclxuICAgICAqICEjemgg5YWL6ZqG5b2T5YmN5YC877yM6K+l5pa55rOV6L+U5Zue5LiA5Liq5paw5a+56LGh77yM5paw5a+56LGh55qE5YC85ZKM5Y6f5a+56LGh55u4562J44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAcmV0dXJuIHtWYWx1ZVR5cGV9XHJcbiAgICAgKi9cclxuICAgIGNsb25lICgpIDogVmFsdWVUeXBlIHtcclxuICAgICAgICBjYy5lcnJvcklEKCcwMTAwJywganMuZ2V0Q2xhc3NOYW1lKHRoaXMpICsgJy5jbG9uZScpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29tcGFyZXMgdGhpcyBvYmplY3Qgd2l0aCB0aGUgb3RoZXIgb25lLlxyXG4gICAgICogISN6aCDlvZPliY3lr7nosaHmmK/lkKbnrYnkuo7mjIflrprlr7nosaHjgIJcclxuICAgICAqIEBtZXRob2QgZXF1YWxzXHJcbiAgICAgKiBAcGFyYW0ge1ZhbHVlVHlwZX0gb3RoZXJcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGVxdWFscyAob3RoZXIpIHtcclxuICAgICAgICBjYy5lcnJvcklEKCcwMTAwJywganMuZ2V0Q2xhc3NOYW1lKHRoaXMpICsgJy5lcXVhbHMnKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBMaW5lYXJseSBpbnRlcnBvbGF0ZXMgYmV0d2VlbiB0aGlzIHZhbHVlIHRvIHRvIHZhbHVlIGJ5IHJhdGlvIHdoaWNoIGlzIGluIHRoZSByYW5nZSBbMCwgMV0uXHJcbiAgICAgKiBXaGVuIHJhdGlvID0gMCByZXR1cm5zIHRoaXMuIFdoZW4gcmF0aW8gPSAxIHJldHVybiB0by4gV2hlbiByYXRpbyA9IDAuNSByZXR1cm5zIHRoZSBhdmVyYWdlIG9mIHRoaXMgYW5kIHRvLlxyXG4gICAgICogISN6aFxyXG4gICAgICog57q/5oCn5o+S5YC844CCPGJyLz5cclxuICAgICAqIOW9kyByYXRpbyA9IDAg5pe26L+U5Zue6Ieq6Lqr77yMcmF0aW8gPSAxIOaXtui/lOWbnuebruagh++8jHJhdGlvID0gMC41IOi/lOWbnuiHqui6q+WSjOebruagh+eahOW5s+Wdh+WAvOOAguOAglxyXG4gICAgICogQG1ldGhvZCBsZXJwXHJcbiAgICAgKiBAcGFyYW0ge1ZhbHVlVHlwZX0gdG8gLSB0aGUgdG8gdmFsdWVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIHRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50XHJcbiAgICAgKiBAcmV0dXJuIHtWYWx1ZVR5cGV9XHJcbiAgICAgKi9cclxuICAgIGxlcnAgKHRvLCByYXRpbykge1xyXG4gICAgICAgIGNjLmVycm9ySUQoJzAxMDAnLCBqcy5nZXRDbGFzc05hbWUodGhpcykgKyAnLmxlcnAnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29weXMgYWxsIHRoZSBwcm9wZXJ0aWVzIGZyb20gYW5vdGhlciBnaXZlbiBvYmplY3QgdG8gdGhpcyB2YWx1ZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOS7juWFtuWug+WvueixoeaKiuaJgOacieWxnuaAp+WkjeWItuWIsOW9k+WJjeWvueixoeOAglxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSB7VmFsdWVUeXBlfSBzb3VyY2UgLSB0aGUgc291cmNlIHRvIGNvcHlcclxuICAgICAqL1xyXG4gICAgc2V0IChzb3VyY2UpIHtcclxuICAgICAgICBjYy5lcnJvcklEKCcwMTAwJywganMuZ2V0Q2xhc3NOYW1lKHRoaXMpICsgJy5zZXQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29udmVydCB0byBhIHJlYWRhYmxlIHN0cmluZy5cclxuICAgICAqICEjemgg6L2s5o2i5Li65pa55L6/6ZiF6K+755qE5a2X56ym5Liy44CCXHJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRvU3RyaW5nICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyB7fTtcclxuICAgIH1cclxufVxyXG5cclxuanMuc2V0Q2xhc3NOYW1lKCdjYy5WYWx1ZVR5cGUnLCBWYWx1ZVR5cGUpO1xyXG5jYy5WYWx1ZVR5cGUgPSBWYWx1ZVR5cGU7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9