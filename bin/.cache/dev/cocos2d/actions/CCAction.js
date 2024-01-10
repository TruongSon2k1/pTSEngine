
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCAction.js';
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
require('../core/platform/CCClass');

var misc = require('../core/utils/misc');
/**
 * @module cc
 */

/**
 * !#en Base class cc.Action for action classes.
 * !#zh Action 类是所有动作类型的基类。
 * @class Action
 */


cc.Action = cc.Class({
  name: 'cc.Action',
  //**************Public Functions***********
  ctor: function ctor() {
    this.originalTarget = null;
    this.target = null;
    this.tag = cc.Action.TAG_INVALID;
  },

  /**
   * !#en
   * to copy object with deep copy.
   * returns a clone of action.
   * !#zh 返回一个克隆的动作。
   * @method clone
   * @return {Action}
   */
  clone: function clone() {
    var action = new cc.Action();
    action.originalTarget = null;
    action.target = null;
    action.tag = this.tag;
    return action;
  },

  /**
   * !#en
   * return true if the action has finished.
   * !#zh 如果动作已完成就返回 true。
   * @method isDone
   * @return {Boolean}
   */
  isDone: function isDone() {
    return true;
  },
  // called before the action start. It will also set the target.
  startWithTarget: function startWithTarget(target) {
    this.originalTarget = target;
    this.target = target;
  },
  // called after the action has finished. It will set the 'target' to nil.
  stop: function stop() {
    this.target = null;
  },
  // called every frame with it's delta time. <br />
  step: function step(dt) {
    cc.logID(1006);
  },
  // Called once per frame. Time is the number of seconds of a frame interval.
  update: function update(dt) {
    cc.logID(1007);
  },

  /**
   * !#en get the target.
   * !#zh 获取当前目标节点。
   * @method getTarget
   * @return {Node}
   */
  getTarget: function getTarget() {
    return this.target;
  },

  /**
   * !#en The action will modify the target properties.
   * !#zh 设置目标节点。
   * @method setTarget
   * @param {Node} target
   */
  setTarget: function setTarget(target) {
    this.target = target;
  },

  /**
   * !#en get the original target.
   * !#zh 获取原始目标节点。
   * @method getOriginalTarget
   * @return {Node}
   */
  getOriginalTarget: function getOriginalTarget() {
    return this.originalTarget;
  },
  // Set the original target, since target can be nil.
  // Is the target that were used to run the action.
  // Unless you are doing something complex, like cc.ActionManager, you should NOT call this method.
  setOriginalTarget: function setOriginalTarget(originalTarget) {
    this.originalTarget = originalTarget;
  },

  /**
   * !#en get tag number.
   * !#zh 获取用于识别动作的标签。
   * @method getTag
   * @return {Number}
   */
  getTag: function getTag() {
    return this.tag;
  },

  /**
   * !#en set tag number.
   * !#zh 设置标签，用于识别动作。
   * @method setTag
   * @param {Number} tag
   */
  setTag: function setTag(tag) {
    this.tag = tag;
  },
  // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
  // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
  // This is a hack, and should be removed once JSB fixes the retain/release bug.
  retain: function retain() {},
  // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
  // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
  // This is a hack, and should be removed once JSB fixes the retain/release bug.
  release: function release() {}
});
/**
 * !#en Default Action tag.
 * !#zh 默认动作标签。
 * @property TAG_INVALID
 * @constant
 * @static
 * @type {Number}
 * @default -1
 */

cc.Action.TAG_INVALID = -1;
/**
 * !#en
 * Base class actions that do have a finite time duration. <br/>
 * Possible actions: <br/>
 * - An action with a duration of 0 seconds. <br/>
 * - An action with a duration of 35.5 seconds.
 *
 * Infinite time actions are valid
 * !#zh 有限时间动作，这种动作拥有时长 duration 属性。
 * @class FiniteTimeAction
 * @extends Action
 */

cc.FiniteTimeAction = cc.Class({
  name: 'cc.FiniteTimeAction',
  "extends": cc.Action,
  ctor: function ctor() {
    //! duration in seconds
    this._duration = 0;
  },

  /**
   * !#en get duration of the action. (seconds).
   * !#zh 获取动作以秒为单位的持续时间。
   * @method getDuration
   * @return {Number}
   */
  getDuration: function getDuration() {
    return this._duration * (this._timesForRepeat || 1);
  },

  /**
   * !#en set duration of the action. (seconds).
   * !#zh 设置动作以秒为单位的持续时间。
   * @method setDuration
   * @param {Number} duration
   */
  setDuration: function setDuration(duration) {
    this._duration = duration;
  },

  /**
   * !#en
   * Returns a reversed action. <br />
   * For example: <br />
   * - The action will be x coordinates of 0 move to 100. <br />
   * - The reversed action will be x of 100 move to 0.
   * - Will be rewritten
   * !#zh 返回一个新的动作，执行与原动作完全相反的动作。
   * @method reverse
   * @return {Null}
   */
  reverse: function reverse() {
    cc.logID(1008);
    return null;
  },

  /**
   * !#en
   * to copy object with deep copy.
   * returns a clone of action.
   * !#zh 返回一个克隆的动作。
   * @method clone
   * @return {FiniteTimeAction}
   */
  clone: function clone() {
    return new cc.FiniteTimeAction();
  }
});
/**
 * @module cc
 */

/*
 * Changes the speed of an action, making it take longer (speed > 1)
 * or less (speed < 1) time. <br/>
 * Useful to simulate 'slow motion' or 'fast forward' effect.
 *
 * @warning This action can't be Sequenceable because it is not an cc.IntervalAction
 * @class Speed
 * @extends Action
 *
 * @param {ActionInterval} action
 * @param {Number} speed
 */

cc.Speed = cc.Class({
  name: 'cc.Speed',
  "extends": cc.Action,
  ctor: function ctor(action, speed) {
    this._speed = 0;
    this._innerAction = null;
    action && this.initWithAction(action, speed);
  },

  /*
   * Gets the current running speed. <br />
   * Will get a percentage number, compared to the original speed.
   *
   * @method getSpeed
   * @return {Number}
   */
  getSpeed: function getSpeed() {
    return this._speed;
  },

  /*
   * alter the speed of the inner function in runtime.
   * @method setSpeed
   * @param {Number} speed
   */
  setSpeed: function setSpeed(speed) {
    this._speed = speed;
  },

  /*
   * initializes the action.
   * @method initWithAction
   * @param {ActionInterval} action
   * @param {Number} speed
   * @return {Boolean}
   */
  initWithAction: function initWithAction(action, speed) {
    if (!action) {
      cc.errorID(1021);
      return false;
    }

    this._innerAction = action;
    this._speed = speed;
    return true;
  },
  clone: function clone() {
    var action = new cc.Speed();
    action.initWithAction(this._innerAction.clone(), this._speed);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.Action.prototype.startWithTarget.call(this, target);

    this._innerAction.startWithTarget(target);
  },
  stop: function stop() {
    this._innerAction.stop();

    cc.Action.prototype.stop.call(this);
  },
  step: function step(dt) {
    this._innerAction.step(dt * this._speed);
  },
  isDone: function isDone() {
    return this._innerAction.isDone();
  },
  reverse: function reverse() {
    return new cc.Speed(this._innerAction.reverse(), this._speed);
  },

  /*
   * Set inner Action.
   * @method setInnerAction
   * @param {ActionInterval} action
   */
  setInnerAction: function setInnerAction(action) {
    if (this._innerAction !== action) {
      this._innerAction = action;
    }
  },

  /*
   * Get inner Action.
   * @method getInnerAction
   * @return {ActionInterval}
   */
  getInnerAction: function getInnerAction() {
    return this._innerAction;
  }
});
/**
 * @module cc
 */

/**
 * !#en
 * Creates the speed action which changes the speed of an action, making it take longer (speed > 1)
 * or less (speed < 1) time. <br/>
 * Useful to simulate 'slow motion' or 'fast forward' effect.
 * !#zh 修改目标动作的速率。
 * @warning This action can't be Sequenceable because it is not an cc.IntervalAction
 *
 * @method speed
 * @param {ActionInterval} action
 * @param {Number} speed
 * @return {Action}
 * @example
 * // change the target action speed;
 * var action = cc.scaleTo(0.2, 1, 0.6);
 * var newAction = cc.speed(action, 0.5);
 */

cc.speed = function (action, speed) {
  return new cc.Speed(action, speed);
};
/*
 * cc.Follow is a follow action which makes its target follows another node.
 *
 * @example
 * //example
 * //Instead of using cc.Camera as a "follower", use this action instead.
 * layer.runAction(cc.follow(hero));
 *
 * @property {Number}  leftBoundary - world leftBoundary.
 * @property {Number}  rightBoundary - world rightBoundary.
 * @property {Number}  topBoundary - world topBoundary.
 * @property {Number}  bottomBoundary - world bottomBoundary.
 *
 * @param {cc.Node} followedNode
 * @param {Rect} rect
 * @example
 * // creates the action with a set boundary
 * var followAction = new cc.Follow(node, cc.rect(0, 0, s.width * 2 - 100, s.height));
 * this.runAction(followAction);
 *
 * // creates the action with no boundary set
 * var followAction = new cc.Follow(node);
 * this.runAction(followAction);
 *
 * @class
 * @extends Action
 */


cc.Follow = cc.Class({
  name: 'cc.Follow',
  "extends": cc.Action,

  /*
      * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
   * creates the action with a set boundary. <br/>
   * creates the action with no boundary set.
      * @param {cc.Node} followedNode
      * @param {Rect} rect
   */
  ctor: function ctor(followedNode, rect) {
    // node to follow
    this._followedNode = null; // whether camera should be limited to certain area

    this._boundarySet = false; // if screen size is bigger than the boundary - update not needed

    this._boundaryFullyCovered = false; // fast access to the screen dimensions

    this._halfScreenSize = null;
    this._fullScreenSize = null;
    this.leftBoundary = 0.0;
    this.rightBoundary = 0.0;
    this.topBoundary = 0.0;
    this.bottomBoundary = 0.0;
    this._worldRect = cc.rect(0, 0, 0, 0);
    if (followedNode) rect ? this.initWithTarget(followedNode, rect) : this.initWithTarget(followedNode);
  },
  clone: function clone() {
    var action = new cc.Follow();
    var locRect = this._worldRect;
    var rect = new cc.Rect(locRect.x, locRect.y, locRect.width, locRect.height);
    action.initWithTarget(this._followedNode, rect);
    return action;
  },

  /*
   * Get whether camera should be limited to certain area.
   *
   * @return {Boolean}
   */
  isBoundarySet: function isBoundarySet() {
    return this._boundarySet;
  },

  /*
   * alter behavior - turn on/off boundary.
   *
   * @param {Boolean} value
   */
  setBoudarySet: function setBoudarySet(value) {
    this._boundarySet = value;
  },

  /*
   * initializes the action with a set boundary.
   *
   * @param {cc.Node} followedNode
   * @param {Rect} [rect=]
   * @return {Boolean}
   */
  initWithTarget: function initWithTarget(followedNode, rect) {
    if (!followedNode) {
      cc.errorID(1022);
      return false;
    }

    var _this = this;

    rect = rect || cc.rect(0, 0, 0, 0);
    _this._followedNode = followedNode;
    _this._worldRect = rect;
    _this._boundarySet = !(rect.width === 0 && rect.height === 0);
    _this._boundaryFullyCovered = false;
    var winSize = cc.winSize;
    _this._fullScreenSize = cc.v2(winSize.width, winSize.height);
    _this._halfScreenSize = _this._fullScreenSize.mul(0.5);

    if (_this._boundarySet) {
      _this.leftBoundary = -(rect.x + rect.width - _this._fullScreenSize.x);
      _this.rightBoundary = -rect.x;
      _this.topBoundary = -rect.y;
      _this.bottomBoundary = -(rect.y + rect.height - _this._fullScreenSize.y);

      if (_this.rightBoundary < _this.leftBoundary) {
        // screen width is larger than world's boundary width
        //set both in the middle of the world
        _this.rightBoundary = _this.leftBoundary = (_this.leftBoundary + _this.rightBoundary) / 2;
      }

      if (_this.topBoundary < _this.bottomBoundary) {
        // screen width is larger than world's boundary width
        //set both in the middle of the world
        _this.topBoundary = _this.bottomBoundary = (_this.topBoundary + _this.bottomBoundary) / 2;
      }

      if (_this.topBoundary === _this.bottomBoundary && _this.leftBoundary === _this.rightBoundary) _this._boundaryFullyCovered = true;
    }

    return true;
  },
  step: function step(dt) {
    var targetWorldPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);

    var followedWorldPos = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO); // compute the offset between followed and target node


    var delta = targetWorldPos.sub(followedWorldPos);
    var tempPos = this.target.parent.convertToNodeSpaceAR(delta.add(this._halfScreenSize));

    if (this._boundarySet) {
      // whole map fits inside a single screen, no need to modify the position - unless map boundaries are increased
      if (this._boundaryFullyCovered) return;
      this.target.setPosition(misc.clampf(tempPos.x, this.leftBoundary, this.rightBoundary), misc.clampf(tempPos.y, this.bottomBoundary, this.topBoundary));
    } else {
      this.target.setPosition(tempPos.x, tempPos.y);
    }
  },
  isDone: function isDone() {
    return !this._followedNode.activeInHierarchy;
  },
  stop: function stop() {
    this.target = null;
    cc.Action.prototype.stop.call(this);
  }
});
/**
 * !#en Create a follow action which makes its target follows another node.
 * !#zh 追踪目标节点的位置。
 * @method follow
 * @param {Node} followedNode
 * @param {Rect} rect
 * @return {Action|Null} returns the cc.Follow object on success
 * @example
 * // example
 * // creates the action with a set boundary
 * var followAction = cc.follow(targetNode, cc.rect(0, 0, screenWidth * 2 - 100, screenHeight));
 * node.runAction(followAction);
 *
 * // creates the action with no boundary set
 * var followAction = cc.follow(targetNode);
 * node.runAction(followAction);
 */

cc.follow = function (followedNode, rect) {
  return new cc.Follow(followedNode, rect);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJtaXNjIiwiY2MiLCJBY3Rpb24iLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwib3JpZ2luYWxUYXJnZXQiLCJ0YXJnZXQiLCJ0YWciLCJUQUdfSU5WQUxJRCIsImNsb25lIiwiYWN0aW9uIiwiaXNEb25lIiwic3RhcnRXaXRoVGFyZ2V0Iiwic3RvcCIsInN0ZXAiLCJkdCIsImxvZ0lEIiwidXBkYXRlIiwiZ2V0VGFyZ2V0Iiwic2V0VGFyZ2V0IiwiZ2V0T3JpZ2luYWxUYXJnZXQiLCJzZXRPcmlnaW5hbFRhcmdldCIsImdldFRhZyIsInNldFRhZyIsInJldGFpbiIsInJlbGVhc2UiLCJGaW5pdGVUaW1lQWN0aW9uIiwiX2R1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJfdGltZXNGb3JSZXBlYXQiLCJzZXREdXJhdGlvbiIsImR1cmF0aW9uIiwicmV2ZXJzZSIsIlNwZWVkIiwic3BlZWQiLCJfc3BlZWQiLCJfaW5uZXJBY3Rpb24iLCJpbml0V2l0aEFjdGlvbiIsImdldFNwZWVkIiwic2V0U3BlZWQiLCJlcnJvcklEIiwicHJvdG90eXBlIiwiY2FsbCIsInNldElubmVyQWN0aW9uIiwiZ2V0SW5uZXJBY3Rpb24iLCJGb2xsb3ciLCJmb2xsb3dlZE5vZGUiLCJyZWN0IiwiX2ZvbGxvd2VkTm9kZSIsIl9ib3VuZGFyeVNldCIsIl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCIsIl9oYWxmU2NyZWVuU2l6ZSIsIl9mdWxsU2NyZWVuU2l6ZSIsImxlZnRCb3VuZGFyeSIsInJpZ2h0Qm91bmRhcnkiLCJ0b3BCb3VuZGFyeSIsImJvdHRvbUJvdW5kYXJ5IiwiX3dvcmxkUmVjdCIsImluaXRXaXRoVGFyZ2V0IiwibG9jUmVjdCIsIlJlY3QiLCJ4IiwieSIsIndpZHRoIiwiaGVpZ2h0IiwiaXNCb3VuZGFyeVNldCIsInNldEJvdWRhcnlTZXQiLCJ2YWx1ZSIsIl90aGlzIiwid2luU2l6ZSIsInYyIiwibXVsIiwidGFyZ2V0V29ybGRQb3MiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJWZWMyIiwiWkVSTyIsImZvbGxvd2VkV29ybGRQb3MiLCJkZWx0YSIsInN1YiIsInRlbXBQb3MiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsImFkZCIsInNldFBvc2l0aW9uIiwiY2xhbXBmIiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJmb2xsb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLG9CQUFELENBQXBCO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBRSxFQUFFLENBQUNDLE1BQUgsR0FBWUQsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDakJDLEVBQUFBLElBQUksRUFBRSxXQURXO0FBR2pCO0FBRUFDLEVBQUFBLElBQUksRUFBQyxnQkFBWTtBQUNiLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLEdBQUwsR0FBV1AsRUFBRSxDQUFDQyxNQUFILENBQVVPLFdBQXJCO0FBQ0gsR0FUZ0I7O0FBV2pCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsS0FBSyxFQUFDLGlCQUFZO0FBQ2QsUUFBSUMsTUFBTSxHQUFHLElBQUlWLEVBQUUsQ0FBQ0MsTUFBUCxFQUFiO0FBQ0FTLElBQUFBLE1BQU0sQ0FBQ0wsY0FBUCxHQUF3QixJQUF4QjtBQUNBSyxJQUFBQSxNQUFNLENBQUNKLE1BQVAsR0FBZ0Is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LENBQUNxRixNQUFMLENBQVlMLE9BQU8sQ0FBQ2pCLENBQXBCLEVBQXVCLEtBQUtOLGNBQTVCLEVBQTRDLEtBQUtELFdBQWpELENBQXZGO0FBQ0EsS0FORCxNQU1PO0FBQ0gsV0FBS2pELE1BQUwsQ0FBWTZFLFdBQVosQ0FBd0JKLE9BQU8sQ0FBQ2xCLENBQWhDLEVBQW1Da0IsT0FBTyxDQUFDakIsQ0FBM0M7QUFDSDtBQUNKLEdBNUhnQjtBQThIakJuRCxFQUFBQSxNQUFNLEVBQUMsa0JBQVk7QUFDZixXQUFTLENBQUMsS0FBS3FDLGFBQUwsQ0FBbUJxQyxpQkFBN0I7QUFDSCxHQWhJZ0I7QUFrSWpCeEUsRUFBQUEsSUFBSSxFQUFDLGdCQUFZO0FBQ2IsU0FBS1AsTUFBTCxHQUFjLElBQWQ7QUFDQU4sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVV3QyxTQUFWLENBQW9CNUIsSUFBcEIsQ0FBeUI2QixJQUF6QixDQUE4QixJQUE5QjtBQUNIO0FBcklnQixDQUFULENBQVo7QUF3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTFDLEVBQUUsQ0FBQ3NGLE1BQUgsR0FBWSxVQUFVeEMsWUFBVixFQUF3QkMsSUFBeEIsRUFBOEI7QUFDdEMsU0FBTyxJQUFJL0MsRUFBRSxDQUFDNkMsTUFBUCxDQUFjQyxZQUFkLEVBQTRCQyxJQUE1QixDQUFQO0FBQ0gsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxucmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ0NsYXNzJyk7XHJcbmNvbnN0IG1pc2MgPSByZXF1aXJlKCcuLi9jb3JlL3V0aWxzL21pc2MnKTtcclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQmFzZSBjbGFzcyBjYy5BY3Rpb24gZm9yIGFjdGlvbiBjbGFzc2VzLlxyXG4gKiAhI3poIEFjdGlvbiDnsbvmmK/miYDmnInliqjkvZznsbvlnovnmoTln7rnsbvjgIJcclxuICogQGNsYXNzIEFjdGlvblxyXG4gKi9cclxuY2MuQWN0aW9uID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkFjdGlvbicsXHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKlB1YmxpYyBGdW5jdGlvbnMqKioqKioqKioqKlxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRhZyA9IGNjLkFjdGlvbi5UQUdfSU5WQUxJRDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiB0byBjb3B5IG9iamVjdCB3aXRoIGRlZXAgY29weS5cclxuICAgICAqIHJldHVybnMgYSBjbG9uZSBvZiBhY3Rpb24uXHJcbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWFi+mahueahOWKqOS9nOOAglxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHJldHVybiB7QWN0aW9ufVxyXG4gICAgICovXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5BY3Rpb24oKTtcclxuICAgICAgICBhY3Rpb24ub3JpZ2luYWxUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGFjdGlvbi50YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGFjdGlvbi50YWcgPSB0aGlzLnRhZztcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIHJldHVybiB0cnVlIGlmIHRoZSBhY3Rpb24gaGFzIGZpbmlzaGVkLlxyXG4gICAgICogISN6aCDlpoLmnpzliqjkvZzlt7LlrozmiJDlsLHov5Tlm54gdHJ1ZeOAglxyXG4gICAgICogQG1ldGhvZCBpc0RvbmVcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBiZWZvcmUgdGhlIGFjdGlvbiBzdGFydC4gSXQgd2lsbCBhbHNvIHNldCB0aGUgdGFyZ2V0LlxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgYWZ0ZXIgdGhlIGFjdGlvbiBoYXMgZmluaXNoZWQuIEl0IHdpbGwgc2V0IHRoZSAndGFyZ2V0JyB0byBuaWwuXHJcbiAgICBzdG9wOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSB3aXRoIGl0J3MgZGVsdGEgdGltZS4gPGJyIC8+XHJcbiAgICBzdGVwOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGNjLmxvZ0lEKDEwMDYpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDYWxsZWQgb25jZSBwZXIgZnJhbWUuIFRpbWUgaXMgdGhlIG51bWJlciBvZiBzZWNvbmRzIG9mIGEgZnJhbWUgaW50ZXJ2YWwuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgY2MubG9nSUQoMTAwNyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBnZXQgdGhlIHRhcmdldC5cclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN55uu5qCH6IqC54K544CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFRhcmdldFxyXG4gICAgICogQHJldHVybiB7Tm9kZX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGFyZ2V0OmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYWN0aW9uIHdpbGwgbW9kaWZ5IHRoZSB0YXJnZXQgcHJvcGVydGllcy5cclxuICAgICAqICEjemgg6K6+572u55uu5qCH6IqC54K544CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFRhcmdldFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcclxuICAgICAqL1xyXG4gICAgc2V0VGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGdldCB0aGUgb3JpZ2luYWwgdGFyZ2V0LlxyXG4gICAgICogISN6aCDojrflj5bljp/lp4vnm67moIfoioLngrnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0T3JpZ2luYWxUYXJnZXRcclxuICAgICAqIEByZXR1cm4ge05vZGV9XHJcbiAgICAgKi9cclxuICAgIGdldE9yaWdpbmFsVGFyZ2V0OmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5hbFRhcmdldDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gU2V0IHRoZSBvcmlnaW5hbCB0YXJnZXQsIHNpbmNlIHRhcmdldCBjYW4gYmUgbmlsLlxyXG4gICAgLy8gSXMgdGhlIHRhcmdldCB0aGF0IHdlcmUgdXNlZCB0byBydW4gdGhlIGFjdGlvbi5cclxuICAgIC8vIFVubGVzcyB5b3UgYXJlIGRvaW5nIHNvbWV0aGluZyBjb21wbGV4LCBsaWtlIGNjLkFjdGlvbk1hbmFnZXIsIHlvdSBzaG91bGQgTk9UIGNhbGwgdGhpcyBtZXRob2QuXHJcbiAgICBzZXRPcmlnaW5hbFRhcmdldDpmdW5jdGlvbiAob3JpZ2luYWxUYXJnZXQpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gb3JpZ2luYWxUYXJnZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBnZXQgdGFnIG51bWJlci5cclxuICAgICAqICEjemgg6I635Y+W55So5LqO6K+G5Yir5Yqo5L2c55qE5qCH562+44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFRhZ1xyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRUYWc6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHNldCB0YWcgbnVtYmVyLlxyXG4gICAgICogISN6aCDorr7nva7moIfnrb7vvIznlKjkuo7or4bliKvliqjkvZzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGFnXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXHJcbiAgICAgKi9cclxuICAgIHNldFRhZzpmdW5jdGlvbiAodGFnKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSB0YWc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEN1cnJlbnRseSBKYXZhU2NyaXB0IEJpbmRpZ25zIChKU0IpLCBpbiBzb21lIGNhc2VzLCBuZWVkcyB0byB1c2UgcmV0YWluIGFuZCByZWxlYXNlLiBUaGlzIGlzIGEgYnVnIGluIEpTQixcclxuICAgIC8vIGFuZCB0aGUgdWdseSB3b3JrYXJvdW5kIGlzIHRvIHVzZSByZXRhaW4vcmVsZWFzZS4gU28sIHRoZXNlIDIgbWV0aG9kcyB3ZXJlIGFkZGVkIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBKU0IuXHJcbiAgICAvLyBUaGlzIGlzIGEgaGFjaywgYW5kIHNob3VsZCBiZSByZW1vdmVkIG9uY2UgSlNCIGZpeGVzIHRoZSByZXRhaW4vcmVsZWFzZSBidWcuXHJcbiAgICByZXRhaW46ZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBDdXJyZW50bHkgSmF2YVNjcmlwdCBCaW5kaWducyAoSlNCKSwgaW4gc29tZSBjYXNlcywgbmVlZHMgdG8gdXNlIHJldGFpbiBhbmQgcmVsZWFzZS4gVGhpcyBpcyBhIGJ1ZyBpbiBKU0IsXHJcbiAgICAvLyBhbmQgdGhlIHVnbHkgd29ya2Fyb3VuZCBpcyB0byB1c2UgcmV0YWluL3JlbGVhc2UuIFNvLCB0aGVzZSAyIG1ldGhvZHMgd2VyZSBhZGRlZCB0byBiZSBjb21wYXRpYmxlIHdpdGggSlNCLlxyXG4gICAgLy8gVGhpcyBpcyBhIGhhY2ssIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIEpTQiBmaXhlcyB0aGUgcmV0YWluL3JlbGVhc2UgYnVnLlxyXG4gICAgcmVsZWFzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRGVmYXVsdCBBY3Rpb24gdGFnLlxyXG4gKiAhI3poIOm7mOiupOWKqOS9nOagh+etvuOAglxyXG4gKiBAcHJvcGVydHkgVEFHX0lOVkFMSURcclxuICogQGNvbnN0YW50XHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUge051bWJlcn1cclxuICogQGRlZmF1bHQgLTFcclxuICovXHJcbmNjLkFjdGlvbi5UQUdfSU5WQUxJRCA9IC0xO1xyXG5cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEJhc2UgY2xhc3MgYWN0aW9ucyB0aGF0IGRvIGhhdmUgYSBmaW5pdGUgdGltZSBkdXJhdGlvbi4gPGJyLz5cclxuICogUG9zc2libGUgYWN0aW9uczogPGJyLz5cclxuICogLSBBbiBhY3Rpb24gd2l0aCBhIGR1cmF0aW9uIG9mIDAgc2Vjb25kcy4gPGJyLz5cclxuICogLSBBbiBhY3Rpb24gd2l0aCBhIGR1cmF0aW9uIG9mIDM1LjUgc2Vjb25kcy5cclxuICpcclxuICogSW5maW5pdGUgdGltZSBhY3Rpb25zIGFyZSB2YWxpZFxyXG4gKiAhI3poIOaciemZkOaXtumXtOWKqOS9nO+8jOi/meenjeWKqOS9nOaLpeacieaXtumVvyBkdXJhdGlvbiDlsZ7mgKfjgIJcclxuICogQGNsYXNzIEZpbml0ZVRpbWVBY3Rpb25cclxuICogQGV4dGVuZHMgQWN0aW9uXHJcbiAqL1xyXG5jYy5GaW5pdGVUaW1lQWN0aW9uID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkZpbml0ZVRpbWVBY3Rpb24nLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vISBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gZ2V0IGR1cmF0aW9uIG9mIHRoZSBhY3Rpb24uIChzZWNvbmRzKS5cclxuICAgICAqICEjemgg6I635Y+W5Yqo5L2c5Lul56eS5Li65Y2V5L2N55qE5oyB57ut5pe26Ze044CCXHJcbiAgICAgKiBAbWV0aG9kIGdldER1cmF0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldER1cmF0aW9uOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHVyYXRpb24gKiAodGhpcy5fdGltZXNGb3JSZXBlYXQgfHwgMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBzZXQgZHVyYXRpb24gb2YgdGhlIGFjdGlvbi4gKHNlY29uZHMpLlxyXG4gICAgICogISN6aCDorr7nva7liqjkvZzku6Xnp5LkuLrljZXkvY3nmoTmjIHnu63ml7bpl7TjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzZXREdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJldHVybnMgYSByZXZlcnNlZCBhY3Rpb24uIDxiciAvPlxyXG4gICAgICogRm9yIGV4YW1wbGU6IDxiciAvPlxyXG4gICAgICogLSBUaGUgYWN0aW9uIHdpbGwgYmUgeCBjb29yZGluYXRlcyBvZiAwIG1vdmUgdG8gMTAwLiA8YnIgLz5cclxuICAgICAqIC0gVGhlIHJldmVyc2VkIGFjdGlvbiB3aWxsIGJlIHggb2YgMTAwIG1vdmUgdG8gMC5cclxuICAgICAqIC0gV2lsbCBiZSByZXdyaXR0ZW5cclxuICAgICAqICEjemgg6L+U5Zue5LiA5Liq5paw55qE5Yqo5L2c77yM5omn6KGM5LiO5Y6f5Yqo5L2c5a6M5YWo55u45Y+N55qE5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJldmVyc2VcclxuICAgICAqIEByZXR1cm4ge051bGx9XHJcbiAgICAgKi9cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmxvZ0lEKDEwMDgpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIHRvIGNvcHkgb2JqZWN0IHdpdGggZGVlcCBjb3B5LlxyXG4gICAgICogcmV0dXJucyBhIGNsb25lIG9mIGFjdGlvbi5cclxuICAgICAqICEjemgg6L+U5Zue5LiA5Liq5YWL6ZqG55qE5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAcmV0dXJuIHtGaW5pdGVUaW1lQWN0aW9ufVxyXG4gICAgICovXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5GaW5pdGVUaW1lQWN0aW9uKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKlxyXG4gKiBDaGFuZ2VzIHRoZSBzcGVlZCBvZiBhbiBhY3Rpb24sIG1ha2luZyBpdCB0YWtlIGxvbmdlciAoc3BlZWQgPiAxKVxyXG4gKiBvciBsZXNzIChzcGVlZCA8IDEpIHRpbWUuIDxici8+XHJcbiAqIFVzZWZ1bCB0byBzaW11bGF0ZSAnc2xvdyBtb3Rpb24nIG9yICdmYXN0IGZvcndhcmQnIGVmZmVjdC5cclxuICpcclxuICogQHdhcm5pbmcgVGhpcyBhY3Rpb24gY2FuJ3QgYmUgU2VxdWVuY2VhYmxlIGJlY2F1c2UgaXQgaXMgbm90IGFuIGNjLkludGVydmFsQWN0aW9uXHJcbiAqIEBjbGFzcyBTcGVlZFxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtBY3Rpb25JbnRlcnZhbH0gYWN0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZFxyXG4gKi9cclxuY2MuU3BlZWQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU3BlZWQnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGFjdGlvbiwgc3BlZWQpIHtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdGFjdGlvbiAmJiB0aGlzLmluaXRXaXRoQWN0aW9uKGFjdGlvbiwgc3BlZWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBydW5uaW5nIHNwZWVkLiA8YnIgLz5cclxuICAgICAqIFdpbGwgZ2V0IGEgcGVyY2VudGFnZSBudW1iZXIsIGNvbXBhcmVkIHRvIHRoZSBvcmlnaW5hbCBzcGVlZC5cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldFNwZWVkXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFNwZWVkOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBhbHRlciB0aGUgc3BlZWQgb2YgdGhlIGlubmVyIGZ1bmN0aW9uIGluIHJ1bnRpbWUuXHJcbiAgICAgKiBAbWV0aG9kIHNldFNwZWVkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3BlZWRcclxuICAgICAqL1xyXG4gICAgc2V0U3BlZWQ6ZnVuY3Rpb24gKHNwZWVkKSB7XHJcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAbWV0aG9kIGluaXRXaXRoQWN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhBY3Rpb246ZnVuY3Rpb24gKGFjdGlvbiwgc3BlZWQpIHtcclxuICAgICAgICBpZiAoIWFjdGlvbikge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDEwMjEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5TcGVlZCgpO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEFjdGlvbih0aGlzLl9pbm5lckFjdGlvbi5jbG9uZSgpLCB0aGlzLl9zcGVlZCk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0b3AoKTtcclxuICAgICAgICBjYy5BY3Rpb24ucHJvdG90eXBlLnN0b3AuY2FsbCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RlcDpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5zdGVwKGR0ICogdGhpcy5fc3BlZWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckFjdGlvbi5pc0RvbmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5TcGVlZCh0aGlzLl9pbm5lckFjdGlvbi5yZXZlcnNlKCksIHRoaXMuX3NwZWVkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIFNldCBpbm5lciBBY3Rpb24uXHJcbiAgICAgKiBAbWV0aG9kIHNldElubmVyQWN0aW9uXHJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbkludGVydmFsfSBhY3Rpb25cclxuICAgICAqL1xyXG4gICAgc2V0SW5uZXJBY3Rpb246ZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbm5lckFjdGlvbiAhPT0gYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEdldCBpbm5lciBBY3Rpb24uXHJcbiAgICAgKiBAbWV0aG9kIGdldElubmVyQWN0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtBY3Rpb25JbnRlcnZhbH1cclxuICAgICAqL1xyXG4gICAgZ2V0SW5uZXJBY3Rpb246ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbm5lckFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZXMgdGhlIHNwZWVkIGFjdGlvbiB3aGljaCBjaGFuZ2VzIHRoZSBzcGVlZCBvZiBhbiBhY3Rpb24sIG1ha2luZyBpdCB0YWtlIGxvbmdlciAoc3BlZWQgPiAxKVxyXG4gKiBvciBsZXNzIChzcGVlZCA8IDEpIHRpbWUuIDxici8+XHJcbiAqIFVzZWZ1bCB0byBzaW11bGF0ZSAnc2xvdyBtb3Rpb24nIG9yICdmYXN0IGZvcndhcmQnIGVmZmVjdC5cclxuICogISN6aCDkv67mlLnnm67moIfliqjkvZznmoTpgJ/njofjgIJcclxuICogQHdhcm5pbmcgVGhpcyBhY3Rpb24gY2FuJ3QgYmUgU2VxdWVuY2VhYmxlIGJlY2F1c2UgaXQgaXMgbm90IGFuIGNjLkludGVydmFsQWN0aW9uXHJcbiAqXHJcbiAqIEBtZXRob2Qgc3BlZWRcclxuICogQHBhcmFtIHtBY3Rpb25JbnRlcnZhbH0gYWN0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBzcGVlZFxyXG4gKiBAcmV0dXJuIHtBY3Rpb259XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGNoYW5nZSB0aGUgdGFyZ2V0IGFjdGlvbiBzcGVlZDtcclxuICogdmFyIGFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAwLjYpO1xyXG4gKiB2YXIgbmV3QWN0aW9uID0gY2Muc3BlZWQoYWN0aW9uLCAwLjUpO1xyXG4gKi9cclxuY2Muc3BlZWQgPSBmdW5jdGlvbiAoYWN0aW9uLCBzcGVlZCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5TcGVlZChhY3Rpb24sIHNwZWVkKTtcclxufTtcclxuXHJcbi8qXHJcbiAqIGNjLkZvbGxvdyBpcyBhIGZvbGxvdyBhY3Rpb24gd2hpY2ggbWFrZXMgaXRzIHRhcmdldCBmb2xsb3dzIGFub3RoZXIgbm9kZS5cclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy9leGFtcGxlXHJcbiAqIC8vSW5zdGVhZCBvZiB1c2luZyBjYy5DYW1lcmEgYXMgYSBcImZvbGxvd2VyXCIsIHVzZSB0aGlzIGFjdGlvbiBpbnN0ZWFkLlxyXG4gKiBsYXllci5ydW5BY3Rpb24oY2MuZm9sbG93KGhlcm8pKTtcclxuICpcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICBsZWZ0Qm91bmRhcnkgLSB3b3JsZCBsZWZ0Qm91bmRhcnkuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgcmlnaHRCb3VuZGFyeSAtIHdvcmxkIHJpZ2h0Qm91bmRhcnkuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgdG9wQm91bmRhcnkgLSB3b3JsZCB0b3BCb3VuZGFyeS5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICBib3R0b21Cb3VuZGFyeSAtIHdvcmxkIGJvdHRvbUJvdW5kYXJ5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge2NjLk5vZGV9IGZvbGxvd2VkTm9kZVxyXG4gKiBAcGFyYW0ge1JlY3R9IHJlY3RcclxuICogQGV4YW1wbGVcclxuICogLy8gY3JlYXRlcyB0aGUgYWN0aW9uIHdpdGggYSBzZXQgYm91bmRhcnlcclxuICogdmFyIGZvbGxvd0FjdGlvbiA9IG5ldyBjYy5Gb2xsb3cobm9kZSwgY2MucmVjdCgwLCAwLCBzLndpZHRoICogMiAtIDEwMCwgcy5oZWlnaHQpKTtcclxuICogdGhpcy5ydW5BY3Rpb24oZm9sbG93QWN0aW9uKTtcclxuICpcclxuICogLy8gY3JlYXRlcyB0aGUgYWN0aW9uIHdpdGggbm8gYm91bmRhcnkgc2V0XHJcbiAqIHZhciBmb2xsb3dBY3Rpb24gPSBuZXcgY2MuRm9sbG93KG5vZGUpO1xyXG4gKiB0aGlzLnJ1bkFjdGlvbihmb2xsb3dBY3Rpb24pO1xyXG4gKlxyXG4gKiBAY2xhc3NcclxuICogQGV4dGVuZHMgQWN0aW9uXHJcbiAqL1xyXG5jYy5Gb2xsb3cgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuRm9sbG93JyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbixcclxuXHJcblx0LypcclxuICAgICAqIENvbnN0cnVjdG9yIGZ1bmN0aW9uLCBvdmVycmlkZSBpdCB0byBleHRlbmQgdGhlIGNvbnN0cnVjdGlvbiBiZWhhdmlvciwgcmVtZW1iZXIgdG8gY2FsbCBcInRoaXMuX3N1cGVyKClcIiBpbiB0aGUgZXh0ZW5kZWQgXCJjdG9yXCIgZnVuY3Rpb24uIDxiciAvPlxyXG5cdCAqIGNyZWF0ZXMgdGhlIGFjdGlvbiB3aXRoIGEgc2V0IGJvdW5kYXJ5LiA8YnIvPlxyXG5cdCAqIGNyZWF0ZXMgdGhlIGFjdGlvbiB3aXRoIG5vIGJvdW5kYXJ5IHNldC5cclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gZm9sbG93ZWROb2RlXHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RcclxuXHQgKi9cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGZvbGxvd2VkTm9kZSwgcmVjdCkge1xyXG4gICAgICAgIC8vIG5vZGUgdG8gZm9sbG93XHJcbiAgICAgICAgdGhpcy5fZm9sbG93ZWROb2RlID0gbnVsbDtcclxuICAgICAgICAvLyB3aGV0aGVyIGNhbWVyYSBzaG91bGQgYmUgbGltaXRlZCB0byBjZXJ0YWluIGFyZWFcclxuICAgICAgICB0aGlzLl9ib3VuZGFyeVNldCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGlmIHNjcmVlbiBzaXplIGlzIGJpZ2dlciB0aGFuIHRoZSBib3VuZGFyeSAtIHVwZGF0ZSBub3QgbmVlZGVkXHJcbiAgICAgICAgdGhpcy5fYm91bmRhcnlGdWxseUNvdmVyZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyBmYXN0IGFjY2VzcyB0byB0aGUgc2NyZWVuIGRpbWVuc2lvbnNcclxuICAgICAgICB0aGlzLl9oYWxmU2NyZWVuU2l6ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fZnVsbFNjcmVlblNpemUgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLmxlZnRCb3VuZGFyeSA9IDAuMDtcclxuICAgICAgICB0aGlzLnJpZ2h0Qm91bmRhcnkgPSAwLjA7XHJcbiAgICAgICAgdGhpcy50b3BCb3VuZGFyeSA9IDAuMDtcclxuICAgICAgICB0aGlzLmJvdHRvbUJvdW5kYXJ5ID0gMC4wO1xyXG4gICAgICAgIHRoaXMuX3dvcmxkUmVjdCA9IGNjLnJlY3QoMCwgMCwgMCwgMCk7XHJcblxyXG5cdFx0aWYoZm9sbG93ZWROb2RlKVxyXG5cdFx0XHRyZWN0ID8gdGhpcy5pbml0V2l0aFRhcmdldChmb2xsb3dlZE5vZGUsIHJlY3QpXHJcblx0XHRcdFx0IDogdGhpcy5pbml0V2l0aFRhcmdldChmb2xsb3dlZE5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5Gb2xsb3coKTtcclxuICAgICAgICB2YXIgbG9jUmVjdCA9IHRoaXMuX3dvcmxkUmVjdDtcclxuICAgICAgICB2YXIgcmVjdCA9IG5ldyBjYy5SZWN0KGxvY1JlY3QueCwgbG9jUmVjdC55LCBsb2NSZWN0LndpZHRoLCBsb2NSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoVGFyZ2V0KHRoaXMuX2ZvbGxvd2VkTm9kZSwgcmVjdCk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEdldCB3aGV0aGVyIGNhbWVyYSBzaG91bGQgYmUgbGltaXRlZCB0byBjZXJ0YWluIGFyZWEuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNCb3VuZGFyeVNldDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvdW5kYXJ5U2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogYWx0ZXIgYmVoYXZpb3IgLSB0dXJuIG9uL29mZiBib3VuZGFyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldEJvdWRhcnlTZXQ6ZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fYm91bmRhcnlTZXQgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBhY3Rpb24gd2l0aCBhIHNldCBib3VuZGFyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGZvbGxvd2VkTm9kZVxyXG4gICAgICogQHBhcmFtIHtSZWN0fSBbcmVjdD1dXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aFRhcmdldDpmdW5jdGlvbiAoZm9sbG93ZWROb2RlLCByZWN0KSB7XHJcbiAgICAgICAgaWYgKCFmb2xsb3dlZE5vZGUpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDIyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICByZWN0ID0gcmVjdCB8fCBjYy5yZWN0KDAsIDAsIDAsIDApO1xyXG4gICAgICAgIF90aGlzLl9mb2xsb3dlZE5vZGUgPSBmb2xsb3dlZE5vZGU7XHJcbiAgICAgICAgX3RoaXMuX3dvcmxkUmVjdCA9IHJlY3Q7XHJcblxyXG4gICAgICAgIF90aGlzLl9ib3VuZGFyeVNldCA9ICEocmVjdC53aWR0aCA9PT0gMCAmJiByZWN0LmhlaWdodCA9PT0gMCk7XHJcblxyXG4gICAgICAgIF90aGlzLl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgd2luU2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgX3RoaXMuX2Z1bGxTY3JlZW5TaXplID0gY2MudjIod2luU2l6ZS53aWR0aCwgd2luU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIF90aGlzLl9oYWxmU2NyZWVuU2l6ZSA9IF90aGlzLl9mdWxsU2NyZWVuU2l6ZS5tdWwoMC41KTtcclxuXHJcbiAgICAgICAgaWYgKF90aGlzLl9ib3VuZGFyeVNldCkge1xyXG4gICAgICAgICAgICBfdGhpcy5sZWZ0Qm91bmRhcnkgPSAtKChyZWN0LnggKyByZWN0LndpZHRoKSAtIF90aGlzLl9mdWxsU2NyZWVuU2l6ZS54KTtcclxuICAgICAgICAgICAgX3RoaXMucmlnaHRCb3VuZGFyeSA9IC1yZWN0Lng7XHJcbiAgICAgICAgICAgIF90aGlzLnRvcEJvdW5kYXJ5ID0gLXJlY3QueTtcclxuICAgICAgICAgICAgX3RoaXMuYm90dG9tQm91bmRhcnkgPSAtKChyZWN0LnkgKyByZWN0LmhlaWdodCkgLSBfdGhpcy5fZnVsbFNjcmVlblNpemUueSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoX3RoaXMucmlnaHRCb3VuZGFyeSA8IF90aGlzLmxlZnRCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2NyZWVuIHdpZHRoIGlzIGxhcmdlciB0aGFuIHdvcmxkJ3MgYm91bmRhcnkgd2lkdGhcclxuICAgICAgICAgICAgICAgIC8vc2V0IGJvdGggaW4gdGhlIG1pZGRsZSBvZiB0aGUgd29ybGRcclxuICAgICAgICAgICAgICAgIF90aGlzLnJpZ2h0Qm91bmRhcnkgPSBfdGhpcy5sZWZ0Qm91bmRhcnkgPSAoX3RoaXMubGVmdEJvdW5kYXJ5ICsgX3RoaXMucmlnaHRCb3VuZGFyeSkgLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy50b3BCb3VuZGFyeSA8IF90aGlzLmJvdHRvbUJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzY3JlZW4gd2lkdGggaXMgbGFyZ2VyIHRoYW4gd29ybGQncyBib3VuZGFyeSB3aWR0aFxyXG4gICAgICAgICAgICAgICAgLy9zZXQgYm90aCBpbiB0aGUgbWlkZGxlIG9mIHRoZSB3b3JsZFxyXG4gICAgICAgICAgICAgICAgX3RoaXMudG9wQm91bmRhcnkgPSBfdGhpcy5ib3R0b21Cb3VuZGFyeSA9IChfdGhpcy50b3BCb3VuZGFyeSArIF90aGlzLmJvdHRvbUJvdW5kYXJ5KSAvIDI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgoX3RoaXMudG9wQm91bmRhcnkgPT09IF90aGlzLmJvdHRvbUJvdW5kYXJ5KSAmJiAoX3RoaXMubGVmdEJvdW5kYXJ5ID09PSBfdGhpcy5yaWdodEJvdW5kYXJ5KSlcclxuICAgICAgICAgICAgICAgIF90aGlzLl9ib3VuZGFyeUZ1bGx5Q292ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGVwOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHZhciB0YXJnZXRXb3JsZFBvcyA9IHRoaXMudGFyZ2V0LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIHZhciBmb2xsb3dlZFdvcmxkUG9zID0gdGhpcy5fZm9sbG93ZWROb2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pO1xyXG4gICAgICAgIC8vIGNvbXB1dGUgdGhlIG9mZnNldCBiZXR3ZWVuIGZvbGxvd2VkIGFuZCB0YXJnZXQgbm9kZVxyXG4gICAgICAgIHZhciBkZWx0YSA9IHRhcmdldFdvcmxkUG9zLnN1Yihmb2xsb3dlZFdvcmxkUG9zKTtcclxuICAgICAgICB2YXIgdGVtcFBvcyA9IHRoaXMudGFyZ2V0LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihkZWx0YS5hZGQodGhpcy5faGFsZlNjcmVlblNpemUpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2JvdW5kYXJ5U2V0KSB7XHJcbiAgICAgICAgICAgIC8vIHdob2xlIG1hcCBmaXRzIGluc2lkZSBhIHNpbmdsZSBzY3JlZW4sIG5vIG5lZWQgdG8gbW9kaWZ5IHRoZSBwb3NpdGlvbiAtIHVubGVzcyBtYXAgYm91bmRhcmllcyBhcmUgaW5jcmVhc2VkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9ib3VuZGFyeUZ1bGx5Q292ZXJlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcblx0ICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbihtaXNjLmNsYW1wZih0ZW1wUG9zLngsIHRoaXMubGVmdEJvdW5kYXJ5LCB0aGlzLnJpZ2h0Qm91bmRhcnkpLCBtaXNjLmNsYW1wZih0ZW1wUG9zLnksIHRoaXMuYm90dG9tQm91bmRhcnksIHRoaXMudG9wQm91bmRhcnkpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih0ZW1wUG9zLngsIHRlbXBQb3MueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpc0RvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAoICF0aGlzLl9mb2xsb3dlZE5vZGUuYWN0aXZlSW5IaWVyYXJjaHkgKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIGNjLkFjdGlvbi5wcm90b3R5cGUuc3RvcC5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZSBhIGZvbGxvdyBhY3Rpb24gd2hpY2ggbWFrZXMgaXRzIHRhcmdldCBmb2xsb3dzIGFub3RoZXIgbm9kZS5cclxuICogISN6aCDov73ouKrnm67moIfoioLngrnnmoTkvY3nva7jgIJcclxuICogQG1ldGhvZCBmb2xsb3dcclxuICogQHBhcmFtIHtOb2RlfSBmb2xsb3dlZE5vZGVcclxuICogQHBhcmFtIHtSZWN0fSByZWN0XHJcbiAqIEByZXR1cm4ge0FjdGlvbnxOdWxsfSByZXR1cm5zIHRoZSBjYy5Gb2xsb3cgb2JqZWN0IG9uIHN1Y2Nlc3NcclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiAvLyBjcmVhdGVzIHRoZSBhY3Rpb24gd2l0aCBhIHNldCBib3VuZGFyeVxyXG4gKiB2YXIgZm9sbG93QWN0aW9uID0gY2MuZm9sbG93KHRhcmdldE5vZGUsIGNjLnJlY3QoMCwgMCwgc2NyZWVuV2lkdGggKiAyIC0gMTAwLCBzY3JlZW5IZWlnaHQpKTtcclxuICogbm9kZS5ydW5BY3Rpb24oZm9sbG93QWN0aW9uKTtcclxuICpcclxuICogLy8gY3JlYXRlcyB0aGUgYWN0aW9uIHdpdGggbm8gYm91bmRhcnkgc2V0XHJcbiAqIHZhciBmb2xsb3dBY3Rpb24gPSBjYy5mb2xsb3codGFyZ2V0Tm9kZSk7XHJcbiAqIG5vZGUucnVuQWN0aW9uKGZvbGxvd0FjdGlvbik7XHJcbiAqL1xyXG5jYy5mb2xsb3cgPSBmdW5jdGlvbiAoZm9sbG93ZWROb2RlLCByZWN0KSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLkZvbGxvdyhmb2xsb3dlZE5vZGUsIHJlY3QpO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==