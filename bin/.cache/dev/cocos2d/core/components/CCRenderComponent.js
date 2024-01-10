
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCRenderComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../renderer/assembler"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

var _valueTypes = require("../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var Component = require('./CCComponent');

var RenderFlow = require('../renderer/render-flow');

var Material = require('../assets/material/CCMaterial');

var _temp_color = new _valueTypes.Color();
/**
 * !#en
 * Base class for components which supports rendering features.
 * !#zh
 * 所有支持渲染的组件的基类
 *
 * @class RenderComponent
 * @extends Component
 */


var RenderComponent = cc.Class({
  name: 'RenderComponent',
  "extends": Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    disallowMultiple: true
  },
  properties: {
    _materials: {
      "default": [],
      type: Material
    },

    /**
     * !#en The materials used by this render component.
     * !#zh 渲染组件使用的材质。
     * @property {[Material]} sharedMaterials
     */
    materials: {
      get: function get() {
        return this._materials;
      },
      set: function set(val) {
        this._materials = val;

        this._activateMaterial();

        this._executeOnChange();
      },
      type: [Material],
      displayName: 'Materials',
      animatable: false
    }
  },
  ctor: function ctor() {
    this._vertsDirty = true;
    this._assembler = null;
  },
  _resetAssembler: function _resetAssembler() {
    _assembler["default"].init(this);

    this._updateColor();

    this.setVertsDirty();
  },
  __preload: function __preload() {
    this._resetAssembler();

    this._activateMaterial();
  },
  onEnable: function onEnable() {
    if (this.node._renderComponent) {
      this.node._renderComponent.enabled = false;
    }

    this.node._renderComponent = this;
    this.node._renderFlag |= RenderFlow.FLAG_OPACITY_COLOR;
    this.setVertsDirty();
  },
  onDisable: function onDisable() {
    this.node._renderComponent = null;
    this.disableRender();
  },
  onDestroy: function onDestroy() {
    var materials = this._materials;

    for (var i = 0; i < materials.length; i++) {
      cc.pool.material.put(materials[i]);
    }

    materials.length = 0;
    cc.pool.assembler.put(this._assembler);
  },
  setVertsDirty: function setVertsDirty() {
    this._vertsDirty = true;
    this.markForRender(true);
  },
  _on3DNodeChanged: function _on3DNodeChanged() {
    this._resetAssembler();
  },
  _validateRender: function _validateRender() {},
  markForValidate: function markForValidate() {
    cc.RenderFlow.registerValidate(this);
  },
  markForRender: function markForRender(enable) {
    var flag = RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA;

    if (enable) {
      this.node._renderFlag |= flag;
      this.markForValidate();
    } else {
      this.node._renderFlag &= ~flag;
    }
  },
  disableRender: function disableRender() {
    this.node._renderFlag &= ~(RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA);
  },

  /**
   * !#en Get the material by index.
   * !#zh 根据指定索引获取材质
   * @method getMaterial
   * @param {Number} index
   * @return {MaterialVariant}
   */
  getMaterial: function getMaterial(index) {
    if (index < 0 || index >= this._materials.length) {
      return null;
    }

    var material = this._materials[index];
    if (!material) return null;

    var instantiated = _materialVariant["default"].create(material, this);

    if (instantiated !== material) {
      this.setMaterial(index, instantiated);
    }

    return instantiated;
  },

  /**
   * !#en Gets all the materials.
   * !#zh 获取所有材质。
   * @method getMaterials
   * @return {[MaterialVariant]}
   */
  getMaterials: function getMaterials() {
    var materials = this._materials;

    for (var i = 0; i < materials.length; i++) {
      materials[i] = _materialVariant["default"].create(materials[i], this);
    }

    return materials;
  },

  /**
   * !#en Set the material by index.
   * !#zh 根据指定索引设置材质
   * @method setMaterial
   * @param {Number} index
   * @param {Material} material
   * @return {Material}
   */
  setMaterial: function setMaterial(index, material) {
    if (material !== this._materials[index]) {
      material = _materialVariant["default"].create(material, this);
      this._materials[index] = material;
    }

    this._updateMaterial();

    this.markForRender(true);
    return material;
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('2d-sprite');
  },

  /**
   * Init material.
   */
  _activateMaterial: function _activateMaterial() {
    var materials = this._materials;

    if (!materials[0]) {
      var material = this._getDefaultMaterial();

      materials[0] = material;
    }

    for (var i = 0; i < materials.length; i++) {
      materials[i] = _materialVariant["default"].create(materials[i], this);
    }

    this._updateMaterial();
  },

  /**
   * Update material properties.
   */
  _updateMaterial: function _updateMaterial() {},
  _updateColor: function _updateColor() {
    if (this._assembler.updateColor) {
      var premultiply = this.srcBlendFactor === cc.macro.BlendFactor.ONE;
      premultiply && _valueTypes.Color.premultiplyAlpha(_temp_color, this.node._color);
      var color = premultiply ? _temp_color._val : null;

      this._assembler.updateColor(this, color);
    }
  },
  _checkBacth: function _checkBacth(renderer, cullingMask) {
    var material = this._materials[0];

    if (material && material.getHash() !== renderer.material.getHash() || renderer.cullingMask !== cullingMask) {
      renderer._flush();

      renderer.node = material.getDefine('CC_USE_MODEL') ? this.node : renderer._dummyNode;
      renderer.material = material;
      renderer.cullingMask = cullingMask;
    }
  }
});
cc.RenderComponent = module.exports = RenderComponent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDUmVuZGVyQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInJlcXVpcmUiLCJSZW5kZXJGbG93IiwiTWF0ZXJpYWwiLCJfdGVtcF9jb2xvciIsIkNvbG9yIiwiUmVuZGVyQ29tcG9uZW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJleGVjdXRlSW5FZGl0TW9kZSIsImRpc2FsbG93TXVsdGlwbGUiLCJwcm9wZXJ0aWVzIiwiX21hdGVyaWFscyIsInR5cGUiLCJtYXRlcmlhbHMiLCJnZXQiLCJzZXQiLCJ2YWwiLCJfYWN0aXZhdGVNYXRlcmlhbCIsIl9leGVjdXRlT25DaGFuZ2UiLCJkaXNwbGF5TmFtZSIsImFuaW1hdGFibGUiLCJjdG9yIiwiX3ZlcnRzRGlydHkiLCJfYXNzZW1ibGVyIiwiX3Jlc2V0QXNzZW1ibGVyIiwiQXNzZW1ibGVyIiwiaW5pdCIsIl91cGRhdGVDb2xvciIsInNldFZlcnRzRGlydHkiLCJfX3ByZWxvYWQiLCJvbkVuYWJsZSIsIm5vZGUiLCJfcmVuZGVyQ29tcG9uZW50IiwiZW5hYmxlZCIsIl9yZW5kZXJGbGFnIiwiRkxBR19PUEFDSVRZX0NPTE9SIiwib25EaXNhYmxlIiwiZGlzYWJsZVJlbmRlciIsIm9uRGVzdHJveSIsImkiLCJsZW5ndGgiLCJwb29sIiwibWF0ZXJpYWwiLCJwdXQiLCJhc3NlbWJsZXIiLCJtYXJrRm9yUmVuZGVyIiwiX29uM0ROb2RlQ2hhbmdlZCIsIl92YWxpZGF0ZVJlbmRlciIsIm1hcmtGb3JWYWxpZGF0ZSIsInJlZ2lzdGVyVmFsaWRhdGUiLCJlbmFibGUiLCJmbGFnIiwiRkxBR19SRU5ERVIiLCJGTEFHX1VQREFURV9SRU5ERVJfREFUQSIsImdldE1hdGVyaWFsIiwiaW5kZXgiLCJpbnN0YW50aWF0ZWQiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGUiLCJzZXRNYXRlcmlhbCIsImdldE1hdGVyaWFscyIsIl91cGRhdGVNYXRlcmlhbCIsIl9nZXREZWZhdWx0TWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJ1cGRhdGVDb2xvciIsInByZW11bHRpcGx5Iiwic3JjQmxlbmRGYWN0b3IiLCJtYWNybyIsIkJsZW5kRmFjdG9yIiwiT05FIiwicHJlbXVsdGlwbHlBbHBoYSIsIl9jb2xvciIsImNvbG9yIiwiX3ZhbCIsIl9jaGVja0JhY3RoIiwicmVuZGVyZXIiLCJjdWxsaW5nTWFzayIsImdldEhhc2giLCJfZmx1c2giLCJnZXREZWZpbmUiLCJfZHVtbXlOb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7OztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxJQUFNQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxlQUFELENBQXpCOztBQUNBLElBQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLCtCQUFELENBQXhCOztBQUVBLElBQUlHLFdBQVcsR0FBRyxJQUFJQyxpQkFBSixFQUFsQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsZUFBZSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsSUFBSSxFQUFFLGlCQURxQjtBQUUzQixhQUFTVCxTQUZrQjtBQUkzQlUsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLGlCQUFpQixFQUFFLElBREY7QUFFakJDLElBQUFBLGdCQUFnQixFQUFFO0FBRkQsR0FKTTtBQVMzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JD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R0FBaUQ0QyxRQUFRLENBQUNLLFVBQTFFO0FBQ0FMLE1BQUFBLFFBQVEsQ0FBQ2pDLFFBQVQsR0FBb0JBLFFBQXBCO0FBQ0FpQyxNQUFBQSxRQUFRLENBQUNDLFdBQVQsR0FBdUJBLFdBQXZCO0FBQ0g7QUFDSjtBQWpOMEIsQ0FBVCxDQUF0QjtBQW9OQXpFLEVBQUUsQ0FBQ0QsZUFBSCxHQUFxQitFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhGLGVBQXRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi9yZW5kZXJlci9hc3NlbWJsZXInO1xuaW1wb3J0IE1hdGVyaWFsVmFyaWFudCBmcm9tICcuLi9hc3NldHMvbWF0ZXJpYWwvbWF0ZXJpYWwtdmFyaWFudCc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcblxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5jb25zdCBNYXRlcmlhbCA9IHJlcXVpcmUoJy4uL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XG5cbmxldCBfdGVtcF9jb2xvciA9IG5ldyBDb2xvcigpO1xuXG4vKipcbiAqICEjZW5cbiAqIEJhc2UgY2xhc3MgZm9yIGNvbXBvbmVudHMgd2hpY2ggc3VwcG9ydHMgcmVuZGVyaW5nIGZlYXR1cmVzLlxuICogISN6aFxuICog5omA5pyJ5pSv5oyB5riy5p+T55qE57uE5Lu255qE5Z+657G7XG4gKlxuICogQGNsYXNzIFJlbmRlckNvbXBvbmVudFxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbmxldCBSZW5kZXJDb21wb25lbnQgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ1JlbmRlckNvbXBvbmVudCcsXG4gICAgZXh0ZW5kczogQ29tcG9uZW50LFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcbiAgICAgICAgZGlzYWxsb3dNdWx0aXBsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9tYXRlcmlhbHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogTWF0ZXJpYWwsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG1hdGVyaWFscyB1c2VkIGJ5IHRoaXMgcmVuZGVyIGNvbXBvbmVudC5cbiAgICAgICAgICogISN6aCDmuLLmn5Pnu4Tku7bkvb/nlKjnmoTmnZDotKjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtbTWF0ZXJpYWxdfSBzaGFyZWRNYXRlcmlhbHNcbiAgICAgICAgICovXG4gICAgICAgIG1hdGVyaWFsczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxzID0gdmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjdXRlT25DaGFuZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBbTWF0ZXJpYWxdLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdNYXRlcmlhbHMnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fdmVydHNEaXJ0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlciA9IG51bGw7XG4gICAgfSxcblxuICAgIF9yZXNldEFzc2VtYmxlciAoKSB7XG4gICAgICAgIEFzc2VtYmxlci5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLl91cGRhdGVDb2xvcigpO1xuICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICB9LFxuXG4gICAgX19wcmVsb2FkICgpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUuX3JlbmRlckNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJDb21wb25lbnQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyQ29tcG9uZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19PUEFDSVRZX0NPTE9SO1xuXG4gICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckNvbXBvbmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5fbWF0ZXJpYWxzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2MucG9vbC5tYXRlcmlhbC5wdXQobWF0ZXJpYWxzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBtYXRlcmlhbHMubGVuZ3RoID0gMDtcblxuICAgICAgICBjYy5wb29sLmFzc2VtYmxlci5wdXQodGhpcy5fYXNzZW1ibGVyKTtcbiAgICB9LFxuXG4gICAgc2V0VmVydHNEaXJ0eSAoKSB7XG4gICAgICAgIHRoaXMuX3ZlcnRzRGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XG4gICAgfSxcblxuICAgIF9vbjNETm9kZUNoYW5nZWQgKCkge1xuICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgIH0sXG5cbiAgICBfdmFsaWRhdGVSZW5kZXIgKCkge1xuICAgIH0sXG5cbiAgICBtYXJrRm9yVmFsaWRhdGUgKCkge1xuICAgICAgICBjYy5SZW5kZXJGbG93LnJlZ2lzdGVyVmFsaWRhdGUodGhpcyk7XG4gICAgfSxcblxuICAgIG1hcmtGb3JSZW5kZXIgKGVuYWJsZSkge1xuICAgICAgICBsZXQgZmxhZyA9IFJlbmRlckZsb3cuRkxBR19SRU5ERVIgfCBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBO1xuICAgICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgfD0gZmxhZztcbiAgICAgICAgICAgIHRoaXMubWFya0ZvclZhbGlkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfmZsYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzYWJsZVJlbmRlciAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+KFJlbmRlckZsb3cuRkxBR19SRU5ERVIgfCBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIG1hdGVyaWFsIGJ5IGluZGV4LlxuICAgICAqICEjemgg5qC55o2u5oyH5a6a57Si5byV6I635Y+W5p2Q6LSoXG4gICAgICogQG1ldGhvZCBnZXRNYXRlcmlhbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm4ge01hdGVyaWFsVmFyaWFudH1cbiAgICAgKi9cbiAgICBnZXRNYXRlcmlhbCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLl9tYXRlcmlhbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1tpbmRleF07XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGxldCBpbnN0YW50aWF0ZWQgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcbiAgICAgICAgaWYgKGluc3RhbnRpYXRlZCAhPT0gbWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF0ZXJpYWwoaW5kZXgsIGluc3RhbnRpYXRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFudGlhdGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYWxsIHRoZSBtYXRlcmlhbHMuXG4gICAgICogISN6aCDojrflj5bmiYDmnInmnZDotKjjgIJcbiAgICAgKiBAbWV0aG9kIGdldE1hdGVyaWFsc1xuICAgICAqIEByZXR1cm4ge1tNYXRlcmlhbFZhcmlhbnRdfVxuICAgICAqL1xuICAgIGdldE1hdGVyaWFscyAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLl9tYXRlcmlhbHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0ZXJpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXRlcmlhbHNbaV0gPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsc1tpXSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIG1hdGVyaWFsIGJ5IGluZGV4LlxuICAgICAqICEjemgg5qC55o2u5oyH5a6a57Si5byV6K6+572u5p2Q6LSoXG4gICAgICogQG1ldGhvZCBzZXRNYXRlcmlhbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7TWF0ZXJpYWx9IG1hdGVyaWFsXG4gICAgICogQHJldHVybiB7TWF0ZXJpYWx9XG4gICAgICovXG4gICAgc2V0TWF0ZXJpYWwgKGluZGV4LCBtYXRlcmlhbCkge1xuICAgICAgICBpZiAobWF0ZXJpYWwgIT09IHRoaXMuX21hdGVyaWFsc1tpbmRleF0pIHtcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXRlcmlhbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbHNbaW5kZXhdID0gbWF0ZXJpYWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XG4gICAgfSxcblxuICAgIF9nZXREZWZhdWx0TWF0ZXJpYWwgKCkge1xuICAgICAgICByZXR1cm4gTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSW5pdCBtYXRlcmlhbC5cbiAgICAgKi9cbiAgICBfYWN0aXZhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbHMgPSB0aGlzLl9tYXRlcmlhbHM7XG4gICAgICAgIGlmICghbWF0ZXJpYWxzWzBdKSB7XG4gICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9nZXREZWZhdWx0TWF0ZXJpYWwoKTtcbiAgICAgICAgICAgIG1hdGVyaWFsc1swXSA9IG1hdGVyaWFsO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1hdGVyaWFsc1tpXSA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGUobWF0ZXJpYWxzW2ldLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBtYXRlcmlhbCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG5cbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNvbG9yICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VtYmxlci51cGRhdGVDb2xvcikge1xuICAgICAgICAgICAgbGV0IHByZW11bHRpcGx5ID0gdGhpcy5zcmNCbGVuZEZhY3RvciA9PT0gY2MubWFjcm8uQmxlbmRGYWN0b3IuT05FO1xuICAgICAgICAgICAgcHJlbXVsdGlwbHkgJiYgQ29sb3IucHJlbXVsdGlwbHlBbHBoYShfdGVtcF9jb2xvciwgdGhpcy5ub2RlLl9jb2xvcik7XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBwcmVtdWx0aXBseSA/IF90ZW1wX2NvbG9yLl92YWwgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZUNvbG9yKHRoaXMsIGNvbG9yKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tCYWN0aCAocmVuZGVyZXIsIGN1bGxpbmdNYXNrKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKChtYXRlcmlhbCAmJiBtYXRlcmlhbC5nZXRIYXNoKCkgIT09IHJlbmRlcmVyLm1hdGVyaWFsLmdldEhhc2goKSkgfHxcbiAgICAgICAgICAgIHJlbmRlcmVyLmN1bGxpbmdNYXNrICE9PSBjdWxsaW5nTWFzaykge1xuICAgICAgICAgICAgcmVuZGVyZXIuX2ZsdXNoKCk7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLm5vZGUgPSBtYXRlcmlhbC5nZXREZWZpbmUoJ0NDX1VTRV9NT0RFTCcpID8gdGhpcy5ub2RlIDogcmVuZGVyZXIuX2R1bW15Tm9kZTtcbiAgICAgICAgICAgIHJlbmRlcmVyLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG4gICAgICAgICAgICByZW5kZXJlci5jdWxsaW5nTWFzayA9IGN1bGxpbmdNYXNrO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLlJlbmRlckNvbXBvbmVudCA9IG1vZHVsZS5leHBvcnRzID0gUmVuZGVyQ29tcG9uZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=