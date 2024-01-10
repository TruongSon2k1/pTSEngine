
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extends.js';
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
require('./cocos2d/core');

require('./cocos2d/animation');

if (CC_EDITOR && Editor.isMainProcess) {
  require('./cocos2d/particle/CCParticleAsset');

  require('./cocos2d/tilemap/CCTiledMapAsset');
} else {
  require('./cocos2d/particle');

  require('./cocos2d/tilemap');

  require('./cocos2d/videoplayer/CCVideoPlayer');

  require('./cocos2d/webview/CCWebView');

  require('./cocos2d/core/components/CCStudioComponent');

  require('./extensions/ccpool/CCNodePool');

  require('./cocos2d/actions');
}

require('./extensions/spine');

require('./extensions/dragonbones');

if (!CC_EDITOR || !Editor.isMainProcess) {
  require('./cocos2d/deprecated');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuZHMuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxPQUFPLENBQUMsZ0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBRUEsSUFBSUMsU0FBUyxJQUFJQyxNQUFNLENBQUNDLGFBQXhCLEVBQXVDO0FBQ25DSCxFQUFBQSxPQUFPLENBQUMsb0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLG1DQUFELENBQVA7QUFDSCxDQUhELE1BSUs7QUFDREEsRUFBQUEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMscUNBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLDZCQUFELENBQVA7O0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQyw2Q0FBRCxDQUFQOztBQUNBQSxFQUFBQSxPQUFPLENBQUMsZ0NBQUQsQ0FBUDs7QUFDQUEsRUFBQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7QUFDSDs7QUFFREEsT0FBTyxDQUFDLG9CQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUVBLElBQUksQ0FBQ0MsU0FBRCxJQUFjLENBQUNDLE1BQU0sQ0FBQ0MsYUFBMUIsRUFBeUM7QUFDckNILEVBQUFBLE9BQU8sQ0FBQyxzQkFBRCxDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5yZXF1aXJlKCcuL2NvY29zMmQvY29yZScpO1xyXG5yZXF1aXJlKCcuL2NvY29zMmQvYW5pbWF0aW9uJyk7XHJcblxyXG5pZiAoQ0NfRURJVE9SICYmIEVkaXRvci5pc01haW5Qcm9jZXNzKSB7XHJcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvcGFydGljbGUvQ0NQYXJ0aWNsZUFzc2V0Jyk7XHJcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvdGlsZW1hcC9DQ1RpbGVkTWFwQXNzZXQnKTtcclxufVxyXG5lbHNlIHtcclxuICAgIHJlcXVpcmUoJy4vY29jb3MyZC9wYXJ0aWNsZScpO1xyXG4gICAgcmVxdWlyZSgnLi9jb2NvczJkL3RpbGVtYXAnKTtcclxuICAgIHJlcXVpcmUoJy4vY29jb3MyZC92aWRlb3BsYXllci9DQ1ZpZGVvUGxheWVyJyk7XHJcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvd2Vidmlldy9DQ1dlYlZpZXcnKTtcclxuICAgIHJlcXVpcmUoJy4vY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NTdHVkaW9Db21wb25lbnQnKTtcclxuICAgIHJlcXVpcmUoJy4vZXh0ZW5zaW9ucy9jY3Bvb2wvQ0NOb2RlUG9vbCcpO1xyXG4gICAgcmVxdWlyZSgnLi9jb2NvczJkL2FjdGlvbnMnKTtcclxufVxyXG5cclxucmVxdWlyZSgnLi9leHRlbnNpb25zL3NwaW5lJyk7XHJcbnJlcXVpcmUoJy4vZXh0ZW5zaW9ucy9kcmFnb25ib25lcycpO1xyXG5cclxuaWYgKCFDQ19FRElUT1IgfHwgIUVkaXRvci5pc01haW5Qcm9jZXNzKSB7XHJcbiAgICByZXF1aXJlKCcuL2NvY29zMmQvZGVwcmVjYXRlZCcpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9