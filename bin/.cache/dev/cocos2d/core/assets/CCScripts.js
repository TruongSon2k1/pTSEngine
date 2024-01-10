
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCScripts.js';
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
 * !#en Class for script handling.
 * !#zh Script 资源类。
 * @class _Script
 * @extends Asset
 *
 * @private
 */
var Script = cc.Class({
  name: 'cc.Script',
  "extends": cc.Asset
});
cc._Script = Script;
/**
 * !#en Class for JavaScript handling.
 * !#zh JavaScript 资源类。
 * @class _JavaScript
 * @extends Asset
 * @private
 *
 */

var JavaScript = cc.Class({
  name: 'cc.JavaScript',
  "extends": Script
});
cc._JavaScript = JavaScript;
/**
 * !#en Class for TypeScript handling.
 * !#zh TypeScript 资源类。
 * @class TypeScript
 * @extends Asset
 *
 */

var TypeScript = cc.Class({
  name: 'cc.TypeScript',
  "extends": Script
});
cc._TypeScript = TypeScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NTY3JpcHRzLmpzIl0sIm5hbWVzIjpbIlNjcmlwdCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJfU2NyaXB0IiwiSmF2YVNjcmlwdCIsIl9KYXZhU2NyaXB0IiwiVHlwZVNjcmlwdCIsIl9UeXBlU2NyaXB0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLE1BQU0sR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbEJDLEVBQUFBLElBQUksRUFBRSxXQURZO0FBRWxCLGFBQVNGLEVBQUUsQ0FBQ0c7QUFGTSxDQUFULENBQWI7QUFLQUgsRUFBRSxDQUFDSSxPQUFILEdBQWFMLE1BQWI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlNLFVBQVUsR0FBR0wsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxlQURnQjtBQUV0QixhQUFTSDtBQUZhLENBQVQsQ0FBakI7QUFLQUMsRUFBRSxDQUFDTSxXQUFILEdBQWlCRCxVQUFqQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlFLFVBQVUsR0FBR1AsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxlQURnQjtBQUV0QixhQUFTSDtBQUZhLENBQVQsQ0FBakI7QUFLQUMsRUFBRSxDQUFDUSxXQUFILEdBQWlCRCxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIENsYXNzIGZvciBzY3JpcHQgaGFuZGxpbmcuXHJcbiAqICEjemggU2NyaXB0IOi1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgX1NjcmlwdFxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIFNjcmlwdCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5TY3JpcHQnLFxyXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXHJcbn0pO1xyXG5cclxuY2MuX1NjcmlwdCA9IFNjcmlwdDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENsYXNzIGZvciBKYXZhU2NyaXB0IGhhbmRsaW5nLlxyXG4gKiAhI3poIEphdmFTY3JpcHQg6LWE5rqQ57G744CCXHJcbiAqIEBjbGFzcyBfSmF2YVNjcmlwdFxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKiBAcHJpdmF0ZVxyXG4gKlxyXG4gKi9cclxudmFyIEphdmFTY3JpcHQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuSmF2YVNjcmlwdCcsXHJcbiAgICBleHRlbmRzOiBTY3JpcHQsXHJcbn0pO1xyXG5cclxuY2MuX0phdmFTY3JpcHQgPSBKYXZhU2NyaXB0O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQ2xhc3MgZm9yIFR5cGVTY3JpcHQgaGFuZGxpbmcuXHJcbiAqICEjemggVHlwZVNjcmlwdCDotYTmupDnsbvjgIJcclxuICogQGNsYXNzIFR5cGVTY3JpcHRcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICpcclxuICovXHJcbnZhciBUeXBlU2NyaXB0ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlR5cGVTY3JpcHQnLFxyXG4gICAgZXh0ZW5kczogU2NyaXB0LFxyXG59KTtcclxuXHJcbmNjLl9UeXBlU2NyaXB0ID0gVHlwZVNjcmlwdDsiXSwic291cmNlUm9vdCI6Ii8ifQ==