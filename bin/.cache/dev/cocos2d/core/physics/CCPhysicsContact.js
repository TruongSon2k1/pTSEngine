
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCPhysicsContact.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var PTM_RATIO = require('./CCPhysicsTypes').PTM_RATIO;

var ContactType = require('./CCPhysicsTypes').ContactType;

var pools = []; // temp world manifold

var pointCache = [cc.v2(), cc.v2()];
var b2worldmanifold = new b2.WorldManifold();
/**
 * @class WorldManifold
 */

var worldmanifold = {
  /**
   * !#en
   * world contact point (point of intersection)
   * !#zh
   * 碰撞点集合
   * @property {[Vec2]} points
   */
  points: [],

  /**
   * !#en
   * a negative value indicates overlap
   * !#zh
   * 一个负数，用于指明重叠的部分
   */
  separations: [],

  /**
   * !#en
   * world vector pointing from A to B
   * !#zh
   * 世界坐标系下由 A 指向 B 的向量
   * @property {Vec2} normal
   */
  normal: cc.v2()
};
/**
 * !#en
 * A manifold point is a contact point belonging to a contact manifold. 
 * It holds details related to the geometry and dynamics of the contact points.
 * Note: the impulses are used for internal caching and may not
 * provide reliable contact forces, especially for high speed collisions.
 * !#zh
 * ManifoldPoint 是接触信息中的接触点信息。它拥有关于几何和接触点的详细信息。
 * 注意：信息中的冲量用于系统内部缓存，提供的接触力可能不是很准确，特别是高速移动中的碰撞信息。
 * @class ManifoldPoint
 */

/**
 * !#en
 * The local point usage depends on the manifold type:
 * -e_circles: the local center of circleB
 * -e_faceA: the local center of circleB or the clip point of polygonB
 * -e_faceB: the clip point of polygonA
 * !#zh
 * 本地坐标点的用途取决于 manifold 的类型
 * - e_circles: circleB 的本地中心点
 * - e_faceA: circleB 的本地中心点 或者是 polygonB 的截取点
 * - e_faceB: polygonB 的截取点
 * @property {Vec2} localPoint
 */

/**
 * !#en
 * Normal impulse.
 * !#zh
 * 法线冲量。
 * @property {Number} normalImpulse
 */

/**
 * !#en
 * Tangent impulse.
 * !#zh
 * 切线冲量。
 * @property {Number} tangentImpulse
 */

function ManifoldPoint() {
  this.localPoint = cc.v2();
  this.normalImpulse = 0;
  this.tangentImpulse = 0;
}

var manifoldPointCache = [new ManifoldPoint(), new ManifoldPoint()];
var b2manifold = new b2.Manifold();
/**
 * @class Manifold
 */

var manifold = {
  /**
   * !#en
   * Manifold type :  0: e_circles, 1: e_faceA, 2: e_faceB
   * !#zh
   * Manifold 类型 :  0: e_circles, 1: e_faceA, 2: e_faceB
   * @property {Number} type
   */
  type: 0,

  /**
   * !#en
   * The local point usage depends on the manifold type:
   * -e_circles: the local center of circleA
   * -e_faceA: the center of faceA
   * -e_faceB: the center of faceB
   * !#zh
   * 用途取决于 manifold 类型
   * -e_circles: circleA 的本地中心点
   * -e_faceA: faceA 的本地中心点
   * -e_faceB: faceB 的本地中心点
   * @property {Vec2} localPoint
   */
  localPoint: cc.v2(),

  /**
   * !#en
   * -e_circles: not used
   * -e_faceA: the normal on polygonA
   * -e_faceB: the normal on polygonB
   * !#zh
   * -e_circles: 没被使用到
   * -e_faceA: polygonA 的法向量
   * -e_faceB: polygonB 的法向量
   * @property {Vec2} localNormal
   */
  localNormal: cc.v2(),

  /**
   * !#en
   * the points of contact.
   * !#zh
   * 接触点信息。
   * @property {[ManifoldPoint]} points
   */
  points: []
};
/**
 * !#en
 * Contact impulses for reporting.
 * !#zh
 * 用于返回给回调的接触冲量。
 * @class PhysicsImpulse
 */

var impulse = {
  /**
   * !#en
   * Normal impulses.
   * !#zh
   * 法线方向的冲量
   * @property normalImpulses
   */
  normalImpulses: [],

  /**
   * !#en
   * Tangent impulses
   * !#zh
   * 切线方向的冲量
   * @property tangentImpulses
   */
  tangentImpulses: []
};
/**
 * !#en
 * PhysicsContact will be generated during begin and end collision as a parameter of the collision callback.
 * Note that contacts will be reused for speed up cpu time, so do not cache anything in the contact.
 * !#zh
 * 物理接触会在开始和结束碰撞之间生成，并作为参数传入到碰撞回调函数中。
 * 注意：传入的物理接触会被系统进行重用，所以不要在使用中缓存里面的任何信息。
 * @class PhysicsContact
 */

function PhysicsContact() {}

PhysicsContact.prototype.init = function (b2contact) {
  this.colliderA = b2contact.GetFixtureA().collider;
  this.colliderB = b2contact.GetFixtureB().collider;
  this.disabled = false;
  this.disabledOnce = false;
  this._impulse = null;
  this._inverted = false;
  this._b2contact = b2contact;
  b2contact._contact = this;
};

PhysicsContact.prototype.reset = function () {
  this.setTangentSpeed(0);
  this.resetFriction();
  this.resetRestitution();
  this.colliderA = null;
  this.colliderB = null;
  this.disabled = false;
  this._impulse = null;
  this._b2contact._contact = null;
  this._b2contact = null;
};
/**
 * !#en
 * Get the world manifold.
 * !#zh
 * 获取世界坐标系下的碰撞信息。
 * @method getWorldManifold
 * @return {WorldManifold}
 */


PhysicsContact.prototype.getWorldManifold = function () {
  var points = worldmanifold.points;
  var separations = worldmanifold.separations;
  var normal = worldmanifold.normal;

  this._b2contact.GetWorldManifold(b2worldmanifold);

  var b2points = b2worldmanifold.points;
  var b2separations = b2worldmanifold.separations;

  var count = this._b2contact.GetManifold().pointCount;

  points.length = separations.length = count;

  for (var i = 0; i < count; i++) {
    var p = pointCache[i];
    p.x = b2points[i].x * PTM_RATIO;
    p.y = b2points[i].y * PTM_RATIO;
    points[i] = p;
    separations[i] = b2separations[i] * PTM_RATIO;
  }

  normal.x = b2worldmanifold.normal.x;
  normal.y = b2worldmanifold.normal.y;

  if (this._inverted) {
    normal.x *= -1;
    normal.y *= -1;
  }

  return worldmanifold;
};
/**
 * !#en
 * Get the manifold.
 * !#zh
 * 获取本地（局部）坐标系下的碰撞信息。
 * @method getManifold
 * @return {Manifold}
 */


PhysicsContact.prototype.getManifold = function () {
  var points = manifold.points;
  var localNormal = manifold.localNormal;
  var localPoint = manifold.localPoint;

  var b2manifold = this._b2contact.GetManifold();

  var b2points = b2manifold.points;
  var count = points.length = b2manifold.pointCount;

  for (var i = 0; i < count; i++) {
    var p = manifoldPointCache[i];
    var b2p = b2points[i];
    p.localPoint.x = b2p.localPoint.x * PTM_RATIO;
    p.localPoint.Y = b2p.localPoint.Y * PTM_RATIO;
    p.normalImpulse = b2p.normalImpulse * PTM_RATIO;
    p.tangentImpulse = b2p.tangentImpulse;
    points[i] = p;
  }

  localPoint.x = b2manifold.localPoint.x * PTM_RATIO;
  localPoint.y = b2manifold.localPoint.y * PTM_RATIO;
  localNormal.x = b2manifold.localNormal.x;
  localNormal.y = b2manifold.localNormal.y;
  manifold.type = b2manifold.type;

  if (this._inverted) {
    localNormal.x *= -1;
    localNormal.y *= -1;
  }

  return manifold;
};
/**
 * !#en
 * Get the impulses.
 * Note: PhysicsImpulse can only used in onPostSolve callback.
 * !#zh
 * 获取冲量信息
 * 注意：这个信息只有在 onPostSolve 回调中才能获取到
 * @method getImpulse
 * @return {PhysicsImpulse}
 */


PhysicsContact.prototype.getImpulse = function () {
  var b2impulse = this._impulse;
  if (!b2impulse) return null;
  var normalImpulses = impulse.normalImpulses;
  var tangentImpulses = impulse.tangentImpulses;
  var count = b2impulse.count;

  for (var i = 0; i < count; i++) {
    normalImpulses[i] = b2impulse.normalImpulses[i] * PTM_RATIO;
    tangentImpulses[i] = b2impulse.tangentImpulses[i];
  }

  tangentImpulses.length = normalImpulses.length = count;
  return impulse;
};

PhysicsContact.prototype.emit = function (contactType) {
  var func;

  switch (contactType) {
    case ContactType.BEGIN_CONTACT:
      func = 'onBeginContact';
      break;

    case ContactType.END_CONTACT:
      func = 'onEndContact';
      break;

    case ContactType.PRE_SOLVE:
      func = 'onPreSolve';
      break;

    case ContactType.POST_SOLVE:
      func = 'onPostSolve';
      break;
  }

  var colliderA = this.colliderA;
  var colliderB = this.colliderB;
  var bodyA = colliderA.body;
  var bodyB = colliderB.body;
  var comps;
  var i, l, comp;

  if (bodyA.enabledContactListener) {
    comps = bodyA.node._components;
    this._inverted = false;

    for (i = 0, l = comps.length; i < l; i++) {
      comp = comps[i];

      if (comp[func]) {
        comp[func](this, colliderA, colliderB);
      }
    }
  }

  if (bodyB.enabledContactListener) {
    comps = bodyB.node._components;
    this._inverted = true;

    for (i = 0, l = comps.length; i < l; i++) {
      comp = comps[i];

      if (comp[func]) {
        comp[func](this, colliderB, colliderA);
      }
    }
  }

  if (this.disabled || this.disabledOnce) {
    this.setEnabled(false);
    this.disabledOnce = false;
  }
};

PhysicsContact.get = function (b2contact) {
  var c;

  if (pools.length === 0) {
    c = new cc.PhysicsContact();
  } else {
    c = pools.pop();
  }

  c.init(b2contact);
  return c;
};

PhysicsContact.put = function (b2contact) {
  var c = b2contact._contact;
  if (!c) return;
  pools.push(c);
  c.reset();
};

var _p = PhysicsContact.prototype;
/**
 * !#en
 * One of the collider that collided
 * !#zh
 * 发生碰撞的碰撞体之一
 * @property {Collider} colliderA
 */

/**
 * !#en
 * One of the collider that collided
 * !#zh
 * 发生碰撞的碰撞体之一
 * @property {Collider} colliderB
 */

/**
 * !#en
 * If set disabled to true, the contact will be ignored until contact end.
 * If you just want to disabled contact for current time step or sub-step, please use disabledOnce.
 * !#zh
 * 如果 disabled 被设置为 true，那么直到接触结束此接触都将被忽略。
 * 如果只是希望在当前时间步或子步中忽略此接触，请使用 disabledOnce 。
 * @property {Boolean} disabled
 */

/**
 * !#en
 * Disabled contact for current time step or sub-step.
 * !#zh
 * 在当前时间步或子步中忽略此接触。
 * @property {Boolean} disabledOnce
 */

_p.setEnabled = function (value) {
  this._b2contact.SetEnabled(value);
};
/**
 * !#en
 * Is this contact touching?
 * !#zh
 * 返回碰撞体是否已经接触到。
 * @method isTouching
 * @return {Boolean}
 */


_p.isTouching = function () {
  return this._b2contact.IsTouching();
};
/**
 * !#en
 * Set the desired tangent speed for a conveyor belt behavior.
 * !#zh
 * 为传送带设置期望的切线速度
 * @method setTangentSpeed
 * @param {Number} tangentSpeed
 */


_p.setTangentSpeed = function (value) {
  this._b2contact.SetTangentSpeed(value / PTM_RATIO);
};
/**
 * !#en
 * Get the desired tangent speed.
 * !#zh
 * 获取切线速度
 * @method getTangentSpeed
 * @return {Number}
 */


_p.getTangentSpeed = function () {
  return this._b2contact.GetTangentSpeed() * PTM_RATIO;
};
/**
 * !#en
 * Override the default friction mixture. You can call this in onPreSolve callback.
 * !#zh
 * 覆盖默认的摩擦力系数。你可以在 onPreSolve 回调中调用此函数。
 * @method setFriction
 * @param {Number} friction
 */


_p.setFriction = function (value) {
  this._b2contact.SetFriction(value);
};
/**
 * !#en
 * Get the friction.
 * !#zh
 * 获取当前摩擦力系数
 * @method getFriction
 * @return {Number}
 */


_p.getFriction = function () {
  return this._b2contact.GetFriction();
};
/**
 * !#en
 * Reset the friction mixture to the default value.
 * !#zh
 * 重置摩擦力系数到默认值
 * @method resetFriction
 */


_p.resetFriction = function () {
  return this._b2contact.ResetFriction();
};
/**
 * !#en
 * Override the default restitution mixture. You can call this in onPreSolve callback.
 * !#zh
 * 覆盖默认的恢复系数。你可以在 onPreSolve 回调中调用此函数。
 * @method setRestitution
 * @param {Number} restitution
 */


_p.setRestitution = function (value) {
  this._b2contact.SetRestitution(value);
};
/**
 * !#en
 * Get the restitution.
 * !#zh
 * 获取当前恢复系数
 * @method getRestitution
 * @return {Number}
 */


_p.getRestitution = function () {
  return this._b2contact.GetRestitution();
};
/**
 * !#en
 * Reset the restitution mixture to the default value.
 * !#zh
 * 重置恢复系数到默认值
 * @method resetRestitution
 */


_p.resetRestitution = function () {
  return this._b2contact.ResetRestitution();
};

PhysicsContact.ContactType = ContactType;
cc.PhysicsContact = module.exports = PhysicsContact;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXENDUGh5c2ljc0NvbnRhY3QuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkNvbnRhY3RUeXBlIiwicG9vbHMiLCJwb2ludENhY2hlIiwiY2MiLCJ2MiIsImIyd29ybGRtYW5pZm9sZCIsImIyIiwiV29ybGRNYW5pZm9sZCIsIndvcmxkbWFuaWZvbGQiLCJwb2ludHMiLCJzZXBhcmF0aW9ucyIsIm5vcm1hbCIsIk1hbmlmb2xkUG9pbnQiLCJsb2NhbFBvaW50Iiwibm9ybWFsSW1wdWxzZSIsInRhbmdlbnRJbXB1bHNlIiwibWFuaWZvbGRQb2ludENhY2hlIiwiYjJtYW5pZm9sZCIsIk1hbmlmb2xkIiwibWFuaWZvbGQiLCJ0eXBlIiwibG9jYWxOb3JtYWwiLCJpbXB1bHNlIiwibm9ybWFsSW1wdWxzZXMiLCJ0YW5nZW50SW1wdWxzZXMiLCJQaHlzaWNzQ29udGFjdCIsInByb3RvdHlwZSIsImluaXQiLCJiMmNvbnRhY3QiLCJjb2xsaWRlckEiLCJHZXRGaXh0dXJlQSIsImNvbGxpZGVyIiwiY29sbGlkZXJCIiwiR2V0Rml4dHVyZUIiLCJkaXNhYmxlZCIsImRpc2FibGVkT25jZSIsIl9pbXB1bHNlIiwiX2ludmVydGVkIiwiX2IyY29udGFjdCIsIl9jb250YWN0IiwicmVzZXQiLCJzZXRUYW5nZW50U3BlZWQiLCJyZXNldEZyaWN0aW9uIiwicmVzZXRSZXN0aXR1dGlvbiIsImdldFdvcmxkTWFuaWZvbGQiLCJHZXRXb3JsZE1hbmlmb2xkIiwiYjJwb2ludHMiLCJiMnNlcGFyYXRpb25zIiwiY291bnQiLCJHZXRNYW5pZm9sZCIsInBvaW50Q291bnQiLCJsZW5ndGgiLCJpIiwicCIsIngiLCJ5IiwiZ2V0TWFuaWZvbGQiLCJiMnAiLCJZIiwiZ2V0SW1wdWxzZSIsImIyaW1wdWxzZSIsImVtaXQiLCJjb250YWN0VHlwZSIsImZ1bmMiLCJCRUdJTl9DT05UQUNUIiwiRU5EX0NPTlRBQ1QiLCJQUkVfU09MVkUiLCJQT1NUX1NPTFZFIiwiYm9keUEiLCJib2R5IiwiYm9keUIiLCJjb21wcyIsImwiLCJjb21wIiwiZW5hYmxlZENvbnRhY3RMaXN0ZW5lciIsIm5vZGUiLCJfY29tcG9uZW50cyIsInNldEVuYWJsZWQiLCJnZXQiLCJjIiwicG9wIiwicHV0IiwicHVzaCIsIl9wIiwidmFsdWUiLCJTZXRFbmFibGVkIiwiaXNUb3VjaGluZyIsIklzVG91Y2hpbmciLCJTZXRUYW5nZW50U3BlZWQiLCJnZXRUYW5nZW50U3BlZWQiLCJHZXRUYW5nZW50U3BlZWQiLCJzZXRGcmljdGlvbiIsIlNldEZyaWN0aW9uIiwiZ2V0RnJpY3Rpb24iLCJHZXRGcmljdGlvbiIsIlJlc2V0RnJpY3Rpb24iLCJzZXRSZXN0aXR1dGlvbiIsIlNldFJlc3RpdHV0aW9uIiwiZ2V0UmVzdGl0dXRpb24iLCJHZXRSZXN0aXR1dGlvbiIsIlJlc2V0UmVzdGl0dXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsa0JBQUQsQ0FBUCxDQUE0QkQsU0FBNUM7O0FBQ0EsSUFBSUUsV0FBVyxHQUFHRCxPQUFPLENBQUMsa0JBQUQsQ0FBUCxDQUE0QkMsV0FBOUM7O0FBRUEsSUFBSUMsS0FBSyxHQUFHLEVBQVosRUFHQTs7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBQ0MsRUFBRSxDQUFDQyxFQUFILEVBQUQsRUFBVUQsRUFBRSxDQUFDQyxFQUFILEVBQVYsQ0FBakI7QUFFQSxJQUFJQyxlQUFlLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxhQUFQLEVBQXRCO0FBRUE7QUFDQTtBQUNBOztBQUNBLElBQUlDLGFBQWEs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R0FBaUIsWUFBWTtBQUN6QixTQUFPLEtBQUt2RCxVQUFMLENBQWdCd0QsV0FBaEIsRUFBUDtBQUNILENBRkQ7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FYLEVBQUUsQ0FBQ3pDLGFBQUgsR0FBbUIsWUFBWTtBQUMzQixTQUFPLEtBQUtKLFVBQUwsQ0FBZ0J5RCxhQUFoQixFQUFQO0FBQ0gsQ0FGRDtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBWixFQUFFLENBQUNhLGNBQUgsR0FBb0IsVUFBVVosS0FBVixFQUFpQjtBQUNqQyxPQUFLOUMsVUFBTCxDQUFnQjJELGNBQWhCLENBQStCYixLQUEvQjtBQUNILENBRkQ7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUQsRUFBRSxDQUFDZSxjQUFILEdBQW9CLFlBQVk7QUFDNUIsU0FBTyxLQUFLNUQsVUFBTCxDQUFnQjZELGNBQWhCLEVBQVA7QUFDSCxDQUZEO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBaEIsRUFBRSxDQUFDeEMsZ0JBQUgsR0FBc0IsWUFBWTtBQUM5QixTQUFPLEtBQUtMLFVBQUwsQ0FBZ0I4RCxnQkFBaEIsRUFBUDtBQUNILENBRkQ7O0FBSUEzRSxjQUFjLENBQUN6QixXQUFmLEdBQTZCQSxXQUE3QjtBQUNBRyxFQUFFLENBQUNzQixjQUFILEdBQW9CNEUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0UsY0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblxyXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcclxudmFyIENvbnRhY3RUeXBlID0gcmVxdWlyZSgnLi9DQ1BoeXNpY3NUeXBlcycpLkNvbnRhY3RUeXBlO1xyXG5cclxudmFyIHBvb2xzID0gW107XHJcblxyXG5cclxuLy8gdGVtcCB3b3JsZCBtYW5pZm9sZFxyXG52YXIgcG9pbnRDYWNoZSA9IFtjYy52MigpLCBjYy52MigpXTtcclxuXHJcbnZhciBiMndvcmxkbWFuaWZvbGQgPSBuZXcgYjIuV29ybGRNYW5pZm9sZCgpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBXb3JsZE1hbmlmb2xkXHJcbiAqL1xyXG52YXIgd29ybGRtYW5pZm9sZCA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIHdvcmxkIGNvbnRhY3QgcG9pbnQgKHBvaW50IG9mIGludGVyc2VjdGlvbilcclxuICAgICAqICEjemhcclxuICAgICAqIOeisOaSnueCuembhuWQiFxyXG4gICAgICogQHByb3BlcnR5IHtbVmVjMl19IHBvaW50c1xyXG4gICAgICovXHJcbiAgICBwb2ludHM6IFtdLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogYSBuZWdhdGl2ZSB2YWx1ZSBpbmRpY2F0ZXMgb3ZlcmxhcFxyXG4gICAgICogISN6aFxyXG4gICAgICog5LiA5Liq6LSf5pWw77yM55So5LqO5oyH5piO6YeN5Y+g55qE6YOo5YiGXHJcbiAgICAgKi9cclxuICAgIHNlcGFyYXRpb25zOiBbXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIHdvcmxkIHZlY3RvciBwb2ludGluZyBmcm9tIEEgdG8gQlxyXG4gICAgICogISN6aFxyXG4gICAgICog5LiW55WM5Z2Q5qCH57O75LiL55SxIEEg5oyH5ZCRIEIg55qE5ZCR6YePXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IG5vcm1hbFxyXG4gICAgICovXHJcbiAgICBub3JtYWw6IGNjLnYyKClcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEEgbWFuaWZvbGQgcG9pbnQgaXMgYSBjb250YWN0IHBvaW50IGJlbG9uZ2luZyB0byBhIGNvbnRhY3QgbWFuaWZvbGQuIFxyXG4gKiBJdCBob2xkcyBkZXRhaWxzIHJlbGF0ZWQgdG8gdGhlIGdlb21ldHJ5IGFuZCBkeW5hbWljcyBvZiB0aGUgY29udGFjdCBwb2ludHMuXHJcbiAqIE5vdGU6IHRoZSBpbXB1bHNlcyBhcmUgdXNlZCBmb3IgaW50ZXJuYWwgY2FjaGluZyBhbmQgbWF5IG5vdFxyXG4gKiBwcm92aWRlIHJlbGlhYmxlIGNvbnRhY3QgZm9yY2VzLCBlc3BlY2lhbGx5IGZvciBoaWdoIHNwZWVkIGNvbGxpc2lvbnMuXHJcbiAqICEjemhcclxuICogTWFuaWZvbGRQb2ludCDmmK/mjqXop6bkv6Hmga/kuK3nmoTmjqXop6bngrnkv6Hmga/jgILlroPmi6XmnInlhbPkuo7lh6DkvZXlkozmjqXop6bngrnnmoTor6bnu4bkv6Hmga/jgIJcclxuICog5rOo5oSP77ya5L+h5oGv5Lit55qE5Yay6YeP55So5LqO57O757uf5YaF6YOo57yT5a2Y77yM5o+Q5L6b55qE5o6l6Kem5Yqb5Y+v6IO95LiN5piv5b6I5YeG56Gu77yM54m55Yir5piv6auY6YCf56e75Yqo5Lit55qE56Kw5pKe5L+h5oGv44CCXHJcbiAqIEBjbGFzcyBNYW5pZm9sZFBvaW50XHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgbG9jYWwgcG9pbnQgdXNhZ2UgZGVwZW5kcyBvbiB0aGUgbWFuaWZvbGQgdHlwZTpcclxuICogLWVfY2lyY2xlczogdGhlIGxvY2FsIGNlbnRlciBvZiBjaXJjbGVCXHJcbiAqIC1lX2ZhY2VBOiB0aGUgbG9jYWwgY2VudGVyIG9mIGNpcmNsZUIgb3IgdGhlIGNsaXAgcG9pbnQgb2YgcG9seWdvbkJcclxuICogLWVfZmFjZUI6IHRoZSBjbGlwIHBvaW50IG9mIHBvbHlnb25BXHJcbiAqICEjemhcclxuICog5pys5Zyw5Z2Q5qCH54K555qE55So6YCU5Y+W5Yaz5LqOIG1hbmlmb2xkIOeahOexu+Wei1xyXG4gKiAtIGVfY2lyY2xlczogY2lyY2xlQiDnmoTmnKzlnLDkuK3lv4PngrlcclxuICogLSBlX2ZhY2VBOiBjaXJjbGVCIOeahOacrOWcsOS4reW/g+eCuSDmiJbogIXmmK8gcG9seWdvbkIg55qE5oiq5Y+W54K5XHJcbiAqIC0gZV9mYWNlQjogcG9seWdvbkIg55qE5oiq5Y+W54K5XHJcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gbG9jYWxQb2ludFxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm9ybWFsIGltcHVsc2UuXHJcbiAqICEjemhcclxuICog5rOV57q/5Yay6YeP44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBub3JtYWxJbXB1bHNlXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBUYW5nZW50IGltcHVsc2UuXHJcbiAqICEjemhcclxuICog5YiH57q/5Yay6YeP44CCXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0YW5nZW50SW1wdWxzZVxyXG4gKi9cclxuZnVuY3Rpb24gTWFuaWZvbGRQb2ludCAoKSB7XHJcbiAgICB0aGlzLmxvY2FsUG9pbnQgPSBjYy52MigpO1xyXG4gICAgdGhpcy5ub3JtYWxJbXB1bHNlID0gMDtcclxuICAgIHRoaXMudGFuZ2VudEltcHVsc2UgPSAwO1xyXG59XHJcblxyXG52YXIgbWFuaWZvbGRQb2ludENhY2hlID0gW25ldyBNYW5pZm9sZFBvaW50KCksIG5ldyBNYW5pZm9sZFBvaW50KCldO1xyXG5cclxudmFyIGIybWFuaWZvbGQgPSBuZXcgYjIuTWFuaWZvbGQoKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgTWFuaWZvbGRcclxuICovXHJcbnZhciBtYW5pZm9sZCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogTWFuaWZvbGQgdHlwZSA6ICAwOiBlX2NpcmNsZXMsIDE6IGVfZmFjZUEsIDI6IGVfZmFjZUJcclxuICAgICAqICEjemhcclxuICAgICAqIE1hbmlmb2xkIOexu+WeiyA6ICAwOiBlX2NpcmNsZXMsIDE6IGVfZmFjZUEsIDI6IGVfZmFjZUJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0eXBlXHJcbiAgICAgKi9cclxuICAgIHR5cGU6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgbG9jYWwgcG9pbnQgdXNhZ2UgZGVwZW5kcyBvbiB0aGUgbWFuaWZvbGQgdHlwZTpcclxuICAgICAqIC1lX2NpcmNsZXM6IHRoZSBsb2NhbCBjZW50ZXIgb2YgY2lyY2xlQVxyXG4gICAgICogLWVfZmFjZUE6IHRoZSBjZW50ZXIgb2YgZmFjZUFcclxuICAgICAqIC1lX2ZhY2VCOiB0aGUgY2VudGVyIG9mIGZhY2VCXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnlKjpgJTlj5blhrPkuo4gbWFuaWZvbGQg57G75Z6LXHJcbiAgICAgKiAtZV9jaXJjbGVzOiBjaXJjbGVBIOeahOacrOWcsOS4reW/g+eCuVxyXG4gICAgICogLWVfZmFjZUE6IGZhY2VBIOeahOacrOWcsOS4reW/g+eCuVxyXG4gICAgICogLWVfZmFjZUI6IGZhY2VCIOeahOacrOWcsOS4reW/g+eCuVxyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBsb2NhbFBvaW50XHJcbiAgICAgKi9cclxuICAgIGxvY2FsUG9pbnQ6IGNjLnYyKCksXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIC1lX2NpcmNsZXM6IG5vdCB1c2VkXHJcbiAgICAgKiAtZV9mYWNlQTogdGhlIG5vcm1hbCBvbiBwb2x5Z29uQVxyXG4gICAgICogLWVfZmFjZUI6IHRoZSBub3JtYWwgb24gcG9seWdvbkJcclxuICAgICAqICEjemhcclxuICAgICAqIC1lX2NpcmNsZXM6IOayoeiiq+S9v+eUqOWIsFxyXG4gICAgICogLWVfZmFjZUE6IHBvbHlnb25BIOeahOazleWQkemHj1xyXG4gICAgICogLWVfZmFjZUI6IHBvbHlnb25CIOeahOazleWQkemHj1xyXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBsb2NhbE5vcm1hbFxyXG4gICAgICovXHJcbiAgICBsb2NhbE5vcm1hbDogY2MudjIoKSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIHRoZSBwb2ludHMgb2YgY29udGFjdC5cclxuICAgICAqICEjemhcclxuICAgICAqIOaOpeinpueCueS/oeaBr+OAglxyXG4gICAgICogQHByb3BlcnR5IHtbTWFuaWZvbGRQb2ludF19IHBvaW50c1xyXG4gICAgICovXHJcbiAgICBwb2ludHM6IFtdXHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDb250YWN0IGltcHVsc2VzIGZvciByZXBvcnRpbmcuXHJcbiAqICEjemhcclxuICog55So5LqO6L+U5Zue57uZ5Zue6LCD55qE5o6l6Kem5Yay6YeP44CCXHJcbiAqIEBjbGFzcyBQaHlzaWNzSW1wdWxzZVxyXG4gKi9cclxudmFyIGltcHVsc2UgPSB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIE5vcm1hbCBpbXB1bHNlcy5cclxuICAgICAqICEjemhcclxuICAgICAqIOazlee6v+aWueWQkeeahOWGsumHj1xyXG4gICAgICogQHByb3BlcnR5IG5vcm1hbEltcHVsc2VzXHJcbiAgICAgKi9cclxuICAgIG5vcm1hbEltcHVsc2VzOiBbXSxcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGFuZ2VudCBpbXB1bHNlc1xyXG4gICAgICogISN6aFxyXG4gICAgICog5YiH57q/5pa55ZCR55qE5Yay6YePXHJcbiAgICAgKiBAcHJvcGVydHkgdGFuZ2VudEltcHVsc2VzXHJcbiAgICAgKi9cclxuICAgIHRhbmdlbnRJbXB1bHNlczogW11cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFBoeXNpY3NDb250YWN0IHdpbGwgYmUgZ2VuZXJhdGVkIGR1cmluZyBiZWdpbiBhbmQgZW5kIGNvbGxpc2lvbiBhcyBhIHBhcmFtZXRlciBvZiB0aGUgY29sbGlzaW9uIGNhbGxiYWNrLlxyXG4gKiBOb3RlIHRoYXQgY29udGFjdHMgd2lsbCBiZSByZXVzZWQgZm9yIHNwZWVkIHVwIGNwdSB0aW1lLCBzbyBkbyBub3QgY2FjaGUgYW55dGhpbmcgaW4gdGhlIGNvbnRhY3QuXHJcbiAqICEjemhcclxuICog54mp55CG5o6l6Kem5Lya5Zyo5byA5aeL5ZKM57uT5p2f56Kw5pKe5LmL6Ze055Sf5oiQ77yM5bm25L2c5Li65Y+C5pWw5Lyg5YWl5Yiw56Kw5pKe5Zue6LCD5Ye95pWw5Lit44CCXHJcbiAqIOazqOaEj++8muS8oOWFpeeahOeJqeeQhuaOpeinpuS8muiiq+ezu+e7n+i/m+ihjOmHjeeUqO+8jOaJgOS7peS4jeimgeWcqOS9v+eUqOS4ree8k+WtmOmHjOmdoueahOS7u+S9leS/oeaBr+OAglxyXG4gKiBAY2xhc3MgUGh5c2ljc0NvbnRhY3RcclxuICovXHJcbmZ1bmN0aW9uIFBoeXNpY3NDb250YWN0ICgpIHtcclxufVxyXG5cclxuUGh5c2ljc0NvbnRhY3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoYjJjb250YWN0KSB7XHJcbiAgICB0aGlzLmNvbGxpZGVyQSA9IGIyY29udGFjdC5HZXRGaXh0dXJlQSgpLmNvbGxpZGVyO1xyXG4gICAgdGhpcy5jb2xsaWRlckIgPSBiMmNvbnRhY3QuR2V0Rml4dHVyZUIoKS5jb2xsaWRlcjtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZWRPbmNlID0gZmFsc2U7XHJcbiAgICB0aGlzLl9pbXB1bHNlID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9pbnZlcnRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX2IyY29udGFjdCA9IGIyY29udGFjdDtcclxuICAgIGIyY29udGFjdC5fY29udGFjdCA9IHRoaXM7XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldFRhbmdlbnRTcGVlZCgwKTtcclxuICAgIHRoaXMucmVzZXRGcmljdGlvbigpO1xyXG4gICAgdGhpcy5yZXNldFJlc3RpdHV0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5jb2xsaWRlckEgPSBudWxsO1xyXG4gICAgdGhpcy5jb2xsaWRlckIgPSBudWxsO1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5faW1wdWxzZSA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5fYjJjb250YWN0Ll9jb250YWN0ID0gbnVsbDtcclxuICAgIHRoaXMuX2IyY29udGFjdCA9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBHZXQgdGhlIHdvcmxkIG1hbmlmb2xkLlxyXG4gKiAhI3poXHJcbiAqIOiOt+WPluS4lueVjOWdkOagh+ezu+S4i+eahOeisOaSnuS/oeaBr+OAglxyXG4gKiBAbWV0aG9kIGdldFdvcmxkTWFuaWZvbGRcclxuICogQHJldHVybiB7V29ybGRNYW5pZm9sZH1cclxuICovXHJcblBoeXNpY3NDb250YWN0LnByb3RvdHlwZS5nZXRXb3JsZE1hbmlmb2xkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBvaW50cyA9IHdvcmxkbWFuaWZvbGQucG9pbnRzO1xyXG4gICAgdmFyIHNlcGFyYXRpb25zID0gd29ybGRtYW5pZm9sZC5zZXBhcmF0aW9ucztcclxuICAgIHZhciBub3JtYWwgPSB3b3JsZG1hbmlmb2xkLm5vcm1hbDtcclxuXHJcbiAgICB0aGlzLl9iMmNvbnRhY3QuR2V0V29ybGRNYW5pZm9sZChiMndvcmxkbWFuaWZvbGQpO1xyXG4gICAgdmFyIGIycG9pbnRzID0gYjJ3b3JsZG1hbmlmb2xkLnBvaW50cztcclxuICAgIHZhciBiMnNlcGFyYXRpb25zID0gYjJ3b3JsZG1hbmlmb2xkLnNlcGFyYXRpb25zO1xyXG5cclxuICAgIHZhciBjb3VudCA9IHRoaXMuX2IyY29udGFjdC5HZXRNYW5pZm9sZCgpLnBvaW50Q291bnQ7XHJcbiAgICBwb2ludHMubGVuZ3RoID0gc2VwYXJhdGlvbnMubGVuZ3RoID0gY291bnQ7XHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIHZhciBwID0gcG9pbnRDYWNoZVtpXTtcclxuICAgICAgICBwLnggPSBiMnBvaW50c1tpXS54ICogUFRNX1JBVElPO1xyXG4gICAgICAgIHAueSA9IGIycG9pbnRzW2ldLnkgKiBQVE1fUkFUSU87XHJcbiAgICAgICAgXHJcbiAgICAgICAgcG9pbnRzW2ldID0gcDtcclxuICAgICAgICBzZXBhcmF0aW9uc1tpXSA9IGIyc2VwYXJhdGlvbnNbaV0gKiBQVE1fUkFUSU87XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsLnggPSBiMndvcmxkbWFuaWZvbGQubm9ybWFsLng7XHJcbiAgICBub3JtYWwueSA9IGIyd29ybGRtYW5pZm9sZC5ub3JtYWwueTtcclxuXHJcbiAgICBpZiAodGhpcy5faW52ZXJ0ZWQpIHtcclxuICAgICAgICBub3JtYWwueCAqPSAtMTtcclxuICAgICAgICBub3JtYWwueSAqPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gd29ybGRtYW5pZm9sZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEdldCB0aGUgbWFuaWZvbGQuXHJcbiAqICEjemhcclxuICog6I635Y+W5pys5Zyw77yI5bGA6YOo77yJ5Z2Q5qCH57O75LiL55qE56Kw5pKe5L+h5oGv44CCXHJcbiAqIEBtZXRob2QgZ2V0TWFuaWZvbGRcclxuICogQHJldHVybiB7TWFuaWZvbGR9XHJcbiAqL1xyXG5QaHlzaWNzQ29udGFjdC5wcm90b3R5cGUuZ2V0TWFuaWZvbGQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcG9pbnRzID0gbWFuaWZvbGQucG9pbnRzO1xyXG4gICAgdmFyIGxvY2FsTm9ybWFsID0gbWFuaWZvbGQubG9jYWxOb3JtYWw7XHJcbiAgICB2YXIgbG9jYWxQb2ludCA9IG1hbmlmb2xkLmxvY2FsUG9pbnQ7XHJcbiAgICBcclxuICAgIHZhciBiMm1hbmlmb2xkID0gdGhpcy5fYjJjb250YWN0LkdldE1hbmlmb2xkKCk7XHJcbiAgICB2YXIgYjJwb2ludHMgPSBiMm1hbmlmb2xkLnBvaW50cztcclxuICAgIHZhciBjb3VudCA9IHBvaW50cy5sZW5ndGggPSBiMm1hbmlmb2xkLnBvaW50Q291bnQ7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHAgPSBtYW5pZm9sZFBvaW50Q2FjaGVbaV07XHJcbiAgICAgICAgdmFyIGIycCA9IGIycG9pbnRzW2ldO1xyXG4gICAgICAgIHAubG9jYWxQb2ludC54ID0gYjJwLmxvY2FsUG9pbnQueCAqIFBUTV9SQVRJTztcclxuICAgICAgICBwLmxvY2FsUG9pbnQuWSA9IGIycC5sb2NhbFBvaW50LlkgKiBQVE1fUkFUSU87XHJcbiAgICAgICAgcC5ub3JtYWxJbXB1bHNlID0gYjJwLm5vcm1hbEltcHVsc2UgKiBQVE1fUkFUSU87XHJcbiAgICAgICAgcC50YW5nZW50SW1wdWxzZSA9IGIycC50YW5nZW50SW1wdWxzZTtcclxuXHJcbiAgICAgICAgcG9pbnRzW2ldID0gcDtcclxuICAgIH1cclxuXHJcbiAgICBsb2NhbFBvaW50LnggPSBiMm1hbmlmb2xkLmxvY2FsUG9pbnQueCAqIFBUTV9SQVRJTztcclxuICAgIGxvY2FsUG9pbnQueSA9IGIybWFuaWZvbGQubG9jYWxQb2ludC55ICogUFRNX1JBVElPO1xyXG4gICAgbG9jYWxOb3JtYWwueCA9IGIybWFuaWZvbGQubG9jYWxOb3JtYWwueDtcclxuICAgIGxvY2FsTm9ybWFsLnkgPSBiMm1hbmlmb2xkLmxvY2FsTm9ybWFsLnk7XHJcbiAgICBtYW5pZm9sZC50eXBlID0gYjJtYW5pZm9sZC50eXBlO1xyXG5cclxuICAgIGlmICh0aGlzLl9pbnZlcnRlZCkge1xyXG4gICAgICAgIGxvY2FsTm9ybWFsLnggKj0gLTE7XHJcbiAgICAgICAgbG9jYWxOb3JtYWwueSAqPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFuaWZvbGQ7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBHZXQgdGhlIGltcHVsc2VzLlxyXG4gKiBOb3RlOiBQaHlzaWNzSW1wdWxzZSBjYW4gb25seSB1c2VkIGluIG9uUG9zdFNvbHZlIGNhbGxiYWNrLlxyXG4gKiAhI3poXHJcbiAqIOiOt+WPluWGsumHj+S/oeaBr1xyXG4gKiDms6jmhI/vvJrov5nkuKrkv6Hmga/lj6rmnInlnKggb25Qb3N0U29sdmUg5Zue6LCD5Lit5omN6IO96I635Y+W5YiwXHJcbiAqIEBtZXRob2QgZ2V0SW1wdWxzZVxyXG4gKiBAcmV0dXJuIHtQaHlzaWNzSW1wdWxzZX1cclxuICovXHJcblBoeXNpY3NDb250YWN0LnByb3RvdHlwZS5nZXRJbXB1bHNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGIyaW1wdWxzZSA9IHRoaXMuX2ltcHVsc2U7XHJcbiAgICBpZiAoIWIyaW1wdWxzZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgdmFyIG5vcm1hbEltcHVsc2VzID0gaW1wdWxzZS5ub3JtYWxJbXB1bHNlcztcclxuICAgIHZhciB0YW5nZW50SW1wdWxzZXMgPSBpbXB1bHNlLnRhbmdlbnRJbXB1bHNlcztcclxuICAgIHZhciBjb3VudCA9IGIyaW1wdWxzZS5jb3VudDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgIG5vcm1hbEltcHVsc2VzW2ldID0gYjJpbXB1bHNlLm5vcm1hbEltcHVsc2VzW2ldICogUFRNX1JBVElPO1xyXG4gICAgICAgIHRhbmdlbnRJbXB1bHNlc1tpXSA9IGIyaW1wdWxzZS50YW5nZW50SW1wdWxzZXNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgdGFuZ2VudEltcHVsc2VzLmxlbmd0aCA9IG5vcm1hbEltcHVsc2VzLmxlbmd0aCA9IGNvdW50O1xyXG5cclxuICAgIHJldHVybiBpbXB1bHNlO1xyXG59O1xyXG5cclxuUGh5c2ljc0NvbnRhY3QucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoY29udGFjdFR5cGUpIHtcclxuICAgIHZhciBmdW5jO1xyXG4gICAgc3dpdGNoIChjb250YWN0VHlwZSkge1xyXG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuQkVHSU5fQ09OVEFDVDpcclxuICAgICAgICAgICAgZnVuYyA9ICdvbkJlZ2luQ29udGFjdCc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuRU5EX0NPTlRBQ1Q6XHJcbiAgICAgICAgICAgIGZ1bmMgPSAnb25FbmRDb250YWN0JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBDb250YWN0VHlwZS5QUkVfU09MVkU6XHJcbiAgICAgICAgICAgIGZ1bmMgPSAnb25QcmVTb2x2ZSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgQ29udGFjdFR5cGUuUE9TVF9TT0xWRTpcclxuICAgICAgICAgICAgZnVuYyA9ICdvblBvc3RTb2x2ZSc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb2xsaWRlckEgPSB0aGlzLmNvbGxpZGVyQTtcclxuICAgIHZhciBjb2xsaWRlckIgPSB0aGlzLmNvbGxpZGVyQjtcclxuXHJcbiAgICB2YXIgYm9keUEgPSBjb2xsaWRlckEuYm9keTtcclxuICAgIHZhciBib2R5QiA9IGNvbGxpZGVyQi5ib2R5O1xyXG5cclxuICAgIHZhciBjb21wcztcclxuICAgIHZhciBpLCBsLCBjb21wO1xyXG5cclxuICAgIGlmIChib2R5QS5lbmFibGVkQ29udGFjdExpc3RlbmVyKSB7XHJcbiAgICAgICAgY29tcHMgPSBib2R5QS5ub2RlLl9jb21wb25lbnRzO1xyXG4gICAgICAgIHRoaXMuX2ludmVydGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGNvbXBzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb21wID0gY29tcHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjb21wW2Z1bmNdKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wW2Z1bmNdKHRoaXMsIGNvbGxpZGVyQSwgY29sbGlkZXJCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoYm9keUIuZW5hYmxlZENvbnRhY3RMaXN0ZW5lcikge1xyXG4gICAgICAgIGNvbXBzID0gYm9keUIubm9kZS5fY29tcG9uZW50cztcclxuICAgICAgICB0aGlzLl9pbnZlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IGNvbXBzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb21wID0gY29tcHNbaV07XHJcbiAgICAgICAgICAgIGlmIChjb21wW2Z1bmNdKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wW2Z1bmNdKHRoaXMsIGNvbGxpZGVyQiwgY29sbGlkZXJBKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmRpc2FibGVkT25jZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZE9uY2UgPSBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcblBoeXNpY3NDb250YWN0LmdldCA9IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcclxuICAgIHZhciBjO1xyXG4gICAgaWYgKHBvb2xzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGMgPSBuZXcgY2MuUGh5c2ljc0NvbnRhY3QoKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGMgPSBwb29scy5wb3AoKTsgXHJcbiAgICB9XHJcblxyXG4gICAgYy5pbml0KGIyY29udGFjdCk7XHJcbiAgICByZXR1cm4gYztcclxufTtcclxuXHJcblBoeXNpY3NDb250YWN0LnB1dCA9IGZ1bmN0aW9uIChiMmNvbnRhY3QpIHtcclxuICAgIHZhciBjID0gYjJjb250YWN0Ll9jb250YWN0O1xyXG4gICAgaWYgKCFjKSByZXR1cm47XHJcbiAgICBcclxuICAgIHBvb2xzLnB1c2goYyk7XHJcbiAgICBjLnJlc2V0KCk7XHJcbn07XHJcblxyXG5cclxudmFyIF9wID0gUGh5c2ljc0NvbnRhY3QucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogT25lIG9mIHRoZSBjb2xsaWRlciB0aGF0IGNvbGxpZGVkXHJcbiAqICEjemhcclxuICog5Y+R55Sf56Kw5pKe55qE56Kw5pKe5L2T5LmL5LiAXHJcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJ9IGNvbGxpZGVyQVxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogT25lIG9mIHRoZSBjb2xsaWRlciB0aGF0IGNvbGxpZGVkXHJcbiAqICEjemhcclxuICog5Y+R55Sf56Kw5pKe55qE56Kw5pKe5L2T5LmL5LiAXHJcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJ9IGNvbGxpZGVyQlxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogSWYgc2V0IGRpc2FibGVkIHRvIHRydWUsIHRoZSBjb250YWN0IHdpbGwgYmUgaWdub3JlZCB1bnRpbCBjb250YWN0IGVuZC5cclxuICogSWYgeW91IGp1c3Qgd2FudCB0byBkaXNhYmxlZCBjb250YWN0IGZvciBjdXJyZW50IHRpbWUgc3RlcCBvciBzdWItc3RlcCwgcGxlYXNlIHVzZSBkaXNhYmxlZE9uY2UuXHJcbiAqICEjemhcclxuICog5aaC5p6cIGRpc2FibGVkIOiiq+iuvue9ruS4uiB0cnVl77yM6YKj5LmI55u05Yiw5o6l6Kem57uT5p2f5q2k5o6l6Kem6YO95bCG6KKr5b+955Wl44CCXHJcbiAqIOWmguaenOWPquaYr+W4jOacm+WcqOW9k+WJjeaXtumXtOatpeaIluWtkOatpeS4reW/veeVpeatpOaOpeinpu+8jOivt+S9v+eUqCBkaXNhYmxlZE9uY2Ug44CCXHJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGlzYWJsZWRcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIERpc2FibGVkIGNvbnRhY3QgZm9yIGN1cnJlbnQgdGltZSBzdGVwIG9yIHN1Yi1zdGVwLlxyXG4gKiAhI3poXHJcbiAqIOWcqOW9k+WJjeaXtumXtOatpeaIluWtkOatpeS4reW/veeVpeatpOaOpeinpuOAglxyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRpc2FibGVkT25jZVxyXG4gKi9cclxuX3Auc2V0RW5hYmxlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdGhpcy5fYjJjb250YWN0LlNldEVuYWJsZWQodmFsdWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogSXMgdGhpcyBjb250YWN0IHRvdWNoaW5nP1xyXG4gKiAhI3poXHJcbiAqIOi/lOWbnueisOaSnuS9k+aYr+WQpuW3sue7j+aOpeinpuWIsOOAglxyXG4gKiBAbWV0aG9kIGlzVG91Y2hpbmdcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICovXHJcbl9wLmlzVG91Y2hpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYjJjb250YWN0LklzVG91Y2hpbmcoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFNldCB0aGUgZGVzaXJlZCB0YW5nZW50IHNwZWVkIGZvciBhIGNvbnZleW9yIGJlbHQgYmVoYXZpb3IuXHJcbiAqICEjemhcclxuICog5Li65Lyg6YCB5bim6K6+572u5pyf5pyb55qE5YiH57q/6YCf5bqmXHJcbiAqIEBtZXRob2Qgc2V0VGFuZ2VudFNwZWVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0YW5nZW50U3BlZWRcclxuICovXHJcbl9wLnNldFRhbmdlbnRTcGVlZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdGhpcy5fYjJjb250YWN0LlNldFRhbmdlbnRTcGVlZCh2YWx1ZSAvIFBUTV9SQVRJTyk7XHJcbn07XHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEdldCB0aGUgZGVzaXJlZCB0YW5nZW50IHNwZWVkLlxyXG4gKiAhI3poXHJcbiAqIOiOt+WPluWIh+e6v+mAn+W6plxyXG4gKiBAbWV0aG9kIGdldFRhbmdlbnRTcGVlZFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG5cclxuX3AuZ2V0VGFuZ2VudFNwZWVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2IyY29udGFjdC5HZXRUYW5nZW50U3BlZWQoKSAqIFBUTV9SQVRJTztcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0IGZyaWN0aW9uIG1peHR1cmUuIFlvdSBjYW4gY2FsbCB0aGlzIGluIG9uUHJlU29sdmUgY2FsbGJhY2suXHJcbiAqICEjemhcclxuICog6KaG55uW6buY6K6k55qE5pGp5pOm5Yqb57O75pWw44CC5L2g5Y+v5Lul5ZyoIG9uUHJlU29sdmUg5Zue6LCD5Lit6LCD55So5q2k5Ye95pWw44CCXHJcbiAqIEBtZXRob2Qgc2V0RnJpY3Rpb25cclxuICogQHBhcmFtIHtOdW1iZXJ9IGZyaWN0aW9uXHJcbiAqL1xyXG5fcC5zZXRGcmljdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdGhpcy5fYjJjb250YWN0LlNldEZyaWN0aW9uKHZhbHVlKTtcclxufTtcclxuLyoqXHJcbiAqICEjZW5cclxuICogR2V0IHRoZSBmcmljdGlvbi5cclxuICogISN6aFxyXG4gKiDojrflj5blvZPliY3mkanmk6blipvns7vmlbBcclxuICogQG1ldGhvZCBnZXRGcmljdGlvblxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG5fcC5nZXRGcmljdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iMmNvbnRhY3QuR2V0RnJpY3Rpb24oKTtcclxufTtcclxuLyoqXHJcbiAqICEjZW5cclxuICogUmVzZXQgdGhlIGZyaWN0aW9uIG1peHR1cmUgdG8gdGhlIGRlZmF1bHQgdmFsdWUuXHJcbiAqICEjemhcclxuICog6YeN572u5pGp5pOm5Yqb57O75pWw5Yiw6buY6K6k5YC8XHJcbiAqIEBtZXRob2QgcmVzZXRGcmljdGlvblxyXG4gKi9cclxuX3AucmVzZXRGcmljdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9iMmNvbnRhY3QuUmVzZXRGcmljdGlvbigpO1xyXG59O1xyXG4vKipcclxuICogISNlblxyXG4gKiBPdmVycmlkZSB0aGUgZGVmYXVsdCByZXN0aXR1dGlvbiBtaXh0dXJlLiBZb3UgY2FuIGNhbGwgdGhpcyBpbiBvblByZVNvbHZlIGNhbGxiYWNrLlxyXG4gKiAhI3poXHJcbiAqIOimhueblum7mOiupOeahOaBouWkjeezu+aVsOOAguS9oOWPr+S7peWcqCBvblByZVNvbHZlIOWbnuiwg+S4reiwg+eUqOatpOWHveaVsOOAglxyXG4gKiBAbWV0aG9kIHNldFJlc3RpdHV0aW9uXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXN0aXR1dGlvblxyXG4gKi9cclxuX3Auc2V0UmVzdGl0dXRpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIHRoaXMuX2IyY29udGFjdC5TZXRSZXN0aXR1dGlvbih2YWx1ZSk7XHJcbn07XHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEdldCB0aGUgcmVzdGl0dXRpb24uXHJcbiAqICEjemhcclxuICog6I635Y+W5b2T5YmN5oGi5aSN57O75pWwXHJcbiAqIEBtZXRob2QgZ2V0UmVzdGl0dXRpb25cclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKi9cclxuX3AuZ2V0UmVzdGl0dXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYjJjb250YWN0LkdldFJlc3RpdHV0aW9uKCk7XHJcbn07XHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJlc2V0IHRoZSByZXN0aXR1dGlvbiBtaXh0dXJlIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxyXG4gKiAhI3poXHJcbiAqIOmHjee9ruaBouWkjeezu+aVsOWIsOm7mOiupOWAvFxyXG4gKiBAbWV0aG9kIHJlc2V0UmVzdGl0dXRpb25cclxuICovXHJcbl9wLnJlc2V0UmVzdGl0dXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYjJjb250YWN0LlJlc2V0UmVzdGl0dXRpb24oKTtcclxufTtcclxuXHJcblBoeXNpY3NDb250YWN0LkNvbnRhY3RUeXBlID0gQ29udGFjdFR5cGU7XHJcbmNjLlBoeXNpY3NDb250YWN0ID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQ29udGFjdDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=