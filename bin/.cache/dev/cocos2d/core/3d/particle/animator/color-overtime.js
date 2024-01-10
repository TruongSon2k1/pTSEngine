
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/color-overtime.js';
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

var _gradientRange = _interopRequireDefault(require("./gradient-range"));

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var COLOR_OVERTIME_RAND_OFFSET = 91041;
/**
 * !#en The color over time module of 3d particle.
 * !#zh 3D 粒子颜色变化模块
 * @class ColorOvertimeModule
 */

var ColorOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.ColorOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function ColorOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "color", _descriptor2, this);
  }

  var _proto = ColorOvertimeModule.prototype;

  _proto.animate = function animate(particle) {
    if (this.enable) {
      particle.color.set(particle.startColor);
      particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, (0, _valueTypes.pseudoRandom)(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
    }
  };

  return ColorOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = ColorOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXGNvbG9yLW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIkNPTE9SX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiQ29sb3JPdmVydGltZU1vZHVsZSIsInR5cGUiLCJHcmFkaWVudFJhbmdlIiwiYW5pbWF0ZSIsInBhcnRpY2xlIiwiZW5hYmxlIiwiY29sb3IiLCJzZXQiLCJzdGFydENvbG9yIiwibXVsdGlwbHkiLCJldmFsdWF0ZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsInJhbmRvbVNlZWQiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSwwQkFBMEIsR0FBRyxLQUFuQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQyw4QkFEcEIsK0JBQVEsd0JBQVIsV0FnQkksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQ7Ozs7Ozs7OztTQUtEQyxVQUFBLGlCQUFTQyxRQUFULEVBQW1CO0FBQ2YsUUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2JELE1BQUFBLFFBQVEsQ0FBQ0UsS0FBVCxDQUFlQyxHQUFmLENBQW1CSCxRQUFRLENBQUNJLFVBQTVCO0FBQ0FKLE1BQUFBLFFBQVEsQ0FBQ0UsS0FBVCxDQUFlRyxRQUFmLENBQXdCLEtBQUtILEtBQUwsQ0FBV0ksUUFBWCxDQUFvQixNQUFNTixRQUFRLENBQUNPLGlCQUFULEdBQTZCUCxRQUFRLENBQUNRLGFBQWhFLEVBQStFLDhCQUFhUixRQUFRLENBQUNTLFVBQVQsR0FBc0JkLDBCQUFuQyxDQUEvRSxDQUF4QjtBQUNIO0FBQ0o7OztvRkFsQkFlOzs7OztXQUNROzs7Ozs7O1dBVUQsSUFBSVoseUJBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InXHJcbmltcG9ydCB7IHBzZXVkb1JhbmRvbSwgQ29sb3IgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCBHcmFkaWVudFJhbmdlIGZyb20gJy4vZ3JhZGllbnQtcmFuZ2UnO1xyXG5cclxuY29uc3QgQ09MT1JfT1ZFUlRJTUVfUkFORF9PRkZTRVQgPSA5MTA0MTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBjb2xvciBvdmVyIHRpbWUgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxyXG4gKiAhI3poIDNEIOeykuWtkOminOiJsuWPmOWMluaooeWdl1xyXG4gKiBAY2xhc3MgQ29sb3JPdmVydGltZU1vZHVsZVxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLkNvbG9yT3ZlcnRpbWVNb2R1bGUnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvck92ZXJ0aW1lTW9kdWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGVuYWJsZSBvZiBDb2xvck92ZXJ0aW1lTW9kdWxlLlxyXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBwYXJhbWV0ZXIgb2YgY29sb3IgY2hhbmdlIG92ZXIgdGltZSwgdGhlIGxpbmVhciBkaWZmZXJlbmNlIGJldHdlZW4gZWFjaCBrZXkgY2hhbmdlcy5cclxuICAgICAqICEjemgg6aKc6Imy6ZqP5pe26Ze05Y+Y5YyW55qE5Y+C5pWw77yM5ZCE5LiqIGtleSDkuYvpl7Tnur/mgKflt67lgLzlj5jljJbjgIJcclxuICAgICAqIEB0eXBlIHtHcmFkaWVudFJhbmdlfSBjb2xvclxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXHJcbiAgICB9KVxyXG4gICAgY29sb3IgPSBuZXcgR3JhZGllbnRSYW5nZSgpO1xyXG5cclxuICAgIGFuaW1hdGUgKHBhcnRpY2xlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLmNvbG9yLnNldChwYXJ0aWNsZS5zdGFydENvbG9yKTtcclxuICAgICAgICAgICAgcGFydGljbGUuY29sb3IubXVsdGlwbHkodGhpcy5jb2xvci5ldmFsdWF0ZSgxLjAgLSBwYXJ0aWNsZS5yZW1haW5pbmdMaWZldGltZSAvIHBhcnRpY2xlLnN0YXJ0TGlmZXRpbWUsIHBzZXVkb1JhbmRvbShwYXJ0aWNsZS5yYW5kb21TZWVkICsgQ09MT1JfT1ZFUlRJTUVfUkFORF9PRkZTRVQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9