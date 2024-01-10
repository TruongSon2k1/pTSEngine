
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCRichText.js';
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
var js = require('../platform/js');

var macro = require('../platform/CCMacro');

var textUtils = require('../utils/text-utils');

var HtmlTextParser = require('../utils/html-text-parser');

var _htmlTextParser = new HtmlTextParser();

var HorizontalAlign = macro.TextAlignment;
var VerticalAlign = macro.VerticalTextAlignment;
var RichTextChildName = "RICHTEXT_CHILD";
var RichTextChildImageName = "RICHTEXT_Image_CHILD";
var CacheMode = cc.Label.CacheMode; // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, arguments);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, arguments);
  };
}
/**
 * RichText pool
 */


var pool = new js.Pool(function (node) {
  if (CC_EDITOR) {
    cc.isValid(node) && node.destroy();
    return false;
  }

  if (CC_DEV) {
    cc.assert(!node._parent, 'Recycling node\'s parent should be null!');
  }

  if (!cc.isValid(node)) {
    return false;
  } else {
    var outline = node.getComponent(cc.LabelOutline);

    if (outline) {
      outline.width = 0;
    }
  }

  return true;
}, 20);

pool.get = function (string, richtext) {
  var labelNode = this._get();

  if (!labelNode) {
    labelNode = new cc.PrivateNode(RichTextChildName);
  }

  labelNode.setPosition(0, 0);
  labelNode.setAnchorPoint(0.5, 0.5);
  labelNode.skewX = 0;
  var labelComponent = labelNode.getComponent(cc.Label);

  if (!labelComponent) {
    labelComponent = labelNode.addComponent(cc.Label);
  }

  labelComponent.string = "";
  labelComponent.horizontalAlign = HorizontalAlign.LEFT;
  labelComponent.verticalAlign = VerticalAlign.CENTER;
  labelComponent._forceUseCanvas = true;
  return labelNode;
};
/**
 * !#en The RichText Component.
 * !#zh 富文本组件
 * @class RichText
 * @extends Component
 */


var RichText = cc.Class({
  name: 'cc.RichText',
  "extends": cc.Component,
  ctor: function ctor() {
    this._textArray = null;
    this._labelSegments = [];
    this._labelSegmentsCache = [];
    this._linesWidth = [];

    if (CC_EDITOR) {
      this._userDefinedFont = null;
      this._updateRichTextStatus = debounce(this._updateRichText, 200);
    } else {
      this._updateRichTextStatus = this._updateRichText;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/RichText',
    help: 'i18n:COMPONENT.help_url.richtext',
    inspector: 'packages://inspector/inspectors/comps/richtext.js',
    executeInEditMode: true
  },
  properties: {
    /**
     * !#en Content string of RichText.
     * !#zh 富文本显示的文本内容。
     * @property {String} string
     */
    string: {
      "default": '<color=#00ff00>Rich</c><color=#0fffff>Text</color>',
      multiline: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.string',
      notify: function notify() {
        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Horizontal Alignment of each line in RichText.
     * !#zh 文本内容的水平对齐方式。
     * @property {macro.TextAlignment} horizontalAlign
     */
    horizontalAlign: {
      "default": HorizontalAlign.LEFT,
      type: HorizontalAlign,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.horizontal_align',
      animatable: false,
      notify: function notify(oldValue) {
        if (this.horizontalAlign === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Font size of RichText.
     * !#zh 富文本字体大小。
     * @property {Number} fontSize
     */
    fontSize: {
      "default": 40,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font_size',
      notify: function notify(oldValue) {
        if (this.fontSize === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Custom System font of RichText
     * !#zh 富文本定制系统字体
     * @property {String} fontFamily
     */
    _fontFamily: "Arial",
    fontFamily: {
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font_family',
      get: function get() {
        return this._fontFamily;
      },
      set: function set(value) {
        if (this._fontFamily === value) return;
        this._fontFamily = value;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      },
      animatable: false
    },

    /**
     * !#en Custom TTF font of RichText
     * !#zh  富文本定制字体
     * @property {cc.TTFFont} font
     */
    font: {
      "default": null,
      type: cc.TTFFont,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.font',
      notify: function notify(oldValue) {
        if (this.font === oldValue) return;
        this._layoutDirty = true;

        if (this.font) {
          if (CC_EDITOR) {
            this._userDefinedFont = this.font;
          }

          this.useSystemFont = false;

          this._onTTFLoaded();
        } else {
          this.useSystemFont = true;
        }

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Whether use system font name or not.
     * !#zh 是否使用系统字体。
     * @property {Boolean} useSystemFont
     */
    _isSystemFontUsed: true,
    useSystemFont: {
      get: function get() {
        return this._isSystemFontUsed;
      },
      set: function set(value) {
        if (this._isSystemFontUsed === value) {
          return;
        }

        this._isSystemFontUsed = value;

        if (CC_EDITOR) {
          if (value) {
            this.font = null;
          } else if (this._userDefinedFont) {
            this.font = this._userDefinedFont;
            return;
          }
        }

        this._layoutDirty = true;

        this._updateRichTextStatus();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.system_font'
    },

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

        this._updateRichTextStatus();
      },
      animatable: false
    },

    /**
     * !#en The maximize width of the RichText
     * !#zh 富文本的最大宽度
     * @property {Number} maxWidth
     */
    maxWidth: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.max_width',
      notify: function notify(oldValue) {
        if (this.maxWidth === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en Line Height of RichText.
     * !#zh 富文本行高。
     * @property {Number} lineHeight
     */
    lineHeight: {
      "default": 40,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.line_height',
      notify: function notify(oldValue) {
        if (this.lineHeight === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas.
     * !#zh 对于 img 标签里面的 src 属性名称，都需要在 imageAtlas 里面找到一个有效的 spriteFrame，否则 img tag 会判定为无效。
     * @property {SpriteAtlas} imageAtlas
     */
    imageAtlas: {
      "default": null,
      type: cc.SpriteAtlas,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.image_atlas',
      notify: function notify(oldValue) {
        if (this.imageAtlas === oldValue) return;
        this._layoutDirty = true;

        this._updateRichTextStatus();
      }
    },

    /**
     * !#en
     * Once checked, the RichText will block all input events (mouse and touch) within
     * the bounding box of the node, preventing the input from penetrating into the underlying node.
     * !#zh
     * 选中此选项后，RichText 将阻止节点边界框中的所有输入事件（鼠标和触摸），从而防止输入事件穿透到底层节点。
     * @property {Boolean} handleTouchEvent
     * @default true
     */
    handleTouchEvent: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.richtext.handleTouchEvent',
      notify: function notify(oldValue) {
        if (this.handleTouchEvent === oldValue) return;

        if (this.enabledInHierarchy) {
          this.handleTouchEvent ? this._addEventListeners() : this._removeEventListeners();
        }
      }
    }
  },
  statics: {
    HorizontalAlign: HorizontalAlign,
    VerticalAlign: VerticalAlign
  },
  onEnable: function onEnable() {
    if (this.handleTouchEvent) {
      this._addEventListeners();
    }

    this._updateRichText();

    this._activateChildren(true);
  },
  onDisable: function onDisable() {
    if (this.handleTouchEvent) {
      this._removeEventListeners();
    }

    this._activateChildren(false);
  },
  start: function start() {
    this._onTTFLoaded();
  },
  _onColorChanged: function _onColorChanged(parentColor) {
    var children = this.node.children;
    children.forEach(function (childNode) {
      childNode.color = parentColor;
    });
  },
  _addEventListeners: function _addEventListeners() {
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(cc.Node.EventType.COLOR_CHANGED, this._onColorChanged, this);
  },
  _removeEventListeners: function _removeEventListeners() {
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(cc.Node.EventType.COLOR_CHANGED, this._onColorChanged, this);
  },
  _updateLabelSegmentTextAttributes: function _updateLabelSegmentTextAttributes() {
    this._labelSegments.forEach(function (item) {
      this._applyTextAttribute(item, null, true);
    }.bind(this));
  },
  _createFontLabel: function _createFontLabel(string) {
    return pool.get(string, this);
  },
  _onTTFLoaded: function _onTTFLoaded() {
    if (this.font instanceof cc.TTFFont) {
      if (this.font._nativeAsset) {
        this._layoutDirty = true;

        this._updateRichText();
      } else {
        var self = this;
        cc.assetManager.postLoadNative(this.font, function (err) {
          self._layoutDirty = true;

          self._updateRichText();
        });
      }
    } else {
      this._layoutDirty = true;

      this._updateRichText();
    }
  },
  _measureText: function _measureText(styleIndex, string) {
    var self = this;

    var func = function func(string) {
      var label;

      if (self._labelSegmentsCache.length === 0) {
        label = self._createFontLabel(string);

        self._labelSegmentsCache.push(label);
      } else {
        label = self._labelSegmentsCache[0];
      }

      label._styleIndex = styleIndex;

      self._applyTextAttribute(label, string, true);

      var labelSize = label.getContentSize();
      return labelSize.width;
    };

    if (string) {
      return func(string);
    } else {
      return func;
    }
  },
  _onTouchEnded: function _onTouchEnded(event) {
    var _this = this;

    var components = this.node.getComponents(cc.Component);

    var _loop = function _loop(i) {
      var labelSegment = _this._labelSegments[i];
      var clickHandler = labelSegment._clickHandler;
      var clickParam = labelSegment._clickParam;

      if (clickHandler && _this._containsTouchLocation(labelSegment, event.touch.getLocation())) {
        components.forEach(function (component) {
          if (component.enabledInHierarchy && component[clickHandler]) {
            component[clickHandler](event, clickParam);
          }
        });
        event.stopPropagation();
      }
    };

    for (var i = 0; i < this._labelSegments.length; ++i) {
      _loop(i);
    }
  },
  _containsTouchLocation: function _containsTouchLocation(label, point) {
    var myRect = label.getBoundingBoxToWorld();
    return myRect.contains(point);
  },
  _resetState: function _resetState() {
    var children = this.node.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        if (child.parent === this.node) {
          child.parent = null;
        } else {
          // In case child.parent !== this.node, child cannot be removed from children
          children.splice(i, 1);
        }

        if (child.name === RichTextChildName) {
          pool.put(child);
        }
      }
    }

    this._labelSegments.length = 0;
    this._labelSegmentsCache.length = 0;
    this._linesWidth.length = 0;
    this._lineOffsetX = 0;
    this._lineCount = 1;
    this._labelWidth = 0;
    this._labelHeight = 0;
    this._layoutDirty = true;
  },
  onRestore: CC_EDITOR && function () {
    // TODO: refine undo/redo system
    // Because undo/redo will not call onEnable/onDisable,
    // we need call onEnable/onDisable manually to active/disactive children nodes.
    if (this.enabledInHierarchy) {
      this.onEnable();
    } else {
      this.onDisable();
    }
  },
  _activateChildren: function _activateChildren(active) {
    for (var i = this.node.children.length - 1; i >= 0; i--) {
      var child = this.node.children[i];

      if (child.name === RichTextChildName || child.name === RichTextChildImageName) {
        child.active = active;
      }
    }
  },
  _addLabelSegment: function _addLabelSegment(stringToken, styleIndex) {
    var labelSegment;

    if (this._labelSegmentsCache.length === 0) {
      labelSegment = this._createFontLabel(stringToken);
    } else {
      labelSegment = this._labelSegmentsCache.pop();
    }

    labelSegment._styleIndex = styleIndex;
    labelSegment._lineCount = this._lineCount;
    labelSegment.active = this.node.active;
    labelSegment.setAnchorPoint(0, 0);

    this._applyTextAttribute(labelSegment, stringToken);

    this.node.addChild(labelSegment);

    this._labelSegments.push(labelSegment);

    return labelSegment;
  },
  _updateRichTextWithMaxWidth: function _updateRichTextWithMaxWidth(labelString, labelWidth, styleIndex) {
    var fragmentWidth = labelWidth;
    var labelSegment;

    if (this._lineOffsetX > 0 && fragmentWidth + this._lineOffsetX > this.maxWidth) {
      //concat previous line
      var checkStartIndex = 0;

      while (this._lineOffsetX <= this.maxWidth) {
        var checkEndIndex = this._getFirstWordLen(labelString, checkStartIndex, labelString.length);

        var checkString = labelString.substr(checkStartIndex, checkEndIndex);

        var checkStringWidth = this._measureText(styleIndex, checkString);

        if (this._lineOffsetX + checkStringWidth <= this.maxWidth) {
          this._lineOffsetX += checkStringWidth;
          checkStartIndex += checkEndIndex;
        } else {
          if (checkStartIndex > 0) {
            var remainingString = labelString.substr(0, checkStartIndex);

            this._addLabelSegment(remainingString, styleIndex);

            labelString = labelString.substr(checkStartIndex, labelString.length);
            fragmentWidth = this._measureText(styleIndex, labelString);
          }

          this._updateLineInfo();

          break;
        }
      }
    }

    if (fragmentWidth > this.maxWidth) {
      var fragments = textUtils.fragmentText(labelString, fragmentWidth, this.maxWidth, this._measureText(styleIndex));

      for (var k = 0; k < fragments.length; ++k) {
        var splitString = fragments[k];
        labelSegment = this._addLabelSegment(splitString, styleIndex);
        var labelSize = labelSegment.getContentSize();
        this._lineOffsetX += labelSize.width;

        if (fragments.length > 1 && k < fragments.length - 1) {
          this._updateLineInfo();
        }
      }
    } else {
      this._lineOffsetX += fragmentWidth;

      this._addLabelSegment(labelString, styleIndex);
    }
  },
  _isLastComponentCR: function _isLastComponentCR(stringToken) {
    return stringToken.length - 1 === stringToken.lastIndexOf("\n");
  },
  _updateLineInfo: function _updateLineInfo() {
    this._linesWidth.push(this._lineOffsetX);

    this._lineOffsetX = 0;
    this._lineCount++;
  },
  _needsUpdateTextLayout: function _needsUpdateTextLayout(newTextArray) {
    if (this._layoutDirty || !this._textArray || !newTextArray) {
      return true;
    }

    if (this._textArray.length !== newTextArray.length) {
      return true;
    }

    for (var i = 0; i < this._textArray.length; ++i) {
      var oldItem = this._textArray[i];
      var newItem = newTextArray[i];

      if (oldItem.text !== newItem.text) {
        return true;
      } else {
        var oldStyle = oldItem.style,
            newStyle = newItem.style;

        if (oldStyle) {
          if (newStyle) {
            if (!oldStyle.outline !== !newStyle.outline) {
              return true;
            }

            if (oldStyle.size !== newStyle.size || !oldStyle.italic !== !newStyle.italic || oldStyle.isImage !== newStyle.isImage) {
              return true;
            }

            if (oldStyle.src !== newStyle.src || oldStyle.imageAlign !== newStyle.imageAlign || oldStyle.imageHeight !== newStyle.imageHeight || oldStyle.imageWidth !== newStyle.imageWidth || oldStyle.imageOffset !== newStyle.imageOffset) {
              return true;
            }
          } else {
            if (oldStyle.size || oldStyle.italic || oldStyle.isImage || oldStyle.outline) {
              return true;
            }
          }
        } else {
          if (newStyle) {
            if (newStyle.size || newStyle.italic || newStyle.isImage || newStyle.outline) {
              return true;
            }
          }
        }
      }
    }

    return false;
  },
  _addRichTextImageElement: function _addRichTextImageElement(richTextElement) {
    var spriteFrameName = richTextElement.style.src;
    var spriteFrame = this.imageAtlas.getSpriteFrame(spriteFrameName);

    if (spriteFrame) {
      var spriteNode = new cc.PrivateNode(RichTextChildImageName);
      var spriteComponent = spriteNode.addComponent(cc.Sprite);

      switch (richTextElement.style.imageAlign) {
        case 'top':
          spriteNode.setAnchorPoint(0, 1);
          break;

        case 'center':
          spriteNode.setAnchorPoint(0, 0.5);
          break;

        default:
          spriteNode.setAnchorPoint(0, 0);
          break;
      }

      if (richTextElement.style.imageOffset) spriteNode._imageOffset = richTextElement.style.imageOffset;
      spriteComponent.type = cc.Sprite.Type.SLICED;
      spriteComponent.sizeMode = cc.Sprite.SizeMode.CUSTOM;
      this.node.addChild(spriteNode);

      this._labelSegments.push(spriteNode);

      var spriteRect = spriteFrame.getRect();
      var scaleFactor = 1;
      var spriteWidth = spriteRect.width;
      var spriteHeight = spriteRect.height;
      var expectWidth = richTextElement.style.imageWidth;
      var expectHeight = richTextElement.style.imageHeight;

      if (expectHeight > 0) {
        scaleFactor = expectHeight / spriteHeight;
        spriteWidth = spriteWidth * scaleFactor;
        spriteHeight = spriteHeight * scaleFactor;
      } else {
        scaleFactor = this.lineHeight / spriteHeight;
        spriteWidth = spriteWidth * scaleFactor;
        spriteHeight = spriteHeight * scaleFactor;
      }

      if (expectWidth > 0) spriteWidth = expectWidth;

      if (this.maxWidth > 0) {
        if (this._lineOffsetX + spriteWidth > this.maxWidth) {
          this._updateLineInfo();
        }

        this._lineOffsetX += spriteWidth;
      } else {
        this._lineOffsetX += spriteWidth;

        if (this._lineOffsetX > this._labelWidth) {
          this._labelWidth = this._lineOffsetX;
        }
      }

      spriteComponent.spriteFrame = spriteFrame;
      spriteNode.setContentSize(spriteWidth, spriteHeight);
      spriteNode._lineCount = this._lineCount;

      if (richTextElement.style.event) {
        if (richTextElement.style.event.click) {
          spriteNode._clickHandler = richTextElement.style.event.click;
        }

        if (richTextElement.style.event.param) {
          spriteNode._clickParam = richTextElement.style.event.param;
        } else {
          spriteNode._clickParam = '';
        }
      } else {
        spriteNode._clickHandler = null;
      }
    } else {
      cc.warnID(4400);
    }
  },
  _updateRichText: function _updateRichText() {
    if (!this.enabledInHierarchy) return;

    var newTextArray = _htmlTextParser.parse(this.string);

    if (!this._needsUpdateTextLayout(newTextArray)) {
      this._textArray = newTextArray;

      this._updateLabelSegmentTextAttributes();

      return;
    }

    this._textArray = newTextArray;

    this._resetState();

    var lastEmptyLine = false;
    var label;
    var labelSize;

    for (var i = 0; i < this._textArray.length; ++i) {
      var richTextElement = this._textArray[i];
      var text = richTextElement.text; //handle <br/> <img /> tag

      if (text === "") {
        if (richTextElement.style && richTextElement.style.newline) {
          this._updateLineInfo();

          continue;
        }

        if (richTextElement.style && richTextElement.style.isImage && this.imageAtlas) {
          this._addRichTextImageElement(richTextElement);

          continue;
        }
      }

      var multilineTexts = text.split("\n");

      for (var j = 0; j < multilineTexts.length; ++j) {
        var labelString = multilineTexts[j];

        if (labelString === "") {
          //for continues \n
          if (this._isLastComponentCR(text) && j === multilineTexts.length - 1) {
            continue;
          }

          this._updateLineInfo();

          lastEmptyLine = true;
          continue;
        }

        lastEmptyLine = false;

        if (this.maxWidth > 0) {
          var labelWidth = this._measureText(i, labelString);

          this._updateRichTextWithMaxWidth(labelString, labelWidth, i);

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        } else {
          label = this._addLabelSegment(labelString, i);
          labelSize = label.getContentSize();
          this._lineOffsetX += labelSize.width;

          if (this._lineOffsetX > this._labelWidth) {
            this._labelWidth = this._lineOffsetX;
          }

          if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
            this._updateLineInfo();
          }
        }
      }
    }

    if (!lastEmptyLine) {
      this._linesWidth.push(this._lineOffsetX);
    }

    if (this.maxWidth > 0) {
      this._labelWidth = this.maxWidth;
    }

    this._labelHeight = (this._lineCount + textUtils.BASELINE_RATIO) * this.lineHeight; // trigger "size-changed" event

    this.node.setContentSize(this._labelWidth, this._labelHeight);

    this._updateRichTextPosition();

    this._layoutDirty = false;
  },
  _getFirstWordLen: function _getFirstWordLen(text, startIndex, textLen) {
    var character = text.charAt(startIndex);

    if (textUtils.isUnicodeCJK(character) || textUtils.isUnicodeSpace(character)) {
      return 1;
    }

    var len = 1;

    for (var index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);

      if (textUtils.isUnicodeSpace(character) || textUtils.isUnicodeCJK(character)) {
        break;
      }

      len++;
    }

    return len;
  },
  _updateRichTextPosition: function _updateRichTextPosition() {
    var nextTokenX = 0;
    var nextLineIndex = 1;
    var totalLineCount = this._lineCount;

    for (var i = 0; i < this._labelSegments.length; ++i) {
      var label = this._labelSegments[i];
      var lineCount = label._lineCount;

      if (lineCount > nextLineIndex) {
        nextTokenX = 0;
        nextLineIndex = lineCount;
      }

      var lineOffsetX = 0; // let nodeAnchorXOffset = (0.5 - this.node.anchorX) * this._labelWidth;

      switch (this.horizontalAlign) {
        case HorizontalAlign.LEFT:
          lineOffsetX = -this._labelWidth / 2;
          break;

        case HorizontalAlign.CENTER:
          lineOffsetX = -this._linesWidth[lineCount - 1] / 2;
          break;

        case HorizontalAlign.RIGHT:
          lineOffsetX = this._labelWidth / 2 - this._linesWidth[lineCount - 1];
          break;

        default:
          break;
      }

      label.x = nextTokenX + lineOffsetX;
      var labelSize = label.getContentSize();
      label.y = this.lineHeight * (totalLineCount - lineCount) - this._labelHeight / 2;

      if (lineCount === nextLineIndex) {
        nextTokenX += labelSize.width;
      }

      var sprite = label.getComponent(cc.Sprite);

      if (sprite) {
        // adjust img align (from <img align=top|center|bottom>)
        var lineHeightSet = this.lineHeight;
        var lineHeightReal = this.lineHeight * (1 + textUtils.BASELINE_RATIO); //single line node height

        switch (label.anchorY) {
          case 1:
            label.y += lineHeightSet + (lineHeightReal - lineHeightSet) / 2;
            break;

          case 0.5:
            label.y += lineHeightReal / 2;
            break;

          default:
            label.y += (lineHeightReal - lineHeightSet) / 2;
            break;
        } // adjust img offset (from <img offset=12|12,34>)


        if (label._imageOffset) {
          var offsets = label._imageOffset.split(',');

          if (offsets.length === 1 && offsets[0]) {
            var offsetY = parseFloat(offsets[0]);
            if (Number.isInteger(offsetY)) label.y += offsetY;
          } else if (offsets.length === 2) {
            var offsetX = parseFloat(offsets[0]);

            var _offsetY = parseFloat(offsets[1]);

            if (Number.isInteger(offsetX)) label.x += offsetX;
            if (Number.isInteger(_offsetY)) label.y += _offsetY;
          }
        }
      } //adjust y for label with outline


      var outline = label.getComponent(cc.LabelOutline);
      if (outline && outline.width) label.y = label.y - outline.width;
    }
  },
  _convertLiteralColorValue: function _convertLiteralColorValue(color) {
    var colorValue = color.toUpperCase();

    if (cc.Color[colorValue]) {
      return cc.Color[colorValue];
    } else {
      var out = cc.color();
      return out.fromHEX(color);
    }
  },
  // When string is null, it means that the text does not need to be updated.
  _applyTextAttribute: function _applyTextAttribute(labelNode, string, force) {
    var labelComponent = labelNode.getComponent(cc.Label);

    if (!labelComponent) {
      return;
    }

    var index = labelNode._styleIndex;
    var textStyle = null;

    if (this._textArray[index]) {
      textStyle = this._textArray[index].style;
    }

    if (textStyle && textStyle.color) {
      labelNode.color = this._convertLiteralColorValue(textStyle.color);
    } else {
      labelNode.color = this.node.color;
    }

    labelComponent.cacheMode = this.cacheMode;
    var isAsset = this.font instanceof cc.Font;

    if (isAsset && !this._isSystemFontUsed) {
      labelComponent.font = this.font;
    } else {
      labelComponent.fontFamily = this.fontFamily;
    }

    labelComponent.useSystemFont = this._isSystemFontUsed;
    labelComponent.lineHeight = this.lineHeight;
    labelComponent.enableBold = textStyle && textStyle.bold;
    labelComponent.enableItalics = textStyle && textStyle.italic; //TODO: temporary implementation, the italic effect should be implemented in the internal of label-assembler.

    if (textStyle && textStyle.italic) {
      labelNode.skewX = 12;
    }

    labelComponent.enableUnderline = textStyle && textStyle.underline;

    if (textStyle && textStyle.outline) {
      var labelOutlineComponent = labelNode.getComponent(cc.LabelOutline);

      if (!labelOutlineComponent) {
        labelOutlineComponent = labelNode.addComponent(cc.LabelOutline);
      }

      labelOutlineComponent.color = this._convertLiteralColorValue(textStyle.outline.color);
      labelOutlineComponent.width = textStyle.outline.width;
    }

    if (textStyle && textStyle.size) {
      labelComponent.fontSize = textStyle.size;
    } else {
      labelComponent.fontSize = this.fontSize;
    }

    if (string !== null) {
      if (typeof string !== 'string') {
        string = '' + string;
      }

      labelComponent.string = string;
    }

    force && labelComponent._forceUpdateRenderData();

    if (textStyle && textStyle.event) {
      if (textStyle.event.click) {
        labelNode._clickHandler = textStyle.event.click;
      }

      if (textStyle.event.param) {
        labelNode._clickParam = textStyle.event.param;
      } else {
        labelNode._clickParam = '';
      }
    } else {
      labelNode._clickHandler = null;
    }
  },
  onDestroy: function onDestroy() {
    for (var i = 0; i < this._labelSegments.length; ++i) {
      this._labelSegments[i].removeFromParent();

      pool.put(this._labelSegments[i]);
    }
  }
});
cc.RichText = module.exports = RichText;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDUmljaFRleHQuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwibWFjcm8iLCJ0ZXh0VXRpbHMiLCJIdG1sVGV4dFBhcnNlciIsIl9odG1sVGV4dFBhcnNlciIsIkhvcml6b250YWxBbGlnbiIsIlRleHRBbGlnbm1lbnQiLCJWZXJ0aWNhbEFsaWduIiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwiUmljaFRleHRDaGlsZE5hbWUiLCJSaWNoVGV4dENoaWxkSW1hZ2VOYW1lIiwiQ2FjaGVNb2RlIiwiY2MiLCJMYWJlbCIsImRlYm91bmNlIiwiZnVuYyIsIndhaXQiLCJpbW1lZGlhdGUiLCJ0aW1lb3V0IiwiY29udGV4dCIsImxhdGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJjYWxsTm93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInBvb2wiLCJQb29sIiwibm9kZSIsIkNDX0VESVRPUiIsImlzVmFsaWQiLCJkZXN0cm95IiwiQ0NfREVWIiwiYXNzZXJ0IiwiX3BhcmVudCIsIm91dGxpbmUiLCJnZXRDb21wb25lbnQiLCJMYWJlbE91dGxpbmUiLCJ3aWR0aCIsImdldCIsInN0cmluZyIsInJpY2h0ZXh0IiwibGFiZWxOb2RlIiwiX2dldCIsIlByaXZhdGVOb2RlIiwic2V0UG9zaXRpb24iLCJzZXRBbmNob3JQb2ludCIsInNrZXdYIiwibGFiZWxDb21wb25lbnQiLCJhZGRDb21wb25lbnQiLCJob3Jpem9udGFsQWxpZ24iLCJMRUZUIiwidmVydGljYWxBbGlnbiIsIkNFTlRFUiIsIl9mb3JjZVVzZUNhbnZhcyIsIlJpY2hUZXh0IiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiY3RvciIsIl90ZXh0QXJyYXkiLCJfbGFiZWxTZWdtZW50cyIsIl9sYWJlbFNlZ21lbnRzQ2FjaGUiLCJfbGluZXNXaWR0aCIsIl91c2VyRGVmaW5lZEZvbnQiLCJfdXBkYXRlUmljaFRleHRTdGF0dXMiLCJfdXBkYXRlUmljaFRleHQiLCJlZGl0b3IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIm11bHRpbGluZSIsInRvb2x0aXAiLCJub3RpZnkiLCJ0eXBlIiwiYW5pbWF0YWJsZSIsIm9sZFZhbHVlIiwiX2xheW91dERpcnR5IiwiZm9udFNpemUiLCJfZm9udEZhbWlseSIsImZvbnRGYW1pbHkiLCJzZXQiLCJ2YWx1ZSIsImZvbnQiLCJUVEZGb250IiwidXNlU3lzdGVtRm9udCIsIl9vblRURkxvYWRlZCIsIl9pc1N5c3RlbUZvbnRVc2VkIiwiY2FjaGVNb2RlIiwiTk9ORSIsIm1heFdpZHRoIiwibGluZUhlaWdodCIsImltYWdlQXRsYXMiLCJTcHJpdGVBdGxhcyIsImhhbmRsZVRvdWNoRXZlbnQiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJfcmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJzdGF0aWNzIiwib25FbmFibGUiLCJfYWN0aXZhdGVDaGlsZHJlbiIsIm9uRGlzYWJsZSIsInN0YXJ0IiwiX29uQ29sb3JDaGFuZ2VkIiwicGFyZW50Q29sb3IiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZE5vZGUiLCJjb2xvciIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsIl9vblRvdWNoRW5kZWQiLCJDT0xPUl9DSEFOR0VEIiwib2ZmIiwiX3VwZGF0ZUxhYmVsU2VnbWVudFRleHRBdHRyaWJ1dGVzIiwiaXRlbSIsIl9hcHBseVRleHRBdHRyaWJ1dGUiLCJiaW5kIiwiX2NyZWF0ZUZvbnRMYWJlbCIsIl9uYXRpdmVBc3NldCIsInNlbGYiLCJhc3NldE1hbmFnZXIiLCJwb3N0TG9hZE5hdGl2ZSIsImVyciIsIl9tZWFzdXJlVGV4dCIsInN0eWxlSW5kZXgiLCJsYWJlbCIsImxlbmd0aCIsInB1c2giLCJfc3R5bGVJbmRleCIsImxhYmVsU2l6ZSIsImdldENvbnRlbnRTaXplIiwiZXZlbnQiLCJjb21wb25lbnRzIiwiZ2V0Q29tcG9uZW50cyIsImkiLCJsYWJlbFNlZ21lbnQiLCJjbGlja0hhbmRsZXIiLCJfY2xpY2tIYW5kbGVyIiwiY2xpY2tQYXJhbSIsIl9jbGlja1BhcmFtIiwiX2NvbnRhaW5zVG91Y2hMb2NhdGlvbiIsInRvdWNoIiwiZ2V0TG9jYXRpb24iLCJjb21wb25lbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJwb2ludCIsIm15UmVjdCIsImdldEJvdW5kaW5nQm94VG9Xb3JsZCIsImNvbnRhaW5zIiwiX3Jlc2V0U3RhdGUiLCJjaGlsZCIsInBhcmVudCIsInNwbGljZSIsInB1dCIsIl9saW5lT2Zmc2V0WCIsIl9saW5lQ291bnQiLCJfbGFiZWxXaWR0aCIsIl9sYWJlbEhlaWdodCIsIm9uUmVzdG9yZSIsImFjdGl2ZSIsIl9hZGRMYWJlbFNlZ21lbnQiLCJzdHJpbmdUb2tlbiIsInBvcCIsImFkZENoaWxkIiwiX3VwZGF0ZVJpY2hUZXh0V2l0aE1heFdpZHRoIiwibGFiZWxTdHJpbmciLCJsYWJlbFdpZHRoIiwiZnJhZ21lbnRXaWR0aCIsImNoZWNrU3RhcnRJbmRleCIsImNoZWNrRW5kSW5kZXgiLCJfZ2V0Rmlyc3RXb3JkTGVuIiwiY2hlY2tTdHJpbmciLCJzdWJzdHIiLCJjaGVja1N0cmluZ1dpZHRoIiwicmVtYWluaW5nU3RyaW5nIiwiX3VwZGF0ZUxpbmVJbmZvIiwiZnJhZ21lbnRzIiwiZnJhZ21lbnRUZXh0IiwiayIsInNwbGl0U3RyaW5nIiwiX2lzTGFzdENvbXBvbmVudENSIiwibGFzdEluZGV4T2YiLCJfbmVlZHNVcGRhdGVUZXh0TGF5b3V0IiwibmV3VGV4dEFycmF5Iiwib2xkSXRlbSIsIm5ld0l0ZW0iLCJ0ZXh0Iiwib2xkU3R5bGUiLCJzdHlsZSIsIm5ld1N0eWxlIiwic2l6ZSIsIml0YWxpYyIsImlzSW1hZ2UiLCJzcmMiLCJpbWFnZUFsaWduIiwiaW1hZ2VIZWlnaHQiLCJpbWFnZVdpZHRoIiwiaW1hZ2VPZmZzZXQiLCJfYWRkUmljaFRleHRJbWFnZUVsZW1lbnQiLCJyaWNoVGV4dEVsZW1lbnQiLCJzcHJpdGVGcmFtZU5hbWUiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwic3ByaXRlTm9kZSIsInNwcml0ZUNvbXBvbmVudCIsIlNwcml0ZSIsIl9pbWFnZU9mZnNldCIsIlR5cGUiLCJTTElDRUQiLCJzaXplTW9kZSIsIlNpemVNb2RlIiwiQ1VTVE9NIiwic3ByaXRlUmVjdCIsImdldFJlY3QiLCJzY2FsZUZhY3RvciIsInNwcml0ZVdpZHRoIiwic3ByaXRlSGVpZ2h0IiwiaGVpZ2h0IiwiZXhwZWN0V2lkdGgiLCJleHBlY3RIZWlnaHQiLCJzZXRDb250ZW50U2l6ZSIsImNsaWNrIiwicGFyYW0iLCJ3YXJuSUQiLCJwYXJzZSIsImxhc3RFbXB0eUxpbmUiLCJuZXdsaW5lIiwibXVsdGlsaW5lVGV4dHMiLCJzcGxpdCIsImoiLCJCQVNFTElORV9SQVRJTyIsIl91cGRhdGVSaWNoVGV4dFBvc2l0aW9uIiwic3RhcnRJbmRleCIsInRleHRMZW4iLCJjaGFyYWN0ZXIiLCJjaGFyQXQiLCJpc1VuaWNvZGVDSksiLCJpc1VuaWNvZGVTcGFjZSIsImxlbiIsImluZGV4IiwibmV4dFRva2VuWCIsIm5leHRMaW5lSW5kZXgiLCJ0b3RhbExpbmVDb3VudCIsImxpbmVDb3VudCIsImxpbmVPZmZzZXRYIiwiUklHSFQiLCJ4IiwieSIsInNwcml0ZSIsImxpbmVIZWlnaHRTZXQiLCJsaW5lSGVpZ2h0UmVhbCIsImFuY2hvclkiLCJvZmZzZXRzIiwib2Zmc2V0WSIsInBhcnNlRmxvYXQiLCJOdW1iZXIiLCJpc0ludGVnZXIiLCJvZmZzZXRYIiwiX2NvbnZlcnRMaXRlcmFsQ29sb3JWYWx1ZSIsImNvbG9yVmFsdWUiLCJ0b1VwcGVyQ2FzZSIsIkNvbG9yIiwib3V0IiwiZnJvbUhFWCIsImZvcmNlIiwidGV4dFN0eWxlIiwiaXNBc3NldCIsIkZvbnQiLCJlbmFibGVCb2xkIiwiYm9sZCIsImVuYWJsZUl0YWxpY3MiLCJlbmFibGVVbmRlcmxpbmUiLCJ1bmRlcmxpbmUiLCJsYWJlbE91dGxpbmVDb21wb25lbnQiLCJfZm9yY2VVcGRhdGVSZW5kZXJEYXRhIiwib25EZXN0cm95IiwicmVtb3ZlRnJvbVBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWxCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLHFCQUFELENBQXJCOztBQUNBLElBQU1FLFNBQVMsR0FBR0YsT0FBTyxDQUFDLHFCQUFELENBQXpCOztBQUNBLElBQU1HLGNBQWMsR0FBR0gsT0FBTyxDQUFDLDJCQUFELENBQTlCOztBQUNBLElBQU1JLGVBQWUsR0FBRyxJQUFJRCxjQUFKLEVBQXhCOztBQUVBLElBQU1FLGVBQWUsR0FBR0osS0FBSyxDQUFDSyxhQUE5QjtBQUNBLElBQU1DLGFBQWEsR0FBR04sS0FBSyxDQUFDTyxxQkFBNUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxnQkFBMUI7QUFDQSxJQUFNQyxzQkFBc0IsR0FBRyxzQkFBL0I7QUFDQSxJQUFNQyxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTRixTQUEzQixFQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFNBQVNHLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxJQUF4QixFQUE4QkMsU0FBOUIsRUFBeUM7QUFDckMsTUFBSUMsT0FBSjtBQUNBLFNBQU8sWUFBWTtBQUNmLFFBQUlDLE9BQU8sR0FBRyxJQUFkOztBQUNBLFFBQUlDLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQVk7QUFDcEJGLE1BQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0EsVUFBSSxDQUFDRCxTQUFMLEVBQWdCRixJ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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcclxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XHJcbmNvbnN0IHRleHRVdGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzL3RleHQtdXRpbHMnKTtcclxuY29uc3QgSHRtbFRleHRQYXJzZXIgPSByZXF1aXJlKCcuLi91dGlscy9odG1sLXRleHQtcGFyc2VyJyk7XHJcbmNvbnN0IF9odG1sVGV4dFBhcnNlciA9IG5ldyBIdG1sVGV4dFBhcnNlcigpO1xyXG5cclxuY29uc3QgSG9yaXpvbnRhbEFsaWduID0gbWFjcm8uVGV4dEFsaWdubWVudDtcclxuY29uc3QgVmVydGljYWxBbGlnbiA9IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudDtcclxuY29uc3QgUmljaFRleHRDaGlsZE5hbWUgPSBcIlJJQ0hURVhUX0NISUxEXCI7XHJcbmNvbnN0IFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUgPSBcIlJJQ0hURVhUX0ltYWdlX0NISUxEXCI7XHJcbmNvbnN0IENhY2hlTW9kZSA9IGNjLkxhYmVsLkNhY2hlTW9kZTtcclxuXHJcbi8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcclxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxyXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcclxuLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcbiAgICBsZXQgdGltZW91dDtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzO1xyXG4gICAgICAgIGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG4gICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogUmljaFRleHQgcG9vbFxyXG4gKi9cclxubGV0IHBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgIGNjLmlzVmFsaWQobm9kZSkgJiYgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgIGNjLmFzc2VydCghbm9kZS5fcGFyZW50LCAnUmVjeWNsaW5nIG5vZGVcXCdzIHBhcmVudCBzaG91bGQgYmUgbnVsbCEnKTtcclxuICAgIH1cclxuICAgIGlmICghY2MuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG91dGxpbmUgPSBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpO1xyXG4gICAgICAgIGlmIChvdXRsaW5lKSB7XHJcbiAgICAgICAgICAgIG91dGxpbmUud2lkdGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSwgMjApO1xyXG5cclxucG9vbC5nZXQgPSBmdW5jdGlvbiAoc3RyaW5nLCByaWNodGV4dCkge1xyXG4gICAgbGV0IGxhYmVsTm9kZSA9IHRoaXMuX2dldCgpO1xyXG4gICAgaWYgKCFsYWJlbE5vZGUpIHtcclxuICAgICAgICBsYWJlbE5vZGUgPSBuZXcgY2MuUHJpdmF0ZU5vZGUoUmljaFRleHRDaGlsZE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGxhYmVsTm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcclxuICAgIGxhYmVsTm9kZS5zZXRBbmNob3JQb2ludCgwLjUsIDAuNSk7XHJcbiAgICBsYWJlbE5vZGUuc2tld1ggPSAwO1xyXG5cclxuICAgIGxldCBsYWJlbENvbXBvbmVudCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgaWYgKCFsYWJlbENvbXBvbmVudCkge1xyXG4gICAgICAgIGxhYmVsQ29tcG9uZW50ID0gbGFiZWxOb2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWxDb21wb25lbnQuc3RyaW5nID0gXCJcIjtcclxuICAgIGxhYmVsQ29tcG9uZW50Lmhvcml6b250YWxBbGlnbiA9IEhvcml6b250YWxBbGlnbi5MRUZUO1xyXG4gICAgbGFiZWxDb21wb25lbnQudmVydGljYWxBbGlnbiA9IFZlcnRpY2FsQWxpZ24uQ0VOVEVSO1xyXG4gICAgbGFiZWxDb21wb25lbnQuX2ZvcmNlVXNlQ2FudmFzID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gbGFiZWxOb2RlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIFJpY2hUZXh0IENvbXBvbmVudC5cclxuICogISN6aCDlr4zmlofmnKznu4Tku7ZcclxuICogQGNsYXNzIFJpY2hUZXh0XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxubGV0IFJpY2hUZXh0ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlJpY2hUZXh0JyxcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fdGV4dEFycmF5ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50c0NhY2hlID0gW107XHJcbiAgICAgICAgdGhpcy5fbGluZXNXaWR0aCA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJEZWZpbmVkRm9udCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzID0gZGVib3VuY2UodGhpcy5fdXBkYXRlUmljaFRleHQsIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cyA9IHRoaXMuX3VwZGF0ZVJpY2hUZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1JpY2hUZXh0JyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwucmljaHRleHQnLFxyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcmljaHRleHQuanMnLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIENvbnRlbnQgc3RyaW5nIG9mIFJpY2hUZXh0LlxyXG4gICAgICAgICAqICEjemgg5a+M5paH5pys5pi+56S655qE5paH5pys5YaF5a6544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHN0cmluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0cmluZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAnPGNvbG9yPSMwMGZmMDA+UmljaDwvYz48Y29sb3I9IzBmZmZmZj5UZXh0PC9jb2xvcj4nLFxyXG4gICAgICAgICAgICBtdWx0aWxpbmU6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQuc3RyaW5nJyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBIb3Jpem9udGFsIEFsaWdubWVudCBvZiBlYWNoIGxpbmUgaW4gUmljaFRleHQuXHJcbiAgICAgICAgICogISN6aCDmlofmnKzlhoXlrrnnmoTmsLTlubPlr7npvZDmlrnlvI/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge21hY3JvLlRleHRBbGlnbm1lbnR9IGhvcml6b250YWxBbGlnblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhvcml6b250YWxBbGlnbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBIb3Jpem9udGFsQWxpZ24uTEVGVCxcclxuICAgICAgICAgICAgdHlwZTogSG9yaXpvbnRhbEFsaWduLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0Lmhvcml6b250YWxfYWxpZ24nLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWxBbGlnbiA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBGb250IHNpemUgb2YgUmljaFRleHQuXHJcbiAgICAgICAgICogISN6aCDlr4zmlofmnKzlrZfkvZPlpKflsI/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZm9udFNpemVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb250U2l6ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiA0MCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5mb250X3NpemUnLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZm9udFNpemUgPT09IG9sZFZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQ3VzdG9tIFN5c3RlbSBmb250IG9mIFJpY2hUZXh0XHJcbiAgICAgICAgICogISN6aCDlr4zmlofmnKzlrprliLbns7vnu5/lrZfkvZNcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZm9udEZhbWlseVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9mb250RmFtaWx5OiBcIkFyaWFsXCIsXHJcbiAgICAgICAgZm9udEZhbWlseToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0LmZvbnRfZmFtaWx5JyxcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250RmFtaWx5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZm9udEZhbWlseSA9PT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvbnRGYW1pbHkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBDdXN0b20gVFRGIGZvbnQgb2YgUmljaFRleHRcclxuICAgICAgICAgKiAhI3poICDlr4zmlofmnKzlrprliLblrZfkvZNcclxuICAgICAgICAgKiBAcHJvcGVydHkge2NjLlRURkZvbnR9IGZvbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb250OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRURkZvbnQsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQuZm9udCcsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb250ID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJEZWZpbmVkRm9udCA9IHRoaXMuZm9udDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VTeXN0ZW1Gb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25UVEZMb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlU3lzdGVtRm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHVzZSBzeXN0ZW0gZm9udCBuYW1lIG9yIG5vdC5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuS9v+eUqOezu+e7n+Wtl+S9k+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gdXNlU3lzdGVtRm9udFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9pc1N5c3RlbUZvbnRVc2VkOiB0cnVlLFxyXG4gICAgICAgIHVzZVN5c3RlbUZvbnQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTeXN0ZW1Gb250VXNlZCA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbnQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl91c2VyRGVmaW5lZEZvbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb250ID0gdGhpcy5fdXNlckRlZmluZWRGb250O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0LnN5c3RlbV9mb250JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBjYWNoZSBtb2RlIG9mIGxhYmVsLiBUaGlzIG1vZGUgb25seSBzdXBwb3J0cyBzeXN0ZW0gZm9udHMuXHJcbiAgICAgICAgICogISN6aCDmlofmnKznvJPlrZjmqKHlvI8sIOivpeaooeW8j+WPquaUr+aMgeezu+e7n+Wtl+S9k+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGFiZWwuQ2FjaGVNb2RlfSBjYWNoZU1vZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBjYWNoZU1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogQ2FjaGVNb2RlLk5PTkUsXHJcbiAgICAgICAgICAgIHR5cGU6IENhY2hlTW9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYWJlbC5jYWNoZU1vZGUnLFxyXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZU1vZGUgPT09IG9sZFZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBtYXhpbWl6ZSB3aWR0aCBvZiB0aGUgUmljaFRleHRcclxuICAgICAgICAgKiAhI3poIOWvjOaWh+acrOeahOacgOWkp+WuveW6plxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhXaWR0aFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heFdpZHRoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQubWF4X3dpZHRoJyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1heFdpZHRoID09PSBvbGRWYWx1ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0U3RhdHVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIExpbmUgSGVpZ2h0IG9mIFJpY2hUZXh0LlxyXG4gICAgICAgICAqICEjemgg5a+M5paH5pys6KGM6auY44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxpbmVIZWlnaHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBsaW5lSGVpZ2h0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDQwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnJpY2h0ZXh0LmxpbmVfaGVpZ2h0JyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVIZWlnaHQgPT09IG9sZFZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHRTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGltYWdlIGF0bGFzIGZvciB0aGUgaW1nIHRhZy4gRm9yIGVhY2ggc3JjIHZhbHVlIGluIHRoZSBpbWcgdGFnLCB0aGVyZSBzaG91bGQgYmUgYSB2YWxpZCBzcHJpdGVGcmFtZSBpbiB0aGUgaW1hZ2UgYXRsYXMuXHJcbiAgICAgICAgICogISN6aCDlr7nkuo4gaW1nIOagh+etvumHjOmdoueahCBzcmMg5bGe5oCn5ZCN56ew77yM6YO96ZyA6KaB5ZyoIGltYWdlQXRsYXMg6YeM6Z2i5om+5Yiw5LiA5Liq5pyJ5pWI55qEIHNwcml0ZUZyYW1l77yM5ZCm5YiZIGltZyB0YWcg5Lya5Yik5a6a5Li65peg5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVBdGxhc30gaW1hZ2VBdGxhc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGltYWdlQXRsYXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucmljaHRleHQuaW1hZ2VfYXRsYXMnLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VBdGxhcyA9PT0gb2xkVmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFN0YXR1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIE9uY2UgY2hlY2tlZCwgdGhlIFJpY2hUZXh0IHdpbGwgYmxvY2sgYWxsIGlucHV0IGV2ZW50cyAobW91c2UgYW5kIHRvdWNoKSB3aXRoaW5cclxuICAgICAgICAgKiB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLCBwcmV2ZW50aW5nIHRoZSBpbnB1dCBmcm9tIHBlbmV0cmF0aW5nIGludG8gdGhlIHVuZGVybHlpbmcgbm9kZS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog6YCJ5Lit5q2k6YCJ6aG55ZCO77yMUmljaFRleHQg5bCG6Zi75q2i6IqC54K56L6555WM5qGG5Lit55qE5omA5pyJ6L6T5YWl5LqL5Lu277yI6byg5qCH5ZKM6Kem5pG477yJ77yM5LuO6ICM6Ziy5q2i6L6T5YWl5LqL5Lu256m/6YCP5Yiw5bqV5bGC6IqC54K544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBoYW5kbGVUb3VjaEV2ZW50XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhhbmRsZVRvdWNoRXZlbnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5yaWNodGV4dC5oYW5kbGVUb3VjaEV2ZW50JyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZVRvdWNoRXZlbnQgPT09IG9sZFZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRvdWNoRXZlbnQgPyB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpIDogdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEhvcml6b250YWxBbGlnbjogSG9yaXpvbnRhbEFsaWduLFxyXG4gICAgICAgIFZlcnRpY2FsQWxpZ246IFZlcnRpY2FsQWxpZ25cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZVRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHQoKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZUNoaWxkcmVuKHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZVRvdWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVDaGlsZHJlbihmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLl9vblRURkxvYWRlZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Db2xvckNoYW5nZWQgKHBhcmVudENvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkTm9kZSkge1xyXG4gICAgICAgICAgICBjaGlsZE5vZGUuY29sb3IgPSBwYXJlbnRDb2xvcjtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCB0aGlzLl9vbkNvbG9yQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVFdmVudExpc3RlbmVycyAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuX29uVG91Y2hFbmRlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCB0aGlzLl9vbkNvbG9yQ2hhbmdlZCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVMYWJlbFNlZ21lbnRUZXh0QXR0cmlidXRlcyAoKSB7XHJcbiAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5VGV4dEF0dHJpYnV0ZShpdGVtLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlRm9udExhYmVsIChzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gcG9vbC5nZXQoc3RyaW5nLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uVFRGTG9hZGVkICgpIHtcclxuICAgICAgICBpZiAodGhpcy5mb250IGluc3RhbmNlb2YgY2MuVFRGRm9udCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mb250Ll9uYXRpdmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmljaFRleHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0aGlzLmZvbnQsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9sYXlvdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdXBkYXRlUmljaFRleHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJpY2hUZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfbWVhc3VyZVRleHQgKHN0eWxlSW5kZXgsIHN0cmluZykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZnVuYyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IGxhYmVsO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5fbGFiZWxTZWdtZW50c0NhY2hlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBzZWxmLl9jcmVhdGVGb250TGFiZWwoc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2xhYmVsU2VnbWVudHNDYWNoZS5wdXNoKGxhYmVsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsID0gc2VsZi5fbGFiZWxTZWdtZW50c0NhY2hlWzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhYmVsLl9zdHlsZUluZGV4ID0gc3R5bGVJbmRleDtcclxuICAgICAgICAgICAgc2VsZi5fYXBwbHlUZXh0QXR0cmlidXRlKGxhYmVsLCBzdHJpbmcsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplID0gbGFiZWwuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsU2l6ZS53aWR0aDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoc3RyaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29uVG91Y2hFbmRlZCAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnRzKGNjLkNvbXBvbmVudCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGFiZWxTZWdtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgbGFiZWxTZWdtZW50ID0gdGhpcy5fbGFiZWxTZWdtZW50c1tpXTtcclxuICAgICAgICAgICAgbGV0IGNsaWNrSGFuZGxlciA9IGxhYmVsU2VnbWVudC5fY2xpY2tIYW5kbGVyO1xyXG4gICAgICAgICAgICBsZXQgY2xpY2tQYXJhbSA9IGxhYmVsU2VnbWVudC5fY2xpY2tQYXJhbTtcclxuICAgICAgICAgICAgaWYgKGNsaWNrSGFuZGxlciAmJiB0aGlzLl9jb250YWluc1RvdWNoTG9jYXRpb24obGFiZWxTZWdtZW50LCBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb25lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmVuYWJsZWRJbkhpZXJhcmNoeSAmJiBjb21wb25lbnRbY2xpY2tIYW5kbGVyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRbY2xpY2tIYW5kbGVyXShldmVudCwgY2xpY2tQYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2NvbnRhaW5zVG91Y2hMb2NhdGlvbiAobGFiZWwsIHBvaW50KSB7XHJcbiAgICAgICAgbGV0IG15UmVjdCA9IGxhYmVsLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpO1xyXG4gICAgICAgIHJldHVybiBteVJlY3QuY29udGFpbnMocG9pbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVzZXRTdGF0ZSAoKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGROYW1lIHx8IGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQgPT09IHRoaXMubm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIGNoaWxkLnBhcmVudCAhPT0gdGhpcy5ub2RlLCBjaGlsZCBjYW5ub3QgYmUgcmVtb3ZlZCBmcm9tIGNoaWxkcmVuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9vbC5wdXQoY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50c0NhY2hlLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGluZXNXaWR0aC5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xpbmVPZmZzZXRYID0gMDtcclxuICAgICAgICB0aGlzLl9saW5lQ291bnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX2xhYmVsV2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xhYmVsSGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLl9sYXlvdXREaXJ0eSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUmVzdG9yZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBUT0RPOiByZWZpbmUgdW5kby9yZWRvIHN5c3RlbVxyXG4gICAgICAgIC8vIEJlY2F1c2UgdW5kby9yZWRvIHdpbGwgbm90IGNhbGwgb25FbmFibGUvb25EaXNhYmxlLFxyXG4gICAgICAgIC8vIHdlIG5lZWQgY2FsbCBvbkVuYWJsZS9vbkRpc2FibGUgbWFudWFsbHkgdG8gYWN0aXZlL2Rpc2FjdGl2ZSBjaGlsZHJlbiBub2Rlcy5cclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9hY3RpdmF0ZUNoaWxkcmVuIChhY3RpdmUpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMubm9kZS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGROYW1lIHx8IGNoaWxkLm5hbWUgPT09IFJpY2hUZXh0Q2hpbGRJbWFnZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2FkZExhYmVsU2VnbWVudCAoc3RyaW5nVG9rZW4sIHN0eWxlSW5kZXgpIHtcclxuICAgICAgICBsZXQgbGFiZWxTZWdtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLl9sYWJlbFNlZ21lbnRzQ2FjaGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxhYmVsU2VnbWVudCA9IHRoaXMuX2NyZWF0ZUZvbnRMYWJlbChzdHJpbmdUb2tlbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFiZWxTZWdtZW50ID0gdGhpcy5fbGFiZWxTZWdtZW50c0NhY2hlLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYWJlbFNlZ21lbnQuX3N0eWxlSW5kZXggPSBzdHlsZUluZGV4O1xyXG4gICAgICAgIGxhYmVsU2VnbWVudC5fbGluZUNvdW50ID0gdGhpcy5fbGluZUNvdW50O1xyXG4gICAgICAgIGxhYmVsU2VnbWVudC5hY3RpdmUgPSB0aGlzLm5vZGUuYWN0aXZlO1xyXG5cclxuICAgICAgICBsYWJlbFNlZ21lbnQuc2V0QW5jaG9yUG9pbnQoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fYXBwbHlUZXh0QXR0cmlidXRlKGxhYmVsU2VnbWVudCwgc3RyaW5nVG9rZW4pO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobGFiZWxTZWdtZW50KTtcclxuICAgICAgICB0aGlzLl9sYWJlbFNlZ21lbnRzLnB1c2gobGFiZWxTZWdtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxhYmVsU2VnbWVudDtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVJpY2hUZXh0V2l0aE1heFdpZHRoIChsYWJlbFN0cmluZywgbGFiZWxXaWR0aCwgc3R5bGVJbmRleCkge1xyXG4gICAgICAgIGxldCBmcmFnbWVudFdpZHRoID0gbGFiZWxXaWR0aDtcclxuICAgICAgICBsZXQgbGFiZWxTZWdtZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldFggPiAwICYmIGZyYWdtZW50V2lkdGggKyB0aGlzLl9saW5lT2Zmc2V0WCA+IHRoaXMubWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgLy9jb25jYXQgcHJldmlvdXMgbGluZVxyXG4gICAgICAgICAgICBsZXQgY2hlY2tTdGFydEluZGV4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuX2xpbmVPZmZzZXRYIDw9IHRoaXMubWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVja0VuZEluZGV4ID0gdGhpcy5fZ2V0Rmlyc3RXb3JkTGVuKGxhYmVsU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhcnRJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbFN0cmluZy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrU3RyaW5nID0gbGFiZWxTdHJpbmcuc3Vic3RyKGNoZWNrU3RhcnRJbmRleCwgY2hlY2tFbmRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tTdHJpbmdXaWR0aCA9IHRoaXMuX21lYXN1cmVUZXh0KHN0eWxlSW5kZXgsIGNoZWNrU3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldFggKyBjaGVja1N0cmluZ1dpZHRoIDw9IHRoaXMubWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBjaGVja1N0cmluZ1dpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrU3RhcnRJbmRleCArPSBjaGVja0VuZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVja1N0YXJ0SW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZW1haW5pbmdTdHJpbmcgPSBsYWJlbFN0cmluZy5zdWJzdHIoMCwgY2hlY2tTdGFydEluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWxTZWdtZW50KHJlbWFpbmluZ1N0cmluZywgc3R5bGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsU3RyaW5nID0gbGFiZWxTdHJpbmcuc3Vic3RyKGNoZWNrU3RhcnRJbmRleCwgbGFiZWxTdHJpbmcubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRXaWR0aCA9IHRoaXMuX21lYXN1cmVUZXh0KHN0eWxlSW5kZXgsIGxhYmVsU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGluZUluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZnJhZ21lbnRXaWR0aCA+IHRoaXMubWF4V2lkdGgpIHtcclxuICAgICAgICAgICAgbGV0IGZyYWdtZW50cyA9IHRleHRVdGlscy5mcmFnbWVudFRleHQobGFiZWxTdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXhXaWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMuX21lYXN1cmVUZXh0KHN0eWxlSW5kZXgpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBmcmFnbWVudHMubGVuZ3RoOyArK2spIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcGxpdFN0cmluZyA9IGZyYWdtZW50c1trXTtcclxuICAgICAgICAgICAgICAgIGxhYmVsU2VnbWVudCA9IHRoaXMuX2FkZExhYmVsU2VnbWVudChzcGxpdFN0cmluZywgc3R5bGVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTaXplID0gbGFiZWxTZWdtZW50LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBsYWJlbFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJhZ21lbnRzLmxlbmd0aCA+IDEgJiYgayA8IGZyYWdtZW50cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGluZUluZm8oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbGluZU9mZnNldFggKz0gZnJhZ21lbnRXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5fYWRkTGFiZWxTZWdtZW50KGxhYmVsU3RyaW5nLCBzdHlsZUluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9pc0xhc3RDb21wb25lbnRDUiAoc3RyaW5nVG9rZW4pIHtcclxuICAgICAgICByZXR1cm4gc3RyaW5nVG9rZW4ubGVuZ3RoIC0gMSA9PT0gc3RyaW5nVG9rZW4ubGFzdEluZGV4T2YoXCJcXG5cIik7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVMaW5lSW5mbyAoKSB7XHJcbiAgICAgICAgdGhpcy5fbGluZXNXaWR0aC5wdXNoKHRoaXMuX2xpbmVPZmZzZXRYKTtcclxuICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGluZUNvdW50Kys7XHJcbiAgICB9LFxyXG5cclxuICAgIF9uZWVkc1VwZGF0ZVRleHRMYXlvdXQgKG5ld1RleHRBcnJheSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXlvdXREaXJ0eSB8fCAhdGhpcy5fdGV4dEFycmF5IHx8ICFuZXdUZXh0QXJyYXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fdGV4dEFycmF5Lmxlbmd0aCAhPT0gbmV3VGV4dEFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gdGhpcy5fdGV4dEFycmF5W2ldO1xyXG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IG5ld1RleHRBcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKG9sZEl0ZW0udGV4dCAhPT0gbmV3SXRlbS50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBvbGRTdHlsZSA9IG9sZEl0ZW0uc3R5bGUsIG5ld1N0eWxlID0gbmV3SXRlbS5zdHlsZTtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZFN0eWxlLm91dGxpbmUgIT09ICFuZXdTdHlsZS5vdXRsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkU3R5bGUuc2l6ZSAhPT0gbmV3U3R5bGUuc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgIW9sZFN0eWxlLml0YWxpYyAhPT0gIW5ld1N0eWxlLml0YWxpY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgb2xkU3R5bGUuaXNJbWFnZSAhPT0gbmV3U3R5bGUuaXNJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFN0eWxlLnNyYyAhPT0gbmV3U3R5bGUuc3JjIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRTdHlsZS5pbWFnZUFsaWduICE9PSBuZXdTdHlsZS5pbWFnZUFsaWduIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRTdHlsZS5pbWFnZUhlaWdodCAhPT0gbmV3U3R5bGUuaW1hZ2VIZWlnaHQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFN0eWxlLmltYWdlV2lkdGggIT09IG5ld1N0eWxlLmltYWdlV2lkdGggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFN0eWxlLmltYWdlT2Zmc2V0ICE9PSBuZXdTdHlsZS5pbWFnZU9mZnNldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRTdHlsZS5zaXplIHx8IG9sZFN0eWxlLml0YWxpYyB8fCBvbGRTdHlsZS5pc0ltYWdlIHx8IG9sZFN0eWxlLm91dGxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1N0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdTdHlsZS5zaXplIHx8IG5ld1N0eWxlLml0YWxpYyB8fCBuZXdTdHlsZS5pc0ltYWdlIHx8IG5ld1N0eWxlLm91dGxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZFJpY2hUZXh0SW1hZ2VFbGVtZW50IChyaWNoVGV4dEVsZW1lbnQpIHtcclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWVOYW1lID0gcmljaFRleHRFbGVtZW50LnN0eWxlLnNyYztcclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLmltYWdlQXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3ByaXRlRnJhbWVOYW1lKTtcclxuICAgICAgICBpZiAoc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZU5vZGUgPSBuZXcgY2MuUHJpdmF0ZU5vZGUoUmljaFRleHRDaGlsZEltYWdlTmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBzcHJpdGVDb21wb25lbnQgPSBzcHJpdGVOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZUFsaWduKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuc2V0QW5jaG9yUG9pbnQoMCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjZW50ZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuc2V0QW5jaG9yUG9pbnQoMCwgMC41KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5zZXRBbmNob3JQb2ludCgwLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlLmltYWdlT2Zmc2V0KSBzcHJpdGVOb2RlLl9pbWFnZU9mZnNldCA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5pbWFnZU9mZnNldDtcclxuICAgICAgICAgICAgc3ByaXRlQ29tcG9uZW50LnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRUQ7XHJcbiAgICAgICAgICAgIHNwcml0ZUNvbXBvbmVudC5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzcHJpdGVOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50cy5wdXNoKHNwcml0ZU5vZGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNwcml0ZVJlY3QgPSBzcHJpdGVGcmFtZS5nZXRSZWN0KCk7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZUZhY3RvciA9IDE7XHJcbiAgICAgICAgICAgIGxldCBzcHJpdGVXaWR0aCA9IHNwcml0ZVJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBzcHJpdGVIZWlnaHQgPSBzcHJpdGVSZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgbGV0IGV4cGVjdFdpZHRoID0gcmljaFRleHRFbGVtZW50LnN0eWxlLmltYWdlV2lkdGg7XHJcbiAgICAgICAgICAgIGxldCBleHBlY3RIZWlnaHQgPSByaWNoVGV4dEVsZW1lbnQuc3R5bGUuaW1hZ2VIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXhwZWN0SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGVGYWN0b3IgPSBleHBlY3RIZWlnaHQgLyBzcHJpdGVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVXaWR0aCA9IHNwcml0ZVdpZHRoICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVIZWlnaHQgPSBzcHJpdGVIZWlnaHQgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlRmFjdG9yID0gdGhpcy5saW5lSGVpZ2h0IC8gc3ByaXRlSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlV2lkdGggPSBzcHJpdGVXaWR0aCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlSGVpZ2h0ID0gc3ByaXRlSGVpZ2h0ICogc2NhbGVGYWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChleHBlY3RXaWR0aCA+IDApIHNwcml0ZVdpZHRoID0gZXhwZWN0V2lkdGg7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXhXaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0WCArIHNwcml0ZVdpZHRoID4gdGhpcy5tYXhXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpbmVJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBzcHJpdGVXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lT2Zmc2V0WCArPSBzcHJpdGVXaWR0aDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9saW5lT2Zmc2V0WCA+IHRoaXMuX2xhYmVsV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYWJlbFdpZHRoID0gdGhpcy5fbGluZU9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ByaXRlQ29tcG9uZW50LnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIHNwcml0ZU5vZGUuc2V0Q29udGVudFNpemUoc3ByaXRlV2lkdGgsIHNwcml0ZUhlaWdodCk7XHJcbiAgICAgICAgICAgIHNwcml0ZU5vZGUuX2xpbmVDb3VudCA9IHRoaXMuX2xpbmVDb3VudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyaWNoVGV4dEVsZW1lbnQuc3R5bGUuZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyaWNoVGV4dEVsZW1lbnQuc3R5bGUuZXZlbnQuY2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVOb2RlLl9jbGlja0hhbmRsZXIgPSByaWNoVGV4dEVsZW1lbnQuc3R5bGUuZXZlbnQuY2xpY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmljaFRleHRFbGVtZW50LnN0eWxlLmV2ZW50LnBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlTm9kZS5fY2xpY2tQYXJhbSA9IHJpY2hUZXh0RWxlbWVudC5zdHlsZS5ldmVudC5wYXJhbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuX2NsaWNrUGFyYW0gPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZU5vZGUuX2NsaWNrSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCg0NDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVSaWNoVGV4dCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbmV3VGV4dEFycmF5ID0gX2h0bWxUZXh0UGFyc2VyLnBhcnNlKHRoaXMuc3RyaW5nKTtcclxuICAgICAgICBpZiAoIXRoaXMuX25lZWRzVXBkYXRlVGV4dExheW91dChuZXdUZXh0QXJyYXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHRBcnJheSA9IG5ld1RleHRBcnJheTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWxTZWdtZW50VGV4dEF0dHJpYnV0ZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdGV4dEFycmF5ID0gbmV3VGV4dEFycmF5O1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGxhc3RFbXB0eUxpbmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbGFiZWw7XHJcbiAgICAgICAgbGV0IGxhYmVsU2l6ZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IHJpY2hUZXh0RWxlbWVudCA9IHRoaXMuX3RleHRBcnJheVtpXTtcclxuICAgICAgICAgICAgbGV0IHRleHQgPSByaWNoVGV4dEVsZW1lbnQudGV4dDtcclxuICAgICAgICAgICAgLy9oYW5kbGUgPGJyLz4gPGltZyAvPiB0YWdcclxuICAgICAgICAgICAgaWYgKHRleHQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyaWNoVGV4dEVsZW1lbnQuc3R5bGUgJiYgcmljaFRleHRFbGVtZW50LnN0eWxlLm5ld2xpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVMaW5lSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpY2hUZXh0RWxlbWVudC5zdHlsZSAmJiByaWNoVGV4dEVsZW1lbnQuc3R5bGUuaXNJbWFnZSAmJiB0aGlzLmltYWdlQXRsYXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRSaWNoVGV4dEltYWdlRWxlbWVudChyaWNoVGV4dEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtdWx0aWxpbmVUZXh0cyA9IHRleHQuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG11bHRpbGluZVRleHRzLmxlbmd0aDsgKytqKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxTdHJpbmcgPSBtdWx0aWxpbmVUZXh0c1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChsYWJlbFN0cmluZyA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIGNvbnRpbnVlcyBcXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNMYXN0Q29tcG9uZW50Q1IodGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgaiA9PT0gbXVsdGlsaW5lVGV4dHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTGluZUluZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0RW1wdHlMaW5lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhc3RFbXB0eUxpbmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhXaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWxXaWR0aCA9IHRoaXMuX21lYXN1cmVUZXh0KGksIGxhYmVsU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFdpdGhNYXhXaWR0aChsYWJlbFN0cmluZywgbGFiZWxXaWR0aCwgaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aWxpbmVUZXh0cy5sZW5ndGggPiAxICYmIGogPCBtdWx0aWxpbmVUZXh0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpbmVJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLl9hZGRMYWJlbFNlZ21lbnQobGFiZWxTdHJpbmcsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsU2l6ZSA9IGxhYmVsLmdldENvbnRlbnRTaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVPZmZzZXRYICs9IGxhYmVsU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGluZU9mZnNldFggPiB0aGlzLl9sYWJlbFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhYmVsV2lkdGggPSB0aGlzLl9saW5lT2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aWxpbmVUZXh0cy5sZW5ndGggPiAxICYmIGogPCBtdWx0aWxpbmVUZXh0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxpbmVJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbGFzdEVtcHR5TGluZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9saW5lc1dpZHRoLnB1c2godGhpcy5fbGluZU9mZnNldFgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWF4V2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsV2lkdGggPSB0aGlzLm1heFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sYWJlbEhlaWdodCA9ICh0aGlzLl9saW5lQ291bnQgKyB0ZXh0VXRpbHMuQkFTRUxJTkVfUkFUSU8pICogdGhpcy5saW5lSGVpZ2h0O1xyXG5cclxuICAgICAgICAvLyB0cmlnZ2VyIFwic2l6ZS1jaGFuZ2VkXCIgZXZlbnRcclxuICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fbGFiZWxXaWR0aCwgdGhpcy5fbGFiZWxIZWlnaHQpO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVSaWNoVGV4dFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldEZpcnN0V29yZExlbiAodGV4dCwgc3RhcnRJbmRleCwgdGV4dExlbikge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChzdGFydEluZGV4KTtcclxuICAgICAgICBpZiAodGV4dFV0aWxzLmlzVW5pY29kZUNKSyhjaGFyYWN0ZXIpXHJcbiAgICAgICAgICAgIHx8IHRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxlbiA9IDE7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBzdGFydEluZGV4ICsgMTsgaW5kZXggPCB0ZXh0TGVuOyArK2luZGV4KSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IHRleHQuY2hhckF0KGluZGV4KTtcclxuICAgICAgICAgICAgaWYgKHRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpXHJcbiAgICAgICAgICAgICAgICB8fCB0ZXh0VXRpbHMuaXNVbmljb2RlQ0pLKGNoYXJhY3RlcikpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxlbisrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxlbjtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVJpY2hUZXh0UG9zaXRpb24gKCkge1xyXG4gICAgICAgIGxldCBuZXh0VG9rZW5YID0gMDtcclxuICAgICAgICBsZXQgbmV4dExpbmVJbmRleCA9IDE7XHJcbiAgICAgICAgbGV0IHRvdGFsTGluZUNvdW50ID0gdGhpcy5fbGluZUNvdW50O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGFiZWxTZWdtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLl9sYWJlbFNlZ21lbnRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgbGluZUNvdW50ID0gbGFiZWwuX2xpbmVDb3VudDtcclxuICAgICAgICAgICAgaWYgKGxpbmVDb3VudCA+IG5leHRMaW5lSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIG5leHRUb2tlblggPSAwO1xyXG4gICAgICAgICAgICAgICAgbmV4dExpbmVJbmRleCA9IGxpbmVDb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGluZU9mZnNldFggPSAwO1xyXG4gICAgICAgICAgICAvLyBsZXQgbm9kZUFuY2hvclhPZmZzZXQgPSAoMC41IC0gdGhpcy5ub2RlLmFuY2hvclgpICogdGhpcy5fbGFiZWxXaWR0aDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmhvcml6b250YWxBbGlnbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ24uTEVGVDpcclxuICAgICAgICAgICAgICAgICAgICBsaW5lT2Zmc2V0WCA9IC0gdGhpcy5fbGFiZWxXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhvcml6b250YWxBbGlnbi5DRU5URVI6XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldFggPSAtIHRoaXMuX2xpbmVzV2lkdGhbbGluZUNvdW50IC0gMV0gLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ24uUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZU9mZnNldFggPSB0aGlzLl9sYWJlbFdpZHRoIC8gMiAtIHRoaXMuX2xpbmVzV2lkdGhbbGluZUNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhYmVsLnggPSBuZXh0VG9rZW5YICsgbGluZU9mZnNldFg7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGFiZWxTaXplID0gbGFiZWwuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIGxhYmVsLnkgPSB0aGlzLmxpbmVIZWlnaHQgKiAodG90YWxMaW5lQ291bnQgLSBsaW5lQ291bnQpIC0gdGhpcy5fbGFiZWxIZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmVDb3VudCA9PT0gbmV4dExpbmVJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRva2VuWCArPSBsYWJlbFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzcHJpdGUgPSBsYWJlbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IGltZyBhbGlnbiAoZnJvbSA8aW1nIGFsaWduPXRvcHxjZW50ZXJ8Ym90dG9tPilcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lSGVpZ2h0U2V0ID0gdGhpcy5saW5lSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVIZWlnaHRSZWFsID0gdGhpcy5saW5lSGVpZ2h0ICogKDEgKyB0ZXh0VXRpbHMuQkFTRUxJTkVfUkFUSU8pOyAvL3NpbmdsZSBsaW5lIG5vZGUgaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGxhYmVsLmFuY2hvclkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC55ICs9ICggbGluZUhlaWdodFNldCArICggKCBsaW5lSGVpZ2h0UmVhbCAtIGxpbmVIZWlnaHRTZXQpIC8gMiApICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMC41OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC55ICs9ICggbGluZUhlaWdodFJlYWwgLyAyICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLnkgKz0gKCAobGluZUhlaWdodFJlYWwgLSBsaW5lSGVpZ2h0U2V0KSAvIDIgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhZGp1c3QgaW1nIG9mZnNldCAoZnJvbSA8aW1nIG9mZnNldD0xMnwxMiwzND4pXHJcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwuX2ltYWdlT2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRzID0gbGFiZWwuX2ltYWdlT2Zmc2V0LnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldHMubGVuZ3RoID09PSAxICYmIG9mZnNldHNbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IHBhcnNlRmxvYXQob2Zmc2V0c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKG9mZnNldFkpKSBsYWJlbC55ICs9IG9mZnNldFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYob2Zmc2V0cy5sZW5ndGggPT09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WCA9IHBhcnNlRmxvYXQob2Zmc2V0c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRZID0gcGFyc2VGbG9hdChvZmZzZXRzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIob2Zmc2V0WCkpIGxhYmVsLnggKz0gb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIob2Zmc2V0WSkpIGxhYmVsLnkgKz0gb2Zmc2V0WTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vYWRqdXN0IHkgZm9yIGxhYmVsIHdpdGggb3V0bGluZVxyXG4gICAgICAgICAgICBsZXQgb3V0bGluZSA9IGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpO1xyXG4gICAgICAgICAgICBpZiAob3V0bGluZSAmJiBvdXRsaW5lLndpZHRoKSBsYWJlbC55ID0gbGFiZWwueSAtIG91dGxpbmUud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfY29udmVydExpdGVyYWxDb2xvclZhbHVlIChjb2xvcikge1xyXG4gICAgICAgIGxldCBjb2xvclZhbHVlID0gY29sb3IudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBpZiAoY2MuQ29sb3JbY29sb3JWYWx1ZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLkNvbG9yW2NvbG9yVmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG91dCA9IGNjLmNvbG9yKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBvdXQuZnJvbUhFWChjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBXaGVuIHN0cmluZyBpcyBudWxsLCBpdCBtZWFucyB0aGF0IHRoZSB0ZXh0IGRvZXMgbm90IG5lZWQgdG8gYmUgdXBkYXRlZC5cclxuICAgIF9hcHBseVRleHRBdHRyaWJ1dGUgKGxhYmVsTm9kZSwgc3RyaW5nLCBmb3JjZSkge1xyXG4gICAgICAgIGxldCBsYWJlbENvbXBvbmVudCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGlmICghbGFiZWxDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gbGFiZWxOb2RlLl9zdHlsZUluZGV4O1xyXG5cclxuICAgICAgICBsZXQgdGV4dFN0eWxlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fdGV4dEFycmF5W2luZGV4XSkge1xyXG4gICAgICAgICAgICB0ZXh0U3R5bGUgPSB0aGlzLl90ZXh0QXJyYXlbaW5kZXhdLnN0eWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRleHRTdHlsZSAmJiB0ZXh0U3R5bGUuY29sb3IpIHtcclxuICAgICAgICAgICAgbGFiZWxOb2RlLmNvbG9yID0gdGhpcy5fY29udmVydExpdGVyYWxDb2xvclZhbHVlKHRleHRTdHlsZS5jb2xvcik7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBsYWJlbE5vZGUuY29sb3IgPSB0aGlzLm5vZGUuY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsYWJlbENvbXBvbmVudC5jYWNoZU1vZGUgPSB0aGlzLmNhY2hlTW9kZTtcclxuXHJcbiAgICAgICAgbGV0IGlzQXNzZXQgPSB0aGlzLmZvbnQgaW5zdGFuY2VvZiBjYy5Gb250O1xyXG4gICAgICAgIGlmIChpc0Fzc2V0ICYmICF0aGlzLl9pc1N5c3RlbUZvbnRVc2VkKSB7XHJcbiAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LmZvbnQgPSB0aGlzLmZvbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuZm9udEZhbWlseSA9IHRoaXMuZm9udEZhbWlseTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxhYmVsQ29tcG9uZW50LnVzZVN5c3RlbUZvbnQgPSB0aGlzLl9pc1N5c3RlbUZvbnRVc2VkO1xyXG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmxpbmVIZWlnaHQgPSB0aGlzLmxpbmVIZWlnaHQ7XHJcbiAgICAgICAgbGFiZWxDb21wb25lbnQuZW5hYmxlQm9sZCA9IHRleHRTdHlsZSAmJiB0ZXh0U3R5bGUuYm9sZDtcclxuICAgICAgICBsYWJlbENvbXBvbmVudC5lbmFibGVJdGFsaWNzID0gdGV4dFN0eWxlICYmIHRleHRTdHlsZS5pdGFsaWM7XHJcbiAgICAgICAgLy9UT0RPOiB0ZW1wb3JhcnkgaW1wbGVtZW50YXRpb24sIHRoZSBpdGFsaWMgZWZmZWN0IHNob3VsZCBiZSBpbXBsZW1lbnRlZCBpbiB0aGUgaW50ZXJuYWwgb2YgbGFiZWwtYXNzZW1ibGVyLlxyXG4gICAgICAgIGlmICh0ZXh0U3R5bGUgJiYgdGV4dFN0eWxlLml0YWxpYykge1xyXG4gICAgICAgICAgICBsYWJlbE5vZGUuc2tld1ggPSAxMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxhYmVsQ29tcG9uZW50LmVuYWJsZVVuZGVybGluZSA9IHRleHRTdHlsZSAmJiB0ZXh0U3R5bGUudW5kZXJsaW5lO1xyXG5cclxuICAgICAgICBpZiAodGV4dFN0eWxlICYmIHRleHRTdHlsZS5vdXRsaW5lKSB7XHJcbiAgICAgICAgICAgIGxldCBsYWJlbE91dGxpbmVDb21wb25lbnQgPSBsYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XHJcbiAgICAgICAgICAgIGlmICghbGFiZWxPdXRsaW5lQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE91dGxpbmVDb21wb25lbnQgPSBsYWJlbE5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWxPdXRsaW5lQ29tcG9uZW50LmNvbG9yID0gdGhpcy5fY29udmVydExpdGVyYWxDb2xvclZhbHVlKHRleHRTdHlsZS5vdXRsaW5lLmNvbG9yKTtcclxuICAgICAgICAgICAgbGFiZWxPdXRsaW5lQ29tcG9uZW50LndpZHRoID0gdGV4dFN0eWxlLm91dGxpbmUud2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGV4dFN0eWxlICYmIHRleHRTdHlsZS5zaXplKSB7XHJcbiAgICAgICAgICAgIGxhYmVsQ29tcG9uZW50LmZvbnRTaXplID0gdGV4dFN0eWxlLnNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsYWJlbENvbXBvbmVudC5mb250U2l6ZSA9IHRoaXMuZm9udFNpemU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RyaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFiZWxDb21wb25lbnQuc3RyaW5nID0gc3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yY2UgJiYgbGFiZWxDb21wb25lbnQuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpO1xyXG5cclxuICAgICAgICBpZiAodGV4dFN0eWxlICYmIHRleHRTdHlsZS5ldmVudCkge1xyXG4gICAgICAgICAgICBpZiAodGV4dFN0eWxlLmV2ZW50LmNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGUuX2NsaWNrSGFuZGxlciA9IHRleHRTdHlsZS5ldmVudC5jbGljaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGV4dFN0eWxlLmV2ZW50LnBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGUuX2NsaWNrUGFyYW0gPSB0ZXh0U3R5bGUuZXZlbnQucGFyYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbE5vZGUuX2NsaWNrUGFyYW0gPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGFiZWxOb2RlLl9jbGlja0hhbmRsZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95ICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2xhYmVsU2VnbWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFiZWxTZWdtZW50c1tpXS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHBvb2wucHV0KHRoaXMuX2xhYmVsU2VnbWVudHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuUmljaFRleHQgPSBtb2R1bGUuZXhwb3J0cyA9IFJpY2hUZXh0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==