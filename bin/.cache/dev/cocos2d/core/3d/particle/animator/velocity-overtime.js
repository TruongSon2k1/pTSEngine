
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/velocity-overtime.js';
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

var _enum = require("../enum");

var _particleGeneralFunction = require("../particle-general-function");

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var VELOCITY_OVERTIME_RAND_OFFSET = 197866;

var _temp_v3 = cc.v3();
/**
 * !#en The velocity module of 3d particle.
 * !#zh 3D 粒子的速度模块
 * @class VelocityOvertimeModule
 */


var VelocityOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.VelocityOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.Space
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec6 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  /**
   * !#en The enable of VelocityOvertimeModule.
   * !#zh 是否启用
   * @property {Boolean} enable
   */

  /**
   * !#en Coordinate system used in speed calculation.
   * !#zh 速度计算时采用的坐标系。
   * @property {Space} space
   */

  /**
   * !#en Velocity component in X axis direction
   * !#zh X 轴方向上的速度分量。
   * @property {CurveRange} x
   */

  /**
   * !#en Velocity component in Y axis direction
   * !#zh Y 轴方向上的速度分量。
   * @property {CurveRange} y
   */

  /**
   * !#en Velocity component in Z axis direction
   * !#zh Z 轴方向上的速度分量。
   * @property {CurveRange} z
   */

  /**
   * !#en Speed correction factor (only supports CPU particles).
   * !#zh 速度修正系数（只支持 CPU 粒子）。
   * @property {CurveRange} speedModifier
   */
  function VelocityOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "space", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);

    _initializerDefineProperty(this, "speedModifier", _descriptor6, this);

    this.rotation = null;
    this.needTransform = false;
    this.rotation = new _valueTypes.Quat();
    this.speedModifier.constant = 1;
    this.needTransform = false;
  }

  var _proto = VelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = (0, _particleGeneralFunction.calculateTransform)(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    var vel = _valueTypes.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      _valueTypes.Vec3.transformQuat(vel, vel, this.rotation);
    }

    _valueTypes.Vec3.add(p.animatedVelocity, p.animatedVelocity, vel);

    _valueTypes.Vec3.add(p.ultimateVelocity, p.velocity, p.animatedVelocity);

    _valueTypes.Vec3.scale(p.ultimateVelocity, p.ultimateVelocity, this.speedModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)));
  };

  return VelocityOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "speedModifier", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = VelocityOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXHZlbG9jaXR5LW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIlZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiX3RlbXBfdjMiLCJjYyIsInYzIiwiVmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJyYW5nZSIsInJvdGF0aW9uIiwibmVlZFRyYW5zZm9ybSIsIlF1YXQiLCJzcGVlZE1vZGlmaWVyIiwiY29uc3RhbnQiLCJ1cGRhdGUiLCJzcGFjZSIsIndvcmxkVHJhbnNmb3JtIiwiYW5pbWF0ZSIsInAiLCJub3JtYWxpemVkVGltZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsInZlbCIsIlZlYzMiLCJzZXQiLCJ4IiwiZXZhbHVhdGUiLCJyYW5kb21TZWVkIiwieSIsInoiLCJ0cmFuc2Zvcm1RdWF0IiwiYWRkIiwiYW5pbWF0ZWRWZWxvY2l0eSIsInVsdGltYXRlVmVsb2NpdHkiLCJ2ZWxvY2l0eSIsInNjYWxlIiwicHJvcGVydHkiLCJMb2NhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLE1BQXRDOztBQUVBLElBQU1DLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxFQUFILEVBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBRXFCQyxpQ0FEcEIsK0JBQVEsMkJBQVIsV0FnQkksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FVQSxnQ0FBUztBQUNORCxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5DLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUw7QUFGRCxDQUFULFdBV0EsZ0NBQVM7QUFDTkgsRUFB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QUFJQSxzQkFBSjs7Ozs7OztXQVdZLElBQUlBLHNCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuaW1wb3J0IHsgcHNldWRvUmFuZG9tLCBRdWF0LCBWZWMzIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgeyBTcGFjZSB9IGZyb20gJy4uL2VudW0nO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVUcmFuc2Zvcm0gfSBmcm9tICcuLi9wYXJ0aWNsZS1nZW5lcmFsLWZ1bmN0aW9uJztcclxuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi9jdXJ2ZS1yYW5nZSc7XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmNvbnN0IFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUID0gMTk3ODY2O1xyXG5cclxuY29uc3QgX3RlbXBfdjMgPSBjYy52MygpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHZlbG9jaXR5IG1vZHVsZSBvZiAzZCBwYXJ0aWNsZS5cclxuICogISN6aCAzRCDnspLlrZDnmoTpgJ/luqbmqKHlnZdcclxuICogQGNsYXNzIFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGVcclxuICovXHJcbkBjY2NsYXNzKCdjYy5WZWxvY2l0eU92ZXJ0aW1lTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVsb2NpdHlPdmVydGltZU1vZHVsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbmFibGUgb2YgVmVsb2NpdHlPdmVydGltZU1vZHVsZS5cclxuICAgICAqICEjemgg5piv5ZCm5ZCv55SoXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb29yZGluYXRlIHN5c3RlbSB1c2VkIGluIHNwZWVkIGNhbGN1bGF0aW9uLlxyXG4gICAgICogISN6aCDpgJ/luqborqHnrpfml7bph4fnlKjnmoTlnZDmoIfns7vjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7U3BhY2V9IHNwYWNlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogU3BhY2UsXHJcbiAgICB9KVxyXG4gICAgc3BhY2UgPSBTcGFjZS5Mb2NhbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVmVsb2NpdHkgY29tcG9uZW50IGluIFggYXhpcyBkaXJlY3Rpb25cclxuICAgICAqICEjemggWCDovbTmlrnlkJHkuIrnmoTpgJ/luqbliIbph4/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0geFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXHJcbiAgICB9KVxyXG4gICAgeCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZlbG9jaXR5IGNvbXBvbmVudCBpbiBZIGF4aXMgZGlyZWN0aW9uXHJcbiAgICAgKiAhI3poIFkg6L205pa55ZCR5LiK55qE6YCf5bqm5YiG6YeP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHlcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIHkgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBWZWxvY2l0eSBjb21wb25lbnQgaW4gWiBheGlzIGRpcmVjdGlvblxyXG4gICAgICogISN6aCBaIOi9tOaWueWQkeS4iueahOmAn+W6puWIhumHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB6XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgICAgICByYW5nZTogWy0xLCAxXSxcclxuICAgIH0pXHJcbiAgICB6ID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3BlZWQgY29ycmVjdGlvbiBmYWN0b3IgKG9ubHkgc3VwcG9ydHMgQ1BVIHBhcnRpY2xlcykuXHJcbiAgICAgKiAhI3poIOmAn+W6puS/ruato+ezu+aVsO+8iOWPquaUr+aMgSBDUFUg57KS5a2Q77yJ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHNwZWVkTW9kaWZpZXJcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIHNwZWVkTW9kaWZpZXIgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIHJvdGF0aW9uID0gbnVsbDtcclxuICAgIG5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBRdWF0KCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyLmNvbnN0YW50ID0gMTtcclxuICAgICAgICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKHNwYWNlLCB3b3JsZFRyYW5zZm9ybSkge1xyXG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGNhbGN1bGF0ZVRyYW5zZm9ybShzcGFjZSwgdGhpcy5zcGFjZSwgd29ybGRUcmFuc2Zvcm0sIHRoaXMucm90YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUgKHApIHtcclxuICAgICAgICBjb25zdCBub3JtYWxpemVkVGltZSA9IDEgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lO1xyXG4gICAgICAgIGNvbnN0IHZlbCA9IFZlYzMuc2V0KF90ZW1wX3YzLCB0aGlzLnguZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBWRUxPQ0lUWV9PVkVSVElNRV9SQU5EX09GRlNFVCkpLCB0aGlzLnkuZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBWRUxPQ0lUWV9PVkVSVElNRV9SQU5EX09GRlNFVCkpLCB0aGlzLnouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBWRUxPQ0lUWV9PVkVSVElNRV9SQU5EX09GRlNFVCkpKTtcclxuICAgICAgICBpZiAodGhpcy5uZWVkVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdCh2ZWwsIHZlbCwgdGhpcy5yb3RhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlYzMuYWRkKHAuYW5pbWF0ZWRWZWxvY2l0eSwgcC5hbmltYXRlZFZlbG9jaXR5LCB2ZWwpO1xyXG4gICAgICAgIFZlYzMuYWRkKHAudWx0aW1hdGVWZWxvY2l0eSwgcC52ZWxvY2l0eSwgcC5hbmltYXRlZFZlbG9jaXR5KTtcclxuICAgICAgICBWZWMzLnNjYWxlKHAudWx0aW1hdGVWZWxvY2l0eSwgcC51bHRpbWF0ZVZlbG9jaXR5LCB0aGlzLnNwZWVkTW9kaWZpZXIuZXZhbHVhdGUoMSAtIHAucmVtYWluaW5nTGlmZXRpbWUgLyBwLnN0YXJ0TGlmZXRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBWRUxPQ0lUWV9PVkVSVElNRV9SQU5EX09GRlNFVCkpKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=