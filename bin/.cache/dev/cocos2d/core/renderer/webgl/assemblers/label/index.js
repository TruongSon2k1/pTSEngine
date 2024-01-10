
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCLabel = _interopRequireDefault(require("../../../../components/CCLabel"));

var _ttf = _interopRequireDefault(require("./2d/ttf"));

var _bmfont = _interopRequireDefault(require("./2d/bmfont"));

var _letter = _interopRequireDefault(require("./2d/letter"));

var _ttf2 = _interopRequireDefault(require("./3d/ttf"));

var _bmfont2 = _interopRequireDefault(require("./3d/bmfont"));

var _letter2 = _interopRequireDefault(require("./3d/letter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
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
var NativeTTF = undefined;

if (CC_JSB) {
  NativeTTF = require("./2d/nativeTTF");
}

_CCLabel["default"]._canvasPool = {
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

_assembler["default"].register(cc.Label, {
  getConstructor: function getConstructor(label) {
    var is3DNode = label.node.is3DNode;
    var ctor = is3DNode ? _ttf2["default"] : _ttf["default"];

    if (label.font instanceof cc.BitmapFont) {
      ctor = is3DNode ? _bmfont2["default"] : _bmfont["default"];
    } else if (label.cacheMode === _CCLabel["default"].CacheMode.CHAR) {
      if (CC_JSB && !is3DNode && !!jsb.LabelRenderer && label.font instanceof cc.TTFFont && label._useNativeTTF()) {
        ctor = NativeTTF;
      } else if (cc.sys.platform === cc.sys.WECHAT_GAME_SUB) {
        cc.warn('sorry, subdomain does not support CHAR mode currently!');
      } else {
        ctor = is3DNode ? _letter2["default"] : _letter["default"];
      }
    }

    return ctor;
  },
  TTF: _ttf["default"],
  Bmfont: _bmfont["default"],
  Letter: _letter["default"],
  TTF3D: _ttf2["default"],
  Bmfont3D: _bmfont2["default"],
  Letter3D: _letter2["default"],
  NativeTTF: NativeTTF
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXGluZGV4LmpzIl0sIm5hbWVzIjpbIk5hdGl2ZVRURiIsInVuZGVmaW5lZCIsIkNDX0pTQiIsInJlcXVpcmUiLCJMYWJlbCIsIl9jYW52YXNQb29sIiwicG9vbCIsImdldCIsImRhdGEiLCJwb3AiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInRleHRCYXNlbGluZSIsInB1dCIsImxlbmd0aCIsInB1c2giLCJBc3NlbWJsZXIiLCJyZWdpc3RlciIsImNjIiwiZ2V0Q29uc3RydWN0b3IiLCJsYWJlbCIsImlzM0ROb2RlIiwibm9kZSIsImN0b3IiLCJUVEYzRCIsIlRURiIsImZvbnQiLCJCaXRtYXBGb250IiwiQm1mb250M0QiLCJCbWZvbnQiLCJjYWNoZU1vZGUiLCJDYWNoZU1vZGUiLCJDSEFSIiwianNiIiwiTGFiZWxSZW5kZXJlciIsIlRURkZvbnQiLCJfdXNlTmF0aXZlVFRGIiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRV9TVUIiLCJ3YXJuIiwiTGV0dGVyM0QiLCJMZXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBYUEsSUFBSUEsU0FBUyxHQUFHQyxTQUFoQjs7QUFDQSxJQUFHQyxNQUFILEVBQVc7QUFDUEYsRUFBQUEsU0FBUyxHQUFHRyxPQUFPLENBQUMsZ0JBQUQsQ0FBbkI7QUFDSDs7QUFFREMsb0JBQU1DLFdBQU4sR0FBb0I7QUFDaEJDLEVBQUFBLElBQUksRUFBRSxFQURVO0FBRWhCQyxFQUFBQSxHQUZnQixpQkFFVDtBQUNILFFBQUlDLElBQUksR0FBRyxLQUFLRixJQUFMLENBQVVHLEdBQVYsRUFBWDs7QUFFQSxRQUFJLENBQUNELElBQUwsRUFBVztBQUNQLFVBQUlFLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQSxVQUFJQyxPQUFPLEdBQUdILE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQixJQUFsQixDQUFkO0FBQ0FOLE1BQUFBLElBQUksR0FBRztBQUNIRSxRQUFBQSxNQUFNLEVBQUVBLE1BREw7QUFFSEcsUUFBQUEsT0FBTyxFQUFFQTtBQUZOLE9BQVAsQ0FITyxDQVFQOztBQUNBQSxNQUFBQSxPQUFPLENBQUNFLFlBQVIsR0FBdUIsWUFBdkI7QUFDSDs7QUFFRCxXQUFPUCxJQUFQO0FBQ0gsR0FsQmU7QUFtQmhCUSxFQUFBQSxHQW5CZ0IsZUFtQlhOLE1BbkJXLEVBbUJIO0FBQ1QsUUFBSSxLQUFLSixJQUFMLENBQVVXLE1BQVYsSUFBb0IsRUFBeEIsRUFBNEI7QUFDeEI7QUFDSDs7QUFDRCxTQUFLWCxJQUFMLENBQVVZLElBQVYsQ0FBZVIsTUFBZjtBQUNIO0FBeEJlLENBQXBCOztBQTJCQVMsc0JBQVVDLFFBQVYsQ0FBbUJDLEVBQUUsQ0FBQ2pCLEtBQXRCLEVBQTZCO0FBQ3pCa0IsRUFBQUEsY0FEeUIsMEJBQ1ZDLEtBRFUsRUFDSDtBQUNsQixRQUFJQyxRQUFRLEdBQUdELEtBQUssQ0FBQ0UsSUFBTixDQUFXRCxRQUExQjtBQUNBLFFBQUlFLElBQUksR0FBR0YsUUFBUSxHQUFHRyxnQkFBSCxHQUFXQyxlQUE5Qjs7QUFFQSxRQUFJTCxLQUFLLENBQUNNLElBQU4sWUFBc0JSLEVBQUUsQ0FBQ1MsVUFBN0IsRUFBeUM7QUFDckNKLE1BQUFBLElBQUksR0FBR0YsUUFBUSxHQUFHTyxtQkFBSCxHQUFjQyxrQkFBN0I7QUFDSCxLQUZELE1BRU8sSUFBSVQsS0FBSyxDQUFDVSxTQUFOLEtBQW9CN0Isb0JBQU04QixTQUFOLENBQWdCQyxJQUF4QyxFQUE4QztBQUVqRCxVQUFHakMsTUFBTSxJQUFJLENBQUNzQixRQUFYLElBQXVCLENBQUMsQ0FBQ1ksR0FBRyxDQUFDQyxhQUE3QixJQUE4Q2QsS0FBSyxDQUFDTSxJQUFOLFlBQXNCUixFQUFFLENBQUNpQixPQUF2RSxJQUFrRmYsS0FBSyxDQUFDZ0IsYUFBTixFQUFyRixFQUEyRztBQUN2R2IsUUFBQUEsSUFBSSxHQUFHMUIsU0FBUDtBQUNILE9BRkQsTUFFTyxJQUFJcUIsRUFBRSxDQUFDbUIsR0FBSCxDQUFPQyxRQUFQLEtBQW9CcEIsRUFBRSxDQUFDbUIsR0FBSCxDQUFPRSxlQUEvQixFQUFnRDtBQUNuRHJCLFFBQUFBLEVBQUUsQ0FBQ3NCLElBQUgsQ0FBUSx3REFBUjtBQUNILE9BRk0sTUFFQTtBQUNIakIsUUFBQUEsSUFBSSxHQUFHRixRQUFRLEdBQUdvQixtQkFBSCxHQUFjQyxrQkFBN0I7QUFDSDtBQUNKOztBQUVELFdBQU9uQixJQUFQO0FBQ0gsR0FuQndCO0FBcUJ6QkUsRUFBQUEsR0FBRyxFQUFIQSxlQXJCeUI7QUFzQnpCSSxFQUFBQSxNQUFNLEVBQU5BLGtCQXRCeUI7QUF1QnpCYSxFQUFBQSxNQUFNLEVBQU5BLGtCQXZCeUI7QUF5QnpCbEIsRUFBQUEsS0FBSyxFQUFMQSxnQkF6QnlCO0FBMEJ6QkksRUFBQUEsUUFBUSxFQUFSQSxtQkExQnlCO0FBMkJ6QmEsRUFBQUEsUUFBUSxFQUFSQSxtQkEzQnlCO0FBNEJ6QjVDLEVBQUFBLFNBQVMsRUFBVEE7QUE1QnlCLENBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XHJcbmltcG9ydCBMYWJlbCBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL0NDTGFiZWwnO1xyXG5cclxuaW1wb3J0IFRURiBmcm9tICcuLzJkL3R0Zic7XHJcbmltcG9ydCBCbWZvbnQgZnJvbSAnLi8yZC9ibWZvbnQnO1xyXG5pbXBvcnQgTGV0dGVyIGZyb20gJy4vMmQvbGV0dGVyJztcclxuXHJcbmltcG9ydCBUVEYzRCBmcm9tICcuLzNkL3R0Zic7XHJcbmltcG9ydCBCbWZvbnQzRCBmcm9tICcuLzNkL2JtZm9udCc7XHJcbmltcG9ydCBMZXR0ZXIzRCBmcm9tICcuLzNkL2xldHRlcic7XHJcblxyXG5sZXQgTmF0aXZlVFRGID0gdW5kZWZpbmVkO1xyXG5pZihDQ19KU0IpIHtcclxuICAgIE5hdGl2ZVRURiA9IHJlcXVpcmUoXCIuLzJkL25hdGl2ZVRURlwiKTtcclxufVxyXG5cclxuTGFiZWwuX2NhbnZhc1Bvb2wgPSB7XHJcbiAgICBwb29sOiBbXSxcclxuICAgIGdldCAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnBvb2wucG9wKCk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzOiBjYW52YXMsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdGV4dCBpbmZvXHJcbiAgICAgICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9LFxyXG4gICAgcHV0IChjYW52YXMpIHtcclxuICAgICAgICBpZiAodGhpcy5wb29sLmxlbmd0aCA+PSAzMikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGNhbnZhcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5Bc3NlbWJsZXIucmVnaXN0ZXIoY2MuTGFiZWwsIHtcclxuICAgIGdldENvbnN0cnVjdG9yKGxhYmVsKSB7XHJcbiAgICAgICAgbGV0IGlzM0ROb2RlID0gbGFiZWwubm9kZS5pczNETm9kZTtcclxuICAgICAgICBsZXQgY3RvciA9IGlzM0ROb2RlID8gVFRGM0QgOiBUVEY7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGxhYmVsLmZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSB7XHJcbiAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IEJtZm9udDNEIDogQm1mb250O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWwuY2FjaGVNb2RlID09PSBMYWJlbC5DYWNoZU1vZGUuQ0hBUikge1xyXG5cclxuICAgICAgICAgICAgaWYoQ0NfSlNCICYmICFpczNETm9kZSAmJiAhIWpzYi5MYWJlbFJlbmRlcmVyICYmIGxhYmVsLmZvbnQgaW5zdGFuY2VvZiBjYy5UVEZGb250ICYmIGxhYmVsLl91c2VOYXRpdmVUVEYoKSl7XHJcbiAgICAgICAgICAgICAgICBjdG9yID0gTmF0aXZlVFRGO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FX1NVQikge1xyXG4gICAgICAgICAgICAgICAgY2Mud2Fybignc29ycnksIHN1YmRvbWFpbiBkb2VzIG5vdCBzdXBwb3J0IENIQVIgbW9kZSBjdXJyZW50bHkhJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdG9yID0gaXMzRE5vZGUgPyBMZXR0ZXIzRCA6IExldHRlcjtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3RvcjtcclxuICAgIH0sXHJcblxyXG4gICAgVFRGLFxyXG4gICAgQm1mb250LFxyXG4gICAgTGV0dGVyLFxyXG5cclxuICAgIFRURjNELFxyXG4gICAgQm1mb250M0QsXHJcbiAgICBMZXR0ZXIzRCxcclxuICAgIE5hdGl2ZVRURlxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=