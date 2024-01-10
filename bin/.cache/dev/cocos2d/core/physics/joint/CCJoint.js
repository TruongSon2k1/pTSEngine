
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCJoint.js';
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
/**
 * !#en
 * Base class for joints to connect rigidbody.
 * !#zh
 * 关节类的基类
 * @class Joint
 * @extends Component
 */


var Joint = cc.Class({
  name: 'cc.Joint',
  "extends": cc.Component,
  editor: {
    requireComponent: cc.RigidBody
  },
  properties: {
    /**
    * !#en
    * The anchor of the rigidbody.
    * !#zh
    * 刚体的锚点。
    * @property {Vec2} anchor
    * @default cc.v2(0, 0)
    */
    anchor: {
      "default": cc.v2(0, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.anchor'
    },

    /**
     * !#en
     * The anchor of the connected rigidbody.
     * !#zh
     * 关节另一端刚体的锚点。
     * @property {Vec2} connectedAnchor
     * @default cc.v2(0, 0)
     */
    connectedAnchor: {
      "default": cc.v2(0, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedAnchor'
    },

    /**
     * !#en
     * The rigidbody to which the other end of the joint is attached.
     * !#zh
     * 关节另一端链接的刚体
     * @property {RigidBody} connectedBody
     * @default null
     */
    connectedBody: {
      "default": null,
      type: cc.RigidBody,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedBody'
    },

    /**
     * !#en
     * Should the two rigid bodies connected with this joint collide with each other?
     * !#zh
     * 链接到关节上的两个刚体是否应该相互碰撞？
     * @property {Boolean} collideConnected
     * @default false
     */
    collideConnected: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.collideConnected'
    }
  },
  onDisable: function onDisable() {
    this._destroy();
  },
  onEnable: function onEnable() {
    this._init();
  },
  // need init after body and connected body init
  start: function start() {
    this._init();
  },

  /**
   * !#en
   * Apply current changes to joint, this will regenerate inner box2d joint.
   * !#zh
   * 应用当前关节中的修改，调用此函数会重新生成内部 box2d 的关节。
   * @method apply
   */
  apply: function apply() {
    this._destroy();

    this._init();
  },

  /**
   * !#en
   * Get the anchor point on rigidbody in world coordinates.
   * !#zh
   * 获取刚体世界坐标系下的锚点。
   * @method getWorldAnchor
   * @return {Vec2}
   */
  getWorldAnchor: function getWorldAnchor() {
    if (this._joint) {
      var anchor = this._joint.GetAnchorA();

      return cc.v2(anchor.x * PTM_RATIO, anchor.y * PTM_RATIO);
    }

    return cc.Vec2.ZERO;
  },

  /**
   * !#en
   * Get the anchor point on connected rigidbody in world coordinates.
   * !#zh
   * 获取链接刚体世界坐标系下的锚点。
   * @method getWorldConnectedAnchor
   * @return {Vec2}
   */
  getWorldConnectedAnchor: function getWorldConnectedAnchor() {
    if (this._joint) {
      var anchor = this._joint.GetAnchorB();

      return cc.v2(anchor.x * PTM_RATIO, anchor.y * PTM_RATIO);
    }

    return cc.Vec2.ZERO;
  },

  /**
   * !#en
   * Gets the reaction force of the joint.
   * !#zh
   * 获取关节的反作用力。
   * @method getReactionForce
   * @param {Number} timeStep - The time to calculate the reaction force for.
   * @return {Vec2}
   */
  getReactionForce: function getReactionForce(timeStep) {
    var out = cc.v2();

    if (this._joint) {
      return this._joint.GetReactionForce(timeStep, out);
    }

    return out;
  },

  /**
   * !#en
   * Gets the reaction torque of the joint.
   * !#zh
   * 获取关节的反扭矩。
   * @method getReactionTorque
   * @param {Number} timeStep - The time to calculate the reaction torque for.
   * @return {Number}
   */
  getReactionTorque: function getReactionTorque(timeStep) {
    if (this._joint) {
      return this._joint.GetReactionTorque(timeStep);
    }

    return 0;
  },
  _init: function _init() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__init', []);
  },
  _destroy: function _destroy() {
    cc.director.getPhysicsManager().pushDelayEvent(this, '__destroy', []);
  },
  __init: function __init() {
    if (this._inited) return;
    this.body = this.getComponent(cc.RigidBody);

    if (this._isValid()) {
      var def = this._createJointDef();

      if (!def) return;
      def.bodyA = this.body._getBody();
      def.bodyB = this.connectedBody._getBody();
      def.collideConnected = this.collideConnected;

      cc.director.getPhysicsManager()._addJoint(this, def);

      this._inited = true;
    }
  },
  __destroy: function __destroy() {
    if (!this._inited) return;

    cc.director.getPhysicsManager()._removeJoint(this);

    this._joint = null;
    this._inited = false;
  },
  _createJointDef: function _createJointDef() {
    return null;
  },
  _isValid: function _isValid() {
    return this.body && this.body._getBody() && this.connectedBody && this.connectedBody._getBody();
  }
});
cc.Joint = module.exports = Joint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ0pvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwicmVxdWlyZUNvbXBvbmVudCIsIlJpZ2lkQm9keSIsInByb3BlcnRpZXMiLCJhbmNob3IiLCJ2MiIsInRvb2x0aXAiLCJDQ19ERVYiLCJjb25uZWN0ZWRBbmNob3IiLCJjb25uZWN0ZWRCb2R5IiwidHlwZSIsImNvbGxpZGVDb25uZWN0ZWQiLCJvbkRpc2FibGUiLCJfZGVzdHJveSIsIm9uRW5hYmxlIiwiX2luaXQiLCJzdGFydCIsImFwcGx5IiwiZ2V0V29ybGRBbmNob3IiLCJfam9pbnQiLCJHZXRBbmNob3JBIiwieCIsInkiLCJWZWMyIiwiWkVSTyIsImdldFdvcmxkQ29ubmVjdGVkQW5jaG9yIiwiR2V0QW5jaG9yQiIsImdldFJlYWN0aW9uRm9yY2UiLCJ0aW1lU3RlcCIsIm91dCIsIkdldFJlYWN0aW9uRm9yY2UiLCJnZXRSZWFjdGlvblRvcnF1ZSIsIkdldFJlYWN0aW9uVG9ycXVlIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsInB1c2hEZWxheUV2ZW50IiwiX19pbml0IiwiX2luaXRlZCIsImJvZHkiLCJnZXRDb21wb25lbnQiLCJfaXNWYWxpZCIsImRlZiIsIl9jcmVhdGVKb2ludERlZiIsImJvZHlBIiwiX2dldEJvZHkiLCJib2R5QiIsIl9hZGRKb2ludCIsIl9fZGVzdHJveSIsIl9yZW1vdmVKb2ludCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBCYXNlIGNsYXNzIGZvciBqb2ludHMgdG8gY29ubmVjdCByaWdpZGJvZHkuXHJcbiAqICEjemhcclxuICog5YWz6IqC57G755qE5Z+657G7XHJcbiAqIEBjbGFzcyBKb2ludFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbnZhciBKb2ludCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Kb2ludCcsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBcclxuICAgIGVkaXRvcjogeyBcclxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5SaWdpZEJvZHlcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGFuY2hvciBvZiB0aGUgcmlnaWRib2R5LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDliJrkvZPnmoTplJrngrnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IGFuY2hvclxyXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDAsIDApXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYW5jaG9yOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5hbmNob3InXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGFuY2hvciBvZiB0aGUgY29ubmVjdGVkIHJpZ2lkYm9keS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5YWz6IqC5Y+m5LiA56uv5Yia5L2T55qE6ZSa54K544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMyfSBjb25uZWN0ZWRBbmNob3JcclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigwLCAwKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbm5lY3RlZEFuY2hvcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigwLCAwKSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuY29ubmVjdGVkQW5jaG9yJyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSByaWdpZGJvZHkgdG8gd2hpY2ggdGhlIG90aGVyIGVuZCBvZiB0aGUgam9pbnQgaXMgYXR0YWNoZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+mTvuaOpeeahOWImuS9k1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UmlnaWRCb2R5fSBjb25uZWN0ZWRCb2R5XHJcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbm5lY3RlZEJvZHk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUmlnaWRCb2R5LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5jb25uZWN0ZWRCb2R5J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBTaG91bGQgdGhlIHR3byByaWdpZCBib2RpZXMgY29ubmVjdGVkIHdpdGggdGhpcyBqb2ludCBjb2xsaWRlIHdpdGggZWFjaCBvdGhlcj9cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog6ZO+5o6l5Yiw5YWz6IqC5LiK55qE5Lik5Liq5Yia5L2T5piv5ZCm5bqU6K+l55u45LqS56Kw5pKe77yfXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBjb2xsaWRlQ29ubmVjdGVkXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb2xsaWRlQ29ubmVjdGVkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5jb2xsaWRlQ29ubmVjdGVkJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gbmVlZCBpbml0IGFmdGVyIGJvZHkgYW5kIGNvbm5lY3RlZCBib2R5IGluaXRcclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEFwcGx5IGN1cnJlbnQgY2hhbmdlcyB0byBqb2ludCwgdGhpcyB3aWxsIHJlZ2VuZXJhdGUgaW5uZXIgYm94MmQgam9pbnQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlupTnlKjlvZPliY3lhbPoioLkuK3nmoTkv67mlLnvvIzosIPnlKjmraTlh73mlbDkvJrph43mlrDnlJ/miJDlhoXpg6ggYm94MmQg55qE5YWz6IqC44CCXHJcbiAgICAgKiBAbWV0aG9kIGFwcGx5XHJcbiAgICAgKi9cclxuICAgIGFwcGx5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIGFuY2hvciBwb2ludCBvbiByaWdpZGJvZHkgaW4gd29ybGQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bliJrkvZPkuJbnlYzlnZDmoIfns7vkuIvnmoTplJrngrnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRBbmNob3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldFdvcmxkQW5jaG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSB0aGlzLl9qb2ludC5HZXRBbmNob3JBKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52MihhbmNob3IueCAqIFBUTV9SQVRJTywgYW5jaG9yLnkgKiBQVE1fUkFUSU8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2MuVmVjMi5aRVJPO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgYW5jaG9yIHBvaW50IG9uIGNvbm5lY3RlZCByaWdpZGJvZHkgaW4gd29ybGQgY29vcmRpbmF0ZXMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5bpk77mjqXliJrkvZPkuJbnlYzlnZDmoIfns7vkuIvnmoTplJrngrnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRDb25uZWN0ZWRBbmNob3JcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldFdvcmxkQ29ubmVjdGVkQW5jaG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSB0aGlzLl9qb2ludC5HZXRBbmNob3JCKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52MihhbmNob3IueCAqIFBUTV9SQVRJTywgYW5jaG9yLnkgKiBQVE1fUkFUSU8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2MuVmVjMi5aRVJPO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldHMgdGhlIHJlYWN0aW9uIGZvcmNlIG9mIHRoZSBqb2ludC5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluWFs+iKgueahOWPjeS9nOeUqOWKm+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRSZWFjdGlvbkZvcmNlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVN0ZXAgLSBUaGUgdGltZSB0byBjYWxjdWxhdGUgdGhlIHJlYWN0aW9uIGZvcmNlIGZvci5cclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldFJlYWN0aW9uRm9yY2U6IGZ1bmN0aW9uICh0aW1lU3RlcCkge1xyXG4gICAgICAgIHZhciBvdXQgPSBjYy52MigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fam9pbnQuR2V0UmVhY3Rpb25Gb3JjZSh0aW1lU3RlcCwgb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXRzIHRoZSByZWFjdGlvbiB0b3JxdWUgb2YgdGhlIGpvaW50LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5YWz6IqC55qE5Y+N5omt55+p44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFJlYWN0aW9uVG9ycXVlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVN0ZXAgLSBUaGUgdGltZSB0byBjYWxjdWxhdGUgdGhlIHJlYWN0aW9uIHRvcnF1ZSBmb3IuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFJlYWN0aW9uVG9ycXVlOiBmdW5jdGlvbiAodGltZVN0ZXApIHtcclxuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50LkdldFJlYWN0aW9uVG9ycXVlKHRpbWVTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5wdXNoRGVsYXlFdmVudCh0aGlzLCAnX19pbml0JywgW10pOyAgXHJcbiAgICB9LFxyXG4gICAgX2Rlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLnB1c2hEZWxheUV2ZW50KHRoaXMsICdfX2Rlc3Ryb3knLCBbXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9faW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5ib2R5ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5faXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSB0aGlzLl9jcmVhdGVKb2ludERlZigpO1xyXG4gICAgICAgICAgICBpZiAoIWRlZikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZGVmLmJvZHlBID0gdGhpcy5ib2R5Ll9nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgIGRlZi5ib2R5QiA9IHRoaXMuY29ubmVjdGVkQm9keS5fZ2V0Qm9keSgpO1xyXG4gICAgICAgICAgICBkZWYuY29sbGlkZUNvbm5lY3RlZCA9IHRoaXMuY29sbGlkZUNvbm5lY3RlZDtcclxuXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuX2FkZEpvaW50KHRoaXMsIGRlZik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBfX2Rlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLl9yZW1vdmVKb2ludCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5fam9pbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2lzVmFsaWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib2R5ICYmIHRoaXMuYm9keS5fZ2V0Qm9keSgpICYmXHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGVkQm9keSAmJiB0aGlzLmNvbm5lY3RlZEJvZHkuX2dldEJvZHkoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5Kb2ludCA9IG1vZHVsZS5leHBvcnRzID0gSm9pbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9