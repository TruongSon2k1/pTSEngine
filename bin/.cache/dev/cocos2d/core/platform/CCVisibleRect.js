
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCVisibleRect.js';
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

/**
 * cc.visibleRect is a singleton object which defines the actual visible rect of the current view,
 * it should represent the same rect as cc.view.getViewportRect()
 *
 * @class visibleRect
 */
cc.visibleRect = {
  topLeft: cc.v2(0, 0),
  topRight: cc.v2(0, 0),
  top: cc.v2(0, 0),
  bottomLeft: cc.v2(0, 0),
  bottomRight: cc.v2(0, 0),
  bottom: cc.v2(0, 0),
  center: cc.v2(0, 0),
  left: cc.v2(0, 0),
  right: cc.v2(0, 0),
  width: 0,
  height: 0,

  /**
   * initialize
   * @static
   * @method init
   * @param {Rect} visibleRect
   */
  init: function init(visibleRect) {
    var w = this.width = visibleRect.width;
    var h = this.height = visibleRect.height;
    var l = visibleRect.x,
        b = visibleRect.y,
        t = b + h,
        r = l + w; //top

    this.topLeft.x = l;
    this.topLeft.y = t;
    this.topRight.x = r;
    this.topRight.y = t;
    this.top.x = l + w / 2;
    this.top.y = t; //bottom

    this.bottomLeft.x = l;
    this.bottomLeft.y = b;
    this.bottomRight.x = r;
    this.bottomRight.y = b;
    this.bottom.x = l + w / 2;
    this.bottom.y = b; //center

    this.center.x = l + w / 2;
    this.center.y = b + h / 2; //left

    this.left.x = l;
    this.left.y = b + h / 2; //right

    this.right.x = r;
    this.right.y = b + h / 2;
  }
};
/**
 * Top left coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} topLeft
 */

/**
 * Top right coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} topRight
 */

/**
 * Top center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} top
 */

/**
 * Bottom left coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottomLeft
 */

/**
 * Bottom right coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottomRight
 */

/**
 * Bottom center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottom
 */

/**
 * Center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} center
 */

/**
 * Left center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} left
 */

/**
 * Right center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} right
 */

/**
 * Width of the screen.
 * @static
 * @property {Number} width
 */

/**
 * Height of the screen.
 * @static
 * @property {Number} height
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ1Zpc2libGVSZWN0LmpzIl0sIm5hbWVzIjpbImNjIiwidmlzaWJsZVJlY3QiLCJ0b3BMZWZ0IiwidjIiLCJ0b3BSaWdodCIsInRvcCIsImJvdHRvbUxlZnQiLCJib3R0b21SaWdodCIsImJvdHRvbSIsImNlbnRlciIsImxlZnQiLCJyaWdodCIsIndpZHRoIiwiaGVpZ2h0IiwiaW5pdCIsInciLCJoIiwibCIsIngiLCJiIiwieSIsInQiLCJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxXQUFILEdBQWlCO0FBQ2JDLEVBQUFBLE9BQU8sRUFBQ0YsRUFBRSxDQUFDRyxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FESztBQUViQyxFQUFBQSxRQUFRLEVBQUNKLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFSLENBRkk7QUFHYkUsRUFBQUEsR0FBRyxFQUFDTCxFQUFFLENBQUNHLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUhTO0FBSWJHLEVBQUFBLFVBQVUsRUFBQ04sRUFBRSxDQUFDRyxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FKRTtBQUtiSSxFQUFBQSxXQUFXLEVBQUNQLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFSLENBTEM7QUFNYkssRUFBQUEsTUFBTSxFQUFDUixFQUFFLENBQUNHLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQU5NO0FBT2JNLEVBQUFBLE1BQU0sRUFBQ1QsRUFBRSxDQUFDRyxFQUFILENBQU0s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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIGNjLnZpc2libGVSZWN0IGlzIGEgc2luZ2xldG9uIG9iamVjdCB3aGljaCBkZWZpbmVzIHRoZSBhY3R1YWwgdmlzaWJsZSByZWN0IG9mIHRoZSBjdXJyZW50IHZpZXcsXHJcbiAqIGl0IHNob3VsZCByZXByZXNlbnQgdGhlIHNhbWUgcmVjdCBhcyBjYy52aWV3LmdldFZpZXdwb3J0UmVjdCgpXHJcbiAqXHJcbiAqIEBjbGFzcyB2aXNpYmxlUmVjdFxyXG4gKi9cclxuY2MudmlzaWJsZVJlY3QgPSB7XHJcbiAgICB0b3BMZWZ0OmNjLnYyKDAsMCksXHJcbiAgICB0b3BSaWdodDpjYy52MigwLDApLFxyXG4gICAgdG9wOmNjLnYyKDAsMCksXHJcbiAgICBib3R0b21MZWZ0OmNjLnYyKDAsMCksXHJcbiAgICBib3R0b21SaWdodDpjYy52MigwLDApLFxyXG4gICAgYm90dG9tOmNjLnYyKDAsMCksXHJcbiAgICBjZW50ZXI6Y2MudjIoMCwwKSxcclxuICAgIGxlZnQ6Y2MudjIoMCwwKSxcclxuICAgIHJpZ2h0OmNjLnYyKDAsMCksXHJcbiAgICB3aWR0aDowLFxyXG4gICAgaGVpZ2h0OjAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbml0aWFsaXplXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWV0aG9kIGluaXRcclxuICAgICAqIEBwYXJhbSB7UmVjdH0gdmlzaWJsZVJlY3RcclxuICAgICAqL1xyXG4gICAgaW5pdDpmdW5jdGlvbih2aXNpYmxlUmVjdCl7XHJcblxyXG4gICAgICAgIHZhciB3ID0gdGhpcy53aWR0aCA9IHZpc2libGVSZWN0LndpZHRoO1xyXG4gICAgICAgIHZhciBoID0gdGhpcy5oZWlnaHQgPSB2aXNpYmxlUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIGwgPSB2aXNpYmxlUmVjdC54LFxyXG4gICAgICAgICAgICBiID0gdmlzaWJsZVJlY3QueSxcclxuICAgICAgICAgICAgdCA9IGIgKyBoLFxyXG4gICAgICAgICAgICByID0gbCArIHc7XHJcblxyXG4gICAgICAgIC8vdG9wXHJcbiAgICAgICAgdGhpcy50b3BMZWZ0LnggPSBsO1xyXG4gICAgICAgIHRoaXMudG9wTGVmdC55ID0gdDtcclxuICAgICAgICB0aGlzLnRvcFJpZ2h0LnggPSByO1xyXG4gICAgICAgIHRoaXMudG9wUmlnaHQueSA9IHQ7XHJcbiAgICAgICAgdGhpcy50b3AueCA9IGwgKyB3LzI7XHJcbiAgICAgICAgdGhpcy50b3AueSA9IHQ7XHJcblxyXG4gICAgICAgIC8vYm90dG9tXHJcbiAgICAgICAgdGhpcy5ib3R0b21MZWZ0LnggPSBsO1xyXG4gICAgICAgIHRoaXMuYm90dG9tTGVmdC55ID0gYjtcclxuICAgICAgICB0aGlzLmJvdHRvbVJpZ2h0LnggPSByO1xyXG4gICAgICAgIHRoaXMuYm90dG9tUmlnaHQueSA9IGI7XHJcbiAgICAgICAgdGhpcy5ib3R0b20ueCA9IGwgKyB3LzI7XHJcbiAgICAgICAgdGhpcy5ib3R0b20ueSA9IGI7XHJcblxyXG4gICAgICAgIC8vY2VudGVyXHJcbiAgICAgICAgdGhpcy5jZW50ZXIueCA9IGwgKyB3LzI7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIueSA9IGIgKyBoLzI7XHJcblxyXG4gICAgICAgIC8vbGVmdFxyXG4gICAgICAgIHRoaXMubGVmdC54ID0gbDtcclxuICAgICAgICB0aGlzLmxlZnQueSA9IGIgKyBoLzI7XHJcblxyXG4gICAgICAgIC8vcmlnaHRcclxuICAgICAgICB0aGlzLnJpZ2h0LnggPSByO1xyXG4gICAgICAgIHRoaXMucmlnaHQueSA9IGIgKyBoLzI7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVG9wIGxlZnQgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3BlcnR5IHtWZWMyfSB0b3BMZWZ0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRvcCByaWdodCBjb29yZGluYXRlIG9mIHRoZSBzY3JlZW4gcmVsYXRlZCB0byB0aGUgZ2FtZSBzY2VuZS5cclxuICogQHN0YXRpY1xyXG4gKiBAcHJvcGVydHkge1ZlYzJ9IHRvcFJpZ2h0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRvcCBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3BlcnR5IHtWZWMyfSB0b3BcclxuICovXHJcblxyXG4vKipcclxuICogQm90dG9tIGxlZnQgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3BlcnR5IHtWZWMyfSBib3R0b21MZWZ0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEJvdHRvbSByaWdodCBjb29yZGluYXRlIG9mIHRoZSBzY3JlZW4gcmVsYXRlZCB0byB0aGUgZ2FtZSBzY2VuZS5cclxuICogQHN0YXRpY1xyXG4gKiBAcHJvcGVydHkge1ZlYzJ9IGJvdHRvbVJpZ2h0XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEJvdHRvbSBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3BlcnR5IHtWZWMyfSBib3R0b21cclxuICovXHJcblxyXG4vKipcclxuICogQ2VudGVyIGNvb3JkaW5hdGUgb2YgdGhlIHNjcmVlbiByZWxhdGVkIHRvIHRoZSBnYW1lIHNjZW5lLlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gY2VudGVyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIExlZnQgY2VudGVyIGNvb3JkaW5hdGUgb2YgdGhlIHNjcmVlbiByZWxhdGVkIHRvIHRoZSBnYW1lIHNjZW5lLlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gbGVmdFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSaWdodCBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3BlcnR5IHtWZWMyfSByaWdodFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXaWR0aCBvZiB0aGUgc2NyZWVuLlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBIZWlnaHQgb2YgdGhlIHNjcmVlbi5cclxuICogQHN0YXRpY1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XHJcbiAqL1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=