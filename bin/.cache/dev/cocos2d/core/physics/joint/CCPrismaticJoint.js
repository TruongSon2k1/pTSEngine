
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCPrismaticJoint.js';
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
/**
 * !#en
 * A prismatic joint. This joint provides one degree of freedom: translation
 * along an axis fixed in rigidbody. Relative rotation is prevented. You can
 * use a joint limit to restrict the range of motion and a joint motor to
 * drive the motion or to model joint friction.
 * !#zh
 * 移动关节指定了只能在一个方向上移动刚体。
 * 你可以开启关节限制来设置刚体运行移动的间距，也可以开启马达来使用关节马达驱动刚体的运行。
 * @class PrismaticJoint
 * @extends Joint
 */


var PrismaticJoint = cc.Class({
  name: 'cc.PrismaticJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/PrismaticJoint'
  },
  properties: {
    /**
     * !#en
     * The local joint axis relative to rigidbody.
     * !#zh
     * 指定刚体可以移动的方向。
     * @property {Vec2} localAxisA
     * @default cc.v2(1, 0)
     */
    localAxisA: {
      "default": cc.v2(1, 0),
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.localAxisA'
    },

    /**
     * !#en
     * The reference angle.
     * !#zh
     * 相对角度
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },

    /**
     * !#en
     * Enable joint distance limit?
     * !#zh
     * 是否开启关节的距离限制？
     * @property {Boolean} enableLimit
     * @default false
     */
    enableLimit: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableLimit'
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
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.enableMotor'
    },

    /**
     * !#en
     * The lower joint limit.
     * !#zh
     * 刚体能够移动的最小值
     * @property {Number} lowerLimit
     * @default 0
     */
    lowerLimit: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.lowerLimit'
    },

    /**
     * !#en
     * The upper joint limit.
     * !#zh
     * 刚体能够移动的最大值
     * @property {Number} upperLimit
     * @default 0
     */
    upperLimit: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.upperLimit'
    },
    _maxMotorForce: 0,
    _motorSpeed: 0,

    /**
     * !#en
     * The maxium force can be applied to rigidbody to rearch the target motor speed.
     * !#zh
     * 可以施加到刚体的最大力。
     * @property {Number} maxMotorForce
     * @default 0
     */
    maxMotorForce: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxMotorForce',
      get: function get() {
        return this._maxMotorForce;
      },
      set: function set(value) {
        this._maxMotorForce = value;

        if (this._joint) {
          this._joint.SetMaxMotorForce(value);
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
          this._joint.SetMotorSpeed(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.PrismaticJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.enableLimit = this.enableLimit;
    def.lowerTranslation = this.lowerLimit / PTM_RATIO;
    def.upperTranslation = this.upperLimit / PTM_RATIO;
    def.enableMotor = this.enableMotor;
    def.maxMotorForce = this.maxMotorForce;
    def.motorSpeed = this.motorSpeed;
    return def;
  }
});
cc.PrismaticJoint = module.exports = PrismaticJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ1ByaXNtYXRpY0pvaW50LmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJBTkdMRV9UT19QSFlTSUNTX0FOR0xFIiwiUHJpc21hdGljSm9pbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkpvaW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiaW5zcGVjdG9yIiwibWVudSIsInByb3BlcnRpZXMiLCJsb2NhbEF4aXNBIiwidjIiLCJ0b29sdGlwIiwiQ0NfREVWIiwicmVmZXJlbmNlQW5nbGUiLCJlbmFibGVMaW1pdCIsImVuYWJsZU1vdG9yIiwibG93ZXJMaW1pdCIsInVwcGVyTGltaXQiLCJfbWF4TW90b3JGb3JjZSIsIl9tb3RvclNwZWVkIiwibWF4TW90b3JGb3JjZSIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0TWF4TW90b3JGb3JjZSIsIm1vdG9yU3BlZWQiLCJTZXRNb3RvclNwZWVkIiwiX2NyZWF0ZUpvaW50RGVmIiwiZGVmIiwiYjIiLCJQcmlzbWF0aWNKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsImxvd2VyVHJhbnNsYXRpb24iLCJ1cHBlclRyYW5zbGF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7O0FBQ0EsSUFBSUUsc0JBQXNCLEdBQUdELE9BQU8sQ0FBQyxtQkFB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LEVBQUUsQ0FBQ0QsY0FBSCxHQUFvQjBDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNDLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG52YXIgQU5HTEVfVE9fUEhZU0lDU19BTkdMRSA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEEgcHJpc21hdGljIGpvaW50LiBUaGlzIGpvaW50IHByb3ZpZGVzIG9uZSBkZWdyZWUgb2YgZnJlZWRvbTogdHJhbnNsYXRpb25cclxuICogYWxvbmcgYW4gYXhpcyBmaXhlZCBpbiByaWdpZGJvZHkuIFJlbGF0aXZlIHJvdGF0aW9uIGlzIHByZXZlbnRlZC4gWW91IGNhblxyXG4gKiB1c2UgYSBqb2ludCBsaW1pdCB0byByZXN0cmljdCB0aGUgcmFuZ2Ugb2YgbW90aW9uIGFuZCBhIGpvaW50IG1vdG9yIHRvXHJcbiAqIGRyaXZlIHRoZSBtb3Rpb24gb3IgdG8gbW9kZWwgam9pbnQgZnJpY3Rpb24uXHJcbiAqICEjemhcclxuICog56e75Yqo5YWz6IqC5oyH5a6a5LqG5Y+q6IO95Zyo5LiA5Liq5pa55ZCR5LiK56e75Yqo5Yia5L2T44CCXHJcbiAqIOS9oOWPr+S7peW8gOWQr+WFs+iKgumZkOWItuadpeiuvue9ruWImuS9k+i/kOihjOenu+WKqOeahOmXtOi3ne+8jOS5n+WPr+S7peW8gOWQr+mprOi+vuadpeS9v+eUqOWFs+iKgumprOi+vumpseWKqOWImuS9k+eahOi/kOihjOOAglxyXG4gKiBAY2xhc3MgUHJpc21hdGljSm9pbnRcclxuICogQGV4dGVuZHMgSm9pbnRcclxuICovXHJcbnZhciBQcmlzbWF0aWNKb2ludCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5QcmlzbWF0aWNKb2ludCcsXHJcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcclxuICAgIFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9qb2ludC5qcycsXHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1ByaXNtYXRpY0pvaW50JyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbG9jYWwgam9pbnQgYXhpcyByZWxhdGl2ZSB0byByaWdpZGJvZHkuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaMh+WumuWImuS9k+WPr+S7peenu+WKqOeahOaWueWQkeOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gbG9jYWxBeGlzQVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnYyKDEsIDApXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9jYWxBeGlzQToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBjYy52MigxLCAwKSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubG9jYWxBeGlzQSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHJlZmVyZW5jZSBhbmdsZS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog55u45a+56KeS5bqmXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJlZmVyZW5jZUFuZ2xlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlZmVyZW5jZUFuZ2xlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnJlZmVyZW5jZUFuZ2xlJyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBFbmFibGUgam9pbnQgZGlzdGFuY2UgbGltaXQ/XHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaYr+WQpuW8gOWQr+WFs+iKgueahOi3neemu+mZkOWItu+8n1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlTGltaXRcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVuYWJsZUxpbWl0OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5lbmFibGVMaW1pdCdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogRW5hYmxlIGpvaW50IG1vdG9yP1xyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmmK/lkKblvIDlkK/lhbPoioLpqazovr7vvJ9cclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZU1vdG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbmFibGVNb3Rvcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZW5hYmxlTW90b3InICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBsb3dlciBqb2ludCBsaW1pdC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yia5L2T6IO95aSf56e75Yqo55qE5pyA5bCP5YC8XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxvd2VyTGltaXRcclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG93ZXJMaW1pdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5sb3dlckxpbWl0J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSB1cHBlciBqb2ludCBsaW1pdC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yia5L2T6IO95aSf56e75Yqo55qE5pyA5aSn5YC8XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHVwcGVyTGltaXRcclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXBwZXJMaW1pdDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci51cHBlckxpbWl0JyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9tYXhNb3RvckZvcmNlOiAwLFxyXG4gICAgICAgIF9tb3RvclNwZWVkOiAwLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIG1heGl1bSBmb3JjZSBjYW4gYmUgYXBwbGllZCB0byByaWdpZGJvZHkgdG8gcmVhcmNoIHRoZSB0YXJnZXQgbW90b3Igc3BlZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWPr+S7peaWveWKoOWIsOWImuS9k+eahOacgOWkp+WKm+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhNb3RvckZvcmNlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heE1vdG9yRm9yY2U6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4TW90b3JGb3JjZScsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heE1vdG9yRm9yY2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhNb3RvckZvcmNlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNYXhNb3RvckZvcmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgZXhwZWN0ZWQgbW90b3Igc3BlZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacn+acm+eahOmprOi+vumAn+W6puOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtb3RvclNwZWVkXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1vdG9yU3BlZWQ6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubW90b3JTcGVlZCcsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vdG9yU3BlZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3RvclNwZWVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNb3RvclNwZWVkKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVKb2ludERlZjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuUHJpc21hdGljSm9pbnREZWYoKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JCID0gbmV3IGIyLlZlYzIodGhpcy5jb25uZWN0ZWRBbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuY29ubmVjdGVkQW5jaG9yLnkvUFRNX1JBVElPKTtcclxuICAgICAgICBkZWYubG9jYWxBeGlzQSA9IG5ldyBiMi5WZWMyKHRoaXMubG9jYWxBeGlzQS54LCB0aGlzLmxvY2FsQXhpc0EueSk7XHJcbiAgICAgICAgZGVmLnJlZmVyZW5jZUFuZ2xlID0gdGhpcy5yZWZlcmVuY2VBbmdsZSAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XHJcbiAgICAgICAgZGVmLmVuYWJsZUxpbWl0ID0gdGhpcy5lbmFibGVMaW1pdDtcclxuICAgICAgICBkZWYubG93ZXJUcmFuc2xhdGlvbiA9IHRoaXMubG93ZXJMaW1pdC9QVE1fUkFUSU87XHJcbiAgICAgICAgZGVmLnVwcGVyVHJhbnNsYXRpb24gPSB0aGlzLnVwcGVyTGltaXQvUFRNX1JBVElPO1xyXG4gICAgICAgIGRlZi5lbmFibGVNb3RvciA9IHRoaXMuZW5hYmxlTW90b3I7XHJcbiAgICAgICAgZGVmLm1heE1vdG9yRm9yY2UgPSB0aGlzLm1heE1vdG9yRm9yY2U7XHJcbiAgICAgICAgZGVmLm1vdG9yU3BlZWQgPSB0aGlzLm1vdG9yU3BlZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5QcmlzbWF0aWNKb2ludCA9IG1vZHVsZS5leHBvcnRzID0gUHJpc21hdGljSm9pbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9