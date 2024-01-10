
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/mutable-forward-iterator.js';
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

/**
 * @example
 * var array = [0, 1, 2, 3, 4];
 * var iterator = new cc.js.array.MutableForwardIterator(array);
 * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
 *     var item = array[iterator.i];
 *     ...
 * }
 */
function MutableForwardIterator(array) {
  this.i = 0;
  this.array = array;
}

var proto = MutableForwardIterator.prototype;

proto.remove = function (value) {
  var index = this.array.indexOf(value);

  if (index >= 0) {
    this.removeAt(index);
  }
};

proto.removeAt = function (i) {
  this.array.splice(i, 1);

  if (i <= this.i) {
    --this.i;
  }
};

proto.fastRemove = function (value) {
  var index = this.array.indexOf(value);

  if (index >= 0) {
    this.fastRemoveAt(index);
  }
};

proto.fastRemoveAt = function (i) {
  var array = this.array;
  array[i] = array[array.length - 1];
  --array.length;

  if (i <= this.i) {
    --this.i;
  }
};

proto.push = function (item) {
  this.array.push(item);
}; //js.getset(proto, 'length',
//    function () {
//        return this.array.length;
//    },
//    function (len) {
//        this.array.length = len;
//        if (this.i >= len) {
//            this.i = len - 1;
//        }
//    }
//);


module.exports = MutableForwardIterator;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxtdXRhYmxlLWZvcndhcmQtaXRlcmF0b3IuanMiXSwibmFtZXMiOlsiTXV0YWJsZUZvcndhcmRJdGVyYXRvciIsImFycmF5IiwiaSIsInByb3RvIiwicHJvdG90eXBlIiwicmVtb3ZlIiwidmFsdWUiLCJpbmRleCIsImluZGV4T2YiLCJyZW1vdmVBdCIsInNwbGljZSIsImZhc3RSZW1vdmUiLCJmYXN0UmVtb3ZlQXQiLCJsZW5ndGgiLCJwdXNoIiwiaXRlbSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxzQkFBVCxDQUFpQ0MsS0FBakMsRUFBd0M7QUFDcEMsT0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDQSxPQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7QUFFRCxJQUFJRSxLQUFLLEdBQUdILHNCQUFzQixDQUFDSSxTQUFuQzs7QUFFQUQsS0FBSyxDQUFDRSxNQUFOLEdBQWUsVUFBVUMsS0FBVixFQUFpQjtBQUM1QixNQUFJQyxLQUFLLEdBQUcsS0FBS04sS0FBTCxDQUFXTyxPQUFYLENBQW1CRixLQUFuQixDQUFaOztBQUNBLE1BQUlDLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ1osU0FBS0UsUUFBTCxDQUFjRixLQUFkO0FBQ0g7QUFDSixDQUxEOztBQU1BSixLQUFLLENBQUNNLFFBQU4sR0FBaUIsVUFBVVAsQ0FBVixFQUFhO0FBQzFCLE9BQUtELEtBQUwsQ0FBV1MsTUFBWCxDQUFrQlIsQ0FBbEIsRUFBcUIsQ0FBckI7O0FBRUEsTUFBSUEsQ0FBQyxJQUFJLEtBQUtBLENBQWQsRUFBaUI7QUFDYixNQUFFLEtBQUtBLENBQVA7QUFDSDtBQUNKLENBTkQ7O0FBT0FDLEtBQUssQ0FBQ1EsVUFBTixHQUFtQixVQUFVTCxLQUFWLEVBQWlCO0FBQ2hDLE1BQUlDLEtBQUssR0FBRyxLQUFLTixLQUFMLENBQVdPLE9BQVgsQ0FBbUJGLEtBQW5CLENBQVo7O0FBQ0EsTUFBSUMsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixTQUFLSyxZQUFMLENBQWtCTCxLQUFsQjtBQUNIO0FBQ0osQ0FMRDs7QUFNQUosS0FBSyxDQUFDUyxZQUFOLEdBQXFCLFVBQVVWLENBQVYsRUFBYTtBQUM5QixNQUFJRCxLQUFLLEdBQUcsS0FBS0EsS0FBakI7QUFDQUEsRUFBQUEsS0FBSyxDQUFDQyxDQUFELENBQUwsR0FBV0QsS0FBSyxDQUFDQSxLQUFLLENBQUNZLE1BQU4sR0FBZSxDQUFoQixDQUFoQjtBQUNBLElBQUVaLEtBQUssQ0FBQ1ksTUFBUjs7QUFFQSxNQUFJWCxDQUFDLElBQUksS0FBS0EsQ0FBZCxFQUFpQjtBQUNiLE1BQUUsS0FBS0EsQ0FBUDtBQUNIO0FBQ0osQ0FSRDs7QUFVQUMsS0FBSyxDQUFDVyxJQUFOLEdBQWEsVUFBVUMsSUFBVixFQUFnQjtBQUN6QixPQUFLZCxLQUFMLENBQVdhLElBQVgsQ0FBZ0JDLElBQWhCO0FBQ0gsQ0FGRCxFQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqQixzQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYXJyYXkgPSBbMCwgMSwgMiwgMywgNF07XHJcbiAqIHZhciBpdGVyYXRvciA9IG5ldyBjYy5qcy5hcnJheS5NdXRhYmxlRm9yd2FyZEl0ZXJhdG9yKGFycmF5KTtcclxuICogZm9yIChpdGVyYXRvci5pID0gMDsgaXRlcmF0b3IuaSA8IGFycmF5Lmxlbmd0aDsgKytpdGVyYXRvci5pKSB7XHJcbiAqICAgICB2YXIgaXRlbSA9IGFycmF5W2l0ZXJhdG9yLmldO1xyXG4gKiAgICAgLi4uXHJcbiAqIH1cclxuICovXHJcbmZ1bmN0aW9uIE11dGFibGVGb3J3YXJkSXRlcmF0b3IgKGFycmF5KSB7XHJcbiAgICB0aGlzLmkgPSAwO1xyXG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xyXG59XHJcblxyXG52YXIgcHJvdG8gPSBNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yLnByb3RvdHlwZTtcclxuXHJcbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdmFyIGluZGV4ID0gdGhpcy5hcnJheS5pbmRleE9mKHZhbHVlKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBdChpbmRleCk7XHJcbiAgICB9XHJcbn07XHJcbnByb3RvLnJlbW92ZUF0ID0gZnVuY3Rpb24gKGkpIHtcclxuICAgIHRoaXMuYXJyYXkuc3BsaWNlKGksIDEpO1xyXG5cclxuICAgIGlmIChpIDw9IHRoaXMuaSkge1xyXG4gICAgICAgIC0tdGhpcy5pO1xyXG4gICAgfVxyXG59O1xyXG5wcm90by5mYXN0UmVtb3ZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmFycmF5LmluZGV4T2YodmFsdWUpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICB0aGlzLmZhc3RSZW1vdmVBdChpbmRleCk7XHJcbiAgICB9XHJcbn07XHJcbnByb3RvLmZhc3RSZW1vdmVBdCA9IGZ1bmN0aW9uIChpKSB7XHJcbiAgICB2YXIgYXJyYXkgPSB0aGlzLmFycmF5O1xyXG4gICAgYXJyYXlbaV0gPSBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcclxuICAgIC0tYXJyYXkubGVuZ3RoO1xyXG5cclxuICAgIGlmIChpIDw9IHRoaXMuaSkge1xyXG4gICAgICAgIC0tdGhpcy5pO1xyXG4gICAgfVxyXG59O1xyXG5cclxucHJvdG8ucHVzaCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICB0aGlzLmFycmF5LnB1c2goaXRlbSk7XHJcbn07XHJcblxyXG4vL2pzLmdldHNldChwcm90bywgJ2xlbmd0aCcsXHJcbi8vICAgIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgIHJldHVybiB0aGlzLmFycmF5Lmxlbmd0aDtcclxuLy8gICAgfSxcclxuLy8gICAgZnVuY3Rpb24gKGxlbikge1xyXG4vLyAgICAgICAgdGhpcy5hcnJheS5sZW5ndGggPSBsZW47XHJcbi8vICAgICAgICBpZiAodGhpcy5pID49IGxlbikge1xyXG4vLyAgICAgICAgICAgIHRoaXMuaSA9IGxlbiAtIDE7XHJcbi8vICAgICAgICB9XHJcbi8vICAgIH1cclxuLy8pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==