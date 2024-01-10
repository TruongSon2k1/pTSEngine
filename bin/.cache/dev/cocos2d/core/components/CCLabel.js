
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabel.js';
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
var macro = require('../platform/CCMacro');

var RenderComponent = require('./CCRenderComponent');

var Material = require('../assets/material/CCMaterial');

var LabelFrame = require('../renderer/utils/label/label-frame');

var BlendFunc = require('../utils/blend-func');

var deleteFromDynamicAtlas = require('../renderer/utils/utils').deleteFromDynamicAtlas;
/**
 * !#en Enum for text alignment.
 * !#zh 文本横向对齐类型
 * @enum Label.HorizontalAlign
 */

/**
 * !#en Alignment left for text.
 * !#zh 文本内容左对齐。
 * @property {Number} LEFT
 */

/**
 * !#en Alignment center for text.
 * !#zh 文本内容居中对齐。
 * @property {Number} CENTER
 */

/**
 * !#en Alignment right for text.
 * !#zh 文本内容右边对齐。
 * @property {Number} RIGHT
 */


var HorizontalAlign = macro.TextAlignment;
/**
 * !#en Enum for vertical text alignment.
 * !#zh 文本垂直对齐类型
 * @enum Label.VerticalAlign
 */

/**
 * !#en Vertical alignment top for text.
 * !#zh 文本顶部对齐。
 * @property {Number} TOP
 */

/**
 * !#en Vertical alignment center for text.
 * !#zh 文本居中对齐。
 * @property {Number} CENTER
 */

/**
 * !#en Vertical alignment bottom for text.
 * !#zh 文本底部对齐。
 * @property {Number} BOTTOM
 */

var VerticalAlign = macro.VerticalTextAlignment;
/**
 * !#en Enum for Overflow.
 * !#zh Overflow 类型
 * @enum Label.Overflow
 */

/**
 * !#en NONE.
 * !#zh 不做任何限制。
 * @property {Number} NONE
 */

/**
 * !#en In CLAMP mode, when label content goes out of the bounding box, it will be clipped.
 * !#zh CLAMP 模式中，当文本内容超出边界框时，多余的会被截断。
 * @property {Number} CLAMP
 */

/**
 * !#en In SHRINK mode, the font size will change dynamically to adapt the content size. This mode may takes up more CPU resources when the label is refreshed.
 * !#zh SHRINK 模式，字体大小会动态变化，以适应内容大小。这个模式在文本刷新的时候可能会占用较多 CPU 资源。
 * @property {Number} SHRINK
 */

/**
 * !#en In RESIZE_HEIGHT mode, you can only change the width of label and the height is changed automatically.
 * !#zh 在 RESIZE_HEIGHT 模式下，只能更改文本的宽度，高度是自动改变的。
 * @property {Number} RESIZE_HEIGHT
 */

var Overflow = cc.Enum({
  NONE: 0,
  CLAMP: 1,
  SHRINK: 2,
  RESIZE_HEIGHT: 3
});
/**
 * !#en Enum for font type.
 * !#zh Type 类型
 * @enum Label.Type
 */

/**
 * !#en The TTF font type.
 * !#zh TTF字体
 * @property {Number} TTF
 */

/**
 * !#en The bitmap font type.
 * !#zh 位图字体
 * @property {Number} BMFont
 */

/**
 * !#en The system font type.
 * !#zh 系统字体
 * @property {Number} SystemFont
 */

/**
 * !#en Enum for cache mode.
 * !#zh CacheMode 类型
 * @enum Label.CacheMode
 */

/**
* !#en Do not do any caching.
* !#zh 不做任何缓存。
* @property {Number} NONE
*/

/**
 * !#en In BITMAP mode, cache the label as a static image and add it to the dynamic atlas for batch rendering, and can batching with Sprites using broken images.
 * !#zh BITMAP 模式，将 label 缓存成静态图像并加入到动态图集，以便进行批次合并，可与使用碎图的 Sprite 进行合批（注：动态图集在 Chrome 以及微信小游戏暂时关闭，该功能无效）。
 * @property {Number} BITMAP
 */

/**
 * !#en In CHAR mode, split text into characters and cache characters into a dynamic atlas which the size of 2048*2048. 
 * !#zh CHAR 模式，将文本拆分为字符，并将字符缓存到一张单独的大小为 2048*2048 的图集中进行重复使用，不再使用动态图集（注：当图集满时将不再进行缓存，暂时不支持 SHRINK 自适应文本尺寸（后续完善））。
 * @property {Number} CHAR
 */

var CacheMode = cc.Enum({
  NONE: 0,
  BITMAP: 1,
  CHAR: 2
});
var BOLD_FLAG = 1 << 0;
var ITALIC_FLAG = 1 << 1;
var UNDERLINE_FLAG = 1 << 2;
/**
 * !#en The Label Component.
 * !#zh 文字标签组件
 * @class Label
 * @extends RenderComponent
 */

var Label = cc.Class({
  name: 'cc.Label',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  ctor: function ctor() {
    if (CC_EDITOR) {
      this._userDefinedFont = null;
    }

    this._actualFontSize = 0;
    this._assemblerData = null;
    this._frame = null;
    this._ttfTexture = null;
    this._letterTexture = null;

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      this._updateMaterial = this._updateMaterialCanvas;
    } else {
      this._updateMaterial = this._updateMaterialWebgl;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Label',
    help: 'i18n:COMPONENT.help_url.label',
    inspector: 'packages://inspector/inspectors/comps/label.js'
  },
  properties: {
    /**
     * !#en Content string of label.
     * !#zh 标签显示的文本内容。
     * @property {String} string
     */
    _string: {
      "default": '',
      formerlySerializedAs: '_N$string'
    },
    string: {
      get: function get() {
        return this._string;
      },
      set: function set(value) {
        var oldValue = this._string;
        this._string = '' + value;

        if (this.string !== oldValue) {
          this.setVertsDirty();
        }

        this._checkStringEmpty();
      },
      multiline: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.string'
    },

    /**
     * !#en Horizontal Alignment of label.
     * !#zh 文本内容的水平对齐方式。
     * @property {Label.HorizontalAlign} horizontalAlign
     */
    horizontalAlign: {
      "default": HorizontalAlign.LEFT,
      type: HorizontalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.horizontal_align',
      notify: function notify(oldValue) {
        if (this.horizontalAlign === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },

    /**
     * !#en Vertical Alignment of label.
     * !#zh 文本内容的垂直对齐方式。
     * @property {Label.VerticalAlign} verticalAlign
     */
    verticalAlign: {
      "default": VerticalAlign.TOP,
      type: VerticalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.vertical_align',
      notify: function notify(oldValue) {
        if (this.verticalAlign === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },

    /**
     * !#en The actual rendering font size in shrink mode
     * !#zh SHRINK 模式下面文本实际渲染的字体大小
     * @property {Number} actualFontSize
     */
    actualFontSize: {
      displayName: 'Actual Font Size',
      animatable: false,
      readonly: true,
      get: function get() {
        return this._actualFontSize;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.actualFontSize'
    },
    _fontSize: 40,

    /**
     * !#en Font size of label.
     * !#zh 文本字体大小。
     * @property {Number} fontSize
     */
    fontSize: {
      get: function get() {
        return this._fontSize;
      },
      set: function set(value) {
        if (this._fontSize === value) return;
        this._fontSize = value;
        this.setVertsDirty();
      },
      range: [0, 512],
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font_size'
    },

    /**
     * !#en Font family of label, only take effect when useSystemFont property is true.
     * !#zh 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
     * @property {String} fontFamily
     */
    fontFamily: {
      "default": "Arial",
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font_family',
      notify: function notify(oldValue) {
        if (this.fontFamily === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },
    _lineHeight: 40,

    /**
     * !#en Line Height of label.
     * !#zh 文本行高。
     * @property {Number} lineHeight
     */
    lineHeight: {
      get: function get() {
        return this._lineHeight;
      },
      set: function set(value) {
        if (this._lineHeight === value) return;
        this._lineHeight = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.line_height'
    },

    /**
     * !#en Overflow of label.
     * !#zh 文字显示超出范围时的处理方式。
     * @property {Label.Overflow} overflow
     */
    overflow: {
      "default": Overflow.NONE,
      type: Overflow,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.overflow',
      notify: function notify(oldValue) {
        if (this.overflow === oldValue) return;
        this.setVertsDirty();
      },
      animatable: false
    },
    _enableWrapText: true,

    /**
     * !#en Whether auto wrap label when string width is large than label width.
     * !#zh 是否自动换行。
     * @property {Boolean} enableWrapText
     */
    enableWrapText: {
      get: function get() {
        return this._enableWrapText;
      },
      set: function set(value) {
        if (this._enableWrapText === value) return;
        this._enableWrapText = value;
        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.wrap'
    },
    // 这个保存了旧项目的 file 数据
    _N$file: null,

    /**
     * !#en The font of label.
     * !#zh 文本字体。
     * @property {Font} font
     */
    font: {
      get: function get() {
        return this._N$file;
      },
      set: function set(value) {
        if (this.font === value) return; //if delete the font, we should change isSystemFontUsed to true

        if (!value) {
          this._isSystemFontUsed = true;
        }

        if (CC_EDITOR && value) {
          this._userDefinedFont = value;
        }

        this._N$file = value;
        if (value && this._isSystemFontUsed) this._isSystemFontUsed = false;
        if (!this.enabledInHierarchy) return;

        this._forceUpdateRenderData();
      },
      type: cc.Font,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.font',
      animatable: false
    },
    _isSystemFontUsed: true,

    /**
     * !#en Whether use system font name or not.
     * !#zh 是否使用系统字体。
     * @property {Boolean} useSystemFont
     */
    useSystemFont: {
      get: function get() {
        return this._isSystemFontUsed;
      },
      set: function set(value) {
        if (this._isSystemFontUsed === value) return;
        this._isSystemFontUsed = !!value;

        if (CC_EDITOR) {
          if (!value && this._userDefinedFont) {
            this.font = this._userDefinedFont;
            this.spacingX = this._spacingX;
            return;
          }
        }

        if (value) {
          this.font = null;
          if (!this.enabledInHierarchy) return;

          this._forceUpdateRenderData();
        }

        this.markForValidate();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.system_font'
    },
    _bmFontOriginalSize: {
      displayName: 'BMFont Original Size',
      get: function get() {
        if (this._N$file instanceof cc.BitmapFont) {
          return this._N$file.fontSize;
        } else {
          return -1;
        }
      },
      visible: true,
      animatable: false
    },
    _spacingX: 0,

    /**
     * !#en The spacing of the x axis between characters, only take Effect when using bitmap fonts.
     * !#zh 文字之间 x 轴的间距，仅在使用位图字体时生效。
     * @property {Number} spacingX
     */
    spacingX: {
      get: function get() {
        return this._spacingX;
      },
      set: function set(value) {
        this._spacingX = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.spacingX'
    },
    //For compatibility with v2.0.x temporary reservation.
    _batchAsBitmap: false,

    /**
     * !#en The cache mode of label. This mode only supports system fonts.
     * !#zh 文本缓存模式, 该模式只支持系统字体。
     * @property {Label.CacheMode} cacheMode
     */
    cacheMode: {
      "default": CacheMode.NONE,
      type: CacheMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.cacheMode',
      notify: function notify(oldValue) {
        if (this.cacheMode === oldValue) return;

        if (oldValue === CacheMode.BITMAP && !(this.font instanceof cc.BitmapFont)) {
          this._frame && this._frame._resetDynamicAtlasFrame();
        }

        if (oldValue === CacheMode.CHAR) {
          this._ttfTexture = null;
        }

        if (!this.enabledInHierarchy) return;

        this._forceUpdateRenderData();
      },
      animatable: false
    },
    _styleFlags: 0,

    /**
     * !#en Whether enable bold.
     * !#zh 是否启用黑体。
     * @property {Boolean} enableBold
     */
    enableBold: {
      get: function get() {
        return !!(this._styleFlags & BOLD_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= BOLD_FLAG;
        } else {
          this._styleFlags &= ~BOLD_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.bold'
    },

    /**
     * !#en Whether enable italic.
     * !#zh 是否启用斜体。
     * @property {Boolean} enableItalic
     */
    enableItalic: {
      get: function get() {
        return !!(this._styleFlags & ITALIC_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= ITALIC_FLAG;
        } else {
          this._styleFlags &= ~ITALIC_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.italic'
    },

    /**
     * !#en Whether enable underline.
     * !#zh 是否启用下划线。
     * @property {Boolean} enableUnderline
     */
    enableUnderline: {
      get: function get() {
        return !!(this._styleFlags & UNDERLINE_FLAG);
      },
      set: function set(value) {
        if (value) {
          this._styleFlags |= UNDERLINE_FLAG;
        } else {
          this._styleFlags &= ~UNDERLINE_FLAG;
        }

        this.setVertsDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.label.underline'
    },
    _underlineHeight: 0,

    /**
     * !#en The height of underline.
     * !#zh 下划线高度。
     * @property {Number} underlineHeight
     */
    underlineHeight: {
      get: function get() {
        return this._underlineHeight;
      },
      set: function set(value) {
        if (this._underlineHeight === value) return;
        this._underlineHeight = value;
        this.setVertsDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.label.underline_height'
    }
  },
  statics: {
    HorizontalAlign: HorizontalAlign,
    VerticalAlign: VerticalAlign,
    Overflow: Overflow,
    CacheMode: CacheMode,
    _shareAtlas: null,

    /**
     * !#zh 需要保证当前场景中没有使用CHAR缓存的Label才可以清除，否则已渲染的文字没有重新绘制会不显示
     * !#en It can be cleared that need to ensure there is not use the CHAR cache in the current scene. Otherwise, the rendered text will not be displayed without repainting.
     * @method clearCharCache
     * @static
     */
    clearCharCache: function clearCharCache() {
      if (Label._shareAtlas) {
        Label._shareAtlas.clearAllCache();
      }
    }
  },
  onLoad: function onLoad() {
    // For compatibility with v2.0.x temporary reservation.
    if (this._batchAsBitmap && this.cacheMode === CacheMode.NONE) {
      this.cacheMode = CacheMode.BITMAP;
      this._batchAsBitmap = false;
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      // CacheMode is not supported in Canvas.
      this.cacheMode = CacheMode.NONE;
    }
  },
  onEnable: function onEnable() {
    this._super(); // Keep track of Node size


    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
    this.node.on(cc.Node.EventType.COLOR_CHANGED, this._nodeColorChanged, this);

    this._forceUpdateRenderData();
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._nodeSizeChanged, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
    this.node.off(cc.Node.EventType.COLOR_CHANGED, this._nodeColorChanged, this);
  },
  onDestroy: function onDestroy() {
    this._assembler && this._assembler._resetAssemblerData && this._assembler._resetAssemblerData(this._assemblerData);
    this._assemblerData = null;
    this._letterTexture = null;

    if (this._ttfTexture) {
      this._ttfTexture.destroy();

      this._ttfTexture = null;
    }

    this._super();
  },
  _nodeSizeChanged: function _nodeSizeChanged() {
    // Because the content size is automatically updated when overflow is NONE.
    // And this will conflict with the alignment of the CCWidget.
    if (CC_EDITOR || this.overflow !== Overflow.NONE) {
      this.setVertsDirty();
    }
  },
  _nodeColorChanged: function _nodeColorChanged() {
    if (!(this.font instanceof cc.BitmapFont)) {
      this.setVertsDirty();
    }
  },
  setVertsDirty: function setVertsDirty() {
    if (CC_JSB && this._nativeTTF()) {
      this._assembler && this._assembler.updateRenderData(this);
    }

    this._super();
  },
  _updateColor: function _updateColor() {
    if (!(this.font instanceof cc.BitmapFont)) {
      if (!(this._srcBlendFactor === cc.macro.BlendFactor.SRC_ALPHA && this.node._renderFlag & cc.RenderFlow.FLAG_OPACITY)) {
        this.setVertsDirty();
      }
    }

    RenderComponent.prototype._updateColor.call(this);
  },
  _validateRender: function _validateRender() {
    if (!this.string) {
      this.disableRender();
      return;
    }

    if (this._materials[0]) {
      var font = this.font;

      if (font instanceof cc.BitmapFont) {
        var spriteFrame = font.spriteFrame;

        if (spriteFrame && spriteFrame.textureLoaded() && font._fntConfig) {
          return;
        }
      } else {
        return;
      }
    }

    this.disableRender();
  },
  _resetAssembler: function _resetAssembler() {
    this._resetFrame();

    RenderComponent.prototype._resetAssembler.call(this);
  },
  _resetFrame: function _resetFrame() {
    if (this._frame && !(this.font instanceof cc.BitmapFont)) {
      deleteFromDynamicAtlas(this, this._frame);
      this._frame = null;
    }
  },
  _checkStringEmpty: function _checkStringEmpty() {
    this.markForRender(!!this.string);
  },
  _on3DNodeChanged: function _on3DNodeChanged() {
    this._resetAssembler();

    this._applyFontTexture();
  },
  _onBMFontTextureLoaded: function _onBMFontTextureLoaded() {
    this._frame._texture = this.font.spriteFrame._texture;
    this.markForRender(true);

    this._updateMaterial();

    this._assembler && this._assembler.updateRenderData(this);
  },
  _onBlendChanged: function _onBlendChanged() {
    if (!this.useSystemFont || !this.enabledInHierarchy) return;

    this._forceUpdateRenderData();
  },
  _applyFontTexture: function _applyFontTexture() {
    var font = this.font;

    if (font instanceof cc.BitmapFont) {
      var spriteFrame = font.spriteFrame;
      this._frame = spriteFrame;

      if (spriteFrame) {
        spriteFrame.onTextureLoaded(this._onBMFontTextureLoaded, this);
      }
    } else {
      if (!this._nativeTTF()) {
        if (!this._frame) {
          this._frame = new LabelFrame();
        }

        if (this.cacheMode === CacheMode.CHAR) {
          this._letterTexture = this._assembler._getAssemblerData();

          this._frame._refreshTexture(this._letterTexture);
        } else if (!this._ttfTexture) {
          this._ttfTexture = new cc.Texture2D();
          this._assemblerData = this._assembler._getAssemblerData();

          this._ttfTexture.initWithElement(this._assemblerData.canvas);
        }

        if (this.cacheMode !== CacheMode.CHAR) {
          this._frame._resetDynamicAtlasFrame();

          this._frame._refreshTexture(this._ttfTexture);

          if (this._srcBlendFactor === cc.macro.BlendFactor.ONE && !CC_NATIVERENDERER) {
            this._ttfTexture.setPremultiplyAlpha(true);
          }
        }

        this._updateMaterial();
      }

      this._assembler && this._assembler.updateRenderData(this);
    }

    this.markForValidate();
  },
  _updateMaterialCanvas: function _updateMaterialCanvas() {
    if (!this._frame) return;
    this._frame._texture._nativeUrl = this.uuid + '_texture';
  },
  _updateMaterialWebgl: function _updateMaterialWebgl() {
    var material = this.getMaterial(0);

    if (this._nativeTTF()) {
      if (material) this._assembler._updateTTFMaterial(this);
      return;
    }

    if (!this._frame) return;
    material && material.setProperty('texture', this._frame._texture);

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _forceUseCanvas: false,
  _useNativeTTF: function _useNativeTTF() {
    return cc.macro.ENABLE_NATIVE_TTF_RENDERER && !this._forceUseCanvas;
  },
  _nativeTTF: function _nativeTTF() {
    return this._useNativeTTF() && !!this._assembler && !!this._assembler._updateTTFMaterial;
  },
  _forceUpdateRenderData: function _forceUpdateRenderData() {
    this.setVertsDirty();

    this._resetAssembler();

    this._applyFontTexture();
  },

  /**
   * @deprecated `label._enableBold` is deprecated, use `label.enableBold = true` instead please.
   */
  _enableBold: function _enableBold(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableBold` is deprecated, use `label.enableBold = true` instead please');
    }

    this.enableBold = !!enabled;
  },

  /**
   * @deprecated `label._enableItalics` is deprecated, use `label.enableItalics = true` instead please.
   */
  _enableItalics: function _enableItalics(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableItalics` is deprecated, use `label.enableItalics = true` instead please');
    }

    this.enableItalic = !!enabled;
  },

  /**
   * @deprecated `label._enableUnderline` is deprecated, use `label.enableUnderline = true` instead please.
   */
  _enableUnderline: function _enableUnderline(enabled) {
    if (CC_DEBUG) {
      cc.warn('`label._enableUnderline` is deprecated, use `label.enableUnderline = true` instead please');
    }

    this.enableUnderline = !!enabled;
  }
});
cc.Label = module.exports = Label;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTGFiZWwuanMiXSwibmFtZXMiOlsibWFjcm8iLCJyZXF1aXJlIiwiUmVuZGVyQ29tcG9uZW50IiwiTWF0ZXJpYWwiLCJMYWJlbEZyYW1lIiwiQmxlbmRGdW5jIiwiZGVsZXRlRnJvbUR5bmFtaWNBdGxhcyIsIkhvcml6b250YWxBbGlnbiIsIlRleHRBbGlnbm1lbnQiLCJWZXJ0aWNhbEFsaWduIiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwiT3ZlcmZsb3ciLCJjYyIsIkVudW0iLCJOT05FIiwiQ0xBTVAiLCJTSFJJTksiLCJSRVNJWkVfSEVJR0hUIiwiQ2FjaGVNb2RlIiwiQklUTUFQIiwiQ0hBUiIsIkJPTERfRkxBRyIsIklUQUxJQ19GTEFHIiwiVU5ERVJMSU5FX0ZMQUciLCJMYWJlbCIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImN0b3IiLCJDQ19FRElUT1IiLCJfdXNlckRlZmluZWRGb250IiwiX2FjdHVhbEZvbnRTaXplIiwiX2Fzc2VtYmxlckRhdGEiLCJfZnJhbWUiLCJfdHRmVGV4dHVyZSIsIl9sZXR0ZXJUZXh0dXJlIiwiZ2FtZSIsInJlbmRlclR5cGUiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJfdXBkYXRlTWF0ZXJpYWwiLCJfdXBkYXRlTWF0ZXJpYWxDYW52YXMiLCJfdXBkYXRlTWF0ZXJpYWxXZWJnbCIsImVkaXRvciIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwicHJvcGVydGllcyIsIl9zdHJpbmciLCJmb3JtZXJseVNlcmlhbGl6ZWRBcyIsInN0cmluZyIsImdldCIsInNldCIsInZhbHVlIiwib2xkVmFsdWUiLCJzZXRWZXJ0c0RpcnR5IiwiX2NoZWNrU3RyaW5nRW1wdHkiLCJtdWx0aWxpbmUiLCJ0b29sdGlwIiwiQ0NfREVWIiwiaG9yaXpvbnRhbEFsaWduIiwiTEVGVCIsInR5cGUiLCJub3RpZnkiLCJhbmltYXRhYmxlIiwidmVydGljYWxBbGlnbiIsIlRPUCIsImFjdHVhbEZvbnRTaXplIiwiZGlzcGxheU5hbWUiLCJyZWFkb25seSIsIl9mb250U2l6ZSIsImZvbnRTaXplIiwicmFuZ2UiLCJmb250RmFtaWx5IiwiX2xpbmVIZWlnaHQiLCJsaW5lSGVpZ2h0Iiwib3ZlcmZsb3ciLCJfZW5hYmxlV3JhcFRleHQiLCJlbmFibGVXcmFwVGV4dCIsIl9OJGZpbGUiLCJmb250IiwiX2lzU3lzdGVtRm9udFVzZWQiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwiRm9udCIsInVzZVN5c3RlbUZvbnQiLCJzcGFjaW5nWCIsIl9zcGFjaW5nWCIsIm1hcmtGb3JWYWxpZGF0ZSIsIl9ibUZvbnRPcmlnaW5hbFNpemUiLCJCaXRtYXBGb250IiwidmlzaWJsZSIsIl9iYXRjaEFzQml0bWFwIiwiY2FjaGVNb2RlIiwiX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJfc3R5bGVGbGFncyIsImVuYWJsZUJvbGQiLCJlbmFibGVJdGFsaWMiLCJlbmFibGVVbmRlcmxpbmUiLCJfdW5kZXJsaW5lSGVpZ2h0IiwidW5kZXJsaW5lSGVpZ2h0Iiwic3RhdGljcyIsIl9zaGFyZUF0bGFzIiwiY2xlYXJDaGFyQ2FjaGUiLCJjbGVhckFsbENhY2hlIiwib25Mb2FkIiwib25FbmFibGUiLCJfc3VwZXIiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiU0laRV9DSEFOR0VEIiwiX25vZGVTaXplQ2hhbmdlZCIsIkFOQ0hPUl9DSEFOR0VEIiwiQ09MT1JfQ0hBTkdFRCIsIl9ub2RlQ29sb3JDaGFuZ2VkIiwib25EaXNhYmxlIiwib2ZmIiwib25EZXN0cm95IiwiX2Fzc2VtYmxlciIsIl9yZXNldEFzc2VtYmxlckRhdGEiLCJkZXN0cm95IiwiQ0NfSlNCIiwiX25hdGl2ZVRURiIsInVwZGF0ZVJlbmRlckRhdGEiLCJfdXBkYXRlQ29sb3IiLCJfc3JjQmxlbmRGYWN0b3IiLCJCbGVuZEZhY3RvciIsIlNSQ19BTFBIQSIsIl9yZW5kZXJGbGFnIiwiUmVuZGVyRmxvdyIsIkZMQUdfT1BBQ0lUWSIsInByb3RvdHlwZSIsImNhbGwiLCJfdmFsaWRhdGVSZW5kZXIiLCJkaXNhYmxlUmVuZGVyIiwiX21hdGVyaWFscyIsInNwcml0ZUZyYW1lIiwidGV4dHVyZUxvYWRlZCIsIl9mbnRDb25maWciLCJfcmVzZXRBc3NlbWJsZXIiLCJfcmVzZXRGcmFtZSIsIm1hcmtGb3JSZW5kZXIiLCJfb24zRE5vZGVDaGFuZ2VkIiwiX2FwcGx5Rm9udFRleHR1cmUiLCJfb25CTUZvbnRUZXh0dXJlTG9hZGVkIiwiX3RleHR1cmUiLCJfb25CbGVuZENoYW5nZWQiLCJvblRleHR1cmVMb2FkZWQiLCJfZ2V0QXNzZW1ibGVyRGF0YSIsIl9yZWZyZXNoVGV4dHVyZSIsIlRleHR1cmUyRCIsImluaXRXaXRoRWxlbWVudCIsImNhbnZhcyIsIk9ORSIsIkNDX05BVElWRVJFTkRFUkVSIiwic2V0UHJlbXVsdGlwbHlBbHBoYSIsIl9uYXRpdmVVcmwiLCJ1dWlkIiwibWF0ZXJpYWwiLCJnZXRNYXRlcmlhbCIsIl91cGRhdGVUVEZNYXRlcmlhbCIsInNldFByb3BlcnR5IiwiX2ZvcmNlVXNlQ2FudmFzIiwiX3VzZU5hdGl2ZVRURiIsIkVOQUJMRV9OQVRJVkVfVFRGX1JFTkRFUkVSIiwiX2VuYWJsZUJvbGQiLCJlbmFibGVkIiwiQ0NfREVCVUciLCJ3YXJuIiwiX2VuYWJsZUl0YWxpY3MiLCJfZW5hYmxlVW5kZXJsaW5lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMscUJBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMscUJBQUQsQ0FB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VUFBL0IsSUFBNkMsQ0FBQyxDQUFDLEtBQUtBLFVBQUwsQ0FBZ0IwQyxrQkFBdEU7QUFDSCxHQXZuQmdCO0FBeW5CakIvRSxFQUFBQSxzQkF6bkJpQixvQ0F5bkJTO0FBQ3RCLFNBQUs1QixhQUFMOztBQUNBLFNBQUtzRixlQUFMOztBQUNBLFNBQUtJLGlCQUFMO0FBQ0gsR0E3bkJnQjs7QUErbkJqQjtBQUNKO0FBQ0E7QUFDSXNCLEVBQUFBLFdBbG9CaUIsdUJBa29CSkMsT0Fsb0JJLEVBa29CSztBQUNsQixRQUFJQyxRQUFKLEVBQWM7QUFDVjVKLE1BQUFBLEVBQUUsQ0FBQzZKLElBQUgsQ0FBUSxpRkFBUjtBQUNIOztBQUNELFNBQUsxRSxVQUFMLEdBQWtCLENBQUMsQ0FBQ3dFLE9BQXBCO0FBQ0gsR0F2b0JnQjs7QUF5b0JqQjtBQUNKO0FBQ0E7QUFDSUcsRUFBQUEsY0E1b0JpQiwwQkE0b0JESCxPQTVvQkMsRUE0b0JRO0FBQ3JCLFFBQUlDLFFBQUosRUFBYztBQUNWNUosTUFBQUEsRUFBRSxDQUFDNkosSUFBSCxDQUFRLHVGQUFSO0FBQ0g7O0FBQ0QsU0FBS3pFLFlBQUwsR0FBb0IsQ0FBQyxDQUFDdUUsT0FBdEI7QUFDSCxHQWpwQmdCOztBQW1wQmpCO0FBQ0o7QUFDQTtBQUNJSSxFQUFBQSxnQkF0cEJpQiw0QkFzcEJDSixPQXRwQkQsRUFzcEJVO0FBQ3ZCLFFBQUlDLFFBQUosRUFBYztBQUNWNUosTUFBQUEsRUFBRSxDQUFDNkosSUFBSCxDQUFRLDJGQUFSO0FBQ0g7O0FBQ0QsU0FBS3hFLGVBQUwsR0FBdUIsQ0FBQyxDQUFDc0UsT0FBekI7QUFDSDtBQTNwQmdCLENBQVQsQ0FBWjtBQThwQkMzSixFQUFFLENBQUNZLEtBQUgsR0FBV29KLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJKLEtBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XHJcbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NSZW5kZXJDb21wb25lbnQnKTtcclxuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xyXG5jb25zdCBMYWJlbEZyYW1lID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvdXRpbHMvbGFiZWwvbGFiZWwtZnJhbWUnKTtcclxuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vdXRpbHMvYmxlbmQtZnVuYycpO1xyXG5jb25zdCBkZWxldGVGcm9tRHluYW1pY0F0bGFzID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvdXRpbHMvdXRpbHMnKS5kZWxldGVGcm9tRHluYW1pY0F0bGFzO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgdGV4dCBhbGlnbm1lbnQuXHJcbiAqICEjemgg5paH5pys5qiq5ZCR5a+56b2Q57G75Z6LXHJcbiAqIEBlbnVtIExhYmVsLkhvcml6b250YWxBbGlnblxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gQWxpZ25tZW50IGxlZnQgZm9yIHRleHQuXHJcbiAqICEjemgg5paH5pys5YaF5a655bem5a+56b2Q44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMRUZUXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBBbGlnbm1lbnQgY2VudGVyIGZvciB0ZXh0LlxyXG4gKiAhI3poIOaWh+acrOWGheWuueWxheS4reWvuem9kOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBBbGlnbm1lbnQgcmlnaHQgZm9yIHRleHQuXHJcbiAqICEjemgg5paH5pys5YaF5a655Y+z6L655a+56b2Q44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSSUdIVFxyXG4gKi9cclxuY29uc3QgSG9yaXpvbnRhbEFsaWduID0gbWFjcm8uVGV4dEFsaWdubWVudDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEVudW0gZm9yIHZlcnRpY2FsIHRleHQgYWxpZ25tZW50LlxyXG4gKiAhI3poIOaWh+acrOWeguebtOWvuem9kOexu+Wei1xyXG4gKiBAZW51bSBMYWJlbC5WZXJ0aWNhbEFsaWduXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBWZXJ0aWNhbCBhbGlnbm1lbnQgdG9wIGZvciB0ZXh0LlxyXG4gKiAhI3poIOaWh+acrOmhtumDqOWvuem9kOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gVE9QXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBWZXJ0aWNhbCBhbGlnbm1lbnQgY2VudGVyIGZvciB0ZXh0LlxyXG4gKiAhI3poIOaWh+acrOWxheS4reWvuem9kOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBWZXJ0aWNhbCBhbGlnbm1lbnQgYm90dG9tIGZvciB0ZXh0LlxyXG4gKiAhI3poIOaWh+acrOW6lemDqOWvuem9kOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQk9UVE9NXHJcbiAqL1xyXG5jb25zdCBWZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgT3ZlcmZsb3cuXHJcbiAqICEjemggT3ZlcmZsb3cg57G75Z6LXHJcbiAqIEBlbnVtIExhYmVsLk92ZXJmbG93XHJcbiAqL1xyXG4vKipcclxuICogISNlbiBOT05FLlxyXG4gKiAhI3poIOS4jeWBmuS7u+S9lemZkOWItuOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gSW4gQ0xBTVAgbW9kZSwgd2hlbiBsYWJlbCBjb250ZW50IGdvZXMgb3V0IG9mIHRoZSBib3VuZGluZyBib3gsIGl0IHdpbGwgYmUgY2xpcHBlZC5cclxuICogISN6aCBDTEFNUCDmqKHlvI/kuK3vvIzlvZPmlofmnKzlhoXlrrnotoXlh7rovrnnlYzmoYbml7bvvIzlpJrkvZnnmoTkvJrooqvmiKrmlq3jgIJcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENMQU1QXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBJbiBTSFJJTksgbW9kZSwgdGhlIGZvbnQgc2l6ZSB3aWxsIGNoYW5nZSBkeW5hbWljYWxseSB0byBhZGFwdCB0aGUgY29udGVudCBzaXplLiBUaGlzIG1vZGUgbWF5IHRha2VzIHVwIG1vcmUgQ1BVIHJlc291cmNlcyB3aGVuIHRoZSBsYWJlbCBpcyByZWZyZXNoZWQuXHJcbiAqICEjemggU0hSSU5LIOaooeW8j++8jOWtl+S9k+Wkp+Wwj+S8muWKqOaAgeWPmOWMlu+8jOS7pemAguW6lOWGheWuueWkp+Wwj+OAgui/meS4quaooeW8j+WcqOaWh+acrOWIt+aWsOeahOaXtuWAmeWPr+iDveS8muWNoOeUqOi+g+WkmiBDUFUg6LWE5rqQ44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSFJJTktcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIEluIFJFU0laRV9IRUlHSFQgbW9kZSwgeW91IGNhbiBvbmx5IGNoYW5nZSB0aGUgd2lkdGggb2YgbGFiZWwgYW5kIHRoZSBoZWlnaHQgaXMgY2hhbmdlZCBhdXRvbWF0aWNhbGx5LlxyXG4gKiAhI3poIOWcqCBSRVNJWkVfSEVJR0hUIOaooeW8j+S4i++8jOWPquiDveabtOaUueaWh+acrOeahOWuveW6pu+8jOmrmOW6puaYr+iHquWKqOaUueWPmOeahOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gUkVTSVpFX0hFSUdIVFxyXG4gKi9cclxuY29uc3QgT3ZlcmZsb3cgPSBjYy5FbnVtKHtcclxuICAgIE5PTkU6IDAsXHJcbiAgICBDTEFNUDogMSxcclxuICAgIFNIUklOSzogMixcclxuICAgIFJFU0laRV9IRUlHSFQ6IDNcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBmb250IHR5cGUuXHJcbiAqICEjemggVHlwZSDnsbvlnotcclxuICogQGVudW0gTGFiZWwuVHlwZVxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gVGhlIFRURiBmb250IHR5cGUuXHJcbiAqICEjemggVFRG5a2X5L2TXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUVEZcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBiaXRtYXAgZm9udCB0eXBlLlxyXG4gKiAhI3poIOS9jeWbvuWtl+S9k1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQk1Gb250XHJcbiAqL1xyXG4vKipcclxuICogISNlbiBUaGUgc3lzdGVtIGZvbnQgdHlwZS5cclxuICogISN6aCDns7vnu5/lrZfkvZNcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFN5c3RlbUZvbnRcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBjYWNoZSBtb2RlLlxyXG4gKiAhI3poIENhY2hlTW9kZSDnsbvlnotcclxuICogQGVudW0gTGFiZWwuQ2FjaGVNb2RlXHJcbiAqL1xyXG4gLyoqXHJcbiAqICEjZW4gRG8gbm90IGRvIGFueSBjYWNoaW5nLlxyXG4gKiAhI3poIOS4jeWBmuS7u+S9lee8k+WtmOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gSW4gQklUTUFQIG1vZGUsIGNhY2hlIHRoZSBsYWJlbCBhcyBhIHN0YXRpYyBpbWFnZSBhbmQgYWRkIGl0IHRvIHRoZSBkeW5hbWljIGF0bGFzIGZvciBiYXRjaCByZW5kZXJpbmcsIGFuZCBjYW4gYmF0Y2hpbmcgd2l0aCBTcHJpdGVzIHVzaW5nIGJyb2tlbiBpbWFnZXMuXHJcbiAqICEjemggQklUTUFQIOaooeW8j++8jOWwhiBsYWJlbCDnvJPlrZjmiJDpnZnmgIHlm77lg4/lubbliqDlhaXliLDliqjmgIHlm77pm4bvvIzku6Xkvr/ov5vooYzmibnmrKHlkIjlubbvvIzlj6/kuI7kvb/nlKjnoo7lm77nmoQgU3ByaXRlIOi/m+ihjOWQiOaJue+8iOazqO+8muWKqOaAgeWbvumbhuWcqCBDaHJvbWUg5Lul5Y+K5b6u5L+h5bCP5ri45oiP5pqC5pe25YWz6Zet77yM6K+l5Yqf6IO95peg5pWI77yJ44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCSVRNQVBcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIEluIENIQVIgbW9kZSwgc3BsaXQgdGV4dCBpbnRvIGNoYXJhY3RlcnMgYW5kIGNhY2hlIGNoYXJhY3RlcnMgaW50byBhIGR5bmFtaWMgYXRsYXMgd2hpY2ggdGhlIHNpemUgb2YgMjA0OCoyMDQ4LiBcclxuICogISN6aCBDSEFSIOaooeW8j++8jOWwhuaWh+acrOaLhuWIhuS4uuWtl+espu+8jOW5tuWwhuWtl+espue8k+WtmOWIsOS4gOW8oOWNleeLrOeahOWkp+Wwj+S4uiAyMDQ4KjIwNDgg55qE5Zu+6ZuG5Lit6L+b6KGM6YeN5aSN5L2/55So77yM5LiN5YaN5L2/55So5Yqo5oCB5Zu+6ZuG77yI5rOo77ya5b2T5Zu+6ZuG5ruh5pe25bCG5LiN5YaN6L+b6KGM57yT5a2Y77yM5pqC5pe25LiN5pSv5oyBIFNIUklOSyDoh6rpgILlupTmlofmnKzlsLrlr7jvvIjlkI7nu63lrozlloTvvInvvInjgIJcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENIQVJcclxuICovXHJcbmNvbnN0IENhY2hlTW9kZSA9IGNjLkVudW0oe1xyXG4gICAgTk9ORTogMCxcclxuICAgIEJJVE1BUDogMSxcclxuICAgIENIQVI6IDIsXHJcbn0pO1xyXG5cclxuY29uc3QgQk9MRF9GTEFHID0gMSA8PCAwO1xyXG5jb25zdCBJVEFMSUNfRkxBRyA9IDEgPDwgMTtcclxuY29uc3QgVU5ERVJMSU5FX0ZMQUcgPSAxIDw8IDI7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgTGFiZWwgQ29tcG9uZW50LlxyXG4gKiAhI3poIOaWh+Wtl+agh+etvue7hOS7tlxyXG4gKiBAY2xhc3MgTGFiZWxcclxuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XHJcbiAqL1xyXG5sZXQgTGFiZWwgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTGFiZWwnLFxyXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxyXG4gICAgbWl4aW5zOiBbQmxlbmRGdW5jXSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEZWZpbmVkRm9udCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hY3R1YWxGb250U2l6ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyRGF0YSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90dGZUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sZXR0ZXJUZXh0dXJlID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwgPSB0aGlzLl91cGRhdGVNYXRlcmlhbENhbnZhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsID0gdGhpcy5fdXBkYXRlTWF0ZXJpYWxXZWJnbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbCcsXHJcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmxhYmVsJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2xhYmVsLmpzJyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQ29udGVudCBzdHJpbmcgb2YgbGFiZWwuXHJcbiAgICAgICAgICogISN6aCDmoIfnrb7mmL7npLrnmoTmlofmnKzlhoXlrrnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gc3RyaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3N0cmluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcclxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdfTiRzdHJpbmcnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RyaW5nOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RyaW5nO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl9zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcgPSAnJyArIHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0cmluZyAhPT0gb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja1N0cmluZ0VtcHR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5zdHJpbmcnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBIb3Jpem9udGFsIEFsaWdubWVudCBvZiBsYWJlbC5cclxuICAgICAgICAgKiAhI3poIOaWh+acrOWGheWuueeahOawtOW5s+Wvuem9kOaWueW8j+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWwuSG9yaXpvbnRhbEFsaWdufSBob3Jpem9udGFsQWxpZ25cclxuICAgICAgICAgKi9cclxuICAgICAgICBob3Jpem9udGFsQWxpZ246IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogSG9yaXpvbnRhbEFsaWduLkxFRlQsXHJcbiAgICAgICAgICAgIHR5cGU6IEhvcml6b250YWxBbGlnbixcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5ob3Jpem9udGFsX2FsaWduJyxcclxuICAgICAgICAgICAgbm90aWZ5ICAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWxBbGlnbiA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVmVydGljYWwgQWxpZ25tZW50IG9mIGxhYmVsLlxyXG4gICAgICAgICAqICEjemgg5paH5pys5YaF5a6555qE5Z6C55u05a+56b2Q5pa55byP44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbC5WZXJ0aWNhbEFsaWdufSB2ZXJ0aWNhbEFsaWduXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmVydGljYWxBbGlnbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBWZXJ0aWNhbEFsaWduLlRPUCxcclxuICAgICAgICAgICAgdHlwZTogVmVydGljYWxBbGlnbixcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC52ZXJ0aWNhbF9hbGlnbicsXHJcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsQWxpZ24gPT09IG9sZFZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgYWN0dWFsIHJlbmRlcmluZyBmb250IHNpemUgaW4gc2hyaW5rIG1vZGVcclxuICAgICAgICAgKiAhI3poIFNIUklOSyDmqKHlvI/kuIvpnaLmlofmnKzlrp7pmYXmuLLmn5PnmoTlrZfkvZPlpKflsI9cclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYWN0dWFsRm9udFNpemVcclxuICAgICAgICAgKi9cclxuICAgICAgICBhY3R1YWxGb250U2l6ZToge1xyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FjdHVhbCBGb250IFNpemUnLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsRm9udFNpemU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuYWN0dWFsRm9udFNpemUnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9mb250U2l6ZTogNDAsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBGb250IHNpemUgb2YgbGFiZWwuXHJcbiAgICAgICAgICogISN6aCDmlofmnKzlrZfkvZPlpKflsI/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9udFNpemVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb250U2l6ZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbnRTaXplO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZm9udFNpemUgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9udFNpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYW5nZTogWzAsIDUxMl0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuZm9udF9zaXplJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEZvbnQgZmFtaWx5IG9mIGxhYmVsLCBvbmx5IHRha2UgZWZmZWN0IHdoZW4gdXNlU3lzdGVtRm9udCBwcm9wZXJ0eSBpcyB0cnVlLlxyXG4gICAgICAgICAqICEjemgg5paH5pys5a2X5L2T5ZCN56ewLCDlj6rlnKggdXNlU3lzdGVtRm9udCDlsZ7mgKfkuLogdHJ1ZSDnmoTml7blgJnnlJ/mlYjjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZm9udEZhbWlseVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvbnRGYW1pbHk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJBcmlhbFwiLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmZvbnRfZmFtaWx5JyxcclxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9udEZhbWlseSA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9saW5lSGVpZ2h0OiA0MCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIExpbmUgSGVpZ2h0IG9mIGxhYmVsLlxyXG4gICAgICAgICAqICEjemgg5paH5pys6KGM6auY44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpbmVIZWlnaHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBsaW5lSGVpZ2h0OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGluZUhlaWdodDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVIZWlnaHQgPT09IHZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lSGVpZ2h0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5saW5lX2hlaWdodCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIE92ZXJmbG93IG9mIGxhYmVsLlxyXG4gICAgICAgICAqICEjemgg5paH5a2X5pi+56S66LaF5Ye66IyD5Zu05pe255qE5aSE55CG5pa55byP44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbC5PdmVyZmxvd30gb3ZlcmZsb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBvdmVyZmxvdzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBPdmVyZmxvdy5OT05FLFxyXG4gICAgICAgICAgICB0eXBlOiBPdmVyZmxvdyxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5vdmVyZmxvdycsXHJcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJmbG93ID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2VuYWJsZVdyYXBUZXh0OiB0cnVlLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciBhdXRvIHdyYXAgbGFiZWwgd2hlbiBzdHJpbmcgd2lkdGggaXMgbGFyZ2UgdGhhbiBsYWJlbCB3aWR0aC5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuiHquWKqOaNouihjOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlV3JhcFRleHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbmFibGVXcmFwVGV4dDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZVdyYXBUZXh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZW5hYmxlV3JhcFRleHQgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlV3JhcFRleHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC53cmFwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyDov5nkuKrkv53lrZjkuobml6fpobnnm67nmoQgZmlsZSDmlbDmja5cclxuICAgICAgICBfTiRmaWxlOiBudWxsLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBmb250IG9mIGxhYmVsLlxyXG4gICAgICAgICAqICEjemgg5paH5pys5a2X5L2T44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtGb250fSBmb250XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9udDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX04kZmlsZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9udCA9PT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9pZiBkZWxldGUgdGhlIGZvbnQsIHdlIHNob3VsZCBjaGFuZ2UgaXNTeXN0ZW1Gb250VXNlZCB0byB0cnVlXHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJEZWZpbmVkRm9udCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fTiRmaWxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgdGhpcy5faXNTeXN0ZW1Gb250VXNlZClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Gb250LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmZvbnQnLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9pc1N5c3RlbUZvbnRVc2VkOiB0cnVlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdXNlIHN5c3RlbSBmb250IG5hbWUgb3Igbm90LlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5L2/55So57O757uf5a2X5L2T44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB1c2VTeXN0ZW1Gb250XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXNlU3lzdGVtRm9udDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3lzdGVtRm9udFVzZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1N5c3RlbUZvbnRVc2VkID09PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSAmJiB0aGlzLl91c2VyRGVmaW5lZEZvbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb250ID0gdGhpcy5fdXNlckRlZmluZWRGb250O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwYWNpbmdYID0gdGhpcy5fc3BhY2luZ1g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb250ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yVmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuc3lzdGVtX2ZvbnQnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9ibUZvbnRPcmlnaW5hbFNpemU6IHtcclxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdCTUZvbnQgT3JpZ2luYWwgU2l6ZScsXHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fTiRmaWxlIGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9OJGZpbGUuZm9udFNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3NwYWNpbmdYOiAwLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBzcGFjaW5nIG9mIHRoZSB4IGF4aXMgYmV0d2VlbiBjaGFyYWN0ZXJzLCBvbmx5IHRha2UgRWZmZWN0IHdoZW4gdXNpbmcgYml0bWFwIGZvbnRzLlxyXG4gICAgICAgICAqICEjemgg5paH5a2X5LmL6Ze0IHgg6L2055qE6Ze06Led77yM5LuF5Zyo5L2/55So5L2N5Zu+5a2X5L2T5pe255Sf5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNwYWNpbmdYXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3BhY2luZ1g6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGFjaW5nWDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2luZ1ggPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLnNwYWNpbmdYJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvL0ZvciBjb21wYXRpYmlsaXR5IHdpdGggdjIuMC54IHRlbXBvcmFyeSByZXNlcnZhdGlvbi5cclxuICAgICAgICBfYmF0Y2hBc0JpdG1hcDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGNhY2hlIG1vZGUgb2YgbGFiZWwuIFRoaXMgbW9kZSBvbmx5IHN1cHBvcnRzIHN5c3RlbSBmb250cy5cclxuICAgICAgICAgKiAhI3poIOaWh+acrOe8k+WtmOaooeW8jywg6K+l5qih5byP5Y+q5pSv5oyB57O757uf5a2X5L2T44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbC5DYWNoZU1vZGV9IGNhY2hlTW9kZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNhY2hlTW9kZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBDYWNoZU1vZGUuTk9ORSxcclxuICAgICAgICAgICAgdHlwZTogQ2FjaGVNb2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxhYmVsLmNhY2hlTW9kZScsXHJcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlTW9kZSA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlID09PSBDYWNoZU1vZGUuQklUTUFQICYmICEodGhpcy5mb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZSAmJiB0aGlzLl9mcmFtZS5fcmVzZXREeW5hbWljQXRsYXNGcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gQ2FjaGVNb2RlLkNIQVIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90dGZUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3N0eWxlRmxhZ3M6IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciBlbmFibGUgYm9sZC5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOm7keS9k+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlQm9sZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZUJvbGQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhISh0aGlzLl9zdHlsZUZsYWdzICYgQk9MRF9GTEFHKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyB8PSBCT0xEX0ZMQUc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlRmxhZ3MgJj0gfkJPTERfRkxBRztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGFiZWwuYm9sZCdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgZW5hYmxlIGl0YWxpYy5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOaWnOS9k+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlSXRhbGljXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlSXRhbGljOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISEodGhpcy5fc3R5bGVGbGFncyAmIElUQUxJQ19GTEFHKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyB8PSBJVEFMSUNfRkxBRztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVGbGFncyAmPSB+SVRBTElDX0ZMQUc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5pdGFsaWMnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGV0aGVyIGVuYWJsZSB1bmRlcmxpbmUuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjkuIvliJLnur/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVVuZGVybGluZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZVVuZGVybGluZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuX3N0eWxlRmxhZ3MgJiBVTkRFUkxJTkVfRkxBRyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlRmxhZ3MgfD0gVU5ERVJMSU5FX0ZMQUc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlRmxhZ3MgJj0gflVOREVSTElORV9GTEFHO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC51bmRlcmxpbmUnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX3VuZGVybGluZUhlaWdodDogMCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBoZWlnaHQgb2YgdW5kZXJsaW5lLlxyXG4gICAgICAgICAqICEjemgg5LiL5YiS57q/6auY5bqm44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHVuZGVybGluZUhlaWdodFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHVuZGVybGluZUhlaWdodDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VuZGVybGluZUhlaWdodDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3VuZGVybGluZUhlaWdodCA9PT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdW5kZXJsaW5lSGVpZ2h0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC51bmRlcmxpbmVfaGVpZ2h0JyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgSG9yaXpvbnRhbEFsaWduOiBIb3Jpem9udGFsQWxpZ24sXHJcbiAgICAgICAgVmVydGljYWxBbGlnbjogVmVydGljYWxBbGlnbixcclxuICAgICAgICBPdmVyZmxvdzogT3ZlcmZsb3csXHJcbiAgICAgICAgQ2FjaGVNb2RlOiBDYWNoZU1vZGUsXHJcblxyXG4gICAgICAgIF9zaGFyZUF0bGFzOiBudWxsLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjemgg6ZyA6KaB5L+d6K+B5b2T5YmN5Zy65pmv5Lit5rKh5pyJ5L2/55SoQ0hBUue8k+WtmOeahExhYmVs5omN5Y+v5Lul5riF6Zmk77yM5ZCm5YiZ5bey5riy5p+T55qE5paH5a2X5rKh5pyJ6YeN5paw57uY5Yi25Lya5LiN5pi+56S6XHJcbiAgICAgICAgICogISNlbiBJdCBjYW4gYmUgY2xlYXJlZCB0aGF0IG5lZWQgdG8gZW5zdXJlIHRoZXJlIGlzIG5vdCB1c2UgdGhlIENIQVIgY2FjaGUgaW4gdGhlIGN1cnJlbnQgc2NlbmUuIE90aGVyd2lzZSwgdGhlIHJlbmRlcmVkIHRleHQgd2lsbCBub3QgYmUgZGlzcGxheWVkIHdpdGhvdXQgcmVwYWludGluZy5cclxuICAgICAgICAgKiBAbWV0aG9kIGNsZWFyQ2hhckNhY2hlXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsZWFyQ2hhckNhY2hlICgpIHtcclxuICAgICAgICAgICAgaWYgKExhYmVsLl9zaGFyZUF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICBMYWJlbC5fc2hhcmVBdGxhcy5jbGVhckFsbENhY2hlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy8gRm9yIGNvbXBhdGliaWxpdHkgd2l0aCB2Mi4wLnggdGVtcG9yYXJ5IHJlc2VydmF0aW9uLlxyXG4gICAgICAgIGlmICh0aGlzLl9iYXRjaEFzQml0bWFwICYmIHRoaXMuY2FjaGVNb2RlID09PSBDYWNoZU1vZGUuTk9ORSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlTW9kZSA9IENhY2hlTW9kZS5CSVRNQVA7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhdGNoQXNCaXRtYXAgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgICAgICAgIC8vIENhY2hlTW9kZSBpcyBub3Qgc3VwcG9ydGVkIGluIENhbnZhcy5cclxuICAgICAgICAgICAgdGhpcy5jYWNoZU1vZGUgPSBDYWNoZU1vZGUuTk9ORTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG5cclxuICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIE5vZGUgc2l6ZVxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX25vZGVTaXplQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLnNldFZlcnRzRGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCB0aGlzLl9ub2RlQ29sb3JDaGFuZ2VkLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fbm9kZVNpemVDaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLnNldFZlcnRzRGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgdGhpcy5fbm9kZUNvbG9yQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmIHRoaXMuX2Fzc2VtYmxlci5fcmVzZXRBc3NlbWJsZXJEYXRhICYmIHRoaXMuX2Fzc2VtYmxlci5fcmVzZXRBc3NlbWJsZXJEYXRhKHRoaXMuX2Fzc2VtYmxlckRhdGEpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlckRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xldHRlclRleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl90dGZUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R0ZlRleHR1cmUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl90dGZUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX25vZGVTaXplQ2hhbmdlZCAoKSB7XHJcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgY29udGVudCBzaXplIGlzIGF1dG9tYXRpY2FsbHkgdXBkYXRlZCB3aGVuIG92ZXJmbG93IGlzIE5PTkUuXHJcbiAgICAgICAgLy8gQW5kIHRoaXMgd2lsbCBjb25mbGljdCB3aXRoIHRoZSBhbGlnbm1lbnQgb2YgdGhlIENDV2lkZ2V0LlxyXG4gICAgICAgIGlmIChDQ19FRElUT1IgfHwgdGhpcy5vdmVyZmxvdyAhPT0gT3ZlcmZsb3cuTk9ORSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9ub2RlQ29sb3JDaGFuZ2VkICgpIHtcclxuICAgICAgICBpZiAoISh0aGlzLmZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFZlcnRzRGlydHkoKSB7XHJcbiAgICAgICAgaWYoQ0NfSlNCICYmIHRoaXMuX25hdGl2ZVRURigpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlciAmJiB0aGlzLl9hc3NlbWJsZXIudXBkYXRlUmVuZGVyRGF0YSh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlQ29sb3IgKCkge1xyXG4gICAgICAgIGlmICghKHRoaXMuZm9udCBpbnN0YW5jZW9mIGNjLkJpdG1hcEZvbnQpKSB7XHJcbiAgICAgICAgICAgIGlmICghKHRoaXMuX3NyY0JsZW5kRmFjdG9yID09PSBjYy5tYWNyby5CbGVuZEZhY3Rvci5TUkNfQUxQSEEgJiYgdGhpcy5ub2RlLl9yZW5kZXJGbGFnICYgY2MuUmVuZGVyRmxvdy5GTEFHX09QQUNJVFkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBSZW5kZXJDb21wb25lbnQucHJvdG90eXBlLl91cGRhdGVDb2xvci5jYWxsKHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdmFsaWRhdGVSZW5kZXIgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tYXRlcmlhbHNbMF0pIHtcclxuICAgICAgICAgICAgbGV0IGZvbnQgPSB0aGlzLmZvbnQ7XHJcbiAgICAgICAgICAgIGlmIChmb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gZm9udC5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGVGcmFtZSAmJiBcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkgJiZcclxuICAgICAgICAgICAgICAgICAgICBmb250Ll9mbnRDb25maWcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVzZXRBc3NlbWJsZXIgKCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0RnJhbWUoKTtcclxuICAgICAgICBSZW5kZXJDb21wb25lbnQucHJvdG90eXBlLl9yZXNldEFzc2VtYmxlci5jYWxsKHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVzZXRGcmFtZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZyYW1lICYmICEodGhpcy5mb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlRnJvbUR5bmFtaWNBdGxhcyh0aGlzLCB0aGlzLl9mcmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jaGVja1N0cmluZ0VtcHR5ICgpIHtcclxuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIoISF0aGlzLnN0cmluZyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbjNETm9kZUNoYW5nZWQgKCkge1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlGb250VGV4dHVyZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25CTUZvbnRUZXh0dXJlTG9hZGVkICgpIHtcclxuICAgICAgICB0aGlzLl9mcmFtZS5fdGV4dHVyZSA9IHRoaXMuZm9udC5zcHJpdGVGcmFtZS5fdGV4dHVyZTtcclxuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZVJlbmRlckRhdGEodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkJsZW5kQ2hhbmdlZCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVzZVN5c3RlbUZvbnQgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XHJcbiAgICAgICAgICBcclxuICAgICAgICB0aGlzLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FwcGx5Rm9udFRleHR1cmUgKCkge1xyXG4gICAgICAgIGxldCBmb250ID0gdGhpcy5mb250O1xyXG4gICAgICAgIGlmIChmb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xyXG4gICAgICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBmb250LnNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZUZyYW1lLm9uVGV4dHVyZUxvYWRlZCh0aGlzLl9vbkJNRm9udFRleHR1cmVMb2FkZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZighdGhpcy5fbmF0aXZlVFRGKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gbmV3IExhYmVsRnJhbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVNb2RlID09PSBDYWNoZU1vZGUuQ0hBUikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xldHRlclRleHR1cmUgPSB0aGlzLl9hc3NlbWJsZXIuX2dldEFzc2VtYmxlckRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5fcmVmcmVzaFRleHR1cmUodGhpcy5fbGV0dGVyVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl90dGZUZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHRmVGV4dHVyZSA9IG5ldyBjYy5UZXh0dXJlMkQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXJEYXRhID0gdGhpcy5fYXNzZW1ibGVyLl9nZXRBc3NlbWJsZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHRmVGV4dHVyZS5pbml0V2l0aEVsZW1lbnQodGhpcy5fYXNzZW1ibGVyRGF0YS5jYW52YXMpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU1vZGUgIT09IENhY2hlTW9kZS5DSEFSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUuX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZS5fcmVmcmVzaFRleHR1cmUodGhpcy5fdHRmVGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NyY0JsZW5kRmFjdG9yID09PSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkUgJiYgIUNDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3R0ZlRleHR1cmUuc2V0UHJlbXVsdGlwbHlBbHBoYSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlciAmJiB0aGlzLl9hc3NlbWJsZXIudXBkYXRlUmVuZGVyRGF0YSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXJrRm9yVmFsaWRhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsQ2FudmFzICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fZnJhbWUuX3RleHR1cmUuX25hdGl2ZVVybCA9IHRoaXMudXVpZCArICdfdGV4dHVyZSc7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVNYXRlcmlhbFdlYmdsICgpIHtcclxuXHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCgwKTtcclxuICAgICAgICBpZih0aGlzLl9uYXRpdmVUVEYoKSkge1xyXG4gICAgICAgICAgICBpZihtYXRlcmlhbCkgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVUVEZNYXRlcmlhbCh0aGlzKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lKSByZXR1cm47XHJcbiAgICAgICAgbWF0ZXJpYWwgJiYgbWF0ZXJpYWwuc2V0UHJvcGVydHkoJ3RleHR1cmUnLCB0aGlzLl9mcmFtZS5fdGV4dHVyZSk7XHJcblxyXG4gICAgICAgIEJsZW5kRnVuYy5wcm90b3R5cGUuX3VwZGF0ZU1hdGVyaWFsLmNhbGwodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9mb3JjZVVzZUNhbnZhczogZmFsc2UsXHJcbiBcclxuICAgIF91c2VOYXRpdmVUVEYoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLm1hY3JvLkVOQUJMRV9OQVRJVkVfVFRGX1JFTkRFUkVSICYmICF0aGlzLl9mb3JjZVVzZUNhbnZhcztcclxuICAgIH0sIFxyXG5cclxuICAgIF9uYXRpdmVUVEYoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZU5hdGl2ZVRURigpICYmICEhdGhpcy5fYXNzZW1ibGVyICYmICEhdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVUVEZNYXRlcmlhbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcclxuICAgICAgICB0aGlzLl9hcHBseUZvbnRUZXh0dXJlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgYGxhYmVsLl9lbmFibGVCb2xkYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZUJvbGQgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZS5cclxuICAgICAqL1xyXG4gICAgX2VuYWJsZUJvbGQgKGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgY2Mud2FybignYGxhYmVsLl9lbmFibGVCb2xkYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZUJvbGQgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuYWJsZUJvbGQgPSAhIWVuYWJsZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgYGxhYmVsLl9lbmFibGVJdGFsaWNzYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZUl0YWxpY3MgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZS5cclxuICAgICAqL1xyXG4gICAgX2VuYWJsZUl0YWxpY3MgKGVuYWJsZWQpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgY2Mud2FybignYGxhYmVsLl9lbmFibGVJdGFsaWNzYCBpcyBkZXByZWNhdGVkLCB1c2UgYGxhYmVsLmVuYWJsZUl0YWxpY3MgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuYWJsZUl0YWxpYyA9ICEhZW5hYmxlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBgbGFiZWwuX2VuYWJsZVVuZGVybGluZWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBsYWJlbC5lbmFibGVVbmRlcmxpbmUgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZS5cclxuICAgICAqL1xyXG4gICAgX2VuYWJsZVVuZGVybGluZSAoZW5hYmxlZCkge1xyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdgbGFiZWwuX2VuYWJsZVVuZGVybGluZWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBsYWJlbC5lbmFibGVVbmRlcmxpbmUgPSB0cnVlYCBpbnN0ZWFkIHBsZWFzZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuYWJsZVVuZGVybGluZSA9ICEhZW5hYmxlZDtcclxuICAgIH0sXHJcbiB9KTtcclxuXHJcbiBjYy5MYWJlbCA9IG1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9