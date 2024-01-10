
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/skeleton-texture.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
sp.SkeletonTexture = cc.Class({
  name: 'sp.SkeletonTexture',
  "extends": sp.spine.Texture,
  _texture: null,
  _material: null,
  setRealTexture: function setRealTexture(tex) {
    this._texture = tex;
  },
  getRealTexture: function getRealTexture() {
    return this._texture;
  },
  setFilters: function setFilters(minFilter, magFilter) {
    if (this._texture) {
      this._texture.setFilters(minFilter, magFilter);
    }
  },
  setWraps: function setWraps(uWrap, vWrap) {
    if (this._texture) {
      this._texture.setWrapMode(uWrap, vWrap);
    }
  },
  dispose: function dispose() {}
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxza2VsZXRvbi10ZXh0dXJlLmpzIl0sIm5hbWVzIjpbInNwIiwiU2tlbGV0b25UZXh0dXJlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJzcGluZSIsIlRleHR1cmUiLCJfdGV4dHVyZSIsIl9tYXRlcmlhbCIsInNldFJlYWxUZXh0dXJlIiwidGV4IiwiZ2V0UmVhbFRleHR1cmUiLCJzZXRGaWx0ZXJzIiwibWluRmlsdGVyIiwibWFnRmlsdGVyIiwic2V0V3JhcHMiLCJ1V3JhcCIsInZXcmFwIiwic2V0V3JhcE1vZGUiLCJkaXNwb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsZUFBSCxHQUFxQkMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBQUksRUFBRSxvQkFEb0I7QUFFMUIsYUFBU0osRUFBRSxDQUFDSyxLQUFILENBQVNDLE9BRlE7QUFHMUJDLEVBQUFBLFFBQVEsRUFBRSxJQUhnQjtBQUkxQkMsRUFBQUEsU0FBUyxFQUFFLElBSmU7QUFNMUJDLEVBQUFBLGNBQWMsRUFBRSx3QkFBU0MsR0FBVCxFQUFjO0FBQzFCLFNBQUtILFFBQUwsR0FBZ0JHLEdBQWhCO0FBQ0gsR0FSeUI7QUFVMUJDLEVBQUFBLGNBQWMsRUFBRSwwQkFBVztBQUN2QixXQUFPLEtBQUtKLFFBQVo7QUFDSCxHQVp5QjtBQWMxQkssRUFBQUEsVUFBVSxFQUFFLG9CQUFTQyxTQUFULEVBQW9CQyxTQUFwQixFQUErQjtBQUN2QyxRQUFJLEtBQUtQLFFBQVQsRUFBbUI7QUFDZixXQUFLQSxRQUFMLENBQWNLLFVBQWQsQ0FBeUJDLFNBQXpCLEVBQW9DQyxTQUFwQztBQUNIO0FBQ0osR0FsQnlCO0FBb0IxQkMsRUFBQUEsUUFBUSxFQUFFLGtCQUFTQyxLQUFULEVBQWdCQyxLQUFoQixFQUF1QjtBQUM3QixRQUFJLEtBQUtWLFFBQVQsRUFBbUI7QUFDZixXQUFLQSxRQUFMLENBQWNXLFdBQWQsQ0FBMEJGLEtBQTFCLEVBQWlDQyxLQUFqQztBQUNIO0FBQ0osR0F4QnlCO0FBMEIxQkUsRUFBQUEsT0FBTyxFQUFFLG1CQUFXLENBQUU7QUExQkksQ0FBVCxDQUFyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuc3AuU2tlbGV0b25UZXh0dXJlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ3NwLlNrZWxldG9uVGV4dHVyZScsXHJcbiAgICBleHRlbmRzOiBzcC5zcGluZS5UZXh0dXJlLFxyXG4gICAgX3RleHR1cmU6IG51bGwsXHJcbiAgICBfbWF0ZXJpYWw6IG51bGwsXHJcblxyXG4gICAgc2V0UmVhbFRleHR1cmU6IGZ1bmN0aW9uKHRleCkge1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0ZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFJlYWxUZXh0dXJlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0RmlsdGVyczogZnVuY3Rpb24obWluRmlsdGVyLCBtYWdGaWx0ZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlLnNldEZpbHRlcnMobWluRmlsdGVyLCBtYWdGaWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0V3JhcHM6IGZ1bmN0aW9uKHVXcmFwLCB2V3JhcCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmUuc2V0V3JhcE1vZGUodVdyYXAsIHZXcmFwKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uKCkge31cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9