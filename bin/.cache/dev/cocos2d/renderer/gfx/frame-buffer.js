
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/frame-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var FrameBuffer = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Device} device
   * @param {Number} width
   * @param {Number} height
   * @param {Object} options
   * @param {Array} options.colors
   * @param {RenderBuffer|Texture2D|TextureCube} options.depth
   * @param {RenderBuffer|Texture2D|TextureCube} options.stencil
   * @param {RenderBuffer|Texture2D|TextureCube} options.depthStencil
   */
  function FrameBuffer(device, width, height, options) {
    this._device = device;
    this._width = width;
    this._height = height;
    this._colors = options.colors || [];
    this._depth = options.depth || null;
    this._stencil = options.stencil || null;
    this._depthStencil = options.depthStencil || null;
    this._glID = device._gl.createFramebuffer();
  }
  /**
   * @method destroy
   */


  var _proto = FrameBuffer.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === null) {
      console.error('The frame-buffer already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteFramebuffer(this._glID);
    this._glID = null;
  };

  _proto.getHandle = function getHandle() {
    return this._glID;
  };

  return FrameBuffer;
}();

exports["default"] = FrameBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXGZyYW1lLWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJGcmFtZUJ1ZmZlciIsImRldmljZSIsIndpZHRoIiwiaGVpZ2h0Iiwib3B0aW9ucyIsIl9kZXZpY2UiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX2NvbG9ycyIsImNvbG9ycyIsIl9kZXB0aCIsImRlcHRoIiwiX3N0ZW5jaWwiLCJzdGVuY2lsIiwiX2RlcHRoU3RlbmNpbCIsImRlcHRoU3RlbmNpbCIsIl9nbElEIiwiX2dsIiwiY3JlYXRlRnJhbWVidWZmZXIiLCJkZXN0cm95IiwiY29uc29sZSIsImVycm9yIiwiZ2wiLCJkZWxldGVGcmFtZWJ1ZmZlciIsImdldEhhbmRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkE7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHVCQUFZQyxNQUFaLEVBQW9CQyxLQUFwQixFQUEyQkMsTUFBM0IsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQzFDLFNBQUtDLE9BQUwsR0FBZUosTUFBZjtBQUNBLFNBQUtLLE1BQUwsR0FBY0osS0FBZDtBQUNBLFNBQUtLLE9BQUwsR0FBZUosTUFBZjtBQUVBLFNBQUtLLE9BQUwsR0FBZUosT0FBTyxDQUFDSyxNQUFSLElBQWtCLEVBQWpDO0FBQ0EsU0FBS0MsTUFBTCxHQUFjTixPQUFPLENBQUNPLEtBQVIsSUFBaUIsSUFBL0I7QUFDQSxTQUFLQyxRQUFMLEdBQWdCUixPQUFPLENBQUNTLE9BQVIsSUFBbUIsSUFBbkM7QUFDQSxTQUFLQyxhQUFMLEdBQXFCVixPQUFPLENBQUNXLFlBQVIsSUFBd0IsSUFBN0M7QUFFQSxTQUFLQyxLQUFMLEdBQWFmLE1BQU0sQ0FBQ2dCLEdBQVAsQ0FBV0MsaUJBQVgsRUFBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBOzs7OztTQUNFQyxVQUFBLG1CQUFVO0FBQ1IsUUFBSSxLQUFLSCxLQUFMLEtBQWUsSUFBbkIsRUFBeUI7QUFDdkJJLE1BQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLG9DQUFkO0FBQ0E7QUFDRDs7QUFFRCxRQUFNQyxFQUFFLEdBQUcsS0FBS2pCLE9BQUwsQ0FBYVksR0FBeEI7QUFFQUssSUFBQUEsRUFBRSxDQUFDQyxpQkFBSCxDQUFxQixLQUFLUCxLQUExQjtBQUVBLFNBQUtBLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7O1NBRURRLFlBQUEscUJBQVk7QUFDVixXQUFPLEtBQUtSLEtBQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lQnVmZmVyIHtcclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge0RldmljZX0gZGV2aWNlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb2xvcnNcclxuICAgKiBAcGFyYW0ge1JlbmRlckJ1ZmZlcnxUZXh0dXJlMkR8VGV4dHVyZUN1YmV9IG9wdGlvbnMuZGVwdGhcclxuICAgKiBAcGFyYW0ge1JlbmRlckJ1ZmZlcnxUZXh0dXJlMkR8VGV4dHVyZUN1YmV9IG9wdGlvbnMuc3RlbmNpbFxyXG4gICAqIEBwYXJhbSB7UmVuZGVyQnVmZmVyfFRleHR1cmUyRHxUZXh0dXJlQ3ViZX0gb3B0aW9ucy5kZXB0aFN0ZW5jaWxcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihkZXZpY2UsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMpIHtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5fY29sb3JzID0gb3B0aW9ucy5jb2xvcnMgfHwgW107XHJcbiAgICB0aGlzLl9kZXB0aCA9IG9wdGlvbnMuZGVwdGggfHwgbnVsbDtcclxuICAgIHRoaXMuX3N0ZW5jaWwgPSBvcHRpb25zLnN0ZW5jaWwgfHwgbnVsbDtcclxuICAgIHRoaXMuX2RlcHRoU3RlbmNpbCA9IG9wdGlvbnMuZGVwdGhTdGVuY2lsIHx8IG51bGw7XHJcblxyXG4gICAgdGhpcy5fZ2xJRCA9IGRldmljZS5fZ2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZGVzdHJveVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fZ2xJRCA9PT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgZnJhbWUtYnVmZmVyIGFscmVhZHkgZGVzdHJveWVkJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnbCA9IHRoaXMuX2RldmljZS5fZ2w7XHJcblxyXG4gICAgZ2wuZGVsZXRlRnJhbWVidWZmZXIodGhpcy5fZ2xJRCk7XHJcblxyXG4gICAgdGhpcy5fZ2xJRCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRIYW5kbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ2xJRDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==