
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/render-flow.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _renderFlow = _interopRequireDefault(require("../render-flow"));

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
_renderFlow["default"].prototype._draw = function (node, func) {
  var batcher = _renderFlow["default"].getBachther();

  var ctx = batcher._device._ctx;
  var cam = batcher._camera;
  ctx.setTransform(cam.a, cam.b, cam.c, cam.d, cam.tx, cam.ty);
  ctx.scale(1, -1);
  var comp = node._renderComponent;

  comp._assembler[func](ctx, comp);

  this._next._func(node);
};

_renderFlow["default"].prototype._render = function (node) {
  this._draw(node, 'draw');
};

_renderFlow["default"].prototype._postRender = function (node) {
  this._draw(node, 'postDraw');
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlci1mbG93LmpzIl0sIm5hbWVzIjpbIlJlbmRlckZsb3ciLCJwcm90b3R5cGUiLCJfZHJhdyIsIm5vZGUiLCJmdW5jIiwiYmF0Y2hlciIsImdldEJhY2h0aGVyIiwiY3R4IiwiX2RldmljZSIsIl9jdHgiLCJjYW0iLCJfY2FtZXJhIiwic2V0VHJhbnNmb3JtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJzY2FsZSIsImNvbXAiLCJfcmVuZGVyQ29tcG9uZW50IiwiX2Fzc2VtYmxlciIsIl9uZXh0IiwiX2Z1bmMiLCJfcmVuZGVyIiwiX3Bvc3RSZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUFBLHVCQUFXQyxTQUFYLENBQXFCQyxLQUFyQixHQUE2QixVQUFVQyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUMvQyxNQUFJQyxPQUFPLEdBQUdMLHVCQUFXTSxXQUFYLEVBQWQ7O0FBQ0EsTUFBSUMsR0FBRyxHQUFHRixPQUFPLENBQUNHLE9BQVIsQ0FBZ0JDLElBQTFCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHTCxPQUFPLENBQUNNLE9BQWxCO0FBQ0FKLEVBQUFBLEdBQUcsQ0FBQ0ssWUFBSixDQUFpQkYsR0FBRyxDQUFDRyxDQUFyQixFQUF3QkgsR0FBRyxDQUFDSSxDQUE1QixFQUErQkosR0FBRyxDQUFDSyxDQUFuQyxFQUFzQ0wsR0FBRyxDQUFDTSxDQUExQyxFQUE2Q04sR0FBRyxDQUFDTyxFQUFqRCxFQUFxRFAsR0FBRyxDQUFDUSxFQUF6RDtBQUNBWCxFQUFBQSxHQUFHLENBQUNZLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQyxDQUFkO0FBRUEsTUFBSUMsSUFBSSxHQUFHakIsSUFBSSxDQUFDa0IsZ0JBQWhCOztBQUNBRCxFQUFBQSxJQUFJLENBQUNFLFVBQUwsQ0FBZ0JsQixJQUFoQixFQUFzQkcsR0FBdEIsRUFBMkJhLElBQTNCOztBQUNBLE9BQUtHLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQnJCLElBQWpCO0FBQ0gsQ0FWRDs7QUFZQUgsdUJBQVdDLFNBQVgsQ0FBcUJ3QixPQUFyQixHQUErQixVQUFVdEIsSUFBVixFQUFnQjtBQUMzQyxPQUFLRCxLQUFMLENBQVdDLElBQVgsRUFBaUIsTUFBakI7QUFDSCxDQUZEOztBQUlBSCx1QkFBV0MsU0FBWCxDQUFxQnlCLFdBQXJCLEdBQW1DLFVBQVV2QixJQUFWLEVBQWdCO0FBQy9DLE9BQUtELEtBQUwsQ0FBV0MsSUFBWCxFQUFpQixVQUFqQjtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBSZW5kZXJGbG93IGZyb20gJy4uL3JlbmRlci1mbG93JztcclxuXHJcblJlbmRlckZsb3cucHJvdG90eXBlLl9kcmF3ID0gZnVuY3Rpb24gKG5vZGUsIGZ1bmMpIHtcclxuICAgIGxldCBiYXRjaGVyID0gUmVuZGVyRmxvdy5nZXRCYWNodGhlcigpO1xyXG4gICAgbGV0IGN0eCA9IGJhdGNoZXIuX2RldmljZS5fY3R4O1xyXG4gICAgbGV0IGNhbSA9IGJhdGNoZXIuX2NhbWVyYTtcclxuICAgIGN0eC5zZXRUcmFuc2Zvcm0oY2FtLmEsIGNhbS5iLCBjYW0uYywgY2FtLmQsIGNhbS50eCwgY2FtLnR5KTtcclxuICAgIGN0eC5zY2FsZSgxLCAtMSk7XHJcblxyXG4gICAgbGV0IGNvbXAgPSBub2RlLl9yZW5kZXJDb21wb25lbnQ7XHJcbiAgICBjb21wLl9hc3NlbWJsZXJbZnVuY10oY3R4LCBjb21wKTtcclxuICAgIHRoaXMuX25leHQuX2Z1bmMobm9kZSk7XHJcbn1cclxuXHJcblJlbmRlckZsb3cucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgdGhpcy5fZHJhdyhub2RlLCAnZHJhdycpO1xyXG59XHJcblxyXG5SZW5kZXJGbG93LnByb3RvdHlwZS5fcG9zdFJlbmRlciA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICB0aGlzLl9kcmF3KG5vZGUsICdwb3N0RHJhdycpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9