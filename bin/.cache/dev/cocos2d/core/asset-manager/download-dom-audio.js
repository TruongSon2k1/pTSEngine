
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-dom-audio.js';
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
var __audioSupport = cc.sys.__audioSupport;

var _require = require('./utilities'),
    parseParameters = _require.parseParameters;

function downloadDomAudio(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete;

  var dom = document.createElement('audio');
  dom.src = url;

  var clearEvent = function clearEvent() {
    clearTimeout(timer);
    dom.removeEventListener("canplaythrough", success, false);
    dom.removeEventListener("error", failure, false);
    if (__audioSupport.USE_LOADER_EVENT) dom.removeEventListener(__audioSupport.USE_LOADER_EVENT, success, false);
  };

  var timer = setTimeout(function () {
    if (dom.readyState === 0) failure();else success();
  }, 8000);

  var success = function success() {
    clearEvent();
    onComplete && onComplete(null, dom);
  };

  var failure = function failure() {
    clearEvent();
    var message = 'load audio failure - ' + url;
    cc.log(message);
    onComplete && onComplete(new Error(message));
  };

  dom.addEventListener("canplaythrough", success, false);
  dom.addEventListener("error", failure, false);
  if (__audioSupport.USE_LOADER_EVENT) dom.addEventListener(__audioSupport.USE_LOADER_EVENT, success, false);
  return dom;
}

module.exports = downloadDomAudio;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRvd25sb2FkLWRvbS1hdWRpby5qcyJdLCJuYW1lcyI6WyJfX2F1ZGlvU3VwcG9ydCIsImNjIiwic3lzIiwicmVxdWlyZSIsInBhcnNlUGFyYW1ldGVycyIsImRvd25sb2FkRG9tQXVkaW8iLCJ1cmwiLCJvcHRpb25zIiwib25Db21wbGV0ZSIsInVuZGVmaW5lZCIsImRvbSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImNsZWFyRXZlbnQiLCJjbGVhclRpbWVvdXQiLCJ0aW1lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdWNjZXNzIiwiZmFpbHVyZSIsIlVTRV9MT0FERVJfRVZFTlQiLCJzZXRUaW1lb3V0IiwicmVhZHlTdGF0ZSIsIm1lc3NhZ2UiLCJsb2ciLCJFcnJvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEdBQUgsQ0FBT0YsY0FBNUI7O2VBQzRCRyxPQUFPLENBQUMsYUFBRDtJQUEzQkMsMkJBQUFBOztBQUVSLFNBQVNDLGdCQUFULENBQTJCQyxHQUEzQixFQUFnQ0MsT0FBaEMsRUFBeUNDLFVBQXpDLEVBQXFEO0FBQUEseUJBQ25CSixlQUFlLENBQUNHLE9BQUQsRUFBVUUsU0FBVixFQUFxQkQsVUFBckIsQ0FESTtBQUFBLE1BQzNDRCxPQUQyQyxvQkFDM0NBLE9BRDJDO0FBQUEsTUFDbENDLFVBRGtDLG9CQUNsQ0EsVUFEa0M7O0FBR2pELE1BQUlFLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQUYsRUFBQUEsR0FBRyxDQUFDRyxHQUFKLEdBQVVQLEdBQVY7O0FBRUEsTUFBSVEsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBWTtBQUN6QkMsSUFBQUEsWUFBWSxDQUFDQyxLQUFELENBQVo7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxtQkFBSixDQUF3QixnQkFBeEIsRUFBMENDLE9BQTFDLEVBQW1ELEtBQW5EO0FBQ0FSLElBQUFBLEdBQUcsQ0FBQ08sbUJBQUosQ0FBd0IsT0FBeEIsRUFBaUNFLE9BQWpDLEVBQTBDLEtBQTFDO0FBQ0EsUUFBR25CLGNBQWMsQ0FBQ29CLGdCQUFsQixFQUNJVixHQUFHLENBQUNPLG1CQUFKLENBQXdCakIsY0FBYyxDQUFDb0IsZ0JBQXZDLEVBQXlERixPQUF6RCxFQUFrRSxLQUFsRTtBQUNQLEdBTkQ7O0FBUUEsTUFBSUYsS0FBSyxHQUFHSyxVQUFVLENBQUMsWUFBWTtBQUMvQixRQUFJWCxHQUFHLENBQUNZLFVBQUosS0FBbUIsQ0FBdkIsRUFDSUgsT0FBTyxHQURYLEtBR0lELE9BQU87QUFDZCxHQUxxQixFQUtuQixJQUxtQixDQUF0Qjs7QUFPQSxNQUFJQSxPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFZO0FBQ3RCSixJQUFBQSxVQUFVO0FBQ1ZOLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUQsRUFBT0UsR0FBUCxDQUF4QjtBQUNILEdBSEQ7O0FBS0EsTUFBSVMsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWTtBQUN0QkwsSUFBQUEsVUFBVTtBQUNWLFFBQUlTLE9BQU8sR0FBRywwQkFBMEJqQixHQUF4QztBQUNBTCxJQUFBQSxFQUFFLENBQUN1QixHQUFILENBQU9ELE9BQVA7QUFDQWYsSUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBSWlCLEtBQUosQ0FBVUYsT0FBVixDQUFELENBQXhCO0FBQ0gsR0FMRDs7QUFPQWIsRUFBQUEsR0FBRyxDQUFDZ0IsZ0JBQUosQ0FBcUIsZ0JBQXJCLEVBQXVDUixPQUF2QyxFQUFnRCxLQUFoRDtBQUNBUixFQUFBQSxHQUFHLENBQUNnQixnQkFBSixDQUFxQixPQUFyQixFQUE4QlAsT0FBOUIsRUFBdUMsS0FBdkM7QUFDQSxNQUFHbkIsY0FBYyxDQUFDb0IsZ0JBQWxCLEVBQ0lWLEdBQUcsQ0FBQ2dCLGdCQUFKLENBQXFCMUIsY0FBYyxDQUFDb0IsZ0JBQXBDLEVBQXNERixPQUF0RCxFQUErRCxLQUEvRDtBQUNKLFNBQU9SLEdBQVA7QUFDSDs7QUFFRGlCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZCLGdCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbnZhciBfX2F1ZGlvU3VwcG9ydCA9IGNjLnN5cy5fX2F1ZGlvU3VwcG9ydDtcclxuY29uc3QgeyBwYXJzZVBhcmFtZXRlcnMgfSA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzJyk7XHJcblxyXG5mdW5jdGlvbiBkb3dubG9hZERvbUF1ZGlvICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgZG9tLnNyYyA9IHVybDtcclxuXHJcbiAgICB2YXIgY2xlYXJFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIiwgc3VjY2VzcywgZmFsc2UpO1xyXG4gICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZmFpbHVyZSwgZmFsc2UpO1xyXG4gICAgICAgIGlmKF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQpXHJcbiAgICAgICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQsIHN1Y2Nlc3MsIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGRvbS5yZWFkeVN0YXRlID09PSAwKVxyXG4gICAgICAgICAgICBmYWlsdXJlKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzdWNjZXNzKCk7XHJcbiAgICB9LCA4MDAwKTtcclxuXHJcbiAgICB2YXIgc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhckV2ZW50KCk7XHJcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIGRvbSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB2YXIgZmFpbHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhckV2ZW50KCk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnbG9hZCBhdWRpbyBmYWlsdXJlIC0gJyArIHVybDtcclxuICAgICAgICBjYy5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcihtZXNzYWdlKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIiwgc3VjY2VzcywgZmFsc2UpO1xyXG4gICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmYWlsdXJlLCBmYWxzZSk7XHJcbiAgICBpZihfX2F1ZGlvU3VwcG9ydC5VU0VfTE9BREVSX0VWRU5UKVxyXG4gICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQsIHN1Y2Nlc3MsIGZhbHNlKTtcclxuICAgIHJldHVybiBkb207XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG93bmxvYWREb21BdWRpbzsiXSwic291cmNlUm9vdCI6Ii8ifQ==