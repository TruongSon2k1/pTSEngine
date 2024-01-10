
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/texture.js';
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

/**
 * @type {WebGLTexture}
 */
var _nullWebGLTexture = null;
var _textureID = 0;
/**
 * @typedef {import("../gfx/device").default} Device
 */

var Texture = /*#__PURE__*/function () {
  /**
   * @param {Device} device
   */
  function Texture(device) {
    this._device = device;
    this._width = 4;
    this._height = 4;
    this._genMipmaps = false;
    this._compressed = false;
    this._anisotropy = 1;
    this._minFilter = _enums.enums.FILTER_LINEAR;
    this._magFilter = _enums.enums.FILTER_LINEAR;
    this._mipFilter = _enums.enums.FILTER_LINEAR;
    this._wrapS = _enums.enums.WRAP_REPEAT;
    this._wrapT = _enums.enums.WRAP_REPEAT; // wrapR available in webgl2
    // this._wrapR = enums.WRAP_REPEAT;

    this._format = _enums.enums.TEXTURE_FMT_RGBA8;
    this._target = -1;
    this._id = _textureID++;
  }
  /**
   * @method destroy
   */


  var _proto = Texture.prototype;

  _proto.destroy = function destroy() {
    if (this._glID === _nullWebGLTexture) {
      console.error('The texture already destroyed');
      return;
    }

    var gl = this._device._gl;
    gl.deleteTexture(this._glID);
    this._device._stats.tex -= this.bytes;
    this._glID = _nullWebGLTexture;
  };

  return Texture;
}();

exports["default"] = Texture;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHRleHR1cmUuanMiXSwibmFtZXMiOlsiX251bGxXZWJHTFRleHR1cmUiLCJfdGV4dHVyZUlEIiwiVGV4dHVyZSIsImRldmljZSIsIl9kZXZpY2UiLCJfd2lkdGgiLCJfaGVpZ2h0IiwiX2dlbk1pcG1hcHMiLCJfY29tcHJlc3NlZCIsIl9hbmlzb3Ryb3B5IiwiX21pbkZpbHRlciIsImVudW1zIiwiRklMVEVSX0xJTkVBUiIsIl9tYWdGaWx0ZXIiLCJfbWlwRmlsdGVyIiwiX3dyYXBTIiwiV1JBUF9SRVBFQVQiLCJfd3JhcFQiLCJfZm9ybWF0IiwiVEVYVFVSRV9GTVRfUkdCQTgiLCJfdGFyZ2V0IiwiX2lkIiwiZGVzdHJveSIsIl9nbElEIiwiY29uc29sZSIsImVycm9yIiwiZ2wiLCJfZ2wiLCJkZWxldGVUZXh0dXJlIiwiX3N0YXRzIiwidGV4IiwiYnl0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxpQkFBaUIsR0FBRyxJQUExQjtBQUVBLElBQUlDLFVBQVUsR0FBRyxDQUFqQjtBQUVBO0FBQ0E7QUFDQTs7SUFFcUJDO0FBQ25CO0FBQ0Y7QUFDQTtBQUNFLG1CQUFZQyxNQUFaLEVBQW9CO0FBQ2xCLFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUVBLFNBQUtFLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUVBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCQyxhQUFNQyxhQUF4QjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JGLGFBQU1DLGFBQXhCO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQkgsYUFBTUMsYUFBeEI7QUFDQSxTQUFLRyxNQUFMLEdBQWNKLGFBQU1LLFdBQXBCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjTixhQUFNSyxXQUFwQixDQWJrQixDQWNsQjtBQUNBOztBQUNBLFNBQUtFLE9BQUwsR0FBZVAsYUFBTVEsaUJBQXJCO0FBRUEsU0FBS0MsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFFQSxTQUFLQyxHQUFMLEdBQVdwQixVQUFVLEVBQXJCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7Ozs7O1NBQ0VxQixVQUFBLG1CQUFVO0FBQ1IsUUFBSSxLQUFLQyxLQUFMLEtBQWV2QixpQkFBbkIsRUFBc0M7QUFDcEN3QixNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywrQkFBZDtBQUNBO0FBQ0Q7O0FBRUQsUUFBSUMsRUFBRSxHQUFHLEtBQUt0QixPQUFMLENBQWF1QixHQUF0QjtBQUNBRCxJQUFBQSxFQUFFLENBQUNFLGFBQUgsQ0FBaUIsS0FBS0wsS0FBdEI7QUFFQSxTQUFLbkIsT0FBTCxDQUFheUIsTUFBYixDQUFvQkMsR0FBcEIsSUFBMkIsS0FBS0MsS0FBaEM7QUFDQSxTQUFLUixLQUFMLEdBQWF2QixpQkFBYjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW51bXMgfSBmcm9tICcuL2VudW1zJztcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7V2ViR0xUZXh0dXJlfVxyXG4gKi9cclxuY29uc3QgX251bGxXZWJHTFRleHR1cmUgPSBudWxsO1xyXG5cclxubGV0IF90ZXh0dXJlSUQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9nZngvZGV2aWNlXCIpLmRlZmF1bHR9IERldmljZVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHR1cmUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBkZXZpY2VcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihkZXZpY2UpIHtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IDQ7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSA0O1xyXG4gICAgdGhpcy5fZ2VuTWlwbWFwcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5fY29tcHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2FuaXNvdHJvcHkgPSAxO1xyXG4gICAgdGhpcy5fbWluRmlsdGVyID0gZW51bXMuRklMVEVSX0xJTkVBUjtcclxuICAgIHRoaXMuX21hZ0ZpbHRlciA9IGVudW1zLkZJTFRFUl9MSU5FQVI7XHJcbiAgICB0aGlzLl9taXBGaWx0ZXIgPSBlbnVtcy5GSUxURVJfTElORUFSO1xyXG4gICAgdGhpcy5fd3JhcFMgPSBlbnVtcy5XUkFQX1JFUEVBVDtcclxuICAgIHRoaXMuX3dyYXBUID0gZW51bXMuV1JBUF9SRVBFQVQ7XHJcbiAgICAvLyB3cmFwUiBhdmFpbGFibGUgaW4gd2ViZ2wyXHJcbiAgICAvLyB0aGlzLl93cmFwUiA9IGVudW1zLldSQVBfUkVQRUFUO1xyXG4gICAgdGhpcy5fZm9ybWF0ID0gZW51bXMuVEVYVFVSRV9GTVRfUkdCQTg7XHJcblxyXG4gICAgdGhpcy5fdGFyZ2V0ID0gLTE7XHJcbiAgICBcclxuICAgIHRoaXMuX2lkID0gX3RleHR1cmVJRCsrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBkZXN0cm95XHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9nbElEID09PSBfbnVsbFdlYkdMVGV4dHVyZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGUgdGV4dHVyZSBhbHJlYWR5IGRlc3Ryb3llZCcpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdsID0gdGhpcy5fZGV2aWNlLl9nbDtcclxuICAgIGdsLmRlbGV0ZVRleHR1cmUodGhpcy5fZ2xJRCk7XHJcblxyXG4gICAgdGhpcy5fZGV2aWNlLl9zdGF0cy50ZXggLT0gdGhpcy5ieXRlcztcclxuICAgIHRoaXMuX2dsSUQgPSBfbnVsbFdlYkdMVGV4dHVyZTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==