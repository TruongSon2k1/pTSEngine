
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/DragonBonesAsset.js';
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
 * !#en The skeleton data of dragonBones.
 * !#zh dragonBones 的 骨骼数据。
 * @class DragonBonesAsset
 * @extends Asset
 */


var DragonBonesAsset = cc.Class({
  name: 'dragonBones.DragonBonesAsset',
  "extends": cc.Asset,
  ctor: function ctor() {
    this.reset();
  },
  properties: {
    _dragonBonesJson: '',

    /**
     * !#en See http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/dataFormat/index.html
     * !#zh 可查看 DragonBones 官方文档 http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/dataFormat/index.html
     * @property {string} dragonBonesJson
     */
    dragonBonesJson: {
      get: function get() {
        return this._dragonBonesJson;
      },
      set: function set(value) {
        this._dragonBonesJson = value;
        this._dragonBonesJsonData = JSON.parse(value);
        this.reset();
      }
    },
    _nativeAsset: {
      get: function get() {
        return this._buffer;
      },
      set: function set(bin) {
        this._buffer = bin.buffer || bin;
        this.reset();
      },
      override: true
    }
  },
  statics: {
    preventDeferredLoadDependents: true
  },
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var armatureDisplay = node.addComponent(dragonBones.ArmatureDisplay);
    armatureDisplay.dragonAsset = this;
    return callback(null, node);
  },
  reset: function reset() {
    this._clear();

    if (CC_EDITOR) {
      this._armaturesEnum = null;
    }
  },
  init: function init(factory, atlasUUID) {
    if (CC_EDITOR) {
      this._factory = factory || new dragonBones.CCFactory();
    } else {
      this._factory = factory;
    }

    if (!this._dragonBonesJsonData && this.dragonBonesJson) {
      this._dragonBonesJsonData = JSON.parse(this.dragonBonesJson);
    }

    var rawData = null;

    if (this._dragonBonesJsonData) {
      rawData = this._dragonBonesJsonData;
    } else {
      rawData = this._nativeAsset;
    } // If create by manual, uuid is empty.


    if (!this._uuid) {
      var dbData = this._factory.getDragonBonesDataByRawData(rawData);

      if (dbData) {
        this._uuid = dbData.name;
      } else {
        cc.warn('dragonbones name is empty');
      }
    }

    var armatureKey = this._uuid + "#" + atlasUUID;

    var dragonBonesData = this._factory.getDragonBonesData(armatureKey);

    if (dragonBonesData) return armatureKey;

    this._factory.parseDragonBonesData(rawData, armatureKey);

    return armatureKey;
  },
  // EDITOR
  getArmatureEnum: CC_EDITOR && function () {
    if (this._armaturesEnum) {
      return this._armaturesEnum;
    }

    this.init();

    var dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

    if (dragonBonesData) {
      var armatureNames = dragonBonesData.armatureNames;
      var enumDef = {};

      for (var i = 0; i < armatureNames.length; i++) {
        var name = armatureNames[i];
        enumDef[name] = i;
      }

      return this._armaturesEnum = cc.Enum(enumDef);
    }

    return null;
  },
  getAnimsEnum: CC_EDITOR && function (armatureName) {
    this.init();

    var dragonBonesData = this._factory.getDragonBonesDataByUUID(this._uuid);

    if (dragonBonesData) {
      var armature = dragonBonesData.getArmature(armatureName);

      if (!armature) {
        return null;
      }

      var enumDef = {
        '<None>': 0
      };
      var anims = armature.animations;
      var i = 0;

      for (var animName in anims) {
        if (anims.hasOwnProperty(animName)) {
          enumDef[animName] = i + 1;
          i++;
        }
      }

      return cc.Enum(enumDef);
    }

    return null;
  },
  _clear: function _clear() {
    if (this._factory) {
      ArmatureCache.resetArmature(this._uuid);

      this._factory.removeDragonBonesDataByUUID(this._uuid, true);
    }
  },
  destroy: function destroy() {
    this._clear();

    this._super();
  }
});
dragonBones.DragonBonesAsset = module.exports = DragonBonesAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxEcmFnb25Cb25lc0Fzc2V0LmpzIl0sIm5hbWVzIjpbIkFybWF0dXJlQ2FjaGUiLCJDQ19KU0IiLCJyZXF1aXJlIiwic2hhcmVkQ2FjaGUiLCJEcmFnb25Cb25lc0Fzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsImN0b3IiLCJyZXNldCIsInByb3BlcnRpZXMiLCJfZHJhZ29uQm9uZXNKc29uIiwiZHJhZ29uQm9uZXNKc29uIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfZHJhZ29uQm9uZXNKc29uRGF0YSIsIkpTT04iLCJwYXJzZSIsIl9uYXRpdmVBc3NldCIsIl9idWZmZXIiLCJiaW4iLCJidWZmZXIiLCJvdmVycmlkZSIsInN0YXRpY3MiLCJwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50cyIsImNyZWF0ZU5vZGUiLCJDQ19FRElUT1IiLCJjYWxsYmFjayIsIm5vZGUiLCJOb2RlIiwiYXJtYXR1cmVEaXNwbGF5IiwiYWRkQ29tcG9uZW50IiwiZHJhZ29uQm9uZXMiLCJBcm1hdHVyZURpc3BsYXkiLCJkcmFnb25Bc3NldCIsIl9jbGVhciIsIl9hcm1hdHVyZXNFbnVtIiwiaW5pdCIsImZhY3RvcnkiLCJhdGxhc1VVSUQiLCJfZmFjdG9yeSIsIkNDRmFjdG9yeSIsInJhd0RhdGEiLCJfdXVpZCIsImRiRGF0YSIsImdldERyYWdvbkJvbmVzRGF0YUJ5UmF3RGF0YSIsIndhcm4iLCJhcm1hdHVyZUtleSIsImRyYWdvbkJvbmVzRGF0YSIsImdldERyYWdvbkJvbmVzRGF0YSIsInBhcnNlRHJhZ29uQm9uZXNEYXRhIiwiZ2V0QXJtYXR1cmVFbnVtIiwiZ2V0RHJhZ29uQm9uZXNEYXRhQnlVVUlEIiwiYXJtYXR1cmVOYW1lcyIsImVudW1EZWYiLCJpIiwibGVuZ3RoIiwiRW51bSIsImdldEFuaW1zRW51bSIsImFybWF0dXJlTmFtZSIsImFybWF0dXJlIiwiZ2V0QXJtYXR1cmUiLCJhbmltcyIsImFuaW1hdGlvbnMiLCJhbmltTmFtZSIsImhhc093blByb3BlcnR5IiwicmVzZXRBcm1hdHVyZSIsInJlbW92ZURyYWdvbkJvbmVzRGF0YUJ5VVVJRCIsImRlc3Ryb3kiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHLENBQUNDLE1BQUQsSUFBV0MsT0FBTyxDQUFDLGlCQUFELENBQVAsQ0FBMkJDLFdBQTFEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSw4QkFEc0I7QUFFNUIsYUFBU0YsRUFBRSxDQUFDRyxLQUZnQjtBQUk1QkMsRUFBQUEsSUFKNEIsa0JBSXBCO0FBQ0osU0FBS0MsS0FBTDtBQUNILEdBTjJCO0FBUTVCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZ0JBQWdCLEVBQUcsRUFEWDs7QUFHUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLGVBQWUsRUFBRztBQUNkQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0YsZ0JBQVo7QUFDSCxPQUhhO0FBSWRHLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtKLGdCQUFMLEdBQXdCSSxLQUF4QjtBQUNBLGFBQUtDLG9CQUFMLEdBQTRCQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsS0FBWCxDQUE1QjtBQUNBLGFBQUtOLEtBQUw7QUFDSDtBQVJhLEtBUlY7QUFtQlJVLElBQUFBLFlBQVksRUFBRTtB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QUEsQ0FBQztBQUNKO0FBQ0o7O0FBQ0QsYUFBT3BELEVBQUUsQ0FBQ3NELElBQUgsQ0FBUUgsT0FBUixDQUFQO0FBQ0g7O0FBQ0QsV0FBTyxJQUFQO0FBQ0gsR0F4STJCO0FBMEk1Qm5CLEVBQUFBLE1BMUk0QixvQkEwSWxCO0FBQ04sUUFBSSxLQUFLSyxRQUFULEVBQW1CO0FBQ2YxQyxNQUFBQSxhQUFhLENBQUNvRSxhQUFkLENBQTRCLEtBQUt2QixLQUFqQzs7QUFDQSxXQUFLSCxRQUFMLENBQWMyQiwyQkFBZCxDQUEwQyxLQUFLeEIsS0FBL0MsRUFBc0QsSUFBdEQ7QUFDSDtBQUNKLEdBL0kyQjtBQWlKNUJ5QixFQUFBQSxPQWpKNEIscUJBaUpqQjtBQUNQLFNBQUtqQyxNQUFMOztBQUNBLFNBQUtrQyxNQUFMO0FBQ0g7QUFwSjJCLENBQVQsQ0FBdkI7QUF1SkFyQyxXQUFXLENBQUM5QixnQkFBWixHQUErQm9FLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJFLGdCQUFoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGRyYWdvbkJvbmVzXHJcbiAqL1xyXG5sZXQgQXJtYXR1cmVDYWNoZSA9ICFDQ19KU0IgJiYgcmVxdWlyZSgnLi9Bcm1hdHVyZUNhY2hlJykuc2hhcmVkQ2FjaGU7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgc2tlbGV0b24gZGF0YSBvZiBkcmFnb25Cb25lcy5cclxuICogISN6aCBkcmFnb25Cb25lcyDnmoQg6aqo6aq85pWw5o2u44CCXHJcbiAqIEBjbGFzcyBEcmFnb25Cb25lc0Fzc2V0XHJcbiAqIEBleHRlbmRzIEFzc2V0XHJcbiAqL1xyXG52YXIgRHJhZ29uQm9uZXNBc3NldCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0JyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9kcmFnb25Cb25lc0pzb24gOiAnJyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBTZWUgaHR0cDovL2RldmVsb3Blci5lZ3JldC5jb20vY24vZ2l0aHViL2VncmV0LWRvY3MvREIvZGJMaWJzL2RhdGFGb3JtYXQvaW5kZXguaHRtbFxyXG4gICAgICAgICAqICEjemgg5Y+v5p+l55yLIERyYWdvbkJvbmVzIOWumOaWueaWh+ahoyBodHRwOi8vZGV2ZWxvcGVyLmVncmV0LmNvbS9jbi9naXRodWIvZWdyZXQtZG9jcy9EQi9kYkxpYnMvZGF0YUZvcm1hdC9pbmRleC5odG1sXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzdHJpbmd9IGRyYWdvbkJvbmVzSnNvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRyYWdvbkJvbmVzSnNvbiA6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhZ29uQm9uZXNKc29uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHJhZ29uQm9uZXNKc29uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnb25Cb25lc0pzb25EYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfbmF0aXZlQXNzZXQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWZmZXI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAoYmluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBiaW4uYnVmZmVyIHx8IGJpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTm9kZTogQ0NfRURJVE9SICYmICBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKHRoaXMubmFtZSk7XHJcbiAgICAgICAgdmFyIGFybWF0dXJlRGlzcGxheSA9IG5vZGUuYWRkQ29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmRyYWdvbkFzc2V0ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXNldCAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlc0VudW0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCAoZmFjdG9yeSwgYXRsYXNVVUlEKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWN0b3J5ID0gZmFjdG9yeSB8fCBuZXcgZHJhZ29uQm9uZXMuQ0NGYWN0b3J5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeSA9IGZhY3Rvcnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2RyYWdvbkJvbmVzSnNvbkRhdGEgJiYgdGhpcy5kcmFnb25Cb25lc0pzb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fZHJhZ29uQm9uZXNKc29uRGF0YSA9IEpTT04ucGFyc2UodGhpcy5kcmFnb25Cb25lc0pzb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJhd0RhdGEgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9kcmFnb25Cb25lc0pzb25EYXRhKSB7XHJcbiAgICAgICAgICAgIHJhd0RhdGEgPSB0aGlzLl9kcmFnb25Cb25lc0pzb25EYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJhd0RhdGEgPSB0aGlzLl9uYXRpdmVBc3NldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIGNyZWF0ZSBieSBtYW51YWwsIHV1aWQgaXMgZW1wdHkuXHJcbiAgICAgICAgaWYgKCF0aGlzLl91dWlkKSB7XHJcbiAgICAgICAgICAgIGxldCBkYkRhdGEgPSB0aGlzLl9mYWN0b3J5LmdldERyYWdvbkJvbmVzRGF0YUJ5UmF3RGF0YShyYXdEYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRiRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXVpZCA9IGRiRGF0YS5uYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybignZHJhZ29uYm9uZXMgbmFtZSBpcyBlbXB0eScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJtYXR1cmVLZXkgPSB0aGlzLl91dWlkICsgXCIjXCIgKyBhdGxhc1VVSUQ7XHJcbiAgICAgICAgbGV0IGRyYWdvbkJvbmVzRGF0YSA9IHRoaXMuX2ZhY3RvcnkuZ2V0RHJhZ29uQm9uZXNEYXRhKGFybWF0dXJlS2V5KTtcclxuICAgICAgICBpZiAoZHJhZ29uQm9uZXNEYXRhKSByZXR1cm4gYXJtYXR1cmVLZXk7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEocmF3RGF0YSwgYXJtYXR1cmVLZXkpO1xyXG4gICAgICAgIHJldHVybiBhcm1hdHVyZUtleTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRURJVE9SXHJcblxyXG4gICAgZ2V0QXJtYXR1cmVFbnVtOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZXNFbnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZXNFbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICBsZXQgZHJhZ29uQm9uZXNEYXRhID0gdGhpcy5fZmFjdG9yeS5nZXREcmFnb25Cb25lc0RhdGFCeVVVSUQodGhpcy5fdXVpZCk7XHJcbiAgICAgICAgaWYgKGRyYWdvbkJvbmVzRGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgYXJtYXR1cmVOYW1lcyA9IGRyYWdvbkJvbmVzRGF0YS5hcm1hdHVyZU5hbWVzO1xyXG4gICAgICAgICAgICB2YXIgZW51bURlZiA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFybWF0dXJlTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gYXJtYXR1cmVOYW1lc1tpXTtcclxuICAgICAgICAgICAgICAgIGVudW1EZWZbbmFtZV0gPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZXNFbnVtID0gY2MuRW51bShlbnVtRGVmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFuaW1zRW51bTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChhcm1hdHVyZU5hbWUpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYWdvbkJvbmVzRGF0YSA9IHRoaXMuX2ZhY3RvcnkuZ2V0RHJhZ29uQm9uZXNEYXRhQnlVVUlEKHRoaXMuX3V1aWQpO1xyXG4gICAgICAgIGlmIChkcmFnb25Cb25lc0RhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGFybWF0dXJlID0gZHJhZ29uQm9uZXNEYXRhLmdldEFybWF0dXJlKGFybWF0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZW51bURlZiA9IHsgJzxOb25lPic6IDAgfTtcclxuICAgICAgICAgICAgdmFyIGFuaW1zID0gYXJtYXR1cmUuYW5pbWF0aW9ucztcclxuICAgICAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhbmltTmFtZSBpbiBhbmltcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1zLmhhc093blByb3BlcnR5KGFuaW1OYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVudW1EZWZbYW5pbU5hbWVdID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5FbnVtKGVudW1EZWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2NsZWFyICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmFjdG9yeSkge1xyXG4gICAgICAgICAgICBBcm1hdHVyZUNhY2hlLnJlc2V0QXJtYXR1cmUodGhpcy5fdXVpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkucmVtb3ZlRHJhZ29uQm9uZXNEYXRhQnlVVUlEKHRoaXMuX3V1aWQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG5kcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0ID0gbW9kdWxlLmV4cG9ydHMgPSBEcmFnb25Cb25lc0Fzc2V0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==