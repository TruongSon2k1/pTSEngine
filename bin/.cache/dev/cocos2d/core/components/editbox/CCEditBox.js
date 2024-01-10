
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/CCEditBox.js';
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
var macro = require('../../platform/CCMacro');

var EditBoxImplBase = require('../editbox/EditBoxImplBase');

var Label = require('../CCLabel');

var Types = require('./types');

var InputMode = Types.InputMode;
var InputFlag = Types.InputFlag;
var KeyboardReturnType = Types.KeyboardReturnType;

function capitalize(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * !#en cc.EditBox is a component for inputing text, you can use it to gather small amounts of text from users.
 * !#zh EditBox 组件，用于获取用户的输入文本。
 * @class EditBox
 * @extends Component
 */


var EditBox = cc.Class({
  name: 'cc.EditBox',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/EditBox',
    inspector: 'packages://inspector/inspectors/comps/cceditbox.js',
    help: 'i18n:COMPONENT.help_url.editbox',
    executeInEditMode: true
  },
  properties: {
    _string: '',

    /**
     * !#en Input string of EditBox.
     * !#zh 输入框的初始输入内容，如果为空则会显示占位符的文本。
     * @property {String} string
     */
    string: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.string',
      get: function get() {
        return this._string;
      },
      set: function set(value) {
        value = '' + value;

        if (this.maxLength >= 0 && value.length >= this.maxLength) {
          value = value.slice(0, this.maxLength);
        }

        this._string = value;

        this._updateString(value);
      }
    },

    /**
     * !#en The Label component attached to the node for EditBox's input text label
     * !#zh 输入框输入文本节点上挂载的 Label 组件对象
     * @property {Label} textLabel
     */
    textLabel: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.textLabel',
      "default": null,
      type: Label,
      notify: function notify(oldValue) {
        if (this.textLabel && this.textLabel !== oldValue) {
          this._updateTextLabel();

          this._updateLabels();
        }
      }
    },

    /**
    * !#en The Label component attached to the node for EditBox's placeholder text label
    * !#zh 输入框占位符节点上挂载的 Label 组件对象
    * @property {Label} placeholderLabel
    */
    placeholderLabel: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.placeholderLabel',
      "default": null,
      type: Label,
      notify: function notify(oldValue) {
        if (this.placeholderLabel && this.placeholderLabel !== oldValue) {
          this._updatePlaceholderLabel();

          this._updateLabels();
        }
      }
    },

    /**
     * !#en The Sprite component attached to the node for EditBox's background
     * !#zh 输入框背景节点上挂载的 Sprite 组件对象
     * @property {Sprite} background
     */
    background: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.background',
      "default": null,
      type: cc.Sprite,
      notify: function notify(oldValue) {
        if (this.background && this.background !== oldValue) {
          this._updateBackgroundSprite();
        }
      }
    },
    // To be removed in the future
    _N$backgroundImage: {
      "default": undefined,
      type: cc.SpriteFrame
    },

    /**
     * !#en The background image of EditBox. This property will be removed in the future, use editBox.background instead please.
     * !#zh 输入框的背景图片。 该属性会在将来的版本中移除，请用 editBox.background
     * @property {SpriteFrame} backgroundImage
     * @deprecated since v2.1
     */
    backgroundImage: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.backgroundImage', 'editBox.background');
        if (!this.background) {
          return null;
        }

        return this.background.spriteFrame;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.backgroundImage', 'editBox.background');
        if (this.background) {
          this.background.spriteFrame = value;
        }
      }
    },

    /**
     * !#en
     * The return key type of EditBox.
     * Note: it is meaningless for web platforms and desktop platforms.
     * !#zh
     * 指定移动设备上面回车按钮的样式。
     * 注意：这个选项对 web 平台与 desktop 平台无效。
     * @property {EditBox.KeyboardReturnType} returnType
     * @default KeyboardReturnType.DEFAULT
     */
    returnType: {
      "default": KeyboardReturnType.DEFAULT,
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.returnType',
      displayName: 'KeyboardReturnType',
      type: KeyboardReturnType
    },
    // To be removed in the future
    _N$returnType: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Set the input flags that are to be applied to the EditBox.
     * !#zh 指定输入标志位，可以指定输入方式为密码或者单词首字母大写。
     * @property {EditBox.InputFlag} inputFlag
     * @default InputFlag.DEFAULT
     */
    inputFlag: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.input_flag',
      "default": InputFlag.DEFAULT,
      type: InputFlag,
      notify: function notify() {
        this._updateString(this._string);
      }
    },

    /**
     * !#en
     * Set the input mode of the edit box.
     * If you pass ANY, it will create a multiline EditBox.
     * !#zh
     * 指定输入模式: ANY表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。
     * @property {EditBox.InputMode} inputMode
     * @default InputMode.ANY
     */
    inputMode: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.input_mode',
      "default": InputMode.ANY,
      type: InputMode,
      notify: function notify(oldValue) {
        if (this.inputMode !== oldValue) {
          this._updateTextLabel();

          this._updatePlaceholderLabel();
        }
      }
    },

    /**
     * !#en Font size of the input text. This property will be removed in the future, use editBox.textLabel.fontSize instead please.
     * !#zh 输入框文本的字体大小。 该属性会在将来的版本中移除，请使用 editBox.textLabel.fontSize。
     * @property {Number} fontSize
     * @deprecated since v2.1
     */
    fontSize: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontSize', 'editBox.textLabel.fontSize');
        if (!this.textLabel) {
          return 0;
        }

        return this.textLabel.fontSize;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontSize', 'editBox.textLabel.fontSize');
        if (this.textLabel) {
          this.textLabel.fontSize = value;
        }
      }
    },
    // To be removed in the future
    _N$fontSize: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Change the lineHeight of displayed text. This property will be removed in the future, use editBox.textLabel.lineHeight instead.
     * !#zh 输入框文本的行高。该属性会在将来的版本中移除，请使用 editBox.textLabel.lineHeight
     * @property {Number} lineHeight
     * @deprecated since v2.1
     */
    lineHeight: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.lineHeight', 'editBox.textLabel.lineHeight');
        if (!this.textLabel) {
          return 0;
        }

        return this.textLabel.lineHeight;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.lineHeight', 'editBox.textLabel.lineHeight');
        if (this.textLabel) {
          this.textLabel.lineHeight = value;
        }
      }
    },
    // To be removed in the future
    _N$lineHeight: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en Font color of the input text. This property will be removed in the future, use editBox.textLabel.node.color instead.
     * !#zh 输入框文本的颜色。该属性会在将来的版本中移除，请使用 editBox.textLabel.node.color
     * @property {Color} fontColor
     * @deprecated since v2.1
     */
    fontColor: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontColor', 'editBox.textLabel.node.color');
        if (!this.textLabel) {
          return cc.Color.BLACK;
        }

        return this.textLabel.node.color;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.fontColor', 'editBox.textLabel.node.color');
        if (this.textLabel) {
          this.textLabel.node.color = value;
          this.textLabel.node.opacity = value.a;
        }
      }
    },
    // To be removed in the future
    _N$fontColor: undefined,

    /**
     * !#en The display text of placeholder.
     * !#zh 输入框占位符的文本内容。
     * @property {String} placeholder
     */
    placeholder: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.placeholder',
      get: function get() {
        if (!this.placeholderLabel) {
          return '';
        }

        return this.placeholderLabel.string;
      },
      set: function set(value) {
        if (this.placeholderLabel) {
          this.placeholderLabel.string = value;
        }
      }
    },
    // To be removed in the future
    _N$placeholder: {
      "default": undefined,
      type: cc.String
    },

    /**
     * !#en The font size of placeholder. This property will be removed in the future, use editBox.placeholderLabel.fontSize instead.
     * !#zh 输入框占位符的字体大小。该属性会在将来的版本中移除，请使用 editBox.placeholderLabel.fontSize
     * @property {Number} placeholderFontSize
     * @deprecated since v2.1
     */
    placeholderFontSize: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontSize', 'editBox.placeholderLabel.fontSize');
        if (!this.placeholderLabel) {
          return 0;
        }

        return this.placeholderLabel.fontSize;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontSize', 'editBox.placeholderLabel.fontSize');
        if (this.placeholderLabel) {
          this.placeholderLabel.fontSize = value;
        }
      }
    },
    // To be removed in the future
    _N$placeholderFontSize: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en The font color of placeholder. This property will be removed in the future, use editBox.placeholderLabel.node.color instead.
     * !#zh 输入框占位符的字体颜色。该属性会在将来的版本中移除，请使用 editBox.placeholderLabel.node.color
     * @property {Color} placeholderFontColor
     * @deprecated since v2.1
     */
    placeholderFontColor: {
      get: function get() {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontColor', 'editBox.placeholderLabel.node.color');
        if (!this.placeholderLabel) {
          return cc.Color.BLACK;
        }

        return this.placeholderLabel.node.color;
      },
      set: function set(value) {
        // if (!CC_EDITOR) cc.warnID(1400, 'editBox.placeholderFontColor', 'editBox.placeholderLabel.node.color');
        if (this.placeholderLabel) {
          this.placeholderLabel.node.color = value;
          this.placeholderLabel.node.opacity = value.a;
        }
      }
    },
    // To be removed in the future
    _N$placeholderFontColor: undefined,

    /**
     * !#en The maximize input length of EditBox.
     * - If pass a value less than 0, it won't limit the input number of characters.
     * - If pass 0, it doesn't allow input any characters.
     * !#zh 输入框最大允许输入的字符个数。
     * - 如果值为小于 0 的值，则不会限制输入字符个数。
     * - 如果值为 0，则不允许用户进行任何输入。
     * @property {Number} maxLength
     */
    maxLength: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.max_length',
      "default": 20
    },
    // To be removed in the future
    _N$maxLength: {
      "default": undefined,
      type: cc.Float
    },

    /**
     * !#en The input is always visible and be on top of the game view (only useful on Web), this property will be removed on v2.1
     * !zh 输入框总是可见，并且永远在游戏视图的上面（这个属性只有在 Web 上面修改有意义），该属性会在 v2.1 中移除
     * Note: only available on Web at the moment.
     * @property {Boolean} stayOnTop
     * @deprecated since 2.0.8
     */
    stayOnTop: {
      "default": false,
      notify: function notify() {
        cc.warn('editBox.stayOnTop is removed since v2.1.');
      }
    },
    _tabIndex: 0,

    /**
     * !#en Set the tabIndex of the DOM input element (only useful on Web).
     * !#zh 修改 DOM 输入元素的 tabIndex（这个属性只有在 Web 上面修改有意义）。
     * @property {Number} tabIndex
     */
    tabIndex: {
      tooltip: CC_DEV && 'i18n:COMPONENT.editbox.tab_index',
      get: function get() {
        return this._tabIndex;
      },
      set: function set(value) {
        if (this._tabIndex !== value) {
          this._tabIndex = value;

          if (this._impl) {
            this._impl.setTabIndex(value);
          }
        }
      }
    },

    /**
     * !#en The event handler to be called when EditBox began to edit text.
     * !#zh 开始编辑文本输入框触发的事件回调。
     * @property {Component.EventHandler[]} editingDidBegan
     */
    editingDidBegan: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when EditBox text changes.
     * !#zh 编辑文本输入框时触发的事件回调。
     * @property {Component.EventHandler[]} textChanged
     */
    textChanged: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when EditBox edit ends.
     * !#zh 结束编辑文本输入框时触发的事件回调。
     * @property {Component.EventHandler[]} editingDidEnded
     */
    editingDidEnded: {
      "default": [],
      type: cc.Component.EventHandler
    },

    /**
     * !#en The event handler to be called when return key is pressed. Windows is not supported.
     * !#zh 当用户按下回车按键时的事件回调，目前不支持 windows 平台
     * @property {Component.EventHandler[]} editingReturn
     */
    editingReturn: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    _ImplClass: EditBoxImplBase,
    // implemented on different platform adapter
    KeyboardReturnType: KeyboardReturnType,
    InputFlag: InputFlag,
    InputMode: InputMode
  },
  _init: function _init() {
    this._upgradeComp();

    this._isLabelVisible = true;
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._syncSize, this);
    var impl = this._impl = new EditBox._ImplClass();
    impl.init(this);

    this._updateString(this._string);

    this._syncSize();
  },
  _updateBackgroundSprite: function _updateBackgroundSprite() {
    var background = this.background; // If background doesn't exist, create one.

    if (!background) {
      var node = this.node.getChildByName('BACKGROUND_SPRITE');

      if (!node) {
        node = new cc.Node('BACKGROUND_SPRITE');
      }

      background = node.getComponent(cc.Sprite);

      if (!background) {
        background = node.addComponent(cc.Sprite);
      }

      node.parent = this.node;
      this.background = background;
    } // update


    background.type = cc.Sprite.Type.SLICED; // handle old data

    if (this._N$backgroundImage !== undefined) {
      background.spriteFrame = this._N$backgroundImage;
      this._N$backgroundImage = undefined;
    }
  },
  _updateTextLabel: function _updateTextLabel() {
    var textLabel = this.textLabel; // If textLabel doesn't exist, create one.

    if (!textLabel) {
      var node = this.node.getChildByName('TEXT_LABEL');

      if (!node) {
        node = new cc.Node('TEXT_LABEL');
      }

      textLabel = node.getComponent(Label);

      if (!textLabel) {
        textLabel = node.addComponent(Label);
      }

      node.parent = this.node;
      this.textLabel = textLabel;
    } // update


    textLabel.node.setAnchorPoint(0, 1);
    textLabel.overflow = Label.Overflow.CLAMP;

    if (this.inputMode === InputMode.ANY) {
      textLabel.verticalAlign = macro.VerticalTextAlignment.TOP;
      textLabel.enableWrapText = true;
    } else {
      textLabel.verticalAlign = macro.VerticalTextAlignment.CENTER;
      textLabel.enableWrapText = false;
    }

    textLabel.string = this._updateLabelStringStyle(this._string); // handle old data

    if (this._N$fontColor !== undefined) {
      textLabel.node.color = this._N$fontColor;
      textLabel.node.opacity = this._N$fontColor.a;
      this._N$fontColor = undefined;
    }

    if (this._N$fontSize !== undefined) {
      textLabel.fontSize = this._N$fontSize;
      this._N$fontSize = undefined;
    }

    if (this._N$lineHeight !== undefined) {
      textLabel.lineHeight = this._N$lineHeight;
      this._N$lineHeight = undefined;
    }
  },
  _updatePlaceholderLabel: function _updatePlaceholderLabel() {
    var placeholderLabel = this.placeholderLabel; // If placeholderLabel doesn't exist, create one.

    if (!placeholderLabel) {
      var node = this.node.getChildByName('PLACEHOLDER_LABEL');

      if (!node) {
        node = new cc.Node('PLACEHOLDER_LABEL');
      }

      placeholderLabel = node.getComponent(Label);

      if (!placeholderLabel) {
        placeholderLabel = node.addComponent(Label);
      }

      node.parent = this.node;
      this.placeholderLabel = placeholderLabel;
    } // update


    placeholderLabel.node.setAnchorPoint(0, 1);
    placeholderLabel.overflow = Label.Overflow.CLAMP;

    if (this.inputMode === InputMode.ANY) {
      placeholderLabel.verticalAlign = macro.VerticalTextAlignment.TOP;
      placeholderLabel.enableWrapText = true;
    } else {
      placeholderLabel.verticalAlign = macro.VerticalTextAlignment.CENTER;
      placeholderLabel.enableWrapText = false;
    }

    placeholderLabel.string = this.placeholder; // handle old data

    if (this._N$placeholderFontColor !== undefined) {
      placeholderLabel.node.color = this._N$placeholderFontColor;
      placeholderLabel.node.opacity = this._N$placeholderFontColor.a;
      this._N$placeholderFontColor = undefined;
    }

    if (this._N$placeholderFontSize !== undefined) {
      placeholderLabel.fontSize = this._N$placeholderFontSize;
      this._N$placeholderFontSize = undefined;
    }
  },
  _upgradeComp: function _upgradeComp() {
    if (this._N$returnType !== undefined) {
      this.returnType = this._N$returnType;
      this._N$returnType = undefined;
    }

    if (this._N$maxLength !== undefined) {
      this.maxLength = this._N$maxLength;
      this._N$maxLength = undefined;
    }

    if (this._N$backgroundImage !== undefined) {
      this._updateBackgroundSprite();
    }

    if (this._N$fontColor !== undefined || this._N$fontSize !== undefined || this._N$lineHeight !== undefined) {
      this._updateTextLabel();
    }

    if (this._N$placeholderFontColor !== undefined || this._N$placeholderFontSize !== undefined) {
      this._updatePlaceholderLabel();
    }

    if (this._N$placeholder !== undefined) {
      this.placeholder = this._N$placeholder;
      this._N$placeholder = undefined;
    }
  },
  _syncSize: function _syncSize() {
    if (this._impl) {
      var size = this.node.getContentSize();

      this._impl.setSize(size.width, size.height);
    }
  },
  _showLabels: function _showLabels() {
    this._isLabelVisible = true;

    this._updateLabels();
  },
  _hideLabels: function _hideLabels() {
    this._isLabelVisible = false;

    if (this.textLabel) {
      this.textLabel.node.active = false;
    }

    if (this.placeholderLabel) {
      this.placeholderLabel.node.active = false;
    }
  },
  _updateLabels: function _updateLabels() {
    if (this._isLabelVisible) {
      var content = this._string;

      if (this.textLabel) {
        this.textLabel.node.active = content !== '';
      }

      if (this.placeholderLabel) {
        this.placeholderLabel.node.active = content === '';
      }
    }
  },
  _updateString: function _updateString(text) {
    var textLabel = this.textLabel; // Not inited yet

    if (!textLabel) {
      return;
    }

    var displayText = text;

    if (displayText) {
      displayText = this._updateLabelStringStyle(displayText);
    }

    textLabel.string = displayText;

    this._updateLabels();
  },
  _updateLabelStringStyle: function _updateLabelStringStyle(text, ignorePassword) {
    var inputFlag = this.inputFlag;

    if (!ignorePassword && inputFlag === InputFlag.PASSWORD) {
      var passwordString = '';
      var len = text.length;

      for (var i = 0; i < len; ++i) {
        passwordString += "\u25CF";
      }

      text = passwordString;
    } else if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      text = text.toUpperCase();
    } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
      text = capitalize(text);
    } else if (inputFlag === InputFlag.INITIAL_CAPS_SENTENCE) {
      text = capitalizeFirstLetter(text);
    }

    return text;
  },
  editBoxEditingDidBegan: function editBoxEditingDidBegan() {
    cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
    this.node.emit('editing-did-began', this);
  },
  editBoxEditingDidEnded: function editBoxEditingDidEnded() {
    cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
    this.node.emit('editing-did-ended', this);
  },
  editBoxTextChanged: function editBoxTextChanged(text) {
    text = this._updateLabelStringStyle(text, true);
    this.string = text;
    cc.Component.EventHandler.emitEvents(this.textChanged, text, this);
    this.node.emit('text-changed', this);
  },
  editBoxEditingReturn: function editBoxEditingReturn() {
    cc.Component.EventHandler.emitEvents(this.editingReturn, this);
    this.node.emit('editing-return', this);
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR) {
      this._registerEvent();
    }

    if (this._impl) {
      this._impl.enable();
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR) {
      this._unregisterEvent();
    }

    if (this._impl) {
      this._impl.disable();
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.clear();
    }
  },
  __preload: function __preload() {
    this._init();
  },
  _registerEvent: function _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  },
  _unregisterEvent: function _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
  },
  _onTouchBegan: function _onTouchBegan(event) {
    event.stopPropagation();
  },
  _onTouchCancel: function _onTouchCancel(event) {
    event.stopPropagation();
  },
  _onTouchEnded: function _onTouchEnded(event) {
    if (this._impl) {
      this._impl.beginEditing();
    }

    event.stopPropagation();
  },

  /**
   * !#en Let the EditBox get focus, this method will be removed on v2.1
   * !#zh 让当前 EditBox 获得焦点, 这个方法会在 v2.1 中移除
   * @method setFocus
   * @deprecated since 2.0.8
   */
  setFocus: function setFocus() {
    cc.errorID(1400, 'setFocus()', 'focus()');

    if (this._impl) {
      this._impl.setFocus(true);
    }
  },

  /**
   * !#en Let the EditBox get focus
   * !#zh 让当前 EditBox 获得焦点
   * @method focus
   */
  focus: function focus() {
    if (this._impl) {
      this._impl.setFocus(true);
    }
  },

  /**
   * !#en Let the EditBox lose focus
   * !#zh 让当前 EditBox 失去焦点
   * @method blur
   */
  blur: function blur() {
    if (this._impl) {
      this._impl.setFocus(false);
    }
  },

  /**
   * !#en Determine whether EditBox is getting focus or not.
   * !#zh 判断 EditBox 是否获得了焦点
   * @method isFocused
   */
  isFocused: function isFocused() {
    if (this._impl) {
      return this._impl.isFocused();
    } else {
      return false;
    }
  },
  update: function update() {
    if (this._impl) {
      this._impl.update();
    }
  }
});
cc.EditBox = module.exports = EditBox;

if (cc.sys.isBrowser) {
  require('./WebEditBoxImpl');
}
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-did-began
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-did-ended
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event text-changed
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event editing-return
 * @param {Event.EventCustom} event
 * @param {EditBox} editbox - The EditBox component.
 */

/**
 * !#en if you don't need the EditBox and it isn't in any running Scene, you should
 * call the destroy method on this component or the associated node explicitly.
 * Otherwise, the created DOM element won't be removed from web page.
 * !#zh
 * 如果你不再使用 EditBox，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
 * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
 * @example
 * editbox.node.parent = null;  // or  editbox.node.removeFromParent(false);
 * // when you don't need editbox anymore
 * editbox.node.destroy();
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXGVkaXRib3hcXENDRWRpdEJveC5qcyJdLCJuYW1lcyI6WyJtYWNybyIsInJlcXVpcmUiLCJFZGl0Qm94SW1wbEJhc2UiLCJMYWJlbCIsIlR5cGVzIiwiSW5wdXRNb2RlIiwiSW5wdXRGbGFnIiwiS2V5Ym9hcmRSZXR1cm5UeXBlIiwiY2FwaXRhbGl6ZSIsInN0cmluZyIsInJlcGxhY2UiLCJhIiwidG9VcHBlckNhc2UiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJjaGFyQXQiLCJzbGljZSIsIkVkaXRCb3giLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJpbnNwZWN0b3IiLCJoZWxwIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJwcm9wZXJ0aWVzIiwiX3N0cmluZyIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIm1heExlbmd0aCIsImxlbmd0aCIsIl91cGRhdGVTdHJpbmciLCJ0ZXh0TGFiZWwiLCJ0eXBlIiwibm90aWZ5Iiwib2xkVmFsdWUiLCJfdXBkYXRlVGV4dExhYmVsIiwiX3VwZGF0ZUxhYmVscyIsInBsYWNlaG9sZGVyTGFiZWwiLCJfdXBkYXRlUGxhY2Vob2xkZXJMYWJlbCIsImJhY2tncm91bmQiLCJTcHJpdGUiLCJfdXBkYXRlQmFja2dyb3VuZFNwcml0ZSIsIl9OJGJhY2tncm91bmRJbWFnZSIsInVuZGVmaW5lZCIsIlNwcml0ZUZyYW1lIiwiYmFja2dyb3VuZEltYWdlIiwic3ByaXRlRnJhbWUiLCJyZXR1cm5UeXBlIiwiREVGQVVMVCIsImRpc3BsYXlOYW1lIiwiX04kcmV0dXJuVHlwZSIsIkZsb2F0IiwiaW5wdXRGbGFnIiwiaW5wdXRNb2RlIiwiQU5ZIiwiZm9udFNpemUiLCJfTiRmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJfTiRsaW5lSGVpZ2h0IiwiZm9udENvbG9yIiwiQ29sb3IiLCJCTEFDSyIsIm5vZGUiLCJjb2xvciIsIm9wYWNpdHkiLCJfTiRmb250Q29sb3IiLCJwbGFjZWhvbGRlciIsIl9OJHBsYWNlaG9sZGVyIiwiU3RyaW5nIiwicGxhY2Vob2xkZXJGb250U2l6ZSIsIl9OJHBsYWNlaG9sZGVyRm9udFNpemUiLCJwbGFjZWhvbGRlckZvbnRDb2xvciIsIl9OJHBsYWNlaG9sZGVyRm9udENvbG9yIiwiX04kbWF4TGVuZ3RoIiwic3RheU9uVG9wIiwid2FybiIsIl90YWJJbmRleCIsInRhYkluZGV4IiwiX2ltcGwiLCJzZXRUYWJJbmRleCIsImVkaXRpbmdEaWRCZWdhbiIsIkV2ZW50SGFuZGxlciIsInRleHRDaGFuZ2VkIiwiZWRpdGluZ0RpZEVuZGVkIiwiZWRpdGluZ1JldHVybiIsInN0YXRpY3MiLCJfSW1wbENsYXNzIiwiX2luaXQiLCJfdXBncmFkZUNvbXAiLCJfaXNMYWJlbFZpc2libGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJTSVpFX0NIQU5HRUQiLCJfc3luY1NpemUiLCJpbXBsIiwiaW5pdCIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiYWRkQ29tcG9uZW50IiwicGFyZW50IiwiVHlwZSIsIlNMSUNFRCIsInNldEFuY2hvclBvaW50Iiwib3ZlcmZsb3ciLCJPdmVyZmxvdyIsIkNMQU1QIiwidmVydGljYWxBbGlnbiIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIlRPUCIsImVuYWJsZVdyYXBUZXh0IiwiQ0VOVEVSIiwiX3VwZGF0ZUxhYmVsU3RyaW5nU3R5bGUiLCJzaXplIiwiZ2V0Q29udGVudFNpemUiLCJzZXRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJfc2hvd0xhYmVscyIsIl9oaWRlTGFiZWxzIiwiYWN0aXZlIiwiY29udGVudCIsInRleHQiLCJkaXNwbGF5VGV4dCIsImlnbm9yZVBhc3N3b3JkIiwiUEFTU1dPUkQiLCJwYXNzd29yZFN0cmluZyIsImxlbiIsImkiLCJJTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMiLCJJTklUSUFMX0NBUFNfV09SRCIsIklOSVRJQUxfQ0FQU19TRU5URU5DRSIsImVkaXRCb3hFZGl0aW5nRGlkQmVnYW4iLCJlbWl0RXZlbnRzIiwiZW1pdCIsImVkaXRCb3hFZGl0aW5nRGlkRW5kZWQiLCJlZGl0Qm94VGV4dENoYW5nZWQiLCJlZGl0Qm94RWRpdGluZ1JldHVybiIsIm9uRW5hYmxlIiwiX3JlZ2lzdGVyRXZlbnQiLCJlbmFibGUiLCJvbkRpc2FibGUiLCJfdW5yZWdpc3RlckV2ZW50IiwiZGlzYWJsZSIsIm9uRGVzdHJveSIsImNsZWFyIiwiX19wcmVsb2FkIiwiVE9VQ0hfU1RBUlQiLCJfb25Ub3VjaEJlZ2FuIiwiVE9VQ0hfRU5EIiwiX29uVG91Y2hFbmRlZCIsIm9mZiIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiX29uVG91Y2hDYW5jZWwiLCJiZWdpbkVkaXRpbmciLCJzZXRGb2N1cyIsImVycm9ySUQiLCJmb2N1cyIsImJsdXIiLCJpc0ZvY3VzZWQiLCJ1cGRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwic3lzIiwiaXNCcm93c2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyx3QkFBRCxDQUFyQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyw0QkFBRCxDQUEvQjs7QUFDQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUNBLElBQU1HLEtBQUssR0FBR0gsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUksU0FBUyxHQUFHRCxLQUFLLENBQUNDLFNBQXhCO0FBQ0EsSUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUNFLFNBQXhCO0FBQ0EsSUFBTUMs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi4vLi4vcGxhdGZvcm0vQ0NNYWNybycpO1xyXG5jb25zdCBFZGl0Qm94SW1wbEJhc2UgPSByZXF1aXJlKCcuLi9lZGl0Ym94L0VkaXRCb3hJbXBsQmFzZScpO1xyXG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uL0NDTGFiZWwnKTtcclxuY29uc3QgVHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XHJcbmNvbnN0IElucHV0TW9kZSA9IFR5cGVzLklucHV0TW9kZTtcclxuY29uc3QgSW5wdXRGbGFnID0gVHlwZXMuSW5wdXRGbGFnO1xyXG5jb25zdCBLZXlib2FyZFJldHVyblR5cGUgPSBUeXBlcy5LZXlib2FyZFJldHVyblR5cGU7XHJcblxyXG5mdW5jdGlvbiBjYXBpdGFsaXplIChzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvKD86XnxcXHMpXFxTL2csIGZ1bmN0aW9uKGEpIHsgcmV0dXJuIGEudG9VcHBlckNhc2UoKTsgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlciAoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gY2MuRWRpdEJveCBpcyBhIGNvbXBvbmVudCBmb3IgaW5wdXRpbmcgdGV4dCwgeW91IGNhbiB1c2UgaXQgdG8gZ2F0aGVyIHNtYWxsIGFtb3VudHMgb2YgdGV4dCBmcm9tIHVzZXJzLlxyXG4gKiAhI3poIEVkaXRCb3gg57uE5Lu277yM55So5LqO6I635Y+W55So5oi355qE6L6T5YWl5paH5pys44CCXHJcbiAqIEBjbGFzcyBFZGl0Qm94XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxubGV0IEVkaXRCb3ggPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuRWRpdEJveCcsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvRWRpdEJveCcsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9jY2VkaXRib3guanMnLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5lZGl0Ym94JyxcclxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9zdHJpbmc6ICcnLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSW5wdXQgc3RyaW5nIG9mIEVkaXRCb3guXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbnmoTliJ3lp4vovpPlhaXlhoXlrrnvvIzlpoLmnpzkuLrnqbrliJnkvJrmmL7npLrljaDkvY3nrKbnmoTmlofmnKzjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gc3RyaW5nXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3RyaW5nOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZWRpdGJveC5zdHJpbmcnLFxyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmluZztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXhMZW5ndGggPj0gMCAmJiB2YWx1ZS5sZW5ndGggPj0gdGhpcy5tYXhMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIHRoaXMubWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBMYWJlbCBjb21wb25lbnQgYXR0YWNoZWQgdG8gdGhlIG5vZGUgZm9yIEVkaXRCb3gncyBpbnB1dCB0ZXh0IGxhYmVsXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbovpPlhaXmlofmnKzoioLngrnkuIrmjILovb3nmoQgTGFiZWwg57uE5Lu25a+56LGhXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbH0gdGV4dExhYmVsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGV4dExhYmVsOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZWRpdGJveC50ZXh0TGFiZWwnLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBMYWJlbCxcclxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGV4dExhYmVsICYmIHRoaXMudGV4dExhYmVsICE9PSBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHRMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxhYmVscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBMYWJlbCBjb21wb25lbnQgYXR0YWNoZWQgdG8gdGhlIG5vZGUgZm9yIEVkaXRCb3gncyBwbGFjZWhvbGRlciB0ZXh0IGxhYmVsXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbljaDkvY3nrKboioLngrnkuIrmjILovb3nmoQgTGFiZWwg57uE5Lu25a+56LGhXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYWJlbH0gcGxhY2Vob2xkZXJMYWJlbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBsYWNlaG9sZGVyTGFiZWw6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LnBsYWNlaG9sZGVyTGFiZWwnLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBMYWJlbCxcclxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXJMYWJlbCAmJiB0aGlzLnBsYWNlaG9sZGVyTGFiZWwgIT09IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUGxhY2Vob2xkZXJMYWJlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxhYmVscygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIFNwcml0ZSBjb21wb25lbnQgYXR0YWNoZWQgdG8gdGhlIG5vZGUgZm9yIEVkaXRCb3gncyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbog4zmma/oioLngrnkuIrmjILovb3nmoQgU3ByaXRlIOe7hOS7tuWvueixoVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3ByaXRlfSBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYmFja2dyb3VuZDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3guYmFja2dyb3VuZCcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgbm90aWZ5IChvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmFja2dyb3VuZCAmJiB0aGlzLmJhY2tncm91bmQgIT09IG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQmFja2dyb3VuZFNwcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIF9OJGJhY2tncm91bmRJbWFnZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGJhY2tncm91bmQgaW1hZ2Ugb2YgRWRpdEJveC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgdXNlIGVkaXRCb3guYmFja2dyb3VuZCBpbnN0ZWFkIHBsZWFzZS5cclxuICAgICAgICAgKiAhI3poIOi+k+WFpeahhueahOiDjOaZr+WbvueJh+OAgiDor6XlsZ7mgKfkvJrlnKjlsIbmnaXnmoTniYjmnKzkuK3np7vpmaTvvIzor7fnlKggZWRpdEJveC5iYWNrZ3JvdW5kXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gYmFja2dyb3VuZEltYWdlXHJcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJhY2tncm91bmRJbWFnZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5iYWNrZ3JvdW5kSW1hZ2UnLCAnZWRpdEJveC5iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFja2dyb3VuZC5zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5iYWNrZ3JvdW5kSW1hZ2UnLCAnZWRpdEJveC5iYWNrZ3JvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNwcml0ZUZyYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSByZXR1cm4ga2V5IHR5cGUgb2YgRWRpdEJveC5cclxuICAgICAgICAgKiBOb3RlOiBpdCBpcyBtZWFuaW5nbGVzcyBmb3Igd2ViIHBsYXRmb3JtcyBhbmQgZGVza3RvcCBwbGF0Zm9ybXMuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaMh+Wumuenu+WKqOiuvuWkh+S4iumdouWbnui9puaMiemSrueahOagt+W8j+OAglxyXG4gICAgICAgICAqIOazqOaEj++8mui/meS4qumAiemhueWvuSB3ZWIg5bmz5Y+w5LiOIGRlc2t0b3Ag5bmz5Y+w5peg5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtFZGl0Qm94LktleWJvYXJkUmV0dXJuVHlwZX0gcmV0dXJuVHlwZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IEtleWJvYXJkUmV0dXJuVHlwZS5ERUZBVUxUXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmV0dXJuVHlwZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBLZXlib2FyZFJldHVyblR5cGUuREVGQVVMVCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LnJldHVyblR5cGUnLFxyXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0tleWJvYXJkUmV0dXJuVHlwZScsXHJcbiAgICAgICAgICAgIHR5cGU6IEtleWJvYXJkUmV0dXJuVHlwZSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBUbyBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBfTiRyZXR1cm5UeXBlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBTZXQgdGhlIGlucHV0IGZsYWdzIHRoYXQgYXJlIHRvIGJlIGFwcGxpZWQgdG8gdGhlIEVkaXRCb3guXHJcbiAgICAgICAgICogISN6aCDmjIflrprovpPlhaXmoIflv5fkvY3vvIzlj6/ku6XmjIflrprovpPlhaXmlrnlvI/kuLrlr4bnoIHmiJbogIXljZXor43pppblrZfmr43lpKflhpnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0VkaXRCb3guSW5wdXRGbGFnfSBpbnB1dEZsYWdcclxuICAgICAgICAgKiBAZGVmYXVsdCBJbnB1dEZsYWcuREVGQVVMVFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlucHV0RmxhZzoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3guaW5wdXRfZmxhZycsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IElucHV0RmxhZy5ERUZBVUxULFxyXG4gICAgICAgICAgICB0eXBlOiBJbnB1dEZsYWcsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdHJpbmcodGhpcy5fc3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFNldCB0aGUgaW5wdXQgbW9kZSBvZiB0aGUgZWRpdCBib3guXHJcbiAgICAgICAgICogSWYgeW91IHBhc3MgQU5ZLCBpdCB3aWxsIGNyZWF0ZSBhIG11bHRpbGluZSBFZGl0Qm94LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmjIflrprovpPlhaXmqKHlvI86IEFOWeihqOekuuWkmuihjOi+k+WFpe+8jOWFtuWug+mDveaYr+WNleihjOi+k+WFpe+8jOenu+WKqOW5s+WPsOS4iui/mOWPr+S7peaMh+WumumUruebmOagt+W8j+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7RWRpdEJveC5JbnB1dE1vZGV9IGlucHV0TW9kZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IElucHV0TW9kZS5BTllcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnB1dE1vZGU6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LmlucHV0X21vZGUnLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBJbnB1dE1vZGUuQU5ZLFxyXG4gICAgICAgICAgICB0eXBlOiBJbnB1dE1vZGUsXHJcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSAhPT0gb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVUZXh0TGFiZWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQbGFjZWhvbGRlckxhYmVsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEZvbnQgc2l6ZSBvZiB0aGUgaW5wdXQgdGV4dC4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgdXNlIGVkaXRCb3gudGV4dExhYmVsLmZvbnRTaXplIGluc3RlYWQgcGxlYXNlLlxyXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5paH5pys55qE5a2X5L2T5aSn5bCP44CCIOivpeWxnuaAp+S8muWcqOWwhuadpeeahOeJiOacrOS4reenu+mZpO+8jOivt+S9v+eUqCBlZGl0Qm94LnRleHRMYWJlbC5mb250U2l6ZeOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmb250U2l6ZVxyXG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcclxuICAgICAgICAgKi9cclxuICAgICAgICBmb250U2l6ZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5mb250U2l6ZScsICdlZGl0Qm94LnRleHRMYWJlbC5mb250U2l6ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dExhYmVsLmZvbnRTaXplO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LmZvbnRTaXplJywgJ2VkaXRCb3gudGV4dExhYmVsLmZvbnRTaXplJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRMYWJlbC5mb250U2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIF9OJGZvbnRTaXplOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBDaGFuZ2UgdGhlIGxpbmVIZWlnaHQgb2YgZGlzcGxheWVkIHRleHQuIFRoaXMgcHJvcGVydHkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIHVzZSBlZGl0Qm94LnRleHRMYWJlbC5saW5lSGVpZ2h0IGluc3RlYWQuXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbmlofmnKznmoTooYzpq5jjgILor6XlsZ7mgKfkvJrlnKjlsIbmnaXnmoTniYjmnKzkuK3np7vpmaTvvIzor7fkvb/nlKggZWRpdEJveC50ZXh0TGFiZWwubGluZUhlaWdodFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsaW5lSGVpZ2h0XHJcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxpbmVIZWlnaHQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3gubGluZUhlaWdodCcsICdlZGl0Qm94LnRleHRMYWJlbC5saW5lSGVpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGV4dExhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0TGFiZWwubGluZUhlaWdodDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIGNjLndhcm5JRCgxNDAwLCAnZWRpdEJveC5saW5lSGVpZ2h0JywgJ2VkaXRCb3gudGV4dExhYmVsLmxpbmVIZWlnaHQnKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLmxpbmVIZWlnaHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBUbyBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBfTiRsaW5lSGVpZ2h0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBGb250IGNvbG9yIG9mIHRoZSBpbnB1dCB0ZXh0LiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlLCB1c2UgZWRpdEJveC50ZXh0TGFiZWwubm9kZS5jb2xvciBpbnN0ZWFkLlxyXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5paH5pys55qE6aKc6Imy44CC6K+l5bGe5oCn5Lya5Zyo5bCG5p2l55qE54mI5pys5Lit56e76Zmk77yM6K+35L2/55SoIGVkaXRCb3gudGV4dExhYmVsLm5vZGUuY29sb3JcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbG9yfSBmb250Q29sb3JcclxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9udENvbG9yOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LmZvbnRDb2xvcicsICdlZGl0Qm94LnRleHRMYWJlbC5ub2RlLmNvbG9yJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudGV4dExhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dExhYmVsLm5vZGUuY29sb3I7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3guZm9udENvbG9yJywgJ2VkaXRCb3gudGV4dExhYmVsLm5vZGUuY29sb3InKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLm5vZGUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRMYWJlbC5ub2RlLm9wYWNpdHkgPSB2YWx1ZS5hO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIF9OJGZvbnRDb2xvcjogdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBkaXNwbGF5IHRleHQgb2YgcGxhY2Vob2xkZXIuXHJcbiAgICAgICAgICogISN6aCDovpPlhaXmoYbljaDkvY3nrKbnmoTmlofmnKzlhoXlrrnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gcGxhY2Vob2xkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwbGFjZWhvbGRlcjoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gucGxhY2Vob2xkZXInLFxyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYWNlaG9sZGVyTGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlckxhYmVsLnN0cmluZztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxhY2Vob2xkZXJMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5zdHJpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIF9OJHBsYWNlaG9sZGVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHlwZTogY2MuU3RyaW5nLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGZvbnQgc2l6ZSBvZiBwbGFjZWhvbGRlci4gVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZSwgdXNlIGVkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSBpbnN0ZWFkLlxyXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5Y2g5L2N56ym55qE5a2X5L2T5aSn5bCP44CC6K+l5bGe5oCn5Lya5Zyo5bCG5p2l55qE54mI5pys5Lit56e76Zmk77yM6K+35L2/55SoIGVkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwbGFjZWhvbGRlckZvbnRTaXplXHJcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBsYWNlaG9sZGVyRm9udFNpemU6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3gucGxhY2Vob2xkZXJGb250U2l6ZScsICdlZGl0Qm94LnBsYWNlaG9sZGVyTGFiZWwuZm9udFNpemUnKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LnBsYWNlaG9sZGVyRm9udFNpemUnLCAnZWRpdEJveC5wbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gVG8gYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlXHJcbiAgICAgICAgX04kcGxhY2Vob2xkZXJGb250U2l6ZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGZvbnQgY29sb3Igb2YgcGxhY2Vob2xkZXIuIFRoaXMgcHJvcGVydHkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmUsIHVzZSBlZGl0Qm94LnBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvciBpbnN0ZWFkLlxyXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5Y2g5L2N56ym55qE5a2X5L2T6aKc6Imy44CC6K+l5bGe5oCn5Lya5Zyo5bCG5p2l55qE54mI5pys5Lit56e76Zmk77yM6K+35L2/55SoIGVkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gcGxhY2Vob2xkZXJGb250Q29sb3JcclxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGxhY2Vob2xkZXJGb250Q29sb3I6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmICghQ0NfRURJVE9SKSBjYy53YXJuSUQoMTQwMCwgJ2VkaXRCb3gucGxhY2Vob2xkZXJGb250Q29sb3InLCAnZWRpdEJveC5wbGFjZWhvbGRlckxhYmVsLm5vZGUuY29sb3InKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgY2Mud2FybklEKDE0MDAsICdlZGl0Qm94LnBsYWNlaG9sZGVyRm9udENvbG9yJywgJ2VkaXRCb3gucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckxhYmVsLm5vZGUuY29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTGFiZWwubm9kZS5vcGFjaXR5ID0gdmFsdWUuYTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBUbyBiZSByZW1vdmVkIGluIHRoZSBmdXR1cmVcclxuICAgICAgICBfTiRwbGFjZWhvbGRlckZvbnRDb2xvcjogdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBtYXhpbWl6ZSBpbnB1dCBsZW5ndGggb2YgRWRpdEJveC5cclxuICAgICAgICAgKiAtIElmIHBhc3MgYSB2YWx1ZSBsZXNzIHRoYW4gMCwgaXQgd29uJ3QgbGltaXQgdGhlIGlucHV0IG51bWJlciBvZiBjaGFyYWN0ZXJzLlxyXG4gICAgICAgICAqIC0gSWYgcGFzcyAwLCBpdCBkb2Vzbid0IGFsbG93IGlucHV0IGFueSBjaGFyYWN0ZXJzLlxyXG4gICAgICAgICAqICEjemgg6L6T5YWl5qGG5pyA5aSn5YWB6K646L6T5YWl55qE5a2X56ym5Liq5pWw44CCXHJcbiAgICAgICAgICogLSDlpoLmnpzlgLzkuLrlsI/kuo4gMCDnmoTlgLzvvIzliJnkuI3kvJrpmZDliLbovpPlhaXlrZfnrKbkuKrmlbDjgIJcclxuICAgICAgICAgKiAtIOWmguaenOWAvOS4uiAw77yM5YiZ5LiN5YWB6K6455So5oi36L+b6KGM5Lu75L2V6L6T5YWl44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heExlbmd0aFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heExlbmd0aDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmVkaXRib3gubWF4X2xlbmd0aCcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDIwLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRvIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIF9OJG1heExlbmd0aDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGlucHV0IGlzIGFsd2F5cyB2aXNpYmxlIGFuZCBiZSBvbiB0b3Agb2YgdGhlIGdhbWUgdmlldyAob25seSB1c2VmdWwgb24gV2ViKSwgdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgb24gdjIuMVxyXG4gICAgICAgICAqICF6aCDovpPlhaXmoYbmgLvmmK/lj6/op4HvvIzlubbkuJTmsLjov5zlnKjmuLjmiI/op4blm77nmoTkuIrpnaLvvIjov5nkuKrlsZ7mgKflj6rmnInlnKggV2ViIOS4iumdouS/ruaUueacieaEj+S5ie+8ie+8jOivpeWxnuaAp+S8muWcqCB2Mi4xIOS4reenu+mZpFxyXG4gICAgICAgICAqIE5vdGU6IG9ubHkgYXZhaWxhYmxlIG9uIFdlYiBhdCB0aGUgbW9tZW50LlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc3RheU9uVG9wXHJcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgMi4wLjhcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdGF5T25Ub3A6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuKCdlZGl0Qm94LnN0YXlPblRvcCBpcyByZW1vdmVkIHNpbmNlIHYyLjEuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfdGFiSW5kZXg6IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gU2V0IHRoZSB0YWJJbmRleCBvZiB0aGUgRE9NIGlucHV0IGVsZW1lbnQgKG9ubHkgdXNlZnVsIG9uIFdlYikuXHJcbiAgICAgICAgICogISN6aCDkv67mlLkgRE9NIOi+k+WFpeWFg+e0oOeahCB0YWJJbmRleO+8iOi/meS4quWxnuaAp+WPquacieWcqCBXZWIg5LiK6Z2i5L+u5pS55pyJ5oSP5LmJ77yJ44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRhYkluZGV4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGFiSW5kZXg6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5lZGl0Ym94LnRhYl9pbmRleCcsXHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFiSW5kZXg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90YWJJbmRleCAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YWJJbmRleCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwuc2V0VGFiSW5kZXgodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIHdoZW4gRWRpdEJveCBiZWdhbiB0byBlZGl0IHRleHQuXHJcbiAgICAgICAgICogISN6aCDlvIDlp4vnvJbovpHmlofmnKzovpPlhaXmoYbop6blj5HnmoTkuovku7blm57osIPjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gZWRpdGluZ0RpZEJlZ2FuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZWRpdGluZ0RpZEJlZ2FuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIHdoZW4gRWRpdEJveCB0ZXh0IGNoYW5nZXMuXHJcbiAgICAgICAgICogISN6aCDnvJbovpHmlofmnKzovpPlhaXmoYbml7bop6blj5HnmoTkuovku7blm57osIPjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gdGV4dENoYW5nZWRcclxuICAgICAgICAgKi9cclxuICAgICAgICB0ZXh0Q2hhbmdlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBldmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZCB3aGVuIEVkaXRCb3ggZWRpdCBlbmRzLlxyXG4gICAgICAgICAqICEjemgg57uT5p2f57yW6L6R5paH5pys6L6T5YWl5qGG5pe26Kem5Y+R55qE5LqL5Lu25Zue6LCD44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGVkaXRpbmdEaWRFbmRlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVkaXRpbmdEaWRFbmRlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBldmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZCB3aGVuIHJldHVybiBrZXkgaXMgcHJlc3NlZC4gV2luZG93cyBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gICAgICAgICAqICEjemgg5b2T55So5oi35oyJ5LiL5Zue6L2m5oyJ6ZSu5pe255qE5LqL5Lu25Zue6LCD77yM55uu5YmN5LiN5pSv5oyBIHdpbmRvd3Mg5bmz5Y+wXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGVkaXRpbmdSZXR1cm5cclxuICAgICAgICAgKi9cclxuICAgICAgICBlZGl0aW5nUmV0dXJuOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIF9JbXBsQ2xhc3M6IEVkaXRCb3hJbXBsQmFzZSwgIC8vIGltcGxlbWVudGVkIG9uIGRpZmZlcmVudCBwbGF0Zm9ybSBhZGFwdGVyXHJcbiAgICAgICAgS2V5Ym9hcmRSZXR1cm5UeXBlOiBLZXlib2FyZFJldHVyblR5cGUsXHJcbiAgICAgICAgSW5wdXRGbGFnOiBJbnB1dEZsYWcsXHJcbiAgICAgICAgSW5wdXRNb2RlOiBJbnB1dE1vZGVcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXQgKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZ3JhZGVDb21wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2lzTGFiZWxWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl9zeW5jU2l6ZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbCA9IG5ldyBFZGl0Qm94Ll9JbXBsQ2xhc3MoKTtcclxuICAgICAgICBpbXBsLmluaXQodGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0cmluZyh0aGlzLl9zdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuX3N5bmNTaXplKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVCYWNrZ3JvdW5kU3ByaXRlICgpIHtcclxuICAgICAgICBsZXQgYmFja2dyb3VuZCA9IHRoaXMuYmFja2dyb3VuZDtcclxuXHJcbiAgICAgICAgLy8gSWYgYmFja2dyb3VuZCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lLlxyXG4gICAgICAgIGlmICghYmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnQkFDS0dST1VORF9TUFJJVEUnKTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoJ0JBQ0tHUk9VTkRfU1BSSVRFJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBpZiAoIWJhY2tncm91bmQpIHtcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlXHJcbiAgICAgICAgYmFja2dyb3VuZC50eXBlID0gY2MuU3ByaXRlLlR5cGUuU0xJQ0VEO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGhhbmRsZSBvbGQgZGF0YVxyXG4gICAgICAgIGlmICh0aGlzLl9OJGJhY2tncm91bmRJbWFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQuc3ByaXRlRnJhbWUgPSB0aGlzLl9OJGJhY2tncm91bmRJbWFnZTtcclxuICAgICAgICAgICAgdGhpcy5fTiRiYWNrZ3JvdW5kSW1hZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVGV4dExhYmVsICgpIHtcclxuICAgICAgICBsZXQgdGV4dExhYmVsID0gdGhpcy50ZXh0TGFiZWw7XHJcblxyXG4gICAgICAgIC8vIElmIHRleHRMYWJlbCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgb25lLlxyXG4gICAgICAgIGlmICghdGV4dExhYmVsKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdURVhUX0xBQkVMJyk7XHJcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCdURVhUX0xBQkVMJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGV4dExhYmVsID0gbm9kZS5nZXRDb21wb25lbnQoTGFiZWwpO1xyXG4gICAgICAgICAgICBpZiAoIXRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgdGV4dExhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoTGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRMYWJlbCA9IHRleHRMYWJlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZVxyXG4gICAgICAgIHRleHRMYWJlbC5ub2RlLnNldEFuY2hvclBvaW50KDAsIDEpO1xyXG4gICAgICAgIHRleHRMYWJlbC5vdmVyZmxvdyA9IExhYmVsLk92ZXJmbG93LkNMQU1QO1xyXG4gICAgICAgIGlmICh0aGlzLmlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkFOWSkge1xyXG4gICAgICAgICAgICB0ZXh0TGFiZWwudmVydGljYWxBbGlnbiA9IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5UT1A7XHJcbiAgICAgICAgICAgIHRleHRMYWJlbC5lbmFibGVXcmFwVGV4dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0TGFiZWwudmVydGljYWxBbGlnbiA9IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5DRU5URVI7XHJcbiAgICAgICAgICAgIHRleHRMYWJlbC5lbmFibGVXcmFwVGV4dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0TGFiZWwuc3RyaW5nID0gdGhpcy5fdXBkYXRlTGFiZWxTdHJpbmdTdHlsZSh0aGlzLl9zdHJpbmcpO1xyXG5cclxuICAgICAgICAvLyBoYW5kbGUgb2xkIGRhdGFcclxuICAgICAgICBpZiAodGhpcy5fTiRmb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0ZXh0TGFiZWwubm9kZS5jb2xvciA9IHRoaXMuX04kZm9udENvbG9yO1xyXG4gICAgICAgICAgICB0ZXh0TGFiZWwubm9kZS5vcGFjaXR5ID0gdGhpcy5fTiRmb250Q29sb3IuYTtcclxuICAgICAgICAgICAgdGhpcy5fTiRmb250Q29sb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9OJGZvbnRTaXplICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGV4dExhYmVsLmZvbnRTaXplID0gdGhpcy5fTiRmb250U2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5fTiRmb250U2l6ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX04kbGluZUhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRleHRMYWJlbC5saW5lSGVpZ2h0ID0gdGhpcy5fTiRsaW5lSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9OJGxpbmVIZWlnaHQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlUGxhY2Vob2xkZXJMYWJlbCAoKSB7XHJcbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyTGFiZWwgPSB0aGlzLnBsYWNlaG9sZGVyTGFiZWw7XHJcblxyXG4gICAgICAgIC8vIElmIHBsYWNlaG9sZGVyTGFiZWwgZG9lc24ndCBleGlzdCwgY3JlYXRlIG9uZS5cclxuICAgICAgICBpZiAoIXBsYWNlaG9sZGVyTGFiZWwpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1BMQUNFSE9MREVSX0xBQkVMJyk7XHJcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCdQTEFDRUhPTERFUl9MQUJFTCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwgPSBub2RlLmdldENvbXBvbmVudChMYWJlbCk7XHJcbiAgICAgICAgICAgIGlmICghcGxhY2Vob2xkZXJMYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KExhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlckxhYmVsID0gcGxhY2Vob2xkZXJMYWJlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZVxyXG4gICAgICAgIHBsYWNlaG9sZGVyTGFiZWwubm9kZS5zZXRBbmNob3JQb2ludCgwLCAxKTtcclxuICAgICAgICBwbGFjZWhvbGRlckxhYmVsLm92ZXJmbG93ID0gTGFiZWwuT3ZlcmZsb3cuQ0xBTVA7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuQU5ZKSB7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwudmVydGljYWxBbGlnbiA9IG1hY3JvLlZlcnRpY2FsVGV4dEFsaWdubWVudC5UT1A7XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyTGFiZWwuZW5hYmxlV3JhcFRleHQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC52ZXJ0aWNhbEFsaWduID0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50LkNFTlRFUjtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC5lbmFibGVXcmFwVGV4dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwbGFjZWhvbGRlckxhYmVsLnN0cmluZyA9IHRoaXMucGxhY2Vob2xkZXI7XHJcblxyXG4gICAgICAgIC8vIGhhbmRsZSBvbGQgZGF0YVxyXG4gICAgICAgIGlmICh0aGlzLl9OJHBsYWNlaG9sZGVyRm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC5ub2RlLmNvbG9yID0gdGhpcy5fTiRwbGFjZWhvbGRlckZvbnRDb2xvcjtcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXJMYWJlbC5ub2RlLm9wYWNpdHkgPSB0aGlzLl9OJHBsYWNlaG9sZGVyRm9udENvbG9yLmE7XHJcbiAgICAgICAgICAgIHRoaXMuX04kcGxhY2Vob2xkZXJGb250Q29sb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9OJHBsYWNlaG9sZGVyRm9udFNpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplID0gdGhpcy5fTiRwbGFjZWhvbGRlckZvbnRTaXplO1xyXG4gICAgICAgICAgICB0aGlzLl9OJHBsYWNlaG9sZGVyRm9udFNpemUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBncmFkZUNvbXAgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9OJHJldHVyblR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblR5cGUgPSB0aGlzLl9OJHJldHVyblR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuX04kcmV0dXJuVHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX04kbWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXhMZW5ndGggPSB0aGlzLl9OJG1heExlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5fTiRtYXhMZW5ndGggPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9OJGJhY2tncm91bmRJbWFnZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRTcHJpdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX04kZm9udENvbG9yICE9PSB1bmRlZmluZWQgfHwgdGhpcy5fTiRmb250U2l6ZSAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuX04kbGluZUhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRleHRMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fTiRwbGFjZWhvbGRlckZvbnRDb2xvciAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuX04kcGxhY2Vob2xkZXJGb250U2l6ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBsYWNlaG9sZGVyTGFiZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX04kcGxhY2Vob2xkZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5fTiRwbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgdGhpcy5fTiRwbGFjZWhvbGRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zeW5jU2l6ZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgbGV0IHNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRTaXplKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zaG93TGFiZWxzICgpIHtcclxuICAgICAgICB0aGlzLl9pc0xhYmVsVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWxzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9oaWRlTGFiZWxzICgpIHtcclxuICAgICAgICB0aGlzLl9pc0xhYmVsVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLnRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRleHRMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXJMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUxhYmVscyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTGFiZWxWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5fc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0TGFiZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLm5vZGUuYWN0aXZlID0gKGNvbnRlbnQgIT09ICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyTGFiZWwubm9kZS5hY3RpdmUgPSAoY29udGVudCA9PT0gJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlU3RyaW5nICh0ZXh0KSB7XHJcbiAgICAgICAgbGV0IHRleHRMYWJlbCA9IHRoaXMudGV4dExhYmVsO1xyXG4gICAgICAgIC8vIE5vdCBpbml0ZWQgeWV0XHJcbiAgICAgICAgaWYgKCF0ZXh0TGFiZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpc3BsYXlUZXh0ID0gdGV4dDtcclxuICAgICAgICBpZiAoZGlzcGxheVRleHQpIHtcclxuICAgICAgICAgICAgZGlzcGxheVRleHQgPSB0aGlzLl91cGRhdGVMYWJlbFN0cmluZ1N0eWxlKGRpc3BsYXlUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHRMYWJlbC5zdHJpbmcgPSBkaXNwbGF5VGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWxzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVMYWJlbFN0cmluZ1N0eWxlICh0ZXh0LCBpZ25vcmVQYXNzd29yZCkge1xyXG4gICAgICAgIGxldCBpbnB1dEZsYWcgPSB0aGlzLmlucHV0RmxhZztcclxuICAgICAgICBpZiAoIWlnbm9yZVBhc3N3b3JkICYmIGlucHV0RmxhZyA9PT0gSW5wdXRGbGFnLlBBU1NXT1JEKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXNzd29yZFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgbGVuID0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkU3RyaW5nICs9ICdcXHUyNUNGJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZXh0ID0gcGFzc3dvcmRTdHJpbmc7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuSU5JVElBTF9DQVBTX1dPUkQpIHtcclxuICAgICAgICAgICAgdGV4dCA9IGNhcGl0YWxpemUodGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlucHV0RmxhZyA9PT0gSW5wdXRGbGFnLklOSVRJQUxfQ0FQU19TRU5URU5DRSkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRCb3hFZGl0aW5nRGlkQmVnYW4gKCkge1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmVkaXRpbmdEaWRCZWdhbiwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2VkaXRpbmctZGlkLWJlZ2FuJywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRCb3hFZGl0aW5nRGlkRW5kZWQgKCkge1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmVkaXRpbmdEaWRFbmRlZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2VkaXRpbmctZGlkLWVuZGVkJywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRCb3hUZXh0Q2hhbmdlZCAodGV4dCkge1xyXG4gICAgICAgIHRleHQgPSB0aGlzLl91cGRhdGVMYWJlbFN0cmluZ1N0eWxlKHRleHQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy50ZXh0Q2hhbmdlZCwgdGV4dCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3RleHQtY2hhbmdlZCcsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlZGl0Qm94RWRpdGluZ1JldHVybigpIHtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5lZGl0aW5nUmV0dXJuLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnZWRpdGluZy1yZXR1cm4nLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5lbmFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfX3ByZWxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaEJlZ2FuLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdW5yZWdpc3RlckV2ZW50ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLl9vblRvdWNoQmVnYW4sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaEJlZ2FuIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaENhbmNlbCAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uVG91Y2hFbmRlZCAoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLmJlZ2luRWRpdGluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExldCB0aGUgRWRpdEJveCBnZXQgZm9jdXMsIHRoaXMgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBvbiB2Mi4xXHJcbiAgICAgKiAhI3poIOiuqeW9k+WJjSBFZGl0Qm94IOiOt+W+l+eEpueCuSwg6L+Z5Liq5pa55rOV5Lya5ZyoIHYyLjEg5Lit56e76ZmkXHJcbiAgICAgKiBAbWV0aG9kIHNldEZvY3VzXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSAyLjAuOFxyXG4gICAgICovXHJcbiAgICBzZXRGb2N1cyAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnc2V0Rm9jdXMoKScsICdmb2N1cygpJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRGb2N1cyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBMZXQgdGhlIEVkaXRCb3ggZ2V0IGZvY3VzXHJcbiAgICAgKiAhI3poIOiuqeW9k+WJjSBFZGl0Qm94IOiOt+W+l+eEpueCuVxyXG4gICAgICogQG1ldGhvZCBmb2N1c1xyXG4gICAgICovXHJcbiAgICBmb2N1cyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRGb2N1cyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBMZXQgdGhlIEVkaXRCb3ggbG9zZSBmb2N1c1xyXG4gICAgICogISN6aCDorqnlvZPliY0gRWRpdEJveCDlpLHljrvnhKbngrlcclxuICAgICAqIEBtZXRob2QgYmx1clxyXG4gICAgICovXHJcbiAgICBibHVyICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLnNldEZvY3VzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXRlcm1pbmUgd2hldGhlciBFZGl0Qm94IGlzIGdldHRpbmcgZm9jdXMgb3Igbm90LlxyXG4gICAgICogISN6aCDliKTmlq0gRWRpdEJveCDmmK/lkKbojrflvpfkuobnhKbngrlcclxuICAgICAqIEBtZXRob2QgaXNGb2N1c2VkXHJcbiAgICAgKi9cclxuICAgIGlzRm9jdXNlZCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltcGwuaXNGb2N1c2VkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jYy5FZGl0Qm94ID0gbW9kdWxlLmV4cG9ydHMgPSBFZGl0Qm94O1xyXG5cclxuaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgIHJlcXVpcmUoJy4vV2ViRWRpdEJveEltcGwnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgZWRpdGluZy1kaWQtYmVnYW5cclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtFZGl0Qm94fSBlZGl0Ym94IC0gVGhlIEVkaXRCb3ggY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGVkaXRpbmctZGlkLWVuZGVkXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7RWRpdEJveH0gZWRpdGJveCAtIFRoZSBFZGl0Qm94IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCB0ZXh0LWNoYW5nZWRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtFZGl0Qm94fSBlZGl0Ym94IC0gVGhlIEVkaXRCb3ggY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGVkaXRpbmctcmV0dXJuXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7RWRpdEJveH0gZWRpdGJveCAtIFRoZSBFZGl0Qm94IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBpZiB5b3UgZG9uJ3QgbmVlZCB0aGUgRWRpdEJveCBhbmQgaXQgaXNuJ3QgaW4gYW55IHJ1bm5pbmcgU2NlbmUsIHlvdSBzaG91bGRcclxuICogY2FsbCB0aGUgZGVzdHJveSBtZXRob2Qgb24gdGhpcyBjb21wb25lbnQgb3IgdGhlIGFzc29jaWF0ZWQgbm9kZSBleHBsaWNpdGx5LlxyXG4gKiBPdGhlcndpc2UsIHRoZSBjcmVhdGVkIERPTSBlbGVtZW50IHdvbid0IGJlIHJlbW92ZWQgZnJvbSB3ZWIgcGFnZS5cclxuICogISN6aFxyXG4gKiDlpoLmnpzkvaDkuI3lho3kvb/nlKggRWRpdEJveO+8jOW5tuS4lOe7hOS7tuacqua3u+WKoOWIsOWcuuaZr+S4re+8jOmCo+S5iOS9oOW/hemhu+aJi+WKqOWvuee7hOS7tuaIluaJgOWcqOiKgueCueiwg+eUqCBkZXN0cm9544CCXHJcbiAqIOi/meagt+aJjeiDveenu+mZpOe9kemhteS4iueahCBET00g6IqC54K577yM6YG/5YWNIFdlYiDlubPlj7DlhoXlrZjms4TpnLLjgIJcclxuICogQGV4YW1wbGVcclxuICogZWRpdGJveC5ub2RlLnBhcmVudCA9IG51bGw7ICAvLyBvciAgZWRpdGJveC5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gKiAvLyB3aGVuIHlvdSBkb24ndCBuZWVkIGVkaXRib3ggYW55bW9yZVxyXG4gKiBlZGl0Ym94Lm5vZGUuZGVzdHJveSgpO1xyXG4gKiBAbWV0aG9kIGRlc3Ryb3lcclxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGUgZGVzdHJveSBiZWluZyBjYWxsZWRcclxuICovIl0sInNvdXJjZVJvb3QiOiIvIn0=