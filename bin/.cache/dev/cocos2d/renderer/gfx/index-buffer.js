
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/index-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = require("./enums");

var _BYTES_PER_INDEX;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BYTES_PER_INDEX = (_BYTES_PER_INDEX = {}, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT8] = 1, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT16] = 2, _BYTES_PER_INDEX[_enums.enums.INDEX_FMT_UINT32] = 4, _BYTES_PER_INDEX);

var IndexBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {INDEX_FMT_*} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer | Uint8Array} data
   */
  function IndexBuffer(device, format, usage, data) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._bytesPerIndex = BYTES_PER_INDEX[format];
    this._bytes = data.byteLength;
    this._numIndices = this._bytes / this._bytesPerIndex;
    this._needExpandDataStore = true; // update

    this._glID = device._gl.createBuffer();
    this.update(0, data); // stats

    device._stats.ib += this._bytes;
  }
  /**
   * @method destroy
   */


  var _proto = IndexBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteBuffer(this._glID);
    this._device._stats.ib -= this.bytes;
    this._glID = -1;
  }
  /**
   * @method update
   * @param {Number} byteOffset
   * @param {ArrayBuffer} data
   */
  ;

  _proto.update = function update(byteOffset, data) {
    if (this._glID === -1) {
      console.error('The buffer is destroyed');
      return;
    }

    if (data.byteLength === 0) return; // Need to create new buffer object when bytes exceed

    if (byteOffset + data.byteLength > this._bytes) {
      if (byteOffset) {
        // Lost data between [0, byteOffset] which is need for new buffer
        console.error('Failed to update data, bytes exceed.');
        return;
      } else {
        this._needExpandDataStore = true;
        this._bytes = byteOffset + data.byteLength;
        this._numIndices = this._bytes / this._bytesPerIndex;
      }
    }
    /** @type{WebGLRenderingContext} */


    var gl = this._device._gl;
    var glUsage = this._usage;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glID);

    if (this._needExpandDataStore) {
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
      this._needExpandDataStore = false;
    } else {
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, byteOffset, data);
    }

    this._device._restoreIndexBuffer();
  };

  _proto.setUsage = function setUsage(usage) {
    this._usage = usage;
  };

  _createClass(IndexBuffer, [{
    key: "count",
    get: function get() {
      return this._numIndices;
    }
  }]);

  return IndexBuffer;
}();

IndexBuffer.BYTES_PER_INDEX = BYTES_PER_INDEX;
var _default = IndexBuffer;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXGluZGV4LWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJCWVRFU19QRVJfSU5ERVgiLCJlbnVtcyIsIklOREVYX0ZNVF9VSU5UOCIsIklOREVYX0ZNVF9VSU5UMTYiLCJJTkRFWF9GTVRfVUlOVDMyIiwiSW5kZXhCdWZmZXIiLCJkZXZpY2UiLCJmb3JtYXQiLCJ1c2FnZSIsImRhdGEiLCJfZGV2aWNlIiwiX2Zvcm1hdCIsIl91c2FnZSIsIl9ieXRlc1BlckluZGV4IiwiX2J5dGVzIiwiYnl0ZUxlbmd0aCIsIl9udW1JbmRpY2VzIiwiX25lZWRFeHBhbmREYXRhU3RvcmUiLCJfZ2xJRCIsIl9nbCIsImNyZWF0ZUJ1ZmZlciIsInVwZGF0ZSIsIl9zdGF0cyIsImliIiwiZGVzdHJveSIsImNvbnNvbGUiLCJlcnJvciIsImdsIiwiZGVsZXRlQnVmZmVyIiwiYnl0ZXMiLCJieXRlT2Zmc2V0IiwiZ2xVc2FnZSIsImJpbmRCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJidWZmZXJTdWJEYXRhIiwiX3Jlc3RvcmVJbmRleEJ1ZmZlciIsInNldFVzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBTUEsZUFBZSw0Q0FDbEJDLGFBQU1DLGVBRFksSUFDTSxDQUROLG1CQUVsQkQsYUFBTUUsZ0JBRlksSUFFTyxDQUZQLG1CQUdsQkYsYUFBTUcsZ0JBSFksSUFHTyxDQUhQLG1CQUFyQjs7SUFNTUM7QUFDSjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHVCQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ3ZDLFNBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE1BQUwsR0FBY0osS0FBZDtBQUNBLFNBQUtL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XG5jb25zdCBCWVRFU19QRVJfSU5ERVggPSB7XHJcbiAgW2VudW1zLklOREVYX0ZNVF9VSU5UOF06IDEsXHJcbiAgW2VudW1zLklOREVYX0ZNVF9VSU5UMTZdOiAyLFxyXG4gIFtlbnVtcy5JTkRFWF9GTVRfVUlOVDMyXTogNCxcclxufVxyXG5cclxuY2xhc3MgSW5kZXhCdWZmZXIge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcclxuICAgKiBAcGFyYW0ge0lOREVYX0ZNVF8qfSBmb3JtYXRcclxuICAgKiBAcGFyYW0ge1VTQUdFXyp9IHVzYWdlXHJcbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXl9IGRhdGFcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihkZXZpY2UsIGZvcm1hdCwgdXNhZ2UsIGRhdGEpIHtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdDtcclxuICAgIHRoaXMuX3VzYWdlID0gdXNhZ2U7XHJcbiAgICB0aGlzLl9ieXRlc1BlckluZGV4ID0gQllURVNfUEVSX0lOREVYW2Zvcm1hdF07XHJcbiAgICB0aGlzLl9ieXRlcyA9IGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgIHRoaXMuX251bUluZGljZXMgPSB0aGlzLl9ieXRlcyAvIHRoaXMuX2J5dGVzUGVySW5kZXg7XHJcblxyXG4gICAgdGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSA9IHRydWU7XHJcblxyXG4gICAgLy8gdXBkYXRlXHJcbiAgICB0aGlzLl9nbElEID0gZGV2aWNlLl9nbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIHRoaXMudXBkYXRlKDAsIGRhdGEpO1xyXG5cclxuICAgIC8vIHN0YXRzXHJcbiAgICBkZXZpY2UuX3N0YXRzLmliICs9IHRoaXMuX2J5dGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBkZXN0cm95XHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9nbElEID09PSAtMSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgYnVmZmVyIGFscmVhZHkgZGVzdHJveWVkJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xyXG4gICAgZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX2dsSUQpO1xyXG4gICAgdGhpcy5fZGV2aWNlLl9zdGF0cy5pYiAtPSB0aGlzLmJ5dGVzO1xyXG5cclxuICAgIHRoaXMuX2dsSUQgPSAtMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgdXBkYXRlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJ5dGVPZmZzZXRcclxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhXHJcbiAgICovXHJcbiAgdXBkYXRlKGJ5dGVPZmZzZXQsIGRhdGEpIHtcclxuICAgIGlmICh0aGlzLl9nbElEID09PSAtMSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgYnVmZmVyIGlzIGRlc3Ryb3llZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIE5lZWQgdG8gY3JlYXRlIG5ldyBidWZmZXIgb2JqZWN0IHdoZW4gYnl0ZXMgZXhjZWVkXHJcbiAgICBpZiAoYnl0ZU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aCA+IHRoaXMuX2J5dGVzKSB7XHJcbiAgICAgIGlmIChieXRlT2Zmc2V0KSB7XHJcbiAgICAgICAgLy8gTG9zdCBkYXRhIGJldHdlZW4gWzAsIGJ5dGVPZmZzZXRdIHdoaWNoIGlzIG5lZWQgZm9yIG5ldyBidWZmZXJcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gdXBkYXRlIGRhdGEsIGJ5dGVzIGV4Y2VlZC4nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYnl0ZXMgPSBieXRlT2Zmc2V0ICsgZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX251bUluZGljZXMgPSB0aGlzLl9ieXRlcyAvIHRoaXMuX2J5dGVzUGVySW5kZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogQHR5cGV7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSAqL1xyXG4gICAgbGV0IGdsID0gdGhpcy5fZGV2aWNlLl9nbDtcclxuICAgIGxldCBnbFVzYWdlID0gdGhpcy5fdXNhZ2U7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5fZ2xJRCk7XHJcbiAgICBpZiAodGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSkge1xyXG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBkYXRhLCBnbFVzYWdlKTtcclxuICAgICAgdGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGdsLmJ1ZmZlclN1YkRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGJ5dGVPZmZzZXQsIGRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZGV2aWNlLl9yZXN0b3JlSW5kZXhCdWZmZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBjb3VudCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbnVtSW5kaWNlcztcclxuICB9XHJcblxyXG4gIHNldFVzYWdlICh1c2FnZSkge1xyXG4gICAgdGhpcy5fdXNhZ2UgPSB1c2FnZTtcclxuICB9XHJcbn1cclxuXHJcbkluZGV4QnVmZmVyLkJZVEVTX1BFUl9JTkRFWCA9IEJZVEVTX1BFUl9JTkRFWDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEluZGV4QnVmZmVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==