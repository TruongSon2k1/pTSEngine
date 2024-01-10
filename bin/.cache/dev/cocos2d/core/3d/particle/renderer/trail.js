
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/renderer/trail.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _valueTypes = require("../../../value-types");

var _gfx = _interopRequireDefault(require("../../../../renderer/gfx"));

var _pool = _interopRequireDefault(require("../../../../renderer/memop/pool"));

var _curveRange = _interopRequireDefault(require("../animator/curve-range"));

var _gradientRange = _interopRequireDefault(require("../animator/gradient-range"));

var _enum = require("../enum");

var _utils = _interopRequireDefault(require("../utils"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var PRE_TRIANGLE_INDEX = 1;
var NEXT_TRIANGLE_INDEX = 1 << 2;
var DIRECTION_THRESHOLD = Math.cos((0, _valueTypes.toRadian)(100));
var _temp_trailEle = {
  position: cc.v3(),
  velocity: cc.v3()
};

var _temp_quat = cc.quat();

var _temp_xform = cc.mat4();

var _temp_Vec3 = cc.v3();

var _temp_Vec3_1 = cc.v3();

var _temp_color = cc.color(); // var barycentric = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // <wireframe debug>
// var _bcIdx = 0;


var ITrailElement = function ITrailElement() {
  this.position = void 0;
  this.lifetime = void 0;
  this.width = void 0;
  this.velocity = void 0;
  this.color = void 0;
}; // the valid element is in [start,end) range.if start equals -1,it represents the array is empty.


var TrailSegment = /*#__PURE__*/function () {
  function TrailSegment(maxTrailElementNum) {
    this.start = void 0;
    this.end = void 0;
    this.trailElements = [];
    this.start = -1;
    this.end = -1;
    this.trailElements = [];

    while (maxTrailElementNum--) {
      this.trailElements.push({
        position: cc.v3(),
        lifetime: 0,
        width: 0,
        velocity: cc.v3(),
        direction: 0,
        color: cc.color()
      });
    }
  }

  var _proto = TrailSegment.prototype;

  _proto.getElement = function getElement(idx) {
    if (this.start === -1) {
      return null;
    }

    if (idx < 0) {
      idx = (idx + this.trailElements.length) % this.trailElements.length;
    }

    if (idx >= this.trailElements.length) {
      idx %= this.trailElements.length;
    }

    return this.trailElements[idx];
  };

  _proto.addElement = function addElement() {
    if (this.trailElements.length === 0) {
      return null;
    }

    if (this.start === -1) {
      this.start = 0;
      this.end = 1;
      return this.trailElements[0];
    }

    if (this.start === this.end) {
      this.trailElements.splice(this.end, 0, {
        position: cc.v3(),
        lifetime: 0,
        width: 0,
        velocity: cc.v3(),
        direction: 0,
        color: cc.color()
      });
      this.start++;
      this.start %= this.trailElements.length;
    }

    var newEleLoc = this.end++;
    this.end %= this.trailElements.length;
    return this.trailElements[newEleLoc];
  };

  _proto.iterateElement = function iterateElement(target, f, p, dt) {
    var end = this.start >= this.end ? this.end + this.trailElements.length : this.end;

    for (var i = this.start; i < end; i++) {
      if (f(target, this.trailElements[i % this.trailElements.length], p, dt)) {
        this.start++;
        this.start %= this.trailElements.length;
      }
    }

    if (this.start === end) {
      this.start = -1;
      this.end = -1;
    }
  };

  _proto.count = function count() {
    if (this.start < this.end) {
      return this.end - this.start;
    } else {
      return this.trailElements.length + this.end - this.start;
    }
  };

  _proto.clear = function clear() {
    this.start = -1;
    this.end = -1;
  };

  return TrailSegment;
}();
/**
 * !#en The trail module of 3d particle.
 * !#zh 3D 粒子拖尾模块
 * @class TrailModule
 */


var TrailModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.TrailModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.TrailMode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _enum.Space
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _enum.TextureMode
}), _dec6 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec7 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec8 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function TrailModule() {
    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "mode", _descriptor2, this);

    _initializerDefineProperty(this, "lifeTime", _descriptor3, this);

    _initializerDefineProperty(this, "_minParticleDistance", _descriptor4, this);

    _initializerDefineProperty(this, "_space", _descriptor5, this);

    _initializerDefineProperty(this, "existWithParticles", _descriptor6, this);

    _initializerDefineProperty(this, "textureMode", _descriptor7, this);

    _initializerDefineProperty(this, "widthFromParticle", _descriptor8, this);

    _initializerDefineProperty(this, "widthRatio", _descriptor9, this);

    _initializerDefineProperty(this, "colorFromParticle", _descriptor10, this);

    _initializerDefineProperty(this, "colorOverTrail", _descriptor11, this);

    _initializerDefineProperty(this, "colorOvertime", _descriptor12, this);

    this._particleSystem = null;
    this._minSquaredDistance = 0;
    this._vertSize = 0;
    this._trailNum = 0;
    this._trailLifetime = 0;
    this.vbOffset = 0;
    this.ibOffset = 0;
    this._trailSegments = null;
    this._particleTrail = null;
    this._ia = null;
    this._gfxVFmt = null;
    this._vbF32 = null;
    this._vbUint32 = null;
    this._iBuffer = null;
    this._needTransform = null;
    this._defaultMat = null;
    this._material = null;
    this._gfxVFmt = new _gfx["default"].VertexFormat([{
      name: _gfx["default"].ATTR_POSITION,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 3
    }, {
      name: _gfx["default"].ATTR_TEX_COORD,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 4
    }, //{ name: gfx.ATTR_TEX_COORD2, type: gfx.ATTR_TYPE_FLOAT32, num: 3 }, // <wireframe debug>
    {
      name: _gfx["default"].ATTR_TEX_COORD1,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 3
    }, {
      name: _gfx["default"].ATTR_COLOR,
      type: _gfx["default"].ATTR_TYPE_UINT8,
      num: 4,
      normalize: true
    }]);
    this._vertSize = this._gfxVFmt._bytes;
    this._particleTrail = new _utils["default"](); // Map<Particle, TrailSegment>();
  }

  var _proto2 = TrailModule.prototype;

  _proto2.onInit = function onInit(ps) {
    this._particleSystem = ps;
    this.minParticleDistance = this._minParticleDistance;
    var burstCount = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(ps.bursts), _step; !(_step = _iterator()).done;) {
      var b = _step.value;
      burstCount += b.getMaxCount(ps);
    }

    this.lifeTime.constant = 1;
    this._trailNum = Math.ceil(ps.startLifetime.getMax() * this.lifeTime.getMax() * 60 * (ps.rateOverTime.getMax() * ps.duration + burstCount));
    this._trailSegments = new _pool["default"](function () {
      return new TrailSegment(10);
    }, Math.ceil(ps.rateOverTime.getMax() * ps.duration));

    if (this._enable) {
      this.enable = this._enable;

      this._updateMaterial();
    }
  };

  _proto2.onEnable = function onEnable() {};

  _proto2.onDisable = function onDisable() {};

  _proto2.destroy = function destroy() {
    if (this._trailSegments) {
      this._trailSegments.clear(function (obj) {
        obj.trailElements.length = 0;
      });

      this._trailSegments = null;
    }
  };

  _proto2.clear = function clear() {
    if (this.enable) {
      var trailIter = this._particleTrail.values();

      var trail = trailIter.next();

      while (!trail.done) {
        trail.value.clear();
        trail = trailIter.next();
      }

      this._particleTrail.clear();

      this.updateTrailBuffer();
    }
  };

  _proto2._createTrailData = function _createTrailData() {
    var model = this._particleSystem._assembler._model;

    if (model) {
      model.createTrailData(this._gfxVFmt, this._trailNum);
      var subData = model._subDatas[1];
      this._vbF32 = subData.getVData();
      this._vbUint32 = subData.getVData(Uint32Array);
      this._iBuffer = subData.iData;
    }
  };

  _proto2._updateMaterial = function _updateMaterial() {
    if (this._particleSystem) {
      var mat = this._particleSystem.trailMaterial;

      if (mat) {
        this._material = mat;
      } else {
        this._material = this._particleSystem._assembler._defaultTrailMat;
      }
    }
  };

  _proto2.update = function update() {
    this._trailLifetime = this.lifeTime.evaluate(this._particleSystem._time, 1);

    if (this.space === _enum.Space.World && this._particleSystem._simulationSpace === _enum.Space.Local) {
      this._needTransform = true;

      this._particleSystem.node.getWorldMatrix(_temp_xform);

      this._particleSystem.node.getWorldRotation(_temp_quat);
    } else {
      this._needTransform = false;
    }
  };

  _proto2.animate = function animate(p, scaledDt) {
    if (!this._trailSegments) {
      return;
    }

    var trail = this._particleTrail.get(p);

    if (!trail) {
      trail = this._trailSegments.alloc();

      this._particleTrail.set(p, trail);

      return;
    }

    var lastSeg = trail.getElement(trail.end - 1);

    if (this._needTransform) {
      _valueTypes.Vec3.transformMat4(_temp_Vec3, p.position, _temp_xform);
    } else {
      _valueTypes.Vec3.copy(_temp_Vec3, p.position);
    }

    if (lastSeg) {
      trail.iterateElement(this, this._updateTrailElement, p, scaledDt);

      if (_valueTypes.Vec3.squaredDistance(lastSeg.position, _temp_Vec3) < this._minSquaredDistance) {
        return;
      }
    }

    lastSeg = trail.addElement();

    if (!lastSeg) {
      return;
    }

    _valueTypes.Vec3.copy(lastSeg.position, _temp_Vec3);

    lastSeg.lifetime = 0;

    if (this.widthFromParticle) {
      lastSeg.width = p.size.x * this.widthRatio.evaluate(0, 1);
    } else {
      lastSeg.width = this.widthRatio.evaluate(0, 1);
    }

    var trailNum = trail.count();

    if (trailNum === 2) {
      var lastSecondTrail = trail.getElement(trail.end - 2);

      _valueTypes.Vec3.subtract(lastSecondTrail.velocity, lastSeg.position, lastSecondTrail.position);
    } else if (trailNum > 2) {
      var _lastSecondTrail = trail.getElement(trail.end - 2);

      var lastThirdTrail = trail.getElement(trail.end - 3);

      _valueTypes.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, _lastSecondTrail.position);

      _valueTypes.Vec3.subtract(_temp_Vec3_1, lastSeg.position, _lastSecondTrail.position);

      _valueTypes.Vec3.subtract(_lastSecondTrail.velocity, _temp_Vec3_1, _temp_Vec3);

      if (_valueTypes.Vec3.equals(cc.Vec3.ZERO, _lastSecondTrail.velocity)) {
        _valueTypes.Vec3.copy(_lastSecondTrail.velocity, _temp_Vec3);
      }
    }

    if (this.colorFromParticle) {
      lastSeg.color.set(p.color);
    } else {
      lastSeg.color.set(this.colorOvertime.evaluate(0, 1));
    }
  };

  _proto2._updateTrailElement = function _updateTrailElement(trail, trailEle, p, dt) {
    trailEle.lifetime += dt;

    if (trail.colorFromParticle) {
      trailEle.color.set(p.color);
      trailEle.color.multiply(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    } else {
      trailEle.color.set(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    }

    if (trail.widthFromParticle) {
      trailEle.width = p.size.x * trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
    } else {
      trailEle.width = trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
    }

    return trailEle.lifetime > trail._trailLifetime;
  };

  _proto2.removeParticle = function removeParticle(p) {
    var trail = this._particleTrail.get(p);

    if (trail && this._trailSegments) {
      trail.clear();

      this._trailSegments.free(trail);

      this._particleTrail["delete"](p);
    }
  };

  _proto2.updateTrailBuffer = function updateTrailBuffer() {
    this.vbOffset = 0;
    this.ibOffset = 0;

    for (var _iterator2 = _createForOfIteratorHelperLoose(this._particleTrail.keys()), _step2; !(_step2 = _iterator2()).done;) {
      var p = _step2.value;

      var trailSeg = this._particleTrail.get(p);

      if (trailSeg.start === -1) {
        continue;
      }

      var indexOffset = this.vbOffset * 4 / this._vertSize;
      var end = trailSeg.start >= trailSeg.end ? trailSeg.end + trailSeg.trailElements.length : trailSeg.end;
      var trailNum = end - trailSeg.start; // const lastSegRatio = Vec3.distance(trailSeg.getTailElement()!.position, p.position) / this._minParticleDistance;

      var textCoordSeg = 1 / trailNum
      /*- 1 + lastSegRatio*/
      ;
      var startSegEle = trailSeg.trailElements[trailSeg.start];

      this._fillVertexBuffer(startSegEle, this.colorOverTrail.evaluate(1, 1), indexOffset, 1, 0, NEXT_TRIANGLE_INDEX);

      for (var i = trailSeg.start + 1; i < end; i++) {
        var segEle = trailSeg.trailElements[i % trailSeg.trailElements.length];
        var j = i - trailSeg.start;

        this._fillVertexBuffer(segEle, this.colorOverTrail.evaluate(1 - j / trailNum, 1), indexOffset, 1 - j * textCoordSeg, j, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
      }

      if (this._needTransform) {
        _valueTypes.Vec3.transformMat4(_temp_trailEle.position, p.position, _temp_xform);
      } else {
        _valueTypes.Vec3.copy(_temp_trailEle.position, p.position);
      }

      if (trailNum === 1 || trailNum === 2) {
        var lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);

        _valueTypes.Vec3.subtract(lastSecondTrail.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._vbF32[this.vbOffset - this._vertSize / 4 - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 2] = lastSecondTrail.velocity.z;
        this._vbF32[this.vbOffset - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - 2] = lastSecondTrail.velocity.z;

        _valueTypes.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
      } else if (trailNum > 2) {
        var _lastSecondTrail2 = trailSeg.getElement(trailSeg.end - 1);

        var lastThirdTrail = trailSeg.getElement(trailSeg.end - 2);

        _valueTypes.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.subtract(_temp_Vec3_1, _temp_trailEle.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.normalize(_temp_Vec3, _temp_Vec3);

        _valueTypes.Vec3.normalize(_temp_Vec3_1, _temp_Vec3_1);

        _valueTypes.Vec3.subtract(_lastSecondTrail2.velocity, _temp_Vec3_1, _temp_Vec3);

        _valueTypes.Vec3.normalize(_lastSecondTrail2.velocity, _lastSecondTrail2.velocity);

        this._checkDirectionReverse(_lastSecondTrail2, lastThirdTrail);

        this.vbOffset -= this._vertSize / 4 * 2;
        this.ibOffset -= 6; //_bcIdx = (_bcIdx - 6 + 9) % 9;  // <wireframe debug>

        this._fillVertexBuffer(_lastSecondTrail2, this.colorOverTrail.evaluate(textCoordSeg, 1), indexOffset, textCoordSeg, trailNum - 1, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);

        _valueTypes.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.normalize(_temp_trailEle.velocity, _temp_trailEle.velocity);

        this._checkDirectionReverse(_temp_trailEle, _lastSecondTrail2);
      }

      if (this.widthFromParticle) {
        _temp_trailEle.width = p.size.x * this.widthRatio.evaluate(0, 1);
      } else {
        _temp_trailEle.width = this.widthRatio.evaluate(0, 1);
      }

      _temp_trailEle.color = p.color;

      if (_valueTypes.Vec3.equals(_temp_trailEle.velocity, cc.Vec3.ZERO)) {
        this.ibOffset -= 3;
      } else {
        this._fillVertexBuffer(_temp_trailEle, this.colorOverTrail.evaluate(0, 1), indexOffset, 0, trailNum, PRE_TRIANGLE_INDEX);
      }
    }

    this._updateIA(this.ibOffset);
  };

  _proto2._fillVertexBuffer = function _fillVertexBuffer(trailSeg, colorModifer, indexOffset, xTexCoord, trailEleIdx, indexSet) {
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 0;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 0; // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;

    _temp_color.set(trailSeg.color);

    _temp_color.multiply(colorModifer);

    this._vbUint32[this.vbOffset++] = _temp_color._val;
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 1;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 1; // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
    this._vbUint32[this.vbOffset++] = _temp_color._val;

    if (indexSet & PRE_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx - 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
    }

    if (indexSet & NEXT_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 2;
    }
  };

  _proto2._updateIA = function _updateIA(count) {
    if (this._particleSystem && this._particleSystem._assembler) {
      this._particleSystem._assembler.updateIA(1, count, true, true);
    }
  };

  _proto2._checkDirectionReverse = function _checkDirectionReverse(currElement, prevElement) {
    if (_valueTypes.Vec3.dot(currElement.velocity, prevElement.velocity) < DIRECTION_THRESHOLD) {
      currElement.direction = 1 - prevElement.direction;
    } else {
      currElement.direction = prevElement.direction;
    }
  };

  _createClass(TrailModule, [{
    key: "enable",
    get:
    /**
     * !#en The enable of trailModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */
    function get() {
      return this._enable;
    },
    set: function set(val) {
      if (val) {
        this._createTrailData();
      }

      if (val && !this._enable) {
        this._enable = val;

        this._particleSystem._assembler._updateTrailMaterial();
      }

      this._enable = val;

      this._particleSystem._assembler._updateTrailEnable(this._enable);
    }
    /**
     * !#en Sets how particles generate trajectories.
     * !#zh 设定粒子生成轨迹的方式。
     * @property {TrailMode} mode
     */

  }, {
    key: "minParticleDistance",
    get:
    /**
     * !#en Minimum spacing between each track particle
     * !#zh 每个轨迹粒子之间的最小间距。
     * @property {Number} minParticleDistance
     */
    function get() {
      return this._minParticleDistance;
    },
    set: function set(val) {
      this._minParticleDistance = val;
      this._minSquaredDistance = val * val;
    }
  }, {
    key: "space",
    get:
    /**
     * !#en The coordinate system of trajectories.
     * !#zh 轨迹设定时的坐标系。
     * @property {Space} space
     */
    function get() {
      return this._space;
    },
    set: function set(val) {
      this._space = val;

      if (this._particleSystem) {
        this._particleSystem._assembler._updateTrailMaterial();
      }
    }
    /**
     * !#en Whether the particle itself exists.
     * !#zh 粒子本身是否存在。
     * @property {Boolean} existWithParticles
     */

  }]);

  return TrailModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.TrailMode.Particles;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_minParticleDistance", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "minParticleDistance", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "minParticleDistance"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_space", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.World;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "space", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "space"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "existWithParticles", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "textureMode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.TextureMode.Stretch;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "widthFromParticle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "widthRatio", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "colorFromParticle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "colorOverTrail", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "colorOvertime", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = TrailModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxccmVuZGVyZXJcXHRyYWlsLnRzIl0sIm5hbWVzIjpbIlBSRV9UUklBTkdMRV9JTkRFWCIsIk5FWFRfVFJJQU5HTEVfSU5ERVgiLCJESVJFQ1RJT05fVEhSRVNIT0xEIiwiTWF0aCIsImNvcyIsIl90ZW1wX3RyYWlsRWxlIiwicG9zaXRpb24iLCJjYyIsInYzIiwidmVsb2NpdHkiLCJfdGVtcF9xdWF0IiwicXVhdCIsIl90ZW1wX3hmb3JtIiwibWF0NCIsIl90ZW1wX1ZlYzMiLCJfdGVtcF9WZWMzXzEiLCJfdGVtcF9jb2xvciIsImNvbG9yIiwiSVRyYWlsRWxlbWVudCIsImxpZmV0aW1lIiwid2lkdGgiLCJUcmFpbFNlZ21lbnQiLCJtYXhUcmFpbEVsZW1lbnROdW0iLCJzdGFydCIsImVuZCIsInRyYWlsRWxlbWVudHMiLCJwdXNoIiwiZGlyZWN0aW9uIiwiZ2V0RWxlbWVudCIsImlkeCIsImxlbmd0aCIsImFkZEVsZW1lbnQiLCJzcGxpY2UiLCJuZXdFbGVMb2MiLCJpdGVyYXRlRWxlbWVudCIsInRhcmdldCIsImYiLCJwIiwiZHQiLCJpIiwiY291bnQiLCJjbGVhciIsIlRyYWlsTW9kdWxlIiwidHlwZSIsIlRyYWlsTW9kZSIsIkN1cnZlUmFuZ2UiLCJTcGFjZSIsIlRleHR1cmVNb2RlIiwiR3JhZGllbnRSYW5nZSIsIl9wYXJ0aWNsZVN5c3RlbSIsIl9taW5TcXVhcmVkRGlzdGFuY2UiLCJfdmVydFNpemUiLCJfdHJhaWxOdW0iLCJfdHJhaWxMaWZldGltZSIsInZiT2Zmc2V0IiwiaWJPZmZzZXQiLCJfdHJhaWxTZWdtZW50cyIsIl9wYXJ0aWNsZVRyYWlsIiwiX2lhIiwiX2dmeFZGbXQiLCJfdmJGMzIiLCJfdmJVaW50MzIiLCJfaUJ1ZmZlciIsIl9uZWVkVHJhbnNmb3JtIiwiX2RlZmF1bHRNYXQiLCJfbWF0ZXJpYWwiLCJnZngiLCJWZXJ0ZXhGb3JtYXQiLCJuYW1lIiwiQVRUUl9QT1NJVElPTiIsIkFUVFJfVFlQRV9GTE9BVDMyIiwibnVtIiwiQVRUUl9URVhfQ09PUkQiLCJBVFRSX1RFWF9DT09SRDEiLCJBVFRSX0NPTE9SIiwiQVRUUl9UWVBFX1VJTlQ4Iiwibm9ybWFsaXplIiwiX2J5dGVzIiwiTWFwVXRpbHMiLCJvbkluaXQiLCJwcyIsIm1pblBhcnRpY2xlRGlzdGFuY2UiLCJfbWluUGFydGljbGVEaXN0YW5jZSIsImJ1cnN0Q291bnQiLCJidXJzdHMiLCJiIiwiZ2V0TWF4Q291bnQiLCJsaWZlVGltZSIsImNvbnN0YW50IiwiY2VpbCIsInN0YXJ0TGlmZXRpbWUiLCJnZXRNYXgiLCJyYXRlT3ZlclRpbWUiLCJkdXJhdGlvbiIsIlBvb2wiLCJfZW5hYmxlIiwiZW5hYmxlIiwiX3VwZGF0ZU1hdGVyaWFsIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJkZXN0cm95Iiwib2JqIiwidHJhaWxJdGVyIiwidmFsdWVzIiwidHJhaWwiLCJuZXh0IiwiZG9uZSIsInZhbHVlIiwidXBkYXRlVHJhaWxCdWZmZXIiLCJfY3JlYXRlVHJhaWxEYXRhIiwibW9kZWwiLCJfYXNzZW1ibGVyIiwiX21vZGVsIiwiY3JlYXRlVHJhaWxEYXRhIiwic3ViRGF0YSIsIl9zdWJEYXRhcyIsImdldFZEYXRhIiwiVWludDMyQXJyYXkiLCJpRGF0YSIsIm1hdCIsInRyYWlsTWF0ZXJpYWwiLCJfZGVmYXVsdFRyYWlsTWF0IiwidXBkYXRlIiwiZXZhbHVhdGUiLCJfdGltZSIsInNwYWNlIiwiV29ybGQiLCJfc2ltdWxhdGlvblNwYWNlIiwiTG9jYWwiLCJub2RlIiwiZ2V0V29ybGRNYXRyaXgiLCJnZXRXb3JsZFJvdGF0aW9uIiwiYW5pbWF0ZSIsInNjYWxlZER0IiwiZ2V0IiwiYWxsb2MiLCJzZXQiLCJsYXN0U2VnIiwiVmVjMyIsInRyYW5zZm9ybU1hdDQiLCJjb3B5IiwiX3VwZGF0ZVRyYWlsRWxlbWVudCIsInNxdWFyZWREaXN0YW5jZSIsIndpZHRoRnJvbVBhcnRpY2xlIiwic2l6ZSIsIngiLCJ3aWR0aFJhdGlvIiwidHJhaWxOdW0iLCJsYXN0U2Vjb25kVHJhaWwiLCJzdWJ0cmFjdCIsImxhc3RUaGlyZFRyYWlsIiwiZXF1YWxzIiwiWkVSTyIsImNvbG9yRnJvbVBhcnRpY2xlIiwiY29sb3JPdmVydGltZSIsInRyYWlsRWxlIiwibXVsdGlwbHkiLCJyZW1haW5pbmdMaWZldGltZSIsInJlbW92ZVBhcnRpY2xlIiwiZnJlZSIsImtleXMiLCJ0cmFpbFNlZyIsImluZGV4T2Zmc2V0IiwidGV4dENvb3JkU2VnIiwic3RhcnRTZWdFbGUiLCJfZmlsbFZlcnRleEJ1ZmZlciIsImNvbG9yT3ZlclRyYWlsIiwic2VnRWxlIiwiaiIsInkiLCJ6IiwiX2NoZWNrRGlyZWN0aW9uUmV2ZXJzZSIsIl91cGRhdGVJQSIsImNvbG9yTW9kaWZlciIsInhUZXhDb29yZCIsInRyYWlsRWxlSWR4IiwiaW5kZXhTZXQiLCJfdmFsIiwidXBkYXRlSUEiLCJjdXJyRWxlbWVudCIsInByZXZFbGVtZW50IiwiZG90IiwidmFsIiwiX3VwZGF0ZVRyYWlsTWF0ZXJpYWwiLCJfdXBkYXRlVHJhaWxFbmFibGUiLCJfc3BhY2UiLCJwcm9wZXJ0eSIsIlBhcnRpY2xlcyIsIlN0cmV0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsa0JBQWtCLEdBQUcsQ0FBM0I7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxLQUFLLENBQWpDO0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLDBCQUFTLEdBQVQsQ0FBVCxDQUE1QjtBQUVBLElBQU1DLGNBQWMsR0FBRztBQUFFQyxFQUFBQSxRQUFRLEVBQUVDLEVBQUUsQ0FBQ0MsRUFBSCxFQUFaO0FBQXFCQyxFQUFBQSxRQUFRLEVBQUVGLEVBQUUsQ0FBQ0MsRUFBSDtBQUEvQixDQUF2Qjs7QUFDQSxJQUFNRSxV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U0FFRCxhQUFXSCxHQUFYLEVBQWdCO0FBQ1osV0FBS0csTUFBTCxHQUFjSCxHQUFkOztBQUNBLFVBQUksS0FBS3JJLGVBQVQsRUFBMEI7QUFDdEIsYUFBS0EsZUFBTCxDQUFxQjhELFVBQXJCLENBQWdDd0Usb0JBQWhDO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7O3FGQTNGS0c7Ozs7O1dBQ1M7OzREQU9UQTs7Ozs7V0EyQk05SSxnQkFBVStJOzs7Ozs7O1dBVU4sSUFBSTlJLHNCQUFKOzt5RkFFVjZJOzs7OztXQUNzQjs7eUVBT3RCQSxtTUFVQUE7Ozs7O1dBQ1E1SSxZQUFNZ0Y7O3VPQTBCZDREOzs7OztXQUNvQjs7Ozs7OztXQVVQM0ksa0JBQVk2STs7c0ZBT3pCRjs7Ozs7V0FDbUI7Ozs7Ozs7V0FXUCxJQUFJN0ksc0JBQUo7O3VGQU9aNkk7Ozs7O1dBQ21COzs7Ozs7O1dBVUgsSUFBSTFJLHlCQUFKOzs7Ozs7O1dBVUQsSUFBSUEseUJBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InO1xyXG5pbXBvcnQgeyBWZWMzLCB0b1JhZGlhbiwgQ29sb3J9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi8uLi8uLi9yZW5kZXJlci9nZngnO1xyXG5pbXBvcnQgUG9vbCBmcm9tICcuLi8uLi8uLi8uLi9yZW5kZXJlci9tZW1vcC9wb29sJztcclxuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi4vYW5pbWF0b3IvY3VydmUtcmFuZ2UnO1xyXG5pbXBvcnQgR3JhZGllbnRSYW5nZSBmcm9tICcuLi9hbmltYXRvci9ncmFkaWVudC1yYW5nZSc7XHJcbmltcG9ydCB7IFNwYWNlLCBUZXh0dXJlTW9kZSwgVHJhaWxNb2RlIH0gZnJvbSAnLi4vZW51bSc7XHJcbmltcG9ydCBNYXBVdGlscyBmcm9tICcuLi91dGlscyc7XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmNvbnN0IFBSRV9UUklBTkdMRV9JTkRFWCA9IDE7XHJcbmNvbnN0IE5FWFRfVFJJQU5HTEVfSU5ERVggPSAxIDw8IDI7XHJcbmNvbnN0IERJUkVDVElPTl9USFJFU0hPTEQgPSBNYXRoLmNvcyh0b1JhZGlhbigxMDApKTtcclxuXHJcbmNvbnN0IF90ZW1wX3RyYWlsRWxlID0geyBwb3NpdGlvbjogY2MudjMoKSwgdmVsb2NpdHk6IGNjLnYzKCkgfTtcclxuY29uc3QgX3RlbXBfcXVhdCA9IGNjLnF1YXQoKTtcclxuY29uc3QgX3RlbXBfeGZvcm0gPSBjYy5tYXQ0KCk7XHJcbmNvbnN0IF90ZW1wX1ZlYzMgPSBjYy52MygpO1xyXG5jb25zdCBfdGVtcF9WZWMzXzEgPSBjYy52MygpO1xyXG5jb25zdCBfdGVtcF9jb2xvciA9IGNjLmNvbG9yKCk7XHJcblxyXG4vLyB2YXIgYmFyeWNlbnRyaWMgPSBbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMV07IC8vIDx3aXJlZnJhbWUgZGVidWc+XHJcbi8vIHZhciBfYmNJZHggPSAwO1xyXG5cclxuXHJcbmNsYXNzIElUcmFpbEVsZW1lbnQge1xyXG4gICAgcG9zaXRpb247XHJcbiAgICBsaWZldGltZTtcclxuICAgIHdpZHRoO1xyXG4gICAgdmVsb2NpdHk7XHJcbiAgICBjb2xvcjtcclxufVxyXG5cclxuLy8gdGhlIHZhbGlkIGVsZW1lbnQgaXMgaW4gW3N0YXJ0LGVuZCkgcmFuZ2UuaWYgc3RhcnQgZXF1YWxzIC0xLGl0IHJlcHJlc2VudHMgdGhlIGFycmF5IGlzIGVtcHR5LlxyXG5jbGFzcyBUcmFpbFNlZ21lbnQge1xyXG4gICAgc3RhcnQ7XHJcbiAgICBlbmQ7XHJcbiAgICB0cmFpbEVsZW1lbnRzID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IgKG1heFRyYWlsRWxlbWVudE51bSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSAtMTtcclxuICAgICAgICB0aGlzLmVuZCA9IC0xO1xyXG4gICAgICAgIHRoaXMudHJhaWxFbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHdoaWxlIChtYXhUcmFpbEVsZW1lbnROdW0tLSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWlsRWxlbWVudHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2MudjMoKSxcclxuICAgICAgICAgICAgICAgIGxpZmV0aW1lOiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eTogY2MudjMoKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RWxlbWVudCAoaWR4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWR4IDwgMCkge1xyXG4gICAgICAgICAgICBpZHggPSAoaWR4ICsgdGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aCkgJSB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWR4ID49IHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWR4ICU9IHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYWlsRWxlbWVudHNbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFbGVtZW50ICgpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsRWxlbWVudHNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID09PSB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyYWlsRWxlbWVudHMuc3BsaWNlKHRoaXMuZW5kLCAwLCB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogY2MudjMoKSxcclxuICAgICAgICAgICAgICAgIGxpZmV0aW1lOiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICAgICAgICB2ZWxvY2l0eTogY2MudjMoKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigpLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCsrO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ICU9IHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG5ld0VsZUxvYyA9IHRoaXMuZW5kKys7XHJcbiAgICAgICAgdGhpcy5lbmQgJT0gdGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFpbEVsZW1lbnRzW25ld0VsZUxvY107XHJcbiAgICB9XHJcblxyXG4gICAgaXRlcmF0ZUVsZW1lbnQgKHRhcmdldCwgZiwgcCwgZHQpIHtcclxuICAgICAgICBjb25zdCBlbmQgPSB0aGlzLnN0YXJ0ID49IHRoaXMuZW5kID8gdGhpcy5lbmQgKyB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoIDogdGhpcy5lbmQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZih0YXJnZXQsIHRoaXMudHJhaWxFbGVtZW50c1tpICUgdGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aF0sIHAsIGR0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCsrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCAlPSB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID09PSBlbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmVuZCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb3VudCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPCB0aGlzLmVuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmQgLSB0aGlzLnN0YXJ0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoICsgdGhpcy5lbmQgLSB0aGlzLnN0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZW5kID0gLTE7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSB0cmFpbCBtb2R1bGUgb2YgM2QgcGFydGljbGUuXHJcbiAqICEjemggM0Qg57KS5a2Q5ouW5bC+5qih5Z2XXHJcbiAqIEBjbGFzcyBUcmFpbE1vZHVsZVxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLlRyYWlsTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhaWxNb2R1bGUge1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2VuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIHRyYWlsTW9kdWxlLlxyXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IGVuYWJsZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZW5hYmxlICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVRyYWlsRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbCAmJiAhdGhpcy5fZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZSA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci5fdXBkYXRlVHJhaWxNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZW5hYmxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9hc3NlbWJsZXIuX3VwZGF0ZVRyYWlsRW5hYmxlKHRoaXMuX2VuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgaG93IHBhcnRpY2xlcyBnZW5lcmF0ZSB0cmFqZWN0b3JpZXMuXHJcbiAgICAgKiAhI3poIOiuvuWumueykuWtkOeUn+aIkOi9qOi/ueeahOaWueW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtUcmFpbE1vZGV9IG1vZGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBUcmFpbE1vZGUsXHJcbiAgICB9KVxyXG4gICAgbW9kZSA9IFRyYWlsTW9kZS5QYXJ0aWNsZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExpZmUgY3ljbGUgb2YgdHJhamVjdG9yeS5cclxuICAgICAqICEjemgg6L2o6L+55a2Y5Zyo55qE55Sf5ZG95ZGo5pyf44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGxpZmVUaW1lXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgIH0pXHJcbiAgICBsaWZlVGltZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfbWluUGFydGljbGVEaXN0YW5jZSA9IDAuMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTWluaW11bSBzcGFjaW5nIGJldHdlZW4gZWFjaCB0cmFjayBwYXJ0aWNsZVxyXG4gICAgICogISN6aCDmr4/kuKrovajov7nnspLlrZDkuYvpl7TnmoTmnIDlsI/pl7Tot53jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtaW5QYXJ0aWNsZURpc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IG1pblBhcnRpY2xlRGlzdGFuY2UgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5QYXJ0aWNsZURpc3RhbmNlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX21pblNxdWFyZWREaXN0YW5jZSA9IHZhbCAqIHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zcGFjZSA9IFNwYWNlLldvcmxkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgdHJhamVjdG9yaWVzLlxyXG4gICAgICogISN6aCDovajov7norr7lrprml7bnmoTlnZDmoIfns7vjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7U3BhY2V9IHNwYWNlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogU3BhY2UsXHJcbiAgICB9KVxyXG4gICAgZ2V0IHNwYWNlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BhY2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNwYWNlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zcGFjZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci5fdXBkYXRlVHJhaWxNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gV2hldGhlciB0aGUgcGFydGljbGUgaXRzZWxmIGV4aXN0cy5cclxuICAgICAqICEjemgg57KS5a2Q5pys6Lqr5piv5ZCm5a2Y5Zyo44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGV4aXN0V2l0aFBhcnRpY2xlc1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGV4aXN0V2l0aFBhcnRpY2xlcyA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgdGV4dHVyZSBmaWxsIG1ldGhvZFxyXG4gICAgICogISN6aCDorr7lrprnurnnkIbloavlhYXmlrnlvI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VGV4dHVyZU1vZGV9IHRleHR1cmVNb2RlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogVGV4dHVyZU1vZGUsXHJcbiAgICB9KVxyXG4gICAgdGV4dHVyZU1vZGUgPSBUZXh0dXJlTW9kZS5TdHJldGNoO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIHRvIHVzZSBwYXJ0aWNsZSB3aWR0aFxyXG4gICAgICogISN6aCDmmK/lkKbkvb/nlKjnspLlrZDnmoTlrr3luqbjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gd2lkdGhGcm9tUGFydGljbGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICB3aWR0aEZyb21QYXJ0aWNsZSA9IHRydWU7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDdXJ2ZXMgdGhhdCBjb250cm9sIHRyYWNrIGxlbmd0aFxyXG4gICAgICogISN6aCDmjqfliLbovajov7nplb/luqbnmoTmm7Lnur/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gd2lkdGhSYXRpb1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgd2lkdGhSYXRpbyA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFdoZXRoZXIgdG8gdXNlIHBhcnRpY2xlIGNvbG9yXHJcbiAgICAgKiAhI3poIOaYr+WQpuS9v+eUqOeykuWtkOeahOminOiJsuOAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBjb2xvckZyb21QYXJ0aWNsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGNvbG9yRnJvbVBhcnRpY2xlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBjb2xvciBvZiB0cmFqZWN0b3JpZXMuXHJcbiAgICAgKiAhI3poIOi9qOi/ueeahOminOiJsuOAglxyXG4gICAgICogQHByb3BlcnR5IHtHcmFkaWVudFJhbmdlfSBjb2xvck92ZXJUcmFpbFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgY29sb3JPdmVyVHJhaWwgPSBuZXcgR3JhZGllbnRSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUcmFqZWN0b3JpZXMgY29sb3Igb3ZlciB0aW1lLlxyXG4gICAgICogISN6aCDovajov7npmo/ml7bpl7Tlj5jljJbnmoTpopzoibLjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7R3JhZGllbnRSYW5nZX0gY29sb3JPdmVydGltZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgY29sb3JPdmVydGltZSA9IG5ldyBHcmFkaWVudFJhbmdlKCk7XHJcblxyXG4gICAgX3BhcnRpY2xlU3lzdGVtID0gbnVsbDtcclxuICAgIF9taW5TcXVhcmVkRGlzdGFuY2UgPSAwO1xyXG4gICAgX3ZlcnRTaXplID0gMDtcclxuICAgIF90cmFpbE51bSA9IDA7XHJcbiAgICBfdHJhaWxMaWZldGltZSA9IDA7XHJcbiAgICB2Yk9mZnNldCA9IDA7XHJcbiAgICBpYk9mZnNldCA9IDA7XHJcbiAgICBfdHJhaWxTZWdtZW50cyA9IG51bGw7XHJcbiAgICBfcGFydGljbGVUcmFpbCA9IG51bGw7XHJcbiAgICBfaWEgPSBudWxsO1xyXG4gICAgX2dmeFZGbXQgPSBudWxsO1xyXG4gICAgX3ZiRjMyID0gbnVsbDtcclxuICAgIF92YlVpbnQzMiA9IG51bGw7XHJcbiAgICBfaUJ1ZmZlciA9IG51bGw7XHJcbiAgICBfbmVlZFRyYW5zZm9ybSA9IG51bGw7XHJcbiAgICBfZGVmYXVsdE1hdCA9IG51bGw7XHJcbiAgICBfbWF0ZXJpYWwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9nZnhWRm10ID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xyXG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1BPU0lUSU9OLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM30sXHJcbiAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JELCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogNH0sXHJcbiAgICAgICAgICAgIC8veyBuYW1lOiBnZnguQVRUUl9URVhfQ09PUkQyLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LCAvLyA8d2lyZWZyYW1lIGRlYnVnPlxyXG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRDEsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmVydFNpemUgPSB0aGlzLl9nZnhWRm10Ll9ieXRlcztcclxuXHJcbiAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbCA9IG5ldyBNYXBVdGlscygpOyAvLyBNYXA8UGFydGljbGUsIFRyYWlsU2VnbWVudD4oKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluaXQgKHBzKSB7XHJcbiAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0gPSBwcztcclxuICAgICAgICB0aGlzLm1pblBhcnRpY2xlRGlzdGFuY2UgPSB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlO1xyXG4gICAgICAgIGxldCBidXJzdENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IGIgb2YgcHMuYnVyc3RzKSB7XHJcbiAgICAgICAgICAgIGJ1cnN0Q291bnQgKz0gYi5nZXRNYXhDb3VudChwcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlmZVRpbWUuY29uc3RhbnQgPSAxO1xyXG4gICAgICAgIHRoaXMuX3RyYWlsTnVtID0gTWF0aC5jZWlsKHBzLnN0YXJ0TGlmZXRpbWUuZ2V0TWF4KCkgKiB0aGlzLmxpZmVUaW1lLmdldE1heCgpICogNjAgKiAocHMucmF0ZU92ZXJUaW1lLmdldE1heCgpICogcHMuZHVyYXRpb24gKyBidXJzdENvdW50KSk7XHJcbiAgICAgICAgdGhpcy5fdHJhaWxTZWdtZW50cyA9IG5ldyBQb29sKCgpID0+IG5ldyBUcmFpbFNlZ21lbnQoMTApLCBNYXRoLmNlaWwocHMucmF0ZU92ZXJUaW1lLmdldE1heCgpICogcHMuZHVyYXRpb24pKTtcclxuICAgICAgICBpZiAodGhpcy5fZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gdGhpcy5fZW5hYmxlO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlICgpIHtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHJhaWxTZWdtZW50cykge1xyXG4gICAgICAgICAgICB0aGlzLl90cmFpbFNlZ21lbnRzLmNsZWFyKChvYmopID0+IHsgb2JqLnRyYWlsRWxlbWVudHMubGVuZ3RoID0gMDsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3RyYWlsU2VnbWVudHMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWlsSXRlciA9IHRoaXMuX3BhcnRpY2xlVHJhaWwudmFsdWVzKCk7XHJcbiAgICAgICAgICAgIGxldCB0cmFpbCA9IHRyYWlsSXRlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIHdoaWxlICghdHJhaWwuZG9uZSkge1xyXG4gICAgICAgICAgICAgICAgdHJhaWwudmFsdWUuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRyYWlsID0gdHJhaWxJdGVyLm5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVRyYWlsLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVHJhaWxCdWZmZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NyZWF0ZVRyYWlsRGF0YSAoKSB7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci5fbW9kZWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLmNyZWF0ZVRyYWlsRGF0YSh0aGlzLl9nZnhWRm10LCB0aGlzLl90cmFpbE51bSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ViRGF0YSA9IG1vZGVsLl9zdWJEYXRhc1sxXTtcclxuICAgICAgICAgICAgdGhpcy5fdmJGMzIgPSBzdWJEYXRhLmdldFZEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZiVWludDMyID0gc3ViRGF0YS5nZXRWRGF0YShVaW50MzJBcnJheSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXIgPSBzdWJEYXRhLmlEYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYXQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1hdGVyaWFsO1xyXG4gICAgICAgICAgICBpZiAobWF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci5fZGVmYXVsdFRyYWlsTWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fdHJhaWxMaWZldGltZSA9IHRoaXMubGlmZVRpbWUuZXZhbHVhdGUodGhpcy5fcGFydGljbGVTeXN0ZW0uX3RpbWUsIDEpO1xyXG4gICAgICAgIGlmICh0aGlzLnNwYWNlID09PSBTcGFjZS5Xb3JsZCAmJiB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5fc2ltdWxhdGlvblNwYWNlID09PSBTcGFjZS5Mb2NhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uZWVkVHJhbnNmb3JtID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubm9kZS5nZXRXb3JsZE1hdHJpeChfdGVtcF94Zm9ybSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLm5vZGUuZ2V0V29ybGRSb3RhdGlvbihfdGVtcF9xdWF0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9uZWVkVHJhbnNmb3JtID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUgKHAsIHNjYWxlZER0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90cmFpbFNlZ21lbnRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRyYWlsID0gdGhpcy5fcGFydGljbGVUcmFpbC5nZXQocCk7XHJcbiAgICAgICAgaWYgKCF0cmFpbCkge1xyXG4gICAgICAgICAgICB0cmFpbCA9IHRoaXMuX3RyYWlsU2VnbWVudHMuYWxsb2MoKTtcclxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbC5zZXQocCwgdHJhaWwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXN0U2VnID0gdHJhaWwuZ2V0RWxlbWVudCh0cmFpbC5lbmQgLSAxKTtcclxuICAgICAgICBpZiAodGhpcy5fbmVlZFRyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX3RlbXBfVmVjMywgcC5wb3NpdGlvbiwgX3RlbXBfeGZvcm0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIFZlYzMuY29weShfdGVtcF9WZWMzLCBwLnBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RTZWcpIHtcclxuICAgICAgICAgICAgdHJhaWwuaXRlcmF0ZUVsZW1lbnQodGhpcywgdGhpcy5fdXBkYXRlVHJhaWxFbGVtZW50LCBwLCBzY2FsZWREdCk7XHJcbiAgICAgICAgICAgIGlmIChWZWMzLnNxdWFyZWREaXN0YW5jZShsYXN0U2VnLnBvc2l0aW9uLCBfdGVtcF9WZWMzKSA8IHRoaXMuX21pblNxdWFyZWREaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RTZWcgPSB0cmFpbC5hZGRFbGVtZW50KCk7XHJcbiAgICAgICAgaWYgKCFsYXN0U2VnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVmVjMy5jb3B5KGxhc3RTZWcucG9zaXRpb24sIF90ZW1wX1ZlYzMpO1xyXG4gICAgICAgIGxhc3RTZWcubGlmZXRpbWUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLndpZHRoRnJvbVBhcnRpY2xlKSB7XHJcbiAgICAgICAgICAgIGxhc3RTZWcud2lkdGggPSBwLnNpemUueCAqIHRoaXMud2lkdGhSYXRpby5ldmFsdWF0ZSgwLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYXN0U2VnLndpZHRoID0gdGhpcy53aWR0aFJhdGlvLmV2YWx1YXRlKDAsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFpbE51bSA9IHRyYWlsLmNvdW50KCk7XHJcbiAgICAgICAgaWYgKHRyYWlsTnVtID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWNvbmRUcmFpbCA9IHRyYWlsLmdldEVsZW1lbnQodHJhaWwuZW5kIC0gMik7XHJcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QobGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5LCBsYXN0U2VnLnBvc2l0aW9uLCBsYXN0U2Vjb25kVHJhaWwucG9zaXRpb24pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhaWxOdW0gPiAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWNvbmRUcmFpbCA9IHRyYWlsLmdldEVsZW1lbnQodHJhaWwuZW5kIC0gMik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RUaGlyZFRyYWlsID0gdHJhaWwuZ2V0RWxlbWVudCh0cmFpbC5lbmQgLSAzKTtcclxuICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF9WZWMzLCBsYXN0VGhpcmRUcmFpbC5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF9WZWMzXzEsIGxhc3RTZWcucG9zaXRpb24sIGxhc3RTZWNvbmRUcmFpbC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QobGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5LCBfdGVtcF9WZWMzXzEsIF90ZW1wX1ZlYzMpO1xyXG4gICAgICAgICAgICBpZiAoVmVjMy5lcXVhbHMoY2MuVmVjMy5aRVJPLCBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkpKSB7XHJcbiAgICAgICAgICAgICAgICBWZWMzLmNvcHkobGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5LCBfdGVtcF9WZWMzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jb2xvckZyb21QYXJ0aWNsZSkge1xyXG4gICAgICAgICAgICBsYXN0U2VnLmNvbG9yLnNldChwLmNvbG9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYXN0U2VnLmNvbG9yLnNldCh0aGlzLmNvbG9yT3ZlcnRpbWUuZXZhbHVhdGUoMCwgMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlVHJhaWxFbGVtZW50ICh0cmFpbCwgdHJhaWxFbGUsIHAsIGR0KSB7XHJcbiAgICAgICAgdHJhaWxFbGUubGlmZXRpbWUgKz0gZHQ7XHJcbiAgICAgICAgaWYgKHRyYWlsLmNvbG9yRnJvbVBhcnRpY2xlKSB7XHJcbiAgICAgICAgICAgIHRyYWlsRWxlLmNvbG9yLnNldChwLmNvbG9yKTtcclxuICAgICAgICAgICAgdHJhaWxFbGUuY29sb3IubXVsdGlwbHkodHJhaWwuY29sb3JPdmVydGltZS5ldmFsdWF0ZSgxLjAgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lLCAxKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhaWxFbGUuY29sb3Iuc2V0KHRyYWlsLmNvbG9yT3ZlcnRpbWUuZXZhbHVhdGUoMS4wIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZSwgMSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHJhaWwud2lkdGhGcm9tUGFydGljbGUpIHtcclxuICAgICAgICAgICAgdHJhaWxFbGUud2lkdGggPSBwLnNpemUueCAqIHRyYWlsLndpZHRoUmF0aW8uZXZhbHVhdGUodHJhaWxFbGUubGlmZXRpbWUgLyB0cmFpbC5fdHJhaWxMaWZldGltZSwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhaWxFbGUud2lkdGggPSB0cmFpbC53aWR0aFJhdGlvLmV2YWx1YXRlKHRyYWlsRWxlLmxpZmV0aW1lIC8gdHJhaWwuX3RyYWlsTGlmZXRpbWUsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhaWxFbGUubGlmZXRpbWUgPiB0cmFpbC5fdHJhaWxMaWZldGltZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVQYXJ0aWNsZSAocCkge1xyXG4gICAgICAgIGNvbnN0IHRyYWlsID0gdGhpcy5fcGFydGljbGVUcmFpbC5nZXQocCk7XHJcbiAgICAgICAgaWYgKHRyYWlsICYmIHRoaXMuX3RyYWlsU2VnbWVudHMpIHtcclxuICAgICAgICAgICAgdHJhaWwuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJhaWxTZWdtZW50cy5mcmVlKHRyYWlsKTtcclxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbC5kZWxldGUocCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVRyYWlsQnVmZmVyICgpIHtcclxuICAgICAgICB0aGlzLnZiT2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLmliT2Zmc2V0ID0gMDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5fcGFydGljbGVUcmFpbC5rZXlzKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhaWxTZWcgPSB0aGlzLl9wYXJ0aWNsZVRyYWlsLmdldChwKTtcclxuICAgICAgICAgICAgaWYgKHRyYWlsU2VnLnN0YXJ0ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnZiT2Zmc2V0ICogNCAvIHRoaXMuX3ZlcnRTaXplO1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSB0cmFpbFNlZy5zdGFydCA+PSB0cmFpbFNlZy5lbmQgPyB0cmFpbFNlZy5lbmQgKyB0cmFpbFNlZy50cmFpbEVsZW1lbnRzLmxlbmd0aCA6IHRyYWlsU2VnLmVuZDtcclxuICAgICAgICAgICAgY29uc3QgdHJhaWxOdW0gPSBlbmQgLSB0cmFpbFNlZy5zdGFydDtcclxuICAgICAgICAgICAgLy8gY29uc3QgbGFzdFNlZ1JhdGlvID0gVmVjMy5kaXN0YW5jZSh0cmFpbFNlZy5nZXRUYWlsRWxlbWVudCgpIS5wb3NpdGlvbiwgcC5wb3NpdGlvbikgLyB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0Q29vcmRTZWcgPSAxIC8gKHRyYWlsTnVtIC8qLSAxICsgbGFzdFNlZ1JhdGlvKi8pO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydFNlZ0VsZSA9IHRyYWlsU2VnLnRyYWlsRWxlbWVudHNbdHJhaWxTZWcuc3RhcnRdO1xyXG4gICAgICAgICAgICB0aGlzLl9maWxsVmVydGV4QnVmZmVyKHN0YXJ0U2VnRWxlLCB0aGlzLmNvbG9yT3ZlclRyYWlsLmV2YWx1YXRlKDEsIDEpLCBpbmRleE9mZnNldCwgMSwgMCwgTkVYVF9UUklBTkdMRV9JTkRFWCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0cmFpbFNlZy5zdGFydCArIDE7IGkgPCBlbmQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VnRWxlID0gdHJhaWxTZWcudHJhaWxFbGVtZW50c1tpICUgdHJhaWxTZWcudHJhaWxFbGVtZW50cy5sZW5ndGhdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaiA9IGkgLSB0cmFpbFNlZy5zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxWZXJ0ZXhCdWZmZXIoc2VnRWxlLCB0aGlzLmNvbG9yT3ZlclRyYWlsLmV2YWx1YXRlKDEgLSBqIC8gdHJhaWxOdW0sIDEpLCBpbmRleE9mZnNldCwgMSAtIGogKiB0ZXh0Q29vcmRTZWcsIGosIFBSRV9UUklBTkdMRV9JTkRFWCB8IE5FWFRfVFJJQU5HTEVfSU5ERVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZWVkVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX3RlbXBfdHJhaWxFbGUucG9zaXRpb24sIHAucG9zaXRpb24sIF90ZW1wX3hmb3JtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFZlYzMuY29weShfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgcC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRyYWlsTnVtID09PSAxIHx8IHRyYWlsTnVtID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2Vjb25kVHJhaWwgPSB0cmFpbFNlZy5nZXRFbGVtZW50KHRyYWlsU2VnLmVuZCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIF90ZW1wX3RyYWlsRWxlLnBvc2l0aW9uLCBsYXN0U2Vjb25kVHJhaWwucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCAtIHRoaXMuX3ZlcnRTaXplIC8gNCAtIDRdID0gbGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gdGhpcy5fdmVydFNpemUgLyA0IC0gM10gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQgLSB0aGlzLl92ZXJ0U2l6ZSAvIDQgLSAyXSA9IGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eS56O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCAtIDRdID0gbGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gM10gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQgLSAyXSA9IGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eS56O1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF90cmFpbEVsZS52ZWxvY2l0eSwgX3RlbXBfdHJhaWxFbGUucG9zaXRpb24sIGxhc3RTZWNvbmRUcmFpbC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0RpcmVjdGlvblJldmVyc2UoX3RlbXBfdHJhaWxFbGUsIGxhc3RTZWNvbmRUcmFpbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhaWxOdW0gPiAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2Vjb25kVHJhaWwgPSB0cmFpbFNlZy5nZXRFbGVtZW50KHRyYWlsU2VnLmVuZCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRoaXJkVHJhaWwgPSB0cmFpbFNlZy5nZXRFbGVtZW50KHRyYWlsU2VnLmVuZCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF9WZWMzLCBsYXN0VGhpcmRUcmFpbC5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIFZlYzMuc3VidHJhY3QoX3RlbXBfVmVjM18xLCBfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKF90ZW1wX1ZlYzMsIF90ZW1wX1ZlYzMpO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoX3RlbXBfVmVjM18xLCBfdGVtcF9WZWMzXzEpO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIF90ZW1wX1ZlYzNfMSwgX3RlbXBfVmVjMyk7XHJcbiAgICAgICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0RpcmVjdGlvblJldmVyc2UobGFzdFNlY29uZFRyYWlsLCBsYXN0VGhpcmRUcmFpbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZiT2Zmc2V0IC09IHRoaXMuX3ZlcnRTaXplIC8gNCAqIDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmliT2Zmc2V0IC09IDY7XHJcbiAgICAgICAgICAgICAgICAvL19iY0lkeCA9IChfYmNJZHggLSA2ICsgOSkgJSA5OyAgLy8gPHdpcmVmcmFtZSBkZWJ1Zz5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxWZXJ0ZXhCdWZmZXIobGFzdFNlY29uZFRyYWlsLCB0aGlzLmNvbG9yT3ZlclRyYWlsLmV2YWx1YXRlKHRleHRDb29yZFNlZywgMSksIGluZGV4T2Zmc2V0LCB0ZXh0Q29vcmRTZWcsIHRyYWlsTnVtIC0gMSwgUFJFX1RSSUFOR0xFX0lOREVYIHwgTkVYVF9UUklBTkdMRV9JTkRFWCk7XHJcbiAgICAgICAgICAgICAgICBWZWMzLnN1YnRyYWN0KF90ZW1wX3RyYWlsRWxlLnZlbG9jaXR5LCBfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKF90ZW1wX3RyYWlsRWxlLnZlbG9jaXR5LCBfdGVtcF90cmFpbEVsZS52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0RpcmVjdGlvblJldmVyc2UoX3RlbXBfdHJhaWxFbGUsIGxhc3RTZWNvbmRUcmFpbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGhGcm9tUGFydGljbGUpIHtcclxuICAgICAgICAgICAgICAgIF90ZW1wX3RyYWlsRWxlLndpZHRoID0gcC5zaXplLnggKiB0aGlzLndpZHRoUmF0aW8uZXZhbHVhdGUoMCwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBfdGVtcF90cmFpbEVsZS53aWR0aCA9IHRoaXMud2lkdGhSYXRpby5ldmFsdWF0ZSgwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGVtcF90cmFpbEVsZS5jb2xvciA9IHAuY29sb3I7XHJcblxyXG4gICAgICAgICAgICBpZiAoVmVjMy5lcXVhbHMoX3RlbXBfdHJhaWxFbGUudmVsb2NpdHksIGNjLlZlYzMuWkVSTykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWJPZmZzZXQgLT0gMztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxWZXJ0ZXhCdWZmZXIoX3RlbXBfdHJhaWxFbGUsIHRoaXMuY29sb3JPdmVyVHJhaWwuZXZhbHVhdGUoMCwgMSksIGluZGV4T2Zmc2V0LCAwLCB0cmFpbE51bSwgUFJFX1RSSUFOR0xFX0lOREVYKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGVJQSh0aGlzLmliT2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBfZmlsbFZlcnRleEJ1ZmZlciAodHJhaWxTZWcsIGNvbG9yTW9kaWZlciwgaW5kZXhPZmZzZXQsIHhUZXhDb29yZCwgdHJhaWxFbGVJZHgsIGluZGV4U2V0KSB7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnBvc2l0aW9uLng7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnBvc2l0aW9uLno7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IDA7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB4VGV4Q29vcmQ7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IDA7XHJcbiAgICAgICAgLy8gdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IGJhcnljZW50cmljW19iY0lkeCsrXTsgIC8vIDx3aXJlZnJhbWUgZGVidWc+XHJcbiAgICAgICAgLy8gdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IGJhcnljZW50cmljW19iY0lkeCsrXTtcclxuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdO1xyXG4gICAgICAgIC8vIF9iY0lkeCAlPSA5O1xyXG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy52ZWxvY2l0eS54O1xyXG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy52ZWxvY2l0eS55O1xyXG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy52ZWxvY2l0eS56O1xyXG4gICAgICAgIF90ZW1wX2NvbG9yLnNldCh0cmFpbFNlZy5jb2xvcik7XHJcbiAgICAgICAgX3RlbXBfY29sb3IubXVsdGlwbHkoY29sb3JNb2RpZmVyKTtcclxuICAgICAgICB0aGlzLl92YlVpbnQzMlt0aGlzLnZiT2Zmc2V0KytdID0gX3RlbXBfY29sb3IuX3ZhbDtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcucG9zaXRpb24ueDtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcucG9zaXRpb24ueTtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcucG9zaXRpb24uejtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gMTtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHhUZXhDb29yZDtcclxuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gMTtcclxuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdOyAgLy8gPHdpcmVmcmFtZSBkZWJ1Zz5cclxuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdO1xyXG4gICAgICAgIC8vIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSBiYXJ5Y2VudHJpY1tfYmNJZHgrK107XHJcbiAgICAgICAgLy8gX2JjSWR4ICU9IDk7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnZlbG9jaXR5Lng7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnZlbG9jaXR5Lnk7XHJcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnZlbG9jaXR5Lno7XHJcbiAgICAgICAgdGhpcy5fdmJVaW50MzJbdGhpcy52Yk9mZnNldCsrXSA9IF90ZW1wX2NvbG9yLl92YWw7XHJcbiAgICAgICAgaWYgKGluZGV4U2V0ICYgUFJFX1RSSUFOR0xFX0lOREVYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXJbdGhpcy5pYk9mZnNldCsrXSA9IGluZGV4T2Zmc2V0ICsgMiAqIHRyYWlsRWxlSWR4O1xyXG4gICAgICAgICAgICB0aGlzLl9pQnVmZmVyW3RoaXMuaWJPZmZzZXQrK10gPSBpbmRleE9mZnNldCArIDIgKiB0cmFpbEVsZUlkeCAtIDE7XHJcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXJbdGhpcy5pYk9mZnNldCsrXSA9IGluZGV4T2Zmc2V0ICsgMiAqIHRyYWlsRWxlSWR4ICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4U2V0ICYgTkVYVF9UUklBTkdMRV9JTkRFWCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pQnVmZmVyW3RoaXMuaWJPZmZzZXQrK10gPSBpbmRleE9mZnNldCArIDIgKiB0cmFpbEVsZUlkeDtcclxuICAgICAgICAgICAgdGhpcy5faUJ1ZmZlclt0aGlzLmliT2Zmc2V0KytdID0gaW5kZXhPZmZzZXQgKyAyICogdHJhaWxFbGVJZHggKyAxO1xyXG4gICAgICAgICAgICB0aGlzLl9pQnVmZmVyW3RoaXMuaWJPZmZzZXQrK10gPSBpbmRleE9mZnNldCArIDIgKiB0cmFpbEVsZUlkeCArIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVJQSAoY291bnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0gJiYgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5fYXNzZW1ibGVyLnVwZGF0ZUlBKDEsIGNvdW50LCB0cnVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrRGlyZWN0aW9uUmV2ZXJzZSAoY3VyckVsZW1lbnQsIHByZXZFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKFZlYzMuZG90KGN1cnJFbGVtZW50LnZlbG9jaXR5LCBwcmV2RWxlbWVudC52ZWxvY2l0eSkgPCBESVJFQ1RJT05fVEhSRVNIT0xEKSB7XHJcbiAgICAgICAgICAgIGN1cnJFbGVtZW50LmRpcmVjdGlvbiA9IDEgLSBwcmV2RWxlbWVudC5kaXJlY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VyckVsZW1lbnQuZGlyZWN0aW9uID0gcHJldkVsZW1lbnQuZGlyZWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==