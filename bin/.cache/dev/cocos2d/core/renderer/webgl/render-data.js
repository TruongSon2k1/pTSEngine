
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/render-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = RenderData;

var _flexBuffer = _interopRequireDefault(require("./flex-buffer"));

var _vertexFormat = require("./vertex-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RenderData() {
  this.vDatas = [];
  this.uintVDatas = [];
  this.iDatas = [];
  this.meshCount = 0;
  this._infos = null;
  this._flexBuffer = null;
}

cc.js.mixin(RenderData.prototype, {
  init: function init(assembler) {},
  clear: function clear() {
    this.vDatas.length = 0;
    this.iDatas.length = 0;
    this.uintVDatas.length = 0;
    this.meshCount = 0;
    this._infos = null;

    if (this._flexBuffer) {
      this._flexBuffer.reset();
    }
  },
  updateMesh: function updateMesh(index, vertices, indices) {
    this.vDatas[index] = vertices;
    this.uintVDatas[index] = new Uint32Array(vertices.buffer, 0, vertices.length);
    this.iDatas[index] = indices;
    this.meshCount = this.vDatas.length;
  },
  updateMeshRange: function updateMeshRange(verticesCount, indicesCount) {},
  createData: function createData(index, verticesFloats, indicesCount) {
    var vertices = new Float32Array(verticesFloats);
    var indices = new Uint16Array(indicesCount);
    this.updateMesh(index, vertices, indices);
  },
  createQuadData: function createQuadData(index, verticesFloats, indicesCount) {
    this.createData(index, verticesFloats, indicesCount);
    this.initQuadIndices(this.iDatas[index]);
  },
  createFlexData: function createFlexData(index, verticesFloats, indicesCount, vfmt) {
    vfmt = vfmt || _vertexFormat.vfmtPosUvColor;
    this._flexBuffer = new _flexBuffer["default"](this, index, verticesFloats, indicesCount, vfmt);
  },
  initQuadIndices: function initQuadIndices(indices) {
    var count = indices.length / 6;

    for (var i = 0, idx = 0; i < count; i++) {
      var vertextID = i * 4;
      indices[idx++] = vertextID;
      indices[idx++] = vertextID + 1;
      indices[idx++] = vertextID + 2;
      indices[idx++] = vertextID + 1;
      indices[idx++] = vertextID + 3;
      indices[idx++] = vertextID + 2;
    }
  }
});
cc.RenderData = RenderData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxccmVuZGVyLWRhdGEuanMiXSwibmFtZXMiOlsiUmVuZGVyRGF0YSIsInZEYXRhcyIsInVpbnRWRGF0YXMiLCJpRGF0YXMiLCJtZXNoQ291bnQiLCJfaW5mb3MiLCJfZmxleEJ1ZmZlciIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsImluaXQiLCJhc3NlbWJsZXIiLCJjbGVhciIsImxlbmd0aCIsInJlc2V0IiwidXBkYXRlTWVzaCIsImluZGV4IiwidmVydGljZXMiLCJpbmRpY2VzIiwiVWludDMyQXJyYXkiLCJidWZmZXIiLCJ1cGRhdGVNZXNoUmFuZ2UiLCJ2ZXJ0aWNlc0NvdW50IiwiaW5kaWNlc0NvdW50IiwiY3JlYXRlRGF0YSIsInZlcnRpY2VzRmxvYXRzIiwiRmxvYXQzMkFycmF5IiwiVWludDE2QXJyYXkiLCJjcmVhdGVRdWFkRGF0YSIsImluaXRRdWFkSW5kaWNlcyIsImNyZWF0ZUZsZXhEYXRhIiwidmZtdCIsInZmbXRQb3NVdkNvbG9yIiwiRmxleEJ1ZmZlciIsImNvdW50IiwiaSIsImlkeCIsInZlcnRleHRJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRWUsU0FBU0EsVUFBVCxHQUF1QjtBQUNsQyxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFFQSxPQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLE9BQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDSDs7QUFFREMsRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWVQsVUFBVSxDQUFDVSxTQUF2QixFQUFrQztBQUM5QkMsRUFBQUEsSUFEOEIsZ0JBQ3hCQyxTQUR3QixFQUNiLENBQ2hCLENBRjZCO0FBRzlCQyxFQUFBQSxL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TUFBQUEsT0FBTyxDQUFDa0IsR0FBRyxFQUFKLENBQVAsR0FBaUJDLFNBQVMsR0FBQyxDQUEzQjtBQUNBbkIsTUFBQUEsT0FBTyxDQUFDa0IsR0FBRyxFQUFKLENBQVAsR0FBaUJDLFNBQVMsR0FBQyxDQUEzQjtBQUNIO0FBQ0o7QUF0RDZCLENBQWxDO0FBeURBL0IsRUFBRSxDQUFDUCxVQUFILEdBQWdCQSxVQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGbGV4QnVmZmVyIGZyb20gXCIuL2ZsZXgtYnVmZmVyXCI7XHJcbmltcG9ydCB7IHZmbXRQb3NVdkNvbG9yIH0gZnJvbSAnLi92ZXJ0ZXgtZm9ybWF0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlbmRlckRhdGEgKCkge1xyXG4gICAgdGhpcy52RGF0YXMgPSBbXTtcclxuICAgIHRoaXMudWludFZEYXRhcyA9IFtdO1xyXG4gICAgdGhpcy5pRGF0YXMgPSBbXTtcclxuICAgIHRoaXMubWVzaENvdW50ID0gMDtcclxuXHJcbiAgICB0aGlzLl9pbmZvcyA9IG51bGw7XHJcbiAgICB0aGlzLl9mbGV4QnVmZmVyID0gbnVsbDtcclxufVxyXG5cclxuY2MuanMubWl4aW4oUmVuZGVyRGF0YS5wcm90b3R5cGUsIHtcclxuICAgIGluaXQgKGFzc2VtYmxlcikge1xyXG4gICAgfSxcclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLnZEYXRhcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuaURhdGFzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy51aW50VkRhdGFzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tZXNoQ291bnQgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9pbmZvcyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mbGV4QnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZsZXhCdWZmZXIucmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZU1lc2ggKGluZGV4LCB2ZXJ0aWNlcywgaW5kaWNlcykge1xyXG4gICAgICAgIHRoaXMudkRhdGFzW2luZGV4XSA9IHZlcnRpY2VzO1xyXG4gICAgICAgIHRoaXMudWludFZEYXRhc1tpbmRleF0gPSBuZXcgVWludDMyQXJyYXkodmVydGljZXMuYnVmZmVyLCAwLCB2ZXJ0aWNlcy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuaURhdGFzW2luZGV4XSA9IGluZGljZXM7XHJcbiAgICBcclxuICAgICAgICB0aGlzLm1lc2hDb3VudCA9IHRoaXMudkRhdGFzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTWVzaFJhbmdlICh2ZXJ0aWNlc0NvdW50LCBpbmRpY2VzQ291bnQpIHtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNyZWF0ZURhdGEgKGluZGV4LCB2ZXJ0aWNlc0Zsb2F0cywgaW5kaWNlc0NvdW50KSB7XHJcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlc0Zsb2F0cyk7XHJcbiAgICAgICAgbGV0IGluZGljZXMgPSBuZXcgVWludDE2QXJyYXkoaW5kaWNlc0NvdW50KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1lc2goaW5kZXgsIHZlcnRpY2VzLCBpbmRpY2VzKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGNyZWF0ZVF1YWREYXRhIChpbmRleCwgdmVydGljZXNGbG9hdHMsIGluZGljZXNDb3VudCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRGF0YShpbmRleCwgdmVydGljZXNGbG9hdHMsIGluZGljZXNDb3VudCk7XHJcbiAgICAgICAgdGhpcy5pbml0UXVhZEluZGljZXModGhpcy5pRGF0YXNbaW5kZXhdKTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlRmxleERhdGEgKGluZGV4LCB2ZXJ0aWNlc0Zsb2F0cywgaW5kaWNlc0NvdW50LCB2Zm10KSB7XHJcbiAgICAgICAgdmZtdCA9IHZmbXQgfHwgdmZtdFBvc1V2Q29sb3I7XHJcbiAgICAgICAgdGhpcy5fZmxleEJ1ZmZlciA9IG5ldyBGbGV4QnVmZmVyKHRoaXMsIGluZGV4LCB2ZXJ0aWNlc0Zsb2F0cywgaW5kaWNlc0NvdW50LCB2Zm10KTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFF1YWRJbmRpY2VzKGluZGljZXMpIHtcclxuICAgICAgICBsZXQgY291bnQgPSBpbmRpY2VzLmxlbmd0aCAvIDY7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlkeCA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXh0SUQgPSBpICogNDtcclxuICAgICAgICAgICAgaW5kaWNlc1tpZHgrK10gPSB2ZXJ0ZXh0SUQ7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzE7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzI7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzE7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzM7XHJcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuY2MuUmVuZGVyRGF0YSA9IFJlbmRlckRhdGE7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==