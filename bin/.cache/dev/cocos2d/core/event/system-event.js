
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/system-event.js';
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
var EventTarget = require('../event/event-target');

var eventManager = require('../event-manager');

var inputManger = require('../platform/CCInputManager');

;
/**
 * !#en The event type supported by SystemEvent
 * !#zh SystemEvent 支持的事件类型
 * @class SystemEvent.EventType
 * @static
 * @namespace SystemEvent
 */

var EventType = cc.Enum({
  /**
   * !#en The event type for press the key down event, you can use its value directly: 'keydown'
   * !#zh 当按下按键时触发的事件
   * @property KEY_DOWN
   * @type {String}
   * @static
   */
  KEY_DOWN: 'keydown',

  /**
   * !#en The event type for press the key up event, you can use its value directly: 'keyup'
   * !#zh 当松开按键时触发的事件
   * @property KEY_UP
   * @type {String}
   * @static
   */
  KEY_UP: 'keyup',

  /**
   * !#en The event type for press the devicemotion event, you can use its value directly: 'devicemotion'
   * !#zh 重力感应
   * @property DEVICEMOTION
   * @type {String}
   * @static
   */
  DEVICEMOTION: 'devicemotion'
});
/**
 * !#en
 * The System event, it currently supports keyboard events and accelerometer events.<br>
 * You can get the SystemEvent instance with cc.systemEvent.<br>
 * !#zh
 * 系统事件，它目前支持按键事件和重力感应事件。<br>
 * 你可以通过 cc.systemEvent 获取到 SystemEvent 的实例。<br>
 * @class SystemEvent
 * @extends EventTarget
 * @example
 * cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
 * cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
 */

var keyboardListener = null;
var accelerationListener = null;
var SystemEvent = cc.Class({
  name: 'SystemEvent',
  "extends": EventTarget,
  statics: {
    EventType: EventType
  },

  /**
   * !#en whether enable accelerometer event
   * !#zh 是否启用加速度计事件
   * @method setAccelerometerEnabled
   * @param {Boolean} isEnable
   */
  setAccelerometerEnabled: function setAccelerometerEnabled(isEnable) {
    if (CC_EDITOR) {
      return;
    } // for iOS 13+


    if (isEnable && window.DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(function (response) {
        console.log("Device Motion Event request permission: " + response);
        inputManger.setAccelerometerEnabled(response === 'granted');
      });
    } else {
      inputManger.setAccelerometerEnabled(isEnable);
    }
  },

  /**
   * !#en set accelerometer interval value
   * !#zh 设置加速度计间隔值
   * @method setAccelerometerInterval
   * @param {Number} interval
   */
  setAccelerometerInterval: function setAccelerometerInterval(interval) {
    if (CC_EDITOR) {
      return;
    }

    inputManger.setAccelerometerInterval(interval);
  },
  on: function on(type, callback, target, once) {
    if (CC_EDITOR) {
      return;
    }

    this._super(type, callback, target, once); // Keyboard


    if (type === EventType.KEY_DOWN || type === EventType.KEY_UP) {
      if (!keyboardListener) {
        keyboardListener = cc.EventListener.create({
          event: cc.EventListener.KEYBOARD,
          onKeyPressed: function onKeyPressed(keyCode, event) {
            event.type = EventType.KEY_DOWN;
            cc.systemEvent.dispatchEvent(event);
          },
          onKeyReleased: function onKeyReleased(keyCode, event) {
            event.type = EventType.KEY_UP;
            cc.systemEvent.dispatchEvent(event);
          }
        });
      }

      if (!eventManager.hasEventListener(cc.EventListener.ListenerID.KEYBOARD)) {
        eventManager.addListener(keyboardListener, 1);
      }
    } // Acceleration


    if (type === EventType.DEVICEMOTION) {
      if (!accelerationListener) {
        accelerationListener = cc.EventListener.create({
          event: cc.EventListener.ACCELERATION,
          callback: function callback(acc, event) {
            event.type = EventType.DEVICEMOTION;
            cc.systemEvent.dispatchEvent(event);
          }
        });
      }

      if (!eventManager.hasEventListener(cc.EventListener.ListenerID.ACCELERATION)) {
        eventManager.addListener(accelerationListener, 1);
      }
    }
  },
  off: function off(type, callback, target) {
    if (CC_EDITOR) {
      return;
    }

    this._super(type, callback, target); // Keyboard


    if (keyboardListener && (type === EventType.KEY_DOWN || type === EventType.KEY_UP)) {
      var hasKeyDownEventListener = this.hasEventListener(EventType.KEY_DOWN);
      var hasKeyUpEventListener = this.hasEventListener(EventType.KEY_UP);

      if (!hasKeyDownEventListener && !hasKeyUpEventListener) {
        eventManager.removeListener(keyboardListener);
      }
    } // Acceleration


    if (accelerationListener && type === EventType.DEVICEMOTION) {
      eventManager.removeListener(accelerationListener);
    }
  }
});
cc.SystemEvent = module.exports = SystemEvent;
/**
 * @module cc
 */

/**
 * !#en The System event singleton for global usage
 * !#zh 系统事件单例，方便全局使用
 * @property systemEvent
 * @type {SystemEvent}
 */

cc.systemEvent = new cc.SystemEvent();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50XFxzeXN0ZW0tZXZlbnQuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwiZXZlbnRNYW5hZ2VyIiwiaW5wdXRNYW5nZXIiLCJFdmVudFR5cGUiLCJjYyIsIkVudW0iLCJLRVlfRE9XTiIsIktFWV9VUCIsIkRFVklDRU1PVElPTiIsImtleWJvYXJkTGlzdGVuZXIiLCJhY2NlbGVyYXRpb25MaXN0ZW5lciIsIlN5c3RlbUV2ZW50IiwiQ2xhc3MiLCJuYW1lIiwic3RhdGljcyIsInNldEFjY2VsZXJvbWV0ZXJFbmFibGVkIiwiaXNFbmFibGUiLCJDQ19FRElUT1IiLCJ3aW5kb3ciLCJEZXZpY2VNb3Rpb25FdmVudCIsInJlcXVlc3RQZXJtaXNzaW9uIiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInNldEFjY2VsZXJvbWV0ZXJJbnRlcnZhbCIsImludGVydmFsIiwib24iLCJ0eXBlIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwiX3N1cGVyIiwiRXZlbnRMaXN0ZW5lciIsImNyZWF0ZSIsImV2ZW50IiwiS0VZQk9BUkQiLCJvbktleVByZXNzZWQiLCJrZXlDb2RlIiwic3lzdGVtRXZlbnQiLCJkaXNwYXRjaEV2ZW50Iiwib25LZXlSZWxlYXNlZCIsImhhc0V2ZW50TGlzdGVuZXIiLCJMaXN0ZW5lcklEIiwiYWRkTGlzdGVuZXIiLCJBQ0NFTEVSQVRJT04iLCJhY2MiLCJvZmYiLCJoYXNLZXlEb3duRXZlbnRMaXN0ZW5lciIsImhhc0tleVVwRXZlbnRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBUCxFQUFFLENBQUNtQyxXQUFILEdBQWlCLElBQUluQyxFQUFFLENBQUNPLFdBQVAsRUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcclxudmFyIGV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJy4uL2V2ZW50LW1hbmFnZXInKTtcclxudmFyIGlucHV0TWFuZ2VyID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NJbnB1dE1hbmFnZXInKTs7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBzdXBwb3J0ZWQgYnkgU3lzdGVtRXZlbnRcclxuICogISN6aCBTeXN0ZW1FdmVudCDmlK/mjIHnmoTkuovku7bnsbvlnotcclxuICogQGNsYXNzIFN5c3RlbUV2ZW50LkV2ZW50VHlwZVxyXG4gKiBAc3RhdGljXHJcbiAqIEBuYW1lc3BhY2UgU3lzdGVtRXZlbnRcclxuICovXHJcbnZhciBFdmVudFR5cGUgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgcHJlc3MgdGhlIGtleSBkb3duIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdrZXlkb3duJ1xyXG4gICAgICogISN6aCDlvZPmjInkuIvmjInplK7ml7bop6blj5HnmoTkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSBLRVlfRE9XTlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgS0VZX0RPV046ICdrZXlkb3duJyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgcHJlc3MgdGhlIGtleSB1cCBldmVudCwgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAna2V5dXAnXHJcbiAgICAgKiAhI3poIOW9k+advuW8gOaMiemUruaXtuinpuWPkeeahOS6i+S7tlxyXG4gICAgICogQHByb3BlcnR5IEtFWV9VUFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgS0VZX1VQOiAna2V5dXAnLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBwcmVzcyB0aGUgZGV2aWNlbW90aW9uIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdkZXZpY2Vtb3Rpb24nXHJcbiAgICAgKiAhI3poIOmHjeWKm+aEn+W6lFxyXG4gICAgICogQHByb3BlcnR5IERFVklDRU1PVElPTlxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgREVWSUNFTU9USU9OOiAnZGV2aWNlbW90aW9uJ1xyXG5cclxufSk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgU3lzdGVtIGV2ZW50LCBpdCBjdXJyZW50bHkgc3VwcG9ydHMga2V5Ym9hcmQgZXZlbnRzIGFuZCBhY2NlbGVyb21ldGVyIGV2ZW50cy48YnI+XHJcbiAqIFlvdSBjYW4gZ2V0IHRoZSBTeXN0ZW1FdmVudCBpbnN0YW5jZSB3aXRoIGNjLnN5c3RlbUV2ZW50Ljxicj5cclxuICogISN6aFxyXG4gKiDns7vnu5/kuovku7bvvIzlroPnm67liY3mlK/mjIHmjInplK7kuovku7blkozph43lipvmhJ/lupTkuovku7bjgII8YnI+XHJcbiAqIOS9oOWPr+S7pemAmui/hyBjYy5zeXN0ZW1FdmVudCDojrflj5bliLAgU3lzdGVtRXZlbnQg55qE5a6e5L6L44CCPGJyPlxyXG4gKiBAY2xhc3MgU3lzdGVtRXZlbnRcclxuICogQGV4dGVuZHMgRXZlbnRUYXJnZXRcclxuICogQGV4YW1wbGVcclxuICogY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLkRFVklDRU1PVElPTiwgdGhpcy5vbkRldmljZU1vdGlvbkV2ZW50LCB0aGlzKTtcclxuICogY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5ERVZJQ0VNT1RJT04sIHRoaXMub25EZXZpY2VNb3Rpb25FdmVudCwgdGhpcyk7XHJcbiAqL1xyXG5cclxudmFyIGtleWJvYXJkTGlzdGVuZXIgPSBudWxsO1xyXG52YXIgYWNjZWxlcmF0aW9uTGlzdGVuZXIgPSBudWxsO1xyXG52YXIgU3lzdGVtRXZlbnQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnU3lzdGVtRXZlbnQnLFxyXG4gICAgZXh0ZW5kczogRXZlbnRUYXJnZXQsXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiB3aGV0aGVyIGVuYWJsZSBhY2NlbGVyb21ldGVyIGV2ZW50XHJcbiAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOWKoOmAn+W6puiuoeS6i+S7tlxyXG4gICAgICogQG1ldGhvZCBzZXRBY2NlbGVyb21ldGVyRW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpc0VuYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXRBY2NlbGVyb21ldGVyRW5hYmxlZDogZnVuY3Rpb24gKGlzRW5hYmxlKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmb3IgaU9TIDEzK1xyXG4gICAgICAgIGlmIChpc0VuYWJsZSAmJiB3aW5kb3cuRGV2aWNlTW90aW9uRXZlbnQgJiYgdHlwZW9mIERldmljZU1vdGlvbkV2ZW50LnJlcXVlc3RQZXJtaXNzaW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIERldmljZU1vdGlvbkV2ZW50LnJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGV2aWNlIE1vdGlvbiBFdmVudCByZXF1ZXN0IHBlcm1pc3Npb246ICR7cmVzcG9uc2V9YCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dE1hbmdlci5zZXRBY2NlbGVyb21ldGVyRW5hYmxlZChyZXNwb25zZSA9PT0gJ2dyYW50ZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXRNYW5nZXIuc2V0QWNjZWxlcm9tZXRlckVuYWJsZWQoaXNFbmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHNldCBhY2NlbGVyb21ldGVyIGludGVydmFsIHZhbHVlXHJcbiAgICAgKiAhI3poIOiuvue9ruWKoOmAn+W6puiuoemXtOmalOWAvFxyXG4gICAgICogQG1ldGhvZCBzZXRBY2NlbGVyb21ldGVySW50ZXJ2YWxcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbFxyXG4gICAgICovXHJcbiAgICBzZXRBY2NlbGVyb21ldGVySW50ZXJ2YWw6IGZ1bmN0aW9uKGludGVydmFsKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0TWFuZ2VyLnNldEFjY2VsZXJvbWV0ZXJJbnRlcnZhbChpbnRlcnZhbCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSkge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdXBlcih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcclxuXHJcbiAgICAgICAgLy8gS2V5Ym9hcmRcclxuICAgICAgICBpZiAodHlwZSA9PT0gRXZlbnRUeXBlLktFWV9ET1dOIHx8IHR5cGUgPT09IEV2ZW50VHlwZS5LRVlfVVApIHtcclxuICAgICAgICAgICAgaWYgKCFrZXlib2FyZExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlib2FyZExpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxyXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogZnVuY3Rpb24gKGtleUNvZGUsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuS0VZX0RPV047XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5c3RlbUV2ZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlSZWxlYXNlZDogZnVuY3Rpb24gKGtleUNvZGUsIGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuS0VZX1VQO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXN0ZW1FdmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWV2ZW50TWFuYWdlci5oYXNFdmVudExpc3RlbmVyKGNjLkV2ZW50TGlzdGVuZXIuTGlzdGVuZXJJRC5LRVlCT0FSRCkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcihrZXlib2FyZExpc3RlbmVyLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWNjZWxlcmF0aW9uXHJcbiAgICAgICAgaWYgKHR5cGUgPT09IEV2ZW50VHlwZS5ERVZJQ0VNT1RJT04pIHtcclxuICAgICAgICAgICAgaWYgKCFhY2NlbGVyYXRpb25MaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgYWNjZWxlcmF0aW9uTGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuQUNDRUxFUkFUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoYWNjLCBldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLkRFVklDRU1PVElPTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzdGVtRXZlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFldmVudE1hbmFnZXIuaGFzRXZlbnRMaXN0ZW5lcihjYy5FdmVudExpc3RlbmVyLkxpc3RlbmVySUQuQUNDRUxFUkFUSU9OKSkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKGFjY2VsZXJhdGlvbkxpc3RlbmVyLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIG9mZjogZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3VwZXIodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcblxyXG4gICAgICAgIC8vIEtleWJvYXJkXHJcbiAgICAgICAgaWYgKGtleWJvYXJkTGlzdGVuZXIgJiYgKHR5cGUgPT09IEV2ZW50VHlwZS5LRVlfRE9XTiB8fCB0eXBlID09PSBFdmVudFR5cGUuS0VZX1VQKSkge1xyXG4gICAgICAgICAgICB2YXIgaGFzS2V5RG93bkV2ZW50TGlzdGVuZXIgPSB0aGlzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLktFWV9ET1dOKTtcclxuICAgICAgICAgICAgdmFyIGhhc0tleVVwRXZlbnRMaXN0ZW5lciA9IHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuS0VZX1VQKTtcclxuICAgICAgICAgICAgaWYgKCFoYXNLZXlEb3duRXZlbnRMaXN0ZW5lciAmJiAhaGFzS2V5VXBFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIoa2V5Ym9hcmRMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFjY2VsZXJhdGlvblxyXG4gICAgICAgIGlmIChhY2NlbGVyYXRpb25MaXN0ZW5lciAmJiB0eXBlID09PSBFdmVudFR5cGUuREVWSUNFTU9USU9OKSB7XHJcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcihhY2NlbGVyYXRpb25MaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jYy5TeXN0ZW1FdmVudCA9IG1vZHVsZS5leHBvcnRzID0gU3lzdGVtRXZlbnQ7XHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIFN5c3RlbSBldmVudCBzaW5nbGV0b24gZm9yIGdsb2JhbCB1c2FnZVxyXG4gKiAhI3poIOezu+e7n+S6i+S7tuWNleS+i++8jOaWueS+v+WFqOWxgOS9v+eUqFxyXG4gKiBAcHJvcGVydHkgc3lzdGVtRXZlbnRcclxuICogQHR5cGUge1N5c3RlbUV2ZW50fVxyXG4gKi9cclxuY2Muc3lzdGVtRXZlbnQgPSBuZXcgY2MuU3lzdGVtRXZlbnQoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=