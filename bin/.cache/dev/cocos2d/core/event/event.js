
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event.js';
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
var js = require("../platform/js");
/**
 * !#en Base class of all kinds of events.
 * !#zh 包含事件相关信息的对象。
 * @class Event
 */

/**
 * @method constructor
 * @param {String} type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */


cc.Event = function (type, bubbles) {
  /**
   * !#en The name of the event (case-sensitive), e.g. "click", "fire", or "submit".
   * !#zh 事件类型。
   * @property type
   * @type {String}
   */
  this.type = type;
  /**
   * !#en Indicate whether the event bubbles up through the tree or not.
   * !#zh 表示该事件是否进行冒泡。
   * @property bubbles
   * @type {Boolean}
   */

  this.bubbles = !!bubbles;
  /**
   * !#en A reference to the target to which the event was originally dispatched.
   * !#zh 最初事件触发的目标
   * @property target
   * @type {Object}
   */

  this.target = null;
  /**
   * !#en A reference to the currently registered target for the event.
   * !#zh 当前目标
   * @property currentTarget
   * @type {Object}
   */

  this.currentTarget = null;
  /**
   * !#en
   * Indicates which phase of the event flow is currently being evaluated.
   * Returns an integer value represented by 4 constants:
   *  - Event.NONE = 0
   *  - Event.CAPTURING_PHASE = 1
   *  - Event.AT_TARGET = 2
   *  - Event.BUBBLING_PHASE = 3
   * The phases are explained in the [section 3.1, Event dispatch and DOM event flow]
   * (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow), of the DOM Level 3 Events specification.
   * !#zh 事件阶段
   * @property eventPhase
   * @type {Number}
   */

  this.eventPhase = 0;
  /*
   * Indicates whether or not event.stopPropagation() has been called on the event.
   * @property _propagationStopped
   * @type {Boolean}
   * @private
   */

  this._propagationStopped = false;
  /*
   * Indicates whether or not event.stopPropagationImmediate() has been called on the event.
   * @property _propagationImmediateStopped
   * @type {Boolean}
   * @private
   */

  this._propagationImmediateStopped = false;
};

cc.Event.prototype = {
  constructor: cc.Event,

  /**
   * !#en Reset the event for being stored in the object pool.
   * !#zh 重置对象池中存储的事件。
   * @method unuse
   * @returns {String}
   */
  unuse: function unuse() {
    this.type = cc.Event.NO_TYPE;
    this.target = null;
    this.currentTarget = null;
    this.eventPhase = cc.Event.NONE;
    this._propagationStopped = false;
    this._propagationImmediateStopped = false;
  },

  /**
   * !#en Reuse the event for being used again by the object pool.
   * !#zh 用于对象池再次使用的事件。
   * @method reuse
   * @returns {String}
   */
  reuse: function reuse(type, bubbles) {
    this.type = type;
    this.bubbles = bubbles || false;
  },

  /**
   * !#en Stops propagation for current event.
   * !#zh 停止传递当前事件。
   * @method stopPropagation
   */
  stopPropagation: function stopPropagation() {
    this._propagationStopped = true;
  },

  /**
   * !#en Stops propagation for current event immediately,
   * the event won't even be dispatched to the listeners attached in the current target.
   * !#zh 立即停止当前事件的传递，事件甚至不会被分派到所连接的当前目标。
   * @method stopPropagationImmediate
   */
  stopPropagationImmediate: function stopPropagationImmediate() {
    this._propagationImmediateStopped = true;
  },

  /**
   * !#en Checks whether the event has been stopped.
   * !#zh 检查该事件是否已经停止传递.
   * @method isStopped
   * @returns {Boolean}
   */
  isStopped: function isStopped() {
    return this._propagationStopped || this._propagationImmediateStopped;
  },

  /**
   * !#en
   * <p>
   *     Gets current target of the event                                                            <br/>
   *     note: It only be available when the event listener is associated with node.                <br/>
   *          It returns 0 when the listener is associated with fixed priority.
   * </p>
   * !#zh 获取当前目标节点
   * @method getCurrentTarget
   * @returns {Node}  The target with which the event associates.
   */
  getCurrentTarget: function getCurrentTarget() {
    return this.currentTarget;
  },

  /**
   * !#en Gets the event type.
   * !#zh 获取事件类型
   * @method getType
   * @returns {String}
   */
  getType: function getType() {
    return this.type;
  }
}; //event type

/**
 * !#en Code for event without type.
 * !#zh 没有类型的事件
 * @property NO_TYPE
 * @static
 * @type {string}
 */

cc.Event.NO_TYPE = 'no_type';
/**
 * !#en The type code of Touch event.
 * !#zh 触摸事件类型
 * @property TOUCH
 * @static
 * @type {String}
 */

cc.Event.TOUCH = 'touch';
/**
 * !#en The type code of Mouse event.
 * !#zh 鼠标事件类型
 * @property MOUSE
 * @static
 * @type {String}
 */

cc.Event.MOUSE = 'mouse';
/**
 * !#en The type code of Keyboard event.
 * !#zh 键盘事件类型
 * @property KEYBOARD
 * @static
 * @type {String}
 */

cc.Event.KEYBOARD = 'keyboard';
/**
 * !#en The type code of Acceleration event.
 * !#zh 加速器事件类型
 * @property ACCELERATION
 * @static
 * @type {String}
 */

cc.Event.ACCELERATION = 'acceleration'; //event phase

/**
 * !#en Events not currently dispatched are in this phase
 * !#zh 尚未派发事件阶段
 * @property NONE
 * @type {Number}
 * @static
 */

cc.Event.NONE = 0;
/**
 * !#en
 * The capturing phase comprises the journey from the root to the last node before the event target's node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 捕获阶段，包括事件目标节点之前从根节点到最后一个节点的过程。
 * @property CAPTURING_PHASE
 * @type {Number}
 * @static
 */

cc.Event.CAPTURING_PHASE = 1;
/**
 * !#en
 * The target phase comprises only the event target node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 目标阶段仅包括事件目标节点。
 * @property AT_TARGET
 * @type {Number}
 * @static
 */

cc.Event.AT_TARGET = 2;
/**
 * !#en
 * The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the hierarchy
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 冒泡阶段， 包括回程遇到到层次根节点的任何后续节点。
 * @property BUBBLING_PHASE
 * @type {Number}
 * @static
 */

cc.Event.BUBBLING_PHASE = 3;
/**
 * !#en The Custom event
 * !#zh 自定义事件
 * @class Event.EventCustom
 *
 * @extends Event
 */

/**
 * @method constructor
 * @param {String} type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventCustom = function EventCustom(type, bubbles) {
  cc.Event.call(this, type, bubbles);
  /**
   * !#en A reference to the detailed data of the event
   * !#zh 事件的详细数据
   * @property detail
   * @type {Object}
   */

  this.detail = null;
};

js.extend(EventCustom, cc.Event);
EventCustom.prototype.reset = EventCustom;
/**
 * !#en Sets user data
 * !#zh 设置用户数据
 * @method setUserData
 * @param {*} data
 */

EventCustom.prototype.setUserData = function (data) {
  this.detail = data;
};
/**
 * !#en Gets user data
 * !#zh 获取用户数据
 * @method getUserData
 * @returns {*}
 */


EventCustom.prototype.getUserData = function () {
  return this.detail;
};
/**
 * !#en Gets event name
 * !#zh 获取事件名称
 * @method getEventName
 * @returns {String}
 */


EventCustom.prototype.getEventName = cc.Event.prototype.getType;
var MAX_POOL_SIZE = 10;

var _eventPool = new js.Pool(MAX_POOL_SIZE);

EventCustom.put = function (event) {
  _eventPool.put(event);
};

EventCustom.get = function (type, bubbles) {
  var event = _eventPool._get();

  if (event) {
    event.reset(type, bubbles);
  } else {
    event = new EventCustom(type, bubbles);
  }

  return event;
};

cc.Event.EventCustom = EventCustom;
module.exports = cc.Event;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50XFxldmVudC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJjYyIsIkV2ZW50IiwidHlwZSIsImJ1YmJsZXMiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiZXZlbnRQaGFzZSIsIl9wcm9wYWdhdGlvblN0b3BwZWQiLCJfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJ1bnVzZSIsIk5PX1RZUEUiLCJOT05FIiwicmV1c2UiLCJzdG9wUHJvcGFnYXRpb24iLCJzdG9wUHJvcGFnYXRpb25JbW1lZGlhdGUiLCJpc1N0b3BwZWQiLCJnZXRDdXJyZW50VGFyZ2V0IiwiZ2V0VHlwZSIsIlRPVUNIIiwiTU9VU0UiLCJLRVlCT0FSRCIsIkFDQ0VMRVJBVElPTiIsIkNBUFRVUklOR19QSEFTRSIsIkFUX1RBUkdFVCIsIkJVQkJMSU5HX1BIQVNFIiwiRXZlbnRDdXN0b20iLCJjYWxsIiwiZGV0YWlsIiwiZXh0ZW5kIiwicmVzZXQiLCJzZXRVc2VyRGF0YSIsImRhdGEiLCJnZXRVc2VyRGF0YSIsImdldEV2ZW50TmFtZSIsIk1BWF9QT09MX1NJWkUiLCJfZXZlbnRQb29sIiwiUG9vbCIsInB1dCIsImV2ZW50IiwiZ2V0IiwiX2dldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILEdB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LEtBQUgsQ0FBUzBCLFdBQVQsR0FBdUJBLFdBQXZCO0FBRUFnQixNQUFNLENBQUNDLE9BQVAsR0FBaUI1QyxFQUFFLENBQUNDLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIGpzID0gcmVxdWlyZShcIi4uL3BsYXRmb3JtL2pzXCIpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQmFzZSBjbGFzcyBvZiBhbGwga2luZHMgb2YgZXZlbnRzLlxyXG4gKiAhI3poIOWMheWQq+S6i+S7tuebuOWFs+S/oeaBr+eahOWvueixoeOAglxyXG4gKiBAY2xhc3MgRXZlbnRcclxuICovXHJcblxyXG4vKipcclxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoY2FzZS1zZW5zaXRpdmUpLCBlLmcuIFwiY2xpY2tcIiwgXCJmaXJlXCIsIG9yIFwic3VibWl0XCJcclxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxyXG4gKi9cclxuY2MuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBidWJibGVzKSB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChjYXNlLXNlbnNpdGl2ZSksIGUuZy4gXCJjbGlja1wiLCBcImZpcmVcIiwgb3IgXCJzdWJtaXRcIi5cclxuICAgICAqICEjemgg5LqL5Lu257G75Z6L44CCXHJcbiAgICAgKiBAcHJvcGVydHkgdHlwZVxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW5kaWNhdGUgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdC5cclxuICAgICAqICEjemgg6KGo56S66K+l5LqL5Lu25piv5ZCm6L+b6KGM5YaS5rOh44CCXHJcbiAgICAgKiBAcHJvcGVydHkgYnViYmxlc1xyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYnViYmxlcyA9ICEhYnViYmxlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIG9yaWdpbmFsbHkgZGlzcGF0Y2hlZC5cclxuICAgICAqICEjemgg5pyA5Yid5LqL5Lu26Kem5Y+R55qE55uu5qCHXHJcbiAgICAgKiBAcHJvcGVydHkgdGFyZ2V0XHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHkgcmVnaXN0ZXJlZCB0YXJnZXQgZm9yIHRoZSBldmVudC5cclxuICAgICAqICEjemgg5b2T5YmN55uu5qCHXHJcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudFRhcmdldFxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEluZGljYXRlcyB3aGljaCBwaGFzZSBvZiB0aGUgZXZlbnQgZmxvdyBpcyBjdXJyZW50bHkgYmVpbmcgZXZhbHVhdGVkLlxyXG4gICAgICogUmV0dXJucyBhbiBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IDQgY29uc3RhbnRzOlxyXG4gICAgICogIC0gRXZlbnQuTk9ORSA9IDBcclxuICAgICAqICAtIEV2ZW50LkNBUFRVUklOR19QSEFTRSA9IDFcclxuICAgICAqICAtIEV2ZW50LkFUX1RBUkdFVCA9IDJcclxuICAgICAqICAtIEV2ZW50LkJVQkJMSU5HX1BIQVNFID0gM1xyXG4gICAgICogVGhlIHBoYXNlcyBhcmUgZXhwbGFpbmVkIGluIHRoZSBbc2VjdGlvbiAzLjEsIEV2ZW50IGRpc3BhdGNoIGFuZCBET00gZXZlbnQgZmxvd11cclxuICAgICAqIChodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3cpLCBvZiB0aGUgRE9NIExldmVsIDMgRXZlbnRzIHNwZWNpZmljYXRpb24uXHJcbiAgICAgKiAhI3poIOS6i+S7tumYtuautVxyXG4gICAgICogQHByb3BlcnR5IGV2ZW50UGhhc2VcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXZlbnRQaGFzZSA9IDA7XHJcblxyXG4gICAgLypcclxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBldmVudC5zdG9wUHJvcGFnYXRpb24oKSBoYXMgYmVlbiBjYWxsZWQgb24gdGhlIGV2ZW50LlxyXG4gICAgICogQHByb3BlcnR5IF9wcm9wYWdhdGlvblN0b3BwZWRcclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fcHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XHJcblxyXG4gICAgLypcclxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCBldmVudC5zdG9wUHJvcGFnYXRpb25JbW1lZGlhdGUoKSBoYXMgYmVlbiBjYWxsZWQgb24gdGhlIGV2ZW50LlxyXG4gICAgICogQHByb3BlcnR5IF9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWRcclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gZmFsc2U7XHJcbn07XHJcbmNjLkV2ZW50LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBjYy5FdmVudCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVzZXQgdGhlIGV2ZW50IGZvciBiZWluZyBzdG9yZWQgaW4gdGhlIG9iamVjdCBwb29sLlxyXG4gICAgICogISN6aCDph43nva7lr7nosaHmsaDkuK3lrZjlgqjnmoTkuovku7bjgIJcclxuICAgICAqIEBtZXRob2QgdW51c2VcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHVudXNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy50eXBlID0gY2MuRXZlbnQuTk9fVFlQRTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50UGhhc2UgPSBjYy5FdmVudC5OT05FO1xyXG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV1c2UgdGhlIGV2ZW50IGZvciBiZWluZyB1c2VkIGFnYWluIGJ5IHRoZSBvYmplY3QgcG9vbC5cclxuICAgICAqICEjemgg55So5LqO5a+56LGh5rGg5YaN5qyh5L2/55So55qE5LqL5Lu244CCXHJcbiAgICAgKiBAbWV0aG9kIHJldXNlXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICByZXVzZTogZnVuY3Rpb24gKHR5cGUsIGJ1YmJsZXMpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXMgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdG9wcyBwcm9wYWdhdGlvbiBmb3IgY3VycmVudCBldmVudC5cclxuICAgICAqICEjemgg5YGc5q2i5Lyg6YCS5b2T5YmN5LqL5Lu244CCXHJcbiAgICAgKiBAbWV0aG9kIHN0b3BQcm9wYWdhdGlvblxyXG4gICAgICovXHJcbiAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RvcHMgcHJvcGFnYXRpb24gZm9yIGN1cnJlbnQgZXZlbnQgaW1tZWRpYXRlbHksXHJcbiAgICAgKiB0aGUgZXZlbnQgd29uJ3QgZXZlbiBiZSBkaXNwYXRjaGVkIHRvIHRoZSBsaXN0ZW5lcnMgYXR0YWNoZWQgaW4gdGhlIGN1cnJlbnQgdGFyZ2V0LlxyXG4gICAgICogISN6aCDnq4vljbPlgZzmraLlvZPliY3kuovku7bnmoTkvKDpgJLvvIzkuovku7bnlJroh7PkuI3kvJrooqvliIbmtL7liLDmiYDov57mjqXnmoTlvZPliY3nm67moIfjgIJcclxuICAgICAqIEBtZXRob2Qgc3RvcFByb3BhZ2F0aW9uSW1tZWRpYXRlXHJcbiAgICAgKi9cclxuICAgIHN0b3BQcm9wYWdhdGlvbkltbWVkaWF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gc3RvcHBlZC5cclxuICAgICAqICEjemgg5qOA5p+l6K+l5LqL5Lu25piv5ZCm5bey57uP5YGc5q2i5Lyg6YCSLlxyXG4gICAgICogQG1ldGhvZCBpc1N0b3BwZWRcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc1N0b3BwZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGFnYXRpb25TdG9wcGVkIHx8IHRoaXMuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiA8cD5cclxuICAgICAqICAgICBHZXRzIGN1cnJlbnQgdGFyZ2V0IG9mIHRoZSBldmVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgbm90ZTogSXQgb25seSBiZSBhdmFpbGFibGUgd2hlbiB0aGUgZXZlbnQgbGlzdGVuZXIgaXMgYXNzb2NpYXRlZCB3aXRoIG5vZGUuICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICBJdCByZXR1cm5zIDAgd2hlbiB0aGUgbGlzdGVuZXIgaXMgYXNzb2NpYXRlZCB3aXRoIGZpeGVkIHByaW9yaXR5LlxyXG4gICAgICogPC9wPlxyXG4gICAgICogISN6aCDojrflj5blvZPliY3nm67moIfoioLngrlcclxuICAgICAqIEBtZXRob2QgZ2V0Q3VycmVudFRhcmdldFxyXG4gICAgICogQHJldHVybnMge05vZGV9ICBUaGUgdGFyZ2V0IHdpdGggd2hpY2ggdGhlIGV2ZW50IGFzc29jaWF0ZXMuXHJcbiAgICAgKi9cclxuICAgIGdldEN1cnJlbnRUYXJnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VGFyZ2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyB0aGUgZXZlbnQgdHlwZS5cclxuICAgICAqICEjemgg6I635Y+W5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAbWV0aG9kIGdldFR5cGVcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldFR5cGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy9ldmVudCB0eXBlXHJcbi8qKlxyXG4gKiAhI2VuIENvZGUgZm9yIGV2ZW50IHdpdGhvdXQgdHlwZS5cclxuICogISN6aCDmsqHmnInnsbvlnovnmoTkuovku7ZcclxuICogQHByb3BlcnR5IE5PX1RZUEVcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY2MuRXZlbnQuTk9fVFlQRSA9ICdub190eXBlJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgVG91Y2ggZXZlbnQuXHJcbiAqICEjemgg6Kem5pG45LqL5Lu257G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBUT1VDSFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqL1xyXG5jYy5FdmVudC5UT1VDSCA9ICd0b3VjaCc7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgTW91c2UgZXZlbnQuXHJcbiAqICEjemgg6byg5qCH5LqL5Lu257G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBNT1VTRVxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqL1xyXG5jYy5FdmVudC5NT1VTRSA9ICdtb3VzZSc7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgS2V5Ym9hcmQgZXZlbnQuXHJcbiAqICEjemgg6ZSu55uY5LqL5Lu257G75Z6LXHJcbiAqIEBwcm9wZXJ0eSBLRVlCT0FSRFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqL1xyXG5jYy5FdmVudC5LRVlCT0FSRCA9ICdrZXlib2FyZCc7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgQWNjZWxlcmF0aW9uIGV2ZW50LlxyXG4gKiAhI3poIOWKoOmAn+WZqOS6i+S7tuexu+Wei1xyXG4gKiBAcHJvcGVydHkgQUNDRUxFUkFUSU9OXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUge1N0cmluZ31cclxuICovXHJcbmNjLkV2ZW50LkFDQ0VMRVJBVElPTiA9ICdhY2NlbGVyYXRpb24nO1xyXG5cclxuLy9ldmVudCBwaGFzZVxyXG4vKipcclxuICogISNlbiBFdmVudHMgbm90IGN1cnJlbnRseSBkaXNwYXRjaGVkIGFyZSBpbiB0aGlzIHBoYXNlXHJcbiAqICEjemgg5bCa5pyq5rS+5Y+R5LqL5Lu26Zi25q61XHJcbiAqIEBwcm9wZXJ0eSBOT05FXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmNjLkV2ZW50Lk5PTkUgPSAwO1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgY2FwdHVyaW5nIHBoYXNlIGNvbXByaXNlcyB0aGUgam91cm5leSBmcm9tIHRoZSByb290IHRvIHRoZSBsYXN0IG5vZGUgYmVmb3JlIHRoZSBldmVudCB0YXJnZXQncyBub2RlXHJcbiAqIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3dcclxuICogISN6aCDmjZXojrfpmLbmrrXvvIzljIXmi6zkuovku7bnm67moIfoioLngrnkuYvliY3ku47moLnoioLngrnliLDmnIDlkI7kuIDkuKroioLngrnnmoTov4fnqIvjgIJcclxuICogQHByb3BlcnR5IENBUFRVUklOR19QSEFTRVxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5jYy5FdmVudC5DQVBUVVJJTkdfUEhBU0UgPSAxO1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgdGFyZ2V0IHBoYXNlIGNvbXByaXNlcyBvbmx5IHRoZSBldmVudCB0YXJnZXQgbm9kZVxyXG4gKiBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC1mbG93XHJcbiAqICEjemgg55uu5qCH6Zi25q615LuF5YyF5ous5LqL5Lu255uu5qCH6IqC54K544CCXHJcbiAqIEBwcm9wZXJ0eSBBVF9UQVJHRVRcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHN0YXRpY1xyXG4gKi9cclxuY2MuRXZlbnQuQVRfVEFSR0VUID0gMjtcclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGJ1YmJsaW5nIHBoYXNlIGNvbXByaXNlcyBhbnkgc3Vic2VxdWVudCBub2RlcyBlbmNvdW50ZXJlZCBvbiB0aGUgcmV0dXJuIHRyaXAgdG8gdGhlIHJvb3Qgb2YgdGhlIGhpZXJhcmNoeVxyXG4gKiBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC1mbG93XHJcbiAqICEjemgg5YaS5rOh6Zi25q6177yMIOWMheaLrOWbnueoi+mBh+WIsOWIsOWxguasoeagueiKgueCueeahOS7u+S9leWQjue7reiKgueCueOAglxyXG4gKiBAcHJvcGVydHkgQlVCQkxJTkdfUEhBU0VcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHN0YXRpY1xyXG4gKi9cclxuY2MuRXZlbnQuQlVCQkxJTkdfUEhBU0UgPSAzO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIEN1c3RvbSBldmVudFxyXG4gKiAhI3poIOiHquWumuS5ieS6i+S7tlxyXG4gKiBAY2xhc3MgRXZlbnQuRXZlbnRDdXN0b21cclxuICpcclxuICogQGV4dGVuZHMgRXZlbnRcclxuICovXHJcblxyXG4vKipcclxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoY2FzZS1zZW5zaXRpdmUpLCBlLmcuIFwiY2xpY2tcIiwgXCJmaXJlXCIsIG9yIFwic3VibWl0XCJcclxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxyXG4gKi9cclxudmFyIEV2ZW50Q3VzdG9tID0gZnVuY3Rpb24gKHR5cGUsIGJ1YmJsZXMpIHtcclxuICAgIGNjLkV2ZW50LmNhbGwodGhpcywgdHlwZSwgYnViYmxlcyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEEgcmVmZXJlbmNlIHRvIHRoZSBkZXRhaWxlZCBkYXRhIG9mIHRoZSBldmVudFxyXG4gICAgICogISN6aCDkuovku7bnmoTor6bnu4bmlbDmja5cclxuICAgICAqIEBwcm9wZXJ0eSBkZXRhaWxcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZGV0YWlsID0gbnVsbDtcclxufTtcclxuXHJcbmpzLmV4dGVuZChFdmVudEN1c3RvbSwgY2MuRXZlbnQpO1xyXG5cclxuRXZlbnRDdXN0b20ucHJvdG90eXBlLnJlc2V0ID0gRXZlbnRDdXN0b207XHJcblxyXG4vKipcclxuICogISNlbiBTZXRzIHVzZXIgZGF0YVxyXG4gKiAhI3poIOiuvue9rueUqOaIt+aVsOaNrlxyXG4gKiBAbWV0aG9kIHNldFVzZXJEYXRhXHJcbiAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gKi9cclxuRXZlbnRDdXN0b20ucHJvdG90eXBlLnNldFVzZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHRoaXMuZGV0YWlsID0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEdldHMgdXNlciBkYXRhXHJcbiAqICEjemgg6I635Y+W55So5oi35pWw5o2uXHJcbiAqIEBtZXRob2QgZ2V0VXNlckRhdGFcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5FdmVudEN1c3RvbS5wcm90b3R5cGUuZ2V0VXNlckRhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXRhaWw7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBHZXRzIGV2ZW50IG5hbWVcclxuICogISN6aCDojrflj5bkuovku7blkI3np7BcclxuICogQG1ldGhvZCBnZXRFdmVudE5hbWVcclxuICogQHJldHVybnMge1N0cmluZ31cclxuICovXHJcbkV2ZW50Q3VzdG9tLnByb3RvdHlwZS5nZXRFdmVudE5hbWUgPSBjYy5FdmVudC5wcm90b3R5cGUuZ2V0VHlwZTtcclxuXHJcbnZhciBNQVhfUE9PTF9TSVpFID0gMTA7XHJcbnZhciBfZXZlbnRQb29sID0gbmV3IGpzLlBvb2woTUFYX1BPT0xfU0laRSk7XHJcbkV2ZW50Q3VzdG9tLnB1dCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgX2V2ZW50UG9vbC5wdXQoZXZlbnQpO1xyXG59O1xyXG5FdmVudEN1c3RvbS5nZXQgPSBmdW5jdGlvbiAodHlwZSwgYnViYmxlcykge1xyXG4gICAgdmFyIGV2ZW50ID0gX2V2ZW50UG9vbC5fZ2V0KCk7XHJcbiAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5yZXNldCh0eXBlLCBidWJibGVzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50Q3VzdG9tKHR5cGUsIGJ1YmJsZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV2ZW50O1xyXG59O1xyXG5cclxuY2MuRXZlbnQuRXZlbnRDdXN0b20gPSBFdmVudEN1c3RvbTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuRXZlbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9