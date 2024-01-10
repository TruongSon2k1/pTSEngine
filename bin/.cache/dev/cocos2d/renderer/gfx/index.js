
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/index.js';
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

var gfx = null;

if (CC_JSB && CC_NATIVERENDERER) {
  gfx = window.gfx;
} else {
  var VertexFormat = require('./vertex-format');

  var IndexBuffer = require('./index-buffer');

  var VertexBuffer = require('./vertex-buffer');

  var Program = require('./program');

  var Texture = require('./texture');

  var Texture2D = require('./texture-2d');

  var TextureCube = require('./texture-cube');

  var RenderBuffer = require('./render-buffer');

  var FrameBuffer = require('./frame-buffer');

  var Device = require('./device');

  gfx = {
    // classes
    VertexFormat: VertexFormat,
    IndexBuffer: IndexBuffer,
    VertexBuffer: VertexBuffer,
    Program: Program,
    Texture: Texture,
    Texture2D: Texture2D,
    TextureCube: TextureCube,
    RenderBuffer: RenderBuffer,
    FrameBuffer: FrameBuffer,
    Device: Device,
    // functions
    attrTypeBytes: _enums.attrTypeBytes,
    glFilter: _enums.glFilter,
    glTextureFmt: _enums.glTextureFmt
  };
  Object.assign(gfx, _enums.enums);
}

var _default = gfx;
exports["default"] = _default;
cc.gfx = gfx;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXGluZGV4LmpzIl0sIm5hbWVzIjpbImdmeCIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwid2luZG93IiwiVmVydGV4Rm9ybWF0IiwicmVxdWlyZSIsIkluZGV4QnVmZmVyIiwiVmVydGV4QnVmZmVyIiwiUHJvZ3JhbSIsIlRleHR1cmUiLCJUZXh0dXJlMkQiLCJUZXh0dXJlQ3ViZSIsIlJlbmRlckJ1ZmZlciIsIkZyYW1lQnVmZmVyIiwiRGV2aWNlIiwiYXR0clR5cGVCeXRlcyIsImdsRmlsdGVyIiwiZ2xUZXh0dXJlRm10IiwiT2JqZWN0IiwiYXNzaWduIiwiZW51bXMiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQU9BLElBQUlBLEdBQUcsR0FBRyxJQUFWOztBQUVBLElBQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0JGLEVBQUFBLEdBQUcsR0FBR0csTUFBTSxDQUFDSCxHQUFiO0FBQ0gsQ0FGRCxNQUVPO0FBQ0gsTUFBSUksWUFBWSxHQUFHQyxPQUFPLENBQUMsaUJBQUQsQ0FBMUI7O0FBQ0EsTUFBSUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsZ0JBQUQsQ0FBekI7O0FBQ0EsTUFBSUUsWUFBWSxHQUFHRixPQUFPLENBQUMsaUJBQUQsQ0FBMUI7O0FBQ0EsTUFBSUcsT0FBTyxHQUFHSCxPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxNQUFJSSxPQUFPLEdBQUdKLE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLE1BQUlLLFNBQVMsR0FBR0wsT0FBTyxDQUFDLGNBQUQsQ0FBdkI7O0FBQ0EsTUFBSU0sV0FBVyxHQUFHTixPQUFPLENBQUMsZ0JBQUQsQ0FBekI7O0FBQ0EsTUFBSU8sWUFBWSxHQUFHUCxPQUFPLENBQUMsaUJBQUQsQ0FBMUI7O0FBQ0EsTUFBSVEsV0FBVyxHQUFHUixPQUFPLENBQUMsZ0JBQUQsQ0FBekI7O0FBQ0EsTUFBSVMsTUFBTSxHQUFHVCxPQUFPLENBQUMsVUFBRCxDQUFwQjs7QUFFQUwsRUFBQUEsR0FBRyxHQUFHO0FBQ0Y7QUFDQUksSUFBQUEsWUFBWSxFQUFaQSxZQUZFO0FBR0ZFLElBQUFBLFdBQVcsRUFBWEEsV0FIRTtBQUlGQyxJQUFBQSxZQUFZLEVBQVpBLFlBSkU7QUFLRkMsSUFBQUEsT0FBTyxFQUFQQSxPQUxFO0FBTUZDLElBQUFBLE9BQU8sRUFBUEEsT0FORTtBQU9GQyxJQUFBQSxTQUFTLEVBQVRBLFNBUEU7QUFRRkMsSUFBQUEsV0FBVyxFQUFYQSxXQVJFO0FBU0ZDLElBQUFBLFlBQVksRUFBWkEsWUFURTtBQVVGQyxJQUFBQSxXQUFXLEVBQVhBLFdBVkU7QUFXRkMsSUFBQUEsTUFBTSxFQUFOQSxNQVhFO0FBYUY7QUFDQUMsSUFBQUEsYUFBYSxFQUFiQSxvQkFkRTtBQWVGQyxJQUFBQSxRQUFRLEVBQVJBLGVBZkU7QUFnQkZDLElBQUFBLFlBQVksRUFBWkE7QUFoQkUsR0FBTjtBQWtCQUMsRUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNuQixHQUFkLEVBQW1Cb0IsWUFBbkI7QUFDSDs7ZUFFY3BCOztBQUNmcUIsRUFBRSxDQUFDckIsR0FBSCxHQUFTQSxHQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIGVudW1zLFxyXG4gICAgYXR0clR5cGVCeXRlcyxcclxuICAgIGdsRmlsdGVyLFxyXG4gICAgZ2xUZXh0dXJlRm10LFxyXG59IGZyb20gJy4vZW51bXMnO1xyXG5cclxubGV0IGdmeCA9IG51bGw7XHJcblxyXG5pZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICBnZnggPSB3aW5kb3cuZ2Z4O1xyXG59IGVsc2Uge1xyXG4gICAgbGV0IFZlcnRleEZvcm1hdCA9IHJlcXVpcmUoJy4vdmVydGV4LWZvcm1hdCcpO1xyXG4gICAgbGV0IEluZGV4QnVmZmVyID0gcmVxdWlyZSgnLi9pbmRleC1idWZmZXInKTtcclxuICAgIGxldCBWZXJ0ZXhCdWZmZXIgPSByZXF1aXJlKCcuL3ZlcnRleC1idWZmZXInKTtcclxuICAgIGxldCBQcm9ncmFtID0gcmVxdWlyZSgnLi9wcm9ncmFtJyk7XHJcbiAgICBsZXQgVGV4dHVyZSA9IHJlcXVpcmUoJy4vdGV4dHVyZScpO1xyXG4gICAgbGV0IFRleHR1cmUyRCA9IHJlcXVpcmUoJy4vdGV4dHVyZS0yZCcpO1xyXG4gICAgbGV0IFRleHR1cmVDdWJlID0gcmVxdWlyZSgnLi90ZXh0dXJlLWN1YmUnKTtcclxuICAgIGxldCBSZW5kZXJCdWZmZXIgPSByZXF1aXJlKCcuL3JlbmRlci1idWZmZXInKTtcclxuICAgIGxldCBGcmFtZUJ1ZmZlciA9IHJlcXVpcmUoJy4vZnJhbWUtYnVmZmVyJyk7XHJcbiAgICBsZXQgRGV2aWNlID0gcmVxdWlyZSgnLi9kZXZpY2UnKTtcclxuXHJcbiAgICBnZnggPSB7XHJcbiAgICAgICAgLy8gY2xhc3Nlc1xyXG4gICAgICAgIFZlcnRleEZvcm1hdCxcclxuICAgICAgICBJbmRleEJ1ZmZlcixcclxuICAgICAgICBWZXJ0ZXhCdWZmZXIsXHJcbiAgICAgICAgUHJvZ3JhbSxcclxuICAgICAgICBUZXh0dXJlLFxyXG4gICAgICAgIFRleHR1cmUyRCxcclxuICAgICAgICBUZXh0dXJlQ3ViZSxcclxuICAgICAgICBSZW5kZXJCdWZmZXIsXHJcbiAgICAgICAgRnJhbWVCdWZmZXIsXHJcbiAgICAgICAgRGV2aWNlLFxyXG5cclxuICAgICAgICAvLyBmdW5jdGlvbnNcclxuICAgICAgICBhdHRyVHlwZUJ5dGVzLFxyXG4gICAgICAgIGdsRmlsdGVyLFxyXG4gICAgICAgIGdsVGV4dHVyZUZtdCxcclxuICAgIH07XHJcbiAgICBPYmplY3QuYXNzaWduKGdmeCwgZW51bXMpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZng7XHJcbmNjLmdmeCA9IGdmeDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=