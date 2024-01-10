
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/skeleton-data.js';
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

/**
 * @module sp
 */
var SkeletonCache = !CC_JSB && require('./skeleton-cache').sharedCache;
/**
 * !#en The skeleton data of spine.
 * !#zh Spine 的 骨骼数据。
 * @class SkeletonData
 * @extends Asset
 */


var SkeletonData = cc.Class({
  name: 'sp.SkeletonData',
  "extends": cc.Asset,
  ctor: function ctor() {
    this.reset();
  },
  properties: {
    _skeletonJson: null,
    // use by jsb
    skeletonJsonStr: {
      get: function get() {
        if (this._skeletonJson) {
          return JSON.stringify(this._skeletonJson);
        } else {
          return "";
        }
      }
    },

    /**
     * !#en See http://en.esotericsoftware.com/spine-json-format
     * !#zh 可查看 Spine 官方文档 http://zh.esotericsoftware.com/spine-json-format
     * @property {Object} skeletonJson
     */
    skeletonJson: {
      get: function get() {
        return this._skeletonJson;
      },
      set: function set(value) {
        this.reset();

        if (typeof value == "string") {
          this._skeletonJson = JSON.parse(value);
        } else {
          this._skeletonJson = value;
        } // If create by manual, uuid is empty.


        if (!this._uuid && value.skeleton) {
          this._uuid = value.skeleton.hash;
        }
      }
    },
    _atlasText: "",

    /**
     * @property {String} atlasText
     */
    atlasText: {
      get: function get() {
        return this._atlasText;
      },
      set: function set(value) {
        this._atlasText = value;
        this.reset();
      }
    },

    /**
     * @property {Texture2D[]} textures
     */
    textures: {
      "default": [],
      type: [cc.Texture2D]
    },

    /**
     * @property {String[]} textureNames
     * @private
     */
    textureNames: {
      "default": [],
      type: [cc.String]
    },

    /**
     * !#en
     * A scale can be specified on the JSON or binary loader which will scale the bone positions,
     * image sizes, and animation translations.
     * This can be useful when using different sized images than were used when designing the skeleton
     * in Spine. For example, if using images that are half the size than were used in Spine,
     * a scale of 0.5 can be used. This is commonly used for games that can run with either low or high
     * resolution texture atlases.
     * see http://en.esotericsoftware.com/spine-using-runtimes#Scaling
     * !#zh 可查看 Spine 官方文档： http://zh.esotericsoftware.com/spine-using-runtimes#Scaling
     * @property {Number} scale
     */
    scale: 1,
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
  // PUBLIC
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var skeleton = node.addComponent(sp.Skeleton);
    skeleton.skeletonData = this;
    return callback(null, node);
  },
  reset: function reset() {
    /**
     * @property {sp.spine.SkeletonData} _skeletonData
     * @private
     */
    this._skeletonCache = null;
    /**
     * @property {sp.spine.Atlas} _atlasCache
     * @private
     */

    this._atlasCache = null;

    if (CC_EDITOR) {
      this._skinsEnum = null;
      this._animsEnum = null;
    }
  },
  ensureTexturesLoaded: function ensureTexturesLoaded(loaded, caller) {
    var textures = this.textures;
    var texsLen = textures.length;

    if (texsLen == 0) {
      loaded.call(caller, false);
      return;
    }

    var loadedCount = 0;

    var loadedItem = function loadedItem() {
      loadedCount++;

      if (loadedCount >= texsLen) {
        loaded && loaded.call(caller, true);
        loaded = null;
      }
    };

    for (var i = 0; i < texsLen; i++) {
      var tex = textures[i];

      if (tex.loaded) {
        loadedItem();
      } else {
        tex.once('load', loadedItem);
      }
    }
  },
  isTexturesLoaded: function isTexturesLoaded() {
    var textures = this.textures;
    var texsLen = textures.length;

    for (var i = 0; i < texsLen; i++) {
      var tex = textures[i];

      if (!tex.loaded) {
        return false;
      }
    }

    return true;
  },

  /**
   * !#en Get the included SkeletonData used in spine runtime.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData object.
   * !#zh 获取 Spine Runtime 使用的 SkeletonData。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.SkeletonData 对象。
   * @method getRuntimeData
   * @param {Boolean} [quiet=false]
   * @return {sp.spine.SkeletonData}
   */
  getRuntimeData: function getRuntimeData(quiet) {
    if (this._skeletonCache) {
      return this._skeletonCache;
    }

    if (!(this.textures && this.textures.length > 0) && this.textureNames && this.textureNames.length > 0) {
      if (!quiet) {
        cc.errorID(7507, this.name);
      }

      return null;
    }

    var atlas = this._getAtlas(quiet);

    if (!atlas) {
      return null;
    }

    var attachmentLoader = new sp.spine.AtlasAttachmentLoader(atlas);
    var resData = null;
    var reader = null;

    if (this.skeletonJson) {
      reader = new sp.spine.SkeletonJson(attachmentLoader);
      resData = this.skeletonJson;
    } else {
      reader = new sp.spine.SkeletonBinary(attachmentLoader);
      resData = new Uint8Array(this._nativeAsset);
    }

    reader.scale = this.scale;
    this._skeletonCache = reader.readSkeletonData(resData);
    atlas.dispose();
    return this._skeletonCache;
  },
  // EDITOR
  getSkinsEnum: CC_EDITOR && function () {
    if (this._skinsEnum) {
      return this._skinsEnum;
    }

    var sd = this.getRuntimeData(true);

    if (sd) {
      var skins = sd.skins;
      var enumDef = {};

      for (var i = 0; i < skins.length; i++) {
        var name = skins[i].name;
        enumDef[name] = i;
      }

      return this._skinsEnum = cc.Enum(enumDef);
    }

    return null;
  },
  getAnimsEnum: CC_EDITOR && function () {
    if (this._animsEnum) {
      return this._animsEnum;
    }

    var sd = this.getRuntimeData(true);

    if (sd) {
      var enumDef = {
        '<None>': 0
      };
      var anims = sd.animations;

      for (var i = 0; i < anims.length; i++) {
        var name = anims[i].name;
        enumDef[name] = i + 1;
      }

      return this._animsEnum = cc.Enum(enumDef);
    }

    return null;
  },
  // PRIVATE
  _getTexture: function _getTexture(line) {
    var names = this.textureNames;

    for (var i = 0; i < names.length; i++) {
      if (names[i] === line) {
        var texture = this.textures[i];
        var tex = new sp.SkeletonTexture({
          width: texture.width,
          height: texture.height
        });
        tex.setRealTexture(texture);
        return tex;
      }
    }

    cc.errorID(7506, line);
    return null;
  },

  /**
   * @method _getAtlas
   * @param {boolean} [quiet=false]
   * @return {sp.spine.Atlas}
   * @private
   */
  _getAtlas: function _getAtlas(quiet) {
    if (this._atlasCache) {
      return this._atlasCache;
    }

    if (!this.atlasText) {
      if (!quiet) {
        cc.errorID(7508, this.name);
      }

      return null;
    }

    return this._atlasCache = new sp.spine.TextureAtlas(this.atlasText, this._getTexture.bind(this));
  },
  destroy: function destroy() {
    SkeletonCache.removeSkeleton(this._uuid);

    this._super();
  }
});
sp.SkeletonData = module.exports = SkeletonData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxza2VsZXRvbi1kYXRhLmpzIl0sIm5hbWVzIjpbIlNrZWxldG9uQ2FjaGUiLCJDQ19KU0IiLCJyZXF1aXJlIiwic2hhcmVkQ2FjaGUiLCJTa2VsZXRvbkRhdGEiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwiY3RvciIsInJlc2V0IiwicHJvcGVydGllcyIsIl9za2VsZXRvbkpzb24iLCJza2VsZXRvbkpzb25TdHIiLCJnZXQiLCJKU09OIiwic3RyaW5naWZ5Iiwic2tlbGV0b25Kc29uIiwic2V0IiwidmFsdWUiLCJwYXJzZSIsIl91dWlkIiwic2tlbGV0b24iLCJoYXNoIiwiX2F0bGFzVGV4dCIsImF0bGFzVGV4dCIsInRleHR1cmVzIiwidHlwZSIsIlRleHR1cmUyRCIsInRleHR1cmVOYW1lcyIsIlN0cmluZyIsInNjYWxlIiwiX25hdGl2ZUFzc2V0IiwiX2J1ZmZlciIsImJpbiIsImJ1ZmZlciIsIm92ZXJyaWRlIiwic3RhdGljcyIsInByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzIiwiY3JlYXRlTm9kZSIsIkNDX0VESVRPUiIsImNhbGxiYWNrIiwibm9kZSIsIk5vZGUiLCJhZGRDb21wb25lbnQiLCJzcCIsIlNrZWxldG9uIiwic2tlbGV0b25EYXRhIiwiX3NrZWxldG9uQ2FjaGUiLCJfYXRsYXNDYWNoZSIsIl9za2luc0VudW0iLCJfYW5pbXNFbnVtIiwiZW5zdXJlVGV4dHVyZXNMb2FkZWQiLCJsb2FkZWQiLCJjYWxsZXIiLCJ0ZXhzTGVuIiwibGVuZ3RoIiwiY2FsbCIsImxvYWRlZENvdW50IiwibG9hZGVkSXRlbSIsImkiLCJ0ZXgiLCJvbmNlIiwiaXNUZXh0dXJlc0xvYWRlZCIsImdldFJ1bnRpbWVEYXRhIiwicXVpZXQiLCJlcnJvcklEIiwiYXRsYXMiLCJfZ2V0QXRsYXMiLCJhdHRhY2htZW50TG9hZGVyIiwic3BpbmUiLCJBdGxhc0F0dGFjaG1lbnRMb2FkZXIiLCJyZXNEYXRhIiwicmVhZGVyIiwiU2tlbGV0b25Kc29uIiwiU2tlbGV0b25CaW5hcnkiLCJVaW50OEFycmF5IiwicmVhZFNrZWxldG9uRGF0YSIsImRpc3Bvc2UiLCJnZXRTa2luc0VudW0iLCJzZCIsInNraW5zIiwiZW51bURlZiIsIkVudW0iLCJnZXRBbmltc0VudW0iLCJhbmltcyIsImFuaW1hdGlvbnMiLCJfZ2V0VGV4dHVyZSIsImxpbmUiLCJuYW1lcyIsInRleHR1cmUiLCJTa2VsZXRvblRleHR1cmUiLCJ3aWR0aCIsImhlaWdodCIsInNldFJlYWxUZXh0dXJlIiwiVGV4dHVyZUF0bGFzIiwiYmluZCIsImRlc3Ryb3kiLCJyZW1vdmVTa2VsZXRvbiIsIl9zdXBlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHLENBQUNDLE1BQUQsSUFBV0MsT0FBTyxDQUFDLGtCQUFELENBQVAsQ0FBNEJDLFdBQTNEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxZQUFZLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsaUJBRGtCO0FBRXhCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGWTtBQUl4QkMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsU0FBS0MsS0FBTDtBQUNILEdBTnVCO0FBUXhCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFLElBRFA7QUFHUjtBQUNBQyxJQUFBQSxlQUFlLEVBQUU7QUFDYkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixZQUFJLEtBQUtGLGFBQVQsRUFBd0I7QUFDcEIsaUJB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LE9BQVAsR0FBaUJqRyxZQUFuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgc3BcclxuICovXHJcbmxldCBTa2VsZXRvbkNhY2hlID0gIUNDX0pTQiAmJiByZXF1aXJlKCcuL3NrZWxldG9uLWNhY2hlJykuc2hhcmVkQ2FjaGU7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgc2tlbGV0b24gZGF0YSBvZiBzcGluZS5cclxuICogISN6aCBTcGluZSDnmoQg6aqo6aq85pWw5o2u44CCXHJcbiAqIEBjbGFzcyBTa2VsZXRvbkRhdGFcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcbmxldCBTa2VsZXRvbkRhdGEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnc3AuU2tlbGV0b25EYXRhJyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfc2tlbGV0b25Kc29uOiBudWxsLFxyXG5cclxuICAgICAgICAvLyB1c2UgYnkganNiXHJcbiAgICAgICAgc2tlbGV0b25Kc29uU3RyOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uSnNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9za2VsZXRvbkpzb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gU2VlIGh0dHA6Ly9lbi5lc290ZXJpY3NvZnR3YXJlLmNvbS9zcGluZS1qc29uLWZvcm1hdFxyXG4gICAgICAgICAqICEjemgg5Y+v5p+l55yLIFNwaW5lIOWumOaWueaWh+ahoyBodHRwOi8vemguZXNvdGVyaWNzb2Z0d2FyZS5jb20vc3BpbmUtanNvbi1mb3JtYXRcclxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdH0gc2tlbGV0b25Kc29uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2tlbGV0b25Kc29uOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NrZWxldG9uSnNvbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YodmFsdWUpID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkpzb24gPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25Kc29uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBjcmVhdGUgYnkgbWFudWFsLCB1dWlkIGlzIGVtcHR5LlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl91dWlkICYmIHZhbHVlLnNrZWxldG9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXVpZCA9IHZhbHVlLnNrZWxldG9uLmhhc2g7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfYXRsYXNUZXh0OiBcIlwiLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gYXRsYXNUZXh0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXRsYXNUZXh0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2F0bGFzVGV4dDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F0bGFzVGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtUZXh0dXJlMkRbXX0gdGV4dHVyZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0ZXh0dXJlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlRleHR1cmUyRF1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB0ZXh0dXJlTmFtZXNcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRleHR1cmVOYW1lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlN0cmluZ11cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogQSBzY2FsZSBjYW4gYmUgc3BlY2lmaWVkIG9uIHRoZSBKU09OIG9yIGJpbmFyeSBsb2FkZXIgd2hpY2ggd2lsbCBzY2FsZSB0aGUgYm9uZSBwb3NpdGlvbnMsXHJcbiAgICAgICAgICogaW1hZ2Ugc2l6ZXMsIGFuZCBhbmltYXRpb24gdHJhbnNsYXRpb25zLlxyXG4gICAgICAgICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCB3aGVuIHVzaW5nIGRpZmZlcmVudCBzaXplZCBpbWFnZXMgdGhhbiB3ZXJlIHVzZWQgd2hlbiBkZXNpZ25pbmcgdGhlIHNrZWxldG9uXHJcbiAgICAgICAgICogaW4gU3BpbmUuIEZvciBleGFtcGxlLCBpZiB1c2luZyBpbWFnZXMgdGhhdCBhcmUgaGFsZiB0aGUgc2l6ZSB0aGFuIHdlcmUgdXNlZCBpbiBTcGluZSxcclxuICAgICAgICAgKiBhIHNjYWxlIG9mIDAuNSBjYW4gYmUgdXNlZC4gVGhpcyBpcyBjb21tb25seSB1c2VkIGZvciBnYW1lcyB0aGF0IGNhbiBydW4gd2l0aCBlaXRoZXIgbG93IG9yIGhpZ2hcclxuICAgICAgICAgKiByZXNvbHV0aW9uIHRleHR1cmUgYXRsYXNlcy5cclxuICAgICAgICAgKiBzZWUgaHR0cDovL2VuLmVzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXVzaW5nLXJ1bnRpbWVzI1NjYWxpbmdcclxuICAgICAgICAgKiAhI3poIOWPr+afpeeciyBTcGluZSDlrpjmlrnmlofmoaPvvJogaHR0cDovL3poLmVzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXVzaW5nLXJ1bnRpbWVzI1NjYWxpbmdcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc2NhbGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2FsZTogMSxcclxuXHJcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKGJpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVmZmVyID0gYmluLmJ1ZmZlciB8fCBiaW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIHByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBQVUJMSUNcclxuXHJcbiAgICBjcmVhdGVOb2RlOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSh0aGlzLm5hbWUpO1xyXG4gICAgICAgIGxldCBza2VsZXRvbiA9IG5vZGUuYWRkQ29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICBza2VsZXRvbi5za2VsZXRvbkRhdGEgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtzcC5zcGluZS5Ta2VsZXRvbkRhdGF9IF9za2VsZXRvbkRhdGFcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ2FjaGUgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7c3Auc3BpbmUuQXRsYXN9IF9hdGxhc0NhY2hlXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9hdGxhc0NhY2hlID0gbnVsbDtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NraW5zRW51bSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1zRW51bSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBlbnN1cmVUZXh0dXJlc0xvYWRlZCAobG9hZGVkLCBjYWxsZXIpIHtcclxuICAgICAgICBsZXQgdGV4dHVyZXMgPSB0aGlzLnRleHR1cmVzOyBcclxuICAgICAgICBsZXQgdGV4c0xlbiA9IHRleHR1cmVzLmxlbmd0aDtcclxuICAgICAgICBpZiAodGV4c0xlbiA9PSAwKSB7XHJcbiAgICAgICAgICAgIGxvYWRlZC5jYWxsKGNhbGxlciwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsb2FkZWRDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGxvYWRlZEl0ZW0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxvYWRlZENvdW50Kys7XHJcbiAgICAgICAgICAgIGlmIChsb2FkZWRDb3VudCA+PSB0ZXhzTGVuKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgJiYgbG9hZGVkLmNhbGwoY2FsbGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXhzTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRleCA9IHRleHR1cmVzW2ldO1xyXG4gICAgICAgICAgICBpZiAodGV4LmxvYWRlZCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkSXRlbSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGV4Lm9uY2UoJ2xvYWQnLCBsb2FkZWRJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNUZXh0dXJlc0xvYWRlZCAoKSB7XHJcbiAgICAgICAgbGV0IHRleHR1cmVzID0gdGhpcy50ZXh0dXJlczsgXHJcbiAgICAgICAgbGV0IHRleHNMZW4gPSB0ZXh0dXJlcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXhzTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRleCA9IHRleHR1cmVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXRleC5sb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCB0aGUgaW5jbHVkZWQgU2tlbGV0b25EYXRhIHVzZWQgaW4gc3BpbmUgcnVudGltZS48YnI+XHJcbiAgICAgKiBSZXR1cm5zIGEge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5Ta2VsZXRvbkRhdGEgb2JqZWN0LlxyXG4gICAgICogISN6aCDojrflj5YgU3BpbmUgUnVudGltZSDkvb/nlKjnmoQgU2tlbGV0b25EYXRh44CCPGJyPlxyXG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uU2tlbGV0b25EYXRhIOWvueixoeOAglxyXG4gICAgICogQG1ldGhvZCBnZXRSdW50aW1lRGF0YVxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcXVpZXQ9ZmFsc2VdXHJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5Ta2VsZXRvbkRhdGF9XHJcbiAgICAgKi9cclxuICAgIGdldFJ1bnRpbWVEYXRhOiBmdW5jdGlvbiAocXVpZXQpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b25DYWNoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tlbGV0b25DYWNoZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggISh0aGlzLnRleHR1cmVzICYmIHRoaXMudGV4dHVyZXMubGVuZ3RoID4gMCkgJiYgdGhpcy50ZXh0dXJlTmFtZXMgJiYgdGhpcy50ZXh0dXJlTmFtZXMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgaWYgKCAhcXVpZXQgKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDc1MDcsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXRsYXMgPSB0aGlzLl9nZXRBdGxhcyhxdWlldCk7XHJcbiAgICAgICAgaWYgKCEgYXRsYXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdHRhY2htZW50TG9hZGVyID0gbmV3IHNwLnNwaW5lLkF0bGFzQXR0YWNobWVudExvYWRlcihhdGxhcyk7XHJcblxyXG4gICAgICAgIGxldCByZXNEYXRhID0gbnVsbDtcclxuICAgICAgICBsZXQgcmVhZGVyID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5za2VsZXRvbkpzb24pIHtcclxuICAgICAgICAgICAgcmVhZGVyID0gbmV3IHNwLnNwaW5lLlNrZWxldG9uSnNvbihhdHRhY2htZW50TG9hZGVyKTtcclxuICAgICAgICAgICAgcmVzRGF0YSA9IHRoaXMuc2tlbGV0b25Kc29uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlYWRlciA9IG5ldyBzcC5zcGluZS5Ta2VsZXRvbkJpbmFyeShhdHRhY2htZW50TG9hZGVyKTtcclxuICAgICAgICAgICAgcmVzRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX25hdGl2ZUFzc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlYWRlci5zY2FsZSA9IHRoaXMuc2NhbGU7XHJcbiAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZSA9IHJlYWRlci5yZWFkU2tlbGV0b25EYXRhKHJlc0RhdGEpO1xyXG4gICAgICAgIGF0bGFzLmRpc3Bvc2UoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NrZWxldG9uQ2FjaGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEVESVRPUlxyXG5cclxuICAgIGdldFNraW5zRW51bTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tpbnNFbnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9za2luc0VudW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZCA9IHRoaXMuZ2V0UnVudGltZURhdGEodHJ1ZSk7XHJcbiAgICAgICAgaWYgKHNkKSB7XHJcbiAgICAgICAgICAgIGxldCBza2lucyA9IHNkLnNraW5zO1xyXG4gICAgICAgICAgICBsZXQgZW51bURlZiA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNraW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHNraW5zW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBlbnVtRGVmW25hbWVdID0gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tpbnNFbnVtID0gY2MuRW51bShlbnVtRGVmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFuaW1zRW51bTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYW5pbXNFbnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmltc0VudW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZCA9IHRoaXMuZ2V0UnVudGltZURhdGEodHJ1ZSk7XHJcbiAgICAgICAgaWYgKHNkKSB7XHJcbiAgICAgICAgICAgIGxldCBlbnVtRGVmID0geyAnPE5vbmU+JzogMCB9O1xyXG4gICAgICAgICAgICBsZXQgYW5pbXMgPSBzZC5hbmltYXRpb25zO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFuaW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGFuaW1zW2ldLm5hbWU7XHJcbiAgICAgICAgICAgICAgICBlbnVtRGVmW25hbWVdID0gaSArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1zRW51bSA9IGNjLkVudW0oZW51bURlZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBQUklWQVRFXHJcblxyXG4gICAgX2dldFRleHR1cmU6IGZ1bmN0aW9uIChsaW5lKSB7XHJcbiAgICAgICAgbGV0IG5hbWVzID0gdGhpcy50ZXh0dXJlTmFtZXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobmFtZXNbaV0gPT09IGxpbmUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXggPSBuZXcgc3AuU2tlbGV0b25UZXh0dXJlKHsgd2lkdGg6IHRleHR1cmUud2lkdGgsIGhlaWdodDogdGV4dHVyZS5oZWlnaHQgfSk7XHJcbiAgICAgICAgICAgICAgICB0ZXguc2V0UmVhbFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmVycm9ySUQoNzUwNiwgbGluZSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBfZ2V0QXRsYXNcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3F1aWV0PWZhbHNlXVxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuQXRsYXN9XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBfZ2V0QXRsYXM6IGZ1bmN0aW9uIChxdWlldCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdGxhc0NhY2hlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hdGxhc0NhY2hlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCAhdGhpcy5hdGxhc1RleHQgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXF1aWV0ICkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3NTA4LCB0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0bGFzQ2FjaGUgPSBuZXcgc3Auc3BpbmUuVGV4dHVyZUF0bGFzKHRoaXMuYXRsYXNUZXh0LCB0aGlzLl9nZXRUZXh0dXJlLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95ICgpIHtcclxuICAgICAgICBTa2VsZXRvbkNhY2hlLnJlbW92ZVNrZWxldG9uKHRoaXMuX3V1aWQpO1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbnNwLlNrZWxldG9uRGF0YSA9IG1vZHVsZS5leHBvcnRzID0gU2tlbGV0b25EYXRhO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==