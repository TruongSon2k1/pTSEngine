
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/bmfont.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler2d = _interopRequireDefault(require("../../assembler-2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var textUtils = require('../../../utils/text-utils');

var macro = require('../../../platform/CCMacro');

var Label = require('../../../components/CCLabel');

var Overflow = Label.Overflow;

var shareLabelInfo = require('../utils').shareLabelInfo;

var LetterInfo = function LetterInfo() {
  this["char"] = '';
  this.valid = true;
  this.x = 0;
  this.y = 0;
  this.line = 0;
  this.hash = "";
};

var _tmpRect = cc.rect();

var _comp = null;
var _horizontalKernings = [];
var _lettersInfo = [];
var _linesWidth = [];
var _linesOffsetX = [];
var _fntConfig = null;
var _numberOfLines = 0;
var _textDesiredHeight = 0;
var _letterOffsetY = 0;
var _tailoredTopY = 0;
var _tailoredBottomY = 0;
var _bmfontScale = 1.0;
var _lineBreakWithoutSpaces = false;
var _spriteFrame = null;
var _lineSpacing = 0;

var _contentSize = cc.size();

var _string = '';
var _fontSize = 0;
var _originFontSize = 0;
var _hAlign = 0;
var _vAlign = 0;
var _spacingX = 0;
var _lineHeight = 0;
var _overflow = 0;
var _isWrapText = false;
var _labelWidth = 0;
var _labelHeight = 0;
var _maxLineWidth = 0;

var BmfontAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(BmfontAssembler, _Assembler2D);

  function BmfontAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = BmfontAssembler.prototype;

  _proto.updateRenderData = function updateRenderData(comp) {
    if (!comp._vertsDirty) return;
    if (_comp === comp) return;
    _comp = comp;

    this._reserveQuads(comp, comp.string.toString().length);

    this._updateFontFamily(comp);

    this._updateProperties(comp);

    this._updateLabelInfo(comp);

    this._updateContent();

    this.updateWorldVerts(comp);
    _comp._actualFontSize = _fontSize;

    _comp.node.setContentSize(_contentSize);

    _comp._vertsDirty = false;
    _comp = null;

    this._resetProperties();
  };

  _proto._updateFontScale = function _updateFontScale() {
    _bmfontScale = _fontSize / _originFontSize;
  };

  _proto._updateFontFamily = function _updateFontFamily(comp) {
    var fontAsset = comp.font;
    _spriteFrame = fontAsset.spriteFrame;
    _fntConfig = fontAsset._fntConfig;
    shareLabelInfo.fontAtlas = fontAsset._fontDefDictionary;
    this.packToDynamicAtlas(comp, _spriteFrame);
  };

  _proto._updateLabelInfo = function _updateLabelInfo() {
    // clear
    shareLabelInfo.hash = "";
    shareLabelInfo.margin = 0;
  };

  _proto._updateProperties = function _updateProperties(comp) {
    _string = comp.string.toString();
    _fontSize = comp.fontSize;
    _originFontSize = _fntConfig ? _fntConfig.fontSize : comp.fontSize;
    _hAlign = comp.horizontalAlign;
    _vAlign = comp.verticalAlign;
    _spacingX = comp.spacingX;
    _overflow = comp.overflow;
    _lineHeight = comp._lineHeight;
    _contentSize.width = comp.node.width;
    _contentSize.height = comp.node.height; // should wrap text

    if (_overflow === Overflow.NONE) {
      _isWrapText = false;
      _contentSize.width += shareLabelInfo.margin * 2;
      _contentSize.height += shareLabelInfo.margin * 2;
    } else if (_overflow === Overflow.RESIZE_HEIGHT) {
      _isWrapText = true;
      _contentSize.height += shareLabelInfo.margin * 2;
    } else {
      _isWrapText = comp.enableWrapText;
    }

    shareLabelInfo.lineHeight = _lineHeight;
    shareLabelInfo.fontSize = _fontSize;

    this._setupBMFontOverflowMetrics();
  };

  _proto._resetProperties = function _resetProperties() {
    _fntConfig = null;
    _spriteFrame = null;
    shareLabelInfo.hash = "";
    shareLabelInfo.margin = 0;
  };

  _proto._updateContent = function _updateContent() {
    this._updateFontScale();

    this._computeHorizontalKerningForText();

    this._alignText();
  };

  _proto._computeHorizontalKerningForText = function _computeHorizontalKerningForText() {
    var string = _string;
    var stringLen = string.length;
    var horizontalKernings = _horizontalKernings;
    var kerningDict;
    _fntConfig && (kerningDict = _fntConfig.kerningDict);

    if (kerningDict && !cc.js.isEmptyObject(kerningDict)) {
      var prev = -1;

      for (var i = 0; i < stringLen; ++i) {
        var key = string.charCodeAt(i);
        var kerningAmount = kerningDict[prev << 16 | key & 0xffff] || 0;

        if (i < stringLen - 1) {
          horizontalKernings[i] = kerningAmount;
        } else {
          horizontalKernings[i] = 0;
        }

        prev = key;
      }
    } else {
      horizontalKernings.length = 0;
    }
  };

  _proto._multilineTextWrap = function _multilineTextWrap(nextTokenFunc) {
    var textLen = _string.length;
    var lineIndex = 0;
    var nextTokenX = 0;
    var nextTokenY = 0;
    var longestLine = 0;
    var letterRight = 0;
    var highestY = 0;
    var lowestY = 0;
    var letterDef = null;
    var letterPosition = cc.v2(0, 0);

    for (var index = 0; index < textLen;) {
      var character = _string.charAt(index);

      if (character === "\n") {
        _linesWidth.push(letterRight);

        letterRight = 0;
        lineIndex++;
        nextTokenX = 0;
        nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;

        this._recordPlaceholderInfo(index, character);

        index++;
        continue;
      }

      var tokenLen = nextTokenFunc(_string, index, textLen);
      var tokenHighestY = highestY;
      var tokenLowestY = lowestY;
      var tokenRight = letterRight;
      var nextLetterX = nextTokenX;
      var newLine = false;

      for (var tmp = 0; tmp < tokenLen; ++tmp) {
        var letterIndex = index + tmp;
        character = _string.charAt(letterIndex);

        if (character === "\r") {
          this._recordPlaceholderInfo(letterIndex, character);

          continue;
        }

        letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

        if (!letterDef) {
          this._recordPlaceholderInfo(letterIndex, character);

          var atlasName = "";
          _fntConfig && (atlasName = _fntConfig.atlasName);
          console.log("Can't find letter definition in texture atlas " + atlasName + " for letter:" + character);
          continue;
        }

        var letterX = nextLetterX + letterDef.offsetX * _bmfontScale - shareLabelInfo.margin;

        if (_isWrapText && _maxLineWidth > 0 && nextTokenX > 0 && letterX + letterDef.w * _bmfontScale > _maxLineWidth && !textUtils.isUnicodeSpace(character)) {
          _linesWidth.push(letterRight);

          letterRight = 0;
          lineIndex++;
          nextTokenX = 0;
          nextTokenY -= _lineHeight * this._getFontScale() + _lineSpacing;
          newLine = true;
          break;
        } else {
          letterPosition.x = letterX;
        }

        letterPosition.y = nextTokenY - letterDef.offsetY * _bmfontScale + shareLabelInfo.margin;

        this._recordLetterInfo(letterPosition, character, letterIndex, lineIndex);

        if (letterIndex + 1 < _horizontalKernings.length && letterIndex < textLen - 1) {
          nextLetterX += _horizontalKernings[letterIndex + 1];
        }

        nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX - shareLabelInfo.margin * 2;
        tokenRight = letterPosition.x + letterDef.w * _bmfontScale - shareLabelInfo.margin;

        if (tokenHighestY < letterPosition.y) {
          tokenHighestY = letterPosition.y;
        }

        if (tokenLowestY > letterPosition.y - letterDef.h * _bmfontScale) {
          tokenLowestY = letterPosition.y - letterDef.h * _bmfontScale;
        }
      } //end of for loop


      if (newLine) continue;
      nextTokenX = nextLetterX;
      letterRight = tokenRight;

      if (highestY < tokenHighestY) {
        highestY = tokenHighestY;
      }

      if (lowestY > tokenLowestY) {
        lowestY = tokenLowestY;
      }

      if (longestLine < letterRight) {
        longestLine = letterRight;
      }

      index += tokenLen;
    } //end of for loop


    _linesWidth.push(letterRight);

    _numberOfLines = lineIndex + 1;
    _textDesiredHeight = _numberOfLines * _lineHeight * this._getFontScale();

    if (_numberOfLines > 1) {
      _textDesiredHeight += (_numberOfLines - 1) * _lineSpacing;
    }

    _contentSize.width = _labelWidth;
    _contentSize.height = _labelHeight;

    if (_labelWidth <= 0) {
      _contentSize.width = parseFloat(longestLine.toFixed(2)) + shareLabelInfo.margin * 2;
    }

    if (_labelHeight <= 0) {
      _contentSize.height = parseFloat(_textDesiredHeight.toFixed(2)) + shareLabelInfo.margin * 2;
    }

    _tailoredTopY = _contentSize.height;
    _tailoredBottomY = 0;

    if (_overflow !== Overflow.CLAMP) {
      if (highestY > 0) {
        _tailoredTopY = _contentSize.height + highestY;
      }

      if (lowestY < -_textDesiredHeight) {
        _tailoredBottomY = _textDesiredHeight + lowestY;
      }
    }

    return true;
  };

  _proto._getFirstCharLen = function _getFirstCharLen() {
    return 1;
  };

  _proto._getFontScale = function _getFontScale() {
    return _overflow === Overflow.SHRINK ? _bmfontScale : 1;
  };

  _proto._getFirstWordLen = function _getFirstWordLen(text, startIndex, textLen) {
    var character = text.charAt(startIndex);

    if (textUtils.isUnicodeCJK(character) || character === "\n" || textUtils.isUnicodeSpace(character)) {
      return 1;
    }

    var len = 1;
    var letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

    if (!letterDef) {
      return len;
    }

    var nextLetterX = letterDef.xAdvance * _bmfontScale + _spacingX;
    var letterX;

    for (var index = startIndex + 1; index < textLen; ++index) {
      character = text.charAt(index);
      letterDef = shareLabelInfo.fontAtlas.getLetterDefinitionForChar(character, shareLabelInfo);

      if (!letterDef) {
        break;
      }

      letterX = nextLetterX + letterDef.offsetX * _bmfontScale;

      if (letterX + letterDef.w * _bmfontScale > _maxLineWidth && !textUtils.isUnicodeSpace(character) && _maxLineWidth > 0) {
        return len;
      }

      nextLetterX += letterDef.xAdvance * _bmfontScale + _spacingX;

      if (character === "\n" || textUtils.isUnicodeSpace(character) || textUtils.isUnicodeCJK(character)) {
        break;
      }

      len++;
    }

    return len;
  };

  _proto._multilineTextWrapByWord = function _multilineTextWrapByWord() {
    return this._multilineTextWrap(this._getFirstWordLen);
  };

  _proto._multilineTextWrapByChar = function _multilineTextWrapByChar() {
    return this._multilineTextWrap(this._getFirstCharLen);
  };

  _proto._recordPlaceholderInfo = function _recordPlaceholderInfo(letterIndex, _char) {
    if (letterIndex >= _lettersInfo.length) {
      var tmpInfo = new LetterInfo();

      _lettersInfo.push(tmpInfo);
    }

    _lettersInfo[letterIndex]["char"] = _char;
    _lettersInfo[letterIndex].hash = _char.charCodeAt(0) + shareLabelInfo.hash;
    _lettersInfo[letterIndex].valid = false;
  };

  _proto._recordLetterInfo = function _recordLetterInfo(letterPosition, character, letterIndex, lineIndex) {
    if (letterIndex >= _lettersInfo.length) {
      var tmpInfo = new LetterInfo();

      _lettersInfo.push(tmpInfo);
    }

    var _char2 = character.charCodeAt(0);

    var key = _char2 + shareLabelInfo.hash;
    _lettersInfo[letterIndex].line = lineIndex;
    _lettersInfo[letterIndex]["char"] = character;
    _lettersInfo[letterIndex].hash = key;
    _lettersInfo[letterIndex].valid = shareLabelInfo.fontAtlas.getLetter(key).valid;
    _lettersInfo[letterIndex].x = letterPosition.x;
    _lettersInfo[letterIndex].y = letterPosition.y;
  };

  _proto._alignText = function _alignText() {
    _textDesiredHeight = 0;
    _linesWidth.length = 0;

    if (!_lineBreakWithoutSpaces) {
      this._multilineTextWrapByWord();
    } else {
      this._multilineTextWrapByChar();
    }

    this._computeAlignmentOffset(); //shrink


    if (_overflow === Overflow.SHRINK) {
      if (_fontSize > 0 && this._isVerticalClamp()) {
        this._shrinkLabelToContentSize(this._isVerticalClamp);
      }
    }

    if (!this._updateQuads()) {
      if (_overflow === Overflow.SHRINK) {
        this._shrinkLabelToContentSize(this._isHorizontalClamp);
      }
    }
  };

  _proto._scaleFontSizeDown = function _scaleFontSizeDown(fontSize) {
    var shouldUpdateContent = true;

    if (!fontSize) {
      fontSize = 0.1;
      shouldUpdateContent = false;
    }

    _fontSize = fontSize;

    if (shouldUpdateContent) {
      this._updateContent();
    }
  };

  _proto._shrinkLabelToContentSize = function _shrinkLabelToContentSize(lambda) {
    var fontSize = _fontSize;
    var left = 0,
        right = fontSize | 0,
        mid = 0;

    while (left < right) {
      mid = left + right + 1 >> 1;
      var newFontSize = mid;

      if (newFontSize <= 0) {
        break;
      }

      _bmfontScale = newFontSize / _originFontSize;

      if (!_lineBreakWithoutSpaces) {
        this._multilineTextWrapByWord();
      } else {
        this._multilineTextWrapByChar();
      }

      this._computeAlignmentOffset();

      if (lambda()) {
        right = mid - 1;
      } else {
        left = mid;
      }
    }

    var actualFontSize = left;

    if (actualFontSize >= 0) {
      this._scaleFontSizeDown(actualFontSize);
    }
  };

  _proto._isVerticalClamp = function _isVerticalClamp() {
    if (_textDesiredHeight > _contentSize.height) {
      return true;
    } else {
      return false;
    }
  };

  _proto._isHorizontalClamp = function _isHorizontalClamp() {
    var letterClamp = false;

    for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
      var letterInfo = _lettersInfo[ctr];

      if (letterInfo.valid) {
        var letterDef = shareLabelInfo.fontAtlas.getLetter(letterInfo.hash);
        var px = letterInfo.x + letterDef.w * _bmfontScale;
        var lineIndex = letterInfo.line;

        if (_labelWidth > 0) {
          if (!_isWrapText) {
            if (px > _contentSize.width) {
              letterClamp = true;
              break;
            }
          } else {
            var wordWidth = _linesWidth[lineIndex];

            if (wordWidth > _contentSize.width && (px > _contentSize.width || px < 0)) {
              letterClamp = true;
              break;
            }
          }
        }
      }
    }

    return letterClamp;
  };

  _proto._isHorizontalClamped = function _isHorizontalClamped(px, lineIndex) {
    var wordWidth = _linesWidth[lineIndex];
    var letterOverClamp = px > _contentSize.width || px < 0;

    if (!_isWrapText) {
      return letterOverClamp;
    } else {
      return wordWidth > _contentSize.width && letterOverClamp;
    }
  };

  _proto._updateQuads = function _updateQuads() {
    var texture = _spriteFrame ? _spriteFrame._texture : shareLabelInfo.fontAtlas.getTexture();
    var node = _comp.node;
    this.verticesCount = this.indicesCount = 0; // Need to reset dataLength in Canvas rendering mode.

    this._renderData && (this._renderData.dataLength = 0);
    var contentSize = _contentSize,
        appx = node._anchorPoint.x * contentSize.width,
        appy = node._anchorPoint.y * contentSize.height;
    var ret = true;

    for (var ctr = 0, l = _string.length; ctr < l; ++ctr) {
      var letterInfo = _lettersInfo[ctr];
      if (!letterInfo.valid) continue;
      var letterDef = shareLabelInfo.fontAtlas.getLetter(letterInfo.hash);
      _tmpRect.height = letterDef.h;
      _tmpRect.width = letterDef.w;
      _tmpRect.x = letterDef.u;
      _tmpRect.y = letterDef.v;
      var py = letterInfo.y + _letterOffsetY;

      if (_labelHeight > 0) {
        if (py > _tailoredTopY) {
          var clipTop = py - _tailoredTopY;
          _tmpRect.y += clipTop;
          _tmpRect.height -= clipTop;
          py = py - clipTop;
        }

        if (py - letterDef.h * _bmfontScale < _tailoredBottomY && _overflow === Overflow.CLAMP) {
          _tmpRect.height = py < _tailoredBottomY ? 0 : (py - _tailoredBottomY) / _bmfontScale;
        }
      }

      var lineIndex = letterInfo.line;
      var px = letterInfo.x + letterDef.w / 2 * _bmfontScale + _linesOffsetX[lineIndex];

      if (_labelWidth > 0) {
        if (this._isHorizontalClamped(px, lineIndex)) {
          if (_overflow === Overflow.CLAMP) {
            _tmpRect.width = 0;
          } else if (_overflow === Overflow.SHRINK) {
            if (_contentSize.width > letterDef.w) {
              ret = false;
              break;
            } else {
              _tmpRect.width = 0;
            }
          }
        }
      }

      if (_tmpRect.height > 0 && _tmpRect.width > 0) {
        var isRotated = this._determineRect(_tmpRect);

        var letterPositionX = letterInfo.x + _linesOffsetX[letterInfo.line];
        this.appendQuad(_comp, texture, _tmpRect, isRotated, letterPositionX - appx, py - appy, _bmfontScale);
      }
    }

    this._quadsUpdated(_comp);

    return ret;
  };

  _proto._determineRect = function _determineRect(tempRect) {
    var isRotated = _spriteFrame.isRotated();

    var originalSize = _spriteFrame._originalSize;
    var rect = _spriteFrame._rect;
    var offset = _spriteFrame._offset;
    var trimmedLeft = offset.x + (originalSize.width - rect.width) / 2;
    var trimmedTop = offset.y - (originalSize.height - rect.height) / 2;

    if (!isRotated) {
      tempRect.x += rect.x - trimmedLeft;
      tempRect.y += rect.y + trimmedTop;
    } else {
      var originalX = tempRect.x;
      tempRect.x = rect.x + rect.height - tempRect.y - tempRect.height - trimmedTop;
      tempRect.y = originalX + rect.y - trimmedLeft;

      if (tempRect.y < 0) {
        tempRect.height = tempRect.height + trimmedTop;
      }
    }

    return isRotated;
  };

  _proto._computeAlignmentOffset = function _computeAlignmentOffset() {
    _linesOffsetX.length = 0;

    switch (_hAlign) {
      case macro.TextAlignment.LEFT:
        for (var i = 0; i < _numberOfLines; ++i) {
          _linesOffsetX.push(0);
        }

        break;

      case macro.TextAlignment.CENTER:
        for (var _i = 0, l = _linesWidth.length; _i < l; _i++) {
          _linesOffsetX.push((_contentSize.width - _linesWidth[_i]) / 2);
        }

        break;

      case macro.TextAlignment.RIGHT:
        for (var _i2 = 0, _l = _linesWidth.length; _i2 < _l; _i2++) {
          _linesOffsetX.push(_contentSize.width - _linesWidth[_i2]);
        }

        break;

      default:
        break;
    } // TOP


    _letterOffsetY = _contentSize.height;

    if (_vAlign !== macro.VerticalTextAlignment.TOP) {
      var blank = _contentSize.height - _textDesiredHeight + _lineHeight * this._getFontScale() - _originFontSize * _bmfontScale;

      if (_vAlign === macro.VerticalTextAlignment.BOTTOM) {
        // BOTTOM
        _letterOffsetY -= blank;
      } else {
        // CENTER:
        _letterOffsetY -= blank / 2;
      }
    }
  };

  _proto._setupBMFontOverflowMetrics = function _setupBMFontOverflowMetrics() {
    var newWidth = _contentSize.width,
        newHeight = _contentSize.height;

    if (_overflow === Overflow.RESIZE_HEIGHT) {
      newHeight = 0;
    }

    if (_overflow === Overflow.NONE) {
      newWidth = 0;
      newHeight = 0;
    }

    _labelWidth = newWidth;
    _labelHeight = newHeight;
    _maxLineWidth = newWidth;
  };

  _proto.updateWorldVerts = function updateWorldVerts() {};

  _proto.appendQuad = function appendQuad(comp, texture, rect, rotated, x, y, scale) {};

  _proto._quadsUpdated = function _quadsUpdated(comp) {};

  _proto._reserveQuads = function _reserveQuads() {};

  return BmfontAssembler;
}(_assembler2d["default"]);

exports["default"] = BmfontAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx1dGlsc1xcbGFiZWxcXGJtZm9udC5qcyJdLCJuYW1lcyI6WyJ0ZXh0VXRpbHMiLCJyZXF1aXJlIiwibWFjcm8iLCJMYWJlbCIsIk92ZXJmbG93Iiwic2hhcmVMYWJlbEluZm8iLCJMZXR0ZXJJbmZvIiwidmFsaWQiLCJ4IiwieSIsImxpbmUiLCJoYXNoIiwiX3RtcFJlY3QiLCJjYyIsInJlY3QiLCJfY29tcCIsIl9ob3Jpem9udGFsS2VybmluZ3MiLCJfbGV0dGVyc0luZm8iLCJfbGluZXNXaWR0aCIsIl9saW5lc09mZnNldFgiLCJfZm50Q29uZmlnIiwiX251bWJlck9mTGluZXMiLCJfdGV4dERlc2lyZWRIZWlnaHQiLCJfbGV0dGVyT2Zmc2V0WSIsIl90YWlsb3JlZFRvcFkiLCJfdGFpbG9yZWRCb3R0b21ZIiwiX2JtZm9udFNjYWxlIiwiX2xpbmVCcmVha1dpdGhvdXRTcGFjZXMiLCJfc3ByaXRlRnJhbWUiLCJfbGluZVNwYWNpbmciLCJfY29udGVudFNpemUiLCJzaXplIiwiX3N0cmluZyIsIl9mb250U2l6ZSIsIl9vcmlnaW5Gb250U2l6ZSIsIl9oQWxpZ24iLCJfdkFsaWduIiwiX3NwYWNpbmdYIiwiX2xpbmVIZWlnaHQiLCJfb3ZlcmZsb3ciLCJfaXNXcmFwVGV4dCIsIl9sYWJlbFdpZHRoIiwiX2xhYmVsSGVpZ2h0IiwiX21heExpbmVXaWR0aCIsIkJtZm9udEFzc2VtYmxlciIsInVwZGF0ZVJlbmRlckRhdGEiLCJjb21wIiwiX3ZlcnRzRGlydHkiLCJfcmVzZXJ2ZVF1YWRzIiwic3RyaW5nIiwidG9TdHJpbmciLCJsZW5ndGgiLCJfdXBkYXRlRm9udEZhbWlseSIsIl91cGRhdGVQcm9wZXJ0aWVzIiwiX3VwZGF0ZUxhYmVsSW5mbyIsIl91cGRhdGVDb250ZW50IiwidXBkYXRlV29ybGRWZXJ0cyIsIl9hY3R1YWxGb250U2l6ZSIsIm5vZGUiLCJzZXRDb250ZW50U2l6ZSIsIl9yZXNldFByb3BlcnRpZXMiLCJfdXBkYXRlRm9udFNjYWxlIiwiZm9udEFzc2V0IiwiZm9udCIsInNwcml0ZUZyYW1lIiwiZm9udEF0bGFzIiwiX2ZvbnREZWZEaWN0aW9uYXJ5IiwicGFja1RvRHluYW1pY0F0bGFzIiwibWFyZ2luIiwiZm9udFNpemUiLCJob3Jpem9udGFsQWxpZ24iLCJ2ZXJ0aWNhbEFsaWduIiwic3BhY2luZ1giLCJvdmVyZmxvdyIsIndpZHRoIiwiaGVpZ2h0IiwiTk9ORSIsIlJFU0laRV9IRUlHSFQiLCJlbmFibGVXcmFwVGV4dCIsImxpbmVIZWlnaHQiLCJfc2V0dXBCTUZvbnRPdmVyZmxvd01ldHJpY3MiLCJfY29tcHV0ZUhvcml6b250YWxLZXJuaW5nRm9yVGV4dCIsIl9hbGlnblRleHQiLCJzdHJpbmdMZW4iLCJob3Jpem9udGFsS2VybmluZ3MiLCJrZXJuaW5nRGljdCIsImpzIiwiaXNFbXB0eU9iamVjdCIsInByZXYiLCJpIiwia2V5IiwiY2hhckNvZGVBdCIsImtlcm5pbmdBbW91bnQiLCJfbXVsdGlsaW5lVGV4dFdyYXAiLCJuZXh0VG9rZW5GdW5jIiwidGV4dExlbiIsImxpbmVJbmRleCIsIm5leHRUb2tlblgiLCJuZXh0VG9rZW5ZIiwibG9uZ2VzdExpbmUiLCJsZXR0ZXJSaWdodCIsImhpZ2hlc3RZIiwibG93ZXN0WSIsImxldHRlckRlZiIsImxldHRlclBvc2l0aW9uIiwidjIiLCJpbmRleCIsImNoYXJhY3RlciIsImNoYXJBdCIsInB1c2giLCJfZ2V0Rm9udFNjYWxlIiwiX3JlY29yZFBsYWNlaG9sZGVySW5mbyIsInRva2VuTGVuIiwidG9rZW5IaWdoZXN0WSIsInRva2VuTG93ZXN0WSIsInRva2VuUmlnaHQiLCJuZXh0TGV0dGVyWCIsIm5ld0xpbmUiLCJ0bXAiLCJsZXR0ZXJJbmRleCIsImdldExldHRlckRlZmluaXRpb25Gb3JDaGFyIiwiYXRsYXNOYW1lIiwiY29uc29sZSIsImxvZyIsImxldHRlclgiLCJvZmZzZXRYIiwidyIsImlzVW5pY29kZVNwYWNlIiwib2Zmc2V0WSIsIl9yZWNvcmRMZXR0ZXJJbmZvIiwieEFkdmFuY2UiLCJoIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJDTEFNUCIsIl9nZXRGaXJzdENoYXJMZW4iLCJTSFJJTksiLCJfZ2V0Rmlyc3RXb3JkTGVuIiwidGV4dCIsInN0YXJ0SW5kZXgiLCJpc1VuaWNvZGVDSksiLCJsZW4iLCJfbXVsdGlsaW5lVGV4dFdyYXBCeVdvcmQiLCJfbXVsdGlsaW5lVGV4dFdyYXBCeUNoYXIiLCJjaGFyIiwidG1wSW5mbyIsImdldExldHRlciIsIl9jb21wdXRlQWxpZ25tZW50T2Zmc2V0IiwiX2lzVmVydGljYWxDbGFtcCIsIl9zaHJpbmtMYWJlbFRvQ29udGVudFNpemUiLCJfdXBkYXRlUXVhZHMiLCJfaXNIb3Jpem9udGFsQ2xhbXAiLCJfc2NhbGVGb250U2l6ZURvd24iLCJzaG91bGRVcGRhdGVDb250ZW50IiwibGFtYmRhIiwibGVmdCIsInJpZ2h0IiwibWlkIiwibmV3Rm9udFNpemUiLCJhY3R1YWxGb250U2l6ZSIsImxldHRlckNsYW1wIiwiY3RyIiwibCIsImxldHRlckluZm8iLCJweCIsIndvcmRXaWR0aCIsIl9pc0hvcml6b250YWxDbGFtcGVkIiwibGV0dGVyT3ZlckNsYW1wIiwidGV4dHVyZSIsIl90ZXh0dXJlIiwiZ2V0VGV4dHVyZSIsInZlcnRpY2VzQ291bnQiLCJpbmRpY2VzQ291bnQiLCJfcmVuZGVyRGF0YSIsImRhdGFMZW5ndGgiLCJjb250ZW50U2l6ZSIsImFwcHgiLCJfYW5jaG9yUG9pbnQiLCJhcHB5IiwicmV0IiwidSIsInYiLCJweSIsImNsaXBUb3AiLCJpc1JvdGF0ZWQiLCJfZGV0ZXJtaW5lUmVjdCIsImxldHRlclBvc2l0aW9uWCIsImFwcGVuZFF1YWQiLCJfcXVhZHNVcGRhdGVkIiwidGVtcFJlY3QiLCJvcmlnaW5hbFNpemUiLCJfb3JpZ2luYWxTaXplIiwiX3JlY3QiLCJvZmZzZXQiLCJfb2Zmc2V0IiwidHJpbW1lZExlZnQiLCJ0cmltbWVkVG9wIiwib3JpZ2luYWxYIiwiVGV4dEFsaWdubWVudCIsIkxFRlQiLCJDRU5URVIiLCJSSUdIVCIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIlRPUCIsImJsYW5rIiwiQk9UVE9NIiwibmV3V2lkdGgiLCJuZXdIZWlnaHQiLCJyb3RhdGVkIiwic2NhbGUiLCJBc3NlbWJsZXIyRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQywyQkFBRCxDQUF6Qjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQywyQkFBRCxDQUFyQjs7QUFDQSxJQUFNRSxLQUFLLEdBQUdGLE9BQU8sQ0FBQyw2QkFBRCxDQUFyQjs7QUFDQSxJQUFNRyxRQUFRLEdBQUdELEtBQUssQ0FBQ0MsUUFBdkI7O0FBRUEsSUFBTUMsY0FBYyxHQUFHSixPQUFPLENBQUMsVUFBRCxDQUFQLENBQW9CSSxjQUEzQzs7QUFFQSxJQUFJQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFXO0FBQ3hCLGlCQUFZLEVBQVo7QUFDQSxPQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLE9BQUtDLENBQUwsR0FBUyxDQUFUO0FBQ0EsT0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtDLElBQUwsR0FBWSxFQUFaO0FBQ0gsQ0FQRDs7QUFTQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxFQUFmOztBQUVBLElBQUlDLEtBQUssR0FBRyxJQUFaO0FBRUEsSUFBSUMsbUJBQW1CLEdBQUcsRUFBMUI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsRUFBbkI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsRUFBcEI7QUFFQSxJQUFJQyxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsQ0FBckI7QUFDQSxJQUFJQyxrQkFBa0IsR0FBSSxDQUExQjtBQUNBLElBQUlDLGNBQWMsR0FBSSxD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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IEFzc2VtYmxlcjJEIGZyb20gJy4uLy4uL2Fzc2VtYmxlci0yZCc7XHJcblxyXG5jb25zdCB0ZXh0VXRpbHMgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscy90ZXh0LXV0aWxzJyk7XHJcbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi4vLi4vLi4vcGxhdGZvcm0vQ0NNYWNybycpO1xyXG5jb25zdCBMYWJlbCA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbCcpO1xyXG5jb25zdCBPdmVyZmxvdyA9IExhYmVsLk92ZXJmbG93O1xyXG5cclxuY29uc3Qgc2hhcmVMYWJlbEluZm8gPSByZXF1aXJlKCcuLi91dGlscycpLnNoYXJlTGFiZWxJbmZvO1xyXG5cclxubGV0IExldHRlckluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY2hhciA9ICcnO1xyXG4gICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMubGluZSA9IDA7XHJcbiAgICB0aGlzLmhhc2ggPSBcIlwiO1xyXG59O1xyXG5cclxubGV0IF90bXBSZWN0ID0gY2MucmVjdCgpO1xyXG5cclxubGV0IF9jb21wID0gbnVsbDtcclxuXHJcbmxldCBfaG9yaXpvbnRhbEtlcm5pbmdzID0gW107XHJcbmxldCBfbGV0dGVyc0luZm8gPSBbXTtcclxubGV0IF9saW5lc1dpZHRoID0gW107XHJcbmxldCBfbGluZXNPZmZzZXRYID0gW107XHJcblxyXG5sZXQgX2ZudENvbmZpZyA9IG51bGw7XHJcbmxldCBfbnVtYmVyT2ZMaW5lcyA9IDA7XHJcbmxldCBfdGV4dERlc2lyZWRIZWlnaHQgPSAgMDtcclxubGV0IF9sZXR0ZXJPZmZzZXRZID0gIDA7XHJcbmxldCBfdGFpbG9yZWRUb3BZID0gIDA7XHJcblxyXG5sZXQgX3RhaWxvcmVkQm90dG9tWSA9ICAwO1xyXG5sZXQgX2JtZm9udFNjYWxlID0gIDEuMDtcclxuXHJcbmxldCBfbGluZUJyZWFrV2l0aG91dFNwYWNlcyA9ICBmYWxzZTtcclxubGV0IF9zcHJpdGVGcmFtZSA9IG51bGw7XHJcbmxldCBfbGluZVNwYWNpbmcgPSAwO1xyXG5sZXQgX2NvbnRlbnRTaXplID0gY2Muc2l6ZSgpO1xyXG5sZXQgX3N0cmluZyA9ICcnO1xyXG5sZXQgX2ZvbnRTaXplID0gMDtcclxubGV0IF9vcmlnaW5Gb250U2l6ZSA9IDA7XHJcbmxldCBfaEFsaWduID0gMDtcclxubGV0IF92QWxpZ24gPSAwO1xyXG5sZXQgX3NwYWNpbmdYID0gMDtcclxubGV0IF9saW5lSGVpZ2h0ID0gMDtcclxubGV0IF9vdmVyZmxvdyA9IDA7XHJcbmxldCBfaXNXcmFwVGV4dCA9IGZhbHNlO1xyXG5sZXQgX2xhYmVsV2lkdGggPSAwO1xyXG5sZXQgX2xhYmVsSGVpZ2h0ID0gMDtcclxubGV0IF9tYXhMaW5lV2lkdGggPSAwO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm1mb250QXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyMkQge1xyXG4gICAgdXBkYXRlUmVuZGVyRGF0YSAoY29tcCkge1xyXG4gICAgICAgIGlmICghY29tcC5fdmVydHNEaXJ0eSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChfY29tcCA9PT0gY29tcCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBfY29tcCA9IGNvbXA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVzZXJ2ZVF1YWRzKGNvbXAsIGNvbXAuc3RyaW5nLnRvU3RyaW5nKCkubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVGb250RmFtaWx5KGNvbXApO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb3BlcnRpZXMoY29tcCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGFiZWxJbmZvKGNvbXApO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMoY29tcCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgX2NvbXAuX2FjdHVhbEZvbnRTaXplID0gX2ZvbnRTaXplO1xyXG4gICAgICAgIF9jb21wLm5vZGUuc2V0Q29udGVudFNpemUoX2NvbnRlbnRTaXplKTtcclxuXHJcbiAgICAgICAgX2NvbXAuX3ZlcnRzRGlydHkgPSBmYWxzZTtcclxuICAgICAgICBfY29tcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcmVzZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUZvbnRTY2FsZSAoKSB7XHJcbiAgICAgICAgX2JtZm9udFNjYWxlID0gX2ZvbnRTaXplIC8gX29yaWdpbkZvbnRTaXplO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVGb250RmFtaWx5IChjb21wKSB7XHJcbiAgICAgICAgbGV0IGZvbnRBc3NldCA9IGNvbXAuZm9udDtcclxuICAgICAgICBfc3ByaXRlRnJhbWUgPSBmb250QXNzZXQuc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgX2ZudENvbmZpZyA9IGZvbnRBc3NldC5fZm50Q29uZmlnO1xyXG4gICAgICAgIHNoYXJlTGFiZWxJbmZvLmZvbnRBdGxhcyA9IGZvbnRBc3NldC5fZm9udERlZkRpY3Rpb25hcnk7XHJcblxyXG4gICAgICAgIHRoaXMucGFja1RvRHluYW1pY0F0bGFzKGNvbXAsIF9zcHJpdGVGcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUxhYmVsSW5mbygpIHtcclxuICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgIHNoYXJlTGFiZWxJbmZvLmhhc2ggPSBcIlwiO1xyXG4gICAgICAgIHNoYXJlTGFiZWxJbmZvLm1hcmdpbiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVByb3BlcnRpZXMgKGNvbXApIHtcclxuICAgICAgICBfc3RyaW5nID0gY29tcC5zdHJpbmcudG9TdHJpbmcoKTtcclxuICAgICAgICBfZm9udFNpemUgPSBjb21wLmZvbnRTaXplO1xyXG4gICAgICAgIF9vcmlnaW5Gb250U2l6ZSA9IF9mbnRDb25maWcgPyBfZm50Q29uZmlnLmZvbnRTaXplIDogY29tcC5mb250U2l6ZTtcclxuICAgICAgICBfaEFsaWduID0gY29tcC5ob3Jpem9udGFsQWxpZ247XHJcbiAgICAgICAgX3ZBbGlnbiA9IGNvbXAudmVydGljYWxBbGlnbjtcclxuICAgICAgICBfc3BhY2luZ1ggPSBjb21wLnNwYWNpbmdYO1xyXG4gICAgICAgIF9vdmVyZmxvdyA9IGNvbXAub3ZlcmZsb3c7XHJcbiAgICAgICAgX2xpbmVIZWlnaHQgPSBjb21wLl9saW5lSGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIF9jb250ZW50U2l6ZS53aWR0aCA9IGNvbXAubm9kZS53aWR0aDtcclxuICAgICAgICBfY29udGVudFNpemUuaGVpZ2h0ID0gY29tcC5ub2RlLmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gc2hvdWxkIHdyYXAgdGV4dFxyXG4gICAgICAgIGlmIChfb3ZlcmZsb3cgPT09IE92ZXJmbG93Lk5PTkUpIHtcclxuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgX2NvbnRlbnRTaXplLndpZHRoICs9IHNoYXJlTGFiZWxJbmZvLm1hcmdpbiAqIDI7XHJcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZS5oZWlnaHQgKz0gc2hhcmVMYWJlbEluZm8ubWFyZ2luICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5SRVNJWkVfSEVJR0hUKSB7XHJcbiAgICAgICAgICAgIF9pc1dyYXBUZXh0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCArPSBzaGFyZUxhYmVsSW5mby5tYXJnaW4gKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgX2lzV3JhcFRleHQgPSBjb21wLmVuYWJsZVdyYXBUZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzaGFyZUxhYmVsSW5mby5saW5lSGVpZ2h0ID0gX2xpbmVIZWlnaHQ7XHJcbiAgICAgICAgc2hhcmVMYWJlbEluZm8uZm9udFNpemUgPSBfZm9udFNpemU7XHJcblxyXG4gICAgICAgIHRoaXMuX3NldHVwQk1Gb250T3ZlcmZsb3dNZXRyaWNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0UHJvcGVydGllcyAoKSB7XHJcbiAgICAgICAgX2ZudENvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgX3Nwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICBzaGFyZUxhYmVsSW5mby5oYXNoID0gXCJcIjtcclxuICAgICAgICBzaGFyZUxhYmVsSW5mby5tYXJnaW4gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVDb250ZW50ICgpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVGb250U2NhbGUoKTtcclxuICAgICAgICB0aGlzLl9jb21wdXRlSG9yaXpvbnRhbEtlcm5pbmdGb3JUZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fYWxpZ25UZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbXB1dGVIb3Jpem9udGFsS2VybmluZ0ZvclRleHQgKCkge1xyXG4gICAgICAgIGxldCBzdHJpbmcgPSBfc3RyaW5nO1xyXG4gICAgICAgIGxldCBzdHJpbmdMZW4gPSBzdHJpbmcubGVuZ3RoO1xyXG5cclxuICAgICAgICBsZXQgaG9yaXpvbnRhbEtlcm5pbmdzID0gX2hvcml6b250YWxLZXJuaW5ncztcclxuICAgICAgICBsZXQga2VybmluZ0RpY3Q7XHJcbiAgICAgICAgX2ZudENvbmZpZyAmJiAoa2VybmluZ0RpY3QgPSBfZm50Q29uZmlnLmtlcm5pbmdEaWN0KTtcclxuICAgICAgICBpZiAoa2VybmluZ0RpY3QgJiYgIWNjLmpzLmlzRW1wdHlPYmplY3Qoa2VybmluZ0RpY3QpKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmV2ID0gLTE7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nTGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcclxuICAgICAgICAgICAgICAgIGxldCBrZXJuaW5nQW1vdW50ID0ga2VybmluZ0RpY3RbKHByZXYgPDwgMTYpIHwgKGtleSAmIDB4ZmZmZildIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8IHN0cmluZ0xlbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsS2VybmluZ3NbaV0gPSBrZXJuaW5nQW1vdW50O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsS2VybmluZ3NbaV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcHJldiA9IGtleTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvcml6b250YWxLZXJuaW5ncy5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfbXVsdGlsaW5lVGV4dFdyYXAgKG5leHRUb2tlbkZ1bmMpIHtcclxuICAgICAgICBsZXQgdGV4dExlbiA9IF9zdHJpbmcubGVuZ3RoO1xyXG5cclxuICAgICAgICBsZXQgbGluZUluZGV4ID0gMDtcclxuICAgICAgICBsZXQgbmV4dFRva2VuWCA9IDA7XHJcbiAgICAgICAgbGV0IG5leHRUb2tlblkgPSAwO1xyXG4gICAgICAgIGxldCBsb25nZXN0TGluZSA9IDA7XHJcbiAgICAgICAgbGV0IGxldHRlclJpZ2h0ID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGhpZ2hlc3RZID0gMDtcclxuICAgICAgICBsZXQgbG93ZXN0WSA9IDA7XHJcbiAgICAgICAgbGV0IGxldHRlckRlZiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGxldHRlclBvc2l0aW9uID0gY2MudjIoMCwgMCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZXh0TGVuOykge1xyXG4gICAgICAgICAgICBsZXQgY2hhcmFjdGVyID0gX3N0cmluZy5jaGFyQXQoaW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBcIlxcblwiKSB7XHJcbiAgICAgICAgICAgICAgICBfbGluZXNXaWR0aC5wdXNoKGxldHRlclJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGxldHRlclJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIGxpbmVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgbmV4dFRva2VuWCA9IDA7XHJcbiAgICAgICAgICAgICAgICBuZXh0VG9rZW5ZIC09IF9saW5lSGVpZ2h0ICogdGhpcy5fZ2V0Rm9udFNjYWxlKCkgKyBfbGluZVNwYWNpbmc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRQbGFjZWhvbGRlckluZm8oaW5kZXgsIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b2tlbkxlbiA9IG5leHRUb2tlbkZ1bmMoX3N0cmluZywgaW5kZXgsIHRleHRMZW4pO1xyXG4gICAgICAgICAgICBsZXQgdG9rZW5IaWdoZXN0WSA9IGhpZ2hlc3RZO1xyXG4gICAgICAgICAgICBsZXQgdG9rZW5Mb3dlc3RZID0gbG93ZXN0WTtcclxuICAgICAgICAgICAgbGV0IHRva2VuUmlnaHQgPSBsZXR0ZXJSaWdodDtcclxuICAgICAgICAgICAgbGV0IG5leHRMZXR0ZXJYID0gbmV4dFRva2VuWDtcclxuICAgICAgICAgICAgbGV0IG5ld0xpbmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRtcCA9IDA7IHRtcCA8IHRva2VuTGVuOyArK3RtcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldHRlckluZGV4ID0gaW5kZXggKyB0bXA7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXIgPSBfc3RyaW5nLmNoYXJBdChsZXR0ZXJJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhcmFjdGVyID09PSBcIlxcclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkUGxhY2Vob2xkZXJJbmZvKGxldHRlckluZGV4LCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0dGVyRGVmID0gc2hhcmVMYWJlbEluZm8uZm9udEF0bGFzLmdldExldHRlckRlZmluaXRpb25Gb3JDaGFyKGNoYXJhY3Rlciwgc2hhcmVMYWJlbEluZm8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsZXR0ZXJEZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRQbGFjZWhvbGRlckluZm8obGV0dGVySW5kZXgsIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0bGFzTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgX2ZudENvbmZpZyAmJiAoYXRsYXNOYW1lID0gX2ZudENvbmZpZy5hdGxhc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FuJ3QgZmluZCBsZXR0ZXIgZGVmaW5pdGlvbiBpbiB0ZXh0dXJlIGF0bGFzIFwiICsgYXRsYXNOYW1lICsgXCIgZm9yIGxldHRlcjpcIiArIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxldHRlclggPSBuZXh0TGV0dGVyWCArIGxldHRlckRlZi5vZmZzZXRYICogX2JtZm9udFNjYWxlIC0gc2hhcmVMYWJlbEluZm8ubWFyZ2luO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfaXNXcmFwVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgICYmIF9tYXhMaW5lV2lkdGggPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgbmV4dFRva2VuWCA+IDBcclxuICAgICAgICAgICAgICAgICAgICAmJiBsZXR0ZXJYICsgbGV0dGVyRGVmLncgKiBfYm1mb250U2NhbGUgPiBfbWF4TGluZVdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgIXRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVzV2lkdGgucHVzaChsZXR0ZXJSaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0dGVyUmlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUb2tlblggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUb2tlblkgLT0gKF9saW5lSGVpZ2h0ICogdGhpcy5fZ2V0Rm9udFNjYWxlKCkgKyBfbGluZVNwYWNpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJQb3NpdGlvbi54ID0gbGV0dGVyWDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJQb3NpdGlvbi55ID0gbmV4dFRva2VuWSAtIGxldHRlckRlZi5vZmZzZXRZICogX2JtZm9udFNjYWxlICArIHNoYXJlTGFiZWxJbmZvLm1hcmdpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY29yZExldHRlckluZm8obGV0dGVyUG9zaXRpb24sIGNoYXJhY3RlciwgbGV0dGVySW5kZXgsIGxpbmVJbmRleCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxldHRlckluZGV4ICsgMSA8IF9ob3Jpem9udGFsS2VybmluZ3MubGVuZ3RoICYmIGxldHRlckluZGV4IDwgdGV4dExlbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0TGV0dGVyWCArPSBfaG9yaXpvbnRhbEtlcm5pbmdzW2xldHRlckluZGV4ICsgMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dExldHRlclggKz0gbGV0dGVyRGVmLnhBZHZhbmNlICogX2JtZm9udFNjYWxlICsgX3NwYWNpbmdYICAtIHNoYXJlTGFiZWxJbmZvLm1hcmdpbiAqIDI7XHJcblxyXG4gICAgICAgICAgICAgICAgdG9rZW5SaWdodCA9IGxldHRlclBvc2l0aW9uLnggKyBsZXR0ZXJEZWYudyAqIF9ibWZvbnRTY2FsZSAgLSBzaGFyZUxhYmVsSW5mby5tYXJnaW47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuSGlnaGVzdFkgPCBsZXR0ZXJQb3NpdGlvbi55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5IaWdoZXN0WSA9IGxldHRlclBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuTG93ZXN0WSA+IGxldHRlclBvc2l0aW9uLnkgLSBsZXR0ZXJEZWYuaCAqIF9ibWZvbnRTY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuTG93ZXN0WSA9IGxldHRlclBvc2l0aW9uLnkgLSBsZXR0ZXJEZWYuaCAqIF9ibWZvbnRTY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gLy9lbmQgb2YgZm9yIGxvb3BcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdMaW5lKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIG5leHRUb2tlblggPSBuZXh0TGV0dGVyWDtcclxuICAgICAgICAgICAgbGV0dGVyUmlnaHQgPSB0b2tlblJpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGhpZ2hlc3RZIDwgdG9rZW5IaWdoZXN0WSkge1xyXG4gICAgICAgICAgICAgICAgaGlnaGVzdFkgPSB0b2tlbkhpZ2hlc3RZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsb3dlc3RZID4gdG9rZW5Mb3dlc3RZKSB7XHJcbiAgICAgICAgICAgICAgICBsb3dlc3RZID0gdG9rZW5Mb3dlc3RZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsb25nZXN0TGluZSA8IGxldHRlclJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBsb25nZXN0TGluZSA9IGxldHRlclJpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbmRleCArPSB0b2tlbkxlbjtcclxuICAgICAgICB9IC8vZW5kIG9mIGZvciBsb29wXHJcblxyXG4gICAgICAgIF9saW5lc1dpZHRoLnB1c2gobGV0dGVyUmlnaHQpO1xyXG5cclxuICAgICAgICBfbnVtYmVyT2ZMaW5lcyA9IGxpbmVJbmRleCArIDE7XHJcbiAgICAgICAgX3RleHREZXNpcmVkSGVpZ2h0ID0gX251bWJlck9mTGluZXMgKiBfbGluZUhlaWdodCAqIHRoaXMuX2dldEZvbnRTY2FsZSgpO1xyXG4gICAgICAgIGlmIChfbnVtYmVyT2ZMaW5lcyA+IDEpIHtcclxuICAgICAgICAgICAgX3RleHREZXNpcmVkSGVpZ2h0ICs9IChfbnVtYmVyT2ZMaW5lcyAtIDEpICogX2xpbmVTcGFjaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX2NvbnRlbnRTaXplLndpZHRoID0gX2xhYmVsV2lkdGg7XHJcbiAgICAgICAgX2NvbnRlbnRTaXplLmhlaWdodCA9IF9sYWJlbEhlaWdodDtcclxuICAgICAgICBpZiAoX2xhYmVsV2lkdGggPD0gMCkge1xyXG4gICAgICAgICAgICBfY29udGVudFNpemUud2lkdGggPSBwYXJzZUZsb2F0KGxvbmdlc3RMaW5lLnRvRml4ZWQoMikpICsgc2hhcmVMYWJlbEluZm8ubWFyZ2luICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9sYWJlbEhlaWdodCA8PSAwKSB7XHJcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZS5oZWlnaHQgPSBwYXJzZUZsb2F0KF90ZXh0RGVzaXJlZEhlaWdodC50b0ZpeGVkKDIpKSArIHNoYXJlTGFiZWxJbmZvLm1hcmdpbiAqIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfdGFpbG9yZWRUb3BZID0gX2NvbnRlbnRTaXplLmhlaWdodDtcclxuICAgICAgICBfdGFpbG9yZWRCb3R0b21ZID0gMDtcclxuXHJcbiAgICAgICAgaWYgKF9vdmVyZmxvdyAhPT0gT3ZlcmZsb3cuQ0xBTVApIHtcclxuICAgICAgICAgICAgaWYgKGhpZ2hlc3RZID4gMCkge1xyXG4gICAgICAgICAgICAgICAgX3RhaWxvcmVkVG9wWSA9IF9jb250ZW50U2l6ZS5oZWlnaHQgKyBoaWdoZXN0WTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChsb3dlc3RZIDwgLV90ZXh0RGVzaXJlZEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgX3RhaWxvcmVkQm90dG9tWSA9IF90ZXh0RGVzaXJlZEhlaWdodCArIGxvd2VzdFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRGaXJzdENoYXJMZW4gKCkge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRGb250U2NhbGUgKCkge1xyXG4gICAgICAgIHJldHVybiBfb3ZlcmZsb3cgPT09IE92ZXJmbG93LlNIUklOSyA/IF9ibWZvbnRTY2FsZSA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEZpcnN0V29yZExlbiAodGV4dCwgc3RhcnRJbmRleCwgdGV4dExlbikge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChzdGFydEluZGV4KTtcclxuICAgICAgICBpZiAodGV4dFV0aWxzLmlzVW5pY29kZUNKSyhjaGFyYWN0ZXIpXHJcbiAgICAgICAgICAgIHx8IGNoYXJhY3RlciA9PT0gXCJcXG5cIlxyXG4gICAgICAgICAgICB8fCB0ZXh0VXRpbHMuaXNVbmljb2RlU3BhY2UoY2hhcmFjdGVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsZW4gPSAxO1xyXG4gICAgICAgIGxldCBsZXR0ZXJEZWYgPSBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0TGV0dGVyRGVmaW5pdGlvbkZvckNoYXIoY2hhcmFjdGVyLCBzaGFyZUxhYmVsSW5mbyk7XHJcbiAgICAgICAgaWYgKCFsZXR0ZXJEZWYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5leHRMZXR0ZXJYID0gbGV0dGVyRGVmLnhBZHZhbmNlICogX2JtZm9udFNjYWxlICsgX3NwYWNpbmdYO1xyXG4gICAgICAgIGxldCBsZXR0ZXJYO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleCArIDE7IGluZGV4IDwgdGV4dExlbjsgKytpbmRleCkge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSB0ZXh0LmNoYXJBdChpbmRleCk7XHJcblxyXG4gICAgICAgICAgICBsZXR0ZXJEZWYgPSBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0TGV0dGVyRGVmaW5pdGlvbkZvckNoYXIoY2hhcmFjdGVyLCBzaGFyZUxhYmVsSW5mbyk7XHJcbiAgICAgICAgICAgIGlmICghbGV0dGVyRGVmKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXR0ZXJYID0gbmV4dExldHRlclggKyBsZXR0ZXJEZWYub2Zmc2V0WCAqIF9ibWZvbnRTY2FsZTtcclxuXHJcbiAgICAgICAgICAgIGlmKGxldHRlclggKyBsZXR0ZXJEZWYudyAqIF9ibWZvbnRTY2FsZSA+IF9tYXhMaW5lV2lkdGhcclxuICAgICAgICAgICAgICAgJiYgIXRleHRVdGlscy5pc1VuaWNvZGVTcGFjZShjaGFyYWN0ZXIpXHJcbiAgICAgICAgICAgICAgICYmIF9tYXhMaW5lV2lkdGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRMZXR0ZXJYICs9IGxldHRlckRlZi54QWR2YW5jZSAqIF9ibWZvbnRTY2FsZSArIF9zcGFjaW5nWDtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3RlciA9PT0gXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgfHwgdGV4dFV0aWxzLmlzVW5pY29kZVNwYWNlKGNoYXJhY3RlcilcclxuICAgICAgICAgICAgICAgIHx8IHRleHRVdGlscy5pc1VuaWNvZGVDSksoY2hhcmFjdGVyKSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVuKys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbGVuO1xyXG4gICAgfVxyXG5cclxuICAgIF9tdWx0aWxpbmVUZXh0V3JhcEJ5V29yZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX211bHRpbGluZVRleHRXcmFwKHRoaXMuX2dldEZpcnN0V29yZExlbik7XHJcbiAgICB9XHJcblxyXG4gICAgX211bHRpbGluZVRleHRXcmFwQnlDaGFyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlsaW5lVGV4dFdyYXAodGhpcy5fZ2V0Rmlyc3RDaGFyTGVuKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVjb3JkUGxhY2Vob2xkZXJJbmZvIChsZXR0ZXJJbmRleCwgY2hhcikge1xyXG4gICAgICAgIGlmIChsZXR0ZXJJbmRleCA+PSBfbGV0dGVyc0luZm8ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCB0bXBJbmZvID0gbmV3IExldHRlckluZm8oKTtcclxuICAgICAgICAgICAgX2xldHRlcnNJbmZvLnB1c2godG1wSW5mbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmNoYXIgPSBjaGFyO1xyXG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0uaGFzaCA9IGNoYXIuY2hhckNvZGVBdCgwKSArIHNoYXJlTGFiZWxJbmZvLmhhc2g7XHJcbiAgICAgICAgX2xldHRlcnNJbmZvW2xldHRlckluZGV4XS52YWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZWNvcmRMZXR0ZXJJbmZvIChsZXR0ZXJQb3NpdGlvbiwgY2hhcmFjdGVyLCBsZXR0ZXJJbmRleCwgbGluZUluZGV4KSB7XHJcbiAgICAgICAgaWYgKGxldHRlckluZGV4ID49IF9sZXR0ZXJzSW5mby5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHRtcEluZm8gPSBuZXcgTGV0dGVySW5mbygpO1xyXG4gICAgICAgICAgICBfbGV0dGVyc0luZm8ucHVzaCh0bXBJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNoYXIgPSBjaGFyYWN0ZXIuY2hhckNvZGVBdCgwKTtcclxuICAgICAgICBsZXQga2V5ID0gY2hhciArIHNoYXJlTGFiZWxJbmZvLmhhc2g7XHJcblxyXG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0ubGluZT0gbGluZUluZGV4O1xyXG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0uY2hhciA9IGNoYXJhY3RlcjtcclxuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLmhhc2ggPSBrZXk7XHJcbiAgICAgICAgX2xldHRlcnNJbmZvW2xldHRlckluZGV4XS52YWxpZCA9IHNoYXJlTGFiZWxJbmZvLmZvbnRBdGxhcy5nZXRMZXR0ZXIoa2V5KS52YWxpZDtcclxuICAgICAgICBfbGV0dGVyc0luZm9bbGV0dGVySW5kZXhdLnggPSBsZXR0ZXJQb3NpdGlvbi54O1xyXG4gICAgICAgIF9sZXR0ZXJzSW5mb1tsZXR0ZXJJbmRleF0ueSA9IGxldHRlclBvc2l0aW9uLnk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FsaWduVGV4dCAoKSB7XHJcbiAgICAgICAgX3RleHREZXNpcmVkSGVpZ2h0ID0gMDtcclxuICAgICAgICBfbGluZXNXaWR0aC5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBpZiAoIV9saW5lQnJlYWtXaXRob3V0U3BhY2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211bHRpbGluZVRleHRXcmFwQnlXb3JkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbXVsdGlsaW5lVGV4dFdyYXBCeUNoYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbXB1dGVBbGlnbm1lbnRPZmZzZXQoKTtcclxuXHJcbiAgICAgICAgLy9zaHJpbmtcclxuICAgICAgICBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5TSFJJTkspIHtcclxuICAgICAgICAgICAgaWYgKF9mb250U2l6ZSA+IDAgJiYgdGhpcy5faXNWZXJ0aWNhbENsYW1wKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nocmlua0xhYmVsVG9Db250ZW50U2l6ZSh0aGlzLl9pc1ZlcnRpY2FsQ2xhbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3VwZGF0ZVF1YWRzKCkpIHtcclxuICAgICAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuU0hSSU5LKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaHJpbmtMYWJlbFRvQ29udGVudFNpemUodGhpcy5faXNIb3Jpem9udGFsQ2xhbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zY2FsZUZvbnRTaXplRG93biAoZm9udFNpemUpIHtcclxuICAgICAgICBsZXQgc2hvdWxkVXBkYXRlQ29udGVudCA9IHRydWU7XHJcbiAgICAgICAgaWYgKCFmb250U2l6ZSkge1xyXG4gICAgICAgICAgICBmb250U2l6ZSA9IDAuMTtcclxuICAgICAgICAgICAgc2hvdWxkVXBkYXRlQ29udGVudCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfZm9udFNpemUgPSBmb250U2l6ZTtcclxuXHJcbiAgICAgICAgaWYgKHNob3VsZFVwZGF0ZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hyaW5rTGFiZWxUb0NvbnRlbnRTaXplIChsYW1iZGEpIHtcclxuICAgICAgICBsZXQgZm9udFNpemUgPSBfZm9udFNpemU7XHJcblxyXG4gICAgICAgIGxldCBsZWZ0ID0gMCwgcmlnaHQgPSBmb250U2l6ZSB8IDAsIG1pZCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGxlZnQgPCByaWdodCkge1xyXG4gICAgICAgICAgICBtaWQgPSAobGVmdCArIHJpZ2h0ICsgMSkgPj4gMTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdGb250U2l6ZSA9IG1pZDtcclxuICAgICAgICAgICAgaWYgKG5ld0ZvbnRTaXplIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYm1mb250U2NhbGUgPSBuZXdGb250U2l6ZSAvIF9vcmlnaW5Gb250U2l6ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghX2xpbmVCcmVha1dpdGhvdXRTcGFjZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX211bHRpbGluZVRleHRXcmFwQnlXb3JkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aWxpbmVUZXh0V3JhcEJ5Q2hhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXB1dGVBbGlnbm1lbnRPZmZzZXQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsYW1iZGEoKSkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHQgPSBtaWQgLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IG1pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjdHVhbEZvbnRTaXplID0gbGVmdDtcclxuICAgICAgICBpZiAoYWN0dWFsRm9udFNpemUgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FsZUZvbnRTaXplRG93bihhY3R1YWxGb250U2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9pc1ZlcnRpY2FsQ2xhbXAgKCkge1xyXG4gICAgICAgIGlmIChfdGV4dERlc2lyZWRIZWlnaHQgPiBfY29udGVudFNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2lzSG9yaXpvbnRhbENsYW1wICgpIHtcclxuICAgICAgICBsZXQgbGV0dGVyQ2xhbXAgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBjdHIgPSAwLCBsID0gX3N0cmluZy5sZW5ndGg7IGN0ciA8IGw7ICsrY3RyKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXR0ZXJJbmZvID0gX2xldHRlcnNJbmZvW2N0cl07XHJcbiAgICAgICAgICAgIGlmIChsZXR0ZXJJbmZvLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV0dGVyRGVmID0gc2hhcmVMYWJlbEluZm8uZm9udEF0bGFzLmdldExldHRlcihsZXR0ZXJJbmZvLmhhc2gpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBweCA9IGxldHRlckluZm8ueCArIGxldHRlckRlZi53ICogX2JtZm9udFNjYWxlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVJbmRleCA9IGxldHRlckluZm8ubGluZTtcclxuICAgICAgICAgICAgICAgIGlmIChfbGFiZWxXaWR0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV9pc1dyYXBUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHB4ID4gX2NvbnRlbnRTaXplLndpZHRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldHRlckNsYW1wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3b3JkV2lkdGggPSBfbGluZXNXaWR0aFtsaW5lSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZFdpZHRoID4gX2NvbnRlbnRTaXplLndpZHRoICYmIChweCA+IF9jb250ZW50U2l6ZS53aWR0aCB8fCBweCA8IDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXJDbGFtcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxldHRlckNsYW1wO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc0hvcml6b250YWxDbGFtcGVkIChweCwgbGluZUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHdvcmRXaWR0aCA9IF9saW5lc1dpZHRoW2xpbmVJbmRleF07XHJcbiAgICAgICAgbGV0IGxldHRlck92ZXJDbGFtcCA9IChweCA+IF9jb250ZW50U2l6ZS53aWR0aCB8fCBweCA8IDApO1xyXG5cclxuICAgICAgICBpZighX2lzV3JhcFRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gbGV0dGVyT3ZlckNsYW1wO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gKHdvcmRXaWR0aCA+IF9jb250ZW50U2l6ZS53aWR0aCAmJiBsZXR0ZXJPdmVyQ2xhbXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlUXVhZHMgKCkge1xyXG4gICAgICAgIGxldCB0ZXh0dXJlID0gX3Nwcml0ZUZyYW1lID8gX3Nwcml0ZUZyYW1lLl90ZXh0dXJlIDogc2hhcmVMYWJlbEluZm8uZm9udEF0bGFzLmdldFRleHR1cmUoKTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBfY29tcC5ub2RlO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzQ291bnQgPSB0aGlzLmluZGljZXNDb3VudCA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTmVlZCB0byByZXNldCBkYXRhTGVuZ3RoIGluIENhbnZhcyByZW5kZXJpbmcgbW9kZS5cclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhICYmICh0aGlzLl9yZW5kZXJEYXRhLmRhdGFMZW5ndGggPSAwKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gX2NvbnRlbnRTaXplLFxyXG4gICAgICAgICAgICBhcHB4ID0gbm9kZS5fYW5jaG9yUG9pbnQueCAqIGNvbnRlbnRTaXplLndpZHRoLFxyXG4gICAgICAgICAgICBhcHB5ID0gbm9kZS5fYW5jaG9yUG9pbnQueSAqIGNvbnRlbnRTaXplLmhlaWdodDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmV0ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKGxldCBjdHIgPSAwLCBsID0gX3N0cmluZy5sZW5ndGg7IGN0ciA8IGw7ICsrY3RyKSB7XHJcbiAgICAgICAgICAgIGxldCBsZXR0ZXJJbmZvID0gX2xldHRlcnNJbmZvW2N0cl07XHJcbiAgICAgICAgICAgIGlmICghbGV0dGVySW5mby52YWxpZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCBsZXR0ZXJEZWYgPSBzaGFyZUxhYmVsSW5mby5mb250QXRsYXMuZ2V0TGV0dGVyKGxldHRlckluZm8uaGFzaCk7XHJcblxyXG4gICAgICAgICAgICBfdG1wUmVjdC5oZWlnaHQgPSBsZXR0ZXJEZWYuaDtcclxuICAgICAgICAgICAgX3RtcFJlY3Qud2lkdGggPSBsZXR0ZXJEZWYudztcclxuICAgICAgICAgICAgX3RtcFJlY3QueCA9IGxldHRlckRlZi51O1xyXG4gICAgICAgICAgICBfdG1wUmVjdC55ID0gbGV0dGVyRGVmLnY7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHkgPSBsZXR0ZXJJbmZvLnkgKyBfbGV0dGVyT2Zmc2V0WTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfbGFiZWxIZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHkgPiBfdGFpbG9yZWRUb3BZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsaXBUb3AgPSBweSAtIF90YWlsb3JlZFRvcFk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RtcFJlY3QueSArPSBjbGlwVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIF90bXBSZWN0LmhlaWdodCAtPSBjbGlwVG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIHB5ID0gcHkgLSBjbGlwVG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgocHkgLSBsZXR0ZXJEZWYuaCAqIF9ibWZvbnRTY2FsZSA8IF90YWlsb3JlZEJvdHRvbVkpICYmIF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuQ0xBTVApIHtcclxuICAgICAgICAgICAgICAgICAgICBfdG1wUmVjdC5oZWlnaHQgPSAocHkgPCBfdGFpbG9yZWRCb3R0b21ZKSA/IDAgOiAocHkgLSBfdGFpbG9yZWRCb3R0b21ZKSAvIF9ibWZvbnRTY2FsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGxpbmVJbmRleCA9IGxldHRlckluZm8ubGluZTtcclxuICAgICAgICAgICAgbGV0IHB4ID0gbGV0dGVySW5mby54ICsgbGV0dGVyRGVmLncgLyAyICogX2JtZm9udFNjYWxlICsgX2xpbmVzT2Zmc2V0WFtsaW5lSW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9sYWJlbFdpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzSG9yaXpvbnRhbENsYW1wZWQocHgsIGxpbmVJbmRleCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5DTEFNUCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG1wUmVjdC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfb3ZlcmZsb3cgPT09IE92ZXJmbG93LlNIUklOSykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2NvbnRlbnRTaXplLndpZHRoID4gbGV0dGVyRGVmLncpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdG1wUmVjdC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChfdG1wUmVjdC5oZWlnaHQgPiAwICYmIF90bXBSZWN0LndpZHRoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzUm90YXRlZCA9IHRoaXMuX2RldGVybWluZVJlY3QoX3RtcFJlY3QpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldHRlclBvc2l0aW9uWCA9IGxldHRlckluZm8ueCArIF9saW5lc09mZnNldFhbbGV0dGVySW5mby5saW5lXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kUXVhZChfY29tcCwgdGV4dHVyZSwgX3RtcFJlY3QsIGlzUm90YXRlZCwgbGV0dGVyUG9zaXRpb25YIC0gYXBweCwgcHkgLSBhcHB5LCBfYm1mb250U2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3F1YWRzVXBkYXRlZChfY29tcCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2RldGVybWluZVJlY3QgKHRlbXBSZWN0KSB7XHJcbiAgICAgICAgbGV0IGlzUm90YXRlZCA9IF9zcHJpdGVGcmFtZS5pc1JvdGF0ZWQoKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbmFsU2l6ZSA9IF9zcHJpdGVGcmFtZS5fb3JpZ2luYWxTaXplO1xyXG4gICAgICAgIGxldCByZWN0ID0gX3Nwcml0ZUZyYW1lLl9yZWN0O1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSBfc3ByaXRlRnJhbWUuX29mZnNldDtcclxuICAgICAgICBsZXQgdHJpbW1lZExlZnQgPSBvZmZzZXQueCArIChvcmlnaW5hbFNpemUud2lkdGggLSByZWN0LndpZHRoKSAvIDI7XHJcbiAgICAgICAgbGV0IHRyaW1tZWRUb3AgPSBvZmZzZXQueSAtIChvcmlnaW5hbFNpemUuaGVpZ2h0IC0gcmVjdC5oZWlnaHQpIC8gMjtcclxuXHJcbiAgICAgICAgaWYoIWlzUm90YXRlZCkge1xyXG4gICAgICAgICAgICB0ZW1wUmVjdC54ICs9IChyZWN0LnggLSB0cmltbWVkTGVmdCk7XHJcbiAgICAgICAgICAgIHRlbXBSZWN0LnkgKz0gKHJlY3QueSArIHRyaW1tZWRUb3ApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbFggPSB0ZW1wUmVjdC54O1xyXG4gICAgICAgICAgICB0ZW1wUmVjdC54ID0gcmVjdC54ICsgcmVjdC5oZWlnaHQgLSB0ZW1wUmVjdC55IC0gdGVtcFJlY3QuaGVpZ2h0IC0gdHJpbW1lZFRvcDtcclxuICAgICAgICAgICAgdGVtcFJlY3QueSA9IG9yaWdpbmFsWCArIHJlY3QueSAtIHRyaW1tZWRMZWZ0O1xyXG4gICAgICAgICAgICBpZiAodGVtcFJlY3QueSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRlbXBSZWN0LmhlaWdodCA9IHRlbXBSZWN0LmhlaWdodCArIHRyaW1tZWRUb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpc1JvdGF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2NvbXB1dGVBbGlnbm1lbnRPZmZzZXQgKCkge1xyXG4gICAgICAgIF9saW5lc09mZnNldFgubGVuZ3RoID0gMDtcclxuICAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKF9oQWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBtYWNyby5UZXh0QWxpZ25tZW50LkxFRlQ6XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9udW1iZXJPZkxpbmVzOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBfbGluZXNPZmZzZXRYLnB1c2goMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBtYWNyby5UZXh0QWxpZ25tZW50LkNFTlRFUjpcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gX2xpbmVzV2lkdGgubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVzT2Zmc2V0WC5wdXNoKChfY29udGVudFNpemUud2lkdGggLSBfbGluZXNXaWR0aFtpXSkgLyAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG1hY3JvLlRleHRBbGlnbm1lbnQuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IF9saW5lc1dpZHRoLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lc09mZnNldFgucHVzaChfY29udGVudFNpemUud2lkdGggLSBfbGluZXNXaWR0aFtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9QXHJcbiAgICAgICAgX2xldHRlck9mZnNldFkgPSBfY29udGVudFNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGlmIChfdkFsaWduICE9PSBtYWNyby5WZXJ0aWNhbFRleHRBbGlnbm1lbnQuVE9QKSB7XHJcbiAgICAgICAgICAgIGxldCBibGFuayA9IF9jb250ZW50U2l6ZS5oZWlnaHQgLSBfdGV4dERlc2lyZWRIZWlnaHQgKyBfbGluZUhlaWdodCAqIHRoaXMuX2dldEZvbnRTY2FsZSgpIC0gX29yaWdpbkZvbnRTaXplICogX2JtZm9udFNjYWxlO1xyXG4gICAgICAgICAgICBpZiAoX3ZBbGlnbiA9PT0gbWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50LkJPVFRPTSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQk9UVE9NXHJcbiAgICAgICAgICAgICAgICBfbGV0dGVyT2Zmc2V0WSAtPSBibGFuaztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIENFTlRFUjpcclxuICAgICAgICAgICAgICAgIF9sZXR0ZXJPZmZzZXRZIC09IGJsYW5rIC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBCTUZvbnRPdmVyZmxvd01ldHJpY3MgKCkge1xyXG4gICAgICAgIGxldCBuZXdXaWR0aCA9IF9jb250ZW50U2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gX2NvbnRlbnRTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVCkge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuTk9ORSkge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfbGFiZWxXaWR0aCA9IG5ld1dpZHRoO1xyXG4gICAgICAgIF9sYWJlbEhlaWdodCA9IG5ld0hlaWdodDtcclxuICAgICAgICBfbWF4TGluZVdpZHRoID0gbmV3V2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV29ybGRWZXJ0cygpIHt9XHJcblxyXG4gICAgYXBwZW5kUXVhZCAoY29tcCwgdGV4dHVyZSwgcmVjdCwgcm90YXRlZCwgeCwgeSwgc2NhbGUpIHt9XHJcbiAgICBfcXVhZHNVcGRhdGVkIChjb21wKSB7fVxyXG5cclxuICAgIF9yZXNlcnZlUXVhZHMgKCkge31cclxufSJdLCJzb3VyY2VSb290IjoiLyJ9