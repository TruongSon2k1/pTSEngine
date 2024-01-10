
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/blend-func.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var RenderComponent = require('../components/CCRenderComponent');

var BlendFactor = require('../platform/CCMacro').BlendFactor;

var gfx = require('../../renderer/gfx');
/**
 * !#en
 * Helper class for setting material blend function.
 * !#zh
 * 设置材质混合模式的辅助类。
 * @class BlendFunc
 */


var BlendFunc = cc.Class({
  properties: {
    _srcBlendFactor: BlendFactor.SRC_ALPHA,
    _dstBlendFactor: BlendFactor.ONE_MINUS_SRC_ALPHA,

    /**
     * !#en specify the source Blend Factor, this will generate a custom material object, please pay attention to the memory cost.
     * !#zh 指定原图的混合模式，这会克隆一个新的材质对象，注意这带来的开销
     * @property srcBlendFactor
     * @type {macro.BlendFactor}
     * @example
     * sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
     */
    srcBlendFactor: {
      get: function get() {
        return this._srcBlendFactor;
      },
      set: function set(value) {
        if (this._srcBlendFactor === value) return;
        this._srcBlendFactor = value;

        this._updateBlendFunc(true);

        this._onBlendChanged && this._onBlendChanged();
      },
      animatable: false,
      type: BlendFactor,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.src_blend_factor',
      visible: true
    },

    /**
     * !#en specify the destination Blend Factor.
     * !#zh 指定目标的混合模式
     * @property dstBlendFactor
     * @type {macro.BlendFactor}
     * @example
     * sprite.dstBlendFactor = cc.macro.BlendFactor.ONE;
     */
    dstBlendFactor: {
      get: function get() {
        return this._dstBlendFactor;
      },
      set: function set(value) {
        if (this._dstBlendFactor === value) return;
        this._dstBlendFactor = value;

        this._updateBlendFunc(true);
      },
      animatable: false,
      type: BlendFactor,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.dst_blend_factor',
      visible: true
    }
  },
  setMaterial: function setMaterial(index, material) {
    var materialVar = RenderComponent.prototype.setMaterial.call(this, index, material);

    if (this._srcBlendFactor !== BlendFactor.SRC_ALPHA || this._dstBlendFactor !== BlendFactor.ONE_MINUS_SRC_ALPHA) {
      this._updateMaterialBlendFunc(materialVar);
    }

    return materialVar;
  },
  _updateMaterial: function _updateMaterial() {
    this._updateBlendFunc();
  },
  _updateBlendFunc: function _updateBlendFunc(force) {
    if (!force) {
      if (this._srcBlendFactor === BlendFactor.SRC_ALPHA && this._dstBlendFactor === BlendFactor.ONE_MINUS_SRC_ALPHA) {
        return;
      }
    }

    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      var material = materials[i];

      this._updateMaterialBlendFunc(material);
    }
  },
  _updateMaterialBlendFunc: function _updateMaterialBlendFunc(material) {
    material.setBlend(true, gfx.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor, gfx.BLEND_FUNC_ADD, this._srcBlendFactor, this._dstBlendFactor);

    if (CC_JSB) {
      RenderComponent.prototype.markForRender.call(this, true);
    }
  }
});
module.exports = cc.BlendFunc = BlendFunc;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxibGVuZC1mdW5jLmpzIl0sIm5hbWVzIjpbIlJlbmRlckNvbXBvbmVudCIsInJlcXVpcmUiLCJCbGVuZEZhY3RvciIsImdmeCIsIkJsZW5kRnVuYyIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiX3NyY0JsZW5kRmFjdG9yIiwiU1JDX0FMUEhBIiwiX2RzdEJsZW5kRmFjdG9yIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsInNyY0JsZW5kRmFjdG9yIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfdXBkYXRlQmxlbmRGdW5jIiwiX29uQmxlbmRDaGFuZ2VkIiwiYW5pbWF0YWJsZSIsInR5cGUiLCJ0b29sdGlwIiwiQ0NfREVWIiwidmlzaWJsZSIsImRzdEJsZW5kRmFjdG9yIiwic2V0TWF0ZXJpYWwiLCJpbmRleCIsIm1hdGVyaWFsIiwibWF0ZXJpYWxWYXIiLCJwcm90b3R5cGUiLCJjYWxsIiwiX3VwZGF0ZU1hdGVyaWFsQmxlbmRGdW5jIiwiX3VwZGF0ZU1hdGVyaWFsIiwiZm9yY2UiLCJtYXRlcmlhbHMiLCJnZXRNYXRlcmlhbHMiLCJpIiwibGVuZ3RoIiwic2V0QmxlbmQiLCJCTEVORF9GVU5DX0FERCIsIkNDX0pTQiIsIm1hcmtGb3JSZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsaUNBQUQsQ0FBL0I7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHRCxPQUFPLENBQUMscUJBQUQsQ0FBUCxDQUErQkMsV0FBbkQ7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRixPQUFPLENBQUMsb0JBQUQsQ0FBbkI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUcsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGVB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RUFHMEIsS0FBS0UsZUFIL0IsRUFJSVAsR0FBRyxDQUFDbUMsY0FKUixFQUtJLEtBQUs5QixlQUxULEVBSzBCLEtBQUtFLGVBTC9COztBQVFBLFFBQUk2QixNQUFKLEVBQVk7QUFDUnZDLE1BQUFBLGVBQWUsQ0FBQzRCLFNBQWhCLENBQTBCWSxhQUExQixDQUF3Q1gsSUFBeEMsQ0FBNkMsSUFBN0MsRUFBbUQsSUFBbkQ7QUFDSDtBQUNKO0FBN0ZvQixDQUFULENBQWhCO0FBZ0dBWSxNQUFNLENBQUNDLE9BQVAsR0FBaUJyQyxFQUFFLENBQUNELFNBQUgsR0FBZUEsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xyXG5jb25zdCBCbGVuZEZhY3RvciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDTWFjcm8nKS5CbGVuZEZhY3RvcjtcclxuY29uc3QgZ2Z4ID0gcmVxdWlyZSgnLi4vLi4vcmVuZGVyZXIvZ2Z4Jyk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBIZWxwZXIgY2xhc3MgZm9yIHNldHRpbmcgbWF0ZXJpYWwgYmxlbmQgZnVuY3Rpb24uXHJcbiAqICEjemhcclxuICog6K6+572u5p2Q6LSo5re35ZCI5qih5byP55qE6L6F5Yqp57G744CCXHJcbiAqIEBjbGFzcyBCbGVuZEZ1bmNcclxuICovXHJcbmxldCBCbGVuZEZ1bmMgPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3NyY0JsZW5kRmFjdG9yOiBCbGVuZEZhY3Rvci5TUkNfQUxQSEEsXHJcbiAgICAgICAgX2RzdEJsZW5kRmFjdG9yOiBCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0FMUEhBLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIHNwZWNpZnkgdGhlIHNvdXJjZSBCbGVuZCBGYWN0b3IsIHRoaXMgd2lsbCBnZW5lcmF0ZSBhIGN1c3RvbSBtYXRlcmlhbCBvYmplY3QsIHBsZWFzZSBwYXkgYXR0ZW50aW9uIHRvIHRoZSBtZW1vcnkgY29zdC5cclxuICAgICAgICAgKiAhI3poIOaMh+WumuWOn+WbvueahOa3t+WQiOaooeW8j++8jOi/meS8muWFi+mahuS4gOS4quaWsOeahOadkOi0qOWvueixoe+8jOazqOaEj+i/meW4puadpeeahOW8gOmUgFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzcmNCbGVuZEZhY3RvclxyXG4gICAgICAgICAqIEB0eXBlIHttYWNyby5CbGVuZEZhY3Rvcn1cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHNwcml0ZS5zcmNCbGVuZEZhY3RvciA9IGNjLm1hY3JvLkJsZW5kRmFjdG9yLk9ORTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBzcmNCbGVuZEZhY3Rvcjoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyY0JsZW5kRmFjdG9yO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3JjQmxlbmRGYWN0b3IgPT09IHZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmNCbGVuZEZhY3RvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQmxlbmRGdW5jKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25CbGVuZENoYW5nZWQgJiYgdGhpcy5fb25CbGVuZENoYW5nZWQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IEJsZW5kRmFjdG9yLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5zcmNfYmxlbmRfZmFjdG9yJyxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gc3BlY2lmeSB0aGUgZGVzdGluYXRpb24gQmxlbmQgRmFjdG9yLlxyXG4gICAgICAgICAqICEjemgg5oyH5a6a55uu5qCH55qE5re35ZCI5qih5byPXHJcbiAgICAgICAgICogQHByb3BlcnR5IGRzdEJsZW5kRmFjdG9yXHJcbiAgICAgICAgICogQHR5cGUge21hY3JvLkJsZW5kRmFjdG9yfVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogc3ByaXRlLmRzdEJsZW5kRmFjdG9yID0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRzdEJsZW5kRmFjdG9yOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHN0QmxlbmRGYWN0b3I7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kc3RCbGVuZEZhY3RvciA9PT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RzdEJsZW5kRmFjdG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVCbGVuZEZ1bmModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0eXBlOiBCbGVuZEZhY3RvcixcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zcHJpdGUuZHN0X2JsZW5kX2ZhY3RvcicsXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRNYXRlcmlhbCAoaW5kZXgsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsVmFyID0gUmVuZGVyQ29tcG9uZW50LnByb3RvdHlwZS5zZXRNYXRlcmlhbC5jYWxsKHRoaXMsIGluZGV4LCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zcmNCbGVuZEZhY3RvciAhPT0gQmxlbmRGYWN0b3IuU1JDX0FMUEhBIHx8IHRoaXMuX2RzdEJsZW5kRmFjdG9yICE9PSBCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0FMUEhBKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsQmxlbmRGdW5jKG1hdGVyaWFsVmFyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtYXRlcmlhbFZhcjtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVCbGVuZEZ1bmMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUJsZW5kRnVuYyAoZm9yY2UpIHtcclxuICAgICAgICBpZiAoIWZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zcmNCbGVuZEZhY3RvciA9PT0gQmxlbmRGYWN0b3IuU1JDX0FMUEhBICYmIHRoaXMuX2RzdEJsZW5kRmFjdG9yID09PSBCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0FMUEhBKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IHRoaXMuZ2V0TWF0ZXJpYWxzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbWF0ZXJpYWxzW2ldO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbEJsZW5kRnVuYyhtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlTWF0ZXJpYWxCbGVuZEZ1bmMgKG1hdGVyaWFsKSB7XHJcbiAgICAgICAgbWF0ZXJpYWwuc2V0QmxlbmQoXHJcbiAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgIGdmeC5CTEVORF9GVU5DX0FERCxcclxuICAgICAgICAgICAgdGhpcy5fc3JjQmxlbmRGYWN0b3IsIHRoaXMuX2RzdEJsZW5kRmFjdG9yLFxyXG4gICAgICAgICAgICBnZnguQkxFTkRfRlVOQ19BREQsXHJcbiAgICAgICAgICAgIHRoaXMuX3NyY0JsZW5kRmFjdG9yLCB0aGlzLl9kc3RCbGVuZEZhY3RvclxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICBSZW5kZXJDb21wb25lbnQucHJvdG90eXBlLm1hcmtGb3JSZW5kZXIuY2FsbCh0aGlzLCB0cnVlKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5CbGVuZEZ1bmMgPSBCbGVuZEZ1bmM7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9