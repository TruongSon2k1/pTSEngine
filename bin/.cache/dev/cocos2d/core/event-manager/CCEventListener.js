
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCEventListener.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var js = require('../platform/js');
/**
 * !#en
 * <p>
 *     The base class of event listener.                                                                        <br/>
 *     If you need custom listener which with different callback, you need to inherit this class.               <br/>
 *     For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
 *      EventListenerTouchOneByOne, EventListenerCustom.
 * </p>
 *
 * !#zh
 * 封装用户的事件处理逻辑。
 * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 {{#crossLink "EventListener/create:method"}}cc.EventListener.create{{/crossLink}}。
 *
 * @class EventListener
 */

/**
 * Constructor
 * @method constructor
 * @param {Number} type
 * @param {Number} listenerID
 * @param {Number} callback
 */


cc.EventListener = function (type, listenerID, callback) {
  this._onEvent = callback; // Event callback function

  this._type = type || 0; // Event listener type

  this._listenerID = listenerID || ""; // Event listener ID

  this._registered = false; // Whether the listener has been added to dispatcher.

  this._fixedPriority = 0; // The higher the number, the higher the priority, 0 is for scene graph base priority.

  this._node = null; // scene graph based priority

  this._target = null;
  this._paused = true; // Whether the listener is paused

  this._isEnabled = true; // Whether the listener is enabled
};

cc.EventListener.prototype = {
  constructor: cc.EventListener,

  /*
   * <p>
   *     Sets paused state for the listener
   *     The paused state is only used for scene graph priority listeners.
   *     `EventDispatcher::resumeAllEventListenersForTarget(node)` will set the paused state to `true`,
   *     while `EventDispatcher::pauseAllEventListenersForTarget(node)` will set it to `false`.
   *     @note 1) Fixed priority listeners will never get paused. If a fixed priority doesn't want to receive events,
   *              call `setEnabled(false)` instead.
   *            2) In `Node`'s onEnter and onExit, the `paused state` of the listeners which associated with that node will be automatically updated.
   * </p>
   * @param {Boolean} paused
   * @private
   */
  _setPaused: function _setPaused(paused) {
    this._paused = paused;
  },

  /*
   * Checks whether the listener is paused.
   * @returns {Boolean}
   * @private
   */
  _isPaused: function _isPaused() {
    return this._paused;
  },

  /*
   * Marks the listener was registered by EventDispatcher.
   * @param {Boolean} registered
   * @private
   */
  _setRegistered: function _setRegistered(registered) {
    this._registered = registered;
  },

  /*
   * Checks whether the listener was registered by EventDispatcher
   * @returns {Boolean}
   * @private
   */
  _isRegistered: function _isRegistered() {
    return this._registered;
  },

  /*
   * Gets the type of this listener
   * @note It's different from `EventType`, e.g. TouchEvent has two kinds of event listeners - EventListenerOneByOne, EventListenerAllAtOnce
   * @returns {Number}
   * @private
   */
  _getType: function _getType() {
    return this._type;
  },

  /*
   *  Gets the listener ID of this listener
   *  When event is being dispatched, listener ID is used as key for searching listeners according to event type.
   * @returns {String}
   * @private
   */
  _getListenerID: function _getListenerID() {
    return this._listenerID;
  },

  /*
   * Sets the fixed priority for this listener
   *  @note This method is only used for `fixed priority listeners`, it needs to access a non-zero value. 0 is reserved for scene graph priority listeners
   * @param {Number} fixedPriority
   * @private
   */
  _setFixedPriority: function _setFixedPriority(fixedPriority) {
    this._fixedPriority = fixedPriority;
  },

  /*
   * Gets the fixed priority of this listener
   * @returns {Number} 0 if it's a scene graph priority listener, non-zero for fixed priority listener
   * @private
   */
  _getFixedPriority: function _getFixedPriority() {
    return this._fixedPriority;
  },

  /*
   * Sets scene graph priority for this listener
   * @param {cc.Node} node
   * @private
   */
  _setSceneGraphPriority: function _setSceneGraphPriority(node) {
    this._target = node;
    this._node = node;
  },

  /*
   * Gets scene graph priority of this listener
   * @returns {cc.Node} if it's a fixed priority listener, non-null for scene graph priority listener
   * @private
   */
  _getSceneGraphPriority: function _getSceneGraphPriority() {
    return this._node;
  },

  /**
   * !#en Checks whether the listener is available.
   * !#zh 检测监听器是否有效
   * @method checkAvailable
   * @returns {Boolean}
   */
  checkAvailable: function checkAvailable() {
    return this._onEvent !== null;
  },

  /**
   * !#en Clones the listener, its subclasses have to override this method.
   * !#zh 克隆监听器,它的子类必须重写此方法。
   * @method clone
   * @returns {EventListener}
   */
  clone: function clone() {
    return null;
  },

  /**
   *  !#en Enables or disables the listener
   *  !#zh 启用或禁用监听器。
   *  @method setEnabled
   *  @param {Boolean} enabled
   *  @note Only listeners with `enabled` state will be able to receive events.
   *          When an listener was initialized, it's enabled by default.
   *          An event listener can receive events when it is enabled and is not paused.
   *          paused state is always false when it is a fixed priority listener.
   */
  setEnabled: function setEnabled(enabled) {
    this._isEnabled = enabled;
  },

  /**
   * !#en Checks whether the listener is enabled
   * !#zh 检查监听器是否可用。
   * @method isEnabled
   * @returns {Boolean}
   */
  isEnabled: function isEnabled() {
    return this._isEnabled;
  },

  /*
   * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
   * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
   * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
   * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.<br/>
   * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
   * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
   * The retain function can increase a reference count for the native object to avoid it being released,<br/>
   * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
   * retain and release function call should be paired in developer's game code.</p>
   *
   * @method retain
   * @see cc.EventListener#release
   */
  retain: function retain() {},

  /*
   * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
   * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
   * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
   * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.<br/>
   * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
   * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
   * The retain function can increase a reference count for the native object to avoid it being released,<br/>
   * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
   * retain and release function call should be paired in developer's game code.</p>
   *
   * @method release
   * @see cc.EventListener#retain
   */
  release: function release() {}
}; // event listener type

/**
 * !#en The type code of unknown event listener.
 * !#zh 未知的事件监听器类型
 * @property UNKNOWN
 * @type {Number}
 * @static
 */

cc.EventListener.UNKNOWN = 0;
/*
 * !#en The type code of one by one touch event listener.
 * !#zh 触摸事件监听器类型，触点会一个一个得分开被派发
 * @property TOUCH_ONE_BY_ONE
 * @type {Number}
 * @static
 */

cc.EventListener.TOUCH_ONE_BY_ONE = 1;
/*
 * !#en The type code of all at once touch event listener.
 * !#zh 触摸事件监听器类型，触点会被一次性全部派发
 * @property TOUCH_ALL_AT_ONCE
 * @type {Number}
 * @static
 */

cc.EventListener.TOUCH_ALL_AT_ONCE = 2;
/**
 * !#en The type code of keyboard event listener.
 * !#zh 键盘事件监听器类型
 * @property KEYBOARD
 * @type {Number}
 * @static
 */

cc.EventListener.KEYBOARD = 3;
/*
 * !#en The type code of mouse event listener.
 * !#zh 鼠标事件监听器类型
 * @property MOUSE
 * @type {Number}
 * @static
 */

cc.EventListener.MOUSE = 4;
/**
 * !#en The type code of acceleration event listener.
 * !#zh 加速器事件监听器类型
 * @property ACCELERATION
 * @type {Number}
 * @static
 */

cc.EventListener.ACCELERATION = 6;
/*
 * !#en The type code of custom event listener.
 * !#zh 自定义事件监听器类型
 * @property CUSTOM
 * @type {Number}
 * @static
 */

cc.EventListener.CUSTOM = 8;
var ListenerID = cc.EventListener.ListenerID = {
  MOUSE: '__cc_mouse',
  TOUCH_ONE_BY_ONE: '__cc_touch_one_by_one',
  TOUCH_ALL_AT_ONCE: '__cc_touch_all_at_once',
  KEYBOARD: '__cc_keyboard',
  ACCELERATION: '__cc_acceleration'
};

var Custom = function Custom(listenerId, callback) {
  this._onCustomEvent = callback;
  cc.EventListener.call(this, cc.EventListener.CUSTOM, listenerId, this._callback);
};

js.extend(Custom, cc.EventListener);
js.mixin(Custom.prototype, {
  _onCustomEvent: null,
  _callback: function _callback(event) {
    if (this._onCustomEvent !== null) this._onCustomEvent(event);
  },
  checkAvailable: function checkAvailable() {
    return cc.EventListener.prototype.checkAvailable.call(this) && this._onCustomEvent !== null;
  },
  clone: function clone() {
    return new Custom(this._listenerID, this._onCustomEvent);
  }
});

var Mouse = function Mouse() {
  cc.EventListener.call(this, cc.EventListener.MOUSE, ListenerID.MOUSE, this._callback);
};

js.extend(Mouse, cc.EventListener);
js.mixin(Mouse.prototype, {
  onMouseDown: null,
  onMouseUp: null,
  onMouseMove: null,
  onMouseScroll: null,
  _callback: function _callback(event) {
    var eventType = cc.Event.EventMouse;

    switch (event._eventType) {
      case eventType.DOWN:
        if (this.onMouseDown) this.onMouseDown(event);
        break;

      case eventType.UP:
        if (this.onMouseUp) this.onMouseUp(event);
        break;

      case eventType.MOVE:
        if (this.onMouseMove) this.onMouseMove(event);
        break;

      case eventType.SCROLL:
        if (this.onMouseScroll) this.onMouseScroll(event);
        break;

      default:
        break;
    }
  },
  clone: function clone() {
    var eventListener = new Mouse();
    eventListener.onMouseDown = this.onMouseDown;
    eventListener.onMouseUp = this.onMouseUp;
    eventListener.onMouseMove = this.onMouseMove;
    eventListener.onMouseScroll = this.onMouseScroll;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    return true;
  }
});

var TouchOneByOne = function TouchOneByOne() {
  cc.EventListener.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, ListenerID.TOUCH_ONE_BY_ONE, null);
  this._claimedTouches = [];
};

js.extend(TouchOneByOne, cc.EventListener);
js.mixin(TouchOneByOne.prototype, {
  constructor: TouchOneByOne,
  _claimedTouches: null,
  swallowTouches: false,
  onTouchBegan: null,
  onTouchMoved: null,
  onTouchEnded: null,
  onTouchCancelled: null,
  setSwallowTouches: function setSwallowTouches(needSwallow) {
    this.swallowTouches = needSwallow;
  },
  isSwallowTouches: function isSwallowTouches() {
    return this.swallowTouches;
  },
  clone: function clone() {
    var eventListener = new TouchOneByOne();
    eventListener.onTouchBegan = this.onTouchBegan;
    eventListener.onTouchMoved = this.onTouchMoved;
    eventListener.onTouchEnded = this.onTouchEnded;
    eventListener.onTouchCancelled = this.onTouchCancelled;
    eventListener.swallowTouches = this.swallowTouches;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (!this.onTouchBegan) {
      cc.logID(1801);
      return false;
    }

    return true;
  }
});

var TouchAllAtOnce = function TouchAllAtOnce() {
  cc.EventListener.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, ListenerID.TOUCH_ALL_AT_ONCE, null);
};

js.extend(TouchAllAtOnce, cc.EventListener);
js.mixin(TouchAllAtOnce.prototype, {
  constructor: TouchAllAtOnce,
  onTouchesBegan: null,
  onTouchesMoved: null,
  onTouchesEnded: null,
  onTouchesCancelled: null,
  clone: function clone() {
    var eventListener = new TouchAllAtOnce();
    eventListener.onTouchesBegan = this.onTouchesBegan;
    eventListener.onTouchesMoved = this.onTouchesMoved;
    eventListener.onTouchesEnded = this.onTouchesEnded;
    eventListener.onTouchesCancelled = this.onTouchesCancelled;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (this.onTouchesBegan === null && this.onTouchesMoved === null && this.onTouchesEnded === null && this.onTouchesCancelled === null) {
      cc.logID(1802);
      return false;
    }

    return true;
  }
}); //Acceleration

var Acceleration = function Acceleration(callback) {
  this._onAccelerationEvent = callback;
  cc.EventListener.call(this, cc.EventListener.ACCELERATION, ListenerID.ACCELERATION, this._callback);
};

js.extend(Acceleration, cc.EventListener);
js.mixin(Acceleration.prototype, {
  constructor: Acceleration,
  _onAccelerationEvent: null,
  _callback: function _callback(event) {
    this._onAccelerationEvent(event.acc, event);
  },
  checkAvailable: function checkAvailable() {
    cc.assertID(this._onAccelerationEvent, 1803);
    return true;
  },
  clone: function clone() {
    return new Acceleration(this._onAccelerationEvent);
  }
}); //Keyboard

var Keyboard = function Keyboard() {
  cc.EventListener.call(this, cc.EventListener.KEYBOARD, ListenerID.KEYBOARD, this._callback);
};

js.extend(Keyboard, cc.EventListener);
js.mixin(Keyboard.prototype, {
  constructor: Keyboard,
  onKeyPressed: null,
  onKeyReleased: null,
  _callback: function _callback(event) {
    if (event.isPressed) {
      if (this.onKeyPressed) this.onKeyPressed(event.keyCode, event);
    } else {
      if (this.onKeyReleased) this.onKeyReleased(event.keyCode, event);
    }
  },
  clone: function clone() {
    var eventListener = new Keyboard();
    eventListener.onKeyPressed = this.onKeyPressed;
    eventListener.onKeyReleased = this.onKeyReleased;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (this.onKeyPressed === null && this.onKeyReleased === null) {
      cc.logID(1800);
      return false;
    }

    return true;
  }
});
/**
 * !#en
 * Create a EventListener object with configuration including the event type, handlers and other parameters.
 * In handlers, this refer to the event listener object itself.
 * You can also pass custom parameters in the configuration object,
 * all custom parameters will be polyfilled into the event listener object and can be accessed in handlers.
 * !#zh 通过指定不同的 Event 对象来设置想要创建的事件监听器。
 * @method create
 * @param {Object} argObj a json object
 * @returns {EventListener}
 * @static
 * @example {@link cocos2d/core/event-manager/CCEventListener/create.js}
 */

cc.EventListener.create = function (argObj) {
  cc.assertID(argObj && argObj.event, 1900);
  var listenerType = argObj.event;
  delete argObj.event;
  var listener = null;
  if (listenerType === cc.EventListener.TOUCH_ONE_BY_ONE) listener = new TouchOneByOne();else if (listenerType === cc.EventListener.TOUCH_ALL_AT_ONCE) listener = new TouchAllAtOnce();else if (listenerType === cc.EventListener.MOUSE) listener = new Mouse();else if (listenerType === cc.EventListener.CUSTOM) {
    listener = new Custom(argObj.eventName, argObj.callback);
    delete argObj.eventName;
    delete argObj.callback;
  } else if (listenerType === cc.EventListener.KEYBOARD) listener = new Keyboard();else if (listenerType === cc.EventListener.ACCELERATION) {
    listener = new Acceleration(argObj.callback);
    delete argObj.callback;
  }

  for (var key in argObj) {
    listener[key] = argObj[key];
  }

  return listener;
};

module.exports = cc.EventListener;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50LW1hbmFnZXJcXENDRXZlbnRMaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJjYyIsIkV2ZW50TGlzdGVuZXIiLCJ0eXBlIiwibGlzdGVuZXJJRCIsImNhbGxiYWNrIiwiX29uRXZlbnQiLCJfdHlwZSIsIl9saXN0ZW5lcklEIiwiX3JlZ2lzdGVyZWQiLCJfZml4ZWRQcmlvcml0eSIsIl9ub2RlIiwiX3RhcmdldCIsIl9wYXVzZWQiLCJfaXNFbmFibGVkIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJfc2V0UGF1c2VkIiwicGF1c2VkIiwiX2lzUGF1c2VkIiwiX3NldFJlZ2lzdGVyZWQiLCJyZWdpc3RlcmVkIiwiX2lzUmVnaXN0ZXJlZCIsIl9nZXRUeXBlIiwiX2dldExpc3RlbmVySUQiLCJfc2V0Rml4ZWRQcmlvcml0eSIsImZpeGVkUHJpb3JpdHkiLCJfZ2V0Rml4ZWRQcmlvcml0eSIsIl9zZXRTY2VuZUdyYXBoUHJpb3JpdHkiLCJub2RlIiwiX2dldFNjZW5lR3JhcGhQcmlvcml0eSIsImNoZWNrQXZhaWxhYmxlIiwiY2xvbmUiLCJzZXRFbmFibGVkIiwiZW5hYmxlZCIsImlzRW5hYmxlZCIsInJldGFpbiIsInJlbGVhc2UiLCJVTktOT1dOIiwiVE9VQ0hfT05FX0JZX09ORSIsIlRPVUNIX0FMTF9BVF9PTkNFIiwiS0VZQk9BUkQiLCJNT1VTRSIsIkFDQ0VMRVJBVElPTiIsIkNVU1RPTSIsIkxpc3RlbmVySUQiLCJDdXN0b20iLCJsaXN0ZW5lcklkIiwiX29uQ3VzdG9tRXZlbnQiLCJjYWxsIiwiX2NhbGxiYWNrIiwiZXh0ZW5kIiwibWl4aW4iLCJldmVudCIsIk1vdXNlIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VTY3JvbGwiLCJldmVudFR5cGUiLCJFdmVudCIsIkV2ZW50TW91c2UiLCJfZXZlbnRUeXBlIiwiRE9XTiIsIlVQIiwiTU9WRSIsIlNDUk9MTCIsImV2ZW50TGlzdGVuZXIiLCJUb3VjaE9uZUJ5T25lIiwiX2NsYWltZWRUb3VjaGVzIiwic3dhbGxvd1RvdWNoZXMiLCJvblRvdWNoQmVnYW4iLCJvblRvdWNoTW92ZWQiLCJvblRvdWNoRW5kZWQiLCJvblRvdWNoQ2FuY2VsbGVkIiwic2V0U3dhbGxvd1RvdWNoZXMiLCJuZWVkU3dhbGxvdyIsImlzU3dhbGxvd1RvdWNoZXMiLCJsb2dJRCIsIlRvdWNoQWxsQXRPbmNlIiwib25Ub3VjaGVzQmVnYW4iLCJvblRvdWNoZXNNb3ZlZCIsIm9uVG91Y2hlc0VuZGVkIiwib25Ub3VjaGVzQ2FuY2VsbGVkIiwiQWNjZWxlcmF0aW9uIiwiX29uQWNjZWxlcmF0aW9uRXZlbnQiLCJhY2MiLCJhc3NlcnRJRCIsIktleWJvYXJkIiwib25LZXlQcmVzc2VkIiwib25LZXlSZWxlYXNlZCIsImlzUHJlc3NlZCIsImtleUNvZGUiLCJjcmVhdGUiLCJhcmdPYmoiLCJsaXN0ZW5lclR5cGUiLCJsaXN0ZW5lciIsImV2ZW50TmFtZSIsImtleSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUMsRUFBRSxDQUFDQyxhQUFILEdBQW1CLFVBQVVDLElBQVYsRUFBZ0JDLFVBQWhCLEVBQTRCQyxRQUE1QixFQUFzQztBQUNyRCxPQUFLQyxRQUFMLEdB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LFFBQVEsR0FBRyxJQUFJWixZQUFKLENBQWlCVSxNQUFNLENBQUN6RixRQUF4QixDQUFYO0FBQ0EsV0FBT3lGLE1BQU0sQ0FBQ3pGLFFBQWQ7QUFDSDs7QUFFRCxPQUFJLElBQUk2RixHQUFSLElBQWVKLE1BQWYsRUFBdUI7QUFDbkJFLElBQUFBLFFBQVEsQ0FBQ0UsR0FBRCxDQUFSLEdBQWdCSixNQUFNLENBQUNJLEdBQUQsQ0FBdEI7QUFDSDs7QUFDRCxTQUFPRixRQUFQO0FBQ0gsQ0E1QkQ7O0FBOEJBRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuRyxFQUFFLENBQUNDLGFBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIDxwPlxyXG4gKiAgICAgVGhlIGJhc2UgY2xhc3Mgb2YgZXZlbnQgbGlzdGVuZXIuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogICAgIElmIHlvdSBuZWVkIGN1c3RvbSBsaXN0ZW5lciB3aGljaCB3aXRoIGRpZmZlcmVudCBjYWxsYmFjaywgeW91IG5lZWQgdG8gaW5oZXJpdCB0aGlzIGNsYXNzLiAgICAgICAgICAgICAgIDxici8+XHJcbiAqICAgICBGb3IgaW5zdGFuY2UsIHlvdSBjb3VsZCByZWZlciB0byBFdmVudExpc3RlbmVyQWNjZWxlcmF0aW9uLCBFdmVudExpc3RlbmVyS2V5Ym9hcmQsICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiAgICAgIEV2ZW50TGlzdGVuZXJUb3VjaE9uZUJ5T25lLCBFdmVudExpc3RlbmVyQ3VzdG9tLlxyXG4gKiA8L3A+XHJcbiAqXHJcbiAqICEjemhcclxuICog5bCB6KOF55So5oi355qE5LqL5Lu25aSE55CG6YC76L6R44CCXHJcbiAqIOazqOaEj++8mui/meaYr+S4gOS4quaKveixoeexu++8jOW8gOWPkeiAheS4jeW6lOivpeebtOaOpeWunuS+i+WMlui/meS4quexu++8jOivt+WPguiAgyB7eyNjcm9zc0xpbmsgXCJFdmVudExpc3RlbmVyL2NyZWF0ZTptZXRob2RcIn19Y2MuRXZlbnRMaXN0ZW5lci5jcmVhdGV7ey9jcm9zc0xpbmt9feOAglxyXG4gKlxyXG4gKiBAY2xhc3MgRXZlbnRMaXN0ZW5lclxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb25zdHJ1Y3RvclxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsaXN0ZW5lcklEXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYWxsYmFja1xyXG4gKi9cclxuY2MuRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcklELCBjYWxsYmFjaykge1xyXG4gICAgdGhpcy5fb25FdmVudCA9IGNhbGxiYWNrOyAgIC8vIEV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICB0aGlzLl90eXBlID0gdHlwZSB8fCAwOyAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdHlwZVxyXG4gICAgdGhpcy5fbGlzdGVuZXJJRCA9IGxpc3RlbmVySUQgfHwgXCJcIjsgICAgLy8gRXZlbnQgbGlzdGVuZXIgSURcclxuICAgIHRoaXMuX3JlZ2lzdGVyZWQgPSBmYWxzZTsgICAvLyBXaGV0aGVyIHRoZSBsaXN0ZW5lciBoYXMgYmVlbiBhZGRlZCB0byBkaXNwYXRjaGVyLlxyXG5cclxuICAgIHRoaXMuX2ZpeGVkUHJpb3JpdHkgPSAwOyAgICAvLyBUaGUgaGlnaGVyIHRoZSBudW1iZXIsIHRoZSBoaWdoZXIgdGhlIHByaW9yaXR5LCAwIGlzIGZvciBzY2VuZSBncmFwaCBiYXNlIHByaW9yaXR5LlxyXG4gICAgdGhpcy5fbm9kZSA9IG51bGw7ICAgICAgICAgIC8vIHNjZW5lIGdyYXBoIGJhc2VkIHByaW9yaXR5XHJcbiAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xyXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTsgICAgICAgIC8vIFdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIHBhdXNlZFxyXG4gICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZTsgICAgIC8vIFdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIGVuYWJsZWRcclxufTtcclxuXHJcbmNjLkV2ZW50TGlzdGVuZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IGNjLkV2ZW50TGlzdGVuZXIsXHJcbiAgICAvKlxyXG4gICAgICogPHA+XHJcbiAgICAgKiAgICAgU2V0cyBwYXVzZWQgc3RhdGUgZm9yIHRoZSBsaXN0ZW5lclxyXG4gICAgICogICAgIFRoZSBwYXVzZWQgc3RhdGUgaXMgb25seSB1c2VkIGZvciBzY2VuZSBncmFwaCBwcmlvcml0eSBsaXN0ZW5lcnMuXHJcbiAgICAgKiAgICAgYEV2ZW50RGlzcGF0Y2hlcjo6cmVzdW1lQWxsRXZlbnRMaXN0ZW5lcnNGb3JUYXJnZXQobm9kZSlgIHdpbGwgc2V0IHRoZSBwYXVzZWQgc3RhdGUgdG8gYHRydWVgLFxyXG4gICAgICogICAgIHdoaWxlIGBFdmVudERpc3BhdGNoZXI6OnBhdXNlQWxsRXZlbnRMaXN0ZW5lcnNGb3JUYXJnZXQobm9kZSlgIHdpbGwgc2V0IGl0IHRvIGBmYWxzZWAuXHJcbiAgICAgKiAgICAgQG5vdGUgMSkgRml4ZWQgcHJpb3JpdHkgbGlzdGVuZXJzIHdpbGwgbmV2ZXIgZ2V0IHBhdXNlZC4gSWYgYSBmaXhlZCBwcmlvcml0eSBkb2Vzbid0IHdhbnQgdG8gcmVjZWl2ZSBldmVudHMsXHJcbiAgICAgKiAgICAgICAgICAgICAgY2FsbCBgc2V0RW5hYmxlZChmYWxzZSlgIGluc3RlYWQuXHJcbiAgICAgKiAgICAgICAgICAgIDIpIEluIGBOb2RlYCdzIG9uRW50ZXIgYW5kIG9uRXhpdCwgdGhlIGBwYXVzZWQgc3RhdGVgIG9mIHRoZSBsaXN0ZW5lcnMgd2hpY2ggYXNzb2NpYXRlZCB3aXRoIHRoYXQgbm9kZSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgdXBkYXRlZC5cclxuICAgICAqIDwvcD5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGF1c2VkXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfc2V0UGF1c2VkOiBmdW5jdGlvbiAocGF1c2VkKSB7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gcGF1c2VkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIHBhdXNlZC5cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2lzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIE1hcmtzIHRoZSBsaXN0ZW5lciB3YXMgcmVnaXN0ZXJlZCBieSBFdmVudERpc3BhdGNoZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlZ2lzdGVyZWRcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9zZXRSZWdpc3RlcmVkOiBmdW5jdGlvbiAocmVnaXN0ZXJlZCkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyZWQgPSByZWdpc3RlcmVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3RlbmVyIHdhcyByZWdpc3RlcmVkIGJ5IEV2ZW50RGlzcGF0Y2hlclxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfaXNSZWdpc3RlcmVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdGVyZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoaXMgbGlzdGVuZXJcclxuICAgICAqIEBub3RlIEl0J3MgZGlmZmVyZW50IGZyb20gYEV2ZW50VHlwZWAsIGUuZy4gVG91Y2hFdmVudCBoYXMgdHdvIGtpbmRzIG9mIGV2ZW50IGxpc3RlbmVycyAtIEV2ZW50TGlzdGVuZXJPbmVCeU9uZSwgRXZlbnRMaXN0ZW5lckFsbEF0T25jZVxyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9nZXRUeXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAgR2V0cyB0aGUgbGlzdGVuZXIgSUQgb2YgdGhpcyBsaXN0ZW5lclxyXG4gICAgICogIFdoZW4gZXZlbnQgaXMgYmVpbmcgZGlzcGF0Y2hlZCwgbGlzdGVuZXIgSUQgaXMgdXNlZCBhcyBrZXkgZm9yIHNlYXJjaGluZyBsaXN0ZW5lcnMgYWNjb3JkaW5nIHRvIGV2ZW50IHR5cGUuXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2dldExpc3RlbmVySUQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJJRDtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIFNldHMgdGhlIGZpeGVkIHByaW9yaXR5IGZvciB0aGlzIGxpc3RlbmVyXHJcbiAgICAgKiAgQG5vdGUgVGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGZvciBgZml4ZWQgcHJpb3JpdHkgbGlzdGVuZXJzYCwgaXQgbmVlZHMgdG8gYWNjZXNzIGEgbm9uLXplcm8gdmFsdWUuIDAgaXMgcmVzZXJ2ZWQgZm9yIHNjZW5lIGdyYXBoIHByaW9yaXR5IGxpc3RlbmVyc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGZpeGVkUHJpb3JpdHlcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9zZXRGaXhlZFByaW9yaXR5OiBmdW5jdGlvbiAoZml4ZWRQcmlvcml0eSkge1xyXG4gICAgICAgIHRoaXMuX2ZpeGVkUHJpb3JpdHkgPSBmaXhlZFByaW9yaXR5O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0cyB0aGUgZml4ZWQgcHJpb3JpdHkgb2YgdGhpcyBsaXN0ZW5lclxyXG4gICAgICogQHJldHVybnMge051bWJlcn0gMCBpZiBpdCdzIGEgc2NlbmUgZ3JhcGggcHJpb3JpdHkgbGlzdGVuZXIsIG5vbi16ZXJvIGZvciBmaXhlZCBwcmlvcml0eSBsaXN0ZW5lclxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX2dldEZpeGVkUHJpb3JpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZml4ZWRQcmlvcml0eTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIFNldHMgc2NlbmUgZ3JhcGggcHJpb3JpdHkgZm9yIHRoaXMgbGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gbm9kZVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgX3NldFNjZW5lR3JhcGhQcmlvcml0eTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBub2RlO1xyXG4gICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogR2V0cyBzY2VuZSBncmFwaCBwcmlvcml0eSBvZiB0aGlzIGxpc3RlbmVyXHJcbiAgICAgKiBAcmV0dXJucyB7Y2MuTm9kZX0gaWYgaXQncyBhIGZpeGVkIHByaW9yaXR5IGxpc3RlbmVyLCBub24tbnVsbCBmb3Igc2NlbmUgZ3JhcGggcHJpb3JpdHkgbGlzdGVuZXJcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9nZXRTY2VuZUdyYXBoUHJpb3JpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrcyB3aGV0aGVyIHRoZSBsaXN0ZW5lciBpcyBhdmFpbGFibGUuXHJcbiAgICAgKiAhI3poIOajgOa1i+ebkeWQrOWZqOaYr+WQpuacieaViFxyXG4gICAgICogQG1ldGhvZCBjaGVja0F2YWlsYWJsZVxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uRXZlbnQgIT09IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDbG9uZXMgdGhlIGxpc3RlbmVyLCBpdHMgc3ViY2xhc3NlcyBoYXZlIHRvIG92ZXJyaWRlIHRoaXMgbWV0aG9kLlxyXG4gICAgICogISN6aCDlhYvpmobnm5HlkKzlmags5a6D55qE5a2Q57G75b+F6aG76YeN5YaZ5q2k5pa55rOV44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsb25lXHJcbiAgICAgKiBAcmV0dXJucyB7RXZlbnRMaXN0ZW5lcn1cclxuICAgICAqL1xyXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgISNlbiBFbmFibGVzIG9yIGRpc2FibGVzIHRoZSBsaXN0ZW5lclxyXG4gICAgICogICEjemgg5ZCv55So5oiW56aB55So55uR5ZCs5Zmo44CCXHJcbiAgICAgKiAgQG1ldGhvZCBzZXRFbmFibGVkXHJcbiAgICAgKiAgQHBhcmFtIHtCb29sZWFufSBlbmFibGVkXHJcbiAgICAgKiAgQG5vdGUgT25seSBsaXN0ZW5lcnMgd2l0aCBgZW5hYmxlZGAgc3RhdGUgd2lsbCBiZSBhYmxlIHRvIHJlY2VpdmUgZXZlbnRzLlxyXG4gICAgICogICAgICAgICAgV2hlbiBhbiBsaXN0ZW5lciB3YXMgaW5pdGlhbGl6ZWQsIGl0J3MgZW5hYmxlZCBieSBkZWZhdWx0LlxyXG4gICAgICogICAgICAgICAgQW4gZXZlbnQgbGlzdGVuZXIgY2FuIHJlY2VpdmUgZXZlbnRzIHdoZW4gaXQgaXMgZW5hYmxlZCBhbmQgaXMgbm90IHBhdXNlZC5cclxuICAgICAqICAgICAgICAgIHBhdXNlZCBzdGF0ZSBpcyBhbHdheXMgZmFsc2Ugd2hlbiBpdCBpcyBhIGZpeGVkIHByaW9yaXR5IGxpc3RlbmVyLlxyXG4gICAgICovXHJcbiAgICBzZXRFbmFibGVkOiBmdW5jdGlvbihlbmFibGVkKXtcclxuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSBlbmFibGVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIGVuYWJsZWRcclxuICAgICAqICEjemgg5qOA5p+l55uR5ZCs5Zmo5piv5ZCm5Y+v55So44CCXHJcbiAgICAgKiBAbWV0aG9kIGlzRW5hYmxlZFxyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzRW5hYmxlZDogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNFbmFibGVkO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogPHA+Q3VycmVudGx5IEphdmFTY3JpcHQgQmluZGluZ3MgKEpTQiksIGluIHNvbWUgY2FzZXMsIG5lZWRzIHRvIHVzZSByZXRhaW4gYW5kIHJlbGVhc2UuIFRoaXMgaXMgYSBidWcgaW4gSlNCLFxyXG4gICAgICogYW5kIHRoZSB1Z2x5IHdvcmthcm91bmQgaXMgdG8gdXNlIHJldGFpbi9yZWxlYXNlLiBTbywgdGhlc2UgMiBtZXRob2RzIHdlcmUgYWRkZWQgdG8gYmUgY29tcGF0aWJsZSB3aXRoIEpTQi5cclxuICAgICAqIFRoaXMgaXMgYSBoYWNrLCBhbmQgc2hvdWxkIGJlIHJlbW92ZWQgb25jZSBKU0IgZml4ZXMgdGhlIHJldGFpbi9yZWxlYXNlIGJ1Zzxici8+XHJcbiAgICAgKiBZb3Ugd2lsbCBuZWVkIHRvIHJldGFpbiBhbiBvYmplY3QgaWYgeW91IGNyZWF0ZWQgYSBsaXN0ZW5lciBhbmQgaGF2ZW4ndCBhZGRlZCBpdCBhbnkgdGFyZ2V0IG5vZGUgZHVyaW5nIHRoZSBzYW1lIGZyYW1lLjxici8+XHJcbiAgICAgKiBPdGhlcndpc2UsIEpTQidzIG5hdGl2ZSBhdXRvcmVsZWFzZSBwb29sIHdpbGwgY29uc2lkZXIgdGhpcyBvYmplY3QgYSB1c2VsZXNzIG9uZSBhbmQgcmVsZWFzZSBpdCBkaXJlY3RseSw8YnIvPlxyXG4gICAgICogd2hlbiB5b3Ugd2FudCB0byB1c2UgaXQgbGF0ZXIsIGEgXCJJbnZhbGlkIE5hdGl2ZSBPYmplY3RcIiBlcnJvciB3aWxsIGJlIHJhaXNlZC48YnIvPlxyXG4gICAgICogVGhlIHJldGFpbiBmdW5jdGlvbiBjYW4gaW5jcmVhc2UgYSByZWZlcmVuY2UgY291bnQgZm9yIHRoZSBuYXRpdmUgb2JqZWN0IHRvIGF2b2lkIGl0IGJlaW5nIHJlbGVhc2VkLDxici8+XHJcbiAgICAgKiB5b3UgbmVlZCB0byBtYW51YWxseSBpbnZva2UgcmVsZWFzZSBmdW5jdGlvbiB3aGVuIHlvdSB0aGluayB0aGlzIG9iamVjdCBpcyBubyBsb25nZXIgbmVlZGVkLCBvdGhlcndpc2UsIHRoZXJlIHdpbGwgYmUgbWVtb3J5IGxlYXJrcy48YnIvPlxyXG4gICAgICogcmV0YWluIGFuZCByZWxlYXNlIGZ1bmN0aW9uIGNhbGwgc2hvdWxkIGJlIHBhaXJlZCBpbiBkZXZlbG9wZXIncyBnYW1lIGNvZGUuPC9wPlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgcmV0YWluXHJcbiAgICAgKiBAc2VlIGNjLkV2ZW50TGlzdGVuZXIjcmVsZWFzZVxyXG4gICAgICovXHJcbiAgICByZXRhaW46ZnVuY3Rpb24gKCkge1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgKiA8cD5DdXJyZW50bHkgSmF2YVNjcmlwdCBCaW5kaW5ncyAoSlNCKSwgaW4gc29tZSBjYXNlcywgbmVlZHMgdG8gdXNlIHJldGFpbiBhbmQgcmVsZWFzZS4gVGhpcyBpcyBhIGJ1ZyBpbiBKU0IsXHJcbiAgICAgKiBhbmQgdGhlIHVnbHkgd29ya2Fyb3VuZCBpcyB0byB1c2UgcmV0YWluL3JlbGVhc2UuIFNvLCB0aGVzZSAyIG1ldGhvZHMgd2VyZSBhZGRlZCB0byBiZSBjb21wYXRpYmxlIHdpdGggSlNCLlxyXG4gICAgICogVGhpcyBpcyBhIGhhY2ssIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIEpTQiBmaXhlcyB0aGUgcmV0YWluL3JlbGVhc2UgYnVnPGJyLz5cclxuICAgICAqIFlvdSB3aWxsIG5lZWQgdG8gcmV0YWluIGFuIG9iamVjdCBpZiB5b3UgY3JlYXRlZCBhIGxpc3RlbmVyIGFuZCBoYXZlbid0IGFkZGVkIGl0IGFueSB0YXJnZXQgbm9kZSBkdXJpbmcgdGhlIHNhbWUgZnJhbWUuPGJyLz5cclxuICAgICAqIE90aGVyd2lzZSwgSlNCJ3MgbmF0aXZlIGF1dG9yZWxlYXNlIHBvb2wgd2lsbCBjb25zaWRlciB0aGlzIG9iamVjdCBhIHVzZWxlc3Mgb25lIGFuZCByZWxlYXNlIGl0IGRpcmVjdGx5LDxici8+XHJcbiAgICAgKiB3aGVuIHlvdSB3YW50IHRvIHVzZSBpdCBsYXRlciwgYSBcIkludmFsaWQgTmF0aXZlIE9iamVjdFwiIGVycm9yIHdpbGwgYmUgcmFpc2VkLjxici8+XHJcbiAgICAgKiBUaGUgcmV0YWluIGZ1bmN0aW9uIGNhbiBpbmNyZWFzZSBhIHJlZmVyZW5jZSBjb3VudCBmb3IgdGhlIG5hdGl2ZSBvYmplY3QgdG8gYXZvaWQgaXQgYmVpbmcgcmVsZWFzZWQsPGJyLz5cclxuICAgICAqIHlvdSBuZWVkIHRvIG1hbnVhbGx5IGludm9rZSByZWxlYXNlIGZ1bmN0aW9uIHdoZW4geW91IHRoaW5rIHRoaXMgb2JqZWN0IGlzIG5vIGxvbmdlciBuZWVkZWQsIG90aGVyd2lzZSwgdGhlcmUgd2lsbCBiZSBtZW1vcnkgbGVhcmtzLjxici8+XHJcbiAgICAgKiByZXRhaW4gYW5kIHJlbGVhc2UgZnVuY3Rpb24gY2FsbCBzaG91bGQgYmUgcGFpcmVkIGluIGRldmVsb3BlcidzIGdhbWUgY29kZS48L3A+XHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlXHJcbiAgICAgKiBAc2VlIGNjLkV2ZW50TGlzdGVuZXIjcmV0YWluXHJcbiAgICAgKi9cclxuICAgIHJlbGVhc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gZXZlbnQgbGlzdGVuZXIgdHlwZVxyXG4vKipcclxuICogISNlbiBUaGUgdHlwZSBjb2RlIG9mIHVua25vd24gZXZlbnQgbGlzdGVuZXIuXHJcbiAqICEjemgg5pyq55+l55qE5LqL5Lu255uR5ZCs5Zmo57G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBVTktOT1dOXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmNjLkV2ZW50TGlzdGVuZXIuVU5LTk9XTiA9IDA7XHJcbi8qXHJcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBvbmUgYnkgb25lIHRvdWNoIGV2ZW50IGxpc3RlbmVyLlxyXG4gKiAhI3poIOinpuaRuOS6i+S7tuebkeWQrOWZqOexu+Wei++8jOinpueCueS8muS4gOS4quS4gOS4quW+l+WIhuW8gOiiq+a0vuWPkVxyXG4gKiBAcHJvcGVydHkgVE9VQ0hfT05FX0JZX09ORVxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5jYy5FdmVudExpc3RlbmVyLlRPVUNIX09ORV9CWV9PTkUgPSAxO1xyXG4vKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgYWxsIGF0IG9uY2UgdG91Y2ggZXZlbnQgbGlzdGVuZXIuXHJcbiAqICEjemgg6Kem5pG45LqL5Lu255uR5ZCs5Zmo57G75Z6L77yM6Kem54K55Lya6KKr5LiA5qyh5oCn5YWo6YOo5rS+5Y+RXHJcbiAqIEBwcm9wZXJ0eSBUT1VDSF9BTExfQVRfT05DRVxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5jYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFID0gMjtcclxuLyoqXHJcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBrZXlib2FyZCBldmVudCBsaXN0ZW5lci5cclxuICogISN6aCDplK7nm5jkuovku7bnm5HlkKzlmajnsbvlnotcclxuICogQHByb3BlcnR5IEtFWUJPQVJEXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmNjLkV2ZW50TGlzdGVuZXIuS0VZQk9BUkQgPSAzO1xyXG4vKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgbW91c2UgZXZlbnQgbGlzdGVuZXIuXHJcbiAqICEjemgg6byg5qCH5LqL5Lu255uR5ZCs5Zmo57G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBNT1VTRVxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5jYy5FdmVudExpc3RlbmVyLk1PVVNFID0gNDtcclxuLyoqXHJcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBhY2NlbGVyYXRpb24gZXZlbnQgbGlzdGVuZXIuXHJcbiAqICEjemgg5Yqg6YCf5Zmo5LqL5Lu255uR5ZCs5Zmo57G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBBQ0NFTEVSQVRJT05cclxuICogQHR5cGUge051bWJlcn1cclxuICogQHN0YXRpY1xyXG4gKi9cclxuY2MuRXZlbnRMaXN0ZW5lci5BQ0NFTEVSQVRJT04gPSA2O1xyXG4vKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgY3VzdG9tIGV2ZW50IGxpc3RlbmVyLlxyXG4gKiAhI3poIOiHquWumuS5ieS6i+S7tuebkeWQrOWZqOexu+Wei1xyXG4gKiBAcHJvcGVydHkgQ1VTVE9NXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmNjLkV2ZW50TGlzdGVuZXIuQ1VTVE9NID0gODtcclxuXHJcbnZhciBMaXN0ZW5lcklEID0gY2MuRXZlbnRMaXN0ZW5lci5MaXN0ZW5lcklEID0ge1xyXG4gICAgTU9VU0U6ICdfX2NjX21vdXNlJyxcclxuICAgIFRPVUNIX09ORV9CWV9PTkU6ICdfX2NjX3RvdWNoX29uZV9ieV9vbmUnLFxyXG4gICAgVE9VQ0hfQUxMX0FUX09OQ0U6ICdfX2NjX3RvdWNoX2FsbF9hdF9vbmNlJyxcclxuICAgIEtFWUJPQVJEOiAnX19jY19rZXlib2FyZCcsXHJcbiAgICBBQ0NFTEVSQVRJT046ICdfX2NjX2FjY2VsZXJhdGlvbicsXHJcbn07XHJcblxyXG52YXIgQ3VzdG9tID0gZnVuY3Rpb24gKGxpc3RlbmVySWQsIGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLl9vbkN1c3RvbUV2ZW50ID0gY2FsbGJhY2s7XHJcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5DVVNUT00sIGxpc3RlbmVySWQsIHRoaXMuX2NhbGxiYWNrKTtcclxufTtcclxuanMuZXh0ZW5kKEN1c3RvbSwgY2MuRXZlbnRMaXN0ZW5lcik7XHJcbmpzLm1peGluKEN1c3RvbS5wcm90b3R5cGUsIHtcclxuICAgIF9vbkN1c3RvbUV2ZW50OiBudWxsLFxyXG4gICAgXHJcbiAgICBfY2FsbGJhY2s6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkN1c3RvbUV2ZW50ICE9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9vbkN1c3RvbUV2ZW50KGV2ZW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKGNjLkV2ZW50TGlzdGVuZXIucHJvdG90eXBlLmNoZWNrQXZhaWxhYmxlLmNhbGwodGhpcykgJiYgdGhpcy5fb25DdXN0b21FdmVudCAhPT0gbnVsbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b20odGhpcy5fbGlzdGVuZXJJRCwgdGhpcy5fb25DdXN0b21FdmVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIE1vdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2MuRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIGNjLkV2ZW50TGlzdGVuZXIuTU9VU0UsIExpc3RlbmVySUQuTU9VU0UsIHRoaXMuX2NhbGxiYWNrKTtcclxufTtcclxuanMuZXh0ZW5kKE1vdXNlLCBjYy5FdmVudExpc3RlbmVyKTtcclxuanMubWl4aW4oTW91c2UucHJvdG90eXBlLCB7XHJcbiAgICBvbk1vdXNlRG93bjogbnVsbCxcclxuICAgIG9uTW91c2VVcDogbnVsbCxcclxuICAgIG9uTW91c2VNb3ZlOiBudWxsLFxyXG4gICAgb25Nb3VzZVNjcm9sbDogbnVsbCxcclxuXHJcbiAgICBfY2FsbGJhY2s6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHZhciBldmVudFR5cGUgPSBjYy5FdmVudC5FdmVudE1vdXNlO1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuX2V2ZW50VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIGV2ZW50VHlwZS5ET1dOOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25Nb3VzZURvd24pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlRG93bihldmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBldmVudFR5cGUuVVA6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlVXApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vdXNlVXAoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlLk1PVkU6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlTW92ZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGV2ZW50VHlwZS5TQ1JPTEw6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlU2Nyb2xsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZVNjcm9sbChldmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG5ldyBNb3VzZSgpO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Nb3VzZURvd24gPSB0aGlzLm9uTW91c2VEb3duO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Nb3VzZVVwID0gdGhpcy5vbk1vdXNlVXA7XHJcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmU7XHJcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vbk1vdXNlU2Nyb2xsID0gdGhpcy5vbk1vdXNlU2Nyb2xsO1xyXG4gICAgICAgIHJldHVybiBldmVudExpc3RlbmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0F2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBUb3VjaE9uZUJ5T25lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2MuRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSwgTGlzdGVuZXJJRC5UT1VDSF9PTkVfQllfT05FLCBudWxsKTtcclxuICAgIHRoaXMuX2NsYWltZWRUb3VjaGVzID0gW107XHJcbn07XHJcbmpzLmV4dGVuZChUb3VjaE9uZUJ5T25lLCBjYy5FdmVudExpc3RlbmVyKTtcclxuanMubWl4aW4oVG91Y2hPbmVCeU9uZS5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBUb3VjaE9uZUJ5T25lLFxyXG4gICAgX2NsYWltZWRUb3VjaGVzOiBudWxsLFxyXG4gICAgc3dhbGxvd1RvdWNoZXM6IGZhbHNlLFxyXG4gICAgb25Ub3VjaEJlZ2FuOiBudWxsLFxyXG4gICAgb25Ub3VjaE1vdmVkOiBudWxsLFxyXG4gICAgb25Ub3VjaEVuZGVkOiBudWxsLFxyXG4gICAgb25Ub3VjaENhbmNlbGxlZDogbnVsbCxcclxuXHJcbiAgICBzZXRTd2FsbG93VG91Y2hlczogZnVuY3Rpb24gKG5lZWRTd2FsbG93KSB7XHJcbiAgICAgICAgdGhpcy5zd2FsbG93VG91Y2hlcyA9IG5lZWRTd2FsbG93O1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1N3YWxsb3dUb3VjaGVzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN3YWxsb3dUb3VjaGVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBldmVudExpc3RlbmVyID0gbmV3IFRvdWNoT25lQnlPbmUoKTtcclxuICAgICAgICBldmVudExpc3RlbmVyLm9uVG91Y2hCZWdhbiA9IHRoaXMub25Ub3VjaEJlZ2FuO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaE1vdmVkID0gdGhpcy5vblRvdWNoTW92ZWQ7XHJcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoRW5kZWQgPSB0aGlzLm9uVG91Y2hFbmRlZDtcclxuICAgICAgICBldmVudExpc3RlbmVyLm9uVG91Y2hDYW5jZWxsZWQgPSB0aGlzLm9uVG91Y2hDYW5jZWxsZWQ7XHJcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5zd2FsbG93VG91Y2hlcyA9IHRoaXMuc3dhbGxvd1RvdWNoZXM7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMub25Ub3VjaEJlZ2FuKXtcclxuICAgICAgICAgICAgY2MubG9nSUQoMTgwMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIFRvdWNoQWxsQXRPbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2MuRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfQUxMX0FUX09OQ0UsIExpc3RlbmVySUQuVE9VQ0hfQUxMX0FUX09OQ0UsIG51bGwpO1xyXG59O1xyXG5qcy5leHRlbmQoVG91Y2hBbGxBdE9uY2UsIGNjLkV2ZW50TGlzdGVuZXIpO1xyXG5qcy5taXhpbihUb3VjaEFsbEF0T25jZS5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBUb3VjaEFsbEF0T25jZSxcclxuICAgIG9uVG91Y2hlc0JlZ2FuOiBudWxsLFxyXG4gICAgb25Ub3VjaGVzTW92ZWQ6IG51bGwsXHJcbiAgICBvblRvdWNoZXNFbmRlZDogbnVsbCxcclxuICAgIG9uVG91Y2hlc0NhbmNlbGxlZDogbnVsbCxcclxuXHJcbiAgICBjbG9uZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG5ldyBUb3VjaEFsbEF0T25jZSgpO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaGVzQmVnYW4gPSB0aGlzLm9uVG91Y2hlc0JlZ2FuO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaGVzTW92ZWQgPSB0aGlzLm9uVG91Y2hlc01vdmVkO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaGVzRW5kZWQgPSB0aGlzLm9uVG91Y2hlc0VuZGVkO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaGVzQ2FuY2VsbGVkID0gdGhpcy5vblRvdWNoZXNDYW5jZWxsZWQ7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlc0JlZ2FuID09PSBudWxsICYmIHRoaXMub25Ub3VjaGVzTW92ZWQgPT09IG51bGxcclxuICAgICAgICAgICAgJiYgdGhpcy5vblRvdWNoZXNFbmRlZCA9PT0gbnVsbCAmJiB0aGlzLm9uVG91Y2hlc0NhbmNlbGxlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjYy5sb2dJRCgxODAyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL0FjY2VsZXJhdGlvblxyXG52YXIgQWNjZWxlcmF0aW9uID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLl9vbkFjY2VsZXJhdGlvbkV2ZW50ID0gY2FsbGJhY2s7XHJcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5BQ0NFTEVSQVRJT04sIExpc3RlbmVySUQuQUNDRUxFUkFUSU9OLCB0aGlzLl9jYWxsYmFjayk7XHJcbn07XHJcbmpzLmV4dGVuZChBY2NlbGVyYXRpb24sIGNjLkV2ZW50TGlzdGVuZXIpO1xyXG5qcy5taXhpbihBY2NlbGVyYXRpb24ucHJvdG90eXBlLCB7XHJcbiAgICBjb25zdHJ1Y3RvcjogQWNjZWxlcmF0aW9uLFxyXG4gICAgX29uQWNjZWxlcmF0aW9uRXZlbnQ6IG51bGwsXHJcblxyXG4gICAgX2NhbGxiYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9vbkFjY2VsZXJhdGlvbkV2ZW50KGV2ZW50LmFjYywgZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjaGVja0F2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmFzc2VydElEKHRoaXMuX29uQWNjZWxlcmF0aW9uRXZlbnQsIDE4MDMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEFjY2VsZXJhdGlvbih0aGlzLl9vbkFjY2VsZXJhdGlvbkV2ZW50KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLy9LZXlib2FyZFxyXG52YXIgS2V5Ym9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCwgTGlzdGVuZXJJRC5LRVlCT0FSRCwgdGhpcy5fY2FsbGJhY2spO1xyXG59O1xyXG5qcy5leHRlbmQoS2V5Ym9hcmQsIGNjLkV2ZW50TGlzdGVuZXIpO1xyXG5qcy5taXhpbihLZXlib2FyZC5wcm90b3R5cGUsIHtcclxuICAgIGNvbnN0cnVjdG9yOiBLZXlib2FyZCxcclxuICAgIG9uS2V5UHJlc3NlZDogbnVsbCxcclxuICAgIG9uS2V5UmVsZWFzZWQ6IG51bGwsXHJcblxyXG4gICAgX2NhbGxiYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQuaXNQcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uS2V5UHJlc3NlZClcclxuICAgICAgICAgICAgICAgIHRoaXMub25LZXlQcmVzc2VkKGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbktleVJlbGVhc2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbktleVJlbGVhc2VkKGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50TGlzdGVuZXIgPSBuZXcgS2V5Ym9hcmQoKTtcclxuICAgICAgICBldmVudExpc3RlbmVyLm9uS2V5UHJlc3NlZCA9IHRoaXMub25LZXlQcmVzc2VkO1xyXG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25LZXlSZWxlYXNlZCA9IHRoaXMub25LZXlSZWxlYXNlZDtcclxuICAgICAgICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcclxuICAgIH0sXHJcblxyXG4gICAgY2hlY2tBdmFpbGFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5vbktleVByZXNzZWQgPT09IG51bGwgJiYgdGhpcy5vbktleVJlbGVhc2VkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE4MDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZSBhIEV2ZW50TGlzdGVuZXIgb2JqZWN0IHdpdGggY29uZmlndXJhdGlvbiBpbmNsdWRpbmcgdGhlIGV2ZW50IHR5cGUsIGhhbmRsZXJzIGFuZCBvdGhlciBwYXJhbWV0ZXJzLlxyXG4gKiBJbiBoYW5kbGVycywgdGhpcyByZWZlciB0byB0aGUgZXZlbnQgbGlzdGVuZXIgb2JqZWN0IGl0c2VsZi5cclxuICogWW91IGNhbiBhbHNvIHBhc3MgY3VzdG9tIHBhcmFtZXRlcnMgaW4gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LFxyXG4gKiBhbGwgY3VzdG9tIHBhcmFtZXRlcnMgd2lsbCBiZSBwb2x5ZmlsbGVkIGludG8gdGhlIGV2ZW50IGxpc3RlbmVyIG9iamVjdCBhbmQgY2FuIGJlIGFjY2Vzc2VkIGluIGhhbmRsZXJzLlxyXG4gKiAhI3poIOmAmui/h+aMh+WumuS4jeWQjOeahCBFdmVudCDlr7nosaHmnaXorr7nva7mg7PopoHliJvlu7rnmoTkuovku7bnm5HlkKzlmajjgIJcclxuICogQG1ldGhvZCBjcmVhdGVcclxuICogQHBhcmFtIHtPYmplY3R9IGFyZ09iaiBhIGpzb24gb2JqZWN0XHJcbiAqIEByZXR1cm5zIHtFdmVudExpc3RlbmVyfVxyXG4gKiBAc3RhdGljXHJcbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvZXZlbnQtbWFuYWdlci9DQ0V2ZW50TGlzdGVuZXIvY3JlYXRlLmpzfVxyXG4gKi9cclxuY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUgPSBmdW5jdGlvbiAoYXJnT2JqKSB7XHJcbiAgICBjYy5hc3NlcnRJRChhcmdPYmomJmFyZ09iai5ldmVudCwgMTkwMCk7XHJcblxyXG4gICAgdmFyIGxpc3RlbmVyVHlwZSA9IGFyZ09iai5ldmVudDtcclxuICAgIGRlbGV0ZSBhcmdPYmouZXZlbnQ7XHJcblxyXG4gICAgdmFyIGxpc3RlbmVyID0gbnVsbDtcclxuICAgIGlmKGxpc3RlbmVyVHlwZSA9PT0gY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FKVxyXG4gICAgICAgIGxpc3RlbmVyID0gbmV3IFRvdWNoT25lQnlPbmUoKTtcclxuICAgIGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFKVxyXG4gICAgICAgIGxpc3RlbmVyID0gbmV3IFRvdWNoQWxsQXRPbmNlKCk7XHJcbiAgICBlbHNlIGlmKGxpc3RlbmVyVHlwZSA9PT0gY2MuRXZlbnRMaXN0ZW5lci5NT1VTRSlcclxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBNb3VzZSgpO1xyXG4gICAgZWxzZSBpZihsaXN0ZW5lclR5cGUgPT09IGNjLkV2ZW50TGlzdGVuZXIuQ1VTVE9NKXtcclxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBDdXN0b20oYXJnT2JqLmV2ZW50TmFtZSwgYXJnT2JqLmNhbGxiYWNrKTtcclxuICAgICAgICBkZWxldGUgYXJnT2JqLmV2ZW50TmFtZTtcclxuICAgICAgICBkZWxldGUgYXJnT2JqLmNhbGxiYWNrO1xyXG4gICAgfSBlbHNlIGlmKGxpc3RlbmVyVHlwZSA9PT0gY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRClcclxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBLZXlib2FyZCgpO1xyXG4gICAgZWxzZSBpZihsaXN0ZW5lclR5cGUgPT09IGNjLkV2ZW50TGlzdGVuZXIuQUNDRUxFUkFUSU9OKXtcclxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBBY2NlbGVyYXRpb24oYXJnT2JqLmNhbGxiYWNrKTtcclxuICAgICAgICBkZWxldGUgYXJnT2JqLmNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcih2YXIga2V5IGluIGFyZ09iaikge1xyXG4gICAgICAgIGxpc3RlbmVyW2tleV0gPSBhcmdPYmpba2V5XTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0ZW5lcjtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuRXZlbnRMaXN0ZW5lcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==