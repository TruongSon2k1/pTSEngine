
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/tiledmap-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var TiledMapBuffer = cc.Class({
  name: 'cc.TiledMapBuffer',
  "extends": require('../core/renderer/webgl/quad-buffer'),
  _updateOffset: function _updateOffset() {
    var offsetInfo = this._offsetInfo;
    offsetInfo.vertexOffset = this.vertexOffset;
    offsetInfo.indiceOffset = this.indiceOffset;
    offsetInfo.byteOffset = this.byteOffset;
  },
  adjust: function adjust(vertexCount, indiceCount) {
    this.vertexOffset += vertexCount;
    this.indiceOffset += indiceCount;
    this.indiceStart = this.indiceOffset;
    this.byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    this._dirty = true;
  }
});
cc.TiledMapBuffer = module.exports = TiledMapBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXHRpbGVkbWFwLWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcEJ1ZmZlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsIl91cGRhdGVPZmZzZXQiLCJvZmZzZXRJbmZvIiwiX29mZnNldEluZm8iLCJ2ZXJ0ZXhPZmZzZXQiLCJpbmRpY2VPZmZzZXQiLCJieXRlT2Zmc2V0IiwiYWRqdXN0IiwidmVydGV4Q291bnQiLCJpbmRpY2VDb3VudCIsImluZGljZVN0YXJ0IiwiX3ZlcnRleEJ5dGVzIiwiX2RpcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxtQkFEb0I7QUFFMUIsYUFBU0MsT0FBTyxDQUFDLG9DQUFELENBRlU7QUFJMUJDLEVBQUFBLGFBSjBCLDJCQUlUO0FBQ2IsUUFBSUMsVUFBVSxHQUFHLEtBQUtDLFdBQXRCO0FBQ0FELElBQUFBLFVBQVUsQ0FBQ0UsWUFBWCxHQUEwQixLQUFLQSxZQUEvQjtBQUNBRixJQUFBQSxVQUFVLENBQUNHLFlBQVgsR0FBMEIsS0FBS0EsWUFBL0I7QUFDQUgsSUFBQUEsVUFBVSxDQUFDSSxVQUFYLEdBQXdCLEtBQUtBLFVBQTdCO0FBQ0gsR0FUeUI7QUFXMUJDLEVBQUFBLE1BWDBCLGtCQVdsQkMsV0FYa0IsRUFXTEMsV0FYSyxFQVdRO0FBQzlCLFNBQUtMLFlBQUwsSUFBcUJJLFdBQXJCO0FBQ0EsU0FBS0gsWUFBTCxJQUFxQkksV0FBckI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEtBQUtMLFlBQXhCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixLQUFLQSxVQUFMLEdBQWtCRSxXQUFXLEdBQUcsS0FBS0csWUFBdkQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNIO0FBakJ5QixDQUFULENBQXJCO0FBb0JBZixFQUFFLENBQUNELGNBQUgsR0FBb0JpQixNQUFNLENBQUNDLE9BQVAsR0FBaUJsQixjQUFyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5sZXQgVGlsZWRNYXBCdWZmZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVGlsZWRNYXBCdWZmZXInLFxyXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci93ZWJnbC9xdWFkLWJ1ZmZlcicpLFxyXG5cclxuICAgIF91cGRhdGVPZmZzZXQgKCkge1xyXG4gICAgICAgIGxldCBvZmZzZXRJbmZvID0gdGhpcy5fb2Zmc2V0SW5mbztcclxuICAgICAgICBvZmZzZXRJbmZvLnZlcnRleE9mZnNldCA9IHRoaXMudmVydGV4T2Zmc2V0O1xyXG4gICAgICAgIG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0ID0gdGhpcy5pbmRpY2VPZmZzZXQ7XHJcbiAgICAgICAgb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID0gdGhpcy5ieXRlT2Zmc2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGp1c3QgKHZlcnRleENvdW50LCBpbmRpY2VDb3VudCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4T2Zmc2V0ICs9IHZlcnRleENvdW50O1xyXG4gICAgICAgIHRoaXMuaW5kaWNlT2Zmc2V0ICs9IGluZGljZUNvdW50O1xyXG4gICAgICAgIHRoaXMuaW5kaWNlU3RhcnQgPSB0aGlzLmluZGljZU9mZnNldDtcclxuICAgICAgICB0aGlzLmJ5dGVPZmZzZXQgPSB0aGlzLmJ5dGVPZmZzZXQgKyB2ZXJ0ZXhDb3VudCAqIHRoaXMuX3ZlcnRleEJ5dGVzO1xyXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5UaWxlZE1hcEJ1ZmZlciA9IG1vZHVsZS5leHBvcnRzID0gVGlsZWRNYXBCdWZmZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=