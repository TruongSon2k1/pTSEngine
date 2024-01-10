
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCRenderTexture.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = require('../renderer');

var Texture2D = require('./CCTexture2D');

/**
 * !#en The depth buffer and stencil buffer format for RenderTexture.
 * !#zh RenderTexture 的深度缓冲以及模板缓冲格式。
 * @enum RenderTexture.DepthStencilFormat
 */
var DepthStencilFormat = cc.Enum({
  /**
   * !#en 24 bit depth buffer and 8 bit stencil buffer
   * !#zh 24 位深度缓冲和 8 位模板缓冲
   * @property RB_FMT_D24S8
   * @readonly
   * @type {number}
   */
  RB_FMT_D24S8: _gfx["default"].RB_FMT_D24S8,

  /**
   * !#en Only 8 bit stencil buffer
   * !#zh 只申请 8 位模板缓冲
   * @property RB_FMT_S8
   * @readonly
   * @type {number}
   */
  RB_FMT_S8: _gfx["default"].RB_FMT_S8,

  /**
   * !#en Only 16 bit depth buffer
   * !#zh 只申请 16 位深度缓冲
   * @property RB_FMT_D16
   * @readonly
   * @type {number}
   */
  RB_FMT_D16: _gfx["default"].RB_FMT_D16
});
/**
 * Render textures are textures that can be rendered to.
 * @class RenderTexture
 * @extends Texture2D
 */

var RenderTexture = cc.Class({
  name: 'cc.RenderTexture',
  "extends": Texture2D,
  statics: {
    DepthStencilFormat: DepthStencilFormat
  },
  ctor: function ctor() {
    this._framebuffer = null;
  },

  /**
   * !#en
   * Init the render texture with size.
   * !#zh
   * 初始化 render texture 
   * @param {Number} [width] 
   * @param {Number} [height]
   * @param {Number} [depthStencilFormat]
   * @method initWithSize
   */
  initWithSize: function initWithSize(width, height, depthStencilFormat) {
    this.width = Math.floor(width || cc.visibleRect.width);
    this.height = Math.floor(height || cc.visibleRect.height);

    this._resetUnderlyingMipmaps();

    var opts = {
      colors: [this._texture]
    };
    if (this._depthStencilBuffer) this._depthStencilBuffer.destroy();
    var depthStencilBuffer;

    if (depthStencilFormat) {
      depthStencilBuffer = new _gfx["default"].RenderBuffer(renderer.device, depthStencilFormat, width, height);

      if (depthStencilFormat === _gfx["default"].RB_FMT_D24S8) {
        opts.depthStencil = depthStencilBuffer;
      } else if (depthStencilFormat === _gfx["default"].RB_FMT_S8) {
        opts.stencil = depthStencilBuffer;
      } else if (depthStencilFormat === _gfx["default"].RB_FMT_D16) {
        opts.depth = depthStencilBuffer;
      }
    }

    this._depthStencilBuffer = depthStencilBuffer;
    if (this._framebuffer) this._framebuffer.destroy();
    this._framebuffer = new _gfx["default"].FrameBuffer(renderer.device, width, height, opts);
    this._packable = false;
    this.loaded = true;
    this.emit("load");
  },
  updateSize: function updateSize(width, height) {
    this.width = Math.floor(width || cc.visibleRect.width);
    this.height = Math.floor(height || cc.visibleRect.height);

    this._resetUnderlyingMipmaps();

    var rbo = this._depthStencilBuffer;
    if (rbo) rbo.update(this.width, this.height);
    this._framebuffer._width = width;
    this._framebuffer._height = height;
  },

  /**
   * !#en Draw a texture to the specified position
   * !#zh 将指定的图片渲染到指定的位置上
   * @param {Texture2D} texture 
   * @param {Number} x 
   * @param {Number} y 
   */
  drawTextureAt: function drawTextureAt(texture, x, y) {
    if (!texture._image || texture._image.width === 0) return;

    this._texture.updateSubImage({
      x: x,
      y: y,
      image: texture._image,
      width: texture.width,
      height: texture.height,
      level: 0,
      flipY: false,
      premultiplyAlpha: texture._premultiplyAlpha
    });
  },

  /**
   * !#en
   * Get pixels from render texture, the pixels data stores in a RGBA Uint8Array.
   * It will return a new (width * height * 4) length Uint8Array by default。
   * You can specify a data to store the pixels to reuse the data, 
   * you and can specify other params to specify the texture region to read.
   * !#zh
   * 从 render texture 读取像素数据，数据类型为 RGBA 格式的 Uint8Array 数组。
   * 默认每次调用此函数会生成一个大小为 （长 x 高 x 4） 的 Uint8Array。
   * 你可以通过传入 data 来接收像素数据，也可以通过传参来指定需要读取的区域的像素。
   * @method readPixels
   * @param {Uint8Array} [data]
   * @param {Number} [x] 
   * @param {Number} [y] 
   * @param {Number} [w] 
   * @param {Number} [h] 
   * @return {Uint8Array}
   */
  readPixels: function readPixels(data, x, y, w, h) {
    if (!this._framebuffer || !this._texture) return data;
    x = x || 0;
    y = y || 0;
    var width = w || this.width;
    var height = h || this.height;
    data = data || new Uint8Array(width * height * 4);
    var gl = cc.game._renderContext;
    var oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer.getHandle());
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, oldFBO);
    return data;
  },
  destroy: function destroy() {
    this._super();

    if (this._framebuffer) {
      this._framebuffer.destroy();

      this._framebuffer = null;
    }
  }
});
cc.RenderTexture = module.exports = RenderTexture;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NSZW5kZXJUZXh0dXJlLmpzIl0sIm5hbWVzIjpbInJlbmRlcmVyIiwicmVxdWlyZSIsIlRleHR1cmUyRCIsIkRlcHRoU3RlbmNpbEZvcm1hdCIsImNjIiwiRW51bSIsIlJCX0ZNVF9EMjRTOCIsImdmeCIsIlJCX0ZNVF9TOCIsIlJCX0ZNVF9EMTYiLCJSZW5kZXJUZXh0dXJlIiwiQ2xhc3MiLCJuYW1lIiwic3RhdGljcyIsImN0b3IiLCJfZnJhbWVidWZmZXIiLCJpbml0V2l0aFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImRlcHRoU3RlbmNpbEZvcm1hdCIsIk1hdGgiLCJmbG9vciIsInZpc2libGVSZWN0IiwiX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMiLCJvcHRzIiwiY29sb3JzIiwiX3RleHR1cmUiLCJfZGVwdGhTdGVuY2lsQnVmZmVyIiwiZGVzdHJveSIsImRlcHRoU3RlbmNpbEJ1ZmZlciIsIlJlbmRlckJ1ZmZlciIsImRldmljZSIsImRlcHRoU3RlbmNpbCIsInN0ZW5jaWwiLCJkZXB0aCIsIkZyYW1lQnVmZmVyIiwiX3BhY2thYmxlIiwibG9hZGVkIiwiZW1pdCIsInVwZGF0ZVNpemUiLCJyYm8iLCJ1cGRhdGUiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiZHJhd1RleHR1cmVBdCIsInRleHR1cmUiLCJ4IiwieSIsIl9pbWFnZSIsInVwZGF0ZVN1YkltYWdlIiwiaW1hZ2UiLCJsZXZlbCIsImZsaXBZIiwicHJlbXVsdGlwbHlBbHBoYSIsIl9wcmVtdWx0aXBseUFscGhhIiwicmVhZFBpeGVscyIsImRhdGEiLCJ3IiwiaCIsIlVpbnQ4QXJyYXkiLCJnbCIsImdhbWUiLCJfcmVuZGVyQ29udGV4dCIsIm9sZEZCTyIsImdldFBhcmFtZXRlciIsIkZSQU1FQlVGRkVSX0JJTkRJTkciLCJiaW5kRnJhbWVidWZmZXIiLCJGUkFNRUJVRkZFUiIsImdldEhhbmRsZSIsIlJHQkEiLCJVTlNJR05FRF9C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QUNMLFVBQUgsQ0FBY1QsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0I5QixLQUFwQixFQUEyQkMsTUFBM0IsRUFBbUMwQyxFQUFFLENBQUNTLElBQXRDLEVBQTRDVCxFQUFFLENBQUNVLGFBQS9DLEVBQThEZCxJQUE5RDtBQUNBSSxJQUFBQSxFQUFFLENBQUNNLGVBQUgsQ0FBbUJOLEVBQUUsQ0FBQ08sV0FBdEIsRUFBbUNKLE1BQW5DO0FBRUEsV0FBT1AsSUFBUDtBQUNILEdBekh3QjtBQTJIekI1QixFQUFBQSxPQTNIeUIscUJBMkhkO0FBQ1AsU0FBSzJDLE1BQUw7O0FBQ0EsUUFBSSxLQUFLeEQsWUFBVCxFQUF1QjtBQUNuQixXQUFLQSxZQUFMLENBQWtCYSxPQUFsQjs7QUFDQSxXQUFLYixZQUFMLEdBQW9CLElBQXBCO0FBQ0g7QUFDSjtBQWpJd0IsQ0FBVCxDQUFwQjtBQW9JQVgsRUFBRSxDQUFDTSxhQUFILEdBQW1COEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0QsYUFBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyJyk7XHJcbmNvbnN0IFRleHR1cmUyRCA9IHJlcXVpcmUoJy4vQ0NUZXh0dXJlMkQnKTtcclxuXHJcbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBkZXB0aCBidWZmZXIgYW5kIHN0ZW5jaWwgYnVmZmVyIGZvcm1hdCBmb3IgUmVuZGVyVGV4dHVyZS5cclxuICogISN6aCBSZW5kZXJUZXh0dXJlIOeahOa3seW6pue8k+WGsuS7peWPiuaooeadv+e8k+WGsuagvOW8j+OAglxyXG4gKiBAZW51bSBSZW5kZXJUZXh0dXJlLkRlcHRoU3RlbmNpbEZvcm1hdFxyXG4gKi9cclxubGV0IERlcHRoU3RlbmNpbEZvcm1hdCA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIDI0IGJpdCBkZXB0aCBidWZmZXIgYW5kIDggYml0IHN0ZW5jaWwgYnVmZmVyXHJcbiAgICAgKiAhI3poIDI0IOS9jea3seW6pue8k+WGsuWSjCA4IOS9jeaooeadv+e8k+WGslxyXG4gICAgICogQHByb3BlcnR5IFJCX0ZNVF9EMjRTOFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSQl9GTVRfRDI0Uzg6IGdmeC5SQl9GTVRfRDI0UzgsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gT25seSA4IGJpdCBzdGVuY2lsIGJ1ZmZlclxyXG4gICAgICogISN6aCDlj6rnlLPor7cgOCDkvY3mqKHmnb/nvJPlhrJcclxuICAgICAqIEBwcm9wZXJ0eSBSQl9GTVRfUzhcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkJfRk1UX1M4OiBnZnguUkJfRk1UX1M4LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE9ubHkgMTYgYml0IGRlcHRoIGJ1ZmZlclxyXG4gICAgICogISN6aCDlj6rnlLPor7cgMTYg5L2N5rex5bqm57yT5YayXHJcbiAgICAgKiBAcHJvcGVydHkgUkJfRk1UX0QxNlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSQl9GTVRfRDE2OiBnZnguUkJfRk1UX0QxNlxyXG59KVxyXG5cclxuLyoqXHJcbiAqIFJlbmRlciB0ZXh0dXJlcyBhcmUgdGV4dHVyZXMgdGhhdCBjYW4gYmUgcmVuZGVyZWQgdG8uXHJcbiAqIEBjbGFzcyBSZW5kZXJUZXh0dXJlXHJcbiAqIEBleHRlbmRzIFRleHR1cmUyRFxyXG4gKi9cclxubGV0IFJlbmRlclRleHR1cmUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUmVuZGVyVGV4dHVyZScsXHJcbiAgICBleHRlbmRzOiBUZXh0dXJlMkQsXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIERlcHRoU3RlbmNpbEZvcm1hdFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW5pdCB0aGUgcmVuZGVyIHRleHR1cmUgd2l0aCBzaXplLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Yid5aeL5YyWIHJlbmRlciB0ZXh0dXJlIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt3aWR0aF0gXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2hlaWdodF1cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVwdGhTdGVuY2lsRm9ybWF0XVxyXG4gICAgICogQG1ldGhvZCBpbml0V2l0aFNpemVcclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhTaXplICh3aWR0aCwgaGVpZ2h0LCBkZXB0aFN0ZW5jaWxGb3JtYXQpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gTWF0aC5mbG9vcih3aWR0aCB8fCBjYy52aXNpYmxlUmVjdC53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCB8fCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMoKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgb3B0cyA9IHtcclxuICAgICAgICAgICAgY29sb3JzOiBbIHRoaXMuX3RleHR1cmUgXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGVwdGhTdGVuY2lsQnVmZmVyKSB0aGlzLl9kZXB0aFN0ZW5jaWxCdWZmZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIGxldCBkZXB0aFN0ZW5jaWxCdWZmZXI7XHJcbiAgICAgICAgaWYgKGRlcHRoU3RlbmNpbEZvcm1hdCkge1xyXG4gICAgICAgICAgICBkZXB0aFN0ZW5jaWxCdWZmZXIgPSBuZXcgZ2Z4LlJlbmRlckJ1ZmZlcihyZW5kZXJlci5kZXZpY2UsIGRlcHRoU3RlbmNpbEZvcm1hdCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGlmIChkZXB0aFN0ZW5jaWxGb3JtYXQgPT09IGdmeC5SQl9GTVRfRDI0UzgpIHtcclxuICAgICAgICAgICAgICAgIG9wdHMuZGVwdGhTdGVuY2lsID0gZGVwdGhTdGVuY2lsQnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoU3RlbmNpbEZvcm1hdCA9PT0gZ2Z4LlJCX0ZNVF9TOCkge1xyXG4gICAgICAgICAgICAgICAgb3B0cy5zdGVuY2lsID0gZGVwdGhTdGVuY2lsQnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRlcHRoU3RlbmNpbEZvcm1hdCA9PT0gZ2Z4LlJCX0ZNVF9EMTYpIHtcclxuICAgICAgICAgICAgICAgIG9wdHMuZGVwdGggPSBkZXB0aFN0ZW5jaWxCdWZmZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGVwdGhTdGVuY2lsQnVmZmVyID0gZGVwdGhTdGVuY2lsQnVmZmVyO1xyXG4gICAgICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlcikgdGhpcy5fZnJhbWVidWZmZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gbmV3IGdmeC5GcmFtZUJ1ZmZlcihyZW5kZXJlci5kZXZpY2UsIHdpZHRoLCBoZWlnaHQsIG9wdHMpO1xyXG5cclxuICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXQoXCJsb2FkXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gTWF0aC5mbG9vcih3aWR0aCB8fCBjYy52aXNpYmxlUmVjdC53aWR0aCk7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBNYXRoLmZsb29yKGhlaWdodCB8fCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMoKTtcclxuXHJcbiAgICAgICAgbGV0IHJibyA9IHRoaXMuX2RlcHRoU3RlbmNpbEJ1ZmZlcjtcclxuICAgICAgICBpZiAocmJvKSByYm8udXBkYXRlKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLl9mcmFtZWJ1ZmZlci5fd2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl9mcmFtZWJ1ZmZlci5faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRHJhdyBhIHRleHR1cmUgdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvblxyXG4gICAgICogISN6aCDlsIbmjIflrprnmoTlm77niYfmuLLmn5PliLDmjIflrprnmoTkvY3nva7kuIpcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geSBcclxuICAgICAqL1xyXG4gICAgZHJhd1RleHR1cmVBdCAodGV4dHVyZSwgeCwgeSkge1xyXG4gICAgICAgIGlmICghdGV4dHVyZS5faW1hZ2UgfHwgdGV4dHVyZS5faW1hZ2Uud2lkdGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGVTdWJJbWFnZSh7XHJcbiAgICAgICAgICAgIHgsIHksXHJcbiAgICAgICAgICAgIGltYWdlOiB0ZXh0dXJlLl9pbWFnZSxcclxuICAgICAgICAgICAgd2lkdGg6IHRleHR1cmUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGV4dHVyZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICBmbGlwWTogZmFsc2UsXHJcbiAgICAgICAgICAgIHByZW11bHRpcGx5QWxwaGE6IHRleHR1cmUuX3ByZW11bHRpcGx5QWxwaGFcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCBwaXhlbHMgZnJvbSByZW5kZXIgdGV4dHVyZSwgdGhlIHBpeGVscyBkYXRhIHN0b3JlcyBpbiBhIFJHQkEgVWludDhBcnJheS5cclxuICAgICAqIEl0IHdpbGwgcmV0dXJuIGEgbmV3ICh3aWR0aCAqIGhlaWdodCAqIDQpIGxlbmd0aCBVaW50OEFycmF5IGJ5IGRlZmF1bHTjgIJcclxuICAgICAqIFlvdSBjYW4gc3BlY2lmeSBhIGRhdGEgdG8gc3RvcmUgdGhlIHBpeGVscyB0byByZXVzZSB0aGUgZGF0YSwgXHJcbiAgICAgKiB5b3UgYW5kIGNhbiBzcGVjaWZ5IG90aGVyIHBhcmFtcyB0byBzcGVjaWZ5IHRoZSB0ZXh0dXJlIHJlZ2lvbiB0byByZWFkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5LuOIHJlbmRlciB0ZXh0dXJlIOivu+WPluWDj+e0oOaVsOaNru+8jOaVsOaNruexu+Wei+S4uiBSR0JBIOagvOW8j+eahCBVaW50OEFycmF5IOaVsOe7hOOAglxyXG4gICAgICog6buY6K6k5q+P5qyh6LCD55So5q2k5Ye95pWw5Lya55Sf5oiQ5LiA5Liq5aSn5bCP5Li6IO+8iOmVvyB4IOmrmCB4IDTvvIkg55qEIFVpbnQ4QXJyYXnjgIJcclxuICAgICAqIOS9oOWPr+S7pemAmui/h+S8oOWFpSBkYXRhIOadpeaOpeaUtuWDj+e0oOaVsOaNru+8jOS5n+WPr+S7pemAmui/h+S8oOWPguadpeaMh+WumumcgOimgeivu+WPlueahOWMuuWfn+eahOWDj+e0oOOAglxyXG4gICAgICogQG1ldGhvZCByZWFkUGl4ZWxzXHJcbiAgICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IFtkYXRhXVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ddIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtoXSBcclxuICAgICAqIEByZXR1cm4ge1VpbnQ4QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHJlYWRQaXhlbHMgKGRhdGEsIHgsIHksIHcsIGgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lYnVmZmVyIHx8ICF0aGlzLl90ZXh0dXJlKSByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgeCA9IHggfHwgMDtcclxuICAgICAgICB5ID0geSB8fCAwO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IHcgfHwgdGhpcy53aWR0aDtcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gaCB8fCB0aGlzLmhlaWdodFxyXG4gICAgICAgIGRhdGEgPSBkYXRhICB8fCBuZXcgVWludDhBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpO1xyXG5cclxuICAgICAgICBsZXQgZ2wgPSBjYy5nYW1lLl9yZW5kZXJDb250ZXh0O1xyXG4gICAgICAgIGxldCBvbGRGQk8gPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuRlJBTUVCVUZGRVJfQklORElORyk7XHJcbiAgICAgICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCB0aGlzLl9mcmFtZWJ1ZmZlci5nZXRIYW5kbGUoKSk7XHJcbiAgICAgICAgZ2wucmVhZFBpeGVscyh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcclxuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG9sZEZCTyk7XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95ICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZWJ1ZmZlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuUmVuZGVyVGV4dHVyZSA9IG1vZHVsZS5leHBvcnRzID0gUmVuZGVyVGV4dHVyZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=