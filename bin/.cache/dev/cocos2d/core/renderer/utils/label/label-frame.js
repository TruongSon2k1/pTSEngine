
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/label-frame.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
 * !#en Class for Label Frame.
 * !#zh LabelFrame
 */
function LabelFrame() {
  // the location of the label on rendering texture
  this._rect = null; // uv data of frame

  this.uv = []; // texture of frame

  this._texture = null; // store original info before packed to dynamic atlas

  this._original = null;
}

LabelFrame.prototype = {
  constructor: LabelFrame,

  /**
  * !#en Returns the rect of the label frame in the texture.
  * !#zh 获取 LabelFrame 的纹理矩形区域
  * @method getRect
  * @return {Rect}
  */
  getRect: function getRect() {
    return cc.rect(this._rect);
  },

  /**
   * !#en Sets the rect of the label frame in the texture.
   * !#zh 设置 LabelFrame 的纹理矩形区域
   * @method setRect
   * @param {Rect} rect
   */
  setRect: function setRect(rect) {
    this._rect = rect;
    if (this._texture) this._calculateUV();
  },
  _setDynamicAtlasFrame: function _setDynamicAtlasFrame(frame) {
    if (!frame) return;
    this._original = {
      _texture: this._texture,
      _x: this._rect.x,
      _y: this._rect.y
    };
    this._texture = frame.texture;
    this._rect.x = frame.x;
    this._rect.y = frame.y;

    this._calculateUV();
  },
  _resetDynamicAtlasFrame: function _resetDynamicAtlasFrame() {
    if (!this._original) return;
    this._rect.x = this._original._x;
    this._rect.y = this._original._y;
    this._texture = this._original._texture;
    this._original = null;

    this._calculateUV();
  },
  _refreshTexture: function _refreshTexture(texture) {
    this._texture = texture;
    this._rect = cc.rect(0, 0, texture.width, texture.height);

    this._calculateUV();
  },
  _calculateUV: function _calculateUV() {
    var rect = this._rect,
        texture = this._texture,
        uv = this.uv,
        texw = texture.width,
        texh = texture.height;
    var l = texw === 0 ? 0 : rect.x / texw;
    var r = texw === 0 ? 0 : (rect.x + rect.width) / texw;
    var b = texh === 0 ? 0 : (rect.y + rect.height) / texh;
    var t = texh === 0 ? 0 : rect.y / texh;
    uv[0] = l;
    uv[1] = b;
    uv[2] = r;
    uv[3] = b;
    uv[4] = l;
    uv[5] = t;
    uv[6] = r;
    uv[7] = t;
  }
};
module.exports = LabelFrame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx1dGlsc1xcbGFiZWxcXGxhYmVsLWZyYW1lLmpzIl0sIm5hbWVzIjpbIkxhYmVsRnJhbWUiLCJfcmVjdCIsInV2IiwiX3RleHR1cmUiLCJfb3JpZ2luYWwiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImdldFJlY3QiLCJjYyIsInJlY3QiLCJzZXRSZWN0IiwiX2NhbGN1bGF0ZVVWIiwiX3NldER5bmFtaWNBdGxhc0ZyYW1lIiwiZnJhbWUiLCJfeCIsIngiLCJfeSIsInkiLCJ0ZXh0dXJlIiwiX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJfcmVmcmVzaFRleHR1cmUiLCJ3aWR0aCIsImhlaWdodCIsInRleHciLCJ0ZXhoIiwibCIsInIiLCJiIiwidCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxVQUFULEdBQXVCO0FBQ25CO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLElBQWIsQ0FGbUIsQ0FHbkI7O0FBQ0EsT0FBS0MsRUFBTCxHQUFVLEVBQVYsQ0FKbUIsQ0FLbkI7O0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixJQUFoQixDQU5tQixDQU9uQjs7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0g7O0FBRURKLFVBQVUsQ0FBQ0ssU0FBWCxHQUF1QjtBQUNuQkMsRUFBQUEsV0FBVyxFQUFFTixVQURNOztBQUdsQjtBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSU8sRUFBQUEsT0FBTyxFQUFFLG1CQUFZO0FBQ2pCLFdBQU9DLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRLEtBQUtSLEtB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QUFGLEdBQVF5QixDQUFSO0FBQ0F6QixJQUFBQSxFQUFFLENBQUMsQ0FBRCxDQUFGLEdBQVF1QixDQUFSO0FBQ0F2QixJQUFBQSxFQUFFLENBQUMsQ0FBRCxDQUFGLEdBQVEwQixDQUFSO0FBQ0ExQixJQUFBQSxFQUFFLENBQUMsQ0FBRCxDQUFGLEdBQVF3QixDQUFSO0FBQ0F4QixJQUFBQSxFQUFFLENBQUMsQ0FBRCxDQUFGLEdBQVEwQixDQUFSO0FBQ0g7QUExRWtCLENBQXZCO0FBNkVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBDbGFzcyBmb3IgTGFiZWwgRnJhbWUuXHJcbiAqICEjemggTGFiZWxGcmFtZVxyXG4gKi9cclxuZnVuY3Rpb24gTGFiZWxGcmFtZSAoKSB7XHJcbiAgICAvLyB0aGUgbG9jYXRpb24gb2YgdGhlIGxhYmVsIG9uIHJlbmRlcmluZyB0ZXh0dXJlXHJcbiAgICB0aGlzLl9yZWN0ID0gbnVsbDtcclxuICAgIC8vIHV2IGRhdGEgb2YgZnJhbWVcclxuICAgIHRoaXMudXYgPSBbXTtcclxuICAgIC8vIHRleHR1cmUgb2YgZnJhbWVcclxuICAgIHRoaXMuX3RleHR1cmUgPSBudWxsO1xyXG4gICAgLy8gc3RvcmUgb3JpZ2luYWwgaW5mbyBiZWZvcmUgcGFja2VkIHRvIGR5bmFtaWMgYXRsYXNcclxuICAgIHRoaXMuX29yaWdpbmFsID0gbnVsbDtcclxufVxyXG5cclxuTGFiZWxGcmFtZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTGFiZWxGcmFtZSxcclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHJlY3Qgb2YgdGhlIGxhYmVsIGZyYW1lIGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDojrflj5YgTGFiZWxGcmFtZSDnmoTnurnnkIbnn6nlvaLljLrln59cclxuICAgICAqIEBtZXRob2QgZ2V0UmVjdFxyXG4gICAgICogQHJldHVybiB7UmVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0UmVjdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5yZWN0KHRoaXMuX3JlY3QpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgdGhlIHJlY3Qgb2YgdGhlIGxhYmVsIGZyYW1lIGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDorr7nva4gTGFiZWxGcmFtZSDnmoTnurnnkIbnn6nlvaLljLrln59cclxuICAgICAqIEBtZXRob2Qgc2V0UmVjdFxyXG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0XHJcbiAgICAgKi9cclxuICAgIHNldFJlY3Q6IGZ1bmN0aW9uIChyZWN0KSB7XHJcbiAgICAgICAgdGhpcy5fcmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9zZXREeW5hbWljQXRsYXNGcmFtZSAoZnJhbWUpIHtcclxuICAgICAgICBpZiAoIWZyYW1lKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsID0ge1xyXG4gICAgICAgICAgICBfdGV4dHVyZSA6IHRoaXMuX3RleHR1cmUsXHJcbiAgICAgICAgICAgIF94IDogdGhpcy5fcmVjdC54LFxyXG4gICAgICAgICAgICBfeSA6IHRoaXMuX3JlY3QueVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gZnJhbWUudGV4dHVyZTtcclxuICAgICAgICB0aGlzLl9yZWN0LnggPSBmcmFtZS54O1xyXG4gICAgICAgIHRoaXMuX3JlY3QueSA9IGZyYW1lLnk7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcclxuICAgIH0sXHJcbiAgICBfcmVzZXREeW5hbWljQXRsYXNGcmFtZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3JlY3QueCA9IHRoaXMuX29yaWdpbmFsLl94O1xyXG4gICAgICAgIHRoaXMuX3JlY3QueSA9IHRoaXMuX29yaWdpbmFsLl95O1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0aGlzLl9vcmlnaW5hbC5fdGV4dHVyZTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlZnJlc2hUZXh0dXJlOiBmdW5jdGlvbiAodGV4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMuX3JlY3QgPSBjYy5yZWN0KDAsIDAsIHRleHR1cmUud2lkdGgsIHRleHR1cmUuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVVVigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2FsY3VsYXRlVVYoKSB7XHJcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0LFxyXG4gICAgICAgICAgICB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZSxcclxuICAgICAgICAgICAgdXYgPSB0aGlzLnV2LFxyXG4gICAgICAgICAgICB0ZXh3ID0gdGV4dHVyZS53aWR0aCxcclxuICAgICAgICAgICAgdGV4aCA9IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgbCA9IHRleHcgPT09IDAgPyAwIDogcmVjdC54IC8gdGV4dztcclxuICAgICAgICBsZXQgciA9IHRleHcgPT09IDAgPyAwIDogKHJlY3QueCArIHJlY3Qud2lkdGgpIC8gdGV4dztcclxuICAgICAgICBsZXQgYiA9IHRleGggPT09IDAgPyAwIDogKHJlY3QueSArIHJlY3QuaGVpZ2h0KSAvIHRleGg7XHJcbiAgICAgICAgbGV0IHQgPSB0ZXhoID09PSAwID8gMCA6IHJlY3QueSAvIHRleGg7XHJcblxyXG4gICAgICAgIHV2WzBdID0gbDtcclxuICAgICAgICB1dlsxXSA9IGI7XHJcbiAgICAgICAgdXZbMl0gPSByO1xyXG4gICAgICAgIHV2WzNdID0gYjtcclxuICAgICAgICB1dls0XSA9IGw7XHJcbiAgICAgICAgdXZbNV0gPSB0O1xyXG4gICAgICAgIHV2WzZdID0gcjtcclxuICAgICAgICB1dls3XSA9IHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWxGcmFtZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=