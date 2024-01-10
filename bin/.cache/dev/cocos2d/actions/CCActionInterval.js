
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionInterval.js';
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
 * <p> An interval action is an action that takes place within a certain period of time. <br/>
 * It has an start time, and a finish time. The finish time is the parameter<br/>
 * duration plus the start time.</p>
 *
 * <p>These CCActionInterval actions have some interesting properties, like:<br/>
 * - They can run normally (default)  <br/>
 * - They can run reversed with the reverse method   <br/>
 * - They can run with the time altered with the Accelerate, AccelDeccel and Speed actions. </p>
 *
 * <p>For example, you can simulate a Ping Pong effect running the action normally and<br/>
 * then running it again in Reverse mode. </p>
 * !#zh 时间间隔动作，这种动作在已定时间内完成，继承 FiniteTimeAction。
 * @class ActionInterval
 * @extends FiniteTimeAction
 * @param {Number} d duration in seconds
 */
cc.ActionInterval = cc.Class({
  name: 'cc.ActionInterval',
  "extends": cc.FiniteTimeAction,
  ctor: function ctor(d) {
    this.MAX_VALUE = 2;
    this._elapsed = 0;
    this._firstTick = false;
    this._easeList = null;
    this._speed = 1;
    this._timesForRepeat = 1;
    this._repeatForever = false;
    this._repeatMethod = false; //Compatible with repeat class, Discard after can be deleted

    this._speedMethod = false; //Compatible with repeat class, Discard after can be deleted

    d !== undefined && cc.ActionInterval.prototype.initWithDuration.call(this, d);
  },

  /*
   * How many seconds had elapsed since the actions started to run.
   * @return {Number}
   */
  getElapsed: function getElapsed() {
    return this._elapsed;
  },

  /*
   * Initializes the action.
   * @param {Number} d duration in seconds
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(d) {
    this._duration = d === 0 ? cc.macro.FLT_EPSILON : d; // prevent division by 0
    // This comparison could be in step:, but it might decrease the performance
    // by 3% in heavy based action games.

    this._elapsed = 0;
    this._firstTick = true;
    return true;
  },
  isDone: function isDone() {
    return this._elapsed >= this._duration;
  },
  _cloneDecoration: function _cloneDecoration(action) {
    action._repeatForever = this._repeatForever;
    action._speed = this._speed;
    action._timesForRepeat = this._timesForRepeat;
    action._easeList = this._easeList;
    action._speedMethod = this._speedMethod;
    action._repeatMethod = this._repeatMethod;
  },
  _reverseEaseList: function _reverseEaseList(action) {
    if (this._easeList) {
      action._easeList = [];

      for (var i = 0; i < this._easeList.length; i++) {
        action._easeList.push(this._easeList[i].reverse());
      }
    }
  },
  clone: function clone() {
    var action = new cc.ActionInterval(this._duration);

    this._cloneDecoration(action);

    return action;
  },

  /**
   * !#en Implementation of ease motion.
   * !#zh 缓动运动。
   * @method easing
   * @param {Object} easeObj
   * @returns {ActionInterval}
   * @example
   * action.easing(cc.easeIn(3.0));
   */
  easing: function easing(easeObj) {
    if (this._easeList) this._easeList.length = 0;else this._easeList = [];

    for (var i = 0; i < arguments.length; i++) {
      this._easeList.push(arguments[i]);
    }

    return this;
  },
  _computeEaseTime: function _computeEaseTime(dt) {
    var locList = this._easeList;
    if (!locList || locList.length === 0) return dt;

    for (var i = 0, n = locList.length; i < n; i++) {
      dt = locList[i].easing(dt);
    }

    return dt;
  },
  step: function step(dt) {
    if (this._firstTick) {
      this._firstTick = false;
      this._elapsed = 0;
    } else this._elapsed += dt; //this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
    //this.update(Math.max(0, Math.min(1, this._elapsed / Math.max(this._duration, cc.macro.FLT_EPSILON))));


    var t = this._elapsed / (this._duration > 0.0000001192092896 ? this._duration : 0.0000001192092896);
    t = 1 > t ? t : 1;
    this.update(t > 0 ? t : 0); //Compatible with repeat class, Discard after can be deleted (this._repeatMethod)

    if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
      if (!this._repeatForever) {
        this._timesForRepeat--;
      } //var diff = locInnerAction.getElapsed() - locInnerAction._duration;


      this.startWithTarget(this.target); // to prevent jerk. issue #390 ,1247
      //this._innerAction.step(0);
      //this._innerAction.step(diff);

      this.step(this._elapsed - this._duration);
    }
  },
  startWithTarget: function startWithTarget(target) {
    cc.Action.prototype.startWithTarget.call(this, target);
    this._elapsed = 0;
    this._firstTick = true;
  },
  reverse: function reverse() {
    cc.logID(1010);
    return null;
  },

  /*
   * Set amplitude rate.
   * @warning It should be overridden in subclass.
   * @param {Number} amp
   */
  setAmplitudeRate: function setAmplitudeRate(amp) {
    // Abstract class needs implementation
    cc.logID(1011);
  },

  /*
   * Get amplitude rate.
   * @warning It should be overridden in subclass.
   * @return {Number} 0
   */
  getAmplitudeRate: function getAmplitudeRate() {
    // Abstract class needs implementation
    cc.logID(1012);
    return 0;
  },

  /**
   * !#en
   * Changes the speed of an action, making it take longer (speed>1)
   * or less (speed<1) time. <br/>
   * Useful to simulate 'slow motion' or 'fast forward' effect.
   * !#zh
   * 改变一个动作的速度，使它的执行使用更长的时间（speed > 1）<br/>
   * 或更少（speed < 1）可以有效得模拟“慢动作”或“快进”的效果。
   * @param {Number} speed
   * @returns {Action}
   */
  speed: function speed(_speed) {
    if (_speed <= 0) {
      cc.logID(1013);
      return this;
    }

    this._speedMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._speed *= _speed;
    return this;
  },

  /**
   * Get this action speed.
   * @return {Number}
   */
  getSpeed: function getSpeed() {
    return this._speed;
  },

  /**
   * Set this action speed.
   * @param {Number} speed
   * @returns {ActionInterval}
   */
  setSpeed: function setSpeed(speed) {
    this._speed = speed;
    return this;
  },

  /**
   * !#en
   * Repeats an action a number of times.
   * To repeat an action forever use the CCRepeatForever action.
   * !#zh 重复动作可以按一定次数重复一个动作，使用 RepeatForever 动作来永远重复一个动作。
   * @method repeat
   * @param {Number} times
   * @returns {ActionInterval}
   */
  repeat: function repeat(times) {
    times = Math.round(times);

    if (isNaN(times) || times < 1) {
      cc.logID(1014);
      return this;
    }

    this._repeatMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._timesForRepeat *= times;
    return this;
  },

  /**
   * !#en
   * Repeats an action for ever.  <br/>
   * To repeat the an action for a limited number of times use the Repeat action. <br/>
   * !#zh 永远地重复一个动作，有限次数内重复一个动作请使用 Repeat 动作。
   * @method repeatForever
   * @returns {ActionInterval}
   */
  repeatForever: function repeatForever() {
    this._repeatMethod = true; //Compatible with repeat class, Discard after can be deleted

    this._timesForRepeat = this.MAX_VALUE;
    this._repeatForever = true;
    return this;
  }
});

cc.actionInterval = function (d) {
  return new cc.ActionInterval(d);
};
/**
 * @module cc
 */

/*
 * Runs actions sequentially, one after another.
 * @class Sequence
 * @extends ActionInterval
 * @param {Array|FiniteTimeAction} tempArray
 * @example
 * // create sequence with actions
 * var seq = new cc.Sequence(act1, act2);
 *
 * // create sequence with array
 * var seq = new cc.Sequence(actArray);
 */


cc.Sequence = cc.Class({
  name: 'cc.Sequence',
  "extends": cc.ActionInterval,
  ctor: function ctor(tempArray) {
    this._actions = [];
    this._split = null;
    this._last = 0;
    this._reversed = false;
    var paramArray = tempArray instanceof Array ? tempArray : arguments;

    if (paramArray.length === 1) {
      cc.errorID(1019);
      return;
    }

    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null) cc.logID(1015);

    if (last >= 0) {
      var prev = paramArray[0],
          action1;

      for (var i = 1; i < last; i++) {
        if (paramArray[i]) {
          action1 = prev;
          prev = cc.Sequence._actionOneTwo(action1, paramArray[i]);
        }
      }

      this.initWithTwoActions(prev, paramArray[last]);
    }
  },

  /*
   * Initializes the action <br/>
   * @param {FiniteTimeAction} actionOne
   * @param {FiniteTimeAction} actionTwo
   * @return {Boolean}
   */
  initWithTwoActions: function initWithTwoActions(actionOne, actionTwo) {
    if (!actionOne || !actionTwo) {
      cc.errorID(1025);
      return false;
    }

    var durationOne = actionOne._duration,
        durationTwo = actionTwo._duration;
    durationOne *= actionOne._repeatMethod ? actionOne._timesForRepeat : 1;
    durationTwo *= actionTwo._repeatMethod ? actionTwo._timesForRepeat : 1;
    var d = durationOne + durationTwo;
    this.initWithDuration(d);
    this._actions[0] = actionOne;
    this._actions[1] = actionTwo;
    return true;
  },
  clone: function clone() {
    var action = new cc.Sequence();

    this._cloneDecoration(action);

    action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._split = this._actions[0]._duration / this._duration;
    this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1;
    this._last = -1;
  },
  stop: function stop() {
    // Issue #1305
    if (this._last !== -1) this._actions[this._last].stop();
    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    var new_t,
        found = 0;
    var locSplit = this._split,
        locActions = this._actions,
        locLast = this._last,
        actionFound;
    dt = this._computeEaseTime(dt);

    if (dt < locSplit) {
      // action[0]
      new_t = locSplit !== 0 ? dt / locSplit : 1;

      if (found === 0 && locLast === 1 && this._reversed) {
        // Reverse mode ?
        // XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
        // since it will require a hack to know if an action is on reverse mode or not.
        // "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
        locActions[1].update(0);
        locActions[1].stop();
      }
    } else {
      // action[1]
      found = 1;
      new_t = locSplit === 1 ? 1 : (dt - locSplit) / (1 - locSplit);

      if (locLast === -1) {
        // action[0] was skipped, execute it.
        locActions[0].startWithTarget(this.target);
        locActions[0].update(1);
        locActions[0].stop();
      }

      if (locLast === 0) {
        // switching to action 1. stop action 0.
        locActions[0].update(1);
        locActions[0].stop();
      }
    }

    actionFound = locActions[found]; // Last action found and it is done.

    if (locLast === found && actionFound.isDone()) return; // Last action not found

    if (locLast !== found) actionFound.startWithTarget(this.target);
    new_t = new_t * actionFound._timesForRepeat;
    actionFound.update(new_t > 1 ? new_t % 1 : new_t);
    this._last = found;
  },
  reverse: function reverse() {
    var action = cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    action._reversed = true;
    return action;
  }
});
/**
 * !#en
 * Helper constructor to create an array of sequenceable actions
 * The created action will run actions sequentially, one after another.
 * !#zh 顺序执行动作，创建的动作将按顺序依次运行。
 * @method sequence
 * @param {FiniteTimeAction|FiniteTimeAction[]} actionOrActionArray
 * @param {FiniteTimeAction} ...tempArray
 * @return {ActionInterval}
 * @example
 * // example
 * // create sequence with actions
 * var seq = cc.sequence(act1, act2);
 *
 * // create sequence with array
 * var seq = cc.sequence(actArray);
 */
// todo: It should be use new

cc.sequence = function (
/*Multiple Arguments*/
tempArray) {
  var paramArray = tempArray instanceof Array ? tempArray : arguments;

  if (paramArray.length === 1) {
    cc.errorID(1019);
    return null;
  }

  var last = paramArray.length - 1;
  if (last >= 0 && paramArray[last] == null) cc.logID(1015);
  var result = null;

  if (last >= 0) {
    result = paramArray[0];

    for (var i = 1; i <= last; i++) {
      if (paramArray[i]) {
        result = cc.Sequence._actionOneTwo(result, paramArray[i]);
      }
    }
  }

  return result;
};

cc.Sequence._actionOneTwo = function (actionOne, actionTwo) {
  var sequence = new cc.Sequence();
  sequence.initWithTwoActions(actionOne, actionTwo);
  return sequence;
};
/*
 * Repeats an action a number of times.
 * To repeat an action forever use the CCRepeatForever action.
 * @class Repeat
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @param {Number} times
 * @example
 * var rep = new cc.Repeat(cc.sequence(jump2, jump1), 5);
 */


cc.Repeat = cc.Class({
  name: 'cc.Repeat',
  "extends": cc.ActionInterval,
  ctor: function ctor(action, times) {
    this._times = 0;
    this._total = 0;
    this._nextDt = 0;
    this._actionInstant = false;
    this._innerAction = null;
    times !== undefined && this.initWithAction(action, times);
  },

  /*
   * @param {FiniteTimeAction} action
   * @param {Number} times
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action, times) {
    var duration = action._duration * times;

    if (this.initWithDuration(duration)) {
      this._times = times;
      this._innerAction = action;

      if (action instanceof cc.ActionInstant) {
        this._actionInstant = true;
        this._times -= 1;
      }

      this._total = 0;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Repeat();

    this._cloneDecoration(action);

    action.initWithAction(this._innerAction.clone(), this._times);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    this._total = 0;
    this._nextDt = this._innerAction._duration / this._duration;
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  stop: function stop() {
    this._innerAction.stop();

    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var locInnerAction = this._innerAction;
    var locDuration = this._duration;
    var locTimes = this._times;
    var locNextDt = this._nextDt;

    if (dt >= locNextDt) {
      while (dt > locNextDt && this._total < locTimes) {
        locInnerAction.update(1);
        this._total++;
        locInnerAction.stop();
        locInnerAction.startWithTarget(this.target);
        locNextDt += locInnerAction._duration / locDuration;
        this._nextDt = locNextDt > 1 ? 1 : locNextDt;
      } // fix for issue #1288, incorrect end value of repeat


      if (dt >= 1.0 && this._total < locTimes) {
        // fix for cocos-creator/fireball/issues/4310
        locInnerAction.update(1);
        this._total++;
      } // don't set a instant action back or update it, it has no use because it has no duration


      if (!this._actionInstant) {
        if (this._total === locTimes) {
          locInnerAction.stop();
        } else {
          // issue #390 prevent jerk, use right update
          locInnerAction.update(dt - (locNextDt - locInnerAction._duration / locDuration));
        }
      }
    } else {
      locInnerAction.update(dt * locTimes % 1.0);
    }
  },
  isDone: function isDone() {
    return this._total === this._times;
  },
  reverse: function reverse() {
    var action = new cc.Repeat(this._innerAction.reverse(), this._times);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },

  /*
   * Set inner Action.
   * @param {FiniteTimeAction} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner Action.
   * @return {FiniteTimeAction}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * !#en Creates a Repeat action. Times is an unsigned integer between 1 and pow(2,30)
 * !#zh 重复动作，可以按一定次数重复一个动，如果想永远重复一个动作请使用 repeatForever 动作来完成。
 * @method repeat
 * @param {FiniteTimeAction} action
 * @param {Number} times
 * @return {ActionInterval}
 * @example
 * // example
 * var rep = cc.repeat(cc.sequence(jump2, jump1), 5);
 */

cc.repeat = function (action, times) {
  return new cc.Repeat(action, times);
};
/*
 * Repeats an action for ever.  <br/>
 * To repeat the an action for a limited number of times use the Repeat action. <br/>
 * @warning This action can't be Sequenceable because it is not an IntervalAction
 * @class RepeatForever
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @example
 * var rep = new cc.RepeatForever(cc.sequence(jump2, jump1), 5);
 */


cc.RepeatForever = cc.Class({
  name: 'cc.RepeatForever',
  "extends": cc.ActionInterval,
  ctor: function ctor(action) {
    this._innerAction = null;
    action && this.initWithAction(action);
  },

  /*
   * @param {ActionInterval} action
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action) {
    if (!action) {
      cc.errorID(1026);
      return false;
    }

    this._innerAction = action;
    return true;
  },
  clone: function clone() {
    var action = new cc.RepeatForever();

    this._cloneDecoration(action);

    action.initWithAction(this._innerAction.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  step: function step(dt) {
    var locInnerAction = this._innerAction;
    locInnerAction.step(dt);

    if (locInnerAction.isDone()) {
      //var diff = locInnerAction.getElapsed() - locInnerAction._duration;
      locInnerAction.startWithTarget(this.target); // to prevent jerk. issue #390 ,1247
      //this._innerAction.step(0);
      //this._innerAction.step(diff);

      locInnerAction.step(locInnerAction.getElapsed() - locInnerAction._duration);
    }
  },
  isDone: function isDone() {
    return false;
  },
  reverse: function reverse() {
    var action = new cc.RepeatForever(this._innerAction.reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },

  /*
   * Set inner action.
   * @param {ActionInterval} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner action.
   * @return {ActionInterval}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * !#en Create a acton which repeat forever, as it runs forever, it can't be added into cc.sequence and cc.spawn.
 * !#zh 永远地重复一个动作，有限次数内重复一个动作请使用 repeat 动作，由于这个动作不会停止，所以不能被添加到 cc.sequence 或 cc.spawn 中。
 * @method repeatForever
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 * @example
 * // example
 * var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
 */

cc.repeatForever = function (action) {
  return new cc.RepeatForever(action);
};
/* 
 * Spawn a new action immediately
 * @class Spawn
 * @extends ActionInterval
 */


cc.Spawn = cc.Class({
  name: 'cc.Spawn',
  "extends": cc.ActionInterval,
  ctor: function ctor(tempArray) {
    this._one = null;
    this._two = null;
    var paramArray = tempArray instanceof Array ? tempArray : arguments;

    if (paramArray.length === 1) {
      cc.errorID(1020);
      return;
    }

    var last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null) cc.logID(1015);

    if (last >= 0) {
      var prev = paramArray[0],
          action1;

      for (var i = 1; i < last; i++) {
        if (paramArray[i]) {
          action1 = prev;
          prev = cc.Spawn._actionOneTwo(action1, paramArray[i]);
        }
      }

      this.initWithTwoActions(prev, paramArray[last]);
    }
  },

  /* initializes the Spawn action with the 2 actions to spawn
   * @param {FiniteTimeAction} action1
   * @param {FiniteTimeAction} action2
   * @return {Boolean}
   */
  initWithTwoActions: function initWithTwoActions(action1, action2) {
    if (!action1 || !action2) {
      cc.errorID(1027);
      return false;
    }

    var ret = false;
    var d1 = action1._duration;
    var d2 = action2._duration;

    if (this.initWithDuration(Math.max(d1, d2))) {
      this._one = action1;
      this._two = action2;

      if (d1 > d2) {
        this._two = cc.Sequence._actionOneTwo(action2, cc.delayTime(d1 - d2));
      } else if (d1 < d2) {
        this._one = cc.Sequence._actionOneTwo(action1, cc.delayTime(d2 - d1));
      }

      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.Spawn();

    this._cloneDecoration(action);

    action.initWithTwoActions(this._one.clone(), this._two.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._one.startWithTarget(target);

    this._two.startWithTarget(target);
  },
  stop: function stop() {
    this._one.stop();

    this._two.stop();

    cc.Action.prototype.stop.call(this);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    if (this._one) this._one.update(dt);
    if (this._two) this._two.update(dt);
  },
  reverse: function reverse() {
    var action = cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en Create a spawn action which runs several actions in parallel.
 * !#zh 同步执行动作，同步执行一组动作。
 * @method spawn
 * @param {FiniteTimeAction|FiniteTimeAction[]} actionOrActionArray
 * @param {FiniteTimeAction} ...tempArray
 * @return {FiniteTimeAction}
 * @example
 * // example
 * var action = cc.spawn(cc.jumpBy(2, cc.v2(300, 0), 50, 4), cc.rotateBy(2, 720));
 * todo: It should be the direct use new
 */

cc.spawn = function (
/*Multiple Arguments*/
tempArray) {
  var paramArray = tempArray instanceof Array ? tempArray : arguments;

  if (paramArray.length === 1) {
    cc.errorID(1020);
    return null;
  }

  if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null) cc.logID(1015);
  var prev = paramArray[0];

  for (var i = 1; i < paramArray.length; i++) {
    if (paramArray[i] != null) prev = cc.Spawn._actionOneTwo(prev, paramArray[i]);
  }

  return prev;
};

cc.Spawn._actionOneTwo = function (action1, action2) {
  var pSpawn = new cc.Spawn();
  pSpawn.initWithTwoActions(action1, action2);
  return pSpawn;
};
/*
 * Rotates a Node object to a certain angle by modifying its angle property. <br/>
 * The direction will be decided by the shortest angle.
 * @class RotateTo
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number} dstAngle dstAngle in degrees.
 * @example
 * var rotateTo = new cc.RotateTo(2, 61.0);
 */


cc.RotateTo = cc.Class({
  name: 'cc.RotateTo',
  "extends": cc.ActionInterval,
  statics: {
    _reverse: false
  },
  ctor: function ctor(duration, dstAngle) {
    this._startAngle = 0;
    this._dstAngle = 0;
    this._angle = 0;
    dstAngle !== undefined && this.initWithDuration(duration, dstAngle);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} dstAngle
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, dstAngle) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._dstAngle = dstAngle;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.RotateTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._dstAngle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var startAngle = target.angle % 360;
    var angle = cc.RotateTo._reverse ? this._dstAngle - startAngle : this._dstAngle + startAngle;
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    this._startAngle = startAngle;
    this._angle = cc.RotateTo._reverse ? angle : -angle;
  },
  reverse: function reverse() {
    cc.logID(1016);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.angle = this._startAngle + this._angle * dt;
    }
  }
});
/**
 * !#en
 * Rotates a Node object to a certain angle by modifying its angle property. <br/>
 * The direction will be decided by the shortest angle.
 * !#zh 旋转到目标角度，通过逐帧修改它的 angle 属性，旋转方向将由最短的角度决定。
 * @method rotateTo
 * @param {Number} duration duration in seconds
 * @param {Number} dstAngle dstAngle in degrees.
 * @return {ActionInterval}
 * @example
 * // example
 * var rotateTo = cc.rotateTo(2, 61.0);
 */

cc.rotateTo = function (duration, dstAngle) {
  return new cc.RotateTo(duration, dstAngle);
};
/*
 * Rotates a Node object clockwise a number of degrees by modifying its angle property.
 * Relative to its properties to modify.
 * @class RotateBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number} deltaAngle deltaAngle in degrees
 * @example
 * var actionBy = new cc.RotateBy(2, 360);
 */


cc.RotateBy = cc.Class({
  name: 'cc.RotateBy',
  "extends": cc.ActionInterval,
  statics: {
    _reverse: false
  },
  ctor: function ctor(duration, deltaAngle) {
    deltaAngle *= cc.RotateBy._reverse ? 1 : -1;
    this._deltaAngle = 0;
    this._startAngle = 0;
    deltaAngle !== undefined && this.initWithDuration(duration, deltaAngle);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number} deltaAngle deltaAngle in degrees
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaAngle) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._deltaAngle = deltaAngle;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.RotateBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._deltaAngle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startAngle = target.angle;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.angle = this._startAngle + this._deltaAngle * dt;
    }
  },
  reverse: function reverse() {
    var action = new cc.RotateBy();
    action.initWithDuration(this._duration, -this._deltaAngle);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Rotates a Node object clockwise a number of degrees by modifying its angle property.
 * Relative to its properties to modify.
 * !#zh 旋转指定的角度。
 * @method rotateBy
 * @param {Number} duration duration in seconds
 * @param {Number} deltaAngle deltaAngle in degrees
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.rotateBy(2, 360);
 */

cc.rotateBy = function (duration, deltaAngle) {
  return new cc.RotateBy(duration, deltaAngle);
};
/*
 * <p>
 * Moves a Node object x,y pixels by modifying its position property.                                  <br/>
 * x and y are relative to the position of the object.                                                     <br/>
 * Several MoveBy actions can be concurrently called, and the resulting                                  <br/>
 * movement will be the sum of individual movements.
 * </p>
 * @class MoveBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} deltaPos
 * @param {Number} [deltaY]
 * @example
 * var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
 */


cc.MoveBy = cc.Class({
  name: 'cc.MoveBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaPos, deltaY) {
    this._positionDelta = cc.v2(0, 0);
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    deltaPos !== undefined && cc.MoveBy.prototype.initWithDuration.call(this, duration, deltaPos, deltaY);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Vec2} position
   * @param {Number} [y]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, position, y) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (position.x !== undefined) {
        y = position.y;
        position = position.x;
      }

      this._positionDelta.x = position;
      this._positionDelta.y = y;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.MoveBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._positionDelta);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var x = this._positionDelta.x * dt;
      var y = this._positionDelta.y * dt;
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var action = new cc.MoveBy(this._duration, cc.v2(-this._positionDelta.x, -this._positionDelta.y));

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Moves a Node object x,y pixels by modifying its position property.                                  <br/>
 * x and y are relative to the position of the object.                                                     <br/>
 * Several MoveBy actions can be concurrently called, and the resulting                                  <br/>
 * movement will be the sum of individual movements.
 * !#zh 移动指定的距离。
 * @method moveBy
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} deltaPos
 * @param {Number} [deltaY]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
 */

cc.moveBy = function (duration, deltaPos, deltaY) {
  return new cc.MoveBy(duration, deltaPos, deltaY);
};
/*
 * Moves a Node object to the position x,y. x and y are absolute coordinates by modifying its position property. <br/>
 * Several MoveTo actions can be concurrently called, and the resulting                                            <br/>
 * movement will be the sum of individual movements.
 * @class MoveTo
 * @extends MoveBy
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @example
 * var actionBy = new cc.MoveTo(2, cc.v2(80, 80));
 */


cc.MoveTo = cc.Class({
  name: 'cc.MoveTo',
  "extends": cc.MoveBy,
  ctor: function ctor(duration, position, y) {
    this._endPosition = cc.v2(0, 0);
    position !== undefined && this.initWithDuration(duration, position, y);
  },

  /*
   * Initializes the action.
   * @param {Number} duration  duration in seconds
   * @param {Vec2} position
   * @param {Number} [y]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, position, y) {
    if (cc.MoveBy.prototype.initWithDuration.call(this, duration, position, y)) {
      if (position.x !== undefined) {
        y = position.y;
        position = position.x;
      }

      this._endPosition.x = position;
      this._endPosition.y = y;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.MoveTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endPosition);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.MoveBy.prototype.startWithTarget.call(this, target);
    this._positionDelta.x = this._endPosition.x - target.x;
    this._positionDelta.y = this._endPosition.y - target.y;
  }
});
/**
 * !#en
 * Moves a Node object to the position x,y. x and y are absolute coordinates by modifying its position property. <br/>
 * Several MoveTo actions can be concurrently called, and the resulting                                            <br/>
 * movement will be the sum of individual movements.
 * !#zh 移动到目标位置。
 * @method moveTo
 * @param {Number} duration duration in seconds
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.moveTo(2, cc.v2(80, 80));
 */

cc.moveTo = function (duration, position, y) {
  return new cc.MoveTo(duration, position, y);
};
/*
 * Skews a Node object to given angles by modifying its skewX and skewY properties
 * @class SkewTo
 * @extends ActionInterval
 * @param {Number} t time in seconds
 * @param {Number} sx
 * @param {Number} sy
 * @example
 * var actionTo = new cc.SkewTo(2, 37.2, -37.2);
 */


cc.SkewTo = cc.Class({
  name: 'cc.SkewTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(t, sx, sy) {
    this._skewX = 0;
    this._skewY = 0;
    this._startSkewX = 0;
    this._startSkewY = 0;
    this._endSkewX = 0;
    this._endSkewY = 0;
    this._deltaX = 0;
    this._deltaY = 0;
    sy !== undefined && cc.SkewTo.prototype.initWithDuration.call(this, t, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Number} sx
   * @param {Number} sy
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, sx, sy) {
    var ret = false;

    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._endSkewX = sx;
      this._endSkewY = sy;
      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.SkewTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endSkewX, this._endSkewY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startSkewX = target.skewX % 180;
    this._deltaX = this._endSkewX - this._startSkewX;
    if (this._deltaX > 180) this._deltaX -= 360;
    if (this._deltaX < -180) this._deltaX += 360;
    this._startSkewY = target.skewY % 360;
    this._deltaY = this._endSkewY - this._startSkewY;
    if (this._deltaY > 180) this._deltaY -= 360;
    if (this._deltaY < -180) this._deltaY += 360;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    this.target.skewX = this._startSkewX + this._deltaX * dt;
    this.target.skewY = this._startSkewY + this._deltaY * dt;
  }
});
/**
 * !#en
 * Create a action which skews a Node object to given angles by modifying its skewX and skewY properties.
 * Changes to the specified value.
 * !#zh 偏斜到目标角度。
 * @method skewTo
 * @param {Number} t time in seconds
 * @param {Number} sx
 * @param {Number} sy
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.skewTo(2, 37.2, -37.2);
 */

cc.skewTo = function (t, sx, sy) {
  return new cc.SkewTo(t, sx, sy);
};
/*
 * Skews a Node object by skewX and skewY degrees.
 * Relative to its property modification.
 * @class SkewBy
 * @extends SkewTo
 * @param {Number} t time in seconds
 * @param {Number} sx  skew in degrees for X axis
 * @param {Number} sy  skew in degrees for Y axis
 */


cc.SkewBy = cc.Class({
  name: 'cc.SkewBy',
  "extends": cc.SkewTo,
  ctor: function ctor(t, sx, sy) {
    sy !== undefined && this.initWithDuration(t, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Number} deltaSkewX  skew in degrees for X axis
   * @param {Number} deltaSkewY  skew in degrees for Y axis
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, deltaSkewX, deltaSkewY) {
    var ret = false;

    if (cc.SkewTo.prototype.initWithDuration.call(this, t, deltaSkewX, deltaSkewY)) {
      this._skewX = deltaSkewX;
      this._skewY = deltaSkewY;
      ret = true;
    }

    return ret;
  },
  clone: function clone() {
    var action = new cc.SkewBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._skewX, this._skewY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.SkewTo.prototype.startWithTarget.call(this, target);
    this._deltaX = this._skewX;
    this._deltaY = this._skewY;
    this._endSkewX = this._startSkewX + this._deltaX;
    this._endSkewY = this._startSkewY + this._deltaY;
  },
  reverse: function reverse() {
    var action = new cc.SkewBy(this._duration, -this._skewX, -this._skewY);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Skews a Node object by skewX and skewY degrees. <br />
 * Relative to its property modification.
 * !#zh 偏斜指定的角度。
 * @method skewBy
 * @param {Number} t time in seconds
 * @param {Number} sx sx skew in degrees for X axis
 * @param {Number} sy sy skew in degrees for Y axis
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.skewBy(2, 0, -90);
 */

cc.skewBy = function (t, sx, sy) {
  return new cc.SkewBy(t, sx, sy);
};
/*
 * Moves a Node object simulating a parabolic jump movement by modifying its position property.
 * Relative to its movement.
 * @class JumpBy
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} height
 * @param {Number} jumps
 * @example
 * var actionBy = new cc.JumpBy(2, cc.v2(300, 0), 50, 4);
 * var actionBy = new cc.JumpBy(2, 300, 0, 50, 4);
 */


cc.JumpBy = cc.Class({
  name: 'cc.JumpBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, position, y, height, jumps) {
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    this._delta = cc.v2(0, 0);
    this._height = 0;
    this._jumps = 0;
    height !== undefined && cc.JumpBy.prototype.initWithDuration.call(this, duration, position, y, height, jumps);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Vec2|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {Boolean}
   * @example
   * actionBy.initWithDuration(2, cc.v2(300, 0), 50, 4);
   * actionBy.initWithDuration(2, 300, 0, 50, 4);
   */
  initWithDuration: function initWithDuration(duration, position, y, height, jumps) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (jumps === undefined) {
        jumps = height;
        height = y;
        y = position.y;
        position = position.x;
      }

      this._delta.x = position;
      this._delta.y = y;
      this._height = height;
      this._jumps = jumps;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.JumpBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._delta, this._height, this._jumps);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var frac = dt * this._jumps % 1.0;
      var y = this._height * 4 * frac * (1 - frac);
      y += this._delta.y * dt;
      var x = this._delta.x * dt;
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var action = new cc.JumpBy(this._duration, cc.v2(-this._delta.x, -this._delta.y), this._height, this._jumps);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Moves a Node object simulating a parabolic jump movement by modifying it's position property.
 * Relative to its movement.
 * !#zh 用跳跃的方式移动指定的距离。
 * @method jumpBy
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.jumpBy(2, cc.v2(300, 0), 50, 4);
 * var actionBy = cc.jumpBy(2, 300, 0, 50, 4);
 */

cc.jumpBy = function (duration, position, y, height, jumps) {
  return new cc.JumpBy(duration, position, y, height, jumps);
};
/*
 * Moves a Node object to a parabolic position simulating a jump movement by modifying it's position property. <br />
 * Jump to the specified location.
 * @class JumpTo
 * @extends JumpBy
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @example
 * var actionTo = new cc.JumpTo(2, cc.v2(300, 0), 50, 4);
 * var actionTo = new cc.JumpTo(2, 300, 0, 50, 4);
 */


cc.JumpTo = cc.Class({
  name: 'cc.JumpTo',
  "extends": cc.JumpBy,
  ctor: function ctor(duration, position, y, height, jumps) {
    this._endPosition = cc.v2(0, 0);
    height !== undefined && this.initWithDuration(duration, position, y, height, jumps);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Vec2|Number} position
   * @param {Number} [y]
   * @param {Number} height
   * @param {Number} jumps
   * @return {Boolean}
   * @example
   * actionTo.initWithDuration(2, cc.v2(300, 0), 50, 4);
   * actionTo.initWithDuration(2, 300, 0, 50, 4);
   */
  initWithDuration: function initWithDuration(duration, position, y, height, jumps) {
    if (cc.JumpBy.prototype.initWithDuration.call(this, duration, position, y, height, jumps)) {
      if (jumps === undefined) {
        y = position.y;
        position = position.x;
      }

      this._endPosition.x = position;
      this._endPosition.y = y;
      return true;
    }

    return false;
  },
  startWithTarget: function startWithTarget(target) {
    cc.JumpBy.prototype.startWithTarget.call(this, target);
    this._delta.x = this._endPosition.x - this._startPosition.x;
    this._delta.y = this._endPosition.y - this._startPosition.y;
  },
  clone: function clone() {
    var action = new cc.JumpTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endPosition, this._height, this._jumps);
    return action;
  }
});
/**
 * !#en
 * Moves a Node object to a parabolic position simulating a jump movement by modifying its position property. <br />
 * Jump to the specified location.
 * !#zh 用跳跃的方式移动到目标位置。
 * @method jumpTo
 * @param {Number} duration
 * @param {Vec2|Number} position
 * @param {Number} [y]
 * @param {Number} [height]
 * @param {Number} [jumps]
 * @return {ActionInterval}
 * @example
 * // example
 * var actionTo = cc.jumpTo(2, cc.v2(300, 300), 50, 4);
 * var actionTo = cc.jumpTo(2, 300, 300, 50, 4);
 */

cc.jumpTo = function (duration, position, y, height, jumps) {
  return new cc.JumpTo(duration, position, y, height, jumps);
};
/* An action that moves the target with a cubic Bezier curve by a certain distance.
 * Relative to its movement.
 * @class BezierBy
 * @extends ActionInterval
 * @param {Number} t - time in seconds
 * @param {Vec2[]} c - Array of points
 * @example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierForward = new cc.BezierBy(3, bezier);
 */


function bezierAt(a, b, c, d, t) {
  return Math.pow(1 - t, 3) * a + 3 * t * Math.pow(1 - t, 2) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d;
}

;
cc.BezierBy = cc.Class({
  name: 'cc.BezierBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(t, c) {
    this._config = [];
    this._startPosition = cc.v2(0, 0);
    this._previousPosition = cc.v2(0, 0);
    c && cc.BezierBy.prototype.initWithDuration.call(this, t, c);
  },

  /*
   * Initializes the action.
   * @param {Number} t - time in seconds
   * @param {Vec2[]} c - Array of points
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._config = c;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.BezierBy();

    this._cloneDecoration(action);

    var newConfigs = [];

    for (var i = 0; i < this._config.length; i++) {
      var selConf = this._config[i];
      newConfigs.push(cc.v2(selConf.x, selConf.y));
    }

    action.initWithDuration(this._duration, newConfigs);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var locPosX = target.x;
    var locPosY = target.y;
    this._previousPosition.x = locPosX;
    this._previousPosition.y = locPosY;
    this._startPosition.x = locPosX;
    this._startPosition.y = locPosY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      var locConfig = this._config;
      var xa = 0;
      var xb = locConfig[0].x;
      var xc = locConfig[1].x;
      var xd = locConfig[2].x;
      var ya = 0;
      var yb = locConfig[0].y;
      var yc = locConfig[1].y;
      var yd = locConfig[2].y;
      var x = bezierAt(xa, xb, xc, xd, dt);
      var y = bezierAt(ya, yb, yc, yd, dt);
      var locStartPosition = this._startPosition;

      if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
        var targetX = this.target.x;
        var targetY = this.target.y;
        var locPreviousPosition = this._previousPosition;
        locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
        locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
        x = x + locStartPosition.x;
        y = y + locStartPosition.y;
        locPreviousPosition.x = x;
        locPreviousPosition.y = y;
        this.target.setPosition(x, y);
      } else {
        this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
      }
    }
  },
  reverse: function reverse() {
    var locConfig = this._config;
    var x0 = locConfig[0].x,
        y0 = locConfig[0].y;
    var x1 = locConfig[1].x,
        y1 = locConfig[1].y;
    var x2 = locConfig[2].x,
        y2 = locConfig[2].y;
    var r = [cc.v2(x1 - x2, y1 - y2), cc.v2(x0 - x2, y0 - y2), cc.v2(-x2, -y2)];
    var action = new cc.BezierBy(this._duration, r);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * An action that moves the target with a cubic Bezier curve by a certain distance.
 * Relative to its movement.
 * !#zh 按贝赛尔曲线轨迹移动指定的距离。
 * @method bezierBy
 * @param {Number} t - time in seconds
 * @param {Vec2[]} c - Array of points
 * @return {ActionInterval}
 * @example
 * // example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierForward = cc.bezierBy(3, bezier);
 */

cc.bezierBy = function (t, c) {
  return new cc.BezierBy(t, c);
};
/* An action that moves the target with a cubic Bezier curve to a destination point.
 * @class BezierTo
 * @extends BezierBy
 * @param {Number} t
 * @param {Vec2[]} c - Array of points
 * @example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierTo = new cc.BezierTo(2, bezier);
 */


cc.BezierTo = cc.Class({
  name: 'cc.BezierTo',
  "extends": cc.BezierBy,
  ctor: function ctor(t, c) {
    this._toConfig = [];
    c && this.initWithDuration(t, c);
  },

  /*
   * Initializes the action.
   * @param {Number} t time in seconds
   * @param {Vec2[]} c - Array of points
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(t, c) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
      this._toConfig = c;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.BezierTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toConfig);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.BezierBy.prototype.startWithTarget.call(this, target);
    var locStartPos = this._startPosition;
    var locToConfig = this._toConfig;
    var locConfig = this._config;
    locConfig[0] = locToConfig[0].sub(locStartPos);
    locConfig[1] = locToConfig[1].sub(locStartPos);
    locConfig[2] = locToConfig[2].sub(locStartPos);
  }
});
/**
 * !#en An action that moves the target with a cubic Bezier curve to a destination point.
 * !#zh 按贝赛尔曲线轨迹移动到目标位置。
 * @method bezierTo
 * @param {Number} t
 * @param {Vec2[]} c - Array of points
 * @return {ActionInterval}
 * @example
 * // example
 * var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
 * var bezierTo = cc.bezierTo(2, bezier);
 */

cc.bezierTo = function (t, c) {
  return new cc.BezierTo(t, c);
};
/* Scales a Node object to a zoom factor by modifying it's scale property.
 * @warning This action doesn't support "reverse"
 * @class ScaleTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} sx  scale parameter in X
 * @param {Number} [sy] scale parameter in Y, if Null equal to sx
 * @example
 * // It scales to 0.5 in both X and Y.
 * var actionTo = new cc.ScaleTo(2, 0.5);
 *
 * // It scales to 0.5 in x and 2 in Y
 * var actionTo = new cc.ScaleTo(2, 0.5, 2);
 */


cc.ScaleTo = cc.Class({
  name: 'cc.ScaleTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, sx, sy) {
    this._scaleX = 1;
    this._scaleY = 1;
    this._startScaleX = 1;
    this._startScaleY = 1;
    this._endScaleX = 0;
    this._endScaleY = 0;
    this._deltaX = 0;
    this._deltaY = 0;
    sx !== undefined && cc.ScaleTo.prototype.initWithDuration.call(this, duration, sx, sy);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} sx
   * @param {Number} [sy=]
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, sx, sy) {
    //function overload here
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._endScaleX = sx;
      this._endScaleY = sy != null ? sy : sx;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.ScaleTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._startScaleX = target.scaleX;
    this._startScaleY = target.scaleY;
    this._deltaX = this._endScaleX - this._startScaleX;
    this._deltaY = this._endScaleY - this._startScaleY;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      this.target.scaleX = this._startScaleX + this._deltaX * dt;
      this.target.scaleY = this._startScaleY + this._deltaY * dt;
    }
  }
});
/**
 * !#en Scales a Node object to a zoom factor by modifying it's scale property.
 * !#zh 将节点大小缩放到指定的倍数。
 * @method scaleTo
 * @param {Number} duration
 * @param {Number} sx  scale parameter in X
 * @param {Number} [sy] scale parameter in Y, if Null equal to sx
 * @return {ActionInterval}
 * @example
 * // example
 * // It scales to 0.5 in both X and Y.
 * var actionTo = cc.scaleTo(2, 0.5);
 *
 * // It scales to 0.5 in x and 2 in Y
 * var actionTo = cc.scaleTo(2, 0.5, 2);
 */

cc.scaleTo = function (duration, sx, sy) {
  //function overload
  return new cc.ScaleTo(duration, sx, sy);
};
/* Scales a Node object a zoom factor by modifying it's scale property.
 * Relative to its changes.
 * @class ScaleBy
 * @extends ScaleTo
 */


cc.ScaleBy = cc.Class({
  name: 'cc.ScaleBy',
  "extends": cc.ScaleTo,
  startWithTarget: function startWithTarget(target) {
    cc.ScaleTo.prototype.startWithTarget.call(this, target);
    this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
    this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
  },
  reverse: function reverse() {
    var action = new cc.ScaleBy(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.ScaleBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
    return action;
  }
});
/**
 * !#en
 * Scales a Node object a zoom factor by modifying it's scale property.
 * Relative to its changes.
 * !#zh 按指定的倍数缩放节点大小。
 * @method scaleBy
 * @param {Number} duration duration in seconds
 * @param {Number} sx sx  scale parameter in X
 * @param {Number|Null} [sy=] sy scale parameter in Y, if Null equal to sx
 * @return {ActionInterval}
 * @example
 * // example without sy, it scales by 2 both in X and Y
 * var actionBy = cc.scaleBy(2, 2);
 *
 * //example with sy, it scales by 0.25 in X and 4.5 in Y
 * var actionBy2 = cc.scaleBy(2, 0.25, 4.5);
 */

cc.scaleBy = function (duration, sx, sy) {
  return new cc.ScaleBy(duration, sx, sy);
};
/* Blinks a Node object by modifying it's visible property
 * @class Blink
 * @extends ActionInterval
 * @param {Number} duration  duration in seconds
 * @param {Number} blinks  blinks in times
 * @example
 * var action = new cc.Blink(2, 10);
 */


cc.Blink = cc.Class({
  name: 'cc.Blink',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, blinks) {
    this._times = 0;
    this._originalState = false;
    blinks !== undefined && this.initWithDuration(duration, blinks);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number} blinks blinks in times
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, blinks) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._times = blinks;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Blink();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._times);
    return action;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target && !this.isDone()) {
      var slice = 1.0 / this._times;
      var m = dt % slice;
      this.target.opacity = m > slice / 2 ? 255 : 0;
    }
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._originalState = target.opacity;
  },
  stop: function stop() {
    this.target.opacity = this._originalState;
    cc.ActionInterval.prototype.stop.call(this);
  },
  reverse: function reverse() {
    var action = new cc.Blink(this._duration, this._times);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en Blinks a Node object by modifying it's visible property.
 * !#zh 闪烁（基于透明度）。
 * @method blink
 * @param {Number} duration  duration in seconds
 * @param {Number} blinks blinks in times
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.blink(2, 10);
 */

cc.blink = function (duration, blinks) {
  return new cc.Blink(duration, blinks);
};
/* Fades an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from the current value to a custom one.
 * @warning This action doesn't support "reverse"
 * @class FadeTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} opacity 0-255, 0 is transparent
 * @example
 * var action = new cc.FadeTo(1.0, 0);
 */


cc.FadeTo = cc.Class({
  name: 'cc.FadeTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, opacity) {
    this._toOpacity = 0;
    this._fromOpacity = 0;
    opacity !== undefined && cc.FadeTo.prototype.initWithDuration.call(this, duration, opacity);
  },

  /*
   * Initializes the action.
   * @param {Number} duration  duration in seconds
   * @param {Number} opacity
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, opacity) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._toOpacity = opacity;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.FadeTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  },
  update: function update(time) {
    time = this._computeEaseTime(time);
    var fromOpacity = this._fromOpacity !== undefined ? this._fromOpacity : 255;
    this.target.opacity = fromOpacity + (this._toOpacity - fromOpacity) * time;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._fromOpacity = target.opacity;
  }
});
/**
 * !#en
 * Fades an object that implements the cc.RGBAProtocol protocol.
 * It modifies the opacity from the current value to a custom one.
 * !#zh 修改透明度到指定值。
 * @method fadeTo
 * @param {Number} duration
 * @param {Number} opacity 0-255, 0 is transparent
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.fadeTo(1.0, 0);
 */

cc.fadeTo = function (duration, opacity) {
  return new cc.FadeTo(duration, opacity);
};
/* Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.<br/>
 * The "reverse" of this action is FadeOut
 * @class FadeIn
 * @extends FadeTo
 * @param {Number} duration duration in seconds
 */


cc.FadeIn = cc.Class({
  name: 'cc.FadeIn',
  "extends": cc.FadeTo,
  ctor: function ctor(duration) {
    if (duration == null) duration = 0;
    this._reverseAction = null;
    this.initWithDuration(duration, 255);
  },
  reverse: function reverse() {
    var action = new cc.FadeOut();
    action.initWithDuration(this._duration, 0);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.FadeIn();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    if (this._reverseAction) this._toOpacity = this._reverseAction._fromOpacity;
    cc.FadeTo.prototype.startWithTarget.call(this, target);
  }
});
/**
 * !#en Fades In an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 0 to 255.
 * !#zh 渐显效果。
 * @method fadeIn
 * @param {Number} duration duration in seconds
 * @return {ActionInterval}
 * @example
 * //example
 * var action = cc.fadeIn(1.0);
 */

cc.fadeIn = function (duration) {
  return new cc.FadeIn(duration);
};
/* Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
 * The "reverse" of this action is FadeIn
 * @class FadeOut
 * @extends FadeTo
 * @param {Number} duration duration in seconds
 */


cc.FadeOut = cc.Class({
  name: 'cc.FadeOut',
  "extends": cc.FadeTo,
  ctor: function ctor(duration) {
    if (duration == null) duration = 0;
    this._reverseAction = null;
    this.initWithDuration(duration, 0);
  },
  reverse: function reverse() {
    var action = new cc.FadeIn();
    action._reverseAction = this;
    action.initWithDuration(this._duration, 255);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.FadeOut();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._toOpacity);
    return action;
  }
});
/**
 * !#en Fades Out an object that implements the cc.RGBAProtocol protocol. It modifies the opacity from 255 to 0.
 * !#zh 渐隐效果。
 * @method fadeOut
 * @param {Number} d  duration in seconds
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.fadeOut(1.0);
 */

cc.fadeOut = function (d) {
  return new cc.FadeOut(d);
};
/* Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * @warning This action doesn't support "reverse"
 * @class TintTo
 * @extends ActionInterval
 * @param {Number} duration
 * @param {Number} red 0-255
 * @param {Number} green  0-255
 * @param {Number} blue 0-255
 * @example
 * var action = new cc.TintTo(2, 255, 0, 255);
 */


cc.TintTo = cc.Class({
  name: 'cc.TintTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, red, green, blue) {
    this._to = cc.color(0, 0, 0);
    this._from = cc.color(0, 0, 0);

    if (red instanceof cc.Color) {
      blue = red.b;
      green = red.g;
      red = red.r;
    }

    blue !== undefined && this.initWithDuration(duration, red, green, blue);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} red 0-255
   * @param {Number} green 0-255
   * @param {Number} blue 0-255
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, red, green, blue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._to = cc.color(red, green, blue);
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TintTo();

    this._cloneDecoration(action);

    var locTo = this._to;
    action.initWithDuration(this._duration, locTo.r, locTo.g, locTo.b);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    this._from = this.target.color;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    var locFrom = this._from,
        locTo = this._to;

    if (locFrom) {
      this.target.color = cc.color(locFrom.r + (locTo.r - locFrom.r) * dt, locFrom.g + (locTo.g - locFrom.g) * dt, locFrom.b + (locTo.b - locFrom.b) * dt);
    }
  }
});
/**
 * !#en Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * !#zh 修改颜色到指定值。
 * @method tintTo
 * @param {Number} duration
 * @param {Number} red 0-255
 * @param {Number} green  0-255
 * @param {Number} blue 0-255
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.tintTo(2, 255, 0, 255);
 */

cc.tintTo = function (duration, red, green, blue) {
  return new cc.TintTo(duration, red, green, blue);
};
/* Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * Relative to their own color change.
 * @class TintBy
 * @extends ActionInterval
 * @param {Number} duration  duration in seconds
 * @param {Number} deltaRed
 * @param {Number} deltaGreen
 * @param {Number} deltaBlue
 * @example
 * var action = new cc.TintBy(2, -127, -255, -127);
 */


cc.TintBy = cc.Class({
  name: 'cc.TintBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaRed, deltaGreen, deltaBlue) {
    this._deltaR = 0;
    this._deltaG = 0;
    this._deltaB = 0;
    this._fromR = 0;
    this._fromG = 0;
    this._fromB = 0;
    deltaBlue !== undefined && this.initWithDuration(duration, deltaRed, deltaGreen, deltaBlue);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number} deltaRed 0-255
   * @param {Number} deltaGreen 0-255
   * @param {Number} deltaBlue 0-255
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaRed, deltaGreen, deltaBlue) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      this._deltaR = deltaRed;
      this._deltaG = deltaGreen;
      this._deltaB = deltaBlue;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TintBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var color = target.color;
    this._fromR = color.r;
    this._fromG = color.g;
    this._fromB = color.b;
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    this.target.color = cc.color(this._fromR + this._deltaR * dt, this._fromG + this._deltaG * dt, this._fromB + this._deltaB * dt);
  },
  reverse: function reverse() {
    var action = new cc.TintBy(this._duration, -this._deltaR, -this._deltaG, -this._deltaB);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Tints a Node that implements the cc.NodeRGB protocol from current tint to a custom one.
 * Relative to their own color change.
 * !#zh 按照指定的增量修改颜色。
 * @method tintBy
 * @param {Number} duration  duration in seconds
 * @param {Number} deltaRed
 * @param {Number} deltaGreen
 * @param {Number} deltaBlue
 * @return {ActionInterval}
 * @example
 * // example
 * var action = cc.tintBy(2, -127, -255, -127);
 */

cc.tintBy = function (duration, deltaRed, deltaGreen, deltaBlue) {
  return new cc.TintBy(duration, deltaRed, deltaGreen, deltaBlue);
};
/* Delays the action a certain amount of seconds
 * @class DelayTime
 * @extends ActionInterval
 */


cc.DelayTime = cc.Class({
  name: 'cc.DelayTime',
  "extends": cc.ActionInterval,
  update: function update(dt) {},
  reverse: function reverse() {
    var action = new cc.DelayTime(this._duration);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  },
  clone: function clone() {
    var action = new cc.DelayTime();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration);
    return action;
  }
});
/**
 * !#en Delays the action a certain amount of seconds.
 * !#zh 延迟指定的时间量。
 * @method delayTime
 * @param {Number} d duration in seconds
 * @return {ActionInterval}
 * @example
 * // example
 * var delay = cc.delayTime(1);
 */

cc.delayTime = function (d) {
  return new cc.DelayTime(d);
};
/*
 * <p>
 * Executes an action in reverse order, from time=duration to time=0                                     <br/>
 * @warning Use this action carefully. This action is not sequenceable.                                 <br/>
 * Use it as the default "reversed" method of your own actions, but using it outside the "reversed"      <br/>
 * scope is not recommended.
 * </p>
 * @class ReverseTime
 * @extends ActionInterval
 * @param {FiniteTimeAction} action
 * @example
 *  var reverse = new cc.ReverseTime(this);
 */


cc.ReverseTime = cc.Class({
  name: 'cc.ReverseTime',
  "extends": cc.ActionInterval,
  ctor: function ctor(action) {
    this._other = null;
    action && this.initWithAction(action);
  },

  /*
   * @param {FiniteTimeAction} action
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action) {
    if (!action) {
      cc.errorID(1028);
      return false;
    }

    if (action === this._other) {
      cc.errorID(1029);
      return false;
    }

    if (cc.ActionInterval.prototype.initWithDuration.call(this, action._duration)) {
      // Don't leak if action is reused
      this._other = action;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.ReverseTime();

    this._cloneDecoration(action);

    action.initWithAction(this._other.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._other.startWithTarget(target);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);
    if (this._other) this._other.update(1 - dt);
  },
  reverse: function reverse() {
    return this._other.clone();
  },
  stop: function stop() {
    this._other.stop();

    cc.Action.prototype.stop.call(this);
  }
});
/**
 * !#en Executes an action in reverse order, from time=duration to time=0.
 * !#zh 反转目标动作的时间轴。
 * @method reverseTime
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 * @example
 * // example
 *  var reverse = cc.reverseTime(this);
 */

cc.reverseTime = function (action) {
  return new cc.ReverseTime(action);
};
/*
 * <p>
 * Overrides the target of an action so that it always runs on the target<br/>
 * specified at action creation rather than the one specified by runAction.
 * </p>
 * @class TargetedAction
 * @extends ActionInterval
 * @param {Node} target
 * @param {FiniteTimeAction} action
 */


cc.TargetedAction = cc.Class({
  name: 'cc.TargetedAction',
  "extends": cc.ActionInterval,
  ctor: function ctor(target, action) {
    this._action = null;
    this._forcedTarget = null;
    action && this.initWithTarget(target, action);
  },

  /*
   * Init an action with the specified action and forced target
   * @param {Node} target
   * @param {FiniteTimeAction} action
   * @return {Boolean}
   */
  initWithTarget: function initWithTarget(target, action) {
    if (this.initWithDuration(action._duration)) {
      this._forcedTarget = target;
      this._action = action;
      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.TargetedAction();

    this._cloneDecoration(action);

    action.initWithTarget(this._forcedTarget, this._action.clone());
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._action.startWithTarget(this._forcedTarget);
  },
  stop: function stop() {
    this._action.stop();
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    this._action.update(dt);
  },

  /*
   * return the target that the action will be forced to run with
   * @return {Node}
   */
  getForcedTarget: function getForcedTarget() {
    return this._forcedTarget;
  },

  /*
   * set the target that the action will be forced to run with
   * @param {Node} forcedTarget
   */
  setForcedTarget: function setForcedTarget(forcedTarget) {
    if (this._forcedTarget !== forcedTarget) this._forcedTarget = forcedTarget;
  }
});
/**
 * !#en Create an action with the specified action and forced target.
 * !#zh 用已有动作和一个新的目标节点创建动作。
 * @method targetedAction
 * @param {Node} target
 * @param {FiniteTimeAction} action
 * @return {ActionInterval}
 */

cc.targetedAction = function (target, action) {
  return new cc.TargetedAction(target, action);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uSW50ZXJ2YWwuanMiXSwibmFtZXMiOlsiY2MiLCJBY3Rpb25JbnRlcnZhbCIsIkNsYXNzIiwibmFtZSIsIkZpbml0ZVRpbWVBY3Rpb24iLCJjdG9yIiwiZCIsIk1BWF9WQUxVRSIsIl9lbGFwc2VkIiwiX2ZpcnN0VGljayIsIl9lYXNlTGlzdCIsIl9zcGVlZCIsIl90aW1lc0ZvclJlcGVhdCIsIl9yZXBlYXRGb3JldmVyIiwiX3JlcGVhdE1ldGhvZCIsIl9zcGVlZE1ldGhvZCIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsImluaXRXaXRoRHVyYXRpb24iLCJjYWxsIiwiZ2V0RWxhcHNlZCIsIl9kdXJhdGlvbiIsIm1hY3JvIiwiRkxUX0VQU0lMT04iLCJpc0RvbmUiLCJfY2xvbmVEZWNvcmF0aW9uIiwiYWN0aW9uIiwiX3JldmVyc2VFYXNlTGlzdCIsImkiLCJsZW5ndGgiLCJwdXNoIiwicmV2ZXJzZSIsImNsb25lIiwiZWFzaW5nIiwiZWFzZU9iaiIsImFyZ3VtZW50cyIsIl9jb21wdXRlRWFzZVRpbWUiLCJkdCIsImxvY0xpc3QiLCJuIiwic3RlcCIsInQiLCJ1cGRhdGUiLCJzdGFydFdpdGhUYXJnZXQiLCJ0YXJnZXQiLCJBY3Rpb24iLCJsb2dJRCIsInNldEFtcGxpdHVkZVJhdGUiLCJhbXAiLCJnZXRBbXBsaXR1ZGVSYXRlIiwic3BlZWQiLCJnZXRTcGVlZCIsInNldFNwZWVkIiwicmVwZWF0IiwidGltZXMiLCJNYXRoIiwicm91bmQiLCJpc05hTiIsInJlcGVhdEZvcmV2ZXIiLCJhY3Rpb25JbnRlcnZhbCIsIlNlcXVlbmNlIiwidGVtcEFycmF5IiwiX2FjdGlvbnMiLCJfc3BsaXQiLCJfbGFzdCIsIl9yZXZlcnNlZCIsInBhcmFtQXJyYXkiLCJBcnJheSIsImVycm9ySUQiLCJsYXN0IiwicHJldiIsImFjdGlvbjEiLCJfYWN0aW9uT25lVHdvIiwiaW5pdFdpdGhUd29BY3Rpb25zIiwiYWN0aW9uT25lIiwiYWN0aW9uVHdvIiwiZHVyYXRpb25PbmUiLCJkdXJhdGlvblR3byIsInN0b3AiLCJuZXdfdCIsImZvdW5kIiwibG9jU3BsaXQiLCJsb2NBY3Rpb25zIiwibG9jTGFzdCIsImFjdGlvbkZvdW5kIiwic2VxdWVuY2UiLCJyZXN1bHQiLCJSZXBlYXQiLCJfdGltZXMiLCJfdG90YWwiLCJfbmV4dER0IiwiX2FjdGlvbkluc3RhbnQiLCJfaW5uZXJBY3Rpb24iLCJpbml0V2l0aEFjdGlvbiIsImR1cmF0aW9uIiwiQWN0aW9uSW5zdGFudCIsImxvY0lubmVyQWN0aW9uIiwibG9jRHVyYXRpb24iLCJsb2NUaW1lcyIsImxvY05leHREdCIsInNldElubmVyQWN0aW9uIiwiZ2V0SW5uZXJBY3Rpb24iLCJSZXBlYXRGb3JldmVyIiwiU3Bhd24iLCJfb25lIiwiX3R3byIsImFjdGlvbjIiLCJyZXQiLCJkMSIsImQyIiwibWF4IiwiZGVsYXlUaW1lIiwic3Bhd24iLCJwU3Bhd24iLCJSb3RhdGVUbyIsInN0YXRpY3MiLCJfcmV2ZXJzZSIsImRzdEFuZ2xlIiwiX3N0YXJ0QW5nbGUiLCJfZHN0QW5nbGUiLCJfYW5nbGUiLCJzdGFydEFuZ2xlIiwiYW5nbGUiLCJyb3RhdGVUbyIsIlJvdGF0ZUJ5IiwiZGVsdGFBbmdsZSIsIl9kZWx0YUFuZ2xlIiwicm90YXRlQnkiLCJNb3ZlQnkiLCJkZWx0YVBvcyIsImRlbHRhWSIsIl9wb3NpdGlvbkRlbHRhIiwidjIiLCJfc3RhcnRQb3NpdGlvbiIsIl9wcmV2aW91c1Bvc2l0aW9uIiwicG9zaXRpb24iLCJ5IiwieCIsImxvY1Bvc1giLCJsb2NQb3NZIiwibG9jU3RhcnRQb3NpdGlvbiIsIkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUyIsInRhcmdldFgiLCJ0YXJnZXRZIiwibG9jUHJldmlvdXNQb3NpdGlvbiIsInNldFBvc2l0aW9uIiwibW92ZUJ5IiwiTW92ZVRvIiwiX2VuZFBvc2l0aW9uIiwibW92ZVRvIiwiU2tld1RvIiwic3giLCJzeSIsIl9za2V3WCIsIl9za2V3WSIsIl9zdGFydFNrZXdYIiwiX3N0YXJ0U2tld1kiLCJfZW5kU2tld1giLCJfZW5kU2tld1kiLCJfZGVsdGFYIiwiX2RlbHRhWSIsInNrZXdYIiwic2tld1kiLCJza2V3VG8iLCJTa2V3QnkiLCJkZWx0YVNrZXdYIiwiZGVsdGFTa2V3WSIsInNrZXdCeSIsIkp1bXBCeSIsImhlaWdodCIsImp1bXBzIiwiX2RlbHRhIiwiX2hlaWdodCIsIl9qdW1wcyIsImZyYWMiLCJqdW1wQnkiLCJKdW1wVG8iLCJqdW1wVG8iLCJiZXppZXJBdCIsImEiLCJiIiwiYyIsInBvdyIsIkJlemllckJ5IiwiX2NvbmZpZyIsIm5ld0NvbmZpZ3MiLCJzZWxDb25mIiwibG9jQ29uZmlnIiwieGEiLCJ4YiIsInhjIiwieGQiLCJ5YSIsInliIiwieWMiLCJ5ZCIsIngwIiwieTAiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInIiLCJiZXppZXJCeSIsIkJlemllclRvIiwiX3RvQ29uZmlnIiwibG9jU3RhcnRQb3MiLCJsb2NUb0NvbmZpZyIsInN1YiIsImJlemllclRvIiwiU2NhbGVUbyIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiX3N0YXJ0U2NhbGVYIiwiX3N0YXJ0U2NhbGVZIiwiX2VuZFNjYWxlWCIsIl9lbmRTY2FsZVkiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVRvIiwiU2NhbGVCeSIsInNjYWxlQnkiLCJCbGluayIsImJsaW5rcyIsIl9vcmlnaW5hbFN0YXRlIiwic2xpY2UiLCJtIiwib3BhY2l0eSIsImJsaW5rIiwiRmFkZVRvIiwiX3RvT3BhY2l0eSIsIl9mcm9tT3BhY2l0eSIsInRpbWUiLCJmcm9tT3BhY2l0eSIsImZhZGVUbyIsIkZhZGVJbiIsIl9yZXZlcnNlQWN0aW9uIiwiRmFkZU91dCIsImZhZGVJbiIsImZhZGVPdXQiLCJUaW50VG8iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJfdG8iLCJjb2xvciIsIl9mcm9tIiwiQ29sb3IiLCJnIiwibG9jVG8iLCJsb2NGcm9tIiwidGludFRvIiwiVGludEJ5IiwiZGVsdGFSZWQiLCJkZWx0YUdyZWVuIiwiZGVsdGFCbHVlIiwiX2RlbHRhUiIsIl9kZWx0YUciLCJfZGVsdGFCIiwiX2Zyb21SIiwiX2Zyb21HIiwiX2Zyb21CIiwidGludEJ5IiwiRGVsYXlUaW1lIiwiUmV2ZXJzZVRpbWUiLCJfb3RoZXIiLCJyZXZlcnNlVGltZSIsIlRhcmdldGVkQWN0aW9uIiwiX2FjdGlvbiIsIl9mb3JjZWRUYXJnZXQiLCJpbml0V2l0aFRhcmdldCIsImdldEZvcmNlZFRhcmdldCIsInNldEZvcmNlZFRhcmdldCIsImZvcmNlZFRhcmdldCIsInRhcmdldGVkQWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsY0FBSCxHQUFvQkQsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxtQkFEbUI7QUFFekIsYUFBU0gsRUFBRSxDQUFDSSxnQkFGYTtBQUl6QkMsRUFBQUEsSUFBSSxFQUFDLGNBQVVDLENBQVYsRUFBYTtBQUNkLFNBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLEtBQXRCO0FBQ0EsU0FBS0MsYUFBTCxH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d0I7QUFxQ3pCL0wsRUFBQUEsSUFBSSxFQUFDLGdCQUFZO0FBQ2IsU0FBSzhMLE9BQUwsQ0FBYTlMLElBQWI7QUFDSCxHQXZDd0I7QUF5Q3pCcEMsRUFBQUEsTUFBTSxFQUFDLGdCQUFVTCxFQUFWLEVBQWM7QUFDakJBLElBQUFBLEVBQUUsR0FBRyxLQUFLRCxnQkFBTCxDQUFzQkMsRUFBdEIsQ0FBTDs7QUFDQSxTQUFLdU8sT0FBTCxDQUFhbE8sTUFBYixDQUFvQkwsRUFBcEI7QUFDSCxHQTVDd0I7O0FBOEN6QjtBQUNKO0FBQ0E7QUFDQTtBQUNJME8sRUFBQUEsZUFBZSxFQUFDLDJCQUFZO0FBQ3hCLFdBQU8sS0FBS0YsYUFBWjtBQUNILEdBcER3Qjs7QUFzRHpCO0FBQ0o7QUFDQTtBQUNBO0FBQ0lHLEVBQUFBLGVBQWUsRUFBQyx5QkFBVUMsWUFBVixFQUF3QjtBQUNwQyxRQUFJLEtBQUtKLGFBQUwsS0FBdUJJLFlBQTNCLEVBQ0ksS0FBS0osYUFBTCxHQUFxQkksWUFBckI7QUFDUDtBQTdEd0IsQ0FBVCxDQUFwQjtBQWdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBalIsRUFBRSxDQUFDa1IsY0FBSCxHQUFvQixVQUFVdE8sTUFBVixFQUFrQmxCLE1BQWxCLEVBQTBCO0FBQzFDLFNBQU8sSUFBSTFCLEVBQUUsQ0FBQzJRLGNBQVAsQ0FBc0IvTixNQUF0QixFQUE4QmxCLE1BQTlCLENBQVA7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxyXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiA8cD4gQW4gaW50ZXJ2YWwgYWN0aW9uIGlzIGFuIGFjdGlvbiB0aGF0IHRha2VzIHBsYWNlIHdpdGhpbiBhIGNlcnRhaW4gcGVyaW9kIG9mIHRpbWUuIDxici8+XHJcbiAqIEl0IGhhcyBhbiBzdGFydCB0aW1lLCBhbmQgYSBmaW5pc2ggdGltZS4gVGhlIGZpbmlzaCB0aW1lIGlzIHRoZSBwYXJhbWV0ZXI8YnIvPlxyXG4gKiBkdXJhdGlvbiBwbHVzIHRoZSBzdGFydCB0aW1lLjwvcD5cclxuICpcclxuICogPHA+VGhlc2UgQ0NBY3Rpb25JbnRlcnZhbCBhY3Rpb25zIGhhdmUgc29tZSBpbnRlcmVzdGluZyBwcm9wZXJ0aWVzLCBsaWtlOjxici8+XHJcbiAqIC0gVGhleSBjYW4gcnVuIG5vcm1hbGx5IChkZWZhdWx0KSAgPGJyLz5cclxuICogLSBUaGV5IGNhbiBydW4gcmV2ZXJzZWQgd2l0aCB0aGUgcmV2ZXJzZSBtZXRob2QgICA8YnIvPlxyXG4gKiAtIFRoZXkgY2FuIHJ1biB3aXRoIHRoZSB0aW1lIGFsdGVyZWQgd2l0aCB0aGUgQWNjZWxlcmF0ZSwgQWNjZWxEZWNjZWwgYW5kIFNwZWVkIGFjdGlvbnMuIDwvcD5cclxuICpcclxuICogPHA+Rm9yIGV4YW1wbGUsIHlvdSBjYW4gc2ltdWxhdGUgYSBQaW5nIFBvbmcgZWZmZWN0IHJ1bm5pbmcgdGhlIGFjdGlvbiBub3JtYWxseSBhbmQ8YnIvPlxyXG4gKiB0aGVuIHJ1bm5pbmcgaXQgYWdhaW4gaW4gUmV2ZXJzZSBtb2RlLiA8L3A+XHJcbiAqICEjemgg5pe26Ze06Ze06ZqU5Yqo5L2c77yM6L+Z56eN5Yqo5L2c5Zyo5bey5a6a5pe26Ze05YaF5a6M5oiQ77yM57un5om/IEZpbml0ZVRpbWVBY3Rpb27jgIJcclxuICogQGNsYXNzIEFjdGlvbkludGVydmFsXHJcbiAqIEBleHRlbmRzIEZpbml0ZVRpbWVBY3Rpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKi9cclxuY2MuQWN0aW9uSW50ZXJ2YWwgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQWN0aW9uSW50ZXJ2YWwnLFxyXG4gICAgZXh0ZW5kczogY2MuRmluaXRlVGltZUFjdGlvbixcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgdGhpcy5NQVhfVkFMVUUgPSAyO1xyXG4gICAgICAgIHRoaXMuX2VsYXBzZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2ZpcnN0VGljayA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2Vhc2VMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5fdGltZXNGb3JSZXBlYXQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3JlcGVhdEZvcmV2ZXIgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZXBlYXRNZXRob2QgPSBmYWxzZTsvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWRcclxuICAgICAgICB0aGlzLl9zcGVlZE1ldGhvZCA9IGZhbHNlOy8vQ29tcGF0aWJsZSB3aXRoIHJlcGVhdCBjbGFzcywgRGlzY2FyZCBhZnRlciBjYW4gYmUgZGVsZXRlZFxyXG4gICAgICAgIGQgIT09IHVuZGVmaW5lZCAmJiBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSG93IG1hbnkgc2Vjb25kcyBoYWQgZWxhcHNlZCBzaW5jZSB0aGUgYWN0aW9ucyBzdGFydGVkIHRvIHJ1bi5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0RWxhcHNlZDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsYXBzZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gKGQgPT09IDApID8gY2MubWFjcm8uRkxUX0VQU0lMT04gOiBkO1xyXG4gICAgICAgIC8vIHByZXZlbnQgZGl2aXNpb24gYnkgMFxyXG4gICAgICAgIC8vIFRoaXMgY29tcGFyaXNvbiBjb3VsZCBiZSBpbiBzdGVwOiwgYnV0IGl0IG1pZ2h0IGRlY3JlYXNlIHRoZSBwZXJmb3JtYW5jZVxyXG4gICAgICAgIC8vIGJ5IDMlIGluIGhlYXZ5IGJhc2VkIGFjdGlvbiBnYW1lcy5cclxuICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcclxuICAgICAgICB0aGlzLl9maXJzdFRpY2sgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5fZWxhcHNlZCA+PSB0aGlzLl9kdXJhdGlvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jbG9uZURlY29yYXRpb246IGZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgYWN0aW9uLl9yZXBlYXRGb3JldmVyID0gdGhpcy5fcmVwZWF0Rm9yZXZlcjtcclxuICAgICAgICBhY3Rpb24uX3NwZWVkID0gdGhpcy5fc3BlZWQ7XHJcbiAgICAgICAgYWN0aW9uLl90aW1lc0ZvclJlcGVhdCA9IHRoaXMuX3RpbWVzRm9yUmVwZWF0O1xyXG4gICAgICAgIGFjdGlvbi5fZWFzZUxpc3QgPSB0aGlzLl9lYXNlTGlzdDtcclxuICAgICAgICBhY3Rpb24uX3NwZWVkTWV0aG9kID0gdGhpcy5fc3BlZWRNZXRob2Q7XHJcbiAgICAgICAgYWN0aW9uLl9yZXBlYXRNZXRob2QgPSB0aGlzLl9yZXBlYXRNZXRob2Q7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXZlcnNlRWFzZUxpc3Q6IGZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgaWYodGhpcy5fZWFzZUxpc3Qpe1xyXG4gICAgICAgICAgICBhY3Rpb24uX2Vhc2VMaXN0ID0gW107XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHRoaXMuX2Vhc2VMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5fZWFzZUxpc3QucHVzaCh0aGlzLl9lYXNlTGlzdFtpXS5yZXZlcnNlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5BY3Rpb25JbnRlcnZhbCh0aGlzLl9kdXJhdGlvbik7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEltcGxlbWVudGF0aW9uIG9mIGVhc2UgbW90aW9uLlxyXG4gICAgICogISN6aCDnvJPliqjov5DliqjjgIJcclxuICAgICAqIEBtZXRob2QgZWFzaW5nXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWFzZU9ialxyXG4gICAgICogQHJldHVybnMge0FjdGlvbkludGVydmFsfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGFjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDMuMCkpO1xyXG4gICAgICovXHJcbiAgICBlYXNpbmc6IGZ1bmN0aW9uIChlYXNlT2JqKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Vhc2VMaXN0KVxyXG4gICAgICAgICAgICB0aGlzLl9lYXNlTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fZWFzZUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5fZWFzZUxpc3QucHVzaChhcmd1bWVudHNbaV0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY29tcHV0ZUVhc2VUaW1lOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgbG9jTGlzdCA9IHRoaXMuX2Vhc2VMaXN0O1xyXG4gICAgICAgIGlmICgoIWxvY0xpc3QpIHx8IChsb2NMaXN0Lmxlbmd0aCA9PT0gMCkpXHJcbiAgICAgICAgICAgIHJldHVybiBkdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGxvY0xpc3QubGVuZ3RoOyBpIDwgbjsgaSsrKVxyXG4gICAgICAgICAgICBkdCA9IGxvY0xpc3RbaV0uZWFzaW5nKGR0KTtcclxuICAgICAgICByZXR1cm4gZHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpcnN0VGljaykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJzdFRpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZWxhcHNlZCA9IDA7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX2VsYXBzZWQgKz0gZHQ7XHJcblxyXG4gICAgICAgIC8vdGhpcy51cGRhdGUoKDEgPiAodGhpcy5fZWxhcHNlZCAvIHRoaXMuX2R1cmF0aW9uKSkgPyB0aGlzLl9lbGFwc2VkIC8gdGhpcy5fZHVyYXRpb24gOiAxKTtcclxuICAgICAgICAvL3RoaXMudXBkYXRlKE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMuX2VsYXBzZWQgLyBNYXRoLm1heCh0aGlzLl9kdXJhdGlvbiwgY2MubWFjcm8uRkxUX0VQU0lMT04pKSkpO1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy5fZWxhcHNlZCAvICh0aGlzLl9kdXJhdGlvbiA+IDAuMDAwMDAwMTE5MjA5Mjg5NiA/IHRoaXMuX2R1cmF0aW9uIDogMC4wMDAwMDAxMTkyMDkyODk2KTtcclxuICAgICAgICB0ID0gKDEgPiB0ID8gdCA6IDEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHQgPiAwID8gdCA6IDApO1xyXG5cclxuICAgICAgICAvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWQgKHRoaXMuX3JlcGVhdE1ldGhvZClcclxuICAgICAgICBpZih0aGlzLl9yZXBlYXRNZXRob2QgJiYgdGhpcy5fdGltZXNGb3JSZXBlYXQgPiAxICYmIHRoaXMuaXNEb25lKCkpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5fcmVwZWF0Rm9yZXZlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lc0ZvclJlcGVhdC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIGRpZmYgPSBsb2NJbm5lckFjdGlvbi5nZXRFbGFwc2VkKCkgLSBsb2NJbm5lckFjdGlvbi5fZHVyYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgLy8gdG8gcHJldmVudCBqZXJrLiBpc3N1ZSAjMzkwICwxMjQ3XHJcbiAgICAgICAgICAgIC8vdGhpcy5faW5uZXJBY3Rpb24uc3RlcCgwKTtcclxuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKGRpZmYpO1xyXG4gICAgICAgICAgICB0aGlzLnN0ZXAodGhpcy5fZWxhcHNlZCAtIHRoaXMuX2R1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcclxuICAgICAgICB0aGlzLl9maXJzdFRpY2sgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5sb2dJRCgxMDEwKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIFNldCBhbXBsaXR1ZGUgcmF0ZS5cclxuICAgICAqIEB3YXJuaW5nIEl0IHNob3VsZCBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGFtcFxyXG4gICAgICovXHJcbiAgICBzZXRBbXBsaXR1ZGVSYXRlOmZ1bmN0aW9uIChhbXApIHtcclxuICAgICAgICAvLyBBYnN0cmFjdCBjbGFzcyBuZWVkcyBpbXBsZW1lbnRhdGlvblxyXG4gICAgICAgIGNjLmxvZ0lEKDEwMTEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0IGFtcGxpdHVkZSByYXRlLlxyXG4gICAgICogQHdhcm5pbmcgSXQgc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3MuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IDBcclxuICAgICAqL1xyXG4gICAgZ2V0QW1wbGl0dWRlUmF0ZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQWJzdHJhY3QgY2xhc3MgbmVlZHMgaW1wbGVtZW50YXRpb25cclxuICAgICAgICBjYy5sb2dJRCgxMDEyKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDaGFuZ2VzIHRoZSBzcGVlZCBvZiBhbiBhY3Rpb24sIG1ha2luZyBpdCB0YWtlIGxvbmdlciAoc3BlZWQ+MSlcclxuICAgICAqIG9yIGxlc3MgKHNwZWVkPDEpIHRpbWUuIDxici8+XHJcbiAgICAgKiBVc2VmdWwgdG8gc2ltdWxhdGUgJ3Nsb3cgbW90aW9uJyBvciAnZmFzdCBmb3J3YXJkJyBlZmZlY3QuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmlLnlj5jkuIDkuKrliqjkvZznmoTpgJ/luqbvvIzkvb/lroPnmoTmiafooYzkvb/nlKjmm7Tplb/nmoTml7bpl7TvvIhzcGVlZCA+IDHvvIk8YnIvPlxyXG4gICAgICog5oiW5pu05bCR77yIc3BlZWQgPCAx77yJ5Y+v5Lul5pyJ5pWI5b6X5qih5ouf4oCc5oWi5Yqo5L2c4oCd5oiW4oCc5b+r6L+b4oCd55qE5pWI5p6c44CCXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3BlZWRcclxuICAgICAqIEByZXR1cm5zIHtBY3Rpb259XHJcbiAgICAgKi9cclxuICAgIHNwZWVkOiBmdW5jdGlvbihzcGVlZCl7XHJcbiAgICAgICAgaWYoc3BlZWQgPD0gMCl7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMTMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NwZWVkTWV0aG9kID0gdHJ1ZTsvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWRcclxuICAgICAgICB0aGlzLl9zcGVlZCAqPSBzcGVlZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhpcyBhY3Rpb24gc3BlZWQuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFNwZWVkOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhpcyBhY3Rpb24gc3BlZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3BlZWRcclxuICAgICAqIEByZXR1cm5zIHtBY3Rpb25JbnRlcnZhbH1cclxuICAgICAqL1xyXG4gICAgc2V0U3BlZWQ6IGZ1bmN0aW9uKHNwZWVkKXtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlcGVhdHMgYW4gYWN0aW9uIGEgbnVtYmVyIG9mIHRpbWVzLlxyXG4gICAgICogVG8gcmVwZWF0IGFuIGFjdGlvbiBmb3JldmVyIHVzZSB0aGUgQ0NSZXBlYXRGb3JldmVyIGFjdGlvbi5cclxuICAgICAqICEjemgg6YeN5aSN5Yqo5L2c5Y+v5Lul5oyJ5LiA5a6a5qyh5pWw6YeN5aSN5LiA5Liq5Yqo5L2c77yM5L2/55SoIFJlcGVhdEZvcmV2ZXIg5Yqo5L2c5p2l5rC46L+c6YeN5aSN5LiA5Liq5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlcGVhdFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzXHJcbiAgICAgKiBAcmV0dXJucyB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAgICAgKi9cclxuICAgIHJlcGVhdDogZnVuY3Rpb24odGltZXMpe1xyXG4gICAgICAgIHRpbWVzID0gTWF0aC5yb3VuZCh0aW1lcyk7XHJcbiAgICAgICAgaWYoaXNOYU4odGltZXMpIHx8IHRpbWVzIDwgMSl7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMTQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0TWV0aG9kID0gdHJ1ZTsvL0NvbXBhdGlibGUgd2l0aCByZXBlYXQgY2xhc3MsIERpc2NhcmQgYWZ0ZXIgY2FuIGJlIGRlbGV0ZWRcclxuICAgICAgICB0aGlzLl90aW1lc0ZvclJlcGVhdCAqPSB0aW1lcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZXBlYXRzIGFuIGFjdGlvbiBmb3IgZXZlci4gIDxici8+XHJcbiAgICAgKiBUbyByZXBlYXQgdGhlIGFuIGFjdGlvbiBmb3IgYSBsaW1pdGVkIG51bWJlciBvZiB0aW1lcyB1c2UgdGhlIFJlcGVhdCBhY3Rpb24uIDxici8+XHJcbiAgICAgKiAhI3poIOawuOi/nOWcsOmHjeWkjeS4gOS4quWKqOS9nO+8jOaciemZkOasoeaVsOWGhemHjeWkjeS4gOS4quWKqOS9nOivt+S9v+eUqCBSZXBlYXQg5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlcGVhdEZvcmV2ZXJcclxuICAgICAqIEByZXR1cm5zIHtBY3Rpb25JbnRlcnZhbH1cclxuICAgICAqL1xyXG4gICAgcmVwZWF0Rm9yZXZlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLl9yZXBlYXRNZXRob2QgPSB0cnVlOy8vQ29tcGF0aWJsZSB3aXRoIHJlcGVhdCBjbGFzcywgRGlzY2FyZCBhZnRlciBjYW4gYmUgZGVsZXRlZFxyXG4gICAgICAgIHRoaXMuX3RpbWVzRm9yUmVwZWF0ID0gdGhpcy5NQVhfVkFMVUU7XHJcbiAgICAgICAgdGhpcy5fcmVwZWF0Rm9yZXZlciA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuYWN0aW9uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5BY3Rpb25JbnRlcnZhbChkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLypcclxuICogUnVucyBhY3Rpb25zIHNlcXVlbnRpYWxseSwgb25lIGFmdGVyIGFub3RoZXIuXHJcbiAqIEBjbGFzcyBTZXF1ZW5jZVxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge0FycmF5fEZpbml0ZVRpbWVBY3Rpb259IHRlbXBBcnJheVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBjcmVhdGUgc2VxdWVuY2Ugd2l0aCBhY3Rpb25zXHJcbiAqIHZhciBzZXEgPSBuZXcgY2MuU2VxdWVuY2UoYWN0MSwgYWN0Mik7XHJcbiAqXHJcbiAqIC8vIGNyZWF0ZSBzZXF1ZW5jZSB3aXRoIGFycmF5XHJcbiAqIHZhciBzZXEgPSBuZXcgY2MuU2VxdWVuY2UoYWN0QXJyYXkpO1xyXG4gKi9cclxuY2MuU2VxdWVuY2UgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2VxdWVuY2UnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbiAodGVtcEFycmF5KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NwbGl0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYXN0ID0gMDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW1BcnJheSA9ICh0ZW1wQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkgPyB0ZW1wQXJyYXkgOiBhcmd1bWVudHM7XHJcbiAgICAgICAgaWYgKHBhcmFtQXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAxOSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc3QgPSBwYXJhbUFycmF5Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKChsYXN0ID49IDApICYmIChwYXJhbUFycmF5W2xhc3RdID09IG51bGwpKVxyXG4gICAgICAgICAgICBjYy5sb2dJRCgxMDE1KTtcclxuXHJcbiAgICAgICAgaWYgKGxhc3QgPj0gMCkge1xyXG4gICAgICAgICAgICB2YXIgcHJldiA9IHBhcmFtQXJyYXlbMF0sIGFjdGlvbjE7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGFzdDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1BcnJheVtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjEgPSBwcmV2O1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBjYy5TZXF1ZW5jZS5fYWN0aW9uT25lVHdvKGFjdGlvbjEsIHBhcmFtQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFdpdGhUd29BY3Rpb25zKHByZXYsIHBhcmFtQXJyYXlbbGFzdF0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24gPGJyLz5cclxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uT25lXHJcbiAgICAgKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblR3b1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhUd29BY3Rpb25zOmZ1bmN0aW9uIChhY3Rpb25PbmUsIGFjdGlvblR3bykge1xyXG4gICAgICAgIGlmICghYWN0aW9uT25lIHx8ICFhY3Rpb25Ud28pIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDI1KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGR1cmF0aW9uT25lID0gYWN0aW9uT25lLl9kdXJhdGlvbiwgZHVyYXRpb25Ud28gPSBhY3Rpb25Ud28uX2R1cmF0aW9uO1xyXG4gICAgICAgIGR1cmF0aW9uT25lICo9IGFjdGlvbk9uZS5fcmVwZWF0TWV0aG9kID8gYWN0aW9uT25lLl90aW1lc0ZvclJlcGVhdCA6IDE7XHJcbiAgICAgICAgZHVyYXRpb25Ud28gKj0gYWN0aW9uVHdvLl9yZXBlYXRNZXRob2QgPyBhY3Rpb25Ud28uX3RpbWVzRm9yUmVwZWF0IDogMTtcclxuICAgICAgICB2YXIgZCA9IGR1cmF0aW9uT25lICsgZHVyYXRpb25Ud287XHJcbiAgICAgICAgdGhpcy5pbml0V2l0aER1cmF0aW9uKGQpO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3Rpb25zWzBdID0gYWN0aW9uT25lO1xyXG4gICAgICAgIHRoaXMuX2FjdGlvbnNbMV0gPSBhY3Rpb25Ud287XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlNlcXVlbmNlKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoVHdvQWN0aW9ucyh0aGlzLl9hY3Rpb25zWzBdLmNsb25lKCksIHRoaXMuX2FjdGlvbnNbMV0uY2xvbmUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9zcGxpdCA9IHRoaXMuX2FjdGlvbnNbMF0uX2R1cmF0aW9uIC8gdGhpcy5fZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy5fc3BsaXQgKj0gdGhpcy5fYWN0aW9uc1swXS5fcmVwZWF0TWV0aG9kID8gdGhpcy5fYWN0aW9uc1swXS5fdGltZXNGb3JSZXBlYXQgOiAxO1xyXG4gICAgICAgIHRoaXMuX2xhc3QgPSAtMTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gSXNzdWUgIzEzMDVcclxuICAgICAgICBpZiAodGhpcy5fbGFzdCAhPT0gLTEpXHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnNbdGhpcy5fbGFzdF0uc3RvcCgpO1xyXG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdmFyIG5ld190LCBmb3VuZCA9IDA7XHJcbiAgICAgICAgdmFyIGxvY1NwbGl0ID0gdGhpcy5fc3BsaXQsIGxvY0FjdGlvbnMgPSB0aGlzLl9hY3Rpb25zLCBsb2NMYXN0ID0gdGhpcy5fbGFzdCwgYWN0aW9uRm91bmQ7XHJcblxyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICBpZiAoZHQgPCBsb2NTcGxpdCkge1xyXG4gICAgICAgICAgICAvLyBhY3Rpb25bMF1cclxuICAgICAgICAgICAgbmV3X3QgPSAobG9jU3BsaXQgIT09IDApID8gZHQgLyBsb2NTcGxpdCA6IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoZm91bmQgPT09IDAgJiYgbG9jTGFzdCA9PT0gMSAmJiB0aGlzLl9yZXZlcnNlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV2ZXJzZSBtb2RlID9cclxuICAgICAgICAgICAgICAgIC8vIFhYWDogQnVnLiB0aGlzIGNhc2UgZG9lc24ndCBjb250ZW1wbGF0ZSB3aGVuIF9sYXN0PT0tMSwgZm91bmQ9MCBhbmQgaW4gXCJyZXZlcnNlIG1vZGVcIlxyXG4gICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgd2lsbCByZXF1aXJlIGEgaGFjayB0byBrbm93IGlmIGFuIGFjdGlvbiBpcyBvbiByZXZlcnNlIG1vZGUgb3Igbm90LlxyXG4gICAgICAgICAgICAgICAgLy8gXCJzdGVwXCIgc2hvdWxkIGJlIG92ZXJyaWRlbiwgYW5kIHRoZSBcInJldmVyc2VNb2RlXCIgdmFsdWUgcHJvcGFnYXRlZCB0byBpbm5lciBTZXF1ZW5jZXMuXHJcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzFdLnVwZGF0ZSgwKTtcclxuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMV0uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYWN0aW9uWzFdXHJcbiAgICAgICAgICAgIGZvdW5kID0gMTtcclxuICAgICAgICAgICAgbmV3X3QgPSAobG9jU3BsaXQgPT09IDEpID8gMSA6IChkdCAtIGxvY1NwbGl0KSAvICgxIC0gbG9jU3BsaXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY0xhc3QgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhY3Rpb25bMF0gd2FzIHNraXBwZWQsIGV4ZWN1dGUgaXQuXHJcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzBdLnN0YXJ0V2l0aFRhcmdldCh0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzBdLnVwZGF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMF0uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsb2NMYXN0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2hpbmcgdG8gYWN0aW9uIDEuIHN0b3AgYWN0aW9uIDAuXHJcbiAgICAgICAgICAgICAgICBsb2NBY3Rpb25zWzBdLnVwZGF0ZSgxKTtcclxuICAgICAgICAgICAgICAgIGxvY0FjdGlvbnNbMF0uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhY3Rpb25Gb3VuZCA9IGxvY0FjdGlvbnNbZm91bmRdO1xyXG4gICAgICAgIC8vIExhc3QgYWN0aW9uIGZvdW5kIGFuZCBpdCBpcyBkb25lLlxyXG4gICAgICAgIGlmIChsb2NMYXN0ID09PSBmb3VuZCAmJiBhY3Rpb25Gb3VuZC5pc0RvbmUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBMYXN0IGFjdGlvbiBub3QgZm91bmRcclxuICAgICAgICBpZiAobG9jTGFzdCAhPT0gZm91bmQpXHJcbiAgICAgICAgICAgIGFjdGlvbkZvdW5kLnN0YXJ0V2l0aFRhcmdldCh0aGlzLnRhcmdldCk7XHJcblxyXG4gICAgICAgIG5ld190ID0gbmV3X3QgKiBhY3Rpb25Gb3VuZC5fdGltZXNGb3JSZXBlYXQ7XHJcbiAgICAgICAgYWN0aW9uRm91bmQudXBkYXRlKG5ld190ID4gMSA/IG5ld190ICUgMSA6IG5ld190KTtcclxuICAgICAgICB0aGlzLl9sYXN0ID0gZm91bmQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5TZXF1ZW5jZS5fYWN0aW9uT25lVHdvKHRoaXMuX2FjdGlvbnNbMV0ucmV2ZXJzZSgpLCB0aGlzLl9hY3Rpb25zWzBdLnJldmVyc2UoKSk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLl9yZXZlcnNlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBIZWxwZXIgY29uc3RydWN0b3IgdG8gY3JlYXRlIGFuIGFycmF5IG9mIHNlcXVlbmNlYWJsZSBhY3Rpb25zXHJcbiAqIFRoZSBjcmVhdGVkIGFjdGlvbiB3aWxsIHJ1biBhY3Rpb25zIHNlcXVlbnRpYWxseSwgb25lIGFmdGVyIGFub3RoZXIuXHJcbiAqICEjemgg6aG65bqP5omn6KGM5Yqo5L2c77yM5Yib5bu655qE5Yqo5L2c5bCG5oyJ6aG65bqP5L6d5qyh6L+Q6KGM44CCXHJcbiAqIEBtZXRob2Qgc2VxdWVuY2VcclxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufEZpbml0ZVRpbWVBY3Rpb25bXX0gYWN0aW9uT3JBY3Rpb25BcnJheVxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IC4uLnRlbXBBcnJheVxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiAvLyBjcmVhdGUgc2VxdWVuY2Ugd2l0aCBhY3Rpb25zXHJcbiAqIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShhY3QxLCBhY3QyKTtcclxuICpcclxuICogLy8gY3JlYXRlIHNlcXVlbmNlIHdpdGggYXJyYXlcclxuICogdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjdEFycmF5KTtcclxuICovXHJcbi8vIHRvZG86IEl0IHNob3VsZCBiZSB1c2UgbmV3XHJcbmNjLnNlcXVlbmNlID0gZnVuY3Rpb24gKC8qTXVsdGlwbGUgQXJndW1lbnRzKi90ZW1wQXJyYXkpIHtcclxuICAgIHZhciBwYXJhbUFycmF5ID0gKHRlbXBBcnJheSBpbnN0YW5jZW9mIEFycmF5KSA/IHRlbXBBcnJheSA6IGFyZ3VtZW50cztcclxuICAgIGlmIChwYXJhbUFycmF5Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTAxOSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICB2YXIgbGFzdCA9IHBhcmFtQXJyYXkubGVuZ3RoIC0gMTtcclxuICAgIGlmICgobGFzdCA+PSAwKSAmJiAocGFyYW1BcnJheVtsYXN0XSA9PSBudWxsKSlcclxuICAgICAgICBjYy5sb2dJRCgxMDE1KTtcclxuXHJcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgIGlmIChsYXN0ID49IDApIHtcclxuICAgICAgICByZXN1bHQgPSBwYXJhbUFycmF5WzBdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGxhc3Q7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1BcnJheVtpXSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byhyZXN1bHQsIHBhcmFtQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG5jYy5TZXF1ZW5jZS5fYWN0aW9uT25lVHdvID0gZnVuY3Rpb24gKGFjdGlvbk9uZSwgYWN0aW9uVHdvKSB7XHJcbiAgICB2YXIgc2VxdWVuY2UgPSBuZXcgY2MuU2VxdWVuY2UoKTtcclxuICAgIHNlcXVlbmNlLmluaXRXaXRoVHdvQWN0aW9ucyhhY3Rpb25PbmUsIGFjdGlvblR3byk7XHJcbiAgICByZXR1cm4gc2VxdWVuY2U7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBSZXBlYXRzIGFuIGFjdGlvbiBhIG51bWJlciBvZiB0aW1lcy5cclxuICogVG8gcmVwZWF0IGFuIGFjdGlvbiBmb3JldmVyIHVzZSB0aGUgQ0NSZXBlYXRGb3JldmVyIGFjdGlvbi5cclxuICogQGNsYXNzIFJlcGVhdFxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gdGltZXNcclxuICogQGV4YW1wbGVcclxuICogdmFyIHJlcCA9IG5ldyBjYy5SZXBlYXQoY2Muc2VxdWVuY2UoanVtcDIsIGp1bXAxKSwgNSk7XHJcbiAqL1xyXG5jYy5SZXBlYXQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUmVwZWF0JyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uIChhY3Rpb24sIHRpbWVzKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXMgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RvdGFsID0gMDtcclxuICAgICAgICB0aGlzLl9uZXh0RHQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2FjdGlvbkluc3RhbnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IG51bGw7XHJcblx0XHR0aW1lcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhBY3Rpb24oYWN0aW9uLCB0aW1lcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aEFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uLCB0aW1lcykge1xyXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IGFjdGlvbi5fZHVyYXRpb24gKiB0aW1lcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXMgPSB0aW1lcztcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24gaW5zdGFuY2VvZiBjYy5BY3Rpb25JbnN0YW50KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvbkluc3RhbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXMgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl90b3RhbCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJlcGVhdCgpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEFjdGlvbih0aGlzLl9pbm5lckFjdGlvbi5jbG9uZSgpLCB0aGlzLl90aW1lcyk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLl90b3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbmV4dER0ID0gdGhpcy5faW5uZXJBY3Rpb24uX2R1cmF0aW9uIC8gdGhpcy5fZHVyYXRpb247XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0b3AoKTtcclxuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0b3AuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICB2YXIgbG9jSW5uZXJBY3Rpb24gPSB0aGlzLl9pbm5lckFjdGlvbjtcclxuICAgICAgICB2YXIgbG9jRHVyYXRpb24gPSB0aGlzLl9kdXJhdGlvbjtcclxuICAgICAgICB2YXIgbG9jVGltZXMgPSB0aGlzLl90aW1lcztcclxuICAgICAgICB2YXIgbG9jTmV4dER0ID0gdGhpcy5fbmV4dER0O1xyXG5cclxuICAgICAgICBpZiAoZHQgPj0gbG9jTmV4dER0KSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChkdCA+IGxvY05leHREdCAmJiB0aGlzLl90b3RhbCA8IGxvY1RpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NJbm5lckFjdGlvbi51cGRhdGUoMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGxvY05leHREdCArPSBsb2NJbm5lckFjdGlvbi5fZHVyYXRpb24gLyBsb2NEdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25leHREdCA9IGxvY05leHREdCA+IDEgPyAxIDogbG9jTmV4dER0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmaXggZm9yIGlzc3VlICMxMjg4LCBpbmNvcnJlY3QgZW5kIHZhbHVlIG9mIHJlcGVhdFxyXG4gICAgICAgICAgICBpZiAoZHQgPj0gMS4wICYmIHRoaXMuX3RvdGFsIDwgbG9jVGltZXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpeCBmb3IgY29jb3MtY3JlYXRvci9maXJlYmFsbC9pc3N1ZXMvNDMxMFxyXG4gICAgICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24udXBkYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWwrKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZG9uJ3Qgc2V0IGEgaW5zdGFudCBhY3Rpb24gYmFjayBvciB1cGRhdGUgaXQsIGl0IGhhcyBubyB1c2UgYmVjYXVzZSBpdCBoYXMgbm8gZHVyYXRpb25cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3Rpb25JbnN0YW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG90YWwgPT09IGxvY1RpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpc3N1ZSAjMzkwIHByZXZlbnQgamVyaywgdXNlIHJpZ2h0IHVwZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxvY0lubmVyQWN0aW9uLnVwZGF0ZShkdCAtIChsb2NOZXh0RHQgLSBsb2NJbm5lckFjdGlvbi5fZHVyYXRpb24gLyBsb2NEdXJhdGlvbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9jSW5uZXJBY3Rpb24udXBkYXRlKChkdCAqIGxvY1RpbWVzKSAlIDEuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbCA9PT0gdGhpcy5fdGltZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0KHRoaXMuX2lubmVyQWN0aW9uLnJldmVyc2UoKSwgdGhpcy5fdGltZXMpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBTZXQgaW5uZXIgQWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cclxuICAgICAqL1xyXG4gICAgc2V0SW5uZXJBY3Rpb246ZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbm5lckFjdGlvbiAhPT0gYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEdldCBpbm5lciBBY3Rpb24uXHJcbiAgICAgKiBAcmV0dXJuIHtGaW5pdGVUaW1lQWN0aW9ufVxyXG4gICAgICovXHJcbiAgICBnZXRJbm5lckFjdGlvbjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyQWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZXMgYSBSZXBlYXQgYWN0aW9uLiBUaW1lcyBpcyBhbiB1bnNpZ25lZCBpbnRlZ2VyIGJldHdlZW4gMSBhbmQgcG93KDIsMzApXHJcbiAqICEjemgg6YeN5aSN5Yqo5L2c77yM5Y+v5Lul5oyJ5LiA5a6a5qyh5pWw6YeN5aSN5LiA5Liq5Yqo77yM5aaC5p6c5oOz5rC46L+c6YeN5aSN5LiA5Liq5Yqo5L2c6K+35L2/55SoIHJlcGVhdEZvcmV2ZXIg5Yqo5L2c5p2l5a6M5oiQ44CCXHJcbiAqIEBtZXRob2QgcmVwZWF0XHJcbiAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lc1xyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgcmVwID0gY2MucmVwZWF0KGNjLnNlcXVlbmNlKGp1bXAyLCBqdW1wMSksIDUpO1xyXG4gKi9cclxuY2MucmVwZWF0ID0gZnVuY3Rpb24gKGFjdGlvbiwgdGltZXMpIHtcclxuICAgIHJldHVybiBuZXcgY2MuUmVwZWF0KGFjdGlvbiwgdGltZXMpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIFJlcGVhdHMgYW4gYWN0aW9uIGZvciBldmVyLiAgPGJyLz5cclxuICogVG8gcmVwZWF0IHRoZSBhbiBhY3Rpb24gZm9yIGEgbGltaXRlZCBudW1iZXIgb2YgdGltZXMgdXNlIHRoZSBSZXBlYXQgYWN0aW9uLiA8YnIvPlxyXG4gKiBAd2FybmluZyBUaGlzIGFjdGlvbiBjYW4ndCBiZSBTZXF1ZW5jZWFibGUgYmVjYXVzZSBpdCBpcyBub3QgYW4gSW50ZXJ2YWxBY3Rpb25cclxuICogQGNsYXNzIFJlcGVhdEZvcmV2ZXJcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cclxuICogQGV4YW1wbGVcclxuICogdmFyIHJlcCA9IG5ldyBjYy5SZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGp1bXAyLCBqdW1wMSksIDUpO1xyXG4gKi9cclxuY2MuUmVwZWF0Rm9yZXZlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5SZXBlYXRGb3JldmVyJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uID0gbnVsbDtcclxuXHRcdGFjdGlvbiAmJiB0aGlzLmluaXRXaXRoQWN0aW9uKGFjdGlvbik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICBpZiAoIWFjdGlvbikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjYpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmVwZWF0Rm9yZXZlcigpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEFjdGlvbih0aGlzLl9pbm5lckFjdGlvbi5jbG9uZSgpKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0YXJ0V2l0aFRhcmdldCh0YXJnZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGVwOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHZhciBsb2NJbm5lckFjdGlvbiA9IHRoaXMuX2lubmVyQWN0aW9uO1xyXG4gICAgICAgIGxvY0lubmVyQWN0aW9uLnN0ZXAoZHQpO1xyXG4gICAgICAgIGlmIChsb2NJbm5lckFjdGlvbi5pc0RvbmUoKSkge1xyXG4gICAgICAgICAgICAvL3ZhciBkaWZmID0gbG9jSW5uZXJBY3Rpb24uZ2V0RWxhcHNlZCgpIC0gbG9jSW5uZXJBY3Rpb24uX2R1cmF0aW9uO1xyXG4gICAgICAgICAgICBsb2NJbm5lckFjdGlvbi5zdGFydFdpdGhUYXJnZXQodGhpcy50YXJnZXQpO1xyXG4gICAgICAgICAgICAvLyB0byBwcmV2ZW50IGplcmsuIGlzc3VlICMzOTAgLDEyNDdcclxuICAgICAgICAgICAgLy90aGlzLl9pbm5lckFjdGlvbi5zdGVwKDApO1xyXG4gICAgICAgICAgICAvL3RoaXMuX2lubmVyQWN0aW9uLnN0ZXAoZGlmZik7XHJcbiAgICAgICAgICAgIGxvY0lubmVyQWN0aW9uLnN0ZXAobG9jSW5uZXJBY3Rpb24uZ2V0RWxhcHNlZCgpIC0gbG9jSW5uZXJBY3Rpb24uX2R1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJlcGVhdEZvcmV2ZXIodGhpcy5faW5uZXJBY3Rpb24ucmV2ZXJzZSgpKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogU2V0IGlubmVyIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7QWN0aW9uSW50ZXJ2YWx9IGFjdGlvblxyXG4gICAgICovXHJcbiAgICBzZXRJbm5lckFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lubmVyQWN0aW9uICE9PSBhY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0IGlubmVyIGFjdGlvbi5cclxuICAgICAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gICAgICovXHJcbiAgICBnZXRJbm5lckFjdGlvbjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyQWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZSBhIGFjdG9uIHdoaWNoIHJlcGVhdCBmb3JldmVyLCBhcyBpdCBydW5zIGZvcmV2ZXIsIGl0IGNhbid0IGJlIGFkZGVkIGludG8gY2Muc2VxdWVuY2UgYW5kIGNjLnNwYXduLlxyXG4gKiAhI3poIOawuOi/nOWcsOmHjeWkjeS4gOS4quWKqOS9nO+8jOaciemZkOasoeaVsOWGhemHjeWkjeS4gOS4quWKqOS9nOivt+S9v+eUqCByZXBlYXQg5Yqo5L2c77yM55Sx5LqO6L+Z5Liq5Yqo5L2c5LiN5Lya5YGc5q2i77yM5omA5Lul5LiN6IO96KKr5re75Yqg5YiwIGNjLnNlcXVlbmNlIOaIliBjYy5zcGF3biDkuK3jgIJcclxuICogQG1ldGhvZCByZXBlYXRGb3JldmVyXHJcbiAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciByZXBlYXQgPSBjYy5yZXBlYXRGb3JldmVyKGNjLnJvdGF0ZUJ5KDEuMCwgMzYwKSk7XHJcbiAqL1xyXG5jYy5yZXBlYXRGb3JldmVyID0gZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5SZXBlYXRGb3JldmVyKGFjdGlvbik7XHJcbn07XHJcblxyXG5cclxuLyogXHJcbiAqIFNwYXduIGEgbmV3IGFjdGlvbiBpbW1lZGlhdGVseVxyXG4gKiBAY2xhc3MgU3Bhd25cclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICovXHJcbmNjLlNwYXduID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlNwYXduJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKHRlbXBBcnJheSkge1xyXG4gICAgICAgIHRoaXMuX29uZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdHdvID0gbnVsbDtcclxuXHJcblx0XHR2YXIgcGFyYW1BcnJheSA9ICh0ZW1wQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkgPyB0ZW1wQXJyYXkgOiBhcmd1bWVudHM7XHJcbiAgICAgICAgaWYgKHBhcmFtQXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblx0XHR2YXIgbGFzdCA9IHBhcmFtQXJyYXkubGVuZ3RoIC0gMTtcclxuXHRcdGlmICgobGFzdCA+PSAwKSAmJiAocGFyYW1BcnJheVtsYXN0XSA9PSBudWxsKSlcclxuXHRcdFx0Y2MubG9nSUQoMTAxNSk7XHJcblxyXG4gICAgICAgIGlmIChsYXN0ID49IDApIHtcclxuICAgICAgICAgICAgdmFyIHByZXYgPSBwYXJhbUFycmF5WzBdLCBhY3Rpb24xO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGxhc3Q7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtQXJyYXlbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24xID0gcHJldjtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gY2MuU3Bhd24uX2FjdGlvbk9uZVR3byhhY3Rpb24xLCBwYXJhbUFycmF5W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXRXaXRoVHdvQWN0aW9ucyhwcmV2LCBwYXJhbUFycmF5W2xhc3RdKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qIGluaXRpYWxpemVzIHRoZSBTcGF3biBhY3Rpb24gd2l0aCB0aGUgMiBhY3Rpb25zIHRvIHNwYXduXHJcbiAgICAgKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvbjFcclxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uMlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhUd29BY3Rpb25zOmZ1bmN0aW9uIChhY3Rpb24xLCBhY3Rpb24yKSB7XHJcbiAgICAgICAgaWYgKCFhY3Rpb24xIHx8ICFhY3Rpb24yKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyNyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciByZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIGQxID0gYWN0aW9uMS5fZHVyYXRpb247XHJcbiAgICAgICAgdmFyIGQyID0gYWN0aW9uMi5fZHVyYXRpb247XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRXaXRoRHVyYXRpb24oTWF0aC5tYXgoZDEsIGQyKSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25lID0gYWN0aW9uMTtcclxuICAgICAgICAgICAgdGhpcy5fdHdvID0gYWN0aW9uMjtcclxuXHJcbiAgICAgICAgICAgIGlmIChkMSA+IGQyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90d28gPSBjYy5TZXF1ZW5jZS5fYWN0aW9uT25lVHdvKGFjdGlvbjIsIGNjLmRlbGF5VGltZShkMSAtIGQyKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZDEgPCBkMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25lID0gY2MuU2VxdWVuY2UuX2FjdGlvbk9uZVR3byhhY3Rpb24xLCBjYy5kZWxheVRpbWUoZDIgLSBkMSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TcGF3bigpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aFR3b0FjdGlvbnModGhpcy5fb25lLmNsb25lKCksIHRoaXMuX3R3by5jbG9uZSgpKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX29uZS5zdGFydFdpdGhUYXJnZXQodGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl90d28uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX29uZS5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy5fdHdvLnN0b3AoKTtcclxuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0b3AuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fb25lKVxyXG4gICAgICAgICAgICB0aGlzLl9vbmUudXBkYXRlKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fdHdvKVxyXG4gICAgICAgICAgICB0aGlzLl90d28udXBkYXRlKGR0KTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLlNwYXduLl9hY3Rpb25PbmVUd28odGhpcy5fb25lLnJldmVyc2UoKSwgdGhpcy5fdHdvLnJldmVyc2UoKSk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgdGhpcy5fcmV2ZXJzZUVhc2VMaXN0KGFjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGUgYSBzcGF3biBhY3Rpb24gd2hpY2ggcnVucyBzZXZlcmFsIGFjdGlvbnMgaW4gcGFyYWxsZWwuXHJcbiAqICEjemgg5ZCM5q2l5omn6KGM5Yqo5L2c77yM5ZCM5q2l5omn6KGM5LiA57uE5Yqo5L2c44CCXHJcbiAqIEBtZXRob2Qgc3Bhd25cclxuICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufEZpbml0ZVRpbWVBY3Rpb25bXX0gYWN0aW9uT3JBY3Rpb25BcnJheVxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IC4uLnRlbXBBcnJheVxyXG4gKiBAcmV0dXJuIHtGaW5pdGVUaW1lQWN0aW9ufVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb24gPSBjYy5zcGF3bihjYy5qdW1wQnkoMiwgY2MudjIoMzAwLCAwKSwgNTAsIDQpLCBjYy5yb3RhdGVCeSgyLCA3MjApKTtcclxuICogdG9kbzogSXQgc2hvdWxkIGJlIHRoZSBkaXJlY3QgdXNlIG5ld1xyXG4gKi9cclxuY2Muc3Bhd24gPSBmdW5jdGlvbiAoLypNdWx0aXBsZSBBcmd1bWVudHMqL3RlbXBBcnJheSkge1xyXG4gICAgdmFyIHBhcmFtQXJyYXkgPSAodGVtcEFycmF5IGluc3RhbmNlb2YgQXJyYXkpID8gdGVtcEFycmF5IDogYXJndW1lbnRzO1xyXG4gICAgaWYgKHBhcmFtQXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxMDIwKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICgocGFyYW1BcnJheS5sZW5ndGggPiAwKSAmJiAocGFyYW1BcnJheVtwYXJhbUFycmF5Lmxlbmd0aCAtIDFdID09IG51bGwpKVxyXG4gICAgICAgIGNjLmxvZ0lEKDEwMTUpO1xyXG5cclxuICAgIHZhciBwcmV2ID0gcGFyYW1BcnJheVswXTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcGFyYW1BcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwYXJhbUFycmF5W2ldICE9IG51bGwpXHJcbiAgICAgICAgICAgIHByZXYgPSBjYy5TcGF3bi5fYWN0aW9uT25lVHdvKHByZXYsIHBhcmFtQXJyYXlbaV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByZXY7XHJcbn07XHJcblxyXG5jYy5TcGF3bi5fYWN0aW9uT25lVHdvID0gZnVuY3Rpb24gKGFjdGlvbjEsIGFjdGlvbjIpIHtcclxuICAgIHZhciBwU3Bhd24gPSBuZXcgY2MuU3Bhd24oKTtcclxuICAgIHBTcGF3bi5pbml0V2l0aFR3b0FjdGlvbnMoYWN0aW9uMSwgYWN0aW9uMik7XHJcbiAgICByZXR1cm4gcFNwYXduO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCB0byBhIGNlcnRhaW4gYW5nbGUgYnkgbW9kaWZ5aW5nIGl0cyBhbmdsZSBwcm9wZXJ0eS4gPGJyLz5cclxuICogVGhlIGRpcmVjdGlvbiB3aWxsIGJlIGRlY2lkZWQgYnkgdGhlIHNob3J0ZXN0IGFuZ2xlLlxyXG4gKiBAY2xhc3MgUm90YXRlVG9cclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGRzdEFuZ2xlIGRzdEFuZ2xlIGluIGRlZ3JlZXMuXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciByb3RhdGVUbyA9IG5ldyBjYy5Sb3RhdGVUbygyLCA2MS4wKTtcclxuICovXHJcbmNjLlJvdGF0ZVRvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlJvdGF0ZVRvJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBfcmV2ZXJzZTogZmFsc2UsXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZSkge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0QW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2RzdEFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLl9hbmdsZSA9IDA7XHJcbiAgICAgICAgZHN0QW5nbGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIGRzdEFuZ2xlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkc3RBbmdsZVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGRzdEFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RzdEFuZ2xlID0gZHN0QW5nbGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJvdGF0ZVRvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2RzdEFuZ2xlKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG5cclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IHRhcmdldC5hbmdsZSAlIDM2MDtcclxuXHJcbiAgICAgICAgbGV0IGFuZ2xlID0gY2MuUm90YXRlVG8uX3JldmVyc2UgPyAodGhpcy5fZHN0QW5nbGUgLSBzdGFydEFuZ2xlKSA6ICh0aGlzLl9kc3RBbmdsZSArIHN0YXJ0QW5nbGUpO1xyXG4gICAgICAgIGlmIChhbmdsZSA+IDE4MCkgYW5nbGUgLT0gMzYwO1xyXG4gICAgICAgIGlmIChhbmdsZSA8IC0xODApIGFuZ2xlICs9IDM2MDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRBbmdsZSA9IHN0YXJ0QW5nbGU7XHJcbiAgICAgICAgdGhpcy5fYW5nbGUgPSBjYy5Sb3RhdGVUby5fcmV2ZXJzZSA/IGFuZ2xlIDogLWFuZ2xlO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5sb2dJRCgxMDE2KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuYW5nbGUgPSB0aGlzLl9zdGFydEFuZ2xlICsgdGhpcy5fYW5nbGUgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogUm90YXRlcyBhIE5vZGUgb2JqZWN0IHRvIGEgY2VydGFpbiBhbmdsZSBieSBtb2RpZnlpbmcgaXRzIGFuZ2xlIHByb3BlcnR5LiA8YnIvPlxyXG4gKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgZGVjaWRlZCBieSB0aGUgc2hvcnRlc3QgYW5nbGUuXHJcbiAqICEjemgg5peL6L2s5Yiw55uu5qCH6KeS5bqm77yM6YCa6L+H6YCQ5bin5L+u5pS55a6D55qEIGFuZ2xlIOWxnuaAp++8jOaXi+i9rOaWueWQkeWwhueUseacgOefreeahOinkuW6puWGs+WumuOAglxyXG4gKiBAbWV0aG9kIHJvdGF0ZVRvXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkc3RBbmdsZSBkc3RBbmdsZSBpbiBkZWdyZWVzLlxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgcm90YXRlVG8gPSBjYy5yb3RhdGVUbygyLCA2MS4wKTtcclxuICovXHJcbmNjLnJvdGF0ZVRvID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Sb3RhdGVUbyhkdXJhdGlvbiwgZHN0QW5nbGUpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIGFuZ2xlIHByb3BlcnR5LlxyXG4gKiBSZWxhdGl2ZSB0byBpdHMgcHJvcGVydGllcyB0byBtb2RpZnkuXHJcbiAqIEBjbGFzcyBSb3RhdGVCeVxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFBbmdsZSBkZWx0YUFuZ2xlIGluIGRlZ3JlZXNcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvbkJ5ID0gbmV3IGNjLlJvdGF0ZUJ5KDIsIDM2MCk7XHJcbiAqL1xyXG5jYy5Sb3RhdGVCeSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Sb3RhdGVCeScsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgX3JldmVyc2U6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoZHVyYXRpb24sIGRlbHRhQW5nbGUpIHtcclxuICAgICAgICBkZWx0YUFuZ2xlICo9IGNjLlJvdGF0ZUJ5Ll9yZXZlcnNlID8gMSA6IC0xO1xyXG5cclxuICAgICAgICB0aGlzLl9kZWx0YUFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gMDtcclxuICAgICAgICBkZWx0YUFuZ2xlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBkZWx0YUFuZ2xlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhQW5nbGUgZGVsdGFBbmdsZSBpbiBkZWdyZWVzXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFBbmdsZSkge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWx0YUFuZ2xlID0gZGVsdGFBbmdsZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlQnkoKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZGVsdGFBbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9zdGFydEFuZ2xlID0gdGFyZ2V0LmFuZ2xlO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hbmdsZSA9IHRoaXMuX3N0YXJ0QW5nbGUgKyB0aGlzLl9kZWx0YUFuZ2xlICogZHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlJvdGF0ZUJ5KCk7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIC10aGlzLl9kZWx0YUFuZ2xlKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIGFuZ2xlIHByb3BlcnR5LlxyXG4gKiBSZWxhdGl2ZSB0byBpdHMgcHJvcGVydGllcyB0byBtb2RpZnkuXHJcbiAqICEjemgg5peL6L2s5oyH5a6a55qE6KeS5bqm44CCXHJcbiAqIEBtZXRob2Qgcm90YXRlQnlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhQW5nbGUgZGVsdGFBbmdsZSBpbiBkZWdyZWVzXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25CeSA9IGNjLnJvdGF0ZUJ5KDIsIDM2MCk7XHJcbiAqL1xyXG5jYy5yb3RhdGVCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFBbmdsZSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Sb3RhdGVCeShkdXJhdGlvbiwgZGVsdGFBbmdsZSk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogPHA+XHJcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgeCx5IHBpeGVscyBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiB4IGFuZCB5IGFyZSByZWxhdGl2ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIFNldmVyYWwgTW92ZUJ5IGFjdGlvbnMgY2FuIGJlIGNvbmN1cnJlbnRseSBjYWxsZWQsIGFuZCB0aGUgcmVzdWx0aW5nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIG1vdmVtZW50IHdpbGwgYmUgdGhlIHN1bSBvZiBpbmRpdmlkdWFsIG1vdmVtZW50cy5cclxuICogPC9wPlxyXG4gKiBAY2xhc3MgTW92ZUJ5XHJcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IGRlbHRhUG9zXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFZXVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uVG8gPSBjYy5tb3ZlQnkoMiwgY2MudjIod2luZG93U2l6ZS53aWR0aCAtIDQwLCB3aW5kb3dTaXplLmhlaWdodCAtIDQwKSk7XHJcbiAqL1xyXG5jYy5Nb3ZlQnkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTW92ZUJ5JyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YVBvcywgZGVsdGFZKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb25EZWx0YSA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcblxyXG4gICAgICAgIGRlbHRhUG9zICE9PSB1bmRlZmluZWQgJiYgY2MuTW92ZUJ5LnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIGRlbHRhUG9zLCBkZWx0YVkpO1x0XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSkge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG5cdCAgICAgICAgaWYocG9zaXRpb24ueCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHQgICAgICAgIHkgPSBwb3NpdGlvbi55O1xyXG5cdFx0ICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLng7XHJcblx0ICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbkRlbHRhLnggPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25EZWx0YS55ID0geTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuTW92ZUJ5KCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX3Bvc2l0aW9uRGVsdGEpO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgdmFyIGxvY1Bvc1ggPSB0YXJnZXQueDtcclxuICAgICAgICB2YXIgbG9jUG9zWSA9IHRhcmdldC55O1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueCA9IGxvY1Bvc1g7XHJcbiAgICAgICAgdGhpcy5fcHJldmlvdXNQb3NpdGlvbi55ID0gbG9jUG9zWTtcclxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uLnggPSBsb2NQb3NYO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24ueSA9IGxvY1Bvc1k7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5fcG9zaXRpb25EZWx0YS54ICogZHQ7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5fcG9zaXRpb25EZWx0YS55ICogZHQ7XHJcbiAgICAgICAgICAgIHZhciBsb2NTdGFydFBvc2l0aW9uID0gdGhpcy5fc3RhcnRQb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYgKGNjLm1hY3JvLkVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OUykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFggPSB0aGlzLnRhcmdldC54O1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFkgPSB0aGlzLnRhcmdldC55O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvY1ByZXZpb3VzUG9zaXRpb24gPSB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY1N0YXJ0UG9zaXRpb24ueCA9IGxvY1N0YXJ0UG9zaXRpb24ueCArIHRhcmdldFggLSBsb2NQcmV2aW91c1Bvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnkgPSBsb2NTdGFydFBvc2l0aW9uLnkgKyB0YXJnZXRZIC0gbG9jUHJldmlvdXNQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICAgICAgeCA9IHggKyBsb2NTdGFydFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICB5ID0geSArIGxvY1N0YXJ0UG9zaXRpb24ueTtcclxuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnggPSB4O1xyXG5cdCAgICAgICAgICAgIGxvY1ByZXZpb3VzUG9zaXRpb24ueSA9IHk7XHJcblx0ICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbihsb2NTdGFydFBvc2l0aW9uLnggKyB4LCBsb2NTdGFydFBvc2l0aW9uLnkgKyB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Nb3ZlQnkodGhpcy5fZHVyYXRpb24sIGNjLnYyKC10aGlzLl9wb3NpdGlvbkRlbHRhLngsIC10aGlzLl9wb3NpdGlvbkRlbHRhLnkpKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgeCx5IHBpeGVscyBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiB4IGFuZCB5IGFyZSByZWxhdGl2ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIG9iamVjdC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIFNldmVyYWwgTW92ZUJ5IGFjdGlvbnMgY2FuIGJlIGNvbmN1cnJlbnRseSBjYWxsZWQsIGFuZCB0aGUgcmVzdWx0aW5nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIG1vdmVtZW50IHdpbGwgYmUgdGhlIHN1bSBvZiBpbmRpdmlkdWFsIG1vdmVtZW50cy5cclxuICogISN6aCDnp7vliqjmjIflrprnmoTot53nprvjgIJcclxuICogQG1ldGhvZCBtb3ZlQnlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gZGVsdGFQb3NcclxuICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YVldXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25UbyA9IGNjLm1vdmVCeSgyLCBjYy52Mih3aW5kb3dTaXplLndpZHRoIC0gNDAsIHdpbmRvd1NpemUuaGVpZ2h0IC0gNDApKTtcclxuICovXHJcbmNjLm1vdmVCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFQb3MsIGRlbHRhWSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Nb3ZlQnkoZHVyYXRpb24sIGRlbHRhUG9zLCBkZWx0YVkpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgdG8gdGhlIHBvc2l0aW9uIHgseS4geCBhbmQgeSBhcmUgYWJzb2x1dGUgY29vcmRpbmF0ZXMgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS4gPGJyLz5cclxuICogU2V2ZXJhbCBNb3ZlVG8gYWN0aW9ucyBjYW4gYmUgY29uY3VycmVudGx5IGNhbGxlZCwgYW5kIHRoZSByZXN1bHRpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIG1vdmVtZW50IHdpbGwgYmUgdGhlIHN1bSBvZiBpbmRpdmlkdWFsIG1vdmVtZW50cy5cclxuICogQGNsYXNzIE1vdmVUb1xyXG4gKiBAZXh0ZW5kcyBNb3ZlQnlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uQnkgPSBuZXcgY2MuTW92ZVRvKDIsIGNjLnYyKDgwLCA4MCkpO1xyXG4gKi9cclxuY2MuTW92ZVRvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLk1vdmVUbycsXHJcbiAgICBleHRlbmRzOiBjYy5Nb3ZlQnksXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5KSB7XHJcbiAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuXHRcdHBvc2l0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uICBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgcG9zaXRpb24sIHkpIHtcclxuICAgICAgICBpZiAoY2MuTW92ZUJ5LnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIHBvc2l0aW9uLCB5KSkge1xyXG5cdCAgICAgICAgaWYocG9zaXRpb24ueCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHQgICAgICAgIHkgPSBwb3NpdGlvbi55O1xyXG5cdFx0ICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLng7XHJcblx0ICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9lbmRQb3NpdGlvbi54ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFBvc2l0aW9uLnkgPSB5O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Nb3ZlVG8oKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fZW5kUG9zaXRpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgY2MuTW92ZUJ5LnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uRGVsdGEueCA9IHRoaXMuX2VuZFBvc2l0aW9uLnggLSB0YXJnZXQueDtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbkRlbHRhLnkgPSB0aGlzLl9lbmRQb3NpdGlvbi55IC0gdGFyZ2V0Lnk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTW92ZXMgYSBOb2RlIG9iamVjdCB0byB0aGUgcG9zaXRpb24geCx5LiB4IGFuZCB5IGFyZSBhYnNvbHV0ZSBjb29yZGluYXRlcyBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LiA8YnIvPlxyXG4gKiBTZXZlcmFsIE1vdmVUbyBhY3Rpb25zIGNhbiBiZSBjb25jdXJyZW50bHkgY2FsbGVkLCBhbmQgdGhlIHJlc3VsdGluZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogbW92ZW1lbnQgd2lsbCBiZSB0aGUgc3VtIG9mIGluZGl2aWR1YWwgbW92ZW1lbnRzLlxyXG4gKiAhI3poIOenu+WKqOWIsOebruagh+S9jee9ruOAglxyXG4gKiBAbWV0aG9kIG1vdmVUb1xyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3ldXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25CeSA9IGNjLm1vdmVUbygyLCBjYy52Mig4MCwgODApKTtcclxuICovXHJcbmNjLm1vdmVUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgcG9zaXRpb24sIHkpIHtcclxuICAgIHJldHVybiBuZXcgY2MuTW92ZVRvKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSk7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBTa2V3cyBhIE5vZGUgb2JqZWN0IHRvIGdpdmVuIGFuZ2xlcyBieSBtb2RpZnlpbmcgaXRzIHNrZXdYIGFuZCBza2V3WSBwcm9wZXJ0aWVzXHJcbiAqIEBjbGFzcyBTa2V3VG9cclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgdGltZSBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeFxyXG4gKiBAcGFyYW0ge051bWJlcn0gc3lcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvblRvID0gbmV3IGNjLlNrZXdUbygyLCAzNy4yLCAtMzcuMik7XHJcbiAqL1xyXG5jYy5Ta2V3VG8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2tld1RvJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICh0LCBzeCwgc3kpIHtcclxuICAgICAgICB0aGlzLl9za2V3WCA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2tld1kgPSAwO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0U2tld1ggPSAwO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0U2tld1kgPSAwO1xyXG4gICAgICAgIHRoaXMuX2VuZFNrZXdYID0gMDtcclxuICAgICAgICB0aGlzLl9lbmRTa2V3WSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVsdGFYID0gMDtcclxuICAgICAgICB0aGlzLl9kZWx0YVkgPSAwO1xyXG4gICAgICAgIHN5ICE9PSB1bmRlZmluZWQgJiYgY2MuU2tld1RvLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgdCwgc3gsIHN5KTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdCB0aW1lIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN5XHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uICh0LCBzeCwgc3kpIHtcclxuICAgICAgICB2YXIgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgdCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5kU2tld1ggPSBzeDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kU2tld1kgPSBzeTtcclxuICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuU2tld1RvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZFNrZXdYLCB0aGlzLl9lbmRTa2V3WSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRTa2V3WCA9IHRhcmdldC5za2V3WCAlIDE4MDtcclxuICAgICAgICB0aGlzLl9kZWx0YVggPSB0aGlzLl9lbmRTa2V3WCAtIHRoaXMuX3N0YXJ0U2tld1g7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlbHRhWCA+IDE4MClcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGFYIC09IDM2MDtcclxuICAgICAgICBpZiAodGhpcy5fZGVsdGFYIDwgLTE4MClcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGFYICs9IDM2MDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRTa2V3WSA9IHRhcmdldC5za2V3WSAlIDM2MDtcclxuICAgICAgICB0aGlzLl9kZWx0YVkgPSB0aGlzLl9lbmRTa2V3WSAtIHRoaXMuX3N0YXJ0U2tld1k7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlbHRhWSA+IDE4MClcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGFZIC09IDM2MDtcclxuICAgICAgICBpZiAodGhpcy5fZGVsdGFZIDwgLTE4MClcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGFZICs9IDM2MDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICB0aGlzLnRhcmdldC5za2V3WCA9IHRoaXMuX3N0YXJ0U2tld1ggKyB0aGlzLl9kZWx0YVggKiBkdDtcclxuICAgICAgICB0aGlzLnRhcmdldC5za2V3WSA9IHRoaXMuX3N0YXJ0U2tld1kgKyB0aGlzLl9kZWx0YVkgKiBkdDtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDcmVhdGUgYSBhY3Rpb24gd2hpY2ggc2tld3MgYSBOb2RlIG9iamVjdCB0byBnaXZlbiBhbmdsZXMgYnkgbW9kaWZ5aW5nIGl0cyBza2V3WCBhbmQgc2tld1kgcHJvcGVydGllcy5cclxuICogQ2hhbmdlcyB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLlxyXG4gKiAhI3poIOWBj+aWnOWIsOebruagh+inkuW6puOAglxyXG4gKiBAbWV0aG9kIHNrZXdUb1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdCB0aW1lIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN4XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeVxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uVG8gPSBjYy5za2V3VG8oMiwgMzcuMiwgLTM3LjIpO1xyXG4gKi9cclxuY2Muc2tld1RvID0gZnVuY3Rpb24gKHQsIHN4LCBzeSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Ta2V3VG8odCwgc3gsIHN5KTtcclxufTtcclxuXHJcbi8qXHJcbiAqIFNrZXdzIGEgTm9kZSBvYmplY3QgYnkgc2tld1ggYW5kIHNrZXdZIGRlZ3JlZXMuXHJcbiAqIFJlbGF0aXZlIHRvIGl0cyBwcm9wZXJ0eSBtb2RpZmljYXRpb24uXHJcbiAqIEBjbGFzcyBTa2V3QnlcclxuICogQGV4dGVuZHMgU2tld1RvXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gc3ggIHNrZXcgaW4gZGVncmVlcyBmb3IgWCBheGlzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeSAgc2tldyBpbiBkZWdyZWVzIGZvciBZIGF4aXNcclxuICovXHJcbmNjLlNrZXdCeSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Ta2V3QnknLFxyXG4gICAgZXh0ZW5kczogY2MuU2tld1RvLFxyXG5cclxuXHRjdG9yOiBmdW5jdGlvbih0LCBzeCwgc3kpIHtcclxuXHRcdHN5ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKHQsIHN4LCBzeSk7XHJcblx0fSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhU2tld1ggIHNrZXcgaW4gZGVncmVlcyBmb3IgWCBheGlzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFTa2V3WSAgc2tldyBpbiBkZWdyZWVzIGZvciBZIGF4aXNcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKHQsIGRlbHRhU2tld1gsIGRlbHRhU2tld1kpIHtcclxuICAgICAgICB2YXIgcmV0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGNjLlNrZXdUby5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIHQsIGRlbHRhU2tld1gsIGRlbHRhU2tld1kpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NrZXdYID0gZGVsdGFTa2V3WDtcclxuICAgICAgICAgICAgdGhpcy5fc2tld1kgPSBkZWx0YVNrZXdZO1xyXG4gICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Ta2V3QnkoKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLlNrZXdUby5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9kZWx0YVggPSB0aGlzLl9za2V3WDtcclxuICAgICAgICB0aGlzLl9kZWx0YVkgPSB0aGlzLl9za2V3WTtcclxuICAgICAgICB0aGlzLl9lbmRTa2V3WCA9IHRoaXMuX3N0YXJ0U2tld1ggKyB0aGlzLl9kZWx0YVg7XHJcbiAgICAgICAgdGhpcy5fZW5kU2tld1kgPSB0aGlzLl9zdGFydFNrZXdZICsgdGhpcy5fZGVsdGFZO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlNrZXdCeSh0aGlzLl9kdXJhdGlvbiwgLXRoaXMuX3NrZXdYLCAtdGhpcy5fc2tld1kpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogU2tld3MgYSBOb2RlIG9iamVjdCBieSBza2V3WCBhbmQgc2tld1kgZGVncmVlcy4gPGJyIC8+XHJcbiAqIFJlbGF0aXZlIHRvIGl0cyBwcm9wZXJ0eSBtb2RpZmljYXRpb24uXHJcbiAqICEjemgg5YGP5pac5oyH5a6a55qE6KeS5bqm44CCXHJcbiAqIEBtZXRob2Qgc2tld0J5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gc3ggc3ggc2tldyBpbiBkZWdyZWVzIGZvciBYIGF4aXNcclxuICogQHBhcmFtIHtOdW1iZXJ9IHN5IHN5IHNrZXcgaW4gZGVncmVlcyBmb3IgWSBheGlzXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25CeSA9IGNjLnNrZXdCeSgyLCAwLCAtOTApO1xyXG4gKi9cclxuY2Muc2tld0J5ID0gZnVuY3Rpb24gKHQsIHN4LCBzeSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Ta2V3QnkodCwgc3gsIHN5KTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBNb3ZlcyBhIE5vZGUgb2JqZWN0IHNpbXVsYXRpbmcgYSBwYXJhYm9saWMganVtcCBtb3ZlbWVudCBieSBtb2RpZnlpbmcgaXRzIHBvc2l0aW9uIHByb3BlcnR5LlxyXG4gKiBSZWxhdGl2ZSB0byBpdHMgbW92ZW1lbnQuXHJcbiAqIEBjbGFzcyBKdW1wQnlcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxyXG4gKiBAcGFyYW0ge051bWJlcn0ganVtcHNcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvbkJ5ID0gbmV3IGNjLkp1bXBCeSgyLCBjYy52MigzMDAsIDApLCA1MCwgNCk7XHJcbiAqIHZhciBhY3Rpb25CeSA9IG5ldyBjYy5KdW1wQnkoMiwgMzAwLCAwLCA1MCwgNCk7XHJcbiAqL1xyXG5jYy5KdW1wQnkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuSnVtcEJ5JyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fZGVsdGEgPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2p1bXBzID0gMDtcclxuXHJcbiAgICAgICAgaGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgY2MuSnVtcEJ5LnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBqdW1wc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhY3Rpb25CeS5pbml0V2l0aER1cmF0aW9uKDIsIGNjLnYyKDMwMCwgMCksIDUwLCA0KTtcclxuICAgICAqIGFjdGlvbkJ5LmluaXRXaXRoRHVyYXRpb24oMiwgMzAwLCAwLCA1MCwgNCk7XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG5cdCAgICAgICAgaWYgKGp1bXBzID09PSB1bmRlZmluZWQpIHtcclxuXHRcdCAgICAgICAganVtcHMgPSBoZWlnaHQ7XHJcblx0XHQgICAgICAgIGhlaWdodCA9IHk7XHJcblx0XHQgICAgICAgIHkgPSBwb3NpdGlvbi55O1xyXG5cdFx0ICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uLng7XHJcblx0ICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhLnggPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGEueSA9IHk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5fanVtcHMgPSBqdW1wcztcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuSnVtcEJ5KCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2RlbHRhLCB0aGlzLl9oZWlnaHQsIHRoaXMuX2p1bXBzKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHZhciBsb2NQb3NYID0gdGFyZ2V0Lng7XHJcbiAgICAgICAgdmFyIGxvY1Bvc1kgPSB0YXJnZXQueTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLnggPSBsb2NQb3NYO1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueSA9IGxvY1Bvc1k7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi54ID0gbG9jUG9zWDtcclxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uLnkgPSBsb2NQb3NZO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgZnJhYyA9IGR0ICogdGhpcy5fanVtcHMgJSAxLjA7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5faGVpZ2h0ICogNCAqIGZyYWMgKiAoMSAtIGZyYWMpO1xyXG4gICAgICAgICAgICB5ICs9IHRoaXMuX2RlbHRhLnkgKiBkdDtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5fZGVsdGEueCAqIGR0O1xyXG4gICAgICAgICAgICB2YXIgbG9jU3RhcnRQb3NpdGlvbiA9IHRoaXMuX3N0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmIChjYy5tYWNyby5FTkFCTEVfU1RBQ0tBQkxFX0FDVElPTlMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRYID0gdGhpcy50YXJnZXQueDtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRZID0gdGhpcy50YXJnZXQueTtcclxuICAgICAgICAgICAgICAgIHZhciBsb2NQcmV2aW91c1Bvc2l0aW9uID0gdGhpcy5fcHJldmlvdXNQb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NTdGFydFBvc2l0aW9uLnggPSBsb2NTdGFydFBvc2l0aW9uLnggKyB0YXJnZXRYIC0gbG9jUHJldmlvdXNQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi55ID0gbG9jU3RhcnRQb3NpdGlvbi55ICsgdGFyZ2V0WSAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIHggPSB4ICsgbG9jU3RhcnRQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICAgICAgeSA9IHkgKyBsb2NTdGFydFBvc2l0aW9uLnk7XHJcblx0ICAgICAgICAgICAgbG9jUHJldmlvdXNQb3NpdGlvbi54ID0geDtcclxuXHQgICAgICAgICAgICBsb2NQcmV2aW91c1Bvc2l0aW9uLnkgPSB5O1xyXG5cdCAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNldFBvc2l0aW9uKHgsIHkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc2V0UG9zaXRpb24obG9jU3RhcnRQb3NpdGlvbi54ICsgeCwgbG9jU3RhcnRQb3NpdGlvbi55ICsgeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuSnVtcEJ5KHRoaXMuX2R1cmF0aW9uLCBjYy52MigtdGhpcy5fZGVsdGEueCwgLXRoaXMuX2RlbHRhLnkpLCB0aGlzLl9oZWlnaHQsIHRoaXMuX2p1bXBzKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3Qgc2ltdWxhdGluZyBhIHBhcmFib2xpYyBqdW1wIG1vdmVtZW50IGJ5IG1vZGlmeWluZyBpdCdzIHBvc2l0aW9uIHByb3BlcnR5LlxyXG4gKiBSZWxhdGl2ZSB0byBpdHMgbW92ZW1lbnQuXHJcbiAqICEjemgg55So6Lez6LeD55qE5pa55byP56e75Yqo5oyH5a6a55qE6Led56a744CCXHJcbiAqIEBtZXRob2QganVtcEJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3ldXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XVxyXG4gKiBAcGFyYW0ge051bWJlcn0gW2p1bXBzXVxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uQnkgPSBjYy5qdW1wQnkoMiwgY2MudjIoMzAwLCAwKSwgNTAsIDQpO1xyXG4gKiB2YXIgYWN0aW9uQnkgPSBjYy5qdW1wQnkoMiwgMzAwLCAwLCA1MCwgNCk7XHJcbiAqL1xyXG5jYy5qdW1wQnkgPSBmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkp1bXBCeShkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpO1xyXG59O1xyXG5cclxuLypcclxuICogTW92ZXMgYSBOb2RlIG9iamVjdCB0byBhIHBhcmFib2xpYyBwb3NpdGlvbiBzaW11bGF0aW5nIGEganVtcCBtb3ZlbWVudCBieSBtb2RpZnlpbmcgaXQncyBwb3NpdGlvbiBwcm9wZXJ0eS4gPGJyIC8+XHJcbiAqIEp1bXAgdG8gdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cclxuICogQGNsYXNzIEp1bXBUb1xyXG4gKiBAZXh0ZW5kcyBKdW1wQnlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbanVtcHNdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25UbyA9IG5ldyBjYy5KdW1wVG8oMiwgY2MudjIoMzAwLCAwKSwgNTAsIDQpO1xyXG4gKiB2YXIgYWN0aW9uVG8gPSBuZXcgY2MuSnVtcFRvKDIsIDMwMCwgMCwgNTAsIDQpO1xyXG4gKi9cclxuY2MuSnVtcFRvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkp1bXBUbycsXHJcbiAgICBleHRlbmRzOiBjYy5KdW1wQnksXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKSB7XHJcbiAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuICAgICAgICBoZWlnaHQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBqdW1wc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhY3Rpb25Uby5pbml0V2l0aER1cmF0aW9uKDIsIGNjLnYyKDMwMCwgMCksIDUwLCA0KTtcclxuICAgICAqIGFjdGlvblRvLmluaXRXaXRoRHVyYXRpb24oMiwgMzAwLCAwLCA1MCwgNCk7XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBwb3NpdGlvbiwgeSwgaGVpZ2h0LCBqdW1wcykge1xyXG4gICAgICAgIGlmIChjYy5KdW1wQnkucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpKSB7XHJcbiAgICAgICAgICAgIGlmIChqdW1wcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gcG9zaXRpb24ueTtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24ueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lbmRQb3NpdGlvbi54ID0gcG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFBvc2l0aW9uLnkgPSB5O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkp1bXBCeS5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9kZWx0YS54ID0gdGhpcy5fZW5kUG9zaXRpb24ueCAtIHRoaXMuX3N0YXJ0UG9zaXRpb24ueDtcclxuICAgICAgICB0aGlzLl9kZWx0YS55ID0gdGhpcy5fZW5kUG9zaXRpb24ueSAtIHRoaXMuX3N0YXJ0UG9zaXRpb24ueTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuSnVtcFRvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZFBvc2l0aW9uLCB0aGlzLl9oZWlnaHQsIHRoaXMuX2p1bXBzKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE1vdmVzIGEgTm9kZSBvYmplY3QgdG8gYSBwYXJhYm9saWMgcG9zaXRpb24gc2ltdWxhdGluZyBhIGp1bXAgbW92ZW1lbnQgYnkgbW9kaWZ5aW5nIGl0cyBwb3NpdGlvbiBwcm9wZXJ0eS4gPGJyIC8+XHJcbiAqIEp1bXAgdG8gdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cclxuICogISN6aCDnlKjot7Pot4PnmoTmlrnlvI/np7vliqjliLDnm67moIfkvY3nva7jgIJcclxuICogQG1ldGhvZCBqdW1wVG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbanVtcHNdXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25UbyA9IGNjLmp1bXBUbygyLCBjYy52MigzMDAsIDMwMCksIDUwLCA0KTtcclxuICogdmFyIGFjdGlvblRvID0gY2MuanVtcFRvKDIsIDMwMCwgMzAwLCA1MCwgNCk7XHJcbiAqL1xyXG5jYy5qdW1wVG8gPSBmdW5jdGlvbiAoZHVyYXRpb24sIHBvc2l0aW9uLCB5LCBoZWlnaHQsIGp1bXBzKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkp1bXBUbyhkdXJhdGlvbiwgcG9zaXRpb24sIHksIGhlaWdodCwganVtcHMpO1xyXG59O1xyXG5cclxuLyogQW4gYWN0aW9uIHRoYXQgbW92ZXMgdGhlIHRhcmdldCB3aXRoIGEgY3ViaWMgQmV6aWVyIGN1cnZlIGJ5IGEgY2VydGFpbiBkaXN0YW5jZS5cclxuICogUmVsYXRpdmUgdG8gaXRzIG1vdmVtZW50LlxyXG4gKiBAY2xhc3MgQmV6aWVyQnlcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IHQgLSB0aW1lIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcclxuICogQGV4YW1wbGVcclxuICogdmFyIGJlemllciA9IFtjYy52MigwLCB3aW5kb3dTaXplLmhlaWdodCAvIDIpLCBjYy52MigzMDAsIC13aW5kb3dTaXplLmhlaWdodCAvIDIpLCBjYy52MigzMDAsIDEwMCldO1xyXG4gKiB2YXIgYmV6aWVyRm9yd2FyZCA9IG5ldyBjYy5CZXppZXJCeSgzLCBiZXppZXIpO1xyXG4gKi9cclxuZnVuY3Rpb24gYmV6aWVyQXQgKGEsIGIsIGMsIGQsIHQpIHtcclxuICAgIHJldHVybiAoTWF0aC5wb3coMSAtIHQsIDMpICogYSArXHJcbiAgICAgICAgMyAqIHQgKiAoTWF0aC5wb3coMSAtIHQsIDIpKSAqIGIgK1xyXG4gICAgICAgIDMgKiBNYXRoLnBvdyh0LCAyKSAqICgxIC0gdCkgKiBjICtcclxuICAgICAgICBNYXRoLnBvdyh0LCAzKSAqIGQgKTtcclxufTtcclxuY2MuQmV6aWVyQnkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQmV6aWVyQnknLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbiAodCwgYykge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgYyAmJiBjYy5CZXppZXJCeS5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIHQsIGMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJbXX0gYyAtIEFycmF5IG9mIHBvaW50c1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAodCwgYykge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IGM7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkJlemllckJ5KCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgdmFyIG5ld0NvbmZpZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbmZpZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VsQ29uZiA9IHRoaXMuX2NvbmZpZ1tpXTtcclxuICAgICAgICAgICAgbmV3Q29uZmlncy5wdXNoKGNjLnYyKHNlbENvbmYueCwgc2VsQ29uZi55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCBuZXdDb25maWdzKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHZhciBsb2NQb3NYID0gdGFyZ2V0Lng7XHJcbiAgICAgICAgdmFyIGxvY1Bvc1kgPSB0YXJnZXQueTtcclxuICAgICAgICB0aGlzLl9wcmV2aW91c1Bvc2l0aW9uLnggPSBsb2NQb3NYO1xyXG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUG9zaXRpb24ueSA9IGxvY1Bvc1k7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQb3NpdGlvbi54ID0gbG9jUG9zWDtcclxuICAgICAgICB0aGlzLl9zdGFydFBvc2l0aW9uLnkgPSBsb2NQb3NZO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jQ29uZmlnID0gdGhpcy5fY29uZmlnO1xyXG4gICAgICAgICAgICB2YXIgeGEgPSAwO1xyXG4gICAgICAgICAgICB2YXIgeGIgPSBsb2NDb25maWdbMF0ueDtcclxuICAgICAgICAgICAgdmFyIHhjID0gbG9jQ29uZmlnWzFdLng7XHJcbiAgICAgICAgICAgIHZhciB4ZCA9IGxvY0NvbmZpZ1syXS54O1xyXG5cclxuICAgICAgICAgICAgdmFyIHlhID0gMDtcclxuICAgICAgICAgICAgdmFyIHliID0gbG9jQ29uZmlnWzBdLnk7XHJcbiAgICAgICAgICAgIHZhciB5YyA9IGxvY0NvbmZpZ1sxXS55O1xyXG4gICAgICAgICAgICB2YXIgeWQgPSBsb2NDb25maWdbMl0ueTtcclxuXHJcbiAgICAgICAgICAgIHZhciB4ID0gYmV6aWVyQXQoeGEsIHhiLCB4YywgeGQsIGR0KTtcclxuICAgICAgICAgICAgdmFyIHkgPSBiZXppZXJBdCh5YSwgeWIsIHljLCB5ZCwgZHQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvY1N0YXJ0UG9zaXRpb24gPSB0aGlzLl9zdGFydFBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZiAoY2MubWFjcm8uRU5BQkxFX1NUQUNLQUJMRV9BQ1RJT05TKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0WCA9IHRoaXMudGFyZ2V0Lng7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0WSA9IHRoaXMudGFyZ2V0Lnk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jUHJldmlvdXNQb3NpdGlvbiA9IHRoaXMuX3ByZXZpb3VzUG9zaXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jU3RhcnRQb3NpdGlvbi54ID0gbG9jU3RhcnRQb3NpdGlvbi54ICsgdGFyZ2V0WCAtIGxvY1ByZXZpb3VzUG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIGxvY1N0YXJ0UG9zaXRpb24ueSA9IGxvY1N0YXJ0UG9zaXRpb24ueSArIHRhcmdldFkgLSBsb2NQcmV2aW91c1Bvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICB4ID0geCArIGxvY1N0YXJ0UG9zaXRpb24ueDtcclxuICAgICAgICAgICAgICAgIHkgPSB5ICsgbG9jU3RhcnRQb3NpdGlvbi55O1xyXG5cdCAgICAgICAgICAgIGxvY1ByZXZpb3VzUG9zaXRpb24ueCA9IHg7XHJcblx0ICAgICAgICAgICAgbG9jUHJldmlvdXNQb3NpdGlvbi55ID0geTtcclxuXHQgICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih4LCB5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNldFBvc2l0aW9uKGxvY1N0YXJ0UG9zaXRpb24ueCArIHgsIGxvY1N0YXJ0UG9zaXRpb24ueSArIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbG9jQ29uZmlnID0gdGhpcy5fY29uZmlnO1xyXG4gICAgICAgIHZhciB4MCA9IGxvY0NvbmZpZ1swXS54LCB5MCA9IGxvY0NvbmZpZ1swXS55O1xyXG4gICAgICAgIHZhciB4MSA9IGxvY0NvbmZpZ1sxXS54LCB5MSA9IGxvY0NvbmZpZ1sxXS55O1xyXG4gICAgICAgIHZhciB4MiA9IGxvY0NvbmZpZ1syXS54LCB5MiA9IGxvY0NvbmZpZ1syXS55O1xyXG4gICAgICAgIHZhciByID0gW1xyXG4gICAgICAgICAgICBjYy52Mih4MSAtIHgyLCB5MSAtIHkyKSxcclxuICAgICAgICAgICAgY2MudjIoeDAgLSB4MiwgeTAgLSB5MiksXHJcbiAgICAgICAgICAgIGNjLnYyKC14MiwgLXkyKSBdO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQmV6aWVyQnkodGhpcy5fZHVyYXRpb24sIHIpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW4gYWN0aW9uIHRoYXQgbW92ZXMgdGhlIHRhcmdldCB3aXRoIGEgY3ViaWMgQmV6aWVyIGN1cnZlIGJ5IGEgY2VydGFpbiBkaXN0YW5jZS5cclxuICogUmVsYXRpdmUgdG8gaXRzIG1vdmVtZW50LlxyXG4gKiAhI3poIOaMiei0nei1m+WwlOabsue6v+i9qOi/ueenu+WKqOaMh+WumueahOi3neemu+OAglxyXG4gKiBAbWV0aG9kIGJlemllckJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0IC0gdGltZSBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7VmVjMltdfSBjIC0gQXJyYXkgb2YgcG9pbnRzXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBiZXppZXIgPSBbY2MudjIoMCwgd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAtd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAxMDApXTtcclxuICogdmFyIGJlemllckZvcndhcmQgPSBjYy5iZXppZXJCeSgzLCBiZXppZXIpO1xyXG4gKi9cclxuY2MuYmV6aWVyQnkgPSBmdW5jdGlvbiAodCwgYykge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5CZXppZXJCeSh0LCBjKTtcclxufTtcclxuXHJcblxyXG4vKiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBjdWJpYyBCZXppZXIgY3VydmUgdG8gYSBkZXN0aW5hdGlvbiBwb2ludC5cclxuICogQGNsYXNzIEJlemllclRvXHJcbiAqIEBleHRlbmRzIEJlemllckJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0XHJcbiAqIEBwYXJhbSB7VmVjMltdfSBjIC0gQXJyYXkgb2YgcG9pbnRzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBiZXppZXIgPSBbY2MudjIoMCwgd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAtd2luZG93U2l6ZS5oZWlnaHQgLyAyKSwgY2MudjIoMzAwLCAxMDApXTtcclxuICogdmFyIGJlemllclRvID0gbmV3IGNjLkJlemllclRvKDIsIGJlemllcik7XHJcbiAqL1xyXG5jYy5CZXppZXJUbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5CZXppZXJUbycsXHJcbiAgICBleHRlbmRzOiBjYy5CZXppZXJCeSxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uICh0LCBjKSB7XHJcbiAgICAgICAgdGhpcy5fdG9Db25maWcgPSBbXTtcclxuXHRcdGMgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKHQsIGMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0IHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgICogQHBhcmFtIHtWZWMyW119IGMgLSBBcnJheSBvZiBwb2ludHNcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKHQsIGMpIHtcclxuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCB0KSkge1xyXG4gICAgICAgICAgICB0aGlzLl90b0NvbmZpZyA9IGM7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkJlemllclRvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX3RvQ29uZmlnKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkJlemllckJ5LnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHZhciBsb2NTdGFydFBvcyA9IHRoaXMuX3N0YXJ0UG9zaXRpb247XHJcbiAgICAgICAgdmFyIGxvY1RvQ29uZmlnID0gdGhpcy5fdG9Db25maWc7XHJcbiAgICAgICAgdmFyIGxvY0NvbmZpZyA9IHRoaXMuX2NvbmZpZztcclxuXHJcbiAgICAgICAgbG9jQ29uZmlnWzBdID0gbG9jVG9Db25maWdbMF0uc3ViKGxvY1N0YXJ0UG9zKTtcclxuICAgICAgICBsb2NDb25maWdbMV0gPSBsb2NUb0NvbmZpZ1sxXS5zdWIobG9jU3RhcnRQb3MpO1xyXG4gICAgICAgIGxvY0NvbmZpZ1syXSA9IGxvY1RvQ29uZmlnWzJdLnN1Yihsb2NTdGFydFBvcyk7XHJcbiAgICB9XHJcbn0pO1xyXG4vKipcclxuICogISNlbiBBbiBhY3Rpb24gdGhhdCBtb3ZlcyB0aGUgdGFyZ2V0IHdpdGggYSBjdWJpYyBCZXppZXIgY3VydmUgdG8gYSBkZXN0aW5hdGlvbiBwb2ludC5cclxuICogISN6aCDmjInotJ3otZvlsJTmm7Lnur/ovajov7nnp7vliqjliLDnm67moIfkvY3nva7jgIJcclxuICogQG1ldGhvZCBiZXppZXJUb1xyXG4gKiBAcGFyYW0ge051bWJlcn0gdFxyXG4gKiBAcGFyYW0ge1ZlYzJbXX0gYyAtIEFycmF5IG9mIHBvaW50c1xyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgYmV6aWVyID0gW2NjLnYyKDAsIHdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgLXdpbmRvd1NpemUuaGVpZ2h0IC8gMiksIGNjLnYyKDMwMCwgMTAwKV07XHJcbiAqIHZhciBiZXppZXJUbyA9IGNjLmJlemllclRvKDIsIGJlemllcik7XHJcbiAqL1xyXG5jYy5iZXppZXJUbyA9IGZ1bmN0aW9uICh0LCBjKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkJlemllclRvKHQsIGMpO1xyXG59O1xyXG5cclxuXHJcbi8qIFNjYWxlcyBhIE5vZGUgb2JqZWN0IHRvIGEgem9vbSBmYWN0b3IgYnkgbW9kaWZ5aW5nIGl0J3Mgc2NhbGUgcHJvcGVydHkuXHJcbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGRvZXNuJ3Qgc3VwcG9ydCBcInJldmVyc2VcIlxyXG4gKiBAY2xhc3MgU2NhbGVUb1xyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHN4ICBzY2FsZSBwYXJhbWV0ZXIgaW4gWFxyXG4gKiBAcGFyYW0ge051bWJlcn0gW3N5XSBzY2FsZSBwYXJhbWV0ZXIgaW4gWSwgaWYgTnVsbCBlcXVhbCB0byBzeFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBJdCBzY2FsZXMgdG8gMC41IGluIGJvdGggWCBhbmQgWS5cclxuICogdmFyIGFjdGlvblRvID0gbmV3IGNjLlNjYWxlVG8oMiwgMC41KTtcclxuICpcclxuICogLy8gSXQgc2NhbGVzIHRvIDAuNSBpbiB4IGFuZCAyIGluIFlcclxuICogdmFyIGFjdGlvblRvID0gbmV3IGNjLlNjYWxlVG8oMiwgMC41LCAyKTtcclxuICovXHJcbmNjLlNjYWxlVG8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2NhbGVUbycsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgc3gsIHN5KSB7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0U2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLl9zdGFydFNjYWxlWSA9IDE7XHJcbiAgICAgICAgdGhpcy5fZW5kU2NhbGVYID0gMDtcclxuICAgICAgICB0aGlzLl9lbmRTY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gMDtcclxuICAgICAgICBzeCAhPT0gdW5kZWZpbmVkICYmIGNjLlNjYWxlVG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgc3gsIHN5KTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzeT1dXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgc3gsIHN5KSB7IC8vZnVuY3Rpb24gb3ZlcmxvYWQgaGVyZVxyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRTY2FsZVggPSBzeDtcclxuICAgICAgICAgICAgdGhpcy5fZW5kU2NhbGVZID0gKHN5ICE9IG51bGwpID8gc3kgOiBzeDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuU2NhbGVUbygpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9lbmRTY2FsZVgsIHRoaXMuX2VuZFNjYWxlWSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9zdGFydFNjYWxlWCA9IHRhcmdldC5zY2FsZVg7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRTY2FsZVkgPSB0YXJnZXQuc2NhbGVZO1xyXG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IHRoaXMuX2VuZFNjYWxlWCAtIHRoaXMuX3N0YXJ0U2NhbGVYO1xyXG4gICAgICAgIHRoaXMuX2RlbHRhWSA9IHRoaXMuX2VuZFNjYWxlWSAtIHRoaXMuX3N0YXJ0U2NhbGVZO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zY2FsZVggPSB0aGlzLl9zdGFydFNjYWxlWCArIHRoaXMuX2RlbHRhWCAqIGR0O1xyXG5cdCAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gdGhpcy5fc3RhcnRTY2FsZVkgKyB0aGlzLl9kZWx0YVkgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4vKipcclxuICogISNlbiBTY2FsZXMgYSBOb2RlIG9iamVjdCB0byBhIHpvb20gZmFjdG9yIGJ5IG1vZGlmeWluZyBpdCdzIHNjYWxlIHByb3BlcnR5LlxyXG4gKiAhI3poIOWwhuiKgueCueWkp+Wwj+e8qeaUvuWIsOaMh+WumueahOWAjeaVsOOAglxyXG4gKiBAbWV0aG9kIHNjYWxlVG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzeCAgc2NhbGUgcGFyYW1ldGVyIGluIFhcclxuICogQHBhcmFtIHtOdW1iZXJ9IFtzeV0gc2NhbGUgcGFyYW1ldGVyIGluIFksIGlmIE51bGwgZXF1YWwgdG8gc3hcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogLy8gSXQgc2NhbGVzIHRvIDAuNSBpbiBib3RoIFggYW5kIFkuXHJcbiAqIHZhciBhY3Rpb25UbyA9IGNjLnNjYWxlVG8oMiwgMC41KTtcclxuICpcclxuICogLy8gSXQgc2NhbGVzIHRvIDAuNSBpbiB4IGFuZCAyIGluIFlcclxuICogdmFyIGFjdGlvblRvID0gY2Muc2NhbGVUbygyLCAwLjUsIDIpO1xyXG4gKi9cclxuY2Muc2NhbGVUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgc3gsIHN5KSB7IC8vZnVuY3Rpb24gb3ZlcmxvYWRcclxuICAgIHJldHVybiBuZXcgY2MuU2NhbGVUbyhkdXJhdGlvbiwgc3gsIHN5KTtcclxufTtcclxuXHJcblxyXG4vKiBTY2FsZXMgYSBOb2RlIG9iamVjdCBhIHpvb20gZmFjdG9yIGJ5IG1vZGlmeWluZyBpdCdzIHNjYWxlIHByb3BlcnR5LlxyXG4gKiBSZWxhdGl2ZSB0byBpdHMgY2hhbmdlcy5cclxuICogQGNsYXNzIFNjYWxlQnlcclxuICogQGV4dGVuZHMgU2NhbGVUb1xyXG4gKi9cclxuY2MuU2NhbGVCeSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5TY2FsZUJ5JyxcclxuICAgIGV4dGVuZHM6IGNjLlNjYWxlVG8sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5TY2FsZVRvLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX2RlbHRhWCA9IHRoaXMuX3N0YXJ0U2NhbGVYICogdGhpcy5fZW5kU2NhbGVYIC0gdGhpcy5fc3RhcnRTY2FsZVg7XHJcbiAgICAgICAgdGhpcy5fZGVsdGFZID0gdGhpcy5fc3RhcnRTY2FsZVkgKiB0aGlzLl9lbmRTY2FsZVkgLSB0aGlzLl9zdGFydFNjYWxlWTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TY2FsZUJ5KHRoaXMuX2R1cmF0aW9uLCAxIC8gdGhpcy5fZW5kU2NhbGVYLCAxIC8gdGhpcy5fZW5kU2NhbGVZKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TY2FsZUJ5KCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX2VuZFNjYWxlWCwgdGhpcy5fZW5kU2NhbGVZKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuLyoqXHJcbiAqICEjZW5cclxuICogU2NhbGVzIGEgTm9kZSBvYmplY3QgYSB6b29tIGZhY3RvciBieSBtb2RpZnlpbmcgaXQncyBzY2FsZSBwcm9wZXJ0eS5cclxuICogUmVsYXRpdmUgdG8gaXRzIGNoYW5nZXMuXHJcbiAqICEjemgg5oyJ5oyH5a6a55qE5YCN5pWw57yp5pS+6IqC54K55aSn5bCP44CCXHJcbiAqIEBtZXRob2Qgc2NhbGVCeVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gc3ggc3ggIHNjYWxlIHBhcmFtZXRlciBpbiBYXHJcbiAqIEBwYXJhbSB7TnVtYmVyfE51bGx9IFtzeT1dIHN5IHNjYWxlIHBhcmFtZXRlciBpbiBZLCBpZiBOdWxsIGVxdWFsIHRvIHN4XHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlIHdpdGhvdXQgc3ksIGl0IHNjYWxlcyBieSAyIGJvdGggaW4gWCBhbmQgWVxyXG4gKiB2YXIgYWN0aW9uQnkgPSBjYy5zY2FsZUJ5KDIsIDIpO1xyXG4gKlxyXG4gKiAvL2V4YW1wbGUgd2l0aCBzeSwgaXQgc2NhbGVzIGJ5IDAuMjUgaW4gWCBhbmQgNC41IGluIFlcclxuICogdmFyIGFjdGlvbkJ5MiA9IGNjLnNjYWxlQnkoMiwgMC4yNSwgNC41KTtcclxuICovXHJcbmNjLnNjYWxlQnkgPSBmdW5jdGlvbiAoZHVyYXRpb24sIHN4LCBzeSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5TY2FsZUJ5KGR1cmF0aW9uLCBzeCwgc3kpO1xyXG59O1xyXG5cclxuLyogQmxpbmtzIGEgTm9kZSBvYmplY3QgYnkgbW9kaWZ5aW5nIGl0J3MgdmlzaWJsZSBwcm9wZXJ0eVxyXG4gKiBAY2xhc3MgQmxpbmtcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uICBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBibGlua3MgIGJsaW5rcyBpbiB0aW1lc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uID0gbmV3IGNjLkJsaW5rKDIsIDEwKTtcclxuICovXHJcbmNjLkJsaW5rID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkJsaW5rJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBibGlua3MpIHtcclxuICAgICAgICB0aGlzLl90aW1lcyA9IDA7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxTdGF0ZSA9IGZhbHNlO1xyXG5cdFx0YmxpbmtzICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBibGlua3MpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmxpbmtzIGJsaW5rcyBpbiB0aW1lc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGJsaW5rcykge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcyA9IGJsaW5rcztcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuQmxpbmsoKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdGltZXMpO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0ICYmICF0aGlzLmlzRG9uZSgpKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGljZSA9IDEuMCAvIHRoaXMuX3RpbWVzO1xyXG4gICAgICAgICAgICB2YXIgbSA9IGR0ICUgc2xpY2U7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Lm9wYWNpdHkgPSAobSA+IChzbGljZSAvIDIpKSA/IDI1NSA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsU3RhdGUgPSB0YXJnZXQub3BhY2l0eTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQub3BhY2l0eSA9IHRoaXMuX29yaWdpbmFsU3RhdGU7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0b3AuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5CbGluayh0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdGltZXMpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9XHJcbn0pO1xyXG4vKipcclxuICogISNlbiBCbGlua3MgYSBOb2RlIG9iamVjdCBieSBtb2RpZnlpbmcgaXQncyB2aXNpYmxlIHByb3BlcnR5LlxyXG4gKiAhI3poIOmXqueDge+8iOWfuuS6jumAj+aYjuW6pu+8ieOAglxyXG4gKiBAbWV0aG9kIGJsaW5rXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiAgZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gYmxpbmtzIGJsaW5rcyBpbiB0aW1lc1xyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uID0gY2MuYmxpbmsoMiwgMTApO1xyXG4gKi9cclxuY2MuYmxpbmsgPSBmdW5jdGlvbiAoZHVyYXRpb24sIGJsaW5rcykge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5CbGluayhkdXJhdGlvbiwgYmxpbmtzKTtcclxufTtcclxuXHJcbi8qIEZhZGVzIGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIGNjLlJHQkFQcm90b2NvbCBwcm90b2NvbC4gSXQgbW9kaWZpZXMgdGhlIG9wYWNpdHkgZnJvbSB0aGUgY3VycmVudCB2YWx1ZSB0byBhIGN1c3RvbSBvbmUuXHJcbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGRvZXNuJ3Qgc3VwcG9ydCBcInJldmVyc2VcIlxyXG4gKiBAY2xhc3MgRmFkZVRvXHJcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gb3BhY2l0eSAwLTI1NSwgMCBpcyB0cmFuc3BhcmVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYWN0aW9uID0gbmV3IGNjLkZhZGVUbygxLjAsIDApO1xyXG4gKi9cclxuY2MuRmFkZVRvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkZhZGVUbycsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgb3BhY2l0eSkge1xyXG4gICAgICAgIHRoaXMuX3RvT3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJvbU9wYWNpdHkgPSAwO1xyXG4gICAgICAgIG9wYWNpdHkgIT09IHVuZGVmaW5lZCAmJiBjYy5GYWRlVG8ucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbiwgb3BhY2l0eSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uICBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb3BhY2l0eVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIG9wYWNpdHkpIHtcclxuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9PcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZVRvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX3RvT3BhY2l0eSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uICh0aW1lKSB7XHJcbiAgICAgICAgdGltZSA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZSh0aW1lKTtcclxuICAgICAgICB2YXIgZnJvbU9wYWNpdHkgPSB0aGlzLl9mcm9tT3BhY2l0eSAhPT0gdW5kZWZpbmVkID8gdGhpcy5fZnJvbU9wYWNpdHkgOiAyNTU7XHJcbiAgICAgICAgdGhpcy50YXJnZXQub3BhY2l0eSA9IGZyb21PcGFjaXR5ICsgKHRoaXMuX3RvT3BhY2l0eSAtIGZyb21PcGFjaXR5KSAqIHRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbU9wYWNpdHkgPSB0YXJnZXQub3BhY2l0eTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBGYWRlcyBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5SR0JBUHJvdG9jb2wgcHJvdG9jb2wuXHJcbiAqIEl0IG1vZGlmaWVzIHRoZSBvcGFjaXR5IGZyb20gdGhlIGN1cnJlbnQgdmFsdWUgdG8gYSBjdXN0b20gb25lLlxyXG4gKiAhI3poIOS/ruaUuemAj+aYjuW6puWIsOaMh+WumuWAvOOAglxyXG4gKiBAbWV0aG9kIGZhZGVUb1xyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wYWNpdHkgMC0yNTUsIDAgaXMgdHJhbnNwYXJlbnRcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIGFjdGlvbiA9IGNjLmZhZGVUbygxLjAsIDApO1xyXG4gKi9cclxuY2MuZmFkZVRvID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBvcGFjaXR5KSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkZhZGVUbyhkdXJhdGlvbiwgb3BhY2l0eSk7XHJcbn07XHJcblxyXG4vKiBGYWRlcyBJbiBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5SR0JBUHJvdG9jb2wgcHJvdG9jb2wuIEl0IG1vZGlmaWVzIHRoZSBvcGFjaXR5IGZyb20gMCB0byAyNTUuPGJyLz5cclxuICogVGhlIFwicmV2ZXJzZVwiIG9mIHRoaXMgYWN0aW9uIGlzIEZhZGVPdXRcclxuICogQGNsYXNzIEZhZGVJblxyXG4gKiBAZXh0ZW5kcyBGYWRlVG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICovXHJcbmNjLkZhZGVJbiA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5GYWRlSW4nLFxyXG4gICAgZXh0ZW5kczogY2MuRmFkZVRvLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID09IG51bGwpXHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMDtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlQWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIDI1NSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZU91dCgpO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCAwKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5GYWRlSW4oKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fdG9PcGFjaXR5KTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGlmKHRoaXMuX3JldmVyc2VBY3Rpb24pXHJcbiAgICAgICAgICAgIHRoaXMuX3RvT3BhY2l0eSA9IHRoaXMuX3JldmVyc2VBY3Rpb24uX2Zyb21PcGFjaXR5O1xyXG4gICAgICAgIGNjLkZhZGVUby5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBGYWRlcyBJbiBhbiBvYmplY3QgdGhhdCBpbXBsZW1lbnRzIHRoZSBjYy5SR0JBUHJvdG9jb2wgcHJvdG9jb2wuIEl0IG1vZGlmaWVzIHRoZSBvcGFjaXR5IGZyb20gMCB0byAyNTUuXHJcbiAqICEjemgg5riQ5pi+5pWI5p6c44CCXHJcbiAqIEBtZXRob2QgZmFkZUluXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvL2V4YW1wbGVcclxuICogdmFyIGFjdGlvbiA9IGNjLmZhZGVJbigxLjApO1xyXG4gKi9cclxuY2MuZmFkZUluID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkZhZGVJbihkdXJhdGlvbik7XHJcbn07XHJcblxyXG5cclxuLyogRmFkZXMgT3V0IGFuIG9iamVjdCB0aGF0IGltcGxlbWVudHMgdGhlIGNjLlJHQkFQcm90b2NvbCBwcm90b2NvbC4gSXQgbW9kaWZpZXMgdGhlIG9wYWNpdHkgZnJvbSAyNTUgdG8gMC5cclxuICogVGhlIFwicmV2ZXJzZVwiIG9mIHRoaXMgYWN0aW9uIGlzIEZhZGVJblxyXG4gKiBAY2xhc3MgRmFkZU91dFxyXG4gKiBAZXh0ZW5kcyBGYWRlVG9cclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICovXHJcbmNjLkZhZGVPdXQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuRmFkZU91dCcsXHJcbiAgICBleHRlbmRzOiBjYy5GYWRlVG8sXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbiAoZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgZHVyYXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmFkZUluKCk7XHJcbiAgICAgICAgYWN0aW9uLl9yZXZlcnNlQWN0aW9uID0gdGhpcztcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhEdXJhdGlvbih0aGlzLl9kdXJhdGlvbiwgMjU1KTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5GYWRlT3V0KCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIHRoaXMuX3RvT3BhY2l0eSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBGYWRlcyBPdXQgYW4gb2JqZWN0IHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuUkdCQVByb3RvY29sIHByb3RvY29sLiBJdCBtb2RpZmllcyB0aGUgb3BhY2l0eSBmcm9tIDI1NSB0byAwLlxyXG4gKiAhI3poIOa4kOmakOaViOaenOOAglxyXG4gKiBAbWV0aG9kIGZhZGVPdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIGFjdGlvbiA9IGNjLmZhZGVPdXQoMS4wKTtcclxuICovXHJcbmNjLmZhZGVPdXQgPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5GYWRlT3V0KGQpO1xyXG59O1xyXG5cclxuLyogVGludHMgYSBOb2RlIHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuTm9kZVJHQiBwcm90b2NvbCBmcm9tIGN1cnJlbnQgdGludCB0byBhIGN1c3RvbSBvbmUuXHJcbiAqIEB3YXJuaW5nIFRoaXMgYWN0aW9uIGRvZXNuJ3Qgc3VwcG9ydCBcInJldmVyc2VcIlxyXG4gKiBAY2xhc3MgVGludFRvXHJcbiAqIEBleHRlbmRzIEFjdGlvbkludGVydmFsXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmVkIDAtMjU1XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBncmVlbiAgMC0yNTVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGJsdWUgMC0yNTVcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvbiA9IG5ldyBjYy5UaW50VG8oMiwgMjU1LCAwLCAyNTUpO1xyXG4gKi9cclxuY2MuVGludFRvID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlRpbnRUbycsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgcmVkLCBncmVlbiwgYmx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3RvID0gY2MuY29sb3IoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fZnJvbSA9IGNjLmNvbG9yKDAsIDAsIDApO1xyXG5cclxuICAgICAgICBpZiAocmVkIGluc3RhbmNlb2YgY2MuQ29sb3IpIHtcclxuICAgICAgICAgICAgYmx1ZSA9IHJlZC5iO1xyXG4gICAgICAgICAgICBncmVlbiA9IHJlZC5nO1xyXG4gICAgICAgICAgICByZWQgPSByZWQucjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJsdWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sIHJlZCwgZ3JlZW4sIGJsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgdGhlIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJlZCAwLTI1NVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGdyZWVuIDAtMjU1XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmx1ZSAwLTI1NVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIHJlZCwgZ3JlZW4sIGJsdWUpIHtcclxuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG8gPSBjYy5jb2xvcihyZWQsIGdyZWVuLCBibHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuVGludFRvKCk7XHJcbiAgICAgICAgdGhpcy5fY2xvbmVEZWNvcmF0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgdmFyIGxvY1RvID0gdGhpcy5fdG87XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoRHVyYXRpb24odGhpcy5fZHVyYXRpb24sIGxvY1RvLnIsIGxvY1RvLmcsIGxvY1RvLmIpO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2Zyb20gPSB0aGlzLnRhcmdldC5jb2xvcjtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICB2YXIgbG9jRnJvbSA9IHRoaXMuX2Zyb20sIGxvY1RvID0gdGhpcy5fdG87XHJcbiAgICAgICAgaWYgKGxvY0Zyb20pIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuY29sb3IgPSBjYy5jb2xvcihcclxuICAgICAgICAgICAgICAgICAgICBsb2NGcm9tLnIgKyAobG9jVG8uciAtIGxvY0Zyb20ucikgKiBkdCxcclxuICAgICAgICAgICAgICAgICAgICBsb2NGcm9tLmcgKyAobG9jVG8uZyAtIGxvY0Zyb20uZykgKiBkdCxcclxuICAgICAgICAgICAgICAgICAgICBsb2NGcm9tLmIgKyAobG9jVG8uYiAtIGxvY0Zyb20uYikgKiBkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRpbnRzIGEgTm9kZSB0aGF0IGltcGxlbWVudHMgdGhlIGNjLk5vZGVSR0IgcHJvdG9jb2wgZnJvbSBjdXJyZW50IHRpbnQgdG8gYSBjdXN0b20gb25lLlxyXG4gKiAhI3poIOS/ruaUueminOiJsuWIsOaMh+WumuWAvOOAglxyXG4gKiBAbWV0aG9kIHRpbnRUb1xyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHJlZCAwLTI1NVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZ3JlZW4gIDAtMjU1XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBibHVlIDAtMjU1XHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb24gPSBjYy50aW50VG8oMiwgMjU1LCAwLCAyNTUpO1xyXG4gKi9cclxuY2MudGludFRvID0gZnVuY3Rpb24gKGR1cmF0aW9uLCByZWQsIGdyZWVuLCBibHVlKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLlRpbnRUbyhkdXJhdGlvbiwgcmVkLCBncmVlbiwgYmx1ZSk7XHJcbn07XHJcblxyXG5cclxuLyogVGludHMgYSBOb2RlIHRoYXQgaW1wbGVtZW50cyB0aGUgY2MuTm9kZVJHQiBwcm90b2NvbCBmcm9tIGN1cnJlbnQgdGludCB0byBhIGN1c3RvbSBvbmUuXHJcbiAqIFJlbGF0aXZlIHRvIHRoZWlyIG93biBjb2xvciBjaGFuZ2UuXHJcbiAqIEBjbGFzcyBUaW50QnlcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uICBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVJlZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFHcmVlblxyXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsdGFCbHVlXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb24gPSBuZXcgY2MuVGludEJ5KDIsIC0xMjcsIC0yNTUsIC0xMjcpO1xyXG4gKi9cclxuY2MuVGludEJ5ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlRpbnRCeScsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFSZWQsIGRlbHRhR3JlZW4sIGRlbHRhQmx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2RlbHRhUiA9IDA7XHJcbiAgICAgICAgdGhpcy5fZGVsdGFHID0gMDtcclxuICAgICAgICB0aGlzLl9kZWx0YUIgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Zyb21SID0gMDtcclxuICAgICAgICB0aGlzLl9mcm9tRyA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJvbUIgPSAwO1xyXG5cdFx0ZGVsdGFCbHVlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBkZWx0YVJlZCwgZGVsdGFHcmVlbiwgZGVsdGFCbHVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YVJlZCAwLTI1NVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhR3JlZW4gMC0yNTVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUJsdWUgMC0yNTVcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRHVyYXRpb246ZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YVJlZCwgZGVsdGFHcmVlbiwgZGVsdGFCbHVlKSB7XHJcbiAgICAgICAgaWYgKGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5pbml0V2l0aER1cmF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhUiA9IGRlbHRhUmVkO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWx0YUcgPSBkZWx0YUdyZWVuO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWx0YUIgPSBkZWx0YUJsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlRpbnRCeSgpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9kZWx0YVIsIHRoaXMuX2RlbHRhRywgdGhpcy5fZGVsdGFCKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG5cclxuICAgICAgICB2YXIgY29sb3IgPSB0YXJnZXQuY29sb3I7XHJcbiAgICAgICAgdGhpcy5fZnJvbVIgPSBjb2xvci5yO1xyXG4gICAgICAgIHRoaXMuX2Zyb21HID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9mcm9tQiA9IGNvbG9yLmI7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICBkdCA9IHRoaXMuX2NvbXB1dGVFYXNlVGltZShkdCk7XHJcblxyXG4gICAgICAgIHRoaXMudGFyZ2V0LmNvbG9yID0gY2MuY29sb3IodGhpcy5fZnJvbVIgKyB0aGlzLl9kZWx0YVIgKiBkdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJvbUcgKyB0aGlzLl9kZWx0YUcgKiBkdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJvbUIgKyB0aGlzLl9kZWx0YUIgKiBkdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuVGludEJ5KHRoaXMuX2R1cmF0aW9uLCAtdGhpcy5fZGVsdGFSLCAtdGhpcy5fZGVsdGFHLCAtdGhpcy5fZGVsdGFCKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRpbnRzIGEgTm9kZSB0aGF0IGltcGxlbWVudHMgdGhlIGNjLk5vZGVSR0IgcHJvdG9jb2wgZnJvbSBjdXJyZW50IHRpbnQgdG8gYSBjdXN0b20gb25lLlxyXG4gKiBSZWxhdGl2ZSB0byB0aGVpciBvd24gY29sb3IgY2hhbmdlLlxyXG4gKiAhI3poIOaMieeFp+aMh+WumueahOWinumHj+S/ruaUueminOiJsuOAglxyXG4gKiBAbWV0aG9kIHRpbnRCeVxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhUmVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUdyZWVuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWx0YUJsdWVcclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIGFjdGlvbiA9IGNjLnRpbnRCeSgyLCAtMTI3LCAtMjU1LCAtMTI3KTtcclxuICovXHJcbmNjLnRpbnRCeSA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZGVsdGFSZWQsIGRlbHRhR3JlZW4sIGRlbHRhQmx1ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5UaW50QnkoZHVyYXRpb24sIGRlbHRhUmVkLCBkZWx0YUdyZWVuLCBkZWx0YUJsdWUpO1xyXG59O1xyXG5cclxuLyogRGVsYXlzIHRoZSBhY3Rpb24gYSBjZXJ0YWluIGFtb3VudCBvZiBzZWNvbmRzXHJcbiAqIEBjbGFzcyBEZWxheVRpbWVcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICovXHJcbmNjLkRlbGF5VGltZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5EZWxheVRpbWUnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge30sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5EZWxheVRpbWUodGhpcy5fZHVyYXRpb24pO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuX3JldmVyc2VFYXNlTGlzdChhY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBhY3Rpb247XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLkRlbGF5VGltZSgpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIERlbGF5cyB0aGUgYWN0aW9uIGEgY2VydGFpbiBhbW91bnQgb2Ygc2Vjb25kcy5cclxuICogISN6aCDlu7bov5/mjIflrprnmoTml7bpl7Tph4/jgIJcclxuICogQG1ldGhvZCBkZWxheVRpbWVcclxuICogQHBhcmFtIHtOdW1iZXJ9IGQgZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgZGVsYXkgPSBjYy5kZWxheVRpbWUoMSk7XHJcbiAqL1xyXG5jYy5kZWxheVRpbWUgPSBmdW5jdGlvbiAoZCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5EZWxheVRpbWUoZCk7XHJcbn07XHJcblxyXG4vKlxyXG4gKiA8cD5cclxuICogRXhlY3V0ZXMgYW4gYWN0aW9uIGluIHJldmVyc2Ugb3JkZXIsIGZyb20gdGltZT1kdXJhdGlvbiB0byB0aW1lPTAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogQHdhcm5pbmcgVXNlIHRoaXMgYWN0aW9uIGNhcmVmdWxseS4gVGhpcyBhY3Rpb24gaXMgbm90IHNlcXVlbmNlYWJsZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiBVc2UgaXQgYXMgdGhlIGRlZmF1bHQgXCJyZXZlcnNlZFwiIG1ldGhvZCBvZiB5b3VyIG93biBhY3Rpb25zLCBidXQgdXNpbmcgaXQgb3V0c2lkZSB0aGUgXCJyZXZlcnNlZFwiICAgICAgPGJyLz5cclxuICogc2NvcGUgaXMgbm90IHJlY29tbWVuZGVkLlxyXG4gKiA8L3A+XHJcbiAqIEBjbGFzcyBSZXZlcnNlVGltZVxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgdmFyIHJldmVyc2UgPSBuZXcgY2MuUmV2ZXJzZVRpbWUodGhpcyk7XHJcbiAqL1xyXG5jYy5SZXZlcnNlVGltZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5SZXZlcnNlVGltZScsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcclxuXHJcbiAgICBjdG9yOmZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9vdGhlciA9IG51bGw7XHJcblx0XHRhY3Rpb24gJiYgdGhpcy5pbml0V2l0aEFjdGlvbihhY3Rpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogQHBhcmFtIHtGaW5pdGVUaW1lQWN0aW9ufSBhY3Rpb25cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICBpZiAoIWFjdGlvbikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09IHRoaXMuX290aGVyKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTAyOSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGFjdGlvbi5fZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIC8vIERvbid0IGxlYWsgaWYgYWN0aW9uIGlzIHJldXNlZFxyXG4gICAgICAgICAgICB0aGlzLl9vdGhlciA9IGFjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUmV2ZXJzZVRpbWUoKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhBY3Rpb24odGhpcy5fb3RoZXIuY2xvbmUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICB0aGlzLl9vdGhlci5zdGFydFdpdGhUYXJnZXQodGFyZ2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICBpZiAodGhpcy5fb3RoZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX290aGVyLnVwZGF0ZSgxIC0gZHQpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3RoZXIuY2xvbmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fb3RoZXIuc3RvcCgpO1xyXG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEV4ZWN1dGVzIGFuIGFjdGlvbiBpbiByZXZlcnNlIG9yZGVyLCBmcm9tIHRpbWU9ZHVyYXRpb24gdG8gdGltZT0wLlxyXG4gKiAhI3poIOWPjei9rOebruagh+WKqOS9nOeahOaXtumXtOi9tOOAglxyXG4gKiBAbWV0aG9kIHJldmVyc2VUaW1lXHJcbiAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqICB2YXIgcmV2ZXJzZSA9IGNjLnJldmVyc2VUaW1lKHRoaXMpO1xyXG4gKi9cclxuY2MucmV2ZXJzZVRpbWUgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLlJldmVyc2VUaW1lKGFjdGlvbik7XHJcbn07XHJcblxyXG4vKlxyXG4gKiA8cD5cclxuICogT3ZlcnJpZGVzIHRoZSB0YXJnZXQgb2YgYW4gYWN0aW9uIHNvIHRoYXQgaXQgYWx3YXlzIHJ1bnMgb24gdGhlIHRhcmdldDxici8+XHJcbiAqIHNwZWNpZmllZCBhdCBhY3Rpb24gY3JlYXRpb24gcmF0aGVyIHRoYW4gdGhlIG9uZSBzcGVjaWZpZWQgYnkgcnVuQWN0aW9uLlxyXG4gKiA8L3A+XHJcbiAqIEBjbGFzcyBUYXJnZXRlZEFjdGlvblxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxyXG4gKi9cclxuY2MuVGFyZ2V0ZWRBY3Rpb24gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVGFyZ2V0ZWRBY3Rpb24nLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKHRhcmdldCwgYWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9mb3JjZWRUYXJnZXQgPSBudWxsO1xyXG5cdFx0YWN0aW9uICYmIHRoaXMuaW5pdFdpdGhUYXJnZXQodGFyZ2V0LCBhY3Rpb24pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdCBhbiBhY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGFjdGlvbiBhbmQgZm9yY2VkIHRhcmdldFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcclxuICAgICAqIEBwYXJhbSB7RmluaXRlVGltZUFjdGlvbn0gYWN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aFRhcmdldDpmdW5jdGlvbiAodGFyZ2V0LCBhY3Rpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5pbml0V2l0aER1cmF0aW9uKGFjdGlvbi5fZHVyYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvcmNlZFRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5UYXJnZXRlZEFjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aFRhcmdldCh0aGlzLl9mb3JjZWRUYXJnZXQsIHRoaXMuX2FjdGlvbi5jbG9uZSgpKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX2FjdGlvbi5zdGFydFdpdGhUYXJnZXQodGhpcy5fZm9yY2VkVGFyZ2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uLnN0b3AoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICB0aGlzLl9hY3Rpb24udXBkYXRlKGR0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIHJldHVybiB0aGUgdGFyZ2V0IHRoYXQgdGhlIGFjdGlvbiB3aWxsIGJlIGZvcmNlZCB0byBydW4gd2l0aFxyXG4gICAgICogQHJldHVybiB7Tm9kZX1cclxuICAgICAqL1xyXG4gICAgZ2V0Rm9yY2VkVGFyZ2V0OmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9yY2VkVGFyZ2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogc2V0IHRoZSB0YXJnZXQgdGhhdCB0aGUgYWN0aW9uIHdpbGwgYmUgZm9yY2VkIHRvIHJ1biB3aXRoXHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IGZvcmNlZFRhcmdldFxyXG4gICAgICovXHJcbiAgICBzZXRGb3JjZWRUYXJnZXQ6ZnVuY3Rpb24gKGZvcmNlZFRhcmdldCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9mb3JjZWRUYXJnZXQgIT09IGZvcmNlZFRhcmdldClcclxuICAgICAgICAgICAgdGhpcy5fZm9yY2VkVGFyZ2V0ID0gZm9yY2VkVGFyZ2V0O1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZSBhbiBhY3Rpb24gd2l0aCB0aGUgc3BlY2lmaWVkIGFjdGlvbiBhbmQgZm9yY2VkIHRhcmdldC5cclxuICogISN6aCDnlKjlt7LmnInliqjkvZzlkozkuIDkuKrmlrDnmoTnm67moIfoioLngrnliJvlu7rliqjkvZzjgIJcclxuICogQG1ldGhvZCB0YXJnZXRlZEFjdGlvblxyXG4gKiBAcGFyYW0ge05vZGV9IHRhcmdldFxyXG4gKiBAcGFyYW0ge0Zpbml0ZVRpbWVBY3Rpb259IGFjdGlvblxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICovXHJcbmNjLnRhcmdldGVkQWN0aW9uID0gZnVuY3Rpb24gKHRhcmdldCwgYWN0aW9uKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLlRhcmdldGVkQWN0aW9uKHRhcmdldCwgYWN0aW9uKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=