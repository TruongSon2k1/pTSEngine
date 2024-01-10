
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/missing-script.js';
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
var js = cc.js;
/*
 * A temp fallback to contain the original serialized data which can not be loaded.
 * Deserialized as a component by default.
 */

var MissingScript = cc.Class({
  name: 'cc.MissingScript',
  "extends": cc.Component,
  editor: {
    inspector: 'packages://inspector/inspectors/comps/missing-script.js'
  },
  properties: {
    //_scriptUuid: {
    //    get: function () {
    //        var id = this._$erialized.__type__;
    //        if (Editor.Utils.UuidUtils.isUuid(id)) {
    //            return Editor.Utils.UuidUtils.decompressUuid(id);
    //        }
    //        return '';
    //    },
    //    set: function (value) {
    //        if ( !sandbox.compiled ) {
    //            cc.error('Scripts not yet compiled, please fix script errors and compile first.');
    //            return;
    //        }
    //        if (value && Editor.Utils.UuidUtils.isUuid(value._uuid)) {
    //            var classId = Editor.Utils.UuidUtils.compressUuid(value);
    //            if (cc.js._getClassById(classId)) {
    //                this._$erialized.__type__ = classId;
    //                Editor.Ipc.sendToWins('reload:window-scripts', sandbox.compiled);
    //            }
    //            else {
    //                cc.error('Can not find a component in the script which uuid is "%s".', value);
    //            }
    //        }
    //        else {
    //            cc.error('invalid script');
    //        }
    //    }
    //},
    compiled: {
      "default": false,
      serializable: false
    },
    // the serialized data for original script object
    _$erialized: {
      "default": null,
      visible: false,
      editorOnly: true
    }
  },
  ctor: CC_EDITOR && function () {
    this.compiled = _Scene.Sandbox.compiled;
  },
  statics: {
    /*
     * @param {string} id
     * @return {function} constructor
     */
    safeFindClass: function safeFindClass(id) {
      var cls = js._getClassById(id);

      if (cls) {
        return cls;
      }

      cc.deserialize.reportMissingClass(id);
      return MissingScript;
    }
  },
  onLoad: function onLoad() {
    cc.warnID(4600, this.node.name);
  }
});
cc._MissingScript = module.exports = MissingScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXG1pc3Npbmctc2NyaXB0LmpzIl0sIm5hbWVzIjpbImpzIiwiY2MiLCJNaXNzaW5nU2NyaXB0IiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiaW5zcGVjdG9yIiwicHJvcGVydGllcyIsImNvbXBpbGVkIiwic2VyaWFsaXphYmxlIiwiXyRlcmlhbGl6ZWQiLCJ2aXNpYmxlIiwiZWRpdG9yT25seSIsImN0b3IiLCJDQ19FRElUT1IiLCJfU2NlbmUiLCJTYW5kYm94Iiwic3RhdGljcyIsInNhZmVGaW5kQ2xhc3MiLCJpZCIsImNscyIsIl9nZXRDbGFzc0J5SWQiLCJkZXNlcmlhbGl6ZSIsInJlcG9ydE1pc3NpbmdDbGFzcyIsIm9uTG9hZCIsIndhcm5JRCIsIm5vZGUiLCJfTWlzc2luZ1NjcmlwdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUUsYUFBYSxHQUFHRCxFQUFFLENBQUNFLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLGtCQURtQjtBQUV6QixhQUFTSCxFQUFFLENBQUNJLFNBRmE7QUFHekJDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxTQUFTLEVBQUU7QUFEUCxHQUhpQjtBQU16QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ04saUJBQVMsS0FESDtBQUVOQyxNQUFBQSxZQUFZLEVBQUU7QUFGUixLQTdCRjtBQWlDUjtBQUNBQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRDLE1BQUFBLE9BQU8sRUFBRSxLQUZBO0FBR1RDLE1BQUFBLFVBQVUsRUFBRTtBQUhIO0FBbENMLEdBTmE7QUE4Q3pCQyxFQUFBQSxJQUFJLEVBQUVDLFNBQVMsSUFBSSxZQUFZO0FBQzNCLFNBQUtOLFFBQUwsR0FBZ0JPLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlUixRQUEvQjtBQUNILEdBaER3QjtBQWlEekJTLEVBQUFBLE9BQU8sRUFBRTtBQUNMO0FBQ1I7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLGFBQWEsRUFBRSx1QkFBVUMsRUFBVixFQUFjO0FBQ3pCLFVBQUlDLEdBQUcsR0FBR3JCLEVBQUUsQ0FBQ3NCLGFBQUgsQ0FBaUJGLEVBQWpCLENBQVY7O0FBQ0EsVUFBSUMsR0FBSixFQUFTO0FBQ0wsZUFBT0EsR0FBUDtBQUNIOztBQUNEcEIsTUFBQUEsRUFBRSxDQUFDc0IsV0FBSCxDQUFlQyxrQkFBZixDQUFrQ0osRUFBbEM7QUFDQSxhQUFPbEIsYUFBUDtBQUNIO0FBWkksR0FqRGdCO0FBK0R6QnVCLEVBQUFBLE1BQU0sRUFBRSxrQkFBWTtBQUNoQnhCLElBQUFBLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVSxJQUFWLEVBQWdCLEtBQUtDLElBQUwsQ0FBVXZCLElBQTFCO0FBQ0g7QUFqRXdCLENBQVQsQ0FBcEI7QUFvRUFILEVBQUUsQ0FBQzJCLGNBQUgsR0FBb0JDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVCLGFBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIGpzID0gY2MuanM7XHJcblxyXG4vKlxyXG4gKiBBIHRlbXAgZmFsbGJhY2sgdG8gY29udGFpbiB0aGUgb3JpZ2luYWwgc2VyaWFsaXplZCBkYXRhIHdoaWNoIGNhbiBub3QgYmUgbG9hZGVkLlxyXG4gKiBEZXNlcmlhbGl6ZWQgYXMgYSBjb21wb25lbnQgYnkgZGVmYXVsdC5cclxuICovXHJcbnZhciBNaXNzaW5nU2NyaXB0ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLk1pc3NpbmdTY3JpcHQnLCBcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIGVkaXRvcjoge1xyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvbWlzc2luZy1zY3JpcHQuanMnLFxyXG4gICAgfSxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvL19zY3JpcHRVdWlkOiB7XHJcbiAgICAgICAgLy8gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhciBpZCA9IHRoaXMuXyRlcmlhbGl6ZWQuX190eXBlX187XHJcbiAgICAgICAgLy8gICAgICAgIGlmIChFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZChpZCkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmRlY29tcHJlc3NVdWlkKGlkKTtcclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAvLyAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIC8vICAgICAgICBpZiAoICFzYW5kYm94LmNvbXBpbGVkICkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgY2MuZXJyb3IoJ1NjcmlwdHMgbm90IHlldCBjb21waWxlZCwgcGxlYXNlIGZpeCBzY3JpcHQgZXJyb3JzIGFuZCBjb21waWxlIGZpcnN0LicpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIGlmICh2YWx1ZSAmJiBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmlzVXVpZCh2YWx1ZS5fdXVpZCkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHZhciBjbGFzc0lkID0gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5jb21wcmVzc1V1aWQodmFsdWUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKGNjLmpzLl9nZXRDbGFzc0J5SWQoY2xhc3NJZCkpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLl8kZXJpYWxpemVkLl9fdHlwZV9fID0gY2xhc3NJZDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBFZGl0b3IuSXBjLnNlbmRUb1dpbnMoJ3JlbG9hZDp3aW5kb3ctc2NyaXB0cycsIHNhbmRib3guY29tcGlsZWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY2MuZXJyb3IoJ0NhbiBub3QgZmluZCBhIGNvbXBvbmVudCBpbiB0aGUgc2NyaXB0IHdoaWNoIHV1aWQgaXMgXCIlc1wiLicsIHZhbHVlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGNjLmVycm9yKCdpbnZhbGlkIHNjcmlwdCcpO1xyXG4gICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vfSxcclxuICAgICAgICBjb21waWxlZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gdGhlIHNlcmlhbGl6ZWQgZGF0YSBmb3Igb3JpZ2luYWwgc2NyaXB0IG9iamVjdFxyXG4gICAgICAgIF8kZXJpYWxpemVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGN0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jb21waWxlZCA9IF9TY2VuZS5TYW5kYm94LmNvbXBpbGVkO1xyXG4gICAgfSxcclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNhZmVGaW5kQ2xhc3M6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICB2YXIgY2xzID0ganMuX2dldENsYXNzQnlJZChpZCk7XHJcbiAgICAgICAgICAgIGlmIChjbHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2MuZGVzZXJpYWxpemUucmVwb3J0TWlzc2luZ0NsYXNzKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIE1pc3NpbmdTY3JpcHQ7XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy53YXJuSUQoNDYwMCwgdGhpcy5ub2RlLm5hbWUpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLl9NaXNzaW5nU2NyaXB0ID0gbW9kdWxlLmV4cG9ydHMgPSBNaXNzaW5nU2NyaXB0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==