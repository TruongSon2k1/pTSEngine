
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event-listeners.js';
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
var js = cc.js;

var CallbacksInvoker = require('../platform/callbacks-invoker'); // Extends CallbacksInvoker to handle and invoke event callbacks.


function EventListeners() {
  CallbacksInvoker.call(this);
}

js.extend(EventListeners, CallbacksInvoker);

EventListeners.prototype.emit = function (event, captureListeners) {
  var key = event.type;
  var list = this._callbackTable[key];

  if (list) {
    var rootInvoker = !list.isInvoking;
    list.isInvoking = true;
    var infos = list.callbackInfos;

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];

      if (info && info.callback) {
        info.callback.call(info.target, event, captureListeners);

        if (event._propagationImmediateStopped) {
          break;
        }
      }
    }

    if (rootInvoker) {
      list.isInvoking = false;

      if (list.containCanceled) {
        list.purgeCanceled();
      }
    }
  }
};

module.exports = EventListeners;

if (CC_TEST) {
  cc._Test.EventListeners = EventListeners;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50XFxldmVudC1saXN0ZW5lcnMuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIkNhbGxiYWNrc0ludm9rZXIiLCJyZXF1aXJlIiwiRXZlbnRMaXN0ZW5lcnMiLCJjYWxsIiwiZXh0ZW5kIiwicHJvdG90eXBlIiwiZW1pdCIsImV2ZW50IiwiY2FwdHVyZUxpc3RlbmVycyIsImtleSIsInR5cGUiLCJsaXN0IiwiX2NhbGxiYWNrVGFibGUiLCJyb290SW52b2tlciIsImlzSW52b2tpbmciLCJpbmZvcyIsImNhbGxiYWNrSW5mb3MiLCJpIiwibGVuIiwibGVuZ3RoIiwiaW5mbyIsImNhbGxiYWNrIiwidGFyZ2V0IiwiX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCIsImNvbnRhaW5DYW5jZWxlZCIsInB1cmdlQ2FuY2VsZWQiLCJtb2R1bGUiLCJleHBvcnRzIiwiQ0NfVEVTVCIsIl9UZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxFQUFFLEdBQUdDLEVBQUUsQ0FBQ0QsRUFBZDs7QUFDQSxJQUFNRSxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDLCtCQUFELENBQWhDLEVBRUE7OztBQUNBLFNBQVNDLGNBQVQsR0FBMkI7QUFDdkJGLEVBQUFBLGdCQUFnQixDQUFDRyxJQUFqQixDQUFzQixJQUF0QjtBQUNIOztBQUNETCxFQUFFLENBQUNNLE1BQUgsQ0FBVUYsY0FBVixFQUEwQkYsZ0JBQTFCOztBQUVBRSxjQUFjLENBQUNHLFNBQWYsQ0FBeUJDLElBQXpCLEdBQWdDLFVBQVVDLEtBQVYsRUFBaUJDLGdCQUFqQixFQUFtQztBQUMvRCxNQUFJQyxHQUFHLEdBQUdGLEtBQUssQ0FBQ0csSUFBaEI7QUFDQSxNQUFNQyxJQUFJLEdBQUcsS0FBS0MsY0FBTCxDQUFvQkgsR0FBcEIsQ0FBYjs7QUFDQSxNQUFJRSxJQUFKLEVBQVU7QUFDTixRQUFJRSxXQUFXLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDRyxVQUF4QjtBQUNBSCxJQUFBQSxJQUFJLENBQUNHLFVBQUwsR0FBa0IsSUFBbEI7QUFFQSxRQUFNQyxLQUFLLEdBQUdKLElBQUksQ0FBQ0ssYUFBbkI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxHQUFHLEdBQUdILEtBQUssQ0FBQ0ksTUFBNUIsRUFBb0NGLENBQUMsR0FBR0MsR0FBeEMsRUFBNkMsRUFBRUQsQ0FBL0MsRUFBa0Q7QUFDOUMsVUFBTUcsSUFBSSxHQUFHTCxLQUFLLENBQUNFLENBQUQsQ0FBbEI7O0FBQ0EsVUFBSUcsSUFBSSxJQUFJQSxJQUFJLENBQUNDLFFBQWpCLEVBQTJCO0FBQ3ZCRCxRQUFBQSxJQUFJLENBQUNDLFFBQUwsQ0FBY2xCLElBQWQsQ0FBbUJpQixJQUFJLENBQUNFLE1BQXhCLEVBQWdDZixLQUFoQyxFQUF1Q0MsZ0JBQXZDOztBQUNBLFlBQUlELEtBQUssQ0FBQ2dCLDRCQUFWLEVBQXdDO0FBQ3BDO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUlWLFdBQUosRUFBaUI7QUFDYkYsTUFBQUEsSUFBSSxDQUFDRyxVQUFMLEdBQWtCLEtBQWxCOztBQUNBLFVBQUlILElBQUksQ0FBQ2EsZUFBVCxFQUEwQjtBQUN0QmIsUUFBQUEsSUFBSSxDQUFDYyxhQUFMO0FBQ0g7QUFDSjtBQUNKO0FBQ0osQ0F6QkQ7O0FBMkJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QixjQUFqQjs7QUFDQSxJQUFJMEIsT0FBSixFQUFhO0FBQ1Q3QixFQUFBQSxFQUFFLENBQUM4QixLQUFILENBQVMzQixjQUFULEdBQTBCQSxjQUExQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QganMgPSBjYy5qcztcclxuY29uc3QgQ2FsbGJhY2tzSW52b2tlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2NhbGxiYWNrcy1pbnZva2VyJyk7XHJcblxyXG4vLyBFeHRlbmRzIENhbGxiYWNrc0ludm9rZXIgdG8gaGFuZGxlIGFuZCBpbnZva2UgZXZlbnQgY2FsbGJhY2tzLlxyXG5mdW5jdGlvbiBFdmVudExpc3RlbmVycyAoKSB7XHJcbiAgICBDYWxsYmFja3NJbnZva2VyLmNhbGwodGhpcyk7XHJcbn1cclxuanMuZXh0ZW5kKEV2ZW50TGlzdGVuZXJzLCBDYWxsYmFja3NJbnZva2VyKTtcclxuXHJcbkV2ZW50TGlzdGVuZXJzLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XHJcbiAgICBsZXQga2V5ID0gZXZlbnQudHlwZTtcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XHJcbiAgICBpZiAobGlzdCkge1xyXG4gICAgICAgIGxldCByb290SW52b2tlciA9ICFsaXN0LmlzSW52b2tpbmc7XHJcbiAgICAgICAgbGlzdC5pc0ludm9raW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGluZm9zLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcclxuICAgICAgICAgICAgaWYgKGluZm8gJiYgaW5mby5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaW5mby5jYWxsYmFjay5jYWxsKGluZm8udGFyZ2V0LCBldmVudCwgY2FwdHVyZUxpc3RlbmVycyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm9vdEludm9rZXIpIHtcclxuICAgICAgICAgICAgbGlzdC5pc0ludm9raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmNvbnRhaW5DYW5jZWxlZCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXJnZUNhbmNlbGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50TGlzdGVuZXJzO1xyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAgY2MuX1Rlc3QuRXZlbnRMaXN0ZW5lcnMgPSBFdmVudExpc3RlbmVycztcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==