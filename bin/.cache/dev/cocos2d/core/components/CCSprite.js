
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCSprite.js';
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
var misc = require('../utils/misc');

var NodeEvent = require('../CCNode').EventType;

var RenderComponent = require('./CCRenderComponent');

var BlendFunc = require('../utils/blend-func');
/**
 * !#en Enum for sprite type.
 * !#zh Sprite 类型
 * @enum Sprite.Type
 */


var SpriteType = cc.Enum({
  /**
   * !#en The simple type.
   * !#zh 普通类型
   * @property {Number} SIMPLE
   */
  SIMPLE: 0,

  /**
   * !#en The sliced type.
   * !#zh 切片（九宫格）类型
   * @property {Number} SLICED
   */
  SLICED: 1,

  /**
   * !#en The tiled type.
   * !#zh 平铺类型
   * @property {Number} TILED
   */
  TILED: 2,

  /**
   * !#en The filled type.
   * !#zh 填充类型
   * @property {Number} FILLED
   */
  FILLED: 3,

  /**
   * !#en The mesh type.
   * !#zh 以 Mesh 三角形组成的类型
   * @property {Number} MESH
   */
  MESH: 4
});
/**
 * !#en Enum for fill type.
 * !#zh 填充类型
 * @enum Sprite.FillType
 */

var FillType = cc.Enum({
  /**
   * !#en The horizontal fill.
   * !#zh 水平方向填充
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 0,

  /**
   * !#en The vertical fill.
   * !#zh 垂直方向填充
   * @property {Number} VERTICAL
   */
  VERTICAL: 1,

  /**
   * !#en The radial fill.
   * !#zh 径向填充
   * @property {Number} RADIAL
   */
  RADIAL: 2
});
/**
 * !#en Sprite Size can track trimmed size, raw size or none.
 * !#zh 精灵尺寸调整模式
 * @enum Sprite.SizeMode
 */

var SizeMode = cc.Enum({
  /**
   * !#en Use the customized node size.
   * !#zh 使用节点预设的尺寸
   * @property {Number} CUSTOM
   */
  CUSTOM: 0,

  /**
   * !#en Match the trimmed size of the sprite frame automatically.
   * !#zh 自动适配为精灵裁剪后的尺寸
   * @property {Number} TRIMMED
   */
  TRIMMED: 1,

  /**
   * !#en Match the raw size of the sprite frame automatically.
   * !#zh 自动适配为精灵原图尺寸
   * @property {Number} RAW
   */
  RAW: 2
});
/**
 * !#en Sprite state can choice the normal or grayscale.
 * !#zh 精灵颜色通道模式。
 * @enum Sprite.State
 * @deprecated
 */

var State = cc.Enum({
  /**
   * !#en The normal state
   * !#zh 正常状态
   * @property {Number} NORMAL
   */
  NORMAL: 0,

  /**
   * !#en The gray state, all color will be modified to grayscale value.
   * !#zh 灰色状态，所有颜色会被转换成灰度值
   * @property {Number} GRAY
   */
  GRAY: 1
});
/**
 * !#en Renders a sprite in the scene.
 * !#zh 该组件用于在场景中渲染精灵。
 * @class Sprite
 * @extends RenderComponent
 * @uses BlendFunc
 * @example
 *  // Create a new node and add sprite components.
 *  var node = new cc.Node("New Sprite");
 *  var sprite = node.addComponent(cc.Sprite);
 *  node.parent = this.node;
 */

var Sprite = cc.Class({
  name: 'cc.Sprite',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Sprite',
    help: 'i18n:COMPONENT.help_url.sprite',
    inspector: 'packages://inspector/inspectors/comps/sprite.js'
  },
  properties: {
    _spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },
    _type: SpriteType.SIMPLE,
    _sizeMode: SizeMode.TRIMMED,
    _fillType: 0,
    _fillCenter: cc.v2(0, 0),
    _fillStart: 0,
    _fillRange: 0,
    _isTrimmedMode: true,
    _atlas: {
      "default": null,
      type: cc.SpriteAtlas,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.atlas',
      editorOnly: true,
      visible: true,
      animatable: false
    },

    /**
     * !#en The sprite frame of the sprite.
     * !#zh 精灵的精灵帧
     * @property spriteFrame
     * @type {SpriteFrame}
     * @example
     * sprite.spriteFrame = newSpriteFrame;
     */
    spriteFrame: {
      get: function get() {
        return this._spriteFrame;
      },
      set: function set(value, force) {
        var lastSprite = this._spriteFrame;

        if (CC_EDITOR) {
          if (!force && (lastSprite && lastSprite._uuid) === (value && value._uuid)) {
            return;
          }
        } else {
          if (lastSprite === value) {
            return;
          }
        }

        this._spriteFrame = value;

        this._applySpriteFrame(lastSprite);

        if (CC_EDITOR) {
          this.node.emit('spriteframe-changed', this);
        }
      },
      type: cc.SpriteFrame
    },

    /**
     * !#en The sprite render type.
     * !#zh 精灵渲染类型
     * @property type
     * @type {Sprite.Type}
     * @example
     * sprite.type = cc.Sprite.Type.SIMPLE;
     */
    type: {
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        if (this._type !== value) {
          this._type = value;
          this.setVertsDirty();

          this._resetAssembler();
        }
      },
      type: SpriteType,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.type'
    },

    /**
     * !#en
     * The fill type, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 精灵填充类型，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillType
     * @type {Sprite.FillType}
     * @example
     * sprite.fillType = cc.Sprite.FillType.HORIZONTAL;
     */
    fillType: {
      get: function get() {
        return this._fillType;
      },
      set: function set(value) {
        if (value !== this._fillType) {
          this._fillType = value;
          this.setVertsDirty();

          this._resetAssembler();
        }
      },
      type: FillType,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_type'
    },

    /**
     * !#en
     * The fill Center, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充中心点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillCenter
     * @type {Vec2}
     * @example
     * sprite.fillCenter = new cc.Vec2(0, 0);
     */
    fillCenter: {
      get: function get() {
        return this._fillCenter;
      },
      set: function set(value) {
        this._fillCenter.x = value.x;
        this._fillCenter.y = value.y;

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_center'
    },

    /**
     * !#en
     * The fill Start, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充起始点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillStart
     * @type {Number}
     * @example
     * // -1 To 1 between the numbers
     * sprite.fillStart = 0.5;
     */
    fillStart: {
      get: function get() {
        return this._fillStart;
      },
      set: function set(value) {
        this._fillStart = misc.clampf(value, -1, 1);

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_start'
    },

    /**
     * !#en
     * The fill Range, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充范围，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillRange
     * @type {Number}
     * @example
     * // -1 To 1 between the numbers
     * sprite.fillRange = 1;
     */
    fillRange: {
      get: function get() {
        return this._fillRange;
      },
      set: function set(value) {
        this._fillRange = misc.clampf(value, -1, 1);

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_range'
    },

    /**
     * !#en specify the frame is trimmed or not.
     * !#zh 是否使用裁剪模式
     * @property trim
     * @type {Boolean}
     * @example
     * sprite.trim = true;
     */
    trim: {
      get: function get() {
        return this._isTrimmedMode;
      },
      set: function set(value) {
        if (this._isTrimmedMode !== value) {
          this._isTrimmedMode = value;

          if (this._type === SpriteType.SIMPLE || this._type === SpriteType.MESH) {
            this.setVertsDirty();
          }
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.trim'
    },

    /**
     * !#en specify the size tracing mode.
     * !#zh 精灵尺寸调整模式
     * @property sizeMode
     * @type {Sprite.SizeMode}
     * @example
     * sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
     */
    sizeMode: {
      get: function get() {
        return this._sizeMode;
      },
      set: function set(value) {
        this._sizeMode = value;

        if (value !== SizeMode.CUSTOM) {
          this._applySpriteSize();
        }
      },
      animatable: false,
      type: SizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.size_mode'
    }
  },
  statics: {
    FillType: FillType,
    Type: SpriteType,
    SizeMode: SizeMode,
    State: State
  },
  setVisible: function setVisible(visible) {
    this.enabled = visible;
  },

  /**
   * Change the state of sprite.
   * @method setState
   * @see `Sprite.State`
   * @param state {Sprite.State} NORMAL or GRAY State.
   * @deprecated
   */
  setState: function setState() {},

  /**
   * Gets the current state.
   * @method getState
   * @see `Sprite.State`
   * @return {Sprite.State}
   * @deprecated
   */
  getState: function getState() {},
  __preload: function __preload() {
    this._super();

    CC_EDITOR && this.node.on(NodeEvent.SIZE_CHANGED, this._resizedInEditor, this);

    this._applySpriteFrame();
  },
  onEnable: function onEnable() {
    this._super();

    this._spriteFrame && this._spriteFrame.ensureLoadTexture();
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
  },
  _updateMaterial: function _updateMaterial() {
    var texture = null;

    if (this._spriteFrame) {
      texture = this._spriteFrame.getTexture();
    } // make sure material is belong to self.


    var material = this.getMaterial(0);

    if (material) {
      if (material.getDefine('USE_TEXTURE') !== undefined) {
        material.define('USE_TEXTURE', true);
      }

      if (material.getProperty('texture') !== texture) {
        material.setProperty('texture', texture);
      }
    }

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _applyAtlas: CC_EDITOR && function (spriteFrame) {
    // Set atlas
    if (spriteFrame && spriteFrame._atlasUuid) {
      var self = this;
      cc.assetManager.loadAny(spriteFrame._atlasUuid, function (err, asset) {
        self._atlas = asset;
      });
    } else {
      this._atlas = null;
    }
  },
  _validateRender: function _validateRender() {
    var spriteFrame = this._spriteFrame;

    if (this._materials[0] && spriteFrame && spriteFrame.textureLoaded()) {
      return;
    }

    this.disableRender();
  },
  _applySpriteSize: function _applySpriteSize() {
    if (!this._spriteFrame || !this.isValid) return;

    if (SizeMode.RAW === this._sizeMode) {
      var size = this._spriteFrame._originalSize;
      this.node.setContentSize(size);
    } else if (SizeMode.TRIMMED === this._sizeMode) {
      var rect = this._spriteFrame._rect;
      this.node.setContentSize(rect.width, rect.height);
    }

    this.setVertsDirty();
  },
  _applySpriteFrame: function _applySpriteFrame(oldFrame) {
    if (!this.isValid) return;
    var oldTexture = oldFrame && oldFrame.getTexture();

    if (oldTexture && !oldTexture.loaded) {
      oldFrame.off('load', this._applySpriteSize, this);
    }

    this._updateMaterial();

    var spriteFrame = this._spriteFrame;

    if (spriteFrame) {
      var newTexture = spriteFrame.getTexture();

      if (newTexture && newTexture.loaded) {
        this._applySpriteSize();
      } else {
        this.disableRender();
        spriteFrame.once('load', this._applySpriteSize, this);
      }
    } else {
      this.disableRender();
    }

    if (CC_EDITOR) {
      // Set atlas
      this._applyAtlas(spriteFrame);
    }
  }
});

if (CC_EDITOR) {
  Sprite.prototype._resizedInEditor = function () {
    if (this._spriteFrame) {
      var actualSize = this.node.getContentSize();
      var expectedW = actualSize.width;
      var expectedH = actualSize.height;

      if (this._sizeMode === SizeMode.RAW) {
        var size = this._spriteFrame.getOriginalSize();

        expectedW = size.width;
        expectedH = size.height;
      } else if (this._sizeMode === SizeMode.TRIMMED) {
        var rect = this._spriteFrame.getRect();

        expectedW = rect.width;
        expectedH = rect.height;
      }

      if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
        this._sizeMode = SizeMode.CUSTOM;
      }
    }
  }; // override onDestroy


  Sprite.prototype.__superOnDestroy = cc.Component.prototype.onDestroy;

  Sprite.prototype.onDestroy = function () {
    if (this.__superOnDestroy) this.__superOnDestroy();
    this.node.off(NodeEvent.SIZE_CHANGED, this._resizedInEditor, this);
  };
}

cc.Sprite = module.exports = Sprite;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDU3ByaXRlLmpzIl0sIm5hbWVzIjpbIm1pc2MiLCJyZXF1aXJlIiwiTm9kZUV2ZW50IiwiRXZlbnRUeXBlIiwiUmVuZGVyQ29tcG9uZW50IiwiQmxlbmRGdW5jIiwiU3ByaXRlVHlwZSIsImNjIiwiRW51bSIsIlNJTVBMRSIsIlNMSUNFRCIsIlRJTEVEIiwiRklMTEVEIiwiTUVTSCIsIkZpbGxUeXBlIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiUkFESUFMIiwiU2l6ZU1vZGUiLCJDVVNUT00iLCJUUklNTUVEIiwiUkFXIiwiU3RhdGUiLCJOT1JNQUwiLCJHUkFZIiwiU3ByaXRlIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJwcm9wZXJ0aWVzIiwiX3Nwcml0ZUZyYW1lIiwidHlwZSIsIlNwcml0ZUZyYW1lIiwiX3R5cGUiLCJfc2l6ZU1vZGUiLCJfZmlsbFR5cGUiLCJfZmlsbENlbnRlciIsInYyIiwiX2ZpbGxTdGFydCIsIl9maWxsUmFuZ2UiLCJfaXNUcmltbWVkTW9kZSIsIl9hdGxhcyIsIlNwcml0ZUF0bGFzIiwidG9vbHRpcCIsIkNDX0RFViIsImVkaXRvck9ubHkiLCJ2aXNpYmxlIiwiYW5pbWF0YWJsZSIsInNwcml0ZUZyYW1lIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJmb3JjZSIsImxhc3RTcHJpdGUiLCJfdXVpZCIsIl9hcHBseVNwcml0ZUZyYW1lIiwibm9kZSIsImVtaXQiLCJzZXRWZXJ0c0RpcnR5IiwiX3Jlc2V0QXNzZW1ibGVyIiwiZmlsbFR5cGUiLCJmaWxsQ2VudGVyIiwieCIsInkiLCJmaWxsU3RhcnQiLCJjbGFtcGYiLCJmaWxsUmFuZ2UiLCJ0cmltIiwic2l6ZU1vZGUiLCJfYXBwbHlTcHJpdGVTaXplIiwic3RhdGljcyIsIlR5cGUiLCJzZXRWaXNpYmxlIiwiZW5hYmxlZCIsInNldFN0YXRlIiwiZ2V0U3RhdGUiLCJfX3ByZWxvYWQiLCJfc3VwZXIiLCJvbiIsIlNJWkVfQ0hBTkdFRCIsIl9yZXNpemVkSW5FZGl0b3IiLCJvbkVuYWJsZSIsImVuc3VyZUxvYWRUZXh0dXJlIiwiTm9kZSIsIkFOQ0hPUl9DSEFOR0VEIiwib25EaXNhYmxlIiwib2ZmIiwiX3VwZGF0ZU1hdGVyaWFsIiwidGV4dHVyZSIsImdldFRleHR1cmUiLCJtYXRlcmlhbCIsImdldE1hdGVyaWFsIiwiZ2V0RGVmaW5lIiwidW5kZWZpbmVkIiwiZGVmaW5lIiwiZ2V0UHJvcGVydHkiLCJzZXRQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNhbGwiLCJfYXBwbHlBdGxhcyIsIl9hdGxhc1V1aWQiLCJzZWxmIiwiYXNzZXRNYW5hZ2VyIiwibG9hZEFueSIsImVyciIsImFzc2V0IiwiX3ZhbGlkYXRlUmVuZGVyIiwiX21hdGVyaWFscyIsInRleHR1cmVMb2FkZWQiLCJkaXNhYmxlUmVuZGVyIiwiaXNWYWxpZCIsInNpemUiLCJfb3JpZ2luYWxTaXplIiwic2V0Q29udGVudFNpemUiLCJyZWN0IiwiX3JlY3QiLCJ3aWR0aCIsImhlaWdodCIsIm9sZEZyYW1lIiwib2xkVGV4dHVyZSIsImxvYWRlZCIsIm5ld1RleHR1cmUiLCJvbmNlIiwiYWN0dWFsU2l6ZSIsImdldENvbnRlbnRTaXplIiwiZXhwZWN0ZWRXIiwiZXhwZWN0ZWRIIiwiZ2V0T3JpZ2luYWxTaXplIiwiZ2V0UmVjdCIsIl9fc3VwZXJPbkRlc3Ryb3kiLCJDb21wb25lbnQiLCJvbkRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FB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TUFBTSxDQUFDQyxPQUFQLEdBQWlCakgsTUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IG1pc2MgPSByZXF1aXJlKCcuLi91dGlscy9taXNjJyk7XG5jb25zdCBOb2RlRXZlbnQgPSByZXF1aXJlKCcuLi9DQ05vZGUnKS5FdmVudFR5cGU7XG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL0NDUmVuZGVyQ29tcG9uZW50Jyk7XG5jb25zdCBCbGVuZEZ1bmMgPSByZXF1aXJlKCcuLi91dGlscy9ibGVuZC1mdW5jJyk7XG5cblxuLyoqXG4gKiAhI2VuIEVudW0gZm9yIHNwcml0ZSB0eXBlLlxuICogISN6aCBTcHJpdGUg57G75Z6LXG4gKiBAZW51bSBTcHJpdGUuVHlwZVxuICovXG52YXIgU3ByaXRlVHlwZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNpbXBsZSB0eXBlLlxuICAgICAqICEjemgg5pmu6YCa57G75Z6LXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNJTVBMRVxuICAgICAqL1xuICAgIFNJTVBMRTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzbGljZWQgdHlwZS5cbiAgICAgKiAhI3poIOWIh+eJh++8iOS5neWuq+agvO+8ieexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTTElDRURcbiAgICAgKi9cbiAgICBTTElDRUQ6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdGlsZWQgdHlwZS5cbiAgICAgKiAhI3poIOW5s+mTuuexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUSUxFRFxuICAgICAqL1xuICAgIFRJTEVEOiAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGZpbGxlZCB0eXBlLlxuICAgICAqICEjemgg5aGr5YWF57G75Z6LXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZJTExFRFxuICAgICAqL1xuICAgIEZJTExFRDogMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBtZXNoIHR5cGUuXG4gICAgICogISN6aCDku6UgTWVzaCDkuInop5LlvaLnu4TmiJDnmoTnsbvlnotcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTUVTSFxuICAgICAqL1xuICAgIE1FU0g6IDRcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgZmlsbCB0eXBlLlxuICogISN6aCDloavlhYXnsbvlnotcbiAqIEBlbnVtIFNwcml0ZS5GaWxsVHlwZVxuICovXG52YXIgRmlsbFR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBob3Jpem9udGFsIGZpbGwuXG4gICAgICogISN6aCDmsLTlubPmlrnlkJHloavlhYVcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSE9SSVpPTlRBTFxuICAgICAqL1xuICAgIEhPUklaT05UQUw6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgdmVydGljYWwgZmlsbC5cbiAgICAgKiAhI3poIOWeguebtOaWueWQkeWhq+WFhVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJUSUNBTFxuICAgICAqL1xuICAgIFZFUlRJQ0FMOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHJhZGlhbCBmaWxsLlxuICAgICAqICEjemgg5b6E5ZCR5aGr5YWFXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJBRElBTFxuICAgICAqL1xuICAgIFJBRElBTDoyLFxufSk7XG5cbi8qKlxuICogISNlbiBTcHJpdGUgU2l6ZSBjYW4gdHJhY2sgdHJpbW1lZCBzaXplLCByYXcgc2l6ZSBvciBub25lLlxuICogISN6aCDnsr7ngbXlsLrlr7josIPmlbTmqKHlvI9cbiAqIEBlbnVtIFNwcml0ZS5TaXplTW9kZVxuICovXG52YXIgU2l6ZU1vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFVzZSB0aGUgY3VzdG9taXplZCBub2RlIHNpemUuXG4gICAgICogISN6aCDkvb/nlKjoioLngrnpooTorr7nmoTlsLrlr7hcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ1VTVE9NXG4gICAgICovXG4gICAgQ1VTVE9NOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gTWF0Y2ggdGhlIHRyaW1tZWQgc2l6ZSBvZiB0aGUgc3ByaXRlIGZyYW1lIGF1dG9tYXRpY2FsbHkuXG4gICAgICogISN6aCDoh6rliqjpgILphY3kuLrnsr7ngbXoo4HliarlkI7nmoTlsLrlr7hcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVFJJTU1FRFxuICAgICAqL1xuICAgIFRSSU1NRUQ6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBNYXRjaCB0aGUgcmF3IHNpemUgb2YgdGhlIHNwcml0ZSBmcmFtZSBhdXRvbWF0aWNhbGx5LlxuICAgICAqICEjemgg6Ieq5Yqo6YCC6YWN5Li657K+54G15Y6f5Zu+5bC65a+4XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJBV1xuICAgICAqL1xuICAgIFJBVzogMlxufSk7XG4vKipcbiAqICEjZW4gU3ByaXRlIHN0YXRlIGNhbiBjaG9pY2UgdGhlIG5vcm1hbCBvciBncmF5c2NhbGUuXG4gKiAhI3poIOeyvueBteminOiJsumAmumBk+aooeW8j+OAglxuICogQGVudW0gU3ByaXRlLlN0YXRlXG4gKiBAZGVwcmVjYXRlZFxuICovXG52YXIgU3RhdGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBub3JtYWwgc3RhdGVcbiAgICAgKiAhI3poIOato+W4uOeKtuaAgVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT1JNQUxcbiAgICAgKi9cbiAgICBOT1JNQUw6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZ3JheSBzdGF0ZSwgYWxsIGNvbG9yIHdpbGwgYmUgbW9kaWZpZWQgdG8gZ3JheXNjYWxlIHZhbHVlLlxuICAgICAqICEjemgg54Gw6Imy54q25oCB77yM5omA5pyJ6aKc6Imy5Lya6KKr6L2s5o2i5oiQ54Gw5bqm5YC8XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEdSQVlcbiAgICAgKi9cbiAgICBHUkFZOiAxXG59KTtcblxuLyoqXG4gKiAhI2VuIFJlbmRlcnMgYSBzcHJpdGUgaW4gdGhlIHNjZW5lLlxuICogISN6aCDor6Xnu4Tku7bnlKjkuo7lnKjlnLrmma/kuK3muLLmn5Pnsr7ngbXjgIJcbiAqIEBjbGFzcyBTcHJpdGVcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICogQHVzZXMgQmxlbmRGdW5jXG4gKiBAZXhhbXBsZVxuICogIC8vIENyZWF0ZSBhIG5ldyBub2RlIGFuZCBhZGQgc3ByaXRlIGNvbXBvbmVudHMuXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBTcHJpdGVcIik7XG4gKiAgdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gKiAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gKi9cbnZhciBTcHJpdGUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNwcml0ZScsXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuICAgIG1peGluczogW0JsZW5kRnVuY10sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1Nwcml0ZScsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5zcHJpdGUnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3Nwcml0ZS5qcycsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3Nwcml0ZUZyYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgX3R5cGU6IFNwcml0ZVR5cGUuU0lNUExFLFxuICAgICAgICBfc2l6ZU1vZGU6IFNpemVNb2RlLlRSSU1NRUQsXG4gICAgICAgIF9maWxsVHlwZTogMCxcbiAgICAgICAgX2ZpbGxDZW50ZXI6IGNjLnYyKDAsMCksXG4gICAgICAgIF9maWxsU3RhcnQ6IDAsXG4gICAgICAgIF9maWxsUmFuZ2U6IDAsXG4gICAgICAgIF9pc1RyaW1tZWRNb2RlOiB0cnVlLFxuICAgICAgICBfYXRsYXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVBdGxhcyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLmF0bGFzJyxcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgc3ByaXRlIGZyYW1lIG9mIHRoZSBzcHJpdGUuXG4gICAgICAgICAqICEjemgg57K+54G155qE57K+54G15binXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzcHJpdGVGcmFtZVxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlRnJhbWV9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ld1Nwcml0ZUZyYW1lO1xuICAgICAgICAgKi9cbiAgICAgICAgc3ByaXRlRnJhbWU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUsIGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3RTcHJpdGUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm9yY2UgJiYgKChsYXN0U3ByaXRlICYmIGxhc3RTcHJpdGUuX3V1aWQpID09PSAodmFsdWUgJiYgdmFsdWUuX3V1aWQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFNwcml0ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVGcmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5U3ByaXRlRnJhbWUobGFzdFNwcml0ZSk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZW1pdCgnc3ByaXRlZnJhbWUtY2hhbmdlZCcsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgc3ByaXRlIHJlbmRlciB0eXBlLlxuICAgICAgICAgKiAhI3poIOeyvueBtea4suafk+exu+Wei1xuICAgICAgICAgKiBAcHJvcGVydHkgdHlwZVxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlLlR5cGV9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0lNUExFO1xuICAgICAgICAgKi9cbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IFNwcml0ZVR5cGUsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLnR5cGUnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBmaWxsIHR5cGUsIFRoaXMgd2lsbCBvbmx5IGhhdmUgYW55IGVmZmVjdCBpZiB0aGUgXCJ0eXBlXCIgaXMgc2V0IHRvIOKAnGNjLlNwcml0ZS5UeXBlLkZJTExFROKAnS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDnsr7ngbXloavlhYXnsbvlnovvvIzku4XmuLLmn5Pnsbvlnovorr7nva7kuLogY2MuU3ByaXRlLlR5cGUuRklMTEVEIOaXtuacieaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZmlsbFR5cGVcbiAgICAgICAgICogQHR5cGUge1Nwcml0ZS5GaWxsVHlwZX1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogc3ByaXRlLmZpbGxUeXBlID0gY2MuU3ByaXRlLkZpbGxUeXBlLkhPUklaT05UQUw7XG4gICAgICAgICAqL1xuICAgICAgICBmaWxsVHlwZSA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGxUeXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2ZpbGxUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxUeXBlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBGaWxsVHlwZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLmZpbGxfdHlwZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZmlsbCBDZW50ZXIsIFRoaXMgd2lsbCBvbmx5IGhhdmUgYW55IGVmZmVjdCBpZiB0aGUgXCJ0eXBlXCIgaXMgc2V0IHRvIOKAnGNjLlNwcml0ZS5UeXBlLkZJTExFROKAnS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDloavlhYXkuK3lv4PngrnvvIzku4XmuLLmn5Pnsbvlnovorr7nva7kuLogY2MuU3ByaXRlLlR5cGUuRklMTEVEIOaXtuacieaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZmlsbENlbnRlclxuICAgICAgICAgKiBAdHlwZSB7VmVjMn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogc3ByaXRlLmZpbGxDZW50ZXIgPSBuZXcgY2MuVmVjMigwLCAwKTtcbiAgICAgICAgICovXG4gICAgICAgIGZpbGxDZW50ZXI6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGxDZW50ZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxDZW50ZXIueCA9IHZhbHVlLng7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsbENlbnRlci55ID0gdmFsdWUueTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gU3ByaXRlVHlwZS5GSUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLmZpbGxfY2VudGVyJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZmlsbCBTdGFydCwgVGhpcyB3aWxsIG9ubHkgaGF2ZSBhbnkgZWZmZWN0IGlmIHRoZSBcInR5cGVcIiBpcyBzZXQgdG8g4oCcY2MuU3ByaXRlLlR5cGUuRklMTEVE4oCdLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWhq+WFhei1t+Wni+eCue+8jOS7hea4suafk+exu+Wei+iuvue9ruS4uiBjYy5TcHJpdGUuVHlwZS5GSUxMRUQg5pe25pyJ5pWI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBmaWxsU3RhcnRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogLy8gLTEgVG8gMSBiZXR3ZWVuIHRoZSBudW1iZXJzXG4gICAgICAgICAqIHNwcml0ZS5maWxsU3RhcnQgPSAwLjU7XG4gICAgICAgICAqL1xuICAgICAgICBmaWxsU3RhcnQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGxTdGFydDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsbFN0YXJ0ID0gbWlzYy5jbGFtcGYodmFsdWUsIC0xLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gU3ByaXRlVHlwZS5GSUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLmZpbGxfc3RhcnQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGZpbGwgUmFuZ2UsIFRoaXMgd2lsbCBvbmx5IGhhdmUgYW55IGVmZmVjdCBpZiB0aGUgXCJ0eXBlXCIgaXMgc2V0IHRvIOKAnGNjLlNwcml0ZS5UeXBlLkZJTExFROKAnS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDloavlhYXojIPlm7TvvIzku4XmuLLmn5Pnsbvlnovorr7nva7kuLogY2MuU3ByaXRlLlR5cGUuRklMTEVEIOaXtuacieaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZmlsbFJhbmdlXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIC8vIC0xIFRvIDEgYmV0d2VlbiB0aGUgbnVtYmVyc1xuICAgICAgICAgKiBzcHJpdGUuZmlsbFJhbmdlID0gMTtcbiAgICAgICAgICovXG4gICAgICAgIGZpbGxSYW5nZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsbFJhbmdlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxsUmFuZ2UgPSBtaXNjLmNsYW1wZih2YWx1ZSwgLTEsIDEpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90eXBlID09PSBTcHJpdGVUeXBlLkZJTExFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zcHJpdGUuZmlsbF9yYW5nZSdcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gc3BlY2lmeSB0aGUgZnJhbWUgaXMgdHJpbW1lZCBvciBub3QuXG4gICAgICAgICAqICEjemgg5piv5ZCm5L2/55So6KOB5Ymq5qih5byPXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0cmltXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBzcHJpdGUudHJpbSA9IHRydWU7XG4gICAgICAgICAqL1xuICAgICAgICB0cmltOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1RyaW1tZWRNb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNUcmltbWVkTW9kZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNUcmltbWVkTW9kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gU3ByaXRlVHlwZS5TSU1QTEUgfHwgdGhpcy5fdHlwZSA9PT0gU3ByaXRlVHlwZS5NRVNIKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLnRyaW0nXG4gICAgICAgIH0sXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBzcGVjaWZ5IHRoZSBzaXplIHRyYWNpbmcgbW9kZS5cbiAgICAgICAgICogISN6aCDnsr7ngbXlsLrlr7josIPmlbTmqKHlvI9cbiAgICAgICAgICogQHByb3BlcnR5IHNpemVNb2RlXG4gICAgICAgICAqIEB0eXBlIHtTcHJpdGUuU2l6ZU1vZGV9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgICAqL1xuICAgICAgICBzaXplTW9kZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZU1vZGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpemVNb2RlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBTaXplTW9kZS5DVVNUT00pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlTcHJpdGVTaXplKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogU2l6ZU1vZGUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5zaXplX21vZGUnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBGaWxsVHlwZTogRmlsbFR5cGUsXG4gICAgICAgIFR5cGU6IFNwcml0ZVR5cGUsXG4gICAgICAgIFNpemVNb2RlOiBTaXplTW9kZSxcbiAgICAgICAgU3RhdGU6IFN0YXRlLFxuICAgIH0sXG5cbiAgICBzZXRWaXNpYmxlICh2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHZpc2libGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoYW5nZSB0aGUgc3RhdGUgb2Ygc3ByaXRlLlxuICAgICAqIEBtZXRob2Qgc2V0U3RhdGVcbiAgICAgKiBAc2VlIGBTcHJpdGUuU3RhdGVgXG4gICAgICogQHBhcmFtIHN0YXRlIHtTcHJpdGUuU3RhdGV9IE5PUk1BTCBvciBHUkFZIFN0YXRlLlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgc2V0U3RhdGUgKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHN0YXRlLlxuICAgICAqIEBtZXRob2QgZ2V0U3RhdGVcbiAgICAgKiBAc2VlIGBTcHJpdGUuU3RhdGVgXG4gICAgICogQHJldHVybiB7U3ByaXRlLlN0YXRlfVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgZ2V0U3RhdGUgKCkge30sXG5cbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBDQ19FRElUT1IgJiYgdGhpcy5ub2RlLm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX3Jlc2l6ZWRJbkVkaXRvciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2FwcGx5U3ByaXRlRnJhbWUoKTtcbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLl9zcHJpdGVGcmFtZSAmJiB0aGlzLl9zcHJpdGVGcmFtZS5lbnN1cmVMb2FkVGV4dHVyZSgpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuc2V0VmVydHNEaXJ0eSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5zZXRWZXJ0c0RpcnR5LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcblxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5zZXRWZXJ0c0RpcnR5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5zZXRWZXJ0c0RpcnR5LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgdGV4dHVyZSA9IHRoaXMuX3Nwcml0ZUZyYW1lLmdldFRleHR1cmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBtYXRlcmlhbCBpcyBiZWxvbmcgdG8gc2VsZi5cbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCgwKTtcbiAgICAgICAgaWYgKG1hdGVyaWFsKSB7XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0RGVmaW5lKCdVU0VfVEVYVFVSRScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0UHJvcGVydHkoJ3RleHR1cmUnKSAhPT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCd0ZXh0dXJlJywgdGV4dHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBCbGVuZEZ1bmMucHJvdG90eXBlLl91cGRhdGVNYXRlcmlhbC5jYWxsKHRoaXMpO1xuICAgIH0sXG5cbiAgICBfYXBwbHlBdGxhczogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChzcHJpdGVGcmFtZSkge1xuICAgICAgICAvLyBTZXQgYXRsYXNcbiAgICAgICAgaWYgKHNwcml0ZUZyYW1lICYmIHNwcml0ZUZyYW1lLl9hdGxhc1V1aWQpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHNwcml0ZUZyYW1lLl9hdGxhc1V1aWQsIGZ1bmN0aW9uIChlcnIsIGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fYXRsYXMgPSBhc3NldDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXRsYXMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF92YWxpZGF0ZVJlbmRlciAoKSB7XG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICBpZiAodGhpcy5fbWF0ZXJpYWxzWzBdICYmXG4gICAgICAgICAgICBzcHJpdGVGcmFtZSAmJlxuICAgICAgICAgICAgc3ByaXRlRnJhbWUudGV4dHVyZUxvYWRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgX2FwcGx5U3ByaXRlU2l6ZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fc3ByaXRlRnJhbWUgfHwgIXRoaXMuaXNWYWxpZCkgIHJldHVybjtcblxuICAgICAgICBpZiAoU2l6ZU1vZGUuUkFXID09PSB0aGlzLl9zaXplTW9kZSkge1xuICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9zcHJpdGVGcmFtZS5fb3JpZ2luYWxTaXplO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHNpemUpO1xuICAgICAgICB9IGVsc2UgaWYgKFNpemVNb2RlLlRSSU1NRUQgPT09IHRoaXMuX3NpemVNb2RlKSB7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IHRoaXMuX3Nwcml0ZUZyYW1lLl9yZWN0O1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgIH0sXG5cbiAgICBfYXBwbHlTcHJpdGVGcmFtZSAob2xkRnJhbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpICByZXR1cm47XG5cbiAgICAgICAgbGV0IG9sZFRleHR1cmUgPSBvbGRGcmFtZSAmJiBvbGRGcmFtZS5nZXRUZXh0dXJlKCk7XG4gICAgICAgIGlmIChvbGRUZXh0dXJlICYmICFvbGRUZXh0dXJlLmxvYWRlZCkge1xuICAgICAgICAgICAgb2xkRnJhbWUub2ZmKCdsb2FkJywgdGhpcy5fYXBwbHlTcHJpdGVTaXplLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGxldCBuZXdUZXh0dXJlID0gc3ByaXRlRnJhbWUuZ2V0VGV4dHVyZSgpO1xuICAgICAgICAgICAgaWYgKG5ld1RleHR1cmUgJiYgbmV3VGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVNwcml0ZVNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lLm9uY2UoJ2xvYWQnLCB0aGlzLl9hcHBseVNwcml0ZVNpemUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAvLyBTZXQgYXRsYXNcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5QXRsYXMoc3ByaXRlRnJhbWUpO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgU3ByaXRlLnByb3RvdHlwZS5fcmVzaXplZEluRWRpdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIHZhciBhY3R1YWxTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICB2YXIgZXhwZWN0ZWRXID0gYWN0dWFsU2l6ZS53aWR0aDtcbiAgICAgICAgICAgIHZhciBleHBlY3RlZEggPSBhY3R1YWxTaXplLmhlaWdodDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaXplTW9kZSA9PT0gU2l6ZU1vZGUuUkFXKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9zcHJpdGVGcmFtZS5nZXRPcmlnaW5hbFNpemUoKTtcbiAgICAgICAgICAgICAgICBleHBlY3RlZFcgPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkSCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zaXplTW9kZSA9PT0gU2l6ZU1vZGUuVFJJTU1FRCkge1xuICAgICAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5fc3ByaXRlRnJhbWUuZ2V0UmVjdCgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkVyA9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRIID0gcmVjdC5oZWlnaHQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4cGVjdGVkVyAhPT0gYWN0dWFsU2l6ZS53aWR0aCB8fCBleHBlY3RlZEggIT09IGFjdHVhbFNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2l6ZU1vZGUgPSBTaXplTW9kZS5DVVNUT007XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gb3ZlcnJpZGUgb25EZXN0cm95XG4gICAgU3ByaXRlLnByb3RvdHlwZS5fX3N1cGVyT25EZXN0cm95ID0gY2MuQ29tcG9uZW50LnByb3RvdHlwZS5vbkRlc3Ryb3k7XG4gICAgU3ByaXRlLnByb3RvdHlwZS5vbkRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9fc3VwZXJPbkRlc3Ryb3kpIHRoaXMuX19zdXBlck9uRGVzdHJveSgpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX3Jlc2l6ZWRJbkVkaXRvciwgdGhpcyk7XG4gICAgfTtcbn1cblxuY2MuU3ByaXRlID0gbW9kdWxlLmV4cG9ydHMgPSBTcHJpdGU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==