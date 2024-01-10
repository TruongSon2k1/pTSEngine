
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCViewGroup.js';
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
 * !#en
 * Handling touch events in a ViewGroup takes special care,
 * because it's common for a ViewGroup to have children that are targets for different touch events than the ViewGroup itself.
 * To make sure that each view correctly receives the touch events intended for it,
 * ViewGroup should register capture phase event and handle the event propagation properly.
 * Please refer to Scrollview for more  information.
 *
 * !#zh
 * ViewGroup的事件处理比较特殊，因为 ViewGroup 里面的子节点关心的事件跟 ViewGroup 本身可能不一样。
 * 为了让子节点能够正确地处理事件，ViewGroup 需要注册 capture 阶段的事件，并且合理地处理 ViewGroup 之间的事件传递。
 * 请参考 ScrollView 的实现来获取更多信息。
 * @class ViewGroup
 * @extends Component
 */
var ViewGroup = cc.Class({
  name: 'cc.ViewGroup',
  "extends": require('./CCComponent')
});
cc.ViewGroup = module.exports = ViewGroup;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDVmlld0dyb3VwLmpzIl0sIm5hbWVzIjpbIlZpZXdHcm91cCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3JCQyxFQUFBQSxJQUFJLEVBQUUsY0FEZTtBQUVyQixhQUFTQyxPQUFPLENBQUMsZUFBRDtBQUZLLENBQVQsQ0FBaEI7QUFPQUgsRUFBRSxDQUFDRCxTQUFILEdBQWVLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQk4sU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBIYW5kbGluZyB0b3VjaCBldmVudHMgaW4gYSBWaWV3R3JvdXAgdGFrZXMgc3BlY2lhbCBjYXJlLFxyXG4gKiBiZWNhdXNlIGl0J3MgY29tbW9uIGZvciBhIFZpZXdHcm91cCB0byBoYXZlIGNoaWxkcmVuIHRoYXQgYXJlIHRhcmdldHMgZm9yIGRpZmZlcmVudCB0b3VjaCBldmVudHMgdGhhbiB0aGUgVmlld0dyb3VwIGl0c2VsZi5cclxuICogVG8gbWFrZSBzdXJlIHRoYXQgZWFjaCB2aWV3IGNvcnJlY3RseSByZWNlaXZlcyB0aGUgdG91Y2ggZXZlbnRzIGludGVuZGVkIGZvciBpdCxcclxuICogVmlld0dyb3VwIHNob3VsZCByZWdpc3RlciBjYXB0dXJlIHBoYXNlIGV2ZW50IGFuZCBoYW5kbGUgdGhlIGV2ZW50IHByb3BhZ2F0aW9uIHByb3Blcmx5LlxyXG4gKiBQbGVhc2UgcmVmZXIgdG8gU2Nyb2xsdmlldyBmb3IgbW9yZSAgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqICEjemhcclxuICogVmlld0dyb3Vw55qE5LqL5Lu25aSE55CG5q+U6L6D54m55q6K77yM5Zug5Li6IFZpZXdHcm91cCDph4zpnaLnmoTlrZDoioLngrnlhbPlv4PnmoTkuovku7bot58gVmlld0dyb3VwIOacrOi6q+WPr+iDveS4jeS4gOagt+OAglxyXG4gKiDkuLrkuoborqnlrZDoioLngrnog73lpJ/mraPnoa7lnLDlpITnkIbkuovku7bvvIxWaWV3R3JvdXAg6ZyA6KaB5rOo5YaMIGNhcHR1cmUg6Zi25q6155qE5LqL5Lu277yM5bm25LiU5ZCI55CG5Zyw5aSE55CGIFZpZXdHcm91cCDkuYvpl7TnmoTkuovku7bkvKDpgJLjgIJcclxuICog6K+35Y+C6ICDIFNjcm9sbFZpZXcg55qE5a6e546w5p2l6I635Y+W5pu05aSa5L+h5oGv44CCXHJcbiAqIEBjbGFzcyBWaWV3R3JvdXBcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG52YXIgVmlld0dyb3VwID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlZpZXdHcm91cCcsXHJcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JylcclxuXHJcbn0pO1xyXG5cclxuXHJcbmNjLlZpZXdHcm91cCA9IG1vZHVsZS5leHBvcnRzID0gVmlld0dyb3VwO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==