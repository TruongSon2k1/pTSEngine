
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-2d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("./assembler"));

var _manager = _interopRequireDefault(require("./utils/dynamic-atlas/manager"));

var _renderData = _interopRequireDefault(require("./webgl/render-data"));

var _valueTypes = require("../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Assembler2D = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(Assembler2D, _Assembler);

  function Assembler2D() {
    var _this;

    _this = _Assembler.call(this) || this;
    _this._renderData = new _renderData["default"]();

    _this._renderData.init(_assertThisInitialized(_this));

    _this.initData();

    _this.initLocal();

    return _this;
  }

  var _proto = Assembler2D.prototype;

  _proto.initData = function initData() {
    var data = this._renderData;
    data.createQuadData(0, this.verticesFloats, this.indicesCount);
  };

  _proto.initLocal = function initLocal() {
    this._local = [];
    this._local.length = 4;
  };

  _proto.updateColor = function updateColor(comp, color) {
    var uintVerts = this._renderData.uintVDatas[0];
    if (!uintVerts) return;
    color = color != null ? color : comp.node.color._val;
    var floatsPerVert = this.floatsPerVert;
    var colorOffset = this.colorOffset;

    for (var i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) {
      uintVerts[i] = color;
    }
  };

  _proto.getBuffer = function getBuffer() {
    return cc.renderer._handle._meshBuffer;
  };

  _proto.updateWorldVerts = function updateWorldVerts(comp) {
    var local = this._local;
    var verts = this._renderData.vDatas[0];
    var matrix = comp.node._worldMatrix;
    var matrixm = matrix.m,
        a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    var vl = local[0],
        vr = local[2],
        vb = local[1],
        vt = local[3];
    var floatsPerVert = this.floatsPerVert;
    var vertexOffset = 0;
    var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

    if (justTranslate) {
      // left bottom
      verts[vertexOffset] = vl + tx;
      verts[vertexOffset + 1] = vb + ty;
      vertexOffset += floatsPerVert; // right bottom

      verts[vertexOffset] = vr + tx;
      verts[vertexOffset + 1] = vb + ty;
      vertexOffset += floatsPerVert; // left top

      verts[vertexOffset] = vl + tx;
      verts[vertexOffset + 1] = vt + ty;
      vertexOffset += floatsPerVert; // right top

      verts[vertexOffset] = vr + tx;
      verts[vertexOffset + 1] = vt + ty;
    } else {
      var al = a * vl,
          ar = a * vr,
          bl = b * vl,
          br = b * vr,
          cb = c * vb,
          ct = c * vt,
          db = d * vb,
          dt = d * vt; // left bottom

      verts[vertexOffset] = al + cb + tx;
      verts[vertexOffset + 1] = bl + db + ty;
      vertexOffset += floatsPerVert; // right bottom

      verts[vertexOffset] = ar + cb + tx;
      verts[vertexOffset + 1] = br + db + ty;
      vertexOffset += floatsPerVert; // left top

      verts[vertexOffset] = al + ct + tx;
      verts[vertexOffset + 1] = bl + dt + ty;
      vertexOffset += floatsPerVert; // right top

      verts[vertexOffset] = ar + ct + tx;
      verts[vertexOffset + 1] = br + dt + ty;
    }
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (renderer.worldMatDirty) {
      this.updateWorldVerts(comp);
    }

    var renderData = this._renderData;
    var vData = renderData.vDatas[0];
    var iData = renderData.iDatas[0];
    var buffer = this.getBuffer(renderer);
    var offsetInfo = buffer.request(this.verticesCount, this.indicesCount); // buffer data may be realloc, need get reference after request.
    // fill vertices

    var vertexOffset = offsetInfo.byteOffset >> 2,
        vbuf = buffer._vData;

    if (vData.length + vertexOffset > vbuf.length) {
      vbuf.set(vData.subarray(0, vbuf.length - vertexOffset), vertexOffset);
    } else {
      vbuf.set(vData, vertexOffset);
    } // fill indices


    var ibuf = buffer._iData,
        indiceOffset = offsetInfo.indiceOffset,
        vertexId = offsetInfo.vertexOffset;

    for (var i = 0, l = iData.length; i < l; i++) {
      ibuf[indiceOffset++] = vertexId + iData[i];
    }
  };

  _proto.packToDynamicAtlas = function packToDynamicAtlas(comp, frame) {
    if (CC_TEST) return;

    if (!frame._original && _manager["default"] && frame._texture.packable) {
      var packedFrame = _manager["default"].insertSpriteFrame(frame);

      if (packedFrame) {
        frame._setDynamicAtlasFrame(packedFrame);
      }
    }

    var material = comp._materials[0];
    if (!material) return;

    if (material.getProperty('texture') !== frame._texture) {
      // texture was packed to dynamic atlas, should update uvs
      comp._vertsDirty = true;

      comp._updateMaterial();
    }
  };

  _createClass(Assembler2D, [{
    key: "verticesFloats",
    get: function get() {
      return this.verticesCount * this.floatsPerVert;
    }
  }]);

  return Assembler2D;
}(_assembler["default"]);

exports["default"] = Assembler2D;
cc.js.addon(Assembler2D.prototype, {
  floatsPerVert: 5,
  verticesCount: 4,
  indicesCount: 6,
  uvOffset: 2,
  colorOffset: 4
});
cc.Assembler2D = Assembler2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxhc3NlbWJsZXItMmQuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyMkQiLCJfcmVuZGVyRGF0YSIsIlJlbmRlckRhdGEiLCJpbml0IiwiaW5pdERhdGEiLCJpbml0TG9jYWwiLCJkYXRhIiwiY3JlYXRlUXVhZERhdGEiLCJ2ZXJ0aWNlc0Zsb2F0cyIsImluZGljZXNDb3VudCIsIl9sb2NhbCIsImxlbmd0aCIsInVwZGF0ZUNvbG9yIiwiY29tcCIsImNvbG9yIiwidWludFZlcnRzIiwidWludFZEYXRhcyIsIm5vZGUiLCJfdmFsIiwiZmxvYXRzUGVyVmVydCIsImNvbG9yT2Zmc2V0IiwiaSIsImwiLCJnZXRCdWZmZXIiLCJjYyIsInJlbmRlcmVyIiwiX2hhbmRsZSIsIl9tZXNoQnVmZmVyIiwidXBkYXRlV29ybGRWZXJ0cyIsImxvY2FsIiwidmVydHMiLCJ2RGF0YXMiLCJtYXRyaXgiLCJfd29ybGRNYXRyaXgiLCJtYXRyaXhtIiwibSIsImEiLCJiIiwiYyIsImQiLCJ0eCIsInR5IiwidmwiLCJ2ciIsInZiIiwidnQiLCJ2ZXJ0ZXhPZmZzZXQiLCJqdXN0VHJhbnNsYXRlIiwiYWwiLCJhciIsImJsIiwiYnIiLCJjYiIsImN0IiwiZGIiLCJkdCIsImZpbGxCdWZmZXJzIiwid29ybGRNYXREaXJ0eSIsInJlbmRlckRhdGEiLCJ2RGF0YSIsImlEYXRhIiwiaURhdGFzIiwiYnVmZmVyIiwib2Zmc2V0SW5mbyIsInJlcXVlc3QiLCJ2ZXJ0aWNlc0NvdW50IiwiYnl0ZU9mZnNldCIsInZidWYiLCJfdkRhdGEiLCJzZXQiLCJzdWJhcnJheSIsImlidWYiLCJfaURhdGEiLCJpbmRpY2VPZmZzZXQiLCJ2ZXJ0ZXhJZCIsInBhY2tUb0R5bmFtaWNBdGxhcyIsImZyYW1lIiwiQ0NfVEVTVCIsIl9vcmlnaW5hbCIsImR5bmFtaWNBdGxhc01hbmFnZXIiLCJfdGV4dHVyZSIsInBhY2thYmxlIiwicGFja2VkRnJhbWUiLCJpbnNlcnRTcHJpdGVGcmFtZSIsIl9zZXREeW5hbWljQXRsYXNGcmFtZSIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsImdldFByb3BlcnR5IiwiX3ZlcnRzRGlydHkiLCJfdXBkYXRlTWF0ZXJpYWwiLCJBc3NlbWJsZXIiLCJqcyIsImFkZG9uIiwicHJvdG90eXBlIiwidXZPZmZzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBOzs7QUFDakIseUJBQWU7QUFBQTs7QUFDWDtBQUVBLFVBQUtDLFdBQUwsR0FBbUIsSUFBSUMsc0JBQUosRUFBbkI7O0FBQ0EsVUFBS0QsV0FBTCxDQUFpQkUsSUFBakI7O0FBRUEsVUFBS0MsUUFBTDs7QUFDQSxVQUFLQyxTQUFMOztBQVBXO0FBUWQ7Ozs7U0FNREQsV0FBQSxvQkFBWTtBQUNSLFFBQUlFLElBQUksR0FBRyxLQUFLTCxXQUFoQjtBQUNBSyxJQUFBQSxJQUFJLENBQUNDLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsS0FBS0MsY0FBNUIsRUFBNEMsS0FBS0MsWUFBakQ7QUFDSDs7U0FDREosWUFBQSxxQkFBYTtBQUNULFNBQUtLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0EsTUFBTCxDQUFZQyxNQUFaLEdBQXFCLENBQXJCO0FBQ0g7O1NBRURDLGNBQUEscUJBQWFDLElBQWIsRUFBbUJDLEtBQW5CLEVBQTBCO0FBQ3RCLFFBQUlDLFNBQVMsR0FBRyxLQUFLZCxXQUFMLENBQWlCZSxVQUFqQixDQUE0QixDQUE1QixDQUFoQjtBQUNBLFFBQUksQ0FBQ0QsU0FBTCxFQUFnQjtBQUNoQkQsSUFBQUEsS0FBSyxHQUFHQSxLQUFLLElBQUksSUFBVCxHQUFnQkEsS0FBaEIsR0FBd0JELElBQUksQ0FBQ0ksSUFBTCxDQUFVSCxLQUFWLENBQWdCSSxJQUFoRDtBQUNBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6QjtBQUNBLFFBQUlDLFdBQVcsR0FBRyxLQUFLQSxXQUF2Qjs7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YUFBakM7QUFDSDs7OztFQWJvQ3VFOzs7QUFvSnpDbEUsRUFBRSxDQUFDbUUsRUFBSCxDQUFNQyxLQUFOLENBQVk1RixXQUFXLENBQUM2RixTQUF4QixFQUFtQztBQUMvQjFFLEVBQUFBLGFBQWEsRUFBRSxDQURnQjtBQUcvQjhDLEVBQUFBLGFBQWEsRUFBRSxDQUhnQjtBQUkvQnhELEVBQUFBLFlBQVksRUFBRSxDQUppQjtBQU0vQnFGLEVBQUFBLFFBQVEsRUFBRSxDQU5xQjtBQU8vQjFFLEVBQUFBLFdBQVcsRUFBRTtBQVBrQixDQUFuQztBQVVBSSxFQUFFLENBQUN4QixXQUFILEdBQWlCQSxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi9hc3NlbWJsZXInO1xyXG5pbXBvcnQgZHluYW1pY0F0bGFzTWFuYWdlciBmcm9tICcuL3V0aWxzL2R5bmFtaWMtYXRsYXMvbWFuYWdlcic7XHJcbmltcG9ydCBSZW5kZXJEYXRhIGZyb20gJy4vd2ViZ2wvcmVuZGVyLWRhdGEnO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2VtYmxlcjJEIGV4dGVuZHMgQXNzZW1ibGVyIHtcclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhID0gbmV3IFJlbmRlckRhdGEoKTtcclxuICAgICAgICB0aGlzLl9yZW5kZXJEYXRhLmluaXQodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExvY2FsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZlcnRpY2VzRmxvYXRzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52ZXJ0aWNlc0NvdW50ICogdGhpcy5mbG9hdHNQZXJWZXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhICgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX3JlbmRlckRhdGE7XHJcbiAgICAgICAgZGF0YS5jcmVhdGVRdWFkRGF0YSgwLCB0aGlzLnZlcnRpY2VzRmxvYXRzLCB0aGlzLmluZGljZXNDb3VudCk7XHJcbiAgICB9XHJcbiAgICBpbml0TG9jYWwgKCkge1xyXG4gICAgICAgIHRoaXMuX2xvY2FsID0gW107XHJcbiAgICAgICAgdGhpcy5fbG9jYWwubGVuZ3RoID0gNDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb2xvciAoY29tcCwgY29sb3IpIHtcclxuICAgICAgICBsZXQgdWludFZlcnRzID0gdGhpcy5fcmVuZGVyRGF0YS51aW50VkRhdGFzWzBdO1xyXG4gICAgICAgIGlmICghdWludFZlcnRzKSByZXR1cm47XHJcbiAgICAgICAgY29sb3IgPSBjb2xvciAhPSBudWxsID8gY29sb3IgOiBjb21wLm5vZGUuY29sb3IuX3ZhbDtcclxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcclxuICAgICAgICBsZXQgY29sb3JPZmZzZXQgPSB0aGlzLmNvbG9yT2Zmc2V0O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBjb2xvck9mZnNldCwgbCA9IHVpbnRWZXJ0cy5sZW5ndGg7IGkgPCBsOyBpICs9IGZsb2F0c1BlclZlcnQpIHtcclxuICAgICAgICAgICAgdWludFZlcnRzW2ldID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1ZmZlciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnJlbmRlcmVyLl9oYW5kbGUuX21lc2hCdWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlV29ybGRWZXJ0cyAoY29tcCkge1xyXG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xyXG4gICAgICAgIGxldCB2ZXJ0cyA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xyXG5cclxuICAgICAgICBsZXQgbWF0cml4ID0gY29tcC5ub2RlLl93b3JsZE1hdHJpeDtcclxuICAgICAgICBsZXQgbWF0cml4bSA9IG1hdHJpeC5tLFxyXG4gICAgICAgICAgICBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcclxuICAgICAgICAgICAgdHggPSBtYXRyaXhtWzEyXSwgdHkgPSBtYXRyaXhtWzEzXTtcclxuXHJcbiAgICAgICAgbGV0IHZsID0gbG9jYWxbMF0sIHZyID0gbG9jYWxbMl0sXHJcbiAgICAgICAgICAgIHZiID0gbG9jYWxbMV0sIHZ0ID0gbG9jYWxbM107XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgbGV0IHZlcnRleE9mZnNldCA9IDA7XHJcbiAgICAgICAgbGV0IGp1c3RUcmFuc2xhdGUgPSBhID09PSAxICYmIGIgPT09IDAgJiYgYyA9PT0gMCAmJiBkID09PSAxO1xyXG5cclxuICAgICAgICBpZiAoanVzdFRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBsZWZ0IGJvdHRvbVxyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gdmwgKyB0eDtcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSB2YiArIHR5O1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gcmlnaHQgYm90dG9tXHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSB2ciArIHR4O1xyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZiICsgdHk7XHJcbiAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAvLyBsZWZ0IHRvcFxyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXRdID0gdmwgKyB0eDtcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSB2dCArIHR5O1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gcmlnaHQgdG9wXHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSB2ciArIHR4O1xyXG4gICAgICAgICAgICB2ZXJ0c1t2ZXJ0ZXhPZmZzZXQgKyAxXSA9IHZ0ICsgdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGFsID0gYSAqIHZsLCBhciA9IGEgKiB2cixcclxuICAgICAgICAgICAgYmwgPSBiICogdmwsIGJyID0gYiAqIHZyLFxyXG4gICAgICAgICAgICBjYiA9IGMgKiB2YiwgY3QgPSBjICogdnQsXHJcbiAgICAgICAgICAgIGRiID0gZCAqIHZiLCBkdCA9IGQgKiB2dDtcclxuXHJcbiAgICAgICAgICAgIC8vIGxlZnQgYm90dG9tXHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSBhbCArIGNiICsgdHg7XHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYmwgKyBkYiArIHR5O1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gcmlnaHQgYm90dG9tXHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldF0gPSBhciArIGNiICsgdHg7XHJcbiAgICAgICAgICAgIHZlcnRzW3ZlcnRleE9mZnNldCArIDFdID0gYnIgKyBkYiArIHR5O1xyXG4gICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgLy8gbGVmdCB0b3BcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFsICsgY3QgKyB0eDtcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSBibCArIGR0ICsgdHk7XHJcbiAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSBmbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgICAgICAvLyByaWdodCB0b3BcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0XSA9IGFyICsgY3QgKyB0eDtcclxuICAgICAgICAgICAgdmVydHNbdmVydGV4T2Zmc2V0ICsgMV0gPSBiciArIGR0ICsgdHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbGxCdWZmZXJzIChjb21wLCByZW5kZXJlcikge1xyXG4gICAgICAgIGlmIChyZW5kZXJlci53b3JsZE1hdERpcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlV29ybGRWZXJ0cyhjb21wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZW5kZXJEYXRhID0gdGhpcy5fcmVuZGVyRGF0YTtcclxuICAgICAgICBsZXQgdkRhdGEgPSByZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuICAgICAgICBsZXQgaURhdGEgPSByZW5kZXJEYXRhLmlEYXRhc1swXTtcclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2V0QnVmZmVyKHJlbmRlcmVyKTtcclxuICAgICAgICBsZXQgb2Zmc2V0SW5mbyA9IGJ1ZmZlci5yZXF1ZXN0KHRoaXMudmVydGljZXNDb3VudCwgdGhpcy5pbmRpY2VzQ291bnQpO1xyXG5cclxuICAgICAgICAvLyBidWZmZXIgZGF0YSBtYXkgYmUgcmVhbGxvYywgbmVlZCBnZXQgcmVmZXJlbmNlIGFmdGVyIHJlcXVlc3QuXHJcblxyXG4gICAgICAgIC8vIGZpbGwgdmVydGljZXNcclxuICAgICAgICBsZXQgdmVydGV4T2Zmc2V0ID0gb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID4+IDIsXHJcbiAgICAgICAgICAgIHZidWYgPSBidWZmZXIuX3ZEYXRhO1xyXG5cclxuICAgICAgICBpZiAodkRhdGEubGVuZ3RoICsgdmVydGV4T2Zmc2V0ID4gdmJ1Zi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdmJ1Zi5zZXQodkRhdGEuc3ViYXJyYXkoMCwgdmJ1Zi5sZW5ndGggLSB2ZXJ0ZXhPZmZzZXQpLCB2ZXJ0ZXhPZmZzZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZidWYuc2V0KHZEYXRhLCB2ZXJ0ZXhPZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZmlsbCBpbmRpY2VzXHJcbiAgICAgICAgbGV0IGlidWYgPSBidWZmZXIuX2lEYXRhLFxyXG4gICAgICAgICAgICBpbmRpY2VPZmZzZXQgPSBvZmZzZXRJbmZvLmluZGljZU9mZnNldCxcclxuICAgICAgICAgICAgdmVydGV4SWQgPSBvZmZzZXRJbmZvLnZlcnRleE9mZnNldDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlEYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBpYnVmW2luZGljZU9mZnNldCsrXSA9IHZlcnRleElkICsgaURhdGFbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhY2tUb0R5bmFtaWNBdGxhcyAoY29tcCwgZnJhbWUpIHtcclxuICAgICAgICBpZiAoQ0NfVEVTVCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghZnJhbWUuX29yaWdpbmFsICYmIGR5bmFtaWNBdGxhc01hbmFnZXIgJiYgZnJhbWUuX3RleHR1cmUucGFja2FibGUpIHtcclxuICAgICAgICAgICAgbGV0IHBhY2tlZEZyYW1lID0gZHluYW1pY0F0bGFzTWFuYWdlci5pbnNlcnRTcHJpdGVGcmFtZShmcmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChwYWNrZWRGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZnJhbWUuX3NldER5bmFtaWNBdGxhc0ZyYW1lKHBhY2tlZEZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSBjb21wLl9tYXRlcmlhbHNbMF07XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChtYXRlcmlhbC5nZXRQcm9wZXJ0eSgndGV4dHVyZScpICE9PSBmcmFtZS5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAvLyB0ZXh0dXJlIHdhcyBwYWNrZWQgdG8gZHluYW1pYyBhdGxhcywgc2hvdWxkIHVwZGF0ZSB1dnNcclxuICAgICAgICAgICAgY29tcC5fdmVydHNEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbXAuX3VwZGF0ZU1hdGVyaWFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jYy5qcy5hZGRvbihBc3NlbWJsZXIyRC5wcm90b3R5cGUsIHtcclxuICAgIGZsb2F0c1BlclZlcnQ6IDUsXHJcblxyXG4gICAgdmVydGljZXNDb3VudDogNCxcclxuICAgIGluZGljZXNDb3VudDogNixcclxuXHJcbiAgICB1dk9mZnNldDogMixcclxuICAgIGNvbG9yT2Zmc2V0OiA0LFxyXG59KTtcclxuXHJcbmNjLkFzc2VtYmxlcjJEID0gQXNzZW1ibGVyMkQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9