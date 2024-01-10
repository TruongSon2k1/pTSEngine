
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/actions/tween.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _bezier = require("../animation/bezier");

var _tweenID = 0;
var TweenAction = cc.Class({
  name: 'cc.TweenAction',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, props, opts) {
    this._opts = opts = opts || Object.create(null);
    this._props = Object.create(null); // global easing or progress used for this action

    opts.progress = opts.progress || this.progress;

    if (opts.easing && typeof opts.easing === 'string') {
      var easingName = opts.easing;
      opts.easing = cc.easing[easingName];
      !opts.easing && cc.warnID(1031, easingName);
    }

    var relative = this._opts.relative;

    for (var name in props) {
      var value = props[name]; // property may have custom easing or progress function

      var easing = void 0,
          progress = void 0;

      if (value.value !== undefined && (value.easing || value.progress)) {
        if (typeof value.easing === 'string') {
          easing = cc.easing[value.easing];
          !easing && cc.warnID(1031, value.easing);
        } else {
          easing = value.easing;
        }

        progress = value.progress;
        value = value.value;
      }

      var isNumber = typeof value === 'number';

      if (!isNumber && (!value.lerp || relative && !value.add && !value.mul || !value.clone)) {
        cc.warn("Can not animate " + name + " property, because it do not have [lerp, (add|mul), clone] function.");
        continue;
      }

      var prop = Object.create(null);
      prop.value = value;
      prop.easing = easing;
      prop.progress = progress;
      this._props[name] = prop;
    }

    this._originProps = props;
    this.initWithDuration(duration);
  },
  clone: function clone() {
    var action = new TweenAction(this._duration, this._originProps, this._opts);

    this._cloneDecoration(action);

    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var relative = !!this._opts.relative;
    var props = this._props;

    for (var name in props) {
      var value = target[name];
      var prop = props[name];

      if (typeof value === 'number') {
        prop.start = value;
        prop.current = value;
        prop.end = relative ? value + prop.value : prop.value;
      } else {
        prop.start = value.clone();
        prop.current = value.clone();
        prop.end = relative ? (value.add || value.mul).call(value, prop.value) : prop.value;
      }
    }
  },
  update: function update(t) {
    var opts = this._opts;
    var easingTime = t;
    if (opts.easing) easingTime = opts.easing(t);
    var target = this.target;
    if (!target) return;
    var props = this._props;
    var progress = opts.progress;

    for (var name in props) {
      var prop = props[name];
      var time = prop.easing ? prop.easing(t) : easingTime;
      var current = prop.current = (prop.progress || progress)(prop.start, prop.end, prop.current, time);
      target[name] = current;
    }

    var onUpdate = opts.onUpdate;

    if (onUpdate) {
      onUpdate(target, t);
    }
  },
  progress: function progress(start, end, current, t) {
    if (typeof start === 'number') {
      current = start + (end - start) * t;
    } else {
      start.lerp(end, t, current);
    }

    return current;
  }
});
var SetAction = cc.Class({
  name: 'cc.SetAction',
  "extends": cc.ActionInstant,
  ctor: function ctor(props) {
    this._props = {};
    props !== undefined && this.init(props);
  },
  init: function init(props) {
    for (var name in props) {
      this._props[name] = props[name];
    }

    return true;
  },
  update: function update() {
    var props = this._props;
    var target = this.target;

    for (var name in props) {
      target[name] = props[name];
    }
  },
  clone: function clone() {
    var action = new SetAction();
    action.init(this._props);
    return action;
  }
});
/**
 * !#en
 * Tween provide a simple and flexible way to create action. Tween's api is more flexible than `cc.Action`:
 *  - Support creating an action sequence in chained api.
 *  - Support animate any objects' any properties, not limited to node's properties. By contrast, `cc.Action` needs to create a new action class to support new node property.
 *  - Support working with `cc.Action`.
 *  - Support easing and progress function.
 * !#zh
 * Tween 提供了一个简单灵活的方法来创建 action。相对于 Cocos 传统的 `cc.Action`，`cc.Tween` 在创建动画上要灵活非常多：
 *  - 支持以链式结构的方式创建一个动画序列。
 *  - 支持对任意对象的任意属性进行缓动，不再局限于节点上的属性，而 `cc.Action` 添加一个属性的支持时还需要添加一个新的 action 类型。
 *  - 支持与 `cc.Action` 混用。
 *  - 支持设置 {{#crossLink "Easing"}}{{/crossLink}} 或者 progress 函数。
 * @class Tween
 * @example
 * cc.tween(node)
 *   .to(1, {scale: 2, position: cc.v3(100, 100, 100)})
 *   .call(() => { console.log('This is a callback'); })
 *   .by(1, {scale: 3, position: cc.v3(200, 200, 200)}, {easing: 'sineOutIn'})
 *   .start(cc.find('Canvas/cocos'));
 * @typescript Tween<T = any>
 */

function Tween(target) {
  this._actions = [];
  this._finalAction = null;
  this._target = target;
  this._tag = cc.Action.TAG_INVALID;
}
/**
 * @method constructor
 * @param {Object} [target]
 */

/**
 * !#en Stop all tweens
 * !#zh 停止所有缓动
 * @method stopAll
 * @static
 */


Tween.stopAll = function () {
  cc.director.getActionManager().removeAllActions();
};
/**
 * !#en Stop all tweens by tag
 * !#zh 停止所有指定标签的缓动
 * @method stopAllByTag
 * @static
 * @param {number} tag
 */


Tween.stopAllByTag = function (tag) {
  cc.director.getActionManager().removeActionByTag(tag);
};
/**
 * !#en Stop all tweens by target
 * !#zh 停止所有指定对象的缓动
 * @method stopAllByTarget
 * @static
 * @param {Object} target
 */


Tween.stopAllByTarget = function (target) {
  cc.director.getActionManager().removeAllActionsFromTarget(target);
};
/**
 * !#en
 * Insert an action or tween to this sequence
 * !#zh
 * 插入一个 action 或者 tween 到队列中
 * @method then
 * @param {Action|Tween} other
 * @return {Tween}
 * @typescript then(other: Action|Tween<T>): Tween<T>
 */


Tween.prototype.then = function (other) {
  if (other instanceof cc.Action) {
    this._actions.push(other.clone());
  } else {
    this._actions.push(other._union());
  }

  return this;
};

Tween.prototype.getTarget = function () {
  return this._target;
};
/**
 * !#en
 * Set tween target
 * !#zh
 * 设置 tween 的 target
 * @method target
 * @param {Object} target
 * @return {Tween}
 * @typescript target(target: any): Tween<T>
 */


Tween.prototype.target = function (target) {
  this._target = target;
  return this;
};
/**
 * !#en
 * Start this tween
 * !#zh
 * 运行当前 tween
 * @method start
 * @return {Tween}
 * @typescript start(): Tween<T>
 */


Tween.prototype.start = function () {
  var target = this._target;

  if (!target) {
    cc.warn('Please set target to tween first');
    return this;
  }

  if (target instanceof cc.Object && !target.isValid) {
    return;
  }

  if (this._finalAction) {
    cc.director.getActionManager().removeAction(this._finalAction);
  }

  this._finalAction = this._union();

  if (target._id === undefined) {
    target._id = ++_tweenID;
  }

  this._finalAction.setTag(this._tag);

  cc.director.getActionManager().addAction(this._finalAction, target, false);
  return this;
};
/**
 * !#en
 * Stop this tween
 * !#zh
 * 停止当前 tween
 * @method stop
 * @return {Tween}
 * @typescript stop(): Tween<T>
 */


Tween.prototype.stop = function () {
  if (this._finalAction) {
    cc.director.getActionManager().removeAction(this._finalAction);
  }

  return this;
};
/**
 * !#en Sets tween tag
 * !#zh 设置缓动的标签
 * @method tag
 * @param {number} tag
 * @return {Tween}
 * @typescript tag(tag: number): Tween<T>
 */


Tween.prototype.tag = function (tag) {
  this._tag = tag;
  return this;
};
/**
 * !#en
 * Clone a tween
 * !#zh
 * 克隆当前 tween
 * @method clone
 * @param {Object} [target]
 * @return {Tween}
 * @typescript clone(target?: any): Tween<T>
 */


Tween.prototype.clone = function (target) {
  var action = this._union();

  return cc.tween(target).then(action.clone());
};
/**
 * !#en
 * Integrate all previous actions to an action.
 * !#zh
 * 将之前所有的 action 整合为一个 action。
 * @method union
 * @return {Tween}
 * @typescritp union(): Tween<T>
 */


Tween.prototype.union = function () {
  var action = this._union();

  this._actions.length = 0;

  this._actions.push(action);

  return this;
};

Tween.prototype._union = function () {
  var actions = this._actions;

  if (actions.length === 1) {
    actions = actions[0];
  } else {
    actions = cc.sequence(actions);
  }

  return actions;
};

Object.assign(Tween.prototype, {
  /**
   * !#en Sets target's position property according to the bezier curve.
   * !#zh 按照贝塞尔路径设置目标的 position 属性。
   * @method bezierTo
   * @param {number} duration
   * @param {cc.Vec2} c1
   * @param {cc.Vec2} c2
   * @param {cc.Vec2} to
   * @return {Tween}
   * @typescript bezierTo(duration: number, c1: Vec2, c2: Vec2, to: Vec2): Tween<T>
   */
  bezierTo: function bezierTo(duration, c1, c2, to, opts) {
    var c0x = c1.x,
        c0y = c1.y,
        c1x = c2.x,
        c1y = c2.y;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      current.x = (0, _bezier.bezier)(start.x, c0x, c1x, end.x, t);
      current.y = (0, _bezier.bezier)(start.y, c0y, c1y, end.y, t);
      return current;
    };

    return this.to(duration, {
      position: to
    }, opts);
  },

  /**
   * !#en Sets target's position property according to the bezier curve.
   * !#zh 按照贝塞尔路径设置目标的 position 属性。
   * @method bezierBy
   * @param {number} duration
   * @param {cc.Vec2} c1
   * @param {cc.Vec2} c2
   * @param {cc.Vec2} to
   * @return {Tween}
   * @typescript bezierBy(duration: number, c1: Vec2, c2: Vec2, to: Vec2): Tween<T>
   */
  bezierBy: function bezierBy(duration, c1, c2, to, opts) {
    var c0x = c1.x,
        c0y = c1.y,
        c1x = c2.x,
        c1y = c2.y;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      var sx = start.x,
          sy = start.y;
      current.x = (0, _bezier.bezier)(sx, c0x + sx, c1x + sx, end.x, t);
      current.y = (0, _bezier.bezier)(sy, c0y + sy, c1y + sy, end.y, t);
      return current;
    };

    return this.by(duration, {
      position: to
    }, opts);
  },

  /**
   * !#en Flips target's scaleX
   * !#zh 翻转目标的 scaleX 属性
   * @method flipX
   * @return {Tween}
   * @typescript flipX(): Tween<T>
   */
  flipX: function flipX() {
    var _this = this;

    return this.call(function () {
      _this._target.scaleX *= -1;
    }, this);
  },

  /**
   * !#en Flips target's scaleY
   * !#zh 翻转目标的 scaleY 属性
   * @method flipY
   * @return {Tween}
   * @typescript flipY(): Tween<T>
   */
  flipY: function flipY() {
    var _this2 = this;

    return this.call(function () {
      _this2._target.scaleY *= -1;
    }, this);
  },

  /**
   * !#en Blinks target by set target's opacity property
   * !#zh 通过设置目标的 opacity 属性达到闪烁效果
   * @method blink
   * @param {number} duration
   * @param {number} times
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript blink(duration: number, times: number, opts?: {progress?: Function; easing?: Function|string; }): Tween<T>
   */
  blink: function blink(duration, times, opts) {
    var slice = 1.0 / times;
    opts = opts || Object.create(null);

    opts.progress = function (start, end, current, t) {
      if (t >= 1) {
        return start;
      } else {
        var m = t % slice;
        return m > slice / 2 ? 255 : 0;
      }
    };

    return this.to(duration, {
      opacity: 1
    }, opts);
  }
});
var tmp_args = [];

function wrapAction(action) {
  return function () {
    tmp_args.length = 0;

    for (var l = arguments.length, i = 0; i < l; i++) {
      var arg = tmp_args[i] = arguments[i];

      if (arg instanceof Tween) {
        tmp_args[i] = arg._union();
      }
    }

    return action.apply(this, tmp_args);
  };
}

var actions = {
  /**
   * !#en
   * Add an action which calculate with absolute value
   * !#zh
   * 添加一个对属性进行绝对值计算的 action
   * @method to
   * @param {Number} duration
   * @param {Object} props - {scale: 2, position: cc.v3(100, 100, 100)}
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript
   * to<OPTS extends Partial<{ progress: Function, easing: Function | String, onUpdate: Function }>>(duration: number, props: ConstructorType<T>, opts?: OPTS): Tween<T>
   */
  to: function to(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = false;
    return new TweenAction(duration, props, opts);
  },

  /**
   * !#en
   * Add an action which calculate with relative value
   * !#zh
   * 添加一个对属性进行相对值计算的 action
   * @method by
   * @param {Number} duration
   * @param {Object} props - {scale: 2, position: cc.v3(100, 100, 100)}
   * @param {Object} [opts]
   * @param {Function} [opts.progress]
   * @param {Function|String} [opts.easing]
   * @return {Tween}
   * @typescript
   * by<OPTS extends Partial<{ progress: Function, easing: Function | String, onUpdate: Function }>>(duration: number, props: ConstructorType<T>, opts?: OPTS): Tween<T>
   */
  by: function by(duration, props, opts) {
    opts = opts || Object.create(null);
    opts.relative = true;
    return new TweenAction(duration, props, opts);
  },

  /**
   * !#en
   * Directly set target properties
   * !#zh
   * 直接设置 target 的属性
   * @method set
   * @param {Object} props
   * @return {Tween}
   * @typescript
   * set (props: ConstructorType<T>) : Tween<T>
   */
  set: function set(props) {
    return new SetAction(props);
  },

  /**
   * !#en
   * Add an delay action
   * !#zh
   * 添加一个延时 action
   * @method delay
   * @param {Number} duration
   * @return {Tween}
   * @typescript delay(duration: number): Tween<T>
   */
  delay: cc.delayTime,

  /**
   * !#en
   * Add an callback action
   * !#zh
   * 添加一个回调 action
   * @method call
   * @param {Function} callback
   * @param {object} [selectTarget]
   * @return {Tween}
   * @typescript call(callback: Function, selectTarget?: object): Tween<T>
   */
  call: cc.callFunc,

  /**
   * !#en
   * Add an hide action
   * !#zh
   * 添加一个隐藏 action
   * @method hide
   * @return {Tween}
   * @typescript hide(): Tween<T>
   */
  hide: cc.hide,

  /**
   * !#en
   * Add an show action
   * !#zh
   * 添加一个显示 action
   * @method show
   * @return {Tween}
   * @typescript show(): Tween<T>
   */
  show: cc.show,

  /**
   * !#en
   * Add an removeSelf action
   * !#zh
   * 添加一个移除自己 action
   * @method removeSelf
   * @return {Tween}
   * @typescript removeSelf(): Tween<T>
   */
  removeSelf: cc.removeSelf,

  /**
   * !#en
   * Add an sequence action
   * !#zh
   * 添加一个队列 action
   * @method sequence
   * @param {Action|Tween} action
   * @param {Action|Tween} ...actions
   * @return {Tween}
   * @typescript sequence(action: Action|Tween<T>, ...actions: (Action|Tween<T>)[]): Tween<T>
   */
  sequence: wrapAction(cc.sequence),

  /**
   * !#en
   * Add an parallel action
   * !#zh
   * 添加一个并行 action
   * @method parallel
   * @param {Action|Tween} action
   * @param {Action|Tween} ...actions
   * @return {Tween}
   * @typescript parallel(action: Action|Tween<T>, ...actions: (Action|Tween<T>)[]): Tween<T>
   */
  parallel: wrapAction(cc.spawn)
}; // these action will use previous action as their parameters

var previousAsInputActions = {
  /**
   * !#en
   * Add an repeat action. This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
   * @method repeat
   * @param {Number} repeatTimes
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript repeat(repeatTimes: number, action?: Action|Tween<T>): Tween<T>
   */
  repeat: cc.repeat,

  /**
   * !#en
   * Add an repeat forever action. This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
   * @method repeatForever
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript repeatForever(action?: Action|Tween<T>): Tween<T>
   */
  repeatForever: function repeatForever(action) {
    // TODO: fixed with cc.repeatForever
    return cc.repeat(action, 10e8);
  },

  /**
   * !#en
   * Add an reverse time action. This action will integrate before actions to a sequence action as their parameters.
   * !#zh
   * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
   * @method reverseTime
   * @param {Action | Tween} [action]
   * @return {Tween}
   * @typescript reverseTime(action?: Action|Tween<T>): Tween<T>
   */
  reverseTime: cc.reverseTime
};
var keys = Object.keys(actions);

var _loop = function _loop(i) {
  var key = keys[i];

  Tween.prototype[key] = function () {
    var action = actions[key].apply(this, arguments);

    this._actions.push(action);

    return this;
  };
};

for (var i = 0; i < keys.length; i++) {
  _loop(i);
}

keys = Object.keys(previousAsInputActions);

var _loop2 = function _loop2(_i) {
  var key = keys[_i];

  Tween.prototype[key] = function () {
    var actions = this._actions;
    var action = arguments[arguments.length - 1];
    var length = arguments.length - 1;

    if (action instanceof cc.Tween) {
      action = action._union();
    } else if (!(action instanceof cc.Action)) {
      action = actions[actions.length - 1];
      actions.length -= 1;
      length += 1;
    }

    var args = [action];

    for (var _i2 = 0; _i2 < length; _i2++) {
      args.push(arguments[_i2]);
    }

    action = previousAsInputActions[key].apply(this, args);
    actions.push(action);
    return this;
  };
};

for (var _i = 0; _i < keys.length; _i++) {
  _loop2(_i);
}
/**
 * @module cc
 */

/**
 * @method tween
 * @param {Object} [target] - the target to animate
 * @return {Tween}
 * @typescript
 * tween<T> (target?: T) : Tween<T>
 */


cc.tween = function (target) {
  return new Tween(target);
};

cc.Tween = Tween;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFjdGlvbnNcXHR3ZWVuLmpzIl0sIm5hbWVzIjpbIl90d2VlbklEIiwiVHdlZW5BY3Rpb24iLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFjdGlvbkludGVydmFsIiwiY3RvciIsImR1cmF0aW9uIiwicHJvcHMiLCJvcHRzIiwiX29wdHMiLCJPYmplY3QiLCJjcmVhdGUiLCJfcHJvcHMiLCJwcm9ncmVzcyIsImVhc2luZyIsImVhc2luZ05hbWUiLCJ3YXJuSUQiLCJyZWxhdGl2ZSIsInZhbHVlIiwidW5kZWZpbmVkIiwiaXNOdW1iZXIiLCJsZXJwIiwiYWRkIiwibXVsIiwiY2xvbmUiLCJ3YXJuIiwicHJvcCIsIl9vcmlnaW5Qcm9wcyIsImluaXRXaXRoRHVyYXRpb24iLCJhY3Rpb24iLCJfZHVyYXRpb24iLCJfY2xvbmVEZWNvcmF0aW9uIiwic3RhcnRXaXRoVGFyZ2V0IiwidGFyZ2V0IiwicHJvdG90eXBlIiwiY2FsbCIsInN0YXJ0IiwiY3VycmVudCIsImVuZCIsInVwZGF0ZSIsInQiLCJlYXNpbmdUaW1lIiwidGltZSIsIm9uVXBkYXRlIiwiU2V0QWN0aW9uIiwiQWN0aW9uSW5zdGFudCIsImluaXQiLCJUd2VlbiIsIl9hY3Rpb25zIiwiX2ZpbmFsQWN0aW9uIiwiX3RhcmdldCIsIl90YWciLCJBY3Rpb24iLCJUQUdfSU5WQUxJRCIsInN0b3BBbGwiLCJkaXJlY3RvciIsImdldEFjdGlvbk1hbmFnZXIiLCJyZW1vdmVBbGxBY3Rpb25zIiwic3RvcEFsbEJ5VGFnIiwidGFnIiwicmVtb3ZlQWN0aW9uQnlUYWciLCJzdG9wQWxsQnlUYXJnZXQiLCJyZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldCIsInRoZW4iLCJvdGhlciIsInB1c2giLCJfdW5pb24iLCJnZXRUYXJnZXQiLCJpc1ZhbGlkIiwicmVtb3ZlQWN0aW9uIiwiX2lkIiwic2V0VGFnIiwiYWRkQWN0aW9uIiwic3RvcCIsInR3ZWVuIiwidW5pb24iLCJsZW5ndGgiLCJhY3Rpb25zIiwic2VxdWVuY2UiLCJhc3NpZ24iLCJiZXppZXJUbyIsImMxIiwiYzIiLCJ0byIsImMweCIsIngiLCJjMHkiLCJ5IiwiYzF4IiwiYzF5IiwicG9zaXRpb24iLCJiZXppZXJCeSIsInN4Iiwic3kiLCJieSIsImZsaXBYIiwic2NhbGVYIiwiZmxpcFkiLCJzY2FsZVkiLCJibGluayIsInRpbWVzIiwic2xpY2UiLCJtIiwib3BhY2l0eSIsInRtcF9hcmdzIiwid3JhcEFjdGlvbiIsImwiLCJhcmd1bWVudHMiLCJpIiwiYXJnIiwiYXBwbHkiLCJzZXQiLCJkZWxheSIsImRlbGF5VGltZSIsImNhbGxGdW5jIiwiaGlkZSIsInNob3ciLCJyZW1vdmVTZWxmIiwicGFyYWxsZWwiLCJzcGF3biIsInByZXZpb3VzQXNJbnB1dEFjdGlvbnMiLCJyZXBlYXQiLCJyZXBlYXRGb3JldmVyIiwicmV2ZXJzZVRpbWUiLCJrZXlzIiwia2V5IiwiYXJncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQUlBLFFBQVEsR0FBRyxDQUFmO0FBRUEsSUFBSUMsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTRixFQUFFLENBQUNHLGNBRlc7QUFJdkJDLEVBQUFBLElBSnVCLGdCQUlqQkMsUUFKaUIsRUFJUEMsS0FKTyxFQUlBQyxJQUpBLEVBSU07QUFDekIsU0FBS0MsS0FBTCxHQUFhRCxJQUFJLEdBQUdBLElBQUksSUFBSUUsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUE1QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0YsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUFkLENBRnlCLENBSXpCOztBQUNBSCxJQUFBQSxJQUFJLENBQUNLLFFBQUwsR0FBZ0JMLElBQUksQ0FBQ0ssUUFBTCxJQUFpQixLQUFLQSxRQUF0Qzs7QUFDQSxRQUFJTCxJQUFJLENBQUNNLE1BQUwsSUFBZSxPQUFPTixJQUFJLENB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RyxDQUFiLEVBQWdCQSxFQUFDLEdBQUdnQixJQUFJLENBQUNoRCxNQUF6QixFQUFpQ2dDLEVBQUMsRUFBbEMsRUFBc0M7QUFBQSxTQUE3QkEsRUFBNkI7QUEyQnJDO0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTNHLEVBQUUsQ0FBQ3lFLEtBQUgsR0FBVyxVQUFVekMsTUFBVixFQUFrQjtBQUN6QixTQUFPLElBQUljLEtBQUosQ0FBVWQsTUFBVixDQUFQO0FBQ0gsQ0FGRDs7QUFJQWhDLEVBQUUsQ0FBQzhDLEtBQUgsR0FBV0EsS0FBWCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJlemllciB9IGZyb20gJy4uL2FuaW1hdGlvbi9iZXppZXInO1xuXG5sZXQgX3R3ZWVuSUQgPSAwO1xuXG5sZXQgVHdlZW5BY3Rpb24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlR3ZWVuQWN0aW9uJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnRlcnZhbCxcblxuICAgIGN0b3IgKGR1cmF0aW9uLCBwcm9wcywgb3B0cykge1xuICAgICAgICB0aGlzLl9vcHRzID0gb3B0cyA9IG9wdHMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fcHJvcHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgIC8vIGdsb2JhbCBlYXNpbmcgb3IgcHJvZ3Jlc3MgdXNlZCBmb3IgdGhpcyBhY3Rpb25cbiAgICAgICAgb3B0cy5wcm9ncmVzcyA9IG9wdHMucHJvZ3Jlc3MgfHwgdGhpcy5wcm9ncmVzcztcbiAgICAgICAgaWYgKG9wdHMuZWFzaW5nICYmIHR5cGVvZiBvcHRzLmVhc2luZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxldCBlYXNpbmdOYW1lID0gb3B0cy5lYXNpbmc7XG4gICAgICAgICAgICBvcHRzLmVhc2luZyA9IGNjLmVhc2luZ1tlYXNpbmdOYW1lXTtcbiAgICAgICAgICAgICFvcHRzLmVhc2luZyAmJiBjYy53YXJuSUQoMTAzMSwgZWFzaW5nTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVsYXRpdmUgPSB0aGlzLl9vcHRzLnJlbGF0aXZlO1xuXG4gICAgICAgIGZvciAobGV0IG5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHByb3BzW25hbWVdO1xuXG4gICAgICAgICAgICAvLyBwcm9wZXJ0eSBtYXkgaGF2ZSBjdXN0b20gZWFzaW5nIG9yIHByb2dyZXNzIGZ1bmN0aW9uXG4gICAgICAgICAgICBsZXQgZWFzaW5nLCBwcm9ncmVzcztcbiAgICAgICAgICAgIGlmICh2YWx1ZS52YWx1ZSAhPT0gdW5kZWZpbmVkICYmICh2YWx1ZS5lYXNpbmcgfHwgdmFsdWUucHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZS5lYXNpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGVhc2luZyA9IGNjLmVhc2luZ1t2YWx1ZS5lYXNpbmddO1xuICAgICAgICAgICAgICAgICAgICAhZWFzaW5nICYmIGNjLndhcm5JRCgxMDMxLCB2YWx1ZS5lYXNpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nID0gdmFsdWUuZWFzaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IHZhbHVlLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc051bWJlciA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG4gICAgICAgICAgICBpZiAoIWlzTnVtYmVyICYmICghdmFsdWUubGVycCB8fCAocmVsYXRpdmUgJiYgIXZhbHVlLmFkZCAmJiAhdmFsdWUubXVsKSB8fCAhdmFsdWUuY2xvbmUpKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihgQ2FuIG5vdCBhbmltYXRlICR7bmFtZX0gcHJvcGVydHksIGJlY2F1c2UgaXQgZG8gbm90IGhhdmUgW2xlcnAsIChhZGR8bXVsKSwgY2xvbmVdIGZ1bmN0aW9uLmApO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcHJvcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICBwcm9wLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBwcm9wLmVhc2luZyA9IGVhc2luZztcbiAgICAgICAgICAgIHByb3AucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgICAgIHRoaXMuX3Byb3BzW25hbWVdID0gcHJvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29yaWdpblByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbik7XG4gICAgfSxcblxuICAgIGNsb25lICgpIHtcbiAgICAgICAgdmFyIGFjdGlvbiA9IG5ldyBUd2VlbkFjdGlvbih0aGlzLl9kdXJhdGlvbiwgdGhpcy5fb3JpZ2luUHJvcHMsIHRoaXMuX29wdHMpO1xuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9LFxuXG4gICAgc3RhcnRXaXRoVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICAgICAgY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLnN0YXJ0V2l0aFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCk7XG5cbiAgICAgICAgbGV0IHJlbGF0aXZlID0gISF0aGlzLl9vcHRzLnJlbGF0aXZlO1xuICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W25hbWVdO1xuICAgICAgICAgICAgbGV0IHByb3AgPSBwcm9wc1tuYW1lXTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBwcm9wLnN0YXJ0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcHJvcC5jdXJyZW50ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcHJvcC5lbmQgPSByZWxhdGl2ZSA/IHZhbHVlICsgcHJvcC52YWx1ZSA6IHByb3AudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9wLnN0YXJ0ID0gdmFsdWUuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICBwcm9wLmN1cnJlbnQgPSB2YWx1ZS5jbG9uZSgpO1xuICAgICAgICAgICAgICAgIHByb3AuZW5kID0gcmVsYXRpdmUgPyAodmFsdWUuYWRkIHx8IHZhbHVlLm11bCkuY2FsbCh2YWx1ZSwgcHJvcC52YWx1ZSkgOiBwcm9wLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZSAodCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuX29wdHM7XG4gICAgICAgIGxldCBlYXNpbmdUaW1lID0gdDtcbiAgICAgICAgaWYgKG9wdHMuZWFzaW5nKSBlYXNpbmdUaW1lID0gb3B0cy5lYXNpbmcodCk7XG5cbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBvcHRzLnByb2dyZXNzO1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBsZXQgcHJvcCA9IHByb3BzW25hbWVdO1xuICAgICAgICAgICAgbGV0IHRpbWUgPSBwcm9wLmVhc2luZyA/IHByb3AuZWFzaW5nKHQpIDogZWFzaW5nVGltZTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gcHJvcC5jdXJyZW50ID0gKHByb3AucHJvZ3Jlc3MgfHwgcHJvZ3Jlc3MpKHByb3Auc3RhcnQsIHByb3AuZW5kLCBwcm9wLmN1cnJlbnQsIHRpbWUpO1xuICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY3VycmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvblVwZGF0ZSA9IG9wdHMub25VcGRhdGU7XG4gICAgICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgICAgICAgb25VcGRhdGUodGFyZ2V0LCB0KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHByb2dyZXNzIChzdGFydCwgZW5kLCBjdXJyZW50LCB0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjdXJyZW50ID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YXJ0LmxlcnAoZW5kLCB0LCBjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICB9XG59KTtcblxubGV0IFNldEFjdGlvbiA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2V0QWN0aW9uJyxcbiAgICBleHRlbmRzOiBjYy5BY3Rpb25JbnN0YW50LFxuXG4gICAgY3RvciAocHJvcHMpIHtcbiAgICAgICAgdGhpcy5fcHJvcHMgPSB7fTtcbiAgICAgICAgcHJvcHMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmluaXQocHJvcHMpO1xuICAgIH0sXG5cbiAgICBpbml0IChwcm9wcykge1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9wc1tuYW1lXSA9IHByb3BzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB1cGRhdGUgKCkge1xuICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICBmb3IgKGxldCBuYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBwcm9wc1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9uZSAoKSB7XG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgU2V0QWN0aW9uKCk7XG4gICAgICAgIGFjdGlvbi5pbml0KHRoaXMuX3Byb3BzKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG59KTtcblxuXG5cbi8qKlxuICogISNlblxuICogVHdlZW4gcHJvdmlkZSBhIHNpbXBsZSBhbmQgZmxleGlibGUgd2F5IHRvIGNyZWF0ZSBhY3Rpb24uIFR3ZWVuJ3MgYXBpIGlzIG1vcmUgZmxleGlibGUgdGhhbiBgY2MuQWN0aW9uYDpcbiAqICAtIFN1cHBvcnQgY3JlYXRpbmcgYW4gYWN0aW9uIHNlcXVlbmNlIGluIGNoYWluZWQgYXBpLlxuICogIC0gU3VwcG9ydCBhbmltYXRlIGFueSBvYmplY3RzJyBhbnkgcHJvcGVydGllcywgbm90IGxpbWl0ZWQgdG8gbm9kZSdzIHByb3BlcnRpZXMuIEJ5IGNvbnRyYXN0LCBgY2MuQWN0aW9uYCBuZWVkcyB0byBjcmVhdGUgYSBuZXcgYWN0aW9uIGNsYXNzIHRvIHN1cHBvcnQgbmV3IG5vZGUgcHJvcGVydHkuXG4gKiAgLSBTdXBwb3J0IHdvcmtpbmcgd2l0aCBgY2MuQWN0aW9uYC5cbiAqICAtIFN1cHBvcnQgZWFzaW5nIGFuZCBwcm9ncmVzcyBmdW5jdGlvbi5cbiAqICEjemhcbiAqIFR3ZWVuIOaPkOS+m+S6huS4gOS4queugOWNleeBtea0u+eahOaWueazleadpeWIm+W7uiBhY3Rpb27jgILnm7jlr7nkuo4gQ29jb3Mg5Lyg57uf55qEIGBjYy5BY3Rpb25g77yMYGNjLlR3ZWVuYCDlnKjliJvlu7rliqjnlLvkuIropoHngbXmtLvpnZ7luLjlpJrvvJpcbiAqICAtIOaUr+aMgeS7pemTvuW8j+e7k+aehOeahOaWueW8j+WIm+W7uuS4gOS4quWKqOeUu+W6j+WIl+OAglxuICogIC0g5pSv5oyB5a+55Lu75oSP5a+56LGh55qE5Lu75oSP5bGe5oCn6L+b6KGM57yT5Yqo77yM5LiN5YaN5bGA6ZmQ5LqO6IqC54K55LiK55qE5bGe5oCn77yM6ICMIGBjYy5BY3Rpb25gIOa3u+WKoOS4gOS4quWxnuaAp+eahOaUr+aMgeaXtui/mOmcgOimgea3u+WKoOS4gOS4quaWsOeahCBhY3Rpb24g57G75Z6L44CCXG4gKiAgLSDmlK/mjIHkuI4gYGNjLkFjdGlvbmAg5re355So44CCXG4gKiAgLSDmlK/mjIHorr7nva4ge3sjY3Jvc3NMaW5rIFwiRWFzaW5nXCJ9fXt7L2Nyb3NzTGlua319IOaIluiAhSBwcm9ncmVzcyDlh73mlbDjgIJcbiAqIEBjbGFzcyBUd2VlblxuICogQGV4YW1wbGVcbiAqIGNjLnR3ZWVuKG5vZGUpXG4gKiAgIC50bygxLCB7c2NhbGU6IDIsIHBvc2l0aW9uOiBjYy52MygxMDAsIDEwMCwgMTAwKX0pXG4gKiAgIC5jYWxsKCgpID0+IHsgY29uc29sZS5sb2coJ1RoaXMgaXMgYSBjYWxsYmFjaycpOyB9KVxuICogICAuYnkoMSwge3NjYWxlOiAzLCBwb3NpdGlvbjogY2MudjMoMjAwLCAyMDAsIDIwMCl9LCB7ZWFzaW5nOiAnc2luZU91dEluJ30pXG4gKiAgIC5zdGFydChjYy5maW5kKCdDYW52YXMvY29jb3MnKSk7XG4gKiBAdHlwZXNjcmlwdCBUd2VlbjxUID0gYW55PlxuICovXG5mdW5jdGlvbiBUd2VlbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5fYWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuX2ZpbmFsQWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fdGFnID0gY2MuQWN0aW9uLlRBR19JTlZBTElEO1xufVxuXG4vKipcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICovXG5cbi8qKlxuICogISNlbiBTdG9wIGFsbCB0d2VlbnNcbiAqICEjemgg5YGc5q2i5omA5pyJ57yT5YqoXG4gKiBAbWV0aG9kIHN0b3BBbGxcbiAqIEBzdGF0aWNcbiAqL1xuVHdlZW4uc3RvcEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9ucygpO1xufVxuLyoqXG4gKiAhI2VuIFN0b3AgYWxsIHR3ZWVucyBieSB0YWdcbiAqICEjemgg5YGc5q2i5omA5pyJ5oyH5a6a5qCH562+55qE57yT5YqoXG4gKiBAbWV0aG9kIHN0b3BBbGxCeVRhZ1xuICogQHN0YXRpY1xuICogQHBhcmFtIHtudW1iZXJ9IHRhZ1xuICovXG5Ud2Vlbi5zdG9wQWxsQnlUYWcgPSBmdW5jdGlvbiAodGFnKSB7XG4gICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbkJ5VGFnKHRhZyk7XG59XG4vKipcbiAqICEjZW4gU3RvcCBhbGwgdHdlZW5zIGJ5IHRhcmdldFxuICogISN6aCDlgZzmraLmiYDmnInmjIflrprlr7nosaHnmoTnvJPliqhcbiAqIEBtZXRob2Qgc3RvcEFsbEJ5VGFyZ2V0XG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKi9cblR3ZWVuLnN0b3BBbGxCeVRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGFyZ2V0KTtcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBJbnNlcnQgYW4gYWN0aW9uIG9yIHR3ZWVuIHRvIHRoaXMgc2VxdWVuY2VcbiAqICEjemhcbiAqIOaPkuWFpeS4gOS4qiBhY3Rpb24g5oiW6ICFIHR3ZWVuIOWIsOmYn+WIl+S4rVxuICogQG1ldGhvZCB0aGVuXG4gKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gb3RoZXJcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgdGhlbihvdGhlcjogQWN0aW9ufFR3ZWVuPFQ+KTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICBpZiAob3RoZXIgaW5zdGFuY2VvZiBjYy5BY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKG90aGVyLmNsb25lKCkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKG90aGVyLl91bmlvbigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5Ud2Vlbi5wcm90b3R5cGUuZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oKVxue1xuICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG59XG5cbi8qKlxuICogISNlblxuICogU2V0IHR3ZWVuIHRhcmdldFxuICogISN6aFxuICog6K6+572uIHR3ZWVuIOeahCB0YXJnZXRcbiAqIEBtZXRob2QgdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcmV0dXJuIHtUd2Vlbn1cbiAqIEB0eXBlc2NyaXB0IHRhcmdldCh0YXJnZXQ6IGFueSk6IFR3ZWVuPFQ+XG4gKi9cblR3ZWVuLnByb3RvdHlwZS50YXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBTdGFydCB0aGlzIHR3ZWVuXG4gKiAhI3poXG4gKiDov5DooYzlvZPliY0gdHdlZW5cbiAqIEBtZXRob2Qgc3RhcnRcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgc3RhcnQoKTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgY2Mud2FybignUGxlYXNlIHNldCB0YXJnZXQgdG8gdHdlZW4gZmlyc3QnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBjYy5PYmplY3QgJiYgIXRhcmdldC5pc1ZhbGlkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZmluYWxBY3Rpb24pIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbih0aGlzLl9maW5hbEFjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuX2ZpbmFsQWN0aW9uID0gdGhpcy5fdW5pb24oKTtcblxuICAgIGlmICh0YXJnZXQuX2lkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0Ll9pZCA9ICsrX3R3ZWVuSUQ7XG4gICAgfVxuXG4gICAgdGhpcy5fZmluYWxBY3Rpb24uc2V0VGFnKHRoaXMuX3RhZyk7XG4gICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLmFkZEFjdGlvbih0aGlzLl9maW5hbEFjdGlvbiwgdGFyZ2V0LCBmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFN0b3AgdGhpcyB0d2VlblxuICogISN6aFxuICog5YGc5q2i5b2T5YmNIHR3ZWVuXG4gKiBAbWV0aG9kIHN0b3BcbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpcHQgc3RvcCgpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fZmluYWxBY3Rpb24pIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbih0aGlzLl9maW5hbEFjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqICEjZW4gU2V0cyB0d2VlbiB0YWdcbiAqICEjemgg6K6+572u57yT5Yqo55qE5qCH562+XG4gKiBAbWV0aG9kIHRhZ1xuICogQHBhcmFtIHtudW1iZXJ9IHRhZ1xuICogQHJldHVybiB7VHdlZW59XG4gKiBAdHlwZXNjcmlwdCB0YWcodGFnOiBudW1iZXIpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUudGFnID0gZnVuY3Rpb24gKHRhZykge1xuICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiAhI2VuXG4gKiBDbG9uZSBhIHR3ZWVuXG4gKiAhI3poXG4gKiDlhYvpmoblvZPliY0gdHdlZW5cbiAqIEBtZXRob2QgY2xvbmVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICogQHJldHVybiB7VHdlZW59XG4gKiBAdHlwZXNjcmlwdCBjbG9uZSh0YXJnZXQ/OiBhbnkpOiBUd2VlbjxUPlxuICovXG5Ud2Vlbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgbGV0IGFjdGlvbiA9IHRoaXMuX3VuaW9uKCk7XG4gICAgcmV0dXJuIGNjLnR3ZWVuKHRhcmdldCkudGhlbihhY3Rpb24uY2xvbmUoKSk7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIEludGVncmF0ZSBhbGwgcHJldmlvdXMgYWN0aW9ucyB0byBhbiBhY3Rpb24uXG4gKiAhI3poXG4gKiDlsIbkuYvliY3miYDmnInnmoQgYWN0aW9uIOaVtOWQiOS4uuS4gOS4qiBhY3Rpb27jgIJcbiAqIEBtZXRob2QgdW5pb25cbiAqIEByZXR1cm4ge1R3ZWVufVxuICogQHR5cGVzY3JpdHAgdW5pb24oKTogVHdlZW48VD5cbiAqL1xuVHdlZW4ucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhY3Rpb24gPSB0aGlzLl91bmlvbigpO1xuICAgIHRoaXMuX2FjdGlvbnMubGVuZ3RoID0gMDtcbiAgICB0aGlzLl9hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cblR3ZWVuLnByb3RvdHlwZS5fdW5pb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGFjdGlvbnMgPSB0aGlzLl9hY3Rpb25zO1xuXG4gICAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zWzBdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYWN0aW9ucyA9IGNjLnNlcXVlbmNlKGFjdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb25zO1xufTtcblxuT2JqZWN0LmFzc2lnbihUd2Vlbi5wcm90b3R5cGUsIHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGFyZ2V0J3MgcG9zaXRpb24gcHJvcGVydHkgYWNjb3JkaW5nIHRvIHRoZSBiZXppZXIgY3VydmUuXG4gICAgICogISN6aCDmjInnhafotJ3loZ7lsJTot6/lvoTorr7nva7nm67moIfnmoQgcG9zaXRpb24g5bGe5oCn44CCXG4gICAgICogQG1ldGhvZCBiZXppZXJUb1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBwYXJhbSB7Y2MuVmVjMn0gYzFcbiAgICAgKiBAcGFyYW0ge2NjLlZlYzJ9IGMyXG4gICAgICogQHBhcmFtIHtjYy5WZWMyfSB0b1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IGJlemllclRvKGR1cmF0aW9uOiBudW1iZXIsIGMxOiBWZWMyLCBjMjogVmVjMiwgdG86IFZlYzIpOiBUd2VlbjxUPlxuICAgICAqL1xuICAgIGJlemllclRvIChkdXJhdGlvbiwgYzEsIGMyLCB0bywgb3B0cykge1xuICAgICAgICBsZXQgYzB4ID0gYzEueCwgYzB5ID0gYzEueSxcbiAgICAgICAgICAgIGMxeCA9IGMyLngsIGMxeSA9IGMyLnk7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIG9wdHMucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCwgY3VycmVudCwgdCkge1xuICAgICAgICAgICAgY3VycmVudC54ID0gYmV6aWVyKHN0YXJ0LngsIGMweCwgYzF4LCBlbmQueCwgdCk7XG4gICAgICAgICAgICBjdXJyZW50LnkgPSBiZXppZXIoc3RhcnQueSwgYzB5LCBjMXksIGVuZC55LCB0KTtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvKGR1cmF0aW9uLCB7IHBvc2l0aW9uOiB0byB9LCBvcHRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRhcmdldCdzIHBvc2l0aW9uIHByb3BlcnR5IGFjY29yZGluZyB0byB0aGUgYmV6aWVyIGN1cnZlLlxuICAgICAqICEjemgg5oyJ54Wn6LSd5aGe5bCU6Lev5b6E6K6+572u55uu5qCH55qEIHBvc2l0aW9uIOWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgYmV6aWVyQnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge2NjLlZlYzJ9IGMxXG4gICAgICogQHBhcmFtIHtjYy5WZWMyfSBjMlxuICAgICAqIEBwYXJhbSB7Y2MuVmVjMn0gdG9cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBiZXppZXJCeShkdXJhdGlvbjogbnVtYmVyLCBjMTogVmVjMiwgYzI6IFZlYzIsIHRvOiBWZWMyKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBiZXppZXJCeSAoZHVyYXRpb24sIGMxLCBjMiwgdG8sIG9wdHMpIHtcbiAgICAgICAgbGV0IGMweCA9IGMxLngsIGMweSA9IGMxLnksXG4gICAgICAgICAgICBjMXggPSBjMi54LCBjMXkgPSBjMi55O1xuICAgICAgICBvcHRzID0gb3B0cyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBvcHRzLnByb2dyZXNzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGN1cnJlbnQsIHQpIHtcbiAgICAgICAgICAgIGxldCBzeCA9IHN0YXJ0LngsIHN5ID0gc3RhcnQueTtcbiAgICAgICAgICAgIGN1cnJlbnQueCA9IGJlemllcihzeCwgYzB4ICsgc3gsIGMxeCArIHN4LCBlbmQueCwgdCk7XG4gICAgICAgICAgICBjdXJyZW50LnkgPSBiZXppZXIoc3ksIGMweSArIHN5LCBjMXkgKyBzeSwgZW5kLnksIHQpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYnkoZHVyYXRpb24sIHsgcG9zaXRpb246IHRvIH0sIG9wdHMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsaXBzIHRhcmdldCdzIHNjYWxlWFxuICAgICAqICEjemgg57+76L2s55uu5qCH55qEIHNjYWxlWCDlsZ7mgKdcbiAgICAgKiBAbWV0aG9kIGZsaXBYXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgZmxpcFgoKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBmbGlwWCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGwoKCkgPT4geyB0aGlzLl90YXJnZXQuc2NhbGVYICo9IC0xOyB9LCB0aGlzKTtcblxuICAgIH0sXG4gICAgLyoqXG4gICAgICogISNlbiBGbGlwcyB0YXJnZXQncyBzY2FsZVlcbiAgICAgKiAhI3poIOe/u+i9rOebruagh+eahCBzY2FsZVkg5bGe5oCnXG4gICAgICogQG1ldGhvZCBmbGlwWVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IGZsaXBZKCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgZmxpcFkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsKCgpID0+IHsgdGhpcy5fdGFyZ2V0LnNjYWxlWSAqPSAtMTsgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQmxpbmtzIHRhcmdldCBieSBzZXQgdGFyZ2V0J3Mgb3BhY2l0eSBwcm9wZXJ0eVxuICAgICAqICEjemgg6YCa6L+H6K6+572u55uu5qCH55qEIG9wYWNpdHkg5bGe5oCn6L6+5Yiw6Zeq54OB5pWI5p6cXG4gICAgICogQG1ldGhvZCBibGlua1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wcm9ncmVzc11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gW29wdHMuZWFzaW5nXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IGJsaW5rKGR1cmF0aW9uOiBudW1iZXIsIHRpbWVzOiBudW1iZXIsIG9wdHM/OiB7cHJvZ3Jlc3M/OiBGdW5jdGlvbjsgZWFzaW5nPzogRnVuY3Rpb258c3RyaW5nOyB9KTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBibGluayAoZHVyYXRpb24sIHRpbWVzLCBvcHRzKSB7XG4gICAgICAgIHZhciBzbGljZSA9IDEuMCAvIHRpbWVzO1xuICAgICAgICBvcHRzID0gb3B0cyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBvcHRzLnByb2dyZXNzID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIGN1cnJlbnQsIHQpIHtcbiAgICAgICAgICAgIGlmICh0ID49IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHQgJSBzbGljZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG0gPiAoc2xpY2UgLyAyKSkgPyAyNTUgOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy50byhkdXJhdGlvbiwgeyBvcGFjaXR5OiAxIH0sIG9wdHMpO1xuICAgIH0sXG59KVxuXG5sZXQgdG1wX2FyZ3MgPSBbXTtcblxuZnVuY3Rpb24gd3JhcEFjdGlvbiAoYWN0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdG1wX2FyZ3MubGVuZ3RoID0gMDtcbiAgICAgICAgZm9yIChsZXQgbCA9IGFyZ3VtZW50cy5sZW5ndGgsIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYXJnID0gdG1wX2FyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBpZiAoYXJnIGluc3RhbmNlb2YgVHdlZW4pIHtcbiAgICAgICAgICAgICAgICB0bXBfYXJnc1tpXSA9IGFyZy5fdW5pb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhY3Rpb24uYXBwbHkodGhpcywgdG1wX2FyZ3MpO1xuICAgIH07XG59XG5cbmxldCBhY3Rpb25zID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gYWN0aW9uIHdoaWNoIGNhbGN1bGF0ZSB3aXRoIGFic29sdXRlIHZhbHVlXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quWvueWxnuaAp+i/m+ihjOe7neWvueWAvOiuoeeul+eahCBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0ge3NjYWxlOiAyLCBwb3NpdGlvbjogY2MudjMoMTAwLCAxMDAsIDEwMCl9XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnByb2dyZXNzXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBbb3B0cy5lYXNpbmddXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0bzxPUFRTIGV4dGVuZHMgUGFydGlhbDx7IHByb2dyZXNzOiBGdW5jdGlvbiwgZWFzaW5nOiBGdW5jdGlvbiB8IFN0cmluZywgb25VcGRhdGU6IEZ1bmN0aW9uIH0+PihkdXJhdGlvbjogbnVtYmVyLCBwcm9wczogQ29uc3RydWN0b3JUeXBlPFQ+LCBvcHRzPzogT1BUUyk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgdG8gKGR1cmF0aW9uLCBwcm9wcywgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBvcHRzLnJlbGF0aXZlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgVHdlZW5BY3Rpb24oZHVyYXRpb24sIHByb3BzLCBvcHRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiBhY3Rpb24gd2hpY2ggY2FsY3VsYXRlIHdpdGggcmVsYXRpdmUgdmFsdWVcbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5a+55bGe5oCn6L+b6KGM55u45a+55YC86K6h566X55qEIGFjdGlvblxuICAgICAqIEBtZXRob2QgYnlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgLSB7c2NhbGU6IDIsIHBvc2l0aW9uOiBjYy52MygxMDAsIDEwMCwgMTAwKX1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMucHJvZ3Jlc3NdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IFtvcHRzLmVhc2luZ11cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGJ5PE9QVFMgZXh0ZW5kcyBQYXJ0aWFsPHsgcHJvZ3Jlc3M6IEZ1bmN0aW9uLCBlYXNpbmc6IEZ1bmN0aW9uIHwgU3RyaW5nLCBvblVwZGF0ZTogRnVuY3Rpb24gfT4+KGR1cmF0aW9uOiBudW1iZXIsIHByb3BzOiBDb25zdHJ1Y3RvclR5cGU8VD4sIG9wdHM/OiBPUFRTKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBieSAoZHVyYXRpb24sIHByb3BzLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIG9wdHMucmVsYXRpdmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbmV3IFR3ZWVuQWN0aW9uKGR1cmF0aW9uLCBwcm9wcywgb3B0cyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEaXJlY3RseSBzZXQgdGFyZ2V0IHByb3BlcnRpZXNcbiAgICAgKiAhI3poXG4gICAgICog55u05o6l6K6+572uIHRhcmdldCDnmoTlsZ7mgKdcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2V0IChwcm9wczogQ29uc3RydWN0b3JUeXBlPFQ+KSA6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgc2V0IChwcm9wcykge1xuICAgICAgICByZXR1cm4gbmV3IFNldEFjdGlvbihwcm9wcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gZGVsYXkgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quW7tuaXtiBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIGRlbGF5XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICogQHR5cGVzY3JpcHQgZGVsYXkoZHVyYXRpb246IG51bWJlcik6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgZGVsYXk6IGNjLmRlbGF5VGltZSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIGNhbGxiYWNrIGFjdGlvblxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrlm57osIMgYWN0aW9uXG4gICAgICogQG1ldGhvZCBjYWxsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW3NlbGVjdFRhcmdldF1cbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBjYWxsKGNhbGxiYWNrOiBGdW5jdGlvbiwgc2VsZWN0VGFyZ2V0Pzogb2JqZWN0KTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBjYWxsOiBjYy5jYWxsRnVuYyxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIGhpZGUgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4qumakOiXjyBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIGhpZGVcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBoaWRlKCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgaGlkZTogY2MuaGlkZSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHNob3cgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quaYvuekuiBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHNob3dcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBzaG93KCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgc2hvdzogY2Muc2hvdyxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHJlbW92ZVNlbGYgYWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quenu+mZpOiHquW3sSBhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHJlbW92ZVNlbGZcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCByZW1vdmVTZWxmKCk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcmVtb3ZlU2VsZjogY2MucmVtb3ZlU2VsZixcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHNlcXVlbmNlIGFjdGlvblxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrpmJ/liJcgYWN0aW9uXG4gICAgICogQG1ldGhvZCBzZXF1ZW5jZVxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFR3ZWVufSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gLi4uYWN0aW9uc1xuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHNlcXVlbmNlKGFjdGlvbjogQWN0aW9ufFR3ZWVuPFQ+LCAuLi5hY3Rpb25zOiAoQWN0aW9ufFR3ZWVuPFQ+KVtdKTogVHdlZW48VD5cbiAgICAgKi9cbiAgICBzZXF1ZW5jZTogd3JhcEFjdGlvbihjYy5zZXF1ZW5jZSksXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBhbiBwYXJhbGxlbCBhY3Rpb25cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq5bm26KGMIGFjdGlvblxuICAgICAqIEBtZXRob2QgcGFyYWxsZWxcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxUd2Vlbn0gYWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb258VHdlZW59IC4uLmFjdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKiBAdHlwZXNjcmlwdCBwYXJhbGxlbChhY3Rpb246IEFjdGlvbnxUd2VlbjxUPiwgLi4uYWN0aW9uczogKEFjdGlvbnxUd2VlbjxUPilbXSk6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcGFyYWxsZWw6IHdyYXBBY3Rpb24oY2Muc3Bhd24pXG59O1xuXG4vLyB0aGVzZSBhY3Rpb24gd2lsbCB1c2UgcHJldmlvdXMgYWN0aW9uIGFzIHRoZWlyIHBhcmFtZXRlcnNcbmxldCBwcmV2aW91c0FzSW5wdXRBY3Rpb25zID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gcmVwZWF0IGFjdGlvbi4gVGhpcyBhY3Rpb24gd2lsbCBpbnRlZ3JhdGUgYmVmb3JlIGFjdGlvbnMgdG8gYSBzZXF1ZW5jZSBhY3Rpb24gYXMgdGhlaXIgcGFyYW1ldGVycy5cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5LiA5Liq6YeN5aSNIGFjdGlvbu+8jOi/meS4qiBhY3Rpb24g5Lya5bCG5YmN5LiA5Liq5Yqo5L2c5L2c5Li65LuW55qE5Y+C5pWw44CCXG4gICAgICogQG1ldGhvZCByZXBlYXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVwZWF0VGltZXNcbiAgICAgKiBAcGFyYW0ge0FjdGlvbiB8IFR3ZWVufSBbYWN0aW9uXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHJlcGVhdChyZXBlYXRUaW1lczogbnVtYmVyLCBhY3Rpb24/OiBBY3Rpb258VHdlZW48VD4pOiBUd2VlbjxUPlxuICAgICAqL1xuICAgIHJlcGVhdDogY2MucmVwZWF0LFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgYW4gcmVwZWF0IGZvcmV2ZXIgYWN0aW9uLiBUaGlzIGFjdGlvbiB3aWxsIGludGVncmF0ZSBiZWZvcmUgYWN0aW9ucyB0byBhIHNlcXVlbmNlIGFjdGlvbiBhcyB0aGVpciBwYXJhbWV0ZXJzLlxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDkuIDkuKrmsLjkuYXph43lpI0gYWN0aW9u77yM6L+Z5LiqIGFjdGlvbiDkvJrlsIbliY3kuIDkuKrliqjkvZzkvZzkuLrku5bnmoTlj4LmlbDjgIJcbiAgICAgKiBAbWV0aG9kIHJlcGVhdEZvcmV2ZXJcbiAgICAgKiBAcGFyYW0ge0FjdGlvbiB8IFR3ZWVufSBbYWN0aW9uXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHJlcGVhdEZvcmV2ZXIoYWN0aW9uPzogQWN0aW9ufFR3ZWVuPFQ+KTogVHdlZW48VD5cbiAgICAgKi9cbiAgICByZXBlYXRGb3JldmVyOiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIFRPRE86IGZpeGVkIHdpdGggY2MucmVwZWF0Rm9yZXZlclxuICAgICAgICByZXR1cm4gY2MucmVwZWF0KGFjdGlvbiwgMTBlOCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIGFuIHJldmVyc2UgdGltZSBhY3Rpb24uIFRoaXMgYWN0aW9uIHdpbGwgaW50ZWdyYXRlIGJlZm9yZSBhY3Rpb25zIHRvIGEgc2VxdWVuY2UgYWN0aW9uIGFzIHRoZWlyIHBhcmFtZXRlcnMuXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOS4gOS4quWAkue9ruaXtumXtCBhY3Rpb27vvIzov5nkuKogYWN0aW9uIOS8muWwhuWJjeS4gOS4quWKqOS9nOS9nOS4uuS7lueahOWPguaVsOOAglxuICAgICAqIEBtZXRob2QgcmV2ZXJzZVRpbWVcbiAgICAgKiBAcGFyYW0ge0FjdGlvbiB8IFR3ZWVufSBbYWN0aW9uXVxuICAgICAqIEByZXR1cm4ge1R3ZWVufVxuICAgICAqIEB0eXBlc2NyaXB0IHJldmVyc2VUaW1lKGFjdGlvbj86IEFjdGlvbnxUd2VlbjxUPik6IFR3ZWVuPFQ+XG4gICAgICovXG4gICAgcmV2ZXJzZVRpbWU6IGNjLnJldmVyc2VUaW1lLFxufTtcblxuXG5sZXQga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbnMpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgVHdlZW4ucHJvdG90eXBlW2tleV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSBhY3Rpb25zW2tleV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG59XG5cbmtleXMgPSBPYmplY3Qua2V5cyhwcmV2aW91c0FzSW5wdXRBY3Rpb25zKTtcbmZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgIFR3ZWVuLnByb3RvdHlwZVtrZXldID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGxldCBhY3Rpb25zID0gdGhpcy5fYWN0aW9ucztcbiAgICAgICAgbGV0IGFjdGlvbiA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcblxuICAgICAgICBpZiAoYWN0aW9uIGluc3RhbmNlb2YgY2MuVHdlZW4pIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbi5fdW5pb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKGFjdGlvbiBpbnN0YW5jZW9mIGNjLkFjdGlvbikpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbnNbYWN0aW9ucy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGFjdGlvbnMubGVuZ3RoIC09IDE7XG4gICAgICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhcmdzID0gW2FjdGlvbl07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aW9uID0gcHJldmlvdXNBc0lucHV0QWN0aW9uc1trZXldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBhY3Rpb25zLnB1c2goYWN0aW9uKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xufVxuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgdHdlZW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIHRoZSB0YXJnZXQgdG8gYW5pbWF0ZVxuICogQHJldHVybiB7VHdlZW59XG4gKiBAdHlwZXNjcmlwdFxuICogdHdlZW48VD4gKHRhcmdldD86IFQpIDogVHdlZW48VD5cbiAqL1xuY2MudHdlZW4gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIG5ldyBUd2Vlbih0YXJnZXQpO1xufTtcblxuY2MuVHdlZW4gPSBUd2VlbjtcblxuIl0sInNvdXJjZVJvb3QiOiIvIn0=