
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/limit-velocity-overtime.js';
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

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var LIMIT_VELOCITY_RAND_OFFSET = 23541;

var _temp_v3 = cc.v3();

var _temp_v3_1 = cc.v3();

function dampenBeyondLimit(vel, limit, dampen) {
  var sgn = Math.sign(vel);
  var abs = Math.abs(vel);

  if (abs > limit) {
    abs = (0, _valueTypes.lerp)(abs, limit, dampen);
  }

  return abs * sgn;
}
/**
 * !#en The limit velocity module of 3d particle.
 * !#zh 3D 粒子的限速模块
 * @class LimitVelocityOvertimeModule
 */


var LimitVelocityOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.LimitVelocityOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
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
   * !#en The enable of LimitVelocityOvertimeModule.
   * !#zh 是否启用
   * @property {Boolean} enable
   */

  /**
   * !#en The coordinate system used when calculating the lower speed limit.
   * !#zh 计算速度下限时采用的坐标系。
   * @property {Space} space
   */

  /**
   * !#en Whether to limit the three axes separately.
   * !#zh 是否三个轴分开限制。
   * @property {Boolean} separateAxes
   */

  /**
   * !#en Lower speed limit
   * !#zh 速度下限。
   * @property {CurveRange} limit
   */

  /**
   * !#en Lower speed limit in X direction.
   * !#zh X 轴方向上的速度下限。
   * @property {CurveRange} limitX
   */

  /**
   * !#en Lower speed limit in Y direction.
   * !#zh Y 轴方向上的速度下限。
   * @property {CurveRange} limitY
   */

  /**
   * !#en Lower speed limit in Z direction.
   * !#zh Z 轴方向上的速度下限。
   * @property {CurveRange} limitZ
   */

  /**
   * !#en Interpolation of current speed and lower speed limit.
   * !#zh 当前速度与速度下限的插值。
   * @property {Number} dampen
   */
  // TODO:functions related to drag are temporarily not supported
  function LimitVelocityOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "space", _descriptor2, this);

    _initializerDefineProperty(this, "separateAxes", _descriptor3, this);

    _initializerDefineProperty(this, "limit", _descriptor4, this);

    _initializerDefineProperty(this, "limitX", _descriptor5, this);

    _initializerDefineProperty(this, "limitY", _descriptor6, this);

    _initializerDefineProperty(this, "limitZ", _descriptor7, this);

    _initializerDefineProperty(this, "dampen", _descriptor8, this);

    this.drag = null;
    this.multiplyDragByParticleSize = false;
    this.multiplyDragByParticleVelocity = false;
    this.rotation = null;
    this.needTransform = false;
    this.rotation = new _valueTypes.Quat();
    this.needTransform = false;
  }

  var _proto = LimitVelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var dampedVel = _temp_v3;

    if (this.separateAxes) {
      _valueTypes.Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));

      if (this.needTransform) {
        _valueTypes.Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
      }

      _valueTypes.Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
    } else {
      _valueTypes.Vec3.normalize(dampedVel, p.ultimateVelocity);

      _valueTypes.Vec3.scale(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.len(), this.limit.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
    }

    _valueTypes.Vec3.copy(p.ultimateVelocity, dampedVel);
  };

  return LimitVelocityOvertimeModule;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "limitX", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "limitY", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "limitZ", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dampen", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3;
  }
})), _class2)) || _class);
exports["default"] = LimitVelocityOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXGxpbWl0LXZlbG9jaXR5LW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIkxJTUlUX1ZFTE9DSVRZX1JBTkRfT0ZGU0VUIiwiX3RlbXBfdjMiLCJjYyIsInYzIiwiX3RlbXBfdjNfMSIsImRhbXBlbkJleW9uZExpbWl0IiwidmVsIiwibGltaXQiLCJkYW1wZW4iLCJzZ24iLCJNYXRoIiwic2lnbiIsImFicyIsIkxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJyYW5nZSIsImRyYWciLCJtdWx0aXBseURyYWdCeVBhcnRpY2xlU2l6ZSIsIm11bHRpcGx5RHJhZ0J5UGFydGljbGVWZWxvY2l0eSIsInJvdGF0aW9uIiwibmVlZFRyYW5zZm9ybSIsIlF1YXQiLCJ1cGRhdGUiLCJzcGFjZSIsIndvcmxkVHJhbnNmb3JtIiwiY2FsY3VsYXRlVHJhbnNmb3JtIiwiYW5pbWF0ZSIsInAiLCJub3JtYWxpemVkVGltZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsImRhbXBlZFZlbCIsInNlcGFyYXRlQXhlcyIsIlZlYzMiLCJzZXQiLCJsaW1pdFgiLCJldmFsdWF0ZSIsInJhbmRvbVNlZWQiLCJsaW1pdFkiLCJsaW1pdFoiLCJ0cmFuc2Zvcm1RdWF0IiwidWx0aW1hdGVWZWxvY2l0eSIsIngiLCJ5IiwieiIsIm5vcm1hbGl6ZSIsInNjYWxlIiwibGVuIiwiY29weSIsInByb3BlcnR5IiwiTG9jYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSwwQkFBMEIsR0FBRyxLQUFuQzs7QUFFQSxJQUFNQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsRUFBSCxFQUFqQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUdGLEVBQUUsQ0FB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RkFoSEFrQjs7Ozs7V0FDUTs7Ozs7OztXQVVEcEMsWUFBTXFDOztpRkFPYkQ7Ozs7O1dBQ2M7Ozs7Ozs7V0FXUCxJQUFJbkMsc0JBQUo7Ozs7Ozs7V0FXQyxJQUFJQSxzQkFBSjs7Ozs7OztXQVdBLElBQUlBLHNCQUFKOzs7Ozs7O1dBV0EsSUFBSUEsc0JBQUo7OzJFQU9SbUM7Ozs7O1dBQ1EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InO1xyXG5pbXBvcnQgeyBsZXJwLCBwc2V1ZG9SYW5kb20sIFZlYzMsIFF1YXQgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCB7IFNwYWNlIH0gZnJvbSAnLi4vZW51bSc7XHJcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vY3VydmUtcmFuZ2UnO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGU6IG1heC1saW5lLWxlbmd0aFxyXG5jb25zdCBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCA9IDIzNTQxO1xyXG5cclxuY29uc3QgX3RlbXBfdjMgPSBjYy52MygpO1xyXG5jb25zdCBfdGVtcF92M18xID0gY2MudjMoKTtcclxuXHJcbmZ1bmN0aW9uIGRhbXBlbkJleW9uZExpbWl0ICh2ZWwsIGxpbWl0LCBkYW1wZW4pIHtcclxuICAgIGNvbnN0IHNnbiA9IE1hdGguc2lnbih2ZWwpO1xyXG4gICAgbGV0IGFicyA9IE1hdGguYWJzKHZlbCk7XHJcbiAgICBpZiAoYWJzID4gbGltaXQpIHtcclxuICAgICAgICBhYnMgPSBsZXJwKGFicywgbGltaXQsIGRhbXBlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWJzICogc2duO1xyXG59XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgbGltaXQgdmVsb2NpdHkgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxyXG4gKiAhI3poIDNEIOeykuWtkOeahOmZkOmAn+aooeWdl1xyXG4gKiBAY2xhc3MgTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlXHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGVuYWJsZSBvZiBMaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuXHJcbiAgICAgKiAhI3poIOaYr+WQpuWQr+eUqFxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBlbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGNvb3JkaW5hdGUgc3lzdGVtIHVzZWQgd2hlbiBjYWxjdWxhdGluZyB0aGUgbG93ZXIgc3BlZWQgbGltaXQuXHJcbiAgICAgKiAhI3poIOiuoeeul+mAn+W6puS4i+mZkOaXtumHh+eUqOeahOWdkOagh+ezu+OAglxyXG4gICAgICogQHByb3BlcnR5IHtTcGFjZX0gc3BhY2VcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBTcGFjZSxcclxuICAgIH0pXHJcbiAgICBzcGFjZSA9IFNwYWNlLkxvY2FsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIHRvIGxpbWl0IHRoZSB0aHJlZSBheGVzIHNlcGFyYXRlbHkuXHJcbiAgICAgKiAhI3poIOaYr+WQpuS4ieS4qui9tOWIhuW8gOmZkOWItuOAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBzZXBhcmF0ZUF4ZXNcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBzZXBhcmF0ZUF4ZXMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTG93ZXIgc3BlZWQgbGltaXRcclxuICAgICAqICEjemgg6YCf5bqm5LiL6ZmQ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGxpbWl0XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgICAgICByYW5nZTogWy0xLCAxXSxcclxuICAgIH0pXHJcbiAgICBsaW1pdCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExvd2VyIHNwZWVkIGxpbWl0IGluIFggZGlyZWN0aW9uLlxyXG4gICAgICogISN6aCBYIOi9tOaWueWQkeS4iueahOmAn+W6puS4i+mZkOOAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBsaW1pdFhcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIGxpbWl0WCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExvd2VyIHNwZWVkIGxpbWl0IGluIFkgZGlyZWN0aW9uLlxyXG4gICAgICogISN6aCBZIOi9tOaWueWQkeS4iueahOmAn+W6puS4i+mZkOOAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBsaW1pdFlcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIGxpbWl0WSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExvd2VyIHNwZWVkIGxpbWl0IGluIFogZGlyZWN0aW9uLlxyXG4gICAgICogISN6aCBaIOi9tOaWueWQkeS4iueahOmAn+W6puS4i+mZkOOAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBsaW1pdFpcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgfSlcclxuICAgIGxpbWl0WiA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEludGVycG9sYXRpb24gb2YgY3VycmVudCBzcGVlZCBhbmQgbG93ZXIgc3BlZWQgbGltaXQuXHJcbiAgICAgKiAhI3poIOW9k+WJjemAn+W6puS4jumAn+W6puS4i+mZkOeahOaPkuWAvOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGRhbXBlblxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGRhbXBlbiA9IDM7XHJcblxyXG4gICAgLy8gVE9ETzpmdW5jdGlvbnMgcmVsYXRlZCB0byBkcmFnIGFyZSB0ZW1wb3JhcmlseSBub3Qgc3VwcG9ydGVkXHJcbiAgICBkcmFnID0gbnVsbDtcclxuXHJcbiAgICBtdWx0aXBseURyYWdCeVBhcnRpY2xlU2l6ZSA9IGZhbHNlO1xyXG5cclxuICAgIG11bHRpcGx5RHJhZ0J5UGFydGljbGVWZWxvY2l0eSA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgcm90YXRpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBuZWVkVHJhbnNmb3JtID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSBuZXcgUXVhdCgpO1xyXG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoc3BhY2U6IG51bWJlciwgd29ybGRUcmFuc2Zvcm06IE1hdDQpIHtcclxuICAgICAgICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBjYWxjdWxhdGVUcmFuc2Zvcm0oc3BhY2UsIHRoaXMuc3BhY2UsIHdvcmxkVHJhbnNmb3JtLCB0aGlzLnJvdGF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlIChwKSB7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcclxuICAgICAgICBjb25zdCBkYW1wZWRWZWwgPSBfdGVtcF92MztcclxuICAgICAgICBpZiAodGhpcy5zZXBhcmF0ZUF4ZXMpIHtcclxuICAgICAgICAgICAgVmVjMy5zZXQoX3RlbXBfdjNfMSwgdGhpcy5saW1pdFguZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCkpISxcclxuICAgICAgICAgICAgdGhpcy5saW1pdFkuZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCkpISxcclxuICAgICAgICAgICAgdGhpcy5saW1pdFouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCkpISk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5lZWRUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChfdGVtcF92M18xLCBfdGVtcF92M18xLCB0aGlzLnJvdGF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBWZWMzLnNldChkYW1wZWRWZWwsXHJcbiAgICAgICAgICAgICAgICBkYW1wZW5CZXlvbmRMaW1pdChwLnVsdGltYXRlVmVsb2NpdHkueCwgX3RlbXBfdjNfMS54LCB0aGlzLmRhbXBlbiksXHJcbiAgICAgICAgICAgICAgICBkYW1wZW5CZXlvbmRMaW1pdChwLnVsdGltYXRlVmVsb2NpdHkueSwgX3RlbXBfdjNfMS55LCB0aGlzLmRhbXBlbiksXHJcbiAgICAgICAgICAgICAgICBkYW1wZW5CZXlvbmRMaW1pdChwLnVsdGltYXRlVmVsb2NpdHkueiwgX3RlbXBfdjNfMS56LCB0aGlzLmRhbXBlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGFtcGVkVmVsLCBwLnVsdGltYXRlVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBWZWMzLnNjYWxlKGRhbXBlZFZlbCwgZGFtcGVkVmVsLCBkYW1wZW5CZXlvbmRMaW1pdChwLnVsdGltYXRlVmVsb2NpdHkubGVuKCksIHRoaXMubGltaXQuZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCkpLCB0aGlzLmRhbXBlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLmNvcHkocC51bHRpbWF0ZVZlbG9jaXR5LCBkYW1wZWRWZWwpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=