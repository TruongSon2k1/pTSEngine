
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/skinned-mesh-renderer.js';
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

 http://www.cocos.com

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
var SkinnedMeshRenderer = require('./CCSkinnedMeshRenderer');

var MeshRendererAssembler = require('../../mesh/mesh-renderer');

var RenderFlow = require('../../renderer/render-flow');

var SkinnedMeshRendererAssembler = /*#__PURE__*/function (_MeshRendererAssemble) {
  _inheritsLoose(SkinnedMeshRendererAssembler, _MeshRendererAssemble);

  function SkinnedMeshRendererAssembler() {
    return _MeshRendererAssemble.apply(this, arguments) || this;
  }

  var _proto = SkinnedMeshRendererAssembler.prototype;

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    comp.calcJointMatrix();

    _MeshRendererAssemble.prototype.fillBuffers.call(this, comp, renderer);
  };

  return SkinnedMeshRendererAssembler;
}(MeshRendererAssembler);

exports["default"] = SkinnedMeshRendererAssembler;
cc.Assembler.register(SkinnedMeshRenderer, SkinnedMeshRendererAssembler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxza2VsZXRvblxcc2tpbm5lZC1tZXNoLXJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIlNraW5uZWRNZXNoUmVuZGVyZXIiLCJyZXF1aXJlIiwiTWVzaFJlbmRlcmVyQXNzZW1ibGVyIiwiUmVuZGVyRmxvdyIsIlNraW5uZWRNZXNoUmVuZGVyZXJBc3NlbWJsZXIiLCJmaWxsQnVmZmVycyIsImNvbXAiLCJyZW5kZXJlciIsImNhbGNKb2ludE1hdHJpeCIsImNjIiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsbUJBQW1CLEdBQUdDLE9BQU8sQ0FBQyx5QkFBRCxDQUFuQzs7QUFDQSxJQUFNQyxxQkFBcUIsR0FBR0QsT0FBTyxDQUFDLDBCQUFELENBQXJDOztBQUNBLElBQU1FLFVBQVUsR0FBR0YsT0FBTyxDQUFDLDRCQUFELENBQTFCOztJQUVxQkc7Ozs7Ozs7OztTQUNqQkMsY0FBQSxxQkFBYUMsSUFBYixFQUFtQkMsUUFBbkIsRUFBNkI7QUFDekJELElBQUFBLElBQUksQ0FBQ0UsZUFBTDs7QUFDQSxvQ0FBTUgsV0FBTixZQUFrQkMsSUFBbEIsRUFBd0JDLFFBQXhCO0FBQ0g7OztFQUpxREw7OztBQU8xRE8sRUFBRSxDQUFDQyxTQUFILENBQWFDLFFBQWIsQ0FBc0JYLG1CQUF0QixFQUEyQ0ksNEJBQTNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MuY29tXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IFNraW5uZWRNZXNoUmVuZGVyZXIgPSByZXF1aXJlKCcuL0NDU2tpbm5lZE1lc2hSZW5kZXJlcicpO1xyXG5jb25zdCBNZXNoUmVuZGVyZXJBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8uLi9tZXNoL21lc2gtcmVuZGVyZXInKTtcclxuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uLy4uL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lubmVkTWVzaFJlbmRlcmVyQXNzZW1ibGVyIGV4dGVuZHMgTWVzaFJlbmRlcmVyQXNzZW1ibGVyIHtcclxuICAgIGZpbGxCdWZmZXJzIChjb21wLCByZW5kZXJlcikge1xyXG4gICAgICAgIGNvbXAuY2FsY0pvaW50TWF0cml4KCk7XHJcbiAgICAgICAgc3VwZXIuZmlsbEJ1ZmZlcnMoY29tcCwgcmVuZGVyZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jYy5Bc3NlbWJsZXIucmVnaXN0ZXIoU2tpbm5lZE1lc2hSZW5kZXJlciwgU2tpbm5lZE1lc2hSZW5kZXJlckFzc2VtYmxlcik7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9