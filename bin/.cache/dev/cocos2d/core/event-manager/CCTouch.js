
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCTouch.js';
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

/**
 * !#en The touch event class
 * !#zh 封装了触摸相关的信息。
 * @class Touch
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} id
 */
cc.Touch = function (x, y, id) {
  this._lastModified = 0;
  this.setTouchInfo(id, x, y);
};

cc.Touch.prototype = {
  constructor: cc.Touch,

  /**
   * !#en Returns the current touch location in OpenGL coordinates.、
   * !#zh 获取当前触点位置。
   * @method getLocation
   * @return {Vec2}
   */
  getLocation: function getLocation() {
    return cc.v2(this._point.x, this._point.y);
  },

  /**
   * !#en Returns X axis location value.
      * !#zh 获取当前触点 X 轴位置。
      * @method getLocationX
   * @returns {Number}
   */
  getLocationX: function getLocationX() {
    return this._point.x;
  },

  /**
      * !#en Returns Y axis location value.
      * !#zh 获取当前触点 Y 轴位置。
      * @method getLocationY
   * @returns {Number}
   */
  getLocationY: function getLocationY() {
    return this._point.y;
  },

  /**
   * !#en Returns the previous touch location in OpenGL coordinates.
   * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
   * @method getPreviousLocation
   * @return {Vec2}
   */
  getPreviousLocation: function getPreviousLocation() {
    return cc.v2(this._prevPoint.x, this._prevPoint.y);
  },

  /**
   * !#en Returns the start touch location in OpenGL coordinates.
   * !#zh 获取触点落下时的位置对象，对象包含 x 和 y 属性。
   * @method getStartLocation
   * @returns {Vec2}
   */
  getStartLocation: function getStartLocation() {
    return cc.v2(this._startPoint.x, this._startPoint.y);
  },

  /**
   * !#en Returns the delta distance from the previous touche to the current one in screen coordinates.
   * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
   * @method getDelta
   * @return {Vec2}
   */
  getDelta: function getDelta() {
    return this._point.sub(this._prevPoint);
  },

  /**
   * !#en Returns the current touch location in screen coordinates.
   * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
   * @method getLocationInView
   * @return {Vec2}
   */
  getLocationInView: function getLocationInView() {
    return cc.v2(this._point.x, cc.view._designResolutionSize.height - this._point.y);
  },

  /**
   * !#en Returns the previous touch location in screen coordinates.
   * !#zh 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
   * @method getPreviousLocationInView
   * @return {Vec2}
   */
  getPreviousLocationInView: function getPreviousLocationInView() {
    return cc.v2(this._prevPoint.x, cc.view._designResolutionSize.height - this._prevPoint.y);
  },

  /**
   * !#en Returns the start touch location in screen coordinates.
   * !#zh 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
   * @method getStartLocationInView
   * @return {Vec2}
   */
  getStartLocationInView: function getStartLocationInView() {
    return cc.v2(this._startPoint.x, cc.view._designResolutionSize.height - this._startPoint.y);
  },

  /**
   * !#en Returns the id of cc.Touch.
   * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
   * @method getID
   * @return {Number}
   */
  getID: function getID() {
    return this._id;
  },

  /**
   * !#en Sets information to touch.
   * !#zh 设置触摸相关的信息。用于监控触摸事件。
   * @method setTouchInfo
   * @param {Number} id
   * @param  {Number} x
   * @param  {Number} y
   */
  setTouchInfo: function setTouchInfo(id, x, y) {
    this._prevPoint = this._point;
    this._point = cc.v2(x || 0, y || 0);
    this._id = id;

    if (!this._startPointCaptured) {
      this._startPoint = cc.v2(this._point);

      cc.view._convertPointWithScale(this._startPoint);

      this._startPointCaptured = true;
    }
  },
  _setPoint: function _setPoint(x, y) {
    if (y === undefined) {
      this._point.x = x.x;
      this._point.y = x.y;
    } else {
      this._point.x = x;
      this._point.y = y;
    }
  },
  _setPrevPoint: function _setPrevPoint(x, y) {
    if (y === undefined) this._prevPoint = cc.v2(x.x, x.y);else this._prevPoint = cc.v2(x || 0, y || 0);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50LW1hbmFnZXJcXENDVG91Y2guanMiXSwibmFtZXMiOlsiY2MiLCJUb3VjaCIsIngiLCJ5IiwiaWQiLCJfbGFzdE1vZGlmaWVkIiwic2V0VG91Y2hJbmZvIiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJnZXRMb2NhdGlvbiIsInYyIiwiX3BvaW50IiwiZ2V0TG9jYXRpb25YIiwiZ2V0TG9jYXRpb25ZIiwiZ2V0UHJldmlvdXNMb2NhdGlvbiIsIl9wcmV2UG9pbnQiLCJnZXRTdGFydExvY2F0aW9uIiwiX3N0YXJ0UG9pbnQiLCJnZXREZWx0YSIsInN1YiIsImdldExvY2F0aW9uSW5WaWV3IiwidmlldyIsIl9kZXNpZ25SZXNvbHV0aW9uU2l6ZSIsImhlaWdodCIsImdldFByZXZpb3VzTG9jYXRpb25JblZpZXciLCJnZXRTdGFydExvY2F0aW9uSW5WaWV3IiwiZ2V0SUQiLCJfaWQiLCJfc3RhcnRQb2ludENhcHR1cmVkIiwiX2NvbnZlcnRQb2ludFdpdGhTY2FsZSIsIl9zZXRQb2ludCIsInVuZGVmaW5lZCIsIl9zZXRQcmV2UG9pbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILEdBQVcsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCQyxFQUFoQixFQUFvQjtBQUMzQixPQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsT0FBS0MsWUFBTCxDQUFrQkYsRUFBbEIsRUFBc0JGLENBQXRCLEVBQXlCQyxDQUF6QjtBQUNILENBSEQ7O0FBSUFILEVBQUUs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ckIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgdG91Y2ggZXZlbnQgY2xhc3NcclxuICogISN6aCDlsIHoo4Xkuobop6bmkbjnm7jlhbPnmoTkv6Hmga/jgIJcclxuICogQGNsYXNzIFRvdWNoXHJcbiAqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZFxyXG4gKi9cclxuY2MuVG91Y2ggPSBmdW5jdGlvbiAoeCwgeSwgaWQpIHtcclxuICAgIHRoaXMuX2xhc3RNb2RpZmllZCA9IDA7XHJcbiAgICB0aGlzLnNldFRvdWNoSW5mbyhpZCwgeCwgeSk7XHJcbn07XHJcbmNjLlRvdWNoLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBjYy5Ub3VjaCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjdXJyZW50IHRvdWNoIGxvY2F0aW9uIGluIE9wZW5HTCBjb29yZGluYXRlcy7jgIFcclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6Kem54K55L2N572u44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uXHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxyXG4gICAgICovXHJcbiAgICBnZXRMb2NhdGlvbjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3BvaW50LngsIHRoaXMuX3BvaW50LnkpO1xyXG4gICAgfSxcclxuXHJcblx0LyoqXHJcblx0ICogISNlbiBSZXR1cm5zIFggYXhpcyBsb2NhdGlvbiB2YWx1ZS5cclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6Kem54K5IFgg6L205L2N572u44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uWFxyXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcblx0ICovXHJcblx0Z2V0TG9jYXRpb25YOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9pbnQueDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuICAgICAqICEjZW4gUmV0dXJucyBZIGF4aXMgbG9jYXRpb24gdmFsdWUuXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeinpueCuSBZIOi9tOS9jee9ruOAglxyXG4gICAgICogQG1ldGhvZCBnZXRMb2NhdGlvbllcclxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG5cdCAqL1xyXG5cdGdldExvY2F0aW9uWTogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BvaW50Lnk7XHJcblx0fSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgcHJldmlvdXMgdG91Y2ggbG9jYXRpb24gaW4gT3BlbkdMIGNvb3JkaW5hdGVzLlxyXG4gICAgICogISN6aCDojrflj5bop6bngrnlnKjkuIrkuIDmrKHkuovku7bml7bnmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0UHJldmlvdXNMb2NhdGlvblxyXG4gICAgICogQHJldHVybiB7VmVjMn1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJldmlvdXNMb2NhdGlvbjpmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3ByZXZQb2ludC54LCB0aGlzLl9wcmV2UG9pbnQueSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBzdGFydCB0b3VjaCBsb2NhdGlvbiBpbiBPcGVuR0wgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiAhI3poIOiOt+WPluinpueCueiQveS4i+aXtueahOS9jee9ruWvueixoe+8jOWvueixoeWMheWQqyB4IOWSjCB5IOWxnuaAp+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRTdGFydExvY2F0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7VmVjMn1cclxuICAgICAqL1xyXG4gICAgZ2V0U3RhcnRMb2NhdGlvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3N0YXJ0UG9pbnQueCwgdGhpcy5fc3RhcnRQb2ludC55KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGRlbHRhIGRpc3RhbmNlIGZyb20gdGhlIHByZXZpb3VzIHRvdWNoZSB0byB0aGUgY3VycmVudCBvbmUgaW4gc2NyZWVuIGNvb3JkaW5hdGVzLlxyXG4gICAgICogISN6aCDojrflj5bop6bngrnot53nprvkuIrkuIDmrKHkuovku7bnp7vliqjnmoTot53nprvlr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0RGVsdGFcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldERlbHRhOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnQuc3ViKHRoaXMuX3ByZXZQb2ludCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjdXJyZW50IHRvdWNoIGxvY2F0aW9uIGluIHNjcmVlbiBjb29yZGluYXRlcy5cclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN5LqL5Lu25Zyo5ri45oiP56qX5Y+j5YaF55qE5Z2Q5qCH5L2N572u5a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldExvY2F0aW9uSW5WaWV3XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxyXG4gICAgICovXHJcbiAgICBnZXRMb2NhdGlvbkluVmlldzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3BvaW50LngsIGNjLnZpZXcuX2Rlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCAtIHRoaXMuX3BvaW50LnkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgcHJldmlvdXMgdG91Y2ggbG9jYXRpb24gaW4gc2NyZWVuIGNvb3JkaW5hdGVzLlxyXG4gICAgICogISN6aCDojrflj5bop6bngrnlnKjkuIrkuIDmrKHkuovku7bml7blnKjmuLjmiI/nqpflj6PkuK3nmoTkvY3nva7lr7nosaHvvIzlr7nosaHljIXlkKsgeCDlkowgeSDlsZ7mgKfjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0UHJldmlvdXNMb2NhdGlvbkluVmlld1xyXG4gICAgICogQHJldHVybiB7VmVjMn1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJldmlvdXNMb2NhdGlvbkluVmlldzogZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5fcHJldlBvaW50LngsIGNjLnZpZXcuX2Rlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCAtIHRoaXMuX3ByZXZQb2ludC55KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHN0YXJ0IHRvdWNoIGxvY2F0aW9uIGluIHNjcmVlbiBjb29yZGluYXRlcy5cclxuICAgICAqICEjemgg6I635Y+W6Kem54K56JC95LiL5pe25Zyo5ri45oiP56qX5Y+j5Lit55qE5L2N572u5a+56LGh77yM5a+56LGh5YyF5ZCrIHgg5ZKMIHkg5bGe5oCn44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFN0YXJ0TG9jYXRpb25JblZpZXdcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldFN0YXJ0TG9jYXRpb25JblZpZXc6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3N0YXJ0UG9pbnQueCwgY2Mudmlldy5fZGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0IC0gdGhpcy5fc3RhcnRQb2ludC55KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGlkIG9mIGNjLlRvdWNoLlxyXG4gICAgICogISN6aCDop6bngrnnmoTmoIfor4YgSUTvvIzlj6/ku6XnlKjmnaXlnKjlpJrngrnop6bmkbjkuK3ot5/ouKrop6bngrnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0SURcclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0SUQ6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgaW5mb3JtYXRpb24gdG8gdG91Y2guXHJcbiAgICAgKiAhI3poIOiuvue9ruinpuaRuOebuOWFs+eahOS/oeaBr+OAgueUqOS6juebkeaOp+inpuaRuOS6i+S7tuOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUb3VjaEluZm9cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpZFxyXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB4XHJcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHlcclxuICAgICAqL1xyXG4gICAgc2V0VG91Y2hJbmZvOmZ1bmN0aW9uIChpZCwgeCwgeSkge1xyXG4gICAgICAgIHRoaXMuX3ByZXZQb2ludCA9IHRoaXMuX3BvaW50O1xyXG4gICAgICAgIHRoaXMuX3BvaW50ID0gY2MudjIoeCB8fCAwLCB5IHx8IDApO1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgaWYoIXRoaXMuX3N0YXJ0UG9pbnRDYXB0dXJlZCl7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBjYy52Mih0aGlzLl9wb2ludCk7XHJcbiAgICAgICAgICAgIGNjLnZpZXcuX2NvbnZlcnRQb2ludFdpdGhTY2FsZSh0aGlzLl9zdGFydFBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRQb2ludENhcHR1cmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zZXRQb2ludDogZnVuY3Rpb24oeCwgeSl7XHJcbiAgICAgICAgaWYoeSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgdGhpcy5fcG9pbnQueCA9IHgueDtcclxuICAgICAgICAgICAgdGhpcy5fcG9pbnQueSA9IHgueTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5fcG9pbnQueCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuX3BvaW50LnkgPSB5O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3NldFByZXZQb2ludDpmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgICAgIGlmKHkgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5fcHJldlBvaW50ID0gY2MudjIoeC54LCB4LnkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fcHJldlBvaW50ID0gY2MudjIoeCB8fCAwLCB5IHx8IDApO1xyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiLyJ9