
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle-system-3d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../value-types");

var _utils = require("../../value-types/utils");

var _CCMaterial = _interopRequireDefault(require("../../assets/material/CCMaterial"));

var _colorOvertime = _interopRequireDefault(require("./animator/color-overtime"));

var _curveRange = _interopRequireWildcard(require("./animator/curve-range"));

var _forceOvertime = _interopRequireDefault(require("./animator/force-overtime"));

var _gradientRange = _interopRequireDefault(require("./animator/gradient-range"));

var _limitVelocityOvertime = _interopRequireDefault(require("./animator/limit-velocity-overtime"));

var _rotationOvertime = _interopRequireDefault(require("./animator/rotation-overtime"));

var _sizeOvertime = _interopRequireDefault(require("./animator/size-overtime"));

var _textureAnimation = _interopRequireDefault(require("./animator/texture-animation"));

var _velocityOvertime = _interopRequireDefault(require("./animator/velocity-overtime"));

var _burst = _interopRequireDefault(require("./burst"));

var _shapeModule = _interopRequireDefault(require("./emitter/shape-module"));

var _enum = require("./enum");

var _particleGeneralFunction = require("./particle-general-function");

var _trail = _interopRequireDefault(require("./renderer/trail"));

var _CCMesh = _interopRequireDefault(require("../../mesh/CCMesh"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _require = require('../../platform/CCClassDecorator'),
    ccclass = _require.ccclass,
    menu = _require.menu,
    property = _require.property,
    executeInEditMode = _require.executeInEditMode,
    executionOrder = _require.executionOrder;

var RenderComponent = require('../../components/CCRenderComponent');

var _world_mat = new _valueTypes.Mat4();

var _module_props = CC_EDITOR && ["_colorOverLifetimeModule", "_shapeModule", "_sizeOvertimeModule", "_velocityOvertimeModule", "_forceOvertimeModule", "_limitVelocityOvertimeModule", "_rotationOvertimeModule", "_textureAnimationModule", "_trailModule"];
/**
 * !#en The ParticleSystem3D Component.
 * !#zh 3D 粒子组件
 * @class ParticleSystem3D
 * @extends RenderComponent
 */


var ParticleSystem3D = (_dec = ccclass('cc.ParticleSystem3D'), _dec2 = menu('i18n:MAIN_MENU.component.renderers/ParticleSystem3D'), _dec3 = executionOrder(99), _dec4 = property({
  animatable: false
}), _dec5 = property({
  animatable: false
}), _dec6 = property({
  type: _enum.Space,
  animatable: false
}), _dec7 = property({
  type: _curveRange["default"]
}), _dec8 = property({
  type: _curveRange["default"]
}), _dec9 = property({
  type: _gradientRange["default"]
}), _dec10 = property({
  type: _enum.Space
}), _dec11 = property({
  type: _curveRange["default"]
}), _dec12 = property({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec13 = property({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec14 = property({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec15 = property({
  type: _curveRange["default"]
}), _dec16 = property({
  type: _curveRange["default"]
}), _dec17 = property({
  type: [_burst["default"]],
  animatable: false
}), _dec18 = property({
  type: [_CCMaterial["default"]],
  displayName: 'Materials',
  visible: false,
  override: true
}), _dec19 = property({
  type: _shapeModule["default"],
  animatable: false
}), _dec20 = property({
  type: _colorOvertime["default"],
  animatable: false
}), _dec21 = property({
  type: _sizeOvertime["default"],
  animatable: false
}), _dec22 = property({
  type: _velocityOvertime["default"],
  animatable: false
}), _dec23 = property({
  type: _forceOvertime["default"],
  animatable: false
}), _dec24 = property({
  type: _limitVelocityOvertime["default"],
  animatable: false
}), _dec25 = property({
  type: _rotationOvertime["default"],
  animatable: false
}), _dec26 = property({
  type: _textureAnimation["default"],
  animatable: false
}), _dec27 = property({
  type: _trail["default"],
  animatable: false
}), _dec28 = property({
  type: _enum.RenderMode,
  animatable: false
}), _dec29 = property({
  animatable: false
}), _dec30 = property({
  animatable: false
}), _dec31 = property({
  type: _CCMesh["default"],
  animatable: false
}), _dec32 = property({
  type: _CCMaterial["default"],
  animatable: false
}), _dec33 = property({
  type: _CCMaterial["default"],
  animatable: false
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderComponent) {
  _inheritsLoose(ParticleSystem3D, _RenderComponent);

  // array of { emitter: ParticleSystem3D, type: 'birth', 'collision' or 'death'}
  function ParticleSystem3D() {
    var _this2;

    _this2 = _RenderComponent.call(this) || this;

    _initializerDefineProperty(_this2, "duration", _descriptor, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_capacity", _descriptor2, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "loop", _descriptor3, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "playOnAwake", _descriptor4, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_prewarm", _descriptor5, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_simulationSpace", _descriptor6, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "simulationSpeed", _descriptor7, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startDelay", _descriptor8, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startLifetime", _descriptor9, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startColor", _descriptor10, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "scaleSpace", _descriptor11, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startSize", _descriptor12, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startSpeed", _descriptor13, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startRotation", _descriptor14, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "gravityModifier", _descriptor15, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "rateOverTime", _descriptor16, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "rateOverDistance", _descriptor17, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "bursts", _descriptor18, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_shapeModule", _descriptor19, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_colorOverLifetimeModule", _descriptor20, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_sizeOvertimeModule", _descriptor21, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_velocityOvertimeModule", _descriptor22, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_forceOvertimeModule", _descriptor23, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_limitVelocityOvertimeModule", _descriptor24, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_rotationOvertimeModule", _descriptor25, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_textureAnimationModule", _descriptor26, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_trailModule", _descriptor27, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_renderMode", _descriptor28, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_velocityScale", _descriptor29, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_lengthScale", _descriptor30, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_mesh", _descriptor31, _assertThisInitialized(_this2));

    _this2._isPlaying = void 0;
    _this2._isPaused = void 0;
    _this2._isStopped = void 0;
    _this2._isEmitting = void 0;
    _this2._time = void 0;
    _this2._emitRateTimeCounter = void 0;
    _this2._emitRateDistanceCounter = void 0;
    _this2._oldWPos = void 0;
    _this2._curWPos = void 0;
    _this2._customData1 = void 0;
    _this2._customData2 = void 0;
    _this2._subEmitters = void 0;
    _this2.rateOverTime.constant = 10;
    _this2.startLifetime.constant = 5;
    _this2.startSize.constant = 1;
    _this2.startSpeed.constant = 5; // internal status

    _this2._isPlaying = false;
    _this2._isPaused = false;
    _this2._isStopped = true;
    _this2._isEmitting = false;
    _this2._time = 0.0; // playback position in seconds.

    _this2._emitRateTimeCounter = 0.0;
    _this2._emitRateDistanceCounter = 0.0;
    _this2._oldWPos = new _valueTypes.Vec3(0, 0, 0);
    _this2._curWPos = new _valueTypes.Vec3(0, 0, 0);
    _this2._customData1 = new _valueTypes.Vec2(0, 0);
    _this2._customData2 = new _valueTypes.Vec2(0, 0);
    _this2._subEmitters = []; // array of { emitter: ParticleSystemComponent, type: 'birth', 'collision' or 'death'}

    return _this2;
  }

  var _proto = ParticleSystem3D.prototype;

  _proto.onLoad = function onLoad() {
    this._assembler.onInit(this);

    this.shapeModule.onInit(this);
    this.trailModule.onInit(this);
    this.textureAnimationModule.onInit(this);

    this._resetPosition(); // this._system.add(this);

  };

  _proto._onMaterialModified = function _onMaterialModified(index, material) {
    this._assembler._onMaterialModified(index, material);
  };

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
    this._assembler._onRebuildPSO(index, material);
  } // TODO: fastforward current particle system by simulating particles over given period of time, then pause it.
  // simulate(time, withChildren, restart, fixedTimeStep) {
  // }

  /**
   * !#en Playing particle effects
   * !#zh 播放粒子效果
   * @method play
   */
  ;

  _proto.play = function play() {
    if (this._isPaused) {
      this._isPaused = false;
    }

    if (this._isStopped) {
      this._isStopped = false;
    }

    this._isPlaying = true;
    this._isEmitting = true;

    this._resetPosition(); // prewarm


    if (this._prewarm) {
      this._prewarmSystem();
    }
  }
  /**
   * !#en Pause particle effect
   * !#zh 暂停播放粒子效果
   * @method pause
   */
  ;

  _proto.pause = function pause() {
    if (this._isStopped) {
      console.warn('pause(): particle system is already stopped.');
      return;
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    this._isPaused = true;
  }
  /**
   * !#en Stop particle effect
   * !#zh 停止播放粒子效果
   * @method stop
   */
  ;

  _proto.stop = function stop() {
    if (this._isPlaying || this._isPaused) {
      this.clear();
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    if (this._isPaused) {
      this._isPaused = false;
    }

    this._time = 0.0;
    this._emitRateTimeCounter = 0.0;
    this._emitRateDistanceCounter = 0.0;
    this._isStopped = true;
  } // remove all particles from current particle system.

  /**
   * !#en Remove all particle effect
   * !#zh 将所有粒子从粒子系统中清除
   * @method clear
   */
  ;

  _proto.clear = function clear() {
    if (this.enabledInHierarchy) {
      this._assembler.clear();

      this.trailModule.clear();
    }
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._assembler.getParticleCount();
  };

  _proto.setCustomData1 = function setCustomData1(x, y) {
    _valueTypes.Vec2.set(this._customData1, x, y);
  };

  _proto.setCustomData2 = function setCustomData2(x, y) {
    _valueTypes.Vec2.set(this._customData2, x, y);
  };

  _proto.onDestroy = function onDestroy() {
    // this._system.remove(this);
    this._assembler.onDestroy();

    this.trailModule.destroy();
  };

  _proto.onEnable = function onEnable() {
    _RenderComponent.prototype.onEnable.call(this);

    if (this.playOnAwake) {
      this.play();
    }

    this._assembler.onEnable();

    this.trailModule.onEnable();
  };

  _proto.onDisable = function onDisable() {
    _RenderComponent.prototype.onDisable.call(this);

    this._assembler.onDisable();

    this.trailModule.onDisable();
  };

  _proto.update = function update(dt) {
    var scaledDeltaTime = dt * this.simulationSpeed;

    if (this._isPlaying) {
      this._time += scaledDeltaTime; // excute emission

      this._emit(scaledDeltaTime); // simulation, update particles.


      if (this._assembler._updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
        this.stop();
      } // update render data


      this._assembler.updateParticleBuffer(); // update trail


      if (this.trailModule.enable) {
        this.trailModule.updateTrailBuffer();
      }
    }
  };

  _proto.emit = function emit(count, dt) {
    if (this._simulationSpace === _enum.Space.World) {
      this.node.getWorldMatrix(_world_mat);
    }

    for (var i = 0; i < count; ++i) {
      var particle = this._assembler._getFreeParticle();

      if (particle === null) {
        return;
      }

      var rand = (0, _valueTypes.pseudoRandom)((0, _valueTypes.randomRangeInt)(0, _utils.INT_MAX));

      if (this.shapeModule.enable) {
        this.shapeModule.emit(particle);
      } else {
        _valueTypes.Vec3.set(particle.position, 0, 0, 0);

        _valueTypes.Vec3.copy(particle.velocity, _particleGeneralFunction.particleEmitZAxis);
      }

      if (this.textureAnimationModule.enable) {
        this.textureAnimationModule.init(particle);
      }

      _valueTypes.Vec3.scale(particle.velocity, particle.velocity, this.startSpeed.evaluate(this._time / this.duration, rand));

      switch (this._simulationSpace) {
        case _enum.Space.Local:
          break;

        case _enum.Space.World:
          _valueTypes.Vec3.transformMat4(particle.position, particle.position, _world_mat);

          var worldRot = new _valueTypes.Quat();
          this.node.getWorldRotation(worldRot);

          _valueTypes.Vec3.transformQuat(particle.velocity, particle.velocity, worldRot);

          break;

        case _enum.Space.Custom:
          // TODO:
          break;
      }

      _valueTypes.Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation. now 2D only.


      _valueTypes.Vec3.set(particle.rotation, 0, 0, this.startRotation.evaluate(this._time / this.duration, rand)); // apply startSize. now 2D only.


      _valueTypes.Vec3.set(particle.startSize, this.startSize.evaluate(this._time / this.duration, rand), 1, 1);

      particle.startSize.y = particle.startSize.x;

      _valueTypes.Vec3.copy(particle.size, particle.startSize); // apply startColor.


      particle.startColor.set(this.startColor.evaluate(this._time / this.duration, rand));
      particle.color.set(particle.startColor); // apply startLifetime.

      particle.startLifetime = this.startLifetime.evaluate(this._time / this.duration, rand) + dt;
      particle.remainingLifetime = particle.startLifetime;
      particle.randomSeed = (0, _valueTypes.randomRangeInt)(0, 233280);

      this._assembler._setNewParticle(particle);
    } // end of particles forLoop.

  } // initialize particle system as though it had already completed a full cycle.
  ;

  _proto._prewarmSystem = function _prewarmSystem() {
    this.startDelay.mode = _curveRange.Mode.Constant; // clear startDelay.

    this.startDelay.constant = 0;
    var dt = 1.0; // should use varying value?

    var cnt = this.duration / dt;

    for (var i = 0; i < cnt; ++i) {
      this._time += dt;

      this._emit(dt);

      this._assembler._updateParticles(dt);
    }
  } // internal function
  ;

  _proto._emit = function _emit(dt) {
    // emit particles.
    var startDelay = this.startDelay.evaluate(0, 1);

    if (this._time > startDelay) {
      if (this._time > this.duration + startDelay) {
        // this._time = startDelay; // delay will not be applied from the second loop.(Unity)
        // this._emitRateTimeCounter = 0.0;
        // this._emitRateDistanceCounter = 0.0;
        if (!this.loop) {
          this._isEmitting = false;
          return;
        }
      } // emit by rateOverTime


      this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;

      if (this._emitRateTimeCounter > 1 && this._isEmitting) {
        var emitNum = Math.floor(this._emitRateTimeCounter);
        this._emitRateTimeCounter -= emitNum;
        this.emit(emitNum, dt);
      } // emit by rateOverDistance


      this.node.getWorldPosition(this._curWPos);

      var distance = _valueTypes.Vec3.distance(this._curWPos, this._oldWPos);

      _valueTypes.Vec3.copy(this._oldWPos, this._curWPos);

      this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

      if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
        var _emitNum = Math.floor(this._emitRateDistanceCounter);

        this._emitRateDistanceCounter -= _emitNum;
        this.emit(_emitNum, dt);
      } // bursts


      for (var _iterator = _createForOfIteratorHelperLoose(this.bursts), _step; !(_step = _iterator()).done;) {
        var burst = _step.value;
        burst.update(this, dt);
      }
    }
  };

  _proto._activateMaterial = function _activateMaterial() {};

  _proto._resetPosition = function _resetPosition() {
    this.node.getWorldPosition(this._oldWPos);

    _valueTypes.Vec3.copy(this._curWPos, this._oldWPos);
  };

  _proto.addSubEmitter = function addSubEmitter(subEmitter) {
    this._subEmitters.push(subEmitter);
  };

  _proto.removeSubEmitter = function removeSubEmitter(idx) {
    this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
  };

  _proto.addBurst = function addBurst(burst) {
    this.bursts.push(burst);
  };

  _proto.removeBurst = function removeBurst(idx) {
    this.bursts.splice(this.bursts.indexOf(idx), 1);
  };

  _proto._checkBacth = function _checkBacth() {};

  _createClass(ParticleSystem3D, [{
    key: "capacity",
    get:
    /**
     * !#en The run time of particle.
     * !#zh 粒子系统运行时间
     * @property {Number} duration
     */

    /**
     * !#en The maximum number of particles that a particle system can generate.
     * !#zh 粒子系统能生成的最大粒子数量
     * @property {Number} capacity
     */
    function get() {
      return this._capacity;
    },
    set: function set(val) {
      this._capacity = val;

      if (this._assembler) {
        this._assembler.setCapacity(this._capacity);
      }
    }
    /**
     * !#en Whether the particle system loops.
     * !#zh 粒子系统是否循环播放
     * @property {Boolean} loop
     */

  }, {
    key: "prewarm",
    get:
    /**
     * !#en When selected, the particle system will start playing after one round has been played (only effective when loop is enabled).
     * !#zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）
     * @property {Boolean} prewarm
     */
    function get() {
      return this._prewarm;
    },
    set: function set(val) {
      if (val === true && this.loop === false) {// console.warn('prewarm only works if loop is also enabled.');
      }

      this._prewarm = val;
    }
  }, {
    key: "simulationSpace",
    get:
    /**
     * !#en The coordinate system in which the particle system is located.<br>
     * World coordinates (does not change when the position of other objects changes)<br>
     * Local coordinates (moving as the position of the parent node changes)<br>
     * Custom coordinates (moving with the position of a custom node)
     * !#zh 选择粒子系统所在的坐标系<br>
     * 世界坐标（不随其他物体位置改变而变换）<br>
     * 局部坐标（跟随父节点位置改变而移动）<br>
     * 自定坐标（跟随自定义节点的位置改变而移动）
     * @property {Space} simulationSpace
     */
    function get() {
      return this._simulationSpace;
    },
    set: function set(val) {
      if (val !== this._simulationSpace) {
        this._simulationSpace = val;

        this._assembler._updateMaterialParams();

        this._assembler._updateTrailMaterial();
      }
    }
    /**
     * !#en Controlling the update speed of the entire particle system.
     * !#zh 控制整个粒子系统的更新速度。
     * @property {Number} simulationSpeed
     */

  }, {
    key: "materials",
    get: function get() {
      // if we don't create an array copy, the editor will modify the original array directly.
      return this._materials;
    },
    set: function set(val) {
      this._materials = val;

      this._activateMaterial();
    }
  }, {
    key: "shapeModule",
    get:
    /**
     * !#en Particle emitter module
     * !#zh 粒子发射器模块
     * @property {ShapeModule} shapeModule
     */
    function get() {
      return this._shapeModule;
    },
    set: function set(val) {
      this._shapeModule = val;

      this._shapeModule.onInit(this);
    }
  }, {
    key: "colorOverLifetimeModule",
    get:
    /**
     * !#en Color control module
     * !#zh 颜色控制模块
     * @property {ColorOverLifetimeModule} colorOverLifetimeModule
     */
    function get() {
      return this._colorOverLifetimeModule;
    },
    set: function set(val) {
      this._colorOverLifetimeModule = val;
    }
  }, {
    key: "sizeOvertimeModule",
    get:
    /**
     * !#en Particle size module
     * !#zh 粒子大小模块
     * @property {SizeOvertimeModule} sizeOvertimeModule
     */
    function get() {
      return this._sizeOvertimeModule;
    },
    set: function set(val) {
      this._sizeOvertimeModule = val;
    }
  }, {
    key: "velocityOvertimeModule",
    get:
    /**
     * !#en Particle speed module
     * !#zh 粒子速度模块
     * @property {VelocityOvertimeModule} velocityOvertimeModule
     */
    function get() {
      return this._velocityOvertimeModule;
    },
    set: function set(val) {
      this._velocityOvertimeModule = val;
    }
  }, {
    key: "forceOvertimeModule",
    get:
    /**
     * !#en Particle acceleration module
     * !#zh 粒子加速度模块
     * @property {ForceOvertimeModule} forceOvertimeModule
     */
    function get() {
      return this._forceOvertimeModule;
    },
    set: function set(val) {
      this._forceOvertimeModule = val;
    }
  }, {
    key: "limitVelocityOvertimeModule",
    get:
    /**
     * !#en Particle limit speed module (only CPU particles are supported)
     * !#zh 粒子限制速度模块（只支持 CPU 粒子）
     * @property {LimitVelocityOvertimeModule} limitVelocityOvertimeModule
     */
    function get() {
      return this._limitVelocityOvertimeModule;
    },
    set: function set(val) {
      this._limitVelocityOvertimeModule = val;
    }
  }, {
    key: "rotationOvertimeModule",
    get:
    /**
     * !#en Particle rotation module
     * !#zh 粒子旋转模块
     * @property {RotationOvertimeModule} rotationOvertimeModule
     */
    function get() {
      return this._rotationOvertimeModule;
    },
    set: function set(val) {
      this._rotationOvertimeModule = val;
    }
  }, {
    key: "textureAnimationModule",
    get:
    /**
     * !#en Texture Animation Module
     * !#zh 贴图动画模块
     * @property {TextureAnimationModule} textureAnimationModule
     */
    function get() {
      return this._textureAnimationModule;
    },
    set: function set(val) {
      this._textureAnimationModule = val;

      this._textureAnimationModule.onInit(this);
    }
  }, {
    key: "trailModule",
    get:
    /**
     * !#en Particle Trajectory Module
     * !#zh 粒子轨迹模块
     * @property {TrailModule} trailModule
     */
    function get() {
      return this._trailModule;
    },
    set: function set(val) {
      this._trailModule = val;

      this._trailModule.onInit(this);
    }
  }, {
    key: "renderMode",
    get:
    /**
     * !#en Particle generation mode
     * !#zh 设定粒子生成模式
     * @property {RenderMode} renderMode
     */
    function get() {
      return this._renderMode;
    },
    set: function set(val) {
      if (this._renderMode === val) {
        return;
      }

      this._renderMode = val;

      this._assembler._setVertexAttrib();

      this._assembler._updateModel();

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "velocityScale",
    get:
    /**
     * !#en When the particle generation mode is StrecthedBillboard, in the direction of movement of the particles is stretched by velocity magnitude
     * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按速度大小进行拉伸
     * @property {Number} velocityScale
     */
    function get() {
      return this._velocityScale;
    },
    set: function set(val) {
      this._velocityScale = val;

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "lengthScale",
    get:
    /**
     * !#en When the particle generation method is StrecthedBillboard, the particles are stretched according to the particle size in the direction of motion
     * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按粒子大小进行拉伸
     * @property {Number} lengthScale
     */
    function get() {
      return this._lengthScale;
    },
    set: function set(val) {
      this._lengthScale = val;

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "mesh",
    get:
    /**
     * !#en Particle model
     * !#zh 粒子模型
     * @property {Mesh} mesh
     */
    function get() {
      return this._mesh;
    },
    set: function set(val) {
      this._mesh = val;

      this._assembler._updateModel();
    }
    /**
     * !#en Particle material
     * !#zh 粒子材质
     * @property {Material} particleMaterial
     */

  }, {
    key: "particleMaterial",
    get: function get() {
      return this.getMaterial(0);
    },
    set: function set(val) {
      this.setMaterial(0, val);

      this._onMaterialModified(0, val);
    }
    /**
     * !#en Particle trail material
     * !#zh 粒子轨迹材质
     * @property {Material} trailMaterial
     */

  }, {
    key: "trailMaterial",
    get: function get() {
      return this.getMaterial(1);
    },
    set: function set(val) {
      this.setMaterial(1, val);

      this._onMaterialModified(1, val);
    }
  }, {
    key: "isPlaying",
    get: function get() {
      return this._isPlaying;
    }
  }, {
    key: "isPaused",
    get: function get() {
      return this._isPaused;
    }
  }, {
    key: "isStopped",
    get: function get() {
      return this._isStopped;
    }
  }, {
    key: "isEmitting",
    get: function get() {
      return this._isEmitting;
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
  }]);

  return ParticleSystem3D;
}(RenderComponent), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5.0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_capacity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 100;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "capacity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "capacity"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loop", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_prewarm", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "prewarm", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "prewarm"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_simulationSpace", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "simulationSpace", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "simulationSpace"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "simulationSpeed", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startDelay", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startLifetime", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startColor", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpace", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startSize", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "startSpeed", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "startRotation", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "gravityModifier", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "rateOverTime", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "rateOverDistance", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "bursts", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "materials", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "materials"), _class2.prototype), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_shapeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _shapeModule["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeModule", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeModule"), _class2.prototype), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "_colorOverLifetimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _colorOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "colorOverLifetimeModule", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "colorOverLifetimeModule"), _class2.prototype), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "_sizeOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _sizeOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sizeOvertimeModule", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeOvertimeModule"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_velocityOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _velocityOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "velocityOvertimeModule", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityOvertimeModule"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_forceOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _forceOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "forceOvertimeModule", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "forceOvertimeModule"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_limitVelocityOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _limitVelocityOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "limitVelocityOvertimeModule", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "limitVelocityOvertimeModule"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_rotationOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _rotationOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotationOvertimeModule", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "rotationOvertimeModule"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_textureAnimationModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _textureAnimation["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "textureAnimationModule", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "textureAnimationModule"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_trailModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _trail["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "trailModule", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "trailModule"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_renderMode", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.RenderMode.Billboard;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "renderMode", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "renderMode"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_velocityScale", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "velocityScale", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityScale"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_lengthScale", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "lengthScale", [_dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "lengthScale"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "_mesh", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "mesh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "particleMaterial", [_dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "particleMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trailMaterial", [_dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "trailMaterial"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports["default"] = ParticleSystem3D;
CC_EDITOR && (ParticleSystem3D.prototype._onBeforeSerialize = function (props) {
  var _this = this;

  return props.filter(function (p) {
    return !_module_props.includes(p) || _this[p].enable;
  });
});
cc.ParticleSystem3D = ParticleSystem3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxccGFydGljbGUtc3lzdGVtLTNkLnRzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJjY2NsYXNzIiwibWVudSIsInByb3BlcnR5IiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJleGVjdXRpb25PcmRlciIsIlJlbmRlckNvbXBvbmVudCIsIl93b3JsZF9tYXQiLCJNYXQ0IiwiX21vZHVsZV9wcm9wcyIsIkNDX0VESVRPUiIsIlBhcnRpY2xlU3lzdGVtM0QiLCJhbmltYXRhYmxlIiwidHlwZSIsIlNwYWNlIiwiQ3VydmVSYW5nZSIsIkdyYWRpZW50UmFuZ2UiLCJyYW5nZSIsInJhZGlhbiIsIkJ1cnN0IiwiTWF0ZXJpYWwiLCJkaXNwbGF5TmFtZSIsInZpc2libGUiLCJvdmVycmlkZSIsIlNoYXBlTW9kdWxlIiwiQ29sb3JPdmVyTGlmZXRpbWVNb2R1bGUiLCJTaXplT3ZlcnRpbWVNb2R1bGUiLCJWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlIiwiRm9yY2VPdmVydGltZU1vZHVsZSIsIkxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsIlJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUiLCJUZXh0dXJlQW5pbWF0aW9uTW9kdWxlIiwiVHJhaWxNb2R1bGUiLCJSZW5kZXJNb2RlIiwiTWVzaCIsIl9pc1BsYXlpbmciLCJfaXNQYXVzZWQiLCJfaXNTdG9wcGVkIiwiX2lzRW1pdHRpbmciLCJfdGltZSIsIl9lbWl0UmF0ZVRpbWVDb3VudGVyIiwiX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyIiwiX29sZFdQb3MiLCJfY3VyV1BvcyIsIl9jdXN0b21EYXRhMSIsIl9jdXN0b21EYXRhMiIsIl9zdWJFbWl0dGVycyIsInJhdGVPdmVyVGltZSIsImNvbnN0YW50Iiwic3RhcnRMaWZldGltZSIsInN0YXJ0U2l6ZSIsInN0YXJ0U3BlZWQiLCJWZWMzIiwiVmVjMiIsIm9uTG9hZCIsIl9hc3NlbWJsZXIiLCJvbkluaXQiLCJzaGFwZU1vZHVsZSIsInRyYWlsTW9kdWxlIiwidGV4dHVyZUFuaW1hdGlvbk1vZHVsZSIsIl9yZXNldFBvc2l0aW9uIiwiX29uTWF0ZXJpYWxNb2RpZmllZCIsImluZGV4IiwibWF0ZXJpYWwiLCJfb25SZWJ1aWxkUFNPIiwicGxheSIsIl9wcmV3YXJtIiwiX3ByZXdhcm1TeXN0ZW0iLCJwYXVzZSIsImNvbnNvbGUiLCJ3YXJuIiwic3RvcCIsImNsZWFyIiwiZW5hYmxlZEluSGllcmFyY2h5IiwiZ2V0UGFydGljbGVDb3VudCIsInNldEN1c3RvbURhdGExIiwieCIsInkiLCJzZXQiLCJzZXRDdXN0b21EYXRhMiIsIm9uRGVzdHJveSIsImRlc3Ryb3kiLCJvbkVuYWJsZSIsInBsYXlPbkF3YWtlIiwib25EaXNhYmxlIiwidXBkYXRlIiwiZHQiLCJzY2FsZWREZWx0YVRpbWUiLCJzaW11bGF0aW9uU3BlZWQiLCJfZW1pdCIsIl91cGRhdGVQYXJ0aWNsZXMiLCJ1cGRhdGVQYXJ0aWNsZUJ1ZmZlciIsImVuYWJsZSIsInVwZGF0ZVRyYWlsQnVmZmVyIiwiZW1pdCIsImNvdW50IiwiX3NpbXVsYXRpb25TcGFjZSIsIldvcmxkIiwibm9kZSIsImdldFdvcmxkTWF0cml4IiwiaSIsInBhcnRpY2xlIiwiX2dldEZyZWVQYXJ0aWNsZSIsInJhbmQiLCJJTlRfTUFYIiwicG9zaXRpb24iLCJjb3B5IiwidmVsb2NpdHkiLCJwYXJ0aWNsZUVtaXRaQXhpcyIsImluaXQiLCJzY2FsZSIsImV2YWx1YXRlIiwiZHVyYXRpb24iLCJMb2NhbCIsInRyYW5zZm9ybU1hdDQiLCJ3b3JsZFJvdCIsIlF1YXQiLCJnZXRXb3JsZFJvdGF0aW9uIiwidHJhbnNmb3JtUXVhdCIsIkN1c3RvbSIsInVsdGltYXRlVmVsb2NpdHkiLCJyb3RhdGlvbiIsInN0YXJ0Um90YXRpb24iLCJzaXplIiwic3RhcnRDb2xvciIsImNvbG9yIiwicmVtYWluaW5nTGlmZXRpbWUiLCJyYW5kb21TZWVkIiwiX3NldE5ld1BhcnRpY2xlIiwic3RhcnREZWxheSIsIm1vZGUiLCJNb2RlIiwiQ29uc3RhbnQiLCJjbnQiLCJsb29wIiwiZW1pdE51bSIsIk1hdGgiLCJmbG9vciIsImdldFdvcmxkUG9zaXRpb24iLCJkaXN0YW5jZSIsInJhdGVPdmVyRGlzdGFuY2UiLCJidXJzdHMiLCJidXJzdCIsIl9hY3RpdmF0ZU1hdGVyaWFsIiwiYWRkU3ViRW1pdHRlciIsInN1YkVtaXR0ZXIiLCJwdXNoIiwicmVtb3ZlU3ViRW1pdHRlciIsImlkeCIsInNwbGljZSIsImluZGV4T2YiLCJhZGRCdXJzdCIsInJlbW92ZUJ1cnN0IiwiX2NoZWNrQmFjdGgiLCJfY2FwYWNpdHkiLCJ2YWwiLCJzZXRDYXBhY2l0eSIsIl91cGRhdGVNYXRlcmlhbFBhcmFtcyIsIl91cGRhdGVUcmFpbE1hdGVyaWFsIiwiX21hdGVyaWFscyIsIl9zaGFwZU1vZHVsZSIsIl9jb2xvck92ZXJMaWZldGltZU1vZHVsZSIsIl9zaXplT3ZlcnRpbWVNb2R1bGUiLCJfdmVsb2NpdHlPdmVydGltZU1vZHVsZSIsIl9mb3JjZU92ZXJ0aW1lTW9kdWxlIiwiX2xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsIl9yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlIiwiX3RleHR1cmVBbmltYXRpb25Nb2R1bGUiLCJfdHJhaWxNb2R1bGUiLCJfcmVuZGVyTW9kZSIsIl9zZXRWZXJ0ZXhBdHRyaWIiLCJfdXBkYXRlTW9kZWwiLCJfdmVsb2NpdHlTY2FsZSIsIl9sZW5ndGhTY2FsZSIsIl9tZXNoIiwiZ2V0TWF0ZXJpYWwiLCJzZXRNYXRlcmlhbCIsIkFycmF5IiwiQmlsbGJvYXJkIiwicHJvdG90eXBlIiwiX29uQmVmb3JlU2VyaWFsaXplIiwicHJvcHMiLCJmaWx0ZXIiLCJwIiwiaW5jbHVkZXMiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFFc0VBLE9BQU8sQ0FBQyxpQ0FBRDtJQUFyRUMsbUJBQUFBO0lBQVNDLGdCQUFBQTtJQUFNQyxvQkFBQUE7SUFBVUMsNkJBQUFBO0lBQW1CQywwQkFBQUE7O0FBQ3BELElBQU1DLGVBQWUsR0FBR04sT0FBTyxDQUFDLG9DQUFELENBQS9COztBQUVBLElBQU1PLFVBQVUsR0FBRyxJQUFJQyxnQkFBSixFQUFuQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUdDLFNBQVMsSUFBSSxDQUMvQiwwQkFEK0IsRUFFL0IsY0FGK0IsRUFHL0IscUJBSCtCLEVBSS9CLHlCQUorQixFQUsvQixzQkFMK0IsRUFNL0IsOEJBTitCLEVBTy9CLHlCQVArQixFQVEvQix5QkFSK0IsRUFTL0IsY0FUK0IsQ0FBbkM7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztJQUtxQkMsMkJBSnBCVixPQUFPLENBQUMscUJBQUQsV0FDUEMsSUFBSSxDQUFDLHFEQUFELFdBQ0pHLGNBQWMsQ0FBQyxFQUFELFdBMkNWRixRQUFRLENBQUM7QUFDTlMsRUFBQUEsVUFBVSxFQUFFO0FBRE4sQ0FBRCxXQVlSVCxRQUFRLENBQUM7QUFDTlMsRUFBQUEsVUFBVSxFQUFFO0FBRE4sQ0FBRCxXQTJCUlQsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRUMsV0FEQTtBQUVORixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFdBNkJSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFRTtBQURBLENBQUQsV0FVUlosUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRUU7QUFEQSxDQUFELFdBVVJaLFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVHO0FBREEsQ0FBRCxZQVVSYixRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQUQsWUFVUlgsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRUU7QUFEQSxDQUFELFlBVVJaLFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5FLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUw7QUFGRCxDQUFELFlBV1JkLFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5FLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FGRDtBQUdOQyxFQUFBQSxNQUFNLEVBQUU7QUFIRixDQUFELFlBWVJmLFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5FLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUw7QUFGRCxDQUFELFlBWVJkLFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVFO0FBREEsQ0FBRCxZQVVSWixRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFRTtBQURBLENBQUQsWUFVUlosUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRSxDQUFDTSxpQkFBRCxDQURBO0FBRU5QLEVBQUFBLFVBQVUsRUFBRTtBQUZOLENBQUQsWUFNUlQsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRSxDQUFDTyxzQkFBRCxDQURBO0FBRU5DLEVBQUFBLFdBQVcsRUFBRSxXQUZQO0FBR05DLEVBQUFBLE9BQU8sRUFBRSxLQUhIO0FBSU5DLEVBQUFBLFFBQVEsRUFBRTtBQUpKLENBQUQsWUF3QlJwQixRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFVyx1QkFEQTtBQUVOWixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBb0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFWSx5QkFEQTtBQUVOYixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBbUJSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFYSx3QkFEQTtBQUVOZCxFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBa0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFYyw0QkFEQTtBQUVOZixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBbUJSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFZSx5QkFEQTtBQUVOaEIsRUFBQUEsVUFBVSxFQUFFO0FBRk4sQ0FBRCxZQWtCUlQsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRWdCLGlDQURBO0FBRU5qQixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBa0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFaUIsNEJBREE7QUFFTmxCLEVBQUFBLFVBQVUsRUFBRTtBQUZOLENBQUQsWUFrQlJULFFBQVEsQ0FBQztBQUNOVSxFQUFBQSxJQUFJLEVBQUVrQiw0QkFEQTtBQUVObkIsRUFBQUEsVUFBVSxFQUFFO0FBRk4sQ0FBRCxZQW1CUlQsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRW1CLGlCQURBO0FBRU5wQixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBb0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFb0IsZ0JBREE7QUFFTnJCLEVBQUFBLFVBQVUsRUFBRTtBQUZOLENBQUQsWUEwQlJULFFBQVEsQ0FBQztBQUNOUyxFQUFBQSxVQUFVLEVBQUU7QUFETixDQUFELFlBbUJSVCxRQUFRLENBQUM7QUFDTlMsRUFBQUEsVUFBVSxFQUFFO0FBRE4sQ0FBRCxZQW9CUlQsUUFBUSxDQUFDO0FBQ05VLEVBQUFBLElBQUksRUFBRXFCLGtCQURBO0FBRU50QixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBa0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFTyxzQkFEQTtBQUVOUixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELFlBa0JSVCxRQUFRLENBQUM7QUFDTlUsRUFBQUEsSUFBSSxFQUFFTyxzQkFEQTtBQUVOUixFQUFBQSxVQUFVLEVBQUU7QUFGTixDQUFELCtDQW5nQlpSOzs7QUEyaEJpQjtBQUVkLDhCQUFlO0FBQUE7O0FBQ1g7O0FBRFc7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsV0FiZitCLFVBYWU7QUFBQSxXQVpmQyxTQVllO0FBQUEsV0FYZkMsVUFXZTtBQUFBLFdBVmZDLFdBVWU7QUFBQSxXQVRmQyxLQVNlO0FBQUEsV0FSZkMsb0JBUWU7QUFBQSxXQVBmQyx3QkFPZTtBQUFBLFdBTmZDLFFBTWU7QUFBQSxXQUxmQyxRQUtlO0FBQUEsV0FKZkMsWUFJZTtBQUFBLFdBSGZDLFlBR2U7QUFBQSxXQUZmQyxZQUVlO0FBR1gsV0FBS0MsWUFBTCxDQUFrQkMsUUFBbEIsR0FBNkIsRUFBN0I7QUFDQSxXQUFLQyxhQUFMLENBQW1CRCxRQUFuQixHQUE4QixDQUE5QjtBQUNBLFdBQUtFLFNBQUwsQ0FBZUYsUUFBZixHQUEwQixDQUExQjtBQUNBLFdBQUtHLFVBQUwsQ0FBZ0JILFFBQWhCLEdBQTJCLENBQTNCLENBTlcsQ0FRWDs7QUFDQSxXQUFLYixVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBRUEsV0FBS0MsS0FBTCxHQUFhLEdBQWIsQ0FkVyxDQWNROztBQUNuQixXQUFLQyxvQkFBTCxHQUE0QixHQUE1QjtBQUNBLFdBQUtDLHdCQUFMLEdBQWdDLEdBQWhDO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixJQUFJVSxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFoQjtBQUNBLFdBQUtULFFBQUwsR0FBZ0IsSUFBSVMsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBaEI7QUFFQSxXQUFLUixZQUFMLEdBQW9CLElBQUlTLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBcEI7QUFDQSxXQUFLUixZQUFMLEdBQW9CLElBQUlRLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosQ0FBcEI7QUFFQSxXQUFLUCxZQUFMLEdBQW9CLEVBQXBCLENBdkJXLENBdUJhOztBQXZCYjtBQXdCZDs7OztTQUVEUSxTQUFBLGtCQUFVO0FBQ04sU0FBS0MsVUFBTCxDQUFnQkMsTUFBaEIsQ0FBdUIsSUFBdkI7O0FBQ0EsU0FBS0MsV0FBTCxDQUFpQkQsTUFBakIsQ0FBd0IsSUFBeEI7QUFDQSxTQUFLRSxXQUFMLENBQWlCRixNQUFqQixDQUF3QixJQUF4QjtBQUNBLFNBQUtHLHNCQUFMLENBQTRCSCxNQUE1QixDQUFtQyxJQUFuQzs7QUFFQSxTQUFLSSxjQUFMLEdBTk0sQ0FRTjs7QUFDSDs7U0FFREMsc0JBQUEsNkJBQXFCQyxLQUFyQixFQUE0QkMsUUFBNUIsRUFBc0M7QUFDbEMsU0FBS1IsVUFBTCxDQUFnQk0sbUJBQWhCLENBQW9DQyxLQUFwQyxFQUEyQ0MsUUFBM0M7QUFDSDs7U0FFREMsZ0JBQUEsdUJBQWVGLEtBQWYsRUFBc0JDLFFBQXRCLEVBQWdDO0FBQzVCLFNBQUtSLFVBQUwsQ0FBZ0JTLGFBQWhCLENBQThCRixLQUE5QixFQUFxQ0MsUUFBckM7QUFDSCxJQUVEO0FBQ0E7QUFFQTs7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSUUsT0FBQSxnQkFBUTtBQUNKLFFBQUksS0FBSzdCLFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxHQUFpQixLQUFqQjtBQUNIOztBQUNELFFBQUksS0FBS0MsVUFBVCxFQUFxQjtBQUNqQixXQUFLQSxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7O0FBRUQsU0FBS0YsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtHLFdBQUwsR0FBbUIsSUFBbkI7O0FBRUEsU0FBS3NCLGNBQUwsR0FYSSxDQWFKOzs7QUFDQSxRQUFJLEtBQUtNLFFBQVQsRUFBbUI7QUFDZixXQUFLQyxjQUFMO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7OztTQUNJQyxRQUFBLGlCQUFTO0FBQ0wsUUFBSSxLQUFLL0IsVUFBVCxFQUFxQjtBQUNqQmdDLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLDhDQUFiO0FBQ0E7QUFDSDs7QUFDRCxRQUFJLEtBQUtuQyxVQUFULEVBQXFCO0FBQ2pCLFdBQUtBLFVBQUwsR0FBa0IsS0FBbEI7QUFDSDs7QUFFRCxTQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSW1DLE9BQUEsZ0JBQVE7QUFDSixRQUFJLEtBQUtwQyxVQUFMLElBQW1CLEtBQUtDLFNBQTVCLEVBQXVDO0FBQ25DLFdBQUtvQyxLQUFMO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLckMsVUFBVCxFQUFxQjtBQUNqQixXQUFLQSxVQUFMLEdBQWtCLEtBQWxCO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLQyxTQUFULEVBQW9CO0FBQ2hCLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDSDs7QUFFRCxTQUFLRyxLQUFMLEdBQWEsR0FBYjtBQUNBLFNBQUtDLG9CQUFMLEdBQTRCLEdBQTVCO0FBQ0EsU0FBS0Msd0JBQUwsR0FBZ0MsR0FBaEM7QUFFQSxTQUFLSixVQUFMLEdBQWtCLElBQWxCO0FBQ0gsSUFFRDs7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7U0FDSW1DLFFBQUEsaUJBQVM7QUFDTCxRQUFJLEtBQUtDLGtCQUFULEVBQTZCO0FBQ3pCLFdBQUtsQixVQUFMLENBQWdCaUIsS0FBaEI7O0FBQ0EsV0FBS2QsV0FBTCxDQUFpQmMsS0FBakI7QUFDSDtBQUNKOztTQUVERSxtQkFBQSw0QkFBb0I7QUFDaEIsV0FBTyxLQUFLbkIsVUFBTCxDQUFnQm1CLGdCQUFoQixFQUFQO0FBQ0g7O1NBRURDLGlCQUFBLHdCQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCO0FBQ2xCeEIscUJBQUt5QixHQUFMLENBQVMsS0FBS2xDLFlBQWQsRUFBNEJnQyxDQUE1QixFQUErQkMsQ0FBL0I7QUFDSDs7U0FFREUsaUJBQUEsd0JBQWdCSCxDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0I7QUFDbEJ4QixxQkFBS3lCLEdBQUwsQ0FBUyxLQUFLakMsWUFBZCxFQUE0QitCLENBQTVCLEVBQStCQyxDQUEvQjtBQUNIOztTQUVERyxZQUFBLHFCQUFhO0FBQ1Q7QUFDQSxTQUFLekIsVUFBTCxDQUFnQnlCLFNBQWhCOztBQUNBLFNBQUt0QixXQUFMLENBQWlCdUIsT0FBakI7QUFDSDs7U0FFREMsV0FBQSxvQkFBWTtBQUNSLCtCQUFNQSxRQUFOOztBQUNBLFFBQUksS0FBS0MsV0FBVCxFQUFzQjtBQUNsQixXQUFLbEIsSUFBTDtBQUNIOztBQUNELFNBQUtWLFVBQUwsQ0FBZ0IyQixRQUFoQjs7QUFDQSxTQUFLeEIsV0FBTCxDQUFpQndCLFFBQWpCO0FBQ0g7O1NBRURFLFlBQUEscUJBQWE7QUFDVCwrQkFBTUEsU0FBTjs7QUFDQSxTQUFLN0IsVUFBTCxDQUFnQjZCLFNBQWhCOztBQUNBLFNBQUsxQixXQUFMLENBQWlCMEIsU0FBakI7QUFDSDs7U0FFREMsU0FBQSxnQkFBUUMsRUFBUixFQUFZO0FBQ1IsUUFBTUMsZUFBZSxHQUFHRCxFQUFFLEdBQUcsS0FBS0UsZUFBbEM7O0FBQ0EsUUFBSSxLQUFLckQsVUFBVCxFQUFxQjtBQUNqQixXQUFLSSxLQUFMLElBQWNnRCxlQUFkLENBRGlCLENBR2pCOztBQUNBLFdBQUtFLEtBQUwsQ0FBV0YsZUFBWCxFQUppQixDQU1qQjs7O0FBQ0EsVUFBSSxLQUFLaEMsVUFBTCxDQUFnQm1DLGdCQUFoQixDQUFpQ0gsZUFBakMsTUFBc0QsQ0FBdEQsSUFBMkQsQ0FBQyxLQUFLakQsV0FBckUsRUFBa0Y7QUFDOUUsYUFBS2lDLElBQUw7QUFDSCxPQVRnQixDQVdqQjs7O0FBQ0EsV0FBS2hCLFVBQUwsQ0FBZ0JvQyxvQkFBaEIsR0FaaUIsQ0FjakI7OztBQUNBLFVBQUksS0FBS2pDLFdBQUwsQ0FBaUJrQyxNQUFyQixFQUE2QjtBQUN6QixhQUFLbEMsV0FBTCxDQUFpQm1DLGlCQUFqQjtBQUNIO0FBQ0o7QUFDSjs7U0FFREMsT0FBQSxjQUFNQyxLQUFOLEVBQWFULEVBQWIsRUFBaUI7QUFFYixRQUFJLEtBQUtVLGdCQUFMLEtBQTBCbEYsWUFBTW1GLEtBQXBDLEVBQTJDO0FBQ3ZDLFdBQUtDLElBQUwsQ0FBVUMsY0FBVixDQUF5QjVGLFVBQXpCO0FBQ0g7O0FBRUQsU0FBSyxJQUFJNkYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0wsS0FBcEIsRUFBMkIsRUFBRUssQ0FBN0IsRUFBZ0M7QUFDNUIsVUFBTUMsUUFBUSxHQUFHLEtBQUs5QyxVQUFMLENBQWdCK0MsZ0JBQWhCLEVBQWpCOztBQUNBLFVBQUlELFFBQVEsS0FBSyxJQUFqQixFQUF1QjtBQUNuQjtBQUNIOztBQUNELFVBQU1FLElBQUksR0FBRyw4QkFBYSxnQ0FBZSxDQUFmLEVBQWtCQyxjQUFsQixDQUFiLENBQWI7O0FBRUEsVUFBSSxLQUFLL0MsV0FBTCxDQUFpQm1DLE1BQXJCLEVBQTZCO0FBQ3pCLGFBQUtuQyxXQUFMLENBQWlCcUMsSUFBakIsQ0FBc0JPLFFBQXRCO0FBQ0gsT0FGRCxNQUdLO0FBQ0RqRCx5QkFBSzBCLEdBQUwsQ0FBU3VCLFFBQVEsQ0FBQ0ksUUFBbEIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEM7O0FBQ0FyRCx5QkFBS3NELElBQUwsQ0FBVUwsUUFBUSxDQUFDTSxRQUFuQixFQUE2QkMsMENBQTdCO0FBQ0g7O0FBRUQsVUFBSSxLQUFLakQsc0JBQUwsQ0FBNEJpQyxNQUFoQyxFQUF3QztBQUNwQyxhQUFLakMsc0JBQUwsQ0FBNEJrRCxJQUE1QixDQUFpQ1IsUUFBakM7QUFDSDs7QUFFRGpELHVCQUFLMEQsS0FBTCxDQUFXVCxRQUFRLENBQUNNLFFBQXBCLEVBQThCTixRQUFRLENBQUNNLFFBQXZDLEVBQWlELEtBQUt4RCxVQUFMLENBQWdCNEQsUUFBaEIsQ0FBeUIsS0FBS3hFLEtBQUwsR0FBYSxLQUFLeUUsUUFBM0MsRUFBcURULElBQXJELENBQWpEOztBQUVBLGNBQVEsS0FBS1AsZ0JBQWI7QUFDSSxhQUFLbEYsWUFBTW1HLEtBQVg7QUFDSTs7QUFDSixhQUFLbkcsWUFBTW1GLEtBQVg7QUFDSTdDLDJCQUFLOEQsYUFBTCxDQUFtQmIsUUFBUSxDQUFDSSxRQUE1QixFQUFzQ0osUUFBUSxDQUFDSSxRQUEvQyxFQUF5RGxHLFVBQXpEOztBQUNBLGNBQU00RyxRQUFRLEdBQUcsSUFBSUMsZ0JBQUosRUFBakI7QUFDQSxlQUFLbEIsSUFBTCxDQUFVbUIsZ0JBQVYsQ0FBMkJGLFFBQTNCOztBQUNBL0QsMkJBQUtrRSxhQUFMLENBQW1CakIsUUFBUSxDQUFDTSxRQUE1QixFQUFzQ04sUUFBUSxDQUFDTSxRQUEvQyxFQUF5RFEsUUFBekQ7O0FBQ0E7O0FBQ0osYUFBS3JHLFlBQU15RyxNQUFYO0FBQ0k7QUFDQTtBQVhSOztBQWFBbkUsdUJBQUtzRCxJQUFMLENBQVVMLFFBQVEsQ0FBQ21CLGdCQUFuQixFQUFxQ25CLFFBQVEsQ0FBQ00sUUFBOUMsRUFsQzRCLENBbUM1Qjs7O0FBQ0F2RCx1QkFBSzBCLEdBQUwsQ0FBU3VCLFFBQVEsQ0FBQ29CLFFBQWxCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLEtBQUtDLGFBQUwsQ0FBbUJYLFFBQW5CLENBQTRCLEtBQUt4RSxLQUFMLEdBQWEsS0FBS3lFLFFBQTlDLEVBQXdEVCxJQUF4RCxDQUFsQyxFQXBDNEIsQ0FzQzVCOzs7QUFDQW5ELHVCQUFLMEIsR0FBTCxDQUFTdUIsUUFBUSxDQUFDbkQsU0FBbEIsRUFBNkIsS0FBS0EsU0FBTCxDQUFlNkQsUUFBZixDQUF3QixLQUFLeEUsS0FBTCxHQUFhLEtBQUt5RSxRQUExQyxFQUFvRFQsSUFBcEQsQ0FBN0IsRUFBd0YsQ0FBeEYsRUFBMkYsQ0FBM0Y7O0FBQ0FGLE1BQUFBLFFBQVEsQ0FBQ25ELFNBQVQsQ0FBbUIyQixDQUFuQixHQUF1QndCLFFBQVEsQ0FBQ25ELFNBQVQsQ0FBbUIwQixDQUExQzs7QUFDQXhCLHVCQUFLc0QsSUFBTCxDQUFVTCxRQUFRLENBQUNzQixJQUFuQixFQUF5QnRCLFFBQVEsQ0FBQ25ELFNBQWxDLEVBekM0QixDQTJDNUI7OztBQUNBbUQsTUFBQUEsUUFBUSxDQUFDdUIsVUFBVCxDQUFvQjlDLEdBQXBCLENBQXdCLEtBQUs4QyxVQUFMLENBQWdCYixRQUFoQixDQUF5QixLQUFLeEUsS0FBTCxHQUFhLEtBQUt5RSxRQUEzQyxFQUFxRFQsSUFBckQsQ0FBeEI7QUFDQUYsTUFBQUEsUUFBUSxDQUFDd0IsS0FBVCxDQUFlL0MsR0FBZixDQUFtQnVCLFFBQVEsQ0FBQ3VCLFVBQTVCLEVBN0M0QixDQStDNUI7O0FBQ0F2QixNQUFBQSxRQUFRLENBQUNwRCxhQUFULEdBQXlCLEtBQUtBLGFBQUwsQ0FBbUI4RCxRQUFuQixDQUE0QixLQUFLeEUsS0FBTCxHQUFhLEtBQUt5RSxRQUE5QyxFQUF3RFQsSUFBeEQsSUFBZ0VqQixFQUF6RjtBQUNBZSxNQUFBQSxRQUFRLENBQUN5QixpQkFBVCxHQUE2QnpCLFFBQVEsQ0FBQ3BELGFBQXRDO0FBRUFvRCxNQUFBQSxRQUFRLENBQUMwQixVQUFULEdBQXNCLGdDQUFlLENBQWYsRUFBa0IsTUFBbEIsQ0FBdEI7O0FBRUEsV0FBS3hFLFVBQUwsQ0FBZ0J5RSxlQUFoQixDQUFnQzNCLFFBQWhDO0FBRUgsS0E3RFksQ0E2RFg7O0FBQ0wsSUFFRDs7O1NBQ0FsQyxpQkFBQSwwQkFBa0I7QUFDZCxTQUFLOEQsVUFBTCxDQUFnQkMsSUFBaEIsR0FBdUJDLGlCQUFLQyxRQUE1QixDQURjLENBQ3dCOztBQUN0QyxTQUFLSCxVQUFMLENBQWdCakYsUUFBaEIsR0FBMkIsQ0FBM0I7QUFDQSxRQUFNc0MsRUFBRSxHQUFHLEdBQVgsQ0FIYyxDQUdFOztBQUNoQixRQUFNK0MsR0FBRyxHQUFHLEtBQUtyQixRQUFMLEdBQWdCMUIsRUFBNUI7O0FBQ0EsU0FBSyxJQUFJYyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUMsR0FBcEIsRUFBeUIsRUFBRWpDLENBQTNCLEVBQThCO0FBQzFCLFdBQUs3RCxLQUFMLElBQWMrQyxFQUFkOztBQUNBLFdBQUtHLEtBQUwsQ0FBV0gsRUFBWDs7QUFDQSxXQUFLL0IsVUFBTCxDQUFnQm1DLGdCQUFoQixDQUFpQ0osRUFBakM7QUFDSDtBQUNKLElBRUQ7OztTQUNBRyxRQUFBLGVBQU9ILEVBQVAsRUFBVztBQUNQO0FBQ0EsUUFBTTJDLFVBQVUsR0FBRyxLQUFLQSxVQUFMLENBQWdCbEIsUUFBaEIsQ0FBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBbkI7O0FBQ0EsUUFBSSxLQUFLeEUsS0FBTCxHQUFhMEYsVUFBakIsRUFBNkI7QUFDekIsVUFBSSxLQUFLMUYsS0FBTCxHQUFjLEtBQUt5RSxRQUFMLEdBQWdCaUIsVUFBbEMsRUFBK0M7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsWUFBSSxDQUFDLEtBQUtLLElBQVYsRUFBZ0I7QUFDWixlQUFLaEcsV0FBTCxHQUFtQixLQUFuQjtBQUNBO0FBQ0g7QUFDSixPQVR3QixDQVd6Qjs7O0FBQ0EsV0FBS0Usb0JBQUwsSUFBNkIsS0FBS08sWUFBTCxDQUFrQmdFLFFBQWxCLENBQTJCLEtBQUt4RSxLQUFMLEdBQWEsS0FBS3lFLFFBQTdDLEVBQXVELENBQXZELElBQTREMUIsRUFBekY7O0FBQ0EsVUFBSSxLQUFLOUMsb0JBQUwsR0FBNEIsQ0FBNUIsSUFBaUMsS0FBS0YsV0FBMUMsRUFBdUQ7QUFDbkQsWUFBTWlHLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS2pHLG9CQUFoQixDQUFoQjtBQUNBLGFBQUtBLG9CQUFMLElBQTZCK0YsT0FBN0I7QUFDQSxhQUFLekMsSUFBTCxDQUFVeUMsT0FBVixFQUFtQmpELEVBQW5CO0FBQ0gsT0FqQndCLENBa0J6Qjs7O0FBQ0EsV0FBS1ksSUFBTCxDQUFVd0MsZ0JBQVYsQ0FBMkIsS0FBSy9GLFFBQWhDOztBQUNBLFVBQU1nRyxRQUFRLEdBQUd2RixpQkFBS3VGLFFBQUwsQ0FBYyxLQUFLaEcsUUFBbkIsRUFBNkIsS0FBS0QsUUFBbEMsQ0FBakI7O0FBQ0FVLHVCQUFLc0QsSUFBTCxDQUFVLEtBQUtoRSxRQUFmLEVBQXlCLEtBQUtDLFFBQTlCOztBQUNBLFdBQUtGLHdCQUFMLElBQWlDa0csUUFBUSxHQUFHLEtBQUtDLGdCQUFMLENBQXNCN0IsUUFBdEIsQ0FBK0IsS0FBS3hFLEtBQUwsR0FBYSxLQUFLeUUsUUFBakQsRUFBMkQsQ0FBM0QsQ0FBNUM7O0FBQ0EsVUFBSSxLQUFLdkUsd0JBQUwsR0FBZ0MsQ0FBaEMsSUFBcUMsS0FBS0gsV0FBOUMsRUFBMkQ7QUFDdkQsWUFBTWlHLFFBQU8sR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS2hHLHdCQUFoQixDQUFoQjs7QUFDQSxhQUFLQSx3QkFBTCxJQUFpQzhGLFFBQWpDO0FBQ0EsYUFBS3pDLElBQUwsQ0FBVXlDLFFBQVYsRUFBbUJqRCxFQUFuQjtBQUNILE9BM0J3QixDQTZCekI7OztBQUNBLDJEQUFvQixLQUFLdUQsTUFBekIsd0NBQWlDO0FBQUEsWUFBdEJDLEtBQXNCO0FBQzdCQSxRQUFBQSxLQUFLLENBQUN6RCxNQUFOLENBQWEsSUFBYixFQUFtQkMsRUFBbkI7QUFDSDtBQUNKO0FBQ0o7O1NBRUR5RCxvQkFBQSw2QkFBcUIsQ0FFcEI7O1NBRURuRixpQkFBQSwwQkFBa0I7QUFDZCxTQUFLc0MsSUFBTCxDQUFVd0MsZ0JBQVYsQ0FBMkIsS0FBS2hHLFFBQWhDOztBQUNBVSxxQkFBS3NELElBQUwsQ0FBVSxLQUFLL0QsUUFBZixFQUF5QixLQUFLRCxRQUE5QjtBQUNIOztTQUVEc0csZ0JBQUEsdUJBQWVDLFVBQWYsRUFBMkI7QUFDdkIsU0FBS25HLFlBQUwsQ0FBa0JvRyxJQUFsQixDQUF1QkQsVUFBdkI7QUFDSDs7U0FFREUsbUJBQUEsMEJBQWtCQyxHQUFsQixFQUF1QjtBQUNuQixTQUFLdEcsWUFBTCxDQUFrQnVHLE1BQWxCLENBQXlCLEtBQUt2RyxZQUFMLENBQWtCd0csT0FBbEIsQ0FBMEJGLEdBQTFCLENBQXpCLEVBQXlELENBQXpEO0FBQ0g7O1NBRURHLFdBQUEsa0JBQVVULEtBQVYsRUFBaUI7QUFDYixTQUFLRCxNQUFMLENBQVlLLElBQVosQ0FBaUJKLEtBQWpCO0FBQ0g7O1NBRURVLGNBQUEscUJBQWFKLEdBQWIsRUFBa0I7QUFDZCxTQUFLUCxNQUFMLENBQVlRLE1BQVosQ0FBbUIsS0FBS1IsTUFBTCxDQUFZUyxPQUFaLENBQW9CRixHQUFwQixDQUFuQixFQUE2QyxDQUE3QztBQUNIOztTQUVESyxjQUFBLHVCQUFlLENBRWQ7Ozs7O0FBbDJCRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQU1JO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFDZ0I7QUFDWixhQUFPLEtBQUtDLFNBQVo7QUFDSDtTQUVELGFBQWNDLEdBQWQsRUFBbUI7QUFDZixXQUFLRCxTQUFMLEdBQWlCQyxHQUFqQjs7QUFDQSxVQUFJLEtBQUtwRyxVQUFULEVBQXFCO0FBQ2pCLGFBQUtBLFVBQUwsQ0FBZ0JxRyxXQUFoQixDQUE0QixLQUFLRixTQUFqQztBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7OztBQWdCSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBR2U7QUFDWCxhQUFPLEtBQUt4RixRQUFaO0FBQ0g7U0FFRCxhQUFheUYsR0FBYixFQUFrQjtBQUNkLFVBQUlBLEdBQUcsS0FBSyxJQUFSLElBQWdCLEtBQUtyQixJQUFMLEtBQWMsS0FBbEMsRUFBeUMsQ0FDckM7QUFDSDs7QUFDRCxXQUFLcEUsUUFBTCxHQUFnQnlGLEdBQWhCO0FBQ0g7Ozs7QUFJRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBSXVCO0FBQ25CLGFBQU8sS0FBSzNELGdCQUFaO0FBQ0g7U0FFRCxhQUFxQjJELEdBQXJCLEVBQTBCO0FBQ3RCLFVBQUlBLEdBQUcsS0FBSyxLQUFLM0QsZ0JBQWpCLEVBQW1DO0FBQy9CLGFBQUtBLGdCQUFMLEdBQXdCMkQsR0FBeEI7O0FBQ0EsYUFBS3BHLFVBQUwsQ0FBZ0JzRyxxQkFBaEI7O0FBQ0EsYUFBS3RHLFVBQUwsQ0FBZ0J1RyxvQkFBaEI7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7OztTQXdISSxlQU1pQjtBQUNiO0FBQ0EsYUFBTyxLQUFLQyxVQUFaO0FBQ0g7U0FFRCxhQUFlSixHQUFmLEVBQW9CO0FBQ2hCLFdBQUtJLFVBQUwsR0FBa0JKLEdBQWxCOztBQUNBLFdBQUtaLGlCQUFMO0FBQ0g7Ozs7QUFLRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBSW1CO0FBQ2YsYUFBTyxLQUFLaUIsWUFBWjtBQUNIO1NBQ0QsYUFBaUJMLEdBQWpCLEVBQXNCO0FBQ2xCLFdBQUtLLFlBQUwsR0FBb0JMLEdBQXBCOztBQUNBLFdBQUtLLFlBQUwsQ0FBa0J4RyxNQUFsQixDQUF5QixJQUF6QjtBQUNIOzs7O0FBS0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUkrQjtBQUMzQixhQUFPLEtBQUt5Ryx3QkFBWjtBQUNIO1NBQ0QsYUFBNkJOLEdBQTdCLEVBQWtDO0FBQzlCLFdBQUtNLHdCQUFMLEdBQWdDTixHQUFoQztBQUNIOzs7O0FBS0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUkwQjtBQUN0QixhQUFPLEtBQUtPLG1CQUFaO0FBQ0g7U0FDRCxhQUF3QlAsR0FBeEIsRUFBNkI7QUFDekIsV0FBS08sbUJBQUwsR0FBMkJQLEdBQTNCO0FBQ0g7Ozs7QUFJRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBSThCO0FBQzFCLGFBQU8sS0FBS1EsdUJBQVo7QUFDSDtTQUVELGFBQTRCUixHQUE1QixFQUFpQztBQUM3QixXQUFLUSx1QkFBTCxHQUErQlIsR0FBL0I7QUFDSDs7OztBQUlEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFJMkI7QUFDdkIsYUFBTyxLQUFLUyxvQkFBWjtBQUNIO1NBQ0QsYUFBeUJULEdBQXpCLEVBQThCO0FBQzFCLFdBQUtTLG9CQUFMLEdBQTRCVCxHQUE1QjtBQUNIOzs7O0FBSUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUltQztBQUMvQixhQUFPLEtBQUtVLDRCQUFaO0FBQ0g7U0FDRCxhQUFpQ1YsR0FBakMsRUFBc0M7QUFDbEMsV0FBS1UsNEJBQUwsR0FBb0NWLEdBQXBDO0FBQ0g7Ozs7QUFJRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBSThCO0FBQzFCLGFBQU8sS0FBS1csdUJBQVo7QUFDSDtTQUNELGFBQTRCWCxHQUE1QixFQUFpQztBQUM3QixXQUFLVyx1QkFBTCxHQUErQlgsR0FBL0I7QUFDSDs7OztBQUlEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFJOEI7QUFDMUIsYUFBTyxLQUFLWSx1QkFBWjtBQUNIO1NBQ0QsYUFBNEJaLEdBQTVCLEVBQWlDO0FBQzdCLFdBQUtZLHVCQUFMLEdBQStCWixHQUEvQjs7QUFDQSxXQUFLWSx1QkFBTCxDQUE2Qi9HLE1BQTdCLENBQW9DLElBQXBDO0FBQ0g7Ozs7QUFJRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBSW1CO0FBQ2YsYUFBTyxLQUFLZ0gsWUFBWjtBQUNIO1NBQ0QsYUFBaUJiLEdBQWpCLEVBQXNCO0FBQ2xCLFdBQUthLFlBQUwsR0FBb0JiLEdBQXBCOztBQUNBLFdBQUthLFlBQUwsQ0FBa0JoSCxNQUFsQixDQUF5QixJQUF6QjtBQUNIOzs7O0FBS0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUlrQjtBQUNkLGFBQU8sS0FBS2lILFdBQVo7QUFDSDtTQUVELGFBQWdCZCxHQUFoQixFQUFxQjtBQUNqQixVQUFJLEtBQUtjLFdBQUwsS0FBcUJkLEdBQXpCLEVBQThCO0FBQzFCO0FBQ0g7O0FBQ0QsV0FBS2MsV0FBTCxHQUFtQmQsR0FBbkI7O0FBQ0EsV0FBS3BHLFVBQUwsQ0FBZ0JtSCxnQkFBaEI7O0FBQ0EsV0FBS25ILFVBQUwsQ0FBZ0JvSCxZQUFoQjs7QUFDQSxXQUFLcEgsVUFBTCxDQUFnQnNHLHFCQUFoQjtBQUNIOzs7O0FBS0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUdxQjtBQUNqQixhQUFPLEtBQUtlLGNBQVo7QUFDSDtTQUVELGFBQW1CakIsR0FBbkIsRUFBd0I7QUFDcEIsV0FBS2lCLGNBQUwsR0FBc0JqQixHQUF0Qjs7QUFDQSxXQUFLcEcsVUFBTCxDQUFnQnNHLHFCQUFoQjtBQUNIOzs7O0FBSUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUdtQjtBQUNmLGFBQU8sS0FBS2dCLFlBQVo7QUFDSDtTQUVELGFBQWlCbEIsR0FBakIsRUFBc0I7QUFDbEIsV0FBS2tCLFlBQUwsR0FBb0JsQixHQUFwQjs7QUFDQSxXQUFLcEcsVUFBTCxDQUFnQnNHLHFCQUFoQjtBQUNIOzs7O0FBS0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUlZO0FBQ1IsYUFBTyxLQUFLaUIsS0FBWjtBQUNIO1NBRUQsYUFBVW5CLEdBQVYsRUFBZTtBQUNYLFdBQUttQixLQUFMLEdBQWFuQixHQUFiOztBQUNBLFdBQUtwRyxVQUFMLENBQWdCb0gsWUFBaEI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUl3QjtBQUNwQixhQUFPLEtBQUtJLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBUDtBQUNIO1NBRUQsYUFBc0JwQixHQUF0QixFQUEyQjtBQUN2QixXQUFLcUIsV0FBTCxDQUFpQixDQUFqQixFQUFvQnJCLEdBQXBCOztBQUNBLFdBQUs5RixtQkFBTCxDQUF5QixDQUF6QixFQUE0QjhGLEdBQTVCO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFJcUI7QUFDakIsYUFBTyxLQUFLb0IsV0FBTCxDQUFpQixDQUFqQixDQUFQO0FBQ0g7U0FFRCxhQUFtQnBCLEdBQW5CLEVBQXdCO0FBQ3BCLFdBQUtxQixXQUFMLENBQWlCLENBQWpCLEVBQW9CckIsR0FBcEI7O0FBQ0EsV0FBSzlGLG1CQUFMLENBQXlCLENBQXpCLEVBQTRCOEYsR0FBNUI7QUFDSDs7O1NBd1ZELGVBQWlCO0FBQ2IsYUFBTyxLQUFLeEgsVUFBWjtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsU0FBWjtBQUNIOzs7U0FFRCxlQUFpQjtBQUNiLGFBQU8sS0FBS0MsVUFBWjtBQUNIOzs7U0FFRCxlQUFrQjtBQUNkLGFBQU8sS0FBS0MsV0FBWjtBQUNIOzs7U0FFRCxlQUFZO0FBQ1IsYUFBTyxLQUFLQyxLQUFaO0FBQ0g7Ozs7RUF2M0J5Q2pDLG1HQU16Q0g7Ozs7O1dBQ1U7OzhFQUVWQTs7Ozs7V0FDVzs7OERBTVhBLG9LQWlCQUE7Ozs7O1dBQ007Ozs7Ozs7V0FVTzs7NkVBRWJBOzs7OztXQUNVOzt5T0FvQlZBOzs7OztXQUNrQlcsWUFBTW1HOzt3UEFpQ3hCOUc7Ozs7O1dBQ2lCOzs7Ozs7O1dBVUwsSUFBSVksc0JBQUo7Ozs7Ozs7V0FVRyxJQUFJQSxzQkFBSjs7Ozs7OztXQVVILElBQUlDLHlCQUFKOzs7Ozs7O1dBVUFGLFlBQU1tRzs7Ozs7OztXQVVQLElBQUlsRyxzQkFBSjs7Ozs7OztXQVdDLElBQUlBLHNCQUFKOzs7Ozs7O1dBWUcsSUFBSUEsc0JBQUo7Ozs7Ozs7V0FXRSxJQUFJQSxzQkFBSjs7Ozs7OztXQVdILElBQUlBLHNCQUFKOzs7Ozs7O1dBVUksSUFBSUEsc0JBQUo7Ozs7Ozs7V0FXVixJQUFJa0ssS0FBSjs7Mk9Ba0JSOUs7Ozs7O1dBRWMsSUFBSXFCLHVCQUFKOzsyUEFrQmRyQjs7Ozs7V0FFMEIsSUFBSXNCLHlCQUFKOzs4UUFpQjFCdEI7Ozs7O1dBRXFCLElBQUl1Qix3QkFBSjs7d1FBaUJyQnZCOzs7OztXQUN5QixJQUFJd0IsNEJBQUo7OzZRQWtCekJ4Qjs7Ozs7V0FDc0IsSUFBSXlCLHlCQUFKOzsrUUFpQnRCekI7Ozs7O1dBQzhCLElBQUkwQixpQ0FBSjs7MFJBaUI5QjFCOzs7OztXQUN5QixJQUFJMkIsNEJBQUo7O2dSQWlCekIzQjs7Ozs7V0FDeUIsSUFBSTRCLDRCQUFKOztxUUFrQnpCNUI7Ozs7O1dBQ2MsSUFBSTZCLGlCQUFKOzs4T0FrQmQ3Qjs7Ozs7V0FDYThCLGlCQUFXaUo7OytPQXlCeEIvSzs7Ozs7V0FDZ0I7O21QQW1CaEJBOzs7OztXQUNjOzt3T0FrQmRBOzs7OztXQUNPOzs7O0FBbWFaTyxTQUFTLEtBQUtDLGdCQUFnQixDQUFDd0ssU0FBakIsQ0FBMkJDLGtCQUEzQixHQUFnRCxVQUFTQyxLQUFULEVBQWU7QUFBQTs7QUFBQyxTQUFPQSxLQUFLLENBQUNDLE1BQU4sQ0FBYSxVQUFBQyxDQUFDO0FBQUEsV0FBSSxDQUFDOUssYUFBYSxDQUFDK0ssUUFBZCxDQUF1QkQsQ0FBdkIsQ0FBRCxJQUE4QixLQUFJLENBQUNBLENBQUQsQ0FBSixDQUFRM0YsTUFBMUM7QUFBQSxHQUFkLENBQVA7QUFBd0UsQ0FBN0ksQ0FBVDtBQUVBNkYsRUFBRSxDQUFDOUssZ0JBQUgsR0FBc0JBLGdCQUF0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBNYXQ0LCBwc2V1ZG9SYW5kb20sIFF1YXQsIHJhbmRvbVJhbmdlSW50LCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgeyBJTlRfTUFYIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMvdXRpbHMnO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vYXNzZXRzL21hdGVyaWFsL0NDTWF0ZXJpYWwnO1xyXG5pbXBvcnQgQ29sb3JPdmVyTGlmZXRpbWVNb2R1bGUgZnJvbSAnLi9hbmltYXRvci9jb2xvci1vdmVydGltZSc7XHJcbmltcG9ydCBDdXJ2ZVJhbmdlLCB7IE1vZGUgfWZyb20gJy4vYW5pbWF0b3IvY3VydmUtcmFuZ2UnO1xyXG5pbXBvcnQgRm9yY2VPdmVydGltZU1vZHVsZSBmcm9tICcuL2FuaW1hdG9yL2ZvcmNlLW92ZXJ0aW1lJztcclxuaW1wb3J0IEdyYWRpZW50UmFuZ2UgZnJvbSAnLi9hbmltYXRvci9ncmFkaWVudC1yYW5nZSc7XHJcbmltcG9ydCBMaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgZnJvbSAnLi9hbmltYXRvci9saW1pdC12ZWxvY2l0eS1vdmVydGltZSc7XHJcbmltcG9ydCBSb3RhdGlvbk92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3Ivcm90YXRpb24tb3ZlcnRpbWUnO1xyXG5pbXBvcnQgU2l6ZU92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3Ivc2l6ZS1vdmVydGltZSc7XHJcbmltcG9ydCBUZXh0dXJlQW5pbWF0aW9uTW9kdWxlIGZyb20gJy4vYW5pbWF0b3IvdGV4dHVyZS1hbmltYXRpb24nO1xyXG5pbXBvcnQgVmVsb2NpdHlPdmVydGltZU1vZHVsZSBmcm9tICcuL2FuaW1hdG9yL3ZlbG9jaXR5LW92ZXJ0aW1lJztcclxuaW1wb3J0IEJ1cnN0IGZyb20gJy4vYnVyc3QnO1xyXG5pbXBvcnQgU2hhcGVNb2R1bGUgZnJvbSAnLi9lbWl0dGVyL3NoYXBlLW1vZHVsZSc7XHJcbmltcG9ydCB7IFJlbmRlck1vZGUsIFNwYWNlIH0gZnJvbSAnLi9lbnVtJztcclxuaW1wb3J0IHsgcGFydGljbGVFbWl0WkF4aXMgfSBmcm9tICcuL3BhcnRpY2xlLWdlbmVyYWwtZnVuY3Rpb24nO1xyXG5pbXBvcnQgVHJhaWxNb2R1bGUgZnJvbSAnLi9yZW5kZXJlci90cmFpbCc7XHJcbmltcG9ydCBNZXNoIGZyb20gJy4uLy4uL21lc2gvQ0NNZXNoJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgbWVudSwgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlLCBleGVjdXRpb25PcmRlcn0gPSByZXF1aXJlKCcuLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJylcclxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xyXG5cclxuY29uc3QgX3dvcmxkX21hdCA9IG5ldyBNYXQ0KCk7XHJcbmNvbnN0IF9tb2R1bGVfcHJvcHMgPSBDQ19FRElUT1IgJiYgW1xyXG4gICAgXCJfY29sb3JPdmVyTGlmZXRpbWVNb2R1bGVcIixcclxuICAgIFwiX3NoYXBlTW9kdWxlXCIsXHJcbiAgICBcIl9zaXplT3ZlcnRpbWVNb2R1bGVcIixcclxuICAgIFwiX3ZlbG9jaXR5T3ZlcnRpbWVNb2R1bGVcIixcclxuICAgIFwiX2ZvcmNlT3ZlcnRpbWVNb2R1bGVcIixcclxuICAgIFwiX2xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZVwiLFxyXG4gICAgXCJfcm90YXRpb25PdmVydGltZU1vZHVsZVwiLFxyXG4gICAgXCJfdGV4dHVyZUFuaW1hdGlvbk1vZHVsZVwiLFxyXG4gICAgXCJfdHJhaWxNb2R1bGVcIlxyXG5dXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgUGFydGljbGVTeXN0ZW0zRCBDb21wb25lbnQuXHJcbiAqICEjemggM0Qg57KS5a2Q57uE5Lu2XHJcbiAqIEBjbGFzcyBQYXJ0aWNsZVN5c3RlbTNEXHJcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLlBhcnRpY2xlU3lzdGVtM0QnKVxyXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9QYXJ0aWNsZVN5c3RlbTNEJylcclxuQGV4ZWN1dGlvbk9yZGVyKDk5KVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGVTeXN0ZW0zRCBleHRlbmRzIFJlbmRlckNvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHJ1biB0aW1lIG9mIHBhcnRpY2xlLlxyXG4gICAgICogISN6aCDnspLlrZDns7vnu5/ov5DooYzml7bpl7RcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGR1cmF0aW9uID0gNS4wO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2NhcGFjaXR5ID0gMTAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYXJ0aWNsZXMgdGhhdCBhIHBhcnRpY2xlIHN5c3RlbSBjYW4gZ2VuZXJhdGUuXHJcbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+iDveeUn+aIkOeahOacgOWkp+eykuWtkOaVsOmHj1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGNhcGFjaXR5XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IGNhcGFjaXR5ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FwYWNpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNhcGFjaXR5ICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9jYXBhY2l0eSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZW1ibGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5zZXRDYXBhY2l0eSh0aGlzLl9jYXBhY2l0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gbG9vcHMuXHJcbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+aYr+WQpuW+queOr+aSreaUvlxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBsb29wXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgbG9vcCA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFdoZXRoZXIgdGhlIHBhcnRpY2xlcyBzdGFydCBwbGF5aW5nIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgbG9hZGVkLlxyXG4gICAgICogISN6aCDnspLlrZDns7vnu5/liqDovb3lkI7mmK/lkKboh6rliqjlvIDlp4vmkq3mlL5cclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcGxheU9uQXdha2VcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIHBsYXlPbkF3YWtlID0gdHJ1ZTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9wcmV3YXJtID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gV2hlbiBzZWxlY3RlZCwgdGhlIHBhcnRpY2xlIHN5c3RlbSB3aWxsIHN0YXJ0IHBsYXlpbmcgYWZ0ZXIgb25lIHJvdW5kIGhhcyBiZWVuIHBsYXllZCAob25seSBlZmZlY3RpdmUgd2hlbiBsb29wIGlzIGVuYWJsZWQpLlxyXG4gICAgICogISN6aCDpgInkuK3kuYvlkI7vvIznspLlrZDns7vnu5/kvJrku6Xlt7Lmkq3mlL7lrozkuIDova7kuYvlkI7nmoTnirbmgIHlvIDlp4vmkq3mlL7vvIjku4XlvZPlvqrnjq/mkq3mlL7lkK/nlKjml7bmnInmlYjvvIlcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJld2FybVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHByZXdhcm0gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmV3YXJtO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwcmV3YXJtICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsID09PSB0cnVlICYmIHRoaXMubG9vcCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKCdwcmV3YXJtIG9ubHkgd29ya3MgaWYgbG9vcCBpcyBhbHNvIGVuYWJsZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZXdhcm0gPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfc2ltdWxhdGlvblNwYWNlID0gU3BhY2UuTG9jYWw7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGNvb3JkaW5hdGUgc3lzdGVtIGluIHdoaWNoIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gaXMgbG9jYXRlZC48YnI+XHJcbiAgICAgKiBXb3JsZCBjb29yZGluYXRlcyAoZG9lcyBub3QgY2hhbmdlIHdoZW4gdGhlIHBvc2l0aW9uIG9mIG90aGVyIG9iamVjdHMgY2hhbmdlcyk8YnI+XHJcbiAgICAgKiBMb2NhbCBjb29yZGluYXRlcyAobW92aW5nIGFzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGFyZW50IG5vZGUgY2hhbmdlcyk8YnI+XHJcbiAgICAgKiBDdXN0b20gY29vcmRpbmF0ZXMgKG1vdmluZyB3aXRoIHRoZSBwb3NpdGlvbiBvZiBhIGN1c3RvbSBub2RlKVxyXG4gICAgICogISN6aCDpgInmi6nnspLlrZDns7vnu5/miYDlnKjnmoTlnZDmoIfns7s8YnI+XHJcbiAgICAgKiDkuJbnlYzlnZDmoIfvvIjkuI3pmo/lhbbku5bniankvZPkvY3nva7mlLnlj5jogIzlj5jmjaLvvIk8YnI+XHJcbiAgICAgKiDlsYDpg6jlnZDmoIfvvIjot5/pmo/niLboioLngrnkvY3nva7mlLnlj5jogIznp7vliqjvvIk8YnI+XHJcbiAgICAgKiDoh6rlrprlnZDmoIfvvIjot5/pmo/oh6rlrprkuYnoioLngrnnmoTkvY3nva7mlLnlj5jogIznp7vliqjvvIlcclxuICAgICAqIEBwcm9wZXJ0eSB7U3BhY2V9IHNpbXVsYXRpb25TcGFjZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IFNwYWNlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHNpbXVsYXRpb25TcGFjZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpbXVsYXRpb25TcGFjZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2ltdWxhdGlvblNwYWNlICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9zaW11bGF0aW9uU3BhY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2ltdWxhdGlvblNwYWNlID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX3VwZGF0ZU1hdGVyaWFsUGFyYW1zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlVHJhaWxNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29udHJvbGxpbmcgdGhlIHVwZGF0ZSBzcGVlZCBvZiB0aGUgZW50aXJlIHBhcnRpY2xlIHN5c3RlbS5cclxuICAgICAqICEjemgg5o6n5Yi25pW05Liq57KS5a2Q57O757uf55qE5pu05paw6YCf5bqm44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc2ltdWxhdGlvblNwZWVkXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgc2ltdWxhdGlvblNwZWVkID0gMS4wO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZWxheSBwYXJ0aWNsZSBlbWlzc2lvbiB0aW1lIGFmdGVyIHBhcnRpY2xlIHN5c3RlbSBzdGFydHMgcnVubmluZy5cclxuICAgICAqICEjemgg57KS5a2Q57O757uf5byA5aeL6L+Q6KGM5ZCO77yM5bu26L+f57KS5a2Q5Y+R5bCE55qE5pe26Ze044CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHN0YXJ0RGVsYXlcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIHN0YXJ0RGVsYXkgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBsaWZlIGN5Y2xl44CCXHJcbiAgICAgKiAhI3poIOeykuWtkOeUn+WRveWRqOacn+OAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydExpZmV0aW1lXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgIH0pXHJcbiAgICBzdGFydExpZmV0aW1lID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgaW5pdGlhbCBjb2xvclxyXG4gICAgICogISN6aCDnspLlrZDliJ3lp4vpopzoibJcclxuICAgICAqIEBwcm9wZXJ0eSB7R3JhZGllbnRSYW5nZX0gc3RhcnRDb2xvclxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgc3RhcnRDb2xvciA9IG5ldyBHcmFkaWVudFJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIHNjYWxlIHNwYWNlXHJcbiAgICAgKiAhI3poIOe8qeaUvuepuumXtFxyXG4gICAgICogQHByb3BlcnR5IHtTcGFjZX0gc2NhbGVTcGFjZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IFNwYWNlLFxyXG4gICAgfSlcclxuICAgIHNjYWxlU3BhY2UgPSBTcGFjZS5Mb2NhbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW5pdGlhbCBwYXJ0aWNsZSBzaXplXHJcbiAgICAgKiAhI3poIOeykuWtkOWIneWni+Wkp+Wwj1xyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydFNpemVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIHN0YXJ0U2l6ZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEluaXRpYWwgcGFydGljbGUgc3BlZWRcclxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL6YCf5bqmXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHN0YXJ0U3BlZWRcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIHN0YXJ0U3BlZWQgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBpbml0aWFsIHJvdGF0aW9uIGFuZ2xlXHJcbiAgICAgKiAhI3poIOeykuWtkOWIneWni+aXi+i9rOinkuW6plxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydFJvdGF0aW9uXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgICAgICByYW5nZTogWy0xLCAxXSxcclxuICAgICAgICByYWRpYW46IHRydWUsXHJcbiAgICB9KVxyXG4gICAgc3RhcnRSb3RhdGlvbiA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdyYXZpdHkgY29lZmZpY2llbnQgb2YgcGFydGljbGVzIGFmZmVjdGVkIGJ5IGdyYXZpdHlcclxuICAgICAqICEjemgg57KS5a2Q5Y+X6YeN5Yqb5b2x5ZON55qE6YeN5Yqb57O75pWwXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGdyYXZpdHlNb2RpZmllclxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXHJcbiAgICB9KVxyXG4gICAgZ3Jhdml0eU1vZGlmaWVyID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvLyBlbWlzc2lvbiBtb2R1bGVcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZXMgZW1pdHRlZCBwZXIgc2Vjb25kXHJcbiAgICAgKiAhI3poIOavj+enkuWPkeWwhOeahOeykuWtkOaVsFxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSByYXRlT3ZlclRpbWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIHJhdGVPdmVyVGltZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE51bWJlciBvZiBwYXJ0aWNsZXMgZW1pdHRlZCBwZXIgdW5pdCBkaXN0YW5jZSBtb3ZlZFxyXG4gICAgICogISN6aCDmr4/np7vliqjljZXkvY3ot53nprvlj5HlsITnmoTnspLlrZDmlbBcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gcmF0ZU92ZXJEaXN0YW5jZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgcmF0ZU92ZXJEaXN0YW5jZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1iZXIgb2YgQnJ1c3RzIHRoYXQgZW1pdCBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGFydGljbGVzIGF0IGEgc3BlY2lmaWVkIHRpbWVcclxuICAgICAqICEjemgg6K6+5a6a5Zyo5oyH5a6a5pe26Ze05Y+R5bCE5oyH5a6a5pWw6YeP55qE57KS5a2Q55qEIEJydXN0IOeahOaVsOmHj1xyXG4gICAgICogQHByb3BlcnR5IHtbQnVyc3RdfSBidXJzdHNcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBbQnVyc3RdLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgYnVyc3RzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBbTWF0ZXJpYWxdLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnTWF0ZXJpYWxzJyxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICBvdmVycmlkZTogdHJ1ZSxcclxuICAgIH0pXHJcbiAgICBnZXQgbWF0ZXJpYWxzICgpIHtcclxuICAgICAgICAvLyBpZiB3ZSBkb24ndCBjcmVhdGUgYW4gYXJyYXkgY29weSwgdGhlIGVkaXRvciB3aWxsIG1vZGlmeSB0aGUgb3JpZ2luYWwgYXJyYXkgZGlyZWN0bHkuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFscztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF0ZXJpYWxzICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9tYXRlcmlhbHMgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgLy8gc2hwYWUgbW9kdWxlXHJcbiAgICBfc2hhcGVNb2R1bGUgPSBuZXcgU2hhcGVNb2R1bGUoKTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIG1vZHVsZVxyXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajmqKHlnZdcclxuICAgICAqIEBwcm9wZXJ0eSB7U2hhcGVNb2R1bGV9IHNoYXBlTW9kdWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogU2hhcGVNb2R1bGUsXHJcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICBnZXQgc2hhcGVNb2R1bGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFwZU1vZHVsZTtcclxuICAgIH1cclxuICAgIHNldCBzaGFwZU1vZHVsZSAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhcGVNb2R1bGUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5fc2hhcGVNb2R1bGUub25Jbml0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgLy8gY29sb3Igb3ZlciBsaWZldGltZSBtb2R1bGVcclxuICAgIF9jb2xvck92ZXJMaWZldGltZU1vZHVsZSA9IG5ldyBDb2xvck92ZXJMaWZldGltZU1vZHVsZSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbG9yIGNvbnRyb2wgbW9kdWxlXHJcbiAgICAgKiAhI3poIOminOiJsuaOp+WItuaooeWdl1xyXG4gICAgICogQHByb3BlcnR5IHtDb2xvck92ZXJMaWZldGltZU1vZHVsZX0gY29sb3JPdmVyTGlmZXRpbWVNb2R1bGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDb2xvck92ZXJMaWZldGltZU1vZHVsZSxcclxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIGdldCBjb2xvck92ZXJMaWZldGltZU1vZHVsZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yT3ZlckxpZmV0aW1lTW9kdWxlO1xyXG4gICAgfVxyXG4gICAgc2V0IGNvbG9yT3ZlckxpZmV0aW1lTW9kdWxlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9jb2xvck92ZXJMaWZldGltZU1vZHVsZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIC8vIHNpemUgb3ZlciBsaWZldGltZSBtb2R1bGVcclxuICAgIF9zaXplT3ZlcnRpbWVNb2R1bGUgPSBuZXcgU2l6ZU92ZXJ0aW1lTW9kdWxlKCk7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgc2l6ZSBtb2R1bGVcclxuICAgICAqICEjemgg57KS5a2Q5aSn5bCP5qih5Z2XXHJcbiAgICAgKiBAcHJvcGVydHkge1NpemVPdmVydGltZU1vZHVsZX0gc2l6ZU92ZXJ0aW1lTW9kdWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogU2l6ZU92ZXJ0aW1lTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHNpemVPdmVydGltZU1vZHVsZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemVPdmVydGltZU1vZHVsZTtcclxuICAgIH1cclxuICAgIHNldCBzaXplT3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NpemVPdmVydGltZU1vZHVsZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF92ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlID0gbmV3IFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUoKTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSBzcGVlZCBtb2R1bGVcclxuICAgICAqICEjemgg57KS5a2Q6YCf5bqm5qih5Z2XXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlbG9jaXR5T3ZlcnRpbWVNb2R1bGV9IHZlbG9jaXR5T3ZlcnRpbWVNb2R1bGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl92ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2ZvcmNlT3ZlcnRpbWVNb2R1bGUgPSBuZXcgRm9yY2VPdmVydGltZU1vZHVsZSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGFjY2VsZXJhdGlvbiBtb2R1bGVcclxuICAgICAqICEjemgg57KS5a2Q5Yqg6YCf5bqm5qih5Z2XXHJcbiAgICAgKiBAcHJvcGVydHkge0ZvcmNlT3ZlcnRpbWVNb2R1bGV9IGZvcmNlT3ZlcnRpbWVNb2R1bGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBGb3JjZU92ZXJ0aW1lTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IGZvcmNlT3ZlcnRpbWVNb2R1bGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZU92ZXJ0aW1lTW9kdWxlO1xyXG4gICAgfVxyXG4gICAgc2V0IGZvcmNlT3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlT3ZlcnRpbWVNb2R1bGUgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfbGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlID0gbmV3IExpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGxpbWl0IHNwZWVkIG1vZHVsZSAob25seSBDUFUgcGFydGljbGVzIGFyZSBzdXBwb3J0ZWQpXHJcbiAgICAgKiAhI3poIOeykuWtkOmZkOWItumAn+W6puaooeWdl++8iOWPquaUr+aMgSBDUFUg57KS5a2Q77yJXHJcbiAgICAgKiBAcHJvcGVydHkge0xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZX0gbGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IGxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZTtcclxuICAgIH1cclxuICAgIHNldCBsaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX2xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlID0gbmV3IFJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUoKTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXJ0aWNsZSByb3RhdGlvbiBtb2R1bGVcclxuICAgICAqICEjemgg57KS5a2Q5peL6L2s5qih5Z2XXHJcbiAgICAgKiBAcHJvcGVydHkge1JvdGF0aW9uT3ZlcnRpbWVNb2R1bGV9IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBSb3RhdGlvbk92ZXJ0aW1lTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlO1xyXG4gICAgfVxyXG4gICAgc2V0IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3JvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfdGV4dHVyZUFuaW1hdGlvbk1vZHVsZSA9IG5ldyBUZXh0dXJlQW5pbWF0aW9uTW9kdWxlKCk7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGV4dHVyZSBBbmltYXRpb24gTW9kdWxlXHJcbiAgICAgKiAhI3poIOi0tOWbvuWKqOeUu+aooeWdl1xyXG4gICAgICogQHByb3BlcnR5IHtUZXh0dXJlQW5pbWF0aW9uTW9kdWxlfSB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSxcclxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIGdldCB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZUFuaW1hdGlvbk1vZHVsZTtcclxuICAgIH1cclxuICAgIHNldCB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlQW5pbWF0aW9uTW9kdWxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmVBbmltYXRpb25Nb2R1bGUub25Jbml0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3RyYWlsTW9kdWxlID0gbmV3IFRyYWlsTW9kdWxlKCk7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgVHJhamVjdG9yeSBNb2R1bGVcclxuICAgICAqICEjemgg57KS5a2Q6L2o6L+55qih5Z2XXHJcbiAgICAgKiBAcHJvcGVydHkge1RyYWlsTW9kdWxlfSB0cmFpbE1vZHVsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IFRyYWlsTW9kdWxlLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHRyYWlsTW9kdWxlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhaWxNb2R1bGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdHJhaWxNb2R1bGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3RyYWlsTW9kdWxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX3RyYWlsTW9kdWxlLm9uSW5pdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9yZW5kZXJNb2RlID0gUmVuZGVyTW9kZS5CaWxsYm9hcmQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGdlbmVyYXRpb24gbW9kZVxyXG4gICAgICogISN6aCDorr7lrprnspLlrZDnlJ/miJDmqKHlvI9cclxuICAgICAqIEBwcm9wZXJ0eSB7UmVuZGVyTW9kZX0gcmVuZGVyTW9kZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IFJlbmRlck1vZGUsXHJcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICBnZXQgcmVuZGVyTW9kZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlck1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJlbmRlck1vZGUgKHZhbCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJNb2RlID09PSB2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZW5kZXJNb2RlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fc2V0VmVydGV4QXR0cmliKCk7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVNb2RlbCgpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF92ZWxvY2l0eVNjYWxlID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gV2hlbiB0aGUgcGFydGljbGUgZ2VuZXJhdGlvbiBtb2RlIGlzIFN0cmVjdGhlZEJpbGxib2FyZCwgaW4gdGhlIGRpcmVjdGlvbiBvZiBtb3ZlbWVudCBvZiB0aGUgcGFydGljbGVzIGlzIHN0cmV0Y2hlZCBieSB2ZWxvY2l0eSBtYWduaXR1ZGVcclxuICAgICAqICEjemgg5Zyo57KS5a2Q55Sf5oiQ5pa55byP5Li6IFN0cmVjdGhlZEJpbGxib2FyZCDml7Ys5a+557KS5a2Q5Zyo6L+Q5Yqo5pa55ZCR5LiK5oyJ6YCf5bqm5aSn5bCP6L+b6KGM5ouJ5Ly4XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdmVsb2NpdHlTY2FsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHZlbG9jaXR5U2NhbGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZWxvY2l0eVNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2ZWxvY2l0eVNjYWxlICh2YWwpIHtcclxuICAgICAgICB0aGlzLl92ZWxvY2l0eVNjYWxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9sZW5ndGhTY2FsZSA9IDE7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gV2hlbiB0aGUgcGFydGljbGUgZ2VuZXJhdGlvbiBtZXRob2QgaXMgU3RyZWN0aGVkQmlsbGJvYXJkLCB0aGUgcGFydGljbGVzIGFyZSBzdHJldGNoZWQgYWNjb3JkaW5nIHRvIHRoZSBwYXJ0aWNsZSBzaXplIGluIHRoZSBkaXJlY3Rpb24gb2YgbW90aW9uXHJcbiAgICAgKiAhI3poIOWcqOeykuWtkOeUn+aIkOaWueW8j+S4uiBTdHJlY3RoZWRCaWxsYm9hcmQg5pe2LOWvueeykuWtkOWcqOi/kOWKqOaWueWQkeS4iuaMieeykuWtkOWkp+Wwj+i/m+ihjOaLieS8uFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFNjYWxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICBnZXQgbGVuZ3RoU2NhbGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGhTY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbGVuZ3RoU2NhbGUgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aFNjYWxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9tZXNoID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgbW9kZWxcclxuICAgICAqICEjemgg57KS5a2Q5qih5Z6LXHJcbiAgICAgKiBAcHJvcGVydHkge01lc2h9IG1lc2hcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBNZXNoLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IG1lc2ggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtZXNoICh2YWwpIHtcclxuICAgICAgICB0aGlzLl9tZXNoID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlTW9kZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGFydGljbGUgbWF0ZXJpYWxcclxuICAgICAqICEjemgg57KS5a2Q5p2Q6LSoXHJcbiAgICAgKiBAcHJvcGVydHkge01hdGVyaWFsfSBwYXJ0aWNsZU1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogTWF0ZXJpYWwsXHJcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICBnZXQgcGFydGljbGVNYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBhcnRpY2xlTWF0ZXJpYWwgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuc2V0TWF0ZXJpYWwoMCwgdmFsKTtcclxuICAgICAgICB0aGlzLl9vbk1hdGVyaWFsTW9kaWZpZWQoMCwgdmFsKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhcnRpY2xlIHRyYWlsIG1hdGVyaWFsXHJcbiAgICAgKiAhI3poIOeykuWtkOi9qOi/ueadkOi0qFxyXG4gICAgICogQHByb3BlcnR5IHtNYXRlcmlhbH0gdHJhaWxNYXRlcmlhbFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IE1hdGVyaWFsLFxyXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHRyYWlsTWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hdGVyaWFsKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB0cmFpbE1hdGVyaWFsICh2YWwpIHtcclxuICAgICAgICB0aGlzLnNldE1hdGVyaWFsKDEsIHZhbCk7XHJcbiAgICAgICAgdGhpcy5fb25NYXRlcmlhbE1vZGlmaWVkKDEsIHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2lzUGxheWluZztcclxuICAgIF9pc1BhdXNlZDtcclxuICAgIF9pc1N0b3BwZWQ7XHJcbiAgICBfaXNFbWl0dGluZztcclxuICAgIF90aW1lOyAgLy8gcGxheWJhY2sgcG9zaXRpb24gaW4gc2Vjb25kcy5cclxuICAgIF9lbWl0UmF0ZVRpbWVDb3VudGVyO1xyXG4gICAgX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyO1xyXG4gICAgX29sZFdQb3M7XHJcbiAgICBfY3VyV1BvcztcclxuICAgIF9jdXN0b21EYXRhMTtcclxuICAgIF9jdXN0b21EYXRhMjtcclxuICAgIF9zdWJFbWl0dGVyczsgLy8gYXJyYXkgb2YgeyBlbWl0dGVyOiBQYXJ0aWNsZVN5c3RlbTNELCB0eXBlOiAnYmlydGgnLCAnY29sbGlzaW9uJyBvciAnZGVhdGgnfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLnJhdGVPdmVyVGltZS5jb25zdGFudCA9IDEwO1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaWZldGltZS5jb25zdGFudCA9IDU7XHJcbiAgICAgICAgdGhpcy5zdGFydFNpemUuY29uc3RhbnQgPSAxO1xyXG4gICAgICAgIHRoaXMuc3RhcnRTcGVlZC5jb25zdGFudCA9IDU7XHJcblxyXG4gICAgICAgIC8vIGludGVybmFsIHN0YXR1c1xyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNTdG9wcGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9pc0VtaXR0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwLjA7ICAvLyBwbGF5YmFjayBwb3NpdGlvbiBpbiBzZWNvbmRzLlxyXG4gICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5fZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5fb2xkV1BvcyA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2N1cldQb3MgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY3VzdG9tRGF0YTEgPSBuZXcgVmVjMigwLCAwKTtcclxuICAgICAgICB0aGlzLl9jdXN0b21EYXRhMiA9IG5ldyBWZWMyKDAsIDApO1xyXG5cclxuICAgICAgICB0aGlzLl9zdWJFbWl0dGVycyA9IFtdOyAvLyBhcnJheSBvZiB7IGVtaXR0ZXI6IFBhcnRpY2xlU3lzdGVtQ29tcG9uZW50LCB0eXBlOiAnYmlydGgnLCAnY29sbGlzaW9uJyBvciAnZGVhdGgnfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLm9uSW5pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNoYXBlTW9kdWxlLm9uSW5pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLm9uSW5pdCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRleHR1cmVBbmltYXRpb25Nb2R1bGUub25Jbml0KHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLl9yZXNldFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3N5c3RlbS5hZGQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTWF0ZXJpYWxNb2RpZmllZCAoaW5kZXgsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl9vbk1hdGVyaWFsTW9kaWZpZWQoaW5kZXgsIG1hdGVyaWFsKTtcclxuICAgIH1cclxuXHJcbiAgICBfb25SZWJ1aWxkUFNPIChpbmRleCwgbWF0ZXJpYWwpIHtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX29uUmVidWlsZFBTTyhpbmRleCwgbWF0ZXJpYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IGZhc3Rmb3J3YXJkIGN1cnJlbnQgcGFydGljbGUgc3lzdGVtIGJ5IHNpbXVsYXRpbmcgcGFydGljbGVzIG92ZXIgZ2l2ZW4gcGVyaW9kIG9mIHRpbWUsIHRoZW4gcGF1c2UgaXQuXHJcbiAgICAvLyBzaW11bGF0ZSh0aW1lLCB3aXRoQ2hpbGRyZW4sIHJlc3RhcnQsIGZpeGVkVGltZVN0ZXApIHtcclxuXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBsYXlpbmcgcGFydGljbGUgZWZmZWN0c1xyXG4gICAgICogISN6aCDmkq3mlL7nspLlrZDmlYjmnpxcclxuICAgICAqIEBtZXRob2QgcGxheVxyXG4gICAgICovXHJcbiAgICBwbGF5ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU3RvcHBlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1N0b3BwZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faXNFbWl0dGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX3Jlc2V0UG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgLy8gcHJld2FybVxyXG4gICAgICAgIGlmICh0aGlzLl9wcmV3YXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZXdhcm1TeXN0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhdXNlIHBhcnRpY2xlIGVmZmVjdFxyXG4gICAgICogISN6aCDmmoLlgZzmkq3mlL7nspLlrZDmlYjmnpxcclxuICAgICAqIEBtZXRob2QgcGF1c2VcclxuICAgICAqL1xyXG4gICAgcGF1c2UgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1N0b3BwZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdwYXVzZSgpOiBwYXJ0aWNsZSBzeXN0ZW0gaXMgYWxyZWFkeSBzdG9wcGVkLicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN0b3AgcGFydGljbGUgZWZmZWN0XHJcbiAgICAgKiAhI3poIOWBnOatouaSreaUvueykuWtkOaViOaenFxyXG4gICAgICogQG1ldGhvZCBzdG9wXHJcbiAgICAgKi9cclxuICAgIHN0b3AgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgfHwgdGhpcy5faXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5fZW1pdFJhdGVUaW1lQ291bnRlciA9IDAuMDtcclxuICAgICAgICB0aGlzLl9lbWl0UmF0ZURpc3RhbmNlQ291bnRlciA9IDAuMDtcclxuXHJcbiAgICAgICAgdGhpcy5faXNTdG9wcGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgYWxsIHBhcnRpY2xlcyBmcm9tIGN1cnJlbnQgcGFydGljbGUgc3lzdGVtLlxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlbW92ZSBhbGwgcGFydGljbGUgZWZmZWN0XHJcbiAgICAgKiAhI3poIOWwhuaJgOacieeykuWtkOS7jueykuWtkOezu+e7n+S4rea4hemZpFxyXG4gICAgICogQG1ldGhvZCBjbGVhclxyXG4gICAgICovXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5jbGVhcigpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFBhcnRpY2xlQ291bnQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hc3NlbWJsZXIuZ2V0UGFydGljbGVDb3VudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1c3RvbURhdGExICh4LCB5KSB7XHJcbiAgICAgICAgVmVjMi5zZXQodGhpcy5fY3VzdG9tRGF0YTEsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1c3RvbURhdGEyICh4LCB5KSB7XHJcbiAgICAgICAgVmVjMi5zZXQodGhpcy5fY3VzdG9tRGF0YTIsIHgsIHkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5fc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy50cmFpbE1vZHVsZS5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uRW5hYmxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheU9uQXdha2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5vbkVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMudHJhaWxNb2R1bGUub25FbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uRGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5vbkRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLm9uRGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBjb25zdCBzY2FsZWREZWx0YVRpbWUgPSBkdCAqIHRoaXMuc2ltdWxhdGlvblNwZWVkO1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZSArPSBzY2FsZWREZWx0YVRpbWU7XHJcblxyXG4gICAgICAgICAgICAvLyBleGN1dGUgZW1pc3Npb25cclxuICAgICAgICAgICAgdGhpcy5fZW1pdChzY2FsZWREZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2ltdWxhdGlvbiwgdXBkYXRlIHBhcnRpY2xlcy5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlUGFydGljbGVzKHNjYWxlZERlbHRhVGltZSkgPT09IDAgJiYgIXRoaXMuX2lzRW1pdHRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgcmVuZGVyIGRhdGFcclxuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZVBhcnRpY2xlQnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgdHJhaWxcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLnVwZGF0ZVRyYWlsQnVmZmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdCAoY291bnQsIGR0KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zaW11bGF0aW9uU3BhY2UgPT09IFNwYWNlLldvcmxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZE1hdHJpeChfd29ybGRfbWF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMuX2Fzc2VtYmxlci5fZ2V0RnJlZVBhcnRpY2xlKCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0aWNsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmQgPSBwc2V1ZG9SYW5kb20ocmFuZG9tUmFuZ2VJbnQoMCwgSU5UX01BWCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcGVNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlTW9kdWxlLmVtaXQocGFydGljbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQocGFydGljbGUucG9zaXRpb24sIDAsIDAsIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5jb3B5KHBhcnRpY2xlLnZlbG9jaXR5LCBwYXJ0aWNsZUVtaXRaQXhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmVBbmltYXRpb25Nb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmVBbmltYXRpb25Nb2R1bGUuaW5pdChwYXJ0aWNsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZlYzMuc2NhbGUocGFydGljbGUudmVsb2NpdHksIHBhcnRpY2xlLnZlbG9jaXR5LCB0aGlzLnN0YXJ0U3BlZWQuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fc2ltdWxhdGlvblNwYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNwYWNlLkxvY2FsOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTcGFjZS5Xb3JsZDpcclxuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQocGFydGljbGUucG9zaXRpb24sIHBhcnRpY2xlLnBvc2l0aW9uLCBfd29ybGRfbWF0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3b3JsZFJvdCA9IG5ldyBRdWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldFdvcmxkUm90YXRpb24od29ybGRSb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChwYXJ0aWNsZS52ZWxvY2l0eSwgcGFydGljbGUudmVsb2NpdHksIHdvcmxkUm90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU3BhY2UuQ3VzdG9tOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVmVjMy5jb3B5KHBhcnRpY2xlLnVsdGltYXRlVmVsb2NpdHksIHBhcnRpY2xlLnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgLy8gYXBwbHkgc3RhcnRSb3RhdGlvbi4gbm93IDJEIG9ubHkuXHJcbiAgICAgICAgICAgIFZlYzMuc2V0KHBhcnRpY2xlLnJvdGF0aW9uLCAwLCAwLCB0aGlzLnN0YXJ0Um90YXRpb24uZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFwcGx5IHN0YXJ0U2l6ZS4gbm93IDJEIG9ubHkuXHJcbiAgICAgICAgICAgIFZlYzMuc2V0KHBhcnRpY2xlLnN0YXJ0U2l6ZSwgdGhpcy5zdGFydFNpemUuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpLCAxLCAxKTtcclxuICAgICAgICAgICAgcGFydGljbGUuc3RhcnRTaXplLnkgPSBwYXJ0aWNsZS5zdGFydFNpemUueDtcclxuICAgICAgICAgICAgVmVjMy5jb3B5KHBhcnRpY2xlLnNpemUsIHBhcnRpY2xlLnN0YXJ0U2l6ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhcHBseSBzdGFydENvbG9yLlxyXG4gICAgICAgICAgICBwYXJ0aWNsZS5zdGFydENvbG9yLnNldCh0aGlzLnN0YXJ0Q29sb3IuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpKTtcclxuICAgICAgICAgICAgcGFydGljbGUuY29sb3Iuc2V0KHBhcnRpY2xlLnN0YXJ0Q29sb3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gYXBwbHkgc3RhcnRMaWZldGltZS5cclxuICAgICAgICAgICAgcGFydGljbGUuc3RhcnRMaWZldGltZSA9IHRoaXMuc3RhcnRMaWZldGltZS5ldmFsdWF0ZSh0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbiwgcmFuZCkgKyBkdDtcclxuICAgICAgICAgICAgcGFydGljbGUucmVtYWluaW5nTGlmZXRpbWUgPSBwYXJ0aWNsZS5zdGFydExpZmV0aW1lO1xyXG5cclxuICAgICAgICAgICAgcGFydGljbGUucmFuZG9tU2VlZCA9IHJhbmRvbVJhbmdlSW50KDAsIDIzMzI4MCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX3NldE5ld1BhcnRpY2xlKHBhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgfSAvLyBlbmQgb2YgcGFydGljbGVzIGZvckxvb3AuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSBwYXJ0aWNsZSBzeXN0ZW0gYXMgdGhvdWdoIGl0IGhhZCBhbHJlYWR5IGNvbXBsZXRlZCBhIGZ1bGwgY3ljbGUuXHJcbiAgICBfcHJld2FybVN5c3RlbSAoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydERlbGF5Lm1vZGUgPSBNb2RlLkNvbnN0YW50OyAvLyBjbGVhciBzdGFydERlbGF5LlxyXG4gICAgICAgIHRoaXMuc3RhcnREZWxheS5jb25zdGFudCA9IDA7XHJcbiAgICAgICAgY29uc3QgZHQgPSAxLjA7IC8vIHNob3VsZCB1c2UgdmFyeWluZyB2YWx1ZT9cclxuICAgICAgICBjb25zdCBjbnQgPSB0aGlzLmR1cmF0aW9uIC8gZHQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbnQ7ICsraSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lICs9IGR0O1xyXG4gICAgICAgICAgICB0aGlzLl9lbWl0KGR0KTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVQYXJ0aWNsZXMoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpbnRlcm5hbCBmdW5jdGlvblxyXG4gICAgX2VtaXQgKGR0KSB7XHJcbiAgICAgICAgLy8gZW1pdCBwYXJ0aWNsZXMuXHJcbiAgICAgICAgY29uc3Qgc3RhcnREZWxheSA9IHRoaXMuc3RhcnREZWxheS5ldmFsdWF0ZSgwLCAxKTtcclxuICAgICAgICBpZiAodGhpcy5fdGltZSA+IHN0YXJ0RGVsYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWUgPiAodGhpcy5kdXJhdGlvbiArIHN0YXJ0RGVsYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl90aW1lID0gc3RhcnREZWxheTsgLy8gZGVsYXkgd2lsbCBub3QgYmUgYXBwbGllZCBmcm9tIHRoZSBzZWNvbmQgbG9vcC4oVW5pdHkpXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9lbWl0UmF0ZVRpbWVDb3VudGVyID0gMC4wO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5fZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIgPSAwLjA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRW1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGVtaXQgYnkgcmF0ZU92ZXJUaW1lXHJcbiAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgKz0gdGhpcy5yYXRlT3ZlclRpbWUuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIDEpICogZHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbWl0UmF0ZVRpbWVDb3VudGVyID4gMSAmJiB0aGlzLl9pc0VtaXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0TnVtID0gTWF0aC5mbG9vcih0aGlzLl9lbWl0UmF0ZVRpbWVDb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgLT0gZW1pdE51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChlbWl0TnVtLCBkdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZW1pdCBieSByYXRlT3ZlckRpc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZFBvc2l0aW9uKHRoaXMuX2N1cldQb3MpO1xyXG4gICAgICAgICAgICBjb25zdCBkaXN0YW5jZSA9IFZlYzMuZGlzdGFuY2UodGhpcy5fY3VyV1BvcywgdGhpcy5fb2xkV1Bvcyk7XHJcbiAgICAgICAgICAgIFZlYzMuY29weSh0aGlzLl9vbGRXUG9zLCB0aGlzLl9jdXJXUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIgKz0gZGlzdGFuY2UgKiB0aGlzLnJhdGVPdmVyRGlzdGFuY2UuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIgPiAxICYmIHRoaXMuX2lzRW1pdHRpbmcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtaXROdW0gPSBNYXRoLmZsb29yKHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyIC09IGVtaXROdW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoZW1pdE51bSwgZHQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBidXJzdHNcclxuICAgICAgICAgICAgZm9yIChjb25zdCBidXJzdCBvZiB0aGlzLmJ1cnN0cykge1xyXG4gICAgICAgICAgICAgICAgYnVyc3QudXBkYXRlKHRoaXMsIGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfYWN0aXZhdGVNYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgX3Jlc2V0UG9zaXRpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZFBvc2l0aW9uKHRoaXMuX29sZFdQb3MpO1xyXG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9jdXJXUG9zLCB0aGlzLl9vbGRXUG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdWJFbWl0dGVyIChzdWJFbWl0dGVyKSB7XHJcbiAgICAgICAgdGhpcy5fc3ViRW1pdHRlcnMucHVzaChzdWJFbWl0dGVyKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTdWJFbWl0dGVyIChpZHgpIHtcclxuICAgICAgICB0aGlzLl9zdWJFbWl0dGVycy5zcGxpY2UodGhpcy5fc3ViRW1pdHRlcnMuaW5kZXhPZihpZHgpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCdXJzdCAoYnVyc3QpIHtcclxuICAgICAgICB0aGlzLmJ1cnN0cy5wdXNoKGJ1cnN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVCdXJzdCAoaWR4KSB7XHJcbiAgICAgICAgdGhpcy5idXJzdHMuc3BsaWNlKHRoaXMuYnVyc3RzLmluZGV4T2YoaWR4KSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2NoZWNrQmFjdGggKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1BsYXlpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzUGF1c2VkICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzU3RvcHBlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU3RvcHBlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNFbWl0dGluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW1pdHRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRpbWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5DQ19FRElUT1IgJiYgKFBhcnRpY2xlU3lzdGVtM0QucHJvdG90eXBlLl9vbkJlZm9yZVNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHByb3BzKXtyZXR1cm4gcHJvcHMuZmlsdGVyKHAgPT4gIV9tb2R1bGVfcHJvcHMuaW5jbHVkZXMocCkgfHwgdGhpc1twXS5lbmFibGUpO30pO1xyXG5cclxuY2MuUGFydGljbGVTeXN0ZW0zRCA9IFBhcnRpY2xlU3lzdGVtM0Q7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9