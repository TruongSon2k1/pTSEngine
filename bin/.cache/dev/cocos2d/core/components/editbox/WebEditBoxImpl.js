
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/editbox/WebEditBoxImpl.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _mat = _interopRequireDefault(require("../../value-types/mat4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var utils = require('../../platform/utils');

var macro = require('../../platform/CCMacro');

var Types = require('./types');

var Label = require('../CCLabel');

var tabIndexUtil = require('./tabIndexUtil');

var EditBox = cc.EditBox;
var js = cc.js;
var InputMode = Types.InputMode;
var InputFlag = Types.InputFlag;
var KeyboardReturnType = Types.KeyboardReturnType; // polyfill

var polyfill = {
  zoomInvalid: false
};

if (cc.sys.OS_ANDROID === cc.sys.os && (cc.sys.browserType === cc.sys.BROWSER_TYPE_SOUGOU || cc.sys.browserType === cc.sys.BROWSER_TYPE_360)) {
  polyfill.zoomInvalid = true;
} // https://segmentfault.com/q/1010000002914610


var DELAY_TIME = 800;
var SCROLLY = 100;
var LEFT_PADDING = 2; // private static property

var _domCount = 0;

var _vec3 = cc.v3();

var _currentEditBoxImpl = null; // on mobile

var _fullscreen = false;
var _autoResize = false;
var BaseClass = EditBox._ImplClass; // This is an adapter for EditBoxImpl on web platform.
// For more adapters on other platforms, please inherit from EditBoxImplBase and implement the interface.

function WebEditBoxImpl() {
  BaseClass.call(this);
  this._domId = "EditBoxId_" + ++_domCount;
  this._placeholderStyleSheet = null;
  this._elem = null;
  this._isTextArea = false; // matrix

  this._worldMat = new _mat["default"]();
  this._cameraMat = new _mat["default"](); // matrix cache

  this._m00 = 0;
  this._m01 = 0;
  this._m04 = 0;
  this._m05 = 0;
  this._m12 = 0;
  this._m13 = 0;
  this._w = 0;
  this._h = 0; // viewport cache

  this._cacheViewportRect = cc.rect(0, 0, 0, 0); // inputType cache

  this._inputMode = null;
  this._inputFlag = null;
  this._returnType = null; // event listeners

  this._eventListeners = {}; // update style sheet cache

  this._textLabelFont = null;
  this._textLabelFontSize = null;
  this._textLabelFontColor = null;
  this._textLabelAlign = null;
  this._placeholderLabelFont = null;
  this._placeholderLabelFontSize = null;
  this._placeholderLabelFontColor = null;
  this._placeholderLabelAlign = null;
  this._placeholderLineHeight = null;
}

js.extend(WebEditBoxImpl, BaseClass);
EditBox._ImplClass = WebEditBoxImpl;
Object.assign(WebEditBoxImpl.prototype, {
  // =================================
  // implement EditBoxImplBase interface
  init: function init(delegate) {
    if (!delegate) {
      return;
    }

    this._delegate = delegate;

    if (delegate.inputMode === InputMode.ANY) {
      this._createTextArea();
    } else {
      this._createInput();
    }

    tabIndexUtil.add(this);
    this.setTabIndex(delegate.tabIndex);

    this._initStyleSheet();

    this._registerEventListeners();

    this._addDomToGameContainer();

    _fullscreen = cc.view.isAutoFullScreenEnabled();
    _autoResize = cc.view._resizeWithBrowserSize;
  },
  clear: function clear() {
    this._removeEventListeners();

    this._removeDomFromGameContainer();

    tabIndexUtil.remove(this); // clear while editing

    if (_currentEditBoxImpl === this) {
      _currentEditBoxImpl = null;
    }
  },
  update: function update() {
    this._updateMatrix();
  },
  setTabIndex: function setTabIndex(index) {
    this._elem.tabIndex = index;
    tabIndexUtil.resort();
  },
  setSize: function setSize(width, height) {
    var elem = this._elem;
    elem.style.width = width + 'px';
    elem.style.height = height + 'px';
  },
  beginEditing: function beginEditing() {
    if (_currentEditBoxImpl && _currentEditBoxImpl !== this) {
      _currentEditBoxImpl.setFocus(false);
    }

    this._editing = true;
    _currentEditBoxImpl = this;

    this._delegate.editBoxEditingDidBegan();

    this._showDom();

    this._elem.focus(); // set focus

  },
  endEditing: function endEditing() {
    if (this._elem) {
      this._elem.blur();
    }
  },
  // ==========================================================================
  // implement dom input
  _createInput: function _createInput() {
    this._isTextArea = false;
    this._elem = document.createElement('input');
  },
  _createTextArea: function _createTextArea() {
    this._isTextArea = true;
    this._elem = document.createElement('textarea');
  },
  _addDomToGameContainer: function _addDomToGameContainer() {
    cc.game.container.appendChild(this._elem);
    document.head.appendChild(this._placeholderStyleSheet);
  },
  _removeDomFromGameContainer: function _removeDomFromGameContainer() {
    var hasElem = utils.contains(cc.game.container, this._elem);

    if (hasElem) {
      cc.game.container.removeChild(this._elem);
    }

    var hasStyleSheet = utils.contains(document.head, this._placeholderStyleSheet);

    if (hasStyleSheet) {
      document.head.removeChild(this._placeholderStyleSheet);
    }

    delete this._elem;
    delete this._placeholderStyleSheet;
  },
  _showDom: function _showDom() {
    this._updateMaxLength();

    this._updateInputType();

    this._updateStyleSheet();

    this._elem.style.display = '';

    this._delegate._hideLabels();

    if (cc.sys.isMobile) {
      this._showDomOnMobile();
    }
  },
  _hideDom: function _hideDom() {
    var elem = this._elem;
    elem.style.display = 'none';

    this._delegate._showLabels();

    if (cc.sys.isMobile) {
      this._hideDomOnMobile();
    }
  },
  _showDomOnMobile: function _showDomOnMobile() {
    if (cc.sys.os !== cc.sys.OS_ANDROID) {
      return;
    }

    if (_fullscreen) {
      cc.view.enableAutoFullScreen(false);
      cc.screen.exitFullScreen();
    }

    if (_autoResize) {
      cc.view.resizeWithBrowserSize(false);
    }

    this._adjustWindowScroll();
  },
  _hideDomOnMobile: function _hideDomOnMobile() {
    if (cc.sys.os === cc.sys.OS_ANDROID) {
      if (_autoResize) {
        cc.view.resizeWithBrowserSize(true);
      } // In case enter full screen when soft keyboard still showing


      setTimeout(function () {
        if (!_currentEditBoxImpl) {
          if (_fullscreen) {
            cc.view.enableAutoFullScreen(true);
          }
        }
      }, DELAY_TIME);
    } // Some browser like wechat on iOS need to mannully scroll back window


    this._scrollBackWindow();
  },
  // adjust view to editBox
  _adjustWindowScroll: function _adjustWindowScroll() {
    var self = this;
    setTimeout(function () {
      if (window.scrollY < SCROLLY) {
        self._elem.scrollIntoView({
          block: "start",
          inline: "nearest",
          behavior: "smooth"
        });
      }
    }, DELAY_TIME);
  },
  _scrollBackWindow: function _scrollBackWindow() {
    setTimeout(function () {
      // FIX: wechat browser bug on iOS
      // If gameContainer is included in iframe,
      // Need to scroll the top window, not the one in the iframe
      // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/top
      var sys = cc.sys;

      if (sys.browserType === sys.BROWSER_TYPE_WECHAT && sys.os === sys.OS_IOS) {
        window.top && window.top.scrollTo(0, 0);
        return;
      }

      window.scrollTo(0, 0);
    }, DELAY_TIME);
  },
  _updateCameraMatrix: function _updateCameraMatrix() {
    var node = this._delegate.node;
    node.getWorldMatrix(this._worldMat);
    var worldMat = this._worldMat;
    var nodeContentSize = node._contentSize,
        nodeAnchorPoint = node._anchorPoint;
    _vec3.x = -nodeAnchorPoint.x * nodeContentSize.width;
    _vec3.y = -nodeAnchorPoint.y * nodeContentSize.height;

    _mat["default"].transform(worldMat, worldMat, _vec3); // can't find node camera in editor


    if (CC_EDITOR) {
      this._cameraMat = worldMat;
    } else {
      var camera = cc.Camera.findCamera(node);

      if (!camera) {
        return false;
      }

      camera.getWorldToScreenMatrix2D(this._cameraMat);

      _mat["default"].mul(this._cameraMat, this._cameraMat, worldMat);
    }

    return true;
  },
  _updateMatrix: function _updateMatrix() {
    if (CC_EDITOR || !this._updateCameraMatrix()) {
      return;
    }

    var cameraMatm = this._cameraMat.m;
    var node = this._delegate.node;
    var localView = cc.view; // check whether need to update

    if (this._m00 === cameraMatm[0] && this._m01 === cameraMatm[1] && this._m04 === cameraMatm[4] && this._m05 === cameraMatm[5] && this._m12 === cameraMatm[12] && this._m13 === cameraMatm[13] && this._w === node._contentSize.width && this._h === node._contentSize.height && this._cacheViewportRect.equals(localView._viewportRect)) {
      return;
    } // update matrix cache


    this._m00 = cameraMatm[0];
    this._m01 = cameraMatm[1];
    this._m04 = cameraMatm[4];
    this._m05 = cameraMatm[5];
    this._m12 = cameraMatm[12];
    this._m13 = cameraMatm[13];
    this._w = node._contentSize.width;
    this._h = node._contentSize.height; // update viewport cache

    this._cacheViewportRect.set(localView._viewportRect);

    var scaleX = localView._scaleX,
        scaleY = localView._scaleY,
        viewport = localView._viewportRect,
        dpr = localView._devicePixelRatio;
    scaleX /= dpr;
    scaleY /= dpr;
    var container = cc.game.container;
    var a = cameraMatm[0] * scaleX,
        b = cameraMatm[1],
        c = cameraMatm[4],
        d = cameraMatm[5] * scaleY;
    var offsetX = container && container.style.paddingLeft && parseInt(container.style.paddingLeft);
    offsetX += viewport.x / dpr;
    var offsetY = container && container.style.paddingBottom && parseInt(container.style.paddingBottom);
    offsetY += viewport.y / dpr;
    var tx = cameraMatm[12] * scaleX + offsetX,
        ty = cameraMatm[13] * scaleY + offsetY;

    if (polyfill.zoomInvalid) {
      this.setSize(node.width * a, node.height * d);
      a = 1;
      d = 1;
    }

    var elem = this._elem;
    var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
    elem.style['transform'] = matrix;
    elem.style['-webkit-transform'] = matrix;
    elem.style['transform-origin'] = '0px 100% 0px';
    elem.style['-webkit-transform-origin'] = '0px 100% 0px';
  },
  // ===========================================
  // input type and max length
  _updateInputType: function _updateInputType() {
    var delegate = this._delegate,
        inputMode = delegate.inputMode,
        inputFlag = delegate.inputFlag,
        returnType = delegate.returnType,
        elem = this._elem; // whether need to update

    if (this._inputMode === inputMode && this._inputFlag === inputFlag && this._returnType === returnType) {
      return;
    } // update cache


    this._inputMode = inputMode;
    this._inputFlag = inputFlag;
    this._returnType = returnType; // FIX ME: TextArea actually dose not support password type.

    if (this._isTextArea) {
      // input flag
      var _textTransform = 'none';

      if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
        _textTransform = 'uppercase';
      } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
        _textTransform = 'capitalize';
      }

      elem.style.textTransform = _textTransform;
      return;
    } // begin to updateInputType


    if (inputFlag === InputFlag.PASSWORD) {
      elem.type = 'password';
      elem.style.textTransform = 'none';
      return;
    } // input mode


    var type = elem.type;

    if (inputMode === InputMode.EMAIL_ADDR) {
      type = 'email';
    } else if (inputMode === InputMode.NUMERIC || inputMode === InputMode.DECIMAL) {
      type = 'number';
    } else if (inputMode === InputMode.PHONE_NUMBER) {
      type = 'number';
      elem.pattern = '[0-9]*';
    } else if (inputMode === InputMode.URL) {
      type = 'url';
    } else {
      type = 'text';

      if (returnType === KeyboardReturnType.SEARCH) {
        type = 'search';
      }
    }

    elem.type = type; // input flag

    var textTransform = 'none';

    if (inputFlag === InputFlag.INITIAL_CAPS_ALL_CHARACTERS) {
      textTransform = 'uppercase';
    } else if (inputFlag === InputFlag.INITIAL_CAPS_WORD) {
      textTransform = 'capitalize';
    }

    elem.style.textTransform = textTransform;
  },
  _updateMaxLength: function _updateMaxLength() {
    var maxLength = this._delegate.maxLength;

    if (maxLength < 0) {
      //we can't set Number.MAX_VALUE to input's maxLength property
      //so we use a magic number here, it should works at most use cases.
      maxLength = 65535;
    }

    this._elem.maxLength = maxLength;
  },
  // ===========================================
  // style sheet
  _initStyleSheet: function _initStyleSheet() {
    var elem = this._elem;
    elem.style.display = 'none';
    elem.style.border = 0;
    elem.style.background = 'transparent';
    elem.style.width = '100%';
    elem.style.height = '100%';
    elem.style.active = 0;
    elem.style.outline = 'medium';
    elem.style.padding = '0';
    elem.style.textTransform = 'none';
    elem.style.position = "absolute";
    elem.style.bottom = "0px";
    elem.style.left = LEFT_PADDING + "px";
    elem.className = "cocosEditBox";
    elem.id = this._domId;

    if (!this._isTextArea) {
      elem.type = 'text';
      elem.style['-moz-appearance'] = 'textfield';
    } else {
      elem.style.resize = 'none';
      elem.style.overflow_y = 'scroll';
    }

    this._placeholderStyleSheet = document.createElement('style');
  },
  _updateStyleSheet: function _updateStyleSheet() {
    var delegate = this._delegate,
        elem = this._elem;
    elem.value = delegate.string;
    elem.placeholder = delegate.placeholder;

    this._updateTextLabel(delegate.textLabel);

    this._updatePlaceholderLabel(delegate.placeholderLabel);
  },
  _updateTextLabel: function _updateTextLabel(textLabel) {
    if (!textLabel) {
      return;
    } // get font


    var font = textLabel.font;

    if (font && !(font instanceof cc.BitmapFont)) {
      font = font._fontFamily;
    } else {
      font = textLabel.fontFamily;
    } // get font size


    var fontSize = textLabel.fontSize * textLabel.node.scaleY; // whether need to update

    if (this._textLabelFont === font && this._textLabelFontSize === fontSize && this._textLabelFontColor === textLabel.fontColor && this._textLabelAlign === textLabel.horizontalAlign) {
      return;
    } // update cache


    this._textLabelFont = font;
    this._textLabelFontSize = fontSize;
    this._textLabelFontColor = textLabel.fontColor;
    this._textLabelAlign = textLabel.horizontalAlign;
    var elem = this._elem; // font size

    elem.style.fontSize = fontSize + "px"; // font color

    elem.style.color = textLabel.node.color.toCSS(); // font family

    elem.style.fontFamily = font; // text-align

    switch (textLabel.horizontalAlign) {
      case Label.HorizontalAlign.LEFT:
        elem.style.textAlign = 'left';
        break;

      case Label.HorizontalAlign.CENTER:
        elem.style.textAlign = 'center';
        break;

      case Label.HorizontalAlign.RIGHT:
        elem.style.textAlign = 'right';
        break;
    } // lineHeight
    // Can't sync lineHeight property, because lineHeight would change the touch area of input

  },
  _updatePlaceholderLabel: function _updatePlaceholderLabel(placeholderLabel) {
    if (!placeholderLabel) {
      return;
    } // get font


    var font = placeholderLabel.font;

    if (font && !(font instanceof cc.BitmapFont)) {
      font = placeholderLabel.font._fontFamily;
    } else {
      font = placeholderLabel.fontFamily;
    } // get font size


    var fontSize = placeholderLabel.fontSize * placeholderLabel.node.scaleY; // whether need to update

    if (this._placeholderLabelFont === font && this._placeholderLabelFontSize === fontSize && this._placeholderLabelFontColor === placeholderLabel.fontColor && this._placeholderLabelAlign === placeholderLabel.horizontalAlign && this._placeholderLineHeight === placeholderLabel.fontSize) {
      return;
    } // update cache


    this._placeholderLabelFont = font;
    this._placeholderLabelFontSize = fontSize;
    this._placeholderLabelFontColor = placeholderLabel.fontColor;
    this._placeholderLabelAlign = placeholderLabel.horizontalAlign;
    this._placeholderLineHeight = placeholderLabel.fontSize;
    var styleEl = this._placeholderStyleSheet; // font color

    var fontColor = placeholderLabel.node.color.toCSS(); // line height

    var lineHeight = placeholderLabel.fontSize; // top vertical align by default
    // horizontal align

    var horizontalAlign;

    switch (placeholderLabel.horizontalAlign) {
      case Label.HorizontalAlign.LEFT:
        horizontalAlign = 'left';
        break;

      case Label.HorizontalAlign.CENTER:
        horizontalAlign = 'center';
        break;

      case Label.HorizontalAlign.RIGHT:
        horizontalAlign = 'right';
        break;
    }

    styleEl.innerHTML = "#" + this._domId + "::-webkit-input-placeholder,#" + this._domId + "::-moz-placeholder,#" + this._domId + ":-ms-input-placeholder" + ("{text-transform: initial; font-family: " + font + "; font-size: " + fontSize + "px; color: " + fontColor + "; line-height: " + lineHeight + "px; text-align: " + horizontalAlign + ";}"); // EDGE_BUG_FIX: hide clear button, because clearing input box in Edge does not emit input event 
    // issue refference: https://github.com/angular/angular/issues/26307

    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE) {
      styleEl.innerHTML += "#" + this._domId + "::-ms-clear{display: none;}";
    }
  },
  // ===========================================
  // handle event listeners
  _registerEventListeners: function _registerEventListeners() {
    var impl = this,
        elem = this._elem,
        inputLock = false,
        cbs = this._eventListeners;

    cbs.compositionStart = function () {
      inputLock = true;
    };

    cbs.compositionEnd = function () {
      inputLock = false;

      impl._delegate.editBoxTextChanged(elem.value);
    };

    cbs.onInput = function () {
      if (inputLock) {
        return;
      } // input of number type doesn't support maxLength attribute


      var maxLength = impl._delegate.maxLength;

      if (maxLength >= 0) {
        elem.value = elem.value.slice(0, maxLength);
      }

      impl._delegate.editBoxTextChanged(elem.value);
    }; // There are 2 ways to focus on the input element:
    // Click the input element, or call input.focus().
    // Both need to adjust window scroll.


    cbs.onClick = function (e) {
      // In case operation sequence: click input, hide keyboard, then click again.
      if (impl._editing) {
        if (cc.sys.isMobile) {
          impl._adjustWindowScroll();
        }
      }
    };

    cbs.onKeydown = function (e) {
      if (e.keyCode === macro.KEY.enter) {
        e.stopPropagation();

        impl._delegate.editBoxEditingReturn();

        if (!impl._isTextArea) {
          elem.blur();
        }
      } else if (e.keyCode === macro.KEY.tab) {
        e.stopPropagation();
        e.preventDefault();
        tabIndexUtil.next(impl);
      }
    };

    cbs.onBlur = function () {
      // on mobile, sometimes input element doesn't fire compositionend event
      if (cc.sys.isMobile && inputLock) {
        cbs.compositionEnd();
      }

      impl._editing = false;
      _currentEditBoxImpl = null;

      impl._hideDom();

      impl._delegate.editBoxEditingDidEnded();
    };

    elem.addEventListener('compositionstart', cbs.compositionStart);
    elem.addEventListener('compositionend', cbs.compositionEnd);
    elem.addEventListener('input', cbs.onInput);
    elem.addEventListener('keydown', cbs.onKeydown);
    elem.addEventListener('blur', cbs.onBlur);
    elem.addEventListener('touchstart', cbs.onClick);
  },
  _removeEventListeners: function _removeEventListeners() {
    var elem = this._elem,
        cbs = this._eventListeners;
    elem.removeEventListener('compositionstart', cbs.compositionStart);
    elem.removeEventListener('compositionend', cbs.compositionEnd);
    elem.removeEventListener('input', cbs.onInput);
    elem.removeEventListener('keydown', cbs.onKeydown);
    elem.removeEventListener('blur', cbs.onBlur);
    elem.removeEventListener('touchstart', cbs.onClick);
    cbs.compositionStart = null;
    cbs.compositionEnd = null;
    cbs.onInput = null;
    cbs.onKeydown = null;
    cbs.onBlur = null;
    cbs.onClick = null;
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXGVkaXRib3hcXFdlYkVkaXRCb3hJbXBsLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIm1hY3JvIiwiVHlwZXMiLCJMYWJlbCIsInRhYkluZGV4VXRpbCIsIkVkaXRCb3giLCJjYyIsImpzIiwiSW5wdXRNb2RlIiwiSW5wdXRGbGFnIiwiS2V5Ym9hcmRSZXR1cm5UeXBlIiwicG9seWZpbGwiLCJ6b29tSW52YWxpZCIsInN5cyIsIk9TX0FORFJPSUQiLCJvcyIsImJyb3dzZXJUeXBlIiwiQlJPV1NFUl9UWVBFX1NPVUdPVSIsIkJST1dTRVJfVFlQRV8zNjAiLCJERUxBWV9USU1FIiwiU0NST0xMWSIsIkxFRlRfUEFERElORyIsIl9kb21Db3VudCIsIl92ZWMzIiwidjMiLCJfY3VycmVudEVkaXRCb3hJbXBsIiwiX2Z1bGxzY3JlZW4iLCJfYXV0b1Jlc2l6ZSIsIkJhc2VDbGFzcyIsIl9JbXBsQ2xhc3MiLCJXZWJFZGl0Qm94SW1wbCIsImNhbGwiLCJfZG9tSWQiLCJfcGxhY2Vob2xkZXJTdHlsZVNoZWV0IiwiX2VsZW0iLCJfaXNUZXh0QXJlYSIsIl93b3JsZE1hdCIsIk1hdDQiLCJfY2FtZXJhTWF0IiwiX20wMCIsIl9tMDEiLCJfbTA0IiwiX20wNSIsIl9tMTIiLCJfbTEzIiwiX3ciLCJfaCIsIl9jYWNoZVZpZXdwb3J0UmVjdCIsInJlY3QiLCJfaW5wdXRNb2RlIiwiX2lucHV0RmxhZyIsIl9yZXR1cm5UeXBlIiwiX2V2ZW50TGlzdGVuZXJzIiwiX3RleHRMYWJlbEZvbnQiLCJfdGV4dExhYmVsRm9udFNpemUiLCJfdGV4dExhYmVsRm9udENvbG9yIiwiX3RleHRMYWJlbEFsaWduIiwiX3BsYWNlaG9sZGVyTGFiZWxGb250IiwiX3BsYWNlaG9sZGVyTGFiZWxGb250U2l6ZSIsIl9wbGFjZWhvbGRlckxhYmVsRm9udENvbG9yIiwiX3BsYWNlaG9sZGVyTGFiZWxBbGlnbiIsIl9wbGFjZWhvbGRlckxpbmVIZWlnaHQiLCJleHRlbmQiLCJPYmplY3QiLCJhc3NpZ24iLCJwcm90b3R5cGUiLCJpbml0IiwiZGVsZWdhdGUiLCJfZGVsZWdhdGUiLCJpbnB1dE1vZGUiLCJBTlkiLCJfY3JlYXRlVGV4dEFyZWEiLCJfY3JlYXRlSW5wdXQiLCJhZGQiLCJzZXRUYWJJbmRleCIsInRhYkluZGV4IiwiX2luaXRTdHlsZVNoZWV0IiwiX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMiLCJfYWRkRG9tVG9HYW1lQ29udGFpbmVyIiwidmlldyIsImlzQXV0b0Z1bGxTY3JlZW5FbmFibGVkIiwiX3Jlc2l6ZVdpdGhCcm93c2VyU2l6ZSIsImNsZWFyIiwiX3JlbW92ZUV2ZW50TGlzdGVuZXJzIiwiX3JlbW92ZURvbUZyb21HYW1lQ29udGFpbmVyIiwicmVtb3ZlIiwidXBkYXRlIiwiX3VwZGF0ZU1hdHJpeCIsImluZGV4IiwicmVzb3J0Iiwic2V0U2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiZWxlbSIsInN0eWxlIiwiYmVnaW5FZGl0aW5nIiwic2V0Rm9jdXMiLCJfZWRpdGluZyIsImVkaXRCb3hFZGl0aW5nRGlkQmVnYW4iLCJfc2hvd0RvbSIsImZvY3VzIiwiZW5kRWRpdGluZyIsImJsdXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lIiwiY29udGFpbmVyIiwiYXBwZW5kQ2hpbGQiLCJoZWFkIiwiaGFzRWxlbSIsImNvbnRhaW5zIiwicmVtb3ZlQ2hpbGQiLCJoYXNTdHlsZVNoZWV0IiwiX3VwZGF0ZU1heExlbmd0aCIsIl91cGRhdGVJbnB1dFR5cGUiLCJfdXBkYXRlU3R5bGVTaGVldCIsImRpc3BsYXkiLCJfaGlkZUxhYmVscyIsImlzTW9iaWxlIiwiX3Nob3dEb21Pbk1vYmlsZSIsIl9oaWRlRG9tIiwiX3Nob3dMYWJlbHMiLCJfaGlkZURvbU9uTW9iaWxlIiwiZW5hYmxlQXV0b0Z1bGxTY3JlZW4iLCJzY3JlZW4iLCJleGl0RnVsbFNjcmVlbiIsInJlc2l6ZVdpdGhCcm93c2VyU2l6ZSIsIl9hZGp1c3RXaW5kb3dTY3JvbGwiLCJzZXRUaW1lb3V0IiwiX3Njcm9sbEJhY2tXaW5kb3ciLCJzZWxmIiwid2luZG93Iiwic2Nyb2xsWSIsInNjcm9sbEludG9WaWV3IiwiYmxvY2siLCJpbmxpbmUiLCJiZWhhdmlvciIsIkJST1dTRVJfVFlQRV9XRUNIQVQiLCJPU19JT1MiLCJ0b3AiLCJzY3JvbGxUbyIsIl91cGRhdGVDYW1lcmFNYXRyaXgiLCJub2RlIiwiZ2V0V29ybGRNYXRyaXgiLCJ3b3JsZE1hdCIsIm5vZGVDb250ZW50U2l6ZSIsIl9jb250ZW50U2l6ZSIsIm5vZGVBbmNob3JQb2ludCIsIl9hbmNob3JQb2ludCIsIngiLCJ5IiwidHJhbnNmb3JtIiwiQ0NfRURJVE9SIiwiY2FtZXJhIiwiQ2FtZXJhIiwiZmluZENhbWVyYSIsImdldFdvcmxkVG9TY3JlZW5NYXRyaXgyRCIsIm11bCIsImNhbWVyYU1hdG0iLCJtIiwibG9jYWxWaWV3IiwiZXF1YWxzIiwiX3ZpZXdwb3J0UmVjdCIsInNldCIsInNjYWxlWCIsIl9zY2FsZVgiLCJzY2FsZVkiLCJfc2NhbGVZIiwidmlld3BvcnQiLCJkcHIiLCJfZGV2aWNlUGl4ZWxSYXRpbyIsImEiLCJiIiwiYyIsImQiLCJvZmZzZXRYIiwicGFkZGluZ0xlZnQiLCJwYXJzZUludCIsIm9mZnNldFkiLCJwYWRkaW5nQm90dG9tIiwidHgiLCJ0eSIsIm1hdHJpeCIsImlucHV0RmxhZyIsInJldHVyblR5cGUiLCJ0ZXh0VHJhbnNmb3JtIiwiSU5JVElBTF9DQVBTX0FMTF9DSEFSQUNURVJTIiwiSU5JVElBTF9DQVBTX1dPUkQiLCJQQVNTV09SRCIsInR5cGUiLCJFTUFJTF9BRERSIiwiTlVNRVJJQyIsIkRFQ0lNQUwiLCJQSE9ORV9OVU1CRVIiLCJwYXR0ZXJuIiwiVVJMIiwiU0VBUkNIIiwibWF4TGVuZ3RoIiwiYm9yZGVyIiwiYmFja2dyb3VuZCIsImFjdGl2ZSIsIm91dGxpbmUiLCJwYWRkaW5nIiwicG9zaXRpb24iLCJib3R0b20iLCJsZWZ0IiwiY2xhc3NOYW1lIiwiaWQiLCJyZXNpemUiLCJvdmVyZmxvd195IiwidmFsdWUiLCJzdHJpbmciLCJwbGFjZWhvbGRlciIsIl91cGRhdGVUZXh0TGFiZWwiLCJ0ZXh0TGFiZWwiLCJfdXBkYXRlUGxhY2Vob2xkZXJMYWJlbCIsInBsYWNlaG9sZGVyTGFiZWwiLCJmb250IiwiQml0bWFwRm9udCIsIl9mb250RmFtaWx5IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udENvbG9yIiwiaG9yaXpvbnRhbEFsaWduIiwiY29sb3IiLCJ0b0NTUyIsIkhvcml6b250YWxBbGlnbiIsIkxFRlQiLCJ0ZXh0QWxpZ24iLCJDRU5URVIiLCJSSUdIVCIsInN0eWxlRWwiLCJsaW5lSGVpZ2h0IiwiaW5uZXJIVE1MIiwiQlJPV1NFUl9UWVBFX0VER0UiLCJpbXBsIiwiaW5wdXRMb2NrIiwiY2JzIiwiY29tcG9zaXRpb25TdGFydCIsImNvbXBvc2l0aW9uRW5kIiwiZWRpdEJveFRleHRDaGFuZ2VkIiwib25JbnB1dCIsInNsaWNlIiwib25DbGljayIsImUiLCJvbktleWRvd24iLCJrZXlDb2RlIiwiS0VZIiwiZW50ZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJlZGl0Qm94RWRpdGluZ1JldHVybiIsInRhYiIsInByZXZlbnREZWZhdWx0IiwibmV4dCIsIm9uQmx1ciIsImVkaXRCb3hFZGl0aW5nRGlkRW5kZWQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTBCQTs7OztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLHNCQUFELENBQXJCOztBQUNBLElBQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLHdCQUFE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NGtCWDtBQUNyQixRQUFJVSxJQUFJLEdBQUcsS0FBSzNELEtBQWhCO0FBQUEsUUFDSTJNLEdBQUcsR0FBRyxLQUFLekwsZUFEZjtBQUdBeUMsSUFBQUEsSUFBSSxDQUFDb0ssbUJBQUwsQ0FBeUIsa0JBQXpCLEVBQTZDcEIsR0FBRyxDQUFDQyxnQkFBakQ7QUFDQWpKLElBQUFBLElBQUksQ0FBQ29LLG1CQUFMLENBQXlCLGdCQUF6QixFQUEyQ3BCLEdBQUcsQ0FBQ0UsY0FBL0M7QUFDQWxKLElBQUFBLElBQUksQ0FBQ29LLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDcEIsR0FBRyxDQUFDSSxPQUF0QztBQUNBcEosSUFBQUEsSUFBSSxDQUFDb0ssbUJBQUwsQ0FBeUIsU0FBekIsRUFBb0NwQixHQUFHLENBQUNRLFNBQXhDO0FBQ0F4SixJQUFBQSxJQUFJLENBQUNvSyxtQkFBTCxDQUF5QixNQUF6QixFQUFpQ3BCLEdBQUcsQ0FBQ2lCLE1BQXJDO0FBQ0FqSyxJQUFBQSxJQUFJLENBQUNvSyxtQkFBTCxDQUF5QixZQUF6QixFQUF1Q3BCLEdBQUcsQ0FBQ00sT0FBM0M7QUFFQU4sSUFBQUEsR0FBRyxDQUFDQyxnQkFBSixHQUF1QixJQUF2QjtBQUNBRCxJQUFBQSxHQUFHLENBQUNFLGNBQUosR0FBcUIsSUFBckI7QUFDQUYsSUFBQUEsR0FBRyxDQUFDSSxPQUFKLEdBQWMsSUFBZDtBQUNBSixJQUFBQSxHQUFHLENBQUNRLFNBQUosR0FBZ0IsSUFBaEI7QUFDQVIsSUFBQUEsR0FBRyxDQUFDaUIsTUFBSixHQUFhLElBQWI7QUFDQWpCLElBQUFBLEdBQUcsQ0FBQ00sT0FBSixHQUFjLElBQWQ7QUFDSDtBQTdsQm1DLENBQXhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgTWF0NCBmcm9tICcuLi8uLi92YWx1ZS10eXBlcy9tYXQ0JztcclxuXHJcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vcGxhdGZvcm0vdXRpbHMnKTtcclxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi8uLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XHJcbmNvbnN0IFR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xyXG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uL0NDTGFiZWwnKTtcclxuY29uc3QgdGFiSW5kZXhVdGlsID0gcmVxdWlyZSgnLi90YWJJbmRleFV0aWwnKTtcclxuXHJcbmNvbnN0IEVkaXRCb3ggPSBjYy5FZGl0Qm94O1xyXG5jb25zdCBqcyA9IGNjLmpzO1xyXG5jb25zdCBJbnB1dE1vZGUgPSBUeXBlcy5JbnB1dE1vZGU7XHJcbmNvbnN0IElucHV0RmxhZyA9IFR5cGVzLklucHV0RmxhZztcclxuY29uc3QgS2V5Ym9hcmRSZXR1cm5UeXBlID0gVHlwZXMuS2V5Ym9hcmRSZXR1cm5UeXBlO1xyXG5cclxuLy8gcG9seWZpbGxcclxubGV0IHBvbHlmaWxsID0ge1xyXG4gICAgem9vbUludmFsaWQ6IGZhbHNlXHJcbn07XHJcblxyXG5pZiAoY2Muc3lzLk9TX0FORFJPSUQgPT09IGNjLnN5cy5vcyAmJlxyXG4gICAgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9TT1VHT1UgfHxcclxuICAgIGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV8zNjApKSB7XHJcbiAgICBwb2x5ZmlsbC56b29tSW52YWxpZCA9IHRydWU7XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vc2VnbWVudGZhdWx0LmNvbS9xLzEwMTAwMDAwMDI5MTQ2MTBcclxuY29uc3QgREVMQVlfVElNRSA9IDgwMDtcclxuY29uc3QgU0NST0xMWSA9IDEwMDtcclxuY29uc3QgTEVGVF9QQURESU5HID0gMjtcclxuXHJcbi8vIHByaXZhdGUgc3RhdGljIHByb3BlcnR5XHJcbmxldCBfZG9tQ291bnQgPSAwO1xyXG5sZXQgX3ZlYzMgPSBjYy52MygpO1xyXG5sZXQgX2N1cnJlbnRFZGl0Qm94SW1wbCA9IG51bGw7XHJcblxyXG4vLyBvbiBtb2JpbGVcclxubGV0IF9mdWxsc2NyZWVuID0gZmFsc2U7XHJcbmxldCBfYXV0b1Jlc2l6ZSA9IGZhbHNlO1xyXG5cclxuY29uc3QgQmFzZUNsYXNzID0gRWRpdEJveC5fSW1wbENsYXNzO1xyXG4gLy8gVGhpcyBpcyBhbiBhZGFwdGVyIGZvciBFZGl0Qm94SW1wbCBvbiB3ZWIgcGxhdGZvcm0uXHJcbiAvLyBGb3IgbW9yZSBhZGFwdGVycyBvbiBvdGhlciBwbGF0Zm9ybXMsIHBsZWFzZSBpbmhlcml0IGZyb20gRWRpdEJveEltcGxCYXNlIGFuZCBpbXBsZW1lbnQgdGhlIGludGVyZmFjZS5cclxuZnVuY3Rpb24gV2ViRWRpdEJveEltcGwgKCkge1xyXG4gICAgQmFzZUNsYXNzLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLl9kb21JZCA9IGBFZGl0Qm94SWRfJHsrK19kb21Db3VudH1gO1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0ID0gbnVsbDtcclxuICAgIHRoaXMuX2VsZW0gPSBudWxsO1xyXG4gICAgdGhpcy5faXNUZXh0QXJlYSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIG1hdHJpeFxyXG4gICAgdGhpcy5fd29ybGRNYXQgPSBuZXcgTWF0NCgpO1xyXG4gICAgdGhpcy5fY2FtZXJhTWF0ID0gbmV3IE1hdDQoKTtcclxuICAgIC8vIG1hdHJpeCBjYWNoZVxyXG4gICAgdGhpcy5fbTAwID0gMDtcclxuICAgIHRoaXMuX20wMSA9IDA7XHJcbiAgICB0aGlzLl9tMDQgPSAwO1xyXG4gICAgdGhpcy5fbTA1ID0gMDtcclxuICAgIHRoaXMuX20xMiA9IDA7XHJcbiAgICB0aGlzLl9tMTMgPSAwO1xyXG4gICAgdGhpcy5fdyA9IDA7XHJcbiAgICB0aGlzLl9oID0gMDtcclxuICAgIC8vIHZpZXdwb3J0IGNhY2hlXHJcbiAgICB0aGlzLl9jYWNoZVZpZXdwb3J0UmVjdCA9IGNjLnJlY3QoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgLy8gaW5wdXRUeXBlIGNhY2hlXHJcbiAgICB0aGlzLl9pbnB1dE1vZGUgPSBudWxsO1xyXG4gICAgdGhpcy5faW5wdXRGbGFnID0gbnVsbDtcclxuICAgIHRoaXMuX3JldHVyblR5cGUgPSBudWxsO1xyXG5cclxuICAgIC8vIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lcnMgPSB7fTtcclxuXHJcbiAgICAvLyB1cGRhdGUgc3R5bGUgc2hlZXQgY2FjaGVcclxuICAgIHRoaXMuX3RleHRMYWJlbEZvbnQgPSBudWxsO1xyXG4gICAgdGhpcy5fdGV4dExhYmVsRm9udFNpemUgPSBudWxsO1xyXG4gICAgdGhpcy5fdGV4dExhYmVsRm9udENvbG9yID0gbnVsbDtcclxuICAgIHRoaXMuX3RleHRMYWJlbEFsaWduID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsRm9udCA9IG51bGw7XHJcbiAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsRm9udFNpemUgPSBudWxsO1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnRDb2xvciA9IG51bGw7XHJcbiAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsQWxpZ24gPSBudWxsO1xyXG4gICAgdGhpcy5fcGxhY2Vob2xkZXJMaW5lSGVpZ2h0ID0gbnVsbDtcclxufVxyXG5cclxuanMuZXh0ZW5kKFdlYkVkaXRCb3hJbXBsLCBCYXNlQ2xhc3MpO1xyXG5FZGl0Qm94Ll9JbXBsQ2xhc3MgPSBXZWJFZGl0Qm94SW1wbDtcclxuXHJcbk9iamVjdC5hc3NpZ24oV2ViRWRpdEJveEltcGwucHJvdG90eXBlLCB7XHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIGltcGxlbWVudCBFZGl0Qm94SW1wbEJhc2UgaW50ZXJmYWNlXHJcbiAgICBpbml0IChkZWxlZ2F0ZSkge1xyXG4gICAgICAgIGlmICghZGVsZWdhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUgPSBkZWxlZ2F0ZTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGVnYXRlLmlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkFOWSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVUZXh0QXJlYSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlSW5wdXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFiSW5kZXhVdGlsLmFkZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNldFRhYkluZGV4KGRlbGVnYXRlLnRhYkluZGV4KTtcclxuICAgICAgICB0aGlzLl9pbml0U3R5bGVTaGVldCgpO1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLl9hZGREb21Ub0dhbWVDb250YWluZXIoKTtcclxuXHJcbiAgICAgICAgX2Z1bGxzY3JlZW4gPSBjYy52aWV3LmlzQXV0b0Z1bGxTY3JlZW5FbmFibGVkKCk7XHJcbiAgICAgICAgX2F1dG9SZXNpemUgPSBjYy52aWV3Ll9yZXNpemVXaXRoQnJvd3NlclNpemU7XHJcbiAgICB9LFxyXG5cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9yZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZURvbUZyb21HYW1lQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgIHRhYkluZGV4VXRpbC5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIHdoaWxlIGVkaXRpbmdcclxuICAgICAgICBpZiAoX2N1cnJlbnRFZGl0Qm94SW1wbCA9PT0gdGhpcykge1xyXG4gICAgICAgICAgICBfY3VycmVudEVkaXRCb3hJbXBsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0cml4KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhYkluZGV4IChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuX2VsZW0udGFiSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0YWJJbmRleFV0aWwucmVzb3J0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XHJcbiAgICAgICAgZWxlbS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcclxuICAgICAgICBlbGVtLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICB9LFxyXG5cclxuICAgIGJlZ2luRWRpdGluZyAoKSB7XHJcbiAgICAgICAgaWYgKF9jdXJyZW50RWRpdEJveEltcGwgJiYgX2N1cnJlbnRFZGl0Qm94SW1wbCAhPT0gdGhpcykge1xyXG4gICAgICAgICAgICBfY3VycmVudEVkaXRCb3hJbXBsLnNldEZvY3VzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgX2N1cnJlbnRFZGl0Qm94SW1wbCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUuZWRpdEJveEVkaXRpbmdEaWRCZWdhbigpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dEb20oKTtcclxuICAgICAgICB0aGlzLl9lbGVtLmZvY3VzKCk7ICAvLyBzZXQgZm9jdXNcclxuICAgIH0sXHJcblxyXG4gICAgZW5kRWRpdGluZyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VsZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbS5ibHVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gaW1wbGVtZW50IGRvbSBpbnB1dFxyXG4gICAgX2NyZWF0ZUlucHV0ICgpIHtcclxuICAgICAgICB0aGlzLl9pc1RleHRBcmVhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVUZXh0QXJlYSAoKSB7XHJcbiAgICAgICAgdGhpcy5faXNUZXh0QXJlYSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hZGREb21Ub0dhbWVDb250YWluZXIgKCkge1xyXG4gICAgICAgIGNjLmdhbWUuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsZW0pO1xyXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZURvbUZyb21HYW1lQ29udGFpbmVyICgpIHtcclxuICAgICAgICBsZXQgaGFzRWxlbSA9IHV0aWxzLmNvbnRhaW5zKGNjLmdhbWUuY29udGFpbmVyLCB0aGlzLl9lbGVtKTtcclxuICAgICAgICBpZiAoaGFzRWxlbSkge1xyXG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLl9lbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhc1N0eWxlU2hlZXQgPSB1dGlscy5jb250YWlucyhkb2N1bWVudC5oZWFkLCB0aGlzLl9wbGFjZWhvbGRlclN0eWxlU2hlZXQpO1xyXG4gICAgICAgIGlmIChoYXNTdHlsZVNoZWV0KSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQodGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2VsZW07XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3BsYWNlaG9sZGVyU3R5bGVTaGVldDtcclxuICAgIH0sXHJcblxyXG4gICAgX3Nob3dEb20gKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1heExlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUlucHV0VHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0eWxlU2hlZXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZWxlbS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUuX2hpZGVMYWJlbHMoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEb21Pbk1vYmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2hpZGVEb20gKCkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbTtcclxuXHJcbiAgICAgICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLl9zaG93TGFiZWxzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oaWRlRG9tT25Nb2JpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zaG93RG9tT25Nb2JpbGUgKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMub3MgIT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKF9mdWxsc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGNjLnZpZXcuZW5hYmxlQXV0b0Z1bGxTY3JlZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICBjYy5zY3JlZW4uZXhpdEZ1bGxTY3JlZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9hdXRvUmVzaXplKSB7XHJcbiAgICAgICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FkanVzdFdpbmRvd1Njcm9sbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaGlkZURvbU9uTW9iaWxlICgpIHtcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICBpZiAoX2F1dG9SZXNpemUpIHtcclxuICAgICAgICAgICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEluIGNhc2UgZW50ZXIgZnVsbCBzY3JlZW4gd2hlbiBzb2Z0IGtleWJvYXJkIHN0aWxsIHNob3dpbmdcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9jdXJyZW50RWRpdEJveEltcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2Z1bGxzY3JlZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Mudmlldy5lbmFibGVBdXRvRnVsbFNjcmVlbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIERFTEFZX1RJTUUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29tZSBicm93c2VyIGxpa2Ugd2VjaGF0IG9uIGlPUyBuZWVkIHRvIG1hbm51bGx5IHNjcm9sbCBiYWNrIHdpbmRvd1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbEJhY2tXaW5kb3coKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gYWRqdXN0IHZpZXcgdG8gZWRpdEJveFxyXG4gICAgX2FkanVzdFdpbmRvd1Njcm9sbCAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA8IFNDUk9MTFkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2VsZW0uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCIsIGJlaGF2aW9yOiBcInNtb290aFwifSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBERUxBWV9USU1FKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3Njcm9sbEJhY2tXaW5kb3cgKCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBGSVg6IHdlY2hhdCBicm93c2VyIGJ1ZyBvbiBpT1NcclxuICAgICAgICAgICAgLy8gSWYgZ2FtZUNvbnRhaW5lciBpcyBpbmNsdWRlZCBpbiBpZnJhbWUsXHJcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gc2Nyb2xsIHRoZSB0b3Agd2luZG93LCBub3QgdGhlIG9uZSBpbiB0aGUgaWZyYW1lXHJcbiAgICAgICAgICAgIC8vIFJlZmVyZW5jZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy90b3BcclxuICAgICAgICAgICAgbGV0IHN5cyA9IGNjLnN5cztcclxuICAgICAgICAgICAgaWYgKHN5cy5icm93c2VyVHlwZSA9PT0gc3lzLkJST1dTRVJfVFlQRV9XRUNIQVQgJiYgc3lzLm9zID09PSBzeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cudG9wICYmIHdpbmRvdy50b3Auc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICAgICAgICB9LCBERUxBWV9USU1FKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUNhbWVyYU1hdHJpeCAoKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9kZWxlZ2F0ZS5ub2RlOyAgICBcclxuICAgICAgICBub2RlLmdldFdvcmxkTWF0cml4KHRoaXMuX3dvcmxkTWF0KTtcclxuICAgICAgICBsZXQgd29ybGRNYXQgPSB0aGlzLl93b3JsZE1hdDtcclxuICAgICAgICBsZXQgbm9kZUNvbnRlbnRTaXplID0gbm9kZS5fY29udGVudFNpemUsXHJcbiAgICAgICAgICAgIG5vZGVBbmNob3JQb2ludCA9IG5vZGUuX2FuY2hvclBvaW50O1xyXG5cclxuICAgICAgICBfdmVjMy54ID0gLW5vZGVBbmNob3JQb2ludC54ICogbm9kZUNvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgIF92ZWMzLnkgPSAtbm9kZUFuY2hvclBvaW50LnkgKiBub2RlQ29udGVudFNpemUuaGVpZ2h0O1xyXG4gICAgXHJcbiAgICAgICAgTWF0NC50cmFuc2Zvcm0od29ybGRNYXQsIHdvcmxkTWF0LCBfdmVjMyk7XHJcblxyXG4gICAgICAgIC8vIGNhbid0IGZpbmQgbm9kZSBjYW1lcmEgaW4gZWRpdG9yXHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmFNYXQgPSB3b3JsZE1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjYW1lcmEgPSBjYy5DYW1lcmEuZmluZENhbWVyYShub2RlKTtcclxuICAgICAgICAgICAgaWYgKCFjYW1lcmEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYW1lcmEuZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEKHRoaXMuX2NhbWVyYU1hdCk7XHJcbiAgICAgICAgICAgIE1hdDQubXVsKHRoaXMuX2NhbWVyYU1hdCwgdGhpcy5fY2FtZXJhTWF0LCB3b3JsZE1hdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlTWF0cml4ICgpIHsgICAgXHJcbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCAhdGhpcy5fdXBkYXRlQ2FtZXJhTWF0cml4KCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FtZXJhTWF0bSA9IHRoaXMuX2NhbWVyYU1hdC5tO1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5fZGVsZWdhdGUubm9kZTtcclxuICAgICAgICBsZXQgbG9jYWxWaWV3ID0gY2MudmlldztcclxuICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG5lZWQgdG8gdXBkYXRlXHJcbiAgICAgICAgaWYgKHRoaXMuX20wMCA9PT0gY2FtZXJhTWF0bVswXSAmJiB0aGlzLl9tMDEgPT09IGNhbWVyYU1hdG1bMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5fbTA0ID09PSBjYW1lcmFNYXRtWzRdICYmIHRoaXMuX20wNSA9PT0gY2FtZXJhTWF0bVs1XSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9tMTIgPT09IGNhbWVyYU1hdG1bMTJdICYmIHRoaXMuX20xMyA9PT0gY2FtZXJhTWF0bVsxM10gJiZcclxuICAgICAgICAgICAgdGhpcy5fdyA9PT0gbm9kZS5fY29udGVudFNpemUud2lkdGggJiYgdGhpcy5faCA9PT0gbm9kZS5fY29udGVudFNpemUuaGVpZ2h0ICYmXHJcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlVmlld3BvcnRSZWN0LmVxdWFscyhsb2NhbFZpZXcuX3ZpZXdwb3J0UmVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIG1hdHJpeCBjYWNoZVxyXG4gICAgICAgIHRoaXMuX20wMCA9IGNhbWVyYU1hdG1bMF07XHJcbiAgICAgICAgdGhpcy5fbTAxID0gY2FtZXJhTWF0bVsxXTtcclxuICAgICAgICB0aGlzLl9tMDQgPSBjYW1lcmFNYXRtWzRdO1xyXG4gICAgICAgIHRoaXMuX20wNSA9IGNhbWVyYU1hdG1bNV07XHJcbiAgICAgICAgdGhpcy5fbTEyID0gY2FtZXJhTWF0bVsxMl07XHJcbiAgICAgICAgdGhpcy5fbTEzID0gY2FtZXJhTWF0bVsxM107XHJcbiAgICAgICAgdGhpcy5fdyA9IG5vZGUuX2NvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX2ggPSBub2RlLl9jb250ZW50U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgLy8gdXBkYXRlIHZpZXdwb3J0IGNhY2hlXHJcbiAgICAgICAgdGhpcy5fY2FjaGVWaWV3cG9ydFJlY3Quc2V0KGxvY2FsVmlldy5fdmlld3BvcnRSZWN0KTtcclxuXHJcbiAgICAgICAgbGV0IHNjYWxlWCA9IGxvY2FsVmlldy5fc2NhbGVYLCBzY2FsZVkgPSBsb2NhbFZpZXcuX3NjYWxlWSxcclxuICAgICAgICAgICAgdmlld3BvcnQgPSBsb2NhbFZpZXcuX3ZpZXdwb3J0UmVjdCxcclxuICAgICAgICAgICAgZHByID0gbG9jYWxWaWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNjYWxlWCAvPSBkcHI7XHJcbiAgICAgICAgc2NhbGVZIC89IGRwcjtcclxuICAgIFxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBjYy5nYW1lLmNvbnRhaW5lcjtcclxuICAgICAgICBsZXQgYSA9IGNhbWVyYU1hdG1bMF0gKiBzY2FsZVgsIGIgPSBjYW1lcmFNYXRtWzFdLCBjID0gY2FtZXJhTWF0bVs0XSwgZCA9IGNhbWVyYU1hdG1bNV0gKiBzY2FsZVk7XHJcbiAgICBcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgJiYgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0KTtcclxuICAgICAgICBvZmZzZXRYICs9IHZpZXdwb3J0LnggLyBkcHI7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBjb250YWluZXIgJiYgY29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gJiYgcGFyc2VJbnQoY29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20pO1xyXG4gICAgICAgIG9mZnNldFkgKz0gdmlld3BvcnQueSAvIGRwcjtcclxuICAgICAgICBsZXQgdHggPSBjYW1lcmFNYXRtWzEyXSAqIHNjYWxlWCArIG9mZnNldFgsIHR5ID0gY2FtZXJhTWF0bVsxM10gKiBzY2FsZVkgKyBvZmZzZXRZO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKHBvbHlmaWxsLnpvb21JbnZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZShub2RlLndpZHRoICogYSwgbm9kZS5oZWlnaHQgKiBkKTtcclxuICAgICAgICAgICAgYSA9IDE7XHJcbiAgICAgICAgICAgIGQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbTtcclxuICAgICAgICBsZXQgbWF0cml4ID0gXCJtYXRyaXgoXCIgKyBhICsgXCIsXCIgKyAtYiArIFwiLFwiICsgLWMgKyBcIixcIiArIGQgKyBcIixcIiArIHR4ICsgXCIsXCIgKyAtdHkgKyBcIilcIjtcclxuICAgICAgICBlbGVtLnN0eWxlWyd0cmFuc2Zvcm0nXSA9IG1hdHJpeDtcclxuICAgICAgICBlbGVtLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybSddID0gbWF0cml4O1xyXG4gICAgICAgIGVsZW0uc3R5bGVbJ3RyYW5zZm9ybS1vcmlnaW4nXSA9ICcwcHggMTAwJSAwcHgnO1xyXG4gICAgICAgIGVsZW0uc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIGlucHV0IHR5cGUgYW5kIG1heCBsZW5ndGhcclxuICAgIF91cGRhdGVJbnB1dFR5cGUgKCkge1xyXG4gICAgICAgIGxldCBkZWxlZ2F0ZSA9IHRoaXMuX2RlbGVnYXRlLFxyXG4gICAgICAgICAgICBpbnB1dE1vZGUgPSBkZWxlZ2F0ZS5pbnB1dE1vZGUsXHJcbiAgICAgICAgICAgIGlucHV0RmxhZyA9IGRlbGVnYXRlLmlucHV0RmxhZyxcclxuICAgICAgICAgICAgcmV0dXJuVHlwZSA9IGRlbGVnYXRlLnJldHVyblR5cGUsXHJcbiAgICAgICAgICAgIGVsZW0gPSB0aGlzLl9lbGVtO1xyXG5cclxuICAgICAgICAvLyB3aGV0aGVyIG5lZWQgdG8gdXBkYXRlXHJcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0TW9kZSA9PT0gaW5wdXRNb2RlICYmXHJcbiAgICAgICAgICAgIHRoaXMuX2lucHV0RmxhZyA9PT0gaW5wdXRGbGFnICYmXHJcbiAgICAgICAgICAgIHRoaXMuX3JldHVyblR5cGUgPT09IHJldHVyblR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGNhY2hlXHJcbiAgICAgICAgdGhpcy5faW5wdXRNb2RlID0gaW5wdXRNb2RlO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RmxhZyA9IGlucHV0RmxhZztcclxuICAgICAgICB0aGlzLl9yZXR1cm5UeXBlID0gcmV0dXJuVHlwZTtcclxuXHJcbiAgICAgICAgLy8gRklYIE1FOiBUZXh0QXJlYSBhY3R1YWxseSBkb3NlIG5vdCBzdXBwb3J0IHBhc3N3b3JkIHR5cGUuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzVGV4dEFyZWEpIHtcclxuICAgICAgICAgICAgLy8gaW5wdXQgZmxhZ1xyXG4gICAgICAgICAgICBsZXQgdGV4dFRyYW5zZm9ybSA9ICdub25lJztcclxuICAgICAgICAgICAgaWYgKGlucHV0RmxhZyA9PT0gSW5wdXRGbGFnLklOSVRJQUxfQ0FQU19BTExfQ0hBUkFDVEVSUykge1xyXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybSA9ICd1cHBlcmNhc2UnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0RmxhZyA9PT0gSW5wdXRGbGFnLklOSVRJQUxfQ0FQU19XT1JEKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtID0gJ2NhcGl0YWxpemUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUudGV4dFRyYW5zZm9ybSA9IHRleHRUcmFuc2Zvcm07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvLyBiZWdpbiB0byB1cGRhdGVJbnB1dFR5cGVcclxuICAgICAgICBpZiAoaW5wdXRGbGFnID09PSBJbnB1dEZsYWcuUEFTU1dPUkQpIHtcclxuICAgICAgICAgICAgZWxlbS50eXBlID0gJ3Bhc3N3b3JkJztcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy8gaW5wdXQgbW9kZVxyXG4gICAgICAgIGxldCB0eXBlID0gZWxlbS50eXBlO1xyXG4gICAgICAgIGlmIChpbnB1dE1vZGUgPT09IElucHV0TW9kZS5FTUFJTF9BRERSKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAnZW1haWwnO1xyXG4gICAgICAgIH0gZWxzZSBpZihpbnB1dE1vZGUgPT09IElucHV0TW9kZS5OVU1FUklDIHx8IGlucHV0TW9kZSA9PT0gSW5wdXRNb2RlLkRFQ0lNQUwpIHtcclxuICAgICAgICAgICAgdHlwZSA9ICdudW1iZXInO1xyXG4gICAgICAgIH0gZWxzZSBpZihpbnB1dE1vZGUgPT09IElucHV0TW9kZS5QSE9ORV9OVU1CRVIpIHtcclxuICAgICAgICAgICAgdHlwZSA9ICdudW1iZXInO1xyXG4gICAgICAgICAgICBlbGVtLnBhdHRlcm4gPSAnWzAtOV0qJztcclxuICAgICAgICB9IGVsc2UgaWYoaW5wdXRNb2RlID09PSBJbnB1dE1vZGUuVVJMKSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSAndXJsJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0eXBlID0gJ3RleHQnO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChyZXR1cm5UeXBlID09PSBLZXlib2FyZFJldHVyblR5cGUuU0VBUkNIKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3NlYXJjaCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxlbS50eXBlID0gdHlwZTtcclxuXHJcbiAgICAgICAgLy8gaW5wdXQgZmxhZ1xyXG4gICAgICAgIGxldCB0ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gICAgICAgIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfQUxMX0NIQVJBQ1RFUlMpIHtcclxuICAgICAgICAgICAgdGV4dFRyYW5zZm9ybSA9ICd1cHBlcmNhc2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbnB1dEZsYWcgPT09IElucHV0RmxhZy5JTklUSUFMX0NBUFNfV09SRCkge1xyXG4gICAgICAgICAgICB0ZXh0VHJhbnNmb3JtID0gJ2NhcGl0YWxpemUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSB0ZXh0VHJhbnNmb3JtO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlTWF4TGVuZ3RoICgpIHtcclxuICAgICAgICBsZXQgbWF4TGVuZ3RoID0gdGhpcy5fZGVsZWdhdGUubWF4TGVuZ3RoO1xyXG4gICAgICAgIGlmKG1heExlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgLy93ZSBjYW4ndCBzZXQgTnVtYmVyLk1BWF9WQUxVRSB0byBpbnB1dCdzIG1heExlbmd0aCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICAvL3NvIHdlIHVzZSBhIG1hZ2ljIG51bWJlciBoZXJlLCBpdCBzaG91bGQgd29ya3MgYXQgbW9zdCB1c2UgY2FzZXMuXHJcbiAgICAgICAgICAgIG1heExlbmd0aCA9IDY1NTM1O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9lbGVtLm1heExlbmd0aCA9IG1heExlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gc3R5bGUgc2hlZXRcclxuICAgIF9pbml0U3R5bGVTaGVldCAoKSB7XHJcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtO1xyXG4gICAgICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBlbGVtLnN0eWxlLmJvcmRlciA9IDA7XHJcbiAgICAgICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50JztcclxuICAgICAgICBlbGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG4gICAgICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xyXG4gICAgICAgIGVsZW0uc3R5bGUuYWN0aXZlID0gMDtcclxuICAgICAgICBlbGVtLnN0eWxlLm91dGxpbmUgPSAnbWVkaXVtJztcclxuICAgICAgICBlbGVtLnN0eWxlLnBhZGRpbmcgPSAnMCc7XHJcbiAgICAgICAgZWxlbS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gICAgICAgIGVsZW0uc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgZWxlbS5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xyXG4gICAgICAgIGVsZW0uc3R5bGUubGVmdCA9IExFRlRfUEFERElORyArIFwicHhcIjtcclxuICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IFwiY29jb3NFZGl0Qm94XCI7XHJcbiAgICAgICAgZWxlbS5pZCA9IHRoaXMuX2RvbUlkO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2lzVGV4dEFyZWEpIHtcclxuICAgICAgICAgICAgZWxlbS50eXBlID0gJ3RleHQnO1xyXG4gICAgICAgICAgICBlbGVtLnN0eWxlWyctbW96LWFwcGVhcmFuY2UnXSA9ICd0ZXh0ZmllbGQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbS5zdHlsZS5yZXNpemUgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGVsZW0uc3R5bGUub3ZlcmZsb3dfeSA9ICdzY3JvbGwnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJTdHlsZVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIF91cGRhdGVTdHlsZVNoZWV0ICgpIHtcclxuICAgICAgICBsZXQgZGVsZWdhdGUgPSB0aGlzLl9kZWxlZ2F0ZSxcclxuICAgICAgICAgICAgZWxlbSA9IHRoaXMuX2VsZW07XHJcblxyXG4gICAgICAgIGVsZW0udmFsdWUgPSBkZWxlZ2F0ZS5zdHJpbmc7XHJcbiAgICAgICAgZWxlbS5wbGFjZWhvbGRlciA9IGRlbGVnYXRlLnBsYWNlaG9sZGVyO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVUZXh0TGFiZWwoZGVsZWdhdGUudGV4dExhYmVsKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVQbGFjZWhvbGRlckxhYmVsKGRlbGVnYXRlLnBsYWNlaG9sZGVyTGFiZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVGV4dExhYmVsICh0ZXh0TGFiZWwpIHtcclxuICAgICAgICBpZiAoIXRleHRMYWJlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdldCBmb250XHJcbiAgICAgICAgbGV0IGZvbnQgPSB0ZXh0TGFiZWwuZm9udDtcclxuICAgICAgICBpZiAoZm9udCAmJiAhKGZvbnQgaW5zdGFuY2VvZiBjYy5CaXRtYXBGb250KSkge1xyXG4gICAgICAgICAgICBmb250ID0gZm9udC5fZm9udEZhbWlseTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvbnQgPSB0ZXh0TGFiZWwuZm9udEZhbWlseTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBmb250IHNpemVcclxuICAgICAgICBsZXQgZm9udFNpemUgPSB0ZXh0TGFiZWwuZm9udFNpemUgKiB0ZXh0TGFiZWwubm9kZS5zY2FsZVk7XHJcblxyXG4gICAgICAgIC8vIHdoZXRoZXIgbmVlZCB0byB1cGRhdGVcclxuICAgICAgICBpZiAodGhpcy5fdGV4dExhYmVsRm9udCA9PT0gZm9udFxyXG4gICAgICAgICAgICAmJiB0aGlzLl90ZXh0TGFiZWxGb250U2l6ZSA9PT0gZm9udFNpemVcclxuICAgICAgICAgICAgJiYgdGhpcy5fdGV4dExhYmVsRm9udENvbG9yID09PSB0ZXh0TGFiZWwuZm9udENvbG9yXHJcbiAgICAgICAgICAgICYmIHRoaXMuX3RleHRMYWJlbEFsaWduID09PSB0ZXh0TGFiZWwuaG9yaXpvbnRhbEFsaWduKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgY2FjaGVcclxuICAgICAgICB0aGlzLl90ZXh0TGFiZWxGb250ID0gZm9udDtcclxuICAgICAgICB0aGlzLl90ZXh0TGFiZWxGb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuX3RleHRMYWJlbEZvbnRDb2xvciA9IHRleHRMYWJlbC5mb250Q29sb3I7XHJcbiAgICAgICAgdGhpcy5fdGV4dExhYmVsQWxpZ24gPSB0ZXh0TGFiZWwuaG9yaXpvbnRhbEFsaWduO1xyXG5cclxuICAgICAgICBsZXQgZWxlbSA9IHRoaXMuX2VsZW07XHJcbiAgICAgICAgLy8gZm9udCBzaXplXHJcbiAgICAgICAgZWxlbS5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcclxuICAgICAgICAvLyBmb250IGNvbG9yXHJcbiAgICAgICAgZWxlbS5zdHlsZS5jb2xvciA9IHRleHRMYWJlbC5ub2RlLmNvbG9yLnRvQ1NTKCk7XHJcbiAgICAgICAgLy8gZm9udCBmYW1pbHlcclxuICAgICAgICBlbGVtLnN0eWxlLmZvbnRGYW1pbHkgPSBmb250O1xyXG4gICAgICAgIC8vIHRleHQtYWxpZ25cclxuICAgICAgICBzd2l0Y2godGV4dExhYmVsLmhvcml6b250YWxBbGlnbikge1xyXG4gICAgICAgICAgICBjYXNlIExhYmVsLkhvcml6b250YWxBbGlnbi5MRUZUOlxyXG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50ZXh0QWxpZ24gPSAnbGVmdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhYmVsLkhvcml6b250YWxBbGlnbi5SSUdIVDpcclxuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsaW5lSGVpZ2h0XHJcbiAgICAgICAgLy8gQ2FuJ3Qgc3luYyBsaW5lSGVpZ2h0IHByb3BlcnR5LCBiZWNhdXNlIGxpbmVIZWlnaHQgd291bGQgY2hhbmdlIHRoZSB0b3VjaCBhcmVhIG9mIGlucHV0XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVQbGFjZWhvbGRlckxhYmVsIChwbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgaWYgKCFwbGFjZWhvbGRlckxhYmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGdldCBmb250XHJcbiAgICAgICAgbGV0IGZvbnQgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnQ7XHJcbiAgICAgICAgaWYgKGZvbnQgJiYgIShmb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkpIHtcclxuICAgICAgICAgICAgZm9udCA9IHBsYWNlaG9sZGVyTGFiZWwuZm9udC5fZm9udEZhbWlseTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvbnQgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnRGYW1pbHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBnZXQgZm9udCBzaXplXHJcbiAgICAgICAgbGV0IGZvbnRTaXplID0gcGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSAqIHBsYWNlaG9sZGVyTGFiZWwubm9kZS5zY2FsZVk7XHJcblxyXG4gICAgICAgIC8vIHdoZXRoZXIgbmVlZCB0byB1cGRhdGVcclxuICAgICAgICBpZiAodGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnQgPT09IGZvbnRcclxuICAgICAgICAgICAgJiYgdGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnRTaXplID09PSBmb250U2l6ZVxyXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGFjZWhvbGRlckxhYmVsRm9udENvbG9yID09PSBwbGFjZWhvbGRlckxhYmVsLmZvbnRDb2xvclxyXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGFjZWhvbGRlckxhYmVsQWxpZ24gPT09IHBsYWNlaG9sZGVyTGFiZWwuaG9yaXpvbnRhbEFsaWduXHJcbiAgICAgICAgICAgICYmIHRoaXMuX3BsYWNlaG9sZGVyTGluZUhlaWdodCA9PT0gcGxhY2Vob2xkZXJMYWJlbC5mb250U2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIGNhY2hlXHJcbiAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXJMYWJlbEZvbnQgPSBmb250O1xyXG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyTGFiZWxGb250Q29sb3IgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnRDb2xvcjtcclxuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckxhYmVsQWxpZ24gPSBwbGFjZWhvbGRlckxhYmVsLmhvcml6b250YWxBbGlnbjtcclxuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlckxpbmVIZWlnaHQgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGVFbCA9IHRoaXMuX3BsYWNlaG9sZGVyU3R5bGVTaGVldDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBmb250IGNvbG9yXHJcbiAgICAgICAgbGV0IGZvbnRDb2xvciA9IHBsYWNlaG9sZGVyTGFiZWwubm9kZS5jb2xvci50b0NTUygpO1xyXG4gICAgICAgIC8vIGxpbmUgaGVpZ2h0XHJcbiAgICAgICAgbGV0IGxpbmVIZWlnaHQgPSBwbGFjZWhvbGRlckxhYmVsLmZvbnRTaXplOyAgLy8gdG9wIHZlcnRpY2FsIGFsaWduIGJ5IGRlZmF1bHRcclxuICAgICAgICAvLyBob3Jpem9udGFsIGFsaWduXHJcbiAgICAgICAgbGV0IGhvcml6b250YWxBbGlnbjtcclxuICAgICAgICBzd2l0Y2ggKHBsYWNlaG9sZGVyTGFiZWwuaG9yaXpvbnRhbEFsaWduKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFiZWwuSG9yaXpvbnRhbEFsaWduLkxFRlQ6XHJcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uQ0VOVEVSOlxyXG4gICAgICAgICAgICAgICAgaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYWJlbC5Ib3Jpem9udGFsQWxpZ24uUklHSFQ6XHJcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHlsZUVsLmlubmVySFRNTCA9IGAjJHt0aGlzLl9kb21JZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIsIyR7dGhpcy5fZG9tSWR9OjotbW96LXBsYWNlaG9sZGVyLCMke3RoaXMuX2RvbUlkfTotbXMtaW5wdXQtcGxhY2Vob2xkZXJgICtcclxuICAgICAgICBge3RleHQtdHJhbnNmb3JtOiBpbml0aWFsOyBmb250LWZhbWlseTogJHtmb250fTsgZm9udC1zaXplOiAke2ZvbnRTaXplfXB4OyBjb2xvcjogJHtmb250Q29sb3J9OyBsaW5lLWhlaWdodDogJHtsaW5lSGVpZ2h0fXB4OyB0ZXh0LWFsaWduOiAke2hvcml6b250YWxBbGlnbn07fWA7XHJcbiAgICAgICAgLy8gRURHRV9CVUdfRklYOiBoaWRlIGNsZWFyIGJ1dHRvbiwgYmVjYXVzZSBjbGVhcmluZyBpbnB1dCBib3ggaW4gRWRnZSBkb2VzIG5vdCBlbWl0IGlucHV0IGV2ZW50IFxyXG4gICAgICAgIC8vIGlzc3VlIHJlZmZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzI2MzA3XHJcbiAgICAgICAgaWYgKGNjLnN5cy5icm93c2VyVHlwZSA9PT0gY2Muc3lzLkJST1dTRVJfVFlQRV9FREdFKSB7XHJcbiAgICAgICAgICAgIHN0eWxlRWwuaW5uZXJIVE1MICs9IGAjJHt0aGlzLl9kb21JZH06Oi1tcy1jbGVhcntkaXNwbGF5OiBub25lO31gO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gaGFuZGxlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgX3JlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMgKCkgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGltcGwgPSB0aGlzLFxyXG4gICAgICAgICAgICBlbGVtID0gdGhpcy5fZWxlbSxcclxuICAgICAgICAgICAgaW5wdXRMb2NrID0gZmFsc2UsXHJcbiAgICAgICAgICAgIGNicyA9IHRoaXMuX2V2ZW50TGlzdGVuZXJzO1xyXG5cclxuICAgICAgICBjYnMuY29tcG9zaXRpb25TdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5wdXRMb2NrID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNicy5jb21wb3NpdGlvbkVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5wdXRMb2NrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGltcGwuX2RlbGVnYXRlLmVkaXRCb3hUZXh0Q2hhbmdlZChlbGVtLnZhbHVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYnMub25JbnB1dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0TG9jaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlucHV0IG9mIG51bWJlciB0eXBlIGRvZXNuJ3Qgc3VwcG9ydCBtYXhMZW5ndGggYXR0cmlidXRlXHJcbiAgICAgICAgICAgIGxldCBtYXhMZW5ndGggPSBpbXBsLl9kZWxlZ2F0ZS5tYXhMZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChtYXhMZW5ndGggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgZWxlbS52YWx1ZSA9IGVsZW0udmFsdWUuc2xpY2UoMCwgbWF4TGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbXBsLl9kZWxlZ2F0ZS5lZGl0Qm94VGV4dENoYW5nZWQoZWxlbS52YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBUaGVyZSBhcmUgMiB3YXlzIHRvIGZvY3VzIG9uIHRoZSBpbnB1dCBlbGVtZW50OlxyXG4gICAgICAgIC8vIENsaWNrIHRoZSBpbnB1dCBlbGVtZW50LCBvciBjYWxsIGlucHV0LmZvY3VzKCkuXHJcbiAgICAgICAgLy8gQm90aCBuZWVkIHRvIGFkanVzdCB3aW5kb3cgc2Nyb2xsLlxyXG4gICAgICAgIGNicy5vbkNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy8gSW4gY2FzZSBvcGVyYXRpb24gc2VxdWVuY2U6IGNsaWNrIGlucHV0LCBoaWRlIGtleWJvYXJkLCB0aGVuIGNsaWNrIGFnYWluLlxyXG4gICAgICAgICAgICBpZiAoaW1wbC5fZWRpdGluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwuX2FkanVzdFdpbmRvd1Njcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBjYnMub25LZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gbWFjcm8uS0VZLmVudGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaW1wbC5fZGVsZWdhdGUuZWRpdEJveEVkaXRpbmdSZXR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWltcGwuX2lzVGV4dEFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IG1hY3JvLktFWS50YWIpIHtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXhVdGlsLm5leHQoaW1wbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYnMub25CbHVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBvbiBtb2JpbGUsIHNvbWV0aW1lcyBpbnB1dCBlbGVtZW50IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCBldmVudFxyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlICYmIGlucHV0TG9jaykge1xyXG4gICAgICAgICAgICAgICAgY2JzLmNvbXBvc2l0aW9uRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW1wbC5fZWRpdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBfY3VycmVudEVkaXRCb3hJbXBsID0gbnVsbDtcclxuICAgICAgICAgICAgaW1wbC5faGlkZURvbSgpO1xyXG4gICAgICAgICAgICBpbXBsLl9kZWxlZ2F0ZS5lZGl0Qm94RWRpdGluZ0RpZEVuZGVkKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjb21wb3NpdGlvbnN0YXJ0JywgY2JzLmNvbXBvc2l0aW9uU3RhcnQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25lbmQnLCBjYnMuY29tcG9zaXRpb25FbmQpO1xyXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYnMub25JbnB1dCk7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2JzLm9uS2V5ZG93bik7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgY2JzLm9uQmx1cik7XHJcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2JzLm9uQ2xpY2spO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgKCkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fZWxlbSxcclxuICAgICAgICAgICAgY2JzID0gdGhpcy5fZXZlbnRMaXN0ZW5lcnM7XHJcblxyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY29tcG9zaXRpb25zdGFydCcsIGNicy5jb21wb3NpdGlvblN0YXJ0KTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgY2JzLmNvbXBvc2l0aW9uRW5kKTtcclxuICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2JzLm9uSW5wdXQpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNicy5vbktleWRvd24pO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIGNicy5vbkJsdXIpO1xyXG4gICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNicy5vbkNsaWNrKTtcclxuICAgICAgICBcclxuICAgICAgICBjYnMuY29tcG9zaXRpb25TdGFydCA9IG51bGw7XHJcbiAgICAgICAgY2JzLmNvbXBvc2l0aW9uRW5kID0gbnVsbDtcclxuICAgICAgICBjYnMub25JbnB1dCA9IG51bGw7XHJcbiAgICAgICAgY2JzLm9uS2V5ZG93biA9IG51bGw7XHJcbiAgICAgICAgY2JzLm9uQmx1ciA9IG51bGw7XHJcbiAgICAgICAgY2JzLm9uQ2xpY2sgPSBudWxsO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==