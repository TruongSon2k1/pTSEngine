
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/easing.js';
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

/**
 * @module cc
 */

/**
 * !#en
 * This class provide easing methods for {{#crossLink "tween"}}{{/crossLink}} class.<br>
 * Demonstratio: https://easings.net/
 * !#zh
 * 缓动函数类，为 {{#crossLink "Tween"}}{{/crossLink}} 提供缓动效果函数。<br>
 * 函数效果演示： https://easings.net/
 * @class Easing
 */
var easing = {
  constant: function constant() {
    return 0;
  },
  linear: function linear(k) {
    return k;
  },
  // quad
  //  easing equation function for a quadratic (t^2)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in with quadratic formula. From slow to fast.
   * !#zh 平方曲线缓入函数。运动由慢到快。
   * @method quadIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value
   */
  quadIn: function quadIn(k) {
    return k * k;
  },

  /**
   * !#en Easing out with quadratic formula. From fast to slow.
   * !#zh 平方曲线缓出函数。运动由快到慢。
   * @method quadOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value
   */
  quadOut: function quadOut(k) {
    return k * (2 - k);
  },

  /**
   * !#en Easing in and out with quadratic formula. From slow to fast, then back to slow.
   * !#zh 平方曲线缓入缓出函数。运动由慢到快再到慢。
   * @method quadInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value
   */
  quadInOut: function quadInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  // cubic
  //  easing equation function for a cubic (t^3)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in with cubic formula. From slow to fast.
   * !#zh 立方曲线缓入函数。运动由慢到快。
   * @method cubicIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  cubicIn: function cubicIn(k) {
    return k * k * k;
  },

  /**
   * !#en Easing out with cubic formula. From slow to fast.
   * !#zh 立方曲线缓出函数。运动由快到慢。
   * @method cubicOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  cubicOut: function cubicOut(k) {
    return --k * k * k + 1;
  },

  /**
   * !#en Easing in and out with cubic formula. From slow to fast, then back to slow.
   * !#zh 立方曲线缓入缓出函数。运动由慢到快再到慢。
   * @method cubicInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  cubicInOut: function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  // quart
  //  easing equation function for a quartic (t^4)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in with quartic formula. From slow to fast.
   * !#zh 四次方曲线缓入函数。运动由慢到快。
   * @method quartIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quartIn: function quartIn(k) {
    return k * k * k * k;
  },

  /**
   * !#en Easing out with quartic formula. From fast to slow.
   * !#zh 四次方曲线缓出函数。运动由快到慢。
   * @method quartOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quartOut: function quartOut(k) {
    return 1 - --k * k * k * k;
  },

  /**
   * !#en Easing in and out with quartic formula. From slow to fast, then back to slow.
   * !#zh 四次方曲线缓入缓出函数。运动由慢到快再到慢。
   * @method quartInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quartInOut: function quartInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k;
    }

    return -0.5 * ((k -= 2) * k * k * k - 2);
  },
  // quint
  //  easing equation function for a quintic (t^5)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in with quintic formula. From slow to fast.
   * !#zh 五次方曲线缓入函数。运动由慢到快。
   * @method quintIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quintIn: function quintIn(k) {
    return k * k * k * k * k;
  },

  /**
   * !#en Easing out with quintic formula. From fast to slow.
   * !#zh 五次方曲线缓出函数。运动由快到慢。
   * @method quintOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quintOut: function quintOut(k) {
    return --k * k * k * k * k + 1;
  },

  /**
   * !#en Easing in and out with quintic formula. From slow to fast, then back to slow.
   * !#zh 五次方曲线缓入缓出函数。运动由慢到快再到慢。
   * @method quintInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  quintInOut: function quintInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k * k * k + 2);
  },
  // sine
  //  easing equation function for a sinusoidal (sin(t))
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in and out with sine formula. From slow to fast.
   * !#zh 正弦曲线缓入函数。运动由慢到快。
   * @method sineIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  sineIn: function sineIn(k) {
    return 1 - Math.cos(k * Math.PI / 2);
  },

  /**
   * !#en Easing in and out with sine formula. From fast to slow.
   * !#zh 正弦曲线缓出函数。运动由快到慢。
   * @method sineOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  sineOut: function sineOut(k) {
    return Math.sin(k * Math.PI / 2);
  },

  /**
   * !#en Easing in and out with sine formula. From slow to fast, then back to slow.
   * !#zh 正弦曲线缓入缓出函数。运动由慢到快再到慢。
   * @method sineInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  sineInOut: function sineInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  },
  // expo
  //  easing equation function for an exponential (2^t)
  //  param t: Current time (in frames or seconds).
  //  return: The correct value.

  /**
   * !#en Easing in and out with exponential formula. From slow to fast.
   * !#zh 指数曲线缓入函数。运动由慢到快。
   * @method expoIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  expoIn: function expoIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
  },

  /**
   * !#en Easing in and out with exponential formula. From fast to slow.
   * !#zh 指数曲线缓出函数。运动由快到慢。
   * @method expoOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  expoOut: function expoOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  },

  /**
   * !#en Easing in and out with exponential formula. From slow to fast.
   * !#zh 指数曲线缓入和缓出函数。运动由慢到很快再到慢。
   * @method expoInOut
   * @param {Number} t The current time as a percentage of the total time, then back to slow.
   * @return {Number} The correct value.
   */
  expoInOut: function expoInOut(k) {
    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if ((k *= 2) < 1) {
      return 0.5 * Math.pow(1024, k - 1);
    }

    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
  },
  // circ
  //  easing equation function for a circular (sqrt(1-t^2))
  //  @param t: Current time (in frames or seconds).
  //  @return:	The correct value.

  /**
   * !#en Easing in and out with circular formula. From slow to fast.
   * !#zh 循环公式缓入函数。运动由慢到快。
   * @method circIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  circIn: function circIn(k) {
    return 1 - Math.sqrt(1 - k * k);
  },

  /**
   * !#en Easing in and out with circular formula. From fast to slow.
   * !#zh 循环公式缓出函数。运动由快到慢。
   * @method circOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  circOut: function circOut(k) {
    return Math.sqrt(1 - --k * k);
  },

  /**
   * !#en Easing in and out with circular formula. From slow to fast.
   * !#zh 指数曲线缓入缓出函数。运动由慢到很快再到慢。
   * @method circInOut
   * @param {Number} t The current time as a percentage of the total time, then back to slow.
   * @return {Number} The correct value.
   */
  circInOut: function circInOut(k) {
    if ((k *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }

    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
  },
  // elastic
  //  easing equation function for an elastic (exponentially decaying sine wave)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.
  //  recommand value: elastic (t)

  /**
   * !#en Easing in action with a spring oscillating effect.
   * !#zh 弹簧回震效果的缓入函数。
   * @method elasticIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  elasticIn: function elasticIn(k) {
    var s,
        a = 0.1,
        p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },

  /**
   * !#en Easing out action with a spring oscillating effect.
   * !#zh 弹簧回震效果的缓出函数。
   * @method elasticOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  elasticOut: function elasticOut(k) {
    var s,
        a = 0.1,
        p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },

  /**
   * !#en Easing in and out action with a spring oscillating effect.
   * !#zh 弹簧回震效果的缓入缓出函数。
   * @method elasticInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  elasticInOut: function elasticInOut(k) {
    var s,
        a = 0.1,
        p = 0.4;

    if (k === 0) {
      return 0;
    }

    if (k === 1) {
      return 1;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p * Math.asin(1 / a) / (2 * Math.PI);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  // back
  //  easing equation function for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in action with "back up" behavior.
   * !#zh 回退效果的缓入函数。
   * @method backIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  backIn: function backIn(k) {
    var s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },

  /**
   * !#en Easing out action with "back up" behavior.
   * !#zh 回退效果的缓出函数。
   * @method backOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  backOut: function backOut(k) {
    var s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
  },

  /**
   * !#en Easing in and out action with "back up" behavior.
   * !#zh 回退效果的缓入缓出函数。
   * @method backInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  backInOut: function backInOut(k) {
    var s = 1.70158 * 1.525;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }

    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },
  // bounce
  //  easing equation function for a bounce (exponentially decaying parabolic bounce)
  //  @param t: Current time (in frames or seconds).
  //  @return: The correct value.

  /**
   * !#en Easing in action with bouncing effect.
   * !#zh 弹跳效果的缓入函数。
   * @method bounceIn
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  bounceIn: function bounceIn(k) {
    return 1 - easing.bounceOut(1 - k);
  },

  /**
   * !#en Easing out action with bouncing effect.
   * !#zh 弹跳效果的缓出函数。
   * @method bounceOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  bounceOut: function bounceOut(k) {
    if (k < 1 / 2.75) {
      return 7.5625 * k * k;
    } else if (k < 2 / 2.75) {
      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
    } else if (k < 2.5 / 2.75) {
      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
    } else {
      return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
    }
  },

  /**
   * !#en Easing in and out action with bouncing effect.
   * !#zh 弹跳效果的缓入缓出函数。
   * @method bounceInOut
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  bounceInOut: function bounceInOut(k) {
    if (k < 0.5) {
      return easing.bounceIn(k * 2) * 0.5;
    }

    return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  },

  /**
   * !#en Target will run action with smooth effect.
   * !#zh 平滑效果函数。
   * @method smooth
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  // t<=0: 0 | 0<t<1: 3*t^2 - 2*t^3 | t>=1: 1
  smooth: function smooth(t) {
    if (t <= 0) {
      return 0;
    }

    if (t >= 1) {
      return 1;
    }

    return t * t * (3 - 2 * t);
  },

  /**
   * !#en Target will run action with fade effect.
   * !#zh 渐褪效果函数。
   * @method fade
   * @param {Number} t The current time as a percentage of the total time.
   * @return {Number} The correct value.
   */
  // t<=0: 0 | 0<t<1: 6*t^5 - 15*t^4 + 10*t^3 | t>=1: 1
  fade: function fade(t) {
    if (t <= 0) {
      return 0;
    }

    if (t >= 1) {
      return 1;
    }

    return t * t * t * (t * (t * 6 - 15) + 10);
  }
};

function _makeOutIn(fnIn, fnOut) {
  return function (k) {
    if (k < 0.5) {
      return fnOut(k * 2) / 2;
    }

    return fnIn(2 * k - 1) / 2 + 0.5;
  };
}

easing.quadOutIn = _makeOutIn(easing.quadIn, easing.quadOut);
easing.cubicOutIn = _makeOutIn(easing.cubicIn, easing.cubicOut);
easing.quartOutIn = _makeOutIn(easing.quartIn, easing.quartOut);
easing.quintOutIn = _makeOutIn(easing.quintIn, easing.quintOut);
easing.sineOutIn = _makeOutIn(easing.sineIn, easing.sineOut);
easing.expoOutIn = _makeOutIn(easing.expoIn, easing.expoOut);
easing.circOutIn = _makeOutIn(easing.circIn, easing.circOut);
easing.backOutIn = _makeOutIn(easing.backIn, easing.backOut);

easing.bounceIn = function (k) {
  return 1 - easing.bounceOut(1 - k);
};

easing.bounceInOut = function (k) {
  if (k < 0.5) {
    return easing.bounceIn(k * 2) * 0.5;
  }

  return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
};

easing.bounceOutIn = _makeOutIn(easing.bounceIn, easing.bounceOut);
/**
 * @module cc
 */

/**
 * !#en This is a Easing instance.
 * !#zh 这是一个 Easing 类实例。
 * @property easing
 * @type Easing
 */

cc.easing = module.exports = easing;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcZWFzaW5nLmpzIl0sIm5hbWVzIjpbImVhc2luZyIsImNvbnN0YW50IiwibGluZWFyIiwiayIsInF1YWRJbiIsInF1YWRPdXQiLCJxdWFkSW5PdXQiLCJjdWJpY0luIiwiY3ViaWNPdXQiLCJjdWJpY0luT3V0IiwicXVhcnRJbiIsInF1YXJ0T3V0IiwicXVhcnRJbk91dCIsInF1aW50SW4iLCJxdWludE91dCIsInF1aW50SW5PdXQiLCJzaW5lSW4iLCJNYXRoIiwiY29zIiwiUEkiLCJzaW5lT3V0Iiwic2luIiwic2luZUluT3V0IiwiZXhwb0luIiwicG93IiwiZXhwb091dCIsImV4cG9Jbk91dCIsImNpcmNJbiIsInNxcnQiLCJjaXJjT3V0IiwiY2lyY0luT3V0IiwiZWxhc3RpY0luIiwicyIsImEiLCJwIiwiYXNpbiIsImVsYXN0aWNPdXQiLCJlbGFzdGljSW5PdXQiLCJiYWNrSW4iLCJiYWNrT3V0IiwiYmFja0luT3V0IiwiYm91bmNlSW4iLCJib3VuY2VPdXQiLCJib3VuY2VJbk91dCIsInNtb290aCIsInQiLCJmYWRlIiwiX21ha2VPdXRJbiIsImZuSW4iLCJmbk91dCIsInF1YWRPdXRJbiIsImN1YmljT3V0SW4iLCJxdWFydE91dEluIiwicXVpbnRPdXRJbiIsInNpbmVPdXRJbiIsImV4cG9PdXRJbiIsImNpcmNPdXRJbiIsImJhY2tPdXRJbiIsImJvdW5jZU91dEluIiwiY2MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJ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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbiAvKipcclxuICAqICEjZW5cclxuICAqIFRoaXMgY2xhc3MgcHJvdmlkZSBlYXNpbmcgbWV0aG9kcyBmb3Ige3sjY3Jvc3NMaW5rIFwidHdlZW5cIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuPGJyPlxyXG4gICogRGVtb25zdHJhdGlvOiBodHRwczovL2Vhc2luZ3MubmV0L1xyXG4gICogISN6aFxyXG4gICog57yT5Yqo5Ye95pWw57G777yM5Li6IHt7I2Nyb3NzTGluayBcIlR3ZWVuXCJ9fXt7L2Nyb3NzTGlua319IOaPkOS+m+e8k+WKqOaViOaenOWHveaVsOOAgjxicj5cclxuICAqIOWHveaVsOaViOaenOa8lOekuu+8miBodHRwczovL2Vhc2luZ3MubmV0L1xyXG4gICogQGNsYXNzIEVhc2luZ1xyXG4gICovXHJcblxyXG52YXIgZWFzaW5nID0ge1xyXG4gICAgY29uc3RhbnQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDA7IH0sXHJcbiAgICBsaW5lYXI6IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrOyB9LFxyXG5cclxuICAgIC8vIHF1YWRcclxuICAgIC8vICBlYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgcXVhZHJhdGljICh0XjIpXHJcbiAgICAvLyAgQHBhcmFtIHQ6IEN1cnJlbnQgdGltZSAoaW4gZnJhbWVzIG9yIHNlY29uZHMpLlxyXG4gICAgLy8gIEByZXR1cm46IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gd2l0aCBxdWFkcmF0aWMgZm9ybXVsYS4gRnJvbSBzbG93IHRvIGZhc3QuXHJcbiAgICAgKiAhI3poIOW5s+aWueabsue6v+e8k+WFpeWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+OAglxyXG4gICAgICogQG1ldGhvZCBxdWFkSW5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBxdWFkSW46IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICogazsgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgb3V0IHdpdGggcXVhZHJhdGljIGZvcm11bGEuIEZyb20gZmFzdCB0byBzbG93LlxyXG4gICAgICogISN6aCDlubPmlrnmm7Lnur/nvJPlh7rlh73mlbDjgILov5DliqjnlLHlv6vliLDmhaLjgIJcclxuICAgICAqIEBtZXRob2QgcXVhZE91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHF1YWRPdXQ6IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICogKCAyIC0gayApOyB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVhc2luZyBpbiBhbmQgb3V0IHdpdGggcXVhZHJhdGljIGZvcm11bGEuIEZyb20gc2xvdyB0byBmYXN0LCB0aGVuIGJhY2sgdG8gc2xvdy5cclxuICAgICAqICEjemgg5bmz5pa55puy57q/57yT5YWl57yT5Ye65Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b+r5YaN5Yiw5oWi44CCXHJcbiAgICAgKiBAbWV0aG9kIHF1YWRJbk91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHF1YWRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTAuNSAqICggLS1rICogKCBrIC0gMiApIC0gMSApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjdWJpY1xyXG4gICAgLy8gIGVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBjdWJpYyAodF4zKVxyXG4gICAgLy8gIEBwYXJhbSB0OiBDdXJyZW50IHRpbWUgKGluIGZyYW1lcyBvciBzZWNvbmRzKS5cclxuICAgIC8vICBAcmV0dXJuOiBUaGUgY29ycmVjdCB2YWx1ZS5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIHdpdGggY3ViaWMgZm9ybXVsYS4gRnJvbSBzbG93IHRvIGZhc3QuXHJcbiAgICAgKiAhI3poIOeri+aWueabsue6v+e8k+WFpeWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+OAglxyXG4gICAgICogQG1ldGhvZCBjdWJpY0luXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGN1YmljSW46IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICogayAqIGs7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIG91dCB3aXRoIGN1YmljIGZvcm11bGEuIEZyb20gc2xvdyB0byBmYXN0LlxyXG4gICAgICogISN6aCDnq4vmlrnmm7Lnur/nvJPlh7rlh73mlbDjgILov5DliqjnlLHlv6vliLDmhaLjgIJcclxuICAgICAqIEBtZXRob2QgY3ViaWNPdXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgY3ViaWNPdXQ6IGZ1bmN0aW9uIChrKSB7IHJldHVybiAtLWsgKiBrICogayArIDE7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBjdWJpYyBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdCwgdGhlbiBiYWNrIHRvIHNsb3cuXHJcbiAgICAgKiAhI3poIOeri+aWueabsue6v+e8k+WFpee8k+WHuuWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+WGjeWIsOaFouOAglxyXG4gICAgICogQG1ldGhvZCBjdWJpY0luT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGN1YmljSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgaWYgKCggayAqPSAyICkgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwLjUgKiAoICggayAtPSAyICkgKiBrICogayArIDIgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gcXVhcnRcclxuICAgIC8vICBlYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgcXVhcnRpYyAodF40KVxyXG4gICAgLy8gIEBwYXJhbSB0OiBDdXJyZW50IHRpbWUgKGluIGZyYW1lcyBvciBzZWNvbmRzKS5cclxuICAgIC8vICBAcmV0dXJuOiBUaGUgY29ycmVjdCB2YWx1ZS5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIHdpdGggcXVhcnRpYyBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdC5cclxuICAgICAqICEjemgg5Zub5qyh5pa55puy57q/57yT5YWl5Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b+r44CCXHJcbiAgICAgKiBAbWV0aG9kIHF1YXJ0SW5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgcXVhcnRJbjogZnVuY3Rpb24gKGspIHsgcmV0dXJuIGsgKiBrICogayAqIGs7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIG91dCB3aXRoIHF1YXJ0aWMgZm9ybXVsYS4gRnJvbSBmYXN0IHRvIHNsb3cuXHJcbiAgICAgKiAhI3poIOWbm+asoeaWueabsue6v+e8k+WHuuWHveaVsOOAgui/kOWKqOeUseW/q+WIsOaFouOAglxyXG4gICAgICogQG1ldGhvZCBxdWFydE91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBxdWFydE91dDogZnVuY3Rpb24gKGspIHsgcmV0dXJuIDEgLSAoIC0tayAqIGsgKiBrICogayApOyB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVhc2luZyBpbiBhbmQgb3V0IHdpdGggcXVhcnRpYyBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdCwgdGhlbiBiYWNrIHRvIHNsb3cuXHJcbiAgICAgKiAhI3poIOWbm+asoeaWueabsue6v+e8k+WFpee8k+WHuuWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+WGjeWIsOaFouOAglxyXG4gICAgICogQG1ldGhvZCBxdWFydEluT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHF1YXJ0SW5PdXQ6ICBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoICggayAtPSAyICkgKiBrICogayAqIGsgLSAyICk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHF1aW50XHJcbiAgICAvLyAgZWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIHF1aW50aWMgKHReNSlcclxuICAgIC8vICBAcGFyYW0gdDogQ3VycmVudCB0aW1lIChpbiBmcmFtZXMgb3Igc2Vjb25kcykuXHJcbiAgICAvLyAgQHJldHVybjogVGhlIGNvcnJlY3QgdmFsdWUuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVhc2luZyBpbiB3aXRoIHF1aW50aWMgZm9ybXVsYS4gRnJvbSBzbG93IHRvIGZhc3QuXHJcbiAgICAgKiAhI3poIOS6lOasoeaWueabsue6v+e8k+WFpeWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+OAglxyXG4gICAgICogQG1ldGhvZCBxdWludEluXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHF1aW50SW46IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICogayAqIGsgKiBrICogazsgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgb3V0IHdpdGggcXVpbnRpYyBmb3JtdWxhLiBGcm9tIGZhc3QgdG8gc2xvdy5cclxuICAgICAqICEjemgg5LqU5qyh5pa55puy57q/57yT5Ye65Ye95pWw44CC6L+Q5Yqo55Sx5b+r5Yiw5oWi44CCXHJcbiAgICAgKiBAbWV0aG9kIHF1aW50T3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHF1aW50T3V0OiBmdW5jdGlvbiAoaykgeyByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBxdWludGljIGZvcm11bGEuIEZyb20gc2xvdyB0byBmYXN0LCB0aGVuIGJhY2sgdG8gc2xvdy5cclxuICAgICAqICEjemgg5LqU5qyh5pa55puy57q/57yT5YWl57yT5Ye65Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b+r5YaN5Yiw5oWi44CCXHJcbiAgICAgKiBAbWV0aG9kIHF1aW50SW5PdXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgcXVpbnRJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGsgKiBrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMC41ICogKCAoIGsgLT0gMiApICogayAqIGsgKiBrICogayArIDIgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gc2luZVxyXG4gICAgLy8gIGVhc2luZyBlcXVhdGlvbiBmdW5jdGlvbiBmb3IgYSBzaW51c29pZGFsIChzaW4odCkpXHJcbiAgICAvLyAgQHBhcmFtIHQ6IEN1cnJlbnQgdGltZSAoaW4gZnJhbWVzIG9yIHNlY29uZHMpLlxyXG4gICAgLy8gIEByZXR1cm46IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYW5kIG91dCB3aXRoIHNpbmUgZm9ybXVsYS4gRnJvbSBzbG93IHRvIGZhc3QuXHJcbiAgICAgKiAhI3poIOato+W8puabsue6v+e8k+WFpeWHveaVsOOAgui/kOWKqOeUseaFouWIsOW/q+OAglxyXG4gICAgICogQG1ldGhvZCBzaW5lSW5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgc2luZUluOiBmdW5jdGlvbiAoaykgeyByZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBzaW5lIGZvcm11bGEuIEZyb20gZmFzdCB0byBzbG93LlxyXG4gICAgICogISN6aCDmraPlvKbmm7Lnur/nvJPlh7rlh73mlbDjgILov5DliqjnlLHlv6vliLDmhaLjgIJcclxuICAgICAqIEBtZXRob2Qgc2luZU91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBzaW5lT3V0OiBmdW5jdGlvbiAoaykgeyByZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTsgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYW5kIG91dCB3aXRoIHNpbmUgZm9ybXVsYS4gRnJvbSBzbG93IHRvIGZhc3QsIHRoZW4gYmFjayB0byBzbG93LlxyXG4gICAgICogISN6aCDmraPlvKbmm7Lnur/nvJPlhaXnvJPlh7rlh73mlbDjgILov5DliqjnlLHmhaLliLDlv6vlho3liLDmhaLjgIJcclxuICAgICAqIEBtZXRob2Qgc2luZUluT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIHNpbmVJbk91dDogZnVuY3Rpb24gKGspIHsgcmV0dXJuIDAuNSAqICggMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSApOyB9LFxyXG5cclxuICAgIC8vIGV4cG9cclxuICAgIC8vICBlYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGFuIGV4cG9uZW50aWFsICgyXnQpXHJcbiAgICAvLyAgcGFyYW0gdDogQ3VycmVudCB0aW1lIChpbiBmcmFtZXMgb3Igc2Vjb25kcykuXHJcbiAgICAvLyAgcmV0dXJuOiBUaGUgY29ycmVjdCB2YWx1ZS5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBleHBvbmVudGlhbCBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdC5cclxuICAgICAqICEjemgg5oyH5pWw5puy57q/57yT5YWl5Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b+r44CCXHJcbiAgICAgKiBAbWV0aG9kIGV4cG9JblxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBleHBvSW46IGZ1bmN0aW9uIChrKSB7IHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTsgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYW5kIG91dCB3aXRoIGV4cG9uZW50aWFsIGZvcm11bGEuIEZyb20gZmFzdCB0byBzbG93LlxyXG4gICAgICogISN6aCDmjIfmlbDmm7Lnur/nvJPlh7rlh73mlbDjgILov5DliqjnlLHlv6vliLDmhaLjgIJcclxuICAgICAqIEBtZXRob2QgZXhwb091dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBleHBvT3V0OiBmdW5jdGlvbiAoaykgeyByZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLTEwICogayk7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBleHBvbmVudGlhbCBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdC5cclxuICAgICAqICEjemgg5oyH5pWw5puy57q/57yT5YWl5ZKM57yT5Ye65Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b6I5b+r5YaN5Yiw5oWi44CCXHJcbiAgICAgKiBAbWV0aG9kIGV4cG9Jbk91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUsIHRoZW4gYmFjayB0byBzbG93LlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZXhwb0luT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIGlmIChrID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoayA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCggayAqPSAyICkgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwLjUgKiAoIC1NYXRoLnBvdygyLCAtMTAgKiAoIGsgLSAxICkpICsgMiApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjaXJjXHJcbiAgICAvLyAgZWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIGNpcmN1bGFyIChzcXJ0KDEtdF4yKSlcclxuICAgIC8vICBAcGFyYW0gdDogQ3VycmVudCB0aW1lIChpbiBmcmFtZXMgb3Igc2Vjb25kcykuXHJcbiAgICAvLyAgQHJldHVybjpcdFRoZSBjb3JyZWN0IHZhbHVlLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYW5kIG91dCB3aXRoIGNpcmN1bGFyIGZvcm11bGEuIEZyb20gc2xvdyB0byBmYXN0LlxyXG4gICAgICogISN6aCDlvqrnjq/lhazlvI/nvJPlhaXlh73mlbDjgILov5DliqjnlLHmhaLliLDlv6vjgIJcclxuICAgICAqIEBtZXRob2QgY2lyY0luXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGNpcmNJbjogZnVuY3Rpb24gKGspIHsgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTsgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYW5kIG91dCB3aXRoIGNpcmN1bGFyIGZvcm11bGEuIEZyb20gZmFzdCB0byBzbG93LlxyXG4gICAgICogISN6aCDlvqrnjq/lhazlvI/nvJPlh7rlh73mlbDjgILov5DliqjnlLHlv6vliLDmhaLjgIJcclxuICAgICAqIEBtZXRob2QgY2lyY091dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICBjaXJjT3V0OiBmdW5jdGlvbiAoaykgeyByZXR1cm4gTWF0aC5zcXJ0KDEgLSAoIC0tayAqIGsgKSk7IH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgd2l0aCBjaXJjdWxhciBmb3JtdWxhLiBGcm9tIHNsb3cgdG8gZmFzdC5cclxuICAgICAqICEjemgg5oyH5pWw5puy57q/57yT5YWl57yT5Ye65Ye95pWw44CC6L+Q5Yqo55Sx5oWi5Yiw5b6I5b+r5YaN5Yiw5oWi44CCXHJcbiAgICAgKiBAbWV0aG9kIGNpcmNJbk91dFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUsIHRoZW4gYmFjayB0byBzbG93LlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgY2lyY0luT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICggTWF0aC5zcXJ0KDEgLSBrICogaykgLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDAuNSAqICggTWF0aC5zcXJ0KDEgLSAoIGsgLT0gMikgKiBrKSArIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBlbGFzdGljXHJcbiAgICAvLyAgZWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhbiBlbGFzdGljIChleHBvbmVudGlhbGx5IGRlY2F5aW5nIHNpbmUgd2F2ZSlcclxuICAgIC8vICBAcGFyYW0gdDogQ3VycmVudCB0aW1lIChpbiBmcmFtZXMgb3Igc2Vjb25kcykuXHJcbiAgICAvLyAgQHJldHVybjogVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAvLyAgcmVjb21tYW5kIHZhbHVlOiBlbGFzdGljICh0KVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYWN0aW9uIHdpdGggYSBzcHJpbmcgb3NjaWxsYXRpbmcgZWZmZWN0LlxyXG4gICAgICogISN6aCDlvLnnsKflm57pnIfmlYjmnpznmoTnvJPlhaXlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2QgZWxhc3RpY0luXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGVsYXN0aWNJbjogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICB2YXIgcywgYSA9IDAuMSwgcCA9IDAuNDtcclxuICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYSB8fCBhIDwgMSkge1xyXG4gICAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgICAgcyA9IHAgLyA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKCAyICogTWF0aC5QSSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLSggYSAqIE1hdGgucG93KDIsIDEwICogKCBrIC09IDEgKSkgKiBNYXRoLnNpbigoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwKSApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgb3V0IGFjdGlvbiB3aXRoIGEgc3ByaW5nIG9zY2lsbGF0aW5nIGVmZmVjdC5cclxuICAgICAqICEjemgg5by557Cn5Zue6ZyH5pWI5p6c55qE57yT5Ye65Ye95pWw44CCXHJcbiAgICAgKiBAbWV0aG9kIGVsYXN0aWNPdXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgZWxhc3RpY091dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICB2YXIgcywgYSA9IDAuMSwgcCA9IDAuNDtcclxuICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYSB8fCBhIDwgMSkge1xyXG4gICAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgICAgcyA9IHAgLyA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKCAyICogTWF0aC5QSSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKCBhICogTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwKSArIDEgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgYWN0aW9uIHdpdGggYSBzcHJpbmcgb3NjaWxsYXRpbmcgZWZmZWN0LlxyXG4gICAgICogISN6aCDlvLnnsKflm57pnIfmlYjmnpznmoTnvJPlhaXnvJPlh7rlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2QgZWxhc3RpY0luT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGVsYXN0aWNJbk91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICB2YXIgcywgYSA9IDAuMSwgcCA9IDAuNDtcclxuICAgICAgICBpZiAoayA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGsgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYSB8fCBhIDwgMSkge1xyXG4gICAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgICAgcyA9IHAgLyA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKCAyICogTWF0aC5QSSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKlxyXG4gICAgICAgICAgICAgICAgICAgKCBhICogTWF0aC5wb3coMiwgMTAgKiAoIGsgLT0gMSApKSAqIE1hdGguc2luKCggayAtIHMgKSAqICggMiAqIE1hdGguUEkgKSAvIHApICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKCBrIC09IDEgKSkgKiBNYXRoLnNpbigoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwKSAqIDAuNSArIDE7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGJhY2tcclxuICAgIC8vICBlYXNpbmcgZXF1YXRpb24gZnVuY3Rpb24gZm9yIGEgYmFjayAob3ZlcnNob290aW5nIGN1YmljIGVhc2luZzogKHMrMSkqdF4zIC0gcyp0XjIpXHJcbiAgICAvLyAgQHBhcmFtIHQ6IEN1cnJlbnQgdGltZSAoaW4gZnJhbWVzIG9yIHNlY29uZHMpLlxyXG4gICAgLy8gIEByZXR1cm46IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFYXNpbmcgaW4gYWN0aW9uIHdpdGggXCJiYWNrIHVwXCIgYmVoYXZpb3IuXHJcbiAgICAgKiAhI3poIOWbnumAgOaViOaenOeahOe8k+WFpeWHveaVsOOAglxyXG4gICAgICogQG1ldGhvZCBiYWNrSW5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgYmFja0luOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIHZhciBzID0gMS43MDE1ODtcclxuICAgICAgICByZXR1cm4gayAqIGsgKiAoICggcyArIDEgKSAqIGsgLSBzICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVhc2luZyBvdXQgYWN0aW9uIHdpdGggXCJiYWNrIHVwXCIgYmVoYXZpb3IuXHJcbiAgICAgKiAhI3poIOWbnumAgOaViOaenOeahOe8k+WHuuWHveaVsOOAglxyXG4gICAgICogQG1ldGhvZCBiYWNrT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGJhY2tPdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xyXG4gICAgICAgIHJldHVybiAtLWsgKiBrICogKCAoIHMgKyAxICkgKiBrICsgcyApICsgMTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgYWN0aW9uIHdpdGggXCJiYWNrIHVwXCIgYmVoYXZpb3IuXHJcbiAgICAgKiAhI3poIOWbnumAgOaViOaenOeahOe8k+WFpee8k+WHuuWHveaVsOOAglxyXG4gICAgICogQG1ldGhvZCBiYWNrSW5PdXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgYmFja0luT3V0OiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIHZhciBzID0gMS43MDE1OCAqIDEuNTI1O1xyXG4gICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCBrICogayAqICggKCBzICsgMSApICogayAtIHMgKSApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMC41ICogKCAoIGsgLT0gMiApICogayAqICggKCBzICsgMSApICogayArIHMgKSArIDIgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYm91bmNlXHJcbiAgICAvLyAgZWFzaW5nIGVxdWF0aW9uIGZ1bmN0aW9uIGZvciBhIGJvdW5jZSAoZXhwb25lbnRpYWxseSBkZWNheWluZyBwYXJhYm9saWMgYm91bmNlKVxyXG4gICAgLy8gIEBwYXJhbSB0OiBDdXJyZW50IHRpbWUgKGluIGZyYW1lcyBvciBzZWNvbmRzKS5cclxuICAgIC8vICBAcmV0dXJuOiBUaGUgY29ycmVjdCB2YWx1ZS5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFjdGlvbiB3aXRoIGJvdW5jaW5nIGVmZmVjdC5cclxuICAgICAqICEjemgg5by56Lez5pWI5p6c55qE57yT5YWl5Ye95pWw44CCXHJcbiAgICAgKiBAbWV0aG9kIGJvdW5jZUluXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGJvdW5jZUluOiBmdW5jdGlvbiAoaykge1xyXG4gICAgICAgIHJldHVybiAxIC0gZWFzaW5nLmJvdW5jZU91dCgxIC0gayk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVhc2luZyBvdXQgYWN0aW9uIHdpdGggYm91bmNpbmcgZWZmZWN0LlxyXG4gICAgICogISN6aCDlvLnot7PmlYjmnpznmoTnvJPlh7rlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2QgYm91bmNlT3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIGJvdW5jZU91dDogZnVuY3Rpb24gKGspIHtcclxuICAgICAgICBpZiAoayA8ICggMSAvIDIuNzUgKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogayAqIGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGsgPCAoIDIgLyAyLjc1ICkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDEuNSAvIDIuNzUgKSApICogayArIDAuNzU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGsgPCAoIDIuNSAvIDIuNzUgKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKCBrIC09ICggMi4yNSAvIDIuNzUgKSApICogayArIDAuOTM3NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoIGsgLT0gKCAyLjYyNSAvIDIuNzUgKSApICogayArIDAuOTg0Mzc1O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFzaW5nIGluIGFuZCBvdXQgYWN0aW9uIHdpdGggYm91bmNpbmcgZWZmZWN0LlxyXG4gICAgICogISN6aCDlvLnot7PmlYjmnpznmoTnvJPlhaXnvJPlh7rlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2QgYm91bmNlSW5PdXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IFRoZSBjdXJyZW50IHRpbWUgYXMgYSBwZXJjZW50YWdlIG9mIHRoZSB0b3RhbCB0aW1lLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgY29ycmVjdCB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgYm91bmNlSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgaWYgKGsgPCAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVhc2luZy5ib3VuY2VJbihrICogMikgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlYXNpbmcuYm91bmNlT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUYXJnZXQgd2lsbCBydW4gYWN0aW9uIHdpdGggc21vb3RoIGVmZmVjdC5cclxuICAgICAqICEjemgg5bmz5ruR5pWI5p6c5Ye95pWw44CCXHJcbiAgICAgKiBAbWV0aG9kIHNtb290aFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHQgVGhlIGN1cnJlbnQgdGltZSBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIHRpbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBjb3JyZWN0IHZhbHVlLlxyXG4gICAgICovXHJcbiAgICAvLyB0PD0wOiAwIHwgMDx0PDE6IDMqdF4yIC0gMip0XjMgfCB0Pj0xOiAxXHJcbiAgICBzbW9vdGg6IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgaWYgKHQgPD0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHQgPj0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQgKiB0ICogKDMgLSAyICogdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUYXJnZXQgd2lsbCBydW4gYWN0aW9uIHdpdGggZmFkZSBlZmZlY3QuXHJcbiAgICAgKiAhI3poIOa4kOikquaViOaenOWHveaVsOOAglxyXG4gICAgICogQG1ldGhvZCBmYWRlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCBUaGUgY3VycmVudCB0aW1lIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgdGltZS5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGNvcnJlY3QgdmFsdWUuXHJcbiAgICAgKi9cclxuICAgIC8vIHQ8PTA6IDAgfCAwPHQ8MTogNip0XjUgLSAxNSp0XjQgKyAxMCp0XjMgfCB0Pj0xOiAxXHJcbiAgICBmYWRlOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIGlmICh0IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ID49IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ICogdCAqIHQgKiAodCAqICh0ICogNiAtIDE1KSArIDEwKTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBfbWFrZU91dEluIChmbkluLCBmbk91dCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgaWYgKGsgPCAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuT3V0KGsgKiAyKSAvIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmbkluKDIgKiBrIC0gMSkgLyAyICsgMC41O1xyXG4gICAgfTtcclxufVxyXG5lYXNpbmcucXVhZE91dEluID0gX21ha2VPdXRJbihlYXNpbmcucXVhZEluLCBlYXNpbmcucXVhZE91dCk7XHJcbmVhc2luZy5jdWJpY091dEluID0gX21ha2VPdXRJbihlYXNpbmcuY3ViaWNJbiwgZWFzaW5nLmN1YmljT3V0KTtcclxuZWFzaW5nLnF1YXJ0T3V0SW4gPSBfbWFrZU91dEluKGVhc2luZy5xdWFydEluLCBlYXNpbmcucXVhcnRPdXQpO1xyXG5lYXNpbmcucXVpbnRPdXRJbiA9IF9tYWtlT3V0SW4oZWFzaW5nLnF1aW50SW4sIGVhc2luZy5xdWludE91dCk7XHJcbmVhc2luZy5zaW5lT3V0SW4gPSBfbWFrZU91dEluKGVhc2luZy5zaW5lSW4sIGVhc2luZy5zaW5lT3V0KTtcclxuZWFzaW5nLmV4cG9PdXRJbiA9IF9tYWtlT3V0SW4oZWFzaW5nLmV4cG9JbiwgZWFzaW5nLmV4cG9PdXQpO1xyXG5lYXNpbmcuY2lyY091dEluID0gX21ha2VPdXRJbihlYXNpbmcuY2lyY0luLCBlYXNpbmcuY2lyY091dCk7XHJcbmVhc2luZy5iYWNrT3V0SW4gPSBfbWFrZU91dEluKGVhc2luZy5iYWNrSW4sIGVhc2luZy5iYWNrT3V0KTtcclxuZWFzaW5nLmJvdW5jZUluID0gZnVuY3Rpb24gKGspIHsgcmV0dXJuIDEgLSBlYXNpbmcuYm91bmNlT3V0KDEgLSBrKTsgfTtcclxuZWFzaW5nLmJvdW5jZUluT3V0ID0gZnVuY3Rpb24gKGspIHtcclxuICAgIGlmIChrIDwgMC41KSB7XHJcbiAgICAgICAgcmV0dXJuIGVhc2luZy5ib3VuY2VJbihrICogMikgKiAwLjU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWFzaW5nLmJvdW5jZU91dChrICogMiAtIDEpICogMC41ICsgMC41O1xyXG59O1xyXG5lYXNpbmcuYm91bmNlT3V0SW4gPSBfbWFrZU91dEluKGVhc2luZy5ib3VuY2VJbiwgZWFzaW5nLmJvdW5jZU91dCk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoaXMgaXMgYSBFYXNpbmcgaW5zdGFuY2UuXHJcbiAqICEjemgg6L+Z5piv5LiA5LiqIEVhc2luZyDnsbvlrp7kvovjgIJcclxuICogQHByb3BlcnR5IGVhc2luZ1xyXG4gKiBAdHlwZSBFYXNpbmdcclxuICovXHJcblxyXG5jYy5lYXNpbmcgPSBtb2R1bGUuZXhwb3J0cyA9IGVhc2luZztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=