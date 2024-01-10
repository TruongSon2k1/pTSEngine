
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCBitmapFont.js';
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
var FontLetterDefinition = function FontLetterDefinition() {
  this.u = 0;
  this.v = 0;
  this.w = 0;
  this.h = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.textureID = 0;
  this.valid = false;
  this.xAdvance = 0;
};

var FontAtlas = function FontAtlas(texture) {
  this._letterDefinitions = {};
  this._texture = texture;
};

FontAtlas.prototype = {
  constructor: FontAtlas,
  addLetterDefinitions: function addLetterDefinitions(letter, letterDefinition) {
    this._letterDefinitions[letter] = letterDefinition;
  },
  cloneLetterDefinition: function cloneLetterDefinition() {
    var copyLetterDefinitions = {};

    for (var key in this._letterDefinitions) {
      var value = new FontLetterDefinition();
      cc.js.mixin(value, this._letterDefinitions[key]);
      copyLetterDefinitions[key] = value;
    }

    return copyLetterDefinitions;
  },
  getTexture: function getTexture() {
    return this._texture;
  },
  getLetter: function getLetter(key) {
    return this._letterDefinitions[key];
  },
  getLetterDefinitionForChar: function getLetterDefinitionForChar(_char) {
    var key = _char.charCodeAt(0);

    var hasKey = this._letterDefinitions.hasOwnProperty(key);

    var letter;

    if (hasKey) {
      letter = this._letterDefinitions[key];
    } else {
      letter = null;
    }

    return letter;
  },
  clear: function clear() {
    this._letterDefinitions = {};
  }
};
/**
 * @module cc
 */

/**
 * !#en Class for BitmapFont handling.
 * !#zh 位图字体资源类。
 * @class BitmapFont
 * @extends Font
 *
 */

var BitmapFont = cc.Class({
  name: 'cc.BitmapFont',
  "extends": cc.Font,
  properties: {
    fntDataStr: {
      "default": ''
    },
    spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },
    fontSize: {
      "default": -1
    },
    //用来缓存 BitmapFont 解析之后的数据
    _fntConfig: null,
    _fontDefDictionary: null
  },
  onLoad: function onLoad() {
    var spriteFrame = this.spriteFrame;

    if (!this._fontDefDictionary) {
      this._fontDefDictionary = new FontAtlas();

      if (spriteFrame) {
        this._fontDefDictionary._texture = spriteFrame._texture;
      }
    }

    var fntConfig = this._fntConfig;

    if (!fntConfig) {
      return;
    }

    var fontDict = fntConfig.fontDefDictionary;

    for (var fontDef in fontDict) {
      var letter = new FontLetterDefinition();
      var rect = fontDict[fontDef].rect;
      letter.offsetX = fontDict[fontDef].xOffset;
      letter.offsetY = fontDict[fontDef].yOffset;
      letter.w = rect.width;
      letter.h = rect.height;
      letter.u = rect.x;
      letter.v = rect.y; //FIXME: only one texture supported for now

      letter.textureID = 0;
      letter.valid = true;
      letter.xAdvance = fontDict[fontDef].xAdvance;

      this._fontDefDictionary.addLetterDefinitions(fontDef, letter);
    }
  }
});
cc.BitmapFont = BitmapFont;
cc.BitmapFont.FontLetterDefinition = FontLetterDefinition;
cc.BitmapFont.FontAtlas = FontAtlas;
module.exports = BitmapFont;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NCaXRtYXBGb250LmpzIl0sIm5hbWVzIjpbIkZvbnRMZXR0ZXJEZWZpbml0aW9uIiwidSIsInYiLCJ3IiwiaCIsIm9mZnNldFgiLCJvZmZzZXRZIiwidGV4dHVyZUlEIiwidmFsaWQiLCJ4QWR2YW5jZSIsIkZvbnRBdGxhcyIsInRleHR1cmUiLCJfbGV0dGVyRGVmaW5pdGlvbnMiLCJfdGV4dHVyZSIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiYWRkTGV0dGVyRGVmaW5pdGlvbnMiLCJsZXR0ZXIiLCJsZXR0ZXJEZWZpbml0aW9uIiwiY2xvbmVMZXR0ZXJEZWZpbml0aW9uIiwiY29weUxldHRlckRlZmluaXRpb25zIiwia2V5IiwidmFsdWUiLCJjYyIsImpzIiwibWl4aW4iLCJnZXRUZXh0dXJlIiwiZ2V0TGV0dGVyIiwiZ2V0TGV0dGVyRGVmaW5pdGlvbkZvckNoYXIiLCJjaGFyIiwiY2hhckNvZGVBdCIsImhhc0tleSIsImhhc093blByb3BlcnR5IiwiY2xlYXIiLCJCaXRtYXBGb250IiwiQ2xhc3MiLCJuYW1lIiwiRm9udCIsInByb3BlcnRpZXMiLCJmbnREYXRhU3RyIiwic3ByaXRlRnJhbWUiLCJ0eXBlIiwiU3ByaXRlRnJhbWUiLCJmb250U2l6ZSIsIl9mbnRDb25maWciLCJfZm9udERlZkRpY3Rpb25hcnkiLCJvbkxvYWQiLCJmbnRDb25maWciLCJmb250RGljdCIsImZvbnREZWZEaWN0aW9uYXJ5IiwiZm9udERlZiIsInJlY3QiLCJ4T2Zmc2V0IiwieU9mZnNldCIsIndpZHRoIiwiaGVpZ2h0IiwieCIsInkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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R0FBV2lELElBQUksQ0FBQ00sQ0FBaEIsQ0FUMEIsQ0FVMUI7O0FBQ0F4QyxNQUFBQSxNQUFNLENBQUNWLFNBQVAsR0FBbUIsQ0FBbkI7QUFDQVUsTUFBQUEsTUFBTSxDQUFDVCxLQUFQLEdBQWUsSUFBZjtBQUNBUyxNQUFBQSxNQUFNLENBQUNSLFFBQVAsR0FBa0J1QyxRQUFRLENBQUNFLE9BQUQsQ0FBUixDQUFrQnpDLFFBQXBDOztBQUVBLFdBQUtvQyxrQkFBTCxDQUF3QjdCLG9CQUF4QixDQUE2Q2tDLE9BQTdDLEVBQXNEakMsTUFBdEQ7QUFDSDtBQUNKO0FBckRxQixDQUFULENBQWpCO0FBd0RBTSxFQUFFLENBQUNXLFVBQUgsR0FBZ0JBLFVBQWhCO0FBQ0FYLEVBQUUsQ0FBQ1csVUFBSCxDQUFjbEMsb0JBQWQsR0FBcUNBLG9CQUFyQztBQUNBdUIsRUFBRSxDQUFDVyxVQUFILENBQWN4QixTQUFkLEdBQTBCQSxTQUExQjtBQUNBZ0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekIsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgRm9udExldHRlckRlZmluaXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudSA9IDA7XHJcbiAgICB0aGlzLnYgPSAwO1xyXG4gICAgdGhpcy53ID0gMDtcclxuICAgIHRoaXMuaCA9IDA7XHJcbiAgICB0aGlzLm9mZnNldFggPSAwO1xyXG4gICAgdGhpcy5vZmZzZXRZID0gMDtcclxuICAgIHRoaXMudGV4dHVyZUlEID0gMDtcclxuICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgIHRoaXMueEFkdmFuY2UgPSAwO1xyXG59O1xyXG5cclxubGV0IEZvbnRBdGxhcyA9IGZ1bmN0aW9uICh0ZXh0dXJlKSB7XHJcbiAgICB0aGlzLl9sZXR0ZXJEZWZpbml0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XHJcbn07XHJcblxyXG5Gb250QXRsYXMucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEZvbnRBdGxhcyxcclxuICAgIGFkZExldHRlckRlZmluaXRpb25zIChsZXR0ZXIsIGxldHRlckRlZmluaXRpb24pIHtcclxuICAgICAgICB0aGlzLl9sZXR0ZXJEZWZpbml0aW9uc1tsZXR0ZXJdID0gbGV0dGVyRGVmaW5pdGlvbjtcclxuICAgIH0sXHJcbiAgICBjbG9uZUxldHRlckRlZmluaXRpb24gKCkge1xyXG4gICAgICAgIGxldCBjb3B5TGV0dGVyRGVmaW5pdGlvbnMgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gbmV3IEZvbnRMZXR0ZXJEZWZpbml0aW9uKCk7XHJcbiAgICAgICAgICAgIGNjLmpzLm1peGluKHZhbHVlLCB0aGlzLl9sZXR0ZXJEZWZpbml0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgY29weUxldHRlckRlZmluaXRpb25zW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvcHlMZXR0ZXJEZWZpbml0aW9ucztcclxuICAgIH0sXHJcbiAgICBnZXRUZXh0dXJlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcclxuICAgIH0sXHJcbiAgICBnZXRMZXR0ZXIgKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXR0ZXJEZWZpbml0aW9uc1trZXldO1xyXG4gICAgfSxcclxuICAgIGdldExldHRlckRlZmluaXRpb25Gb3JDaGFyIChjaGFyKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGNoYXIuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBsZXQgaGFzS2V5ID0gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KTtcclxuICAgICAgICBsZXQgbGV0dGVyO1xyXG4gICAgICAgIGlmIChoYXNLZXkpIHtcclxuICAgICAgICAgICAgbGV0dGVyID0gdGhpcy5fbGV0dGVyRGVmaW5pdGlvbnNba2V5XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXR0ZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGV0dGVyO1xyXG4gICAgfSxcclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9sZXR0ZXJEZWZpbml0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIENsYXNzIGZvciBCaXRtYXBGb250IGhhbmRsaW5nLlxyXG4gKiAhI3poIOS9jeWbvuWtl+S9k+i1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgQml0bWFwRm9udFxyXG4gKiBAZXh0ZW5kcyBGb250XHJcbiAqXHJcbiAqL1xyXG52YXIgQml0bWFwRm9udCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5CaXRtYXBGb250JyxcclxuICAgIGV4dGVuZHM6IGNjLkZvbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGZudERhdGFTdHI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzcHJpdGVGcmFtZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZvbnRTaXplOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IC0xXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvL+eUqOadpee8k+WtmCBCaXRtYXBGb250IOino+aekOS5i+WQjueahOaVsOaNrlxyXG4gICAgICAgIF9mbnRDb25maWc6IG51bGwsXHJcbiAgICAgICAgX2ZvbnREZWZEaWN0aW9uYXJ5OiBudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZvbnREZWZEaWN0aW9uYXJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvbnREZWZEaWN0aW9uYXJ5ID0gbmV3IEZvbnRBdGxhcygpO1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvbnREZWZEaWN0aW9uYXJ5Ll90ZXh0dXJlID0gc3ByaXRlRnJhbWUuX3RleHR1cmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmbnRDb25maWcgPSB0aGlzLl9mbnRDb25maWc7XHJcbiAgICAgICAgaWYgKCFmbnRDb25maWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZm9udERpY3QgPSBmbnRDb25maWcuZm9udERlZkRpY3Rpb25hcnk7XHJcbiAgICAgICAgZm9yIChsZXQgZm9udERlZiBpbiBmb250RGljdCkge1xyXG4gICAgICAgICAgICBsZXQgbGV0dGVyID0gbmV3IEZvbnRMZXR0ZXJEZWZpbml0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGZvbnREaWN0W2ZvbnREZWZdLnJlY3Q7XHJcbiAgICAgICAgICAgIGxldHRlci5vZmZzZXRYID0gZm9udERpY3RbZm9udERlZl0ueE9mZnNldDtcclxuICAgICAgICAgICAgbGV0dGVyLm9mZnNldFkgPSBmb250RGljdFtmb250RGVmXS55T2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXR0ZXIudyA9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIGxldHRlci5oID0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldHRlci51ID0gcmVjdC54O1xyXG4gICAgICAgICAgICBsZXR0ZXIudiA9IHJlY3QueTtcclxuICAgICAgICAgICAgLy9GSVhNRTogb25seSBvbmUgdGV4dHVyZSBzdXBwb3J0ZWQgZm9yIG5vd1xyXG4gICAgICAgICAgICBsZXR0ZXIudGV4dHVyZUlEID0gMDtcclxuICAgICAgICAgICAgbGV0dGVyLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0dGVyLnhBZHZhbmNlID0gZm9udERpY3RbZm9udERlZl0ueEFkdmFuY2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9mb250RGVmRGljdGlvbmFyeS5hZGRMZXR0ZXJEZWZpbml0aW9ucyhmb250RGVmLCBsZXR0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5CaXRtYXBGb250ID0gQml0bWFwRm9udDtcclxuY2MuQml0bWFwRm9udC5Gb250TGV0dGVyRGVmaW5pdGlvbiA9IEZvbnRMZXR0ZXJEZWZpbml0aW9uO1xyXG5jYy5CaXRtYXBGb250LkZvbnRBdGxhcyA9IEZvbnRBdGxhcztcclxubW9kdWxlLmV4cG9ydHMgPSBCaXRtYXBGb250O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==