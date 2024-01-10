
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSpriteAtlas.js';
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
 * !#en Class for sprite atlas handling.
 * !#zh 精灵图集资源类。
 * @class SpriteAtlas
 * @extends Asset
 */
var SpriteAtlas = cc.Class({
  name: 'cc.SpriteAtlas',
  "extends": cc.Asset,
  properties: {
    _spriteFrames: {
      "default": {}
    }
  },

  /**
   * Returns the texture of the sprite atlas
   * @method getTexture
   * @returns {Texture2D}
   */
  getTexture: function getTexture() {
    var keys = Object.keys(this._spriteFrames);

    if (keys.length > 0) {
      var spriteFrame = this._spriteFrames[keys[0]];
      return spriteFrame ? spriteFrame.getTexture() : null;
    } else {
      return null;
    }
  },

  /**
   * Returns the sprite frame correspond to the given key in sprite atlas.
   * @method getSpriteFrame
   * @param {String} key
   * @returns {SpriteFrame}
   */
  getSpriteFrame: function getSpriteFrame(key) {
    var sf = this._spriteFrames[key];

    if (!sf) {
      return null;
    }

    if (!sf.name) {
      sf.name = key;
    }

    return sf;
  },

  /**
   * Returns the sprite frames in sprite atlas.
   * @method getSpriteFrames
   * @returns {[SpriteFrame]}
   */
  getSpriteFrames: function getSpriteFrames() {
    var frames = [];
    var spriteFrames = this._spriteFrames;

    for (var key in spriteFrames) {
      frames.push(this.getSpriteFrame(key));
    }

    return frames;
  }
});
cc.SpriteAtlas = SpriteAtlas;
module.exports = SpriteAtlas;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NTcHJpdGVBdGxhcy5qcyJdLCJuYW1lcyI6WyJTcHJpdGVBdGxhcyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJwcm9wZXJ0aWVzIiwiX3Nwcml0ZUZyYW1lcyIsImdldFRleHR1cmUiLCJrZXlzIiwiT2JqZWN0IiwibGVuZ3RoIiwic3ByaXRlRnJhbWUiLCJnZXRTcHJpdGVGcmFtZSIsImtleSIsInNmIiwiZ2V0U3ByaXRlRnJhbWVzIiwiZnJhbWVzIiwic3ByaXRlRnJhbWVzIiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxXQUFXLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBRGlCO0FBRXZCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGVztBQUd2QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGFBQWEsRUFBRTtBQUNYLGlCQUFTO0FBREU7QUFEUCxHQUhXOztBQVN2QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixRQUFJQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZLEtBQUtGLGFBQWpCLENBQVg7O0FBQ0EsUUFBSUUsSUFBSSxDQUFDRSxNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakIsVUFBSUMsV0FBVyxHQUFHLEtBQUtMLGFBQUwsQ0FBbUJFLElBQUksQ0FBQyxDQUFELENBQXZCLENBQWxCO0FBQ0EsYUFBT0csV0FBVyxHQUFHQSxXQUFXLENBQUNKLFVBQVosRUFBSCxHQUE4QixJQUFoRDtBQUNILEtBSEQsTUFJSztBQUNELGFBQU8sSUFBUDtBQUNIO0FBQ0osR0F2QnNCOztBQXlCdkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lLLEVBQUFBLGNBQWMsRUFBRSx3QkFBVUMsR0FBVixFQUFlO0FBQzNCLFFBQUlDLEVBQUUsR0FBRyxLQUFLUixhQUFMLENBQW1CTyxHQUFuQixDQUFUOztBQUNBLFFBQUksQ0FBQ0MsRUFBTCxFQUFTO0FBQ0wsYUFBTyxJQUFQO0FBQ0g7O0FBQ0QsUUFBSSxDQUFDQSxFQUFFLENBQUNYLElBQVIsRUFBYztBQUNWVyxNQUFBQSxFQUFFLENBQUNYLElBQUgsR0FBVVUsR0FBVjtBQUNIOztBQUNELFdBQU9DLEVBQVA7QUFDSCxHQXhDc0I7O0FBMEN2QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBLFFBQUlDLFlBQVksR0FBRyxLQUFLWCxhQUF4Qjs7QUFFQSxTQUFLLElBQUlPLEdBQVQsSUFBZ0JJLFlBQWhCLEVBQThCO0FBQzFCRCxNQUFBQSxNQUFNLENBQUNFLElBQVAsQ0FBWSxLQUFLTixjQUFMLENBQW9CQyxHQUFwQixDQUFaO0FBQ0g7O0FBRUQsV0FBT0csTUFBUDtBQUNIO0FBeERzQixDQUFULENBQWxCO0FBMkRBZixFQUFFLENBQUNELFdBQUgsR0FBaUJBLFdBQWpCO0FBQ0FtQixNQUFNLENBQUNDLE9BQVAsR0FBa0JwQixXQUFsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIENsYXNzIGZvciBzcHJpdGUgYXRsYXMgaGFuZGxpbmcuXHJcbiAqICEjemgg57K+54G15Zu+6ZuG6LWE5rqQ57G744CCXHJcbiAqIEBjbGFzcyBTcHJpdGVBdGxhc1xyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKi9cclxudmFyIFNwcml0ZUF0bGFzID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlNwcml0ZUF0bGFzJyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9zcHJpdGVGcmFtZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDoge31cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHRleHR1cmUgb2YgdGhlIHNwcml0ZSBhdGxhc1xyXG4gICAgICogQG1ldGhvZCBnZXRUZXh0dXJlXHJcbiAgICAgKiBAcmV0dXJucyB7VGV4dHVyZTJEfVxyXG4gICAgICovXHJcbiAgICBnZXRUZXh0dXJlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9zcHJpdGVGcmFtZXMpO1xyXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwcml0ZUZyYW1lID0gdGhpcy5fc3ByaXRlRnJhbWVzW2tleXNbMF1dO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ByaXRlRnJhbWUgPyBzcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNwcml0ZSBmcmFtZSBjb3JyZXNwb25kIHRvIHRoZSBnaXZlbiBrZXkgaW4gc3ByaXRlIGF0bGFzLlxyXG4gICAgICogQG1ldGhvZCBnZXRTcHJpdGVGcmFtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxyXG4gICAgICogQHJldHVybnMge1Nwcml0ZUZyYW1lfVxyXG4gICAgICovXHJcbiAgICBnZXRTcHJpdGVGcmFtZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIGxldCBzZiA9IHRoaXMuX3Nwcml0ZUZyYW1lc1trZXldO1xyXG4gICAgICAgIGlmICghc2YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBpZiAoIXNmLm5hbWUpIHtcclxuICAgICAgICAgICAgc2YubmFtZSA9IGtleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNmO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNwcml0ZSBmcmFtZXMgaW4gc3ByaXRlIGF0bGFzLlxyXG4gICAgICogQG1ldGhvZCBnZXRTcHJpdGVGcmFtZXNcclxuICAgICAqIEByZXR1cm5zIHtbU3ByaXRlRnJhbWVdfVxyXG4gICAgICovXHJcbiAgICBnZXRTcHJpdGVGcmFtZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZnJhbWVzID0gW107XHJcbiAgICAgICAgdmFyIHNwcml0ZUZyYW1lcyA9IHRoaXMuX3Nwcml0ZUZyYW1lcztcclxuXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNwcml0ZUZyYW1lcykge1xyXG4gICAgICAgICAgICBmcmFtZXMucHVzaCh0aGlzLmdldFNwcml0ZUZyYW1lKGtleSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZyYW1lcztcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5TcHJpdGVBdGxhcyA9IFNwcml0ZUF0bGFzO1xyXG5tb2R1bGUuZXhwb3J0cyA9ICBTcHJpdGVBdGxhcztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=