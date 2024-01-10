
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/material-variant.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCMaterial = _interopRequireDefault(require("./CCMaterial"));

var _effectVariant = _interopRequireDefault(require("./effect-variant"));

var _materialPool = _interopRequireDefault(require("./material-pool"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ccclass = cc._decorator.ccclass;
/**
 * !#en
 * Material Variant is an extension of the Material Asset.
 * Changes to Material Variant do not affect other Material Variant or Material Asset,
 * and changes to Material Asset are synchronized to the Material Variant.
 * However, when a Material Variant had already modifies a state, the Material Asset state is not synchronized to the Material Variant.
 * !#zh
 * 材质变体是材质资源的一个延伸。
 * 材质变体的修改不会影响到其他的材质变体或者材质资源，而材质资源的修改会同步体现到材质变体上，
 * 但是当材质变体对一个状态修改后，材质资源再对这个状态修改是不会同步到材质变体上的。
 * @class MaterialVariant
 * @extends Material
 */

var MaterialVariant = (_dec = ccclass('cc.MaterialVariant'), _dec(_class = (_temp = /*#__PURE__*/function (_Material) {
  _inheritsLoose(MaterialVariant, _Material);

  /**
   * @method createWithBuiltin
   * @param {Material.BUILTIN_NAME} materialName
   * @param {RenderComponent} [owner]
   * @typescript
   * static createWithBuiltin (materialName: string, owner: cc.RenderComponent): MaterialVariant | null
   */
  MaterialVariant.createWithBuiltin = function createWithBuiltin(materialName, owner) {
    return MaterialVariant.create(_CCMaterial["default"].getBuiltinMaterial(materialName), owner);
  }
  /**
   * @method create
   * @param {Material} material
   * @param {RenderComponent} [owner]
   * @typescript
   * static create (material: Material, owner: cc.RenderComponent): MaterialVariant | null
   */
  ;

  MaterialVariant.create = function create(material, owner) {
    if (!material) return null;
    return _materialPool["default"].get(material, owner);
  };

  function MaterialVariant(material) {
    var _this;

    _this = _Material.call(this) || this;
    _this._owner = null;
    _this._material = null;

    _this.init(material);

    return _this;
  }

  var _proto = MaterialVariant.prototype;

  _proto.init = function init(material) {
    this._effect = new _effectVariant["default"](material.effect);
    this._effectAsset = material._effectAsset;
    this._material = material;
  };

  _createClass(MaterialVariant, [{
    key: "uuid",
    get: function get() {
      return this._material._uuid;
    }
  }, {
    key: "owner",
    get: function get() {
      return this._owner;
    }
  }, {
    key: "material",
    get: function get() {
      return this._material;
    }
  }]);

  return MaterialVariant;
}(_CCMaterial["default"]), _temp)) || _class);
exports["default"] = MaterialVariant;
cc.MaterialVariant = MaterialVariant;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXG1hdGVyaWFsLXZhcmlhbnQudHMiXSwibmFtZXMiOlsiY2NjbGFzcyIsImNjIiwiX2RlY29yYXRvciIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZVdpdGhCdWlsdGluIiwibWF0ZXJpYWxOYW1lIiwib3duZXIiLCJjcmVhdGUiLCJNYXRlcmlhbCIsImdldEJ1aWx0aW5NYXRlcmlhbCIsIm1hdGVyaWFsIiwiTWF0ZXJpYWxQb29sIiwiZ2V0IiwiX293bmVyIiwiX21hdGVyaWFsIiwiaW5pdCIsIl9lZmZlY3QiLCJFZmZlY3RWYXJpYW50IiwiZWZmZWN0IiwiX2VmZmVjdEFzc2V0IiwiX3V1aWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVUFBYUMsRUFBRSxDQUFDQyxXQUFoQkY7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFcUJHLDBCQURwQkgsT0FBTyxDQUFDLG9CQUFEOzs7QUFLSjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtrQkFDV0ksb0JBQVAsMkJBQTBCQyxZQUExQixFQUFnREMsS0FBaEQsRUFBbUc7QUFDL0YsV0FBT0gsZUFBZSxDQUFDSSxNQUFoQixDQUF1QkMsdUJBQVNDLGtCQUFULENBQTRCSixZQUE1QixDQUF2QixFQUFrRUMsS0FBbEUsQ0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztrQkFDV0MsU0FBUCxnQkFBZUcsUUFBZixFQUFtQ0osS0FBbkMsRUFBc0Y7QUFDbEYsUUFBSSxDQUFDSSxRQUFMLEVBQWUsT0FBTyxJQUFQO0FBQ2YsV0FBT0MseUJBQWFDLEdBQWIsQ0FBaUJGLFFBQWpCLEVBQTJCSixLQUEzQixDQUFQO0FBQ0g7O0FBY0QsMkJBQWFJLFFBQWIsRUFBaUM7QUFBQTs7QUFDN0I7QUFENkIsVUF0Q2pDRyxNQXNDaUMsR0F0Q0osSUFzQ0k7QUFBQSxVQXJDakNDLFNBcUNpQyxHQXJDWCxJQXFDVzs7QUFFN0IsVUFBS0MsSUFBTCxDQUFVTCxRQUFWOztBQUY2QjtBQUdoQzs7OztTQUVESyxPQUFBLGNBQU1MLFFBQU4sRUFBZ0I7QUFDWixTQUFLTSxPQUFMLEdBQWUsSUFBSUMseUJBQUosQ0FBa0JQLFFBQVEsQ0FBQ1EsTUFBM0IsQ0FBZjtBQUNBLFNBQUtDLFlBQUwsR0FBb0JULFFBQVEsQ0FBQ1MsWUFBN0I7QUFDQSxTQUFLTCxTQUFMLEdBQWlCSixRQUFqQjtBQUNIOzs7O1NBckJELGVBQVk7QUFDUixhQUFPLEtBQUtJLFNBQUwsQ0FBZU0sS0FBdEI7QUFDSDs7O1NBRUQsZUFBYTtBQUNULGFBQU8sS0FBS1AsTUFBWjtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsU0FBWjtBQUNIOzs7O0VBckN3Q047O0FBbUQ3Q1AsRUFBRSxDQUFDRSxlQUFILEdBQXFCQSxlQUFyQiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi9DQ01hdGVyaWFsJztcclxuaW1wb3J0IEVmZmVjdFZhcmlhbnQgZnJvbSAnLi9lZmZlY3QtdmFyaWFudCc7XHJcbmltcG9ydCBNYXRlcmlhbFBvb2wgZnJvbSAnLi9tYXRlcmlhbC1wb29sJztcclxuXHJcbmxldCB7IGNjY2xhc3MsIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTWF0ZXJpYWwgVmFyaWFudCBpcyBhbiBleHRlbnNpb24gb2YgdGhlIE1hdGVyaWFsIEFzc2V0LlxyXG4gKiBDaGFuZ2VzIHRvIE1hdGVyaWFsIFZhcmlhbnQgZG8gbm90IGFmZmVjdCBvdGhlciBNYXRlcmlhbCBWYXJpYW50IG9yIE1hdGVyaWFsIEFzc2V0LFxyXG4gKiBhbmQgY2hhbmdlcyB0byBNYXRlcmlhbCBBc3NldCBhcmUgc3luY2hyb25pemVkIHRvIHRoZSBNYXRlcmlhbCBWYXJpYW50LlxyXG4gKiBIb3dldmVyLCB3aGVuIGEgTWF0ZXJpYWwgVmFyaWFudCBoYWQgYWxyZWFkeSBtb2RpZmllcyBhIHN0YXRlLCB0aGUgTWF0ZXJpYWwgQXNzZXQgc3RhdGUgaXMgbm90IHN5bmNocm9uaXplZCB0byB0aGUgTWF0ZXJpYWwgVmFyaWFudC5cclxuICogISN6aFxyXG4gKiDmnZDotKjlj5jkvZPmmK/mnZDotKjotYTmupDnmoTkuIDkuKrlu7bkvLjjgIJcclxuICog5p2Q6LSo5Y+Y5L2T55qE5L+u5pS55LiN5Lya5b2x5ZON5Yiw5YW25LuW55qE5p2Q6LSo5Y+Y5L2T5oiW6ICF5p2Q6LSo6LWE5rqQ77yM6ICM5p2Q6LSo6LWE5rqQ55qE5L+u5pS55Lya5ZCM5q2l5L2T546w5Yiw5p2Q6LSo5Y+Y5L2T5LiK77yMXHJcbiAqIOS9huaYr+W9k+adkOi0qOWPmOS9k+WvueS4gOS4queKtuaAgeS/ruaUueWQju+8jOadkOi0qOi1hOa6kOWGjeWvuei/meS4queKtuaAgeS/ruaUueaYr+S4jeS8muWQjOatpeWIsOadkOi0qOWPmOS9k+S4iueahOOAglxyXG4gKiBAY2xhc3MgTWF0ZXJpYWxWYXJpYW50XHJcbiAqIEBleHRlbmRzIE1hdGVyaWFsXHJcbiAqL1xyXG5AY2NjbGFzcygnY2MuTWF0ZXJpYWxWYXJpYW50JylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0ZXJpYWxWYXJpYW50IGV4dGVuZHMgTWF0ZXJpYWwge1xyXG4gICAgX293bmVyOiBjYy5SZW5kZXJDb21wb25lbnQgPSBudWxsO1xyXG4gICAgX21hdGVyaWFsOiBNYXRlcmlhbCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVdpdGhCdWlsdGluXHJcbiAgICAgKiBAcGFyYW0ge01hdGVyaWFsLkJVSUxUSU5fTkFNRX0gbWF0ZXJpYWxOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1JlbmRlckNvbXBvbmVudH0gW293bmVyXVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN0YXRpYyBjcmVhdGVXaXRoQnVpbHRpbiAobWF0ZXJpYWxOYW1lOiBzdHJpbmcsIG93bmVyOiBjYy5SZW5kZXJDb21wb25lbnQpOiBNYXRlcmlhbFZhcmlhbnQgfCBudWxsXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVXaXRoQnVpbHRpbiAobWF0ZXJpYWxOYW1lOiBzdHJpbmcsIG93bmVyOiBjYy5SZW5kZXJDb21wb25lbnQpOiBNYXRlcmlhbFZhcmlhbnQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwobWF0ZXJpYWxOYW1lKSwgb3duZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBjcmVhdGVcclxuICAgICAqIEBwYXJhbSB7TWF0ZXJpYWx9IG1hdGVyaWFsXHJcbiAgICAgKiBAcGFyYW0ge1JlbmRlckNvbXBvbmVudH0gW293bmVyXVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN0YXRpYyBjcmVhdGUgKG1hdGVyaWFsOiBNYXRlcmlhbCwgb3duZXI6IGNjLlJlbmRlckNvbXBvbmVudCk6IE1hdGVyaWFsVmFyaWFudCB8IG51bGxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZSAobWF0ZXJpYWw6IE1hdGVyaWFsLCBvd25lcjogY2MuUmVuZGVyQ29tcG9uZW50KTogTWF0ZXJpYWxWYXJpYW50IHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIE1hdGVyaWFsUG9vbC5nZXQobWF0ZXJpYWwsIG93bmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdXVpZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsLl91dWlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd25lciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChtYXRlcmlhbDogTWF0ZXJpYWwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdChtYXRlcmlhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCAobWF0ZXJpYWwpIHtcclxuICAgICAgICB0aGlzLl9lZmZlY3QgPSBuZXcgRWZmZWN0VmFyaWFudChtYXRlcmlhbC5lZmZlY3QpO1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdEFzc2V0ID0gbWF0ZXJpYWwuX2VmZmVjdEFzc2V0O1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNjLk1hdGVyaWFsVmFyaWFudCA9IE1hdGVyaWFsVmFyaWFudDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=