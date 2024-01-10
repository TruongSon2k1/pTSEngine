
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/id-generater.js';
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
// ID generater for runtime
var NonUuidMark = '.';
/*
 * @param {string} [category] - You can specify a unique category to avoid id collision with other instance of IdGenerater
 */

function IdGenerater(category) {
  // init with a random id to emphasize that the returns id should not be stored in persistence data
  this.id = 0 | Math.random() * 998;
  this.prefix = category ? category + NonUuidMark : '';
}
/*
 * @method getNewId
 * @return {string}
 */


IdGenerater.prototype.getNewId = function () {
  return this.prefix + ++this.id;
};
/*
 * The global id generater might have a conflict problem once every 365 days,
 * if the game runs at 60 FPS and each frame 4760273 counts of new id are requested.
 */


IdGenerater.global = new IdGenerater('global');
module.exports = IdGenerater;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxpZC1nZW5lcmF0ZXIuanMiXSwibmFtZXMiOlsiTm9uVXVpZE1hcmsiLCJJZEdlbmVyYXRlciIsImNhdGVnb3J5IiwiaWQiLCJNYXRoIiwicmFuZG9tIiwicHJlZml4IiwicHJvdG90eXBlIiwiZ2V0TmV3SWQiLCJnbG9iYWwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBLElBQUlBLFdBQVcsR0FBRyxHQUFsQjtBQUVBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTQyxXQUFULENBQXNCQyxRQUF0QixFQUFnQztBQUM1QjtBQUNBLE9BQUtDLEVBQUwsR0FBVSxJQUFLQyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsR0FBL0I7QUFFQSxPQUFLQyxNQUFMLEdBQWNKLFFBQVEsR0FBSUEsUUFBUSxHQUFHRixXQUFmLEdBQThCLEVBQXBEO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FDLFdBQVcsQ0FBQ00sU0FBWixDQUFzQkMsUUFBdEIsR0FBaUMsWUFBWTtBQUN6QyxTQUFPLEtBQUtGLE1BQUwsR0FBZSxFQUFFLEtBQUtILEVBQTdCO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUYsV0FBVyxDQUFDUSxNQUFaLEdBQXFCLElBQUlSLFdBQUosQ0FBZ0IsUUFBaEIsQ0FBckI7QUFFQVMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCVixXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLy8gSUQgZ2VuZXJhdGVyIGZvciBydW50aW1lXHJcblxyXG52YXIgTm9uVXVpZE1hcmsgPSAnLic7XHJcblxyXG4vKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NhdGVnb3J5XSAtIFlvdSBjYW4gc3BlY2lmeSBhIHVuaXF1ZSBjYXRlZ29yeSB0byBhdm9pZCBpZCBjb2xsaXNpb24gd2l0aCBvdGhlciBpbnN0YW5jZSBvZiBJZEdlbmVyYXRlclxyXG4gKi9cclxuZnVuY3Rpb24gSWRHZW5lcmF0ZXIgKGNhdGVnb3J5KSB7XHJcbiAgICAvLyBpbml0IHdpdGggYSByYW5kb20gaWQgdG8gZW1waGFzaXplIHRoYXQgdGhlIHJldHVybnMgaWQgc2hvdWxkIG5vdCBiZSBzdG9yZWQgaW4gcGVyc2lzdGVuY2UgZGF0YVxyXG4gICAgdGhpcy5pZCA9IDAgfCAoTWF0aC5yYW5kb20oKSAqIDk5OCk7XHJcbiAgICBcclxuICAgIHRoaXMucHJlZml4ID0gY2F0ZWdvcnkgPyAoY2F0ZWdvcnkgKyBOb25VdWlkTWFyaykgOiAnJztcclxufVxyXG5cclxuLypcclxuICogQG1ldGhvZCBnZXROZXdJZFxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5JZEdlbmVyYXRlci5wcm90b3R5cGUuZ2V0TmV3SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcmVmaXggKyAoKyt0aGlzLmlkKTtcclxufTtcclxuXHJcbi8qXHJcbiAqIFRoZSBnbG9iYWwgaWQgZ2VuZXJhdGVyIG1pZ2h0IGhhdmUgYSBjb25mbGljdCBwcm9ibGVtIG9uY2UgZXZlcnkgMzY1IGRheXMsXHJcbiAqIGlmIHRoZSBnYW1lIHJ1bnMgYXQgNjAgRlBTIGFuZCBlYWNoIGZyYW1lIDQ3NjAyNzMgY291bnRzIG9mIG5ldyBpZCBhcmUgcmVxdWVzdGVkLlxyXG4gKi9cclxuSWRHZW5lcmF0ZXIuZ2xvYmFsID0gbmV3IElkR2VuZXJhdGVyKCdnbG9iYWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSWRHZW5lcmF0ZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9