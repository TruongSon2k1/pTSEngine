
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/constant-force.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.ConstantForce = void 0;

var _rigidBodyComponent = require("./rigid-body-component");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _cc$_decorator = cc._decorator,
    ccclass = _cc$_decorator.ccclass,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property,
    requireComponent = _cc$_decorator.requireComponent,
    disallowMultiple = _cc$_decorator.disallowMultiple;
var Vec3 = cc.Vec3;
/**
 * !#en
 * Each frame applies a constant force to a rigid body, depending on the RigidBody3D
 * !#zh
 * 在每帧对一个刚体施加持续的力，依赖 RigidBody3D 组件
 * @class ConstantForce
 * @extends Component
 */

var ConstantForce = (_dec = ccclass('cc.ConstantForce'), _dec2 = executionOrder(98), _dec3 = requireComponent(_rigidBodyComponent.RigidBody3D), _dec4 = menu('i18n:MAIN_MENU.component.physics/Constant Force 3D'), _dec5 = property({
  displayOrder: 0
}), _dec6 = property({
  displayOrder: 1
}), _dec7 = property({
  displayOrder: 2
}), _dec8 = property({
  displayOrder: 3
}), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = disallowMultiple(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(ConstantForce, _cc$Component);

  function ConstantForce() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _cc$Component.call.apply(_cc$Component, [this].concat(args)) || this;
    _this._rigidbody = null;

    _initializerDefineProperty(_this, "_force", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_localForce", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_torque", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_localTorque", _descriptor4, _assertThisInitialized(_this));

    _this._mask = 0;
    return _this;
  }

  var _proto = ConstantForce.prototype;

  _proto.onLoad = function onLoad() {
    if (!CC_PHYSICS_BUILTIN) {
      this._rigidbody = this.node.getComponent(_rigidBodyComponent.RigidBody3D);

      this._maskUpdate(this._force, 1);

      this._maskUpdate(this._localForce, 2);

      this._maskUpdate(this._torque, 4);

      this._maskUpdate(this._localTorque, 8);
    }
  };

  _proto.lateUpdate = function lateUpdate(dt) {
    if (!CC_PHYSICS_BUILTIN) {
      if (this._rigidbody != null && this._mask != 0) {
        if (this._mask & 1) {
          this._rigidbody.applyForce(this._force);
        }

        if (this._mask & 2) {
          this._rigidbody.applyLocalForce(this.localForce);
        }

        if (this._mask & 4) {
          this._rigidbody.applyTorque(this._torque);
        }

        if (this._mask & 8) {
          this._rigidbody.applyLocalTorque(this._localTorque);
        }
      }
    }
  };

  _proto._maskUpdate = function _maskUpdate(t, m) {
    if (Vec3.strictEquals(t, Vec3.ZERO)) {
      this._mask &= ~m;
    } else {
      this._mask |= m;
    }
  };

  _createClass(ConstantForce, [{
    key: "force",
    get:
    /**
     * !#en
     * Set the force used in the world coordinate system, use `this.force = otherVec3`.
     * !#zh
     * 设置世界坐标系中使用的力，设置时请用 `this.force = otherVec3` 的方式。
     * @property {Vec3} force
     */
    function get() {
      return this._force;
    },
    set: function set(value) {
      Vec3.copy(this._force, value);

      this._maskUpdate(this._force, 1);
    }
    /**
     * !#en
     * Set the force used in the local coordinate system, using `this.localforce = otherVec3`.
     * !#zh
     * 获取和设置本地坐标系中使用的力，设置时请用 `this.localForce = otherVec3` 的方式。
     * @property {Vec3} localForce
     */

  }, {
    key: "localForce",
    get: function get() {
      return this._localForce;
    },
    set: function set(value) {
      Vec3.copy(this._localForce, value);

      this._maskUpdate(this.localForce, 2);
    }
    /**
     * !#en
     * Torque applied to the world orientation
     * !#zh
     * 对世界朝向施加的扭矩
     * @note
     * 设置时请用 this.torque = otherVec3 的方式
     * @property {Vec3} torque
     */

  }, {
    key: "torque",
    get: function get() {
      return this._torque;
    },
    set: function set(value) {
      Vec3.copy(this._torque, value);

      this._maskUpdate(this._torque, 4);
    }
    /**
     * !#en
     * Torque applied to local orientation, using `this.localtorque = otherVec3`.
     * !#zh
     * 对本地朝向施加的扭矩，设置时请用 `this.localTorque = otherVec3` 的方式。
     * @property {Vec3} localTorque
     */

  }, {
    key: "localTorque",
    get: function get() {
      return this._localTorque;
    },
    set: function set(value) {
      Vec3.copy(this._localTorque, value);

      this._maskUpdate(this._localTorque, 8);
    }
  }]);

  return ConstantForce;
}(cc.Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_force", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_localForce", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_torque", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_localTorque", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "force", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "force"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localForce", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "localForce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "torque", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "torque"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localTorque", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "localTorque"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ConstantForce = ConstantForce;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGNvbXBvbmVudHNcXGNvbnN0YW50LWZvcmNlLnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJleGVjdXRlSW5FZGl0TW9kZSIsImV4ZWN1dGlvbk9yZGVyIiwibWVudSIsInByb3BlcnR5IiwicmVxdWlyZUNvbXBvbmVudCIsImRpc2FsbG93TXVsdGlwbGUiLCJWZWMzIiwiQ29uc3RhbnRGb3JjZSIsIlJpZ2lkQm9keTNEIiwiZGlzcGxheU9yZGVyIiwiX3JpZ2lkYm9keSIsIl9tYXNrIiwib25Mb2FkIiwiQ0NfUEhZU0lDU19CVUlMVElOIiwibm9kZSIsImdldENvbXBvbmVudCIsIl9tYXNrVXBkYXRlIiwiX2ZvcmNlIiwiX2xvY2FsRm9yY2UiLCJfdG9ycXVlIiwiX2xvY2FsVG9ycXVlIiwibGF0ZVVwZGF0ZSIsImR0IiwiYXBwbHlGb3JjZSIsImFwcGx5TG9jYWxGb3JjZSIsImxvY2FsRm9yY2UiLCJhcHBseVRvcnF1ZSIsImFwcGx5TG9jYWxUb3JxdWUiLCJ0IiwibSIsInN0cmljdEVxdWFscyIsIlpFUk8iLCJ2YWx1ZSIsImNvcHkiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQVVJQSxFQUFFLENBQUNDO0lBUEhDLHlCQUFBQTtJQUNBQyxtQ0FBQUE7SUFDQUMsZ0NBQUFBO0lBQ0FDLHNCQUFBQTtJQUNBQywwQkFBQUE7SUFDQUMsa0NBQUFBO0lBQ0FDLGtDQUFBQTtBQUVKLElBQU1DLElBQUksR0FBR1QsRUFBRSxDQUFDUyxJQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBT2FDLHdCQU5aUixPQUFPLENBQUMsa0JBQUQsV0FDUEUsY0FBYyxDQUFDLEVBQUQsV0FDZEcsZ0JBQWdCLENBQUNJLCtCQUFELFdBQ2hC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LGVBR3FCO0FBQ2pCLGFBQU8sS0FBS04sT0FBWjtBQUNIO1NBRUQsYUFBbUJhLEtBQW5CLEVBQW1DO0FBQy9CMUIsTUFBQUEsSUFBSSxDQUFDMkIsSUFBTCxDQUFVLEtBQUtkLE9BQWYsRUFBd0JhLEtBQXhCOztBQUNBLFdBQUtoQixXQUFMLENBQWlCLEtBQUtHLE9BQXRCLEVBQStCLENBQS9CO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBRzBCO0FBQ3RCLGFBQU8sS0FBS0MsWUFBWjtBQUNIO1NBRUQsYUFBd0JZLEtBQXhCLEVBQXdDO0FBQ3BDMUIsTUFBQUEsSUFBSSxDQUFDMkIsSUFBTCxDQUFVLEtBQUtiLFlBQWYsRUFBNkJZLEtBQTdCOztBQUNBLFdBQUtoQixXQUFMLENBQWlCLEtBQUtJLFlBQXRCLEVBQW9DLENBQXBDO0FBQ0g7Ozs7RUE5RjhCdkIsRUFBRSxDQUFDcUMsMkZBSWpDL0I7Ozs7O1dBQ2tDLElBQUlHLElBQUo7O2dGQUVsQ0g7Ozs7O1dBQ3VDLElBQUlHLElBQUo7OzRFQUV2Q0g7Ozs7O1dBQ21DLElBQUlHLElBQUo7O2lGQUVuQ0g7Ozs7O1dBQ3dDLElBQUlHLElBQUoiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBSaWdpZEJvZHkzRCB9IGZyb20gJy4vcmlnaWQtYm9keS1jb21wb25lbnQnO1xyXG5cclxuY29uc3Qge1xyXG4gICAgY2NjbGFzcyxcclxuICAgIGV4ZWN1dGVJbkVkaXRNb2RlLFxyXG4gICAgZXhlY3V0aW9uT3JkZXIsXHJcbiAgICBtZW51LFxyXG4gICAgcHJvcGVydHksXHJcbiAgICByZXF1aXJlQ29tcG9uZW50LFxyXG4gICAgZGlzYWxsb3dNdWx0aXBsZSxcclxufSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogRWFjaCBmcmFtZSBhcHBsaWVzIGEgY29uc3RhbnQgZm9yY2UgdG8gYSByaWdpZCBib2R5LCBkZXBlbmRpbmcgb24gdGhlIFJpZ2lkQm9keTNEXHJcbiAqICEjemhcclxuICog5Zyo5q+P5bin5a+55LiA5Liq5Yia5L2T5pa95Yqg5oyB57ut55qE5Yqb77yM5L6d6LWWIFJpZ2lkQm9keTNEIOe7hOS7tlxyXG4gKiBAY2xhc3MgQ29uc3RhbnRGb3JjZVxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbkBjY2NsYXNzKCdjYy5Db25zdGFudEZvcmNlJylcclxuQGV4ZWN1dGlvbk9yZGVyKDk4KVxyXG5AcmVxdWlyZUNvbXBvbmVudChSaWdpZEJvZHkzRClcclxuQG1lbnUoJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0NvbnN0YW50IEZvcmNlIDNEJylcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuQGV4ZWN1dGVJbkVkaXRNb2RlXHJcbmV4cG9ydCBjbGFzcyBDb25zdGFudEZvcmNlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9yaWdpZGJvZHk6IFJpZ2lkQm9keTNEIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9mb3JjZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbEZvcmNlOiBjYy5WZWMzID0gbmV3IFZlYzMoKTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3RvcnF1ZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9sb2NhbFRvcnF1ZTogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFzazogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldCB0aGUgZm9yY2UgdXNlZCBpbiB0aGUgd29ybGQgY29vcmRpbmF0ZSBzeXN0ZW0sIHVzZSBgdGhpcy5mb3JjZSA9IG90aGVyVmVjM2AuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva7kuJbnlYzlnZDmoIfns7vkuK3kvb/nlKjnmoTlipvvvIzorr7nva7ml7bor7fnlKggYHRoaXMuZm9yY2UgPSBvdGhlclZlYzNgIOeahOaWueW8j+OAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBmb3JjZVxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogMFxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgZm9yY2UgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZvcmNlICh2YWx1ZTogY2MuVmVjMykge1xyXG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9mb3JjZSwgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5fZm9yY2UsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IHRoZSBmb3JjZSB1c2VkIGluIHRoZSBsb2NhbCBjb29yZGluYXRlIHN5c3RlbSwgdXNpbmcgYHRoaXMubG9jYWxmb3JjZSA9IG90aGVyVmVjM2AuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5blkozorr7nva7mnKzlnLDlnZDmoIfns7vkuK3kvb/nlKjnmoTlipvvvIzorr7nva7ml7bor7fnlKggYHRoaXMubG9jYWxGb3JjZSA9IG90aGVyVmVjM2Ag55qE5pa55byP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGxvY2FsRm9yY2VcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBkaXNwbGF5T3JkZXI6IDFcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IGxvY2FsRm9yY2UgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbEZvcmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbG9jYWxGb3JjZSAodmFsdWU6IGNjLlZlYzMpIHtcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5fbG9jYWxGb3JjZSwgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5sb2NhbEZvcmNlLCAyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRvcnF1ZSBhcHBsaWVkIHRvIHRoZSB3b3JsZCBvcmllbnRhdGlvblxyXG4gICAgICogISN6aFxyXG4gICAgICog5a+55LiW55WM5pyd5ZCR5pa95Yqg55qE5omt55+pXHJcbiAgICAgKiBAbm90ZVxyXG4gICAgICog6K6+572u5pe26K+355SoIHRoaXMudG9ycXVlID0gb3RoZXJWZWMzIOeahOaWueW8j1xyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSB0b3JxdWVcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBkaXNwbGF5T3JkZXI6IDJcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IHRvcnF1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvcnF1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHRvcnF1ZSAodmFsdWU6IGNjLlZlYzMpIHtcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5fdG9ycXVlLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWFza1VwZGF0ZSh0aGlzLl90b3JxdWUsIDQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVG9ycXVlIGFwcGxpZWQgdG8gbG9jYWwgb3JpZW50YXRpb24sIHVzaW5nIGB0aGlzLmxvY2FsdG9ycXVlID0gb3RoZXJWZWMzYC5cclxuICAgICAqICEjemhcclxuICAgICAqIOWvueacrOWcsOacneWQkeaWveWKoOeahOaJreefqe+8jOiuvue9ruaXtuivt+eUqCBgdGhpcy5sb2NhbFRvcnF1ZSA9IG90aGVyVmVjM2Ag55qE5pa55byP44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGxvY2FsVG9ycXVlXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgZGlzcGxheU9yZGVyOiAzXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCBsb2NhbFRvcnF1ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsVG9ycXVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbG9jYWxUb3JxdWUgKHZhbHVlOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2xvY2FsVG9ycXVlLCB2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWFza1VwZGF0ZSh0aGlzLl9sb2NhbFRvcnF1ZSwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChSaWdpZEJvZHkzRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5fZm9yY2UsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXNrVXBkYXRlKHRoaXMuX2xvY2FsRm9yY2UsIDIpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXNrVXBkYXRlKHRoaXMuX3RvcnF1ZSwgNCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2tVcGRhdGUodGhpcy5fbG9jYWxUb3JxdWUsIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGF0ZVVwZGF0ZSAoZHQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9yaWdpZGJvZHkgIT0gbnVsbCAmJiB0aGlzLl9tYXNrICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXNrICYgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JpZ2lkYm9keS5hcHBseUZvcmNlKHRoaXMuX2ZvcmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFzayAmIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yaWdpZGJvZHkuYXBwbHlMb2NhbEZvcmNlKHRoaXMubG9jYWxGb3JjZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hc2sgJiA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5LmFwcGx5VG9ycXVlKHRoaXMuX3RvcnF1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21hc2sgJiA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmlnaWRib2R5LmFwcGx5TG9jYWxUb3JxdWUodGhpcy5fbG9jYWxUb3JxdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21hc2tVcGRhdGUgKHQ6IGNjLlZlYzMsIG06IG51bWJlcikge1xyXG4gICAgICAgIGlmIChWZWMzLnN0cmljdEVxdWFscyh0LCBWZWMzLlpFUk8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2sgJj0gfm07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFzayB8PSBtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==