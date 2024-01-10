
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/CCParticleSystem.js';
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
var macro = require('../core/platform/CCMacro');

var ParticleAsset = require('./CCParticleAsset');

var RenderComponent = require('../core/components/CCRenderComponent');

var codec = require('../compression/ZipUtils');

var PNGReader = require('./CCPNGReader');

var tiffReader = require('./CCTIFFReader');

var textureUtil = require('../core/utils/texture-util');

var RenderFlow = require('../core/renderer/render-flow');

var ParticleSimulator = require('./particle-simulator');

var Material = require('../core/assets/material/CCMaterial');

var BlendFunc = require('../core/utils/blend-func');

function getImageFormatByData(imgData) {
  // if it is a png file buffer.
  if (imgData.length > 8 && imgData[0] === 0x89 && imgData[1] === 0x50 && imgData[2] === 0x4E && imgData[3] === 0x47 && imgData[4] === 0x0D && imgData[5] === 0x0A && imgData[6] === 0x1A && imgData[7] === 0x0A) {
    return macro.ImageFormat.PNG;
  } // if it is a tiff file buffer.


  if (imgData.length > 2 && (imgData[0] === 0x49 && imgData[1] === 0x49 || imgData[0] === 0x4d && imgData[1] === 0x4d || imgData[0] === 0xff && imgData[1] === 0xd8)) {
    return macro.ImageFormat.TIFF;
  }

  return macro.ImageFormat.UNKNOWN;
} //


function getParticleComponents(node) {
  var parent = node.parent,
      comp = node.getComponent(cc.ParticleSystem);

  if (!parent || !comp) {
    return node.getComponentsInChildren(cc.ParticleSystem);
  }

  return getParticleComponents(parent);
}
/**
 * !#en Enum for emitter modes
 * !#zh 发射模式
 * @enum ParticleSystem.EmitterMode
 */


var EmitterMode = cc.Enum({
  /**
   * !#en Uses gravity, speed, radial and tangential acceleration.
   * !#zh 重力模式，模拟重力，可让粒子围绕一个中心点移近或移远。
   * @property {Number} GRAVITY
   */
  GRAVITY: 0,

  /**
   * !#en Uses radius movement + rotation.
   * !#zh 半径模式，可以使粒子以圆圈方式旋转，它也可以创造螺旋效果让粒子急速前进或后退。
   * @property {Number} RADIUS - Uses radius movement + rotation.
   */
  RADIUS: 1
});
/**
 * !#en Enum for particles movement type.
 * !#zh 粒子位置类型
 * @enum ParticleSystem.PositionType
 */

var PositionType = cc.Enum({
  /**
   * !#en
   * Living particles are attached to the world and are unaffected by emitter repositioning.
   * !#zh
   * 自由模式，相对于世界坐标，不会随粒子节点移动而移动。（可产生火焰、蒸汽等效果）
   * @property {Number} FREE
   */
  FREE: 0,

  /**
   * !#en
   * In the relative mode, the particle will move with the parent node, but not with the node where the particle is. 
   * For example, the coffee in the cup is steaming. Then the steam moves (forward) with the train, rather than moves with the cup.
   * !#zh
   * 相对模式，粒子会跟随父节点移动，但不跟随粒子所在节点移动，例如在一列行进火车中，杯中的咖啡飘起雾气，
   * 杯子移动，雾气整体并不会随着杯子移动，但从火车整体的角度来看，雾气整体会随着火车移动。
   * @property {Number} RELATIVE
   */
  RELATIVE: 1,

  /**
   * !#en
   * Living particles are attached to the emitter and are translated along with it.
   * !#zh
   * 整组模式，粒子跟随发射器移动。（不会发生拖尾）
   * @property {Number} GROUPED
   */
  GROUPED: 2
});
/**
 * @class ParticleSystem
 */

var properties = {
  /**
   * !#en Play particle in edit mode.
   * !#zh 在编辑器模式下预览粒子，启用后选中粒子时，粒子将自动播放。
   * @property {Boolean} preview
   * @default false
   */
  preview: {
    "default": true,
    editorOnly: true,
    notify: CC_EDITOR && function () {
      this.resetSystem();

      if (!this.preview) {
        this.stopSystem();
        this.disableRender();
      }

      cc.engine.repaintInEditMode();
    },
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.preview'
  },

  /**
   * !#en
   * If set custom to true, then use custom properties insteadof read particle file.
   * !#zh 是否自定义粒子属性。
   * @property {Boolean} custom
   * @default false
   */
  _custom: false,
  custom: {
    get: function get() {
      return this._custom;
    },
    set: function set(value) {
      if (CC_EDITOR && !value && !this._file) {
        return cc.warnID(6000);
      }

      if (this._custom !== value) {
        this._custom = value;

        this._applyFile();

        if (CC_EDITOR) {
          cc.engine.repaintInEditMode();
        }
      }
    },
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.custom'
  },

  /**
   * !#en The plist file.
   * !#zh plist 格式的粒子配置文件。
   * @property {ParticleAsset} file
   * @default null
   */
  _file: {
    "default": null,
    type: ParticleAsset
  },
  file: {
    get: function get() {
      return this._file;
    },
    set: function set(value, force) {
      if (this._file !== value || CC_EDITOR && force) {
        this._file = value;

        if (value) {
          this._applyFile();

          if (CC_EDITOR) {
            cc.engine.repaintInEditMode();
          }
        } else {
          this.custom = true;
        }
      }
    },
    animatable: false,
    type: ParticleAsset,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.file'
  },

  /**
   * !#en SpriteFrame used for particles display
   * !#zh 用于粒子呈现的 SpriteFrame
   * @property spriteFrame
   * @type {SpriteFrame}
   */
  _spriteFrame: {
    "default": null,
    type: cc.SpriteFrame
  },
  spriteFrame: {
    get: function get() {
      return this._spriteFrame;
    },
    set: function set(value, force) {
      var lastSprite = this._renderSpriteFrame;

      if (CC_EDITOR) {
        if (!force && lastSprite === value) {
          return;
        }
      } else {
        if (lastSprite === value) {
          return;
        }
      }

      this._renderSpriteFrame = value;

      if (!value || value._uuid) {
        this._spriteFrame = value;
      }

      this._applySpriteFrame(lastSprite);

      if (CC_EDITOR) {
        this.node.emit('spriteframe-changed', this);
      }
    },
    type: cc.SpriteFrame,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.spriteFrame'
  },
  // just used to read data from 1.x
  _texture: {
    "default": null,
    type: cc.Texture2D,
    editorOnly: true
  },

  /**
   * !#en Texture of Particle System, readonly, please use spriteFrame to setup new texture。
   * !#zh 粒子贴图，只读属性，请使用 spriteFrame 属性来替换贴图。
   * @property texture
   * @type {String}
   * @readonly
   */
  texture: {
    get: function get() {
      return this._getTexture();
    },
    set: function set(value) {
      if (value) {
        cc.warnID(6017);
      }
    },
    type: cc.Texture2D,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.texture',
    readonly: true,
    visible: false,
    animatable: false
  },

  /**
   * !#en Current quantity of particles that are being simulated.
   * !#zh 当前播放的粒子数量。
   * @property {Number} particleCount
   * @readonly
   */
  particleCount: {
    visible: false,
    get: function get() {
      return this._simulator.particles.length;
    },
    readonly: true
  },

  /**
   * !#en Indicate whether the system simulation have stopped.
   * !#zh 指示粒子播放是否完毕。
   * @property {Boolean} stopped
   */
  _stopped: true,
  stopped: {
    get: function get() {
      return this._stopped;
    },
    animatable: false,
    visible: false
  },

  /**
   * !#en If set to true, the particle system will automatically start playing on onLoad.
   * !#zh 如果设置为 true 运行时会自动发射粒子。
   * @property playOnLoad
   * @type {boolean}
   * @default true
   */
  playOnLoad: true,

  /**
   * !#en Indicate whether the owner node will be auto-removed when it has no particles left.
   * !#zh 粒子播放完毕后自动销毁所在的节点。
   * @property {Boolean} autoRemoveOnFinish
   */
  autoRemoveOnFinish: {
    "default": false,
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.autoRemoveOnFinish'
  },

  /**
   * !#en Indicate whether the particle system is activated.
   * !#zh 是否激活粒子。
   * @property {Boolean} active
   * @readonly
   */
  active: {
    get: function get() {
      return this._simulator.active;
    },
    visible: false
  },

  /**
   * !#en Maximum particles of the system.
   * !#zh 粒子最大数量。
   * @property {Number} totalParticles
   * @default 150
   */
  totalParticles: 150,

  /**
   * !#en How many seconds the emitter wil run. -1 means 'forever'.
   * !#zh 发射器生存时间，单位秒，-1表示持续发射。
   * @property {Number} duration
   * @default ParticleSystem.DURATION_INFINITY
   */
  duration: -1,

  /**
   * !#en Emission rate of the particles.
   * !#zh 每秒发射的粒子数目。
   * @property {Number} emissionRate
   * @default 10
   */
  emissionRate: 10,

  /**
   * !#en Life of each particle setter.
   * !#zh 粒子的运行时间。
   * @property {Number} life
   * @default 1
   */
  life: 1,

  /**
   * !#en Variation of life.
   * !#zh 粒子的运行时间变化范围。
   * @property {Number} lifeVar
   * @default 0
   */
  lifeVar: 0,

  /**
   * !#en Start color of each particle.
   * !#zh 粒子初始颜色。
   * @property {cc.Color} startColor
   * @default {r: 255, g: 255, b: 255, a: 255}
   */
  _startColor: null,
  startColor: {
    type: cc.Color,
    get: function get() {
      return this._startColor;
    },
    set: function set(val) {
      this._startColor.r = val.r;
      this._startColor.g = val.g;
      this._startColor.b = val.b;
      this._startColor.a = val.a;
    }
  },

  /**
   * !#en Variation of the start color.
   * !#zh 粒子初始颜色变化范围。
   * @property {cc.Color} startColorVar
   * @default {r: 0, g: 0, b: 0, a: 0}
   */
  _startColorVar: null,
  startColorVar: {
    type: cc.Color,
    get: function get() {
      return this._startColorVar;
    },
    set: function set(val) {
      this._startColorVar.r = val.r;
      this._startColorVar.g = val.g;
      this._startColorVar.b = val.b;
      this._startColorVar.a = val.a;
    }
  },

  /**
   * !#en Ending color of each particle.
   * !#zh 粒子结束颜色。
   * @property {cc.Color} endColor
   * @default {r: 255, g: 255, b: 255, a: 0}
   */
  _endColor: null,
  endColor: {
    type: cc.Color,
    get: function get() {
      return this._endColor;
    },
    set: function set(val) {
      this._endColor.r = val.r;
      this._endColor.g = val.g;
      this._endColor.b = val.b;
      this._endColor.a = val.a;
    }
  },

  /**
   * !#en Variation of the end color.
   * !#zh 粒子结束颜色变化范围。
   * @property {cc.Color} endColorVar
   * @default {r: 0, g: 0, b: 0, a: 0}
   */
  _endColorVar: null,
  endColorVar: {
    type: cc.Color,
    get: function get() {
      return this._endColorVar;
    },
    set: function set(val) {
      this._endColorVar.r = val.r;
      this._endColorVar.g = val.g;
      this._endColorVar.b = val.b;
      this._endColorVar.a = val.a;
    }
  },

  /**
   * !#en Angle of each particle setter.
   * !#zh 粒子角度。
   * @property {Number} angle
   * @default 90
   */
  angle: 90,

  /**
   * !#en Variation of angle of each particle setter.
   * !#zh 粒子角度变化范围。
   * @property {Number} angleVar
   * @default 20
   */
  angleVar: 20,

  /**
   * !#en Start size in pixels of each particle.
   * !#zh 粒子的初始大小。
   * @property {Number} startSize
   * @default 50
   */
  startSize: 50,

  /**
   * !#en Variation of start size in pixels.
   * !#zh 粒子初始大小的变化范围。
   * @property {Number} startSizeVar
   * @default 0
   */
  startSizeVar: 0,

  /**
   * !#en End size in pixels of each particle.
   * !#zh 粒子结束时的大小。
   * @property {Number} endSize
   * @default 0
   */
  endSize: 0,

  /**
   * !#en Variation of end size in pixels.
   * !#zh 粒子结束大小的变化范围。
   * @property {Number} endSizeVar
   * @default 0
   */
  endSizeVar: 0,

  /**
   * !#en Start angle of each particle.
   * !#zh 粒子开始自旋角度。
   * @property {Number} startSpin
   * @default 0
   */
  startSpin: 0,

  /**
   * !#en Variation of start angle.
   * !#zh 粒子开始自旋角度变化范围。
   * @property {Number} startSpinVar
   * @default 0
   */
  startSpinVar: 0,

  /**
   * !#en End angle of each particle.
   * !#zh 粒子结束自旋角度。
   * @property {Number} endSpin
   * @default 0
   */
  endSpin: 0,

  /**
   * !#en Variation of end angle.
   * !#zh 粒子结束自旋角度变化范围。
   * @property {Number} endSpinVar
   * @default 0
   */
  endSpinVar: 0,

  /**
   * !#en Source position of the emitter.
   * !#zh 发射器位置。
   * @property {Vec2} sourcePos
   * @default cc.Vec2.ZERO
   */
  sourcePos: cc.Vec2.ZERO,

  /**
   * !#en Variation of source position.
   * !#zh 发射器位置的变化范围。（横向和纵向）
   * @property {Vec2} posVar
   * @default cc.Vec2.ZERO
   */
  posVar: cc.Vec2.ZERO,

  /**
   * !#en Particles movement type.
   * !#zh 粒子位置类型。
   * @property {ParticleSystem.PositionType} positionType
   * @default ParticleSystem.PositionType.FREE
   */
  _positionType: {
    "default": PositionType.FREE,
    formerlySerializedAs: "positionType"
  },
  positionType: {
    type: PositionType,
    get: function get() {
      return this._positionType;
    },
    set: function set(val) {
      this._positionType = val;

      this._updateMaterial();
    }
  },

  /**
   * !#en Particles emitter modes.
   * !#zh 发射器类型。
   * @property {ParticleSystem.EmitterMode} emitterMode
   * @default ParticleSystem.EmitterMode.GRAVITY
   */
  emitterMode: {
    "default": EmitterMode.GRAVITY,
    type: EmitterMode
  },
  // GRAVITY MODE

  /**
   * !#en Gravity of the emitter.
   * !#zh 重力。
   * @property {Vec2} gravity
   * @default cc.Vec2.ZERO
   */
  gravity: cc.Vec2.ZERO,

  /**
   * !#en Speed of the emitter.
   * !#zh 速度。
   * @property {Number} speed
   * @default 180
   */
  speed: 180,

  /**
   * !#en Variation of the speed.
   * !#zh 速度变化范围。
   * @property {Number} speedVar
   * @default 50
   */
  speedVar: 50,

  /**
   * !#en Tangential acceleration of each particle. Only available in 'Gravity' mode.
   * !#zh 每个粒子的切向加速度，即垂直于重力方向的加速度，只有在重力模式下可用。
   * @property {Number} tangentialAccel
   * @default 80
   */
  tangentialAccel: 80,

  /**
   * !#en Variation of the tangential acceleration.
   * !#zh 每个粒子的切向加速度变化范围。
   * @property {Number} tangentialAccelVar
   * @default 0
   */
  tangentialAccelVar: 0,

  /**
   * !#en Acceleration of each particle. Only available in 'Gravity' mode.
   * !#zh 粒子径向加速度，即平行于重力方向的加速度，只有在重力模式下可用。
   * @property {Number} radialAccel
   * @default 0
   */
  radialAccel: 0,

  /**
   * !#en Variation of the radial acceleration.
   * !#zh 粒子径向加速度变化范围。
   * @property {Number} radialAccelVar
   * @default 0
   */
  radialAccelVar: 0,

  /**
   * !#en Indicate whether the rotation of each particle equals to its direction. Only available in 'Gravity' mode.
   * !#zh 每个粒子的旋转是否等于其方向，只有在重力模式下可用。
   * @property {Boolean} rotationIsDir
   * @default false
   */
  rotationIsDir: false,
  // RADIUS MODE

  /**
   * !#en Starting radius of the particles. Only available in 'Radius' mode.
   * !#zh 初始半径，表示粒子出生时相对发射器的距离，只有在半径模式下可用。
   * @property {Number} startRadius
   * @default 0
   */
  startRadius: 0,

  /**
   * !#en Variation of the starting radius.
   * !#zh 初始半径变化范围。
   * @property {Number} startRadiusVar
   * @default 0
   */
  startRadiusVar: 0,

  /**
   * !#en Ending radius of the particles. Only available in 'Radius' mode.
   * !#zh 结束半径，只有在半径模式下可用。
   * @property {Number} endRadius
   * @default 0
   */
  endRadius: 0,

  /**
   * !#en Variation of the ending radius.
   * !#zh 结束半径变化范围。
   * @property {Number} endRadiusVar
   * @default 0
   */
  endRadiusVar: 0,

  /**
   * !#en Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
   * !#zh 粒子每秒围绕起始点的旋转角度，只有在半径模式下可用。
   * @property {Number} rotatePerS
   * @default 0
   */
  rotatePerS: 0,

  /**
   * !#en Variation of the degress to rotate a particle around the source pos per second.
   * !#zh 粒子每秒围绕起始点的旋转角度变化范围。
   * @property {Number} rotatePerSVar
   * @default 0
   */
  rotatePerSVar: 0
};
/**
 * Particle System base class. <br/>
 * Attributes of a Particle System:<br/>
 *  - emmision rate of the particles<br/>
 *  - Gravity Mode (Mode A): <br/>
 *  - gravity <br/>
 *  - direction <br/>
 *  - speed +-  variance <br/>
 *  - tangential acceleration +- variance<br/>
 *  - radial acceleration +- variance<br/>
 *  - Radius Mode (Mode B):      <br/>
 *  - startRadius +- variance    <br/>
 *  - endRadius +- variance      <br/>
 *  - rotate +- variance         <br/>
 *  - Properties common to all modes: <br/>
 *  - life +- life variance      <br/>
 *  - start spin +- variance     <br/>
 *  - end spin +- variance       <br/>
 *  - start size +- variance     <br/>
 *  - end size +- variance       <br/>
 *  - start color +- variance    <br/>
 *  - end color +- variance      <br/>
 *  - life +- variance           <br/>
 *  - blending function          <br/>
 *  - texture                    <br/>
 * <br/>
 * cocos2d also supports particles generated by Particle Designer (http://particledesigner.71squared.com/).<br/>
 * 'Radius Mode' in Particle Designer uses a fixed emit rate of 30 hz. Since that can't be guarateed in cocos2d,  <br/>
 * cocos2d uses a another approach, but the results are almost identical.<br/>
 * cocos2d supports all the variables used by Particle Designer plus a bit more:  <br/>
 *  - spinning particles (supported when using ParticleSystem)       <br/>
 *  - tangential acceleration (Gravity mode)                               <br/>
 *  - radial acceleration (Gravity mode)                                   <br/>
 *  - radius direction (Radius mode) (Particle Designer supports outwards to inwards direction only) <br/>
 * It is possible to customize any of the above mentioned properties in runtime. Example:   <br/>
 *
 * @example
 * emitter.radialAccel = 15;
 * emitter.startSpin = 0;
 *
 * @class ParticleSystem
 * @extends RenderComponent
 * @uses BlendFunc
 */

var ParticleSystem = cc.Class({
  name: 'cc.ParticleSystem',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/ParticleSystem',
    inspector: 'packages://inspector/inspectors/comps/particle-system.js',
    playOnFocus: true,
    executeInEditMode: true
  },
  ctor: function ctor() {
    this.initProperties();
  },
  initProperties: function initProperties() {
    this._previewTimer = null;
    this._focused = false;
    this._aspectRatio = 1;
    this._simulator = new ParticleSimulator(this); // colors

    this._startColor = cc.color(255, 255, 255, 255);
    this._startColorVar = cc.color(0, 0, 0, 0);
    this._endColor = cc.color(255, 255, 255, 0);
    this._endColorVar = cc.color(0, 0, 0, 0); // The temporary SpriteFrame object used for the renderer. Because there is no corresponding asset, it can't be serialized.

    this._renderSpriteFrame = null;
  },
  properties: properties,
  statics: {
    /**
     * !#en The Particle emitter lives forever.
     * !#zh 表示发射器永久存在
     * @property {Number} DURATION_INFINITY
     * @default -1
     * @static
     * @readonly
     */
    DURATION_INFINITY: -1,

    /**
     * !#en The starting size of the particle is equal to the ending size.
     * !#zh 表示粒子的起始大小等于结束大小。
     * @property {Number} START_SIZE_EQUAL_TO_END_SIZE
     * @default -1
     * @static
     * @readonly
     */
    START_SIZE_EQUAL_TO_END_SIZE: -1,

    /**
     * !#en The starting radius of the particle is equal to the ending radius.
     * !#zh 表示粒子的起始半径等于结束半径。
     * @property {Number} START_RADIUS_EQUAL_TO_END_RADIUS
     * @default -1
     * @static
     * @readonly
     */
    START_RADIUS_EQUAL_TO_END_RADIUS: -1,
    EmitterMode: EmitterMode,
    PositionType: PositionType,
    _PNGReader: PNGReader,
    _TIFFReader: tiffReader
  },
  // EDITOR RELATED METHODS
  onFocusInEditor: CC_EDITOR && function () {
    this._focused = true;
    var components = getParticleComponents(this.node);

    for (var i = 0; i < components.length; ++i) {
      components[i]._startPreview();
    }
  },
  onLostFocusInEditor: CC_EDITOR && function () {
    this._focused = false;
    var components = getParticleComponents(this.node);

    for (var i = 0; i < components.length; ++i) {
      components[i]._stopPreview();
    }
  },
  _startPreview: CC_EDITOR && function () {
    if (this.preview) {
      this.resetSystem();
    }
  },
  _stopPreview: CC_EDITOR && function () {
    if (this.preview) {
      this.resetSystem();
      this.stopSystem();
      this.disableRender();
      cc.engine.repaintInEditMode();
    }

    if (this._previewTimer) {
      clearInterval(this._previewTimer);
    }
  },
  // LIFE-CYCLE METHODS
  // just used to read data from 1.x
  _convertTextureToSpriteFrame: CC_EDITOR && function () {
    if (this._spriteFrame) {
      return;
    }

    var texture = this.texture;

    if (!texture || !texture._uuid) {
      return;
    }

    var _this = this;

    Editor.assetdb.queryMetaInfoByUuid(texture._uuid, function (err, metaInfo) {
      if (err) return Editor.error(err);
      var meta = JSON.parse(metaInfo.json);

      if (meta.type === 'raw') {
        var NodeUtils = Editor.require('app://editor/page/scene-utils/utils/node');

        var nodePath = NodeUtils.getNodePath(_this.node);
        return Editor.warn("The texture " + metaInfo.assetUrl + " used by particle " + nodePath + " does not contain any SpriteFrame, please set the texture type to Sprite and reassign the SpriteFrame to the particle component.");
      } else {
        var Url = require('fire-url');

        var name = Url.basenameNoExt(metaInfo.assetPath);
        var uuid = meta.subMetas[name].uuid;
        cc.assetManager.loadAny(uuid, function (err, sp) {
          if (err) return Editor.error(err);
          _this.spriteFrame = sp;
        });
      }
    });
  },
  __preload: function __preload() {
    this._super();

    if (CC_EDITOR) {
      this._convertTextureToSpriteFrame();
    }

    if (this._custom && this.spriteFrame && !this._renderSpriteFrame) {
      this._applySpriteFrame(this.spriteFrame);
    } else if (this._file) {
      if (this._custom) {
        var missCustomTexture = !this._getTexture();

        if (missCustomTexture) {
          this._applyFile();
        }
      } else {
        this._applyFile();
      }
    } // auto play


    if (!CC_EDITOR || cc.engine.isPlaying) {
      if (this.playOnLoad) {
        this.resetSystem();
      }
    } // Upgrade color type from v2.0.0


    if (CC_EDITOR && !(this._startColor instanceof cc.Color)) {
      this._startColor = cc.color(this._startColor);
      this._startColorVar = cc.color(this._startColorVar);
      this._endColor = cc.color(this._endColor);
      this._endColorVar = cc.color(this._endColorVar);
    }
  },
  onDestroy: function onDestroy() {
    if (this.autoRemoveOnFinish) {
      this.autoRemoveOnFinish = false; // already removed
    }

    if (this._buffer) {
      this._buffer.destroy();

      this._buffer = null;
    } // reset uv data so next time simulator will refill buffer uv info when exit edit mode from prefab.


    this._simulator._uvFilled = 0;

    this._super();
  },
  lateUpdate: function lateUpdate(dt) {
    if (!this._simulator.finished) {
      this._simulator.step(dt);
    }
  },
  // APIS

  /*
   * !#en Add a particle to the emitter.
   * !#zh 添加一个粒子到发射器中。
   * @method addParticle
   * @return {Boolean}
   */
  addParticle: function addParticle() {// Not implemented
  },

  /**
   * !#en Stop emitting particles. Running particles will continue to run until they die.
   * !#zh 停止发射器发射粒子，发射出去的粒子将继续运行，直至粒子生命结束。
   * @method stopSystem
   * @example
   * // stop particle system.
   * myParticleSystem.stopSystem();
   */
  stopSystem: function stopSystem() {
    this._stopped = true;

    this._simulator.stop();
  },

  /**
   * !#en Kill all living particles.
   * !#zh 杀死所有存在的粒子，然后重新启动粒子发射器。
   * @method resetSystem
   * @example
   * // play particle system.
   * myParticleSystem.resetSystem();
   */
  resetSystem: function resetSystem() {
    this._stopped = false;

    this._simulator.reset();

    this.markForRender(true);
  },

  /**
   * !#en Whether or not the system is full.
   * !#zh 发射器中粒子是否大于等于设置的总粒子数量。
   * @method isFull
   * @return {Boolean}
   */
  isFull: function isFull() {
    return this.particleCount >= this.totalParticles;
  },

  /**
   * !#en Sets a new texture with a rect. The rect is in texture position and size.
   * Please use spriteFrame property instead, this function is deprecated since v1.9
   * !#zh 设置一张新贴图和关联的矩形。
   * 请直接设置 spriteFrame 属性，这个函数从 v1.9 版本开始已经被废弃
   * @method setTextureWithRect
   * @param {Texture2D} texture
   * @param {Rect} rect
   * @deprecated since v1.9
   */
  setTextureWithRect: function setTextureWithRect(texture, rect) {
    if (texture instanceof cc.Texture2D) {
      this.spriteFrame = new cc.SpriteFrame(texture, rect);
    }
  },
  // PRIVATE METHODS
  _applyFile: function _applyFile() {
    var file = this._file;

    if (file) {
      var self = this;
      cc.assetManager.postLoadNative(file, function (err) {
        if (err || !file._nativeAsset) {
          cc.errorID(6029);
          return;
        }

        if (!self.isValid) {
          return;
        }

        self._plistFile = file.nativeUrl;

        if (!self._custom) {
          var isDiffFrame = self._spriteFrame !== file.spriteFrame;
          if (isDiffFrame) self.spriteFrame = file.spriteFrame;

          self._initWithDictionary(file._nativeAsset);
        }

        if (!self._spriteFrame) {
          if (file.spriteFrame) {
            self.spriteFrame = file.spriteFrame;
          } else if (self._custom) {
            self._initTextureWithDictionary(file._nativeAsset);
          }
        } else if (!self._renderSpriteFrame && self._spriteFrame) {
          self._applySpriteFrame(self.spriteFrame);
        }
      });
    }
  },
  _initTextureWithDictionary: function _initTextureWithDictionary(dict) {
    var imgPath = cc.path.changeBasename(this._plistFile, dict["textureFileName"] || ''); // texture

    if (dict["textureFileName"]) {
      // Try to get the texture from the cache
      textureUtil.loadImage(imgPath, function (error, texture) {
        if (error) {
          dict["textureFileName"] = undefined;

          this._initTextureWithDictionary(dict);
        } else {
          cc.assetManager.assets.add(imgPath, texture);
          this.spriteFrame = new cc.SpriteFrame(texture);
        }
      }, this);
    } else if (dict["textureImageData"]) {
      var textureData = dict["textureImageData"];

      if (textureData && textureData.length > 0) {
        var tex = cc.assetManager.assets.get(imgPath);

        if (!tex) {
          var buffer = codec.unzipBase64AsArray(textureData, 1);

          if (!buffer) {
            cc.warnID(6030, this._file.name);
            return false;
          }

          var imageFormat = getImageFormatByData(buffer);

          if (imageFormat !== macro.ImageFormat.TIFF && imageFormat !== macro.ImageFormat.PNG) {
            cc.warnID(6031, this._file.name);
            return false;
          }

          var canvasObj = document.createElement("canvas");

          if (imageFormat === macro.ImageFormat.PNG) {
            var myPngObj = new PNGReader(buffer);
            myPngObj.render(canvasObj);
          } else {
            tiffReader.parseTIFF(buffer, canvasObj);
          }

          tex = textureUtil.cacheImage(imgPath, canvasObj);
        }

        if (!tex) cc.warnID(6032, this._file.name); // TODO: Use cc.assetManager to load asynchronously the SpriteFrame object, avoid using textureUtil

        this.spriteFrame = new cc.SpriteFrame(tex);
      } else {
        return false;
      }
    }

    return true;
  },
  // parsing process
  _initWithDictionary: function _initWithDictionary(dict) {
    this.totalParticles = parseInt(dict["maxParticles"] || 0); // life span

    this.life = parseFloat(dict["particleLifespan"] || 0);
    this.lifeVar = parseFloat(dict["particleLifespanVariance"] || 0); // emission Rate

    var _tempEmissionRate = dict["emissionRate"];

    if (_tempEmissionRate) {
      this.emissionRate = _tempEmissionRate;
    } else {
      this.emissionRate = Math.min(this.totalParticles / this.life, Number.MAX_VALUE);
    } // duration


    this.duration = parseFloat(dict["duration"] || 0); // blend function

    this.srcBlendFactor = parseInt(dict["blendFuncSource"] || macro.SRC_ALPHA);
    this.dstBlendFactor = parseInt(dict["blendFuncDestination"] || macro.ONE_MINUS_SRC_ALPHA); // color

    var locStartColor = this._startColor;
    locStartColor.r = parseFloat(dict["startColorRed"] || 0) * 255;
    locStartColor.g = parseFloat(dict["startColorGreen"] || 0) * 255;
    locStartColor.b = parseFloat(dict["startColorBlue"] || 0) * 255;
    locStartColor.a = parseFloat(dict["startColorAlpha"] || 0) * 255;
    var locStartColorVar = this._startColorVar;
    locStartColorVar.r = parseFloat(dict["startColorVarianceRed"] || 0) * 255;
    locStartColorVar.g = parseFloat(dict["startColorVarianceGreen"] || 0) * 255;
    locStartColorVar.b = parseFloat(dict["startColorVarianceBlue"] || 0) * 255;
    locStartColorVar.a = parseFloat(dict["startColorVarianceAlpha"] || 0) * 255;
    var locEndColor = this._endColor;
    locEndColor.r = parseFloat(dict["finishColorRed"] || 0) * 255;
    locEndColor.g = parseFloat(dict["finishColorGreen"] || 0) * 255;
    locEndColor.b = parseFloat(dict["finishColorBlue"] || 0) * 255;
    locEndColor.a = parseFloat(dict["finishColorAlpha"] || 0) * 255;
    var locEndColorVar = this._endColorVar;
    locEndColorVar.r = parseFloat(dict["finishColorVarianceRed"] || 0) * 255;
    locEndColorVar.g = parseFloat(dict["finishColorVarianceGreen"] || 0) * 255;
    locEndColorVar.b = parseFloat(dict["finishColorVarianceBlue"] || 0) * 255;
    locEndColorVar.a = parseFloat(dict["finishColorVarianceAlpha"] || 0) * 255; // particle size

    this.startSize = parseFloat(dict["startParticleSize"] || 0);
    this.startSizeVar = parseFloat(dict["startParticleSizeVariance"] || 0);
    this.endSize = parseFloat(dict["finishParticleSize"] || 0);
    this.endSizeVar = parseFloat(dict["finishParticleSizeVariance"] || 0); // position
    // Make empty positionType value and old version compatible

    this.positionType = parseFloat(dict['positionType'] !== undefined ? dict['positionType'] : PositionType.RELATIVE); // for

    this.sourcePos.x = 0;
    this.sourcePos.y = 0;
    this.posVar.x = parseFloat(dict["sourcePositionVariancex"] || 0);
    this.posVar.y = parseFloat(dict["sourcePositionVariancey"] || 0); // angle

    this.angle = parseFloat(dict["angle"] || 0);
    this.angleVar = parseFloat(dict["angleVariance"] || 0); // Spinning

    this.startSpin = parseFloat(dict["rotationStart"] || 0);
    this.startSpinVar = parseFloat(dict["rotationStartVariance"] || 0);
    this.endSpin = parseFloat(dict["rotationEnd"] || 0);
    this.endSpinVar = parseFloat(dict["rotationEndVariance"] || 0);
    this.emitterMode = parseInt(dict["emitterType"] || EmitterMode.GRAVITY); // Mode A: Gravity + tangential accel + radial accel

    if (this.emitterMode === EmitterMode.GRAVITY) {
      // gravity
      this.gravity.x = parseFloat(dict["gravityx"] || 0);
      this.gravity.y = parseFloat(dict["gravityy"] || 0); // speed

      this.speed = parseFloat(dict["speed"] || 0);
      this.speedVar = parseFloat(dict["speedVariance"] || 0); // radial acceleration

      this.radialAccel = parseFloat(dict["radialAcceleration"] || 0);
      this.radialAccelVar = parseFloat(dict["radialAccelVariance"] || 0); // tangential acceleration

      this.tangentialAccel = parseFloat(dict["tangentialAcceleration"] || 0);
      this.tangentialAccelVar = parseFloat(dict["tangentialAccelVariance"] || 0); // rotation is dir

      var locRotationIsDir = dict["rotationIsDir"] || "";

      if (locRotationIsDir !== null) {
        locRotationIsDir = locRotationIsDir.toString().toLowerCase();
        this.rotationIsDir = locRotationIsDir === "true" || locRotationIsDir === "1";
      } else {
        this.rotationIsDir = false;
      }
    } else if (this.emitterMode === EmitterMode.RADIUS) {
      // or Mode B: radius movement
      this.startRadius = parseFloat(dict["maxRadius"] || 0);
      this.startRadiusVar = parseFloat(dict["maxRadiusVariance"] || 0);
      this.endRadius = parseFloat(dict["minRadius"] || 0);
      this.endRadiusVar = parseFloat(dict["minRadiusVariance"] || 0);
      this.rotatePerS = parseFloat(dict["rotatePerSecond"] || 0);
      this.rotatePerSVar = parseFloat(dict["rotatePerSecondVariance"] || 0);
    } else {
      cc.warnID(6009);
      return false;
    }

    this._initTextureWithDictionary(dict);

    return true;
  },
  _validateRender: function _validateRender() {
    var texture = this._getTexture();

    if (!texture || !texture.loaded) {
      this.disableRender();
      return;
    }

    this._super();
  },
  _onTextureLoaded: function _onTextureLoaded() {
    this._simulator.updateUVs(true);

    this._syncAspect();

    this._updateMaterial();

    this.markForRender(true);
  },
  _syncAspect: function _syncAspect() {
    var frameRect = this._renderSpriteFrame._rect;
    this._aspectRatio = frameRect.width / frameRect.height;
  },
  _applySpriteFrame: function _applySpriteFrame() {
    this._renderSpriteFrame = this._renderSpriteFrame || this._spriteFrame;

    if (this._renderSpriteFrame) {
      if (this._renderSpriteFrame.textureLoaded()) {
        this._onTextureLoaded();
      } else {
        this._renderSpriteFrame.onTextureLoaded(this._onTextureLoaded, this);
      }
    }
  },
  _getTexture: function _getTexture() {
    return this._renderSpriteFrame && this._renderSpriteFrame.getTexture() || this._texture;
  },
  _updateMaterial: function _updateMaterial() {
    var material = this.getMaterial(0);
    if (!material) return;
    material.define('CC_USE_MODEL', this._positionType !== PositionType.FREE);
    material.setProperty('texture', this._getTexture());

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _finishedSimulation: function _finishedSimulation() {
    if (CC_EDITOR) {
      if (this.preview && this._focused && !this.active && !cc.engine.isPlaying) {
        this.resetSystem();
      }

      return;
    }

    this.resetSystem();
    this.stopSystem();
    this.disableRender();

    if (this.autoRemoveOnFinish && this._stopped) {
      this.node.destroy();
    }
  }
});
cc.ParticleSystem = module.exports = ParticleSystem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHBhcnRpY2xlXFxDQ1BhcnRpY2xlU3lzdGVtLmpzIl0sIm5hbWVzIjpbIm1hY3JvIiwicmVxdWlyZSIsIlBhcnRpY2xlQXNzZXQiLCJSZW5kZXJDb21wb25lbnQiLCJjb2RlYyIsIlBOR1JlYWRlciIsInRpZmZSZWFkZXIiLCJ0ZXh0dXJlVXRpbCIsIlJlbmRlckZsb3ciLCJQYXJ0aWNsZVNpbXVsYXRvciIsIk1hdGVyaWFsIiwiQmxlbmRGdW5jIiwiZ2V0SW1hZ2VGb3JtYXRCeURhdGEiLCJpbWdEYXRhIiwibGVuZ3RoIiwiSW1hZ2VGb3JtYXQiLCJQTkciLCJUSUZGIiwiVU5LTk9XTiIsImdldFBhcnRpY2xlQ29tcG9uZW50cyIsIm5vZGUiLCJwYXJlbnQiLCJjb21wIiwiZ2V0Q29tcG9uZW50IiwiY2MiLCJQYXJ0aWNsZVN5c3RlbSIsImdldENvbXBvbmVudHNJbkNoaWxkcmVuIiwiRW1pdHRlck1vZGUiLCJFbnVtIiwiR1JBVklUWSIsIlJBRElVUyIsIlBvc2l0aW9uVHlwZSIsIkZSRUUiLCJSRUxBVElWRSIsIkdST1VQRUQiLCJwcm9wZXJ0aWVzIiwicHJldmlldyIsImVkaXRvck9ubHkiLCJub3RpZnkiLCJDQ19FRElUT1IiLCJyZXNldFN5c3RlbSIsInN0b3BTeXN0ZW0iLCJkaXNhYmxlUmVuZGVyIiwiZW5naW5lIiwicmVwYWludEluRWRpdE1vZGUiLCJhbmltYXRhYmxlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9jdXN0b20iLCJjdXN0b20iLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9maWxlIiwid2FybklEIiwiX2FwcGx5RmlsZSIsInR5cGUiLCJmaWxlIiwiZm9yY2UiLCJfc3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsInNwcml0ZUZyYW1lIiwibGFzdFNwcml0ZSIsIl9yZW5kZXJTcHJpdGVGcmFtZSIsIl91dWlkIiwiX2FwcGx5U3ByaXRlRnJhbWUiLCJlbWl0IiwiX3RleHR1cmUiLCJUZXh0dXJlMkQiLCJ0ZXh0dXJlIiwiX2dldFRleHR1cmUiLCJyZWFkb25seSIsInZpc2libGUiLCJwYXJ0aWNsZUNvdW50IiwiX3NpbXVsYXRvciIsInBhcnRpY2xlcyIsIl9zdG9wcGVkIiwic3RvcHBlZCIsInBsYXlPbkxvYWQiLCJhdXRvUmVtb3ZlT25GaW5pc2giLCJhY3RpdmUiLCJ0b3RhbFBhcnRpY2xlcyIsImR1cmF0aW9uIiwiZW1pc3Npb25SYXRlIiwibGlmZSIsImxpZmVWYXIiLCJfc3RhcnRDb2xvciIsInN0YXJ0Q29sb3IiLCJDb2xvciIsInZhbCIsInIiLCJnIiwiYiIsImEiLCJfc3RhcnRDb2xvclZhciIsInN0YXJ0Q29sb3JWYXIiLCJfZW5kQ29sb3IiLCJlbmRDb2xvciIsIl9lbmRDb2xvclZhciIsImVuZENvbG9yVmFyIiwiYW5nbGUiLCJhbmdsZVZhciIsInN0YXJ0U2l6ZSIsInN0YXJ0U2l6ZVZhciIsImVuZFNpemUiLCJlbmRTaXplVmFyIiwic3RhcnRTcGluIiwic3RhcnRTcGluVmFyIiwiZW5kU3BpbiIsImVuZFNwaW5WYXIiLCJzb3VyY2VQb3MiLCJWZWMyIiwiWkVSTyIsInBvc1ZhciIsIl9wb3NpdGlvblR5cGUiLCJmb3JtZXJseVNlcmlhbGl6ZWRBcyIsInBvc2l0aW9uVHlwZSIsIl91cGRhdGVNYXRlcmlhbCIsImVtaXR0ZXJNb2RlIiwiZ3Jhdml0eSIsInNwZWVkIiwic3BlZWRWYXIiLCJ0YW5nZW50aWFsQWNjZWwiLCJ0YW5nZW50aWFsQWNjZWxWYXIiLCJyYWRpYWxBY2NlbCIsInJhZGlhbEFjY2VsVmFyIiwicm90YXRpb25Jc0RpciIsInN0YXJ0UmFkaXVzIiwic3RhcnRSYWRpdXNWYXIiLCJlbmRSYWRpdXMiLCJlbmRSYWRpdXNWYXIiLCJyb3RhdGVQZXJTIiwicm90YXRlUGVyU1ZhciIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIm1lbnUiLCJpbnNwZWN0b3IiLCJwbGF5T25Gb2N1cyIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiY3RvciIsImluaXRQcm9wZXJ0aWVzIiwiX3ByZXZpZXdUaW1lciIsIl9mb2N1c2VkIiwiX2FzcGVjdFJhdGlvIiwiY29sb3IiLCJzdGF0aWNzIiwiRFVSQVRJT05fSU5GSU5JVFkiLCJTVEFSVF9TSVpFX0VRVUFMX1RPX0VORF9TSVpFIiwiU1RBUlRfUkFESVVTX0VRVUFMX1RPX0VORF9SQURJVVMiLCJfUE5HUmVhZGVyIiwiX1RJRkZSZWFkZXIiLCJvbkZvY3VzSW5FZGl0b3IiLCJjb21wb25lbnRzIiwiaSIsIl9zdGFydFByZXZpZXciLCJvbkxvc3RGb2N1c0luRWRpdG9yIiwiX3N0b3BQcmV2aWV3IiwiY2xlYXJJbnRlcnZhbCIsIl9jb252ZXJ0VGV4dHVyZVRvU3ByaXRlRnJhbWUiLCJfdGhpcyIsIkVkaXRvciIsImFzc2V0ZGIiLCJxdWVyeU1ldGFJbmZvQnlVdWlkIiwiZXJyIiwibWV0YUluZm8iLCJlcnJvciIsIm1ldGEiLCJKU09OIiwicGFyc2UiLCJqc29uIiwiTm9kZVV0aWxzIiwibm9kZVBhdGgiLCJnZXROb2RlUGF0aCIsIndhcm4iLCJhc3NldFVybCIsIlVybCIsImJhc2VuYW1lTm9FeHQiLCJhc3NldFBhdGgiLCJ1dWlkIiwic3ViTWV0YXMiLCJhc3NldE1hbmFnZXIiLCJsb2FkQW55Iiwic3AiLCJfX3ByZWxvYWQiLCJfc3VwZXIiLCJtaXNzQ3VzdG9tVGV4dHVyZSIsImlzUGxheWluZyIsIm9uRGVzdHJveSIsIl9idWZmZXIiLCJkZXN0cm95IiwiX3V2RmlsbGVkIiwibGF0ZVVwZGF0ZSIsImR0IiwiZmluaXNoZWQiLCJzdGVwIiwiYWRkUGFydGljbGUiLCJzdG9wIiwicmVzZXQiLCJtYXJrRm9yUmVuZGVyIiwiaXNGdWxsIiwic2V0VGV4dHVyZVdpdGhSZWN0IiwicmVjdCIsInNlbGYiLCJwb3N0TG9hZE5hdGl2ZSIsIl9uYXRpdmVBc3NldCIsImVycm9ySUQiLCJpc1ZhbGlkIiwiX3BsaXN0RmlsZSIsIm5hdGl2ZVVybCIsImlzRGlmZkZyYW1lIiwiX2luaXRXaXRoRGljdGlvbmFyeSIsIl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5IiwiZGljdCIsImltZ1BhdGgiLCJwYXRoIiwiY2hhbmdlQmFzZW5hbWUiLCJsb2FkSW1hZ2UiLCJ1bmRlZmluZWQiLCJhc3NldHMiLCJhZGQiLCJ0ZXh0dXJlRGF0YSIsInRleCIsImJ1ZmZlciIsInVuemlwQmFzZTY0QXNBcnJheSIsImltYWdlRm9ybWF0IiwiY2FudmFzT2JqIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwibXlQbmdPYmoiLCJyZW5kZXIiLCJwYXJzZVRJRkYiLCJjYWNoZUltYWdlIiwicGFyc2VJbnQiLCJwYXJzZUZsb2F0IiwiX3RlbXBFbWlzc2lvblJhdGUiLCJNYXRoIiwibWluIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwic3JjQmxlbmRGYWN0b3IiLCJTUkNfQUxQSEEiLCJkc3RCbGVuZEZhY3RvciIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJsb2NTdGFydENvbG9yIiwibG9jU3RhcnRDb2xvclZhciIsImxvY0VuZENvbG9yIiwibG9jRW5kQ29sb3JWYXIiLCJ4IiwieSIsImxvY1JvdGF0aW9uSXNEaXIiLCJ0b1N0cmluZyIsInRvTG93ZXJDYXNlIiwiX3ZhbGlkYXRlUmVuZGVyIiwibG9hZGVkIiwiX29uVGV4dHVyZUxvYWRlZCIsInVwZGF0ZVVWcyIsIl9zeW5jQXNwZWN0IiwiZnJhbWVSZWN0IiwiX3JlY3QiLCJ3aWR0aCIsImhlaWdodCIsInRleHR1cmVMb2FkZWQiLCJvblRleHR1cmVMb2FkZWQiLCJnZXRUZXh0dXJlIiwibWF0ZXJpYWwiLCJnZXRNYXRlcmlhbCIsImRlZmluZSIsInNldFByb3BlcnR5IiwicHJvdG90eXBlIiwiY2FsbCIsIl9maW5pc2hlZFNpbXVsYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFBQSxRQUFRLENBQUNHLFdBQVQsQ0FBcUIsU0FBckIsRUFBZ0MsS0FBS3ZNLFdBQUwsRUFBaEM7O0FBRUEzRCxJQUFBQSxTQUFTLENBQUNtUSxTQUFWLENBQW9CekosZUFBcEIsQ0FBb0MwSixJQUFwQyxDQUF5QyxJQUF6QztBQUNILEdBMWdCeUI7QUE0Z0IxQkMsRUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsUUFBSXpPLFNBQUosRUFBZTtBQUNYLFVBQUksS0FBS0gsT0FBTCxJQUFnQixLQUFLNEcsUUFBckIsSUFBaUMsQ0FBQyxLQUFLaEUsTUFBdkMsSUFBaUQsQ0FBQ3hELEVBQUUsQ0FBQ21CLE1BQUgsQ0FBVWlKLFNBQWhFLEVBQTJFO0FBQ3ZFLGFBQUtwSixXQUFMO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFDRCxTQUFLQSxXQUFMO0FBQ0EsU0FBS0MsVUFBTDtBQUNBLFNBQUtDLGFBQUw7O0FBQ0EsUUFBSSxLQUFLcUMsa0JBQUwsSUFBMkIsS0FBS0gsUUFBcEMsRUFBOEM7QUFDMUMsV0FBS3hELElBQUwsQ0FBVTJLLE9BQVY7QUFDSDtBQUNKO0FBemhCeUIsQ0FBVCxDQUFyQjtBQTRoQkF2SyxFQUFFLENBQUNDLGNBQUgsR0FBb0J3UCxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6UCxjQUFyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ01hY3JvJyk7XHJcbmNvbnN0IFBhcnRpY2xlQXNzZXQgPSByZXF1aXJlKCcuL0NDUGFydGljbGVBc3NldCcpO1xyXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcclxuY29uc3QgY29kZWMgPSByZXF1aXJlKCcuLi9jb21wcmVzc2lvbi9aaXBVdGlscycpO1xyXG5jb25zdCBQTkdSZWFkZXIgPSByZXF1aXJlKCcuL0NDUE5HUmVhZGVyJyk7XHJcbmNvbnN0IHRpZmZSZWFkZXIgPSByZXF1aXJlKCcuL0NDVElGRlJlYWRlcicpO1xyXG5jb25zdCB0ZXh0dXJlVXRpbCA9IHJlcXVpcmUoJy4uL2NvcmUvdXRpbHMvdGV4dHVyZS11dGlsJyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi9jb3JlL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XHJcbmNvbnN0IFBhcnRpY2xlU2ltdWxhdG9yID0gcmVxdWlyZSgnLi9wYXJ0aWNsZS1zaW11bGF0b3InKTtcclxuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XHJcbmNvbnN0IEJsZW5kRnVuYyA9IHJlcXVpcmUoJy4uL2NvcmUvdXRpbHMvYmxlbmQtZnVuYycpO1xyXG5cclxuZnVuY3Rpb24gZ2V0SW1hZ2VGb3JtYXRCeURhdGEgKGltZ0RhdGEpIHtcclxuICAgIC8vIGlmIGl0IGlzIGEgcG5nIGZpbGUgYnVmZmVyLlxyXG4gICAgaWYgKGltZ0RhdGEubGVuZ3RoID4gOCAmJiBpbWdEYXRhWzBdID09PSAweDg5XHJcbiAgICAgICAgJiYgaW1nRGF0YVsxXSA9PT0gMHg1MFxyXG4gICAgICAgICYmIGltZ0RhdGFbMl0gPT09IDB4NEVcclxuICAgICAgICAmJiBpbWdEYXRhWzNdID09PSAweDQ3XHJcbiAgICAgICAgJiYgaW1nRGF0YVs0XSA9PT0gMHgwRFxyXG4gICAgICAgICYmIGltZ0RhdGFbNV0gPT09IDB4MEFcclxuICAgICAgICAmJiBpbWdEYXRhWzZdID09PSAweDFBXHJcbiAgICAgICAgJiYgaW1nRGF0YVs3XSA9PT0gMHgwQSkge1xyXG4gICAgICAgIHJldHVybiBtYWNyby5JbWFnZUZvcm1hdC5QTkc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgaXQgaXMgYSB0aWZmIGZpbGUgYnVmZmVyLlxyXG4gICAgaWYgKGltZ0RhdGEubGVuZ3RoID4gMiAmJiAoKGltZ0RhdGFbMF0gPT09IDB4NDkgJiYgaW1nRGF0YVsxXSA9PT0gMHg0OSlcclxuICAgICAgICB8fCAoaW1nRGF0YVswXSA9PT0gMHg0ZCAmJiBpbWdEYXRhWzFdID09PSAweDRkKVxyXG4gICAgICAgIHx8IChpbWdEYXRhWzBdID09PSAweGZmICYmIGltZ0RhdGFbMV0gPT09IDB4ZDgpKSkge1xyXG4gICAgICAgIHJldHVybiBtYWNyby5JbWFnZUZvcm1hdC5USUZGO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hY3JvLkltYWdlRm9ybWF0LlVOS05PV047XHJcbn1cclxuXHJcbi8vXHJcbmZ1bmN0aW9uIGdldFBhcnRpY2xlQ29tcG9uZW50cyAobm9kZSkge1xyXG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50LCBjb21wID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pO1xyXG4gICAgaWYgKCFwYXJlbnQgfHwgIWNvbXApIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5QYXJ0aWNsZVN5c3RlbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2V0UGFydGljbGVDb21wb25lbnRzKHBhcmVudCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBlbWl0dGVyIG1vZGVzXHJcbiAqICEjemgg5Y+R5bCE5qih5byPXHJcbiAqIEBlbnVtIFBhcnRpY2xlU3lzdGVtLkVtaXR0ZXJNb2RlXHJcbiAqL1xyXG52YXIgRW1pdHRlck1vZGUgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBVc2VzIGdyYXZpdHksIHNwZWVkLCByYWRpYWwgYW5kIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uLlxyXG4gICAgICogISN6aCDph43lipvmqKHlvI/vvIzmqKHmi5/ph43lipvvvIzlj6/orqnnspLlrZDlm7Tnu5XkuIDkuKrkuK3lv4Pngrnnp7vov5HmiJbnp7vov5zjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHUkFWSVRZXHJcbiAgICAgKi9cclxuICAgIEdSQVZJVFk6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVXNlcyByYWRpdXMgbW92ZW1lbnQgKyByb3RhdGlvbi5cclxuICAgICAqICEjemgg5Y2K5b6E5qih5byP77yM5Y+v5Lul5L2/57KS5a2Q5Lul5ZyG5ZyI5pa55byP5peL6L2s77yM5a6D5Lmf5Y+v5Lul5Yib6YCg6J665peL5pWI5p6c6K6p57KS5a2Q5oCl6YCf5YmN6L+b5oiW5ZCO6YCA44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUkFESVVTIC0gVXNlcyByYWRpdXMgbW92ZW1lbnQgKyByb3RhdGlvbi5cclxuICAgICAqL1xyXG4gICAgUkFESVVTOiAxXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgcGFydGljbGVzIG1vdmVtZW50IHR5cGUuXHJcbiAqICEjemgg57KS5a2Q5L2N572u57G75Z6LXHJcbiAqIEBlbnVtIFBhcnRpY2xlU3lzdGVtLlBvc2l0aW9uVHlwZVxyXG4gKi9cclxudmFyIFBvc2l0aW9uVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBMaXZpbmcgcGFydGljbGVzIGFyZSBhdHRhY2hlZCB0byB0aGUgd29ybGQgYW5kIGFyZSB1bmFmZmVjdGVkIGJ5IGVtaXR0ZXIgcmVwb3NpdGlvbmluZy5cclxuICAgICAqICEjemhcclxuICAgICAqIOiHqueUseaooeW8j++8jOebuOWvueS6juS4lueVjOWdkOagh++8jOS4jeS8mumaj+eykuWtkOiKgueCueenu+WKqOiAjOenu+WKqOOAgu+8iOWPr+S6p+eUn+eBq+eEsOOAgeiSuOaxveetieaViOaenO+8iVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZSRUVcclxuICAgICAqL1xyXG4gICAgRlJFRTogMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEluIHRoZSByZWxhdGl2ZSBtb2RlLCB0aGUgcGFydGljbGUgd2lsbCBtb3ZlIHdpdGggdGhlIHBhcmVudCBub2RlLCBidXQgbm90IHdpdGggdGhlIG5vZGUgd2hlcmUgdGhlIHBhcnRpY2xlIGlzLiBcclxuICAgICAqIEZvciBleGFtcGxlLCB0aGUgY29mZmVlIGluIHRoZSBjdXAgaXMgc3RlYW1pbmcuIFRoZW4gdGhlIHN0ZWFtIG1vdmVzIChmb3J3YXJkKSB3aXRoIHRoZSB0cmFpbiwgcmF0aGVyIHRoYW4gbW92ZXMgd2l0aCB0aGUgY3VwLlxyXG4gICAgICogISN6aFxyXG4gICAgICog55u45a+55qih5byP77yM57KS5a2Q5Lya6Lef6ZqP54i26IqC54K556e75Yqo77yM5L2G5LiN6Lef6ZqP57KS5a2Q5omA5Zyo6IqC54K556e75Yqo77yM5L6L5aaC5Zyo5LiA5YiX6KGM6L+b54Gr6L2m5Lit77yM5p2v5Lit55qE5ZKW5ZWh6aOY6LW36Zu+5rCU77yMXHJcbiAgICAgKiDmna/lrZDnp7vliqjvvIzpm77msJTmlbTkvZPlubbkuI3kvJrpmo/nnYDmna/lrZDnp7vliqjvvIzkvYbku47ngavovabmlbTkvZPnmoTop5LluqbmnaXnnIvvvIzpm77msJTmlbTkvZPkvJrpmo/nnYDngavovabnp7vliqjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSRUxBVElWRVxyXG4gICAgICovXHJcbiAgICBSRUxBVElWRTogMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIExpdmluZyBwYXJ0aWNsZXMgYXJlIGF0dGFjaGVkIHRvIHRoZSBlbWl0dGVyIGFuZCBhcmUgdHJhbnNsYXRlZCBhbG9uZyB3aXRoIGl0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog5pW057uE5qih5byP77yM57KS5a2Q6Lef6ZqP5Y+R5bCE5Zmo56e75Yqo44CC77yI5LiN5Lya5Y+R55Sf5ouW5bC+77yJXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gR1JPVVBFRFxyXG4gICAgICovXHJcbiAgICBHUk9VUEVEOiAyXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQYXJ0aWNsZVN5c3RlbVxyXG4gKi9cclxuXHJcbnZhciBwcm9wZXJ0aWVzID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBsYXkgcGFydGljbGUgaW4gZWRpdCBtb2RlLlxyXG4gICAgICogISN6aCDlnKjnvJbovpHlmajmqKHlvI/kuIvpooTop4jnspLlrZDvvIzlkK/nlKjlkI7pgInkuK3nspLlrZDml7bvvIznspLlrZDlsIboh6rliqjmkq3mlL7jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmlld1xyXG4gICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAqL1xyXG4gICAgcHJldmlldzoge1xyXG4gICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcclxuICAgICAgICBub3RpZnk6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5wcmV2aWV3ICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wU3lzdGVtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFydGljbGVfc3lzdGVtLnByZXZpZXcnXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSWYgc2V0IGN1c3RvbSB0byB0cnVlLCB0aGVuIHVzZSBjdXN0b20gcHJvcGVydGllcyBpbnN0ZWFkb2YgcmVhZCBwYXJ0aWNsZSBmaWxlLlxyXG4gICAgICogISN6aCDmmK/lkKboh6rlrprkuYnnspLlrZDlsZ7mgKfjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gY3VzdG9tXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBfY3VzdG9tOiBmYWxzZSxcclxuICAgIGN1c3RvbToge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhdmFsdWUgJiYgIXRoaXMuX2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy53YXJuSUQoNjAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1c3RvbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFydGljbGVfc3lzdGVtLmN1c3RvbSdcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBwbGlzdCBmaWxlLlxyXG4gICAgICogISN6aCBwbGlzdCDmoLzlvI/nmoTnspLlrZDphY3nva7mlofku7bjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7UGFydGljbGVBc3NldH0gZmlsZVxyXG4gICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICovXHJcbiAgICBfZmlsZToge1xyXG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogUGFydGljbGVBc3NldFxyXG4gICAgfSxcclxuICAgIGZpbGU6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZm9yY2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpbGUgIT09IHZhbHVlIHx8IChDQ19FRElUT1IgJiYgZm9yY2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseUZpbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVuZ2luZS5yZXBhaW50SW5FZGl0TW9kZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogUGFydGljbGVBc3NldCxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5maWxlJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3ByaXRlRnJhbWUgdXNlZCBmb3IgcGFydGljbGVzIGRpc3BsYXlcclxuICAgICAqICEjemgg55So5LqO57KS5a2Q5ZGI546w55qEIFNwcml0ZUZyYW1lXHJcbiAgICAgKiBAcHJvcGVydHkgc3ByaXRlRnJhbWVcclxuICAgICAqIEB0eXBlIHtTcHJpdGVGcmFtZX1cclxuICAgICAqL1xyXG4gICAgX3Nwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxyXG4gICAgfSxcclxuICAgIHNwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlLCBmb3JjZSkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFNwcml0ZSA9IHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmIGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLl91dWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVGcmFtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hcHBseVNwcml0ZUZyYW1lKGxhc3RTcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZW1pdCgnc3ByaXRlZnJhbWUtY2hhbmdlZCcsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5zcHJpdGVGcmFtZSdcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8vIGp1c3QgdXNlZCB0byByZWFkIGRhdGEgZnJvbSAxLnhcclxuICAgIF90ZXh0dXJlOiB7XHJcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICB0eXBlOiBjYy5UZXh0dXJlMkQsXHJcbiAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRleHR1cmUgb2YgUGFydGljbGUgU3lzdGVtLCByZWFkb25seSwgcGxlYXNlIHVzZSBzcHJpdGVGcmFtZSB0byBzZXR1cCBuZXcgdGV4dHVyZeOAglxyXG4gICAgICogISN6aCDnspLlrZDotLTlm77vvIzlj6ror7vlsZ7mgKfvvIzor7fkvb/nlKggc3ByaXRlRnJhbWUg5bGe5oCn5p2l5pu/5o2i6LS05Zu+44CCXHJcbiAgICAgKiBAcHJvcGVydHkgdGV4dHVyZVxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB0ZXh0dXJlOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRUZXh0dXJlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDE3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFydGljbGVfc3lzdGVtLnRleHR1cmUnLFxyXG4gICAgICAgIHJlYWRvbmx5OiB0cnVlLFxyXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDdXJyZW50IHF1YW50aXR5IG9mIHBhcnRpY2xlcyB0aGF0IGFyZSBiZWluZyBzaW11bGF0ZWQuXHJcbiAgICAgKiAhI3poIOW9k+WJjeaSreaUvueahOeykuWtkOaVsOmHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhcnRpY2xlQ291bnRcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwYXJ0aWNsZUNvdW50OiB7XHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpbXVsYXRvci5wYXJ0aWNsZXMubGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEluZGljYXRlIHdoZXRoZXIgdGhlIHN5c3RlbSBzaW11bGF0aW9uIGhhdmUgc3RvcHBlZC5cclxuICAgICAqICEjemgg5oyH56S657KS5a2Q5pKt5pS+5piv5ZCm5a6M5q+V44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHN0b3BwZWRcclxuICAgICAqL1xyXG4gICAgX3N0b3BwZWQ6IHRydWUsXHJcbiAgICBzdG9wcGVkOiB7XHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3BwZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSWYgc2V0IHRvIHRydWUsIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gd2lsbCBhdXRvbWF0aWNhbGx5IHN0YXJ0IHBsYXlpbmcgb24gb25Mb2FkLlxyXG4gICAgICogISN6aCDlpoLmnpzorr7nva7kuLogdHJ1ZSDov5DooYzml7bkvJroh6rliqjlj5HlsITnspLlrZDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBwbGF5T25Mb2FkXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBkZWZhdWx0IHRydWVcclxuICAgICAqL1xyXG4gICAgcGxheU9uTG9hZDogdHJ1ZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW5kaWNhdGUgd2hldGhlciB0aGUgb3duZXIgbm9kZSB3aWxsIGJlIGF1dG8tcmVtb3ZlZCB3aGVuIGl0IGhhcyBubyBwYXJ0aWNsZXMgbGVmdC5cclxuICAgICAqICEjemgg57KS5a2Q5pKt5pS+5a6M5q+V5ZCO6Ieq5Yqo6ZSA5q+B5omA5Zyo55qE6IqC54K544CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGF1dG9SZW1vdmVPbkZpbmlzaFxyXG4gICAgICovXHJcbiAgICBhdXRvUmVtb3ZlT25GaW5pc2g6IHtcclxuICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5hdXRvUmVtb3ZlT25GaW5pc2gnXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gaXMgYWN0aXZhdGVkLlxyXG4gICAgICogISN6aCDmmK/lkKbmv4DmtLvnspLlrZDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWN0aXZlXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgYWN0aXZlOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0b3IuYWN0aXZlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE1heGltdW0gcGFydGljbGVzIG9mIHRoZSBzeXN0ZW0uXHJcbiAgICAgKiAhI3poIOeykuWtkOacgOWkp+aVsOmHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRvdGFsUGFydGljbGVzXHJcbiAgICAgKiBAZGVmYXVsdCAxNTBcclxuICAgICAqL1xyXG4gICAgdG90YWxQYXJ0aWNsZXM6IDE1MCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBIb3cgbWFueSBzZWNvbmRzIHRoZSBlbWl0dGVyIHdpbCBydW4uIC0xIG1lYW5zICdmb3JldmVyJy5cclxuICAgICAqICEjemgg5Y+R5bCE5Zmo55Sf5a2Y5pe26Ze077yM5Y2V5L2N56eS77yMLTHooajnpLrmjIHnu63lj5HlsITjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uRFVSQVRJT05fSU5GSU5JVFlcclxuICAgICAqL1xyXG4gICAgZHVyYXRpb246IC0xLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVtaXNzaW9uIHJhdGUgb2YgdGhlIHBhcnRpY2xlcy5cclxuICAgICAqICEjemgg5q+P56eS5Y+R5bCE55qE57KS5a2Q5pWw55uu44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW1pc3Npb25SYXRlXHJcbiAgICAgKiBAZGVmYXVsdCAxMFxyXG4gICAgICovXHJcbiAgICBlbWlzc2lvblJhdGU6IDEwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExpZmUgb2YgZWFjaCBwYXJ0aWNsZSBzZXR0ZXIuXHJcbiAgICAgKiAhI3poIOeykuWtkOeahOi/kOihjOaXtumXtOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpZmVcclxuICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAqL1xyXG4gICAgbGlmZTogMSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgbGlmZS5cclxuICAgICAqICEjemgg57KS5a2Q55qE6L+Q6KGM5pe26Ze05Y+Y5YyW6IyD5Zu044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGlmZVZhclxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICBsaWZlVmFyOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdGFydCBjb2xvciBvZiBlYWNoIHBhcnRpY2xlLlxyXG4gICAgICogISN6aCDnspLlrZDliJ3lp4vpopzoibLjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IHN0YXJ0Q29sb3JcclxuICAgICAqIEBkZWZhdWx0IHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAyNTV9XHJcbiAgICAgKi9cclxuICAgIF9zdGFydENvbG9yOiBudWxsLFxyXG4gICAgc3RhcnRDb2xvcjoge1xyXG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxyXG4gICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydENvbG9yO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5yID0gdmFsLnI7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3IuZyA9IHZhbC5nO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yLmIgPSB2YWwuYjtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5hID0gdmFsLmE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgdGhlIHN0YXJ0IGNvbG9yLlxyXG4gICAgICogISN6aCDnspLlrZDliJ3lp4vpopzoibLlj5jljJbojIPlm7TjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IHN0YXJ0Q29sb3JWYXJcclxuICAgICAqIEBkZWZhdWx0IHtyOiAwLCBnOiAwLCBiOiAwLCBhOiAwfVxyXG4gICAgICovXHJcbiAgICBfc3RhcnRDb2xvclZhcjogbnVsbCxcclxuICAgIHN0YXJ0Q29sb3JWYXI6IHtcclxuICAgICAgICB0eXBlOiBjYy5Db2xvcixcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRDb2xvclZhcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3JWYXIuciA9IHZhbC5yO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyLmcgPSB2YWwuZztcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhci5iID0gdmFsLmI7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3JWYXIuYSA9IHZhbC5hO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW5kaW5nIGNvbG9yIG9mIGVhY2ggcGFydGljbGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+minOiJsuOAglxyXG4gICAgICogQHByb3BlcnR5IHtjYy5Db2xvcn0gZW5kQ29sb3JcclxuICAgICAqIEBkZWZhdWx0IHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAwfVxyXG4gICAgICovXHJcbiAgICBfZW5kQ29sb3I6IG51bGwsXHJcbiAgICBlbmRDb2xvcjoge1xyXG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxyXG4gICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmRDb2xvcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZENvbG9yLnIgPSB2YWwucjtcclxuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuZyA9IHZhbC5nO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvci5iID0gdmFsLmI7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZENvbG9yLmEgPSB2YWwuYTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZW5kIGNvbG9yLlxyXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/popzoibLlj5jljJbojIPlm7TjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IGVuZENvbG9yVmFyXHJcbiAgICAgKiBAZGVmYXVsdCB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cclxuICAgICAqL1xyXG4gICAgX2VuZENvbG9yVmFyOiBudWxsLFxyXG4gICAgZW5kQ29sb3JWYXI6IHtcclxuICAgICAgICB0eXBlOiBjYy5Db2xvcixcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kQ29sb3JWYXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5yID0gdmFsLnI7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZENvbG9yVmFyLmcgPSB2YWwuZztcclxuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3JWYXIuYiA9IHZhbC5iO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5hID0gdmFsLmE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQW5nbGUgb2YgZWFjaCBwYXJ0aWNsZSBzZXR0ZXIuXHJcbiAgICAgKiAhI3poIOeykuWtkOinkuW6puOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgKiBAZGVmYXVsdCA5MFxyXG4gICAgICovXHJcbiAgICBhbmdsZTogOTAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGFuZ2xlIG9mIGVhY2ggcGFydGljbGUgc2V0dGVyLlxyXG4gICAgICogISN6aCDnspLlrZDop5Lluqblj5jljJbojIPlm7TjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbmdsZVZhclxyXG4gICAgICogQGRlZmF1bHQgMjBcclxuICAgICAqL1xyXG4gICAgYW5nbGVWYXI6IDIwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN0YXJ0IHNpemUgaW4gcGl4ZWxzIG9mIGVhY2ggcGFydGljbGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOeahOWIneWni+Wkp+Wwj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U2l6ZVxyXG4gICAgICogQGRlZmF1bHQgNTBcclxuICAgICAqL1xyXG4gICAgc3RhcnRTaXplOiA1MCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc3RhcnQgc2l6ZSBpbiBwaXhlbHMuXHJcbiAgICAgKiAhI3poIOeykuWtkOWIneWni+Wkp+Wwj+eahOWPmOWMluiMg+WbtOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U2l6ZVZhclxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICBzdGFydFNpemVWYXI6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW5kIHNpemUgaW4gcGl4ZWxzIG9mIGVhY2ggcGFydGljbGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+aXtueahOWkp+Wwj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFNpemVcclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgZW5kU2l6ZTogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgZW5kIHNpemUgaW4gcGl4ZWxzLlxyXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/lpKflsI/nmoTlj5jljJbojIPlm7TjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRTaXplVmFyXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIGVuZFNpemVWYXI6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RhcnQgYW5nbGUgb2YgZWFjaCBwYXJ0aWNsZS5cclxuICAgICAqICEjemgg57KS5a2Q5byA5aeL6Ieq5peL6KeS5bqm44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRTcGluXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0U3BpbjogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc3RhcnQgYW5nbGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOW8gOWni+iHquaXi+inkuW6puWPmOWMluiMg+WbtOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U3BpblZhclxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICBzdGFydFNwaW5WYXI6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW5kIGFuZ2xlIG9mIGVhY2ggcGFydGljbGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+iHquaXi+inkuW6puOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFNwaW5cclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgZW5kU3BpbjogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgZW5kIGFuZ2xlLlxyXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/oh6rml4vop5Lluqblj5jljJbojIPlm7TjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRTcGluVmFyXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIGVuZFNwaW5WYXI6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNvdXJjZSBwb3NpdGlvbiBvZiB0aGUgZW1pdHRlci5cclxuICAgICAqICEjemgg5Y+R5bCE5Zmo5L2N572u44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IHNvdXJjZVBvc1xyXG4gICAgICogQGRlZmF1bHQgY2MuVmVjMi5aRVJPXHJcbiAgICAgKi9cclxuICAgIHNvdXJjZVBvczogY2MuVmVjMi5aRVJPLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc291cmNlIHBvc2l0aW9uLlxyXG4gICAgICogISN6aCDlj5HlsITlmajkvY3nva7nmoTlj5jljJbojIPlm7TjgILvvIjmqKrlkJHlkoznurXlkJHvvIlcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gcG9zVmFyXHJcbiAgICAgKiBAZGVmYXVsdCBjYy5WZWMyLlpFUk9cclxuICAgICAqL1xyXG4gICAgcG9zVmFyOiBjYy5WZWMyLlpFUk8sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlcyBtb3ZlbWVudCB0eXBlLlxyXG4gICAgICogISN6aCDnspLlrZDkvY3nva7nsbvlnovjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7UGFydGljbGVTeXN0ZW0uUG9zaXRpb25UeXBlfSBwb3NpdGlvblR5cGVcclxuICAgICAqIEBkZWZhdWx0IFBhcnRpY2xlU3lzdGVtLlBvc2l0aW9uVHlwZS5GUkVFXHJcbiAgICAgKi9cclxuICAgIF9wb3NpdGlvblR5cGU6IHtcclxuICAgICAgICBkZWZhdWx0OiBQb3NpdGlvblR5cGUuRlJFRSxcclxuICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogXCJwb3NpdGlvblR5cGVcIlxyXG4gICAgfSxcclxuXHJcbiAgICBwb3NpdGlvblR5cGU6IHtcclxuICAgICAgICB0eXBlOiBQb3NpdGlvblR5cGUsXHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uVHlwZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uVHlwZSA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZXMgZW1pdHRlciBtb2Rlcy5cclxuICAgICAqICEjemgg5Y+R5bCE5Zmo57G75Z6L44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1BhcnRpY2xlU3lzdGVtLkVtaXR0ZXJNb2RlfSBlbWl0dGVyTW9kZVxyXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGUuR1JBVklUWVxyXG4gICAgICovXHJcbiAgICBlbWl0dGVyTW9kZToge1xyXG4gICAgICAgIGRlZmF1bHQ6IEVtaXR0ZXJNb2RlLkdSQVZJVFksXHJcbiAgICAgICAgdHlwZTogRW1pdHRlck1vZGVcclxuICAgIH0sXHJcblxyXG4gICAgLy8gR1JBVklUWSBNT0RFXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdyYXZpdHkgb2YgdGhlIGVtaXR0ZXIuXHJcbiAgICAgKiAhI3poIOmHjeWKm+OAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBncmF2aXR5XHJcbiAgICAgKiBAZGVmYXVsdCBjYy5WZWMyLlpFUk9cclxuICAgICAqL1xyXG4gICAgZ3Jhdml0eTogY2MuVmVjMi5aRVJPLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNwZWVkIG9mIHRoZSBlbWl0dGVyLlxyXG4gICAgICogISN6aCDpgJ/luqbjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGVlZFxyXG4gICAgICogQGRlZmF1bHQgMTgwXHJcbiAgICAgKi9cclxuICAgIHNwZWVkOiAxODAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSBzcGVlZC5cclxuICAgICAqICEjemgg6YCf5bqm5Y+Y5YyW6IyD5Zu044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3BlZWRWYXJcclxuICAgICAqIEBkZWZhdWx0IDUwXHJcbiAgICAgKi9cclxuICAgIHNwZWVkVmFyOiA1MCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUYW5nZW50aWFsIGFjY2VsZXJhdGlvbiBvZiBlYWNoIHBhcnRpY2xlLiBPbmx5IGF2YWlsYWJsZSBpbiAnR3Jhdml0eScgbW9kZS5cclxuICAgICAqICEjemgg5q+P5Liq57KS5a2Q55qE5YiH5ZCR5Yqg6YCf5bqm77yM5Y2z5Z6C55u05LqO6YeN5Yqb5pa55ZCR55qE5Yqg6YCf5bqm77yM5Y+q5pyJ5Zyo6YeN5Yqb5qih5byP5LiL5Y+v55So44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGFuZ2VudGlhbEFjY2VsXHJcbiAgICAgKiBAZGVmYXVsdCA4MFxyXG4gICAgICovXHJcbiAgICB0YW5nZW50aWFsQWNjZWw6IDgwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgdGFuZ2VudGlhbCBhY2NlbGVyYXRpb24uXHJcbiAgICAgKiAhI3poIOavj+S4queykuWtkOeahOWIh+WQkeWKoOmAn+W6puWPmOWMluiMg+WbtOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRhbmdlbnRpYWxBY2NlbFZhclxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICB0YW5nZW50aWFsQWNjZWxWYXI6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWNjZWxlcmF0aW9uIG9mIGVhY2ggcGFydGljbGUuIE9ubHkgYXZhaWxhYmxlIGluICdHcmF2aXR5JyBtb2RlLlxyXG4gICAgICogISN6aCDnspLlrZDlvoTlkJHliqDpgJ/luqbvvIzljbPlubPooYzkuo7ph43lipvmlrnlkJHnmoTliqDpgJ/luqbvvIzlj6rmnInlnKjph43lipvmqKHlvI/kuIvlj6/nlKjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpYWxBY2NlbFxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICByYWRpYWxBY2NlbDogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgdGhlIHJhZGlhbCBhY2NlbGVyYXRpb24uXHJcbiAgICAgKiAhI3poIOeykuWtkOW+hOWQkeWKoOmAn+W6puWPmOWMluiMg+WbtOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGlhbEFjY2VsVmFyXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIHJhZGlhbEFjY2VsVmFyOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSByb3RhdGlvbiBvZiBlYWNoIHBhcnRpY2xlIGVxdWFscyB0byBpdHMgZGlyZWN0aW9uLiBPbmx5IGF2YWlsYWJsZSBpbiAnR3Jhdml0eScgbW9kZS5cclxuICAgICAqICEjemgg5q+P5Liq57KS5a2Q55qE5peL6L2s5piv5ZCm562J5LqO5YW25pa55ZCR77yM5Y+q5pyJ5Zyo6YeN5Yqb5qih5byP5LiL5Y+v55So44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHJvdGF0aW9uSXNEaXJcclxuICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgKi9cclxuICAgIHJvdGF0aW9uSXNEaXI6IGZhbHNlLFxyXG5cclxuICAgIC8vIFJBRElVUyBNT0RFXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN0YXJ0aW5nIHJhZGl1cyBvZiB0aGUgcGFydGljbGVzLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxyXG4gICAgICogISN6aCDliJ3lp4vljYrlvoTvvIzooajnpLrnspLlrZDlh7rnlJ/ml7bnm7jlr7nlj5HlsITlmajnmoTot53nprvvvIzlj6rmnInlnKjljYrlvoTmqKHlvI/kuIvlj6/nlKjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFJhZGl1c1xyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICBzdGFydFJhZGl1czogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgdGhlIHN0YXJ0aW5nIHJhZGl1cy5cclxuICAgICAqICEjemgg5Yid5aeL5Y2K5b6E5Y+Y5YyW6IyD5Zu044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRSYWRpdXNWYXJcclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgc3RhcnRSYWRpdXNWYXI6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW5kaW5nIHJhZGl1cyBvZiB0aGUgcGFydGljbGVzLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxyXG4gICAgICogISN6aCDnu5PmnZ/ljYrlvoTvvIzlj6rmnInlnKjljYrlvoTmqKHlvI/kuIvlj6/nlKjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRSYWRpdXNcclxuICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAqL1xyXG4gICAgZW5kUmFkaXVzOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZW5kaW5nIHJhZGl1cy5cclxuICAgICAqICEjemgg57uT5p2f5Y2K5b6E5Y+Y5YyW6IyD5Zu044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kUmFkaXVzVmFyXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKi9cclxuICAgIGVuZFJhZGl1c1ZhcjogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOdW1iZXIgb2YgZGVncmVzcyB0byByb3RhdGUgYSBwYXJ0aWNsZSBhcm91bmQgdGhlIHNvdXJjZSBwb3MgcGVyIHNlY29uZC4gT25seSBhdmFpbGFibGUgaW4gJ1JhZGl1cycgbW9kZS5cclxuICAgICAqICEjemgg57KS5a2Q5q+P56eS5Zu057uV6LW35aeL54K555qE5peL6L2s6KeS5bqm77yM5Y+q5pyJ5Zyo5Y2K5b6E5qih5byP5LiL5Y+v55So44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcm90YXRlUGVyU1xyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICByb3RhdGVQZXJTOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZGVncmVzcyB0byByb3RhdGUgYSBwYXJ0aWNsZSBhcm91bmQgdGhlIHNvdXJjZSBwb3MgcGVyIHNlY29uZC5cclxuICAgICAqICEjemgg57KS5a2Q5q+P56eS5Zu057uV6LW35aeL54K555qE5peL6L2s6KeS5bqm5Y+Y5YyW6IyD5Zu044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcm90YXRlUGVyU1ZhclxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICByb3RhdGVQZXJTVmFyOiAwXHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnRpY2xlIFN5c3RlbSBiYXNlIGNsYXNzLiA8YnIvPlxyXG4gKiBBdHRyaWJ1dGVzIG9mIGEgUGFydGljbGUgU3lzdGVtOjxici8+XHJcbiAqICAtIGVtbWlzaW9uIHJhdGUgb2YgdGhlIHBhcnRpY2xlczxici8+XHJcbiAqICAtIEdyYXZpdHkgTW9kZSAoTW9kZSBBKTogPGJyLz5cclxuICogIC0gZ3Jhdml0eSA8YnIvPlxyXG4gKiAgLSBkaXJlY3Rpb24gPGJyLz5cclxuICogIC0gc3BlZWQgKy0gIHZhcmlhbmNlIDxici8+XHJcbiAqICAtIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uICstIHZhcmlhbmNlPGJyLz5cclxuICogIC0gcmFkaWFsIGFjY2VsZXJhdGlvbiArLSB2YXJpYW5jZTxici8+XHJcbiAqICAtIFJhZGl1cyBNb2RlIChNb2RlIEIpOiAgICAgIDxici8+XHJcbiAqICAtIHN0YXJ0UmFkaXVzICstIHZhcmlhbmNlICAgIDxici8+XHJcbiAqICAtIGVuZFJhZGl1cyArLSB2YXJpYW5jZSAgICAgIDxici8+XHJcbiAqICAtIHJvdGF0ZSArLSB2YXJpYW5jZSAgICAgICAgIDxici8+XHJcbiAqICAtIFByb3BlcnRpZXMgY29tbW9uIHRvIGFsbCBtb2RlczogPGJyLz5cclxuICogIC0gbGlmZSArLSBsaWZlIHZhcmlhbmNlICAgICAgPGJyLz5cclxuICogIC0gc3RhcnQgc3BpbiArLSB2YXJpYW5jZSAgICAgPGJyLz5cclxuICogIC0gZW5kIHNwaW4gKy0gdmFyaWFuY2UgICAgICAgPGJyLz5cclxuICogIC0gc3RhcnQgc2l6ZSArLSB2YXJpYW5jZSAgICAgPGJyLz5cclxuICogIC0gZW5kIHNpemUgKy0gdmFyaWFuY2UgICAgICAgPGJyLz5cclxuICogIC0gc3RhcnQgY29sb3IgKy0gdmFyaWFuY2UgICAgPGJyLz5cclxuICogIC0gZW5kIGNvbG9yICstIHZhcmlhbmNlICAgICAgPGJyLz5cclxuICogIC0gbGlmZSArLSB2YXJpYW5jZSAgICAgICAgICAgPGJyLz5cclxuICogIC0gYmxlbmRpbmcgZnVuY3Rpb24gICAgICAgICAgPGJyLz5cclxuICogIC0gdGV4dHVyZSAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogPGJyLz5cclxuICogY29jb3MyZCBhbHNvIHN1cHBvcnRzIHBhcnRpY2xlcyBnZW5lcmF0ZWQgYnkgUGFydGljbGUgRGVzaWduZXIgKGh0dHA6Ly9wYXJ0aWNsZWRlc2lnbmVyLjcxc3F1YXJlZC5jb20vKS48YnIvPlxyXG4gKiAnUmFkaXVzIE1vZGUnIGluIFBhcnRpY2xlIERlc2lnbmVyIHVzZXMgYSBmaXhlZCBlbWl0IHJhdGUgb2YgMzAgaHouIFNpbmNlIHRoYXQgY2FuJ3QgYmUgZ3VhcmF0ZWVkIGluIGNvY29zMmQsICA8YnIvPlxyXG4gKiBjb2NvczJkIHVzZXMgYSBhbm90aGVyIGFwcHJvYWNoLCBidXQgdGhlIHJlc3VsdHMgYXJlIGFsbW9zdCBpZGVudGljYWwuPGJyLz5cclxuICogY29jb3MyZCBzdXBwb3J0cyBhbGwgdGhlIHZhcmlhYmxlcyB1c2VkIGJ5IFBhcnRpY2xlIERlc2lnbmVyIHBsdXMgYSBiaXQgbW9yZTogIDxici8+XHJcbiAqICAtIHNwaW5uaW5nIHBhcnRpY2xlcyAoc3VwcG9ydGVkIHdoZW4gdXNpbmcgUGFydGljbGVTeXN0ZW0pICAgICAgIDxici8+XHJcbiAqICAtIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uIChHcmF2aXR5IG1vZGUpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqICAtIHJhZGlhbCBhY2NlbGVyYXRpb24gKEdyYXZpdHkgbW9kZSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqICAtIHJhZGl1cyBkaXJlY3Rpb24gKFJhZGl1cyBtb2RlKSAoUGFydGljbGUgRGVzaWduZXIgc3VwcG9ydHMgb3V0d2FyZHMgdG8gaW53YXJkcyBkaXJlY3Rpb24gb25seSkgPGJyLz5cclxuICogSXQgaXMgcG9zc2libGUgdG8gY3VzdG9taXplIGFueSBvZiB0aGUgYWJvdmUgbWVudGlvbmVkIHByb3BlcnRpZXMgaW4gcnVudGltZS4gRXhhbXBsZTogICA8YnIvPlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBlbWl0dGVyLnJhZGlhbEFjY2VsID0gMTU7XHJcbiAqIGVtaXR0ZXIuc3RhcnRTcGluID0gMDtcclxuICpcclxuICogQGNsYXNzIFBhcnRpY2xlU3lzdGVtXHJcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxyXG4gKiBAdXNlcyBCbGVuZEZ1bmNcclxuICovXHJcbnZhciBQYXJ0aWNsZVN5c3RlbSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5QYXJ0aWNsZVN5c3RlbScsXHJcbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXHJcbiAgICBtaXhpbnM6IFtCbGVuZEZ1bmNdLFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1BhcnRpY2xlU3lzdGVtJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BhcnRpY2xlLXN5c3RlbS5qcycsXHJcbiAgICAgICAgcGxheU9uRm9jdXM6IHRydWUsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0UHJvcGVydGllcygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0UHJvcGVydGllcyAoKSB7XHJcbiAgICAgICAgdGhpcy5fcHJldmlld1RpbWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYXNwZWN0UmF0aW8gPSAxO1xyXG5cclxuICAgICAgICB0aGlzLl9zaW11bGF0b3IgPSBuZXcgUGFydGljbGVTaW11bGF0b3IodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGNvbG9yc1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0Q29sb3IgPSBjYy5jb2xvcigyNTUsIDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0Q29sb3JWYXIgPSBjYy5jb2xvcigwLCAwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLl9lbmRDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDApO1xyXG4gICAgICAgIHRoaXMuX2VuZENvbG9yVmFyID0gY2MuY29sb3IoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSB0ZW1wb3JhcnkgU3ByaXRlRnJhbWUgb2JqZWN0IHVzZWQgZm9yIHRoZSByZW5kZXJlci4gQmVjYXVzZSB0aGVyZSBpcyBubyBjb3JyZXNwb25kaW5nIGFzc2V0LCBpdCBjYW4ndCBiZSBzZXJpYWxpemVkLlxyXG4gICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczogcHJvcGVydGllcyxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIFBhcnRpY2xlIGVtaXR0ZXIgbGl2ZXMgZm9yZXZlci5cclxuICAgICAgICAgKiAhI3poIOihqOekuuWPkeWwhOWZqOawuOS5heWtmOWcqFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBEVVJBVElPTl9JTkZJTklUWVxyXG4gICAgICAgICAqIEBkZWZhdWx0IC0xXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERVUkFUSU9OX0lORklOSVRZOiAtMSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc3RhcnRpbmcgc2l6ZSBvZiB0aGUgcGFydGljbGUgaXMgZXF1YWwgdG8gdGhlIGVuZGluZyBzaXplLlxyXG4gICAgICAgICAqICEjemgg6KGo56S657KS5a2Q55qE6LW35aeL5aSn5bCP562J5LqO57uT5p2f5aSn5bCP44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNUQVJUX1NJWkVfRVFVQUxfVE9fRU5EX1NJWkVcclxuICAgICAgICAgKiBAZGVmYXVsdCAtMVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBTVEFSVF9TSVpFX0VRVUFMX1RPX0VORF9TSVpFOiAtMSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc3RhcnRpbmcgcmFkaXVzIG9mIHRoZSBwYXJ0aWNsZSBpcyBlcXVhbCB0byB0aGUgZW5kaW5nIHJhZGl1cy5cclxuICAgICAgICAgKiAhI3poIOihqOekuueykuWtkOeahOi1t+Wni+WNiuW+hOetieS6jue7k+adn+WNiuW+hOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTVEFSVF9SQURJVVNfRVFVQUxfVE9fRU5EX1JBRElVU1xyXG4gICAgICAgICAqIEBkZWZhdWx0IC0xXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNUQVJUX1JBRElVU19FUVVBTF9UT19FTkRfUkFESVVTOiAtMSxcclxuXHJcbiAgICAgICAgRW1pdHRlck1vZGU6IEVtaXR0ZXJNb2RlLFxyXG4gICAgICAgIFBvc2l0aW9uVHlwZTogUG9zaXRpb25UeXBlLFxyXG5cclxuXHJcbiAgICAgICAgX1BOR1JlYWRlcjogUE5HUmVhZGVyLFxyXG4gICAgICAgIF9USUZGUmVhZGVyOiB0aWZmUmVhZGVyLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBFRElUT1IgUkVMQVRFRCBNRVRIT0RTXHJcblxyXG4gICAgb25Gb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gZ2V0UGFydGljbGVDb21wb25lbnRzKHRoaXMubm9kZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudHNbaV0uX3N0YXJ0UHJldmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb3N0Rm9jdXNJbkVkaXRvcjogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBnZXRQYXJ0aWNsZUNvbXBvbmVudHModGhpcy5ub2RlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50c1tpXS5fc3RvcFByZXZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zdGFydFByZXZpZXc6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfc3RvcFByZXZpZXc6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFN5c3RlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcclxuICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9wcmV2aWV3VGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9wcmV2aWV3VGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBNRVRIT0RTXHJcblxyXG4gICAgLy8ganVzdCB1c2VkIHRvIHJlYWQgZGF0YSBmcm9tIDEueFxyXG4gICAgX2NvbnZlcnRUZXh0dXJlVG9TcHJpdGVGcmFtZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGV4dHVyZSA9IHRoaXMudGV4dHVyZTtcclxuICAgICAgICBpZiAoIXRleHR1cmUgfHwgIXRleHR1cmUuX3V1aWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBFZGl0b3IuYXNzZXRkYi5xdWVyeU1ldGFJbmZvQnlVdWlkKHRleHR1cmUuX3V1aWQsIGZ1bmN0aW9uIChlcnIsIG1ldGFJbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBFZGl0b3IuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgbGV0IG1ldGEgPSBKU09OLnBhcnNlKG1ldGFJbmZvLmpzb24pO1xyXG4gICAgICAgICAgICBpZiAobWV0YS50eXBlID09PSAncmF3Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTm9kZVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ2FwcDovL2VkaXRvci9wYWdlL3NjZW5lLXV0aWxzL3V0aWxzL25vZGUnKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlUGF0aCA9IE5vZGVVdGlscy5nZXROb2RlUGF0aChfdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBFZGl0b3Iud2FybihgVGhlIHRleHR1cmUgJHttZXRhSW5mby5hc3NldFVybH0gdXNlZCBieSBwYXJ0aWNsZSAke25vZGVQYXRofSBkb2VzIG5vdCBjb250YWluIGFueSBTcHJpdGVGcmFtZSwgcGxlYXNlIHNldCB0aGUgdGV4dHVyZSB0eXBlIHRvIFNwcml0ZSBhbmQgcmVhc3NpZ24gdGhlIFNwcml0ZUZyYW1lIHRvIHRoZSBwYXJ0aWNsZSBjb21wb25lbnQuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgVXJsID0gcmVxdWlyZSgnZmlyZS11cmwnKTtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gVXJsLmJhc2VuYW1lTm9FeHQobWV0YUluZm8uYXNzZXRQYXRoKTtcclxuICAgICAgICAgICAgICAgIGxldCB1dWlkID0gbWV0YS5zdWJNZXRhc1tuYW1lXS51dWlkO1xyXG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkodXVpZCwgZnVuY3Rpb24gKGVyciwgc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gRWRpdG9yLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3ByaXRlRnJhbWUgPSBzcDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9fcHJlbG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLl9jb252ZXJ0VGV4dHVyZVRvU3ByaXRlRnJhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXN0b20gJiYgdGhpcy5zcHJpdGVGcmFtZSAmJiAhdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwbHlTcHJpdGVGcmFtZSh0aGlzLnNwcml0ZUZyYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fZmlsZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWlzc0N1c3RvbVRleHR1cmUgPSAhdGhpcy5fZ2V0VGV4dHVyZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pc3NDdXN0b21UZXh0dXJlKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXV0byBwbGF5XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgfHwgY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5T25Mb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVXBncmFkZSBjb2xvciB0eXBlIGZyb20gdjIuMC4wXHJcbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhKHRoaXMuX3N0YXJ0Q29sb3IgaW5zdGFuY2VvZiBjYy5Db2xvcikpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvciA9IGNjLmNvbG9yKHRoaXMuX3N0YXJ0Q29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyID0gY2MuY29sb3IodGhpcy5fc3RhcnRDb2xvclZhcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuZENvbG9yID0gY2MuY29sb3IodGhpcy5fZW5kQ29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhciA9IGNjLmNvbG9yKHRoaXMuX2VuZENvbG9yVmFyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1JlbW92ZU9uRmluaXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZU9uRmluaXNoID0gZmFsc2U7ICAgIC8vIGFscmVhZHkgcmVtb3ZlZFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHJlc2V0IHV2IGRhdGEgc28gbmV4dCB0aW1lIHNpbXVsYXRvciB3aWxsIHJlZmlsbCBidWZmZXIgdXYgaW5mbyB3aGVuIGV4aXQgZWRpdCBtb2RlIGZyb20gcHJlZmFiLlxyXG4gICAgICAgIHRoaXMuX3NpbXVsYXRvci5fdXZGaWxsZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBsYXRlVXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fc2ltdWxhdG9yLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NpbXVsYXRvci5zdGVwKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIEFQSVNcclxuXHJcbiAgICAvKlxyXG4gICAgICogISNlbiBBZGQgYSBwYXJ0aWNsZSB0byB0aGUgZW1pdHRlci5cclxuICAgICAqICEjemgg5re75Yqg5LiA5Liq57KS5a2Q5Yiw5Y+R5bCE5Zmo5Lit44CCXHJcbiAgICAgKiBAbWV0aG9kIGFkZFBhcnRpY2xlXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBhZGRQYXJ0aWNsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIE5vdCBpbXBsZW1lbnRlZFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RvcCBlbWl0dGluZyBwYXJ0aWNsZXMuIFJ1bm5pbmcgcGFydGljbGVzIHdpbGwgY29udGludWUgdG8gcnVuIHVudGlsIHRoZXkgZGllLlxyXG4gICAgICogISN6aCDlgZzmraLlj5HlsITlmajlj5HlsITnspLlrZDvvIzlj5HlsITlh7rljrvnmoTnspLlrZDlsIbnu6fnu63ov5DooYzvvIznm7Toh7PnspLlrZDnlJ/lkb3nu5PmnZ/jgIJcclxuICAgICAqIEBtZXRob2Qgc3RvcFN5c3RlbVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHN0b3AgcGFydGljbGUgc3lzdGVtLlxyXG4gICAgICogbXlQYXJ0aWNsZVN5c3RlbS5zdG9wU3lzdGVtKCk7XHJcbiAgICAgKi9cclxuICAgIHN0b3BTeXN0ZW06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zaW11bGF0b3Iuc3RvcCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gS2lsbCBhbGwgbGl2aW5nIHBhcnRpY2xlcy5cclxuICAgICAqICEjemgg5p2A5q275omA5pyJ5a2Y5Zyo55qE57KS5a2Q77yM54S25ZCO6YeN5paw5ZCv5Yqo57KS5a2Q5Y+R5bCE5Zmo44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc2V0U3lzdGVtXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gcGxheSBwYXJ0aWNsZSBzeXN0ZW0uXHJcbiAgICAgKiBteVBhcnRpY2xlU3lzdGVtLnJlc2V0U3lzdGVtKCk7XHJcbiAgICAgKi9cclxuICAgIHJlc2V0U3lzdGVtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NpbXVsYXRvci5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFdoZXRoZXIgb3Igbm90IHRoZSBzeXN0ZW0gaXMgZnVsbC5cclxuICAgICAqICEjemgg5Y+R5bCE5Zmo5Lit57KS5a2Q5piv5ZCm5aSn5LqO562J5LqO6K6+572u55qE5oC757KS5a2Q5pWw6YeP44CCXHJcbiAgICAgKiBAbWV0aG9kIGlzRnVsbFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNGdWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhcnRpY2xlQ291bnQgPj0gdGhpcy50b3RhbFBhcnRpY2xlcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIGEgbmV3IHRleHR1cmUgd2l0aCBhIHJlY3QuIFRoZSByZWN0IGlzIGluIHRleHR1cmUgcG9zaXRpb24gYW5kIHNpemUuXHJcbiAgICAgKiBQbGVhc2UgdXNlIHNwcml0ZUZyYW1lIHByb3BlcnR5IGluc3RlYWQsIHRoaXMgZnVuY3Rpb24gaXMgZGVwcmVjYXRlZCBzaW5jZSB2MS45XHJcbiAgICAgKiAhI3poIOiuvue9ruS4gOW8oOaWsOi0tOWbvuWSjOWFs+iBlOeahOefqeW9ouOAglxyXG4gICAgICog6K+355u05o6l6K6+572uIHNwcml0ZUZyYW1lIOWxnuaAp++8jOi/meS4quWHveaVsOS7jiB2MS45IOeJiOacrOW8gOWni+W3sue7j+iiq+W6n+W8g1xyXG4gICAgICogQG1ldGhvZCBzZXRUZXh0dXJlV2l0aFJlY3RcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RcclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxLjlcclxuICAgICAqL1xyXG4gICAgc2V0VGV4dHVyZVdpdGhSZWN0OiBmdW5jdGlvbiAodGV4dHVyZSwgcmVjdCkge1xyXG4gICAgICAgIGlmICh0ZXh0dXJlIGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSwgcmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBQUklWQVRFIE1FVEhPRFNcclxuXHJcbiAgICBfYXBwbHlGaWxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGZpbGUgPSB0aGlzLl9maWxlO1xyXG4gICAgICAgIGlmIChmaWxlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKGZpbGUsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIgfHwgIWZpbGUuX25hdGl2ZUFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg2MDI5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9wbGlzdEZpbGUgPSBmaWxlLm5hdGl2ZVVybDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9jdXN0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNEaWZmRnJhbWUgPSBzZWxmLl9zcHJpdGVGcmFtZSAhPT0gZmlsZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEaWZmRnJhbWUpIHNlbGYuc3ByaXRlRnJhbWUgPSBmaWxlLnNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2luaXRXaXRoRGljdGlvbmFyeShmaWxlLl9uYXRpdmVBc3NldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghc2VsZi5fc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZS5zcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZUZyYW1lID0gZmlsZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5fY3VzdG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2luaXRUZXh0dXJlV2l0aERpY3Rpb25hcnkoZmlsZS5fbmF0aXZlQXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzZWxmLl9yZW5kZXJTcHJpdGVGcmFtZSAmJiBzZWxmLl9zcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2FwcGx5U3ByaXRlRnJhbWUoc2VsZi5zcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRUZXh0dXJlV2l0aERpY3Rpb25hcnk6IGZ1bmN0aW9uIChkaWN0KSB7XHJcbiAgICAgICAgbGV0IGltZ1BhdGggPSBjYy5wYXRoLmNoYW5nZUJhc2VuYW1lKHRoaXMuX3BsaXN0RmlsZSwgZGljdFtcInRleHR1cmVGaWxlTmFtZVwiXSB8fCAnJyk7XHJcbiAgICAgICAgLy8gdGV4dHVyZVxyXG4gICAgICAgIGlmIChkaWN0W1widGV4dHVyZUZpbGVOYW1lXCJdKSB7XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBnZXQgdGhlIHRleHR1cmUgZnJvbSB0aGUgY2FjaGVcclxuICAgICAgICAgICAgdGV4dHVyZVV0aWwubG9hZEltYWdlKGltZ1BhdGgsIGZ1bmN0aW9uIChlcnJvciwgdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGljdFtcInRleHR1cmVGaWxlTmFtZVwiXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5KGRpY3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5hZGQoaW1nUGF0aCwgdGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaWN0W1widGV4dHVyZUltYWdlRGF0YVwiXSkge1xyXG4gICAgICAgICAgICBsZXQgdGV4dHVyZURhdGEgPSBkaWN0W1widGV4dHVyZUltYWdlRGF0YVwiXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlRGF0YSAmJiB0ZXh0dXJlRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4ID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQoaW1nUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghdGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IGNvZGVjLnVuemlwQmFzZTY0QXNBcnJheSh0ZXh0dXJlRGF0YSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDYwMzAsIHRoaXMuX2ZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWFnZUZvcm1hdCA9IGdldEltYWdlRm9ybWF0QnlEYXRhKGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5USUZGICYmIGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDYwMzEsIHRoaXMuX2ZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYW52YXNPYmogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlRm9ybWF0ID09PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXlQbmdPYmogPSBuZXcgUE5HUmVhZGVyKGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG15UG5nT2JqLnJlbmRlcihjYW52YXNPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpZmZSZWFkZXIucGFyc2VUSUZGKGJ1ZmZlcixjYW52YXNPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0ZXggPSB0ZXh0dXJlVXRpbC5jYWNoZUltYWdlKGltZ1BhdGgsIGNhbnZhc09iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghdGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDMyLCB0aGlzLl9maWxlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogVXNlIGNjLmFzc2V0TWFuYWdlciB0byBsb2FkIGFzeW5jaHJvbm91c2x5IHRoZSBTcHJpdGVGcmFtZSBvYmplY3QsIGF2b2lkIHVzaW5nIHRleHR1cmVVdGlsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHBhcnNpbmcgcHJvY2Vzc1xyXG4gICAgX2luaXRXaXRoRGljdGlvbmFyeTogZnVuY3Rpb24gKGRpY3QpIHtcclxuICAgICAgICB0aGlzLnRvdGFsUGFydGljbGVzID0gcGFyc2VJbnQoZGljdFtcIm1heFBhcnRpY2xlc1wiXSB8fCAwKTtcclxuXHJcbiAgICAgICAgLy8gbGlmZSBzcGFuXHJcbiAgICAgICAgdGhpcy5saWZlID0gcGFyc2VGbG9hdChkaWN0W1wicGFydGljbGVMaWZlc3BhblwiXSB8fCAwKTtcclxuICAgICAgICB0aGlzLmxpZmVWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJwYXJ0aWNsZUxpZmVzcGFuVmFyaWFuY2VcIl0gfHwgMCk7XHJcblxyXG4gICAgICAgIC8vIGVtaXNzaW9uIFJhdGVcclxuICAgICAgICBsZXQgX3RlbXBFbWlzc2lvblJhdGUgPSBkaWN0W1wiZW1pc3Npb25SYXRlXCJdO1xyXG4gICAgICAgIGlmIChfdGVtcEVtaXNzaW9uUmF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXNzaW9uUmF0ZSA9IF90ZW1wRW1pc3Npb25SYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbWlzc2lvblJhdGUgPSBNYXRoLm1pbih0aGlzLnRvdGFsUGFydGljbGVzIC8gdGhpcy5saWZlLCBOdW1iZXIuTUFYX1ZBTFVFKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGR1cmF0aW9uXHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IHBhcnNlRmxvYXQoZGljdFtcImR1cmF0aW9uXCJdIHx8IDApO1xyXG5cclxuICAgICAgICAvLyBibGVuZCBmdW5jdGlvblxyXG4gICAgICAgIHRoaXMuc3JjQmxlbmRGYWN0b3IgPSBwYXJzZUludChkaWN0W1wiYmxlbmRGdW5jU291cmNlXCJdIHx8IG1hY3JvLlNSQ19BTFBIQSk7XHJcbiAgICAgICAgdGhpcy5kc3RCbGVuZEZhY3RvciA9IHBhcnNlSW50KGRpY3RbXCJibGVuZEZ1bmNEZXN0aW5hdGlvblwiXSB8fCBtYWNyby5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuXHJcbiAgICAgICAgLy8gY29sb3JcclxuICAgICAgICBsZXQgbG9jU3RhcnRDb2xvciA9IHRoaXMuX3N0YXJ0Q29sb3I7XHJcbiAgICAgICAgbG9jU3RhcnRDb2xvci5yID0gcGFyc2VGbG9hdChkaWN0W1wic3RhcnRDb2xvclJlZFwiXSB8fCAwKSAqIDI1NTtcclxuICAgICAgICBsb2NTdGFydENvbG9yLmcgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yR3JlZW5cIl0gfHwgMCkgKiAyNTU7XHJcbiAgICAgICAgbG9jU3RhcnRDb2xvci5iID0gcGFyc2VGbG9hdChkaWN0W1wic3RhcnRDb2xvckJsdWVcIl0gfHwgMCkgKiAyNTU7XHJcbiAgICAgICAgbG9jU3RhcnRDb2xvci5hID0gcGFyc2VGbG9hdChkaWN0W1wic3RhcnRDb2xvckFscGhhXCJdIHx8IDApICogMjU1O1xyXG5cclxuICAgICAgICBsZXQgbG9jU3RhcnRDb2xvclZhciA9IHRoaXMuX3N0YXJ0Q29sb3JWYXI7XHJcbiAgICAgICAgbG9jU3RhcnRDb2xvclZhci5yID0gcGFyc2VGbG9hdChkaWN0W1wic3RhcnRDb2xvclZhcmlhbmNlUmVkXCJdIHx8IDApICogMjU1O1xyXG4gICAgICAgIGxvY1N0YXJ0Q29sb3JWYXIuZyA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xyXG4gICAgICAgIGxvY1N0YXJ0Q29sb3JWYXIuYiA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JWYXJpYW5jZUJsdWVcIl0gfHwgMCkgKiAyNTU7XHJcbiAgICAgICAgbG9jU3RhcnRDb2xvclZhci5hID0gcGFyc2VGbG9hdChkaWN0W1wic3RhcnRDb2xvclZhcmlhbmNlQWxwaGFcIl0gfHwgMCkgKiAyNTU7XHJcblxyXG4gICAgICAgIGxldCBsb2NFbmRDb2xvciA9IHRoaXMuX2VuZENvbG9yO1xyXG4gICAgICAgIGxvY0VuZENvbG9yLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclJlZFwiXSB8fCAwKSAqIDI1NTtcclxuICAgICAgICBsb2NFbmRDb2xvci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JHcmVlblwiXSB8fCAwKSAqIDI1NTtcclxuICAgICAgICBsb2NFbmRDb2xvci5iID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JCbHVlXCJdIHx8IDApICogMjU1O1xyXG4gICAgICAgIGxvY0VuZENvbG9yLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvckFscGhhXCJdIHx8IDApICogMjU1O1xyXG5cclxuICAgICAgICBsZXQgbG9jRW5kQ29sb3JWYXIgPSB0aGlzLl9lbmRDb2xvclZhcjtcclxuICAgICAgICBsb2NFbmRDb2xvclZhci5yID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZVJlZFwiXSB8fCAwKSAqIDI1NTtcclxuICAgICAgICBsb2NFbmRDb2xvclZhci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xyXG4gICAgICAgIGxvY0VuZENvbG9yVmFyLmIgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclZhcmlhbmNlQmx1ZVwiXSB8fCAwKSAqIDI1NTtcclxuICAgICAgICBsb2NFbmRDb2xvclZhci5hID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUFscGhhXCJdIHx8IDApICogMjU1O1xyXG5cclxuICAgICAgICAvLyBwYXJ0aWNsZSBzaXplXHJcbiAgICAgICAgdGhpcy5zdGFydFNpemUgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydFBhcnRpY2xlU2l6ZVwiXSB8fCAwKTtcclxuICAgICAgICB0aGlzLnN0YXJ0U2l6ZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0UGFydGljbGVTaXplVmFyaWFuY2VcIl0gfHwgMCk7XHJcbiAgICAgICAgdGhpcy5lbmRTaXplID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoUGFydGljbGVTaXplXCJdIHx8IDApO1xyXG4gICAgICAgIHRoaXMuZW5kU2l6ZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaFBhcnRpY2xlU2l6ZVZhcmlhbmNlXCJdIHx8IDApO1xyXG5cclxuICAgICAgICAvLyBwb3NpdGlvblxyXG4gICAgICAgIC8vIE1ha2UgZW1wdHkgcG9zaXRpb25UeXBlIHZhbHVlIGFuZCBvbGQgdmVyc2lvbiBjb21wYXRpYmxlXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvblR5cGUgPSBwYXJzZUZsb2F0KGRpY3RbJ3Bvc2l0aW9uVHlwZSddICE9PSB1bmRlZmluZWQgPyBkaWN0Wydwb3NpdGlvblR5cGUnXSA6IFBvc2l0aW9uVHlwZS5SRUxBVElWRSk7XHJcbiAgICAgICAgLy8gZm9yXHJcbiAgICAgICAgdGhpcy5zb3VyY2VQb3MueCA9IDA7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VQb3MueSA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3NWYXIueCA9IHBhcnNlRmxvYXQoZGljdFtcInNvdXJjZVBvc2l0aW9uVmFyaWFuY2V4XCJdIHx8IDApO1xyXG4gICAgICAgIHRoaXMucG9zVmFyLnkgPSBwYXJzZUZsb2F0KGRpY3RbXCJzb3VyY2VQb3NpdGlvblZhcmlhbmNleVwiXSB8fCAwKTtcclxuXHJcbiAgICAgICAgLy8gYW5nbGVcclxuICAgICAgICB0aGlzLmFuZ2xlID0gcGFyc2VGbG9hdChkaWN0W1wiYW5nbGVcIl0gfHwgMCk7XHJcbiAgICAgICAgdGhpcy5hbmdsZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcImFuZ2xlVmFyaWFuY2VcIl0gfHwgMCk7XHJcblxyXG4gICAgICAgIC8vIFNwaW5uaW5nXHJcbiAgICAgICAgdGhpcy5zdGFydFNwaW4gPSBwYXJzZUZsb2F0KGRpY3RbXCJyb3RhdGlvblN0YXJ0XCJdIHx8IDApO1xyXG4gICAgICAgIHRoaXMuc3RhcnRTcGluVmFyID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRpb25TdGFydFZhcmlhbmNlXCJdIHx8IDApO1xyXG4gICAgICAgIHRoaXMuZW5kU3BpbiA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uRW5kXCJdIHx8IDApO1xyXG4gICAgICAgIHRoaXMuZW5kU3BpblZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uRW5kVmFyaWFuY2VcIl0gfHwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdHRlck1vZGUgPSBwYXJzZUludChkaWN0W1wiZW1pdHRlclR5cGVcIl0gfHwgRW1pdHRlck1vZGUuR1JBVklUWSk7XHJcblxyXG4gICAgICAgIC8vIE1vZGUgQTogR3Jhdml0eSArIHRhbmdlbnRpYWwgYWNjZWwgKyByYWRpYWwgYWNjZWxcclxuICAgICAgICBpZiAodGhpcy5lbWl0dGVyTW9kZSA9PT0gRW1pdHRlck1vZGUuR1JBVklUWSkge1xyXG4gICAgICAgICAgICAvLyBncmF2aXR5XHJcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eS54ID0gcGFyc2VGbG9hdChkaWN0W1wiZ3Jhdml0eXhcIl0gfHwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ3Jhdml0eS55ID0gcGFyc2VGbG9hdChkaWN0W1wiZ3Jhdml0eXlcIl0gfHwgMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBzcGVlZFxyXG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gcGFyc2VGbG9hdChkaWN0W1wic3BlZWRcIl0gfHwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3BlZWRWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzcGVlZFZhcmlhbmNlXCJdIHx8IDApO1xyXG5cclxuICAgICAgICAgICAgLy8gcmFkaWFsIGFjY2VsZXJhdGlvblxyXG4gICAgICAgICAgICB0aGlzLnJhZGlhbEFjY2VsID0gcGFyc2VGbG9hdChkaWN0W1wicmFkaWFsQWNjZWxlcmF0aW9uXCJdIHx8IDApO1xyXG4gICAgICAgICAgICB0aGlzLnJhZGlhbEFjY2VsVmFyID0gcGFyc2VGbG9hdChkaWN0W1wicmFkaWFsQWNjZWxWYXJpYW5jZVwiXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMudGFuZ2VudGlhbEFjY2VsID0gcGFyc2VGbG9hdChkaWN0W1widGFuZ2VudGlhbEFjY2VsZXJhdGlvblwiXSB8fCAwKTtcclxuICAgICAgICAgICAgdGhpcy50YW5nZW50aWFsQWNjZWxWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJ0YW5nZW50aWFsQWNjZWxWYXJpYW5jZVwiXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJvdGF0aW9uIGlzIGRpclxyXG4gICAgICAgICAgICBsZXQgbG9jUm90YXRpb25Jc0RpciA9IGRpY3RbXCJyb3RhdGlvbklzRGlyXCJdIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIGlmIChsb2NSb3RhdGlvbklzRGlyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NSb3RhdGlvbklzRGlyID0gbG9jUm90YXRpb25Jc0Rpci50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uSXNEaXIgPSAobG9jUm90YXRpb25Jc0RpciA9PT0gXCJ0cnVlXCIgfHwgbG9jUm90YXRpb25Jc0RpciA9PT0gXCIxXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbklzRGlyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW1pdHRlck1vZGUgPT09IEVtaXR0ZXJNb2RlLlJBRElVUykge1xyXG4gICAgICAgICAgICAvLyBvciBNb2RlIEI6IHJhZGl1cyBtb3ZlbWVudFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UmFkaXVzID0gcGFyc2VGbG9hdChkaWN0W1wibWF4UmFkaXVzXCJdIHx8IDApO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UmFkaXVzVmFyID0gcGFyc2VGbG9hdChkaWN0W1wibWF4UmFkaXVzVmFyaWFuY2VcIl0gfHwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kUmFkaXVzID0gcGFyc2VGbG9hdChkaWN0W1wibWluUmFkaXVzXCJdIHx8IDApO1xyXG4gICAgICAgICAgICB0aGlzLmVuZFJhZGl1c1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcIm1pblJhZGl1c1ZhcmlhbmNlXCJdIHx8IDApO1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0ZVBlclMgPSBwYXJzZUZsb2F0KGRpY3RbXCJyb3RhdGVQZXJTZWNvbmRcIl0gfHwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRlUGVyU1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0ZVBlclNlY29uZFZhcmlhbmNlXCJdIHx8IDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCg2MDA5KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5pdFRleHR1cmVXaXRoRGljdGlvbmFyeShkaWN0KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcclxuICAgICAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX2dldFRleHR1cmUoKTtcclxuICAgICAgICBpZiAoIXRleHR1cmUgfHwgIXRleHR1cmUubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRleHR1cmVMb2FkZWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3NpbXVsYXRvci51cGRhdGVVVnModHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fc3luY0FzcGVjdCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XHJcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3luY0FzcGVjdCAoKSB7XHJcbiAgICAgICAgbGV0IGZyYW1lUmVjdCA9IHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lLl9yZWN0O1xyXG4gICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gZnJhbWVSZWN0LndpZHRoIC8gZnJhbWVSZWN0LmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgX2FwcGx5U3ByaXRlRnJhbWUgKCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lID0gdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUgfHwgdGhpcy5fc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uVGV4dHVyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUub25UZXh0dXJlTG9hZGVkKHRoaXMuX29uVGV4dHVyZUxvYWRlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRUZXh0dXJlICgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lICYmIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lLmdldFRleHR1cmUoKSkgfHwgdGhpcy5fdGV4dHVyZTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCB0aGlzLl9wb3NpdGlvblR5cGUgIT09IFBvc2l0aW9uVHlwZS5GUkVFKTtcclxuICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRoaXMuX2dldFRleHR1cmUoKSk7XHJcblxyXG4gICAgICAgIEJsZW5kRnVuYy5wcm90b3R5cGUuX3VwZGF0ZU1hdGVyaWFsLmNhbGwodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9maW5pc2hlZFNpbXVsYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZpZXcgJiYgdGhpcy5fZm9jdXNlZCAmJiAhdGhpcy5hY3RpdmUgJiYgIWNjLmVuZ2luZS5pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzZXRTeXN0ZW0oKTtcclxuICAgICAgICB0aGlzLnN0b3BTeXN0ZW0oKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5hdXRvUmVtb3ZlT25GaW5pc2ggJiYgdGhpcy5fc3RvcHBlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5QYXJ0aWNsZVN5c3RlbSA9IG1vZHVsZS5leHBvcnRzID0gUGFydGljbGVTeXN0ZW07XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==