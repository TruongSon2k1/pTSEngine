
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/index.js';
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
require('./CCComponent');

require('./CCComponentEventHandler');

require('./missing-script'); // In case subContextView modules are excluded


var SubContextView = require('./SubContextView');

if (!SubContextView) {
  SubContextView = cc.Class({
    name: 'cc.SubContextView',
    "extends": cc.Component
  });
  cc.SubContextView = cc.WXSubContextView = cc.SwanSubContextView = SubContextView;
}

var components = [require('./CCSprite'), require('./CCWidget'), require('./CCCanvas'), require('./CCAudioSource'), require('./CCAnimation'), require('./CCButton'), require('./CCLabel'), require('./CCProgressBar'), require('./CCMask'), require('./CCScrollBar'), require('./CCScrollView'), require('./CCPageViewIndicator'), require('./CCPageView'), require('./CCSlider'), require('./CCLayout'), require('./editbox/CCEditBox'), require('./CCLabelOutline'), require('./CCLabelShadow'), require('./CCRichText'), require('./CCToggleContainer'), require('./CCToggleGroup'), require('./CCToggle'), require('./CCBlockInputEvents'), require('./CCMotionStreak'), require('./CCSafeArea'), SubContextView];
module.exports = components;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXGluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTdWJDb250ZXh0VmlldyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiV1hTdWJDb250ZXh0VmlldyIsIlN3YW5TdWJDb250ZXh0VmlldyIsImNvbXBvbmVudHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDLGVBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLDJCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxrQkFBRCxDQUFQLEVBRUE7OztBQUNBLElBQUlDLGNBQWMsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBQTVCOztBQUNBLElBQUksQ0FBQ0MsY0FBTCxFQUFxQjtBQUNqQkEsRUFBQUEsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN0QkMsSUFBQUEsSUFBSSxFQUFFLG1CQURnQjtBQUV0QixlQUFTRixFQUFFLENBQUNHO0FBRlUsR0FBVCxDQUFqQjtBQUlBSCxFQUFBQSxFQUFFLENBQUNELGNBQUgsR0FBb0JDLEVBQUUsQ0FBQ0ksZ0JBQUgsR0FBc0JKLEVBQUUsQ0FBQ0ssa0JBQUgsR0FBd0JOLGNBQWxFO0FBQ0g7O0FBRUQsSUFBSU8sVUFBVSxHQUFHLENBQ2JSLE9BQU8sQ0FBQyxZQUFELENBRE0sRUFFYkEsT0FBTyxDQUFDLFlBQUQsQ0FGTSxFQUdiQSxPQUFPLENBQUMsWUFBRCxDQUhNLEVBSWJBLE9BQU8sQ0FBQyxpQkFBRCxDQUpNLEVBS2JBLE9BQU8sQ0FBQyxlQUFELENBTE0sRUFNYkEsT0FBTyxDQUFDLFlBQUQsQ0FOTSxFQU9iQSxPQUFPLENBQUMsV0FBRCxDQVBNLEVBUWJBLE9BQU8sQ0FBQyxpQkFBRCxDQVJNLEVBU2JBLE9BQU8sQ0FBQyxVQUFELENBVE0sRUFVYkEsT0FBTyxDQUFDLGVBQUQsQ0FWTSxFQVdiQSxPQUFPLENBQUMsZ0JBQUQsQ0FYTSxFQVliQSxPQUFPLENBQUMsdUJBQUQsQ0FaTSxFQWFiQSxPQUFPLENBQUMsY0FBRCxDQWJNLEVBY2JBLE9BQU8sQ0FBQyxZQUFELENBZE0sRUFlYkEsT0FBTyxDQUFDLFlBQUQsQ0FmTSxFQWdCYkEsT0FBTyxDQUFDLHFCQUFELENBaEJNLEVBaUJiQSxPQUFPLENBQUMsa0JBQUQsQ0FqQk0sRUFrQmJBLE9BQU8sQ0FBQyxpQkFBRCxDQWxCTSxFQW1CYkEsT0FBTyxDQUFDLGNBQUQsQ0FuQk0sRUFvQmJBLE9BQU8sQ0FBQyxxQkFBRCxDQXBCTSxFQXFCYkEsT0FBTyxDQUFDLGlCQUFELENBckJNLEVBc0JiQSxPQUFPLENBQUMsWUFBRCxDQXRCTSxFQXVCYkEsT0FBTyxDQUFDLHNCQUFELENBdkJNLEVBd0JiQSxPQUFPLENBQUMsa0JBQUQsQ0F4Qk0sRUF5QmJBLE9BQU8sQ0FBQyxjQUFELENBekJNLEVBMEJiQyxjQTFCYSxDQUFqQjtBQTZCQVEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCRixVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKTtcclxucmVxdWlyZSgnLi9DQ0NvbXBvbmVudEV2ZW50SGFuZGxlcicpO1xyXG5yZXF1aXJlKCcuL21pc3Npbmctc2NyaXB0Jyk7XHJcblxyXG4vLyBJbiBjYXNlIHN1YkNvbnRleHRWaWV3IG1vZHVsZXMgYXJlIGV4Y2x1ZGVkXHJcbmxldCBTdWJDb250ZXh0VmlldyA9IHJlcXVpcmUoJy4vU3ViQ29udGV4dFZpZXcnKTtcclxuaWYgKCFTdWJDb250ZXh0Vmlldykge1xyXG4gICAgU3ViQ29udGV4dFZpZXcgPSBjYy5DbGFzcyh7XHJcbiAgICAgICAgbmFtZTogJ2NjLlN1YkNvbnRleHRWaWV3JyxcclxuICAgICAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICB9KTtcclxuICAgIGNjLlN1YkNvbnRleHRWaWV3ID0gY2MuV1hTdWJDb250ZXh0VmlldyA9IGNjLlN3YW5TdWJDb250ZXh0VmlldyA9IFN1YkNvbnRleHRWaWV3O1xyXG59XHJcblxyXG52YXIgY29tcG9uZW50cyA9IFtcclxuICAgIHJlcXVpcmUoJy4vQ0NTcHJpdGUnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NXaWRnZXQnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NDYW52YXMnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NBdWRpb1NvdXJjZScpLFxyXG4gICAgcmVxdWlyZSgnLi9DQ0FuaW1hdGlvbicpLFxyXG4gICAgcmVxdWlyZSgnLi9DQ0J1dHRvbicpLFxyXG4gICAgcmVxdWlyZSgnLi9DQ0xhYmVsJyksXHJcbiAgICByZXF1aXJlKCcuL0NDUHJvZ3Jlc3NCYXInKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NNYXNrJyksXHJcbiAgICByZXF1aXJlKCcuL0NDU2Nyb2xsQmFyJyksXHJcbiAgICByZXF1aXJlKCcuL0NDU2Nyb2xsVmlldycpLFxyXG4gICAgcmVxdWlyZSgnLi9DQ1BhZ2VWaWV3SW5kaWNhdG9yJyksXHJcbiAgICByZXF1aXJlKCcuL0NDUGFnZVZpZXcnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NTbGlkZXInKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NMYXlvdXQnKSxcclxuICAgIHJlcXVpcmUoJy4vZWRpdGJveC9DQ0VkaXRCb3gnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NMYWJlbE91dGxpbmUnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NMYWJlbFNoYWRvdycpLFxyXG4gICAgcmVxdWlyZSgnLi9DQ1JpY2hUZXh0JyksXHJcbiAgICByZXF1aXJlKCcuL0NDVG9nZ2xlQ29udGFpbmVyJyksXHJcbiAgICByZXF1aXJlKCcuL0NDVG9nZ2xlR3JvdXAnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NUb2dnbGUnKSxcclxuICAgIHJlcXVpcmUoJy4vQ0NCbG9ja0lucHV0RXZlbnRzJyksXHJcbiAgICByZXF1aXJlKCcuL0NDTW90aW9uU3RyZWFrJyksXHJcbiAgICByZXF1aXJlKCcuL0NDU2FmZUFyZWEnKSxcclxuICAgIFN1YkNvbnRleHRWaWV3LFxyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb21wb25lbnRzOyJdLCJzb3VyY2VSb290IjoiLyJ9