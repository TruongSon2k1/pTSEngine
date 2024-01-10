
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCSkeletonAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Animation = require('../../components/CCAnimation');

var Model = require('../CCModel');

var SkeletonAnimationClip = require('./CCSkeletonAnimationClip');
/**
 * @module cc
 */

/**
 * !#en .
 * !#zh 。
 * @class SkeletonAnimation
 * @extends Animation
 */


var SkeletonAnimation = cc.Class({
  name: 'cc.SkeletonAnimation',
  "extends": Animation,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/skeleton-animation.js',
    menu: 'i18n:MAIN_MENU.component.others/Skeleton Animation'
  },
  properties: {
    _model: {
      "default": null,
      type: Model
    },
    _defaultClip: {
      override: true,
      "default": null,
      type: SkeletonAnimationClip
    },
    _clips: {
      override: true,
      "default": [],
      type: [SkeletonAnimationClip],
      visible: true
    },
    defaultClip: {
      override: true,
      get: function get() {
        return this._defaultClip;
      },
      set: function set(v) {
        this._defaultClip = v;
      },
      type: SkeletonAnimationClip
    },
    model: {
      get: function get() {
        return this._model;
      },
      set: function set(val) {
        this._model = val;

        this._updateClipModel();
      },
      type: Model
    }
  },
  __preload: function __preload() {
    this._updateClipModel();
  },
  _updateClipModel: function _updateClipModel() {
    if (this._defaultClip) {
      this._defaultClip._model = this._model;
    }

    var clips = this._clips;

    for (var i = 0; i < clips.length; i++) {
      clips[i]._model = this._model;
    }
  },
  addClip: function addClip(clip, newName) {
    clip._model = this._model;
    return Animation.prototype.addClip.call(this, clip, newName);
  },
  searchClips: CC_EDITOR && function () {
    if (!this._model) {
      cc.warn('There was no model provided.');
      return;
    }

    this._clips.length = 0;
    var self = this;
    Editor.assetdb.queryPathByUuid(this._model._uuid, function (err, modelPath) {
      if (err) return console.error(err);

      var Path = require('fire-path');

      var queryPath = Path.relative(Editor.remote.Project.path, modelPath);
      queryPath = Path.join(Path.dirname(queryPath), Path.basenameNoExt(queryPath));
      queryPath = "db://" + queryPath + "*/*.sac";
      Editor.assetdb.queryAssets(queryPath, null, function (err, results) {
        if (results) {
          for (var i = 0; i < results.length; i++) {
            var clip = new SkeletonAnimationClip();
            clip._uuid = results[i].uuid;

            self._clips.push(clip);
          }

          self._defaultClip = self._clips[0];
        }
      });
    });
  }
});
cc.SkeletonAnimation = module.exports = SkeletonAnimation;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxza2VsZXRvblxcQ0NTa2VsZXRvbkFuaW1hdGlvbi5qcyJdLCJuYW1lcyI6WyJBbmltYXRpb24iLCJyZXF1aXJlIiwiTW9kZWwiLCJTa2VsZXRvbkFuaW1hdGlvbkNsaXAiLCJTa2VsZXRvbkFuaW1hdGlvbiIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiaW5zcGVjdG9yIiwibWVudSIsInByb3BlcnRpZXMiLCJfbW9kZWwiLCJ0eXBlIiwiX2RlZmF1bHRDbGlwIiwib3ZlcnJpZGUiLCJfY2xpcHMiLCJ2aXNpYmxlIiwiZGVmYXVsdENsaXAiLCJnZXQiLCJzZXQiLCJ2IiwibW9kZWwiLCJ2YWwiLCJfdXBkYXRlQ2xpcE1vZGVsIiwiX19wcmVsb2FkIiwiY2xpcHMiLCJpIiwibGVuZ3RoIiwiYWRkQ2xpcCIsImNsaXAiLCJuZXdOYW1lIiwicHJvdG90eXBlIiwiY2FsbCIsInNlYXJjaENsaXBzIiwid2FybiIsInNlbGYiLCJFZGl0b3IiLCJhc3NldGRiIiwicXVlcnlQYXRoQnlVdWlkIiwiX3V1aWQiLCJlcnIiLCJtb2RlbFBhdGgiLCJjb25zb2xlIiwiZXJyb3IiLCJQYXRoIiwicXVlcnlQYXRoIiwicmVsYXRpdmUiLCJyZW1vdGUiLCJQcm9qZWN0IiwicGF0aCIsImpvaW4iLCJkaXJuYW1lIiwiYmFzZW5hbWVOb0V4dCIsInF1ZXJ5QXNzZXRzIiwicmVzdWx0cyIsInV1aWQiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLDhCQUFELENBQXpCOztBQUNB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Q0g7O0FBQ0RNLFVBQUFBLElBQUksQ0FBQ3RCLFlBQUwsR0FBb0JzQixJQUFJLENBQUNwQixNQUFMLENBQVksQ0FBWixDQUFwQjtBQUNIO0FBQ0osT0FURDtBQVVILEtBbEJEO0FBbUJIO0FBbEc0QixDQUFULENBQXhCO0FBcUdBWixFQUFFLENBQUNELGlCQUFILEdBQXVCdUQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEQsaUJBQXhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MuY29tXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IEFuaW1hdGlvbiA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvQ0NBbmltYXRpb24nKTtcclxuY29uc3QgTW9kZWwgPSByZXF1aXJlKCcuLi9DQ01vZGVsJyk7XHJcbmNvbnN0IFNrZWxldG9uQW5pbWF0aW9uQ2xpcCA9IHJlcXVpcmUoJy4vQ0NTa2VsZXRvbkFuaW1hdGlvbkNsaXAnKTtcclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjXHJcbiAqL1xyXG4vKipcclxuICogISNlbiAuXHJcbiAqICEjemgg44CCXHJcbiAqIEBjbGFzcyBTa2VsZXRvbkFuaW1hdGlvblxyXG4gKiBAZXh0ZW5kcyBBbmltYXRpb25cclxuICovXHJcbmxldCBTa2VsZXRvbkFuaW1hdGlvbiA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Ta2VsZXRvbkFuaW1hdGlvbicsXHJcbiAgICBleHRlbmRzOiBBbmltYXRpb24sXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2tlbGV0b24tYW5pbWF0aW9uLmpzJyxcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm90aGVycy9Ta2VsZXRvbiBBbmltYXRpb24nLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX21vZGVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IE1vZGVsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2RlZmF1bHRDbGlwOiB7XHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBTa2VsZXRvbkFuaW1hdGlvbkNsaXAsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2NsaXBzOiB7XHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW1NrZWxldG9uQW5pbWF0aW9uQ2xpcF0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVmYXVsdENsaXA6IHtcclxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENsaXA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENsaXAgPSB2O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBTa2VsZXRvbkFuaW1hdGlvbkNsaXAsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbW9kZWw6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb2RlbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vZGVsID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2xpcE1vZGVsKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IE1vZGVsLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIF9fcHJlbG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xpcE1vZGVsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVDbGlwTW9kZWwgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Q2xpcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0Q2xpcC5fbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNsaXBzID0gdGhpcy5fY2xpcHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGlwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjbGlwc1tpXS5fbW9kZWwgPSB0aGlzLl9tb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENsaXAgKGNsaXAsIG5ld05hbWUpIHtcclxuICAgICAgICBjbGlwLl9tb2RlbCA9IHRoaXMuX21vZGVsO1xyXG4gICAgICAgIHJldHVybiBBbmltYXRpb24ucHJvdG90eXBlLmFkZENsaXAuY2FsbCh0aGlzLCBjbGlwLCBuZXdOYW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2VhcmNoQ2xpcHM6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb2RlbCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdUaGVyZSB3YXMgbm8gbW9kZWwgcHJvdmlkZWQuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NsaXBzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIEVkaXRvci5hc3NldGRiLnF1ZXJ5UGF0aEJ5VXVpZCh0aGlzLl9tb2RlbC5fdXVpZCwgZnVuY3Rpb24gKGVyciwgbW9kZWxQYXRoKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBQYXRoID0gcmVxdWlyZSgnZmlyZS1wYXRoJyk7XHJcbiAgICAgICAgICAgIGxldCBxdWVyeVBhdGggPSBQYXRoLnJlbGF0aXZlKEVkaXRvci5yZW1vdGUuUHJvamVjdC5wYXRoLCBtb2RlbFBhdGgpO1xyXG4gICAgICAgICAgICBxdWVyeVBhdGggPSBQYXRoLmpvaW4oUGF0aC5kaXJuYW1lKHF1ZXJ5UGF0aCksIFBhdGguYmFzZW5hbWVOb0V4dChxdWVyeVBhdGgpKTtcclxuICAgICAgICAgICAgcXVlcnlQYXRoID0gYGRiOi8vJHtxdWVyeVBhdGh9Ki8qLnNhY2A7XHJcblxyXG4gICAgICAgICAgICBFZGl0b3IuYXNzZXRkYi5xdWVyeUFzc2V0cyhxdWVyeVBhdGgsIG51bGwsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbGlwID0gbmV3IFNrZWxldG9uQW5pbWF0aW9uQ2xpcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlwLl91dWlkID0gcmVzdWx0c1tpXS51dWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jbGlwcy5wdXNoKGNsaXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9kZWZhdWx0Q2xpcCA9IHNlbGYuX2NsaXBzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5Ta2VsZXRvbkFuaW1hdGlvbiA9IG1vZHVsZS5leHBvcnRzID0gU2tlbGV0b25BbmltYXRpb247XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9