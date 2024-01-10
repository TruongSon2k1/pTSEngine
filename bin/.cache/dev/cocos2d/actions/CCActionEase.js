
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionEase.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

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
 * Creates the action easing object with the rate parameter. <br />
 * From slow to fast.
 * !#zh 创建 easeIn 缓动对象，由慢到快。
 * @method easeIn
 * @param {Number} rate
 * @return {Object}
 * @example
 * action.easing(cc.easeIn(3.0));
 */
cc.easeIn = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      return Math.pow(dt, this._rate);
    },
    reverse: function reverse() {
      return cc.easeIn(1 / this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * From fast to slow.
 * !#zh 创建 easeOut 缓动对象，由快到慢。
 * @method easeOut
 * @param {Number} rate
 * @return {Object}
 * @example
 * action.easing(cc.easeOut(3.0));
 */


cc.easeOut = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      return Math.pow(dt, 1 / this._rate);
    },
    reverse: function reverse() {
      return cc.easeOut(1 / this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * Slow to fast then to slow.
 * !#zh 创建 easeInOut 缓动对象，慢到快，然后慢。
 * @method easeInOut
 * @param {Number} rate
 * @return {Object}
 *
 * @example
 * action.easing(cc.easeInOut(3.0));
 */


cc.easeInOut = function (rate) {
  return {
    _rate: rate,
    easing: function easing(dt) {
      dt *= 2;
      if (dt < 1) return 0.5 * Math.pow(dt, this._rate);else return 1.0 - 0.5 * Math.pow(2 - dt, this._rate);
    },
    reverse: function reverse() {
      return cc.easeInOut(this._rate);
    }
  };
};
/**
 * !#en
 * Creates the action easing object with the rate parameter. <br />
 * Reference easeInExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialIn 缓动对象。<br />
 * EaseExponentialIn 是按指数函数缓动进入的动作。<br />
 * 参考 easeInExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialIn
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialIn());
 */


var _easeExponentialInObj = {
  easing: function easing(dt) {
    return dt === 0 ? 0 : Math.pow(2, 10 * (dt - 1));
  },
  reverse: function reverse() {
    return _easeExponentialOutObj;
  }
};

cc.easeExponentialIn = function () {
  return _easeExponentialInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialOut 缓动对象。<br />
 * EaseExponentialOut 是按指数函数缓动退出的动作。<br />
 * 参考 easeOutExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialOut
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialOut());
 */


var _easeExponentialOutObj = {
  easing: function easing(dt) {
    return dt === 1 ? 1 : -Math.pow(2, -10 * dt) + 1;
  },
  reverse: function reverse() {
    return _easeExponentialInObj;
  }
};

cc.easeExponentialOut = function () {
  return _easeExponentialOutObj;
};
/**
 * !#en
 * Creates an EaseExponentialInOut action easing object. <br />
 * Reference easeInOutExpo: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeExponentialInOut 缓动对象。<br />
 * EaseExponentialInOut 是按指数函数缓动进入并退出的动作。<br />
 * 参考 easeInOutExpo：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeExponentialInOut
 * @return {Object}
 * @example
 * action.easing(cc.easeExponentialInOut());
 */


var _easeExponentialInOutObj = {
  easing: function easing(dt) {
    if (dt !== 1 && dt !== 0) {
      dt *= 2;
      if (dt < 1) return 0.5 * Math.pow(2, 10 * (dt - 1));else return 0.5 * (-Math.pow(2, -10 * (dt - 1)) + 2);
    }

    return dt;
  },
  reverse: function reverse() {
    return _easeExponentialInOutObj;
  }
};

cc.easeExponentialInOut = function () {
  return _easeExponentialInOutObj;
};
/**
 * !#en
 * Creates an EaseSineIn action. <br />
 * Reference easeInSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 EaseSineIn 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动进入的动作。<br />
 * 参考 easeInSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineIn
 * @return {Object}
 * @example
 * action.easing(cc.easeSineIn());
 */


var _easeSineInObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : -1 * Math.cos(dt * Math.PI / 2) + 1;
  },
  reverse: function reverse() {
    return _easeSineOutObj;
  }
};

cc.easeSineIn = function () {
  return _easeSineInObj;
};
/**
 * !#en
 * Creates an EaseSineOut action easing object. <br />
 * Reference easeOutSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 EaseSineOut 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动退出的动作。<br />
 * 参考 easeOutSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineOut
 * @return {Object}
 * @example
 * action.easing(cc.easeSineOut());
 */


var _easeSineOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : Math.sin(dt * Math.PI / 2);
  },
  reverse: function reverse() {
    return _easeSineInObj;
  }
};

cc.easeSineOut = function () {
  return _easeSineOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutSine: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeSineInOut 缓动对象。<br />
 * EaseSineIn 是按正弦函数缓动进入并退出的动作。<br />
 * 参考 easeInOutSine：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeSineInOut
 * @return {Object}
 * @example
 * action.easing(cc.easeSineInOut());
 */


var _easeSineInOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : -0.5 * (Math.cos(Math.PI * dt) - 1);
  },
  reverse: function reverse() {
    return _easeSineInOutObj;
  }
};

cc.easeSineInOut = function () {
  return _easeSineInOutObj;
};
/**
 * @module cc
 */

/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeInElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticIn 缓动对象。<br />
 * EaseElasticIn 是按弹性曲线缓动进入的动作。<br />
 * 参数 easeInElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticIn
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticIn(3.0));
 */
//default ease elastic in object (period = 0.3)


var _easeElasticInObj = {
  easing: function easing(dt) {
    if (dt === 0 || dt === 1) return dt;
    dt = dt - 1;
    return -Math.pow(2, 10 * dt) * Math.sin((dt - 0.3 / 4) * Math.PI * 2 / 0.3);
  },
  reverse: function reverse() {
    return _easeElasticOutObj;
  }
};

cc.easeElasticIn = function (period) {
  if (period && period !== 0.3) {
    return {
      _period: period,
      easing: function easing(dt) {
        if (dt === 0 || dt === 1) return dt;
        dt = dt - 1;
        return -Math.pow(2, 10 * dt) * Math.sin((dt - this._period / 4) * Math.PI * 2 / this._period);
      },
      reverse: function reverse() {
        return cc.easeElasticOut(this._period);
      }
    };
  }

  return _easeElasticInObj;
};
/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeOutElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticOut 缓动对象。<br />
 * EaseElasticOut 是按弹性曲线缓动退出的动作。<br />
 * 参考 easeOutElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticOut
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticOut(3.0));
 */
//default ease elastic out object (period = 0.3)


var _easeElasticOutObj = {
  easing: function easing(dt) {
    return dt === 0 || dt === 1 ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - 0.3 / 4) * Math.PI * 2 / 0.3) + 1;
  },
  reverse: function reverse() {
    return _easeElasticInObj;
  }
};

cc.easeElasticOut = function (period) {
  if (period && period !== 0.3) {
    return {
      _period: period,
      easing: function easing(dt) {
        return dt === 0 || dt === 1 ? dt : Math.pow(2, -10 * dt) * Math.sin((dt - this._period / 4) * Math.PI * 2 / this._period) + 1;
      },
      reverse: function reverse() {
        return cc.easeElasticIn(this._period);
      }
    };
  }

  return _easeElasticOutObj;
};
/**
 * !#en
 * Creates the action easing object with the period in radians (default is 0.3). <br />
 * Reference easeInOutElastic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeElasticInOut 缓动对象。<br />
 * EaseElasticInOut 是按弹性曲线缓动进入并退出的动作。<br />
 * 参考 easeInOutElastic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeElasticInOut
 * @param {Number} period
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeElasticInOut(3.0));
 */


cc.easeElasticInOut = function (period) {
  period = period || 0.3;
  return {
    _period: period,
    easing: function easing(dt) {
      var newT = 0;
      var locPeriod = this._period;

      if (dt === 0 || dt === 1) {
        newT = dt;
      } else {
        dt = dt * 2;
        if (!locPeriod) locPeriod = this._period = 0.3 * 1.5;
        var s = locPeriod / 4;
        dt = dt - 1;
        if (dt < 0) newT = -0.5 * Math.pow(2, 10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod);else newT = Math.pow(2, -10 * dt) * Math.sin((dt - s) * Math.PI * 2 / locPeriod) * 0.5 + 1;
      }

      return newT;
    },
    reverse: function reverse() {
      return cc.easeElasticInOut(this._period);
    }
  };
};
/**
 * @module cc
 */


function _bounceTime(time1) {
  if (time1 < 1 / 2.75) {
    return 7.5625 * time1 * time1;
  } else if (time1 < 2 / 2.75) {
    time1 -= 1.5 / 2.75;
    return 7.5625 * time1 * time1 + 0.75;
  } else if (time1 < 2.5 / 2.75) {
    time1 -= 2.25 / 2.75;
    return 7.5625 * time1 * time1 + 0.9375;
  }

  time1 -= 2.625 / 2.75;
  return 7.5625 * time1 * time1 + 0.984375;
}

;
var _easeBounceInObj = {
  easing: function easing(dt) {
    return 1 - _bounceTime(1 - dt);
  },
  reverse: function reverse() {
    return _easeBounceOutObj;
  }
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the beginning.
 * !#zh
 * 创建 easeBounceIn 缓动对象。<br />
 * EaseBounceIn 是按弹跳动作缓动进入的动作。
 * @method easeBounceIn
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceIn());
 */

cc.easeBounceIn = function () {
  return _easeBounceInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the ending.
 * !#zh
 * 创建 easeBounceOut 缓动对象。<br />
 * EaseBounceOut 是按弹跳动作缓动退出的动作。
 * @method easeBounceOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceOut());
 */


var _easeBounceOutObj = {
  easing: function easing(dt) {
    return _bounceTime(dt);
  },
  reverse: function reverse() {
    return _easeBounceInObj;
  }
};

cc.easeBounceOut = function () {
  return _easeBounceOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Eased bounce effect at the begining and ending.
 * !#zh
 * 创建 easeBounceInOut 缓动对象。<br />
 * EaseBounceInOut 是按弹跳动作缓动进入并退出的动作。
 * @method easeBounceInOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBounceInOut());
 */


var _easeBounceInOutObj = {
  easing: function easing(time1) {
    var newT;

    if (time1 < 0.5) {
      time1 = time1 * 2;
      newT = (1 - _bounceTime(1 - time1)) * 0.5;
    } else {
      newT = _bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
    }

    return newT;
  },
  reverse: function reverse() {
    return _easeBounceInOutObj;
  }
};

cc.easeBounceInOut = function () {
  return _easeBounceInOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * In the opposite direction to move slowly, and then accelerated to the right direction.
 * !#zh
 * 创建 easeBackIn 缓动对象。<br />
 * easeBackIn 是在相反的方向缓慢移动，然后加速到正确的方向。<br />
 * @method easeBackIn
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackIn());
 */


var _easeBackInObj = {
  easing: function easing(time1) {
    var overshoot = 1.70158;
    return time1 === 0 || time1 === 1 ? time1 : time1 * time1 * ((overshoot + 1) * time1 - overshoot);
  },
  reverse: function reverse() {
    return _easeBackOutObj;
  }
};

cc.easeBackIn = function () {
  return _easeBackInObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Fast moving more than the finish, and then slowly back to the finish.
 * !#zh
 * 创建 easeBackOut 缓动对象。<br />
 * easeBackOut 快速移动超出目标，然后慢慢回到目标点。
 * @method easeBackOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackOut());
 */


var _easeBackOutObj = {
  easing: function easing(time1) {
    if (time1 === 0) {
      return 0;
    }

    var overshoot = 1.70158;
    time1 = time1 - 1;
    return time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1;
  },
  reverse: function reverse() {
    return _easeBackInObj;
  }
};

cc.easeBackOut = function () {
  return _easeBackOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Begining of cc.EaseBackIn. Ending of cc.EaseBackOut.
 * !#zh
 * 创建 easeBackInOut 缓动对象。<br />
 * @method easeBackInOut
 * @return {Object}
 * @example
 * // example
 * action.easing(cc.easeBackInOut());
 */


var _easeBackInOutObj = {
  easing: function easing(time1) {
    var overshoot = 1.70158 * 1.525;
    time1 = time1 * 2;

    if (time1 < 1) {
      return time1 * time1 * ((overshoot + 1) * time1 - overshoot) / 2;
    } else {
      time1 = time1 - 2;
      return time1 * time1 * ((overshoot + 1) * time1 + overshoot) / 2 + 1;
    }
  },
  reverse: function reverse() {
    return _easeBackInOutObj;
  }
};

cc.easeBackInOut = function () {
  return _easeBackInOutObj;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Into the 4 reference point. <br />
 * To calculate the motion curve.
 * !#zh
 * 创建 easeBezierAction 缓动对象。<br />
 * EaseBezierAction 是按贝塞尔曲线缓动的动作。
 * @method easeBezierAction
 * @param {Number} p0 The first bezier parameter
 * @param {Number} p1 The second bezier parameter
 * @param {Number} p2 The third bezier parameter
 * @param {Number} p3 The fourth bezier parameter
 * @returns {Object}
 * @example
 * // example
 * action.easing(cc.easeBezierAction(0.5, 0.5, 1.0, 1.0));
 */


cc.easeBezierAction = function (a, b, c, d) {
  return {
    easing: function easing(t) {
      return Math.pow(1 - t, 3) * a + 3 * t * Math.pow(1 - t, 2) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d;
    },
    reverse: function reverse() {
      return cc.easeBezierAction(d, c, b, a);
    }
  };
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionIn 缓动对象。<br />
 * EaseQuadraticIn是按二次函数缓动进入的动作。<br />
 * 参考 easeInQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionIn());
 */


var _easeQuadraticActionIn = {
  easing: function easing(time) {
    return Math.pow(time, 2);
  },
  reverse: function reverse() {
    return _easeQuadraticActionIn;
  }
};

cc.easeQuadraticActionIn = function () {
  return _easeQuadraticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionOut 缓动对象。<br />
 * EaseQuadraticOut 是按二次函数缓动退出的动作。<br />
 * 参考 easeOutQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionOut());
 */


var _easeQuadraticActionOut = {
  easing: function easing(time) {
    return -time * (time - 2);
  },
  reverse: function reverse() {
    return _easeQuadraticActionOut;
  }
};

cc.easeQuadraticActionOut = function () {
  return _easeQuadraticActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutQuad: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuadraticActionInOut 缓动对象。<br />
 * EaseQuadraticInOut 是按二次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuad：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuadraticActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionInOut());
 */


var _easeQuadraticActionInOut = {
  easing: function easing(time) {
    var resultTime = time;
    time *= 2;

    if (time < 1) {
      resultTime = time * time * 0.5;
    } else {
      --time;
      resultTime = -0.5 * (time * (time - 2) - 1);
    }

    return resultTime;
  },
  reverse: function reverse() {
    return _easeQuadraticActionInOut;
  }
};

cc.easeQuadraticActionInOut = function () {
  return _easeQuadraticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeIntQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionIn 缓动对象。<br />
 * EaseQuarticIn 是按四次函数缓动进入的动作。<br />
 * 参考 easeIntQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuarticActionIn());
 */


var _easeQuarticActionIn = {
  easing: function easing(time) {
    return time * time * time * time;
  },
  reverse: function reverse() {
    return _easeQuarticActionIn;
  }
};

cc.easeQuarticActionIn = function () {
  return _easeQuarticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionOut 缓动对象。<br />
 * EaseQuarticOut 是按四次函数缓动退出的动作。<br />
 * 参考 easeOutQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.QuarticActionOut());
 */


var _easeQuarticActionOut = {
  easing: function easing(time) {
    time -= 1;
    return -(time * time * time * time - 1);
  },
  reverse: function reverse() {
    return _easeQuarticActionOut;
  }
};

cc.easeQuarticActionOut = function () {
  return _easeQuarticActionOut;
};
/**
 * !#en
 * Creates the action easing object.  <br />
 * Reference easeInOutQuart: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuarticActionInOut 缓动对象。<br />
 * EaseQuarticInOut 是按四次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuart：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuarticActionInOut
 * @returns {Object}
 */


var _easeQuarticActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time * time;
    time -= 2;
    return -0.5 * (time * time * time * time - 2);
  },
  reverse: function reverse() {
    return _easeQuarticActionInOut;
  }
};

cc.easeQuarticActionInOut = function () {
  return _easeQuarticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionIn 缓动对象。<br />
 * EaseQuinticIn 是按五次函数缓动进的动作。<br />
 * 参考 easeInQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuinticActionIn());
 */


var _easeQuinticActionIn = {
  easing: function easing(time) {
    return time * time * time * time * time;
  },
  reverse: function reverse() {
    return _easeQuinticActionIn;
  }
};

cc.easeQuinticActionIn = function () {
  return _easeQuinticActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionOut 缓动对象。<br />
 * EaseQuinticOut 是按五次函数缓动退出的动作
 * 参考 easeOutQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuadraticActionOut());
 */


var _easeQuinticActionOut = {
  easing: function easing(time) {
    time -= 1;
    return time * time * time * time * time + 1;
  },
  reverse: function reverse() {
    return _easeQuinticActionOut;
  }
};

cc.easeQuinticActionOut = function () {
  return _easeQuinticActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutQuint: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeQuinticActionInOut 缓动对象。<br />
 * EaseQuinticInOut是按五次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutQuint：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeQuinticActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeQuinticActionInOut());
 */


var _easeQuinticActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time * time * time + 2);
  },
  reverse: function reverse() {
    return _easeQuinticActionInOut;
  }
};

cc.easeQuinticActionInOut = function () {
  return _easeQuinticActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionIn 缓动对象。<br />
 * EaseCircleIn是按圆形曲线缓动进入的动作。<br />
 * 参考 easeInCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCircleActionIn());
 */


var _easeCircleActionIn = {
  easing: function easing(time) {
    return -1 * (Math.sqrt(1 - time * time) - 1);
  },
  reverse: function reverse() {
    return _easeCircleActionIn;
  }
};

cc.easeCircleActionIn = function () {
  return _easeCircleActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionOut 缓动对象。<br />
 * EaseCircleOut是按圆形曲线缓动退出的动作。<br />
 * 参考 easeOutCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionOut
 * @returns {Object}
 * @example
 * //example
 * actioneasing(cc.easeCircleActionOut());
 */


var _easeCircleActionOut = {
  easing: function easing(time) {
    time = time - 1;
    return Math.sqrt(1 - time * time);
  },
  reverse: function reverse() {
    return _easeCircleActionOut;
  }
};

cc.easeCircleActionOut = function () {
  return _easeCircleActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutCirc: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCircleActionInOut 缓动对象。<br />
 * EaseCircleInOut 是按圆形曲线缓动进入并退出的动作。<br />
 * 参考 easeInOutCirc：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCircleActionInOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCircleActionInOut());
 */


var _easeCircleActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
    time -= 2;
    return 0.5 * (Math.sqrt(1 - time * time) + 1);
  },
  reverse: function reverse() {
    return _easeCircleActionInOut;
  }
};

cc.easeCircleActionInOut = function () {
  return _easeCircleActionInOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionIn 缓动对象。<br />
 * EaseCubicIn 是按三次函数缓动进入的动作。<br />
 * 参考 easeInCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionIn
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCubicActionIn());
 */


var _easeCubicActionIn = {
  easing: function easing(time) {
    return time * time * time;
  },
  reverse: function reverse() {
    return _easeCubicActionIn;
  }
};

cc.easeCubicActionIn = function () {
  return _easeCubicActionIn;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeOutCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionOut 缓动对象。<br />
 * EaseCubicOut 是按三次函数缓动退出的动作。<br />
 * 参考 easeOutCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionOut
 * @returns {Object}
 * @example
 * //example
 * action.easing(cc.easeCubicActionOut());
 */


var _easeCubicActionOut = {
  easing: function easing(time) {
    time -= 1;
    return time * time * time + 1;
  },
  reverse: function reverse() {
    return _easeCubicActionOut;
  }
};

cc.easeCubicActionOut = function () {
  return _easeCubicActionOut;
};
/**
 * !#en
 * Creates the action easing object. <br />
 * Reference easeInOutCubic: <br />
 * http://www.zhihu.com/question/21981571/answer/19925418
 * !#zh
 * 创建 easeCubicActionInOut 缓动对象。<br />
 * EaseCubicInOut是按三次函数缓动进入并退出的动作。<br />
 * 参考 easeInOutCubic：http://www.zhihu.com/question/21981571/answer/19925418
 * @method easeCubicActionInOut
 * @returns {Object}
 */


var _easeCubicActionInOut = {
  easing: function easing(time) {
    time = time * 2;
    if (time < 1) return 0.5 * time * time * time;
    time -= 2;
    return 0.5 * (time * time * time + 2);
  },
  reverse: function reverse() {
    return _easeCubicActionInOut;
  }
};

cc.easeCubicActionInOut = function () {
  return _easeCubicActionInOut;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uRWFzZS5qcyJdLCJuYW1lcyI6WyJjYyIsImVhc2VJbiIsInJhdGUiLCJfcmF0ZSIsImVhc2luZyIsImR0IiwiTWF0aCIsInBvdyIsInJldmVyc2UiLCJlYXNlT3V0IiwiZWFzZUluT3V0IiwiX2Vhc2VFeHBvbmVudGlhbEluT2JqIiwiX2Vhc2VFeHBvbmVudGlhbE91dE9iaiIsImVhc2VFeHBvbmVudGlhbEluIiwiZWFzZUV4cG9uZW50aWFsT3V0IiwiX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqIiwiZWFzZUV4cG9uZW50aWFsSW5PdXQiLCJfZWFzZVNpbmVJbk9iaiIsImNvcyIsIlBJIiwiX2Vhc2VTaW5lT3V0T2JqIiwiZWFzZVNpbmVJbiIsInNpbiIsImVhc2VTaW5lT3V0IiwiX2Vhc2VTaW5lSW5PdXRPYmoiLCJlYXNlU2luZUluT3V0IiwiX2Vhc2VFbGFzdGljSW5PYmoiLCJfZWFzZUVsYXN0aWNPdXRPYmoiLCJlYXNlRWxhc3RpY0luIiwicGVyaW9kIiwiX3BlcmlvZCIsImVhc2VFbGFzdGljT3V0IiwiZWFzZUVsYXN0aWNJbk91dCIsIm5ld1QiLCJsb2NQZXJpb2QiLCJzIiwiX2JvdW5jZVRpbWUiLCJ0aW1lMSIsIl9lYXNlQm91bmNlSW5PYmoiLCJfZWFzZUJvdW5jZU91dE9iaiIsImVhc2VCb3VuY2VJbiIsImVhc2VCb3VuY2VPdXQiLCJfZWFzZUJvdW5jZUluT3V0T2JqIiwiZWFzZUJvdW5jZUluT3V0IiwiX2Vhc2VCYWNrSW5PYmoiLCJvdmVyc2hvb3QiLCJfZWFzZUJhY2tPdXRPYmoiLCJlYXNlQmFja0luIiwiZWFzZUJhY2tPdXQiLCJfZWFzZUJhY2tJbk91dE9iaiIsImVhc2VCYWNrSW5PdXQiLCJlYXNlQmV6aWVyQWN0aW9uIiwiYSIsImIiLCJjIiwiZCIsInQiLCJfZWFzZVF1YWRyYXRpY0FjdGlvbkluIiwidGltZSIsImVhc2VRdWFkcmF0aWNBY3Rpb25JbiIsIl9lYXNlUXVhZHJhdGljQWN0aW9uT3V0IiwiZWFzZVF1YWRyYXRpY0FjdGlvbk91dCIsIl9lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQiLCJyZXN1bHRUaW1lIiwiZWFzZVF1YWRyYXRpY0FjdGlvbkluT3V0IiwiX2Vhc2VRdWFydGljQWN0aW9uSW4iLCJlYXNlUXVhcnRpY0FjdGlvbkluIiwiX2Vhc2VRdWFydGljQWN0aW9uT3V0IiwiZWFzZVF1YXJ0aWNBY3Rpb25PdXQiLCJfZWFzZVF1YXJ0aWNBY3Rpb25Jbk91dCIsImVhc2VRdWFydGljQWN0aW9uSW5PdXQiLCJfZWFzZVF1aW50aWNBY3Rpb25JbiIsImVhc2VRdWludGljQWN0aW9uSW4iLCJfZWFzZVF1aW50aWNBY3Rpb25PdXQiLCJlYXNlUXVpbnRpY0FjdGlvbk91dCIsIl9lYXNlUXVpbnRpY0FjdGlvbkluT3V0IiwiZWFzZVF1aW50aWNBY3Rpb25Jbk91dCIsIl9lYXNlQ2lyY2xlQWN0aW9uSW4iLCJzcXJ0IiwiZWFzZUNpcmNsZUFjdGlvbkluIiwiX2Vhc2VDaXJjbGVBY3Rpb25PdXQiLCJlYXNlQ2lyY2xlQWN0aW9uT3V0IiwiX2Vhc2VDaXJjbGVBY3Rpb25Jbk91dCIsImVhc2VDaXJjbGVBY3Rpb25Jbk91dCIsIl9lYXNlQ3ViaWNBY3Rpb25JbiIsImVhc2VDdWJpY0FjdGlvbkluIiwiX2Vhc2VDdWJpY0FjdGlvbk91dCIsImVhc2VDdWJpY0FjdGlvbk91dCIsIl9lYXNlQ3ViaWNBY3Rpb25Jbk91dCIsImVhc2VDdWJpY0FjdGlvbkluT3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QkFBUDtBQUNIO0FBVnVCLENBQTVCOztBQVlBeEYsRUFBRSxDQUFDeUYsb0JBQUgsR0FBMEIsWUFBVTtBQUNoQyxTQUFPRCxxQkFBUDtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3Qgd2l0aCB0aGUgcmF0ZSBwYXJhbWV0ZXIuIDxiciAvPlxyXG4gKiBGcm9tIHNsb3cgdG8gZmFzdC5cclxuICogISN6aCDliJvlu7ogZWFzZUluIOe8k+WKqOWvueixoe+8jOeUseaFouWIsOW/q+OAglxyXG4gKiBAbWV0aG9kIGVhc2VJblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmF0ZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDMuMCkpO1xyXG4gKi9cclxuY2MuZWFzZUluID0gZnVuY3Rpb24gKHJhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX3JhdGU6IHJhdGUsXHJcbiAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KGR0LCB0aGlzLl9yYXRlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5lYXNlSW4oMSAvIHRoaXMuX3JhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdCB3aXRoIHRoZSByYXRlIHBhcmFtZXRlci4gPGJyIC8+XHJcbiAqIEZyb20gZmFzdCB0byBzbG93LlxyXG4gKiAhI3poIOWIm+W7uiBlYXNlT3V0IOe8k+WKqOWvueixoe+8jOeUseW/q+WIsOaFouOAglxyXG4gKiBAbWV0aG9kIGVhc2VPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhdGVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VPdXQoMy4wKSk7XHJcbiAqL1xyXG5jYy5lYXNlT3V0ID0gZnVuY3Rpb24gKHJhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX3JhdGU6IHJhdGUsXHJcbiAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucG93KGR0LCAxIC8gdGhpcy5fcmF0ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuZWFzZU91dCgxIC8gdGhpcy5fcmF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHJhdGUgcGFyYW1ldGVyLiA8YnIgLz5cclxuICogU2xvdyB0byBmYXN0IHRoZW4gdG8gc2xvdy5cclxuICogISN6aCDliJvlu7ogZWFzZUluT3V0IOe8k+WKqOWvueixoe+8jOaFouWIsOW/q++8jOeEtuWQjuaFouOAglxyXG4gKiBAbWV0aG9kIGVhc2VJbk91dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmF0ZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUluT3V0KDMuMCkpO1xyXG4gKi9cclxuY2MuZWFzZUluT3V0ID0gZnVuY3Rpb24gKHJhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX3JhdGU6IHJhdGUsXHJcbiAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgZHQgKj0gMjtcclxuICAgICAgICAgICAgaWYgKGR0IDwgMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdyhkdCwgdGhpcy5fcmF0ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiAxLjAgLSAwLjUgKiBNYXRoLnBvdygyIC0gZHQsIHRoaXMuX3JhdGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmVhc2VJbk91dCh0aGlzLl9yYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3Qgd2l0aCB0aGUgcmF0ZSBwYXJhbWV0ZXIuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZUluRXhwbzogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlRXhwb25lbnRpYWxJbiDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUV4cG9uZW50aWFsSW4g5piv5oyJ5oyH5pWw5Ye95pWw57yT5Yqo6L+b5YWl55qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5FeHBv77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZUV4cG9uZW50aWFsSW5cclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VFeHBvbmVudGlhbEluKCkpO1xyXG4gKi9cclxudmFyIF9lYXNlRXhwb25lbnRpYWxJbk9iaiA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIHJldHVybiBkdCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqIChkdCAtIDEpKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsT3V0T2JqO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlRXhwb25lbnRpYWxJbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZU91dEV4cG86IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUV4cG9uZW50aWFsT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlRXhwb25lbnRpYWxPdXQg5piv5oyJ5oyH5pWw5Ye95pWw57yT5Yqo6YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlT3V0RXhwb++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VFeHBvbmVudGlhbE91dFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUV4cG9uZW50aWFsT3V0KCkpO1xyXG4gKi9cclxudmFyIF9lYXNlRXhwb25lbnRpYWxPdXRPYmogPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICByZXR1cm4gZHQgPT09IDEgPyAxIDogKC0oTWF0aC5wb3coMiwgLTEwICogZHQpKSArIDEpO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlRXhwb25lbnRpYWxJbk9iajtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZUV4cG9uZW50aWFsT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUV4cG9uZW50aWFsT3V0T2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyBhbiBFYXNlRXhwb25lbnRpYWxJbk91dCBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRFeHBvOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VFeHBvbmVudGlhbEluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlRXhwb25lbnRpYWxJbk91dCDmmK/mjInmjIfmlbDlh73mlbDnvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cclxuICog5Y+C6ICDIGVhc2VJbk91dEV4cG/vvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlRXhwb25lbnRpYWxJbk91dFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUV4cG9uZW50aWFsSW5PdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaWYoIGR0ICE9PSAxICYmIGR0ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGR0ICo9IDI7XHJcbiAgICAgICAgICAgIGlmIChkdCA8IDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogTWF0aC5wb3coMiwgMTAgKiAoZHQgLSAxKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIChkdCAtIDEpKSArIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZHQ7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlRXhwb25lbnRpYWxJbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VFeHBvbmVudGlhbEluT3V0T2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyBhbiBFYXNlU2luZUluIGFjdGlvbi4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5TaW5lOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IEVhc2VTaW5lSW4g57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VTaW5lSW4g5piv5oyJ5q2j5bym5Ye95pWw57yT5Yqo6L+b5YWl55qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5TaW5l77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZVNpbmVJblxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVNpbmVJbigpKTtcclxuICovXHJcbnZhciBfZWFzZVNpbmVJbk9iaiA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIHJldHVybiAoZHQ9PT0wIHx8IGR0PT09MSkgPyBkdCA6IC0xICogTWF0aC5jb3MoZHQgKiBNYXRoLlBJIC8gMikgKyAxO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlU2luZU91dE9iajtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZVNpbmVJbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VTaW5lSW5PYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIGFuIEVhc2VTaW5lT3V0IGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VPdXRTaW5lOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IEVhc2VTaW5lT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlU2luZUluIOaYr+aMieato+W8puWHveaVsOe8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZU91dFNpbmXvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlU2luZU91dFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVNpbmVPdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VTaW5lT3V0T2JqID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgcmV0dXJuIChkdD09PTAgfHwgZHQ9PT0xKSA/IGR0IDogTWF0aC5zaW4oZHQgKiBNYXRoLlBJIC8gMik7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VTaW5lSW5PYmo7XHJcbiAgICB9XHJcbn07XHJcbmNjLmVhc2VTaW5lT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZVNpbmVPdXRPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRTaW5lOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VTaW5lSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VTaW5lSW4g5piv5oyJ5q2j5bym5Ye95pWw57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5PdXRTaW5l77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZVNpbmVJbk91dFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVNpbmVJbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZVNpbmVJbk91dE9iaiA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgIHJldHVybiAoZHQgPT09IDAgfHwgZHQgPT09IDEpID8gZHQgOiAtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiBkdCkgLSAxKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZVNpbmVJbk91dE9iajtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZVNpbmVJbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VTaW5lSW5PdXRPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHBlcmlvZCBpbiByYWRpYW5zIChkZWZhdWx0IGlzIDAuMykuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZUluRWxhc3RpYzogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlRWxhc3RpY0luIOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlRWxhc3RpY0luIOaYr+aMieW8ueaAp+absue6v+e8k+WKqOi/m+WFpeeahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LmlbAgZWFzZUluRWxhc3RpY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VFbGFzdGljSW5cclxuICogQHBhcmFtIHtOdW1iZXJ9IHBlcmlvZFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlRWxhc3RpY0luKDMuMCkpO1xyXG4gKi9cclxuLy9kZWZhdWx0IGVhc2UgZWxhc3RpYyBpbiBvYmplY3QgKHBlcmlvZCA9IDAuMylcclxudmFyIF9lYXNlRWxhc3RpY0luT2JqID0ge1xyXG4gICAgZWFzaW5nOmZ1bmN0aW9uKGR0KXtcclxuICAgICAgICBpZiAoZHQgPT09IDAgfHwgZHQgPT09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiBkdDtcclxuICAgICAgICBkdCA9IGR0IC0gMTtcclxuICAgICAgICByZXR1cm4gLU1hdGgucG93KDIsIDEwICogZHQpICogTWF0aC5zaW4oKGR0IC0gKDAuMyAvIDQpKSAqIE1hdGguUEkgKiAyIC8gMC4zKTtcclxuICAgIH0sXHJcbiAgICAgcmV2ZXJzZTpmdW5jdGlvbigpe1xyXG4gICAgICAgICByZXR1cm4gX2Vhc2VFbGFzdGljT3V0T2JqO1xyXG4gICAgIH1cclxuIH07XHJcbmNjLmVhc2VFbGFzdGljSW4gPSBmdW5jdGlvbiAocGVyaW9kKSB7XHJcbiAgICBpZihwZXJpb2QgJiYgcGVyaW9kICE9PSAwLjMpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIF9wZXJpb2Q6IHBlcmlvZCxcclxuICAgICAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkdCA9PT0gMCB8fCBkdCA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHQ7XHJcbiAgICAgICAgICAgICAgICBkdCA9IGR0IC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtTWF0aC5wb3coMiwgMTAgKiBkdCkgKiBNYXRoLnNpbigoZHQgLSAodGhpcy5fcGVyaW9kIC8gNCkpICogTWF0aC5QSSAqIDIgLyB0aGlzLl9wZXJpb2QpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5lYXNlRWxhc3RpY091dCh0aGlzLl9wZXJpb2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBfZWFzZUVsYXN0aWNJbk9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0IHdpdGggdGhlIHBlcmlvZCBpbiByYWRpYW5zIChkZWZhdWx0IGlzIDAuMykuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZU91dEVsYXN0aWM6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUVsYXN0aWNPdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VFbGFzdGljT3V0IOaYr+aMieW8ueaAp+absue6v+e8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZU91dEVsYXN0aWPvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlRWxhc3RpY091dFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyaW9kXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VFbGFzdGljT3V0KDMuMCkpO1xyXG4gKi9cclxuLy9kZWZhdWx0IGVhc2UgZWxhc3RpYyBvdXQgb2JqZWN0IChwZXJpb2QgPSAwLjMpXHJcbnZhciBfZWFzZUVsYXN0aWNPdXRPYmogPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHJldHVybiAoZHQgPT09IDAgfHwgZHQgPT09IDEpID8gZHQgOiBNYXRoLnBvdygyLCAtMTAgKiBkdCkgKiBNYXRoLnNpbigoZHQgLSAoMC4zIC8gNCkpICogTWF0aC5QSSAqIDIgLyAwLjMpICsgMTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlRWxhc3RpY0luT2JqO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlRWxhc3RpY091dCA9IGZ1bmN0aW9uIChwZXJpb2QpIHtcclxuICAgIGlmKHBlcmlvZCAmJiBwZXJpb2QgIT09IDAuMyl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgX3BlcmlvZDogcGVyaW9kLFxyXG4gICAgICAgICAgICBlYXNpbmc6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkdCA9PT0gMCB8fCBkdCA9PT0gMSkgPyBkdCA6IE1hdGgucG93KDIsIC0xMCAqIGR0KSAqIE1hdGguc2luKChkdCAtICh0aGlzLl9wZXJpb2QgLyA0KSkgKiBNYXRoLlBJICogMiAvIHRoaXMuX3BlcmlvZCkgKyAxO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZlcnNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuZWFzZUVsYXN0aWNJbih0aGlzLl9wZXJpb2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBfZWFzZUVsYXN0aWNPdXRPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdCB3aXRoIHRoZSBwZXJpb2QgaW4gcmFkaWFucyAoZGVmYXVsdCBpcyAwLjMpLiA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VJbk91dEVsYXN0aWM6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUVsYXN0aWNJbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUVsYXN0aWNJbk91dCDmmK/mjInlvLnmgKfmm7Lnur/nvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cclxuICog5Y+C6ICDIGVhc2VJbk91dEVsYXN0aWPvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlRWxhc3RpY0luT3V0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwZXJpb2RcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUVsYXN0aWNJbk91dCgzLjApKTtcclxuICovXHJcbmNjLmVhc2VFbGFzdGljSW5PdXQgPSBmdW5jdGlvbiAocGVyaW9kKSB7XHJcbiAgICBwZXJpb2QgPSBwZXJpb2QgfHwgMC4zO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBfcGVyaW9kOiBwZXJpb2QsXHJcbiAgICAgICAgZWFzaW5nOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1QgPSAwO1xyXG4gICAgICAgICAgICB2YXIgbG9jUGVyaW9kID0gdGhpcy5fcGVyaW9kO1xyXG4gICAgICAgICAgICBpZiAoZHQgPT09IDAgfHwgZHQgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIG5ld1QgPSBkdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGR0ID0gZHQgKiAyO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsb2NQZXJpb2QpXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jUGVyaW9kID0gdGhpcy5fcGVyaW9kID0gMC4zICogMS41O1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBsb2NQZXJpb2QgLyA0O1xyXG4gICAgICAgICAgICAgICAgZHQgPSBkdCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHQgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1QgPSAtMC41ICogTWF0aC5wb3coMiwgMTAgKiBkdCkgKiBNYXRoLnNpbigoZHQgLSBzKSAqIE1hdGguUEkgKiAyIC8gbG9jUGVyaW9kKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBuZXdUID0gTWF0aC5wb3coMiwgLTEwICogZHQpICogTWF0aC5zaW4oKGR0IC0gcykgKiBNYXRoLlBJICogMiAvIGxvY1BlcmlvZCkgKiAwLjUgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdUO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmVhc2VFbGFzdGljSW5PdXQodGhpcy5fcGVyaW9kKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG5mdW5jdGlvbiBfYm91bmNlVGltZSAodGltZTEpIHtcclxuICAgIGlmICh0aW1lMSA8IDEgLyAyLjc1KSB7XHJcbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHRpbWUxICogdGltZTE7XHJcbiAgICB9IGVsc2UgaWYgKHRpbWUxIDwgMiAvIDIuNzUpIHtcclxuICAgICAgICB0aW1lMSAtPSAxLjUgLyAyLjc1O1xyXG4gICAgICAgIHJldHVybiA3LjU2MjUgKiB0aW1lMSAqIHRpbWUxICsgMC43NTtcclxuICAgIH0gZWxzZSBpZiAodGltZTEgPCAyLjUgLyAyLjc1KSB7XHJcbiAgICAgICAgdGltZTEgLT0gMi4yNSAvIDIuNzU7XHJcbiAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHRpbWUxICogdGltZTEgKyAwLjkzNzU7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZTEgLT0gMi42MjUgLyAyLjc1O1xyXG4gICAgcmV0dXJuIDcuNTYyNSAqIHRpbWUxICogdGltZTEgKyAwLjk4NDM3NTtcclxufTtcclxuXHJcbnZhciBfZWFzZUJvdW5jZUluT2JqID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgcmV0dXJuIDEgLSBfYm91bmNlVGltZSgxIC0gZHQpO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlQm91bmNlT3V0T2JqO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBFYXNlZCBib3VuY2UgZWZmZWN0IGF0IHRoZSBiZWdpbm5pbmcuXHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VCb3VuY2VJbiDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUJvdW5jZUluIOaYr+aMieW8uei3s+WKqOS9nOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAglxyXG4gKiBAbWV0aG9kIGVhc2VCb3VuY2VJblxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQm91bmNlSW4oKSk7XHJcbiAqL1xyXG5jYy5lYXNlQm91bmNlSW4gPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQm91bmNlSW5PYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIEVhc2VkIGJvdW5jZSBlZmZlY3QgYXQgdGhlIGVuZGluZy5cclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUJvdW5jZU91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUJvdW5jZU91dCDmmK/mjInlvLnot7PliqjkvZznvJPliqjpgIDlh7rnmoTliqjkvZzjgIJcclxuICogQG1ldGhvZCBlYXNlQm91bmNlT3V0XHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCb3VuY2VPdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VCb3VuY2VPdXRPYmogPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKGR0KXtcclxuICAgICAgICByZXR1cm4gX2JvdW5jZVRpbWUoZHQpO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfZWFzZUJvdW5jZUluT2JqO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQm91bmNlT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUJvdW5jZU91dE9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogRWFzZWQgYm91bmNlIGVmZmVjdCBhdCB0aGUgYmVnaW5pbmcgYW5kIGVuZGluZy5cclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUJvdW5jZUluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlQm91bmNlSW5PdXQg5piv5oyJ5by56Lez5Yqo5L2c57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCXHJcbiAqIEBtZXRob2QgZWFzZUJvdW5jZUluT3V0XHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCb3VuY2VJbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZUJvdW5jZUluT3V0T2JqID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbiAodGltZTEpIHtcclxuICAgICAgICB2YXIgbmV3VDtcclxuICAgICAgICBpZiAodGltZTEgPCAwLjUpIHtcclxuICAgICAgICAgICAgdGltZTEgPSB0aW1lMSAqIDI7XHJcbiAgICAgICAgICAgIG5ld1QgPSAoMSAtIF9ib3VuY2VUaW1lKDEgLSB0aW1lMSkpICogMC41O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1QgPSBfYm91bmNlVGltZSh0aW1lMSAqIDIgLSAxKSAqIDAuNSArIDAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1Q7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VCb3VuY2VJbk91dE9iajtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZUJvdW5jZUluT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUJvdW5jZUluT3V0T2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBJbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uIHRvIG1vdmUgc2xvd2x5LCBhbmQgdGhlbiBhY2NlbGVyYXRlZCB0byB0aGUgcmlnaHQgZGlyZWN0aW9uLlxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlQmFja0luIOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBlYXNlQmFja0luIOaYr+WcqOebuOWPjeeahOaWueWQkee8k+aFouenu+WKqO+8jOeEtuWQjuWKoOmAn+WIsOato+ehrueahOaWueWQkeOAgjxiciAvPlxyXG4gKiBAbWV0aG9kIGVhc2VCYWNrSW5cclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUJhY2tJbigpKTtcclxuICovXHJcbnZhciBfZWFzZUJhY2tJbk9iaiA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24gKHRpbWUxKSB7XHJcbiAgICAgICAgdmFyIG92ZXJzaG9vdCA9IDEuNzAxNTg7XHJcbiAgICAgICAgcmV0dXJuICh0aW1lMT09PTAgfHwgdGltZTE9PT0xKSA/IHRpbWUxIDogdGltZTEgKiB0aW1lMSAqICgob3ZlcnNob290ICsgMSkgKiB0aW1lMSAtIG92ZXJzaG9vdCk7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VCYWNrT3V0T2JqO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQmFja0luID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUJhY2tJbk9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogRmFzdCBtb3ZpbmcgbW9yZSB0aGFuIHRoZSBmaW5pc2gsIGFuZCB0aGVuIHNsb3dseSBiYWNrIHRvIHRoZSBmaW5pc2guXHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VCYWNrT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBlYXNlQmFja091dCDlv6vpgJ/np7vliqjotoXlh7rnm67moIfvvIznhLblkI7mhaLmhaLlm57liLDnm67moIfngrnjgIJcclxuICogQG1ldGhvZCBlYXNlQmFja091dFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQmFja091dCgpKTtcclxuICovXHJcbnZhciBfZWFzZUJhY2tPdXRPYmogPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uICh0aW1lMSkge1xyXG4gICAgICAgIGlmICh0aW1lMSA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG92ZXJzaG9vdCA9IDEuNzAxNTg7XHJcbiAgICAgICAgdGltZTEgPSB0aW1lMSAtIDE7XHJcbiAgICAgICAgcmV0dXJuIHRpbWUxICogdGltZTEgKiAoKG92ZXJzaG9vdCArIDEpICogdGltZTEgKyBvdmVyc2hvb3QpICsgMTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZUJhY2tJbk9iajtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZUJhY2tPdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQmFja091dE9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogQmVnaW5pbmcgb2YgY2MuRWFzZUJhY2tJbi4gRW5kaW5nIG9mIGNjLkVhc2VCYWNrT3V0LlxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlQmFja0luT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBAbWV0aG9kIGVhc2VCYWNrSW5PdXRcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUJhY2tJbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZUJhY2tJbk91dE9iaiA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24gKHRpbWUxKSB7XHJcbiAgICAgICAgdmFyIG92ZXJzaG9vdCA9IDEuNzAxNTggKiAxLjUyNTtcclxuICAgICAgICB0aW1lMSA9IHRpbWUxICogMjtcclxuICAgICAgICBpZiAodGltZTEgPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAodGltZTEgKiB0aW1lMSAqICgob3ZlcnNob290ICsgMSkgKiB0aW1lMSAtIG92ZXJzaG9vdCkpIC8gMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aW1lMSA9IHRpbWUxIC0gMjtcclxuICAgICAgICAgICAgcmV0dXJuICh0aW1lMSAqIHRpbWUxICogKChvdmVyc2hvb3QgKyAxKSAqIHRpbWUxICsgb3ZlcnNob290KSkgLyAyICsgMTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VCYWNrSW5PdXRPYmo7XHJcbiAgICB9XHJcbn07XHJcbmNjLmVhc2VCYWNrSW5PdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQmFja0luT3V0T2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBJbnRvIHRoZSA0IHJlZmVyZW5jZSBwb2ludC4gPGJyIC8+XHJcbiAqIFRvIGNhbGN1bGF0ZSB0aGUgbW90aW9uIGN1cnZlLlxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlQmV6aWVyQWN0aW9uIOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlQmV6aWVyQWN0aW9uIOaYr+aMiei0neWhnuWwlOabsue6v+e8k+WKqOeahOWKqOS9nOOAglxyXG4gKiBAbWV0aG9kIGVhc2VCZXppZXJBY3Rpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHAwIFRoZSBmaXJzdCBiZXppZXIgcGFyYW1ldGVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwMSBUaGUgc2Vjb25kIGJlemllciBwYXJhbWV0ZXJcclxuICogQHBhcmFtIHtOdW1iZXJ9IHAyIFRoZSB0aGlyZCBiZXppZXIgcGFyYW1ldGVyXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBwMyBUaGUgZm91cnRoIGJlemllciBwYXJhbWV0ZXJcclxuICogQHJldHVybnMge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VCZXppZXJBY3Rpb24oMC41LCAwLjUsIDEuMCwgMS4wKSk7XHJcbiAqL1xyXG5jYy5lYXNlQmV6aWVyQWN0aW9uID0gZnVuY3Rpb24oYSwgYiwgYywgZCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGVhc2luZzogZnVuY3Rpb24odCl7XHJcbiAgICAgICAgICAgIHJldHVybiAoTWF0aC5wb3coMS10LDMpICogYSArIDMqdCooTWF0aC5wb3coMS10LDIpKSpiICsgMypNYXRoLnBvdyh0LDIpKigxLXQpKmMgKyBNYXRoLnBvdyh0LDMpKmQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmVhc2VCZXppZXJBY3Rpb24oZCwgYywgYiwgYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VJblF1YWQ6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZVF1YWRyYXRpY0FjdGlvbkluIOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlUXVhZHJhdGljSW7mmK/mjInkuozmrKHlh73mlbDnvJPliqjov5vlhaXnmoTliqjkvZzjgII8YnIgLz5cclxuICog5Y+C6ICDIGVhc2VJblF1YWTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlUXVhZHJhdGljQWN0aW9uSW5cclxuICogQHJldHVybnMge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy9leGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZVF1YWRyYXRpY0FjdGlvbkluKCkpO1xyXG4gKi9cclxudmFyIF9lYXNlUXVhZHJhdGljQWN0aW9uSW4gPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHJldHVybiBNYXRoLnBvdyh0aW1lLCAyKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZVF1YWRyYXRpY0FjdGlvbkluO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlUXVhZHJhdGljQWN0aW9uSW4gPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlUXVhZHJhdGljQWN0aW9uSW47XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlT3V0UXVhZDogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlUXVhZHJhdGljQWN0aW9uT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlUXVhZHJhdGljT3V0IOaYr+aMieS6jOasoeWHveaVsOe8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZU91dFF1YWTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlUXVhZHJhdGljQWN0aW9uT3V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VRdWFkcmF0aWNBY3Rpb25PdXQgPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHJldHVybiAtdGltZSoodGltZS0yKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZVF1YWRyYXRpY0FjdGlvbk91dDtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZVF1YWRyYXRpY0FjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWFkcmF0aWNBY3Rpb25PdXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRRdWFkOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZVF1YWRyYXRpY0luT3V0IOaYr+aMieS6jOasoeWHveaVsOe8k+WKqOi/m+WFpeW5tumAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZUluT3V0UXVhZO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2V4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dCA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XHJcbiAgICAgICAgdmFyIHJlc3VsdFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIHRpbWUgKj0gMjtcclxuICAgICAgICBpZih0aW1lIDwgMSl7XHJcbiAgICAgICAgICAgIHJlc3VsdFRpbWUgPSB0aW1lICogdGltZSAqIDAuNTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLS10aW1lO1xyXG4gICAgICAgICAgICByZXN1bHRUaW1lID0gLTAuNSAqICggdGltZSAqICggdGltZSAtIDIgKSAtIDEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRUaW1lO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlUXVhZHJhdGljQWN0aW9uSW5PdXQ7XHJcbiAgICB9XHJcbn07XHJcbmNjLmVhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VJbnRRdWFydDogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlUXVhcnRpY0FjdGlvbkluIOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlUXVhcnRpY0luIOaYr+aMieWbm+asoeWHveaVsOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZUludFF1YXJ077yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZVF1YXJ0aWNBY3Rpb25JblxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2V4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVhcnRpY0FjdGlvbkluKCkpO1xyXG4gKi9cclxudmFyIF9lYXNlUXVhcnRpY0FjdGlvbkluID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICByZXR1cm4gdGltZSAqIHRpbWUgKiB0aW1lICogdGltZTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZVF1YXJ0aWNBY3Rpb25JbjtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZVF1YXJ0aWNBY3Rpb25JbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uSW47XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlT3V0UXVhcnQ6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZVF1YXJ0aWNBY3Rpb25PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VRdWFydGljT3V0IOaYr+aMieWbm+asoeWHveaVsOe8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZU91dFF1YXJ077yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZVF1YXJ0aWNBY3Rpb25PdXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy9leGFtcGxlXHJcbiAqIGFjdGlvbi5lYXNpbmcoY2MuUXVhcnRpY0FjdGlvbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZVF1YXJ0aWNBY3Rpb25PdXQgPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHRpbWUgLT0gMTtcclxuICAgICAgICByZXR1cm4gLSh0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lIC0gMSk7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uT3V0O1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlUXVhcnRpY0FjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uT3V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuICA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VJbk91dFF1YXJ0OiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VRdWFydGljQWN0aW9uSW5PdXQg57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VRdWFydGljSW5PdXQg5piv5oyJ5Zub5qyh5Ye95pWw57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5PdXRRdWFydO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VRdWFydGljQWN0aW9uSW5PdXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBfZWFzZVF1YXJ0aWNBY3Rpb25Jbk91dCA9IHtcclxuICAgIGVhc2luZzogZnVuY3Rpb24odGltZSl7XHJcbiAgICAgICAgdGltZSA9IHRpbWUqMjtcclxuICAgICAgICBpZiAodGltZSA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lO1xyXG4gICAgICAgIHRpbWUgLT0gMjtcclxuICAgICAgICByZXR1cm4gLTAuNSAqICh0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lIC0gMik7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VRdWFydGljQWN0aW9uSW5PdXQ7XHJcbiAgICB9XHJcbn07XHJcbmNjLmVhc2VRdWFydGljQWN0aW9uSW5PdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlUXVhcnRpY0FjdGlvbkluT3V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZUluUXVpbnQ6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZVF1aW50aWNBY3Rpb25JbiDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZVF1aW50aWNJbiDmmK/mjInkupTmrKHlh73mlbDnvJPliqjov5vnmoTliqjkvZzjgII8YnIgLz5cclxuICog5Y+C6ICDIGVhc2VJblF1aW5077yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZVF1aW50aWNBY3Rpb25JblxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2V4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlUXVpbnRpY0FjdGlvbkluKCkpO1xyXG4gKi9cclxudmFyIF9lYXNlUXVpbnRpY0FjdGlvbkluID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICByZXR1cm4gdGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWU7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uSW47XHJcbiAgICB9XHJcbn07XHJcbmNjLmVhc2VRdWludGljQWN0aW9uSW4gPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlUXVpbnRpY0FjdGlvbkluO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZU91dFF1aW50OiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VRdWludGljQWN0aW9uT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlUXVpbnRpY091dCDmmK/mjInkupTmrKHlh73mlbDnvJPliqjpgIDlh7rnmoTliqjkvZxcclxuICog5Y+C6ICDIGVhc2VPdXRRdWludO+8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VRdWludGljQWN0aW9uT3V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VRdWludGljQWN0aW9uT3V0ID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICB0aW1lIC09MTtcclxuICAgICAgICByZXR1cm4gKHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lICsgMSk7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uT3V0O1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlUXVpbnRpY0FjdGlvbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uT3V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZUluT3V0UXVpbnQ6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZVF1aW50aWNBY3Rpb25Jbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZVF1aW50aWNJbk91dOaYr+aMieS6lOasoeWHveaVsOe8k+WKqOi/m+WFpeW5tumAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZUluT3V0UXVpbnTvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlUXVpbnRpY0FjdGlvbkluT3V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VRdWludGljQWN0aW9uSW5PdXQoKSk7XHJcbiAqL1xyXG52YXIgX2Vhc2VRdWludGljQWN0aW9uSW5PdXQgPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHRpbWUgPSB0aW1lKjI7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWU7XHJcbiAgICAgICAgdGltZSAtPSAyO1xyXG4gICAgICAgIHJldHVybiAwLjUgKiAodGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKyAyKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZVF1aW50aWNBY3Rpb25Jbk91dDtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZVF1aW50aWNBY3Rpb25Jbk91dCA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VRdWludGljQWN0aW9uSW5PdXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5DaXJjOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VDaXJjbGVBY3Rpb25JbiDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUNpcmNsZUlu5piv5oyJ5ZyG5b2i5puy57q/57yT5Yqo6L+b5YWl55qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5DaXJj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZUNpcmNsZUFjdGlvbkluXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25JbigpKTtcclxuICovXHJcbnZhciBfZWFzZUNpcmNsZUFjdGlvbkluID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICByZXR1cm4gLTEgKiAoTWF0aC5zcXJ0KDEgLSB0aW1lICogdGltZSkgLSAxKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQ2lyY2xlQWN0aW9uSW4gPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQ2lyY2xlQWN0aW9uSW47XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlT3V0Q2lyYzogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlQ2lyY2xlQWN0aW9uT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlQ2lyY2xlT3V05piv5oyJ5ZyG5b2i5puy57q/57yT5Yqo6YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlT3V0Q2lyY++8mmh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiBAbWV0aG9kIGVhc2VDaXJjbGVBY3Rpb25PdXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICogQGV4YW1wbGVcclxuICogLy9leGFtcGxlXHJcbiAqIGFjdGlvbmVhc2luZyhjYy5lYXNlQ2lyY2xlQWN0aW9uT3V0KCkpO1xyXG4gKi9cclxudmFyIF9lYXNlQ2lyY2xlQWN0aW9uT3V0ID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICB0aW1lID0gdGltZSAtIDE7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gdGltZSAqIHRpbWUpO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlQ2lyY2xlQWN0aW9uT3V0O1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQ2lyY2xlQWN0aW9uT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbk91dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIGFjdGlvbiBlYXNpbmcgb2JqZWN0LiA8YnIgLz5cclxuICogUmVmZXJlbmNlIGVhc2VJbk91dENpcmM6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUNpcmNsZUFjdGlvbkluT3V0IOe8k+WKqOWvueixoeOAgjxiciAvPlxyXG4gKiBFYXNlQ2lyY2xlSW5PdXQg5piv5oyJ5ZyG5b2i5puy57q/57yT5Yqo6L+b5YWl5bm26YCA5Ye655qE5Yqo5L2c44CCPGJyIC8+XHJcbiAqIOWPguiAgyBlYXNlSW5PdXRDaXJj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZUNpcmNsZUFjdGlvbkluT3V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VDaXJjbGVBY3Rpb25Jbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZUNpcmNsZUFjdGlvbkluT3V0ID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICB0aW1lID0gdGltZSAqIDI7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHRpbWUgKiB0aW1lKSAtIDEpO1xyXG4gICAgICAgIHRpbWUgLT0gMjtcclxuICAgICAgICByZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gdGltZSAqIHRpbWUpICsgMSk7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VDaXJjbGVBY3Rpb25Jbk91dDtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZUNpcmNsZUFjdGlvbkluT3V0ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBfZWFzZUNpcmNsZUFjdGlvbkluT3V0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZUluQ3ViaWM6IDxiciAvPlxyXG4gKiBodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogISN6aFxyXG4gKiDliJvlu7ogZWFzZUN1YmljQWN0aW9uSW4g57yT5Yqo5a+56LGh44CCPGJyIC8+XHJcbiAqIEVhc2VDdWJpY0luIOaYr+aMieS4ieasoeWHveaVsOe8k+WKqOi/m+WFpeeahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZUluQ3ViaWPvvJpodHRwOi8vd3d3LnpoaWh1LmNvbS9xdWVzdGlvbi8yMTk4MTU3MS9hbnN3ZXIvMTk5MjU0MThcclxuICogQG1ldGhvZCBlYXNlQ3ViaWNBY3Rpb25JblxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2V4YW1wbGVcclxuICogYWN0aW9uLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcclxuICovXHJcbnZhciBfZWFzZUN1YmljQWN0aW9uSW4gPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHJldHVybiB0aW1lICogdGltZSAqIHRpbWU7XHJcbiAgICB9LFxyXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gX2Vhc2VDdWJpY0FjdGlvbkluO1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQ3ViaWNBY3Rpb25JbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gX2Vhc2VDdWJpY0FjdGlvbkluO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ3JlYXRlcyB0aGUgYWN0aW9uIGVhc2luZyBvYmplY3QuIDxiciAvPlxyXG4gKiBSZWZlcmVuY2UgZWFzZU91dEN1YmljOiA8YnIgLz5cclxuICogaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqICEjemhcclxuICog5Yib5bu6IGVhc2VDdWJpY0FjdGlvbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUN1YmljT3V0IOaYr+aMieS4ieasoeWHveaVsOe8k+WKqOmAgOWHuueahOWKqOS9nOOAgjxiciAvPlxyXG4gKiDlj4LogIMgZWFzZU91dEN1Ymlj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZUN1YmljQWN0aW9uT3V0XHJcbiAqIEByZXR1cm5zIHtPYmplY3R9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vZXhhbXBsZVxyXG4gKiBhY3Rpb24uZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcclxuICovXHJcbnZhciBfZWFzZUN1YmljQWN0aW9uT3V0ID0ge1xyXG4gICAgZWFzaW5nOiBmdW5jdGlvbih0aW1lKXtcclxuICAgICAgICB0aW1lIC09IDE7XHJcbiAgICAgICAgcmV0dXJuICh0aW1lICogdGltZSAqIHRpbWUgKyAxKTtcclxuICAgIH0sXHJcbiAgICByZXZlcnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBfZWFzZUN1YmljQWN0aW9uT3V0O1xyXG4gICAgfVxyXG59O1xyXG5jYy5lYXNlQ3ViaWNBY3Rpb25PdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQ3ViaWNBY3Rpb25PdXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGVzIHRoZSBhY3Rpb24gZWFzaW5nIG9iamVjdC4gPGJyIC8+XHJcbiAqIFJlZmVyZW5jZSBlYXNlSW5PdXRDdWJpYzogPGJyIC8+XHJcbiAqIGh0dHA6Ly93d3cuemhpaHUuY29tL3F1ZXN0aW9uLzIxOTgxNTcxL2Fuc3dlci8xOTkyNTQxOFxyXG4gKiAhI3poXHJcbiAqIOWIm+W7uiBlYXNlQ3ViaWNBY3Rpb25Jbk91dCDnvJPliqjlr7nosaHjgII8YnIgLz5cclxuICogRWFzZUN1YmljSW5PdXTmmK/mjInkuInmrKHlh73mlbDnvJPliqjov5vlhaXlubbpgIDlh7rnmoTliqjkvZzjgII8YnIgLz5cclxuICog5Y+C6ICDIGVhc2VJbk91dEN1Ymlj77yaaHR0cDovL3d3dy56aGlodS5jb20vcXVlc3Rpb24vMjE5ODE1NzEvYW5zd2VyLzE5OTI1NDE4XHJcbiAqIEBtZXRob2QgZWFzZUN1YmljQWN0aW9uSW5PdXRcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbnZhciBfZWFzZUN1YmljQWN0aW9uSW5PdXQgPSB7XHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uKHRpbWUpe1xyXG4gICAgICAgIHRpbWUgPSB0aW1lKjI7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAxKVxyXG4gICAgICAgICAgICByZXR1cm4gMC41ICogdGltZSAqIHRpbWUgKiB0aW1lO1xyXG4gICAgICAgIHRpbWUgLT0gMjtcclxuICAgICAgICByZXR1cm4gMC41ICogKHRpbWUgKiB0aW1lICogdGltZSArIDIpO1xyXG4gICAgfSxcclxuICAgIHJldmVyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIF9lYXNlQ3ViaWNBY3Rpb25Jbk91dDtcclxuICAgIH1cclxufTtcclxuY2MuZWFzZUN1YmljQWN0aW9uSW5PdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIF9lYXNlQ3ViaWNBY3Rpb25Jbk91dDtcclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9