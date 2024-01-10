
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/texture-util.js';
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
var Texture2D = require('../assets/CCTexture2D');

var textureUtil = {
  loadImage: function loadImage(url, cb, target) {
    cc.assertID(url, 3103);
    var tex = cc.assetManager.assets.get(url);

    if (tex) {
      if (tex.loaded) {
        cb && cb.call(target, null, tex);
        return tex;
      } else {
        tex.once("load", function () {
          cb && cb.call(target, null, tex);
        }, target);
        return tex;
      }
    } else {
      cc.assetManager.loadRemote(url, function (err, texture) {
        cb && cb.call(target, err, texture);
      });
    }
  },
  cacheImage: function cacheImage(url, image) {
    if (url && image) {
      var tex = new Texture2D();
      tex.initWithElement(image);
      cc.assetManager.assets.add(url, tex);
      return tex;
    }
  },
  postLoadTexture: function postLoadTexture(texture, callback) {
    if (texture.loaded) {
      callback && callback();
      return;
    }

    if (!texture.nativeUrl) {
      callback && callback();
      return;
    } // load image


    cc.assetManager.postLoadNative(texture, callback);
  }
};
module.exports = textureUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFx0ZXh0dXJlLXV0aWwuanMiXSwibmFtZXMiOlsiVGV4dHVyZTJEIiwicmVxdWlyZSIsInRleHR1cmVVdGlsIiwibG9hZEltYWdlIiwidXJsIiwiY2IiLCJ0YXJnZXQiLCJjYyIsImFzc2VydElEIiwidGV4IiwiYXNzZXRNYW5hZ2VyIiwiYXNzZXRzIiwiZ2V0IiwibG9hZGVkIiwiY2FsbCIsIm9uY2UiLCJsb2FkUmVtb3RlIiwiZXJyIiwidGV4dHVyZSIsImNhY2hlSW1hZ2UiLCJpbWFnZSIsImluaXRXaXRoRWxlbWVudCIsImFkZCIsInBvc3RMb2FkVGV4dHVyZSIsImNhbGxiYWNrIiwibmF0aXZlVXJsIiwicG9zdExvYWROYXRpdmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUF6Qjs7QUFFQSxJQUFJQyxXQUFXLEdBQUc7QUFDZEMsRUFBQUEsU0FEYyxxQkFDSEMsR0FERyxFQUNFQyxFQURGLEVBQ01DLE1BRE4sRUFDYztBQUN4QkMsSUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlKLEdBQVosRUFBaUIsSUFBakI7QUFFQSxRQUFJSyxHQUFHLEdBQUdGLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQkMsTUFBaEIsQ0FBdUJDLEdBQXZCLENBQTJCUixHQUEzQixDQUFWOztBQUNBLFFBQUlLLEdBQUosRUFBUztBQUNMLFVBQUlBLEdBQUcsQ0FBQ0ksTUFBUixFQUFnQjtBQUNaUixRQUFBQSxFQUFFLElBQUlBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRUixNQUFSLEVBQWdCLElBQWhCLEVBQXNCRyxHQUF0QixDQUFOO0FBQ0EsZUFBT0EsR0FBUDtBQUNILE9BSEQsTUFLQTtBQUNJQSxRQUFBQSxHQUFHLENBQUNNLElBQUosQ0FBUyxNQUFULEVBQWlCLFlBQVU7QUFDeEJWLFVBQUFBLEVBQUUsSUFBSUEsRUFBRSxDQUFDUyxJQUFILENBQVFSLE1BQVIsRUFBZ0IsSUFBaEIsRUFBc0JHLEdBQXRCLENBQU47QUFDRixTQUZELEVBRUdILE1BRkg7QUFHQSxlQUFPRyxHQUFQO0FBQ0g7QUFDSixLQVpELE1BYUs7QUFDREYsTUFBQUEsRUFBRSxDQUFDRyxZQUFILENBQWdCTSxVQUFoQixDQUEyQlosR0FBM0IsRUFBZ0MsVUFBVWEsR0FBVixFQUFlQyxPQUFmLEVBQXdCO0FBQ3BEYixRQUFBQSxFQUFFLElBQUlBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRUixNQUFSLEVBQWdCVyxHQUFoQixFQUFxQkMsT0FBckIsQ0FBTjtBQUNILE9BRkQ7QUFHSDtBQUNKLEdBdkJhO0FBeUJkQyxFQUFBQSxVQXpCYyxzQkF5QkZmLEdBekJFLEVBeUJHZ0IsS0F6QkgsRUF5QlU7QUFDcEIsUUFBSWhCLEdBQUcsSUFBSWdCLEtBQVgsRUFBa0I7QUFDZCxVQUFJWCxHQUFHLEdBQUcsSUFBSVQsU0FBSixFQUFWO0FBQ0FTLE1BQUFBLEdBQUcsQ0FBQ1ksZUFBSixDQUFvQkQsS0FBcEI7QUFDQWIsTUFBQUEsRUFBRSxDQUFDRyxZQUFILENBQWdCQyxNQUFoQixDQUF1QlcsR0FBdkIsQ0FBMkJsQixHQUEzQixFQUFnQ0ssR0FBaEM7QUFDQSxhQUFPQSxHQUFQO0FBQ0g7QUFDSixHQWhDYTtBQWtDZGMsRUFBQUEsZUFsQ2MsMkJBa0NHTCxPQWxDSCxFQWtDWU0sUUFsQ1osRUFrQ3NCO0FBQ2hDLFFBQUlOLE9BQU8sQ0FBQ0wsTUFBWixFQUFvQjtBQUNoQlcsTUFBQUEsUUFBUSxJQUFJQSxRQUFRLEVBQXBCO0FBQ0E7QUFDSDs7QUFDRCxRQUFJLENBQUNOLE9BQU8sQ0FBQ08sU0FBYixFQUF3QjtBQUNwQkQsTUFBQUEsUUFBUSxJQUFJQSxRQUFRLEVBQXBCO0FBQ0E7QUFDSCxLQVIrQixDQVNoQzs7O0FBQ0FqQixJQUFBQSxFQUFFLENBQUNHLFlBQUgsQ0FBZ0JnQixjQUFoQixDQUErQlIsT0FBL0IsRUFBd0NNLFFBQXhDO0FBQ0g7QUE3Q2EsQ0FBbEI7QUFnREFHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjFCLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBUZXh0dXJlMkQgPSByZXF1aXJlKCcuLi9hc3NldHMvQ0NUZXh0dXJlMkQnKTtcclxuXHJcbmxldCB0ZXh0dXJlVXRpbCA9IHtcclxuICAgIGxvYWRJbWFnZSAodXJsLCBjYiwgdGFyZ2V0KSB7XHJcbiAgICAgICAgY2MuYXNzZXJ0SUQodXJsLCAzMTAzKTtcclxuXHJcbiAgICAgICAgdmFyIHRleCA9IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KHVybCk7XHJcbiAgICAgICAgaWYgKHRleCkge1xyXG4gICAgICAgICAgICBpZiAodGV4LmxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgY2IgJiYgY2IuY2FsbCh0YXJnZXQsIG51bGwsIHRleCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4Lm9uY2UoXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICBjYiAmJiBjYi5jYWxsKHRhcmdldCwgbnVsbCwgdGV4KTtcclxuICAgICAgICAgICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSh1cmwsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGNiICYmIGNiLmNhbGwodGFyZ2V0LCBlcnIsIHRleHR1cmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNhY2hlSW1hZ2UgKHVybCwgaW1hZ2UpIHtcclxuICAgICAgICBpZiAodXJsICYmIGltYWdlKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXggPSBuZXcgVGV4dHVyZTJEKCk7XHJcbiAgICAgICAgICAgIHRleC5pbml0V2l0aEVsZW1lbnQoaW1hZ2UpO1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmFkZCh1cmwsIHRleCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBwb3N0TG9hZFRleHR1cmUgKHRleHR1cmUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlLm5hdGl2ZVVybCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxvYWQgaW1hZ2VcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucG9zdExvYWROYXRpdmUodGV4dHVyZSwgY2FsbGJhY2spO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZXh0dXJlVXRpbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==