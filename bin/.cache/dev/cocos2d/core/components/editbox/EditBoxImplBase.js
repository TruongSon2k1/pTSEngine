
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/EditBoxImplBase.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2012 James Chen
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
var EditBoxImplBase = cc.Class({
  ctor: function ctor() {
    this._delegate = null;
    this._editing = false;
  },
  init: function init(delegate) {},
  enable: function enable() {},
  disable: function disable() {
    if (this._editing) {
      this.endEditing();
    }
  },
  clear: function clear() {},
  update: function update() {},
  setTabIndex: function setTabIndex(index) {},
  setSize: function setSize(width, height) {},
  setFocus: function setFocus(value) {
    if (value) {
      this.beginEditing();
    } else {
      this.endEditing();
    }
  },
  isFocused: function isFocused() {
    return this._editing;
  },
  beginEditing: function beginEditing() {},
  endEditing: function endEditing() {}
});
module.exports = EditBoxImplBase;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXGVkaXRib3hcXEVkaXRCb3hJbXBsQmFzZS5qcyJdLCJuYW1lcyI6WyJFZGl0Qm94SW1wbEJhc2UiLCJjYyIsIkNsYXNzIiwiY3RvciIsIl9kZWxlZ2F0ZSIsIl9lZGl0aW5nIiwiaW5pdCIsImRlbGVnYXRlIiwiZW5hYmxlIiwiZGlzYWJsZSIsImVuZEVkaXRpbmciLCJjbGVhciIsInVwZGF0ZSIsInNldFRhYkluZGV4IiwiaW5kZXgiLCJzZXRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRGb2N1cyIsInZhbHVlIiwiYmVnaW5FZGl0aW5nIiwiaXNGb2N1c2VkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBRDJCLGtCQUNuQjtBQUNKLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsR0FKMEI7QUFNM0JDLEVBQUFBLElBTjJCLGdCQU1yQkMsUUFOcUIsRUFNWCxDQUVmLENBUjBCO0FBVTNCQyxFQUFBQSxNQVYyQixvQkFVakIsQ0FFVCxDQVowQjtBQWMzQkMsRUFBQUEsT0FkMkIscUJBY2hCO0FBQ1AsUUFBSSxLQUFLSixRQUFULEVBQW1CO0FBQ2YsV0FBS0ssVUFBTDtBQUNIO0FBQ0osR0FsQjBCO0FBb0IzQkMsRUFBQUEsS0FwQjJCLG1CQW9CbEIsQ0FFUixDQXRCMEI7QUF3QjNCQyxFQUFBQSxNQXhCMkIsb0JBd0JqQixDQUVULENBMUIwQjtBQTRCM0JDLEVBQUFBLFdBNUIyQix1QkE0QmRDLEtBNUJjLEVBNEJQLENBRW5CLENBOUIwQjtBQWdDM0JDLEVBQUFBLE9BaEMyQixtQkFnQ2xCQyxLQWhDa0IsRUFnQ1hDLE1BaENXLEVBZ0NILENBRXZCLENBbEMwQjtBQW9DM0JDLEVBQUFBLFFBcEMyQixvQkFvQ2pCQyxLQXBDaUIsRUFvQ1Y7QUFDYixRQUFJQSxLQUFKLEVBQVc7QUFDUCxXQUFLQyxZQUFMO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsV0FBS1YsVUFBTDtBQUNIO0FBQ0osR0EzQzBCO0FBNkMzQlcsRUFBQUEsU0E3QzJCLHVCQTZDZDtBQUNULFdBQU8sS0FBS2hCLFFBQVo7QUFDSCxHQS9DMEI7QUFpRDNCZSxFQUFBQSxZQWpEMkIsMEJBaURYLENBRWYsQ0FuRDBCO0FBcUQzQlYsRUFBQUEsVUFyRDJCLHdCQXFEYixDQUViO0FBdkQwQixDQUFULENBQXRCO0FBMERBWSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ2QixlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTIgSmFtZXMgQ2hlblxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBFZGl0Qm94SW1wbEJhc2UgPSBjYy5DbGFzcyh7XHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9kZWxlZ2F0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fZWRpdGluZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0IChkZWxlZ2F0ZSkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgZGlzYWJsZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmRFZGl0aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhYkluZGV4IChpbmRleCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0U2l6ZSAod2lkdGgsIGhlaWdodCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0Rm9jdXMgKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5FZGl0aW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuZEVkaXRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlzRm9jdXNlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRpbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIGJlZ2luRWRpdGluZyAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgZW5kRWRpdGluZyAoKSB7XHJcblxyXG4gICAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVkaXRCb3hJbXBsQmFzZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=