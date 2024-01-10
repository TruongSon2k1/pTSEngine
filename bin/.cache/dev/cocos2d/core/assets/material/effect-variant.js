
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/effect-variant.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _murmurhash2_gc = _interopRequireDefault(require("../../../renderer/murmurhash2_gc"));

var _utils = _interopRequireDefault(require("./utils"));

var _effectBase = _interopRequireDefault(require("./effect-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var gfx = cc.gfx;

var EffectVariant = /*#__PURE__*/function (_EffectBase) {
  _inheritsLoose(EffectVariant, _EffectBase);

  function EffectVariant(effect) {
    var _this;

    _this = _EffectBase.call(this) || this;
    _this._effect = void 0;
    _this._passes = [];
    _this._stagePasses = {};
    _this._hash = 0;

    _this.init(effect);

    return _this;
  }

  var _proto = EffectVariant.prototype;

  _proto._onEffectChanged = function _onEffectChanged() {};

  _proto.init = function init(effect) {
    if (effect instanceof EffectVariant) {
      effect = effect.effect;
    }

    this._effect = effect;
    this._dirty = true;

    if (effect) {
      var passes = effect.passes;
      var variantPasses = this._passes;
      variantPasses.length = 0;
      var stagePasses = this._stagePasses = {};

      for (var i = 0; i < passes.length; i++) {
        var variant = variantPasses[i] = Object.setPrototypeOf({}, passes[i]);
        variant._properties = Object.setPrototypeOf({}, passes[i]._properties);
        variant._defines = Object.setPrototypeOf({}, passes[i]._defines);

        if (!stagePasses[variant._stage]) {
          stagePasses[variant._stage] = [];
        }

        stagePasses[variant._stage].push(variant);
      }
    }
  };

  _proto.updateHash = function updateHash(hash) {};

  _proto.getHash = function getHash() {
    if (!this._dirty) return this._hash;
    this._dirty = false;
    var hash = '';
    hash += _utils["default"].serializePasses(this._passes);
    var effect = this._effect;

    if (effect) {
      hash += _utils["default"].serializePasses(effect.passes);
    }

    this._hash = (0, _murmurhash2_gc["default"])(hash, 666);
    this.updateHash(this._hash);
    return this._hash;
  };

  _createClass(EffectVariant, [{
    key: "effect",
    get: function get() {
      return this._effect;
    }
  }, {
    key: "name",
    get: function get() {
      return this._effect && this._effect.name + ' (variant)';
    }
  }, {
    key: "passes",
    get: function get() {
      return this._passes;
    }
  }, {
    key: "stagePasses",
    get: function get() {
      return this._stagePasses;
    }
  }]);

  return EffectVariant;
}(_effectBase["default"]);

exports["default"] = EffectVariant;
cc.EffectVariant = EffectVariant;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXGVmZmVjdC12YXJpYW50LnRzIl0sIm5hbWVzIjpbImdmeCIsImNjIiwiRWZmZWN0VmFyaWFudCIsImVmZmVjdCIsIl9lZmZlY3QiLCJfcGFzc2VzIiwiX3N0YWdlUGFzc2VzIiwiX2hhc2giLCJpbml0IiwiX29uRWZmZWN0Q2hhbmdlZCIsIl9kaXJ0eSIsInBhc3NlcyIsInZhcmlhbnRQYXNzZXMiLCJsZW5ndGgiLCJzdGFnZVBhc3NlcyIsImkiLCJ2YXJpYW50IiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfcHJvcGVydGllcyIsIl9kZWZpbmVzIiwiX3N0YWdlIiwicHVzaCIsInVwZGF0ZUhhc2giLCJoYXNoIiwiZ2V0SGFzaCIsInV0aWxzIiwic2VyaWFsaXplUGFzc2VzIiwibmFtZSIsIkVmZmVjdEJhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsR0FBRyxHQUFHQyxFQUFFLENBQUNELEdBQWY7O0lBRXFCRTs7O0FBc0JqQix5QkFBYUMsTUFBYixFQUE2QjtBQUFBOztBQUN6QjtBQUR5QixVQXJCN0JDLE9BcUI2QjtBQUFBLFVBcEI3QkMsT0FvQjZCLEdBcEJYLEVBb0JXO0FBQUEsVUFuQjdCQyxZQW1CNkIsR0FuQmQsRUFtQmM7QUFBQSxVQWxCN0JDLEtBa0I2QixHQWxCckIsQ0FrQnFCOztBQUV6QixVQUFLQyxJQUFMLENBQVVMLE1BQVY7O0FBRnlCO0FBRzVCOzs7O1NBRURNLG1CQUFBLDRCQUFvQixDQUNuQjs7U0FFREQsT0FBQSxjQUFNTCxNQUFOLEVBQXNCO0FBQ2xCLFFBQUlBLE1BQU0sWUFBWUQsYUFBdEIsRUFBcUM7QUFDakNDLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxDQUFDQSxNQUFoQjtBQUNIOztBQUVELFNBQUtDLE9BQUwsR0FBZUQsTUFBZjtBQUNBLFNBQUtPLE1BQUwsR0FBYyxJQUFkOztBQUVBLFFBQUlQLE1BQUosRUFBWTtBQUNSLFVBQUlRLE1BQU0sR0FBR1IsTUFBTSxDQUFDUSxNQUFwQjtBQUNBLFVBQUlDLGFBQWEsR0FBRyxLQUFLUCxPQUF6QjtBQUNBTyxNQUFBQSxhQUFhLENBQUNDLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxVQUFJQyxXQUFXLEdBQUcsS0FBS1IsWUFBTCxHQUFvQixFQUF0Qzs7QUFDQSxXQUFLLElBQUlTLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLE1BQU0sQ0FBQ0UsTUFBM0IsRUFBbUNFLENBQUMsRUFBcEMsRUFBd0M7QUFDcEMsWUFBSUMsT0FBTyxHQUFHSixhQUFhLENBQUNHLENBQUQsQ0FBYixHQUFtQkUsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEVBQXRCLEVBQTBCUCxNQUFNLENBQUNJLENBQUQsQ0FBaEMsQ0FBakM7QUFDQUMsUUFBQUEsT0FBTyxDQUFDRyxXQUFSLEdBQXNCRixNQUFNLENBQUNDLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEJQLE1BQU0sQ0FBQ0ksQ0FBRCxDQUFOLENBQVVJLFdBQXBDLENBQXRCO0FBQ0FILFFBQUFBLE9BQU8sQ0FBQ0ksUUFBUixHQUFtQkgsTUFBTSxDQUFDQyxjQUFQLENBQXNCLEVBQXRCLEVBQTBCUCxNQUFNLENBQUNJLENBQUQsQ0FBTixDQUFVSyxRQUFwQyxDQUFuQjs7QUFFQSxZQUFJLENBQUNOLFdBQVcsQ0FBQ0UsT0FBTyxDQUFDSyxNQUFULENBQWhCLEVBQWtDO0FBQzlCUCxVQUFBQSxXQUFXLENBQUNFLE9BQU8sQ0FBQ0ssTUFBVCxDQUFYLEdBQThCLEVBQTlCO0FBQ0g7O0FBQ0RQLFFBQUFBLFdBQVcsQ0FBQ0UsT0FBTyxDQUFDSyxNQUFULENBQVgsQ0FBNEJDLElBQTVCLENBQWlDTixPQUFqQztBQUNIO0FBQ0o7QUFDSjs7U0FFRE8sYUFBQSxvQkFBWUMsSUFBWixFQUEwQixDQUV6Qjs7U0FFREMsVUFBQSxtQkFBVztBQUNQLFFBQUksQ0FBQyxLQUFLZixNQUFWLEVBQWtCLE9BQU8sS0FBS0gsS0FBWjtBQUNsQixTQUFLRyxNQUFMLEdBQWMsS0FBZDtBQUVBLFFBQUljLElBQUksR0FBRyxFQUFYO0FBQ0FBLElBQUFBLElBQUksSUFBSUUsa0JBQU1DLGVBQU4sQ0FBc0IsS0FBS3RCLE9BQTNCLENBQVI7QUFFQSxRQUFJRixNQUFNLEdBQUcsS0FBS0MsT0FBbEI7O0FBQ0EsUUFBSUQsTUFBSixFQUFZO0FBQ1JxQixNQUFBQSxJQUFJLElBQUlFLGtCQUFNQyxlQUFOLENBQXNCeEIsTUFBTSxDQUFDUSxNQUE3QixDQUFSO0FBQ0g7O0FBRUQsU0FBS0osS0FBTCxHQUFhLGdDQUFZaUIsSUFBWixFQUFrQixHQUFsQixDQUFiO0FBRUEsU0FBS0QsVUFBTCxDQUFnQixLQUFLaEIsS0FBckI7QUFFQSxXQUFPLEtBQUtBLEtBQVo7QUFDSDs7OztTQXZFRCxlQUFjO0FBQ1YsYUFBTyxLQUFLSCxPQUFaO0FBQ0g7OztTQUVELGVBQVk7QUFDUixhQUFPLEtBQUtBLE9BQUwsSUFBaUIsS0FBS0EsT0FBTCxDQUFhd0IsSUFBYixHQUFvQixZQUE1QztBQUNIOzs7U0FFRCxlQUFjO0FBQ1YsYUFBTyxLQUFLdkIsT0FBWjtBQUNIOzs7U0FFRCxlQUFtQjtBQUNmLGFBQU8sS0FBS0MsWUFBWjtBQUNIOzs7O0VBcEJzQ3VCOzs7QUFnRjNDNUIsRUFBRSxDQUFDQyxhQUFILEdBQW1CQSxhQUFuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtdXJtdXJoYXNoMiBmcm9tICcuLi8uLi8uLi9yZW5kZXJlci9tdXJtdXJoYXNoMl9nYyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcclxuaW1wb3J0IFBhc3MgZnJvbSAnLi4vLi4vLi4vcmVuZGVyZXIvY29yZS9wYXNzJztcclxuaW1wb3J0IEVmZmVjdCBmcm9tICcuL2VmZmVjdCc7XHJcbmltcG9ydCBFZmZlY3RCYXNlIGZyb20gJy4vZWZmZWN0LWJhc2UnO1xyXG5cclxuY29uc3QgZ2Z4ID0gY2MuZ2Z4O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWZmZWN0VmFyaWFudCBleHRlbmRzIEVmZmVjdEJhc2Uge1xyXG4gICAgX2VmZmVjdDogRWZmZWN0O1xyXG4gICAgX3Bhc3NlczogUGFzc1tdID0gW107XHJcbiAgICBfc3RhZ2VQYXNzZXMgPSB7fTtcclxuICAgIF9oYXNoID0gMDtcclxuXHJcbiAgICBnZXQgZWZmZWN0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuYW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0ICYmICh0aGlzLl9lZmZlY3QubmFtZSArICcgKHZhcmlhbnQpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhc3NlcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3RhZ2VQYXNzZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFnZVBhc3NlcztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoZWZmZWN0OiBFZmZlY3QpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdChlZmZlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkVmZmVjdENoYW5nZWQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQgKGVmZmVjdDogRWZmZWN0KSB7XHJcbiAgICAgICAgaWYgKGVmZmVjdCBpbnN0YW5jZW9mIEVmZmVjdFZhcmlhbnQpIHtcclxuICAgICAgICAgICAgZWZmZWN0ID0gZWZmZWN0LmVmZmVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2VmZmVjdCA9IGVmZmVjdDtcclxuICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGVmZmVjdCkge1xyXG4gICAgICAgICAgICBsZXQgcGFzc2VzID0gZWZmZWN0LnBhc3NlcztcclxuICAgICAgICAgICAgbGV0IHZhcmlhbnRQYXNzZXMgPSB0aGlzLl9wYXNzZXM7XHJcbiAgICAgICAgICAgIHZhcmlhbnRQYXNzZXMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgbGV0IHN0YWdlUGFzc2VzID0gdGhpcy5fc3RhZ2VQYXNzZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXNzZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YXJpYW50ID0gdmFyaWFudFBhc3Nlc1tpXSA9IE9iamVjdC5zZXRQcm90b3R5cGVPZih7fSwgcGFzc2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIHZhcmlhbnQuX3Byb3BlcnRpZXMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2Yoe30sIHBhc3Nlc1tpXS5fcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgICAgICB2YXJpYW50Ll9kZWZpbmVzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mKHt9LCBwYXNzZXNbaV0uX2RlZmluZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc3RhZ2VQYXNzZXNbdmFyaWFudC5fc3RhZ2VdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2VQYXNzZXNbdmFyaWFudC5fc3RhZ2VdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFnZVBhc3Nlc1t2YXJpYW50Ll9zdGFnZV0ucHVzaCh2YXJpYW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIYXNoIChoYXNoOiBudW1iZXIpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFzaCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkgcmV0dXJuIHRoaXMuX2hhc2g7XHJcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGhhc2ggPSAnJztcclxuICAgICAgICBoYXNoICs9IHV0aWxzLnNlcmlhbGl6ZVBhc3Nlcyh0aGlzLl9wYXNzZXMpO1xyXG5cclxuICAgICAgICBsZXQgZWZmZWN0ID0gdGhpcy5fZWZmZWN0O1xyXG4gICAgICAgIGlmIChlZmZlY3QpIHtcclxuICAgICAgICAgICAgaGFzaCArPSB1dGlscy5zZXJpYWxpemVQYXNzZXMoZWZmZWN0LnBhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oYXNoID0gbXVybXVyaGFzaDIoaGFzaCwgNjY2KTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVIYXNoKHRoaXMuX2hhc2gpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcclxuICAgIH1cclxufVxyXG5cclxuY2MuRWZmZWN0VmFyaWFudCA9IEVmZmVjdFZhcmlhbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9