
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/label/ttf.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ttf = _interopRequireDefault(require("../../../utils/label/ttf"));

var _renderData = _interopRequireDefault(require("../render-data"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CanvasTTFAssembler = /*#__PURE__*/function (_TTFAssembler) {
  _inheritsLoose(CanvasTTFAssembler, _TTFAssembler);

  function CanvasTTFAssembler() {
    return _TTFAssembler.apply(this, arguments) || this;
  }

  var _proto = CanvasTTFAssembler.prototype;

  _proto.init = function init() {
    this._renderData = new _renderData["default"]();
    this._renderData.dataLength = 2;
  };

  _proto.updateColor = function updateColor() {};

  _proto.updateVerts = function updateVerts(comp) {
    var renderData = this._renderData;
    var node = comp.node,
        width = node.width,
        height = node.height,
        appx = node.anchorX * width,
        appy = node.anchorY * height;
    var verts = renderData.vertices;
    verts[0].x = -appx;
    verts[0].y = -appy;
    verts[1].x = width - appx;
    verts[1].y = height - appy;
  };

  _proto._updateTexture = function _updateTexture(comp) {
    _ttf["default"].prototype._updateTexture.call(this, comp);

    var texture = comp._frame._texture;

    _utils["default"].dropColorizedImage(texture, comp.node.color);
  };

  _proto.draw = function draw(ctx, comp) {
    var node = comp.node; // Transform

    var matrix = node._worldMatrix;
    var matrixm = matrix.m;
    var a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    ctx.transform(a, b, c, d, tx, ty);
    ctx.scale(1, -1); // TODO: handle blend function
    // opacity

    _utils["default"].context.setGlobalAlpha(ctx, node.opacity / 255);

    var tex = comp._frame._texture,
        verts = this._renderData.vertices;
    var image = tex.getHtmlElementObj();
    var x = verts[0].x;
    var y = verts[0].y;
    var w = verts[1].x - x;
    var h = verts[1].y - y;
    y = -y - h;
    ctx.drawImage(image, x, y, w, h);
    return 1;
  };

  return CanvasTTFAssembler;
}(_ttf["default"]);

exports["default"] = CanvasTTFAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcbGFiZWxcXHR0Zi5qcyJdLCJuYW1lcyI6WyJDYW52YXNUVEZBc3NlbWJsZXIiLCJpbml0IiwiX3JlbmRlckRhdGEiLCJSZW5kZXJEYXRhIiwiZGF0YUxlbmd0aCIsInVwZGF0ZUNvbG9yIiwidXBkYXRlVmVydHMiLCJjb21wIiwicmVuZGVyRGF0YSIsIm5vZGUiLCJ3aWR0aCIsImhlaWdodCIsImFwcHgiLCJhbmNob3JYIiwiYXBweSIsImFuY2hvclkiLCJ2ZXJ0cyIsInZlcnRpY2VzIiwieCIsInkiLCJfdXBkYXRlVGV4dHVyZSIsIlRURkFzc2VtYmxlciIsInByb3RvdHlwZSIsImNhbGwiLCJ0ZXh0dXJlIiwiX2ZyYW1lIiwiX3RleHR1cmUiLCJ1dGlscyIsImRyb3BDb2xvcml6ZWRJbWFnZSIsImNvbG9yIiwiZHJhdyIsImN0eCIsIm1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIm1hdHJpeG0iLCJtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJ0cmFuc2Zvcm0iLCJzY2FsZSIsImNvbnRleHQiLCJzZXRHbG9iYWxBbHBoYSIsIm9wYWNpdHkiLCJ0ZXgiLCJpbWFnZSIsImdldEh0bWxFbGVtZW50T2JqIiwidyIsImgiLCJkcmF3SW1hZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRXFCQTs7Ozs7Ozs7O1NBQ2pCQyxPQUFBLGdCQUFRO0FBQ0osU0FBS0MsV0FBTCxHQUFtQixJQUFJQyxzQkFBSixFQUFuQjtBQUNBLFNBQUtELFdBQUwsQ0FBaUJFLFVBQWpCLEdBQThCLENBQTlCO0FBQ0g7O1NBRURDLGNBQUEsdUJBQWUsQ0FDZDs7U0FFREMsY0FBQSxxQkFBYUMsSUFBYixFQUFtQjtBQUNmLFFBQUlDLFVBQVUsR0FBRyxLQUFLTixXQUF0QjtBQUVBLFFBQUlPLElBQUksR0FBR0YsSUFBSSxDQUFDRSxJQUFoQjtBQUFBLFFBQ0lDLEtBQUssR0FBR0QsSUFBSSxDQUFDQyxLQURqQjtBQUFBLFFBRUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDRSxNQUZsQjtBQUFBLFFBR0lDLElBQUksR0FBR0gsSUFBSSxDQUFDSSxPQUFMLEdBQWVILEtBSDFCO0FBQUEsUUFJSUksSUFBSSxHQUFHTCxJQUFJLENBQUNNLE9BQUwsR0FBZUosTUFKMUI7QUFNQSxRQUFJSyxLQUFLLEdBQUdSLFVBQVUsQ0FBQ1MsUUFBdkI7QUFDQUQsSUFBQUEsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTRSxDQUFULEdBQWEsQ0FBQ04sSUFBZDtBQUNBSSxJQUFBQSxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNHLENBQVQsR0FBYSxDQUFDTCxJQUFkO0FBQ0FFLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0UsQ0FBVCxHQUFhUixLQUFLLEdBQUdFLElBQXJCO0FBQ0FJLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0csQ0FBVCxHQUFhUixNQUFNLEdBQUdHLElBQXRCO0FBQ0g7O1NBRURNLGlCQUFBLHdCQUFnQmIsSUFBaEIsRUFBc0I7QUFDbEJjLG9CQUFhQyxTQUFiLENBQXVCRixjQUF2QixDQUFzQ0csSUFBdEMsQ0FBMkMsSUFBM0MsRUFBaURoQixJQUFqRDs7QUFDQSxRQUFJaUIsT0FBTyxHQUFHakIsSUFBSSxDQUFDa0IsTUFBTCxDQUFZQyxRQUExQjs7QUFDQUMsc0JBQU1DLGtCQUFOLENBQXlCSixPQUF6QixFQUFrQ2pCLElBQUksQ0FBQ0UsSUFBTCxDQUFVb0IsS0FBNUM7QUFDSDs7U0FFREMsT0FBQSxjQUFNQyxHQUFOLEVBQVd4QixJQUFYLEVBQWlCO0FBQ2IsUUFBSUUsSUFBSSxHQUFHRixJQUFJLENBQUNFLElBQWhCLENBRGEsQ0FFYjs7QUFDQSxRQUFJdUIsTUFBTSxHQUFHdkIsSUFBSSxDQUFDd0IsWUFBbEI7QUFDQSxRQUFJQyxPQUFPLEdBQUdGLE1BQU0sQ0FBQ0csQ0FBckI7QUFDQSxRQUFJQyxDQUFDLEdBQUdGLE9BQU8sQ0FBQyxDQUFELENBQWY7QUFBQSxRQUFvQkcsQ0FBQyxHQUFHSCxPQUFPLENBQUMsQ0FBRCxDQUEvQjtBQUFBLFFBQW9DSSxDQUFDLEdBQUdKLE9BQU8sQ0FBQyxDQUFELENBQS9DO0FBQUEsUUFBb0RLLENBQUMsR0FBR0wsT0FBTyxDQUFDLENBQUQsQ0FBL0Q7QUFBQSxRQUNJTSxFQUFFLEdBQUdOLE9BQU8sQ0FBQyxFQUFELENBRGhCO0FBQUEsUUFDc0JPLEVBQUUsR0FBR1AsT0FBTyxDQUFDLEVBQUQsQ0FEbEM7QUFFQUgsSUFBQUEsR0FBRyxDQUFDVyxTQUFKLENBQWNOLENBQWQsRUFBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QkMsQ0FBdkIsRUFBMEJDLEVBQTFCLEVBQThCQyxFQUE5QjtBQUNBVixJQUFBQSxHQUFHLENBQUNZLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQyxDQUFkLEVBUmEsQ0FVYjtBQUVBOztBQUNBaEIsc0JBQU1pQixPQUFOLENBQWNDLGNBQWQsQ0FBNkJkLEdBQTdCLEVBQWtDdEIsSUFBSSxDQUFDcUMsT0FBTCxHQUFlLEdBQWpEOztBQUVBLFFBQUlDLEdBQUcsR0FBR3hDLElBQUksQ0FBQ2tCLE1BQUwsQ0FBWUMsUUFBdEI7QUFBQSxRQUNJVixLQUFLLEdBQUcsS0FBS2QsV0FBTCxDQUFpQmUsUUFEN0I7QUFHQSxRQUFJK0IsS0FBSyxHQUFHRCxHQUFHLENBQUNFLGlCQUFKLEVBQVo7QUFFQSxRQUFJL0IsQ0FBQyxHQUFHRixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNFLENBQWpCO0FBQ0EsUUFBSUMsQ0FBQyxHQUFHSCxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNHLENBQWpCO0FBQ0EsUUFBSStCLENBQUMsR0FBR2xDLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0UsQ0FBVCxHQUFhQSxDQUFyQjtBQUNBLFFBQUlpQyxDQUFDLEdBQUduQyxLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNHLENBQVQsR0FBYUEsQ0FBckI7QUFDQUEsSUFBQUEsQ0FBQyxHQUFHLENBQUVBLENBQUYsR0FBTWdDLENBQVY7QUFFQXBCLElBQUFBLEdBQUcsQ0FBQ3FCLFNBQUosQ0FBY0osS0FBZCxFQUFxQjlCLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQitCLENBQTNCLEVBQThCQyxDQUE5QjtBQUNBLFdBQU8sQ0FBUDtBQUNIOzs7RUEzRDJDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVFRGQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL3V0aWxzL2xhYmVsL3R0Zic7XHJcbmltcG9ydCBSZW5kZXJEYXRhIGZyb20gJy4uL3JlbmRlci1kYXRhJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1RURkFzc2VtYmxlciBleHRlbmRzIFRURkFzc2VtYmxlciB7XHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhID0gbmV3IFJlbmRlckRhdGEoKTtcclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhLmRhdGFMZW5ndGggPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbG9yICgpIHtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWZXJ0cyAoY29tcCkge1xyXG4gICAgICAgIGxldCByZW5kZXJEYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGUsXHJcbiAgICAgICAgICAgIHdpZHRoID0gbm9kZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0ID0gbm9kZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGFwcHggPSBub2RlLmFuY2hvclggKiB3aWR0aCxcclxuICAgICAgICAgICAgYXBweSA9IG5vZGUuYW5jaG9yWSAqIGhlaWdodDtcclxuXHJcbiAgICAgICAgbGV0IHZlcnRzID0gcmVuZGVyRGF0YS52ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0c1swXS54ID0gLWFwcHg7XHJcbiAgICAgICAgdmVydHNbMF0ueSA9IC1hcHB5O1xyXG4gICAgICAgIHZlcnRzWzFdLnggPSB3aWR0aCAtIGFwcHg7XHJcbiAgICAgICAgdmVydHNbMV0ueSA9IGhlaWdodCAtIGFwcHk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVRleHR1cmUgKGNvbXApIHtcclxuICAgICAgICBUVEZBc3NlbWJsZXIucHJvdG90eXBlLl91cGRhdGVUZXh0dXJlLmNhbGwodGhpcywgY29tcCk7XHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSBjb21wLl9mcmFtZS5fdGV4dHVyZTtcclxuICAgICAgICB1dGlscy5kcm9wQ29sb3JpemVkSW1hZ2UodGV4dHVyZSwgY29tcC5ub2RlLmNvbG9yKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3IChjdHgsIGNvbXApIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGNvbXAubm9kZTtcclxuICAgICAgICAvLyBUcmFuc2Zvcm1cclxuICAgICAgICBsZXQgbWF0cml4ID0gbm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IG1hdHJpeG0gPSBtYXRyaXgubTtcclxuICAgICAgICBsZXQgYSA9IG1hdHJpeG1bMF0sIGIgPSBtYXRyaXhtWzFdLCBjID0gbWF0cml4bVs0XSwgZCA9IG1hdHJpeG1bNV0sXHJcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XHJcbiAgICAgICAgY3R4LnRyYW5zZm9ybShhLCBiLCBjLCBkLCB0eCwgdHkpO1xyXG4gICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IGhhbmRsZSBibGVuZCBmdW5jdGlvblxyXG5cclxuICAgICAgICAvLyBvcGFjaXR5XHJcbiAgICAgICAgdXRpbHMuY29udGV4dC5zZXRHbG9iYWxBbHBoYShjdHgsIG5vZGUub3BhY2l0eSAvIDI1NSk7XHJcblxyXG4gICAgICAgIGxldCB0ZXggPSBjb21wLl9mcmFtZS5fdGV4dHVyZSxcclxuICAgICAgICAgICAgdmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnZlcnRpY2VzO1xyXG5cclxuICAgICAgICBsZXQgaW1hZ2UgPSB0ZXguZ2V0SHRtbEVsZW1lbnRPYmooKTtcclxuXHJcbiAgICAgICAgbGV0IHggPSB2ZXJ0c1swXS54O1xyXG4gICAgICAgIGxldCB5ID0gdmVydHNbMF0ueTtcclxuICAgICAgICBsZXQgdyA9IHZlcnRzWzFdLnggLSB4O1xyXG4gICAgICAgIGxldCBoID0gdmVydHNbMV0ueSAtIHk7XHJcbiAgICAgICAgeSA9IC0geSAtIGg7XHJcblxyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIHgsIHksIHcsIGgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9