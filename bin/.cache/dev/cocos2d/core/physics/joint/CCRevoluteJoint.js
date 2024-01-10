
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCRevoluteJoint.js';
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

var ANGLE_TO_PHYSICS_ANGLE = require('../CCPhysicsTypes').ANGLE_TO_PHYSICS_ANGLE;

var PHYSICS_ANGLE_TO_ANGLE = require('../CCPhysicsTypes').PHYSICS_ANGLE_TO_ANGLE;
/**
 * !#en
 * A revolute joint constrains two bodies to share a common point while they
 * are free to rotate about the point. The relative rotation about the shared
 * point is the joint angle. You can limit the relative rotation with
 * a joint limit that specifies a lower and upper angle. You can use a motor
 * to drive the relative rotation about the shared point. A maximum motor torque
 * is provided so that infinite forces are not generated.
 * !#zh
 * 旋转关节可以约束两个刚体围绕一个点来进行旋转。
 * 你可以通过开启关节限制来限制旋转的最大角度和最小角度。
 * 你可以通过开启马达来施加一个扭矩力来驱动这两个刚体在这一点上的相对速度。
 * @class RevoluteJoint
 * @extends Joint
 */


var RevoluteJoint = cc.Class({
  name: 'cc.RevoluteJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Revolute',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _maxMotorTorque: 0,
    _motorSpeed: 0,
    _enableLimit: false,
    _enableMotor: false,

    /**
     * !#en
     * The reference angle.
     * An angle between bodies considered to be zero for the joint angle.
     * !#zh
     * 相对角度。
     * 两个物体之间角度为零时可以看作相等于关节角度
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },

    /**
     * !#en
     * The lower angle.
     * !#zh
     * 角度的最低限制。
     * @property {Number} lowerAngle
     * @default 0
     */
    lowerAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.lowerAngle'
    },

    /**
     * !#en
     * The upper angle.
     * !#zh
     * 角度的最高限制。
     * @property {Number} upperAngle
     * @default 0
     */
    upperAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.upperAngle'
    },

    /**
     * !#en
     * The maxium torque can be applied to rigidbody to rearch the target motor speed.
     * !#zh
     * 可以施加到刚体的最大扭矩。
     * @property {Number} maxMotorTorque
     * @default 0
     */
    maxMotorTorque: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxMotorTorque',
      get: function get() {
        return this._maxMotorTorque;
      },
      set: function set(value) {
        this._maxMotorTorque = value;

        if (this._joint) {
          this._joint.SetMaxMotorTorque(value);
        }
      }
    },

    /**
     * !#en
     * The expected motor speed.
     * !#zh
     * 期望的马达速度。
     * @property {Number} motorSpeed
     * @default 0
     */
    motorSpeed: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.motorSpeed',
      get: function get() {
        return this._motorSpeed;
      },
      set: function set(value) {
        this._motorSpeed = value;

        if (this._joint) {
          this._joint.SetMotorSpeed(value * ANGLE_TO_PHYSICS_ANGLE);
        }
      }
    },

    /**
     * !#en
     * Enable joint limit?
     * !#zh
     * 是否开启关节的限制？
     * @property {Boolean} enableLimit
     * @default false
     */
    enableLimit: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableLimit',
      get: function get() {
        return this._enableLimit;
      },
      set: function set(value) {
        this._enableLimit = value;

        if (this._joint) {
          this._joint.EnableLimit(value);
        }
      }
    },

    /**
     * !#en
     * Enable joint motor?
     * !#zh
     * 是否开启关节马达？
     * @property {Boolean} enableMotor
     * @default false
     */
    enableMotor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableMotor',
      get: function get() {
        return this._enableMotor;
      },
      set: function set(value) {
        this._enableMotor = value;

        if (this._joint) {
          this._joint.EnableMotor(value);
        }
      }
    }
  },

  /**
   * !#en
   * Get the joint angle.
   * !#zh
   * 获取关节角度。
   * @method getJointAngle
   * @return {Number}
   */
  getJointAngle: function getJointAngle() {
    if (this._joint) {
      return this._joint.GetJointAngle() * PHYSICS_ANGLE_TO_ANGLE;
    }

    return 0;
  },

  /**
   * !#en
   * Set the max and min limit angle.
   * !#zh
   * 设置关节的角度最大和最小角度。
   * @param {Number} lower 
   * @param {Number} upper 
   */
  setLimits: function setLimits(lower, upper) {
    if (this._joint) {
      return this._joint.SetLimits(lower * ANGLE_TO_PHYSICS_ANGLE, upper * ANGLE_TO_PHYSICS_ANGLE);
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.RevoluteJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO); // cocos degree 0 is to right, and box2d degree 0 is to up.

    def.lowerAngle = this.upperAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.upperAngle = this.lowerAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.maxMotorTorque = this.maxMotorTorque;
    def.motorSpeed = this.motorSpeed * ANGLE_TO_PHYSICS_ANGLE;
    def.enableLimit = this.enableLimit;
    def.enableMotor = this.enableMotor;
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    return def;
  }
});
cc.RevoluteJoint = module.exports = RevoluteJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ1Jldm9sdXRlSm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUiLCJQSFlTSUNTX0FOR0xFX1RPX0FOR0xFIiwiUmV2b2x1dGVKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaW5zcGVjdG9yIiwicHJvcGVydGllcyIsIl9tYXhNb3RvclRvcnF1ZSIsIl9tb3RvclNwZWVkIiwiX2VuYWJsZUxpbWl0IiwiX2VuYWJsZU1vdG9yIiwicmVmZXJlbmNlQW5nbGUiLCJ0b29sdGlwIiwiQ0NfREVWIiwibG93ZXJBbmdsZSIsInVwcGVyQW5nbGUiLCJtYXhNb3RvclRvcnF1ZSIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0TWF4TW90b3JUb3JxdWUiLCJtb3RvclNwZWVkIiwiU2V0TW90b3JTcGVlZCIsImVuYWJsZUxpbWl0IiwiRW5hYmxlTGltaXQiLCJlbmFibGVNb3RvciIsIkVuYWJsZU1vdG9yIiwiZ2V0Sm9pbnRBbmdsZSIsIkdldEpvaW50QW5nbGUiLCJzZXRMaW1pdHMiLCJsb3dlciIsInVwcGVyIiwiU2V0TGltaXRzIiwiX2NyZWF0ZUpvaW50RGVmIiwiZGVmIiwiYjIiLCJSZXZvbHV0ZUpvaW50RGVmIiwibG9jYWxBbmNob3JBIiwiVmVjMiIsImFuY2hvciIsIngiLCJ5IiwibG9jYWxBbmNob3JCIiwiY29ubmVjdGVkQW5jaG9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG52YXIgQU5HTEVfVE9fUEhZU0lDU19BTkdMRSA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxudmFyIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBIHJldm9sdXRlIGpvaW50IGNvbnN0cmFpbnMgdHdvIGJvZGllcyB0byBzaGFyZSBhIGNvbW1vbiBwb2ludCB3aGlsZSB0aGV5XHJcbiAqIGFyZSBmcmVlIHRvIHJvdGF0ZSBhYm91dCB0aGUgcG9pbnQuIFRoZSByZWxhdGl2ZSByb3RhdGlvbiBhYm91dCB0aGUgc2hhcmVkXHJcbiAqIHBvaW50IGlzIHRoZSBqb2ludCBhbmdsZS4gWW91IGNhbiBsaW1pdCB0aGUgcmVsYXRpdmUgcm90YXRpb24gd2l0aFxyXG4gKiBhIGpvaW50IGxpbWl0IHRoYXQgc3BlY2lmaWVzIGEgbG93ZXIgYW5kIHVwcGVyIGFuZ2xlLiBZb3UgY2FuIHVzZSBhIG1vdG9yXHJcbiAqIHRvIGRyaXZlIHRoZSByZWxhdGl2ZSByb3RhdGlvbiBhYm91dCB0aGUgc2hhcmVkIHBvaW50LiBBIG1heGltdW0gbW90b3IgdG9ycXVlXHJcbiAqIGlzIHByb3ZpZGVkIHNvIHRoYXQgaW5maW5pdGUgZm9yY2VzIGFyZSBub3QgZ2VuZXJhdGVkLlxyXG4gKiAhI3poXHJcbiAqIOaXi+i9rOWFs+iKguWPr+S7pee6puadn+S4pOS4quWImuS9k+WbtOe7leS4gOS4queCueadpei/m+ihjOaXi+i9rOOAglxyXG4gKiDkvaDlj6/ku6XpgJrov4flvIDlkK/lhbPoioLpmZDliLbmnaXpmZDliLbml4vovaznmoTmnIDlpKfop5LluqblkozmnIDlsI/op5LluqbjgIJcclxuICog5L2g5Y+v5Lul6YCa6L+H5byA5ZCv6ams6L6+5p2l5pa95Yqg5LiA5Liq5omt55+p5Yqb5p2l6amx5Yqo6L+Z5Lik5Liq5Yia5L2T5Zyo6L+Z5LiA54K55LiK55qE55u45a+56YCf5bqm44CCXHJcbiAqIEBjbGFzcyBSZXZvbHV0ZUpvaW50XHJcbiAqIEBleHRlbmRzIEpvaW50XHJcbiAqL1xyXG52YXIgUmV2b2x1dGVKb2ludCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5SZXZvbHV0ZUpvaW50JyxcclxuICAgIGV4dGVuZHM6IGNjLkpvaW50LFxyXG4gICAgXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1Jldm9sdXRlJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3Mvam9pbnQuanMnLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX21heE1vdG9yVG9ycXVlOiAwLFxyXG4gICAgICAgIF9tb3RvclNwZWVkOiAwLFxyXG4gICAgICAgIF9lbmFibGVMaW1pdDogZmFsc2UsXHJcbiAgICAgICAgX2VuYWJsZU1vdG9yOiBmYWxzZSxcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHJlZmVyZW5jZSBhbmdsZS5cclxuICAgICAgICAgKiBBbiBhbmdsZSBiZXR3ZWVuIGJvZGllcyBjb25zaWRlcmVkIHRvIGJlIHplcm8gZm9yIHRoZSBqb2ludCBhbmdsZS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog55u45a+56KeS5bqm44CCXHJcbiAgICAgICAgICog5Lik5Liq54mp5L2T5LmL6Ze06KeS5bqm5Li66Zu25pe25Y+v5Lul55yL5L2c55u4562J5LqO5YWz6IqC6KeS5bqmXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlZmVyZW5jZUFuZ2xlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZmVyZW5jZUFuZ2xlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnJlZmVyZW5jZUFuZ2xlJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGxvd2VyIGFuZ2xlLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDop5LluqbnmoTmnIDkvY7pmZDliLbjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbG93ZXJBbmdsZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb3dlckFuZ2xlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmxvd2VyQW5nbGUnICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHVwcGVyIGFuZ2xlLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDop5LluqbnmoTmnIDpq5jpmZDliLbjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdXBwZXJBbmdsZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICB1cHBlckFuZ2xlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnVwcGVyQW5nbGUnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtYXhpdW0gdG9ycXVlIGNhbiBiZSBhcHBsaWVkIHRvIHJpZ2lkYm9keSB0byByZWFyY2ggdGhlIHRhcmdldCBtb3RvciBzcGVlZC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Y+v5Lul5pa95Yqg5Yiw5Yia5L2T55qE5pyA5aSn5omt55+p44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heE1vdG9yVG9ycXVlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heE1vdG9yVG9ycXVlOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLm1heE1vdG9yVG9ycXVlJywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4TW90b3JUb3JxdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhNb3RvclRvcnF1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TWF4TW90b3JUb3JxdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBleHBlY3RlZCBtb3RvciBzcGVlZC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5pyf5pyb55qE6ams6L6+6YCf5bqm44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1vdG9yU3BlZWRcclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbW90b3JTcGVlZDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tb3RvclNwZWVkJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW90b3JTcGVlZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vdG9yU3BlZWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1vdG9yU3BlZWQodmFsdWUgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBFbmFibGUgam9pbnQgbGltaXQ/XHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaYr+WQpuW8gOWQr+WFs+iKgueahOmZkOWItu+8n1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlTGltaXRcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZUxpbWl0OiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmVuYWJsZUxpbWl0JywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlTGltaXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGVMaW1pdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuRW5hYmxlTGltaXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEVuYWJsZSBqb2ludCBtb3Rvcj9cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5piv5ZCm5byA5ZCv5YWz6IqC6ams6L6+77yfXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVNb3RvclxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlTW90b3I6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZW5hYmxlTW90b3InLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVNb3RvcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZU1vdG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5FbmFibGVNb3Rvcih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IHRoZSBqb2ludCBhbmdsZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluWFs+iKguinkuW6puOAglxyXG4gICAgICogQG1ldGhvZCBnZXRKb2ludEFuZ2xlXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldEpvaW50QW5nbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50LkdldEpvaW50QW5nbGUoKSAqIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldCB0aGUgbWF4IGFuZCBtaW4gbGltaXQgYW5nbGUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva7lhbPoioLnmoTop5LluqbmnIDlpKflkozmnIDlsI/op5LluqbjgIJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsb3dlciBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB1cHBlciBcclxuICAgICAqL1xyXG4gICAgc2V0TGltaXRzIChsb3dlciwgdXBwZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2pvaW50LlNldExpbWl0cyhsb3dlciAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUsIHVwcGVyICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGVmID0gbmV3IGIyLlJldm9sdXRlSm9pbnREZWYoKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JCID0gbmV3IGIyLlZlYzIodGhpcy5jb25uZWN0ZWRBbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuY29ubmVjdGVkQW5jaG9yLnkvUFRNX1JBVElPKTtcclxuXHJcbiAgICAgICAgLy8gY29jb3MgZGVncmVlIDAgaXMgdG8gcmlnaHQsIGFuZCBib3gyZCBkZWdyZWUgMCBpcyB0byB1cC5cclxuICAgICAgICBkZWYubG93ZXJBbmdsZSA9IHRoaXMudXBwZXJBbmdsZSogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxuICAgICAgICBkZWYudXBwZXJBbmdsZSA9IHRoaXMubG93ZXJBbmdsZSogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxuICAgICAgICBcclxuICAgICAgICBkZWYubWF4TW90b3JUb3JxdWUgPSB0aGlzLm1heE1vdG9yVG9ycXVlO1xyXG4gICAgICAgIGRlZi5tb3RvclNwZWVkID0gdGhpcy5tb3RvclNwZWVkICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxuICAgICAgICBkZWYuZW5hYmxlTGltaXQgPSB0aGlzLmVuYWJsZUxpbWl0O1xyXG4gICAgICAgIGRlZi5lbmFibGVNb3RvciA9IHRoaXMuZW5hYmxlTW90b3I7XHJcblxyXG4gICAgICAgIGRlZi5yZWZlcmVuY2VBbmdsZSA9IHRoaXMucmVmZXJlbmNlQW5nbGUgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlJldm9sdXRlSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFJldm9sdXRlSm9pbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9