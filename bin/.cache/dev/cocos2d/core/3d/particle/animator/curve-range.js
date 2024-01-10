
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/curve-range.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = exports.Mode = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _curve = require("../curve");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var SerializableTable = CC_EDITOR && [["mode", "constant", "multiplier"], ["mode", "curve", "multiplier"], ["mode", "curveMin", "curveMax", "multiplier"], ["mode", "constantMin", "constantMax", "multiplier"]];
var Mode = (0, _CCEnum["default"])({
  Constant: 0,
  Curve: 1,
  TwoCurves: 2,
  TwoConstants: 3
});
/**
 * !#en The curve range of target value.
 * !#zh 目标值的曲线范围
 * @class CurveRange
 */

exports.Mode = Mode;
var CurveRange = (_dec = (0, _CCClassDecorator.ccclass)('cc.CurveRange'), _dec2 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  /**
   * !#en Curve type.
   * !#zh 曲线类型。
   * @property {Mode} mode
   */

  /**
   * !#en The curve to use when mode is Curve.
   * !#zh 当 mode 为 Curve 时，使用的曲线。
   * @property {AnimationCurve} curve
   */

  /**
   * !#en The lower limit of the curve to use when mode is TwoCurves
   * !#zh 当 mode 为 TwoCurves 时，使用的曲线下限。
   * @property {AnimationCurve} curveMin
   */

  /**
   * !#en The upper limit of the curve to use when mode is TwoCurves
   * !#zh 当 mode 为 TwoCurves 时，使用的曲线上限。
   * @property {AnimationCurve} curveMax
   */

  /**
   * !#en When mode is Constant, the value of the curve.
   * !#zh 当 mode 为 Constant 时，曲线的值。
   * @property {Number} constant
   */

  /**
   * !#en The lower limit of the curve to use when mode is TwoConstants
   * !#zh 当 mode 为 TwoConstants 时，曲线的下限。
   * @property {Number} constantMin
   */

  /**
   * !#en The upper limit of the curve to use when mode is TwoConstants
   * !#zh 当 mode 为 TwoConstants 时，曲线的上限。
   * @property {Number} constantMax
   */

  /**
   * !#en Coefficients applied to curve interpolation.
   * !#zh 应用于曲线插值的系数。
   * @property {Number} multiplier
   */
  function CurveRange() {
    _initializerDefineProperty(this, "mode", _descriptor, this);

    _initializerDefineProperty(this, "curve", _descriptor2, this);

    _initializerDefineProperty(this, "curveMin", _descriptor3, this);

    _initializerDefineProperty(this, "curveMax", _descriptor4, this);

    _initializerDefineProperty(this, "constant", _descriptor5, this);

    _initializerDefineProperty(this, "constantMin", _descriptor6, this);

    _initializerDefineProperty(this, "constantMax", _descriptor7, this);

    _initializerDefineProperty(this, "multiplier", _descriptor8, this);
  }

  var _proto = CurveRange.prototype;

  _proto.evaluate = function evaluate(time, rndRatio) {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.curve.evaluate(time) * this.multiplier;

      case Mode.TwoCurves:
        return (0, _valueTypes.lerp)(this.curveMin.evaluate(time), this.curveMax.evaluate(time), rndRatio) * this.multiplier;

      case Mode.TwoConstants:
        return (0, _valueTypes.lerp)(this.constantMin, this.constantMax, rndRatio);
    }
  };

  _proto.getMax = function getMax() {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.multiplier;

      case Mode.TwoConstants:
        return this.constantMax;

      case Mode.TwoCurves:
        return this.multiplier;
    }

    return 0;
  };

  return CurveRange;
}(), _class3.Mode = Mode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Constant;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "curve", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "curveMin", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "curveMax", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "constant", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "constantMin", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "constantMax", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "multiplier", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class2)) || _class);
exports["default"] = CurveRange;
CC_EDITOR && (CurveRange.prototype._onBeforeSerialize = function (props) {
  return SerializableTable[this.mode];
});
cc.CurveRange = CurveRange;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXGN1cnZlLXJhbmdlLnRzIl0sIm5hbWVzIjpbIlNlcmlhbGl6YWJsZVRhYmxlIiwiQ0NfRURJVE9SIiwiTW9kZSIsIkNvbnN0YW50IiwiQ3VydmUiLCJUd29DdXJ2ZXMiLCJUd29Db25zdGFudHMiLCJDdXJ2ZVJhbmdlIiwidHlwZSIsIkFuaW1hdGlvbkN1cnZlIiwiZXZhbHVhdGUiLCJ0aW1lIiwicm5kUmF0aW8iLCJtb2RlIiwiY29uc3RhbnQiLCJjdXJ2ZSIsIm11bHRpcGxpZXIiLCJjdXJ2ZU1pbiIsImN1cnZlTWF4IiwiY29uc3RhbnRNaW4iLCJjb25zdGFudE1heCIsImdldE1heCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiX29uQmVmb3JlU2VyaWFsaXplIiwicHJvcHMiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsR0FBR0MsU0FBUyxJQUFJLENBQ25DLENBQUUsTUFBRixFQUFVLFVBQVYsRUFBc0IsWUFBdEIsQ0FEbUMsRUFFbkMsQ0FBRSxNQUFGLEVBQVUsT0FBVixFQUFtQixZQUFuQixDQUZtQyxFQUduQyxDQUFFLE1BQUYsRUFBVSxVQUFWLEVBQXNCLFVBQXRCLEVBQWtDLFlBQWxDLENBSG1DLEVBSW5DLENBQUUsTUFBRixFQUFVLGFBQVYsRUFBeUIsYUFBekIsRUFBd0MsWUFBeEMsQ0FKbUMsQ0FBdkM7QUFPTyxJQUFNQyxJQUFJLEdBQUcsd0JBQUs7QUFDckJDLEVBQUFBLFFBQVEsRUFBRSxDQURXO0FBRXJCQyxFQUFBQSxLQUFLLEVBQUUsQ0FGYztBQUdyQkMsRUFBQUEsU0FBUyxFQUFFLENBSFU7QUFJckJDLEVBQUFBLFlBQVksRUFBRTtBQUpPLENBQUwsQ0FBYjtBQU9QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztJQUVxQkMscUJBRHBCLCtCQUFRLGVBQVIsV0FTSSxnQ0FBUztBQUNOQyxFQUFBQSxJQUFJLEVBQUVOO0FBREEsQ0FBVCxXQVVBLGdDQUFTO0FBQ05NLEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFULFdBVUEsZ0NBQVM7QUFDTkQsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FVQSxnQ0FBUztBQUNORCxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVDtBQW5DRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQU1JO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBTUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFNSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQU1JO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBSUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFLSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUlJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFJSSx3QkFBZTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBRWQ7Ozs7U0FFREMsV0FBQSxrQkFBVUMsSUFBVixFQUFnQkMsUUFBaEIsRUFBMEI7QUFDdEIsWUFBUSxLQUFLQyxJQUFiO0FBQ0ksV0FBS1gsSUFBSSxDQUFDQyxRQUFWO0FBQ0ksZUFBTyxLQUFLVyxRQUFaOztBQUNKLFdBQUtaLElBQUksQ0FBQ0UsS0FBVjtBQUNJLGVBQU8sS0FBS1csS0FBTCxDQUFXTCxRQUFYLENBQW9CQyxJQUFwQixJQUE0QixLQUFLSyxVQUF4Qzs7QUFDSixXQUFLZCxJQUFJLENBQUNHLFNBQVY7QUFDSSxlQUFPLHNCQUFLLEtBQUtZLFFBQUwsQ0FBY1AsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBTCxFQUFtQyxLQUFLTyxRQUFMLENBQWNSLFFBQWQsQ0FBdUJDLElBQXZCLENBQW5DLEVBQWlFQyxRQUFqRSxJQUE2RSxLQUFLSSxVQUF6Rjs7QUFDSixXQUFLZCxJQUFJLENBQUNJLFlBQVY7QUFDSSxlQUFPLHNCQUFLLEtBQUthLFdBQVYsRUFBdUIsS0FBS0MsV0FBNUIsRUFBeUNSLFFBQXpDLENBQVA7QUFSUjtBQVVIOztTQUVEUyxTQUFBLGtCQUFVO0FBQ04sWUFBUSxLQUFLUixJQUFiO0FBQ0ksV0FBS1gsSUFBSSxDQUFDQyxRQUFWO0FBQ0ksZUFBTyxLQUFLVyxRQUFaOztBQUNKLFdBQUtaLElBQUksQ0FBQ0UsS0FBVjtBQUNJLGVBQU8sS0FBS1ksVUFBWjs7QUFDSixXQUFLZCxJQUFJLENBQUNJLFlBQVY7QUFDSSxlQUFPLEtBQUtjLFdBQVo7O0FBQ0osV0FBS2xCLElBQUksQ0FBQ0csU0FBVjtBQUNJLGVBQU8sS0FBS1csVUFBWjtBQVJSOztBQVVBLFdBQU8sQ0FBUDtBQUNIOzs7YUF4R01kLE9BQU9BOzs7OztXQVVQQSxJQUFJLENBQUNDOzs7Ozs7O1dBVUosSUFBSU0scUJBQUo7Ozs7Ozs7V0FVRyxJQUFJQSxxQkFBSjs7Ozs7OztXQVVBLElBQUlBLHFCQUFKOzs2RUFPVmE7Ozs7O1dBQ1U7O2dGQU9WQTs7Ozs7V0FDYTs7Z0ZBUWJBOzs7OztXQUNhOzsrRUFPYkE7Ozs7O1dBQ1k7Ozs7QUFrQ2pCckIsU0FBUyxLQUFLTSxVQUFVLENBQUNnQixTQUFYLENBQXFCQyxrQkFBckIsR0FBMEMsVUFBU0MsS0FBVCxFQUFlO0FBQUMsU0FBT3pCLGlCQUFpQixDQUFDLEtBQUthLElBQU4sQ0FBeEI7QUFBcUMsQ0FBcEcsQ0FBVDtBQUVBYSxFQUFFLENBQUNuQixVQUFILEdBQWdCQSxVQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XHJcbmltcG9ydCBFbnVtICBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0VudW0nO1xyXG5pbXBvcnQgeyBsZXJwIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gJy4uL2N1cnZlJztcclxuXHJcbmNvbnN0IFNlcmlhbGl6YWJsZVRhYmxlID0gQ0NfRURJVE9SICYmIFtcclxuICAgIFsgXCJtb2RlXCIsIFwiY29uc3RhbnRcIiwgXCJtdWx0aXBsaWVyXCIgXSxcclxuICAgIFsgXCJtb2RlXCIsIFwiY3VydmVcIiwgXCJtdWx0aXBsaWVyXCIgXSxcclxuICAgIFsgXCJtb2RlXCIsIFwiY3VydmVNaW5cIiwgXCJjdXJ2ZU1heFwiLCBcIm11bHRpcGxpZXJcIiBdLFxyXG4gICAgWyBcIm1vZGVcIiwgXCJjb25zdGFudE1pblwiLCBcImNvbnN0YW50TWF4XCIsIFwibXVsdGlwbGllclwiXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vZGUgPSBFbnVtKHtcclxuICAgIENvbnN0YW50OiAwLFxyXG4gICAgQ3VydmU6IDEsXHJcbiAgICBUd29DdXJ2ZXM6IDIsXHJcbiAgICBUd29Db25zdGFudHM6IDMsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGN1cnZlIHJhbmdlIG9mIHRhcmdldCB2YWx1ZS5cclxuICogISN6aCDnm67moIflgLznmoTmm7Lnur/ojIPlm7RcclxuICogQGNsYXNzIEN1cnZlUmFuZ2VcclxuICovXHJcbkBjY2NsYXNzKCdjYy5DdXJ2ZVJhbmdlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VydmVSYW5nZSB7XHJcbiAgICBzdGF0aWMgTW9kZSA9IE1vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEN1cnZlIHR5cGUuXHJcbiAgICAgKiAhI3poIOabsue6v+exu+Wei+OAglxyXG4gICAgICogQHByb3BlcnR5IHtNb2RlfSBtb2RlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogTW9kZSxcclxuICAgIH0pXHJcbiAgICBtb2RlID0gTW9kZS5Db25zdGFudDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGN1cnZlIHRvIHVzZSB3aGVuIG1vZGUgaXMgQ3VydmUuXHJcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBDdXJ2ZSDml7bvvIzkvb/nlKjnmoTmm7Lnur/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7QW5pbWF0aW9uQ3VydmV9IGN1cnZlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQW5pbWF0aW9uQ3VydmUsXHJcbiAgICB9KVxyXG4gICAgY3VydmUgPSBuZXcgQW5pbWF0aW9uQ3VydmUoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGxvd2VyIGxpbWl0IG9mIHRoZSBjdXJ2ZSB0byB1c2Ugd2hlbiBtb2RlIGlzIFR3b0N1cnZlc1xyXG4gICAgICogISN6aCDlvZMgbW9kZSDkuLogVHdvQ3VydmVzIOaXtu+8jOS9v+eUqOeahOabsue6v+S4i+mZkOOAglxyXG4gICAgICogQHByb3BlcnR5IHtBbmltYXRpb25DdXJ2ZX0gY3VydmVNaW5cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBBbmltYXRpb25DdXJ2ZSxcclxuICAgIH0pXHJcbiAgICBjdXJ2ZU1pbiA9IG5ldyBBbmltYXRpb25DdXJ2ZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdXBwZXIgbGltaXQgb2YgdGhlIGN1cnZlIHRvIHVzZSB3aGVuIG1vZGUgaXMgVHdvQ3VydmVzXHJcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29DdXJ2ZXMg5pe277yM5L2/55So55qE5puy57q/5LiK6ZmQ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0FuaW1hdGlvbkN1cnZlfSBjdXJ2ZU1heFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEFuaW1hdGlvbkN1cnZlLFxyXG4gICAgfSlcclxuICAgIGN1cnZlTWF4ID0gbmV3IEFuaW1hdGlvbkN1cnZlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFdoZW4gbW9kZSBpcyBDb25zdGFudCwgdGhlIHZhbHVlIG9mIHRoZSBjdXJ2ZS5cclxuICAgICAqICEjemgg5b2TIG1vZGUg5Li6IENvbnN0YW50IOaXtu+8jOabsue6v+eahOWAvOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvbnN0YW50XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgY29uc3RhbnQgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbG93ZXIgbGltaXQgb2YgdGhlIGN1cnZlIHRvIHVzZSB3aGVuIG1vZGUgaXMgVHdvQ29uc3RhbnRzXHJcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29Db25zdGFudHMg5pe277yM5puy57q/55qE5LiL6ZmQ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY29uc3RhbnRNaW5cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBjb25zdGFudE1pbiA9IDA7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdXBwZXIgbGltaXQgb2YgdGhlIGN1cnZlIHRvIHVzZSB3aGVuIG1vZGUgaXMgVHdvQ29uc3RhbnRzXHJcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29Db25zdGFudHMg5pe277yM5puy57q/55qE5LiK6ZmQ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY29uc3RhbnRNYXhcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBjb25zdGFudE1heCA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvZWZmaWNpZW50cyBhcHBsaWVkIHRvIGN1cnZlIGludGVycG9sYXRpb24uXHJcbiAgICAgKiAhI3poIOW6lOeUqOS6juabsue6v+aPkuWAvOeahOezu+aVsOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG11bHRpcGxpZXJcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBtdWx0aXBsaWVyID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRlICh0aW1lLCBybmRSYXRpbykge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTW9kZS5Db25zdGFudDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0YW50O1xyXG4gICAgICAgICAgICBjYXNlIE1vZGUuQ3VydmU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJ2ZS5ldmFsdWF0ZSh0aW1lKSAqIHRoaXMubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgY2FzZSBNb2RlLlR3b0N1cnZlczpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZXJwKHRoaXMuY3VydmVNaW4uZXZhbHVhdGUodGltZSksIHRoaXMuY3VydmVNYXguZXZhbHVhdGUodGltZSksIHJuZFJhdGlvKSAqIHRoaXMubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgY2FzZSBNb2RlLlR3b0NvbnN0YW50czpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZXJwKHRoaXMuY29uc3RhbnRNaW4sIHRoaXMuY29uc3RhbnRNYXgsIHJuZFJhdGlvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4ICgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xyXG4gICAgICAgICAgICBjYXNlIE1vZGUuQ29uc3RhbnQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdGFudDtcclxuICAgICAgICAgICAgY2FzZSBNb2RlLkN1cnZlOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgY2FzZSBNb2RlLlR3b0NvbnN0YW50czpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0YW50TWF4O1xyXG4gICAgICAgICAgICBjYXNlIE1vZGUuVHdvQ3VydmVzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbkNDX0VESVRPUiAmJiAoQ3VydmVSYW5nZS5wcm90b3R5cGUuX29uQmVmb3JlU2VyaWFsaXplID0gZnVuY3Rpb24ocHJvcHMpe3JldHVybiBTZXJpYWxpemFibGVUYWJsZVt0aGlzLm1vZGVdO30pO1xyXG5cclxuY2MuQ3VydmVSYW5nZSA9IEN1cnZlUmFuZ2U7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9