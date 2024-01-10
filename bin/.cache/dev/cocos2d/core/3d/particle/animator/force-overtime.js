
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/force-overtime.js';
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

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var FORCE_OVERTIME_RAND_OFFSET = 212165;

var _temp_v3 = cc.v3();
/**
 * !#en The force over time module of 3d particle.
 * !#zh 3D 粒子的加速度模块
 * @class ForceOvertimeModule
 */


var ForceOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.ForceOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.Space
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  displayOrder: 4
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  /**
   * !#en The enable of ColorOvertimeModule.
   * !#zh 是否启用
   * @property {Boolean} enable
   */

  /**
   * !#en Coordinate system used in acceleration calculation.
   * !#zh 加速度计算时采用的坐标系。
   * @property {Space} space
   */

  /**
   * !#en X-axis acceleration component.
   * !#zh X 轴方向上的加速度分量。
   * @property {CurveRange} x
   */

  /**
   * !#en Y-axis acceleration component.
   * !#zh Y 轴方向上的加速度分量。
   * @property {CurveRange} y
   */

  /**
   * !#en Z-axis acceleration component.
   * !#zh Z 轴方向上的加速度分量。
   * @property {CurveRange} z
   */
  // TODO:currently not supported
  function ForceOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "space", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);

    this.randomized = false;
    this.rotation = null;
    this.needTransform = false;
    this.rotation = new _valueTypes.Quat();
    this.needTransform = false;
  }

  var _proto = ForceOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = (0, _particleGeneralFunction.calculateTransform)(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    var force = _valueTypes.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + FORCE_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      _valueTypes.Vec3.transformQuat(force, force, this.rotation);
    }

    _valueTypes.Vec3.scaleAndAdd(p.velocity, p.velocity, force, dt);
  };

  return ForceOvertimeModule;
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
})), _class2)) || _class);
exports["default"] = ForceOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXGZvcmNlLW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIkZPUkNFX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiX3RlbXBfdjMiLCJjYyIsInYzIiwiRm9yY2VPdmVydGltZU1vZHVsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJyYW5nZSIsImRpc3BsYXlPcmRlciIsInJhbmRvbWl6ZWQiLCJyb3RhdGlvbiIsIm5lZWRUcmFuc2Zvcm0iLCJRdWF0IiwidXBkYXRlIiwic3BhY2UiLCJ3b3JsZFRyYW5zZm9ybSIsImFuaW1hdGUiLCJwIiwiZHQiLCJub3JtYWxpemVkVGltZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsImZvcmNlIiwiVmVjMyIsInNldCIsIngiLCJldmFsdWF0ZSIsInJhbmRvbVNlZWQiLCJ5IiwieiIsInRyYW5zZm9ybVF1YXQiLCJzY2FsZUFuZEFkZCIsInZlbG9jaXR5IiwicHJvcGVydHkiLCJMb2NhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLDBCQUEwQixHQUFHLE1BQW5DOztBQUVBLElBQU1DLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxFQUFILEVBQWpCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBRXFCQyw4QkFEcEIsK0JBQVEsd0JBQVIsV0FnQkksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FVQSxnQ0FBUztBQUNORCxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5DLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUw7QUFGRCxDQUFULFdBV0EsZ0NBQVM7QUFDTkgsRUFBQUEsSUFBSSxFQUFFRSxzQkFEQTtBQUVOQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMO0FBRkQsQ0FBVCxXQVdBLGdDQUFTO0FBQ05ILEVBQUFBLElBQUksRUFBRUUsc0JBREE7QUFFTkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUZEO0FBR05DLEVBQUFBLFlBQVksRUFBRTtBQUhSLENBQVQ7QUE3Q0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFJSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQU1JO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBT0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFPSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBUUk7QUFNQSxpQ0FBZTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLFNBTGZDLFVBS2UsR0FMRixLQUtFO0FBQUEsU0FIZkMsUUFHZSxHQUhKLElBR0k7QUFBQSxTQUZmQyxhQUVlLEdBRkMsS0FFRDtBQUNYLFNBQUtELFFBQUwsR0FBZ0IsSUFBSUUsZ0JBQUosRUFBaEI7QUFDQSxTQUFLRCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0g7Ozs7U0FFREUsU0FBQSxnQkFBUUMsS0FBUixFQUFlQyxjQUFmLEVBQStCO0FBQzNCLFNBQUtKLGFBQUwsR0FBcUIsaURBQW1CRyxLQUFuQixFQUEwQixLQUFLQSxLQUEvQixFQUFzQ0MsY0FBdEMsRUFBc0QsS0FBS0wsUUFBM0QsQ0FBckI7QUFDSDs7U0FFRE0sVUFBQSxpQkFBU0MsQ0FBVCxFQUFZQyxFQUFaLEVBQWdCO0FBQ1osUUFBTUMsY0FBYyxHQUFHLElBQUlGLENBQUMsQ0FBQ0csaUJBQUYsR0FBc0JILENBQUMsQ0FBQ0ksYUFBbkQ7O0FBQ0EsUUFBTUMsS0FBSyxHQUFHQyxpQkFBS0MsR0FBTCxDQUFTeEIsUUFBVCxFQUFtQixLQUFLeUIsQ0FBTCxDQUFPQyxRQUFQLENBQWdCUCxjQUFoQixFQUFnQyw4QkFBYUYsQ0FBQyxDQUFDVSxVQUFGLEdBQWU1QiwwQkFBNUIsQ0FBaEMsQ0FBbkIsRUFBNkcsS0FBSzZCLENBQUwsQ0FBT0YsUUFBUCxDQUFnQlAsY0FBaEIsRUFBZ0MsOEJBQWFGLENBQUMsQ0FBQ1UsVUFBRixHQUFlNUIsMEJBQTVCLENBQWhDLENBQTdHLEVBQXVNLEtBQUs4QixDQUFMLENBQU9ILFFBQVAsQ0FBZ0JQLGNBQWhCLEVBQWdDLDhCQUFhRixDQUFDLENBQUNVLFVBQUYsR0FBZTVCLDBCQUE1QixDQUFoQyxDQUF2TSxDQUFkOztBQUNBLFFBQUksS0FBS1ksYUFBVCxFQUF3QjtBQUNwQlksdUJBQUtPLGFBQUwsQ0FBbUJSLEtBQW5CLEVBQTBCQSxLQUExQixFQUFpQyxLQUFLWixRQUF0QztBQUNIOztBQUNEYSxxQkFBS1EsV0FBTCxDQUFpQmQsQ0FBQyxDQUFDZSxRQUFuQixFQUE2QmYsQ0FBQyxDQUFDZSxRQUEvQixFQUF5Q1YsS0FBekMsRUFBZ0RKLEVBQWhEO0FBQ0g7OztvRkFyRUFlOzs7OztXQUNROzs7Ozs7O1dBVUQ1QixZQUFNNkI7Ozs7Ozs7V0FXVixJQUFJNUIsc0JBQUo7Ozs7Ozs7V0FXQSxJQUFJQSxzQkFBSjs7Ozs7OztXQVlBLElBQUlBLHNCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuaW1wb3J0IHsgcHNldWRvUmFuZG9tLCBRdWF0LCBWZWMzIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgeyBTcGFjZSB9IGZyb20gJy4uL2VudW0nO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVUcmFuc2Zvcm0gfSBmcm9tICcuLi9wYXJ0aWNsZS1nZW5lcmFsLWZ1bmN0aW9uJztcclxuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi9jdXJ2ZS1yYW5nZSc7XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmNvbnN0IEZPUkNFX09WRVJUSU1FX1JBTkRfT0ZGU0VUID0gMjEyMTY1O1xyXG5cclxuY29uc3QgX3RlbXBfdjMgPSBjYy52MygpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGZvcmNlIG92ZXIgdGltZSBtb2R1bGUgb2YgM2QgcGFydGljbGUuXHJcbiAqICEjemggM0Qg57KS5a2Q55qE5Yqg6YCf5bqm5qih5Z2XXHJcbiAqIEBjbGFzcyBGb3JjZU92ZXJ0aW1lTW9kdWxlXHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuRm9yY2VPdmVydGltZU1vZHVsZScpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcmNlT3ZlcnRpbWVNb2R1bGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIENvbG9yT3ZlcnRpbWVNb2R1bGUuXHJcbiAgICAgKiAhI3poIOaYr+WQpuWQr+eUqFxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBlbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ29vcmRpbmF0ZSBzeXN0ZW0gdXNlZCBpbiBhY2NlbGVyYXRpb24gY2FsY3VsYXRpb24uXHJcbiAgICAgKiAhI3poIOWKoOmAn+W6puiuoeeul+aXtumHh+eUqOeahOWdkOagh+ezu+OAglxyXG4gICAgICogQHByb3BlcnR5IHtTcGFjZX0gc3BhY2VcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBTcGFjZSxcclxuICAgIH0pXHJcbiAgICBzcGFjZSA9IFNwYWNlLkxvY2FsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBYLWF4aXMgYWNjZWxlcmF0aW9uIGNvbXBvbmVudC5cclxuICAgICAqICEjemggWCDovbTmlrnlkJHkuIrnmoTliqDpgJ/luqbliIbph4/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0geFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXHJcbiAgICB9KVxyXG4gICAgeCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFktYXhpcyBhY2NlbGVyYXRpb24gY29tcG9uZW50LlxyXG4gICAgICogISN6aCBZIOi9tOaWueWQkeS4iueahOWKoOmAn+W6puWIhumHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB5XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgICAgICByYW5nZTogWy0xLCAxXSxcclxuICAgIH0pXHJcbiAgICB5ID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gWi1heGlzIGFjY2VsZXJhdGlvbiBjb21wb25lbnQuXHJcbiAgICAgKiAhI3poIFog6L205pa55ZCR5LiK55qE5Yqg6YCf5bqm5YiG6YeP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHpcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogNCxcclxuICAgIH0pXHJcbiAgICB6ID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvLyBUT0RPOmN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXHJcbiAgICByYW5kb21pemVkID0gZmFsc2U7XHJcblxyXG4gICAgcm90YXRpb24gPSBudWxsO1xyXG4gICAgbmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gbmV3IFF1YXQoKTtcclxuICAgICAgICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKHNwYWNlLCB3b3JsZFRyYW5zZm9ybSkge1xyXG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGNhbGN1bGF0ZVRyYW5zZm9ybShzcGFjZSwgdGhpcy5zcGFjZSwgd29ybGRUcmFuc2Zvcm0sIHRoaXMucm90YXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGUgKHAsIGR0KSB7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcclxuICAgICAgICBjb25zdCBmb3JjZSA9IFZlYzMuc2V0KF90ZW1wX3YzLCB0aGlzLnguZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBGT1JDRV9PVkVSVElNRV9SQU5EX09GRlNFVCkpLCB0aGlzLnkuZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBGT1JDRV9PVkVSVElNRV9SQU5EX09GRlNFVCkpLCB0aGlzLnouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBGT1JDRV9PVkVSVElNRV9SQU5EX09GRlNFVCkpKTtcclxuICAgICAgICBpZiAodGhpcy5uZWVkVHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChmb3JjZSwgZm9yY2UsIHRoaXMucm90YXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLnNjYWxlQW5kQWRkKHAudmVsb2NpdHksIHAudmVsb2NpdHksIGZvcmNlLCBkdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9