
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/render-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var RenderBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {RB_FMT_*} format
   * @param {Number} width
   * @param {Number} height
   */
  function RenderBuffer(device, format, width, height) {
    this._device = device;
    this._format = format;
    this._glID = device._gl.createRenderbuffer();
    this.update(width, height);
  }

  var _proto = RenderBuffer.prototype;

  _proto.update = function update(width, height) {
    this._width = width;
    this._height = height;
    var gl = this._device._gl;
    gl.bindRenderbuffer(gl.RENDERBUFFER, this._glID);
    gl.renderbufferStorage(gl.RENDERBUFFER, this._format, width, height);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  }
  /**
   * @method destroy
   */
  ;

  _proto.destroy = function destroy() {
    if (this._glID === null) {
      console.error('The render-buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.deleteRenderbuffer(this._glID);
    this._glID = null;
  };

  return RenderBuffer;
}();

exports["default"] = RenderBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHJlbmRlci1idWZmZXIuanMiXSwibmFtZXMiOlsiUmVuZGVyQnVmZmVyIiwiZGV2aWNlIiwiZm9ybWF0Iiwid2lkdGgiLCJoZWlnaHQiLCJfZGV2aWNlIiwiX2Zvcm1hdCIsIl9nbElEIiwiX2dsIiwiY3JlYXRlUmVuZGVyYnVmZmVyIiwidXBkYXRlIiwiX3dpZHRoIiwiX2hlaWdodCIsImdsIiwiYmluZFJlbmRlcmJ1ZmZlciIsIlJFTkRFUkJVRkZFUiIsInJlbmRlcmJ1ZmZlclN0b3JhZ2UiLCJkZXN0cm95IiwiY29uc29sZSIsImVycm9yIiwiZGVsZXRlUmVuZGVyYnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQTtBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHdCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUNDLE1BQW5DLEVBQTJDO0FBQ3pDLFNBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE9BQUwsR0FBZUosTUFBZjtBQUVBLFNBQUtLLEtBQUwsR0FBYU4sTUFBTSxDQUFDTyxHQUFQLENBQVdDLGtCQUFYLEVBQWI7QUFDQSxTQUFLQyxNQUFMLENBQVlQLEtBQVosRUFBbUJDLE1BQW5CO0FBQ0Q7Ozs7U0FFRE0sU0FBQSxnQkFBUVAsS0FBUixFQUFlQyxNQUFmLEVBQXVCO0FBQ3JCLFNBQUtPLE1BQUwsR0FBY1IsS0FBZDtBQUNBLFNBQUtTLE9BQUwsR0FBZVIsTUFBZjtBQUVBLFFBQU1TLEVBQUUsR0FBRyxLQUFLUixPQUFMLENBQWFHLEdBQXhCO0FBQ0FLLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0JELEVBQUUsQ0FBQ0UsWUFBdkIsRUFBcUMsS0FBS1IsS0FBMUM7QUFDQU0sSUFBQUEsRUFBRSxDQUFDRyxtQkFBSCxDQUF1QkgsRUFBRSxDQUFDRSxZQUExQixFQUF3QyxLQUFLVCxPQUE3QyxFQUFzREgsS0FBdEQsRUFBNkRDLE1BQTdEO0FBQ0FTLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0JELEVBQUUsQ0FBQ0UsWUFBdkIsRUFBcUMsSUFBckM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTs7O1NBQ0VFLFVBQUEsbUJBQVU7QUFDUixRQUFJLEtBQUtWLEtBQUwsS0FBZSxJQUFuQixFQUF5QjtBQUN2QlcsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMscUNBQWQ7QUFDQTtBQUNEOztBQUVELFFBQU1OLEVBQUUsR0FBRyxLQUFLUixPQUFMLENBQWFHLEdBQXhCO0FBRUFLLElBQUFBLEVBQUUsQ0FBQ0MsZ0JBQUgsQ0FBb0JELEVBQUUsQ0FBQ0UsWUFBdkIsRUFBcUMsSUFBckM7QUFDQUYsSUFBQUEsRUFBRSxDQUFDTyxrQkFBSCxDQUFzQixLQUFLYixLQUEzQjtBQUVBLFNBQUtBLEtBQUwsR0FBYSxJQUFiO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJCdWZmZXIge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcclxuICAgKiBAcGFyYW0ge1JCX0ZNVF8qfSBmb3JtYXRcclxuICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZGV2aWNlLCBmb3JtYXQsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdDtcclxuICAgIFxyXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XHJcbiAgICB0aGlzLnVwZGF0ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICBjb25zdCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XHJcbiAgICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgdGhpcy5fZ2xJRCk7XHJcbiAgICBnbC5yZW5kZXJidWZmZXJTdG9yYWdlKGdsLlJFTkRFUkJVRkZFUiwgdGhpcy5fZm9ybWF0LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZGVzdHJveVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgcmVuZGVyLWJ1ZmZlciBhbHJlYWR5IGRlc3Ryb3llZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xyXG5cclxuICAgIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcclxuICAgIGdsLmRlbGV0ZVJlbmRlcmJ1ZmZlcih0aGlzLl9nbElEKTtcclxuXHJcbiAgICB0aGlzLl9nbElEID0gbnVsbDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==