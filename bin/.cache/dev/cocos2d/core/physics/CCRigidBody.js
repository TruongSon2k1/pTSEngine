
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCRigidBody.js';
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
var NodeEvent = require('../CCNode').EventType;

var PTM_RATIO = require('./CCPhysicsTypes').PTM_RATIO;

var ANGLE_TO_PHYSICS_ANGLE = require('./CCPhysicsTypes').ANGLE_TO_PHYSICS_ANGLE;

var PHYSICS_ANGLE_TO_ANGLE = require('./CCPhysicsTypes').PHYSICS_ANGLE_TO_ANGLE;

var getWorldRotation = require('./utils').getWorldRotation;

var BodyType = require('./CCPhysicsTypes').BodyType;

var tempb2Vec21 = new b2.Vec2();
var tempb2Vec22 = new b2.Vec2();
var VEC2_ZERO = cc.Vec2.ZERO;
/**
 * @class RigidBody
 * @extends Component
 */

var RigidBody = cc.Class({
  name: 'cc.RigidBody',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Rigid Body',
    disallowMultiple: true
  },
  properties: {
    _type: BodyType.Dynamic,
    _allowSleep: true,
    _gravityScale: 1,
    _linearDamping: 0,
    _angularDamping: 0,
    _linearVelocity: cc.v2(0, 0),
    _angularVelocity: 0,
    _fixedRotation: false,
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set() {
        cc.warnID(8200);
      },
      visible: false,
      override: true
    },
    sync_position: {
      get: function get() {
        return this._sync_position_;
      },
      set: function set() {},
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.sync_position'
    },
    sync_rotation: {
      get: function get() {
        return this._sync_rotation_;
      },
      set: function set() {},
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.sync_rotation'
    },

    /**
     * !#en
     * Should enabled contact listener?
     * When a collision is trigger, the collision callback will only be called when enabled contact listener.
     * !#zh
     * 是否启用接触接听器。
     * 当 collider 产生碰撞时，只有开启了接触接听器才会调用相应的回调函数
     * @property {Boolean} enabledContactListener
     * @default false
     */
    enabledContactListener: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.enabledContactListener'
    },

    /**
     * !#en
     * Collision callback.
     * Called when two collider begin to touch.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在两个碰撞体开始接触时被调用。
     * @method onBeginContact
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * Called when two collider cease to touch.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在两个碰撞体停止接触时被调用。
     * @method onEndContact
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * This is called when a contact is updated.
     * This allows you to inspect a contact before it goes to the solver(e.g. disable contact).
    * Note: this is called only for awake bodies.
    * Note: this is called even when the number of contact points is zero.
    * Note: this is not called for sensors.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在接触更新时被调用。
     * 你可以在接触被处理前根据他包含的信息作出相应的处理，比如将这个接触禁用掉。
     * 注意：回调只会为醒着的刚体调用。
     * 注意：接触点为零的时候也有可能被调用。
     * 注意：感知体(sensor)的回调不会被调用。
     * @method onPreSolve
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Collision callback.
     * This is called after a contact is updated.
     * You can get the impulses from the contact in this callback.
     * !#zh
     * 碰撞回调。
     * 如果你的脚本中实现了这个函数，那么它将会在接触更新完后被调用。
     * 你可以在这个回调中从接触信息中获取到冲量信息。
     * @method onPostSolve
     * @param {PhysicsContact} contact - contact information
     * @param {PhysicsCollider} selfCollider - the collider belong to this rigidbody
     * @param {PhysicsCollider} otherCollider - the collider belong to another rigidbody
     */

    /**
     * !#en
     * Is this a fast moving body that should be prevented from tunneling through
     * other moving bodies?
     * Note :
     * - All bodies are prevented from tunneling through kinematic and static bodies. This setting is only considered on dynamic bodies.
     * - You should use this flag sparingly since it increases processing time.
     * !#zh
     * 这个刚体是否是一个快速移动的刚体，并且需要禁止穿过其他快速移动的刚体？
     * 需要注意的是 :
     *  - 所有刚体都被禁止从 运动刚体 和 静态刚体 中穿过。此选项只关注于 动态刚体。
     *  - 应该尽量少的使用此选项，因为它会增加程序处理时间。
     * @property {Boolean} bullet
     * @default false
     */
    bullet: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.bullet'
    },

    /**
     * !#en
     * Rigidbody type : Static, Kinematic, Dynamic or Animated.
     * !#zh
     * 刚体类型： Static, Kinematic, Dynamic or Animated.
     * @property {RigidBodyType} type
     * @default RigidBodyType.Dynamic
     */
    type: {
      type: BodyType,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.type',
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        this._type = value;

        if (this._b2Body) {
          if (value === BodyType.Animated) {
            this._b2Body.SetType(BodyType.Kinematic);
          } else {
            this._b2Body.SetType(value);
          }
        }
      }
    },

    /**
     * !#en
     * Set this flag to false if this body should never fall asleep.
     * Note that this increases CPU usage.
     * !#zh
     * 如果此刚体永远都不应该进入睡眠，那么设置这个属性为 false。
     * 需要注意这将使 CPU 占用率提高。
     * @property {Boolean} allowSleep
     * @default true
     */
    allowSleep: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.allowSleep',
      get: function get() {
        if (this._b2Body) {
          return this._b2Body.IsSleepingAllowed();
        }

        return this._allowSleep;
      },
      set: function set(value) {
        this._allowSleep = value;

        if (this._b2Body) {
          this._b2Body.SetSleepingAllowed(value);
        }
      }
    },

    /**
     * !#en
     * Scale the gravity applied to this body.
     * !#zh
     * 缩放应用在此刚体上的重力值
     * @property {Number} gravityScale
     * @default 1
     */
    gravityScale: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.gravityScale',
      get: function get() {
        return this._gravityScale;
      },
      set: function set(value) {
        this._gravityScale = value;

        if (this._b2Body) {
          this._b2Body.SetGravityScale(value);
        }
      }
    },

    /**
     * !#en
     * Linear damping is use to reduce the linear velocity.
     * The damping parameter can be larger than 1, but the damping effect becomes sensitive to the
     * time step when the damping parameter is large.
     * !#zh
     * Linear damping 用于衰减刚体的线性速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
     * @property {Number} linearDamping
     * @default 0
     */
    linearDamping: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.linearDamping',
      get: function get() {
        return this._linearDamping;
      },
      set: function set(value) {
        this._linearDamping = value;

        if (this._b2Body) {
          this._b2Body.SetLinearDamping(this._linearDamping);
        }
      }
    },

    /**
     * !#en
     * Angular damping is use to reduce the angular velocity. The damping parameter
     * can be larger than 1 but the damping effect becomes sensitive to the
     * time step when the damping parameter is large.
     * !#zh
     * Angular damping 用于衰减刚体的角速度。衰减系数可以大于 1，但是当衰减系数比较大的时候，衰减的效果会变得比较敏感。
     * @property {Number} angularDamping
     * @default 0
     */
    angularDamping: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.angularDamping',
      get: function get() {
        return this._angularDamping;
      },
      set: function set(value) {
        this._angularDamping = value;

        if (this._b2Body) {
          this._b2Body.SetAngularDamping(value);
        }
      }
    },

    /**
     * !#en
     * The linear velocity of the body's origin in world co-ordinates.
     * !#zh
     * 刚体在世界坐标下的线性速度
     * @property {Vec2} linearVelocity
     * @default cc.v2(0,0)
     */
    linearVelocity: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.linearVelocity',
      type: cc.Vec2,
      get: function get() {
        var lv = this._linearVelocity;

        if (this._b2Body) {
          var velocity = this._b2Body.GetLinearVelocity();

          lv.x = velocity.x * PTM_RATIO;
          lv.y = velocity.y * PTM_RATIO;
        }

        return lv;
      },
      set: function set(value) {
        this._linearVelocity = value;
        var b2body = this._b2Body;

        if (b2body) {
          var temp = b2body.m_linearVelocity;
          temp.Set(value.x / PTM_RATIO, value.y / PTM_RATIO);
          b2body.SetLinearVelocity(temp);
        }
      }
    },

    /**
     * !#en
     * The angular velocity of the body.
     * !#zh
     * 刚体的角速度
     * @property {Number} angularVelocity
     * @default 0
     */
    angularVelocity: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.angularVelocity',
      get: function get() {
        if (this._b2Body) {
          return this._b2Body.GetAngularVelocity() * PHYSICS_ANGLE_TO_ANGLE;
        }

        return this._angularVelocity;
      },
      set: function set(value) {
        this._angularVelocity = value;

        if (this._b2Body) {
          this._b2Body.SetAngularVelocity(value * ANGLE_TO_PHYSICS_ANGLE);
        }
      }
    },

    /**
     * !#en
     * Should this body be prevented from rotating?
     * !#zh
     * 是否禁止此刚体进行旋转
     * @property {Boolean} fixedRotation
     * @default false
     */
    fixedRotation: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.fixedRotation',
      get: function get() {
        return this._fixedRotation;
      },
      set: function set(value) {
        this._fixedRotation = value;

        if (this._b2Body) {
          this._b2Body.SetFixedRotation(value);
        }
      }
    },

    /**
     * !#en
     * Set the sleep state of the body. A sleeping body has very low CPU cost.(When the rigid body is hit, if the rigid body is in sleep state, it will be immediately awakened.)
     * !#zh
     * 设置刚体的睡眠状态。 睡眠的刚体具有非常低的 CPU 成本。（当刚体被碰撞到时，如果刚体处于睡眠状态，它会立即被唤醒）
     * @property {Boolean} awake
     * @default false
     */
    awake: {
      visible: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.awake',
      get: function get() {
        return this._b2Body ? this._b2Body.IsAwake() : false;
      },
      set: function set(value) {
        if (this._b2Body) {
          this._b2Body.SetAwake(value);
        }
      }
    },

    /**
     * !#en
     * Whether to wake up this rigid body during initialization
     * !#zh
     * 是否在初始化时唤醒此刚体
     * @property {Boolean} awakeOnLoad
     * @default true
     */
    awakeOnLoad: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.rigidbody.awakeOnLoad',
      animatable: false
    },

    /**
     * !#en
     * Set the active state of the body. An inactive body is not
    * simulated and cannot be collided with or woken up.
    * If body is active, all fixtures will be added to the
    * broad-phase.
    * If body is inactive, all fixtures will be removed from
    * the broad-phase and all contacts will be destroyed.
    * Fixtures on an inactive body are implicitly inactive and will
    * not participate in collisions, ray-casts, or queries.
    * Joints connected to an inactive body are implicitly inactive.
     * !#zh
     * 设置刚体的激活状态。一个非激活状态下的刚体是不会被模拟和碰撞的，不管它是否处于睡眠状态下。
     * 如果刚体处于激活状态下，所有夹具会被添加到 粗测阶段（broad-phase）。
     * 如果刚体处于非激活状态下，所有夹具会被从 粗测阶段（broad-phase）中移除。
     * 在非激活状态下的夹具不会参与到碰撞，射线，或者查找中
     * 链接到非激活状态下刚体的关节也是非激活的。
     * @property {Boolean} active
     * @default true
     */
    active: {
      visible: false,
      get: function get() {
        return this._b2Body ? this._b2Body.IsActive() : false;
      },
      set: function set(value) {
        if (this._b2Body) {
          this._b2Body.SetActive(value);
        }
      }
    }
  },

  /**
   * !#en
   * Converts a given point in the world coordinate system to this rigid body's local coordinate system
   * !#zh
   * 将一个给定的世界坐标系下的点转换为刚体本地坐标系下的点
   * @method getLocalPoint
   * @param {Vec2} worldPoint - a point in world coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the corresponding local point relative to the body's origin.
   */
  getLocalPoint: function getLocalPoint(worldPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldPoint.x / PTM_RATIO, worldPoint.y / PTM_RATIO);

      var pos = this._b2Body.GetLocalPoint(tempb2Vec21, out);

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Converts a given point in this rigid body's local coordinate system to the world coordinate system
   * !#zh
   * 将一个给定的刚体本地坐标系下的点转换为世界坐标系下的点
   * @method getWorldPoint
   * @param {Vec2} localPoint - a point in local coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the same point expressed in world coordinates.
   */
  getWorldPoint: function getWorldPoint(localPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(localPoint.x / PTM_RATIO, localPoint.y / PTM_RATIO);

      var pos = this._b2Body.GetWorldPoint(tempb2Vec21, out);

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Converts a given vector in this rigid body's local coordinate system to the world coordinate system
   * !#zh
   * 将一个给定的刚体本地坐标系下的向量转换为世界坐标系下的向量
   * @method getWorldVector
   * @param {Vec2} localVector - a vector in world coordinates.
   * @param {Vec2} out - optional, the receiving vector
   * @return {Vec2} the same vector expressed in local coordinates.
   */
  getWorldVector: function getWorldVector(localVector, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(localVector.x / PTM_RATIO, localVector.y / PTM_RATIO);

      var vector = this._b2Body.GetWorldVector(tempb2Vec21, out);

      out.x = vector.x * PTM_RATIO;
      out.y = vector.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Converts a given vector in the world coordinate system to this rigid body's local coordinate system
   * !#zh
   * 将一个给定的世界坐标系下的向量转换为刚体本地坐标系下的向量
   * @method getLocalVector
   * @param {Vec2} worldVector - a vector in world coordinates.
   * @param {Vec2} out - optional, the receiving vector
   * @return {Vec2} the corresponding local vector relative to the body's origin.
   */
  getLocalVector: function getLocalVector(worldVector, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldVector.x / PTM_RATIO, worldVector.y / PTM_RATIO);

      var vector = this._b2Body.GetLocalVector(tempb2Vec21, out);

      out.x = vector.x * PTM_RATIO;
      out.y = vector.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world body origin position.
   * !#zh
   * 获取刚体世界坐标系下的原点值
   * @method getWorldPosition
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the world position of the body's origin.
   */
  getWorldPosition: function getWorldPosition(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetPosition();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world body rotation angle.
   * !#zh
   * 获取刚体世界坐标系下的旋转值。
   * @method getWorldRotation
   * @return {Number} the current world rotation angle.
   */
  getWorldRotation: function getWorldRotation() {
    if (this._b2Body) {
      return this._b2Body.GetAngle() * PHYSICS_ANGLE_TO_ANGLE;
    }

    return 0;
  },

  /**
   * !#en
   * Get the local position of the center of mass.
   * !#zh
   * 获取刚体本地坐标系下的质心
   * @method getLocalCenter
   * @return {Vec2} the local position of the center of mass.
   */
  getLocalCenter: function getLocalCenter(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetLocalCenter();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world position of the center of mass.
   * !#zh
   * 获取刚体世界坐标系下的质心
   * @method getWorldCenter
   * @return {Vec2} the world position of the center of mass.
   */
  getWorldCenter: function getWorldCenter(out) {
    out = out || cc.v2();

    if (this._b2Body) {
      var pos = this._b2Body.GetWorldCenter();

      out.x = pos.x * PTM_RATIO;
      out.y = pos.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get the world linear velocity of a world point attached to this body.
   * !#zh
   * 获取刚体上指定点的线性速度
   * @method getLinearVelocityFromWorldPoint
   * @param {Vec2} worldPoint - a point in world coordinates.
   * @param {Vec2} out - optional, the receiving point
   * @return {Vec2} the world velocity of a point.
   */
  getLinearVelocityFromWorldPoint: function getLinearVelocityFromWorldPoint(worldPoint, out) {
    out = out || cc.v2();

    if (this._b2Body) {
      tempb2Vec21.Set(worldPoint.x / PTM_RATIO, worldPoint.y / PTM_RATIO);

      var velocity = this._b2Body.GetLinearVelocityFromWorldPoint(tempb2Vec21, out);

      out.x = velocity.x * PTM_RATIO;
      out.y = velocity.y * PTM_RATIO;
    }

    return out;
  },

  /**
   * !#en
   * Get total mass of the body.
   * !#zh
   * 获取刚体的质量。
   * @method getMass
   * @return {Number} the total mass of the body.
   */
  getMass: function getMass() {
    return this._b2Body ? this._b2Body.GetMass() : 0;
  },

  /**
   * !#en
   * Get the rotational inertia of the body about the local origin.
   * !#zh
   * 获取刚体本地坐标系下原点的旋转惯性
   * @method getInertia
   * @return {Number} the rotational inertia, usually in kg-m^2.
   */
  getInertia: function getInertia() {
    return this._b2Body ? this._b2Body.GetInertia() * PTM_RATIO * PTM_RATIO : 0;
  },

  /**
   * !#en
   * Get all the joints connect to the rigidbody.
   * !#zh
   * 获取链接到此刚体的所有关节
   * @method getJointList
   * @return {[Joint]} the joint list.
   */
  getJointList: function getJointList() {
    if (!this._b2Body) return [];
    var joints = [];

    var list = this._b2Body.GetJointList();

    if (!list) return [];
    joints.push(list.joint._joint); // find prev joint

    var prev = list.prev;

    while (prev) {
      joints.push(prev.joint._joint);
      prev = prev.prev;
    } // find next joint


    var next = list.next;

    while (next) {
      joints.push(next.joint._joint);
      next = next.next;
    }

    return joints;
  },

  /**
   * !#en
   * Apply a force at a world point. If the force is not
  * applied at the center of mass, it will generate a torque and
  * affect the angular velocity.
   * !#zh
   * 施加一个力到刚体上的一个点。如果力没有施加到刚体的质心上，还会产生一个扭矩并且影响到角速度。
   * @method applyForce
   * @param {Vec2} force - the world force vector.
   * @param {Vec2} point - the world position.
   * @param {Boolean} wake - also wake up the body.
   */
  applyForce: function applyForce(force, point, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(force.x / PTM_RATIO, force.y / PTM_RATIO);
      tempb2Vec22.Set(point.x / PTM_RATIO, point.y / PTM_RATIO);

      this._b2Body.ApplyForce(tempb2Vec21, tempb2Vec22, wake);
    }
  },

  /**
   * !#en
   * Apply a force to the center of mass.
   * !#zh
   * 施加一个力到刚体上的质心上。
   * @method applyForceToCenter
   * @param {Vec2} force - the world force vector.
   * @param {Boolean} wake - also wake up the body.
   */
  applyForceToCenter: function applyForceToCenter(force, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(force.x / PTM_RATIO, force.y / PTM_RATIO);

      this._b2Body.ApplyForceToCenter(tempb2Vec21, wake);
    }
  },

  /**
   * !#en
   * Apply a torque. This affects the angular velocity.
   * !#zh
   * 施加一个扭矩力，将影响刚体的角速度
   * @method applyTorque
   * @param {Number} torque - about the z-axis (out of the screen), usually in N-m.
   * @param {Boolean} wake - also wake up the body
   */
  applyTorque: function applyTorque(torque, wake) {
    if (this._b2Body) {
      this._b2Body.ApplyTorque(torque / PTM_RATIO, wake);
    }
  },

  /**
   * !#en
   * Apply a impulse at a world point, This immediately modifies the velocity.
  * If the impulse is not applied at the center of mass, it will generate a torque and
  * affect the angular velocity.
   * !#zh
   * 施加冲量到刚体上的一个点，将立即改变刚体的线性速度。
   * 如果冲量施加到的点不是刚体的质心，那么将产生一个扭矩并影响刚体的角速度。
   * @method applyLinearImpulse
   * @param {Vec2} impulse - the world impulse vector, usually in N-seconds or kg-m/s.
   * @param {Vec2} point - the world position
   * @param {Boolean} wake - alse wake up the body
   */
  applyLinearImpulse: function applyLinearImpulse(impulse, point, wake) {
    if (this._b2Body) {
      tempb2Vec21.Set(impulse.x / PTM_RATIO, impulse.y / PTM_RATIO);
      tempb2Vec22.Set(point.x / PTM_RATIO, point.y / PTM_RATIO);

      this._b2Body.ApplyLinearImpulse(tempb2Vec21, tempb2Vec22, wake);
    }
  },

  /**
   * !#en
   * Apply an angular impulse.
   * !#zh
   * 施加一个角速度冲量。
   * @method applyAngularImpulse
   * @param {Number} impulse - the angular impulse in units of kg*m*m/s
   * @param {Boolean} wake - also wake up the body
   */
  applyAngularImpulse: function applyAngularImpulse(impulse, wake) {
    if (this._b2Body) {
      this._b2Body.ApplyAngularImpulse(impulse / PTM_RATIO / PTM_RATIO, wake);
    }
  },

  /**
   * !#en
   * Synchronize node's world position to box2d rigidbody's position.
   * If enableAnimated is true and rigidbody's type is Animated type,
   * will set linear velocity instead of directly set rigidbody's position.
   * !#zh
   * 同步节点的世界坐标到 box2d 刚体的坐标上。
   * 如果 enableAnimated 是 true，并且刚体的类型是 Animated ，那么将设置刚体的线性速度来代替直接设置刚体的位置。
   * @method syncPosition
   * @param {Boolean} enableAnimated
   */
  syncPosition: function syncPosition(enableAnimated) {
    var b2body = this._b2Body;
    if (!b2body) return;
    var pos = this.node.convertToWorldSpaceAR(VEC2_ZERO);
    var temp;

    if (this.type === BodyType.Animated) {
      temp = b2body.GetLinearVelocity();
    } else {
      temp = b2body.GetPosition();
    }

    temp.x = pos.x / PTM_RATIO;
    temp.y = pos.y / PTM_RATIO;

    if (this.type === BodyType.Animated && enableAnimated) {
      var b2Pos = b2body.GetPosition();
      var timeStep = cc.game.config['frameRate'];
      temp.x = (temp.x - b2Pos.x) * timeStep;
      temp.y = (temp.y - b2Pos.y) * timeStep;
      b2body.SetAwake(true);
      b2body.SetLinearVelocity(temp);
    } else {
      b2body.SetTransformVec(temp, b2body.GetAngle());
    }
  },

  /**
   * !#en
   * Synchronize node's world angle to box2d rigidbody's angle.
   * If enableAnimated is true and rigidbody's type is Animated type,
   * will set angular velocity instead of directly set rigidbody's angle.
   * !#zh
   * 同步节点的世界旋转角度值到 box2d 刚体的旋转值上。
   * 如果 enableAnimated 是 true，并且刚体的类型是 Animated ，那么将设置刚体的角速度来代替直接设置刚体的角度。
   * @method syncRotation
   * @param {Boolean} enableAnimated
   */
  syncRotation: function syncRotation(enableAnimated) {
    var b2body = this._b2Body;
    if (!b2body) return;
    var rotation = ANGLE_TO_PHYSICS_ANGLE * getWorldRotation(this.node);

    if (this.type === BodyType.Animated && enableAnimated) {
      var b2Rotation = b2body.GetAngle();
      var timeStep = cc.game.config['frameRate'];
      b2body.SetAwake(true);
      b2body.SetAngularVelocity((rotation - b2Rotation) * timeStep);
    } else {
      b2body.SetTransformVec(b2body.GetPosition(), rotation);
    }
  },
  resetVelocity: function resetVelocity() {
    var b2body = this._b2Body;
    if (!b2body) return;
    var temp = b2body.m_linearVelocity;
    temp.Set(0, 0);
    b2body.SetLinearVelocity(temp);
    b2body.SetAngularVelocity(0);
  },
  update: function update(dt) {
    if (this.sync_position) this.syncPosition(this.type === BodyType.Animated);
    if (this.sync_rotation) this.syncRotation(this.type === BodyType.Animated);
  },
  onEnable: function onEnable() {
    this._init();
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  _registerNodeEvents: function _registerNodeEvents() {
    var node = this.node;
    node.on(NodeEvent.POSITION_CHANGED, this._onNodePositionChanged, this);
    node.on(NodeEvent.ROTATION_CHANGED, this._onNodeRotationChanged, this);
    node.on(NodeEvent.SCALE_CHANGED, this._onNodeScaleChanged, this);
  },
  _unregisterNodeEvents: function _unregisterNodeEvents() {
    var node = this.node;
    node.off(NodeEvent.POSITION_CHANGED, this._onNodePositionChanged, this);
    node.off(NodeEvent.ROTATION_CHANGED, this._onNodeRotationChanged, this);
    node.off(NodeEvent.SCALE_CHANGED, this._onNodeScaleChanged, this);
  },
  _onNodePositionChanged: function _onNodePositionChanged() {
    this.syncPosition(true);
  },
  _onNodeRotationChanged: function _onNodeRotationChanged(event) {
    this.syncRotation(true);
  },
  _onNodeScaleChanged: function _onNodeScaleChanged(event) {
    if (this._b2Body) {
      var colliders = this.getComponents(cc.PhysicsCollider);

      for (var i = 0; i < colliders.length; i++) {
        colliders[i].apply();
      }
    }
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;

    this._registerNodeEvents();

    var bodyDef = new b2.BodyDef();

    if (this.type === BodyType.Animated) {
      bodyDef.type = BodyType.Kinematic;
    } else {
      bodyDef.type = this.type;
    }

    bodyDef.allowSleep = this.allowSleep;
    bodyDef.gravityScale = this.gravityScale;
    bodyDef.linearDamping = this.linearDamping;
    bodyDef.angularDamping = this.angularDamping;
    var linearVelocity = this.linearVelocity;
    bodyDef.linearVelocity = new b2.Vec2(linearVelocity.x / PTM_RATIO, linearVelocity.y / PTM_RATIO);
    bodyDef.angularVelocity = this.angularVelocity * ANGLE_TO_PHYSICS_ANGLE;
    bodyDef.fixedRotation = this.fixedRotation;
    bodyDef.bullet = this.bullet;
    var node = this.node;
    var pos = node.convertToWorldSpaceAR(VEC2_ZERO);
    bodyDef.position = new b2.Vec2(pos.x / PTM_RATIO, pos.y / PTM_RATIO);
    bodyDef.angle = -(Math.PI / 180) * getWorldRotation(node);
    bodyDef.awake = this.awakeOnLoad;

    cc.director.getPhysicsManager()._addBody(this, bodyDef);

    this._inited = true;
  },
  __destroy: function __destroy() {
    if (!this._inited) return;

    cc.director.getPhysicsManager()._removeBody(this);

    this._unregisterNodeEvents();

    this._inited = false;
  },
  _getBody: function _getBody() {
    return this._b2Body;
  }
});
cc.RigidBody = module.exports = RigidBody;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXENDUmlnaWRCb2R5LmpzIl0sIm5hbWVzIjpbIk5vZGVFdmVudCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJQVE1fUkFUSU8iLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiUEhZU0lDU19BTkdMRV9UT19BTkdMRSIsImdldFdvcmxkUm90YXRpb24iLCJCb2R5VHlwZSIsInRlbXBiMlZlYzIxIiwiYjIiLCJWZWMyIiwidGVtcGIyVmVjMjIiLCJWRUMyX1pFUk8iLCJjYyIsIlpFUk8iLCJSaWdpZEJvZHkiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiZGlzYWxsb3dNdWx0aXBsZSIsInByb3BlcnRpZXMiLCJfdHlwZSIsIkR5bmFtaWMiLCJfYWxsb3dTbGVlcCIsIl9ncmF2aXR5U2NhbGUiLCJfbGluZWFyRGFtcGluZyIsIl9hbmd1bGFyRGFtcGluZyIsIl9saW5lYXJWZWxvY2l0eSIsInYyIiwiX2FuZ3VsYXJWZWxvY2l0eSIsIl9maXhlZFJvdGF0aW9uIiwiZW5hYmxlZCIsImdldCIsIl9lbmFibGVkIiwic2V0Iiwid2FybklEIiwidmlzaWJsZSIsIm92ZXJyaWRlIiwic3luY19wb3NpdGlvbiIsIl9zeW5jX3Bvc2l0aW9uXyIsInRvb2x0aXAiLCJDQ19ERVYiLCJzeW5jX3JvdGF0aW9uIiwiX3N5bmNfcm90YXRpb25fIiwiZW5hYmxlZENvbnRhY3RMaXN0ZW5lciIsImJ1bGxldCIsInR5cGUiLCJ2YWx1ZSIsIl9iMkJvZHkiLCJBbmltYXRlZCIsIlNldFR5cGUiLCJLaW5lbWF0aWMiLCJhbGxvd1NsZWVwIiwiSXNTbGVlcGluZ0FsbG93ZWQiLCJTZXRTbGVlcGluZ0FsbG93ZWQiLCJncmF2aXR5U2NhbGUiLCJTZXRHcmF2aXR5U2NhbGUiLCJsaW5lYXJEYW1waW5nIiwiU2V0TGluZWFyRGFtcGluZyIsImFuZ3VsYXJEYW1waW5nIiwiU2V0QW5ndWxhckRhbXBpbmciLCJsaW5lYXJWZWxvY2l0eSIsImx2IiwidmVsb2NpdHkiLCJHZXRMaW5lYXJWZWxvY2l0eSIsIngiLCJ5IiwiYjJib2R5IiwidGVtcCIsIm1fbGluZWFyVmVsb2NpdHkiLCJTZXQiLCJTZXRMaW5lYXJWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsIkdldEFuZ3VsYXJWZWxvY2l0eSIsIlNldEFuZ3VsYXJWZWxvY2l0eSIsImZpeGVkUm90YXRpb24iLCJTZXRGaXhlZFJvdGF0aW9uIiwiYXdha2UiLCJJc0F3YWtlIiwiU2V0QXdha2UiLCJhd2FrZU9uTG9hZCIsImFuaW1hdGFibGUiLCJhY3RpdmUiLCJJc0FjdGl2ZSIsIlNldEFjdGl2ZSIsImdldExvY2FsUG9pbnQiLCJ3b3JsZFBvaW50Iiwib3V0IiwicG9zIiwiR2V0TG9jYWxQb2ludCIsImdldFdvcmxkUG9pbnQiLCJsb2NhbFBvaW50IiwiR2V0V29ybGRQb2ludCIsImdldFdvcmxkVmVjdG9yIiwibG9jYWxWZWN0b3IiLCJ2ZWN0b3IiLCJHZXRXb3JsZFZlY3RvciIsImdldExvY2FsVmVjdG9yIiwid29ybGRWZWN0b3IiLCJHZXRMb2NhbFZlY3RvciIsImdldFdvcmxkUG9zaXRpb24iLCJHZXRQb3NpdGlvbiIsIkdldEFuZ2xlIiwiZ2V0TG9jYWxDZW50ZXIiLCJHZXRMb2NhbENlbnRlciIsImdldFdvcmxkQ2VudGVyIiwiR2V0V29ybGRDZW50ZXIiLCJnZXRMaW5lYXJWZWxvY2l0eUZyb21Xb3JsZFBvaW50IiwiR2V0TGluZWFyVmVsb2NpdHlGcm9tV29ybGRQb2ludCIsImdldE1hc3MiLCJHZXRNYXNzIiwiZ2V0SW5lcnRpYSIsIkdldEluZXJ0aWEiLCJnZXRKb2ludExpc3QiLCJqb2ludHMiLCJsaXN0IiwiR2V0Sm9pbnRMaXN0IiwicHVzaCIsImpvaW50IiwiX2pvaW50IiwicHJldiIsIm5leHQiLCJhcHBseUZvcmNlIiwiZm9yY2UiLCJwb2ludCIsIndha2UiLCJBcHBseUZvcmNlIiwiYXBwbHlGb3JjZVRvQ2VudGVyIiwiQXBwbHlGb3JjZVRvQ2VudGVyIiwiYXBwbHlUb3JxdWUiLCJ0b3JxdWUiLCJBcHBseVRvcnF1ZSIsImFwcGx5TGluZWFySW1wdWxzZSIsImltcHVsc2UiLCJBcHBseUxpbmVhckltcHVsc2UiLCJhcHBseUFuZ3VsYXJJbXB1bHNlIiwiQXBwbHlBbmd1bGFySW1wdWxzZSIsInN5bmNQb3NpdGlvbiIsImVuYWJsZUFuaW1hdGVkIiwibm9kZSIsImNvbnZlcnRUb1dvcmxkU3BhY2VBUiIsImIyUG9zIiwidGltZVN0ZXAiLCJnYW1lIiwiY29uZmlnIiwiU2V0VHJhbnNmb3JtVmVjIiwic3luY1JvdGF0aW9uIiwicm90YXRpb24iLCJiMlJvdGF0aW9uIiwicmVzZXRWZWxvY2l0eSIsInVwZGF0ZSIsImR0Iiwib25FbmFibGUiLCJfaW5pdCIsIm9uRGlzYWJsZSIsIl9kZXN0cm95IiwiX3JlZ2lzdGVyTm9kZUV2ZW50cyIsIm9uIiwiUE9TSVRJT05fQ0hBTkdFRCIsIl9vbk5vZGVQb3NpdGlvbkNoYW5nZWQiLCJST1RBVElPTl9DSEFOR0VEIiwiX29uTm9kZVJvdGF0aW9uQ2hhbmdlZCIsIlNDQUxFX0NIQU5HRUQiLCJfb25Ob2RlU2NhbGVDaGFuZ2VkIiwiX3VucmVnaXN0ZXJOb2RlRXZlbnRzIiwib2ZmIiwiZXZlbnQiLCJjb2xsaWRlcnMiLCJnZXRDb21wb25lbnRzIiwiUGh5c2ljc0NvbGxpZGVyIiwiaSIsImxlbmd0aCIsImFwcGx5IiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsInB1c2hEZWxheUV2ZW50IiwiX19pbml0IiwiX2luaXRlZCIsImJvZHlEZWYiLCJCb2R5RGVmIiwicG9zaXRpb24iLCJhbmdsZSIsIk1hdGgiLCJQSSIsIl9hZGRCb2R5IiwiX19kZXN0cm95IiwiX3JlbW92ZUJvZHkiLCJfZ2V0Qm9keSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQkMsU0FBdkM7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixPQUFPLENBQUMsa0JBQUQsQ0FBUCxDQUE0QkUsU0FBNUM7O0FBQ0EsSUFBSUMsc0JBQXNCLEdBQUdILE9BQU8sQ0FBQyxrQkFBRCxDQUFQLENBQTRCRyxzQkFBekQ7O0FBQ0EsSUFBSUMsc0JBQXNCLEdBQUdKLE9BQU8sQ0FBQyxrQkFBRCxDQUFQLENBQTRCSSxzQkFBekQ7O0FBRUEsSUFBSUMsZ0JBQWdCLEdBQUdMLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJLLGdCQUExQzs7QUFDQSxJQUFJQyxRQUFRLEdBQUdOLE9BQU8sQ0FBQyxrQkFBRCxDQUFQLENBQTRCTSxRQUEzQzs7QUFFQSxJQUFJQyxXQUFXLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxJQUFQLEVBQWxCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLElBQUlGLEVBQUUsQ0FBQ0MsSUFBUCxFQUFsQjtBQUVBLElBQUlFLFNBQVMsR0FBR0MsRUFBRSxDQUFDSCxJQUFILENBQVFJLElBQXhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0osRUFBRSxDQUFDSyxTQUZTO0FBSXJCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLDZDQURXO0FBRWpCQyxJQUFBQSxnQkFBZ0IsRUFBRTtBQUZELEdBSkE7QUFTckJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUVqQixRQUFRLENBQUNrQixPQURSO0FBRVJDLElBQUFBLFdBQVcsRUFBRSxJQUZMO0FBR1JDLElBQUFBLGFBQWEsRUFBRSxDQUhQO0FBSVJDLElBQUFBLGNBQWMsRUFBRSxDQUpSO0FBS1JDLElBQUFBLGVBQWUsRUFBRSxDQUxUO0FBTVJDLElBQUFBLGVBQWUsRUFBRWpCLEVBQUUsQ0FBQ2tCLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQU5UO0FBT1JDLElBQUFBLGdCQUFnQixFQUFFLENBUFY7QUFRUkMsSUFBQUEsY0FBYyxFQUFFLEtBUlI7QUFVUkMsSUFBQUEsT0FBTyxFQUFFO0FBQ0xDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLQyxRQUFaO0FBQ0gsT0FISTtBQUlMQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNieEIsUUFBQUEsRUFBRSxDQUFDeUIsTUFBSCxDQUFVLElBQVY7QUFDSCxPQU5JO0FBT0xDLE1BQUFBLE9BQU8sRUFBRSxLQVBKO0FBUUxDLE1BQUFBLFFBQVEsRUFBRTtBQVJMLEtBVkQ7QUFxQlJDLElBQUFBLGFBQWEsRUFBRTtBQUNYTixNQUFBQSxHQUFHLEVBQUUsZUFBVztBQUNaLGVBQU8sS0FBS08sZUFBWjtBQUNILE9BSFU7QUFJWEwsTUFBQUEsR0FBRyxFQUFFLGVBQVcsQ0FDZixDQUxVO0FBTVgsaUJBQVMsS0FORTtBQU9YTSxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSTtBQVBSLEtBckJQO0FBK0JSQyxJQUFBQSxhQUFhLEVBQUU7QUFDWFYsTUFBQUEsR0FBRyxFQUFFLGVBQVc7QUFDWixlQUFPLEtBQUtXLGVBQVo7QUFDSCxPQUhVO0FBSVhULE1BQUFBLEdBQUcsRUFBRSxlQUFXLENBQ2YsQ0FMVTtBQU1YLGlCQUFTLEtBTkU7QUFPWE0sTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFQUixLQS9CUDs7QUEwQ1I7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUcsSUFBQUEsc0JBQXNCLEVBQUU7QUFDcEIsaUJBQVMsS0FEVztBQUVwQkosTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFGQyxLQXBEaEI7O0FBeURSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ1E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRSSxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxLQURMO0FBRUpMLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJO0FBRmYsS0FuSUE7O0FBd0lSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUssSUFBQUEsSUFBSSxFQUFFO0FBQ0ZBLE1BQUFBLElBQUksRUFBRTFDLFFBREo7QUFFRm9DLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHVDQUZqQjtBQUdGVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS1gsS0FBWjtBQUNILE9BTEM7QUFNRmEsTUFBQUEsR0FBRyxFQUFFLGFBQVVhLEtBQVYsRUFBaUI7QUFDbEIsYUFBSzFCLEtBQUwsR0FBYTBCLEtBQWI7O0FBRUEsWUFBSSxLQUFLQyxPQUFULEVBQWtCO0FBQ2QsY0FBSUQsS0FBSyxLQUFLM0MsUUFBUSxDQUFDNkMsUUFBdkIsRUFBaUM7QUFDN0IsaUJBQUtELE9BQUwsQ0FBYUUsT0FBYixDQUFxQjlDLFFBQVEsQ0FBQytDLFNBQTlCO0FBQ0gsV0FGRCxNQUdLO0FBQ0QsaUJBQUtILE9BQUwsQ0FBYUUsT0FBYixDQUFxQkgsS0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFqQkMsS0FoSkU7O0FBb0tSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FLLElBQUFBLFVBQVUsRUFBRTtBQUNSWixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw2Q0FEWDtBQUVSVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLFlBQUksS0FBS2dCLE9BQVQsRUFBa0I7QUFDZCxpQkFBTyxLQUFLQSxPQUFMLENBQWFLLGlCQUFiLEVBQVA7QUFDSDs7QUFDRCxlQUFPLEtBQUs5QixXQUFaO0FBQ0gsT0FQTztBQVFSVyxNQUFBQSxHQUFHLEVBQUUsYUFBVWEsS0FBVixFQUFpQjtBQUNsQixhQUFLeEIsV0FBTCxHQUFtQndCLEtBQW5COztBQUVBLFlBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUNkLGVBQUtBLE9BQUwsQ0FBYU0sa0JBQWIsQ0FBZ0NQLEtBQWhDO0FBQ0g7QUFDSjtBQWRPLEtBOUtKOztBQStMUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FRLElBQUFBLFlBQVksRUFBRTtBQUNWZixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSwrQ0FEVDtBQUVWVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS1IsYUFBWjtBQUNILE9BSlM7QUFLVlUsTUFBQUEsR0FBRyxFQUFFLGFBQVVhLEtBQVYsRUFBaUI7QUFDbEIsYUFBS3ZCLGFBQUwsR0FBcUJ1QixLQUFyQjs7QUFDQSxZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWFRLGVBQWIsQ0FBNkJULEtBQTdCO0FBQ0g7QUFDSjtBQVZTLEtBdk1OOztBQW9OUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRVSxJQUFBQSxhQUFhLEVBQUU7QUFDWGpCLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURSO0FBRVhULE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLUCxjQUFaO0FBQ0gsT0FKVTtBQUtYUyxNQUFBQSxHQUFHLEVBQUUsYUFBVWEsS0FBVixFQUFpQjtBQUNsQixhQUFLdEIsY0FBTCxHQUFzQnNCLEtBQXRCOztBQUNBLFlBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUNkLGVBQUtBLE9BQUwsQ0FBYVUsZ0JBQWIsQ0FBOEIsS0FBS2pDLGNBQW5DO0FBQ0g7QUFDSjtBQVZVLEtBOU5QOztBQTJPUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRa0MsSUFBQUEsY0FBYyxFQUFFO0FBQ1puQixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxpREFEUDtBQUVaVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS04sZUFBWjtBQUNILE9BSlc7QUFLWlEsTUFBQUEsR0FBRyxFQUFFLGFBQVVhLEtBQVYsRUFBaUI7QUFDbEIsYUFBS3JCLGVBQUwsR0FBdUJxQixLQUF2Qjs7QUFDQSxZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWFZLGlCQUFiLENBQStCYixLQUEvQjtBQUNIO0FBQ0o7QUFWVyxLQXJQUjs7QUFrUVI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRYyxJQUFBQSxjQUFjLEVBQUU7QUFDWnJCLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGlEQURQO0FBRVpLLE1BQUFBLElBQUksRUFBRXBDLEVBQUUsQ0FBQ0gsSUFGRztBQUdaeUIsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixZQUFJOEIsRUFBRSxHQUFHLEtBQUtuQyxlQUFkOztBQUNBLFlBQUksS0FBS3FCLE9BQVQsRUFBa0I7QUFDZCxjQUFJZSxRQUFRLEdBQUcsS0FBS2YsT0FBTCxDQUFhZ0IsaUJBQWIsRUFBZjs7QUFDQUYsVUFBQUEsRUFBRSxDQUFDRyxDQUFILEdBQU9GLFFBQVEsQ0FBQ0UsQ0FBVCxHQUFXakUsU0FBbEI7QUFDQThELFVBQUFBLEVBQUUsQ0FBQ0ksQ0FBSCxHQUFPSCxRQUFRLENBQUNHLENBQVQsR0FBV2xFLFNBQWxCO0FBQ0g7O0FBQ0QsZUFBTzhELEVBQVA7QUFDSCxPQVhXO0FBWVo1QixNQUFBQSxHQUFHLEVBQUUsYUFBVWEsS0FBVixFQUFpQjtBQUNsQixhQUFLcEIsZUFBTCxHQUF1Qm9CLEtBQXZCO0FBQ0EsWUFBSW9CLE1BQU0sR0FBRyxLQUFLbkIsT0FBbEI7O0FBQ0EsWUFBSW1CLE1BQUosRUFBWTtBQUNSLGNBQUlDLElBQUksR0FBR0QsTUFBTSxDQUFDRSxnQkFBbEI7QUFDQUQsVUFBQUEsSUFBSSxDQUFDRSxHQUFMLENBQVN2QixLQUFLLENBQUNrQixDQUFOLEdBQVFqRSxTQUFqQixFQUE0QitDLEtBQUssQ0FBQ21CLENBQU4sR0FBUWxFLFNBQXBDO0FBQ0FtRSxVQUFBQSxNQUFNLENBQUNJLGlCQUFQLENBQXlCSCxJQUF6QjtBQUNIO0FBQ0o7QUFwQlcsS0ExUVI7O0FBaVNSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUksSUFBQUEsZUFBZSxFQUFFO0FBQ2JoQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxrREFETjtBQUViVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLFlBQUksS0FBS2dCLE9BQVQsRUFBa0I7QUFDZCxpQkFBTyxLQUFLQSxPQUFMLENBQWF5QixrQkFBYixLQUFvQ3ZFLHNCQUEzQztBQUNIOztBQUNELGVBQU8sS0FBSzJCLGdCQUFaO0FBQ0gsT0FQWTtBQVFiSyxNQUFBQSxHQUFHLEVBQUUsYUFBVWEsS0FBVixFQUFpQjtBQUNsQixhQUFLbEIsZ0JBQUwsR0FBd0JrQixLQUF4Qjs7QUFDQSxZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWEwQixrQkFBYixDQUFpQzNCLEtBQUssR0FBRzlDLHNCQUF6QztBQUNIO0FBQ0o7QUFiWSxLQXpTVDs7QUF5VFI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRMEUsSUFBQUEsYUFBYSxFQUFFO0FBQ1huQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxnREFEUjtBQUVYVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0YsY0FBWjtBQUNILE9BSlU7QUFLWEksTUFBQUEsR0FBRyxFQUFFLGFBQVVhLEtBQVYsRUFBaUI7QUFDbEIsYUFBS2pCLGNBQUwsR0FBc0JpQixLQUF0Qjs7QUFDQSxZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWE0QixnQkFBYixDQUE4QjdCLEtBQTlCO0FBQ0g7QUFDSjtBQVZVLEtBalVQOztBQThVUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1E4QixJQUFBQSxLQUFLLEVBQUU7QUFDSHpDLE1BQUFBLE9BQU8sRUFBRSxLQUROO0FBRUhJLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLHdDQUZoQjtBQUdIVCxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS2dCLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWE4QixPQUFiLEVBQWYsR0FBd0MsS0FBL0M7QUFDSCxPQUxFO0FBTUg1QyxNQUFBQSxHQUFHLEVBQUUsYUFBVWEsS0FBVixFQUFpQjtBQUNsQixZQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxlQUFLQSxPQUFMLENBQWErQixRQUFiLENBQXVCaEMsS0FBdkI7QUFDSDtBQUNKO0FBVkUsS0F0VkM7O0FBbVdSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUWlDLElBQUFBLFdBQVcsRUFBRTtBQUNULGlCQUFTLElBREE7QUFFVHhDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhDQUZWO0FBR1R3QyxNQUFBQSxVQUFVLEVBQUU7QUFISCxLQTNXTDs7QUFpWFI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxNQUFNLEVBQUU7QUFDSjlDLE1BQUFBLE9BQU8sRUFBRSxLQURMO0FBRUpKLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLZ0IsT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYW1DLFFBQWIsRUFBZixHQUF5QyxLQUFoRDtBQUNILE9BSkc7QUFLSmpELE1BQUFBLEdBQUcsRUFBRSxhQUFVYSxLQUFWLEVBQWlCO0FBQ2xCLFlBQUksS0FBS0MsT0FBVCxFQUFrQjtBQUNkLGVBQUtBLE9BQUwsQ0FBYW9DLFNBQWIsQ0FBdUJyQyxLQUF2QjtBQUNIO0FBQ0o7QUFURztBQXJZQSxHQVRTOztBQTJackI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSXNDLEVBQUFBLGFBQWEsRUFBRSx1QkFBVUMsVUFBVixFQUFzQkMsR0FBdEIsRUFBMkI7QUFDdENBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJN0UsRUFBRSxDQUFDa0IsRUFBSCxFQUFiOztBQUNBLFFBQUksS0FBS29CLE9BQVQsRUFBa0I7QUFDZDNDLE1BQUFBLFdBQVcsQ0FBQ2lFLEdBQVosQ0FBZ0JnQixVQUFVLENBQUNyQixDQUFYLEdBQWFqRSxTQUE3QixFQUF3Q3NGLFVBQVUsQ0FBQ3BCLENBQVgsR0FBYWxFLFNBQXJEOztBQUNBLFVBQUl3RixHQUFHLEdBQUcsS0FBS3hDLE9BQUwsQ0FBYXlDLGFBQWIsQ0FBMkJwRixXQUEzQixFQUF3Q2tGLEdBQXhDLENBQVY7O0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ3RCLENBQUosR0FBUXVCLEdBQUcsQ0FBQ3ZCLENBQUosR0FBTWpFLFNBQWQ7QUFDQXVGLE1BQUFBLEdBQUcsQ0FBQ3JCLENBQUosR0FBUXNCLEdBQUcsQ0FBQ3RCLENBQUosR0FBTWxFLFNBQWQ7QUFDSDs7QUFDRCxXQUFPdUYsR0FBUDtBQUNILEdBOWFvQjs7QUFnYnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lHLEVBQUFBLGFBQWEsRUFBRSx1QkFBVUMsVUFBVixFQUFzQkosR0FBdEIsRUFBMkI7QUFDdENBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJN0UsRUFBRSxDQUFDa0IsRUFBSCxFQUFiOztBQUNBLFFBQUksS0FBS29CLE9BQVQsRUFBa0I7QUFDZDNDLE1BQUFBLFdBQVcsQ0FBQ2lFLEdBQVosQ0FBZ0JxQixVQUFVLENBQUMxQixDQUFYLEdBQWFqRSxTQUE3QixFQUF3QzJGLFVBQVUsQ0FBQ3pCLENBQVgsR0FBYWxFLFNBQXJEOztBQUNBLFVBQUl3RixHQUFHLEdBQUcsS0FBS3hDLE9BQUwsQ0FBYTRDLGFBQWIsQ0FBMkJ2RixXQUEzQixFQUF3Q2tGLEdBQXhDLENBQVY7O0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ3RCLENBQUosR0FBUXVCLEdBQUcsQ0FBQ3ZCLENBQUosR0FBTWpFLFNBQWQ7QUFDQXVGLE1BQUFBLEdBQUcsQ0FBQ3JCLENBQUosR0FBUXNCLEdBQUcsQ0FBQ3RCLENBQUosR0FBTWxFLFNBQWQ7QUFDSDs7QUFDRCxXQUFPdUYsR0FBUDtBQUNILEdBbmNvQjs7QUFxY3JCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lNLEVBQUFBLGNBQWMsRUFBRSx3QkFBVUMsV0FBVixFQUF1QlAsR0FBdkIsRUFBNEI7QUFDeENBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJN0UsRUFBRSxDQUFDa0IsRUFBSCxFQUFiOztBQUNBLFFBQUksS0FBS29CLE9BQVQsRUFBa0I7QUFDZDNDLE1BQUFBLFdBQVcsQ0FBQ2lFLEdBQVosQ0FBZ0J3QixXQUFXLENBQUM3QixDQUFaLEdBQWNqRSxTQUE5QixFQUF5QzhGLFdBQVcsQ0FBQzVCLENBQVosR0FBY2xFLFNBQXZEOztBQUNBLFVBQUkrRixNQUFNLEdBQUcsS0FBSy9DLE9BQUwsQ0FBYWdELGNBQWIsQ0FBNEIzRixXQUE1QixFQUF5Q2tGLEdBQXpDLENBQWI7O0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ3RCLENBQUosR0FBUThCLE1BQU0sQ0FBQzlCLENBQVAsR0FBU2pFLFNBQWpCO0FBQ0F1RixNQUFBQSxHQUFHLENBQUNyQixDQUFKLEdBQVE2QixNQUFNLENBQUM3QixDQUFQLEdBQVNsRSxTQUFqQjtBQUNIOztBQUNELFdBQU91RixHQUFQO0FBQ0gsR0F4ZG9COztBQTBkckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSVUsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxXQUFWLEVBQXVCWCxHQUF2QixFQUE0QjtBQUN4Q0EsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUk3RSxFQUFFLENBQUNrQixFQUFILEVBQWI7O0FBQ0EsUUFBSSxLQUFLb0IsT0FBVCxFQUFrQjtBQUNkM0MsTUFBQUEsV0FBVyxDQUFDaUUsR0FBWixDQUFnQjRCLFdBQVcsQ0FBQ2pDLENBQVosR0FBY2pFLFNBQTlCLEVBQXlDa0csV0FBVyxDQUFDaEMsQ0FBWixHQUFjbEUsU0FBdkQ7O0FBQ0EsVUFBSStGLE1BQU0sR0FBRyxLQUFLL0MsT0FBTCxDQUFhbUQsY0FBYixDQUE0QjlGLFdBQTVCLEVBQXlDa0YsR0FBekMsQ0FBYjs7QUFDQUEsTUFBQUEsR0FBRyxDQUFDdEIsQ0FBSixHQUFROEIsTUFBTSxDQUFDOUIsQ0FBUCxHQUFTakUsU0FBakI7QUFDQXVGLE1BQUFBLEdBQUcsQ0FBQ3JCLENBQUosR0FBUTZCLE1BQU0sQ0FBQzdCLENBQVAsR0FBU2xFLFNBQWpCO0FBQ0g7O0FBQ0QsV0FBT3VGLEdBQVA7QUFDSCxHQTdlb0I7O0FBK2VyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWEsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVViLEdBQVYsRUFBZTtBQUM3QkEsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUk3RSxFQUFFLENBQUNrQixFQUFILEVBQWI7O0FBQ0EsUUFBSSxLQUFLb0IsT0FBVCxFQUFrQjtBQUNkLFVBQUl3QyxHQUFHLEdBQUcsS0FBS3hDLE9BQUwsQ0FBYXFELFdBQWIsRUFBVjs7QUFDQWQsTUFBQUEsR0FBRyxDQUFDdEIsQ0FBSixHQUFRdUIsR0FBRyxDQUFDdkIsQ0FBSixHQUFNakUsU0FBZDtBQUNBdUYsTUFBQUEsR0FBRyxDQUFDckIsQ0FBSixHQUFRc0IsR0FBRyxDQUFDdEIsQ0FBSixHQUFNbEUsU0FBZDtBQUNIOztBQUNELFdBQU91RixHQUFQO0FBQ0gsR0FoZ0JvQjs7QUFrZ0JyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lwRixFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBWTtBQUMxQixRQUFJLEtBQUs2QyxPQUFULEVBQWtCO0FBQ2QsYUFBTyxLQUFLQSxPQUFMLENBQWFzRCxRQUFiLEtBQTBCcEcsc0JBQWpDO0FBQ0g7O0FBQ0QsV0FBTyxDQUFQO0FBQ0gsR0EvZ0JvQjs7QUFpaEJyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lxRyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVoQixHQUFWLEVBQWU7QUFDM0JBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJN0UsRUFBRSxDQUFDa0IsRUFBSCxFQUFiOztBQUNBLFFBQUksS0FBS29CLE9BQVQsRUFBa0I7QUFDZCxVQUFJd0MsR0FBRyxHQUFHLEtBQUt4QyxPQUFMLENBQWF3RCxjQUFiLEVBQVY7O0FBQ0FqQixNQUFBQSxHQUFHLENBQUN0QixDQUFKLEdBQVF1QixHQUFHLENBQUN2QixDQUFKLEdBQU1qRSxTQUFkO0FBQ0F1RixNQUFBQSxHQUFHLENBQUNyQixDQUFKLEdBQVFzQixHQUFHLENBQUN0QixDQUFKLEdBQU1sRSxTQUFkO0FBQ0g7O0FBQ0QsV0FBT3VGLEdBQVA7QUFDSCxHQWppQm9COztBQW1pQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWtCLEVBQUFBLGNBQWMsRUFBRSx3QkFBVWxCLEdBQVYsRUFBZTtBQUMzQkEsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUk3RSxFQUFFLENBQUNrQixFQUFILEVBQWI7O0FBQ0EsUUFBSSxLQUFLb0IsT0FBVCxFQUFrQjtBQUNkLFVBQUl3QyxHQUFHLEdBQUcsS0FBS3hDLE9BQUwsQ0FBYTBELGNBQWIsRUFBVjs7QUFDQW5CLE1BQUFBLEdBQUcsQ0FBQ3RCLENBQUosR0FBUXVCLEdBQUcsQ0FBQ3ZCLENBQUosR0FBTWpFLFNBQWQ7QUFDQXVGLE1BQUFBLEdBQUcsQ0FBQ3JCLENBQUosR0FBUXNCLEdBQUcsQ0FBQ3RCLENBQUosR0FBTWxFLFNBQWQ7QUFDSDs7QUFDRCxXQUFPdUYsR0FBUDtBQUNILEdBbmpCb0I7O0FBcWpCckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSW9CLEVBQUFBLCtCQUErQixFQUFFLHlDQUFVckIsVUFBVixFQUFzQkMsR0FBdEIsRUFBMkI7QUFDeERBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJN0UsRUFBRSxDQUFDa0IsRUFBSCxFQUFiOztBQUNBLFFBQUksS0FBS29CLE9BQVQsRUFBa0I7QUFDZDNDLE1BQUFBLFdBQVcsQ0FBQ2lFLEdBQVosQ0FBZ0JnQixVQUFVLENBQUNyQixDQUFYLEdBQWFqRSxTQUE3QixFQUF3Q3NGLFVBQVUsQ0FBQ3BCLENBQVgsR0FBYWxFLFNBQXJEOztBQUNBLFVBQUkrRCxRQUFRLEdBQUcsS0FBS2YsT0FBTCxDQUFhNEQsK0JBQWIsQ0FBNkN2RyxXQUE3QyxFQUEwRGtGLEdBQTFELENBQWY7O0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ3RCLENBQUosR0FBUUYsUUFBUSxDQUFDRSxDQUFULEdBQVdqRSxTQUFuQjtBQUNBdUYsTUFBQUEsR0FBRyxDQUFDckIsQ0FBSixHQUFRSCxRQUFRLENBQUNHLENBQVQsR0FBV2xFLFNBQW5CO0FBQ0g7O0FBQ0QsV0FBT3VGLEdBQVA7QUFDSCxHQXhrQm9COztBQTBrQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSXNCLEVBQUFBLE9BQU8sRUFBRSxtQkFBWTtBQUNqQixXQUFPLEtBQUs3RCxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhOEQsT0FBYixFQUFmLEdBQXdDLENBQS9DO0FBQ0gsR0FwbEJvQjs7QUFzbEJyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixXQUFPLEtBQUsvRCxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhZ0UsVUFBYixLQUE0QmhILFNBQTVCLEdBQXdDQSxTQUF2RCxHQUFtRSxDQUExRTtBQUNILEdBaG1Cb0I7O0FBa21CckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJaUgsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksQ0FBQyxLQUFLakUsT0FBVixFQUFtQixPQUFPLEVBQVA7QUFFbkIsUUFBSWtFLE1BQU0sR0FBRyxFQUFiOztBQUVBLFFBQUlDLElBQUksR0FBRyxLQUFLbkUsT0FBTCxDQUFhb0UsWUFBYixFQUFYOztBQUNBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXLE9BQU8sRUFBUDtBQUVYRCxJQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUYsSUFBSSxDQUFDRyxLQUFMLENBQVdDLE1BQXZCLEVBUnNCLENBVXRCOztBQUNBLFFBQUlDLElBQUksR0FBR0wsSUFBSSxDQUFDSyxJQUFoQjs7QUFDQSxXQUFPQSxJQUFQLEVBQWE7QUFDVE4sTUFBQUEsTUFBTSxDQUFDRyxJQUFQLENBQVlHLElBQUksQ0FBQ0YsS0FBTCxDQUFXQyxNQUF2QjtBQUNBQyxNQUFBQSxJQUFJLEdBQUdBLElBQUksQ0FBQ0EsSUFBWjtBQUNILEtBZnFCLENBaUJ0Qjs7O0FBQ0EsUUFBSUMsSUFBSSxHQUFHTixJQUFJLENBQUNNLElBQWhCOztBQUNBLFdBQU9BLElBQVAsRUFBYTtBQUNUUCxNQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FBWUksSUFBSSxDQUFDSCxLQUFMLENBQVdDLE1BQXZCO0FBQ0FFLE1BQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDQSxJQUFaO0FBQ0g7O0FBRUQsV0FBT1AsTUFBUDtBQUNILEdBbm9Cb0I7O0FBcW9CckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lRLEVBQUFBLFVBQVUsRUFBRSxvQkFBVUMsS0FBVixFQUFpQkMsS0FBakIsRUFBd0JDLElBQXhCLEVBQThCO0FBQ3RDLFFBQUksS0FBSzdFLE9BQVQsRUFBa0I7QUFDZDNDLE1BQUFBLFdBQVcsQ0FBQ2lFLEdBQVosQ0FBZ0JxRCxLQUFLLENBQUMxRCxDQUFOLEdBQVFqRSxTQUF4QixFQUFtQzJILEtBQUssQ0FBQ3pELENBQU4sR0FBUWxFLFNBQTNDO0FBQ0FRLE1BQUFBLFdBQVcsQ0FBQzhELEdBQVosQ0FBZ0JzRCxLQUFLLENBQUMzRCxDQUFOLEdBQVFqRSxTQUF4QixFQUFtQzRILEtBQUssQ0FBQzFELENBQU4sR0FBUWxFLFNBQTNDOztBQUNBLFdBQUtnRCxPQUFMLENBQWE4RSxVQUFiLENBQXdCekgsV0FBeEIsRUFBcUNHLFdBQXJDLEVBQWtEcUgsSUFBbEQ7QUFDSDtBQUNKLEdBdnBCb0I7O0FBeXBCckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lFLEVBQUFBLGtCQUFrQixFQUFFLDRCQUFVSixLQUFWLEVBQWlCRSxJQUFqQixFQUF1QjtBQUN2QyxRQUFJLEtBQUs3RSxPQUFULEVBQWtCO0FBQ2QzQyxNQUFBQSxXQUFXLENBQUNpRSxHQUFaLENBQWdCcUQsS0FBSyxDQUFDMUQsQ0FBTixHQUFRakUsU0FBeEIsRUFBbUMySCxLQUFLLENBQUN6RCxDQUFOLEdBQVFsRSxTQUEzQzs7QUFDQSxXQUFLZ0QsT0FBTCxDQUFhZ0Ysa0JBQWIsQ0FBZ0MzSCxXQUFoQyxFQUE2Q3dILElBQTdDO0FBQ0g7QUFDSixHQXZxQm9COztBQXlxQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSSxFQUFBQSxXQUFXLEVBQUUscUJBQVVDLE1BQVYsRUFBa0JMLElBQWxCLEVBQXdCO0FBQ2pDLFFBQUksS0FBSzdFLE9BQVQsRUFBa0I7QUFDZCxXQUFLQSxPQUFMLENBQWFtRixXQUFiLENBQXlCRCxNQUFNLEdBQUNsSSxTQUFoQyxFQUEyQzZILElBQTNDO0FBQ0g7QUFDSixHQXRyQm9COztBQXdyQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lPLEVBQUFBLGtCQUFrQixFQUFFLDRCQUFVQyxPQUFWLEVBQW1CVCxLQUFuQixFQUEwQkMsSUFBMUIsRUFBZ0M7QUFDaEQsUUFBSSxLQUFLN0UsT0FBVCxFQUFrQjtBQUNkM0MsTUFBQUEsV0FBVyxDQUFDaUUsR0FBWixDQUFnQitELE9BQU8sQ0FBQ3BFLENBQVIsR0FBVWpFLFNBQTFCLEVBQXFDcUksT0FBTyxDQUFDbkUsQ0FBUixHQUFVbEUsU0FBL0M7QUFDQVEsTUFBQUEsV0FBVyxDQUFDOEQsR0FBWixDQUFnQnNELEtBQUssQ0FBQzNELENBQU4sR0FBUWpFLFNBQXhCLEVBQW1DNEgsS0FBSyxDQUFDMUQsQ0FBTixHQUFRbEUsU0FBM0M7O0FBQ0EsV0FBS2dELE9BQUwsQ0FBYXNGLGtCQUFiLENBQWdDakksV0FBaEMsRUFBNkNHLFdBQTdDLEVBQTBEcUgsSUFBMUQ7QUFDSDtBQUNKLEdBM3NCb0I7O0FBNnNCckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lVLEVBQUFBLG1CQUFtQixFQUFFLDZCQUFVRixPQUFWLEVBQW1CUixJQUFuQixFQUF5QjtBQUMxQyxRQUFJLEtBQUs3RSxPQUFULEVBQWtCO0FBQ2QsV0FBS0EsT0FBTCxDQUFhd0YsbUJBQWIsQ0FBaUNILE9BQU8sR0FBQ3JJLFNBQVIsR0FBa0JBLFNBQW5ELEVBQThENkgsSUFBOUQ7QUFDSDtBQUNKLEdBMXRCb0I7O0FBNHRCckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJWSxFQUFBQSxZQUFZLEVBQUUsc0JBQVVDLGNBQVYsRUFBMEI7QUFDcEMsUUFBSXZFLE1BQU0sR0FBRyxLQUFLbkIsT0FBbEI7QUFDQSxRQUFJLENBQUNtQixNQUFMLEVBQWE7QUFFYixRQUFJcUIsR0FBRyxHQUFHLEtBQUttRCxJQUFMLENBQVVDLHFCQUFWLENBQWdDbkksU0FBaEMsQ0FBVjtBQUVBLFFBQUkyRCxJQUFKOztBQUNBLFFBQUksS0FBS3RCLElBQUwsS0FBYzFDLFFBQVEsQ0FBQzZDLFFBQTNCLEVBQXFDO0FBQ2pDbUIsTUFBQUEsSUFBSSxHQUFHRCxNQUFNLENBQUNILGlCQUFQLEVBQVA7QUFDSCxLQUZELE1BR0s7QUFDREksTUFBQUEsSUFBSSxHQUFHRCxNQUFNLENBQUNrQyxXQUFQLEVBQVA7QUFDSDs7QUFFRGpDLElBQUFBLElBQUksQ0FBQ0gsQ0FBTCxHQUFTdUIsR0FBRyxDQUFDdkIsQ0FBSixHQUFRakUsU0FBakI7QUFDQW9FLElBQUFBLElBQUksQ0FBQ0YsQ0FBTCxHQUFTc0IsR0FBRyxDQUFDdEIsQ0FBSixHQUFRbEUsU0FBakI7O0FBRUEsUUFBSSxLQUFLOEMsSUFBTCxLQUFjMUMsUUFBUSxDQUFDNkMsUUFBdkIsSUFBbUN5RixjQUF2QyxFQUF1RDtBQUNuRCxVQUFJRyxLQUFLLEdBQUcxRSxNQUFNLENBQUNrQyxXQUFQLEVBQVo7QUFFQSxVQUFJeUMsUUFBUSxHQUFHcEksRUFBRSxDQUFDcUksSUFBSCxDQUFRQyxNQUFSLENBQWUsV0FBZixDQUFmO0FBQ0E1RSxNQUFBQSxJQUFJLENBQUNILENBQUwsR0FBUyxDQUFDRyxJQUFJLENBQUNILENBQUwsR0FBUzRFLEtBQUssQ0FBQzVFLENBQWhCLElBQW1CNkUsUUFBNUI7QUFDQTFFLE1BQUFBLElBQUksQ0FBQ0YsQ0FBTCxHQUFTLENBQUNFLElBQUksQ0FBQ0YsQ0FBTCxHQUFTMkUsS0FBSyxDQUFDM0UsQ0FBaEIsSUFBbUI0RSxRQUE1QjtBQUVBM0UsTUFBQUEsTUFBTSxDQUFDWSxRQUFQLENBQWdCLElBQWhCO0FBQ0FaLE1BQUFBLE1BQU0sQ0FBQ0ksaUJBQVAsQ0FBeUJILElBQXpCO0FBQ0gsS0FURCxNQVVLO0FBQ0RELE1BQUFBLE1BQU0sQ0FBQzhFLGVBQVAsQ0FBdUI3RSxJQUF2QixFQUE2QkQsTUFBTSxDQUFDbUMsUUFBUCxFQUE3QjtBQUNIO0FBQ0osR0Fyd0JvQjs7QUFzd0JyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k0QyxFQUFBQSxZQUFZLEVBQUUsc0JBQVVSLGNBQVYsRUFBMEI7QUFDcEMsUUFBSXZFLE1BQU0sR0FBRyxLQUFLbkIsT0FBbEI7QUFDQSxRQUFJLENBQUNtQixNQUFMLEVBQWE7QUFFYixRQUFJZ0YsUUFBUSxHQUFHbEosc0JBQXNCLEdBQUdFLGdCQUFnQixDQUFDLEtBQUt3SSxJQUFOLENBQXhEOztBQUNBLFFBQUksS0FBSzdGLElBQUwsS0FBYzFDLFFBQVEsQ0FBQzZDLFFBQXZCLElBQW1DeUYsY0FBdkMsRUFBdUQ7QUFDbkQsVUFBSVUsVUFBVSxHQUFHakYsTUFBTSxDQUFDbUMsUUFBUCxFQUFqQjtBQUNBLFVBQUl3QyxRQUFRLEdBQUdwSSxFQUFFLENBQUNxSSxJQUFILENBQVFDLE1BQVIsQ0FBZSxXQUFmLENBQWY7QUFDQTdFLE1BQUFBLE1BQU0sQ0FBQ1ksUUFBUCxDQUFnQixJQUFoQjtBQUNBWixNQUFBQSxNQUFNLENBQUNPLGtCQUFQLENBQTBCLENBQUN5RSxRQUFRLEdBQUdDLFVBQVosSUFBd0JOLFFBQWxEO0FBQ0gsS0FMRCxNQU1LO0FBQ0QzRSxNQUFBQSxNQUFNLENBQUM4RSxlQUFQLENBQXVCOUUsTUFBTSxDQUFDa0MsV0FBUCxFQUF2QixFQUE2QzhDLFFBQTdDO0FBQ0g7QUFDSixHQS94Qm9CO0FBaXlCckJFLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixRQUFJbEYsTUFBTSxHQUFHLEtBQUtuQixPQUFsQjtBQUNBLFFBQUksQ0FBQ21CLE1BQUwsRUFBYTtBQUViLFFBQUlDLElBQUksR0FBR0QsTUFBTSxDQUFDRSxnQkFBbEI7QUFDQUQsSUFBQUEsSUFBSSxDQUFDRSxHQUFMLENBQVMsQ0FBVCxFQUFZLENBQVo7QUFFQUgsSUFBQUEsTUFBTSxDQUFDSSxpQkFBUCxDQUF5QkgsSUFBekI7QUFDQUQsSUFBQUEsTUFBTSxDQUFDTyxrQkFBUCxDQUEwQixDQUExQjtBQUNILEdBMXlCb0I7QUE0eUJyQjRFLEVBQUFBLE1BQU0sRUFBRSxnQkFBU0MsRUFBVCxFQUNSO0FBQ0ksUUFBSSxLQUFLakgsYUFBVCxFQUF3QixLQUFLbUcsWUFBTCxDQUFrQixLQUFLM0YsSUFBTCxLQUFjMUMsUUFBUSxDQUFDNkMsUUFBekM7QUFDeEIsUUFBSSxLQUFLUCxhQUFULEVBQXdCLEtBQUt3RyxZQUFMLENBQWtCLEtBQUtwRyxJQUFMLEtBQWMxQyxRQUFRLENBQUM2QyxRQUF6QztBQUMzQixHQWh6Qm9CO0FBa3pCckJ1RyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEIsU0FBS0MsS0FBTDtBQUNILEdBcHpCb0I7QUFzekJyQkMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CLFNBQUtDLFFBQUw7QUFDSCxHQXh6Qm9CO0FBMHpCckJDLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFZO0FBQzdCLFFBQUlqQixJQUFJLEdBQUcsS0FBS0EsSUFBaEI7QUFDQUEsSUFBQUEsSUFBSSxDQUFDa0IsRUFBTCxDQUFRaEssU0FBUyxDQUFDaUssZ0JBQWxCLEVBQW9DLEtBQUtDLHNCQUF6QyxFQUFpRSxJQUFqRTtBQUNBcEIsSUFBQUEsSUFBSSxDQUFDa0IsRUFBTCxDQUFRaEssU0FBUyxDQUFDbUssZ0JBQWxCLEVBQW9DLEtBQUtDLHNCQUF6QyxFQUFpRSxJQUFqRTtBQUNBdEIsSUFBQUEsSUFBSSxDQUFDa0IsRUFBTCxDQUFRaEssU0FBUyxDQUFDcUssYUFBbEIsRUFBaUMsS0FBS0MsbUJBQXRDLEVBQTJELElBQTNEO0FBQ0gsR0EvekJvQjtBQWkwQnJCQyxFQUFBQSxxQkFBcUIsRUFBRSxpQ0FBWTtBQUMvQixRQUFJekIsSUFBSSxHQUFHLEtBQUtBLElBQWhCO0FBQ0FBLElBQUFBLElBQUksQ0FBQzBCLEdBQUwsQ0FBU3hLLFNBQVMsQ0FBQ2lLLGdCQUFuQixFQUFxQyxLQUFLQyxzQkFBMUMsRUFBa0UsSUFBbEU7QUFDQXBCLElBQUFBLElBQUksQ0FBQzBCLEdBQUwsQ0FBU3hLLFNBQVMsQ0FBQ21LLGdCQUFuQixFQUFxQyxLQUFLQyxzQkFBMUMsRUFBa0UsSUFBbEU7QUFDQXRCLElBQUFBLElBQUksQ0FBQzBCLEdBQUwsQ0FBU3hLLFNBQVMsQ0FBQ3FLLGFBQW5CLEVBQWtDLEtBQUtDLG1CQUF2QyxFQUE0RCxJQUE1RDtBQUNILEdBdDBCb0I7QUF3MEJyQkosRUFBQUEsc0JBQXNCLEVBQUUsa0NBQVk7QUFDaEMsU0FBS3RCLFlBQUwsQ0FBa0IsSUFBbEI7QUFDSCxHQTEwQm9CO0FBNDBCckJ3QixFQUFBQSxzQkFBc0IsRUFBRSxnQ0FBVUssS0FBVixFQUFpQjtBQUNyQyxTQUFLcEIsWUFBTCxDQUFrQixJQUFsQjtBQUNILEdBOTBCb0I7QUFnMUJyQmlCLEVBQUFBLG1CQUFtQixFQUFFLDZCQUFVRyxLQUFWLEVBQWlCO0FBQ2xDLFFBQUksS0FBS3RILE9BQVQsRUFBa0I7QUFDZCxVQUFJdUgsU0FBUyxHQUFHLEtBQUtDLGFBQUwsQ0FBbUI5SixFQUFFLENBQUMrSixlQUF0QixDQUFoQjs7QUFDQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdILFNBQVMsQ0FBQ0ksTUFBOUIsRUFBc0NELENBQUMsRUFBdkMsRUFBMkM7QUFDdkNILFFBQUFBLFNBQVMsQ0FBQ0csQ0FBRCxDQUFULENBQWFFLEtBQWI7QUFDSDtBQUNKO0FBQ0osR0F2MUJvQjtBQXkxQnRCbkIsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2QvSSxJQUFBQSxFQUFFLENBQUNtSyxRQUFILENBQVlDLGlCQUFaLEdBQWdDQyxjQUFoQyxDQUErQyxJQUEvQyxFQUFxRCxRQUFyRCxFQUErRCxFQUEvRDtBQUNILEdBMzFCb0I7QUE0MUJyQnBCLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQmpKLElBQUFBLEVBQUUsQ0FBQ21LLFFBQUgsQ0FBWUMsaUJBQVosR0FBZ0NDLGNBQWhDLENBQStDLElBQS9DLEVBQXFELFdBQXJELEVBQWtFLEVBQWxFO0FBQ0gsR0E5MUJvQjtBQWcyQnJCQyxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsUUFBSSxLQUFLQyxPQUFULEVBQWtCOztBQUVuQixTQUFLckIsbUJBQUw7O0FBRUMsUUFBSXNCLE9BQU8sR0FBRyxJQUFJNUssRUFBRSxDQUFDNkssT0FBUCxFQUFkOztBQUVBLFFBQUksS0FBS3JJLElBQUwsS0FBYzFDLFFBQVEsQ0FBQzZDLFFBQTNCLEVBQXFDO0FBQ2pDaUksTUFBQUEsT0FBTyxDQUFDcEksSUFBUixHQUFlMUMsUUFBUSxDQUFDK0MsU0FBeEI7QUFDSCxLQUZELE1BR0s7QUFDRCtILE1BQUFBLE9BQU8sQ0FBQ3BJLElBQVIsR0FBZSxLQUFLQSxJQUFwQjtBQUNIOztBQUVEb0ksSUFBQUEsT0FBTyxDQUFDOUgsVUFBUixHQUFxQixLQUFLQSxVQUExQjtBQUNBOEgsSUFBQUEsT0FBTyxDQUFDM0gsWUFBUixHQUF1QixLQUFLQSxZQUE1QjtBQUNBMkgsSUFBQUEsT0FBTyxDQUFDekgsYUFBUixHQUF3QixLQUFLQSxhQUE3QjtBQUNBeUgsSUFBQUEsT0FBTyxDQUFDdkgsY0FBUixHQUF5QixLQUFLQSxjQUE5QjtBQUVBLFFBQUlFLGNBQWMsR0FBRyxLQUFLQSxjQUExQjtBQUNBcUgsSUFBQUEsT0FBTyxDQUFDckgsY0FBUixHQUF5QixJQUFJdkQsRUFBRSxDQUFDQyxJQUFQLENBQVlzRCxjQUFjLENBQUNJLENBQWYsR0FBaUJqRSxTQUE3QixFQUF3QzZELGNBQWMsQ0FBQ0ssQ0FBZixHQUFpQmxFLFNBQXpELENBQXpCO0FBRUFrTCxJQUFBQSxPQUFPLENBQUMxRyxlQUFSLEdBQTBCLEtBQUtBLGVBQUwsR0FBdUJ2RSxzQkFBakQ7QUFFQWlMLElBQUFBLE9BQU8sQ0FBQ3ZHLGFBQVIsR0FBd0IsS0FBS0EsYUFBN0I7QUFDQXVHLElBQUFBLE9BQU8sQ0FBQ3JJLE1BQVIsR0FBaUIsS0FBS0EsTUFBdEI7QUFFQSxRQUFJOEYsSUFBSSxHQUFHLEtBQUtBLElBQWhCO0FBQ0EsUUFBSW5ELEdBQUcsR0FBR21ELElBQUksQ0FBQ0MscUJBQUwsQ0FBMkJuSSxTQUEzQixDQUFWO0FBQ0F5SyxJQUFBQSxPQUFPLENBQUNFLFFBQVIsR0FBbUIsSUFBSTlLLEVBQUUsQ0FBQ0MsSUFBUCxDQUFZaUYsR0FBRyxDQUFDdkIsQ0FBSixHQUFRakUsU0FBcEIsRUFBK0J3RixHQUFHLENBQUN0QixDQUFKLEdBQVFsRSxTQUF2QyxDQUFuQjtBQUNBa0wsSUFBQUEsT0FBTyxDQUFDRyxLQUFSLEdBQWdCLEVBQUVDLElBQUksQ0FBQ0MsRUFBTCxHQUFVLEdBQVosSUFBbUJwTCxnQkFBZ0IsQ0FBQ3dJLElBQUQsQ0FBbkQ7QUFFQXVDLElBQUFBLE9BQU8sQ0FBQ3JHLEtBQVIsR0FBZ0IsS0FBS0csV0FBckI7O0FBRUF0RSxJQUFBQSxFQUFFLENBQUNtSyxRQUFILENBQVlDLGlCQUFaLEdBQWdDVSxRQUFoQyxDQUF5QyxJQUF6QyxFQUErQ04sT0FBL0M7O0FBRUEsU0FBS0QsT0FBTCxHQUFlLElBQWY7QUFDSCxHQXI0Qm9CO0FBczRCckJRLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQixRQUFJLENBQUMsS0FBS1IsT0FBVixFQUFtQjs7QUFFbkJ2SyxJQUFBQSxFQUFFLENBQUNtSyxRQUFILENBQVlDLGlCQUFaLEdBQWdDWSxXQUFoQyxDQUE0QyxJQUE1Qzs7QUFDQSxTQUFLdEIscUJBQUw7O0FBRUEsU0FBS2EsT0FBTCxHQUFlLEtBQWY7QUFDSCxHQTc0Qm9CO0FBKzRCckJVLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixXQUFPLEtBQUszSSxPQUFaO0FBQ0g7QUFqNUJvQixDQUFULENBQWhCO0FBcTVCQXRDLEVBQUUsQ0FBQ0UsU0FBSCxHQUFlZ0wsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakwsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IE5vZGVFdmVudCA9IHJlcXVpcmUoJy4uL0NDTm9kZScpLkV2ZW50VHlwZTtcbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xudmFyIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcbnZhciBQSFlTSUNTX0FOR0xFX1RPX0FOR0xFID0gcmVxdWlyZSgnLi9DQ1BoeXNpY3NUeXBlcycpLlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XG5cbnZhciBnZXRXb3JsZFJvdGF0aW9uID0gcmVxdWlyZSgnLi91dGlscycpLmdldFdvcmxkUm90YXRpb247XG52YXIgQm9keVR5cGUgPSByZXF1aXJlKCcuL0NDUGh5c2ljc1R5cGVzJykuQm9keVR5cGU7XG5cbnZhciB0ZW1wYjJWZWMyMSA9IG5ldyBiMi5WZWMyKCk7XG52YXIgdGVtcGIyVmVjMjIgPSBuZXcgYjIuVmVjMigpO1xuXG52YXIgVkVDMl9aRVJPID0gY2MuVmVjMi5aRVJPO1xuXG4vKipcbiAqIEBjbGFzcyBSaWdpZEJvZHlcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG52YXIgUmlnaWRCb2R5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5SaWdpZEJvZHknLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL1JpZ2lkIEJvZHknLFxuICAgICAgICBkaXNhbGxvd011bHRpcGxlOiB0cnVlXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX3R5cGU6IEJvZHlUeXBlLkR5bmFtaWMsXG4gICAgICAgIF9hbGxvd1NsZWVwOiB0cnVlLFxuICAgICAgICBfZ3Jhdml0eVNjYWxlOiAxLFxuICAgICAgICBfbGluZWFyRGFtcGluZzogMCxcbiAgICAgICAgX2FuZ3VsYXJEYW1waW5nOiAwLFxuICAgICAgICBfbGluZWFyVmVsb2NpdHk6IGNjLnYyKDAsIDApLFxuICAgICAgICBfYW5ndWxhclZlbG9jaXR5OiAwLFxuICAgICAgICBfZml4ZWRSb3RhdGlvbjogZmFsc2UsXG5cbiAgICAgICAgZW5hYmxlZDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDgyMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBzeW5jX3Bvc2l0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zeW5jX3Bvc2l0aW9uXztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5zeW5jX3Bvc2l0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIHN5bmNfcm90YXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N5bmNfcm90YXRpb25fO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LnN5bmNfcm90YXRpb24nXG4gICAgICAgIH0sXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTaG91bGQgZW5hYmxlZCBjb250YWN0IGxpc3RlbmVyP1xuICAgICAgICAgKiBXaGVuIGEgY29sbGlzaW9uIGlzIHRyaWdnZXIsIHRoZSBjb2xsaXNpb24gY2FsbGJhY2sgd2lsbCBvbmx5IGJlIGNhbGxlZCB3aGVuIGVuYWJsZWQgY29udGFjdCBsaXN0ZW5lci5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKblkK/nlKjmjqXop6bmjqXlkKzlmajjgIJcbiAgICAgICAgICog5b2TIGNvbGxpZGVyIOS6p+eUn+eisOaSnuaXtu+8jOWPquacieW8gOWQr+S6huaOpeinpuaOpeWQrOWZqOaJjeS8muiwg+eUqOebuOW6lOeahOWbnuiwg+WHveaVsFxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZWRDb250YWN0TGlzdGVuZXJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZWRDb250YWN0TGlzdGVuZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5lbmFibGVkQ29udGFjdExpc3RlbmVyJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIENvbGxpc2lvbiBjYWxsYmFjay5cbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdHdvIGNvbGxpZGVyIGJlZ2luIHRvIHRvdWNoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjkuKTkuKrnorDmkp7kvZPlvIDlp4vmjqXop6bml7booqvosIPnlKjjgIJcbiAgICAgICAgICogQG1ldGhvZCBvbkJlZ2luQ29udGFjdFxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb250YWN0fSBjb250YWN0IC0gY29udGFjdCBpbmZvcm1hdGlvblxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gc2VsZkNvbGxpZGVyIC0gdGhlIGNvbGxpZGVyIGJlbG9uZyB0byB0aGlzIHJpZ2lkYm9keVxuICAgICAgICAgKiBAcGFyYW0ge1BoeXNpY3NDb2xsaWRlcn0gb3RoZXJDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gYW5vdGhlciByaWdpZGJvZHlcbiAgICAgICAgICovXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIENvbGxpc2lvbiBjYWxsYmFjay5cbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdHdvIGNvbGxpZGVyIGNlYXNlIHRvIHRvdWNoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjkuKTkuKrnorDmkp7kvZPlgZzmraLmjqXop6bml7booqvosIPnlKjjgIJcbiAgICAgICAgICogQG1ldGhvZCBvbkVuZENvbnRhY3RcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29udGFjdH0gY29udGFjdCAtIGNvbnRhY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IHNlbGZDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gdGhpcyByaWdpZGJvZHlcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IG90aGVyQ29sbGlkZXIgLSB0aGUgY29sbGlkZXIgYmVsb25nIHRvIGFub3RoZXIgcmlnaWRib2R5XG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBDb2xsaXNpb24gY2FsbGJhY2suXG4gICAgICAgICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gYSBjb250YWN0IGlzIHVwZGF0ZWQuXG4gICAgICAgICAqIFRoaXMgYWxsb3dzIHlvdSB0byBpbnNwZWN0IGEgY29udGFjdCBiZWZvcmUgaXQgZ29lcyB0byB0aGUgc29sdmVyKGUuZy4gZGlzYWJsZSBjb250YWN0KS5cblx0ICAgICAqIE5vdGU6IHRoaXMgaXMgY2FsbGVkIG9ubHkgZm9yIGF3YWtlIGJvZGllcy5cblx0ICAgICAqIE5vdGU6IHRoaXMgaXMgY2FsbGVkIGV2ZW4gd2hlbiB0aGUgbnVtYmVyIG9mIGNvbnRhY3QgcG9pbnRzIGlzIHplcm8uXG5cdCAgICAgKiBOb3RlOiB0aGlzIGlzIG5vdCBjYWxsZWQgZm9yIHNlbnNvcnMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog56Kw5pKe5Zue6LCD44CCXG4gICAgICAgICAqIOWmguaenOS9oOeahOiEmuacrOS4reWunueOsOS6hui/meS4quWHveaVsO+8jOmCo+S5iOWug+WwhuS8muWcqOaOpeinpuabtOaWsOaXtuiiq+iwg+eUqOOAglxuICAgICAgICAgKiDkvaDlj6/ku6XlnKjmjqXop6booqvlpITnkIbliY3moLnmja7ku5bljIXlkKvnmoTkv6Hmga/kvZzlh7rnm7jlupTnmoTlpITnkIbvvIzmr5TlpoLlsIbov5nkuKrmjqXop6bnpoHnlKjmjonjgIJcbiAgICAgICAgICog5rOo5oSP77ya5Zue6LCD5Y+q5Lya5Li66YaS552A55qE5Yia5L2T6LCD55So44CCXG4gICAgICAgICAqIOazqOaEj++8muaOpeinpueCueS4uumbtueahOaXtuWAmeS5n+acieWPr+iDveiiq+iwg+eUqOOAglxuICAgICAgICAgKiDms6jmhI/vvJrmhJ/nn6XkvZMoc2Vuc29yKeeahOWbnuiwg+S4jeS8muiiq+iwg+eUqOOAglxuICAgICAgICAgKiBAbWV0aG9kIG9uUHJlU29sdmVcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29udGFjdH0gY29udGFjdCAtIGNvbnRhY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IHNlbGZDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gdGhpcyByaWdpZGJvZHlcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IG90aGVyQ29sbGlkZXIgLSB0aGUgY29sbGlkZXIgYmVsb25nIHRvIGFub3RoZXIgcmlnaWRib2R5XG4gICAgICAgICAqL1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBDb2xsaXNpb24gY2FsbGJhY2suXG4gICAgICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIGEgY29udGFjdCBpcyB1cGRhdGVkLlxuICAgICAgICAgKiBZb3UgY2FuIGdldCB0aGUgaW1wdWxzZXMgZnJvbSB0aGUgY29udGFjdCBpbiB0aGlzIGNhbGxiYWNrLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOeisOaSnuWbnuiwg+OAglxuICAgICAgICAgKiDlpoLmnpzkvaDnmoTohJrmnKzkuK3lrp7njrDkuobov5nkuKrlh73mlbDvvIzpgqPkuYjlroPlsIbkvJrlnKjmjqXop6bmm7TmlrDlrozlkI7ooqvosIPnlKjjgIJcbiAgICAgICAgICog5L2g5Y+v5Lul5Zyo6L+Z5Liq5Zue6LCD5Lit5LuO5o6l6Kem5L+h5oGv5Lit6I635Y+W5Yiw5Yay6YeP5L+h5oGv44CCXG4gICAgICAgICAqIEBtZXRob2Qgb25Qb3N0U29sdmVcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29udGFjdH0gY29udGFjdCAtIGNvbnRhY3QgaW5mb3JtYXRpb25cbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IHNlbGZDb2xsaWRlciAtIHRoZSBjb2xsaWRlciBiZWxvbmcgdG8gdGhpcyByaWdpZGJvZHlcbiAgICAgICAgICogQHBhcmFtIHtQaHlzaWNzQ29sbGlkZXJ9IG90aGVyQ29sbGlkZXIgLSB0aGUgY29sbGlkZXIgYmVsb25nIHRvIGFub3RoZXIgcmlnaWRib2R5XG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIElzIHRoaXMgYSBmYXN0IG1vdmluZyBib2R5IHRoYXQgc2hvdWxkIGJlIHByZXZlbnRlZCBmcm9tIHR1bm5lbGluZyB0aHJvdWdoXG4gICAgICAgICAqIG90aGVyIG1vdmluZyBib2RpZXM/XG4gICAgICAgICAqIE5vdGUgOlxuICAgICAgICAgKiAtIEFsbCBib2RpZXMgYXJlIHByZXZlbnRlZCBmcm9tIHR1bm5lbGluZyB0aHJvdWdoIGtpbmVtYXRpYyBhbmQgc3RhdGljIGJvZGllcy4gVGhpcyBzZXR0aW5nIGlzIG9ubHkgY29uc2lkZXJlZCBvbiBkeW5hbWljIGJvZGllcy5cbiAgICAgICAgICogLSBZb3Ugc2hvdWxkIHVzZSB0aGlzIGZsYWcgc3BhcmluZ2x5IHNpbmNlIGl0IGluY3JlYXNlcyBwcm9jZXNzaW5nIHRpbWUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6L+Z5Liq5Yia5L2T5piv5ZCm5piv5LiA5Liq5b+r6YCf56e75Yqo55qE5Yia5L2T77yM5bm25LiU6ZyA6KaB56aB5q2i56m/6L+H5YW25LuW5b+r6YCf56e75Yqo55qE5Yia5L2T77yfXG4gICAgICAgICAqIOmcgOimgeazqOaEj+eahOaYryA6XG4gICAgICAgICAqICAtIOaJgOacieWImuS9k+mDveiiq+emgeatouS7jiDov5DliqjliJrkvZMg5ZKMIOmdmeaAgeWImuS9kyDkuK3nqb/ov4fjgILmraTpgInpobnlj6rlhbPms6jkuo4g5Yqo5oCB5Yia5L2T44CCXG4gICAgICAgICAqICAtIOW6lOivpeWwvemHj+WwkeeahOS9v+eUqOatpOmAiemhue+8jOWboOS4uuWug+S8muWinuWKoOeoi+W6j+WkhOeQhuaXtumXtOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGJ1bGxldFxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgYnVsbGV0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkuYnVsbGV0J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFJpZ2lkYm9keSB0eXBlIDogU3RhdGljLCBLaW5lbWF0aWMsIER5bmFtaWMgb3IgQW5pbWF0ZWQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yia5L2T57G75Z6L77yaIFN0YXRpYywgS2luZW1hdGljLCBEeW5hbWljIG9yIEFuaW1hdGVkLlxuICAgICAgICAgKiBAcHJvcGVydHkge1JpZ2lkQm9keVR5cGV9IHR5cGVcbiAgICAgICAgICogQGRlZmF1bHQgUmlnaWRCb2R5VHlwZS5EeW5hbWljXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBCb2R5VHlwZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkudHlwZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBCb2R5VHlwZS5BbmltYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldFR5cGUoQm9keVR5cGUuS2luZW1hdGljKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRUeXBlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTZXQgdGhpcyBmbGFnIHRvIGZhbHNlIGlmIHRoaXMgYm9keSBzaG91bGQgbmV2ZXIgZmFsbCBhc2xlZXAuXG4gICAgICAgICAqIE5vdGUgdGhhdCB0aGlzIGluY3JlYXNlcyBDUFUgdXNhZ2UuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aaC5p6c5q2k5Yia5L2T5rC46L+c6YO95LiN5bqU6K+l6L+b5YWl552h55yg77yM6YKj5LmI6K6+572u6L+Z5Liq5bGe5oCn5Li6IGZhbHNl44CCXG4gICAgICAgICAqIOmcgOimgeazqOaEj+i/meWwhuS9vyBDUFUg5Y2g55So546H5o+Q6auY44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWxsb3dTbGVlcFxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhbGxvd1NsZWVwOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmFsbG93U2xlZXAnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5LklzU2xlZXBpbmdBbGxvd2VkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbGxvd1NsZWVwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dTbGVlcCA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iMkJvZHkuU2V0U2xlZXBpbmdBbGxvd2VkKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogU2NhbGUgdGhlIGdyYXZpdHkgYXBwbGllZCB0byB0aGlzIGJvZHkuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog57yp5pS+5bqU55So5Zyo5q2k5Yia5L2T5LiK55qE6YeN5Yqb5YC8XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBncmF2aXR5U2NhbGVcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgZ3Jhdml0eVNjYWxlOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmdyYXZpdHlTY2FsZScsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3Jhdml0eVNjYWxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3Jhdml0eVNjYWxlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iMkJvZHkuU2V0R3Jhdml0eVNjYWxlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogTGluZWFyIGRhbXBpbmcgaXMgdXNlIHRvIHJlZHVjZSB0aGUgbGluZWFyIHZlbG9jaXR5LlxuICAgICAgICAgKiBUaGUgZGFtcGluZyBwYXJhbWV0ZXIgY2FuIGJlIGxhcmdlciB0aGFuIDEsIGJ1dCB0aGUgZGFtcGluZyBlZmZlY3QgYmVjb21lcyBzZW5zaXRpdmUgdG8gdGhlXG4gICAgICAgICAqIHRpbWUgc3RlcCB3aGVuIHRoZSBkYW1waW5nIHBhcmFtZXRlciBpcyBsYXJnZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiBMaW5lYXIgZGFtcGluZyDnlKjkuo7oobDlh4/liJrkvZPnmoTnur/mgKfpgJ/luqbjgILoobDlh4/ns7vmlbDlj6/ku6XlpKfkuo4gMe+8jOS9huaYr+W9k+ihsOWHj+ezu+aVsOavlOi+g+Wkp+eahOaXtuWAme+8jOihsOWHj+eahOaViOaenOS8muWPmOW+l+avlOi+g+aVj+aEn+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGluZWFyRGFtcGluZ1xuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBsaW5lYXJEYW1waW5nOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmxpbmVhckRhbXBpbmcnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVhckRhbXBpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lYXJEYW1waW5nID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9iMkJvZHkuU2V0TGluZWFyRGFtcGluZyh0aGlzLl9saW5lYXJEYW1waW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogQW5ndWxhciBkYW1waW5nIGlzIHVzZSB0byByZWR1Y2UgdGhlIGFuZ3VsYXIgdmVsb2NpdHkuIFRoZSBkYW1waW5nIHBhcmFtZXRlclxuICAgICAgICAgKiBjYW4gYmUgbGFyZ2VyIHRoYW4gMSBidXQgdGhlIGRhbXBpbmcgZWZmZWN0IGJlY29tZXMgc2Vuc2l0aXZlIHRvIHRoZVxuICAgICAgICAgKiB0aW1lIHN0ZXAgd2hlbiB0aGUgZGFtcGluZyBwYXJhbWV0ZXIgaXMgbGFyZ2UuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICogQW5ndWxhciBkYW1waW5nIOeUqOS6juihsOWHj+WImuS9k+eahOinkumAn+W6puOAguihsOWHj+ezu+aVsOWPr+S7peWkp+S6jiAx77yM5L2G5piv5b2T6KGw5YeP57O75pWw5q+U6L6D5aSn55qE5pe25YCZ77yM6KGw5YeP55qE5pWI5p6c5Lya5Y+Y5b6X5q+U6L6D5pWP5oSf44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbmd1bGFyRGFtcGluZ1xuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBhbmd1bGFyRGFtcGluZzoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5hbmd1bGFyRGFtcGluZycsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5ndWxhckRhbXBpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmd1bGFyRGFtcGluZyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldEFuZ3VsYXJEYW1waW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGxpbmVhciB2ZWxvY2l0eSBvZiB0aGUgYm9keSdzIG9yaWdpbiBpbiB3b3JsZCBjby1vcmRpbmF0ZXMuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5Yia5L2T5Zyo5LiW55WM5Z2Q5qCH5LiL55qE57q/5oCn6YCf5bqmXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbGluZWFyVmVsb2NpdHlcbiAgICAgICAgICogQGRlZmF1bHQgY2MudjIoMCwwKVxuICAgICAgICAgKi9cbiAgICAgICAgbGluZWFyVmVsb2NpdHk6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkubGluZWFyVmVsb2NpdHknLFxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMixcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBsdiA9IHRoaXMuX2xpbmVhclZlbG9jaXR5O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gdGhpcy5fYjJCb2R5LkdldExpbmVhclZlbG9jaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGx2LnggPSB2ZWxvY2l0eS54KlBUTV9SQVRJTztcbiAgICAgICAgICAgICAgICAgICAgbHYueSA9IHZlbG9jaXR5LnkqUFRNX1JBVElPO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lYXJWZWxvY2l0eSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciBiMmJvZHkgPSB0aGlzLl9iMkJvZHk7XG4gICAgICAgICAgICAgICAgaWYgKGIyYm9keSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcCA9IGIyYm9keS5tX2xpbmVhclZlbG9jaXR5O1xuICAgICAgICAgICAgICAgICAgICB0ZW1wLlNldCh2YWx1ZS54L1BUTV9SQVRJTywgdmFsdWUueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgICAgICAgICBiMmJvZHkuU2V0TGluZWFyVmVsb2NpdHkodGVtcCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhbmd1bGFyIHZlbG9jaXR5IG9mIHRoZSBib2R5LlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWImuS9k+eahOinkumAn+W6plxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYW5ndWxhclZlbG9jaXR5XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGFuZ3VsYXJWZWxvY2l0eToge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5hbmd1bGFyVmVsb2NpdHknLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5LkdldEFuZ3VsYXJWZWxvY2l0eSgpICogUEhZU0lDU19BTkdMRV9UT19BTkdMRTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ3VsYXJWZWxvY2l0eTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuZ3VsYXJWZWxvY2l0eSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldEFuZ3VsYXJWZWxvY2l0eSggdmFsdWUgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNob3VsZCB0aGlzIGJvZHkgYmUgcHJldmVudGVkIGZyb20gcm90YXRpbmc/XG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm56aB5q2i5q2k5Yia5L2T6L+b6KGM5peL6L2sXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZml4ZWRSb3RhdGlvblxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZml4ZWRSb3RhdGlvbjoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnJpZ2lkYm9keS5maXhlZFJvdGF0aW9uJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maXhlZFJvdGF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZml4ZWRSb3RhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldEZpeGVkUm90YXRpb24odmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTZXQgdGhlIHNsZWVwIHN0YXRlIG9mIHRoZSBib2R5LiBBIHNsZWVwaW5nIGJvZHkgaGFzIHZlcnkgbG93IENQVSBjb3N0LihXaGVuIHRoZSByaWdpZCBib2R5IGlzIGhpdCwgaWYgdGhlIHJpZ2lkIGJvZHkgaXMgaW4gc2xlZXAgc3RhdGUsIGl0IHdpbGwgYmUgaW1tZWRpYXRlbHkgYXdha2VuZWQuKVxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOiuvue9ruWImuS9k+eahOedoeecoOeKtuaAgeOAgiDnnaHnnKDnmoTliJrkvZPlhbfmnInpnZ7luLjkvY7nmoQgQ1BVIOaIkOacrOOAgu+8iOW9k+WImuS9k+iiq+eisOaSnuWIsOaXtu+8jOWmguaenOWImuS9k+WkhOS6juedoeecoOeKtuaAge+8jOWug+S8mueri+WNs+iiq+WUpOmGku+8iVxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGF3YWtlXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBhd2FrZToge1xuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucmlnaWRib2R5LmF3YWtlJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9iMkJvZHkgPyB0aGlzLl9iMkJvZHkuSXNBd2FrZSgpIDogZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2IyQm9keS5TZXRBd2FrZSggdmFsdWUgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogV2hldGhlciB0byB3YWtlIHVwIHRoaXMgcmlnaWQgYm9keSBkdXJpbmcgaW5pdGlhbGl6YXRpb25cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKblnKjliJ3lp4vljJbml7bllKTphpLmraTliJrkvZNcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhd2FrZU9uTG9hZFxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhd2FrZU9uTG9hZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5yaWdpZGJvZHkuYXdha2VPbkxvYWQnLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogU2V0IHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIGJvZHkuIEFuIGluYWN0aXZlIGJvZHkgaXMgbm90XG5cdCAgICAgKiBzaW11bGF0ZWQgYW5kIGNhbm5vdCBiZSBjb2xsaWRlZCB3aXRoIG9yIHdva2VuIHVwLlxuXHQgICAgICogSWYgYm9keSBpcyBhY3RpdmUsIGFsbCBmaXh0dXJlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZVxuXHQgICAgICogYnJvYWQtcGhhc2UuXG5cdCAgICAgKiBJZiBib2R5IGlzIGluYWN0aXZlLCBhbGwgZml4dHVyZXMgd2lsbCBiZSByZW1vdmVkIGZyb21cblx0ICAgICAqIHRoZSBicm9hZC1waGFzZSBhbmQgYWxsIGNvbnRhY3RzIHdpbGwgYmUgZGVzdHJveWVkLlxuXHQgICAgICogRml4dHVyZXMgb24gYW4gaW5hY3RpdmUgYm9keSBhcmUgaW1wbGljaXRseSBpbmFjdGl2ZSBhbmQgd2lsbFxuXHQgICAgICogbm90IHBhcnRpY2lwYXRlIGluIGNvbGxpc2lvbnMsIHJheS1jYXN0cywgb3IgcXVlcmllcy5cblx0ICAgICAqIEpvaW50cyBjb25uZWN0ZWQgdG8gYW4gaW5hY3RpdmUgYm9keSBhcmUgaW1wbGljaXRseSBpbmFjdGl2ZS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDorr7nva7liJrkvZPnmoTmv4DmtLvnirbmgIHjgILkuIDkuKrpnZ7mv4DmtLvnirbmgIHkuIvnmoTliJrkvZPmmK/kuI3kvJrooqvmqKHmi5/lkoznorDmkp7nmoTvvIzkuI3nrqHlroPmmK/lkKblpITkuo7nnaHnnKDnirbmgIHkuIvjgIJcbiAgICAgICAgICog5aaC5p6c5Yia5L2T5aSE5LqO5r+A5rS754q25oCB5LiL77yM5omA5pyJ5aS55YW35Lya6KKr5re75Yqg5YiwIOeyl+a1i+mYtuaute+8iGJyb2FkLXBoYXNl77yJ44CCXG4gICAgICAgICAqIOWmguaenOWImuS9k+WkhOS6jumdnua/gOa0u+eKtuaAgeS4i++8jOaJgOacieWkueWFt+S8muiiq+S7jiDnspfmtYvpmLbmrrXvvIhicm9hZC1waGFzZe+8ieS4reenu+mZpOOAglxuICAgICAgICAgKiDlnKjpnZ7mv4DmtLvnirbmgIHkuIvnmoTlpLnlhbfkuI3kvJrlj4LkuI7liLDnorDmkp7vvIzlsITnur/vvIzmiJbogIXmn6Xmib7kuK1cbiAgICAgICAgICog6ZO+5o6l5Yiw6Z2e5r+A5rS754q25oCB5LiL5Yia5L2T55qE5YWz6IqC5Lmf5piv6Z2e5r+A5rS755qE44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWN0aXZlXG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYjJCb2R5ID8gdGhpcy5fYjJCb2R5LklzQWN0aXZlKCkgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYjJCb2R5LlNldEFjdGl2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXJ0cyBhIGdpdmVuIHBvaW50IGluIHRoZSB3b3JsZCBjb29yZGluYXRlIHN5c3RlbSB0byB0aGlzIHJpZ2lkIGJvZHkncyBsb2NhbCBjb29yZGluYXRlIHN5c3RlbVxuICAgICAqICEjemhcbiAgICAgKiDlsIbkuIDkuKrnu5nlrprnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTngrnovazmjaLkuLrliJrkvZPmnKzlnLDlnZDmoIfns7vkuIvnmoTngrlcbiAgICAgKiBAbWV0aG9kIGdldExvY2FsUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHdvcmxkUG9pbnQgLSBhIHBvaW50IGluIHdvcmxkIGNvb3JkaW5hdGVzLlxuICAgICAqIEBwYXJhbSB7VmVjMn0gb3V0IC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgY29ycmVzcG9uZGluZyBsb2NhbCBwb2ludCByZWxhdGl2ZSB0byB0aGUgYm9keSdzIG9yaWdpbi5cbiAgICAgKi9cbiAgICBnZXRMb2NhbFBvaW50OiBmdW5jdGlvbiAod29ybGRQb2ludCwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBjYy52MigpO1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQod29ybGRQb2ludC54L1BUTV9SQVRJTywgd29ybGRQb2ludC55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5fYjJCb2R5LkdldExvY2FsUG9pbnQodGVtcGIyVmVjMjEsIG91dCk7XG4gICAgICAgICAgICBvdXQueCA9IHBvcy54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gcG9zLnkqUFRNX1JBVElPO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXJ0cyBhIGdpdmVuIHBvaW50IGluIHRoaXMgcmlnaWQgYm9keSdzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHRoZSB3b3JsZCBjb29yZGluYXRlIHN5c3RlbVxuICAgICAqICEjemhcbiAgICAgKiDlsIbkuIDkuKrnu5nlrprnmoTliJrkvZPmnKzlnLDlnZDmoIfns7vkuIvnmoTngrnovazmjaLkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTngrlcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGxvY2FsUG9pbnQgLSBhIHBvaW50IGluIGxvY2FsIGNvb3JkaW5hdGVzLlxuICAgICAqIEBwYXJhbSB7VmVjMn0gb3V0IC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgc2FtZSBwb2ludCBleHByZXNzZWQgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICovXG4gICAgZ2V0V29ybGRQb2ludDogZnVuY3Rpb24gKGxvY2FsUG9pbnQsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdGVtcGIyVmVjMjEuU2V0KGxvY2FsUG9pbnQueC9QVE1fUkFUSU8sIGxvY2FsUG9pbnQueS9QVE1fUkFUSU8pO1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2IyQm9keS5HZXRXb3JsZFBvaW50KHRlbXBiMlZlYzIxLCBvdXQpO1xuICAgICAgICAgICAgb3V0LnggPSBwb3MueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHBvcy55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYSBnaXZlbiB2ZWN0b3IgaW4gdGhpcyByaWdpZCBib2R5J3MgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0gdG8gdGhlIHdvcmxkIGNvb3JkaW5hdGUgc3lzdGVtXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4que7meWumueahOWImuS9k+acrOWcsOWdkOagh+ezu+S4i+eahOWQkemHj+i9rOaNouS4uuS4lueVjOWdkOagh+ezu+S4i+eahOWQkemHj1xuICAgICAqIEBtZXRob2QgZ2V0V29ybGRWZWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IGxvY2FsVmVjdG9yIC0gYSB2ZWN0b3IgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHtWZWMyfSBvdXQgLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgc2FtZSB2ZWN0b3IgZXhwcmVzc2VkIGluIGxvY2FsIGNvb3JkaW5hdGVzLlxuICAgICAqL1xuICAgIGdldFdvcmxkVmVjdG9yOiBmdW5jdGlvbiAobG9jYWxWZWN0b3IsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdGVtcGIyVmVjMjEuU2V0KGxvY2FsVmVjdG9yLngvUFRNX1JBVElPLCBsb2NhbFZlY3Rvci55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gdGhpcy5fYjJCb2R5LkdldFdvcmxkVmVjdG9yKHRlbXBiMlZlYzIxLCBvdXQpO1xuICAgICAgICAgICAgb3V0LnggPSB2ZWN0b3IueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHZlY3Rvci55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYSBnaXZlbiB2ZWN0b3IgaW4gdGhlIHdvcmxkIGNvb3JkaW5hdGUgc3lzdGVtIHRvIHRoaXMgcmlnaWQgYm9keSdzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4que7meWumueahOS4lueVjOWdkOagh+ezu+S4i+eahOWQkemHj+i9rOaNouS4uuWImuS9k+acrOWcsOWdkOagh+ezu+S4i+eahOWQkemHj1xuICAgICAqIEBtZXRob2QgZ2V0TG9jYWxWZWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHdvcmxkVmVjdG9yIC0gYSB2ZWN0b3IgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHtWZWMyfSBvdXQgLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgY29ycmVzcG9uZGluZyBsb2NhbCB2ZWN0b3IgcmVsYXRpdmUgdG8gdGhlIGJvZHkncyBvcmlnaW4uXG4gICAgICovXG4gICAgZ2V0TG9jYWxWZWN0b3I6IGZ1bmN0aW9uICh3b3JsZFZlY3Rvciwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBjYy52MigpO1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQod29ybGRWZWN0b3IueC9QVE1fUkFUSU8sIHdvcmxkVmVjdG9yLnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHZhciB2ZWN0b3IgPSB0aGlzLl9iMkJvZHkuR2V0TG9jYWxWZWN0b3IodGVtcGIyVmVjMjEsIG91dCk7XG4gICAgICAgICAgICBvdXQueCA9IHZlY3Rvci54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gdmVjdG9yLnkqUFRNX1JBVElPO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIHdvcmxkIGJvZHkgb3JpZ2luIHBvc2l0aW9uLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPkuJbnlYzlnZDmoIfns7vkuIvnmoTljp/ngrnlgLxcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG91dCAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBib2R5J3Mgb3JpZ2luLlxuICAgICAqL1xuICAgIGdldFdvcmxkUG9zaXRpb246IGZ1bmN0aW9uIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLl9iMkJvZHkuR2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIG91dC54ID0gcG9zLngqUFRNX1JBVElPO1xuICAgICAgICAgICAgb3V0LnkgPSBwb3MueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgYm9keSByb3RhdGlvbiBhbmdsZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5LiW55WM5Z2Q5qCH57O75LiL55qE5peL6L2s5YC844CCXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFJvdGF0aW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgY3VycmVudCB3b3JsZCByb3RhdGlvbiBhbmdsZS5cbiAgICAgKi9cbiAgICBnZXRXb3JsZFJvdGF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iMkJvZHkuR2V0QW5nbGUoKSAqIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGxvY2FsIHBvc2l0aW9uIG9mIHRoZSBjZW50ZXIgb2YgbWFzcy5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5pys5Zyw5Z2Q5qCH57O75LiL55qE6LSo5b+DXG4gICAgICogQG1ldGhvZCBnZXRMb2NhbENlbnRlclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSBsb2NhbCBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIG1hc3MuXG4gICAgICovXG4gICAgZ2V0TG9jYWxDZW50ZXI6IGZ1bmN0aW9uIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLl9iMkJvZHkuR2V0TG9jYWxDZW50ZXIoKTtcbiAgICAgICAgICAgIG91dC54ID0gcG9zLngqUFRNX1JBVElPO1xuICAgICAgICAgICAgb3V0LnkgPSBwb3MueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgcG9zaXRpb24gb2YgdGhlIGNlbnRlciBvZiBtYXNzLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPkuJbnlYzlnZDmoIfns7vkuIvnmoTotKjlv4NcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkQ2VudGVyXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHdvcmxkIHBvc2l0aW9uIG9mIHRoZSBjZW50ZXIgb2YgbWFzcy5cbiAgICAgKi9cbiAgICBnZXRXb3JsZENlbnRlcjogZnVuY3Rpb24gKG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgY2MudjIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuX2IyQm9keS5HZXRXb3JsZENlbnRlcigpO1xuICAgICAgICAgICAgb3V0LnggPSBwb3MueCpQVE1fUkFUSU87XG4gICAgICAgICAgICBvdXQueSA9IHBvcy55KlBUTV9SQVRJTztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCBsaW5lYXIgdmVsb2NpdHkgb2YgYSB3b3JsZCBwb2ludCBhdHRhY2hlZCB0byB0aGlzIGJvZHkuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluWImuS9k+S4iuaMh+WumueCueeahOe6v+aAp+mAn+W6plxuICAgICAqIEBtZXRob2QgZ2V0TGluZWFyVmVsb2NpdHlGcm9tV29ybGRQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjMn0gd29ybGRQb2ludCAtIGEgcG9pbnQgaW4gd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIHtWZWMyfSBvdXQgLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyBwb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHRoZSB3b3JsZCB2ZWxvY2l0eSBvZiBhIHBvaW50LlxuICAgICAqL1xuICAgIGdldExpbmVhclZlbG9jaXR5RnJvbVdvcmxkUG9pbnQ6IGZ1bmN0aW9uICh3b3JsZFBvaW50LCBvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLl9iMkJvZHkpIHtcbiAgICAgICAgICAgIHRlbXBiMlZlYzIxLlNldCh3b3JsZFBvaW50LngvUFRNX1JBVElPLCB3b3JsZFBvaW50LnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMuX2IyQm9keS5HZXRMaW5lYXJWZWxvY2l0eUZyb21Xb3JsZFBvaW50KHRlbXBiMlZlYzIxLCBvdXQpO1xuICAgICAgICAgICAgb3V0LnggPSB2ZWxvY2l0eS54KlBUTV9SQVRJTztcbiAgICAgICAgICAgIG91dC55ID0gdmVsb2NpdHkueSpQVE1fUkFUSU87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0b3RhbCBtYXNzIG9mIHRoZSBib2R5LlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bliJrkvZPnmoTotKjph4/jgIJcbiAgICAgKiBAbWV0aG9kIGdldE1hc3NcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSB0b3RhbCBtYXNzIG9mIHRoZSBib2R5LlxuICAgICAqL1xuICAgIGdldE1hc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keSA/IHRoaXMuX2IyQm9keS5HZXRNYXNzKCkgOiAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSByb3RhdGlvbmFsIGluZXJ0aWEgb2YgdGhlIGJvZHkgYWJvdXQgdGhlIGxvY2FsIG9yaWdpbi5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5Yia5L2T5pys5Zyw5Z2Q5qCH57O75LiL5Y6f54K555qE5peL6L2s5oOv5oCnXG4gICAgICogQG1ldGhvZCBnZXRJbmVydGlhXG4gICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgcm90YXRpb25hbCBpbmVydGlhLCB1c3VhbGx5IGluIGtnLW1eMi5cbiAgICAgKi9cbiAgICBnZXRJbmVydGlhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iMkJvZHkgPyB0aGlzLl9iMkJvZHkuR2V0SW5lcnRpYSgpICogUFRNX1JBVElPICogUFRNX1JBVElPIDogMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCBhbGwgdGhlIGpvaW50cyBjb25uZWN0IHRvIHRoZSByaWdpZGJvZHkuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlumTvuaOpeWIsOatpOWImuS9k+eahOaJgOacieWFs+iKglxuICAgICAqIEBtZXRob2QgZ2V0Sm9pbnRMaXN0XG4gICAgICogQHJldHVybiB7W0pvaW50XX0gdGhlIGpvaW50IGxpc3QuXG4gICAgICovXG4gICAgZ2V0Sm9pbnRMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYjJCb2R5KSByZXR1cm4gW107XG5cbiAgICAgICAgdmFyIGpvaW50cyA9IFtdO1xuXG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5fYjJCb2R5LkdldEpvaW50TGlzdCgpO1xuICAgICAgICBpZiAoIWxpc3QpIHJldHVybiBbXTtcblxuICAgICAgICBqb2ludHMucHVzaChsaXN0LmpvaW50Ll9qb2ludCk7XG5cbiAgICAgICAgLy8gZmluZCBwcmV2IGpvaW50XG4gICAgICAgIHZhciBwcmV2ID0gbGlzdC5wcmV2O1xuICAgICAgICB3aGlsZSAocHJldikge1xuICAgICAgICAgICAgam9pbnRzLnB1c2gocHJldi5qb2ludC5fam9pbnQpO1xuICAgICAgICAgICAgcHJldiA9IHByZXYucHJldjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgbmV4dCBqb2ludFxuICAgICAgICB2YXIgbmV4dCA9IGxpc3QubmV4dDtcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgIGpvaW50cy5wdXNoKG5leHQuam9pbnQuX2pvaW50KTtcbiAgICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gam9pbnRzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYSBmb3JjZSBhdCBhIHdvcmxkIHBvaW50LiBJZiB0aGUgZm9yY2UgaXMgbm90XG5cdCAqIGFwcGxpZWQgYXQgdGhlIGNlbnRlciBvZiBtYXNzLCBpdCB3aWxsIGdlbmVyYXRlIGEgdG9ycXVlIGFuZFxuXHQgKiBhZmZlY3QgdGhlIGFuZ3VsYXIgdmVsb2NpdHkuXG4gICAgICogISN6aFxuICAgICAqIOaWveWKoOS4gOS4quWKm+WIsOWImuS9k+S4iueahOS4gOS4queCueOAguWmguaenOWKm+ayoeacieaWveWKoOWIsOWImuS9k+eahOi0qOW/g+S4iu+8jOi/mOS8muS6p+eUn+S4gOS4quaJreefqeW5tuS4lOW9seWTjeWIsOinkumAn+W6puOAglxuICAgICAqIEBtZXRob2QgYXBwbHlGb3JjZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gZm9yY2UgLSB0aGUgd29ybGQgZm9yY2UgdmVjdG9yLlxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9pbnQgLSB0aGUgd29ybGQgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB3YWtlIC0gYWxzbyB3YWtlIHVwIHRoZSBib2R5LlxuICAgICAqL1xuICAgIGFwcGx5Rm9yY2U6IGZ1bmN0aW9uIChmb3JjZSwgcG9pbnQsIHdha2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdGVtcGIyVmVjMjEuU2V0KGZvcmNlLngvUFRNX1JBVElPLCBmb3JjZS55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMi5TZXQocG9pbnQueC9QVE1fUkFUSU8sIHBvaW50LnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHRoaXMuX2IyQm9keS5BcHBseUZvcmNlKHRlbXBiMlZlYzIxLCB0ZW1wYjJWZWMyMiwgd2FrZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFwcGx5IGEgZm9yY2UgdG8gdGhlIGNlbnRlciBvZiBtYXNzLlxuICAgICAqICEjemhcbiAgICAgKiDmlr3liqDkuIDkuKrlipvliLDliJrkvZPkuIrnmoTotKjlv4PkuIrjgIJcbiAgICAgKiBAbWV0aG9kIGFwcGx5Rm9yY2VUb0NlbnRlclxuICAgICAqIEBwYXJhbSB7VmVjMn0gZm9yY2UgLSB0aGUgd29ybGQgZm9yY2UgdmVjdG9yLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gd2FrZSAtIGFsc28gd2FrZSB1cCB0aGUgYm9keS5cbiAgICAgKi9cbiAgICBhcHBseUZvcmNlVG9DZW50ZXI6IGZ1bmN0aW9uIChmb3JjZSwgd2FrZSkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQoZm9yY2UueC9QVE1fUkFUSU8sIGZvcmNlLnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHRoaXMuX2IyQm9keS5BcHBseUZvcmNlVG9DZW50ZXIodGVtcGIyVmVjMjEsIHdha2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhIHRvcnF1ZS4gVGhpcyBhZmZlY3RzIHRoZSBhbmd1bGFyIHZlbG9jaXR5LlxuICAgICAqICEjemhcbiAgICAgKiDmlr3liqDkuIDkuKrmia3nn6nlipvvvIzlsIblvbHlk43liJrkvZPnmoTop5LpgJ/luqZcbiAgICAgKiBAbWV0aG9kIGFwcGx5VG9ycXVlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRvcnF1ZSAtIGFib3V0IHRoZSB6LWF4aXMgKG91dCBvZiB0aGUgc2NyZWVuKSwgdXN1YWxseSBpbiBOLW0uXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB3YWtlIC0gYWxzbyB3YWtlIHVwIHRoZSBib2R5XG4gICAgICovXG4gICAgYXBwbHlUb3JxdWU6IGZ1bmN0aW9uICh0b3JxdWUsIHdha2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdGhpcy5fYjJCb2R5LkFwcGx5VG9ycXVlKHRvcnF1ZS9QVE1fUkFUSU8sIHdha2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBcHBseSBhIGltcHVsc2UgYXQgYSB3b3JsZCBwb2ludCwgVGhpcyBpbW1lZGlhdGVseSBtb2RpZmllcyB0aGUgdmVsb2NpdHkuXG5cdCAqIElmIHRoZSBpbXB1bHNlIGlzIG5vdCBhcHBsaWVkIGF0IHRoZSBjZW50ZXIgb2YgbWFzcywgaXQgd2lsbCBnZW5lcmF0ZSBhIHRvcnF1ZSBhbmRcblx0ICogYWZmZWN0IHRoZSBhbmd1bGFyIHZlbG9jaXR5LlxuICAgICAqICEjemhcbiAgICAgKiDmlr3liqDlhrLph4/liLDliJrkvZPkuIrnmoTkuIDkuKrngrnvvIzlsIbnq4vljbPmlLnlj5jliJrkvZPnmoTnur/mgKfpgJ/luqbjgIJcbiAgICAgKiDlpoLmnpzlhrLph4/mlr3liqDliLDnmoTngrnkuI3mmK/liJrkvZPnmoTotKjlv4PvvIzpgqPkuYjlsIbkuqfnlJ/kuIDkuKrmia3nn6nlubblvbHlk43liJrkvZPnmoTop5LpgJ/luqbjgIJcbiAgICAgKiBAbWV0aG9kIGFwcGx5TGluZWFySW1wdWxzZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gaW1wdWxzZSAtIHRoZSB3b3JsZCBpbXB1bHNlIHZlY3RvciwgdXN1YWxseSBpbiBOLXNlY29uZHMgb3Iga2ctbS9zLlxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9pbnQgLSB0aGUgd29ybGQgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdha2UgLSBhbHNlIHdha2UgdXAgdGhlIGJvZHlcbiAgICAgKi9cbiAgICBhcHBseUxpbmVhckltcHVsc2U6IGZ1bmN0aW9uIChpbXB1bHNlLCBwb2ludCwgd2FrZSkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMS5TZXQoaW1wdWxzZS54L1BUTV9SQVRJTywgaW1wdWxzZS55L1BUTV9SQVRJTyk7XG4gICAgICAgICAgICB0ZW1wYjJWZWMyMi5TZXQocG9pbnQueC9QVE1fUkFUSU8sIHBvaW50LnkvUFRNX1JBVElPKTtcbiAgICAgICAgICAgIHRoaXMuX2IyQm9keS5BcHBseUxpbmVhckltcHVsc2UodGVtcGIyVmVjMjEsIHRlbXBiMlZlYzIyLCB3YWtlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQXBwbHkgYW4gYW5ndWxhciBpbXB1bHNlLlxuICAgICAqICEjemhcbiAgICAgKiDmlr3liqDkuIDkuKrop5LpgJ/luqblhrLph4/jgIJcbiAgICAgKiBAbWV0aG9kIGFwcGx5QW5ndWxhckltcHVsc2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW1wdWxzZSAtIHRoZSBhbmd1bGFyIGltcHVsc2UgaW4gdW5pdHMgb2Yga2cqbSptL3NcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHdha2UgLSBhbHNvIHdha2UgdXAgdGhlIGJvZHlcbiAgICAgKi9cbiAgICBhcHBseUFuZ3VsYXJJbXB1bHNlOiBmdW5jdGlvbiAoaW1wdWxzZSwgd2FrZSkge1xuICAgICAgICBpZiAodGhpcy5fYjJCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLl9iMkJvZHkuQXBwbHlBbmd1bGFySW1wdWxzZShpbXB1bHNlL1BUTV9SQVRJTy9QVE1fUkFUSU8sIHdha2UpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTeW5jaHJvbml6ZSBub2RlJ3Mgd29ybGQgcG9zaXRpb24gdG8gYm94MmQgcmlnaWRib2R5J3MgcG9zaXRpb24uXG4gICAgICogSWYgZW5hYmxlQW5pbWF0ZWQgaXMgdHJ1ZSBhbmQgcmlnaWRib2R5J3MgdHlwZSBpcyBBbmltYXRlZCB0eXBlLFxuICAgICAqIHdpbGwgc2V0IGxpbmVhciB2ZWxvY2l0eSBpbnN0ZWFkIG9mIGRpcmVjdGx5IHNldCByaWdpZGJvZHkncyBwb3NpdGlvbi5cbiAgICAgKiAhI3poXG4gICAgICog5ZCM5q2l6IqC54K555qE5LiW55WM5Z2Q5qCH5YiwIGJveDJkIOWImuS9k+eahOWdkOagh+S4iuOAglxuICAgICAqIOWmguaenCBlbmFibGVBbmltYXRlZCDmmK8gdHJ1Ze+8jOW5tuS4lOWImuS9k+eahOexu+Wei+aYryBBbmltYXRlZCDvvIzpgqPkuYjlsIborr7nva7liJrkvZPnmoTnur/mgKfpgJ/luqbmnaXku6Pmm7/nm7TmjqXorr7nva7liJrkvZPnmoTkvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIHN5bmNQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlQW5pbWF0ZWRcbiAgICAgKi9cbiAgICBzeW5jUG9zaXRpb246IGZ1bmN0aW9uIChlbmFibGVBbmltYXRlZCkge1xuICAgICAgICB2YXIgYjJib2R5ID0gdGhpcy5fYjJCb2R5O1xuICAgICAgICBpZiAoIWIyYm9keSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKFZFQzJfWkVSTyk7XG5cbiAgICAgICAgdmFyIHRlbXA7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IEJvZHlUeXBlLkFuaW1hdGVkKSB7XG4gICAgICAgICAgICB0ZW1wID0gYjJib2R5LkdldExpbmVhclZlbG9jaXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZW1wID0gYjJib2R5LkdldFBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0ZW1wLnggPSBwb3MueCAvIFBUTV9SQVRJTztcbiAgICAgICAgdGVtcC55ID0gcG9zLnkgLyBQVE1fUkFUSU87XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQgJiYgZW5hYmxlQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIHZhciBiMlBvcyA9IGIyYm9keS5HZXRQb3NpdGlvbigpO1xuXG4gICAgICAgICAgICB2YXIgdGltZVN0ZXAgPSBjYy5nYW1lLmNvbmZpZ1snZnJhbWVSYXRlJ107XG4gICAgICAgICAgICB0ZW1wLnggPSAodGVtcC54IC0gYjJQb3MueCkqdGltZVN0ZXA7XG4gICAgICAgICAgICB0ZW1wLnkgPSAodGVtcC55IC0gYjJQb3MueSkqdGltZVN0ZXA7XG5cbiAgICAgICAgICAgIGIyYm9keS5TZXRBd2FrZSh0cnVlKTtcbiAgICAgICAgICAgIGIyYm9keS5TZXRMaW5lYXJWZWxvY2l0eSh0ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGIyYm9keS5TZXRUcmFuc2Zvcm1WZWModGVtcCwgYjJib2R5LkdldEFuZ2xlKCkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU3luY2hyb25pemUgbm9kZSdzIHdvcmxkIGFuZ2xlIHRvIGJveDJkIHJpZ2lkYm9keSdzIGFuZ2xlLlxuICAgICAqIElmIGVuYWJsZUFuaW1hdGVkIGlzIHRydWUgYW5kIHJpZ2lkYm9keSdzIHR5cGUgaXMgQW5pbWF0ZWQgdHlwZSxcbiAgICAgKiB3aWxsIHNldCBhbmd1bGFyIHZlbG9jaXR5IGluc3RlYWQgb2YgZGlyZWN0bHkgc2V0IHJpZ2lkYm9keSdzIGFuZ2xlLlxuICAgICAqICEjemhcbiAgICAgKiDlkIzmraXoioLngrnnmoTkuJbnlYzml4vovazop5LluqblgLzliLAgYm94MmQg5Yia5L2T55qE5peL6L2s5YC85LiK44CCXG4gICAgICog5aaC5p6cIGVuYWJsZUFuaW1hdGVkIOaYryB0cnVl77yM5bm25LiU5Yia5L2T55qE57G75Z6L5pivIEFuaW1hdGVkIO+8jOmCo+S5iOWwhuiuvue9ruWImuS9k+eahOinkumAn+W6puadpeS7o+abv+ebtOaOpeiuvue9ruWImuS9k+eahOinkuW6puOAglxuICAgICAqIEBtZXRob2Qgc3luY1JvdGF0aW9uXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVBbmltYXRlZFxuICAgICAqL1xuICAgIHN5bmNSb3RhdGlvbjogZnVuY3Rpb24gKGVuYWJsZUFuaW1hdGVkKSB7XG4gICAgICAgIHZhciBiMmJvZHkgPSB0aGlzLl9iMkJvZHk7XG4gICAgICAgIGlmICghYjJib2R5KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHJvdGF0aW9uID0gQU5HTEVfVE9fUEhZU0lDU19BTkdMRSAqIGdldFdvcmxkUm90YXRpb24odGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQgJiYgZW5hYmxlQW5pbWF0ZWQpIHtcbiAgICAgICAgICAgIHZhciBiMlJvdGF0aW9uID0gYjJib2R5LkdldEFuZ2xlKCk7XG4gICAgICAgICAgICB2YXIgdGltZVN0ZXAgPSBjYy5nYW1lLmNvbmZpZ1snZnJhbWVSYXRlJ107XG4gICAgICAgICAgICBiMmJvZHkuU2V0QXdha2UodHJ1ZSk7XG4gICAgICAgICAgICBiMmJvZHkuU2V0QW5ndWxhclZlbG9jaXR5KChyb3RhdGlvbiAtIGIyUm90YXRpb24pKnRpbWVTdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGIyYm9keS5TZXRUcmFuc2Zvcm1WZWMoYjJib2R5LkdldFBvc2l0aW9uKCksIHJvdGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNldFZlbG9jaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBiMmJvZHkgPSB0aGlzLl9iMkJvZHk7XG4gICAgICAgIGlmICghYjJib2R5KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRlbXAgPSBiMmJvZHkubV9saW5lYXJWZWxvY2l0eTtcbiAgICAgICAgdGVtcC5TZXQoMCwgMCk7XG5cbiAgICAgICAgYjJib2R5LlNldExpbmVhclZlbG9jaXR5KHRlbXApO1xuICAgICAgICBiMmJvZHkuU2V0QW5ndWxhclZlbG9jaXR5KDApO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uKGR0KVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuc3luY19wb3NpdGlvbikgdGhpcy5zeW5jUG9zaXRpb24odGhpcy50eXBlID09PSBCb2R5VHlwZS5BbmltYXRlZCk7XG4gICAgICAgIGlmICh0aGlzLnN5bmNfcm90YXRpb24pIHRoaXMuc3luY1JvdGF0aW9uKHRoaXMudHlwZSA9PT0gQm9keVR5cGUuQW5pbWF0ZWQpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIF9yZWdpc3Rlck5vZGVFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUub24oTm9kZUV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX29uTm9kZVBvc2l0aW9uQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIG5vZGUub24oTm9kZUV2ZW50LlJPVEFUSU9OX0NIQU5HRUQsIHRoaXMuX29uTm9kZVJvdGF0aW9uQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIG5vZGUub24oTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX29uTm9kZVNjYWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF91bnJlZ2lzdGVyTm9kZUV2ZW50czogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS5vZmYoTm9kZUV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX29uTm9kZVBvc2l0aW9uQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIG5vZGUub2ZmKE5vZGVFdmVudC5ST1RBVElPTl9DSEFOR0VELCB0aGlzLl9vbk5vZGVSb3RhdGlvbkNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBub2RlLm9mZihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fb25Ob2RlU2NhbGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX29uTm9kZVBvc2l0aW9uQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN5bmNQb3NpdGlvbih0cnVlKTtcbiAgICB9LFxuXG4gICAgX29uTm9kZVJvdGF0aW9uQ2hhbmdlZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3luY1JvdGF0aW9uKHRydWUpO1xuICAgIH0sXG5cbiAgICBfb25Ob2RlU2NhbGVDaGFuZ2VkOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2IyQm9keSkge1xuICAgICAgICAgICAgdmFyIGNvbGxpZGVycyA9IHRoaXMuZ2V0Q29tcG9uZW50cyhjYy5QaHlzaWNzQ29sbGlkZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsaWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb2xsaWRlcnNbaV0uYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgIF9pbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkucHVzaERlbGF5RXZlbnQodGhpcywgJ19faW5pdCcsIFtdKTtcbiAgICB9LFxuICAgIF9kZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkucHVzaERlbGF5RXZlbnQodGhpcywgJ19fZGVzdHJveScsIFtdKTtcbiAgICB9LFxuXG4gICAgX19pbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbml0ZWQpIHJldHVybjtcblxuICAgICAgIHRoaXMuX3JlZ2lzdGVyTm9kZUV2ZW50cygpO1xuXG4gICAgICAgIHZhciBib2R5RGVmID0gbmV3IGIyLkJvZHlEZWYoKTtcblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBCb2R5VHlwZS5BbmltYXRlZCkge1xuICAgICAgICAgICAgYm9keURlZi50eXBlID0gQm9keVR5cGUuS2luZW1hdGljO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYm9keURlZi50eXBlID0gdGhpcy50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9keURlZi5hbGxvd1NsZWVwID0gdGhpcy5hbGxvd1NsZWVwO1xuICAgICAgICBib2R5RGVmLmdyYXZpdHlTY2FsZSA9IHRoaXMuZ3Jhdml0eVNjYWxlO1xuICAgICAgICBib2R5RGVmLmxpbmVhckRhbXBpbmcgPSB0aGlzLmxpbmVhckRhbXBpbmc7XG4gICAgICAgIGJvZHlEZWYuYW5ndWxhckRhbXBpbmcgPSB0aGlzLmFuZ3VsYXJEYW1waW5nO1xuXG4gICAgICAgIHZhciBsaW5lYXJWZWxvY2l0eSA9IHRoaXMubGluZWFyVmVsb2NpdHk7XG4gICAgICAgIGJvZHlEZWYubGluZWFyVmVsb2NpdHkgPSBuZXcgYjIuVmVjMihsaW5lYXJWZWxvY2l0eS54L1BUTV9SQVRJTywgbGluZWFyVmVsb2NpdHkueS9QVE1fUkFUSU8pO1xuXG4gICAgICAgIGJvZHlEZWYuYW5ndWxhclZlbG9jaXR5ID0gdGhpcy5hbmd1bGFyVmVsb2NpdHkgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xuXG4gICAgICAgIGJvZHlEZWYuZml4ZWRSb3RhdGlvbiA9IHRoaXMuZml4ZWRSb3RhdGlvbjtcbiAgICAgICAgYm9keURlZi5idWxsZXQgPSB0aGlzLmJ1bGxldDtcblxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgdmFyIHBvcyA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKFZFQzJfWkVSTyk7XG4gICAgICAgIGJvZHlEZWYucG9zaXRpb24gPSBuZXcgYjIuVmVjMihwb3MueCAvIFBUTV9SQVRJTywgcG9zLnkgLyBQVE1fUkFUSU8pO1xuICAgICAgICBib2R5RGVmLmFuZ2xlID0gLShNYXRoLlBJIC8gMTgwKSAqIGdldFdvcmxkUm90YXRpb24obm9kZSk7XG5cbiAgICAgICAgYm9keURlZi5hd2FrZSA9IHRoaXMuYXdha2VPbkxvYWQ7XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5fYWRkQm9keSh0aGlzLCBib2R5RGVmKTtcblxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgX19kZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5fcmVtb3ZlQm9keSh0aGlzKTtcbiAgICAgICAgdGhpcy5fdW5yZWdpc3Rlck5vZGVFdmVudHMoKTtcblxuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgX2dldEJvZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2IyQm9keTtcbiAgICB9LFxuXG59KTtcblxuY2MuUmlnaWRCb2R5ID0gbW9kdWxlLmV4cG9ydHMgPSBSaWdpZEJvZHk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==