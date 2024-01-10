
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/vertex-buffer.js';
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

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VertexBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {VertexFormat} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer | Uint8Array} data
   */
  function VertexBuffer(device, format, usage, data) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._bytesPerVertex = this._format._bytes;
    this._bytes = data.byteLength;
    this._numVertices = this._bytes / this._bytesPerVertex;
    this._needExpandDataStore = true; // update

    this._glID = device._gl.createBuffer();
    this.update(0, data); // stats

    device._stats.vb += this._bytes;
  }
  /**
   * @method destroy
   */


  var _proto = VertexBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteBuffer(this._glID);
    this._device._stats.vb -= this.bytes;
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
        this._numVertices = this._bytes / this._bytesPerVertex;
      }
    }

    var gl = this._device._gl;
    var glUsage = this._usage;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._glID);

    if (this._needExpandDataStore) {
      gl.bufferData(gl.ARRAY_BUFFER, data, glUsage);
      this._needExpandDataStore = false;
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, byteOffset, data);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  };

  _proto.getFormat = function getFormat(name) {
    return this._format.element(name);
  };

  _proto.setUsage = function setUsage(usage) {
    this._usage = usage;
  };

  _createClass(VertexBuffer, [{
    key: "count",
    get: function get() {
      return this._numVertices;
    }
  }]);

  return VertexBuffer;
}();

var _default = VertexBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHZlcnRleC1idWZmZXIuanMiXSwibmFtZXMiOlsiVmVydGV4QnVmZmVyIiwiZGV2aWNlIiwiZm9ybWF0IiwidXNhZ2UiLCJkYXRhIiwiX2RldmljZSIsIl9mb3JtYXQiLCJfdXNhZ2UiLCJfYnl0ZXNQZXJWZXJ0ZXgiLCJfYnl0ZXMiLCJieXRlTGVuZ3RoIiwiX251bVZlcnRpY2VzIiwiX25lZWRFeHBhbmREYXRhU3RvcmUiLCJfZ2xJRCIsIl9nbCIsImNyZWF0ZUJ1ZmZlciIsInVwZGF0ZSIsIl9zdGF0cyIsInZiIiwiZGVzdHJveSIsImNvbnNvbGUiLCJlcnJvciIsImdsIiwiZGVsZXRlQnVmZmVyIiwiYnl0ZXMiLCJieXRlT2Zmc2V0IiwiZ2xVc2FnZSIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiYnVmZmVyU3ViRGF0YSIsImdldEZvcm1hdCIsIm5hbWUiLCJlbGVtZW50Iiwic2V0VXNhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRU1BO0FBQ0o7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSx3QkFBWUMsTUFBWixFQUFvQkMsTUFBcEIsRUFBNEJDLEtBQTVCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUN2QyxTQUFLQyxPQUFMLEdBQWVKLE1BQWY7QUFDQSxTQUFLSyxPQUFMLEdBQWVKLE1BQWY7QUFDQSxTQUFLSyxNQUFMLEdBQWNKLEtBQWQ7QUFDQSxTQUFLSyxlQUFMLEdBQXVCLEtBQUtGLE9BQUwsQ0FBYUcsTUFBcEM7QUFDQSxTQUFLQSxNQUFMLEdBQWNMLElBQUksQ0FBQ00sVUFBbkI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEtBQUtGLE1BQUwsR0FBYyxLQUFLRCxlQUF2QztBQUVBLFNBQUtJLG9CQUFMLEdBQTRCLElBQTVCLENBUnVDLENBVXZDOztBQUNBLFNBQUtDLEtBQUwsR0FBYVosTUFBTSxDQUFDYSxHQUFQLENBQVdDLFlBQVgsRUFBYjtBQUNBLFNBQUtDLE1BQUwsQ0FBWSxDQUFaLEVBQWVaLElBQWYsRUFadUMsQ0FjdkM7O0FBQ0FILElBQUFBLE1BQU0sQ0FBQ2dCLE1BQVAsQ0FBY0MsRUFBZCxJQUFvQixLQUFLVCxNQUF6QjtBQUNEO0FBRUQ7QUFDRjtBQUNBOzs7OztTQUNFVSxVQUFBLG1CQUFVO0FBQ1IsUUFBSSxLQUFLTixLQUFMLEtBQWUsQ0FBQyxDQUFwQixFQUF1QjtBQUNyQk8sTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsOEJBQWQ7QUFDQTtBQUNEOztBQUVELFFBQUlDLEVBQUUsR0FBRyxLQUFLakIsT0FBTCxDQUFhUyxHQUF0QjtBQUNBUSxJQUFBQSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0IsS0FBS1YsS0FBckI7QUFDQSxTQUFLUixPQUFMLENBQWFZLE1BQWIsQ0FBb0JDLEVBQXBCLElBQTBCLEtBQUtNLEtBQS9CO0FBRUEsU0FBS1gsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O1NBQ0VHLFNBQUEsZ0JBQU9TLFVBQVAsRUFBbUJyQixJQUFuQixFQUF5QjtBQUN2QixRQUFJLEtBQUtTLEtBQUwsS0FBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ3JCTyxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyx5QkFBZDtBQUNBO0FBQ0Q7O0FBRUQsUUFBSWpCLElBQUksQ0FBQ00sVUFBTCxLQUFvQixDQUF4QixFQUEyQixPQU5KLENBUXZCOztBQUNBLFFBQUllLFVBQVUsR0FBR3JCLElBQUksQ0FBQ00sVUFBbEIsR0FBK0IsS0FBS0QsTUFBeEMsRUFBZ0Q7QUFDOUMsVUFBSWdCLFVBQUosRUFBZ0I7QUFDZDtBQUNBTCxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxzQ0FBZDtBQUNBO0FBQ0QsT0FKRCxNQUtLO0FBQ0gsYUFBS1Qsb0JBQUwsR0FBNEIsSUFBNUI7QUFDQSxhQUFLSCxNQUFMLEdBQWNnQixVQUFVLEdBQUdyQixJQUFJLENBQUNNLFVBQWhDO0FBQ0EsYUFBS0MsWUFBTCxHQUFvQixLQUFLRixNQUFMLEdBQWMsS0FBS0QsZUFBdkM7QUFDRDtBQUNGOztBQUVELFFBQUljLEVBQUUsR0FBRyxLQUFLakIsT0FBTCxDQUFhUyxHQUF0QjtBQUNBLFFBQUlZLE9BQU8sR0FBRyxLQUFLbkIsTUFBbkI7QUFFQWUsSUFBQUEsRUFBRSxDQUFDSyxVQUFILENBQWNMLEVBQUUsQ0FBQ00sWUFBakIsRUFBK0IsS0FBS2YsS0FBcEM7O0FBQ0EsUUFBSSxLQUFLRCxvQkFBVCxFQUErQjtBQUM3QlUsTUFBQUEsRUFBRSxDQUFDTyxVQUFILENBQWNQLEVBQUUsQ0FBQ00sWUFBakIsRUFBK0J4QixJQUEvQixFQUFxQ3NCLE9BQXJDO0FBQ0EsV0FBS2Qsb0JBQUwsR0FBNEIsS0FBNUI7QUFDRCxLQUhELE1BSUs7QUFDSFUsTUFBQUEsRUFBRSxDQUFDUSxhQUFILENBQWlCUixFQUFFLENBQUNNLFlBQXBCLEVBQWtDSCxVQUFsQyxFQUE4Q3JCLElBQTlDO0FBQ0Q7O0FBQ0RrQixJQUFBQSxFQUFFLENBQUNLLFVBQUgsQ0FBY0wsRUFBRSxDQUFDTSxZQUFqQixFQUErQixJQUEvQjtBQUNEOztTQU1ERyxZQUFBLG1CQUFXQyxJQUFYLEVBQWlCO0FBQ2YsV0FBTyxLQUFLMUIsT0FBTCxDQUFhMkIsT0FBYixDQUFxQkQsSUFBckIsQ0FBUDtBQUNEOztTQUVERSxXQUFBLGtCQUFVL0IsS0FBVixFQUFpQjtBQUNmLFNBQUtJLE1BQUwsR0FBY0osS0FBZDtBQUNEOzs7O1NBVkQsZUFBYTtBQUNYLGFBQU8sS0FBS1EsWUFBWjtBQUNEOzs7Ozs7ZUFXWVgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbnVtcyB9IGZyb20gJy4vZW51bXMnO1xyXG5cclxuY2xhc3MgVmVydGV4QnVmZmVyIHtcclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RldmljZX0gZGV2aWNlXHJcbiAgICogQHBhcmFtIHtWZXJ0ZXhGb3JtYXR9IGZvcm1hdFxyXG4gICAqIEBwYXJhbSB7VVNBR0VfKn0gdXNhZ2VcclxuICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyIHwgVWludDhBcnJheX0gZGF0YVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGRldmljZSwgZm9ybWF0LCB1c2FnZSwgZGF0YSkge1xyXG4gICAgdGhpcy5fZGV2aWNlID0gZGV2aWNlO1xyXG4gICAgdGhpcy5fZm9ybWF0ID0gZm9ybWF0O1xyXG4gICAgdGhpcy5fdXNhZ2UgPSB1c2FnZTtcclxuICAgIHRoaXMuX2J5dGVzUGVyVmVydGV4ID0gdGhpcy5fZm9ybWF0Ll9ieXRlcztcclxuICAgIHRoaXMuX2J5dGVzID0gZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgdGhpcy5fbnVtVmVydGljZXMgPSB0aGlzLl9ieXRlcyAvIHRoaXMuX2J5dGVzUGVyVmVydGV4O1xyXG5cclxuICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSB0cnVlO1xyXG5cclxuICAgIC8vIHVwZGF0ZVxyXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICB0aGlzLnVwZGF0ZSgwLCBkYXRhKTtcclxuXHJcbiAgICAvLyBzdGF0c1xyXG4gICAgZGV2aWNlLl9zdGF0cy52YiArPSB0aGlzLl9ieXRlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZGVzdHJveVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gLTEpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignVGhlIGJ1ZmZlciBhbHJlYWR5IGRlc3Ryb3llZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdsID0gdGhpcy5fZGV2aWNlLl9nbDtcclxuICAgIGdsLmRlbGV0ZUJ1ZmZlcih0aGlzLl9nbElEKTtcclxuICAgIHRoaXMuX2RldmljZS5fc3RhdHMudmIgLT0gdGhpcy5ieXRlcztcclxuXHJcbiAgICB0aGlzLl9nbElEID0gLTE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHVwZGF0ZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBieXRlT2Zmc2V0XHJcbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YVxyXG4gICAqL1xyXG4gIHVwZGF0ZShieXRlT2Zmc2V0LCBkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gLTEpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignVGhlIGJ1ZmZlciBpcyBkZXN0cm95ZWQnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhLmJ5dGVMZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAvLyBOZWVkIHRvIGNyZWF0ZSBuZXcgYnVmZmVyIG9iamVjdCB3aGVuIGJ5dGVzIGV4Y2VlZFxyXG4gICAgaWYgKGJ5dGVPZmZzZXQgKyBkYXRhLmJ5dGVMZW5ndGggPiB0aGlzLl9ieXRlcykge1xyXG4gICAgICBpZiAoYnl0ZU9mZnNldCkge1xyXG4gICAgICAgIC8vIExvc3QgZGF0YSBiZXR3ZWVuIFswLCBieXRlT2Zmc2V0XSB3aGljaCBpcyBuZWVkIGZvciBuZXcgYnVmZmVyXHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBkYXRhLCBieXRlcyBleGNlZWQuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2J5dGVzID0gYnl0ZU9mZnNldCArIGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICB0aGlzLl9udW1WZXJ0aWNlcyA9IHRoaXMuX2J5dGVzIC8gdGhpcy5fYnl0ZXNQZXJWZXJ0ZXg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ2wgPSB0aGlzLl9kZXZpY2UuX2dsO1xyXG4gICAgbGV0IGdsVXNhZ2UgPSB0aGlzLl91c2FnZTtcclxuXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5fZ2xJRCk7XHJcbiAgICBpZiAodGhpcy5fbmVlZEV4cGFuZERhdGFTdG9yZSkge1xyXG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2xVc2FnZSk7XHJcbiAgICAgIHRoaXMuX25lZWRFeHBhbmREYXRhU3RvcmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBnbC5idWZmZXJTdWJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgYnl0ZU9mZnNldCwgZGF0YSk7XHJcbiAgICB9XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY291bnQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX251bVZlcnRpY2VzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Rm9ybWF0IChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm9ybWF0LmVsZW1lbnQobmFtZSk7XHJcbiAgfVxyXG5cclxuICBzZXRVc2FnZSAodXNhZ2UpIHtcclxuICAgIHRoaXMuX3VzYWdlID0gdXNhZ2U7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWZXJ0ZXhCdWZmZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9