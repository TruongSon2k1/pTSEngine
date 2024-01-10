
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/playable.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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

var debug = require('../core/CCDebug');
/**
 * @class Playable
 *
 */


function Playable() {
  this._isPlaying = false;
  this._isPaused = false;
  this._stepOnce = false;
}

var prototype = Playable.prototype;
/**
 * !#en Is playing or paused in play mode?
 * !#zh 当前是否正在播放。
 * @property isPlaying
 * @type {boolean}
 * @default false
 * @readOnly
 */

js.get(prototype, 'isPlaying', function () {
  return this._isPlaying;
}, true);
/**
 * !#en Is currently paused? This can be true even if in edit mode(isPlaying == false).
 * !#zh 当前是否正在暂停
 * @property isPaused
 * @type {boolean}
 * @default false
 * @readOnly
 */

js.get(prototype, 'isPaused', function () {
  return this._isPaused;
}, true); // virtual

var virtual = function virtual() {};
/**
 * @method onPlay
 * @private
 */


prototype.onPlay = virtual;
/**
 * @method onPause
 * @private
 */

prototype.onPause = virtual;
/**
 * @method onResume
 * @private
 */

prototype.onResume = virtual;
/**
 * @method onStop
 * @private
 */

prototype.onStop = virtual;
/**
 * @method onError
 * @param {string} errorCode
 * @private
 */

prototype.onError = virtual; // public

/**
 * !#en Play this animation.
 * !#zh 播放动画。
 * @method play
 */

prototype.play = function () {
  if (this._isPlaying) {
    if (this._isPaused) {
      this._isPaused = false;
      this.onResume();
    } else {
      this.onError(debug.getError(3912));
    }
  } else {
    this._isPlaying = true;
    this.onPlay();
  }
};
/**
 * !#en Stop this animation.
 * !#zh 停止动画播放。
 * @method stop
 */


prototype.stop = function () {
  if (this._isPlaying) {
    this._isPlaying = false;
    this.onStop(); // need reset pause flag after onStop

    this._isPaused = false;
  }
};
/**
 * !#en Pause this animation.
 * !#zh 暂停动画。
 * @method pause
 */


prototype.pause = function () {
  if (this._isPlaying && !this._isPaused) {
    this._isPaused = true;
    this.onPause();
  }
};
/**
 * !#en Resume this animation.
 * !#zh 重新播放动画。
 * @method resume
 */


prototype.resume = function () {
  if (this._isPlaying && this._isPaused) {
    this._isPaused = false;
    this.onResume();
  }
};
/**
 * !#en Perform a single frame step.
 * !#zh 执行一帧动画。
 * @method step
 */


prototype.step = function () {
  this.pause();
  this._stepOnce = true;

  if (!this._isPlaying) {
    this.play();
  }
};

module.exports = Playable;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxccGxheWFibGUuanMiXSwibmFtZXMiOlsianMiLCJjYyIsImRlYnVnIiwicmVxdWlyZSIsIlBsYXlhYmxlIiwiX2lzUGxheWluZyIsIl9pc1BhdXNlZCIsIl9zdGVwT25jZSIsInByb3RvdHlwZSIsImdldCIsInZpcnR1YWwiLCJvblBsYXkiLCJvblBhdXNlIiwib25SZXN1bWUiLCJvblN0b3AiLCJvbkVycm9yIiwicGxheSIsImdldEVycm9yIiwic3RvcCIsInBhdXNlIiwicmVzdW1lIiwic3RlcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxFQUFFLEdBQUdDLEVBQUUsQ0FBQ0QsRUFBWjs7QUFDQSxJQUFNRSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxpQkFBRCxDQUFyQjtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxTQUFTQyxRQUFULEdBQXFCO0FBQ2pCLE9BQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNIOztBQUVELElBQUlDLFNBQVMsR0FBR0osUUFBUSxDQUFDSSxTQUF6QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FSLEVBQUUsQ0FBQ1MsR0FBSCxDQUFPRCxTQUFQLEVBQWtCLFdBQWxCLEVBQStCLFlBQVk7QUFDdkMsU0FBTyxLQUFLSCxVQUFaO0FBQ0gsQ0FGRCxFQUVHLElBRkg7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBTCxFQUFFLENBQUNTLEdBQUgsQ0FBT0QsU0FBUCxFQUFrQixVQUFsQixFQUE4QixZQUFZO0FBQ3RDLFNBQU8sS0FBS0YsU0FBWjtBQUNILENBRkQsRUFFRyxJQUZILEdBSUE7O0FBRUEsSUFBSUksT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWSxDQUFFLENBQTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBRixTQUFTLENBQUNHLE1BQVYsR0FBbUJELE9BQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FGLFNBQVMsQ0FBQ0ksT0FBVixHQUFvQkYsT0FBcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUYsU0FBUyxDQUFDSyxRQUFWLEdBQXFCSCxPQUFyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBRixTQUFTLENBQUNNLE1BQVYsR0FBbUJKLE9BQW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUYsU0FBUyxDQUFDTyxPQUFWLEdBQW9CTCxPQUFwQixFQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FGLFNBQVMsQ0FBQ1EsSUFBVixHQUFpQixZQUFZO0FBQ3pCLE1BQUksS0FBS1gsVUFBVCxFQUFxQjtBQUNqQixRQUFJLEtBQUtDLFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtPLFFBQUw7QUFDSCxLQUhELE1BSUs7QUFDRCxXQUFLRSxPQUFMLENBQWFiLEtBQUssQ0FBQ2UsUUFBTixDQUFlLElBQWYsQ0FBYjtBQUNIO0FBQ0osR0FSRCxNQVNLO0FBQ0QsU0FBS1osVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtNLE1BQUw7QUFDSDtBQUNKLENBZEQ7QUFnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FILFNBQVMsQ0FBQ1UsSUFBVixHQUFpQixZQUFZO0FBQ3pCLE1BQUksS0FBS2IsVUFBVCxFQUFxQjtBQUNqQixTQUFLQSxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBS1MsTUFBTCxHQUZpQixDQUlqQjs7QUFDQSxTQUFLUixTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSixDQVJEO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FFLFNBQVMsQ0FBQ1csS0FBVixHQUFrQixZQUFZO0FBQzFCLE1BQUksS0FBS2QsVUFBTCxJQUFtQixDQUFDLEtBQUtDLFNBQTdCLEVBQXdDO0FBQ3BDLFNBQUtBLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLTSxPQUFMO0FBQ0g7QUFDSixDQUxEO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FKLFNBQVMsQ0FBQ1ksTUFBVixHQUFtQixZQUFZO0FBQzNCLE1BQUksS0FBS2YsVUFBTCxJQUFtQixLQUFLQyxTQUE1QixFQUF1QztBQUNuQyxTQUFLQSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS08sUUFBTDtBQUNIO0FBQ0osQ0FMRDtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBTCxTQUFTLENBQUNhLElBQVYsR0FBaUIsWUFBWTtBQUN6QixPQUFLRixLQUFMO0FBQ0EsT0FBS1osU0FBTCxHQUFpQixJQUFqQjs7QUFDQSxNQUFJLENBQUMsS0FBS0YsVUFBVixFQUFzQjtBQUNsQixTQUFLVyxJQUFMO0FBQ0g7QUFDSixDQU5EOztBQVFBTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJuQixRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIGpzID0gY2MuanM7XHJcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vY29yZS9DQ0RlYnVnJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIFBsYXlhYmxlXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBQbGF5YWJsZSAoKSB7XHJcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9zdGVwT25jZSA9IGZhbHNlO1xyXG59XHJcblxyXG52YXIgcHJvdG90eXBlID0gUGxheWFibGUucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gSXMgcGxheWluZyBvciBwYXVzZWQgaW4gcGxheSBtb2RlP1xyXG4gKiAhI3poIOW9k+WJjeaYr+WQpuato+WcqOaSreaUvuOAglxyXG4gKiBAcHJvcGVydHkgaXNQbGF5aW5nXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKiBAZGVmYXVsdCBmYWxzZVxyXG4gKiBAcmVhZE9ubHlcclxuICovXHJcbmpzLmdldChwcm90b3R5cGUsICdpc1BsYXlpbmcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xyXG59LCB0cnVlKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIElzIGN1cnJlbnRseSBwYXVzZWQ/IFRoaXMgY2FuIGJlIHRydWUgZXZlbiBpZiBpbiBlZGl0IG1vZGUoaXNQbGF5aW5nID09IGZhbHNlKS5cclxuICogISN6aCDlvZPliY3mmK/lkKbmraPlnKjmmoLlgZxcclxuICogQHByb3BlcnR5IGlzUGF1c2VkXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKiBAZGVmYXVsdCBmYWxzZVxyXG4gKiBAcmVhZE9ubHlcclxuICovXHJcbmpzLmdldChwcm90b3R5cGUsICdpc1BhdXNlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1BhdXNlZDtcclxufSwgdHJ1ZSk7XHJcblxyXG4vLyB2aXJ0dWFsXHJcblxyXG52YXIgdmlydHVhbCA9IGZ1bmN0aW9uICgpIHt9O1xyXG4vKipcclxuICogQG1ldGhvZCBvblBsYXlcclxuICogQHByaXZhdGVcclxuICovXHJcbnByb3RvdHlwZS5vblBsYXkgPSB2aXJ0dWFsO1xyXG4vKipcclxuICogQG1ldGhvZCBvblBhdXNlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5wcm90b3R5cGUub25QYXVzZSA9IHZpcnR1YWw7XHJcbi8qKlxyXG4gKiBAbWV0aG9kIG9uUmVzdW1lXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5wcm90b3R5cGUub25SZXN1bWUgPSB2aXJ0dWFsO1xyXG4vKipcclxuICogQG1ldGhvZCBvblN0b3BcclxuICogQHByaXZhdGVcclxuICovXHJcbnByb3RvdHlwZS5vblN0b3AgPSB2aXJ0dWFsO1xyXG4vKipcclxuICogQG1ldGhvZCBvbkVycm9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlcnJvckNvZGVcclxuICogQHByaXZhdGVcclxuICovXHJcbnByb3RvdHlwZS5vbkVycm9yID0gdmlydHVhbDtcclxuXHJcbi8vIHB1YmxpY1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUGxheSB0aGlzIGFuaW1hdGlvbi5cclxuICogISN6aCDmkq3mlL7liqjnlLvjgIJcclxuICogQG1ldGhvZCBwbGF5XHJcbiAqL1xyXG5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vblJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGRlYnVnLmdldEVycm9yKDM5MTIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25QbGF5KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBTdG9wIHRoaXMgYW5pbWF0aW9uLlxyXG4gKiAhI3poIOWBnOatouWKqOeUu+aSreaUvuOAglxyXG4gKiBAbWV0aG9kIHN0b3BcclxuICovXHJcbnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25TdG9wKCk7XHJcblxyXG4gICAgICAgIC8vIG5lZWQgcmVzZXQgcGF1c2UgZmxhZyBhZnRlciBvblN0b3BcclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUGF1c2UgdGhpcyBhbmltYXRpb24uXHJcbiAqICEjemgg5pqC5YGc5Yqo55S744CCXHJcbiAqIEBtZXRob2QgcGF1c2VcclxuICovXHJcbnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XHJcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25QYXVzZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmVzdW1lIHRoaXMgYW5pbWF0aW9uLlxyXG4gKiAhI3poIOmHjeaWsOaSreaUvuWKqOeUu+OAglxyXG4gKiBAbWV0aG9kIHJlc3VtZVxyXG4gKi9cclxucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgJiYgdGhpcy5faXNQYXVzZWQpIHtcclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25SZXN1bWUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFBlcmZvcm0gYSBzaW5nbGUgZnJhbWUgc3RlcC5cclxuICogISN6aCDmiafooYzkuIDluKfliqjnlLvjgIJcclxuICogQG1ldGhvZCBzdGVwXHJcbiAqL1xyXG5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucGF1c2UoKTtcclxuICAgIHRoaXMuX3N0ZXBPbmNlID0gdHJ1ZTtcclxuICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXlhYmxlO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==