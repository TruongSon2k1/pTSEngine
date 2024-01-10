
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/CCLightComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = _interopRequireDefault(require("../../renderer/enums"));

var _color = _interopRequireDefault(require("../value-types/color"));

var _valueTypes = require("../value-types");

var _index = _interopRequireDefault(require("../renderer/index"));

var _CCEnum = _interopRequireDefault(require("../platform/CCEnum"));

var _CCComponent2 = _interopRequireDefault(require("../components/CCComponent"));

var _CCClassDecorator = require("../platform/CCClassDecorator");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var RendererLight = null;

if (CC_JSB && CC_NATIVERENDERER) {
  // @ts-ignore
  RendererLight = window.renderer.Light;
} else {
  // @ts-ignore
  RendererLight = require('../../renderer/scene/light');
}

/**
 * !#en The light source type
 *
 * !#zh 光源类型
 * @static
 * @enum Light.Type
 */
var LightType = (0, _CCEnum["default"])({
  /**
   * !#en The direction of light
   *
   * !#zh 平行光
   * @property {Number} DIRECTIONAL
   * @readonly
   */
  DIRECTIONAL: 0,

  /**
   * !#en The point of light
   *
   * !#zh 点光源
   * @property {Number} POINT
   * @readonly
   */
  POINT: 1,

  /**
   * !#en The spot of light
   *
   * !#zh 聚光灯
   * @property {Number} SPOT
   * @readonly
   */
  SPOT: 2,

  /**
   * !#en The ambient light
   * !#zh 环境光
   * @property {Number} AMBIENT
   * @readonly
   */
  AMBIENT: 3
});
/**
 * !#en The shadow type
 *
 * !#zh 阴影类型
 * @static
 * @enum Light.ShadowType
 */

var LightShadowType = (0, _CCEnum["default"])({
  /**
   * !#en No shadows
   *
   * !#zh 阴影关闭
   * @property NONE
   * @readonly
   * @type {Number}
   */
  NONE: 0,

  /**
   * !#en Hard shadows
   *
   * !#zh 阴硬影
   * @property HARD
   * @readonly
   * @type {Number}
   */
  HARD: 2,

  /**
   * !#en Soft PCF 3x3 shadows
   *
   * !#zh PCF 3x3 软阴影
   * @property SOFT_PCF3X3
   * @readonly
   * @type {Number}
   */
  SOFT_PCF3X3: 3,

  /**
   * !#en Soft PCF 5x5 shadows
   *
   * !#zh PCF 5x5 软阴影
   * @property SOFT_PCF5X5
   * @readonly
   * @type {Number}
   */
  SOFT_PCF5X5: 4
});
/**
 * !#en The Light Component
 *
 * !#zh 光源组件
 * @class Light
 * @extends Component
 */

var Light = (_dec = (0, _CCClassDecorator.ccclass)('cc.Light'), _dec2 = (0, _CCClassDecorator.menu)('i18n:MAIN_MENU.component.renderers/Light'), _dec3 = (0, _CCClassDecorator.inspector)('packages://inspector/inspectors/comps/light.js'), _dec4 = (0, _CCClassDecorator.property)({
  type: LightType
}), _dec5 = (0, _CCClassDecorator.property)({
  type: LightShadowType
}), _dec(_class = _dec2(_class = (0, _CCClassDecorator.executeInEditMode)(_class = _dec3(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CCComponent) {
  _inheritsLoose(Light, _CCComponent);

  function Light() {
    var _this;

    _this = _CCComponent.call(this) || this;

    _initializerDefineProperty(_this, "_type", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_color", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_intensity", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_range", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_spotAngle", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_spotExp", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowType", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowResolution", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowDarkness", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowMinDepth", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowMaxDepth", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowFrustumSize", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_shadowBias", _descriptor13, _assertThisInitialized(_this));

    _this._light = new RendererLight();
    return _this;
  }

  var _proto = Light.prototype;

  _proto.onLoad = function onLoad() {
    this._light.setNode(this.node);

    this.type = this._type;
    this.color = this._color;
    this.intensity = this._intensity;
    this.range = this._range;
    this.spotAngle = this._spotAngle;
    this.spotExp = this._spotExp;
    this.shadowType = this._shadowType;
    this.shadowResolution = this._shadowResolution;
    this.shadowDarkness = this._shadowDarkness;
    this.shadowMaxDepth = this._shadowMaxDepth;
    this.shadowFrustumSize = this._shadowFrustumSize;
    this.shadowBias = this._shadowBias;
  };

  _proto.onEnable = function onEnable() {
    _index["default"].scene.addLight(this._light);
  };

  _proto.onDisable = function onDisable() {
    _index["default"].scene.removeLight(this._light);
  };

  _createClass(Light, [{
    key: "type",
    get:
    /**
     * !#en The light source type，currently we have directional, point, spot three type.
     * !#zh 光源类型，目前有 平行光，聚光灯，点光源 三种类型
     * @type {LightType}
     */
    function get() {
      return this._type;
    },
    set: function set(val) {
      this._type = val;
      var type = _enums["default"].LIGHT_DIRECTIONAL;

      if (val === LightType.POINT) {
        type = _enums["default"].LIGHT_POINT;
      } else if (val === LightType.SPOT) {
        type = _enums["default"].LIGHT_SPOT;
      } else if (val === LightType.AMBIENT) {
        type = _enums["default"].LIGHT_AMBIENT;
      }

      this._light.setType(type);
    }
    /**
     * !#en The light source color
     * !#zh 光源颜色
     * @type {Color}
     */

  }, {
    key: "color",
    get: function get() {
      return this._color;
    },
    set: function set(val) {
      if (!this._color.equals(val)) {
        this._color.set(val);
      }

      this._light.setColor(val.r / 255, val.g / 255, val.b / 255);
    }
    /**
     * !#en The light source intensity
     *
     * !#zh 光源强度
     * @type {Number}
     */

  }, {
    key: "intensity",
    get: function get() {
      return this._intensity;
    },
    set: function set(val) {
      this._intensity = val;

      this._light.setIntensity(val);
    }
    /**
     * !#en The light range, used for spot and point light
     *
     * !#zh 针对聚光灯和点光源设置光源范围
     * @type {Number}
     */

  }, {
    key: "range",
    get: function get() {
      return this._range;
    },
    set: function set(val) {
      this._range = val;

      this._light.setRange(val);
    }
    /**
     * !#en The spot light cone angle
     *
     * !#zh 聚光灯锥角
     * @type {Number}
     */

  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    },
    set: function set(val) {
      this._spotAngle = val;

      this._light.setSpotAngle((0, _valueTypes.toRadian)(val));
    }
    /**
     * !#en The spot light exponential
     *
     * !#zh 聚光灯指数
     * @type {Number}
     */

  }, {
    key: "spotExp",
    get: function get() {
      return this._spotExp;
    },
    set: function set(val) {
      this._spotExp = val;

      this._light.setSpotExp(val);
    }
    /**
     * !#en The shadow type
     *
     * !#zh 阴影类型
     * @type {Number} shadowType
     */

  }, {
    key: "shadowType",
    get: function get() {
      return this._shadowType;
    },
    set: function set(val) {
      this._shadowType = val;

      this._light.setShadowType(val);
    }
    /**
     * !#en The shadow resolution
     *
     * !#zh 阴影分辨率
     *
     * @type {Number}
     */

  }, {
    key: "shadowResolution",
    get: function get() {
      return this._shadowResolution;
    },
    set: function set(val) {
      this._shadowResolution = val;

      this._light.setShadowResolution(val);
    }
    /**
     * !#en The shadow darkness
     *
     * !#zh 阴影灰度值
     *
     * @type {Number}
     */

  }, {
    key: "shadowDarkness",
    get: function get() {
      return this._shadowDarkness;
    },
    set: function set(val) {
      this._shadowDarkness = val;

      this._light.setShadowDarkness(val);
    }
    /**
     * !#en The shadow min depth
     *
     * !#zh 阴影最小深度
     *
     * @type {Number}
     */

  }, {
    key: "shadowMinDepth",
    get: function get() {
      return this._shadowMinDepth;
    },
    set: function set(val) {
      this._shadowMinDepth = val;

      this._light.setShadowMinDepth(val);
    }
    /**
     * !#en The shadow max depth
     *
     * !#zh 阴影最大深度
     *
     * @type {Number}
     */

  }, {
    key: "shadowMaxDepth",
    get: function get() {
      return this._shadowMaxDepth;
    },
    set: function set(val) {
      this._shadowMaxDepth = val;

      this._light.setShadowMaxDepth(val);
    }
    /**
     * !#en The shadow frustum size
     *
     * !#zh 阴影截锥体大小
     *
     * @type {Number}
     */

  }, {
    key: "shadowFrustumSize",
    get: function get() {
      return this._shadowFrustumSize;
    },
    set: function set(val) {
      this._shadowFrustumSize = val;

      this._light.setShadowFrustumSize(val);
    } // /**
    //  * !#en The shadow bias
    //  *
    //  * !#zh 阴影偏移量
    //  *
    //  * @type {Number}
    //  */
    // @property
    // get shadowBias() {
    //     return this._shadowBias;
    // }
    // set shadowBias(val) {
    //     this._shadowBias = val;
    //     this._light.setShadowBias(val);
    // }

  }]);

  return Light;
}(_CCComponent2["default"]), _class3.Type = LightType, _class3.ShadowType = LightShadowType, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_type", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return LightType.DIRECTIONAL;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _color["default"].WHITE;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_intensity", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_range", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_spotAngle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 60;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_spotExp", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_shadowType", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return LightShadowType.NONE;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_shadowResolution", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1024;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_shadowDarkness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_shadowMinDepth", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_shadowMaxDepth", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4096;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_shadowFrustumSize", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1024;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_shadowBias", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.0005;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "type"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "color", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "intensity", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "intensity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "range", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "range"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spotAngle", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "spotAngle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spotExp", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "spotExp"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowType", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowType"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowResolution", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowResolution"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowDarkness", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowDarkness"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowMinDepth", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowMinDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowMaxDepth", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowMaxDepth"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shadowFrustumSize", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "shadowFrustumSize"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports["default"] = Light;
cc.Light = Light;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxDQ0xpZ2h0Q29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIlJlbmRlcmVyTGlnaHQiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIndpbmRvdyIsInJlbmRlcmVyIiwiTGlnaHQiLCJyZXF1aXJlIiwiTGlnaHRUeXBlIiwiRElSRUNUSU9OQUwiLCJQT0lOVCIsIlNQT1QiLCJBTUJJRU5UIiwiTGlnaHRTaGFkb3dUeXBlIiwiTk9ORSIsIkhBUkQiLCJTT0ZUX1BDRjNYMyIsIlNPRlRfUENGNVg1IiwidHlwZSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiX2xpZ2h0Iiwib25Mb2FkIiwic2V0Tm9kZSIsIm5vZGUiLCJfdHlwZSIsImNvbG9yIiwiX2NvbG9yIiwiaW50ZW5zaXR5IiwiX2ludGVuc2l0eSIsInJhbmdlIiwiX3JhbmdlIiwic3BvdEFuZ2xlIiwiX3Nwb3RBbmdsZSIsInNwb3RFeHAiLCJfc3BvdEV4cCIsInNoYWRvd1R5cGUiLCJfc2hhZG93VHlwZSIsInNoYWRvd1Jlc29sdXRpb24iLCJfc2hhZG93UmVzb2x1dGlvbiIsInNoYWRvd0RhcmtuZXNzIiwiX3NoYWRvd0RhcmtuZXNzIiwic2hhZG93TWF4RGVwdGgiLCJfc2hhZG93TWF4RGVwdGgiLCJzaGFkb3dGcnVzdHVtU2l6ZSIsIl9zaGFkb3dGcnVzdHVtU2l6ZSIsInNoYWRvd0JpYXMiLCJfc2hhZG93QmlhcyIsIm9uRW5hYmxlIiwic2NlbmUiLCJhZGRMaWdodCIsIm9uRGlzYWJsZSIsInJlbW92ZUxpZ2h0IiwidmFsIiwiZW51bXMiLCJMSUdIVF9ESVJFQ1RJT05BTCIsIkxJR0hUX1BPSU5UIiwiTElHSFRfU1BPVCIsIkxJR0hUX0FNQklFTlQiLCJzZXRUeXBlIiwiZXF1YWxzIiwic2V0Iiwic2V0Q29sb3IiLCJyIiwiZyIsImIiLCJzZXRJbnRlbnNpdHkiLCJzZXRSYW5nZSIsInNldFNwb3RBbmdsZSIsInNldFNwb3RFeHAiLCJzZXRTaGFkb3dUeXBlIiwic2V0U2hhZG93UmVzb2x1dGlvbiIsInNldFNoYWRvd0RhcmtuZXNzIiwiX3NoYWRvd01pbkRlcHRoIiwic2V0U2hhZG93TWluRGVwdGgiLCJzZXRTaGFkb3dNYXhEZXB0aCIsInNldFNoYWRvd0ZydXN0dW1TaXplIiwiQ0NDb21wb25lbnQiLCJUeXBlIiwiU2hhZG93VHlwZSIsInByb3BlcnR5IiwiQ29sb3IiLCJXSElURSIsImNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQVdBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWkEsSUFBSUEsYUFBYSxHQUFHLElBQXBCOztBQUNBLElBQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0I7QUFDQUYsRUFBQUEsYUFBYSxHQUFHRyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLEtBQWhDO0FBQ0gsQ0FIRCxNQUdPO0FBQ0g7QUFDQUwsRUFBQUEsYUFBYSxHQUFHTSxPQUFPLENBQUMsNEJBQUQsQ0FBdkI7QUFDSDs7QUFPRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLFNBQVMsR0FBRyx3QkFBSztBQUNuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxXQUFXLEVBQUUsQ0FSTTs7QUFTbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsS0FBSyxFQUFFLENBaEJZOztBQWlCbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLENBeEJhOztBQTBCbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE9BQU8sRUFBRTtBQWhDVSxDQUFMLENBQWxCO0FBbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLGVBQWUsR0FBRyx3QkFBSztBQUN6QjtBQUNKO0FBQ0E7QUFDQTtBQUNB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QUF2Qjs7QUFDQSxXQUFLaEMsTUFBTCxDQUFZc0QsaUJBQVosQ0FBOEJ0QixHQUE5QjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUN3QjtBQUNwQixhQUFPLEtBQUtSLGtCQUFaO0FBQ0g7U0FFRCxhQUFzQlEsR0FBdEIsRUFBMkI7QUFDdkIsV0FBS1Isa0JBQUwsR0FBMEJRLEdBQTFCOztBQUNBLFdBQUtoQyxNQUFMLENBQVl1RCxvQkFBWixDQUFpQ3ZCLEdBQWpDO0FBQ0gsTUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBMVErQndCLG1DQTRReEJDLE9BQU9yRSxtQkFFUHNFLGFBQWFqRSwrRkE3UW5Ca0U7Ozs7O1dBQ092RSxTQUFTLENBQUNDOzsyRUFFakJzRTs7Ozs7V0FDUUMsa0JBQU1DOzsrRUFFZEY7Ozs7O1dBQ1k7OzJFQUVaQTs7Ozs7V0FDUTs7K0VBRVJBOzs7OztXQUNZOzs2RUFFWkE7Ozs7O1dBQ1U7O2dGQUVWQTs7Ozs7V0FDYWxFLGVBQWUsQ0FBQ0M7O3NGQUU3QmlFOzs7OztXQUNtQjs7b0ZBRW5CQTs7Ozs7V0FDaUI7O3FGQUVqQkE7Ozs7O1dBQ2lCOztxRkFFakJBOzs7OztXQUNpQjs7d0ZBRWpCQTs7Ozs7V0FDb0I7O2lGQUVwQkE7Ozs7O1dBQ2E7O3lNQWtDYkEseUtBa0JBQSx5S0FnQkFBLHlLQWdCQUEsMktBZ0JBQSw0VUFtQ0FBLHlMQWlCQUEsdUxBaUJBQSx1TEFpQkFBLDBMQWlCQUE7O0FBOERMRyxFQUFFLENBQUM1RSxLQUFILEdBQVdBLEtBQVgiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgZW51bXMgZnJvbSAnLi4vLi4vcmVuZGVyZXIvZW51bXMnO1xyXG5pbXBvcnQgQ29sb3IgZnJvbSAnLi4vdmFsdWUtdHlwZXMvY29sb3InO1xyXG5pbXBvcnQgeyB0b1JhZGlhbiB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcclxuXHJcbmxldCBSZW5kZXJlckxpZ2h0ID0gbnVsbDtcclxuaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgUmVuZGVyZXJMaWdodCA9IHdpbmRvdy5yZW5kZXJlci5MaWdodDtcclxufSBlbHNlIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIFJlbmRlcmVyTGlnaHQgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9zY2VuZS9saWdodCcpO1xyXG59XHJcblxyXG5pbXBvcnQgcmVuZGVyZXIgZnJvbSAnLi4vcmVuZGVyZXIvaW5kZXgnO1xyXG5pbXBvcnQgRW51bSBmcm9tICcuLi9wbGF0Zm9ybS9DQ0VudW0nO1xyXG5pbXBvcnQgQ0NDb21wb25lbnQgZnJvbSAnLi4vY29tcG9uZW50cy9DQ0NvbXBvbmVudCc7XHJcbmltcG9ydCB7IGNjY2xhc3MsIG1lbnUsIGluc3BlY3RvciwgcHJvcGVydHksIGV4ZWN1dGVJbkVkaXRNb2RlIH0gZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgbGlnaHQgc291cmNlIHR5cGVcclxuICpcclxuICogISN6aCDlhYnmupDnsbvlnotcclxuICogQHN0YXRpY1xyXG4gKiBAZW51bSBMaWdodC5UeXBlXHJcbiAqL1xyXG5jb25zdCBMaWdodFR5cGUgPSBFbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZGlyZWN0aW9uIG9mIGxpZ2h0XHJcbiAgICAgKlxyXG4gICAgICogISN6aCDlubPooYzlhYlcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBESVJFQ1RJT05BTFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIERJUkVDVElPTkFMOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBwb2ludCBvZiBsaWdodFxyXG4gICAgICpcclxuICAgICAqICEjemgg54K55YWJ5rqQXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUE9JTlRcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBQT0lOVDogMSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgc3BvdCBvZiBsaWdodFxyXG4gICAgICpcclxuICAgICAqICEjemgg6IGa5YWJ54GvXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1BPVFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIFNQT1Q6IDIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBhbWJpZW50IGxpZ2h0XHJcbiAgICAgKiAhI3poIOeOr+Wig+WFiVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFNQklFTlRcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBBTUJJRU5UOiAzXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHNoYWRvdyB0eXBlXHJcbiAqXHJcbiAqICEjemgg6Zi05b2x57G75Z6LXHJcbiAqIEBzdGF0aWNcclxuICogQGVudW0gTGlnaHQuU2hhZG93VHlwZVxyXG4gKi9cclxuY29uc3QgTGlnaHRTaGFkb3dUeXBlID0gRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTm8gc2hhZG93c1xyXG4gICAgICpcclxuICAgICAqICEjemgg6Zi05b2x5YWz6ZetXHJcbiAgICAgKiBAcHJvcGVydHkgTk9ORVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBOT05FOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEhhcmQgc2hhZG93c1xyXG4gICAgICpcclxuICAgICAqICEjemgg6Zi056Gs5b2xXHJcbiAgICAgKiBAcHJvcGVydHkgSEFSRFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBIQVJEOiAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNvZnQgUENGIDN4MyBzaGFkb3dzXHJcbiAgICAgKlxyXG4gICAgICogISN6aCBQQ0YgM3gzIOi9r+mYtOW9sVxyXG4gICAgICogQHByb3BlcnR5IFNPRlRfUENGM1gzXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFNPRlRfUENGM1gzOiAzLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNvZnQgUENGIDV4NSBzaGFkb3dzXHJcbiAgICAgKlxyXG4gICAgICogISN6aCBQQ0YgNXg1IOi9r+mYtOW9sVxyXG4gICAgICogQHByb3BlcnR5IFNPRlRfUENGNVg1XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFNPRlRfUENGNVg1OiA0LFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBMaWdodCBDb21wb25lbnRcclxuICpcclxuICogISN6aCDlhYnmupDnu4Tku7ZcclxuICogQGNsYXNzIExpZ2h0XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxuQGNjY2xhc3MoJ2NjLkxpZ2h0JylcclxuQG1lbnUoJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvTGlnaHQnKVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQGluc3BlY3RvcigncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9saWdodC5qcycpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0IGV4dGVuZHMgQ0NDb21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfdHlwZSA9IExpZ2h0VHlwZS5ESVJFQ1RJT05BTDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9jb2xvciA9IENvbG9yLldISVRFO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX2ludGVuc2l0eSA9IDE7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfcmFuZ2UgPSAxMDAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3Nwb3RBbmdsZSA9IDYwO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3Nwb3RFeHAgPSAxO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3NoYWRvd1R5cGUgPSBMaWdodFNoYWRvd1R5cGUuTk9ORTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zaGFkb3dSZXNvbHV0aW9uID0gMTAyNDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zaGFkb3dEYXJrbmVzcyA9IDAuNTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zaGFkb3dNaW5EZXB0aCA9IDE7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBfc2hhZG93TWF4RGVwdGggPSA0MDk2O1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgX3NoYWRvd0ZydXN0dW1TaXplID0gMTAyNDtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIF9zaGFkb3dCaWFzID0gMC4wMDA1O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbGlnaHQgc291cmNlIHR5cGXvvIxjdXJyZW50bHkgd2UgaGF2ZSBkaXJlY3Rpb25hbCwgcG9pbnQsIHNwb3QgdGhyZWUgdHlwZS5cclxuICAgICAqICEjemgg5YWJ5rqQ57G75Z6L77yM55uu5YmN5pyJIOW5s+ihjOWFie+8jOiBmuWFieeBr++8jOeCueWFiea6kCDkuInnp43nsbvlnotcclxuICAgICAqIEB0eXBlIHtMaWdodFR5cGV9XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogTGlnaHRUeXBlXHJcbiAgICB9KVxyXG4gICAgZ2V0IHR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHR5cGUodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IHZhbDtcclxuXHJcbiAgICAgICAgbGV0IHR5cGUgPSBlbnVtcy5MSUdIVF9ESVJFQ1RJT05BTDtcclxuICAgICAgICBpZiAodmFsID09PSBMaWdodFR5cGUuUE9JTlQpIHtcclxuICAgICAgICAgICAgdHlwZSA9IGVudW1zLkxJR0hUX1BPSU5UO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsID09PSBMaWdodFR5cGUuU1BPVCkge1xyXG4gICAgICAgICAgICB0eXBlID0gZW51bXMuTElHSFRfU1BPVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodmFsID09PSBMaWdodFR5cGUuQU1CSUVOVCkge1xyXG4gICAgICAgICAgICB0eXBlID0gZW51bXMuTElHSFRfQU1CSUVOVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0VHlwZSh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGxpZ2h0IHNvdXJjZSBjb2xvclxyXG4gICAgICogISN6aCDlhYnmupDpopzoibJcclxuICAgICAqIEB0eXBlIHtDb2xvcn1cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgY29sb3IoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBjb2xvcih2YWwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9saWdodC5zZXRDb2xvcih2YWwuciAvIDI1NSwgdmFsLmcgLyAyNTUsIHZhbC5iIC8gMjU1KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGxpZ2h0IHNvdXJjZSBpbnRlbnNpdHlcclxuICAgICAqXHJcbiAgICAgKiAhI3poIOWFiea6kOW8uuW6plxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgaW50ZW5zaXR5KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnRlbnNpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGludGVuc2l0eSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9pbnRlbnNpdHkgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0SW50ZW5zaXR5KHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBsaWdodCByYW5nZSwgdXNlZCBmb3Igc3BvdCBhbmQgcG9pbnQgbGlnaHRcclxuICAgICAqXHJcbiAgICAgKiAhI3poIOmSiOWvueiBmuWFieeBr+WSjOeCueWFiea6kOiuvue9ruWFiea6kOiMg+WbtFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgcmFuZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCByYW5nZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9yYW5nZSA9IHZhbDtcclxuICAgICAgICB0aGlzLl9saWdodC5zZXRSYW5nZSh2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgc3BvdCBsaWdodCBjb25lIGFuZ2xlXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDogZrlhYnnga/plKXop5JcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IHNwb3RBbmdsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BvdEFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzcG90QW5nbGUodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fc3BvdEFuZ2xlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNwb3RBbmdsZSh0b1JhZGlhbih2YWwpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHNwb3QgbGlnaHQgZXhwb25lbnRpYWxcclxuICAgICAqXHJcbiAgICAgKiAhI3poIOiBmuWFieeBr+aMh+aVsFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5XHJcbiAgICBnZXQgc3BvdEV4cCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BvdEV4cDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc3BvdEV4cCh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zcG90RXhwID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNwb3RFeHAodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHNoYWRvdyB0eXBlXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHnsbvlnotcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9IHNoYWRvd1R5cGVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBMaWdodFNoYWRvd1R5cGVcclxuICAgIH0pXHJcbiAgICBnZXQgc2hhZG93VHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93VHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2hhZG93VHlwZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9zaGFkb3dUeXBlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd1R5cGUodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHNoYWRvdyByZXNvbHV0aW9uXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHliIbovqjnjodcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzaGFkb3dSZXNvbHV0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzaGFkb3dSZXNvbHV0aW9uKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24gPSB2YWw7XHJcbiAgICAgICAgdGhpcy5fbGlnaHQuc2V0U2hhZG93UmVzb2x1dGlvbih2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgc2hhZG93IGRhcmtuZXNzXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHngbDluqblgLxcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzaGFkb3dEYXJrbmVzcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93RGFya25lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNoYWRvd0RhcmtuZXNzKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd0RhcmtuZXNzID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd0RhcmtuZXNzKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgbWluIGRlcHRoXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHmnIDlsI/mt7HluqZcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzaGFkb3dNaW5EZXB0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93TWluRGVwdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNoYWRvd01pbkRlcHRoKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd01pbkRlcHRoID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd01pbkRlcHRoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgbWF4IGRlcHRoXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHmnIDlpKfmt7HluqZcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzaGFkb3dNYXhEZXB0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93TWF4RGVwdGg7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNoYWRvd01heERlcHRoKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd01heERlcHRoID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd01heERlcHRoKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzaGFkb3cgZnJ1c3R1bSBzaXplXHJcbiAgICAgKlxyXG4gICAgICogISN6aCDpmLTlvbHmiKrplKXkvZPlpKflsI9cclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHlcclxuICAgIGdldCBzaGFkb3dGcnVzdHVtU2l6ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93RnJ1c3R1bVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNoYWRvd0ZydXN0dW1TaXplKHZhbCkge1xyXG4gICAgICAgIHRoaXMuX3NoYWRvd0ZydXN0dW1TaXplID0gdmFsO1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd0ZydXN0dW1TaXplKHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiAhI2VuIFRoZSBzaGFkb3cgYmlhc1xyXG4gICAgLy8gICpcclxuICAgIC8vICAqICEjemgg6Zi05b2x5YGP56e76YePXHJcbiAgICAvLyAgKlxyXG4gICAgLy8gICogQHR5cGUge051bWJlcn1cclxuICAgIC8vICAqL1xyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICAvLyBnZXQgc2hhZG93QmlhcygpIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5fc2hhZG93QmlhcztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzZXQgc2hhZG93Qmlhcyh2YWwpIHtcclxuICAgIC8vICAgICB0aGlzLl9zaGFkb3dCaWFzID0gdmFsO1xyXG4gICAgLy8gICAgIHRoaXMuX2xpZ2h0LnNldFNoYWRvd0JpYXModmFsKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzdGF0aWMgVHlwZSA9IExpZ2h0VHlwZTtcclxuXHJcbiAgICBzdGF0aWMgU2hhZG93VHlwZSA9IExpZ2h0U2hhZG93VHlwZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9saWdodCA9IG5ldyBSZW5kZXJlckxpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0LnNldE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLl90eXBlO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLl9jb2xvcjtcclxuICAgICAgICB0aGlzLmludGVuc2l0eSA9IHRoaXMuX2ludGVuc2l0eTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5fcmFuZ2U7XHJcbiAgICAgICAgdGhpcy5zcG90QW5nbGUgPSB0aGlzLl9zcG90QW5nbGU7XHJcbiAgICAgICAgdGhpcy5zcG90RXhwID0gdGhpcy5fc3BvdEV4cDtcclxuICAgICAgICB0aGlzLnNoYWRvd1R5cGUgPSB0aGlzLl9zaGFkb3dUeXBlO1xyXG4gICAgICAgIHRoaXMuc2hhZG93UmVzb2x1dGlvbiA9IHRoaXMuX3NoYWRvd1Jlc29sdXRpb247XHJcbiAgICAgICAgdGhpcy5zaGFkb3dEYXJrbmVzcyA9IHRoaXMuX3NoYWRvd0RhcmtuZXNzO1xyXG4gICAgICAgIHRoaXMuc2hhZG93TWF4RGVwdGggPSB0aGlzLl9zaGFkb3dNYXhEZXB0aDtcclxuICAgICAgICB0aGlzLnNoYWRvd0ZydXN0dW1TaXplID0gdGhpcy5fc2hhZG93RnJ1c3R1bVNpemU7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dCaWFzID0gdGhpcy5fc2hhZG93QmlhcztcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICByZW5kZXJlci5zY2VuZS5hZGRMaWdodCh0aGlzLl9saWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHJlbmRlcmVyLnNjZW5lLnJlbW92ZUxpZ2h0KHRoaXMuX2xpZ2h0KTtcclxuICAgIH1cclxufVxyXG5cclxuY2MuTGlnaHQgPSBMaWdodDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=