
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-rigid-body.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonRigidBody = void 0;

var _cannon = _interopRequireDefault(require("../../../../../external/cannon/cannon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var v3_cannon0 = new _cannon["default"].Vec3();
var v3_cannon1 = new _cannon["default"].Vec3();
var Vec3 = cc.Vec3;
/**
 * wraped shared body
 * dynamic
 * kinematic
 */

var CannonRigidBody = /*#__PURE__*/function () {
  function CannonRigidBody() {
    this._rigidBody = void 0;
    this._sharedBody = void 0;
    this._isEnabled = false;
  }

  var _proto = CannonRigidBody.prototype;

  /** LIFECYCLE */
  _proto.__preload = function __preload(com) {
    this._rigidBody = com;
    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._rigidBody.node);
    this._sharedBody.reference = true;
    this._sharedBody.wrappedBody = this;
  };

  _proto.onLoad = function onLoad() {};

  _proto.onEnable = function onEnable() {
    this._isEnabled = true;
    this.mass = this._rigidBody.mass;
    this.allowSleep = this._rigidBody.allowSleep;
    this.linearDamping = this._rigidBody.linearDamping;
    this.angularDamping = this._rigidBody.angularDamping;
    this.useGravity = this._rigidBody.useGravity;
    this.isKinematic = this._rigidBody.isKinematic;
    this.fixedRotation = this._rigidBody.fixedRotation;
    this.linearFactor = this._rigidBody.linearFactor;
    this.angularFactor = this._rigidBody.angularFactor;
    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._isEnabled = false;
    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._rigidBody = null;
    this._sharedBody = null;
  }
  /** INTERFACE */
  ;

  _proto.wakeUp = function wakeUp() {
    return this._sharedBody.body.wakeUp();
  };

  _proto.sleep = function sleep() {
    return this._sharedBody.body.sleep();
  };

  _proto.getLinearVelocity = function getLinearVelocity(out) {
    Vec3.copy(out, this._sharedBody.body.velocity);
    return out;
  };

  _proto.setLinearVelocity = function setLinearVelocity(value) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(body.velocity, value);
  };

  _proto.getAngularVelocity = function getAngularVelocity(out) {
    Vec3.copy(out, this._sharedBody.body.angularVelocity);
    return out;
  };

  _proto.setAngularVelocity = function setAngularVelocity(value) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(body.angularVelocity, value);
  };

  _proto.applyForce = function applyForce(force, worldPoint) {
    if (worldPoint == null) {
      worldPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, worldPoint));
  };

  _proto.applyImpulse = function applyImpulse(impulse, worldPoint) {
    if (worldPoint == null) {
      worldPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, worldPoint));
  };

  _proto.applyLocalForce = function applyLocalForce(force, localPoint) {
    if (localPoint == null) {
      localPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyLocalForce(Vec3.copy(v3_cannon0, force), Vec3.copy(v3_cannon1, localPoint));
  };

  _proto.applyLocalImpulse = function applyLocalImpulse(impulse, localPoint) {
    if (localPoint == null) {
      localPoint = Vec3.ZERO;
    }

    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.applyLocalImpulse(Vec3.copy(v3_cannon0, impulse), Vec3.copy(v3_cannon1, localPoint));
  };

  _proto.applyTorque = function applyTorque(torque) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    body.torque.x += torque.x;
    body.torque.y += torque.y;
    body.torque.z += torque.z;
  };

  _proto.applyLocalTorque = function applyLocalTorque(torque) {
    var body = this._sharedBody.body;

    if (body.isSleeping()) {
      body.wakeUp();
    }

    Vec3.copy(v3_cannon0, torque);
    body.vectorToWorldFrame(v3_cannon0, v3_cannon0);
    body.torque.x += v3_cannon0.x;
    body.torque.y += v3_cannon0.y;
    body.torque.z += v3_cannon0.z;
  };

  _createClass(CannonRigidBody, [{
    key: "isAwake",
    get: function get() {
      return this._sharedBody.body.isAwake();
    }
  }, {
    key: "isSleepy",
    get: function get() {
      return this._sharedBody.body.isSleepy();
    }
  }, {
    key: "isSleeping",
    get: function get() {
      return this._sharedBody.body.isSleeping();
    }
  }, {
    key: "allowSleep",
    set: function set(v) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.allowSleep = v;
    }
  }, {
    key: "mass",
    set: function set(value) {
      var body = this._sharedBody.body;
      body.mass = value;

      if (body.mass == 0) {
        body.type = _cannon["default"].Body.STATIC;
      } else {
        body.type = this._rigidBody.isKinematic ? _cannon["default"].Body.KINEMATIC : _cannon["default"].Body.DYNAMIC;
      }

      body.updateMassProperties();

      if (body.isSleeping()) {
        body.wakeUp();
      }
    }
  }, {
    key: "isKinematic",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.mass == 0) {
        body.type = _cannon["default"].Body.STATIC;
      } else {
        if (value) {
          body.type = _cannon["default"].Body.KINEMATIC;
        } else {
          body.type = _cannon["default"].Body.DYNAMIC;
        }
      }
    }
  }, {
    key: "fixedRotation",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.fixedRotation = value;
      body.updateMassProperties();
    }
  }, {
    key: "linearDamping",
    set: function set(value) {
      this._sharedBody.body.linearDamping = value;
    }
  }, {
    key: "angularDamping",
    set: function set(value) {
      this._sharedBody.body.angularDamping = value;
    }
  }, {
    key: "useGravity",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      body.useGravity = value;
    }
  }, {
    key: "linearFactor",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      Vec3.copy(body.linearFactor, value);
    }
  }, {
    key: "angularFactor",
    set: function set(value) {
      var body = this._sharedBody.body;

      if (body.isSleeping()) {
        body.wakeUp();
      }

      Vec3.copy(body.angularFactor, value);
    }
  }, {
    key: "rigidBody",
    get: function get() {
      return this._rigidBody;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "isEnabled",
    get: function get() {
      return this._isEnabled;
    }
  }]);

  return CannonRigidBody;
}();

exports.CannonRigidBody = CannonRigidBody;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXGNhbm5vbi1yaWdpZC1ib2R5LnRzIl0sIm5hbWVzIjpbInYzX2Nhbm5vbjAiLCJDQU5OT04iLCJWZWMzIiwidjNfY2Fubm9uMSIsImNjIiwiQ2Fubm9uUmlnaWRCb2R5IiwiX3JpZ2lkQm9keSIsIl9zaGFyZWRCb2R5IiwiX2lzRW5hYmxlZCIsIl9fcHJlbG9hZCIsImNvbSIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsInBoeXNpY3NXb3JsZCIsImdldFNoYXJlZEJvZHkiLCJub2RlIiwicmVmZXJlbmNlIiwid3JhcHBlZEJvZHkiLCJvbkxvYWQiLCJvbkVuYWJsZSIsIm1hc3MiLCJhbGxvd1NsZWVwIiwibGluZWFyRGFtcGluZyIsImFuZ3VsYXJEYW1waW5nIiwidXNlR3Jhdml0eSIsImlzS2luZW1hdGljIiwiZml4ZWRSb3RhdGlvbiIsImxpbmVhckZhY3RvciIsImFuZ3VsYXJGYWN0b3IiLCJlbmFibGVkIiwib25EaXNhYmxlIiwib25EZXN0cm95Iiwid2FrZVVwIiwiYm9keSIsInNsZWVwIiwiZ2V0TGluZWFyVmVsb2NpdHkiLCJvdXQiLCJjb3B5IiwidmVsb2NpdHkiLCJzZXRMaW5lYXJWZWxvY2l0eSIsInZhbHVlIiwiaXNTbGVlcGluZyIsImdldEFuZ3VsYXJWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsInNldEFuZ3VsYXJWZWxvY2l0eSIsImFwcGx5Rm9yY2UiLCJmb3JjZSIsIndvcmxkUG9pbnQiLCJaRVJPIiwiYXBwbHlJbXB1bHNlIiwiaW1wdWxzZSIsImFwcGx5TG9jYWxGb3JjZSIsImxvY2FsUG9pbnQiLCJhcHBseUxvY2FsSW1wdWxzZSIsImFwcGx5VG9ycXVlIiwidG9ycXVlIiwieCIsInkiLCJ6IiwiYXBwbHlMb2NhbFRvcnF1ZSIsInZlY3RvclRvV29ybGRGcmFtZSIsImlzQXdha2UiLCJpc1NsZWVweSIsInYiLCJ0eXBlIiwi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QUVELGFBQWdCQSxLQUFoQixFQUFnQztBQUM1QixVQUFJUCxJQUFJLEdBQUcsS0FBSzFCLFdBQUwsQ0FBaUIwQixJQUE1Qjs7QUFDQSxVQUFJQSxJQUFJLENBQUNRLFVBQUwsRUFBSixFQUF1QjtBQUNuQlIsUUFBQUEsSUFBSSxDQUFDRCxNQUFMO0FBQ0g7O0FBQ0RDLE1BQUFBLElBQUksQ0FBQ1QsVUFBTCxHQUFrQmdCLEtBQWxCO0FBQ0g7OztTQUVELGFBQWtCQSxLQUFsQixFQUFrQztBQUM5QixVQUFJUCxJQUFJLEdBQUcsS0FBSzFCLFdBQUwsQ0FBaUIwQixJQUE1Qjs7QUFDQSxVQUFJQSxJQUFJLENBQUNRLFVBQUwsRUFBSixFQUF1QjtBQUNuQlIsUUFBQUEsSUFBSSxDQUFDRCxNQUFMO0FBQ0g7O0FBQ0Q5QixNQUFBQSxJQUFJLENBQUNtQyxJQUFMLENBQVVKLElBQUksQ0FBQ04sWUFBZixFQUE2QmEsS0FBN0I7QUFDSDs7O1NBRUQsYUFBbUJBLEtBQW5CLEVBQW1DO0FBQy9CLFVBQUlQLElBQUksR0FBRyxLQUFLMUIsV0FBTCxDQUFpQjBCLElBQTVCOztBQUNBLFVBQUlBLElBQUksQ0FBQ1EsVUFBTCxFQUFKLEVBQXVCO0FBQ25CUixRQUFBQSxJQUFJLENBQUNELE1BQUw7QUFDSDs7QUFDRDlCLE1BQUFBLElBQUksQ0FBQ21DLElBQUwsQ0FBVUosSUFBSSxDQUFDTCxhQUFmLEVBQThCWSxLQUE5QjtBQUNIOzs7U0FFRCxlQUFpQjtBQUNiLGFBQU8sS0FBS2xDLFVBQVo7QUFDSDs7O1NBRUQsZUFBa0I7QUFDZCxhQUFPLEtBQUtDLFdBQVo7QUFDSDs7O1NBRUQsZUFBaUI7QUFDYixhQUFPLEtBQUtDLFVBQVo7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBDQU5OT04gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvY2Fubm9uL2Nhbm5vbic7XHJcbmltcG9ydCB7IElSaWdpZEJvZHkgfSBmcm9tICcuLi9zcGVjL0ktcmlnaWQtYm9keSc7XHJcbmltcG9ydCB7IENhbm5vblNoYXJlZEJvZHkgfSBmcm9tICcuL2Nhbm5vbi1zaGFyZWQtYm9keSc7XHJcbmltcG9ydCB7IENhbm5vbldvcmxkIH0gZnJvbSAnLi9jYW5ub24td29ybGQnO1xyXG5pbXBvcnQgeyBSaWdpZEJvZHkzRCB9IGZyb20gJy4uL2ZyYW1ld29yayc7XHJcblxyXG5jb25zdCB2M19jYW5ub24wID0gbmV3IENBTk5PTi5WZWMzKCk7XHJcbmNvbnN0IHYzX2Nhbm5vbjEgPSBuZXcgQ0FOTk9OLlZlYzMoKTtcclxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XHJcblxyXG4vKipcclxuICogd3JhcGVkIHNoYXJlZCBib2R5XHJcbiAqIGR5bmFtaWNcclxuICoga2luZW1hdGljXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fubm9uUmlnaWRCb2R5IGltcGxlbWVudHMgSVJpZ2lkQm9keSB7XHJcblxyXG4gICAgZ2V0IGlzQXdha2UgKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuaXNBd2FrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1NsZWVweSAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZEJvZHkuYm9keS5pc1NsZWVweSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1NsZWVwaW5nICgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkQm9keS5ib2R5LmlzU2xlZXBpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgYWxsb3dTbGVlcCAodjogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib2R5LmFsbG93U2xlZXAgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXNzICh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgYm9keS5tYXNzID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKGJvZHkubWFzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIGJvZHkudHlwZSA9IENBTk5PTi5Cb2R5LlNUQVRJQztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib2R5LnR5cGUgPSB0aGlzLl9yaWdpZEJvZHkuaXNLaW5lbWF0aWMgPyBDQU5OT04uQm9keS5LSU5FTUFUSUMgOiBDQU5OT04uQm9keS5EWU5BTUlDO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm9keS51cGRhdGVNYXNzUHJvcGVydGllcygpO1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgaXNLaW5lbWF0aWMgKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgaWYgKGJvZHkubWFzcyA9PSAwKSB7XHJcbiAgICAgICAgICAgIGJvZHkudHlwZSA9IENBTk5PTi5Cb2R5LlNUQVRJQztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGJvZHkudHlwZSA9IENBTk5PTi5Cb2R5LktJTkVNQVRJQztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJvZHkudHlwZSA9IENBTk5PTi5Cb2R5LkRZTkFNSUM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpeGVkUm90YXRpb24gKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvZHkuZml4ZWRSb3RhdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgIGJvZHkudXBkYXRlTWFzc1Byb3BlcnRpZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbGluZWFyRGFtcGluZyAodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuYm9keS5saW5lYXJEYW1waW5nID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGFuZ3VsYXJEYW1waW5nICh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5ib2R5LmFuZ3VsYXJEYW1waW5nID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHVzZUdyYXZpdHkgKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvZHkudXNlR3Jhdml0eSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBsaW5lYXJGYWN0b3IgKHZhbHVlOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlYzMuY29weShib2R5LmxpbmVhckZhY3RvciwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhbmd1bGFyRmFjdG9yICh2YWx1ZTogY2MuVmVjMykge1xyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLmNvcHkoYm9keS5hbmd1bGFyRmFjdG9yLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJpZ2lkQm9keSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2lkQm9keTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2hhcmVkQm9keSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZEJvZHk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzRW5hYmxlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW5hYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9yaWdpZEJvZHkhOiBSaWdpZEJvZHkzRDtcclxuICAgIHByaXZhdGUgX3NoYXJlZEJvZHkhOiBDYW5ub25TaGFyZWRCb2R5O1xyXG4gICAgcHJpdmF0ZSBfaXNFbmFibGVkID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIExJRkVDWUNMRSAqL1xyXG5cclxuICAgIF9fcHJlbG9hZCAoY29tOiBSaWdpZEJvZHkzRCkge1xyXG4gICAgICAgIHRoaXMuX3JpZ2lkQm9keSA9IGNvbTtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5ID0gKGNjLmRpcmVjdG9yLmdldFBoeXNpY3MzRE1hbmFnZXIoKS5waHlzaWNzV29ybGQgYXMgQ2Fubm9uV29ybGQpLmdldFNoYXJlZEJvZHkodGhpcy5fcmlnaWRCb2R5Lm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVmZXJlbmNlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LndyYXBwZWRCb2R5ID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICB0aGlzLl9pc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuX3JpZ2lkQm9keS5tYXNzO1xyXG4gICAgICAgIHRoaXMuYWxsb3dTbGVlcCA9IHRoaXMuX3JpZ2lkQm9keS5hbGxvd1NsZWVwO1xyXG4gICAgICAgIHRoaXMubGluZWFyRGFtcGluZyA9IHRoaXMuX3JpZ2lkQm9keS5saW5lYXJEYW1waW5nO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhckRhbXBpbmcgPSB0aGlzLl9yaWdpZEJvZHkuYW5ndWxhckRhbXBpbmc7XHJcbiAgICAgICAgdGhpcy51c2VHcmF2aXR5ID0gdGhpcy5fcmlnaWRCb2R5LnVzZUdyYXZpdHk7XHJcbiAgICAgICAgdGhpcy5pc0tpbmVtYXRpYyA9IHRoaXMuX3JpZ2lkQm9keS5pc0tpbmVtYXRpYztcclxuICAgICAgICB0aGlzLmZpeGVkUm90YXRpb24gPSB0aGlzLl9yaWdpZEJvZHkuZml4ZWRSb3RhdGlvbjtcclxuICAgICAgICB0aGlzLmxpbmVhckZhY3RvciA9IHRoaXMuX3JpZ2lkQm9keS5saW5lYXJGYWN0b3I7XHJcbiAgICAgICAgdGhpcy5hbmd1bGFyRmFjdG9yID0gdGhpcy5fcmlnaWRCb2R5LmFuZ3VsYXJGYWN0b3I7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZWZlcmVuY2UgPSBmYWxzZTtcclxuICAgICAgICAodGhpcy5fcmlnaWRCb2R5IGFzIGFueSkgPSBudWxsO1xyXG4gICAgICAgICh0aGlzLl9zaGFyZWRCb2R5IGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBJTlRFUkZBQ0UgKi9cclxuXHJcbiAgICB3YWtlVXAgKCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkud2FrZVVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2xlZXAgKCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFyZWRCb2R5LmJvZHkuc2xlZXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaW5lYXJWZWxvY2l0eSAob3V0OiBjYy5WZWMzKTogY2MuVmVjMyB7XHJcbiAgICAgICAgVmVjMy5jb3B5KG91dCwgdGhpcy5fc2hhcmVkQm9keS5ib2R5LnZlbG9jaXR5KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpbmVhclZlbG9jaXR5ICh2YWx1ZTogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVmVjMy5jb3B5KGJvZHkudmVsb2NpdHksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBbmd1bGFyVmVsb2NpdHkgKG91dDogY2MuVmVjMyk6IGNjLlZlYzMge1xyXG4gICAgICAgIFZlYzMuY29weShvdXQsIHRoaXMuX3NoYXJlZEJvZHkuYm9keS5hbmd1bGFyVmVsb2NpdHkpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0QW5ndWxhclZlbG9jaXR5ICh2YWx1ZTogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLmNvcHkoYm9keS5hbmd1bGFyVmVsb2NpdHksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUZvcmNlIChmb3JjZTogY2MuVmVjMywgd29ybGRQb2ludD86IGNjLlZlYzMpIHtcclxuICAgICAgICBpZiAod29ybGRQb2ludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdvcmxkUG9pbnQgPSBWZWMzLlpFUk87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib2R5LmFwcGx5Rm9yY2UoVmVjMy5jb3B5KHYzX2Nhbm5vbjAsIGZvcmNlKSwgVmVjMy5jb3B5KHYzX2Nhbm5vbjEsIHdvcmxkUG9pbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUltcHVsc2UgKGltcHVsc2U6IGNjLlZlYzMsIHdvcmxkUG9pbnQ/OiBjYy5WZWMzKSB7XHJcbiAgICAgICAgaWYgKHdvcmxkUG9pbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB3b3JsZFBvaW50ID0gVmVjMy5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcclxuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcclxuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9keS5hcHBseUltcHVsc2UoVmVjMy5jb3B5KHYzX2Nhbm5vbjAsIGltcHVsc2UpLCBWZWMzLmNvcHkodjNfY2Fubm9uMSwgd29ybGRQb2ludCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TG9jYWxGb3JjZSAoZm9yY2U6IGNjLlZlYzMsIGxvY2FsUG9pbnQ/OiBjYy5WZWMzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGxvY2FsUG9pbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2NhbFBvaW50ID0gVmVjMy5aRVJPO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYm9keSA9IHRoaXMuX3NoYXJlZEJvZHkuYm9keTtcclxuICAgICAgICBpZiAoYm9keS5pc1NsZWVwaW5nKCkpIHtcclxuICAgICAgICAgICAgYm9keS53YWtlVXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9keS5hcHBseUxvY2FsRm9yY2UoVmVjMy5jb3B5KHYzX2Nhbm5vbjAsIGZvcmNlKSwgVmVjMy5jb3B5KHYzX2Nhbm5vbjEsIGxvY2FsUG9pbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseUxvY2FsSW1wdWxzZSAoaW1wdWxzZTogY2MuVmVjMywgbG9jYWxQb2ludD86IGNjLlZlYzMpOiB2b2lkIHtcclxuICAgICAgICBpZiAobG9jYWxQb2ludCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxvY2FsUG9pbnQgPSBWZWMzLlpFUk87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib2R5LmFwcGx5TG9jYWxJbXB1bHNlKFZlYzMuY29weSh2M19jYW5ub24wLCBpbXB1bHNlKSwgVmVjMy5jb3B5KHYzX2Nhbm5vbjEsIGxvY2FsUG9pbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRvcnF1ZSAodG9ycXVlOiBjYy5WZWMzKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSB0aGlzLl9zaGFyZWRCb2R5LmJvZHk7XHJcbiAgICAgICAgaWYgKGJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIGJvZHkud2FrZVVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvZHkudG9ycXVlLnggKz0gdG9ycXVlLng7XHJcbiAgICAgICAgYm9keS50b3JxdWUueSArPSB0b3JxdWUueTtcclxuICAgICAgICBib2R5LnRvcnF1ZS56ICs9IHRvcnF1ZS56O1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5TG9jYWxUb3JxdWUgKHRvcnF1ZTogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBib2R5ID0gdGhpcy5fc2hhcmVkQm9keS5ib2R5O1xyXG4gICAgICAgIGlmIChib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICBib2R5Lndha2VVcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMzLmNvcHkodjNfY2Fubm9uMCwgdG9ycXVlKTtcclxuICAgICAgICBib2R5LnZlY3RvclRvV29ybGRGcmFtZSh2M19jYW5ub24wLCB2M19jYW5ub24wKTtcclxuICAgICAgICBib2R5LnRvcnF1ZS54ICs9IHYzX2Nhbm5vbjAueDtcclxuICAgICAgICBib2R5LnRvcnF1ZS55ICs9IHYzX2Nhbm5vbjAueTtcclxuICAgICAgICBib2R5LnRvcnF1ZS56ICs9IHYzX2Nhbm5vbjAuejtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiLyJ9