
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/Skeleton.js';
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
var TrackEntryListeners = require('./track-entry-listeners');

var RenderComponent = require('../../cocos2d/core/components/CCRenderComponent');

var spine = require('./lib/spine');

var Graphics = require('../../cocos2d/core/graphics/graphics');

var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_POST_RENDER = RenderFlow.FLAG_POST_RENDER;

var SkeletonCache = require('./skeleton-cache');

var AttachUtil = require('./AttachUtil');
/**
 * @module sp
 */


var DefaultSkinsEnum = cc.Enum({
  'default': -1
});
var DefaultAnimsEnum = cc.Enum({
  '<None>': 0
});
/**
 * !#en Enum for animation cache mode type.
 * !#zh Spine动画缓存类型
 * @enum Skeleton.AnimationCacheMode
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
 * The skeleton of Spine <br/>
 * <br/>
 * (Skeleton has a reference to a SkeletonData and stores the state for skeleton instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple skeletons can use the same SkeletonData which includes all animations, skins, and attachments.) <br/>
 * !#zh
 * Spine 骨骼动画 <br/>
 * <br/>
 * (Skeleton 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Skeleton 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。
 *
 * @class Skeleton
 * @extends RenderComponent
 */


sp.Skeleton = cc.Class({
  name: 'sp.Skeleton',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Spine Skeleton',
    help: 'app://docs/html/components/spine.html',
    inspector: 'packages://inspector/inspectors/comps/skeleton2d.js'
  },
  statics: {
    AnimationCacheMode: AnimationCacheMode
  },
  properties: {
    /**
     * !#en The skeletal animation is paused?
     * !#zh 该骨骼动画是否暂停。
     * @property paused
     * @type {Boolean}
     * @readOnly
     * @default false
     */
    paused: {
      "default": false,
      visible: false
    },

    /**
     * !#en
     * The skeleton data contains the skeleton information (bind pose bones, slots, draw order,
     * attachments, skins, etc) and animations but does not hold any state.<br/>
     * Multiple skeletons can share the same skeleton data.
     * !#zh
     * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
     * attachments，皮肤等等）和动画但不持有任何状态。<br/>
     * 多个 Skeleton 可以共用相同的骨骼数据。
     * @property {sp.SkeletonData} skeletonData
     */
    skeletonData: {
      "default": null,
      type: sp.SkeletonData,
      notify: function notify() {
        this.defaultSkin = '';
        this.defaultAnimation = '';

        if (CC_EDITOR) {
          this._refreshInspector();
        }

        this._updateSkeletonData();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.skeleton_data'
    },
    // 由于 spine 的 skin 是无法二次替换的，所以只能设置默认的 skin

    /**
     * !#en The name of default skin.
     * !#zh 默认的皮肤名称。
     * @property {String} defaultSkin
     */
    defaultSkin: {
      "default": '',
      visible: false
    },

    /**
     * !#en The name of default animation.
     * !#zh 默认的动画名称。
     * @property {String} defaultAnimation
     */
    defaultAnimation: {
      "default": '',
      visible: false
    },

    /**
     * !#en The name of current playing animation.
     * !#zh 当前播放的动画名称。
     * @property {String} animation
     */
    animation: {
      get: function get() {
        if (this.isAnimationCached()) {
          return this._animationName;
        } else {
          var entry = this.getCurrent(0);
          return entry && entry.animation.name || "";
        }
      },
      set: function set(value) {
        this.defaultAnimation = value;

        if (value) {
          this.setAnimation(0, value, this.loop);
        } else if (!this.isAnimationCached()) {
          this.clearTrack(0);
          this.setToSetupPose();
        }
      },
      visible: false
    },

    /**
     * @property {Number} _defaultSkinIndex
     */
    _defaultSkinIndex: {
      get: function get() {
        if (this.skeletonData) {
          var skinsEnum = this.skeletonData.getSkinsEnum();

          if (skinsEnum) {
            if (this.defaultSkin === "") {
              if (skinsEnum.hasOwnProperty(0)) {
                this._defaultSkinIndex = 0;
                return 0;
              }
            } else {
              var skinIndex = skinsEnum[this.defaultSkin];

              if (skinIndex !== undefined) {
                return skinIndex;
              }
            }
          }
        }

        return 0;
      },
      set: function set(value) {
        var skinsEnum;

        if (this.skeletonData) {
          skinsEnum = this.skeletonData.getSkinsEnum();
        }

        if (!skinsEnum) {
          return cc.errorID('', this.name);
        }

        var skinName = skinsEnum[value];

        if (skinName !== undefined) {
          this.defaultSkin = skinName;
          this.setSkin(this.defaultSkin);

          if (CC_EDITOR && !cc.engine.isPlaying) {
            this._refreshInspector();
          }
        } else {
          cc.errorID(7501, this.name);
        }
      },
      type: DefaultSkinsEnum,
      visible: true,
      animatable: false,
      displayName: "Default Skin",
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.default_skin'
    },
    // value of 0 represents no animation
    _animationIndex: {
      get: function get() {
        var animationName = !CC_EDITOR || cc.engine.isPlaying ? this.animation : this.defaultAnimation;

        if (this.skeletonData && animationName) {
          var animsEnum = this.skeletonData.getAnimsEnum();

          if (animsEnum) {
            var animIndex = animsEnum[animationName];

            if (animIndex !== undefined) {
              return animIndex;
            }
          }
        }

        return 0;
      },
      set: function set(value) {
        if (value === 0) {
          this.animation = '';
          return;
        }

        var animsEnum;

        if (this.skeletonData) {
          animsEnum = this.skeletonData.getAnimsEnum();
        }

        if (!animsEnum) {
          return cc.errorID(7502, this.name);
        }

        var animName = animsEnum[value];

        if (animName !== undefined) {
          this.animation = animName;
        } else {
          cc.errorID(7503, this.name);
        }
      },
      type: DefaultAnimsEnum,
      visible: true,
      animatable: false,
      displayName: 'Animation',
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.animation'
    },
    // Record pre cache mode.
    _preCacheMode: -1,
    _cacheMode: AnimationCacheMode.REALTIME,
    _defaultCacheMode: {
      "default": 0,
      type: AnimationCacheMode,
      notify: function notify() {
        this.setAnimationCacheMode(this._defaultCacheMode);
      },
      editorOnly: true,
      visible: true,
      animatable: false,
      displayName: "Animation Cache Mode",
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.animation_cache_mode'
    },

    /**
     * !#en TODO
     * !#zh 是否循环播放当前骨骼动画。
     * @property {Boolean} loop
     * @default true
     */
    loop: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.loop'
    },

    /**
     * !#en Indicates whether to enable premultiplied alpha.
     * You should disable this option when image's transparent area appears to have opaque pixels,
     * or enable this option when image's half transparent area appears to be darken.
     * !#zh 是否启用贴图预乘。
     * 当图片的透明区域出现色块时需要关闭该选项，当图片的半透明区域颜色变黑时需要启用该选项。
     * @property {Boolean} premultipliedAlpha
     * @default true
     */
    premultipliedAlpha: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.premultipliedAlpha'
    },

    /**
     * !#en The time scale of this skeleton.
     * !#zh 当前骨骼中所有动画的时间缩放率。
     * @property {Number} timeScale
     * @default 1
     */
    timeScale: {
      "default": 1,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.time_scale'
    },

    /**
     * !#en Indicates whether open debug slots.
     * !#zh 是否显示 slot 的 debug 信息。
     * @property {Boolean} debugSlots
     * @default false
     */
    debugSlots: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_slots',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Indicates whether open debug bones.
     * !#zh 是否显示 bone 的 debug 信息。
     * @property {Boolean} debugBones
     * @default false
     */
    debugBones: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_bones',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Indicates whether open debug mesh.
     * !#zh 是否显示 mesh 的 debug 信息。
     * @property {Boolean} debugMesh
     * @default false
     */
    debugMesh: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_mesh',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Enabled two color tint.
     * !#zh 是否启用染色效果。
     * @property {Boolean} useTint
     * @default false
     */
    useTint: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.use_tint',
      notify: function notify() {
        this._updateUseTint();
      }
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
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.enabled_batch'
    },
    // Below properties will effect when cache mode is SHARED_CACHE or PRIVATE_CACHE.
    // accumulate time
    _accTime: 0,
    // Play times counter
    _playCount: 0,
    // Frame cache
    _frameCache: null,
    // Cur frame
    _curFrame: null,
    // Skeleton cache
    _skeletonCache: null,
    // Aimation name
    _animationName: "",
    // Animation queue
    _animationQueue: [],
    // Head animation info of 
    _headAniInfo: null,
    // Play times
    _playTimes: 0,
    // Is animation complete.
    _isAniComplete: true
  },
  // CONSTRUCTOR
  ctor: function ctor() {
    this._effectDelegate = null;
    this._skeleton = null;
    this._rootBone = null;
    this._listener = null;
    this._materialCache = {};
    this._debugRenderer = null;
    this._startSlotIndex = -1;
    this._endSlotIndex = -1;
    this._startEntry = {
      animation: {
        name: ""
      },
      trackIndex: 0
    };
    this._endEntry = {
      animation: {
        name: ""
      },
      trackIndex: 0
    };
    this.attachUtil = new AttachUtil();
  },
  // override base class _getDefaultMaterial to modify default material
  _getDefaultMaterial: function _getDefaultMaterial() {
    return cc.Material.getBuiltinMaterial('2d-spine');
  },
  // override base class _updateMaterial to set define value and clear material cache
  _updateMaterial: function _updateMaterial() {
    var useTint = this.useTint || this.isAnimationCached() && !CC_NATIVERENDERER;
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('USE_TINT', useTint);
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
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
  // if change use tint mode, just clear material cache
  _updateUseTint: function _updateUseTint() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      var useTint = this.useTint || this.isAnimationCached() && !CC_NATIVERENDERER;
      baseMaterial.define('USE_TINT', useTint);
    }

    this._materialCache = {};
  },
  // if change use batch mode, just clear material cache
  _updateBatch: function _updateBatch() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
    }

    this._materialCache = {};
  },
  _validateRender: function _validateRender() {
    var skeletonData = this.skeletonData;

    if (!skeletonData || !skeletonData.isTexturesLoaded()) {
      this.disableRender();
      return;
    }

    this._super();
  },

  /**
   * !#en
   * Sets runtime skeleton data to sp.Skeleton.<br>
   * This method is different from the `skeletonData` property. This method is passed in the raw data provided by the Spine runtime, and the skeletonData type is the asset type provided by Creator.
   * !#zh
   * 设置底层运行时用到的 SkeletonData。<br>
   * 这个接口有别于 `skeletonData` 属性，这个接口传入的是 Spine runtime 提供的原始数据，而 skeletonData 的类型是 Creator 提供的资源类型。
   * @method setSkeletonData
   * @param {sp.spine.SkeletonData} skeletonData
   */
  setSkeletonData: function setSkeletonData(skeletonData) {
    if (skeletonData.width != null && skeletonData.height != null) {
      this.node.setContentSize(skeletonData.width, skeletonData.height);
    }

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._skeletonCache = SkeletonCache.sharedCache;
      } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._skeletonCache = new SkeletonCache();

        this._skeletonCache.enablePrivateMode();
      }
    }

    if (this.isAnimationCached()) {
      if (this.debugBones || this.debugSlots) {
        cc.warn("Debug bones or slots is invalid in cached mode");
      }

      var skeletonInfo = this._skeletonCache.getSkeletonCache(this.skeletonData._uuid, skeletonData);

      this._skeleton = skeletonInfo.skeleton;
      this._clipper = skeletonInfo.clipper;
      this._rootBone = this._skeleton.getRootBone();
    } else {
      this._skeleton = new spine.Skeleton(skeletonData);
      this._clipper = new spine.SkeletonClipping();
      this._rootBone = this._skeleton.getRootBone();
    }

    this.markForRender(true);
  },

  /**
   * !#en Sets slots visible range.
   * !#zh 设置骨骼插槽可视范围。
   * @method setSlotsRange
   * @param {Number} startSlotIndex
   * @param {Number} endSlotIndex
   */
  setSlotsRange: function setSlotsRange(startSlotIndex, endSlotIndex) {
    if (this.isAnimationCached()) {
      cc.warn("Slots visible range can not be modified in cached mode.");
    } else {
      this._startSlotIndex = startSlotIndex;
      this._endSlotIndex = endSlotIndex;
    }
  },

  /**
   * !#en Sets animation state data.<br>
   * The parameter type is {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData.
   * !#zh 设置动画状态数据。<br>
   * 参数是 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData。
   * @method setAnimationStateData
   * @param {sp.spine.AnimationStateData} stateData
   */
  setAnimationStateData: function setAnimationStateData(stateData) {
    if (this.isAnimationCached()) {
      cc.warn("'setAnimationStateData' interface can not be invoked in cached mode.");
    } else {
      var state = new spine.AnimationState(stateData);

      if (this._listener) {
        if (this._state) {
          this._state.removeListener(this._listener);
        }

        state.addListener(this._listener);
      }

      this._state = state;
    }
  },
  // IMPLEMENT
  __preload: function __preload() {
    this._super();

    if (CC_EDITOR) {
      var Flags = cc.Object.Flags;
      this._objFlags |= Flags.IsAnchorLocked | Flags.IsSizeLocked;

      this._refreshInspector();
    }

    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      if (child && child._name === "DEBUG_DRAW_NODE") {
        child.destroy();
      }
    }

    this._updateSkeletonData();

    this._updateDebugDraw();

    this._updateUseTint();

    this._updateBatch();
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
   * skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
   */
  setAnimationCacheMode: function setAnimationCacheMode(cacheMode) {
    if (this._preCacheMode !== cacheMode) {
      this._cacheMode = cacheMode;

      this._updateSkeletonData();

      this._updateUseTint();
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
  update: function update(dt) {
    if (CC_EDITOR) return;
    if (this.paused) return;
    dt *= this.timeScale * sp.timeScale;

    if (this.isAnimationCached()) {
      // Cache mode and has animation queue.
      if (this._isAniComplete) {
        if (this._animationQueue.length === 0 && !this._headAniInfo) {
          var frameCache = this._frameCache;

          if (frameCache && frameCache.isInvalid()) {
            frameCache.updateToFrame();
            var frames = frameCache.frames;
            this._curFrame = frames[frames.length - 1];
          }

          return;
        }

        if (!this._headAniInfo) {
          this._headAniInfo = this._animationQueue.shift();
        }

        this._accTime += dt;

        if (this._accTime > this._headAniInfo.delay) {
          var aniInfo = this._headAniInfo;
          this._headAniInfo = null;
          this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
        }

        return;
      }

      this._updateCache(dt);
    } else {
      this._updateRealtime(dt);
    }
  },
  _emitCacheCompleteEvent: function _emitCacheCompleteEvent() {
    if (!this._listener) return;
    this._endEntry.animation.name = this._animationName;
    this._listener.complete && this._listener.complete(this._endEntry);
    this._listener.end && this._listener.end(this._endEntry);
  },
  _updateCache: function _updateCache(dt) {
    var frameCache = this._frameCache;

    if (!frameCache.isInited()) {
      return;
    }

    var frames = frameCache.frames;
    var frameTime = SkeletonCache.FrameTime; // Animation Start, the event diffrent from dragonbones inner event,
    // It has no event object.

    if (this._accTime == 0 && this._playCount == 0) {
      this._startEntry.animation.name = this._animationName;
      this._listener && this._listener.start && this._listener.start(this._startEntry);
    }

    this._accTime += dt;
    var frameIdx = Math.floor(this._accTime / frameTime);

    if (!frameCache.isCompleted) {
      frameCache.updateToFrame(frameIdx);
    }

    if (frameCache.isCompleted && frameIdx >= frames.length) {
      this._playCount++;

      if (this._playTimes > 0 && this._playCount >= this._playTimes) {
        // set frame to end frame.
        this._curFrame = frames[frames.length - 1];
        this._accTime = 0;
        this._playCount = 0;
        this._isAniComplete = true;

        this._emitCacheCompleteEvent();

        return;
      }

      this._accTime = 0;
      frameIdx = 0;

      this._emitCacheCompleteEvent();
    }

    this._curFrame = frames[frameIdx];
  },
  _updateRealtime: function _updateRealtime(dt) {
    var skeleton = this._skeleton;
    var state = this._state;

    if (skeleton) {
      skeleton.update(dt);

      if (state) {
        state.update(dt);
        state.apply(skeleton);
      }
    }
  },

  /**
   * !#en Sets vertex effect delegate.
   * !#zh 设置顶点动画代理
   * @method setVertexEffectDelegate
   * @param {sp.VertexEffectDelegate} effectDelegate
   */
  setVertexEffectDelegate: function setVertexEffectDelegate(effectDelegate) {
    this._effectDelegate = effectDelegate;
  },
  // RENDERER

  /**
   * !#en Computes the world SRT from the local SRT for each bone.
   * !#zh 重新更新所有骨骼的世界 Transform，
   * 当获取 bone 的数值未更新时，即可使用该函数进行更新数值。
   * @method updateWorldTransform
   * @example
   * var bone = spine.findBone('head');
   * cc.log(bone.worldX); // return 0;
   * spine.updateWorldTransform();
   * bone = spine.findBone('head');
   * cc.log(bone.worldX); // return -23.12;
   */
  updateWorldTransform: function updateWorldTransform() {
    if (!this.isAnimationCached()) return;

    if (this._skeleton) {
      this._skeleton.updateWorldTransform();
    }
  },

  /**
   * !#en Sets the bones and slots to the setup pose.
   * !#zh 还原到起始动作
   * @method setToSetupPose
   */
  setToSetupPose: function setToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setToSetupPose();
    }
  },

  /**
   * !#en
   * Sets the bones to the setup pose,
   * using the values from the `BoneData` list in the `SkeletonData`.
   * !#zh
   * 设置 bone 到起始动作
   * 使用 SkeletonData 中的 BoneData 列表中的值。
   * @method setBonesToSetupPose
   */
  setBonesToSetupPose: function setBonesToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setBonesToSetupPose();
    }
  },

  /**
   * !#en
   * Sets the slots to the setup pose,
   * using the values from the `SlotData` list in the `SkeletonData`.
   * !#zh
   * 设置 slot 到起始动作。
   * 使用 SkeletonData 中的 SlotData 列表中的值。
   * @method setSlotsToSetupPose
   */
  setSlotsToSetupPose: function setSlotsToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setSlotsToSetupPose();
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
    var uuid = this.skeletonData._uuid;

    if (this._skeletonCache) {
      this._skeletonCache.updateAnimationCache(uuid, animName);
    }
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

    if (this._skeletonCache) {
      this._skeletonCache.invalidAnimationCache(this.skeletonData._uuid);
    }
  },

  /**
   * !#en
   * Finds a bone by name.
   * This does a string comparison for every bone.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone object.
   * !#zh
   * 通过名称查找 bone。
   * 这里对每个 bone 的名称进行了对比。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone 对象。
   *
   * @method findBone
   * @param {String} boneName
   * @return {sp.spine.Bone}
   */
  findBone: function findBone(boneName) {
    if (this._skeleton) {
      return this._skeleton.findBone(boneName);
    }

    return null;
  },

  /**
   * !#en
   * Finds a slot by name. This does a string comparison for every slot.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot object.
   * !#zh
   * 通过名称查找 slot。这里对每个 slot 的名称进行了比较。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot 对象。
   *
   * @method findSlot
   * @param {String} slotName
   * @return {sp.spine.Slot}
   */
  findSlot: function findSlot(slotName) {
    if (this._skeleton) {
      return this._skeleton.findSlot(slotName);
    }

    return null;
  },

  /**
   * !#en
   * Finds a skin by name and makes it the active skin.
   * This does a string comparison for every skin.<br>
   * Note that setting the skin does not change which attachments are visible.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin object.
   * !#zh
   * 按名称查找皮肤，激活该皮肤。这里对每个皮肤的名称进行了比较。<br>
   * 注意：设置皮肤不会改变 attachment 的可见性。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin 对象。
   *
   * @method setSkin
   * @param {String} skinName
   */
  setSkin: function setSkin(skinName) {
    if (this._skeleton) {
      this._skeleton.setSkinByName(skinName);

      this._skeleton.setSlotsToSetupPose();
    }

    this.invalidAnimationCache();
  },

  /**
   * !#en
   * Returns the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment object.
   * !#zh
   * 通过 slot 和 attachment 的名称获取 attachment。Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment 对象。
   *
   * @method getAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   * @return {sp.spine.Attachment}
   */
  getAttachment: function getAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      return this._skeleton.getAttachmentByName(slotName, attachmentName);
    }

    return null;
  },

  /**
   * !#en
   * Sets the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.
   * !#zh
   * 通过 slot 和 attachment 的名字来设置 attachment。
   * Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。
   * @method setAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   */
  setAttachment: function setAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      this._skeleton.setAttachment(slotName, attachmentName);
    }

    this.invalidAnimationCache();
  },

  /**
  * Return the renderer of attachment.
  * @method getTextureAtlas
  * @param {sp.spine.RegionAttachment|spine.BoundingBoxAttachment} regionAttachment
  * @return {sp.spine.TextureAtlasRegion}
  */
  getTextureAtlas: function getTextureAtlas(regionAttachment) {
    return regionAttachment.region;
  },
  // ANIMATION

  /**
   * !#en
   * Mix applies all keyframe values,
   * interpolated for the specified time and mixed with the current values.
   * !#zh 为所有关键帧设定混合及混合时间（从当前值开始差值）。
   * @method setMix
   * @param {String} fromAnimation
   * @param {String} toAnimation
   * @param {Number} duration
   */
  setMix: function setMix(fromAnimation, toAnimation, duration) {
    if (this._state) {
      this._state.data.setMix(fromAnimation, toAnimation, duration);
    }
  },

  /**
   * !#en Set the current animation. Any queued animations are cleared.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 设置当前动画。队列中的任何的动画将被清除。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method setAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @return {sp.spine.TrackEntry}
   */
  setAnimation: function setAnimation(trackIndex, name, loop) {
    this._playTimes = loop ? 0 : 1;
    this._animationName = name;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        cc.warn("Track index can not greater than 0 in cached mode.");
      }

      if (!this._skeletonCache) return null;

      var cache = this._skeletonCache.getAnimationCache(this.skeletonData._uuid, name);

      if (!cache) {
        cache = this._skeletonCache.initAnimationCache(this.skeletonData._uuid, name);
      }

      if (cache) {
        this._isAniComplete = false;
        this._accTime = 0;
        this._playCount = 0;
        this._frameCache = cache;

        if (this.attachUtil._hasAttachedNode()) {
          this._frameCache.enableCacheAttachedInfo();
        }

        this._frameCache.updateToFrame(0);

        this._curFrame = this._frameCache.frames[0];
      }
    } else {
      if (this._skeleton) {
        var animation = this._skeleton.data.findAnimation(name);

        if (!animation) {
          cc.logID(7509, name);
          return null;
        }

        var res = this._state.setAnimationWith(trackIndex, animation, loop);

        this._state.apply(this._skeleton);

        return res;
      }
    }

    return null;
  },

  /**
   * !#en Adds an animation to be played delay seconds after the current or last queued animation.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 添加一个动画到动画队列尾部，还可以延迟指定的秒数。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method addAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @param {Number} [delay=0]
   * @return {sp.spine.TrackEntry}
   */
  addAnimation: function addAnimation(trackIndex, name, loop, delay) {
    delay = delay || 0;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        cc.warn("Track index can not greater than 0 in cached mode.");
      }

      this._animationQueue.push({
        animationName: name,
        loop: loop,
        delay: delay
      });
    } else {
      if (this._skeleton) {
        var animation = this._skeleton.data.findAnimation(name);

        if (!animation) {
          cc.logID(7510, name);
          return null;
        }

        return this._state.addAnimationWith(trackIndex, animation, loop, delay);
      }
    }

    return null;
  },

  /**
   * !#en Find animation with specified name.
   * !#zh 查找指定名称的动画
   * @method findAnimation
   * @param {String} name
   * @returns {sp.spine.Animation}
   */
  findAnimation: function findAnimation(name) {
    if (this._skeleton) {
      return this._skeleton.data.findAnimation(name);
    }

    return null;
  },

  /**
   * !#en Returns track entry by trackIndex.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 通过 track 索引获取 TrackEntry。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method getCurrent
   * @param trackIndex
   * @return {sp.spine.TrackEntry}
   */
  getCurrent: function getCurrent(trackIndex) {
    if (this.isAnimationCached()) {
      cc.warn("'getCurrent' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        return this._state.getCurrent(trackIndex);
      }
    }

    return null;
  },

  /**
   * !#en Clears all tracks of animation state.
   * !#zh 清除所有 track 的动画状态。
   * @method clearTracks
   */
  clearTracks: function clearTracks() {
    if (this.isAnimationCached()) {
      cc.warn("'clearTracks' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        this._state.clearTracks();
      }
    }
  },

  /**
   * !#en Clears track of animation state by trackIndex.
   * !#zh 清除出指定 track 的动画状态。
   * @method clearTrack
   * @param {number} trackIndex
   */
  clearTrack: function clearTrack(trackIndex) {
    if (this.isAnimationCached()) {
      cc.warn("'clearTrack' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        this._state.clearTrack(trackIndex);

        if (CC_EDITOR && !cc.engine.isPlaying) {
          this._state.update(0);
        }
      }
    }
  },

  /**
   * !#en Set the start event listener.
   * !#zh 用来设置开始播放动画的事件监听。
   * @method setStartListener
   * @param {function} listener
   */
  setStartListener: function setStartListener(listener) {
    this._ensureListener();

    this._listener.start = listener;
  },

  /**
   * !#en Set the interrupt event listener.
   * !#zh 用来设置动画被打断的事件监听。
   * @method setInterruptListener
   * @param {function} listener
   */
  setInterruptListener: function setInterruptListener(listener) {
    this._ensureListener();

    this._listener.interrupt = listener;
  },

  /**
   * !#en Set the end event listener.
   * !#zh 用来设置动画播放完后的事件监听。
   * @method setEndListener
   * @param {function} listener
   */
  setEndListener: function setEndListener(listener) {
    this._ensureListener();

    this._listener.end = listener;
  },

  /**
   * !#en Set the dispose event listener.
   * !#zh 用来设置动画将被销毁的事件监听。
   * @method setDisposeListener
   * @param {function} listener
   */
  setDisposeListener: function setDisposeListener(listener) {
    this._ensureListener();

    this._listener.dispose = listener;
  },

  /**
   * !#en Set the complete event listener.
   * !#zh 用来设置动画播放一次循环结束后的事件监听。
   * @method setCompleteListener
   * @param {function} listener
   */
  setCompleteListener: function setCompleteListener(listener) {
    this._ensureListener();

    this._listener.complete = listener;
  },

  /**
   * !#en Set the animation event listener.
   * !#zh 用来设置动画播放过程中帧事件的监听。
   * @method setEventListener
   * @param {function} listener
   */
  setEventListener: function setEventListener(listener) {
    this._ensureListener();

    this._listener.event = listener;
  },

  /**
   * !#en Set the start event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画开始播放的事件监听。
   * @method setTrackStartListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackStartListener: function setTrackStartListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).start = listener;
  },

  /**
   * !#en Set the interrupt event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画被打断的事件监听。
   * @method setTrackInterruptListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackInterruptListener: function setTrackInterruptListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).interrupt = listener;
  },

  /**
   * !#en Set the end event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画播放结束的事件监听。
   * @method setTrackEndListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackEndListener: function setTrackEndListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).end = listener;
  },

  /**
   * !#en Set the dispose event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画即将被销毁的事件监听。
   * @method setTrackDisposeListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackDisposeListener: function setTrackDisposeListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).dispose = listener;
  },

  /**
   * !#en Set the complete event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画一次循环播放结束的事件监听。
   * @method setTrackCompleteListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   * @param {sp.spine.TrackEntry} listener.entry
   * @param {Number} listener.loopCount
   */
  setTrackCompleteListener: function setTrackCompleteListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
      var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
      listener(trackEntry, loopCount);
    };
  },

  /**
   * !#en Set the event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画帧事件的监听。
   * @method setTrackEventListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackEventListener: function setTrackEventListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).event = listener;
  },

  /**
   * !#en Get the animation state object
   * !#zh 获取动画状态
   * @method getState
   * @return {sp.spine.AnimationState} state
   */
  getState: function getState() {
    return this._state;
  },
  // update animation list for editor
  _updateAnimEnum: CC_EDITOR && function () {
    var animEnum;

    if (this.skeletonData) {
      animEnum = this.skeletonData.getAnimsEnum();
    } // change enum


    setEnumAttr(this, '_animationIndex', animEnum || DefaultAnimsEnum);
  },
  // update skin list for editor
  _updateSkinEnum: CC_EDITOR && function () {
    var skinEnum;

    if (this.skeletonData) {
      skinEnum = this.skeletonData.getSkinsEnum();
    } // change enum


    setEnumAttr(this, '_defaultSkinIndex', skinEnum || DefaultSkinsEnum);
  },
  _ensureListener: function _ensureListener() {
    if (!this._listener) {
      this._listener = new TrackEntryListeners();

      if (this._state) {
        this._state.addListener(this._listener);
      }
    }
  },
  _updateSkeletonData: function _updateSkeletonData() {
    if (!this.skeletonData) {
      this.disableRender();
      return;
    }

    var data = this.skeletonData.getRuntimeData();

    if (!data) {
      this.disableRender();
      return;
    }

    try {
      this.setSkeletonData(data);

      if (!this.isAnimationCached()) {
        this.setAnimationStateData(new spine.AnimationStateData(this._skeleton.data));
      }

      this.defaultSkin && this.setSkin(this.defaultSkin);
    } catch (e) {
      cc.warn(e);
    }

    this.attachUtil.init(this);

    this.attachUtil._associateAttachedNode();

    this._preCacheMode = this._cacheMode;
    this.animation = this.defaultAnimation;
  },
  _refreshInspector: function _refreshInspector() {
    // update inspector
    this._updateAnimEnum();

    this._updateSkinEnum();

    Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
  },
  _updateDebugDraw: function _updateDebugDraw() {
    if (this.debugBones || this.debugSlots) {
      if (!this._debugRenderer) {
        var debugDrawNode = new cc.PrivateNode();
        debugDrawNode.name = 'DEBUG_DRAW_NODE';
        var debugDraw = debugDrawNode.addComponent(Graphics);
        debugDraw.lineWidth = 1;
        debugDraw.strokeColor = cc.color(255, 0, 0, 255);
        this._debugRenderer = debugDraw;
      }

      this._debugRenderer.node.parent = this.node;

      if (this.isAnimationCached()) {
        cc.warn("Debug bones or slots is invalid in cached mode");
      }
    } else if (this._debugRenderer) {
      this._debugRenderer.node.parent = null;
    }
  }
});
module.exports = sp.Skeleton;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxTa2VsZXRvbi5qcyJdLCJuYW1lcyI6WyJUcmFja0VudHJ5TGlzdGVuZXJzIiwicmVxdWlyZSIsIlJlbmRlckNvbXBvbmVudCIsInNwaW5lIiwiR3JhcGhpY3MiLCJSZW5kZXJGbG93IiwiRkxBR19QT1NUX1JFTkRFUiIsIlNrZWxldG9uQ2FjaGUiLCJBdHRhY2hVdGlsIiwiRGVmYXVsdFNraW5zRW51bSIsImNjIiwiRW51bSIsIkRlZmF1bHRBbmltc0VudW0iLCJBbmltYXRpb25DYWNoZU1vZGUiLCJSRUFMVElNRSIsIlNIQVJFRF9DQUNIRSIsIlBSSVZBVEVfQ0FDSEUiLCJzZXRFbnVtQXR0ciIsIm9iaiIsInByb3BOYW1lIiwiZW51bURlZiIsIkNsYXNzIiwiQXR0ciIsInNldENsYXNzQXR0ciIsImdldExpc3QiLCJzcCIsIlNrZWxldG9uIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwic3RhdGljcyIsInByb3BlcnRpZXMiLCJwYXVzZWQiLCJ2aXNpYmxlIiwic2tlbGV0b25EYXRhIiwidHlwZSIsIlNrZWxldG9uRGF0YSIsIm5vdGlmeSIsImRlZmF1bHRTa2luIiwiZGVmYXVsdEFuaW1hdGlvbiIsIl9yZWZyZXNoSW5zcGVjdG9yIiwiX3VwZGF0ZVNrZWxldG9uRGF0YSIsInRvb2x0aXAiLCJDQ19ERVYiLCJhbmltYXRpb24iLCJnZXQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9hbmltYXRpb25OYW1lIiwiZW50cnkiLCJnZXRDdXJyZW50Iiwic2V0IiwidmFsdWUiLCJzZXRBbmltYXRpb24iLCJsb29wIiwiY2xlYXJUcmFjayIsInNldFRvU2V0dXBQb3NlIiwiX2RlZmF1bHRTa2luSW5kZXgiLCJza2luc0VudW0iLCJnZXRTa2luc0VudW0iLCJoYXNPd25Qcm9wZXJ0eSIsInNraW5JbmRleCIsInVuZGVmaW5lZCIsImVycm9ySUQiLCJza2luTmFtZSIsInNldFNraW4iLCJlbmdpbmUiLCJpc1BsYXlpbmciLCJhbmltYXRhYmxlIiwiZGlzcGxheU5hbWUiLCJfYW5pbWF0aW9uSW5kZXgiLCJhbmltYXRpb25OYW1lIiwiYW5pbXNFbnVtIiwiZ2V0QW5pbXNFbnVtIiwiYW5pbUluZGV4IiwiYW5pbU5hbWUiLCJfcHJlQ2FjaGVNb2RlIiwiX2NhY2hlTW9kZSIsIl9kZWZhdWx0Q2FjaGVNb2RlIiwic2V0QW5pbWF0aW9uQ2FjaGVNb2RlIiwiZWRpdG9yT25seSIsInByZW11bHRpcGxpZWRBbHBoYSIsInRpbWVTY2FsZSIsImRlYnVnU2xvdHMiLCJfdXBkYXRlRGVidWdEcmF3IiwiZGVidWdCb25lcyIsImRlYnVnTWVzaCIsInVzZVRpbnQiLCJfdXBkYXRlVXNlVGludCIsImVuYWJsZUJhdGNoIiwiX3VwZGF0ZUJhdGNoIiwiX2FjY1RpbWUiLCJfcGxheUNvdW50IiwiX2ZyYW1lQ2FjaGUiLCJfY3VyRnJhbWUiLCJfc2tlbGV0b25DYWNoZSIsIl9hbmltYXRpb25RdWV1ZSIsIl9oZWFkQW5pSW5mbyIsIl9wbGF5VGltZXMiLCJfaXNBbmlDb21wbGV0ZSIsImN0b3IiLCJfZWZmZWN0RGVsZWdhdGUiLCJfc2tlbGV0b24iLCJfcm9vdEJvbmUiLCJfbGlzdGVuZXIiLCJfbWF0ZXJpYWxDYWNoZSIsIl9kZWJ1Z1JlbmRlcmVyIiwiX3N0YXJ0U2xvdEluZGV4IiwiX2VuZFNsb3RJbmRleCIsIl9zdGFydEVudHJ5IiwidHJhY2tJbmRleCIsIl9lbmRFbnRyeSIsImF0dGFjaFV0aWwiLCJfZ2V0RGVmYXVsdE1hdGVyaWFsIiwiTWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJfdXBkYXRlTWF0ZXJpYWwiLCJDQ19OQVRJVkVSRU5ERVJFUiIsImJhc2VNYXRlcmlhbCIsImdldE1hdGVyaWFsIiwiZGVmaW5lIiwic3JjQmxlbmRGYWN0b3IiLCJnZngiLCJCTEVORF9PTkUiLCJCTEVORF9TUkNfQUxQSEEiLCJkc3RCbGVuZEZhY3RvciIsIkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEiLCJzZXRCbGVuZCIsIkJMRU5EX0ZVTkNfQUREIiwiZGlzYWJsZVJlbmRlciIsIl9zdXBlciIsIm5vZGUiLCJfcmVuZGVyRmxhZyIsIm1hcmtGb3JSZW5kZXIiLCJlbmFibGUiLCJfdmFsaWRhdGVSZW5kZXIiLCJpc1RleHR1cmVzTG9hZGVkIiwic2V0U2tlbGV0b25EYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRDb250ZW50U2l6ZSIsInNoYXJlZENhY2hlIiwiZW5hYmxlUHJpdmF0ZU1vZGUiLCJ3YXJuIiwic2tlbGV0b25JbmZvIiwiZ2V0U2tlbGV0b25DYWNoZSIsIl91dWlkIiwic2tlbGV0b24iLCJfY2xpcHBlciIsImNsaXBwZXIiLCJnZXRSb290Qm9uZSIsIlNrZWxldG9uQ2xpcHBpbmciLCJzZXRTbG90c1JhbmdlIiwic3RhcnRTbG90SW5kZXgiLCJlbmRTbG90SW5kZXgiLCJzZXRBbmltYXRpb25TdGF0ZURhdGEiLCJzdGF0ZURhdGEiLCJzdGF0ZSIsIkFuaW1hdGlvblN0YXRlIiwiX3N0YXRlIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsIl9fcHJlbG9hZCIsIkZsYWdzIiwiT2JqZWN0IiwiX29iakZsYWdzIiwiSXNBbmNob3JMb2NrZWQiLCJJc1NpemVMb2NrZWQiLCJjaGlsZHJlbiIsImkiLCJuIiwibGVuZ3RoIiwiY2hpbGQiLCJfbmFtZSIsImRlc3Ryb3kiLCJjYWNoZU1vZGUiLCJ1cGRhdGUiLCJkdCIsImZyYW1lQ2FjaGUiLCJpc0ludmFsaWQiLCJ1cGRhdGVUb0ZyYW1lIiwiZnJhbWVzIiwic2hpZnQiLCJkZWxheSIsImFuaUluZm8iLCJfdXBkYXRlQ2FjaGUiLCJfdXBkYXRlUmVhbHRpbWUiLCJfZW1pdENhY2hlQ29tcGxldGVFdmVudCIsImNvbXBsZXRlIiwiZW5kIiwiaXNJbml0ZWQiLCJmcmFtZVRpbWUiLCJGcmFtZVRpbWUiLCJzdGFydCIsImZyYW1lSWR4IiwiTWF0aCIsImZsb29yIiwiaXNDb21wbGV0ZWQiLCJhcHBseSIsInNldFZlcnRleEVmZmVjdERlbGVnYXRlIiwiZWZmZWN0RGVsZWdhdGUiLCJ1cGRhdGVXb3JsZFRyYW5zZm9ybSIsInNldEJvbmVzVG9TZXR1cFBvc2UiLCJzZXRTbG90c1RvU2V0dXBQb3NlIiwidXBkYXRlQW5pbWF0aW9uQ2FjaGUiLCJ1dWlkIiwiaW52YWxpZEFuaW1hdGlvbkNhY2hlIiwiZmluZEJvbmUiLCJib25lTmFtZSIsImZpbmRTbG90Iiwic2xvdE5hbWUiLCJzZXRTa2luQnlOYW1lIiwiZ2V0QXR0YWNobWVudCIsImF0dGFjaG1lbnROYW1lIiwiZ2V0QXR0YWNobWVudEJ5TmFtZSIsInNldEF0dGFjaG1lbnQiLCJnZXRUZXh0dXJlQXRsYXMiLCJyZWdpb25BdHRhY2htZW50IiwicmVnaW9uIiwic2V0TWl4IiwiZnJvbUFuaW1hdGlvbiIsInRvQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJkYXRhIiwiY2FjaGUiLCJnZXRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsIl9oYXNBdHRhY2hlZE5vZGUiLCJlbmFibGVDYWNoZUF0dGFjaGVkSW5mbyIsImZpbmRBbmltYXRpb24iLCJsb2dJRCIsInJlcyIsInNldEFuaW1hdGlvbldpdGgiLCJhZGRBbmltYXRpb24iLCJwdXNoIiwiYWRkQW5pbWF0aW9uV2l0aCIsImNsZWFyVHJhY2tzIiwic2V0U3RhcnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiX2Vuc3VyZUxpc3RlbmVyIiwic2V0SW50ZXJydXB0TGlzdGVuZXIiLCJpbnRlcnJ1cHQiLCJzZXRFbmRMaXN0ZW5lciIsInNldERpc3Bvc2VMaXN0ZW5lciIsImRpc3Bvc2UiLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic2V0VHJhY2tTdGFydExpc3RlbmVyIiwiZ2V0TGlzdGVuZXJzIiwic2V0VHJhY2tJbnRlcnJ1cHRMaXN0ZW5lciIsInNldFRyYWNrRW5kTGlzdGVuZXIiLCJzZXRUcmFja0Rpc3Bvc2VMaXN0ZW5lciIsInNldFRyYWNrQ29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJsb29wQ291bnQiLCJ0cmFja1RpbWUiLCJhbmltYXRpb25FbmQiLCJzZXRUcmFja0V2ZW50TGlzdGVuZXIiLCJnZXRTdGF0ZSIsIl91cGRhdGVBbmltRW51bSIsImFuaW1FbnVtIiwiX3VwZGF0ZVNraW5FbnVtIiwic2tpbkVudW0iLCJnZXRSdW50aW1lRGF0YSIsIkFuaW1hdGlvblN0YXRlRGF0YSIsImUiLCJpbml0IiwiX2Fzc29jaWF0ZUF0dGFjaGVkTm9kZSIsIkVkaXRvciIsIlV0aWxzIiwicmVmcmVzaFNlbGVjdGVkSW5zcGVjdG9yIiwiZGVidWdEcmF3Tm9kZSIsIlByaXZhdGVOb2RlIiwiZGVidWdEcmF3IiwiYWRkQ29tcG9uZW50IiwibGluZVdpZHRoIiwic3Ryb2tlQ29sb3IiLCJjb2xvciIsInBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBbkM7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsaURBQUQsQ0FBL0I7O0FBQ0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsYUFBRCxDQUFyQjs7QUFDQSxJQUFNRyxRQUFRLEdBQUdILE9BQU8sQ0FBQyxzQ0FBRCxDQUF4Qjs7QUFDQSxJQUFNSSxVQUFVLEdBQUdKLE9BQU8sQ0FBQyx5Q0FBRCxDQUExQjs7QUFDQSxJQUFNSyxnQkFBZ0IsR0FBR0QsVUFBVSxDQUFDQyxnQkFBcEM7O0FBRUEsSUFBSUMsYUFBYSxHQUFHTixPQUFPLENBQUMsa0JBQUQsQ0FBM0I7O0FBQ0EsSUFBSU8sVUFBVSxHQUFHUCxPQUFPLENBQUMsY0FB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QUtwSixJQUF2Qzs7QUFDQSxVQUFJLEtBQUtwRixpQkFBTCxFQUFKLEVBQThCO0FBQzFCdkMsUUFBQUEsRUFBRSxDQUFDdUksSUFBSCxDQUFRLGdEQUFSO0FBQ0g7QUFDSixLQWZELE1BZ0JLLElBQUksS0FBS3JDLGNBQVQsRUFBeUI7QUFDMUIsV0FBS0EsY0FBTCxDQUFvQnlCLElBQXBCLENBQXlCb0osTUFBekIsR0FBa0MsSUFBbEM7QUFDSDtBQUNKO0FBNXZDa0IsQ0FBVCxDQUFkO0FBK3ZDQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbFEsRUFBRSxDQUFDQyxRQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IFRyYWNrRW50cnlMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL3RyYWNrLWVudHJ5LWxpc3RlbmVycycpO1xyXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xyXG5jb25zdCBzcGluZSA9IHJlcXVpcmUoJy4vbGliL3NwaW5lJyk7XHJcbmNvbnN0IEdyYXBoaWNzID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2dyYXBoaWNzL2dyYXBoaWNzJyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi8uLi9jb2NvczJkL2NvcmUvcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcclxuY29uc3QgRkxBR19QT1NUX1JFTkRFUiA9IFJlbmRlckZsb3cuRkxBR19QT1NUX1JFTkRFUjtcclxuXHJcbmxldCBTa2VsZXRvbkNhY2hlID0gcmVxdWlyZSgnLi9za2VsZXRvbi1jYWNoZScpO1xyXG5sZXQgQXR0YWNoVXRpbCA9IHJlcXVpcmUoJy4vQXR0YWNoVXRpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgc3BcclxuICovXHJcbmxldCBEZWZhdWx0U2tpbnNFbnVtID0gY2MuRW51bSh7ICdkZWZhdWx0JzogLTEgfSk7XHJcbmxldCBEZWZhdWx0QW5pbXNFbnVtID0gY2MuRW51bSh7ICc8Tm9uZT4nOiAwIH0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgYW5pbWF0aW9uIGNhY2hlIG1vZGUgdHlwZS5cclxuICogISN6aCBTcGluZeWKqOeUu+e8k+WtmOexu+Wei1xyXG4gKiBAZW51bSBTa2VsZXRvbi5BbmltYXRpb25DYWNoZU1vZGVcclxuICovXHJcbmxldCBBbmltYXRpb25DYWNoZU1vZGUgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcmVhbHRpbWUgbW9kZS5cclxuICAgICAqICEjemgg5a6e5pe26K6h566X5qih5byP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUkVBTFRJTUVcclxuICAgICAqL1xyXG4gICAgUkVBTFRJTUU6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHNoYXJlZCBjYWNoZSBtb2RlLlxyXG4gICAgICogISN6aCDlhbHkuqvnvJPlrZjmqKHlvI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFSRURfQ0FDSEVcclxuICAgICAqL1xyXG4gICAgU0hBUkVEX0NBQ0hFOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBwcml2YXRlIGNhY2hlIG1vZGUuXHJcbiAgICAgKiAhI3poIOengeaciee8k+WtmOaooeW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBSSVZBVEVfQ0FDSEVcclxuICAgICAqL1xyXG4gICAgUFJJVkFURV9DQUNIRTogMiBcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzZXRFbnVtQXR0ciAob2JqLCBwcm9wTmFtZSwgZW51bURlZikge1xyXG4gICAgY2MuQ2xhc3MuQXR0ci5zZXRDbGFzc0F0dHIob2JqLCBwcm9wTmFtZSwgJ3R5cGUnLCAnRW51bScpO1xyXG4gICAgY2MuQ2xhc3MuQXR0ci5zZXRDbGFzc0F0dHIob2JqLCBwcm9wTmFtZSwgJ2VudW1MaXN0JywgY2MuRW51bS5nZXRMaXN0KGVudW1EZWYpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIHNrZWxldG9uIG9mIFNwaW5lIDxici8+XHJcbiAqIDxici8+XHJcbiAqIChTa2VsZXRvbiBoYXMgYSByZWZlcmVuY2UgdG8gYSBTa2VsZXRvbkRhdGEgYW5kIHN0b3JlcyB0aGUgc3RhdGUgZm9yIHNrZWxldG9uIGluc3RhbmNlLFxyXG4gKiB3aGljaCBjb25zaXN0cyBvZiB0aGUgY3VycmVudCBwb3NlJ3MgYm9uZSBTUlQsIHNsb3QgY29sb3JzLCBhbmQgd2hpY2ggc2xvdCBhdHRhY2htZW50cyBhcmUgdmlzaWJsZS4gPGJyLz5cclxuICogTXVsdGlwbGUgc2tlbGV0b25zIGNhbiB1c2UgdGhlIHNhbWUgU2tlbGV0b25EYXRhIHdoaWNoIGluY2x1ZGVzIGFsbCBhbmltYXRpb25zLCBza2lucywgYW5kIGF0dGFjaG1lbnRzLikgPGJyLz5cclxuICogISN6aFxyXG4gKiBTcGluZSDpqqjpqrzliqjnlLsgPGJyLz5cclxuICogPGJyLz5cclxuICogKFNrZWxldG9uIOWFt+acieWvuemqqOmqvOaVsOaNrueahOW8leeUqOW5tuS4lOWtmOWCqOS6humqqOmqvOWunuS+i+eahOeKtuaAge+8jFxyXG4gKiDlroPnlLHlvZPliY3nmoTpqqjpqrzliqjkvZzvvIxzbG90IOminOiJsu+8jOWSjOWPr+ingeeahCBzbG90IGF0dGFjaG1lbnRzIOe7hOaIkOOAgjxici8+XHJcbiAqIOWkmuS4qiBTa2VsZXRvbiDlj6/ku6Xkvb/nlKjnm7jlkIznmoTpqqjpqrzmlbDmja7vvIzlhbbkuK3ljIXmi6zmiYDmnInnmoTliqjnlLvvvIznmq7ogqTlkowgYXR0YWNobWVudHPjgIJcclxuICpcclxuICogQGNsYXNzIFNrZWxldG9uXHJcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxyXG4gKi9cclxuc3AuU2tlbGV0b24gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnc3AuU2tlbGV0b24nLFxyXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1NwaW5lIFNrZWxldG9uJyxcclxuICAgICAgICBoZWxwOiAnYXBwOi8vZG9jcy9odG1sL2NvbXBvbmVudHMvc3BpbmUuaHRtbCcsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9za2VsZXRvbjJkLmpzJyxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEFuaW1hdGlvbkNhY2hlTW9kZTogQW5pbWF0aW9uQ2FjaGVNb2RlLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc2tlbGV0YWwgYW5pbWF0aW9uIGlzIHBhdXNlZD9cclxuICAgICAgICAgKiAhI3poIOivpemqqOmqvOWKqOeUu+aYr+WQpuaaguWBnOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwYXVzZWRcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAcmVhZE9ubHlcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhdXNlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHNrZWxldG9uIGRhdGEgY29udGFpbnMgdGhlIHNrZWxldG9uIGluZm9ybWF0aW9uIChiaW5kIHBvc2UgYm9uZXMsIHNsb3RzLCBkcmF3IG9yZGVyLFxyXG4gICAgICAgICAqIGF0dGFjaG1lbnRzLCBza2lucywgZXRjKSBhbmQgYW5pbWF0aW9ucyBidXQgZG9lcyBub3QgaG9sZCBhbnkgc3RhdGUuPGJyLz5cclxuICAgICAgICAgKiBNdWx0aXBsZSBza2VsZXRvbnMgY2FuIHNoYXJlIHRoZSBzYW1lIHNrZWxldG9uIGRhdGEuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmqqOmqvOaVsOaNruWMheWQq+S6humqqOmqvOS/oeaBr++8iOe7keWumumqqOmqvOWKqOS9nO+8jHNsb3Rz77yM5riy5p+T6aG65bqP77yMXHJcbiAgICAgICAgICogYXR0YWNobWVudHPvvIznmq7ogqTnrYnnrYnvvInlkozliqjnlLvkvYbkuI3mjIHmnInku7vkvZXnirbmgIHjgII8YnIvPlxyXG4gICAgICAgICAqIOWkmuS4qiBTa2VsZXRvbiDlj6/ku6XlhbHnlKjnm7jlkIznmoTpqqjpqrzmlbDmja7jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge3NwLlNrZWxldG9uRGF0YX0gc2tlbGV0b25EYXRhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2tlbGV0b25EYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IHNwLlNrZWxldG9uRGF0YSxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNraW4gPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEFuaW1hdGlvbiA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hJbnNwZWN0b3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNrZWxldG9uRGF0YSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLnNrZWxldG9uX2RhdGEnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g55Sx5LqOIHNwaW5lIOeahCBza2luIOaYr+aXoOazleS6jOasoeabv+aNoueahO+8jOaJgOS7peWPquiDveiuvue9rum7mOiupOeahCBza2luXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgbmFtZSBvZiBkZWZhdWx0IHNraW4uXHJcbiAgICAgICAgICogISN6aCDpu5jorqTnmoTnmq7ogqTlkI3np7DjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZGVmYXVsdFNraW5cclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWZhdWx0U2tpbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBuYW1lIG9mIGRlZmF1bHQgYW5pbWF0aW9uLlxyXG4gICAgICAgICAqICEjemgg6buY6K6k55qE5Yqo55S75ZCN56ew44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGRlZmF1bHRBbmltYXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWZhdWx0QW5pbWF0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIG5hbWUgb2YgY3VycmVudCBwbGF5aW5nIGFuaW1hdGlvbi5cclxuICAgICAgICAgKiAhI3poIOW9k+WJjeaSreaUvueahOWKqOeUu+WQjeensOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhbmltYXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBhbmltYXRpb246IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uTmFtZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRDdXJyZW50KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZW50cnkgJiYgZW50cnkuYW5pbWF0aW9uLm5hbWUpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdEFuaW1hdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24oMCwgdmFsdWUsIHRoaXMubG9vcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclRyYWNrKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VG9TZXR1cFBvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gX2RlZmF1bHRTa2luSW5kZXhcclxuICAgICAgICAgKi9cclxuICAgICAgICBfZGVmYXVsdFNraW5JbmRleDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2tlbGV0b25EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNraW5zRW51bSA9IHRoaXMuc2tlbGV0b25EYXRhLmdldFNraW5zRW51bSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNraW5zRW51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRlZmF1bHRTa2luID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihza2luc0VudW0uaGFzT3duUHJvcGVydHkoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWZhdWx0U2tpbkluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBza2luSW5kZXggPSBza2luc0VudW1bdGhpcy5kZWZhdWx0U2tpbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2tpbkluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2tpbkluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBza2luc0VudW07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5za2VsZXRvbkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2luc0VudW0gPSB0aGlzLnNrZWxldG9uRGF0YS5nZXRTa2luc0VudW0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICggIXNraW5zRW51bSApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCgnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBza2luTmFtZSA9IHNraW5zRW51bVt2YWx1ZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbk5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNraW4gPSBza2luTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNraW4odGhpcy5kZWZhdWx0U2tpbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoSW5zcGVjdG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3NTAxLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBEZWZhdWx0U2tpbnNFbnVtLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiRGVmYXVsdCBTa2luXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uZGVmYXVsdF9za2luJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIHZhbHVlIG9mIDAgcmVwcmVzZW50cyBubyBhbmltYXRpb25cclxuICAgICAgICBfYW5pbWF0aW9uSW5kZXg6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25OYW1lID0gKCFDQ19FRElUT1IgfHwgY2MuZW5naW5lLmlzUGxheWluZykgPyB0aGlzLmFuaW1hdGlvbiA6IHRoaXMuZGVmYXVsdEFuaW1hdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNrZWxldG9uRGF0YSAmJiBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW1zRW51bSA9IHRoaXMuc2tlbGV0b25EYXRhLmdldEFuaW1zRW51bSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltc0VudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFuaW1JbmRleCA9IGFuaW1zRW51bVthbmltYXRpb25OYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1JbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5pbUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1zRW51bTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNrZWxldG9uRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1zRW51bSA9IHRoaXMuc2tlbGV0b25EYXRhLmdldEFuaW1zRW51bSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCAhYW5pbXNFbnVtICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDc1MDIsIHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbU5hbWUgPSBhbmltc0VudW1bdmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1OYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IGFuaW1OYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3NTAzLCB0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogRGVmYXVsdEFuaW1zRW51bSxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQW5pbWF0aW9uJyxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi5hbmltYXRpb24nXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gUmVjb3JkIHByZSBjYWNoZSBtb2RlLlxyXG4gICAgICAgIF9wcmVDYWNoZU1vZGU6IC0xLFxyXG4gICAgICAgIF9jYWNoZU1vZGU6IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRSxcclxuICAgICAgICBfZGVmYXVsdENhY2hlTW9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0eXBlOiBBbmltYXRpb25DYWNoZU1vZGUsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbkNhY2hlTW9kZSh0aGlzLl9kZWZhdWx0Q2FjaGVNb2RlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBcIkFuaW1hdGlvbiBDYWNoZSBNb2RlXCIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uYW5pbWF0aW9uX2NhY2hlX21vZGUnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUT0RPXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblvqrnjq/mkq3mlL7lvZPliY3pqqjpqrzliqjnlLvjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGxvb3BcclxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9vcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLmxvb3AnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciB0byBlbmFibGUgcHJlbXVsdGlwbGllZCBhbHBoYS5cclxuICAgICAgICAgKiBZb3Ugc2hvdWxkIGRpc2FibGUgdGhpcyBvcHRpb24gd2hlbiBpbWFnZSdzIHRyYW5zcGFyZW50IGFyZWEgYXBwZWFycyB0byBoYXZlIG9wYXF1ZSBwaXhlbHMsXHJcbiAgICAgICAgICogb3IgZW5hYmxlIHRoaXMgb3B0aW9uIHdoZW4gaW1hZ2UncyBoYWxmIHRyYW5zcGFyZW50IGFyZWEgYXBwZWFycyB0byBiZSBkYXJrZW4uXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjotLTlm77pooTkuZjjgIJcclxuICAgICAgICAgKiDlvZPlm77niYfnmoTpgI/mmI7ljLrln5/lh7rnjrDoibLlnZfml7bpnIDopoHlhbPpl63or6XpgInpobnvvIzlvZPlm77niYfnmoTljYrpgI/mmI7ljLrln5/popzoibLlj5jpu5Hml7bpnIDopoHlkK/nlKjor6XpgInpobnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHByZW11bHRpcGxpZWRBbHBoYVxyXG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi5wcmVtdWx0aXBsaWVkQWxwaGEnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgdGltZSBzY2FsZSBvZiB0aGlzIHNrZWxldG9uLlxyXG4gICAgICAgICAqICEjemgg5b2T5YmN6aqo6aq85Lit5omA5pyJ5Yqo55S755qE5pe26Ze057yp5pS+546H44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWVTY2FsZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aW1lU2NhbGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi50aW1lX3NjYWxlJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgb3BlbiBkZWJ1ZyBzbG90cy5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuaYvuekuiBzbG90IOeahCBkZWJ1ZyDkv6Hmga/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlYnVnU2xvdHNcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRlYnVnU2xvdHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uZGVidWdfc2xvdHMnLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIG9wZW4gZGVidWcgYm9uZXMuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKbmmL7npLogYm9uZSDnmoQgZGVidWcg5L+h5oGv44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWJ1Z0JvbmVzXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWJ1Z0JvbmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLmRlYnVnX2JvbmVzJyxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURlYnVnRHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBvcGVuIGRlYnVnIG1lc2guXHJcbiAgICAgICAgICogISN6aCDmmK/lkKbmmL7npLogbWVzaCDnmoQgZGVidWcg5L+h5oGv44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWJ1Z01lc2hcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRlYnVnTWVzaDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi5kZWJ1Z19tZXNoJyxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURlYnVnRHJhdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBFbmFibGVkIHR3byBjb2xvciB0aW50LlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5ZCv55So5p+T6Imy5pWI5p6c44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB1c2VUaW50XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICB1c2VUaW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLnVzZV90aW50JyxcclxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVVzZVRpbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gRW5hYmxlZCBiYXRjaCBtb2RlbCwgaWYgc2tlbGV0b24gaXMgY29tcGxleCwgZG8gbm90IGVuYWJsZSBiYXRjaCwgb3Igd2lsbCBsb3dlciBwZXJmb3JtYW5jZS5cclxuICAgICAgICAgKiAhI3poIOW8gOWQr+WQiOaJue+8jOWmguaenOa4suafk+Wkp+mHj+ebuOWQjOe6ueeQhu+8jOS4lOe7k+aehOeugOWNleeahOmqqOmqvOWKqOeUu++8jOW8gOWQr+WQiOaJueWPr+S7pemZjeS9jmRyYXdjYWxs77yM5ZCm5YiZ6K+35LiN6KaB5byA5ZCv77yMY3B15raI6ICX5Lya5LiK5Y2H44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVCYXRjaFxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlQmF0Y2g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVCYXRjaCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLmVuYWJsZWRfYmF0Y2gnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQmVsb3cgcHJvcGVydGllcyB3aWxsIGVmZmVjdCB3aGVuIGNhY2hlIG1vZGUgaXMgU0hBUkVEX0NBQ0hFIG9yIFBSSVZBVEVfQ0FDSEUuXHJcbiAgICAgICAgLy8gYWNjdW11bGF0ZSB0aW1lXHJcbiAgICAgICAgX2FjY1RpbWU6IDAsXHJcbiAgICAgICAgLy8gUGxheSB0aW1lcyBjb3VudGVyXHJcbiAgICAgICAgX3BsYXlDb3VudDogMCxcclxuICAgICAgICAvLyBGcmFtZSBjYWNoZVxyXG4gICAgICAgIF9mcmFtZUNhY2hlOiBudWxsLFxyXG4gICAgICAgIC8vIEN1ciBmcmFtZVxyXG4gICAgICAgIF9jdXJGcmFtZTogbnVsbCxcclxuICAgICAgICAvLyBTa2VsZXRvbiBjYWNoZVxyXG4gICAgICAgIF9za2VsZXRvbkNhY2hlIDogbnVsbCxcclxuICAgICAgICAvLyBBaW1hdGlvbiBuYW1lXHJcbiAgICAgICAgX2FuaW1hdGlvbk5hbWUgOiBcIlwiLFxyXG4gICAgICAgIC8vIEFuaW1hdGlvbiBxdWV1ZVxyXG4gICAgICAgIF9hbmltYXRpb25RdWV1ZSA6IFtdLFxyXG4gICAgICAgIC8vIEhlYWQgYW5pbWF0aW9uIGluZm8gb2YgXHJcbiAgICAgICAgX2hlYWRBbmlJbmZvIDogbnVsbCxcclxuICAgICAgICAvLyBQbGF5IHRpbWVzXHJcbiAgICAgICAgX3BsYXlUaW1lcyA6IDAsXHJcbiAgICAgICAgLy8gSXMgYW5pbWF0aW9uIGNvbXBsZXRlLlxyXG4gICAgICAgIF9pc0FuaUNvbXBsZXRlIDogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ09OU1RSVUNUT1JcclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdERlbGVnYXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9za2VsZXRvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcm9vdEJvbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbENhY2hlID0ge307XHJcbiAgICAgICAgdGhpcy5fZGVidWdSZW5kZXJlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRTbG90SW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9lbmRTbG90SW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9zdGFydEVudHJ5ID0ge2FuaW1hdGlvbiA6IHtuYW1lIDogXCJcIn0sIHRyYWNrSW5kZXggOiAwfTtcclxuICAgICAgICB0aGlzLl9lbmRFbnRyeSA9IHthbmltYXRpb24gOiB7bmFtZSA6IFwiXCJ9LCB0cmFja0luZGV4IDogMH07XHJcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsID0gbmV3IEF0dGFjaFV0aWwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb3ZlcnJpZGUgYmFzZSBjbGFzcyBfZ2V0RGVmYXVsdE1hdGVyaWFsIHRvIG1vZGlmeSBkZWZhdWx0IG1hdGVyaWFsXHJcbiAgICBfZ2V0RGVmYXVsdE1hdGVyaWFsICgpIHtcclxuICAgICAgICByZXR1cm4gY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcGluZScpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBvdmVycmlkZSBiYXNlIGNsYXNzIF91cGRhdGVNYXRlcmlhbCB0byBzZXQgZGVmaW5lIHZhbHVlIGFuZCBjbGVhciBtYXRlcmlhbCBjYWNoZVxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBsZXQgdXNlVGludCA9IHRoaXMudXNlVGludCB8fCAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpICYmICFDQ19OQVRJVkVSRU5ERVJFUik7XHJcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBiYXNlTWF0ZXJpYWwuZGVmaW5lKCdVU0VfVElOVCcsIHVzZVRpbnQpO1xyXG4gICAgICAgICAgICBiYXNlTWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCAhdGhpcy5lbmFibGVCYXRjaCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgc3JjQmxlbmRGYWN0b3IgPSB0aGlzLnByZW11bHRpcGxpZWRBbHBoYSA/IGNjLmdmeC5CTEVORF9PTkUgOiBjYy5nZnguQkxFTkRfU1JDX0FMUEhBO1xyXG4gICAgICAgICAgICBsZXQgZHN0QmxlbmRGYWN0b3IgPSBjYy5nZnguQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQTtcclxuXHJcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5zZXRCbGVuZChcclxuICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXHJcbiAgICAgICAgICAgICAgICBzcmNCbGVuZEZhY3Rvciwgc3JjQmxlbmRGYWN0b3IsXHJcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXHJcbiAgICAgICAgICAgICAgICBkc3RCbGVuZEZhY3RvciwgZHN0QmxlbmRGYWN0b3JcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBvdmVycmlkZSBiYXNlIGNsYXNzIGRpc2FibGVSZW5kZXIgdG8gY2xlYXIgcG9zdCByZW5kZXIgZmxhZ1xyXG4gICAgZGlzYWJsZVJlbmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfUE9TVF9SRU5ERVI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIG92ZXJyaWRlIGJhc2UgY2xhc3MgZGlzYWJsZVJlbmRlciB0byBhZGQgcG9zdCByZW5kZXIgZmxhZ1xyXG4gICAgbWFya0ZvclJlbmRlciAoZW5hYmxlKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZW5hYmxlKTtcclxuICAgICAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyB8PSBGTEFHX1BPU1RfUkVOREVSO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+RkxBR19QT1NUX1JFTkRFUjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIGlmIGNoYW5nZSB1c2UgdGludCBtb2RlLCBqdXN0IGNsZWFyIG1hdGVyaWFsIGNhY2hlXHJcbiAgICBfdXBkYXRlVXNlVGludCAoKSB7XHJcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICBsZXQgdXNlVGludCA9IHRoaXMudXNlVGludCB8fCAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpICYmICFDQ19OQVRJVkVSRU5ERVJFUik7XHJcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ1VTRV9USU5UJywgdXNlVGludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsQ2FjaGUgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaWYgY2hhbmdlIHVzZSBiYXRjaCBtb2RlLCBqdXN0IGNsZWFyIG1hdGVyaWFsIGNhY2hlXHJcbiAgICBfdXBkYXRlQmF0Y2ggKCkge1xyXG4gICAgICAgIGxldCBiYXNlTWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIGlmIChiYXNlTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgYmFzZU1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgIXRoaXMuZW5hYmxlQmF0Y2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXRlcmlhbENhY2hlID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIF92YWxpZGF0ZVJlbmRlciAoKSB7XHJcbiAgICAgICAgbGV0IHNrZWxldG9uRGF0YSA9IHRoaXMuc2tlbGV0b25EYXRhO1xyXG4gICAgICAgIGlmICghc2tlbGV0b25EYXRhIHx8ICFza2VsZXRvbkRhdGEuaXNUZXh0dXJlc0xvYWRlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0cyBydW50aW1lIHNrZWxldG9uIGRhdGEgdG8gc3AuU2tlbGV0b24uPGJyPlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgZGlmZmVyZW50IGZyb20gdGhlIGBza2VsZXRvbkRhdGFgIHByb3BlcnR5LiBUaGlzIG1ldGhvZCBpcyBwYXNzZWQgaW4gdGhlIHJhdyBkYXRhIHByb3ZpZGVkIGJ5IHRoZSBTcGluZSBydW50aW1lLCBhbmQgdGhlIHNrZWxldG9uRGF0YSB0eXBlIGlzIHRoZSBhc3NldCB0eXBlIHByb3ZpZGVkIGJ5IENyZWF0b3IuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva7lupXlsYLov5DooYzml7bnlKjliLDnmoQgU2tlbGV0b25EYXRh44CCPGJyPlxyXG4gICAgICog6L+Z5Liq5o6l5Y+j5pyJ5Yir5LqOIGBza2VsZXRvbkRhdGFgIOWxnuaAp++8jOi/meS4quaOpeWPo+S8oOWFpeeahOaYryBTcGluZSBydW50aW1lIOaPkOS+m+eahOWOn+Wni+aVsOaNru+8jOiAjCBza2VsZXRvbkRhdGEg55qE57G75Z6L5pivIENyZWF0b3Ig5o+Q5L6b55qE6LWE5rqQ57G75Z6L44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFNrZWxldG9uRGF0YVxyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5Ta2VsZXRvbkRhdGF9IHNrZWxldG9uRGF0YVxyXG4gICAgICovXHJcbiAgICBzZXRTa2VsZXRvbkRhdGEgKHNrZWxldG9uRGF0YSkge1xyXG4gICAgICAgIGlmIChza2VsZXRvbkRhdGEud2lkdGggIT0gbnVsbCAmJiBza2VsZXRvbkRhdGEuaGVpZ2h0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHNrZWxldG9uRGF0YS53aWR0aCwgc2tlbGV0b25EYXRhLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVNb2RlID09PSBBbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlID0gU2tlbGV0b25DYWNoZS5zaGFyZWRDYWNoZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZU1vZGUgPT09IEFuaW1hdGlvbkNhY2hlTW9kZS5QUklWQVRFX0NBQ0hFKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlID0gbmV3IFNrZWxldG9uQ2FjaGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlLmVuYWJsZVByaXZhdGVNb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdCb25lcyB8fCB0aGlzLmRlYnVnU2xvdHMpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJEZWJ1ZyBib25lcyBvciBzbG90cyBpcyBpbnZhbGlkIGluIGNhY2hlZCBtb2RlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlLmdldFNrZWxldG9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQsIHNrZWxldG9uRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uID0gc2tlbGV0b25JbmZvLnNrZWxldG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlwcGVyID0gc2tlbGV0b25JbmZvLmNsaXBwZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RCb25lID0gdGhpcy5fc2tlbGV0b24uZ2V0Um9vdEJvbmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbiA9IG5ldyBzcGluZS5Ta2VsZXRvbihza2VsZXRvbkRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlwcGVyID0gbmV3IHNwaW5lLlNrZWxldG9uQ2xpcHBpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdEJvbmUgPSB0aGlzLl9za2VsZXRvbi5nZXRSb290Qm9uZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyBzbG90cyB2aXNpYmxlIHJhbmdlLlxyXG4gICAgICogISN6aCDorr7nva7pqqjpqrzmj5Lmp73lj6/op4bojIPlm7TjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0U2xvdHNSYW5nZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0U2xvdEluZGV4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZW5kU2xvdEluZGV4XHJcbiAgICAgKi9cclxuICAgIHNldFNsb3RzUmFuZ2UgKHN0YXJ0U2xvdEluZGV4LCBlbmRTbG90SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCJTbG90cyB2aXNpYmxlIHJhbmdlIGNhbiBub3QgYmUgbW9kaWZpZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0U2xvdEluZGV4ID0gc3RhcnRTbG90SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZFNsb3RJbmRleCA9IGVuZFNsb3RJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIGFuaW1hdGlvbiBzdGF0ZSBkYXRhLjxicj5cclxuICAgICAqIFRoZSBwYXJhbWV0ZXIgdHlwZSBpcyB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LkFuaW1hdGlvblN0YXRlRGF0YS5cclxuICAgICAqICEjemgg6K6+572u5Yqo55S754q25oCB5pWw5o2u44CCPGJyPlxyXG4gICAgICog5Y+C5pWw5pivIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uQW5pbWF0aW9uU3RhdGVEYXRh44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEFuaW1hdGlvblN0YXRlRGF0YVxyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5BbmltYXRpb25TdGF0ZURhdGF9IHN0YXRlRGF0YVxyXG4gICAgICovXHJcbiAgICBzZXRBbmltYXRpb25TdGF0ZURhdGEgKHN0YXRlRGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgY2Mud2FybihcIidzZXRBbmltYXRpb25TdGF0ZURhdGEnIGludGVyZmFjZSBjYW4gbm90IGJlIGludm9rZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IG5ldyBzcGluZS5BbmltYXRpb25TdGF0ZShzdGF0ZURhdGEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnJlbW92ZUxpc3RlbmVyKHRoaXMuX2xpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXRlLmFkZExpc3RlbmVyKHRoaXMuX2xpc3RlbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU1QTEVNRU5UXHJcbiAgICBfX3ByZWxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB2YXIgRmxhZ3MgPSBjYy5PYmplY3QuRmxhZ3M7XHJcbiAgICAgICAgICAgIHRoaXMuX29iakZsYWdzIHw9IChGbGFncy5Jc0FuY2hvckxvY2tlZCB8IEZsYWdzLklzU2l6ZUxvY2tlZCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoSW5zcGVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZC5fbmFtZSA9PT0gXCJERUJVR19EUkFXX05PREVcIiApIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2tlbGV0b25EYXRhKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlVXNlVGludCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUJhdGNoKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSXQncyBiZXN0IHRvIHNldCBjYWNoZSBtb2RlIGJlZm9yZSBzZXQgcHJvcGVydHkgJ2RyYWdvbkFzc2V0Jywgb3Igd2lsbCB3YXN0ZSBzb21lIGNwdSB0aW1lLlxyXG4gICAgICogSWYgc2V0IHRoZSBtb2RlIGluIGVkaXRvciwgdGhlbiBubyBuZWVkIHRvIHdvcnJ5IGFib3V0IG9yZGVyIHByb2JsZW0uXHJcbiAgICAgKiAhI3poIFxyXG4gICAgICog6Iul5oOz5YiH5o2i5riy5p+T5qih5byP77yM5pyA5aW95Zyo6K6+572uJ2RyYWdvbkFzc2V0J+S5i+WJje+8jOWFiOiuvue9ruWlvea4suafk+aooeW8j++8jOWQpuWImeaciei/kOihjOaXtuW8gOmUgOOAglxyXG4gICAgICog6Iul5Zyo57yW6L6R5Lit6K6+572u5riy5p+T5qih5byP77yM5YiZ5peg6ZyA5ouF5b+D6K6+572u5qyh5bqP55qE6Zeu6aKY44CCXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2Qgc2V0QW5pbWF0aW9uQ2FjaGVNb2RlXHJcbiAgICAgKiBAcGFyYW0ge0FuaW1hdGlvbkNhY2hlTW9kZX0gY2FjaGVNb2RlXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogc2tlbGV0b24uc2V0QW5pbWF0aW9uQ2FjaGVNb2RlKHNwLlNrZWxldG9uLkFuaW1hdGlvbkNhY2hlTW9kZS5TSEFSRURfQ0FDSEUpO1xyXG4gICAgICovXHJcbiAgICBzZXRBbmltYXRpb25DYWNoZU1vZGUgKGNhY2hlTW9kZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wcmVDYWNoZU1vZGUgIT09IGNhY2hlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZU1vZGUgPSBjYWNoZU1vZGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNrZWxldG9uRGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVVc2VUaW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gV2hldGhlciBpbiBjYWNoZWQgbW9kZS5cclxuICAgICAqICEjemgg5b2T5YmN5piv5ZCm5aSE5LqO57yT5a2Y5qih5byP44CCXHJcbiAgICAgKiBAbWV0aG9kIGlzQW5pbWF0aW9uQ2FjaGVkXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0FuaW1hdGlvbkNhY2hlZCAoKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZU1vZGUgIT09IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgZHQgKj0gdGhpcy50aW1lU2NhbGUgKiBzcC50aW1lU2NhbGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENhY2hlIG1vZGUgYW5kIGhhcyBhbmltYXRpb24gcXVldWUuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0FuaUNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uUXVldWUubGVuZ3RoID09PSAwICYmICF0aGlzLl9oZWFkQW5pSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZUNhY2hlID0gdGhpcy5fZnJhbWVDYWNoZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVDYWNoZSAmJiBmcmFtZUNhY2hlLmlzSW52YWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lQ2FjaGUudXBkYXRlVG9GcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gZnJhbWVDYWNoZS5mcmFtZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9oZWFkQW5pSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRBbmlJbmZvID0gdGhpcy5fYW5pbWF0aW9uUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgKz0gZHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWNjVGltZSA+IHRoaXMuX2hlYWRBbmlJbmZvLmRlbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuaUluZm8gPSB0aGlzLl9oZWFkQW5pSW5mbztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkQW5pSW5mbyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24gKDAsIGFuaUluZm8uYW5pbWF0aW9uTmFtZSwgYW5pSW5mby5sb29wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FjaGUoZHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlYWx0aW1lKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9lbWl0Q2FjaGVDb21wbGV0ZUV2ZW50ICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fZW5kRW50cnkuYW5pbWF0aW9uLm5hbWUgPSB0aGlzLl9hbmltYXRpb25OYW1lO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyLmNvbXBsZXRlICYmIHRoaXMuX2xpc3RlbmVyLmNvbXBsZXRlKHRoaXMuX2VuZEVudHJ5KTtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lci5lbmQgJiYgdGhpcy5fbGlzdGVuZXIuZW5kKHRoaXMuX2VuZEVudHJ5KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUNhY2hlIChkdCkge1xyXG4gICAgICAgIGxldCBmcmFtZUNhY2hlID0gdGhpcy5fZnJhbWVDYWNoZTtcclxuICAgICAgICBpZiAoIWZyYW1lQ2FjaGUuaXNJbml0ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmcmFtZXMgPSBmcmFtZUNhY2hlLmZyYW1lcztcclxuICAgICAgICBsZXQgZnJhbWVUaW1lID0gU2tlbGV0b25DYWNoZS5GcmFtZVRpbWU7XHJcblxyXG4gICAgICAgIC8vIEFuaW1hdGlvbiBTdGFydCwgdGhlIGV2ZW50IGRpZmZyZW50IGZyb20gZHJhZ29uYm9uZXMgaW5uZXIgZXZlbnQsXHJcbiAgICAgICAgLy8gSXQgaGFzIG5vIGV2ZW50IG9iamVjdC5cclxuICAgICAgICBpZiAodGhpcy5fYWNjVGltZSA9PSAwICYmIHRoaXMuX3BsYXlDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0RW50cnkuYW5pbWF0aW9uLm5hbWUgPSB0aGlzLl9hbmltYXRpb25OYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lciAmJiB0aGlzLl9saXN0ZW5lci5zdGFydCAmJiB0aGlzLl9saXN0ZW5lci5zdGFydCh0aGlzLl9zdGFydEVudHJ5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FjY1RpbWUgKz0gZHQ7XHJcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gTWF0aC5mbG9vcih0aGlzLl9hY2NUaW1lIC8gZnJhbWVUaW1lKTtcclxuICAgICAgICBpZiAoIWZyYW1lQ2FjaGUuaXNDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKGZyYW1lSWR4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmcmFtZUNhY2hlLmlzQ29tcGxldGVkICYmIGZyYW1lSWR4ID49IGZyYW1lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGxheUNvdW50ICsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGxheVRpbWVzID4gMCAmJiB0aGlzLl9wbGF5Q291bnQgPj0gdGhpcy5fcGxheVRpbWVzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgZnJhbWUgdG8gZW5kIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSBmcmFtZXNbZnJhbWVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNBbmlDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0Q2FjaGVDb21wbGV0ZUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYWNjVGltZSA9IDA7XHJcbiAgICAgICAgICAgIGZyYW1lSWR4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fZW1pdENhY2hlQ29tcGxldGVFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZUlkeF07XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVSZWFsdGltZSAoZHQpIHtcclxuICAgICAgICBsZXQgc2tlbGV0b24gPSB0aGlzLl9za2VsZXRvbjtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcclxuICAgICAgICBpZiAoc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgc2tlbGV0b24udXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuYXBwbHkoc2tlbGV0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB2ZXJ0ZXggZWZmZWN0IGRlbGVnYXRlLlxyXG4gICAgICogISN6aCDorr7nva7pobbngrnliqjnlLvku6PnkIZcclxuICAgICAqIEBtZXRob2Qgc2V0VmVydGV4RWZmZWN0RGVsZWdhdGVcclxuICAgICAqIEBwYXJhbSB7c3AuVmVydGV4RWZmZWN0RGVsZWdhdGV9IGVmZmVjdERlbGVnYXRlXHJcbiAgICAgKi9cclxuICAgIHNldFZlcnRleEVmZmVjdERlbGVnYXRlIChlZmZlY3REZWxlZ2F0ZSkge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdERlbGVnYXRlID0gZWZmZWN0RGVsZWdhdGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFJFTkRFUkVSXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbXB1dGVzIHRoZSB3b3JsZCBTUlQgZnJvbSB0aGUgbG9jYWwgU1JUIGZvciBlYWNoIGJvbmUuXHJcbiAgICAgKiAhI3poIOmHjeaWsOabtOaWsOaJgOaciemqqOmqvOeahOS4lueVjCBUcmFuc2Zvcm3vvIxcclxuICAgICAqIOW9k+iOt+WPliBib25lIOeahOaVsOWAvOacquabtOaWsOaXtu+8jOWNs+WPr+S9v+eUqOivpeWHveaVsOi/m+ihjOabtOaWsOaVsOWAvOOAglxyXG4gICAgICogQG1ldGhvZCB1cGRhdGVXb3JsZFRyYW5zZm9ybVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBib25lID0gc3BpbmUuZmluZEJvbmUoJ2hlYWQnKTtcclxuICAgICAqIGNjLmxvZyhib25lLndvcmxkWCk7IC8vIHJldHVybiAwO1xyXG4gICAgICogc3BpbmUudXBkYXRlV29ybGRUcmFuc2Zvcm0oKTtcclxuICAgICAqIGJvbmUgPSBzcGluZS5maW5kQm9uZSgnaGVhZCcpO1xyXG4gICAgICogY2MubG9nKGJvbmUud29ybGRYKTsgLy8gcmV0dXJuIC0yMy4xMjtcclxuICAgICAqL1xyXG4gICAgdXBkYXRlV29ybGRUcmFuc2Zvcm0gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgdGhlIGJvbmVzIGFuZCBzbG90cyB0byB0aGUgc2V0dXAgcG9zZS5cclxuICAgICAqICEjemgg6L+Y5Y6f5Yiw6LW35aeL5Yqo5L2cXHJcbiAgICAgKiBAbWV0aG9kIHNldFRvU2V0dXBQb3NlXHJcbiAgICAgKi9cclxuICAgIHNldFRvU2V0dXBQb3NlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0VG9TZXR1cFBvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0cyB0aGUgYm9uZXMgdG8gdGhlIHNldHVwIHBvc2UsXHJcbiAgICAgKiB1c2luZyB0aGUgdmFsdWVzIGZyb20gdGhlIGBCb25lRGF0YWAgbGlzdCBpbiB0aGUgYFNrZWxldG9uRGF0YWAuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva4gYm9uZSDliLDotbflp4vliqjkvZxcclxuICAgICAqIOS9v+eUqCBTa2VsZXRvbkRhdGEg5Lit55qEIEJvbmVEYXRhIOWIl+ihqOS4reeahOWAvOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRCb25lc1RvU2V0dXBQb3NlXHJcbiAgICAgKi9cclxuICAgIHNldEJvbmVzVG9TZXR1cFBvc2UgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbi5zZXRCb25lc1RvU2V0dXBQb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldHMgdGhlIHNsb3RzIHRvIHRoZSBzZXR1cCBwb3NlLFxyXG4gICAgICogdXNpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBgU2xvdERhdGFgIGxpc3QgaW4gdGhlIGBTa2VsZXRvbkRhdGFgLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6+572uIHNsb3Qg5Yiw6LW35aeL5Yqo5L2c44CCXHJcbiAgICAgKiDkvb/nlKggU2tlbGV0b25EYXRhIOS4reeahCBTbG90RGF0YSDliJfooajkuK3nmoTlgLzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0U2xvdHNUb1NldHVwUG9zZVxyXG4gICAgICovXHJcbiAgICBzZXRTbG90c1RvU2V0dXBQb3NlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0U2xvdHNUb1NldHVwUG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBVcGRhdGluZyBhbiBhbmltYXRpb24gY2FjaGUgdG8gY2FsY3VsYXRlIGFsbCBmcmFtZSBkYXRhIGluIHRoZSBhbmltYXRpb24gaXMgYSBjb3N0IGluIFxyXG4gICAgICogcGVyZm9ybWFuY2UgZHVlIHRvIGNhbGN1bGF0aW5nIGFsbCBkYXRhIGluIGEgc2luZ2xlIGZyYW1lLlxyXG4gICAgICogVG8gdXBkYXRlIHRoZSBjYWNoZSwgdXNlIHRoZSBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUgbWV0aG9kIHdpdGggaGlnaCBwZXJmb3JtYW5jZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOabtOaWsOafkOS4quWKqOeUu+e8k+WtmCwg6aKE6K6h566X5Yqo55S75Lit5omA5pyJ5bin5pWw5o2u77yM55Sx5LqO5Zyo5Y2V5bin6K6h566X5omA5pyJ5pWw5o2u77yM5omA5Lul6L6D5raI6ICX5oCn6IO944CCXHJcbiAgICAgKiDoi6Xmg7Pmm7TmlrDnvJPlrZjvvIzlj6/kvb/nlKggaW52YWxpZEFuaW1hdGlvbkNhY2hlIOaWueazle+8jOWFt+aciei+g+mrmOaAp+iDveOAglxyXG4gICAgICogQG1ldGhvZCB1cGRhdGVBbmltYXRpb25DYWNoZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFuaW1OYW1lXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUFuaW1hdGlvbkNhY2hlIChhbmltTmFtZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHV1aWQgPSB0aGlzLnNrZWxldG9uRGF0YS5fdXVpZDtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b25DYWNoZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlLnVwZGF0ZUFuaW1hdGlvbkNhY2hlKHV1aWQsIGFuaW1OYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW52YWxpZGF0ZXMgdGhlIGFuaW1hdGlvbiBjYWNoZSwgd2hpY2ggaXMgdGhlbiByZWNvbXB1dGVkIG9uIGVhY2ggZnJhbWUuLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5L2/5Yqo55S757yT5a2Y5aSx5pWI77yM5LmL5ZCO5Lya5Zyo5q+P5bin6YeN5paw6K6h566X44CCXHJcbiAgICAgKiBAbWV0aG9kIGludmFsaWRBbmltYXRpb25DYWNoZVxyXG4gICAgICovXHJcbiAgICBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZS5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBGaW5kcyBhIGJvbmUgYnkgbmFtZS5cclxuICAgICAqIFRoaXMgZG9lcyBhIHN0cmluZyBjb21wYXJpc29uIGZvciBldmVyeSBib25lLjxicj5cclxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LkJvbmUgb2JqZWN0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+H5ZCN56ew5p+l5om+IGJvbmXjgIJcclxuICAgICAqIOi/memHjOWvueavj+S4qiBib25lIOeahOWQjeensOi/m+ihjOS6huWvueavlOOAgjxicj5cclxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LkJvbmUg5a+56LGh44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBmaW5kQm9uZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJvbmVOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5Cb25lfVxyXG4gICAgICovXHJcbiAgICBmaW5kQm9uZSAoYm9uZU5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NrZWxldG9uLmZpbmRCb25lKGJvbmVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRmluZHMgYSBzbG90IGJ5IG5hbWUuIFRoaXMgZG9lcyBhIHN0cmluZyBjb21wYXJpc29uIGZvciBldmVyeSBzbG90Ljxicj5cclxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlNsb3Qgb2JqZWN0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+H5ZCN56ew5p+l5om+IHNsb3TjgILov5nph4zlr7nmr4/kuKogc2xvdCDnmoTlkI3np7Dov5vooYzkuobmr5TovoPjgII8YnI+XHJcbiAgICAgKiDov5Tlm57kuIDkuKoge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5TbG90IOWvueixoeOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgZmluZFNsb3RcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbG90TmFtZVxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuU2xvdH1cclxuICAgICAqL1xyXG4gICAgZmluZFNsb3QgKHNsb3ROYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9za2VsZXRvbi5maW5kU2xvdChzbG90TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEZpbmRzIGEgc2tpbiBieSBuYW1lIGFuZCBtYWtlcyBpdCB0aGUgYWN0aXZlIHNraW4uXHJcbiAgICAgKiBUaGlzIGRvZXMgYSBzdHJpbmcgY29tcGFyaXNvbiBmb3IgZXZlcnkgc2tpbi48YnI+XHJcbiAgICAgKiBOb3RlIHRoYXQgc2V0dGluZyB0aGUgc2tpbiBkb2VzIG5vdCBjaGFuZ2Ugd2hpY2ggYXR0YWNobWVudHMgYXJlIHZpc2libGUuPGJyPlxyXG4gICAgICogUmV0dXJucyBhIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uU2tpbiBvYmplY3QuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmjInlkI3np7Dmn6Xmib7nmq7ogqTvvIzmv4DmtLvor6Xnmq7ogqTjgILov5nph4zlr7nmr4/kuKrnmq7ogqTnmoTlkI3np7Dov5vooYzkuobmr5TovoPjgII8YnI+XHJcbiAgICAgKiDms6jmhI/vvJrorr7nva7nmq7ogqTkuI3kvJrmlLnlj5ggYXR0YWNobWVudCDnmoTlj6/op4HmgKfjgII8YnI+XHJcbiAgICAgKiDov5Tlm57kuIDkuKoge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5Ta2luIOWvueixoeOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2Qgc2V0U2tpblxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNraW5OYW1lXHJcbiAgICAgKi9cclxuICAgIHNldFNraW4gKHNraW5OYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uLnNldFNraW5CeU5hbWUoc2tpbk5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbi5zZXRTbG90c1RvU2V0dXBQb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgYXR0YWNobWVudCBmb3IgdGhlIHNsb3QgYW5kIGF0dGFjaG1lbnQgbmFtZS5cclxuICAgICAqIFRoZSBza2VsZXRvbiBsb29rcyBmaXJzdCBpbiBpdHMgc2tpbiwgdGhlbiBpbiB0aGUgc2tlbGV0b24gZGF0YeKAmXMgZGVmYXVsdCBza2luLjxicj5cclxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LkF0dGFjaG1lbnQgb2JqZWN0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+HIHNsb3Qg5ZKMIGF0dGFjaG1lbnQg55qE5ZCN56ew6I635Y+WIGF0dGFjaG1lbnTjgIJTa2VsZXRvbiDkvJjlhYjmn6Xmib7lroPnmoTnmq7ogqTvvIznhLblkI7miY3mmK8gU2tlbGV0b24gRGF0YSDkuK3pu5jorqTnmoTnmq7ogqTjgII8YnI+XHJcbiAgICAgKiDov5Tlm57kuIDkuKoge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5BdHRhY2htZW50IOWvueixoeOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNobWVudFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsb3ROYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0YWNobWVudE5hbWVcclxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkF0dGFjaG1lbnR9XHJcbiAgICAgKi9cclxuICAgIGdldEF0dGFjaG1lbnQgKHNsb3ROYW1lLCBhdHRhY2htZW50TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tlbGV0b24uZ2V0QXR0YWNobWVudEJ5TmFtZShzbG90TmFtZSwgYXR0YWNobWVudE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXRzIHRoZSBhdHRhY2htZW50IGZvciB0aGUgc2xvdCBhbmQgYXR0YWNobWVudCBuYW1lLlxyXG4gICAgICogVGhlIHNrZWxldG9uIGxvb2tzIGZpcnN0IGluIGl0cyBza2luLCB0aGVuIGluIHRoZSBza2VsZXRvbiBkYXRh4oCZcyBkZWZhdWx0IHNraW4uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDpgJrov4cgc2xvdCDlkowgYXR0YWNobWVudCDnmoTlkI3lrZfmnaXorr7nva4gYXR0YWNobWVudOOAglxyXG4gICAgICogU2tlbGV0b24g5LyY5YWI5p+l5om+5a6D55qE55qu6IKk77yM54S25ZCO5omN5pivIFNrZWxldG9uIERhdGEg5Lit6buY6K6k55qE55qu6IKk44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEF0dGFjaG1lbnRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbG90TmFtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF0dGFjaG1lbnROYW1lXHJcbiAgICAgKi9cclxuICAgIHNldEF0dGFjaG1lbnQgKHNsb3ROYW1lLCBhdHRhY2htZW50TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbi5zZXRBdHRhY2htZW50KHNsb3ROYW1lLCBhdHRhY2htZW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm4gdGhlIHJlbmRlcmVyIG9mIGF0dGFjaG1lbnQuXHJcbiAgICAqIEBtZXRob2QgZ2V0VGV4dHVyZUF0bGFzXHJcbiAgICAqIEBwYXJhbSB7c3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudHxzcGluZS5Cb3VuZGluZ0JveEF0dGFjaG1lbnR9IHJlZ2lvbkF0dGFjaG1lbnRcclxuICAgICogQHJldHVybiB7c3Auc3BpbmUuVGV4dHVyZUF0bGFzUmVnaW9ufVxyXG4gICAgKi9cclxuICAgIGdldFRleHR1cmVBdGxhcyAocmVnaW9uQXR0YWNobWVudCkge1xyXG4gICAgICAgIHJldHVybiByZWdpb25BdHRhY2htZW50LnJlZ2lvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQU5JTUFUSU9OXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIE1peCBhcHBsaWVzIGFsbCBrZXlmcmFtZSB2YWx1ZXMsXHJcbiAgICAgKiBpbnRlcnBvbGF0ZWQgZm9yIHRoZSBzcGVjaWZpZWQgdGltZSBhbmQgbWl4ZWQgd2l0aCB0aGUgY3VycmVudCB2YWx1ZXMuXHJcbiAgICAgKiAhI3poIOS4uuaJgOacieWFs+mUruW4p+iuvuWumua3t+WQiOWPiua3t+WQiOaXtumXtO+8iOS7juW9k+WJjeWAvOW8gOWni+W3ruWAvO+8ieOAglxyXG4gICAgICogQG1ldGhvZCBzZXRNaXhcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tQW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdG9BbmltYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBzZXRNaXggKGZyb21BbmltYXRpb24sIHRvQW5pbWF0aW9uLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZS5kYXRhLnNldE1peChmcm9tQW5pbWF0aW9uLCB0b0FuaW1hdGlvbiwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgY3VycmVudCBhbmltYXRpb24uIEFueSBxdWV1ZWQgYW5pbWF0aW9ucyBhcmUgY2xlYXJlZC48YnI+XHJcbiAgICAgKiBSZXR1cm5zIGEge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5UcmFja0VudHJ5IG9iamVjdC5cclxuICAgICAqICEjemgg6K6+572u5b2T5YmN5Yqo55S744CC6Zif5YiX5Lit55qE5Lu75L2V55qE5Yqo55S75bCG6KKr5riF6Zmk44CCPGJyPlxyXG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uVHJhY2tFbnRyeSDlr7nosaHjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0QW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHJhY2tJbmRleFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcFxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuVHJhY2tFbnRyeX1cclxuICAgICAqL1xyXG4gICAgc2V0QW5pbWF0aW9uICh0cmFja0luZGV4LCBuYW1lLCBsb29wKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXlUaW1lcyA9IGxvb3AgPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25OYW1lID0gbmFtZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodHJhY2tJbmRleCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIlRyYWNrIGluZGV4IGNhbiBub3QgZ3JlYXRlciB0aGFuIDAgaW4gY2FjaGVkIG1vZGUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2tlbGV0b25DYWNoZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIGxldCBjYWNoZSA9IHRoaXMuX3NrZWxldG9uQ2FjaGUuZ2V0QW5pbWF0aW9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQsIG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICBjYWNoZSA9IHRoaXMuX3NrZWxldG9uQ2FjaGUuaW5pdEFuaW1hdGlvbkNhY2hlKHRoaXMuc2tlbGV0b25EYXRhLl91dWlkLCBuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FjaGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzQW5pQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ2FjaGUgPSBjYWNoZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaFV0aWwuX2hhc0F0dGFjaGVkTm9kZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVDYWNoZS5lbmFibGVDYWNoZUF0dGFjaGVkSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSB0aGlzLl9mcmFtZUNhY2hlLmZyYW1lc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdGlvbiA9IHRoaXMuX3NrZWxldG9uLmRhdGEuZmluZEFuaW1hdGlvbihuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nSUQoNzUwOSwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5fc3RhdGUuc2V0QW5pbWF0aW9uV2l0aCh0cmFja0luZGV4LCBhbmltYXRpb24sIGxvb3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUuYXBwbHkodGhpcy5fc2tlbGV0b24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFkZHMgYW4gYW5pbWF0aW9uIHRvIGJlIHBsYXllZCBkZWxheSBzZWNvbmRzIGFmdGVyIHRoZSBjdXJyZW50IG9yIGxhc3QgcXVldWVkIGFuaW1hdGlvbi48YnI+XHJcbiAgICAgKiBSZXR1cm5zIGEge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5UcmFja0VudHJ5IG9iamVjdC5cclxuICAgICAqICEjemgg5re75Yqg5LiA5Liq5Yqo55S75Yiw5Yqo55S76Zif5YiX5bC+6YOo77yM6L+Y5Y+v5Lul5bu26L+f5oyH5a6a55qE56eS5pWw44CCPGJyPlxyXG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uVHJhY2tFbnRyeSDlr7nosaHjgIJcclxuICAgICAqIEBtZXRob2QgYWRkQW5pbWF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHJhY2tJbmRleFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkZWxheT0wXVxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuVHJhY2tFbnRyeX1cclxuICAgICAqL1xyXG4gICAgYWRkQW5pbWF0aW9uICh0cmFja0luZGV4LCBuYW1lLCBsb29wLCBkZWxheSkge1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgfHwgMDtcclxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFja0luZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiVHJhY2sgaW5kZXggY2FuIG5vdCBncmVhdGVyIHRoYW4gMCBpbiBjYWNoZWQgbW9kZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUXVldWUucHVzaCh7YW5pbWF0aW9uTmFtZSA6IG5hbWUsIGxvb3A6IGxvb3AsIGRlbGF5IDogZGVsYXl9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLl9za2VsZXRvbi5kYXRhLmZpbmRBbmltYXRpb24obmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDc1MTAsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmFkZEFuaW1hdGlvbldpdGgodHJhY2tJbmRleCwgYW5pbWF0aW9uLCBsb29wLCBkZWxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBGaW5kIGFuaW1hdGlvbiB3aXRoIHNwZWNpZmllZCBuYW1lLlxyXG4gICAgICogISN6aCDmn6Xmib7mjIflrprlkI3np7DnmoTliqjnlLtcclxuICAgICAqIEBtZXRob2QgZmluZEFuaW1hdGlvblxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm5zIHtzcC5zcGluZS5BbmltYXRpb259XHJcbiAgICAgKi9cclxuICAgIGZpbmRBbmltYXRpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NrZWxldG9uLmRhdGEuZmluZEFuaW1hdGlvbihuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRyYWNrIGVudHJ5IGJ5IHRyYWNrSW5kZXguPGJyPlxyXG4gICAgICogUmV0dXJucyBhIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uVHJhY2tFbnRyeSBvYmplY3QuXHJcbiAgICAgKiAhI3poIOmAmui/hyB0cmFjayDntKLlvJXojrflj5YgVHJhY2tFbnRyeeOAgjxicj5cclxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlRyYWNrRW50cnkg5a+56LGh44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEN1cnJlbnRcclxuICAgICAqIEBwYXJhbSB0cmFja0luZGV4XHJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5UcmFja0VudHJ5fVxyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50ICh0cmFja0luZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiJ2dldEN1cnJlbnQnIGludGVyZmFjZSBjYW4gbm90IGJlIGludm9rZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmdldEN1cnJlbnQodHJhY2tJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDbGVhcnMgYWxsIHRyYWNrcyBvZiBhbmltYXRpb24gc3RhdGUuXHJcbiAgICAgKiAhI3poIOa4hemZpOaJgOaciSB0cmFjayDnmoTliqjnlLvnirbmgIHjgIJcclxuICAgICAqIEBtZXRob2QgY2xlYXJUcmFja3NcclxuICAgICAqL1xyXG4gICAgY2xlYXJUcmFja3MgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcclxuICAgICAgICAgICAgY2Mud2FybihcIidjbGVhclRyYWNrcycgaW50ZXJmYWNlIGNhbiBub3QgYmUgaW52b2tlZCBpbiBjYWNoZWQgbW9kZS5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2xlYXJzIHRyYWNrIG9mIGFuaW1hdGlvbiBzdGF0ZSBieSB0cmFja0luZGV4LlxyXG4gICAgICogISN6aCDmuIXpmaTlh7rmjIflrpogdHJhY2sg55qE5Yqo55S754q25oCB44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsZWFyVHJhY2tcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0cmFja0luZGV4XHJcbiAgICAgKi9cclxuICAgIGNsZWFyVHJhY2sgKHRyYWNrSW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCInY2xlYXJUcmFjaycgaW50ZXJmYWNlIGNhbiBub3QgYmUgaW52b2tlZCBpbiBjYWNoZWQgbW9kZS5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5jbGVhclRyYWNrKHRyYWNrSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnVwZGF0ZSgwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgc3RhcnQgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruW8gOWni+aSreaUvuWKqOeUu+eahOS6i+S7tuebkeWQrOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRTdGFydExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBzZXRTdGFydExpc3RlbmVyIChsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuX2Vuc3VyZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuc3RhcnQgPSBsaXN0ZW5lcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgaW50ZXJydXB0IGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogISN6aCDnlKjmnaXorr7nva7liqjnlLvooqvmiZPmlq3nmoTkuovku7bnm5HlkKzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0SW50ZXJydXB0TGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHNldEludGVycnVwdExpc3RlbmVyIChsaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuX2Vuc3VyZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuaW50ZXJydXB0ID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGVuZCBldmVudCBsaXN0ZW5lci5cclxuICAgICAqICEjemgg55So5p2l6K6+572u5Yqo55S75pKt5pS+5a6M5ZCO55qE5LqL5Lu255uR5ZCs44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEVuZExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBzZXRFbmRMaXN0ZW5lciAobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLl9lbnN1cmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyLmVuZCA9IGxpc3RlbmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHRoZSBkaXNwb3NlIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogISN6aCDnlKjmnaXorr7nva7liqjnlLvlsIbooqvplIDmr4HnmoTkuovku7bnm5HlkKzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RGlzcG9zZUxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBzZXREaXNwb3NlTGlzdGVuZXIgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZW5zdXJlTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lci5kaXNwb3NlID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGNvbXBsZXRlIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICogISN6aCDnlKjmnaXorr7nva7liqjnlLvmkq3mlL7kuIDmrKHlvqrnjq/nu5PmnZ/lkI7nmoTkuovku7bnm5HlkKzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0Q29tcGxldGVMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcclxuICAgICAqL1xyXG4gICAgc2V0Q29tcGxldGVMaXN0ZW5lciAobGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLl9lbnN1cmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVyLmNvbXBsZXRlID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGFuaW1hdGlvbiBldmVudCBsaXN0ZW5lci5cclxuICAgICAqICEjemgg55So5p2l6K6+572u5Yqo55S75pKt5pS+6L+H56iL5Lit5bin5LqL5Lu255qE55uR5ZCs44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEV2ZW50TGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHNldEV2ZW50TGlzdGVuZXIgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZW5zdXJlTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLl9saXN0ZW5lci5ldmVudCA9IGxpc3RlbmVyO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHRoZSBzdGFydCBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXHJcbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+W8gOWni+aSreaUvueahOS6i+S7tuebkeWQrOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUcmFja1N0YXJ0TGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7c3Auc3BpbmUuVHJhY2tFbnRyeX0gZW50cnlcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHNldFRyYWNrU3RhcnRMaXN0ZW5lciAoZW50cnksIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLnN0YXJ0ID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGludGVycnVwdCBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXHJcbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+iiq+aJk+aWreeahOS6i+S7tuebkeWQrOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUcmFja0ludGVycnVwdExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge3NwLnNwaW5lLlRyYWNrRW50cnl9IGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBzZXRUcmFja0ludGVycnVwdExpc3RlbmVyIChlbnRyeSwgbGlzdGVuZXIpIHtcclxuICAgICAgICBUcmFja0VudHJ5TGlzdGVuZXJzLmdldExpc3RlbmVycyhlbnRyeSkuaW50ZXJydXB0ID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGVuZCBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXHJcbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+aSreaUvue7k+adn+eahOS6i+S7tuebkeWQrOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUcmFja0VuZExpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge3NwLnNwaW5lLlRyYWNrRW50cnl9IGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICovXHJcbiAgICBzZXRUcmFja0VuZExpc3RlbmVyIChlbnRyeSwgbGlzdGVuZXIpIHtcclxuICAgICAgICBUcmFja0VudHJ5TGlzdGVuZXJzLmdldExpc3RlbmVycyhlbnRyeSkuZW5kID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGRpc3Bvc2UgZXZlbnQgbGlzdGVuZXIgZm9yIHNwZWNpZmllZCBUcmFja0VudHJ5LlxyXG4gICAgICogISN6aCDnlKjmnaXkuLrmjIflrprnmoQgVHJhY2tFbnRyeSDorr7nva7liqjnlLvljbPlsIbooqvplIDmr4HnmoTkuovku7bnm5HlkKzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VHJhY2tEaXNwb3NlTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7c3Auc3BpbmUuVHJhY2tFbnRyeX0gZW50cnlcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHNldFRyYWNrRGlzcG9zZUxpc3RlbmVyKGVudHJ5LCBsaXN0ZW5lcil7XHJcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLmRpc3Bvc2UgPSBsaXN0ZW5lcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgY29tcGxldGUgZXZlbnQgbGlzdGVuZXIgZm9yIHNwZWNpZmllZCBUcmFja0VudHJ5LlxyXG4gICAgICogISN6aCDnlKjmnaXkuLrmjIflrprnmoQgVHJhY2tFbnRyeSDorr7nva7liqjnlLvkuIDmrKHlvqrnjq/mkq3mlL7nu5PmnZ/nmoTkuovku7bnm5HlkKzjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge3NwLnNwaW5lLlRyYWNrRW50cnl9IGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBsaXN0ZW5lci5lbnRyeVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxpc3RlbmVyLmxvb3BDb3VudFxyXG4gICAgICovXHJcbiAgICBzZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIgKGVudHJ5LCBsaXN0ZW5lcikge1xyXG4gICAgICAgIFRyYWNrRW50cnlMaXN0ZW5lcnMuZ2V0TGlzdGVuZXJzKGVudHJ5KS5jb21wbGV0ZSA9IGZ1bmN0aW9uICh0cmFja0VudHJ5KSB7XHJcbiAgICAgICAgICAgIHZhciBsb29wQ291bnQgPSBNYXRoLmZsb29yKHRyYWNrRW50cnkudHJhY2tUaW1lIC8gdHJhY2tFbnRyeS5hbmltYXRpb25FbmQpOyBcclxuICAgICAgICAgICAgbGlzdGVuZXIodHJhY2tFbnRyeSwgbG9vcENvdW50KTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHRoZSBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXHJcbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+W4p+S6i+S7tueahOebkeWQrOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUcmFja0V2ZW50TGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7c3Auc3BpbmUuVHJhY2tFbnRyeX0gZW50cnlcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXHJcbiAgICAgKi9cclxuICAgIHNldFRyYWNrRXZlbnRMaXN0ZW5lciAoZW50cnksIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLmV2ZW50ID0gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgdGhlIGFuaW1hdGlvbiBzdGF0ZSBvYmplY3RcclxuICAgICAqICEjemgg6I635Y+W5Yqo55S754q25oCBXHJcbiAgICAgKiBAbWV0aG9kIGdldFN0YXRlXHJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5BbmltYXRpb25TdGF0ZX0gc3RhdGVcclxuICAgICAqL1xyXG4gICAgZ2V0U3RhdGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIGFuaW1hdGlvbiBsaXN0IGZvciBlZGl0b3JcclxuICAgIF91cGRhdGVBbmltRW51bTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYW5pbUVudW07XHJcbiAgICAgICAgaWYgKHRoaXMuc2tlbGV0b25EYXRhKSB7XHJcbiAgICAgICAgICAgIGFuaW1FbnVtID0gdGhpcy5za2VsZXRvbkRhdGEuZ2V0QW5pbXNFbnVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoYW5nZSBlbnVtXHJcbiAgICAgICAgc2V0RW51bUF0dHIodGhpcywgJ19hbmltYXRpb25JbmRleCcsIGFuaW1FbnVtIHx8IERlZmF1bHRBbmltc0VudW0pO1xyXG4gICAgfSxcclxuICAgIC8vIHVwZGF0ZSBza2luIGxpc3QgZm9yIGVkaXRvclxyXG4gICAgX3VwZGF0ZVNraW5FbnVtOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBza2luRW51bTtcclxuICAgICAgICBpZiAodGhpcy5za2VsZXRvbkRhdGEpIHtcclxuICAgICAgICAgICAgc2tpbkVudW0gPSB0aGlzLnNrZWxldG9uRGF0YS5nZXRTa2luc0VudW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hhbmdlIGVudW1cclxuICAgICAgICBzZXRFbnVtQXR0cih0aGlzLCAnX2RlZmF1bHRTa2luSW5kZXgnLCBza2luRW51bSB8fCBEZWZhdWx0U2tpbnNFbnVtKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2Vuc3VyZUxpc3RlbmVyICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyID0gbmV3IFRyYWNrRW50cnlMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5hZGRMaXN0ZW5lcih0aGlzLl9saXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVTa2VsZXRvbkRhdGEgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5za2VsZXRvbkRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5za2VsZXRvbkRhdGEuZ2V0UnVudGltZURhdGEoKTtcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTa2VsZXRvbkRhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvblN0YXRlRGF0YShuZXcgc3BpbmUuQW5pbWF0aW9uU3RhdGVEYXRhKHRoaXMuX3NrZWxldG9uLmRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRTa2luICYmIHRoaXMuc2V0U2tpbih0aGlzLmRlZmF1bHRTa2luKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY2Mud2FybihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsLmluaXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsLl9hc3NvY2lhdGVBdHRhY2hlZE5vZGUoKTtcclxuICAgICAgICB0aGlzLl9wcmVDYWNoZU1vZGUgPSB0aGlzLl9jYWNoZU1vZGU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmRlZmF1bHRBbmltYXRpb247XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZWZyZXNoSW5zcGVjdG9yICgpIHtcclxuICAgICAgICAvLyB1cGRhdGUgaW5zcGVjdG9yXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQW5pbUVudW0oKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVTa2luRW51bSgpO1xyXG4gICAgICAgIEVkaXRvci5VdGlscy5yZWZyZXNoU2VsZWN0ZWRJbnNwZWN0b3IoJ25vZGUnLCB0aGlzLm5vZGUudXVpZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVEZWJ1Z0RyYXc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5kZWJ1Z0JvbmVzIHx8IHRoaXMuZGVidWdTbG90cykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RlYnVnUmVuZGVyZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZWJ1Z0RyYXdOb2RlID0gbmV3IGNjLlByaXZhdGVOb2RlKCk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdOb2RlLm5hbWUgPSAnREVCVUdfRFJBV19OT0RFJztcclxuICAgICAgICAgICAgICAgIGxldCBkZWJ1Z0RyYXcgPSBkZWJ1Z0RyYXdOb2RlLmFkZENvbXBvbmVudChHcmFwaGljcyk7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXcubGluZVdpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIGRlYnVnRHJhdy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWdSZW5kZXJlciA9IGRlYnVnRHJhdztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZGVidWdSZW5kZXJlci5ub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihcIkRlYnVnIGJvbmVzIG9yIHNsb3RzIGlzIGludmFsaWQgaW4gY2FjaGVkIG1vZGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZGVidWdSZW5kZXJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z1JlbmRlcmVyLm5vZGUucGFyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc3AuU2tlbGV0b247XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9