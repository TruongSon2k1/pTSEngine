
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = _interopRequireDefault(require("./deserialize-compiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
_deserializeCompiled["default"].reportMissingClass = function (id) {
  if (CC_EDITOR && Editor.Utils.UuidUtils.isUuid(id)) {
    id = Editor.Utils.UuidUtils.decompressUuid(id);
    cc.warnID(5301, id);
  } else {
    cc.warnID(5302, id);
  }
};

if (CC_BUILD) {
  cc.deserialize = _deserializeCompiled["default"];
} else {
  var deserializeForEditor = require('./deserialize-editor');

  cc.deserialize = function (data, details, options) {
    if (CC_EDITOR && Buffer.isBuffer(data)) {
      data = data.toString();
    }

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (CC_PREVIEW) {
      // support for loading Asset Bundle from server
      if (_deserializeCompiled["default"].isCompiledJson(data)) {
        return (0, _deserializeCompiled["default"])(data, details, options);
      }
    }

    return deserializeForEditor(data, details, options);
  };

  cc.deserialize.reportMissingClass = _deserializeCompiled["default"].reportMissingClass;
  cc.deserialize.Details = deserializeForEditor.Details;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxkZXNlcmlhbGl6ZS5qcyJdLCJuYW1lcyI6WyJkZXNlcmlhbGl6ZUZvckNvbXBpbGVkIiwicmVwb3J0TWlzc2luZ0NsYXNzIiwiaWQiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJVdGlscyIsIlV1aWRVdGlscyIsImlzVXVpZCIsImRlY29tcHJlc3NVdWlkIiwiY2MiLCJ3YXJuSUQiLCJDQ19CVUlMRCIsImRlc2VyaWFsaXplIiwiZGVzZXJpYWxpemVGb3JFZGl0b3IiLCJyZXF1aXJlIiwiZGF0YSIsImRldGFpbHMiLCJvcHRpb25zIiwiQnVmZmVyIiwiaXNCdWZmZXIiLCJ0b1N0cmluZyIsIkpTT04iLCJwYXJzZSIsIkNDX1BSRVZJRVciLCJpc0NvbXBpbGVkSnNvbiIsIkRldGFpbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQUEsZ0NBQXVCQyxrQkFBdkIsR0FBNEMsVUFBVUMsRUFBVixFQUFjO0FBQ3RELE1BQUlDLFNBQVMsSUFBSUMsTUFBTSxDQUFDQyxLQUFQLENBQWFDLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCTCxFQUE5QixDQUFqQixFQUFvRDtBQUNoREEsSUFBQUEsRUFBRSxHQUFHRSxNQUFNLENBQUNDLEtBQVAsQ0FBYUMsU0FBYixDQUF1QkUsY0FBdkIsQ0FBc0NOLEVBQXRDLENBQUw7QUFDQU8sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsSUFBVixFQUFnQlIsRUFBaEI7QUFDSCxHQUhELE1BSUs7QUFDRE8sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsSUFBVixFQUFnQlIsRUFBaEI7QUFDSDtBQUNKLENBUkQ7O0FBVUEsSUFBSVMsUUFBSixFQUFjO0FBQ1ZGLEVBQUFBLEVBQUUsQ0FBQ0csV0FBSCxHQUFpQlosK0JBQWpCO0FBQ0gsQ0FGRCxNQUdLO0FBQ0QsTUFBSWEsb0JBQW9CLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUFsQzs7QUFFQUwsRUFBQUEsRUFBRSxDQUFDRyxXQUFILEdBQWlCLFVBQVVHLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCQyxPQUF6QixFQUFrQztBQUMvQyxRQUFJZCxTQUFTLElBQUllLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosSUFBaEIsQ0FBakIsRUFBd0M7QUFDcENBLE1BQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDSyxRQUFMLEVBQVA7QUFDSDs7QUFDRCxRQUFJLE9BQU9MLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUJBLE1BQUFBLElBQUksR0FBR00sSUFBSSxDQUFDQyxLQUFMLENBQVdQLElBQVgsQ0FBUDtBQUNIOztBQUNELFFBQUlRLFVBQUosRUFBZ0I7QUFDWjtBQUNBLFVBQUl2QixnQ0FBdUJ3QixjQUF2QixDQUFzQ1QsSUFBdEMsQ0FBSixFQUFpRDtBQUM3QyxlQUFPLHFDQUF1QkEsSUFBdkIsRUFBNkJDLE9BQTdCLEVBQXNDQyxPQUF0QyxDQUFQO0FBQ0g7QUFDSjs7QUFDRCxXQUFPSixvQkFBb0IsQ0FBQ0UsSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxPQUFoQixDQUEzQjtBQUNILEdBZEQ7O0FBZUFSLEVBQUFBLEVBQUUsQ0FBQ0csV0FBSCxDQUFlWCxrQkFBZixHQUFvQ0QsZ0NBQXVCQyxrQkFBM0Q7QUFDQVEsRUFBQUEsRUFBRSxDQUFDRyxXQUFILENBQWVhLE9BQWYsR0FBeUJaLG9CQUFvQixDQUFDWSxPQUE5QztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDIwIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IGRlc2VyaWFsaXplRm9yQ29tcGlsZWQgZnJvbSAnLi9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XHJcblxyXG5kZXNlcmlhbGl6ZUZvckNvbXBpbGVkLnJlcG9ydE1pc3NpbmdDbGFzcyA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgaWYgKENDX0VESVRPUiAmJiBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZChpZCkpIHtcclxuICAgICAgICBpZCA9IEVkaXRvci5VdGlscy5VdWlkVXRpbHMuZGVjb21wcmVzc1V1aWQoaWQpO1xyXG4gICAgICAgIGNjLndhcm5JRCg1MzAxLCBpZCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjYy53YXJuSUQoNTMwMiwgaWQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuaWYgKENDX0JVSUxEKSB7XHJcbiAgICBjYy5kZXNlcmlhbGl6ZSA9IGRlc2VyaWFsaXplRm9yQ29tcGlsZWQ7XHJcbn1cclxuZWxzZSB7XHJcbiAgICBsZXQgZGVzZXJpYWxpemVGb3JFZGl0b3IgPSByZXF1aXJlKCcuL2Rlc2VyaWFsaXplLWVkaXRvcicpO1xyXG5cclxuICAgIGNjLmRlc2VyaWFsaXplID0gZnVuY3Rpb24gKGRhdGEsIGRldGFpbHMsIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xyXG4gICAgICAgICAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ0NfUFJFVklFVykge1xyXG4gICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBsb2FkaW5nIEFzc2V0IEJ1bmRsZSBmcm9tIHNlcnZlclxyXG4gICAgICAgICAgICBpZiAoZGVzZXJpYWxpemVGb3JDb21waWxlZC5pc0NvbXBpbGVkSnNvbihkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc2VyaWFsaXplRm9yQ29tcGlsZWQoZGF0YSwgZGV0YWlscywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlc2VyaWFsaXplRm9yRWRpdG9yKGRhdGEsIGRldGFpbHMsIG9wdGlvbnMpO1xyXG4gICAgfTtcclxuICAgIGNjLmRlc2VyaWFsaXplLnJlcG9ydE1pc3NpbmdDbGFzcyA9IGRlc2VyaWFsaXplRm9yQ29tcGlsZWQucmVwb3J0TWlzc2luZ0NsYXNzO1xyXG4gICAgY2MuZGVzZXJpYWxpemUuRGV0YWlscyA9IGRlc2VyaWFsaXplRm9yRWRpdG9yLkRldGFpbHM7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=