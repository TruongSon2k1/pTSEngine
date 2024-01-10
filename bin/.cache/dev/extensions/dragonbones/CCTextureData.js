
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/CCTextureData.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
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
dragonBones.CCTextureAtlasData = cc.Class({
  "extends": dragonBones.TextureAtlasData,
  name: "dragonBones.CCTextureAtlasData",
  properties: {
    _renderTexture: {
      "default": null,
      serializable: false
    },
    renderTexture: {
      get: function get() {
        return this._renderTexture;
      },
      set: function set(value) {
        this._renderTexture = value;

        if (value) {
          for (var k in this.textures) {
            var textureData = this.textures[k];

            if (!textureData.spriteFrame) {
              var rect = null;

              if (textureData.rotated) {
                rect = cc.rect(textureData.region.x, textureData.region.y, textureData.region.height, textureData.region.width);
              } else {
                rect = cc.rect(textureData.region.x, textureData.region.y, textureData.region.width, textureData.region.height);
              }

              var offset = cc.v2(0, 0);
              var size = cc.size(rect.width, rect.height);
              textureData.spriteFrame = new cc.SpriteFrame();
              textureData.spriteFrame.setTexture(value, rect, false, offset, size);
            }
          }
        } else {
          for (var _k in this.textures) {
            var _textureData = this.textures[_k];
            _textureData.spriteFrame = null;
          }
        }
      }
    }
  },
  statics: {
    toString: function toString() {
      return "[class dragonBones.CCTextureAtlasData]";
    }
  },
  _onClear: function _onClear() {
    dragonBones.TextureAtlasData.prototype._onClear.call(this);

    this.renderTexture = null;
  },
  createTexture: function createTexture() {
    return dragonBones.BaseObject.borrowObject(dragonBones.CCTextureData);
  }
});
dragonBones.CCTextureData = cc.Class({
  "extends": dragonBones.TextureData,
  name: "dragonBones.CCTextureData",
  properties: {
    spriteFrame: {
      "default": null,
      serializable: false
    }
  },
  statics: {
    toString: function toString() {
      return "[class dragonBones.CCTextureData]";
    }
  },
  _onClear: function _onClear() {
    dragonBones.TextureData.prototype._onClear.call(this);

    this.spriteFrame = null;
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxDQ1RleHR1cmVEYXRhLmpzIl0sIm5hbWVzIjpbImRyYWdvbkJvbmVzIiwiQ0NUZXh0dXJlQXRsYXNEYXRhIiwiY2MiLCJDbGFzcyIsIlRleHR1cmVBdGxhc0RhdGEiLCJuYW1lIiwicHJvcGVydGllcyIsIl9yZW5kZXJUZXh0dXJlIiwic2VyaWFsaXphYmxlIiwicmVuZGVyVGV4dHVyZSIsImdldCIsInNldCIsInZhbHVlIiwiayIsInRleHR1cmVzIiwidGV4dHVyZURhdGEiLCJzcHJpdGVGcmFtZSIsInJlY3QiLCJyb3RhdGVkIiwicmVnaW9uIiwieCIsInkiLCJoZWlnaHQiLCJ3aWR0aCIsIm9mZnNldCIsInYyIiwic2l6ZSIsIlNwcml0ZUZyYW1lIiwic2V0VGV4dHVyZSIsInN0YXRpY3MiLCJ0b1N0cmluZyIsIl9vbkNsZWFyIiwicHJvdG90eXBlIiwiY2FsbCIsImNyZWF0ZVRleHR1cmUiLCJCYXNlT2JqZWN0IiwiYm9ycm93T2JqZWN0IiwiQ0NUZXh0dXJlRGF0YSIsIlRleHR1cmVEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLFdBQVcsQ0FBQ0Msa0JBQVosR0FBaUNDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RDLGFBQVNILFdBQVcsQ0FBQ0ksZ0JBRGlCO0FBRXRDQyxFQUFBQSxJQUFJLEVBQUUsZ0NBRmdDO0FBSXRDQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsY0FBYyxFQUFFO0FBQ1osaUJBQVMsSUFERztBQUVaQyxNQUFBQSxZQUFZLEVBQUU7QUFGRixLQURSO0FBTVJDLElBQUFBLGFBQWEsRUFBRTtBQUNYQyxNQUFBQSxHQURX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RUFBRTtBQUZMO0FBREwsR0FKcUI7QUFXakNxQixFQUFBQSxPQUFPLEVBQUU7QUFDTEMsSUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLGFBQU8sbUNBQVA7QUFDSDtBQUhJLEdBWHdCO0FBaUJqQ0MsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCL0IsSUFBQUEsV0FBVyxDQUFDc0MsV0FBWixDQUF3Qk4sU0FBeEIsQ0FBa0NELFFBQWxDLENBQTJDRSxJQUEzQyxDQUFnRCxJQUFoRDs7QUFDQSxTQUFLakIsV0FBTCxHQUFtQixJQUFuQjtBQUNIO0FBcEJnQyxDQUFULENBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmRyYWdvbkJvbmVzLkNDVGV4dHVyZUF0bGFzRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGRyYWdvbkJvbmVzLlRleHR1cmVBdGxhc0RhdGEsXHJcbiAgICBuYW1lOiBcImRyYWdvbkJvbmVzLkNDVGV4dHVyZUF0bGFzRGF0YVwiLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfcmVuZGVyVGV4dHVyZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVuZGVyVGV4dHVyZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclRleHR1cmU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclRleHR1cmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy50ZXh0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dHVyZURhdGEgPSB0aGlzLnRleHR1cmVzW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRleHR1cmVEYXRhLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGV4dHVyZURhdGEucm90YXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3QgPSBjYy5yZWN0KHRleHR1cmVEYXRhLnJlZ2lvbi54LCB0ZXh0dXJlRGF0YS5yZWdpb24ueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZURhdGEucmVnaW9uLmhlaWdodCwgdGV4dHVyZURhdGEucmVnaW9uLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdCA9IGNjLnJlY3QodGV4dHVyZURhdGEucmVnaW9uLngsIHRleHR1cmVEYXRhLnJlZ2lvbi55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YS5yZWdpb24ud2lkdGgsIHRleHR1cmVEYXRhLnJlZ2lvbi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgPSBjYy5zaXplKHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVEYXRhLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlRGF0YS5zcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHZhbHVlLCByZWN0LCBmYWxzZSwgb2Zmc2V0LCBzaXplKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLnRleHR1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlRGF0YSA9IHRoaXMudGV4dHVyZXNba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVEYXRhLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJbY2xhc3MgZHJhZ29uQm9uZXMuQ0NUZXh0dXJlQXRsYXNEYXRhXVwiO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29uQ2xlYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkcmFnb25Cb25lcy5UZXh0dXJlQXRsYXNEYXRhLnByb3RvdHlwZS5fb25DbGVhci5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyVGV4dHVyZSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZVRleHR1cmUgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZHJhZ29uQm9uZXMuQmFzZU9iamVjdC5ib3Jyb3dPYmplY3QoZHJhZ29uQm9uZXMuQ0NUZXh0dXJlRGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxufSk7XHJcblxyXG5kcmFnb25Cb25lcy5DQ1RleHR1cmVEYXRhID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogZHJhZ29uQm9uZXMuVGV4dHVyZURhdGEsXHJcbiAgICBuYW1lOiBcImRyYWdvbkJvbmVzLkNDVGV4dHVyZURhdGFcIixcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgc3ByaXRlRnJhbWU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJbY2xhc3MgZHJhZ29uQm9uZXMuQ0NUZXh0dXJlRGF0YV1cIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZHJhZ29uQm9uZXMuVGV4dHVyZURhdGEucHJvdG90eXBlLl9vbkNsZWFyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==