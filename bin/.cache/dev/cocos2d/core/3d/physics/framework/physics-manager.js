
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Physics3DManager = void 0;

var _instance = require("./instance");

var _physicsMaterial = require("./assets/physics-material");

var _physicsRayResult = require("./physics-ray-result");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _cc$_decorator = cc._decorator,
    property = _cc$_decorator.property,
    ccclass = _cc$_decorator.ccclass;
/**
 * !#en
 * Physical systems manager.
 * !#zh
 * 物理系统管理器。
 * @class Physics3DManager
 */

var Physics3DManager = (_dec = ccclass("cc.Physics3DManager"), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function Physics3DManager() {
    this.physicsWorld = void 0;
    this.raycastClosestResult = new _physicsRayResult.PhysicsRayResult();
    this.raycastResults = [];

    _initializerDefineProperty(this, "_enabled", _descriptor, this);

    _initializerDefineProperty(this, "_allowSleep", _descriptor2, this);

    _initializerDefineProperty(this, "_gravity", _descriptor3, this);

    _initializerDefineProperty(this, "_maxSubStep", _descriptor4, this);

    _initializerDefineProperty(this, "_fixedTime", _descriptor5, this);

    _initializerDefineProperty(this, "_useFixedTime", _descriptor6, this);

    this.useAccumulator = false;
    this._accumulator = 0;
    this.useFixedDigit = false;
    this.useInternalTime = false;
    this.fixDigits = {
      position: 5,
      rotation: 12,
      timeNow: 3
    };
    this._deltaTime = 0;
    this._lastTime = 0;
    this._material = null;
    this.raycastOptions = {
      'groupIndex': -1,
      'queryTrigger': true,
      'maxDistance': Infinity
    };
    this.raycastResultPool = new cc.RecyclePool(function () {
      return new _physicsRayResult.PhysicsRayResult();
    }, 1);
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    this.physicsWorld = (0, _instance.createPhysicsWorld)();
    this._lastTime = performance.now();

    if (!CC_PHYSICS_BUILTIN) {
      this.gravity = this._gravity;
      this.allowSleep = this._allowSleep;
      this._material = new _physicsMaterial.PhysicsMaterial();
      this._material.friction = 0.1;
      this._material.restitution = 0.1;

      this._material.on('physics_material_update', this._updateMaterial, this);

      this.physicsWorld.defaultMaterial = this._material;
    }
  }
  /**
   * !#en
   * A physical system simulation is performed once and will now be performed automatically once per frame.
   * !#zh
   * 执行一次物理系统的模拟，目前将在每帧自动执行一次。
   * @method update
   * @param {number} deltaTime The time difference from the last execution is currently elapsed per frame
   */


  var _proto = Physics3DManager.prototype;

  _proto.update = function update(deltaTime) {
    if (CC_EDITOR) {
      return;
    }

    if (!this._enabled) {
      return;
    }

    if (this.useInternalTime) {
      var now = parseFloat(performance.now().toFixed(this.fixDigits.timeNow));
      this._deltaTime = now > this._lastTime ? (now - this._lastTime) / 1000 : 0;
      this._lastTime = now;
    } else {
      this._deltaTime = deltaTime;
    }

    cc.director.emit(cc.Director.EVENT_BEFORE_PHYSICS);

    if (CC_PHYSICS_BUILTIN) {
      this.physicsWorld.step(this._fixedTime);
    } else {
      if (this._useFixedTime) {
        this.physicsWorld.step(this._fixedTime);
      } else {
        if (this.useAccumulator) {
          var i = 0;
          this._accumulator += this._deltaTime;

          while (i < this._maxSubStep && this._accumulator > this._fixedTime) {
            this.physicsWorld.step(this._fixedTime);
            this._accumulator -= this._fixedTime;
            i++;
          }
        } else {
          this.physicsWorld.step(this._fixedTime, this._deltaTime, this._maxSubStep);
        }
      }
    }

    cc.director.emit(cc.Director.EVENT_AFTER_PHYSICS);
  }
  /**
   * !#en Detect all collision boxes and return all detected results, or null if none is detected. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
   * !#zh 检测所有的碰撞盒，并返回所有被检测到的结果，若没有检测到，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
   * @method raycast
   * @param {Ray} worldRay A ray in world space
   * @param {number|string} groupIndexOrName Collision group index or group name
   * @param {number} maxDistance Maximum detection distance
   * @param {boolean} queryTrigger Detect trigger or not
   * @return {PhysicsRayResult[] | null} Detected result
   */
  ;

  _proto.raycast = function raycast(worldRay, groupIndexOrName, maxDistance, queryTrigger) {
    if (groupIndexOrName === void 0) {
      groupIndexOrName = 0;
    }

    if (maxDistance === void 0) {
      maxDistance = Infinity;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    this.raycastResultPool.reset();
    this.raycastResults.length = 0;

    if (typeof groupIndexOrName == "string") {
      var groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
      if (groupIndex == -1) groupIndex = 0;
      this.raycastOptions.groupIndex = groupIndex;
    } else {
      this.raycastOptions.groupIndex = groupIndexOrName;
    }

    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    var result = this.physicsWorld.raycast(worldRay, this.raycastOptions, this.raycastResultPool, this.raycastResults);
    if (result) return this.raycastResults;
    return null;
  }
  /**
   * !#en Detect all collision boxes and return the detection result with the shortest ray distance. If not, return null value. Note that the return value is taken from the object pool, so do not save the result reference or modify the result.
   * !#zh 检测所有的碰撞盒，并返回射线距离最短的检测结果，若没有，则返回空值。注意返回值是从对象池中取的，所以请不要保存结果引用或者修改结果。
   * @method raycastClosest
   * @param {Ray} worldRay A ray in world space
   * @param {number|string} groupIndexOrName Collision group index or group name
   * @param {number} maxDistance Maximum detection distance
   * @param {boolean} queryTrigger Detect trigger or not
   * @return {PhysicsRayResult|null} Detected result
   */
  ;

  _proto.raycastClosest = function raycastClosest(worldRay, groupIndexOrName, maxDistance, queryTrigger) {
    if (groupIndexOrName === void 0) {
      groupIndexOrName = 0;
    }

    if (maxDistance === void 0) {
      maxDistance = Infinity;
    }

    if (queryTrigger === void 0) {
      queryTrigger = true;
    }

    if (typeof groupIndexOrName == "string") {
      var groupIndex = cc.game.groupList.indexOf(groupIndexOrName);
      if (groupIndex == -1) groupIndex = 0;
      this.raycastOptions.groupIndex = groupIndex;
    } else {
      this.raycastOptions.groupIndex = groupIndexOrName;
    }

    this.raycastOptions.maxDistance = maxDistance;
    this.raycastOptions.queryTrigger = queryTrigger;
    var result = this.physicsWorld.raycastClosest(worldRay, this.raycastOptions, this.raycastClosestResult);
    if (result) return this.raycastClosestResult;
    return null;
  };

  _proto._updateMaterial = function _updateMaterial() {
    if (!CC_PHYSICS_BUILTIN) {
      this.physicsWorld.defaultMaterial = this._material;
    }
  };

  _createClass(Physics3DManager, [{
    key: "enabled",
    get:
    /**
     * !#en
     * Whether to enable the physics system, default is false.
     * !#zh
     * 是否启用物理系统，默认不启用。
     * @property {boolean} enabled
     */
    function get() {
      return this._enabled;
    },
    set: function set(value) {
      this._enabled = value;
    }
    /**
     * !#en
     * Whether to allow the physics system to automatically hibernate, default is true.
     * !#zh
     * 物理系统是否允许自动休眠，默认为 true。
     * @property {boolean} allowSleep
     */

  }, {
    key: "allowSleep",
    get: function get() {
      return this._allowSleep;
    },
    set: function set(v) {
      this._allowSleep = v;

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this.physicsWorld.allowSleep = this._allowSleep;
      }
    }
    /**
     * !#en
     * The maximum number of sub-steps a full step is permitted to be broken into, default is 2.
     * !#zh
     * 物理每帧模拟的最大子步数，默认为 2。
     * @property {number} maxSubStep
     */

  }, {
    key: "maxSubStep",
    get: function get() {
      return this._maxSubStep;
    },
    set: function set(value) {
      this._maxSubStep = value;
    }
    /**
     * !#en
     * Time spent in each simulation of physics, default is 1/60s.
     * !#zh
     * 物理每步模拟消耗的固定时间，默认为 1/60 秒。
     * @property {number} deltaTime
     */

  }, {
    key: "deltaTime",
    get: function get() {
      return this._fixedTime;
    },
    set: function set(value) {
      this._fixedTime = value;
    }
    /**
     * !#en
     * Whether to use a fixed time step.
     * !#zh
     * 是否使用固定的时间步长。
     * @property {boolean} useFixedTime
     */

  }, {
    key: "useFixedTime",
    get: function get() {
      return this._useFixedTime;
    },
    set: function set(value) {
      this._useFixedTime = value;
    }
    /**
     * !#en
     * Gravity value of the physics simulation, default is (0, -10, 0).
     * !#zh
     * 物理世界的重力数值，默认为 (0, -10, 0)。
     * @property {Vec3} gravity
     */

  }, {
    key: "gravity",
    get: function get() {
      return this._gravity;
    },
    set: function set(gravity) {
      this._gravity.set(gravity);

      if (!CC_EDITOR && !CC_PHYSICS_BUILTIN) {
        this.physicsWorld.gravity = gravity;
      }
    }
    /**
     * !#en
     * Gets the global default physical material. Note that builtin is null.
     * !#zh
     * 获取全局的默认物理材质，注意：builtin 时为 null。
     * @property {PhysicsMaterial | null} defaultMaterial
     * @readonly
     */

  }, {
    key: "defaultMaterial",
    get: function get() {
      return this._material;
    }
  }]);

  return Physics3DManager;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enabled", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_allowSleep", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_gravity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new cc.Vec3(0, -10, 0);
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_maxSubStep", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_fixedTime", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0 / 60.0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_useFixedTime", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2)) || _class);
exports.Physics3DManager = Physics3DManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXHBoeXNpY3MtbWFuYWdlci50cyJdLCJuYW1lcyI6WyJjYyIsIl9kZWNvcmF0b3IiLCJwcm9wZXJ0eSIsImNjY2xhc3MiLCJQaHlzaWNzM0RNYW5hZ2VyIiwicGh5c2ljc1dvcmxkIiwicmF5Y2FzdENsb3Nlc3RSZXN1bHQiLCJQaHlzaWNzUmF5UmVzdWx0IiwicmF5Y2FzdFJlc3VsdHMiLCJ1c2VBY2N1bXVsYXRvciIsIl9hY2N1bXVsYXRvciIsInVzZUZpeGVkRGlnaXQiLCJ1c2VJbnRlcm5hbFRpbWUiLCJmaXhEaWdpdHMiLCJwb3NpdGlvbiIsInJvdGF0aW9uIiwidGltZU5vdyIsIl9kZWx0YVRpbWUiLCJfbGFzdFRpbWUiLCJfbWF0ZXJpYWwiLCJyYXljYXN0T3B0aW9ucyIsIkluZmluaXR5IiwicmF5Y2FzdFJlc3VsdFBvb2wiLCJSZWN5Y2xlUG9vbCIsImRpcmVjdG9yIiwiX3NjaGVkdWxlciIsImVuYWJsZUZvclRhcmdldCIsInBlcmZvcm1hbmNlIiwibm93IiwiQ0NfUEhZU0lDU19CVUlMVElOIiwiZ3Jhdml0eSIsIl9ncmF2aXR5IiwiYWxsb3dTbGVlcCIsIl9hbGxvd1NsZWVwIiwiUGh5c2ljc01hdGVyaWFsIiwiZnJpY3Rpb24iLCJyZXN0aXR1dGlvbiIsIm9uIiwiX3VwZGF0ZU1hdGVyaWFsIiwiZGVmYXVsdE1hdGVyaWFsIiwidXBkYXRlIiwiZGVsdGFUaW1lIiwiQ0NfRURJVE9SIiwiX2VuYWJsZWQiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImVtaXQiLCJEaXJlY3RvciIsIkVWRU5UX0JFRk9SRV9QSFlTSUNTIiwic3RlcCIsIl9maXhlZFRpbWUiLCJfdXNlRml4ZWRUaW1lIiwiaSIsIl9tYXhTdWJTdGVwIiwiRVZFTlRfQUZURVJfUEhZU0lDUyIsInJheWNhc3QiLCJ3b3JsZFJheSIsImdyb3VwSW5kZXhPck5hbWUiLCJtYXhEaXN0YW5jZSIsInF1ZXJ5VHJpZ2dlciIsInJlc2V0IiwibGVuZ3RoIiwiZ3JvdXBJbmRleCIsImdhbWUiLCJncm91cExpc3QiLCJpbmRleE9mIiwicmVzdWx0IiwicmF5Y2FzdENsb3Nlc3QiLCJ2YWx1ZSIsInYiLCJzZXQiLCJWZWMzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztxQkFFOEJBLEVBQUUsQ0FBQ0M7SUFBekJDLDBCQUFBQTtJQUFVQyx5QkFBQUE7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRWFDLDJCQURaRCxPQUFPLENBQUMscUJBQUQ7QUF3SkosOEJBQXVCO0FBQUEsU0EvQ2RFLFlBK0NjO0FBQUEsU0E5Q2RDLG9CQThDYyxHQTlDUyxJQUFJQyxrQ0FBSixFQThDVDtBQUFBLFNBN0NkQyxjQTZDYyxHQTdDdUIsRUE2Q3ZCOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLFNBekJ2QkMsY0F5QnVCLEdBekJOLEtBeUJNO0FBQUEsU0F4QmZDLFlBd0JlLEdBeEJBLENBd0JBO0FBQUEsU0F0QnZCQyxhQXNCdUIsR0F0QlAsS0FzQk87QUFBQSxTQXJCdkJDLGVBcUJ1QixHQXJCTCxLQXFCSztBQUFBLFNBbkJkQyxTQW1CYyxHQW5CRjtBQUNqQkMsTUFBQUEsUUFBUSxFQUFFLENBRE87QUFFakJDLE1BQUFBLFFBQVEsRUFBRSxFQUZPO0FBR2pCQyxNQUFBQSxPQUFPLEVBQUU7QUFIUSxLQW1CRTtBQUFBLFNBZGZDLFVBY2UsR0FkRixDQWNFO0FBQUEsU0FiZkMsU0FhZSxHQWJILENBYUc7QUFBQSxTQVpOQyxTQVlNLEdBWmlDLElBWWpDO0FBQUEsU0FWTkMsY0FVTSxHQVY0QjtBQUMvQyxvQkFBYyxDQUFDLENBRGdDO0FBRS9DLHNCQUFnQixJQUYrQjtBQUcvQyxxQkFBZUM7QUFIZ0MsS0FVNUI7QUFBQSxTQUpOQyxpQkFJTSxHQUpjLElBQUl0QixFQUFFLENBQUN1QixXQUFQLENBQW1C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QTtBQUNBO0FBQ0E7Ozs7U0FDSSxlQUF3QjtBQUNwQixhQUFPLEtBQUtyQyxRQUFaO0FBQ0g7U0FDRCxhQUFhRCxPQUFiLEVBQStCO0FBQzNCLFdBQUtDLFFBQUwsQ0FBY3VDLEdBQWQsQ0FBa0J4QyxPQUFsQjs7QUFDQSxVQUFJLENBQUNZLFNBQUQsSUFBYyxDQUFDYixrQkFBbkIsRUFBdUM7QUFDbkMsYUFBS3hCLFlBQUwsQ0FBa0J5QixPQUFsQixHQUE0QkEsT0FBNUI7QUFDSDtBQUNKO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztTQUNJLGVBQStDO0FBQzNDLGFBQU8sS0FBS1gsU0FBWjtBQUNIOzs7O3NGQU1BakI7Ozs7O1dBQ2tCOztnRkFFbEJBOzs7OztXQUNxQjs7NkVBRXJCQTs7Ozs7V0FDMkIsSUFBSUYsRUFBRSxDQUFDdUUsSUFBUCxDQUFZLENBQVosRUFBZSxDQUFDLEVBQWhCLEVBQW9CLENBQXBCOztnRkFFM0JyRTs7Ozs7V0FDcUI7OytFQUVyQkE7Ozs7O1dBQ29CLE1BQU07O2tGQUUxQkE7Ozs7O1dBQ3VCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgSVBoeXNpY3NXb3JsZCwgSVJheWNhc3RPcHRpb25zIH0gZnJvbSAnLi4vc3BlYy9pLXBoeXNpY3Mtd29ybGQnO1xyXG5pbXBvcnQgeyBjcmVhdGVQaHlzaWNzV29ybGQgfSBmcm9tICcuL2luc3RhbmNlJztcclxuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsIH0gZnJvbSAnLi9hc3NldHMvcGh5c2ljcy1tYXRlcmlhbCc7XHJcbmltcG9ydCB7IFBoeXNpY3NSYXlSZXN1bHQgfSBmcm9tICcuL3BoeXNpY3MtcmF5LXJlc3VsdCc7XHJcblxyXG5jb25zdCB7IHByb3BlcnR5LCBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogUGh5c2ljYWwgc3lzdGVtcyBtYW5hZ2VyLlxyXG4gKiAhI3poXHJcbiAqIOeJqeeQhuezu+e7n+euoeeQhuWZqOOAglxyXG4gKiBAY2xhc3MgUGh5c2ljczNETWFuYWdlclxyXG4gKi9cclxuQGNjY2xhc3MoXCJjYy5QaHlzaWNzM0RNYW5hZ2VyXCIpXHJcbmV4cG9ydCBjbGFzcyBQaHlzaWNzM0RNYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgdG8gZW5hYmxlIHRoZSBwaHlzaWNzIHN5c3RlbSwgZGVmYXVsdCBpcyBmYWxzZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaYr+WQpuWQr+eUqOeJqeeQhuezu+e7n++8jOm7mOiupOS4jeWQr+eUqOOAglxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIGdldCBlbmFibGVkICgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcclxuICAgIH1cclxuICAgIHNldCBlbmFibGVkICh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgdG8gYWxsb3cgdGhlIHBoeXNpY3Mgc3lzdGVtIHRvIGF1dG9tYXRpY2FsbHkgaGliZXJuYXRlLCBkZWZhdWx0IGlzIHRydWUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDniannkIbns7vnu5/mmK/lkKblhYHorrjoh6rliqjkvJHnnKDvvIzpu5jorqTkuLogdHJ1ZeOAglxyXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd1NsZWVwXHJcbiAgICAgKi9cclxuICAgIGdldCBhbGxvd1NsZWVwICgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWxsb3dTbGVlcDtcclxuICAgIH1cclxuICAgIHNldCBhbGxvd1NsZWVwICh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fYWxsb3dTbGVlcCA9IHY7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3NXb3JsZC5hbGxvd1NsZWVwID0gdGhpcy5fYWxsb3dTbGVlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc3ViLXN0ZXBzIGEgZnVsbCBzdGVwIGlzIHBlcm1pdHRlZCB0byBiZSBicm9rZW4gaW50bywgZGVmYXVsdCBpcyAyLlxyXG4gICAgICogISN6aFxyXG4gICAgICog54mp55CG5q+P5bin5qih5ouf55qE5pyA5aSn5a2Q5q2l5pWw77yM6buY6K6k5Li6IDLjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXhTdWJTdGVwXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhTdWJTdGVwICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhTdWJTdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0IG1heFN1YlN0ZXAgKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9tYXhTdWJTdGVwID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaW1lIHNwZW50IGluIGVhY2ggc2ltdWxhdGlvbiBvZiBwaHlzaWNzLCBkZWZhdWx0IGlzIDEvNjBzLlxyXG4gICAgICogISN6aFxyXG4gICAgICog54mp55CG5q+P5q2l5qih5ouf5raI6ICX55qE5Zu65a6a5pe26Ze077yM6buY6K6k5Li6IDEvNjAg56eS44CCXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gZGVsdGFUaW1lXHJcbiAgICAgKi9cclxuICAgIGdldCBkZWx0YVRpbWUgKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeGVkVGltZTtcclxuICAgIH1cclxuICAgIHNldCBkZWx0YVRpbWUgKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9maXhlZFRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGEgZml4ZWQgdGltZSBzdGVwLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5L2/55So5Zu65a6a55qE5pe26Ze05q2l6ZW/44CCXHJcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHVzZUZpeGVkVGltZVxyXG4gICAgICovXHJcbiAgICBnZXQgdXNlRml4ZWRUaW1lICgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlRml4ZWRUaW1lO1xyXG4gICAgfVxyXG4gICAgc2V0IHVzZUZpeGVkVGltZSAodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl91c2VGaXhlZFRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdyYXZpdHkgdmFsdWUgb2YgdGhlIHBoeXNpY3Mgc2ltdWxhdGlvbiwgZGVmYXVsdCBpcyAoMCwgLTEwLCAwKS5cclxuICAgICAqICEjemhcclxuICAgICAqIOeJqeeQhuS4lueVjOeahOmHjeWKm+aVsOWAvO+8jOm7mOiupOS4uiAoMCwgLTEwLCAwKeOAglxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBncmF2aXR5XHJcbiAgICAgKi9cclxuICAgIGdldCBncmF2aXR5ICgpOiBjYy5WZWMzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ3Jhdml0eTtcclxuICAgIH1cclxuICAgIHNldCBncmF2aXR5IChncmF2aXR5OiBjYy5WZWMzKSB7XHJcbiAgICAgICAgdGhpcy5fZ3Jhdml0eS5zZXQoZ3Jhdml0eSk7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3NXb3JsZC5ncmF2aXR5ID0gZ3Jhdml0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXRzIHRoZSBnbG9iYWwgZGVmYXVsdCBwaHlzaWNhbCBtYXRlcmlhbC4gTm90ZSB0aGF0IGJ1aWx0aW4gaXMgbnVsbC5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluWFqOWxgOeahOm7mOiupOeJqeeQhuadkOi0qO+8jOazqOaEj++8mmJ1aWx0aW4g5pe25Li6IG51bGzjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7UGh5c2ljc01hdGVyaWFsIHwgbnVsbH0gZGVmYXVsdE1hdGVyaWFsXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZ2V0IGRlZmF1bHRNYXRlcmlhbCAoKTogUGh5c2ljc01hdGVyaWFsIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlYWRvbmx5IHBoeXNpY3NXb3JsZDogSVBoeXNpY3NXb3JsZDtcclxuICAgIHJlYWRvbmx5IHJheWNhc3RDbG9zZXN0UmVzdWx0ID0gbmV3IFBoeXNpY3NSYXlSZXN1bHQoKTtcclxuICAgIHJlYWRvbmx5IHJheWNhc3RSZXN1bHRzOiBQaHlzaWNzUmF5UmVzdWx0W10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2VuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2FsbG93U2xlZXAgPSB0cnVlO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZ3Jhdml0eSA9IG5ldyBjYy5WZWMzKDAsIC0xMCwgMCk7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF9tYXhTdWJTdGVwID0gMTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgX2ZpeGVkVGltZSA9IDEuMCAvIDYwLjA7XHJcblxyXG4gICAgQHByb3BlcnR5XHJcbiAgICBwcml2YXRlIF91c2VGaXhlZFRpbWUgPSB0cnVlO1xyXG5cclxuICAgIHVzZUFjY3VtdWxhdG9yID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9hY2N1bXVsYXRvciA9IDA7XHJcblxyXG4gICAgdXNlRml4ZWREaWdpdCA9IGZhbHNlO1xyXG4gICAgdXNlSW50ZXJuYWxUaW1lID0gZmFsc2U7XHJcblxyXG4gICAgcmVhZG9ubHkgZml4RGlnaXRzID0ge1xyXG4gICAgICAgIHBvc2l0aW9uOiA1LFxyXG4gICAgICAgIHJvdGF0aW9uOiAxMixcclxuICAgICAgICB0aW1lTm93OiAzLFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZGVsdGFUaW1lID0gMDtcclxuICAgIHByaXZhdGUgX2xhc3RUaW1lID0gMDtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21hdGVyaWFsOiBjYy5QaHlzaWNzTWF0ZXJpYWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJheWNhc3RPcHRpb25zOiBJUmF5Y2FzdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgJ2dyb3VwSW5kZXgnOiAtMSxcclxuICAgICAgICAncXVlcnlUcmlnZ2VyJzogdHJ1ZSxcclxuICAgICAgICAnbWF4RGlzdGFuY2UnOiBJbmZpbml0eVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmF5Y2FzdFJlc3VsdFBvb2wgPSBuZXcgY2MuUmVjeWNsZVBvb2woKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUGh5c2ljc1JheVJlc3VsdCgpO1xyXG4gICAgfSwgMSk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuX3NjaGVkdWxlciAmJiBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcclxuICAgICAgICB0aGlzLnBoeXNpY3NXb3JsZCA9IGNyZWF0ZVBoeXNpY3NXb3JsZCgpO1xyXG4gICAgICAgIHRoaXMuX2xhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgaWYgKCFDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5ncmF2aXR5ID0gdGhpcy5fZ3Jhdml0eTtcclxuICAgICAgICAgICAgdGhpcy5hbGxvd1NsZWVwID0gdGhpcy5fYWxsb3dTbGVlcDtcclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSBuZXcgUGh5c2ljc01hdGVyaWFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsLmZyaWN0aW9uID0gMC4xO1xyXG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbC5yZXN0aXR1dGlvbiA9IDAuMTtcclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwub24oJ3BoeXNpY3NfbWF0ZXJpYWxfdXBkYXRlJywgdGhpcy5fdXBkYXRlTWF0ZXJpYWwsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3NXb3JsZC5kZWZhdWx0TWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBIHBoeXNpY2FsIHN5c3RlbSBzaW11bGF0aW9uIGlzIHBlcmZvcm1lZCBvbmNlIGFuZCB3aWxsIG5vdyBiZSBwZXJmb3JtZWQgYXV0b21hdGljYWxseSBvbmNlIHBlciBmcmFtZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaJp+ihjOS4gOasoeeJqeeQhuezu+e7n+eahOaooeaLn++8jOebruWJjeWwhuWcqOavj+W4p+iHquWKqOaJp+ihjOS4gOasoeOAglxyXG4gICAgICogQG1ldGhvZCB1cGRhdGVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVRpbWUgVGhlIHRpbWUgZGlmZmVyZW5jZSBmcm9tIHRoZSBsYXN0IGV4ZWN1dGlvbiBpcyBjdXJyZW50bHkgZWxhcHNlZCBwZXIgZnJhbWVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlIChkZWx0YVRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudXNlSW50ZXJuYWxUaW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBub3cgPSBwYXJzZUZsb2F0KHBlcmZvcm1hbmNlLm5vdygpLnRvRml4ZWQodGhpcy5maXhEaWdpdHMudGltZU5vdykpO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWx0YVRpbWUgPSBub3cgPiB0aGlzLl9sYXN0VGltZSA/IChub3cgLSB0aGlzLl9sYXN0VGltZSkgLyAxMDAwIDogMDtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFRpbWUgPSBub3c7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfUEhZU0lDUyk7XHJcblxyXG4gICAgICAgIGlmIChDQ19QSFlTSUNTX0JVSUxUSU4pIHtcclxuICAgICAgICAgICAgdGhpcy5waHlzaWNzV29ybGQuc3RlcCh0aGlzLl9maXhlZFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91c2VGaXhlZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLnN0ZXAodGhpcy5fZml4ZWRUaW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZUFjY3VtdWxhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtdWxhdG9yICs9IHRoaXMuX2RlbHRhVGltZTtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IHRoaXMuX21heFN1YlN0ZXAgJiYgdGhpcy5fYWNjdW11bGF0b3IgPiB0aGlzLl9maXhlZFRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waHlzaWNzV29ybGQuc3RlcCh0aGlzLl9maXhlZFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY2N1bXVsYXRvciAtPSB0aGlzLl9maXhlZFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGh5c2ljc1dvcmxkLnN0ZXAodGhpcy5fZml4ZWRUaW1lLCB0aGlzLl9kZWx0YVRpbWUsIHRoaXMuX21heFN1YlN0ZXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1BIWVNJQ1MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXRlY3QgYWxsIGNvbGxpc2lvbiBib3hlcyBhbmQgcmV0dXJuIGFsbCBkZXRlY3RlZCByZXN1bHRzLCBvciBudWxsIGlmIG5vbmUgaXMgZGV0ZWN0ZWQuIE5vdGUgdGhhdCB0aGUgcmV0dXJuIHZhbHVlIGlzIHRha2VuIGZyb20gdGhlIG9iamVjdCBwb29sLCBzbyBkbyBub3Qgc2F2ZSB0aGUgcmVzdWx0IHJlZmVyZW5jZSBvciBtb2RpZnkgdGhlIHJlc3VsdC5cclxuICAgICAqICEjemgg5qOA5rWL5omA5pyJ55qE56Kw5pKe55uS77yM5bm26L+U5Zue5omA5pyJ6KKr5qOA5rWL5Yiw55qE57uT5p6c77yM6Iul5rKh5pyJ5qOA5rWL5Yiw77yM5YiZ6L+U5Zue56m65YC844CC5rOo5oSP6L+U5Zue5YC85piv5LuO5a+56LGh5rGg5Lit5Y+W55qE77yM5omA5Lul6K+35LiN6KaB5L+d5a2Y57uT5p6c5byV55So5oiW6ICF5L+u5pS557uT5p6c44CCXHJcbiAgICAgKiBAbWV0aG9kIHJheWNhc3RcclxuICAgICAqIEBwYXJhbSB7UmF5fSB3b3JsZFJheSBBIHJheSBpbiB3b3JsZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBncm91cEluZGV4T3JOYW1lIENvbGxpc2lvbiBncm91cCBpbmRleCBvciBncm91cCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4RGlzdGFuY2UgTWF4aW11bSBkZXRlY3Rpb24gZGlzdGFuY2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcXVlcnlUcmlnZ2VyIERldGVjdCB0cmlnZ2VyIG9yIG5vdFxyXG4gICAgICogQHJldHVybiB7UGh5c2ljc1JheVJlc3VsdFtdIHwgbnVsbH0gRGV0ZWN0ZWQgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHJheWNhc3QgKHdvcmxkUmF5OiBjYy5nZW9tVXRpbHMuUmF5LCBncm91cEluZGV4T3JOYW1lOiBudW1iZXIgfCBzdHJpbmcgPSAwLCBtYXhEaXN0YW5jZSA9IEluZmluaXR5LCBxdWVyeVRyaWdnZXIgPSB0cnVlKTogUGh5c2ljc1JheVJlc3VsdFtdIHwgbnVsbCB7XHJcbiAgICAgICAgdGhpcy5yYXljYXN0UmVzdWx0UG9vbC5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMucmF5Y2FzdFJlc3VsdHMubGVuZ3RoID0gMDtcclxuICAgICAgICBpZiAodHlwZW9mIGdyb3VwSW5kZXhPck5hbWUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBJbmRleCA9IGNjLmdhbWUuZ3JvdXBMaXN0LmluZGV4T2YoZ3JvdXBJbmRleE9yTmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChncm91cEluZGV4ID09IC0xKSBncm91cEluZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yYXljYXN0T3B0aW9ucy5ncm91cEluZGV4ID0gZ3JvdXBJbmRleDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLmdyb3VwSW5kZXggPSBncm91cEluZGV4T3JOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLm1heERpc3RhbmNlID0gbWF4RGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5yYXljYXN0T3B0aW9ucy5xdWVyeVRyaWdnZXIgPSBxdWVyeVRyaWdnZXI7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMucGh5c2ljc1dvcmxkLnJheWNhc3Qod29ybGRSYXksIHRoaXMucmF5Y2FzdE9wdGlvbnMsIHRoaXMucmF5Y2FzdFJlc3VsdFBvb2wsIHRoaXMucmF5Y2FzdFJlc3VsdHMpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHJldHVybiB0aGlzLnJheWNhc3RSZXN1bHRzO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXRlY3QgYWxsIGNvbGxpc2lvbiBib3hlcyBhbmQgcmV0dXJuIHRoZSBkZXRlY3Rpb24gcmVzdWx0IHdpdGggdGhlIHNob3J0ZXN0IHJheSBkaXN0YW5jZS4gSWYgbm90LCByZXR1cm4gbnVsbCB2YWx1ZS4gTm90ZSB0aGF0IHRoZSByZXR1cm4gdmFsdWUgaXMgdGFrZW4gZnJvbSB0aGUgb2JqZWN0IHBvb2wsIHNvIGRvIG5vdCBzYXZlIHRoZSByZXN1bHQgcmVmZXJlbmNlIG9yIG1vZGlmeSB0aGUgcmVzdWx0LlxyXG4gICAgICogISN6aCDmo4DmtYvmiYDmnInnmoTnorDmkp7nm5LvvIzlubbov5Tlm57lsITnur/ot53nprvmnIDnn63nmoTmo4DmtYvnu5PmnpzvvIzoi6XmsqHmnInvvIzliJnov5Tlm57nqbrlgLzjgILms6jmhI/ov5Tlm57lgLzmmK/ku47lr7nosaHmsaDkuK3lj5bnmoTvvIzmiYDku6Xor7fkuI3opoHkv53lrZjnu5PmnpzlvJXnlKjmiJbogIXkv67mlLnnu5PmnpzjgIJcclxuICAgICAqIEBtZXRob2QgcmF5Y2FzdENsb3Nlc3RcclxuICAgICAqIEBwYXJhbSB7UmF5fSB3b3JsZFJheSBBIHJheSBpbiB3b3JsZCBzcGFjZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBncm91cEluZGV4T3JOYW1lIENvbGxpc2lvbiBncm91cCBpbmRleCBvciBncm91cCBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4RGlzdGFuY2UgTWF4aW11bSBkZXRlY3Rpb24gZGlzdGFuY2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gcXVlcnlUcmlnZ2VyIERldGVjdCB0cmlnZ2VyIG9yIG5vdFxyXG4gICAgICogQHJldHVybiB7UGh5c2ljc1JheVJlc3VsdHxudWxsfSBEZXRlY3RlZCByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcmF5Y2FzdENsb3Nlc3QgKHdvcmxkUmF5OiBjYy5nZW9tVXRpbHMuUmF5LCBncm91cEluZGV4T3JOYW1lOiBudW1iZXIgfCBzdHJpbmcgPSAwLCBtYXhEaXN0YW5jZSA9IEluZmluaXR5LCBxdWVyeVRyaWdnZXIgPSB0cnVlKTogUGh5c2ljc1JheVJlc3VsdCB8IG51bGwge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBJbmRleE9yTmFtZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGxldCBncm91cEluZGV4ID0gY2MuZ2FtZS5ncm91cExpc3QuaW5kZXhPZihncm91cEluZGV4T3JOYW1lKTtcclxuICAgICAgICAgICAgaWYgKGdyb3VwSW5kZXggPT0gLTEpIGdyb3VwSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLmdyb3VwSW5kZXggPSBncm91cEluZGV4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmF5Y2FzdE9wdGlvbnMuZ3JvdXBJbmRleCA9IGdyb3VwSW5kZXhPck5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmF5Y2FzdE9wdGlvbnMubWF4RGlzdGFuY2UgPSBtYXhEaXN0YW5jZTtcclxuICAgICAgICB0aGlzLnJheWNhc3RPcHRpb25zLnF1ZXJ5VHJpZ2dlciA9IHF1ZXJ5VHJpZ2dlcjtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5waHlzaWNzV29ybGQucmF5Y2FzdENsb3Nlc3Qod29ybGRSYXksIHRoaXMucmF5Y2FzdE9wdGlvbnMsIHRoaXMucmF5Y2FzdENsb3Nlc3RSZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHJldHVybiB0aGlzLnJheWNhc3RDbG9zZXN0UmVzdWx0O1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBpZiAoIUNDX1BIWVNJQ1NfQlVJTFRJTikge1xyXG4gICAgICAgICAgICB0aGlzLnBoeXNpY3NXb3JsZC5kZWZhdWx0TWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=