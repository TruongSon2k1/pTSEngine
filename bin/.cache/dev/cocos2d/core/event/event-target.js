
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event-target.js';
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

var CallbacksInvoker = require('../platform/callbacks-invoker');

var fastRemove = js.array.fastRemove;
/**
 * !#en
 * EventTarget is an object to which an event is dispatched when something has occurred.
 * Entity are the most common event targets, but other objects can be event targets too.
 *
 * Event targets are an important part of the Fireball event model.
 * The event target serves as the focal point for how events flow through the scene graph.
 * When an event such as a mouse click or a keypress occurs, Fireball dispatches an event object
 * into the event flow from the root of the hierarchy. The event object then makes its way through
 * the scene graph until it reaches the event target, at which point it begins its return trip through
 * the scene graph. This round-trip journey to the event target is conceptually divided into three phases:
 * - The capture phase comprises the journey from the root to the last node before the event target's node
 * - The target phase comprises only the event target node
 * - The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the tree
 * See also: http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * Event targets can implement the following methods:
 *  - _getCapturingTargets
 *  - _getBubblingTargets
 *
 * !#zh
 * 事件目标是事件触发时，分派的事件对象，Node 是最常见的事件目标，
 * 但是其他对象也可以是事件目标。<br/>
 *
 * @class EventTarget
 * @extends CallbacksInvoker
 */

function EventTarget() {
  CallbacksInvoker.call(this);
}

js.extend(EventTarget, CallbacksInvoker);
var proto = EventTarget.prototype;
/**
 * !#en Checks whether the EventTarget object has any callback registered for a specific type of event.
 * !#zh 检查事件目标对象是否有为特定类型的事件注册的回调。
 * @method hasEventListener
 * @param {String} type - The type of event.
 * @return {Boolean} True if a callback of the specified type is registered; false otherwise.
 */

/**
 * !#en
 * Register an callback of a specific event type on the EventTarget.
 * This type of event should be triggered via `emit`.
 * !#zh
 * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
 *
 * @method on
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {any} [callback.arg1] arg1
 * @param {any} [callback.arg2] arg2
 * @param {any} [callback.arg3] arg3
 * @param {any} [callback.arg4] arg4
 * @param {any} [callback.arg5] arg5
 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
 * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
 * @typescript
 * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
 * @example
 * eventTarget.on('fire', function () {
 *     cc.log("fire in the hole");
 * }, node);
 */

proto.__on = proto.on;

proto.on = function (type, callback, target, once) {
  if (!callback) {
    cc.errorID(6800);
    return;
  }

  if (!this.hasEventListener(type, callback, target)) {
    this.__on(type, callback, target, once);

    if (target && target.__eventTargets) {
      target.__eventTargets.push(this);
    }
  }

  return callback;
};
/**
 * !#en
 * Removes the listeners previously registered with the same type, callback, target and or useCapture,
 * if only type is passed as parameter, all listeners registered with that type will be removed.
 * !#zh
 * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
 *
 * @method off
 * @param {String} type - A string representing the event type being removed.
 * @param {Function} [callback] - The callback to remove.
 * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
 * @example
 * // register fire eventListener
 * var callback = eventTarget.on('fire', function () {
 *     cc.log("fire in the hole");
 * }, target);
 * // remove fire event listener
 * eventTarget.off('fire', callback, target);
 * // remove all fire event listeners
 * eventTarget.off('fire');
 */


proto.__off = proto.off;

proto.off = function (type, callback, target) {
  if (!callback) {
    var list = this._callbackTable[type];
    if (!list) return;
    var infos = list.callbackInfos;

    for (var i = 0; i < infos.length; ++i) {
      var _target = infos[i] && infos[i].target;

      if (_target && _target.__eventTargets) {
        fastRemove(_target.__eventTargets, this);
      }
    }

    this.removeAll(type);
  } else {
    this.__off(type, callback, target);

    if (target && target.__eventTargets) {
      fastRemove(target.__eventTargets, this);
    }
  }
};
/**
 * !#en Removes all callbacks previously registered with the same target (passed as parameter).
 * This is not for removing all listeners in the current event target,
 * and this is not for removing all listeners the target parameter have registered.
 * It's only for removing all listeners (callback and target couple) registered on the current event target by the target parameter.
 * !#zh 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
 * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
 * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
 * @method targetOff
 * @param {Object} target - The target to be searched for all related listeners
 */


proto.targetOff = function (target) {
  this.removeAll(target);

  if (target && target.__eventTargets) {
    fastRemove(target.__eventTargets, this);
  }
};
/**
 * !#en
 * Register an callback of a specific event type on the EventTarget,
 * the callback will remove itself after the first time it is triggered.
 * !#zh
 * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
 *
 * @method once
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {any} [callback.arg1] arg1
 * @param {any} [callback.arg2] arg2
 * @param {any} [callback.arg3] arg3
 * @param {any} [callback.arg4] arg4
 * @param {any} [callback.arg5] arg5
 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
 * @example
 * eventTarget.once('fire', function () {
 *     cc.log("this is the callback and will be invoked only once");
 * }, node);
 */


proto.once = function (type, callback, target) {
  this.on(type, callback, target, true);
};
/**
 * !#en
 * Send an event with the event object.
 * !#zh
 * 通过事件对象派发事件
 *
 * @method dispatchEvent
 * @param {Event} event
 */


proto.dispatchEvent = function (event) {
  this.emit(event.type, event);
};
/**
 * !#en
 * Destroy all callbackInfos.
 * !#zh
 * 销毁记录的事件
 *
 * @method clear
 */


proto.clear = function () {
  // remove all callback
  for (var key in this._callbackTable) {
    var list = this._callbackTable[key];
    var infos = list.callbackInfos;

    for (var i = infos.length - 1; i >= 0; i--) {
      var info = infos[i];

      if (info) {
        this.off(key, info.callback, info.target);
      }
    }
  }
};

cc.EventTarget = module.exports = EventTarget;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50XFxldmVudC10YXJnZXQuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiQ2FsbGJhY2tzSW52b2tlciIsImZhc3RSZW1vdmUiLCJhcnJheSIsIkV2ZW50VGFyZ2V0IiwiY2FsbCIsImV4dGVuZCIsInByb3RvIiwicHJvdG90eXBlIiwiX19vbiIsIm9uIiwidHlwZSIsImNhbGxiYWNrIiwidGFyZ2V0Iiwib25jZSIsImNjIiwiZXJyb3JJRCIsImhhc0V2ZW50TGlzdGVuZXIiLCJfX2V2ZW50VGFyZ2V0cyIsInB1c2giLCJfX29mZiIsIm9mZiIsImxpc3QiLCJfY2FsbGJhY2tUYWJsZSIsImluZm9zIiwiY2FsbGJhY2tJbmZvcyIsImkiLCJsZW5ndGgiLCJyZW1vdmVBbGwiLCJ0YXJnZXRPZmYiLCJkaXNwYXRjaEV2ZW50IiwiZXZlbnQiLCJlbWl0IiwiY2xlYXIiLCJrZXkiLCJpbmZvIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQywrQkFBRCxDQUFoQzs7QUFFQSxJQUFJRSxVQUFVLEdBQUdILEVBQUUsQ0FBQ0ksS0FBSCxDQUFTRCxVQUExQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxT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Q0FBbEI7O0FBQ0EsVUFBSVMsSUFBSixFQUFVO0FBQ04sYUFBS2QsR0FBTCxDQUFTYSxHQUFULEVBQWNDLElBQUksQ0FBQ3ZCLFFBQW5CLEVBQTZCdUIsSUFBSSxDQUFDdEIsTUFBbEM7QUFDSDtBQUNKO0FBQ0o7QUFDSixDQVpEOztBQWNBRSxFQUFFLENBQUNYLFdBQUgsR0FBaUJnQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJqQyxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcclxuY29uc3QgQ2FsbGJhY2tzSW52b2tlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2NhbGxiYWNrcy1pbnZva2VyJyk7XHJcblxyXG52YXIgZmFzdFJlbW92ZSA9IGpzLmFycmF5LmZhc3RSZW1vdmU7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBFdmVudFRhcmdldCBpcyBhbiBvYmplY3QgdG8gd2hpY2ggYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCB3aGVuIHNvbWV0aGluZyBoYXMgb2NjdXJyZWQuXHJcbiAqIEVudGl0eSBhcmUgdGhlIG1vc3QgY29tbW9uIGV2ZW50IHRhcmdldHMsIGJ1dCBvdGhlciBvYmplY3RzIGNhbiBiZSBldmVudCB0YXJnZXRzIHRvby5cclxuICpcclxuICogRXZlbnQgdGFyZ2V0cyBhcmUgYW4gaW1wb3J0YW50IHBhcnQgb2YgdGhlIEZpcmViYWxsIGV2ZW50IG1vZGVsLlxyXG4gKiBUaGUgZXZlbnQgdGFyZ2V0IHNlcnZlcyBhcyB0aGUgZm9jYWwgcG9pbnQgZm9yIGhvdyBldmVudHMgZmxvdyB0aHJvdWdoIHRoZSBzY2VuZSBncmFwaC5cclxuICogV2hlbiBhbiBldmVudCBzdWNoIGFzIGEgbW91c2UgY2xpY2sgb3IgYSBrZXlwcmVzcyBvY2N1cnMsIEZpcmViYWxsIGRpc3BhdGNoZXMgYW4gZXZlbnQgb2JqZWN0XHJcbiAqIGludG8gdGhlIGV2ZW50IGZsb3cgZnJvbSB0aGUgcm9vdCBvZiB0aGUgaGllcmFyY2h5LiBUaGUgZXZlbnQgb2JqZWN0IHRoZW4gbWFrZXMgaXRzIHdheSB0aHJvdWdoXHJcbiAqIHRoZSBzY2VuZSBncmFwaCB1bnRpbCBpdCByZWFjaGVzIHRoZSBldmVudCB0YXJnZXQsIGF0IHdoaWNoIHBvaW50IGl0IGJlZ2lucyBpdHMgcmV0dXJuIHRyaXAgdGhyb3VnaFxyXG4gKiB0aGUgc2NlbmUgZ3JhcGguIFRoaXMgcm91bmQtdHJpcCBqb3VybmV5IHRvIHRoZSBldmVudCB0YXJnZXQgaXMgY29uY2VwdHVhbGx5IGRpdmlkZWQgaW50byB0aHJlZSBwaGFzZXM6XHJcbiAqIC0gVGhlIGNhcHR1cmUgcGhhc2UgY29tcHJpc2VzIHRoZSBqb3VybmV5IGZyb20gdGhlIHJvb3QgdG8gdGhlIGxhc3Qgbm9kZSBiZWZvcmUgdGhlIGV2ZW50IHRhcmdldCdzIG5vZGVcclxuICogLSBUaGUgdGFyZ2V0IHBoYXNlIGNvbXByaXNlcyBvbmx5IHRoZSBldmVudCB0YXJnZXQgbm9kZVxyXG4gKiAtIFRoZSBidWJibGluZyBwaGFzZSBjb21wcmlzZXMgYW55IHN1YnNlcXVlbnQgbm9kZXMgZW5jb3VudGVyZWQgb24gdGhlIHJldHVybiB0cmlwIHRvIHRoZSByb290IG9mIHRoZSB0cmVlXHJcbiAqIFNlZSBhbHNvOiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3dcclxuICpcclxuICogRXZlbnQgdGFyZ2V0cyBjYW4gaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcclxuICogIC0gX2dldENhcHR1cmluZ1RhcmdldHNcclxuICogIC0gX2dldEJ1YmJsaW5nVGFyZ2V0c1xyXG4gKlxyXG4gKiAhI3poXHJcbiAqIOS6i+S7tuebruagh+aYr+S6i+S7tuinpuWPkeaXtu+8jOWIhua0vueahOS6i+S7tuWvueixoe+8jE5vZGUg5piv5pyA5bi46KeB55qE5LqL5Lu255uu5qCH77yMXHJcbiAqIOS9huaYr+WFtuS7luWvueixoeS5n+WPr+S7peaYr+S6i+S7tuebruagh+OAgjxici8+XHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudFRhcmdldFxyXG4gKiBAZXh0ZW5kcyBDYWxsYmFja3NJbnZva2VyXHJcbiAqL1xyXG5mdW5jdGlvbiBFdmVudFRhcmdldCAoKSB7XHJcbiAgICBDYWxsYmFja3NJbnZva2VyLmNhbGwodGhpcyk7XHJcbn1cclxuanMuZXh0ZW5kKEV2ZW50VGFyZ2V0LCBDYWxsYmFja3NJbnZva2VyKTtcclxuXHJcbnZhciBwcm90byA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENoZWNrcyB3aGV0aGVyIHRoZSBFdmVudFRhcmdldCBvYmplY3QgaGFzIGFueSBjYWxsYmFjayByZWdpc3RlcmVkIGZvciBhIHNwZWNpZmljIHR5cGUgb2YgZXZlbnQuXHJcbiAqICEjemgg5qOA5p+l5LqL5Lu255uu5qCH5a+56LGh5piv5ZCm5pyJ5Li654m55a6a57G75Z6L55qE5LqL5Lu25rOo5YaM55qE5Zue6LCD44CCXHJcbiAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50LlxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGEgY2FsbGJhY2sgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGlzIHJlZ2lzdGVyZWQ7IGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIEV2ZW50VGFyZ2V0LlxyXG4gKiBUaGlzIHR5cGUgb2YgZXZlbnQgc2hvdWxkIGJlIHRyaWdnZXJlZCB2aWEgYGVtaXRgLlxyXG4gKiAhI3poXHJcbiAqIOazqOWGjOS6i+S7tuebruagh+eahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg+OAgui/meenjeexu+Wei+eahOS6i+S7tuW6lOivpeiiqyBgZW1pdGAg6Kem5Y+R44CCXHJcbiAqXHJcbiAqIEBtZXRob2Qgb25cclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcxXSBhcmcxXHJcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMl0gYXJnMlxyXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzNdIGFyZzNcclxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XHJcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNV0gYXJnNVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcclxuICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXHJcbiAqIEB0eXBlc2NyaXB0XHJcbiAqIG9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IFRcclxuICogQGV4YW1wbGVcclxuICogZXZlbnRUYXJnZXQub24oJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICBjYy5sb2coXCJmaXJlIGluIHRoZSBob2xlXCIpO1xyXG4gKiB9LCBub2RlKTtcclxuICovXHJcbnByb3RvLl9fb24gPSBwcm90by5vbjtcclxucHJvdG8ub24gPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSkge1xyXG4gICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgIGNjLmVycm9ySUQoNjgwMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggIXRoaXMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSApIHtcclxuICAgICAgICB0aGlzLl9fb24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSk7XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5fX2V2ZW50VGFyZ2V0cy5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjYWxsYmFjaztcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJlbW92ZXMgdGhlIGxpc3RlbmVycyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2FtZSB0eXBlLCBjYWxsYmFjaywgdGFyZ2V0IGFuZCBvciB1c2VDYXB0dXJlLFxyXG4gKiBpZiBvbmx5IHR5cGUgaXMgcGFzc2VkIGFzIHBhcmFtZXRlciwgYWxsIGxpc3RlbmVycyByZWdpc3RlcmVkIHdpdGggdGhhdCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5cclxuICogISN6aFxyXG4gKiDliKDpmaTkuYvliY3nlKjlkIznsbvlnovvvIzlm57osIPvvIznm67moIfmiJYgdXNlQ2FwdHVyZSDms6jlhoznmoTkuovku7bnm5HlkKzlmajvvIzlpoLmnpzlj6rkvKDpgJIgdHlwZe+8jOWwhuS8muWIoOmZpCB0eXBlIOexu+Wei+eahOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxyXG4gKlxyXG4gKiBAbWV0aG9kIG9mZlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSBiZWluZyByZW1vdmVkLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cclxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyByZWdpc3RlciBmaXJlIGV2ZW50TGlzdGVuZXJcclxuICogdmFyIGNhbGxiYWNrID0gZXZlbnRUYXJnZXQub24oJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICBjYy5sb2coXCJmaXJlIGluIHRoZSBob2xlXCIpO1xyXG4gKiB9LCB0YXJnZXQpO1xyXG4gKiAvLyByZW1vdmUgZmlyZSBldmVudCBsaXN0ZW5lclxyXG4gKiBldmVudFRhcmdldC5vZmYoJ2ZpcmUnLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICogLy8gcmVtb3ZlIGFsbCBmaXJlIGV2ZW50IGxpc3RlbmVyc1xyXG4gKiBldmVudFRhcmdldC5vZmYoJ2ZpcmUnKTtcclxuICovXHJcbnByb3RvLl9fb2ZmID0gcHJvdG8ub2ZmO1xyXG5wcm90by5vZmYgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xyXG4gICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVt0eXBlXTtcclxuICAgICAgICBpZiAoIWxpc3QpIHJldHVybjtcclxuICAgICAgICBsZXQgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gaW5mb3NbaV0gJiYgaW5mb3NbaV0udGFyZ2V0O1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xyXG4gICAgICAgICAgICAgICAgZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsKHR5cGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fX29mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcclxuICAgICAgICAgICAgZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJlbW92ZXMgYWxsIGNhbGxiYWNrcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2FtZSB0YXJnZXQgKHBhc3NlZCBhcyBwYXJhbWV0ZXIpLlxyXG4gKiBUaGlzIGlzIG5vdCBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBldmVudCB0YXJnZXQsXHJcbiAqIGFuZCB0aGlzIGlzIG5vdCBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycyB0aGUgdGFyZ2V0IHBhcmFtZXRlciBoYXZlIHJlZ2lzdGVyZWQuXHJcbiAqIEl0J3Mgb25seSBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycyAoY2FsbGJhY2sgYW5kIHRhcmdldCBjb3VwbGUpIHJlZ2lzdGVyZWQgb24gdGhlIGN1cnJlbnQgZXZlbnQgdGFyZ2V0IGJ5IHRoZSB0YXJnZXQgcGFyYW1ldGVyLlxyXG4gKiAhI3poIOWcqOW9k+WJjSBFdmVudFRhcmdldCDkuIrliKDpmaTmjIflrprnm67moIfvvIh0YXJnZXQg5Y+C5pWw77yJ5rOo5YaM55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo44CCXHJcbiAqIOi/meS4quWHveaVsOaXoOazleWIoOmZpOW9k+WJjSBFdmVudFRhcmdldCDnmoTmiYDmnInkuovku7bnm5HlkKzlmajvvIzkuZ/ml6Dms5XliKDpmaQgdGFyZ2V0IOWPguaVsOaJgOazqOWGjOeahOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxyXG4gKiDov5nkuKrlh73mlbDlj6rog73liKDpmaQgdGFyZ2V0IOWPguaVsOWcqOW9k+WJjSBFdmVudFRhcmdldCDkuIrms6jlhoznmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcclxuICogQG1ldGhvZCB0YXJnZXRPZmZcclxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIFRoZSB0YXJnZXQgdG8gYmUgc2VhcmNoZWQgZm9yIGFsbCByZWxhdGVkIGxpc3RlbmVyc1xyXG4gKi9cclxucHJvdG8udGFyZ2V0T2ZmID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgdGhpcy5yZW1vdmVBbGwodGFyZ2V0KTtcclxuICAgIFxyXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcclxuICAgICAgICBmYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIEV2ZW50VGFyZ2V0LFxyXG4gKiB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIGFmdGVyIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHRyaWdnZXJlZC5cclxuICogISN6aFxyXG4gKiDms6jlhozkuovku7bnm67moIfnmoTnibnlrprkuovku7bnsbvlnovlm57osIPvvIzlm57osIPkvJrlnKjnrKzkuIDml7bpl7Tooqvop6blj5HlkI7liKDpmaToh6rouqvjgIJcclxuICpcclxuICogQG1ldGhvZCBvbmNlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXHJcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMV0gYXJnMVxyXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcclxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXHJcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNF0gYXJnNFxyXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcclxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXHJcbiAqIEBleGFtcGxlXHJcbiAqIGV2ZW50VGFyZ2V0Lm9uY2UoJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICBjYy5sb2coXCJ0aGlzIGlzIHRoZSBjYWxsYmFjayBhbmQgd2lsbCBiZSBpbnZva2VkIG9ubHkgb25jZVwiKTtcclxuICogfSwgbm9kZSk7XHJcbiAqL1xyXG5wcm90by5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcclxuICAgIHRoaXMub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdHJ1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBTZW5kIGFuIGV2ZW50IHdpdGggdGhlIGV2ZW50IG9iamVjdC5cclxuICogISN6aFxyXG4gKiDpgJrov4fkuovku7blr7nosaHmtL7lj5Hkuovku7ZcclxuICpcclxuICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XHJcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XHJcbiAqL1xyXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB0aGlzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogRGVzdHJveSBhbGwgY2FsbGJhY2tJbmZvcy5cclxuICogISN6aFxyXG4gKiDplIDmr4HorrDlvZXnmoTkuovku7ZcclxuICpcclxuICogQG1ldGhvZCBjbGVhclxyXG4gKi9cclxucHJvdG8uY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyByZW1vdmUgYWxsIGNhbGxiYWNrXHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9jYWxsYmFja1RhYmxlKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcclxuICAgICAgICBjb25zdCBpbmZvcyA9IGxpc3QuY2FsbGJhY2tJbmZvcztcclxuICAgICAgICBmb3IgKGxldCBpID0gaW5mb3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoa2V5LCBpbmZvLmNhbGxiYWNrLCBpbmZvLnRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jYy5FdmVudFRhcmdldCA9IG1vZHVsZS5leHBvcnRzID0gRXZlbnRUYXJnZXQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9