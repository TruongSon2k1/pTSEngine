
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/CCMesh.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _meshData = require("./mesh-data");

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
var renderer = require('../renderer');

var EventTarget = require('../event/event-target');

function applyColor(data, offset, value) {
  data[offset] = value._val;
}

function applyVec2(data, offset, value) {
  data[offset] = value.x;
  data[offset + 1] = value.y;
}

function applyVec3(data, offset, value) {
  data[offset] = value.x;
  data[offset + 1] = value.y;
  data[offset + 2] = value.z;
}

var _compType2fn = {
  5120: 'getInt8',
  5121: 'getUint8',
  5122: 'getInt16',
  5123: 'getUint16',
  5124: 'getInt32',
  5125: 'getUint32',
  5126: 'getFloat32'
};
var _compType2write = {
  5120: 'setInt8',
  5121: 'setUint8',
  5122: 'setInt16',
  5123: 'setUint16',
  5124: 'setInt32',
  5125: 'setUint32',
  5126: 'setFloat32'
}; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#Endianness

var littleEndian = function () {
  var buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true); // Int16Array uses the platform's endianness.

  return new Int16Array(buffer)[0] === 256;
}();
/**
* @module cc
*/

/**
 * !#en Mesh Asset.
 * !#zh 网格资源。
 * @class Mesh
 * @extends Asset
 * @uses EventTarget
 */


var Mesh = cc.Class({
  name: 'cc.Mesh',
  "extends": cc.Asset,
  mixins: [EventTarget],
  properties: {
    _nativeAsset: {
      override: true,
      get: function get() {
        return this._buffer;
      },
      set: function set(bin) {
        this._buffer = ArrayBuffer.isView(bin) ? bin.buffer : bin;
        this.initWithBuffer();
      }
    },
    _vertexBundles: {
      "default": null,
      type: _meshData.VertexBundle
    },
    _primitives: {
      "default": null,
      Primitive: _meshData.Primitive
    },
    _minPos: cc.v3(),
    _maxPos: cc.v3(),

    /**
     * !#en Get ir set the sub meshes.
     * !#zh 设置或者获取子网格。
     * @property {[InputAssembler]} subMeshes
     */
    subMeshes: {
      get: function get() {
        return this._subMeshes;
      },
      set: function set(v) {
        this._subMeshes = v;
      }
    },
    subDatas: {
      get: function get() {
        return this._subDatas;
      }
    }
  },
  ctor: function ctor() {
    this._subMeshes = [];
    this._subDatas = [];
    this.loaded = false;
  },
  initWithBuffer: function initWithBuffer() {
    this._subMeshes.length = 0;
    var primitives = this._primitives;

    for (var i = 0; i < primitives.length; i++) {
      var primitive = primitives[i]; // ib

      var ibrange = primitive.data;
      var ibData = new Uint8Array(this._buffer, ibrange.offset, ibrange.length); // vb

      var vertexBundle = this._vertexBundles[primitive.vertexBundleIndices[0]];
      var vbRange = vertexBundle.data;
      var gfxVFmt = new _gfx["default"].VertexFormat(vertexBundle.formats); // Mesh binary may have several data format, must use Uint8Array to store data.

      var vbData = new Uint8Array(this._buffer, vbRange.offset, vbRange.length);

      var canBatch = this._canVertexFormatBatch(gfxVFmt);

      var meshData = new _meshData.MeshData();
      meshData.vData = vbData;
      meshData.iData = ibData;
      meshData.vfm = gfxVFmt;
      meshData.offset = vbRange.offset;
      meshData.canBatch = canBatch;

      this._subDatas.push(meshData);

      if (CC_JSB && CC_NATIVERENDERER) {
        meshData.vDirty = true;

        this._subMeshes.push(new _inputAssembler["default"](null, null));
      } else {
        var vbBuffer = new _gfx["default"].VertexBuffer(renderer.device, gfxVFmt, _gfx["default"].USAGE_STATIC, vbData);
        var ibBuffer = new _gfx["default"].IndexBuffer(renderer.device, primitive.indexUnit, _gfx["default"].USAGE_STATIC, ibData); // create sub meshes

        this._subMeshes.push(new _inputAssembler["default"](vbBuffer, ibBuffer));
      }
    }

    this.loaded = true;
    this.emit('load');
  },
  _canVertexFormatBatch: function _canVertexFormatBatch(format) {
    var aPosition = format._attr2el[_gfx["default"].ATTR_POSITION];
    var canBatch = !aPosition || aPosition.type === _gfx["default"].ATTR_TYPE_FLOAT32 && format._bytes % 4 === 0;
    return canBatch;
  },

  /**
   * !#en
   * Init vertex buffer according to the vertex format.
   * !#zh
   * 根据顶点格式初始化顶点内存。
   * @method init
   * @param {gfx.VertexFormat} vertexFormat - vertex format
   * @param {Number} vertexCount - how much vertex should be create in this buffer.
   * @param {Boolean} [dynamic] - whether or not to use dynamic buffer.
   * @param {Boolean} [index]
   */
  init: function init(vertexFormat, vertexCount, dynamic, index) {
    if (dynamic === void 0) {
      dynamic = false;
    }

    if (index === void 0) {
      index = 0;
    }

    var data = new Uint8Array(vertexFormat._bytes * vertexCount);
    var meshData = new _meshData.MeshData();
    meshData.vData = data;
    meshData.vfm = vertexFormat;
    meshData.vDirty = true;
    meshData.canBatch = this._canVertexFormatBatch(vertexFormat);

    if (!(CC_JSB && CC_NATIVERENDERER)) {
      var vb = new _gfx["default"].VertexBuffer(renderer.device, vertexFormat, dynamic ? _gfx["default"].USAGE_DYNAMIC : _gfx["default"].USAGE_STATIC, data);
      meshData.vb = vb;
      this._subMeshes[index] = new _inputAssembler["default"](meshData.vb);
    }

    var oldSubData = this._subDatas[index];

    if (oldSubData) {
      if (oldSubData.vb) {
        oldSubData.vb.destroy();
      }

      if (oldSubData.ib) {
        oldSubData.ib.destroy();
      }
    }

    this._subDatas[index] = meshData;
    this.loaded = true;
    this.emit('load');
    this.emit('init-format');
  },

  /**
   * !#en
   * Set the vertex values.
   * !#zh 
   * 设置顶点数据
   * @method setVertices
   * @param {String} name - the attribute name, e.g. gfx.ATTR_POSITION
   * @param {[Vec2] | [Vec3] | [Color] | [Number] | Uint8Array | Float32Array} values - the vertex values
   */
  setVertices: function setVertices(name, values, index) {
    index = index || 0;
    var subData = this._subDatas[index];
    var el = subData.vfm.element(name);

    if (!el) {
      return cc.warn("Cannot find " + name + " attribute in vertex defines.");
    } // whether the values is expanded


    var isFlatMode = typeof values[0] === 'number';
    var elNum = el.num;
    var verticesCount = isFlatMode ? values.length / elNum | 0 : values.length;

    if (subData.vData.byteLength < verticesCount * el.stride) {
      subData.setVData(new Uint8Array(verticesCount * subData.vfm._bytes));
    }

    var data;
    var bytes = 4;

    if (name === _gfx["default"].ATTR_COLOR) {
      if (!isFlatMode) {
        data = subData.getVData(Uint32Array);
      } else {
        data = subData.getVData();
        bytes = 1;
      }
    } else {
      data = subData.getVData(Float32Array);
    }

    var stride = el.stride / bytes;
    var offset = el.offset / bytes;

    if (isFlatMode) {
      for (var i = 0, l = values.length / elNum; i < l; i++) {
        var sOffset = i * elNum;
        var dOffset = i * stride + offset;

        for (var j = 0; j < elNum; j++) {
          data[dOffset + j] = values[sOffset + j];
        }
      }
    } else {
      var applyFunc;

      if (name === _gfx["default"].ATTR_COLOR) {
        applyFunc = applyColor;
      } else {
        if (elNum === 2) {
          applyFunc = applyVec2;
        } else {
          applyFunc = applyVec3;
        }
      }

      for (var _i = 0, _l = values.length; _i < _l; _i++) {
        var v = values[_i];
        var vOffset = _i * stride + offset;
        applyFunc(data, vOffset, v);
      }
    }

    subData.vDirty = true;
  },

  /**
   * !#en
   * Set the sub mesh indices.
   * !#zh
   * 设置子网格索引。
   * @method setIndices
   * @param {[Number]|Uint16Array|Uint8Array} indices - the sub mesh indices.
   * @param {Number} [index] - sub mesh index.
   * @param {Boolean} [dynamic] - whether or not to use dynamic buffer.
   */
  setIndices: function setIndices(indices, index, dynamic) {
    index = index || 0;
    var iData = indices;

    if (indices instanceof Uint16Array) {
      iData = new Uint8Array(indices.buffer, indices.byteOffset, indices.byteLength);
    } else if (Array.isArray(indices)) {
      iData = new Uint16Array(indices);
      iData = new Uint8Array(iData.buffer, iData.byteOffset, iData.byteLength);
    }

    var usage = dynamic ? _gfx["default"].USAGE_DYNAMIC : _gfx["default"].USAGE_STATIC;
    var subData = this._subDatas[index];

    if (!subData.ib) {
      subData.iData = iData;

      if (!(CC_JSB && CC_NATIVERENDERER)) {
        var buffer = new _gfx["default"].IndexBuffer(renderer.device, _gfx["default"].INDEX_FMT_UINT16, usage, iData, iData.byteLength / _gfx["default"].IndexBuffer.BYTES_PER_INDEX[_gfx["default"].INDEX_FMT_UINT16]);
        subData.ib = buffer;
        this._subMeshes[index]._indexBuffer = subData.ib;
      }
    } else {
      subData.iData = iData;
      subData.iDirty = true;
    }
  },

  /**
   * !#en
   * Set the sub mesh primitive type.
   * !#zh
   * 设置子网格绘制线条的方式。
   * @method setPrimitiveType
   * @param {Number} type 
   * @param {Number} index 
   */
  setPrimitiveType: function setPrimitiveType(type, index) {
    index = index || 0;
    var subMesh = this._subMeshes[index];

    if (!subMesh) {
      cc.warn("Do not have sub mesh at index " + index);
      return;
    }

    this._subMeshes[index]._primitiveType = type;
  },

  /** 
   * !#en
   * Clear the buffer data.
   * !#zh
   * 清除网格创建的内存数据。
   * @method clear
  */
  clear: function clear() {
    this._subMeshes.length = 0;
    var subDatas = this._subDatas;

    for (var i = 0, len = subDatas.length; i < len; i++) {
      var vb = subDatas[i].vb;

      if (vb) {
        vb.destroy();
      }

      var ib = subDatas[i].ib;

      if (ib) {
        ib.destroy();
      }
    }

    subDatas.length = 0;
  },

  /**
   * !#en Set mesh bounding box
   * !#zh 设置网格的包围盒
   * @method setBoundingBox
   * @param {Vec3} min 
   * @param {Vec3} max 
   */
  setBoundingBox: function setBoundingBox(min, max) {
    this._minPos = min;
    this._maxPos = max;
  },
  destroy: function destroy() {
    this.clear();
  },
  _uploadData: function _uploadData() {
    var subDatas = this._subDatas;

    for (var i = 0, len = subDatas.length; i < len; i++) {
      var subData = subDatas[i];

      if (subData.vDirty) {
        var buffer = subData.vb,
            data = subData.vData;
        buffer.update(0, data);
        subData.vDirty = false;
      }

      if (subData.iDirty) {
        var _buffer = subData.ib,
            _data = subData.iData;

        _buffer.update(0, _data);

        subData.iDirty = false;
      }
    }
  },
  _getAttrMeshData: function _getAttrMeshData(subDataIndex, name) {
    var subData = this._subDatas[subDataIndex];
    if (!subData) return [];
    var format = subData.vfm;
    var fmt = format.element(name);
    if (!fmt) return [];

    if (!subData.attrDatas) {
      subData.attrDatas = {};
    }

    var attrDatas = subData.attrDatas;
    var data = attrDatas[name];

    if (data) {
      return data;
    } else {
      data = attrDatas[name] = [];
    }

    var vbData = subData.vData;
    var dv = new DataView(vbData.buffer, vbData.byteOffset, vbData.byteLength);
    var stride = fmt.stride;
    var eleOffset = fmt.offset;
    var eleNum = fmt.num;
    var eleByte = fmt.bytes / eleNum;
    var fn = _compType2fn[fmt.type];
    var vertexCount = vbData.byteLength / format._bytes;

    for (var i = 0; i < vertexCount; i++) {
      var offset = i * stride + eleOffset;

      for (var j = 0; j < eleNum; j++) {
        var v = dv[fn](offset + j * eleByte, littleEndian);
        data.push(v);
      }
    }

    return data;
  },

  /**
   * !#en Read the specified attributes of the subgrid into the target buffer.
   * !#zh 读取子网格的指定属性到目标缓冲区中。
   * @param {Number} primitiveIndex The subgrid index.
   * @param {String} attributeName attribute name.
   * @param {ArrayBuffer} buffer The target buffer.
   * @param {Number} stride The byte interval between adjacent attributes in the target buffer.
   * @param {Number} offset The offset of the first attribute in the target buffer.
   * @returns {Boolean} If the specified sub-grid does not exist, the sub-grid does not exist, or the specified attribute cannot be read, return `false`, otherwise return` true`.
   * @method copyAttribute
   */
  copyAttribute: function copyAttribute(primitiveIndex, attributeName, buffer, stride, offset) {
    var written = false;
    var subData = this._subDatas[primitiveIndex];
    if (!subData) return written;
    var format = subData.vfm;
    var fmt = format.element(attributeName);
    if (!fmt) return written;
    var writter = _compType2write[fmt.type];
    if (!writter) return written;

    var data = this._getAttrMeshData(primitiveIndex, attributeName);

    var vertexCount = subData.vData.byteLength / format._bytes;
    var eleByte = fmt.bytes / fmt.num;

    if (data.length > 0) {
      var outputView = new DataView(buffer, offset);
      var outputStride = stride;
      var num = fmt.num;

      for (var i = 0; i < vertexCount; ++i) {
        var index = i * num;

        for (var j = 0; j < num; ++j) {
          var inputOffset = index + j;
          var outputOffset = outputStride * i + eleByte * j;
          outputView[writter](outputOffset, data[inputOffset], littleEndian);
        }
      }

      written = true;
    }

    return written;
  },

  /**
   * !#en Read the index data of the subgrid into the target array.
   * !#zh 读取子网格的索引数据到目标数组中。
   * @param {Number} primitiveIndex The subgrid index.
   * @param {TypedArray} outputArray The target array.
   * @returns {Boolean} returns `false` if the specified sub-grid does not exist or the sub-grid does not have index data, otherwise returns` true`.
   * @method copyIndices
   */
  copyIndices: function copyIndices(primitiveIndex, outputArray) {
    var subData = this._subDatas[primitiveIndex];
    if (!subData) return false;
    var iData = subData.iData;
    var indexCount = iData.length / 2;
    var dv = new DataView(iData.buffer, iData.byteOffset, iData.byteLength);
    var fn = _compType2fn[_gfx["default"].INDEX_FMT_UINT8];

    for (var i = 0; i < indexCount; ++i) {
      outputArray[i] = dv[fn](i * 2);
    }

    return true;
  }
});
cc.Mesh = module.exports = Mesh;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXG1lc2hcXENDTWVzaC5qcyJdLCJuYW1lcyI6WyJyZW5kZXJlciIsInJlcXVpcmUiLCJFdmVudFRhcmdldCIsImFwcGx5Q29sb3IiLCJkYXRhIiwib2Zmc2V0IiwidmFsdWUiLCJfdmFsIiwiYXBwbHlWZWMyIiwieCIsInkiLCJhcHBseVZlYzMiLCJ6IiwiX2NvbXBUeXBlMmZuIiwiX2NvbXBUeXBlMndyaXRlIiwibGl0dGxlRW5kaWFuIiwiYnVmZmVyIiwiQXJyYXlCdWZmZXIiLCJEYXRhVmlldyIsInNldEludDE2IiwiSW50MTZBcnJheSIsIk1lc2giLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwibWl4aW5zIiwicHJvcGVydGllcyIsIl9uYXRpdmVBc3NldCIsIm92ZXJyaWRlIiwiZ2V0IiwiX2J1ZmZlciIsInNldCIsImJpbiIsImlzVmlldyIsImluaXRXaXRoQnVmZmVyIiwiX3ZlcnRleEJ1bmRsZXMiLCJ0eXBlIiwiVmVydGV4QnVuZGxlIiwiX3ByaW1pdGl2ZXMiLCJQcmltaXRpdmUiLCJfbWluUG9zIiwidjMiLCJfbWF4UG9zIiwic3ViTWVzaGVzIiwiX3N1Yk1lc2hlcyIsInYiLCJzdWJEYXRhcyIsIl9zdWJEYXRhcyIsImN0b3IiLCJsb2FkZWQiLCJsZW5ndGgiLCJwcmltaXRpdmVzIiwiaSIsInByaW1pdGl2ZSIsImlicmFuZ2UiLCJpYkRhdGEiLCJVaW50OEFycmF5IiwidmVydGV4QnVuZGxlIiwidmVydGV4QnVuZGxlSW5kaWNlcyIsInZiUmFuZ2UiLCJnZnhWRm10IiwiZ2Z4IiwiVmVydGV4Rm9ybWF0IiwiZm9ybWF0cyIsInZiRGF0YSIsImNhbkJhdGNoIiwiX2NhblZlcnRleEZvcm1hdEJhdGNoIiwibWVzaERhdGEiLCJNZXNoRGF0YSIsInZEYXRhIiwiaURhdGEiLCJ2Zm0iLCJwdXNoIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJ2RGlydHkiLCJJbnB1dEFzc2VtYmxlciIsInZiQnVmZmVyIiwiVmVydGV4QnVmZmVyIiwiZGV2aWNlIiwiVVNBR0VfU1RBVElDIiwiaWJCdWZmZXIiLCJJbmRleEJ1ZmZlciIsImluZGV4VW5pdCIsImVtaXQiLCJmb3JtYXQiLCJhUG9zaXRpb24iLCJfYXR0cjJlbCIsIkFUVFJfUE9TSVRJT04iLCJBVFRSX1RZUEVfRkxPQVQzMiIsIl9ieXRlcyIsImluaXQiLCJ2ZXJ0ZXhGb3JtYXQiLCJ2ZXJ0ZXhDb3VudCIsImR5bmFtaWMiLCJpbmRleCIsInZiIiwiVVNBR0VfRFlOQU1JQyIsIm9sZFN1YkRhdGEiLCJkZXN0cm95IiwiaWIiLCJzZXRWZXJ0aWNlcyIsInZhbHVlcyIsInN1YkRhdGEiLCJlbCIsImVsZW1lbnQiLCJ3YXJuIiwiaXNGbGF0TW9kZSIsImVsTnVtIiwibnVtIiwidmVydGljZXNDb3VudCIsImJ5dGVMZW5ndGgiLCJzdHJpZGUiLCJzZXRWRGF0YSIsImJ5dGVzIiwiQVRUUl9DT0xPUiIsImdldFZEYXRhIiwiVWludDMyQXJyYXkiLCJGbG9hdDMyQXJyYXkiLCJsIiwic09mZnNldCIsImRPZmZzZXQiLCJqIiwiYXBwbHlGdW5jIiwidk9mZnNldCIsInNldEluZGljZXMiLCJpbmRpY2VzIiwiVWludDE2QXJyYXkiLCJieXRlT2Zmc2V0IiwiQXJyYXkiLCJpc0FycmF5IiwidXNhZ2UiLCJJTkRFWF9GTVRfVUlOVDE2IiwiQllURVNfUEVSX0lOREVYIiwiX2luZGV4QnVmZmVyIiwiaURpcnR5Iiwic2V0UHJpbWl0aXZlVHlwZSIsInN1Yk1lc2giLCJfcHJpbWl0aXZlVHlwZSIsImNsZWFyIiwibGVuIiwic2V0Qm91bmRpbmdCb3giLCJtaW4iLCJtYXgiLCJfdXBsb2FkRGF0YSIsInVwZGF0ZSIsIl9nZXRBdHRyTWVzaERhdGEiLCJzdWJEYXRhSW5kZXgiLCJmbXQiLCJhdHRyRGF0YXMiLCJkdiIsImVsZU9mZnNldCIsImVsZU51bSIsImVsZUJ5dGUiLCJmbiIsImNvcHlBdHRyaWJ1dGUiLCJwcmltaXRpdmVJbmRleCIsImF0dHJpYnV0ZU5hbWUiLCJ3cml0dGVuIiwid3JpdHRlciIsIm91dHB1dFZpZXciLCJvdXRwdXRTdHJpZGUiLCJpbnB1dE9mZnNldCIsIm91dHB1dE9mZnNldCIsImNvcHlJbmRpY2VzIiwib3V0cHV0QXJyYXkiLCJpbmRleENvdW50IiwiSU5ERVhfRk1UX1VJTlQ4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTRCQTs7QUFDQTs7QUFDQTs7OztBQTlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXhCOztBQUNBLElBQU1DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTNCOztBQU1BLFNBQVNFLFVBQVQsQ0FBcUJDLElBQXJCLEVBQTJCQyxNQUEzQixFQUFtQ0MsS0FBbkMsRUFBMEM7QUFDdENGLEVBQUFBLElBQUksQ0FBQ0MsTUFBRCxDQUFKLEdBQWVDLEtBQUssQ0FBQ0MsSUFBckI7QUFDSDs7QUFFRCxTQUFTQyxTQUFULENBQW9CSixJQUFwQixFQUEwQkMsTUFBMUIsRUFBa0NDLEtBQWxDLEVBQXlDO0FBQ3JDRixFQUFBQSxJQUFJLENBQUNDLE1BQUQsQ0FBSixHQUFlQyxLQUFLLENBQUNHLENBQXJCO0FBQ0FMLEVBQUFBLElBQUksQ0FBQ0MsTUFBTSxHQUFHLENBQVYsQ0FBSixHQUFtQkMsS0FBSyxDQUFDSSxDQUF6QjtBQUNIOztBQUVELFNBQVNDLFNBQVQsQ0FBb0JQLElBQXBCLEVBQTBCQyxNQUExQixFQUFrQ0MsS0FBbEMsRUFBeUM7QUFDckNGLEVBQUFBLElBQUksQ0FBQ0MsTUFBRCxDQUFKLEdBQWVDLEtBQUssQ0FBQ0csQ0FBckI7QUFDQUwsRUFBQUEsSUFBSSxDQUFDQyxNQUFNLEdBQUcsQ0FBVixDQUFKLEdB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QWdDLEVBQUVsSCxDQUFsQyxFQUFxQztBQUNqQ2lILE1BQUFBLFdBQVcsQ0FBQ2pILENBQUQsQ0FBWCxHQUFpQmtHLEVBQUUsQ0FBQ0ksRUFBRCxDQUFGLENBQU90RyxDQUFDLEdBQUcsQ0FBWCxDQUFqQjtBQUNIOztBQUVELFdBQU8sSUFBUDtBQUNIO0FBcGVlLENBQVQsQ0FBWDtBQXVlQS9CLEVBQUUsQ0FBQ0QsSUFBSCxHQUFVb0osTUFBTSxDQUFDQyxPQUFQLEdBQWlCckosSUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlcicpO1xyXG5jb25zdCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4uL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xyXG5cclxuaW1wb3J0IElucHV0QXNzZW1ibGVyIGZyb20gJy4uLy4uL3JlbmRlcmVyL2NvcmUvaW5wdXQtYXNzZW1ibGVyJztcclxuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi9yZW5kZXJlci9nZngnO1xyXG5pbXBvcnQgeyBQcmltaXRpdmUsIFZlcnRleEJ1bmRsZSwgTWVzaERhdGF9IGZyb20gJy4vbWVzaC1kYXRhJztcclxuXHJcbmZ1bmN0aW9uIGFwcGx5Q29sb3IgKGRhdGEsIG9mZnNldCwgdmFsdWUpIHtcclxuICAgIGRhdGFbb2Zmc2V0XSA9IHZhbHVlLl92YWw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VmVjMiAoZGF0YSwgb2Zmc2V0LCB2YWx1ZSkge1xyXG4gICAgZGF0YVtvZmZzZXRdID0gdmFsdWUueDtcclxuICAgIGRhdGFbb2Zmc2V0ICsgMV0gPSB2YWx1ZS55O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVZlYzMgKGRhdGEsIG9mZnNldCwgdmFsdWUpIHtcclxuICAgIGRhdGFbb2Zmc2V0XSA9IHZhbHVlLng7XHJcbiAgICBkYXRhW29mZnNldCArIDFdID0gdmFsdWUueTtcclxuICAgIGRhdGFbb2Zmc2V0ICsgMl0gPSB2YWx1ZS56O1xyXG59XHJcblxyXG5jb25zdCBfY29tcFR5cGUyZm4gPSB7XHJcbiAgICA1MTIwOiAnZ2V0SW50OCcsXHJcbiAgICA1MTIxOiAnZ2V0VWludDgnLFxyXG4gICAgNTEyMjogJ2dldEludDE2JyxcclxuICAgIDUxMjM6ICdnZXRVaW50MTYnLFxyXG4gICAgNTEyNDogJ2dldEludDMyJyxcclxuICAgIDUxMjU6ICdnZXRVaW50MzInLFxyXG4gICAgNTEyNjogJ2dldEZsb2F0MzInLFxyXG59O1xyXG5cclxuY29uc3QgX2NvbXBUeXBlMndyaXRlID0ge1xyXG4gICAgNTEyMDogJ3NldEludDgnLFxyXG4gICAgNTEyMTogJ3NldFVpbnQ4JyxcclxuICAgIDUxMjI6ICdzZXRJbnQxNicsXHJcbiAgICA1MTIzOiAnc2V0VWludDE2JyxcclxuICAgIDUxMjQ6ICdzZXRJbnQzMicsXHJcbiAgICA1MTI1OiAnc2V0VWludDMyJyxcclxuICAgIDUxMjY6ICdzZXRGbG9hdDMyJyxcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGFWaWV3I0VuZGlhbm5lc3NcclxuY29uc3QgbGl0dGxlRW5kaWFuID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoMik7XHJcbiAgICBuZXcgRGF0YVZpZXcoYnVmZmVyKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpO1xyXG4gICAgLy8gSW50MTZBcnJheSB1c2VzIHRoZSBwbGF0Zm9ybSdzIGVuZGlhbm5lc3MuXHJcbiAgICByZXR1cm4gbmV3IEludDE2QXJyYXkoYnVmZmVyKVswXSA9PT0gMjU2O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiogQG1vZHVsZSBjY1xyXG4qL1xyXG4vKipcclxuICogISNlbiBNZXNoIEFzc2V0LlxyXG4gKiAhI3poIOe9keagvOi1hOa6kOOAglxyXG4gKiBAY2xhc3MgTWVzaFxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKiBAdXNlcyBFdmVudFRhcmdldFxyXG4gKi9cclxubGV0IE1lc2ggPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTWVzaCcsXHJcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcclxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IChiaW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IEFycmF5QnVmZmVyLmlzVmlldyhiaW4pID8gYmluLmJ1ZmZlciA6IGJpbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFdpdGhCdWZmZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF92ZXJ0ZXhCdW5kbGVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IFZlcnRleEJ1bmRsZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX3ByaW1pdGl2ZXM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgUHJpbWl0aXZlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfbWluUG9zOiBjYy52MygpLFxyXG4gICAgICAgIF9tYXhQb3M6IGNjLnYzKCksXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gR2V0IGlyIHNldCB0aGUgc3ViIG1lc2hlcy5cclxuICAgICAgICAgKiAhI3poIOiuvue9ruaIluiAheiOt+WPluWtkOe9keagvOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7W0lucHV0QXNzZW1ibGVyXX0gc3ViTWVzaGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3ViTWVzaGVzOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViTWVzaGVzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N1Yk1lc2hlcyA9IHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdWJEYXRhcyA6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJEYXRhcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3ViTWVzaGVzID0gW107XHJcbiAgICAgICAgdGhpcy5fc3ViRGF0YXMgPSBbXTtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0V2l0aEJ1ZmZlciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3ViTWVzaGVzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxldCBwcmltaXRpdmVzID0gdGhpcy5fcHJpbWl0aXZlcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByaW1pdGl2ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHByaW1pdGl2ZSA9IHByaW1pdGl2ZXNbaV07XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBpYlxyXG4gICAgICAgICAgICBsZXQgaWJyYW5nZSA9IHByaW1pdGl2ZS5kYXRhO1xyXG4gICAgICAgICAgICBsZXQgaWJEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmZmVyLCBpYnJhbmdlLm9mZnNldCwgaWJyYW5nZS5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmJcclxuICAgICAgICAgICAgbGV0IHZlcnRleEJ1bmRsZSA9IHRoaXMuX3ZlcnRleEJ1bmRsZXNbcHJpbWl0aXZlLnZlcnRleEJ1bmRsZUluZGljZXNbMF1dO1xyXG4gICAgICAgICAgICBsZXQgdmJSYW5nZSA9IHZlcnRleEJ1bmRsZS5kYXRhO1xyXG4gICAgICAgICAgICBsZXQgZ2Z4VkZtdCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KHZlcnRleEJ1bmRsZS5mb3JtYXRzKTtcclxuICAgICAgICAgICAgLy8gTWVzaCBiaW5hcnkgbWF5IGhhdmUgc2V2ZXJhbCBkYXRhIGZvcm1hdCwgbXVzdCB1c2UgVWludDhBcnJheSB0byBzdG9yZSBkYXRhLlxyXG4gICAgICAgICAgICBsZXQgdmJEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5fYnVmZmVyLCB2YlJhbmdlLm9mZnNldCwgdmJSYW5nZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGNhbkJhdGNoID0gdGhpcy5fY2FuVmVydGV4Rm9ybWF0QmF0Y2goZ2Z4VkZtdCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVzaERhdGEgPSBuZXcgTWVzaERhdGEoKTtcclxuICAgICAgICAgICAgbWVzaERhdGEudkRhdGEgPSB2YkRhdGE7XHJcbiAgICAgICAgICAgIG1lc2hEYXRhLmlEYXRhID0gaWJEYXRhO1xyXG4gICAgICAgICAgICBtZXNoRGF0YS52Zm0gPSBnZnhWRm10O1xyXG4gICAgICAgICAgICBtZXNoRGF0YS5vZmZzZXQgPSB2YlJhbmdlLm9mZnNldDtcclxuICAgICAgICAgICAgbWVzaERhdGEuY2FuQmF0Y2ggPSBjYW5CYXRjaDtcclxuICAgICAgICAgICAgdGhpcy5fc3ViRGF0YXMucHVzaChtZXNoRGF0YSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNoRGF0YS52RGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViTWVzaGVzLnB1c2gobmV3IElucHV0QXNzZW1ibGVyKG51bGwsIG51bGwpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YkJ1ZmZlciA9IG5ldyBnZnguVmVydGV4QnVmZmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmRldmljZSxcclxuICAgICAgICAgICAgICAgICAgICBnZnhWRm10LFxyXG4gICAgICAgICAgICAgICAgICAgIGdmeC5VU0FHRV9TVEFUSUMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmJEYXRhXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgaWJCdWZmZXIgPSBuZXcgZ2Z4LkluZGV4QnVmZmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyLmRldmljZSxcclxuICAgICAgICAgICAgICAgICAgICBwcmltaXRpdmUuaW5kZXhVbml0LFxyXG4gICAgICAgICAgICAgICAgICAgIGdmeC5VU0FHRV9TVEFUSUMsXHJcbiAgICAgICAgICAgICAgICAgICAgaWJEYXRhXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgc3ViIG1lc2hlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ViTWVzaGVzLnB1c2gobmV3IElucHV0QXNzZW1ibGVyKHZiQnVmZmVyLCBpYkJ1ZmZlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVtaXQoJ2xvYWQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NhblZlcnRleEZvcm1hdEJhdGNoIChmb3JtYXQpIHtcclxuICAgICAgICBsZXQgYVBvc2l0aW9uID0gZm9ybWF0Ll9hdHRyMmVsW2dmeC5BVFRSX1BPU0lUSU9OXTtcclxuICAgICAgICBsZXQgY2FuQmF0Y2ggPSAhYVBvc2l0aW9uIHx8IFxyXG4gICAgICAgICAgICAoYVBvc2l0aW9uLnR5cGUgPT09IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiAmJiBcclxuICAgICAgICAgICAgZm9ybWF0Ll9ieXRlcyAlIDQgPT09IDApO1xyXG4gICAgICAgIHJldHVybiBjYW5CYXRjaDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbml0IHZlcnRleCBidWZmZXIgYWNjb3JkaW5nIHRvIHRoZSB2ZXJ0ZXggZm9ybWF0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog5qC55o2u6aG254K55qC85byP5Yid5aeL5YyW6aG254K55YaF5a2Y44CCXHJcbiAgICAgKiBAbWV0aG9kIGluaXRcclxuICAgICAqIEBwYXJhbSB7Z2Z4LlZlcnRleEZvcm1hdH0gdmVydGV4Rm9ybWF0IC0gdmVydGV4IGZvcm1hdFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZlcnRleENvdW50IC0gaG93IG11Y2ggdmVydGV4IHNob3VsZCBiZSBjcmVhdGUgaW4gdGhpcyBidWZmZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkeW5hbWljXSAtIHdoZXRoZXIgb3Igbm90IHRvIHVzZSBkeW5hbWljIGJ1ZmZlci5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2luZGV4XVxyXG4gICAgICovXHJcbiAgICBpbml0ICh2ZXJ0ZXhGb3JtYXQsIHZlcnRleENvdW50LCBkeW5hbWljID0gZmFsc2UsIGluZGV4ID0gMCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkodmVydGV4Rm9ybWF0Ll9ieXRlcyAqIHZlcnRleENvdW50KTtcclxuICAgICAgICBsZXQgbWVzaERhdGEgPSBuZXcgTWVzaERhdGEoKTtcclxuICAgICAgICBtZXNoRGF0YS52RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgbWVzaERhdGEudmZtID0gdmVydGV4Rm9ybWF0O1xyXG4gICAgICAgIG1lc2hEYXRhLnZEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgbWVzaERhdGEuY2FuQmF0Y2ggPSB0aGlzLl9jYW5WZXJ0ZXhGb3JtYXRCYXRjaCh2ZXJ0ZXhGb3JtYXQpO1xyXG5cclxuICAgICAgICBpZiAoIShDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YiA9IG5ldyBnZnguVmVydGV4QnVmZmVyKFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyZXIuZGV2aWNlLFxyXG4gICAgICAgICAgICAgICAgdmVydGV4Rm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgZHluYW1pYyA/IGdmeC5VU0FHRV9EWU5BTUlDIDogZ2Z4LlVTQUdFX1NUQVRJQyxcclxuICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBtZXNoRGF0YS52YiA9IHZiOyBcclxuICAgICAgICAgICAgdGhpcy5fc3ViTWVzaGVzW2luZGV4XSA9IG5ldyBJbnB1dEFzc2VtYmxlcihtZXNoRGF0YS52Yik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2xkU3ViRGF0YSA9IHRoaXMuX3N1YkRhdGFzW2luZGV4XTtcclxuICAgICAgICBpZiAob2xkU3ViRGF0YSkge1xyXG4gICAgICAgICAgICBpZiAob2xkU3ViRGF0YS52Yikge1xyXG4gICAgICAgICAgICAgICAgb2xkU3ViRGF0YS52Yi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9sZFN1YkRhdGEuaWIpIHtcclxuICAgICAgICAgICAgICAgIG9sZFN1YkRhdGEuaWIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdWJEYXRhc1tpbmRleF0gPSBtZXNoRGF0YTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdsb2FkJyk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCdpbml0LWZvcm1hdCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldCB0aGUgdmVydGV4IHZhbHVlcy5cclxuICAgICAqICEjemggXHJcbiAgICAgKiDorr7nva7pobbngrnmlbDmja5cclxuICAgICAqIEBtZXRob2Qgc2V0VmVydGljZXNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdGhlIGF0dHJpYnV0ZSBuYW1lLCBlLmcuIGdmeC5BVFRSX1BPU0lUSU9OXHJcbiAgICAgKiBAcGFyYW0ge1tWZWMyXSB8IFtWZWMzXSB8IFtDb2xvcl0gfCBbTnVtYmVyXSB8IFVpbnQ4QXJyYXkgfCBGbG9hdDMyQXJyYXl9IHZhbHVlcyAtIHRoZSB2ZXJ0ZXggdmFsdWVzXHJcbiAgICAgKi9cclxuICAgIHNldFZlcnRpY2VzIChuYW1lLCB2YWx1ZXMsIGluZGV4KSB7XHJcbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xyXG4gICAgICAgIGxldCBzdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbaW5kZXhdO1xyXG5cclxuICAgICAgICBsZXQgZWwgPSBzdWJEYXRhLnZmbS5lbGVtZW50KG5hbWUpO1xyXG4gICAgICAgIGlmICghZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLndhcm4oYENhbm5vdCBmaW5kICR7bmFtZX0gYXR0cmlidXRlIGluIHZlcnRleCBkZWZpbmVzLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hldGhlciB0aGUgdmFsdWVzIGlzIGV4cGFuZGVkXHJcbiAgICAgICAgbGV0IGlzRmxhdE1vZGUgPSB0eXBlb2YgdmFsdWVzWzBdID09PSAnbnVtYmVyJztcclxuXHJcbiAgICAgICAgbGV0IGVsTnVtID0gZWwubnVtO1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlc0NvdW50ID0gaXNGbGF0TW9kZSA/ICgodmFsdWVzLmxlbmd0aCAvIGVsTnVtKSB8IDApIDogdmFsdWVzLmxlbmd0aDtcclxuICAgICAgICBpZiAoc3ViRGF0YS52RGF0YS5ieXRlTGVuZ3RoIDwgdmVydGljZXNDb3VudCAqIGVsLnN0cmlkZSkge1xyXG4gICAgICAgICAgICBzdWJEYXRhLnNldFZEYXRhKG5ldyBVaW50OEFycmF5KHZlcnRpY2VzQ291bnQgKiBzdWJEYXRhLnZmbS5fYnl0ZXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBkYXRhO1xyXG4gICAgICAgIGxldCBieXRlcyA9IDQ7XHJcbiAgICAgICAgaWYgKG5hbWUgPT09IGdmeC5BVFRSX0NPTE9SKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNGbGF0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHN1YkRhdGEuZ2V0VkRhdGEoVWludDMyQXJyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHN1YkRhdGEuZ2V0VkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJ5dGVzID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBzdWJEYXRhLmdldFZEYXRhKEZsb2F0MzJBcnJheSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3RyaWRlID0gZWwuc3RyaWRlIC8gYnl0ZXM7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IGVsLm9mZnNldCAvIGJ5dGVzO1xyXG5cclxuICAgICAgICBpZiAoaXNGbGF0TW9kZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9ICh2YWx1ZXMubGVuZ3RoIC8gZWxOdW0pOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc09mZnNldCA9IGkgKiBlbE51bTtcclxuICAgICAgICAgICAgICAgIGxldCBkT2Zmc2V0ID0gaSAqIHN0cmlkZSArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxOdW07IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbZE9mZnNldCArIGpdID0gdmFsdWVzW3NPZmZzZXQgKyBqXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGFwcGx5RnVuYztcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IGdmeC5BVFRSX0NPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICBhcHBseUZ1bmMgPSBhcHBseUNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsTnVtID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlGdW5jID0gYXBwbHlWZWMyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlGdW5jID0gYXBwbHlWZWMzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZPZmZzZXQgPSBpICogc3RyaWRlICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgYXBwbHlGdW5jKGRhdGEsIHZPZmZzZXQsIHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1YkRhdGEudkRpcnR5ID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgdGhlIHN1YiBtZXNoIGluZGljZXMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva7lrZDnvZHmoLzntKLlvJXjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0SW5kaWNlc1xyXG4gICAgICogQHBhcmFtIHtbTnVtYmVyXXxVaW50MTZBcnJheXxVaW50OEFycmF5fSBpbmRpY2VzIC0gdGhlIHN1YiBtZXNoIGluZGljZXMuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4XSAtIHN1YiBtZXNoIGluZGV4LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbZHluYW1pY10gLSB3aGV0aGVyIG9yIG5vdCB0byB1c2UgZHluYW1pYyBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIHNldEluZGljZXMgKGluZGljZXMsIGluZGV4LCBkeW5hbWljKSB7XHJcbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xyXG5cclxuICAgICAgICBsZXQgaURhdGEgPSBpbmRpY2VzO1xyXG4gICAgICAgIGlmIChpbmRpY2VzIGluc3RhbmNlb2YgVWludDE2QXJyYXkpIHtcclxuICAgICAgICAgICAgaURhdGEgPSBuZXcgVWludDhBcnJheShpbmRpY2VzLmJ1ZmZlciwgaW5kaWNlcy5ieXRlT2Zmc2V0LCBpbmRpY2VzLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGluZGljZXMpKSB7XHJcbiAgICAgICAgICAgIGlEYXRhID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgICAgICAgICBpRGF0YSA9IG5ldyBVaW50OEFycmF5KGlEYXRhLmJ1ZmZlciwgaURhdGEuYnl0ZU9mZnNldCwgaURhdGEuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdXNhZ2UgPSBkeW5hbWljID8gZ2Z4LlVTQUdFX0RZTkFNSUMgOiBnZnguVVNBR0VfU1RBVElDO1xyXG5cclxuICAgICAgICBsZXQgc3ViRGF0YSA9IHRoaXMuX3N1YkRhdGFzW2luZGV4XTtcclxuICAgICAgICBpZiAoIXN1YkRhdGEuaWIpIHtcclxuICAgICAgICAgICAgc3ViRGF0YS5pRGF0YSA9IGlEYXRhO1xyXG4gICAgICAgICAgICBpZiAoIShDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gbmV3IGdmeC5JbmRleEJ1ZmZlcihcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJlci5kZXZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2Z4LklOREVYX0ZNVF9VSU5UMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaURhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgaURhdGEuYnl0ZUxlbmd0aCAvIGdmeC5JbmRleEJ1ZmZlci5CWVRFU19QRVJfSU5ERVhbZ2Z4LklOREVYX0ZNVF9VSU5UMTZdXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1YkRhdGEuaWIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJNZXNoZXNbaW5kZXhdLl9pbmRleEJ1ZmZlciA9IHN1YkRhdGEuaWI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YkRhdGEuaURhdGEgPSBpRGF0YTtcclxuICAgICAgICAgICAgc3ViRGF0YS5pRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgdGhlIHN1YiBtZXNoIHByaW1pdGl2ZSB0eXBlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6+572u5a2Q572R5qC857uY5Yi257q/5p2h55qE5pa55byP44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFByaW1pdGl2ZVR5cGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0eXBlIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFxyXG4gICAgICovXHJcbiAgICBzZXRQcmltaXRpdmVUeXBlICh0eXBlLCBpbmRleCkge1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcclxuICAgICAgICBsZXQgc3ViTWVzaCA9IHRoaXMuX3N1Yk1lc2hlc1tpbmRleF07XHJcbiAgICAgICAgaWYgKCFzdWJNZXNoKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oYERvIG5vdCBoYXZlIHN1YiBtZXNoIGF0IGluZGV4ICR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ViTWVzaGVzW2luZGV4XS5fcHJpbWl0aXZlVHlwZSA9IHR5cGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBcclxuICAgICAqICEjZW5cclxuICAgICAqIENsZWFyIHRoZSBidWZmZXIgZGF0YS5cclxuICAgICAqICEjemhcclxuICAgICAqIOa4hemZpOe9keagvOWIm+W7uueahOWGheWtmOaVsOaNruOAglxyXG4gICAgICogQG1ldGhvZCBjbGVhclxyXG4gICAgKi9cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9zdWJNZXNoZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGV0IHN1YkRhdGFzID0gdGhpcy5fc3ViRGF0YXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHN1YkRhdGFzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2YiA9IHN1YkRhdGFzW2ldLnZiO1xyXG4gICAgICAgICAgICBpZiAodmIpIHtcclxuICAgICAgICAgICAgICAgIHZiLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGliID0gc3ViRGF0YXNbaV0uaWI7XHJcbiAgICAgICAgICAgIGlmIChpYikge1xyXG4gICAgICAgICAgICAgICAgaWIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1YkRhdGFzLmxlbmd0aCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgbWVzaCBib3VuZGluZyBib3hcclxuICAgICAqICEjemgg6K6+572u572R5qC855qE5YyF5Zu055uSXHJcbiAgICAgKiBAbWV0aG9kIHNldEJvdW5kaW5nQm94XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pbiBcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4IFxyXG4gICAgICovXHJcbiAgICBzZXRCb3VuZGluZ0JveCAobWluLCBtYXgpIHtcclxuICAgICAgICB0aGlzLl9taW5Qb3MgPSBtaW47XHJcbiAgICAgICAgdGhpcy5fbWF4UG9zID0gbWF4O1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95ICgpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGxvYWREYXRhICgpIHtcclxuICAgICAgICBsZXQgc3ViRGF0YXMgPSB0aGlzLl9zdWJEYXRhcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc3ViRGF0YXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHN1YkRhdGEgPSBzdWJEYXRhc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdWJEYXRhLnZEaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHN1YkRhdGEudmIsIGRhdGEgPSBzdWJEYXRhLnZEYXRhO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnVwZGF0ZSgwLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHN1YkRhdGEudkRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdWJEYXRhLmlEaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IHN1YkRhdGEuaWIsIGRhdGEgPSBzdWJEYXRhLmlEYXRhO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyLnVwZGF0ZSgwLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHN1YkRhdGEuaURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRBdHRyTWVzaERhdGEgKHN1YkRhdGFJbmRleCwgbmFtZSkge1xyXG4gICAgICAgIGxldCBzdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbc3ViRGF0YUluZGV4XTtcclxuICAgICAgICBpZiAoIXN1YkRhdGEpIHJldHVybiBbXTtcclxuXHJcbiAgICAgICAgbGV0IGZvcm1hdCA9IHN1YkRhdGEudmZtO1xyXG4gICAgICAgIGxldCBmbXQgPSBmb3JtYXQuZWxlbWVudChuYW1lKTtcclxuICAgICAgICBpZiAoIWZtdCkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICBpZiAoIXN1YkRhdGEuYXR0ckRhdGFzKSB7XHJcbiAgICAgICAgICAgIHN1YkRhdGEuYXR0ckRhdGFzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdHRyRGF0YXMgPSBzdWJEYXRhLmF0dHJEYXRhcztcclxuICAgICAgICBsZXQgZGF0YSA9IGF0dHJEYXRhc1tuYW1lXTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBhdHRyRGF0YXNbbmFtZV0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2YkRhdGEgPSBzdWJEYXRhLnZEYXRhO1xyXG4gICAgICAgIGxldCBkdiA9IG5ldyBEYXRhVmlldyh2YkRhdGEuYnVmZmVyLCB2YkRhdGEuYnl0ZU9mZnNldCwgdmJEYXRhLmJ5dGVMZW5ndGgpO1xyXG5cclxuICAgICAgICBsZXQgc3RyaWRlID0gZm10LnN0cmlkZTtcclxuICAgICAgICBsZXQgZWxlT2Zmc2V0ID0gZm10Lm9mZnNldDtcclxuICAgICAgICBsZXQgZWxlTnVtID0gZm10Lm51bTtcclxuICAgICAgICBsZXQgZWxlQnl0ZSA9IGZtdC5ieXRlcyAvIGVsZU51bTtcclxuICAgICAgICBsZXQgZm4gPSBfY29tcFR5cGUyZm5bZm10LnR5cGVdO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhDb3VudCA9IHZiRGF0YS5ieXRlTGVuZ3RoIC8gZm9ybWF0Ll9ieXRlcztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleENvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGkgKiBzdHJpZGUgKyBlbGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZWxlTnVtOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gZHZbZm5dKG9mZnNldCArIGogKiBlbGVCeXRlLCBsaXR0bGVFbmRpYW4pO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlYWQgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzIG9mIHRoZSBzdWJncmlkIGludG8gdGhlIHRhcmdldCBidWZmZXIuXHJcbiAgICAgKiAhI3poIOivu+WPluWtkOe9keagvOeahOaMh+WumuWxnuaAp+WIsOebruagh+e8k+WGsuWMuuS4reOAglxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByaW1pdGl2ZUluZGV4IFRoZSBzdWJncmlkIGluZGV4LlxyXG7CoMKgwqDCoMKgKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBhdHRyaWJ1dGUgbmFtZS5cclxuwqDCoMKgwqDCoCogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmZmVyIFRoZSB0YXJnZXQgYnVmZmVyLlxyXG7CoMKgwqDCoMKgKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIFRoZSBieXRlIGludGVydmFsIGJldHdlZW4gYWRqYWNlbnQgYXR0cmlidXRlcyBpbiB0aGUgdGFyZ2V0IGJ1ZmZlci5cclxuwqDCoMKgwqDCoCogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IG9mIHRoZSBmaXJzdCBhdHRyaWJ1dGUgaW4gdGhlIHRhcmdldCBidWZmZXIuXHJcbsKgwqDCoMKgwqAqIEByZXR1cm5zIHtCb29sZWFufSBJZiB0aGUgc3BlY2lmaWVkIHN1Yi1ncmlkIGRvZXMgbm90IGV4aXN0LCB0aGUgc3ViLWdyaWQgZG9lcyBub3QgZXhpc3QsIG9yIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlIGNhbm5vdCBiZSByZWFkLCByZXR1cm4gYGZhbHNlYCwgb3RoZXJ3aXNlIHJldHVybmAgdHJ1ZWAuXHJcbiAgICAgKiBAbWV0aG9kIGNvcHlBdHRyaWJ1dGVcclxuICAgICAqL1xyXG4gICAgY29weUF0dHJpYnV0ZSAocHJpbWl0aXZlSW5kZXgsIGF0dHJpYnV0ZU5hbWUsIGJ1ZmZlciwgc3RyaWRlLCBvZmZzZXQpIHtcclxuICAgICAgICBsZXQgd3JpdHRlbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzdWJEYXRhID0gdGhpcy5fc3ViRGF0YXNbcHJpbWl0aXZlSW5kZXhdO1xyXG5cclxuICAgICAgICBpZiAoIXN1YkRhdGEpIHJldHVybiB3cml0dGVuO1xyXG5cclxuICAgICAgICBsZXQgZm9ybWF0ID0gc3ViRGF0YS52Zm07XHJcbiAgICAgICAgbGV0IGZtdCA9IGZvcm1hdC5lbGVtZW50KGF0dHJpYnV0ZU5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIWZtdCkgcmV0dXJuIHdyaXR0ZW47XHJcblxyXG4gICAgICAgIGxldCB3cml0dGVyID0gX2NvbXBUeXBlMndyaXRlW2ZtdC50eXBlXTtcclxuXHJcbiAgICAgICAgaWYgKCF3cml0dGVyKSByZXR1cm4gd3JpdHRlbjtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9nZXRBdHRyTWVzaERhdGEocHJpbWl0aXZlSW5kZXgsIGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgIGxldCB2ZXJ0ZXhDb3VudCA9IHN1YkRhdGEudkRhdGEuYnl0ZUxlbmd0aCAvIGZvcm1hdC5fYnl0ZXM7XHJcbiAgICAgICAgbGV0IGVsZUJ5dGUgPSBmbXQuYnl0ZXMgLyBmbXQubnVtO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dFZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCBvZmZzZXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgb3V0cHV0U3RyaWRlID0gc3RyaWRlO1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gZm10Lm51bTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4Q291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaSAqIG51bTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbnVtOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dE9mZnNldCA9IGluZGV4ICsgajtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvdXRwdXRPZmZzZXQgPSBvdXRwdXRTdHJpZGUgKiBpICsgZWxlQnl0ZSAqIGo7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFZpZXdbd3JpdHRlcl0ob3V0cHV0T2Zmc2V0LCBkYXRhW2lucHV0T2Zmc2V0XSwgbGl0dGxlRW5kaWFuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgd3JpdHRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd3JpdHRlbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlYWQgdGhlIGluZGV4IGRhdGEgb2YgdGhlIHN1YmdyaWQgaW50byB0aGUgdGFyZ2V0IGFycmF5LlxyXG4gICAgICogISN6aCDor7vlj5blrZDnvZHmoLznmoTntKLlvJXmlbDmja7liLDnm67moIfmlbDnu4TkuK3jgIJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcmltaXRpdmVJbmRleCBUaGUgc3ViZ3JpZCBpbmRleC5cclxuwqDCoMKgwqDCoCogQHBhcmFtIHtUeXBlZEFycmF5fSBvdXRwdXRBcnJheSBUaGUgdGFyZ2V0IGFycmF5LlxyXG7CoMKgwqDCoMKgKiBAcmV0dXJucyB7Qm9vbGVhbn0gcmV0dXJucyBgZmFsc2VgIGlmIHRoZSBzcGVjaWZpZWQgc3ViLWdyaWQgZG9lcyBub3QgZXhpc3Qgb3IgdGhlIHN1Yi1ncmlkIGRvZXMgbm90IGhhdmUgaW5kZXggZGF0YSwgb3RoZXJ3aXNlIHJldHVybnNgIHRydWVgLlxyXG4gICAgICogQG1ldGhvZCBjb3B5SW5kaWNlc1xyXG4gICAgICovXHJcbiAgICBjb3B5SW5kaWNlcyAocHJpbWl0aXZlSW5kZXgsIG91dHB1dEFycmF5KSB7XHJcbiAgICAgICAgbGV0IHN1YkRhdGEgPSB0aGlzLl9zdWJEYXRhc1twcmltaXRpdmVJbmRleF07XHJcblxyXG4gICAgICAgIGlmICghc3ViRGF0YSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBpRGF0YSA9IHN1YkRhdGEuaURhdGE7XHJcbiAgICAgICAgY29uc3QgaW5kZXhDb3VudCA9IGlEYXRhLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoaURhdGEuYnVmZmVyLCBpRGF0YS5ieXRlT2Zmc2V0LCBpRGF0YS5ieXRlTGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBmbiA9IF9jb21wVHlwZTJmbltnZnguSU5ERVhfRk1UX1VJTlQ4XTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleENvdW50OyArK2kpIHtcclxuICAgICAgICAgICAgb3V0cHV0QXJyYXlbaV0gPSBkdltmbl0oaSAqIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuTWVzaCA9IG1vZHVsZS5leHBvcnRzID0gTWVzaDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=