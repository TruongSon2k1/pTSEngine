
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/requiring-frame.js';
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
var requiringFrames = []; // the requiring frame infos

cc._RF = {
  push: function push(module, uuid, script) {
    if (script === undefined) {
      script = uuid;
      uuid = '';
    }

    requiringFrames.push({
      uuid: uuid,
      script: script,
      module: module,
      exports: module.exports,
      // original exports
      beh: null
    });
  },
  pop: function pop() {
    var frameInfo = requiringFrames.pop(); // check exports

    var module = frameInfo.module;
    var exports = module.exports;

    if (exports === frameInfo.exports) {
      for (var anyKey in exports) {
        // exported
        return;
      } // auto export component


      module.exports = exports = frameInfo.cls;
    }
  },
  peek: function peek() {
    return requiringFrames[requiringFrames.length - 1];
  }
};

if (CC_EDITOR) {
  cc._RF.reset = function () {
    requiringFrames = [];
  };
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxyZXF1aXJpbmctZnJhbWUuanMiXSwibmFtZXMiOlsicmVxdWlyaW5nRnJhbWVzIiwiY2MiLCJfUkYiLCJwdXNoIiwibW9kdWxlIiwidXVpZCIsInNjcmlwdCIsInVuZGVmaW5lZCIsImV4cG9ydHMiLCJiZWgiLCJwb3AiLCJmcmFtZUluZm8iLCJhbnlLZXkiLCJjbHMiLCJwZWVrIiwibGVuZ3RoIiwiQ0NfRURJVE9SIiwicmVzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGVBQWUsR0FBRyxFQUF0QixFQUEyQjs7QUFFM0JDLEVBQUUsQ0FBQ0MsR0FBSCxHQUFTO0FBQ0xDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCQyxJQUFsQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDbEMsUUFBSUEsTUFBTSxLQUFLQyxTQUFmLEVBQTBCO0FBQ3RCRCxNQUFBQSxNQUFNLEdBQUdELElBQVQ7QUFDQUEsTUFBQUEsSUFBSSxHQUFHLEVBQVA7QUFDSDs7QUFDREwsSUFBQUEsZUFBZSxDQUFDRyxJQUFoQixDQUFxQjtBQUNqQkUsTUFBQUEsSUFBSSxFQUFFQSxJQURXO0FBRWpCQyxNQUFBQSxNQUFNLEVBQUVBLE1BRlM7QUFHakJGLE1BQUFBLE1BQU0sRUFBRUEsTUFIUztBQUlqQkksTUFBQUEsT0FBTyxFQUFFSixNQUFNLENBQUNJLE9BSkM7QUFJVztBQUM1QkMsTUFBQUEsR0FBRyxFQUFFO0FBTFksS0FBckI7QUFPSCxHQWJJO0FBY0xDLEVBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsUUFBSUMsU0FBUyxHQUFHWCxlQUFlLENBQUNVLEdBQWhCLEVBQWhCLENBRGEsQ0FFYjs7QUFDQSxRQUFJTixNQUFNLEdBQUdPLFNBQVMsQ0FBQ1AsTUFBdkI7QUFDQSxRQUFJSSxPQUFPLEdBQUdKLE1BQU0sQ0FBQ0ksT0FBckI7O0FBQ0EsUUFBSUEsT0FBTyxLQUFLRyxTQUFTLENBQUNILE9BQTFCLEVBQW1DO0FBQy9CLFdBQUssSUFBSUksTUFBVCxJQUFtQkosT0FBbkIsRUFBNEI7QUFDeEI7QUFDQTtBQUNILE9BSjhCLENBSy9COzs7QUFDQUosTUFBQUEsTUFBTSxDQUFDSSxPQUFQLEdBQWlCQSxPQUFPLEdBQUdHLFNBQVMsQ0FBQ0UsR0FBckM7QUFDSDtBQUNKLEdBM0JJO0FBNEJMQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxXQUFPZCxlQUFlLENBQUNBLGVBQWUsQ0FBQ2UsTUFBaEIsR0FBeUIsQ0FBMUIsQ0FBdEI7QUFDSDtBQTlCSSxDQUFUOztBQWlDQSxJQUFJQyxTQUFKLEVBQWU7QUFDWGYsRUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU9lLEtBQVAsR0FBZSxZQUFZO0FBQ3ZCakIsSUFBQUEsZUFBZSxHQUFHLEVBQWxCO0FBQ0gsR0FGRDtBQUdIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIHJlcXVpcmluZ0ZyYW1lcyA9IFtdOyAgLy8gdGhlIHJlcXVpcmluZyBmcmFtZSBpbmZvc1xyXG5cclxuY2MuX1JGID0ge1xyXG4gICAgcHVzaDogZnVuY3Rpb24gKG1vZHVsZSwgdXVpZCwgc2NyaXB0KSB7XHJcbiAgICAgICAgaWYgKHNjcmlwdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHNjcmlwdCA9IHV1aWQ7XHJcbiAgICAgICAgICAgIHV1aWQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWlyaW5nRnJhbWVzLnB1c2goe1xyXG4gICAgICAgICAgICB1dWlkOiB1dWlkLFxyXG4gICAgICAgICAgICBzY3JpcHQ6IHNjcmlwdCxcclxuICAgICAgICAgICAgbW9kdWxlOiBtb2R1bGUsXHJcbiAgICAgICAgICAgIGV4cG9ydHM6IG1vZHVsZS5leHBvcnRzLCAgICAvLyBvcmlnaW5hbCBleHBvcnRzXHJcbiAgICAgICAgICAgIGJlaDogbnVsbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHBvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmcmFtZUluZm8gPSByZXF1aXJpbmdGcmFtZXMucG9wKCk7XHJcbiAgICAgICAgLy8gY2hlY2sgZXhwb3J0c1xyXG4gICAgICAgIHZhciBtb2R1bGUgPSBmcmFtZUluZm8ubW9kdWxlO1xyXG4gICAgICAgIHZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHM7XHJcbiAgICAgICAgaWYgKGV4cG9ydHMgPT09IGZyYW1lSW5mby5leHBvcnRzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFueUtleSBpbiBleHBvcnRzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHBvcnRlZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGF1dG8gZXhwb3J0IGNvbXBvbmVudFxyXG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmcmFtZUluZm8uY2xzO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwZWVrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmluZ0ZyYW1lc1tyZXF1aXJpbmdGcmFtZXMubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAoQ0NfRURJVE9SKSB7XHJcbiAgICBjYy5fUkYucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmVxdWlyaW5nRnJhbWVzID0gW107XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9