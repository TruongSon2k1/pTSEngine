
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/DragonBonesAtlasAsset.js';
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
 * @module dragonBones
 */
var ArmatureCache = !CC_JSB && require('./ArmatureCache').sharedCache;
/**
 * !#en The skeleton atlas data of dragonBones.
 * !#zh dragonBones 的骨骼纹理数据。
 * @class DragonBonesAtlasAsset
 * @extends Asset
 */


var DragonBonesAtlasAsset = cc.Class({
  name: 'dragonBones.DragonBonesAtlasAsset',
  "extends": cc.Asset,
  ctor: function ctor() {
    this._clear();
  },
  properties: {
    _atlasJson: '',

    /**
     * @property {string} atlasJson
     */
    atlasJson: {
      get: function get() {
        return this._atlasJson;
      },
      set: function set(value) {
        this._atlasJson = value;
        this._atlasJsonData = JSON.parse(this.atlasJson);

        this._clear();
      }
    },
    _texture: {
      "default": null,
      type: cc.Texture2D,
      formerlySerializedAs: 'texture'
    },

    /**
     * @property {Texture2D} texture
     */
    texture: {
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        this._texture = value;

        this._clear();
      }
    },
    _textureAtlasData: null
  },
  statics: {
    preventDeferredLoadDependents: true
  },
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
    armatureDisplay.dragonAtlasAsset = this;
    return callback(null, node);
  },
  init: function init(factory) {
    this._factory = factory;

    if (!this._atlasJsonData) {
      this._atlasJsonData = JSON.parse(this.atlasJson);
    }

    var atlasJsonObj = this._atlasJsonData; // If create by manual, uuid is empty.

    this._uuid = this._uuid || atlasJsonObj.name;

    if (this._textureAtlasData) {
      factory.addTextureAtlasData(this._textureAtlasData, this._uuid);
    } else {
      this._textureAtlasData = factory.parseTextureAtlasData(atlasJsonObj, this.texture, this._uuid);
    }
  },
  _clear: function _clear() {
    if (CC_JSB) return;

    if (this._factory) {
      ArmatureCache.resetArmature(this._uuid);

      this._factory.removeTextureAtlasData(this._uuid, true);

      this._factory.removeDragonBonesDataByUUID(this._uuid, true);
    }

    this._textureAtlasData = null;
  },
  destroy: function destroy() {
    this._clear();

    this._super();
  }
});
dragonBones.DragonBonesAtlasAsset = module.exports = DragonBonesAtlasAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxEcmFnb25Cb25lc0F0bGFzQXNzZXQuanMiXSwibmFtZXMiOlsiQXJtYXR1cmVDYWNoZSIsIkNDX0pTQiIsInJlcXVpcmUiLCJzaGFyZWRDYWNoZSIsIkRyYWdvbkJvbmVzQXRsYXNBc3NldCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJjdG9yIiwiX2NsZWFyIiwicHJvcGVydGllcyIsIl9hdGxhc0pzb24iLCJhdGxhc0pzb24iLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9hdGxhc0pzb25EYXRhIiwiSlNPTiIsInBhcnNlIiwiX3RleHR1cmUiLCJ0eXBlIiwiVGV4dHVyZTJEIiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJ0ZXh0dXJlIiwiX3RleHR1cmVBdGxhc0RhdGEiLCJzdGF0aWNzIiwicHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHMiLCJjcmVhdGVOb2RlIiwiQ0NfRURJVE9SIiwiY2FsbGJhY2siLCJub2RlIiwiTm9kZSIsImFybWF0dXJlRGlzcGxheSIsImFkZENvbXBvbmVudCIsImRyYWdvbkJvbmVzIiwiQXJtYXR1cmVEaXNwbGF5IiwiZHJhZ29uQXRsYXNBc3NldCIsImluaXQiLCJmYWN0b3J5IiwiX2ZhY3RvcnkiLCJhdGxhc0pzb25PYmoiLCJfdXVpZCIsImFkZFRleHR1cmVBdGxhc0RhdGEiLCJwYXJzZVRleHR1cmVBdGxhc0RhdGEiLCJyZXNldEFybWF0dXJlIiwicmVtb3ZlVGV4dHVyZUF0bGFzRGF0YSIsInJlbW92ZURyYWdvbkJvbmVzRGF0YUJ5VVVJRCIsImRlc3Ryb3kiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHLENBQUNDLE1BQUQsSUFBV0MsT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJDLFdBQTFEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxxQkFBcUIsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDakNDLEVBQUFBLElBQUksRUFBRSxtQ0FEMkI7QUFFakMsYUFBU0YsRUFBRSxDQUFDRyxLQUZxQjtBQUlqQ0MsRUFBQUEsSUFKaUMsa0JBSXpCO0FBQ0osU0FBS0MsTUFBTDtBQUNILEdBTmdDO0FBUWpDQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFHLEVBREw7O0FBR1I7QUFDUjtBQUNBO0FBQ1FDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0YsVUFBWjtBQUNILE9BSE07QUFJUEcsTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS0osVUFBTCxHQUFrQkksS0FBbEI7QUFDQSxhQUFLQyxjQUFMLEdBQXNCQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLTixTQUFoQixDQUF0Qjs7QUFDQSxhQUFLSCxNQUFMO0FBQ0g7QUFSTSxLQU5IO0FBaUJSVSxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRWhCLEVBQUUsQ0FBQ2lCLFNBRkg7QUFHTkMsTUFBQUEsb0JBQW9CLEVBQUU7QUFIaEIsS0FqQkY7O0FBdUJSO0FBQ1I7QUFDQTtBQUNRQyxJQUFBQSxPQUFPLEVBQUU7QUFDTFYsTUFBQUEsR0FESyxpQkFDRTtBQUNILGVBQU8sS0FBS00sUUFBWjtBQUNILE9BSEk7QUFJTEwsTUFBQUEsR0FKSyxlQUlBQyxLQUpBLEVBSU87QUFDUixhQUFLSSxRQUFMLEdBQWdCSixLQUFoQjs7QUFDQSxhQUFLTixNQUFMO0FBQ0g7QUFQSSxLQTFCRDtBQW9DUmUsSUFBQUEsaUJBQWlCLEVBQUU7QUFwQ1gsR0FScUI7QUErQ2pDQyxFQUFBQSxPQUFPLEVBQUU7QUFDTEMsSUFBQUEsNkJBQTZCLEVBQUU7QUFEMUIsR0EvQ3dCO0FBbURqQ0MsRUFBQUEsVUFBVSxFQUFFQyxTQUFTLElBQUssVUFBVUMsUUFBVixFQUFvQjtBQUMxQyxRQUFJQyxJQUFJLEdBQUcsSUFBSTFCLEVBQUUsQ0FBQzJCLElBQVAsQ0FBWSxLQUFLekIsSUFBakIsQ0FBWDtBQUNBLFFBQUkwQixlQUFlLEdBQUdGLElBQUksQ0FBQ0csWUFBTCxDQUFrQkMsV0FBVyxDQUFDQyxlQUE5QixDQUF0QjtBQUNBSCxJQUFBQSxlQUFlLENBQUNJLGdCQUFoQixHQUFtQyxJQUFuQztBQUVBLFdBQU9QLFFBQVEsQ0FBQyxJQUFELEVBQU9DLElBQVAsQ0FBZjtBQUNILEdBekRnQztBQTJEakNPLEVBQUFBLElBM0RpQyxnQkEyRDNCQyxPQTNEMkIsRUEyRGxCO0FBQ1gsU0FBS0MsUUFBTCxHQUFnQkQsT0FBaEI7O0FBRUEsUUFBSSxDQUFDLEtBQUt0QixjQUFWLEVBQTBCO0FBQ3RCLFdBQUtBLGNBQUwsR0FBc0JDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUtOLFNBQWhCLENBQXRCO0FBQ0g7O0FBQ0QsUUFBSTRCLFlBQVksR0FBRyxLQUFLeEIsY0FBeEIsQ0FOVyxDQVFYOztBQUNBLFNBQUt5QixLQUFMLEdBQWEsS0FBS0EsS0FBTCxJQUFjRCxZQUFZLENBQUNsQyxJQUF4Qzs7QUFFQSxRQUFJLEtBQUtrQixpQkFBVCxFQUE0QjtBQUN4QmMsTUFBQUEsT0FBTyxDQUFDSSxtQkFBUixDQUE0QixLQUFLbEIsaUJBQWpDLEVBQW9ELEtBQUtpQixLQUF6RDtBQUNILEtBRkQsTUFHSztBQUNELFdBQUtqQixpQkFBTCxHQUF5QmMsT0FBTyxDQUFDSyxxQkFBUixDQUE4QkgsWUFBOUIsRUFBNEMsS0FBS2pCLE9BQWpELEVBQTBELEtBQUtrQixLQUEvRCxDQUF6QjtBQUNIO0FBQ0osR0E1RWdDO0FBOEVqQ2hDLEVBQUFBLE1BOUVpQyxvQkE4RXZCO0FBQ04sUUFBSVQsTUFBSixFQUFZOztBQUNaLFFBQUksS0FBS3VDLFFBQVQsRUFBbUI7QUFDZnhDLE1BQUFBLGFBQWEsQ0FBQzZDLGFBQWQsQ0FBNEIsS0FBS0gsS0FBakM7O0FBQ0EsV0FBS0YsUUFBTCxDQUFjTSxzQkFBZCxDQUFxQyxLQUFLSixLQUExQyxFQUFpRCxJQUFqRDs7QUFDQSxXQUFLRixRQUFMLENBQWNPLDJCQUFkLENBQTBDLEtBQUtMLEtBQS9DLEVBQXNELElBQXREO0FBQ0g7O0FBQ0QsU0FBS2pCLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0gsR0F0RmdDO0FBd0ZqQ3VCLEVBQUFBLE9BeEZpQyxxQkF3RnRCO0FBQ1AsU0FBS3RDLE1BQUw7O0FBQ0EsU0FBS3VDLE1BQUw7QUFDSDtBQTNGZ0MsQ0FBVCxDQUE1QjtBQThGQWQsV0FBVyxDQUFDL0IscUJBQVosR0FBb0M4QyxNQUFNLENBQUNDLE9BQVAsR0FBaUIvQyxxQkFBckQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBkcmFnb25Cb25lc1xyXG4gKi9cclxubGV0IEFybWF0dXJlQ2FjaGUgPSAhQ0NfSlNCICYmIHJlcXVpcmUoJy4vQXJtYXR1cmVDYWNoZScpLnNoYXJlZENhY2hlO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHNrZWxldG9uIGF0bGFzIGRhdGEgb2YgZHJhZ29uQm9uZXMuXHJcbiAqICEjemggZHJhZ29uQm9uZXMg55qE6aqo6aq857q555CG5pWw5o2u44CCXHJcbiAqIEBjbGFzcyBEcmFnb25Cb25lc0F0bGFzQXNzZXRcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcbnZhciBEcmFnb25Cb25lc0F0bGFzQXNzZXQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBdGxhc0Fzc2V0JyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2NsZWFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfYXRsYXNKc29uIDogJycsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhdGxhc0pzb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBhdGxhc0pzb246IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXRsYXNKc29uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXRsYXNKc29uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdGxhc0pzb25EYXRhID0gSlNPTi5wYXJzZSh0aGlzLmF0bGFzSnNvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3RleHR1cmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxyXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ3RleHR1cmUnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtUZXh0dXJlMkR9IHRleHR1cmVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0ZXh0dXJlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF90ZXh0dXJlQXRsYXNEYXRhOiBudWxsLFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTm9kZTogQ0NfRURJVE9SICYmICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKHRoaXMubmFtZSk7XHJcbiAgICAgICAgdmFyIGFybWF0dXJlRGlzcGxheSA9IG5vZGUuYWRkQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmRyYWdvbkF0bGFzQXNzZXQgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQgKGZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gZmFjdG9yeTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9hdGxhc0pzb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0bGFzSnNvbkRhdGEgPSBKU09OLnBhcnNlKHRoaXMuYXRsYXNKc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGF0bGFzSnNvbk9iaiA9IHRoaXMuX2F0bGFzSnNvbkRhdGE7XHJcblxyXG4gICAgICAgIC8vIElmIGNyZWF0ZSBieSBtYW51YWwsIHV1aWQgaXMgZW1wdHkuXHJcbiAgICAgICAgdGhpcy5fdXVpZCA9IHRoaXMuX3V1aWQgfHwgYXRsYXNKc29uT2JqLm5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlQXRsYXNEYXRhKSB7XHJcbiAgICAgICAgICAgIGZhY3RvcnkuYWRkVGV4dHVyZUF0bGFzRGF0YSh0aGlzLl90ZXh0dXJlQXRsYXNEYXRhLCB0aGlzLl91dWlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVBdGxhc0RhdGEgPSBmYWN0b3J5LnBhcnNlVGV4dHVyZUF0bGFzRGF0YShhdGxhc0pzb25PYmosIHRoaXMudGV4dHVyZSwgdGhpcy5fdXVpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfY2xlYXIgKCkge1xyXG4gICAgICAgIGlmIChDQ19KU0IpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5fZmFjdG9yeSkge1xyXG4gICAgICAgICAgICBBcm1hdHVyZUNhY2hlLnJlc2V0QXJtYXR1cmUodGhpcy5fdXVpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkucmVtb3ZlVGV4dHVyZUF0bGFzRGF0YSh0aGlzLl91dWlkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5yZW1vdmVEcmFnb25Cb25lc0RhdGFCeVVVSUQodGhpcy5fdXVpZCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RleHR1cmVBdGxhc0RhdGEgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95ICgpIHtcclxuICAgICAgICB0aGlzLl9jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCA9IG1vZHVsZS5leHBvcnRzID0gRHJhZ29uQm9uZXNBdGxhc0Fzc2V0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==