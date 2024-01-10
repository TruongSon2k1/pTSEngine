
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCJsonAsset.js';
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

/**
 * !#en
 * Class for JSON file. When the JSON file is loaded, this object is returned.
 * The parsed JSON object can be accessed through the `json` attribute in it.<br>
 * If you want to get the original JSON text, you should modify the extname to `.txt`
 * so that it is loaded as a `TextAsset` instead of a `JsonAsset`.
 *
 * !#zh
 * JSON 资源类。JSON 文件加载后，将会返回该对象。可以通过其中的 `json` 属性访问解析后的 JSON 对象。<br>
 * 如果你想要获得 JSON 的原始文本，那么应该修改源文件的后缀为 `.txt`，这样就会加载为一个 `TextAsset` 而不是 `JsonAsset`。
 *
 * @class JsonAsset
 * @extends Asset
 */
var JsonAsset = cc.Class({
  name: 'cc.JsonAsset',
  "extends": cc.Asset,
  properties: {
    /**
     * @property {Object} json - The loaded JSON object.
     */
    json: null
  }
});
module.exports = cc.JsonAsset = JsonAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NKc29uQXNzZXQuanMiXSwibmFtZXMiOlsiSnNvbkFzc2V0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsInByb3BlcnRpZXMiLCJqc29uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0YsRUFBRSxDQUFDRyxLQUZTO0FBR3JCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNSO0FBQ0E7QUFDUUMsSUFBQUEsSUFBSSxFQUFFO0FBSkU7QUFIUyxDQUFULENBQWhCO0FBV0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlAsRUFBRSxDQUFDRCxTQUFILEdBQWVBLFNBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ2xhc3MgZm9yIEpTT04gZmlsZS4gV2hlbiB0aGUgSlNPTiBmaWxlIGlzIGxvYWRlZCwgdGhpcyBvYmplY3QgaXMgcmV0dXJuZWQuXHJcbiAqIFRoZSBwYXJzZWQgSlNPTiBvYmplY3QgY2FuIGJlIGFjY2Vzc2VkIHRocm91Z2ggdGhlIGBqc29uYCBhdHRyaWJ1dGUgaW4gaXQuPGJyPlxyXG4gKiBJZiB5b3Ugd2FudCB0byBnZXQgdGhlIG9yaWdpbmFsIEpTT04gdGV4dCwgeW91IHNob3VsZCBtb2RpZnkgdGhlIGV4dG5hbWUgdG8gYC50eHRgXHJcbiAqIHNvIHRoYXQgaXQgaXMgbG9hZGVkIGFzIGEgYFRleHRBc3NldGAgaW5zdGVhZCBvZiBhIGBKc29uQXNzZXRgLlxyXG4gKlxyXG4gKiAhI3poXHJcbiAqIEpTT04g6LWE5rqQ57G744CCSlNPTiDmlofku7bliqDovb3lkI7vvIzlsIbkvJrov5Tlm57or6Xlr7nosaHjgILlj6/ku6XpgJrov4flhbbkuK3nmoQgYGpzb25gIOWxnuaAp+iuv+mXruino+aekOWQjueahCBKU09OIOWvueixoeOAgjxicj5cclxuICog5aaC5p6c5L2g5oOz6KaB6I635b6XIEpTT04g55qE5Y6f5aeL5paH5pys77yM6YKj5LmI5bqU6K+l5L+u5pS55rqQ5paH5Lu255qE5ZCO57yA5Li6IGAudHh0YO+8jOi/meagt+WwseS8muWKoOi9veS4uuS4gOS4qiBgVGV4dEFzc2V0YCDogIzkuI3mmK8gYEpzb25Bc3NldGDjgIJcclxuICpcclxuICogQGNsYXNzIEpzb25Bc3NldFxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKi9cclxudmFyIEpzb25Bc3NldCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Kc29uQXNzZXQnLFxyXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtPYmplY3R9IGpzb24gLSBUaGUgbG9hZGVkIEpTT04gb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGpzb246IG51bGwsXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuSnNvbkFzc2V0ID0gSnNvbkFzc2V0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==