
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/label/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCLabel = _interopRequireDefault(require("../../../../components/CCLabel"));

var _ttf = _interopRequireDefault(require("./ttf"));

var _bmfont = _interopRequireDefault(require("./bmfont"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var canvasPool = {
  pool: [],
  get: function get() {
    var data = this.pool.pop();

    if (!data) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      data = {
        canvas: canvas,
        context: context
      }; // default text info

      context.textBaseline = 'alphabetic';
    }

    return data;
  },
  put: function put(canvas) {
    if (this.pool.length >= 32) {
      return;
    }

    this.pool.push(canvas);
  }
};
_CCLabel["default"]._canvasPool = canvasPool;

_assembler["default"].register(_CCLabel["default"], {
  getConstructor: function getConstructor(label) {
    var ctor = _ttf["default"];

    if (label.font instanceof cc.BitmapFont) {
      ctor = _bmfont["default"];
    } else if (label.cacheMode === _CCLabel["default"].CacheMode.CHAR) {
      cc.warn('sorry, canvas mode does not support CHAR mode currently!');
    }

    return ctor;
  },
  TTF: _ttf["default"],
  Bmfont: _bmfont["default"]
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcbGFiZWxcXGluZGV4LmpzIl0sIm5hbWVzIjpbImNhbnZhc1Bvb2wiLCJwb29sIiwiZ2V0IiwiZGF0YSIsInBvcCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwidGV4dEJhc2VsaW5lIiwicHV0IiwibGVuZ3RoIiwicHVzaCIsIkxhYmVsIiwiX2NhbnZhc1Bvb2wiLCJBc3NlbWJsZXIiLCJyZWdpc3RlciIsImdldENvbnN0cnVjdG9yIiwibGFiZWwiLCJjdG9yIiwiVFRGIiwiZm9udCIsImNjIiwiQml0bWFwRm9udCIsIkJtZm9udCIsImNhY2hlTW9kZSIsIkNhY2hlTW9kZSIsIkNIQVIiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BLElBQUlBLFVBQVUsR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsRUFETztBQUViQyxFQUFBQSxHQUZhLGlCQUVOO0FBQ0gsUUFBSUMsSUFBSSxHQUFHLEtBQUtGLElBQUwsQ0FBVUcsR0FBVixFQUFYOztBQUVBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1AsVUFBSUUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFVBQUlDLE9BQU8sR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQWQ7QUFDQU4sTUFBQUEsSUFBSSxHQUFHO0FBQ0hFLFFBQUFBLE1BQU0sRUFBRUEsTUFETDtBQUVIRyxRQUFBQSxPQUFPLEVBQUVBO0FBRk4sT0FBUCxDQUhPLENBUVA7O0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0UsWUFBUixHQUF1QixZQUF2QjtBQUNIOztBQUVELFdBQU9QLElBQVA7QUFDSCxHQWxCWTtBQW1CYlEsRUFBQUEsR0FuQmEsZUFtQlJOLE1BbkJRLEVBbUJBO0FBQ1QsUUFBSSxLQUFLSixJQUFMLENBQVVXLE1BQVYsSUFBb0IsRUFBeEIsRUFBNEI7QUFDeEI7QUFDSDs7QUFDRCxTQUFLWCxJQUFMLENBQVVZLElBQVYsQ0FBZVIsTUFBZjtBQUNIO0FBeEJZLENBQWpCO0FBMkJBUyxvQkFBTUMsV0FBTixHQUFvQmYsVUFBcEI7O0FBR0FnQixzQkFBVUMsUUFBVixDQUFtQkgsbUJBQW5CLEVBQTBCO0FBQ3RCSSxFQUFBQSxjQURzQiwwQkFDUEMsS0FETyxFQUNBO0FBQ2xCLFFBQUlDLElBQUksR0FBR0MsZUFBWDs7QUFFQSxRQUFJRixLQUFLLENBQUNHLElBQU4sWUFBc0JDLEVBQUUsQ0FBQ0MsVUFBN0IsRUFBeUM7QUFDckNKLE1BQUFBLElBQUksR0FBR0ssa0JBQVA7QUFDSCxLQUZELE1BRU8sSUFBSU4sS0FBSyxDQUFDTyxTQUFOLEtBQW9CWixvQkFBTWEsU0FBTixDQUFnQkMsSUFBeEMsRUFBOEM7QUFDakRMLE1BQUFBLEVBQUUsQ0FBQ00sSUFBSCxDQUFRLDBEQUFSO0FBQ0g7O0FBRUQsV0FBT1QsSUFBUDtBQUNILEdBWHFCO0FBYXRCQyxFQUFBQSxHQUFHLEVBQUhBLGVBYnNCO0FBY3RCSSxFQUFBQSxNQUFNLEVBQU5BO0FBZHNCLENBQTFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi9hc3NlbWJsZXInO1xyXG5pbXBvcnQgTGFiZWwgZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJztcclxuaW1wb3J0IFRURiBmcm9tICcuL3R0Zic7XHJcbmltcG9ydCBCbWZvbnQgZnJvbSAnLi9ibWZvbnQnO1xyXG5cclxubGV0IGNhbnZhc1Bvb2wgPSB7XHJcbiAgICBwb29sOiBbXSxcclxuICAgIGdldCAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnBvb2wucG9wKCk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzOiBjYW52YXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdGV4dCBpbmZvXHJcbiAgICAgICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgcHV0IChjYW52YXMpIHtcclxuICAgICAgICBpZiAodGhpcy5wb29sLmxlbmd0aCA+PSAzMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGNhbnZhcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5MYWJlbC5fY2FudmFzUG9vbCA9IGNhbnZhc1Bvb2w7XHJcblxyXG5cclxuQXNzZW1ibGVyLnJlZ2lzdGVyKExhYmVsLCB7XHJcbiAgICBnZXRDb25zdHJ1Y3RvcihsYWJlbCkge1xyXG4gICAgICAgIGxldCBjdG9yID0gVFRGO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChsYWJlbC5mb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xyXG4gICAgICAgICAgICBjdG9yID0gQm1mb250O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWwuY2FjaGVNb2RlID09PSBMYWJlbC5DYWNoZU1vZGUuQ0hBUikge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdzb3JyeSwgY2FudmFzIG1vZGUgZG9lcyBub3Qgc3VwcG9ydCBDSEFSIG1vZGUgY3VycmVudGx5IScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN0b3I7XHJcbiAgICB9LFxyXG5cclxuICAgIFRURixcclxuICAgIEJtZm9udFxyXG59KTsiXSwic291cmNlUm9vdCI6Ii8ifQ==