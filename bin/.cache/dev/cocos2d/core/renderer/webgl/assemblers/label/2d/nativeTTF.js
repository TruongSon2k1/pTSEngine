
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/nativeTTF.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _materialVariant = _interopRequireDefault(require("../../../../../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Label = require('../../../../../components/CCLabel');

var LabelShadow = require('../../../../../components/CCLabelShadow');

var LabelOutline = require('../../../../../components/CCLabelOutline');

var Material = require('../../../../../assets/material/CCMaterial');

var UPDATE_CONTENT = 1 << 0;
var UPDATE_FONT = 1 << 1;
var UPDATE_EFFECT = 1 << 2;

var NativeTTF = /*#__PURE__*/function () {
  function NativeTTF() {}

  var _proto = NativeTTF.prototype;

  _proto.init = function init(comp) {
    this.labelMaterial = null;
    this._label = this._renderComp = comp;
    renderer.CustomAssembler.prototype.ctor.call(this);

    comp.node._proxy.setAssembler(this);

    this._layout = new jsb.LabelRenderer();

    this._layout.init(comp);

    this._cfg = new DataView(this._layout._cfg);
    this._layoutInfo = new DataView(this._layout._layout);
    this._cfgFields = jsb.LabelRenderer._cfgFields;
    this._layoutFields = jsb.LabelRenderer._layoutFields;

    this._layout.bindNodeProxy(comp.node._proxy);

    this._bindMaterial(comp);
  };

  _proto._setBufferFlag = function _setBufferFlag(dv, offset, size, type, flag) {
    if (type == "int8" && size == 1) {
      var v = dv.getInt8(offset);
      dv.setInt8(offset, flag | v);
    } else if (type == "int32" && size == 4) {
      var _v = dv.getInt32(offset, jsb.__isLittleEndian__);

      dv.setInt32(offset, flag | _v, jsb.__isLittleEndian__);
    } else {
      cc.warn("flag storage type should be int8/int32 only, type/size -> " + type + "/" + size + ".");
    }
  };

  _proto._updateCfgFlag = function _updateCfgFlag(flag) {
    var field = this._cfgFields.updateFlags;

    this._setBufferFlag(this._cfg, field.offset, field.size, field.type, flag);
  };

  _proto._setBufferValue = function _setBufferValue(dv, offset, size, type, value) {
    if (type == "float" && size == 4) {
      dv.setFloat32(offset, value, jsb.__isLittleEndian__);
    } else if (type == "int32" && size == 4) {
      dv.setInt32(offset, value, jsb.__isLittleEndian__);
    } else if (type == "bool" && size == 1) {
      dv.setInt8(offset, !!value ? 1 : 0, jsb.__isLittleEndian__);
    } else if (type == "Color4B" && size == 4) {
      dv.setUint8(offset, value.r);
      dv.setUint8(offset + 1, value.g);
      dv.setUint8(offset + 2, value.b);
      dv.setUint8(offset + 3, value.a);
    } else if (type == "int8" && size == 1) {
      dv.setUint8(offset, value);
    } else {
      cc.warn("dont know how to set value to buffer, type/size -> " + type + "/" + size + ".");
    }
  };

  _proto._setFieldValue = function _setFieldValue(dv, desc, field_name, value) {
    var field = desc[field_name];

    this._setBufferValue(dv, field.offset, field.size, field.type, value);
  };

  _proto._getBufferValue = function _getBufferValue(dv, offset, size, type) {
    if (type == "float" && size == 4) {
      return dv.getFloat32(offset, jsb.__isLittleEndian__);
    } else if (type == "int32" && size == 4) {
      return dv.getInt32(offset, jsb.__isLittleEndian__);
    } else if (type == "bool" && size == 1) {
      return dv.getInt8(offset, jsb.__isLittleEndian__) != 0;
    } else if (type == "Color4B" && size == 4) {
      var r = dv.getUint8(offset);
      var g = dv.getUint8(offset + 1);
      var b = dv.getUint8(offset + 2);
      var a = dv.getUint8(offset + 3);
      return {
        r: r,
        g: g,
        b: b,
        a: a
      };
    } else if (type == "int8" && size == 1) {
      return dv.getUint8(offset);
    } else {
      cc.warn("dont know how to get value from buffer, type/size -> " + type + "/" + size + ".");
      return undefined;
    }
  };

  _proto._getFieldValue = function _getFieldValue(dv, desc, field_name) {
    var field = desc[field_name];
    return this._getBufferValue(dv, field.offset, field.size, field.type);
  };

  _proto._getLayoutValue = function _getLayoutValue(field_name) {
    return this._getFieldValue(this._layoutInfo, this._layoutFields, field_name);
  };

  _proto._setLayoutValue = function _setLayoutValue(field_name, value) {
    return this._setFieldValue(this._layoutInfo, this._layoutFields, field_name, value);
  };

  _proto._updateCfgFlag_Content = function _updateCfgFlag_Content() {
    this._updateCfgFlag(UPDATE_CONTENT);
  };

  _proto._updateCfgFlag_Font = function _updateCfgFlag_Font() {
    this._updateCfgFlag(UPDATE_FONT);
  };

  _proto._colorEqual = function _colorEqual(a, b) {
    return a.r == b.r && a.g == b.g && a.b == b.b && a.a == b.a;
  };

  _proto._colorToObj = function _colorToObj(r, g, b, a) {
    return {
      r: r,
      g: g,
      b: b,
      a: a
    };
  };

  _proto.setString = function setString(str) {
    if (str != this._layout.string) {
      this._layout.string = str;

      this._updateCfgFlag_Content();
    }
  };

  _proto.setFontPath = function setFontPath(path) {
    if (path != this._layout.fontPath) {
      this._layout.fontPath = path;

      this._updateCfgFlag_Font();
    }
  };

  _proto.setFontSize = function setFontSize(fontSize, fontSizeRetina) {
    var oldfontsize = this._getFieldValue(this._cfg, this._cfgFields, "fontSize");

    if (oldfontsize != fontSize) {
      this._setFieldValue(this._cfg, this._cfgFields, "fontSize", fontSize);

      this._setFieldValue(this._cfg, this._cfgFields, "fontSizeRetina", fontSizeRetina);

      this._updateCfgFlag_Font();
    }
  };

  _proto.setOutline = function setOutline(outline) {
    var oldOutline = this._getLayoutValue("outlineSize");

    if (oldOutline > 0 != outline > 0) {
      this._updateCfgFlag_Font();
    }

    if (oldOutline != outline) {
      this._updateCfgFlag_Content();

      this._setLayoutValue("outlineSize", outline);
    }
  };

  _proto.setOutlineColor = function setOutlineColor(color) {
    var oldColor = this._getLayoutValue("outlineColor");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("outlineColor", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setLineHeight = function setLineHeight(lineHeight) {
    var oldLineHeight = this._getLayoutValue("lineHeight");

    if (oldLineHeight != lineHeight) {
      this._setLayoutValue("lineHeight", lineHeight);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setOverFlow = function setOverFlow(overflow) {
    var oldValue = this._getLayoutValue("overflow");

    if (oldValue != overflow) {
      this._setLayoutValue("overflow", overflow);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setEnableWrap = function setEnableWrap(value) {
    var oldValue = this._getLayoutValue("wrap");

    if (oldValue != value) {
      this._setLayoutValue("wrap", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setVerticalAlign = function setVerticalAlign(value) {
    var oldValue = this._getLayoutValue("valign");

    if (oldValue != value) {
      this._setLayoutValue("valign", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setHorizontalAlign = function setHorizontalAlign(value) {
    var oldValue = this._getLayoutValue("halign");

    if (oldValue != value) {
      this._setLayoutValue("halign", value);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setContentSize = function setContentSize(width, height) {
    var oldWidth = this._getLayoutValue("width");

    var oldHeight = this._getLayoutValue("height");

    if (oldWidth != width || oldHeight != height) {
      this._setLayoutValue("height", height);

      this._setLayoutValue("width", width);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setAnchorPoint = function setAnchorPoint(x, y) {
    var oldX = this._getLayoutValue("anchorX");

    var oldY = this._getLayoutValue("anchorY");

    if (oldX != x || oldY != y) {
      this._setLayoutValue("anchorX", x);

      this._setLayoutValue("anchorY", y);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setColor = function setColor(color) {
    var oldColor = this._getLayoutValue("color");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("color", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setShadow = function setShadow(x, y, blur) {
    var oldBlur = this._getLayoutValue("shadowBlur");

    var oldX = this._getLayoutValue("shadowX");

    var oldY = this._getLayoutValue("shadowY");

    if (oldBlur > 0 != blur > 0) {
      this._updateCfgFlag_Font();
    }

    var updateContent = false;

    if (oldBlur != blur) {
      this._setLayoutValue("shadowBlur", blur);

      updateContent = true;
    }

    if (oldX != x) {
      this._setLayoutValue("shadowX", x);

      updateContent = true;
    }

    if (oldY != y) {
      this._setLayoutValue("shadowY", y);

      updateContent = true;
    }

    if (updateContent) {
      this._updateCfgFlag_Content();
    }
  };

  _proto.setShadowColor = function setShadowColor(color) {
    var oldColor = this._getLayoutValue("shadowColor");

    if (!this._colorEqual(oldColor, color)) {
      this._setLayoutValue("shadowColor", color);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setItalic = function setItalic(enabled) {
    var oldItalic = this._getLayoutValue("italic");

    if (oldItalic != enabled) {
      this._setLayoutValue("italic", enabled);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setBold = function setBold(bold) {
    var oldBold = this._getLayoutValue("bold");

    if (oldBold != bold) {
      this._setLayoutValue("bold", bold);

      this._updateCfgFlag_Content();

      this._updateCfgFlag_Font(); //enable sdf

    }
  };

  _proto.setUnderline = function setUnderline(underline) {
    var oldBold = this._getLayoutValue("underline");

    if (oldBold != underline) {
      this._setLayoutValue("underline", underline);

      this._updateCfgFlag_Content();
    }
  };

  _proto.setSpacingX = function setSpacingX(x) {
    var oldX = this._getLayoutValue("spaceX");

    if (oldX != x && typeof x == "number" && !isNaN(x)) {
      this._setLayoutValue("spaceX", x);

      this._updateCfgFlag_Content();
    }
  };

  _proto.updateRenderData = function updateRenderData(comp) {
    if (!comp._vertsDirty) return;

    if (comp.font && comp.font.nativeUrl) {
      this.setFontPath(cc.assetManager.cacheManager.getCache(comp.font.nativeUrl) || comp.font.nativeUrl);
    }

    var layout = this._layout;
    var c = comp.node.color;
    var node = comp.node;
    var retinaSize = comp.fontSize;
    this.setString(comp.string);
    this.setFontSize(comp.fontSize, retinaSize / 72 * comp.fontSize);
    this.setLineHeight(comp.lineHeight);
    this.setEnableWrap(comp.enableWrapText);
    this.setItalic(comp.enableItalic);
    this.setUnderline(comp.enableUnderline);
    this.setBold(comp.enableBold);
    this.setOverFlow(comp.overflow);
    this.setVerticalAlign(comp.verticalAlign);
    this.setHorizontalAlign(comp.horizontalAlign);
    this.setSpacingX(comp.spacingX);
    this.setContentSize(node.getContentSize().width, node.getContentSize().height);
    this.setAnchorPoint(node.anchorX, node.anchorY);
    this.setColor(this._colorToObj(c.getR(), c.getG(), c.getB(), Math.ceil(c.getA() * node.opacity / 255)));
    var shadow = node.getComponent(cc.LabelShadow);

    if (shadow && shadow.enabled) {
      var shadowColor = shadow.color;
      this.setShadow(shadow.offset.x, shadow.offset.y, shadow.blur);
      this.setShadowColor(this._colorToObj(shadowColor.getR(), shadowColor.getG(), shadowColor.getB(), Math.ceil(shadowColor.getA() * node.opacity / 255)));
    } else {
      this.setShadow(0, 0, -1);
    }

    this._updateTTFMaterial(comp);

    layout.render(); //comp._vertsDirty = false;
  };

  _proto._bindMaterial = function _bindMaterial(comp) {
    var material = this.labelMaterial;

    if (!material) {
      material = _materialVariant["default"].createWithBuiltin("2d-label", comp);
      this.labelMaterial = material;
    }

    return material;
  };

  _proto._updateTTFMaterial = function _updateTTFMaterial(comp) {
    var material = this._bindMaterial(comp);

    var node = this._label.node;
    var layout = this._layout;
    var outline = node.getComponent(cc.LabelOutline);
    var outlineSize = 0;

    if (outline && outline.enabled && outline.width > 0) {
      outlineSize = Math.max(Math.min(outline.width / 10, 0.4), 0.1);
      var c = outline.color;
      this.setOutlineColor(this._colorToObj(c.getR(), c.getG(), c.getB(), Math.ceil(c.getA() * node.opacity / 255)));
    }

    this.setOutline(outlineSize);
    material.define('CC_USE_MODEL', true);
    material.define('USE_TEXTURE_ALPHAONLY', true);
    material.define('USE_SDF', outlineSize > 0.0 || comp.enableBold);
    material.define('USE_SDF_EXTEND', comp.enableBold ? 1 : 0);

    if (material.getDefine('CC_SUPPORT_standard_derivatives') !== undefined && cc.sys.glExtension('OES_standard_derivatives')) {
      material.define('CC_SUPPORT_standard_derivatives', true);
    }

    layout.setEffect(material.effect._nativeObj);
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    this._layout.render();
  };

  _proto.getVfmt = function getVfmt() {};

  return NativeTTF;
}();

exports["default"] = NativeTTF;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXDJkXFxuYXRpdmVUVEYuanMiXSwibmFtZXMiOlsiTGFiZWwiLCJyZXF1aXJlIiwiTGFiZWxTaGFkb3ciLCJMYWJlbE91dGxpbmUiLCJNYXRlcmlhbCIsIlVQREFURV9DT05URU5UIiwiVVBEQVRFX0ZPTlQiLCJVUERBVEVfRUZGRUNUIiwiTmF0aXZlVFRGIiwiaW5pdCIsImNvbXAiLCJsYWJlbE1hdGVyaWFsIiwiX2xhYmVsIiwiX3JlbmRlckNvbXAiLCJyZW5kZXJlciIsIkN1c3RvbUFzc2VtYmxlciIsInByb3RvdHlwZSIsImN0b3IiLCJjYWxsIiwibm9kZSIsIl9wcm94eSIsInNldEFzc2VtYmxlciIsIl9sYXlvdXQiLCJqc2IiLCJMYWJlbFJlbmRlcmVyIiwiX2NmZyIsIkRhdGFWaWV3IiwiX2xheW91dEluZm8iLCJfY2ZnRmllbGRzIiwiX2xheW91dEZpZWxkcyIsImJpbmROb2RlUHJveHkiLCJfYmluZE1hdGVyaWFsIiwiX3NldEJ1ZmZlckZsYWciLCJkdiIsIm9mZnNldCIsInNpemUiLCJ0eXBlIiwiZmxhZyIsInYiLCJnZXRJbnQ4Iiwic2V0SW50OCIsImdldEludDMyIiwiX19pc0xpdHRsZUVuZGlhbl9fIiwic2V0SW50MzIiLCJjYyIsIndhcm4iLCJfdXBkYXRlQ2ZnRmxhZyIsImZpZWxkIiwidXBkYXRlRmxhZ3MiLCJfc2V0QnVmZmVyVmFsdWUiLCJ2YWx1ZSIsInNldEZsb2F0MzIiLCJzZXRVaW50OCIsInIiLCJnIiwiYiIsImEiLCJfc2V0RmllbGRWYWx1ZSIsImRlc2MiLCJmaWVsZF9uYW1lIiwiX2dldEJ1ZmZlclZhbHVlIiwiZ2V0RmxvYXQzMiIsImdldFVpbnQ4IiwidW5kZWZpbmVkIiwiX2dldEZpZWxkVmFsdWUiLCJfZ2V0TGF5b3V0VmFsdWUiLCJfc2V0TGF5b3V0VmFsdWUiLCJfdXBkYXRlQ2ZnRmxhZ19Db250ZW50IiwiX3VwZGF0ZUNmZ0ZsYWdfRm9udCIsIl9jb2xvckVxdWFsIiwiX2NvbG9yVG9PYmoiLCJzZXRTdHJpbmciLCJzdHIiLCJzdHJpbmciLCJzZXRGb250UGF0aCIsInBhdGgiLCJmb250UGF0aCIsInNldEZvbnRTaXplIiwiZm9udFNpemUiLCJmb250U2l6ZVJldGluYSIsIm9sZGZvbnRzaXplIiwic2V0T3V0bGluZSIsIm91dGxpbmUiLCJvbGRPdXRsaW5lIiwic2V0T3V0bGluZUNvbG9yIiwiY29sb3IiLCJvbGRDb2xvciIsInNldExpbmVIZWlnaHQiLCJsaW5lSGVpZ2h0Iiwib2xkTGluZUhlaWdodCIsInNldE92ZXJGbG93Iiwib3ZlcmZsb3ciLCJvbGRWYWx1ZSIsInNldEVuYWJsZVdyYXAiLCJzZXRWZXJ0aWNhbEFsaWduIiwic2V0SG9yaXpvbnRhbEFsaWduIiwic2V0Q29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm9sZFdpZHRoIiwib2xkSGVpZ2h0Iiwic2V0QW5jaG9yUG9pbnQiLCJ4IiwieSIsIm9sZFgiLCJvbGRZIiwic2V0Q29sb3IiLCJzZXRTaGFkb3ciLCJibHVyIiwib2xkQmx1ciIsInVwZGF0ZUNvbnRlbnQiLCJzZXRTaGFkb3dDb2xvciIsInNldEl0YWxpYyIsImVuYWJsZWQiLCJvbGRJdGFsaWMiLCJzZXRCb2xkIiwiYm9sZCIsIm9sZEJvbGQiLCJzZXRVbmRlcmxpbmUiLCJ1bmRlcmxpbmUiLCJzZXRTcGFjaW5nWCIsImlzTmFOIiwidXBkYXRlUmVuZGVyRGF0YSIsIl92ZXJ0c0RpcnR5IiwiZm9udCIsIm5hdGl2ZVVybCIsImFzc2V0TWFuYWdlciIsImNhY2hlTWFuYWdlciIsImdldENhY2hlIiwibGF5b3V0IiwiYyIsInJldGluYVNpemUiLCJlbmFibGVXcmFwVGV4dCIsImVuYWJsZUl0YWxpYyIsImVuYWJsZVVuZGVybGluZSIsImVuYWJsZUJvbGQiLCJ2ZXJ0aWNhbEFsaWduIiwiaG9yaXpvbnRhbEFsaWduIiwic3BhY2luZ1giLCJnZXRDb250ZW50U2l6ZSIsImFuY2hvclgiLCJhbmNob3JZIiwiZ2V0UiIsImdldEciLCJnZXRCIiwiTWF0aCIsImNlaWwiLCJnZXRBIiwib3BhY2l0eSIsInNoYWRvdyIsImdldENvbXBvbmVudCIsInNoYWRvd0NvbG9yIiwiX3VwZGF0ZVRURk1hdGVyaWFsIiwicmVuZGVyIiwibWF0ZXJpYWwiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGVXaXRoQnVpbHRpbiIsIm91dGxpbmVTaXplIiwibWF4IiwibWluIiwiZGVmaW5lIiwiZ2V0RGVmaW5lIiwic3lzIiwiZ2xFeHRlbnNpb24iLCJzZXRFZmZlY3QiLCJlZmZlY3QiLCJfbmF0aXZlT2JqIiwiZmlsbEJ1ZmZlcnMiLCJnZXRWZm10Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxtQ0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUdELE9BQU8sQ0FBQyx5Q0FBRCxDQUEzQjs7QUFDQSxJQUFNRSxZQUFZLEdBQUdGLE9BQU8sQ0FBQywwQ0FBRCxDQUE1Qjs7QUFDQSxJQUFNRyxRQUFRLEdBQUdILE9BQU8sQ0FBQywyQ0FBRCxDQUF4Qjs7QUFJQSxJQUFNSSxjQUFjLEdBQUcsS0FBSyxDQUE1QjtBQUNBLElBQU1DLFdBQVcsR0FBRyxLQUFLLENBQXpCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLEtBQUssQ0FBM0I7O0lBRXFCQzs7Ozs7U0FHakJDLE9BQUEsY0FBS0MsSUFBTCxFQUFXO0FBQ1AsU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLQyxXQUFMLEdBQW1CSCxJQUFqQztBQUNBSSxJQUFBQSxRQUFRLENBQUNDLGVBQVQsQ0FBeUJDLFNBQXpCLENBQW1DQyxJQUFuQyxDQUF3Q0MsSUFBeEMsQ0FBNkMsSUFBN0M7O0FBQ0FSLElBQUFBLElBQUksQ0FBQ1MsSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxZQUFqQixDQUE4QixJQUE5Qjs7QUFDQSxTQUFLQyxPQUFM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QUFRLENBQUNNLE1BQVQsQ0FBZ0IsY0FBaEIsRUFBZ0MsSUFBaEM7QUFDQU4sSUFBQUEsUUFBUSxDQUFDTSxNQUFULENBQWdCLHVCQUFoQixFQUF5QyxJQUF6QztBQUNBTixJQUFBQSxRQUFRLENBQUNNLE1BQVQsQ0FBZ0IsU0FBaEIsRUFBMkJILFdBQVcsR0FBRyxHQUFkLElBQXFCbkosSUFBSSxDQUFDNkgsVUFBckQ7QUFDQW1CLElBQUFBLFFBQVEsQ0FBQ00sTUFBVCxDQUFnQixnQkFBaEIsRUFBa0N0SixJQUFJLENBQUM2SCxVQUFMLEdBQWtCLENBQWxCLEdBQXNCLENBQXhEOztBQUNBLFFBQUltQixRQUFRLENBQUNPLFNBQVQsQ0FBbUIsaUNBQW5CLE1BQTBEbEcsU0FBMUQsSUFBdUVuQixFQUFFLENBQUNzSCxHQUFILENBQU9DLFdBQVAsQ0FBbUIsMEJBQW5CLENBQTNFLEVBQTJIO0FBQ3ZIVCxNQUFBQSxRQUFRLENBQUNNLE1BQVQsQ0FBZ0IsaUNBQWhCLEVBQW1ELElBQW5EO0FBQ0g7O0FBQ0QvQixJQUFBQSxNQUFNLENBQUNtQyxTQUFQLENBQWlCVixRQUFRLENBQUNXLE1BQVQsQ0FBZ0JDLFVBQWpDO0FBQ0g7O1NBRURDLGNBQUEscUJBQWE3SixJQUFiLEVBQW1CSSxRQUFuQixFQUE2QjtBQUN6QixTQUFLUSxPQUFMLENBQWFtSSxNQUFiO0FBQ0g7O1NBQ0RlLFVBQUEsbUJBQVUsQ0FDVCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcclxuXHJcbmNvbnN0IExhYmVsID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJyk7XHJcbmNvbnN0IExhYmVsU2hhZG93ID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsU2hhZG93Jyk7XHJcbmNvbnN0IExhYmVsT3V0bGluZSA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uLy4uL2NvbXBvbmVudHMvQ0NMYWJlbE91dGxpbmUnKTtcclxuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xyXG5cclxuXHJcblxyXG5jb25zdCBVUERBVEVfQ09OVEVOVCA9IDEgPDwgMDtcclxuY29uc3QgVVBEQVRFX0ZPTlQgPSAxIDw8IDE7XHJcbmNvbnN0IFVQREFURV9FRkZFQ1QgPSAxIDw8IDI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXRpdmVUVEYge1xyXG5cclxuXHJcbiAgICBpbml0KGNvbXApIHtcclxuICAgICAgICB0aGlzLmxhYmVsTWF0ZXJpYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2xhYmVsID0gdGhpcy5fcmVuZGVyQ29tcCA9IGNvbXA7XHJcbiAgICAgICAgcmVuZGVyZXIuQ3VzdG9tQXNzZW1ibGVyLnByb3RvdHlwZS5jdG9yLmNhbGwodGhpcyk7XHJcbiAgICAgICAgY29tcC5ub2RlLl9wcm94eS5zZXRBc3NlbWJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gbmV3IGpzYi5MYWJlbFJlbmRlcmVyKCk7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0LmluaXQoY29tcCk7XHJcbiAgICAgICAgdGhpcy5fY2ZnID0gbmV3IERhdGFWaWV3KHRoaXMuX2xheW91dC5fY2ZnKTtcclxuICAgICAgICB0aGlzLl9sYXlvdXRJbmZvID0gbmV3IERhdGFWaWV3KHRoaXMuX2xheW91dC5fbGF5b3V0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2ZnRmllbGRzID0ganNiLkxhYmVsUmVuZGVyZXIuX2NmZ0ZpZWxkcztcclxuICAgICAgICB0aGlzLl9sYXlvdXRGaWVsZHMgPSBqc2IuTGFiZWxSZW5kZXJlci5fbGF5b3V0RmllbGRzO1xyXG4gICAgICAgIHRoaXMuX2xheW91dC5iaW5kTm9kZVByb3h5KGNvbXAubm9kZS5fcHJveHkpO1xyXG4gICAgICAgIHRoaXMuX2JpbmRNYXRlcmlhbChjb21wKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgX3NldEJ1ZmZlckZsYWcoZHYsIG9mZnNldCwgc2l6ZSwgIHR5cGUsIGZsYWcpe1xyXG4gICAgICAgIGlmICggdHlwZSA9PSBcImludDhcIiAgJiYgc2l6ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCB2ID0gZHYuZ2V0SW50OChvZmZzZXQpO1xyXG4gICAgICAgICAgICBkdi5zZXRJbnQ4KG9mZnNldCwgZmxhZyB8IHYpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiaW50MzJcIiAmJiBzaXplID09IDQpIHtcclxuICAgICAgICAgICAgbGV0IHYgPSBkdi5nZXRJbnQzMihvZmZzZXQsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xyXG4gICAgICAgICAgICBkdi5zZXRJbnQzMihvZmZzZXQsIGZsYWd8diAsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oXCJmbGFnIHN0b3JhZ2UgdHlwZSBzaG91bGQgYmUgaW50OC9pbnQzMiBvbmx5LCB0eXBlL3NpemUgLT4gXCIgKyB0eXBlK1wiL1wiK3NpemUgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVDZmdGbGFnKGZsYWcpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSB0aGlzLl9jZmdGaWVsZHMudXBkYXRlRmxhZ3M7XHJcbiAgICAgICAgdGhpcy5fc2V0QnVmZmVyRmxhZyh0aGlzLl9jZmcsIGZpZWxkLm9mZnNldCwgZmllbGQuc2l6ZSwgZmllbGQudHlwZSwgZmxhZyk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldEJ1ZmZlclZhbHVlKGR2LCBvZmZzZXQsIHNpemUsIHR5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYodHlwZSA9PSBcImZsb2F0XCIgJiYgc2l6ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIGR2LnNldEZsb2F0MzIob2Zmc2V0LCB2YWx1ZSwganNiLl9faXNMaXR0bGVFbmRpYW5fXyk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT0gXCJpbnQzMlwiICYmIHNpemUgPT0gNCkge1xyXG4gICAgICAgICAgICBkdi5zZXRJbnQzMihvZmZzZXQsIHZhbHVlLCBqc2IuX19pc0xpdHRsZUVuZGlhbl9fKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJib29sXCIgJiYgc2l6ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGR2LnNldEludDgob2Zmc2V0LCAhIXZhbHVlID8gMSA6IDAsIGpzYi5fX2lzTGl0dGxlRW5kaWFuX18pO1xyXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiQ29sb3I0QlwiICYmIHNpemUgPT0gNCkge1xyXG4gICAgICAgICAgICBkdi5zZXRVaW50OChvZmZzZXQsIHZhbHVlLnIpO1xyXG4gICAgICAgICAgICBkdi5zZXRVaW50OChvZmZzZXQgKyAxLCB2YWx1ZS5nKTtcclxuICAgICAgICAgICAgZHYuc2V0VWludDgob2Zmc2V0ICsgMiwgdmFsdWUuYik7XHJcbiAgICAgICAgICAgIGR2LnNldFVpbnQ4KG9mZnNldCArIDMsIHZhbHVlLmEpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiaW50OFwiICYmIHNpemUgPT0gMSkge1xyXG4gICAgICAgICAgICBkdi5zZXRVaW50OChvZmZzZXQsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiZG9udCBrbm93IGhvdyB0byBzZXQgdmFsdWUgdG8gYnVmZmVyLCB0eXBlL3NpemUgLT4gXCIgKyB0eXBlK1wiL1wiK3NpemUgKyBcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9zZXRGaWVsZFZhbHVlKGR2LCBkZXNjLCBmaWVsZF9uYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCBmaWVsZCA9IGRlc2NbZmllbGRfbmFtZV07XHJcbiAgICAgICAgdGhpcy5fc2V0QnVmZmVyVmFsdWUoZHYsIGZpZWxkLm9mZnNldCwgZmllbGQuc2l6ZSwgZmllbGQudHlwZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRCdWZmZXJWYWx1ZShkdiwgb2Zmc2V0LCBzaXplLCB0eXBlKSB7XHJcbiAgICAgICAgaWYodHlwZSA9PSBcImZsb2F0XCIgJiYgc2l6ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkdi5nZXRGbG9hdDMyKG9mZnNldCwganNiLl9faXNMaXR0bGVFbmRpYW5fXyk7XHJcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT0gXCJpbnQzMlwiICYmIHNpemUgPT0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZHYuZ2V0SW50MzIob2Zmc2V0LCBqc2IuX19pc0xpdHRsZUVuZGlhbl9fKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gXCJib29sXCIgJiYgc2l6ZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkdi5nZXRJbnQ4KG9mZnNldCwganNiLl9faXNMaXR0bGVFbmRpYW5fXykgIT0gMDtcclxuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PSBcIkNvbG9yNEJcIiAmJiBzaXplID09IDQpIHtcclxuICAgICAgICAgICAgbGV0IHIgPSBkdi5nZXRVaW50OChvZmZzZXQpO1xyXG4gICAgICAgICAgICBsZXQgZyA9IGR2LmdldFVpbnQ4KG9mZnNldCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgYiA9IGR2LmdldFVpbnQ4KG9mZnNldCArIDIpO1xyXG4gICAgICAgICAgICBsZXQgYSA9IGR2LmdldFVpbnQ4KG9mZnNldCArIDMpO1xyXG4gICAgICAgICAgICByZXR1cm4ge3IsIGcsIGIsIGF9O1xyXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09IFwiaW50OFwiICYmIHNpemUgPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZHYuZ2V0VWludDgob2Zmc2V0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiZG9udCBrbm93IGhvdyB0byBnZXQgdmFsdWUgZnJvbSBidWZmZXIsIHR5cGUvc2l6ZSAtPiBcIiArIHR5cGUrXCIvXCIrc2l6ZSArIFwiLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEZpZWxkVmFsdWUoZHYsIGRlc2MsIGZpZWxkX25hbWUpIHtcclxuICAgICAgICBsZXQgZmllbGQgPSBkZXNjW2ZpZWxkX25hbWVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRCdWZmZXJWYWx1ZShkdiwgZmllbGQub2Zmc2V0LCBmaWVsZC5zaXplLCBmaWVsZC50eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0TGF5b3V0VmFsdWUoZmllbGRfbmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRGaWVsZFZhbHVlKHRoaXMuX2xheW91dEluZm8sIHRoaXMuX2xheW91dEZpZWxkcywgZmllbGRfbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldExheW91dFZhbHVlKGZpZWxkX25hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldEZpZWxkVmFsdWUodGhpcy5fbGF5b3V0SW5mbywgdGhpcy5fbGF5b3V0RmllbGRzLCBmaWVsZF9uYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnKFVQREFURV9DT05URU5UKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlQ2ZnRmxhZ19Gb250KCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWcoVVBEQVRFX0ZPTlQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfY29sb3JFcXVhbChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIGEuciA9PSBiLnIgJiYgYS5nID09IGIuZyAmJiBhLmIgPT0gYi5iICYmIGEuYSA9PSBiLmE7XHJcbiAgICB9IFxyXG5cclxuICAgIF9jb2xvclRvT2JqKHIsIGcsIGIsIGEpIHtcclxuICAgICAgICByZXR1cm4ge3IsIGcsIGIsIGF9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0cmluZyhzdHIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc3RyICE9IHRoaXMuX2xheW91dC5zdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnN0cmluZyA9IHN0cjtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEZvbnRQYXRoKHBhdGgpIHtcclxuICAgICAgICBpZihwYXRoICE9IHRoaXMuX2xheW91dC5mb250UGF0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQuZm9udFBhdGggPSBwYXRoO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0ZvbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Rm9udFNpemUoZm9udFNpemUsIGZvbnRTaXplUmV0aW5hKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBvbGRmb250c2l6ZSA9IHRoaXMuX2dldEZpZWxkVmFsdWUodGhpcy5fY2ZnLCB0aGlzLl9jZmdGaWVsZHMsIFwiZm9udFNpemVcIik7XHJcbiAgICAgICAgaWYob2xkZm9udHNpemUgIT0gZm9udFNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0RmllbGRWYWx1ZSh0aGlzLl9jZmcsIHRoaXMuX2NmZ0ZpZWxkcywgXCJmb250U2l6ZVwiLCBmb250U2l6ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldEZpZWxkVmFsdWUodGhpcy5fY2ZnLCB0aGlzLl9jZmdGaWVsZHMsIFwiZm9udFNpemVSZXRpbmFcIiwgZm9udFNpemVSZXRpbmEpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0ZvbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3V0bGluZShvdXRsaW5lKSB7XHJcbiAgICAgICAgbGV0IG9sZE91dGxpbmUgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcIm91dGxpbmVTaXplXCIpO1xyXG4gICAgICAgIGlmKChvbGRPdXRsaW5lID4gMCkgIT0gKG91dGxpbmUgPiAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0ZvbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob2xkT3V0bGluZSAhPSBvdXRsaW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcIm91dGxpbmVTaXplXCIsIG91dGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRPdXRsaW5lQ29sb3IoY29sb3IpIHtcclxuICAgICAgICBsZXQgb2xkQ29sb3IgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZSggXCJvdXRsaW5lQ29sb3JcIik7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NvbG9yRXF1YWwob2xkQ29sb3IsIGNvbG9yKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcIm91dGxpbmVDb2xvclwiLCBjb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMaW5lSGVpZ2h0KGxpbmVIZWlnaHQpIHtcclxuICAgICAgICBsZXQgb2xkTGluZUhlaWdodCA9IHRoaXMuX2dldExheW91dFZhbHVlKFwibGluZUhlaWdodFwiKTtcclxuICAgICAgICBpZihvbGRMaW5lSGVpZ2h0ICE9IGxpbmVIZWlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJsaW5lSGVpZ2h0XCIsIGxpbmVIZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0T3ZlckZsb3cob3ZlcmZsb3cpIHtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcIm92ZXJmbG93XCIpO1xyXG4gICAgICAgIGlmKG9sZFZhbHVlICE9IG92ZXJmbG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwib3ZlcmZsb3dcIiwgb3ZlcmZsb3cpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RW5hYmxlV3JhcCh2YWx1ZSkge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX2dldExheW91dFZhbHVlKFwid3JhcFwiKTtcclxuICAgICAgICBpZihvbGRWYWx1ZSAhPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcIndyYXBcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmVydGljYWxBbGlnbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX2dldExheW91dFZhbHVlKFwidmFsaWduXCIpO1xyXG4gICAgICAgIGlmKG9sZFZhbHVlICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwidmFsaWduXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEhvcml6b250YWxBbGlnbih2YWx1ZSkge1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiaGFsaWduXCIpO1xyXG4gICAgICAgIGlmKG9sZFZhbHVlICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwiaGFsaWduXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldENvbnRlbnRTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBsZXQgb2xkV2lkdGggPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcIndpZHRoXCIpO1xyXG4gICAgICAgIGxldCBvbGRIZWlnaHQgPSB0aGlzLl9nZXRMYXlvdXRWYWx1ZShcImhlaWdodFwiKTtcclxuICAgICAgICBpZihvbGRXaWR0aCAhPSB3aWR0aCB8fCBvbGRIZWlnaHQgIT0gaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwiaGVpZ2h0XCIsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwid2lkdGhcIiwgd2lkdGgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QW5jaG9yUG9pbnQoeCwgeSkge1xyXG4gICAgICAgIGxldCBvbGRYID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJhbmNob3JYXCIpO1xyXG4gICAgICAgIGxldCBvbGRZID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJhbmNob3JZXCIpO1xyXG4gICAgICAgIGlmKG9sZFggIT0geCB8fCBvbGRZICE9IHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJhbmNob3JYXCIsIHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcImFuY2hvcllcIiwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihjb2xvcikge1xyXG4gICAgICAgIGxldCBvbGRDb2xvciA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiY29sb3JcIik7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NvbG9yRXF1YWwob2xkQ29sb3IsIGNvbG9yKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcImNvbG9yXCIsIGNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFNoYWRvdyggeCwgeSwgYmx1cikge1xyXG4gICAgICAgIGxldCBvbGRCbHVyID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dCbHVyXCIpO1xyXG4gICAgICAgIGxldCBvbGRYID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dYXCIpO1xyXG4gICAgICAgIGxldCBvbGRZID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dZXCIpO1xyXG4gICAgICAgIGlmKChvbGRCbHVyID4gMCkgIT0gKGJsdXIgPiAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0ZvbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVwZGF0ZUNvbnRlbnQgPSBmYWxzZTtcclxuICAgICAgICBpZihvbGRCbHVyICE9IGJsdXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJzaGFkb3dCbHVyXCIsIGJsdXIpO1xyXG4gICAgICAgICAgICB1cGRhdGVDb250ZW50ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob2xkWCAhPSB4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwic2hhZG93WFwiLCB4KTtcclxuICAgICAgICAgICAgdXBkYXRlQ29udGVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9sZFkgIT0geSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInNoYWRvd1lcIiwgeSk7XHJcbiAgICAgICAgICAgIHVwZGF0ZUNvbnRlbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih1cGRhdGVDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNmZ0ZsYWdfQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTaGFkb3dDb2xvcihjb2xvcikge1xyXG4gICAgICAgIGxldCBvbGRDb2xvciA9IHRoaXMuX2dldExheW91dFZhbHVlKFwic2hhZG93Q29sb3JcIik7XHJcbiAgICAgICAgaWYoIXRoaXMuX2NvbG9yRXF1YWwob2xkQ29sb3IsIGNvbG9yKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcInNoYWRvd0NvbG9yXCIsIGNvbG9yKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEl0YWxpYyhlbmFibGVkKSB7XHJcbiAgICAgICAgbGV0IG9sZEl0YWxpYyA9IHRoaXMuX2dldExheW91dFZhbHVlKFwiaXRhbGljXCIpO1xyXG4gICAgICAgIGlmKG9sZEl0YWxpYyE9ZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXRMYXlvdXRWYWx1ZShcIml0YWxpY1wiLCBlbmFibGVkKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEJvbGQoYm9sZCkge1xyXG4gICAgICAgIGxldCBvbGRCb2xkID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJib2xkXCIpO1xyXG4gICAgICAgIGlmKG9sZEJvbGQhPWJvbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJib2xkXCIsIGJvbGQpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Gb250KCk7IC8vZW5hYmxlIHNkZlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRVbmRlcmxpbmUodW5kZXJsaW5lKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBvbGRCb2xkID0gdGhpcy5fZ2V0TGF5b3V0VmFsdWUoXCJ1bmRlcmxpbmVcIik7XHJcbiAgICAgICAgaWYob2xkQm9sZCAhPSB1bmRlcmxpbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TGF5b3V0VmFsdWUoXCJ1bmRlcmxpbmVcIiwgdW5kZXJsaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2ZnRmxhZ19Db250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFNwYWNpbmdYKHgpIHtcclxuICAgICAgICBsZXQgb2xkWCA9IHRoaXMuX2dldExheW91dFZhbHVlKFwic3BhY2VYXCIpO1xyXG4gICAgICAgIGlmKG9sZFggIT0geCAmJiB0eXBlb2YgeCA9PSBcIm51bWJlclwiICAmJiAhIGlzTmFOKHgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldExheW91dFZhbHVlKFwic3BhY2VYXCIsIHgpO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDZmdGbGFnX0NvbnRlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUmVuZGVyRGF0YShjb21wKSB7XHJcblxyXG4gICAgICAgIGlmICghY29tcC5fdmVydHNEaXJ0eSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoY29tcC5mb250ICYmIGNvbXAuZm9udC5uYXRpdmVVcmwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRGb250UGF0aChjYy5hc3NldE1hbmFnZXIuY2FjaGVNYW5hZ2VyLmdldENhY2hlKGNvbXAuZm9udC5uYXRpdmVVcmwpIHx8IGNvbXAuZm9udC5uYXRpdmVVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGF5b3V0ID0gdGhpcy5fbGF5b3V0O1xyXG4gICAgICAgIGxldCBjID0gY29tcC5ub2RlLmNvbG9yO1xyXG4gICAgICAgIGxldCBub2RlID0gY29tcC5ub2RlO1xyXG4gICAgICAgIGxldCByZXRpbmFTaXplID0gY29tcC5mb250U2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdHJpbmcoY29tcC5zdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuc2V0Rm9udFNpemUoY29tcC5mb250U2l6ZSwgcmV0aW5hU2l6ZSAvIDcyICogY29tcC5mb250U2l6ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRMaW5lSGVpZ2h0KGNvbXAubGluZUhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmFibGVXcmFwKGNvbXAuZW5hYmxlV3JhcFRleHQpO1xyXG4gICAgICAgIHRoaXMuc2V0SXRhbGljKGNvbXAuZW5hYmxlSXRhbGljKTtcclxuICAgICAgICB0aGlzLnNldFVuZGVybGluZShjb21wLmVuYWJsZVVuZGVybGluZSk7XHJcbiAgICAgICAgdGhpcy5zZXRCb2xkKGNvbXAuZW5hYmxlQm9sZCk7XHJcbiAgICAgICAgdGhpcy5zZXRPdmVyRmxvdyhjb21wLm92ZXJmbG93KTtcclxuICAgICAgICB0aGlzLnNldFZlcnRpY2FsQWxpZ24oY29tcC52ZXJ0aWNhbEFsaWduKTtcclxuICAgICAgICB0aGlzLnNldEhvcml6b250YWxBbGlnbihjb21wLmhvcml6b250YWxBbGlnbik7XHJcbiAgICAgICAgdGhpcy5zZXRTcGFjaW5nWChjb21wLnNwYWNpbmdYKTtcclxuICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKG5vZGUuZ2V0Q29udGVudFNpemUoKS53aWR0aCwgbm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5zZXRBbmNob3JQb2ludChub2RlLmFuY2hvclgsIG5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLl9jb2xvclRvT2JqKGMuZ2V0UigpLCBjLmdldEcoKSwgYy5nZXRCKCksIE1hdGguY2VpbChjLmdldEEoKSAqIG5vZGUub3BhY2l0eSAvIDI1NSkpKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBzaGFkb3cgPSBub2RlLmdldENvbXBvbmVudChjYy5MYWJlbFNoYWRvdyk7XHJcbiAgICAgICAgaWYgKHNoYWRvdyAmJiBzaGFkb3cuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBsZXQgc2hhZG93Q29sb3IgPSBzaGFkb3cuY29sb3I7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KHNoYWRvdy5vZmZzZXQueCwgc2hhZG93Lm9mZnNldC55LCBzaGFkb3cuYmx1cik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93Q29sb3IodGhpcy5fY29sb3JUb09iaihzaGFkb3dDb2xvci5nZXRSKCksIHNoYWRvd0NvbG9yLmdldEcoKSwgc2hhZG93Q29sb3IuZ2V0QigpLCBNYXRoLmNlaWwoc2hhZG93Q29sb3IuZ2V0QSgpICogbm9kZS5vcGFjaXR5IC8gMjU1KSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hhZG93KDAsIDAsIC0xKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRURk1hdGVyaWFsKGNvbXApO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxheW91dC5yZW5kZXIoKTtcclxuICAgICAgICAvL2NvbXAuX3ZlcnRzRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBfYmluZE1hdGVyaWFsKGNvbXApIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmxhYmVsTWF0ZXJpYWw7XHJcbiAgICAgICAgaWYoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKFwiMmQtbGFiZWxcIiwgY29tcCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxNYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVRURk1hdGVyaWFsKGNvbXApIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9iaW5kTWF0ZXJpYWwoY29tcClcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX2xhYmVsLm5vZGU7XHJcbiAgICAgICAgbGV0IGxheW91dCA9IHRoaXMuX2xheW91dDtcclxuICAgICAgICBsZXQgb3V0bGluZSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XHJcbiAgICAgICAgbGV0IG91dGxpbmVTaXplID0gMDtcclxuICAgICAgICBpZiAob3V0bGluZSAmJiBvdXRsaW5lLmVuYWJsZWQgJiYgb3V0bGluZS53aWR0aCA+IDApIHtcclxuICAgICAgICAgICAgb3V0bGluZVNpemUgPSBNYXRoLm1heChNYXRoLm1pbihvdXRsaW5lLndpZHRoIC8gMTAsIDAuNCksIDAuMSk7XHJcbiAgICAgICAgICAgIGxldCBjID0gb3V0bGluZS5jb2xvcjtcclxuICAgICAgICAgICAgdGhpcy5zZXRPdXRsaW5lQ29sb3IodGhpcy5fY29sb3JUb09iaihjLmdldFIoKSwgYy5nZXRHKCksIGMuZ2V0QigpLCBNYXRoLmNlaWwoYy5nZXRBKCkgKiBub2RlLm9wYWNpdHkgLyAyNTUpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0T3V0bGluZShvdXRsaW5lU2l6ZSk7XHJcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCB0cnVlKTtcclxuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFX0FMUEhBT05MWScsIHRydWUpO1xyXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnVVNFX1NERicsIG91dGxpbmVTaXplID4gMC4wIHx8IGNvbXAuZW5hYmxlQm9sZCApO1xyXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnVVNFX1NERl9FWFRFTkQnLCBjb21wLmVuYWJsZUJvbGQgPyAxIDogMCk7XHJcbiAgICAgICAgaWYgKG1hdGVyaWFsLmdldERlZmluZSgnQ0NfU1VQUE9SVF9zdGFuZGFyZF9kZXJpdmF0aXZlcycpICE9PSB1bmRlZmluZWQgJiYgY2Muc3lzLmdsRXh0ZW5zaW9uKCdPRVNfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSkge1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1NVUFBPUlRfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGF5b3V0LnNldEVmZmVjdChtYXRlcmlhbC5lZmZlY3QuX25hdGl2ZU9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0LnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgZ2V0VmZtdCgpIHtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiLyJ9