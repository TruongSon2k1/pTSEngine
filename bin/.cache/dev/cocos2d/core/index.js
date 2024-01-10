
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/index.js';
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
require('./platform');

require('./assets');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./CCNode');

  require('./CCPrivateNode');

  require('./CCScene');

  require('./components');

  require('./graphics');

  require('./collider'); // CCIntersection can be used separately.


  require('./collider/CCIntersection');

  require('./physics');

  require('./camera/CCCamera');

  require('./geom-utils');
}

require('./mesh');

require('./3d');

require('./base-ui/CCWidgetManager');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJpc01haW5Qcm9jZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLFVBQUQsQ0FBUDs7QUFFQSxJQUFJLENBQUNDLFNBQUQsSUFBYyxDQUFDQyxNQUFNLENBQUNDLGFBQTFCLEVBQXlDO0FBQ3JDSCxFQUFBQSxPQUFPLENBQUMsVUFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLFdBQUQsQ0FBUDs7QUFFQUEsRUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLFlBQUQsQ0FBUCxDQVBxQyxDQVFyQzs7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQywyQkFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsV0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLGNBQUQsQ0FBUDtBQUNIOztBQUVEQSxPQUFPLENBQUMsUUFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsTUFBRCxDQUFQOztBQUVBQSxPQUFPLENBQUMsMkJBQUQsQ0FBUCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnJlcXVpcmUoJy4vcGxhdGZvcm0nKTtcclxucmVxdWlyZSgnLi9hc3NldHMnKTtcclxuXHJcbmlmICghQ0NfRURJVE9SIHx8ICFFZGl0b3IuaXNNYWluUHJvY2Vzcykge1xyXG4gICAgcmVxdWlyZSgnLi9DQ05vZGUnKTtcclxuICAgIHJlcXVpcmUoJy4vQ0NQcml2YXRlTm9kZScpO1xyXG4gICAgcmVxdWlyZSgnLi9DQ1NjZW5lJyk7XHJcblxyXG4gICAgcmVxdWlyZSgnLi9jb21wb25lbnRzJyk7XHJcbiAgICByZXF1aXJlKCcuL2dyYXBoaWNzJyk7XHJcbiAgICByZXF1aXJlKCcuL2NvbGxpZGVyJyk7XHJcbiAgICAvLyBDQ0ludGVyc2VjdGlvbiBjYW4gYmUgdXNlZCBzZXBhcmF0ZWx5LlxyXG4gICAgcmVxdWlyZSgnLi9jb2xsaWRlci9DQ0ludGVyc2VjdGlvbicpO1xyXG4gICAgcmVxdWlyZSgnLi9waHlzaWNzJyk7XHJcbiAgICByZXF1aXJlKCcuL2NhbWVyYS9DQ0NhbWVyYScpO1xyXG4gICAgcmVxdWlyZSgnLi9nZW9tLXV0aWxzJyk7XHJcbn1cclxuXHJcbnJlcXVpcmUoJy4vbWVzaCcpO1xyXG5yZXF1aXJlKCcuLzNkJyk7XHJcblxyXG5yZXF1aXJlKCcuL2Jhc2UtdWkvQ0NXaWRnZXRNYW5hZ2VyJyk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9