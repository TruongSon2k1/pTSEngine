
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/mask.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
var Mask = require('../../../components/CCMask');

var graphicsHandler = require('./graphics');

var CanvasMaskAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(CanvasMaskAssembler, _Assembler);

  function CanvasMaskAssembler() {
    return _Assembler.apply(this, arguments) || this;
  }

  var _proto = CanvasMaskAssembler.prototype;

  _proto.draw = function draw(ctx, mask) {
    ctx.save(); // draw stencil

    mask._graphics._assembler.draw(ctx, mask._graphics);

    ctx.clip();
  };

  _proto.postDraw = function postDraw(ctx, mask) {
    ctx.restore();
  };

  return CanvasMaskAssembler;
}(_assembler["default"]);

exports["default"] = CanvasMaskAssembler;

_assembler["default"].register(Mask, CanvasMaskAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcbWFzay5qcyJdLCJuYW1lcyI6WyJNYXNrIiwicmVxdWlyZSIsImdyYXBoaWNzSGFuZGxlciIsIkNhbnZhc01hc2tBc3NlbWJsZXIiLCJkcmF3IiwiY3R4IiwibWFzayIsInNhdmUiLCJfZ3JhcGhpY3MiLCJfYXNzZW1ibGVyIiwiY2xpcCIsInBvc3REcmF3IiwicmVzdG9yZSIsIkFzc2VtYmxlciIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7Ozs7OztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyw0QkFBRCxDQUFwQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQS9COztJQUdxQkU7Ozs7Ozs7OztTQUNqQkMsT0FBQSxjQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBaUI7QUFDYkQsSUFBQUEsR0FBRyxDQUFDRSxJQUFKLEdBRGEsQ0FHYjs7QUFDQUQsSUFBQUEsSUFBSSxDQUFDRSxTQUFMLENBQWVDLFVBQWYsQ0FBMEJMLElBQTFCLENBQStCQyxHQUEvQixFQUFvQ0MsSUFBSSxDQUFDRSxTQUF6Qzs7QUFFQUgsSUFBQUEsR0FBRyxDQUFDSyxJQUFKO0FBQ0g7O1NBRURDLFdBQUEsa0JBQVVOLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUNqQkQsSUFBQUEsR0FBRyxDQUFDTyxPQUFKO0FBQ0g7OztFQVo0Q0M7Ozs7QUFlakRBLHNCQUFVQyxRQUFWLENBQW1CZCxJQUFuQixFQUF5QkcsbUJBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgTWFzayA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NNYXNrJyk7XHJcbmNvbnN0IGdyYXBoaWNzSGFuZGxlciA9IHJlcXVpcmUoJy4vZ3JhcGhpY3MnKTtcclxuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi9hc3NlbWJsZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzTWFza0Fzc2VtYmxlciBleHRlbmRzIEFzc2VtYmxlciB7XHJcbiAgICBkcmF3IChjdHgsIG1hc2spIHtcclxuICAgICAgICBjdHguc2F2ZSgpO1xyXG5cclxuICAgICAgICAvLyBkcmF3IHN0ZW5jaWxcclxuICAgICAgICBtYXNrLl9ncmFwaGljcy5fYXNzZW1ibGVyLmRyYXcoY3R4LCBtYXNrLl9ncmFwaGljcyk7XHJcblxyXG4gICAgICAgIGN0eC5jbGlwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcG9zdERyYXcgKGN0eCwgbWFzaykge1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkFzc2VtYmxlci5yZWdpc3RlcihNYXNrLCBDYW52YXNNYXNrQXNzZW1ibGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=