
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/components/collider/collider-component.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Collider3D = void 0;

var _physicsMaterial = require("../../assets/physics-material");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

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
    property = _cc$_decorator.property;
var Vec3 = cc.Vec3;
/**
 * !#en
 * The base class of the collider.
 * !#zh
 * 碰撞器的基类。
 * @class Collider3D
 * @extends Component
 * @uses EventTarget
 */

var Collider3D = (_dec = ccclass('cc.Collider3D'), _dec2 = property({
  type: _physicsMaterial.PhysicsMaterial,
  displayName: 'Material',
  displayOrder: -1
}), _dec3 = property({
  displayOrder: 0
}), _dec4 = property({
  type: cc.Vec3,
  displayOrder: 1
}), _dec5 = property({
  type: _physicsMaterial.PhysicsMaterial
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_cc$Component) {
  _inheritsLoose(Collider3D, _cc$Component);

  function Collider3D() {
    var _this;

    _this = _cc$Component.call(this) || this;
    _this._shape = void 0;
    _this._isSharedMaterial = true;

    _initializerDefineProperty(_this, "_material", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_isTrigger", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_center", _descriptor3, _assertThisInitialized(_this));

    cc.EventTarget.call(_assertThisInitialized(_this));
    return _this;
  } /// EVENT INTERFACE ///

  /**
   * !#en
   * Register an callback of a specific event type on the EventTarget.
   * This type of event should be triggered via `emit`.
   * !#zh
   * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
   *
   * @method on
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   * The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {ITriggerEvent|ICollisionEvent} callback.event Callback function argument
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * eventTarget.on('fire', function (event) {
   *     // event is ITriggerEvent or ICollisionEvent
   * }, node);
   */


  var _proto = Collider3D.prototype;

  _proto.on = function on(type, callback, target, useCapture) {}
  /**
   * !#en
   * Removes the listeners previously registered with the same type, callback, target and or useCapture,
   * if only type is passed as parameter, all listeners registered with that type will be removed.
   * !#zh
   * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
   *
   * @method off
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed.
   * @example
   * // register fire eventListener
   * var callback = eventTarget.on('fire', function () {
   *     cc.log("fire in the hole");
   * }, target);
   * // remove fire event listener
   * eventTarget.off('fire', callback, target);
   * // remove all fire event listeners
   * eventTarget.off('fire');
   */
  ;

  _proto.off = function off(type, callback, target) {}
  /**
   * !#en
   * Register an callback of a specific event type on the EventTarget,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - The type of collider event can be `trigger-enter`, `trigger-stay`, `trigger-exit` or `collision-enter`, `collision-stay`, `collision-exit`.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   * The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {ITriggerEvent|ICollisionEvent} callback.event callback function argument.
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null.
   * @example
   * eventTarget.once('fire', function (event) {
   *     // event is ITriggerEvent or ICollisionEvent
   * }, node);
   */
  ;

  _proto.once = function once(type, callback, target) {}
  /* declare for typescript tip */
  ;

  _proto.emit = function emit(key) {} /// COMPONENT LIFECYCLE ///
  ;

  _proto.__preload = function __preload() {
    if (!CC_EDITOR) {
      this._shape.__preload(this);
    }
  };

  _proto.onLoad = function onLoad() {
    if (!CC_EDITOR) {
      if (!CC_PHYSICS_BUILTIN) {
        this.sharedMaterial = this._material == null ? cc.director.getPhysics3DManager().defaultMaterial : this._material;
      }

      this._shape.onLoad();
    }
  };

  _proto.onEnable = function onEnable() {
    if (!CC_EDITOR) {
      this._shape.onEnable();
    }
  };

  _proto.onDisable = function onDisable() {
    if (!CC_EDITOR) {
      this._shape.onDisable();
    }
  };

  _proto.onDestroy = function onDestroy() {
    if (!CC_EDITOR) {
      if (this._material) {
        this._material.off('physics_material_update', this._updateMaterial, this);
      }

      this._shape.onDestroy();
    }
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (!CC_EDITOR) {
      this._shape.material = this._material;
    }
  };

  _createClass(Collider3D, [{
    key: "sharedMaterial",
    get:
    /**
     * @property {PhysicsMaterial} sharedMaterial
     */
    function get() {
      return this._material;
    },
    set: function set(value) {
      this.material = value;
    }
  }, {
    key: "material",
    get: function get() {
      if (!CC_PHYSICS_BUILTIN) {
        if (this._isSharedMaterial && this._material != null) {
          this._material.off('physics_material_update', this._updateMaterial, this);

          this._material = this._material.clone();

          this._material.on('physics_material_update', this._updateMaterial, this);

          this._isSharedMaterial = false;
        }
      }

      return this._material;
    },
    set: function set(value) {
      if (CC_EDITOR || CC_PHYSICS_BUILTIN) {
        this._material = value;
        return;
      }

      if (value != null && this._material != null) {
        if (this._material._uuid != value._uuid) {
          this._material.off('physics_material_update', this._updateMaterial, this);

          value.on('physics_material_update', this._updateMaterial, this);
          this._isSharedMaterial = false;
          this._material = value;
        }
      } else if (value != null && this._material == null) {
        value.on('physics_material_update', this._updateMaterial, this);
        this._material = value;
      } else if (value == null && this._material != null) {
        this._material.off('physics_material_update', this._updateMaterial, this);

        this._material = value;
      }

      this._updateMaterial();
    }
    /**
     * !#en
     * get or set the collider is trigger, this will be always trigger if using builtin.
     * !#zh
     * 获取或设置碰撞器是否为触发器。
     * @property {Boolean} isTrigger
     */

  }, {
    key: "isTrigger",
    get: function get() {
      return this._isTrigger;
    },
    set: function set(value) {
      this._isTrigger = value;

      if (!CC_EDITOR) {
        this._shape.isTrigger = this._isTrigger;
      }
    }
    /**
     * !#en
     * get or set the center of the collider, in local space.
     * !#zh
     * 获取或设置碰撞器的中心点。
     * @property {Vec3} center
     */

  }, {
    key: "center",
    get: function get() {
      return this._center;
    },
    set: function set(value) {
      Vec3.copy(this._center, value);

      if (!CC_EDITOR) {
        this._shape.center = this._center;
      }
    }
    /**
     * !#en
     * get the collider attached rigidbody, this may be null.
     * !#zh
     * 获取碰撞器所绑定的刚体组件，可能为 null。
     * @property {RigidBody3D|null} attachedRigidbody
     * @readonly
     */

  }, {
    key: "attachedRigidbody",
    get: function get() {
      return this.shape.attachedRigidBody;
    }
    /**
     * !#en
     * get collider shape.
     * !#zh
     * 获取碰撞器形状。
     * @property {IBaseShape} shape
     * @readonly
     */

  }, {
    key: "shape",
    get: function get() {
      return this._shape;
    } /// PRIVATE PROPERTY ///

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

  return Collider3D;
}(cc.Component), _temp), (_applyDecoratedDescriptor(_class2.prototype, "sharedMaterial", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isTrigger", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "isTrigger"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "center", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "center"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_material", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isTrigger", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_center", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Vec3();
  }
})), _class2)) || _class);
exports.Collider3D = Collider3D;
cc.js.mixin(Collider3D.prototype, cc.EventTarget.prototype);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGNvbXBvbmVudHNcXGNvbGxpZGVyXFxjb2xsaWRlci1jb21wb25lbnQudHMiXSwibmFtZXMiOlsiY2MiLCJfZGVjb3JhdG9yIiwiY2NjbGFzcyIsInByb3BlcnR5IiwiVmVjMyIsIkNvbGxpZGVyM0QiLCJ0eXBlIiwiUGh5c2ljc01hdGVyaWFsIiwiZGlzcGxheU5hbWUiLCJkaXNwbGF5T3JkZXIiLCJfc2hhcGUiLCJfaXNTaGFyZWRNYXRlcmlhbCIsIkV2ZW50VGFyZ2V0IiwiY2FsbCIsIm9uIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJ1c2VDYXB0dXJlIiwib2ZmIiwib25jZSIsImVtaXQiLCJrZXkiLCJfX3ByZWxvYWQiLCJDQ19FRElUT1IiLCJvbkxvYWQiLCJDQ19QSFlTSUNTX0JVSUxUSU4iLCJzaGFyZWRNYXRlcmlhbCIsIl9tYXRlcmlhbCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsImRlZmF1bHRNYXRlcmlhbCIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwib25EZXN0cm95IiwiX3VwZGF0ZU1hdGVyaWFsIiwibWF0ZXJpYWwiLCJ2YWx1ZSIsImNsb25lIiwiX3V1aWQiLCJfaXNUcmlnZ2VyIiwiaXNUcmlnZ2VyIiwiX2NlbnRlciIsImNvcHkiLCJjZW50ZXIiLCJzaGFwZSIsImF0dGFjaGVkUmlnaWRCb2R5IiwiciIsIl9pc09uTG9hZENhbGxlZCIsImVycm9yIiwiQ29tcG9uZW50IiwianMiLCJtaXhpbiIsInByb3RvdHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRzRCQSxFQUFFLENBQUNDO0lBQXhCQyx5QkFBQUE7SUFBU0MsMEJBQUFBO0FBQ2hCLElBQU1DLElBQUksR0FBR0osRUFBRSxDQUFDSSxJQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQW9EO0FBQ2hELGFBQU8sS0FBS0csS0FBTCxDQUFXQyxpQkFBbEI7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUFvQjtBQUNoQixhQUFPLEtBQUtuQyxNQUFaO0FBQ0gsTUFFRDs7OztTQWVBLGVBQXdDO0FBQ3BDLFVBQU1vQyxDQUFDLEdBQUcsS0FBS0MsZUFBTCxJQUF3QixDQUFsQzs7QUFDQSxVQUFJRCxDQUFKLEVBQU87QUFBRTlDLFFBQUFBLEVBQUUsQ0FBQ2dELEtBQUgsQ0FBUywyRUFBVDtBQUF3Rjs7QUFDakcsYUFBTyxDQUFDRixDQUFSO0FBQ0g7Ozs7RUExSTJCOUMsRUFBRSxDQUFDaUQ7Ozs7O1dBOEhlOzsrRUFFN0M5Qzs7Ozs7V0FDK0I7OzRFQUUvQkE7Ozs7O1dBQ3FDLElBQUlDLElBQUo7Ozs7QUFzSTFDSixFQUFFLENBQUNrRCxFQUFILENBQU1DLEtBQU4sQ0FBWTlDLFVBQVUsQ0FBQytDLFNBQXZCLEVBQWtDcEQsRUFBRSxDQUFDWSxXQUFILENBQWV3QyxTQUFqRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCB7IENvbGxpc2lvbkNhbGxiYWNrLCBDb2xsaXNpb25FdmVudFR5cGUsIFRyaWdnZXJDYWxsYmFjaywgVHJpZ2dlckV2ZW50VHlwZSwgSUNvbGxpc2lvbkV2ZW50IH0gZnJvbSAnLi4vLi4vcGh5c2ljcy1pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBSaWdpZEJvZHkzRCB9IGZyb20gJy4uL3JpZ2lkLWJvZHktY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsIH0gZnJvbSAnLi4vLi4vYXNzZXRzL3BoeXNpY3MtbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBJQmFzZVNoYXBlIH0gZnJvbSAnLi4vLi4vLi4vc3BlYy9pLXBoeXNpY3Mtc2hhcGUnO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGJhc2UgY2xhc3Mgb2YgdGhlIGNvbGxpZGVyLlxyXG4gKiAhI3poXHJcbiAqIOeisOaSnuWZqOeahOWfuuexu+OAglxyXG4gKiBAY2xhc3MgQ29sbGlkZXIzRFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICogQHVzZXMgRXZlbnRUYXJnZXRcclxuICovXHJcbkBjY2NsYXNzKCdjYy5Db2xsaWRlcjNEJylcclxuZXhwb3J0IGNsYXNzIENvbGxpZGVyM0QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtQaHlzaWNzTWF0ZXJpYWx9IHNoYXJlZE1hdGVyaWFsXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogUGh5c2ljc01hdGVyaWFsLFxyXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnTWF0ZXJpYWwnLFxyXG4gICAgICAgIGRpc3BsYXlPcmRlcjogLTFcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgZ2V0IHNoYXJlZE1hdGVyaWFsICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBzaGFyZWRNYXRlcmlhbCAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1hdGVyaWFsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2hhcmVkTWF0ZXJpYWwgJiYgdGhpcy5fbWF0ZXJpYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwub2ZmKCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScsIHRoaXMuX3VwZGF0ZU1hdGVyaWFsLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLm9uKCdwaHlzaWNzX21hdGVyaWFsX3VwZGF0ZScsIHRoaXMuX3VwZGF0ZU1hdGVyaWFsLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2hhcmVkTWF0ZXJpYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBtYXRlcmlhbCAodmFsdWUpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1BIWVNJQ1NfQlVJTFRJTikgeyBcclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSB2YWx1ZTsgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdGhpcy5fbWF0ZXJpYWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWF0ZXJpYWwuX3V1aWQgIT0gdmFsdWUuX3V1aWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLm9mZigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5vbigncGh5c2ljc19tYXRlcmlhbF91cGRhdGUnLCB0aGlzLl91cGRhdGVNYXRlcmlhbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1NoYXJlZE1hdGVyaWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsICYmIHRoaXMuX21hdGVyaWFsID09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFsdWUub24oJ3BoeXNpY3NfbWF0ZXJpYWxfdXBkYXRlJywgdGhpcy5fdXBkYXRlTWF0ZXJpYWwsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCAmJiB0aGlzLl9tYXRlcmlhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsIS5vZmYoJ3BoeXNpY3NfbWF0ZXJpYWxfdXBkYXRlJywgdGhpcy5fdXBkYXRlTWF0ZXJpYWwsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogZ2V0IG9yIHNldCB0aGUgY29sbGlkZXIgaXMgdHJpZ2dlciwgdGhpcyB3aWxsIGJlIGFsd2F5cyB0cmlnZ2VyIGlmIHVzaW5nIGJ1aWx0aW4uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bmiJborr7nva7norDmkp7lmajmmK/lkKbkuLrop6blj5HlmajjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNUcmlnZ2VyXHJcbiAgICAgKi9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgZGlzcGxheU9yZGVyOiAwXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCBpc1RyaWdnZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1RyaWdnZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc1RyaWdnZXIgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXNUcmlnZ2VyID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhcGUuaXNUcmlnZ2VyID0gdGhpcy5faXNUcmlnZ2VyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGdldCBvciBzZXQgdGhlIGNlbnRlciBvZiB0aGUgY29sbGlkZXIsIGluIGxvY2FsIHNwYWNlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5oiW6K6+572u56Kw5pKe5Zmo55qE5Lit5b+D54K544CCXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNlbnRlclxyXG4gICAgICovXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLlZlYzMsXHJcbiAgICAgICAgZGlzcGxheU9yZGVyOiAxXHJcbiAgICB9KVxyXG4gICAgcHVibGljIGdldCBjZW50ZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjZW50ZXIgKHZhbHVlOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2NlbnRlciwgdmFsdWUpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLmNlbnRlciA9IHRoaXMuX2NlbnRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBnZXQgdGhlIGNvbGxpZGVyIGF0dGFjaGVkIHJpZ2lkYm9keSwgdGhpcyBtYXkgYmUgbnVsbC5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPlueisOaSnuWZqOaJgOe7keWumueahOWImuS9k+e7hOS7tu+8jOWPr+iDveS4uiBudWxs44CCXHJcbiAgICAgKiBAcHJvcGVydHkge1JpZ2lkQm9keTNEfG51bGx9IGF0dGFjaGVkUmlnaWRib2R5XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBhdHRhY2hlZFJpZ2lkYm9keSAoKTogUmlnaWRCb2R5M0QgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFwZS5hdHRhY2hlZFJpZ2lkQm9keTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGdldCBjb2xsaWRlciBzaGFwZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPlueisOaSnuWZqOW9oueKtuOAglxyXG4gICAgICogQHByb3BlcnR5IHtJQmFzZVNoYXBlfSBzaGFwZVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgc2hhcGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFwZTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8gUFJJVkFURSBQUk9QRVJUWSAvLy9cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3NoYXBlITogSUJhc2VTaGFwZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2lzU2hhcmVkTWF0ZXJpYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFBoeXNpY3NNYXRlcmlhbCB9KVxyXG4gICAgcHJvdGVjdGVkIF9tYXRlcmlhbDogUGh5c2ljc01hdGVyaWFsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcm90ZWN0ZWQgX2lzVHJpZ2dlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9jZW50ZXI6IGNjLlZlYzMgPSBuZXcgVmVjMygpO1xyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgX2Fzc2VydE9ubG9hZCAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgciA9IHRoaXMuX2lzT25Mb2FkQ2FsbGVkID09IDA7XHJcbiAgICAgICAgaWYgKHIpIHsgY2MuZXJyb3IoJ1BoeXNpY3MgRXJyb3I6IFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbm9kZSBoYXMgYmVlbiBhZGRlZCB0byB0aGUgc2NlbmUnKTsgfVxyXG4gICAgICAgIHJldHVybiAhcjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IgKCkgeyBcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgY2MuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8gRVZFTlQgSU5URVJGQUNFIC8vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldC5cclxuICAgICAqIFRoaXMgdHlwZSBvZiBldmVudCBzaG91bGQgYmUgdHJpZ2dlcmVkIHZpYSBgZW1pdGAuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDms6jlhozkuovku7bnm67moIfnmoTnibnlrprkuovku7bnsbvlnovlm57osIPjgILov5nnp43nsbvlnovnmoTkuovku7blupTor6XooqsgYGVtaXRgIOinpuWPkeOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2Qgb25cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgY29sbGlkZXIgZXZlbnQgY2FuIGJlIGB0cmlnZ2VyLWVudGVyYCwgYHRyaWdnZXItc3RheWAsIGB0cmlnZ2VyLWV4aXRgIG9yIGBjb2xsaXNpb24tZW50ZXJgLCBgY29sbGlzaW9uLXN0YXlgLCBgY29sbGlzaW9uLWV4aXRgLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gICAgICogQHBhcmFtIHtJVHJpZ2dlckV2ZW50fElDb2xsaXNpb25FdmVudH0gY2FsbGJhY2suZXZlbnQgQ2FsbGJhY2sgZnVuY3Rpb24gYXJndW1lbnRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbC5cclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIEp1c3QgcmV0dXJucyB0aGUgaW5jb21pbmcgY2FsbGJhY2sgc28geW91IGNhbiBzYXZlIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24gZWFzaWVyLlxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIG9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IFRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBldmVudFRhcmdldC5vbignZmlyZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICogICAgIC8vIGV2ZW50IGlzIElUcmlnZ2VyRXZlbnQgb3IgSUNvbGxpc2lvbkV2ZW50XHJcbiAgICAgKiB9LCBub2RlKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uICh0eXBlOiBUcmlnZ2VyRXZlbnRUeXBlIHwgQ29sbGlzaW9uRXZlbnRUeXBlLCBjYWxsYmFjazogVHJpZ2dlckNhbGxiYWNrIHwgQ29sbGlzaW9uQ2FsbGJhY2ssIHRhcmdldD86IE9iamVjdCwgdXNlQ2FwdHVyZT86IGFueSk6IGFueSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lcnMgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCBhbmQgb3IgdXNlQ2FwdHVyZSxcclxuICAgICAqIGlmIG9ubHkgdHlwZSBpcyBwYXNzZWQgYXMgcGFyYW1ldGVyLCBhbGwgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgd2l0aCB0aGF0IHR5cGUgd2lsbCBiZSByZW1vdmVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Yig6Zmk5LmL5YmN55So5ZCM57G75Z6L77yM5Zue6LCD77yM55uu5qCH5oiWIHVzZUNhcHR1cmUg5rOo5YaM55qE5LqL5Lu255uR5ZCs5Zmo77yM5aaC5p6c5Y+q5Lyg6YCSIHR5cGXvvIzlsIbkvJrliKDpmaQgdHlwZSDnsbvlnovnmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIG9mZlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBjb2xsaWRlciBldmVudCBjYW4gYmUgYHRyaWdnZXItZW50ZXJgLCBgdHJpZ2dlci1zdGF5YCwgYHRyaWdnZXItZXhpdGAgb3IgYGNvbGxpc2lvbi1lbnRlcmAsIGBjb2xsaXNpb24tc3RheWAsIGBjb2xsaXNpb24tZXhpdGAuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBpZiBpdCdzIG5vdCBnaXZlbiwgb25seSBjYWxsYmFjayB3aXRob3V0IHRhcmdldCB3aWxsIGJlIHJlbW92ZWQuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gcmVnaXN0ZXIgZmlyZSBldmVudExpc3RlbmVyXHJcbiAgICAgKiB2YXIgY2FsbGJhY2sgPSBldmVudFRhcmdldC5vbignZmlyZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAqICAgICBjYy5sb2coXCJmaXJlIGluIHRoZSBob2xlXCIpO1xyXG4gICAgICogfSwgdGFyZ2V0KTtcclxuICAgICAqIC8vIHJlbW92ZSBmaXJlIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgKiBldmVudFRhcmdldC5vZmYoJ2ZpcmUnLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgICAqIC8vIHJlbW92ZSBhbGwgZmlyZSBldmVudCBsaXN0ZW5lcnNcclxuICAgICAqIGV2ZW50VGFyZ2V0Lm9mZignZmlyZScpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2ZmICh0eXBlOiBUcmlnZ2VyRXZlbnRUeXBlIHwgQ29sbGlzaW9uRXZlbnRUeXBlLCBjYWxsYmFjazogVHJpZ2dlckNhbGxiYWNrIHwgQ29sbGlzaW9uQ2FsbGJhY2ssIHRhcmdldD86IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldCxcclxuICAgICAqIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5rOo5YaM5LqL5Lu255uu5qCH55qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD77yM5Zue6LCD5Lya5Zyo56ys5LiA5pe26Ze06KKr6Kem5Y+R5ZCO5Yig6Zmk6Ieq6Lqr44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBvbmNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGNvbGxpZGVyIGV2ZW50IGNhbiBiZSBgdHJpZ2dlci1lbnRlcmAsIGB0cmlnZ2VyLXN0YXlgLCBgdHJpZ2dlci1leGl0YCBvciBgY29sbGlzaW9uLWVudGVyYCwgYGNvbGxpc2lvbi1zdGF5YCwgYGNvbGxpc2lvbi1leGl0YC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKiBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICAgICAqIEBwYXJhbSB7SVRyaWdnZXJFdmVudHxJQ29sbGlzaW9uRXZlbnR9IGNhbGxiYWNrLmV2ZW50IGNhbGxiYWNrIGZ1bmN0aW9uIGFyZ3VtZW50LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGV2ZW50VGFyZ2V0Lm9uY2UoJ2ZpcmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAqICAgICAvLyBldmVudCBpcyBJVHJpZ2dlckV2ZW50IG9yIElDb2xsaXNpb25FdmVudFxyXG4gICAgICogfSwgbm9kZSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbmNlICh0eXBlOiBUcmlnZ2VyRXZlbnRUeXBlIHwgQ29sbGlzaW9uRXZlbnRUeXBlLCBjYWxsYmFjazogVHJpZ2dlckNhbGxiYWNrIHwgQ29sbGlzaW9uQ2FsbGJhY2ssIHRhcmdldD86IE9iamVjdCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGRlY2xhcmUgZm9yIHR5cGVzY3JpcHQgdGlwICovXHJcbiAgICBwdWJsaWMgZW1pdCAoa2V5OiBUcmlnZ2VyRXZlbnRUeXBlIHwgQ29sbGlzaW9uRXZlbnRUeXBlLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIC8vLyBDT01QT05FTlQgTElGRUNZQ0xFIC8vL1xyXG5cclxuICAgIHByb3RlY3RlZCBfX3ByZWxvYWQgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLl9fcHJlbG9hZCEodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIGlmICghQ0NfUEhZU0lDU19CVUlMVElOKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWwgPT0gbnVsbCA/IGNjLmRpcmVjdG9yLmdldFBoeXNpY3MzRE1hbmFnZXIoKS5kZWZhdWx0TWF0ZXJpYWwgOiB0aGlzLl9tYXRlcmlhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zaGFwZS5vbkxvYWQhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhcGUub25FbmFibGUhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLm9uRGlzYWJsZSEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbC5vZmYoJ3BoeXNpY3NfbWF0ZXJpYWxfdXBkYXRlJywgdGhpcy5fdXBkYXRlTWF0ZXJpYWwsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLm9uRGVzdHJveSEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdXBkYXRlTWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlLm1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2MuanMubWl4aW4oQ29sbGlkZXIzRC5wcm90b3R5cGUsIGNjLkV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7Il0sInNvdXJjZVJvb3QiOiIvIn0=