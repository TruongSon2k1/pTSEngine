
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-file.js';
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

function downloadFile(url, options, onProgress, onComplete) {
  var _parseParameters = parseParameters(options, onProgress, onComplete),
      options = _parseParameters.options,
      onProgress = _parseParameters.onProgress,
      onComplete = _parseParameters.onComplete;

  var xhr = new XMLHttpRequest(),
      errInfo = 'download failed: ' + url + ', status: ';
  xhr.open('GET', url, true);
  if (options.responseType !== undefined) xhr.responseType = options.responseType;
  if (options.withCredentials !== undefined) xhr.withCredentials = options.withCredentials;
  if (options.mimeType !== undefined && xhr.overrideMimeType) xhr.overrideMimeType(options.mimeType);
  if (options.timeout !== undefined) xhr.timeout = options.timeout;

  if (options.header) {
    for (var header in options.header) {
      xhr.setRequestHeader(header, options.header[header]);
    }
  }

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 0) {
      onComplete && onComplete(null, xhr.response);
    } else {
      onComplete && onComplete(new Error(errInfo + xhr.status + '(no response)'));
    }
  };

  if (onProgress) {
    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        onProgress(e.loaded, e.total);
      }
    };
  }

  xhr.onerror = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(error)'));
  };

  xhr.ontimeout = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(time out)'));
  };

  xhr.onabort = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(abort)'));
  };

  xhr.send(null);
  return xhr;
}

module.exports = downloadFile;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRvd25sb2FkLWZpbGUuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsInBhcnNlUGFyYW1ldGVycyIsImRvd25sb2FkRmlsZSIsInVybCIsIm9wdGlvbnMiLCJvblByb2dyZXNzIiwib25Db21wbGV0ZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiZXJySW5mbyIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJ1bmRlZmluZWQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJtaW1lVHlwZSIsIm92ZXJyaWRlTWltZVR5cGUiLCJ0aW1lb3V0IiwiaGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwiRXJyb3IiLCJvbnByb2dyZXNzIiwiZSIsImxlbmd0aENvbXB1dGFibGUiLCJsb2FkZWQiLCJ0b3RhbCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJvbmFib3J0Iiwic2VuZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7ZUFDNEJBLE9BQU8sQ0FBQyxhQUFEO0lBQTNCQywyQkFBQUE7O0FBRVIsU0FBU0MsWUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLE9BQTVCLEVBQXFDQyxVQUFyQyxFQUFpREMsVUFBakQsRUFBNkQ7QUFBQSx5QkFDZkwsZUFBZSxDQUFDRyxPQUFELEVBQVVDLFVBQVYsRUFBc0JDLFVBQXRCLENBREE7QUFBQSxNQUNuREYsT0FEbUQsb0JBQ25EQSxPQURtRDtBQUFBLE1BQzFDQyxVQUQwQyxvQkFDMUNBLFVBRDBDO0FBQUEsTUFDOUJDLFVBRDhCLG9CQUM5QkEsVUFEOEI7O0FBR3pELE1B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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY29uc3QgeyBwYXJzZVBhcmFtZXRlcnMgfSA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzJyk7XHJcblxyXG5mdW5jdGlvbiBkb3dubG9hZEZpbGUgKHVybCwgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xyXG4gICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgZXJySW5mbyA9ICdkb3dubG9hZCBmYWlsZWQ6ICcgKyB1cmwgKyAnLCBzdGF0dXM6ICc7XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucmVzcG9uc2VUeXBlICE9PSB1bmRlZmluZWQpIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkKSB4aHIud2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcbiAgICBpZiAob3B0aW9ucy5taW1lVHlwZSAhPT0gdW5kZWZpbmVkICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkgeGhyLm92ZXJyaWRlTWltZVR5cGUob3B0aW9ucy5taW1lVHlwZSk7XHJcbiAgICBpZiAob3B0aW9ucy50aW1lb3V0ICE9PSB1bmRlZmluZWQpIHhoci50aW1lb3V0ID0gb3B0aW9ucy50aW1lb3V0O1xyXG5cclxuICAgIGlmIChvcHRpb25zLmhlYWRlcikge1xyXG4gICAgICAgIGZvciAodmFyIGhlYWRlciBpbiBvcHRpb25zLmhlYWRlcikge1xyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIG9wdGlvbnMuaGVhZGVyW2hlYWRlcl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICggeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDAgKSB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShudWxsLCB4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoZXJySW5mbyArIHhoci5zdGF0dXMgKyAnKG5vIHJlc3BvbnNlKScpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAob25Qcm9ncmVzcykge1xyXG4gICAgICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyhlLmxvYWRlZCwgZS50b3RhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKGVyckluZm8gKyB4aHIuc3RhdHVzICsgJyhlcnJvciknKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoZXJySW5mbyArIHhoci5zdGF0dXMgKyAnKHRpbWUgb3V0KScpKTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoZXJySW5mbyArIHhoci5zdGF0dXMgKyAnKGFib3J0KScpKTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLnNlbmQobnVsbCk7XHJcbiAgICBcclxuICAgIHJldHVybiB4aHI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG93bmxvYWRGaWxlOyJdLCJzb3VyY2VSb290IjoiLyJ9