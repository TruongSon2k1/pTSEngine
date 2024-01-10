
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsCollider.js';
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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;

var getWorldScale = require('../utils').getWorldScale;

var b2_aabb_tmp = new b2.AABB();
/**
 * @class PhysicsCollider
 * @extends Collider
 */

var PhysicsCollider = cc.Class({
  name: 'cc.PhysicsCollider',
  "extends": cc.Collider,
  ctor: function ctor() {
    this._fixtures = [];
    this._shapes = [];
    this._inited = false;
    this._rect = cc.rect();
  },
  properties: {
    _density: 1.0,
    _sensor: false,
    _friction: 0.2,
    _restitution: 0,

    /**
     * !#en
     * The density.
     * !#zh
     * 密度
     * @property {Number} density
     * @default 1
     */
    density: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.density',
      get: function get() {
        return this._density;
      },
      set: function set(value) {
        this._density = value;
      }
    },

    /**
     * !#en
     * A sensor collider collects contact information but never generates a collision response
     * !#zh
     * 一个传感器类型的碰撞体会产生碰撞回调，但是不会发生物理碰撞效果。
     * @property {Boolean} sensor
     * @default false
     */
    sensor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.sensor',
      get: function get() {
        return this._sensor;
      },
      set: function set(value) {
        this._sensor = value;
      }
    },

    /**
     * !#en
     * The friction coefficient, usually in the range [0,1].
     * !#zh
     * 摩擦系数，取值一般在 [0, 1] 之间
     * @property {Number} friction
     * @default 0.2
     */
    friction: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.friction',
      get: function get() {
        return this._friction;
      },
      set: function set(value) {
        this._friction = value;
      }
    },

    /**
     * !#en
     * The restitution (elasticity) usually in the range [0,1].
     * !#zh
     * 弹性系数，取值一般在 [0, 1]之间
     * @property {Number} restitution
     * @default 0
     */
    restitution: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.restitution',
      get: function get() {
        return this._restitution;
      },
      set: function set(value) {
        this._restitution = value;
      }
    },

    /**
     * !#en
     * Physics collider will find the rigidbody component on the node and set to this property.
     * !#zh
     * 碰撞体会在初始化时查找节点上是否存在刚体，如果查找成功则赋值到这个属性上。
     * @property {RigidBody} body
     * @default null
     */
    body: {
      "default": null,
      type: cc.RigidBody,
      visible: false
    }
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  onEnable: function onEnable() {
    this._init();
  },
  start: function start() {
    this._init();
  },
  _getFixtureIndex: function _getFixtureIndex(fixture) {
    return this._fixtures.indexOf(fixture);
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;
    var body = this.body || this.getComponent(cc.RigidBody);
    if (!body) return;

    var innerBody = body._getBody();

    if (!innerBody) return;
    var node = body.node;
    var scale = getWorldScale(node);
    this._scale = scale;
    var shapes = scale.x === 0 && scale.y === 0 ? [] : this._createShape(scale);

    if (!(shapes instanceof Array)) {
      shapes = [shapes];
    }

    var categoryBits = 1 << node.groupIndex;
    var maskBits = 0;
    var bits = cc.game.collisionMatrix[node.groupIndex];

    for (var i = 0; i < bits.length; i++) {
      if (!bits[i]) continue;
      maskBits |= 1 << i;
    }

    var filter = {
      categoryBits: categoryBits,
      maskBits: maskBits,
      groupIndex: 0
    };
    var manager = cc.director.getPhysicsManager();

    for (var _i = 0; _i < shapes.length; _i++) {
      var shape = shapes[_i];
      var fixDef = new b2.FixtureDef();
      fixDef.density = this.density;
      fixDef.isSensor = this.sensor;
      fixDef.friction = this.friction;
      fixDef.restitution = this.restitution;
      fixDef.shape = shape;
      fixDef.filter = filter;
      var fixture = innerBody.CreateFixture(fixDef);
      fixture.collider = this;

      if (body.enabledContactListener) {
        manager._registerContactFixture(fixture);
      }

      this._shapes.push(shape);

      this._fixtures.push(fixture);
    }

    this.body = body;
    this._inited = true;
  },
  __destroy: function __destroy() {
    if (!this._inited) return;
    var fixtures = this._fixtures;

    var body = this.body._getBody();

    var manager = cc.director.getPhysicsManager();

    for (var i = fixtures.length - 1; i >= 0; i--) {
      var fixture = fixtures[i];
      fixture.collider = null;

      manager._unregisterContactFixture(fixture);

      if (body) {
        body.DestroyFixture(fixture);
      }
    }

    this.body = null;
    this._fixtures.length = 0;
    this._shapes.length = 0;
    this._inited = false;
  },
  _createShape: function _createShape() {},

  /**
   * !#en
   * Apply current changes to collider, this will regenerate inner box2d fixtures.
   * !#zh
   * 应用当前 collider 中的修改，调用此函数会重新生成内部 box2d 的夹具。
   * @method apply
   */
  apply: function apply() {
    this._destroy();

    this._init();
  },

  /**
   * !#en
   * Get the world aabb of the collider
   * !#zh
   * 获取碰撞体的世界坐标系下的包围盒
   * @method getAABB
   */
  getAABB: function getAABB() {
    var MAX = 10e6;
    var minX = MAX,
        minY = MAX;
    var maxX = -MAX,
        maxY = -MAX;

    var xf = this.body._getBody().GetTransform();

    var fixtures = this._fixtures;

    for (var i = 0; i < fixtures.length; i++) {
      var shape = fixtures[i].GetShape();
      var count = shape.GetChildCount();

      for (var j = 0; j < count; j++) {
        shape.ComputeAABB(b2_aabb_tmp, xf, j);
        if (b2_aabb_tmp.lowerBound.x < minX) minX = b2_aabb_tmp.lowerBound.x;
        if (b2_aabb_tmp.lowerBound.y < minY) minY = b2_aabb_tmp.lowerBound.y;
        if (b2_aabb_tmp.upperBound.x > maxX) maxX = b2_aabb_tmp.upperBound.x;
        if (b2_aabb_tmp.upperBound.y > maxY) maxY = b2_aabb_tmp.upperBound.y;
      }
    }

    minX *= PTM_RATIO;
    minY *= PTM_RATIO;
    maxX *= PTM_RATIO;
    maxY *= PTM_RATIO;
    var r = this._rect;
    r.x = minX;
    r.y = minY;
    r.width = maxX - minX;
    r.height = maxY - minY;
    return r;
  }
});
cc.PhysicsCollider = module.exports = PhysicsCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGNvbGxpZGVyXFxDQ1BoeXNpY3NDb2xsaWRlci5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiZ2V0V29ybGRTY2FsZSIsImIyX2FhYmJfdG1wIiwiYjIiLCJBQUJCIiwiUGh5c2ljc0NvbGxpZGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb2xsaWRlciIsImN0b3IiLCJfZml4dHVyZXMiLCJfc2hhcGVzIiwiX2luaXRlZCIsIl9yZWN0IiwicmVjdCIsInByb3BlcnRpZXMiLCJfZGVuc2l0eSIsIl9zZW5zb3IiLCJfZnJpY3Rpb24iLCJfcmVzdGl0dXRpb24iLCJkZW5zaXR5IiwidG9vbHRpcCIsIkNDX0RFViIsImdldCIsInNldCIsInZhbHVlIiwic2Vuc29yIiwiZnJpY3Rpb24iLCJyZXN0aXR1dGlvbiIsImJvZHkiLCJ0eXBlIiwiUmlnaWRCb2R5IiwidmlzaWJsZSIsIm9uRGlzYWJsZSIsIl9kZXN0cm95Iiwib25FbmFibGUiLCJfaW5pdCIsInN0YXJ0IiwiX2dldEZpeHR1cmVJbmRleCIsImZpeHR1cmUiLCJpbmRleE9mIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsInB1c2hEZWxheUV2ZW50IiwiX19pbml0IiwiZ2V0Q29tcG9uZW50IiwiaW5uZXJCb2R5IiwiX2dldEJvZHkiLCJub2RlIiwic2NhbGUiLCJfc2NhbGUiLCJzaGFwZXMiLCJ4IiwieSIsIl9jcmVhdGVTaGFwZSIsIkFycmF5IiwiY2F0ZWdvcnlCaXRzIiwiZ3JvdXBJbmRleCIsIm1hc2tCaXRzIiwiYml0cyIsImdhbWUiLCJjb2xsaXNpb25NYXRyaXgiLCJpIiwibGVuZ3RoIiwiZmlsdGVyIiwibWFuYWdlciIsInNoYXBlIiwiZml4RGVmIiwiRml4dHVyZURlZiIsImlzU2Vuc29yIiwiQ3JlYXRlRml4dHVyZSIsImNvbGxpZGVyIiwiZW5hYmxlZENvbnRhY3RMaXN0ZW5lciIsIl9yZWdpc3RlckNvbnRhY3RGaXh0dXJlIiwicHVzaCIsIl9fZGVzdHJveSIsImZpeHR1cmVzIiwiX3VucmVnaXN0ZXJDb250YWN0Rml4dHVyZSIsIkRlc3Ryb3lGaXh0dXJlIiwiYXBwbHkiLCJnZXRBQUJCIiwiTUFYIiwibWluWCIsIm1pblkiLCJtYXhYIiwibWF4WSIsInhmIiwiR2V0VHJhbnNmb3JtIiwiR2V0U2hhcGUiLCJjb3VudCIsIkdldENoaWxkQ291bnQiLCJqIiwiQ29tcHV0ZUFBQkIiLCJsb3dlckJvdW5kIiwidXBwZXJCb3VuZCIsInIiLCJ3aWR0aCIsImhlaWdodCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDOztBQUNBLElBQUlFLGFBQWEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBUCxDQUFvQkMsYUFBeEM7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsSUFBUCxFQUFsQjtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLElBQUksRUFBRSxvQkFEcUI7QUFFM0IsYUFBU0YsRUFBRSxDQUFDRyxRQUZlO0FBSTNCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtDLEtBQUwsR0FBYVIsRUFBRSxDQUFDUyxJQUFILEVBQWI7QUFDSCxHQVQwQjtBQVczQkMsRUFBQUEsVUFB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RCxXQUFXLENBQUM2RixVQUFaLENBQXVCMUMsQ0FBdkIsR0FBMkJnQyxJQUEvQixFQUFxQ0EsSUFBSSxHQUFHbkYsV0FBVyxDQUFDNkYsVUFBWixDQUF1QjFDLENBQTlCO0FBQ3JDLFlBQUluRCxXQUFXLENBQUM2RixVQUFaLENBQXVCekMsQ0FBdkIsR0FBMkJnQyxJQUEvQixFQUFxQ0EsSUFBSSxHQUFHcEYsV0FBVyxDQUFDNkYsVUFBWixDQUF1QnpDLENBQTlCO0FBQ3hDO0FBQ0o7O0FBRUQ2QixJQUFBQSxJQUFJLElBQUlwRixTQUFSO0FBQ0FxRixJQUFBQSxJQUFJLElBQUlyRixTQUFSO0FBQ0FzRixJQUFBQSxJQUFJLElBQUl0RixTQUFSO0FBQ0F1RixJQUFBQSxJQUFJLElBQUl2RixTQUFSO0FBRUEsUUFBSWlHLENBQUMsR0FBRyxLQUFLbEYsS0FBYjtBQUNBa0YsSUFBQUEsQ0FBQyxDQUFDM0MsQ0FBRixHQUFNOEIsSUFBTjtBQUNBYSxJQUFBQSxDQUFDLENBQUMxQyxDQUFGLEdBQU04QixJQUFOO0FBQ0FZLElBQUFBLENBQUMsQ0FBQ0MsS0FBRixHQUFVWixJQUFJLEdBQUdGLElBQWpCO0FBQ0FhLElBQUFBLENBQUMsQ0FBQ0UsTUFBRixHQUFXWixJQUFJLEdBQUdGLElBQWxCO0FBRUEsV0FBT1ksQ0FBUDtBQUNIO0FBM1EwQixDQUFULENBQXRCO0FBOFFBMUYsRUFBRSxDQUFDRCxlQUFILEdBQXFCOEYsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0YsZUFBdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiBcclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG52YXIgZ2V0V29ybGRTY2FsZSA9IHJlcXVpcmUoJy4uL3V0aWxzJykuZ2V0V29ybGRTY2FsZTtcclxudmFyIGIyX2FhYmJfdG1wID0gbmV3IGIyLkFBQkIoKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUGh5c2ljc0NvbGxpZGVyXHJcbiAqIEBleHRlbmRzIENvbGxpZGVyXHJcbiAqL1xyXG52YXIgUGh5c2ljc0NvbGxpZGVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlBoeXNpY3NDb2xsaWRlcicsXHJcbiAgICBleHRlbmRzOiBjYy5Db2xsaWRlcixcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZml4dHVyZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9zaGFwZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9yZWN0ID0gY2MucmVjdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2RlbnNpdHk6IDEuMCxcclxuICAgICAgICBfc2Vuc29yOiBmYWxzZSxcclxuICAgICAgICBfZnJpY3Rpb246IDAuMixcclxuICAgICAgICBfcmVzdGl0dXRpb246IDAsXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBkZW5zaXR5LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlr4bluqZcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGVuc2l0eVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZW5zaXR5OiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmRlbnNpdHknLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZW5zaXR5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVuc2l0eSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEEgc2Vuc29yIGNvbGxpZGVyIGNvbGxlY3RzIGNvbnRhY3QgaW5mb3JtYXRpb24gYnV0IG5ldmVyIGdlbmVyYXRlcyBhIGNvbGxpc2lvbiByZXNwb25zZVxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDkuIDkuKrkvKDmhJ/lmajnsbvlnovnmoTnorDmkp7kvZPkvJrkuqfnlJ/norDmkp7lm57osIPvvIzkvYbmmK/kuI3kvJrlj5HnlJ/niannkIbnorDmkp7mlYjmnpzjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHNlbnNvclxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2Vuc29yOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnNlbnNvcicsICAgICAgICBcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2Vuc29yO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Vuc29yICA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBmcmljdGlvbiBjb2VmZmljaWVudCwgdXN1YWxseSBpbiB0aGUgcmFuZ2UgWzAsMV0uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaRqeaTpuezu+aVsO+8jOWPluWAvOS4gOiIrOWcqCBbMCwgMV0g5LmL6Ze0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyaWN0aW9uXHJcbiAgICAgICAgICogQGRlZmF1bHQgMC4yXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnJpY3Rpb246IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZnJpY3Rpb24nLCAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZyaWN0aW9uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJpY3Rpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgcmVzdGl0dXRpb24gKGVsYXN0aWNpdHkpIHVzdWFsbHkgaW4gdGhlIHJhbmdlIFswLDFdLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlvLnmgKfns7vmlbDvvIzlj5blgLzkuIDoiKzlnKggWzAsIDFd5LmL6Ze0XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlc3RpdHV0aW9uXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlc3RpdHV0aW9uOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnJlc3RpdHV0aW9uJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdGl0dXRpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN0aXR1dGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFBoeXNpY3MgY29sbGlkZXIgd2lsbCBmaW5kIHRoZSByaWdpZGJvZHkgY29tcG9uZW50IG9uIHRoZSBub2RlIGFuZCBzZXQgdG8gdGhpcyBwcm9wZXJ0eS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog56Kw5pKe5L2T5Lya5Zyo5Yid5aeL5YyW5pe25p+l5om+6IqC54K55LiK5piv5ZCm5a2Y5Zyo5Yia5L2T77yM5aaC5p6c5p+l5om+5oiQ5Yqf5YiZ6LWL5YC85Yiw6L+Z5Liq5bGe5oCn5LiK44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtSaWdpZEJvZHl9IGJvZHlcclxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYm9keToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5SaWdpZEJvZHksXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XHJcbiAgICB9LFxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9LFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRGaXh0dXJlSW5kZXg6IGZ1bmN0aW9uIChmaXh0dXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpeHR1cmVzLmluZGV4T2YoZml4dHVyZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19pbml0JywgW10pO1xyXG4gICAgfSxcclxuICAgIF9kZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19kZXN0cm95JywgW10pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfX2luaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW5pdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBib2R5ID0gdGhpcy5ib2R5IHx8IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgaWYgKCFib2R5KSByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBpbm5lckJvZHkgPSBib2R5Ll9nZXRCb2R5KCk7XHJcbiAgICAgICAgaWYgKCFpbm5lckJvZHkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSBib2R5Lm5vZGU7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gZ2V0V29ybGRTY2FsZShub2RlKTtcclxuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xyXG5cclxuICAgICAgICB2YXIgc2hhcGVzID0gc2NhbGUueCA9PT0gMCAmJiBzY2FsZS55ID09PSAwID8gW10gOiB0aGlzLl9jcmVhdGVTaGFwZShzY2FsZSk7XHJcblxyXG4gICAgICAgIGlmICghKHNoYXBlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgICAgICBzaGFwZXMgPSBbc2hhcGVzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjYXRlZ29yeUJpdHMgPSAxIDw8IG5vZGUuZ3JvdXBJbmRleDtcclxuICAgICAgICB2YXIgbWFza0JpdHMgPSAwO1xyXG4gICAgICAgIHZhciBiaXRzID0gY2MuZ2FtZS5jb2xsaXNpb25NYXRyaXhbbm9kZS5ncm91cEluZGV4XTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFiaXRzW2ldKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbWFza0JpdHMgfD0gMSA8PCBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGZpbHRlciA9IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlCaXRzOiBjYXRlZ29yeUJpdHMsXHJcbiAgICAgICAgICAgIG1hc2tCaXRzOiBtYXNrQml0cyxcclxuICAgICAgICAgICAgZ3JvdXBJbmRleDogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBtYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGFwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNoYXBlID0gc2hhcGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpeERlZiA9IG5ldyBiMi5GaXh0dXJlRGVmKCk7XHJcbiAgICAgICAgICAgIGZpeERlZi5kZW5zaXR5ID0gdGhpcy5kZW5zaXR5O1xyXG4gICAgICAgICAgICBmaXhEZWYuaXNTZW5zb3IgPSB0aGlzLnNlbnNvcjtcclxuICAgICAgICAgICAgZml4RGVmLmZyaWN0aW9uID0gdGhpcy5mcmljdGlvbjtcclxuICAgICAgICAgICAgZml4RGVmLnJlc3RpdHV0aW9uID0gdGhpcy5yZXN0aXR1dGlvbjtcclxuICAgICAgICAgICAgZml4RGVmLnNoYXBlID0gc2hhcGU7XHJcblxyXG4gICAgICAgICAgICBmaXhEZWYuZmlsdGVyID0gZmlsdGVyO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpeHR1cmUgPSBpbm5lckJvZHkuQ3JlYXRlRml4dHVyZShmaXhEZWYpO1xyXG4gICAgICAgICAgICBmaXh0dXJlLmNvbGxpZGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChib2R5LmVuYWJsZWRDb250YWN0TGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIG1hbmFnZXIuX3JlZ2lzdGVyQ29udGFjdEZpeHR1cmUoZml4dHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NoYXBlcy5wdXNoKHNoYXBlKTtcclxuICAgICAgICAgICAgdGhpcy5fZml4dHVyZXMucHVzaChmaXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XHJcblxyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9fZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZhciBmaXh0dXJlcyA9IHRoaXMuX2ZpeHR1cmVzO1xyXG4gICAgICAgIHZhciBib2R5ID0gdGhpcy5ib2R5Ll9nZXRCb2R5KCk7XHJcbiAgICAgICAgdmFyIG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gZml4dHVyZXMubGVuZ3RoLTE7IGkgPj0wIDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBmaXh0dXJlID0gZml4dHVyZXNbaV07XHJcbiAgICAgICAgICAgIGZpeHR1cmUuY29sbGlkZXIgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgbWFuYWdlci5fdW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlKGZpeHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJvZHkpIHtcclxuICAgICAgICAgICAgICAgIGJvZHkuRGVzdHJveUZpeHR1cmUoZml4dHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ib2R5ID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9maXh0dXJlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3NoYXBlcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgX2NyZWF0ZVNoYXBlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXBwbHkgY3VycmVudCBjaGFuZ2VzIHRvIGNvbGxpZGVyLCB0aGlzIHdpbGwgcmVnZW5lcmF0ZSBpbm5lciBib3gyZCBmaXh0dXJlcy5cclxuICAgICAqICEjemhcclxuICAgICAqIOW6lOeUqOW9k+WJjSBjb2xsaWRlciDkuK3nmoTkv67mlLnvvIzosIPnlKjmraTlh73mlbDkvJrph43mlrDnlJ/miJDlhoXpg6ggYm94MmQg55qE5aS55YW344CCXHJcbiAgICAgKiBAbWV0aG9kIGFwcGx5XHJcbiAgICAgKi9cclxuICAgIGFwcGx5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIHdvcmxkIGFhYmIgb2YgdGhlIGNvbGxpZGVyXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bnorDmkp7kvZPnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTljIXlm7Tnm5JcclxuICAgICAqIEBtZXRob2QgZ2V0QUFCQlxyXG4gICAgICovXHJcbiAgICBnZXRBQUJCOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIE1BWCA9IDEwZTY7XHJcblxyXG4gICAgICAgIHZhciBtaW5YID0gTUFYLCBtaW5ZID0gTUFYO1xyXG4gICAgICAgIHZhciBtYXhYID0gLU1BWCwgbWF4WSA9IC1NQVg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHhmID0gdGhpcy5ib2R5Ll9nZXRCb2R5KCkuR2V0VHJhbnNmb3JtKCk7XHJcbiAgICAgICAgdmFyIGZpeHR1cmVzID0gdGhpcy5fZml4dHVyZXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaXh0dXJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBmaXh0dXJlc1tpXS5HZXRTaGFwZSgpO1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSBzaGFwZS5HZXRDaGlsZENvdW50KCk7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjb3VudDsgaisrKXtcclxuICAgICAgICAgICAgICAgIHNoYXBlLkNvbXB1dGVBQUJCKGIyX2FhYmJfdG1wLCB4Ziwgaik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYjJfYWFiYl90bXAubG93ZXJCb3VuZC54IDwgbWluWCkgbWluWCA9IGIyX2FhYmJfdG1wLmxvd2VyQm91bmQueDtcclxuICAgICAgICAgICAgICAgIGlmIChiMl9hYWJiX3RtcC5sb3dlckJvdW5kLnkgPCBtaW5ZKSBtaW5ZID0gYjJfYWFiYl90bXAubG93ZXJCb3VuZC55O1xyXG4gICAgICAgICAgICAgICAgaWYgKGIyX2FhYmJfdG1wLnVwcGVyQm91bmQueCA+IG1heFgpIG1heFggPSBiMl9hYWJiX3RtcC51cHBlckJvdW5kLng7XHJcbiAgICAgICAgICAgICAgICBpZiAoYjJfYWFiYl90bXAudXBwZXJCb3VuZC55ID4gbWF4WSkgbWF4WSA9IGIyX2FhYmJfdG1wLnVwcGVyQm91bmQueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWluWCAqPSBQVE1fUkFUSU87XHJcbiAgICAgICAgbWluWSAqPSBQVE1fUkFUSU87XHJcbiAgICAgICAgbWF4WCAqPSBQVE1fUkFUSU87XHJcbiAgICAgICAgbWF4WSAqPSBQVE1fUkFUSU87XHJcblxyXG4gICAgICAgIHZhciByID0gdGhpcy5fcmVjdDtcclxuICAgICAgICByLnggPSBtaW5YO1xyXG4gICAgICAgIHIueSA9IG1pblk7XHJcbiAgICAgICAgci53aWR0aCA9IG1heFggLSBtaW5YO1xyXG4gICAgICAgIHIuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuUGh5c2ljc0NvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQ29sbGlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9