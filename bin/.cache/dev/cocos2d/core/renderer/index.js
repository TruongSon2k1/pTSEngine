
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _pass = _interopRequireDefault(require("../../renderer/core/pass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
// const RenderFlow = require('./render-flow');
function _initBuiltins(device) {
  var defaultTexture = new _gfx["default"].Texture2D(device, {
    images: [],
    width: 128,
    height: 128,
    wrapS: _gfx["default"].WRAP_REPEAT,
    wrapT: _gfx["default"].WRAP_REPEAT,
    format: _gfx["default"].TEXTURE_FMT_RGB8,
    genMipmaps: false
  });
  return {
    defaultTexture: defaultTexture,
    programTemplates: [],
    programChunks: {}
  };
}
/**
 * @module cc
 */

/**
 * !#en The renderer object which provide access to render system APIs, 
 * detailed APIs will be available progressively.
 * !#zh 提供基础渲染接口的渲染器对象，渲染层的基础接口将逐步开放给用户
 * @class renderer
 * @static
 */


var _default = cc.renderer = {
  Texture2D: null,
  InputAssembler: _inputAssembler["default"],
  Pass: _pass["default"],

  /**
   * !#en The render engine is available only after cc.game.EVENT_ENGINE_INITED event.<br/>
   * Normally it will be inited as the webgl render engine, but in wechat open context domain,
   * it will be inited as the canvas render engine. Canvas render engine is no longer available for other use case since v2.0.
   * !#zh 基础渲染引擎对象只在 cc.game.EVENT_ENGINE_INITED 事件触发后才可获取。<br/>
   * 大多数情况下，它都会是 WebGL 渲染引擎实例，但是在微信开放数据域当中，它会是 Canvas 渲染引擎实例。请注意，从 2.0 开始，我们在其他平台和环境下都废弃了 Canvas 渲染器。
   * @property renderEngine
   * @deprecated
   * @type {Object}
   */
  renderEngine: null,

  /*
   * !#en The canvas object which provides the rendering context
   * !#zh 用于渲染的 Canvas 对象
   * @property canvas
   * @type {HTMLCanvasElement}
   */
  canvas: null,

  /*
   * !#en The device object which provides device related rendering functionality, it divers for different render engine type.
   * !#zh 提供设备渲染能力的对象，它对于不同的渲染环境功能也不相同。
   * @property device
   * @type {renderer.Device}
   */
  device: null,
  scene: null,

  /**
   * !#en The total draw call count in last rendered frame.
   * !#zh 上一次渲染帧所提交的渲染批次总数。
   * @property drawCalls
   * @type {Number}
   */
  drawCalls: 0,
  // Render component handler
  _handle: null,
  _cameraNode: null,
  _camera: null,
  _forward: null,
  _flow: null,
  initWebGL: function initWebGL(canvas, opts) {
    require('./webgl/assemblers');

    var ModelBatcher = require('./webgl/model-batcher');

    this.Texture2D = _gfx["default"].Texture2D;
    this.canvas = canvas;
    this._flow = cc.RenderFlow;

    if (CC_JSB && CC_NATIVERENDERER) {
      // native codes will create an instance of Device, so just use the global instance.
      this.device = _gfx["default"].Device.getInstance();
      this.scene = new renderer.Scene();

      var builtins = _initBuiltins(this.device);

      this._forward = new renderer.ForwardRenderer(this.device, builtins);
      var nativeFlow = new renderer.RenderFlow(this.device, this.scene, this._forward);

      this._flow.init(nativeFlow);
    } else {
      var Scene = require('../../renderer/scene/scene');

      var ForwardRenderer = require('../../renderer/renderers/forward-renderer');

      this.device = new _gfx["default"].Device(canvas, opts);
      this.scene = new Scene();

      var _builtins = _initBuiltins(this.device);

      this._forward = new ForwardRenderer(this.device, _builtins);
      this._handle = new ModelBatcher(this.device, this.scene);

      this._flow.init(this._handle, this._forward);
    }
  },
  initCanvas: function initCanvas(canvas) {
    var canvasRenderer = require('./canvas');

    var Texture2D = require('./canvas/Texture2D');

    var Device = require('./canvas/Device'); // It's actually running with original render engine


    this.Device = Device;
    this.Texture2D = Texture2D;
    this.canvas = canvas;
    this.device = new Device(canvas);
    this._camera = {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0
    };
    this._handle = new canvasRenderer.RenderComponentHandle(this.device, this._camera);
    this._forward = new canvasRenderer.ForwardRenderer();
    this._flow = cc.RenderFlow;

    this._flow.init(this._handle, this._forward);
  },
  updateCameraViewport: function updateCameraViewport() {
    // TODO: remove HACK
    if (!CC_EDITOR && cc.director) {
      var ecScene = cc.director.getScene();
      if (ecScene) ecScene.setScale(1, 1, 1);
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      var vp = cc.view.getViewportRect();
      this.device.setViewport(vp.x, vp.y, vp.width, vp.height);
      this._camera.a = cc.view.getScaleX();
      this._camera.d = cc.view.getScaleY();
      this._camera.tx = vp.x;
      this._camera.ty = vp.y + vp.height;
    }
  },
  render: function render(ecScene, dt) {
    this.device.resetDrawCalls();

    if (ecScene) {
      // walk entity component scene to generate models
      this._flow.render(ecScene, dt);

      this.drawCalls = this.device.getDrawCalls();
    }
  },
  clear: function clear() {
    this._handle.reset();

    this._forward.clear();
  }
};

exports["default"] = _default;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJfaW5pdEJ1aWx0aW5zIiwiZGV2aWNlIiwiZGVmYXVsdFRleHR1cmUiLCJnZngiLCJUZXh0dXJlMkQiLCJpbWFnZXMiLCJ3aWR0aCIsImhlaWdodCIsIndyYXBTIiwiV1JBUF9SRVBFQVQiLCJ3cmFwVCIsImZvcm1hdCIsIlRFWFRVUkVfRk1UX1JHQjgiLCJnZW5NaXBtYXBzIiwicHJvZ3JhbVRlbXBsYXRlcyIsInByb2dyYW1DaHVua3MiLCJjYyIsInJlbmRlcmVyIiwiSW5wdXRBc3NlbWJsZXIiLCJQYXNzIiwicmVuZGVyRW5naW5lIiwiY2FudmFzIiwic2NlbmUiLCJkcmF3Q2FsbHMiLCJfaGFuZGxlIiwiX2NhbWVyYU5vZGUiLCJfY2FtZXJhIiwiX2ZvcndhcmQiLCJfZmxvdyIsImluaXRXZWJHTCIsIm9wdHMiLCJyZXF1aXJlIiwiTW9kZWxCYXRjaGVyIiwiUmVuZGVyRmxvdyIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiRGV2aWNlIiwiZ2V0SW5zdGFuY2UiLCJTY2VuZSIsImJ1aWx0aW5zIiwiRm9yd2FyZFJlbmRlcmVyIiwibmF0aXZlRmxvdyIsImluaXQiLCJpbml0Q2FudmFzIiwiY2FudmFzUmVuZGVyZXIiLCJhIiwiYiIsImMiLCJkIiwidHgiLCJ0eSIsIlJlbmRlckNvbXBvbmVudEhhbmRsZSIsInVwZGF0ZUNhbWVyYVZpZXdwb3J0IiwiQ0NfRURJVE9SIiwiZGlyZWN0b3IiLCJlY1NjZW5lIiwiZ2V0U2NlbmUiLCJzZXRTY2FsZSIsImdhbWUiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwidnAiLCJ2aWV3IiwiZ2V0Vmlld3BvcnRSZWN0Iiwic2V0Vmlld3BvcnQiLCJ4IiwieSIsImdldFNjYWxlWCIsImdldFNjYWxlWSIsInJlbmRlciIsImR0IiwicmVzZXREcmF3Q2FsbHMiLCJnZXREcmF3Q2FsbHMiLCJj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RSxDQUFDSSxDQUEzQixFQUE4QkosRUFBRSxDQUFDSyxDQUFqQyxFQUFvQ0wsRUFBRSxDQUFDdkQsS0FBdkMsRUFBOEN1RCxFQUFFLENBQUN0RCxNQUFqRDtBQUNBLFdBQUttQixPQUFMLENBQWFtQixDQUFiLEdBQWlCN0IsRUFBRSxDQUFDOEMsSUFBSCxDQUFRSyxTQUFSLEVBQWpCO0FBQ0EsV0FBS3pDLE9BQUwsQ0FBYXNCLENBQWIsR0FBaUJoQyxFQUFFLENBQUM4QyxJQUFILENBQVFNLFNBQVIsRUFBakI7QUFDQSxXQUFLMUMsT0FBTCxDQUFhdUIsRUFBYixHQUFrQlksRUFBRSxDQUFDSSxDQUFyQjtBQUNBLFdBQUt2QyxPQUFMLENBQWF3QixFQUFiLEdBQWtCVyxFQUFFLENBQUNLLENBQUgsR0FBT0wsRUFBRSxDQUFDdEQsTUFBNUI7QUFDSDtBQUNKLEdBaEh3QjtBQWtIekI4RCxFQUFBQSxNQWxIeUIsa0JBa0hqQmQsT0FsSGlCLEVBa0hSZSxFQWxIUSxFQWtISjtBQUNqQixTQUFLckUsTUFBTCxDQUFZc0UsY0FBWjs7QUFDQSxRQUFJaEIsT0FBSixFQUFhO0FBQ1Q7QUFDQSxXQUFLM0IsS0FBTCxDQUFXeUMsTUFBWCxDQUFrQmQsT0FBbEIsRUFBMkJlLEVBQTNCOztBQUNBLFdBQUsvQyxTQUFMLEdBQWlCLEtBQUt0QixNQUFMLENBQVl1RSxZQUFaLEVBQWpCO0FBQ0g7QUFDSixHQXpId0I7QUEySHpCQyxFQUFBQSxLQTNIeUIsbUJBMkhoQjtBQUNMLFNBQUtqRCxPQUFMLENBQWFrRCxLQUFiOztBQUNBLFNBQUsvQyxRQUFMLENBQWM4QyxLQUFkO0FBQ0g7QUE5SHdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcclxuXHJcbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XHJcbmltcG9ydCBQYXNzIGZyb20gJy4uLy4uL3JlbmRlcmVyL2NvcmUvcGFzcyc7XHJcblxyXG4vLyBjb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi9yZW5kZXItZmxvdycpO1xyXG5cclxuZnVuY3Rpb24gX2luaXRCdWlsdGlucyhkZXZpY2UpIHtcclxuICAgIGxldCBkZWZhdWx0VGV4dHVyZSA9IG5ldyBnZnguVGV4dHVyZTJEKGRldmljZSwge1xyXG4gICAgICAgIGltYWdlczogW10sXHJcbiAgICAgICAgd2lkdGg6IDEyOCxcclxuICAgICAgICBoZWlnaHQ6IDEyOCxcclxuICAgICAgICB3cmFwUzogZ2Z4LldSQVBfUkVQRUFULFxyXG4gICAgICAgIHdyYXBUOiBnZnguV1JBUF9SRVBFQVQsXHJcbiAgICAgICAgZm9ybWF0OiBnZnguVEVYVFVSRV9GTVRfUkdCOCxcclxuICAgICAgICBnZW5NaXBtYXBzOiBmYWxzZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVmYXVsdFRleHR1cmU6IGRlZmF1bHRUZXh0dXJlLFxyXG4gICAgICAgIHByb2dyYW1UZW1wbGF0ZXM6IFtdLFxyXG4gICAgICAgIHByb2dyYW1DaHVua3M6IHt9LFxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgcmVuZGVyZXIgb2JqZWN0IHdoaWNoIHByb3ZpZGUgYWNjZXNzIHRvIHJlbmRlciBzeXN0ZW0gQVBJcywgXHJcbiAqIGRldGFpbGVkIEFQSXMgd2lsbCBiZSBhdmFpbGFibGUgcHJvZ3Jlc3NpdmVseS5cclxuICogISN6aCDmj5Dkvpvln7rnoYDmuLLmn5PmjqXlj6PnmoTmuLLmn5Plmajlr7nosaHvvIzmuLLmn5PlsYLnmoTln7rnoYDmjqXlj6PlsIbpgJDmraXlvIDmlL7nu5nnlKjmiLdcclxuICogQGNsYXNzIHJlbmRlcmVyXHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNjLnJlbmRlcmVyID0ge1xyXG4gICAgVGV4dHVyZTJEOiBudWxsLFxyXG5cclxuICAgIElucHV0QXNzZW1ibGVyOiBJbnB1dEFzc2VtYmxlcixcclxuICAgIFBhc3M6IFBhc3MsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSByZW5kZXIgZW5naW5lIGlzIGF2YWlsYWJsZSBvbmx5IGFmdGVyIGNjLmdhbWUuRVZFTlRfRU5HSU5FX0lOSVRFRCBldmVudC48YnIvPlxyXG4gICAgICogTm9ybWFsbHkgaXQgd2lsbCBiZSBpbml0ZWQgYXMgdGhlIHdlYmdsIHJlbmRlciBlbmdpbmUsIGJ1dCBpbiB3ZWNoYXQgb3BlbiBjb250ZXh0IGRvbWFpbixcclxuICAgICAqIGl0IHdpbGwgYmUgaW5pdGVkIGFzIHRoZSBjYW52YXMgcmVuZGVyIGVuZ2luZS4gQ2FudmFzIHJlbmRlciBlbmdpbmUgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZSBmb3Igb3RoZXIgdXNlIGNhc2Ugc2luY2UgdjIuMC5cclxuICAgICAqICEjemgg5Z+656GA5riy5p+T5byV5pOO5a+56LGh5Y+q5ZyoIGNjLmdhbWUuRVZFTlRfRU5HSU5FX0lOSVRFRCDkuovku7bop6blj5HlkI7miY3lj6/ojrflj5bjgII8YnIvPlxyXG4gICAgICog5aSn5aSa5pWw5oOF5Ya15LiL77yM5a6D6YO95Lya5pivIFdlYkdMIOa4suafk+W8leaTjuWunuS+i++8jOS9huaYr+WcqOW+ruS/oeW8gOaUvuaVsOaNruWfn+W9k+S4re+8jOWug+S8muaYryBDYW52YXMg5riy5p+T5byV5pOO5a6e5L6L44CC6K+35rOo5oSP77yM5LuOIDIuMCDlvIDlp4vvvIzmiJHku6zlnKjlhbbku5blubPlj7Dlkoznjq/looPkuIvpg73lup/lvIPkuoYgQ2FudmFzIOa4suafk+WZqOOAglxyXG4gICAgICogQHByb3BlcnR5IHJlbmRlckVuZ2luZVxyXG4gICAgICogQGRlcHJlY2F0ZWRcclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIHJlbmRlckVuZ2luZTogbnVsbCxcclxuXHJcbiAgICAvKlxyXG4gICAgICogISNlbiBUaGUgY2FudmFzIG9iamVjdCB3aGljaCBwcm92aWRlcyB0aGUgcmVuZGVyaW5nIGNvbnRleHRcclxuICAgICAqICEjemgg55So5LqO5riy5p+T55qEIENhbnZhcyDlr7nosaFcclxuICAgICAqIEBwcm9wZXJ0eSBjYW52YXNcclxuICAgICAqIEB0eXBlIHtIVE1MQ2FudmFzRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgY2FudmFzOiBudWxsLFxyXG4gICAgLypcclxuICAgICAqICEjZW4gVGhlIGRldmljZSBvYmplY3Qgd2hpY2ggcHJvdmlkZXMgZGV2aWNlIHJlbGF0ZWQgcmVuZGVyaW5nIGZ1bmN0aW9uYWxpdHksIGl0IGRpdmVycyBmb3IgZGlmZmVyZW50IHJlbmRlciBlbmdpbmUgdHlwZS5cclxuICAgICAqICEjemgg5o+Q5L6b6K6+5aSH5riy5p+T6IO95Yqb55qE5a+56LGh77yM5a6D5a+55LqO5LiN5ZCM55qE5riy5p+T546v5aKD5Yqf6IO95Lmf5LiN55u45ZCM44CCXHJcbiAgICAgKiBAcHJvcGVydHkgZGV2aWNlXHJcbiAgICAgKiBAdHlwZSB7cmVuZGVyZXIuRGV2aWNlfVxyXG4gICAgICovXHJcbiAgICBkZXZpY2U6IG51bGwsXHJcbiAgICBzY2VuZTogbnVsbCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdG90YWwgZHJhdyBjYWxsIGNvdW50IGluIGxhc3QgcmVuZGVyZWQgZnJhbWUuXHJcbiAgICAgKiAhI3poIOS4iuS4gOasoea4suafk+W4p+aJgOaPkOS6pOeahOa4suafk+aJueasoeaAu+aVsOOAglxyXG4gICAgICogQHByb3BlcnR5IGRyYXdDYWxsc1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZHJhd0NhbGxzOiAwLFxyXG4gICAgLy8gUmVuZGVyIGNvbXBvbmVudCBoYW5kbGVyXHJcbiAgICBfaGFuZGxlOiBudWxsLFxyXG4gICAgX2NhbWVyYU5vZGU6IG51bGwsXHJcbiAgICBfY2FtZXJhOiBudWxsLFxyXG4gICAgX2ZvcndhcmQ6IG51bGwsXHJcbiAgICBfZmxvdzogbnVsbCxcclxuXHJcbiAgICBpbml0V2ViR0wgKGNhbnZhcywgb3B0cykge1xyXG4gICAgICAgIHJlcXVpcmUoJy4vd2ViZ2wvYXNzZW1ibGVycycpO1xyXG4gICAgICAgIGNvbnN0IE1vZGVsQmF0Y2hlciA9IHJlcXVpcmUoJy4vd2ViZ2wvbW9kZWwtYmF0Y2hlcicpO1xyXG5cclxuICAgICAgICB0aGlzLlRleHR1cmUyRCA9IGdmeC5UZXh0dXJlMkQ7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5fZmxvdyA9IGNjLlJlbmRlckZsb3c7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgICAgICAvLyBuYXRpdmUgY29kZXMgd2lsbCBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgRGV2aWNlLCBzbyBqdXN0IHVzZSB0aGUgZ2xvYmFsIGluc3RhbmNlLlxyXG4gICAgICAgICAgICB0aGlzLmRldmljZSA9IGdmeC5EZXZpY2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyByZW5kZXJlci5TY2VuZSgpO1xyXG4gICAgICAgICAgICBsZXQgYnVpbHRpbnMgPSBfaW5pdEJ1aWx0aW5zKHRoaXMuZGV2aWNlKTtcclxuICAgICAgICAgICAgdGhpcy5fZm9yd2FyZCA9IG5ldyByZW5kZXJlci5Gb3J3YXJkUmVuZGVyZXIodGhpcy5kZXZpY2UsIGJ1aWx0aW5zKTtcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZUZsb3cgPSBuZXcgcmVuZGVyZXIuUmVuZGVyRmxvdyh0aGlzLmRldmljZSwgdGhpcy5zY2VuZSwgdGhpcy5fZm9yd2FyZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Zsb3cuaW5pdChuYXRpdmVGbG93KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBTY2VuZSA9IHJlcXVpcmUoJy4uLy4uL3JlbmRlcmVyL3NjZW5lL3NjZW5lJyk7XHJcbiAgICAgICAgICAgIGxldCBGb3J3YXJkUmVuZGVyZXIgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9yZW5kZXJlcnMvZm9yd2FyZC1yZW5kZXJlcicpO1xyXG4gICAgICAgICAgICB0aGlzLmRldmljZSA9IG5ldyBnZnguRGV2aWNlKGNhbnZhcywgb3B0cyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgU2NlbmUoKTtcclxuICAgICAgICAgICAgbGV0IGJ1aWx0aW5zID0gX2luaXRCdWlsdGlucyh0aGlzLmRldmljZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvcndhcmQgPSBuZXcgRm9yd2FyZFJlbmRlcmVyKHRoaXMuZGV2aWNlLCBidWlsdGlucyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZSA9IG5ldyBNb2RlbEJhdGNoZXIodGhpcy5kZXZpY2UsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgICB0aGlzLl9mbG93LmluaXQodGhpcy5faGFuZGxlLCB0aGlzLl9mb3J3YXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXRDYW52YXMgKGNhbnZhcykge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhc1JlbmRlcmVyID0gcmVxdWlyZSgnLi9jYW52YXMnKTtcclxuICAgICAgICBjb25zdCBUZXh0dXJlMkQgPSByZXF1aXJlKCcuL2NhbnZhcy9UZXh0dXJlMkQnKTtcclxuICAgICAgICBjb25zdCBEZXZpY2UgPSByZXF1aXJlKCcuL2NhbnZhcy9EZXZpY2UnKTtcclxuXHJcbiAgICAgICAgLy8gSXQncyBhY3R1YWxseSBydW5uaW5nIHdpdGggb3JpZ2luYWwgcmVuZGVyIGVuZ2luZVxyXG4gICAgICAgIHRoaXMuRGV2aWNlID0gRGV2aWNlO1xyXG5cclxuICAgICAgICB0aGlzLlRleHR1cmUyRCA9IFRleHR1cmUyRDtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5kZXZpY2UgPSBuZXcgRGV2aWNlKGNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhID0ge1xyXG4gICAgICAgICAgICBhOiAxLCBiOiAwLCBjOiAwLCBkOiAxLCB0eDogMCwgdHk6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZSA9IG5ldyBjYW52YXNSZW5kZXJlci5SZW5kZXJDb21wb25lbnRIYW5kbGUodGhpcy5kZXZpY2UsIHRoaXMuX2NhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5fZm9yd2FyZCA9IG5ldyBjYW52YXNSZW5kZXJlci5Gb3J3YXJkUmVuZGVyZXIoKTtcclxuICAgICAgICB0aGlzLl9mbG93ID0gY2MuUmVuZGVyRmxvdztcclxuICAgICAgICB0aGlzLl9mbG93LmluaXQodGhpcy5faGFuZGxlLCB0aGlzLl9mb3J3YXJkKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlQ2FtZXJhVmlld3BvcnQgKCkge1xyXG4gICAgICAgIC8vIFRPRE86IHJlbW92ZSBIQUNLXHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgY2MuZGlyZWN0b3IpIHtcclxuICAgICAgICAgICAgbGV0IGVjU2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICBpZiAoZWNTY2VuZSkgZWNTY2VuZS5zZXRTY2FsZSgxLCAxLCAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgICAgICAgIGxldCB2cCA9IGNjLnZpZXcuZ2V0Vmlld3BvcnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlLnNldFZpZXdwb3J0KHZwLngsIHZwLnksIHZwLndpZHRoLCB2cC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuYSA9IGNjLnZpZXcuZ2V0U2NhbGVYKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYS5kID0gY2Mudmlldy5nZXRTY2FsZVkoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnR4ID0gdnAueDtcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnR5ID0gdnAueSArIHZwLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlciAoZWNTY2VuZSwgZHQpIHtcclxuICAgICAgICB0aGlzLmRldmljZS5yZXNldERyYXdDYWxscygpO1xyXG4gICAgICAgIGlmIChlY1NjZW5lKSB7XHJcbiAgICAgICAgICAgIC8vIHdhbGsgZW50aXR5IGNvbXBvbmVudCBzY2VuZSB0byBnZW5lcmF0ZSBtb2RlbHNcclxuICAgICAgICAgICAgdGhpcy5fZmxvdy5yZW5kZXIoZWNTY2VuZSwgZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdDYWxscyA9IHRoaXMuZGV2aWNlLmdldERyYXdDYWxscygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXIgKCkge1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX2ZvcndhcmQuY2xlYXIoKTtcclxuICAgIH1cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=