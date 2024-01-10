
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/gradient.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Gradient = exports.AlphaKey = exports.ColorKey = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2, _dec3, _dec4, _dec5, _dec6, _class7, _class8, _descriptor5, _descriptor6, _descriptor7, _class9, _temp3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var Mode = (0, _CCEnum["default"])({
  Blend: 0,
  Fixed: 1
});
/**
 * !#en The color key of gradient.
 * !#zh color 关键帧
 * @class ColorKey
 */

var ColorKey = (_dec = (0, _CCClassDecorator.ccclass)('cc.ColorKey'), _dec(_class = (_class2 = (_temp = function ColorKey() {
  _initializerDefineProperty(this, "color", _descriptor, this);

  _initializerDefineProperty(this, "time", _descriptor2, this);
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
/**
 * !#en The alpha key of gradient.
 * !#zh alpha 关键帧
 * @class AlphaKey
 */

exports.ColorKey = ColorKey;
var AlphaKey = (_dec2 = (0, _CCClassDecorator.ccclass)('cc.AlphaKey'), _dec2(_class4 = (_class5 = (_temp2 = function AlphaKey() {
  _initializerDefineProperty(this, "alpha", _descriptor3, this);

  _initializerDefineProperty(this, "time", _descriptor4, this);
}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "alpha", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class5)) || _class4);
/**
 * !#en The gradient data of color.
 * !#zh 颜色渐变数据
 * @class Gradient
 */

exports.AlphaKey = AlphaKey;
var Gradient = (_dec3 = (0, _CCClassDecorator.ccclass)('cc.Gradient'), _dec4 = (0, _CCClassDecorator.property)({
  type: [ColorKey]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: [AlphaKey]
}), _dec6 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3(_class7 = (_class8 = (_temp3 = _class9 = /*#__PURE__*/function () {
  /**
   * !#en Array of color key.
   * !#zh 颜色关键帧列表。
   * @property {[ColorKey]} colorKeys
   */

  /**
   * !#en Array of alpha key.
   * !#zh 透明度关键帧列表。
   * @property {[AlphaKey]} alphaKeys
   */

  /**
   * !#en Blend mode.
   * !#zh 混合模式。
   * @property {Mode} mode
   */
  function Gradient() {
    _initializerDefineProperty(this, "colorKeys", _descriptor5, this);

    _initializerDefineProperty(this, "alphaKeys", _descriptor6, this);

    _initializerDefineProperty(this, "mode", _descriptor7, this);

    this._color = null;
    this._color = cc.Color.WHITE.clone();
  }

  var _proto = Gradient.prototype;

  _proto.setKeys = function setKeys(colorKeys, alphaKeys) {
    this.colorKeys = colorKeys;
    this.alphaKeys = alphaKeys;
  };

  _proto.sortKeys = function sortKeys() {
    if (this.colorKeys.length > 1) {
      this.colorKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }

    if (this.alphaKeys.length > 1) {
      this.alphaKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }
  };

  _proto.evaluate = function evaluate(time) {
    this.getRGB(time);

    this._color._fastSetA(this.getAlpha(time));

    return this._color;
  };

  _proto.randomColor = function randomColor() {
    var c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
    var a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];

    this._color.set(c.color);

    this._color._fastSetA(a.alpha);

    return this._color;
  };

  _proto.getRGB = function getRGB(time) {
    if (this.colorKeys.length > 1) {
      time = (0, _valueTypes.repeat)(time, 1);

      for (var i = 1; i < this.colorKeys.length; ++i) {
        var preTime = this.colorKeys[i - 1].time;
        var curTime = this.colorKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.colorKeys[i].color;
          }

          var factor = (time - preTime) / (curTime - preTime);
          this.colorKeys[i - 1].color.lerp(this.colorKeys[i].color, factor, this._color);
          return this._color;
        }
      }

      var lastIndex = this.colorKeys.length - 1;

      if (time < this.colorKeys[0].time) {
        cc.Color.BLACK.lerp(this.colorKeys[0].color, time / this.colorKeys[0].time, this._color);
      } else if (time > this.colorKeys[lastIndex].time) {
        this.colorKeys[lastIndex].color.lerp(cc.Color.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time), this._color);
      } // console.warn('something went wrong. can not get gradient color.');

    } else if (this.colorKeys.length === 1) {
      this._color.set(this.colorKeys[0].color);

      return this._color;
    } else {
      this._color.set(cc.Color.WHITE);

      return this._color;
    }
  };

  _proto.getAlpha = function getAlpha(time) {
    if (this.alphaKeys.length > 1) {
      time = (0, _valueTypes.repeat)(time, 1);

      for (var i = 1; i < this.alphaKeys.length; ++i) {
        var preTime = this.alphaKeys[i - 1].time;
        var curTime = this.alphaKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.alphaKeys[i].alpha;
          }

          var factor = (time - preTime) / (curTime - preTime);
          return (0, _valueTypes.lerp)(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
        }
      }

      var lastIndex = this.alphaKeys.length - 1;

      if (time < this.alphaKeys[0].time) {
        return (0, _valueTypes.lerp)(255, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
      } else if (time > this.alphaKeys[lastIndex].time) {
        return (0, _valueTypes.lerp)(this.alphaKeys[lastIndex].alpha, 255, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
      }
    } else if (this.alphaKeys.length === 1) {
      return this.alphaKeys[0].alpha;
    } else {
      return 255;
    }
  };

  return Gradient;
}(), _class9.Mode = Mode, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "colorKeys", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "alphaKeys", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "mode", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Blend;
  }
})), _class8)) || _class7);
exports.Gradient = Gradient;
cc.ColorKey = ColorKey;
cc.AlphaKey = AlphaKey;
cc.Gradient = Gradient;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxcYW5pbWF0b3JcXGdyYWRpZW50LnRzIl0sIm5hbWVzIjpbIk1vZGUiLCJCbGVuZCIsIkZpeGVkIiwiQ29sb3JLZXkiLCJwcm9wZXJ0eSIsImNjIiwiQ29sb3IiLCJXSElURSIsImNsb25lIiwiQWxwaGFLZXkiLCJHcmFkaWVudCIsInR5cGUiLCJfY29sb3IiLCJzZXRLZXlzIiwiY29sb3JLZXlzIiwiYWxwaGFLZXlzIiwic29ydEtleXMiLCJsZW5ndGgiLCJzb3J0IiwiYSIsImIiLCJ0aW1lIiwiZXZhbHVhdGUiLCJnZXRSR0IiLCJfZmFzdFNldEEiLCJnZXRBbHBoYSIsInJhbmRvbUNvbG9yIiwiYyIsIk1hdGgiLCJ0cnVuYyIsInJhbmRvbSIsInNldCIsImNvbG9yIiwiYWxwaGEiLCJpIiwicHJlVGltZSIsImN1clRpbWUiLCJtb2RlIiwiZmFjdG9yIiwibGVycCIsImxhc3RJbmRleCIsIkJMQUNLIiwiQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFFQSxJQUFNQSxJQUFJLEdBQUcsd0JBQUs7QUFDZEMsRUFBQUEsS0FBSyxFQUFFLENBRE87QUFFZEMsRUFBQUEsS0FBSyxFQUFFO0FBRk8sQ0FBTCxDQUFiO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFYUMsbUJBRFosK0JBQVEsYUFBUjs7OztpRkFPSUM7Ozs7O1dBQ09DLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTQyxLQUFULENBQWVDLEtBQWY7O3lFQU1QSjs7Ozs7V0FDTTs7O0FBR1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0lBRWFLLG9CQURaLCtCQUFRLGFBQVI7Ozs7bUZBT0lMOzs7OztXQUNPOzt5RUFNUEE7Ozs7O1dBQ007OztBQUdYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztJQUVhTSxvQkFEWiwrQkFBUSxhQUFSLFdBU0ksZ0NBQVM7QUFD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R0FBY0EsUUFBZDtBQUNBSixFQUFFLENBQUNLLFFBQUgsR0FBY0EsUUFBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XHJcbmltcG9ydCBFbnVtIGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDRW51bSc7XHJcbmltcG9ydCB7IGxlcnAsIHJlcGVhdCB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcclxuXHJcbmNvbnN0IE1vZGUgPSBFbnVtKHtcclxuICAgIEJsZW5kOiAwLFxyXG4gICAgRml4ZWQ6IDEsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGNvbG9yIGtleSBvZiBncmFkaWVudC5cclxuICogISN6aCBjb2xvciDlhbPplK7luKdcclxuICogQGNsYXNzIENvbG9yS2V5XHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuQ29sb3JLZXknKVxyXG5leHBvcnQgY2xhc3MgQ29sb3JLZXkge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENvbG9yIHZhbHVlLlxyXG4gICAgICogISN6aCDpopzoibLlgLzjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGNvbG9yXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgY29sb3IgPSBjYy5Db2xvci5XSElURS5jbG9uZSgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRpbWUgdmFsdWUuXHJcbiAgICAgKiAhI3poIOaXtumXtOWAvOOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHRpbWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICB0aW1lID0gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGFscGhhIGtleSBvZiBncmFkaWVudC5cclxuICogISN6aCBhbHBoYSDlhbPplK7luKdcclxuICogQGNsYXNzIEFscGhhS2V5XHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuQWxwaGFLZXknKVxyXG5leHBvcnQgY2xhc3MgQWxwaGFLZXkge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFscGhhIHZhbHVlLlxyXG4gICAgICogISN6aCDpgI/mmI7luqbjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbHBoYVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGFscGhhID0gMTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaW1lLlxyXG4gICAgICogISN6aCDml7bpl7TluKfjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgdGltZSA9IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBncmFkaWVudCBkYXRhIG9mIGNvbG9yLlxyXG4gKiAhI3poIOminOiJsua4kOWPmOaVsOaNrlxyXG4gKiBAY2xhc3MgR3JhZGllbnRcclxuICovXHJcbkBjY2NsYXNzKCdjYy5HcmFkaWVudCcpXHJcbmV4cG9ydCBjbGFzcyBHcmFkaWVudCB7XHJcblxyXG4gICAgc3RhdGljIE1vZGUgPSBNb2RlO1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFycmF5IG9mIGNvbG9yIGtleS5cclxuICAgICAqICEjemgg6aKc6Imy5YWz6ZSu5bin5YiX6KGo44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1tDb2xvcktleV19IGNvbG9yS2V5c1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IFtDb2xvcktleV0sXHJcbiAgICB9KVxyXG4gICAgY29sb3JLZXlzID0gbmV3IEFycmF5KCk7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQXJyYXkgb2YgYWxwaGEga2V5LlxyXG4gICAgICogISN6aCDpgI/mmI7luqblhbPplK7luKfliJfooajjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7W0FscGhhS2V5XX0gYWxwaGFLZXlzXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogW0FscGhhS2V5XSxcclxuICAgIH0pXHJcbiAgICBhbHBoYUtleXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBCbGVuZCBtb2RlLlxyXG4gICAgICogISN6aCDmt7flkIjmqKHlvI/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IE1vZGUsXHJcbiAgICB9KVxyXG4gICAgbW9kZSA9IE1vZGUuQmxlbmQ7XHJcblxyXG4gICAgX2NvbG9yID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjYy5Db2xvci5XSElURS5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEtleXMgKGNvbG9yS2V5cywgYWxwaGFLZXlzKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvcktleXMgPSBjb2xvcktleXM7XHJcbiAgICAgICAgdGhpcy5hbHBoYUtleXMgPSBhbHBoYUtleXM7XHJcbiAgICB9XHJcblxyXG4gICAgc29ydEtleXMgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbG9yS2V5cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sb3JLZXlzLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmFscGhhS2V5cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxwaGFLZXlzLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2YWx1YXRlICh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSR0IodGltZSk7XHJcbiAgICAgICAgdGhpcy5fY29sb3IuX2Zhc3RTZXRBKHRoaXMuZ2V0QWxwaGEodGltZSkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICByYW5kb21Db2xvciAoKSB7XHJcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY29sb3JLZXlzW01hdGgudHJ1bmMoTWF0aC5yYW5kb20oKSAqIHRoaXMuY29sb3JLZXlzLmxlbmd0aCldO1xyXG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFscGhhS2V5c1tNYXRoLnRydW5jKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFscGhhS2V5cy5sZW5ndGgpXTtcclxuICAgICAgICB0aGlzLl9jb2xvci5zZXQoYy5jb2xvcik7XHJcbiAgICAgICAgdGhpcy5fY29sb3IuX2Zhc3RTZXRBKGEuYWxwaGEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRSR0IgKHRpbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2xvcktleXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICB0aW1lID0gcmVwZWF0KHRpbWUsIDEpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuY29sb3JLZXlzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmVUaW1lID0gdGhpcy5jb2xvcktleXNbaSAtIDFdLnRpbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJUaW1lID0gdGhpcy5jb2xvcktleXNbaV0udGltZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lID49IHByZVRpbWUgJiYgdGltZSA8IGN1clRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSBNb2RlLkZpeGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yS2V5c1tpXS5jb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjdG9yID0gKHRpbWUgLSBwcmVUaW1lKSAvIChjdXJUaW1lIC0gcHJlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvcktleXNbaSAtIDFdLmNvbG9yLmxlcnAodGhpcy5jb2xvcktleXNbaV0uY29sb3IsIGZhY3RvciwgdGhpcy5fY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmNvbG9yS2V5cy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAodGltZSA8IHRoaXMuY29sb3JLZXlzWzBdLnRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNjLkNvbG9yLkJMQUNLLmxlcnAodGhpcy5jb2xvcktleXNbMF0uY29sb3IsIHRpbWUgLyB0aGlzLmNvbG9yS2V5c1swXS50aW1lLCB0aGlzLl9jb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZSA+IHRoaXMuY29sb3JLZXlzW2xhc3RJbmRleF0udGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvcktleXNbbGFzdEluZGV4XS5jb2xvci5sZXJwKGNjLkNvbG9yLkJMQUNLLCAodGltZSAtIHRoaXMuY29sb3JLZXlzW2xhc3RJbmRleF0udGltZSkgLyAoMSAtIHRoaXMuY29sb3JLZXlzW2xhc3RJbmRleF0udGltZSksIHRoaXMuX2NvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ3NvbWV0aGluZyB3ZW50IHdyb25nLiBjYW4gbm90IGdldCBncmFkaWVudCBjb2xvci4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29sb3JLZXlzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodGhpcy5jb2xvcktleXNbMF0uY29sb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fY29sb3Iuc2V0KGNjLkNvbG9yLldISVRFKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBbHBoYSAodGltZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFscGhhS2V5cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSByZXBlYXQodGltZSwgMSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5hbHBoYUtleXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZVRpbWUgPSB0aGlzLmFscGhhS2V5c1tpIC0gMV0udGltZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1clRpbWUgPSB0aGlzLmFscGhhS2V5c1tpXS50aW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRpbWUgPj0gcHJlVGltZSAmJiB0aW1lIDwgY3VyVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGUgPT09IE1vZGUuRml4ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGFLZXlzW2ldLmFscGhhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWN0b3IgPSAodGltZSAtIHByZVRpbWUpIC8gKGN1clRpbWUgLSBwcmVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGVycCh0aGlzLmFscGhhS2V5c1tpIC0gMV0uYWxwaGEgLCB0aGlzLmFscGhhS2V5c1tpXS5hbHBoYSAsIGZhY3Rvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5hbHBoYUtleXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgaWYgKHRpbWUgPCB0aGlzLmFscGhhS2V5c1swXS50aW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVycCgyNTUsIHRoaXMuYWxwaGFLZXlzWzBdLmFscGhhLCB0aW1lIC8gdGhpcy5hbHBoYUtleXNbMF0udGltZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZSA+IHRoaXMuYWxwaGFLZXlzW2xhc3RJbmRleF0udGltZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlcnAodGhpcy5hbHBoYUtleXNbbGFzdEluZGV4XS5hbHBoYSwgMjU1LCAodGltZSAtIHRoaXMuYWxwaGFLZXlzW2xhc3RJbmRleF0udGltZSkgLyAoMSAtIHRoaXMuYWxwaGFLZXlzW2xhc3RJbmRleF0udGltZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFscGhhS2V5cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGFLZXlzWzBdLmFscGhhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAyNTU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jYy5Db2xvcktleSA9IENvbG9yS2V5O1xyXG5jYy5BbHBoYUtleSA9IEFscGhhS2V5O1xyXG5jYy5HcmFkaWVudCA9IEdyYWRpZW50O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=