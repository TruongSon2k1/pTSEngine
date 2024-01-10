
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCScreen.js';
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
 * The fullscreen API provides an easy way for web content to be presented using the user's entire screen.
 * It's invalid on safari, QQbrowser and android browser
 * @class screen
 */
cc.screen =
/** @lends cc.screen# */
{
  _supportsFullScreen: false,
  _onfullscreenchange: null,
  _onfullscreenerror: null,
  // the pre fullscreenchange function
  _preOnFullScreenChange: null,
  _preOnFullScreenError: null,
  _preOnTouch: null,
  _touchEvent: "",
  _fn: null,
  // Function mapping for cross browser support
  _fnMap: [['requestFullscreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenEnabled', 'fullscreenElement', 'fullscreenerror'], ['requestFullScreen', 'exitFullScreen', 'fullScreenchange', 'fullScreenEnabled', 'fullScreenElement', 'fullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitIsFullScreen', 'webkitCurrentFullScreenElement', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreen', 'mozFullScreenElement', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'MSFullscreenChange', 'msFullscreenEnabled', 'msFullscreenElement', 'msfullscreenerror']],

  /**
   * initialize
   * @method init
   */
  init: function init() {
    this._fn = {};
    var i,
        l,
        val,
        map = this._fnMap,
        valL;

    for (i = 0, l = map.length; i < l; i++) {
      val = map[i];

      if (val && typeof document[val[1]] !== 'undefined') {
        for (i = 0, valL = val.length; i < valL; i++) {
          this._fn[map[0][i]] = val[i];
        }

        break;
      }
    }

    this._supportsFullScreen = this._fn.requestFullscreen !== undefined; // Bug fix only for v2.1, don't merge into v2.0
    // In v2.0, screen touchend events conflict with editBox touchend events if it's not stayOnTop.
    // While in v2.1, editBox always keep stayOnTop and it doesn't support touchend events.

    this._touchEvent = 'ontouchend' in window ? 'touchend' : 'mousedown';
  },

  /**
   * return true if it's full now.
   * @method fullScreen
   * @returns {Boolean}
   */
  fullScreen: function fullScreen() {
    if (!this._supportsFullScreen) return false;else if (!document[this._fn.fullscreenElement] && !document[this._fn.webkitFullscreenElement] && !document[this._fn.mozFullScreenElement]) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * change the screen to full mode.
   * @method requestFullScreen
   * @param {Element} element
   * @param {Function} onFullScreenChange
   * @param {Function} onFullScreenError
   */
  requestFullScreen: function requestFullScreen(element, onFullScreenChange, onFullScreenError) {
    if (element && element.tagName.toLowerCase() === "video") {
      if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && element.readyState > 0) {
        element.webkitEnterFullscreen && element.webkitEnterFullscreen();
        return;
      } else {
        element.setAttribute("x5-video-player-fullscreen", "true");
      }
    }

    if (!this._supportsFullScreen) {
      return;
    }

    element = element || document.documentElement;

    if (onFullScreenChange) {
      var eventName = this._fn.fullscreenchange;

      if (this._onfullscreenchange) {
        document.removeEventListener(eventName, this._onfullscreenchange);
      }

      this._onfullscreenchange = onFullScreenChange;
      document.addEventListener(eventName, onFullScreenChange, false);
    }

    if (onFullScreenError) {
      var _eventName = this._fn.fullscreenerror;

      if (this._onfullscreenerror) {
        document.removeEventListener(_eventName, this._onfullscreenerror);
      }

      this._onfullscreenerror = onFullScreenError;
      document.addEventListener(_eventName, onFullScreenError, {
        once: true
      });
    }

    var requestPromise = element[this._fn.requestFullscreen](); // the requestFullscreen API can only be initiated by user gesture.


    if (typeof document[this._fn.fullscreenerror] === 'undefined' && window.Promise && requestPromise instanceof Promise) {
      requestPromise["catch"](function (err) {// do nothing ... 
      });
    }
  },

  /**
   * exit the full mode.
   * @method exitFullScreen
   * @return {Boolean}
   */
  exitFullScreen: function exitFullScreen(element) {
    if (element && element.tagName.toLowerCase() === "video") {
      if (cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser) {
        element.webkitExitFullscreen && element.webkitExitFullscreen();
        return;
      } else {
        element.setAttribute("x5-video-player-fullscreen", "false");
      }
    }

    return this._supportsFullScreen ? document[this._fn.exitFullscreen]() : true;
  },

  /**
   * Automatically request full screen with a touch/click event
   * @method autoFullScreen
   * @param {Element} element
   * @param {Function} onFullScreenChange
   */
  autoFullScreen: function autoFullScreen(element, onFullScreenChange) {
    element = element || document.body;

    this._ensureFullScreen(element, onFullScreenChange);

    this.requestFullScreen(element, onFullScreenChange);
  },
  disableAutoFullScreen: function disableAutoFullScreen(element) {
    var touchTarget = cc.game.canvas || element;
    var touchEventName = this._touchEvent;

    if (this._preOnTouch) {
      touchTarget.removeEventListener(touchEventName, this._preOnTouch);
      this._preOnTouch = null;
    }
  },
  // Register touch event if request full screen failed
  _ensureFullScreen: function _ensureFullScreen(element, onFullScreenChange) {
    var self = this;
    var touchTarget = cc.game.canvas || element;
    var fullScreenErrorEventName = this._fn.fullscreenerror;
    var touchEventName = this._touchEvent;

    function onFullScreenError() {
      self._preOnFullScreenError = null; // handle touch event listener

      function onTouch() {
        self._preOnTouch = null;
        self.requestFullScreen(element, onFullScreenChange);
      }

      if (self._preOnTouch) {
        touchTarget.removeEventListener(touchEventName, self._preOnTouch);
      }

      self._preOnTouch = onTouch;
      touchTarget.addEventListener(touchEventName, self._preOnTouch, {
        once: true
      });
    } // handle full screen error


    if (this._preOnFullScreenError) {
      element.removeEventListener(fullScreenErrorEventName, this._preOnFullScreenError);
    }

    this._preOnFullScreenError = onFullScreenError;
    element.addEventListener(fullScreenErrorEventName, onFullScreenError, {
      once: true
    });
  }
};
cc.screen.init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ1NjcmVlbi5qcyJdLCJuYW1lcyI6WyJjYyIsInNjcmVlbiIsIl9zdXBwb3J0c0Z1bGxTY3JlZW4iLCJfb25mdWxsc2NyZWVuY2hhbmdlIiwiX29uZnVsbHNjcmVlbmVycm9yIiwiX3ByZU9uRnVsbFNjcmVlbkNoYW5nZSIsIl9wcmVPbkZ1bGxTY3JlZW5FcnJvciIsIl9wcmVPblRvdWNoIiwiX3RvdWNoRXZlbnQiLCJfZm4iLCJfZm5NYXAiLCJpbml0IiwiaSIsImwiLCJ2YWwiLCJtYXAiLCJ2YWxMIiwibGVuZ3RoIiwiZG9jdW1lbnQiLCJyZXF1ZXN0RnVsbHNjcmVlbiIsInVuZGVmaW5lZCIsIndpbmRvdyIsImZ1bGxTY3JlZW4iLCJmdWxsc2NyZWVuRWxlbWVudCIsIndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IiwibW96RnVsbFNjcmVlbkVsZW1lbnQiLCJyZXF1ZXN0RnVsbFNjcmVlbiIsImVsZW1lbnQiLCJvbkZ1bGxTY3JlZW5DaGFuZ2UiLCJvbkZ1bGxTY3JlZW5FcnJvciIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInN5cyIsIm9zIiwiT1NfSU9TIiwiaXNCcm93c2VyIiwicmVhZHlTdGF0ZSIsIndlYmtpdEVudGVyRnVsbHNjcmVlbiIsInNldEF0dHJpYnV0ZSIsImRvY3VtZW50RWxlbWVudCIsImV2ZW50TmFtZSIsImZ1bGxzY3JlZW5jaGFuZ2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZ1bGxzY3JlZW5lcnJvciIsIm9uY2UiLCJyZXF1ZXN0UHJvbWlzZSIsIlByb21pc2UiLCJlcnIiLCJleGl0RnVsbFNjcmVlbiIsIndlYmtpdEV4aXRGdWxsc2NyZWVuIiwiZXhpdEZ1bGxzY3JlZW4iLCJhdXRvRnVsbFNjcmVlbiIsImJvZHkiLCJfZW5zdXJlRnVsbFNjcmVlbiIsImRpc2FibGVBdXRvRnVsbFNjcmVlbiIsInRvdWNoVGFyZ2V0IiwiZ2FtZSIsImNhbnZhcyIsInRvdWNoRXZlbnROYW1lIiwic2VsZiIsImZ1bGxTY3JlZW5FcnJvckV2ZW50TmFtZSIsIm9uVG91Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxNQUFIO0FBQVk7QUFBd0I7QUFDaENDLEVBQUFBLG1CQUFtQixFQUFFLEtBRFc7QUFFaENDLEVBQUFBLG1CQUFtQixFQUFFLElBRlc7QUFHaENDLEVBQUFBLGtCQUFrQixFQUFFLElBSFk7QUFJaEM7QUFDQUMsRUFBQUEsc0JBQXNCLEVBQUUsSUFMUTtBQU1oQ0MsRUFBQUEscUJBQXFCLEVBQUUsSUFOUztBQU9oQ0MsRUFBQUEsV0FBVyxFQUFFLElBUG1CO0FBUWhDQyxFQUFBQSxXQUFXLEVBQUUsRUFSbUI7QUFTaENDLEVBQUFBLEdBQUcsRUFBRSxJQVQyQjtBQVVoQztBQUNBQyxFQUFBQSxNQUFNLEVBQUUsQ0FDSixDQUNJLG1CQURKLEVBRUksZ0JBRkosRUFHSSxrQkFISixFQUlJLG1CQUpKLEVBS0ksbUJBTEosRUFNSSxpQkFOSixDQURJLEVBU0osQ0FDSSxtQkFESixFQUVJLGdCQUZKLEVBR0ksa0JBSEosRUFJSSxtQkFKSixFQUtJLG1CQUxKLEVBTUksaUJBTkosQ0FUSSxFQWlCSixDQUNJLHlCQURKLEVBRUksd0JBRkosRUFHSSx3QkFISixFQUlJLG9CQUpKLEVBS0ksZ0NBTEosRUFNSSx1QkFOSixDQWpCSSxFQXlCSixDQUNJLHNCQURKLEVBRUkscUJBRkosRUFHSSxxQkFISixFQUlJLGVBSkosRUFLSSxzQkFMSixFQU1JLG9CQU5KLENBekJJLEVBaUNKLENBQ0kscUJBREosRUFFSSxrQkFGSixFQUdJ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QnVCLGlCQUE3QjtBQUNBRixJQUFBQSxPQUFPLENBQUNnQixnQkFBUixDQUF5QmtCLHdCQUF6QixFQUFtRGhDLGlCQUFuRCxFQUFzRTtBQUFFZ0IsTUFBQUEsSUFBSSxFQUFFO0FBQVIsS0FBdEU7QUFDSDtBQXJOK0IsQ0FBcEM7QUF1TkE3QyxFQUFFLENBQUNDLE1BQUgsQ0FBVVUsSUFBViIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG4gXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuIFxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiBcclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgZnVsbHNjcmVlbiBBUEkgcHJvdmlkZXMgYW4gZWFzeSB3YXkgZm9yIHdlYiBjb250ZW50IHRvIGJlIHByZXNlbnRlZCB1c2luZyB0aGUgdXNlcidzIGVudGlyZSBzY3JlZW4uXHJcbiAqIEl0J3MgaW52YWxpZCBvbiBzYWZhcmksIFFRYnJvd3NlciBhbmQgYW5kcm9pZCBicm93c2VyXHJcbiAqIEBjbGFzcyBzY3JlZW5cclxuICovXHJcbmNjLnNjcmVlbiA9IC8qKiBAbGVuZHMgY2Muc2NyZWVuIyAqL3tcclxuICAgIF9zdXBwb3J0c0Z1bGxTY3JlZW46IGZhbHNlLFxyXG4gICAgX29uZnVsbHNjcmVlbmNoYW5nZTogbnVsbCxcclxuICAgIF9vbmZ1bGxzY3JlZW5lcnJvcjogbnVsbCxcclxuICAgIC8vIHRoZSBwcmUgZnVsbHNjcmVlbmNoYW5nZSBmdW5jdGlvblxyXG4gICAgX3ByZU9uRnVsbFNjcmVlbkNoYW5nZTogbnVsbCxcclxuICAgIF9wcmVPbkZ1bGxTY3JlZW5FcnJvcjogbnVsbCxcclxuICAgIF9wcmVPblRvdWNoOiBudWxsLFxyXG4gICAgX3RvdWNoRXZlbnQ6IFwiXCIsXHJcbiAgICBfZm46IG51bGwsXHJcbiAgICAvLyBGdW5jdGlvbiBtYXBwaW5nIGZvciBjcm9zcyBicm93c2VyIHN1cHBvcnRcclxuICAgIF9mbk1hcDogW1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3JlcXVlc3RGdWxsc2NyZWVuJyxcclxuICAgICAgICAgICAgJ2V4aXRGdWxsc2NyZWVuJyxcclxuICAgICAgICAgICAgJ2Z1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICAnZnVsbHNjcmVlbkVuYWJsZWQnLFxyXG4gICAgICAgICAgICAnZnVsbHNjcmVlbkVsZW1lbnQnLFxyXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmVycm9yJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3JlcXVlc3RGdWxsU2NyZWVuJyxcclxuICAgICAgICAgICAgJ2V4aXRGdWxsU2NyZWVuJyxcclxuICAgICAgICAgICAgJ2Z1bGxTY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICAnZnVsbFNjcmVlbkVuYWJsZWQnLFxyXG4gICAgICAgICAgICAnZnVsbFNjcmVlbkVsZW1lbnQnLFxyXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmVycm9yJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ3dlYmtpdFJlcXVlc3RGdWxsU2NyZWVuJyxcclxuICAgICAgICAgICAgJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLFxyXG4gICAgICAgICAgICAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXHJcbiAgICAgICAgICAgICd3ZWJraXRJc0Z1bGxTY3JlZW4nLFxyXG4gICAgICAgICAgICAnd2Via2l0Q3VycmVudEZ1bGxTY3JlZW5FbGVtZW50JyxcclxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcicsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdtb3pSZXF1ZXN0RnVsbFNjcmVlbicsXHJcbiAgICAgICAgICAgICdtb3pDYW5jZWxGdWxsU2NyZWVuJyxcclxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxyXG4gICAgICAgICAgICAnbW96RnVsbFNjcmVlbicsXHJcbiAgICAgICAgICAgICdtb3pGdWxsU2NyZWVuRWxlbWVudCcsXHJcbiAgICAgICAgICAgICdtb3pmdWxsc2NyZWVuZXJyb3InLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnbXNSZXF1ZXN0RnVsbHNjcmVlbicsXHJcbiAgICAgICAgICAgICdtc0V4aXRGdWxsc2NyZWVuJyxcclxuICAgICAgICAgICAgJ01TRnVsbHNjcmVlbkNoYW5nZScsXHJcbiAgICAgICAgICAgICdtc0Z1bGxzY3JlZW5FbmFibGVkJyxcclxuICAgICAgICAgICAgJ21zRnVsbHNjcmVlbkVsZW1lbnQnLFxyXG4gICAgICAgICAgICAnbXNmdWxsc2NyZWVuZXJyb3InLFxyXG4gICAgICAgIF1cclxuICAgIF0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaW5pdGlhbGl6ZVxyXG4gICAgICogQG1ldGhvZCBpbml0XHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9mbiA9IHt9O1xyXG4gICAgICAgIHZhciBpLCBsLCB2YWwsIG1hcCA9IHRoaXMuX2ZuTWFwLCB2YWxMO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGwgPSBtYXAubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IG1hcFtpXTtcclxuICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIGRvY3VtZW50W3ZhbFsxXV0gIT09ICd1bmRlZmluZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgdmFsTCA9IHZhbC5sZW5ndGg7IGkgPCB2YWxMOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mblttYXBbMF1baV1dID0gdmFsW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N1cHBvcnRzRnVsbFNjcmVlbiA9ICh0aGlzLl9mbi5yZXF1ZXN0RnVsbHNjcmVlbiAhPT0gdW5kZWZpbmVkKTtcclxuXHJcbiAgICAgICAgLy8gQnVnIGZpeCBvbmx5IGZvciB2Mi4xLCBkb24ndCBtZXJnZSBpbnRvIHYyLjBcclxuICAgICAgICAvLyBJbiB2Mi4wLCBzY3JlZW4gdG91Y2hlbmQgZXZlbnRzIGNvbmZsaWN0IHdpdGggZWRpdEJveCB0b3VjaGVuZCBldmVudHMgaWYgaXQncyBub3Qgc3RheU9uVG9wLlxyXG4gICAgICAgIC8vIFdoaWxlIGluIHYyLjEsIGVkaXRCb3ggYWx3YXlzIGtlZXAgc3RheU9uVG9wIGFuZCBpdCBkb2Vzbid0IHN1cHBvcnQgdG91Y2hlbmQgZXZlbnRzLlxyXG4gICAgICAgIHRoaXMuX3RvdWNoRXZlbnQgPSAoJ29udG91Y2hlbmQnIGluIHdpbmRvdykgPyAndG91Y2hlbmQnIDogJ21vdXNlZG93bic7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0cnVlIGlmIGl0J3MgZnVsbCBub3cuXHJcbiAgICAgKiBAbWV0aG9kIGZ1bGxTY3JlZW5cclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBmdWxsU2NyZWVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdXBwb3J0c0Z1bGxTY3JlZW4pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBlbHNlIGlmICghZG9jdW1lbnRbdGhpcy5fZm4uZnVsbHNjcmVlbkVsZW1lbnRdICYmICFkb2N1bWVudFt0aGlzLl9mbi53ZWJraXRGdWxsc2NyZWVuRWxlbWVudF0gJiYgIWRvY3VtZW50W3RoaXMuX2ZuLm1vekZ1bGxTY3JlZW5FbGVtZW50XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIGNoYW5nZSB0aGUgc2NyZWVuIHRvIGZ1bGwgbW9kZS5cclxuICAgICAqIEBtZXRob2QgcmVxdWVzdEZ1bGxTY3JlZW5cclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZ1bGxTY3JlZW5FcnJvclxyXG4gICAgICovXHJcbiAgICByZXF1ZXN0RnVsbFNjcmVlbjogZnVuY3Rpb24gKGVsZW1lbnQsIG9uRnVsbFNjcmVlbkNoYW5nZSwgb25GdWxsU2NyZWVuRXJyb3IpIHtcclxuICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ2aWRlb1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MgJiYgY2Muc3lzLmlzQnJvd3NlciAmJiBlbGVtZW50LnJlYWR5U3RhdGUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LndlYmtpdEVudGVyRnVsbHNjcmVlbiAmJiBlbGVtZW50LndlYmtpdEVudGVyRnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4NS12aWRlby1wbGF5ZXItZnVsbHNjcmVlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fc3VwcG9ydHNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKG9uRnVsbFNjcmVlbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gdGhpcy5fZm4uZnVsbHNjcmVlbmNoYW5nZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX29uZnVsbHNjcmVlbmNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMuX29uZnVsbHNjcmVlbmNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fb25mdWxsc2NyZWVuY2hhbmdlID0gb25GdWxsU2NyZWVuQ2hhbmdlO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb25GdWxsU2NyZWVuQ2hhbmdlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbkZ1bGxTY3JlZW5FcnJvcikge1xyXG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gdGhpcy5fZm4uZnVsbHNjcmVlbmVycm9yO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb25mdWxsc2NyZWVuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB0aGlzLl9vbmZ1bGxzY3JlZW5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fb25mdWxsc2NyZWVuZXJyb3IgPSBvbkZ1bGxTY3JlZW5FcnJvcjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG9uRnVsbFNjcmVlbkVycm9yLCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVxdWVzdFByb21pc2UgPSBlbGVtZW50W3RoaXMuX2ZuLnJlcXVlc3RGdWxsc2NyZWVuXSgpO1xyXG4gICAgICAgIC8vIHRoZSByZXF1ZXN0RnVsbHNjcmVlbiBBUEkgY2FuIG9ubHkgYmUgaW5pdGlhdGVkIGJ5IHVzZXIgZ2VzdHVyZS5cclxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50W3RoaXMuX2ZuLmZ1bGxzY3JlZW5lcnJvcl0gPT09ICd1bmRlZmluZWQnIFxyXG4gICAgICAgICAgICAmJiB3aW5kb3cuUHJvbWlzZSAmJiByZXF1ZXN0UHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICAgICAgcmVxdWVzdFByb21pc2UuY2F0Y2goZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyAuLi4gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZXhpdCB0aGUgZnVsbCBtb2RlLlxyXG4gICAgICogQG1ldGhvZCBleGl0RnVsbFNjcmVlblxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZXhpdEZ1bGxTY3JlZW46IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidmlkZW9cIikge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4gJiYgZWxlbWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ4NS12aWRlby1wbGF5ZXItZnVsbHNjcmVlblwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdXBwb3J0c0Z1bGxTY3JlZW4gPyBkb2N1bWVudFt0aGlzLl9mbi5leGl0RnVsbHNjcmVlbl0oKSA6IHRydWU7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEF1dG9tYXRpY2FsbHkgcmVxdWVzdCBmdWxsIHNjcmVlbiB3aXRoIGEgdG91Y2gvY2xpY2sgZXZlbnRcclxuICAgICAqIEBtZXRob2QgYXV0b0Z1bGxTY3JlZW5cclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgKi9cclxuICAgIGF1dG9GdWxsU2NyZWVuOiBmdW5jdGlvbiAoZWxlbWVudCwgb25GdWxsU2NyZWVuQ2hhbmdlKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5zdXJlRnVsbFNjcmVlbihlbGVtZW50LCBvbkZ1bGxTY3JlZW5DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdEZ1bGxTY3JlZW4oZWxlbWVudCwgb25GdWxsU2NyZWVuQ2hhbmdlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZGlzYWJsZUF1dG9GdWxsU2NyZWVuIChlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHRvdWNoVGFyZ2V0ID0gY2MuZ2FtZS5jYW52YXMgfHwgZWxlbWVudDtcclxuICAgICAgICBsZXQgdG91Y2hFdmVudE5hbWUgPSB0aGlzLl90b3VjaEV2ZW50O1xyXG4gICAgICAgIGlmICh0aGlzLl9wcmVPblRvdWNoKSB7XHJcbiAgICAgICAgICAgIHRvdWNoVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudE5hbWUsIHRoaXMuX3ByZU9uVG91Y2gpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVPblRvdWNoID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFJlZ2lzdGVyIHRvdWNoIGV2ZW50IGlmIHJlcXVlc3QgZnVsbCBzY3JlZW4gZmFpbGVkXHJcbiAgICBfZW5zdXJlRnVsbFNjcmVlbiAoZWxlbWVudCwgb25GdWxsU2NyZWVuQ2hhbmdlKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0b3VjaFRhcmdldCA9IGNjLmdhbWUuY2FudmFzIHx8IGVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGZ1bGxTY3JlZW5FcnJvckV2ZW50TmFtZSA9IHRoaXMuX2ZuLmZ1bGxzY3JlZW5lcnJvcjtcclxuICAgICAgICBsZXQgdG91Y2hFdmVudE5hbWUgPSB0aGlzLl90b3VjaEV2ZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG9uRnVsbFNjcmVlbkVycm9yICgpIHtcclxuICAgICAgICAgICAgc2VsZi5fcHJlT25GdWxsU2NyZWVuRXJyb3IgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gaGFuZGxlIHRvdWNoIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uVG91Y2goKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9wcmVPblRvdWNoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVxdWVzdEZ1bGxTY3JlZW4oZWxlbWVudCwgb25GdWxsU2NyZWVuQ2hhbmdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5fcHJlT25Ub3VjaCkge1xyXG4gICAgICAgICAgICAgICAgdG91Y2hUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50TmFtZSwgc2VsZi5fcHJlT25Ub3VjaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5fcHJlT25Ub3VjaCA9IG9uVG91Y2g7XHJcbiAgICAgICAgICAgIHRvdWNoVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudE5hbWUsIHNlbGYuX3ByZU9uVG91Y2gsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhhbmRsZSBmdWxsIHNjcmVlbiBlcnJvclxyXG4gICAgICAgIGlmICh0aGlzLl9wcmVPbkZ1bGxTY3JlZW5FcnJvcikge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZnVsbFNjcmVlbkVycm9yRXZlbnROYW1lLCB0aGlzLl9wcmVPbkZ1bGxTY3JlZW5FcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZU9uRnVsbFNjcmVlbkVycm9yID0gb25GdWxsU2NyZWVuRXJyb3I7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGZ1bGxTY3JlZW5FcnJvckV2ZW50TmFtZSwgb25GdWxsU2NyZWVuRXJyb3IsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIH0sXHJcbn07XHJcbmNjLnNjcmVlbi5pbml0KCk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9