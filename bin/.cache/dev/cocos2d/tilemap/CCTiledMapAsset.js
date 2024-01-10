
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMapAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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

/**
 * Class for tiled map asset handling.
 * @class TiledMapAsset
 * @extends Asset
 *
 */
var TiledMapAsset = cc.Class({
  name: 'cc.TiledMapAsset',
  "extends": cc.Asset,
  properties: {
    tmxXmlStr: '',

    /**
     * @property {Texture2D[]} textures
     */
    textures: {
      "default": [],
      type: [cc.Texture2D]
    },

    /**
     * @property {String[]} textureNames
     */
    textureNames: [cc.String],

    /**
     * @property {Size[]} textureSizes
     */
    textureSizes: {
      "default": [],
      type: [cc.Size]
    },

    /**
     * @property {Texture2D[]} imageLayerTextures
     */
    imageLayerTextures: {
      "default": [],
      type: [cc.Texture2D]
    },

    /**
     * @property {String[]} imageLayerTextureNames
     */
    imageLayerTextureNames: [cc.String],
    tsxFiles: [cc.TextAsset],
    tsxFileNames: [cc.String]
  },
  statics: {
    preventDeferredLoadDependents: true
  },
  createNode: CC_EDITOR && function (callback) {
    var node = new cc.Node(this.name);
    var tiledMap = node.addComponent(cc.TiledMap);
    tiledMap.tmxAsset = this;
    return callback(null, node);
  }
});
cc.TiledMapAsset = TiledMapAsset;
module.exports = TiledMapAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVGlsZWRNYXBBc3NldC5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcEFzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsInByb3BlcnRpZXMiLCJ0bXhYbWxTdHIiLCJ0ZXh0dXJlcyIsInR5cGUiLCJUZXh0dXJlMkQiLCJ0ZXh0dXJlTmFtZXMiLCJTdHJpbmciLCJ0ZXh0dXJlU2l6ZXMiLCJTaXplIiwiaW1hZ2VMYXllclRleHR1cmVzIiwiaW1hZ2VMYXllclRleHR1cmVOYW1lcyIsInRzeEZpbGVzIiwiVGV4dEFzc2V0IiwidHN4RmlsZU5hbWVzIiwic3RhdGljcyIsInByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzIiwiY3JlYXRlTm9kZSIsIkNDX0VESVRPUiIsImNhbGxiYWNrIiwibm9kZSIsIk5vZGUiLCJ0aWxlZE1hcCIsImFkZENvbXBvbmVudCIsIlRpbGVkTWFwIiwidG14QXNzZXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsYUFBYSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLGtCQURtQjtBQUV6QixhQUFTRixFQUFFLENBQUNHLEtBRmE7QUFJekJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUUsRUFESDs7QUFHUjtBQUNSO0FBQ0E7QUFDUUMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsRUFESDtBQUVOQyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsRUFBRSxDQUFDUSxTQUFKO0FBRkEsS0FORjs7QUFXUjtBQUNSO0FBQ0E7QUFDUUMsSUFBQUEsWUFBWSxFQUFFLENBQUNULEVBQUUsQ0FBQ1UsTUFBSixDQWROOztBQWdCUjtBQUNSO0FBQ0E7QUFDUUMsSUFBQUEsWUFBWSxFQUFFO0FBQ1YsaUJBQVMsRUFEQztBQUVWSixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsRUFBRSxDQUFDWSxJQUFKO0FBRkksS0FuQk47O0FBd0JSO0FBQ1I7QUFDQTtBQUNRQyxJQUFBQSxrQkFBa0IsRUFBRTtBQUNoQixpQkFBUyxFQURPO0FBRWhCTixNQUFBQSxJQUFJLEVBQUUsQ0FBQ1AsRUFBRSxDQUFDUSxTQUFKO0FBRlUsS0EzQlo7O0FBZ0NSO0FBQ1I7QUFDQTtBQUNRTSxJQUFBQSxzQkFBc0IsRUFBRSxDQUFDZCxFQUFFLENBQUNVLE1BQUosQ0FuQ2hCO0FBcUNSSyxJQUFBQSxRQUFRLEVBQUUsQ0FBQ2YsRUFBRSxDQUFDZ0IsU0FBSixDQXJDRjtBQXNDUkMsSUFBQUEsWUFBWSxFQUFFLENBQUNqQixFQUFFLENBQUNVLE1BQUo7QUF0Q04sR0FKYTtBQTZDekJRLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSw2QkFBNkIsRUFBRTtBQUQxQixHQTdDZ0I7QUFpRHpCQyxFQUFBQSxVQUFVLEVBQUVDLFNBQVMsSUFBSSxVQUFVQyxRQUFWLEVBQW9CO0FBQ3pDLFFBQUlDLElBQUksR0FBRyxJQUFJdkIsRUFBRSxDQUFDd0IsSUFBUCxDQUFZLEtBQUt0QixJQUFqQixDQUFYO0FBQ0EsUUFBSXVCLFFBQVEsR0FBR0YsSUFBSSxDQUFDRyxZQUFMLENBQWtCMUIsRUFBRSxDQUFDMkIsUUFBckIsQ0FBZjtBQUNBRixJQUFBQSxRQUFRLENBQUNHLFFBQVQsR0FBb0IsSUFBcEI7QUFFQSxXQUFPTixRQUFRLENBQUMsSUFBRCxFQUFPQyxJQUFQLENBQWY7QUFDSDtBQXZEd0IsQ0FBVCxDQUFwQjtBQTBEQXZCLEVBQUUsQ0FBQ0QsYUFBSCxHQUFtQkEsYUFBbkI7QUFDQThCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9CLGFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGZvciB0aWxlZCBtYXAgYXNzZXQgaGFuZGxpbmcuXHJcbiAqIEBjbGFzcyBUaWxlZE1hcEFzc2V0XHJcbiAqIEBleHRlbmRzIEFzc2V0XHJcbiAqXHJcbiAqL1xyXG5sZXQgVGlsZWRNYXBBc3NldCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5UaWxlZE1hcEFzc2V0JyxcclxuICAgIGV4dGVuZHM6IGNjLkFzc2V0LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB0bXhYbWxTdHI6ICcnLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge1RleHR1cmUyRFtdfSB0ZXh0dXJlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRleHR1cmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuVGV4dHVyZTJEXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nW119IHRleHR1cmVOYW1lc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRleHR1cmVOYW1lczogW2NjLlN0cmluZ10sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2l6ZVtdfSB0ZXh0dXJlU2l6ZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0ZXh0dXJlU2l6ZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5TaXplXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VGV4dHVyZTJEW119IGltYWdlTGF5ZXJUZXh0dXJlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGltYWdlTGF5ZXJUZXh0dXJlczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlRleHR1cmUyRF1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSBpbWFnZUxheWVyVGV4dHVyZU5hbWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW1hZ2VMYXllclRleHR1cmVOYW1lczogW2NjLlN0cmluZ10sXHJcblxyXG4gICAgICAgIHRzeEZpbGVzOiBbY2MuVGV4dEFzc2V0XSxcclxuICAgICAgICB0c3hGaWxlTmFtZXM6IFtjYy5TdHJpbmddLFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlTm9kZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBub2RlID0gbmV3IGNjLk5vZGUodGhpcy5uYW1lKTtcclxuICAgICAgICBsZXQgdGlsZWRNYXAgPSBub2RlLmFkZENvbXBvbmVudChjYy5UaWxlZE1hcCk7XHJcbiAgICAgICAgdGlsZWRNYXAudG14QXNzZXQgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgbm9kZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuVGlsZWRNYXBBc3NldCA9IFRpbGVkTWFwQXNzZXQ7XHJcbm1vZHVsZS5leHBvcnRzID0gVGlsZWRNYXBBc3NldDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=