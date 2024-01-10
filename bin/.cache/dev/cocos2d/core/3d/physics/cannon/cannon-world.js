
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-world.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonWorld = void 0;

var _cannon = _interopRequireDefault(require("../../../../../external/cannon/cannon"));

var _cannonUtil = require("./cannon-util");

var _cannonShape = require("./shapes/cannon-shape");

var _cannonSharedBody = require("./cannon-shared-body");

var _util = require("../framework/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vec3 = cc.Vec3;
var fastRemoveAt = cc.js.array.fastRemoveAt;

var CannonWorld = /*#__PURE__*/function () {
  function CannonWorld() {
    this.bodies = [];
    this._world = void 0;
    this._raycastResult = new _cannon["default"].RaycastResult();
    this._world = new _cannon["default"].World();
    this._world.broadphase = new _cannon["default"].NaiveBroadphase();

    this._world.addEventListener("postStep", this.onPostStep.bind(this));
  }

  var _proto = CannonWorld.prototype;

  _proto.onPostStep = function onPostStep() {
    var p3dm = cc.director.getPhysics3DManager();

    if (p3dm.useFixedDigit) {
      var pd = p3dm.fixDigits.position;
      var rd = p3dm.fixDigits.rotation;
      var bodies = this._world.bodies;

      for (var i = 0; i < bodies.length; i++) {
        var bi = bodies[i];

        if (bi.type != _cannon["default"].Body.STATIC && !bi.isSleeping()) {
          var pos = bi.position;
          pos.x = parseFloat(pos.x.toFixed(pd));
          pos.y = parseFloat(pos.y.toFixed(pd));
          pos.z = parseFloat(pos.z.toFixed(pd));
          var rot = bi.quaternion;
          rot.x = parseFloat(rot.x.toFixed(rd));
          rot.y = parseFloat(rot.y.toFixed(rd));
          rot.z = parseFloat(rot.z.toFixed(rd));
          rot.w = parseFloat(rot.w.toFixed(rd));
          var vel = bi.velocity;
          vel.x = parseFloat(vel.x.toFixed(pd));
          vel.y = parseFloat(vel.y.toFixed(pd));
          vel.z = parseFloat(vel.z.toFixed(pd));
          var avel = bi.angularVelocity;
          avel.x = parseFloat(avel.x.toFixed(pd));
          avel.y = parseFloat(avel.y.toFixed(pd));
          avel.z = parseFloat(avel.z.toFixed(pd));
        }
      }
    }
  };

  _proto.step = function step(deltaTime, timeSinceLastCalled, maxSubStep) {
    this.syncSceneToPhysics();

    this._world.step(deltaTime, timeSinceLastCalled, maxSubStep);

    this.syncPhysicsToScene();
    this.emitEvents();
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics() {
    (0, _util.clearNodeTransformRecord)(); // sync scene to physics

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncSceneToPhysics();
    }

    (0, _util.clearNodeTransformDirtyFlag)();
  };

  _proto.syncPhysicsToScene = function syncPhysicsToScene() {
    // sync physics to scene
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].syncPhysicsToScene();
    }
  };

  _proto.emitEvents = function emitEvents() {
    this._world.emitTriggeredEvents();

    this._world.emitCollisionEvents();
  };

  _proto.raycastClosest = function raycastClosest(worldRay, options, result) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    var hit = this._world.raycastClosest(from, to, raycastOpt, this._raycastResult);

    if (hit) {
      (0, _cannonUtil.fillRaycastResult)(result, this._raycastResult);
    }

    return hit;
  };

  _proto.raycast = function raycast(worldRay, options, pool, results) {
    setupFromAndTo(worldRay, options.maxDistance);
    (0, _cannonUtil.toCannonRaycastOptions)(raycastOpt, options);

    var hit = this._world.raycastAll(from, to, raycastOpt, function (result) {
      var r = pool.add();
      (0, _cannonUtil.fillRaycastResult)(r, result);
      results.push(r);
    });

    return hit;
  };

  _proto.getSharedBody = function getSharedBody(node) {
    return _cannonSharedBody.CannonSharedBody.getSharedBody(node, this);
  };

  _proto.addSharedBody = function addSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i < 0) {
      this.bodies.push(sharedBody);

      this._world.addBody(sharedBody.body);
    }
  };

  _proto.removeSharedBody = function removeSharedBody(sharedBody) {
    var i = this.bodies.indexOf(sharedBody);

    if (i >= 0) {
      fastRemoveAt(this.bodies, i);

      this._world.remove(sharedBody.body);
    }
  };

  _createClass(CannonWorld, [{
    key: "world",
    get: function get() {
      return this._world;
    }
  }, {
    key: "defaultMaterial",
    set: function set(mat) {
      this._world.defaultMaterial.friction = mat.friction;
      this._world.defaultMaterial.restitution = mat.restitution;

      if (_cannonShape.CannonShape.idToMaterial[mat._uuid] != null) {
        _cannonShape.CannonShape.idToMaterial[mat._uuid] = this._world.defaultMaterial;
      }
    }
  }, {
    key: "allowSleep",
    set: function set(v) {
      this._world.allowSleep = v;
    }
  }, {
    key: "gravity",
    set: function set(gravity) {
      Vec3.copy(this._world.gravity, gravity);
    }
  }]);

  return CannonWorld;
}();

exports.CannonWorld = CannonWorld;
var from = new _cannon["default"].Vec3();
var to = new _cannon["default"].Vec3();

function setupFromAndTo(worldRay, distance) {
  Vec3.copy(from, worldRay.o);
  worldRay.computeHit(to, distance);
}

var raycastOpt = {
  'checkCollisionResponse': false,
  'collisionFilterGroup': -1,
  'collisionFilterMask': -1,
  'skipBackFaces': false
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXGNhbm5vbi13b3JsZC50cyJdLCJuYW1lcyI6WyJWZWMzIiwiY2MiLCJmYXN0UmVtb3ZlQXQiLCJqcyIsImFycmF5IiwiQ2Fubm9uV29ybGQiLCJib2RpZXMiLCJfd29ybGQiLCJfcmF5Y2FzdFJlc3VsdCIsIkNBTk5PTiIsIlJheWNhc3RSZXN1bHQiLCJXb3JsZCIsImJyb2FkcGhhc2UiLCJOYWl2ZUJyb2FkcGhhc2UiLCJhZGRFdmVudExpc3RlbmVyIiwib25Qb3N0U3RlcCIsImJpbmQiLCJwM2RtIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzM0RNYW5hZ2VyIiwidXNlRml4ZWREaWdpdCIsInBkIiwiZml4RGlnaXRzIiwicG9zaXRpb24iLCJyZCIsInJvdGF0aW9uIiwiaSIsImxlbmd0aCIsImJpIiwidHlwZSIsIkJvZHkiLCJTVEFUSUMiLCJpc1NsZWVwaW5nIiwicG9zIiwieCIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwieSIsInoiLCJyb3QiLCJxdWF0ZXJuaW9uIiwidyIsInZlbCIsInZlbG9jaXR5IiwiYXZlbCIsImFuZ3VsYXJWZWxvY2l0eSIsInN0ZXAiLCJkZWx0YVRpbWUiLCJ0aW1lU2luY2VMYXN0Q2FsbGVkIiwibWF4U3ViU3RlcCIsInN5bmNTY2VuZVRvUGh5c2ljcyIsInN5bmNQaHlzaWNzVG9TY2VuZSIsImVtaXRFdmVudHMiLCJlbWl0VHJpZ2dlcmVkRXZlbnRzIiwiZW1pdENvbGxpc2lvbkV2ZW50cyIsInJheWNhc3RDbG9zZXN0Iiwid29ybGRSYXkiLCJvcHRpb25zIiwicmVzdWx0Iiwic2V0dXBGcm9tQW5kVG8iLCJtYXhEaXN0YW5jZSIsInJheWNhc3RPcHQiLCJoaXQiLCJmcm9tIiwidG8iLCJyYXljYXN0IiwicG9vbCIsInJlc3VsdHMiLCJyYXljYXN0QWxsIiwiciIsImFkZCIsInB1c2giLCJnZXRTaGFyZWRCb2R5Iiwibm9kZSIsIkNhbm5vblNoYXJlZEJvZHkiLCJhZGRTaGFyZWRCb2R5Iiwic2hhcmVkQm9keSIsImluZGV4T2YiLCJhZGRCb2R5IiwiYm9keSIsInJlbW92ZVNoYXJlZEJvZHkiLCJyZW1vdmUiLCJtYXQiLCJkZWZhdWx0TWF0ZXJpYWwiLCJmcmljdGlvbiIsInJlc3RpdHV0aW9uIiwiQ2Fubm9uU2hhcGUiLCJpZFRvTWF0ZXJpYWwiLCJfdXVpZCIsInYiLCJhbGxvd1NsZWVwIiwiZ3Jhdml0eSIsImNvcHkiLCJkaXN0YW5jZSIsIm8iLCJjb21wdXRlSGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOzs7Ozs7OztBQUVBLElBQU1BLElBQUksR0FBR0MsRUFBRSxDQUFDRCxJQUFoQjtBQUNBLElBQU1FLFlBQVksR0FBR0QsRUFBRSxDQUFDRSxFQUFILENBQU1DLEtBQU4sQ0FBWUYsWUFBakM7O0lBRWFHO0FBMkJULHlCQUFlO0FBQUEsU0FMTkMsTUFLTSxHQUx1QixFQUt2QjtBQUFBLFNBSFBDLE1BR087QUFBQSxTQUZQQyxjQUVPLEdBRlUsSUFBSUMsbUJBQU9DLGFBQVgsRUFFVjtBQUNYLFNBQUtILE1BQUwsR0FBYyxJQUFJRSxtQkFBT0UsS0FBWCxFQUFkO0FBQ0EsU0FBS0osTUFBTCxDQUFZSyxVQUFaLEdBQXlCLElBQUlILG1CQUFPSSxlQUFYLEVBQXpCOztBQUNBLFNBQUtOLE1BQUwsQ0FBWU8sZ0JBQVosQ0FBNkIsVUFBN0IsRUFBeUMsS0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBekM7QUFDSDs7OztTQUVERCxhQUFBLHNCQUFjO0FBQ1YsUUFBTUUsSUFBSSxHQUFHaEIsRUFBRSxDQUFDaUIsUUFBSCxDQUFZQyxtQkFBWixFQUFiOztBQUNBLFFBQUlGLElBQUksQ0FBQ0csYUFBVCxFQUF3QjtBQUNwQixVQUFNQyxFQUFFLEdBQUdKLElBQUksQ0FBQ0ssU0FBTCxDQUFlQyxRQUExQjtBQUNBLFVBQU1DLEVBQUUsR0FBR1AsSUFBSSxDQUFDSyxTQUFMLENBQWVHLFFBQTFCO0FBQ0EsVUFBTW5CLE1BQU0sR0FBRyxLQUFLQyxNQUFMLENBQVlELE1BQTNCOztBQUNBLFdBQUssSUFBSW9CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdwQixNQUFNLENBQUNxQixNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxZQUFNRSxFQUFFLEdBQUd0QixNQUFNLENBQUNvQixDQUFELENBQWpCOztBQUNBLFlBQUdFLEVBQUUsQ0FBQ0MsSUFBSCxJQUFXcEIsbUJBQU9xQixJQUFQLENBQVlDLE1BQXZCLElBQWlDLENBQUNILEVBQUUsQ0FBQ0ksVUFBSCxFQUFyQyxFQUFxRDtBQUNqRCxjQUFNQyxHQUFHLEdBQUdMLEVBQUUsQ0FBQ0wsUUFBZjtBQUNBVSxVQUFBQSxHQUFHLENBQUNDLENBQUosR0FBUUMsVUFBVSxDQUFDRixHQUFHLENBQUNDLENBQUosQ0FBTUUsT0FBTixDQUFjZixFQUFkLENBQUQsQ0FBbEI7QUFDQVksVUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFGLFVBQVUsQ0FBQ0YsR0FBRyxDQUFDSSxDQUFKLENBQU1ELE9BQU4sQ0FBY2YsRUFBZCxDQUFELENBQWxCO0FBQ0FZLFVBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRSCxVQUFVLENBQUNGLEdBQUcsQ0FBQ0ssQ0FBSixDQUFNRixPQUFOLENBQWNmLEVBQWQsQ0FBRCxDQUFsQjtBQUNBLGNBQU1rQixHQUFHLEdBQUdYLEVBQUUsQ0FBQ1ksVUFBZjtBQUNBRCxVQUFBQSxHQUFHLENBQUNMLENBQUosR0FBUUMsVUFBVSxDQUFDSSxHQUFHLENBQUNMLENBQUosQ0FBTUUsT0FBTixDQUFjWixFQUFkLENBQUQsQ0FBbEI7QUFDQWUsVUFBQUEsR0FBRyxDQUFDRixDQUFKLEdBQVFGLFVBQVUsQ0FBQ0ksR0FBRyxDQUFDRixDQUFKLENBQU1ELE9BQU4sQ0FBY1osRUFBZCxDQUFELENBQWxCO0FBQ0FlLFVBQUFBLEdBQUcsQ0FBQ0QsQ0FBSixHQUFRSCxVQUFVLENBQUNJLEdBQUcsQ0FBQ0QsQ0FBSixDQUFNRixPQUFOLENBQWNaLEVBQWQsQ0FBRCxDQUFsQjtBQUNBZSxVQUFBQSxHQUFHLENBQUNFLENBQUosR0FBUU4sVUFBVSxDQUFDSSxHQUFHLENBQUNFLENBQUosQ0FBTUwsT0FBTixDQUFjWixFQUFkLENBQUQsQ0FBbEI7QUFDQSxjQUFNa0IsR0FBRyxHQUFHZCxFQUFFLENBQUNlLFFBQWY7QUFDQUQsVUFBQUEsR0FBRyxDQUFDUixDQUFKLEdBQVFDLFVBQVUsQ0FBQ08sR0FBRyxDQUFDUixDQUFKLENBQU1FLE9BQU4sQ0FBY2YsRUFBZCxDQUFELENBQWxCO0FBQ0FxQixVQUFBQSxHQUFHLENBQUNMLENBQUosR0FBUUYsVUFBVSxDQUFDTyxHQUFHLENBQUNMLENBQUosQ0FBTUQsT0FBTixDQUFjZixFQUFkLENBQUQsQ0FBbEI7QUFDQXFCLFVBQUFBLEdBQUcsQ0FBQ0osQ0FBSixHQUFRSCxVQUFVLENBQUNPLEdBQUcsQ0FBQ0osQ0FBSixDQUFNRixPQUFOLENBQWNmLEVBQWQsQ0FBRCxDQUFsQjtBQUNBLGNBQU11QixJQUFJLEdBQUdoQixFQUFFLENBQUNpQixlQUFoQjtBQUNBRCxVQUFBQSxJQUFJLENBQUNWLENBQUwsR0FBU0MsVUFBVSxDQUFDUyxJQUFJLENBQUNWLENBQUwsQ0FBT0UsT0FBUCxDQUFlZixFQUFmLENBQUQsQ0FBbkI7QUFDQXVCLFVBQUFBLElBQUksQ0FBQ1AsQ0FBTCxHQUFTRixVQUFVLENBQUNTLElBQUksQ0FBQ1AsQ0FBTCxDQUFPRCxPQUFQLENBQWVmLEVBQWYsQ0FBRCxDQUFuQjtBQUNBdUIsVUFBQUEsSUFBSSxDQUFDTixDQUFMLEdBQVNILFVBQVUsQ0FBQ1MsSUFBSSxDQUFDTixDQUFMLENBQU9GLE9BQVAsQ0FBZWYsRUFBZixDQUFELENBQW5CO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O1NBRUR5QixPQUFBLGNBQU1DLFNBQU4sRUFBeUJDLG1CQUF6QixFQUF1REMsVUFBdkQsRUFBNEU7QUFDeEUsU0FBS0Msa0JBQUw7O0FBQ0EsU0FBSzNDLE1BQUwsQ0FBWXVDLElBQVosQ0FBaUJDLFNBQWpCLEVBQTRCQyxtQkFBNUIsRUFBaURDLFVBQWpEOztBQUNBLFNBQUtFLGtCQUFMO0FBQ0EsU0FBS0MsVUFBTDtBQUNIOztTQUVERixxQkFBQSw4QkFBc0I7QUFDbEIsMENBRGtCLENBRWxCOztBQUNBLFNBQUssSUFBSXhCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3BCLE1BQUwsQ0FBWXFCLE1BQWhDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQ3pDLFdBQUtwQixNQUFMLENBQVlvQixDQUFaLEVBQWV3QixrQkFBZjtBQUNIOztBQUNEO0FBQ0g7O1NBRURDLHFCQUFBLDhCQUFzQjtBQUNsQjtBQUNBLFNBQUssSUFBSXpCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3BCLE1BQUwsQ0FBWXFCLE1BQWhDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQ3pDLFdBQUtwQixNQUFMLENBQVlvQixDQUFaLEVBQWV5QixrQkFBZjtBQUNIO0FBQ0o7O1NBRURDLGFBQUEsc0JBQWM7QUFDVixTQUFLN0MsTUFBTCxDQUFZOEMsbUJBQVo7O0FBQ0EsU0FBSzlDLE1BQUwsQ0FBWStDLG1CQUFaO0FBQ0g7O1NBRURDLGlCQUFBLHdCQUFnQkMsUUFBaEIsRUFBNENDLE9BQTVDLEVBQXNFQyxNQUF0RSxFQUF5RztBQUNyR0MsSUFBQUEsY0FBYyxDQUFDSCxRQUFELEVBQVdDLE9BQU8sQ0FBQ0csV0FBbkIsQ0FBZDtBQUNBLDRDQUF1QkMsVUFBdkIsRUFBbUNKLE9BQW5DOztBQUNBLFFBQU1LLEdBQUcsR0FBRyxLQUFLdkQsTUFBTCxDQUFZZ0QsY0FBWixDQUEyQlEsSUFBM0IsRUFBaUNDLEVBQWpDLEVBQXFDSCxVQUFyQyxFQUFpRCxLQUFLckQsY0FBdEQsQ0FBWjs7QUFDQSxRQUFJc0QsR0FBSixFQUFTO0FBQ0wseUNBQWtCSixNQUFsQixFQUEwQixLQUFLbEQsY0FBL0I7QUFDSDs7QUFDRCxXQUFPc0QsR0FBUDtBQUNIOztTQUVERyxVQUFBLGlCQUFTVCxRQUFULEVBQXFDQyxPQUFyQyxFQUErRFMsSUFBL0QsRUFBcUZDLE9BQXJGLEVBQTJIO0FBQ3ZIUixJQUFBQSxjQUFjLENBQUNILFFBQUQsRUFBV0MsT0FBTyxDQUFDRyxXQUFuQixDQUFkO0FBQ0EsNENBQXVCQyxVQUF2QixFQUFtQ0osT0FBbkM7O0FBQ0EsUUFBTUssR0FBRyxHQUFHLEtBQUt2RCxNQUFMLENBQVk2RCxVQUFaLENBQXVCTCxJQUF2QixFQUE2QkMsRUFBN0IsRUFBaUNILFVBQWpDLEVBQTZDLFVBQUNILE1BQUQsRUFBdUM7QUFDNUYsVUFBTVcsQ0FBQyxHQUFHSCxJQUFJLENBQUNJLEdBQUwsRUFBVjtBQUNBLHlDQUFrQkQsQ0FBbEIsRUFBcUJYLE1BQXJCO0FBQ0FTLE1BQUFBLE9BQU8sQ0FBQ0ksSUFBUixDQUFhRixDQUFiO0FBQ0gsS0FKVyxDQUFaOztBQUtBLFdBQU9QLEdBQVA7QUFDSDs7U0FFRFUsZ0JBQUEsdUJBQWVDLElBQWYsRUFBNkM7QUFDekMsV0FBT0MsbUNBQWlCRixhQUFqQixDQUErQkMsSUFBL0IsRUFBcUMsSUFBckMsQ0FBUDtBQUNIOztTQUVERSxnQkFBQSx1QkFBZUMsVUFBZixFQUE2QztBQUN6QyxRQUFNbEQsQ0FBQyxHQUFHLEtBQUtwQixNQUFMLENBQVl1RSxPQUFaLENBQW9CRCxVQUFwQixDQUFWOztBQUNBLFFBQUlsRCxDQUFDLEdBQUcsQ0FBUixFQUFXO0FBQ1AsV0FBS3BCLE1BQUwsQ0FBWWlFLElBQVosQ0FBaUJLLFVBQWpCOztBQUNBLFdBQUtyRSxNQUFMLENBQVl1RSxPQUFaLENBQW9CRixVQUFVLENBQUNHLElBQS9CO0FBQ0g7QUFDSjs7U0FFREMsbUJBQUEsMEJBQWtCSixVQUFsQixFQUFnRDtBQUM1QyxRQUFNbEQsQ0FBQyxHQUFHLEtBQUtwQixNQUFMLENBQVl1RSxPQUFaLENBQW9CRCxVQUFwQixDQUFWOztBQUNBLFFBQUlsRCxDQUFDLElBQUksQ0FBVCxFQUFZO0FBQ1J4QixNQUFBQSxZQUFZLENBQUMsS0FBS0ksTUFBTixFQUFjb0IsQ0FBZCxDQUFaOztBQUNBLFdBQUtuQixNQUFMLENBQVkwRSxNQUFaLENBQW1CTCxVQUFVLENBQUNHLElBQTlCO0FBQ0g7QUFDSjs7OztTQWpJRCxlQUFhO0FBQ1QsYUFBTyxLQUFLeEUsTUFBWjtBQUNIOzs7U0FFRCxhQUFxQjJFLEdBQXJCLEVBQTJDO0FBQ3ZDLFdBQUszRSxNQUFMLENBQVk0RSxlQUFaLENBQTRCQyxRQUE1QixHQUF1Q0YsR0FBRyxDQUFDRSxRQUEzQztBQUNBLFdBQUs3RSxNQUFMLENBQVk0RSxlQUFaLENBQTRCRSxXQUE1QixHQUEwQ0gsR0FBRyxDQUFDRyxXQUE5Qzs7QUFDQSxVQUFJQyx5QkFBWUMsWUFBWixDQUF5QkwsR0FBRyxDQUFDTSxLQUE3QixLQUF1QyxJQUEzQyxFQUFpRDtBQUM3Q0YsaUNBQVlDLFlBQVosQ0FBeUJMLEdBQUcsQ0FBQ00sS0FBN0IsSUFBc0MsS0FBS2pGLE1BQUwsQ0FBWTRFLGVBQWxEO0FBQ0g7QUFDSjs7O1NBRUQsYUFBZ0JNLENBQWhCLEVBQTRCO0FBQ3hCLFdBQUtsRixNQUFMLENBQVltRixVQUFaLEdBQXlCRCxDQUF6QjtBQUNIOzs7U0FFRCxhQUFhRSxPQUFiLEVBQStCO0FBQzNCM0YsTUFBQUEsSUFBSSxDQUFDNEYsSUFBTCxDQUFVLEtBQUtyRixNQUFMLENBQVlvRixPQUF0QixFQUErQkEsT0FBL0I7QUFDSDs7Ozs7OztBQWtITCxJQUFNNUIsSUFBSSxHQUFHLElBQUl0RCxtQkFBT1QsSUFBWCxFQUFiO0FBQ0EsSUFBTWdFLEVBQUUsR0FBRyxJQUFJdkQsbUJBQU9ULElBQVgsRUFBWDs7QUFDQSxTQUFTMkQsY0FBVCxDQUF5QkgsUUFBekIsRUFBcURxQyxRQUFyRCxFQUF1RTtBQUNuRTdGLEVBQUFBLElBQUksQ0FBQzRGLElBQUwsQ0FBVTdCLElBQVYsRUFBZ0JQLFFBQVEsQ0FBQ3NDLENBQXpCO0FBQ0F0QyxFQUFBQSxRQUFRLENBQUN1QyxVQUFULENBQW9CL0IsRUFBcEIsRUFBd0I2QixRQUF4QjtBQUNIOztBQUVELElBQU1oQyxVQUFrQyxHQUFHO0FBQ3ZDLDRCQUEwQixLQURhO0FBRXZDLDBCQUF3QixDQUFDLENBRmM7QUFHdkMseUJBQXVCLENBQUMsQ0FIZTtBQUl2QyxtQkFBaUI7QUFKc0IsQ0FBM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgQ0FOTk9OIGZyb20gJy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL2Nhbm5vbi9jYW5ub24nO1xyXG5pbXBvcnQgeyBmaWxsUmF5Y2FzdFJlc3VsdCwgdG9DYW5ub25SYXljYXN0T3B0aW9ucyB9IGZyb20gJy4vY2Fubm9uLXV0aWwnO1xyXG5pbXBvcnQgeyBDYW5ub25TaGFwZSB9IGZyb20gJy4vc2hhcGVzL2Nhbm5vbi1zaGFwZSc7XHJcbmltcG9ydCB7IENhbm5vblNoYXJlZEJvZHkgfSBmcm9tICcuL2Nhbm5vbi1zaGFyZWQtYm9keSc7XHJcbmltcG9ydCB7IElQaHlzaWNzV29ybGQsIElSYXljYXN0T3B0aW9ucyB9IGZyb20gJy4uL3NwZWMvaS1waHlzaWNzLXdvcmxkJztcclxuaW1wb3J0IHsgUGh5c2ljc01hdGVyaWFsLCBQaHlzaWNzUmF5UmVzdWx0IH0gZnJvbSAnLi4vZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgY2xlYXJOb2RlVHJhbnNmb3JtUmVjb3JkLCBjbGVhck5vZGVUcmFuc2Zvcm1EaXJ0eUZsYWcgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbCdcclxuXHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5jb25zdCBmYXN0UmVtb3ZlQXQgPSBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlQXQ7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2Fubm9uV29ybGQgaW1wbGVtZW50cyBJUGh5c2ljc1dvcmxkIHtcclxuXHJcbiAgICBnZXQgd29ybGQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGVmYXVsdE1hdGVyaWFsIChtYXQ6IFBoeXNpY3NNYXRlcmlhbCkge1xyXG4gICAgICAgIHRoaXMuX3dvcmxkLmRlZmF1bHRNYXRlcmlhbC5mcmljdGlvbiA9IG1hdC5mcmljdGlvbjtcclxuICAgICAgICB0aGlzLl93b3JsZC5kZWZhdWx0TWF0ZXJpYWwucmVzdGl0dXRpb24gPSBtYXQucmVzdGl0dXRpb247XHJcbiAgICAgICAgaWYgKENhbm5vblNoYXBlLmlkVG9NYXRlcmlhbFttYXQuX3V1aWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgQ2Fubm9uU2hhcGUuaWRUb01hdGVyaWFsW21hdC5fdXVpZF0gPSB0aGlzLl93b3JsZC5kZWZhdWx0TWF0ZXJpYWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBhbGxvd1NsZWVwICh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fd29ybGQuYWxsb3dTbGVlcCA9IHY7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGdyYXZpdHkgKGdyYXZpdHk6IGNjLlZlYzMpIHtcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5fd29ybGQuZ3Jhdml0eSwgZ3Jhdml0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVhZG9ubHkgYm9kaWVzOiBDYW5ub25TaGFyZWRCb2R5W10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIF93b3JsZDogQ0FOTk9OLldvcmxkO1xyXG4gICAgcHJpdmF0ZSBfcmF5Y2FzdFJlc3VsdCA9IG5ldyBDQU5OT04uUmF5Y2FzdFJlc3VsdCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl93b3JsZCA9IG5ldyBDQU5OT04uV29ybGQoKTtcclxuICAgICAgICB0aGlzLl93b3JsZC5icm9hZHBoYXNlID0gbmV3IENBTk5PTi5OYWl2ZUJyb2FkcGhhc2UoKTtcclxuICAgICAgICB0aGlzLl93b3JsZC5hZGRFdmVudExpc3RlbmVyKFwicG9zdFN0ZXBcIiwgdGhpcy5vblBvc3RTdGVwLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUG9zdFN0ZXAgKCkge1xyXG4gICAgICAgIGNvbnN0IHAzZG0gPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzM0RNYW5hZ2VyKCk7XHJcbiAgICAgICAgaWYgKHAzZG0udXNlRml4ZWREaWdpdCkge1xyXG4gICAgICAgICAgICBjb25zdCBwZCA9IHAzZG0uZml4RGlnaXRzLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCByZCA9IHAzZG0uZml4RGlnaXRzLnJvdGF0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBib2RpZXMgPSB0aGlzLl93b3JsZC5ib2RpZXM7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9kaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiaSA9IGJvZGllc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmKGJpLnR5cGUgIT0gQ0FOTk9OLkJvZHkuU1RBVElDICYmICFiaS5pc1NsZWVwaW5nKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IGJpLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcy54ID0gcGFyc2VGbG9hdChwb3MueC50b0ZpeGVkKHBkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zLnkgPSBwYXJzZUZsb2F0KHBvcy55LnRvRml4ZWQocGQpKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3MueiA9IHBhcnNlRmxvYXQocG9zLnoudG9GaXhlZChwZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdCA9IGJpLnF1YXRlcm5pb247XHJcbiAgICAgICAgICAgICAgICAgICAgcm90LnggPSBwYXJzZUZsb2F0KHJvdC54LnRvRml4ZWQocmQpKTtcclxuICAgICAgICAgICAgICAgICAgICByb3QueSA9IHBhcnNlRmxvYXQocm90LnkudG9GaXhlZChyZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdC56ID0gcGFyc2VGbG9hdChyb3Quei50b0ZpeGVkKHJkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm90LncgPSBwYXJzZUZsb2F0KHJvdC53LnRvRml4ZWQocmQpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZWwgPSBiaS52ZWxvY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICB2ZWwueCA9IHBhcnNlRmxvYXQodmVsLngudG9GaXhlZChwZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlbC55ID0gcGFyc2VGbG9hdCh2ZWwueS50b0ZpeGVkKHBkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVsLnogPSBwYXJzZUZsb2F0KHZlbC56LnRvRml4ZWQocGQpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhdmVsID0gYmkuYW5ndWxhclZlbG9jaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGF2ZWwueCA9IHBhcnNlRmxvYXQoYXZlbC54LnRvRml4ZWQocGQpKTtcclxuICAgICAgICAgICAgICAgICAgICBhdmVsLnkgPSBwYXJzZUZsb2F0KGF2ZWwueS50b0ZpeGVkKHBkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZlbC56ID0gcGFyc2VGbG9hdChhdmVsLnoudG9GaXhlZChwZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0ZXAgKGRlbHRhVGltZTogbnVtYmVyLCB0aW1lU2luY2VMYXN0Q2FsbGVkPzogbnVtYmVyLCBtYXhTdWJTdGVwPzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zeW5jU2NlbmVUb1BoeXNpY3MoKTtcclxuICAgICAgICB0aGlzLl93b3JsZC5zdGVwKGRlbHRhVGltZSwgdGltZVNpbmNlTGFzdENhbGxlZCwgbWF4U3ViU3RlcCk7XHJcbiAgICAgICAgdGhpcy5zeW5jUGh5c2ljc1RvU2NlbmUoKTtcclxuICAgICAgICB0aGlzLmVtaXRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzeW5jU2NlbmVUb1BoeXNpY3MgKCkge1xyXG4gICAgICAgIGNsZWFyTm9kZVRyYW5zZm9ybVJlY29yZCgpO1xyXG4gICAgICAgIC8vIHN5bmMgc2NlbmUgdG8gcGh5c2ljc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2RpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ib2RpZXNbaV0uc3luY1NjZW5lVG9QaHlzaWNzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsZWFyTm9kZVRyYW5zZm9ybURpcnR5RmxhZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmNQaHlzaWNzVG9TY2VuZSAoKSB7XHJcbiAgICAgICAgLy8gc3luYyBwaHlzaWNzIHRvIHNjZW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvZGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJvZGllc1tpXS5zeW5jUGh5c2ljc1RvU2NlbmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdEV2ZW50cyAoKSB7XHJcbiAgICAgICAgdGhpcy5fd29ybGQuZW1pdFRyaWdnZXJlZEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuX3dvcmxkLmVtaXRDb2xsaXNpb25FdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICByYXljYXN0Q2xvc2VzdCAod29ybGRSYXk6IGNjLmdlb21VdGlscy5SYXksIG9wdGlvbnM6IElSYXljYXN0T3B0aW9ucywgcmVzdWx0OiBQaHlzaWNzUmF5UmVzdWx0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgc2V0dXBGcm9tQW5kVG8od29ybGRSYXksIG9wdGlvbnMubWF4RGlzdGFuY2UpO1xyXG4gICAgICAgIHRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMocmF5Y2FzdE9wdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy5fd29ybGQucmF5Y2FzdENsb3Nlc3QoZnJvbSwgdG8sIHJheWNhc3RPcHQsIHRoaXMuX3JheWNhc3RSZXN1bHQpO1xyXG4gICAgICAgIGlmIChoaXQpIHtcclxuICAgICAgICAgICAgZmlsbFJheWNhc3RSZXN1bHQocmVzdWx0LCB0aGlzLl9yYXljYXN0UmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhpdDtcclxuICAgIH1cclxuXHJcbiAgICByYXljYXN0ICh3b3JsZFJheTogY2MuZ2VvbVV0aWxzLlJheSwgb3B0aW9uczogSVJheWNhc3RPcHRpb25zLCBwb29sOiBjYy5SZWN5Y2xlUG9vbCwgcmVzdWx0czogUGh5c2ljc1JheVJlc3VsdFtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgc2V0dXBGcm9tQW5kVG8od29ybGRSYXksIG9wdGlvbnMubWF4RGlzdGFuY2UpO1xyXG4gICAgICAgIHRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMocmF5Y2FzdE9wdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgaGl0ID0gdGhpcy5fd29ybGQucmF5Y2FzdEFsbChmcm9tLCB0bywgcmF5Y2FzdE9wdCwgKHJlc3VsdDogQ0FOTk9OLlJheWNhc3RSZXN1bHQpOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByID0gcG9vbC5hZGQoKTtcclxuICAgICAgICAgICAgZmlsbFJheWNhc3RSZXN1bHQociwgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBoaXRcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGFyZWRCb2R5IChub2RlOiBOb2RlKTogQ2Fubm9uU2hhcmVkQm9keSB7XHJcbiAgICAgICAgcmV0dXJuIENhbm5vblNoYXJlZEJvZHkuZ2V0U2hhcmVkQm9keShub2RlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRTaGFyZWRCb2R5IChzaGFyZWRCb2R5OiBDYW5ub25TaGFyZWRCb2R5KSB7XHJcbiAgICAgICAgY29uc3QgaSA9IHRoaXMuYm9kaWVzLmluZGV4T2Yoc2hhcmVkQm9keSk7XHJcbiAgICAgICAgaWYgKGkgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9kaWVzLnB1c2goc2hhcmVkQm9keSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLmFkZEJvZHkoc2hhcmVkQm9keS5ib2R5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlU2hhcmVkQm9keSAoc2hhcmVkQm9keTogQ2Fubm9uU2hhcmVkQm9keSkge1xyXG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLmJvZGllcy5pbmRleE9mKHNoYXJlZEJvZHkpO1xyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgZmFzdFJlbW92ZUF0KHRoaXMuYm9kaWVzLCBpKTtcclxuICAgICAgICAgICAgdGhpcy5fd29ybGQucmVtb3ZlKHNoYXJlZEJvZHkuYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBmcm9tID0gbmV3IENBTk5PTi5WZWMzKCk7XHJcbmNvbnN0IHRvID0gbmV3IENBTk5PTi5WZWMzKCk7XHJcbmZ1bmN0aW9uIHNldHVwRnJvbUFuZFRvICh3b3JsZFJheTogY2MuZ2VvbVV0aWxzLlJheSwgZGlzdGFuY2U6IG51bWJlcikge1xyXG4gICAgVmVjMy5jb3B5KGZyb20sIHdvcmxkUmF5Lm8pO1xyXG4gICAgd29ybGRSYXkuY29tcHV0ZUhpdCh0bywgZGlzdGFuY2UpO1xyXG59XHJcblxyXG5jb25zdCByYXljYXN0T3B0OiBDQU5OT04uSVJheWNhc3RPcHRpb25zID0ge1xyXG4gICAgJ2NoZWNrQ29sbGlzaW9uUmVzcG9uc2UnOiBmYWxzZSxcclxuICAgICdjb2xsaXNpb25GaWx0ZXJHcm91cCc6IC0xLFxyXG4gICAgJ2NvbGxpc2lvbkZpbHRlck1hc2snOiAtMSxcclxuICAgICdza2lwQmFja0ZhY2VzJzogZmFsc2VcclxufSJdLCJzb3VyY2VSb290IjoiLyJ9