
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-dom-image.js';
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
var _require = require('./utilities'),
    parseParameters = _require.parseParameters;

function downloadDomImage(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete;

  var img = new Image();

  if (window.location.protocol !== 'file:') {
    img.crossOrigin = 'anonymous';
  }

  function loadCallback() {
    img.removeEventListener('load', loadCallback);
    img.removeEventListener('error', errorCallback);
    onComplete && onComplete(null, img);
  }

  function errorCallback() {
    img.removeEventListener('load', loadCallback);
    img.removeEventListener('error', errorCallback);
    onComplete && onComplete(new Error(cc.debug.getError(4930, url)));
  }

  img.addEventListener('load', loadCallback);
  img.addEventListener('error', errorCallback);
  img.src = url;
  return img;
}

module.exports = downloadDomImage;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRvd25sb2FkLWRvbS1pbWFnZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicGFyc2VQYXJhbWV0ZXJzIiwiZG93bmxvYWREb21JbWFnZSIsInVybCIsIm9wdGlvbnMiLCJvbkNvbXBsZXRlIiwidW5kZWZpbmVkIiwiaW1nIiwiSW1hZ2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInByb3RvY29sIiwiY3Jvc3NPcmlnaW4iLCJsb2FkQ2FsbGJhY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXJyb3JDYWxsYmFjayIsIkVycm9yIiwiY2MiLCJkZWJ1ZyIsImdldEVycm9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNyYyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFFNEJBLE9BQU8sQ0FBQyxhQUFEO0lBQTNCQywyQkFBQUE7O0FBRVIsU0FBU0MsZ0JBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDQyxPQUFoQyxFQUF5Q0MsVUFBekMsRUFBcUQ7QUFBQSx5QkFDbkJKLGVBQWUsQ0FBQ0csT0FBRCxFQUFVRSxTQUFWLEVBQXFCRCxVQUFyQixDQURJO0FBQUEsTUFDM0NELE9BRDJDLG9CQUMzQ0EsT0FEMkM7QUFBQSxNQUNsQ0MsVUFEa0Msb0JBQ2xDQSxVQURrQzs7QUFHakQsTUFBSUUsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjs7QUFFQSxNQUFJQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQWhCLEtBQTZCLE9BQWpDLEVBQTBDO0FBQ3RDSixJQUFBQSxHQUFHLENBQUNLLFdBQUosR0FBa0IsV0FBbEI7QUFDSDs7QUFFRCxXQUFTQyxZQUFULEdBQXlCO0FBQ3JCTixJQUFBQSxHQUFHLENBQUNPLG1CQUFKLENBQXdCLE1BQXhCLEVBQWdDRCxZQUFoQztBQUNBTixJQUFBQSxHQUFHLENBQUNPLG1CQUFKLENBQXdCLE9BQXhCLEVBQWlDQyxhQUFqQztBQUNBVixJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELEVBQU9FLEdBQVAsQ0FBeEI7QUFDSDs7QUFFRCxXQUFTUSxhQUFULEdBQTBCO0FBQ3RCUixJQUFBQSxHQUFHLENBQUNPLG1CQUFKLENBQXdCLE1BQXhCLEVBQWdDRCxZQUFoQztBQUNBTixJQUFBQSxHQUFHLENBQUNPLG1CQUFKLENBQXdCLE9BQXhCLEVBQWlDQyxhQUFqQztBQUNBVixJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFJVyxLQUFKLENBQVVDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxRQUFULENBQWtCLElBQWxCLEVBQXdCaEIsR0FBeEIsQ0FBVixDQUFELENBQXhCO0FBQ0g7O0FBRURJLEVBQUFBLEdBQUcsQ0FBQ2EsZ0JBQUosQ0FBcUIsTUFBckIsRUFBNkJQLFlBQTdCO0FBQ0FOLEVBQUFBLEdBQUcsQ0FBQ2EsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEJMLGFBQTlCO0FBQ0FSLEVBQUFBLEdBQUcsQ0FBQ2MsR0FBSixHQUFVbEIsR0FBVjtBQUNBLFNBQU9JLEdBQVA7QUFDSDs7QUFFRGUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckIsZ0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcclxuXHJcbmZ1bmN0aW9uIGRvd25sb2FkRG9tSW1hZ2UgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XHJcblxyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGlmICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicpIHtcclxuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkQ2FsbGJhY2sgKCkge1xyXG4gICAgICAgIGltZy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZENhbGxiYWNrKTtcclxuICAgICAgICBpbWcucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckNhbGxiYWNrKTtcclxuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCwgaW1nKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gZXJyb3JDYWxsYmFjayAoKSB7XHJcbiAgICAgICAgaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkQ2FsbGJhY2spO1xyXG4gICAgICAgIGltZy5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoY2MuZGVidWcuZ2V0RXJyb3IoNDkzMCwgdXJsKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZENhbGxiYWNrKTtcclxuICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yQ2FsbGJhY2spO1xyXG4gICAgaW1nLnNyYyA9IHVybDtcclxuICAgIHJldHVybiBpbWc7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG93bmxvYWREb21JbWFnZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==