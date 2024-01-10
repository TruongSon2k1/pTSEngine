
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/ttf.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ttf = _interopRequireDefault(require("../../../../utils/label/ttf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LabelShadow = require('../../../../../components/CCLabelShadow');

var WHITE = cc.color(255, 255, 255, 255);

var WebglTTFAssembler = /*#__PURE__*/function (_TTFAssembler) {
  _inheritsLoose(WebglTTFAssembler, _TTFAssembler);

  function WebglTTFAssembler() {
    return _TTFAssembler.apply(this, arguments) || this;
  }

  var _proto = WebglTTFAssembler.prototype;

  _proto.updateUVs = function updateUVs(comp) {
    var verts = this._renderData.vDatas[0];
    var uv = comp._frame.uv;
    var uvOffset = this.uvOffset;
    var floatsPerVert = this.floatsPerVert;

    for (var i = 0; i < 4; i++) {
      var srcOffset = i * 2;
      var dstOffset = floatsPerVert * i + uvOffset;
      verts[dstOffset] = uv[srcOffset];
      verts[dstOffset + 1] = uv[srcOffset + 1];
    }
  };

  _proto.updateColor = function updateColor(comp) {
    WHITE._fastSetA(comp.node._color.a);

    var color = WHITE._val;

    _TTFAssembler.prototype.updateColor.call(this, comp, color);
  };

  _proto.updateVerts = function updateVerts(comp) {
    var node = comp.node,
        canvasWidth = comp._ttfTexture.width,
        canvasHeight = comp._ttfTexture.height,
        appx = node.anchorX * node.width,
        appy = node.anchorY * node.height;
    var shadow = LabelShadow && comp.getComponent(LabelShadow);

    if (shadow && shadow._enabled) {
      // adapt size changed caused by shadow
      var offsetX = (canvasWidth - node.width) / 2;
      var offsetY = (canvasHeight - node.height) / 2;
      var shadowOffset = shadow.offset;

      if (-shadowOffset.x > offsetX) {
        // expand to left
        appx += canvasWidth - node.width;
      } else if (offsetX > shadowOffset.x) {
        // expand to left and right
        appx += offsetX - shadowOffset.x;
      } else {// expand to right, no need to change render position
      }

      if (-shadowOffset.y > offsetY) {
        // expand to top
        appy += canvasHeight - node.height;
      } else if (offsetY > shadowOffset.y) {
        // expand to top and bottom
        appy += offsetY - shadowOffset.y;
      } else {// expand to bottom, no need to change render position
      }
    }

    var local = this._local;
    local[0] = -appx;
    local[1] = -appy;
    local[2] = canvasWidth - appx;
    local[3] = canvasHeight - appy;
    this.updateUVs(comp);
    this.updateWorldVerts(comp);
  };

  return WebglTTFAssembler;
}(_ttf["default"]);

exports["default"] = WebglTTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXDJkXFx0dGYuanMiXSwibmFtZXMiOlsiTGFiZWxTaGFkb3ciLCJyZXF1aXJlIiwiV0hJVEUiLCJjYyIsImNvbG9yIiwiV2ViZ2xUVEZBc3NlbWJsZXIiLCJ1cGRhdGVVVnMiLCJjb21wIiwidmVydHMiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsInV2IiwiX2ZyYW1lIiwidXZPZmZzZXQiLCJmbG9hdHNQZXJWZXJ0IiwiaSIsInNyY09mZnNldCIsImRzdE9mZnNldCIsInVwZGF0ZUNvbG9yIiwiX2Zhc3RTZXRBIiwibm9kZSIsIl9jb2xvciIsImEiLCJfdmFsIiwidXBkYXRlVmVydHMiLCJjYW52YXNXaWR0aCIsIl90dGZUZXh0dXJlIiwid2lkdGgiLCJjYW52YXNIZWlnaHQiLCJoZWlnaHQiLCJhcHB4IiwiYW5jaG9yWCIsImFwcHkiLCJhbmNob3JZIiwic2hhZG93IiwiZ2V0Q29tcG9uZW50IiwiX2VuYWJsZWQiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInNoYWRvd09mZnNldCIsIm9mZnNldCIsIngiLCJ5IiwibG9jYWwiLCJfbG9jYWwiLCJ1cGRhdGVXb3JsZFZlcnRzIiwiVFRGQXNzZW1ibGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLHlDQUFELENBQTNCOztBQUNBLElBQU1DLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsQ0FBZDs7SUFFcUJDOzs7Ozs7Ozs7U0FDakJDLFlBQUEsbUJBQVdDLElBQVgsRUFBaUI7QUFDYixRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUNBLFFBQUlDLEVBQUUsR0FBR0osSUFB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QUFLLENBQUMsQ0FBRCxDQUFMLEdBQVcsQ0FBQ1gsSUFBWjtBQUNBVyxJQUFBQSxLQUFLLENBQUMsQ0FBRCxDQUFMLEdBQVdsQixXQUFXLEdBQUdLLElBQXpCO0FBQ0FhLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV2YsWUFBWSxHQUFHSSxJQUExQjtBQUVBLFNBQUsxQixTQUFMLENBQWVDLElBQWY7QUFDQSxTQUFLc0MsZ0JBQUwsQ0FBc0J0QyxJQUF0QjtBQUNIOzs7RUFwRTBDdUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBUVEZBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvbGFiZWwvdHRmJztcclxuXHJcbmNvbnN0IExhYmVsU2hhZG93ID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsU2hhZG93Jyk7XHJcbmNvbnN0IFdISVRFID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmdsVFRGQXNzZW1ibGVyIGV4dGVuZHMgVFRGQXNzZW1ibGVyIHtcclxuICAgIHVwZGF0ZVVWcyAoY29tcCkge1xyXG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG4gICAgICAgIGxldCB1diA9IGNvbXAuX2ZyYW1lLnV2O1xyXG4gICAgICAgIGxldCB1dk9mZnNldCA9IHRoaXMudXZPZmZzZXQ7XHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNyY09mZnNldCA9IGkgKiAyO1xyXG4gICAgICAgICAgICBsZXQgZHN0T2Zmc2V0ID0gZmxvYXRzUGVyVmVydCAqIGkgKyB1dk9mZnNldDtcclxuICAgICAgICAgICAgdmVydHNbZHN0T2Zmc2V0XSA9IHV2W3NyY09mZnNldF07XHJcbiAgICAgICAgICAgIHZlcnRzW2RzdE9mZnNldCArIDFdID0gdXZbc3JjT2Zmc2V0ICsgMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbG9yIChjb21wKSB7XHJcbiAgICAgICAgV0hJVEUuX2Zhc3RTZXRBKGNvbXAubm9kZS5fY29sb3IuYSk7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gV0hJVEUuX3ZhbDtcclxuXHJcbiAgICAgICAgc3VwZXIudXBkYXRlQ29sb3IoY29tcCwgY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZlcnRzIChjb21wKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGUsXHJcbiAgICAgICAgICAgIGNhbnZhc1dpZHRoID0gY29tcC5fdHRmVGV4dHVyZS53aWR0aCxcclxuICAgICAgICAgICAgY2FudmFzSGVpZ2h0ID0gY29tcC5fdHRmVGV4dHVyZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGFwcHggPSBub2RlLmFuY2hvclggKiBub2RlLndpZHRoLFxyXG4gICAgICAgICAgICBhcHB5ID0gbm9kZS5hbmNob3JZICogbm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGxldCBzaGFkb3cgPSBMYWJlbFNoYWRvdyAmJiBjb21wLmdldENvbXBvbmVudChMYWJlbFNoYWRvdyk7XHJcbiAgICAgICAgaWYgKHNoYWRvdyAmJiBzaGFkb3cuX2VuYWJsZWQpIHtcclxuICAgICAgICAgICAgLy8gYWRhcHQgc2l6ZSBjaGFuZ2VkIGNhdXNlZCBieSBzaGFkb3dcclxuICAgICAgICAgICAgbGV0IG9mZnNldFggPSAoY2FudmFzV2lkdGggLSBub2RlLndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRZID0gKGNhbnZhc0hlaWdodCAtIG5vZGUuaGVpZ2h0KSAvIDI7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2hhZG93T2Zmc2V0ID0gc2hhZG93Lm9mZnNldDtcclxuICAgICAgICAgICAgaWYgKC1zaGFkb3dPZmZzZXQueCA+IG9mZnNldFgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byBsZWZ0XHJcbiAgICAgICAgICAgICAgICBhcHB4ICs9IChjYW52YXNXaWR0aCAtIG5vZGUud2lkdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9mZnNldFggPiBzaGFkb3dPZmZzZXQueCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXhwYW5kIHRvIGxlZnQgYW5kIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICBhcHB4ICs9IChvZmZzZXRYIC0gc2hhZG93T2Zmc2V0LngpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZXhwYW5kIHRvIHJpZ2h0LCBubyBuZWVkIHRvIGNoYW5nZSByZW5kZXIgcG9zaXRpb25cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKC1zaGFkb3dPZmZzZXQueSA+IG9mZnNldFkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byB0b3BcclxuICAgICAgICAgICAgICAgIGFwcHkgKz0gKGNhbnZhc0hlaWdodCAtIG5vZGUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvZmZzZXRZID4gc2hhZG93T2Zmc2V0LnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byB0b3AgYW5kIGJvdHRvbVxyXG4gICAgICAgICAgICAgICAgYXBweSArPSAob2Zmc2V0WSAtIHNoYWRvd09mZnNldC55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4cGFuZCB0byBib3R0b20sIG5vIG5lZWQgdG8gY2hhbmdlIHJlbmRlciBwb3NpdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsb2NhbFswXSA9IC1hcHB4O1xyXG4gICAgICAgIGxvY2FsWzFdID0gLWFwcHk7XHJcbiAgICAgICAgbG9jYWxbMl0gPSBjYW52YXNXaWR0aCAtIGFwcHg7XHJcbiAgICAgICAgbG9jYWxbM10gPSBjYW52YXNIZWlnaHQgLSBhcHB5O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVVWcyhjb21wKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVdvcmxkVmVydHMoY29tcCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9