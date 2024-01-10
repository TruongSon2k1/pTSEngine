
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/ArmatureDisplay.js';
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
var RenderComponent = require('../../cocos2d/core/components/CCRenderComponent');

var EventTarget = require('../../cocos2d/core/event/event-target');

var Graphics = require('../../cocos2d/core/graphics/graphics');

var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_POST_RENDER = RenderFlow.FLAG_POST_RENDER;

var ArmatureCache = require('./ArmatureCache');

var AttachUtil = require('./AttachUtil');
/**
 * @module dragonBones
 */


var DefaultArmaturesEnum = cc.Enum({
  'default': -1
});
var DefaultAnimsEnum = cc.Enum({
  '<None>': 0
});
var DefaultCacheMode = cc.Enum({
  'REALTIME': 0
});
/**
 * !#en Enum for cache mode type.
 * !#zh Dragonbones渲染类型
 * @enum ArmatureDisplay.AnimationCacheMode
 */

var AnimationCacheMode = cc.Enum({
  /**
   * !#en The realtime mode.
   * !#zh 实时计算模式。
   * @property {Number} REALTIME
   */
  REALTIME: 0,

  /**
   * !#en The shared cache mode.
   * !#zh 共享缓存模式。
   * @property {Number} SHARED_CACHE
   */
  SHARED_CACHE: 1,

  /**
   * !#en The private cache mode.
   * !#zh 私有缓存模式。
   * @property {Number} PRIVATE_CACHE
   */
  PRIVATE_CACHE: 2
});

function setEnumAttr(obj, propName, enumDef) {
  cc.Class.Attr.setClassAttr(obj, propName, 'type', 'Enum');
  cc.Class.Attr.setClassAttr(obj, propName, 'enumList', cc.Enum.getList(enumDef));
}
/**
 * !#en
 * The Armature Display of DragonBones <br/>
 * <br/>
 * Armature Display has a reference to a DragonBonesAsset and stores the state for ArmatureDisplay instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple Armature Display can use the same DragonBonesAsset which includes all animations, skins, and attachments. <br/>
 * !#zh
 * DragonBones 骨骼动画 <br/>
 * <br/>
 * Armature Display 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Armature Display 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。<br/>
 *
 * @class ArmatureDisplay
 * @extends RenderComponent
 */


var ArmatureDisplay = cc.Class({
  name: 'dragonBones.ArmatureDisplay',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/DragonBones',
    inspector: 'packages://inspector/inspectors/comps/skeleton2d.js'
  },
  statics: {
    AnimationCacheMode: AnimationCacheMode
  },
  properties: {
    _factory: {
      "default": null,
      type: dragonBones.CCFactory,
      serializable: false
    },

    /**
     * !#en
     * The DragonBones data contains the armatures information (bind pose bones, slots, draw order,
     * attachments, skins, etc) and animations but does not hold any state.<br/>
     * Multiple ArmatureDisplay can share the same DragonBones data.
     * !#zh
     * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
     * attachments，皮肤等等）和动画但不持有任何状态。<br/>
     * 多个 ArmatureDisplay 可以共用相同的骨骼数据。
     * @property {DragonBonesAsset} dragonAsset
     */
    dragonAsset: {
      "default": null,
      type: dragonBones.DragonBonesAsset,
      notify: function notify() {
        this._refresh();

        if (CC_EDITOR) {
          this._defaultArmatureIndex = 0;
          this._animationIndex = 0;
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.dragon_bones_asset'
    },

    /**
     * !#en
     * The atlas asset for the DragonBones.
     * !#zh
     * 骨骼数据所需的 Atlas Texture 数据。
     * @property {DragonBonesAtlasAsset} dragonAtlasAsset
     */
    dragonAtlasAsset: {
      "default": null,
      type: dragonBones.DragonBonesAtlasAsset,
      notify: function notify() {
        // parse the atlas asset data
        this._parseDragonAtlasAsset();

        this._refresh();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.dragon_bones_atlas_asset'
    },
    _armatureName: '',

    /**
     * !#en The name of current armature.
     * !#zh 当前的 Armature 名称。
     * @property {String} armatureName
     */
    armatureName: {
      get: function get() {
        return this._armatureName;
      },
      set: function set(value) {
        this._armatureName = value;
        var animNames = this.getAnimationNames(this._armatureName);

        if (!this.animationName || animNames.indexOf(this.animationName) < 0) {
          if (CC_EDITOR) {
            this.animationName = animNames[0];
          } else {
            // Not use default animation name at runtime
            this.animationName = '';
          }
        }

        if (this._armature && !this.isAnimationCached()) {
          this._factory._dragonBones.clock.remove(this._armature);
        }

        this._refresh();

        if (this._armature && !this.isAnimationCached()) {
          this._factory._dragonBones.clock.add(this._armature);
        }
      },
      visible: false
    },
    _animationName: '',

    /**
     * !#en The name of current playing animation.
     * !#zh 当前播放的动画名称。
     * @property {String} animationName
     */
    animationName: {
      get: function get() {
        return this._animationName;
      },
      set: function set(value) {
        this._animationName = value;
      },
      visible: false
    },

    /**
     * @property {Number} _defaultArmatureIndex
     */
    _defaultArmatureIndex: {
      "default": 0,
      notify: function notify() {
        var armatureName = '';

        if (this.dragonAsset) {
          var armaturesEnum;

          if (this.dragonAsset) {
            armaturesEnum = this.dragonAsset.getArmatureEnum();
          }

          if (!armaturesEnum) {
            return cc.errorID(7400, this.name);
          }

          armatureName = armaturesEnum[this._defaultArmatureIndex];
        }

        if (armatureName !== undefined) {
          this.armatureName = armatureName;
        } else {
          cc.errorID(7401, this.name);
        }
      },
      type: DefaultArmaturesEnum,
      visible: true,
      editorOnly: true,
      animatable: false,
      displayName: "Armature",
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.armature_name'
    },
    // value of 0 represents no animation
    _animationIndex: {
      "default": 0,
      notify: function notify() {
        if (this._animationIndex === 0) {
          this.animationName = '';
          return;
        }

        var animsEnum;

        if (this.dragonAsset) {
          animsEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
        }

        if (!animsEnum) {
          return;
        }

        var animName = animsEnum[this._animationIndex];

        if (animName !== undefined) {
          this.playAnimation(animName, this.playTimes);
        } else {
          cc.errorID(7402, this.name);
        }
      },
      type: DefaultAnimsEnum,
      visible: true,
      editorOnly: true,
      animatable: false,
      displayName: 'Animation',
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.animation_name'
    },
    // Record pre cache mode.
    _preCacheMode: -1,
    _cacheMode: AnimationCacheMode.REALTIME,
    _defaultCacheMode: {
      "default": 0,
      type: AnimationCacheMode,
      notify: function notify() {
        if (this._defaultCacheMode !== AnimationCacheMode.REALTIME) {
          if (this._armature && !ArmatureCache.canCache(this._armature)) {
            this._defaultCacheMode = AnimationCacheMode.REALTIME;
            cc.warn("Animation cache mode doesn't support skeletal nesting");
            return;
          }
        }

        this.setAnimationCacheMode(this._defaultCacheMode);
      },
      editorOnly: true,
      visible: true,
      animatable: false,
      displayName: "Animation Cache Mode",
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.animation_cache_mode'
    },

    /**
     * !#en The time scale of this armature.
     * !#zh 当前骨骼中所有动画的时间缩放率。
     * @property {Number} timeScale
     * @default 1
     */
    timeScale: {
      "default": 1,
      notify: function notify() {
        if (this._armature && !this.isAnimationCached()) {
          this._armature.animation.timeScale = this.timeScale;
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.time_scale'
    },

    /**
     * !#en The play times of the default animation.
     *      -1 means using the value of config file;
     *      0 means repeat for ever
     *      >0 means repeat times
     * !#zh 播放默认动画的循环次数
     *      -1 表示使用配置文件中的默认值;
     *      0 表示无限循环
     *      >0 表示循环次数
     * @property {Number} playTimes
     * @default -1
     */
    playTimes: {
      "default": -1,
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.play_times'
    },

    /**
     * !#en Indicates whether to enable premultiplied alpha.
     * You should disable this option when image's transparent area appears to have opaque pixels,
     * or enable this option when image's half transparent area appears to be darken.
     * !#zh 是否启用贴图预乘。
     * 当图片的透明区域出现色块时需要关闭该选项，当图片的半透明区域颜色变黑时需要启用该选项。
     * @property {Boolean} premultipliedAlpha
     * @default false
     */
    premultipliedAlpha: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.premultipliedAlpha'
    },

    /**
     * !#en Indicates whether open debug bones.
     * !#zh 是否显示 bone 的 debug 信息。
     * @property {Boolean} debugBones
     * @default false
     */
    debugBones: {
      "default": false,
      notify: function notify() {
        this._updateDebugDraw();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.debug_bones'
    },

    /**
     * !#en Enabled batch model, if skeleton is complex, do not enable batch, or will lower performance.
     * !#zh 开启合批，如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低drawcall，否则请不要开启，cpu消耗会上升。
     * @property {Boolean} enableBatch
     * @default false
     */
    enableBatch: {
      "default": false,
      notify: function notify() {
        this._updateBatch();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.enabled_batch'
    },
    // DragonBones data store key.
    _armatureKey: "",
    // Below properties will effect when cache mode is SHARED_CACHE or PRIVATE_CACHE.
    // accumulate time
    _accTime: 0,
    // Play times counter
    _playCount: 0,
    // Frame cache
    _frameCache: null,
    // Cur frame
    _curFrame: null,
    // Playing flag
    _playing: false,
    // Armature cache
    _armatureCache: null
  },
  ctor: function ctor() {
    // Property _materialCache Use to cache material,since dragonBones may use multiple texture,
    // it will clone from the '_material' property,if the dragonbones only have one texture,
    // it will just use the _material,won't clone it.
    // So if invoke getMaterial,it only return _material,if you want to change all materialCache,
    // you can change materialCache directly.
    this._eventTarget = new EventTarget();
    this._materialCache = {};
    this._inited = false;
    this.attachUtil = new AttachUtil();
    this._factory = dragonBones.CCFactory.getInstance();
  },
  onLoad: function onLoad() {
    // Adapt to old code,remove unuse child which is created by old code.
    // This logic can be remove after 2.2 or later.
    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      var pos = child._name && child._name.search('CHILD_ARMATURE-');

      if (pos === 0) {
        child.destroy();
      }
    }
  },
  // if change use batch mode, just clear material cache
  _updateBatch: function _updateBatch() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
    }

    this._materialCache = {};
  },
  // override base class _updateMaterial to set define value and clear material cache
  _updateMaterial: function _updateMaterial() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
      baseMaterial.define('USE_TEXTURE', true);
      var srcBlendFactor = this.premultipliedAlpha ? cc.gfx.BLEND_ONE : cc.gfx.BLEND_SRC_ALPHA;
      var dstBlendFactor = cc.gfx.BLEND_ONE_MINUS_SRC_ALPHA;
      baseMaterial.setBlend(true, cc.gfx.BLEND_FUNC_ADD, srcBlendFactor, srcBlendFactor, cc.gfx.BLEND_FUNC_ADD, dstBlendFactor, dstBlendFactor);
    }

    this._materialCache = {};
  },
  // override base class disableRender to clear post render flag
  disableRender: function disableRender() {
    this._super();

    this.node._renderFlag &= ~FLAG_POST_RENDER;
  },
  // override base class disableRender to add post render flag
  markForRender: function markForRender(enable) {
    this._super(enable);

    if (enable) {
      this.node._renderFlag |= FLAG_POST_RENDER;
    } else {
      this.node._renderFlag &= ~FLAG_POST_RENDER;
    }
  },
  _validateRender: function _validateRender() {
    var texture = this.dragonAtlasAsset && this.dragonAtlasAsset.texture;

    if (!texture || !texture.loaded) {
      this.disableRender();
      return;
    }

    this._super();
  },
  __preload: function __preload() {
    this._init();
  },
  _init: function _init() {
    if (this._inited) return;
    this._inited = true;

    this._resetAssembler();

    this._activateMaterial();

    this._parseDragonAtlasAsset();

    this._refresh();

    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      if (child && child._name === "DEBUG_DRAW_NODE") {
        child.destroy();
      }
    }

    this._updateDebugDraw();
  },

  /**
   * !#en
   * The key of dragonbones cache data, which is regard as 'dragonbonesName', when you want to change dragonbones cloth.
   * !#zh 
   * 缓存龙骨数据的key值，换装的时会使用到该值，作为dragonbonesName使用
   * @method getArmatureKey
   * @return {String}
   * @example
   * let factory = dragonBones.CCFactory.getInstance();
   * let needChangeSlot = needChangeArmature.armature().getSlot("changeSlotName");
   * factory.replaceSlotDisplay(toChangeArmature.getArmatureKey(), "armatureName", "slotName", "displayName", needChangeSlot);
   */
  getArmatureKey: function getArmatureKey() {
    return this._armatureKey;
  },

  /**
   * !#en
   * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
   * If set the mode in editor, then no need to worry about order problem.
   * !#zh 
   * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
   * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
   * 
   * @method setAnimationCacheMode
   * @param {AnimationCacheMode} cacheMode
   * @example
   * armatureDisplay.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
   */
  setAnimationCacheMode: function setAnimationCacheMode(cacheMode) {
    if (this._preCacheMode !== cacheMode) {
      this._cacheMode = cacheMode;

      this._buildArmature();

      if (this._armature && !this.isAnimationCached()) {
        this._factory._dragonBones.clock.add(this._armature);
      }
    }
  },

  /**
   * !#en Whether in cached mode.
   * !#zh 当前是否处于缓存模式。
   * @method isAnimationCached
   * @return {Boolean}
   */
  isAnimationCached: function isAnimationCached() {
    if (CC_EDITOR) return false;
    return this._cacheMode !== AnimationCacheMode.REALTIME;
  },
  onEnable: function onEnable() {
    this._super(); // If cache mode is cache, no need to update by dragonbones library.


    if (this._armature && !this.isAnimationCached()) {
      this._factory._dragonBones.clock.add(this._armature);
    }
  },
  onDisable: function onDisable() {
    this._super(); // If cache mode is cache, no need to update by dragonbones library.


    if (this._armature && !this.isAnimationCached()) {
      this._factory._dragonBones.clock.remove(this._armature);
    }
  },
  _emitCacheCompleteEvent: function _emitCacheCompleteEvent() {
    // Animation loop complete, the event diffrent from dragonbones inner event,
    // It has no event object.
    this._eventTarget.emit(dragonBones.EventObject.LOOP_COMPLETE); // Animation complete the event diffrent from dragonbones inner event,
    // It has no event object.


    this._eventTarget.emit(dragonBones.EventObject.COMPLETE);
  },
  update: function update(dt) {
    if (!this.isAnimationCached()) return;
    if (!this._frameCache) return;
    var frameCache = this._frameCache;

    if (!frameCache.isInited()) {
      return;
    }

    var frames = frameCache.frames;

    if (!this._playing) {
      if (frameCache.isInvalid()) {
        frameCache.updateToFrame();
        this._curFrame = frames[frames.length - 1];
      }

      return;
    }

    var frameTime = ArmatureCache.FrameTime; // Animation Start, the event diffrent from dragonbones inner event,
    // It has no event object.

    if (this._accTime == 0 && this._playCount == 0) {
      this._eventTarget.emit(dragonBones.EventObject.START);
    }

    var globalTimeScale = dragonBones.timeScale;
    this._accTime += dt * this.timeScale * globalTimeScale;
    var frameIdx = Math.floor(this._accTime / frameTime);

    if (!frameCache.isCompleted) {
      frameCache.updateToFrame(frameIdx);
    }

    if (frameCache.isCompleted && frameIdx >= frames.length) {
      this._playCount++;

      if (this.playTimes > 0 && this._playCount >= this.playTimes) {
        // set frame to end frame.
        this._curFrame = frames[frames.length - 1];
        this._accTime = 0;
        this._playing = false;
        this._playCount = 0;

        this._emitCacheCompleteEvent();

        return;
      }

      this._accTime = 0;
      frameIdx = 0;

      this._emitCacheCompleteEvent();
    }

    this._curFrame = frames[frameIdx];
  },
  onDestroy: function onDestroy() {
    this._super();

    this._inited = false;

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._armatureCache.dispose();

        this._armatureCache = null;
        this._armature = null;
      } else if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._armatureCache = null;
        this._armature = null;
      } else if (this._armature) {
        this._armature.dispose();

        this._armature = null;
      }
    } else {
      if (this._armature) {
        this._armature.dispose();

        this._armature = null;
      }
    }
  },
  _updateDebugDraw: function _updateDebugDraw() {
    if (this.debugBones) {
      if (!this._debugDraw) {
        var debugDrawNode = new cc.PrivateNode();
        debugDrawNode.name = 'DEBUG_DRAW_NODE';
        var debugDraw = debugDrawNode.addComponent(Graphics);
        debugDraw.lineWidth = 1;
        debugDraw.strokeColor = cc.color(255, 0, 0, 255);
        this._debugDraw = debugDraw;
      }

      this._debugDraw.node.parent = this.node;
    } else if (this._debugDraw) {
      this._debugDraw.node.parent = null;
    }
  },
  _buildArmature: function _buildArmature() {
    if (!this.dragonAsset || !this.dragonAtlasAsset || !this.armatureName) return; // Switch Asset or Atlas or cacheMode will rebuild armature.

    if (this._armature) {
      // dispose pre build armature
      if (!CC_EDITOR) {
        if (this._preCacheMode === AnimationCacheMode.PRIVATE_CACHE) {
          this._armatureCache.dispose();
        } else if (this._preCacheMode === AnimationCacheMode.REALTIME) {
          this._armature.dispose();
        }
      } else {
        this._armature.dispose();
      }

      this._armatureCache = null;
      this._armature = null;
      this._displayProxy = null;
      this._frameCache = null;
      this._curFrame = null;
      this._playing = false;
      this._preCacheMode = null;
    }

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._armatureCache = ArmatureCache.sharedCache;
      } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._armatureCache = new ArmatureCache();

        this._armatureCache.enablePrivateMode();
      }
    }

    var atlasUUID = this.dragonAtlasAsset._uuid;
    this._armatureKey = this.dragonAsset.init(this._factory, atlasUUID);

    if (this.isAnimationCached()) {
      this._armature = this._armatureCache.getArmatureCache(this.armatureName, this._armatureKey, atlasUUID);

      if (!this._armature) {
        // Cache fail,swith to REALTIME cache mode.
        this._cacheMode = AnimationCacheMode.REALTIME;
      }
    }

    this._preCacheMode = this._cacheMode;

    if (CC_EDITOR || this._cacheMode === AnimationCacheMode.REALTIME) {
      this._displayProxy = this._factory.buildArmatureDisplay(this.armatureName, this._armatureKey, "", atlasUUID);
      if (!this._displayProxy) return;
      this._displayProxy._ccNode = this.node;

      this._displayProxy.setEventTarget(this._eventTarget);

      this._armature = this._displayProxy._armature;
      this._armature.animation.timeScale = this.timeScale; // If change mode or armature, armature must insert into clock.
      // this._factory._dragonBones.clock.add(this._armature);
    }

    if (this._cacheMode !== AnimationCacheMode.REALTIME && this.debugBones) {
      cc.warn("Debug bones is invalid in cached mode");
    }

    if (this._armature) {
      var armatureData = this._armature.armatureData;
      var aabb = armatureData.aabb;
      this.node.setContentSize(aabb.width, aabb.height);
    }

    this._updateBatch();

    this.attachUtil.init(this);

    this.attachUtil._associateAttachedNode();

    if (this.animationName) {
      this.playAnimation(this.animationName, this.playTimes);
    }

    this.markForRender(true);
  },
  _parseDragonAtlasAsset: function _parseDragonAtlasAsset() {
    if (this.dragonAtlasAsset) {
      this.dragonAtlasAsset.init(this._factory);
    }
  },
  _refresh: function _refresh() {
    this._buildArmature();

    if (CC_EDITOR) {
      // update inspector
      this._updateArmatureEnum();

      this._updateAnimEnum();

      this._updateCacheModeEnum();

      Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    }
  },
  _updateCacheModeEnum: CC_EDITOR && function () {
    if (this._armature) {
      setEnumAttr(this, '_defaultCacheMode', AnimationCacheMode);
    } else {
      setEnumAttr(this, '_defaultCacheMode', DefaultCacheMode);
    }
  },
  // update animation list for editor
  _updateAnimEnum: CC_EDITOR && function () {
    var animEnum;

    if (this.dragonAsset) {
      animEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
    } // change enum


    setEnumAttr(this, '_animationIndex', animEnum || DefaultAnimsEnum);
  },
  // update armature list for editor
  _updateArmatureEnum: CC_EDITOR && function () {
    var armatureEnum;

    if (this.dragonAsset) {
      armatureEnum = this.dragonAsset.getArmatureEnum();
    } // change enum


    setEnumAttr(this, '_defaultArmatureIndex', armatureEnum || DefaultArmaturesEnum);
  },

  /**
   * !#en
   * Play the specified animation.
   * Parameter animName specify the animation name.
   * Parameter playTimes specify the repeat times of the animation.
   * -1 means use the value of the config file.
   * 0 means play the animation for ever.
   * >0 means repeat times.
   * !#zh 
   * 播放指定的动画.
   * animName 指定播放动画的名称。
   * playTimes 指定播放动画的次数。
   * -1 为使用配置文件中的次数。
   * 0 为无限循环播放。
   * >0 为动画的重复次数。
   * @method playAnimation
   * @param {String} animName
   * @param {Number} playTimes
   * @return {dragonBones.AnimationState}
   */
  playAnimation: function playAnimation(animName, playTimes) {
    this.playTimes = playTimes === undefined ? -1 : playTimes;
    this.animationName = animName;

    if (this.isAnimationCached()) {
      var cache = this._armatureCache.getAnimationCache(this._armatureKey, animName);

      if (!cache) {
        cache = this._armatureCache.initAnimationCache(this._armatureKey, animName);
      }

      if (cache) {
        this._accTime = 0;
        this._playCount = 0;
        this._frameCache = cache;

        if (this.attachUtil._hasAttachedNode()) {
          this._frameCache.enableCacheAttachedInfo();
        }

        this._frameCache.updateToFrame(0);

        this._playing = true;
        this._curFrame = this._frameCache.frames[0];
      }
    } else {
      if (this._armature) {
        return this._armature.animation.play(animName, this.playTimes);
      }
    }
  },

  /**
   * !#en
   * Updating an animation cache to calculate all frame data in the animation is a cost in 
   * performance due to calculating all data in a single frame.
   * To update the cache, use the invalidAnimationCache method with high performance.
   * !#zh
   * 更新某个动画缓存, 预计算动画中所有帧数据，由于在单帧计算所有数据，所以较消耗性能。
   * 若想更新缓存，可使用 invalidAnimationCache 方法，具有较高性能。
   * @method updateAnimationCache
   * @param {String} animName
   */
  updateAnimationCache: function updateAnimationCache(animName) {
    if (!this.isAnimationCached()) return;

    this._armatureCache.updateAnimationCache(this._armatureKey, animName);
  },

  /**
   * !#en
   * Invalidates the animation cache, which is then recomputed on each frame..
   * !#zh
   * 使动画缓存失效，之后会在每帧重新计算。
   * @method invalidAnimationCache
   */
  invalidAnimationCache: function invalidAnimationCache() {
    if (!this.isAnimationCached()) return;

    this._armatureCache.invalidAnimationCache(this._armatureKey);
  },

  /**
   * !#en
   * Get the all armature names in the DragonBones Data.
   * !#zh
   * 获取 DragonBones 数据中所有的 armature 名称
   * @method getArmatureNames
   * @returns {Array}
   */
  getArmatureNames: function getArmatureNames() {
    var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

    return dragonBonesData && dragonBonesData.armatureNames || [];
  },

  /**
   * !#en
   * Get the all animation names of specified armature.
   * !#zh
   * 获取指定的 armature 的所有动画名称。
   * @method getAnimationNames
   * @param {String} armatureName
   * @returns {Array}
   */
  getAnimationNames: function getAnimationNames(armatureName) {
    var ret = [];

    var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

    if (dragonBonesData) {
      var armatureData = dragonBonesData.getArmature(armatureName);

      if (armatureData) {
        for (var animName in armatureData.animations) {
          if (armatureData.animations.hasOwnProperty(animName)) {
            ret.push(animName);
          }
        }
      }
    }

    return ret;
  },

  /**
   * !#en
   * Add event listener for the DragonBones Event, the same to addEventListener.
   * !#zh
   * 添加 DragonBones 事件监听器，与 addEventListener 作用相同。
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  on: function on(eventType, listener, target) {
    this.addEventListener(eventType, listener, target);
  },

  /**
   * !#en
   * Remove the event listener for the DragonBones Event, the same to removeEventListener.
   * !#zh
   * 移除 DragonBones 事件监听器，与 removeEventListener 作用相同。
   * @method off
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} [listener]
   * @param {Object} [target]
   */
  off: function off(eventType, listener, target) {
    this.removeEventListener(eventType, listener, target);
  },

  /**
   * !#en
   * Add DragonBones one-time event listener, the callback will remove itself after the first time it is triggered.
   * !#zh
   * 添加 DragonBones 一次性事件监听器，回调会在第一时间被触发后删除自身。
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  once: function once(eventType, listener, target) {
    this._eventTarget.once(eventType, listener, target);
  },

  /**
   * !#en
   * Add event listener for the DragonBones Event.
   * !#zh
   * 添加 DragonBones 事件监听器。
   * @method addEventListener
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  addEventListener: function addEventListener(eventType, listener, target) {
    this._eventTarget.on(eventType, listener, target);
  },

  /**
   * !#en
   * Remove the event listener for the DragonBones Event.
   * !#zh
   * 移除 DragonBones 事件监听器。
   * @method removeEventListener
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} [listener]
   * @param {Object} [target]
   */
  removeEventListener: function removeEventListener(eventType, listener, target) {
    this._eventTarget.off(eventType, listener, target);
  },

  /**
   * !#en
   * Build the armature for specified name.
   * !#zh
   * 构建指定名称的 armature 对象
   * @method buildArmature
   * @param {String} armatureName
   * @param {Node} node
   * @return {dragonBones.ArmatureDisplay}
   */
  buildArmature: function buildArmature(armatureName, node) {
    return this._factory.createArmatureNode(this, armatureName, node);
  },

  /**
   * !#en
   * Get the current armature object of the ArmatureDisplay.
   * !#zh
   * 获取 ArmatureDisplay 当前使用的 Armature 对象
   * @method armature
   * @returns {Object}
   */
  armature: function armature() {
    return this._armature;
  }
});
/**
 * !#en
 * Animation start play.
 * !#zh
 * 动画开始播放。
 *
 * @event dragonBones.EventObject.START
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation loop play complete once.
 * !#zh
 * 动画循环播放完成一次。
 *
 * @event dragonBones.EventObject.LOOP_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation play complete.
 * !#zh
 * 动画播放完成。
 *
 * @event dragonBones.EventObject.COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in start.
 * !#zh
 * 动画淡入开始。
 *
 * @event dragonBones.EventObject.FADE_IN
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in complete.
 * !#zh
 * 动画淡入完成。
 *
 * @event dragonBones.EventObject.FADE_IN_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out start.
 * !#zh
 * 动画淡出开始。
 *
 * @event dragonBones.EventObject.FADE_OUT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out complete.
 * !#zh
 * 动画淡出完成。
 *
 * @event dragonBones.EventObject.FADE_OUT_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation frame event.
 * !#zh
 * 动画帧事件。
 *
 * @event dragonBones.EventObject.FRAME_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */

/**
 * !#en
 * Animation frame sound event.
 * !#zh
 * 动画帧声音事件。
 *
 * @event dragonBones.EventObject.SOUND_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */

module.exports = dragonBones.ArmatureDisplay = ArmatureDisplay;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxBcm1hdHVyZURpc3BsYXkuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIkV2ZW50VGFyZ2V0IiwiR3JhcGhpY3MiLCJSZW5kZXJGbG93IiwiRkxBR19QT1NUX1JFTkRFUiIsIkFybWF0dXJlQ2FjaGUiLCJBdHRhY2hVdGlsIiwiRGVmYXVsdEFybWF0dXJlc0VudW0iLCJjYyIsIkVudW0iLCJEZWZhdWx0QW5pbXNFbnVtIiwiRGVmYXVsdENhY2hlTW9kZSIsIkFuaW1hdGlvbkNhY2hlTW9kZSIsIlJFQUxUSU1FIiwiU0hBUkVEX0NBQ0hFIiwiUFJJVkFURV9DQUNIRSIsInNldEVudW1BdHRyIiwib2JqIiwicHJvcE5hbWUiLCJlbnVtRGVmIiwiQ2xhc3MiLCJBdHRyIiwic2V0Q2xhc3NBdHRyIiwiZ2V0TGlzdCIsIkFybWF0dXJlRGlzcGxheSIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaW5zcGVjdG9yIiwic3RhdGljcyIsInByb3BlcnRpZXMiLCJfZmFjdG9yeSIsInR5cGUiLCJkcmFnb25Cb25lcyIsIkNDRmFjdG9yeSIsInNlcmlhbGl6YWJsZSIsImRyYWdvbkFzc2V0IiwiRHJhZ29uQm9uZXNBc3NldCIsIm5vdGlmeSIsIl9yZWZyZXNoIiwiX2RlZmF1bHRBcm1hdHVyZUluZGV4IiwiX2FuaW1hdGlvbkluZGV4IiwidG9vbHRpcCIsIkNDX0RFViIsImRyYWdvbkF0bGFzQXNzZXQiLCJEcmFnb25Cb25lc0F0bGFzQXNzZXQiLCJfcGFyc2VEcmFnb25BdGxhc0Fzc2V0IiwiX2FybWF0dXJlTmFtZSIsImFybWF0dXJlTmFtZSIsImdldCIsInNldCIsInZhbHVlIiwiYW5pbU5hbWVzIiwiZ2V0QW5pbWF0aW9uTmFtZXMiLCJhbmltYXRpb25OYW1lIiwiaW5kZXhPZiIsIl9hcm1hdHVyZSIsImlzQW5pbWF0aW9uQ2FjaGVkIiwiX2RyYWdvbkJvbmVzIiwiY2xvY2siLCJyZW1vdmUiLCJhZGQiLCJ2aXNpYmxlIiwiX2FuaW1hdGlvbk5hbWUiLCJhcm1hdHVyZXNFbnVtIiwiZ2V0QXJtYXR1cmVFbnVtIiwiZXJyb3JJRCIsInVuZGVmaW5lZCIsImVkaXRvck9ubHkiLCJhbmltYXRhYmxlIiwiZGlzcGxheU5hbWUiLCJhbmltc0VudW0iLCJnZXRBbmltc0VudW0iLCJhbmltTmFtZSIsInBsYXlBbmltYXRpb24iLCJwbGF5VGltZXMiLCJfcHJlQ2FjaGVNb2RlIiwiX2NhY2hlTW9kZSIsIl9kZWZhdWx0Q2FjaGVNb2RlIiwiY2FuQ2FjaGUiLCJ3YXJuIiwic2V0QW5pbWF0aW9uQ2FjaGVNb2RlIiwidGltZVNjYWxlIiwiYW5pbWF0aW9uIiwicHJlbXVsdGlwbGllZEFscGhhIiwiZGVidWdCb25lcyIsIl91cGRhdGVEZWJ1Z0RyYXciLCJlbmFibGVCYXRjaCIsIl91cGRhdGVCYXRjaCIsIl9hcm1hdHVyZUtleSIsIl9hY2NUaW1lIiwiX3BsYXlDb3VudCIsIl9mcmFtZUNhY2hlIiwiX2N1ckZyYW1lIiwiX3BsYXlpbmciLCJfYXJtYXR1cmVDYWNoZSIsImN0b3IiLCJfZXZlbnRUYXJnZXQiLCJfbWF0ZXJpYWxDYWNoZSIsIl9pbml0ZWQiLCJhdHRhY2hVdGlsIiwiZ2V0SW5zdGFuY2UiLCJvbkxvYWQiLCJjaGlsZHJlbiIsIm5vZGUiLCJpIiwibiIsImxlbmd0aCIsImNoaWxkIiwicG9zIiwiX25hbWUiLCJzZWFyY2giLCJkZXN0cm95IiwiYmFzZU1hdGVyaWFsIiwiZ2V0TWF0ZXJpYWwiLCJkZWZpbmUiLCJfdXBkYXRlTWF0ZXJpYWwiLCJzcmNCbGVuZEZhY3RvciIsImdmeCIsIkJMRU5EX09ORSIsIkJMRU5EX1NSQ19BTFBIQSIsImRzdEJsZW5kRmFjdG9yIiwiQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQSIsInNldEJsZW5kIiwiQkxFTkRfRlVOQ19BREQiLCJkaXNhYmxlUmVuZGVyIiwiX3N1cGVyIiwiX3JlbmRlckZsYWciLCJtYXJrRm9yUmVuZGVyIiwiZW5hYmxlIiwiX3ZhbGlkYXRlUmVuZGVyIiwidGV4dHVyZSIsImxvYWRlZCIsIl9fcHJlbG9hZCIsIl9pbml0IiwiX3Jlc2V0QXNzZW1ibGVyIiwiX2FjdGl2YXRlTWF0ZXJpYWwiLCJnZXRBcm1hdHVyZUtleSIsImNhY2hlTW9kZSIsIl9idWlsZEFybWF0dXJlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJfZW1pdENhY2hlQ29tcGxldGVFdmVudCIsImVtaXQiLCJFdmVudE9iamVjdCIsIkxPT1BfQ09NUExFVEUiLCJDT01QTEVURSIsInVwZGF0ZSIsImR0IiwiZnJhbWVDYWNoZSIsImlzSW5pdGVkIiwiZnJhbWVzIiwiaXNJbnZhbGlkIiwidXBkYXRlVG9GcmFtZSIsImZyYW1lVGltZSIsIkZyYW1lVGltZSIsIlNUQVJUIiwiZ2xvYmFsVGltZVNjYWxlIiwiZnJhbWVJZHgiLCJNYXRoIiwiZmxvb3IiLCJpc0NvbXBsZXRlZCIsIm9uRGVzdHJveSIsImRpc3Bvc2UiLCJfZGVidWdEcmF3IiwiZGVidWdEcmF3Tm9kZSIsIlByaXZhdGVOb2RlIiwiZGVidWdEcmF3IiwiYWRkQ29tcG9uZW50IiwibGluZVdpZHRoIiwic3Ryb2tlQ29sb3IiLCJjb2xvciIsInBhcmVudCIsIl9kaXNwbGF5UHJveHkiLCJzaGFyZWRDYWNoZSIsImVuYWJsZVByaXZhdGVNb2RlIiwiYXRsYXNVVUlEIiwiX3V1aWQiLCJpbml0IiwiZ2V0QXJtYXR1cmVDYWNoZSIsImJ1aWxkQXJtYXR1cmVEaXNwbGF5IiwiX2NjTm9kZSIsInNldEV2ZW50VGFyZ2V0IiwiYXJtYXR1cmVEYXRhIiwiYWFiYiIsInNldENvbnRlbnRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJfYXNzb2NpYXRlQXR0YWNoZWROb2RlIiwiX3VwZGF0ZUFybWF0dXJlRW51bSIsIl91cGRhdGVBbmltRW51bSIsIl91cGRhdGVDYWNoZU1vZGVFbnVtIiwiRWRpdG9yIiwiVXRpbHMiLCJyZWZyZXNoU2VsZWN0ZWRJbnNwZWN0b3IiLCJ1dWlkIiwiYW5pbUVudW0iLCJhcm1hdHVyZUVudW0iLCJjYWNoZSIsImdldEFuaW1hdGlvbkNhY2hlIiwiaW5pdEFuaW1hdGlvbkNhY2hlIiwiX2hhc0F0dGFjaGVkTm9kZSIsImVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvIiwicGxheSIsInVwZGF0ZUFuaW1hdGlvbkNhY2hlIiwiaW52YWxpZEFuaW1hdGlvbkNhY2hlIiwiZ2V0QXJtYXR1cmVOYW1lcyIsImRyYWdvbkJvbmVzRGF0YSIsImdldERyYWdvbkJvbmVzRGF0YSIsImFybWF0dXJlTmFtZXMiLCJyZXQiLCJnZXRBcm1hdHVyZSIsImFuaW1hdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJvbiIsImV2ZW50VHlwZSIsImxpc3RlbmVyIiwidGFyZ2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiYnVpbGRBcm1hdHVyZSIsImNyZWF0ZUFybWF0dXJlTm9kZSIsImFybWF0dXJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsaURBQUQsQ0FBL0I7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsdUNBQUQsQ0FBekI7O0FBQ0EsSUFBTUUsUUFBUSxHQUFHRixPQUFPLENBQUMsc0NBQUQsQ0FBeEI7O0FBQ0EsSUFBTUcsVUFBVSxHQUFHSCxPQUFPLENBQUMseUNBQUQsQ0FBMUI7O0FBQ0EsSUFBTUksZ0JBQWdCLEdBQUdELFVBQVUsQ0FBQ0MsZ0JBQXBDOztBQUVBLElBQUlDLGFBQWEsR0FBR0wsT0FBTyxDQUFDLGlCQUFELENBQTNCOztBQUNBLElBQUlNLFVBQVUsR0FBR04s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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTBLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxNLFdBQVcsQ0FBQ1YsZUFBWixHQUE4QkEsZUFBL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xyXG5sZXQgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XHJcbmNvbnN0IEdyYXBoaWNzID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2dyYXBoaWNzL2dyYXBoaWNzJyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcclxuY29uc3QgRkxBR19QT1NUX1JFTkRFUiA9IFJlbmRlckZsb3cuRkxBR19QT1NUX1JFTkRFUjtcclxuXHJcbmxldCBBcm1hdHVyZUNhY2hlID0gcmVxdWlyZSgnLi9Bcm1hdHVyZUNhY2hlJyk7XHJcbmxldCBBdHRhY2hVdGlsID0gcmVxdWlyZSgnLi9BdHRhY2hVdGlsJyk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBkcmFnb25Cb25lc1xyXG4gKi9cclxuXHJcbmxldCBEZWZhdWx0QXJtYXR1cmVzRW51bSA9IGNjLkVudW0oeyAnZGVmYXVsdCc6IC0xIH0pO1xyXG5sZXQgRGVmYXVsdEFuaW1zRW51bSA9IGNjLkVudW0oeyAnPE5vbmU+JzogMCB9KTtcclxubGV0IERlZmF1bHRDYWNoZU1vZGUgPSBjYy5FbnVtKHsgJ1JFQUxUSU1FJzogMCB9KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEVudW0gZm9yIGNhY2hlIG1vZGUgdHlwZS5cclxuICogISN6aCBEcmFnb25ib25lc+a4suafk+exu+Wei1xyXG4gKiBAZW51bSBBcm1hdHVyZURpc3BsYXkuQW5pbWF0aW9uQ2FjaGVNb2RlXHJcbiAqL1xyXG5sZXQgQW5pbWF0aW9uQ2FjaGVNb2RlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHJlYWx0aW1lIG1vZGUuXHJcbiAgICAgKiAhI3poIOWunuaXtuiuoeeul+aooeW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFQUxUSU1FXHJcbiAgICAgKi9cclxuICAgIFJFQUxUSU1FOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzaGFyZWQgY2FjaGUgbW9kZS5cclxuICAgICAqICEjemgg5YWx5Lqr57yT5a2Y5qih5byP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUkVEX0NBQ0hFXHJcbiAgICAgKi9cclxuICAgIFNIQVJFRF9DQUNIRTogMSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcHJpdmF0ZSBjYWNoZSBtb2RlLlxyXG4gICAgICogISN6aCDnp4HmnInnvJPlrZjmqKHlvI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUklWQVRFX0NBQ0hFXHJcbiAgICAgKi9cclxuICAgIFBSSVZBVEVfQ0FDSEU6IDIgXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc2V0RW51bUF0dHIgKG9iaiwgcHJvcE5hbWUsIGVudW1EZWYpIHtcclxuICAgIGNjLkNsYXNzLkF0dHIuc2V0Q2xhc3NBdHRyKG9iaiwgcHJvcE5hbWUsICd0eXBlJywgJ0VudW0nKTtcclxuICAgIGNjLkNsYXNzLkF0dHIuc2V0Q2xhc3NBdHRyKG9iaiwgcHJvcE5hbWUsICdlbnVtTGlzdCcsIGNjLkVudW0uZ2V0TGlzdChlbnVtRGVmKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBBcm1hdHVyZSBEaXNwbGF5IG9mIERyYWdvbkJvbmVzIDxici8+XHJcbiAqIDxici8+XHJcbiAqIEFybWF0dXJlIERpc3BsYXkgaGFzIGEgcmVmZXJlbmNlIHRvIGEgRHJhZ29uQm9uZXNBc3NldCBhbmQgc3RvcmVzIHRoZSBzdGF0ZSBmb3IgQXJtYXR1cmVEaXNwbGF5IGluc3RhbmNlLFxyXG4gKiB3aGljaCBjb25zaXN0cyBvZiB0aGUgY3VycmVudCBwb3NlJ3MgYm9uZSBTUlQsIHNsb3QgY29sb3JzLCBhbmQgd2hpY2ggc2xvdCBhdHRhY2htZW50cyBhcmUgdmlzaWJsZS4gPGJyLz5cclxuICogTXVsdGlwbGUgQXJtYXR1cmUgRGlzcGxheSBjYW4gdXNlIHRoZSBzYW1lIERyYWdvbkJvbmVzQXNzZXQgd2hpY2ggaW5jbHVkZXMgYWxsIGFuaW1hdGlvbnMsIHNraW5zLCBhbmQgYXR0YWNobWVudHMuIDxici8+XHJcbiAqICEjemhcclxuICogRHJhZ29uQm9uZXMg6aqo6aq85Yqo55S7IDxici8+XHJcbiAqIDxici8+XHJcbiAqIEFybWF0dXJlIERpc3BsYXkg5YW35pyJ5a+56aqo6aq85pWw5o2u55qE5byV55So5bm25LiU5a2Y5YKo5LqG6aqo6aq85a6e5L6L55qE54q25oCB77yMXHJcbiAqIOWug+eUseW9k+WJjeeahOmqqOmqvOWKqOS9nO+8jHNsb3Qg6aKc6Imy77yM5ZKM5Y+v6KeB55qEIHNsb3QgYXR0YWNobWVudHMg57uE5oiQ44CCPGJyLz5cclxuICog5aSa5LiqIEFybWF0dXJlIERpc3BsYXkg5Y+v5Lul5L2/55So55u45ZCM55qE6aqo6aq85pWw5o2u77yM5YW25Lit5YyF5ous5omA5pyJ55qE5Yqo55S777yM55qu6IKk5ZKMIGF0dGFjaG1lbnRz44CCPGJyLz5cclxuICpcclxuICogQGNsYXNzIEFybWF0dXJlRGlzcGxheVxyXG4gKiBAZXh0ZW5kcyBSZW5kZXJDb21wb25lbnRcclxuICovXHJcbmxldCBBcm1hdHVyZURpc3BsYXkgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5JyxcclxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvRHJhZ29uQm9uZXMnLFxyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2tlbGV0b24yZC5qcycsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgQW5pbWF0aW9uQ2FjaGVNb2RlOiBBbmltYXRpb25DYWNoZU1vZGUsXHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2ZhY3Rvcnk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgRHJhZ29uQm9uZXMgZGF0YSBjb250YWlucyB0aGUgYXJtYXR1cmVzIGluZm9ybWF0aW9uIChiaW5kIHBvc2UgYm9uZXMsIHNsb3RzLCBkcmF3IG9yZGVyLFxyXG4gICAgICAgICAqIGF0dGFjaG1lbnRzLCBza2lucywgZXRjKSBhbmQgYW5pbWF0aW9ucyBidXQgZG9lcyBub3QgaG9sZCBhbnkgc3RhdGUuPGJyLz5cclxuICAgICAgICAgKiBNdWx0aXBsZSBBcm1hdHVyZURpc3BsYXkgY2FuIHNoYXJlIHRoZSBzYW1lIERyYWdvbkJvbmVzIGRhdGEuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmqqOmqvOaVsOaNruWMheWQq+S6humqqOmqvOS/oeaBr++8iOe7keWumumqqOmqvOWKqOS9nO+8jHNsb3Rz77yM5riy5p+T6aG65bqP77yMXHJcbiAgICAgICAgICogYXR0YWNobWVudHPvvIznmq7ogqTnrYnnrYnvvInlkozliqjnlLvkvYbkuI3mjIHmnInku7vkvZXnirbmgIHjgII8YnIvPlxyXG4gICAgICAgICAqIOWkmuS4qiBBcm1hdHVyZURpc3BsYXkg5Y+v5Lul5YWx55So55u45ZCM55qE6aqo6aq85pWw5o2u44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtEcmFnb25Cb25lc0Fzc2V0fSBkcmFnb25Bc3NldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRyYWdvbkFzc2V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXQsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdEFybWF0dXJlSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuZHJhZ29uX2JvbmVzX2Fzc2V0J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgYXRsYXMgYXNzZXQgZm9yIHRoZSBEcmFnb25Cb25lcy5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog6aqo6aq85pWw5o2u5omA6ZyA55qEIEF0bGFzIFRleHR1cmUg5pWw5o2u44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtEcmFnb25Cb25lc0F0bGFzQXNzZXR9IGRyYWdvbkF0bGFzQXNzZXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBkcmFnb25BdGxhc0Fzc2V0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHBhcnNlIHRoZSBhdGxhcyBhc3NldCBkYXRhXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZURyYWdvbkF0bGFzQXNzZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2goKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuZHJhZ29uX2JvbmVzX2F0bGFzX2Fzc2V0J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hcm1hdHVyZU5hbWU6ICcnLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIG5hbWUgb2YgY3VycmVudCBhcm1hdHVyZS5cclxuICAgICAgICAgKiAhI3poIOW9k+WJjeeahCBBcm1hdHVyZSDlkI3np7DjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gYXJtYXR1cmVOYW1lXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXJtYXR1cmVOYW1lOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJtYXR1cmVOYW1lO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZU5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBhbmltTmFtZXMgPSB0aGlzLmdldEFuaW1hdGlvbk5hbWVzKHRoaXMuX2FybWF0dXJlTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbk5hbWUgfHwgYW5pbU5hbWVzLmluZGV4T2YodGhpcy5hbmltYXRpb25OYW1lKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZSA9IGFuaW1OYW1lc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdCB1c2UgZGVmYXVsdCBhbmltYXRpb24gbmFtZSBhdCBydW50aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkuX2RyYWdvbkJvbmVzLmNsb2NrLnJlbW92ZSh0aGlzLl9hcm1hdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSAmJiAhdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5fZHJhZ29uQm9uZXMuY2xvY2suYWRkKHRoaXMuX2FybWF0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9hbmltYXRpb25OYW1lOiAnJyxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBuYW1lIG9mIGN1cnJlbnQgcGxheWluZyBhbmltYXRpb24uXHJcbiAgICAgICAgICogISN6aCDlvZPliY3mkq3mlL7nmoTliqjnlLvlkI3np7DjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gYW5pbWF0aW9uTmFtZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFuaW1hdGlvbk5hbWU6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmltYXRpb25OYW1lO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb25OYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IF9kZWZhdWx0QXJtYXR1cmVJbmRleFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9kZWZhdWx0QXJtYXR1cmVJbmRleDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFybWF0dXJlTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ29uQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJtYXR1cmVzRW51bTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnb25Bc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcm1hdHVyZXNFbnVtID0gdGhpcy5kcmFnb25Bc3NldC5nZXRBcm1hdHVyZUVudW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhcm1hdHVyZXNFbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDc0MDAsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcm1hdHVyZU5hbWUgPSBhcm1hdHVyZXNFbnVtW3RoaXMuX2RlZmF1bHRBcm1hdHVyZUluZGV4XTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJtYXR1cmVOYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFybWF0dXJlTmFtZSA9IGFybWF0dXJlTmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNzQwMSwgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogRGVmYXVsdEFybWF0dXJlc0VudW0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBcm1hdHVyZVwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5hcm1hdHVyZV9uYW1lJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIHZhbHVlIG9mIDAgcmVwcmVzZW50cyBubyBhbmltYXRpb25cclxuICAgICAgICBfYW5pbWF0aW9uSW5kZXg6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25JbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYW5pbXNFbnVtO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ29uQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltc0VudW0gPSB0aGlzLmRyYWdvbkFzc2V0LmdldEFuaW1zRW51bSh0aGlzLmFybWF0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltc0VudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1OYW1lID0gYW5pbXNFbnVtW3RoaXMuX2FuaW1hdGlvbkluZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGFuaW1OYW1lLCB0aGlzLnBsYXlUaW1lcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDc0MDIsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IERlZmF1bHRBbmltc0VudW0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FuaW1hdGlvbicsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZHJhZ29uX2JvbmVzLmFuaW1hdGlvbl9uYW1lJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFJlY29yZCBwcmUgY2FjaGUgbW9kZS5cclxuICAgICAgICBfcHJlQ2FjaGVNb2RlOiAtMSxcclxuICAgICAgICBfY2FjaGVNb2RlOiBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUUsXHJcbiAgICAgICAgX2RlZmF1bHRDYWNoZU1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogQW5pbWF0aW9uQ2FjaGVNb2RlLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlZmF1bHRDYWNoZU1vZGUgIT09IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSAmJiAhQXJtYXR1cmVDYWNoZS5jYW5DYWNoZSh0aGlzLl9hcm1hdHVyZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENhY2hlTW9kZSA9IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcIkFuaW1hdGlvbiBjYWNoZSBtb2RlIGRvZXNuJ3Qgc3VwcG9ydCBza2VsZXRhbCBuZXN0aW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb25DYWNoZU1vZGUodGhpcy5fZGVmYXVsdENhY2hlTW9kZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBbmltYXRpb24gQ2FjaGUgTW9kZVwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5hbmltYXRpb25fY2FjaGVfbW9kZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSB0aW1lIHNjYWxlIG9mIHRoaXMgYXJtYXR1cmUuXHJcbiAgICAgICAgICogISN6aCDlvZPliY3pqqjpqrzkuK3miYDmnInliqjnlLvnmoTml7bpl7TnvKnmlL7njofjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZVNjYWxlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRpbWVTY2FsZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlICYmICF0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24udGltZVNjYWxlID0gdGhpcy50aW1lU2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMudGltZV9zY2FsZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBwbGF5IHRpbWVzIG9mIHRoZSBkZWZhdWx0IGFuaW1hdGlvbi5cclxuICAgICAgICAgKiAgICAgIC0xIG1lYW5zIHVzaW5nIHRoZSB2YWx1ZSBvZiBjb25maWcgZmlsZTtcclxuICAgICAgICAgKiAgICAgIDAgbWVhbnMgcmVwZWF0IGZvciBldmVyXHJcbiAgICAgICAgICogICAgICA+MCBtZWFucyByZXBlYXQgdGltZXNcclxuICAgICAgICAgKiAhI3poIOaSreaUvum7mOiupOWKqOeUu+eahOW+queOr+asoeaVsFxyXG4gICAgICAgICAqICAgICAgLTEg6KGo56S65L2/55So6YWN572u5paH5Lu25Lit55qE6buY6K6k5YC8O1xyXG4gICAgICAgICAqICAgICAgMCDooajnpLrml6DpmZDlvqrnjq9cclxuICAgICAgICAgKiAgICAgID4wIOihqOekuuW+queOr+asoeaVsFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwbGF5VGltZXNcclxuICAgICAgICAgKiBAZGVmYXVsdCAtMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBsYXlUaW1lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAtMSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMucGxheV90aW1lcydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIHRvIGVuYWJsZSBwcmVtdWx0aXBsaWVkIGFscGhhLlxyXG4gICAgICAgICAqIFlvdSBzaG91bGQgZGlzYWJsZSB0aGlzIG9wdGlvbiB3aGVuIGltYWdlJ3MgdHJhbnNwYXJlbnQgYXJlYSBhcHBlYXJzIHRvIGhhdmUgb3BhcXVlIHBpeGVscyxcclxuICAgICAgICAgKiBvciBlbmFibGUgdGhpcyBvcHRpb24gd2hlbiBpbWFnZSdzIGhhbGYgdHJhbnNwYXJlbnQgYXJlYSBhcHBlYXJzIHRvIGJlIGRhcmtlbi5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOi0tOWbvumihOS5mOOAglxyXG4gICAgICAgICAqIOW9k+WbvueJh+eahOmAj+aYjuWMuuWfn+WHuueOsOiJsuWdl+aXtumcgOimgeWFs+mXreivpemAiemhue+8jOW9k+WbvueJh+eahOWNiumAj+aYjuWMuuWfn+minOiJsuWPmOm7keaXtumcgOimgeWQr+eUqOivpemAiemhueOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJlbXVsdGlwbGllZEFscGhhXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24ucHJlbXVsdGlwbGllZEFscGhhJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBvcGVuIGRlYnVnIGJvbmVzLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5pi+56S6IGJvbmUg55qEIGRlYnVnIOS/oeaBr+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGVidWdCb25lc1xyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVidWdCb25lczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURlYnVnRHJhdygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5kZWJ1Z19ib25lcydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEVuYWJsZWQgYmF0Y2ggbW9kZWwsIGlmIHNrZWxldG9uIGlzIGNvbXBsZXgsIGRvIG5vdCBlbmFibGUgYmF0Y2gsIG9yIHdpbGwgbG93ZXIgcGVyZm9ybWFuY2UuXHJcbiAgICAgICAgICogISN6aCDlvIDlkK/lkIjmibnvvIzlpoLmnpzmuLLmn5PlpKfph4/nm7jlkIznurnnkIbvvIzkuJTnu5PmnoTnroDljZXnmoTpqqjpqrzliqjnlLvvvIzlvIDlkK/lkIjmibnlj6/ku6XpmY3kvY5kcmF3Y2FsbO+8jOWQpuWImeivt+S4jeimgeW8gOWQr++8jGNwdea2iOiAl+S8muS4iuWNh+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlQmF0Y2hcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZUJhdGNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQmF0Y2goKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuZW5hYmxlZF9iYXRjaCdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBEcmFnb25Cb25lcyBkYXRhIHN0b3JlIGtleS5cclxuICAgICAgICBfYXJtYXR1cmVLZXk6IFwiXCIsXHJcblxyXG4gICAgICAgIC8vIEJlbG93IHByb3BlcnRpZXMgd2lsbCBlZmZlY3Qgd2hlbiBjYWNoZSBtb2RlIGlzIFNIQVJFRF9DQUNIRSBvciBQUklWQVRFX0NBQ0hFLlxyXG4gICAgICAgIC8vIGFjY3VtdWxhdGUgdGltZVxyXG4gICAgICAgIF9hY2NUaW1lOiAwLFxyXG4gICAgICAgIC8vIFBsYXkgdGltZXMgY291bnRlclxyXG4gICAgICAgIF9wbGF5Q291bnQ6IDAsXHJcbiAgICAgICAgLy8gRnJhbWUgY2FjaGVcclxuICAgICAgICBfZnJhbWVDYWNoZTogbnVsbCxcclxuICAgICAgICAvLyBDdXIgZnJhbWVcclxuICAgICAgICBfY3VyRnJhbWU6IG51bGwsXHJcbiAgICAgICAgLy8gUGxheWluZyBmbGFnXHJcbiAgICAgICAgX3BsYXlpbmc6IGZhbHNlLFxyXG4gICAgICAgIC8vIEFybWF0dXJlIGNhY2hlXHJcbiAgICAgICAgX2FybWF0dXJlQ2FjaGU6IG51bGwsXHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIC8vIFByb3BlcnR5IF9tYXRlcmlhbENhY2hlIFVzZSB0byBjYWNoZSBtYXRlcmlhbCxzaW5jZSBkcmFnb25Cb25lcyBtYXkgdXNlIG11bHRpcGxlIHRleHR1cmUsXHJcbiAgICAgICAgLy8gaXQgd2lsbCBjbG9uZSBmcm9tIHRoZSAnX21hdGVyaWFsJyBwcm9wZXJ0eSxpZiB0aGUgZHJhZ29uYm9uZXMgb25seSBoYXZlIG9uZSB0ZXh0dXJlLFxyXG4gICAgICAgIC8vIGl0IHdpbGwganVzdCB1c2UgdGhlIF9tYXRlcmlhbCx3b24ndCBjbG9uZSBpdC5cclxuICAgICAgICAvLyBTbyBpZiBpbnZva2UgZ2V0TWF0ZXJpYWwsaXQgb25seSByZXR1cm4gX21hdGVyaWFsLGlmIHlvdSB3YW50IHRvIGNoYW5nZSBhbGwgbWF0ZXJpYWxDYWNoZSxcclxuICAgICAgICAvLyB5b3UgY2FuIGNoYW5nZSBtYXRlcmlhbENhY2hlIGRpcmVjdGx5LlxyXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0ID0gbmV3IEV2ZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXR0YWNoVXRpbCA9IG5ldyBBdHRhY2hVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IGRyYWdvbkJvbmVzLkNDRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8vIEFkYXB0IHRvIG9sZCBjb2RlLHJlbW92ZSB1bnVzZSBjaGlsZCB3aGljaCBpcyBjcmVhdGVkIGJ5IG9sZCBjb2RlLlxyXG4gICAgICAgIC8vIFRoaXMgbG9naWMgY2FuIGJlIHJlbW92ZSBhZnRlciAyLjIgb3IgbGF0ZXIuXHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY2hpbGQuX25hbWUgJiYgY2hpbGQuX25hbWUuc2VhcmNoKCdDSElMRF9BUk1BVFVSRS0nKTtcclxuICAgICAgICAgICAgaWYgKHBvcyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpZiBjaGFuZ2UgdXNlIGJhdGNoIG1vZGUsIGp1c3QgY2xlYXIgbWF0ZXJpYWwgY2FjaGVcclxuICAgIF91cGRhdGVCYXRjaCAoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBiYXNlTWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCAhdGhpcy5lbmFibGVCYXRjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsQ2FjaGUgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb3ZlcnJpZGUgYmFzZSBjbGFzcyBfdXBkYXRlTWF0ZXJpYWwgdG8gc2V0IGRlZmluZSB2YWx1ZSBhbmQgY2xlYXIgbWF0ZXJpYWwgY2FjaGVcclxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBiYXNlTWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCAhdGhpcy5lbmFibGVCYXRjaCk7XHJcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3JjQmxlbmRGYWN0b3IgPSB0aGlzLnByZW11bHRpcGxpZWRBbHBoYSA/IGNjLmdmeC5CTEVORF9PTkUgOiBjYy5nZnguQkxFTkRfU1JDX0FMUEhBO1xyXG4gICAgICAgICAgICBsZXQgZHN0QmxlbmRGYWN0b3IgPSBjYy5nZnguQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQTtcclxuXHJcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5zZXRCbGVuZChcclxuICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXHJcbiAgICAgICAgICAgICAgICBzcmNCbGVuZEZhY3Rvciwgc3JjQmxlbmRGYWN0b3IsXHJcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXHJcbiAgICAgICAgICAgICAgICBkc3RCbGVuZEZhY3RvciwgZHN0QmxlbmRGYWN0b3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBvdmVycmlkZSBiYXNlIGNsYXNzIGRpc2FibGVSZW5kZXIgdG8gY2xlYXIgcG9zdCByZW5kZXIgZmxhZ1xyXG4gICAgZGlzYWJsZVJlbmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfUE9TVF9SRU5ERVI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG92ZXJyaWRlIGJhc2UgY2xhc3MgZGlzYWJsZVJlbmRlciB0byBhZGQgcG9zdCByZW5kZXIgZmxhZ1xyXG4gICAgbWFya0ZvclJlbmRlciAoZW5hYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZW5hYmxlKTtcclxuICAgICAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyB8PSBGTEFHX1BPU1RfUkVOREVSO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+RkxBR19QT1NUX1JFTkRFUjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF92YWxpZGF0ZVJlbmRlciAoKSB7XHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLmRyYWdvbkF0bGFzQXNzZXQgJiYgdGhpcy5kcmFnb25BdGxhc0Fzc2V0LnRleHR1cmU7XHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlIHx8ICF0ZXh0dXJlLmxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfX3ByZWxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgIHRoaXMuX3BhcnNlRHJhZ29uQXRsYXNBc3NldCgpO1xyXG4gICAgICAgIHRoaXMuX3JlZnJlc2goKTtcclxuXHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGQuX25hbWUgPT09IFwiREVCVUdfRFJBV19OT0RFXCIpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGVEZWJ1Z0RyYXcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUga2V5IG9mIGRyYWdvbmJvbmVzIGNhY2hlIGRhdGEsIHdoaWNoIGlzIHJlZ2FyZCBhcyAnZHJhZ29uYm9uZXNOYW1lJywgd2hlbiB5b3Ugd2FudCB0byBjaGFuZ2UgZHJhZ29uYm9uZXMgY2xvdGguXHJcbiAgICAgKiAhI3poIFxyXG4gICAgICog57yT5a2Y6b6Z6aqo5pWw5o2u55qEa2V55YC877yM5o2i6KOF55qE5pe25Lya5L2/55So5Yiw6K+l5YC877yM5L2c5Li6ZHJhZ29uYm9uZXNOYW1l5L2/55SoXHJcbiAgICAgKiBAbWV0aG9kIGdldEFybWF0dXJlS2V5XHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAqIGxldCBuZWVkQ2hhbmdlU2xvdCA9IG5lZWRDaGFuZ2VBcm1hdHVyZS5hcm1hdHVyZSgpLmdldFNsb3QoXCJjaGFuZ2VTbG90TmFtZVwiKTtcclxuICAgICAqIGZhY3RvcnkucmVwbGFjZVNsb3REaXNwbGF5KHRvQ2hhbmdlQXJtYXR1cmUuZ2V0QXJtYXR1cmVLZXkoKSwgXCJhcm1hdHVyZU5hbWVcIiwgXCJzbG90TmFtZVwiLCBcImRpc3BsYXlOYW1lXCIsIG5lZWRDaGFuZ2VTbG90KTtcclxuICAgICAqL1xyXG4gICAgZ2V0QXJtYXR1cmVLZXkgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZUtleTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJdCdzIGJlc3QgdG8gc2V0IGNhY2hlIG1vZGUgYmVmb3JlIHNldCBwcm9wZXJ0eSAnZHJhZ29uQXNzZXQnLCBvciB3aWxsIHdhc3RlIHNvbWUgY3B1IHRpbWUuXHJcbiAgICAgKiBJZiBzZXQgdGhlIG1vZGUgaW4gZWRpdG9yLCB0aGVuIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgb3JkZXIgcHJvYmxlbS5cclxuICAgICAqICEjemggXHJcbiAgICAgKiDoi6Xmg7PliIfmjaLmuLLmn5PmqKHlvI/vvIzmnIDlpb3lnKjorr7nva4nZHJhZ29uQXNzZXQn5LmL5YmN77yM5YWI6K6+572u5aW95riy5p+T5qih5byP77yM5ZCm5YiZ5pyJ6L+Q6KGM5pe25byA6ZSA44CCXHJcbiAgICAgKiDoi6XlnKjnvJbovpHkuK3orr7nva7muLLmn5PmqKHlvI/vvIzliJnml6DpnIDmi4Xlv4Porr7nva7mrKHluo/nmoTpl67popjjgIJcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBzZXRBbmltYXRpb25DYWNoZU1vZGVcclxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uQ2FjaGVNb2RlfSBjYWNoZU1vZGVcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBhcm1hdHVyZURpc3BsYXkuc2V0QW5pbWF0aW9uQ2FjaGVNb2RlKGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheS5BbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKTtcclxuICAgICAqL1xyXG4gICAgc2V0QW5pbWF0aW9uQ2FjaGVNb2RlIChjYWNoZU1vZGUpIHtcclxuICAgICAgICBpZiAodGhpcy5fcHJlQ2FjaGVNb2RlICE9PSBjYWNoZU1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FjaGVNb2RlID0gY2FjaGVNb2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZEFybWF0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5fZHJhZ29uQm9uZXMuY2xvY2suYWRkKHRoaXMuX2FybWF0dXJlKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIGluIGNhY2hlZCBtb2RlLlxyXG4gICAgICogISN6aCDlvZPliY3mmK/lkKblpITkuo7nvJPlrZjmqKHlvI/jgIJcclxuICAgICAqIEBtZXRob2QgaXNBbmltYXRpb25DYWNoZWRcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzQW5pbWF0aW9uQ2FjaGVkICgpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlTW9kZSAhPT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICAvLyBJZiBjYWNoZSBtb2RlIGlzIGNhY2hlLCBubyBuZWVkIHRvIHVwZGF0ZSBieSBkcmFnb25ib25lcyBsaWJyYXJ5LlxyXG4gICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSAmJiAhdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkuX2RyYWdvbkJvbmVzLmNsb2NrLmFkZCh0aGlzLl9hcm1hdHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgLy8gSWYgY2FjaGUgbW9kZSBpcyBjYWNoZSwgbm8gbmVlZCB0byB1cGRhdGUgYnkgZHJhZ29uYm9uZXMgbGlicmFyeS5cclxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWN0b3J5Ll9kcmFnb25Cb25lcy5jbG9jay5yZW1vdmUodGhpcy5fYXJtYXR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2VtaXRDYWNoZUNvbXBsZXRlRXZlbnQgKCkge1xyXG4gICAgICAgIC8vIEFuaW1hdGlvbiBsb29wIGNvbXBsZXRlLCB0aGUgZXZlbnQgZGlmZnJlbnQgZnJvbSBkcmFnb25ib25lcyBpbm5lciBldmVudCxcclxuICAgICAgICAvLyBJdCBoYXMgbm8gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0LmVtaXQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuTE9PUF9DT01QTEVURSk7XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGlvbiBjb21wbGV0ZSB0aGUgZXZlbnQgZGlmZnJlbnQgZnJvbSBkcmFnb25ib25lcyBpbm5lciBldmVudCxcclxuICAgICAgICAvLyBJdCBoYXMgbm8gZXZlbnQgb2JqZWN0LlxyXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0LmVtaXQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lQ2FjaGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGZyYW1lQ2FjaGUgPSB0aGlzLl9mcmFtZUNhY2hlO1xyXG4gICAgICAgIGlmICghZnJhbWVDYWNoZS5pc0luaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZyYW1lcyA9IGZyYW1lQ2FjaGUuZnJhbWVzO1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWluZykge1xyXG4gICAgICAgICAgICBpZiAoZnJhbWVDYWNoZS5pc0ludmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZyYW1lVGltZSA9IEFybWF0dXJlQ2FjaGUuRnJhbWVUaW1lO1xyXG5cclxuICAgICAgICAvLyBBbmltYXRpb24gU3RhcnQsIHRoZSBldmVudCBkaWZmcmVudCBmcm9tIGRyYWdvbmJvbmVzIGlubmVyIGV2ZW50LFxyXG4gICAgICAgIC8vIEl0IGhhcyBubyBldmVudCBvYmplY3QuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FjY1RpbWUgPT0gMCAmJiB0aGlzLl9wbGF5Q291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudFRhcmdldC5lbWl0KGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LlNUQVJUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBnbG9iYWxUaW1lU2NhbGUgPSBkcmFnb25Cb25lcy50aW1lU2NhbGU7XHJcbiAgICAgICAgdGhpcy5fYWNjVGltZSArPSBkdCAqIHRoaXMudGltZVNjYWxlICogZ2xvYmFsVGltZVNjYWxlO1xyXG4gICAgICAgIGxldCBmcmFtZUlkeCA9IE1hdGguZmxvb3IodGhpcy5fYWNjVGltZSAvIGZyYW1lVGltZSk7XHJcbiAgICAgICAgaWYgKCFmcmFtZUNhY2hlLmlzQ29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGZyYW1lQ2FjaGUudXBkYXRlVG9GcmFtZShmcmFtZUlkeCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZnJhbWVDYWNoZS5pc0NvbXBsZXRlZCAmJiBmcmFtZUlkeCA+PSBmcmFtZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BsYXlDb3VudCArKztcclxuICAgICAgICAgICAgaWYgKCh0aGlzLnBsYXlUaW1lcyA+IDAgJiYgdGhpcy5fcGxheUNvdW50ID49IHRoaXMucGxheVRpbWVzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IGZyYW1lIHRvIGVuZCBmcmFtZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRDYWNoZUNvbXBsZXRlRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9hY2NUaW1lID0gMDtcclxuICAgICAgICAgICAgZnJhbWVJZHggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9lbWl0Q2FjaGVDb21wbGV0ZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZUlkeF07XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlBSSVZBVEVfQ0FDSEUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVDYWNoZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FjaGVNb2RlID09PSBBbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9hcm1hdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVEZWJ1Z0RyYXcgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnQm9uZXMpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9kZWJ1Z0RyYXcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZWJ1Z0RyYXdOb2RlID0gbmV3IGNjLlByaXZhdGVOb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdOb2RlLm5hbWUgPSAnREVCVUdfRFJBV19OT0RFJztcclxuICAgICAgICAgICAgICAgIGxldCBkZWJ1Z0RyYXcgPSBkZWJ1Z0RyYXdOb2RlLmFkZENvbXBvbmVudChHcmFwaGljcyk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXcubGluZVdpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIGRlYnVnRHJhdy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3ID0gZGVidWdEcmF3O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0RyYXcubm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlYnVnRHJhdykge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0RyYXcubm9kZS5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2J1aWxkQXJtYXR1cmUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kcmFnb25Bc3NldCB8fCAhdGhpcy5kcmFnb25BdGxhc0Fzc2V0IHx8ICF0aGlzLmFybWF0dXJlTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBTd2l0Y2ggQXNzZXQgb3IgQXRsYXMgb3IgY2FjaGVNb2RlIHdpbGwgcmVidWlsZCBhcm1hdHVyZS5cclxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgLy8gZGlzcG9zZSBwcmUgYnVpbGQgYXJtYXR1cmVcclxuICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcmVDYWNoZU1vZGUgPT09IEFuaW1hdGlvbkNhY2hlTW9kZS5QUklWQVRFX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVDYWNoZS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3ByZUNhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5UHJveHkgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZUNhY2hlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZUNhY2hlTW9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVNb2RlID09PSBBbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gQXJtYXR1cmVDYWNoZS5zaGFyZWRDYWNoZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZU1vZGUgPT09IEFuaW1hdGlvbkNhY2hlTW9kZS5QUklWQVRFX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbmV3IEFybWF0dXJlQ2FjaGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlLmVuYWJsZVByaXZhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdGxhc1VVSUQgPSB0aGlzLmRyYWdvbkF0bGFzQXNzZXQuX3V1aWQ7XHJcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVLZXkgPSB0aGlzLmRyYWdvbkFzc2V0LmluaXQodGhpcy5fZmFjdG9yeSwgYXRsYXNVVUlEKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IHRoaXMuX2FybWF0dXJlQ2FjaGUuZ2V0QXJtYXR1cmVDYWNoZSh0aGlzLmFybWF0dXJlTmFtZSwgdGhpcy5fYXJtYXR1cmVLZXksIGF0bGFzVVVJRCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgICAgIC8vIENhY2hlIGZhaWwsc3dpdGggdG8gUkVBTFRJTUUgY2FjaGUgbW9kZS5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlTW9kZSA9IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3ByZUNhY2hlTW9kZSA9IHRoaXMuX2NhY2hlTW9kZTtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlQcm94eSA9IHRoaXMuX2ZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkodGhpcy5hcm1hdHVyZU5hbWUsIHRoaXMuX2FybWF0dXJlS2V5LCBcIlwiLCBhdGxhc1VVSUQpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Rpc3BsYXlQcm94eSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5UHJveHkuX2NjTm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVByb3h5LnNldEV2ZW50VGFyZ2V0KHRoaXMuX2V2ZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSB0aGlzLl9kaXNwbGF5UHJveHkuX2FybWF0dXJlO1xyXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24udGltZVNjYWxlID0gdGhpcy50aW1lU2NhbGU7XHJcbiAgICAgICAgICAgIC8vIElmIGNoYW5nZSBtb2RlIG9yIGFybWF0dXJlLCBhcm1hdHVyZSBtdXN0IGluc2VydCBpbnRvIGNsb2NrLlxyXG4gICAgICAgICAgICAvLyB0aGlzLl9mYWN0b3J5Ll9kcmFnb25Cb25lcy5jbG9jay5hZGQodGhpcy5fYXJtYXR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2NhY2hlTW9kZSAhPT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FICYmIHRoaXMuZGVidWdCb25lcykge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiRGVidWcgYm9uZXMgaXMgaW52YWxpZCBpbiBjYWNoZWQgbW9kZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJtYXR1cmVEYXRhID0gdGhpcy5fYXJtYXR1cmUuYXJtYXR1cmVEYXRhO1xyXG4gICAgICAgICAgICBsZXQgYWFiYiA9IGFybWF0dXJlRGF0YS5hYWJiO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoYWFiYi53aWR0aCwgYWFiYi5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQmF0Y2goKTtcclxuICAgICAgICB0aGlzLmF0dGFjaFV0aWwuaW5pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLmF0dGFjaFV0aWwuX2Fzc29jaWF0ZUF0dGFjaGVkTm9kZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFuaW1hdGlvbih0aGlzLmFuaW1hdGlvbk5hbWUsIHRoaXMucGxheVRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3BhcnNlRHJhZ29uQXRsYXNBc3NldCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ29uQXRsYXNBc3NldCkge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdvbkF0bGFzQXNzZXQuaW5pdCh0aGlzLl9mYWN0b3J5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZWZyZXNoICgpIHtcclxuICAgICAgICB0aGlzLl9idWlsZEFybWF0dXJlKCk7XHJcblxyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgLy8gdXBkYXRlIGluc3BlY3RvclxyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVBcm1hdHVyZUVudW0oKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQW5pbUVudW0oKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FjaGVNb2RlRW51bSgpO1xyXG4gICAgICAgICAgICBFZGl0b3IuVXRpbHMucmVmcmVzaFNlbGVjdGVkSW5zcGVjdG9yKCdub2RlJywgdGhpcy5ub2RlLnV1aWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUNhY2hlTW9kZUVudW06IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlKSB7XHJcbiAgICAgICAgICAgIHNldEVudW1BdHRyKHRoaXMsICdfZGVmYXVsdENhY2hlTW9kZScsIEFuaW1hdGlvbkNhY2hlTW9kZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2V0RW51bUF0dHIodGhpcywgJ19kZWZhdWx0Q2FjaGVNb2RlJywgRGVmYXVsdENhY2hlTW9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgYW5pbWF0aW9uIGxpc3QgZm9yIGVkaXRvclxyXG4gICAgX3VwZGF0ZUFuaW1FbnVtOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhbmltRW51bTtcclxuICAgICAgICBpZiAodGhpcy5kcmFnb25Bc3NldCkge1xyXG4gICAgICAgICAgICBhbmltRW51bSA9IHRoaXMuZHJhZ29uQXNzZXQuZ2V0QW5pbXNFbnVtKHRoaXMuYXJtYXR1cmVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hhbmdlIGVudW1cclxuICAgICAgICBzZXRFbnVtQXR0cih0aGlzLCAnX2FuaW1hdGlvbkluZGV4JywgYW5pbUVudW0gfHwgRGVmYXVsdEFuaW1zRW51bSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSBhcm1hdHVyZSBsaXN0IGZvciBlZGl0b3JcclxuICAgIF91cGRhdGVBcm1hdHVyZUVudW06IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGFybWF0dXJlRW51bTtcclxuICAgICAgICBpZiAodGhpcy5kcmFnb25Bc3NldCkge1xyXG4gICAgICAgICAgICBhcm1hdHVyZUVudW0gPSB0aGlzLmRyYWdvbkFzc2V0LmdldEFybWF0dXJlRW51bSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGFuZ2UgZW51bVxyXG4gICAgICAgIHNldEVudW1BdHRyKHRoaXMsICdfZGVmYXVsdEFybWF0dXJlSW5kZXgnLCBhcm1hdHVyZUVudW0gfHwgRGVmYXVsdEFybWF0dXJlc0VudW0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFBsYXkgdGhlIHNwZWNpZmllZCBhbmltYXRpb24uXHJcbiAgICAgKiBQYXJhbWV0ZXIgYW5pbU5hbWUgc3BlY2lmeSB0aGUgYW5pbWF0aW9uIG5hbWUuXHJcbiAgICAgKiBQYXJhbWV0ZXIgcGxheVRpbWVzIHNwZWNpZnkgdGhlIHJlcGVhdCB0aW1lcyBvZiB0aGUgYW5pbWF0aW9uLlxyXG4gICAgICogLTEgbWVhbnMgdXNlIHRoZSB2YWx1ZSBvZiB0aGUgY29uZmlnIGZpbGUuXHJcbiAgICAgKiAwIG1lYW5zIHBsYXkgdGhlIGFuaW1hdGlvbiBmb3IgZXZlci5cclxuICAgICAqID4wIG1lYW5zIHJlcGVhdCB0aW1lcy5cclxuICAgICAqICEjemggXHJcbiAgICAgKiDmkq3mlL7mjIflrprnmoTliqjnlLsuXHJcbiAgICAgKiBhbmltTmFtZSDmjIflrprmkq3mlL7liqjnlLvnmoTlkI3np7DjgIJcclxuICAgICAqIHBsYXlUaW1lcyDmjIflrprmkq3mlL7liqjnlLvnmoTmrKHmlbDjgIJcclxuICAgICAqIC0xIOS4uuS9v+eUqOmFjee9ruaWh+S7tuS4reeahOasoeaVsOOAglxyXG4gICAgICogMCDkuLrml6DpmZDlvqrnjq/mkq3mlL7jgIJcclxuICAgICAqID4wIOS4uuWKqOeUu+eahOmHjeWkjeasoeaVsOOAglxyXG4gICAgICogQG1ldGhvZCBwbGF5QW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYW5pbU5hbWVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwbGF5VGltZXNcclxuICAgICAqIEByZXR1cm4ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfVxyXG4gICAgICovXHJcbiAgICBwbGF5QW5pbWF0aW9uIChhbmltTmFtZSwgcGxheVRpbWVzKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wbGF5VGltZXMgPSAocGxheVRpbWVzID09PSB1bmRlZmluZWQpID8gLTEgOiBwbGF5VGltZXM7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25OYW1lID0gYW5pbU5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgbGV0IGNhY2hlID0gdGhpcy5fYXJtYXR1cmVDYWNoZS5nZXRBbmltYXRpb25DYWNoZSh0aGlzLl9hcm1hdHVyZUtleSwgYW5pbU5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZSA9IHRoaXMuX2FybWF0dXJlQ2FjaGUuaW5pdEFuaW1hdGlvbkNhY2hlKHRoaXMuX2FybWF0dXJlS2V5LCBhbmltTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2NUaW1lID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZUNhY2hlID0gY2FjaGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdHRhY2hVdGlsLl9oYXNBdHRhY2hlZE5vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ2FjaGUudXBkYXRlVG9GcmFtZSgwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSB0aGlzLl9mcmFtZUNhY2hlLmZyYW1lc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5wbGF5KGFuaW1OYW1lLCB0aGlzLnBsYXlUaW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVXBkYXRpbmcgYW4gYW5pbWF0aW9uIGNhY2hlIHRvIGNhbGN1bGF0ZSBhbGwgZnJhbWUgZGF0YSBpbiB0aGUgYW5pbWF0aW9uIGlzIGEgY29zdCBpbiBcclxuICAgICAqIHBlcmZvcm1hbmNlIGR1ZSB0byBjYWxjdWxhdGluZyBhbGwgZGF0YSBpbiBhIHNpbmdsZSBmcmFtZS5cclxuICAgICAqIFRvIHVwZGF0ZSB0aGUgY2FjaGUsIHVzZSB0aGUgaW52YWxpZEFuaW1hdGlvbkNhY2hlIG1ldGhvZCB3aXRoIGhpZ2ggcGVyZm9ybWFuY2UuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmm7TmlrDmn5DkuKrliqjnlLvnvJPlrZgsIOmihOiuoeeul+WKqOeUu+S4reaJgOacieW4p+aVsOaNru+8jOeUseS6juWcqOWNleW4p+iuoeeul+aJgOacieaVsOaNru+8jOaJgOS7pei+g+a2iOiAl+aAp+iDveOAglxyXG4gICAgICog6Iul5oOz5pu05paw57yT5a2Y77yM5Y+v5L2/55SoIGludmFsaWRBbmltYXRpb25DYWNoZSDmlrnms5XvvIzlhbfmnInovoPpq5jmgKfog73jgIJcclxuICAgICAqIEBtZXRob2QgdXBkYXRlQW5pbWF0aW9uQ2FjaGVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhbmltTmFtZVxyXG4gICAgICovXHJcbiAgICB1cGRhdGVBbmltYXRpb25DYWNoZSAoYW5pbU5hbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUudXBkYXRlQW5pbWF0aW9uQ2FjaGUodGhpcy5fYXJtYXR1cmVLZXksIGFuaW1OYW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbnZhbGlkYXRlcyB0aGUgYW5pbWF0aW9uIGNhY2hlLCB3aGljaCBpcyB0aGVuIHJlY29tcHV0ZWQgb24gZWFjaCBmcmFtZS4uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvb/liqjnlLvnvJPlrZjlpLHmlYjvvIzkuYvlkI7kvJrlnKjmr4/luKfph43mlrDorqHnrpfjgIJcclxuICAgICAqIEBtZXRob2QgaW52YWxpZEFuaW1hdGlvbkNhY2hlXHJcbiAgICAgKi9cclxuICAgIGludmFsaWRBbmltYXRpb25DYWNoZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlLmludmFsaWRBbmltYXRpb25DYWNoZSh0aGlzLl9hcm1hdHVyZUtleSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IHRoZSBhbGwgYXJtYXR1cmUgbmFtZXMgaW4gdGhlIERyYWdvbkJvbmVzIERhdGEuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5YgRHJhZ29uQm9uZXMg5pWw5o2u5Lit5omA5pyJ55qEIGFybWF0dXJlIOWQjeensFxyXG4gICAgICogQG1ldGhvZCBnZXRBcm1hdHVyZU5hbWVzXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldEFybWF0dXJlTmFtZXMgKCkge1xyXG4gICAgICAgIGxldCBkcmFnb25Cb25lc0RhdGEgPSB0aGlzLl9mYWN0b3J5LmdldERyYWdvbkJvbmVzRGF0YSh0aGlzLl9hcm1hdHVyZUtleSk7XHJcbiAgICAgICAgcmV0dXJuIChkcmFnb25Cb25lc0RhdGEgJiYgZHJhZ29uQm9uZXNEYXRhLmFybWF0dXJlTmFtZXMpIHx8IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgYWxsIGFuaW1hdGlvbiBuYW1lcyBvZiBzcGVjaWZpZWQgYXJtYXR1cmUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bmjIflrprnmoQgYXJtYXR1cmUg55qE5omA5pyJ5Yqo55S75ZCN56ew44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEFuaW1hdGlvbk5hbWVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXJtYXR1cmVOYW1lXHJcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldEFuaW1hdGlvbk5hbWVzIChhcm1hdHVyZU5hbWUpIHtcclxuICAgICAgICBsZXQgcmV0ID0gW107XHJcbiAgICAgICAgbGV0IGRyYWdvbkJvbmVzRGF0YSA9IHRoaXMuX2ZhY3RvcnkuZ2V0RHJhZ29uQm9uZXNEYXRhKHRoaXMuX2FybWF0dXJlS2V5KTtcclxuICAgICAgICBpZiAoZHJhZ29uQm9uZXNEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBhcm1hdHVyZURhdGEgPSBkcmFnb25Cb25lc0RhdGEuZ2V0QXJtYXR1cmUoYXJtYXR1cmVOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGFybWF0dXJlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYW5pbU5hbWUgaW4gYXJtYXR1cmVEYXRhLmFuaW1hdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJtYXR1cmVEYXRhLmFuaW1hdGlvbnMuaGFzT3duUHJvcGVydHkoYW5pbU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKGFuaW1OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBEcmFnb25Cb25lcyBFdmVudCwgdGhlIHNhbWUgdG8gYWRkRXZlbnRMaXN0ZW5lci5cclxuICAgICAqICEjemhcclxuICAgICAqIOa3u+WKoCBEcmFnb25Cb25lcyDkuovku7bnm5HlkKzlmajvvIzkuI4gYWRkRXZlbnRMaXN0ZW5lciDkvZznlKjnm7jlkIzjgIJcclxuICAgICAqIEBtZXRob2Qgb25cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gICAgICogQHBhcmFtIHtFdmVudH0gbGlzdGVuZXIuZXZlbnQgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxyXG4gICAgICovXHJcbiAgICBvbiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIERyYWdvbkJvbmVzIEV2ZW50LCB0aGUgc2FtZSB0byByZW1vdmVFdmVudExpc3RlbmVyLlxyXG4gICAgICogISN6aFxyXG4gICAgICog56e76ZmkIERyYWdvbkJvbmVzIOS6i+S7tuebkeWQrOWZqO+8jOS4jiByZW1vdmVFdmVudExpc3RlbmVyIOS9nOeUqOebuOWQjOOAglxyXG4gICAgICogQG1ldGhvZCBvZmZcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbGlzdGVuZXJdXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF1cclxuICAgICAqL1xyXG4gICAgb2ZmIChldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBZGQgRHJhZ29uQm9uZXMgb25lLXRpbWUgZXZlbnQgbGlzdGVuZXIsIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5re75YqgIERyYWdvbkJvbmVzIOS4gOasoeaAp+S6i+S7tuebkeWQrOWZqO+8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxyXG4gICAgICogQG1ldGhvZCBvbmNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGxpc3RlbmVyLmV2ZW50IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcclxuICAgICAqL1xyXG4gICAgb25jZSAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQub25jZShldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgdGhlIERyYWdvbkJvbmVzIEV2ZW50LlxyXG4gICAgICogISN6aFxyXG4gICAgICog5re75YqgIERyYWdvbkJvbmVzIOS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGxpc3RlbmVyLmV2ZW50IGV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcclxuICAgICAqL1xyXG4gICAgYWRkRXZlbnRMaXN0ZW5lciAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQub24oZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgRHJhZ29uQm9uZXMgRXZlbnQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnp7vpmaQgRHJhZ29uQm9uZXMg5LqL5Lu255uR5ZCs5Zmo44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbGlzdGVuZXJdXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF1cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQub2ZmKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQnVpbGQgdGhlIGFybWF0dXJlIGZvciBzcGVjaWZpZWQgbmFtZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaehOW7uuaMh+WumuWQjeensOeahCBhcm1hdHVyZSDlr7nosaFcclxuICAgICAqIEBtZXRob2QgYnVpbGRBcm1hdHVyZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFybWF0dXJlTmFtZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAgICAgKiBAcmV0dXJuIHtkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXl9XHJcbiAgICAgKi9cclxuICAgIGJ1aWxkQXJtYXR1cmUgKGFybWF0dXJlTmFtZSwgbm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5LmNyZWF0ZUFybWF0dXJlTm9kZSh0aGlzLCBhcm1hdHVyZU5hbWUsIG5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgY3VycmVudCBhcm1hdHVyZSBvYmplY3Qgb2YgdGhlIEFybWF0dXJlRGlzcGxheS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPliBBcm1hdHVyZURpc3BsYXkg5b2T5YmN5L2/55So55qEIEFybWF0dXJlIOWvueixoVxyXG4gICAgICogQG1ldGhvZCBhcm1hdHVyZVxyXG4gICAgICogQHJldHVybnMge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgYXJtYXR1cmUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIHN0YXJ0IHBsYXkuXHJcbiAqICEjemhcclxuICog5Yqo55S75byA5aeL5pKt5pS+44CCXHJcbiAqXHJcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5TVEFSVFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIGxvb3AgcGxheSBjb21wbGV0ZSBvbmNlLlxyXG4gKiAhI3poXHJcbiAqIOWKqOeUu+W+queOr+aSreaUvuWujOaIkOS4gOasoeOAglxyXG4gKlxyXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuTE9PUF9DT01QTEVURVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIHBsYXkgY29tcGxldGUuXHJcbiAqICEjemhcclxuICog5Yqo55S75pKt5pS+5a6M5oiQ44CCXHJcbiAqXHJcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIGZhZGUgaW4gc3RhcnQuXHJcbiAqICEjemhcclxuICog5Yqo55S75reh5YWl5byA5aeL44CCXHJcbiAqXHJcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX0lOXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuRXZlbnRPYmplY3R9IFtjYWxsYmFjay5ldmVudF1cclxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFybWF0dXJlfSBbY2FsbGJhY2suZXZlbnQuYXJtYXR1cmVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGV9IFtjYWxsYmFjay5ldmVudC5hbmltYXRpb25TdGF0ZV1cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBbmltYXRpb24gZmFkZSBpbiBjb21wbGV0ZS5cclxuICogISN6aFxyXG4gKiDliqjnlLvmt6HlhaXlrozmiJDjgIJcclxuICpcclxuICogQGV2ZW50IGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU5fQ09NUExFVEVcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NhbGxiYWNrLmV2ZW50LnR5cGVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQXJtYXR1cmV9IFtjYWxsYmFjay5ldmVudC5hcm1hdHVyZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5BbmltYXRpb25TdGF0ZX0gW2NhbGxiYWNrLmV2ZW50LmFuaW1hdGlvblN0YXRlXVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEFuaW1hdGlvbiBmYWRlIG91dCBzdGFydC5cclxuICogISN6aFxyXG4gKiDliqjnlLvmt6Hlh7rlvIDlp4vjgIJcclxuICpcclxuICogQGV2ZW50IGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfT1VUXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuRXZlbnRPYmplY3R9IFtjYWxsYmFjay5ldmVudF1cclxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFybWF0dXJlfSBbY2FsbGJhY2suZXZlbnQuYXJtYXR1cmVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGV9IFtjYWxsYmFjay5ldmVudC5hbmltYXRpb25TdGF0ZV1cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBbmltYXRpb24gZmFkZSBvdXQgY29tcGxldGUuXHJcbiAqICEjemhcclxuICog5Yqo55S75reh5Ye65a6M5oiQ44CCXHJcbiAqXHJcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX09VVF9DT01QTEVURVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIGZyYW1lIGV2ZW50LlxyXG4gKiAhI3poXHJcbiAqIOWKqOeUu+W4p+S6i+S7tuOAglxyXG4gKlxyXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRlJBTUVfRVZFTlRcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NhbGxiYWNrLmV2ZW50LnR5cGVdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQubmFtZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQm9uZX0gW2NhbGxiYWNrLmV2ZW50LmJvbmVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuU2xvdH0gW2NhbGxiYWNrLmV2ZW50LnNsb3RdXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQW5pbWF0aW9uIGZyYW1lIHNvdW5kIGV2ZW50LlxyXG4gKiAhI3poXHJcbiAqIOWKqOeUu+W4p+WjsOmfs+S6i+S7tuOAglxyXG4gKlxyXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuU09VTkRfRVZFTlRcclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NhbGxiYWNrLmV2ZW50LnR5cGVdXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQubmFtZV1cclxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxyXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQm9uZX0gW2NhbGxiYWNrLmV2ZW50LmJvbmVdXHJcbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuU2xvdH0gW2NhbGxiYWNrLmV2ZW50LnNsb3RdXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBBcm1hdHVyZURpc3BsYXk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9