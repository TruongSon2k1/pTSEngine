
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/CCActionInstant.js';
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
 * !#en Instant actions are immediate actions. They don't have a duration like the ActionInterval actions.
 * !#zh 即时动作，这种动作立即就会执行，继承自 FiniteTimeAction。
 * @class ActionInstant
 * @extends FiniteTimeAction
 */
cc.ActionInstant = cc.Class({
  name: 'cc.ActionInstant',
  "extends": cc.FiniteTimeAction,
  isDone: function isDone() {
    return true;
  },
  step: function step(dt) {
    this.update(1);
  },
  update: function update(dt) {//nothing
  },

  /**
   * returns a reversed action. <br />
   * For example: <br />
   * - The action is x coordinates of 0 move to 100. <br />
   * - The reversed action will be x of 100 move to 0.
   * @returns {Action}
   */
  reverse: function reverse() {
    return this.clone();
  },
  clone: function clone() {
    return new cc.ActionInstant();
  }
});
/**
 * @module cc
 */

/*
 * Show the node.
 * @class Show
 * @extends ActionInstant
 */

cc.Show = cc.Class({
  name: 'cc.Show',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = true;
    }
  },
  reverse: function reverse() {
    return new cc.Hide();
  },
  clone: function clone() {
    return new cc.Show();
  }
});
/**
 * !#en Show the Node.
 * !#zh 立即显示。
 * @method show
 * @return {ActionInstant}
 * @example
 * // example
 * var showAction = cc.show();
 */

cc.show = function () {
  return new cc.Show();
};
/*
 * Hide the node.
 * @class Hide
 * @extends ActionInstant
 */


cc.Hide = cc.Class({
  name: 'cc.Hide',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = false;
    }
  },
  reverse: function reverse() {
    return new cc.Show();
  },
  clone: function clone() {
    return new cc.Hide();
  }
});
/**
 * !#en Hide the node.
 * !#zh 立即隐藏。
 * @method hide
 * @return {ActionInstant}
 * @example
 * // example
 * var hideAction = cc.hide();
 */

cc.hide = function () {
  return new cc.Hide();
};
/*
 * Toggles the visibility of a node.
 * @class ToggleVisibility
 * @extends ActionInstant
 */


cc.ToggleVisibility = cc.Class({
  name: 'cc.ToggleVisibility',
  "extends": cc.ActionInstant,
  update: function update(dt) {
    var _renderComps = this.target.getComponentsInChildren(cc.RenderComponent);

    for (var i = 0; i < _renderComps.length; ++i) {
      var render = _renderComps[i];
      render.enabled = !render.enabled;
    }
  },
  reverse: function reverse() {
    return new cc.ToggleVisibility();
  },
  clone: function clone() {
    return new cc.ToggleVisibility();
  }
});
/**
 * !#en Toggles the visibility of a node.
 * !#zh 显隐状态切换。
 * @method toggleVisibility
 * @return {ActionInstant}
 * @example
 * // example
 * var toggleVisibilityAction = cc.toggleVisibility();
 */

cc.toggleVisibility = function () {
  return new cc.ToggleVisibility();
};
/*
 * Delete self in the next frame.
 * @class RemoveSelf
 * @extends ActionInstant
 * @param {Boolean} [isNeedCleanUp=true]
 *
 * @example
 * // example
 * var removeSelfAction = new cc.RemoveSelf(false);
 */


cc.RemoveSelf = cc.Class({
  name: 'cc.RemoveSelf',
  "extends": cc.ActionInstant,
  ctor: function ctor(isNeedCleanUp) {
    this._isNeedCleanUp = true;
    isNeedCleanUp !== undefined && this.init(isNeedCleanUp);
  },
  update: function update(dt) {
    this.target.removeFromParent(this._isNeedCleanUp);
  },
  init: function init(isNeedCleanUp) {
    this._isNeedCleanUp = isNeedCleanUp;
    return true;
  },
  reverse: function reverse() {
    return new cc.RemoveSelf(this._isNeedCleanUp);
  },
  clone: function clone() {
    return new cc.RemoveSelf(this._isNeedCleanUp);
  }
});
/**
 * !#en Create a RemoveSelf object with a flag indicate whether the target should be cleaned up while removing.
 * !#zh 从父节点移除自身。
 * @method removeSelf
 * @param {Boolean} [isNeedCleanUp = true]
 * @return {ActionInstant}
 *
 * @example
 * // example
 * var removeSelfAction = cc.removeSelf();
 */

cc.removeSelf = function (isNeedCleanUp) {
  return new cc.RemoveSelf(isNeedCleanUp);
};
/*
 * Create an action to destroy self.
 * @class DestroySelf
 * @extends ActionInstant
 *
 * @example
 * var destroySelfAction = new cc.DestroySelf();
 */


cc.DestroySelf = cc.Class({
  name: 'cc.DestroySelf',
  "extends": cc.ActionInstant,
  update: function update() {
    this.target.destroy();
  },
  reverse: function reverse() {
    return new cc.DestroySelf();
  },
  clone: function clone() {
    return new cc.DestroySelf();
  }
});
/**
 * !#en Destroy self
 * !#zh 创建一个销毁自身的动作。
 * @method destroySelf
 * @return {ActionInstant}
 *
 * @example
 * var destroySelfAction = cc.destroySelf();
 */

cc.destroySelf = function () {
  return new cc.DestroySelf();
};
/*
 * Flips the sprite horizontally.
 * @class FlipX
 * @extends ActionInstant
 * @param {Boolean} flip Indicate whether the target should be flipped or not
 *
 * @example
 * var flipXAction = new cc.FlipX(true);
 */


cc.FlipX = cc.Class({
  name: 'cc.FlipX',
  "extends": cc.ActionInstant,
  ctor: function ctor(flip) {
    this._flippedX = false;
    flip !== undefined && this.initWithFlipX(flip);
  },

  /*
   * initializes the action with a set flipX.
   * @param {Boolean} flip
   * @return {Boolean}
   */
  initWithFlipX: function initWithFlipX(flip) {
    this._flippedX = flip;
    return true;
  },
  update: function update(dt) {
    this.target.scaleX = Math.abs(this.target.scaleX) * (this._flippedX ? -1 : 1);
  },
  reverse: function reverse() {
    return new cc.FlipX(!this._flippedX);
  },
  clone: function clone() {
    var action = new cc.FlipX();
    action.initWithFlipX(this._flippedX);
    return action;
  }
});
/**
 * !#en Create a FlipX action to flip or unflip the target.
 * !#zh X轴翻转。
 * @method flipX
 * @param {Boolean} flip Indicate whether the target should be flipped or not
 * @return {ActionInstant}
 * @example
 * var flipXAction = cc.flipX(true);
 */

cc.flipX = function (flip) {
  return new cc.FlipX(flip);
};
/*
 * Flips the sprite vertically
 * @class FlipY
 * @extends ActionInstant
 * @param {Boolean} flip
 * @example
 * var flipYAction = new cc.FlipY(true);
 */


cc.FlipY = cc.Class({
  name: 'cc.FlipY',
  "extends": cc.ActionInstant,
  ctor: function ctor(flip) {
    this._flippedY = false;
    flip !== undefined && this.initWithFlipY(flip);
  },

  /*
   * initializes the action with a set flipY.
   * @param {Boolean} flip
   * @return {Boolean}
   */
  initWithFlipY: function initWithFlipY(flip) {
    this._flippedY = flip;
    return true;
  },
  update: function update(dt) {
    this.target.scaleY = Math.abs(this.target.scaleY) * (this._flippedY ? -1 : 1);
  },
  reverse: function reverse() {
    return new cc.FlipY(!this._flippedY);
  },
  clone: function clone() {
    var action = new cc.FlipY();
    action.initWithFlipY(this._flippedY);
    return action;
  }
});
/**
 * !#en Create a FlipY action to flip or unflip the target.
 * !#zh Y轴翻转。
 * @method flipY
 * @param {Boolean} flip
 * @return {ActionInstant}
 * @example
 * var flipYAction = cc.flipY(true);
 */

cc.flipY = function (flip) {
  return new cc.FlipY(flip);
};
/*
 * Places the node in a certain position
 * @class Place
 * @extends ActionInstant
 * @param {Vec2|Number} pos
 * @param {Number} [y]
 * @example
 * var placeAction = new cc.Place(cc.v2(200, 200));
 * var placeAction = new cc.Place(200, 200);
 */


cc.Place = cc.Class({
  name: 'cc.Place',
  "extends": cc.ActionInstant,
  ctor: function ctor(pos, y) {
    this._x = 0;
    this._y = 0;

    if (pos !== undefined) {
      if (pos.x !== undefined) {
        y = pos.y;
        pos = pos.x;
      }

      this.initWithPosition(pos, y);
    }
  },

  /*
   * Initializes a Place action with a position
   * @param {number} x
   * @param {number} y
   * @return {Boolean}
   */
  initWithPosition: function initWithPosition(x, y) {
    this._x = x;
    this._y = y;
    return true;
  },
  update: function update(dt) {
    this.target.setPosition(this._x, this._y);
  },
  clone: function clone() {
    var action = new cc.Place();
    action.initWithPosition(this._x, this._y);
    return action;
  }
});
/**
 * !#en Creates a Place action with a position.
 * !#zh 放置在目标位置。
 * @method place
 * @param {Vec2|Number} pos
 * @param {Number} [y]
 * @return {ActionInstant}
 * @example
 * // example
 * var placeAction = cc.place(cc.v2(200, 200));
 * var placeAction = cc.place(200, 200);
 */

cc.place = function (pos, y) {
  return new cc.Place(pos, y);
};
/*
 * Calls a 'callback'.
 * @class CallFunc
 * @extends ActionInstant
 * @param {function} selector
 * @param {object} [selectorTarget=null]
 * @param {*} [data=null] data for function, it accepts all data types.
 * @example
 * // example
 * // CallFunc without data
 * var finish = new cc.CallFunc(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = new cc.CallFunc(this.removeFromParentAndCleanup, this,  true);
 */


cc.CallFunc = cc.Class({
  name: 'cc.CallFunc',
  "extends": cc.ActionInstant,

  /*
   * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
  * Creates a CallFunc action with the callback.
  * @param {function} selector
  * @param {object} [selectorTarget=null]
  * @param {*} [data=null] data for function, it accepts all data types.
  */
  ctor: function ctor(selector, selectorTarget, data) {
    this._selectorTarget = null;
    this._function = null;
    this._data = null;
    this.initWithFunction(selector, selectorTarget, data);
  },

  /*
   * Initializes the action with a function or function and its target
   * @param {function} selector
   * @param {object|Null} selectorTarget
   * @param {*|Null} [data] data for function, it accepts all data types.
   * @return {Boolean}
   */
  initWithFunction: function initWithFunction(selector, selectorTarget, data) {
    if (selector) {
      this._function = selector;
    }

    if (selectorTarget) {
      this._selectorTarget = selectorTarget;
    }

    if (data !== undefined) {
      this._data = data;
    }

    return true;
  },

  /*
   * execute the function.
   */
  execute: function execute() {
    if (this._function) {
      this._function.call(this._selectorTarget, this.target, this._data);
    }
  },
  update: function update(dt) {
    this.execute();
  },

  /*
   * Get selectorTarget.
   * @return {object}
   */
  getTargetCallback: function getTargetCallback() {
    return this._selectorTarget;
  },

  /*
   * Set selectorTarget.
   * @param {object} sel
   */
  setTargetCallback: function setTargetCallback(sel) {
    if (sel !== this._selectorTarget) {
      if (this._selectorTarget) this._selectorTarget = null;
      this._selectorTarget = sel;
    }
  },
  clone: function clone() {
    var action = new cc.CallFunc();
    action.initWithFunction(this._function, this._selectorTarget, this._data);
    return action;
  }
});
/**
 * !#en Creates the action with the callback.
 * !#zh 执行回调函数。
 * @method callFunc
 * @param {function} selector
 * @param {object} [selectorTarget=null]
 * @param {*} [data=null] - data for function, it accepts all data types.
 * @return {ActionInstant}
 * @example
 * // example
 * // CallFunc without data
 * var finish = cc.callFunc(this.removeSprite, this);
 *
 * // CallFunc with data
 * var finish = cc.callFunc(this.removeFromParentAndCleanup, this._grossini,  true);
 */

cc.callFunc = function (selector, selectorTarget, data) {
  return new cc.CallFunc(selector, selectorTarget, data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXENDQWN0aW9uSW5zdGFudC5qcyJdLCJuYW1lcyI6WyJjYyIsIkFjdGlvbkluc3RhbnQiLCJDbGFzcyIsIm5hbWUiLCJGaW5pdGVUaW1lQWN0aW9uIiwiaXNEb25lIiwic3RlcCIsImR0IiwidXBkYXRlIiwicmV2ZXJzZSIsImNsb25lIiwiU2hvdyIsIl9yZW5kZXJDb21wcyIsInRhcmdldCIsImdldENvbXBvbmVudHNJbkNoaWxkcmVuIiwiUmVuZGVyQ29tcG9uZW50IiwiaSIsImxlbmd0aCIsInJlbmRlciIsImVuYWJsZWQiLCJIaWRlIiwic2hvdyIsImhpZGUiLCJUb2dnbGVWaXNpYmlsaXR5IiwidG9nZ2xlVmlzaWJpbGl0eSIsIlJlbW92ZVNlbGYiLCJjdG9yIiwiaXNOZWVkQ2xlYW5VcCIsIl9pc05lZWRDbGVhblVwIiwidW5kZWZpbmVkIiwiaW5pdCIsInJlbW92ZUZyb21QYXJlbnQiLCJyZW1vdmVTZWxmIiwiRGVzdHJveVNlbGYiLCJkZXN0cm95IiwiZGVzdHJveVNlbGYiLCJGbGlwWCIsImZsaXAiLCJfZmxpcHBlZFgiLCJpbml0V2l0aEZsaXBYIiwic2NhbGVYIiwiTWF0aCIsImFicyIsImFjdGlvbiIsImZsaXBYIiwiRmxpcFkiLCJfZmxpcHBlZFkiLCJpbml0V2l0aEZsaXBZIiwic2NhbGVZIiwiZmxpcFkiLCJQbGFjZSIsInBvcyIsInkiLCJfeCIsIl95IiwieCIsImluaXRXaXRoUG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsInBsYWNlIiwiQ2FsbEZ1bmMiLCJzZWxlY3RvciIsInNlbGVjdG9yVGFyZ2V0IiwiZGF0YSIsIl9zZWxlY3RvclRhcmdldCIsIl9mdW5jdGlvbiIsIl9kYXRhIiwiaW5pdFdpdGhGdW5jdGlvbiIsImV4ZWN1dGUiLCJjYWxsIiwiZ2V0VGFyZ2V0Q2FsbGJhY2siLCJzZXRUYXJnZXRDYWxsYmFjayIsInNlbCIsImNhbGxGdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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QixDQUFULENBQWQ7QUE4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EzQyxFQUFFLENBQUN3RSxRQUFILEdBQWMsVUFBVVosUUFBVixFQUFvQkMsY0FBcEIsRUFBb0NDLElBQXBDLEVBQTBDO0FBQ3BELFNBQU8sSUFBSTlELEVBQUUsQ0FBQzJELFFBQVAsQ0FBZ0JDLFFBQWhCLEVBQTBCQyxjQUExQixFQUEwQ0MsSUFBMUMsQ0FBUDtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gSW5zdGFudCBhY3Rpb25zIGFyZSBpbW1lZGlhdGUgYWN0aW9ucy4gVGhleSBkb24ndCBoYXZlIGEgZHVyYXRpb24gbGlrZSB0aGUgQWN0aW9uSW50ZXJ2YWwgYWN0aW9ucy5cclxuICogISN6aCDljbPml7bliqjkvZzvvIzov5nnp43liqjkvZznq4vljbPlsLHkvJrmiafooYzvvIznu6fmib/oh6ogRmluaXRlVGltZUFjdGlvbuOAglxyXG4gKiBAY2xhc3MgQWN0aW9uSW5zdGFudFxyXG4gKiBAZXh0ZW5kcyBGaW5pdGVUaW1lQWN0aW9uXHJcbiAqL1xyXG5jYy5BY3Rpb25JbnN0YW50ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkFjdGlvbkluc3RhbnQnLFxyXG4gICAgZXh0ZW5kczogY2MuRmluaXRlVGltZUFjdGlvbixcclxuICAgIGlzRG9uZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0ZXA6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAvL25vdGhpbmdcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm5zIGEgcmV2ZXJzZWQgYWN0aW9uLiA8YnIgLz5cclxuICAgICAqIEZvciBleGFtcGxlOiA8YnIgLz5cclxuICAgICAqIC0gVGhlIGFjdGlvbiBpcyB4IGNvb3JkaW5hdGVzIG9mIDAgbW92ZSB0byAxMDAuIDxiciAvPlxyXG4gICAgICogLSBUaGUgcmV2ZXJzZWQgYWN0aW9uIHdpbGwgYmUgeCBvZiAxMDAgbW92ZSB0byAwLlxyXG4gICAgICogQHJldHVybnMge0FjdGlvbn1cclxuICAgICAqL1xyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5BY3Rpb25JbnN0YW50KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKlxyXG4gKiBTaG93IHRoZSBub2RlLlxyXG4gKiBAY2xhc3MgU2hvd1xyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XHJcbiAqL1xyXG5jYy5TaG93ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlNob3cnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW5zdGFudCxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdmFyIF9yZW5kZXJDb21wcyA9IHRoaXMudGFyZ2V0LmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlJlbmRlckNvbXBvbmVudCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcmVuZGVyQ29tcHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHJlbmRlciA9IF9yZW5kZXJDb21wc1tpXTtcclxuICAgICAgICAgICAgcmVuZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5IaWRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5TaG93KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gU2hvdyB0aGUgTm9kZS5cclxuICogISN6aCDnq4vljbPmmL7npLrjgIJcclxuICogQG1ldGhvZCBzaG93XHJcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIHNob3dBY3Rpb24gPSBjYy5zaG93KCk7XHJcbiAqL1xyXG5jYy5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5TaG93KCk7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBIaWRlIHRoZSBub2RlLlxyXG4gKiBAY2xhc3MgSGlkZVxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XHJcbiAqL1xyXG5jYy5IaWRlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkhpZGUnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW5zdGFudCxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgdmFyIF9yZW5kZXJDb21wcyA9IHRoaXMudGFyZ2V0LmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlJlbmRlckNvbXBvbmVudCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfcmVuZGVyQ29tcHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIHJlbmRlciA9IF9yZW5kZXJDb21wc1tpXTtcclxuICAgICAgICAgICAgcmVuZGVyLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuU2hvdygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuSGlkZSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEhpZGUgdGhlIG5vZGUuXHJcbiAqICEjemgg56uL5Y2z6ZqQ6JeP44CCXHJcbiAqIEBtZXRob2QgaGlkZVxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBoaWRlQWN0aW9uID0gY2MuaGlkZSgpO1xyXG4gKi9cclxuY2MuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBuZXcgY2MuSGlkZSgpO1xyXG59O1xyXG5cclxuLypcclxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiBhIG5vZGUuXHJcbiAqIEBjbGFzcyBUb2dnbGVWaXNpYmlsaXR5XHJcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcclxuICovXHJcbmNjLlRvZ2dsZVZpc2liaWxpdHkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVG9nZ2xlVmlzaWJpbGl0eScsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB2YXIgX3JlbmRlckNvbXBzID0gdGhpcy50YXJnZXQuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuUmVuZGVyQ29tcG9uZW50KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9yZW5kZXJDb21wcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgcmVuZGVyID0gX3JlbmRlckNvbXBzW2ldO1xyXG4gICAgICAgICAgICByZW5kZXIuZW5hYmxlZCA9ICFyZW5kZXIuZW5hYmxlZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuVG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuVG9nZ2xlVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgYSBub2RlLlxyXG4gKiAhI3poIOaYvumakOeKtuaAgeWIh+aNouOAglxyXG4gKiBAbWV0aG9kIHRvZ2dsZVZpc2liaWxpdHlcclxuICogQHJldHVybiB7QWN0aW9uSW5zdGFudH1cclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgdG9nZ2xlVmlzaWJpbGl0eUFjdGlvbiA9IGNjLnRvZ2dsZVZpc2liaWxpdHkoKTtcclxuICovXHJcbmNjLnRvZ2dsZVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLlRvZ2dsZVZpc2liaWxpdHkoKTtcclxufTtcclxuXHJcbi8qXHJcbiAqIERlbGV0ZSBzZWxmIGluIHRoZSBuZXh0IGZyYW1lLlxyXG4gKiBAY2xhc3MgUmVtb3ZlU2VsZlxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzTmVlZENsZWFuVXA9dHJ1ZV1cclxuICpcclxuICogQGV4YW1wbGVcclxuICogLy8gZXhhbXBsZVxyXG4gKiB2YXIgcmVtb3ZlU2VsZkFjdGlvbiA9IG5ldyBjYy5SZW1vdmVTZWxmKGZhbHNlKTtcclxuICovXHJcbmNjLlJlbW92ZVNlbGYgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUmVtb3ZlU2VsZicsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24oaXNOZWVkQ2xlYW5VcCl7XHJcbiAgICAgICAgdGhpcy5faXNOZWVkQ2xlYW5VcCA9IHRydWU7XHJcblx0ICAgIGlzTmVlZENsZWFuVXAgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXQoaXNOZWVkQ2xlYW5VcCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlRnJvbVBhcmVudCh0aGlzLl9pc05lZWRDbGVhblVwKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDpmdW5jdGlvbihpc05lZWRDbGVhblVwKXtcclxuICAgICAgICB0aGlzLl9pc05lZWRDbGVhblVwID0gaXNOZWVkQ2xlYW5VcDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgY2MuUmVtb3ZlU2VsZih0aGlzLl9pc05lZWRDbGVhblVwKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLlJlbW92ZVNlbGYodGhpcy5faXNOZWVkQ2xlYW5VcCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQ3JlYXRlIGEgUmVtb3ZlU2VsZiBvYmplY3Qgd2l0aCBhIGZsYWcgaW5kaWNhdGUgd2hldGhlciB0aGUgdGFyZ2V0IHNob3VsZCBiZSBjbGVhbmVkIHVwIHdoaWxlIHJlbW92aW5nLlxyXG4gKiAhI3poIOS7jueItuiKgueCueenu+mZpOiHqui6q+OAglxyXG4gKiBAbWV0aG9kIHJlbW92ZVNlbGZcclxuICogQHBhcmFtIHtCb29sZWFufSBbaXNOZWVkQ2xlYW5VcCA9IHRydWVdXHJcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIHJlbW92ZVNlbGZBY3Rpb24gPSBjYy5yZW1vdmVTZWxmKCk7XHJcbiAqL1xyXG5jYy5yZW1vdmVTZWxmID0gZnVuY3Rpb24oaXNOZWVkQ2xlYW5VcCl7XHJcbiAgICByZXR1cm4gbmV3IGNjLlJlbW92ZVNlbGYoaXNOZWVkQ2xlYW5VcCk7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBDcmVhdGUgYW4gYWN0aW9uIHRvIGRlc3Ryb3kgc2VsZi5cclxuICogQGNsYXNzIERlc3Ryb3lTZWxmXHJcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIGRlc3Ryb3lTZWxmQWN0aW9uID0gbmV3IGNjLkRlc3Ryb3lTZWxmKCk7XHJcbiAqL1xyXG5jYy5EZXN0cm95U2VsZiA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5EZXN0cm95U2VsZicsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxyXG5cclxuICAgIHVwZGF0ZSAoKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLkRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLkRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRGVzdHJveSBzZWxmXHJcbiAqICEjemgg5Yib5bu65LiA5Liq6ZSA5q+B6Ieq6Lqr55qE5Yqo5L2c44CCXHJcbiAqIEBtZXRob2QgZGVzdHJveVNlbGZcclxuICogQHJldHVybiB7QWN0aW9uSW5zdGFudH1cclxuICpcclxuICogQGV4YW1wbGVcclxuICogdmFyIGRlc3Ryb3lTZWxmQWN0aW9uID0gY2MuZGVzdHJveVNlbGYoKTtcclxuICovXHJcbmNjLmRlc3Ryb3lTZWxmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5EZXN0cm95U2VsZigpO1xyXG59O1xyXG5cclxuLypcclxuICogRmxpcHMgdGhlIHNwcml0ZSBob3Jpem9udGFsbHkuXHJcbiAqIEBjbGFzcyBGbGlwWFxyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnN0YW50XHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcCBJbmRpY2F0ZSB3aGV0aGVyIHRoZSB0YXJnZXQgc2hvdWxkIGJlIGZsaXBwZWQgb3Igbm90XHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBmbGlwWEFjdGlvbiA9IG5ldyBjYy5GbGlwWCh0cnVlKTtcclxuICovXHJcbmNjLkZsaXBYID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkZsaXBYJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkluc3RhbnQsXHJcblxyXG4gICAgY3RvcjpmdW5jdGlvbihmbGlwKXtcclxuICAgICAgICB0aGlzLl9mbGlwcGVkWCA9IGZhbHNlO1xyXG5cdFx0ZmxpcCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhGbGlwWChmbGlwKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIGluaXRpYWxpemVzIHRoZSBhY3Rpb24gd2l0aCBhIHNldCBmbGlwWC5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhGbGlwWDpmdW5jdGlvbiAoZmxpcCkge1xyXG4gICAgICAgIHRoaXMuX2ZsaXBwZWRYID0gZmxpcDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IE1hdGguYWJzKHRoaXMudGFyZ2V0LnNjYWxlWCkgKiAodGhpcy5fZmxpcHBlZFggPyAtMSA6IDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGNjLkZsaXBYKCF0aGlzLl9mbGlwcGVkWCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5GbGlwWCgpO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEZsaXBYKHRoaXMuX2ZsaXBwZWRYKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENyZWF0ZSBhIEZsaXBYIGFjdGlvbiB0byBmbGlwIG9yIHVuZmxpcCB0aGUgdGFyZ2V0LlxyXG4gKiAhI3poIFjovbTnv7vovazjgIJcclxuICogQG1ldGhvZCBmbGlwWFxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZsaXAgSW5kaWNhdGUgd2hldGhlciB0aGUgdGFyZ2V0IHNob3VsZCBiZSBmbGlwcGVkIG9yIG5vdFxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgZmxpcFhBY3Rpb24gPSBjYy5mbGlwWCh0cnVlKTtcclxuICovXHJcbmNjLmZsaXBYID0gZnVuY3Rpb24gKGZsaXApIHtcclxuICAgIHJldHVybiBuZXcgY2MuRmxpcFgoZmxpcCk7XHJcbn07XHJcblxyXG4vKlxyXG4gKiBGbGlwcyB0aGUgc3ByaXRlIHZlcnRpY2FsbHlcclxuICogQGNsYXNzIEZsaXBZXHJcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcclxuICogQHBhcmFtIHtCb29sZWFufSBmbGlwXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBmbGlwWUFjdGlvbiA9IG5ldyBjYy5GbGlwWSh0cnVlKTtcclxuICovXHJcbmNjLkZsaXBZID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkZsaXBZJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkluc3RhbnQsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oZmxpcCl7XHJcbiAgICAgICAgdGhpcy5fZmxpcHBlZFkgPSBmYWxzZTtcclxuXHRcdGZsaXAgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXRXaXRoRmxpcFkoZmxpcCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBpbml0aWFsaXplcyB0aGUgYWN0aW9uIHdpdGggYSBzZXQgZmxpcFkuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZsaXBcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoRmxpcFk6ZnVuY3Rpb24gKGZsaXApIHtcclxuICAgICAgICB0aGlzLl9mbGlwcGVkWSA9IGZsaXA7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLnRhcmdldC5zY2FsZVkgPSBNYXRoLmFicyh0aGlzLnRhcmdldC5zY2FsZVkpICogKHRoaXMuX2ZsaXBwZWRZID8gLTEgOiAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmV2ZXJzZTpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5GbGlwWSghdGhpcy5fZmxpcHBlZFkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuRmxpcFkoKTtcclxuICAgICAgICBhY3Rpb24uaW5pdFdpdGhGbGlwWSh0aGlzLl9mbGlwcGVkWSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGUgYSBGbGlwWSBhY3Rpb24gdG8gZmxpcCBvciB1bmZsaXAgdGhlIHRhcmdldC5cclxuICogISN6aCBZ6L2057+76L2s44CCXHJcbiAqIEBtZXRob2QgZmxpcFlcclxuICogQHBhcmFtIHtCb29sZWFufSBmbGlwXHJcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBmbGlwWUFjdGlvbiA9IGNjLmZsaXBZKHRydWUpO1xyXG4gKi9cclxuY2MuZmxpcFkgPSBmdW5jdGlvbiAoZmxpcCkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5GbGlwWShmbGlwKTtcclxufTtcclxuXHJcbi8qXHJcbiAqIFBsYWNlcyB0aGUgbm9kZSBpbiBhIGNlcnRhaW4gcG9zaXRpb25cclxuICogQGNsYXNzIFBsYWNlXHJcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcclxuICogQHBhcmFtIHtWZWMyfE51bWJlcn0gcG9zXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cclxuICogQGV4YW1wbGVcclxuICogdmFyIHBsYWNlQWN0aW9uID0gbmV3IGNjLlBsYWNlKGNjLnYyKDIwMCwgMjAwKSk7XHJcbiAqIHZhciBwbGFjZUFjdGlvbiA9IG5ldyBjYy5QbGFjZSgyMDAsIDIwMCk7XHJcbiAqL1xyXG5jYy5QbGFjZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5QbGFjZScsXHJcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24ocG9zLCB5KXtcclxuICAgICAgICB0aGlzLl94ID0gMDtcclxuXHQgICAgdGhpcy5feSA9IDA7XHJcblxyXG5cdFx0aWYgKHBvcyAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGlmIChwb3MueCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0eSA9IHBvcy55O1xyXG5cdFx0XHRcdHBvcyA9IHBvcy54O1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW5pdFdpdGhQb3NpdGlvbihwb3MsIHkpO1xyXG5cdFx0fVxyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYSBQbGFjZSBhY3Rpb24gd2l0aCBhIHBvc2l0aW9uXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGluaXRXaXRoUG9zaXRpb246IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgdGhpcy5feCA9IHg7XHJcbiAgICAgICAgdGhpcy5feSA9IHk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICB0aGlzLnRhcmdldC5zZXRQb3NpdGlvbih0aGlzLl94LCB0aGlzLl95KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgYWN0aW9uID0gbmV3IGNjLlBsYWNlKCk7XHJcbiAgICAgICAgYWN0aW9uLmluaXRXaXRoUG9zaXRpb24odGhpcy5feCwgdGhpcy5feSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGVzIGEgUGxhY2UgYWN0aW9uIHdpdGggYSBwb3NpdGlvbi5cclxuICogISN6aCDmlL7nva7lnKjnm67moIfkvY3nva7jgIJcclxuICogQG1ldGhvZCBwbGFjZVxyXG4gKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3NcclxuICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxyXG4gKiBAcmV0dXJuIHtBY3Rpb25JbnN0YW50fVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBwbGFjZUFjdGlvbiA9IGNjLnBsYWNlKGNjLnYyKDIwMCwgMjAwKSk7XHJcbiAqIHZhciBwbGFjZUFjdGlvbiA9IGNjLnBsYWNlKDIwMCwgMjAwKTtcclxuICovXHJcbmNjLnBsYWNlID0gZnVuY3Rpb24gKHBvcywgeSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5QbGFjZShwb3MsIHkpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIENhbGxzIGEgJ2NhbGxiYWNrJy5cclxuICogQGNsYXNzIENhbGxGdW5jXHJcbiAqIEBleHRlbmRzIEFjdGlvbkluc3RhbnRcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3JcclxuICogQHBhcmFtIHtvYmplY3R9IFtzZWxlY3RvclRhcmdldD1udWxsXVxyXG4gKiBAcGFyYW0geyp9IFtkYXRhPW51bGxdIGRhdGEgZm9yIGZ1bmN0aW9uLCBpdCBhY2NlcHRzIGFsbCBkYXRhIHR5cGVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIC8vIENhbGxGdW5jIHdpdGhvdXQgZGF0YVxyXG4gKiB2YXIgZmluaXNoID0gbmV3IGNjLkNhbGxGdW5jKHRoaXMucmVtb3ZlU3ByaXRlLCB0aGlzKTtcclxuICpcclxuICogLy8gQ2FsbEZ1bmMgd2l0aCBkYXRhXHJcbiAqIHZhciBmaW5pc2ggPSBuZXcgY2MuQ2FsbEZ1bmModGhpcy5yZW1vdmVGcm9tUGFyZW50QW5kQ2xlYW51cCwgdGhpcywgIHRydWUpO1xyXG4gKi9cclxuY2MuQ2FsbEZ1bmMgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQ2FsbEZ1bmMnLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW5zdGFudCxcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ29uc3RydWN0b3IgZnVuY3Rpb24sIG92ZXJyaWRlIGl0IHRvIGV4dGVuZCB0aGUgY29uc3RydWN0aW9uIGJlaGF2aW9yLCByZW1lbWJlciB0byBjYWxsIFwidGhpcy5fc3VwZXIoKVwiIGluIHRoZSBleHRlbmRlZCBcImN0b3JcIiBmdW5jdGlvbi4gPGJyIC8+XHJcblx0ICogQ3JlYXRlcyBhIENhbGxGdW5jIGFjdGlvbiB3aXRoIHRoZSBjYWxsYmFjay5cclxuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBzZWxlY3RvclxyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBbc2VsZWN0b3JUYXJnZXQ9bnVsbF1cclxuXHQgKiBAcGFyYW0geyp9IFtkYXRhPW51bGxdIGRhdGEgZm9yIGZ1bmN0aW9uLCBpdCBhY2NlcHRzIGFsbCBkYXRhIHR5cGVzLlxyXG5cdCAqL1xyXG4gICAgY3RvcjpmdW5jdGlvbihzZWxlY3Rvciwgc2VsZWN0b3JUYXJnZXQsIGRhdGEpe1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdG9yVGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9mdW5jdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbml0V2l0aEZ1bmN0aW9uKHNlbGVjdG9yLCBzZWxlY3RvclRhcmdldCwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uIHdpdGggYSBmdW5jdGlvbiBvciBmdW5jdGlvbiBhbmQgaXRzIHRhcmdldFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3JcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fE51bGx9IHNlbGVjdG9yVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0geyp8TnVsbH0gW2RhdGFdIGRhdGEgZm9yIGZ1bmN0aW9uLCBpdCBhY2NlcHRzIGFsbCBkYXRhIHR5cGVzLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhGdW5jdGlvbjpmdW5jdGlvbiAoc2VsZWN0b3IsIHNlbGVjdG9yVGFyZ2V0LCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Z1bmN0aW9uID0gc2VsZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxlY3RvclRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvclRhcmdldCA9IHNlbGVjdG9yVGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uLlxyXG4gICAgICovXHJcbiAgICBleGVjdXRlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fZnVuY3Rpb24uY2FsbCh0aGlzLl9zZWxlY3RvclRhcmdldCwgdGhpcy50YXJnZXQsIHRoaXMuX2RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0IHNlbGVjdG9yVGFyZ2V0LlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRUYXJnZXRDYWxsYmFjazpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdG9yVGFyZ2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogU2V0IHNlbGVjdG9yVGFyZ2V0LlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNlbFxyXG4gICAgICovXHJcbiAgICBzZXRUYXJnZXRDYWxsYmFjazpmdW5jdGlvbiAoc2VsKSB7XHJcbiAgICAgICAgaWYgKHNlbCAhPT0gdGhpcy5fc2VsZWN0b3JUYXJnZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdG9yVGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3JUYXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvclRhcmdldCA9IHNlbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBjYy5DYWxsRnVuYygpO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aEZ1bmN0aW9uKHRoaXMuX2Z1bmN0aW9uLCB0aGlzLl9zZWxlY3RvclRhcmdldCwgdGhpcy5fZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDcmVhdGVzIHRoZSBhY3Rpb24gd2l0aCB0aGUgY2FsbGJhY2suXHJcbiAqICEjemgg5omn6KGM5Zue6LCD5Ye95pWw44CCXHJcbiAqIEBtZXRob2QgY2FsbEZ1bmNcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc2VsZWN0b3JcclxuICogQHBhcmFtIHtvYmplY3R9IFtzZWxlY3RvclRhcmdldD1udWxsXVxyXG4gKiBAcGFyYW0geyp9IFtkYXRhPW51bGxdIC0gZGF0YSBmb3IgZnVuY3Rpb24sIGl0IGFjY2VwdHMgYWxsIGRhdGEgdHlwZXMuXHJcbiAqIEByZXR1cm4ge0FjdGlvbkluc3RhbnR9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogLy8gQ2FsbEZ1bmMgd2l0aG91dCBkYXRhXHJcbiAqIHZhciBmaW5pc2ggPSBjYy5jYWxsRnVuYyh0aGlzLnJlbW92ZVNwcml0ZSwgdGhpcyk7XHJcbiAqXHJcbiAqIC8vIENhbGxGdW5jIHdpdGggZGF0YVxyXG4gKiB2YXIgZmluaXNoID0gY2MuY2FsbEZ1bmModGhpcy5yZW1vdmVGcm9tUGFyZW50QW5kQ2xlYW51cCwgdGhpcy5fZ3Jvc3NpbmksICB0cnVlKTtcclxuICovXHJcbmNjLmNhbGxGdW5jID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBzZWxlY3RvclRhcmdldCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5DYWxsRnVuYyhzZWxlY3Rvciwgc2VsZWN0b3JUYXJnZXQsIGRhdGEpO1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==