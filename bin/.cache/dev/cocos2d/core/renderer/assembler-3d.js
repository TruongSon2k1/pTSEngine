
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-3d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vertexFormat = require("./webgl/vertex-format");

var _vec = _interopRequireDefault(require("../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var vec3_temps = [];

for (var i = 0; i < 4; i++) {
  vec3_temps.push(cc.v3());
}

var Assembler3D = {
  floatsPerVert: 6,
  uvOffset: 3,
  colorOffset: 5,
  getBuffer: function getBuffer(renderer) {
    return renderer._meshBuffer3D;
  },
  getVfmt: function getVfmt() {
    return _vertexFormat.vfmt3D;
  },
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];

    _vec["default"].set(vec3_temps[0], local[0], local[1], 0);

    _vec["default"].set(vec3_temps[1], local[2], local[1], 0);

    _vec["default"].set(vec3_temps[2], local[0], local[3], 0);

    _vec["default"].set(vec3_temps[3], local[2], local[3], 0);

    var floatsPerVert = this.floatsPerVert;

    for (var _i = 0; _i < 4; _i++) {
      var vertex = vec3_temps[_i];

      _vec["default"].transformMat4(vertex, vertex, matrix);

      var dstOffset = floatsPerVert * _i;
      world[dstOffset] = vertex.x;
      world[dstOffset + 1] = vertex.y;
      world[dstOffset + 2] = vertex.z;
    }
  }
};
cc.Assembler3D = Assembler3D;
var _default = Assembler3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxhc3NlbWJsZXItM2QuanMiXSwibmFtZXMiOlsidmVjM190ZW1wcyIsImkiLCJwdXNoIiwiY2MiLCJ2MyIsIkFzc2VtYmxlcjNEIiwiZmxvYXRzUGVyVmVydCIsInV2T2Zmc2V0IiwiY29sb3JPZmZzZXQiLCJnZXRCdWZmZXIiLCJyZW5kZXJlciIsIl9tZXNoQnVmZmVyM0QiLCJnZXRWZm10IiwidmZtdDNEIiwidXBkYXRlV29ybGRWZXJ0cyIsImNvbXAiLCJtYXRyaXgiLCJub2RlIiwiX3dvcmxkTWF0cml4IiwibG9jYWwiLCJfbG9jYWwiLCJ3b3JsZCIsIl9yZW5kZXJEYXRhIiwidkRhdGFzIiwiVmVjMyIsInNldCIsInZlcnRleCIsInRyYW5zZm9ybU1hdDQiLCJkc3RPZmZzZXQiLCJ4IiwieSIsInoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQUlBLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEJELEVBQUFBLFVBQVUsQ0FBQ0UsSUFBWCxDQUFnQkMsRUFBRSxDQUFDQyxFQUFILEVBQWhCO0FBQ0g7O0FBRUQsSUFBSUMsV0FBVyxHQUFHO0FBQ2RDLEVBQUFBLGFBQWEsRUFBRSxDQUREO0FBR2RDLEVBQUFBLFFBQVEsRUFBRSxDQUhJO0FBSWRDLEVBQUFBLFdBQVcsRUFBRSxDQUpDO0FBTWRDLEVBQUFBLFNBTmMscUJBTUhDLFFBTkcsRUFNTztBQUNqQixXQUFPQSxRQUFRLENBQUNDLGFBQWhCO0FBQ0gsR0FSYTtBQVVkQyxFQUFBQSxPQVZjLHFCQVVIO0FBQ1AsV0FBT0Msb0JBQVA7QUFDSCxHQVphO0FBY2RDLEVBQUFBLGdCQWRjLDRCQWNJQyxJQWRKLEVBY1U7QUFDcEIsUUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLElBQUwsQ0FBVUMsWUFBdkI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjs7QUFFQUMsb0JBQUtDLEdBQUwsQ0FBU3pCLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCbUIsS0FBSyxDQUFDLENBQUQsQ0FBN0IsRUFBa0NBLEtBQUssQ0FBQyxDQUFELENBQXZDLEVBQTRDLENBQTVDOztBQUNBSyxvQkFBS0MsR0FBTCxDQUFTekIsVUFBVSxDQUFDLENBQUQsQ0FBbkIsRUFBd0JtQixLQUFLLENBQUMsQ0FBRCxDQUE3QixFQUFrQ0EsS0FBSyxDQUFDLENBQUQsQ0FBdkMsRUFBNEMsQ0FBNUM7O0FBQ0FLLG9CQUFLQyxHQUFMLENBQVN6QixVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3Qm1CLEtBQUssQ0FBQyxDQUFELENBQTdCLEVBQWtDQSxLQUFLLENBQUMsQ0FBRCxDQUF2QyxFQUE0QyxDQUE1Qzs7QUFDQUssb0JBQUtDLEdBQUwsQ0FBU3pCLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCbUIsS0FBSyxDQUFDLENBQUQsQ0FBN0IsRUFBa0NBLEtBQUssQ0FBQyxDQUFELENBQXZDLEVBQTRDLENBQTVDOztBQUVBLFFBQUliLGFBQWEsR0FBRyxLQUFLQSxhQUF6Qjs7QUFDQSxTQUFLLElBQUlMLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLEVBQUMsRUFBeEIsRUFBNEI7QUFDeEIsVUFBSXlCLE1BQU0sR0FBRzFCLFVBQVUsQ0FBQ0MsRUFBRCxDQUF2Qjs7QUFDQXVCLHNCQUFLRyxhQUFMLENBQW1CRCxNQUFuQixFQUEyQkEsTUFBM0IsRUFBbUNWLE1BQW5DOztBQUVBLFVBQUlZLFNBQVMsR0FBR3RCLGFBQWEsR0FBR0wsRUFBaEM7QUFDQW9CLE1BQUFBLEtBQUssQ0FBQ08sU0FBRCxDQUFMLEdBQW1CRixNQUFNLENBQUNHLENBQTFCO0FBQ0FSLE1BQUFBLEtBQUssQ0FBQ08sU0FBUyxHQUFDLENBQVgsQ0FBTCxHQUFxQkYsTUFBTSxDQUFDSSxDQUE1QjtBQUNBVCxNQUFBQSxLQUFLLENBQUNPLFNBQVMsR0FBQyxDQUFYLENBQUwsR0FBcUJGLE1BQU0sQ0FBQ0ssQ0FBNUI7QUFDSDtBQUNKO0FBbENhLENBQWxCO0FBcUNBNUIsRUFBRSxDQUFDRSxXQUFILEdBQWlCQSxXQUFqQjtlQUNlQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZmbXQzRCB9IGZyb20gJy4vd2ViZ2wvdmVydGV4LWZvcm1hdCc7XHJcbmltcG9ydCBWZWMzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5cclxubGV0IHZlYzNfdGVtcHMgPSBbXTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgIHZlYzNfdGVtcHMucHVzaChjYy52MygpKTtcclxufVxyXG5cclxubGV0IEFzc2VtYmxlcjNEID0ge1xyXG4gICAgZmxvYXRzUGVyVmVydDogNixcclxuXHJcbiAgICB1dk9mZnNldDogMyxcclxuICAgIGNvbG9yT2Zmc2V0OiA1LFxyXG5cclxuICAgIGdldEJ1ZmZlciAocmVuZGVyZXIpIHtcclxuICAgICAgICByZXR1cm4gcmVuZGVyZXIuX21lc2hCdWZmZXIzRDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VmZtdCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHZmbXQzRDtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlV29ybGRWZXJ0cyAoY29tcCkge1xyXG4gICAgICAgIGxldCBtYXRyaXggPSBjb21wLm5vZGUuX3dvcmxkTWF0cml4O1xyXG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xyXG4gICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcHNbMF0sIGxvY2FsWzBdLCBsb2NhbFsxXSwgMCk7XHJcbiAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1sxXSwgbG9jYWxbMl0sIGxvY2FsWzFdLCAwKTtcclxuICAgICAgICBWZWMzLnNldCh2ZWMzX3RlbXBzWzJdLCBsb2NhbFswXSwgbG9jYWxbM10sIDApO1xyXG4gICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcHNbM10sIGxvY2FsWzJdLCBsb2NhbFszXSwgMCk7XHJcblxyXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXggPSB2ZWMzX3RlbXBzW2ldO1xyXG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQodmVydGV4LCB2ZXJ0ZXgsIG1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZHN0T2Zmc2V0ID0gZmxvYXRzUGVyVmVydCAqIGk7XHJcbiAgICAgICAgICAgIHdvcmxkW2RzdE9mZnNldF0gPSB2ZXJ0ZXgueDtcclxuICAgICAgICAgICAgd29ybGRbZHN0T2Zmc2V0KzFdID0gdmVydGV4Lnk7XHJcbiAgICAgICAgICAgIHdvcmxkW2RzdE9mZnNldCsyXSA9IHZlcnRleC56O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5jYy5Bc3NlbWJsZXIzRCA9IEFzc2VtYmxlcjNEO1xyXG5leHBvcnQgZGVmYXVsdCBBc3NlbWJsZXIzRDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=