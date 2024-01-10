
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCMotionStreak.js';
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
var RenderComponent = require('../components/CCRenderComponent');

var BlendFunc = require('../../core/utils/blend-func');
/**
 * !#en
 * cc.MotionStreak manages a Ribbon based on it's motion in absolute space.                 <br/>
 * You construct it with a fadeTime, minimum segment size, texture path, texture            <br/>
 * length and color. The fadeTime controls how long it takes each vertex in                 <br/>
 * the streak to fade out, the minimum segment size it how many pixels the                  <br/>
 * streak will move before adding a new ribbon segment, and the texture                     <br/>
 * length is the how many pixels the texture is stretched across. The texture               <br/>
 * is vertically aligned along the streak segment.
 * !#zh 运动轨迹，用于游戏对象的运动轨迹上实现拖尾渐隐效果。
 * @class MotionStreak
 * @extends Component
 * @uses BlendFunc
 */


var MotionStreak = cc.Class({
  name: 'cc.MotionStreak',
  // To avoid conflict with other render component, we haven't use ComponentUnderSG,
  // its implementation also requires some different approach:
  //   1.Needed a parent node to make motion streak's position global related.
  //   2.Need to update the position in each frame by itself because we don't know
  //     whether the global position have changed
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/MotionStreak',
    help: 'i18n:COMPONENT.help_url.motionStreak',
    playOnFocus: true,
    executeInEditMode: true
  },
  ctor: function ctor() {
    this._points = [];
  },
  properties: {
    /**
     * !#en
     * !#zh 在编辑器模式下预览拖尾效果。
     * @property {Boolean} preview
     * @default false
     */
    preview: {
      "default": false,
      editorOnly: true,
      notify: CC_EDITOR && function () {
        this.reset();
      },
      animatable: false
    },

    /**
     * !#en The fade time to fade.
     * !#zh 拖尾的渐隐时间，以秒为单位。
     * @property fadeTime
     * @type {Number}
     * @example
     * motionStreak.fadeTime = 3;
     */
    _fadeTime: 1,
    fadeTime: {
      get: function get() {
        return this._fadeTime;
      },
      set: function set(value) {
        this._fadeTime = value;
        this.reset();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.fadeTime'
    },

    /**
     * !#en The minimum segment size.
     * !#zh 拖尾之间最小距离。
     * @property minSeg
     * @type {Number}
     * @example
     * motionStreak.minSeg = 3;
     */
    _minSeg: 1,
    minSeg: {
      get: function get() {
        return this._minSeg;
      },
      set: function set(value) {
        this._minSeg = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.minSeg'
    },

    /**
     * !#en The stroke's width.
     * !#zh 拖尾的宽度。
     * @property stroke
     * @type {Number}
     * @example
     * motionStreak.stroke = 64;
     */
    _stroke: 64,
    stroke: {
      get: function get() {
        return this._stroke;
      },
      set: function set(value) {
        this._stroke = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.stroke'
    },

    /**
     * !#en The texture of the MotionStreak.
     * !#zh 拖尾的贴图。
     * @property texture
     * @type {Texture2D}
     * @example
     * motionStreak.texture = newTexture;
     */
    _texture: {
      "default": null,
      type: cc.Texture2D
    },
    texture: {
      get: function get() {
        return this._texture;
      },
      set: function set(value) {
        if (this._texture === value) return;
        this._texture = value;

        this._updateMaterial();
      },
      type: cc.Texture2D,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.texture'
    },

    /**
     * !#en The color of the MotionStreak.
     * !#zh 拖尾的颜色
     * @property color
     * @type {Color}
     * @default cc.Color.WHITE
     * @example
     * motionStreak.color = new cc.Color(255, 255, 255);
     */
    _color: cc.Color.WHITE,
    color: {
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);
        }
      },
      type: cc.Color,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.color'
    },

    /**
     * !#en The fast Mode.
     * !#zh 是否启用了快速模式。当启用快速模式，新的点会被更快地添加，但精度较低。
     * @property fastMode
     * @type {Boolean}
     * @default false
     * @example
     * motionStreak.fastMode = true;
     */
    _fastMode: false,
    fastMode: {
      get: function get() {
        return this._fastMode;
      },
      set: function set(value) {
        this._fastMode = value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.motionStreak.fastMode'
    }
  },
  onEnable: function onEnable() {
    this._super();

    this.reset();
  },
  _updateMaterial: function _updateMaterial() {
    var material = this.getMaterial(0);
    material && material.setProperty('texture', this._texture);

    BlendFunc.prototype._updateMaterial.call(this);
  },
  onFocusInEditor: CC_EDITOR && function () {
    if (this.preview) {
      this.reset();
    }
  },
  onLostFocusInEditor: CC_EDITOR && function () {
    if (this.preview) {
      this.reset();
    }
  },

  /**
   * !#en Remove all living segments of the ribbon.
   * !#zh 删除当前所有的拖尾片段。
   * @method reset
   * @example
   * // Remove all living segments of the ribbon.
   * myMotionStreak.reset();
   */
  reset: function reset() {
    this._points.length = 0;
    this._assembler && this._assembler._renderData.clear();

    if (CC_EDITOR) {
      cc.engine.repaintInEditMode();
    }
  },
  lateUpdate: function lateUpdate(dt) {
    this._assembler && this._assembler.update(this, dt);
  }
});
cc.MotionStreak = module.exports = MotionStreak;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTW90aW9uU3RyZWFrLmpzIl0sIm5hbWVzIjpbIlJlbmRlckNvbXBvbmVudCIsInJlcXVpcmUiLCJCbGVuZEZ1bmMiLCJNb3Rpb25TdHJlYWsiLCJjYyIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwicGxheU9uRm9jdXMiLCJleGVjdXRlSW5FZGl0TW9kZSIsImN0b3IiLCJfcG9pbnRzIiwicHJvcGVydGllcyIsInByZXZpZXciLCJlZGl0b3JPbmx5Iiwibm90aWZ5IiwicmVzZXQiLCJhbmltYXRhYmxlIiwiX2ZhZGVUaW1lIiwiZmFkZVRpbWUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJfbWluU2VnIiwibWluU2VnIiwiX3N0cm9rZSIsInN0cm9rZSIsIl90ZXh0dXJlIiwidHlwZSIsIlRleHR1cmUyRCIsInRleHR1cmUiLCJfdXBkYXRlTWF0ZXJpYWwiLCJfY29sb3IiLCJDb2xvciIsIldISVRFIiwiY29sb3IiLCJjbG9uZSIsImVxdWFscyIsIl9mYXN0TW9kZSIsImZhc3RNb2RlIiwib25FbmFibGUiLCJfc3VwZXIiLCJtYXRlcmlhbCIsImdldE1hdGVyaWFsIiwic2V0UHJvcGVydHkiLCJwcm90b3R5cGUiLCJjYWxsIiwib25Gb2N1c0luRWRpdG9yIiwib25Mb3N0Rm9jdXNJbkVkaXRvciIsImxlbmd0aCIsIl9hc3NlbWJsZXIiLCJfcmVuZGVyRGF0YSIsImNsZWFyIiwiZW5naW5lIiwicmVwYWludEluRWRpdE1vZGUiLCJsYXRlVXBkYXRlIiwiZHQiLCJ1cGRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDdUQsTUFBSCxDQUFVQyxpQkFBVjtBQUNIO0FBQ0osR0FqTnVCO0FBbU54QkMsRUFBQUEsVUFuTndCLHNCQW1OWkMsRUFuTlksRUFtTlI7QUFDWixTQUFLTixVQUFMLElBQW1CLEtBQUtBLFVBQUwsQ0FBZ0JPLE1BQWhCLENBQXVCLElBQXZCLEVBQTZCRCxFQUE3QixDQUFuQjtBQUNIO0FBck51QixDQUFULENBQW5CO0FBd05BMUQsRUFBRSxDQUFDRCxZQUFILEdBQWtCNkQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUQsWUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcclxuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vLi4vY29yZS91dGlscy9ibGVuZC1mdW5jJyk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBjYy5Nb3Rpb25TdHJlYWsgbWFuYWdlcyBhIFJpYmJvbiBiYXNlZCBvbiBpdCdzIG1vdGlvbiBpbiBhYnNvbHV0ZSBzcGFjZS4gICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIFlvdSBjb25zdHJ1Y3QgaXQgd2l0aCBhIGZhZGVUaW1lLCBtaW5pbXVtIHNlZ21lbnQgc2l6ZSwgdGV4dHVyZSBwYXRoLCB0ZXh0dXJlICAgICAgICAgICAgPGJyLz5cclxuICogbGVuZ3RoIGFuZCBjb2xvci4gVGhlIGZhZGVUaW1lIGNvbnRyb2xzIGhvdyBsb25nIGl0IHRha2VzIGVhY2ggdmVydGV4IGluICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiB0aGUgc3RyZWFrIHRvIGZhZGUgb3V0LCB0aGUgbWluaW11bSBzZWdtZW50IHNpemUgaXQgaG93IG1hbnkgcGl4ZWxzIHRoZSAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIHN0cmVhayB3aWxsIG1vdmUgYmVmb3JlIGFkZGluZyBhIG5ldyByaWJib24gc2VnbWVudCwgYW5kIHRoZSB0ZXh0dXJlICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogbGVuZ3RoIGlzIHRoZSBob3cgbWFueSBwaXhlbHMgdGhlIHRleHR1cmUgaXMgc3RyZXRjaGVkIGFjcm9zcy4gVGhlIHRleHR1cmUgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiBpcyB2ZXJ0aWNhbGx5IGFsaWduZWQgYWxvbmcgdGhlIHN0cmVhayBzZWdtZW50LlxyXG4gKiAhI3poIOi/kOWKqOi9qOi/ue+8jOeUqOS6jua4uOaIj+WvueixoeeahOi/kOWKqOi9qOi/ueS4iuWunueOsOaLluWwvua4kOmakOaViOaenOOAglxyXG4gKiBAY2xhc3MgTW90aW9uU3RyZWFrXHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKiBAdXNlcyBCbGVuZEZ1bmNcclxuICovXHJcbnZhciBNb3Rpb25TdHJlYWsgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTW90aW9uU3RyZWFrJyxcclxuXHJcbiAgICAvLyBUbyBhdm9pZCBjb25mbGljdCB3aXRoIG90aGVyIHJlbmRlciBjb21wb25lbnQsIHdlIGhhdmVuJ3QgdXNlIENvbXBvbmVudFVuZGVyU0csXHJcbiAgICAvLyBpdHMgaW1wbGVtZW50YXRpb24gYWxzbyByZXF1aXJlcyBzb21lIGRpZmZlcmVudCBhcHByb2FjaDpcclxuICAgIC8vICAgMS5OZWVkZWQgYSBwYXJlbnQgbm9kZSB0byBtYWtlIG1vdGlvbiBzdHJlYWsncyBwb3NpdGlvbiBnbG9iYWwgcmVsYXRlZC5cclxuICAgIC8vICAgMi5OZWVkIHRvIHVwZGF0ZSB0aGUgcG9zaXRpb24gaW4gZWFjaCBmcmFtZSBieSBpdHNlbGYgYmVjYXVzZSB3ZSBkb24ndCBrbm93XHJcbiAgICAvLyAgICAgd2hldGhlciB0aGUgZ2xvYmFsIHBvc2l0aW9uIGhhdmUgY2hhbmdlZFxyXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxyXG4gICAgbWl4aW5zOiBbQmxlbmRGdW5jXSxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5vdGhlcnMvTW90aW9uU3RyZWFrJyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwubW90aW9uU3RyZWFrJyxcclxuICAgICAgICBwbGF5T25Gb2N1czogdHJ1ZSxcclxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiAhI3poIOWcqOe8lui+keWZqOaooeW8j+S4i+mihOiniOaLluWwvuaViOaenOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmlld1xyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJldmlldzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgbm90aWZ5OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGZhZGUgdGltZSB0byBmYWRlLlxyXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE5riQ6ZqQ5pe26Ze077yM5Lul56eS5Li65Y2V5L2N44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGZhZGVUaW1lXHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIG1vdGlvblN0cmVhay5mYWRlVGltZSA9IDM7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2ZhZGVUaW1lOiAxLFxyXG4gICAgICAgIGZhZGVUaW1lOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFkZVRpbWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZhZGVUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5mYWRlVGltZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBtaW5pbXVtIHNlZ21lbnQgc2l6ZS5cclxuICAgICAgICAgKiAhI3poIOaLluWwvuS5i+mXtOacgOWwj+i3neemu+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBtaW5TZWdcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogbW90aW9uU3RyZWFrLm1pblNlZyA9IDM7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX21pblNlZzogMSxcclxuICAgICAgICBtaW5TZWc6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9taW5TZWc7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pblNlZyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tb3Rpb25TdHJlYWsubWluU2VnJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHN0cm9rZSdzIHdpZHRoLlxyXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE5a695bqm44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHN0cm9rZVxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsuc3Ryb2tlID0gNjQ7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3N0cm9rZTogNjQsXHJcbiAgICAgICAgc3Ryb2tlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubW90aW9uU3RyZWFrLnN0cm9rZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSB0ZXh0dXJlIG9mIHRoZSBNb3Rpb25TdHJlYWsuXHJcbiAgICAgICAgICogISN6aCDmi5blsL7nmoTotLTlm77jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgdGV4dHVyZVxyXG4gICAgICAgICAqIEB0eXBlIHtUZXh0dXJlMkR9XHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsudGV4dHVyZSA9IG5ld1RleHR1cmU7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3RleHR1cmU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJEXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXh0dXJlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tb3Rpb25TdHJlYWsudGV4dHVyZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBjb2xvciBvZiB0aGUgTW90aW9uU3RyZWFrLlxyXG4gICAgICAgICAqICEjemgg5ouW5bC+55qE6aKc6ImyXHJcbiAgICAgICAgICogQHByb3BlcnR5IGNvbG9yXHJcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLkNvbG9yLldISVRFXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBtb3Rpb25TdHJlYWsuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICBjb2xvcjoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbG9yLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5jb2xvcidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBmYXN0IE1vZGUuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjkuoblv6vpgJ/mqKHlvI/jgILlvZPlkK/nlKjlv6vpgJ/mqKHlvI/vvIzmlrDnmoTngrnkvJrooqvmm7Tlv6vlnLDmt7vliqDvvIzkvYbnsr7luqbovoPkvY7jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgZmFzdE1vZGVcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogbW90aW9uU3RyZWFrLmZhc3RNb2RlID0gdHJ1ZTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBfZmFzdE1vZGU6IGZhbHNlLFxyXG4gICAgICAgIGZhc3RNb2RlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFzdE1vZGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Zhc3RNb2RlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1vdGlvblN0cmVhay5mYXN0TW9kZSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKDApO1xyXG4gICAgICAgIG1hdGVyaWFsICYmIG1hdGVyaWFsLnNldFByb3BlcnR5KCd0ZXh0dXJlJywgdGhpcy5fdGV4dHVyZSk7XHJcblxyXG4gICAgICAgIEJsZW5kRnVuYy5wcm90b3R5cGUuX3VwZGF0ZU1hdGVyaWFsLmNhbGwodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRm9jdXNJbkVkaXRvcjogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9zdEZvY3VzSW5FZGl0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJldmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVtb3ZlIGFsbCBsaXZpbmcgc2VnbWVudHMgb2YgdGhlIHJpYmJvbi5cclxuICAgICAqICEjemgg5Yig6Zmk5b2T5YmN5omA5pyJ55qE5ouW5bC+54mH5q6144CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc2V0XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gUmVtb3ZlIGFsbCBsaXZpbmcgc2VnbWVudHMgb2YgdGhlIHJpYmJvbi5cclxuICAgICAqIG15TW90aW9uU3RyZWFrLnJlc2V0KCk7XHJcbiAgICAgKi9cclxuICAgIHJlc2V0ICgpIHtcclxuICAgICAgICB0aGlzLl9wb2ludHMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgdGhpcy5fYXNzZW1ibGVyLl9yZW5kZXJEYXRhLmNsZWFyKCk7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGUgKGR0KSB7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyICYmIHRoaXMuX2Fzc2VtYmxlci51cGRhdGUodGhpcywgZHQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLk1vdGlvblN0cmVhayA9IG1vZHVsZS5leHBvcnRzID0gTW90aW9uU3RyZWFrO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==