
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/utils.js';
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
// TODO - merge with misc.js
var js = require('./js');

module.exports = {
  contains: function contains(refNode, otherNode) {
    if (typeof refNode.contains == 'function') {
      return refNode.contains(otherNode);
    } else if (typeof refNode.compareDocumentPosition == 'function') {
      return !!(refNode.compareDocumentPosition(otherNode) & 16);
    } else {
      var node = otherNode.parentNode;

      if (node) {
        do {
          if (node === refNode) {
            return true;
          } else {
            node = node.parentNode;
          }
        } while (node !== null);
      }

      return false;
    }
  },
  isDomNode: typeof window === 'object' && (typeof Node === 'function' ? function (obj) {
    // If "TypeError: Right-hand side of 'instanceof' is not callback" is thrown,
    // it should because window.Node was overwritten.
    return obj instanceof Node;
  } : function (obj) {
    return obj && typeof obj === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
  }),
  callInNextTick: CC_EDITOR ? function (callback, p1, p2) {
    if (callback) {
      process.nextTick(function () {
        callback(p1, p2);
      });
    }
  } : function (callback, p1, p2) {
    if (callback) {
      setTimeout(function () {
        callback(p1, p2);
      }, 0);
    }
  }
};

if (CC_DEV) {
  ///**
  // * @param {Object} obj
  // * @return {Boolean} is {} ?
  // */
  module.exports.isPlainEmptyObj_DEV = function (obj) {
    if (!obj || obj.constructor !== Object) {
      return false;
    }

    return js.isEmptyObject(obj);
  };

  module.exports.cloneable_DEV = function (obj) {
    return obj && typeof obj.clone === 'function' && (obj.constructor && obj.constructor.prototype.hasOwnProperty('clone') || obj.hasOwnProperty('clone'));
  };
}

if (CC_TEST) {
  // editor mocks using in unit tests
  if (typeof Editor === 'undefined') {
    window.Editor = {
      UuidUtils: {
        NonUuidMark: '.',
        uuid: function uuid() {
          return '' + (new Date().getTime() + Math.random());
        }
      }
    };
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFx1dGlscy5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiY29udGFpbnMiLCJyZWZOb2RlIiwib3RoZXJOb2RlIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJub2RlIiwicGFyZW50Tm9kZSIsImlzRG9tTm9kZSIsIndpbmRvdyIsIk5vZGUiLCJvYmoiLCJub2RlVHlwZSIsIm5vZGVOYW1lIiwiY2FsbEluTmV4dFRpY2siLCJDQ19FRElUT1IiLCJjYWxsYmFjayIsInAxIiwicDIiLCJwcm9jZXNzIiwibmV4dFRpY2siLCJzZXRUaW1lb3V0IiwiQ0NfREVWIiwiaXNQbGFpbkVtcHR5T2JqX0RFViIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiaXNFbXB0eU9iamVjdCIsImNsb25lYWJsZV9ERVYiLCJjbG9uZSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiQ0NfVEVTVCIsIkVkaXRvciIsIlV1aWRVdGlscyIsIk5vblV1aWRNYXJrIiwidXVpZCIsIkRhdGUiLCJnZXRUaW1lIiwiTWF0aCIsInJhbmRvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjtBQUNwQyxRQUFHLE9BQU9ELE9BQU8sQ0FBQ0QsUUFBZixJQUEyQixVQUE5QixFQUF5QztBQUNyQyxhQUFPQyxPQUFPLENBQUNELFFB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UUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsaUJBQU8sTUFBTyxJQUFJQyxJQUFKLEVBQUQsQ0FBYUMsT0FBYixLQUF5QkMsSUFBSSxDQUFDQyxNQUFMLEVBQS9CLENBQVA7QUFDSDtBQUpNO0FBREMsS0FBaEI7QUFRSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLy8gVE9ETyAtIG1lcmdlIHdpdGggbWlzYy5qc1xyXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4vanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uIChyZWZOb2RlLCBvdGhlck5vZGUpIHtcclxuICAgICAgICBpZih0eXBlb2YgcmVmTm9kZS5jb250YWlucyA9PSAnZnVuY3Rpb24nKXtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZk5vZGUuY29udGFpbnMob3RoZXJOb2RlKTtcclxuICAgICAgICB9ZWxzZSBpZih0eXBlb2YgcmVmTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA9PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgICAgICByZXR1cm4gISEocmVmTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihvdGhlck5vZGUpICYgMTYpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBvdGhlck5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PT0gcmVmTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKG5vZGUgIT09bnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNEb21Ob2RlOiB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiAodHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgP1xyXG4gICAgICAgIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgLy8gSWYgXCJUeXBlRXJyb3I6IFJpZ2h0LWhhbmQgc2lkZSBvZiAnaW5zdGFuY2VvZicgaXMgbm90IGNhbGxiYWNrXCIgaXMgdGhyb3duLFxyXG4gICAgICAgICAgICAvLyBpdCBzaG91bGQgYmVjYXVzZSB3aW5kb3cuTm9kZSB3YXMgb3ZlcndyaXR0ZW4uXHJcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBOb2RlO1xyXG4gICAgICAgIH0gOlxyXG4gICAgICAgIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJlxyXG4gICAgICAgICAgICAgICAgICAgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYmoubm9kZVR5cGUgPT09ICdudW1iZXInICYmXHJcbiAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSAnc3RyaW5nJztcclxuICAgICAgICB9XHJcbiAgICApLFxyXG5cclxuICAgIGNhbGxJbk5leHRUaWNrOiBDQ19FRElUT1IgP1xyXG4gICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaywgcDEsIHAyKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socDEsIHAyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDpcclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2ssIHAxLCBwMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHAxLCBwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbn07XHJcblxyXG5pZiAoQ0NfREVWKSB7XHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAgICAvLyAqIEByZXR1cm4ge0Jvb2xlYW59IGlzIHt9ID9cclxuICAgIC8vICovXHJcbiAgICBtb2R1bGUuZXhwb3J0cy5pc1BsYWluRW1wdHlPYmpfREVWID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGlmICghb2JqIHx8IG9iai5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICByZXR1cm4ganMuaXNFbXB0eU9iamVjdChvYmopO1xyXG4gICAgfTtcclxuICAgIG1vZHVsZS5leHBvcnRzLmNsb25lYWJsZV9ERVYgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiAmJlxyXG4gICAgICAgICAgICAgICB0eXBlb2Ygb2JqLmNsb25lID09PSAnZnVuY3Rpb24nICYmXHJcbiAgICAgICAgICAgICAgICggKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdjbG9uZScpKSB8fCBvYmouaGFzT3duUHJvcGVydHkoJ2Nsb25lJykgKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmlmIChDQ19URVNUKSB7XHJcbiAgICAvLyBlZGl0b3IgbW9ja3MgdXNpbmcgaW4gdW5pdCB0ZXN0c1xyXG4gICAgaWYgKHR5cGVvZiBFZGl0b3IgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgd2luZG93LkVkaXRvciA9IHtcclxuICAgICAgICAgICAgVXVpZFV0aWxzOiB7XHJcbiAgICAgICAgICAgICAgICBOb25VdWlkTWFyazogJy4nLFxyXG4gICAgICAgICAgICAgICAgdXVpZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArICgobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9