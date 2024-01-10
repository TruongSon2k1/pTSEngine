
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/mesh-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.MeshData = MeshData;
exports.Primitive = exports.VertexBundle = exports.VertexFormat = exports.BufferRange = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/**
 * The class BufferRange denotes a range of the buffer.
 * @class BufferRange
 */
var BufferRange = cc.Class({
  name: 'cc.BufferRange',
  properties: {
    /**
     * The offset of the range.
     * @property {Number} offset
     */
    offset: 0,

    /**
     * The length of the range.
     * @property {Number} length
     */
    length: 0
  }
});
/**
 * @class VertexFormat
 */

exports.BufferRange = BufferRange;
var VertexFormat = cc.Class({
  name: 'cc.mesh.VertexFormat',
  properties: {
    name: '',
    type: -1,
    num: -1,
    normalize: false
  }
});
/**
 * A vertex bundle describes a serials of vertex attributes.
 * These vertex attributes occupy a range of the buffer and
 * are interleaved, no padding bytes, in the range.
 */

exports.VertexFormat = VertexFormat;
var VertexBundle = cc.Class({
  name: 'cc.mesh.VertexBundle',
  properties: {
    /**
     * The data range of this bundle.
     * This range of data is essentially mapped to a GPU vertex buffer.
     * @property {BufferRange} data
     */
    data: {
      "default": null,
      type: BufferRange
    },

    /**
     * The attribute formats.
     * @property {VertexFormat} formats
     */
    formats: {
      "default": [],
      type: VertexFormat
    },

    /**
     * The bundle's vertices count.
     */
    verticesCount: 0
  }
});
/**
 * A primitive is a geometry constituted with a list of
 * same topology primitive graphic(such as points, lines or triangles).
 */

exports.VertexBundle = VertexBundle;
var Primitive = cc.Class({
  name: 'cc.mesh.Primitive',
  properties: {
    /**
     * The vertex bundle that the primitive use.
     * @property {[Number]} vertexBundleIndices
     */
    vertexBundleIndices: {
      "default": [],
      type: cc.Float
    },

    /**
     * The data range of the primitive.
     * This range of data is essentially mapped to a GPU indices buffer.
     * @property {BufferRange} data
     */
    data: {
      "default": null,
      type: BufferRange
    },

    /**
     * The type of this primitive's indices.
     * @property {Number} indexUnit
     */
    indexUnit: _gfx["default"].INDEX_FMT_UINT16,

    /**
     * The primitive's topology.
     * @property {Number} topology
     */
    topology: _gfx["default"].PT_TRIANGLES
  }
});
exports.Primitive = Primitive;

function MeshData() {
  this.vData = null; // Uint8Array;

  this.float32VData = null;
  this.uint32VData = null;
  this.iData = null; // Uint8Array;

  this.uint16IData = null;
  this.vfm = null;
  this.offset = 0;
  this.vb = null;
  this.ib = null;
  this.vDirty = false;
  this.iDirty = false;
  this.enable = true;
}

MeshData.prototype.setVData = function (data) {
  this.vData = data;
  this.float32VData = null;
  this.uint32VData = null;
};

MeshData.prototype.getVData = function (format) {
  if (format === Float32Array) {
    if (!this.float32VData) {
      this.float32VData = new Float32Array(this.vData.buffer, this.vData.byteOffset, this.vData.byteLength / 4);
    }

    return this.float32VData;
  } else if (format === Uint32Array) {
    if (!this.uint32VData) {
      this.uint32VData = new Uint32Array(this.vData.buffer, this.vData.byteOffset, this.vData.byteLength / 4);
    }

    return this.uint32VData;
  }

  return this.vData;
};

MeshData.prototype.getIData = function (format) {
  if (format === Uint16Array) {
    if (!this.uint16IData) {
      this.uint16IData = new Uint16Array(this.iData.buffer, this.iData.byteOffset, this.iData.byteLength / 2);
    }

    return this.uint16IData;
  }

  return this.iData;
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXG1lc2hcXG1lc2gtZGF0YS5qcyJdLCJuYW1lcyI6WyJCdWZmZXJSYW5nZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsIm9mZnNldCIsImxlbmd0aCIsIlZlcnRleEZvcm1hdCIsInR5cGUiLCJudW0iLCJub3JtYWxpemUiLCJWZXJ0ZXhCdW5kbGUiLCJkYXRhIiwiZm9ybWF0cyIsInZlcnRpY2VzQ291bnQiLCJQcmltaXRpdmUiLCJ2ZXJ0ZXhCdW5kbGVJbmRpY2VzIiwiRmxvYXQiLCJpbmRleFVuaXQiLCJnZngiLCJJTkRFWF9GTVRfVUlOVDE2IiwidG9wb2xvZ3kiLCJQVF9UUklBTkdMRVMiLCJNZXNoRGF0YSIsInZEYXRhIiwiZmxvYXQzMlZEYXRhIiwidWludDMyVkRhdGEiLCJpRGF0YSIsInVpbnQxNklEYXRhIiwidmZtIiwidmIiLCJpYiIsInZEaXJ0eSIsImlEaXJ0eSIsImVuYWJsZSIsInByb3RvdHlwZSIsInNldFZEYXRhIiwiZ2V0VkRhdGEiLCJmb3JtYXQiLCJGbG9hdDMyQXJyYXkiLCJidWZmZXIiLCJieXRlT2Zmc2V0IiwiYnl0ZUxlbmd0aCIsIlVpbnQzMkFycmF5IiwiZ2V0SURhdGEiLCJVaW50MTZBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLGdCQUR3QjtBQUc5QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDUjtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsTUFBTSxF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WUFBVixFQUF3QjtBQUNwQixXQUFLQSxZQUFMLEdBQW9CLElBQUljLFlBQUosQ0FBaUIsS0FBS2YsS0FBTCxDQUFXZ0IsTUFBNUIsRUFBb0MsS0FBS2hCLEtBQUwsQ0FBV2lCLFVBQS9DLEVBQTJELEtBQUtqQixLQUFMLENBQVdrQixVQUFYLEdBQXdCLENBQW5GLENBQXBCO0FBQ0g7O0FBQ0QsV0FBTyxLQUFLakIsWUFBWjtBQUNILEdBTEQsTUFNSyxJQUFJYSxNQUFNLEtBQUtLLFdBQWYsRUFBNEI7QUFDN0IsUUFBSSxDQUFDLEtBQUtqQixXQUFWLEVBQXVCO0FBQ25CLFdBQUtBLFdBQUwsR0FBbUIsSUFBSWlCLFdBQUosQ0FBZ0IsS0FBS25CLEtBQUwsQ0FBV2dCLE1BQTNCLEVBQW1DLEtBQUtoQixLQUFMLENBQVdpQixVQUE5QyxFQUEwRCxLQUFLakIsS0FBTCxDQUFXa0IsVUFBWCxHQUF3QixDQUFsRixDQUFuQjtBQUNIOztBQUNELFdBQU8sS0FBS2hCLFdBQVo7QUFDSDs7QUFDRCxTQUFPLEtBQUtGLEtBQVo7QUFDSCxDQWREOztBQWdCQUQsUUFBUSxDQUFDWSxTQUFULENBQW1CUyxRQUFuQixHQUE4QixVQUFVTixNQUFWLEVBQWtCO0FBQzVDLE1BQUlBLE1BQU0sS0FBS08sV0FBZixFQUE0QjtBQUN4QixRQUFJLENBQUMsS0FBS2pCLFdBQVYsRUFBdUI7QUFDbkIsV0FBS0EsV0FBTCxHQUFtQixJQUFJaUIsV0FBSixDQUFnQixLQUFLbEIsS0FBTCxDQUFXYSxNQUEzQixFQUFtQyxLQUFLYixLQUFMLENBQVdjLFVBQTlDLEVBQTBELEtBQUtkLEtBQUwsQ0FBV2UsVUFBWCxHQUF3QixDQUFsRixDQUFuQjtBQUNIOztBQUNELFdBQU8sS0FBS2QsV0FBWjtBQUNIOztBQUNELFNBQU8sS0FBS0QsS0FBWjtBQUNILENBUkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi9yZW5kZXJlci9nZngnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBCdWZmZXJSYW5nZSBkZW5vdGVzIGEgcmFuZ2Ugb2YgdGhlIGJ1ZmZlci5cclxuICogQGNsYXNzIEJ1ZmZlclJhbmdlXHJcbiAqL1xyXG5leHBvcnQgbGV0IEJ1ZmZlclJhbmdlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkJ1ZmZlclJhbmdlJyxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIG9mZnNldCBvZiB0aGUgcmFuZ2UuXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9mZnNldFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9mZnNldDogMCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgbGVuZ3RoIG9mIHRoZSByYW5nZS5cclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGVuZ3RoOiAwXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBWZXJ0ZXhGb3JtYXRcclxuICovXHJcbmV4cG9ydCBsZXQgVmVydGV4Rm9ybWF0ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLm1lc2guVmVydGV4Rm9ybWF0JyxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgdHlwZTogLTEsXHJcbiAgICAgICAgbnVtOiAtMSxcclxuICAgICAgICBub3JtYWxpemU6IGZhbHNlXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEEgdmVydGV4IGJ1bmRsZSBkZXNjcmliZXMgYSBzZXJpYWxzIG9mIHZlcnRleCBhdHRyaWJ1dGVzLlxyXG4gKiBUaGVzZSB2ZXJ0ZXggYXR0cmlidXRlcyBvY2N1cHkgYSByYW5nZSBvZiB0aGUgYnVmZmVyIGFuZFxyXG4gKiBhcmUgaW50ZXJsZWF2ZWQsIG5vIHBhZGRpbmcgYnl0ZXMsIGluIHRoZSByYW5nZS5cclxuICovXHJcbmV4cG9ydCBsZXQgVmVydGV4QnVuZGxlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLm1lc2guVmVydGV4QnVuZGxlJyxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgZGF0YSByYW5nZSBvZiB0aGlzIGJ1bmRsZS5cclxuICAgICAgICAgKiBUaGlzIHJhbmdlIG9mIGRhdGEgaXMgZXNzZW50aWFsbHkgbWFwcGVkIHRvIGEgR1BVIHZlcnRleCBidWZmZXIuXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCdWZmZXJSYW5nZX0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogQnVmZmVyUmFuZ2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBhdHRyaWJ1dGUgZm9ybWF0cy5cclxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlcnRleEZvcm1hdH0gZm9ybWF0c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvcm1hdHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFZlcnRleEZvcm1hdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGJ1bmRsZSdzIHZlcnRpY2VzIGNvdW50LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnRpY2VzQ291bnQ6IDAsXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEEgcHJpbWl0aXZlIGlzIGEgZ2VvbWV0cnkgY29uc3RpdHV0ZWQgd2l0aCBhIGxpc3Qgb2ZcclxuICogc2FtZSB0b3BvbG9neSBwcmltaXRpdmUgZ3JhcGhpYyhzdWNoIGFzIHBvaW50cywgbGluZXMgb3IgdHJpYW5nbGVzKS5cclxuICovXHJcbmV4cG9ydCBsZXQgUHJpbWl0aXZlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLm1lc2guUHJpbWl0aXZlJyxcclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgdmVydGV4IGJ1bmRsZSB0aGF0IHRoZSBwcmltaXRpdmUgdXNlLlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7W051bWJlcl19IHZlcnRleEJ1bmRsZUluZGljZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2ZXJ0ZXhCdW5kbGVJbmRpY2VzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGRhdGEgcmFuZ2Ugb2YgdGhlIHByaW1pdGl2ZS5cclxuICAgICAgICAgKiBUaGlzIHJhbmdlIG9mIGRhdGEgaXMgZXNzZW50aWFsbHkgbWFwcGVkIHRvIGEgR1BVIGluZGljZXMgYnVmZmVyLlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QnVmZmVyUmFuZ2V9IGRhdGFcclxuICAgICAgICAgKi9cclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEJ1ZmZlclJhbmdlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgdHlwZSBvZiB0aGlzIHByaW1pdGl2ZSdzIGluZGljZXMuXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGluZGV4VW5pdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluZGV4VW5pdDogZ2Z4LklOREVYX0ZNVF9VSU5UMTYsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHByaW1pdGl2ZSdzIHRvcG9sb2d5LlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0b3BvbG9neVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRvcG9sb2d5OiBnZnguUFRfVFJJQU5HTEVTXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1lc2hEYXRhICgpIHtcclxuICAgIHRoaXMudkRhdGEgPSBudWxsOyAgLy8gVWludDhBcnJheTtcclxuICAgIHRoaXMuZmxvYXQzMlZEYXRhID0gbnVsbDtcclxuICAgIHRoaXMudWludDMyVkRhdGEgPSBudWxsO1xyXG4gICAgdGhpcy5pRGF0YSA9IG51bGw7ICAvLyBVaW50OEFycmF5O1xyXG4gICAgdGhpcy51aW50MTZJRGF0YSA9IG51bGw7XHJcbiAgICB0aGlzLnZmbSA9IG51bGw7XHJcbiAgICB0aGlzLm9mZnNldCA9IDA7XHJcblxyXG4gICAgdGhpcy52YiA9IG51bGw7XHJcbiAgICB0aGlzLmliID0gbnVsbDtcclxuICAgIHRoaXMudkRpcnR5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmlEaXJ0eSA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcclxufVxyXG5cclxuTWVzaERhdGEucHJvdG90eXBlLnNldFZEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIHRoaXMudkRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5mbG9hdDMyVkRhdGEgPSBudWxsO1xyXG4gICAgdGhpcy51aW50MzJWRGF0YSA9IG51bGw7XHJcbn1cclxuXHJcbk1lc2hEYXRhLnByb3RvdHlwZS5nZXRWRGF0YSA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgIGlmIChmb3JtYXQgPT09IEZsb2F0MzJBcnJheSkge1xyXG4gICAgICAgIGlmICghdGhpcy5mbG9hdDMyVkRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5mbG9hdDMyVkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMudkRhdGEuYnVmZmVyLCB0aGlzLnZEYXRhLmJ5dGVPZmZzZXQsIHRoaXMudkRhdGEuYnl0ZUxlbmd0aCAvIDQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5mbG9hdDMyVkRhdGE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmb3JtYXQgPT09IFVpbnQzMkFycmF5KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVpbnQzMlZEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudWludDMyVkRhdGEgPSBuZXcgVWludDMyQXJyYXkodGhpcy52RGF0YS5idWZmZXIsIHRoaXMudkRhdGEuYnl0ZU9mZnNldCwgdGhpcy52RGF0YS5ieXRlTGVuZ3RoIC8gNCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnVpbnQzMlZEYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMudkRhdGE7XHJcbn1cclxuXHJcbk1lc2hEYXRhLnByb3RvdHlwZS5nZXRJRGF0YSA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgIGlmIChmb3JtYXQgPT09IFVpbnQxNkFycmF5KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnVpbnQxNklEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudWludDE2SURhdGEgPSBuZXcgVWludDE2QXJyYXkodGhpcy5pRGF0YS5idWZmZXIsIHRoaXMuaURhdGEuYnl0ZU9mZnNldCwgdGhpcy5pRGF0YS5ieXRlTGVuZ3RoIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnVpbnQxNklEYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaURhdGE7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=