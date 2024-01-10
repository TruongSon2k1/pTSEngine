
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCTTFFont.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
var Font = require('./CCFont');
/**
 * @module cc
 */

/**
 * !#en Class for TTFFont handling.
 * !#zh TTF 字体资源类。
 * @class TTFFont
 * @extends Font
 *
 */


var TTFFont = cc.Class({
  name: 'cc.TTFFont',
  "extends": Font,
  properties: {
    _fontFamily: null,
    _nativeAsset: {
      type: cc.String,
      get: function get() {
        return this._fontFamily;
      },
      set: function set(value) {
        this._fontFamily = value || 'Arial';
      },
      override: true
    },
    _nativeDep: {
      get: function get() {
        return {
          uuid: this._uuid,
          __nativeName__: this._native,
          ext: cc.path.extname(this._native),
          __isNative__: true
        };
      },
      override: true
    }
  }
});
cc.TTFFont = module.exports = TTFFont;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NUVEZGb250LmpzIl0sIm5hbWVzIjpbIkZvbnQiLCJyZXF1aXJlIiwiVFRGRm9udCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIl9mb250RmFtaWx5IiwiX25hdGl2ZUFzc2V0IiwidHlwZSIsIlN0cmluZyIsImdldCIsInNldCIsInZhbHVlIiwib3ZlcnJpZGUiLCJfbmF0aXZlRGVwIiwidXVpZCIsIl91dWlkIiwiX19uYXRpdmVOYW1lX18iLCJfbmF0aXZlIiwiZXh0IiwicGF0aCIsImV4dG5hbWUiLCJfX2lzTmF0aXZlX18iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXBCO0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxPQUFPLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ25CQyxFQUFBQSxJQUFJLEVBQUUsWUFEYTtBQUVuQixhQUFTTCxJQUZVO0FBSW5CTSxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFLElBREw7QUFFUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZDLE1BQUFBLElBQUksRUFBRU4sRUFBRSxDQUFDTyxNQURDO0FBRVZDLE1BQUFBLEdBRlUsaUJBRUg7QUFDSCxlQUFPLEtBQUtKLFdBQVo7QUFDSCxPQUpTO0FBS1ZLLE1BQUFBLEdBTFUsZUFLTEMsS0FMSyxFQUtFO0FBQ1IsYUFBS04sV0FBTCxHQUFtQk0sS0FBSyxJQUFJLE9BQTVCO0FBQ0gsT0FQUztBQVFWQyxNQUFBQSxRQUFRLEVBQUU7QUFSQSxLQUZOO0FBYVJDLElBQUFBLFVBQVUsRUFBRTtBQUNSSixNQUFBQSxHQURRLGlCQUNEO0FBQ0gsZUFBTztBQUFFSyxVQUFBQSxJQUFJLEVBQUUsS0FBS0MsS0FBYjtBQUFvQkMsVUFBQUEsY0FBYyxFQUFFLEtBQUtDLE9BQXpDO0FBQW1EQyxVQUFBQSxHQUFHLEVBQUVqQixFQUFFLENBQUNrQixJQUFILENBQVFDLE9BQVIsQ0FBZ0IsS0FBS0gsT0FBckIsQ0FBeEQ7QUFBdUZJLFVBQUFBLFlBQVksRUFBRTtBQUFyRyxTQUFQO0FBQ0gsT0FITztBQUlSVCxNQUFBQSxRQUFRLEVBQUU7QUFKRjtBQWJKO0FBSk8sQ0FBVCxDQUFkO0FBMEJBWCxFQUFFLENBQUNELE9BQUgsR0FBYXNCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZCLE9BQTlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgRm9udCA9IHJlcXVpcmUoJy4vQ0NGb250Jyk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gQ2xhc3MgZm9yIFRURkZvbnQgaGFuZGxpbmcuXHJcbiAqICEjemggVFRGIOWtl+S9k+i1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgVFRGRm9udFxyXG4gKiBAZXh0ZW5kcyBGb250XHJcbiAqXHJcbiAqL1xyXG52YXIgVFRGRm9udCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5UVEZGb250JyxcclxuICAgIGV4dGVuZHM6IEZvbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9mb250RmFtaWx5OiBudWxsLFxyXG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udEZhbWlseTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9udEZhbWlseSA9IHZhbHVlIHx8ICdBcmlhbCc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX25hdGl2ZURlcDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdXVpZDogdGhpcy5fdXVpZCwgX19uYXRpdmVOYW1lX186IHRoaXMuX25hdGl2ZSwgIGV4dDogY2MucGF0aC5leHRuYW1lKHRoaXMuX25hdGl2ZSksIF9faXNOYXRpdmVfXzogdHJ1ZSB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5UVEZGb250ID0gbW9kdWxlLmV4cG9ydHMgPSBUVEZGb250O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==