
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-script.js';
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

var downloaded = {};

function downloadScript(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete; // no need to load script again


  if (downloaded[url]) {
    return onComplete && onComplete(null);
  }

  var d = document,
      s = document.createElement('script');

  if (window.location.protocol !== 'file:') {
    s.crossOrigin = 'anonymous';
  }

  s.async = options.async;
  s.src = url;

  function loadHandler() {
    s.parentNode.removeChild(s);
    s.removeEventListener('load', loadHandler, false);
    s.removeEventListener('error', errorHandler, false);
    downloaded[url] = true;
    onComplete && onComplete(null);
  }

  function errorHandler() {
    s.parentNode.removeChild(s);
    s.removeEventListener('load', loadHandler, false);
    s.removeEventListener('error', errorHandler, false);
    onComplete && onComplete(new Error(cc.debug.getError(4928, url)));
  }

  s.addEventListener('load', loadHandler, false);
  s.addEventListener('error', errorHandler, false);
  d.body.appendChild(s);
}

module.exports = downloadScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRvd25sb2FkLXNjcmlwdC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicGFyc2VQYXJhbWV0ZXJzIiwiZG93bmxvYWRlZCIsImRvd25sb2FkU2NyaXB0IiwidXJsIiwib3B0aW9ucyIsIm9uQ29tcGxldGUiLCJ1bmRlZmluZWQiLCJkIiwiZG9jdW1lbnQiLCJzIiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJjcm9zc09yaWdpbiIsImFzeW5jIiwic3JjIiwibG9hZEhhbmRsZXIiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXJyb3JIYW5kbGVyIiwiRXJyb3IiLCJjYyIsImRlYnVnIiwiZ2V0RXJyb3IiLCJhZGRFdmVudExpc3RlbmVyIiwiYm9keSIsImFwcGVuZENoaWxkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtlQUM0QkEsT0FBTyxDQUFDLGFBQUQ7SUFBM0JDLDJCQUFBQTs7QUFFUixJQUFNQyxVQUFVLEdBQUcsRUFBbkI7O0FBRUEsU0FBU0MsY0FBVCxDQUF5QkMsR0FBekIsRUFBOEJDLE9BQTlCLEVBQXVDQyxVQUF2QyxFQUFtRDtBQUFBLHlCQUNqQkwsZUFBZSxDQUFDSSxPQUFELEVBQVVFLFNBQVYsRUFBcUJELFVBQXJCLENBREU7QUFBQSxNQUN6Q0QsT0FEeUMsb0JBQ3pDQSxPQUR5QztBQUFBLE1BQ2hDQyxVQURnQyxvQkFDaENBLFVBRGdDLEVBRy9DOzs7QUFDQSxNQUFJSixVQUFVLENBQUNFLEdBQUQsQ0FBZCxFQUFxQjtBQUNqQixXQUFPRSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELENBQS9CO0FBQ0g7O0FBRUQsTUFBSUUsQ0FBQyxHQUFHQyxRQUFSO0FBQUEsTUFBa0JDLENBQUMsR0FBR0QsUUFBUSxDQUFDRSxhQUFULENBQXVCLFFBQXZCLENBQXRCOztBQUVBLE1BQUlDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsUUFBaEIsS0FBNkIsT0FBakMsRUFBMEM7QUFDdENKLElBQUFBLENBQUMsQ0FBQ0ssV0FBRixHQUFnQixXQUFoQjtBQUNIOztBQUVETCxFQUFBQSxDQUFDLENBQUNNLEtBQUYsR0FBVVgsT0FBTyxDQUFDVyxLQUFsQjtBQUNBTixFQUFBQSxDQUFDLENBQUNPLEdBQUYsR0FBUWIsR0FBUjs7QUFDQSxXQUFTYyxXQUFULEdBQXdCO0FBQ3BCUixJQUFBQSxDQUFDLENBQUNTLFVBQUYsQ0FBYUMsV0FBYixDQUF5QlYsQ0FBekI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDVyxtQkFBRixDQUFzQixNQUF0QixFQUE4QkgsV0FBOUIsRUFBMkMsS0FBM0M7QUFDQVIsSUFBQUEsQ0FBQyxDQUFDVyxtQkFBRixDQUFzQixPQUF0QixFQUErQkMsWUFBL0IsRUFBNkMsS0FBN0M7QUFDQXBCLElBQUFBLFVBQVUsQ0FBQ0UsR0FBRCxDQUFWLEdBQWtCLElBQWxCO0FBQ0FFLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUQsQ0FBeEI7QUFDSDs7QUFFRCxXQUFTZ0IsWUFBVCxHQUF3QjtBQUNwQlosSUFBQUEsQ0FBQyxDQUFDUyxVQUFGLENBQWFDLFdBQWIsQ0FBeUJWLENBQXpCO0FBQ0FBLElBQUFBLENBQUMsQ0FBQ1csbUJBQUYsQ0FBc0IsTUFBdEIsRUFBOEJILFdBQTlCLEVBQTJDLEtBQTNDO0FBQ0FSLElBQUFBLENBQUMsQ0FBQ1csbUJBQUYsQ0FBc0IsT0FBdEIsRUFBK0JDLFlBQS9CLEVBQTZDLEtBQTdDO0FBQ0FoQixJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFJaUIsS0FBSixDQUFVQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0MsUUFBVCxDQUFrQixJQUFsQixFQUF3QnRCLEdBQXhCLENBQVYsQ0FBRCxDQUF4QjtBQUNIOztBQUVETSxFQUFBQSxDQUFDLENBQUNpQixnQkFBRixDQUFtQixNQUFuQixFQUEyQlQsV0FBM0IsRUFBd0MsS0FBeEM7QUFDQVIsRUFBQUEsQ0FBQyxDQUFDaUIsZ0JBQUYsQ0FBbUIsT0FBbkIsRUFBNEJMLFlBQTVCLEVBQTBDLEtBQTFDO0FBQ0FkLEVBQUFBLENBQUMsQ0FBQ29CLElBQUYsQ0FBT0MsV0FBUCxDQUFtQm5CLENBQW5CO0FBQ0g7O0FBRURvQixNQUFNLENBQUNDLE9BQVAsR0FBaUI1QixjQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcclxuXHJcbmNvbnN0IGRvd25sb2FkZWQgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGRvd25sb2FkU2NyaXB0ICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgIC8vIG5vIG5lZWQgdG8gbG9hZCBzY3JpcHQgYWdhaW5cclxuICAgIGlmIChkb3dubG9hZGVkW3VybF0pIHtcclxuICAgICAgICByZXR1cm4gb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkID0gZG9jdW1lbnQsIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonKSB7XHJcbiAgICAgICAgcy5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xyXG4gICAgfVxyXG5cclxuICAgIHMuYXN5bmMgPSBvcHRpb25zLmFzeW5jO1xyXG4gICAgcy5zcmMgPSB1cmw7XHJcbiAgICBmdW5jdGlvbiBsb2FkSGFuZGxlciAoKSB7XHJcbiAgICAgICAgcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHMpO1xyXG4gICAgICAgIHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgcy5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIGRvd25sb2FkZWRbdXJsXSA9IHRydWU7XHJcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcclxuICAgICAgICBzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocyk7XHJcbiAgICAgICAgcy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICBzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcihjYy5kZWJ1Zy5nZXRFcnJvcig0OTI4LCB1cmwpKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBkLmJvZHkuYXBwZW5kQ2hpbGQocyk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG93bmxvYWRTY3JpcHQ7Il0sInNvdXJjZVJvb3QiOiIvIn0=