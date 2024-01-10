
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSceneAsset.js';
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
 * !#en Class for scene handling.
 * !#zh 场景资源类。
 * @class SceneAsset
 * @extends Asset
 *
 */
var Scene = cc.Class({
  name: 'cc.SceneAsset',
  "extends": cc.Asset,
  properties: {
    /**
     * @property {Scene} scene
     * @default null
     */
    scene: null,

    /**
     * !#en Indicates the raw assets of this scene can be load after scene launched.
     * !#zh 指示该场景依赖的资源可否在场景切换后再延迟加载。
     * @property {Boolean} asyncLoadAssets
     * @default false
     */
    asyncLoadAssets: undefined //// backup prefab assets in editor
    //// {string} assetUuid: {cc.Node} rootInPrefab
    //_prefabDatas: {
    //    default: null,
    //    editorOnly: true
    //}

  }
});
cc.SceneAsset = Scene;
module.exports = Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NTY2VuZUFzc2V0LmpzIl0sIm5hbWVzIjpbIlNjZW5lIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsInByb3BlcnRpZXMiLCJzY2VuZSIsImFzeW5jTG9hZEFzc2V0cyIsInVuZGVmaW5lZCIsIlNjZW5lQXNzZXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2pCQyxFQUFBQSxJQUFJLEVBQUUsZUFEVztBQUVqQixhQUFTRixFQUFFLENBQUNHLEtBRks7QUFJakJDLEVBQUFBLFVBQVUsRUFBRTtBQUVSO0FBQ1I7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLEtBQUssRUFBRSxJQU5DOztBQVFSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxlQUFlLEVBQUVDLFNBZFQsQ0FnQlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQXJCUTtBQUpLLENBQVQsQ0FBWjtBQTZCQVAsRUFBRSxDQUFDUSxVQUFILEdBQWdCVCxLQUFoQjtBQUNBVSxNQUFNLENBQUNDLE9BQVAsR0FBaUJYLEtBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQ2xhc3MgZm9yIHNjZW5lIGhhbmRsaW5nLlxyXG4gKiAhI3poIOWcuuaZr+i1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgU2NlbmVBc3NldFxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKlxyXG4gKi9cclxudmFyIFNjZW5lID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlNjZW5lQXNzZXQnLFxyXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge1NjZW5lfSBzY2VuZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcclxuICAgICAgICAgKi9cclxuICAgICAgICBzY2VuZTogbnVsbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgdGhlIHJhdyBhc3NldHMgb2YgdGhpcyBzY2VuZSBjYW4gYmUgbG9hZCBhZnRlciBzY2VuZSBsYXVuY2hlZC5cclxuICAgICAgICAgKiAhI3poIOaMh+ekuuivpeWcuuaZr+S+nei1lueahOi1hOa6kOWPr+WQpuWcqOWcuuaZr+WIh+aNouWQjuWGjeW7tui/n+WKoOi9veOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYXN5bmNMb2FkQXNzZXRzXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBhc3luY0xvYWRBc3NldHM6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgLy8vLyBiYWNrdXAgcHJlZmFiIGFzc2V0cyBpbiBlZGl0b3JcclxuICAgICAgICAvLy8vIHtzdHJpbmd9IGFzc2V0VXVpZDoge2NjLk5vZGV9IHJvb3RJblByZWZhYlxyXG4gICAgICAgIC8vX3ByZWZhYkRhdGFzOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAvLyAgICBlZGl0b3JPbmx5OiB0cnVlXHJcbiAgICAgICAgLy99XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbmNjLlNjZW5lQXNzZXQgPSBTY2VuZTtcclxubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=