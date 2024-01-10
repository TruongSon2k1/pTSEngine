
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/utils/array-collision-matrix.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.ArrayCollisionMatrix = void 0;

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
 * Collision "matrix". It's actually a triangular-shaped array of whether two bodies are touching this step, for reference next step
 */
var ArrayCollisionMatrix = /*#__PURE__*/function () {
  function ArrayCollisionMatrix() {
    this.matrix = [];
  }

  var _proto = ArrayCollisionMatrix.prototype;

  /**
   * !#en Get an element
   * @method get
   * @param  {Number} i
   * @param  {Number} j
   * @return {Number}
   */
  _proto.get = function get(i, j) {
    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    return this.matrix[(i * (i + 1) >> 1) + j - 1];
  }
  /**
   * !#en Set an element
   * @method set
   * @param {Number} i
   * @param {Number} j
   * @param {boolean} value
   */
  ;

  _proto.set = function set(i, j, value) {
    if (j > i) {
      var temp = j;
      j = i;
      i = temp;
    }

    this.matrix[(i * (i + 1) >> 1) + j - 1] = value ? 1 : 0;
  }
  /**
   * !#en Sets all elements to zero
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    for (var i = 0, l = this.matrix.length; i !== l; i++) {
      this.matrix[i] = 0;
    }
  }
  /**
   * !#en Sets the max number of objects
   * @param {Number} n
   */
  ;

  _proto.setNumObjects = function setNumObjects(n) {
    this.matrix.length = n * (n - 1) >> 1;
  };

  return ArrayCollisionMatrix;
}();

exports.ArrayCollisionMatrix = ArrayCollisionMatrix;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjb2Nvc1xcdXRpbHNcXGFycmF5LWNvbGxpc2lvbi1tYXRyaXgudHMiXSwibmFtZXMiOlsiQXJyYXlDb2xsaXNpb25NYXRyaXgiLCJtYXRyaXgiLCJnZXQiLCJpIiwiaiIsInRlbXAiLCJzZXQiLCJ2YWx1ZSIsInJlc2V0IiwibCIsImxlbmd0aCIsInNldE51bU9iamVjdHMiLCJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtJQUNhQTs7U0FPRkMsU0FBbUI7Ozs7O0FBRTFCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO1NBQ1dDLE1BQVAsYUFBWUMsQ0FBWixFQUF1QkMsQ0FBdkIsRUFBMEM7QUFDdEMsUUFBSUEsQ0FBQyxHQUFHRCxDQUFSLEVBQVc7QUFDUCxVQUFNRSxJQUFJLEdBQUdELENBQWI7QUFDQUEsTUFBQUEsQ0FBQyxHQUFHRCxDQUFKO0FBQ0FBLE1BQUFBLENBQUMsR0FBR0UsSUFBSjtBQUNIOztBQUNELFdBQU8sS0FBS0osTUFBTCxDQUFZLENBQUNFLENBQUMsSUFBSUEsQ0FBQyxHQUFHLENBQVIsQ0FBRCxJQUFlLENBQWhCLElBQXFCQyxDQUFyQixHQUF5QixDQUFyQyxDQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dFLE1BQVAsYUFBWUgsQ0FBWixFQUF1QkMsQ0FBdkIsRUFBa0NHLEtBQWxDLEVBQWtEO0FBQzlDLFFBQUlILENBQUMsR0FBR0QsQ0FBUixFQUFXO0FBQ1AsVUFBTUUsSUFBSSxHQUFHRCxDQUFiO0FBQ0FBLE1BQUFBLENBQUMsR0FBR0QsQ0FBSjtBQUNBQSxNQUFBQSxDQUFDLEdBQUdFLElBQUo7QUFDSDs7QUFDRCxTQUFLSixNQUFMLENBQVksQ0FBQ0UsQ0FBQyxJQUFJQSxDQUFDLEdBQUcsQ0FBUixDQUFELElBQWUsQ0FBaEIsSUFBcUJDLENBQXJCLEdBQXlCLENBQXJDLElBQTBDRyxLQUFLLEdBQUcsQ0FBSCxHQUFPLENBQXREO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTs7O1NBQ1dDLFFBQVAsaUJBQWdCO0FBQ1osU0FBSyxJQUFJTCxDQUFDLEdBQUcsQ0FBUixFQUFXTSxDQUFDLEdBQUcsS0FBS1IsTUFBTCxDQUFZUyxNQUFoQyxFQUF3Q1AsQ0FBQyxLQUFLTSxDQUE5QyxFQUFpRE4sQ0FBQyxFQUFsRCxFQUFzRDtBQUNsRCxXQUFLRixNQUFMLENBQVlFLENBQVosSUFBaUIsQ0FBakI7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7OztTQUNXUSxnQkFBUCx1QkFBc0JDLENBQXRCLEVBQWlDO0FBQzdCLFNBQUtYLE1BQUwsQ0FBWVMsTUFBWixHQUFxQkUsQ0FBQyxJQUFJQSxDQUFDLEdBQUcsQ0FBUixDQUFELElBQWUsQ0FBcEM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBDb2xsaXNpb24gXCJtYXRyaXhcIi4gSXQncyBhY3R1YWxseSBhIHRyaWFuZ3VsYXItc2hhcGVkIGFycmF5IG9mIHdoZXRoZXIgdHdvIGJvZGllcyBhcmUgdG91Y2hpbmcgdGhpcyBzdGVwLCBmb3IgcmVmZXJlbmNlIG5leHQgc3RlcFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEFycmF5Q29sbGlzaW9uTWF0cml4IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG1hdHJpeCBzdG9yYWdlXHJcbiAgICAgKiBAcHJvcGVydHkgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtYXRyaXg6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhbiBlbGVtZW50XHJcbiAgICAgKiBAbWV0aG9kIGdldFxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBpXHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGpcclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCAoaTogbnVtYmVyLCBqOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChqID4gaSkge1xyXG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gajtcclxuICAgICAgICAgICAgaiA9IGk7XHJcbiAgICAgICAgICAgIGkgPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRyaXhbKGkgKiAoaSArIDEpID4+IDEpICsgaiAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgYW4gZWxlbWVudFxyXG4gICAgICogQG1ldGhvZCBzZXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0galxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IChpOiBudW1iZXIsIGo6IG51bWJlciwgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaiA+IGkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcCA9IGo7XHJcbiAgICAgICAgICAgIGogPSBpO1xyXG4gICAgICAgICAgICBpID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXRyaXhbKGkgKiAoaSArIDEpID4+IDEpICsgaiAtIDFdID0gdmFsdWUgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyBhbGwgZWxlbWVudHMgdG8gemVyb1xyXG4gICAgICogQG1ldGhvZCByZXNldFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXQgKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5tYXRyaXgubGVuZ3RoOyBpICE9PSBsOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRyaXhbaV0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgbWF4IG51bWJlciBvZiBvYmplY3RzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TnVtT2JqZWN0cyAobjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tYXRyaXgubGVuZ3RoID0gbiAqIChuIC0gMSkgPj4gMTtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=