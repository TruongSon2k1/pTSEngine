
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCEvent.js';
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
var js = cc.js;

require('../event/event');
/**
 * !#en The mouse event
 * !#zh 鼠标事件类型
 * @class Event.EventMouse
 *
 * @extends Event
 * @param {Number} eventType - The mouse event type, UP, DOWN, MOVE, CANCELED
 * @param {Boolean} [bubbles=false] - A boolean indicating whether the event bubbles up through the tree or not
 */


var EventMouse = function EventMouse(eventType, bubbles) {
  cc.Event.call(this, cc.Event.MOUSE, bubbles);
  this._eventType = eventType;
  this._button = 0;
  this._x = 0;
  this._y = 0;
  this._prevX = 0;
  this._prevY = 0;
  this._scrollX = 0;
  this._scrollY = 0;
};

js.extend(EventMouse, cc.Event);
var proto = EventMouse.prototype;
/**
 * !#en Sets scroll data.
 * !#zh 设置鼠标的滚动数据。
 * @method setScrollData
 * @param {Number} scrollX
 * @param {Number} scrollY
 */

proto.setScrollData = function (scrollX, scrollY) {
  this._scrollX = scrollX;
  this._scrollY = scrollY;
};
/**
 * !#en Returns the x axis scroll value.
 * !#zh 获取鼠标滚动的X轴距离，只有滚动时才有效。
 * @method getScrollX
 * @returns {Number}
 */


proto.getScrollX = function () {
  return this._scrollX;
};
/**
 * !#en Returns the y axis scroll value.
 * !#zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
 * @method getScrollY
 * @returns {Number}
 */


proto.getScrollY = function () {
  return this._scrollY;
};
/**
 * !#en Sets cursor location.
 * !#zh 设置当前鼠标位置。
 * @method setLocation
 * @param {Number} x
 * @param {Number} y
 */


proto.setLocation = function (x, y) {
  this._x = x;
  this._y = y;
};
/**
 * !#en Returns cursor location.
 * !#zh 获取鼠标位置对象，对象包含 x 和 y 属性。
 * @method getLocation
 * @return {Vec2} location
 */


proto.getLocation = function () {
  return cc.v2(this._x, this._y);
};
/**
 * !#en Returns the current cursor location in screen coordinates.
 * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
 * @method getLocationInView
 * @return {Vec2}
 */


proto.getLocationInView = function () {
  return cc.v2(this._x, cc.view._designResolutionSize.height - this._y);
};

proto._setPrevCursor = function (x, y) {
  this._prevX = x;
  this._prevY = y;
};
/**
 * !#en Returns the previous touch location.
 * !#zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
 * @method getPreviousLocation
 * @return {Vec2}
 */


proto.getPreviousLocation = function () {
  return cc.v2(this._prevX, this._prevY);
};
/**
 * !#en Returns the delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
 * @method getDelta
 * @return {Vec2}
 */


proto.getDelta = function () {
  return cc.v2(this._x - this._prevX, this._y - this._prevY);
};
/**
 * !#en Returns the X axis delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的 X 轴距离。
 * @method getDeltaX
 * @return {Number}
 */


proto.getDeltaX = function () {
  return this._x - this._prevX;
};
/**
 * !#en Returns the Y axis delta distance from the previous location to current location.
 * !#zh 获取鼠标距离上一次事件移动的 Y 轴距离。
 * @method getDeltaY
 * @return {Number}
 */


proto.getDeltaY = function () {
  return this._y - this._prevY;
};
/**
 * !#en Sets mouse button.
 * !#zh 设置鼠标按键。
 * @method setButton
 * @param {Number} button
 */


proto.setButton = function (button) {
  this._button = button;
};
/**
 * !#en Returns mouse button.
 * !#zh 获取鼠标按键。
 * @method getButton
 * @returns {Number}
 */


proto.getButton = function () {
  return this._button;
};
/**
 * !#en Returns location X axis data.
 * !#zh 获取鼠标当前位置 X 轴。
 * @method getLocationX
 * @returns {Number}
 */


proto.getLocationX = function () {
  return this._x;
};
/**
 * !#en Returns location Y axis data.
 * !#zh 获取鼠标当前位置 Y 轴。
 * @method getLocationY
 * @returns {Number}
 */


proto.getLocationY = function () {
  return this._y;
}; //Inner event types of MouseEvent

/**
 * !#en The none event code of mouse event.
 * !#zh 无。
 * @property NONE
 * @static
 * @type {Number}
 */


EventMouse.NONE = 0;
/**
 * !#en The event type code of mouse down event.
 * !#zh 鼠标按下事件。
 * @property DOWN
 * @static
 * @type {Number}
 */

EventMouse.DOWN = 1;
/**
 * !#en The event type code of mouse up event.
 * !#zh 鼠标按下后释放事件。
 * @property UP
 * @static
 * @type {Number}
 */

EventMouse.UP = 2;
/**
 * !#en The event type code of mouse move event.
 * !#zh 鼠标移动事件。
 * @property MOVE
 * @static
 * @type {Number}
 */

EventMouse.MOVE = 3;
/**
 * !#en The event type code of mouse scroll event.
 * !#zh 鼠标滚轮事件。
 * @property SCROLL
 * @static
 * @type {Number}
 */

EventMouse.SCROLL = 4;
/**
 * !#en The tag of Mouse left button.
 * !#zh 鼠标左键的标签。
 * @property BUTTON_LEFT
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_LEFT = 0;
/**
 * !#en The tag of Mouse right button  (The right button number is 2 on browser).
 * !#zh 鼠标右键的标签。
 * @property BUTTON_RIGHT
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_RIGHT = 2;
/**
 * !#en The tag of Mouse middle button  (The right button number is 1 on browser).
 * !#zh 鼠标中键的标签。
 * @property BUTTON_MIDDLE
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_MIDDLE = 1;
/**
 * !#en The tag of Mouse button 4.
 * !#zh 鼠标按键 4 的标签。
 * @property BUTTON_4
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_4 = 3;
/**
 * !#en The tag of Mouse button 5.
 * !#zh 鼠标按键 5 的标签。
 * @property BUTTON_5
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_5 = 4;
/**
 * !#en The tag of Mouse button 6.
 * !#zh 鼠标按键 6 的标签。
 * @property BUTTON_6
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_6 = 5;
/**
 * !#en The tag of Mouse button 7.
 * !#zh 鼠标按键 7 的标签。
 * @property BUTTON_7
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_7 = 6;
/**
 * !#en The tag of Mouse button 8.
 * !#zh 鼠标按键 8 的标签。
 * @property BUTTON_8
 * @static
 * @type {Number}
 */

EventMouse.BUTTON_8 = 7;
/**
 * !#en The touch event
 * !#zh 触摸事件
 * @class Event.EventTouch
 * @constructor
 * @extends Event
 */

/**
 * @method constructor
 * @param {Array} touchArr - The array of the touches
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventTouch = function EventTouch(touchArr, bubbles) {
  cc.Event.call(this, cc.Event.TOUCH, bubbles);
  this._eventCode = 0;
  this._touches = touchArr || [];
  /**
   * !#en The current touch object
   * !#zh 当前触点对象
   * @property touch
   * @type {Touch}
   */

  this.touch = null; // Actually duplicated, because of history issue, currentTouch was in the original design, touch was added in creator engine
  // They should point to the same object

  this.currentTouch = null;
};

js.extend(EventTouch, cc.Event);
proto = EventTouch.prototype;
/**
 * !#en Returns event code.
 * !#zh 获取事件类型。
 * @method getEventCode
 * @returns {Number}
 */

proto.getEventCode = function () {
  return this._eventCode;
};
/**
 * !#en Returns touches of event.
 * !#zh 获取触摸点的列表。
 * @method getTouches
 * @returns {Array}
 */


proto.getTouches = function () {
  return this._touches;
};

proto._setEventCode = function (eventCode) {
  this._eventCode = eventCode;
};

proto._setTouches = function (touches) {
  this._touches = touches;
};
/**
 * !#en Sets touch location.
 * !#zh 设置当前触点位置
 * @method setLocation
 * @param {Number} x
 * @param {Number} y
 */


proto.setLocation = function (x, y) {
  this.touch && this.touch.setTouchInfo(this.touch.getID(), x, y);
};
/**
 * !#en Returns touch location.
 * !#zh 获取触点位置。
 * @method getLocation
 * @return {Vec2} location
 */


proto.getLocation = function () {
  return this.touch ? this.touch.getLocation() : cc.v2();
};
/**
 * !#en Returns the current touch location in screen coordinates.
 * !#zh 获取当前触点在游戏窗口中的位置。
 * @method getLocationInView
 * @return {Vec2}
 */


proto.getLocationInView = function () {
  return this.touch ? this.touch.getLocationInView() : cc.v2();
};
/**
 * !#en Returns the previous touch location.
 * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
 * @method getPreviousLocation
 * @return {Vec2}
 */


proto.getPreviousLocation = function () {
  return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
/**
 * !#en Returns the start touch location.
 * !#zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
 * @method getStartLocation
 * @returns {Vec2}
 */


proto.getStartLocation = function () {
  return this.touch ? this.touch.getStartLocation() : cc.v2();
};
/**
 * !#en Returns the id of cc.Touch.
 * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
 * @method getID
 * @return {Number}
 */


proto.getID = function () {
  return this.touch ? this.touch.getID() : null;
};
/**
 * !#en Returns the delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
 * @method getDelta
 * @return {Vec2}
 */


proto.getDelta = function () {
  return this.touch ? this.touch.getDelta() : cc.v2();
};
/**
 * !#en Returns the X axis delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的 x 轴距离。
 * @method getDeltaX
 * @return {Number}
 */


proto.getDeltaX = function () {
  return this.touch ? this.touch.getDelta().x : 0;
};
/**
 * !#en Returns the Y axis delta distance from the previous location to current location.
 * !#zh 获取触点距离上一次事件移动的 y 轴距离。
 * @method getDeltaY
 * @return {Number}
 */


proto.getDeltaY = function () {
  return this.touch ? this.touch.getDelta().y : 0;
};
/**
 * !#en Returns location X axis data.
 * !#zh 获取当前触点 X 轴位置。
 * @method getLocationX
 * @returns {Number}
 */


proto.getLocationX = function () {
  return this.touch ? this.touch.getLocationX() : 0;
};
/**
 * !#en Returns location Y axis data.
 * !#zh 获取当前触点 Y 轴位置。
 * @method getLocationY
 * @returns {Number}
 */


proto.getLocationY = function () {
  return this.touch ? this.touch.getLocationY() : 0;
};
/**
 * !#en The maximum touch numbers
 * !#zh 最大触摸数量。
 * @constant
 * @type {Number}
 */


EventTouch.MAX_TOUCHES = 5;
/**
 * !#en The event type code of touch began event.
 * !#zh 开始触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.BEGAN = 0;
/**
 * !#en The event type code of touch moved event.
 * !#zh 触摸后移动事件
 * @constant
 * @type {Number}
 */

EventTouch.MOVED = 1;
/**
 * !#en The event type code of touch ended event.
 * !#zh 结束触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.ENDED = 2;
/**
 * !#en The event type code of touch cancelled event.
 * !#zh 取消触摸事件
 * @constant
 * @type {Number}
 */

EventTouch.CANCELED = 3;
/**
 * !#en The acceleration event
 * !#zh 加速度事件
 * @class Event.EventAcceleration
 * @extends Event
 *
 * @param {Object} acc - The acceleration
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventAcceleration = function EventAcceleration(acc, bubbles) {
  cc.Event.call(this, cc.Event.ACCELERATION, bubbles);
  this.acc = acc;
};

js.extend(EventAcceleration, cc.Event);
/**
 * !#en The keyboard event
 * !#zh 键盘事件
 * @class Event.EventKeyboard
 * @extends Event
 *
 * @param {Number} keyCode - The key code of which triggered this event
 * @param {Boolean} isPressed - A boolean indicating whether the key have been pressed
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventKeyboard = function EventKeyboard(keyCode, isPressed, bubbles) {
  cc.Event.call(this, cc.Event.KEYBOARD, bubbles);
  /**
   * !#en
   * The keyCode read-only property represents a system and implementation dependent numerical code identifying the unmodified value of the pressed key.
   * This is usually the decimal ASCII (RFC 20) or Windows 1252 code corresponding to the key.
   * If the key can't be identified, this value is 0.
   *
   * !#zh
   * keyCode 是只读属性它表示一个系统和依赖于实现的数字代码，可以识别按键的未修改值。
   * 这通常是十进制 ASCII (RFC20) 或者 Windows 1252 代码，所对应的密钥。
   * 如果无法识别该键，则该值为 0。
   *
   * @property keyCode
   * @type {Number}
   */

  this.keyCode = keyCode;
  this.isPressed = isPressed;
};

js.extend(EventKeyboard, cc.Event);
cc.Event.EventMouse = EventMouse;
cc.Event.EventTouch = EventTouch;
cc.Event.EventAcceleration = EventAcceleration;
cc.Event.EventKeyboard = EventKeyboard;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50LW1hbmFnZXJcXENDRXZlbnQuanMiXSwibmFtZXMiOlsianMiLCJjYyIsInJlcXVpcmUiLCJFdmVudE1vdXNlIiwiZXZlbnRUeXBlIiwiYnViYmxlcyIsIkV2ZW50IiwiY2FsbCIsIk1PVVNFIiwiX2V2ZW50VHlwZSIsIl9idXR0b24iLCJfeCIsIl95IiwiX3ByZXZYIiwiX3ByZXZZIiwiX3Njcm9sbFgiLCJfc2Nyb2xsWSIsImV4dGVuZCIsInByb3RvIiwicHJvdG90eXBlIiwic2V0U2Nyb2xsRGF0YSIsInNjcm9sbFgiLCJzY3JvbGxZIiwiZ2V0U2Nyb2xsWCIsImdldFNjcm9sbFkiLCJzZXRMb2NhdGlvbiIsIngiLCJ5IiwiZ2V0TG9jYXRpb24iLCJ2MiIsImdldExvY2F0aW9uSW5WaWV3IiwidmlldyIsIl9kZXNpZ25SZXNvbHV0aW9uU2l6ZSIsImhlaWdodCIsIl9zZXRQcmV2Q3Vyc29yIiwiZ2V0UHJldmlvdXNMb2NhdGlvbiIsImdldERlbHRhIiwiZ2V0RGVsdGFYIiwiZ2V0RGVsdGFZIiwic2V0QnV0dG9uIiwiYnV0dG9uIiwiZ2V0QnV0dG9uIiwiZ2V0TG9jYXRpb25YIiwiZ2V0TG9jYXRpb25ZIiwiTk9ORSIsIkRPV04iLCJVUCIsIk1PVkUiLCJTQ1JPTEwiLCJCVVRUT05fTEVGVCIsIkJVVFRPTl9SSUdIVCIsIkJVVFRPTl9NSURETEUiLCJCVVRUT05fNCIsIkJVVFRPTl81IiwiQlVUVE9OXzYiLCJCVVRUT05fNyIsIkJVVFRPTl84IiwiRXZlbnRUb3VjaCIsInRvdWNoQXJyIiwiVE9VQ0giLCJfZXZlbnRDb2RlIiwiX3RvdWNoZXMiLCJ0b3VjaCIsImN1cnJlbnRUb3VjaCIsImdldEV2ZW50Q29kZSIsImdldFRvdWNoZXMiLCJfc2V0RXZlbnRDb2RlIiwiZXZlbnRDb2RlIiwiX3NldFRvdWNoZXMiLCJ0b3VjaGVzIiwic2V0VG91Y2hJbmZvIiwiZ2V0SUQiLCJnZXRTdGFydExvY2F0aW9uIiwiTUFYX1RPVUNIRVMiLCJCRUdBTiIsIk1PVkVEIiwiRU5ERUQiLCJDQU5DRUxFRCIsIkV2ZW50QWNjZWxlcmF0aW9uIiwiYWNjIiwiQUNDRUxFUkFUSU9OIiwiRXZlbnRLZXlib2FyZCIsImtleUNvZGUiLCJpc1ByZXNzZWQiLCJLRVlCT0FSRCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUVBRSxPQUFPLENBQUMsZ0JBQUQsQ0FBUDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBVUMsU0FBVixFQUFxQkMsT0FBckIsRUFBOEI7QUFDM0NKLEVBQUFBLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTQyxJQUFULENBQWMsSUFBZCxFQUFvQk4sRUFBRSxDQUFDSyxLQUFILENBQVNFLEtBQTdCLEVBQW9DSCxPQUFwQztBQUNBLE9BQUtJLFVBQUwsR0FBa0JMLFNBQWxCO0FBQ0EsT0FBS00sT0FBTCxHQUFlLENBQWY7QUFDQSxPQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNBLE9BQUtDLEVBQUwsR0FBVSxDQUFWO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0gsQ0FWRDs7QUFZQWhCLEVBQUUsQ0FBQ2lCLE1BQUgsQ0FBVWQsVUFBVixFQUFzQkYsRUFBRSxDQUFDSyxLQUF6QjtBQUNBLElBQUlZLEtBQUssR0FBR2YsVUFBVSxDQUFDZ0IsU0FBdkI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUQsS0FBSyxDQUFDRSxhQUFOLEdBQXNCLFVBQVVDLE9BQVYsRUFBbUJDLE9BQW5CLEVBQTRCO0FBQzlDLE9BQUtQLFFBQUwsR0FBZ0JNLE9BQWhCO0FBQ0EsT0FBS0wsUUFBTCxHQUFnQk0sT0FBaEI7QUFDSCxDQUhEO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUosS0FBSyxDQUFDSyxVQUFOLEdBQW1CLFlBQVk7QUFDM0IsU0FBTyxLQUFLUixRQUFaO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FHLEtBQUssQ0FBQ00sVUFBTixHQUFtQixZQUFZO0FBQzNCLFNBQU8sS0FBS1IsUUFBWjtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FFLEtBQUssQ0FBQ08sV0FBTixHQUFvQixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDaEMsT0FBS2hCLEVBQUwsR0FBVWUsQ0FBVjtBQUNBLE9BQUtkLEVBQUwsR0FBVWUsQ0FBVjtBQUNILENBSEQ7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBVCxLQUFLLENBQUNVLFdBQU4sR0FBb0IsWUFBWTtBQUM1QixTQUFPM0IsRUFBRSxDQUFDNEIsRUFBSCxDQUFNLEtBQUtsQixFQUFYLEVBQWUsS0FBS0MsRUFBcEIsQ0FBUDtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBTSxLQUFLLENBQUNZLGlCQUFOLEdBQTBCLFlBQVc7QUFDakMsU0FBTzdCLEVBQUUsQ0FBQzRCLEVBQUgsQ0FBTSxLQUFLbEIsRUFBWCxFQUFlVixFQUFFLENBQUM4QixJQUFILENBQVFDLHFCQUFSLENBQThCQyxNQUE5QixHQUF1QyxLQUFLckIsRUFBM0QsQ0FBUDtBQUNILENBRkQ7O0FBSUFNLEtBQUssQ0FBQ2dCLGNBQU4sR0FBdUIsVUFBVVIsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ25DLE9BQUtkLE1BQUwsR0FBY2EsQ0FBZDtBQUNBLE9BQUtaLE1BQUwsR0FBY2EsQ0FBZDtBQUNILENBSEQ7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBVCxLQUFLLENBQUNpQixtQkFBTixHQUE0QixZQUFZO0FBQ3BDLFNBQU9sQyxFQUFFLENBQUM0QixFQUFILENBQU0sS0FBS2hCLE1BQVgsRUFBbUIsS0FBS0MsTUFBeEIsQ0FBUDtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBSSxLQUFLLENBQUNrQixRQUFOLEdBQWlCLFlBQVk7QUFDekIsU0FBT25DLEVBQUUsQ0FBQzRCLEVBQUgsQ0FBTSxLQUFLbEIsRUFBTCxHQUFVLEtBQUtFLE1BQXJCLEVBQTZCLEtBQUtELEVBQUwsR0FBVSxLQUFLRSxNQUE1QyxDQUFQO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FJLEtBQUssQ0FBQ21CLFNBQU4sR0FBa0IsWUFBWTtBQUMxQixTQUFPLEtBQUsxQixFQUFMLEdBQVUsS0FBS0UsTUFBdEI7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUssS0FBSyxDQUFDb0IsU0FBTixHQUFrQixZQUFZO0FBQzFCLFNBQU8sS0FBSzFCLEVBQUwsR0FBVSxLQUFLRSxNQUF0QjtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBSSxLQUFLLENBQUNxQixTQUFOLEdBQWtCLFVBQVVDLE1BQVYsRUFBa0I7QUFDaEMsT0FBSzlCLE9BQUwsR0FBZThCLE1BQWY7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQXRCLEtBQUssQ0FBQ3VCLFNBQU4sR0FBa0IsWUFBWTtBQUMxQixTQUFPLEtBQUsvQixPQUFaO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FRLEtBQUssQ0FBQ3dCLFlBQU4sR0FBcUIsWUFBWTtBQUM3QixTQUFPLEtBQUsvQixFQUFaO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FPLEtBQUssQ0FBQ3lCLFlBQU4sR0FBcUIsWUFBWTtBQUM3QixTQUFPLEtBQUsvQixFQUFaO0FBQ0gsQ0FGRCxFQUlBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQVQsVUFBVSxDQUFDeUMsSUFBWCxHQUFrQixDQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBekMsVUFBVSxDQUFDMEMsSUFBWCxHQUFrQixDQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBMUMsVUFBVSxDQUFDMkMsRUFBWCxHQUFnQixDQUFoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBM0MsVUFBVSxDQUFDNEMsSUFBWCxHQUFrQixDQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBNUMsVUFBVSxDQUFDNkMsTUFBWCxHQUFvQixDQUFwQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBN0MsVUFBVSxDQUFDOEMsV0FBWCxHQUF5QixDQUF6QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBOUMsVUFBVSxDQUFDK0MsWUFBWCxHQUEwQixDQUExQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBL0MsVUFBVSxDQUFDZ0QsYUFBWCxHQUEyQixDQUEzQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBaEQsVUFBVSxDQUFDaUQsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBakQsVUFBVSxDQUFDa0QsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbEQsVUFBVSxDQUFDbUQsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbkQsVUFBVSxDQUFDb0QsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBcEQsVUFBVSxDQUFDcUQsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBVUMsUUFBVixFQUFvQnJELE9BQXBCLEVBQTZCO0FBQzFDSixFQUFBQSxFQUFFLENBQUNLLEtBQUgsQ0FBU0MsSUFBVCxDQUFjLElBQWQsRUFBb0JOLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTcUQsS0FBN0IsRUFBb0N0RCxPQUFwQztBQUNBLE9BQUt1RCxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQkgsUUFBUSxJQUFJLEVBQTVCO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtJLEtBQUwsR0FBYSxJQUFiLENBVjBDLENBVzFDO0FBQ0E7O0FBQ0EsT0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNILENBZEQ7O0FBZ0JBL0QsRUFBRSxDQUFDaUIsTUFBSCxDQUFVd0MsVUFBVixFQUFzQnhELEVBQUUsQ0FBQ0ssS0FBekI7QUFDQVksS0FBSyxHQUFHdUMsVUFBVSxDQUFDdEMsU0FBbkI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FELEtBQUssQ0FBQzhDLFlBQU4sR0FBcUIsWUFBWTtBQUM3QixTQUFPLEtBQUtKLFVBQVo7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTFDLEtBQUssQ0FBQytDLFVBQU4sR0FBbUIsWUFBWTtBQUMzQixTQUFPLEtBQUtKLFFBQVo7QUFDSCxDQUZEOztBQUlBM0MsS0FBSyxDQUFDZ0QsYUFBTixHQUFzQixVQUFVQyxTQUFWLEVBQXFCO0FBQ3ZDLE9BQUtQLFVBQUwsR0FBa0JPLFNBQWxCO0FBQ0gsQ0FGRDs7QUFJQWpELEtBQUssQ0FBQ2tELFdBQU4sR0FBb0IsVUFBVUMsT0FBVixFQUFtQjtBQUNuQyxPQUFLUixRQUFMLEdBQWdCUSxPQUFoQjtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FuRCxLQUFLLENBQUNPLFdBQU4sR0FBb0IsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ2hDLE9BQUttQyxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXUSxZQUFYLENBQXdCLEtBQUtSLEtBQUwsQ0FBV1MsS0FBWCxFQUF4QixFQUE0QzdDLENBQTVDLEVBQStDQyxDQUEvQyxDQUFkO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FULEtBQUssQ0FBQ1UsV0FBTixHQUFvQixZQUFZO0FBQzVCLFNBQU8sS0FBS2tDLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVdsQyxXQUFYLEVBQWIsR0FBd0MzQixFQUFFLENBQUM0QixFQUFILEVBQS9DO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FYLEtBQUssQ0FBQ1ksaUJBQU4sR0FBMEIsWUFBVztBQUNqQyxTQUFPLEtBQUtnQyxLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXaEMsaUJBQVgsRUFBYixHQUE4QzdCLEVBQUUsQ0FBQzRCLEVBQUgsRUFBckQ7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQVgsS0FBSyxDQUFDaUIsbUJBQU4sR0FBNEIsWUFBWTtBQUNwQyxTQUFPLEtBQUsyQixLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXM0IsbUJBQVgsRUFBYixHQUFnRGxDLEVBQUUsQ0FBQzRCLEVBQUgsRUFBdkQ7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQVgsS0FBSyxDQUFDc0QsZ0JBQU4sR0FBeUIsWUFBVztBQUNoQyxTQUFPLEtBQUtWLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVdVLGdCQUFYLEVBQWIsR0FBNkN2RSxFQUFFLENBQUM0QixFQUFILEVBQXBEO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FYLEtBQUssQ0FBQ3FELEtBQU4sR0FBYyxZQUFZO0FBQ3RCLFNBQU8sS0FBS1QsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV1MsS0FBWCxFQUFiLEdBQWtDLElBQXpDO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FyRCxLQUFLLENBQUNrQixRQUFOLEdBQWlCLFlBQVk7QUFDekIsU0FBTyxLQUFLMEIsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBVzFCLFFBQVgsRUFBYixHQUFxQ25DLEVBQUUsQ0FBQzRCLEVBQUgsRUFBNUM7QUFDSCxDQUZEO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQVgsS0FBSyxDQUFDbUIsU0FBTixHQUFrQixZQUFZO0FBQzFCLFNBQU8sS0FBS3lCLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVcxQixRQUFYLEdBQXNCVixDQUFuQyxHQUF1QyxDQUE5QztBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBUixLQUFLLENBQUNvQixTQUFOLEdBQWtCLFlBQVk7QUFDMUIsU0FBTyxLQUFLd0IsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBVzFCLFFBQVgsR0FBc0JULENBQW5DLEdBQXVDLENBQTlDO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FULEtBQUssQ0FBQ3dCLFlBQU4sR0FBcUIsWUFBWTtBQUM3QixTQUFPLEtBQUtvQixLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXcEIsWUFBWCxFQUFiLEdBQXlDLENBQWhEO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0F4QixLQUFLLENBQUN5QixZQUFOLEdBQXFCLFlBQVk7QUFDN0IsU0FBTyxLQUFLbUIsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV25CLFlBQVgsRUFBYixHQUF5QyxDQUFoRDtBQUNILENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBYyxVQUFVLENBQUNnQixXQUFYLEdBQXlCLENBQXpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBaEIsVUFBVSxDQUFDaUIsS0FBWCxHQUFtQixDQUFuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWpCLFVBQVUsQ0FBQ2tCLEtBQVgsR0FBbUIsQ0FBbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FsQixVQUFVLENBQUNtQixLQUFYLEdBQW1CLENBQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbkIsVUFBVSxDQUFDb0IsUUFBWCxHQUFzQixDQUF0QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQVVDLEdBQVYsRUFBZTFFLE9BQWYsRUFBd0I7QUFDNUNKLEVBQUFBLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTQyxJQUFULENBQWMsSUFBZCxFQUFvQk4sRUFBRSxDQUFDSyxLQUFILENBQVMwRSxZQUE3QixFQUEyQzNFLE9BQTNDO0FBQ0EsT0FBSzBFLEdBQUwsR0FBV0EsR0FBWDtBQUNILENBSEQ7O0FBSUEvRSxFQUFFLENBQUNpQixNQUFILENBQVU2RCxpQkFBVixFQUE2QjdFLEVBQUUsQ0FBQ0ssS0FBaEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJMkUsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjlFLE9BQTlCLEVBQXVDO0FBQ3ZESixFQUFBQSxFQUFFLENBQUNLLEtBQUgsQ0FBU0MsSUFBVCxDQUFjLElBQWQsRUFBb0JOLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTOEUsUUFBN0IsRUFBdUMvRSxPQUF2QztBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBSzZFLE9BQUwsR0FBZUEsT0FBZjtBQUNBLE9BQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0gsQ0FsQkQ7O0FBbUJBbkYsRUFBRSxDQUFDaUIsTUFBSCxDQUFVZ0UsYUFBVixFQUF5QmhGLEVBQUUsQ0FBQ0ssS0FBNUI7QUFFQUwsRUFBRSxDQUFDSyxLQUFILENBQVNILFVBQVQsR0FBc0JBLFVBQXRCO0FBQ0FGLEVBQUUsQ0FBQ0ssS0FBSCxDQUFTbUQsVUFBVCxHQUFzQkEsVUFBdEI7QUFDQXhELEVBQUUsQ0FBQ0ssS0FBSCxDQUFTd0UsaUJBQVQsR0FBNkJBLGlCQUE3QjtBQUNBN0UsRUFBRSxDQUFDSyxLQUFILENBQVMyRSxhQUFULEdBQXlCQSxhQUF6QjtBQUVBSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJyRixFQUFFLENBQUNLLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIganMgPSBjYy5qcztcclxuXHJcbnJlcXVpcmUoJy4uL2V2ZW50L2V2ZW50Jyk7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgbW91c2UgZXZlbnRcclxuICogISN6aCDpvKDmoIfkuovku7bnsbvlnotcclxuICogQGNsYXNzIEV2ZW50LkV2ZW50TW91c2VcclxuICpcclxuICogQGV4dGVuZHMgRXZlbnRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50VHlwZSAtIFRoZSBtb3VzZSBldmVudCB0eXBlLCBVUCwgRE9XTiwgTU9WRSwgQ0FOQ0VMRURcclxuICogQHBhcmFtIHtCb29sZWFufSBbYnViYmxlcz1mYWxzZV0gLSBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBldmVudCBidWJibGVzIHVwIHRocm91Z2ggdGhlIHRyZWUgb3Igbm90XHJcbiAqL1xyXG52YXIgRXZlbnRNb3VzZSA9IGZ1bmN0aW9uIChldmVudFR5cGUsIGJ1YmJsZXMpIHtcclxuICAgIGNjLkV2ZW50LmNhbGwodGhpcywgY2MuRXZlbnQuTU9VU0UsIGJ1YmJsZXMpO1xyXG4gICAgdGhpcy5fZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xyXG4gICAgdGhpcy5fYnV0dG9uID0gMDtcclxuICAgIHRoaXMuX3ggPSAwO1xyXG4gICAgdGhpcy5feSA9IDA7XHJcbiAgICB0aGlzLl9wcmV2WCA9IDA7XHJcbiAgICB0aGlzLl9wcmV2WSA9IDA7XHJcbiAgICB0aGlzLl9zY3JvbGxYID0gMDtcclxuICAgIHRoaXMuX3Njcm9sbFkgPSAwO1xyXG59O1xyXG5cclxuanMuZXh0ZW5kKEV2ZW50TW91c2UsIGNjLkV2ZW50KTtcclxudmFyIHByb3RvID0gRXZlbnRNb3VzZS5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogISNlbiBTZXRzIHNjcm9sbCBkYXRhLlxyXG4gKiAhI3poIOiuvue9rum8oOagh+eahOa7muWKqOaVsOaNruOAglxyXG4gKiBAbWV0aG9kIHNldFNjcm9sbERhdGFcclxuICogQHBhcmFtIHtOdW1iZXJ9IHNjcm9sbFhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHNjcm9sbFlcclxuICovXHJcbnByb3RvLnNldFNjcm9sbERhdGEgPSBmdW5jdGlvbiAoc2Nyb2xsWCwgc2Nyb2xsWSkge1xyXG4gICAgdGhpcy5fc2Nyb2xsWCA9IHNjcm9sbFg7XHJcbiAgICB0aGlzLl9zY3JvbGxZID0gc2Nyb2xsWTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdGhlIHggYXhpcyBzY3JvbGwgdmFsdWUuXHJcbiAqICEjemgg6I635Y+W6byg5qCH5rua5Yqo55qEWOi9tOi3neemu++8jOWPquaciea7muWKqOaXtuaJjeacieaViOOAglxyXG4gKiBAbWV0aG9kIGdldFNjcm9sbFhcclxuICogQHJldHVybnMge051bWJlcn1cclxuICovXHJcbnByb3RvLmdldFNjcm9sbFggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsWDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdGhlIHkgYXhpcyBzY3JvbGwgdmFsdWUuXHJcbiAqICEjemgg6I635Y+W5rua6L2u5rua5Yqo55qEIFkg6L206Led56a777yM5Y+q5pyJ5rua5Yqo5pe25omN5pyJ5pWI44CCXHJcbiAqIEBtZXRob2QgZ2V0U2Nyb2xsWVxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxucHJvdG8uZ2V0U2Nyb2xsWSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zY3JvbGxZO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gU2V0cyBjdXJzb3IgbG9jYXRpb24uXHJcbiAqICEjemgg6K6+572u5b2T5YmN6byg5qCH5L2N572u44CCXHJcbiAqIEBtZXRob2Qgc2V0TG9jYXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICovXHJcbnByb3RvLnNldExvY2F0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMuX3ggPSB4O1xyXG4gICAgdGhpcy5feSA9IHk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIGN1cnNvciBsb2NhdGlvbi5cclxuICogISN6aCDojrflj5bpvKDmoIfkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICogQG1ldGhvZCBnZXRMb2NhdGlvblxyXG4gKiBAcmV0dXJuIHtWZWMyfSBsb2NhdGlvblxyXG4gKi9cclxucHJvdG8uZ2V0TG9jYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gY2MudjIodGhpcy5feCwgdGhpcy5feSk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBjdXJyZW50IGN1cnNvciBsb2NhdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMuXHJcbiAqICEjemgg6I635Y+W5b2T5YmN5LqL5Lu25Zyo5ri45oiP56qX5Y+j5YaF55qE5Z2Q5qCH5L2N572u5a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXHJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25JblZpZXdcclxuICogQHJldHVybiB7VmVjMn1cclxuICovXHJcbnByb3RvLmdldExvY2F0aW9uSW5WaWV3ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gY2MudjIodGhpcy5feCwgY2Mudmlldy5fZGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0IC0gdGhpcy5feSk7XHJcbn07XHJcblxyXG5wcm90by5fc2V0UHJldkN1cnNvciA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICB0aGlzLl9wcmV2WCA9IHg7XHJcbiAgICB0aGlzLl9wcmV2WSA9IHk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBwcmV2aW91cyB0b3VjaCBsb2NhdGlvbi5cclxuICogISN6aCDojrflj5bpvKDmoIfngrnlh7vlnKjkuIrkuIDmrKHkuovku7bml7bnmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICogQG1ldGhvZCBnZXRQcmV2aW91c0xvY2F0aW9uXHJcbiAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAqL1xyXG5wcm90by5nZXRQcmV2aW91c0xvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGNjLnYyKHRoaXMuX3ByZXZYLCB0aGlzLl9wcmV2WSk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBkZWx0YSBkaXN0YW5jZSBmcm9tIHRoZSBwcmV2aW91cyBsb2NhdGlvbiB0byBjdXJyZW50IGxvY2F0aW9uLlxyXG4gKiAhI3poIOiOt+WPlum8oOagh+i3neemu+S4iuS4gOasoeS6i+S7tuenu+WKqOeahOi3neemu+Wvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxyXG4gKiBAbWV0aG9kIGdldERlbHRhXHJcbiAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAqL1xyXG5wcm90by5nZXREZWx0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBjYy52Mih0aGlzLl94IC0gdGhpcy5fcHJldlgsIHRoaXMuX3kgLSB0aGlzLl9wcmV2WSk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBYIGF4aXMgZGVsdGEgZGlzdGFuY2UgZnJvbSB0aGUgcHJldmlvdXMgbG9jYXRpb24gdG8gY3VycmVudCBsb2NhdGlvbi5cclxuICogISN6aCDojrflj5bpvKDmoIfot53nprvkuIrkuIDmrKHkuovku7bnp7vliqjnmoQgWCDovbTot53nprvjgIJcclxuICogQG1ldGhvZCBnZXREZWx0YVhcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKi9cclxucHJvdG8uZ2V0RGVsdGFYID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ggLSB0aGlzLl9wcmV2WDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdGhlIFkgYXhpcyBkZWx0YSBkaXN0YW5jZSBmcm9tIHRoZSBwcmV2aW91cyBsb2NhdGlvbiB0byBjdXJyZW50IGxvY2F0aW9uLlxyXG4gKiAhI3poIOiOt+WPlum8oOagh+i3neemu+S4iuS4gOasoeS6i+S7tuenu+WKqOeahCBZIOi9tOi3neemu+OAglxyXG4gKiBAbWV0aG9kIGdldERlbHRhWVxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG5wcm90by5nZXREZWx0YVkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feSAtIHRoaXMuX3ByZXZZO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gU2V0cyBtb3VzZSBidXR0b24uXHJcbiAqICEjemgg6K6+572u6byg5qCH5oyJ6ZSu44CCXHJcbiAqIEBtZXRob2Qgc2V0QnV0dG9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBidXR0b25cclxuICovXHJcbnByb3RvLnNldEJ1dHRvbiA9IGZ1bmN0aW9uIChidXR0b24pIHtcclxuICAgIHRoaXMuX2J1dHRvbiA9IGJ1dHRvbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgbW91c2UgYnV0dG9uLlxyXG4gKiAhI3poIOiOt+WPlum8oOagh+aMiemUruOAglxyXG4gKiBAbWV0aG9kIGdldEJ1dHRvblxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxucHJvdG8uZ2V0QnV0dG9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgbG9jYXRpb24gWCBheGlzIGRhdGEuXHJcbiAqICEjemgg6I635Y+W6byg5qCH5b2T5YmN5L2N572uIFgg6L2044CCXHJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25YXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAqL1xyXG5wcm90by5nZXRMb2NhdGlvblggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgbG9jYXRpb24gWSBheGlzIGRhdGEuXHJcbiAqICEjemgg6I635Y+W6byg5qCH5b2T5YmN5L2N572uIFkg6L2044CCXHJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25ZXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAqL1xyXG5wcm90by5nZXRMb2NhdGlvblkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5feTtcclxufTtcclxuXHJcbi8vSW5uZXIgZXZlbnQgdHlwZXMgb2YgTW91c2VFdmVudFxyXG4vKipcclxuICogISNlbiBUaGUgbm9uZSBldmVudCBjb2RlIG9mIG1vdXNlIGV2ZW50LlxyXG4gKiAhI3poIOaXoOOAglxyXG4gKiBAcHJvcGVydHkgTk9ORVxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLk5PTkUgPSAwO1xyXG4vKipcclxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIG1vdXNlIGRvd24gZXZlbnQuXHJcbiAqICEjemgg6byg5qCH5oyJ5LiL5LqL5Lu244CCXHJcbiAqIEBwcm9wZXJ0eSBET1dOXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUge051bWJlcn1cclxuICovXHJcbkV2ZW50TW91c2UuRE9XTiA9IDE7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgbW91c2UgdXAgZXZlbnQuXHJcbiAqICEjemgg6byg5qCH5oyJ5LiL5ZCO6YeK5pS+5LqL5Lu244CCXHJcbiAqIEBwcm9wZXJ0eSBVUFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLlVQID0gMjtcclxuLyoqXHJcbiAqICEjZW4gVGhlIGV2ZW50IHR5cGUgY29kZSBvZiBtb3VzZSBtb3ZlIGV2ZW50LlxyXG4gKiAhI3poIOm8oOagh+enu+WKqOS6i+S7tuOAglxyXG4gKiBAcHJvcGVydHkgTU9WRVxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLk1PVkUgPSAzO1xyXG4vKipcclxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBjb2RlIG9mIG1vdXNlIHNjcm9sbCBldmVudC5cclxuICogISN6aCDpvKDmoIfmu5rova7kuovku7bjgIJcclxuICogQHByb3BlcnR5IFNDUk9MTFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLlNDUk9MTCA9IDQ7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgdGFnIG9mIE1vdXNlIGxlZnQgYnV0dG9uLlxyXG4gKiAhI3poIOm8oOagh+W3pumUrueahOagh+etvuOAglxyXG4gKiBAcHJvcGVydHkgQlVUVE9OX0xFRlRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRNb3VzZS5CVVRUT05fTEVGVCA9IDA7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgdGFnIG9mIE1vdXNlIHJpZ2h0IGJ1dHRvbiAgKFRoZSByaWdodCBidXR0b24gbnVtYmVyIGlzIDIgb24gYnJvd3NlcikuXHJcbiAqICEjemgg6byg5qCH5Y+z6ZSu55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fUklHSFRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRNb3VzZS5CVVRUT05fUklHSFQgPSAyO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHRhZyBvZiBNb3VzZSBtaWRkbGUgYnV0dG9uICAoVGhlIHJpZ2h0IGJ1dHRvbiBudW1iZXIgaXMgMSBvbiBicm93c2VyKS5cclxuICogISN6aCDpvKDmoIfkuK3plK7nmoTmoIfnrb7jgIJcclxuICogQHByb3BlcnR5IEJVVFRPTl9NSURETEVcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRNb3VzZS5CVVRUT05fTUlERExFID0gMTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDQuXHJcbiAqICEjemgg6byg5qCH5oyJ6ZSuIDQg55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fNFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLkJVVFRPTl80ID0gMztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDUuXHJcbiAqICEjemgg6byg5qCH5oyJ6ZSuIDUg55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fNVxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLkJVVFRPTl81ID0gNDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDYuXHJcbiAqICEjemgg6byg5qCH5oyJ6ZSuIDYg55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fNlxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLkJVVFRPTl82ID0gNTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDcuXHJcbiAqICEjemgg6byg5qCH5oyJ6ZSuIDcg55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fN1xyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLkJVVFRPTl83ID0gNjtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0YWcgb2YgTW91c2UgYnV0dG9uIDguXHJcbiAqICEjemgg6byg5qCH5oyJ6ZSuIDgg55qE5qCH562+44CCXHJcbiAqIEBwcm9wZXJ0eSBCVVRUT05fOFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudE1vdXNlLkJVVFRPTl84ID0gNztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0b3VjaCBldmVudFxyXG4gKiAhI3poIOinpuaRuOS6i+S7tlxyXG4gKiBAY2xhc3MgRXZlbnQuRXZlbnRUb3VjaFxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGV4dGVuZHMgRXZlbnRcclxuICovXHJcbi8qKlxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7QXJyYXl9IHRvdWNoQXJyIC0gVGhlIGFycmF5IG9mIHRoZSB0b3VjaGVzXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYnViYmxlcyAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhyb3VnaCB0aGUgdHJlZSBvciBub3RcclxuICovXHJcbnZhciBFdmVudFRvdWNoID0gZnVuY3Rpb24gKHRvdWNoQXJyLCBidWJibGVzKSB7XHJcbiAgICBjYy5FdmVudC5jYWxsKHRoaXMsIGNjLkV2ZW50LlRPVUNILCBidWJibGVzKTtcclxuICAgIHRoaXMuX2V2ZW50Q29kZSA9IDA7XHJcbiAgICB0aGlzLl90b3VjaGVzID0gdG91Y2hBcnIgfHwgW107XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGN1cnJlbnQgdG91Y2ggb2JqZWN0XHJcbiAgICAgKiAhI3poIOW9k+WJjeinpueCueWvueixoVxyXG4gICAgICogQHByb3BlcnR5IHRvdWNoXHJcbiAgICAgKiBAdHlwZSB7VG91Y2h9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudG91Y2ggPSBudWxsO1xyXG4gICAgLy8gQWN0dWFsbHkgZHVwbGljYXRlZCwgYmVjYXVzZSBvZiBoaXN0b3J5IGlzc3VlLCBjdXJyZW50VG91Y2ggd2FzIGluIHRoZSBvcmlnaW5hbCBkZXNpZ24sIHRvdWNoIHdhcyBhZGRlZCBpbiBjcmVhdG9yIGVuZ2luZVxyXG4gICAgLy8gVGhleSBzaG91bGQgcG9pbnQgdG8gdGhlIHNhbWUgb2JqZWN0XHJcbiAgICB0aGlzLmN1cnJlbnRUb3VjaCA9IG51bGw7XHJcbn07XHJcblxyXG5qcy5leHRlbmQoRXZlbnRUb3VjaCwgY2MuRXZlbnQpO1xyXG5wcm90byA9IEV2ZW50VG91Y2gucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmV0dXJucyBldmVudCBjb2RlLlxyXG4gKiAhI3poIOiOt+WPluS6i+S7tuexu+Wei+OAglxyXG4gKiBAbWV0aG9kIGdldEV2ZW50Q29kZVxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxucHJvdG8uZ2V0RXZlbnRDb2RlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50Q29kZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdG91Y2hlcyBvZiBldmVudC5cclxuICogISN6aCDojrflj5bop6bmkbjngrnnmoTliJfooajjgIJcclxuICogQG1ldGhvZCBnZXRUb3VjaGVzXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcbnByb3RvLmdldFRvdWNoZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG91Y2hlcztcclxufTtcclxuXHJcbnByb3RvLl9zZXRFdmVudENvZGUgPSBmdW5jdGlvbiAoZXZlbnRDb2RlKSB7XHJcbiAgICB0aGlzLl9ldmVudENvZGUgPSBldmVudENvZGU7XHJcbn07XHJcblxyXG5wcm90by5fc2V0VG91Y2hlcyA9IGZ1bmN0aW9uICh0b3VjaGVzKSB7XHJcbiAgICB0aGlzLl90b3VjaGVzID0gdG91Y2hlcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFNldHMgdG91Y2ggbG9jYXRpb24uXHJcbiAqICEjemgg6K6+572u5b2T5YmN6Kem54K55L2N572uXHJcbiAqIEBtZXRob2Qgc2V0TG9jYXRpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICovXHJcbnByb3RvLnNldExvY2F0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMudG91Y2ggJiYgdGhpcy50b3VjaC5zZXRUb3VjaEluZm8odGhpcy50b3VjaC5nZXRJRCgpLCB4LCB5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdG91Y2ggbG9jYXRpb24uXHJcbiAqICEjemgg6I635Y+W6Kem54K55L2N572u44CCXHJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25cclxuICogQHJldHVybiB7VmVjMn0gbG9jYXRpb25cclxuICovXHJcbnByb3RvLmdldExvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldExvY2F0aW9uKCkgOiBjYy52MigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmV0dXJucyB0aGUgY3VycmVudCB0b3VjaCBsb2NhdGlvbiBpbiBzY3JlZW4gY29vcmRpbmF0ZXMuXHJcbiAqICEjemgg6I635Y+W5b2T5YmN6Kem54K55Zyo5ri45oiP56qX5Y+j5Lit55qE5L2N572u44CCXHJcbiAqIEBtZXRob2QgZ2V0TG9jYXRpb25JblZpZXdcclxuICogQHJldHVybiB7VmVjMn1cclxuICovXHJcbnByb3RvLmdldExvY2F0aW9uSW5WaWV3ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b3VjaCA/IHRoaXMudG91Y2guZ2V0TG9jYXRpb25JblZpZXcoKSA6IGNjLnYyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBwcmV2aW91cyB0b3VjaCBsb2NhdGlvbi5cclxuICogISN6aCDojrflj5bop6bngrnlnKjkuIrkuIDmrKHkuovku7bml7bnmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICogQG1ldGhvZCBnZXRQcmV2aW91c0xvY2F0aW9uXHJcbiAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAqL1xyXG5wcm90by5nZXRQcmV2aW91c0xvY2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldFByZXZpb3VzTG9jYXRpb24oKSA6IGNjLnYyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBzdGFydCB0b3VjaCBsb2NhdGlvbi5cclxuICogISN6aCDojrflj5bop6bngrnokL3kuIvml7bnmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICogQG1ldGhvZCBnZXRTdGFydExvY2F0aW9uXHJcbiAqIEByZXR1cm5zIHtWZWMyfVxyXG4gKi9cclxucHJvdG8uZ2V0U3RhcnRMb2NhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldFN0YXJ0TG9jYXRpb24oKSA6IGNjLnYyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIHRoZSBpZCBvZiBjYy5Ub3VjaC5cclxuICogISN6aCDop6bngrnnmoTmoIfor4YgSUTvvIzlj6/ku6XnlKjmnaXlnKjlpJrngrnop6bmkbjkuK3ot5/ouKrop6bngrnjgIJcclxuICogQG1ldGhvZCBnZXRJRFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG5wcm90by5nZXRJRCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRJRCgpIDogbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIGxvY2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb24uXHJcbiAqICEjemgg6I635Y+W6Kem54K56Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qE6Led56a75a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXHJcbiAqIEBtZXRob2QgZ2V0RGVsdGFcclxuICogQHJldHVybiB7VmVjMn1cclxuICovXHJcbnByb3RvLmdldERlbHRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldERlbHRhKCkgOiBjYy52MigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmV0dXJucyB0aGUgWCBheGlzIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIGxvY2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb24uXHJcbiAqICEjemgg6I635Y+W6Kem54K56Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qEIHgg6L206Led56a744CCXHJcbiAqIEBtZXRob2QgZ2V0RGVsdGFYXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICovXHJcbnByb3RvLmdldERlbHRhWCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXREZWx0YSgpLnggOiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmV0dXJucyB0aGUgWSBheGlzIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIGxvY2F0aW9uIHRvIGN1cnJlbnQgbG9jYXRpb24uXHJcbiAqICEjemgg6I635Y+W6Kem54K56Led56a75LiK5LiA5qyh5LqL5Lu256e75Yqo55qEIHkg6L206Led56a744CCXHJcbiAqIEBtZXRob2QgZ2V0RGVsdGFZXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICovXHJcbnByb3RvLmdldERlbHRhWSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXREZWx0YSgpLnkgOiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmV0dXJucyBsb2NhdGlvbiBYIGF4aXMgZGF0YS5cclxuICogISN6aCDojrflj5blvZPliY3op6bngrkgWCDovbTkvY3nva7jgIJcclxuICogQG1ldGhvZCBnZXRMb2NhdGlvblhcclxuICogQHJldHVybnMge051bWJlcn1cclxuICovXHJcbnByb3RvLmdldExvY2F0aW9uWCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvdWNoID8gdGhpcy50b3VjaC5nZXRMb2NhdGlvblgoKSA6IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBSZXR1cm5zIGxvY2F0aW9uIFkgYXhpcyBkYXRhLlxyXG4gKiAhI3poIOiOt+WPluW9k+WJjeinpueCuSBZIOi9tOS9jee9ruOAglxyXG4gKiBAbWV0aG9kIGdldExvY2F0aW9uWVxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxucHJvdG8uZ2V0TG9jYXRpb25ZID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG91Y2ggPyB0aGlzLnRvdWNoLmdldExvY2F0aW9uWSgpIDogMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBtYXhpbXVtIHRvdWNoIG51bWJlcnNcclxuICogISN6aCDmnIDlpKfop6bmkbjmlbDph4/jgIJcclxuICogQGNvbnN0YW50XHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqL1xyXG5FdmVudFRvdWNoLk1BWF9UT1VDSEVTID0gNTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgdG91Y2ggYmVnYW4gZXZlbnQuXHJcbiAqICEjemgg5byA5aeL6Kem5pG45LqL5Lu2XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRUb3VjaC5CRUdBTiA9IDA7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgdG91Y2ggbW92ZWQgZXZlbnQuXHJcbiAqICEjemgg6Kem5pG45ZCO56e75Yqo5LqL5Lu2XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRUb3VjaC5NT1ZFRCA9IDE7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgdG91Y2ggZW5kZWQgZXZlbnQuXHJcbiAqICEjemgg57uT5p2f6Kem5pG45LqL5Lu2XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKi9cclxuRXZlbnRUb3VjaC5FTkRFRCA9IDI7XHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIGNvZGUgb2YgdG91Y2ggY2FuY2VsbGVkIGV2ZW50LlxyXG4gKiAhI3poIOWPlua2iOinpuaRuOS6i+S7tlxyXG4gKiBAY29uc3RhbnRcclxuICogQHR5cGUge051bWJlcn1cclxuICovXHJcbkV2ZW50VG91Y2guQ0FOQ0VMRUQgPSAzO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGFjY2VsZXJhdGlvbiBldmVudFxyXG4gKiAhI3poIOWKoOmAn+W6puS6i+S7tlxyXG4gKiBAY2xhc3MgRXZlbnQuRXZlbnRBY2NlbGVyYXRpb25cclxuICogQGV4dGVuZHMgRXZlbnRcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGFjYyAtIFRoZSBhY2NlbGVyYXRpb25cclxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxyXG4gKi9cclxudmFyIEV2ZW50QWNjZWxlcmF0aW9uID0gZnVuY3Rpb24gKGFjYywgYnViYmxlcykge1xyXG4gICAgY2MuRXZlbnQuY2FsbCh0aGlzLCBjYy5FdmVudC5BQ0NFTEVSQVRJT04sIGJ1YmJsZXMpO1xyXG4gICAgdGhpcy5hY2MgPSBhY2M7XHJcbn07XHJcbmpzLmV4dGVuZChFdmVudEFjY2VsZXJhdGlvbiwgY2MuRXZlbnQpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGtleWJvYXJkIGV2ZW50XHJcbiAqICEjemgg6ZSu55uY5LqL5Lu2XHJcbiAqIEBjbGFzcyBFdmVudC5FdmVudEtleWJvYXJkXHJcbiAqIEBleHRlbmRzIEV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBrZXlDb2RlIC0gVGhlIGtleSBjb2RlIG9mIHdoaWNoIHRyaWdnZXJlZCB0aGlzIGV2ZW50XHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNQcmVzc2VkIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUga2V5IGhhdmUgYmVlbiBwcmVzc2VkXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYnViYmxlcyAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhyb3VnaCB0aGUgdHJlZSBvciBub3RcclxuICovXHJcbnZhciBFdmVudEtleWJvYXJkID0gZnVuY3Rpb24gKGtleUNvZGUsIGlzUHJlc3NlZCwgYnViYmxlcykge1xyXG4gICAgY2MuRXZlbnQuY2FsbCh0aGlzLCBjYy5FdmVudC5LRVlCT0FSRCwgYnViYmxlcyk7XHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBrZXlDb2RlIHJlYWQtb25seSBwcm9wZXJ0eSByZXByZXNlbnRzIGEgc3lzdGVtIGFuZCBpbXBsZW1lbnRhdGlvbiBkZXBlbmRlbnQgbnVtZXJpY2FsIGNvZGUgaWRlbnRpZnlpbmcgdGhlIHVubW9kaWZpZWQgdmFsdWUgb2YgdGhlIHByZXNzZWQga2V5LlxyXG4gICAgICogVGhpcyBpcyB1c3VhbGx5IHRoZSBkZWNpbWFsIEFTQ0lJIChSRkMgMjApIG9yIFdpbmRvd3MgMTI1MiBjb2RlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGtleS5cclxuICAgICAqIElmIHRoZSBrZXkgY2FuJ3QgYmUgaWRlbnRpZmllZCwgdGhpcyB2YWx1ZSBpcyAwLlxyXG4gICAgICpcclxuICAgICAqICEjemhcclxuICAgICAqIGtleUNvZGUg5piv5Y+q6K+75bGe5oCn5a6D6KGo56S65LiA5Liq57O757uf5ZKM5L6d6LWW5LqO5a6e546w55qE5pWw5a2X5Luj56CB77yM5Y+v5Lul6K+G5Yir5oyJ6ZSu55qE5pyq5L+u5pS55YC844CCXHJcbiAgICAgKiDov5npgJrluLjmmK/ljYHov5vliLYgQVNDSUkgKFJGQzIwKSDmiJbogIUgV2luZG93cyAxMjUyIOS7o+egge+8jOaJgOWvueW6lOeahOWvhumSpeOAglxyXG4gICAgICog5aaC5p6c5peg5rOV6K+G5Yir6K+l6ZSu77yM5YiZ6K+l5YC85Li6IDDjgIJcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkga2V5Q29kZVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5rZXlDb2RlID0ga2V5Q29kZTtcclxuICAgIHRoaXMuaXNQcmVzc2VkID0gaXNQcmVzc2VkO1xyXG59O1xyXG5qcy5leHRlbmQoRXZlbnRLZXlib2FyZCwgY2MuRXZlbnQpO1xyXG5cclxuY2MuRXZlbnQuRXZlbnRNb3VzZSA9IEV2ZW50TW91c2U7XHJcbmNjLkV2ZW50LkV2ZW50VG91Y2ggPSBFdmVudFRvdWNoO1xyXG5jYy5FdmVudC5FdmVudEFjY2VsZXJhdGlvbiA9IEV2ZW50QWNjZWxlcmF0aW9uO1xyXG5jYy5FdmVudC5FdmVudEtleWJvYXJkID0gRXZlbnRLZXlib2FyZDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuRXZlbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9