
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/shared.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var Cache = require('./cache');

var Pipeline = require('./pipeline');

var assets = new Cache();
var files = new Cache();
var parsed = new Cache();
var bundles = new Cache();
var pipeline = new Pipeline('normal load', []);
var fetchPipeline = new Pipeline('fetch', []);
var transformPipeline = new Pipeline('transform url', []);
/**
 * @module cc.AssetManager
 */

var RequestType = {
  UUID: 'uuid',
  PATH: 'path',
  DIR: 'dir',
  URL: 'url',
  SCENE: 'scene'
};
/**
 * !#en
 * The builtin bundles 
 * 
 * !#zh
 * 内置 bundle
 * 
 * @enum BuiltinBundleName
 */

var BuiltinBundleName = {
  /**
   * !#en
   * The builtin bundle corresponds to 'assets/resources'.
   * 
   * !#zh
   * 内置 bundle, 对应 'assets/resources' 目录
   * 
   * @property RESOURCES
   * @readonly
   * @type {String}
   */
  RESOURCES: 'resources',

  /**
   * !#en
   * The builtin bundle corresponds to 'internal/resources'.
   * 
   * !#zh
   * 内置 bundle, 对应 'internal/resources' 目录
   * 
   * @property INTERNAL
   * @readonly
   * @type {String}
   */
  INTERNAL: 'internal',

  /**
   * !#en
   * The builtin bundle
   * 
   * !#zh
   * 内置 bundle
   * 
   * @property MAIN
   * @readonly
   * @type {String}
   */
  MAIN: 'main',

  /**
   * !#en
   * The builtin bundle, exists when Start Scene asset bundle is checked on the project building panel
   * 
   * !#zh
   * 内置 bundle, 如果构建面板开启了首场景分包，则会有 START_SCENE bundle
   * 
   * @property START_SCENE
   * @readonly
   * @type {String}
   */
  START_SCENE: 'start-scene'
};
module.exports = {
  assets: assets,
  files: files,
  parsed: parsed,
  pipeline: pipeline,
  fetchPipeline: fetchPipeline,
  transformPipeline: transformPipeline,
  RequestType: RequestType,
  bundles: bundles,
  BuiltinBundleName: BuiltinBundleName
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHNoYXJlZC5qcyJdLCJuYW1lcyI6WyJDYWNoZSIsInJlcXVpcmUiLCJQaXBlbGluZSIsImFzc2V0cyIsImZpbGVzIiwicGFyc2VkIiwiYnVuZGxlcyIsInBpcGVsaW5lIiwiZmV0Y2hQaXBlbGluZSIsInRyYW5zZm9ybVBpcGVsaW5lIiwiUmVxdWVzdFR5cGUiLCJVVUlEIiwiUEFUSCIsIkRJUiIsIlVSTCIsIlNDRU5FIiwiQnVpbHRpbkJ1bmRsZU5hbWUiLCJSRVNPVVJDRVMiLCJJTlRFUk5BTCIsIk1BSU4iLCJTVEFSVF9TQ0VORSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQU1DLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFlBQUQsQ0FBeEI7O0FBRUEsSUFBSUUsTUFBTSxHQUFHLElBQUlILEtBQUosRUFBYjtBQUNBLElBQUlJLEtBQUssR0FBRyxJQUFJSixLQUFKLEVBQVo7QUFDQSxJQUFJSyxNQUFNLEdBQUcsSUFBSUwsS0FBSixFQUFiO0FBQ0EsSUFBSU0sT0FBTyxHQUFHLElBQUlOLEtBQUosRUFBZDtBQUNBLElBQUlPLFFBQVEsR0FBRyxJQUFJTCxRQUFKLENBQWEsYUFBYixFQUE0QixFQUE1QixDQUFmO0FBQ0EsSUFBSU0sYUFBYSxHQUFHLElBQUlOLFFBQUosQ0FBYSxPQUFiLEVBQXNCLEVBQXRCLENBQXBCO0FBQ0EsSUFBSU8saUJBQWlCLEdBQUcsSUFBSVAsUUFBSixDQUFhLGVBQWIsRUFBOEIsRUFBOUIsQ0FBeEI7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSVEsV0FBVyxHQUFHO0FBRWRDLEVBQUFBLElBQUksRUFBRSxNQUZRO0FBSWRDLEVBQUFBLElBQUksRUFBRSxNQUpRO0FBTWRDLEVBQUFBLEdBQUcsRUFBRSxLQU5TO0FBUWRDLEVBQUFBLEdBQUcsRUFBRSxLQVJTO0FBVWRDLEVBQUFBLEtBQUssRUFBRTtBQVZPLENBQWxCO0FBYUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLGlCQUFpQixHQUFHO0FBQ3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsU0FBUyxFQUFFLFdBWlM7O0FBY3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsUUFBUSxFQUFFLFVBekJVOztBQTJCcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUUsTUF0Q2M7O0FBd0NwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFdBQVcsRUFBRTtBQW5ETyxDQUF4QjtBQXNEQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQUVuQixFQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVUMsRUFBQUEsS0FBSyxFQUFMQSxLQUFWO0FBQWlCQyxFQUFBQSxNQUFNLEVBQU5BLE1BQWpCO0FBQXlCRSxFQUFBQSxRQUFRLEVBQVJBLFFBQXpCO0FBQW1DQyxFQUFBQSxhQUFhLEVBQWJBLGFBQW5DO0FBQWtEQyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQUFsRDtBQUFxRUMsRUFBQUEsV0FBVyxFQUFYQSxXQUFyRTtBQUFrRkosRUFBQUEsT0FBTyxFQUFQQSxPQUFsRjtBQUEyRlUsRUFBQUEsaUJBQWlCLEVBQWpCQTtBQUEzRixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xyXG5jb25zdCBQaXBlbGluZSA9IHJlcXVpcmUoJy4vcGlwZWxpbmUnKTtcclxuXHJcbnZhciBhc3NldHMgPSBuZXcgQ2FjaGUoKTtcclxudmFyIGZpbGVzID0gbmV3IENhY2hlKCk7XHJcbnZhciBwYXJzZWQgPSBuZXcgQ2FjaGUoKTtcclxudmFyIGJ1bmRsZXMgPSBuZXcgQ2FjaGUoKTtcclxudmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCdub3JtYWwgbG9hZCcsIFtdKTtcclxudmFyIGZldGNoUGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ2ZldGNoJywgW10pO1xyXG52YXIgdHJhbnNmb3JtUGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ3RyYW5zZm9ybSB1cmwnLCBbXSk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcclxuICovXHJcblxyXG52YXIgUmVxdWVzdFR5cGUgPSB7XHJcbiAgICBcclxuICAgIFVVSUQ6ICd1dWlkJyxcclxuXHJcbiAgICBQQVRIOiAncGF0aCcsXHJcblxyXG4gICAgRElSOiAnZGlyJyxcclxuXHJcbiAgICBVUkw6ICd1cmwnLFxyXG5cclxuICAgIFNDRU5FOiAnc2NlbmUnXHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgYnVpbHRpbiBidW5kbGVzIFxyXG4gKiBcclxuICogISN6aFxyXG4gKiDlhoXnva4gYnVuZGxlXHJcbiAqIFxyXG4gKiBAZW51bSBCdWlsdGluQnVuZGxlTmFtZVxyXG4gKi9cclxudmFyIEJ1aWx0aW5CdW5kbGVOYW1lID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgYnVpbHRpbiBidW5kbGUgY29ycmVzcG9uZHMgdG8gJ2Fzc2V0cy9yZXNvdXJjZXMnLlxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhoXnva4gYnVuZGxlLCDlr7nlupQgJ2Fzc2V0cy9yZXNvdXJjZXMnIOebruW9lVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgUkVTT1VSQ0VTXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIFJFU09VUkNFUzogJ3Jlc291cmNlcycsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgYnVpbHRpbiBidW5kbGUgY29ycmVzcG9uZHMgdG8gJ2ludGVybmFsL3Jlc291cmNlcycuXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWGhee9riBidW5kbGUsIOWvueW6lCAnaW50ZXJuYWwvcmVzb3VyY2VzJyDnm67lvZVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IElOVEVSTkFMXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIElOVEVSTkFMOiAnaW50ZXJuYWwnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGJ1aWx0aW4gYnVuZGxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWGhee9riBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IE1BSU5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgTUFJTjogJ21haW4nLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGJ1aWx0aW4gYnVuZGxlLCBleGlzdHMgd2hlbiBTdGFydCBTY2VuZSBhc3NldCBidW5kbGUgaXMgY2hlY2tlZCBvbiB0aGUgcHJvamVjdCBidWlsZGluZyBwYW5lbFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhoXnva4gYnVuZGxlLCDlpoLmnpzmnoTlu7rpnaLmnb/lvIDlkK/kuobpppblnLrmma/liIbljIXvvIzliJnkvJrmnIkgU1RBUlRfU0NFTkUgYnVuZGxlXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBTVEFSVF9TQ0VORVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBTVEFSVF9TQ0VORTogJ3N0YXJ0LXNjZW5lJyxcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBhc3NldHMsIGZpbGVzLCBwYXJzZWQsIHBpcGVsaW5lLCBmZXRjaFBpcGVsaW5lLCB0cmFuc2Zvcm1QaXBlbGluZSwgUmVxdWVzdFR5cGUsIGJ1bmRsZXMsIEJ1aWx0aW5CdW5kbGVOYW1lIH07Il0sInNvdXJjZVJvb3QiOiIvIn0=