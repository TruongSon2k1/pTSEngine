
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/CCMaterial.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Asset = require('../CCAsset');

var Texture = require('../CCTexture2D');

var PixelFormat = Texture.PixelFormat;

var EffectAsset = require('./CCEffectAsset');

var textureUtil = require('../../utils/texture-util');

var gfx = cc.gfx;
/**
 * !#en Material builtin name
 * !#zh 内置材质名字
 * @enum Material.BUILTIN_NAME
 */

var BUILTIN_NAME = cc.Enum({
  /**
   * @property SPRITE
   * @readonly
   * @type {String}
   */
  SPRITE: '2d-sprite',

  /**
   * @property GRAY_SPRITE
   * @readonly
   * @type {String}
   */
  GRAY_SPRITE: '2d-gray-sprite',

  /**
   * @property UNLIT
   * @readonly
   * @type {String}
   */
  UNLIT: 'unlit'
});
/**
 * !#en Material Asset.
 * !#zh 材质资源类。
 * @class Material
 * @extends Asset
 */

var Material = cc.Class({
  name: 'cc.Material',
  "extends": Asset,
  ctor: function ctor() {
    this.loaded = false;
    this._manualHash = false;
    this._dirty = true;
    this._effect = null;
  },
  properties: {
    // deprecated
    _defines: {
      "default": undefined,
      type: Object
    },
    // deprecated
    _props: {
      "default": undefined,
      type: Object
    },
    _effectAsset: {
      type: EffectAsset,
      "default": null
    },
    _techniqueIndex: 0,
    _techniqueData: Object,
    effectName: CC_EDITOR ? {
      get: function get() {
        return this._effectAsset && this._effectAsset.name;
      },
      set: function set(val) {
        var effectAsset = cc.assetManager.builtins.getBuiltin('effect', val);

        if (!effectAsset) {
          Editor.warn("no effect named '" + val + "' found");
          return;
        }

        this.effectAsset = effectAsset;
      }
    } : undefined,
    effectAsset: {
      get: function get() {
        return this._effectAsset;
      },
      set: function set(asset) {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          return;
        }

        this._effectAsset = asset;

        if (!asset) {
          cc.error('Can not set an empty effect asset.');
          return;
        }

        this._effect = this._effectAsset.getInstantiatedEffect();
      }
    },
    effect: {
      get: function get() {
        return this._effect;
      }
    },
    techniqueIndex: {
      get: function get() {
        return this._techniqueIndex;
      },
      set: function set(v) {
        this._techniqueIndex = v;

        this._effect.switchTechnique(v);
      }
    }
  },
  statics: {
    /**
     * !#en Get built-in materials
     * !#zh 获取内置材质
     * @static
     * @method getBuiltinMaterial
     * @param {string} name 
     * @return {Material}
     */
    getBuiltinMaterial: function getBuiltinMaterial(name) {
      if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        return new cc.Material();
      }

      return cc.assetManager.builtins.getBuiltin('material', 'builtin-' + name);
    },
    BUILTIN_NAME: BUILTIN_NAME,

    /**
     * !#en Creates a Material with builtin Effect.
     * !#zh 使用内建 Effect 创建一个材质。
     * @static
     * @method createWithBuiltin
     * @param {string} effectName 
     * @param {number} [techniqueIndex] 
     * @return {Material}
     */
    createWithBuiltin: function createWithBuiltin(effectName, techniqueIndex) {
      if (techniqueIndex === void 0) {
        techniqueIndex = 0;
      }

      var effectAsset = cc.assetManager.builtins.getBuiltin('effect', 'builtin-' + effectName);
      return Material.create(effectAsset, techniqueIndex);
    },

    /**
     * !#en Creates a Material.
     * !#zh 创建一个材质。
     * @static
     * @method create
     * @param {EffectAsset} effectAsset 
     * @param {number} [techniqueIndex] 
     * @return {Material}
     */
    create: function create(effectAsset, techniqueIndex) {
      if (techniqueIndex === void 0) {
        techniqueIndex = 0;
      }

      if (!effectAsset) return null;
      var material = new Material();
      material.effectAsset = effectAsset;
      material.techniqueIndex = techniqueIndex;
      return material;
    }
  },

  /**
   * !#en Sets the Material property
   * !#zh 设置材质的属性
   * @method setProperty
   * @param {string} name
   * @param {Object} val
   * @param {number} [passIdx]
   * @param {boolean} [directly]
   */
  setProperty: function setProperty(name, val, passIdx, directly) {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return;

    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    if (val instanceof Texture) {
      var isAlphaAtlas = val.isAlphaAtlas();
      var key = 'CC_USE_ALPHA_ATLAS_' + name;
      var def = this.getDefine(key, passIdx);

      if (isAlphaAtlas || def) {
        this.define(key, isAlphaAtlas);
      }

      if (!val.loaded) {
        cc.assetManager.postLoadNative(val);
      }
    }

    this._effect.setProperty(name, val, passIdx, directly);
  },

  /**
   * !#en Gets the Material property.
   * !#zh 获取材质的属性。
   * @method getProperty
   * @param {string} name 
   * @param {number} passIdx 
   * @return {Object}
   */
  getProperty: function getProperty(name, passIdx) {
    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    return this._effect.getProperty(name, passIdx);
  },

  /**
   * !#en Sets the Material define.
   * !#zh 设置材质的宏定义。
   * @method define
   * @param {string} name
   * @param {boolean|number} val
   * @param {number} [passIdx]
   * @param {boolean} [force]
   */
  define: function define(name, val, passIdx, force) {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) return;

    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    this._effect.define(name, val, passIdx, force);
  },

  /**
   * !#en Gets the Material define.
   * !#zh 获取材质的宏定义。
   * @method getDefine
   * @param {string} name 
   * @param {number} [passIdx] 
   * @return {boolean|number}
   */
  getDefine: function getDefine(name, passIdx) {
    if (typeof passIdx === 'string') {
      passIdx = parseInt(passIdx);
    }

    return this._effect.getDefine(name, passIdx);
  },

  /**
   * !#en Sets the Material cull mode.
   * !#zh 设置材质的裁减模式。
   * @method setCullMode
   * @param {number} cullMode 
   * @param {number} passIdx 
   */
  setCullMode: function setCullMode(cullMode, passIdx) {
    if (cullMode === void 0) {
      cullMode = gfx.CULL_BACK;
    }

    this._effect.setCullMode(cullMode, passIdx);
  },

  /**
   * !#en Sets the Material depth states.
   * !#zh 设置材质的深度渲染状态。
   * @method setDepth
   * @param {boolean} depthTest 
   * @param {boolean} depthWrite 
   * @param {number} depthFunc 
   * @param {number} passIdx 
   */
  setDepth: function setDepth(depthTest, depthWrite, depthFunc, passIdx) {
    if (depthTest === void 0) {
      depthTest = false;
    }

    if (depthWrite === void 0) {
      depthWrite = false;
    }

    if (depthFunc === void 0) {
      depthFunc = gfx.DS_FUNC_LESS;
    }

    this._effect.setDepth(depthTest, depthWrite, depthFunc, passIdx);
  },

  /**
   * !#en Sets the Material blend states.
   * !#zh 设置材质的混合渲染状态。
   * @method setBlend
   * @param {boolean} enabled 
   * @param {number} blendEq 
   * @param {number} blendSrc 
   * @param {number} blendDst 
   * @param {number} blendAlphaEq 
   * @param {number} blendSrcAlpha 
   * @param {number} blendDstAlpha 
   * @param {number} blendColor 
   * @param {number} passIdx 
   */
  setBlend: function setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor, passIdx) {
    if (enabled === void 0) {
      enabled = false;
    }

    if (blendEq === void 0) {
      blendEq = gfx.BLEND_FUNC_ADD;
    }

    if (blendSrc === void 0) {
      blendSrc = gfx.BLEND_SRC_ALPHA;
    }

    if (blendDst === void 0) {
      blendDst = gfx.BLEND_ONE_MINUS_SRC_ALPHA;
    }

    if (blendAlphaEq === void 0) {
      blendAlphaEq = gfx.BLEND_FUNC_ADD;
    }

    if (blendSrcAlpha === void 0) {
      blendSrcAlpha = gfx.BLEND_SRC_ALPHA;
    }

    if (blendDstAlpha === void 0) {
      blendDstAlpha = gfx.BLEND_ONE_MINUS_SRC_ALPHA;
    }

    if (blendColor === void 0) {
      blendColor = 0xffffffff;
    }

    this._effect.setBlend(enabled, blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor, passIdx);
  },

  /**
   * !#en Sets whether enable the stencil test.
   * !#zh 设置是否开启模板测试。
   * @method setStencilEnabled
   * @param {number} stencilTest 
   * @param {number} passIdx 
   */
  setStencilEnabled: function setStencilEnabled(stencilTest, passIdx) {
    if (stencilTest === void 0) {
      stencilTest = gfx.STENCIL_INHERIT;
    }

    this._effect.setStencilEnabled(stencilTest, passIdx);
  },

  /**
   * !#en Sets the Material stencil render states.
   * !#zh 设置材质的模板测试渲染参数。
   * @method setStencil
   * @param {number} stencilTest 
   * @param {number} stencilFunc 
   * @param {number} stencilRef 
   * @param {number} stencilMask 
   * @param {number} stencilFailOp 
   * @param {number} stencilZFailOp 
   * @param {number} stencilZPassOp 
   * @param {number} stencilWriteMask 
   * @param {number} passIdx 
   */
  setStencil: function setStencil(stencilTest, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask, passIdx) {
    if (stencilTest === void 0) {
      stencilTest = gfx.STENCIL_INHERIT;
    }

    if (stencilFunc === void 0) {
      stencilFunc = gfx.DS_FUNC_ALWAYS;
    }

    if (stencilRef === void 0) {
      stencilRef = 0;
    }

    if (stencilMask === void 0) {
      stencilMask = 0xff;
    }

    if (stencilFailOp === void 0) {
      stencilFailOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilZFailOp === void 0) {
      stencilZFailOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilZPassOp === void 0) {
      stencilZPassOp = gfx.STENCIL_OP_KEEP;
    }

    if (stencilWriteMask === void 0) {
      stencilWriteMask = 0xff;
    }

    this._effect.setStencil(stencilTest, stencilFunc, stencilRef, stencilMask, stencilFailOp, stencilZFailOp, stencilZPassOp, stencilWriteMask, passIdx);
  },
  updateHash: function updateHash(hash) {
    this._manualHash = hash;
    this._effect && this._effect.updateHash(hash);
  },
  getHash: function getHash() {
    return this._manualHash || this._effect && this._effect.getHash();
  },
  onLoad: function onLoad() {
    this.effectAsset = this._effectAsset;
    if (!this._effect) return;

    if (this._techniqueIndex) {
      this._effect.switchTechnique(this._techniqueIndex);
    }

    this._techniqueData = this._techniqueData || {};
    var passDatas = this._techniqueData;

    for (var index in passDatas) {
      index = parseInt(index);
      var passData = passDatas[index];
      if (!passData) continue;

      for (var def in passData.defines) {
        this.define(def, passData.defines[def], index);
      }

      for (var prop in passData.props) {
        this.setProperty(prop, passData.props[prop], index);
      }
    }
  }
});
var _default = Material;
exports["default"] = _default;
cc.Material = Material;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXENDTWF0ZXJpYWwuanMiXSwibmFtZXMiOlsiQXNzZXQiLCJyZXF1aXJlIiwiVGV4dHVyZSIsIlBpeGVsRm9ybWF0IiwiRWZmZWN0QXNzZXQiLCJ0ZXh0dXJlVXRpbCIsImdmeCIsImNjIiwiQlVJTFRJTl9OQU1FIiwiRW51bSIsIlNQUklURSIsIkdSQVlfU1BSSVRFIiwiVU5MSVQiLCJNYXRlcmlhbCIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJsb2FkZWQiLCJfbWFudWFsSGFzaCIsIl9kaXJ0eSIsIl9lZmZlY3QiLCJwcm9wZXJ0aWVzIiwiX2RlZmluZXMiLCJ1bmRlZmluZWQiLCJ0eXBlIiwiT2JqZWN0IiwiX3Byb3BzIiwiX2VmZmVjdEFzc2V0IiwiX3RlY2huaXF1ZUluZGV4IiwiX3RlY2huaXF1ZURhdGEiLCJlZmZlY3ROYW1lIiwiQ0NfRURJVE9SIiwiZ2V0Iiwic2V0IiwidmFsIiwiZWZmZWN0QXNzZXQiLCJhc3NldE1hbmFnZXIiLCJidWlsdGlucyIsImdldEJ1aWx0aW4iLCJFZGl0b3IiLCJ3YXJuIiwiYXNzZXQiLCJnYW1lIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsImVycm9yIiwiZ2V0SW5zdGFudGlhdGVkRWZmZWN0IiwiZWZmZWN0IiwidGVjaG5pcXVlSW5kZXgiLCJ2Iiwic3dpdGNoVGVjaG5pcXVlIiwic3RhdGljcyIsImdldEJ1aWx0aW5NYXRlcmlhbCIsImNyZWF0ZVdpdGhCdWlsdGluIiwiY3JlYXRlIiwibWF0ZXJpYWwiLCJzZXRQcm9wZXJ0eSIsInBhc3NJZHgiLCJkaXJlY3RseSIsInBhcnNlSW50IiwiaXNBbHBoYUF0bGFzIiwia2V5IiwiZGVmIiwiZ2V0RGVmaW5lIiwiZGVmaW5lIiwicG9zdExvYWROYXRpdmUiLCJnZXRQcm9wZXJ0eSIsImZvcmNlIiwic2V0Q3VsbE1vZGUiLCJjdWxsTW9kZSIsIkNVTExfQkFDSyIsInNldERlcHRoIiwiZGVwdGhUZXN0IiwiZGVwdGhXcml0ZSIsImRlcHRoRnVuYyIsIkRTX0ZVTkNfTEVTUyIsInNldEJsZW5kIiwiZW5hYmxlZCIsImJsZW5kRXEiLCJibGVuZFNyYyIsImJsZW5kRHN0IiwiYmxlbmRBbHBoYUVxIiwiYmxlbmRTcmNBbHBoYSIsImJsZW5kRHN0QWxwaGEiLCJibGVuZENvbG9yIiwiQkxFTkRfRlVOQ19BREQiLCJCTEVORF9TUkNfQUxQSEEiLCJCTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBIiwic2V0U3RlbmNpbEVuYWJsZWQiLCJzdGVuY2lsVGVzdCIsIlNURU5DSUxfSU5IRVJJVCIsInNldFN0ZW5jaWwiLCJzdGVuY2lsRnVuYyIsInN0ZW5jaWxSZWYiLCJzdGVuY2lsTWFzayIsInN0ZW5jaWxGYWlsT3AiLCJzdGVuY2lsWkZhaWxPcCIsInN0ZW5jaWxaUGFzc09wIiwic3RlbmNpbFdyaXRlTWFzayIsIkRTX0ZVTkNfQUxXQVlTIiwiU1RFTkNJTF9PUF9LRUVQIiwidXBkYXRlSGFzaCIsImhhc2giLCJnZXRIYXNoIiwib25Mb2FkIiwicGFzc0RhdGFzIiwiaW5kZXgiLCJwYXNzRGF0YSIsImRlZmluZXMiLCJwcm9wIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUNBLElBQU1DLE9BQU8sR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQXZCOztBQUNBLElBQU1FLFdBQVcsR0FBR0QsT0FBTyxDQUFDQyxXQUE1Qjs7QUFDQSxJQUFNQyxXQUFXLEdBQUdILE9BQU8sQ0FBQyxpQkFBRCxDQUEzQjs7QUFDQSxJQUFNSSxXQUFXLEdBQUdKLE9BQU8sQ0FBQywwQkFB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QUFpQjlDLEdBQWpCLENBQWpCLEVBQXdDNEMsS0FBeEM7QUFDSDs7QUFDRCxXQUFLLElBQUlHLElBQVQsSUFBaUJGLFFBQVEsQ0FBQ0csS0FBMUIsRUFBaUM7QUFDN0IsYUFBS3RELFdBQUwsQ0FBaUJxRCxJQUFqQixFQUF1QkYsUUFBUSxDQUFDRyxLQUFULENBQWVELElBQWYsQ0FBdkIsRUFBNkNILEtBQTdDO0FBQ0g7QUFDSjtBQUVKO0FBbFZtQixDQUFULENBQWY7ZUFxVmU3Rjs7QUFDZk4sRUFBRSxDQUFDTSxRQUFILEdBQWNBLFFBQWQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQXNzZXQgPSByZXF1aXJlKCcuLi9DQ0Fzc2V0Jyk7XHJcbmNvbnN0IFRleHR1cmUgPSByZXF1aXJlKCcuLi9DQ1RleHR1cmUyRCcpO1xyXG5jb25zdCBQaXhlbEZvcm1hdCA9IFRleHR1cmUuUGl4ZWxGb3JtYXQ7XHJcbmNvbnN0IEVmZmVjdEFzc2V0ID0gcmVxdWlyZSgnLi9DQ0VmZmVjdEFzc2V0Jyk7XHJcbmNvbnN0IHRleHR1cmVVdGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdGV4dHVyZS11dGlsJyk7XHJcbmNvbnN0IGdmeCA9IGNjLmdmeDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIE1hdGVyaWFsIGJ1aWx0aW4gbmFtZVxyXG4gKiAhI3poIOWGhee9ruadkOi0qOWQjeWtl1xyXG4gKiBAZW51bSBNYXRlcmlhbC5CVUlMVElOX05BTUVcclxuICovXHJcbmNvbnN0IEJVSUxUSU5fTkFNRSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgU1BSSVRFXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIFNQUklURTogJzJkLXNwcml0ZScsXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBHUkFZX1NQUklURVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBHUkFZX1NQUklURTogJzJkLWdyYXktc3ByaXRlJyxcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFVOTElUXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIFVOTElUOiAndW5saXQnLFxyXG59KTtcclxuXHJcblxyXG4vKipcclxuICogISNlbiBNYXRlcmlhbCBBc3NldC5cclxuICogISN6aCDmnZDotKjotYTmupDnsbvjgIJcclxuICogQGNsYXNzIE1hdGVyaWFsXHJcbiAqIEBleHRlbmRzIEFzc2V0XHJcbiAqL1xyXG5sZXQgTWF0ZXJpYWwgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTWF0ZXJpYWwnLFxyXG4gICAgZXh0ZW5kczogQXNzZXQsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tYW51YWxIYXNoID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBkZXByZWNhdGVkXHJcbiAgICAgICAgX2RlZmluZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3RcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIGRlcHJlY2F0ZWRcclxuICAgICAgICBfcHJvcHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3RcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfZWZmZWN0QXNzZXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogRWZmZWN0QXNzZXQsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3RlY2huaXF1ZUluZGV4OiAwLFxyXG4gICAgICAgIF90ZWNobmlxdWVEYXRhOiBPYmplY3QsXHJcblxyXG4gICAgICAgIGVmZmVjdE5hbWU6IENDX0VESVRPUiA/IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3RBc3NldCAmJiB0aGlzLl9lZmZlY3RBc3NldC5uYW1lO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVmZmVjdEFzc2V0ID0gY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLmdldEJ1aWx0aW4oJ2VmZmVjdCcsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVmZmVjdEFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdG9yLndhcm4oYG5vIGVmZmVjdCBuYW1lZCAnJHt2YWx9JyBmb3VuZGApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0QXNzZXQgPSBlZmZlY3RBc3NldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgIGVmZmVjdEFzc2V0OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0QXNzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAoYXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdEFzc2V0ID0gYXNzZXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoJ0NhbiBub3Qgc2V0IGFuIGVtcHR5IGVmZmVjdCBhc3NldC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWZmZWN0ID0gdGhpcy5fZWZmZWN0QXNzZXQuZ2V0SW5zdGFudGlhdGVkRWZmZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlZmZlY3Q6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0ZWNobmlxdWVJbmRleDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RlY2huaXF1ZUluZGV4O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RlY2huaXF1ZUluZGV4ID0gdjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdC5zd2l0Y2hUZWNobmlxdWUodik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEdldCBidWlsdC1pbiBtYXRlcmlhbHNcclxuICAgICAgICAgKiAhI3poIOiOt+WPluWGhee9ruadkOi0qFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAbWV0aG9kIGdldEJ1aWx0aW5NYXRlcmlhbFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICAgICAqIEByZXR1cm4ge01hdGVyaWFsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEJ1aWx0aW5NYXRlcmlhbCAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjYy5NYXRlcmlhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignbWF0ZXJpYWwnLCAnYnVpbHRpbi0nICsgbmFtZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQlVJTFRJTl9OQU1FLFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQ3JlYXRlcyBhIE1hdGVyaWFsIHdpdGggYnVpbHRpbiBFZmZlY3QuXHJcbiAgICAgICAgICogISN6aCDkvb/nlKjlhoXlu7ogRWZmZWN0IOWIm+W7uuS4gOS4quadkOi0qOOAglxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVdpdGhCdWlsdGluXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGVmZmVjdE5hbWUgXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFt0ZWNobmlxdWVJbmRleF0gXHJcbiAgICAgICAgICogQHJldHVybiB7TWF0ZXJpYWx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3JlYXRlV2l0aEJ1aWx0aW4gKGVmZmVjdE5hbWUsIHRlY2huaXF1ZUluZGV4ID0gMCkge1xyXG4gICAgICAgICAgICBsZXQgZWZmZWN0QXNzZXQgPSBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignZWZmZWN0JywgJ2J1aWx0aW4tJyArIGVmZmVjdE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0ZXJpYWwuY3JlYXRlKGVmZmVjdEFzc2V0LCB0ZWNobmlxdWVJbmRleCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIENyZWF0ZXMgYSBNYXRlcmlhbC5cclxuICAgICAgICAgKiAhI3poIOWIm+W7uuS4gOS4quadkOi0qOOAglxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7RWZmZWN0QXNzZXR9IGVmZmVjdEFzc2V0IFxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGVjaG5pcXVlSW5kZXhdIFxyXG4gICAgICAgICAqIEByZXR1cm4ge01hdGVyaWFsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZSAoZWZmZWN0QXNzZXQsIHRlY2huaXF1ZUluZGV4ID0gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWVmZmVjdEFzc2V0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbmV3IE1hdGVyaWFsKCk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmVmZmVjdEFzc2V0ID0gZWZmZWN0QXNzZXQ7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLnRlY2huaXF1ZUluZGV4ID0gdGVjaG5pcXVlSW5kZXg7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBwcm9wZXJ0eVxyXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTlsZ7mgKdcclxuICAgICAqIEBtZXRob2Qgc2V0UHJvcGVydHlcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3Bhc3NJZHhdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkaXJlY3RseV1cclxuICAgICAqL1xyXG4gICAgc2V0UHJvcGVydHkgKG5hbWUsIHZhbCwgcGFzc0lkeCwgZGlyZWN0bHkpIHtcclxuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHBhc3NJZHggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHBhc3NJZHggPSBwYXJzZUludChwYXNzSWR4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0FscGhhQXRsYXMgPSB2YWwuaXNBbHBoYUF0bGFzKCk7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSAnQ0NfVVNFX0FMUEhBX0FUTEFTXycgKyBuYW1lO1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gdGhpcy5nZXREZWZpbmUoa2V5LCBwYXNzSWR4KTtcclxuICAgICAgICAgICAgaWYgKGlzQWxwaGFBdGxhcyB8fCBkZWYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lKGtleSwgaXNBbHBoYUF0bGFzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXZhbC5sb2FkZWQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0UHJvcGVydHkobmFtZSwgdmFsLCBwYXNzSWR4LCBkaXJlY3RseSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIHRoZSBNYXRlcmlhbCBwcm9wZXJ0eS5cclxuICAgICAqICEjemgg6I635Y+W5p2Q6LSo55qE5bGe5oCn44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXNzSWR4IFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRQcm9wZXJ0eSAobmFtZSwgcGFzc0lkeCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGFzc0lkeCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcGFzc0lkeCA9IHBhcnNlSW50KHBhc3NJZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0LmdldFByb3BlcnR5KG5hbWUsIHBhc3NJZHgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgZGVmaW5lLlxyXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTlro/lrprkuYnjgIJcclxuICAgICAqIEBtZXRob2QgZGVmaW5lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufG51bWJlcn0gdmFsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW3Bhc3NJZHhdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JjZV1cclxuICAgICAqL1xyXG4gICAgZGVmaW5lIChuYW1lLCB2YWwsIHBhc3NJZHgsIGZvcmNlKSB7XHJcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXNzSWR4ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBwYXNzSWR4ID0gcGFyc2VJbnQocGFzc0lkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VmZmVjdC5kZWZpbmUobmFtZSwgdmFsLCBwYXNzSWR4LCBmb3JjZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIHRoZSBNYXRlcmlhbCBkZWZpbmUuXHJcbiAgICAgKiAhI3poIOiOt+WPluadkOi0qOeahOWuj+WumuS5ieOAglxyXG4gICAgICogQG1ldGhvZCBnZXREZWZpbmVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtwYXNzSWR4XSBcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXREZWZpbmUgKG5hbWUsIHBhc3NJZHgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBhc3NJZHggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHBhc3NJZHggPSBwYXJzZUludChwYXNzSWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdC5nZXREZWZpbmUobmFtZSwgcGFzc0lkeCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBjdWxsIG1vZGUuXHJcbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOijgeWHj+aooeW8j+OAglxyXG4gICAgICogQG1ldGhvZCBzZXRDdWxsTW9kZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1bGxNb2RlIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBhc3NJZHggXHJcbiAgICAgKi9cclxuICAgIHNldEN1bGxNb2RlIChjdWxsTW9kZSA9IGdmeC5DVUxMX0JBQ0ssIHBhc3NJZHgpIHtcclxuICAgICAgICB0aGlzLl9lZmZlY3Quc2V0Q3VsbE1vZGUoY3VsbE1vZGUsIHBhc3NJZHgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgTWF0ZXJpYWwgZGVwdGggc3RhdGVzLlxyXG4gICAgICogISN6aCDorr7nva7mnZDotKjnmoTmt7HluqbmuLLmn5PnirbmgIHjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RGVwdGhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZGVwdGhUZXN0IFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBkZXB0aFdyaXRlIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoRnVuYyBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwYXNzSWR4IFxyXG4gICAgICovXHJcbiAgICBzZXREZXB0aCAoXHJcbiAgICAgICAgZGVwdGhUZXN0ID0gZmFsc2UsXHJcbiAgICAgICAgZGVwdGhXcml0ZSA9IGZhbHNlLFxyXG4gICAgICAgIGRlcHRoRnVuYyA9IGdmeC5EU19GVU5DX0xFU1MsXHJcbiAgICAgICAgcGFzc0lkeFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldERlcHRoKGRlcHRoVGVzdCwgZGVwdGhXcml0ZSwgZGVwdGhGdW5jLCBwYXNzSWR4KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgdGhlIE1hdGVyaWFsIGJsZW5kIHN0YXRlcy5cclxuICAgICAqICEjemgg6K6+572u5p2Q6LSo55qE5re35ZCI5riy5p+T54q25oCB44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEJsZW5kXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWQgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRFcSBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZFNyYyBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZERzdCBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZEFscGhhRXEgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmxlbmRTcmNBbHBoYSBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBibGVuZERzdEFscGhhIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJsZW5kQ29sb3IgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcclxuICAgICAqL1xyXG4gICAgc2V0QmxlbmQgKFxyXG4gICAgICAgIGVuYWJsZWQgPSBmYWxzZSxcclxuICAgICAgICBibGVuZEVxID0gZ2Z4LkJMRU5EX0ZVTkNfQURELFxyXG4gICAgICAgIGJsZW5kU3JjID0gZ2Z4LkJMRU5EX1NSQ19BTFBIQSxcclxuICAgICAgICBibGVuZERzdCA9IGdmeC5CTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBLFxyXG4gICAgICAgIGJsZW5kQWxwaGFFcSA9IGdmeC5CTEVORF9GVU5DX0FERCxcclxuICAgICAgICBibGVuZFNyY0FscGhhID0gZ2Z4LkJMRU5EX1NSQ19BTFBIQSxcclxuICAgICAgICBibGVuZERzdEFscGhhID0gZ2Z4LkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEsXHJcbiAgICAgICAgYmxlbmRDb2xvciA9IDB4ZmZmZmZmZmYsXHJcbiAgICAgICAgcGFzc0lkeFxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldEJsZW5kKGVuYWJsZWQsIGJsZW5kRXEsIGJsZW5kU3JjLCBibGVuZERzdCwgYmxlbmRBbHBoYUVxLCBibGVuZFNyY0FscGhhLCBibGVuZERzdEFscGhhLCBibGVuZENvbG9yLCBwYXNzSWR4KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgd2hldGhlciBlbmFibGUgdGhlIHN0ZW5jaWwgdGVzdC5cclxuICAgICAqICEjemgg6K6+572u5piv5ZCm5byA5ZCv5qih5p2/5rWL6K+V44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxFbmFibGVkXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFRlc3QgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcclxuICAgICAqL1xyXG4gICAgc2V0U3RlbmNpbEVuYWJsZWQgKHN0ZW5jaWxUZXN0ID0gZ2Z4LlNURU5DSUxfSU5IRVJJVCwgcGFzc0lkeCkge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXRTdGVuY2lsRW5hYmxlZChzdGVuY2lsVGVzdCwgcGFzc0lkeCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIHRoZSBNYXRlcmlhbCBzdGVuY2lsIHJlbmRlciBzdGF0ZXMuXHJcbiAgICAgKiAhI3poIOiuvue9ruadkOi0qOeahOaooeadv+a1i+ivlea4suafk+WPguaVsOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRTdGVuY2lsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFRlc3QgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbEZ1bmMgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3RlbmNpbFJlZiBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsTWFzayBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsRmFpbE9wIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxaRmFpbE9wIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxaUGFzc09wIFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0ZW5jaWxXcml0ZU1hc2sgXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFzc0lkeCBcclxuICAgICAqL1xyXG4gICAgc2V0U3RlbmNpbCAoXHJcbiAgICAgICAgc3RlbmNpbFRlc3QgPSBnZnguU1RFTkNJTF9JTkhFUklULFxyXG4gICAgICAgIHN0ZW5jaWxGdW5jID0gZ2Z4LkRTX0ZVTkNfQUxXQVlTLFxyXG4gICAgICAgIHN0ZW5jaWxSZWYgPSAwLFxyXG4gICAgICAgIHN0ZW5jaWxNYXNrID0gMHhmZixcclxuICAgICAgICBzdGVuY2lsRmFpbE9wID0gZ2Z4LlNURU5DSUxfT1BfS0VFUCxcclxuICAgICAgICBzdGVuY2lsWkZhaWxPcCA9IGdmeC5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgICAgICAgc3RlbmNpbFpQYXNzT3AgPSBnZnguU1RFTkNJTF9PUF9LRUVQLFxyXG4gICAgICAgIHN0ZW5jaWxXcml0ZU1hc2sgPSAweGZmLFxyXG4gICAgICAgIHBhc3NJZHhcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdC5zZXRTdGVuY2lsKHN0ZW5jaWxUZXN0LCBzdGVuY2lsRnVuYywgc3RlbmNpbFJlZiwgc3RlbmNpbE1hc2ssIHN0ZW5jaWxGYWlsT3AsIHN0ZW5jaWxaRmFpbE9wLCBzdGVuY2lsWlBhc3NPcCwgc3RlbmNpbFdyaXRlTWFzaywgcGFzc0lkeCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUhhc2ggKGhhc2gpIHtcclxuICAgICAgICB0aGlzLl9tYW51YWxIYXNoID0gaGFzaDtcclxuICAgICAgICB0aGlzLl9lZmZlY3QgJiYgdGhpcy5fZWZmZWN0LnVwZGF0ZUhhc2goaGFzaCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEhhc2ggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYW51YWxIYXNoIHx8ICh0aGlzLl9lZmZlY3QgJiYgdGhpcy5fZWZmZWN0LmdldEhhc2goKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RBc3NldCA9IHRoaXMuX2VmZmVjdEFzc2V0O1xyXG4gICAgICAgIGlmICghdGhpcy5fZWZmZWN0KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90ZWNobmlxdWVJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3Quc3dpdGNoVGVjaG5pcXVlKHRoaXMuX3RlY2huaXF1ZUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZURhdGEgPSB0aGlzLl90ZWNobmlxdWVEYXRhIHx8IHt9O1xyXG5cclxuICAgICAgICBsZXQgcGFzc0RhdGFzID0gdGhpcy5fdGVjaG5pcXVlRGF0YTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBwYXNzRGF0YXMpIHtcclxuICAgICAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleCk7XHJcbiAgICAgICAgICAgIGxldCBwYXNzRGF0YSA9IHBhc3NEYXRhc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmICghcGFzc0RhdGEpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgZGVmIGluIHBhc3NEYXRhLmRlZmluZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lKGRlZiwgcGFzc0RhdGEuZGVmaW5lc1tkZWZdLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwYXNzRGF0YS5wcm9wcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShwcm9wLCBwYXNzRGF0YS5wcm9wc1twcm9wXSwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWF0ZXJpYWw7XHJcbmNjLk1hdGVyaWFsID0gTWF0ZXJpYWw7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9