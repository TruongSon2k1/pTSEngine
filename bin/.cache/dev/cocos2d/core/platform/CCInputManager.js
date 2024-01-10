
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCInputManager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var macro = require('./CCMacro');

var sys = require('./CCSys');

var eventManager = require('../event-manager');

var TOUCH_TIMEOUT = macro.TOUCH_TIMEOUT;

var _vec2 = cc.v2();
/**
 *  This class manages all events of input. include: touch, mouse, accelerometer, keyboard
 */


var inputManager = {
  _mousePressed: false,
  _isRegisterEvent: false,
  _preTouchPoint: cc.v2(0, 0),
  _prevMousePoint: cc.v2(0, 0),
  _preTouchPool: [],
  _preTouchPoolPointer: 0,
  _touches: [],
  _touchesIntegerDict: {},
  _indexBitsUsed: 0,
  _maxTouches: 8,
  _accelEnabled: false,
  _accelInterval: 1 / 5,
  _accelMinus: 1,
  _accelCurTime: 0,
  _acceleration: null,
  _accelDeviceEvent: null,
  _canvasBoundingRect: {
    left: 0,
    top: 0,
    adjustedLeft: 0,
    adjustedTop: 0,
    width: 0,
    height: 0
  },
  _getUnUsedIndex: function _getUnUsedIndex() {
    var temp = this._indexBitsUsed;
    var now = cc.sys.now();

    for (var i = 0; i < this._maxTouches; i++) {
      if (!(temp & 0x00000001)) {
        this._indexBitsUsed |= 1 << i;
        return i;
      } else {
        var touch = this._touches[i];

        if (now - touch._lastModified > TOUCH_TIMEOUT) {
          this._removeUsedIndexBit(i);

          delete this._touchesIntegerDict[touch.getID()];
          return i;
        }
      }

      temp >>= 1;
    } // all bits are used


    return -1;
  },
  _removeUsedIndexBit: function _removeUsedIndexBit(index) {
    if (index < 0 || index >= this._maxTouches) return;
    var temp = 1 << index;
    temp = ~temp;
    this._indexBitsUsed &= temp;
  },
  _glView: null,
  _updateCanvasBoundingRect: function _updateCanvasBoundingRect() {
    var element = cc.game.canvas;
    var canvasBoundingRect = this._canvasBoundingRect;
    var docElem = document.documentElement;
    var leftOffset = window.pageXOffset - docElem.clientLeft;
    var topOffset = window.pageYOffset - docElem.clientTop;

    if (element.getBoundingClientRect) {
      var box = element.getBoundingClientRect();
      canvasBoundingRect.left = box.left + leftOffset;
      canvasBoundingRect.top = box.top + topOffset;
      canvasBoundingRect.width = box.width;
      canvasBoundingRect.height = box.height;
    } else if (element instanceof HTMLCanvasElement) {
      canvasBoundingRect.left = leftOffset;
      canvasBoundingRect.top = topOffset;
      canvasBoundingRect.width = element.width;
      canvasBoundingRect.height = element.height;
    } else {
      canvasBoundingRect.left = leftOffset;
      canvasBoundingRect.top = topOffset;
      canvasBoundingRect.width = parseInt(element.style.width);
      canvasBoundingRect.height = parseInt(element.style.height);
    }
  },

  /**
   * @method handleTouchesBegin
   * @param {Array} touches
   */
  handleTouchesBegin: function handleTouchesBegin(touches) {
    var selTouch,
        index,
        curTouch,
        touchID,
        handleTouches = [],
        locTouchIntDict = this._touchesIntegerDict,
        now = sys.now();

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = locTouchIntDict[touchID];

      if (index == null) {
        var unusedIndex = this._getUnUsedIndex();

        if (unusedIndex === -1) {
          cc.logID(2300, unusedIndex);
          continue;
        } //curTouch = this._touches[unusedIndex] = selTouch;


        curTouch = this._touches[unusedIndex] = new cc.Touch(selTouch._point.x, selTouch._point.y, selTouch.getID());
        curTouch._lastModified = now;

        curTouch._setPrevPoint(selTouch._prevPoint);

        locTouchIntDict[touchID] = unusedIndex;
        handleTouches.push(curTouch);
      }
    }

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.BEGAN;
      eventManager.dispatchEvent(touchEvent);
    }
  },

  /**
   * @method handleTouchesMove
   * @param {Array} touches
   */
  handleTouchesMove: function handleTouchesMove(touches) {
    var selTouch,
        index,
        touchID,
        handleTouches = [],
        locTouches = this._touches,
        now = sys.now();

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = this._touchesIntegerDict[touchID];

      if (index == null) {
        //cc.log("if the index doesn't exist, it is an error");
        continue;
      }

      if (locTouches[index]) {
        locTouches[index]._setPoint(selTouch._point);

        locTouches[index]._setPrevPoint(selTouch._prevPoint);

        locTouches[index]._lastModified = now;
        handleTouches.push(locTouches[index]);
      }
    }

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.MOVED;
      eventManager.dispatchEvent(touchEvent);
    }
  },

  /**
   * @method handleTouchesEnd
   * @param {Array} touches
   */
  handleTouchesEnd: function handleTouchesEnd(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.ENDED;
      eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  },

  /**
   * @method handleTouchesCancel
   * @param {Array} touches
   */
  handleTouchesCancel: function handleTouchesCancel(touches) {
    var handleTouches = this.getSetOfTouchesEndOrCancel(touches);

    if (handleTouches.length > 0) {
      this._glView._convertTouchesWithScale(handleTouches);

      var touchEvent = new cc.Event.EventTouch(handleTouches);
      touchEvent._eventCode = cc.Event.EventTouch.CANCELED;
      eventManager.dispatchEvent(touchEvent);
    }

    this._preTouchPool.length = 0;
  },

  /**
   * @method getSetOfTouchesEndOrCancel
   * @param {Array} touches
   * @returns {Array}
   */
  getSetOfTouchesEndOrCancel: function getSetOfTouchesEndOrCancel(touches) {
    var selTouch,
        index,
        touchID,
        handleTouches = [],
        locTouches = this._touches,
        locTouchesIntDict = this._touchesIntegerDict;

    for (var i = 0, len = touches.length; i < len; i++) {
      selTouch = touches[i];
      touchID = selTouch.getID();
      index = locTouchesIntDict[touchID];

      if (index == null) {
        continue; //cc.log("if the index doesn't exist, it is an error");
      }

      if (locTouches[index]) {
        locTouches[index]._setPoint(selTouch._point);

        locTouches[index]._setPrevPoint(selTouch._prevPoint);

        handleTouches.push(locTouches[index]);

        this._removeUsedIndexBit(index);

        delete locTouchesIntDict[touchID];
      }
    }

    return handleTouches;
  },

  /**
   * @method getPreTouch
   * @param {Touch} touch
   * @return {Touch}
   */
  getPreTouch: function getPreTouch(touch) {
    var preTouch = null;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        preTouch = locPreTouchPool[i];
        break;
      }
    }

    if (!preTouch) preTouch = touch;
    return preTouch;
  },

  /**
   * @method setPreTouch
   * @param {Touch} touch
   */
  setPreTouch: function setPreTouch(touch) {
    var find = false;
    var locPreTouchPool = this._preTouchPool;
    var id = touch.getID();

    for (var i = locPreTouchPool.length - 1; i >= 0; i--) {
      if (locPreTouchPool[i].getID() === id) {
        locPreTouchPool[i] = touch;
        find = true;
        break;
      }
    }

    if (!find) {
      if (locPreTouchPool.length <= 50) {
        locPreTouchPool.push(touch);
      } else {
        locPreTouchPool[this._preTouchPoolPointer] = touch;
        this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50;
      }
    }
  },

  /**
   * @method getTouchByXY
   * @param {Number} tx
   * @param {Number} ty
   * @param {Vec2} pos
   * @return {Touch}
   */
  getTouchByXY: function getTouchByXY(tx, ty, pos) {
    var locPreTouch = this._preTouchPoint;

    var location = this._glView.convertToLocationInView(tx, ty, pos);

    var touch = new cc.Touch(location.x, location.y, 0);

    touch._setPrevPoint(locPreTouch.x, locPreTouch.y);

    locPreTouch.x = location.x;
    locPreTouch.y = location.y;
    return touch;
  },

  /**
   * @method getMouseEvent
   * @param {Vec2} location
   * @param {Vec2} pos
   * @param {Number} eventType
   * @returns {Event.EventMouse}
   */
  getMouseEvent: function getMouseEvent(location, pos, eventType) {
    var locPreMouse = this._prevMousePoint;
    var mouseEvent = new cc.Event.EventMouse(eventType);

    mouseEvent._setPrevCursor(locPreMouse.x, locPreMouse.y);

    locPreMouse.x = location.x;
    locPreMouse.y = location.y;

    this._glView._convertMouseToLocationInView(locPreMouse, pos);

    mouseEvent.setLocation(locPreMouse.x, locPreMouse.y);
    return mouseEvent;
  },

  /**
   * @method getPointByEvent
   * @param {Touch} event
   * @param {Vec2} pos
   * @return {Vec2}
   */
  getPointByEvent: function getPointByEvent(event, pos) {
    // qq , uc and safari browser can't calculate pageY correctly, need to refresh canvas bounding rect
    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_QQ || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC || cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI) {
      this._updateCanvasBoundingRect();
    }

    if (event.pageX != null) //not avalable in <= IE8
      return {
        x: event.pageX,
        y: event.pageY
      };
    pos.left -= document.body.scrollLeft;
    pos.top -= document.body.scrollTop;
    return {
      x: event.clientX,
      y: event.clientY
    };
  },

  /**
   * @method getTouchesByEvent
   * @param {Touch} event
   * @param {Vec2} pos
   * @returns {Array}
   */
  getTouchesByEvent: function getTouchesByEvent(event, pos) {
    var touchArr = [],
        locView = this._glView;
    var touch_event, touch, preLocation;
    var locPreTouch = this._preTouchPoint;
    var length = event.changedTouches.length;

    for (var i = 0; i < length; i++) {
      touch_event = event.changedTouches[i];

      if (touch_event) {
        var location = void 0;
        if (sys.BROWSER_TYPE_FIREFOX === sys.browserType) location = locView.convertToLocationInView(touch_event.pageX, touch_event.pageY, pos, _vec2);else location = locView.convertToLocationInView(touch_event.clientX, touch_event.clientY, pos, _vec2);

        if (touch_event.identifier != null) {
          touch = new cc.Touch(location.x, location.y, touch_event.identifier); //use Touch Pool

          preLocation = this.getPreTouch(touch).getLocation();

          touch._setPrevPoint(preLocation.x, preLocation.y);

          this.setPreTouch(touch);
        } else {
          touch = new cc.Touch(location.x, location.y);

          touch._setPrevPoint(locPreTouch.x, locPreTouch.y);
        }

        locPreTouch.x = location.x;
        locPreTouch.y = location.y;
        touchArr.push(touch);
      }
    }

    return touchArr;
  },

  /**
   * @method registerSystemEvent
   * @param {HTMLElement} element
   */
  registerSystemEvent: function registerSystemEvent(element) {
    if (this._isRegisterEvent) return;
    this._glView = cc.view;
    var selfPointer = this;
    var canvasBoundingRect = this._canvasBoundingRect;
    window.addEventListener('resize', this._updateCanvasBoundingRect.bind(this));
    var prohibition = sys.isMobile;
    var supportMouse = ('mouse' in sys.capabilities);
    var supportTouches = ('touches' in sys.capabilities);

    if (supportMouse) {
      //HACK
      //  - At the same time to trigger the ontouch event and onmouse event
      //  - The function will execute 2 times
      //The known browser:
      //  liebiao
      //  miui
      //  WECHAT
      if (!prohibition) {
        window.addEventListener('mousedown', function () {
          selfPointer._mousePressed = true;
        }, false);
        window.addEventListener('mouseup', function (event) {
          if (!selfPointer._mousePressed) return;
          selfPointer._mousePressed = false;
          var location = selfPointer.getPointByEvent(event, canvasBoundingRect);

          if (!cc.rect(canvasBoundingRect.left, canvasBoundingRect.top, canvasBoundingRect.width, canvasBoundingRect.height).contains(location)) {
            selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
            var mouseEvent = selfPointer.getMouseEvent(location, canvasBoundingRect, cc.Event.EventMouse.UP);
            mouseEvent.setButton(event.button);
            eventManager.dispatchEvent(mouseEvent);
          }
        }, false);
      } // register canvas mouse event


      var EventMouse = cc.Event.EventMouse;
      var _mouseEventsOnElement = [!prohibition && ["mousedown", EventMouse.DOWN, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer._mousePressed = true;
        selfPointer.handleTouchesBegin([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
        element.focus();
      }], !prohibition && ["mouseup", EventMouse.UP, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer._mousePressed = false;
        selfPointer.handleTouchesEnd([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);
      }], !prohibition && ["mousemove", EventMouse.MOVE, function (event, mouseEvent, location, canvasBoundingRect) {
        selfPointer.handleTouchesMove([selfPointer.getTouchByXY(location.x, location.y, canvasBoundingRect)]);

        if (!selfPointer._mousePressed) {
          mouseEvent.setButton(null);
        }
      }], ["mousewheel", EventMouse.SCROLL, function (event, mouseEvent) {
        mouseEvent.setScrollData(0, event.wheelDelta);
      }],
      /* firefox fix */
      ["DOMMouseScroll", EventMouse.SCROLL, function (event, mouseEvent) {
        mouseEvent.setScrollData(0, event.detail * -120);
      }]];

      for (var i = 0; i < _mouseEventsOnElement.length; ++i) {
        var entry = _mouseEventsOnElement[i];

        if (entry) {
          (function () {
            var name = entry[0];
            var type = entry[1];
            var handler = entry[2];
            element.addEventListener(name, function (event) {
              var location = selfPointer.getPointByEvent(event, canvasBoundingRect);
              var mouseEvent = selfPointer.getMouseEvent(location, canvasBoundingRect, type);
              mouseEvent.setButton(event.button);
              handler(event, mouseEvent, location, canvasBoundingRect);
              eventManager.dispatchEvent(mouseEvent);
              event.stopPropagation();
              event.preventDefault();
            }, false);
          })();
        }
      }
    }

    if (window.navigator.msPointerEnabled) {
      var _pointerEventsMap = {
        "MSPointerDown": selfPointer.handleTouchesBegin,
        "MSPointerMove": selfPointer.handleTouchesMove,
        "MSPointerUp": selfPointer.handleTouchesEnd,
        "MSPointerCancel": selfPointer.handleTouchesCancel
      };

      var _loop = function _loop(eventName) {
        var touchEvent = _pointerEventsMap[eventName];
        element.addEventListener(eventName, function (event) {
          var documentElement = document.documentElement;
          canvasBoundingRect.adjustedLeft = canvasBoundingRect.left - documentElement.scrollLeft;
          canvasBoundingRect.adjustedTop = canvasBoundingRect.top - documentElement.scrollTop;
          touchEvent.call(selfPointer, [selfPointer.getTouchByXY(event.clientX, event.clientY, canvasBoundingRect)]);
          event.stopPropagation();
        }, false);
      };

      for (var eventName in _pointerEventsMap) {
        _loop(eventName);
      }
    } //register touch event


    if (supportTouches) {
      var _touchEventsMap = {
        "touchstart": function touchstart(touchesToHandle) {
          selfPointer.handleTouchesBegin(touchesToHandle);
          element.focus();
        },
        "touchmove": function touchmove(touchesToHandle) {
          selfPointer.handleTouchesMove(touchesToHandle);
        },
        "touchend": function touchend(touchesToHandle) {
          selfPointer.handleTouchesEnd(touchesToHandle);
        },
        "touchcancel": function touchcancel(touchesToHandle) {
          selfPointer.handleTouchesCancel(touchesToHandle);
        }
      };

      var registerTouchEvent = function registerTouchEvent(eventName) {
        var handler = _touchEventsMap[eventName];
        element.addEventListener(eventName, function (event) {
          if (!event.changedTouches) return;
          var body = document.body;
          canvasBoundingRect.adjustedLeft = canvasBoundingRect.left - (body.scrollLeft || window.scrollX || 0);
          canvasBoundingRect.adjustedTop = canvasBoundingRect.top - (body.scrollTop || window.scrollY || 0);
          handler(selfPointer.getTouchesByEvent(event, canvasBoundingRect));
          event.stopPropagation();
          event.preventDefault();
        }, false);
      };

      for (var _eventName in _touchEventsMap) {
        registerTouchEvent(_eventName);
      }
    }

    this._registerKeyboardEvent();

    this._isRegisterEvent = true;
  },
  _registerKeyboardEvent: function _registerKeyboardEvent() {},
  _registerAccelerometerEvent: function _registerAccelerometerEvent() {},

  /**
   * @method update
   * @param {Number} dt
   */
  update: function update(dt) {
    if (this._accelCurTime > this._accelInterval) {
      this._accelCurTime -= this._accelInterval;
      eventManager.dispatchEvent(new cc.Event.EventAcceleration(this._acceleration));
    }

    this._accelCurTime += dt;
  }
};
module.exports = cc.internal.inputManager = inputManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ0lucHV0TWFuYWdlci5qcyJdLCJuYW1lcyI6WyJtYWNybyIsInJlcXVpcmUiLCJzeXMiLCJldmVudE1hbmFnZXIiLCJUT1VDSF9USU1FT1VUIiwiX3ZlYzIiLCJjYyIsInYyIiwiaW5wdXRNYW5hZ2VyIiwiX21vdXNlUHJlc3NlZCIsIl9pc1JlZ2lzdGVyRXZlbnQiLCJfcHJlVG91Y2hQb2ludCIsIl9wcmV2TW91c2VQb2ludCIsIl9wcmVUb3VjaFBvb2wiLCJfcHJlVG91Y2hQb29sUG9pbnRlciIsIl90b3VjaGVzIiwiX3RvdWNoZXNJbnRlZ2VyRGljdCIsIl9pbmRleEJpdHNVc2VkIiwiX21heFRvdWNoZXMiLCJfYWNjZWxFbmFibGVkIiwiX2FjY2VsSW50ZXJ2YWwiLCJfYWNjZWxNaW51cyIsIl9hY2NlbEN1clRpbWUiLCJfYWNjZWxlcmF0aW9uIiwiX2FjY2VsRGV2aWNlRXZlbnQiLCJfY2FudmFzQm91bmRpbmdSZWN0IiwibGVmdCIsInRvcCIsImFkanVzdGVkTGVmdCIsImFkanVzdGVkVG9wIiwid2lkdGgiLCJoZWlnaHQiLCJfZ2V0VW5Vc2VkSW5kZXgiLCJ0ZW1wIiwibm93IiwiaSIsInRvdWNoIiwiX2xhc3RNb2RpZmllZCIsIl9yZW1vdmVVc2VkSW5kZXhCaXQiLCJnZXRJRCIsImluZGV4IiwiX2dsVmlldyIsIl91cGRhdGVDYW52YXNCb3VuZGluZ1JlY3QiLCJlbGVtZW50IiwiZ2FtZSIsImNhbnZhcyIsImNhbnZhc0JvdW5kaW5nUmVjdCIsImRvY0VsZW0iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImxlZnRPZmZzZXQiLCJ3aW5kb3ciLCJwYWdlWE9mZnNldCIsImNsaWVudExlZnQiLCJ0b3BPZmZzZXQiLCJwYWdlWU9mZnNldCIsImNsaWVudFRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJveCIsIkhUTUxDYW52YXNFbGVtZW50IiwicGFyc2VJbnQiLCJzdHlsZSIsImhhbmRsZVRvdWNoZXNCZWdpbiIsInRvdWNoZXMiLCJzZWxUb3VjaCIsImN1clRvdWNoIiwidG91Y2hJRCIsImhhbmRsZVRvdWNoZXMiLCJsb2NUb3VjaEludERpY3QiLCJsZW4iLCJsZW5ndGgiLCJ1bnVzZWRJbmRleCIsImxvZ0lEIiwiVG91Y2giLCJfcG9pbnQiLCJ4IiwieSIsIl9zZXRQcmV2UG9pbnQiLCJfcHJldlBvaW50IiwicHVzaCIsIl9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZSIsInRvdWNoRXZlbnQiLCJFdmVudCIsIkV2ZW50VG91Y2giLCJfZXZlbnRDb2RlIiwiQkVHQU4iLCJkaXNwYXRjaEV2ZW50IiwiaGFuZGxlVG91Y2hlc01vdmUiLCJsb2NUb3VjaGVzIiwiX3NldFBvaW50IiwiTU9WRUQiLCJoYW5kbGVUb3VjaGVzRW5kIiwiZ2V0U2V0T2ZUb3VjaGVzRW5kT3JDYW5jZWwiLCJFTkRFRCIsImhhbmRsZVRvdWNoZXNDYW5jZWwiLCJDQU5DRUxFRCIsImxvY1RvdWNoZXNJbnREaWN0IiwiZ2V0UHJlVG91Y2giLCJwcmVUb3VjaCIsImxvY1ByZVRvdWNoUG9vbCIsImlkIiwic2V0UHJlVG91Y2giLCJmaW5kIiwiZ2V0VG91Y2hCeVhZIiwidHgiLCJ0eSIsInBvcyIsImxvY1ByZVRvdWNoIiwibG9jYXRpb24iLCJjb252ZXJ0VG9Mb2NhdGlvbkluVmlldyIsImdldE1vdXNlRXZlbnQiLCJldmVudFR5cGUiLCJsb2NQcmVNb3VzZSIsIm1vdXNlRXZlbnQiLCJFdmVudE1vdXNlIiwiX3NldFByZXZDdXJzb3IiLCJfY29udmVydE1vdXNlVG9Mb2NhdGlvbkluVmlldyIsInNldExvY2F0aW9uIiwiZ2V0UG9pbnRCeUV2ZW50IiwiZXZlbnQiLCJicm93c2VyVHlwZSIsIkJST1dTRVJfVFlQRV9RUSIsIkJST1dTRVJfVFlQRV9VQyIsIkJST1dTRVJfVFlQRV9TQUZBUkkiLCJwYWdlWCIsInBhZ2VZIiwiYm9keSIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJjbGllbnRYIiwiY2xpZW50WSIsImdldFRvdWNoZXNCeUV2ZW50IiwidG91Y2hBcnIiLCJsb2NWaWV3IiwidG91Y2hfZXZlbnQiLCJwcmVMb2NhdGlvbiIsImNoYW5nZWRUb3VjaGVzIiwiQlJPV1NFUl9UWVBFX0ZJUkVGT1giLCJpZGVudGlmaWVyIiwiZ2V0TG9jYXRpb24iLCJyZWdpc3RlclN5c3RlbUV2ZW50IiwidmlldyIsInNlbGZQb2ludGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJwcm9oaWJpdGlvbiIsImlzTW9iaWxlIiwic3VwcG9ydE1vdXNlIiwiY2FwYWJpbGl0aWVzIiwic3VwcG9ydFRvdWNoZXMiLCJyZWN0IiwiY29udGFpbnMiLCJVUCIsInNldEJ1dHRvbiIsImJ1dHRvbiIsIl9tb3VzZUV2ZW50c09uRWxlbWVudCIsIkRPV04iLCJmb2N1cyIsIk1PVkUiLCJTQ1JPTEwiLCJzZXRTY3JvbGxEYXRhIiwid2hlZWxEZWx0YSIsImRldGFpbCIsImVudHJ5IiwibmFtZSIsInR5cGUiLCJoYW5kbGVyIiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0b3IiLCJtc1BvaW50ZXJFbmFibGVkIiwiX3BvaW50ZXJFdmVudHNNYXAiLCJldmVudE5hbWUiLCJjYWxsIiwiX3RvdWNoRXZlbnRzTWFwIiwidG91Y2hlc1RvSGFuZGxlIiwicmVnaXN0ZXJUb3VjaEV2ZW50Iiwic2Nyb2xsWCIsInNjcm9sbFkiLCJfcmVnaXN0ZXJLZXlib2FyZEV2ZW50IiwiX3JlZ2lzdGVyQWNjZWxlcm9tZXRlckV2ZW50IiwidXBkYXRlIiwiZHQiLCJFdmVudEFjY2VsZXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbnRlcm5hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUtoSyxhQUFMLEdBQXFCLEtBQUtGLGNBQTlCLEVBQThDO0FBQzFDLFdBQUtFLGFBQUwsSUFBc0IsS0FBS0YsY0FBM0I7QUFDQWpCLE1BQUFBLFlBQVksQ0FBQ21GLGFBQWIsQ0FBMkIsSUFBSWhGLEVBQUUsQ0FBQzRFLEtBQUgsQ0FBU3FHLGlCQUFiLENBQStCLEtBQUtoSyxhQUFwQyxDQUEzQjtBQUNIOztBQUNELFNBQUtELGFBQUwsSUFBc0JnSyxFQUF0QjtBQUNIO0FBamhCYyxDQUFuQjtBQW9oQkFFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5MLEVBQUUsQ0FBQ29MLFFBQUgsQ0FBWWxMLFlBQVosR0FBMkJBLFlBQTVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuL0NDTWFjcm8nKTtcclxuY29uc3Qgc3lzID0gcmVxdWlyZSgnLi9DQ1N5cycpO1xyXG5jb25zdCBldmVudE1hbmFnZXIgPSByZXF1aXJlKCcuLi9ldmVudC1tYW5hZ2VyJyk7XHJcblxyXG5jb25zdCBUT1VDSF9USU1FT1VUID0gbWFjcm8uVE9VQ0hfVElNRU9VVDtcclxuXHJcbmxldCBfdmVjMiA9IGNjLnYyKCk7XHJcblxyXG4vKipcclxuICogIFRoaXMgY2xhc3MgbWFuYWdlcyBhbGwgZXZlbnRzIG9mIGlucHV0LiBpbmNsdWRlOiB0b3VjaCwgbW91c2UsIGFjY2VsZXJvbWV0ZXIsIGtleWJvYXJkXHJcbiAqL1xyXG5sZXQgaW5wdXRNYW5hZ2VyID0ge1xyXG4gICAgX21vdXNlUHJlc3NlZDogZmFsc2UsXHJcblxyXG4gICAgX2lzUmVnaXN0ZXJFdmVudDogZmFsc2UsXHJcblxyXG4gICAgX3ByZVRvdWNoUG9pbnQ6IGNjLnYyKDAsMCksXHJcbiAgICBfcHJldk1vdXNlUG9pbnQ6IGNjLnYyKDAsMCksXHJcblxyXG4gICAgX3ByZVRvdWNoUG9vbDogW10sXHJcbiAgICBfcHJlVG91Y2hQb29sUG9pbnRlcjogMCxcclxuXHJcbiAgICBfdG91Y2hlczogW10sXHJcbiAgICBfdG91Y2hlc0ludGVnZXJEaWN0Ont9LFxyXG5cclxuICAgIF9pbmRleEJpdHNVc2VkOiAwLFxyXG4gICAgX21heFRvdWNoZXM6IDgsXHJcblxyXG4gICAgX2FjY2VsRW5hYmxlZDogZmFsc2UsXHJcbiAgICBfYWNjZWxJbnRlcnZhbDogMS81LFxyXG4gICAgX2FjY2VsTWludXM6IDEsXHJcbiAgICBfYWNjZWxDdXJUaW1lOiAwLFxyXG4gICAgX2FjY2VsZXJhdGlvbjogbnVsbCxcclxuICAgIF9hY2NlbERldmljZUV2ZW50OiBudWxsLFxyXG5cclxuICAgIF9jYW52YXNCb3VuZGluZ1JlY3Q6IHtcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBhZGp1c3RlZExlZnQ6IDAsXHJcbiAgICAgICAgYWRqdXN0ZWRUb3A6IDAsXHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0VW5Vc2VkSW5kZXggKCkge1xyXG4gICAgICAgIGxldCB0ZW1wID0gdGhpcy5faW5kZXhCaXRzVXNlZDtcclxuICAgICAgICBsZXQgbm93ID0gY2Muc3lzLm5vdygpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX21heFRvdWNoZXM7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoISh0ZW1wICYgMHgwMDAwMDAwMSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4Qml0c1VzZWQgfD0gKDEgPDwgaSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b3VjaCA9IHRoaXMuX3RvdWNoZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobm93IC0gdG91Y2guX2xhc3RNb2RpZmllZCA+IFRPVUNIX1RJTUVPVVQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVVc2VkSW5kZXhCaXQoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3RvdWNoZXNJbnRlZ2VyRGljdFt0b3VjaC5nZXRJRCgpXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wID4+PSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWxsIGJpdHMgYXJlIHVzZWRcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVVc2VkSW5kZXhCaXQgKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9tYXhUb3VjaGVzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0ZW1wID0gMSA8PCBpbmRleDtcclxuICAgICAgICB0ZW1wID0gfnRlbXA7XHJcbiAgICAgICAgdGhpcy5faW5kZXhCaXRzVXNlZCAmPSB0ZW1wO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZ2xWaWV3OiBudWxsLFxyXG5cclxuICAgIF91cGRhdGVDYW52YXNCb3VuZGluZ1JlY3QgKCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gY2MuZ2FtZS5jYW52YXM7XHJcbiAgICAgICAgbGV0IGNhbnZhc0JvdW5kaW5nUmVjdCA9IHRoaXMuX2NhbnZhc0JvdW5kaW5nUmVjdDtcclxuXHJcbiAgICAgICAgbGV0IGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGxlZnRPZmZzZXQgPSB3aW5kb3cucGFnZVhPZmZzZXQgLSBkb2NFbGVtLmNsaWVudExlZnQ7XHJcbiAgICAgICAgbGV0IHRvcE9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldCAtIGRvY0VsZW0uY2xpZW50VG9wO1xyXG4gICAgICAgIGlmIChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xyXG4gICAgICAgICAgICBsZXQgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmxlZnQgPSBib3gubGVmdCArIGxlZnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC50b3AgPSBib3gudG9wICsgdG9wT2Zmc2V0O1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3Qud2lkdGggPSBib3gud2lkdGg7XHJcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC5oZWlnaHQgPSBib3guaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmxlZnQgPSBsZWZ0T2Zmc2V0O1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QudG9wID0gdG9wT2Zmc2V0O1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3Qud2lkdGggPSBlbGVtZW50LndpZHRoO1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QubGVmdCA9IGxlZnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC50b3AgPSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNhbnZhc0JvdW5kaW5nUmVjdC53aWR0aCA9IHBhcnNlSW50KGVsZW1lbnQuc3R5bGUud2lkdGgpO1xyXG4gICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0ID0gcGFyc2VJbnQoZWxlbWVudC5zdHlsZS5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGhhbmRsZVRvdWNoZXNCZWdpblxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdG91Y2hlc1xyXG4gICAgICovXHJcbiAgICBoYW5kbGVUb3VjaGVzQmVnaW4gKHRvdWNoZXMpIHtcclxuICAgICAgICBsZXQgc2VsVG91Y2gsIGluZGV4LCBjdXJUb3VjaCwgdG91Y2hJRCxcclxuICAgICAgICAgICAgaGFuZGxlVG91Y2hlcyA9IFtdLCBsb2NUb3VjaEludERpY3QgPSB0aGlzLl90b3VjaGVzSW50ZWdlckRpY3QsXHJcbiAgICAgICAgICAgIG5vdyA9IHN5cy5ub3coKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdG91Y2hlcy5sZW5ndGg7IGkgPCBsZW47IGkgKyspIHtcclxuICAgICAgICAgICAgc2VsVG91Y2ggPSB0b3VjaGVzW2ldO1xyXG4gICAgICAgICAgICB0b3VjaElEID0gc2VsVG91Y2guZ2V0SUQoKTtcclxuICAgICAgICAgICAgaW5kZXggPSBsb2NUb3VjaEludERpY3RbdG91Y2hJRF07XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVudXNlZEluZGV4ID0gdGhpcy5fZ2V0VW5Vc2VkSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIGlmICh1bnVzZWRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCgyMzAwLCB1bnVzZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2N1clRvdWNoID0gdGhpcy5fdG91Y2hlc1t1bnVzZWRJbmRleF0gPSBzZWxUb3VjaDtcclxuICAgICAgICAgICAgICAgIGN1clRvdWNoID0gdGhpcy5fdG91Y2hlc1t1bnVzZWRJbmRleF0gPSBuZXcgY2MuVG91Y2goc2VsVG91Y2guX3BvaW50LngsIHNlbFRvdWNoLl9wb2ludC55LCBzZWxUb3VjaC5nZXRJRCgpKTtcclxuICAgICAgICAgICAgICAgIGN1clRvdWNoLl9sYXN0TW9kaWZpZWQgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBjdXJUb3VjaC5fc2V0UHJldlBvaW50KHNlbFRvdWNoLl9wcmV2UG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgbG9jVG91Y2hJbnREaWN0W3RvdWNoSURdID0gdW51c2VkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVUb3VjaGVzLnB1c2goY3VyVG91Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZShoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5CRUdBTjtcclxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQodG91Y2hFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgaGFuZGxlVG91Y2hlc01vdmVcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRvdWNoZXNcclxuICAgICAqL1xyXG4gICAgaGFuZGxlVG91Y2hlc01vdmUgKHRvdWNoZXMpIHtcclxuICAgICAgICBsZXQgc2VsVG91Y2gsIGluZGV4LCB0b3VjaElELFxyXG4gICAgICAgICAgICBoYW5kbGVUb3VjaGVzID0gW10sIGxvY1RvdWNoZXMgPSB0aGlzLl90b3VjaGVzLFxyXG4gICAgICAgICAgICBub3cgPSBzeXMubm93KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvdWNoZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgc2VsVG91Y2ggPSB0b3VjaGVzW2ldO1xyXG4gICAgICAgICAgICB0b3VjaElEID0gc2VsVG91Y2guZ2V0SUQoKTtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl90b3VjaGVzSW50ZWdlckRpY3RbdG91Y2hJRF07XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9jYy5sb2coXCJpZiB0aGUgaW5kZXggZG9lc24ndCBleGlzdCwgaXQgaXMgYW4gZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobG9jVG91Y2hlc1tpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgIGxvY1RvdWNoZXNbaW5kZXhdLl9zZXRQb2ludChzZWxUb3VjaC5fcG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgbG9jVG91Y2hlc1tpbmRleF0uX3NldFByZXZQb2ludChzZWxUb3VjaC5fcHJldlBvaW50KTtcclxuICAgICAgICAgICAgICAgIGxvY1RvdWNoZXNbaW5kZXhdLl9sYXN0TW9kaWZpZWQgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVUb3VjaGVzLnB1c2gobG9jVG91Y2hlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZShoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5NT1ZFRDtcclxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQodG91Y2hFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgaGFuZGxlVG91Y2hlc0VuZFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdG91Y2hlc1xyXG4gICAgICovXHJcbiAgICBoYW5kbGVUb3VjaGVzRW5kICh0b3VjaGVzKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZVRvdWNoZXMgPSB0aGlzLmdldFNldE9mVG91Y2hlc0VuZE9yQ2FuY2VsKHRvdWNoZXMpO1xyXG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZShoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5FTkRFRDtcclxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQodG91Y2hFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZVRvdWNoUG9vbC5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgaGFuZGxlVG91Y2hlc0NhbmNlbFxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdG91Y2hlc1xyXG4gICAgICovXHJcbiAgICBoYW5kbGVUb3VjaGVzQ2FuY2VsICh0b3VjaGVzKSB7XHJcbiAgICAgICAgbGV0IGhhbmRsZVRvdWNoZXMgPSB0aGlzLmdldFNldE9mVG91Y2hlc0VuZE9yQ2FuY2VsKHRvdWNoZXMpO1xyXG4gICAgICAgIGlmIChoYW5kbGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2xWaWV3Ll9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZShoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChoYW5kbGVUb3VjaGVzKTtcclxuICAgICAgICAgICAgdG91Y2hFdmVudC5fZXZlbnRDb2RlID0gY2MuRXZlbnQuRXZlbnRUb3VjaC5DQU5DRUxFRDtcclxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQodG91Y2hFdmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZVRvdWNoUG9vbC5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgZ2V0U2V0T2ZUb3VjaGVzRW5kT3JDYW5jZWxcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRvdWNoZXNcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgZ2V0U2V0T2ZUb3VjaGVzRW5kT3JDYW5jZWwgKHRvdWNoZXMpIHtcclxuICAgICAgICBsZXQgc2VsVG91Y2gsIGluZGV4LCB0b3VjaElELCBoYW5kbGVUb3VjaGVzID0gW10sIGxvY1RvdWNoZXMgPSB0aGlzLl90b3VjaGVzLCBsb2NUb3VjaGVzSW50RGljdCA9IHRoaXMuX3RvdWNoZXNJbnRlZ2VyRGljdDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdG91Y2hlcy5sZW5ndGg7IGk8IGxlbjsgaSArKykge1xyXG4gICAgICAgICAgICBzZWxUb3VjaCA9IHRvdWNoZXNbaV07XHJcbiAgICAgICAgICAgIHRvdWNoSUQgPSBzZWxUb3VjaC5nZXRJRCgpO1xyXG4gICAgICAgICAgICBpbmRleCA9IGxvY1RvdWNoZXNJbnREaWN0W3RvdWNoSURdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlOyAgLy9jYy5sb2coXCJpZiB0aGUgaW5kZXggZG9lc24ndCBleGlzdCwgaXQgaXMgYW4gZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxvY1RvdWNoZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NUb3VjaGVzW2luZGV4XS5fc2V0UG9pbnQoc2VsVG91Y2guX3BvaW50KTtcclxuICAgICAgICAgICAgICAgIGxvY1RvdWNoZXNbaW5kZXhdLl9zZXRQcmV2UG9pbnQoc2VsVG91Y2guX3ByZXZQb2ludCk7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVUb3VjaGVzLnB1c2gobG9jVG91Y2hlc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlVXNlZEluZGV4Qml0KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NUb3VjaGVzSW50RGljdFt0b3VjaElEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFuZGxlVG91Y2hlcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGdldFByZVRvdWNoXHJcbiAgICAgKiBAcGFyYW0ge1RvdWNofSB0b3VjaFxyXG4gICAgICogQHJldHVybiB7VG91Y2h9XHJcbiAgICAgKi9cclxuICAgIGdldFByZVRvdWNoICh0b3VjaCkge1xyXG4gICAgICAgIGxldCBwcmVUb3VjaCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGxvY1ByZVRvdWNoUG9vbCA9IHRoaXMuX3ByZVRvdWNoUG9vbDtcclxuICAgICAgICBsZXQgaWQgPSB0b3VjaC5nZXRJRCgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBsb2NQcmVUb3VjaFBvb2wubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKGxvY1ByZVRvdWNoUG9vbFtpXS5nZXRJRCgpID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgcHJlVG91Y2ggPSBsb2NQcmVUb3VjaFBvb2xbaV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXByZVRvdWNoKVxyXG4gICAgICAgICAgICBwcmVUb3VjaCA9IHRvdWNoO1xyXG4gICAgICAgIHJldHVybiBwcmVUb3VjaDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIHNldFByZVRvdWNoXHJcbiAgICAgKiBAcGFyYW0ge1RvdWNofSB0b3VjaFxyXG4gICAgICovXHJcbiAgICBzZXRQcmVUb3VjaCAodG91Y2gpIHtcclxuICAgICAgICBsZXQgZmluZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBsb2NQcmVUb3VjaFBvb2wgPSB0aGlzLl9wcmVUb3VjaFBvb2w7XHJcbiAgICAgICAgbGV0IGlkID0gdG91Y2guZ2V0SUQoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbG9jUHJlVG91Y2hQb29sLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NQcmVUb3VjaFBvb2xbaV0uZ2V0SUQoKSA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgIGxvY1ByZVRvdWNoUG9vbFtpXSA9IHRvdWNoO1xyXG4gICAgICAgICAgICAgICAgZmluZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZpbmQpIHtcclxuICAgICAgICAgICAgaWYgKGxvY1ByZVRvdWNoUG9vbC5sZW5ndGggPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGxvY1ByZVRvdWNoUG9vbC5wdXNoKHRvdWNoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvY1ByZVRvdWNoUG9vbFt0aGlzLl9wcmVUb3VjaFBvb2xQb2ludGVyXSA9IHRvdWNoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlVG91Y2hQb29sUG9pbnRlciA9ICh0aGlzLl9wcmVUb3VjaFBvb2xQb2ludGVyICsgMSkgJSA1MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGdldFRvdWNoQnlYWVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHlcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zXHJcbiAgICAgKiBAcmV0dXJuIHtUb3VjaH1cclxuICAgICAqL1xyXG4gICAgZ2V0VG91Y2hCeVhZICh0eCwgdHksIHBvcykge1xyXG4gICAgICAgIGxldCBsb2NQcmVUb3VjaCA9IHRoaXMuX3ByZVRvdWNoUG9pbnQ7XHJcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gdGhpcy5fZ2xWaWV3LmNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3KHR4LCB0eSwgcG9zKTtcclxuICAgICAgICBsZXQgdG91Y2ggPSBuZXcgY2MuVG91Y2gobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgMCk7XHJcbiAgICAgICAgdG91Y2guX3NldFByZXZQb2ludChsb2NQcmVUb3VjaC54LCBsb2NQcmVUb3VjaC55KTtcclxuICAgICAgICBsb2NQcmVUb3VjaC54ID0gbG9jYXRpb24ueDtcclxuICAgICAgICBsb2NQcmVUb3VjaC55ID0gbG9jYXRpb24ueTtcclxuICAgICAgICByZXR1cm4gdG91Y2g7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBnZXRNb3VzZUV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGxvY2F0aW9uXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvc1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV2ZW50VHlwZVxyXG4gICAgICogQHJldHVybnMge0V2ZW50LkV2ZW50TW91c2V9XHJcbiAgICAgKi9cclxuICAgIGdldE1vdXNlRXZlbnQgKGxvY2F0aW9uLCBwb3MsIGV2ZW50VHlwZSkge1xyXG4gICAgICAgIGxldCBsb2NQcmVNb3VzZSA9IHRoaXMuX3ByZXZNb3VzZVBvaW50O1xyXG4gICAgICAgIGxldCBtb3VzZUV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50TW91c2UoZXZlbnRUeXBlKTtcclxuICAgICAgICBtb3VzZUV2ZW50Ll9zZXRQcmV2Q3Vyc29yKGxvY1ByZU1vdXNlLngsIGxvY1ByZU1vdXNlLnkpO1xyXG4gICAgICAgIGxvY1ByZU1vdXNlLnggPSBsb2NhdGlvbi54O1xyXG4gICAgICAgIGxvY1ByZU1vdXNlLnkgPSBsb2NhdGlvbi55O1xyXG4gICAgICAgIHRoaXMuX2dsVmlldy5fY29udmVydE1vdXNlVG9Mb2NhdGlvbkluVmlldyhsb2NQcmVNb3VzZSwgcG9zKTtcclxuICAgICAgICBtb3VzZUV2ZW50LnNldExvY2F0aW9uKGxvY1ByZU1vdXNlLngsIGxvY1ByZU1vdXNlLnkpO1xyXG4gICAgICAgIHJldHVybiBtb3VzZUV2ZW50O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgZ2V0UG9pbnRCeUV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge1RvdWNofSBldmVudFxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb3NcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldFBvaW50QnlFdmVudCAoZXZlbnQsIHBvcykge1xyXG4gICAgICAgIC8vIHFxICwgdWMgYW5kIHNhZmFyaSBicm93c2VyIGNhbid0IGNhbGN1bGF0ZSBwYWdlWSBjb3JyZWN0bHksIG5lZWQgdG8gcmVmcmVzaCBjYW52YXMgYm91bmRpbmcgcmVjdFxyXG4gICAgICAgIGlmIChjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfUVEgXHJcbiAgICAgICAgICAgIHx8IGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9VQ1xyXG4gICAgICAgICAgICB8fCBjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfU0FGQVJJKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoZXZlbnQucGFnZVggIT0gbnVsbCkgIC8vbm90IGF2YWxhYmxlIGluIDw9IElFOFxyXG4gICAgICAgICAgICByZXR1cm4ge3g6IGV2ZW50LnBhZ2VYLCB5OiBldmVudC5wYWdlWX07XHJcblxyXG4gICAgICAgIHBvcy5sZWZ0IC09IGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcclxuICAgICAgICBwb3MudG9wIC09IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICByZXR1cm4ge3g6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFl9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgZ2V0VG91Y2hlc0J5RXZlbnRcclxuICAgICAqIEBwYXJhbSB7VG91Y2h9IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvc1xyXG4gICAgICogQHJldHVybnMge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRUb3VjaGVzQnlFdmVudCAoZXZlbnQsIHBvcykge1xyXG4gICAgICAgIGxldCB0b3VjaEFyciA9IFtdLCBsb2NWaWV3ID0gdGhpcy5fZ2xWaWV3O1xyXG4gICAgICAgIGxldCB0b3VjaF9ldmVudCwgdG91Y2gsIHByZUxvY2F0aW9uO1xyXG4gICAgICAgIGxldCBsb2NQcmVUb3VjaCA9IHRoaXMuX3ByZVRvdWNoUG9pbnQ7XHJcblxyXG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0b3VjaF9ldmVudCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAodG91Y2hfZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChzeXMuQlJPV1NFUl9UWVBFX0ZJUkVGT1ggPT09IHN5cy5icm93c2VyVHlwZSlcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGxvY1ZpZXcuY29udmVydFRvTG9jYXRpb25JblZpZXcodG91Y2hfZXZlbnQucGFnZVgsIHRvdWNoX2V2ZW50LnBhZ2VZLCBwb3MsIF92ZWMyKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGxvY1ZpZXcuY29udmVydFRvTG9jYXRpb25JblZpZXcodG91Y2hfZXZlbnQuY2xpZW50WCwgdG91Y2hfZXZlbnQuY2xpZW50WSwgcG9zLCBfdmVjMik7XHJcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hfZXZlbnQuaWRlbnRpZmllciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSBuZXcgY2MuVG91Y2gobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgdG91Y2hfZXZlbnQuaWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91c2UgVG91Y2ggUG9vbFxyXG4gICAgICAgICAgICAgICAgICAgIHByZUxvY2F0aW9uID0gdGhpcy5nZXRQcmVUb3VjaCh0b3VjaCkuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaC5fc2V0UHJldlBvaW50KHByZUxvY2F0aW9uLngsIHByZUxvY2F0aW9uLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJlVG91Y2godG91Y2gpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IG5ldyBjYy5Ub3VjaChsb2NhdGlvbi54LCBsb2NhdGlvbi55KTtcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaC5fc2V0UHJldlBvaW50KGxvY1ByZVRvdWNoLngsIGxvY1ByZVRvdWNoLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbG9jUHJlVG91Y2gueCA9IGxvY2F0aW9uLng7XHJcbiAgICAgICAgICAgICAgICBsb2NQcmVUb3VjaC55ID0gbG9jYXRpb24ueTtcclxuICAgICAgICAgICAgICAgIHRvdWNoQXJyLnB1c2godG91Y2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3VjaEFycjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyU3lzdGVtRXZlbnRcclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJTeXN0ZW1FdmVudCAoZWxlbWVudCkge1xyXG4gICAgICAgIGlmKHRoaXMuX2lzUmVnaXN0ZXJFdmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl9nbFZpZXcgPSBjYy52aWV3O1xyXG4gICAgICAgIGxldCBzZWxmUG9pbnRlciA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNhbnZhc0JvdW5kaW5nUmVjdCA9IHRoaXMuX2NhbnZhc0JvdW5kaW5nUmVjdDtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgbGV0IHByb2hpYml0aW9uID0gc3lzLmlzTW9iaWxlO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TW91c2UgPSAoJ21vdXNlJyBpbiBzeXMuY2FwYWJpbGl0aWVzKTtcclxuICAgICAgICBsZXQgc3VwcG9ydFRvdWNoZXMgPSAoJ3RvdWNoZXMnIGluIHN5cy5jYXBhYmlsaXRpZXMpO1xyXG5cclxuICAgICAgICBpZiAoc3VwcG9ydE1vdXNlKSB7XHJcbiAgICAgICAgICAgIC8vSEFDS1xyXG4gICAgICAgICAgICAvLyAgLSBBdCB0aGUgc2FtZSB0aW1lIHRvIHRyaWdnZXIgdGhlIG9udG91Y2ggZXZlbnQgYW5kIG9ubW91c2UgZXZlbnRcclxuICAgICAgICAgICAgLy8gIC0gVGhlIGZ1bmN0aW9uIHdpbGwgZXhlY3V0ZSAyIHRpbWVzXHJcbiAgICAgICAgICAgIC8vVGhlIGtub3duIGJyb3dzZXI6XHJcbiAgICAgICAgICAgIC8vICBsaWViaWFvXHJcbiAgICAgICAgICAgIC8vICBtaXVpXHJcbiAgICAgICAgICAgIC8vICBXRUNIQVRcclxuICAgICAgICAgICAgaWYgKCFwcm9oaWJpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5fbW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZlBvaW50ZXIuX21vdXNlUHJlc3NlZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gc2VsZlBvaW50ZXIuZ2V0UG9pbnRCeUV2ZW50KGV2ZW50LCBjYW52YXNCb3VuZGluZ1JlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2MucmVjdChjYW52YXNCb3VuZGluZ1JlY3QubGVmdCwgY2FudmFzQm91bmRpbmdSZWN0LnRvcCwgY2FudmFzQm91bmRpbmdSZWN0LndpZHRoLCBjYW52YXNCb3VuZGluZ1JlY3QuaGVpZ2h0KS5jb250YWlucyhsb2NhdGlvbikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzRW5kKFtzZWxmUG9pbnRlci5nZXRUb3VjaEJ5WFkobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgY2FudmFzQm91bmRpbmdSZWN0KV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdXNlRXZlbnQgPSBzZWxmUG9pbnRlci5nZXRNb3VzZUV2ZW50KGxvY2F0aW9uLCBjYW52YXNCb3VuZGluZ1JlY3QsIGNjLkV2ZW50LkV2ZW50TW91c2UuVVApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUV2ZW50LnNldEJ1dHRvbihldmVudC5idXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIuZGlzcGF0Y2hFdmVudChtb3VzZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNhbnZhcyBtb3VzZSBldmVudFxyXG4gICAgICAgICAgICBsZXQgRXZlbnRNb3VzZSA9IGNjLkV2ZW50LkV2ZW50TW91c2U7XHJcbiAgICAgICAgICAgIGxldCBfbW91c2VFdmVudHNPbkVsZW1lbnQgPSBbXHJcbiAgICAgICAgICAgICAgICAhcHJvaGliaXRpb24gJiYgW1wibW91c2Vkb3duXCIsIEV2ZW50TW91c2UuRE9XTiwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50LCBsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuX21vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0JlZ2luKFtzZWxmUG9pbnRlci5nZXRUb3VjaEJ5WFkobG9jYXRpb24ueCwgbG9jYXRpb24ueSwgY2FudmFzQm91bmRpbmdSZWN0KV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgIXByb2hpYml0aW9uICYmIFtcIm1vdXNldXBcIiwgRXZlbnRNb3VzZS5VUCwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50LCBsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuX21vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLmhhbmRsZVRvdWNoZXNFbmQoW3NlbGZQb2ludGVyLmdldFRvdWNoQnlYWShsb2NhdGlvbi54LCBsb2NhdGlvbi55LCBjYW52YXNCb3VuZGluZ1JlY3QpXSk7XHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICFwcm9oaWJpdGlvbiAmJiBbXCJtb3VzZW1vdmVcIiwgRXZlbnRNb3VzZS5NT1ZFLCBmdW5jdGlvbiAoZXZlbnQsIG1vdXNlRXZlbnQsIGxvY2F0aW9uLCBjYW52YXNCb3VuZGluZ1JlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzTW92ZShbc2VsZlBvaW50ZXIuZ2V0VG91Y2hCeVhZKGxvY2F0aW9uLngsIGxvY2F0aW9uLnksIGNhbnZhc0JvdW5kaW5nUmVjdCldKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlbGZQb2ludGVyLl9tb3VzZVByZXNzZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VFdmVudC5zZXRCdXR0b24obnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICBbXCJtb3VzZXdoZWVsXCIsIEV2ZW50TW91c2UuU0NST0xMLCBmdW5jdGlvbiAoZXZlbnQsIG1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3VzZUV2ZW50LnNldFNjcm9sbERhdGEoMCwgZXZlbnQud2hlZWxEZWx0YSk7XHJcbiAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgIC8qIGZpcmVmb3ggZml4ICovXHJcbiAgICAgICAgICAgICAgICBbXCJET01Nb3VzZVNjcm9sbFwiLCBFdmVudE1vdXNlLlNDUk9MTCwgZnVuY3Rpb24gKGV2ZW50LCBtb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91c2VFdmVudC5zZXRTY3JvbGxEYXRhKDAsIGV2ZW50LmRldGFpbCAqIC0xMjApO1xyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfbW91c2VFdmVudHNPbkVsZW1lbnQubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlbnRyeSA9IF9tb3VzZUV2ZW50c09uRWxlbWVudFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gZW50cnlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBlbnRyeVsxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IGVudHJ5WzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gc2VsZlBvaW50ZXIuZ2V0UG9pbnRCeUV2ZW50KGV2ZW50LCBjYW52YXNCb3VuZGluZ1JlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW91c2VFdmVudCA9IHNlbGZQb2ludGVyLmdldE1vdXNlRXZlbnQobG9jYXRpb24sIGNhbnZhc0JvdW5kaW5nUmVjdCwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlRXZlbnQuc2V0QnV0dG9uKGV2ZW50LmJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGV2ZW50LCBtb3VzZUV2ZW50LCBsb2NhdGlvbiwgY2FudmFzQm91bmRpbmdSZWN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KG1vdXNlRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcclxuICAgICAgICAgICAgbGV0IF9wb2ludGVyRXZlbnRzTWFwID0ge1xyXG4gICAgICAgICAgICAgICAgXCJNU1BvaW50ZXJEb3duXCIgICAgIDogc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0JlZ2luLFxyXG4gICAgICAgICAgICAgICAgXCJNU1BvaW50ZXJNb3ZlXCIgICAgIDogc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc01vdmUsXHJcbiAgICAgICAgICAgICAgICBcIk1TUG9pbnRlclVwXCIgICAgICAgOiBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzRW5kLFxyXG4gICAgICAgICAgICAgICAgXCJNU1BvaW50ZXJDYW5jZWxcIiAgIDogc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0NhbmNlbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBldmVudE5hbWUgaW4gX3BvaW50ZXJFdmVudHNNYXApIHtcclxuICAgICAgICAgICAgICAgIGxldCB0b3VjaEV2ZW50ID0gX3BvaW50ZXJFdmVudHNNYXBbZXZlbnROYW1lXTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZ1bmN0aW9uIChldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRMZWZ0ID0gY2FudmFzQm91bmRpbmdSZWN0LmxlZnQgLSBkb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRUb3AgPSBjYW52YXNCb3VuZGluZ1JlY3QudG9wIC0gZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudC5jYWxsKHNlbGZQb2ludGVyLCBbc2VsZlBvaW50ZXIuZ2V0VG91Y2hCeVhZKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIGNhbnZhc0JvdW5kaW5nUmVjdCldKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZWdpc3RlciB0b3VjaCBldmVudFxyXG4gICAgICAgIGlmIChzdXBwb3J0VG91Y2hlcykge1xyXG4gICAgICAgICAgICBsZXQgX3RvdWNoRXZlbnRzTWFwID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ0b3VjaHN0YXJ0XCI6IGZ1bmN0aW9uICh0b3VjaGVzVG9IYW5kbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmUG9pbnRlci5oYW5kbGVUb3VjaGVzQmVnaW4odG91Y2hlc1RvSGFuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VjaG1vdmVcIjogZnVuY3Rpb24gKHRvdWNoZXNUb0hhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLmhhbmRsZVRvdWNoZXNNb3ZlKHRvdWNoZXNUb0hhbmRsZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VjaGVuZFwiOiBmdW5jdGlvbiAodG91Y2hlc1RvSGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZlBvaW50ZXIuaGFuZGxlVG91Y2hlc0VuZCh0b3VjaGVzVG9IYW5kbGUpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwidG91Y2hjYW5jZWxcIjogZnVuY3Rpb24gKHRvdWNoZXNUb0hhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZQb2ludGVyLmhhbmRsZVRvdWNoZXNDYW5jZWwodG91Y2hlc1RvSGFuZGxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZWdpc3RlclRvdWNoRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IF90b3VjaEV2ZW50c01hcFtldmVudE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudC5jaGFuZ2VkVG91Y2hlcykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzQm91bmRpbmdSZWN0LmFkanVzdGVkTGVmdCA9IGNhbnZhc0JvdW5kaW5nUmVjdC5sZWZ0IC0gKGJvZHkuc2Nyb2xsTGVmdCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjYW52YXNCb3VuZGluZ1JlY3QuYWRqdXN0ZWRUb3AgPSBjYW52YXNCb3VuZGluZ1JlY3QudG9wIC0gKGJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5zY3JvbGxZIHx8IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIoc2VsZlBvaW50ZXIuZ2V0VG91Y2hlc0J5RXZlbnQoZXZlbnQsIGNhbnZhc0JvdW5kaW5nUmVjdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9KSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBldmVudE5hbWUgaW4gX3RvdWNoRXZlbnRzTWFwKSB7XHJcbiAgICAgICAgICAgICAgICByZWdpc3RlclRvdWNoRXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJLZXlib2FyZEV2ZW50KCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUmVnaXN0ZXJFdmVudCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZWdpc3RlcktleWJvYXJkRXZlbnQgKCkge30sXHJcblxyXG4gICAgX3JlZ2lzdGVyQWNjZWxlcm9tZXRlckV2ZW50ICgpIHt9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCB1cGRhdGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdFxyXG4gICAgICovXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjY2VsQ3VyVGltZSA+IHRoaXMuX2FjY2VsSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWNjZWxDdXJUaW1lIC09IHRoaXMuX2FjY2VsSW50ZXJ2YWw7XHJcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEFjY2VsZXJhdGlvbih0aGlzLl9hY2NlbGVyYXRpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWNjZWxDdXJUaW1lICs9IGR0O1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5pbnRlcm5hbC5pbnB1dE1hbmFnZXIgPSBpbnB1dE1hbmFnZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9