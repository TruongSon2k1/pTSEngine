
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/state.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = require("./enums");

var _default = {
  // blend
  blend: false,
  blendSep: false,
  blendColor: 0xffffffff,
  blendEq: _enums.enums.BLEND_FUNC_ADD,
  blendAlphaEq: _enums.enums.BLEND_FUNC_ADD,
  blendSrc: _enums.enums.BLEND_ONE,
  blendDst: _enums.enums.BLEND_ZERO,
  blendSrcAlpha: _enums.enums.BLEND_ONE,
  blendDstAlpha: _enums.enums.BLEND_ZERO,
  // depth
  depthTest: false,
  depthWrite: false,
  depthFunc: _enums.enums.DS_FUNC_LESS,
  // stencil
  stencilTest: false,
  stencilSep: false,
  stencilFuncFront: _enums.enums.DS_FUNC_ALWAYS,
  stencilRefFront: 0,
  stencilMaskFront: 0xff,
  stencilFailOpFront: _enums.enums.STENCIL_OP_KEEP,
  stencilZFailOpFront: _enums.enums.STENCIL_OP_KEEP,
  stencilZPassOpFront: _enums.enums.STENCIL_OP_KEEP,
  stencilWriteMaskFront: 0xff,
  stencilFuncBack: _enums.enums.DS_FUNC_ALWAYS,
  stencilRefBack: 0,
  stencilMaskBack: 0xff,
  stencilFailOpBack: _enums.enums.STENCIL_OP_KEEP,
  stencilZFailOpBack: _enums.enums.STENCIL_OP_KEEP,
  stencilZPassOpBack: _enums.enums.STENCIL_OP_KEEP,
  stencilWriteMaskBack: 0xff,
  // cull-mode
  cullMode: _enums.enums.CULL_BACK,
  // primitive-type
  primitiveType: _enums.enums.PT_TRIANGLES,
  // bindings
  maxStream: -1,
  vertexBuffers: [],
  vertexBufferOffsets: [],
  indexBuffer: null,
  maxTextureSlot: -1,
  textureUnits: [],
  program: null
};

var State = /*#__PURE__*/function () {
  function State(device) {
    // bindings
    this.vertexBuffers = new Array(device._caps.maxVertexStreams);
    this.vertexBufferOffsets = new Array(device._caps.maxVertexStreams);
    this.textureUnits = new Array(device._caps.maxTextureUnits);
    this.set(_default);
  }

  State.initDefault = function initDefault(device) {
    _default.vertexBuffers = new Array(device._caps.maxVertexStreams);
    _default.vertexBufferOffsets = new Array(device._caps.maxVertexStreams);
    _default.textureUnits = new Array(device._caps.maxTextureUnits);
  };

  var _proto = State.prototype;

  _proto.reset = function reset() {
    this.set(_default);
  };

  _proto.set = function set(cpy) {
    // blending
    this.blend = cpy.blend;
    this.blendSep = cpy.blendSep;
    this.blendColor = cpy.blendColor;
    this.blendEq = cpy.blendEq;
    this.blendAlphaEq = cpy.blendAlphaEq;
    this.blendSrc = cpy.blendSrc;
    this.blendDst = cpy.blendDst;
    this.blendSrcAlpha = cpy.blendSrcAlpha;
    this.blendDstAlpha = cpy.blendDstAlpha; // depth

    this.depthTest = cpy.depthTest;
    this.depthWrite = cpy.depthWrite;
    this.depthFunc = cpy.depthFunc; // stencil

    this.stencilTest = cpy.stencilTest;
    this.stencilSep = cpy.stencilSep;
    this.stencilFuncFront = cpy.stencilFuncFront;
    this.stencilRefFront = cpy.stencilRefFront;
    this.stencilMaskFront = cpy.stencilMaskFront;
    this.stencilFailOpFront = cpy.stencilFailOpFront;
    this.stencilZFailOpFront = cpy.stencilZFailOpFront;
    this.stencilZPassOpFront = cpy.stencilZPassOpFront;
    this.stencilWriteMaskFront = cpy.stencilWriteMaskFront;
    this.stencilFuncBack = cpy.stencilFuncBack;
    this.stencilRefBack = cpy.stencilRefBack;
    this.stencilMaskBack = cpy.stencilMaskBack;
    this.stencilFailOpBack = cpy.stencilFailOpBack;
    this.stencilZFailOpBack = cpy.stencilZFailOpBack;
    this.stencilZPassOpBack = cpy.stencilZPassOpBack;
    this.stencilWriteMaskBack = cpy.stencilWriteMaskBack; // cull-mode

    this.cullMode = cpy.cullMode; // primitive-type

    this.primitiveType = cpy.primitiveType; // buffer bindings

    this.maxStream = cpy.maxStream;

    for (var i = 0; i < cpy.vertexBuffers.length; ++i) {
      this.vertexBuffers[i] = cpy.vertexBuffers[i];
    }

    for (var _i = 0; _i < cpy.vertexBufferOffsets.length; ++_i) {
      this.vertexBufferOffsets[_i] = cpy.vertexBufferOffsets[_i];
    }

    this.indexBuffer = cpy.indexBuffer; // texture bindings

    this.maxTextureSlot = cpy.maxTextureSlot;

    for (var _i2 = 0; _i2 < cpy.textureUnits.length; ++_i2) {
      this.textureUnits[_i2] = cpy.textureUnits[_i2];
    }

    this.program = cpy.program;
  };

  return State;
}();

exports["default"] = State;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHN0YXRlLmpzIl0sIm5hbWVzIjpbIl9kZWZhdWx0IiwiYmxlbmQiLCJibGVuZFNlcCIsImJsZW5kQ29sb3IiLCJibGVuZEVxIiwiZW51bXMiLCJCTEVORF9GVU5DX0FERCIsImJsZW5kQWxwaGFFcSIsImJsZW5kU3JjIiwiQkxFTkRfT05FIiwiYmxlbmREc3QiLCJCTEVORF9aRVJPIiwiYmxlbmRTcmNBbHBoYSIsImJsZW5kRHN0QWxwaGEiLCJkZXB0aFRlc3QiLCJkZXB0aFdyaXRlIiwiZGVwdGhGdW5jIiwiRFNfRlVOQ19MRVNTIiwic3RlbmNpbFRlc3QiLCJzdGVuY2lsU2VwIiwic3RlbmNpbEZ1bmNGcm9udCIsIkRTX0ZVTkNfQUxXQVlTIiwic3RlbmNpbFJlZkZyb250Iiwic3RlbmNpbE1hc2tGcm9udCIsInN0ZW5jaWxGYWlsT3BGcm9udCIsIlNURU5DSUxfT1BfS0VFUCIsInN0ZW5jaWxaRmFpbE9wRnJvbnQiLCJzdGVuY2lsWlBhc3NPcEZyb250Iiwic3RlbmNpbFdyaXRlTWFza0Zyb250Iiwic3RlbmNpbEZ1bmNCYWNrIiwic3RlbmNpbFJlZkJhY2siLCJzdGVuY2lsTWFza0JhY2siLCJzdGVuY2lsRmFpbE9wQmFjayIsInN0ZW5jaWxaRmFpbE9wQmFjayIsInN0ZW5jaWxaUGFzc09wQmFjayIsInN0ZW5jaWxXcml0ZU1hc2tCYWNrIiwiY3VsbE1vZGUiLCJDVUxMX0JBQ0siLCJwcmltaXRpdmVUeXBlIiwiUFRfVFJJQU5HTEVTIiwibWF4U3RyZWFtIiwidmVydGV4QnVmZmVycyIsInZlcnRleEJ1ZmZlck9mZnNldHMiLCJpbmRleEJ1ZmZlciIsIm1heFRleHR1cmVTbG90IiwidGV4dHVyZVVuaXRzIiwicHJvZ3JhbSIsIlN0YXRlIiwiZGV2aWNlIiwiQXJyYXkiLCJfY2FwcyIsIm1heFZlcnRleFN0cmVhbXMiLCJtYXhUZXh0dXJlVW5pdHMiLCJzZXQiLCJpbml0RGVmYXVsdCIs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LElBQUlBLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUdELEdBQUcsQ0FBQ2QsbUJBQUosQ0FBd0JnQixNQUE1QyxFQUFvRCxFQUFFRCxFQUF0RCxFQUF5RDtBQUN2RCxXQUFLZixtQkFBTCxDQUF5QmUsRUFBekIsSUFBOEJELEdBQUcsQ0FBQ2QsbUJBQUosQ0FBd0JlLEVBQXhCLENBQTlCO0FBQ0Q7O0FBQ0QsU0FBS2QsV0FBTCxHQUFtQmEsR0FBRyxDQUFDYixXQUF2QixDQWpEUSxDQW1EUjs7QUFDQSxTQUFLQyxjQUFMLEdBQXNCWSxHQUFHLENBQUNaLGNBQTFCOztBQUNBLFNBQUssSUFBSWEsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR0QsR0FBRyxDQUFDWCxZQUFKLENBQWlCYSxNQUFyQyxFQUE2QyxFQUFFRCxHQUEvQyxFQUFrRDtBQUNoRCxXQUFLWixZQUFMLENBQWtCWSxHQUFsQixJQUF1QkQsR0FBRyxDQUFDWCxZQUFKLENBQWlCWSxHQUFqQixDQUF2QjtBQUNEOztBQUVELFNBQUtYLE9BQUwsR0FBZVUsR0FBRyxDQUFDVixPQUFuQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW51bXMgfSBmcm9tICcuL2VudW1zJztcclxuXHJcbmNvbnN0IF9kZWZhdWx0ID0ge1xyXG4gIC8vIGJsZW5kXHJcbiAgYmxlbmQ6IGZhbHNlLFxyXG4gIGJsZW5kU2VwOiBmYWxzZSxcclxuICBibGVuZENvbG9yOiAweGZmZmZmZmZmLFxyXG4gIGJsZW5kRXE6IGVudW1zLkJMRU5EX0ZVTkNfQURELFxyXG4gIGJsZW5kQWxwaGFFcTogZW51bXMuQkxFTkRfRlVOQ19BREQsXHJcbiAgYmxlbmRTcmM6IGVudW1zLkJMRU5EX09ORSxcclxuICBibGVuZERzdDogZW51bXMuQkxFTkRfWkVSTyxcclxuICBibGVuZFNyY0FscGhhOiBlbnVtcy5CTEVORF9PTkUsXHJcbiAgYmxlbmREc3RBbHBoYTogZW51bXMuQkxFTkRfWkVSTyxcclxuXHJcbiAgLy8gZGVwdGhcclxuICBkZXB0aFRlc3Q6IGZhbHNlLFxyXG4gIGRlcHRoV3JpdGU6IGZhbHNlLFxyXG4gIGRlcHRoRnVuYzogZW51bXMuRFNfRlVOQ19MRVNTLFxyXG5cclxuICAvLyBzdGVuY2lsXHJcbiAgc3RlbmNpbFRlc3Q6IGZhbHNlLFxyXG4gIHN0ZW5jaWxTZXA6IGZhbHNlLFxyXG4gIHN0ZW5jaWxGdW5jRnJvbnQ6IGVudW1zLkRTX0ZVTkNfQUxXQVlTLFxyXG4gIHN0ZW5jaWxSZWZGcm9udDogMCxcclxuICBzdGVuY2lsTWFza0Zyb250OiAweGZmLFxyXG4gIHN0ZW5jaWxGYWlsT3BGcm9udDogZW51bXMuU1RFTkNJTF9PUF9LRUVQLFxyXG4gIHN0ZW5jaWxaRmFpbE9wRnJvbnQ6IGVudW1zLlNURU5DSUxfT1BfS0VFUCxcclxuICBzdGVuY2lsWlBhc3NPcEZyb250OiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgc3RlbmNpbFdyaXRlTWFza0Zyb250OiAweGZmLFxyXG4gIHN0ZW5jaWxGdW5jQmFjazogZW51bXMuRFNfRlVOQ19BTFdBWVMsXHJcbiAgc3RlbmNpbFJlZkJhY2s6IDAsXHJcbiAgc3RlbmNpbE1hc2tCYWNrOiAweGZmLFxyXG4gIHN0ZW5jaWxGYWlsT3BCYWNrOiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgc3RlbmNpbFpGYWlsT3BCYWNrOiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgc3RlbmNpbFpQYXNzT3BCYWNrOiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgc3RlbmNpbFdyaXRlTWFza0JhY2s6IDB4ZmYsXHJcblxyXG4gIC8vIGN1bGwtbW9kZVxyXG4gIGN1bGxNb2RlOiBlbnVtcy5DVUxMX0JBQ0ssXHJcblxyXG4gIC8vIHByaW1pdGl2ZS10eXBlXHJcbiAgcHJpbWl0aXZlVHlwZTogZW51bXMuUFRfVFJJQU5HTEVTLFxyXG5cclxuICAvLyBiaW5kaW5nc1xyXG4gIG1heFN0cmVhbTogLTEsXHJcbiAgdmVydGV4QnVmZmVyczogW10sXHJcbiAgdmVydGV4QnVmZmVyT2Zmc2V0czogW10sXHJcbiAgaW5kZXhCdWZmZXI6IG51bGwsXHJcbiAgbWF4VGV4dHVyZVNsb3Q6IC0xLFxyXG4gIHRleHR1cmVVbml0czogW10sXHJcbiAgcHJvZ3JhbTogbnVsbCxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcihkZXZpY2UpIHtcclxuICAgIC8vIGJpbmRpbmdzXHJcbiAgICB0aGlzLnZlcnRleEJ1ZmZlcnMgPSBuZXcgQXJyYXkoZGV2aWNlLl9jYXBzLm1heFZlcnRleFN0cmVhbXMpO1xyXG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXJPZmZzZXRzID0gbmV3IEFycmF5KGRldmljZS5fY2Fwcy5tYXhWZXJ0ZXhTdHJlYW1zKTtcclxuICAgIHRoaXMudGV4dHVyZVVuaXRzID0gbmV3IEFycmF5KGRldmljZS5fY2Fwcy5tYXhUZXh0dXJlVW5pdHMpO1xyXG5cclxuICAgIHRoaXMuc2V0KF9kZWZhdWx0KTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBpbml0RGVmYXVsdChkZXZpY2UpIHtcclxuICAgIF9kZWZhdWx0LnZlcnRleEJ1ZmZlcnMgPSBuZXcgQXJyYXkoZGV2aWNlLl9jYXBzLm1heFZlcnRleFN0cmVhbXMpO1xyXG4gICAgX2RlZmF1bHQudmVydGV4QnVmZmVyT2Zmc2V0cyA9IG5ldyBBcnJheShkZXZpY2UuX2NhcHMubWF4VmVydGV4U3RyZWFtcyk7XHJcbiAgICBfZGVmYXVsdC50ZXh0dXJlVW5pdHMgPSBuZXcgQXJyYXkoZGV2aWNlLl9jYXBzLm1heFRleHR1cmVVbml0cyk7XHJcbiAgfVxyXG5cclxuICByZXNldCAoKSB7XHJcbiAgICB0aGlzLnNldChfZGVmYXVsdCk7XHJcbiAgfVxyXG5cclxuICBzZXQgKGNweSkge1xyXG4gICAgLy8gYmxlbmRpbmdcclxuICAgIHRoaXMuYmxlbmQgPSBjcHkuYmxlbmQ7XHJcbiAgICB0aGlzLmJsZW5kU2VwID0gY3B5LmJsZW5kU2VwO1xyXG4gICAgdGhpcy5ibGVuZENvbG9yID0gY3B5LmJsZW5kQ29sb3I7XHJcbiAgICB0aGlzLmJsZW5kRXEgPSBjcHkuYmxlbmRFcTtcclxuICAgIHRoaXMuYmxlbmRBbHBoYUVxID0gY3B5LmJsZW5kQWxwaGFFcTtcclxuICAgIHRoaXMuYmxlbmRTcmMgPSBjcHkuYmxlbmRTcmM7XHJcbiAgICB0aGlzLmJsZW5kRHN0ID0gY3B5LmJsZW5kRHN0O1xyXG4gICAgdGhpcy5ibGVuZFNyY0FscGhhID0gY3B5LmJsZW5kU3JjQWxwaGE7XHJcbiAgICB0aGlzLmJsZW5kRHN0QWxwaGEgPSBjcHkuYmxlbmREc3RBbHBoYTtcclxuXHJcbiAgICAvLyBkZXB0aFxyXG4gICAgdGhpcy5kZXB0aFRlc3QgPSBjcHkuZGVwdGhUZXN0O1xyXG4gICAgdGhpcy5kZXB0aFdyaXRlID0gY3B5LmRlcHRoV3JpdGU7XHJcbiAgICB0aGlzLmRlcHRoRnVuYyA9IGNweS5kZXB0aEZ1bmM7XHJcblxyXG4gICAgLy8gc3RlbmNpbFxyXG4gICAgdGhpcy5zdGVuY2lsVGVzdCA9IGNweS5zdGVuY2lsVGVzdDtcclxuICAgIHRoaXMuc3RlbmNpbFNlcCA9IGNweS5zdGVuY2lsU2VwO1xyXG4gICAgdGhpcy5zdGVuY2lsRnVuY0Zyb250ID0gY3B5LnN0ZW5jaWxGdW5jRnJvbnQ7XHJcbiAgICB0aGlzLnN0ZW5jaWxSZWZGcm9udCA9IGNweS5zdGVuY2lsUmVmRnJvbnQ7XHJcbiAgICB0aGlzLnN0ZW5jaWxNYXNrRnJvbnQgPSBjcHkuc3RlbmNpbE1hc2tGcm9udDtcclxuICAgIHRoaXMuc3RlbmNpbEZhaWxPcEZyb250ID0gY3B5LnN0ZW5jaWxGYWlsT3BGcm9udDtcclxuICAgIHRoaXMuc3RlbmNpbFpGYWlsT3BGcm9udCA9IGNweS5zdGVuY2lsWkZhaWxPcEZyb250O1xyXG4gICAgdGhpcy5zdGVuY2lsWlBhc3NPcEZyb250ID0gY3B5LnN0ZW5jaWxaUGFzc09wRnJvbnQ7XHJcbiAgICB0aGlzLnN0ZW5jaWxXcml0ZU1hc2tGcm9udCA9IGNweS5zdGVuY2lsV3JpdGVNYXNrRnJvbnQ7XHJcbiAgICB0aGlzLnN0ZW5jaWxGdW5jQmFjayA9IGNweS5zdGVuY2lsRnVuY0JhY2s7XHJcbiAgICB0aGlzLnN0ZW5jaWxSZWZCYWNrID0gY3B5LnN0ZW5jaWxSZWZCYWNrO1xyXG4gICAgdGhpcy5zdGVuY2lsTWFza0JhY2sgPSBjcHkuc3RlbmNpbE1hc2tCYWNrO1xyXG4gICAgdGhpcy5zdGVuY2lsRmFpbE9wQmFjayA9IGNweS5zdGVuY2lsRmFpbE9wQmFjaztcclxuICAgIHRoaXMuc3RlbmNpbFpGYWlsT3BCYWNrID0gY3B5LnN0ZW5jaWxaRmFpbE9wQmFjaztcclxuICAgIHRoaXMuc3RlbmNpbFpQYXNzT3BCYWNrID0gY3B5LnN0ZW5jaWxaUGFzc09wQmFjaztcclxuICAgIHRoaXMuc3RlbmNpbFdyaXRlTWFza0JhY2sgPSBjcHkuc3RlbmNpbFdyaXRlTWFza0JhY2s7XHJcblxyXG4gICAgLy8gY3VsbC1tb2RlXHJcbiAgICB0aGlzLmN1bGxNb2RlID0gY3B5LmN1bGxNb2RlO1xyXG5cclxuICAgIC8vIHByaW1pdGl2ZS10eXBlXHJcbiAgICB0aGlzLnByaW1pdGl2ZVR5cGUgPSBjcHkucHJpbWl0aXZlVHlwZTtcclxuXHJcbiAgICAvLyBidWZmZXIgYmluZGluZ3NcclxuICAgIHRoaXMubWF4U3RyZWFtID0gY3B5Lm1heFN0cmVhbTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3B5LnZlcnRleEJ1ZmZlcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgdGhpcy52ZXJ0ZXhCdWZmZXJzW2ldID0gY3B5LnZlcnRleEJ1ZmZlcnNbaV07XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNweS52ZXJ0ZXhCdWZmZXJPZmZzZXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIHRoaXMudmVydGV4QnVmZmVyT2Zmc2V0c1tpXSA9IGNweS52ZXJ0ZXhCdWZmZXJPZmZzZXRzW2ldO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmRleEJ1ZmZlciA9IGNweS5pbmRleEJ1ZmZlcjtcclxuXHJcbiAgICAvLyB0ZXh0dXJlIGJpbmRpbmdzXHJcbiAgICB0aGlzLm1heFRleHR1cmVTbG90ID0gY3B5Lm1heFRleHR1cmVTbG90O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcHkudGV4dHVyZVVuaXRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIHRoaXMudGV4dHVyZVVuaXRzW2ldID0gY3B5LnRleHR1cmVVbml0c1tpXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyYW0gPSBjcHkucHJvZ3JhbTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==