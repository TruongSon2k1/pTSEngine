
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/model-batcher.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _inputAssembler = _interopRequireDefault(require("../../../renderer/core/input-assembler"));

var _recyclePool = _interopRequireDefault(require("../../../renderer/memop/recycle-pool"));

var _model = _interopRequireDefault(require("../../../renderer/scene/model"));

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
var _require = require('./vertex-format'),
    vfmtPosUvColor = _require.vfmtPosUvColor,
    vfmt3D = _require.vfmt3D;

var QuadBuffer = require('./quad-buffer');

var MeshBuffer = require('./mesh-buffer');

var SpineBuffer = require('./spine-buffer');

var Material = require('../../assets/material/CCMaterial');

var idGenerater = new (require('../../platform/id-generater'))('VertextFormat');
var _buffers = {};
var empty_material = new Material();
var empty_ia = new _inputAssembler["default"]();
empty_ia._count = 0;

var ModelBatcher = function ModelBatcher(device, renderScene) {
  this._renderScene = renderScene;
  this._device = device;
  this.walking = false;
  this.material = empty_material;
  this.cullingMask = 1;
  this._iaPool = new _recyclePool["default"](function () {
    return new _inputAssembler["default"]();
  }, 16);
  this._modelPool = new _recyclePool["default"](function () {
    return new _model["default"]();
  }, 16); // buffers

  this._quadBuffer = this.getBuffer('quad', vfmtPosUvColor);
  this._meshBuffer = this.getBuffer('mesh', vfmtPosUvColor);
  this._quadBuffer3D = this.getBuffer('quad', vfmt3D);
  this._meshBuffer3D = this.getBuffer('mesh', vfmt3D);
  this._buffer = this._meshBuffer;
  this._batchedModels = [];
  this._dummyNode = new cc.Node();
  this._sortKey = 0;
  this.node = this._dummyNode;
  this.parentOpacity = 1;
  this.parentOpacityDirty = 0;
  this.worldMatDirty = 0;
};

ModelBatcher.prototype = {
  constructor: ModelBatcher,
  reset: function reset() {
    // Reset pools
    this._iaPool.reset(); // Reset scene


    var scene = this._renderScene;
    var models = this._batchedModels;

    for (var i = 0; i < models.length; ++i) {
      // remove from scene
      // models[i].clearInputAssemblers();
      // models[i].clearEffects();
      models[i].setInputAssembler(null);
      models[i].setEffect(null);
      scene.removeModel(models[i]);
    }

    this._modelPool.reset();

    models.length = 0;
    this._sortKey = 0;

    for (var key in _buffers) {
      _buffers[key].reset();
    }

    this._buffer = this._meshBuffer; // reset caches for handle render components

    this.node = this._dummyNode;
    this.material = empty_material;
    this.cullingMask = 1;
    this.parentOpacity = 1;
    this.parentOpacityDirty = 0;
    this.worldMatDirty = 0;
  },
  _flushMaterial: function _flushMaterial(material) {
    if (!material) {
      return;
    }

    this.material = material;
    var effect = material.effect;
    if (!effect) return; // Generate model

    var model = this._modelPool.add();

    this._batchedModels.push(model);

    model.sortKey = this._sortKey++;
    model._cullingMask = this.cullingMask;
    model.setNode(this.node);
    model.setEffect(effect, null);
    model.setInputAssembler(empty_ia);

    this._renderScene.addModel(model);
  },
  _flush: function _flush() {
    var material = this.material,
        buffer = this._buffer,
        indiceCount = buffer.indiceOffset - buffer.indiceStart;

    if (!this.walking || !material || indiceCount <= 0) {
      return;
    }

    var effect = material.effect;
    if (!effect) return; // Generate ia

    var ia = this._iaPool.add();

    ia._vertexBuffer = buffer._vb;
    ia._indexBuffer = buffer._ib;
    ia._start = buffer.indiceStart;
    ia._count = indiceCount; // Generate model

    var model = this._modelPool.add();

    this._batchedModels.push(model);

    model.sortKey = this._sortKey++;
    model._cullingMask = this.cullingMask;
    model.setNode(this.node);
    model.setEffect(effect);
    model.setInputAssembler(ia);

    this._renderScene.addModel(model);

    buffer.forwardIndiceStartToOffset();
  },
  _flushIA: function _flushIA(ia) {
    if (!ia) {
      return;
    }

    var material = this.material;
    var effect = material.effect;
    if (!effect) return; // Generate model

    var model = this._modelPool.add();

    this._batchedModels.push(model);

    model.sortKey = this._sortKey++;
    model._cullingMask = this.cullingMask;
    model.setNode(this.node);
    model.setEffect(effect);
    model.setInputAssembler(ia);

    this._renderScene.addModel(model);
  },
  terminate: function terminate() {
    if (cc.dynamicAtlasManager && cc.dynamicAtlasManager.enabled) {
      cc.dynamicAtlasManager.update();
    } // flush current rest Model


    this._flush();

    for (var key in _buffers) {
      _buffers[key].uploadData();
    }

    this.walking = false;
  },
  getBuffer: function getBuffer(type, vertextFormat) {
    var key = type + vertextFormat.getHash();
    var buffer = _buffers[key];

    if (!buffer) {
      if (type === 'mesh') {
        buffer = new MeshBuffer(this, vertextFormat);
      } else if (type === 'quad') {
        buffer = new QuadBuffer(this, vertextFormat);
      } else if (type === 'spine') {
        buffer = new SpineBuffer(this, vertextFormat);
      } else {
        cc.error("Not support buffer type [" + type + "]");
        return null;
      }

      _buffers[key] = buffer;
    }

    return buffer;
  }
};
module.exports = ModelBatcher;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcbW9kZWwtYmF0Y2hlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidmZtdFBvc1V2Q29sb3IiLCJ2Zm10M0QiLCJRdWFkQnVmZmVyIiwiTWVzaEJ1ZmZlciIsIlNwaW5lQnVmZmVyIiwiTWF0ZXJpYWwiLCJpZEdlbmVyYXRlciIsIl9idWZmZXJzIiwiZW1wdHlfbWF0ZXJpYWwiLCJlbXB0eV9pYSIsIklucHV0QXNzZW1ibGVyIiwiX2NvdW50IiwiTW9kZWxCYXRjaGVyIiwiZGV2aWNlIiwicmVuZGVyU2NlbmUiLCJfcmVuZGVyU2NlbmUiLCJfZGV2aWNlIiwid2Fsa2luZyIsIm1hdGVyaWFsIiwiY3VsbGluZ01hc2siLCJfaWFQb29sIiwiUmVjeWNsZVBvb2wiLCJfbW9kZWxQb29sIiwiTW9kZWwiLCJfcXVhZEJ1ZmZlciIsImdldEJ1ZmZlciIsIl9tZXNoQnVmZmVyIiwiX3F1YWRCdWZmZXIzRCIsIl9tZXNoQnVmZmVyM0QiLCJfYnVmZmVyIiwiX2JhdGNoZWRNb2RlbHMiLCJfZHVtbXlOb2RlIiwiY2MiLCJOb2RlIiwiX3NvcnRLZXkiLCJub2RlIiwicGFyZW50T3BhY2l0eSIsInBhcmVudE9wYWNpdHlEaXJ0eSIsIndvcmxkTWF0RGlydHkiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInJlc2V0Iiwic2NlbmUiLCJtb2RlbHMiLCJpIiwibGVuZ3RoIiwic2V0SW5wdXRBc3NlbWJsZXIiLCJzZXRFZmZlY3QiLCJyZW1vdmVNb2RlbCIsImtleSIsIl9mbHVzaE1hdGVyaWFsIiwiZWZmZWN0IiwibW9kZWwiLCJhZGQiLCJwdXNoIiwic29ydEtleSIsIl9jdWxsaW5nTWFzayIsInNldE5vZGUiLCJhZGRNb2RlbCIsIl9mbHVzaCIsImJ1ZmZlciIsImluZGljZUNvdW50IiwiaW5kaWNlT2Zmc2V0IiwiaW5kaWNlU3RhcnQiLCJpYSIsIl92ZXJ0ZXhCdWZmZXIiLCJfdmIiLCJfaW5kZXhCdWZmZXIiLCJfaWIiLCJfc3RhcnQiLCJmb3J3YXJkSW5kaWNlU3RhcnRUb09mZnNldCIsIl9mbHVzaElBIiwidGVybWluYXRlIiwiZHluYW1pY0F0bGFzTWFuYWdlciIsImVuYWJsZWQiLCJ1cGRhdGUiLCJ1cGxvYWREYXRhIiwidHlwZSIsInZlcnRleHRGb3JtYXQiLCJnZXRIYXNoIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBaUNBOztBQUNBOztBQUNBOzs7O0FBbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtlQUVtQ0EsT0FBTyxDQUFDLGlCQUFEO0lBQWxDQywwQkFBQUE7SUFBZ0JDLGtCQUFBQTs7QUFDeEIsSUFBTUMsVUFBVSxHQUFHSCxPQUFPLENBQUMsZUFBRCxDQUExQjs7QUFDQSxJQUFNSSxVQUFVLEdBQUdKLE9BQU8sQ0FBQyxlQUFELENBQTFCOztBQUNBLElBQU1LLFdBQVcsR0FBR0wsT0FBTyxDQUFDLGdCQUFELENBQTNCOztBQUNBLElBQU1NLFFBQVEsR0FBR04sT0FBTyxDQUFDLGtDQUFELENBQXhCOztBQUVBLElBQUlPLFdBQVcsR0FBRyxLQUFLUCxPQUFPLENBQUMsNkJBQUQsQ0FBWixFQUE2QyxlQUE3QyxDQUFsQjtBQU1BLElBQUlRLFFBQVEsR0FBRyxFQUFmO0FBRUEsSUFBTUMsY0FBYyxHQUFHLElBQUlILFFBQUosRUFBdkI7QUFDQSxJQUFNSSxRQUFRLEdBQUcsSUFBSUMsMEJBQUosRUFBakI7QUFDQUQsUUFBUSxDQUFDRSxNQUFULEdBQWtCLENBQWxCOztBQUVBLElBQUlDLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQVVDLE1BQVYsRUFBa0JDLFdBQWxCLEVBQStCO0FBQzlDLE9BQUtDLFlBQUwsR0FBb0JELFdBQXBCO0FBQ0EsT0FBS0Us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QXFCMkUsYUFBckIsQ0FBVDtBQUNILE9BRkQsTUFHSyxJQUFJRCxJQUFJLEtBQUssTUFBYixFQUFxQjtBQUN0QmpCLFFBQUFBLE1BQU0sR0FBRyxJQUFJMUQsVUFBSixDQUFlLElBQWYsRUFBcUI0RSxhQUFyQixDQUFUO0FBQ0gsT0FGSSxNQUdBLElBQUlELElBQUksS0FBSyxPQUFiLEVBQXNCO0FBQ3ZCakIsUUFBQUEsTUFBTSxHQUFHLElBQUl4RCxXQUFKLENBQWdCLElBQWhCLEVBQXNCMEUsYUFBdEIsQ0FBVDtBQUNILE9BRkksTUFHQTtBQUNEOUMsUUFBQUEsRUFBRSxDQUFDZ0QsS0FBSCwrQkFBcUNILElBQXJDO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUR0RSxNQUFBQSxRQUFRLENBQUMwQyxHQUFELENBQVIsR0FBZ0JXLE1BQWhCO0FBQ0g7O0FBRUQsV0FBT0EsTUFBUDtBQUNIO0FBbEpvQixDQUF6QjtBQXFKQXFCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRFLFlBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCB7IHZmbXRQb3NVdkNvbG9yLCB2Zm10M0QgfSA9IHJlcXVpcmUoJy4vdmVydGV4LWZvcm1hdCcpO1xyXG5jb25zdCBRdWFkQnVmZmVyID0gcmVxdWlyZSgnLi9xdWFkLWJ1ZmZlcicpO1xyXG5jb25zdCBNZXNoQnVmZmVyID0gcmVxdWlyZSgnLi9tZXNoLWJ1ZmZlcicpO1xyXG5jb25zdCBTcGluZUJ1ZmZlciA9IHJlcXVpcmUoJy4vc3BpbmUtYnVmZmVyJyk7XHJcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vLi4vYXNzZXRzL21hdGVyaWFsL0NDTWF0ZXJpYWwnKTtcclxuXHJcbmxldCBpZEdlbmVyYXRlciA9IG5ldyAocmVxdWlyZSgnLi4vLi4vcGxhdGZvcm0vaWQtZ2VuZXJhdGVyJykpKCdWZXJ0ZXh0Rm9ybWF0Jyk7XHJcblxyXG5pbXBvcnQgSW5wdXRBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vcmVuZGVyZXIvY29yZS9pbnB1dC1hc3NlbWJsZXInO1xyXG5pbXBvcnQgUmVjeWNsZVBvb2wgZnJvbSAnLi4vLi4vLi4vcmVuZGVyZXIvbWVtb3AvcmVjeWNsZS1wb29sJztcclxuaW1wb3J0IE1vZGVsIGZyb20gJy4uLy4uLy4uL3JlbmRlcmVyL3NjZW5lL21vZGVsJztcclxuXHJcbmxldCBfYnVmZmVycyA9IHt9O1xyXG5cclxuY29uc3QgZW1wdHlfbWF0ZXJpYWwgPSBuZXcgTWF0ZXJpYWwoKTtcclxuY29uc3QgZW1wdHlfaWEgPSBuZXcgSW5wdXRBc3NlbWJsZXIoKTtcclxuZW1wdHlfaWEuX2NvdW50ID0gMDtcclxuXHJcbnZhciBNb2RlbEJhdGNoZXIgPSBmdW5jdGlvbiAoZGV2aWNlLCByZW5kZXJTY2VuZSkge1xyXG4gICAgdGhpcy5fcmVuZGVyU2NlbmUgPSByZW5kZXJTY2VuZTtcclxuICAgIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuXHJcbiAgICB0aGlzLndhbGtpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMubWF0ZXJpYWwgPSBlbXB0eV9tYXRlcmlhbDtcclxuICAgIHRoaXMuY3VsbGluZ01hc2sgPSAxO1xyXG5cclxuICAgIHRoaXMuX2lhUG9vbCA9IG5ldyBSZWN5Y2xlUG9vbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbnB1dEFzc2VtYmxlcigpO1xyXG4gICAgfSwgMTYpO1xyXG5cclxuICAgIHRoaXMuX21vZGVsUG9vbCA9IG5ldyBSZWN5Y2xlUG9vbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNb2RlbCgpO1xyXG4gICAgfSwgMTYpO1xyXG5cclxuICAgIC8vIGJ1ZmZlcnNcclxuICAgIHRoaXMuX3F1YWRCdWZmZXIgPSB0aGlzLmdldEJ1ZmZlcigncXVhZCcsIHZmbXRQb3NVdkNvbG9yKTtcclxuICAgIHRoaXMuX21lc2hCdWZmZXIgPSB0aGlzLmdldEJ1ZmZlcignbWVzaCcsIHZmbXRQb3NVdkNvbG9yKTtcclxuICAgIHRoaXMuX3F1YWRCdWZmZXIzRCA9IHRoaXMuZ2V0QnVmZmVyKCdxdWFkJywgdmZtdDNEKTtcclxuICAgIHRoaXMuX21lc2hCdWZmZXIzRCA9IHRoaXMuZ2V0QnVmZmVyKCdtZXNoJywgdmZtdDNEKTtcclxuICAgIHRoaXMuX2J1ZmZlciA9IHRoaXMuX21lc2hCdWZmZXI7XHJcblxyXG4gICAgdGhpcy5fYmF0Y2hlZE1vZGVscyA9IFtdO1xyXG4gICAgdGhpcy5fZHVtbXlOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgIHRoaXMuX3NvcnRLZXkgPSAwO1xyXG5cclxuICAgIHRoaXMubm9kZSA9IHRoaXMuX2R1bW15Tm9kZTtcclxuICAgIFxyXG4gICAgdGhpcy5wYXJlbnRPcGFjaXR5ID0gMTtcclxuICAgIHRoaXMucGFyZW50T3BhY2l0eURpcnR5ID0gMDtcclxuICAgIHRoaXMud29ybGRNYXREaXJ0eSA9IDA7XHJcbn07XHJcblxyXG5Nb2RlbEJhdGNoZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IE1vZGVsQmF0Y2hlcixcclxuICAgIFxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgcG9vbHNcclxuICAgICAgICB0aGlzLl9pYVBvb2wucmVzZXQoKTtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgc2NlbmVcclxuICAgICAgICBsZXQgc2NlbmUgPSB0aGlzLl9yZW5kZXJTY2VuZTtcclxuICAgICAgICBsZXQgbW9kZWxzID0gdGhpcy5fYmF0Y2hlZE1vZGVscztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGVscy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBzY2VuZVxyXG4gICAgICAgICAgICAvLyBtb2RlbHNbaV0uY2xlYXJJbnB1dEFzc2VtYmxlcnMoKTtcclxuICAgICAgICAgICAgLy8gbW9kZWxzW2ldLmNsZWFyRWZmZWN0cygpO1xyXG4gICAgICAgICAgICBtb2RlbHNbaV0uc2V0SW5wdXRBc3NlbWJsZXIobnVsbCk7XHJcbiAgICAgICAgICAgIG1vZGVsc1tpXS5zZXRFZmZlY3QobnVsbCk7XHJcbiAgICAgICAgICAgIHNjZW5lLnJlbW92ZU1vZGVsKG1vZGVsc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vZGVsUG9vbC5yZXNldCgpO1xyXG4gICAgICAgIG1vZGVscy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3NvcnRLZXkgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gX2J1ZmZlcnMpIHtcclxuICAgICAgICAgICAgX2J1ZmZlcnNba2V5XS5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9idWZmZXIgPSB0aGlzLl9tZXNoQnVmZmVyO1xyXG5cclxuICAgICAgICAvLyByZXNldCBjYWNoZXMgZm9yIGhhbmRsZSByZW5kZXIgY29tcG9uZW50c1xyXG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMuX2R1bW15Tm9kZTtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsID0gZW1wdHlfbWF0ZXJpYWw7XHJcbiAgICAgICAgdGhpcy5jdWxsaW5nTWFzayA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50T3BhY2l0eSA9IDE7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRPcGFjaXR5RGlydHkgPSAwO1xyXG4gICAgICAgIHRoaXMud29ybGRNYXREaXJ0eSA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9mbHVzaE1hdGVyaWFsIChtYXRlcmlhbCkge1xyXG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgbGV0IGVmZmVjdCA9IG1hdGVyaWFsLmVmZmVjdDtcclxuICAgICAgICBpZiAoIWVmZmVjdCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdlbmVyYXRlIG1vZGVsXHJcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fbW9kZWxQb29sLmFkZCgpO1xyXG4gICAgICAgIHRoaXMuX2JhdGNoZWRNb2RlbHMucHVzaChtb2RlbCk7XHJcbiAgICAgICAgbW9kZWwuc29ydEtleSA9IHRoaXMuX3NvcnRLZXkrKztcclxuICAgICAgICBtb2RlbC5fY3VsbGluZ01hc2sgPSB0aGlzLmN1bGxpbmdNYXNrO1xyXG4gICAgICAgIG1vZGVsLnNldE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICBtb2RlbC5zZXRFZmZlY3QoZWZmZWN0LCBudWxsKTtcclxuICAgICAgICBtb2RlbC5zZXRJbnB1dEFzc2VtYmxlcihlbXB0eV9pYSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyU2NlbmUuYWRkTW9kZWwobW9kZWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZmx1c2ggKCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWwsXHJcbiAgICAgICAgICAgIGJ1ZmZlciA9IHRoaXMuX2J1ZmZlcixcclxuICAgICAgICAgICAgaW5kaWNlQ291bnQgPSBidWZmZXIuaW5kaWNlT2Zmc2V0IC0gYnVmZmVyLmluZGljZVN0YXJ0O1xyXG4gICAgICAgIGlmICghdGhpcy53YWxraW5nIHx8ICFtYXRlcmlhbCB8fCBpbmRpY2VDb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlZmZlY3QgPSBtYXRlcmlhbC5lZmZlY3Q7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZW5lcmF0ZSBpYVxyXG4gICAgICAgIGxldCBpYSA9IHRoaXMuX2lhUG9vbC5hZGQoKTtcclxuICAgICAgICBpYS5fdmVydGV4QnVmZmVyID0gYnVmZmVyLl92YjtcclxuICAgICAgICBpYS5faW5kZXhCdWZmZXIgPSBidWZmZXIuX2liO1xyXG4gICAgICAgIGlhLl9zdGFydCA9IGJ1ZmZlci5pbmRpY2VTdGFydDtcclxuICAgICAgICBpYS5fY291bnQgPSBpbmRpY2VDb3VudDtcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZW5lcmF0ZSBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVsUG9vbC5hZGQoKTtcclxuICAgICAgICB0aGlzLl9iYXRjaGVkTW9kZWxzLnB1c2gobW9kZWwpO1xyXG4gICAgICAgIG1vZGVsLnNvcnRLZXkgPSB0aGlzLl9zb3J0S2V5Kys7XHJcbiAgICAgICAgbW9kZWwuX2N1bGxpbmdNYXNrID0gdGhpcy5jdWxsaW5nTWFzaztcclxuICAgICAgICBtb2RlbC5zZXROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgbW9kZWwuc2V0RWZmZWN0KGVmZmVjdCk7XHJcbiAgICAgICAgbW9kZWwuc2V0SW5wdXRBc3NlbWJsZXIoaWEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JlbmRlclNjZW5lLmFkZE1vZGVsKG1vZGVsKTtcclxuICAgICAgICBidWZmZXIuZm9yd2FyZEluZGljZVN0YXJ0VG9PZmZzZXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2ZsdXNoSUEgKGlhKSB7XHJcbiAgICAgICAgaWYgKCFpYSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLm1hdGVyaWFsO1xyXG4gICAgICAgIGxldCBlZmZlY3QgPSBtYXRlcmlhbC5lZmZlY3Q7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBHZW5lcmF0ZSBtb2RlbFxyXG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX21vZGVsUG9vbC5hZGQoKTtcclxuICAgICAgICB0aGlzLl9iYXRjaGVkTW9kZWxzLnB1c2gobW9kZWwpO1xyXG4gICAgICAgIG1vZGVsLnNvcnRLZXkgPSB0aGlzLl9zb3J0S2V5Kys7XHJcbiAgICAgICAgbW9kZWwuX2N1bGxpbmdNYXNrID0gdGhpcy5jdWxsaW5nTWFzaztcclxuICAgICAgICBtb2RlbC5zZXROb2RlKHRoaXMubm9kZSk7XHJcbiAgICAgICAgbW9kZWwuc2V0RWZmZWN0KGVmZmVjdCk7XHJcbiAgICAgICAgbW9kZWwuc2V0SW5wdXRBc3NlbWJsZXIoaWEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JlbmRlclNjZW5lLmFkZE1vZGVsKG1vZGVsKTtcclxuICAgIH0sXHJcblxyXG4gICAgdGVybWluYXRlICgpIHtcclxuICAgICAgICBpZiAoY2MuZHluYW1pY0F0bGFzTWFuYWdlciAmJiBjYy5keW5hbWljQXRsYXNNYW5hZ2VyLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgY2MuZHluYW1pY0F0bGFzTWFuYWdlci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZsdXNoIGN1cnJlbnQgcmVzdCBNb2RlbFxyXG4gICAgICAgIHRoaXMuX2ZsdXNoKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBfYnVmZmVycykge1xyXG4gICAgICAgICAgICBfYnVmZmVyc1trZXldLnVwbG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLndhbGtpbmcgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QnVmZmVyICh0eXBlLCB2ZXJ0ZXh0Rm9ybWF0KSB7XHJcbiAgICAgICAgbGV0IGtleSA9IHR5cGUgKyB2ZXJ0ZXh0Rm9ybWF0LmdldEhhc2goKTtcclxuICAgICAgICBsZXQgYnVmZmVyID0gX2J1ZmZlcnNba2V5XTtcclxuICAgICAgICBpZiAoIWJ1ZmZlcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ21lc2gnKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBuZXcgTWVzaEJ1ZmZlcih0aGlzLCB2ZXJ0ZXh0Rm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSAncXVhZCcpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBRdWFkQnVmZmVyKHRoaXMsIHZlcnRleHRGb3JtYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzcGluZScpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IG5ldyBTcGluZUJ1ZmZlcih0aGlzLCB2ZXJ0ZXh0Rm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKGBOb3Qgc3VwcG9ydCBidWZmZXIgdHlwZSBbJHt0eXBlfV1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYnVmZmVyc1trZXldID0gYnVmZmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RlbEJhdGNoZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9