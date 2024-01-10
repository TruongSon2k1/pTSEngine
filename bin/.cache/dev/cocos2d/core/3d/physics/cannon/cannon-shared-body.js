
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-shared-body.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonSharedBody = void 0;

var _cannon = _interopRequireDefault(require("../../../../../external/cannon/cannon"));

var _physicsEnum = require("../framework/physics-enum");

var _util = require("../framework/util");

var _cannonUtil = require("./cannon-util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LocalDirtyFlag = cc.Node._LocalDirtyFlag;
var PHYSICS_SCALE = LocalDirtyFlag.PHYSICS_SCALE;
var Quat = cc.Quat;
var Vec3 = cc.Vec3;
var fastRemoveAt = cc.js.array.fastRemoveAt;
var v3_0 = new Vec3();
var quat_0 = new Quat();
var contactsPool = [];
var CollisionEventObject = {
  type: 'collision-enter',
  selfCollider: null,
  otherCollider: null,
  contacts: []
};
/**
 * sharedbody, node : sharedbody = 1 : 1
 * static
 */

var CannonSharedBody = /*#__PURE__*/function () {
  CannonSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld) {
    var key = node._id;

    if (CannonSharedBody.sharedBodiesMap.has(key)) {
      return CannonSharedBody.sharedBodiesMap.get(key);
    } else {
      var newSB = new CannonSharedBody(node, wrappedWorld);
      CannonSharedBody.sharedBodiesMap.set(node._id, newSB);
      return newSB;
    }
  };

  function CannonSharedBody(node, wrappedWorld) {
    this.node = void 0;
    this.wrappedWorld = void 0;
    this.body = new _cannon["default"].Body();
    this.shapes = [];
    this.wrappedBody = null;
    this.index = -1;
    this.ref = 0;
    this.onCollidedListener = this.onCollided.bind(this);
    this.wrappedWorld = wrappedWorld;
    this.node = node;
    this.body.material = this.wrappedWorld.world.defaultMaterial;
    this.body.addEventListener('cc-collide', this.onCollidedListener);

    this._updateGroup();

    this.node.on(cc.Node.EventType.GROUP_CHANGED, this._updateGroup, this);
  }

  var _proto = CannonSharedBody.prototype;

  _proto._updateGroup = function _updateGroup() {
    (0, _cannonUtil.groupIndexToBitMask)(this.node.groupIndex, this.body);
  };

  _proto.addShape = function addShape(v) {
    var index = this.shapes.indexOf(v);

    if (index < 0) {
      var _index = this.body.shapes.length;
      this.body.addShape(v.shape);
      this.shapes.push(v);
      v.setIndex(_index);
      var offset = this.body.shapeOffsets[_index];
      var orient = this.body.shapeOrientations[_index];
      v.setOffsetAndOrient(offset, orient);
    }
  };

  _proto.removeShape = function removeShape(v) {
    var index = this.shapes.indexOf(v);

    if (index >= 0) {
      fastRemoveAt(this.shapes, index);
      this.body.removeShape(v.shape);
      v.setIndex(-1);
    }
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics(force) {
    if (force === void 0) {
      force = false;
    }

    var node = this.node;
    var needUpdateTransform = (0, _util.worldDirty)(node);

    if (!force && !needUpdateTransform) {
      return;
    } // body world aabb need to be recalculated


    this.body.aabbNeedsUpdate = true;
    node.getWorldPosition(v3_0);
    node.getWorldRotation(quat_0);
    Vec3.copy(this.body.position, v3_0);
    Quat.copy(this.body.quaternion, quat_0);

    if (node._localMatDirty & PHYSICS_SCALE) {
      var wscale = node.__wscale;

      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].setScale(wscale);
      }

      (0, _cannonUtil.commitShapeUpdates)(this.body);
    }

    if (this.body.isSleeping()) {
      this.body.wakeUp();
    }
  };

  _proto.syncPhysicsToScene = function syncPhysicsToScene() {
    if (this.body.type != _physicsEnum.ERigidBodyType.STATIC && !this.body.isSleeping()) {
      Vec3.copy(v3_0, this.body.position);
      Quat.copy(quat_0, this.body.quaternion);
      this.node.setWorldPosition(v3_0);
      this.node.setWorldRotation(quat_0);
    }
  };

  _proto.destroy = function destroy() {
    this.body.removeEventListener('cc-collide', this.onCollidedListener);
    this.node.off(cc.Node.EventType.GROUP_CHANGED, this._updateGroup, this);
    CannonSharedBody.sharedBodiesMap["delete"](this.node._id);
    delete _cannon["default"].World['idToBodyMap'][this.body.id];
    this.node = null;
    this.wrappedWorld = null;
    this.body = null;
    this.shapes = null;
    this.onCollidedListener = null;
  };

  _proto.onCollided = function onCollided(event) {
    CollisionEventObject.type = event.event;
    var self = (0, _util.getWrap)(event.selfShape);
    var other = (0, _util.getWrap)(event.otherShape);

    if (self) {
      CollisionEventObject.selfCollider = self.collider;
      CollisionEventObject.otherCollider = other ? other.collider : null;
      var i = 0;

      for (i = CollisionEventObject.contacts.length; i--;) {
        contactsPool.push(CollisionEventObject.contacts.pop());
      }

      for (i = 0; i < event.contacts.length; i++) {
        var cq = event.contacts[i];

        if (contactsPool.length > 0) {
          var c = contactsPool.pop();
          Vec3.copy(c.contactA, cq.ri);
          Vec3.copy(c.contactB, cq.rj);
          Vec3.copy(c.normal, cq.ni);
          CollisionEventObject.contacts.push(c);
        } else {
          var _c = {
            contactA: Vec3.copy(new Vec3(), cq.ri),
            contactB: Vec3.copy(new Vec3(), cq.rj),
            normal: Vec3.copy(new Vec3(), cq.ni)
          };
          CollisionEventObject.contacts.push(_c);
        }
      }

      for (i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i];
        CollisionEventObject.type = _cannonUtil.deprecatedEventMap[CollisionEventObject.type];
        shape.collider.emit(CollisionEventObject.type, CollisionEventObject); // adapt 

        CollisionEventObject.type = event.event;
        shape.collider.emit(CollisionEventObject.type, CollisionEventObject);
      }
    }
  };

  _createClass(CannonSharedBody, [{
    key: "enabled",
    set:
    /**
     * add or remove from world \
     * add, if enable \
     * remove, if disable & shapes.length == 0 & wrappedBody disable
     */
    function set(v) {
      if (v) {
        if (this.index < 0) {
          this.index = this.wrappedWorld.bodies.length;
          this.wrappedWorld.addSharedBody(this);
          var node = this.node; // body world aabb need to be recalculated

          this.body.aabbNeedsUpdate = true;
          node.getWorldPosition(v3_0);
          node.getWorldRotation(quat_0);
          var pos = this.body.position;
          pos.x = parseFloat(v3_0.x.toFixed(3));
          pos.y = parseFloat(v3_0.y.toFixed(3));
          pos.z = parseFloat(v3_0.z.toFixed(3));
          var rot = this.body.quaternion;
          rot.x = parseFloat(quat_0.x.toFixed(12));
          rot.y = parseFloat(quat_0.y.toFixed(12));
          rot.z = parseFloat(quat_0.z.toFixed(12));
          rot.w = parseFloat(quat_0.w.toFixed(12));

          if (node._localMatDirty & PHYSICS_SCALE) {
            var wscale = node.__wscale;

            for (var i = 0; i < this.shapes.length; i++) {
              this.shapes[i].setScale(wscale);
            }

            (0, _cannonUtil.commitShapeUpdates)(this.body);
          }

          if (this.body.isSleeping()) {
            this.body.wakeUp();
          }
        }
      } else {
        if (this.index >= 0) {
          var isRemove = this.shapes.length == 0 && this.wrappedBody == null || this.shapes.length == 0 && this.wrappedBody != null && !this.wrappedBody.rigidBody.enabledInHierarchy || this.shapes.length == 0 && this.wrappedBody != null && !this.wrappedBody.isEnabled;

          if (isRemove) {
            this.body.sleep(); // clear velocity etc.

            this.index = -1;
            this.wrappedWorld.removeSharedBody(this);
          }
        }
      }
    }
  }, {
    key: "reference",
    set: function set(v) {
      v ? this.ref++ : this.ref--;

      if (this.ref == 0) {
        this.destroy();
      }
    }
  }]);

  return CannonSharedBody;
}();

exports.CannonSharedBody = CannonSharedBody;
CannonSharedBody.sharedBodiesMap = new Map();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXGNhbm5vbi1zaGFyZWQtYm9keS50cyJdLCJuYW1lcyI6WyJMb2NhbERpcnR5RmxhZyIsImNjIiwiTm9kZSIsIl9Mb2NhbERpcnR5RmxhZyIsIlBIWVNJQ1NfU0NBTEUiLCJRdWF0IiwiVmVjMyIsImZhc3RSZW1vdmVBdCIsImpzIiwiYXJyYXkiLCJ2M18wIiwicXVhdF8wIiwiY29udGFjdHNQb29sIiwiQ29sbGlzaW9uRXZlbnRPYmplY3QiLCJ0eXBlIiwic2VsZkNvbGxpZGVyIiwib3RoZXJDb2xsaWRlciIsImNvbnRhY3RzIiwiQ2Fubm9uU2hhcmVkQm9keSIsImdldFNoYXJlZEJvZHkiLCJub2RlIiwid3JhcHBlZFdvcmxkIiwia2V5IiwiX2lkIiwic2hhcmVkQm9kaWVzTWFwIiwiaGFzIiwiZ2V0IiwibmV3U0IiLCJzZXQiLCJib2R5IiwiQ0FOTk9OIiwiQm9keSIsInNoYXBlcyIsIndyYXBwZWRCb2R5IiwiaW5kZXgiLCJyZWYiLCJvbkNvbGxpZGVkTGlzdGVuZXIiLCJvbkNvbGxpZGVkIiwiYmluZCIsIm1hdGVyaWFsIiwid29ybGQiLCJkZWZhdWx0TWF0ZXJpYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiX3VwZGF0ZUdyb3VwIiwib24iLCJFdmVudFR5cGUiLCJHUk9VUF9DSEFOR0VEIiwiZ3JvdXBJbmRleCIsImFkZFNoYXBlIiwidiIsImluZGV4T2YiLCJsZW5ndGgiLCJzaGFwZSIsInB1c2giLCJzZXRJbmRleCIsIm9mZnNldCIsInNoYXBlT2Zmc2V0cyIsIm9yaWVudCIsInNoYXBlT3JpZW50YXRpb25zIiwic2V0T2Zmc2V0QW5kT3JpZW50IiwicmVtb3ZlU2hhcGUiLCJzeW5jU2NlbmVUb1BoeXNpY3MiLCJmb3JjZSIsIm5lZWRVcGRhdGVUcmFuc2Zvcm0iLCJhYWJiTmVlZHNVcGRhdGUiLCJnZXRXb3JsZFBvc2l0aW9uIiwiZ2V0V29ybGRSb3RhdGlvbiIsImNvcHkiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJfbG9jYWxNYXREaXJ0eSIsIndzY2FsZSIsIl9fd3NjYWxlIiwiaSIsInNldFNjYWxlIiwiaXNTbGVlcGluZyIsIndha2VVcCIsInN5bmNQaHlzaWNzVG9TY2VuZSIsIkVSaWdpZEJvZHlUeXBlIiwiU1RBVElDIiwic2V0V29ybGRQb3NpdGlvbiIsInNldFdvcmxkUm90YXRpb24iLCJkZXN0cm95IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm9mZiIsIldvcmxkIiwiaWQiLCJldmVudCIsInNlbGYiLCJzZWxmU2hhcGUiLCJvdGhlciIsIm90aGVyU2hhcGUiLCJjb2xsaWRlciIsInBvcCIsImNxIiwiYyIsImNvbnRhY3RBIiwicmkiLCJjb250YWN0QiIsInJqIiwibm9ybWFsIiwibmkiLCJkZXByZWNhdGVkRXZlbnRNYXAiLCJlbWl0IiwiYm9kaWVzIiwiYWRkU2hhcmVkQm9keSIsInBvcyIsIngiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInkiLCJ6Iiwicm90IiwidyIsImlzUmVtb3ZlIiwicmlnaWRCb2R5IiwiZW5hYmxlZEluSGllcmFyY2h5IiwiaXNFbmFibGVkIiwic2xlZXAiLCJyZW1vdmVTaGFyZWRCb2R5IiwiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQU1BOzs7Ozs7OztBQUVBLElBQU1BLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVFDLGVBQS9CO0FBQ0EsSUFBTUMsYUFBYSxHQUFHSixjQUFjLENBQUNJLGFBQXJDO0FBQ0EsSUFBTUMsSUFBSSxHQUFHSixFQUFFLENBQUNJLElBQWhCO0FBQ0EsSUFBTUMsSUFBSSxHQUFHTCxFQUFFLENBQUNLLElBQWhCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHTixFQUFFLENBQUNPLEVBQUgsQ0FBTUMsS0FBTixDQUFZRixZQUFqQztBQUNBLElBQU1HLElBQUksR0FBRyxJQUFJSixJQUFKLEVBQWI7QUFDQSxJQUFNSyxNQUFNLEdBQUcs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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IENBTk5PTiBmcm9tICcuLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9jYW5ub24vY2Fubm9uJztcclxuaW1wb3J0IHsgRVJpZ2lkQm9keVR5cGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvcGh5c2ljcy1lbnVtJztcclxuaW1wb3J0IHsgZ2V0V3JhcCwgd29ybGREaXJ0eSB9IGZyb20gJy4uL2ZyYW1ld29yay91dGlsJztcclxuaW1wb3J0IHsgQ2Fubm9uV29ybGQgfSBmcm9tICcuL2Nhbm5vbi13b3JsZCc7XHJcbmltcG9ydCB7IENhbm5vblNoYXBlIH0gZnJvbSAnLi9zaGFwZXMvY2Fubm9uLXNoYXBlJztcclxuaW1wb3J0IHsgQ29sbGlkZXIzRCB9IGZyb20gJy4uL2V4cG9ydHMvcGh5c2ljcy1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBDb2xsaXNpb25FdmVudFR5cGUgfSBmcm9tICcuLi9mcmFtZXdvcmsvcGh5c2ljcy1pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDYW5ub25SaWdpZEJvZHkgfSBmcm9tICcuL2Nhbm5vbi1yaWdpZC1ib2R5JztcclxuaW1wb3J0IHsgY29tbWl0U2hhcGVVcGRhdGVzLCBncm91cEluZGV4VG9CaXRNYXNrLCBkZXByZWNhdGVkRXZlbnRNYXAgfSBmcm9tICcuL2Nhbm5vbi11dGlsJ1xyXG5cclxuY29uc3QgTG9jYWxEaXJ0eUZsYWcgPSBjYy5Ob2RlLl9Mb2NhbERpcnR5RmxhZztcclxuY29uc3QgUEhZU0lDU19TQ0FMRSA9IExvY2FsRGlydHlGbGFnLlBIWVNJQ1NfU0NBTEU7XHJcbmNvbnN0IFF1YXQgPSBjYy5RdWF0O1xyXG5jb25zdCBWZWMzID0gY2MuVmVjMztcclxuY29uc3QgZmFzdFJlbW92ZUF0ID0gY2MuanMuYXJyYXkuZmFzdFJlbW92ZUF0O1xyXG5jb25zdCB2M18wID0gbmV3IFZlYzMoKTtcclxuY29uc3QgcXVhdF8wID0gbmV3IFF1YXQoKTtcclxuY29uc3QgY29udGFjdHNQb29sID0gW10gYXMgYW55O1xyXG5jb25zdCBDb2xsaXNpb25FdmVudE9iamVjdCA9IHtcclxuICAgIHR5cGU6ICdjb2xsaXNpb24tZW50ZXInIGFzIENvbGxpc2lvbkV2ZW50VHlwZSxcclxuICAgIHNlbGZDb2xsaWRlcjogbnVsbCBhcyBDb2xsaWRlcjNEIHwgbnVsbCxcclxuICAgIG90aGVyQ29sbGlkZXI6IG51bGwgYXMgQ29sbGlkZXIzRCB8IG51bGwsXHJcbiAgICBjb250YWN0czogW10gYXMgYW55LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIHNoYXJlZGJvZHksIG5vZGUgOiBzaGFyZWRib2R5ID0gMSA6IDFcclxuICogc3RhdGljXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ2Fubm9uU2hhcmVkQm9keSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc2hhcmVkQm9kaWVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIENhbm5vblNoYXJlZEJvZHk+KCk7XHJcblxyXG4gICAgc3RhdGljIGdldFNoYXJlZEJvZHkgKG5vZGU6IGNjLk5vZGUsIHdyYXBwZWRXb3JsZDogQ2Fubm9uV29ybGQpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBub2RlLl9pZDtcclxuICAgICAgICBpZiAoQ2Fubm9uU2hhcmVkQm9keS5zaGFyZWRCb2RpZXNNYXAuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENhbm5vblNoYXJlZEJvZHkuc2hhcmVkQm9kaWVzTWFwLmdldChrZXkpITtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdTQiA9IG5ldyBDYW5ub25TaGFyZWRCb2R5KG5vZGUsIHdyYXBwZWRXb3JsZCk7XHJcbiAgICAgICAgICAgIENhbm5vblNoYXJlZEJvZHkuc2hhcmVkQm9kaWVzTWFwLnNldChub2RlLl9pZCwgbmV3U0IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3U0I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlYWRvbmx5IG5vZGU6IGNjLk5vZGU7XHJcbiAgICByZWFkb25seSB3cmFwcGVkV29ybGQ6IENhbm5vbldvcmxkO1xyXG4gICAgcmVhZG9ubHkgYm9keTogQ0FOTk9OLkJvZHkgPSBuZXcgQ0FOTk9OLkJvZHkoKTtcclxuICAgIHJlYWRvbmx5IHNoYXBlczogQ2Fubm9uU2hhcGVbXSA9IFtdO1xyXG4gICAgd3JhcHBlZEJvZHk6IENhbm5vblJpZ2lkQm9keSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSByZWY6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIG9uQ29sbGlkZWRMaXN0ZW5lciA9IHRoaXMub25Db2xsaWRlZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIG9yIHJlbW92ZSBmcm9tIHdvcmxkIFxcXHJcbiAgICAgKiBhZGQsIGlmIGVuYWJsZSBcXFxyXG4gICAgICogcmVtb3ZlLCBpZiBkaXNhYmxlICYgc2hhcGVzLmxlbmd0aCA9PSAwICYgd3JhcHBlZEJvZHkgZGlzYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXQgZW5hYmxlZCAodjogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMud3JhcHBlZFdvcmxkLmJvZGllcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZWRXb3JsZC5hZGRTaGFyZWRCb2R5KHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgLy8gYm9keSB3b3JsZCBhYWJiIG5lZWQgdG8gYmUgcmVjYWxjdWxhdGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuYWFiYk5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0V29ybGRQb3NpdGlvbih2M18wKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0V29ybGRSb3RhdGlvbihxdWF0XzApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuYm9keS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHBvcy54ID0gcGFyc2VGbG9hdCh2M18wLngudG9GaXhlZCgzKSk7XHJcbiAgICAgICAgICAgICAgICBwb3MueSA9IHBhcnNlRmxvYXQodjNfMC55LnRvRml4ZWQoMykpO1xyXG4gICAgICAgICAgICAgICAgcG9zLnogPSBwYXJzZUZsb2F0KHYzXzAuei50b0ZpeGVkKDMpKTtcclxuICAgICAgICAgICAgICAgIHZhciByb3QgPSB0aGlzLmJvZHkucXVhdGVybmlvbjtcclxuICAgICAgICAgICAgICAgIHJvdC54ID0gcGFyc2VGbG9hdChxdWF0XzAueC50b0ZpeGVkKDEyKSk7XHJcbiAgICAgICAgICAgICAgICByb3QueSA9IHBhcnNlRmxvYXQocXVhdF8wLnkudG9GaXhlZCgxMikpO1xyXG4gICAgICAgICAgICAgICAgcm90LnogPSBwYXJzZUZsb2F0KHF1YXRfMC56LnRvRml4ZWQoMTIpKTtcclxuICAgICAgICAgICAgICAgIHJvdC53ID0gcGFyc2VGbG9hdChxdWF0XzAudy50b0ZpeGVkKDEyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2xvY2FsTWF0RGlydHkgJiBQSFlTSUNTX1NDQUxFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdzY2FsZSA9IG5vZGUuX193c2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlc1tpXS5zZXRTY2FsZSh3c2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb21taXRTaGFwZVVwZGF0ZXModGhpcy5ib2R5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ib2R5LmlzU2xlZXBpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9keS53YWtlVXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVtb3ZlID0gKHRoaXMuc2hhcGVzLmxlbmd0aCA9PSAwICYmIHRoaXMud3JhcHBlZEJvZHkgPT0gbnVsbCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zaGFwZXMubGVuZ3RoID09IDAgJiYgdGhpcy53cmFwcGVkQm9keSAhPSBudWxsICYmICF0aGlzLndyYXBwZWRCb2R5LnJpZ2lkQm9keS5lbmFibGVkSW5IaWVyYXJjaHkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2hhcGVzLmxlbmd0aCA9PSAwICYmIHRoaXMud3JhcHBlZEJvZHkgIT0gbnVsbCAmJiAhdGhpcy53cmFwcGVkQm9keS5pc0VuYWJsZWQpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5LnNsZWVwKCk7IC8vIGNsZWFyIHZlbG9jaXR5IGV0Yy5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwcGVkV29ybGQucmVtb3ZlU2hhcmVkQm9keSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVmZXJlbmNlICh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdiA/IHRoaXMucmVmKysgOiB0aGlzLnJlZi0tO1xyXG4gICAgICAgIGlmICh0aGlzLnJlZiA9PSAwKSB7IHRoaXMuZGVzdHJveSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAobm9kZTogY2MuTm9kZSwgd3JhcHBlZFdvcmxkOiBDYW5ub25Xb3JsZCkge1xyXG4gICAgICAgIHRoaXMud3JhcHBlZFdvcmxkID0gd3JhcHBlZFdvcmxkO1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICAgICAgdGhpcy5ib2R5Lm1hdGVyaWFsID0gdGhpcy53cmFwcGVkV29ybGQud29ybGQuZGVmYXVsdE1hdGVyaWFsO1xyXG4gICAgICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjYy1jb2xsaWRlJywgdGhpcy5vbkNvbGxpZGVkTGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkdST1VQX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUdyb3VwLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlR3JvdXAgKCkge1xyXG4gICAgICAgIGdyb3VwSW5kZXhUb0JpdE1hc2sodGhpcy5ub2RlLmdyb3VwSW5kZXgsIHRoaXMuYm9keSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU2hhcGUgKHY6IENhbm5vblNoYXBlKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNoYXBlcy5pbmRleE9mKHYpO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmJvZHkuc2hhcGVzLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LmFkZFNoYXBlKHYuc2hhcGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlcy5wdXNoKHYpO1xyXG5cclxuICAgICAgICAgICAgdi5zZXRJbmRleChpbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuYm9keS5zaGFwZU9mZnNldHNbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBvcmllbnQgPSB0aGlzLmJvZHkuc2hhcGVPcmllbnRhdGlvbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICB2LnNldE9mZnNldEFuZE9yaWVudChvZmZzZXQsIG9yaWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNoYXBlICh2OiBDYW5ub25TaGFwZSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zaGFwZXMuaW5kZXhPZih2KTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBmYXN0UmVtb3ZlQXQodGhpcy5zaGFwZXMsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5ib2R5LnJlbW92ZVNoYXBlKHYuc2hhcGUpO1xyXG4gICAgICAgICAgICB2LnNldEluZGV4KC0xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY1NjZW5lVG9QaHlzaWNzIChmb3JjZSA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbGV0IG5lZWRVcGRhdGVUcmFuc2Zvcm0gPSB3b3JsZERpcnR5KG5vZGUpO1xyXG4gICAgICAgIGlmICghZm9yY2UgJiYgIW5lZWRVcGRhdGVUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBib2R5IHdvcmxkIGFhYmIgbmVlZCB0byBiZSByZWNhbGN1bGF0ZWRcclxuICAgICAgICB0aGlzLmJvZHkuYWFiYk5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBub2RlLmdldFdvcmxkUG9zaXRpb24odjNfMCk7XHJcbiAgICAgICAgbm9kZS5nZXRXb3JsZFJvdGF0aW9uKHF1YXRfMClcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5ib2R5LnBvc2l0aW9uLCB2M18wKTtcclxuICAgICAgICBRdWF0LmNvcHkodGhpcy5ib2R5LnF1YXRlcm5pb24sIHF1YXRfMCk7XHJcblxyXG4gICAgICAgIGlmIChub2RlLl9sb2NhbE1hdERpcnR5ICYgUEhZU0lDU19TQ0FMRSkge1xyXG4gICAgICAgICAgICBsZXQgd3NjYWxlID0gbm9kZS5fX3dzY2FsZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZXNbaV0uc2V0U2NhbGUod3NjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21taXRTaGFwZVVwZGF0ZXModGhpcy5ib2R5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keS53YWtlVXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3luY1BoeXNpY3NUb1NjZW5lICgpIHtcclxuICAgICAgICBpZiAodGhpcy5ib2R5LnR5cGUgIT0gRVJpZ2lkQm9keVR5cGUuU1RBVElDICYmICF0aGlzLmJvZHkuaXNTbGVlcGluZygpKSB7XHJcbiAgICAgICAgICAgIFZlYzMuY29weSh2M18wLCB0aGlzLmJvZHkucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBRdWF0LmNvcHkocXVhdF8wLCB0aGlzLmJvZHkucXVhdGVybmlvbik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRXb3JsZFBvc2l0aW9uKHYzXzApO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0V29ybGRSb3RhdGlvbihxdWF0XzApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3Ryb3kgKCkge1xyXG4gICAgICAgIHRoaXMuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjYy1jb2xsaWRlJywgdGhpcy5vbkNvbGxpZGVkTGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuR1JPVVBfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JvdXAsIHRoaXMpO1xyXG4gICAgICAgIENhbm5vblNoYXJlZEJvZHkuc2hhcmVkQm9kaWVzTWFwLmRlbGV0ZSh0aGlzLm5vZGUuX2lkKTtcclxuICAgICAgICBkZWxldGUgQ0FOTk9OLldvcmxkWydpZFRvQm9keU1hcCddW3RoaXMuYm9keS5pZF07XHJcbiAgICAgICAgKHRoaXMubm9kZSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy53cmFwcGVkV29ybGQgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuYm9keSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5zaGFwZXMgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMub25Db2xsaWRlZExpc3RlbmVyIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db2xsaWRlZCAoZXZlbnQ6IENBTk5PTi5JQ29sbGlzaW9uRXZlbnQpIHtcclxuICAgICAgICBDb2xsaXNpb25FdmVudE9iamVjdC50eXBlID0gZXZlbnQuZXZlbnQ7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IGdldFdyYXA8Q2Fubm9uU2hhcGU+KGV2ZW50LnNlbGZTaGFwZSk7XHJcbiAgICAgICAgY29uc3Qgb3RoZXIgPSBnZXRXcmFwPENhbm5vblNoYXBlPihldmVudC5vdGhlclNoYXBlKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYpIHtcclxuICAgICAgICAgICAgQ29sbGlzaW9uRXZlbnRPYmplY3Quc2VsZkNvbGxpZGVyID0gc2VsZi5jb2xsaWRlcjtcclxuICAgICAgICAgICAgQ29sbGlzaW9uRXZlbnRPYmplY3Qub3RoZXJDb2xsaWRlciA9IG90aGVyID8gb3RoZXIuY29sbGlkZXIgOiBudWxsO1xyXG4gICAgICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IENvbGxpc2lvbkV2ZW50T2JqZWN0LmNvbnRhY3RzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgICAgICAgICAgY29udGFjdHNQb29sLnB1c2goQ29sbGlzaW9uRXZlbnRPYmplY3QuY29udGFjdHMucG9wKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnQuY29udGFjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNxID0gZXZlbnQuY29udGFjdHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGFjdHNQb29sLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjID0gY29udGFjdHNQb29sLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlYzMuY29weShjLmNvbnRhY3RBLCBjcS5yaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjMy5jb3B5KGMuY29udGFjdEIsIGNxLnJqKTtcclxuICAgICAgICAgICAgICAgICAgICBWZWMzLmNvcHkoYy5ub3JtYWwsIGNxLm5pKTtcclxuICAgICAgICAgICAgICAgICAgICBDb2xsaXNpb25FdmVudE9iamVjdC5jb250YWN0cy5wdXNoKGMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0QTogVmVjMy5jb3B5KG5ldyBWZWMzKCksIGNxLnJpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdEI6IFZlYzMuY29weShuZXcgVmVjMygpLCBjcS5yaiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vcm1hbDogVmVjMy5jb3B5KG5ldyBWZWMzKCksIGNxLm5pKSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIENvbGxpc2lvbkV2ZW50T2JqZWN0LmNvbnRhY3RzLnB1c2goYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSB0aGlzLnNoYXBlc1tpXTtcclxuICAgICAgICAgICAgICAgIENvbGxpc2lvbkV2ZW50T2JqZWN0LnR5cGUgPSBkZXByZWNhdGVkRXZlbnRNYXBbQ29sbGlzaW9uRXZlbnRPYmplY3QudHlwZV07XHJcbiAgICAgICAgICAgICAgICBzaGFwZS5jb2xsaWRlci5lbWl0KENvbGxpc2lvbkV2ZW50T2JqZWN0LnR5cGUsIENvbGxpc2lvbkV2ZW50T2JqZWN0KTtcclxuICAgICAgICAgICAgICAgIC8vIGFkYXB0IFxyXG4gICAgICAgICAgICAgICAgQ29sbGlzaW9uRXZlbnRPYmplY3QudHlwZSA9IGV2ZW50LmV2ZW50O1xyXG4gICAgICAgICAgICAgICAgc2hhcGUuY29sbGlkZXIuZW1pdChDb2xsaXNpb25FdmVudE9iamVjdC50eXBlLCBDb2xsaXNpb25FdmVudE9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==