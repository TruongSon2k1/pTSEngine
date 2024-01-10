
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/letter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var js = require('../../../../../platform/js');

var WebglBmfontAssembler = require('./bmfont');

var LetterFontAssembler = require('../../../../utils/label/letter-font');

var WHITE = cc.color(255, 255, 255, 255);

var WebglLetterFontAssembler = /*#__PURE__*/function (_LetterFontAssembler) {
  _inheritsLoose(WebglLetterFontAssembler, _LetterFontAssembler);

  function WebglLetterFontAssembler() {
    return _LetterFontAssembler.apply(this, arguments) || this;
  }

  var _proto = WebglLetterFontAssembler.prototype;

  _proto.createData = function createData(comp) {
    return comp.requestRenderData();
  };

  _proto._getColor = function _getColor(comp) {
    WHITE._fastSetA(comp.node._color.a);

    return WHITE._val;
  };

  _proto.updateColor = function updateColor(comp) {
    var color = this._getColor(comp);

    _LetterFontAssembler.prototype.updateColor.call(this, comp, color);
  };

  return WebglLetterFontAssembler;
}(LetterFontAssembler);

exports["default"] = WebglLetterFontAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXDJkXFxsZXR0ZXIuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiV2ViZ2xCbWZvbnRBc3NlbWJsZXIiLCJMZXR0ZXJGb250QXNzZW1ibGVyIiwiV0hJVEUiLCJjYyIsImNvbG9yIiwiV2ViZ2xMZXR0ZXJGb250QXNzZW1ibGVyIiwiY3JlYXRlRGF0YSIsImNvbXAiLCJyZXF1ZXN0UmVuZGVyRGF0YSIsIl9nZXRDb2xvciIsIl9mYXN0U2V0QSIsIm5vZGUiLCJfY29sb3IiLCJhIiwiX3ZhbCIsInVwZGF0ZUNvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQWxCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHRCxPQUFPLENBQUMsVUFBRCxDQUFwQzs7QUFDQSxJQUFNRSxtQkFBbUIsR0FBR0YsT0FBTyxDQUFDLHFDQUFELENBQW5DOztBQUNBLElBQU1HLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsQ0FBZDs7SUFFcUJDOzs7Ozs7Ozs7U0FDakJDLGFBQUEsb0JBQVlDLElBQVosRUFBa0I7QUFDZCxXQUFPQSxJQUFJLENBQUNDLGlCQUFMLEVBQVA7QUFDSDs7U0FFREMsWUFBQSxtQkFBV0YsSUFBWCxFQUFpQjtBQUNiTCxJQUFBQSxLQUFLLENBQUNRLFNBQU4sQ0FBZ0JILElBQUksQ0FBQ0ksSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxDQUFqQzs7QUFDQSxXQUFPWCxLQUFLLENBQUNZLElBQWI7QUFDSDs7U0FFREMsY0FBQSxxQkFBYVIsSUFBYixFQUFtQjtBQUNmLFFBQUlILEtBQUssR0FBRyxLQUFLSyxTQUFMLENBQWVGLElBQWYsQ0FBWjs7QUFFQSxtQ0FBTVEsV0FBTixZQUFrQlIsSUFBbEIsRUFBd0JILEtBQXhCO0FBQ0g7OztFQWRpREgiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vcGxhdGZvcm0vanMnKTtcclxuY29uc3QgV2ViZ2xCbWZvbnRBc3NlbWJsZXIgPSByZXF1aXJlKCcuL2JtZm9udCcpO1xyXG5jb25zdCBMZXR0ZXJGb250QXNzZW1ibGVyID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vdXRpbHMvbGFiZWwvbGV0dGVyLWZvbnQnKTtcclxuY29uc3QgV0hJVEUgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViZ2xMZXR0ZXJGb250QXNzZW1ibGVyIGV4dGVuZHMgTGV0dGVyRm9udEFzc2VtYmxlciB7XHJcbiAgICBjcmVhdGVEYXRhIChjb21wKSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbXAucmVxdWVzdFJlbmRlckRhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q29sb3IgKGNvbXApIHtcclxuICAgICAgICBXSElURS5fZmFzdFNldEEoY29tcC5ub2RlLl9jb2xvci5hKTtcclxuICAgICAgICByZXR1cm4gV0hJVEUuX3ZhbDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb2xvciAoY29tcCkge1xyXG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2dldENvbG9yKGNvbXApO1xyXG5cclxuICAgICAgICBzdXBlci51cGRhdGVDb2xvcihjb21wLCBjb2xvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9