
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/sphere-collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.SphereCollider3D = void 0;

var _instance = require("../../instance");

var _colliderComponent = require("./collider-component");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property;
/**
 * !#en
 * Physics sphere collider
 * !#zh
 * 物理球碰撞器
 * @class SphereCollider3D
 * @extends Collider3D
 */

var SphereCollider3D = (_dec = ccclass('cc.SphereCollider3D'), _dec2 = executionOrder(98), _dec3 = menu('i18n:MAIN_MENU.component.physics/Collider/Sphere 3D'), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Collider3D) {
  _inheritsLoose(SphereCollider3D, _Collider3D);

  function SphereCollider3D() {
    var _this;

    _this = _Collider3D.call(this) || this;

    _initializerDefineProperty(_this, "_radius", _descriptor, _assertThisInitialized(_this));

    if (!CC_EDITOR) {
      _this._shape = (0, _instance.createSphereShape)(_this._radius);
    }

    return _this;
  }

  _createClass(SphereCollider3D, [{
    key: "radius",
    get: /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Get or set the radius of the sphere.
     * !#zh
     * 获取或设置球的半径。
     * @property {number} radius
     */
    function get() {
      return this._radius;
    },
    set: function set(value) {
      this._radius = value;

      if (!CC_EDITOR) {
        this.sphereShape.radius = this._radius;
      }
    }
    /**
     * @property {ISphereShape} sphereShape
     */

  }, {
    key: "sphereShape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

  }]);

  return SphereCollider3D;
}(_colliderComponent.Collider3D), _temp), (_applyDecoratedDescriptor(_class2.prototype, "radius", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "radius"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_radius", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
})), _class2)) || _class) || _class) || _class) || _class);
exports.SphereCollider3D = SphereCollider3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGNvbXBvbmVudHNcXGNvbGxpZGVyXFxzcGhlcmUtY29sbGlkZXItY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJleGVjdXRlSW5FZGl0TW9kZSIsImV4ZWN1dGlvbk9yZGVyIiwibWVudSIsInByb3BlcnR5IiwiU3BoZXJlQ29sbGlkZXIzRCIsIkNDX0VESVRPUiIsIl9zaGFwZSIsIl9yYWRpdXMiLCJ2YWx1ZSIsInNwaGVyZVNoYXBlIiwicmFkaXVzIiwiQ29sbGlkZXIzRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBU0lBLEVBQUUsQ0FBQ0M7SUFMSEMseUJBQUFBO0lBQ0FDLG1DQUFBQTtJQUNBQyxnQ0FBQUE7SUFDQUMsc0JBQUFBO0lBQ0FDLDBCQUFBQTtBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBS2FDLDJCQUpaTCxPQUFPLENBQUMscUJBQUQsV0FDUEUsY0FBYyxDQUFDLEVBQUQsV0FDZEMsSUFBSSxDQUFDLHFEQUFELCtDQUNKRjs7O0FBb0NHLDhCQUFlO0FBQUE7O0FBQ1g7O0FBRFc7O0FBRVgsUUFBSSxDQUFDSyxTQUFMLEVBQWdCO0FBQ1osWUFBS0MsTUFBTCxHQUFjLGlDQUFrQixNQUFLQyxPQUF2QixDQUFkO0FBQ0g7O0FBSlU7QUFLZDs7OztTQXRDRDs7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLG1CQUNxQjtBQUNqQixhQUFPLEtBQUtBLE9BQVo7QUFDSDtTQUVELGFBQW1CQyxLQUFuQixFQUEwQjtBQUN0QixXQUFLRCxPQUFMLEdBQWVDLEtBQWY7O0FBQ0EsVUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ1osYUFBS0ksV0FBTCxDQUFpQkMsTUFBakIsR0FBMEIsS0FBS0gsT0FBL0I7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBOzs7O1NBQ0ksZUFBd0M7QUFDcEMsYUFBTyxLQUFLRCxNQUFaO0FBQ0gsTUFFRDs7Ozs7RUE5QmtDSyxpR0FXakNSLG9LQXFCQUE7Ozs7O1dBQ3lCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlU3BoZXJlU2hhcGUgfSBmcm9tICcuLi8uLi9pbnN0YW5jZSc7XHJcbmltcG9ydCB7IENvbGxpZGVyM0QgfSBmcm9tICcuL2NvbGxpZGVyLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IElTcGhlcmVTaGFwZSB9IGZyb20gJy4uLy4uLy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcclxuXHJcbmNvbnN0IHtcclxuICAgIGNjY2xhc3MsXHJcbiAgICBleGVjdXRlSW5FZGl0TW9kZSxcclxuICAgIGV4ZWN1dGlvbk9yZGVyLFxyXG4gICAgbWVudSxcclxuICAgIHByb3BlcnR5LFxyXG59ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFBoeXNpY3Mgc3BoZXJlIGNvbGxpZGVyXHJcbiAqICEjemhcclxuICog54mp55CG55CD56Kw5pKe5ZmoXHJcbiAqIEBjbGFzcyBTcGhlcmVDb2xsaWRlcjNEXHJcbiAqIEBleHRlbmRzIENvbGxpZGVyM0RcclxuICovXHJcbkBjY2NsYXNzKCdjYy5TcGhlcmVDb2xsaWRlcjNEJylcclxuQGV4ZWN1dGlvbk9yZGVyKDk4KVxyXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvU3BoZXJlIDNEJylcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbmV4cG9ydCBjbGFzcyBTcGhlcmVDb2xsaWRlcjNEIGV4dGVuZHMgQ29sbGlkZXIzRCB7XHJcblxyXG4gICAgLy8vIFBVQkxJQyBQUk9QRVJUWSBHRVRURVJcXFNFVFRFUiAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCBvciBzZXQgdGhlIHJhZGl1cyBvZiB0aGUgc3BoZXJlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5oiW6K6+572u55CD55qE5Y2K5b6E44CCXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gcmFkaXVzXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHVibGljIGdldCByYWRpdXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCByYWRpdXMgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGhlcmVTaGFwZS5yYWRpdXMgPSB0aGlzLl9yYWRpdXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtJU3BoZXJlU2hhcGV9IHNwaGVyZVNoYXBlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc3BoZXJlU2hhcGUgKCk6IElTcGhlcmVTaGFwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXBlIGFzIElTcGhlcmVTaGFwZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8gUFJJVkFURSBQUk9QRVJUWSAvLy9cclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX3JhZGl1czogbnVtYmVyID0gMC41O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlID0gY3JlYXRlU3BoZXJlU2hhcGUodGhpcy5fcmFkaXVzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=