
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/CCEffectAsset.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _CCAsset = _interopRequireDefault(require("../CCAsset"));

var _effectParser = require("./effect-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * !#en Effect Asset.
 * !#zh Effect 资源类型。
 * @class EffectAsset
 * @extends Asset
 */
var EffectAsset = cc.Class({
  name: 'cc.EffectAsset',
  "extends": _CCAsset["default"],
  ctor: function ctor() {
    this._effect = null;
  },
  properties: {
    properties: Object,
    techniques: [],
    shaders: []
  },
  onLoad: function onLoad() {
    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      return;
    }

    var lib = cc.renderer._forward._programLib;

    for (var i = 0; i < this.shaders.length; i++) {
      lib.define(this.shaders[i]);
    }

    this._initEffect();
  },
  _initEffect: function _initEffect() {
    if (this._effect) return;
    this._effect = (0, _effectParser.parseEffect)(this);
    Object.freeze(this._effect);
  },
  getInstantiatedEffect: function getInstantiatedEffect() {
    this._initEffect();

    return this._effect.clone();
  },
  getEffect: function getEffect() {
    this._initEffect();

    return this._effect;
  }
});
module.exports = cc.EffectAsset = EffectAsset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXENDRWZmZWN0QXNzZXQuanMiXSwibmFtZXMiOlsiRWZmZWN0QXNzZXQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwiY3RvciIsIl9lZmZlY3QiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwidGVjaG5pcXVlcyIsInNoYWRlcnMiLCJvbkxvYWQiLCJnYW1lIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsImxpYiIsInJlbmRlcmVyIiwiX2ZvcndhcmQiLCJfcHJvZ3JhbUxpYiIsImkiLCJsZW5ndGgiLCJkZWZpbmUiLCJfaW5pdEVmZmVjdCIsImZyZWV6ZSIsImdldEluc3RhbnRpYXRlZEVmZmVjdCIsImNsb25lIiwiZ2V0RWZmZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTQyxtQkFGYztBQUl2QkMsRUFBQUEsSUFKdUIsa0JBSWY7QUFDSixTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNILEdBTnNCO0FBUXZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkEsSUFBQUEsVUFBVSxFQUFFQyxNQURKO0FBRVJDLElBQUFBLFVBQVUsRUFBRSxFQUZKO0FBR1JDLElBQUFBLE9BQU8sRUFBRTtBQUhELEdBUlc7QUFjdkJDLEVBQUFBLE1BZHVCLG9CQWNiO0FBQ04sUUFBSVYsRUFBRSxDQUFDVyxJQUFILENBQVFDLFVBQVIsS0FBdUJaLEVBQUUsQ0FBQ1csSUFBSCxDQUFRRSxrQkFBbkMsRUFBdUQ7QUFDbkQ7QUFDSDs7QUFFRCxRQUFJQyxHQUFHLEdBQUdkLEVBQUUsQ0FBQ2UsUUFBSCxDQUFZQyxRQUFaLENBQXFCQyxXQUEvQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS1QsT0FBTCxDQUFhVSxNQUFqQyxFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUMxQ0osTUFBQUEsR0FBRyxDQUFDTSxNQUFKLENBQVcsS0FBS1gsT0FBTCxDQUFhUyxDQUFiLENBQVg7QUFDSDs7QUFFRCxTQUFLRyxXQUFMO0FBQ0gsR0F6QnNCO0FBMkJ2QkEsRUFBQUEsV0EzQnVCLHlCQTJCUjtBQUNYLFFBQUksS0FBS2hCLE9BQVQsRUFBa0I7QUFDbEIsU0FBS0EsT0FBTCxHQUFlLCtCQUFZLElBQVosQ0FBZjtBQUNBRSxJQUFBQSxNQUFNLENBQUNlLE1BQVAsQ0FBYyxLQUFLakIsT0FBbkI7QUFDSCxHQS9Cc0I7QUFpQ3ZCa0IsRUFBQUEscUJBakN1QixtQ0FpQ0U7QUFDckIsU0FBS0YsV0FBTDs7QUFDQSxXQUFPLEtBQUtoQixPQUFMLENBQWFtQixLQUFiLEVBQVA7QUFDSCxHQXBDc0I7QUFzQ3ZCQyxFQUFBQSxTQXRDdUIsdUJBc0NWO0FBQ1QsU0FBS0osV0FBTDs7QUFDQSxXQUFPLEtBQUtoQixPQUFaO0FBQ0g7QUF6Q3NCLENBQVQsQ0FBbEI7QUE0Q0FxQixNQUFNLENBQUNDLE9BQVAsR0FBaUIzQixFQUFFLENBQUNELFdBQUgsR0FBaUJBLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzc2V0IGZyb20gJy4uL0NDQXNzZXQnO1xyXG5pbXBvcnQgeyBwYXJzZUVmZmVjdCB9IGZyb20gJy4vZWZmZWN0LXBhcnNlcic7XHJcblxyXG4vKipcclxuICogISNlbiBFZmZlY3QgQXNzZXQuXHJcbiAqICEjemggRWZmZWN0IOi1hOa6kOexu+Wei+OAglxyXG4gKiBAY2xhc3MgRWZmZWN0QXNzZXRcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcbmxldCBFZmZlY3RBc3NldCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5FZmZlY3RBc3NldCcsXHJcbiAgICBleHRlbmRzOiBBc3NldCxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9lZmZlY3QgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgcHJvcGVydGllczogT2JqZWN0LFxyXG4gICAgICAgIHRlY2huaXF1ZXM6IFtdLFxyXG4gICAgICAgIHNoYWRlcnM6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGliID0gY2MucmVuZGVyZXIuX2ZvcndhcmQuX3Byb2dyYW1MaWI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGliLmRlZmluZSh0aGlzLnNoYWRlcnNbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5pdEVmZmVjdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdEVmZmVjdCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VmZmVjdCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdCA9IHBhcnNlRWZmZWN0KHRoaXMpO1xyXG4gICAgICAgIE9iamVjdC5mcmVlemUodGhpcy5fZWZmZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SW5zdGFudGlhdGVkRWZmZWN0ICgpIHtcclxuICAgICAgICB0aGlzLl9pbml0RWZmZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VmZmVjdC5jbG9uZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRFZmZlY3QgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRFZmZlY3QoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0O1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuRWZmZWN0QXNzZXQgPSBFZmZlY3RBc3NldDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=