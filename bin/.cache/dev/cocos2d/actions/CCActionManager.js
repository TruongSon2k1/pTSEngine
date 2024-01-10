
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionManager.js';
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

var js = require('../core/platform/js');
/*
 * @class HashElement
 * @constructor
 * @private
 */


var HashElement = function HashElement() {
  this.actions = [];
  this.target = null; //ccobject

  this.actionIndex = 0;
  this.currentAction = null; //CCAction

  this.paused = false;
  this.lock = false;
};
/**
 * !#en
 * cc.ActionManager is a class that can manage actions.<br/>
 * Normally you won't need to use this class directly. 99% of the cases you will use the CCNode interface,
 * which uses this class's singleton object.
 * But there are some cases where you might need to use this class. <br/>
 * Examples:<br/>
 * - When you want to run an action where the target is different from a CCNode.<br/>
 * - When you want to pause / resume the actions<br/>
 * !#zh
 * cc.ActionManager 是可以管理动作的单例类。<br/>
 * 通常你并不需要直接使用这个类，99%的情况您将使用 CCNode 的接口。<br/>
 * 但也有一些情况下，您可能需要使用这个类。 <br/>
 * 例如：
 *  - 当你想要运行一个动作，但目标不是 CCNode 类型时。 <br/>
 *  - 当你想要暂停/恢复动作时。 <br/>
 * @class ActionManager
 * @example {@link cocos2d/core/CCActionManager/ActionManager.js}
 */


cc.ActionManager = function () {
  this._hashTargets = js.createMap(true);
  this._arrayTargets = [];
  this._currentTarget = null;
  cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
};

cc.ActionManager.prototype = {
  constructor: cc.ActionManager,
  _elementPool: [],
  _searchElementByTarget: function _searchElementByTarget(arr, target) {
    for (var k = 0; k < arr.length; k++) {
      if (target === arr[k].target) return arr[k];
    }

    return null;
  },
  _getElement: function _getElement(target, paused) {
    var element = this._elementPool.pop();

    if (!element) {
      element = new HashElement();
    }

    element.target = target;
    element.paused = !!paused;
    return element;
  },
  _putElement: function _putElement(element) {
    element.actions.length = 0;
    element.actionIndex = 0;
    element.currentAction = null;
    element.paused = false;
    element.target = null;
    element.lock = false;

    this._elementPool.push(element);
  },

  /**
   * !#en
   * Adds an action with a target.<br/>
   * If the target is already present, then the action will be added to the existing target.
   * If the target is not present, a new instance of this target will be created either paused or not, and the action will be added to the newly created target.
   * When the target is paused, the queued actions won't be 'ticked'.
   * !#zh
   * 增加一个动作，同时还需要提供动作的目标对象，目标对象是否暂停作为参数。<br/>
   * 如果目标已存在，动作将会被直接添加到现有的节点中。<br/>
   * 如果目标不存在，将为这一目标创建一个新的实例，并将动作添加进去。<br/>
   * 当目标状态的 paused 为 true，动作将不会被执行
   *
   * @method addAction
   * @param {Action} action
   * @param {Node} target
   * @param {Boolean} paused
   */
  addAction: function addAction(action, target, paused) {
    if (!action || !target) {
      cc.errorID(1000);
      return;
    } //check if the action target already exists


    var element = this._hashTargets[target._id]; //if doesn't exists, create a hashelement and push in mpTargets

    if (!element) {
      element = this._getElement(target, paused);
      this._hashTargets[target._id] = element;

      this._arrayTargets.push(element);
    } else if (!element.actions) {
      element.actions = [];
    }

    element.actions.push(action);
    action.startWithTarget(target);
  },

  /**
   * !#en Removes all actions from all the targets.
   * !#zh 移除所有对象的所有动作。
   * @method removeAllActions
   */
  removeAllActions: function removeAllActions() {
    var locTargets = this._arrayTargets;

    for (var i = 0; i < locTargets.length; i++) {
      var element = locTargets[i];
      if (element) this._putElement(element);
    }

    this._arrayTargets.length = 0;
    this._hashTargets = js.createMap(true);
  },

  /**
   * !#en
   * Removes all actions from a certain target. <br/>
   * All the actions that belongs to the target will be removed.
   * !#zh
   * 移除指定对象上的所有动作。<br/>
   * 属于该目标的所有的动作将被删除。
   * @method removeAllActionsFromTarget
   * @param {Node} target
   * @param {Boolean} forceDelete
   */
  removeAllActionsFromTarget: function removeAllActionsFromTarget(target, forceDelete) {
    // explicit null handling
    if (target == null) return;
    var element = this._hashTargets[target._id];

    if (element) {
      element.actions.length = 0;

      this._deleteHashElement(element);
    }
  },

  /**
   * !#en Removes an action given an action reference.
   * !#zh 移除指定的动作。
   * @method removeAction 
   * @param {Action} action
   */
  removeAction: function removeAction(action) {
    // explicit null handling
    if (!action) {
      return;
    }

    var target = action.getOriginalTarget();
    var element = this._hashTargets[target._id];

    if (!element) {
      return;
    }

    for (var i = 0; i < element.actions.length; i++) {
      if (element.actions[i] === action) {
        element.actions.splice(i, 1); // update actionIndex in case we are in tick. looping over the actions

        if (element.actionIndex >= i) element.actionIndex--;
        break;
      }
    }
  },
  _removeActionByTag: function _removeActionByTag(tag, element, target) {
    for (var i = 0, l = element.actions.length; i < l; ++i) {
      var action = element.actions[i];

      if (action && action.getTag() === tag) {
        if (target && action.getOriginalTarget() !== target) {
          continue;
        }

        this._removeActionAtIndex(i, element);

        break;
      }
    }
  },

  /**
   * !#en Removes an action given its tag and the target.
   * !#zh 删除指定对象下特定标签的一个动作，将删除首个匹配到的动作。
   * @method removeActionByTag
   * @param {Number} tag
   * @param {Node} [target]
   */
  removeActionByTag: function removeActionByTag(tag, target) {
    if (tag === cc.Action.TAG_INVALID) cc.logID(1002);
    var hashTargets = this._hashTargets;

    if (target) {
      var element = hashTargets[target._id];

      if (element) {
        this._removeActionByTag(tag, element, target);
      }
    } else {
      for (var name in hashTargets) {
        var _element = hashTargets[name];

        this._removeActionByTag(tag, _element);
      }
    }
  },

  /**
   * !#en Gets an action given its tag an a target.
   * !#zh 通过目标对象和标签获取一个动作。
   * @method getActionByTag
   * @param {Number} tag
   * @param {Node} target
   * @return {Action|Null}  return the Action with the given tag on success
   */
  getActionByTag: function getActionByTag(tag, target) {
    if (tag === cc.Action.TAG_INVALID) cc.logID(1004);
    var element = this._hashTargets[target._id];

    if (element) {
      if (element.actions != null) {
        for (var i = 0; i < element.actions.length; ++i) {
          var action = element.actions[i];
          if (action && action.getTag() === tag) return action;
        }
      }

      cc.logID(1005, tag);
    }

    return null;
  },

  /**
   * !#en
   * Returns the numbers of actions that are running in a certain target. <br/>
   * Composable actions are counted as 1 action. <br/>
   * Example: <br/>
   * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
   * - If you are running 7 Sequences of 2 actions, it will return 7.
   * !#zh
   * 返回指定对象下所有正在运行的动作数量。 <br/>
   * 组合动作被算作一个动作。<br/>
   * 例如：<br/>
   *  - 如果您正在运行 7 个动作组成的序列动作（Sequence），这个函数将返回 1。<br/>
   *  - 如果你正在运行 2 个序列动作（Sequence）和 5 个普通动作，这个函数将返回 7。<br/>
   *
   * @method getNumberOfRunningActionsInTarget
   * @param {Node} target
   * @return {Number}
   */
  getNumberOfRunningActionsInTarget: function getNumberOfRunningActionsInTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) return element.actions ? element.actions.length : 0;
    return 0;
  },

  /**
   * !#en Pauses the target: all running actions and newly added actions will be paused.
   * !#zh 暂停指定对象：所有正在运行的动作和新添加的动作都将会暂停。
   * @method pauseTarget
   * @param {Node} target
   */
  pauseTarget: function pauseTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) element.paused = true;
  },

  /**
   * !#en Resumes the target. All queued actions will be resumed.
   * !#zh 让指定目标恢复运行。在执行序列中所有被暂停的动作将重新恢复运行。
   * @method resumeTarget
   * @param {Node} target
   */
  resumeTarget: function resumeTarget(target) {
    var element = this._hashTargets[target._id];
    if (element) element.paused = false;
  },

  /**
   * !#en Pauses all running actions, returning a list of targets whose actions were paused.
   * !#zh 暂停所有正在运行的动作，返回一个包含了那些动作被暂停了的目标对象的列表。
   * @method pauseAllRunningActions
   * @return {Array}  a list of targets whose actions were paused.
   */
  pauseAllRunningActions: function pauseAllRunningActions() {
    var idsWithActions = [];
    var locTargets = this._arrayTargets;

    for (var i = 0; i < locTargets.length; i++) {
      var element = locTargets[i];

      if (element && !element.paused) {
        element.paused = true;
        idsWithActions.push(element.target);
      }
    }

    return idsWithActions;
  },

  /**
   * !#en Resume a set of targets (convenience function to reverse a pauseAllRunningActions or pauseTargets call).
   * !#zh 让一组指定对象恢复运行（用来逆转 pauseAllRunningActions 效果的便捷函数）。
   * @method resumeTargets
   * @param {Array} targetsToResume
   */
  resumeTargets: function resumeTargets(targetsToResume) {
    if (!targetsToResume) return;

    for (var i = 0; i < targetsToResume.length; i++) {
      if (targetsToResume[i]) this.resumeTarget(targetsToResume[i]);
    }
  },

  /**
   * !#en Pause a set of targets.
   * !#zh 暂停一组指定对象。
   * @method pauseTargets
   * @param {Array} targetsToPause
   */
  pauseTargets: function pauseTargets(targetsToPause) {
    if (!targetsToPause) return;

    for (var i = 0; i < targetsToPause.length; i++) {
      if (targetsToPause[i]) this.pauseTarget(targetsToPause[i]);
    }
  },

  /**
   * !#en
   * purges the shared action manager. It releases the retained instance. <br/>
   * because it uses this, so it can not be static.
   * !#zh
   * 清除共用的动作管理器。它释放了持有的实例。 <br/>
   * 因为它使用 this，因此它不能是静态的。
   * @method purgeSharedManager
   */
  purgeSharedManager: function purgeSharedManager() {
    cc.director.getScheduler().unscheduleUpdate(this);
  },
  //protected
  _removeActionAtIndex: function _removeActionAtIndex(index, element) {
    var action = element.actions[index];
    element.actions.splice(index, 1); // update actionIndex in case we are in tick. looping over the actions

    if (element.actionIndex >= index) element.actionIndex--;

    if (element.actions.length === 0) {
      this._deleteHashElement(element);
    }
  },
  _deleteHashElement: function _deleteHashElement(element) {
    var ret = false;

    if (element && !element.lock) {
      if (this._hashTargets[element.target._id]) {
        delete this._hashTargets[element.target._id];
        var targets = this._arrayTargets;

        for (var i = 0, l = targets.length; i < l; i++) {
          if (targets[i] === element) {
            targets.splice(i, 1);
            break;
          }
        }

        this._putElement(element);

        ret = true;
      }
    }

    return ret;
  },

  /**
   * !#en The ActionManager update。
   * !#zh ActionManager 主循环。
   * @method update
   * @param {Number} dt delta time in seconds
   */
  update: function update(dt) {
    var locTargets = this._arrayTargets,
        locCurrTarget;

    for (var elt = 0; elt < locTargets.length; elt++) {
      this._currentTarget = locTargets[elt];
      locCurrTarget = this._currentTarget;

      if (!locCurrTarget.paused && locCurrTarget.actions) {
        locCurrTarget.lock = true; // The 'actions' CCMutableArray may change while inside this loop.

        for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
          locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
          if (!locCurrTarget.currentAction) continue; //use for speed

          locCurrTarget.currentAction.step(dt * (locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1));

          if (locCurrTarget.currentAction && locCurrTarget.currentAction.isDone()) {
            locCurrTarget.currentAction.stop();
            var action = locCurrTarget.currentAction; // Make currentAction nil to prevent removeAction from salvaging it.

            locCurrTarget.currentAction = null;
            this.removeAction(action);
          }

          locCurrTarget.currentAction = null;
        }

        locCurrTarget.lock = false;
      } // only delete currentTarget if no actions were scheduled during the cycle (issue #481)


      if (locCurrTarget.actions.length === 0) {
        this._deleteHashElement(locCurrTarget) && elt--;
      }
    }
  }
};

if (CC_TEST) {
  cc.ActionManager.prototype.isTargetPaused_TEST = function (target) {
    var element = this._hashTargets[target._id];
    return element.paused;
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwianMiLCJIYXNoRWxlbWVudCIsImFjdGlvbnMiLCJ0YXJnZXQiLCJhY3Rpb25JbmRleCIsImN1cnJlbnRBY3Rpb24iLCJwYXVzZWQiLCJsb2NrIiwiY2MiLCJBY3Rpb25NYW5hZ2VyIiwiX2hhc2hUYXJnZXRzIiwiY3JlYXRlTWFwIiwiX2FycmF5VGFyZ2V0cyIsIl9jdXJyZW50VGFyZ2V0IiwiZGlyZWN0b3IiLCJfc2NoZWR1bGVyIiwiZW5hYmxlRm9yVGFyZ2V0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJfZWxlbWVudFBvb2wiLCJfc2VhcmNoRWxlbWVudEJ5VGFyZ2V0IiwiYXJyIiwiayIsImxlbmd0aCIsIl9nZXRFbGVtZW50IiwiZWxlbWVudCIsInBvcCIsIl9wdXRFbGVtZW50IiwicHVzaCIsImFkZEFjdGlvbiIsImFjdGlvbiIsImVycm9ySUQiLCJfaWQiLCJzdGFydFdpdGhUYXJnZXQiLCJyZW1vdmVBbGxBY3Rpb25zIiwibG9jVGFyZ2V0cyIsImkiLCJyZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldCIsImZvcmNlRGVsZXRlIiwiX2RlbGV0ZUhhc2hFbGVtZW50IiwicmVtb3ZlQWN0aW9uIiwiZ2V0T3JpZ2luYWxUYXJnZXQiLCJzcGxpY2UiLCJfcmVtb3ZlQWN0aW9uQnlUYWciLCJ0YWciLCJsIiwiZ2V0VGFnIiwiX3JlbW92ZUFjdGlvbkF0SW5kZXgiLCJyZW1vdmVBY3Rpb25CeVRhZyIsIkFjdGlvbiIsIlRBR19JTlZBTElEIiwibG9nSUQiLCJoYXNoVGFyZ2V0cyIsIm5hbWUiLCJnZXRBY3Rpb25CeVRhZyIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnNJblRhcmdldCIsInBhdXNlVGFyZ2V0IiwicmVzdW1lVGFyZ2V0IiwicGF1c2VBbGxSdW5uaW5nQWN0aW9ucyIsImlkc1dpdGhBY3Rpb25zIiwicmVzdW1lVGFyZ2V0cyIsInRhcmdldHNUb1Jlc3VtZSIsInBhdXNlVGFyZ2V0cyIsInRhcmdldHNUb1BhdXNlIiwicHVyZ2VTaGFyZWRNYW5hZ2VyIiwiZ2V0U2NoZWR1bGVyIiwidW5zY2hlZHVsZVVwZGF0ZSIsImluZGV4IiwicmV0IiwidGFyZ2V0cyIsInVwZGF0ZSIsImR0IiwibG9jQ3VyclRhcmdldCIsImVsdCIsInN0ZXAiLCJfc3BlZWRNZXRob2QiLCJfc3BlZWQiLCJpc0RvbmUiLCJzdG9wIiwiQ0NfVEVTVCIsImlzVGFyZ2V0UGF1c2VkX1RFU1QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBLElBQUlDLEVBQUUsR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQWhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUUsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBWTtBQUMxQixPQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLE9BQUtDLE1BQUwsR0FBYyxJQUFkLENBRjBCLENBRU47O0FBQ3BCLE9BQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxPQUFLQyxhQUFMLEdBQXFCLElBQXJCLENBSjBCLENBSUM7O0FBQzNCLE9BQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDSCxDQVBEO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBQyxFQUFFLENBQUNDLGFBQUgsR0FBbUIsWUFBWTtBQUMzQixPQUFLQyxZQUFMLEdBQW9CVixF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LElBQTlCO0FBQ0EsaUJBQUttQyxZQUFMLENBQWtCVixNQUFsQjtBQUNIOztBQUVEMEMsVUFBQUEsYUFBYSxDQUFDbkUsYUFBZCxHQUE4QixJQUE5QjtBQUNIOztBQUNEbUUsUUFBQUEsYUFBYSxDQUFDakUsSUFBZCxHQUFxQixLQUFyQjtBQUNILE9BekI2QyxDQTBCOUM7OztBQUNBLFVBQUlpRSxhQUFhLENBQUN0RSxPQUFkLENBQXNCcUIsTUFBdEIsS0FBaUMsQ0FBckMsRUFBd0M7QUFDcEMsYUFBS2dCLGtCQUFMLENBQXdCaUMsYUFBeEIsS0FBMENDLEdBQUcsRUFBN0M7QUFDSDtBQUNKO0FBQ0o7QUFuWXdCLENBQTdCOztBQXNZQSxJQUFJTSxPQUFKLEVBQWE7QUFDVHZFLEVBQUFBLEVBQUUsQ0FBQ0MsYUFBSCxDQUFpQlEsU0FBakIsQ0FBMkIrRCxtQkFBM0IsR0FBaUQsVUFBVTdFLE1BQVYsRUFBa0I7QUFDL0QsUUFBSXNCLE9BQU8sR0FBRyxLQUFLZixZQUFMLENBQWtCUCxNQUFNLENBQUM2QixHQUF6QixDQUFkO0FBQ0EsV0FBT1AsT0FBTyxDQUFDbkIsTUFBZjtBQUNILEdBSEQ7QUFJSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxucmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ0NsYXNzJyk7XHJcbnZhciBqcyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vanMnKTtcclxuXHJcbi8qXHJcbiAqIEBjbGFzcyBIYXNoRWxlbWVudFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHByaXZhdGVcclxuICovXHJcbnZhciBIYXNoRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy50YXJnZXQgPSBudWxsOyAvL2Njb2JqZWN0XHJcbiAgICB0aGlzLmFjdGlvbkluZGV4ID0gMDtcclxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7IC8vQ0NBY3Rpb25cclxuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLmxvY2sgPSBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIGNjLkFjdGlvbk1hbmFnZXIgaXMgYSBjbGFzcyB0aGF0IGNhbiBtYW5hZ2UgYWN0aW9ucy48YnIvPlxyXG4gKiBOb3JtYWxseSB5b3Ugd29uJ3QgbmVlZCB0byB1c2UgdGhpcyBjbGFzcyBkaXJlY3RseS4gOTklIG9mIHRoZSBjYXNlcyB5b3Ugd2lsbCB1c2UgdGhlIENDTm9kZSBpbnRlcmZhY2UsXHJcbiAqIHdoaWNoIHVzZXMgdGhpcyBjbGFzcydzIHNpbmdsZXRvbiBvYmplY3QuXHJcbiAqIEJ1dCB0aGVyZSBhcmUgc29tZSBjYXNlcyB3aGVyZSB5b3UgbWlnaHQgbmVlZCB0byB1c2UgdGhpcyBjbGFzcy4gPGJyLz5cclxuICogRXhhbXBsZXM6PGJyLz5cclxuICogLSBXaGVuIHlvdSB3YW50IHRvIHJ1biBhbiBhY3Rpb24gd2hlcmUgdGhlIHRhcmdldCBpcyBkaWZmZXJlbnQgZnJvbSBhIENDTm9kZS48YnIvPlxyXG4gKiAtIFdoZW4geW91IHdhbnQgdG8gcGF1c2UgLyByZXN1bWUgdGhlIGFjdGlvbnM8YnIvPlxyXG4gKiAhI3poXHJcbiAqIGNjLkFjdGlvbk1hbmFnZXIg5piv5Y+v5Lul566h55CG5Yqo5L2c55qE5Y2V5L6L57G744CCPGJyLz5cclxuICog6YCa5bi45L2g5bm25LiN6ZyA6KaB55u05o6l5L2/55So6L+Z5Liq57G777yMOTkl55qE5oOF5Ya15oKo5bCG5L2/55SoIENDTm9kZSDnmoTmjqXlj6PjgII8YnIvPlxyXG4gKiDkvYbkuZ/mnInkuIDkupvmg4XlhrXkuIvvvIzmgqjlj6/og73pnIDopoHkvb/nlKjov5nkuKrnsbvjgIIgPGJyLz5cclxuICog5L6L5aaC77yaXHJcbiAqICAtIOW9k+S9oOaDs+imgei/kOihjOS4gOS4quWKqOS9nO+8jOS9huebruagh+S4jeaYryBDQ05vZGUg57G75Z6L5pe244CCIDxici8+XHJcbiAqICAtIOW9k+S9oOaDs+imgeaaguWBnC/mgaLlpI3liqjkvZzml7bjgIIgPGJyLz5cclxuICogQGNsYXNzIEFjdGlvbk1hbmFnZXJcclxuICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS9DQ0FjdGlvbk1hbmFnZXIvQWN0aW9uTWFuYWdlci5qc31cclxuICovXHJcbmNjLkFjdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLl9oYXNoVGFyZ2V0cyA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcclxuICAgIHRoaXMuX2FycmF5VGFyZ2V0cyA9IFtdO1xyXG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XHJcbiAgICBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyICYmIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIuZW5hYmxlRm9yVGFyZ2V0KHRoaXMpO1xyXG59O1xyXG5jYy5BY3Rpb25NYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBjYy5BY3Rpb25NYW5hZ2VyLFxyXG4gICAgX2VsZW1lbnRQb29sOiBbXSxcclxuXHJcbiAgICBfc2VhcmNoRWxlbWVudEJ5VGFyZ2V0OmZ1bmN0aW9uIChhcnIsIHRhcmdldCkge1xyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJyLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGFycltrXS50YXJnZXQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW2tdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldEVsZW1lbnQ6IGZ1bmN0aW9uICh0YXJnZXQsIHBhdXNlZCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFBvb2wucG9wKCk7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBuZXcgSGFzaEVsZW1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbWVudC50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgZWxlbWVudC5wYXVzZWQgPSAhIXBhdXNlZDtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH0sXHJcblxyXG4gICAgX3B1dEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5hY3Rpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZWxlbWVudC5hY3Rpb25JbmRleCA9IDA7XHJcbiAgICAgICAgZWxlbWVudC5jdXJyZW50QWN0aW9uID0gbnVsbDtcclxuICAgICAgICBlbGVtZW50LnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIGVsZW1lbnQudGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICBlbGVtZW50LmxvY2sgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9lbGVtZW50UG9vbC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEFkZHMgYW4gYWN0aW9uIHdpdGggYSB0YXJnZXQuPGJyLz5cclxuICAgICAqIElmIHRoZSB0YXJnZXQgaXMgYWxyZWFkeSBwcmVzZW50LCB0aGVuIHRoZSBhY3Rpb24gd2lsbCBiZSBhZGRlZCB0byB0aGUgZXhpc3RpbmcgdGFyZ2V0LlxyXG4gICAgICogSWYgdGhlIHRhcmdldCBpcyBub3QgcHJlc2VudCwgYSBuZXcgaW5zdGFuY2Ugb2YgdGhpcyB0YXJnZXQgd2lsbCBiZSBjcmVhdGVkIGVpdGhlciBwYXVzZWQgb3Igbm90LCBhbmQgdGhlIGFjdGlvbiB3aWxsIGJlIGFkZGVkIHRvIHRoZSBuZXdseSBjcmVhdGVkIHRhcmdldC5cclxuICAgICAqIFdoZW4gdGhlIHRhcmdldCBpcyBwYXVzZWQsIHRoZSBxdWV1ZWQgYWN0aW9ucyB3b24ndCBiZSAndGlja2VkJy5cclxuICAgICAqICEjemhcclxuICAgICAqIOWinuWKoOS4gOS4quWKqOS9nO+8jOWQjOaXtui/mOmcgOimgeaPkOS+m+WKqOS9nOeahOebruagh+Wvueixoe+8jOebruagh+WvueixoeaYr+WQpuaaguWBnOS9nOS4uuWPguaVsOOAgjxici8+XHJcbiAgICAgKiDlpoLmnpznm67moIflt7LlrZjlnKjvvIzliqjkvZzlsIbkvJrooqvnm7TmjqXmt7vliqDliLDnjrDmnInnmoToioLngrnkuK3jgII8YnIvPlxyXG4gICAgICog5aaC5p6c55uu5qCH5LiN5a2Y5Zyo77yM5bCG5Li66L+Z5LiA55uu5qCH5Yib5bu65LiA5Liq5paw55qE5a6e5L6L77yM5bm25bCG5Yqo5L2c5re75Yqg6L+b5Y6744CCPGJyLz5cclxuICAgICAqIOW9k+ebruagh+eKtuaAgeeahCBwYXVzZWQg5Li6IHRydWXvvIzliqjkvZzlsIbkuI3kvJrooqvmiafooYxcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGFkZEFjdGlvblxyXG4gICAgICogQHBhcmFtIHtBY3Rpb259IGFjdGlvblxyXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGF1c2VkXHJcbiAgICAgKi9cclxuICAgIGFkZEFjdGlvbjpmdW5jdGlvbiAoYWN0aW9uLCB0YXJnZXQsIHBhdXNlZCkge1xyXG4gICAgICAgIGlmICghYWN0aW9uIHx8ICF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBpZiB0aGUgYWN0aW9uIHRhcmdldCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgLy9pZiBkb2Vzbid0IGV4aXN0cywgY3JlYXRlIGEgaGFzaGVsZW1lbnQgYW5kIHB1c2ggaW4gbXBUYXJnZXRzXHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLl9nZXRFbGVtZW50KHRhcmdldCwgcGF1c2VkKTtcclxuICAgICAgICAgICAgdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF0gPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9hcnJheVRhcmdldHMucHVzaChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoIWVsZW1lbnQuYWN0aW9ucykge1xyXG4gICAgICAgICAgICBlbGVtZW50LmFjdGlvbnMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYWN0aW9ucy5wdXNoKGFjdGlvbik7XHJcbiAgICAgICAgYWN0aW9uLnN0YXJ0V2l0aFRhcmdldCh0YXJnZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVtb3ZlcyBhbGwgYWN0aW9ucyBmcm9tIGFsbCB0aGUgdGFyZ2V0cy5cclxuICAgICAqICEjemgg56e76Zmk5omA5pyJ5a+56LGh55qE5omA5pyJ5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbEFjdGlvbnNcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsQWN0aW9uczpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxvY1RhcmdldHMgPSB0aGlzLl9hcnJheVRhcmdldHM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NUYXJnZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gbG9jVGFyZ2V0c1tpXTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wdXRFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hcnJheVRhcmdldHMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9oYXNoVGFyZ2V0cyA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlbW92ZXMgYWxsIGFjdGlvbnMgZnJvbSBhIGNlcnRhaW4gdGFyZ2V0LiA8YnIvPlxyXG4gICAgICogQWxsIHRoZSBhY3Rpb25zIHRoYXQgYmVsb25ncyB0byB0aGUgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZC5cclxuICAgICAqICEjemhcclxuICAgICAqIOenu+mZpOaMh+WumuWvueixoeS4iueahOaJgOacieWKqOS9nOOAgjxici8+XHJcbiAgICAgKiDlsZ7kuo7or6Xnm67moIfnmoTmiYDmnInnmoTliqjkvZzlsIbooqvliKDpmaTjgIJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXRcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlRGVsZXRlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQsIGZvcmNlRGVsZXRlKSB7XHJcbiAgICAgICAgLy8gZXhwbGljaXQgbnVsbCBoYW5kbGluZ1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5hY3Rpb25zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGV0ZUhhc2hFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVtb3ZlcyBhbiBhY3Rpb24gZ2l2ZW4gYW4gYWN0aW9uIHJlZmVyZW5jZS5cclxuICAgICAqICEjemgg56e76Zmk5oyH5a6a55qE5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFjdGlvbiBcclxuICAgICAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWN0aW9uOmZ1bmN0aW9uIChhY3Rpb24pIHtcclxuICAgICAgICAvLyBleHBsaWNpdCBudWxsIGhhbmRsaW5nXHJcbiAgICAgICAgaWYgKCFhY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gYWN0aW9uLmdldE9yaWdpbmFsVGFyZ2V0KCk7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoVGFyZ2V0c1t0YXJnZXQuX2lkXTtcclxuXHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5hY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmFjdGlvbnNbaV0gPT09IGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hY3Rpb25zLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBhY3Rpb25JbmRleCBpbiBjYXNlIHdlIGFyZSBpbiB0aWNrLiBsb29waW5nIG92ZXIgdGhlIGFjdGlvbnNcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmFjdGlvbkluZGV4ID49IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hY3Rpb25JbmRleC0tO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVBY3Rpb25CeVRhZyAodGFnLCBlbGVtZW50LCB0YXJnZXQpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsZW1lbnQuYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGVsZW1lbnQuYWN0aW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24uZ2V0VGFnKCkgPT09IHRhZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiBhY3Rpb24uZ2V0T3JpZ2luYWxUYXJnZXQoKSAhPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25BdEluZGV4KGksIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGFuIGFjdGlvbiBnaXZlbiBpdHMgdGFnIGFuZCB0aGUgdGFyZ2V0LlxyXG4gICAgICogISN6aCDliKDpmaTmjIflrprlr7nosaHkuIvnibnlrprmoIfnrb7nmoTkuIDkuKrliqjkvZzvvIzlsIbliKDpmaTpppbkuKrljLnphY3liLDnmoTliqjkvZzjgIJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWN0aW9uQnlUYWdcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0YWdcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gW3RhcmdldF1cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWN0aW9uQnlUYWc6ZnVuY3Rpb24gKHRhZywgdGFyZ2V0KSB7XHJcbiAgICAgICAgaWYodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpXHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDEwMDIpO1xyXG5cclxuICAgICAgICBsZXQgaGFzaFRhcmdldHMgPSB0aGlzLl9oYXNoVGFyZ2V0cztcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIGVsZW1lbnQsIHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4gaGFzaFRhcmdldHMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gaGFzaFRhcmdldHNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBhbiBhY3Rpb24gZ2l2ZW4gaXRzIHRhZyBhbiBhIHRhcmdldC5cclxuICAgICAqICEjemgg6YCa6L+H55uu5qCH5a+56LGh5ZKM5qCH562+6I635Y+W5LiA5Liq5Yqo5L2c44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEFjdGlvbkJ5VGFnXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxyXG4gICAgICogQHJldHVybiB7QWN0aW9ufE51bGx9ICByZXR1cm4gdGhlIEFjdGlvbiB3aXRoIHRoZSBnaXZlbiB0YWcgb24gc3VjY2Vzc1xyXG4gICAgICovXHJcbiAgICBnZXRBY3Rpb25CeVRhZzpmdW5jdGlvbiAodGFnLCB0YXJnZXQpIHtcclxuICAgICAgICBpZih0YWcgPT09IGNjLkFjdGlvbi5UQUdfSU5WQUxJRClcclxuICAgICAgICAgICAgY2MubG9nSUQoMTAwNCk7XHJcblxyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuYWN0aW9ucyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQuYWN0aW9ucy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmFjdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBhY3Rpb24uZ2V0VGFnKCkgPT09IHRhZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5sb2dJRCgxMDA1LCB0YWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVycyBvZiBhY3Rpb25zIHRoYXQgYXJlIHJ1bm5pbmcgaW4gYSBjZXJ0YWluIHRhcmdldC4gPGJyLz5cclxuICAgICAqIENvbXBvc2FibGUgYWN0aW9ucyBhcmUgY291bnRlZCBhcyAxIGFjdGlvbi4gPGJyLz5cclxuICAgICAqIEV4YW1wbGU6IDxici8+XHJcbiAgICAgKiAtIElmIHlvdSBhcmUgcnVubmluZyAxIFNlcXVlbmNlIG9mIDcgYWN0aW9ucywgaXQgd2lsbCByZXR1cm4gMS4gPGJyLz5cclxuICAgICAqIC0gSWYgeW91IGFyZSBydW5uaW5nIDcgU2VxdWVuY2VzIG9mIDIgYWN0aW9ucywgaXQgd2lsbCByZXR1cm4gNy5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/lOWbnuaMh+WumuWvueixoeS4i+aJgOacieato+WcqOi/kOihjOeahOWKqOS9nOaVsOmHj+OAgiA8YnIvPlxyXG4gICAgICog57uE5ZCI5Yqo5L2c6KKr566X5L2c5LiA5Liq5Yqo5L2c44CCPGJyLz5cclxuICAgICAqIOS+i+Wmgu+8mjxici8+XHJcbiAgICAgKiAgLSDlpoLmnpzmgqjmraPlnKjov5DooYwgNyDkuKrliqjkvZznu4TmiJDnmoTluo/liJfliqjkvZzvvIhTZXF1ZW5jZe+8ie+8jOi/meS4quWHveaVsOWwhui/lOWbniAx44CCPGJyLz5cclxuICAgICAqICAtIOWmguaenOS9oOato+WcqOi/kOihjCAyIOS4quW6j+WIl+WKqOS9nO+8iFNlcXVlbmNl77yJ5ZKMIDUg5Liq5pmu6YCa5Yqo5L2c77yM6L+Z5Liq5Ye95pWw5bCG6L+U5ZueIDfjgII8YnIvPlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9uc0luVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zSW5UYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIHJldHVybiAoZWxlbWVudC5hY3Rpb25zKSA/IGVsZW1lbnQuYWN0aW9ucy5sZW5ndGggOiAwO1xyXG5cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGF1c2VzIHRoZSB0YXJnZXQ6IGFsbCBydW5uaW5nIGFjdGlvbnMgYW5kIG5ld2x5IGFkZGVkIGFjdGlvbnMgd2lsbCBiZSBwYXVzZWQuXHJcbiAgICAgKiAhI3poIOaaguWBnOaMh+WumuWvueixoe+8muaJgOacieato+WcqOi/kOihjOeahOWKqOS9nOWSjOaWsOa3u+WKoOeahOWKqOS9nOmDveWwhuS8muaaguWBnOOAglxyXG4gICAgICogQG1ldGhvZCBwYXVzZVRhcmdldFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSB0YXJnZXRcclxuICAgICAqL1xyXG4gICAgcGF1c2VUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIGVsZW1lbnQucGF1c2VkID0gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVzdW1lcyB0aGUgdGFyZ2V0LiBBbGwgcXVldWVkIGFjdGlvbnMgd2lsbCBiZSByZXN1bWVkLlxyXG4gICAgICogISN6aCDorqnmjIflrprnm67moIfmgaLlpI3ov5DooYzjgILlnKjmiafooYzluo/liJfkuK3miYDmnInooqvmmoLlgZznmoTliqjkvZzlsIbph43mlrDmgaLlpI3ov5DooYzjgIJcclxuICAgICAqIEBtZXRob2QgcmVzdW1lVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IHRhcmdldFxyXG4gICAgICovXHJcbiAgICByZXN1bWVUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpXHJcbiAgICAgICAgICAgIGVsZW1lbnQucGF1c2VkID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXVzZXMgYWxsIHJ1bm5pbmcgYWN0aW9ucywgcmV0dXJuaW5nIGEgbGlzdCBvZiB0YXJnZXRzIHdob3NlIGFjdGlvbnMgd2VyZSBwYXVzZWQuXHJcbiAgICAgKiAhI3poIOaaguWBnOaJgOacieato+WcqOi/kOihjOeahOWKqOS9nO+8jOi/lOWbnuS4gOS4quWMheWQq+S6humCo+S6m+WKqOS9nOiiq+aaguWBnOS6hueahOebruagh+WvueixoeeahOWIl+ihqOOAglxyXG4gICAgICogQG1ldGhvZCBwYXVzZUFsbFJ1bm5pbmdBY3Rpb25zXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gIGEgbGlzdCBvZiB0YXJnZXRzIHdob3NlIGFjdGlvbnMgd2VyZSBwYXVzZWQuXHJcbiAgICAgKi9cclxuICAgIHBhdXNlQWxsUnVubmluZ0FjdGlvbnM6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgaWRzV2l0aEFjdGlvbnMgPSBbXTtcclxuICAgICAgICB2YXIgbG9jVGFyZ2V0cyA9IHRoaXMuX2FycmF5VGFyZ2V0cztcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpPCBsb2NUYXJnZXRzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBsb2NUYXJnZXRzW2ldO1xyXG4gICAgICAgICAgICBpZihlbGVtZW50ICYmICFlbGVtZW50LnBhdXNlZCl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZHNXaXRoQWN0aW9ucy5wdXNoKGVsZW1lbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWRzV2l0aEFjdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXN1bWUgYSBzZXQgb2YgdGFyZ2V0cyAoY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gcmV2ZXJzZSBhIHBhdXNlQWxsUnVubmluZ0FjdGlvbnMgb3IgcGF1c2VUYXJnZXRzIGNhbGwpLlxyXG4gICAgICogISN6aCDorqnkuIDnu4TmjIflrprlr7nosaHmgaLlpI3ov5DooYzvvIjnlKjmnaXpgIbovawgcGF1c2VBbGxSdW5uaW5nQWN0aW9ucyDmlYjmnpznmoTkvr/mjbflh73mlbDvvInjgIJcclxuICAgICAqIEBtZXRob2QgcmVzdW1lVGFyZ2V0c1xyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFyZ2V0c1RvUmVzdW1lXHJcbiAgICAgKi9cclxuICAgIHJlc3VtZVRhcmdldHM6ZnVuY3Rpb24odGFyZ2V0c1RvUmVzdW1lKXtcclxuICAgICAgICBpZiAoIXRhcmdldHNUb1Jlc3VtZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTwgdGFyZ2V0c1RvUmVzdW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRhcmdldHNUb1Jlc3VtZVtpXSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lVGFyZ2V0KHRhcmdldHNUb1Jlc3VtZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGF1c2UgYSBzZXQgb2YgdGFyZ2V0cy5cclxuICAgICAqICEjemgg5pqC5YGc5LiA57uE5oyH5a6a5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIHBhdXNlVGFyZ2V0c1xyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGFyZ2V0c1RvUGF1c2VcclxuICAgICAqL1xyXG4gICAgcGF1c2VUYXJnZXRzOmZ1bmN0aW9uKHRhcmdldHNUb1BhdXNlKXtcclxuICAgICAgICBpZiAoIXRhcmdldHNUb1BhdXNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpPCB0YXJnZXRzVG9QYXVzZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0c1RvUGF1c2VbaV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlVGFyZ2V0KHRhcmdldHNUb1BhdXNlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogcHVyZ2VzIHRoZSBzaGFyZWQgYWN0aW9uIG1hbmFnZXIuIEl0IHJlbGVhc2VzIHRoZSByZXRhaW5lZCBpbnN0YW5jZS4gPGJyLz5cclxuICAgICAqIGJlY2F1c2UgaXQgdXNlcyB0aGlzLCBzbyBpdCBjYW4gbm90IGJlIHN0YXRpYy5cclxuICAgICAqICEjemhcclxuICAgICAqIOa4hemZpOWFseeUqOeahOWKqOS9nOeuoeeQhuWZqOOAguWug+mHiuaUvuS6huaMgeacieeahOWunuS+i+OAgiA8YnIvPlxyXG4gICAgICog5Zug5Li65a6D5L2/55SoIHRoaXPvvIzlm6DmraTlroPkuI3og73mmK/pnZnmgIHnmoTjgIJcclxuICAgICAqIEBtZXRob2QgcHVyZ2VTaGFyZWRNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHB1cmdlU2hhcmVkTWFuYWdlcjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZVVwZGF0ZSh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy9wcm90ZWN0ZWRcclxuICAgIF9yZW1vdmVBY3Rpb25BdEluZGV4OmZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmFjdGlvbnNbaW5kZXhdO1xyXG5cclxuICAgICAgICBlbGVtZW50LmFjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGFjdGlvbkluZGV4IGluIGNhc2Ugd2UgYXJlIGluIHRpY2suIGxvb3Bpbmcgb3ZlciB0aGUgYWN0aW9uc1xyXG4gICAgICAgIGlmIChlbGVtZW50LmFjdGlvbkluZGV4ID49IGluZGV4KVxyXG4gICAgICAgICAgICBlbGVtZW50LmFjdGlvbkluZGV4LS07XHJcblxyXG4gICAgICAgIGlmIChlbGVtZW50LmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGV0ZUhhc2hFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2RlbGV0ZUhhc2hFbGVtZW50OmZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHJldCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFlbGVtZW50LmxvY2spIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc2hUYXJnZXRzW2VsZW1lbnQudGFyZ2V0Ll9pZF0pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9oYXNoVGFyZ2V0c1tlbGVtZW50LnRhcmdldC5faWRdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSB0aGlzLl9hcnJheVRhcmdldHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldHNbaV0gPT09IGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3B1dEVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgQWN0aW9uTWFuYWdlciB1cGRhdGXjgIJcclxuICAgICAqICEjemggQWN0aW9uTWFuYWdlciDkuLvlvqrnjq/jgIJcclxuICAgICAqIEBtZXRob2QgdXBkYXRlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHQgZGVsdGEgdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgbG9jVGFyZ2V0cyA9IHRoaXMuX2FycmF5VGFyZ2V0cyAsIGxvY0N1cnJUYXJnZXQ7XHJcbiAgICAgICAgZm9yICh2YXIgZWx0ID0gMDsgZWx0IDwgbG9jVGFyZ2V0cy5sZW5ndGg7IGVsdCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBsb2NUYXJnZXRzW2VsdF07XHJcbiAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQgPSB0aGlzLl9jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICBpZiAoIWxvY0N1cnJUYXJnZXQucGF1c2VkICYmIGxvY0N1cnJUYXJnZXQuYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgbG9jQ3VyclRhcmdldC5sb2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSAnYWN0aW9ucycgQ0NNdXRhYmxlQXJyYXkgbWF5IGNoYW5nZSB3aGlsZSBpbnNpZGUgdGhpcyBsb29wLlxyXG4gICAgICAgICAgICAgICAgZm9yIChsb2NDdXJyVGFyZ2V0LmFjdGlvbkluZGV4ID0gMDsgbG9jQ3VyclRhcmdldC5hY3Rpb25JbmRleCA8IGxvY0N1cnJUYXJnZXQuYWN0aW9ucy5sZW5ndGg7IGxvY0N1cnJUYXJnZXQuYWN0aW9uSW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbiA9IGxvY0N1cnJUYXJnZXQuYWN0aW9uc1tsb2NDdXJyVGFyZ2V0LmFjdGlvbkluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlIGZvciBzcGVlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbi5zdGVwKGR0ICogKCBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24uX3NwZWVkTWV0aG9kID8gbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uLl9zcGVlZCA6IDEgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24gJiYgbG9jQ3VyclRhcmdldC5jdXJyZW50QWN0aW9uLmlzRG9uZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgY3VycmVudEFjdGlvbiBuaWwgdG8gcHJldmVudCByZW1vdmVBY3Rpb24gZnJvbSBzYWx2YWdpbmcgaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY0N1cnJUYXJnZXQuY3VycmVudEFjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2NDdXJyVGFyZ2V0LmN1cnJlbnRBY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9jQ3VyclRhcmdldC5sb2NrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb25seSBkZWxldGUgY3VycmVudFRhcmdldCBpZiBubyBhY3Rpb25zIHdlcmUgc2NoZWR1bGVkIGR1cmluZyB0aGUgY3ljbGUgKGlzc3VlICM0ODEpXHJcbiAgICAgICAgICAgIGlmIChsb2NDdXJyVGFyZ2V0LmFjdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxldGVIYXNoRWxlbWVudChsb2NDdXJyVGFyZ2V0KSAmJiBlbHQtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmlmIChDQ19URVNUKSB7XHJcbiAgICBjYy5BY3Rpb25NYW5hZ2VyLnByb3RvdHlwZS5pc1RhcmdldFBhdXNlZF9URVNUID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaFRhcmdldHNbdGFyZ2V0Ll9pZF07XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQucGF1c2VkO1xyXG4gICAgfTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==