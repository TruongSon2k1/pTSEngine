
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/rigid-body-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.RigidBody3D = void 0;

var _instance = require("../instance");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

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
    disallowMultiple = _cc$_decorator.disallowMultiple,
    executeInEditMode = _cc$_decorator.executeInEditMode,
    executionOrder = _cc$_decorator.executionOrder,
    menu = _cc$_decorator.menu,
    property = _cc$_decorator.property;
var Vec3 = cc.Vec3;
/**
 * !#en
 * RigidBody is the basic object that make up the physical world, and it can make a node physically affected and react.
 * !#zh
 * 刚体是组成物理世界的基本对象，可以让一个节点受到物理影响并产生反应。该组件在使用 Builtin 物理引擎时无效。
 * @class RigidBody3D
 * @extends Component
 */

var RigidBody3D = (_dec = ccclass('cc.RigidBody3D'), _dec2 = executionOrder(99), _dec3 = menu('i18n:MAIN_MENU.component.physics/Rigid Body 3D'), _dec4 = property({
  displayOrder: 0
}), _dec5 = property({
  displayOrder: 1
}), _dec6 = property({
  displayOrder: 2
}), _dec7 = property({
  displayOrder: 3
}), _dec8 = property({
  displayOrder: 4
}), _dec9 = property({
  displayOrder: 5
}), _dec10 = property({
  displayOrder: 6
}), _dec11 = property({
  displayOrder: 7
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = disallowMultiple(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(RigidBody3D, _cc$Component);

  function RigidBody3D() {
    var _this;

    _this = _cc$Component.call(this) || this;
    _this._body = void 0;
    _this._allowSleep = true;

    _initializerDefineProperty(_this, "_mass", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_linearDamping", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_angularDamping", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_fixedRotation", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_isKinematic", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_useGravity", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_linearFactor", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_angularFactor", _descriptor8, _assertThisInitialized(_this));

    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      _this._body = (0, _instance.createRigidBody)();
    }

    return _this;
  } /// COMPONENT LIFECYCLE ///


  var _proto = RigidBody3D.prototype;

  _proto.__preload = function __preload() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.__preload(this);
    }
  };

  _proto.onEnable = function onEnable() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.onDestroy();
    }
  } /// PUBLIC METHOD ///

  /**
   * !#en
   * A force is applied to a rigid body at a point in world space.
   * !#zh
   * 在世界空间中的某点上对刚体施加一个作用力。
   * @method applyForce
   * @param {Vec3} force
   * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
   */
  ;

  _proto.applyForce = function applyForce(force, relativePoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyForce(force, relativePoint);
    }
  }
  /**
   * !#en
   * Apply a force on the rigid body at a point in local space.
   * !#zh
   * 在本地空间中的某点上对刚体施加一个作用力。
   * @method applyLocalForce
   * @param {Vec3} force 
   * @param {Vec3} localPoint Point of application
   */
  ;

  _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalForce(force, localPoint);
    }
  }
  /**
   * !#en
   * Apply an impulse to a rigid body at a point in world space.
   * !#zh
   * 在世界空间的某点上对刚体施加一个冲量。
   * @method applyImpulse
   * @param {Vec3} impulse
   * @param {Vec3} relativePoint The point of action, relative to the center of the rigid body.
   */
  ;

  _proto.applyImpulse = function applyImpulse(impulse, relativePoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyImpulse(impulse, relativePoint);
    }
  }
  /**
   * !#en
   * Apply an impulse to the rigid body at a point in local space.
   * !#zh
   * 在本地空间的某点上对刚体施加一个冲量。
   * @method applyLocalImpulse
   * @param {Vec3} impulse
   * @param {Vec3} localPoint Point of application
   */
  ;

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalImpulse(impulse, localPoint);
    }
  }
  /**
   * !#en
   * Apply a torque to the rigid body.
   * !#zh
   * 对刚体施加扭转力。
   * @method applyTorque
   * @param {Vec3} torque
   */
  ;

  _proto.applyTorque = function applyTorque(torque) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyTorque(torque);
    }
  }
  /**
   * !#en
   * Apply a local torque to the rigid body.
   * !#zh
   * 对刚体施加本地扭转力。
   * @method applyLocalTorque
   * @param {Vec3} torque
   */
  ;

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.applyLocalTorque(torque);
    }
  }
  /**
   * !#en
   * Awaken the rigid body.
   * !#zh
   * 唤醒刚体。
   * @method wakeUp
   */
  ;

  _proto.wakeUp = function wakeUp() {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.wakeUp();
    }
  }
  /**
   * !#en
   * Dormant rigid body.
   * !#zh
   * 休眠刚体。
   * @method sleep
   */
  ;

  _proto.sleep = function sleep() {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.sleep();
    }
  }
  /**
   * !#en
   * Get linear velocity.
   * !#zh
   * 获取线性速度。
   * @method getLinearVelocity
   * @param {Vec3} out
   */
  ;

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.getLinearVelocity(out);
    }
  }
  /**
   * !#en
   * Set linear speed.
   * !#zh
   * 设置线性速度。
   * @method setLinearVelocity
   * @param {Vec3} value 
   */
  ;

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.setLinearVelocity(value);
    }
  }
  /**
   * !#en
   * Gets the rotation speed.
   * !#zh
   * 获取旋转速度。
   * @method getAngularVelocity
   * @param {Vec3} out 
   */
  ;

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.getAngularVelocity(out);
    }
  }
  /**
   * !#en
   * Set rotation speed.
   * !#zh
   * 设置旋转速度。
   * @method setAngularVelocity
   * @param {Vec3} value 
   */
  ;

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
      this._body.setAngularVelocity(value);
    }
  };

  _createClass(RigidBody3D, [{
    key: "allowSleep",
    get: /// PUBLIC PROPERTY GETTER\SETTER ///

    /**
     * !#en
     * Whether sleep is allowed.
     * !#zh
     * 是否允许休眠。
     * @property {boolean} allowSleep
     */
    function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.allowSleep = v;
      }
    }
    /**
     * !#en
     * The mass of the rigidbody.
     * !#zh
     * 刚体的质量。
     * @property {number} mass
     */

  }, {
    key: "mass",
    get: function get() {
      return this._mass;
    },
    set: function set(value) {
      this._mass = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.mass = value;
      }
    }
    /**
     * !#en
     * Used to reduce the linear rate of rigidbody. The larger the value, the slower the rigidbody moves.
     * !#zh
     * 线性阻尼，用于减小刚体的线性速率，值越大物体移动越慢。
     * @property {number} linearDamping
     */

  }, {
    key: "linearDamping",
    get: function get() {
      return this._linearDamping;
    },
    set: function set(value) {
      this._linearDamping = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.linearDamping = value;
      }
    }
    /**
     * !#en
     * Used to reduce the rotation rate of rigidbody. The larger the value, the slower the rigidbody rotates.
     * !#zh
     * 角阻尼，用于减小刚体的旋转速率，值越大刚体旋转越慢。
     * @property {number} angularDamping
     */

  }, {
    key: "angularDamping",
    get: function get() {
      return this._angularDamping;
    },
    set: function set(value) {
      this._angularDamping = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.angularDamping = value;
      }
    }
    /**
     * !#en
     * If enabled, the developer controls the displacement and rotation of the rigidbody, not the physics engine.
     * !#zh
     * 是否由开发者来控制刚体的位移和旋转，而不是受物理引擎的影响。
     * @property {boolean} isKinematic
     */

  }, {
    key: "isKinematic",
    get: function get() {
      return this._isKinematic;
    },
    set: function set(value) {
      this._isKinematic = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.isKinematic = value;
      }
    }
    /**
     * !#en
     * If enabled, the rigidbody is affected by gravity.
     * !#zh
     * 如果开启，刚体会受到重力影响。
     * @property {boolean} useGravity
     */

  }, {
    key: "useGravity",
    get: function get() {
      return this._useGravity;
    },
    set: function set(value) {
      this._useGravity = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.useGravity = value;
      }
    }
    /**
     * !#en
     * If enabled, the rigidbody will be fixed without rotation during a collision.
     * !#zh
     * 如果开启，发生碰撞时会固定刚体不产生旋转。
     * @property {boolean} fixedRotation
     */

  }, {
    key: "fixedRotation",
    get: function get() {
      return this._fixedRotation;
    },
    set: function set(value) {
      this._fixedRotation = value;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.fixedRotation = value;
      }
    }
    /**
     * !#en
     * It can affect the linear velocity change of the rigidbody in each axis. The larger the value, the faster the rigidbody moves.
     * !#zh
     * 线性因子，可影响刚体在每个轴向的线性速度变化，值越大刚体移动越快。
     * @property {Vec3} linearFactor
     */

  }, {
    key: "linearFactor",
    get: function get() {
      return this._linearFactor;
    },
    set: function set(value) {
      Vec3.copy(this._linearFactor, value);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.linearFactor = this._linearFactor;
      }
    }
    /**
     * !#en
     * It can affect the rotation speed change of the rigidbody in each axis. The larger the value, the faster the rigidbody rotates.
     * !#zh
     * 旋转因子，可影响刚体在每个轴向的旋转速度变化，值越大刚体旋转越快。
     * @property {Vec3} angularFactor
     */

  }, {
    key: "angularFactor",
    get: function get() {
      return this._angularFactor;
    },
    set: function set(value) {
      Vec3.copy(this._angularFactor, value);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this._body.angularFactor = this._angularFactor;
      }
    }
    /**
     * !#en
     * The rigidbody is awake.
     * !#zh
     * 刚体是否为唤醒的状态。
     * @property {boolean} isAwake
     * @readonly
     */

  }, {
    key: "isAwake",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isAwake;
      }

      return false;
    }
    /**
     * !#en
     * The rigidbody can enter hibernation.
     * !#zh
     * 刚体是否为可进入休眠的状态。
     * @property {boolean} isSleepy
     * @readonly
     */

  }, {
    key: "isSleepy",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isSleepy;
      }

      return false;
    }
    /**
     * !#en
     * The rigidbody is sleeping.
     * !#zh
     * 刚体是否为正在休眠的状态。
     * @property {boolean} isSleeping
     * @readonly
     */

  }, {
    key: "isSleeping",
    get: function get() {
      if (this._assertOnload && !CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        return this._body.isSleeping;
      }

      return false;
    }
    /**
     * !#en
     * Get the rigidbody object inside the physics engine.
     * !#zh
     * 获得物理引擎内部刚体对象。
     * @property {IRigidBody} rigidBody
     * @readonly
     */

  }, {
    key: "rigidBody",
    get: function get() {
      return this._body;
    }
  }, {
    key: "_assertOnload",
    get: function get() {
      var r = this._isOnLoadCalled == 0;

      if (r) {
        cc.error('Physics Error: Please make sure that the node has been added to the scene');
      }

      return !r;
    }
  }]);

  return RigidBody3D;
}(cc.Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "mass", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "mass"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearDamping", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "linearDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularDamping", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "angularDamping"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isKinematic", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "isKinematic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "useGravity", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "useGravity"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fixedRotation", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "fixedRotation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "linearFactor", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "linearFactor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "angularFactor", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "angularFactor"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mass", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 10;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_linearDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_angularDamping", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_fixedRotation", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_isKinematic", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useGravity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_linearFactor", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_angularFactor", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3(1, 1, 1);
  }
})), _class2)) || _class) || _class) || _class) || _class) || _class);
exports.RigidBody3D = RigidBody3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGNvbXBvbmVudHNcXHJpZ2lkLWJvZHktY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbImNjIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJkaXNhbGxvd011bHRpcGxlIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJleGVjdXRpb25PcmRlciIsIm1lbnUiLCJwcm9wZXJ0eSIsIlZlYzMiLCJSaWdpZEJvZHkzRCIsImRpc3BsYXlPcmRlciIsIl9ib2R5IiwiX2FsbG93U2xlZXAiLCJDQ19FRElUT1IiLCJDQ19QSFlTSUNTX0JVSUxUSU4iLCJfX3ByZWxvYWQiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIm9uRGVzdHJveSIsImFwcGx5Rm9yY2UiLCJmb3JjZSIsInJlbGF0aXZlUG9pbnQiLCJfYXNzZXJ0T25sb2FkIiwiYXBwbHlMb2NhbEZvcmNlIiwibG9jYWxQb2ludCIsImFwcGx5SW1wdWxzZSIsImltcHVsc2UiLCJhcHBseUxvY2FsSW1wdWxzZSIsImFwcGx5VG9ycXVlIiwidG9ycXVlIiwiYXBwbHlMb2NhbFRvcnF1ZSIsIndha2VVcCIsInNsZWVwIiwiZ2V0TGluZWFyVmVsb2NpdHkiLCJvdXQiLCJzZXRMaW5lYXJWZWxvY2l0eSIsInZhbHVlIiwiZ2V0QW5ndWxhclZlbG9jaXR5Iiwic2V0QW5ndWxhclZlbG9jaXR5IiwidiIsImFsbG93U2xlZXAiLCJfbWFzcyIsIm1hc3MiLCJfbGluZWFyRGFtcGluZyIsImxpbmVhckRhbXBpbmciLCJfYW5ndWxhckRhbXBpbmciLCJhbmd1bGFyRGFtcGluZyIsIl9pc0tpbmVtYXRpYyIsImlzS2luZW1hdGljIiwiX3VzZUdyYXZpdHkiLCJ1c2VHcmF2aXR5IiwiX2ZpeGVkUm90YXRpb24iLCJmaXhlZFJvdGF0aW9uIiwiX2xpbmVhckZhY3RvciIsImNvcHkiLCJsaW5lYXJGYWN0b3IiLCJfYW5ndWxhckZhY3RvciIsImFuZ3VsYXJGYWN0b3IiLCJpc0F3YWtlIiwiaXNTbGVlcHkiLCJpc1NsZWVwaW5nIiwiciIsIl9pc09uTG9hZENhbGxlZCIsImVycm9yIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFTSUEsRUFBRSxDQUFDQztJQU5IQyx5QkFBQUE7SUFDQUMsa0NBQUFBO0lBQ0FDLG1DQUFBQTtJQUNBQyxnQ0FBQUE7SUFDQUMsc0JBQUFBO0lBQ0FDLDBCQUFBQTtBQUVKLElBQU1DLElBQUksR0FBR1IsRUFBRSxDQUFDUSxJQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBTWFDLHNCQUxaUCxPQUFPLENBQUMsZ0JBQUQsV0FDUEcsY0FBYyxDQUFDLEVBQUQsV0FDZEMsSUFBSSxDQUFDLGdEQUFELFdBZ0NBQyxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxXQXFCUkgsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsV0FxQlJILFFBQVEsQ0FBQztBQUNORyxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFdBcUJSSCxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxXQXFCUkgsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsV0FxQlJILFFBQVEsQ0FBQztBQUNORyxFQUFBQSxZQUFZLEVBQUU7QUFEUixDQUFELFlBcUJSSCxRQUFRLENBQUM7QUFDTkcsRUFBQUEsWUFBWSxFQUFFO0FBRFIsQ0FBRCxZQXFCUkgsUUFBUSxDQUFDO0FBQ05HLEVBQUFBLFlBQVksRUFBRTtBQURSLENBQUQsK0NBbExaTiwyQkFDQUQ7OztBQTZSRyx5QkFBZTtBQUFBOztBQUNYO0FBRFcsVUFyQ1BRLEtBcUNPO0FBQUEsVUFoQ1BDLFdBZ0NPLEdBaENnQixJQWdDaEI7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBRVgsUUFBSSxDQUFDQyxTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLFlBQUtILEtBQUwsR0FBYSxnQ0FBYjtBQUNIOztBQUpVO0FBS2QsSUFFRDs7Ozs7U0FFVUksWUFBVixxQkFBdUI7QUFDbkIsUUFBSSxDQUFDRixTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLFdBQUtILEtBQUwsQ0FBV0ksU0FBWCxDQUFzQixJQUF0QjtBQUNIO0FBQ0o7O1NBRVNDLFdBQVYsb0JBQXNCO0FBQ2xCLFFBQUksQ0FBQ0gsU0FBRCxJQUFjLENBQUNDLGtCQUFuQixFQUF1QztBQUNuQyxXQUFLSCxLQUFMLENBQVdLLFFBQVg7QUFDSDtBQUNKOztTQUVTQyxZQUFWLHFCQUF1QjtBQUNuQixRQUFJLENBQUNKLFNBQUQsSUFBYyxDQUFDQyxrQkFBbkIsRUFBdUM7QUFDbkMsV0FBS0gsS0FBTCxDQUFXTSxTQUFYO0FBQ0g7QUFDSjs7U0FFU0MsWUFBVixxQkFBdUI7QUFDbkIsUUFBSSxDQUFDTCxTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLFdBQUtILEtBQUwsQ0FBV08sU0FBWDtBQUNIO0FBQ0osSUFFRDs7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXQyxhQUFQLG9CQUFtQkMsS0FBbkIsRUFBbUNDLGFBQW5DLEVBQTREO0FBQ3hELFFBQUksS0FBS0MsYUFBTCxJQUFzQixDQUFDVCxTQUF2QixJQUFvQyxDQUFDQyxrQkFBekMsRUFBNkQ7QUFDekQsV0FBS0gsS0FBTCxDQUFXUSxVQUFYLENBQXNCQyxLQUF0QixFQUE2QkMsYUFBN0I7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV0Usa0JBQVAseUJBQXdCSCxLQUF4QixFQUF3Q0ksVUFBeEMsRUFBOEQ7QUFDMUQsUUFBSSxLQUFLRixhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVdZLGVBQVgsQ0FBMkJILEtBQTNCLEVBQWtDSSxVQUFsQztBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXQyxlQUFQLHNCQUFxQkMsT0FBckIsRUFBdUNMLGFBQXZDLEVBQWdFO0FBQzVELFFBQUksS0FBS0MsYUFBTCxJQUFzQixDQUFDVCxTQUF2QixJQUFvQyxDQUFDQyxrQkFBekMsRUFBNkQ7QUFDekQsV0FBS0gsS0FBTCxDQUFXYyxZQUFYLENBQXdCQyxPQUF4QixFQUFpQ0wsYUFBakM7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV00sb0JBQVAsMkJBQTBCRCxPQUExQixFQUE0Q0YsVUFBNUMsRUFBa0U7QUFDOUQsUUFBSSxLQUFLRixhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVdnQixpQkFBWCxDQUE2QkQsT0FBN0IsRUFBc0NGLFVBQXRDO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXSSxjQUFQLHFCQUFvQkMsTUFBcEIsRUFBcUM7QUFDakMsUUFBSSxLQUFLUCxhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVdpQixXQUFYLENBQXVCQyxNQUF2QjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV0MsbUJBQVAsMEJBQXlCRCxNQUF6QixFQUEwQztBQUN0QyxRQUFJLEtBQUtQLGFBQUwsSUFBc0IsQ0FBQ1QsU0FBdkIsSUFBb0MsQ0FBQ0Msa0JBQXpDLEVBQTZEO0FBQ3pELFdBQUtILEtBQUwsQ0FBV21CLGdCQUFYLENBQTRCRCxNQUE1QjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dFLFNBQVAsa0JBQWlCO0FBQ2IsUUFBSSxLQUFLVCxhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVdvQixNQUFYO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7U0FDV0MsUUFBUCxpQkFBZ0I7QUFDWixRQUFJLEtBQUtWLGFBQUwsSUFBc0IsQ0FBQ1QsU0FBdkIsSUFBb0MsQ0FBQ0Msa0JBQXpDLEVBQTZEO0FBQ3pELFdBQUtILEtBQUwsQ0FBV3FCLEtBQVg7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dDLG9CQUFQLDJCQUEwQkMsR0FBMUIsRUFBd0M7QUFDcEMsUUFBSSxLQUFLWixhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVdzQixpQkFBWCxDQUE2QkMsR0FBN0I7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dDLG9CQUFQLDJCQUEwQkMsS0FBMUIsRUFBZ0Q7QUFDNUMsUUFBSSxLQUFLZCxhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVd3QixpQkFBWCxDQUE2QkMsS0FBN0I7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dDLHFCQUFQLDRCQUEyQkgsR0FBM0IsRUFBeUM7QUFDckMsUUFBSSxLQUFLWixhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVcwQixrQkFBWCxDQUE4QkgsR0FBOUI7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ1dJLHFCQUFQLDRCQUEyQkYsS0FBM0IsRUFBaUQ7QUFDN0MsUUFBSSxLQUFLZCxhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxXQUFLSCxLQUFMLENBQVcyQixrQkFBWCxDQUE4QkYsS0FBOUI7QUFDSDtBQUNKOzs7O1NBcmVEOztBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ksbUJBQWtDO0FBQzlCLGFBQU8sS0FBS3hCLFdBQVo7QUFDSDtTQUVELGFBQXVCMkIsQ0FBdkIsRUFBbUM7QUFDL0IsV0FBSzNCLFdBQUwsR0FBbUIyQixDQUFuQjs7QUFDQSxVQUFJLENBQUMxQixTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLGFBQUtILEtBQUwsQ0FBVzZCLFVBQVgsR0FBd0JELENBQXhCO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFHbUI7QUFDZixhQUFPLEtBQUtFLEtBQVo7QUFDSDtTQUVELGFBQWlCTCxLQUFqQixFQUF3QjtBQUNwQixXQUFLSyxLQUFMLEdBQWFMLEtBQWI7O0FBQ0EsVUFBSSxDQUFDdkIsU0FBRCxJQUFjLENBQUNDLGtCQUFuQixFQUF1QztBQUNuQyxhQUFLSCxLQUFMLENBQVcrQixJQUFYLEdBQWtCTixLQUFsQjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBRzRCO0FBQ3hCLGFBQU8sS0FBS08sY0FBWjtBQUNIO1NBRUQsYUFBMEJQLEtBQTFCLEVBQWlDO0FBQzdCLFdBQUtPLGNBQUwsR0FBc0JQLEtBQXRCOztBQUNBLFVBQUksQ0FBQ3ZCLFNBQUQsSUFBYyxDQUFDQyxrQkFBbkIsRUFBdUM7QUFDbkMsYUFBS0gsS0FBTCxDQUFXaUMsYUFBWCxHQUEyQlIsS0FBM0I7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUc2QjtBQUN6QixhQUFPLEtBQUtTLGVBQVo7QUFDSDtTQUVELGFBQTJCVCxLQUEzQixFQUFrQztBQUM5QixXQUFLUyxlQUFMLEdBQXVCVCxLQUF2Qjs7QUFDQSxVQUFJLENBQUN2QixTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLGFBQUtILEtBQUwsQ0FBV21DLGNBQVgsR0FBNEJWLEtBQTVCO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFHMEI7QUFDdEIsYUFBTyxLQUFLVyxZQUFaO0FBQ0g7U0FFRCxhQUF3QlgsS0FBeEIsRUFBK0I7QUFDM0IsV0FBS1csWUFBTCxHQUFvQlgsS0FBcEI7O0FBQ0EsVUFBSSxDQUFDdkIsU0FBRCxJQUFjLENBQUNDLGtCQUFuQixFQUF1QztBQUNuQyxhQUFLSCxLQUFMLENBQVdxQyxXQUFYLEdBQXlCWixLQUF6QjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBR3lCO0FBQ3JCLGFBQU8sS0FBS2EsV0FBWjtBQUNIO1NBRUQsYUFBdUJiLEtBQXZCLEVBQThCO0FBQzFCLFdBQUthLFdBQUwsR0FBbUJiLEtBQW5COztBQUNBLFVBQUksQ0FBQ3ZCLFNBQUQsSUFBYyxDQUFDQyxrQkFBbkIsRUFBdUM7QUFDbkMsYUFBS0gsS0FBTCxDQUFXdUMsVUFBWCxHQUF3QmQsS0FBeEI7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUc0QjtBQUN4QixhQUFPLEtBQUtlLGNBQVo7QUFDSDtTQUVELGFBQTBCZixLQUExQixFQUFpQztBQUM3QixXQUFLZSxjQUFMLEdBQXNCZixLQUF0Qjs7QUFDQSxVQUFJLENBQUN2QixTQUFELElBQWMsQ0FBQ0Msa0JBQW5CLEVBQXVDO0FBQ25DLGFBQUtILEtBQUwsQ0FBV3lDLGFBQVgsR0FBMkJoQixLQUEzQjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBR29DO0FBQ2hDLGFBQU8sS0FBS2lCLGFBQVo7QUFDSDtTQUVELGFBQXlCakIsS0FBekIsRUFBeUM7QUFDckM1QixNQUFBQSxJQUFJLENBQUM4QyxJQUFMLENBQVUsS0FBS0QsYUFBZixFQUE4QmpCLEtBQTlCOztBQUNBLFVBQUksQ0FBQ3ZCLFNBQUQsSUFBYyxDQUFDQyxrQkFBbkIsRUFBdUM7QUFDbkMsYUFBS0gsS0FBTCxDQUFXNEMsWUFBWCxHQUEwQixLQUFLRixhQUEvQjtBQUNIO0FBQ0o7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBRzRCO0FBQ3hCLGFBQU8sS0FBS0csY0FBWjtBQUNIO1NBRUQsYUFBMEJwQixLQUExQixFQUEwQztBQUN0QzVCLE1BQUFBLElBQUksQ0FBQzhDLElBQUwsQ0FBVSxLQUFLRSxjQUFmLEVBQStCcEIsS0FBL0I7O0FBQ0EsVUFBSSxDQUFDdkIsU0FBRCxJQUFjLENBQUNDLGtCQUFuQixFQUF1QztBQUNuQyxhQUFLSCxLQUFMLENBQVc4QyxhQUFYLEdBQTJCLEtBQUtELGNBQWhDO0FBQ0g7QUFDSjtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUErQjtBQUMzQixVQUFJLEtBQUtsQyxhQUFMLElBQXNCLENBQUNULFNBQXZCLElBQW9DLENBQUNDLGtCQUF6QyxFQUE2RDtBQUN6RCxlQUFPLEtBQUtILEtBQUwsQ0FBVytDLE9BQWxCO0FBQ0g7O0FBQ0QsYUFBTyxLQUFQO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBZ0M7QUFDNUIsVUFBSSxLQUFLcEMsYUFBTCxJQUFzQixDQUFDVCxTQUF2QixJQUFvQyxDQUFDQyxrQkFBekMsRUFBNkQ7QUFDekQsZUFBTyxLQUFLSCxLQUFMLENBQVdnRCxRQUFsQjtBQUNIOztBQUNELGFBQU8sS0FBUDtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQWtDO0FBQzlCLFVBQUksS0FBS3JDLGFBQUwsSUFBc0IsQ0FBQ1QsU0FBdkIsSUFBb0MsQ0FBQ0Msa0JBQXpDLEVBQTZEO0FBQ3pELGVBQU8sS0FBS0gsS0FBTCxDQUFXaUQsVUFBbEI7QUFDSDs7QUFDRCxhQUFPLEtBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUF3QjtBQUNwQixhQUFPLEtBQUtqRCxLQUFaO0FBQ0g7OztTQWlDRCxlQUF3QztBQUNwQyxVQUFNa0QsQ0FBQyxHQUFHLEtBQUtDLGVBQUwsSUFBd0IsQ0FBbEM7O0FBQ0EsVUFBSUQsQ0FBSixFQUFPO0FBQUU3RCxRQUFBQSxFQUFFLENBQUMrRCxLQUFILENBQVMsMkVBQVQ7QUFBd0Y7O0FBQ2pHLGFBQU8sQ0FBQ0YsQ0FBUjtBQUNIOzs7O0VBMVI0QjdELEVBQUUsQ0FBQ2dFLGcwQ0E4UC9CekQ7Ozs7O1dBQ3VCOzttRkFFdkJBOzs7OztXQUNnQzs7b0ZBRWhDQTs7Ozs7V0FDaUM7O21GQUVqQ0E7Ozs7O1dBQ2lDOztpRkFFakNBOzs7OztXQUMrQjs7Z0ZBRS9CQTs7Ozs7V0FDOEI7O2tGQUU5QkE7Ozs7O1dBQ2dDLElBQUlDLElBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWY7O21GQUVoQ0Q7Ozs7O1dBQ2lDLElBQUlDLElBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBJUmlnaWRCb2R5IH0gZnJvbSAnLi4vLi4vc3BlYy9JLXJpZ2lkLWJvZHknO1xyXG5pbXBvcnQgeyBjcmVhdGVSaWdpZEJvZHkgfSBmcm9tICcuLi9pbnN0YW5jZSc7XHJcblxyXG5jb25zdCB7XHJcbiAgICBjY2NsYXNzLFxyXG4gICAgZGlzYWxsb3dNdWx0aXBsZSxcclxuICAgIGV4ZWN1dGVJbkVkaXRNb2RlLFxyXG4gICAgZXhlY3V0aW9uT3JkZXIsXHJcbiAgICBtZW51LFxyXG4gICAgcHJvcGVydHksXHJcbn0gPSBjYy5fZGVjb3JhdG9yO1xyXG5jb25zdCBWZWMzID0gY2MuVmVjMztcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJpZ2lkQm9keSBpcyB0aGUgYmFzaWMgb2JqZWN0IHRoYXQgbWFrZSB1cCB0aGUgcGh5c2ljYWwgd29ybGQsIGFuZCBpdCBjYW4gbWFrZSBhIG5vZGUgcGh5c2ljYWxseSBhZmZlY3RlZCBhbmQgcmVhY3QuXHJcbiAqICEjemhcclxuICog5Yia5L2T5piv57uE5oiQ54mp55CG5LiW55WM55qE5Z+65pys5a+56LGh77yM5Y+v5Lul6K6p5LiA5Liq6IqC54K55Y+X5Yiw54mp55CG5b2x5ZON5bm25Lqn55Sf5Y+N5bqU44CC6K+l57uE5Lu25Zyo5L2/55SoIEJ1aWx0aW4g54mp55CG5byV5pOO5pe25peg5pWI44CCXHJcbiAqIEBjbGFzcyBSaWdpZEJvZHkzRFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbkBjY2NsYXNzKCdjYy5SaWdpZEJvZHkzRCcpXHJcbkBleGVjdXRpb25PcmRlcig5OSlcclxuQG1lbnUoJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL1JpZ2lkIEJvZHkgM0QnKVxyXG5AZXhlY3V0ZUluRWRpdE1vZGVcclxuQGRpc2FsbG93TXVsdGlwbGVcclxuZXhwb3J0IGNsYXNzIFJpZ2lkQm9keTNEIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLy8gUFVCTElDIFBST1BFUlRZIEdFVFRFUlxcU0VUVEVSIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogV2hldGhlciBzbGVlcCBpcyBhbGxvd2VkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5YWB6K645LyR55yg44CCXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFsbG93U2xlZXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhbGxvd1NsZWVwICgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dTbGVlcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFsbG93U2xlZXAgKHY6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hbGxvd1NsZWVwID0gdjtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYWxsb3dTbGVlcCA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIG1hc3Mgb2YgdGhlIHJpZ2lkYm9keS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWImuS9k+eahOi0qOmHj+OAglxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IG1hc3NcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBkaXNwbGF5T3JkZXI6IDBcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IG1hc3MgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbWFzcyAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9tYXNzID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5Lm1hc3MgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBVc2VkIHRvIHJlZHVjZSB0aGUgbGluZWFyIHJhdGUgb2YgcmlnaWRib2R5LiBUaGUgbGFyZ2VyIHRoZSB2YWx1ZSwgdGhlIHNsb3dlciB0aGUgcmlnaWRib2R5IG1vdmVzLlxyXG4gICAgICogISN6aFxyXG4gICAgICog57q/5oCn6Zi75bC877yM55So5LqO5YeP5bCP5Yia5L2T55qE57q/5oCn6YCf546H77yM5YC86LaK5aSn54mp5L2T56e75Yqo6LaK5oWi44CCXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gbGluZWFyRGFtcGluZ1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogMVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgbGluZWFyRGFtcGluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVhckRhbXBpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsaW5lYXJEYW1waW5nICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2xpbmVhckRhbXBpbmcgPSB2YWx1ZTtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkubGluZWFyRGFtcGluZyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFVzZWQgdG8gcmVkdWNlIHRoZSByb3RhdGlvbiByYXRlIG9mIHJpZ2lkYm9keS4gVGhlIGxhcmdlciB0aGUgdmFsdWUsIHRoZSBzbG93ZXIgdGhlIHJpZ2lkYm9keSByb3RhdGVzLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6KeS6Zi75bC877yM55So5LqO5YeP5bCP5Yia5L2T55qE5peL6L2s6YCf546H77yM5YC86LaK5aSn5Yia5L2T5peL6L2s6LaK5oWi44CCXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYW5ndWxhckRhbXBpbmdcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBkaXNwbGF5T3JkZXI6IDJcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IGFuZ3VsYXJEYW1waW5nICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYW5ndWxhckRhbXBpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbmd1bGFyRGFtcGluZyAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9hbmd1bGFyRGFtcGluZyA9IHZhbHVlO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS5hbmd1bGFyRGFtcGluZyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIElmIGVuYWJsZWQsIHRoZSBkZXZlbG9wZXIgY29udHJvbHMgdGhlIGRpc3BsYWNlbWVudCBhbmQgcm90YXRpb24gb2YgdGhlIHJpZ2lkYm9keSwgbm90IHRoZSBwaHlzaWNzIGVuZ2luZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaYr+WQpueUseW8gOWPkeiAheadpeaOp+WItuWImuS9k+eahOS9jeenu+WSjOaXi+i9rO+8jOiAjOS4jeaYr+WPl+eJqeeQhuW8leaTjueahOW9seWTjeOAglxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc0tpbmVtYXRpY1xyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogM1xyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgaXNLaW5lbWF0aWMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0tpbmVtYXRpYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzS2luZW1hdGljICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2lzS2luZW1hdGljID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LmlzS2luZW1hdGljID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSWYgZW5hYmxlZCwgdGhlIHJpZ2lkYm9keSBpcyBhZmZlY3RlZCBieSBncmF2aXR5LlxyXG4gICAgICogISN6aFxyXG4gICAgICog5aaC5p6c5byA5ZCv77yM5Yia5L2T5Lya5Y+X5Yiw6YeN5Yqb5b2x5ZON44CCXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHVzZUdyYXZpdHlcclxuICAgICAqL1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICBkaXNwbGF5T3JkZXI6IDRcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IHVzZUdyYXZpdHkgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VHcmF2aXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdXNlR3Jhdml0eSAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl91c2VHcmF2aXR5ID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LnVzZUdyYXZpdHkgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJZiBlbmFibGVkLCB0aGUgcmlnaWRib2R5IHdpbGwgYmUgZml4ZWQgd2l0aG91dCByb3RhdGlvbiBkdXJpbmcgYSBjb2xsaXNpb24uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlpoLmnpzlvIDlkK/vvIzlj5HnlJ/norDmkp7ml7bkvJrlm7rlrprliJrkvZPkuI3kuqfnlJ/ml4vovazjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZml4ZWRSb3RhdGlvblxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogNVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgZml4ZWRSb3RhdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeGVkUm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBmaXhlZFJvdGF0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2ZpeGVkUm90YXRpb24gPSB2YWx1ZTtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuZml4ZWRSb3RhdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEl0IGNhbiBhZmZlY3QgdGhlIGxpbmVhciB2ZWxvY2l0eSBjaGFuZ2Ugb2YgdGhlIHJpZ2lkYm9keSBpbiBlYWNoIGF4aXMuIFRoZSBsYXJnZXIgdGhlIHZhbHVlLCB0aGUgZmFzdGVyIHRoZSByaWdpZGJvZHkgbW92ZXMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnur/mgKflm6DlrZDvvIzlj6/lvbHlk43liJrkvZPlnKjmr4/kuKrovbTlkJHnmoTnur/mgKfpgJ/luqblj5jljJbvvIzlgLzotorlpKfliJrkvZPnp7vliqjotorlv6vjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gbGluZWFyRmFjdG9yXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgZGlzcGxheU9yZGVyOiA2XHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCBsaW5lYXJGYWN0b3IgKCk6IGNjLlZlYzMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lYXJGYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBsaW5lYXJGYWN0b3IgKHZhbHVlOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2xpbmVhckZhY3RvciwgdmFsdWUpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS5saW5lYXJGYWN0b3IgPSB0aGlzLl9saW5lYXJGYWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSXQgY2FuIGFmZmVjdCB0aGUgcm90YXRpb24gc3BlZWQgY2hhbmdlIG9mIHRoZSByaWdpZGJvZHkgaW4gZWFjaCBheGlzLiBUaGUgbGFyZ2VyIHRoZSB2YWx1ZSwgdGhlIGZhc3RlciB0aGUgcmlnaWRib2R5IHJvdGF0ZXMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDml4vovazlm6DlrZDvvIzlj6/lvbHlk43liJrkvZPlnKjmr4/kuKrovbTlkJHnmoTml4vovazpgJ/luqblj5jljJbvvIzlgLzotorlpKfliJrkvZPml4vovazotorlv6vjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYW5ndWxhckZhY3RvclxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogN1xyXG4gICAgfSlcclxuICAgIHB1YmxpYyBnZXQgYW5ndWxhckZhY3RvciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ3VsYXJGYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBhbmd1bGFyRmFjdG9yICh2YWx1ZTogY2MuVmVjMykge1xyXG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9hbmd1bGFyRmFjdG9yLCB2YWx1ZSk7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFuZ3VsYXJGYWN0b3IgPSB0aGlzLl9hbmd1bGFyRmFjdG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSByaWdpZGJvZHkgaXMgYXdha2UuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJrkvZPmmK/lkKbkuLrllKTphpLnmoTnirbmgIHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNBd2FrZVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNBd2FrZSAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHkuaXNBd2FrZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIHJpZ2lkYm9keSBjYW4gZW50ZXIgaGliZXJuYXRpb24uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJrkvZPmmK/lkKbkuLrlj6/ov5vlhaXkvJHnnKDnmoTnirbmgIHjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNTbGVlcHlcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzU2xlZXB5ICgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pc1NsZWVweTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIHJpZ2lkYm9keSBpcyBzbGVlcGluZy5cclxuICAgICAqICEjemhcclxuICAgICAqIOWImuS9k+aYr+WQpuS4uuato+WcqOS8keecoOeahOeKtuaAgeOAglxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBpc1NsZWVwaW5nXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1NsZWVwaW5nICgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYm9keS5pc1NsZWVwaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIHJpZ2lkYm9keSBvYmplY3QgaW5zaWRlIHRoZSBwaHlzaWNzIGVuZ2luZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+W+l+eJqeeQhuW8leaTjuWGhemDqOWImuS9k+WvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtJUmlnaWRCb2R5fSByaWdpZEJvZHlcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IHJpZ2lkQm9keSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfYm9keSE6IElSaWdpZEJvZHk7XHJcblxyXG4gICAgLy8vIFBSSVZBVEUgUFJPUEVSVFkgLy8vXHJcblxyXG4gICAgLy8gQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9hbGxvd1NsZWVwOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX21hc3M6IG51bWJlciA9IDEwO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfbGluZWFyRGFtcGluZzogbnVtYmVyID0gMC4xO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfYW5ndWxhckRhbXBpbmc6IG51bWJlciA9IDAuMTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2ZpeGVkUm90YXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2lzS2luZW1hdGljOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF91c2VHcmF2aXR5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2xpbmVhckZhY3RvcjogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSBfYW5ndWxhckZhY3RvcjogY2MuVmVjMyA9IG5ldyBWZWMzKDEsIDEsIDEpO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgX2Fzc2VydE9ubG9hZCAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgciA9IHRoaXMuX2lzT25Mb2FkQ2FsbGVkID09IDA7XHJcbiAgICAgICAgaWYgKHIpIHsgY2MuZXJyb3IoJ1BoeXNpY3MgRXJyb3I6IFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbm9kZSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgc2NlbmUnKTsgfVxyXG4gICAgICAgIHJldHVybiAhcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkgPSBjcmVhdGVSaWdpZEJvZHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vIENPTVBPTkVOVCBMSUZFQ1lDTEUgLy8vXHJcblxyXG4gICAgcHJvdGVjdGVkIF9fcHJlbG9hZCAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5Ll9fcHJlbG9hZCEodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5Lm9uRW5hYmxlISgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlICgpIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkub25EaXNhYmxlISgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95ICgpIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkub25EZXN0cm95ISgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8gUFVCTElDIE1FVEhPRCAvLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEEgZm9yY2UgaXMgYXBwbGllZCB0byBhIHJpZ2lkIGJvZHkgYXQgYSBwb2ludCBpbiB3b3JsZCBzcGFjZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWcqOS4lueVjOepuumXtOS4reeahOafkOeCueS4iuWvueWImuS9k+aWveWKoOS4gOS4quS9nOeUqOWKm+OAglxyXG4gICAgICogQG1ldGhvZCBhcHBseUZvcmNlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGZvcmNlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHJlbGF0aXZlUG9pbnQgVGhlIHBvaW50IG9mIGFjdGlvbiwgcmVsYXRpdmUgdG8gdGhlIGNlbnRlciBvZiB0aGUgcmlnaWQgYm9keS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGx5Rm9yY2UgKGZvcmNlOiBjYy5WZWMzLCByZWxhdGl2ZVBvaW50PzogY2MuVmVjMykge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYXBwbHlGb3JjZShmb3JjZSwgcmVsYXRpdmVQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXBwbHkgYSBmb3JjZSBvbiB0aGUgcmlnaWQgYm9keSBhdCBhIHBvaW50IGluIGxvY2FsIHNwYWNlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Zyo5pys5Zyw56m66Ze05Lit55qE5p+Q54K55LiK5a+55Yia5L2T5pa95Yqg5LiA5Liq5L2c55So5Yqb44CCXHJcbiAgICAgKiBAbWV0aG9kIGFwcGx5TG9jYWxGb3JjZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBmb3JjZSBcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbG9jYWxQb2ludCBQb2ludCBvZiBhcHBsaWNhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwbHlMb2NhbEZvcmNlIChmb3JjZTogY2MuVmVjMywgbG9jYWxQb2ludD86IGNjLlZlYzMpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFwcGx5TG9jYWxGb3JjZShmb3JjZSwgbG9jYWxQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXBwbHkgYW4gaW1wdWxzZSB0byBhIHJpZ2lkIGJvZHkgYXQgYSBwb2ludCBpbiB3b3JsZCBzcGFjZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWcqOS4lueVjOepuumXtOeahOafkOeCueS4iuWvueWImuS9k+aWveWKoOS4gOS4quWGsumHj+OAglxyXG4gICAgICogQG1ldGhvZCBhcHBseUltcHVsc2VcclxuICAgICAqIEBwYXJhbSB7VmVjM30gaW1wdWxzZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSByZWxhdGl2ZVBvaW50IFRoZSBwb2ludCBvZiBhY3Rpb24sIHJlbGF0aXZlIHRvIHRoZSBjZW50ZXIgb2YgdGhlIHJpZ2lkIGJvZHkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhcHBseUltcHVsc2UgKGltcHVsc2U6IGNjLlZlYzMsIHJlbGF0aXZlUG9pbnQ/OiBjYy5WZWMzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS5hcHBseUltcHVsc2UoaW1wdWxzZSwgcmVsYXRpdmVQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXBwbHkgYW4gaW1wdWxzZSB0byB0aGUgcmlnaWQgYm9keSBhdCBhIHBvaW50IGluIGxvY2FsIHNwYWNlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Zyo5pys5Zyw56m66Ze055qE5p+Q54K55LiK5a+55Yia5L2T5pa95Yqg5LiA5Liq5Yay6YeP44CCXHJcbiAgICAgKiBAbWV0aG9kIGFwcGx5TG9jYWxJbXB1bHNlXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGltcHVsc2VcclxuICAgICAqIEBwYXJhbSB7VmVjM30gbG9jYWxQb2ludCBQb2ludCBvZiBhcHBsaWNhdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwbHlMb2NhbEltcHVsc2UgKGltcHVsc2U6IGNjLlZlYzMsIGxvY2FsUG9pbnQ/OiBjYy5WZWMzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS5hcHBseUxvY2FsSW1wdWxzZShpbXB1bHNlLCBsb2NhbFBvaW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBcHBseSBhIHRvcnF1ZSB0byB0aGUgcmlnaWQgYm9keS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWvueWImuS9k+aWveWKoOaJrei9rOWKm+OAglxyXG4gICAgICogQG1ldGhvZCBhcHBseVRvcnF1ZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB0b3JxdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGx5VG9ycXVlICh0b3JxdWU6IGNjLlZlYzMpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LmFwcGx5VG9ycXVlKHRvcnF1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXBwbHkgYSBsb2NhbCB0b3JxdWUgdG8gdGhlIHJpZ2lkIGJvZHkuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlr7nliJrkvZPmlr3liqDmnKzlnLDmia3ovazlipvjgIJcclxuICAgICAqIEBtZXRob2QgYXBwbHlMb2NhbFRvcnF1ZVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB0b3JxdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwcGx5TG9jYWxUb3JxdWUgKHRvcnF1ZTogY2MuVmVjMykge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuYXBwbHlMb2NhbFRvcnF1ZSh0b3JxdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEF3YWtlbiB0aGUgcmlnaWQgYm9keS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWUpOmGkuWImuS9k+OAglxyXG4gICAgICogQG1ldGhvZCB3YWtlVXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdha2VVcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2VydE9ubG9hZCAmJiAhQ0NfRURJVE9SICYmICFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5fYm9keS53YWtlVXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEb3JtYW50IHJpZ2lkIGJvZHkuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvJHnnKDliJrkvZPjgIJcclxuICAgICAqIEBtZXRob2Qgc2xlZXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNsZWVwICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LnNsZWVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGxpbmVhciB2ZWxvY2l0eS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPlue6v+aAp+mAn+W6puOAglxyXG4gICAgICogQG1ldGhvZCBnZXRMaW5lYXJWZWxvY2l0eVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExpbmVhclZlbG9jaXR5IChvdXQ6IGNjLlZlYzMpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LmdldExpbmVhclZlbG9jaXR5KG91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IGxpbmVhciBzcGVlZC5cclxuICAgICAqICEjemhcclxuICAgICAqIOiuvue9rue6v+aAp+mAn+W6puOAglxyXG4gICAgICogQG1ldGhvZCBzZXRMaW5lYXJWZWxvY2l0eVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldExpbmVhclZlbG9jaXR5ICh2YWx1ZTogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuc2V0TGluZWFyVmVsb2NpdHkodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldHMgdGhlIHJvdGF0aW9uIHNwZWVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5peL6L2s6YCf5bqm44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldEFuZ3VsYXJWZWxvY2l0eVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXQgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRBbmd1bGFyVmVsb2NpdHkgKG91dDogY2MuVmVjMykge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NlcnRPbmxvYWQgJiYgIUNDX0VESVRPUiAmJiAhQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvZHkuZ2V0QW5ndWxhclZlbG9jaXR5KG91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IHJvdGF0aW9uIHNwZWVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6+572u5peL6L2s6YCf5bqm44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEFuZ3VsYXJWZWxvY2l0eVxyXG4gICAgICogQHBhcmFtIHtWZWMzfSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEFuZ3VsYXJWZWxvY2l0eSAodmFsdWU6IGNjLlZlYzMpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXJ0T25sb2FkICYmICFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLl9ib2R5LnNldEFuZ3VsYXJWZWxvY2l0eSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9