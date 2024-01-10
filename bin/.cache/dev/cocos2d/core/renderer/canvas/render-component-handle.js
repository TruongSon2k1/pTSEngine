
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/render-component-handle.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
var utils = require('./renderers/utils');

var RenderComponentHandle = function RenderComponentHandle(device, defaultCamera) {
  this._device = device; // let vx = this._device._vx;
  // let vy = this._device._vy;
  // let vh = this._device._vh;

  this._camera = defaultCamera;
  this.parentOpacity = 1;
  this.parentOpacityDirty = 0;
  this.worldMatDirty = 0;
  this.walking = false;
};

RenderComponentHandle.prototype = {
  constructor: RenderComponentHandle,
  reset: function reset() {
    var ctx = this._device._ctx;
    var canvas = this._device._canvas;
    var color = cc.Camera.main ? cc.Camera.main.backgroundColor : cc.color();
    var rgba = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a / 255 + ")";
    ctx.fillStyle = rgba;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._device._stats.drawcalls = 0; //reset cache data

    utils.context.reset();
  },
  terminate: function terminate() {}
};
module.exports = RenderComponentHandle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlci1jb21wb25lbnQtaGFuZGxlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIlJlbmRlckNvbXBvbmVudEhhbmRsZSIsImRldmljZSIsImRlZmF1bHRDYW1lcmEiLCJfZGV2aWNlIiwiX2NhbWVyYSIsInBhcmVudE9wYWNpdHkiLCJwYXJlbnRPcGFjaXR5RGlydHkiLCJ3b3JsZE1hdERpcnR5Iiwid2Fsa2luZyIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwicmVzZXQiLCJjdHgiLCJfY3R4IiwiY2FudmFzIiwiX2NhbnZhcyIsImNvbG9yIiwiY2MiLCJDYW1lcmEiLCJtYWluIiwiYmFja2dyb3VuZENvbG9yIiwicmdiYSIsInIiLCJnIiwiYiIsImEiLCJmaWxsU3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJjbGVhclJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImZpbGxSZWN0IiwiX3N0YXRzIiwiZHJhd2NhbGxzIiwiY29udGV4dCIsInRlcm1pbmF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFyQjs7QUFFQSxJQUFJQyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQVVDLE1BQVYsRUFBa0JDLGFBQWxCLEVBQWlDO0FBQ3pELE9BQUtDLE9BQUwsR0FBZUYsTUFBZixDQUR5RCxDQUV6RDtBQUNBO0FBQ0E7O0FBQ0EsT0FBS0csT0FBTCxHQUFlRixhQUFmO0FBRUEsT0FBS0csYUFBTCxHQUFxQixDQUFyQjtBQUNBLE9BQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsT0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0gsQ0FYRDs7QUFhQVIscUJBQXFCLENBQUNTLFNBQXRCLEdBQWtDO0FBQzlCQyxFQUFBQSxXQUFXLEVBQUVWLHFCQURpQjtBQUc5QlcsRUFBQUEsS0FIOEIsbUJBR3RCO0FBQ0osUUFBSUMsR0FBRyxHQUFHLEtBQUtULE9BQUwsQ0FBYVUsSUFBdkI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBS1gsT0FBTCxDQUFhWSxPQUExQjtBQUNBLFFBQUlDLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxNQUFILENBQVVDLElBQVYsR0FBaUJGLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQyxJQUFWLENBQWVDLGVBQWhDLEdBQWtESCxFQUFFLENBQUNELEtBQUgsRUFBOUQ7QUFDQSxRQUFJSyxJQUFJLGFBQVdMLEtBQUssQ0FBQ00sQ0FBakIsVUFBdUJOLEtBQUssQ0FBQ08sQ0FBN0IsVUFBbUNQLEtBQUssQ0FBQ1EsQ0FBekMsVUFBK0NSLEtBQUssQ0FBQ1MsQ0FBTixHQUFRLEdBQXZELE1BQVI7QUFDQWIsSUFBQUEsR0FBRyxDQUFDYyxTQUFKLEdBQWdCTCxJQUFoQjtBQUNBVCxJQUFBQSxHQUFHLENBQUNlLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEM7QUFDQWYsSUFBQUEsR0FBRyxDQUFDZ0IsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JkLE1BQU0sQ0FBQ2UsS0FBM0IsRUFBa0NmLE1BQU0sQ0FBQ2dCLE1BQXpDO0FBQ0FsQixJQUFBQSxHQUFHLENBQUNtQixRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQmpCLE1BQU0sQ0FBQ2UsS0FBMUIsRUFBaUNmLE1BQU0sQ0FBQ2dCLE1BQXhDO0FBQ0EsU0FBSzNCLE9BQUwsQ0FBYTZCLE1BQWIsQ0FBb0JDLFNBQXBCLEdBQWdDLENBQWhDLENBVEksQ0FVSjs7QUFDQW5DLElBQUFBLEtBQUssQ0FBQ29DLE9BQU4sQ0FBY3ZCLEtBQWQ7QUFDSCxHQWY2QjtBQWlCOUJ3QixFQUFBQSxTQWpCOEIsdUJBaUJqQixDQUVaO0FBbkI2QixDQUFsQztBQXNCQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckMscUJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vcmVuZGVyZXJzL3V0aWxzJylcclxuXHJcbmxldCBSZW5kZXJDb21wb25lbnRIYW5kbGUgPSBmdW5jdGlvbiAoZGV2aWNlLCBkZWZhdWx0Q2FtZXJhKSB7XHJcbiAgICB0aGlzLl9kZXZpY2UgPSBkZXZpY2U7XHJcbiAgICAvLyBsZXQgdnggPSB0aGlzLl9kZXZpY2UuX3Z4O1xyXG4gICAgLy8gbGV0IHZ5ID0gdGhpcy5fZGV2aWNlLl92eTtcclxuICAgIC8vIGxldCB2aCA9IHRoaXMuX2RldmljZS5fdmg7XHJcbiAgICB0aGlzLl9jYW1lcmEgPSBkZWZhdWx0Q2FtZXJhO1xyXG5cclxuICAgIHRoaXMucGFyZW50T3BhY2l0eSA9IDE7XHJcbiAgICB0aGlzLnBhcmVudE9wYWNpdHlEaXJ0eSA9IDA7XHJcbiAgICB0aGlzLndvcmxkTWF0RGlydHkgPSAwO1xyXG4gICAgdGhpcy53YWxraW5nID0gZmFsc2U7XHJcbn07XHJcblxyXG5SZW5kZXJDb21wb25lbnRIYW5kbGUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IFJlbmRlckNvbXBvbmVudEhhbmRsZSxcclxuICAgIFxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuX2RldmljZS5fY3R4O1xyXG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9kZXZpY2UuX2NhbnZhcztcclxuICAgICAgICB2YXIgY29sb3IgPSBjYy5DYW1lcmEubWFpbiA/IGNjLkNhbWVyYS5tYWluLmJhY2tncm91bmRDb2xvciA6IGNjLmNvbG9yKCk7XHJcbiAgICAgICAgbGV0IHJnYmEgPSBgcmdiYSgke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9LCAke2NvbG9yLmEvMjU1fSlgO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSByZ2JhO1xyXG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX2RldmljZS5fc3RhdHMuZHJhd2NhbGxzID0gMDtcclxuICAgICAgICAvL3Jlc2V0IGNhY2hlIGRhdGFcclxuICAgICAgICB1dGlscy5jb250ZXh0LnJlc2V0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRlcm1pbmF0ZSAoKSB7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJDb21wb25lbnRIYW5kbGU7Il0sInNvdXJjZVJvb3QiOiIvIn0=