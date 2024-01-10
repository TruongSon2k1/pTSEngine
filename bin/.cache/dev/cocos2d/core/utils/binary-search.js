
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/binary-search.js';
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
var EPSILON = 1e-6;
/**
 * Searches the entire sorted Array for an element and returns the index of the element.
 *
 * @method binarySearch
 * @param {number[]} array
 * @param {number} value
 * @return {number} The index of item in the sorted Array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of array's length.
 */
// function binarySearch (array, value) {
//     for (var l = 0, h = array.length - 1, m = h >>> 1;
//          l <= h;
//          m = (l + h) >>> 1
//     ) {
//         var test = array[m];
//         if (test > value) {
//             h = m - 1;
//         }
//         else if (test < value) {
//             l = m + 1;
//         }
//         else {
//             return m;
//         }
//     }
//     return ~l;
// }

/**
 * Searches the entire sorted Array for an element and returns the index of the element.
 * It accepts iteratee which is invoked for value and each element of array to compute their sort ranking.
 * The iteratee is invoked with one argument: (value).
 *
 * @method binarySearchBy
 * @param {number[]} array
 * @param {number} value
 * @param {function} iteratee - the iteratee invoked per element
 * @return {number} The index of item in the sorted Array, if item is found; otherwise, a negative number that is the bitwise complement of the index of the next element that is larger than item or, if there is no larger element, the bitwise complement of array's length.
 */
// function binarySearchBy (array, value, iteratee) {
//     for (var l = 0, h = array.length - 1, m = h >>> 1;
//          l <= h;
//          m = (l + h) >>> 1
//     ) {
//         var test = iteratee(array[m]);
//         if (test > value) {
//             h = m - 1;
//         }
//         else if (test < value) {
//             l = m + 1;
//         }
//         else {
//             return m;
//         }
//     }
//     return ~l;
// }

function binarySearchEpsilon(array, value) {
  for (var l = 0, h = array.length - 1, m = h >>> 1; l <= h; m = l + h >>> 1) {
    var test = array[m];

    if (test > value + EPSILON) {
      h = m - 1;
    } else if (test < value - EPSILON) {
      l = m + 1;
    } else {
      return m;
    }
  }

  return ~l;
}

module.exports = {
  binarySearchEpsilon: binarySearchEpsilon
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxiaW5hcnktc2VhcmNoLmpzIl0sIm5hbWVzIjpbIkVQU0lMT04iLCJiaW5hcnlTZWFyY2hFcHNpbG9uIiwiYXJyYXkiLCJ2YWx1ZSIsImwiLCJoIiwibGVuZ3RoIiwibSIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxPQUFPLEdBQUcsSUFBZDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQyxtQkFBVCxDQUE4QkMsS0FBOUIsRUFBcUNDLEtBQXJDLEVBQTRDO0FBQ3hDLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHSCxLQUFLLENBQUNJLE1BQU4sR0FBZSxDQUE5QixFQUFpQ0MsQ0FBQyxHQUFHRixDQUFDLEtBQUssQ0FBaEQsRUFDS0QsQ0FBQyxJQUFJQyxDQURWLEVBRUtFLENBQUMsR0FBSUgsQ0FBQyxHQUFHQyxDQUFMLEtBQVksQ0FGckIsRUFHRTtBQUNFLFFBQUlHLElBQUksR0FBR04sS0FBSyxDQUFDSyxDQUFELENBQWhCOztBQUNBLFFBQUlDLElBQUksR0FBR0wsS0FBSyxHQUFHSCxPQUFuQixFQUE0QjtBQUN4QkssTUFBQUEsQ0FBQyxHQUFHRSxDQUFDLEdBQUcsQ0FBUjtBQUNILEtBRkQsTUFHSyxJQUFJQyxJQUFJLEdBQUdMLEtBQUssR0FBR0gsT0FBbkIsRUFBNEI7QUFDN0JJLE1BQUFBLENBQUMsR0FBR0csQ0FBQyxHQUFHLENBQVI7QUFDSCxLQUZJLE1BR0E7QUFDRCxhQUFPQSxDQUFQO0FBQ0g7QUFDSjs7QUFDRCxTQUFPLENBQUNILENBQVI7QUFDSDs7QUFHREssTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JULEVBQUFBLG1CQUFtQixFQUFuQkE7QUFEYSxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIEVQU0lMT04gPSAxZS02O1xyXG5cclxuLyoqXHJcbiAqIFNlYXJjaGVzIHRoZSBlbnRpcmUgc29ydGVkIEFycmF5IGZvciBhbiBlbGVtZW50IGFuZCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudC5cclxuICpcclxuICogQG1ldGhvZCBiaW5hcnlTZWFyY2hcclxuICogQHBhcmFtIHtudW1iZXJbXX0gYXJyYXlcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGluZGV4IG9mIGl0ZW0gaW4gdGhlIHNvcnRlZCBBcnJheSwgaWYgaXRlbSBpcyBmb3VuZDsgb3RoZXJ3aXNlLCBhIG5lZ2F0aXZlIG51bWJlciB0aGF0IGlzIHRoZSBiaXR3aXNlIGNvbXBsZW1lbnQgb2YgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGVsZW1lbnQgdGhhdCBpcyBsYXJnZXIgdGhhbiBpdGVtIG9yLCBpZiB0aGVyZSBpcyBubyBsYXJnZXIgZWxlbWVudCwgdGhlIGJpdHdpc2UgY29tcGxlbWVudCBvZiBhcnJheSdzIGxlbmd0aC5cclxuICovXHJcbi8vIGZ1bmN0aW9uIGJpbmFyeVNlYXJjaCAoYXJyYXksIHZhbHVlKSB7XHJcbi8vICAgICBmb3IgKHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0gPSBoID4+PiAxO1xyXG4vLyAgICAgICAgICBsIDw9IGg7XHJcbi8vICAgICAgICAgIG0gPSAobCArIGgpID4+PiAxXHJcbi8vICAgICApIHtcclxuLy8gICAgICAgICB2YXIgdGVzdCA9IGFycmF5W21dO1xyXG4vLyAgICAgICAgIGlmICh0ZXN0ID4gdmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgaCA9IG0gLSAxO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBlbHNlIGlmICh0ZXN0IDwgdmFsdWUpIHtcclxuLy8gICAgICAgICAgICAgbCA9IG0gKyAxO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBlbHNlIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIG07XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIH5sO1xyXG4vLyB9XHJcblxyXG4vKipcclxuICogU2VhcmNoZXMgdGhlIGVudGlyZSBzb3J0ZWQgQXJyYXkgZm9yIGFuIGVsZW1lbnQgYW5kIHJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50LlxyXG4gKiBJdCBhY2NlcHRzIGl0ZXJhdGVlIHdoaWNoIGlzIGludm9rZWQgZm9yIHZhbHVlIGFuZCBlYWNoIGVsZW1lbnQgb2YgYXJyYXkgdG8gY29tcHV0ZSB0aGVpciBzb3J0IHJhbmtpbmcuXHJcbiAqIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OiAodmFsdWUpLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGJpbmFyeVNlYXJjaEJ5XHJcbiAqIEBwYXJhbSB7bnVtYmVyW119IGFycmF5XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpdGVyYXRlZSAtIHRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBlbGVtZW50XHJcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGluZGV4IG9mIGl0ZW0gaW4gdGhlIHNvcnRlZCBBcnJheSwgaWYgaXRlbSBpcyBmb3VuZDsgb3RoZXJ3aXNlLCBhIG5lZ2F0aXZlIG51bWJlciB0aGF0IGlzIHRoZSBiaXR3aXNlIGNvbXBsZW1lbnQgb2YgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGVsZW1lbnQgdGhhdCBpcyBsYXJnZXIgdGhhbiBpdGVtIG9yLCBpZiB0aGVyZSBpcyBubyBsYXJnZXIgZWxlbWVudCwgdGhlIGJpdHdpc2UgY29tcGxlbWVudCBvZiBhcnJheSdzIGxlbmd0aC5cclxuICovXHJcbi8vIGZ1bmN0aW9uIGJpbmFyeVNlYXJjaEJ5IChhcnJheSwgdmFsdWUsIGl0ZXJhdGVlKSB7XHJcbi8vICAgICBmb3IgKHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0gPSBoID4+PiAxO1xyXG4vLyAgICAgICAgICBsIDw9IGg7XHJcbi8vICAgICAgICAgIG0gPSAobCArIGgpID4+PiAxXHJcbi8vICAgICApIHtcclxuLy8gICAgICAgICB2YXIgdGVzdCA9IGl0ZXJhdGVlKGFycmF5W21dKTtcclxuLy8gICAgICAgICBpZiAodGVzdCA+IHZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgIGggPSBtIC0gMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSBpZiAodGVzdCA8IHZhbHVlKSB7XHJcbi8vICAgICAgICAgICAgIGwgPSBtICsgMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiBtO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiB+bDtcclxuLy8gfVxyXG5cclxuZnVuY3Rpb24gYmluYXJ5U2VhcmNoRXBzaWxvbiAoYXJyYXksIHZhbHVlKSB7XHJcbiAgICBmb3IgKHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0gPSBoID4+PiAxO1xyXG4gICAgICAgICBsIDw9IGg7XHJcbiAgICAgICAgIG0gPSAobCArIGgpID4+PiAxXHJcbiAgICApIHtcclxuICAgICAgICB2YXIgdGVzdCA9IGFycmF5W21dO1xyXG4gICAgICAgIGlmICh0ZXN0ID4gdmFsdWUgKyBFUFNJTE9OKSB7XHJcbiAgICAgICAgICAgIGggPSBtIC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGVzdCA8IHZhbHVlIC0gRVBTSUxPTikge1xyXG4gICAgICAgICAgICBsID0gbSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gfmw7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGJpbmFyeVNlYXJjaEVwc2lsb25cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=