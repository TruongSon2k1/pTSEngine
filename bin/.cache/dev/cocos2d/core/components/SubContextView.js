
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/SubContextView.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
var Component = require('./CCComponent');
/**
 * !#en SubContextView is a view component which controls open data context viewport in minigame platform.<br/>
 * The component's node size decide the viewport of the sub context content in main context, 
 * the entire sub context texture will be scaled to the node's bounding box area.<br/>
 * This component provides multiple important features:<br/>
 * 1. Sub context could use its own resolution size and policy.<br/>
 * 2. Sub context could be minized to smallest size it needed.<br/>
 * 3. Resolution of sub context content could be increased.<br/>
 * 4. User touch input is transformed to the correct viewport.<br/>
 * 5. Texture update is handled by this component. User don't need to worry.<br/>
 * One important thing to be noted, whenever the node's bounding box change, 
 * !#zh SubContextView 可以用来控制小游戏平台开放数据域在主域中的视窗的位置。<br/>
 * 这个组件的节点尺寸决定了开放数据域内容在主域中的尺寸，整个开放数据域会被缩放到节点的包围盒范围内。<br/>
 * 在这个组件的控制下，用户可以更自由得控制开放数据域：<br/>
 * 1. 子域中可以使用独立的设计分辨率和适配模式<br/>
 * 2. 子域区域尺寸可以缩小到只容纳内容即可<br/>
 * 3. 子域的分辨率也可以被放大，以便获得更清晰的显示效果<br/>
 * 4. 用户输入坐标会被自动转换到正确的子域视窗中<br/>
 * 5. 子域内容贴图的更新由组件负责，用户不需要处理<br/>
 * @class SubContextView
 * @extends Component
 */


var SubContextView = cc.Class({
  name: 'cc.SubContextView',
  "extends": Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/SubContextView',
    help: 'i18n:COMPONENT.help_url.subcontext_view'
  },
  properties: {
    _firstlyEnabled: true,
    _fps: 60,
    fps: {
      get: function get() {
        return this._fps;
      },
      set: function set(value) {
        if (this._fps === value) {
          return;
        }

        this._fps = value;
        this._updateInterval = 1 / value;

        this._updateSubContextFrameRate();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.subcontext_view.fps'
    }
  },
  ctor: function ctor() {
    this._sprite = null;
    this._tex = new cc.Texture2D();
    this._context = null;
    this._updatedTime = performance.now();
    this._updateInterval = 0;
  },
  onLoad: function onLoad() {
    // Setup subcontext canvas size
    if (window.__globalAdapter && __globalAdapter.getOpenDataContext) {
      this._updateInterval = 1000 / this._fps;
      this._context = __globalAdapter.getOpenDataContext();
      this.reset();
      var sharedCanvas = this._context.canvas;

      this._tex.setPremultiplyAlpha(true);

      this._tex.initWithElement(sharedCanvas);

      this._sprite = this.node.getComponent(cc.Sprite);

      if (!this._sprite) {
        this._sprite = this.node.addComponent(cc.Sprite);
        this._sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
      }

      this._sprite.spriteFrame = new cc.SpriteFrame(this._tex);
    } else {
      this.enabled = false;
    }
  },

  /**
   * !#en Reset open data context size and viewport
   * !#zh 重置开放数据域的尺寸和视窗
   * @method reset
   */
  reset: function reset() {
    if (this._context) {
      this.updateSubContextViewport();
      var sharedCanvas = this._context.canvas;

      if (sharedCanvas) {
        sharedCanvas.width = this.node.width;
        sharedCanvas.height = this.node.height;
      }
    }
  },
  onEnable: function onEnable() {
    if (this._firstlyEnabled && this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'boot'
      });

      this._firstlyEnabled = false;
    } else {
      this._runSubContextMainLoop();
    }

    this._registerNodeEvent();

    this._updateSubContextFrameRate();

    this.updateSubContextViewport();
  },
  onDisable: function onDisable() {
    this._unregisterNodeEvent();

    this._stopSubContextMainLoop();
  },
  update: function update(dt) {
    var calledUpdateMannually = dt === undefined;

    if (calledUpdateMannually) {
      this._context && this._context.postMessage({
        fromEngine: true,
        event: 'step'
      });

      this._updateSubContextTexture();

      return;
    }

    var now = performance.now();
    var deltaTime = now - this._updatedTime;

    if (deltaTime >= this._updateInterval) {
      this._updatedTime += this._updateInterval;

      this._updateSubContextTexture();
    }
  },
  _updateSubContextTexture: function _updateSubContextTexture() {
    if (!this._tex || !this._context) {
      return;
    }

    this._tex.initWithElement(this._context.canvas);

    this._sprite._activateMaterial();
  },

  /**
   * !#en Update the sub context viewport manually, it should be called whenever the node's bounding box changes.
   * !#zh 更新开放数据域相对于主域的 viewport，这个函数应该在节点包围盒改变时手动调用。
   * @method updateSubContextViewport
   */
  updateSubContextViewport: function updateSubContextViewport() {
    if (this._context) {
      var box = this.node.getBoundingBoxToWorld();
      var sx = cc.view._scaleX;
      var sy = cc.view._scaleY;

      this._context.postMessage({
        fromEngine: true,
        event: 'viewport',
        x: box.x * sx + cc.view._viewportRect.x,
        y: box.y * sy + cc.view._viewportRect.y,
        width: box.width * sx,
        height: box.height * sy
      });
    }
  },
  _registerNodeEvent: function _registerNodeEvent() {
    this.node.on('position-changed', this.updateSubContextViewport, this);
    this.node.on('scale-changed', this.updateSubContextViewport, this);
    this.node.on('size-changed', this.updateSubContextViewport, this);
  },
  _unregisterNodeEvent: function _unregisterNodeEvent() {
    this.node.off('position-changed', this.updateSubContextViewport, this);
    this.node.off('scale-changed', this.updateSubContextViewport, this);
    this.node.off('size-changed', this.updateSubContextViewport, this);
  },
  _runSubContextMainLoop: function _runSubContextMainLoop() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'mainLoop',
        value: true
      });
    }
  },
  _stopSubContextMainLoop: function _stopSubContextMainLoop() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'mainLoop',
        value: false
      });
    }
  },
  _updateSubContextFrameRate: function _updateSubContextFrameRate() {
    if (this._context) {
      this._context.postMessage({
        fromEngine: true,
        event: 'frameRate',
        value: this._fps
      });
    }
  }
});
cc.SubContextView = module.exports = SubContextView;
/**
 * !#en WXSubContextView is deprecated since v2.4.1, please use SubContextView instead.
 * !#zh 自 v2.4.1 起，WXSubContextView 已经废弃，请使用 SubContextView
 * @class WXSubContextView
 * @extends Component
 * @deprecated since v2.4.1
 */

cc.WXSubContextView = SubContextView;
/**
 * !#en SwanSubContextView is deprecated since v2.4.1, please use SubContextView instead.
 * !#zh 自 v2.4.1 起，SwanSubContextView 已经废弃，请使用 SubContextView
 * @class SwanSubContextView
 * @extends Component
 * @deprecated since v2.4.1
 */

cc.SwanSubContextView = SubContextView;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXFN1YkNvbnRleHRWaWV3LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInJlcXVpcmUiLCJTdWJDb250ZXh0VmlldyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJwcm9wZXJ0aWVzIiwiX2ZpcnN0bHlFbmFibGVkIiwiX2ZwcyIsImZwcyIsImdldCIsInNldCIsInZhbHVlIiwiX3VwZGF0ZUludGVydmFsIiwiX3VwZGF0ZVN1YkNvbnRleHRGcmFtZVJhdGUiLCJ0b29sdGlwIiwiQ0NfREVWIiwiY3RvciIsIl9zcHJpdGUiLCJfdGV4IiwiVGV4dHVyZTJEIiwiX2NvbnRleHQiLCJfdXBkYXRlZFRpbWUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsIm9uTG9hZCIsIndpbmRvdyIsIl9fZ2xvYmFsQWRhcHRlciIsImdldE9wZW5EYXRhQ29udGV4dCIsInJlc2V0Iiwic2hhcmVkQ2FudmFzIiwiY2FudmFzIiwic2V0UHJlbXVsdGlwbHlBbHBoYSIsImluaXRXaXRoRWxlbWVudCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJTcHJpdGUiLCJhZGRDb21wb25lbnQiLCJzcmNCbGVuZEZhY3RvciIsIm1hY3JvIiwiQmxlbmRGYWN0b3IiLCJPTkUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwiZW5hYmxlZCIsInVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydCIsIndpZHRoIiwiaGVpZ2h0Iiwib25FbmFibGUiLCJwb3N0TWVzc2FnZSIsImZyb21FbmdpbmUiLCJldmVudCIsIl9ydW5TdWJDb250ZXh0TWFpbkxvb3AiLCJfcmVnaXN0ZXJOb2RlRXZlbnQiLCJvbkRpc2FibGUiLCJfdW5yZWdpc3Rlck5vZGVFdmVudCIsIl9zdG9wU3ViQ29udGV4dE1haW5Mb29wIiwidXBkYXRlIiwiZHQiLCJjYWxsZWRVcGRhdGVNYW5udWFsbHkiLCJ1bmRlZmluZWQiLCJfdXBkYXRlU3ViQ29udGV4dFRleHR1cmUiLCJkZWx0YVRpbWUiLCJfYWN0aXZhdGVNYXRlcmlhbCIsImJveCIsImdldEJvdW5kaW5nQm94VG9Xb3JsZCIsInN4IiwidmlldyIsIl9zY2FsZVgiLCJzeSIsIl9zY2FsZVkiLCJ4IiwiX3ZpZXdwb3J0UmVjdCIsInkiLCJvbiIsIm9mZiIsIm1vZHVsZSIsImV4cG9ydHMiLCJXWFN1YkNvbnRleHRWaWV3IiwiU3dhblN1YkNvbnRleHRWaWV3Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUF6QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxjQUFjLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzFCQyxFQUFBQSxJQUFJLEVBQUUsbUJBRG9CO0FBRTFCLGFBQVNMLFNBRmlCO0FBSTFCTSxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLGdEQURXO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUU7QUFGVyxHQUpLO0FBUzFCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsZUFBZSxFQUFFLElBRFQ7QUFHUkMsSUFBQUEsSUFBSSxFQUFFLEVBSEU7QUFLUkMsSUFBQUEsR0FBRyxFQUFFO0FBQ0RDLE1BQUFBLEdBREMsaUJBQ007QUFDSCxlQUFPLEtBQUtGLElBQVo7QUFDSCxPQUhBO0FBSURHLE1BQUFBLEdBSkMsZUFJSUMsS0FKSixFQUlXO0FB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dCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDIwIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gU3ViQ29udGV4dFZpZXcgaXMgYSB2aWV3IGNvbXBvbmVudCB3aGljaCBjb250cm9scyBvcGVuIGRhdGEgY29udGV4dCB2aWV3cG9ydCBpbiBtaW5pZ2FtZSBwbGF0Zm9ybS48YnIvPlxyXG4gKiBUaGUgY29tcG9uZW50J3Mgbm9kZSBzaXplIGRlY2lkZSB0aGUgdmlld3BvcnQgb2YgdGhlIHN1YiBjb250ZXh0IGNvbnRlbnQgaW4gbWFpbiBjb250ZXh0LCBcclxuICogdGhlIGVudGlyZSBzdWIgY29udGV4dCB0ZXh0dXJlIHdpbGwgYmUgc2NhbGVkIHRvIHRoZSBub2RlJ3MgYm91bmRpbmcgYm94IGFyZWEuPGJyLz5cclxuICogVGhpcyBjb21wb25lbnQgcHJvdmlkZXMgbXVsdGlwbGUgaW1wb3J0YW50IGZlYXR1cmVzOjxici8+XHJcbiAqIDEuIFN1YiBjb250ZXh0IGNvdWxkIHVzZSBpdHMgb3duIHJlc29sdXRpb24gc2l6ZSBhbmQgcG9saWN5Ljxici8+XHJcbiAqIDIuIFN1YiBjb250ZXh0IGNvdWxkIGJlIG1pbml6ZWQgdG8gc21hbGxlc3Qgc2l6ZSBpdCBuZWVkZWQuPGJyLz5cclxuICogMy4gUmVzb2x1dGlvbiBvZiBzdWIgY29udGV4dCBjb250ZW50IGNvdWxkIGJlIGluY3JlYXNlZC48YnIvPlxyXG4gKiA0LiBVc2VyIHRvdWNoIGlucHV0IGlzIHRyYW5zZm9ybWVkIHRvIHRoZSBjb3JyZWN0IHZpZXdwb3J0Ljxici8+XHJcbiAqIDUuIFRleHR1cmUgdXBkYXRlIGlzIGhhbmRsZWQgYnkgdGhpcyBjb21wb25lbnQuIFVzZXIgZG9uJ3QgbmVlZCB0byB3b3JyeS48YnIvPlxyXG4gKiBPbmUgaW1wb3J0YW50IHRoaW5nIHRvIGJlIG5vdGVkLCB3aGVuZXZlciB0aGUgbm9kZSdzIGJvdW5kaW5nIGJveCBjaGFuZ2UsIFxyXG4gKiAhI3poIFN1YkNvbnRleHRWaWV3IOWPr+S7peeUqOadpeaOp+WItuWwj+a4uOaIj+W5s+WPsOW8gOaUvuaVsOaNruWfn+WcqOS4u+Wfn+S4reeahOinhueql+eahOS9jee9ruOAgjxici8+XHJcbiAqIOi/meS4que7hOS7tueahOiKgueCueWwuuWvuOWGs+WumuS6huW8gOaUvuaVsOaNruWfn+WGheWuueWcqOS4u+Wfn+S4reeahOWwuuWvuO+8jOaVtOS4quW8gOaUvuaVsOaNruWfn+S8muiiq+e8qeaUvuWIsOiKgueCueeahOWMheWbtOebkuiMg+WbtOWGheOAgjxici8+XHJcbiAqIOWcqOi/meS4que7hOS7tueahOaOp+WItuS4i++8jOeUqOaIt+WPr+S7peabtOiHqueUseW+l+aOp+WItuW8gOaUvuaVsOaNruWfn++8mjxici8+XHJcbiAqIDEuIOWtkOWfn+S4reWPr+S7peS9v+eUqOeLrOeri+eahOiuvuiuoeWIhui+qOeOh+WSjOmAgumFjeaooeW8jzxici8+XHJcbiAqIDIuIOWtkOWfn+WMuuWfn+WwuuWvuOWPr+S7pee8qeWwj+WIsOWPquWuuee6s+WGheWuueWNs+WPrzxici8+XHJcbiAqIDMuIOWtkOWfn+eahOWIhui+qOeOh+S5n+WPr+S7peiiq+aUvuWkp++8jOS7peS+v+iOt+W+l+abtOa4heaZsOeahOaYvuekuuaViOaenDxici8+XHJcbiAqIDQuIOeUqOaIt+i+k+WFpeWdkOagh+S8muiiq+iHquWKqOi9rOaNouWIsOato+ehrueahOWtkOWfn+inhueql+S4rTxici8+XHJcbiAqIDUuIOWtkOWfn+WGheWuuei0tOWbvueahOabtOaWsOeUsee7hOS7tui0n+i0o++8jOeUqOaIt+S4jemcgOimgeWkhOeQhjxici8+XHJcbiAqIEBjbGFzcyBTdWJDb250ZXh0Vmlld1xyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmxldCBTdWJDb250ZXh0VmlldyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5TdWJDb250ZXh0VmlldycsXHJcbiAgICBleHRlbmRzOiBDb21wb25lbnQsXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQub3RoZXJzL1N1YkNvbnRleHRWaWV3JyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuc3ViY29udGV4dF92aWV3JyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9maXJzdGx5RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICBcclxuICAgICAgICBfZnBzOiA2MCxcclxuXHJcbiAgICAgICAgZnBzOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZnBzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnBzID09PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZwcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlSW50ZXJ2YWwgPSAxIC8gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdWJDb250ZXh0RnJhbWVSYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ViY29udGV4dF92aWV3LmZwcydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZWRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlSW50ZXJ2YWwgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8vIFNldHVwIHN1YmNvbnRleHQgY2FudmFzIHNpemVcclxuICAgICAgICBpZiAod2luZG93Ll9fZ2xvYmFsQWRhcHRlciAmJiBfX2dsb2JhbEFkYXB0ZXIuZ2V0T3BlbkRhdGFDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUludGVydmFsID0gMTAwMCAvIHRoaXMuX2ZwcztcclxuICAgICAgICAgICAgdGhpcy5fY29udGV4dCA9IF9fZ2xvYmFsQWRhcHRlci5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICBsZXQgc2hhcmVkQ2FudmFzID0gdGhpcy5fY29udGV4dC5jYW52YXM7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleC5zZXRQcmVtdWx0aXBseUFscGhhKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl90ZXguaW5pdFdpdGhFbGVtZW50KHNoYXJlZENhbnZhcyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMuX3RleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXNldCBvcGVuIGRhdGEgY29udGV4dCBzaXplIGFuZCB2aWV3cG9ydFxyXG4gICAgICogISN6aCDph43nva7lvIDmlL7mlbDmja7ln5/nmoTlsLrlr7jlkozop4bnqpdcclxuICAgICAqIEBtZXRob2QgcmVzZXRcclxuICAgICAqL1xyXG4gICAgcmVzZXQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0KCk7XHJcbiAgICAgICAgICAgIGxldCBzaGFyZWRDYW52YXMgPSB0aGlzLl9jb250ZXh0LmNhbnZhcztcclxuICAgICAgICAgICAgaWYgKHNoYXJlZENhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgc2hhcmVkQ2FudmFzLndpZHRoID0gdGhpcy5ub2RlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgc2hhcmVkQ2FudmFzLmhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlyc3RseUVuYWJsZWQgJiYgdGhpcy5fY29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBldmVudDogJ2Jvb3QnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3RseUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3J1blN1YkNvbnRleHRNYWluTG9vcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZWdpc3Rlck5vZGVFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YkNvbnRleHRGcmFtZVJhdGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3VucmVnaXN0ZXJOb2RlRXZlbnQoKTtcclxuICAgICAgICB0aGlzLl9zdG9wU3ViQ29udGV4dE1haW5Mb29wKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBsZXQgY2FsbGVkVXBkYXRlTWFubnVhbGx5ID0gKGR0ID09PSB1bmRlZmluZWQpO1xyXG4gICAgICAgIGlmIChjYWxsZWRVcGRhdGVNYW5udWFsbHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGV4dCAmJiB0aGlzLl9jb250ZXh0LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBldmVudDogJ3N0ZXAnLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ViQ29udGV4dFRleHR1cmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgbGV0IGRlbHRhVGltZSA9IChub3cgLSB0aGlzLl91cGRhdGVkVGltZSk7XHJcbiAgICAgICAgaWYgKGRlbHRhVGltZSA+PSB0aGlzLl91cGRhdGVJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVkVGltZSArPSB0aGlzLl91cGRhdGVJbnRlcnZhbDtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3ViQ29udGV4dFRleHR1cmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVTdWJDb250ZXh0VGV4dHVyZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90ZXggfHwgIXRoaXMuX2NvbnRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl90ZXguaW5pdFdpdGhFbGVtZW50KHRoaXMuX2NvbnRleHQuY2FudmFzKTtcclxuICAgICAgICB0aGlzLl9zcHJpdGUuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFVwZGF0ZSB0aGUgc3ViIGNvbnRleHQgdmlld3BvcnQgbWFudWFsbHksIGl0IHNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIG5vZGUncyBib3VuZGluZyBib3ggY2hhbmdlcy5cclxuICAgICAqICEjemgg5pu05paw5byA5pS+5pWw5o2u5Z+f55u45a+55LqO5Li75Z+f55qEIHZpZXdwb3J077yM6L+Z5Liq5Ye95pWw5bqU6K+l5Zyo6IqC54K55YyF5Zu055uS5pS55Y+Y5pe25omL5Yqo6LCD55So44CCXHJcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XHJcbiAgICAgICAgICAgIGxldCBzeCA9IGNjLnZpZXcuX3NjYWxlWDtcclxuICAgICAgICAgICAgbGV0IHN5ID0gY2Mudmlldy5fc2NhbGVZO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgIGZyb21FbmdpbmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBldmVudDogJ3ZpZXdwb3J0JyxcclxuICAgICAgICAgICAgICAgIHg6IGJveC54ICogc3ggKyBjYy52aWV3Ll92aWV3cG9ydFJlY3QueCxcclxuICAgICAgICAgICAgICAgIHk6IGJveC55ICogc3kgKyBjYy52aWV3Ll92aWV3cG9ydFJlY3QueSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBib3gud2lkdGggKiBzeCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogYm94LmhlaWdodCAqIHN5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3JlZ2lzdGVyTm9kZUV2ZW50ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oJ3Bvc2l0aW9uLWNoYW5nZWQnLCB0aGlzLnVwZGF0ZVN1YkNvbnRleHRWaWV3cG9ydCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKCdzY2FsZS1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbignc2l6ZS1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdW5yZWdpc3Rlck5vZGVFdmVudCAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZigncG9zaXRpb24tY2hhbmdlZCcsIHRoaXMudXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCdzY2FsZS1jaGFuZ2VkJywgdGhpcy51cGRhdGVTdWJDb250ZXh0Vmlld3BvcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoJ3NpemUtY2hhbmdlZCcsIHRoaXMudXBkYXRlU3ViQ29udGV4dFZpZXdwb3J0LCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3J1blN1YkNvbnRleHRNYWluTG9vcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBmcm9tRW5naW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdtYWluTG9vcCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfc3RvcFN1YkNvbnRleHRNYWluTG9vcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBmcm9tRW5naW5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXZlbnQ6ICdtYWluTG9vcCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVN1YkNvbnRleHRGcmFtZVJhdGUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgZnJvbUVuZ2luZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGV2ZW50OiAnZnJhbWVSYXRlJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9mcHMsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuU3ViQ29udGV4dFZpZXcgPSBtb2R1bGUuZXhwb3J0cyA9IFN1YkNvbnRleHRWaWV3O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gV1hTdWJDb250ZXh0VmlldyBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMSwgcGxlYXNlIHVzZSBTdWJDb250ZXh0VmlldyBpbnN0ZWFkLlxyXG4gKiAhI3poIOiHqiB2Mi40LjEg6LW377yMV1hTdWJDb250ZXh0VmlldyDlt7Lnu4/lup/lvIPvvIzor7fkvb/nlKggU3ViQ29udGV4dFZpZXdcclxuICogQGNsYXNzIFdYU3ViQ29udGV4dFZpZXdcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMVxyXG4gKi9cclxuY2MuV1hTdWJDb250ZXh0VmlldyA9IFN1YkNvbnRleHRWaWV3O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gU3dhblN1YkNvbnRleHRWaWV3IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuNC4xLCBwbGVhc2UgdXNlIFN1YkNvbnRleHRWaWV3IGluc3RlYWQuXHJcbiAqICEjemgg6IeqIHYyLjQuMSDotbfvvIxTd2FuU3ViQ29udGV4dFZpZXcg5bey57uP5bqf5byD77yM6K+35L2/55SoIFN1YkNvbnRleHRWaWV3XHJcbiAqIEBjbGFzcyBTd2FuU3ViQ29udGV4dFZpZXdcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjQuMVxyXG4gKi9cclxuY2MuU3dhblN1YkNvbnRleHRWaWV3ID0gU3ViQ29udGV4dFZpZXc7Il0sInNvdXJjZVJvb3QiOiIvIn0=