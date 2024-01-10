
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/burst.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCClassDecorator = require("../../platform/CCClassDecorator");

var _valueTypes = require("../../value-types");

var _curveRange = _interopRequireDefault(require("./animator/curve-range"));

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Burst = (
/**
 * !#en The burst of 3d particle.
 * !#zh 3D 粒子发射时的爆发个数
 * @class Burst
 */
_dec = (0, _CCClassDecorator.ccclass)('cc.Burst'), _dec2 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Burst() {
    _initializerDefineProperty(this, "_time", _descriptor, this);

    _initializerDefineProperty(this, "minCount", _descriptor2, this);

    _initializerDefineProperty(this, "maxCount", _descriptor3, this);

    _initializerDefineProperty(this, "_repeatCount", _descriptor4, this);

    _initializerDefineProperty(this, "repeatInterval", _descriptor5, this);

    _initializerDefineProperty(this, "count", _descriptor6, this);

    this._remainingCount = 0;
    this._curTime = 0;
    this._remainingCount = 0;
    this._curTime = 0.0;
  }

  var _proto = Burst.prototype;

  _proto.update = function update(psys, dt) {
    if (this._remainingCount === 0) {
      this._remainingCount = this._repeatCount;
      this._curTime = this._time;
    }

    if (this._remainingCount > 0) {
      var preFrameTime = (0, _valueTypes.repeat)(psys._time - psys.startDelay.evaluate(0, 1), psys.duration) - dt;
      preFrameTime = preFrameTime > 0.0 ? preFrameTime : 0.0;
      var curFrameTime = (0, _valueTypes.repeat)(psys.time - psys.startDelay.evaluate(0, 1), psys.duration);

      if (this._curTime >= preFrameTime && this._curTime < curFrameTime) {
        psys.emit(this.count.evaluate(this._curTime / psys.duration, 1), dt - (curFrameTime - this._curTime));
        this._curTime += this.repeatInterval;
        --this._remainingCount;
      }
    }
  };

  _proto.getMaxCount = function getMaxCount(psys) {
    return this.count.getMax() * Math.min(Math.ceil(psys.duration / this.repeatInterval), this.repeatCount);
  };

  _createClass(Burst, [{
    key: "time",
    get:
    /**
     * !#en Time between the start of the particle system and the trigger of this Brust
     * !#zh 粒子系统开始运行到触发此次 Brust 的时间
     * @property {Number} time
     */
    function get() {
      return this._time;
    },
    set: function set(val) {
      this._time = val;
      this._curTime = val;
    }
    /**
     * !#en Minimum number of emitted particles
     * !#zh 发射粒子的最小数量
     * @property {Number} minCount
     */

  }, {
    key: "repeatCount",
    get:
    /**
     * !#en The number of times Burst was triggered.
     * !#zh Burst 的触发次数
     * @property {Number} repeatCount
     */
    function get() {
      return this._repeatCount;
    },
    set: function set(val) {
      this._repeatCount = val;
      this._remainingCount = val;
    }
    /**
     * !#en Interval of each trigger
     * !#zh 每次触发的间隔时间
     * @property {Number} repeatInterval
     */

  }]);

  return Burst;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "time"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_repeatCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "repeatCount", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "repeatCount"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "repeatInterval", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = Burst;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYnVyc3QudHMiXSwibmFtZXMiOlsiQnVyc3QiLCJ0eXBlIiwiQ3VydmVSYW5nZSIsIl9yZW1haW5pbmdDb3VudCIsIl9jdXJUaW1lIiwidXBkYXRlIiwicHN5cyIsImR0IiwiX3JlcGVhdENvdW50IiwiX3RpbWUiLCJwcmVGcmFtZVRpbWUiLCJzdGFydERlbGF5IiwiZXZhbHVhdGUiLCJkdXJhdGlvbiIsImN1ckZyYW1lVGltZSIsInRpbWUiLCJlbWl0IiwiY291bnQiLCJyZXBlYXRJbnRlcnZhbCIsImdldE1heENvdW50IiwiZ2V0TWF4IiwiTWF0aCIsIm1pbiIsImNlaWwiLCJyZXBlYXRDb3VudCIsInZhbCIsInByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFRcUJBO0FBTnJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7T0FDQywrQkFBUSxVQUFSLFdBb0VJLGdDQUFTO0FBQ05DLEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFUO0FBUUQsbUJBQWU7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSxTQUhmQyxlQUdlLEdBSEcsQ0FHSDtBQUFBLFNBRmZDLFFBRWUsR0FGSixDQUVJO0FBQ1gsU0FBS0QsZUFBTCxHQUF1QixDQUF2QjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsR0FBaEI7QUFDSDs7OztTQUVEQyxTQUFBLGdCQUFRQyxJQUFSLEVBQWNDLEVBQWQsRUFBa0I7QUFDZCxRQUFJLEtBQUtKLGVBQUwsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDNUIsV0FBS0EsZUFBTCxHQUF1QixLQUFLSyxZQUE1QjtBQUNBLFdBQUtKLFFBQUwsR0FBZ0IsS0FBS0ssS0FBckI7QUFDSDs7QUFDRCxRQUFJLEtBQUtOLGVBQUwsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsVUFBSU8sWUFBWSxHQUFHLHdCQUFPSixJQUFJLENBQUNHLEtBQUwsR0FBYUgsSUFBSSxDQUFDSyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixDQUFwQixFQUFvRE4sSUFBSSxDQUFDTyxRQUF6RCxJQUFxRU4sRUFBeEY7QUFDQUcsTUFBQUEsWUFBWSxHQUFJQSxZQUFZLEdBQUcsR0FBaEIsR0FBdUJBLFlBQXZCLEdBQXNDLEdBQXJEO0FBQ0EsVUFBTUksWUFBWSxHQUFHLHdCQUFPUixJQUFJLENBQUNTLElBQUwsR0FBWVQsSUFBSSxDQUFDSyxVQUFMLENBQWdCQyxRQUFoQixDQUF5QixDQUF6QixFQUE0QixDQUE1QixDQUFuQixFQUFtRE4sSUFBSSxDQUFDTyxRQUF4RCxDQUFyQjs7QUFDQSxVQUFJLEtBQUtULFFBQUwsSUFBaUJNLFlBQWpCLElBQWlDLEtBQUtOLFFBQUwsR0FBZ0JVLFlBQXJELEVBQW1FO0FBQy9EUixRQUFBQSxJQUFJLENBQUNVLElBQUwsQ0FBVSxLQUFLQyxLQUFMLENBQVdMLFFBQVgsQ0FBb0IsS0FBS1IsUUFBTCxHQUFnQkUsSUFBSSxDQUFDTyxRQUF6QyxFQUFtRCxDQUFuRCxDQUFWLEVBQWlFTixFQUFFLElBQUlPLFlBQVksR0FBRyxLQUFLVixRQUF4QixDQUFuRTtBQUNBLGFBQUtBLFFBQUwsSUFBaUIsS0FBS2MsY0FBdEI7QUFDQSxVQUFFLEtBQUtmLGVBQVA7QUFDSDtBQUNKO0FBQ0o7O1NBRURnQixjQUFBLHFCQUFhYixJQUFiLEVBQW1CO0FBQ2YsV0FBTyxLQUFLVyxLQUFMLENBQVdHLE1BQVgsS0FBc0JDLElBQUksQ0FBQ0MsR0FBTCxDQUFTRCxJQUFJLENBQUNFLElBQUwsQ0FBVWpCLElBQUksQ0FBQ08sUUFBTCxHQUFnQixLQUFLSyxjQUEvQixDQUFULEVBQXlELEtBQUtNLFdBQTlELENBQTdCO0FBQ0g7Ozs7O0FBOUZEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFDWTtBQUNSLGFBQU8sS0FBS2YsS0FBWjtBQUNIO1NBRUQsYUFBVWdCLEdBQVYsRUFBZTtBQUNYLFdBQUtoQixLQUFMLEdBQWFnQixHQUFiO0FBQ0EsV0FBS3JCLFFBQUwsR0FBZ0JxQixHQUFoQjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFlSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBQ21CO0FBQ2YsYUFBTyxLQUFLakIsWUFBWjtBQUNIO1NBRUQsYUFBaUJpQixHQUFqQixFQUFzQjtBQUNsQixXQUFLakIsWUFBTCxHQUFvQmlCLEdBQXBCO0FBQ0EsV0FBS3RCLGVBQUwsR0FBdUJzQixHQUF2QjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7bUZBeERLQzs7Ozs7V0FDTzs7MERBT1BBLHNMQWVBQTs7Ozs7V0FDVTs7NkVBT1ZBOzs7OztXQUNVOztpRkFFVkE7Ozs7O1dBQ2M7O2lFQU9kQSxtTUFlQUE7Ozs7O1dBQ2dCOzs7Ozs7O1dBVVQsSUFBSXhCLHNCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuaW1wb3J0IHsgcmVwZWF0IH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgQ3VydmVSYW5nZSBmcm9tICcuL2FuaW1hdG9yL2N1cnZlLXJhbmdlJztcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBidXJzdCBvZiAzZCBwYXJ0aWNsZS5cclxuICogISN6aCAzRCDnspLlrZDlj5HlsITml7bnmoTniIblj5HkuKrmlbBcclxuICogQGNsYXNzIEJ1cnN0XHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuQnVyc3QnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXJzdCB7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfdGltZSA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRpbWUgYmV0d2VlbiB0aGUgc3RhcnQgb2YgdGhlIHBhcnRpY2xlIHN5c3RlbSBhbmQgdGhlIHRyaWdnZXIgb2YgdGhpcyBCcnVzdFxyXG4gICAgICogISN6aCDnspLlrZDns7vnu5/lvIDlp4vov5DooYzliLDop6blj5HmraTmrKEgQnJ1c3Qg55qE5pe26Ze0XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCB0aW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdGltZSAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZSA9IHZhbDtcclxuICAgICAgICB0aGlzLl9jdXJUaW1lID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNaW5pbXVtIG51bWJlciBvZiBlbWl0dGVkIHBhcnRpY2xlc1xyXG4gICAgICogISN6aCDlj5HlsITnspLlrZDnmoTmnIDlsI/mlbDph49cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtaW5Db3VudFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIG1pbkNvdW50ID0gMzA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE1heGltdW0gbnVtYmVyIG9mIGVtaXR0ZWQgcGFydGljbGVzXHJcbiAgICAgKiAhI3poIOWPkeWwhOeykuWtkOeahOacgOWkp+aVsOmHj1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heENvdW50XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgbWF4Q291bnQgPSAzMDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9yZXBlYXRDb3VudCA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1iZXIgb2YgdGltZXMgQnVyc3Qgd2FzIHRyaWdnZXJlZC5cclxuICAgICAqICEjemggQnVyc3Qg55qE6Kem5Y+R5qyh5pWwXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcmVwZWF0Q291bnRcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgcmVwZWF0Q291bnQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXBlYXRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVwZWF0Q291bnQgKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3JlcGVhdENvdW50ID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJbnRlcnZhbCBvZiBlYWNoIHRyaWdnZXJcclxuICAgICAqICEjemgg5q+P5qyh6Kem5Y+R55qE6Ze06ZqU5pe26Ze0XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcmVwZWF0SW50ZXJ2YWxcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICByZXBlYXRJbnRlcnZhbCA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE51bWJlciBvZiBwYXJ0aWNsZXMgZW1pdHRlZFxyXG4gICAgICogISN6aCDlj5HlsITnmoTnspLlrZDnmoTmlbDph49cclxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gY291bnRcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIGNvdW50ID0gbmV3IEN1cnZlUmFuZ2UoKTtcclxuXHJcbiAgICBfcmVtYWluaW5nQ291bnQgPSAwO1xyXG4gICAgX2N1clRpbWUgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3VyVGltZSA9IDAuMDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKHBzeXMsIGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZ0NvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbWFpbmluZ0NvdW50ID0gdGhpcy5fcmVwZWF0Q291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clRpbWUgPSB0aGlzLl90aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmVtYWluaW5nQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBwcmVGcmFtZVRpbWUgPSByZXBlYXQocHN5cy5fdGltZSAtIHBzeXMuc3RhcnREZWxheS5ldmFsdWF0ZSgwLCAxKSwgcHN5cy5kdXJhdGlvbikgLSBkdDtcclxuICAgICAgICAgICAgcHJlRnJhbWVUaW1lID0gKHByZUZyYW1lVGltZSA+IDAuMCkgPyBwcmVGcmFtZVRpbWUgOiAwLjA7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1ckZyYW1lVGltZSA9IHJlcGVhdChwc3lzLnRpbWUgLSBwc3lzLnN0YXJ0RGVsYXkuZXZhbHVhdGUoMCwgMSksIHBzeXMuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyVGltZSA+PSBwcmVGcmFtZVRpbWUgJiYgdGhpcy5fY3VyVGltZSA8IGN1ckZyYW1lVGltZSkge1xyXG4gICAgICAgICAgICAgICAgcHN5cy5lbWl0KHRoaXMuY291bnQuZXZhbHVhdGUodGhpcy5fY3VyVGltZSAvIHBzeXMuZHVyYXRpb24sIDEpLCBkdCAtIChjdXJGcmFtZVRpbWUgLSB0aGlzLl9jdXJUaW1lKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJUaW1lICs9IHRoaXMucmVwZWF0SW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX3JlbWFpbmluZ0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1heENvdW50IChwc3lzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQuZ2V0TWF4KCkgKiBNYXRoLm1pbihNYXRoLmNlaWwocHN5cy5kdXJhdGlvbiAvIHRoaXMucmVwZWF0SW50ZXJ2YWwpLCB0aGlzLnJlcGVhdENvdW50KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==