
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/rotation-overtime.js';
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

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var ROTATION_OVERTIME_RAND_OFFSET = 125292;
/**
 * !#en The rotation module of 3d particle.
 * !#zh 3D 粒子的旋转模块
 * @class RotationOvertimeModule
 */

var RotationOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.RotationOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function RotationOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "_separateAxes", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);
  }

  var _proto = RotationOvertimeModule.prototype;

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    if (!this._separateAxes) {
      p.rotation.x += this.z.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET)) * dt;
    } else {
      // TODO: separateAxes is temporarily not supported!
      var rotationRand = (0, _valueTypes.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
      p.rotation.x += this.x.evaluate(normalizedTime, rotationRand) * dt;
      p.rotation.y += this.y.evaluate(normalizedTime, rotationRand) * dt;
      p.rotation.z += this.z.evaluate(normalizedTime, rotationRand) * dt;
    }
  };

  _createClass(RotationOvertimeModule, [{
    key: "separateAxes",
    get:
    /**
     * !#en The enable of RotationOvertimeModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */

    /**
     * !#en Whether to set the rotation of three axes separately (not currently supported)
     * !#zh 是否三个轴分开设定旋转（暂不支持）。
     * @property {Boolean} separateAxes
     */
    function get() {
      return this._separateAxes;
    },
    set: function set(val) {
      if (!val) {
        this._separateAxes = val;
      } else {
        console.error('rotation overtime separateAxes is not supported!');
      }
    }
    /**
     * !#en Set rotation around X axis.
     * !#zh 绕 X 轴设定旋转。
     * @property {CurveRange} x
     */

  }]);

  return RotationOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_separateAxes", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "separateAxes"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = RotationOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXHJvdGF0aW9uLW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIlJPVEFUSU9OX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiUm90YXRpb25PdmVydGltZU1vZHVsZSIsInR5cGUiLCJDdXJ2ZVJhbmdlIiwicmFuZ2UiLCJyYWRpYW4iLCJhbmltYXRlIiwicCIsImR0Iiwibm9ybWFsaXplZFRpbWUiLCJyZW1haW5pbmdMaWZldGltZSIsInN0YXJ0TGlmZXRpbWUiLCJfc2VwYXJhdGVBeGVzIiwicm90YXRpb24iLCJ4IiwieiIsImV2YWx1YXRlIiwicmFuZG9tU2VlZCIsInJvdGF0aW9uUmFuZCIsInkiLCJ2YWwiLCJjb25zb2xlIiwiZXJyb3IiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSw2QkFBNkIsR0FBRyxNQUF0QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQyxpQ0FEcEIsK0JBQVEsMkJBQVIsV0FzQ0ksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFQyxzQkFEQTtBQUVOQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBRkQ7QUFHTkMsRUFBQUEsTUFBTSxFQUFFO0FBSEYsQ0FBVCxXQVlBLGdDQUFTO0FBQ05ILEVBQUFBLElBQUksRUFBRUMsc0JBREE7QUFFTkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUZEO0FBR05DLEVBQUFBLE1BQU0sRUFBRTtBQUhGLENBQVQsV0FZQSxnQ0FBUztBQUNOSCxFQUFBQSxJQUFJLEVBQUVDLHNCQURBO0FBRU5DLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FGRDtBQUdOQyxFQUFBQSxNQUFNLEVBQUU7QUFIRixDQUFUO0FBT0Qsb0NBQWU7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUVkOzs7O1NBRURDLFVBQUEsaUJBQVNDLENBQVQsRUFBWUMsRUFBWixFQUFnQjtBQUNaLFFBQU1DLGNBQWMsR0FBRyxJQUFJRixDQUFDLENBQUNHLGlCQUFGLEdBQXNCSCxDQUFDLENBQUNJLGFBQW5EOztBQUNBLFFBQUksQ0FBQyxLQUFLQyxhQUFWLEVBQXlCO0FBQ3JCTCxNQUFBQSxDQUFDLENBQUNNLFFBQUYsQ0FBV0MsQ0FBWCxJQUFnQixLQUFLQyxDQUFMLENBQU9DLFFBQVAsQ0FBZ0JQLGNBQWhCLEVBQWdDLDhCQUFhRixDQUFDLENBQUNVLFVBQUYsR0FBZWpCLDZCQUE1QixDQUFoQyxJQUE4RlEsRUFBOUc7QUFDSCxLQUZELE1BR0s7QUFDRDtBQUNBLFVBQU1VLFlBQVksR0FBRyw4QkFBYVgsQ0FBQyxDQUFDVSxVQUFGLEdBQWVqQiw2QkFBNUIsQ0FBckI7QUFDQU8sTUFBQUEsQ0FBQyxDQUFDTSxRQUFGLENBQVdDLENBQVgsSUFBZ0IsS0FBS0EsQ0FBTCxDQUFPRSxRQUFQLENBQWdCUCxjQUFoQixFQUFnQ1MsWUFBaEMsSUFBZ0RWLEVBQWhFO0FBQ0FELE1BQUFBLENBQUMsQ0FBQ00sUUFBRixDQUFXTSxDQUFYLElBQWdCLEtBQUtBLENBQUwsQ0FBT0gsUUFBUCxDQUFnQlAsY0FBaEIsRUFBZ0NTLFlBQWhDLElBQWdEVixFQUFoRTtBQUNBRCxNQUFBQSxDQUFDLENBQUNNLFFBQUYsQ0FBV0UsQ0FBWCxJQUFnQixLQUFLQSxDQUFMLENBQU9DLFFBQVAsQ0FBZ0JQLGNBQWhCLEVBQWdDUyxZQUFoQyxJQUFnRFYsRUFBaEU7QUFDSDtBQUNKOzs7OztBQWxGRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQU9JO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFDb0I7QUFDaEIsYUFBTyxLQUFLSSxhQUFaO0FBQ0g7U0FFRCxhQUFrQlEsR0FBbEIsRUFBdUI7QUFDbkIsVUFBSSxDQUFDQSxHQUFMLEVBQVU7QUFDTixhQUFLUixhQUFMLEdBQXFCUSxHQUFyQjtBQUNILE9BRkQsTUFHSztBQUNEQyxRQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYyxrREFBZDtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7OztvRkE3QktDOzs7OztXQUNROztrRkFFUkE7Ozs7O1dBQ2U7O2tFQU9mQTs7Ozs7V0F3QkcsSUFBSXBCLHNCQUFKOzs7Ozs7O1dBWUEsSUFBSUEsc0JBQUo7Ozs7Ozs7V0FZQSxJQUFJQSxzQkFBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XHJcbmltcG9ydCB7IHBzZXVkb1JhbmRvbSB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi9jdXJ2ZS1yYW5nZSc7XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXHJcbmNvbnN0IFJPVEFUSU9OX09WRVJUSU1FX1JBTkRfT0ZGU0VUID0gMTI1MjkyO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHJvdGF0aW9uIG1vZHVsZSBvZiAzZCBwYXJ0aWNsZS5cclxuICogISN6aCAzRCDnspLlrZDnmoTml4vovazmqKHlnZdcclxuICogQGNsYXNzIFJvdGF0aW9uT3ZlcnRpbWVNb2R1bGVcclxuICovXHJcbkBjY2NsYXNzKCdjYy5Sb3RhdGlvbk92ZXJ0aW1lTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRpb25PdmVydGltZU1vZHVsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbmFibGUgb2YgUm90YXRpb25PdmVydGltZU1vZHVsZS5cclxuICAgICAqICEjemgg5piv5ZCm5ZCv55SoXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGVuYWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3NlcGFyYXRlQXhlcyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIHRvIHNldCB0aGUgcm90YXRpb24gb2YgdGhyZWUgYXhlcyBzZXBhcmF0ZWx5IChub3QgY3VycmVudGx5IHN1cHBvcnRlZClcclxuICAgICAqICEjemgg5piv5ZCm5LiJ5Liq6L205YiG5byA6K6+5a6a5peL6L2s77yI5pqC5LiN5pSv5oyB77yJ44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHNlcGFyYXRlQXhlc1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzZXBhcmF0ZUF4ZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZXBhcmF0ZUF4ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlcGFyYXRlQXhlcyAodmFsKSB7XHJcbiAgICAgICAgaWYgKCF2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VwYXJhdGVBeGVzID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncm90YXRpb24gb3ZlcnRpbWUgc2VwYXJhdGVBeGVzIGlzIG5vdCBzdXBwb3J0ZWQhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgcm90YXRpb24gYXJvdW5kIFggYXhpcy5cclxuICAgICAqICEjemgg57uVIFgg6L206K6+5a6a5peL6L2s44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHhcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxyXG4gICAgICAgIHJhZGlhbjogdHJ1ZSxcclxuICAgIH0pXHJcbiAgICB4ID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHJvdGF0aW9uIGFyb3VuZCBZIGF4aXMuXHJcbiAgICAgKiAhI3poIOe7lSBZIOi9tOiuvuWumuaXi+i9rOOAglxyXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB5XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcclxuICAgICAgICByYW5nZTogWy0xLCAxXSxcclxuICAgICAgICByYWRpYW46IHRydWUsXHJcbiAgICB9KVxyXG4gICAgeSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCByb3RhdGlvbiBhcm91bmQgWiBheGlzLlxyXG4gICAgICogISN6aCDnu5UgWiDovbTorr7lrprml4vovazjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gelxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXHJcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXHJcbiAgICAgICAgcmFkaWFuOiB0cnVlLFxyXG4gICAgfSlcclxuICAgIHogPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSAocCwgZHQpIHtcclxuICAgICAgICBjb25zdCBub3JtYWxpemVkVGltZSA9IDEgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lO1xyXG4gICAgICAgIGlmICghdGhpcy5fc2VwYXJhdGVBeGVzKSB7XHJcbiAgICAgICAgICAgIHAucm90YXRpb24ueCArPSB0aGlzLnouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBST1RBVElPTl9PVkVSVElNRV9SQU5EX09GRlNFVCkpICogZHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBzZXBhcmF0ZUF4ZXMgaXMgdGVtcG9yYXJpbHkgbm90IHN1cHBvcnRlZCFcclxuICAgICAgICAgICAgY29uc3Qgcm90YXRpb25SYW5kID0gcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFJPVEFUSU9OX09WRVJUSU1FX1JBTkRfT0ZGU0VUKTtcclxuICAgICAgICAgICAgcC5yb3RhdGlvbi54ICs9IHRoaXMueC5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcm90YXRpb25SYW5kKSAqIGR0O1xyXG4gICAgICAgICAgICBwLnJvdGF0aW9uLnkgKz0gdGhpcy55LmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCByb3RhdGlvblJhbmQpICogZHQ7XHJcbiAgICAgICAgICAgIHAucm90YXRpb24ueiArPSB0aGlzLnouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHJvdGF0aW9uUmFuZCkgKiBkdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=