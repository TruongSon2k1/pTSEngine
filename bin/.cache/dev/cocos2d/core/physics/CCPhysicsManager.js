
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCPhysicsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var PhysicsTypes = require('./CCPhysicsTypes');

var ContactType = PhysicsTypes.ContactType;
var BodyType = PhysicsTypes.BodyType;
var RayCastType = PhysicsTypes.RayCastType;
var DrawBits = PhysicsTypes.DrawBits;
var PTM_RATIO = PhysicsTypes.PTM_RATIO;
var ANGLE_TO_PHYSICS_ANGLE = PhysicsTypes.ANGLE_TO_PHYSICS_ANGLE;
var PHYSICS_ANGLE_TO_ANGLE = PhysicsTypes.PHYSICS_ANGLE_TO_ANGLE;

var convertToNodeRotation = require('./utils').convertToNodeRotation;

var DebugDraw = require('./platform/CCPhysicsDebugDraw');

var b2_aabb_tmp = new b2.AABB();
var b2_vec2_tmp1 = new b2.Vec2();
var b2_vec2_tmp2 = new b2.Vec2();
var vec2_tmp = cc.v2();
/**
 * !#en
 * Physics manager uses box2d as the inner physics system, and hide most box2d implement details(creating rigidbody, synchronize rigidbody info to node).
 * You can visit some common box2d function through physics manager(hit testing, raycast, debug info).
 * Physics manager distributes the collision information to each collision callback when collision is produced.
 * Note: You need first enable the collision listener in the rigidbody.
 * !#zh
 * 物理系统将 box2d 作为内部物理系统，并且隐藏了大部分 box2d 实现细节（比如创建刚体，同步刚体信息到节点中等）。
 * 你可以通过物理系统访问一些 box2d 常用的功能，比如点击测试，射线测试，设置测试信息等。
 * 物理系统还管理碰撞信息的分发，她会在产生碰撞时，将碰撞信息分发到各个碰撞回调中。
 * 注意：你需要先在刚体中开启碰撞接听才会产生相应的碰撞回调。<br>
 * 支持的物理系统指定绘制信息事件，请参阅 {{#crossLink "PhysicsManager.DrawBits"}}{{/crossLink}}
 * @class PhysicsManager
 * @uses EventTarget
 */

var PhysicsManager = cc.Class({
  mixins: [cc.EventTarget],
  statics: {
    DrawBits: DrawBits,

    /**
     * !#en
     * The ratio transform between physics unit and pixel unit, generally is 32.
     * !#zh
     * 物理单位与像素单位互相转换的比率，一般是 32。
     * @property {Number} PTM_RATIO
     * @static
     */
    PTM_RATIO: PTM_RATIO,

    /**
     * !#en
     * The velocity iterations for the velocity constraint solver.
     * !#zh
     * 速度更新迭代数
     * @property {Number} VELOCITY_ITERATIONS
     * @default 10
     * @static
     */
    VELOCITY_ITERATIONS: 10,

    /**
     * !#en
     * The position Iterations for the position constraint solver.
     * !#zh
     * 位置迭代更新数
     * @property {Number} POSITION_ITERATIONS
     * @default 10
     * @static
     */
    POSITION_ITERATIONS: 10,

    /**
     * !#en
     * Specify the fixed time step.
     * Need enabledAccumulator to make it work.
     * !#zh
     * 指定固定的物理更新间隔时间，需要开启 enabledAccumulator 才有效。
     * @property {Number} FIXED_TIME_STEP
     * @default 1/60
     * @static
     */
    FIXED_TIME_STEP: 1 / 60,

    /**
     * !#en
     * Specify the max accumulator time.
     * Need enabledAccumulator to make it work.
     * !#zh
     * 每次可用于更新物理系统的最大时间，需要开启 enabledAccumulator 才有效。
     * @property {Number} MAX_ACCUMULATOR
     * @default 1/5
     * @static
     */
    MAX_ACCUMULATOR: 1 / 5
  },
  ctor: function ctor() {
    this._debugDrawFlags = 0;
    this._debugDrawer = null;
    this._world = null;
    this._bodies = [];
    this._joints = [];
    this._contactMap = {};
    this._contactID = 0;
    this._delayEvents = [];
    this._accumulator = 0;
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    /**
     * !#en
     * If enabled accumulator, then will call step function with the fixed time step FIXED_TIME_STEP. 
     * And if the update dt is bigger than the time step, then will call step function several times.
     * If disabled accumulator, then will call step function with a time step calculated with the frame rate.
     * !#zh
     * 如果开启此选项，那么将会以固定的间隔时间 FIXED_TIME_STEP 来更新物理引擎，如果一个 update 的间隔时间大于 FIXED_TIME_STEP，则会对物理引擎进行多次更新。
     * 如果关闭此选项，那么将会根据设定的 frame rate 计算出一个间隔时间来更新物理引擎。
     * @property {Boolean} enabledAccumulator
     * @default false
     */

    this.enabledAccumulator = false;
  },
  pushDelayEvent: function pushDelayEvent(target, func, args) {
    if (this._steping) {
      this._delayEvents.push({
        target: target,
        func: func,
        args: args
      });
    } else {
      target[func].apply(target, args);
    }
  },
  update: function update(dt) {
    var world = this._world;
    if (!world || !this.enabled) return;
    this.emit('before-step');
    this._steping = true;
    var velocityIterations = PhysicsManager.VELOCITY_ITERATIONS;
    var positionIterations = PhysicsManager.POSITION_ITERATIONS;

    if (this.enabledAccumulator) {
      this._accumulator += dt;
      var FIXED_TIME_STEP = PhysicsManager.FIXED_TIME_STEP;
      var MAX_ACCUMULATOR = PhysicsManager.MAX_ACCUMULATOR; // max accumulator time to avoid spiral of death

      if (this._accumulator > MAX_ACCUMULATOR) {
        this._accumulator = MAX_ACCUMULATOR;
      }

      while (this._accumulator > FIXED_TIME_STEP) {
        world.Step(FIXED_TIME_STEP, velocityIterations, positionIterations);
        this._accumulator -= FIXED_TIME_STEP;
      }
    } else {
      //var timeStep = 1/cc.game.config['frameRate'];
      var timeStep = dt;
      world.Step(timeStep, velocityIterations, positionIterations);
    }

    if (this.debugDrawFlags) {
      this._checkDebugDrawValid();

      this._debugDrawer.clear();

      world.DrawDebugData();
    }

    this._steping = false;
    var events = this._delayEvents;

    for (var i = 0, l = events.length; i < l; i++) {
      var event = events[i];
      event.target[event.func].apply(event.target, event.args);
    }

    events.length = 0;

    this._syncNode();
  },

  /**
   * !#en
   * Test which collider contains the given world point
   * !#zh
   * 获取包含给定世界坐标系点的碰撞体
   * @method testPoint
   * @param {Vec2} point - the world point
   * @return {PhysicsCollider}
   */
  testPoint: function testPoint(point) {
    var x = b2_vec2_tmp1.x = point.x / PTM_RATIO;
    var y = b2_vec2_tmp1.y = point.y / PTM_RATIO;
    var d = 0.2 / PTM_RATIO;
    b2_aabb_tmp.lowerBound.x = x - d;
    b2_aabb_tmp.lowerBound.y = y - d;
    b2_aabb_tmp.upperBound.x = x + d;
    b2_aabb_tmp.upperBound.y = y + d;
    var callback = this._aabbQueryCallback;
    callback.init(b2_vec2_tmp1);

    this._world.QueryAABB(callback, b2_aabb_tmp);

    var fixture = callback.getFixture();

    if (fixture) {
      return fixture.collider;
    }

    return null;
  },

  /**
   * !#en
   * Test which colliders intersect the given world rect
   * !#zh
   * 获取与给定世界坐标系矩形相交的碰撞体
   * @method testAABB
   * @param {Rect} rect - the world rect
   * @return {[PhysicsCollider]}
   */
  testAABB: function testAABB(rect) {
    b2_aabb_tmp.lowerBound.x = rect.xMin / PTM_RATIO;
    b2_aabb_tmp.lowerBound.y = rect.yMin / PTM_RATIO;
    b2_aabb_tmp.upperBound.x = rect.xMax / PTM_RATIO;
    b2_aabb_tmp.upperBound.y = rect.yMax / PTM_RATIO;
    var callback = this._aabbQueryCallback;
    callback.init();

    this._world.QueryAABB(callback, b2_aabb_tmp);

    var fixtures = callback.getFixtures();
    var colliders = fixtures.map(function (fixture) {
      return fixture.collider;
    });
    return colliders;
  },

  /**
   * !#en
   * Raycast the world for all colliders in the path of the ray.
   * The raycast ignores colliders that contain the starting point.
   * !#zh
   * 检测哪些碰撞体在给定射线的路径上，射线检测将忽略包含起始点的碰撞体。
   * @method rayCast
   * @param {Vec2} p1 - start point of the raycast
   * @param {Vec2} p2 - end point of the raycast
   * @param {RayCastType} type - optional, default is RayCastType.Closest
   * @return {[PhysicsRayCastResult]}
   */
  rayCast: function rayCast(p1, p2, type) {
    if (p1.equals(p2)) {
      return [];
    }

    type = type || RayCastType.Closest;
    b2_vec2_tmp1.x = p1.x / PTM_RATIO;
    b2_vec2_tmp1.y = p1.y / PTM_RATIO;
    b2_vec2_tmp2.x = p2.x / PTM_RATIO;
    b2_vec2_tmp2.y = p2.y / PTM_RATIO;
    var callback = this._raycastQueryCallback;
    callback.init(type);

    this._world.RayCast(callback, b2_vec2_tmp1, b2_vec2_tmp2);

    var fixtures = callback.getFixtures();

    if (fixtures.length > 0) {
      var points = callback.getPoints();
      var normals = callback.getNormals();
      var fractions = callback.getFractions();
      var results = [];

      for (var i = 0, l = fixtures.length; i < l; i++) {
        var fixture = fixtures[i];
        var collider = fixture.collider;

        if (type === RayCastType.AllClosest) {
          var result = results.find(function (result) {
            return result.collider === collider;
          });

          if (result) {
            if (fractions[i] < result.fraction) {
              result.fixtureIndex = collider._getFixtureIndex(fixture);
              result.point.x = points[i].x * PTM_RATIO;
              result.point.y = points[i].y * PTM_RATIO;
              result.normal.x = normals[i].x;
              result.normal.y = normals[i].y;
              result.fraction = fractions[i];
            }

            continue;
          }
        }

        results.push({
          collider: collider,
          fixtureIndex: collider._getFixtureIndex(fixture),
          point: cc.v2(points[i].x * PTM_RATIO, points[i].y * PTM_RATIO),
          normal: cc.v2(normals[i]),
          fraction: fractions[i]
        });
      }

      return results;
    }

    return [];
  },
  syncPosition: function syncPosition() {
    var bodies = this._bodies;

    for (var i = 0; i < bodies.length; i++) {
      bodies[i].syncPosition();
    }
  },
  syncRotation: function syncRotation() {
    var bodies = this._bodies;

    for (var i = 0; i < bodies.length; i++) {
      bodies[i].syncRotation();
    }
  },
  _registerContactFixture: function _registerContactFixture(fixture) {
    this._contactListener.registerContactFixture(fixture);
  },
  _unregisterContactFixture: function _unregisterContactFixture(fixture) {
    this._contactListener.unregisterContactFixture(fixture);
  },
  _addBody: function _addBody(body, bodyDef) {
    var world = this._world;
    var node = body.node;
    if (!world || !node) return;
    body._b2Body = world.CreateBody(bodyDef);
    body._b2Body.body = body;

    this._bodies.push(body);
  },
  _removeBody: function _removeBody(body) {
    var world = this._world;
    if (!world) return;
    body._b2Body.body = null;
    world.DestroyBody(body._b2Body);
    body._b2Body = null;
    cc.js.array.remove(this._bodies, body);
  },
  _addJoint: function _addJoint(joint, jointDef) {
    var b2joint = this._world.CreateJoint(jointDef);

    if (!b2joint) return;
    b2joint._joint = joint;
    joint._joint = b2joint;

    this._joints.push(joint);
  },
  _removeJoint: function _removeJoint(joint) {
    if (joint._isValid()) {
      this._world.DestroyJoint(joint._joint);
    }

    if (joint._joint) {
      joint._joint._joint = null;
    }

    cc.js.array.remove(this._joints, joint);
  },
  _initCallback: function _initCallback() {
    if (!this._world) {
      cc.warn('Please init PhysicsManager first');
      return;
    }

    if (this._contactListener) return;
    var listener = new cc.PhysicsContactListener();
    listener.setBeginContact(this._onBeginContact);
    listener.setEndContact(this._onEndContact);
    listener.setPreSolve(this._onPreSolve);
    listener.setPostSolve(this._onPostSolve);

    this._world.SetContactListener(listener);

    this._contactListener = listener;
    this._aabbQueryCallback = new cc.PhysicsAABBQueryCallback();
    this._raycastQueryCallback = new cc.PhysicsRayCastCallback();
  },
  _init: function _init() {
    this.enabled = true;
    this.debugDrawFlags = DrawBits.e_shapeBit;
  },
  _getWorld: function _getWorld() {
    return this._world;
  },
  _syncNode: function _syncNode() {
    var bodies = this._bodies;

    for (var i = 0, l = bodies.length; i < l; i++) {
      var body = bodies[i];
      var node = body.node;
      var b2body = body._b2Body;
      var pos = b2body.GetPosition();
      vec2_tmp.x = pos.x * PTM_RATIO;
      vec2_tmp.y = pos.y * PTM_RATIO;
      var angle = b2body.GetAngle() * PHYSICS_ANGLE_TO_ANGLE; // When node's parent is not scene, convert position and rotation.

      if (node.parent.parent !== null) {
        vec2_tmp = node.parent.convertToNodeSpaceAR(vec2_tmp);
        angle = convertToNodeRotation(node.parent, angle);
      }

      var tempMask = node._eventMask;
      node._eventMask = 0; // sync position

      node.position = vec2_tmp; // sync rotation

      node.angle = -angle;
      node._eventMask = tempMask;

      if (body.type === BodyType.Animated) {
        body.resetVelocity();
      }
    }
  },
  _onBeginContact: function _onBeginContact(b2contact) {
    var c = cc.PhysicsContact.get(b2contact);
    c.emit(ContactType.BEGIN_CONTACT);
  },
  _onEndContact: function _onEndContact(b2contact) {
    var c = b2contact._contact;

    if (!c) {
      return;
    }

    c.emit(ContactType.END_CONTACT);
    cc.PhysicsContact.put(b2contact);
  },
  _onPreSolve: function _onPreSolve(b2contact) {
    var c = b2contact._contact;

    if (!c) {
      return;
    }

    c.emit(ContactType.PRE_SOLVE);
  },
  _onPostSolve: function _onPostSolve(b2contact, impulse) {
    var c = b2contact._contact;

    if (!c) {
      return;
    } // impulse only survive during post sole callback


    c._impulse = impulse;
    c.emit(ContactType.POST_SOLVE);
    c._impulse = null;
  },
  _checkDebugDrawValid: function _checkDebugDrawValid() {
    if (!this._debugDrawer || !this._debugDrawer.isValid) {
      var node = new cc.Node('PHYSICS_MANAGER_DEBUG_DRAW');
      node.zIndex = cc.macro.MAX_ZINDEX;
      cc.game.addPersistRootNode(node);
      this._debugDrawer = node.addComponent(cc.Graphics);
      var debugDraw = new DebugDraw(this._debugDrawer);
      debugDraw.SetFlags(this.debugDrawFlags);

      this._world.SetDebugDraw(debugDraw);
    }
  }
});
/**
 * !#en
 * Enabled the physics manager?
 * !#zh
 * 指定是否启用物理系统？
 * @property {Boolean} enabled
 * @default false
 */

cc.js.getset(PhysicsManager.prototype, 'enabled', function () {
  return this._enabled;
}, function (value) {
  if (CC_EDITOR) return;

  if (value && !this._world) {
    var world = new b2.World(new b2.Vec2(0, -10));
    world.SetAllowSleeping(true);
    this._world = world;

    this._initCallback();
  }

  this._enabled = value;
});
/**
 * !#en
 * Debug draw flags.
 * !#zh
 * 设置调试绘制标志
 * @property {Number} debugDrawFlags
 * @default 0
 * @example
 * // enable all debug draw info
 * var Bits = cc.PhysicsManager.DrawBits;
 * cc.director.getPhysicsManager().debugDrawFlags = Bits.e_aabbBit |
    Bits.e_pairBit |
    Bits.e_centerOfMassBit |
    Bits.e_jointBit |
    Bits.e_shapeBit;
 
 * // disable debug draw info
 * cc.director.getPhysicsManager().debugDrawFlags = 0;
 */

cc.js.getset(PhysicsManager.prototype, 'debugDrawFlags', function () {
  return this._debugDrawFlags;
}, function (value) {
  if (CC_EDITOR) return;

  if (value && !this._debugDrawFlags) {
    if (this._debugDrawer && this._debugDrawer.node) this._debugDrawer.node.active = true;
  } else if (!value && this._debugDrawFlags) {
    if (this._debugDrawer && this._debugDrawer.node) this._debugDrawer.node.active = false;
  }

  if (value) {
    this._checkDebugDrawValid();

    this._world.m_debugDraw.SetFlags(value);
  }

  this._debugDrawFlags = value;

  if (value) {
    this._checkDebugDrawValid();

    this._world.m_debugDraw.SetFlags(value);
  }
});
/**
 * !#en
 * The physics world gravity.
 * !#zh
 * 物理世界重力值
 * @property {Vec2} gravity
 */

cc.js.getset(PhysicsManager.prototype, 'gravity', function () {
  if (this._world) {
    var g = this._world.GetGravity();

    return cc.v2(g.x * PTM_RATIO, g.y * PTM_RATIO);
  }

  return cc.v2();
}, function (value) {
  if (this._world) {
    this._world.SetGravity(new b2.Vec2(value.x / PTM_RATIO, value.y / PTM_RATIO));
  }
});
cc.PhysicsManager = module.exports = PhysicsManager;
/**
 * !#en
 * The draw bits for drawing physics debug information.<br>
 * example:<br>
 * ```js
 * cc.director.getPhysicsManager().debugDrawFlags = 
 *  // cc.PhysicsManager.DrawBits.e_aabbBit |
 *  // cc.PhysicsManager.DrawBits.e_pairBit |
 *  // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
 *  cc.PhysicsManager.DrawBits.e_jointBit |
 *  cc.PhysicsManager.DrawBits.e_shapeBit;
 * ```
 * !#zh
 * 指定物理系统需要绘制哪些调试信息。<br>
 * example:<br>
 * ```js
 * cc.director.getPhysicsManager().debugDrawFlags = 
 *  // cc.PhysicsManager.DrawBits.e_aabbBit |
 *  // cc.PhysicsManager.DrawBits.e_pairBit |
 *  // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
 *  cc.PhysicsManager.DrawBits.e_jointBit |
 *  cc.PhysicsManager.DrawBits.e_shapeBit;
 * ```
 * @enum PhysicsManager.DrawBits
 * @static

 */

/**
 * !#en
 * Draw bounding boxes
 * !#zh
 * 绘制包围盒
 * @property {Number} e_aabbBit
 * @static
 */

/**
 * !#en
 * Draw joint connections
 * !#zh
 * 绘制关节链接信息
 * @property {Number} e_jointBit
 * @static
 */

/**
 * !#en
 * Draw shapes
 * !#zh
 * 绘制形状
 * @property {Number} e_shapeBit
 * @static
 */

/**
 * @class PhysicsRayCastResult
 */

/**
 * !#en
 * The PhysicsCollider which intersects with the raycast
 * !#zh
 * 与射线相交的碰撞体
 * @property {PhysicsCollider} collider
 */

/**
 * !#en
 * The intersection point
 * !#zh
 * 射线与碰撞体相交的点
 * @property {Vec2} point
 */

/**
 * !#en
 * The normal vector at the point of intersection
 * !#zh
 * 射线与碰撞体相交的点的法向量
 * @property {Vec2} normal
 */

/**
 * !#en
 * The fraction of the raycast path at the point of intersection
 * !#zh
 * 射线与碰撞体相交的点占射线长度的分数
 * @property {Number} fraction
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXENDUGh5c2ljc01hbmFnZXIuanMiXSwibmFtZXMiOlsiUGh5c2ljc1R5cGVzIiwicmVxdWlyZSIsIkNvbnRhY3RUeXBlIiwiQm9keVR5cGUiLCJSYXlDYXN0VHlwZSIsIkRyYXdCaXRzIiwiUFRNX1JBVElPIiwiQU5HTEVfVE9fUEhZU0lDU19BTkdMRSIsIlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEUiLCJjb252ZXJ0VG9Ob2RlUm90YXRpb24iLCJEZWJ1Z0RyYXciLCJiMl9hYWJiX3RtcCIsImIyIiwiQUFCQiIsImIyX3ZlYzJfdG1wMSIsIlZlYzIiLCJiMl92ZWMyX3RtcDIiLCJ2ZWMyX3RtcCIsImNjIiwidjIiLCJQaHlzaWNzTWFuYWdlciIsIkNsYXNzIiwibWl4aW5zIiwiRXZlbnRUYXJnZXQiLCJzdGF0aWNzIiwiVkVMT0NJVFlfSVRFUkFUSU9OUyIsIlBPU0lUSU9OX0lURVJBVElPTlMiLCJGSVhFRF9USU1FX1NURVAiLCJNQVhfQUNDVU1VTEFUT1IiLCJjdG9yIiwiX2RlYnVnRHJhd0ZsYWdzIiwiX2RlYnVnRHJhd2VyIiwiX3dvcmxkIiwiX2JvZGllcyIsIl9qb2ludHMiLCJfY29udGFjdE1hcCIsIl9jb250YWN0SUQiLCJfZGVsYXlFdmVudHMiLCJfYWNjdW11bGF0b3IiLCJkaXJlY3RvciIsIl9zY2hlZHVsZXIiLCJlbmFibGVGb3JUYXJnZXQiLCJlbmFibGVkQWNjdW11bGF0b3IiLCJwdXNoRGVsYXlFdmVudCIsInRhcmdldCIsImZ1bmMiLCJhcmdzIiwiX3N0ZXBpbmciLCJwdXNoIiwiYXBwbHkiLCJ1cGRhdGUiLCJkdCIsIndvcmxkIiwiZW5hYmxlZCIsImVtaXQiLCJ2ZWxvY2l0eUl0ZXJhdGlvbnMiLCJwb3NpdGlvbkl0ZXJhdGlvbnMiLCJTdGVwIiwidGltZVN0ZXAiLCJkZWJ1Z0RyYXdGbGFncyIsIl9jaGVja0RlYnVnRHJhd1ZhbGlkIiwiY2xlYXIiLCJEcmF3RGVidWdEYXRhIiwiZXZlbnRzIiwiaSIsImwiLCJsZW5ndGgiLCJldmVudCIsIl9zeW5jTm9kZSIsInRlc3RQb2ludCIsInBvaW50IiwieCIsInkiLCJkIiwibG93ZXJCb3VuZCIsInVwcGVyQm91bmQiLCJjYWxsYmFjayIsIl9hYWJiUXVlcnlDYWxsYmFjayIsImluaXQiLCJRdWVyeUFBQkIiLCJmaXh0dXJlIiwiZ2V0Rml4dHVyZSIsImNvbGxpZGVyIiwidGVzdEFBQkIiLCJyZWN0IiwieE1pbiIsInlNaW4iLCJ4TWF4IiwieU1heCIsImZpeHR1cmVzIiwiZ2V0Rml4dHVyZXMiLCJjb2xsaWRlcnMiLCJtYXAiLCJyYXlDYXN0IiwicDEiLCJwMiIsInR5cGUiLCJlcXVhbHMiLCJDbG9zZXN0IiwiX3JheWNhc3RRdWVyeUNhbGxiYWNrIiwiUmF5Q2FzdCIsInBvaW50cyIsImdldFBvaW50cyIsIm5vcm1hbHMiLCJnZXROb3JtYWxzIiwiZnJhY3Rpb25zIiwiZ2V0RnJhY3Rpb25zIiwicmVzdWx0cyIsIkFsbENsb3Nlc3QiLCJyZXN1bHQiLCJmaW5kIiwiZnJhY3Rpb24iLCJmaXh0dXJlSW5kZXgiLCJfZ2V0Rml4dHVyZUluZGV4Iiwibm9ybWFsIiwic3luY1Bvc2l0aW9uIiwiYm9kaWVzIiwic3luY1JvdGF0aW9uIiwiX3JlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJfY29udGFjdExpc3RlbmVyIiwicmVnaXN0ZXJDb250YWN0Rml4dHVyZSIsIl91bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJ1bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJfYWRkQm9keSIsImJvZHkiLCJib2R5RGVmIiwibm9kZSIsIl9iMkJvZHkiLCJDcmVhdGVCb2R5IiwiX3JlbW92ZUJvZHkiLCJEZXN0cm95Qm9keSIsImpzIiwiYXJyYXkiLCJyZW1vdmUiLCJfYWRkSm9pbnQiLCJqb2ludCIsImpvaW50RGVmIiwiYjJqb2ludCIsIkNyZWF0ZUpvaW50IiwiX2pvaW50IiwiX3JlbW92ZUpvaW50IiwiX2lzVmFsaWQiLCJEZXN0cm95Sm9pbnQiLCJfaW5pdENhbGxiYWNrIiwid2FybiIsImxpc3RlbmVyIiwiUGh5c2ljc0NvbnRhY3RMaXN0ZW5lciIsInNldEJlZ2luQ29udGFjdCIsIl9vbkJlZ2luQ29udGFjdCIsInNldEVuZENvbnRhY3QiLCJfb25FbmRDb250YWN0Iiwic2V0UHJlU29sdmUiLCJfb25QcmVTb2x2ZSIsInNldFBvc3RTb2x2ZSIsIl9vblBvc3RTb2x2ZSIsIlNldENvbnRhY3RMaXN0ZW5lciIsIlBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjayIsIlBoeXNpY3NSYXlDYXN0Q2FsbGJhY2siLCJfaW5pdCIsImVfc2hhcGVCaXQiLCJfZ2V0V29ybGQiLCJiMmJvZHkiLCJwb3MiLCJHZXRQb3NpdGlvbiIsImFuZ2xlIiwiR2V0QW5nbGUiLCJwYXJlbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInRlbXBNYXNrIiwiX2V2ZW50TWFzayIsInBvc2l0aW9uIiwiQW5pbWF0ZWQiLCJyZXNldFZlbG9jaXR5IiwiYjJjb250YWN0IiwiYyIsIlBoeXNpY3NDb250YWN0IiwiZ2V0IiwiQkVHSU5fQ09OVEFDVCIsIl9jb250YWN0IiwiRU5EX0NPTlRBQ1QiLCJwdXQiLCJQUkVfU09MVkUiLCJpbXB1bHNlIiwiX2ltcHVsc2UiLCJQT1NUX1NPTFZFIiwiaXNWYWxpZCIsIk5vZGUiLCJ6SW5kZXgiLCJtYWNybyIsIk1BWF9aSU5ERVgiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiYWRkQ29tcG9uZW50IiwiR3JhcGhpY3MiLCJkZWJ1Z0RyYXciLCJTZXRGbGFncyIsIlNldERlYnVnRHJhdyIsImdldHNldCIsInByb3RvdHlwZSIsIl9lbmFibGVkIiwidmFsdWUiLCJDQ19FRElUT1IiLCJXb3JsZCIsIlNldEFsbG93U2xlZXBpbmciLCJhY3RpdmUiLCJtX2RlYnVnRHJhdyIsImciLCJHZXRHcmF2aXR5IiwiU2V0R3Jhdml0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7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SSxDQUFOLEdBQVFqRSxTQUFwQixFQUErQmtNLEtBQUssQ0FBQ2hJLENBQU4sR0FBUWxFLFNBQXZDLENBQXZCO0FBQ0g7QUFDSixDQWJMO0FBaUJBWSxFQUFFLENBQUNFLGNBQUgsR0FBb0I2TCxNQUFNLENBQUNDLE9BQVAsR0FBaUI5TCxjQUFyQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBQaHlzaWNzVHlwZXMgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJyk7XHJcbmNvbnN0IENvbnRhY3RUeXBlID0gUGh5c2ljc1R5cGVzLkNvbnRhY3RUeXBlO1xyXG5jb25zdCBCb2R5VHlwZSA9IFBoeXNpY3NUeXBlcy5Cb2R5VHlwZTtcclxuY29uc3QgUmF5Q2FzdFR5cGUgPSBQaHlzaWNzVHlwZXMuUmF5Q2FzdFR5cGU7XHJcbmNvbnN0IERyYXdCaXRzID0gUGh5c2ljc1R5cGVzLkRyYXdCaXRzO1xyXG5cclxuY29uc3QgUFRNX1JBVElPID0gUGh5c2ljc1R5cGVzLlBUTV9SQVRJTztcclxuY29uc3QgQU5HTEVfVE9fUEhZU0lDU19BTkdMRSA9IFBoeXNpY3NUeXBlcy5BTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG5jb25zdCBQSFlTSUNTX0FOR0xFX1RPX0FOR0xFID0gUGh5c2ljc1R5cGVzLlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XHJcblxyXG5jb25zdCBjb252ZXJ0VG9Ob2RlUm90YXRpb24gPSByZXF1aXJlKCcuL3V0aWxzJykuY29udmVydFRvTm9kZVJvdGF0aW9uO1xyXG5jb25zdCBEZWJ1Z0RyYXcgPSByZXF1aXJlKCcuL3BsYXRmb3JtL0NDUGh5c2ljc0RlYnVnRHJhdycpO1xyXG5cclxudmFyIGIyX2FhYmJfdG1wID0gbmV3IGIyLkFBQkIoKTtcclxudmFyIGIyX3ZlYzJfdG1wMSA9IG5ldyBiMi5WZWMyKCk7XHJcbnZhciBiMl92ZWMyX3RtcDIgPSBuZXcgYjIuVmVjMigpO1xyXG5cclxudmFyIHZlYzJfdG1wID0gY2MudjIoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFBoeXNpY3MgbWFuYWdlciB1c2VzIGJveDJkIGFzIHRoZSBpbm5lciBwaHlzaWNzIHN5c3RlbSwgYW5kIGhpZGUgbW9zdCBib3gyZCBpbXBsZW1lbnQgZGV0YWlscyhjcmVhdGluZyByaWdpZGJvZHksIHN5bmNocm9uaXplIHJpZ2lkYm9keSBpbmZvIHRvIG5vZGUpLlxyXG4gKiBZb3UgY2FuIHZpc2l0IHNvbWUgY29tbW9uIGJveDJkIGZ1bmN0aW9uIHRocm91Z2ggcGh5c2ljcyBtYW5hZ2VyKGhpdCB0ZXN0aW5nLCByYXljYXN0LCBkZWJ1ZyBpbmZvKS5cclxuICogUGh5c2ljcyBtYW5hZ2VyIGRpc3RyaWJ1dGVzIHRoZSBjb2xsaXNpb24gaW5mb3JtYXRpb24gdG8gZWFjaCBjb2xsaXNpb24gY2FsbGJhY2sgd2hlbiBjb2xsaXNpb24gaXMgcHJvZHVjZWQuXHJcbiAqIE5vdGU6IFlvdSBuZWVkIGZpcnN0IGVuYWJsZSB0aGUgY29sbGlzaW9uIGxpc3RlbmVyIGluIHRoZSByaWdpZGJvZHkuXHJcbiAqICEjemhcclxuICog54mp55CG57O757uf5bCGIGJveDJkIOS9nOS4uuWGhemDqOeJqeeQhuezu+e7n++8jOW5tuS4lOmakOiXj+S6huWkp+mDqOWIhiBib3gyZCDlrp7njrDnu4boioLvvIjmr5TlpoLliJvlu7rliJrkvZPvvIzlkIzmraXliJrkvZPkv6Hmga/liLDoioLngrnkuK3nrYnvvInjgIJcclxuICog5L2g5Y+v5Lul6YCa6L+H54mp55CG57O757uf6K6/6Zeu5LiA5LqbIGJveDJkIOW4uOeUqOeahOWKn+iDve+8jOavlOWmgueCueWHu+a1i+ivle+8jOWwhOe6v+a1i+ivle+8jOiuvue9rua1i+ivleS/oeaBr+etieOAglxyXG4gKiDniannkIbns7vnu5/ov5jnrqHnkIbnorDmkp7kv6Hmga/nmoTliIblj5HvvIzlpbnkvJrlnKjkuqfnlJ/norDmkp7ml7bvvIzlsIbnorDmkp7kv6Hmga/liIblj5HliLDlkITkuKrnorDmkp7lm57osIPkuK3jgIJcclxuICog5rOo5oSP77ya5L2g6ZyA6KaB5YWI5Zyo5Yia5L2T5Lit5byA5ZCv56Kw5pKe5o6l5ZCs5omN5Lya5Lqn55Sf55u45bqU55qE56Kw5pKe5Zue6LCD44CCPGJyPlxyXG4gKiDmlK/mjIHnmoTniannkIbns7vnu5/mjIflrprnu5jliLbkv6Hmga/kuovku7bvvIzor7flj4LpmIUge3sjY3Jvc3NMaW5rIFwiUGh5c2ljc01hbmFnZXIuRHJhd0JpdHNcIn19e3svY3Jvc3NMaW5rfX1cclxuICogQGNsYXNzIFBoeXNpY3NNYW5hZ2VyXHJcbiAqIEB1c2VzIEV2ZW50VGFyZ2V0XHJcbiAqL1xyXG52YXIgUGh5c2ljc01hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBtaXhpbnM6IFtjYy5FdmVudFRhcmdldF0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIERyYXdCaXRzOiBEcmF3Qml0cyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSByYXRpbyB0cmFuc2Zvcm0gYmV0d2VlbiBwaHlzaWNzIHVuaXQgYW5kIHBpeGVsIHVuaXQsIGdlbmVyYWxseSBpcyAzMi5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog54mp55CG5Y2V5L2N5LiO5YOP57Sg5Y2V5L2N5LqS55u46L2s5o2i55qE5q+U546H77yM5LiA6Iis5pivIDMy44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBUTV9SQVRJT1xyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBQVE1fUkFUSU86IFBUTV9SQVRJTyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSB2ZWxvY2l0eSBpdGVyYXRpb25zIGZvciB0aGUgdmVsb2NpdHkgY29uc3RyYWludCBzb2x2ZXIuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmAn+W6puabtOaWsOi/reS7o+aVsFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRUxPQ0lUWV9JVEVSQVRJT05TXHJcbiAgICAgICAgICogQGRlZmF1bHQgMTBcclxuICAgICAgICAgKiBAc3RhdGljXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVkVMT0NJVFlfSVRFUkFUSU9OUzogMTAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgcG9zaXRpb24gSXRlcmF0aW9ucyBmb3IgdGhlIHBvc2l0aW9uIGNvbnN0cmFpbnQgc29sdmVyLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDkvY3nva7ov63ku6Pmm7TmlrDmlbBcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUE9TSVRJT05fSVRFUkFUSU9OU1xyXG4gICAgICAgICAqIEBkZWZhdWx0IDEwXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFBPU0lUSU9OX0lURVJBVElPTlM6IDEwLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogU3BlY2lmeSB0aGUgZml4ZWQgdGltZSBzdGVwLlxyXG4gICAgICAgICAqIE5lZWQgZW5hYmxlZEFjY3VtdWxhdG9yIHRvIG1ha2UgaXQgd29yay5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5oyH5a6a5Zu65a6a55qE54mp55CG5pu05paw6Ze06ZqU5pe26Ze077yM6ZyA6KaB5byA5ZCvIGVuYWJsZWRBY2N1bXVsYXRvciDmiY3mnInmlYjjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRklYRURfVElNRV9TVEVQXHJcbiAgICAgICAgICogQGRlZmF1bHQgMS82MFxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBGSVhFRF9USU1FX1NURVA6IDEvNjAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBTcGVjaWZ5IHRoZSBtYXggYWNjdW11bGF0b3IgdGltZS5cclxuICAgICAgICAgKiBOZWVkIGVuYWJsZWRBY2N1bXVsYXRvciB0byBtYWtlIGl0IHdvcmsuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOavj+asoeWPr+eUqOS6juabtOaWsOeJqeeQhuezu+e7n+eahOacgOWkp+aXtumXtO+8jOmcgOimgeW8gOWQryBlbmFibGVkQWNjdW11bGF0b3Ig5omN5pyJ5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1BWF9BQ0NVTVVMQVRPUlxyXG4gICAgICAgICAqIEBkZWZhdWx0IDEvNVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBNQVhfQUNDVU1VTEFUT1I6IDEvNVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVidWdEcmF3RmxhZ3MgPSAwO1xyXG4gICAgICAgIHRoaXMuX2RlYnVnRHJhd2VyID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fd29ybGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9ib2RpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9qb2ludHMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29udGFjdE1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2NvbnRhY3RJRCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2RlbGF5RXZlbnRzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2FjY3VtdWxhdG9yID0gMDtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuX3NjaGVkdWxlciAmJiBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIElmIGVuYWJsZWQgYWNjdW11bGF0b3IsIHRoZW4gd2lsbCBjYWxsIHN0ZXAgZnVuY3Rpb24gd2l0aCB0aGUgZml4ZWQgdGltZSBzdGVwIEZJWEVEX1RJTUVfU1RFUC4gXHJcbiAgICAgICAgICogQW5kIGlmIHRoZSB1cGRhdGUgZHQgaXMgYmlnZ2VyIHRoYW4gdGhlIHRpbWUgc3RlcCwgdGhlbiB3aWxsIGNhbGwgc3RlcCBmdW5jdGlvbiBzZXZlcmFsIHRpbWVzLlxyXG4gICAgICAgICAqIElmIGRpc2FibGVkIGFjY3VtdWxhdG9yLCB0aGVuIHdpbGwgY2FsbCBzdGVwIGZ1bmN0aW9uIHdpdGggYSB0aW1lIHN0ZXAgY2FsY3VsYXRlZCB3aXRoIHRoZSBmcmFtZSByYXRlLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlpoLmnpzlvIDlkK/mraTpgInpobnvvIzpgqPkuYjlsIbkvJrku6Xlm7rlrprnmoTpl7TpmpTml7bpl7QgRklYRURfVElNRV9TVEVQIOadpeabtOaWsOeJqeeQhuW8leaTju+8jOWmguaenOS4gOS4qiB1cGRhdGUg55qE6Ze06ZqU5pe26Ze05aSn5LqOIEZJWEVEX1RJTUVfU1RFUO+8jOWImeS8muWvueeJqeeQhuW8leaTjui/m+ihjOWkmuasoeabtOaWsOOAglxyXG4gICAgICAgICAqIOWmguaenOWFs+mXreatpOmAiemhue+8jOmCo+S5iOWwhuS8muagueaNruiuvuWumueahCBmcmFtZSByYXRlIOiuoeeul+WHuuS4gOS4qumXtOmalOaXtumXtOadpeabtOaWsOeJqeeQhuW8leaTjuOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlZEFjY3VtdWxhdG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmVuYWJsZWRBY2N1bXVsYXRvciA9IGZhbHNlOyAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2hEZWxheUV2ZW50OiBmdW5jdGlvbiAodGFyZ2V0LCBmdW5jLCBhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0ZXBpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsYXlFdmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcclxuICAgICAgICAgICAgICAgIGZ1bmM6IGZ1bmMsXHJcbiAgICAgICAgICAgICAgICBhcmdzOiBhcmdzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0W2Z1bmNdLmFwcGx5KHRhcmdldCwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHZhciB3b3JsZCA9IHRoaXMuX3dvcmxkO1xyXG4gICAgICAgIGlmICghd29ybGQgfHwgIXRoaXMuZW5hYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmVtaXQoJ2JlZm9yZS1zdGVwJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fc3RlcGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciB2ZWxvY2l0eUl0ZXJhdGlvbnMgPSBQaHlzaWNzTWFuYWdlci5WRUxPQ0lUWV9JVEVSQVRJT05TO1xyXG4gICAgICAgIHZhciBwb3NpdGlvbkl0ZXJhdGlvbnMgPSBQaHlzaWNzTWFuYWdlci5QT1NJVElPTl9JVEVSQVRJT05TO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbmFibGVkQWNjdW11bGF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWNjdW11bGF0b3IgKz0gZHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgRklYRURfVElNRV9TVEVQID0gUGh5c2ljc01hbmFnZXIuRklYRURfVElNRV9TVEVQO1xyXG4gICAgICAgICAgICB2YXIgTUFYX0FDQ1VNVUxBVE9SID0gUGh5c2ljc01hbmFnZXIuTUFYX0FDQ1VNVUxBVE9SO1xyXG5cclxuICAgICAgICAgICAgLy8gbWF4IGFjY3VtdWxhdG9yIHRpbWUgdG8gYXZvaWQgc3BpcmFsIG9mIGRlYXRoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY2N1bXVsYXRvciA+IE1BWF9BQ0NVTVVMQVRPUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjdW11bGF0b3IgPSBNQVhfQUNDVU1VTEFUT1I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLl9hY2N1bXVsYXRvciA+IEZJWEVEX1RJTUVfU1RFUCkge1xyXG4gICAgICAgICAgICAgICAgd29ybGQuU3RlcChGSVhFRF9USU1FX1NURVAsIHZlbG9jaXR5SXRlcmF0aW9ucywgcG9zaXRpb25JdGVyYXRpb25zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtdWxhdG9yIC09IEZJWEVEX1RJTUVfU1RFUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy92YXIgdGltZVN0ZXAgPSAxL2NjLmdhbWUuY29uZmlnWydmcmFtZVJhdGUnXTtcclxuICAgICAgICAgICAgdmFyIHRpbWVTdGVwID0gZHQ7XHJcbiAgICAgICAgICAgIHdvcmxkLlN0ZXAodGltZVN0ZXAsIHZlbG9jaXR5SXRlcmF0aW9ucywgcG9zaXRpb25JdGVyYXRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRlYnVnRHJhd0ZsYWdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrRGVidWdEcmF3VmFsaWQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3ZXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgd29ybGQuRHJhd0RlYnVnRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RlcGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZGVsYXlFdmVudHM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0W2V2ZW50LmZ1bmNdLmFwcGx5KGV2ZW50LnRhcmdldCwgZXZlbnQuYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW50cy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLl9zeW5jTm9kZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRlc3Qgd2hpY2ggY29sbGlkZXIgY29udGFpbnMgdGhlIGdpdmVuIHdvcmxkIHBvaW50XHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bljIXlkKvnu5nlrprkuJbnlYzlnZDmoIfns7vngrnnmoTnorDmkp7kvZNcclxuICAgICAqIEBtZXRob2QgdGVzdFBvaW50XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50IC0gdGhlIHdvcmxkIHBvaW50XHJcbiAgICAgKiBAcmV0dXJuIHtQaHlzaWNzQ29sbGlkZXJ9XHJcbiAgICAgKi9cclxuICAgIHRlc3RQb2ludDogZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgdmFyIHggPSBiMl92ZWMyX3RtcDEueCA9IHBvaW50LngvUFRNX1JBVElPO1xyXG4gICAgICAgIHZhciB5ID0gYjJfdmVjMl90bXAxLnkgPSBwb2ludC55L1BUTV9SQVRJTztcclxuXHJcbiAgICAgICAgdmFyIGQgPSAwLjIvUFRNX1JBVElPO1xyXG4gICAgICAgIGIyX2FhYmJfdG1wLmxvd2VyQm91bmQueCA9IHgtZDtcclxuICAgICAgICBiMl9hYWJiX3RtcC5sb3dlckJvdW5kLnkgPSB5LWQ7XHJcbiAgICAgICAgYjJfYWFiYl90bXAudXBwZXJCb3VuZC54ID0geCtkO1xyXG4gICAgICAgIGIyX2FhYmJfdG1wLnVwcGVyQm91bmQueSA9IHkrZDtcclxuXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fYWFiYlF1ZXJ5Q2FsbGJhY2s7XHJcbiAgICAgICAgY2FsbGJhY2suaW5pdChiMl92ZWMyX3RtcDEpO1xyXG4gICAgICAgIHRoaXMuX3dvcmxkLlF1ZXJ5QUFCQihjYWxsYmFjaywgYjJfYWFiYl90bXApO1xyXG5cclxuICAgICAgICB2YXIgZml4dHVyZSA9IGNhbGxiYWNrLmdldEZpeHR1cmUoKTtcclxuICAgICAgICBpZiAoZml4dHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZml4dHVyZS5jb2xsaWRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRlc3Qgd2hpY2ggY29sbGlkZXJzIGludGVyc2VjdCB0aGUgZ2l2ZW4gd29ybGQgcmVjdFxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5LiO57uZ5a6a5LiW55WM5Z2Q5qCH57O755+p5b2i55u45Lqk55qE56Kw5pKe5L2TXHJcbiAgICAgKiBAbWV0aG9kIHRlc3RBQUJCXHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3QgLSB0aGUgd29ybGQgcmVjdFxyXG4gICAgICogQHJldHVybiB7W1BoeXNpY3NDb2xsaWRlcl19XHJcbiAgICAgKi9cclxuICAgIHRlc3RBQUJCOiBmdW5jdGlvbiAocmVjdCkge1xyXG4gICAgICAgIGIyX2FhYmJfdG1wLmxvd2VyQm91bmQueCA9IHJlY3QueE1pbi9QVE1fUkFUSU87XHJcbiAgICAgICAgYjJfYWFiYl90bXAubG93ZXJCb3VuZC55ID0gcmVjdC55TWluL1BUTV9SQVRJTztcclxuICAgICAgICBiMl9hYWJiX3RtcC51cHBlckJvdW5kLnggPSByZWN0LnhNYXgvUFRNX1JBVElPO1xyXG4gICAgICAgIGIyX2FhYmJfdG1wLnVwcGVyQm91bmQueSA9IHJlY3QueU1heC9QVE1fUkFUSU87XHJcblxyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX2FhYmJRdWVyeUNhbGxiYWNrO1xyXG4gICAgICAgIGNhbGxiYWNrLmluaXQoKTtcclxuICAgICAgICB0aGlzLl93b3JsZC5RdWVyeUFBQkIoY2FsbGJhY2ssIGIyX2FhYmJfdG1wKTtcclxuXHJcbiAgICAgICAgdmFyIGZpeHR1cmVzID0gY2FsbGJhY2suZ2V0Rml4dHVyZXMoKTtcclxuICAgICAgICB2YXIgY29sbGlkZXJzID0gZml4dHVyZXMubWFwKGZ1bmN0aW9uIChmaXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaXh0dXJlLmNvbGxpZGVyO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY29sbGlkZXJzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJheWNhc3QgdGhlIHdvcmxkIGZvciBhbGwgY29sbGlkZXJzIGluIHRoZSBwYXRoIG9mIHRoZSByYXkuXHJcbiAgICAgKiBUaGUgcmF5Y2FzdCBpZ25vcmVzIGNvbGxpZGVycyB0aGF0IGNvbnRhaW4gdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgICogISN6aFxyXG4gICAgICog5qOA5rWL5ZOq5Lqb56Kw5pKe5L2T5Zyo57uZ5a6a5bCE57q/55qE6Lev5b6E5LiK77yM5bCE57q/5qOA5rWL5bCG5b+955Wl5YyF5ZCr6LW35aeL54K555qE56Kw5pKe5L2T44CCXHJcbiAgICAgKiBAbWV0aG9kIHJheUNhc3RcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gcDEgLSBzdGFydCBwb2ludCBvZiB0aGUgcmF5Y2FzdFxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBwMiAtIGVuZCBwb2ludCBvZiB0aGUgcmF5Y2FzdFxyXG4gICAgICogQHBhcmFtIHtSYXlDYXN0VHlwZX0gdHlwZSAtIG9wdGlvbmFsLCBkZWZhdWx0IGlzIFJheUNhc3RUeXBlLkNsb3Nlc3RcclxuICAgICAqIEByZXR1cm4ge1tQaHlzaWNzUmF5Q2FzdFJlc3VsdF19XHJcbiAgICAgKi9cclxuICAgIHJheUNhc3Q6IGZ1bmN0aW9uIChwMSwgcDIsIHR5cGUpIHtcclxuICAgICAgICBpZiAocDEuZXF1YWxzKHAyKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0eXBlID0gdHlwZSB8fCBSYXlDYXN0VHlwZS5DbG9zZXN0O1xyXG5cclxuICAgICAgICBiMl92ZWMyX3RtcDEueCA9IHAxLngvUFRNX1JBVElPO1xyXG4gICAgICAgIGIyX3ZlYzJfdG1wMS55ID0gcDEueS9QVE1fUkFUSU87XHJcbiAgICAgICAgYjJfdmVjMl90bXAyLnggPSBwMi54L1BUTV9SQVRJTztcclxuICAgICAgICBiMl92ZWMyX3RtcDIueSA9IHAyLnkvUFRNX1JBVElPO1xyXG5cclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9yYXljYXN0UXVlcnlDYWxsYmFjaztcclxuICAgICAgICBjYWxsYmFjay5pbml0KHR5cGUpO1xyXG4gICAgICAgIHRoaXMuX3dvcmxkLlJheUNhc3QoY2FsbGJhY2ssIGIyX3ZlYzJfdG1wMSwgYjJfdmVjMl90bXAyKTtcclxuXHJcbiAgICAgICAgdmFyIGZpeHR1cmVzID0gY2FsbGJhY2suZ2V0Rml4dHVyZXMoKTtcclxuICAgICAgICBpZiAoZml4dHVyZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgcG9pbnRzID0gY2FsbGJhY2suZ2V0UG9pbnRzKCk7XHJcbiAgICAgICAgICAgIHZhciBub3JtYWxzID0gY2FsbGJhY2suZ2V0Tm9ybWFscygpO1xyXG4gICAgICAgICAgICB2YXIgZnJhY3Rpb25zID0gY2FsbGJhY2suZ2V0RnJhY3Rpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGZpeHR1cmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpeHR1cmUgPSBmaXh0dXJlc1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciBjb2xsaWRlciA9IGZpeHR1cmUuY29sbGlkZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFJheUNhc3RUeXBlLkFsbENsb3Nlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gcmVzdWx0cy5maW5kKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmNvbGxpZGVyID09PSBjb2xsaWRlcjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJhY3Rpb25zW2ldIDwgcmVzdWx0LmZyYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZml4dHVyZUluZGV4ID0gY29sbGlkZXIuX2dldEZpeHR1cmVJbmRleChmaXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wb2ludC54ID0gcG9pbnRzW2ldLngqUFRNX1JBVElPO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnBvaW50LnkgPSBwb2ludHNbaV0ueSpQVE1fUkFUSU87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubm9ybWFsLnggPSBub3JtYWxzW2ldLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQubm9ybWFsLnkgPSBub3JtYWxzW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZnJhY3Rpb24gPSBmcmFjdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXI6IGNvbGxpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpeHR1cmVJbmRleDogY29sbGlkZXIuX2dldEZpeHR1cmVJbmRleChmaXh0dXJlKSxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludDogY2MudjIocG9pbnRzW2ldLngqUFRNX1JBVElPLCBwb2ludHNbaV0ueSpQVE1fUkFUSU8pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbDogY2MudjIobm9ybWFsc1tpXSksXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhY3Rpb246IGZyYWN0aW9uc1tpXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxuIFxyXG4gICAgc3luY1Bvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuX2JvZGllcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvZGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBib2RpZXNbaV0uc3luY1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN5bmNSb3RhdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBib2RpZXMgPSB0aGlzLl9ib2RpZXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib2RpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYm9kaWVzW2ldLnN5bmNSb3RhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sICAgIFxyXG5cclxuICAgIF9yZWdpc3RlckNvbnRhY3RGaXh0dXJlOiBmdW5jdGlvbiAoZml4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhY3RMaXN0ZW5lci5yZWdpc3RlckNvbnRhY3RGaXh0dXJlKGZpeHR1cmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlOiBmdW5jdGlvbiAoZml4dHVyZSkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhY3RMaXN0ZW5lci51bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUoZml4dHVyZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hZGRCb2R5OiBmdW5jdGlvbiAoYm9keSwgYm9keURlZikge1xyXG4gICAgICAgIHZhciB3b3JsZCA9IHRoaXMuX3dvcmxkO1xyXG4gICAgICAgIHZhciBub2RlID0gYm9keS5ub2RlO1xyXG5cclxuICAgICAgICBpZiAoIXdvcmxkIHx8ICFub2RlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGJvZHkuX2IyQm9keSA9IHdvcmxkLkNyZWF0ZUJvZHkoYm9keURlZik7XHJcbiAgICAgICAgYm9keS5fYjJCb2R5LmJvZHkgPSBib2R5O1xyXG5cclxuICAgICAgICB0aGlzLl9ib2RpZXMucHVzaChib2R5KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZUJvZHk6IGZ1bmN0aW9uIChib2R5KSB7XHJcbiAgICAgICAgdmFyIHdvcmxkID0gdGhpcy5fd29ybGQ7XHJcbiAgICAgICAgaWYgKCF3b3JsZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBib2R5Ll9iMkJvZHkuYm9keSA9IG51bGw7XHJcbiAgICAgICAgd29ybGQuRGVzdHJveUJvZHkoYm9keS5fYjJCb2R5KTtcclxuICAgICAgICBib2R5Ll9iMkJvZHkgPSBudWxsO1xyXG5cclxuICAgICAgICBjYy5qcy5hcnJheS5yZW1vdmUodGhpcy5fYm9kaWVzLCBib2R5KTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEpvaW50IChqb2ludCwgam9pbnREZWYpIHtcclxuICAgICAgICBsZXQgYjJqb2ludCA9IHRoaXMuX3dvcmxkLkNyZWF0ZUpvaW50KGpvaW50RGVmKTtcclxuICAgICAgICBpZiAoIWIyam9pbnQpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBiMmpvaW50Ll9qb2ludCA9IGpvaW50O1xyXG4gICAgICAgIGpvaW50Ll9qb2ludCA9IGIyam9pbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuX2pvaW50cy5wdXNoKGpvaW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZUpvaW50IChqb2ludCkge1xyXG4gICAgICAgIGlmIChqb2ludC5faXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkLkRlc3Ryb3lKb2ludChqb2ludC5fam9pbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoam9pbnQuX2pvaW50KSB7XHJcbiAgICAgICAgICAgIGpvaW50Ll9qb2ludC5fam9pbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2MuanMuYXJyYXkucmVtb3ZlKHRoaXMuX2pvaW50cywgam9pbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdENhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl93b3JsZCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKCdQbGVhc2UgaW5pdCBQaHlzaWNzTWFuYWdlciBmaXJzdCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY29udGFjdExpc3RlbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IG5ldyBjYy5QaHlzaWNzQ29udGFjdExpc3RlbmVyKCk7XHJcbiAgICAgICAgbGlzdGVuZXIuc2V0QmVnaW5Db250YWN0KHRoaXMuX29uQmVnaW5Db250YWN0KTtcclxuICAgICAgICBsaXN0ZW5lci5zZXRFbmRDb250YWN0KHRoaXMuX29uRW5kQ29udGFjdCk7XHJcbiAgICAgICAgbGlzdGVuZXIuc2V0UHJlU29sdmUodGhpcy5fb25QcmVTb2x2ZSk7XHJcbiAgICAgICAgbGlzdGVuZXIuc2V0UG9zdFNvbHZlKHRoaXMuX29uUG9zdFNvbHZlKTtcclxuICAgICAgICB0aGlzLl93b3JsZC5TZXRDb250YWN0TGlzdGVuZXIobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb250YWN0TGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuXHJcbiAgICAgICAgdGhpcy5fYWFiYlF1ZXJ5Q2FsbGJhY2sgPSBuZXcgY2MuUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrKCk7XHJcbiAgICAgICAgdGhpcy5fcmF5Y2FzdFF1ZXJ5Q2FsbGJhY2sgPSBuZXcgY2MuUGh5c2ljc1JheUNhc3RDYWxsYmFjaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5kZWJ1Z0RyYXdGbGFncyA9IERyYXdCaXRzLmVfc2hhcGVCaXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRXb3JsZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZDtcclxuICAgIH0sXHJcblxyXG4gICAgX3N5bmNOb2RlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJvZGllcyA9IHRoaXMuX2JvZGllcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJvZGllcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGJvZHkgPSBib2RpZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gYm9keS5ub2RlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGIyYm9keSA9IGJvZHkuX2IyQm9keTtcclxuICAgICAgICAgICAgdmFyIHBvcyA9IGIyYm9keS5HZXRQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgdmVjMl90bXAueCA9IHBvcy54ICogUFRNX1JBVElPO1xyXG4gICAgICAgICAgICB2ZWMyX3RtcC55ID0gcG9zLnkgKiBQVE1fUkFUSU87XHJcblxyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBiMmJvZHkuR2V0QW5nbGUoKSAqIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIG5vZGUncyBwYXJlbnQgaXMgbm90IHNjZW5lLCBjb252ZXJ0IHBvc2l0aW9uIGFuZCByb3RhdGlvbi5cclxuICAgICAgICAgICAgaWYgKG5vZGUucGFyZW50LnBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmVjMl90bXAgPSBub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUiggdmVjMl90bXAgKTtcclxuICAgICAgICAgICAgICAgIGFuZ2xlID0gY29udmVydFRvTm9kZVJvdGF0aW9uKCBub2RlLnBhcmVudCwgYW5nbGUgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBNYXNrID0gbm9kZS5fZXZlbnRNYXNrO1xyXG4gICAgICAgICAgICBub2RlLl9ldmVudE1hc2sgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gc3luYyBwb3NpdGlvblxyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gdmVjMl90bXA7XHJcblxyXG4gICAgICAgICAgICAvLyBzeW5jIHJvdGF0aW9uXHJcbiAgICAgICAgICAgIG5vZGUuYW5nbGUgPSAtYW5nbGU7XHJcblxyXG4gICAgICAgICAgICBub2RlLl9ldmVudE1hc2sgPSB0ZW1wTWFzaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChib2R5LnR5cGUgPT09IEJvZHlUeXBlLkFuaW1hdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBib2R5LnJlc2V0VmVsb2NpdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX29uQmVnaW5Db250YWN0OiBmdW5jdGlvbiAoYjJjb250YWN0KSB7XHJcbiAgICAgICAgdmFyIGMgPSBjYy5QaHlzaWNzQ29udGFjdC5nZXQoYjJjb250YWN0KTtcclxuICAgICAgICBjLmVtaXQoQ29udGFjdFR5cGUuQkVHSU5fQ09OVEFDVCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkVuZENvbnRhY3Q6IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcclxuICAgICAgICB2YXIgYyA9IGIyY29udGFjdC5fY29udGFjdDtcclxuICAgICAgICBpZiAoIWMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLmVtaXQoQ29udGFjdFR5cGUuRU5EX0NPTlRBQ1QpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNjLlBoeXNpY3NDb250YWN0LnB1dChiMmNvbnRhY3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25QcmVTb2x2ZTogZnVuY3Rpb24gKGIyY29udGFjdCkge1xyXG4gICAgICAgIHZhciBjID0gYjJjb250YWN0Ll9jb250YWN0O1xyXG4gICAgICAgIGlmICghYykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGMuZW1pdChDb250YWN0VHlwZS5QUkVfU09MVkUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Qb3N0U29sdmU6IGZ1bmN0aW9uIChiMmNvbnRhY3QsIGltcHVsc2UpIHtcclxuICAgICAgICB2YXIgYyA9IGIyY29udGFjdC5fY29udGFjdDtcclxuICAgICAgICBpZiAoIWMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW1wdWxzZSBvbmx5IHN1cnZpdmUgZHVyaW5nIHBvc3Qgc29sZSBjYWxsYmFja1xyXG4gICAgICAgIGMuX2ltcHVsc2UgPSBpbXB1bHNlO1xyXG4gICAgICAgIGMuZW1pdChDb250YWN0VHlwZS5QT1NUX1NPTFZFKTtcclxuICAgICAgICBjLl9pbXB1bHNlID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2NoZWNrRGVidWdEcmF3VmFsaWQgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGVidWdEcmF3ZXIgfHwgIXRoaXMuX2RlYnVnRHJhd2VyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgnUEhZU0lDU19NQU5BR0VSX0RFQlVHX0RSQVcnKTtcclxuICAgICAgICAgICAgbm9kZS56SW5kZXggPSBjYy5tYWNyby5NQVhfWklOREVYO1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZShub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3ZXIgPSBub2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVidWdEcmF3ID0gbmV3IERlYnVnRHJhdyh0aGlzLl9kZWJ1Z0RyYXdlcik7XHJcbiAgICAgICAgICAgIGRlYnVnRHJhdy5TZXRGbGFncyh0aGlzLmRlYnVnRHJhd0ZsYWdzKTtcclxuICAgICAgICAgICAgdGhpcy5fd29ybGQuU2V0RGVidWdEcmF3KGRlYnVnRHJhdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEVuYWJsZWQgdGhlIHBoeXNpY3MgbWFuYWdlcj9cclxuICogISN6aFxyXG4gKiDmjIflrprmmK/lkKblkK/nlKjniannkIbns7vnu5/vvJ9cclxuICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVkXHJcbiAqIEBkZWZhdWx0IGZhbHNlXHJcbiAqL1xyXG5jYy5qcy5nZXRzZXQoUGh5c2ljc01hbmFnZXIucHJvdG90eXBlLCAnZW5hYmxlZCcsIFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodmFsdWUgJiYgIXRoaXMuX3dvcmxkKSB7XHJcbiAgICAgICAgICAgIHZhciB3b3JsZCA9IG5ldyBiMi5Xb3JsZCggbmV3IGIyLlZlYzIoMCwgLTEwKSApO1xyXG4gICAgICAgICAgICB3b3JsZC5TZXRBbGxvd1NsZWVwaW5nKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fd29ybGQgPSB3b3JsZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogRGVidWcgZHJhdyBmbGFncy5cclxuICogISN6aFxyXG4gKiDorr7nva7osIPor5Xnu5jliLbmoIflv5dcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGRlYnVnRHJhd0ZsYWdzXHJcbiAqIEBkZWZhdWx0IDBcclxuICogQGV4YW1wbGVcclxuICogLy8gZW5hYmxlIGFsbCBkZWJ1ZyBkcmF3IGluZm9cclxuICogdmFyIEJpdHMgPSBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cztcclxuICogY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5kZWJ1Z0RyYXdGbGFncyA9IEJpdHMuZV9hYWJiQml0IHxcclxuICAgIEJpdHMuZV9wYWlyQml0IHxcclxuICAgIEJpdHMuZV9jZW50ZXJPZk1hc3NCaXQgfFxyXG4gICAgQml0cy5lX2pvaW50Qml0IHxcclxuICAgIEJpdHMuZV9zaGFwZUJpdDtcclxuIFxyXG4gKiAvLyBkaXNhYmxlIGRlYnVnIGRyYXcgaW5mb1xyXG4gKiBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID0gMDtcclxuICovXHJcbmNjLmpzLmdldHNldChQaHlzaWNzTWFuYWdlci5wcm90b3R5cGUsICdkZWJ1Z0RyYXdGbGFncycsIFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWJ1Z0RyYXdGbGFncztcclxuICAgIH0sXHJcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLl9kZWJ1Z0RyYXdGbGFncykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGVidWdEcmF3ZXIgJiYgdGhpcy5fZGVidWdEcmF3ZXIubm9kZSkgdGhpcy5fZGVidWdEcmF3ZXIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghdmFsdWUgJiYgdGhpcy5fZGVidWdEcmF3RmxhZ3MpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RlYnVnRHJhd2VyICYmIHRoaXMuX2RlYnVnRHJhd2VyLm5vZGUpIHRoaXMuX2RlYnVnRHJhd2VyLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hlY2tEZWJ1Z0RyYXdWYWxpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl93b3JsZC5tX2RlYnVnRHJhdy5TZXRGbGFncyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kZWJ1Z0RyYXdGbGFncyA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hlY2tEZWJ1Z0RyYXdWYWxpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl93b3JsZC5tX2RlYnVnRHJhdy5TZXRGbGFncyh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIHBoeXNpY3Mgd29ybGQgZ3Jhdml0eS5cclxuICogISN6aFxyXG4gKiDniannkIbkuJbnlYzph43lipvlgLxcclxuICogQHByb3BlcnR5IHtWZWMyfSBncmF2aXR5XHJcbiAqL1xyXG5jYy5qcy5nZXRzZXQoUGh5c2ljc01hbmFnZXIucHJvdG90eXBlLCAnZ3Jhdml0eScsXHJcbiAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dvcmxkKSB7XHJcbiAgICAgICAgICAgIHZhciBnID0gdGhpcy5fd29ybGQuR2V0R3Jhdml0eSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudjIoZy54KlBUTV9SQVRJTywgZy55KlBUTV9SQVRJTyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy52MigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5fd29ybGQpIHtcclxuICAgICAgICAgICAgdGhpcy5fd29ybGQuU2V0R3Jhdml0eShuZXcgYjIuVmVjMih2YWx1ZS54L1BUTV9SQVRJTywgdmFsdWUueS9QVE1fUkFUSU8pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcblxyXG5cclxuY2MuUGh5c2ljc01hbmFnZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NNYW5hZ2VyO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGRyYXcgYml0cyBmb3IgZHJhd2luZyBwaHlzaWNzIGRlYnVnIGluZm9ybWF0aW9uLjxicj5cclxuICogZXhhbXBsZTo8YnI+XHJcbiAqIGBgYGpzXHJcbiAqIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZGVidWdEcmF3RmxhZ3MgPSBcclxuICogIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfYWFiYkJpdCB8XHJcbiAqICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3BhaXJCaXQgfFxyXG4gKiAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9jZW50ZXJPZk1hc3NCaXQgfFxyXG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9qb2ludEJpdCB8XHJcbiAqICBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX3NoYXBlQml0O1xyXG4gKiBgYGBcclxuICogISN6aFxyXG4gKiDmjIflrprniannkIbns7vnu5/pnIDopoHnu5jliLblk6rkupvosIPor5Xkv6Hmga/jgII8YnI+XHJcbiAqIGV4YW1wbGU6PGJyPlxyXG4gKiBgYGBqc1xyXG4gKiBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmRlYnVnRHJhd0ZsYWdzID0gXHJcbiAqICAvLyBjYy5QaHlzaWNzTWFuYWdlci5EcmF3Qml0cy5lX2FhYmJCaXQgfFxyXG4gKiAgLy8gY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9wYWlyQml0IHxcclxuICogIC8vIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfY2VudGVyT2ZNYXNzQml0IHxcclxuICogIGNjLlBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzLmVfam9pbnRCaXQgfFxyXG4gKiAgY2MuUGh5c2ljc01hbmFnZXIuRHJhd0JpdHMuZV9zaGFwZUJpdDtcclxuICogYGBgXHJcbiAqIEBlbnVtIFBoeXNpY3NNYW5hZ2VyLkRyYXdCaXRzXHJcbiAqIEBzdGF0aWNcclxuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogRHJhdyBib3VuZGluZyBib3hlc1xyXG4gKiAhI3poXHJcbiAqIOe7mOWItuWMheWbtOebklxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gZV9hYWJiQml0XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIERyYXcgam9pbnQgY29ubmVjdGlvbnNcclxuICogISN6aFxyXG4gKiDnu5jliLblhbPoioLpk77mjqXkv6Hmga9cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGVfam9pbnRCaXRcclxuICogQHN0YXRpY1xyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogRHJhdyBzaGFwZXNcclxuICogISN6aFxyXG4gKiDnu5jliLblvaLnirZcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGVfc2hhcGVCaXRcclxuICogQHN0YXRpY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUGh5c2ljc1JheUNhc3RSZXN1bHRcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBQaHlzaWNzQ29sbGlkZXIgd2hpY2ggaW50ZXJzZWN0cyB3aXRoIHRoZSByYXljYXN0XHJcbiAqICEjemhcclxuICog5LiO5bCE57q/55u45Lqk55qE56Kw5pKe5L2TXHJcbiAqIEBwcm9wZXJ0eSB7UGh5c2ljc0NvbGxpZGVyfSBjb2xsaWRlclxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGludGVyc2VjdGlvbiBwb2ludFxyXG4gKiAhI3poXHJcbiAqIOWwhOe6v+S4jueisOaSnuS9k+ebuOS6pOeahOeCuVxyXG4gKiBAcHJvcGVydHkge1ZlYzJ9IHBvaW50XHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgbm9ybWFsIHZlY3RvciBhdCB0aGUgcG9pbnQgb2YgaW50ZXJzZWN0aW9uXHJcbiAqICEjemhcclxuICog5bCE57q/5LiO56Kw5pKe5L2T55u45Lqk55qE54K555qE5rOV5ZCR6YePXHJcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gbm9ybWFsXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgZnJhY3Rpb24gb2YgdGhlIHJheWNhc3QgcGF0aCBhdCB0aGUgcG9pbnQgb2YgaW50ZXJzZWN0aW9uXHJcbiAqICEjemhcclxuICog5bCE57q/5LiO56Kw5pKe5L2T55u45Lqk55qE54K55Y2g5bCE57q/6ZW/5bqm55qE5YiG5pWwXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBmcmFjdGlvblxyXG4gKi9cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=