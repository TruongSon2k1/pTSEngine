
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/graphics/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _inputAssembler = _interopRequireDefault(require("../../../../../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MeshBuffer = require('../../mesh-buffer');

var renderer = require('../../../index');

var Graphics = require('../../../../graphics/graphics');

var PointFlags = require('../../../../graphics/types').PointFlags;

var LineJoin = Graphics.LineJoin;
var LineCap = Graphics.LineCap;

var Earcut = require('./earcut');

require('./impl');

var MAX_VERTEX = 65535;
var MAX_INDICE = MAX_VERTEX * 2;
var PI = Math.PI;
var min = Math.min;
var max = Math.max;
var ceil = Math.ceil;
var acos = Math.acos;
var cos = Math.cos;
var sin = Math.sin;
var atan2 = Math.atan2;

function curveDivs(r, arc, tol) {
  var da = acos(r / (r + tol)) * 2.0;
  return max(2, ceil(arc / da));
}

function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  }

  return v;
}

var gfx = cc.gfx;
var vfmtPosColorSdf = new gfx.VertexFormat([{
  name: gfx.ATTR_POSITION,
  type: gfx.ATTR_TYPE_FLOAT32,
  num: 2
}, {
  name: gfx.ATTR_COLOR,
  type: gfx.ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: 'a_dist',
  type: gfx.ATTR_TYPE_FLOAT32,
  num: 1
}]);
vfmtPosColorSdf.name = 'vfmtPosColorSdf';

var GraphicsAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(GraphicsAssembler, _Assembler);

  function GraphicsAssembler(graphics) {
    var _this;

    _this = _Assembler.call(this, graphics) || this;
    _this._buffer = null;
    _this._buffers = [];
    _this._bufferOffset = 0;
    return _this;
  }

  var _proto = GraphicsAssembler.prototype;

  _proto.getVfmt = function getVfmt() {
    return vfmtPosColorSdf;
  };

  _proto.getVfmtFloatCount = function getVfmtFloatCount() {
    return 4;
  };

  _proto.requestBuffer = function requestBuffer() {
    var buffer = {
      indiceStart: 0,
      vertexStart: 0
    };
    var meshbuffer = new MeshBuffer(renderer._handle, this.getVfmt());
    buffer.meshbuffer = meshbuffer;
    var ia = new _inputAssembler["default"](meshbuffer._vb, meshbuffer._ib);
    buffer.ia = ia;

    this._buffers.push(buffer);

    return buffer;
  };

  _proto.getBuffers = function getBuffers() {
    if (this._buffers.length === 0) {
      this.requestBuffer();
    }

    return this._buffers;
  };

  _proto.clear = function clear(clean) {
    this._bufferOffset = 0;
    var datas = this._buffers;

    if (clean) {
      for (var i = 0, l = datas.length; i < l; i++) {
        var data = datas[i];
        data.meshbuffer.destroy();
        data.meshbuffer = null;
      }

      datas.length = 0;
    } else {
      for (var _i = 0, _l = datas.length; _i < _l; _i++) {
        var _data = datas[_i];
        _data.indiceStart = 0;
        _data.vertexStart = 0;
        var meshbuffer = _data.meshbuffer;
        meshbuffer.reset();
      }
    }
  };

  _proto.fillBuffers = function fillBuffers(graphics, renderer) {
    renderer._flush();

    renderer.node = graphics.node;
    renderer.material = graphics._materials[0];
    var buffers = this.getBuffers();

    for (var index = 0, length = buffers.length; index < length; index++) {
      var buffer = buffers[index];
      var meshbuffer = buffer.meshbuffer;
      buffer.ia._count = buffer.indiceStart;

      renderer._flushIA(buffer.ia);

      meshbuffer.uploadData();
    }
  };

  _proto.genBuffer = function genBuffer(graphics, cverts) {
    var buffers = this.getBuffers();
    var buffer = buffers[this._bufferOffset];
    var meshbuffer = buffer.meshbuffer;
    var maxVertsCount = buffer.vertexStart + cverts;

    if (maxVertsCount > MAX_VERTEX || maxVertsCount * 3 > MAX_INDICE) {
      ++this._bufferOffset;
      maxVertsCount = cverts;

      if (this._bufferOffset < buffers.length) {
        buffer = buffers[this._bufferOffset];
      } else {
        buffer = this.requestBuffer(graphics);
        buffers[this._bufferOffset] = buffer;
      }

      meshbuffer = buffer.meshbuffer;
    }

    if (maxVertsCount > meshbuffer.vertexOffset) {
      meshbuffer.requestStatic(cverts, cverts * 3);
    }

    this._buffer = buffer;
    return buffer;
  };

  _proto.stroke = function stroke(graphics) {
    this._curColor = graphics._strokeColor._val;

    this._flattenPaths(graphics._impl);

    this._expandStroke(graphics);

    graphics._impl._updatePathOffset = true;
  };

  _proto.fill = function fill(graphics) {
    this._curColor = graphics._fillColor._val;

    this._expandFill(graphics);

    graphics._impl._updatePathOffset = true;
  };

  _proto._expandStroke = function _expandStroke(graphics) {
    var w = graphics.lineWidth * 0.5,
        lineCap = graphics.lineCap,
        lineJoin = graphics.lineJoin,
        miterLimit = graphics.miterLimit;
    var impl = graphics._impl;
    var ncap = curveDivs(w, PI, impl._tessTol);

    this._calculateJoins(impl, w, lineJoin, miterLimit);

    var paths = impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pointsLength = path.points.length;
      if (lineJoin === LineJoin.ROUND) cverts += (pointsLength + path.nbevel * (ncap + 2) + 1) * 2; // plus one for loop
      else cverts += (pointsLength + path.nbevel * 5 + 1) * 2; // plus one for loop

      if (!path.closed) {
        // space for caps
        if (lineCap === LineCap.ROUND) {
          cverts += (ncap * 2 + 2) * 2;
        } else {
          cverts += (3 + 3) * 2;
        }
      }
    }

    var buffer = this.genBuffer(graphics, cverts),
        meshbuffer = buffer.meshbuffer,
        vData = meshbuffer._vData,
        iData = meshbuffer._iData;

    for (var _i2 = impl._pathOffset, _l2 = impl._pathLength; _i2 < _l2; _i2++) {
      var _path = paths[_i2];
      var pts = _path.points;
      var _pointsLength = pts.length;
      var offset = buffer.vertexStart;
      var p0 = void 0,
          p1 = void 0;
      var start = void 0,
          end = void 0,
          loop = void 0;
      loop = _path.closed;

      if (loop) {
        // Looping
        p0 = pts[_pointsLength - 1];
        p1 = pts[0];
        start = 0;
        end = _pointsLength;
      } else {
        // Add cap
        p0 = pts[0];
        p1 = pts[1];
        start = 1;
        end = _pointsLength - 1;
      }

      p1 = p1 || p0;

      if (!loop) {
        // Add cap
        var dPos = p1.sub(p0);
        dPos.normalizeSelf();
        var dx = dPos.x;
        var dy = dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCapStart(p0, dx, dy, w, 0);else if (lineCap === LineCap.SQUARE) this._buttCapStart(p0, dx, dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapStart(p0, dx, dy, w, ncap);
      }

      for (var j = start; j < end; ++j) {
        if (lineJoin === LineJoin.ROUND) {
          this._roundJoin(p0, p1, w, w, ncap);
        } else if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
          this._bevelJoin(p0, p1, w, w);
        } else {
          this._vset(p1.x + p1.dmx * w, p1.y + p1.dmy * w, 1);

          this._vset(p1.x - p1.dmx * w, p1.y - p1.dmy * w, -1);
        }

        p0 = p1;
        p1 = pts[j + 1];
      }

      if (loop) {
        // Loop it
        var floatCount = this.getVfmtFloatCount();
        var vDataoOfset = offset * floatCount;

        this._vset(vData[vDataoOfset], vData[vDataoOfset + 1], 1);

        this._vset(vData[vDataoOfset + floatCount], vData[vDataoOfset + floatCount + 1], -1);
      } else {
        // Add cap
        var _dPos = p1.sub(p0);

        _dPos.normalizeSelf();

        var _dx = _dPos.x;
        var _dy = _dPos.y;
        if (lineCap === LineCap.BUTT) this._buttCapEnd(p1, _dx, _dy, w, 0);else if (lineCap === LineCap.SQUARE) this._buttCapEnd(p1, _dx, _dy, w, w);else if (lineCap === LineCap.ROUND) this._roundCapEnd(p1, _dx, _dy, w, ncap);
      } // stroke indices


      var indicesOffset = buffer.indiceStart;

      for (var _start = offset + 2, _end = buffer.vertexStart; _start < _end; _start++) {
        iData[indicesOffset++] = _start - 2;
        iData[indicesOffset++] = _start - 1;
        iData[indicesOffset++] = _start;
      }

      buffer.indiceStart = indicesOffset;
    }
  };

  _proto._expandFill = function _expandFill(graphics) {
    var impl = graphics._impl;
    var paths = impl._paths; // Calculate max vertex usage.

    var cverts = 0;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pointsLength = path.points.length;
      cverts += pointsLength;
    }

    var buffer = this.genBuffer(graphics, cverts),
        meshbuffer = buffer.meshbuffer,
        vData = meshbuffer._vData,
        iData = meshbuffer._iData;

    for (var _i3 = impl._pathOffset, _l3 = impl._pathLength; _i3 < _l3; _i3++) {
      var _path2 = paths[_i3];
      var pts = _path2.points;
      var _pointsLength2 = pts.length;

      if (_pointsLength2 === 0) {
        continue;
      } // Calculate shape vertices.


      var offset = buffer.vertexStart;

      for (var j = 0; j < _pointsLength2; ++j) {
        this._vset(pts[j].x, pts[j].y);
      }

      var indicesOffset = buffer.indiceStart;

      if (_path2.complex) {
        var earcutData = [];
        var floatCount = this.getVfmtFloatCount();

        for (var _j = offset, end = buffer.vertexStart; _j < end; _j++) {
          var vDataOffset = _j * floatCount;
          earcutData.push(vData[vDataOffset]);
          earcutData.push(vData[vDataOffset + 1]);
        }

        var newIndices = Earcut(earcutData, null, 2);

        if (!newIndices || newIndices.length === 0) {
          continue;
        }

        for (var _j2 = 0, nIndices = newIndices.length; _j2 < nIndices; _j2++) {
          iData[indicesOffset++] = newIndices[_j2] + offset;
        }
      } else {
        var first = offset;

        for (var start = offset + 2, _end2 = buffer.vertexStart; start < _end2; start++) {
          iData[indicesOffset++] = first;
          iData[indicesOffset++] = start - 1;
          iData[indicesOffset++] = start;
        }
      }

      buffer.indiceStart = indicesOffset;
    }
  };

  _proto._calculateJoins = function _calculateJoins(impl, w, lineJoin, miterLimit) {
    var iw = 0.0;

    if (w > 0.0) {
      iw = 1 / w;
    } // Calculate which joins needs extra vertices to append, and gather vertex count.


    var paths = impl._paths;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pts = path.points;
      var ptsLength = pts.length;
      var p0 = pts[ptsLength - 1];
      var p1 = pts[0];
      var nleft = 0;
      path.nbevel = 0;

      for (var j = 0; j < ptsLength; j++) {
        var dmr2 = void 0,
            cross = void 0,
            limit = void 0; // perp normals

        var dlx0 = p0.dy;
        var dly0 = -p0.dx;
        var dlx1 = p1.dy;
        var dly1 = -p1.dx; // Calculate extrusions

        p1.dmx = (dlx0 + dlx1) * 0.5;
        p1.dmy = (dly0 + dly1) * 0.5;
        dmr2 = p1.dmx * p1.dmx + p1.dmy * p1.dmy;

        if (dmr2 > 0.000001) {
          var scale = 1 / dmr2;

          if (scale > 600) {
            scale = 600;
          }

          p1.dmx *= scale;
          p1.dmy *= scale;
        } // Keep track of left turns.


        cross = p1.dx * p0.dy - p0.dx * p1.dy;

        if (cross > 0) {
          nleft++;
          p1.flags |= PointFlags.PT_LEFT;
        } // Calculate if we should use bevel or miter for inner join.


        limit = max(11, min(p0.len, p1.len) * iw);

        if (dmr2 * limit * limit < 1) {
          p1.flags |= PointFlags.PT_INNERBEVEL;
        } // Check whether dm length is too long


        var dmwx = p1.dmx * w;
        var dmwy = p1.dmy * w;
        var dmlen = dmwx * dmwx + dmwy * dmwy;

        if (dmlen > p1.len * p1.len || dmlen > p0.len * p0.len) {
          p1.flags |= PointFlags.PT_INNERBEVEL;
        } // Check to see if the corner needs to be beveled.


        if (p1.flags & PointFlags.PT_CORNER) {
          if (dmr2 * miterLimit * miterLimit < 1 || lineJoin === LineJoin.BEVEL || lineJoin === LineJoin.ROUND) {
            p1.flags |= PointFlags.PT_BEVEL;
          }
        }

        if ((p1.flags & (PointFlags.PT_BEVEL | PointFlags.PT_INNERBEVEL)) !== 0) {
          path.nbevel++;
        }

        p0 = p1;
        p1 = pts[j + 1];
      }
    }
  };

  _proto._flattenPaths = function _flattenPaths(impl) {
    var paths = impl._paths;

    for (var i = impl._pathOffset, l = impl._pathLength; i < l; i++) {
      var path = paths[i];
      var pts = path.points;
      var p0 = pts[pts.length - 1];
      var p1 = pts[0];

      if (pts.length > 2 && p0.equals(p1)) {
        path.closed = true;
        pts.pop();
        p0 = pts[pts.length - 1];
      }

      for (var j = 0, size = pts.length; j < size; j++) {
        // Calculate segment direction and length
        var dPos = p1.sub(p0);
        p0.len = dPos.mag();
        if (dPos.x || dPos.y) dPos.normalizeSelf();
        p0.dx = dPos.x;
        p0.dy = dPos.y; // Advance

        p0 = p1;
        p1 = pts[j + 1];
      }
    }
  };

  _proto._chooseBevel = function _chooseBevel(bevel, p0, p1, w) {
    var x = p1.x;
    var y = p1.y;
    var x0, y0, x1, y1;

    if (bevel !== 0) {
      x0 = x + p0.dy * w;
      y0 = y - p0.dx * w;
      x1 = x + p1.dy * w;
      y1 = y - p1.dx * w;
    } else {
      x0 = x1 = x + p1.dmx * w;
      y0 = y1 = y + p1.dmy * w;
    }

    return [x0, y0, x1, y1];
  };

  _proto._buttCapStart = function _buttCapStart(p, dx, dy, w, d) {
    var px = p.x - dx * d;
    var py = p.y - dy * d;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._buttCapEnd = function _buttCapEnd(p, dx, dy, w, d) {
    var px = p.x + dx * d;
    var py = p.y + dy * d;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._roundCapStart = function _roundCapStart(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px - dlx * ax - dx * ay, py - dly * ax - dy * ay, 1);

      this._vset(px, py, 0);
    }

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);
  };

  _proto._roundCapEnd = function _roundCapEnd(p, dx, dy, w, ncap) {
    var px = p.x;
    var py = p.y;
    var dlx = dy;
    var dly = -dx;

    this._vset(px + dlx * w, py + dly * w, 1);

    this._vset(px - dlx * w, py - dly * w, -1);

    for (var i = 0; i < ncap; i++) {
      var a = i / (ncap - 1) * PI;
      var ax = cos(a) * w,
          ay = sin(a) * w;

      this._vset(px, py, 0);

      this._vset(px - dlx * ax + dx * ay, py - dly * ax + dy * ay, 1);
    }
  };

  _proto._roundJoin = function _roundJoin(p0, p1, lw, rw, ncap) {
    var dlx0 = p0.dy;
    var dly0 = -p0.dx;
    var dlx1 = p1.dy;
    var dly1 = -p1.dx;
    var p1x = p1.x;
    var p1y = p1.y;

    if ((p1.flags & PointFlags.PT_LEFT) !== 0) {
      var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

      var lx0 = out[0];
      var ly0 = out[1];
      var lx1 = out[2];
      var ly1 = out[3];
      var a0 = atan2(-dly0, -dlx0);
      var a1 = atan2(-dly1, -dlx1);
      if (a1 > a0) a1 -= PI * 2;

      this._vset(lx0, ly0, 1);

      this._vset(p1x - dlx0 * rw, p1.y - dly0 * rw, -1);

      var n = clamp(ceil((a0 - a1) / PI) * ncap, 2, ncap);

      for (var i = 0; i < n; i++) {
        var u = i / (n - 1);
        var a = a0 + u * (a1 - a0);
        var rx = p1x + cos(a) * rw;
        var ry = p1y + sin(a) * rw;

        this._vset(p1x, p1y, 0);

        this._vset(rx, ry, -1);
      }

      this._vset(lx1, ly1, 1);

      this._vset(p1x - dlx1 * rw, p1y - dly1 * rw, -1);
    } else {
      var _out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      var rx0 = _out[0];
      var ry0 = _out[1];
      var rx1 = _out[2];
      var ry1 = _out[3];

      var _a = atan2(dly0, dlx0);

      var _a2 = atan2(dly1, dlx1);

      if (_a2 < _a) _a2 += PI * 2;

      this._vset(p1x + dlx0 * rw, p1y + dly0 * rw, 1);

      this._vset(rx0, ry0, -1);

      var _n = clamp(ceil((_a2 - _a) / PI) * ncap, 2, ncap);

      for (var _i4 = 0; _i4 < _n; _i4++) {
        var _u = _i4 / (_n - 1);

        var _a3 = _a + _u * (_a2 - _a);

        var lx = p1x + cos(_a3) * lw;
        var ly = p1y + sin(_a3) * lw;

        this._vset(lx, ly, 1);

        this._vset(p1x, p1y, 0);
      }

      this._vset(p1x + dlx1 * rw, p1y + dly1 * rw, 1);

      this._vset(rx1, ry1, -1);
    }
  };

  _proto._bevelJoin = function _bevelJoin(p0, p1, lw, rw) {
    var rx0, ry0, rx1, ry1;
    var lx0, ly0, lx1, ly1;
    var dlx0 = p0.dy;
    var dly0 = -p0.dx;
    var dlx1 = p1.dy;
    var dly1 = -p1.dx;

    if (p1.flags & PointFlags.PT_LEFT) {
      var out = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, lw);

      lx0 = out[0];
      ly0 = out[1];
      lx1 = out[2];
      ly1 = out[3];

      this._vset(lx0, ly0, 1);

      this._vset(p1.x - dlx0 * rw, p1.y - dly0 * rw, -1);

      this._vset(lx1, ly1, 1);

      this._vset(p1.x - dlx1 * rw, p1.y - dly1 * rw, -1);
    } else {
      var _out2 = this._chooseBevel(p1.flags & PointFlags.PT_INNERBEVEL, p0, p1, -rw);

      rx0 = _out2[0];
      ry0 = _out2[1];
      rx1 = _out2[2];
      ry1 = _out2[3];

      this._vset(p1.x + dlx0 * lw, p1.y + dly0 * lw, 1);

      this._vset(rx0, ry0, -1);

      this._vset(p1.x + dlx1 * lw, p1.y + dly1 * lw, 1);

      this._vset(rx1, ry1, -1);
    }
  };

  _proto._vset = function _vset(x, y, distance) {
    if (distance === void 0) {
      distance = 0;
    }

    var buffer = this._buffer;
    var meshbuffer = buffer.meshbuffer;
    var dataOffset = buffer.vertexStart * this.getVfmtFloatCount();
    var vData = meshbuffer._vData;
    var uintVData = meshbuffer._uintVData;
    vData[dataOffset] = x;
    vData[dataOffset + 1] = y;
    uintVData[dataOffset + 2] = this._curColor;
    vData[dataOffset + 3] = distance;
    buffer.vertexStart++;
    meshbuffer._dirty = true;
  };

  return GraphicsAssembler;
}(_assembler["default"]);

exports["default"] = GraphicsAssembler;

_assembler["default"].register(cc.Graphics, GraphicsAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcZ3JhcGhpY3NcXGluZGV4LmpzIl0sIm5hbWVzIjpbIk1lc2hCdWZmZXIiLCJyZXF1aXJlIiwicmVuZGVyZXIiLCJHcmFwaGljcyIsIlBvaW50RmxhZ3MiLCJMaW5lSm9pbiIsIkxpbmVDYXAiLCJFYXJjdXQiLCJNQVhfVkVSVEVYIiwiTUFYX0lORElDRSIsIlBJIiwiTWF0aCIsIm1pbiIsIm1heCIsImNlaWwiLCJhY29zIiwiY29zIiwic2luIiwiYXRhbjIiLCJjdXJ2ZURpdnMiLCJyIiwiYXJjIiwidG9sIiwiZGEiLCJjbGFtcCIsInYiLCJnZngiLCJjYyIsInZmbXRQb3NDb2xvclNkZiIsIlZlcnRleEZvcm1hdCIsIm5hbWUiLCJBVFRSX1BPU0lUSU9OIiwidHlwZSIsIkFUVFJfVFlQRV9GTE9BVDMyIiwibnVtIiwiQVRUUl9DT0xPUiIsIkFUVFJfVFlQRV9VSU5UOCIsIm5vcm1hbGl6ZSIsIkdyYXBoaWNzQXNzZW1ibGVyIiwiZ3JhcGhpY3MiLCJfYnVmZmVyIiwiX2J1ZmZlcnMiLCJfYnVmZmVyT2Zmc2V0IiwiZ2V0VmZtdCIsImdldFZmbXRGbG9hdENvdW50IiwicmVxdWVzdEJ1ZmZlciIsImJ1ZmZlciIsImluZGljZVN0YXJ0IiwidmVydGV4U3RhcnQiLCJtZXNoYnVmZmVyIiwiX2hhbmRsZSIsImlhIiwiSW5wdXRBc3NlbWJsZXIiLCJfdmIiLCJfaWIiLCJwdXNoIiwiZ2V0QnVmZmVycyIsImxlbmd0aCIsImNsZWFyIiwiY2xlYW4iLCJkYXRhcyIsImkiLCJsIiwiZGF0YSIsImRlc3Ryb3kiLCJyZXNldCIsImZpbGxCdWZmZXJzIiwiX2ZsdXNoIiwibm9kZSIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsImJ1ZmZlcnMiLCJpbmRleCIsIl9jb3VudCIsIl9mbHVzaElBIiwidXBsb2FkRGF0YSIsImdlbkJ1ZmZlciIsImN2ZXJ0cyIsIm1heFZlcnRzQ291bnQiLCJ2ZXJ0ZXhPZmZzZXQiLCJyZXF1ZXN0U3RhdGljIiwic3Ryb2tlIiwiX2N1ckNvbG9yIiwiX3N0cm9rZUNvbG9yIiwiX3ZhbCIsIl9mbGF0dGVuUGF0aHMiLCJfaW1wbCIsIl9leHBhbmRTdHJva2UiLCJfdXBkYXRlUGF0aE9mZnNldCIsImZpbGwiLCJfZmlsbENvbG9yIiwiX2V4cGFuZEZpbGwiLCJ3IiwibGluZVdpZHRoIiwibGluZUNhcCIsImxpbmVKb2luIiwibWl0ZXJMaW1pdCIsImltcGwiLCJuY2FwIiwiX3Rlc3NUb2wiLCJfY2FsY3VsYXRlSm9pbnMiLCJwYXRocyIsIl9wYXRocyIsIl9wYXRoT2Zmc2V0IiwiX3BhdGhMZW5ndGgiLCJwYXRoIiwicG9pbnRzTGVuZ3RoIiwicG9pbnRzIiwiUk9VTkQiLCJuYmV2ZWwiLCJjbG9zZWQiLCJ2RGF0YSIsIl92RGF0YSIsImlEYXRhIiwiX2lEYXRhIiwicHRzIiwib2Zmc2V0IiwicDAiLCJwMSIsInN0YXJ0IiwiZW5kIiwibG9vcCIsImRQb3MiLCJzdWIiLCJub3JtYWxpemVTZWxmIiwiZHgiLCJ4IiwiZHkiLCJ5IiwiQlVUVCIsIl9idXR0Q2FwU3RhcnQiLCJTUVVBUkUiLCJfcm91bmRDYXBTdGFydCIsImoiLCJfcm91bmRKb2luIiwiZmxhZ3MiLCJQVF9CRVZFTCIsIlBUX0lOTkVSQkVWRUwiLCJfYmV2ZWxKb2luIiwiX3ZzZXQiLCJkbXgiLCJkbXkiLCJmbG9hdENvdW50IiwidkRhdGFvT2ZzZXQiLCJfYnV0dENhcEVuZCIsIl9yb3VuZENhcEVuZCIsImluZGljZXNPZmZzZXQiLCJjb21wbGV4IiwiZWFyY3V0RGF0YSIsInZEYXRhT2Zmc2V0IiwibmV3SW5kaWNlcyIsIm5JbmRpY2VzIiwiZmlyc3QiLCJpdyIsInB0c0xlbmd0aCIsIm5sZWZ0IiwiZG1yMiIsImNyb3NzIiwibGltaXQiLCJkbHgwIiwiZGx5MCIsImRseDEiLCJkbHkxIiwic2NhbGUiLCJQVF9MRUZUIiwibGVuIiwiZG13eCIsImRtd3kiLCJkbWxlbiIsIlBUX0NPUk5FUiIsIkJFVkVMIiwiZXF1YWxzIiwicG9wIiwic2l6ZSIsIm1hZyIsIl9jaG9vc2VCZXZlbCIsImJldmVsIiwieDAiLCJ5MCIsIngxIiwieTEiLCJwIiwiZCIsInB4IiwicHkiLCJkbHgiLCJkbHkiLCJhIiwiYXgiLCJheSIsImx3IiwicnciLCJwMXgiLCJwMXkiLCJvdXQiLCJseDAiLCJseTAiLCJseDEiLCJseTEiLCJhMCIsImExIiwibiIsInUiLCJyeCIsInJ5IiwicngwIiwicnkwIiwicngxIiwicnkxIiwibHgiLCJseSIsImRpc3RhbmNlIiwiZGF0YU9mZnNldCIsInVpbnRWRGF0YSIsIl91aW50VkRhdGEiLCJfZGlydHkiLCJBc3NlbWJsZXIiLCJyZWdpc3RlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNQSxVQUFVLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUExQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxnQkFBRCxDQUF4Qjs7QUFFQSxJQUFNRSxRQUFRLEdBQUdGLE9BQU8sQ0FBQywrQkFBRCxDQUF4Qjs7QUFDQSxJQUFNRyxVQUFVLEdBQUdILE9BQU8sQ0FBQyw0QkFBRCxDQUFQLENBQXNDRyxVQUF6RDs7QUFDQSxJQUFNQyxRQUFRLEdBQUdGLFFBQVEsQ0FBQ0UsUUFBMUI7QUFDQSxJQUFNQyxPQUFPLEdBQUdILFFBQVEsQ0FBQ0csT0FBekI7O0FBQ0EsSUFBTUMsTUFBTSxHQUFHTixPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUEsT0FBTyxDQUFDLFFBQUQsQ0FBUDs7QUFFQSxJQUFNTyxVQUFVLEdBQUcsS0FBbkI7QUFDQSxJQUFNQyxVQUFVLEdBQUdELFVBQVUsR0FBRyxDQUFoQztBQUVBLElBQU1FLEVBQUUsR0FBUUMsSUFBSSxDQUFDRCxFQUFyQjtBQUNBLElBQU1FLEdBQUcsR0FBT0QsSUFBSSxDQUFDQyxHQUFyQjtBQUNBLElBQU1DLEdBQUcsR0FBT0YsSUFBSSxDQUFDRSxHQUFyQjtBQUNB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LEVBQStDLENBQS9DOztBQUNBLFdBQUtuRCxLQUFMLENBQVdvRSxHQUFYLEVBQWdCQyxHQUFoQixFQUFxQixDQUFDLENBQXRCO0FBQ0g7QUFDSjs7U0FFRHJFLFFBQUEsZUFBT2IsQ0FBUCxFQUFVRSxDQUFWLEVBQWFtRixRQUFiLEVBQTJCO0FBQUEsUUFBZEEsUUFBYztBQUFkQSxNQUFBQSxRQUFjLEdBQUgsQ0FBRztBQUFBOztBQUN2QixRQUFJckssTUFBTSxHQUFHLEtBQUtOLE9BQWxCO0FBQ0EsUUFBSVMsVUFBVSxHQUFHSCxNQUFNLENBQUNHLFVBQXhCO0FBQ0EsUUFBSW1LLFVBQVUsR0FBR3RLLE1BQU0sQ0FBQ0UsV0FBUCxHQUFxQixLQUFLSixpQkFBTCxFQUF0QztBQUVBLFFBQUltRSxLQUFLLEdBQUc5RCxVQUFVLENBQUMrRCxNQUF2QjtBQUNBLFFBQUlxRyxTQUFTLEdBQUdwSyxVQUFVLENBQUNxSyxVQUEzQjtBQUVBdkcsSUFBQUEsS0FBSyxDQUFDcUcsVUFBRCxDQUFMLEdBQW9CdEYsQ0FBcEI7QUFDQWYsSUFBQUEsS0FBSyxDQUFDcUcsVUFBVSxHQUFDLENBQVosQ0FBTCxHQUFzQnBGLENBQXRCO0FBQ0FxRixJQUFBQSxTQUFTLENBQUNELFVBQVUsR0FBQyxDQUFaLENBQVQsR0FBMEIsS0FBS2xJLFNBQS9CO0FBQ0E2QixJQUFBQSxLQUFLLENBQUNxRyxVQUFVLEdBQUMsQ0FBWixDQUFMLEdBQXNCRCxRQUF0QjtBQUVBckssSUFBQUEsTUFBTSxDQUFDRSxXQUFQO0FBQ0FDLElBQUFBLFVBQVUsQ0FBQ3NLLE1BQVgsR0FBb0IsSUFBcEI7QUFDSDs7O0VBL21CMENDOzs7O0FBa25CL0NBLHNCQUFVQyxRQUFWLENBQW1COUwsRUFBRSxDQUFDeEIsUUFBdEIsRUFBZ0NtQyxpQkFBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vYXNzZW1ibGVyJztcclxuXHJcbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XHJcblxyXG5jb25zdCBNZXNoQnVmZmVyID0gcmVxdWlyZSgnLi4vLi4vbWVzaC1idWZmZXInKTtcclxuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi8uLi8uLi9pbmRleCcpO1xyXG5cclxuY29uc3QgR3JhcGhpY3MgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9ncmFwaGljcy9ncmFwaGljcycpO1xyXG5jb25zdCBQb2ludEZsYWdzID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vZ3JhcGhpY3MvdHlwZXMnKS5Qb2ludEZsYWdzO1xyXG5jb25zdCBMaW5lSm9pbiA9IEdyYXBoaWNzLkxpbmVKb2luO1xyXG5jb25zdCBMaW5lQ2FwID0gR3JhcGhpY3MuTGluZUNhcDtcclxuY29uc3QgRWFyY3V0ID0gcmVxdWlyZSgnLi9lYXJjdXQnKTtcclxucmVxdWlyZSgnLi9pbXBsJyk7XHJcblxyXG5jb25zdCBNQVhfVkVSVEVYID0gNjU1MzU7XHJcbmNvbnN0IE1BWF9JTkRJQ0UgPSBNQVhfVkVSVEVYICogMjtcclxuXHJcbmNvbnN0IFBJICAgICAgPSBNYXRoLlBJO1xyXG5jb25zdCBtaW4gICAgID0gTWF0aC5taW47XHJcbmNvbnN0IG1heCAgICAgPSBNYXRoLm1heDtcclxuY29uc3QgY2VpbCAgICA9IE1hdGguY2VpbDtcclxuY29uc3QgYWNvcyAgICA9IE1hdGguYWNvcztcclxuY29uc3QgY29zICAgICA9IE1hdGguY29zO1xyXG5jb25zdCBzaW4gICAgID0gTWF0aC5zaW47XHJcbmNvbnN0IGF0YW4yICAgPSBNYXRoLmF0YW4yO1xyXG5cclxuZnVuY3Rpb24gY3VydmVEaXZzIChyLCBhcmMsIHRvbCkge1xyXG4gICAgbGV0IGRhID0gYWNvcyhyIC8gKHIgKyB0b2wpKSAqIDIuMDtcclxuICAgIHJldHVybiBtYXgoMiwgY2VpbChhcmMgLyBkYSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHtcclxuICAgIGlmICh2IDwgbWluKSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHYgPiBtYXgpIHtcclxuICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHY7XHJcbn1cclxuXHJcblxyXG5sZXQgZ2Z4ID0gY2MuZ2Z4O1xyXG5sZXQgdmZtdFBvc0NvbG9yU2RmID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfVUlOVDgsIG51bTogNCwgbm9ybWFsaXplOiB0cnVlIH0sXHJcbiAgICB7IG5hbWU6ICdhX2Rpc3QnLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMSB9LFxyXG5dKTtcclxudmZtdFBvc0NvbG9yU2RmLm5hbWUgPSAndmZtdFBvc0NvbG9yU2RmJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyIHtcclxuICAgIGNvbnN0cnVjdG9yIChncmFwaGljcykge1xyXG4gICAgICAgIHN1cGVyKGdyYXBoaWNzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9idWZmZXJPZmZzZXQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZmbXQgKCkge1xyXG4gICAgICAgIHJldHVybiB2Zm10UG9zQ29sb3JTZGY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmZtdEZsb2F0Q291bnQgKCkge1xyXG4gICAgICAgIHJldHVybiA0O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RCdWZmZXIgKCkge1xyXG4gICAgICAgIGxldCBidWZmZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGljZVN0YXJ0OiAwLFxyXG4gICAgICAgICAgICB2ZXJ0ZXhTdGFydDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBtZXNoYnVmZmVyID0gbmV3IE1lc2hCdWZmZXIocmVuZGVyZXIuX2hhbmRsZSwgdGhpcy5nZXRWZm10KCkpO1xyXG4gICAgICAgIGJ1ZmZlci5tZXNoYnVmZmVyID0gbWVzaGJ1ZmZlcjtcclxuXHJcbiAgICAgICAgbGV0IGlhID0gbmV3IElucHV0QXNzZW1ibGVyKG1lc2hidWZmZXIuX3ZiLCBtZXNoYnVmZmVyLl9pYik7XHJcbiAgICAgICAgYnVmZmVyLmlhID0gaWE7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1ZmZlcnMucHVzaChidWZmZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1ZmZlcnMgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9idWZmZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RCdWZmZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyIChjbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2J1ZmZlck9mZnNldCA9IDA7XHJcblxyXG4gICAgICAgIGxldCBkYXRhcyA9IHRoaXMuX2J1ZmZlcnM7XHJcbiAgICAgICAgaWYgKGNsZWFuKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5tZXNoYnVmZmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGRhdGEubWVzaGJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YXMubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZGF0YXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuaW5kaWNlU3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZGF0YS52ZXJ0ZXhTdGFydCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG1lc2hidWZmZXIgPSBkYXRhLm1lc2hidWZmZXI7XHJcbiAgICAgICAgICAgICAgICBtZXNoYnVmZmVyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbEJ1ZmZlcnMgKGdyYXBoaWNzLCByZW5kZXJlcikge1xyXG4gICAgICAgIHJlbmRlcmVyLl9mbHVzaCgpO1xyXG5cclxuICAgICAgICByZW5kZXJlci5ub2RlID0gZ3JhcGhpY3Mubm9kZTtcclxuICAgICAgICByZW5kZXJlci5tYXRlcmlhbCA9IGdyYXBoaWNzLl9tYXRlcmlhbHNbMF07XHJcblxyXG4gICAgICAgIGxldCBidWZmZXJzID0gdGhpcy5nZXRCdWZmZXJzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBsZW5ndGggPSBidWZmZXJzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgbWVzaGJ1ZmZlciA9IGJ1ZmZlci5tZXNoYnVmZmVyO1xyXG4gICAgICAgICAgICBidWZmZXIuaWEuX2NvdW50ID0gYnVmZmVyLmluZGljZVN0YXJ0O1xyXG4gICAgICAgICAgICByZW5kZXJlci5fZmx1c2hJQShidWZmZXIuaWEpO1xyXG4gICAgICAgICAgICBtZXNoYnVmZmVyLnVwbG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuQnVmZmVyIChncmFwaGljcywgY3ZlcnRzKSB7XHJcbiAgICAgICAgbGV0IGJ1ZmZlcnMgPSB0aGlzLmdldEJ1ZmZlcnMoKTsgXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbdGhpcy5fYnVmZmVyT2Zmc2V0XTtcclxuICAgICAgICBsZXQgbWVzaGJ1ZmZlciA9IGJ1ZmZlci5tZXNoYnVmZmVyO1xyXG5cclxuICAgICAgICBsZXQgbWF4VmVydHNDb3VudCA9IGJ1ZmZlci52ZXJ0ZXhTdGFydCArIGN2ZXJ0cztcclxuICAgICAgICBpZiAobWF4VmVydHNDb3VudCA+IE1BWF9WRVJURVggfHxcclxuICAgICAgICAgICAgbWF4VmVydHNDb3VudCAqIDMgPiBNQVhfSU5ESUNFKSB7XHJcbiAgICAgICAgICAgICsrdGhpcy5fYnVmZmVyT2Zmc2V0O1xyXG4gICAgICAgICAgICBtYXhWZXJ0c0NvdW50ID0gY3ZlcnRzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlck9mZnNldCA8IGJ1ZmZlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWZmZXJzW3RoaXMuX2J1ZmZlck9mZnNldF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidWZmZXIgPSB0aGlzLnJlcXVlc3RCdWZmZXIoZ3JhcGhpY3MpO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyc1t0aGlzLl9idWZmZXJPZmZzZXRdID0gYnVmZmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF4VmVydHNDb3VudCA+IG1lc2hidWZmZXIudmVydGV4T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIG1lc2hidWZmZXIucmVxdWVzdFN0YXRpYyhjdmVydHMsIGN2ZXJ0cyozKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0cm9rZSAoZ3JhcGhpY3MpIHtcclxuICAgICAgICB0aGlzLl9jdXJDb2xvciA9IGdyYXBoaWNzLl9zdHJva2VDb2xvci5fdmFsO1xyXG5cclxuICAgICAgICB0aGlzLl9mbGF0dGVuUGF0aHMoZ3JhcGhpY3MuX2ltcGwpO1xyXG4gICAgICAgIHRoaXMuX2V4cGFuZFN0cm9rZShncmFwaGljcyk7XHJcbiAgICBcclxuICAgICAgICBncmFwaGljcy5faW1wbC5fdXBkYXRlUGF0aE9mZnNldCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbCAoZ3JhcGhpY3MpIHtcclxuICAgICAgICB0aGlzLl9jdXJDb2xvciA9IGdyYXBoaWNzLl9maWxsQ29sb3IuX3ZhbDtcclxuXHJcbiAgICAgICAgdGhpcy5fZXhwYW5kRmlsbChncmFwaGljcyk7XHJcbiAgICAgICAgZ3JhcGhpY3MuX2ltcGwuX3VwZGF0ZVBhdGhPZmZzZXQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF9leHBhbmRTdHJva2UgKGdyYXBoaWNzKSB7XHJcbiAgICAgICAgbGV0IHcgPSBncmFwaGljcy5saW5lV2lkdGggKiAwLjUsXHJcbiAgICAgICAgICAgIGxpbmVDYXAgPSBncmFwaGljcy5saW5lQ2FwLFxyXG4gICAgICAgICAgICBsaW5lSm9pbiA9IGdyYXBoaWNzLmxpbmVKb2luLFxyXG4gICAgICAgICAgICBtaXRlckxpbWl0ID0gZ3JhcGhpY3MubWl0ZXJMaW1pdDtcclxuXHJcbiAgICAgICAgbGV0IGltcGwgPSBncmFwaGljcy5faW1wbDtcclxuICAgIFxyXG4gICAgICAgIGxldCBuY2FwID0gY3VydmVEaXZzKHcsIFBJLCBpbXBsLl90ZXNzVG9sKTtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUpvaW5zKGltcGwsIHcsIGxpbmVKb2luLCBtaXRlckxpbWl0KTtcclxuICAgIFxyXG4gICAgICAgIGxldCBwYXRocyA9IGltcGwuX3BhdGhzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSBtYXggdmVydGV4IHVzYWdlLlxyXG4gICAgICAgIGxldCBjdmVydHMgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHBhdGhzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcG9pbnRzTGVuZ3RoID0gcGF0aC5wb2ludHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmVKb2luID09PSBMaW5lSm9pbi5ST1VORCkgY3ZlcnRzICs9IChwb2ludHNMZW5ndGggKyBwYXRoLm5iZXZlbCAqIChuY2FwICsgMikgKyAxKSAqIDI7IC8vIHBsdXMgb25lIGZvciBsb29wXHJcbiAgICAgICAgICAgIGVsc2UgY3ZlcnRzICs9IChwb2ludHNMZW5ndGggKyBwYXRoLm5iZXZlbCAqIDUgKyAxKSAqIDI7IC8vIHBsdXMgb25lIGZvciBsb29wXHJcblxyXG4gICAgICAgICAgICBpZiAoIXBhdGguY2xvc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzcGFjZSBmb3IgY2Fwc1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuUk9VTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdmVydHMgKz0gKG5jYXAgKiAyICsgMikgKiAyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdmVydHMgKz0gKDMgKyAzKSAqIDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2VuQnVmZmVyKGdyYXBoaWNzLCBjdmVydHMpLFxyXG4gICAgICAgICAgICBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXIsXHJcbiAgICAgICAgICAgIHZEYXRhID0gbWVzaGJ1ZmZlci5fdkRhdGEsXHJcbiAgICAgICAgICAgIGlEYXRhID0gbWVzaGJ1ZmZlci5faURhdGE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHBhdGhzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcHRzID0gcGF0aC5wb2ludHM7XHJcbiAgICAgICAgICAgIGxldCBwb2ludHNMZW5ndGggPSBwdHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gYnVmZmVyLnZlcnRleFN0YXJ0O1xyXG5cclxuICAgICAgICAgICAgbGV0IHAwLCBwMTtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0LCBlbmQsIGxvb3A7XHJcbiAgICAgICAgICAgIGxvb3AgPSBwYXRoLmNsb3NlZDtcclxuICAgICAgICAgICAgaWYgKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIC8vIExvb3BpbmdcclxuICAgICAgICAgICAgICAgIHAwID0gcHRzW3BvaW50c0xlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgcDEgPSBwdHNbMF07XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBwb2ludHNMZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2FwXHJcbiAgICAgICAgICAgICAgICBwMCA9IHB0c1swXTtcclxuICAgICAgICAgICAgICAgIHAxID0gcHRzWzFdO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgZW5kID0gcG9pbnRzTGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcDEgPSBwMSB8fCBwMDtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoIWxvb3ApIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBjYXBcclxuICAgICAgICAgICAgICAgIGxldCBkUG9zID0gcDEuc3ViKHAwKTtcclxuICAgICAgICAgICAgICAgIGRQb3Mubm9ybWFsaXplU2VsZigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgZHggPSBkUG9zLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHkgPSBkUG9zLnk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQ2FwID09PSBMaW5lQ2FwLkJVVFQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnV0dENhcFN0YXJ0KHAwLCBkeCwgZHksIHcsIDApO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGluZUNhcCA9PT0gTGluZUNhcC5TUVVBUkUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnV0dENhcFN0YXJ0KHAwLCBkeCwgZHksIHcsIHcpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGluZUNhcCA9PT0gTGluZUNhcC5ST1VORClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZENhcFN0YXJ0KHAwLCBkeCwgZHksIHcsIG5jYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IHN0YXJ0OyBqIDwgZW5kOyArK2opIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lSm9pbiA9PT0gTGluZUpvaW4uUk9VTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3VuZEpvaW4ocDAsIHAxLCB3LCB3LCBuY2FwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChwMS5mbGFncyAmIChQb2ludEZsYWdzLlBUX0JFVkVMIHwgUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMKSkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iZXZlbEpvaW4ocDAsIHAxLCB3LCB3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocDEueCArIHAxLmRteCAqIHcsIHAxLnkgKyBwMS5kbXkgKiB3LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92c2V0KHAxLnggLSBwMS5kbXggKiB3LCBwMS55IC0gcDEuZG15ICogdywgLTEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBwMCA9IHAxO1xyXG4gICAgICAgICAgICAgICAgcDEgPSBwdHNbaiArIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKGxvb3ApIHtcclxuICAgICAgICAgICAgICAgIC8vIExvb3AgaXRcclxuICAgICAgICAgICAgICAgIGxldCBmbG9hdENvdW50ID0gdGhpcy5nZXRWZm10RmxvYXRDb3VudCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZEYXRhb09mc2V0ID0gb2Zmc2V0ICogZmxvYXRDb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQodkRhdGFbdkRhdGFvT2ZzZXRdLCAgIHZEYXRhW3ZEYXRhb09mc2V0KzFdLCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQodkRhdGFbdkRhdGFvT2ZzZXQrZmxvYXRDb3VudF0sIHZEYXRhW3ZEYXRhb09mc2V0K2Zsb2F0Q291bnQrMV0sIC0xKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBjYXBcclxuICAgICAgICAgICAgICAgIGxldCBkUG9zID0gcDEuc3ViKHAwKTtcclxuICAgICAgICAgICAgICAgIGRQb3Mubm9ybWFsaXplU2VsZigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgZHggPSBkUG9zLng7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHkgPSBkUG9zLnk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lQ2FwID09PSBMaW5lQ2FwLkJVVFQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnV0dENhcEVuZChwMSwgZHgsIGR5LCB3LCAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxpbmVDYXAgPT09IExpbmVDYXAuU1FVQVJFKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1dHRDYXBFbmQocDEsIGR4LCBkeSwgdywgdyk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsaW5lQ2FwID09PSBMaW5lQ2FwLlJPVU5EKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kQ2FwRW5kKHAxLCBkeCwgZHksIHcsIG5jYXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzdHJva2UgaW5kaWNlc1xyXG4gICAgICAgICAgICBsZXQgaW5kaWNlc09mZnNldCA9IGJ1ZmZlci5pbmRpY2VTdGFydDtcclxuICAgICAgICAgICAgZm9yIChsZXQgc3RhcnQgPSBvZmZzZXQrMiwgZW5kID0gYnVmZmVyLnZlcnRleFN0YXJ0OyBzdGFydCA8IGVuZDsgc3RhcnQrKykge1xyXG4gICAgICAgICAgICAgICAgaURhdGFbaW5kaWNlc09mZnNldCsrXSA9IHN0YXJ0IC0gMjtcclxuICAgICAgICAgICAgICAgIGlEYXRhW2luZGljZXNPZmZzZXQrK10gPSBzdGFydCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpRGF0YVtpbmRpY2VzT2Zmc2V0KytdID0gc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ1ZmZlci5pbmRpY2VTdGFydCA9IGluZGljZXNPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfZXhwYW5kRmlsbCAoZ3JhcGhpY3MpIHtcclxuICAgICAgICBsZXQgaW1wbCA9IGdyYXBoaWNzLl9pbXBsO1xyXG5cclxuICAgICAgICBsZXQgcGF0aHMgPSBpbXBsLl9wYXRocztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIG1heCB2ZXJ0ZXggdXNhZ2UuXHJcbiAgICAgICAgbGV0IGN2ZXJ0cyA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGltcGwuX3BhdGhPZmZzZXQsIGwgPSBpbXBsLl9wYXRoTGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gcGF0aHNbaV07XHJcbiAgICAgICAgICAgIGxldCBwb2ludHNMZW5ndGggPSBwYXRoLnBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBjdmVydHMgKz0gcG9pbnRzTGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuZ2VuQnVmZmVyKGdyYXBoaWNzLCBjdmVydHMpLFxyXG4gICAgICAgICAgICBtZXNoYnVmZmVyID0gYnVmZmVyLm1lc2hidWZmZXIsXHJcbiAgICAgICAgICAgIHZEYXRhID0gbWVzaGJ1ZmZlci5fdkRhdGEsXHJcbiAgICAgICAgICAgIGlEYXRhID0gbWVzaGJ1ZmZlci5faURhdGE7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHBhdGhzW2ldO1xyXG4gICAgICAgICAgICBsZXQgcHRzID0gcGF0aC5wb2ludHM7XHJcbiAgICAgICAgICAgIGxldCBwb2ludHNMZW5ndGggPSBwdHMubGVuZ3RoO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChwb2ludHNMZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHNoYXBlIHZlcnRpY2VzLlxyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gYnVmZmVyLnZlcnRleFN0YXJ0O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9pbnRzTGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocHRzW2pdLngsIHB0c1tqXS55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBpbmRpY2VzT2Zmc2V0ID0gYnVmZmVyLmluZGljZVN0YXJ0O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGlmIChwYXRoLmNvbXBsZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlYXJjdXREYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgZmxvYXRDb3VudCA9IHRoaXMuZ2V0VmZtdEZsb2F0Q291bnQoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBvZmZzZXQsIGVuZCA9IGJ1ZmZlci52ZXJ0ZXhTdGFydDsgaiA8IGVuZDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZEYXRhT2Zmc2V0ID0gaiAqIGZsb2F0Q291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFyY3V0RGF0YS5wdXNoKHZEYXRhW3ZEYXRhT2Zmc2V0XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWFyY3V0RGF0YS5wdXNoKHZEYXRhW3ZEYXRhT2Zmc2V0KzFdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0luZGljZXMgPSBFYXJjdXQoZWFyY3V0RGF0YSwgbnVsbCwgMik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmICghbmV3SW5kaWNlcyB8fCBuZXdJbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbkluZGljZXMgPSBuZXdJbmRpY2VzLmxlbmd0aDsgaiA8IG5JbmRpY2VzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpRGF0YVtpbmRpY2VzT2Zmc2V0KytdID0gbmV3SW5kaWNlc1tqXSArIG9mZnNldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaXJzdCA9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHN0YXJ0ID0gb2Zmc2V0KzIsIGVuZCA9IGJ1ZmZlci52ZXJ0ZXhTdGFydDsgc3RhcnQgPCBlbmQ7IHN0YXJ0KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpRGF0YVtpbmRpY2VzT2Zmc2V0KytdID0gZmlyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgaURhdGFbaW5kaWNlc09mZnNldCsrXSA9IHN0YXJ0IC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpRGF0YVtpbmRpY2VzT2Zmc2V0KytdID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ1ZmZlci5pbmRpY2VTdGFydCA9IGluZGljZXNPZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jYWxjdWxhdGVKb2lucyAoaW1wbCwgdywgbGluZUpvaW4sIG1pdGVyTGltaXQpIHtcclxuICAgICAgICBsZXQgaXcgPSAwLjA7XHJcbiAgICBcclxuICAgICAgICBpZiAodyA+IDAuMCkge1xyXG4gICAgICAgICAgICBpdyA9IDEgLyB3O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBqb2lucyBuZWVkcyBleHRyYSB2ZXJ0aWNlcyB0byBhcHBlbmQsIGFuZCBnYXRoZXIgdmVydGV4IGNvdW50LlxyXG4gICAgICAgIGxldCBwYXRocyA9IGltcGwuX3BhdGhzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBpbXBsLl9wYXRoT2Zmc2V0LCBsID0gaW1wbC5fcGF0aExlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHBhdGhzW2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBwdHMgPSBwYXRoLnBvaW50cztcclxuICAgICAgICAgICAgbGV0IHB0c0xlbmd0aCA9IHB0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwMCA9IHB0c1twdHNMZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHAxID0gcHRzWzBdO1xyXG4gICAgICAgICAgICBsZXQgbmxlZnQgPSAwO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHBhdGgubmJldmVsID0gMDtcclxuICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHB0c0xlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG1yMiwgY3Jvc3MsIGxpbWl0O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBwZXJwIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIGxldCBkbHgwID0gcDAuZHk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGx5MCA9IC1wMC5keDtcclxuICAgICAgICAgICAgICAgIGxldCBkbHgxID0gcDEuZHk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGx5MSA9IC1wMS5keDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGV4dHJ1c2lvbnNcclxuICAgICAgICAgICAgICAgIHAxLmRteCA9IChkbHgwICsgZGx4MSkgKiAwLjU7XHJcbiAgICAgICAgICAgICAgICBwMS5kbXkgPSAoZGx5MCArIGRseTEpICogMC41O1xyXG4gICAgICAgICAgICAgICAgZG1yMiA9IHAxLmRteCAqIHAxLmRteCArIHAxLmRteSAqIHAxLmRteTtcclxuICAgICAgICAgICAgICAgIGlmIChkbXIyID4gMC4wMDAwMDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGUgPSAxIC8gZG1yMjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NhbGUgPiA2MDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSA2MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHAxLmRteCAqPSBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBwMS5kbXkgKj0gc2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgbGVmdCB0dXJucy5cclxuICAgICAgICAgICAgICAgIGNyb3NzID0gcDEuZHggKiBwMC5keSAtIHAwLmR4ICogcDEuZHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3Jvc3MgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmxlZnQrKztcclxuICAgICAgICAgICAgICAgICAgICBwMS5mbGFncyB8PSBQb2ludEZsYWdzLlBUX0xFRlQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBpZiB3ZSBzaG91bGQgdXNlIGJldmVsIG9yIG1pdGVyIGZvciBpbm5lciBqb2luLlxyXG4gICAgICAgICAgICAgICAgbGltaXQgPSBtYXgoMTEsIG1pbihwMC5sZW4sIHAxLmxlbikgKiBpdyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG1yMiAqIGxpbWl0ICogbGltaXQgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcDEuZmxhZ3MgfD0gUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgZG0gbGVuZ3RoIGlzIHRvbyBsb25nXHJcbiAgICAgICAgICAgICAgICBsZXQgZG13eCA9IHAxLmRteCAqIHc7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG13eSA9IHAxLmRteSAqIHc7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG1sZW4gPSBkbXd4KmRtd3ggKyBkbXd5KmRtd3k7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG1sZW4gPiAocDEubGVuICogcDEubGVuKSB8fCBkbWxlbiA+IChwMC5sZW4gKiBwMC5sZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcDEuZmxhZ3MgfD0gUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGNvcm5lciBuZWVkcyB0byBiZSBiZXZlbGVkLlxyXG4gICAgICAgICAgICAgICAgaWYgKHAxLmZsYWdzICYgUG9pbnRGbGFncy5QVF9DT1JORVIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG1yMiAqIG1pdGVyTGltaXQgKiBtaXRlckxpbWl0IDwgMSB8fCBsaW5lSm9pbiA9PT0gTGluZUpvaW4uQkVWRUwgfHwgbGluZUpvaW4gPT09IExpbmVKb2luLlJPVU5EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAxLmZsYWdzIHw9IFBvaW50RmxhZ3MuUFRfQkVWRUw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoKHAxLmZsYWdzICYgKFBvaW50RmxhZ3MuUFRfQkVWRUwgfCBQb2ludEZsYWdzLlBUX0lOTkVSQkVWRUwpKSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGgubmJldmVsKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHAwID0gcDE7XHJcbiAgICAgICAgICAgICAgICBwMSA9IHB0c1tqICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9mbGF0dGVuUGF0aHMgKGltcGwpIHtcclxuICAgICAgICBsZXQgcGF0aHMgPSBpbXBsLl9wYXRocztcclxuICAgICAgICBmb3IgKGxldCBpID0gaW1wbC5fcGF0aE9mZnNldCwgbCA9IGltcGwuX3BhdGhMZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBwYXRoc1tpXTtcclxuICAgICAgICAgICAgbGV0IHB0cyA9IHBhdGgucG9pbnRzO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBwMCA9IHB0c1twdHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgIGxldCBwMSA9IHB0c1swXTtcclxuICAgIFxyXG4gICAgICAgICAgICBpZiAocHRzLmxlbmd0aCA+IDIgJiYgcDAuZXF1YWxzKHAxKSkge1xyXG4gICAgICAgICAgICAgICAgcGF0aC5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcHRzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgcDAgPSBwdHNbcHRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIHNpemUgPSBwdHMubGVuZ3RoOyBqIDwgc2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgc2VnbWVudCBkaXJlY3Rpb24gYW5kIGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgbGV0IGRQb3MgPSBwMS5zdWIocDApO1xyXG4gICAgICAgICAgICAgICAgcDAubGVuID0gZFBvcy5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkUG9zLnggfHwgZFBvcy55KVxyXG4gICAgICAgICAgICAgICAgICAgIGRQb3Mubm9ybWFsaXplU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgcDAuZHggPSBkUG9zLng7XHJcbiAgICAgICAgICAgICAgICBwMC5keSA9IGRQb3MueTtcclxuICAgICAgICAgICAgICAgIC8vIEFkdmFuY2VcclxuICAgICAgICAgICAgICAgIHAwID0gcDE7XHJcbiAgICAgICAgICAgICAgICBwMSA9IHB0c1tqICsgMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Nob29zZUJldmVsIChiZXZlbCwgcDAsIHAxLCB3KSB7XHJcbiAgICAgICAgbGV0IHggPSBwMS54O1xyXG4gICAgICAgIGxldCB5ID0gcDEueTtcclxuICAgICAgICBsZXQgeDAsIHkwLCB4MSwgeTE7XHJcbiAgICBcclxuICAgICAgICBpZiAoYmV2ZWwgIT09IDApIHtcclxuICAgICAgICAgICAgeDAgPSB4ICsgcDAuZHkgKiB3O1xyXG4gICAgICAgICAgICB5MCA9IHkgLSBwMC5keCAqIHc7XHJcbiAgICAgICAgICAgIHgxID0geCArIHAxLmR5ICogdztcclxuICAgICAgICAgICAgeTEgPSB5IC0gcDEuZHggKiB3O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHgwID0geDEgPSB4ICsgcDEuZG14ICogdztcclxuICAgICAgICAgICAgeTAgPSB5MSA9IHkgKyBwMS5kbXkgKiB3O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfYnV0dENhcFN0YXJ0IChwLCBkeCwgZHksIHcsIGQpIHtcclxuICAgICAgICBsZXQgcHggPSBwLnggLSBkeCAqIGQ7XHJcbiAgICAgICAgbGV0IHB5ID0gcC55IC0gZHkgKiBkO1xyXG4gICAgICAgIGxldCBkbHggPSBkeTtcclxuICAgICAgICBsZXQgZGx5ID0gLWR4O1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fdnNldChweCArIGRseCAqIHcsIHB5ICsgZGx5ICogdywgMSk7XHJcbiAgICAgICAgdGhpcy5fdnNldChweCAtIGRseCAqIHcsIHB5IC0gZGx5ICogdywgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIF9idXR0Q2FwRW5kIChwLCBkeCwgZHksIHcsIGQpIHtcclxuICAgICAgICBsZXQgcHggPSBwLnggKyBkeCAqIGQ7XHJcbiAgICAgICAgbGV0IHB5ID0gcC55ICsgZHkgKiBkO1xyXG4gICAgICAgIGxldCBkbHggPSBkeTtcclxuICAgICAgICBsZXQgZGx5ID0gLWR4O1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fdnNldChweCArIGRseCAqIHcsIHB5ICsgZGx5ICogdywgMSk7XHJcbiAgICAgICAgdGhpcy5fdnNldChweCAtIGRseCAqIHcsIHB5IC0gZGx5ICogdywgLTEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfcm91bmRDYXBTdGFydCAocCwgZHgsIGR5LCB3LCBuY2FwKSB7XHJcbiAgICAgICAgbGV0IHB4ID0gcC54O1xyXG4gICAgICAgIGxldCBweSA9IHAueTtcclxuICAgICAgICBsZXQgZGx4ID0gZHk7XHJcbiAgICAgICAgbGV0IGRseSA9IC1keDtcclxuICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmNhcDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhID0gaSAvIChuY2FwIC0gMSkgKiBQSTtcclxuICAgICAgICAgICAgbGV0IGF4ID0gY29zKGEpICogdyxcclxuICAgICAgICAgICAgICAgIGF5ID0gc2luKGEpICogdztcclxuICAgICAgICAgICAgdGhpcy5fdnNldChweCAtIGRseCAqIGF4IC0gZHggKiBheSwgcHkgLSBkbHkgKiBheCAtIGR5ICogYXksIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHB4LCBweSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ZzZXQocHggKyBkbHggKiB3LCBweSArIGRseSAqIHcsIDEpO1xyXG4gICAgICAgIHRoaXMuX3ZzZXQocHggLSBkbHggKiB3LCBweSAtIGRseSAqIHcsIC0xKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgX3JvdW5kQ2FwRW5kIChwLCBkeCwgZHksIHcsIG5jYXApIHtcclxuICAgICAgICBsZXQgcHggPSBwLng7XHJcbiAgICAgICAgbGV0IHB5ID0gcC55O1xyXG4gICAgICAgIGxldCBkbHggPSBkeTtcclxuICAgICAgICBsZXQgZGx5ID0gLWR4O1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy5fdnNldChweCArIGRseCAqIHcsIHB5ICsgZGx5ICogdywgMSk7XHJcbiAgICAgICAgdGhpcy5fdnNldChweCAtIGRseCAqIHcsIHB5IC0gZGx5ICogdywgLTEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmNhcDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhID0gaSAvIChuY2FwIC0gMSkgKiBQSTtcclxuICAgICAgICAgICAgbGV0IGF4ID0gY29zKGEpICogdyxcclxuICAgICAgICAgICAgICAgIGF5ID0gc2luKGEpICogdztcclxuICAgICAgICAgICAgdGhpcy5fdnNldChweCwgcHksIDApO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHB4IC0gZGx4ICogYXggKyBkeCAqIGF5LCBweSAtIGRseSAqIGF4ICsgZHkgKiBheSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfcm91bmRKb2luIChwMCwgcDEsIGx3LCBydywgbmNhcCkge1xyXG4gICAgICAgIGxldCBkbHgwID0gcDAuZHk7XHJcbiAgICAgICAgbGV0IGRseTAgPSAtcDAuZHg7XHJcbiAgICAgICAgbGV0IGRseDEgPSBwMS5keTtcclxuICAgICAgICBsZXQgZGx5MSA9IC1wMS5keDtcclxuICAgIFxyXG4gICAgICAgIGxldCBwMXggPSBwMS54O1xyXG4gICAgICAgIGxldCBwMXkgPSBwMS55O1xyXG4gICAgXHJcbiAgICAgICAgaWYgKChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfTEVGVCkgIT09IDApIHtcclxuICAgICAgICAgICAgbGV0IG91dCA9IHRoaXMuX2Nob29zZUJldmVsKHAxLmZsYWdzICYgUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMLCBwMCwgcDEsIGx3KTtcclxuICAgICAgICAgICAgbGV0IGx4MCA9IG91dFswXTtcclxuICAgICAgICAgICAgbGV0IGx5MCA9IG91dFsxXTtcclxuICAgICAgICAgICAgbGV0IGx4MSA9IG91dFsyXTtcclxuICAgICAgICAgICAgbGV0IGx5MSA9IG91dFszXTtcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgYTAgPSBhdGFuMigtZGx5MCwgLWRseDApO1xyXG4gICAgICAgICAgICBsZXQgYTEgPSBhdGFuMigtZGx5MSwgLWRseDEpO1xyXG4gICAgICAgICAgICBpZiAoYTEgPiBhMCkgYTEgLT0gUEkgKiAyO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQobHgwLCBseTAsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxeCAtIGRseDAgKiBydywgcDEueSAtIGRseTAgKiBydywgLTEpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gY2xhbXAoY2VpbCgoYTAgLSBhMSkgLyBQSSkgKiBuY2FwLCAyLCBuY2FwKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB1ID0gaSAvIChuIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGEwICsgdSAqIChhMSAtIGEwKTtcclxuICAgICAgICAgICAgICAgIGxldCByeCA9IHAxeCArIGNvcyhhKSAqIHJ3O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJ5ID0gcDF5ICsgc2luKGEpICogcnc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92c2V0KHAxeCwgcDF5LCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZzZXQocngsIHJ5LCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl92c2V0KGx4MSwgbHkxLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fdnNldChwMXggLSBkbHgxICogcncsIHAxeSAtIGRseTEgKiBydywgLTEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBvdXQgPSB0aGlzLl9jaG9vc2VCZXZlbChwMS5mbGFncyAmIFBvaW50RmxhZ3MuUFRfSU5ORVJCRVZFTCwgcDAsIHAxLCAtcncpO1xyXG4gICAgICAgICAgICBsZXQgcngwID0gb3V0WzBdO1xyXG4gICAgICAgICAgICBsZXQgcnkwID0gb3V0WzFdO1xyXG4gICAgICAgICAgICBsZXQgcngxID0gb3V0WzJdO1xyXG4gICAgICAgICAgICBsZXQgcnkxID0gb3V0WzNdO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBhMCA9IGF0YW4yKGRseTAsIGRseDApO1xyXG4gICAgICAgICAgICBsZXQgYTEgPSBhdGFuMihkbHkxLCBkbHgxKTtcclxuICAgICAgICAgICAgaWYgKGExIDwgYTApIGExICs9IFBJICogMjtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxeCArIGRseDAgKiBydywgcDF5ICsgZGx5MCAqIHJ3LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fdnNldChyeDAsIHJ5MCwgLTEpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBuID0gY2xhbXAoY2VpbCgoYTEgLSBhMCkgLyBQSSkgKiBuY2FwLCAyLCBuY2FwKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB1ID0gaSAvIChuIC0gMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IGEwICsgdSAqIChhMSAtIGEwKTtcclxuICAgICAgICAgICAgICAgIGxldCBseCA9IHAxeCArIGNvcyhhKSAqIGx3O1xyXG4gICAgICAgICAgICAgICAgbGV0IGx5ID0gcDF5ICsgc2luKGEpICogbHc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92c2V0KGx4LCBseSwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92c2V0KHAxeCwgcDF5LCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQocDF4ICsgZGx4MSAqIHJ3LCBwMXkgKyBkbHkxICogcncsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHJ4MSwgcnkxLCAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfYmV2ZWxKb2luIChwMCwgcDEsIGx3LCBydykge1xyXG4gICAgICAgIGxldCByeDAsIHJ5MCwgcngxLCByeTE7XHJcbiAgICAgICAgbGV0IGx4MCwgbHkwLCBseDEsIGx5MTtcclxuICAgICAgICBsZXQgZGx4MCA9IHAwLmR5O1xyXG4gICAgICAgIGxldCBkbHkwID0gLXAwLmR4O1xyXG4gICAgICAgIGxldCBkbHgxID0gcDEuZHk7XHJcbiAgICAgICAgbGV0IGRseTEgPSAtcDEuZHg7XHJcbiAgICBcclxuICAgICAgICBpZiAocDEuZmxhZ3MgJiBQb2ludEZsYWdzLlBUX0xFRlQpIHtcclxuICAgICAgICAgICAgbGV0IG91dCA9IHRoaXMuX2Nob29zZUJldmVsKHAxLmZsYWdzICYgUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMLCBwMCwgcDEsIGx3KTtcclxuICAgICAgICAgICAgbHgwID0gb3V0WzBdO1xyXG4gICAgICAgICAgICBseTAgPSBvdXRbMV07XHJcbiAgICAgICAgICAgIGx4MSA9IG91dFsyXTtcclxuICAgICAgICAgICAgbHkxID0gb3V0WzNdO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX3ZzZXQobHgwLCBseTAsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxLnggLSBkbHgwICogcncsIHAxLnkgLSBkbHkwICogcncsIC0xKTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl92c2V0KGx4MSwgbHkxLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fdnNldChwMS54IC0gZGx4MSAqIHJ3LCBwMS55IC0gZGx5MSAqIHJ3LCAtMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG91dCA9IHRoaXMuX2Nob29zZUJldmVsKHAxLmZsYWdzICYgUG9pbnRGbGFncy5QVF9JTk5FUkJFVkVMLCBwMCwgcDEsIC1ydyk7XHJcbiAgICAgICAgICAgIHJ4MCA9IG91dFswXTtcclxuICAgICAgICAgICAgcnkwID0gb3V0WzFdO1xyXG4gICAgICAgICAgICByeDEgPSBvdXRbMl07XHJcbiAgICAgICAgICAgIHJ5MSA9IG91dFszXTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHAxLnggKyBkbHgwICogbHcsIHAxLnkgKyBkbHkwICogbHcsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl92c2V0KHJ4MCwgcnkwLCAtMSk7XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5fdnNldChwMS54ICsgZGx4MSAqIGx3LCBwMS55ICsgZGx5MSAqIGx3LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5fdnNldChyeDEsIHJ5MSwgLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX3ZzZXQgKHgsIHksIGRpc3RhbmNlID0gMCkge1xyXG4gICAgICAgIGxldCBidWZmZXIgPSB0aGlzLl9idWZmZXI7XHJcbiAgICAgICAgbGV0IG1lc2hidWZmZXIgPSBidWZmZXIubWVzaGJ1ZmZlcjtcclxuICAgICAgICBsZXQgZGF0YU9mZnNldCA9IGJ1ZmZlci52ZXJ0ZXhTdGFydCAqIHRoaXMuZ2V0VmZtdEZsb2F0Q291bnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHZEYXRhID0gbWVzaGJ1ZmZlci5fdkRhdGE7XHJcbiAgICAgICAgbGV0IHVpbnRWRGF0YSA9IG1lc2hidWZmZXIuX3VpbnRWRGF0YTtcclxuXHJcbiAgICAgICAgdkRhdGFbZGF0YU9mZnNldF0gPSB4O1xyXG4gICAgICAgIHZEYXRhW2RhdGFPZmZzZXQrMV0gPSB5O1xyXG4gICAgICAgIHVpbnRWRGF0YVtkYXRhT2Zmc2V0KzJdID0gdGhpcy5fY3VyQ29sb3I7XHJcbiAgICAgICAgdkRhdGFbZGF0YU9mZnNldCszXSA9IGRpc3RhbmNlO1xyXG5cclxuICAgICAgICBidWZmZXIudmVydGV4U3RhcnQgKys7XHJcbiAgICAgICAgbWVzaGJ1ZmZlci5fZGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5Bc3NlbWJsZXIucmVnaXN0ZXIoY2MuR3JhcGhpY3MsIEdyYXBoaWNzQXNzZW1ibGVyKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=