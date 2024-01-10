
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/2d/simple.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler2d = _interopRequireDefault(require("../../../../assembler-2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SimpleSpriteAssembler = /*#__PURE__*/function (_Assembler2D) {
  _inheritsLoose(SimpleSpriteAssembler, _Assembler2D);

  function SimpleSpriteAssembler() {
    return _Assembler2D.apply(this, arguments) || this;
  }

  var _proto = SimpleSpriteAssembler.prototype;

  _proto.updateRenderData = function updateRenderData(sprite) {
    this.packToDynamicAtlas(sprite, sprite._spriteFrame);

    if (sprite._vertsDirty) {
      this.updateUVs(sprite);
      this.updateVerts(sprite);
      sprite._vertsDirty = false;
    }
  };

  _proto.updateUVs = function updateUVs(sprite) {
    var uv = sprite._spriteFrame.uv;
    var uvOffset = this.uvOffset;
    var floatsPerVert = this.floatsPerVert;
    var verts = this._renderData.vDatas[0];

    for (var i = 0; i < 4; i++) {
      var srcOffset = i * 2;
      var dstOffset = floatsPerVert * i + uvOffset;
      verts[dstOffset] = uv[srcOffset];
      verts[dstOffset + 1] = uv[srcOffset + 1];
    }
  };

  _proto.updateVerts = function updateVerts(sprite) {
    var node = sprite.node,
        cw = node.width,
        ch = node.height,
        appx = node.anchorX * cw,
        appy = node.anchorY * ch,
        l,
        b,
        r,
        t;

    if (sprite.trim) {
      l = -appx;
      b = -appy;
      r = cw - appx;
      t = ch - appy;
    } else {
      var frame = sprite.spriteFrame,
          ow = frame._originalSize.width,
          oh = frame._originalSize.height,
          rw = frame._rect.width,
          rh = frame._rect.height,
          offset = frame._offset,
          scaleX = cw / ow,
          scaleY = ch / oh;
      var trimLeft = offset.x + (ow - rw) / 2;
      var trimRight = offset.x - (ow - rw) / 2;
      var trimBottom = offset.y + (oh - rh) / 2;
      var trimTop = offset.y - (oh - rh) / 2;
      l = trimLeft * scaleX - appx;
      b = trimBottom * scaleY - appy;
      r = cw + trimRight * scaleX - appx;
      t = ch + trimTop * scaleY - appy;
    }

    var local = this._local;
    local[0] = l;
    local[1] = b;
    local[2] = r;
    local[3] = t;
    this.updateWorldVerts(sprite);
  };

  return SimpleSpriteAssembler;
}(_assembler2d["default"]);

exports["default"] = SimpleSpriteAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFwyZFxcc2ltcGxlLmpzIl0sIm5hbWVzIjpbIlNpbXBsZVNwcml0ZUFzc2VtYmxlciIsInVwZGF0ZVJlbmRlckRhdGEiLCJzcHJpdGUiLCJwYWNrVG9EeW5hbWljQXRsYXMiLCJfc3ByaXRlRnJhbWUiLCJfdmVydHNEaXJ0eSIsInVwZGF0ZVVWcyIsInVwZGF0ZVZlcnRzIiwidXYiLCJ1dk9mZnNldCIsImZsb2F0c1BlclZlcnQiLCJ2ZXJ0cyIsIl9yZW5kZXJEYXRhIiwidkRhdGFzIiwiaSIsInNyY09mZnNldCIsImRzdE9mZnNldCIsIm5vZGUiLCJjdyIsIndpZHRoIiwiY2giLCJoZWlnaHQiLCJhcHB4IiwiYW5jaG9yWCIsImFwcHkiLCJhbmNob3JZIiwibCIsImIiLCJyIiwidCIsInRyaW0iLCJmcmFtZSIsInNwcml0ZUZyYW1lIiwib3ciLCJfb3JpZ2luYWxTaXplIiwib2giLCJydyIsIl9yZWN0IiwicmgiLCJvZmZzZXQiLCJfb2Zmc2V0Iiwic2NhbGVYIiwic2NhbGVZIiwidHJpbUxlZnQiLCJ4IiwidHJpbVJpZ2h0IiwidHJpbUJvdHRvbSIsInkiLCJ0cmltVG9wIiwibG9jYWwiLCJfbG9jYWwiLCJ1cGRhdGVXb3JsZFZlcnRzIiwiQXNzZW1ibGVyMkQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7O0lBRXFCQTs7Ozs7Ozs7O1NBQ2pCQyxtQkFBQSwwQkFBa0JDLE1BQWxCLEVBQTBCO0FBQ3RCLFNBQUtDLGtCQUFMLENBQXdCRCxNQUF4QixFQUFnQ0EsTUFBTSxDQUFDRSxZQUF2Qzs7QUFFQSxRQUFJRixNQUFNLENBQUNHLFdBQVgsRUFBd0I7QUFDcEIsV0FBS0MsU0FBTCxDQUFlSixNQUFmO0FBQ0EsV0FBS0ssV0FBTCxDQUFpQkwsTUFBakI7QUFDQUEsTUFBQUEsTUFBTSxDQUFDRyxXQUFQLEdBQXFC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QUMsR0FBR21CLFVBQVUsR0FBR0osTUFBYixHQUFzQmxCLElBQTFCO0FBQ0FJLE1BQUFBLENBQUMsR0FBR1YsRUFBRSxHQUFHMkIsU0FBUyxHQUFHSixNQUFqQixHQUEwQm5CLElBQTlCO0FBQ0FPLE1BQUFBLENBQUMsR0FBR1QsRUFBRSxHQUFHNEIsT0FBTyxHQUFHTixNQUFmLEdBQXdCbEIsSUFBNUI7QUFDSDs7QUFFRCxRQUFJeUIsS0FBSyxHQUFHLEtBQUtDLE1BQWpCO0FBQ0FELElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV3ZCLENBQVg7QUFDQXVCLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV3RCLENBQVg7QUFDQXNCLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV3JCLENBQVg7QUFDQXFCLElBQUFBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBV3BCLENBQVg7QUFDQSxTQUFLc0IsZ0JBQUwsQ0FBc0JqRCxNQUF0QjtBQUNIOzs7RUF6RDhDa0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBBc3NlbWJsZXIyRCBmcm9tICcuLi8uLi8uLi8uLi9hc3NlbWJsZXItMmQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2ltcGxlU3ByaXRlQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyMkQge1xyXG4gICAgdXBkYXRlUmVuZGVyRGF0YSAoc3ByaXRlKSB7XHJcbiAgICAgICAgdGhpcy5wYWNrVG9EeW5hbWljQXRsYXMoc3ByaXRlLCBzcHJpdGUuX3Nwcml0ZUZyYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHNwcml0ZS5fdmVydHNEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVVWcyhzcHJpdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZlcnRzKHNwcml0ZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5fdmVydHNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVVnMgKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCB1diA9IHNwcml0ZS5fc3ByaXRlRnJhbWUudXY7XHJcbiAgICAgICAgbGV0IHV2T2Zmc2V0ID0gdGhpcy51dk9mZnNldDtcclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBsZXQgdmVydHMgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3JjT2Zmc2V0ID0gaSAqIDI7XHJcbiAgICAgICAgICAgIGxldCBkc3RPZmZzZXQgPSBmbG9hdHNQZXJWZXJ0ICogaSArIHV2T2Zmc2V0O1xyXG4gICAgICAgICAgICB2ZXJ0c1tkc3RPZmZzZXRdID0gdXZbc3JjT2Zmc2V0XTtcclxuICAgICAgICAgICAgdmVydHNbZHN0T2Zmc2V0ICsgMV0gPSB1dltzcmNPZmZzZXQgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVmVydHMgKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBub2RlID0gc3ByaXRlLm5vZGUsXHJcbiAgICAgICAgICAgIGN3ID0gbm9kZS53aWR0aCwgY2ggPSBub2RlLmhlaWdodCxcclxuICAgICAgICAgICAgYXBweCA9IG5vZGUuYW5jaG9yWCAqIGN3LCBhcHB5ID0gbm9kZS5hbmNob3JZICogY2gsXHJcbiAgICAgICAgICAgIGwsIGIsIHIsIHQ7XHJcbiAgICAgICAgaWYgKHNwcml0ZS50cmltKSB7XHJcbiAgICAgICAgICAgIGwgPSAtYXBweDtcclxuICAgICAgICAgICAgYiA9IC1hcHB5O1xyXG4gICAgICAgICAgICByID0gY3cgLSBhcHB4O1xyXG4gICAgICAgICAgICB0ID0gY2ggLSBhcHB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gc3ByaXRlLnNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICAgICAgb3cgPSBmcmFtZS5fb3JpZ2luYWxTaXplLndpZHRoLCBvaCA9IGZyYW1lLl9vcmlnaW5hbFNpemUuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgcncgPSBmcmFtZS5fcmVjdC53aWR0aCwgcmggPSBmcmFtZS5fcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBmcmFtZS5fb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgc2NhbGVYID0gY3cgLyBvdywgc2NhbGVZID0gY2ggLyBvaDtcclxuICAgICAgICAgICAgbGV0IHRyaW1MZWZ0ID0gb2Zmc2V0LnggKyAob3cgLSBydykgLyAyO1xyXG4gICAgICAgICAgICBsZXQgdHJpbVJpZ2h0ID0gb2Zmc2V0LnggLSAob3cgLSBydykgLyAyO1xyXG4gICAgICAgICAgICBsZXQgdHJpbUJvdHRvbSA9IG9mZnNldC55ICsgKG9oIC0gcmgpIC8gMjtcclxuICAgICAgICAgICAgbGV0IHRyaW1Ub3AgPSBvZmZzZXQueSAtIChvaCAtIHJoKSAvIDI7XHJcbiAgICAgICAgICAgIGwgPSB0cmltTGVmdCAqIHNjYWxlWCAtIGFwcHg7XHJcbiAgICAgICAgICAgIGIgPSB0cmltQm90dG9tICogc2NhbGVZIC0gYXBweTtcclxuICAgICAgICAgICAgciA9IGN3ICsgdHJpbVJpZ2h0ICogc2NhbGVYIC0gYXBweDtcclxuICAgICAgICAgICAgdCA9IGNoICsgdHJpbVRvcCAqIHNjYWxlWSAtIGFwcHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsb2NhbFswXSA9IGw7XHJcbiAgICAgICAgbG9jYWxbMV0gPSBiO1xyXG4gICAgICAgIGxvY2FsWzJdID0gcjtcclxuICAgICAgICBsb2NhbFszXSA9IHQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVXb3JsZFZlcnRzKHNwcml0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=