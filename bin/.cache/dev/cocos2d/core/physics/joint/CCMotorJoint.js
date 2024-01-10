
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCMotorJoint.js';
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
 * A motor joint is used to control the relative motion
 * between two bodies. A typical usage is to control the movement
 * of a dynamic body with respect to the ground.
 * !#zh
 * 马达关节被用来控制两个刚体间的相对运动。
 * 一个典型的例子是用来控制一个动态刚体相对于地面的运动。
 * @class MotorJoint
 * @extends Joint
 */


var MotorJoint = cc.Class({
  name: 'cc.MotorJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Motor',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _linearOffset: cc.v2(0, 0),
    _angularOffset: 0,
    _maxForce: 1,
    _maxTorque: 1,
    _correctionFactor: 0.3,

    /**
     * !#en
     * The anchor of the rigidbody.
     * !#zh
     * 刚体的锚点。
     * @property {Vec2} anchor
     * @default cc.v2(0, 0)
     */
    anchor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.anchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
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
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.connectedAnchor',
      "default": cc.v2(0, 0),
      override: true,
      visible: false
    },

    /**
     * !#en
     * The linear offset from connected rigidbody to rigidbody.
     * !#zh
     * 关节另一端的刚体相对于起始端刚体的位置偏移量
     * @property {Vec2} linearOffset
     * @default cc.v2(0,0)
     */
    linearOffset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.linearOffset',
      get: function get() {
        return this._linearOffset;
      },
      set: function set(value) {
        this._linearOffset = value;

        if (this._joint) {
          this._joint.SetLinearOffset(new b2.Vec2(value.x / PTM_RATIO, value.y / PTM_RATIO));
        }
      }
    },

    /**
     * !#en
     * The angular offset from connected rigidbody to rigidbody.
     * !#zh
     * 关节另一端的刚体相对于起始端刚体的角度偏移量
     * @property {Number} angularOffset
     * @default 0
     */
    angularOffset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.angularOffset',
      get: function get() {
        return this._angularOffset;
      },
      set: function set(value) {
        this._angularOffset = value;

        if (this._joint) {
          this._joint.SetAngularOffset(value);
        }
      }
    },

    /**
     * !#en
     * The maximum force can be applied to rigidbody.
     * !#zh
     * 可以应用于刚体的最大的力值
     * @property {Number} maxForce
     * @default 1
     */
    maxForce: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxForce',
      get: function get() {
        return this._maxForce;
      },
      set: function set(value) {
        this._maxForce = value;

        if (this._joint) {
          this._joint.SetMaxForce(value);
        }
      }
    },

    /**
     * !#en
     * The maximum torque can be applied to rigidbody.
     * !#zh
     * 可以应用于刚体的最大扭矩值
     * @property {Number} maxTorque
     * @default 1
     */
    maxTorque: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxTorque',
      get: function get() {
        return this._maxTorque;
      },
      set: function set(value) {
        this._maxTorque = value;

        if (this._joint) {
          this._joint.SetMaxTorque(value);
        }
      }
    },

    /**
     * !#en
     * The position correction factor in the range [0,1].
     * !#zh
     * 位置矫正系数，范围为 [0, 1]
     * @property {Number} correctionFactor
     * @default 0.3
     */
    correctionFactor: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.correctionFactor',
      get: function get() {
        return this._correctionFactor;
      },
      set: function set(value) {
        this._correctionFactor = value;

        if (this._joint) {
          this._joint.SetCorrectionFactor(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.MotorJointDef();
    def.linearOffset = new b2.Vec2(this.linearOffset.x / PTM_RATIO, this.linearOffset.y / PTM_RATIO);
    def.angularOffset = this.angularOffset * ANGLE_TO_PHYSICS_ANGLE;
    def.maxForce = this.maxForce;
    def.maxTorque = this.maxTorque;
    def.correctionFactor = this.correctionFactor;
    return def;
  }
});
cc.MotorJoint = module.exports = MotorJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ01vdG9ySm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUiLCJNb3RvckpvaW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJKb2ludCIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJpbnNwZWN0b3IiLCJwcm9wZXJ0aWVzIiwiX2xpbmVhck9mZnNldCIsInYyIiwiX2FuZ3VsYXJPZmZzZXQiLCJfbWF4Rm9yY2UiLCJfbWF4VG9ycXVlIiwiX2NvcnJlY3Rpb25GYWN0b3IiLCJhbmNob3IiLCJ0b29sdGlwIiwiQ0NfREVWIiwib3ZlcnJpZGUiLCJ2aXNpYmxlIiwiY29ubmVjdGVkQW5jaG9yIiwibGluZWFyT2Zmc2V0IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfam9pbnQiLCJTZXRMaW5lYXJPZmZzZXQiLCJiMiIsIlZlYzIiLCJ4IiwieSIsImFuZ3VsYXJPZmZzZXQiLCJTZXRBbmd1bGFyT2Zmc2V0IiwibWF4Rm9yY2UiLCJTZXRNYXhGb3JjZSIsIm1heFRvcnF1ZSIsIlNldE1heFRvcnF1ZSIsImNvcnJlY3Rpb25GYWN0b3IiLCJTZXRDb3JyZWN0aW9uRmFjdG9yIiwiX2NyZWF0ZUpvaW50RGVmIiwiZGVmIiwiTW90b3JKb2ludERlZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDOztBQUNBLElBQUlFLHNCQUFzQixHQUFHRCxPQUFPLENBQUMsbUJB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QUcsQ0FBQ25CLFlBQUosR0FBbUIsSUFBSU0sRUFBRSxDQUFDQyxJQUFQLENBQVksS0FBS1AsWUFBTCxDQUFrQlEsQ0FBbEIsR0FBb0JqQyxTQUFoQyxFQUEyQyxLQUFLeUIsWUFBTCxDQUFrQlMsQ0FBbEIsR0FBb0JsQyxTQUEvRCxDQUFuQjtBQUNBNEMsSUFBQUEsR0FBRyxDQUFDVCxhQUFKLEdBQW9CLEtBQUtBLGFBQUwsR0FBcUJqQyxzQkFBekM7QUFDQTBDLElBQUFBLEdBQUcsQ0FBQ1AsUUFBSixHQUFlLEtBQUtBLFFBQXBCO0FBQ0FPLElBQUFBLEdBQUcsQ0FBQ0wsU0FBSixHQUFnQixLQUFLQSxTQUFyQjtBQUNBSyxJQUFBQSxHQUFHLENBQUNILGdCQUFKLEdBQXVCLEtBQUtBLGdCQUE1QjtBQUVBLFdBQU9HLEdBQVA7QUFDSDtBQWpLcUIsQ0FBVCxDQUFqQjtBQW9LQXhDLEVBQUUsQ0FBQ0QsVUFBSCxHQUFnQjJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVDLFVBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG52YXIgQU5HTEVfVE9fUEhZU0lDU19BTkdMRSA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuQU5HTEVfVE9fUEhZU0lDU19BTkdMRTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEEgbW90b3Igam9pbnQgaXMgdXNlZCB0byBjb250cm9sIHRoZSByZWxhdGl2ZSBtb3Rpb25cclxuICogYmV0d2VlbiB0d28gYm9kaWVzLiBBIHR5cGljYWwgdXNhZ2UgaXMgdG8gY29udHJvbCB0aGUgbW92ZW1lbnRcclxuICogb2YgYSBkeW5hbWljIGJvZHkgd2l0aCByZXNwZWN0IHRvIHRoZSBncm91bmQuXHJcbiAqICEjemhcclxuICog6ams6L6+5YWz6IqC6KKr55So5p2l5o6n5Yi25Lik5Liq5Yia5L2T6Ze055qE55u45a+56L+Q5Yqo44CCXHJcbiAqIOS4gOS4quWFuOWei+eahOS+i+WtkOaYr+eUqOadpeaOp+WItuS4gOS4quWKqOaAgeWImuS9k+ebuOWvueS6juWcsOmdoueahOi/kOWKqOOAglxyXG4gKiBAY2xhc3MgTW90b3JKb2ludFxyXG4gKiBAZXh0ZW5kcyBKb2ludFxyXG4gKi9cclxudmFyIE1vdG9ySm9pbnQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTW90b3JKb2ludCcsXHJcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcclxuICAgIFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9Nb3RvcicsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL2pvaW50LmpzJyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9saW5lYXJPZmZzZXQ6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgIF9hbmd1bGFyT2Zmc2V0OiAwLFxyXG4gICAgICAgIF9tYXhGb3JjZTogMSxcclxuICAgICAgICBfbWF4VG9ycXVlOiAxLFxyXG4gICAgICAgIF9jb3JyZWN0aW9uRmFjdG9yOiAwLjMsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgYW5jaG9yIG9mIHRoZSByaWdpZGJvZHkuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWImuS9k+eahOmUmueCueOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gYW5jaG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgY2MudjIoMCwgMClcclxuICAgICAgICAgKi9cclxuICAgICAgICBhbmNob3I6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuYW5jaG9yJywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZGVmYXVsdDogY2MudjIoMCwgMCksXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBhbmNob3Igb2YgdGhlIGNvbm5lY3RlZCByaWdpZGJvZHkuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+WImuS9k+eahOmUmueCueOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gY29ubmVjdGVkQW5jaG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgY2MudjIoMCwgMClcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25uZWN0ZWRBbmNob3I6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuY29ubmVjdGVkQW5jaG9yJyxcclxuICAgICAgICAgICAgZGVmYXVsdDogY2MudjIoMCwgMCksXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGxpbmVhciBvZmZzZXQgZnJvbSBjb25uZWN0ZWQgcmlnaWRib2R5IHRvIHJpZ2lkYm9keS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5YWz6IqC5Y+m5LiA56uv55qE5Yia5L2T55u45a+55LqO6LW35aeL56uv5Yia5L2T55qE5L2N572u5YGP56e76YePXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMyfSBsaW5lYXJPZmZzZXRcclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy52MigwLDApXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbGluZWFyT2Zmc2V0OiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmxpbmVhck9mZnNldCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVhck9mZnNldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVhck9mZnNldCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0TGluZWFyT2Zmc2V0KCBuZXcgYjIuVmVjMih2YWx1ZS54L1BUTV9SQVRJTywgdmFsdWUueS9QVE1fUkFUSU8pICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGFuZ3VsYXIgb2Zmc2V0IGZyb20gY29ubmVjdGVkIHJpZ2lkYm9keSB0byByaWdpZGJvZHkuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWFs+iKguWPpuS4gOerr+eahOWImuS9k+ebuOWvueS6jui1t+Wni+err+WImuS9k+eahOinkuW6puWBj+enu+mHj1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbmd1bGFyT2Zmc2V0XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFuZ3VsYXJPZmZzZXQ6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuYW5ndWxhck9mZnNldCcsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuZ3VsYXJPZmZzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmd1bGFyT2Zmc2V0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRBbmd1bGFyT2Zmc2V0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbWF4aW11bSBmb3JjZSBjYW4gYmUgYXBwbGllZCB0byByaWdpZGJvZHkuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWPr+S7peW6lOeUqOS6juWImuS9k+eahOacgOWkp+eahOWKm+WAvFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhGb3JjZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAgICAgKi9cclxuICAgICAgICBtYXhGb3JjZToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tYXhGb3JjZScsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heEZvcmNlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4Rm9yY2UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heEZvcmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbWF4aW11bSB0b3JxdWUgY2FuIGJlIGFwcGxpZWQgdG8gcmlnaWRib2R5LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlj6/ku6XlupTnlKjkuo7liJrkvZPnmoTmnIDlpKfmia3nn6nlgLxcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWF4VG9ycXVlXHJcbiAgICAgICAgICogQGRlZmF1bHQgMVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1heFRvcnF1ZToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tYXhUb3JxdWUnLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhUb3JxdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhUb3JxdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heFRvcnF1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHBvc2l0aW9uIGNvcnJlY3Rpb24gZmFjdG9yIGluIHRoZSByYW5nZSBbMCwxXS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5L2N572u55+r5q2j57O75pWw77yM6IyD5Zu05Li6IFswLCAxXVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjb3JyZWN0aW9uRmFjdG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgMC4zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29ycmVjdGlvbkZhY3Rvcjoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5jb3JyZWN0aW9uRmFjdG9yJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29ycmVjdGlvbkZhY3RvcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvcnJlY3Rpb25GYWN0b3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldENvcnJlY3Rpb25GYWN0b3IodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZiA9IG5ldyBiMi5Nb3RvckpvaW50RGVmKCk7XHJcbiAgICAgICAgZGVmLmxpbmVhck9mZnNldCA9IG5ldyBiMi5WZWMyKHRoaXMubGluZWFyT2Zmc2V0LngvUFRNX1JBVElPLCB0aGlzLmxpbmVhck9mZnNldC55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLmFuZ3VsYXJPZmZzZXQgPSB0aGlzLmFuZ3VsYXJPZmZzZXQgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG4gICAgICAgIGRlZi5tYXhGb3JjZSA9IHRoaXMubWF4Rm9yY2U7XHJcbiAgICAgICAgZGVmLm1heFRvcnF1ZSA9IHRoaXMubWF4VG9ycXVlO1xyXG4gICAgICAgIGRlZi5jb3JyZWN0aW9uRmFjdG9yID0gdGhpcy5jb3JyZWN0aW9uRmFjdG9yO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLk1vdG9ySm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IE1vdG9ySm9pbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9