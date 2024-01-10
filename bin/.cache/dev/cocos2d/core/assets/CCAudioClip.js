
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCAudioClip.js';
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
var Asset = require('./CCAsset');

var EventTarget = require('../event/event-target');

var LoadMode = cc.Enum({
  WEB_AUDIO: 0,
  DOM_AUDIO: 1
});
/**
 * !#en Class for audio data handling.
 * !#zh 音频资源类。
 * @class AudioClip
 * @extends Asset
 * @uses EventTarget
 */

var AudioClip = cc.Class({
  name: 'cc.AudioClip',
  "extends": Asset,
  mixins: [EventTarget],
  ctor: function ctor() {
    this._loading = false;
    this.loaded = false; // the web audio buffer or <audio> element

    this._audio = null;
  },
  properties: {
    /**
     * !#en Get the audio clip duration
     * !#zh 获取音频剪辑的长度
     * @property duration
     * @type {Number}
     */
    duration: 0,
    loadMode: {
      "default": LoadMode.WEB_AUDIO,
      type: LoadMode
    },
    _nativeAsset: {
      get: function get() {
        return this._audio;
      },
      set: function set(value) {
        // HACK: fix load mp3 as audioClip, _nativeAsset is set as audioClip.
        // Should load mp3 as audioBuffer indeed.
        if (value instanceof cc.AudioClip) {
          this._audio = value._nativeAsset;
        } else {
          this._audio = value;
        }

        if (this._audio) {
          this.loaded = true;
          this.emit('load');
        }
      },
      override: true
    },
    _nativeDep: {
      get: function get() {
        return {
          uuid: this._uuid,
          audioLoadMode: this.loadMode,
          ext: cc.path.extname(this._native),
          __isNative__: true
        };
      },
      override: true
    }
  },
  statics: {
    LoadMode: LoadMode,
    _loadByUrl: function _loadByUrl(url, callback) {
      var audioClip = cc.assetManager.assets.get(url);

      if (!audioClip) {
        cc.assetManager.loadRemote(url, function (error, data) {
          if (error) {
            return callback(error);
          }

          callback(null, data);
        });
      } else {
        callback(null, audioClip);
      }
    }
  },
  _ensureLoaded: function _ensureLoaded(onComplete) {
    if (this.loaded) {
      return onComplete && onComplete();
    } else {
      if (onComplete) {
        this.once('load', onComplete);
      }

      if (!this._loading) {
        this._loading = true;
        var self = this;
        cc.assetManager.postLoadNative(this, function (err) {
          self._loading = false;
        });
      }
    }
  },
  destroy: function destroy() {
    cc.audioEngine.uncache(this);

    this._super();
  }
});
/**
 * !#zh
 * 当该资源加载成功后触发该事件
 * !#en
 * This event is emitted when the asset is loaded
 *
 * @event load
 */

cc.AudioClip = AudioClip;
module.exports = AudioClip;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NBdWRpb0NsaXAuanMiXSwibmFtZXMiOlsiQXNzZXQiLCJyZXF1aXJlIiwiRXZlbnRUYXJnZXQiLCJMb2FkTW9kZSIsImNjIiwiRW51bSIsIldFQl9BVURJTyIsIkRPTV9BVURJTyIsIkF1ZGlvQ2xpcCIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImN0b3IiLCJfbG9hZGluZyIsImxvYWRlZCIsIl9hdWRpbyIsInByb3BlcnRpZXMiLCJkdXJhdGlvbiIsImxvYWRNb2RlIiwidHlwZSIsIl9uYXRpdmVBc3NldCIsImdldCIsInNldCIsInZhbHVlIiwiZW1pdCIsIm92ZXJyaWRlIiwiX25hdGl2ZURlcCIsInV1aWQiLCJfdXVpZCIsImF1ZGlvTG9hZE1vZGUiLCJleHQiLCJwYXRoIiwiZXh0bmFtZSIsIl9uYXRpdmUiLCJfX2lzTmF0aXZlX18iLCJzdGF0aWNzIiwiX2xvYWRCeVVybCIsInVybCIsImNhbGxiYWNrIiwiYXVkaW9DbGlwIiwiYXNzZXRNYW5hZ2VyIiwiYXNzZXRzIiwibG9hZFJlbW90ZSIsImVycm9yIiwiZGF0YSIsIl9lbnN1cmVMb2FkZWQiLCJvbkNvbXBsZXRlIiwib25jZSIsInNlbGYiLCJwb3N0TG9hZE5hdGl2ZSIsImVyciIsImRlc3Ryb3kiLCJhdWRpb0VuZ2luZSIsInVuY2FjaGUiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQUVB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O0FBQ2IsYUFBT2dDLFVBQVUsSUFBSUEsVUFBVSxFQUEvQjtBQUNILEtBRkQsTUFHSztBQUNELFVBQUlBLFVBQUosRUFBZ0I7QUFDWixhQUFLQyxJQUFMLENBQVUsTUFBVixFQUFrQkQsVUFBbEI7QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBS2pDLFFBQVYsRUFBb0I7QUFDaEIsYUFBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFlBQUltQyxJQUFJLEdBQUcsSUFBWDtBQUNBNUMsUUFBQUEsRUFBRSxDQUFDb0MsWUFBSCxDQUFnQlMsY0FBaEIsQ0FBK0IsSUFBL0IsRUFBcUMsVUFBVUMsR0FBVixFQUFlO0FBQ2hERixVQUFBQSxJQUFJLENBQUNuQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0gsU0FGRDtBQUdIO0FBQ0o7QUFDSixHQXhGb0I7QUEwRnJCc0MsRUFBQUEsT0ExRnFCLHFCQTBGVjtBQUNQL0MsSUFBQUEsRUFBRSxDQUFDZ0QsV0FBSCxDQUFlQyxPQUFmLENBQXVCLElBQXZCOztBQUNBLFNBQUtDLE1BQUw7QUFDSDtBQTdGb0IsQ0FBVCxDQUFoQjtBQWdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBbEQsRUFBRSxDQUFDSSxTQUFILEdBQWVBLFNBQWY7QUFDQStDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhELFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQXNzZXQgPSByZXF1aXJlKCcuL0NDQXNzZXQnKTtcclxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcclxuXHJcbnZhciBMb2FkTW9kZSA9IGNjLkVudW0oe1xyXG4gICAgV0VCX0FVRElPOiAwLFxyXG4gICAgRE9NX0FVRElPOiAxLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENsYXNzIGZvciBhdWRpbyBkYXRhIGhhbmRsaW5nLlxyXG4gKiAhI3poIOmfs+mikei1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgQXVkaW9DbGlwXHJcbiAqIEBleHRlbmRzIEFzc2V0XHJcbiAqIEB1c2VzIEV2ZW50VGFyZ2V0XHJcbiAqL1xyXG52YXIgQXVkaW9DbGlwID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkF1ZGlvQ2xpcCcsXHJcbiAgICBleHRlbmRzOiBBc3NldCxcclxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gdGhlIHdlYiBhdWRpbyBidWZmZXIgb3IgPGF1ZGlvPiBlbGVtZW50XHJcbiAgICAgICAgdGhpcy5fYXVkaW8gPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBHZXQgdGhlIGF1ZGlvIGNsaXAgZHVyYXRpb25cclxuICAgICAgICAgKiAhI3poIOiOt+WPlumfs+mikeWJqui+keeahOmVv+W6plxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBkdXJhdGlvblxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgbG9hZE1vZGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogTG9hZE1vZGUuV0VCX0FVRElPLFxyXG4gICAgICAgICAgICB0eXBlOiBMb2FkTW9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW87XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEhBQ0s6IGZpeCBsb2FkIG1wMyBhcyBhdWRpb0NsaXAsIF9uYXRpdmVBc3NldCBpcyBzZXQgYXMgYXVkaW9DbGlwLlxyXG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIGxvYWQgbXAzIGFzIGF1ZGlvQnVmZmVyIGluZGVlZC5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIGNjLkF1ZGlvQ2xpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F1ZGlvID0gdmFsdWUuX25hdGl2ZUFzc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXVkaW8gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2xvYWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfbmF0aXZlRGVwOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB1dWlkOiB0aGlzLl91dWlkLCBhdWRpb0xvYWRNb2RlOiB0aGlzLmxvYWRNb2RlLCBleHQ6IGNjLnBhdGguZXh0bmFtZSh0aGlzLl9uYXRpdmUpLCBfX2lzTmF0aXZlX186IHRydWUgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBMb2FkTW9kZTogTG9hZE1vZGUsXHJcbiAgICAgICAgX2xvYWRCeVVybDogZnVuY3Rpb24gKHVybCwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvQ2xpcCA9IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KHVybCk7XHJcbiAgICAgICAgICAgIGlmICghYXVkaW9DbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSh1cmwsIGZ1bmN0aW9uIChlcnJvciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgYXVkaW9DbGlwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2Vuc3VyZUxvYWRlZCAob25Db21wbGV0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAob25Db21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKCdsb2FkJywgb25Db21wbGV0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0aGlzLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3kgKCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnVuY2FjaGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISN6aFxyXG4gKiDlvZPor6XotYTmupDliqDovb3miJDlip/lkI7op6blj5Hor6Xkuovku7ZcclxuICogISNlblxyXG4gKiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgd2hlbiB0aGUgYXNzZXQgaXMgbG9hZGVkXHJcbiAqXHJcbiAqIEBldmVudCBsb2FkXHJcbiAqL1xyXG5cclxuY2MuQXVkaW9DbGlwID0gQXVkaW9DbGlwO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQ2xpcDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=