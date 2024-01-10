
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.equals = equals;
exports.approx = approx;
exports.clamp = clamp;
exports.clamp01 = clamp01;
exports.lerp = lerp;
exports.toRadian = toRadian;
exports.toDegree = toDegree;
exports.randomRange = randomRange;
exports.randomRangeInt = randomRangeInt;
exports.pseudoRandom = pseudoRandom;
exports.pseudoRandomRange = pseudoRandomRange;
exports.pseudoRandomRangeInt = pseudoRandomRangeInt;
exports.nextPow2 = nextPow2;
exports.repeat = repeat;
exports.pingPong = pingPong;
exports.inverseLerp = inverseLerp;
exports.sign = sign;
exports.random = exports.FLOAT_BYTES = exports.FLOAT_ARRAY_TYPE = exports.INT_MIN = exports.INT_MAX = exports.INT_BITS = exports.EPSILON = void 0;

/**
 * @ignore
 */
var _d2r = Math.PI / 180.0;
/**
 * @ignore
 */


var _r2d = 180.0 / Math.PI;
/**
 * @property {number} EPSILON
 */


var EPSILON = 0.000001; // Number of bits in an integer

exports.EPSILON = EPSILON;
var INT_BITS = 32;
exports.INT_BITS = INT_BITS;
var INT_MAX = 0x7fffffff;
exports.INT_MAX = INT_MAX;
var INT_MIN = -1 << INT_BITS - 1;
/**
 * Use single-precision floating point on native platforms to be compatible with native math libraries.
 * Double precision floating point is used on Web platforms and editors to reduce the overhead of type conversion.
 */

exports.INT_MIN = INT_MIN;
var FLOAT_ARRAY_TYPE = CC_JSB && CC_NATIVERENDERER ? Float32Array : Float64Array;
exports.FLOAT_ARRAY_TYPE = FLOAT_ARRAY_TYPE;
var FLOAT_BYTES = CC_JSB && CC_NATIVERENDERER ? 4 : 8;
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

exports.FLOAT_BYTES = FLOAT_BYTES;

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
/**
 * Tests whether or not the arguments have approximately the same value by given maxDiff
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @param {Number} maxDiff Maximum difference.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */


function approx(a, b, maxDiff) {
  maxDiff = maxDiff || EPSILON;
  return Math.abs(a - b) <= maxDiff;
}
/**
 * Clamps a value between a minimum float and maximum float value.
 *
 * @method clamp
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @return {number}
 */


function clamp(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
/**
 * Clamps a value between 0 and 1.
 *
 * @method clamp01
 * @param {number} val
 * @return {number}
 */


function clamp01(val) {
  return val < 0 ? 0 : val > 1 ? 1 : val;
}
/**
 * @method lerp
 * @param {number} from
 * @param {number} to
 * @param {number} ratio - the interpolation coefficient
 * @return {number}
 */


function lerp(from, to, ratio) {
  return from + (to - from) * ratio;
}
/**
* Convert Degree To Radian
*
* @param {Number} a Angle in Degrees
*/


function toRadian(a) {
  return a * _d2r;
}
/**
* Convert Radian To Degree
*
* @param {Number} a Angle in Radian
*/


function toDegree(a) {
  return a * _r2d;
}
/**
* @method random
*/


var random = Math.random;
/**
 * Returns a floating-point random number between min (inclusive) and max (exclusive).
 *
 * @method randomRange
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */

exports.random = random;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 *
 * @method randomRangeInt
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */


function randomRangeInt(min, max) {
  return Math.floor(randomRange(min, max));
}
/**
 * Linear congruential generator using Hull-Dobell Theorem.
 *
 * @method pseudoRandom
 * @param {number} seed the random seed
 * @return {number} the pseudo random
 */


function pseudoRandom(seed) {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280.0;
}
/**
 * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRange
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random number
 */


function pseudoRandomRange(seed, min, max) {
  return pseudoRandom(seed) * (max - min) + min;
}
/**
 * Returns a pseudo-random integer between min (inclusive) and max (exclusive).
 *
 * @method pseudoRandomRangeInt
 * @param {number} seed
 * @param {number} min
 * @param {number} max
 * @return {number} the random integer
 */


function pseudoRandomRangeInt(seed, min, max) {
  return Math.floor(pseudoRandomRange(seed, min, max));
}
/**
 * Returns the next power of two for the value
 *
 * @method nextPow2
 * @param {number} val
 * @return {number} the the next power of two
 */


function nextPow2(val) {
  --val;
  val = val >> 1 | val;
  val = val >> 2 | val;
  val = val >> 4 | val;
  val = val >> 8 | val;
  val = val >> 16 | val;
  ++val;
  return val;
}
/**
 * Returns float remainder for t / length
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */


function repeat(t, length) {
  return t - Math.floor(t / length) * length;
}
/**
 * Returns time wrapped in ping-pong mode
 *
 * @method repeat
 * @param {number} t time start at 0
 * @param {number} length time of one cycle
 * @return {number} the time wrapped in the first cycle
 */


function pingPong(t, length) {
  t = repeat(t, length * 2);
  t = length - Math.abs(t - length);
  return t;
}
/**
 * Returns ratio of a value within a given range
 *
 * @method repeat
 * @param {number} from start value
 * @param {number} to end value
 * @param {number} value given value
 * @return {number} the ratio between [from,to]
 */


function inverseLerp(from, to, value) {
  return (value - from) / (to - from);
}
/**
 * Returns -1, 0, +1 depending on sign of x.
 * 
 * @method sign
 * @param {number} v
 */


function sign(v) {
  return (v > 0) - (v < 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx1dGlscy50cyJdLCJuYW1lcyI6WyJfZDJyIiwiTWF0aCIsIlBJIiwiX3IyZCIsIkVQU0lMT04iLCJJTlRfQklUUyIsIklOVF9NQVgiLCJJTlRfTUlOIiwiRkxPQVRfQVJSQVlfVFlQRSIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiRmxvYXQzMkFycmF5IiwiRmxvYXQ2NEFycmF5IiwiRkxPQVRfQllURVMiLCJlcXVhbHMiLCJhIiwiYiIsImFicyIsIm1heCIsImFwcHJveCIsIm1heERpZmYiLCJjbGFtcCIsInZhbCIsIm1pbiIsImNsYW1wMDEiLCJsZXJwIiwiZnJvbSIsInRvIiwicmF0aW8iLCJ0b1JhZGlhbiIsInRvRGVncmVlIiwicmFuZG9tIiwicmFuZG9tUmFuZ2UiLCJyYW5kb21SYW5nZUludCIsImZsb29yIiwicHNldWRvUmFuZG9tIiwic2VlZCIsInBzZXVkb1JhbmRvbVJhbmdlIiwicHNldWRvUmFuZG9tUmFuZ2VJbnQiLCJuZXh0UG93MiIsInJlcGVhdCIsInQiLCJsZW5ndGgiLCJwaW5nUG9uZyIsImludmVyc2VMZXJwIiwidmFsdWUiLCJzaWduIiwidiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsSUFBSSxHQUFHQyxJQUFJLENBQUNDLEVBQUwsR0FBVSxLQUF2QjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHLFFBQVFGLElBQUksQ0FBQ0MsRUFBMUI7QUFFQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1FLE9BQU8sR0FBRyxRQUFoQixFQUVQOzs7QUFDTyxJQUFNQyxRQUFRLEdBQUcsRUFBakI7O0FBQ0EsSUFBTUMsT0FBTyxHQUFHLFVBQWhCOztBQUNBLElBQU1DLE9BQU8sR0FBRyxDQUFDLENBQUQsSUFBT0YsUUFBUSxHQUFHLENBQWxDO0FBRVA7QUFD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QUFDQTtBQUNBOzs7QUFDTyxTQUFTa0IsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ2hDLFNBQU9ELENBQUMsR0FBR3hDLElBQUksQ0FBQ2lDLEtBQUwsQ0FBV08sQ0FBQyxHQUFHQyxNQUFmLElBQXlCQSxNQUFwQztBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ08sU0FBU0MsUUFBVCxDQUFrQkYsQ0FBbEIsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQ2xDRCxFQUFBQSxDQUFDLEdBQUdELE1BQU0sQ0FBQ0MsQ0FBRCxFQUFJQyxNQUFNLEdBQUcsQ0FBYixDQUFWO0FBQ0FELEVBQUFBLENBQUMsR0FBR0MsTUFBTSxHQUFHekMsSUFBSSxDQUFDZ0IsR0FBTCxDQUFTd0IsQ0FBQyxHQUFHQyxNQUFiLENBQWI7QUFDQSxTQUFPRCxDQUFQO0FBQ0Q7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLFNBQVNHLFdBQVQsQ0FBcUJsQixJQUFyQixFQUEyQkMsRUFBM0IsRUFBK0JrQixLQUEvQixFQUFzQztBQUMzQyxTQUFPLENBQUNBLEtBQUssR0FBR25CLElBQVQsS0FBa0JDLEVBQUUsR0FBR0QsSUFBdkIsQ0FBUDtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxTQUFTb0IsSUFBVCxDQUFlQyxDQUFmLEVBQWtCO0FBQ3ZCLFNBQU8sQ0FBQ0EsQ0FBQyxHQUFHLENBQUwsS0FBV0EsQ0FBQyxHQUFHLENBQWYsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBpZ25vcmVcclxuICovXHJcbmNvbnN0IF9kMnIgPSBNYXRoLlBJIC8gMTgwLjA7XHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5jb25zdCBfcjJkID0gMTgwLjAgLyBNYXRoLlBJO1xyXG5cclxuLyoqXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBFUFNJTE9OXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRVBTSUxPTiA9IDAuMDAwMDAxO1xyXG5cclxuLy8gTnVtYmVyIG9mIGJpdHMgaW4gYW4gaW50ZWdlclxyXG5leHBvcnQgY29uc3QgSU5UX0JJVFMgPSAzMjtcclxuZXhwb3J0IGNvbnN0IElOVF9NQVggPSAweDdmZmZmZmZmO1xyXG5leHBvcnQgY29uc3QgSU5UX01JTiA9IC0xIDw8IChJTlRfQklUUyAtIDEpO1xyXG5cclxuLyoqXHJcbiAqIFVzZSBzaW5nbGUtcHJlY2lzaW9uIGZsb2F0aW5nIHBvaW50IG9uIG5hdGl2ZSBwbGF0Zm9ybXMgdG8gYmUgY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBtYXRoIGxpYnJhcmllcy5cclxuICogRG91YmxlIHByZWNpc2lvbiBmbG9hdGluZyBwb2ludCBpcyB1c2VkIG9uIFdlYiBwbGF0Zm9ybXMgYW5kIGVkaXRvcnMgdG8gcmVkdWNlIHRoZSBvdmVyaGVhZCBvZiB0eXBlIGNvbnZlcnNpb24uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRkxPQVRfQVJSQVlfVFlQRSA9IChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpID8gRmxvYXQzMkFycmF5IDogRmxvYXQ2NEFycmF5O1xyXG5leHBvcnQgY29uc3QgRkxPQVRfQllURVMgPSAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSA/IDQgOiA4O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlLCB3aXRoaW4gYW4gYWJzb2x1dGVcclxuICogb3IgcmVsYXRpdmUgdG9sZXJhbmNlIG9mIGdsTWF0cml4LkVQU0lMT04gKGFuIGFic29sdXRlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciB2YWx1ZXMgbGVzc1xyXG4gKiB0aGFuIG9yIGVxdWFsIHRvIDEuMCwgYW5kIGEgcmVsYXRpdmUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIGxhcmdlciB2YWx1ZXMpXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSBmaXJzdCBudW1iZXIgdG8gdGVzdC5cclxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCBudW1iZXIgdG8gdGVzdC5cclxuICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG51bWJlcnMgYXJlIGFwcHJveGltYXRlbHkgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xyXG4gIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYSksIE1hdGguYWJzKGIpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IHRoZSBhcmd1bWVudHMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIHZhbHVlIGJ5IGdpdmVuIG1heERpZmZcclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxyXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4RGlmZiBNYXhpbXVtIGRpZmZlcmVuY2UuXHJcbiAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwcm94KGEsIGIsIG1heERpZmYpIHtcclxuICBtYXhEaWZmID0gbWF4RGlmZiB8fCBFUFNJTE9OO1xyXG4gIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gbWF4RGlmZjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gYSBtaW5pbXVtIGZsb2F0IGFuZCBtYXhpbXVtIGZsb2F0IHZhbHVlLlxyXG4gKlxyXG4gKiBAbWV0aG9kIGNsYW1wXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcclxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCh2YWwsIG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIHZhbCA8IG1pbiA/IG1pbiA6IHZhbCA+IG1heCA/IG1heCA6IHZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENsYW1wcyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMS5cclxuICpcclxuICogQG1ldGhvZCBjbGFtcDAxXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcclxuICogQHJldHVybiB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEodmFsKSB7XHJcbiAgcmV0dXJuIHZhbCA8IDAgPyAwIDogdmFsID4gMSA/IDEgOiB2YWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAbWV0aG9kIGxlcnBcclxuICogQHBhcmFtIHtudW1iZXJ9IGZyb21cclxuICogQHBhcmFtIHtudW1iZXJ9IHRvXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyAtIHRoZSBpbnRlcnBvbGF0aW9uIGNvZWZmaWNpZW50XHJcbiAqIEByZXR1cm4ge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsZXJwKGZyb20sIHRvLCByYXRpbykge1xyXG4gIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiByYXRpbztcclxufVxyXG5cclxuLyoqXHJcbiogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXHJcbipcclxuKiBAcGFyYW0ge051bWJlcn0gYSBBbmdsZSBpbiBEZWdyZWVzXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1JhZGlhbihhKSB7XHJcbiAgcmV0dXJuIGEgKiBfZDJyO1xyXG59XHJcblxyXG4vKipcclxuKiBDb252ZXJ0IFJhZGlhbiBUbyBEZWdyZWVcclxuKlxyXG4qIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIFJhZGlhblxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9EZWdyZWUoYSkge1xyXG4gIHJldHVybiBhICogX3IyZDtcclxufVxyXG5cclxuLyoqXHJcbiogQG1ldGhvZCByYW5kb21cclxuKi9cclxuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBmbG9hdGluZy1wb2ludCByYW5kb20gbnVtYmVyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSkuXHJcbiAqXHJcbiAqIEBtZXRob2QgcmFuZG9tUmFuZ2VcclxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJhbmRvbSBudW1iZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21SYW5nZShtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cclxuICpcclxuICogQG1ldGhvZCByYW5kb21SYW5nZUludFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmFuZG9tIGludGVnZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21SYW5nZUludChtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKHJhbmRvbVJhbmdlKG1pbiwgbWF4KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaW5lYXIgY29uZ3J1ZW50aWFsIGdlbmVyYXRvciB1c2luZyBIdWxsLURvYmVsbCBUaGVvcmVtLlxyXG4gKlxyXG4gKiBAbWV0aG9kIHBzZXVkb1JhbmRvbVxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlZCB0aGUgcmFuZG9tIHNlZWRcclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcHNldWRvIHJhbmRvbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBzZXVkb1JhbmRvbShzZWVkKSB7XHJcbiAgc2VlZCA9IChzZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcclxuICByZXR1cm4gc2VlZCAvIDIzMzI4MC4wO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGZsb2F0aW5nLXBvaW50IHBzZXVkby1yYW5kb20gbnVtYmVyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGV4Y2x1c2l2ZSkuXHJcbiAqXHJcbiAqIEBtZXRob2QgcHNldWRvUmFuZG9tUmFuZ2VcclxuICogQHBhcmFtIHtudW1iZXJ9IHNlZWRcclxuICogQHBhcmFtIHtudW1iZXJ9IG1pblxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4XHJcbiAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJhbmRvbSBudW1iZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwc2V1ZG9SYW5kb21SYW5nZShzZWVkLCBtaW4sIG1heCkge1xyXG4gIHJldHVybiBwc2V1ZG9SYW5kb20oc2VlZCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBwc2V1ZG8tcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoZXhjbHVzaXZlKS5cclxuICpcclxuICogQG1ldGhvZCBwc2V1ZG9SYW5kb21SYW5nZUludFxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2VlZFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmFuZG9tIGludGVnZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwc2V1ZG9SYW5kb21SYW5nZUludChzZWVkLCBtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKHBzZXVkb1JhbmRvbVJhbmdlKHNlZWQsIG1pbiwgbWF4KSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBuZXh0IHBvd2VyIG9mIHR3byBmb3IgdGhlIHZhbHVlXHJcbiAqXHJcbiAqIEBtZXRob2QgbmV4dFBvdzJcclxuICogQHBhcmFtIHtudW1iZXJ9IHZhbFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSB0aGUgbmV4dCBwb3dlciBvZiB0d29cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXh0UG93Mih2YWwpIHtcclxuICAtLXZhbDtcclxuICB2YWwgPSAodmFsID4+IDEpIHwgdmFsO1xyXG4gIHZhbCA9ICh2YWwgPj4gMikgfCB2YWw7XHJcbiAgdmFsID0gKHZhbCA+PiA0KSB8IHZhbDtcclxuICB2YWwgPSAodmFsID4+IDgpIHwgdmFsO1xyXG4gIHZhbCA9ICh2YWwgPj4gMTYpIHwgdmFsO1xyXG4gICsrdmFsO1xyXG5cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBmbG9hdCByZW1haW5kZXIgZm9yIHQgLyBsZW5ndGhcclxuICpcclxuICogQG1ldGhvZCByZXBlYXRcclxuICogQHBhcmFtIHtudW1iZXJ9IHQgdGltZSBzdGFydCBhdCAwXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggdGltZSBvZiBvbmUgY3ljbGVcclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgdGltZSB3cmFwcGVkIGluIHRoZSBmaXJzdCBjeWNsZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdCh0LCBsZW5ndGgpIHtcclxuICByZXR1cm4gdCAtIE1hdGguZmxvb3IodCAvIGxlbmd0aCkgKiBsZW5ndGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRpbWUgd3JhcHBlZCBpbiBwaW5nLXBvbmcgbW9kZVxyXG4gKlxyXG4gKiBAbWV0aG9kIHJlcGVhdFxyXG4gKiBAcGFyYW0ge251bWJlcn0gdCB0aW1lIHN0YXJ0IGF0IDBcclxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCB0aW1lIG9mIG9uZSBjeWNsZVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSB0aW1lIHdyYXBwZWQgaW4gdGhlIGZpcnN0IGN5Y2xlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGluZ1BvbmcodCwgbGVuZ3RoKSB7XHJcbiAgdCA9IHJlcGVhdCh0LCBsZW5ndGggKiAyKTtcclxuICB0ID0gbGVuZ3RoIC0gTWF0aC5hYnModCAtIGxlbmd0aCk7XHJcbiAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHJhdGlvIG9mIGEgdmFsdWUgd2l0aGluIGEgZ2l2ZW4gcmFuZ2VcclxuICpcclxuICogQG1ldGhvZCByZXBlYXRcclxuICogQHBhcmFtIHtudW1iZXJ9IGZyb20gc3RhcnQgdmFsdWVcclxuICogQHBhcmFtIHtudW1iZXJ9IHRvIGVuZCB2YWx1ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgZ2l2ZW4gdmFsdWVcclxuICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmF0aW8gYmV0d2VlbiBbZnJvbSx0b11cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnNlTGVycChmcm9tLCB0bywgdmFsdWUpIHtcclxuICByZXR1cm4gKHZhbHVlIC0gZnJvbSkgLyAodG8gLSBmcm9tKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgLTEsIDAsICsxIGRlcGVuZGluZyBvbiBzaWduIG9mIHguXHJcbiAqIFxyXG4gKiBAbWV0aG9kIHNpZ25cclxuICogQHBhcmFtIHtudW1iZXJ9IHZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWduICh2KSB7XHJcbiAgcmV0dXJuICh2ID4gMCkgLSAodiA8IDApO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=