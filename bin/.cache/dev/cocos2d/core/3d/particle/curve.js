
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/curve.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.evalOptCurve = evalOptCurve;
exports.AnimationCurve = exports.OptimizedKey = exports.Keyframe = void 0;

var _CCEnum = _interopRequireDefault(require("../../platform/CCEnum"));

var _valueTypes = require("../../value-types");

var _CCClassDecorator = require("../../platform/CCClassDecorator");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _dec3, _dec4, _dec5, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var LOOK_FORWARD = 3;
/**
 * !#en The wrap mode
 * !#zh 循环模式
 * @static
 * @enum AnimationCurve.WrapMode
 */

var WrapMode = (0, _CCEnum["default"])({
  /**
   * !#en Default
   * !#zh 默认模式
   * @property Default
   * @readonly
   * @type {Number}
   */
  Default: 0,

  /**
   * !#en Once Mode
   * !#zh Once 模式
   * @property Once
   * @readonly
   * @type {Number}
   */
  Once: 1,

  /**
   * !#en Loop Mode
   * !#zh Loop 模式
   * @property Loop
   * @readonly
   * @type {Number}
   */
  Loop: 2,

  /**
   * !#en PingPong Mode
   * !#zh PingPong 模式
   * @property PingPong
   * @readonly
   * @type {Number}
   */
  PingPong: 3,

  /**
   * !#en ClampForever Mode
   * !#zh ClampForever 模式
   * @property ClampForever
   * @readonly
   * @type {Number}
   */
  ClampForever: 4
});
var Keyframe = (_dec = (0, _CCClassDecorator.ccclass)('cc.Keyframe'), _dec(_class = (_class2 = (_temp =
/**
 * !#en Time.
 * !#zh 时间。
 * @property {Number} time
 */

/**
 * !#en Key value.
 * !#zh 关键值。
 * @property {Number} value
 */

/**
 * !#en In tangent value.
 * !#zh 左切值。
 * @property {Number} inTangent
 */

/**
 * !#en Out tangent value.
 * !#zh 右切值。
 * @property {Number} outTangent
 */
function Keyframe(time, value, inTangent, outTangent) {
  _initializerDefineProperty(this, "time", _descriptor, this);

  _initializerDefineProperty(this, "value", _descriptor2, this);

  _initializerDefineProperty(this, "inTangent", _descriptor3, this);

  _initializerDefineProperty(this, "outTangent", _descriptor4, this);

  this.time = time || 0;
  this.value = value || 0;
  this.inTangent = inTangent || 0;
  this.outTangent = outTangent || 0;
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inTangent", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "outTangent", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
exports.Keyframe = Keyframe;

var OptimizedKey = /*#__PURE__*/function () {
  function OptimizedKey() {
    this.index = 0;
    this.time = 0;
    this.endTime = 0;
    this.coefficient = null;
    this.index = -1;
    this.time = 0;
    this.endTime = 0;
    this.coefficient = new Float32Array(4);
  }

  var _proto = OptimizedKey.prototype;

  _proto.evaluate = function evaluate(T) {
    var t = T - this.time;
    return evalOptCurve(t, this.coefficient);
  };

  return OptimizedKey;
}();

exports.OptimizedKey = OptimizedKey;

function evalOptCurve(t, coefs) {
  return t * (t * (t * coefs[0] + coefs[1]) + coefs[2]) + coefs[3];
}

var defaultKFStart = new Keyframe(0, 1, 0, 0);
var defaultKFEnd = new Keyframe(1, 1, 0, 0);
/**
 * !#en The animation curve of 3d particle.
 * !#zh 3D 粒子动画曲线
 * @class AnimationCurve
 */

var AnimationCurve = (_dec2 = (0, _CCClassDecorator.ccclass)('cc.AnimationCurve'), _dec3 = (0, _CCClassDecorator.property)({
  type: [Keyframe]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: cc.Enum(WrapMode),
  visible: false
}), _dec5 = (0, _CCClassDecorator.property)({
  type: cc.Enum(WrapMode),
  visible: false
}), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
  /**
   * !#en Array of key value.
   * !#zh 关键值列表。
   * @property {[Keyframe]} keyFrames
   */

  /**
   * !#en Pre-wrap mode.
   * !#zh 前置循环模式。
   * @property {WrapMode} preWrapMode
   */

  /**
   * !#en Post-wrap mode.
   * !#zh 后置循环模式。
   * @property {WrapMode} postWrapMode
   */
  function AnimationCurve(keyFrames) {
    if (keyFrames === void 0) {
      keyFrames = null;
    }

    _initializerDefineProperty(this, "keyFrames", _descriptor5, this);

    _initializerDefineProperty(this, "preWrapMode", _descriptor6, this);

    _initializerDefineProperty(this, "postWrapMode", _descriptor7, this);

    this.cachedKey = null;

    if (keyFrames) {
      this.keyFrames = keyFrames;
    } else {
      this.keyFrames.push(defaultKFStart);
      this.keyFrames.push(defaultKFEnd);
    }

    this.cachedKey = new OptimizedKey();
  }

  var _proto2 = AnimationCurve.prototype;

  _proto2.addKey = function addKey(keyFrame) {
    if (this.keyFrames == null) {
      this.keyFrames = [];
    }

    this.keyFrames.push(keyFrame);
  } // cubic Hermite spline
  ;

  _proto2.evaluate_slow = function evaluate_slow(time) {
    var wrappedTime = time;
    var wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
    var startTime = this.keyFrames[0].time;
    var endTime = this.keyFrames[this.keyFrames.length - 1].time;

    switch (wrapMode) {
      case WrapMode.Loop:
        wrappedTime = (0, _valueTypes.repeat)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.PingPong:
        wrappedTime = (0, _valueTypes.pingPong)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.ClampForever:
        wrappedTime = (0, _valueTypes.clamp)(time, startTime, endTime);
        break;
    }

    var preKFIndex = 0;

    if (wrappedTime > this.keyFrames[0].time) {
      if (wrappedTime >= this.keyFrames[this.keyFrames.length - 1].time) {
        preKFIndex = this.keyFrames.length - 2;
      } else {
        for (var i = 0; i < this.keyFrames.length - 1; i++) {
          if (wrappedTime >= this.keyFrames[0].time && wrappedTime <= this.keyFrames[i + 1].time) {
            preKFIndex = i;
            break;
          }
        }
      }
    }

    var keyframe0 = this.keyFrames[preKFIndex];
    var keyframe1 = this.keyFrames[preKFIndex + 1];
    var t = (0, _valueTypes.inverseLerp)(keyframe0.time, keyframe1.time, wrappedTime);
    var dt = keyframe1.time - keyframe0.time;
    var m0 = keyframe0.outTangent * dt;
    var m1 = keyframe1.inTangent * dt;
    var t2 = t * t;
    var t3 = t2 * t;
    var a = 2 * t3 - 3 * t2 + 1;
    var b = t3 - 2 * t2 + t;
    var c = t3 - t2;
    var d = -2 * t3 + 3 * t2;
    return a * keyframe0.value + b * m0 + c * m1 + d * keyframe1.value;
  };

  _proto2.evaluate = function evaluate(time) {
    var wrappedTime = time;
    var wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
    var startTime = this.keyFrames[0].time;
    var endTime = this.keyFrames[this.keyFrames.length - 1].time;

    switch (wrapMode) {
      case WrapMode.Loop:
        wrappedTime = (0, _valueTypes.repeat)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.PingPong:
        wrappedTime = (0, _valueTypes.pingPong)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.ClampForever:
        wrappedTime = (0, _valueTypes.clamp)(time, startTime, endTime);
        break;
    }

    if (wrappedTime >= this.cachedKey.time && wrappedTime < this.cachedKey.endTime) {
      return this.cachedKey.evaluate(wrappedTime);
    } else {
      var leftIndex = this.findIndex(this.cachedKey, wrappedTime);
      var rightIndex = leftIndex + 1;

      if (rightIndex === this.keyFrames.length) {
        rightIndex -= 1;
      }

      this.calcOptimizedKey(this.cachedKey, leftIndex, rightIndex);
      return this.cachedKey.evaluate(wrappedTime);
    }
  };

  _proto2.calcOptimizedKey = function calcOptimizedKey(optKey, leftIndex, rightIndex) {
    var lhs = this.keyFrames[leftIndex];
    var rhs = this.keyFrames[rightIndex];
    optKey.index = leftIndex;
    optKey.time = lhs.time;
    optKey.endTime = rhs.time;
    var dx = rhs.time - lhs.time;
    var dy = rhs.value - lhs.value;
    var length = 1 / (dx * dx);
    var d1 = lhs.outTangent * dx;
    var d2 = rhs.inTangent * dx;
    optKey.coefficient[0] = (d1 + d2 - dy - dy) * length / dx;
    optKey.coefficient[1] = (dy + dy + dy - d1 - d1 - d2) * length;
    optKey.coefficient[2] = lhs.outTangent;
    optKey.coefficient[3] = lhs.value;
  };

  _proto2.findIndex = function findIndex(optKey, t) {
    var cachedIndex = optKey.index;

    if (cachedIndex !== -1) {
      var cachedTime = this.keyFrames[cachedIndex].time;

      if (t > cachedTime) {
        for (var i = 0; i < LOOK_FORWARD; i++) {
          var currIndex = cachedIndex + i;

          if (currIndex + 1 < this.keyFrames.length && this.keyFrames[currIndex + 1].time > t) {
            return currIndex;
          }
        }
      } else {
        for (var _i = 0; _i < LOOK_FORWARD; _i++) {
          var _currIndex = cachedIndex - _i;

          if (_currIndex >= 0 && this.keyFrames[_currIndex - 1].time <= t) {
            return _currIndex - 1;
          }
        }
      }
    }

    var left = 0;
    var right = this.keyFrames.length;
    var mid = Math.floor((left + right) / 2);

    while (right - left > 1) {
      if (this.keyFrames[mid].time >= t) {
        right = mid;
      } else {
        left = mid + 1;
      }

      mid = Math.floor((left + right) / 2);
    }

    return left;
  };

  return AnimationCurve;
}(), _temp2), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "keyFrames", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "preWrapMode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapMode.Loop;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "postWrapMode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapMode.Loop;
  }
})), _class5)) || _class4);
exports.AnimationCurve = AnimationCurve;
cc.Keyframe = Keyframe;
cc.AnimationCurve = AnimationCurve;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcY3VydmUudHMiXSwibmFtZXMiOlsiTE9PS19GT1JXQVJEIiwiV3JhcE1vZGUiLCJEZWZhdWx0IiwiT25jZSIsIkxvb3AiLCJQaW5nUG9uZyIsIkNsYW1wRm9yZXZlciIsIktleWZyYW1lIiwidGltZSIsInZhbHVlIiwiaW5UYW5nZW50Iiwib3V0VGFuZ2VudCIsInByb3BlcnR5IiwiT3B0aW1pemVkS2V5IiwiaW5kZXgiLCJlbmRUaW1lIiwiY29lZmZpY2llbnQiLCJGbG9hdDMyQXJyYXkiLCJldmFsdWF0ZSIsIlQiLCJ0IiwiZXZhbE9wdEN1cnZlIiwiY29lZnMiLCJkZWZhdWx0S0ZTdGFydCIsImRlZmF1bHRLRkVuZCIsIkFuaW1hdGlvbkN1cnZlIiwidHlwZSIsImNjIiwiRW51bSIsInZpc2libGUiLCJrZXlGcmFtZXMiLCJjYWNoZWRLZXkiLCJwdXNoIiwiYWRkS2V5Iiwia2V5RnJhbWUiLCJldmFsdWF0ZV9zbG93Iiwid3JhcHBlZFRpbWUiLCJ3cmFwTW9kZSIsInByZVdyYXBNb2RlIiwicG9zdFdyYXBNb2RlIiwic3RhcnRUaW1lIiwibGVuZ3RoIiwicHJlS0ZJbmRleCIsImkiLCJrZXlmcmFtZTAiLCJrZXlmcmFtZTEiLCJkdCIsIm0wIiwibTEiLCJ0MiIsInQzIiwiYSIsImIiLCJjIiwiZCIsImxlZnRJbmRleCIsImZpbmRJbmRleCIsInJpZ2h0SW5kZXgiLCJjYWxjT3B0aW1pemVkS2V5Iiwib3B0S2V5IiwibGhzIiwicmhzIiwiZHgiLCJkeSIsImQxIiwiZDIiLCJjYWNoZWRJbmRleCIsImNhY2hlZFRpbWUiLCJjdXJySW5kZXgiLCJsZWZ0IiwicmlnaHQiLCJtaWQiLCJNYXRoIiwiZmxvb3IiLCJBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxHQUFHLENBQXJCO0FBRUE7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TXlCLFVBQVMsR0FBR0YsV0FBVyxHQUFHdkIsRUFBaEM7O0FBQ0EsY0FBSXlCLFVBQVMsSUFBSSxDQUFiLElBQWtCLEtBQUt0QyxTQUFMLENBQWVzQyxVQUFTLEdBQUcsQ0FBM0IsRUFBOEI1RCxJQUE5QixJQUFzQ1ksQ0FBNUQsRUFBK0Q7QUFDM0QsbUJBQU9nRCxVQUFTLEdBQUcsQ0FBbkI7QUFDSDtBQUNKO0FBQ0o7QUFDSjs7QUFDRCxRQUFJQyxJQUFJLEdBQUcsQ0FBWDtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLeEMsU0FBTCxDQUFlVyxNQUEzQjtBQUNBLFFBQUk4QixHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUNKLElBQUksR0FBR0MsS0FBUixJQUFpQixDQUE1QixDQUFWOztBQUNBLFdBQU9BLEtBQUssR0FBR0QsSUFBUixHQUFlLENBQXRCLEVBQXlCO0FBQ3JCLFVBQUksS0FBS3ZDLFNBQUwsQ0FBZXlDLEdBQWYsRUFBb0IvRCxJQUFwQixJQUE0QlksQ0FBaEMsRUFBbUM7QUFDL0JrRCxRQUFBQSxLQUFLLEdBQUdDLEdBQVI7QUFDSCxPQUZELE1BRU87QUFDSEYsUUFBQUEsSUFBSSxHQUFHRSxHQUFHLEdBQUcsQ0FBYjtBQUNIOztBQUNEQSxNQUFBQSxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXLENBQUNKLElBQUksR0FBR0MsS0FBUixJQUFpQixDQUE1QixDQUFOO0FBQ0g7O0FBQ0QsV0FBT0QsSUFBUDtBQUNIOzs7Ozs7OztXQTVLVyxJQUFJSyxLQUFKOzs7Ozs7O1dBVUV6RSxRQUFRLENBQUNHOzs7Ozs7O1dBVVJILFFBQVEsQ0FBQ0c7Ozs7QUEySjVCdUIsRUFBRSxDQUFDcEIsUUFBSCxHQUFjQSxRQUFkO0FBQ0FvQixFQUFFLENBQUNGLGNBQUgsR0FBb0JBLGNBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVudW0gIGZyb20gJy4uLy4uL3BsYXRmb3JtL0NDRW51bSc7XHJcbmltcG9ydCB7IGNsYW1wLCBpbnZlcnNlTGVycCwgcGluZ1BvbmcsIHJlcGVhdCB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IHsgY2NjbGFzcyAsIHByb3BlcnR5fSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuXHJcbmNvbnN0IExPT0tfRk9SV0FSRCA9IDM7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgd3JhcCBtb2RlXHJcbiAqICEjemgg5b6q546v5qih5byPXHJcbiAqIEBzdGF0aWNcclxuICogQGVudW0gQW5pbWF0aW9uQ3VydmUuV3JhcE1vZGVcclxuICovXHJcbmNvbnN0IFdyYXBNb2RlID0gRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRGVmYXVsdFxyXG4gICAgICogISN6aCDpu5jorqTmqKHlvI9cclxuICAgICAqIEBwcm9wZXJ0eSBEZWZhdWx0XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIERlZmF1bHQ6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gT25jZSBNb2RlXHJcbiAgICAgKiAhI3poIE9uY2Ug5qih5byPXHJcbiAgICAgKiBAcHJvcGVydHkgT25jZVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPbmNlOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExvb3AgTW9kZVxyXG4gICAgICogISN6aCBMb29wIOaooeW8j1xyXG4gICAgICogQHByb3BlcnR5IExvb3BcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgTG9vcDogMixcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQaW5nUG9uZyBNb2RlXHJcbiAgICAgKiAhI3poIFBpbmdQb25nIOaooeW8j1xyXG4gICAgICogQHByb3BlcnR5IFBpbmdQb25nXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFBpbmdQb25nOiAzLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENsYW1wRm9yZXZlciBNb2RlXHJcbiAgICAgKiAhI3poIENsYW1wRm9yZXZlciDmqKHlvI9cclxuICAgICAqIEBwcm9wZXJ0eSBDbGFtcEZvcmV2ZXJcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQ2xhbXBGb3JldmVyOiA0LFxyXG59KTtcclxuXHJcbkBjY2NsYXNzKCdjYy5LZXlmcmFtZScpXHJcbmV4cG9ydCBjbGFzcyBLZXlmcmFtZSB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGltZS5cclxuICAgICAqICEjemgg5pe26Ze044CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGltZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHRpbWUgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEtleSB2YWx1ZS5cclxuICAgICAqICEjemgg5YWz6ZSu5YC844CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICB2YWx1ZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW4gdGFuZ2VudCB2YWx1ZS5cclxuICAgICAqICEjemgg5bem5YiH5YC844CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gaW5UYW5nZW50XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgaW5UYW5nZW50ID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBPdXQgdGFuZ2VudCB2YWx1ZS5cclxuICAgICAqICEjemgg5Y+z5YiH5YC844CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gb3V0VGFuZ2VudFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIG91dFRhbmdlbnQgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICh0aW1lLCB2YWx1ZSwgaW5UYW5nZW50LCBvdXRUYW5nZW50KSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZSB8fCAwO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCAwO1xyXG4gICAgICAgIHRoaXMuaW5UYW5nZW50ID0gaW5UYW5nZW50IHx8IDA7XHJcbiAgICAgICAgdGhpcy5vdXRUYW5nZW50ID0gb3V0VGFuZ2VudCB8fCAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT3B0aW1pemVkS2V5IHtcclxuICAgIGluZGV4ID0gMDtcclxuICAgIHRpbWUgPSAwO1xyXG4gICAgZW5kVGltZSA9IDA7XHJcbiAgICBjb2VmZmljaWVudCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLnRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZW5kVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5jb2VmZmljaWVudCA9IG5ldyBGbG9hdDMyQXJyYXkoNCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGUgKFQpIHtcclxuICAgICAgICBjb25zdCB0ID0gVCAtIHRoaXMudGltZTtcclxuICAgICAgICByZXR1cm4gZXZhbE9wdEN1cnZlKHQsIHRoaXMuY29lZmZpY2llbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZhbE9wdEN1cnZlICh0LCBjb2Vmcykge1xyXG4gICAgcmV0dXJuICh0ICogKHQgKiAodCAqIGNvZWZzWzBdICsgY29lZnNbMV0pICsgY29lZnNbMl0pKSArIGNvZWZzWzNdO1xyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0S0ZTdGFydCA9IG5ldyBLZXlmcmFtZSgwLCAxLCAwLCAwKTtcclxuY29uc3QgZGVmYXVsdEtGRW5kID0gbmV3IEtleWZyYW1lKDEsIDEsIDAsIDApO1xyXG5cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBhbmltYXRpb24gY3VydmUgb2YgM2QgcGFydGljbGUuXHJcbiAqICEjemggM0Qg57KS5a2Q5Yqo55S75puy57q/XHJcbiAqIEBjbGFzcyBBbmltYXRpb25DdXJ2ZVxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLkFuaW1hdGlvbkN1cnZlJylcclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkN1cnZlIHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBcnJheSBvZiBrZXkgdmFsdWUuXHJcbiAgICAgKiAhI3poIOWFs+mUruWAvOWIl+ihqOOAglxyXG4gICAgICogQHByb3BlcnR5IHtbS2V5ZnJhbWVdfSBrZXlGcmFtZXNcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBbS2V5ZnJhbWVdLFxyXG4gICAgfSlcclxuICAgIGtleUZyYW1lcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFByZS13cmFwIG1vZGUuXHJcbiAgICAgKiAhI3poIOWJjee9ruW+queOr+aooeW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtXcmFwTW9kZX0gcHJlV3JhcE1vZGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5FbnVtKFdyYXBNb2RlKSxcclxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgIH0pXHJcbiAgICBwcmVXcmFwTW9kZSA9IFdyYXBNb2RlLkxvb3A7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUG9zdC13cmFwIG1vZGUuXHJcbiAgICAgKiAhI3poIOWQjue9ruW+queOr+aooeW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtXcmFwTW9kZX0gcG9zdFdyYXBNb2RlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShXcmFwTW9kZSksXHJcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICB9KVxyXG4gICAgcG9zdFdyYXBNb2RlID0gV3JhcE1vZGUuTG9vcDtcclxuXHJcbiAgICBjYWNoZWRLZXkgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChrZXlGcmFtZXMgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKGtleUZyYW1lcykge1xyXG4gICAgICAgICAgICB0aGlzLmtleUZyYW1lcyA9IGtleUZyYW1lc1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMua2V5RnJhbWVzLnB1c2goZGVmYXVsdEtGU3RhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLmtleUZyYW1lcy5wdXNoKGRlZmF1bHRLRkVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FjaGVkS2V5ID0gbmV3IE9wdGltaXplZEtleSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEtleSAoa2V5RnJhbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5rZXlGcmFtZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleUZyYW1lcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjdWJpYyBIZXJtaXRlIHNwbGluZVxyXG4gICAgZXZhbHVhdGVfc2xvdyAodGltZSkge1xyXG4gICAgICAgIGxldCB3cmFwcGVkVGltZSA9IHRpbWU7XHJcbiAgICAgICAgY29uc3Qgd3JhcE1vZGUgPSB0aW1lIDwgMCA/IHRoaXMucHJlV3JhcE1vZGUgOiB0aGlzLnBvc3RXcmFwTW9kZTtcclxuICAgICAgICBjb25zdCBzdGFydFRpbWUgPSB0aGlzLmtleUZyYW1lc1swXS50aW1lO1xyXG4gICAgICAgIGNvbnN0IGVuZFRpbWUgPSB0aGlzLmtleUZyYW1lc1t0aGlzLmtleUZyYW1lcy5sZW5ndGggLSAxXS50aW1lO1xyXG4gICAgICAgIHN3aXRjaCAod3JhcE1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBXcmFwTW9kZS5Mb29wOlxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZFRpbWUgPSByZXBlYXQodGltZSAtIHN0YXJ0VGltZSwgZW5kVGltZSAtIHN0YXJ0VGltZSkgKyBzdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBXcmFwTW9kZS5QaW5nUG9uZzpcclxuICAgICAgICAgICAgICAgIHdyYXBwZWRUaW1lID0gcGluZ1BvbmcodGltZSAtIHN0YXJ0VGltZSwgZW5kVGltZSAtIHN0YXJ0VGltZSkgKyBzdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBXcmFwTW9kZS5DbGFtcEZvcmV2ZXI6XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVkVGltZSA9IGNsYW1wKHRpbWUsIHN0YXJ0VGltZSwgZW5kVGltZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByZUtGSW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh3cmFwcGVkVGltZSA+IHRoaXMua2V5RnJhbWVzWzBdLnRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKHdyYXBwZWRUaW1lID49IHRoaXMua2V5RnJhbWVzW3RoaXMua2V5RnJhbWVzLmxlbmd0aCAtIDFdLnRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZUtGSW5kZXggPSB0aGlzLmtleUZyYW1lcy5sZW5ndGggLSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmtleUZyYW1lcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod3JhcHBlZFRpbWUgPj0gdGhpcy5rZXlGcmFtZXNbMF0udGltZSAmJiB3cmFwcGVkVGltZSA8PSB0aGlzLmtleUZyYW1lc1tpICsgMV0udGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVLRkluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGtleWZyYW1lMCA9IHRoaXMua2V5RnJhbWVzW3ByZUtGSW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGtleWZyYW1lMSA9IHRoaXMua2V5RnJhbWVzW3ByZUtGSW5kZXggKyAxXTtcclxuXHJcbiAgICAgICAgY29uc3QgdCA9IGludmVyc2VMZXJwKGtleWZyYW1lMC50aW1lLCBrZXlmcmFtZTEudGltZSwgd3JhcHBlZFRpbWUpO1xyXG4gICAgICAgIGNvbnN0IGR0ID0ga2V5ZnJhbWUxLnRpbWUgLSBrZXlmcmFtZTAudGltZTtcclxuXHJcbiAgICAgICAgY29uc3QgbTAgPSBrZXlmcmFtZTAub3V0VGFuZ2VudCAqIGR0O1xyXG4gICAgICAgIGNvbnN0IG0xID0ga2V5ZnJhbWUxLmluVGFuZ2VudCAqIGR0O1xyXG5cclxuICAgICAgICBjb25zdCB0MiA9IHQgKiB0O1xyXG4gICAgICAgIGNvbnN0IHQzID0gdDIgKiB0O1xyXG5cclxuICAgICAgICBjb25zdCBhID0gMiAqIHQzIC0gMyAqIHQyICsgMTtcclxuICAgICAgICBjb25zdCBiID0gdDMgLSAyICogdDIgKyB0O1xyXG4gICAgICAgIGNvbnN0IGMgPSB0MyAtIHQyO1xyXG4gICAgICAgIGNvbnN0IGQgPSAtMiAqIHQzICsgMyAqIHQyO1xyXG5cclxuICAgICAgICByZXR1cm4gYSAqIGtleWZyYW1lMC52YWx1ZSArIGIgKiBtMCArIGMgKiBtMSArIGQgKiBrZXlmcmFtZTEudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZXZhbHVhdGUgKHRpbWUpIHtcclxuICAgICAgICBsZXQgd3JhcHBlZFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIGNvbnN0IHdyYXBNb2RlID0gdGltZSA8IDAgPyB0aGlzLnByZVdyYXBNb2RlIDogdGhpcy5wb3N0V3JhcE1vZGU7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy5rZXlGcmFtZXNbMF0udGltZTtcclxuICAgICAgICBjb25zdCBlbmRUaW1lID0gdGhpcy5rZXlGcmFtZXNbdGhpcy5rZXlGcmFtZXMubGVuZ3RoIC0gMV0udGltZTtcclxuICAgICAgICBzd2l0Y2ggKHdyYXBNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuTG9vcDpcclxuICAgICAgICAgICAgICAgIHdyYXBwZWRUaW1lID0gcmVwZWF0KHRpbWUgLSBzdGFydFRpbWUsIGVuZFRpbWUgLSBzdGFydFRpbWUpICsgc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuUGluZ1Bvbmc6XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVkVGltZSA9IHBpbmdQb25nKHRpbWUgLSBzdGFydFRpbWUsIGVuZFRpbWUgLSBzdGFydFRpbWUpICsgc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuQ2xhbXBGb3JldmVyOlxyXG4gICAgICAgICAgICAgICAgd3JhcHBlZFRpbWUgPSBjbGFtcCh0aW1lLCBzdGFydFRpbWUsIGVuZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3cmFwcGVkVGltZSA+PSB0aGlzLmNhY2hlZEtleS50aW1lICYmIHdyYXBwZWRUaW1lIDwgdGhpcy5jYWNoZWRLZXkuZW5kVGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRLZXkuZXZhbHVhdGUod3JhcHBlZFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZnRJbmRleCA9IHRoaXMuZmluZEluZGV4KHRoaXMuY2FjaGVkS2V5LCB3cmFwcGVkVGltZSk7XHJcbiAgICAgICAgICAgIGxldCByaWdodEluZGV4ID0gbGVmdEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0SW5kZXggPT09IHRoaXMua2V5RnJhbWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRJbmRleCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY09wdGltaXplZEtleSh0aGlzLmNhY2hlZEtleSwgbGVmdEluZGV4LCByaWdodEluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkS2V5LmV2YWx1YXRlKHdyYXBwZWRUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY09wdGltaXplZEtleSAob3B0S2V5LCBsZWZ0SW5kZXgsIHJpZ2h0SW5kZXgpIHtcclxuICAgICAgICBjb25zdCBsaHMgPSB0aGlzLmtleUZyYW1lc1tsZWZ0SW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IHJocyA9IHRoaXMua2V5RnJhbWVzW3JpZ2h0SW5kZXhdO1xyXG4gICAgICAgIG9wdEtleS5pbmRleCA9IGxlZnRJbmRleDtcclxuICAgICAgICBvcHRLZXkudGltZSA9IGxocy50aW1lO1xyXG4gICAgICAgIG9wdEtleS5lbmRUaW1lID0gcmhzLnRpbWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGR4ID0gcmhzLnRpbWUgLSBsaHMudGltZTtcclxuICAgICAgICBjb25zdCBkeSA9IHJocy52YWx1ZSAtIGxocy52YWx1ZTtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSAxIC8gKGR4ICogZHgpO1xyXG4gICAgICAgIGNvbnN0IGQxID0gbGhzLm91dFRhbmdlbnQgKiBkeDtcclxuICAgICAgICBjb25zdCBkMiA9IHJocy5pblRhbmdlbnQgKiBkeDtcclxuXHJcbiAgICAgICAgb3B0S2V5LmNvZWZmaWNpZW50WzBdID0gKGQxICsgZDIgLSBkeSAtIGR5KSAqIGxlbmd0aCAvIGR4O1xyXG4gICAgICAgIG9wdEtleS5jb2VmZmljaWVudFsxXSA9IChkeSArIGR5ICsgZHkgLSBkMSAtIGQxIC0gZDIpICogbGVuZ3RoO1xyXG4gICAgICAgIG9wdEtleS5jb2VmZmljaWVudFsyXSA9IGxocy5vdXRUYW5nZW50O1xyXG4gICAgICAgIG9wdEtleS5jb2VmZmljaWVudFszXSA9IGxocy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kSW5kZXggKG9wdEtleSwgdCkge1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZEluZGV4ID0gb3B0S2V5LmluZGV4O1xyXG4gICAgICAgIGlmIChjYWNoZWRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2FjaGVkVGltZSA9IHRoaXMua2V5RnJhbWVzW2NhY2hlZEluZGV4XS50aW1lO1xyXG4gICAgICAgICAgICBpZiAodCA+IGNhY2hlZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTE9PS19GT1JXQVJEOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJySW5kZXggPSBjYWNoZWRJbmRleCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJJbmRleCArIDEgPCB0aGlzLmtleUZyYW1lcy5sZW5ndGggJiYgdGhpcy5rZXlGcmFtZXNbY3VyckluZGV4ICsgMV0udGltZSA+IHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IExPT0tfRk9SV0FSRDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VyckluZGV4ID0gY2FjaGVkSW5kZXggLSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJySW5kZXggPj0gMCAmJiB0aGlzLmtleUZyYW1lc1tjdXJySW5kZXggLSAxXS50aW1lIDw9IHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZWZ0ID0gMDtcclxuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmtleUZyYW1lcy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKGxlZnQgKyByaWdodCkgLyAyKTtcclxuICAgICAgICB3aGlsZSAocmlnaHQgLSBsZWZ0ID4gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5rZXlGcmFtZXNbbWlkXS50aW1lID49IHQpIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0ID0gbWlkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVmdCA9IG1pZCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWlkID0gTWF0aC5mbG9vcigobGVmdCArIHJpZ2h0KSAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVmdDtcclxuICAgIH1cclxufVxyXG5cclxuY2MuS2V5ZnJhbWUgPSBLZXlmcmFtZTtcclxuY2MuQW5pbWF0aW9uQ3VydmUgPSBBbmltYXRpb25DdXJ2ZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==