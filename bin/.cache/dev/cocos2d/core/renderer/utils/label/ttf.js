
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/ttf.js';
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

var LabelOutline = require('../../../components/CCLabelOutline');

var LabelShadow = require('../../../components/CCLabelShadow');

var Overflow = Label.Overflow;

var deleteFromDynamicAtlas = require('../utils').deleteFromDynamicAtlas;

var getFontFamily = require('../utils').getFontFamily;

var MAX_SIZE = 2048;

var _invisibleAlpha = (1 / 255).toFixed(3);

var _context = null;
var _canvas = null;
var _texture = null;
var _fontDesc = '';
var _string = '';
var _fontSize = 0;
var _drawFontSize = 0;
var _splitedStrings = [];
var _canvasSize = cc.Size.ZERO;
var _lineHeight = 0;
var _hAlign = 0;
var _vAlign = 0;
var _color = null;
var _fontFamily = '';
var _overflow = Overflow.NONE;
var _isWrapText = false;
var _premultiply = false; // outline

var _outlineComp = null;
var _outlineColor = cc.Color.WHITE; // shadow

var _shadowComp = null;
var _shadowColor = cc.Color.BLACK;

var _canvasPadding = cc.rect();

var _contentSizeExtend = cc.Size.ZERO;
var _nodeContentSize = cc.Size.ZERO;
var _enableBold = false;
var _enableItalic = false;
var _enableUnderline = false;
var _underlineThickness = 0;
var _drawUnderlinePos = cc.Vec2.ZERO;
var _drawUnderlineWidth = 0;

var _sharedLabelData;

var Alignment = ['left', // macro.TextAlignment.LEFT
'center', // macro.TextAlignment.CENTER
'right' // macro.TextAlignment.RIGHT
];

var TTFAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(TTFAssembler, _Assembler2D);

  function TTFAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = TTFAssembler.prototype;

  _proto._getAssemblerData = function _getAssemblerData() {
    _sharedLabelData = Label._canvasPool.get();
    _sharedLabelData.canvas.width = _sharedLabelData.canvas.height = 1;
    return _sharedLabelData;
  };

  _proto._resetAssemblerData = function _resetAssemblerData(assemblerData) {
    if (assemblerData) {
      Label._canvasPool.put(assemblerData);
    }
  };

  _proto.updateRenderData = function updateRenderData(comp) {
    _Assembler2D.prototype.updateRenderData.call(this, comp);

    if (!comp._vertsDirty) return;

    this._updateProperties(comp);

    this._calculateLabelFont();

    this._updateLabelDimensions();

    this._updateTexture(comp);

    this._calDynamicAtlas(comp);

    comp._actualFontSize = _fontSize;
    comp.node.setContentSize(_nodeContentSize);
    this.updateVerts(comp);
    comp._vertsDirty = false;
    _context = null;
    _canvas = null;
    _texture = null;
  };

  _proto.updateVerts = function updateVerts() {};

  _proto._updatePaddingRect = function _updatePaddingRect() {
    var top = 0,
        bottom = 0,
        left = 0,
        right = 0;
    var outlineWidth = 0;
    _contentSizeExtend.width = _contentSizeExtend.height = 0;

    if (_outlineComp) {
      outlineWidth = _outlineComp.width;
      top = bottom = left = right = outlineWidth;
      _contentSizeExtend.width = _contentSizeExtend.height = outlineWidth * 2;
    }

    if (_shadowComp) {
      var shadowWidth = _shadowComp.blur + outlineWidth;
      left = Math.max(left, -_shadowComp._offset.x + shadowWidth);
      right = Math.max(right, _shadowComp._offset.x + shadowWidth);
      top = Math.max(top, _shadowComp._offset.y + shadowWidth);
      bottom = Math.max(bottom, -_shadowComp._offset.y + shadowWidth);
    }

    if (_enableItalic) {
      //0.0174532925 = 3.141592653 / 180
      var offset = _drawFontSize * Math.tan(12 * 0.0174532925);

      right += offset;
      _contentSizeExtend.width += offset;
    }

    _canvasPadding.x = left;
    _canvasPadding.y = top;
    _canvasPadding.width = left + right;
    _canvasPadding.height = top + bottom;
  };

  _proto._updateProperties = function _updateProperties(comp) {
    var assemblerData = comp._assemblerData;
    _context = assemblerData.context;
    _canvas = assemblerData.canvas;
    _texture = comp._frame._original ? comp._frame._original._texture : comp._frame._texture;
    _string = comp.string.toString();
    _fontSize = comp._fontSize;
    _drawFontSize = _fontSize;
    _underlineThickness = comp.underlineHeight || _drawFontSize / 8;
    _overflow = comp.overflow;
    _canvasSize.width = comp.node.width;
    _canvasSize.height = comp.node.height;
    _nodeContentSize = comp.node.getContentSize();
    _lineHeight = comp._lineHeight;
    _hAlign = comp.horizontalAlign;
    _vAlign = comp.verticalAlign;
    _color = comp.node.color;
    _enableBold = comp.enableBold;
    _enableItalic = comp.enableItalic;
    _enableUnderline = comp.enableUnderline;
    _fontFamily = getFontFamily(comp);
    _premultiply = comp.srcBlendFactor === cc.macro.BlendFactor.ONE;

    if (CC_NATIVERENDERER) {
      _context._setPremultiply(_premultiply);
    }

    if (_overflow === Overflow.NONE) {
      _isWrapText = false;
    } else if (_overflow === Overflow.RESIZE_HEIGHT) {
      _isWrapText = true;
    } else {
      _isWrapText = comp.enableWrapText;
    } // outline


    _outlineComp = LabelOutline && comp.getComponent(LabelOutline);
    _outlineComp = _outlineComp && _outlineComp.enabled && _outlineComp.width > 0 ? _outlineComp : null;

    if (_outlineComp) {
      _outlineColor.set(_outlineComp.color);
    } // shadow


    _shadowComp = LabelShadow && comp.getComponent(LabelShadow);
    _shadowComp = _shadowComp && _shadowComp.enabled ? _shadowComp : null;

    if (_shadowComp) {
      _shadowColor.set(_shadowComp.color); // TODO: temporary solution, cascade opacity for outline color


      _shadowColor.a = _shadowColor.a * comp.node.color.a / 255.0;
    }

    this._updatePaddingRect();
  };

  _proto._calculateFillTextStartPosition = function _calculateFillTextStartPosition() {
    var labelX = 0;

    if (_hAlign === macro.TextAlignment.RIGHT) {
      labelX = _canvasSize.width - _canvasPadding.width;
    } else if (_hAlign === macro.TextAlignment.CENTER) {
      labelX = (_canvasSize.width - _canvasPadding.width) / 2;
    }

    var lineHeight = this._getLineHeight();

    var drawStartY = lineHeight * (_splitedStrings.length - 1); // TOP

    var firstLinelabelY = _fontSize * (1 - textUtils.BASELINE_RATIO / 2);

    if (_vAlign !== macro.VerticalTextAlignment.TOP) {
      // free space in vertical direction
      var blank = drawStartY + _canvasPadding.height + _fontSize - _canvasSize.height;

      if (_vAlign === macro.VerticalTextAlignment.BOTTOM) {
        // Unlike BMFont, needs to reserve space below.
        blank += textUtils.BASELINE_RATIO / 2 * _fontSize; // BOTTOM

        firstLinelabelY -= blank;
      } else {
        // CENTER
        firstLinelabelY -= blank / 2;
      }
    }

    firstLinelabelY += textUtils.BASELINE_OFFSET * _fontSize;
    return cc.v2(labelX + _canvasPadding.x, firstLinelabelY + _canvasPadding.y);
  };

  _proto._setupOutline = function _setupOutline() {
    _context.strokeStyle = "rgba(" + _outlineColor.r + ", " + _outlineColor.g + ", " + _outlineColor.b + ", " + _outlineColor.a / 255 + ")";
    _context.lineWidth = _outlineComp.width * 2;
  };

  _proto._setupShadow = function _setupShadow() {
    _context.shadowColor = "rgba(" + _shadowColor.r + ", " + _shadowColor.g + ", " + _shadowColor.b + ", " + _shadowColor.a / 255 + ")";
    _context.shadowBlur = _shadowComp.blur;
    _context.shadowOffsetX = _shadowComp.offset.x;
    _context.shadowOffsetY = -_shadowComp.offset.y;
  };

  _proto._drawTextEffect = function _drawTextEffect(startPosition, lineHeight) {
    if (!_shadowComp && !_outlineComp && !_enableUnderline) return;
    var isMultiple = _splitedStrings.length > 1 && _shadowComp;

    var measureText = this._measureText(_context, _fontDesc);

    var drawTextPosX = 0,
        drawTextPosY = 0; // only one set shadow and outline

    if (_shadowComp) {
      this._setupShadow();
    }

    if (_outlineComp) {
      this._setupOutline();
    } // draw shadow and (outline or text)


    for (var i = 0; i < _splitedStrings.length; ++i) {
      drawTextPosX = startPosition.x;
      drawTextPosY = startPosition.y + i * lineHeight; // multiple lines need to be drawn outline and fill text

      if (isMultiple) {
        if (_outlineComp) {
          _context.strokeText(_splitedStrings[i], drawTextPosX, drawTextPosY);
        }

        _context.fillText(_splitedStrings[i], drawTextPosX, drawTextPosY);
      } // draw underline


      if (_enableUnderline) {
        _drawUnderlineWidth = measureText(_splitedStrings[i]);

        if (_hAlign === macro.TextAlignment.RIGHT) {
          _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth;
        } else if (_hAlign === macro.TextAlignment.CENTER) {
          _drawUnderlinePos.x = startPosition.x - _drawUnderlineWidth / 2;
        } else {
          _drawUnderlinePos.x = startPosition.x;
        }

        _drawUnderlinePos.y = drawTextPosY + _drawFontSize / 8;

        _context.fillRect(_drawUnderlinePos.x, _drawUnderlinePos.y, _drawUnderlineWidth, _underlineThickness);
      }
    }

    if (isMultiple) {
      _context.shadowColor = 'transparent';
    }
  };

  _proto._updateTexture = function _updateTexture() {
    _context.clearRect(0, 0, _canvas.width, _canvas.height); // use round for line join to avoid sharp intersect point


    _context.lineJoin = 'round'; //Add a white background to avoid black edges.

    if (!_premultiply) {
      //TODO: it is best to add alphaTest to filter out the background color.
      var _fillColor = _outlineComp ? _outlineColor : _color;

      _context.fillStyle = "rgba(" + _fillColor.r + ", " + _fillColor.g + ", " + _fillColor.b + ", " + _invisibleAlpha + ")";

      _context.fillRect(0, 0, _canvas.width, _canvas.height);

      _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", 1)";
    } else {
      _context.fillStyle = "rgba(" + _color.r + ", " + _color.g + ", " + _color.b + ", " + _color.a / 255.0 + ")";
    }

    var startPosition = this._calculateFillTextStartPosition();

    var lineHeight = this._getLineHeight();

    var drawTextPosX = startPosition.x,
        drawTextPosY = 0; // draw shadow and underline

    this._drawTextEffect(startPosition, lineHeight); // draw text and outline


    for (var i = 0; i < _splitedStrings.length; ++i) {
      drawTextPosY = startPosition.y + i * lineHeight;

      if (_outlineComp) {
        _context.strokeText(_splitedStrings[i], drawTextPosX, drawTextPosY);
      }

      _context.fillText(_splitedStrings[i], drawTextPosX, drawTextPosY);
    }

    if (_shadowComp) {
      _context.shadowColor = 'transparent';
    }

    _texture.handleLoadedTexture();
  };

  _proto._calDynamicAtlas = function _calDynamicAtlas(comp) {
    if (comp.cacheMode !== Label.CacheMode.BITMAP) return;
    var frame = comp._frame; // Delete cache in atlas.

    deleteFromDynamicAtlas(comp, frame);

    if (!frame._original) {
      frame.setRect(cc.rect(0, 0, _canvas.width, _canvas.height));
    }

    this.packToDynamicAtlas(comp, frame);
  };

  _proto._updateLabelDimensions = function _updateLabelDimensions() {
    _canvasSize.width = Math.min(_canvasSize.width, MAX_SIZE);
    _canvasSize.height = Math.min(_canvasSize.height, MAX_SIZE);
    var recreate = false;

    if (_canvas.width !== _canvasSize.width) {
      _canvas.width = _canvasSize.width;
      recreate = true;
    }

    if (_canvas.height !== _canvasSize.height) {
      _canvas.height = _canvasSize.height;
      recreate = true;
    }

    recreate && (_context.font = _fontDesc); // align

    _context.textAlign = Alignment[_hAlign];
  };

  _proto._getFontDesc = function _getFontDesc() {
    var fontDesc = _fontSize.toString() + 'px ';
    fontDesc = fontDesc + _fontFamily;

    if (_enableBold) {
      fontDesc = "bold " + fontDesc;
    }

    if (_enableItalic) {
      fontDesc = "italic " + fontDesc;
    }

    return fontDesc;
  };

  _proto._getLineHeight = function _getLineHeight() {
    var nodeSpacingY = _lineHeight;

    if (nodeSpacingY === 0) {
      nodeSpacingY = _fontSize;
    } else {
      nodeSpacingY = nodeSpacingY * _fontSize / _drawFontSize;
    }

    return nodeSpacingY | 0;
  };

  _proto._calculateParagraphLength = function _calculateParagraphLength(paragraphedStrings, ctx) {
    var paragraphLength = [];

    for (var i = 0; i < paragraphedStrings.length; ++i) {
      var width = textUtils.safeMeasureText(ctx, paragraphedStrings[i], _fontDesc);
      paragraphLength.push(width);
    }

    return paragraphLength;
  };

  _proto._measureText = function _measureText(ctx, fontDesc) {
    return function (string) {
      return textUtils.safeMeasureText(ctx, string, fontDesc);
    };
  };

  _proto._calculateShrinkFont = function _calculateShrinkFont(paragraphedStrings) {
    var paragraphLength = this._calculateParagraphLength(paragraphedStrings, _context);

    var i = 0;
    var totalHeight = 0;
    var maxLength = 0;

    if (_isWrapText) {
      var canvasWidthNoMargin = _nodeContentSize.width;
      var canvasHeightNoMargin = _nodeContentSize.height;

      if (canvasWidthNoMargin < 0 || canvasHeightNoMargin < 0) {
        return;
      }

      totalHeight = canvasHeightNoMargin + 1;
      var actualFontSize = _fontSize + 1;
      var textFragment = ""; //let startShrinkFontSize = actualFontSize | 0;

      var left = 0,
          right = actualFontSize | 0,
          mid = 0;

      while (left < right) {
        mid = left + right + 1 >> 1;

        if (mid <= 0) {
          cc.logID(4003);
          break;
        }

        _fontSize = mid;
        _fontDesc = this._getFontDesc();
        _context.font = _fontDesc;

        var lineHeight = this._getLineHeight();

        totalHeight = 0;

        for (i = 0; i < paragraphedStrings.length; ++i) {
          var allWidth = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
          textFragment = textUtils.fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
          totalHeight += textFragment.length * lineHeight;
        }

        if (totalHeight > canvasHeightNoMargin) {
          right = mid - 1;
        } else {
          left = mid;
        }
      }

      if (left === 0) {
        cc.logID(4003);
      } else {
        _fontSize = left;
        _fontDesc = this._getFontDesc();
        _context.font = _fontDesc;
      }
    } else {
      totalHeight = paragraphedStrings.length * this._getLineHeight();

      for (i = 0; i < paragraphedStrings.length; ++i) {
        if (maxLength < paragraphLength[i]) {
          maxLength = paragraphLength[i];
        }
      }

      var scaleX = (_canvasSize.width - _canvasPadding.width) / maxLength;
      var scaleY = _canvasSize.height / totalHeight;
      _fontSize = _drawFontSize * Math.min(1, scaleX, scaleY) | 0;
      _fontDesc = this._getFontDesc();
      _context.font = _fontDesc;
    }
  };

  _proto._calculateWrapText = function _calculateWrapText(paragraphedStrings) {
    if (!_isWrapText) return;
    _splitedStrings = [];
    var canvasWidthNoMargin = _nodeContentSize.width;

    for (var i = 0; i < paragraphedStrings.length; ++i) {
      var allWidth = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
      var textFragment = textUtils.fragmentText(paragraphedStrings[i], allWidth, canvasWidthNoMargin, this._measureText(_context, _fontDesc));
      _splitedStrings = _splitedStrings.concat(textFragment);
    }
  };

  _proto._calculateLabelFont = function _calculateLabelFont() {
    var paragraphedStrings = _string.split('\n');

    _splitedStrings = paragraphedStrings;
    _fontDesc = this._getFontDesc();
    _context.font = _fontDesc;

    switch (_overflow) {
      case Overflow.NONE:
        {
          var canvasSizeX = 0;
          var canvasSizeY = 0;

          for (var i = 0; i < paragraphedStrings.length; ++i) {
            var paraLength = textUtils.safeMeasureText(_context, paragraphedStrings[i], _fontDesc);
            canvasSizeX = canvasSizeX > paraLength ? canvasSizeX : paraLength;
          }

          canvasSizeY = (_splitedStrings.length + textUtils.BASELINE_RATIO) * this._getLineHeight();
          var rawWidth = parseFloat(canvasSizeX.toFixed(2));
          var rawHeight = parseFloat(canvasSizeY.toFixed(2));
          _canvasSize.width = rawWidth + _canvasPadding.width;
          _canvasSize.height = rawHeight + _canvasPadding.height;
          _nodeContentSize.width = rawWidth + _contentSizeExtend.width;
          _nodeContentSize.height = rawHeight + _contentSizeExtend.height;
          break;
        }

      case Overflow.SHRINK:
        {
          this._calculateShrinkFont(paragraphedStrings);

          this._calculateWrapText(paragraphedStrings);

          break;
        }

      case Overflow.CLAMP:
        {
          this._calculateWrapText(paragraphedStrings);

          break;
        }

      case Overflow.RESIZE_HEIGHT:
        {
          this._calculateWrapText(paragraphedStrings);

          var _rawHeight = (_splitedStrings.length + textUtils.BASELINE_RATIO) * this._getLineHeight();

          _canvasSize.height = _rawHeight + _canvasPadding.height; // set node height

          _nodeContentSize.height = _rawHeight + _contentSizeExtend.height;
          break;
        }
    }
  };

  return TTFAssembler;
}(_assembler2d["default"]);

exports["default"] = TTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx1dGlsc1xcbGFiZWxcXHR0Zi5qcyJdLCJuYW1lcyI6WyJ0ZXh0VXRpbHMiLCJyZXF1aXJlIiwibWFjcm8iLCJMYWJlbCIsIkxhYmVsT3V0bGluZSIsIkxhYmVsU2hhZG93IiwiT3ZlcmZsb3ciLCJkZWxldGVGcm9tRHluYW1pY0F0bGFzIiwiZ2V0Rm9udEZhbWlseSIsIk1BWF9TSVpFIiwiX2ludmlzaWJsZUFscGhhIiwidG9GaXhlZCIsIl9jb250ZXh0IiwiX2NhbnZhcyIsIl90ZXh0dXJlIiwiX2ZvbnREZXNjIiwiX3N0cmluZyIsIl9mb250U2l6ZSIsIl9kcmF3Rm9udFNpemUiLCJfc3BsaXRlZFN0cmluZ3MiLCJfY2FudmFzU2l6ZSIsImNjIiwiU2l6ZSIsIlpFUk8iLCJfbGluZUhlaWdodCIsIl9oQWxpZ24iLCJfdkFsaWduIiwiX2NvbG9yIiwiX2ZvbnRGYW1pbHkiLCJfb3ZlcmZsb3ciLCJOT05FIiwiX2lzV3JhcFRleHQiLCJfcHJlbXVsdGlwbHkiLCJfb3V0bGluZUNvbXAiLCJfb3V0bGluZUNvbG9yIiwiQ29sb3IiLCJXSElURSIsIl9zaGFkb3dDb21wIiwiX3NoYWRvd0NvbG9yIiwiQkxBQ0siLCJfY2FudmFzUGFkZGluZyIsInJlY3QiLCJfY29udGVudFNpemVFeHRlbmQiLCJfbm9kZUNvbnRlbnRTaXplIiwiX2VuYWJsZUJvbGQiLCJfZW5hYmxlSXRhbGljIiwiX2VuYWJsZVVuZGVybGluZSIsIl91bmRlcmxpbmVUaGlja25lc3MiLCJfZHJhd1VuZGVybGluZVBvcyIsIlZlYzIiLCJfZHJhd1VuZGVybGluZVdpZHRoIiwiX3NoYXJlZExhYmVsRGF0YSIsIkFsaWdubWVudCIsIlRURkFzc2VtYmxlciIsIl9nZXRBc3NlbWJsZXJEYXRhIiwiX2NhbnZhc1Bvb2wiLCJnZXQiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsIl9yZXNldEFzc2VtYmxlckRhdGEiLCJhc3NlbWJsZXJEYXRhIiwicHV0IiwidXBkYXRlUmVuZGVyRGF0YSIsImNvbXAiLCJfdmVydHNEaXJ0eSIsIl91cGRhdGVQcm9wZXJ0aWVzIiwiX2NhbGN1bGF0ZUxhYmVsRm9udCIsIl91cGRhdGVMYWJlbERpbWVuc2lvbnMiLCJfdXBkYXRlVGV4dHVyZSIsIl9jYWxEeW5hbWljQXRsYXMiLCJfYWN0dWFsRm9udFNpemUiLCJub2RlIiwic2V0Q29udGVudFNpemUiLCJ1cGRhdGVWZXJ0cyIsIl91cGRhdGVQYWRkaW5nUmVjdCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIm91dGxpbmVXaWR0aCIsInNoYWRvd1dpZHRoIiwiYmx1ciIsIk1hdGgiLCJtYXgiLCJfb2Zmc2V0IiwieCIsInkiLCJvZmZzZXQiLCJ0YW4iLCJfYXNzZW1ibGVyRGF0YSIsImNvbnRleHQiLCJfZnJhbWUiLCJfb3JpZ2luYWwiLCJzdHJpbmciLCJ0b1N0cmluZyIsInVuZGVybGluZUhlaWdodCIsIm92ZXJmbG93IiwiZ2V0Q29udGVudFNpemUiLCJob3Jpem9udGFsQWxpZ24iLCJ2ZXJ0aWNhbEFsaWduIiwiY29sb3IiLCJlbmFibGVCb2xkIiwiZW5hYmxlSXRhbGljIiwiZW5hYmxlVW5kZXJsaW5lIiwic3JjQmxlbmRGYWN0b3IiLCJCbGVuZEZhY3RvciIsIk9ORSIsIkNDX05BVElWRVJFTkRFUkVSIiwiX3NldFByZW11bHRpcGx5IiwiUkVTSVpFX0hFSUdIVCIsImVuYWJsZVdyYXBUZXh0IiwiZ2V0Q29tcG9uZW50IiwiZW5hYmxlZCIsInNldCIsImEiLCJfY2FsY3VsYXRlRmlsbFRleHRTdGFydFBvc2l0aW9uIiwibGFiZWxYIiwiVGV4dEFsaWdubWVudCIsIlJJR0hUIiwiQ0VOVEVSIiwibGluZUhlaWdodCIsIl9nZXRMaW5lSGVpZ2h0IiwiZHJhd1N0YXJ0WSIsImxlbmd0aCIsImZpcnN0TGluZWxhYmVsWSIsIkJBU0VMSU5FX1JBVElPIiwiVmVydGljYWxUZXh0QWxpZ25tZW50IiwiVE9QIiwiYmxhbmsiLCJCT1RUT00iLCJCQVNFTElORV9PRkZTRVQiLCJ2MiIsIl9zZXR1cE91dGxpbmUiLCJzdHJva2VTdHlsZSIsInIiLCJnIiwiYiIsImxpbmVXaWR0aCIsIl9zZXR1cFNoYWRvdyIsInNoYWRvd0NvbG9yIiwic2hhZG93Qmx1ciIsInNoYWRvd09mZnNldFgiLCJzaGFkb3dPZmZzZXRZIiwiX2RyYXdUZXh0RWZmZWN0Iiwic3RhcnRQb3NpdGlvbiIsImlzTXVsdGlwbGUiLCJtZWFzdXJlVGV4dCIsIl9tZWFzdXJlVGV4dCIsImRyYXdUZXh0UG9zWCIsImRyYXdUZXh0UG9zWSIsImkiLCJzdHJva2VUZXh0IiwiZmlsbFRleHQiLCJmaWxsUmVjdCIsImNsZWFyUmVjdCIsImxpbmVKb2luIiwiX2ZpbGxDb2xvciIsImZpbGxTdHlsZSIsImhhbmRsZUxvYWRlZFRleHR1cmUiLCJjYWNoZU1vZGUiLCJDYWNoZU1vZGUiLCJCSVRNQVAiLCJmcmFtZSIsInNldFJlY3QiLCJwYWNrVG9EeW5hbWljQXRsYXMiLCJtaW4iLCJyZWNyZWF0ZSIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJfZ2V0Rm9udERlc2MiLCJmb250RGVzYyIsIm5vZGVTcGFjaW5nWSIsIl9jYWxjdWxhdGVQYXJhZ3JhcGhMZW5ndGgiLCJwYXJhZ3JhcGhlZFN0cmluZ3MiLCJjdHgiLCJwYXJhZ3JhcGhMZW5ndGgiLCJzYWZlTWVhc3VyZVRleHQiLCJwdXNoIiwiX2NhbGN1bGF0ZVNocmlua0ZvbnQiLCJ0b3RhbEhlaWdodCIsIm1heExlbmd0aCIsImNhbnZhc1dpZHRoTm9NYXJnaW4iLCJjYW52YXNIZWlnaHROb01hcmdpbiIsImFjdHVhbEZvbnRTaXplIiwidGV4dEZyYWdtZW50IiwibWlkIiwibG9nSUQiLCJhbGxXaWR0aCIsImZyYWdtZW50VGV4dCIsInNjYWxlWCIsInNjYWxlWSIsIl9jYWxjdWxhdGVXcmFwVGV4dCIsImNvbmNhdCIsInNwbGl0IiwiY2FudmFzU2l6ZVgiLCJjYW52YXNTaXplWSIsInBhcmFMZW5ndGgiLCJyYXdXaWR0aCIsInBhcnNlRmxvYXQi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QXdCbEIsa0JBQXhCOztBQUNBO0FBQ0g7O0FBQ0QsV0FBS3hLLFFBQVEsQ0FBQ29NLEtBQWQ7QUFBcUI7QUFDakIsZUFBS1Ysa0JBQUwsQ0FBd0JsQixrQkFBeEI7O0FBQ0E7QUFDSDs7QUFDRCxXQUFLeEssUUFBUSxDQUFDd0csYUFBZDtBQUE2QjtBQUN6QixlQUFLa0Ysa0JBQUwsQ0FBd0JsQixrQkFBeEI7O0FBQ0EsY0FBSTBCLFVBQVMsR0FBRyxDQUFDckwsZUFBZSxDQUFDeUcsTUFBaEIsR0FBeUI1SCxTQUFTLENBQUM4SCxjQUFwQyxJQUFzRCxLQUFLSixjQUFMLEVBQXRFOztBQUNBdEcsVUFBQUEsV0FBVyxDQUFDdUMsTUFBWixHQUFxQjZJLFVBQVMsR0FBR2hLLGNBQWMsQ0FBQ21CLE1BQWhELENBSHlCLENBSXpCOztBQUNBaEIsVUFBQUEsZ0JBQWdCLENBQUNnQixNQUFqQixHQUEwQjZJLFVBQVMsR0FBRzlKLGtCQUFrQixDQUFDaUIsTUFBekQ7QUFDQTtBQUNIO0FBakNMO0FBbUNIOzs7RUFwY3FDZ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBBc3NlbWJsZXIyRCBmcm9tICcuLi8uLi9hc3NlbWJsZXItMmQnO1xyXG5cclxubGV0IHRleHRVdGlscyA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzL3RleHQtdXRpbHMnKTtcclxuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuLi8uLi8uLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XHJcbmNvbnN0IExhYmVsID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJyk7XHJcbmNvbnN0IExhYmVsT3V0bGluZSA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbE91dGxpbmUnKTtcclxuY29uc3QgTGFiZWxTaGFkb3cgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21wb25lbnRzL0NDTGFiZWxTaGFkb3cnKTtcclxuY29uc3QgT3ZlcmZsb3cgPSBMYWJlbC5PdmVyZmxvdztcclxuY29uc3QgZGVsZXRlRnJvbUR5bmFtaWNBdGxhcyA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZGVsZXRlRnJvbUR5bmFtaWNBdGxhcztcclxuY29uc3QgZ2V0Rm9udEZhbWlseSA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2V0Rm9udEZhbWlseTtcclxuXHJcbmNvbnN0IE1BWF9TSVpFID0gMjA0ODtcclxuY29uc3QgX2ludmlzaWJsZUFscGhhID0gKDEgLyAyNTUpLnRvRml4ZWQoMyk7XHJcblxyXG5sZXQgX2NvbnRleHQgPSBudWxsO1xyXG5sZXQgX2NhbnZhcyA9IG51bGw7XHJcbmxldCBfdGV4dHVyZSA9IG51bGw7XHJcblxyXG5sZXQgX2ZvbnREZXNjID0gJyc7XHJcbmxldCBfc3RyaW5nID0gJyc7XHJcbmxldCBfZm9udFNpemUgPSAwO1xyXG5sZXQgX2RyYXdGb250U2l6ZSA9IDA7XHJcbmxldCBfc3BsaXRlZFN0cmluZ3MgPSBbXTtcclxubGV0IF9jYW52YXNTaXplID0gY2MuU2l6ZS5aRVJPO1xyXG5sZXQgX2xpbmVIZWlnaHQgPSAwO1xyXG5sZXQgX2hBbGlnbiA9IDA7XHJcbmxldCBfdkFsaWduID0gMDtcclxubGV0IF9jb2xvciA9IG51bGw7XHJcbmxldCBfZm9udEZhbWlseSA9ICcnO1xyXG5sZXQgX292ZXJmbG93ID0gT3ZlcmZsb3cuTk9ORTtcclxubGV0IF9pc1dyYXBUZXh0ID0gZmFsc2U7XHJcbmxldCBfcHJlbXVsdGlwbHkgPSBmYWxzZTtcclxuXHJcbi8vIG91dGxpbmVcclxubGV0IF9vdXRsaW5lQ29tcCA9IG51bGw7XHJcbmxldCBfb3V0bGluZUNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcblxyXG4vLyBzaGFkb3dcclxubGV0IF9zaGFkb3dDb21wID0gbnVsbDtcclxubGV0IF9zaGFkb3dDb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG5cclxubGV0IF9jYW52YXNQYWRkaW5nID0gY2MucmVjdCgpO1xyXG5sZXQgX2NvbnRlbnRTaXplRXh0ZW5kID0gY2MuU2l6ZS5aRVJPO1xyXG5sZXQgX25vZGVDb250ZW50U2l6ZSA9IGNjLlNpemUuWkVSTztcclxuXHJcbmxldCBfZW5hYmxlQm9sZCA9IGZhbHNlO1xyXG5sZXQgX2VuYWJsZUl0YWxpYyA9IGZhbHNlO1xyXG5sZXQgX2VuYWJsZVVuZGVybGluZSA9IGZhbHNlO1xyXG5sZXQgX3VuZGVybGluZVRoaWNrbmVzcyA9IDA7XHJcblxyXG5sZXQgX2RyYXdVbmRlcmxpbmVQb3MgPSBjYy5WZWMyLlpFUk87XHJcbmxldCBfZHJhd1VuZGVybGluZVdpZHRoID0gMDtcclxuXHJcbmxldCBfc2hhcmVkTGFiZWxEYXRhO1xyXG5cclxuY29uc3QgQWxpZ25tZW50ID0gW1xyXG4gICAgJ2xlZnQnLCAvLyBtYWNyby5UZXh0QWxpZ25tZW50LkxFRlRcclxuICAgICdjZW50ZXInLCAvLyBtYWNyby5UZXh0QWxpZ25tZW50LkNFTlRFUlxyXG4gICAgJ3JpZ2h0JyAvLyBtYWNyby5UZXh0QWxpZ25tZW50LlJJR0hUXHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUVEZBc3NlbWJsZXIgZXh0ZW5kcyBBc3NlbWJsZXIyRCB7XHJcbiAgICBfZ2V0QXNzZW1ibGVyRGF0YSAoKSB7XHJcbiAgICAgICAgX3NoYXJlZExhYmVsRGF0YSA9IExhYmVsLl9jYW52YXNQb29sLmdldCgpO1xyXG4gICAgICAgIF9zaGFyZWRMYWJlbERhdGEuY2FudmFzLndpZHRoID0gX3NoYXJlZExhYmVsRGF0YS5jYW52YXMuaGVpZ2h0ID0gMTtcclxuICAgICAgICByZXR1cm4gX3NoYXJlZExhYmVsRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVzZXRBc3NlbWJsZXJEYXRhIChhc3NlbWJsZXJEYXRhKSB7XHJcbiAgICAgICAgaWYgKGFzc2VtYmxlckRhdGEpIHtcclxuICAgICAgICAgICAgTGFiZWwuX2NhbnZhc1Bvb2wucHV0KGFzc2VtYmxlckRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSZW5kZXJEYXRhIChjb21wKSB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlUmVuZGVyRGF0YShjb21wKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWNvbXAuX3ZlcnRzRGlydHkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvcGVydGllcyhjb21wKTtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVMYWJlbEZvbnQoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVMYWJlbERpbWVuc2lvbnMoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUZXh0dXJlKGNvbXApO1xyXG4gICAgICAgIHRoaXMuX2NhbER5bmFtaWNBdGxhcyhjb21wKTtcclxuXHJcbiAgICAgICAgY29tcC5fYWN0dWFsRm9udFNpemUgPSBfZm9udFNpemU7XHJcbiAgICAgICAgY29tcC5ub2RlLnNldENvbnRlbnRTaXplKF9ub2RlQ29udGVudFNpemUpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVZlcnRzKGNvbXApO1xyXG5cclxuICAgICAgICBjb21wLl92ZXJ0c0RpcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIF9jb250ZXh0ID0gbnVsbDtcclxuICAgICAgICBfY2FudmFzID0gbnVsbDtcclxuICAgICAgICBfdGV4dHVyZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmVydHMgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVQYWRkaW5nUmVjdCAoKSB7XHJcbiAgICAgICAgbGV0IHRvcCA9IDAsIGJvdHRvbSA9IDAsIGxlZnQgPSAwLCByaWdodCA9IDA7XHJcbiAgICAgICAgbGV0IG91dGxpbmVXaWR0aCA9IDA7XHJcbiAgICAgICAgX2NvbnRlbnRTaXplRXh0ZW5kLndpZHRoID0gX2NvbnRlbnRTaXplRXh0ZW5kLmhlaWdodCA9IDA7XHJcbiAgICAgICAgaWYgKF9vdXRsaW5lQ29tcCkge1xyXG4gICAgICAgICAgICBvdXRsaW5lV2lkdGggPSBfb3V0bGluZUNvbXAud2lkdGg7XHJcbiAgICAgICAgICAgIHRvcCA9IGJvdHRvbSA9IGxlZnQgPSByaWdodCA9IG91dGxpbmVXaWR0aDtcclxuICAgICAgICAgICAgX2NvbnRlbnRTaXplRXh0ZW5kLndpZHRoID0gX2NvbnRlbnRTaXplRXh0ZW5kLmhlaWdodCA9IG91dGxpbmVXaWR0aCAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfc2hhZG93Q29tcCkge1xyXG4gICAgICAgICAgICBsZXQgc2hhZG93V2lkdGggPSBfc2hhZG93Q29tcC5ibHVyICsgb3V0bGluZVdpZHRoO1xyXG4gICAgICAgICAgICBsZWZ0ID0gTWF0aC5tYXgobGVmdCwgLV9zaGFkb3dDb21wLl9vZmZzZXQueCArIHNoYWRvd1dpZHRoKTtcclxuICAgICAgICAgICAgcmlnaHQgPSBNYXRoLm1heChyaWdodCwgX3NoYWRvd0NvbXAuX29mZnNldC54ICsgc2hhZG93V2lkdGgpO1xyXG4gICAgICAgICAgICB0b3AgPSBNYXRoLm1heCh0b3AsIF9zaGFkb3dDb21wLl9vZmZzZXQueSArIHNoYWRvd1dpZHRoKTtcclxuICAgICAgICAgICAgYm90dG9tID0gTWF0aC5tYXgoYm90dG9tLCAtX3NoYWRvd0NvbXAuX29mZnNldC55ICsgc2hhZG93V2lkdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoX2VuYWJsZUl0YWxpYykge1xyXG4gICAgICAgICAgICAvLzAuMDE3NDUzMjkyNSA9IDMuMTQxNTkyNjUzIC8gMTgwXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBfZHJhd0ZvbnRTaXplICogTWF0aC50YW4oMTIgKiAwLjAxNzQ1MzI5MjUpO1xyXG4gICAgICAgICAgICByaWdodCArPSBvZmZzZXQ7XHJcbiAgICAgICAgICAgIF9jb250ZW50U2l6ZUV4dGVuZC53aWR0aCArPSBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9jYW52YXNQYWRkaW5nLnggPSBsZWZ0O1xyXG4gICAgICAgIF9jYW52YXNQYWRkaW5nLnkgPSB0b3A7XHJcbiAgICAgICAgX2NhbnZhc1BhZGRpbmcud2lkdGggPSBsZWZ0ICsgcmlnaHQ7XHJcbiAgICAgICAgX2NhbnZhc1BhZGRpbmcuaGVpZ2h0ID0gdG9wICsgYm90dG9tO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVQcm9wZXJ0aWVzIChjb21wKSB7XHJcbiAgICAgICAgbGV0IGFzc2VtYmxlckRhdGEgPSBjb21wLl9hc3NlbWJsZXJEYXRhO1xyXG4gICAgICAgIF9jb250ZXh0ID0gYXNzZW1ibGVyRGF0YS5jb250ZXh0O1xyXG4gICAgICAgIF9jYW52YXMgPSBhc3NlbWJsZXJEYXRhLmNhbnZhcztcclxuICAgICAgICBfdGV4dHVyZSA9IGNvbXAuX2ZyYW1lLl9vcmlnaW5hbCA/IGNvbXAuX2ZyYW1lLl9vcmlnaW5hbC5fdGV4dHVyZSA6IGNvbXAuX2ZyYW1lLl90ZXh0dXJlO1xyXG5cclxuICAgICAgICBfc3RyaW5nID0gY29tcC5zdHJpbmcudG9TdHJpbmcoKTtcclxuICAgICAgICBfZm9udFNpemUgPSBjb21wLl9mb250U2l6ZTtcclxuICAgICAgICBfZHJhd0ZvbnRTaXplID0gX2ZvbnRTaXplO1xyXG4gICAgICAgIF91bmRlcmxpbmVUaGlja25lc3MgPSBjb21wLnVuZGVybGluZUhlaWdodCB8fCBfZHJhd0ZvbnRTaXplIC8gODtcclxuICAgICAgICBfb3ZlcmZsb3cgPSBjb21wLm92ZXJmbG93O1xyXG4gICAgICAgIF9jYW52YXNTaXplLndpZHRoID0gY29tcC5ub2RlLndpZHRoO1xyXG4gICAgICAgIF9jYW52YXNTaXplLmhlaWdodCA9IGNvbXAubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgX25vZGVDb250ZW50U2l6ZSA9IGNvbXAubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIF9saW5lSGVpZ2h0ID0gY29tcC5fbGluZUhlaWdodDtcclxuICAgICAgICBfaEFsaWduID0gY29tcC5ob3Jpem9udGFsQWxpZ247XHJcbiAgICAgICAgX3ZBbGlnbiA9IGNvbXAudmVydGljYWxBbGlnbjtcclxuICAgICAgICBfY29sb3IgPSBjb21wLm5vZGUuY29sb3I7XHJcbiAgICAgICAgX2VuYWJsZUJvbGQgPSBjb21wLmVuYWJsZUJvbGQ7XHJcbiAgICAgICAgX2VuYWJsZUl0YWxpYyA9IGNvbXAuZW5hYmxlSXRhbGljO1xyXG4gICAgICAgIF9lbmFibGVVbmRlcmxpbmUgPSBjb21wLmVuYWJsZVVuZGVybGluZTtcclxuICAgICAgICBfZm9udEZhbWlseSA9IGdldEZvbnRGYW1pbHkoY29tcCk7XHJcbiAgICAgICAgX3ByZW11bHRpcGx5ID0gY29tcC5zcmNCbGVuZEZhY3RvciA9PT0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xyXG5cclxuICAgICAgICBpZiAoQ0NfTkFUSVZFUkVOREVSRVIpIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuX3NldFByZW11bHRpcGx5KF9wcmVtdWx0aXBseSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX292ZXJmbG93ID09PSBPdmVyZmxvdy5OT05FKSB7XHJcbiAgICAgICAgICAgIF9pc1dyYXBUZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF9vdmVyZmxvdyA9PT0gT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVCkge1xyXG4gICAgICAgICAgICBfaXNXcmFwVGV4dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBfaXNXcmFwVGV4dCA9IGNvbXAuZW5hYmxlV3JhcFRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdXRsaW5lXHJcbiAgICAgICAgX291dGxpbmVDb21wID0gTGFiZWxPdXRsaW5lICYmIGNvbXAuZ2V0Q29tcG9uZW50KExhYmVsT3V0bGluZSk7XHJcbiAgICAgICAgX291dGxpbmVDb21wID0gKF9vdXRsaW5lQ29tcCAmJiBfb3V0bGluZUNvbXAuZW5hYmxlZCAmJiBfb3V0bGluZUNvbXAud2lkdGggPiAwKSA/IF9vdXRsaW5lQ29tcCA6IG51bGw7XHJcbiAgICAgICAgaWYgKF9vdXRsaW5lQ29tcCkge1xyXG4gICAgICAgICAgICBfb3V0bGluZUNvbG9yLnNldChfb3V0bGluZUNvbXAuY29sb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2hhZG93XHJcbiAgICAgICAgX3NoYWRvd0NvbXAgPSBMYWJlbFNoYWRvdyAmJiBjb21wLmdldENvbXBvbmVudChMYWJlbFNoYWRvdyk7XHJcbiAgICAgICAgX3NoYWRvd0NvbXAgPSAoX3NoYWRvd0NvbXAgJiYgX3NoYWRvd0NvbXAuZW5hYmxlZCkgPyBfc2hhZG93Q29tcCA6IG51bGw7XHJcbiAgICAgICAgaWYgKF9zaGFkb3dDb21wKSB7XHJcbiAgICAgICAgICAgIF9zaGFkb3dDb2xvci5zZXQoX3NoYWRvd0NvbXAuY29sb3IpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiB0ZW1wb3Jhcnkgc29sdXRpb24sIGNhc2NhZGUgb3BhY2l0eSBmb3Igb3V0bGluZSBjb2xvclxyXG4gICAgICAgICAgICBfc2hhZG93Q29sb3IuYSA9IF9zaGFkb3dDb2xvci5hICogY29tcC5ub2RlLmNvbG9yLmEgLyAyNTUuMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZGRpbmdSZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NhbGN1bGF0ZUZpbGxUZXh0U3RhcnRQb3NpdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxhYmVsWCA9IDA7XHJcbiAgICAgICAgaWYgKF9oQWxpZ24gPT09IG1hY3JvLlRleHRBbGlnbm1lbnQuUklHSFQpIHtcclxuICAgICAgICAgICAgbGFiZWxYID0gX2NhbnZhc1NpemUud2lkdGggLSBfY2FudmFzUGFkZGluZy53aWR0aDtcclxuICAgICAgICB9IGVsc2UgaWYgKF9oQWxpZ24gPT09IG1hY3JvLlRleHRBbGlnbm1lbnQuQ0VOVEVSKSB7XHJcbiAgICAgICAgICAgIGxhYmVsWCA9IChfY2FudmFzU2l6ZS53aWR0aCAtIF9jYW52YXNQYWRkaW5nLndpZHRoKSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGluZUhlaWdodCA9IHRoaXMuX2dldExpbmVIZWlnaHQoKTtcclxuICAgICAgICBsZXQgZHJhd1N0YXJ0WSA9IGxpbmVIZWlnaHQgKiAoX3NwbGl0ZWRTdHJpbmdzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIC8vIFRPUFxyXG4gICAgICAgIGxldCBmaXJzdExpbmVsYWJlbFkgPSBfZm9udFNpemUgKiAoMSAtIHRleHRVdGlscy5CQVNFTElORV9SQVRJTyAvIDIpO1xyXG4gICAgICAgIGlmIChfdkFsaWduICE9PSBtYWNyby5WZXJ0aWNhbFRleHRBbGlnbm1lbnQuVE9QKSB7XHJcbiAgICAgICAgICAgIC8vIGZyZWUgc3BhY2UgaW4gdmVydGljYWwgZGlyZWN0aW9uXHJcbiAgICAgICAgICAgIGxldCBibGFuayA9IGRyYXdTdGFydFkgKyBfY2FudmFzUGFkZGluZy5oZWlnaHQgKyBfZm9udFNpemUgLSBfY2FudmFzU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChfdkFsaWduID09PSBtYWNyby5WZXJ0aWNhbFRleHRBbGlnbm1lbnQuQk9UVE9NKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVbmxpa2UgQk1Gb250LCBuZWVkcyB0byByZXNlcnZlIHNwYWNlIGJlbG93LlxyXG4gICAgICAgICAgICAgICAgYmxhbmsgKz0gdGV4dFV0aWxzLkJBU0VMSU5FX1JBVElPIC8gMiAqIF9mb250U2l6ZTtcclxuICAgICAgICAgICAgICAgIC8vIEJPVFRPTVxyXG4gICAgICAgICAgICAgICAgZmlyc3RMaW5lbGFiZWxZIC09IGJsYW5rO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gQ0VOVEVSXHJcbiAgICAgICAgICAgICAgICBmaXJzdExpbmVsYWJlbFkgLT0gYmxhbmsgLyAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaXJzdExpbmVsYWJlbFkgKz0gdGV4dFV0aWxzLkJBU0VMSU5FX09GRlNFVCAqIF9mb250U2l6ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKGxhYmVsWCArIF9jYW52YXNQYWRkaW5nLngsIGZpcnN0TGluZWxhYmVsWSArIF9jYW52YXNQYWRkaW5nLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXR1cE91dGxpbmUgKCkge1xyXG4gICAgICAgIF9jb250ZXh0LnN0cm9rZVN0eWxlID0gYHJnYmEoJHtfb3V0bGluZUNvbG9yLnJ9LCAke19vdXRsaW5lQ29sb3IuZ30sICR7X291dGxpbmVDb2xvci5ifSwgJHtfb3V0bGluZUNvbG9yLmEgLyAyNTV9KWA7XHJcbiAgICAgICAgX2NvbnRleHQubGluZVdpZHRoID0gX291dGxpbmVDb21wLndpZHRoICogMjtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0dXBTaGFkb3cgKCkge1xyXG4gICAgICAgIF9jb250ZXh0LnNoYWRvd0NvbG9yID0gYHJnYmEoJHtfc2hhZG93Q29sb3Iucn0sICR7X3NoYWRvd0NvbG9yLmd9LCAke19zaGFkb3dDb2xvci5ifSwgJHtfc2hhZG93Q29sb3IuYSAvIDI1NX0pYDtcclxuICAgICAgICBfY29udGV4dC5zaGFkb3dCbHVyID0gX3NoYWRvd0NvbXAuYmx1cjtcclxuICAgICAgICBfY29udGV4dC5zaGFkb3dPZmZzZXRYID0gX3NoYWRvd0NvbXAub2Zmc2V0Lng7XHJcbiAgICAgICAgX2NvbnRleHQuc2hhZG93T2Zmc2V0WSA9IC1fc2hhZG93Q29tcC5vZmZzZXQueTtcclxuICAgIH1cclxuXHJcbiAgICBfZHJhd1RleHRFZmZlY3QgKHN0YXJ0UG9zaXRpb24sIGxpbmVIZWlnaHQpIHtcclxuICAgICAgICBpZiAoIV9zaGFkb3dDb21wICYmICFfb3V0bGluZUNvbXAgJiYgIV9lbmFibGVVbmRlcmxpbmUpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGlzTXVsdGlwbGUgPSBfc3BsaXRlZFN0cmluZ3MubGVuZ3RoID4gMSAmJiBfc2hhZG93Q29tcDtcclxuICAgICAgICBsZXQgbWVhc3VyZVRleHQgPSB0aGlzLl9tZWFzdXJlVGV4dChfY29udGV4dCwgX2ZvbnREZXNjKTtcclxuICAgICAgICBsZXQgZHJhd1RleHRQb3NYID0gMCwgZHJhd1RleHRQb3NZID0gMDtcclxuXHJcbiAgICAgICAgLy8gb25seSBvbmUgc2V0IHNoYWRvdyBhbmQgb3V0bGluZVxyXG4gICAgICAgIGlmIChfc2hhZG93Q29tcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR1cFNoYWRvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoX291dGxpbmVDb21wKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwT3V0bGluZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZHJhdyBzaGFkb3cgYW5kIChvdXRsaW5lIG9yIHRleHQpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc3BsaXRlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZHJhd1RleHRQb3NYID0gc3RhcnRQb3NpdGlvbi54O1xyXG4gICAgICAgICAgICBkcmF3VGV4dFBvc1kgPSBzdGFydFBvc2l0aW9uLnkgKyBpICogbGluZUhlaWdodDtcclxuICAgICAgICAgICAgLy8gbXVsdGlwbGUgbGluZXMgbmVlZCB0byBiZSBkcmF3biBvdXRsaW5lIGFuZCBmaWxsIHRleHRcclxuICAgICAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfb3V0bGluZUNvbXApIHtcclxuICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5zdHJva2VUZXh0KF9zcGxpdGVkU3RyaW5nc1tpXSwgZHJhd1RleHRQb3NYLCBkcmF3VGV4dFBvc1kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2NvbnRleHQuZmlsbFRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldLCBkcmF3VGV4dFBvc1gsIGRyYXdUZXh0UG9zWSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgdW5kZXJsaW5lXHJcbiAgICAgICAgICAgIGlmIChfZW5hYmxlVW5kZXJsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBfZHJhd1VuZGVybGluZVdpZHRoID0gbWVhc3VyZVRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChfaEFsaWduID09PSBtYWNyby5UZXh0QWxpZ25tZW50LlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RyYXdVbmRlcmxpbmVQb3MueCA9IHN0YXJ0UG9zaXRpb24ueCAtIF9kcmF3VW5kZXJsaW5lV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF9oQWxpZ24gPT09IG1hY3JvLlRleHRBbGlnbm1lbnQuQ0VOVEVSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RyYXdVbmRlcmxpbmVQb3MueCA9IHN0YXJ0UG9zaXRpb24ueCAtIChfZHJhd1VuZGVybGluZVdpZHRoIC8gMik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9kcmF3VW5kZXJsaW5lUG9zLnggPSBzdGFydFBvc2l0aW9uLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfZHJhd1VuZGVybGluZVBvcy55ID0gZHJhd1RleHRQb3NZICsgX2RyYXdGb250U2l6ZSAvIDg7XHJcbiAgICAgICAgICAgICAgICBfY29udGV4dC5maWxsUmVjdChfZHJhd1VuZGVybGluZVBvcy54LCBfZHJhd1VuZGVybGluZVBvcy55LCBfZHJhd1VuZGVybGluZVdpZHRoLCBfdW5kZXJsaW5lVGhpY2tuZXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuc2hhZG93Q29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlVGV4dHVyZSAoKSB7XHJcbiAgICAgICAgX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIF9jYW52YXMud2lkdGgsIF9jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAvLyB1c2Ugcm91bmQgZm9yIGxpbmUgam9pbiB0byBhdm9pZCBzaGFycCBpbnRlcnNlY3QgcG9pbnRcclxuICAgICAgICBfY29udGV4dC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgLy9BZGQgYSB3aGl0ZSBiYWNrZ3JvdW5kIHRvIGF2b2lkIGJsYWNrIGVkZ2VzLlxyXG4gICAgICAgIGlmICghX3ByZW11bHRpcGx5KSB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogaXQgaXMgYmVzdCB0byBhZGQgYWxwaGFUZXN0IHRvIGZpbHRlciBvdXQgdGhlIGJhY2tncm91bmQgY29sb3IuXHJcbiAgICAgICAgICAgIGxldCBfZmlsbENvbG9yID0gX291dGxpbmVDb21wID8gX291dGxpbmVDb2xvciA6IF9jb2xvcjtcclxuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtfZmlsbENvbG9yLnJ9LCAke19maWxsQ29sb3IuZ30sICR7X2ZpbGxDb2xvci5ifSwgJHtfaW52aXNpYmxlQWxwaGF9KWA7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIF9jYW52YXMud2lkdGgsIF9jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFN0eWxlID0gYHJnYmEoJHtfY29sb3Iucn0sICR7X2NvbG9yLmd9LCAke19jb2xvci5ifSwgMSlgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7X2NvbG9yLnJ9LCAke19jb2xvci5nfSwgJHtfY29sb3IuYn0sICR7X2NvbG9yLmEgLyAyNTUuMH0pYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gdGhpcy5fY2FsY3VsYXRlRmlsbFRleHRTdGFydFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGxpbmVIZWlnaHQgPSB0aGlzLl9nZXRMaW5lSGVpZ2h0KCk7XHJcbiAgICAgICAgbGV0IGRyYXdUZXh0UG9zWCA9IHN0YXJ0UG9zaXRpb24ueCwgZHJhd1RleHRQb3NZID0gMDtcclxuICAgICAgICAvLyBkcmF3IHNoYWRvdyBhbmQgdW5kZXJsaW5lXHJcbiAgICAgICAgdGhpcy5fZHJhd1RleHRFZmZlY3Qoc3RhcnRQb3NpdGlvbiwgbGluZUhlaWdodCk7XHJcbiAgICAgICAgLy8gZHJhdyB0ZXh0IGFuZCBvdXRsaW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfc3BsaXRlZFN0cmluZ3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZHJhd1RleHRQb3NZID0gc3RhcnRQb3NpdGlvbi55ICsgaSAqIGxpbmVIZWlnaHQ7XHJcbiAgICAgICAgICAgIGlmIChfb3V0bGluZUNvbXApIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LnN0cm9rZVRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldLCBkcmF3VGV4dFBvc1gsIGRyYXdUZXh0UG9zWSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2NvbnRleHQuZmlsbFRleHQoX3NwbGl0ZWRTdHJpbmdzW2ldLCBkcmF3VGV4dFBvc1gsIGRyYXdUZXh0UG9zWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX3NoYWRvd0NvbXApIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuc2hhZG93Q29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3RleHR1cmUuaGFuZGxlTG9hZGVkVGV4dHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYWxEeW5hbWljQXRsYXMgKGNvbXApIHtcclxuICAgICAgICBpZihjb21wLmNhY2hlTW9kZSAhPT0gTGFiZWwuQ2FjaGVNb2RlLkJJVE1BUCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBmcmFtZSA9IGNvbXAuX2ZyYW1lO1xyXG4gICAgICAgIC8vIERlbGV0ZSBjYWNoZSBpbiBhdGxhcy5cclxuICAgICAgICBkZWxldGVGcm9tRHluYW1pY0F0bGFzKGNvbXAsIGZyYW1lKTtcclxuICAgICAgICBpZiAoIWZyYW1lLl9vcmlnaW5hbCkge1xyXG4gICAgICAgICAgICBmcmFtZS5zZXRSZWN0KGNjLnJlY3QoMCwgMCwgX2NhbnZhcy53aWR0aCwgX2NhbnZhcy5oZWlnaHQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWNrVG9EeW5hbWljQXRsYXMoY29tcCwgZnJhbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVMYWJlbERpbWVuc2lvbnMgKCkge1xyXG4gICAgICAgIF9jYW52YXNTaXplLndpZHRoID0gTWF0aC5taW4oX2NhbnZhc1NpemUud2lkdGgsIE1BWF9TSVpFKTtcclxuICAgICAgICBfY2FudmFzU2l6ZS5oZWlnaHQgPSBNYXRoLm1pbihfY2FudmFzU2l6ZS5oZWlnaHQsIE1BWF9TSVpFKTtcclxuXHJcbiAgICAgICAgbGV0IHJlY3JlYXRlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKF9jYW52YXMud2lkdGggIT09IF9jYW52YXNTaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIF9jYW52YXMud2lkdGggPSBfY2FudmFzU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgcmVjcmVhdGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoX2NhbnZhcy5oZWlnaHQgIT09IF9jYW52YXNTaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICBfY2FudmFzLmhlaWdodCA9IF9jYW52YXNTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgcmVjcmVhdGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWNyZWF0ZSAmJiAoX2NvbnRleHQuZm9udCA9IF9mb250RGVzYyk7XHJcbiAgICAgICAgLy8gYWxpZ25cclxuICAgICAgICBfY29udGV4dC50ZXh0QWxpZ24gPSBBbGlnbm1lbnRbX2hBbGlnbl07XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEZvbnREZXNjICgpIHtcclxuICAgICAgICBsZXQgZm9udERlc2MgPSBfZm9udFNpemUudG9TdHJpbmcoKSArICdweCAnO1xyXG4gICAgICAgIGZvbnREZXNjID0gZm9udERlc2MgKyBfZm9udEZhbWlseTtcclxuICAgICAgICBpZiAoX2VuYWJsZUJvbGQpIHtcclxuICAgICAgICAgICAgZm9udERlc2MgPSBcImJvbGQgXCIgKyBmb250RGVzYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9lbmFibGVJdGFsaWMpIHtcclxuICAgICAgICAgICAgZm9udERlc2MgPSBcIml0YWxpYyBcIiArIGZvbnREZXNjO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9udERlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldExpbmVIZWlnaHQgKCkge1xyXG4gICAgICAgIGxldCBub2RlU3BhY2luZ1kgPSBfbGluZUhlaWdodDtcclxuICAgICAgICBpZiAobm9kZVNwYWNpbmdZID09PSAwKSB7XHJcbiAgICAgICAgICAgIG5vZGVTcGFjaW5nWSA9IF9mb250U2l6ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub2RlU3BhY2luZ1kgPSBub2RlU3BhY2luZ1kgKiBfZm9udFNpemUgLyBfZHJhd0ZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGVTcGFjaW5nWSB8IDA7XHJcbiAgICB9XHJcblxyXG4gICAgX2NhbGN1bGF0ZVBhcmFncmFwaExlbmd0aCAocGFyYWdyYXBoZWRTdHJpbmdzLCBjdHgpIHtcclxuICAgICAgICBsZXQgcGFyYWdyYXBoTGVuZ3RoID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoY3R4LCBwYXJhZ3JhcGhlZFN0cmluZ3NbaV0sIF9mb250RGVzYyk7XHJcbiAgICAgICAgICAgIHBhcmFncmFwaExlbmd0aC5wdXNoKHdpZHRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJhZ3JhcGhMZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgX21lYXN1cmVUZXh0IChjdHgsIGZvbnREZXNjKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoY3R4LCBzdHJpbmcsIGZvbnREZXNjKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIF9jYWxjdWxhdGVTaHJpbmtGb250IChwYXJhZ3JhcGhlZFN0cmluZ3MpIHtcclxuICAgICAgICBsZXQgcGFyYWdyYXBoTGVuZ3RoID0gdGhpcy5fY2FsY3VsYXRlUGFyYWdyYXBoTGVuZ3RoKHBhcmFncmFwaGVkU3RyaW5ncywgX2NvbnRleHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgdG90YWxIZWlnaHQgPSAwO1xyXG4gICAgICAgIGxldCBtYXhMZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBpZiAoX2lzV3JhcFRleHQpIHtcclxuICAgICAgICAgICAgbGV0IGNhbnZhc1dpZHRoTm9NYXJnaW4gPSBfbm9kZUNvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICBsZXQgY2FudmFzSGVpZ2h0Tm9NYXJnaW4gPSBfbm9kZUNvbnRlbnRTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgaWYgKGNhbnZhc1dpZHRoTm9NYXJnaW4gPCAwIHx8IGNhbnZhc0hlaWdodE5vTWFyZ2luIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvdGFsSGVpZ2h0ID0gY2FudmFzSGVpZ2h0Tm9NYXJnaW4gKyAxO1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsRm9udFNpemUgPSBfZm9udFNpemUgKyAxO1xyXG4gICAgICAgICAgICBsZXQgdGV4dEZyYWdtZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgLy9sZXQgc3RhcnRTaHJpbmtGb250U2l6ZSA9IGFjdHVhbEZvbnRTaXplIHwgMDtcclxuICAgICAgICAgICAgbGV0IGxlZnQgPSAwLCByaWdodCA9IGFjdHVhbEZvbnRTaXplIHwgMCwgbWlkID0gMDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChsZWZ0IDwgcmlnaHQpIHtcclxuICAgICAgICAgICAgICAgIG1pZCA9IChsZWZ0ICsgcmlnaHQgKyAxKSA+PiAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtaWQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDQwMDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9mb250U2l6ZSA9IG1pZDtcclxuICAgICAgICAgICAgICAgIF9mb250RGVzYyA9IHRoaXMuX2dldEZvbnREZXNjKCk7XHJcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mb250ID0gX2ZvbnREZXNjO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVIZWlnaHQgPSB0aGlzLl9nZXRMaW5lSGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcmFncmFwaGVkU3RyaW5ncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxXaWR0aCA9IHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoX2NvbnRleHQsIHBhcmFncmFwaGVkU3RyaW5nc1tpXSwgX2ZvbnREZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0RnJhZ21lbnQgPSB0ZXh0VXRpbHMuZnJhZ21lbnRUZXh0KHBhcmFncmFwaGVkU3RyaW5nc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxXaWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aE5vTWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21lYXN1cmVUZXh0KF9jb250ZXh0LCBfZm9udERlc2MpKTtcclxuICAgICAgICAgICAgICAgICAgICB0b3RhbEhlaWdodCArPSB0ZXh0RnJhZ21lbnQubGVuZ3RoICogbGluZUhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG90YWxIZWlnaHQgPiBjYW52YXNIZWlnaHROb01hcmdpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gbWlkIC0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IG1pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxlZnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDQwMDMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2ZvbnRTaXplID0gbGVmdDtcclxuICAgICAgICAgICAgICAgIF9mb250RGVzYyA9IHRoaXMuX2dldEZvbnREZXNjKCk7XHJcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mb250ID0gX2ZvbnREZXNjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG90YWxIZWlnaHQgPSBwYXJhZ3JhcGhlZFN0cmluZ3MubGVuZ3RoICogdGhpcy5fZ2V0TGluZUhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcmFncmFwaGVkU3RyaW5ncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1heExlbmd0aCA8IHBhcmFncmFwaExlbmd0aFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aCA9IHBhcmFncmFwaExlbmd0aFtpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2NhbGVYID0gKF9jYW52YXNTaXplLndpZHRoIC0gX2NhbnZhc1BhZGRpbmcud2lkdGgpIC8gbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGVZID0gX2NhbnZhc1NpemUuaGVpZ2h0IC8gdG90YWxIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBfZm9udFNpemUgPSAoX2RyYXdGb250U2l6ZSAqIE1hdGgubWluKDEsIHNjYWxlWCwgc2NhbGVZKSkgfCAwO1xyXG4gICAgICAgICAgICBfZm9udERlc2MgPSB0aGlzLl9nZXRGb250RGVzYygpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5mb250ID0gX2ZvbnREZXNjO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfY2FsY3VsYXRlV3JhcFRleHQgKHBhcmFncmFwaGVkU3RyaW5ncykge1xyXG4gICAgICAgIGlmICghX2lzV3JhcFRleHQpIHJldHVybjtcclxuXHJcbiAgICAgICAgX3NwbGl0ZWRTdHJpbmdzID0gW107XHJcbiAgICAgICAgbGV0IGNhbnZhc1dpZHRoTm9NYXJnaW4gPSBfbm9kZUNvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxXaWR0aCA9IHRleHRVdGlscy5zYWZlTWVhc3VyZVRleHQoX2NvbnRleHQsIHBhcmFncmFwaGVkU3RyaW5nc1tpXSwgX2ZvbnREZXNjKTtcclxuICAgICAgICAgICAgbGV0IHRleHRGcmFnbWVudCA9IHRleHRVdGlscy5mcmFnbWVudFRleHQocGFyYWdyYXBoZWRTdHJpbmdzW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNXaWR0aE5vTWFyZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVhc3VyZVRleHQoX2NvbnRleHQsIF9mb250RGVzYykpO1xyXG4gICAgICAgICAgICBfc3BsaXRlZFN0cmluZ3MgPSBfc3BsaXRlZFN0cmluZ3MuY29uY2F0KHRleHRGcmFnbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jYWxjdWxhdGVMYWJlbEZvbnQgKCkge1xyXG4gICAgICAgIGxldCBwYXJhZ3JhcGhlZFN0cmluZ3MgPSBfc3RyaW5nLnNwbGl0KCdcXG4nKTtcclxuXHJcbiAgICAgICAgX3NwbGl0ZWRTdHJpbmdzID0gcGFyYWdyYXBoZWRTdHJpbmdzO1xyXG4gICAgICAgIF9mb250RGVzYyA9IHRoaXMuX2dldEZvbnREZXNjKCk7XHJcbiAgICAgICAgX2NvbnRleHQuZm9udCA9IF9mb250RGVzYztcclxuXHJcbiAgICAgICAgc3dpdGNoIChfb3ZlcmZsb3cpIHtcclxuICAgICAgICAgICAgY2FzZSBPdmVyZmxvdy5OT05FOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzU2l6ZVggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhc1NpemVZID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYWdyYXBoZWRTdHJpbmdzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFMZW5ndGggPSB0ZXh0VXRpbHMuc2FmZU1lYXN1cmVUZXh0KF9jb250ZXh0LCBwYXJhZ3JhcGhlZFN0cmluZ3NbaV0sIF9mb250RGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzU2l6ZVggPSBjYW52YXNTaXplWCA+IHBhcmFMZW5ndGggPyBjYW52YXNTaXplWCA6IHBhcmFMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYW52YXNTaXplWSA9IChfc3BsaXRlZFN0cmluZ3MubGVuZ3RoICsgdGV4dFV0aWxzLkJBU0VMSU5FX1JBVElPKSAqIHRoaXMuX2dldExpbmVIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgIGxldCByYXdXaWR0aCA9IHBhcnNlRmxvYXQoY2FudmFzU2l6ZVgudG9GaXhlZCgyKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmF3SGVpZ2h0ID0gcGFyc2VGbG9hdChjYW52YXNTaXplWS50b0ZpeGVkKDIpKTtcclxuICAgICAgICAgICAgICAgIF9jYW52YXNTaXplLndpZHRoID0gcmF3V2lkdGggKyBfY2FudmFzUGFkZGluZy53aWR0aDtcclxuICAgICAgICAgICAgICAgIF9jYW52YXNTaXplLmhlaWdodCA9IHJhd0hlaWdodCArIF9jYW52YXNQYWRkaW5nLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIF9ub2RlQ29udGVudFNpemUud2lkdGggPSByYXdXaWR0aCArIF9jb250ZW50U2l6ZUV4dGVuZC53aWR0aDtcclxuICAgICAgICAgICAgICAgIF9ub2RlQ29udGVudFNpemUuaGVpZ2h0ID0gcmF3SGVpZ2h0ICsgX2NvbnRlbnRTaXplRXh0ZW5kLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgT3ZlcmZsb3cuU0hSSU5LOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVTaHJpbmtGb250KHBhcmFncmFwaGVkU3RyaW5ncyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVXcmFwVGV4dChwYXJhZ3JhcGhlZFN0cmluZ3MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBPdmVyZmxvdy5DTEFNUDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlV3JhcFRleHQocGFyYWdyYXBoZWRTdHJpbmdzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlV3JhcFRleHQocGFyYWdyYXBoZWRTdHJpbmdzKTtcclxuICAgICAgICAgICAgICAgIGxldCByYXdIZWlnaHQgPSAoX3NwbGl0ZWRTdHJpbmdzLmxlbmd0aCArIHRleHRVdGlscy5CQVNFTElORV9SQVRJTykgKiB0aGlzLl9nZXRMaW5lSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBfY2FudmFzU2l6ZS5oZWlnaHQgPSByYXdIZWlnaHQgKyBfY2FudmFzUGFkZGluZy5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgbm9kZSBoZWlnaHRcclxuICAgICAgICAgICAgICAgIF9ub2RlQ29udGVudFNpemUuaGVpZ2h0ID0gcmF3SGVpZ2h0ICsgX2NvbnRlbnRTaXplRXh0ZW5kLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==