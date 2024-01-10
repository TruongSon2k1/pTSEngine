
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-state.js';
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
var js = cc.js;

var Playable = require('./playable');

var Types = require('./types');

var WrappedInfo = Types.WrappedInfo;
var WrapMode = Types.WrapMode;
var WrapModeMask = Types.WrapModeMask;
/**
 * !#en
 * The AnimationState gives full control over animation playback process.
 * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
 * !#zh
 * AnimationState 完全控制动画播放过程。<br/>
 * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
 * @class AnimationState
 * @extends Playable
 *
 */

/**
 * @method constructor
 * @param {AnimationClip} clip
 * @param {String} [name]
 */

function AnimationState(clip, name) {
  Playable.call(this); // Mark whether the current frame is played.
  // When set new time to animation state, we should ensure the frame at the specified time being played at next update.

  this._currentFramePlayed = false;
  this._delay = 0;
  this._delayTime = 0;
  this._wrappedInfo = new WrappedInfo();
  this._lastWrappedInfo = null;
  this._process = process;
  this._clip = clip;
  this._name = name || clip && clip.name;
  /**
   * @property animator
   * @type {AnimationAnimator}
   * @private
   */

  this.animator = null;
  /**
   * !#en The curves list.
   * !#zh 曲线列表。
   * @property curves
   * @type {Object[]}
   */

  this.curves = []; // http://www.w3.org/TR/web-animations/#idl-def-AnimationTiming

  /**
   * !#en The start delay which represents the number of seconds from an animation's start time to the start of
   * the active interval.
   * !#zh 延迟多少秒播放。
   *
   * @property delay
   * @type {Number}
   * @default 0
   */

  this.delay = 0;
  /**
   * !#en The animation's iteration count property.
   *
   * A real number greater than or equal to zero (including positive infinity) representing the number of times
   * to repeat the animation node.
   *
   * Values less than zero and NaN values are treated as the value 1.0 for the purpose of timing model
   * calculations.
   *
   * !#zh 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）
   *
   * @property repeatCount
   * @type {Number}
   * @default 1
   */

  this.repeatCount = 1;
  /**
   * !#en The iteration duration of this animation in seconds. (length)
   * !#zh 单次动画的持续时间，秒。
   *
   * @property duration
   * @type {Number}
   * @readOnly
   */

  this.duration = 1;
  /**
   * !#en The animation's playback speed. 1 is normal playback speed.
   * !#zh 播放速率。
   * @property speed
   * @type {Number}
   * @default: 1.0
   */

  this.speed = 1;
  /**
   * !#en
   * Wrapping mode of the playing animation.
   * Notice : dynamic change wrapMode will reset time and repeatCount property
   * !#zh
   * 动画循环方式。
   * 需要注意的是，动态修改 wrapMode 时，会重置 time 以及 repeatCount
   *
   * @property wrapMode
   * @type {WrapMode}
   * @default: WrapMode.Normal
   */

  this.wrapMode = WrapMode.Normal;
  /**
   * !#en The current time of this animation in seconds.
   * !#zh 动画当前的时间，秒。
   * @property time
   * @type {Number}
   * @default 0
   */

  this.time = 0; // Animation as event target

  this._target = null;
  this._lastframeEventOn = false;

  this.emit = function () {
    var args = new Array(arguments.length);

    for (var i = 0, l = args.length; i < l; i++) {
      args[i] = arguments[i];
    }

    cc.director.getAnimationManager().pushDelayEvent(this, '_emit', args);
  };
}

js.extend(AnimationState, Playable);
var proto = AnimationState.prototype;

proto._emit = function (type, state) {
  if (this._target && this._target.isValid) {
    this._target.emit(type, type, state);
  }
};

proto.on = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      this._lastframeEventOn = true;
    }

    return this._target.on(type, callback, target);
  } else {
    return null;
  }
};

proto.once = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      this._lastframeEventOn = true;
    }

    var self = this;
    return this._target.once(type, function (event) {
      callback.call(target, event);
      self._lastframeEventOn = false;
    });
  } else {
    return null;
  }
};

proto.off = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      if (!this._target.hasEventListener(type)) {
        this._lastframeEventOn = false;
      }
    }

    this._target.off(type, callback, target);
  }
};

proto._setEventTarget = function (target) {
  this._target = target;
};

proto.onPlay = function () {
  // replay
  this.setTime(0);
  this._delayTime = this._delay;
  cc.director.getAnimationManager().addAnimation(this);

  if (this.animator) {
    this.animator.addAnimation(this);
  }

  this.emit('play', this);
};

proto.onStop = function () {
  if (!this.isPaused) {
    cc.director.getAnimationManager().removeAnimation(this);
  }

  if (this.animator) {
    this.animator.removeAnimation(this);
  }

  this.emit('stop', this);
};

proto.onResume = function () {
  cc.director.getAnimationManager().addAnimation(this);
  this.emit('resume', this);
};

proto.onPause = function () {
  cc.director.getAnimationManager().removeAnimation(this);
  this.emit('pause', this);
};

proto.setTime = function (time) {
  this._currentFramePlayed = false;
  this.time = time || 0;
  var curves = this.curves;

  for (var i = 0, l = curves.length; i < l; i++) {
    var curve = curves[i];

    if (curve.onTimeChangedManually) {
      curve.onTimeChangedManually(time, this);
    }
  }
};

function process() {
  // sample
  var info = this.sample();

  if (this._lastframeEventOn) {
    var lastInfo;

    if (!this._lastWrappedInfo) {
      lastInfo = this._lastWrappedInfo = new WrappedInfo(info);
    } else {
      lastInfo = this._lastWrappedInfo;
    }

    if (this.repeatCount > 1 && (info.iterations | 0) > (lastInfo.iterations | 0)) {
      this.emit('lastframe', this);
    }

    lastInfo.set(info);
  }

  if (info.stopped) {
    this.stop();
    this.emit('finished', this);
  }
}

function simpleProcess() {
  var time = this.time;
  var duration = this.duration;

  if (time > duration) {
    time = time % duration;
    if (time === 0) time = duration;
  } else if (time < 0) {
    time = time % duration;
    if (time !== 0) time += duration;
  }

  var ratio = time / duration;
  var curves = this.curves;

  for (var i = 0, len = curves.length; i < len; i++) {
    var curve = curves[i];
    curve.sample(time, ratio, this);
  }

  if (this._lastframeEventOn) {
    if (this._lastIterations === undefined) {
      this._lastIterations = ratio;
    }

    if (this.time > 0 && this._lastIterations > ratio || this.time < 0 && this._lastIterations < ratio) {
      this.emit('lastframe', this);
    }

    this._lastIterations = ratio;
  }
}

proto.update = function (delta) {
  // calculate delay time
  if (this._delayTime > 0) {
    this._delayTime -= delta;

    if (this._delayTime > 0) {
      // still waiting
      return;
    }
  } // make first frame perfect
  //var playPerfectFirstFrame = (this.time === 0);


  if (this._currentFramePlayed) {
    this.time += delta * this.speed;
  } else {
    this._currentFramePlayed = true;
  }

  this._process();
};

proto._needRevers = function (currentIterations) {
  var wrapMode = this.wrapMode;
  var needRevers = false;

  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
    var isEnd = currentIterations - (currentIterations | 0) === 0;

    if (isEnd && currentIterations > 0) {
      currentIterations -= 1;
    }

    var isOddIteration = currentIterations & 1;

    if (isOddIteration) {
      needRevers = !needRevers;
    }
  }

  if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
    needRevers = !needRevers;
  }

  return needRevers;
};

proto.getWrappedInfo = function (time, info) {
  info = info || new WrappedInfo();
  var stopped = false;
  var duration = this.duration;
  var repeatCount = this.repeatCount;
  var currentIterations = time > 0 ? time / duration : -(time / duration);

  if (currentIterations >= repeatCount) {
    currentIterations = repeatCount;
    stopped = true;
    var tempRatio = repeatCount - (repeatCount | 0);

    if (tempRatio === 0) {
      tempRatio = 1; // 如果播放过，动画不复位
    }

    time = tempRatio * duration * (time > 0 ? 1 : -1);
  }

  if (time > duration) {
    var tempTime = time % duration;
    time = tempTime === 0 ? duration : tempTime;
  } else if (time < 0) {
    time = time % duration;
    if (time !== 0) time += duration;
  }

  var needRevers = false;
  var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;

  if (shouldWrap) {
    needRevers = this._needRevers(currentIterations);
  }

  var direction = needRevers ? -1 : 1;

  if (this.speed < 0) {
    direction *= -1;
  } // calculate wrapped time


  if (shouldWrap && needRevers) {
    time = duration - time;
  }

  info.ratio = time / duration;
  info.time = time;
  info.direction = direction;
  info.stopped = stopped;
  info.iterations = currentIterations;
  return info;
};

proto.sample = function () {
  var info = this.getWrappedInfo(this.time, this._wrappedInfo);
  var curves = this.curves;

  for (var i = 0, len = curves.length; i < len; i++) {
    var curve = curves[i];
    curve.sample(info.time, info.ratio, this);
  }

  return info;
};
/**
 * !#en The clip that is being played by this animation state.
 * !#zh 此动画状态正在播放的剪辑。
 * @property clip
 * @type {AnimationClip}
 * @final
 */


js.get(proto, 'clip', function () {
  return this._clip;
});
/**
 * !#en The name of the playing animation.
 * !#zh 动画的名字
 * @property name
 * @type {String}
 * @readOnly
 */

js.get(proto, 'name', function () {
  return this._name;
});
js.obsolete(proto, 'AnimationState.length', 'duration');
js.getset(proto, 'curveLoaded', function () {
  return this.curves.length > 0;
}, function () {
  this.curves.length = 0;
});
js.getset(proto, 'wrapMode', function () {
  return this._wrapMode;
}, function (value) {
  this._wrapMode = value;
  if (CC_EDITOR) return; // dynamic change wrapMode will need reset time to 0

  this.time = 0;

  if (value & WrapModeMask.Loop) {
    this.repeatCount = Infinity;
  } else {
    this.repeatCount = 1;
  }
});
js.getset(proto, 'repeatCount', function () {
  return this._repeatCount;
}, function (value) {
  this._repeatCount = value;
  var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
  var reverse = (this.wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse;

  if (value === Infinity && !shouldWrap && !reverse) {
    this._process = simpleProcess;
  } else {
    this._process = process;
  }
});
js.getset(proto, 'delay', function () {
  return this._delay;
}, function (value) {
  this._delayTime = this._delay = value;
});
cc.AnimationState = module.exports = AnimationState;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcYW5pbWF0aW9uLXN0YXRlLmpzIl0sIm5hbWVzIjpbImpzIiwiY2MiLCJQbGF5YWJsZSIsInJlcXVpcmUiLCJUeXBlcyIsIldyYXBwZWRJbmZvIiwiV3JhcE1vZGUiLCJXcmFwTW9kZU1hc2siLCJBbmltYXRpb25TdGF0ZSIsImNsaXAiLCJuYW1lIiwiY2FsbCIsIl9jdXJyZW50RnJhbWVQbGF5ZWQiLCJfZGVsYXkiLCJfZGVsYXlUaW1lIiwiX3dyYXBwZWRJbmZvIiwiX2xhc3RXcmFwcGVkSW5mbyIsIl9wcm9jZXNzIiwicHJvY2VzcyIsIl9jbGlwIiwiX25hbWUiLCJhbmltYXRvciIsImN1cnZlcyIsImRlbGF5IiwicmVwZWF0Q291bnQiLCJkdXJhdGlvbiIsInNwZWVkIiwid3JhcE1vZGUiLCJOb3JtYWwiLCJ0aW1lIiwiX3RhcmdldCIsIl9sYXN0ZnJhbWVFdmVudE9uIiwiZW1pdCIsImFyZ3MiLCJBcnJheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImkiLCJsIiwiZGlyZWN0b3IiLCJnZXRBbmltYXRpb25NYW5hZ2VyIiwicHVzaERlbGF5RXZlbnQiLCJleHRlbmQiLCJwcm90byIsInByb3RvdHlwZSIsIl9lbWl0IiwidHlwZSIsInN0YXRlIiwiaXNWYWxpZCIsIm9uIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwic2VsZiIsImV2ZW50Iiwib2ZmIiwiaGFzRXZlbnRMaXN0ZW5lciIsIl9zZXRFdmVudFRhcmdldCIsIm9uUGxheSIsInNldFRpbWUiLCJhZGRBbmltYXRpb24iLCJvblN0b3AiLCJpc1BhdXNlZCIsInJlbW92ZUFuaW1hdGlvbiIsIm9uUmVzdW1lIiwib25QYXVzZSIsImN1cnZlIiwib25UaW1lQ2hhbmdlZE1hbnVhbGx5IiwiaW5mbyIsInNhbXBsZSIsImxhc3RJbmZvIiwiaXRlcmF0aW9ucyIsInNldCIsInN0b3BwZWQiLCJzdG9wIiwic2ltcGxlUHJvY2VzcyIsInJhdGlvIiwibGVuIiwiX2xhc3RJdGVyYXRpb25zIiwidW5kZWZpbmVkIiwidXBkYXRlIiwiZGVsdGEiLCJfbmVlZFJldmVycyIsImN1cnJlbnRJdGVyYXRpb25zIiwibmVlZFJldmVycyIsIlBpbmdQb25nIiwiaXNFbmQiLCJpc09kZEl0ZXJhdGlvbiIsIlJldmVyc2UiLCJnZXRXcmFwcGVkSW5mbyIsInRlbXBSYXRpbyIsInRlbXBUaW1lIiwic2hvdWxkV3JhcCIsIl93cmFwTW9kZSIsIlNob3VsZFdyYXAiLCJkaXJlY3Rpb24iLCJnZXQiLCJvYnNvbGV0ZSIsImdldHNldCIsInZhbHVlIiwiQ0NfRURJVE9SIiwiTG9vcCIsIkluZmluaXR5IiwiX3JlcGVhdENvdW50IiwicmV2ZXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxFQUFFLEdBQUdDLEVBQUUsQ0FBQ0QsRUFBWjs7QUFDQSxJQUFJRSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXRCOztBQUVBLElBQUlDLEtBQUssR0FBR0QsT0FBTyxDQUFDLFNBQUQsQ0FBbkI7O0FBQ0EsSUFBSUUsV0FBVyxHQUFHRCxLQUFLLENBQUNDLFdBQXhCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHRixLQUFLLENBQUNFLFFBQXJCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHSCxLQUFLLENBQUNHLFlBQXpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNDLGNBQVQsQ0FBeUJDLElBQXpCLEVBQStCQyxJQUEvQixFQUFxQztBQUNqQ1IsRUFBQUEsUUFBUSxDQUFDUyxJQUFULENBQWMsSUFBZCxFQURpQyxDQUdqQztBQUNBOztBQUNBLE9BQUtDLG1CQUFMLEdBQTJCLEtBQTNCO0FBRUEsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS0MsWUFBTCxHQUFvQixJQUFJVixXQUFKLEVBQXBCO0FBQ0EsT0FBS1csZ0JBQUwsR0FBd0IsSUFBeEI7QUFFQSxPQUFLQyxRQUFMLEdBQWdCQyxPQUFoQjtBQUVBLE9BQUtDLEtBQUwsR0FBYVYsSUFBYjtBQUNBLE9BQUtXLEtBQUwsR0FBYVYsSUFBSSxJQUFLRCxJQUFJLElBQUlBLElBQUksQ0FBQ0MsSUFBbkM7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtXLFFBQUwsR0FBZ0IsSUFBaEI7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsTUFBTCxHQUFjLEVBQWQsQ0EvQmlDLENBaUNqQzs7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtDLFFBQUwsR0FBZ0JyQixRQUFRLENBQUNzQixNQUF6QjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtDLElBQUwsR0FBWSxDQUFaLENBdkdpQyxDQXlHakM7O0FBQ0EsT0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxPQUFLQyxpQkFBTCxHQUF5QixLQUF6Qjs7QUFDQSxPQUFLQyxJQUFMLEdBQVksWUFBWTtBQUNwQixRQUFJQyxJQUFJLEdBQUcsSUFBSUMsS0FBSixDQUFVQyxTQUFTLENBQUNDLE1BQXBCLENBQVg7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdMLElBQUksQ0FBQ0csTUFBekIsRUFBaUNDLENBQUMsR0FBR0MsQ0FBckMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekNKLE1BQUFBLElBQUksQ0FBQ0ksQ0FBRCxDQUFKLEdBQVVGLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFuQjtBQUNIOztBQUNEcEMsSUFBQUEsRUFBRSxDQUFDc0MsUUFBSCxDQUFZQyxtQkFBWixHQUFrQ0MsY0FBbEMsQ0FBaUQsSUFBakQsRUFBdUQsT0FBdkQsRUFBZ0VSLElBQWhFO0FBQ0gsR0FORDtBQU9IOztBQUNEakMsRUFBRSxDQUFDMEMsTUFBSCxDQUFVbEMsY0FBVixFQUEwQk4sUUFBMUI7QUFFQSxJQUFJeUMsS0FBSyxHQUFHbkMsY0FBYyxDQUFDb0MsU0FBM0I7O0FBRUFELEtBQUssQ0FBQ0UsS0FBTixHQUFjLFVBQVVDLElBQVYsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQ2pDLE1BQUksS0FBS2pCLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFha0IsT0FBakMsRUFBMEM7QUFDdEMsU0FBS2xCLE9BQUwsQ0FBYUUsSUFBYixDQUFrQmMsSUFBbEIsRUFBd0JBLElBQXhCLEVBQThCQyxLQUE5QjtBQUNIO0FBQ0osQ0FKRDs7QUFNQUosS0FBSyxDQUFDTSxFQUFOLEdBQVcsVUFBVUgsSUFBVixFQUFnQkksUUFBaEIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQ3pDLE1BQUksS0FBS3JCLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFha0IsT0FBakMsRUFBMEM7QUFDdEMsUUFBSUYsSUFBSSxLQUFLLFdBQWIsRUFBMEI7QUFDdEIsV0FBS2YsaUJBQUwsR0FBeUIsSUFBekI7QUFDSDs7QUFDRCxXQUFPLEtBQUtELE9BQUwsQ0FBYW1CLEVBQWIsQ0FBZ0JILElBQWhCLEVBQXNCSSxRQUF0QixFQUFnQ0MsTUFBaEMsQ0FBUDtBQUNILEdBTEQsTUFNSztBQUNELFdBQU8sSUFBUDtBQUNIO0FBQ0osQ0FWRDs7QUFZQVIsS0FBSyxDQUFDUyxJQUFOLEdBQWEsVUFBVU4sSUFBVixFQUFnQkksUUFBaEIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQzNDLE1BQUksS0FBS3JCLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFha0IsT0FBakMsRUFBMEM7QUFDdEMsUUFBSUYsSUFBSSxLQUFLLFdBQWIsRUFBMEI7QUFDdEIsV0FBS2YsaUJBQUwsR0FBeUIsSUFBekI7QUFDSDs7QUFDRCxRQUFJc0IsSUFBSSxHQUFHLElBQVg7QUFDQSxXQUFPLEtBQUt2QixPQUFMLENBQWFzQixJQUFiLENBQWtCTixJQUFsQixFQUF3QixVQUFVUSxLQUFWLEVBQWlCO0FBQzVDSixNQUFBQSxRQUFRLENBQUN2QyxJQUFULENBQWN3QyxNQUFkLEVBQXNCRyxLQUF0QjtBQUNBRCxNQUFBQSxJQUFJLENBQUN0QixpQkFBTCxHQUF5QixLQUF6QjtBQUNILEtBSE0sQ0FBUDtBQUlILEdBVEQsTUFVSztBQUNELFdBQU8sSUFBUDtBQUNIO0FBQ0osQ0FkRDs7QUFnQkFZLEtBQUssQ0FBQ1ksR0FBTixHQUFZLFVBQVVULElBQVYsRUFBZ0JJLFFBQWhCLEVBQTBCQyxNQUExQixFQUFrQztBQUMxQyxNQUFJLEtBQUtyQixPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYWtCLE9BQWpDLEVBQTBDO0FBQ3RDLFFBQUlGLElBQUksS0FBSyxXQUFiLEVBQTBCO0FBQ3RCLFVBQUksQ0FBQyxLQUFLaEIsT0FBTCxDQUFhMEIsZ0JBQWIsQ0FBOEJWLElBQTlCLENBQUwsRUFBMEM7QUFDdEMsYUFBS2YsaUJBQUwsR0FBeUIsS0FBekI7QUFDSDtBQUNKOztBQUNELFNBQUtELE9BQUwsQ0FBYXlCLEdBQWIsQ0FBaUJULElBQWpCLEVBQXVCSSxRQUF2QixFQUFpQ0MsTUFBakM7QUFDSDtBQUNKLENBVEQ7O0FBV0FSLEtBQUssQ0FBQ2MsZUFBTixHQUF3QixVQUFVTixNQUFWLEVBQWtCO0FBQ3RDLE9BQUtyQixPQUFMLEdBQWVxQixNQUFmO0FBQ0gsQ0FGRDs7QUFJQVIsS0FBSyxDQUFDZSxNQUFOLEdBQWUsWUFBWTtBQUN2QjtBQUNBLE9BQUtDLE9BQUwsQ0FBYSxDQUFiO0FBQ0EsT0FBSzdDLFVBQUwsR0FBa0IsS0FBS0QsTUFBdkI7QUFFQVosRUFBQUEsRUFBRSxDQUFDc0MsUUFBSCxDQUFZQyxtQkFBWixHQUFrQ29CLFlBQWxDLENBQStDLElBQS9DOztBQUVBLE1BQUksS0FBS3ZDLFFBQVQsRUFBbUI7QUFDZixTQUFLQSxRQUFMLENBQWN1QyxZQUFkLENBQTJCLElBQTNCO0FBQ0g7O0FBRUQsT0FBSzVCLElBQUwsQ0FBVSxNQUFWLEVBQWtCLElBQWxCO0FBQ0gsQ0FaRDs7QUFjQVcsS0FBSyxDQUFDa0IsTUFBTixHQUFlLFlBQVk7QUFDdkIsTUFBSSxDQUFDLEtBQUtDLFFBQVYsRUFBb0I7QUFDaEI3RCxJQUFBQSxFQUFFLENBQUNzQyxRQUFILENBQVlDLG1CQUFaLEdBQWtDdUIsZUFBbEMsQ0FBa0QsSUFBbEQ7QUFDSDs7QUFFRCxNQUFJLEtBQUsxQyxRQUFULEVBQW1CO0FBQ2YsU0FBS0EsUUFBTCxDQUFjMEMsZUFBZCxDQUE4QixJQUE5QjtBQUNIOztBQUVELE9BQUsvQixJQUFMLENBQVUsTUFBVixFQUFrQixJQUFsQjtBQUNILENBVkQ7O0FBWUFXLEtBQUssQ0FBQ3FCLFFBQU4sR0FBaUIsWUFBWTtBQUN6Qi9ELEVBQUFBLEVBQUUsQ0FBQ3NDLFFBQUgsQ0FBWUMsbUJBQVosR0FBa0NvQixZQUFsQyxDQUErQyxJQUEvQztBQUNBLE9BQUs1QixJQUFMLENBQVUsUUFBVixFQUFvQixJQUFwQjtBQUNILENBSEQ7O0FBS0FXLEtBQUssQ0FBQ3NCLE9BQU4sR0FBZ0IsWUFBWTtBQUN4QmhFLEVBQUFBLEVBQUUsQ0FBQ3NDLFFBQUgsQ0FBWUMsbUJBQVosR0FBa0N1QixlQUFsQyxDQUFrRCxJQUFsRDtBQUNBLE9BQUsvQixJQUFMLENBQVUsT0FBVixFQUFtQixJQUFuQjtBQUNILENBSEQ7O0FBS0FXLEtBQUssQ0FBQ2dCLE9BQU4sR0FBZ0IsVUFBVTlCLElBQVYsRUFBZ0I7QUFDNUIsT0FBS2pCLG1CQUFMLEdBQTJCLEtBQTNCO0FBQ0EsT0FBS2lCLElBQUwsR0FBWUEsSUFBSSxJQUFJLENBQXBCO0FBRUEsTUFBSVAsTUFBTSxHQUFHLEtBQUtBLE1BQWxCOztBQUNBLE9BQUssSUFBSWUsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHaEIsTUFBTSxDQUFDYyxNQUEzQixFQUFtQ0MsQ0FBQyxHQUFHQyxDQUF2QyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUMzQyxRQUFJNkIsS0FBSyxHQUFHNUMsTUFBTSxDQUFDZSxDQUFELENBQWxCOztBQUNBLFFBQUk2QixLQUFLLENBQUNDLHFCQUFWLEVBQWlDO0FBQzdCRCxNQUFBQSxLQUFLLENBQUNDLHFCQUFOLENBQTRCdEMsSUFBNUIsRUFBa0MsSUFBbEM7QUFDSDtBQUNKO0FBQ0osQ0FYRDs7QUFhQSxTQUFTWCxPQUFULEdBQW9CO0FBQ2hCO0FBQ0EsTUFBSWtELElBQUksR0FBRyxLQUFLQyxNQUFMLEVBQVg7O0FBRUEsTUFBSSxLQUFLdEMsaUJBQVQsRUFBNEI7QUFDeEIsUUFBSXVDLFFBQUo7O0FBQ0EsUUFBSSxDQUFDLEtBQUt0RCxnQkFBVixFQUE0QjtBQUN4QnNELE1BQUFBLFFBQVEsR0FBRyxLQUFLdEQsZ0JBQUwsR0FBd0IsSUFBSVgsV0FBSixDQUFnQitELElBQWhCLENBQW5DO0FBQ0gsS0FGRCxNQUVPO0FBQ0hFLE1BQUFBLFFBQVEsR0FBRyxLQUFLdEQsZ0JBQWhCO0FBQ0g7O0FBRUQsUUFBSSxLQUFLUSxXQUFMLEdBQW1CLENBQW5CLElBQXlCLENBQUM0QyxJQUFJLENBQUNHLFVBQUwsR0FBa0IsQ0FBbkIsS0FBeUJELFFBQVEsQ0FBQ0MsVUFBVCxHQUFzQixDQUEvQyxDQUE3QixFQUFpRjtBQUM3RSxXQUFLdkMsSUFBTCxDQUFVLFdBQVYsRUFBdUIsSUFBdkI7QUFDSDs7QUFFRHNDLElBQUFBLFFBQVEsQ0FBQ0UsR0FBVCxDQUFhSixJQUFiO0FBQ0g7O0FBRUQsTUFBSUEsSUFBSSxDQUFDSyxPQUFULEVBQWtCO0FBQ2QsU0FBS0MsSUFBTDtBQUNBLFNBQUsxQyxJQUFMLENBQVUsVUFBVixFQUFzQixJQUF0QjtBQUNIO0FBQ0o7O0FBRUQsU0FBUzJDLGFBQVQsR0FBMEI7QUFDdEIsTUFBSTlDLElBQUksR0FBRyxLQUFLQSxJQUFoQjtBQUNBLE1BQUlKLFFBQVEsR0FBRyxLQUFLQSxRQUFwQjs7QUFFQSxNQUFJSSxJQUFJLEdBQUdKLFFBQVgsRUFBcUI7QUFDakJJLElBQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHSixRQUFkO0FBQ0EsUUFBSUksSUFBSSxLQUFLLENBQWIsRUFBZ0JBLElBQUksR0FBR0osUUFBUDtBQUNuQixHQUhELE1BSUssSUFBSUksSUFBSSxHQUFHLENBQVgsRUFBYztBQUNmQSxJQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBR0osUUFBZDtBQUNBLFFBQUlJLElBQUksS0FBSyxDQUFiLEVBQWdCQSxJQUFJLElBQUlKLFFBQVI7QUFDbkI7O0FBRUQsTUFBSW1ELEtBQUssR0FBRy9DLElBQUksR0FBR0osUUFBbkI7QUFFQSxNQUFJSCxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsT0FBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBUixFQUFXd0MsR0FBRyxHQUFHdkQsTUFBTSxDQUFDYyxNQUE3QixFQUFxQ0MsQ0FBQyxHQUFHd0MsR0FBekMsRUFBOEN4QyxDQUFDLEVBQS9DLEVBQW1EO0FBQy9DLFFBQUk2QixLQUFLLEdBQUc1QyxNQUFNLENBQUNlLENBQUQsQ0FBbEI7QUFDQTZCLElBQUFBLEtBQUssQ0FBQ0csTUFBTixDQUFheEMsSUFBYixFQUFtQitDLEtBQW5CLEVBQTBCLElBQTFCO0FBQ0g7O0FBRUQsTUFBSSxLQUFLN0MsaUJBQVQsRUFBNEI7QUFDeEIsUUFBSSxLQUFLK0MsZUFBTCxLQUF5QkMsU0FBN0IsRUFBd0M7QUFDcEMsV0FBS0QsZUFBTCxHQUF1QkYsS0FBdkI7QUFDSDs7QUFFRCxRQUFLLEtBQUsvQyxJQUFMLEdBQVksQ0FBWixJQUFpQixLQUFLaUQsZUFBTCxHQUF1QkYsS0FBekMsSUFBb0QsS0FBSy9DLElBQUwsR0FBWSxDQUFaLElBQWlCLEtBQUtpRCxlQUFMLEdBQXVCRixLQUFoRyxFQUF3RztBQUNwRyxXQUFLNUMsSUFBTCxDQUFVLFdBQVYsRUFBdUIsSUFBdkI7QUFDSDs7QUFFRCxTQUFLOEMsZUFBTCxHQUF1QkYsS0FBdkI7QUFDSDtBQUNKOztBQUVEakMsS0FBSyxDQUFDcUMsTUFBTixHQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDNUI7QUFFQSxNQUFJLEtBQUtuRSxVQUFMLEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCLFNBQUtBLFVBQUwsSUFBbUJtRSxLQUFuQjs7QUFDQSxRQUFJLEtBQUtuRSxVQUFMLEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCO0FBQ0E7QUFDSDtBQUNKLEdBVDJCLENBVzVCO0FBRUE7OztBQUNBLE1BQUksS0FBS0YsbUJBQVQsRUFBOEI7QUFDMUIsU0FBS2lCLElBQUwsSUFBY29ELEtBQUssR0FBRyxLQUFLdkQsS0FBM0I7QUFDSCxHQUZELE1BR0s7QUFDRCxTQUFLZCxtQkFBTCxHQUEyQixJQUEzQjtBQUNIOztBQUVELE9BQUtLLFFBQUw7QUFDSCxDQXRCRDs7QUF3QkEwQixLQUFLLENBQUN1QyxXQUFOLEdBQW9CLFVBQVVDLGlCQUFWLEVBQTZCO0FBQzdDLE1BQUl4RCxRQUFRLEdBQUcsS0FBS0EsUUFBcEI7QUFDQSxNQUFJeUQsVUFBVSxHQUFHLEtBQWpCOztBQUVBLE1BQUksQ0FBQ3pELFFBQVEsR0FBR3BCLFlBQVksQ0FBQzhFLFFBQXpCLE1BQXVDOUUsWUFBWSxDQUFDOEUsUUFBeEQsRUFBa0U7QUFDOUQsUUFBSUMsS0FBSyxHQUFHSCxpQkFBaUIsSUFBSUEsaUJBQWlCLEdBQUcsQ0FBeEIsQ0FBakIsS0FBZ0QsQ0FBNUQ7O0FBQ0EsUUFBSUcsS0FBSyxJQUFLSCxpQkFBaUIsR0FBRyxDQUFsQyxFQUFzQztBQUNsQ0EsTUFBQUEsaUJBQWlCLElBQUksQ0FBckI7QUFDSDs7QUFFRCxRQUFJSSxjQUFjLEdBQUdKLGlCQUFpQixHQUFHLENBQXpDOztBQUNBLFFBQUlJLGNBQUosRUFBb0I7QUFDaEJILE1BQUFBLFVBQVUsR0FBRyxDQUFDQSxVQUFkO0FBQ0g7QUFDSjs7QUFDRCxNQUFJLENBQUN6RCxRQUFRLEdBQUdwQixZQUFZLENBQUNpRixPQUF6QixNQUFzQ2pGLFlBQVksQ0FBQ2lGLE9BQXZELEVBQWdFO0FBQzVESixJQUFBQSxVQUFVLEdBQUcsQ0FBQ0EsVUFBZDtBQUNIOztBQUNELFNBQU9BLFVBQVA7QUFDSCxDQW5CRDs7QUFxQkF6QyxLQUFLLENBQUM4QyxjQUFOLEdBQXVCLFVBQVU1RCxJQUFWLEVBQWdCdUMsSUFBaEIsRUFBc0I7QUFDekNBLEVBQUFBLElBQUksR0FBR0EsSUFBSSxJQUFJLElBQUkvRCxXQUFKLEVBQWY7QUFFQSxNQUFJb0UsT0FBTyxHQUFHLEtBQWQ7QUFDQSxNQUFJaEQsUUFBUSxHQUFHLEtBQUtBLFFBQXBCO0FBQ0EsTUFBSUQsV0FBVyxHQUFHLEtBQUtBLFdBQXZCO0FBRUEsTUFBSTJELGlCQUFpQixHQUFHdEQsSUFBSSxHQUFHLENBQVAsR0FBWUEsSUFBSSxHQUFHSixRQUFuQixHQUErQixFQUFFSSxJQUFJLEdBQUdKLFFBQVQsQ0FBdkQ7O0FBQ0EsTUFBSTBELGlCQUFpQixJQUFJM0QsV0FBekIsRUFBc0M7QUFDbEMyRCxJQUFBQSxpQkFBaUIsR0FBRzNELFdBQXBCO0FBRUFpRCxJQUFBQSxPQUFPLEdBQUcsSUFBVjtBQUNBLFFBQUlpQixTQUFTLEdBQUdsRSxXQUFXLElBQUlBLFdBQVcsR0FBRyxDQUFsQixDQUEzQjs7QUFDQSxRQUFJa0UsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ2pCQSxNQUFBQSxTQUFTLEdBQUcsQ0FBWixDQURpQixDQUNEO0FBQ25COztBQUNEN0QsSUFBQUEsSUFBSSxHQUFHNkQsU0FBUyxHQUFHakUsUUFBWixJQUF3QkksSUFBSSxHQUFHLENBQVAsR0FBVyxDQUFYLEdBQWUsQ0FBQyxDQUF4QyxDQUFQO0FBQ0g7O0FBRUQsTUFBSUEsSUFBSSxHQUFHSixRQUFYLEVBQXFCO0FBQ2pCLFFBQUlrRSxRQUFRLEdBQUc5RCxJQUFJLEdBQUdKLFFBQXRCO0FBQ0FJLElBQUFBLElBQUksR0FBRzhELFFBQVEsS0FBSyxDQUFiLEdBQWlCbEUsUUFBakIsR0FBNEJrRSxRQUFuQztBQUNILEdBSEQsTUFJSyxJQUFJOUQsSUFBSSxHQUFHLENBQVgsRUFBYztBQUNmQSxJQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBR0osUUFBZDtBQUNBLFFBQUlJLElBQUksS0FBSyxDQUFiLEVBQWlCQSxJQUFJLElBQUlKLFFBQVI7QUFDcEI7O0FBRUQsTUFBSTJELFVBQVUsR0FBRyxLQUFqQjtBQUNBLE1BQUlRLFVBQVUsR0FBRyxLQUFLQyxTQUFMLEdBQWlCdEYsWUFBWSxDQUFDdUYsVUFBL0M7O0FBQ0EsTUFBSUYsVUFBSixFQUFnQjtBQUNaUixJQUFBQSxVQUFVLEdBQUcsS0FBS0YsV0FBTCxDQUFpQkMsaUJBQWpCLENBQWI7QUFDSDs7QUFFRCxNQUFJWSxTQUFTLEdBQUdYLFVBQVUsR0FBRyxDQUFDLENBQUosR0FBUSxDQUFsQzs7QUFDQSxNQUFJLEtBQUsxRCxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEJxRSxJQUFBQSxTQUFTLElBQUksQ0FBQyxDQUFkO0FBQ0gsR0FyQ3dDLENBdUN6Qzs7O0FBQ0EsTUFBSUgsVUFBVSxJQUFJUixVQUFsQixFQUE4QjtBQUMxQnZELElBQUFBLElBQUksR0FBR0osUUFBUSxHQUFHSSxJQUFsQjtBQUNIOztBQUVEdUMsRUFBQUEsSUFBSSxDQUFDUSxLQUFMLEdBQWEvQyxJQUFJLEdBQUdKLFFBQXBCO0FBQ0EyQyxFQUFBQSxJQUFJLENBQUN2QyxJQUFMLEdBQVlBLElBQVo7QUFDQXVDLEVBQUFBLElBQUksQ0FBQzJCLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EzQixFQUFBQSxJQUFJLENBQUNLLE9BQUwsR0FBZUEsT0FBZjtBQUNBTCxFQUFBQSxJQUFJLENBQUNHLFVBQUwsR0FBa0JZLGlCQUFsQjtBQUVBLFNBQU9mLElBQVA7QUFDSCxDQW5ERDs7QUFxREF6QixLQUFLLENBQUMwQixNQUFOLEdBQWUsWUFBWTtBQUN2QixNQUFJRCxJQUFJLEdBQUcsS0FBS3FCLGNBQUwsQ0FBb0IsS0FBSzVELElBQXpCLEVBQStCLEtBQUtkLFlBQXBDLENBQVg7QUFDQSxNQUFJTyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsT0FBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBUixFQUFXd0MsR0FBRyxHQUFHdkQsTUFBTSxDQUFDYyxNQUE3QixFQUFxQ0MsQ0FBQyxHQUFHd0MsR0FBekMsRUFBOEN4QyxDQUFDLEVBQS9DLEVBQW1EO0FBQy9DLFFBQUk2QixLQUFLLEdBQUc1QyxNQUFNLENBQUNlLENBQUQsQ0FBbEI7QUFDQTZCLElBQUFBLEtBQUssQ0FBQ0csTUFBTixDQUFhRCxJQUFJLENBQUN2QyxJQUFsQixFQUF3QnVDLElBQUksQ0FBQ1EsS0FBN0IsRUFBb0MsSUFBcEM7QUFDSDs7QUFFRCxTQUFPUixJQUFQO0FBQ0gsQ0FURDtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQXBFLEVBQUUsQ0FBQ2dHLEdBQUgsQ0FBT3JELEtBQVAsRUFBYyxNQUFkLEVBQXNCLFlBQVk7QUFDOUIsU0FBTyxLQUFLeEIsS0FBWjtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQW5CLEVBQUUsQ0FBQ2dHLEdBQUgsQ0FBT3JELEtBQVAsRUFBYyxNQUFkLEVBQXNCLFlBQVk7QUFDOUIsU0FBTyxLQUFLdkIsS0FBWjtBQUNILENBRkQ7QUFJQXBCLEVBQUUsQ0FBQ2lHLFFBQUgsQ0FBWXRELEtBQVosRUFBbUIsdUJBQW5CLEVBQTRDLFVBQTVDO0FBRUEzQyxFQUFFLENBQUNrRyxNQUFILENBQVV2RCxLQUFWLEVBQWlCLGFBQWpCLEVBQ0ksWUFBWTtBQUNSLFNBQU8sS0FBS3JCLE1BQUwsQ0FBWWMsTUFBWixHQUFxQixDQUE1QjtBQUNILENBSEwsRUFJSSxZQUFZO0FBQ1IsT0FBS2QsTUFBTCxDQUFZYyxNQUFaLEdBQXFCLENBQXJCO0FBQ0gsQ0FOTDtBQVVBcEMsRUFBRSxDQUFDa0csTUFBSCxDQUFVdkQsS0FBVixFQUFpQixVQUFqQixFQUNJLFlBQVk7QUFDUixTQUFPLEtBQUtrRCxTQUFaO0FBQ0gsQ0FITCxFQUlJLFVBQVVNLEtBQVYsRUFBaUI7QUFDYixPQUFLTixTQUFMLEdBQWlCTSxLQUFqQjtBQUVBLE1BQUlDLFNBQUosRUFBZSxPQUhGLENBS2I7O0FBQ0EsT0FBS3ZFLElBQUwsR0FBWSxDQUFaOztBQUVBLE1BQUlzRSxLQUFLLEdBQUc1RixZQUFZLENBQUM4RixJQUF6QixFQUErQjtBQUMzQixTQUFLN0UsV0FBTCxHQUFtQjhFLFFBQW5CO0FBQ0gsR0FGRCxNQUdLO0FBQ0QsU0FBSzlFLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSDtBQUVKLENBbkJMO0FBc0JBeEIsRUFBRSxDQUFDa0csTUFBSCxDQUFVdkQsS0FBVixFQUFpQixhQUFqQixFQUNJLFlBQVk7QUFDUixTQUFPLEtBQUs0RCxZQUFaO0FBQ0gsQ0FITCxFQUlJLFVBQVVKLEtBQVYsRUFBaUI7QUFDYixPQUFLSSxZQUFMLEdBQW9CSixLQUFwQjtBQUVBLE1BQUlQLFVBQVUsR0FBRyxLQUFLQyxTQUFMLEdBQWlCdEYsWUFBWSxDQUFDdUYsVUFBL0M7QUFDQSxNQUFJVSxPQUFPLEdBQUcsQ0FBQyxLQUFLN0UsUUFBTCxHQUFnQnBCLFlBQVksQ0FBQ2lGLE9BQTlCLE1BQTJDakYsWUFBWSxDQUFDaUYsT0FBdEU7O0FBQ0EsTUFBSVcsS0FBSyxLQUFLRyxRQUFWLElBQXNCLENBQUNWLFVBQXZCLElBQXFDLENBQUNZLE9BQTFDLEVBQW1EO0FBQy9DLFNBQUt2RixRQUFMLEdBQWdCMEQsYUFBaEI7QUFDSCxHQUZELE1BR0s7QUFDRCxTQUFLMUQsUUFBTCxHQUFnQkMsT0FBaEI7QUFDSDtBQUNKLENBZkw7QUFrQkFsQixFQUFFLENBQUNrRyxNQUFILENBQVV2RCxLQUFWLEVBQWlCLE9BQWpCLEVBQ0ksWUFBWTtBQUNSLFNBQU8sS0FBSzlCLE1BQVo7QUFDSCxDQUhMLEVBSUksVUFBVXNGLEtBQVYsRUFBaUI7QUFDYixPQUFLckYsVUFBTCxHQUFrQixLQUFLRCxNQUFMLEdBQWNzRixLQUFoQztBQUNILENBTkw7QUFVQWxHLEVBQUUsQ0FBQ08sY0FBSCxHQUFvQmlHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxHLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxudmFyIGpzID0gY2MuanM7XHJcbnZhciBQbGF5YWJsZSA9IHJlcXVpcmUoJy4vcGxheWFibGUnKTtcclxuXHJcbnZhciBUeXBlcyA9IHJlcXVpcmUoJy4vdHlwZXMnKTtcclxudmFyIFdyYXBwZWRJbmZvID0gVHlwZXMuV3JhcHBlZEluZm87XHJcbnZhciBXcmFwTW9kZSA9IFR5cGVzLldyYXBNb2RlO1xyXG52YXIgV3JhcE1vZGVNYXNrID0gVHlwZXMuV3JhcE1vZGVNYXNrO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIEFuaW1hdGlvblN0YXRlIGdpdmVzIGZ1bGwgY29udHJvbCBvdmVyIGFuaW1hdGlvbiBwbGF5YmFjayBwcm9jZXNzLlxyXG4gKiBJbiBtb3N0IGNhc2VzIHRoZSBBbmltYXRpb24gQ29tcG9uZW50IGlzIHN1ZmZpY2llbnQgYW5kIGVhc2llciB0byB1c2UuIFVzZSB0aGUgQW5pbWF0aW9uU3RhdGUgaWYgeW91IG5lZWQgZnVsbCBjb250cm9sLlxyXG4gKiAhI3poXHJcbiAqIEFuaW1hdGlvblN0YXRlIOWujOWFqOaOp+WItuWKqOeUu+aSreaUvui/h+eoi+OAgjxici8+XHJcbiAqIOWkp+WkmuaVsOaDheWGteS4iyDliqjnlLvnu4Tku7Yg5piv6Laz5aSf5ZKM5piT5LqO5L2/55So55qE44CC5aaC5p6c5oKo6ZyA6KaB5pu05aSa55qE5Yqo55S75o6n5Yi25o6l5Y+j77yM6K+35L2/55SoIEFuaW1hdGlvblN0YXRl44CCXHJcbiAqIEBjbGFzcyBBbmltYXRpb25TdGF0ZVxyXG4gKiBAZXh0ZW5kcyBQbGF5YWJsZVxyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7QW5pbWF0aW9uQ2xpcH0gY2xpcFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXHJcbiAqL1xyXG5mdW5jdGlvbiBBbmltYXRpb25TdGF0ZSAoY2xpcCwgbmFtZSkge1xyXG4gICAgUGxheWFibGUuY2FsbCh0aGlzKTtcclxuICAgIFxyXG4gICAgLy8gTWFyayB3aGV0aGVyIHRoZSBjdXJyZW50IGZyYW1lIGlzIHBsYXllZC5cclxuICAgIC8vIFdoZW4gc2V0IG5ldyB0aW1lIHRvIGFuaW1hdGlvbiBzdGF0ZSwgd2Ugc2hvdWxkIGVuc3VyZSB0aGUgZnJhbWUgYXQgdGhlIHNwZWNpZmllZCB0aW1lIGJlaW5nIHBsYXllZCBhdCBuZXh0IHVwZGF0ZS5cclxuICAgIHRoaXMuX2N1cnJlbnRGcmFtZVBsYXllZCA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB0aGlzLl9kZWxheSA9IDA7XHJcbiAgICB0aGlzLl9kZWxheVRpbWUgPSAwO1xyXG5cclxuICAgIHRoaXMuX3dyYXBwZWRJbmZvID0gbmV3IFdyYXBwZWRJbmZvKCk7XHJcbiAgICB0aGlzLl9sYXN0V3JhcHBlZEluZm8gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX3Byb2Nlc3MgPSBwcm9jZXNzO1xyXG5cclxuICAgIHRoaXMuX2NsaXAgPSBjbGlwO1xyXG4gICAgdGhpcy5fbmFtZSA9IG5hbWUgfHwgKGNsaXAgJiYgY2xpcC5uYW1lKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBhbmltYXRvclxyXG4gICAgICogQHR5cGUge0FuaW1hdGlvbkFuaW1hdG9yfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5hbmltYXRvciA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBjdXJ2ZXMgbGlzdC5cclxuICAgICAqICEjemgg5puy57q/5YiX6KGo44CCXHJcbiAgICAgKiBAcHJvcGVydHkgY3VydmVzXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0W119XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY3VydmVzID0gW107XHJcblxyXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvd2ViLWFuaW1hdGlvbnMvI2lkbC1kZWYtQW5pbWF0aW9uVGltaW5nXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzdGFydCBkZWxheSB3aGljaCByZXByZXNlbnRzIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyBmcm9tIGFuIGFuaW1hdGlvbidzIHN0YXJ0IHRpbWUgdG8gdGhlIHN0YXJ0IG9mXHJcbiAgICAgKiB0aGUgYWN0aXZlIGludGVydmFsLlxyXG4gICAgICogISN6aCDlu7bov5/lpJrlsJHnp5Lmkq3mlL7jgIJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgZGVsYXlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGVsYXkgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYW5pbWF0aW9uJ3MgaXRlcmF0aW9uIGNvdW50IHByb3BlcnR5LlxyXG4gICAgICpcclxuICAgICAqIEEgcmVhbCBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8gKGluY2x1ZGluZyBwb3NpdGl2ZSBpbmZpbml0eSkgcmVwcmVzZW50aW5nIHRoZSBudW1iZXIgb2YgdGltZXNcclxuICAgICAqIHRvIHJlcGVhdCB0aGUgYW5pbWF0aW9uIG5vZGUuXHJcbiAgICAgKlxyXG4gICAgICogVmFsdWVzIGxlc3MgdGhhbiB6ZXJvIGFuZCBOYU4gdmFsdWVzIGFyZSB0cmVhdGVkIGFzIHRoZSB2YWx1ZSAxLjAgZm9yIHRoZSBwdXJwb3NlIG9mIHRpbWluZyBtb2RlbFxyXG4gICAgICogY2FsY3VsYXRpb25zLlxyXG4gICAgICpcclxuICAgICAqICEjemgg6L+t5Luj5qyh5pWw77yM5oyH5Yqo55S75pKt5pS+5aSa5bCR5qyh5ZCO57uT5p2fLCBub3JtYWxpemUgdGltZeOAgiDlpoIgMi4177yIMuasoeWNiu+8iVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSByZXBlYXRDb3VudFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXBlYXRDb3VudCA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBpdGVyYXRpb24gZHVyYXRpb24gb2YgdGhpcyBhbmltYXRpb24gaW4gc2Vjb25kcy4gKGxlbmd0aClcclxuICAgICAqICEjemgg5Y2V5qyh5Yqo55S755qE5oyB57ut5pe26Ze077yM56eS44CCXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IGR1cmF0aW9uXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZHVyYXRpb24gPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYW5pbWF0aW9uJ3MgcGxheWJhY2sgc3BlZWQuIDEgaXMgbm9ybWFsIHBsYXliYWNrIHNwZWVkLlxyXG4gICAgICogISN6aCDmkq3mlL7pgJ/njofjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBzcGVlZFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBkZWZhdWx0OiAxLjBcclxuICAgICAqL1xyXG4gICAgdGhpcy5zcGVlZCA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBXcmFwcGluZyBtb2RlIG9mIHRoZSBwbGF5aW5nIGFuaW1hdGlvbi5cclxuICAgICAqIE5vdGljZSA6IGR5bmFtaWMgY2hhbmdlIHdyYXBNb2RlIHdpbGwgcmVzZXQgdGltZSBhbmQgcmVwZWF0Q291bnQgcHJvcGVydHlcclxuICAgICAqICEjemhcclxuICAgICAqIOWKqOeUu+W+queOr+aWueW8j+OAglxyXG4gICAgICog6ZyA6KaB5rOo5oSP55qE5piv77yM5Yqo5oCB5L+u5pS5IHdyYXBNb2RlIOaXtu+8jOS8mumHjee9riB0aW1lIOS7peWPiiByZXBlYXRDb3VudFxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB3cmFwTW9kZVxyXG4gICAgICogQHR5cGUge1dyYXBNb2RlfVxyXG4gICAgICogQGRlZmF1bHQ6IFdyYXBNb2RlLk5vcm1hbFxyXG4gICAgICovXHJcbiAgICB0aGlzLndyYXBNb2RlID0gV3JhcE1vZGUuTm9ybWFsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgY3VycmVudCB0aW1lIG9mIHRoaXMgYW5pbWF0aW9uIGluIHNlY29uZHMuXHJcbiAgICAgKiAhI3poIOWKqOeUu+W9k+WJjeeahOaXtumXtO+8jOenkuOAglxyXG4gICAgICogQHByb3BlcnR5IHRpbWVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHRoaXMudGltZSA9IDA7XHJcblxyXG4gICAgLy8gQW5pbWF0aW9uIGFzIGV2ZW50IHRhcmdldFxyXG4gICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcclxuICAgIHRoaXMuX2xhc3RmcmFtZUV2ZW50T24gPSBmYWxzZTtcclxuICAgIHRoaXMuZW1pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFuaW1hdGlvbk1hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX2VtaXQnLCBhcmdzKTtcclxuICAgIH07XHJcbn1cclxuanMuZXh0ZW5kKEFuaW1hdGlvblN0YXRlLCBQbGF5YWJsZSk7XHJcblxyXG52YXIgcHJvdG8gPSBBbmltYXRpb25TdGF0ZS5wcm90b3R5cGU7XHJcblxyXG5wcm90by5fZW1pdCA9IGZ1bmN0aW9uICh0eXBlLCBzdGF0ZSkge1xyXG4gICAgaWYgKHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuaXNWYWxpZCkge1xyXG4gICAgICAgIHRoaXMuX3RhcmdldC5lbWl0KHR5cGUsIHR5cGUsIHN0YXRlKTtcclxuICAgIH1cclxufTtcclxuXHJcbnByb3RvLm9uID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcclxuICAgIGlmICh0aGlzLl90YXJnZXQgJiYgdGhpcy5fdGFyZ2V0LmlzVmFsaWQpIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2xhc3RmcmFtZScpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdGZyYW1lRXZlbnRPbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbnByb3RvLm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xyXG4gICAgaWYgKHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuaXNWYWxpZCkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnbGFzdGZyYW1lJykge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0ZnJhbWVFdmVudE9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQub25jZSh0eXBlLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQsIGV2ZW50KTtcclxuICAgICAgICAgICAgc2VsZi5fbGFzdGZyYW1lRXZlbnRPbiA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5wcm90by5vZmYgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xyXG4gICAgaWYgKHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuaXNWYWxpZCkge1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnbGFzdGZyYW1lJykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RhcmdldC5oYXNFdmVudExpc3RlbmVyKHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0ZnJhbWVFdmVudE9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0Lm9mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgIH1cclxufTtcclxuXHJcbnByb3RvLl9zZXRFdmVudFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcclxufTtcclxuXHJcbnByb3RvLm9uUGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIHJlcGxheVxyXG4gICAgdGhpcy5zZXRUaW1lKDApO1xyXG4gICAgdGhpcy5fZGVsYXlUaW1lID0gdGhpcy5fZGVsYXk7XHJcbiAgICBcclxuICAgIGNjLmRpcmVjdG9yLmdldEFuaW1hdGlvbk1hbmFnZXIoKS5hZGRBbmltYXRpb24odGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuYW5pbWF0b3IpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdG9yLmFkZEFuaW1hdGlvbih0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5lbWl0KCdwbGF5JywgdGhpcyk7XHJcbn07XHJcblxyXG5wcm90by5vblN0b3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBbmltYXRpb25NYW5hZ2VyKCkucmVtb3ZlQW5pbWF0aW9uKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFuaW1hdG9yKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRvci5yZW1vdmVBbmltYXRpb24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbWl0KCdzdG9wJywgdGhpcyk7XHJcbn07XHJcblxyXG5wcm90by5vblJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldEFuaW1hdGlvbk1hbmFnZXIoKS5hZGRBbmltYXRpb24odGhpcyk7XHJcbiAgICB0aGlzLmVtaXQoJ3Jlc3VtZScsIHRoaXMpO1xyXG59O1xyXG5cclxucHJvdG8ub25QYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLmRpcmVjdG9yLmdldEFuaW1hdGlvbk1hbmFnZXIoKS5yZW1vdmVBbmltYXRpb24odGhpcyk7XHJcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJywgdGhpcyk7XHJcbn07XHJcblxyXG5wcm90by5zZXRUaW1lID0gZnVuY3Rpb24gKHRpbWUpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRGcmFtZVBsYXllZCA9IGZhbHNlO1xyXG4gICAgdGhpcy50aW1lID0gdGltZSB8fCAwO1xyXG5cclxuICAgIHZhciBjdXJ2ZXMgPSB0aGlzLmN1cnZlcztcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gY3VydmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIHZhciBjdXJ2ZSA9IGN1cnZlc1tpXTtcclxuICAgICAgICBpZiAoY3VydmUub25UaW1lQ2hhbmdlZE1hbnVhbGx5KSB7XHJcbiAgICAgICAgICAgIGN1cnZlLm9uVGltZUNoYW5nZWRNYW51YWxseSh0aW1lLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzICgpIHtcclxuICAgIC8vIHNhbXBsZVxyXG4gICAgdmFyIGluZm8gPSB0aGlzLnNhbXBsZSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9sYXN0ZnJhbWVFdmVudE9uKSB7XHJcbiAgICAgICAgdmFyIGxhc3RJbmZvO1xyXG4gICAgICAgIGlmICghdGhpcy5fbGFzdFdyYXBwZWRJbmZvKSB7XHJcbiAgICAgICAgICAgIGxhc3RJbmZvID0gdGhpcy5fbGFzdFdyYXBwZWRJbmZvID0gbmV3IFdyYXBwZWRJbmZvKGluZm8pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhc3RJbmZvID0gdGhpcy5fbGFzdFdyYXBwZWRJbmZvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVwZWF0Q291bnQgPiAxICYmICgoaW5mby5pdGVyYXRpb25zIHwgMCkgPiAobGFzdEluZm8uaXRlcmF0aW9ucyB8IDApKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2xhc3RmcmFtZScsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGFzdEluZm8uc2V0KGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmZvLnN0b3BwZWQpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2ZpbmlzaGVkJywgdGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNpbXBsZVByb2Nlc3MgKCkge1xyXG4gICAgdmFyIHRpbWUgPSB0aGlzLnRpbWU7XHJcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uO1xyXG5cclxuICAgIGlmICh0aW1lID4gZHVyYXRpb24pIHtcclxuICAgICAgICB0aW1lID0gdGltZSAlIGR1cmF0aW9uO1xyXG4gICAgICAgIGlmICh0aW1lID09PSAwKSB0aW1lID0gZHVyYXRpb247XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aW1lIDwgMCkge1xyXG4gICAgICAgIHRpbWUgPSB0aW1lICUgZHVyYXRpb247XHJcbiAgICAgICAgaWYgKHRpbWUgIT09IDApIHRpbWUgKz0gZHVyYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJhdGlvID0gdGltZSAvIGR1cmF0aW9uO1xyXG5cclxuICAgIHZhciBjdXJ2ZXMgPSB0aGlzLmN1cnZlcztcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjdXJ2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgY3VydmUgPSBjdXJ2ZXNbaV07XHJcbiAgICAgICAgY3VydmUuc2FtcGxlKHRpbWUsIHJhdGlvLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbGFzdGZyYW1lRXZlbnRPbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0SXRlcmF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RJdGVyYXRpb25zID0gcmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKHRoaXMudGltZSA+IDAgJiYgdGhpcy5fbGFzdEl0ZXJhdGlvbnMgPiByYXRpbykgfHwgKHRoaXMudGltZSA8IDAgJiYgdGhpcy5fbGFzdEl0ZXJhdGlvbnMgPCByYXRpbykpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdsYXN0ZnJhbWUnLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xhc3RJdGVyYXRpb25zID0gcmF0aW87XHJcbiAgICB9XHJcbn1cclxuXHJcbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgLy8gY2FsY3VsYXRlIGRlbGF5IHRpbWVcclxuXHJcbiAgICBpZiAodGhpcy5fZGVsYXlUaW1lID4gMCkge1xyXG4gICAgICAgIHRoaXMuX2RlbGF5VGltZSAtPSBkZWx0YTtcclxuICAgICAgICBpZiAodGhpcy5fZGVsYXlUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAvLyBzdGlsbCB3YWl0aW5nXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWFrZSBmaXJzdCBmcmFtZSBwZXJmZWN0XHJcblxyXG4gICAgLy92YXIgcGxheVBlcmZlY3RGaXJzdEZyYW1lID0gKHRoaXMudGltZSA9PT0gMCk7XHJcbiAgICBpZiAodGhpcy5fY3VycmVudEZyYW1lUGxheWVkKSB7XHJcbiAgICAgICAgdGhpcy50aW1lICs9IChkZWx0YSAqIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEZyYW1lUGxheWVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wcm9jZXNzKCk7XHJcbn07XHJcblxyXG5wcm90by5fbmVlZFJldmVycyA9IGZ1bmN0aW9uIChjdXJyZW50SXRlcmF0aW9ucykge1xyXG4gICAgdmFyIHdyYXBNb2RlID0gdGhpcy53cmFwTW9kZTtcclxuICAgIHZhciBuZWVkUmV2ZXJzID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCh3cmFwTW9kZSAmIFdyYXBNb2RlTWFzay5QaW5nUG9uZykgPT09IFdyYXBNb2RlTWFzay5QaW5nUG9uZykge1xyXG4gICAgICAgIHZhciBpc0VuZCA9IGN1cnJlbnRJdGVyYXRpb25zIC0gKGN1cnJlbnRJdGVyYXRpb25zIHwgMCkgPT09IDA7XHJcbiAgICAgICAgaWYgKGlzRW5kICYmIChjdXJyZW50SXRlcmF0aW9ucyA+IDApKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJdGVyYXRpb25zIC09IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaXNPZGRJdGVyYXRpb24gPSBjdXJyZW50SXRlcmF0aW9ucyAmIDE7XHJcbiAgICAgICAgaWYgKGlzT2RkSXRlcmF0aW9uKSB7XHJcbiAgICAgICAgICAgIG5lZWRSZXZlcnMgPSAhbmVlZFJldmVycztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoKHdyYXBNb2RlICYgV3JhcE1vZGVNYXNrLlJldmVyc2UpID09PSBXcmFwTW9kZU1hc2suUmV2ZXJzZSkge1xyXG4gICAgICAgIG5lZWRSZXZlcnMgPSAhbmVlZFJldmVycztcclxuICAgIH1cclxuICAgIHJldHVybiBuZWVkUmV2ZXJzO1xyXG59O1xyXG5cclxucHJvdG8uZ2V0V3JhcHBlZEluZm8gPSBmdW5jdGlvbiAodGltZSwgaW5mbykge1xyXG4gICAgaW5mbyA9IGluZm8gfHwgbmV3IFdyYXBwZWRJbmZvKCk7XHJcbiAgICBcclxuICAgIHZhciBzdG9wcGVkID0gZmFsc2U7XHJcbiAgICB2YXIgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uO1xyXG4gICAgdmFyIHJlcGVhdENvdW50ID0gdGhpcy5yZXBlYXRDb3VudDtcclxuXHJcbiAgICB2YXIgY3VycmVudEl0ZXJhdGlvbnMgPSB0aW1lID4gMCA/ICh0aW1lIC8gZHVyYXRpb24pIDogLSh0aW1lIC8gZHVyYXRpb24pO1xyXG4gICAgaWYgKGN1cnJlbnRJdGVyYXRpb25zID49IHJlcGVhdENvdW50KSB7XHJcbiAgICAgICAgY3VycmVudEl0ZXJhdGlvbnMgPSByZXBlYXRDb3VudDtcclxuXHJcbiAgICAgICAgc3RvcHBlZCA9IHRydWU7XHJcbiAgICAgICAgdmFyIHRlbXBSYXRpbyA9IHJlcGVhdENvdW50IC0gKHJlcGVhdENvdW50IHwgMCk7XHJcbiAgICAgICAgaWYgKHRlbXBSYXRpbyA9PT0gMCkge1xyXG4gICAgICAgICAgICB0ZW1wUmF0aW8gPSAxOyAgLy8g5aaC5p6c5pKt5pS+6L+H77yM5Yqo55S75LiN5aSN5L2NXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRpbWUgPSB0ZW1wUmF0aW8gKiBkdXJhdGlvbiAqICh0aW1lID4gMCA/IDEgOiAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRpbWUgPiBkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciB0ZW1wVGltZSA9IHRpbWUgJSBkdXJhdGlvbjtcclxuICAgICAgICB0aW1lID0gdGVtcFRpbWUgPT09IDAgPyBkdXJhdGlvbiA6IHRlbXBUaW1lO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGltZSA8IDApIHtcclxuICAgICAgICB0aW1lID0gdGltZSAlIGR1cmF0aW9uO1xyXG4gICAgICAgIGlmICh0aW1lICE9PSAwICkgdGltZSArPSBkdXJhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmVlZFJldmVycyA9IGZhbHNlO1xyXG4gICAgdmFyIHNob3VsZFdyYXAgPSB0aGlzLl93cmFwTW9kZSAmIFdyYXBNb2RlTWFzay5TaG91bGRXcmFwO1xyXG4gICAgaWYgKHNob3VsZFdyYXApIHtcclxuICAgICAgICBuZWVkUmV2ZXJzID0gdGhpcy5fbmVlZFJldmVycyhjdXJyZW50SXRlcmF0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRpcmVjdGlvbiA9IG5lZWRSZXZlcnMgPyAtMSA6IDE7XHJcbiAgICBpZiAodGhpcy5zcGVlZCA8IDApIHtcclxuICAgICAgICBkaXJlY3Rpb24gKj0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIHdyYXBwZWQgdGltZVxyXG4gICAgaWYgKHNob3VsZFdyYXAgJiYgbmVlZFJldmVycykge1xyXG4gICAgICAgIHRpbWUgPSBkdXJhdGlvbiAtIHRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5mby5yYXRpbyA9IHRpbWUgLyBkdXJhdGlvbjtcclxuICAgIGluZm8udGltZSA9IHRpbWU7XHJcbiAgICBpbmZvLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcclxuICAgIGluZm8uc3RvcHBlZCA9IHN0b3BwZWQ7XHJcbiAgICBpbmZvLml0ZXJhdGlvbnMgPSBjdXJyZW50SXRlcmF0aW9ucztcclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxufTtcclxuXHJcbnByb3RvLnNhbXBsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBpbmZvID0gdGhpcy5nZXRXcmFwcGVkSW5mbyh0aGlzLnRpbWUsIHRoaXMuX3dyYXBwZWRJbmZvKTtcclxuICAgIHZhciBjdXJ2ZXMgPSB0aGlzLmN1cnZlcztcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjdXJ2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgY3VydmUgPSBjdXJ2ZXNbaV07XHJcbiAgICAgICAgY3VydmUuc2FtcGxlKGluZm8udGltZSwgaW5mby5yYXRpbywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGluZm87XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGNsaXAgdGhhdCBpcyBiZWluZyBwbGF5ZWQgYnkgdGhpcyBhbmltYXRpb24gc3RhdGUuXHJcbiAqICEjemgg5q2k5Yqo55S754q25oCB5q2j5Zyo5pKt5pS+55qE5Ymq6L6R44CCXHJcbiAqIEBwcm9wZXJ0eSBjbGlwXHJcbiAqIEB0eXBlIHtBbmltYXRpb25DbGlwfVxyXG4gKiBAZmluYWxcclxuICovXHJcbmpzLmdldChwcm90bywgJ2NsaXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xpcDtcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgbmFtZSBvZiB0aGUgcGxheWluZyBhbmltYXRpb24uXHJcbiAqICEjemgg5Yqo55S755qE5ZCN5a2XXHJcbiAqIEBwcm9wZXJ0eSBuYW1lXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEByZWFkT25seVxyXG4gKi9cclxuanMuZ2V0KHByb3RvLCAnbmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG59KTtcclxuXHJcbmpzLm9ic29sZXRlKHByb3RvLCAnQW5pbWF0aW9uU3RhdGUubGVuZ3RoJywgJ2R1cmF0aW9uJyk7XHJcblxyXG5qcy5nZXRzZXQocHJvdG8sICdjdXJ2ZUxvYWRlZCcsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VydmVzLmxlbmd0aCA+IDA7XHJcbiAgICB9LFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuY3VydmVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbik7XHJcblxyXG5cclxuanMuZ2V0c2V0KHByb3RvLCAnd3JhcE1vZGUnLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93cmFwTW9kZTtcclxuICAgIH0sXHJcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93cmFwTW9kZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGR5bmFtaWMgY2hhbmdlIHdyYXBNb2RlIHdpbGwgbmVlZCByZXNldCB0aW1lIHRvIDBcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUgJiBXcmFwTW9kZU1hc2suTG9vcCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcGVhdENvdW50ID0gSW5maW5pdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlcGVhdENvdW50ID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbik7XHJcblxyXG5qcy5nZXRzZXQocHJvdG8sICdyZXBlYXRDb3VudCcsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGVhdENvdW50O1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3JlcGVhdENvdW50ID0gdmFsdWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNob3VsZFdyYXAgPSB0aGlzLl93cmFwTW9kZSAmIFdyYXBNb2RlTWFzay5TaG91bGRXcmFwO1xyXG4gICAgICAgIHZhciByZXZlcnNlID0gKHRoaXMud3JhcE1vZGUgJiBXcmFwTW9kZU1hc2suUmV2ZXJzZSkgPT09IFdyYXBNb2RlTWFzay5SZXZlcnNlO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gSW5maW5pdHkgJiYgIXNob3VsZFdyYXAgJiYgIXJldmVyc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvY2VzcyA9IHNpbXBsZVByb2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzID0gcHJvY2VzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcblxyXG5qcy5nZXRzZXQocHJvdG8sICdkZWxheScsIFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWxheTtcclxuICAgIH0sXHJcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9kZWxheVRpbWUgPSB0aGlzLl9kZWxheSA9IHZhbHVlO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuXHJcbmNjLkFuaW1hdGlvblN0YXRlID0gbW9kdWxlLmV4cG9ydHMgPSBBbmltYXRpb25TdGF0ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=