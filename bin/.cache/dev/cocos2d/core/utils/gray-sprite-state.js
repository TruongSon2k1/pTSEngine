
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/gray-sprite-state.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Material = require('../assets/material/CCMaterial');
/**
 * An internal helper class for switching render component's material between normal sprite material and gray sprite material.
 * @class GraySpriteState
 */


var GraySpriteState = cc.Class({
  properties: {
    _normalMaterial: null,

    /**
     * !#en The normal material.
     * !#zh 正常状态的材质。
     * @property normalMaterial
     * @type {Material}
     * @default null
     */
    normalMaterial: {
      get: function get() {
        return this._normalMaterial;
      },
      set: function set(val) {
        this._normalMaterial = val;
        this._updateDisabledState && this._updateDisabledState();
      },
      type: Material,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_material',
      animatable: false
    },
    _grayMaterial: null,

    /**
     * !#en The gray material.
     * !#zh 置灰状态的材质。
     * @property grayMaterial
     * @type {Material}
     * @default null
     */
    grayMaterial: {
      get: function get() {
        return this._grayMaterial;
      },
      set: function set(val) {
        this._grayMaterial = val;
        this._updateDisabledState && this._updateDisabledState();
      },
      type: Material,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.gray_material',
      animatable: false
    }
  },
  _switchGrayMaterial: function _switchGrayMaterial(useGrayMaterial, renderComp) {
    var material;

    if (useGrayMaterial) {
      material = this._grayMaterial;

      if (!material) {
        material = Material.getBuiltinMaterial('2d-gray-sprite');
      }

      material = this._grayMaterial = _materialVariant["default"].create(material, renderComp);
    } else {
      material = this._normalMaterial;

      if (!material) {
        material = Material.getBuiltinMaterial('2d-sprite', renderComp);
      }

      material = this._normalMaterial = _materialVariant["default"].create(material, renderComp);
    }

    renderComp.setMaterial(0, material);
  }
});
module.exports = GraySpriteState;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxncmF5LXNwcml0ZS1zdGF0ZS5qcyJdLCJuYW1lcyI6WyJNYXRlcmlhbCIsInJlcXVpcmUiLCJHcmF5U3ByaXRlU3RhdGUiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsIl9ub3JtYWxNYXRlcmlhbCIsIm5vcm1hbE1hdGVyaWFsIiwiZ2V0Iiwic2V0IiwidmFsIiwiX3VwZGF0ZURpc2FibGVkU3RhdGUiLCJ0eXBlIiwidG9vbHRpcCIsIkNDX0RFViIsImFuaW1hdGFibGUiLCJfZ3JheU1hdGVyaWFsIiwiZ3JheU1hdGVyaWFsIiwiX3N3aXRjaEdyYXlNYXRlcmlhbCIsInVzZUdyYXlNYXRlcmlhbCIsInJlbmRlckNvbXAiLCJtYXRlcmlhbCIsImdldEJ1aWx0aW5NYXRlcmlhbCIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZSIsInNldE1hdGVyaWFsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsK0JBQUQsQ0FBeEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsZUFBZSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMzQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLGVBQWUsRUFBRSxJQURUOztBQUdSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLGNBQWMsRUFBRTtBQUNaQyxNQUFBQSxHQURZLGlCQUNMO0FBQ0gsZUFBTyxLQUFLRixlQUFaO0FBQ0gsT0FIVztBQUlaRyxNQUFBQSxHQUpZLGVBSVBDLEdBSk8sRUFJRjtBQUNOLGFBQUtKLGVBQUwsR0FBdUJJLEdBQXZCO0FBQ0EsYUFBS0Msb0JBQUwsSUFBNkIsS0FBS0Esb0JBQUwsRUFBN0I7QUFDSCxPQVBXO0FBUVpDLE1BQUFBLElBQUksRUFBRVosUUFSTTtBQVNaYSxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSx1Q0FUUDtBQVVaQyxNQUFBQSxVQUFVLEVBQUU7QUFWQSxLQVZSO0FBdUJSQyxJQUFBQSxhQUFhLEVBQUUsSUF2QlA7O0FBeUJSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLFlBQVksRUFBRTtBQUNWVCxNQUFBQSxHQURVLGlCQUNIO0FBQ0gsZUFBTyxLQUFLUSxhQUFaO0FBQ0gsT0FIUztBQUlWUCxNQUFBQSxHQUpVLGVBSUxDLEdBSkssRUFJQTtBQUNOLGFBQUtNLGFBQUwsR0FBcUJOLEdBQXJCO0FBQ0EsYUFBS0Msb0JBQUwsSUFBNkIsS0FBS0Esb0JBQUwsRUFBN0I7QUFDSCxPQVBTO0FBUVZDLE1BQUFBLElBQUksRUFBRVosUUFSSTtBQVNWYSxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxxQ0FUVDtBQVVWQyxNQUFBQSxVQUFVLEVBQUU7QUFWRjtBQWhDTixHQURlO0FBK0MzQkcsRUFBQUEsbUJBL0MyQiwrQkErQ05DLGVBL0NNLEVBK0NXQyxVQS9DWCxFQStDdUI7QUFDOUMsUUFBSUMsUUFBSjs7QUFDQSxRQUFJRixlQUFKLEVBQXFCO0FBQ2pCRSxNQUFBQSxRQUFRLEdBQUcsS0FBS0wsYUFBaEI7O0FBQ0EsVUFBSSxDQUFDSyxRQUFMLEVBQWU7QUFDWEEsUUFBQUEsUUFBUSxHQUFHckIsUUFBUSxDQUFDc0Isa0JBQVQsQ0FBNEIsZ0JBQTVCLENBQVg7QUFDSDs7QUFDREQsTUFBQUEsUUFBUSxHQUFHLEtBQUtMLGFBQUwsR0FBcUJPLDRCQUFnQkMsTUFBaEIsQ0FBdUJILFFBQXZCLEVBQWlDRCxVQUFqQyxDQUFoQztBQUNILEtBTkQsTUFPSztBQUNEQyxNQUFBQSxRQUFRLEdBQUcsS0FBS2YsZUFBaEI7O0FBQ0EsVUFBSSxDQUFDZSxRQUFMLEVBQWU7QUFDWEEsUUFBQUEsUUFBUSxHQUFHckIsUUFBUSxDQUFDc0Isa0JBQVQsQ0FBNEIsV0FBNUIsRUFBeUNGLFVBQXpDLENBQVg7QUFDSDs7QUFDREMsTUFBQUEsUUFBUSxHQUFHLEtBQUtmLGVBQUwsR0FBdUJpQiw0QkFBZ0JDLE1BQWhCLENBQXVCSCxRQUF2QixFQUFpQ0QsVUFBakMsQ0FBbEM7QUFDSDs7QUFFREEsSUFBQUEsVUFBVSxDQUFDSyxXQUFYLENBQXVCLENBQXZCLEVBQTBCSixRQUExQjtBQUNIO0FBakUwQixDQUFULENBQXRCO0FBb0VBSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QixlQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcclxuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xyXG5cclxuLyoqXHJcbiAqIEFuIGludGVybmFsIGhlbHBlciBjbGFzcyBmb3Igc3dpdGNoaW5nIHJlbmRlciBjb21wb25lbnQncyBtYXRlcmlhbCBiZXR3ZWVuIG5vcm1hbCBzcHJpdGUgbWF0ZXJpYWwgYW5kIGdyYXkgc3ByaXRlIG1hdGVyaWFsLlxyXG4gKiBAY2xhc3MgR3JheVNwcml0ZVN0YXRlXHJcbiAqL1xyXG5sZXQgR3JheVNwcml0ZVN0YXRlID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9ub3JtYWxNYXRlcmlhbDogbnVsbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgbm9ybWFsIG1hdGVyaWFsLlxyXG4gICAgICAgICAqICEjemgg5q2j5bi454q25oCB55qE5p2Q6LSo44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IG5vcm1hbE1hdGVyaWFsXHJcbiAgICAgICAgICogQHR5cGUge01hdGVyaWFsfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcclxuICAgICAgICAgKi9cclxuICAgICAgICBub3JtYWxNYXRlcmlhbDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vcm1hbE1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsTWF0ZXJpYWwgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEaXNhYmxlZFN0YXRlICYmIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogTWF0ZXJpYWwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLm5vcm1hbF9tYXRlcmlhbCcsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2dyYXlNYXRlcmlhbDogbnVsbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgZ3JheSBtYXRlcmlhbC5cclxuICAgICAgICAgKiAhI3poIOe9rueBsOeKtuaAgeeahOadkOi0qOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBncmF5TWF0ZXJpYWxcclxuICAgICAgICAgKiBAdHlwZSB7TWF0ZXJpYWx9XHJcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdyYXlNYXRlcmlhbDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyYXlNYXRlcmlhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dyYXlNYXRlcmlhbCA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUgJiYgdGhpcy5fdXBkYXRlRGlzYWJsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBNYXRlcmlhbCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uZ3JheV9tYXRlcmlhbCcsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICBcclxuICAgIF9zd2l0Y2hHcmF5TWF0ZXJpYWwgKHVzZUdyYXlNYXRlcmlhbCwgcmVuZGVyQ29tcCkge1xyXG4gICAgICAgIGxldCBtYXRlcmlhbDtcclxuICAgICAgICBpZiAodXNlR3JheU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gdGhpcy5fZ3JheU1hdGVyaWFsO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCA9IE1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbCgnMmQtZ3JheS1zcHJpdGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXRlcmlhbCA9IHRoaXMuX2dyYXlNYXRlcmlhbCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGUobWF0ZXJpYWwsIHJlbmRlckNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwgPSB0aGlzLl9ub3JtYWxNYXRlcmlhbDtcclxuICAgICAgICAgICAgaWYgKCFtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScsIHJlbmRlckNvbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gdGhpcy5fbm9ybWFsTWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCByZW5kZXJDb21wKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICByZW5kZXJDb21wLnNldE1hdGVyaWFsKDAsIG1hdGVyaWFsKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyYXlTcHJpdGVTdGF0ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=