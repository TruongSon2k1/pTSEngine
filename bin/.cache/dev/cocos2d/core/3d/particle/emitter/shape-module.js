
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/emitter/shape-module.js';
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

var _curveRange = _interopRequireDefault(require("../animator/curve-range"));

var _particleGeneralFunction = require("../particle-general-function");

var _enum = require("../enum");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var _intermediVec = new _valueTypes.Vec3(0, 0, 0);

var _intermediArr = new Array();

var _unitBoxExtent = new _valueTypes.Vec3(0.5, 0.5, 0.5);
/**
 * !#en The shape module of 3d particle.
 * !#zh 3D 粒子的发射形状模块
 * @class ShapeModule
 */


var ShapeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.ShapeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.ShapeType
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _enum.EmitLocation
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _enum.ArcMode
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function ShapeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "_shapeType", _descriptor2, this);

    _initializerDefineProperty(this, "emitFrom", _descriptor3, this);

    _initializerDefineProperty(this, "radius", _descriptor4, this);

    _initializerDefineProperty(this, "radiusThickness", _descriptor5, this);

    _initializerDefineProperty(this, "_angle", _descriptor6, this);

    _initializerDefineProperty(this, "_arc", _descriptor7, this);

    _initializerDefineProperty(this, "arcMode", _descriptor8, this);

    _initializerDefineProperty(this, "arcSpread", _descriptor9, this);

    _initializerDefineProperty(this, "arcSpeed", _descriptor10, this);

    _initializerDefineProperty(this, "length", _descriptor11, this);

    _initializerDefineProperty(this, "boxThickness", _descriptor12, this);

    _initializerDefineProperty(this, "_position", _descriptor13, this);

    _initializerDefineProperty(this, "_rotation", _descriptor14, this);

    _initializerDefineProperty(this, "_scale", _descriptor15, this);

    _initializerDefineProperty(this, "alignToDirection", _descriptor16, this);

    _initializerDefineProperty(this, "randomDirectionAmount", _descriptor17, this);

    _initializerDefineProperty(this, "sphericalDirectionAmount", _descriptor18, this);

    _initializerDefineProperty(this, "randomPositionAmount", _descriptor19, this);

    this.mat = null;
    this.Quat = null;
    this.particleSystem = null;
    this.lastTime = null;
    this.totalAngle = null;
    this.mat = new _valueTypes.Mat4();
    this.quat = new _valueTypes.Quat();
    this.particleSystem = null;
    this.lastTime = 0;
    this.totalAngle = 0;
  }

  var _proto = ShapeModule.prototype;

  _proto.onInit = function onInit(ps) {
    this.particleSystem = ps;
    this.constructMat();
    this.lastTime = this.particleSystem._time;
  };

  _proto.constructMat = function constructMat() {
    _valueTypes.Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);

    _valueTypes.Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
  };

  _proto.emit = function emit(p) {
    switch (this.shapeType) {
      case _enum.ShapeType.Box:
        boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Circle:
        circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
        break;

      case _enum.ShapeType.Cone:
        coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
        break;

      case _enum.ShapeType.Sphere:
        sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Hemisphere:
        hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      default:
        console.warn(this.shapeType + ' shapeType is not supported by ShapeModule.');
    }

    if (this.randomPositionAmount > 0) {
      p.position.x += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.y += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.z += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
    }

    _valueTypes.Vec3.transformQuat(p.velocity, p.velocity, this.quat);

    _valueTypes.Vec3.transformMat4(p.position, p.position, this.mat);

    if (this.sphericalDirectionAmount > 0) {
      var sphericalVel = _valueTypes.Vec3.normalize(_intermediVec, p.position);

      _valueTypes.Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
    }

    this.lastTime = this.particleSystem._time;
  };

  _proto.generateArcAngle = function generateArcAngle() {
    if (this.arcMode === _enum.ArcMode.Random) {
      return (0, _valueTypes.randomRange)(0, this._arc);
    }

    var angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
    this.totalAngle = angle;

    if (this.arcSpread !== 0) {
      angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
    }

    switch (this.arcMode) {
      case _enum.ArcMode.Loop:
        return (0, _valueTypes.repeat)(angle, this._arc);

      case _enum.ArcMode.PingPong:
        return (0, _valueTypes.pingPong)(angle, this._arc);
    }
  };

  _createClass(ShapeModule, [{
    key: "shapeType",
    get:
    /**
     * !#en The enable of shapeModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */

    /**
     * !#en Particle emitter type.
     * !#zh 粒子发射器类型。
     * @property {ShapeType} shapeType
     */
    function get() {
      return this._shapeType;
    },
    set: function set(val) {
      this._shapeType = val;

      switch (this._shapeType) {
        case _enum.ShapeType.Box:
          if (this.emitFrom === _enum.EmitLocation.Base) {
            this.emitFrom = _enum.EmitLocation.Volume;
          }

          break;

        case _enum.ShapeType.Cone:
          if (this.emitFrom === _enum.EmitLocation.Edge) {
            this.emitFrom = _enum.EmitLocation.Base;
          }

          break;

        case _enum.ShapeType.Sphere:
        case _enum.ShapeType.Hemisphere:
          if (this.emitFrom === _enum.EmitLocation.Base || this.emitFrom === _enum.EmitLocation.Edge) {
            this.emitFrom = _enum.EmitLocation.Volume;
          }

          break;
      }
    }
    /**
     * !#en The emission site of the particle.
     * !#zh 粒子从发射器哪个部位发射。
     * @property {EmitLocation} emitFrom
     */

  }, {
    key: "angle",
    get:
    /**
     * !#en The angle between the axis of the cone and the generatrix<bg>
     * Determines the opening and closing of the cone launcher
     * !#zh 圆锥的轴与母线的夹角<bg>。
     * 决定圆锥发射器的开合程度。
     * @property {Number} angle
     */
    function get() {
      return Math.round((0, _valueTypes.toDegree)(this._angle) * 100) / 100;
    },
    set: function set(val) {
      this._angle = (0, _valueTypes.toRadian)(val);
    }
  }, {
    key: "arc",
    get:
    /**
     * !#en Particle emitters emit in a fan-shaped range.
     * !#zh 粒子发射器在一个扇形范围内发射。
     * @property {Number} arc
     */
    function get() {
      return (0, _valueTypes.toDegree)(this._arc);
    },
    set: function set(val) {
      this._arc = (0, _valueTypes.toRadian)(val);
    }
    /**
     * !#en How particles are emitted in the sector range.
     * !#zh 粒子在扇形范围内的发射方式。
     * @property {ArcMode} arcMode
     */

  }, {
    key: "position",
    get:
    /**
     * !#en Particle Emitter Position
     * !#zh 粒子发射器位置。
     * @property {Vec3} position
     */
    function get() {
      return this._position;
    },
    set: function set(val) {
      this._position = val;
      this.constructMat();
    }
  }, {
    key: "rotation",
    get:
    /**
     * !#en Particle emitter rotation angle.
     * !#zh 粒子发射器旋转角度。
     * @property {Vec3} rotation
     */
    function get() {
      return this._rotation;
    },
    set: function set(val) {
      this._rotation = val;
      this.constructMat();
    }
  }, {
    key: "scale",
    get:
    /**
     * !#en Particle emitter scaling
     * !#zh 粒子发射器缩放比例。
     * @property {Vec3} scale
     */
    function get() {
      return this._scale;
    },
    set: function set(val) {
      this._scale = val;
      this.constructMat();
    }
    /**
     * !#en The direction of particle movement is determined based on the initial direction of the particles.
     * !#zh 根据粒子的初始方向决定粒子的移动方向。
     * @property {Boolean} alignToDirection
     */

  }]);

  return ShapeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_shapeType", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.ShapeType.Cone;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeType", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeType"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "emitFrom", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.EmitLocation.Volume;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "radiusThickness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_angle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _valueTypes.toRadian)(25);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "angle", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_arc", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _valueTypes.toRadian)(360);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "arc", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "arc"), _class2.prototype), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "arcMode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.ArcMode.Random;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "arcSpread", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "arcSpeed", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "length", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "boxThickness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_position", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "position", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "position"), _class2.prototype), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_scale", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(1, 1, 1);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "scale", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "scale"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "alignToDirection", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "randomDirectionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "sphericalDirectionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "randomPositionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
exports["default"] = ShapeModule;

function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      _valueTypes.Vec3.copy(dir, pos);

      _valueTypes.Vec3.normalize(dir, dir);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _valueTypes.Vec3.scale(pos, pos, radius);

      _valueTypes.Vec3.copy(dir, pos);

      break;

    default:
      console.warn(emitFrom + ' is not supported for sphere emitter.');
  }
}

function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      _valueTypes.Vec3.copy(dir, pos);

      _valueTypes.Vec3.normalize(dir, dir);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _valueTypes.Vec3.scale(pos, pos, radius);

      if (pos.z < 0) {
        pos.z *= -1;
      }

      _valueTypes.Vec3.copy(dir, pos);

      break;

    default:
      console.warn(emitFrom + ' is not supported for hemisphere emitter.');
  }
}

function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Base:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _valueTypes.Vec3.normalize(dir, dir);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.fixedAngleUnitVector2)(pos, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle);

      _valueTypes.Vec3.normalize(dir, dir);

      _valueTypes.Vec2.scale(pos, pos, radius);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _valueTypes.Vec3.normalize(dir, dir);

      pos.z = 0;

      _valueTypes.Vec3.add(pos, pos, _valueTypes.Vec3.scale(_intermediVec, dir, length * (0, _valueTypes.random)() / -dir.z));

      break;

    default:
      console.warn(emitFrom + ' is not supported for cone emitter.');
  }
}

function boxEmit(emitFrom, boxThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointInCube)(pos, _unitBoxExtent); // randomPointBetweenCube(pos, Vec3.multiply(_intermediVec, _unitBoxExtent, boxThickness), _unitBoxExtent);

      break;

    case _enum.EmitLocation.Shell:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _valueTypes.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    case _enum.EmitLocation.Edge:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _valueTypes.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    default:
      console.warn(emitFrom + ' is not supported for box emitter.');
  }

  _valueTypes.Vec3.copy(dir, _particleGeneralFunction.particleEmitZAxis);
}

function circleEmit(radius, radiusThickness, theta, pos, dir) {
  (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

  _valueTypes.Vec3.normalize(dir, pos);
}

function applyBoxThickness(pos, thickness) {
  if (thickness.x > 0) {
    pos[0] += 0.5 * (0, _valueTypes.randomRange)(-thickness.x, thickness.x);
    pos[0] = (0, _valueTypes.clamp)(pos[0], -0.5, 0.5);
  }

  if (thickness.y > 0) {
    pos[1] += 0.5 * (0, _valueTypes.randomRange)(-thickness.y, thickness.y);
    pos[1] = (0, _valueTypes.clamp)(pos[1], -0.5, 0.5);
  }

  if (thickness.z > 0) {
    pos[2] += 0.5 * (0, _valueTypes.randomRange)(-thickness.z, thickness.z);
    pos[2] = (0, _valueTypes.clamp)(pos[2], -0.5, 0.5);
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcZW1pdHRlclxcc2hhcGUtbW9kdWxlLnRzIl0sIm5hbWVzIjpbIl9pbnRlcm1lZGlWZWMiLCJWZWMzIiwiX2ludGVybWVkaUFyciIsIkFycmF5IiwiX3VuaXRCb3hFeHRlbnQiLCJTaGFwZU1vZHVsZSIsInR5cGUiLCJTaGFwZVR5cGUiLCJFbWl0TG9jYXRpb24iLCJBcmNNb2RlIiwiQ3VydmVSYW5nZSIsIm1hdCIsIlF1YXQiLCJwYXJ0aWNsZVN5c3RlbSIsImxhc3RUaW1lIiwidG90YWxBbmdsZSIsIk1hdDQiLCJxdWF0Iiwib25Jbml0IiwicHMiLCJjb25zdHJ1Y3RNYXQiLCJfdGltZSIsImZyb21FdWxlciIsIl9yb3RhdGlvbiIsIngiLCJ5IiwieiIsImZyb21SVFMiLCJfcG9zaXRpb24iLCJfc2NhbGUiLCJlbWl0IiwicCIsInNoYXBlVHlwZSIsIkJveCIsImJveEVtaXQiLCJlbWl0RnJvbSIsImJveFRoaWNrbmVzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJDaXJjbGUiLCJjaXJjbGVFbWl0IiwicmFkaXVzIiwicmFkaXVzVGhpY2tuZXNzIiwiZ2VuZXJhdGVBcmNBbmdsZSIsIkNvbmUiLCJjb25lRW1pdCIsIl9hbmdsZSIsImxlbmd0aCIsIlNwaGVyZSIsInNwaGVyZUVtaXQiLCJIZW1pc3BoZXJlIiwiaGVtaXNwaGVyZUVtaXQiLCJjb25zb2xlIiwid2FybiIsInJhbmRvbVBvc2l0aW9uQW1vdW50IiwidHJhbnNmb3JtUXVhdCIsInRyYW5zZm9ybU1hdDQiLCJzcGhlcmljYWxEaXJlY3Rpb25BbW91bnQiLCJzcGhlcmljYWxWZWwiLCJub3JtYWxpemUiLCJsZXJwIiwiYXJjTW9kZSIsIlJhbmRvbSIsIl9hcmMiLCJhbmdsZSIsIk1hdGgiLCJQSSIsImFyY1NwZWVkIiwiZXZhbHVhdGUiLCJhcmNTcHJlYWQiLCJmbG9vciIsIkxvb3AiLCJQaW5nUG9uZyIsIl9zaGFwZVR5cGUiLCJ2YWwiLCJCYXNlIiwiVm9sdW1lIiwiRWRnZSIsInJvdW5kIiwicHJvcGVydHkiLCJwb3MiLCJkaXIiLCJjb3B5IiwiU2hlbGwiLCJzY2FsZSIsInRoZXRhIiwiVmVjMiIsInNpbiIsImNvcyIsImFkZCIsInNwbGljZSIsInB1c2giLCJhcHBseUJveFRoaWNrbmVzcyIsInNldCIsInBhcnRpY2xlRW1pdFpBeGlzIiwidGhpY2tuZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGFBQWEsR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF0Qjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsSUFBSUMsS0FBSixFQUF0Qjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsSUFBSUgsZ0JBQUosQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixDQUF2QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztJQUVxQkksc0JBRHBCLCtCQUFRLGdCQUFSLFdBbUJJLGdDQUFTO0FBQ05DLEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFULFdBa0NBLGdDQUFTO0FBQ05ELEVBQUFBLElBQUksRUFBRUU7QUFEQSxDQUFULFdBb0VBLGdDQUFTO0FBQ05GLEVBQUFBLElBQUksRUFBRUc7QUFEQSxDQUFULFdBa0JBLGdDQUFTO0FBQ05ILEVBQUFBLElBQUksRUFBRUk7QUFEQSxDQUFUO0FBK0dELHlCQUFlO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsU0FOZkMsR0FNZSxHQU5ULElBTVM7QUFBQSxTQUxmQyxJQUtlLEdBTFIsSUFLUTtBQUFBLFNBSmZDLGNBSWUsR0FKRSxJQUlGO0FBQUEsU0FIZkMs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MEJxRSxTQUFTLENBQUNyRSxDQUFwQyxDQUFoQjtBQUNBc0QsSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTLHVCQUFNQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsQ0FBQyxHQUFmLEVBQW9CLEdBQXBCLENBQVQ7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuaW1wb3J0IHsgY2xhbXAsIE1hdDQsIHBpbmdQb25nLCBRdWF0LCByYW5kb20sIHJhbmRvbVJhbmdlLCByZXBlYXQsIHRvRGVncmVlLCB0b1JhZGlhbiwgVmVjMiwgVmVjMyB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi4vYW5pbWF0b3IvY3VydmUtcmFuZ2UnO1xyXG5pbXBvcnQgeyBmaXhlZEFuZ2xlVW5pdFZlY3RvcjIsIHBhcnRpY2xlRW1pdFpBeGlzLCByYW5kb21Qb2ludEJldHdlZW5DaXJjbGVBdEZpeGVkQW5nbGUsIHJhbmRvbVBvaW50QmV0d2VlblNwaGVyZSwgcmFuZG9tUG9pbnRJbkN1YmUsIHJhbmRvbVNpZ24sIHJhbmRvbVNvcnRBcnJheSwgcmFuZG9tVW5pdFZlY3RvciB9IGZyb20gJy4uL3BhcnRpY2xlLWdlbmVyYWwtZnVuY3Rpb24nO1xyXG5pbXBvcnQgeyBTaGFwZVR5cGUsIEVtaXRMb2NhdGlvbiwgQXJjTW9kZSB9IGZyb20gJy4uL2VudW0nO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGU6IG1heC1saW5lLWxlbmd0aFxyXG5jb25zdCBfaW50ZXJtZWRpVmVjID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbmNvbnN0IF9pbnRlcm1lZGlBcnIgPSBuZXcgQXJyYXkoKTtcclxuY29uc3QgX3VuaXRCb3hFeHRlbnQgPSBuZXcgVmVjMygwLjUsIDAuNSwgMC41KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBzaGFwZSBtb2R1bGUgb2YgM2QgcGFydGljbGUuXHJcbiAqICEjemggM0Qg57KS5a2Q55qE5Y+R5bCE5b2i54q25qih5Z2XXHJcbiAqIEBjbGFzcyBTaGFwZU1vZHVsZVxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLlNoYXBlTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGVNb2R1bGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIHNoYXBlTW9kdWxlLlxyXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfc2hhcGVUeXBlID0gU2hhcGVUeXBlLkNvbmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXIgdHlwZS5cclxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo57G75Z6L44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1NoYXBlVHlwZX0gc2hhcGVUeXBlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogU2hhcGVUeXBlLFxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgc2hhcGVUeXBlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGVUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2hhcGVUeXBlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zaGFwZVR5cGUgPSB2YWw7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zaGFwZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQm94OlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdEZyb20gPT09IEVtaXRMb2NhdGlvbi5CYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0RnJvbSA9IEVtaXRMb2NhdGlvbi5Wb2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQ29uZTpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRGcm9tID09PSBFbWl0TG9jYXRpb24uRWRnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEZyb20gPSBFbWl0TG9jYXRpb24uQmFzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5TcGhlcmU6XHJcbiAgICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLkhlbWlzcGhlcmU6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbWl0RnJvbSA9PT0gRW1pdExvY2F0aW9uLkJhc2UgfHwgdGhpcy5lbWl0RnJvbSA9PT0gRW1pdExvY2F0aW9uLkVkZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRGcm9tID0gRW1pdExvY2F0aW9uLlZvbHVtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGVtaXNzaW9uIHNpdGUgb2YgdGhlIHBhcnRpY2xlLlxyXG4gICAgICogISN6aCDnspLlrZDku47lj5HlsITlmajlk6rkuKrpg6jkvY3lj5HlsITjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7RW1pdExvY2F0aW9ufSBlbWl0RnJvbVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEVtaXRMb2NhdGlvbixcclxuICAgIH0pXHJcbiAgICBlbWl0RnJvbSA9IEVtaXRMb2NhdGlvbi5Wb2x1bWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXIgcmFkaXVzLlxyXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajljYrlvoTjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICByYWRpdXMgPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIGVtaXNzaW9uIHBvc2l0aW9uIChub3QgdmFsaWQgZm9yIEJveCB0eXBlIGVtaXR0ZXJzKe+8mjxiZz5cclxuICAgICAqIC0gMCBtZWFucyBlbWl0dGVkIGZyb20gdGhlIHN1cmZhY2U7XHJcbsKgwqDCoMKgwqAqIC0gMSBtZWFucyBsYXVuY2ggZnJvbSB0aGUgY2VudGVyO1xyXG7CoMKgwqDCoMKgKiAtIDAgfiAxIGluZGljYXRlcyBlbWlzc2lvbiBmcm9tIHRoZSBjZW50ZXIgdG8gdGhlIHN1cmZhY2UuXHJcbiAgICAgKiAhI3poIOeykuWtkOWPkeWwhOWZqOWPkeWwhOS9jee9ru+8iOWvuSBCb3gg57G75Z6L55qE5Y+R5bCE5Zmo5peg5pWI77yJ77yaPGJnPlxyXG4gICAgICogLSAwIOihqOekuuS7juihqOmdouWPkeWwhO+8m1xyXG4gICAgICogLSAxIOihqOekuuS7juS4reW/g+WPkeWwhO+8m1xyXG4gICAgICogLSAwIH4gMSDkuYvpl7TooajnpLrlnKjkuK3lv4PliLDooajpnaLkuYvpl7Tlj5HlsITjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNUaGlja25lc3NcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICByYWRpdXNUaGlja25lc3MgPSAxO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2FuZ2xlID0gdG9SYWRpYW4oMjUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYW5nbGUgYmV0d2VlbiB0aGUgYXhpcyBvZiB0aGUgY29uZSBhbmQgdGhlIGdlbmVyYXRyaXg8Ymc+XHJcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBvcGVuaW5nIGFuZCBjbG9zaW5nIG9mIHRoZSBjb25lIGxhdW5jaGVyXHJcbiAgICAgKiAhI3poIOWchumUpeeahOi9tOS4juavjee6v+eahOWkueinkjxiZz7jgIJcclxuICAgICAqIOWGs+WumuWchumUpeWPkeWwhOWZqOeahOW8gOWQiOeoi+W6puOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ2xlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IGFuZ2xlICgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh0b0RlZ3JlZSh0aGlzLl9hbmdsZSkgKiAxMDApIC8gMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhbmdsZSAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fYW5nbGUgPSB0b1JhZGlhbih2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2FyYyA9IHRvUmFkaWFuKDM2MCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXJzIGVtaXQgaW4gYSBmYW4tc2hhcGVkIHJhbmdlLlxyXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajlnKjkuIDkuKrmiYflvaLojIPlm7TlhoXlj5HlsITjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhcmNcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgYXJjICgpIHtcclxuICAgICAgICByZXR1cm4gdG9EZWdyZWUodGhpcy5fYXJjKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYXJjICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9hcmMgPSB0b1JhZGlhbih2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBIb3cgcGFydGljbGVzIGFyZSBlbWl0dGVkIGluIHRoZSBzZWN0b3IgcmFuZ2UuXHJcbiAgICAgKiAhI3poIOeykuWtkOWcqOaJh+W9ouiMg+WbtOWGheeahOWPkeWwhOaWueW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtBcmNNb2RlfSBhcmNNb2RlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQXJjTW9kZSxcclxuICAgIH0pXHJcbiAgICBhcmNNb2RlID0gQXJjTW9kZS5SYW5kb207XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbnRyb2xzIHRoZSBkaXNjcmV0ZSBpbnRlcnZhbHMgYXJvdW5kIHRoZSBhcmNzIHdoZXJlIHBhcnRpY2xlcyBtaWdodCBiZSBnZW5lcmF0ZWQuXHJcbiAgICAgKiAhI3poIOaOp+WItuWPr+iDveS6p+eUn+eykuWtkOeahOW8p+WRqOWbtOeahOemu+aVo+mXtOmalOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFyY1NwcmVhZFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFyY1NwcmVhZCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzcGVlZCBhdCB3aGljaCBwYXJ0aWNsZXMgYXJlIGVtaXR0ZWQgYXJvdW5kIHRoZSBjaXJjdW1mZXJlbmNlLlxyXG4gICAgICogISN6aCDnspLlrZDmsr/lnIblkajlj5HlsITnmoTpgJ/luqbjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gYXJjU3BlZWRcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIGFyY1NwZWVkID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQXhpcyBsZW5ndGggZnJvbSB0b3Agb2YgY29uZSB0byBib3R0b20gb2YgY29uZSA8Ymc+LlxyXG7CoMKgwqDCoMKgKiBEZXRlcm1pbmVzIHRoZSBoZWlnaHQgb2YgdGhlIGNvbmUgZW1pdHRlci5cclxuICAgICAqICEjemgg5ZyG6ZSl6aG26YOo5oiq6Z2i6Led56a75bqV6YOo55qE6L206ZW/PGJnPuOAglxyXG4gICAgICog5Yaz5a6a5ZyG6ZSl5Y+R5bCE5Zmo55qE6auY5bqm44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgbGVuZ3RoID0gNTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgZW1pdHRlciBlbWlzc2lvbiBsb2NhdGlvbiAoZm9yIGJveC10eXBlIHBhcnRpY2xlIGVtaXR0ZXJzKS5cclxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo5Y+R5bCE5L2N572u77yI6ZKI5a+5IEJveCDnsbvlnovnmoTnspLlrZDlj5HlsITlmajjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYm94VGhpY2tuZXNzXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgYm94VGhpY2tuZXNzID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfcG9zaXRpb24gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgRW1pdHRlciBQb3NpdGlvblxyXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajkvY3nva7jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gcG9zaXRpb25cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgcG9zaXRpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH1cclxuICAgIHNldCBwb3NpdGlvbiAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9yb3RhdGlvbiA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIHJvdGF0aW9uIGFuZ2xlLlxyXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajml4vovazop5LluqbjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gcm90YXRpb25cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgcm90YXRpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHNldCByb3RhdGlvbiAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zY2FsZSA9IG5ldyBWZWMzKDEsIDEsIDEpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIHNjYWxpbmdcclxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo57yp5pS+5q+U5L6L44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IHNjYWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IHNjYWxlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XHJcbiAgICB9XHJcbiAgICBzZXQgc2NhbGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NjYWxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuY29uc3RydWN0TWF0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBkaXJlY3Rpb24gb2YgcGFydGljbGUgbW92ZW1lbnQgaXMgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBkaXJlY3Rpb24gb2YgdGhlIHBhcnRpY2xlcy5cclxuICAgICAqICEjemgg5qC55o2u57KS5a2Q55qE5Yid5aeL5pa55ZCR5Yaz5a6a57KS5a2Q55qE56e75Yqo5pa55ZCR44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFsaWduVG9EaXJlY3Rpb25cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBhbGlnblRvRGlyZWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCBwYXJ0aWNsZSBnZW5lcmF0aW9uIGRpcmVjdGlvbiByYW5kb21seS5cclxuICAgICAqICEjemgg57KS5a2Q55Sf5oiQ5pa55ZCR6ZqP5py66K6+5a6a44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcmFuZG9tRGlyZWN0aW9uQW1vdW50XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcmFuZG9tRGlyZWN0aW9uQW1vdW50ID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHRoZSBjdXJyZW50IGVtaXNzaW9uIGRpcmVjdGlvbiBhbmQgdGhlIGRpcmVjdGlvbiBmcm9tIHRoZSBjdXJyZW50IHBvc2l0aW9uIHRvIHRoZSBjZW50ZXIgb2YgdGhlIG5vZGUuXHJcbiAgICAgKiAhI3poIOihqOekuuW9k+WJjeWPkeWwhOaWueWQkeS4juW9k+WJjeS9jee9ruWIsOe7k+eCueS4reW/g+i/nue6v+aWueWQkeeahOaPkuWAvOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNwaGVyaWNhbERpcmVjdGlvbkFtb3VudFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHNwaGVyaWNhbERpcmVjdGlvbkFtb3VudCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgcGFydGljbGUgZ2VuZXJhdGlvbiBwb3NpdGlvbiByYW5kb21seSAoc2V0dGluZyB0aGlzIHZhbHVlIHRvIGEgdmFsdWUgb3RoZXIgdGhhbiAwIHdpbGwgY2F1c2UgdGhlIHBhcnRpY2xlIGdlbmVyYXRpb24gcG9zaXRpb24gdG8gZXhjZWVkIHRoZSBnZW5lcmF0b3Igc2l6ZSByYW5nZSlcclxuICAgICAqICEjemgg57KS5a2Q55Sf5oiQ5L2N572u6ZqP5py66K6+5a6a77yI6K6+5a6a5q2k5YC85Li66Z2eIDAg5Lya5L2/57KS5a2Q55Sf5oiQ5L2N572u6LaF5Ye655Sf5oiQ5Zmo5aSn5bCP6IyD5Zu077yJ44CCXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcmFuZG9tUG9zaXRpb25BbW91bnQgPSAwO1xyXG5cclxuICAgIG1hdCA9IG51bGw7XHJcbiAgICBRdWF0ID0gbnVsbDtcclxuICAgIHBhcnRpY2xlU3lzdGVtID0gbnVsbDtcclxuICAgIGxhc3RUaW1lID0gbnVsbDtcclxuICAgIHRvdGFsQW5nbGUgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLm1hdCA9IG5ldyBNYXQ0KCk7XHJcbiAgICAgICAgdGhpcy5xdWF0ID0gbmV3IFF1YXQoKTtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsQW5nbGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5pdCAocHMpIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gcHM7XHJcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXQoKTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5wYXJ0aWNsZVN5c3RlbS5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RNYXQgKCkge1xyXG4gICAgICAgIFF1YXQuZnJvbUV1bGVyKHRoaXMucXVhdCwgdGhpcy5fcm90YXRpb24ueCwgdGhpcy5fcm90YXRpb24ueSwgdGhpcy5fcm90YXRpb24ueik7XHJcbiAgICAgICAgTWF0NC5mcm9tUlRTKHRoaXMubWF0LCB0aGlzLnF1YXQsIHRoaXMuX3Bvc2l0aW9uLCB0aGlzLl9zY2FsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCAocCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zaGFwZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQm94OlxyXG4gICAgICAgICAgICAgICAgYm94RW1pdCh0aGlzLmVtaXRGcm9tLCB0aGlzLmJveFRoaWNrbmVzcywgcC5wb3NpdGlvbiwgcC52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQ2lyY2xlOlxyXG4gICAgICAgICAgICAgICAgY2lyY2xlRW1pdCh0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXNUaGlja25lc3MsIHRoaXMuZ2VuZXJhdGVBcmNBbmdsZSgpLCBwLnBvc2l0aW9uLCBwLnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5Db25lOlxyXG4gICAgICAgICAgICAgICAgY29uZUVtaXQodGhpcy5lbWl0RnJvbSwgdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzVGhpY2tuZXNzLCB0aGlzLmdlbmVyYXRlQXJjQW5nbGUoKSwgdGhpcy5fYW5nbGUsIHRoaXMubGVuZ3RoLCBwLnBvc2l0aW9uLCBwLnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5TcGhlcmU6XHJcbiAgICAgICAgICAgICAgICBzcGhlcmVFbWl0KHRoaXMuZW1pdEZyb20sIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1c1RoaWNrbmVzcywgcC5wb3NpdGlvbiwgcC52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuSGVtaXNwaGVyZTpcclxuICAgICAgICAgICAgICAgIGhlbWlzcGhlcmVFbWl0KHRoaXMuZW1pdEZyb20sIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1c1RoaWNrbmVzcywgcC5wb3NpdGlvbiwgcC52ZWxvY2l0eSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybih0aGlzLnNoYXBlVHlwZSArICcgc2hhcGVUeXBlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgU2hhcGVNb2R1bGUuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJhbmRvbVBvc2l0aW9uQW1vdW50ID4gMCkge1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLnggKz0gcmFuZG9tUmFuZ2UoLXRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQsIHRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQpO1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLnkgKz0gcmFuZG9tUmFuZ2UoLXRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQsIHRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQpO1xyXG4gICAgICAgICAgICBwLnBvc2l0aW9uLnogKz0gcmFuZG9tUmFuZ2UoLXRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQsIHRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQocC52ZWxvY2l0eSwgcC52ZWxvY2l0eSwgdGhpcy5xdWF0KTtcclxuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQocC5wb3NpdGlvbiwgcC5wb3NpdGlvbiwgdGhpcy5tYXQpO1xyXG4gICAgICAgIGlmICh0aGlzLnNwaGVyaWNhbERpcmVjdGlvbkFtb3VudCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3Qgc3BoZXJpY2FsVmVsID0gVmVjMy5ub3JtYWxpemUoX2ludGVybWVkaVZlYywgcC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIFZlYzMubGVycChwLnZlbG9jaXR5LCBwLnZlbG9jaXR5LCBzcGhlcmljYWxWZWwsIHRoaXMuc3BoZXJpY2FsRGlyZWN0aW9uQW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IHRoaXMucGFydGljbGVTeXN0ZW0uX3RpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVBcmNBbmdsZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXJjTW9kZSA9PT0gQXJjTW9kZS5SYW5kb20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbVJhbmdlKDAsIHRoaXMuX2FyYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMudG90YWxBbmdsZSArIDIgKiBNYXRoLlBJICogdGhpcy5hcmNTcGVlZC5ldmFsdWF0ZSh0aGlzLnBhcnRpY2xlU3lzdGVtLl90aW1lLCAxKSAqICh0aGlzLnBhcnRpY2xlU3lzdGVtLl90aW1lIC0gdGhpcy5sYXN0VGltZSk7XHJcbiAgICAgICAgdGhpcy50b3RhbEFuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgaWYgKHRoaXMuYXJjU3ByZWFkICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5mbG9vcihhbmdsZSAvICh0aGlzLl9hcmMgKiB0aGlzLmFyY1NwcmVhZCkpICogdGhpcy5fYXJjICogdGhpcy5hcmNTcHJlYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5hcmNNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQXJjTW9kZS5Mb29wOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcGVhdChhbmdsZSwgdGhpcy5fYXJjKTtcclxuICAgICAgICAgICAgY2FzZSBBcmNNb2RlLlBpbmdQb25nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpbmdQb25nKGFuZ2xlLCB0aGlzLl9hcmMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc3BoZXJlRW1pdCAoZW1pdEZyb20sIHJhZGl1cywgcmFkaXVzVGhpY2tuZXNzLCBwb3MsIGRpcikge1xyXG4gICAgc3dpdGNoIChlbWl0RnJvbSkge1xyXG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlZvbHVtZTpcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRCZXR3ZWVuU3BoZXJlKHBvcywgcmFkaXVzICogKDEgLSByYWRpdXNUaGlja25lc3MpLCByYWRpdXMpO1xyXG4gICAgICAgICAgICBWZWMzLmNvcHkoZGlyLCBwb3MpO1xyXG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShkaXIsIGRpcik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlNoZWxsOlxyXG4gICAgICAgICAgICByYW5kb21Vbml0VmVjdG9yKHBvcyk7XHJcbiAgICAgICAgICAgIFZlYzMuc2NhbGUocG9zLCBwb3MsIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIFZlYzMuY29weShkaXIsIHBvcyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlbWl0RnJvbSArICcgaXMgbm90IHN1cHBvcnRlZCBmb3Igc3BoZXJlIGVtaXR0ZXIuJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlbWlzcGhlcmVFbWl0IChlbWl0RnJvbSwgcmFkaXVzLCByYWRpdXNUaGlja25lc3MsIHBvcywgZGlyKSB7XHJcbiAgICBzd2l0Y2ggKGVtaXRGcm9tKSB7XHJcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uVm9sdW1lOlxyXG4gICAgICAgICAgICByYW5kb21Qb2ludEJldHdlZW5TcGhlcmUocG9zLCByYWRpdXMgKiAoMSAtIHJhZGl1c1RoaWNrbmVzcyksIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGlmIChwb3MueiA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvcy56ICo9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlYzMuY29weShkaXIsIHBvcyk7XHJcbiAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKGRpciwgZGlyKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uU2hlbGw6XHJcbiAgICAgICAgICAgIHJhbmRvbVVuaXRWZWN0b3IocG9zKTtcclxuICAgICAgICAgICAgVmVjMy5zY2FsZShwb3MsIHBvcywgcmFkaXVzKTtcclxuICAgICAgICAgICAgaWYgKHBvcy56IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcG9zLnogKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVmVjMy5jb3B5KGRpciwgcG9zKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGVtaXRGcm9tICsgJyBpcyBub3Qgc3VwcG9ydGVkIGZvciBoZW1pc3BoZXJlIGVtaXR0ZXIuJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbmVFbWl0IChlbWl0RnJvbSwgcmFkaXVzLCByYWRpdXNUaGlja25lc3MsIHRoZXRhLCBhbmdsZSwgbGVuZ3RoLCBwb3MsIGRpcikge1xyXG4gICAgc3dpdGNoIChlbWl0RnJvbSkge1xyXG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLkJhc2U6XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50QmV0d2VlbkNpcmNsZUF0Rml4ZWRBbmdsZShwb3MsIHJhZGl1cyAqICgxIC0gcmFkaXVzVGhpY2tuZXNzKSwgcmFkaXVzLCB0aGV0YSk7XHJcbiAgICAgICAgICAgIFZlYzIuc2NhbGUoZGlyLCBwb3MsIE1hdGguc2luKGFuZ2xlKSk7XHJcbiAgICAgICAgICAgIGRpci56ID0gLU1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcclxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGlyLCBkaXIpO1xyXG4gICAgICAgICAgICBwb3MueiA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlNoZWxsOlxyXG4gICAgICAgICAgICBmaXhlZEFuZ2xlVW5pdFZlY3RvcjIocG9zLCB0aGV0YSk7XHJcbiAgICAgICAgICAgIFZlYzIuc2NhbGUoZGlyLCBwb3MsIE1hdGguc2luKGFuZ2xlKSk7XHJcbiAgICAgICAgICAgIGRpci56ID0gLU1hdGguY29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGlyLCBkaXIpO1xyXG4gICAgICAgICAgICBWZWMyLnNjYWxlKHBvcywgcG9zLCByYWRpdXMpO1xyXG4gICAgICAgICAgICBwb3MueiA9IDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlZvbHVtZTpcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlQXRGaXhlZEFuZ2xlKHBvcywgcmFkaXVzICogKDEgLSByYWRpdXNUaGlja25lc3MpLCByYWRpdXMsIHRoZXRhKTtcclxuICAgICAgICAgICAgVmVjMi5zY2FsZShkaXIsIHBvcywgTWF0aC5zaW4oYW5nbGUpKTtcclxuICAgICAgICAgICAgZGlyLnogPSAtTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xyXG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShkaXIsIGRpcik7XHJcbiAgICAgICAgICAgIHBvcy56ID0gMDtcclxuICAgICAgICAgICAgVmVjMy5hZGQocG9zLCBwb3MsIFZlYzMuc2NhbGUoX2ludGVybWVkaVZlYywgZGlyLCBsZW5ndGggKiByYW5kb20oKSAvIC1kaXIueikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZW1pdEZyb20gKyAnIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGNvbmUgZW1pdHRlci4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYm94RW1pdCAoZW1pdEZyb20sIGJveFRoaWNrbmVzcywgcG9zLCBkaXIpIHtcclxuICAgIHN3aXRjaCAoZW1pdEZyb20pIHtcclxuICAgICAgICBjYXNlIEVtaXRMb2NhdGlvbi5Wb2x1bWU6XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50SW5DdWJlKHBvcywgX3VuaXRCb3hFeHRlbnQpO1xyXG4gICAgICAgICAgICAvLyByYW5kb21Qb2ludEJldHdlZW5DdWJlKHBvcywgVmVjMy5tdWx0aXBseShfaW50ZXJtZWRpVmVjLCBfdW5pdEJveEV4dGVudCwgYm94VGhpY2tuZXNzKSwgX3VuaXRCb3hFeHRlbnQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEVtaXRMb2NhdGlvbi5TaGVsbDpcclxuICAgICAgICAgICAgX2ludGVybWVkaUFyci5zcGxpY2UoMCwgX2ludGVybWVkaUFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICBfaW50ZXJtZWRpQXJyLnB1c2gocmFuZG9tUmFuZ2UoLTAuNSwgMC41KSk7XHJcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21SYW5nZSgtMC41LCAwLjUpKTtcclxuICAgICAgICAgICAgX2ludGVybWVkaUFyci5wdXNoKHJhbmRvbVNpZ24oKSAqIDAuNSk7XHJcbiAgICAgICAgICAgIHJhbmRvbVNvcnRBcnJheShfaW50ZXJtZWRpQXJyKTtcclxuICAgICAgICAgICAgYXBwbHlCb3hUaGlja25lc3MoX2ludGVybWVkaUFyciwgYm94VGhpY2tuZXNzKTtcclxuICAgICAgICAgICAgVmVjMy5zZXQocG9zLCBfaW50ZXJtZWRpQXJyWzBdLCBfaW50ZXJtZWRpQXJyWzFdLCBfaW50ZXJtZWRpQXJyWzJdKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uRWRnZTpcclxuICAgICAgICAgICAgX2ludGVybWVkaUFyci5zcGxpY2UoMCwgX2ludGVybWVkaUFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICBfaW50ZXJtZWRpQXJyLnB1c2gocmFuZG9tUmFuZ2UoLTAuNSwgMC41KSk7XHJcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21TaWduKCkgKiAwLjUpO1xyXG4gICAgICAgICAgICBfaW50ZXJtZWRpQXJyLnB1c2gocmFuZG9tU2lnbigpICogMC41KTtcclxuICAgICAgICAgICAgcmFuZG9tU29ydEFycmF5KF9pbnRlcm1lZGlBcnIpO1xyXG4gICAgICAgICAgICBhcHBseUJveFRoaWNrbmVzcyhfaW50ZXJtZWRpQXJyLCBib3hUaGlja25lc3MpO1xyXG4gICAgICAgICAgICBWZWMzLnNldChwb3MsIF9pbnRlcm1lZGlBcnJbMF0sIF9pbnRlcm1lZGlBcnJbMV0sIF9pbnRlcm1lZGlBcnJbMl0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZW1pdEZyb20gKyAnIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGJveCBlbWl0dGVyLicpO1xyXG4gICAgfVxyXG4gICAgVmVjMy5jb3B5KGRpciwgcGFydGljbGVFbWl0WkF4aXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaXJjbGVFbWl0IChyYWRpdXMsIHJhZGl1c1RoaWNrbmVzcywgdGhldGEsIHBvcywgZGlyKSB7XHJcbiAgICByYW5kb21Qb2ludEJldHdlZW5DaXJjbGVBdEZpeGVkQW5nbGUocG9zLCByYWRpdXMgKiAoMSAtIHJhZGl1c1RoaWNrbmVzcyksIHJhZGl1cywgdGhldGEpO1xyXG4gICAgVmVjMy5ub3JtYWxpemUoZGlyLCBwb3MpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseUJveFRoaWNrbmVzcyAocG9zLCB0aGlja25lc3MpIHtcclxuICAgIGlmICh0aGlja25lc3MueCA+IDApIHtcclxuICAgICAgICBwb3NbMF0gKz0gMC41ICogcmFuZG9tUmFuZ2UoLXRoaWNrbmVzcy54LCB0aGlja25lc3MueCk7XHJcbiAgICAgICAgcG9zWzBdID0gY2xhbXAocG9zWzBdLCAtMC41LCAwLjUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaWNrbmVzcy55ID4gMCkge1xyXG4gICAgICAgIHBvc1sxXSArPSAwLjUgKiByYW5kb21SYW5nZSgtdGhpY2tuZXNzLnksIHRoaWNrbmVzcy55KTtcclxuICAgICAgICBwb3NbMV0gPSBjbGFtcChwb3NbMV0sIC0wLjUsIDAuNSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpY2tuZXNzLnogPiAwKSB7XHJcbiAgICAgICAgcG9zWzJdICs9IDAuNSAqIHJhbmRvbVJhbmdlKC10aGlja25lc3MueiwgdGhpY2tuZXNzLnopO1xyXG4gICAgICAgIHBvc1syXSA9IGNsYW1wKHBvc1syXSwgLTAuNSwgMC41KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==