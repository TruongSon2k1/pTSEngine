
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/texture-animation.js';
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

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var TEXTURE_ANIMATION_RAND_OFFSET = 90794;
/**
 * 粒子贴图动画类型
 * @enum textureAnimationModule.Mode
 */

var Mode = (0, _CCEnum["default"])({
  /**
   * 网格类型
   */
  Grid: 0
  /**
   * 精灵类型（暂未支持）
   */
  //Sprites: 1,

});
/**
 * 贴图动画的播放方式
 * @enum textureAnimationModule.Animation
 */

var Animation = (0, _CCEnum["default"])({
  /**
   * 播放贴图中的所有帧
   */
  WholeSheet: 0,

  /**
   * 播放贴图中的其中一行动画
   */
  SingleRow: 1
});
/**
 * !#en The texture animation module of 3d particle.
 * !#zh 3D 粒子的贴图动画模块
 * @class TextureAnimationModule
 */

var TextureAnimationModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.TextureAnimationModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: Animation
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function TextureAnimationModule() {
    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "_mode", _descriptor2, this);

    _initializerDefineProperty(this, "numTilesX", _descriptor3, this);

    _initializerDefineProperty(this, "numTilesY", _descriptor4, this);

    _initializerDefineProperty(this, "animation", _descriptor5, this);

    _initializerDefineProperty(this, "randomRow", _descriptor6, this);

    _initializerDefineProperty(this, "rowIndex", _descriptor7, this);

    _initializerDefineProperty(this, "frameOverTime", _descriptor8, this);

    _initializerDefineProperty(this, "startFrame", _descriptor9, this);

    _initializerDefineProperty(this, "cycleCount", _descriptor10, this);

    this._flipU = 0;
    this._flipV = 0;
    this._uvChannelMask = -1;
    this.ps = null;
  }

  var _proto = TextureAnimationModule.prototype;

  _proto.onInit = function onInit(ps) {
    this.ps = ps;
  };

  _proto.init = function init(p) {
    p.startRow = Math.floor(Math.random() * this.numTilesY);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var startFrame = this.startFrame.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);

    if (this.animation === Animation.WholeSheet) {
      p.frameIndex = (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
    } else if (this.animation === Animation.SingleRow) {
      var rowLength = 1 / this.numTilesY;

      if (this.randomRow) {
        var f = (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
        var from = p.startRow * rowLength;
        var to = from + rowLength;
        p.frameIndex = (0, _valueTypes.lerp)(from, to, f);
      } else {
        var _from = this.rowIndex * rowLength;

        var _to = _from + rowLength;

        p.frameIndex = (0, _valueTypes.lerp)(_from, _to, (0, _valueTypes.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
      }
    }
  };

  _createClass(TextureAnimationModule, [{
    key: "enable",
    get:
    /**
     * !#en The enable of TextureAnimationModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */
    function get() {
      return this._enable;
    },
    set: function set(val) {
      this._enable = val;

      this.ps._assembler._updateMaterialParams();
    }
  }, {
    key: "mode",
    get:
    /**
     * !#en Set the type of particle map animation (only supports Grid mode for the time being)
     * !#zh 设定粒子贴图动画的类型（暂只支持 Grid 模式。
     * @property {Mode} mode
     */
    function get() {
      return this._mode;
    },
    set: function set(val) {
      if (val !== Mode.Grid) {
        console.error('particle texture animation\'s sprites is not supported!');
        return;
      }
    }
    /**
     * !#en Animation frames in X direction.
     * !#zh X 方向动画帧数。
     * @property {Number} numTilesX
     */

  }, {
    key: "flipU",
    get: function get() {
      return this._flipU;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipU is not supported!');
    }
  }, {
    key: "flipV",
    get: function get() {
      return this._flipV;
    },
    set: function set(val) {
      console.error('particle texture animation\'s flipV is not supported!');
    }
  }, {
    key: "uvChannelMask",
    get: function get() {
      return this._uvChannelMask;
    },
    set: function set(val) {
      console.error('particle texture animation\'s uvChannelMask is not supported!');
    }
  }]);

  return TextureAnimationModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Grid;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "numTilesX", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "numTilesY", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Animation.WholeSheet;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "randomRow", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rowIndex", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "frameOverTime", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startFrame", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "cycleCount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "flipU", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "flipU"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "flipV", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "flipV"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "uvChannelMask", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "uvChannelMask"), _class2.prototype)), _class2)) || _class);
exports["default"] = TextureAnimationModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXHRleHR1cmUtYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbIlRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUIiwiTW9kZSIsIkdyaWQiLCJBbmltYXRpb24iLCJXaG9sZVNoZWV0IiwiU2luZ2xlUm93IiwiVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSIsInR5cGUiLCJDdXJ2ZVJhbmdlIiwiX2ZsaXBVIiwiX2ZsaXBWIiwiX3V2Q2hhbm5lbE1hc2siLCJwcyIsIm9uSW5pdCIsImluaXQiLCJwIiwic3RhcnRSb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJudW1UaWxlc1kiLCJhbmltYXRlIiwibm9ybWFsaXplZFRpbWUiLCJyZW1haW5pbmdMaWZldGltZSIsInN0YXJ0TGlmZXRpbWUiLCJzdGFydEZyYW1lIiwiZXZhbHVhdGUiLCJyYW5kb21TZWVkIiwibnVtVGlsZXNYIiwiYW5pbWF0aW9uIiwiZnJhbWVJbmRleCIsImN5Y2xlQ291bnQiLCJmcmFtZU92ZXJUaW1lIiwicm93TGVuZ3RoIiwicmFuZG9tUm93IiwiZiIsImZyb20iLCJ0byIsInJvd0luZGV4IiwiX2VuYWJsZSIsInZhbCIsIl9hc3NlbWJsZXIiLCJfdXBkYXRlTWF0ZXJpYWxQYXJhbXMiLCJfbW9kZSIsImNvbnNvbGUiLCJlcnJvciIsInByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLEtBQXRDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHLHdCQUFLO0FBQ2Q7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRTtBQUVOO0FBQ0o7QUFDQTtBQUNJOztBQVRjLENBQUwsQ0FBYjtBQVlBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElB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Ozs4RUFTckIwQzs7Ozs7V0FDVzs7NkVBU1hBOzs7OztXQUNVOzs7Ozs7O1dBVUssSUFBSXRDLHNCQUFKOzs7Ozs7O1dBVUgsSUFBSUEsc0JBQUo7O2dGQU9ac0M7Ozs7O1dBQ1k7OzJEQUlaQSxxS0FXQUEsNktBV0FBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcclxuaW1wb3J0IEVudW0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NFbnVtJztcclxuaW1wb3J0IHsgbGVycCwgcHNldWRvUmFuZG9tLCByZXBlYXQgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vY3VydmUtcmFuZ2UnO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGU6IG1heC1saW5lLWxlbmd0aFxyXG5jb25zdCBURVhUVVJFX0FOSU1BVElPTl9SQU5EX09GRlNFVCA9IDkwNzk0O1xyXG5cclxuLyoqXHJcbiAqIOeykuWtkOi0tOWbvuWKqOeUu+exu+Wei1xyXG4gKiBAZW51bSB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLk1vZGVcclxuICovXHJcbmNvbnN0IE1vZGUgPSBFbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICog572R5qC857G75Z6LXHJcbiAgICAgKi9cclxuICAgIEdyaWQ6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnsr7ngbXnsbvlnovvvIjmmoLmnKrmlK/mjIHvvIlcclxuICAgICAqL1xyXG4gICAgLy9TcHJpdGVzOiAxLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDotLTlm77liqjnlLvnmoTmkq3mlL7mlrnlvI9cclxuICogQGVudW0gdGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5BbmltYXRpb25cclxuICovXHJcbmNvbnN0IEFuaW1hdGlvbiA9IEVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7otLTlm77kuK3nmoTmiYDmnInluKdcclxuICAgICAqL1xyXG4gICAgV2hvbGVTaGVldDogMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvui0tOWbvuS4reeahOWFtuS4reS4gOihjOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBTaW5nbGVSb3c6IDEsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHRleHR1cmUgYW5pbWF0aW9uIG1vZHVsZSBvZiAzZCBwYXJ0aWNsZS5cclxuICogISN6aCAzRCDnspLlrZDnmoTotLTlm77liqjnlLvmqKHlnZdcclxuICogQGNsYXNzIFRleHR1cmVBbmltYXRpb25Nb2R1bGVcclxuICovXHJcbkBjY2NsYXNzKCdjYy5UZXh0dXJlQW5pbWF0aW9uTW9kdWxlJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSB7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfZW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbmFibGUgb2YgVGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5cclxuICAgICAqICEjemgg5piv5ZCm5ZCv55SoXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBlbmFibGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGVuYWJsZSAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlID0gdmFsO1xyXG4gICAgICAgIHRoaXMucHMuX2Fzc2VtYmxlci5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9tb2RlID0gTW9kZS5HcmlkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIHR5cGUgb2YgcGFydGljbGUgbWFwIGFuaW1hdGlvbiAob25seSBzdXBwb3J0cyBHcmlkIG1vZGUgZm9yIHRoZSB0aW1lIGJlaW5nKVxyXG4gICAgICogISN6aCDorr7lrprnspLlrZDotLTlm77liqjnlLvnmoTnsbvlnovvvIjmmoLlj6rmlK/mjIEgR3JpZCDmqKHlvI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IE1vZGUsXHJcbiAgICB9KVxyXG4gICAgZ2V0IG1vZGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtb2RlICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9PSBNb2RlLkdyaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncGFydGljbGUgdGV4dHVyZSBhbmltYXRpb25cXCdzIHNwcml0ZXMgaXMgbm90IHN1cHBvcnRlZCEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQW5pbWF0aW9uIGZyYW1lcyBpbiBYIGRpcmVjdGlvbi5cclxuICAgICAqICEjemggWCDmlrnlkJHliqjnlLvluKfmlbDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBudW1UaWxlc1hcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBudW1UaWxlc1ggPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBbmltYXRpb24gZnJhbWVzIGluIFkgZGlyZWN0aW9uLlxyXG4gICAgICogISN6aCBZIOaWueWQkeWKqOeUu+W4p+aVsOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG51bVRpbGVzWVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIG51bVRpbGVzWSA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSB3YXkgb2YgdGhlIGFuaW1hdGlvbiBwbGF5cy5cclxuICAgICAqICEjemgg5Yqo55S75pKt5pS+5pa55byP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0FuaW1hdGlvbn0gYW5pbWF0aW9uXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQW5pbWF0aW9uLFxyXG4gICAgfSlcclxuICAgIGFuaW1hdGlvbiA9IEFuaW1hdGlvbi5XaG9sZVNoZWV0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSYW5kb21seSBzZWxlY3QgYSBsaW5lIGZyb20gdGhlIGFuaW1hdGVkIG1hcCB0byBnZW5lcmF0ZSB0aGUgYW5pbWF0aW9uLiA8YnI+XHJcbsKgwqDCoMKgwqAqIFRoaXMgb3B0aW9uIG9ubHkgdGFrZXMgZWZmZWN0IHdoZW4gdGhlIGFuaW1hdGlvbiBwbGF5YmFjayBtb2RlIGlzIFNpbmdsZVJvdy5cclxuICAgICAqICEjemgg6ZqP5py65LuO5Yqo55S76LS05Zu+5Lit6YCJ5oup5LiA6KGM5Lul55Sf5oiQ5Yqo55S744CCPGJyPlxyXG4gICAgICog5q2k6YCJ6aG55LuF5Zyo5Yqo55S75pKt5pS+5pa55byP5Li6IFNpbmdsZVJvdyDml7bnlJ/mlYjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcmFuZG9tUm93XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcmFuZG9tUm93ID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNlbGVjdCBzcGVjaWZpYyBsaW5lcyBmcm9tIHRoZSBhbmltYXRpb24gbWFwIHRvIGdlbmVyYXRlIHRoZSBhbmltYXRpb24uIDxicj5cclxuwqDCoMKgwqDCoCogVGhpcyBvcHRpb24gaXMgb25seSBhdmFpbGFibGUgd2hlbiB0aGUgYW5pbWF0aW9uIHBsYXliYWNrIG1vZGUgaXMgU2luZ2xlUm93IGFuZCByYW5kb21Sb3cgaXMgZGlzYWJsZWQuXHJcbiAgICAgKiAhI3poIOS7juWKqOeUu+i0tOWbvuS4remAieaLqeeJueWumuihjOS7peeUn+aIkOWKqOeUu+OAgjxicj5cclxuICAgICAqIOatpOmAiemhueS7heWcqOWKqOeUu+aSreaUvuaWueW8j+S4uiBTaW5nbGVSb3cg5pe25LiU56aB55SoIHJhbmRvbVJvdyDml7blj6/nlKjjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByb3dJbmRleFxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHJvd0luZGV4ID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRnJhbWUgYW5kIHRpbWUgY3VydmUgb2YgYW5pbWF0aW9uIHBsYXliYWNrIGluIG9uZSBjeWNsZS5cclxuICAgICAqICEjemgg5LiA5Liq5ZGo5pyf5YaF5Yqo55S75pKt5pS+55qE5bin5LiO5pe26Ze05Y+Y5YyW5puy57q/44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGZyYW1lT3ZlclRpbWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIGZyYW1lT3ZlclRpbWUgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQbGF5IGZyb20gd2hpY2ggZnJhbWVzLCB0aGUgdGltZSBpcyB0aGUgbGlmZSBjeWNsZSBvZiB0aGUgZW50aXJlIHBhcnRpY2xlIHN5c3RlbS5cclxuICAgICAqICEjemgg5LuO56ys5Yeg5bin5byA5aeL5pKt5pS+77yM5pe26Ze05Li65pW05Liq57KS5a2Q57O757uf55qE55Sf5ZG95ZGo5pyf44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHN0YXJ0RnJhbWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxyXG4gICAgfSlcclxuICAgIHN0YXJ0RnJhbWUgPSBuZXcgQ3VydmVSYW5nZSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBOdW1iZXIgb2YgcGxheWJhY2sgbG9vcHMgaW4gYSBsaWZlIGN5Y2xlLlxyXG4gICAgICogISN6aCDkuIDkuKrnlJ/lkb3lkajmnJ/lhoXmkq3mlL7lvqrnjq/nmoTmrKHmlbDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjeWNsZUNvdW50XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgY3ljbGVDb3VudCA9IDA7XHJcbiAgICBcclxuICAgIF9mbGlwVSA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgZmxpcFUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mbGlwVTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZmxpcFUgKHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnRpY2xlIHRleHR1cmUgYW5pbWF0aW9uXFwncyBmbGlwVSBpcyBub3Qgc3VwcG9ydGVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIF9mbGlwViA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgZmxpcFYgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mbGlwVjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZmxpcFYgKHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnRpY2xlIHRleHR1cmUgYW5pbWF0aW9uXFwncyBmbGlwViBpcyBub3Qgc3VwcG9ydGVkIScpO1xyXG4gICAgfVxyXG5cclxuICAgIF91dkNoYW5uZWxNYXNrID0gLTE7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgdXZDaGFubmVsTWFzayAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V2Q2hhbm5lbE1hc2s7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHV2Q2hhbm5lbE1hc2sgKHZhbCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3BhcnRpY2xlIHRleHR1cmUgYW5pbWF0aW9uXFwncyB1dkNoYW5uZWxNYXNrIGlzIG5vdCBzdXBwb3J0ZWQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHMgPSBudWxsO1xyXG5cclxuICAgIG9uSW5pdCAocHMpIHtcclxuICAgICAgICB0aGlzLnBzID0gcHM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCAocCkge1xyXG4gICAgICAgIHAuc3RhcnRSb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm51bVRpbGVzWSk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZSAocCkge1xyXG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUaW1lID0gMSAtIHAucmVtYWluaW5nTGlmZXRpbWUgLyBwLnN0YXJ0TGlmZXRpbWU7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRGcmFtZSA9IHRoaXMuc3RhcnRGcmFtZS5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUKSkgLyAodGhpcy5udW1UaWxlc1ggKiB0aGlzLm51bVRpbGVzWSk7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uID09PSBBbmltYXRpb24uV2hvbGVTaGVldCkge1xyXG4gICAgICAgICAgICBwLmZyYW1lSW5kZXggPSByZXBlYXQodGhpcy5jeWNsZUNvdW50ICogKHRoaXMuZnJhbWVPdmVyVGltZS5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFRFWFRVUkVfQU5JTUFUSU9OX1JBTkRfT0ZGU0VUKSkgKyBzdGFydEZyYW1lKSwgMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFuaW1hdGlvbiA9PT0gQW5pbWF0aW9uLlNpbmdsZVJvdykge1xyXG4gICAgICAgICAgICBjb25zdCByb3dMZW5ndGggPSAxIC8gdGhpcy5udW1UaWxlc1k7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmRvbVJvdykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZiA9IHJlcGVhdCh0aGlzLmN5Y2xlQ291bnQgKiAodGhpcy5mcmFtZU92ZXJUaW1lLmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgVEVYVFVSRV9BTklNQVRJT05fUkFORF9PRkZTRVQpKSArIHN0YXJ0RnJhbWUpLCAxKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb20gPSBwLnN0YXJ0Um93ICogcm93TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG8gPSBmcm9tICsgcm93TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgcC5mcmFtZUluZGV4ID0gbGVycChmcm9tLCB0bywgZik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5yb3dJbmRleCAqIHJvd0xlbmd0aDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gZnJvbSArIHJvd0xlbmd0aDtcclxuICAgICAgICAgICAgICAgIHAuZnJhbWVJbmRleCA9IGxlcnAoZnJvbSwgdG8sIHJlcGVhdCh0aGlzLmN5Y2xlQ291bnQgKiAodGhpcy5mcmFtZU92ZXJUaW1lLmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgVEVYVFVSRV9BTklNQVRJT05fUkFORF9PRkZTRVQpKSArIHN0YXJ0RnJhbWUpLCAxKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=