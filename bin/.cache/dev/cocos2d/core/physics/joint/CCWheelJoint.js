
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCWheelJoint.js';
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
 * A wheel joint. This joint provides two degrees of freedom: translation
 * along an axis fixed in bodyA and rotation in the plane. You can use a joint motor to drive
 * the rotation or to model rotational friction.
 * This joint is designed for vehicle suspensions.
 * !#zh
 * 轮子关节提供两个维度的自由度：旋转和沿着指定方向上位置的移动。
 * 你可以通过开启关节马达来使用马达驱动刚体的旋转。
 * 轮组关节是专门为机动车类型设计的。
 * @class WheelJoint
 * @extends Joint
 */


var WheelJoint = cc.Class({
  name: 'cc.WheelJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Wheel'
  },
  properties: {
    _maxMotorTorque: 0,
    _motorSpeed: 0,
    _enableMotor: false,
    _frequency: 2,
    _dampingRatio: 0.7,

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
    },

    /**
     * !#en
     * The spring frequency.
     * !#zh
     * 弹性系数。
     * @property {Number} frequency
     * @default 0
     */
    frequency: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.frequency',
      get: function get() {
        return this._frequency;
      },
      set: function set(value) {
        this._frequency = value;

        if (this._joint) {
          this._joint.SetSpringFrequencyHz(value);
        }
      }
    },

    /**
     * !#en
     * The damping ratio.
     * !#zh
     * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
     * @property {Number} dampingRatio
     * @default 0
     */
    dampingRatio: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.dampingRatio',
      get: function get() {
        return this._dampingRatio;
      },
      set: function set(value) {
        this._dampingRatio = value;

        if (this._joint) {
          this._joint.SetDampingRatio(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.WheelJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
    def.maxMotorTorque = this.maxMotorTorque;
    def.motorSpeed = this.motorSpeed * ANGLE_TO_PHYSICS_ANGLE;
    def.enableMotor = this.enableMotor;
    def.dampingRatio = this.dampingRatio;
    def.frequencyHz = this.frequency;
    return def;
  }
});
cc.WheelJoint = module.exports = WheelJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ1doZWVsSm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkFOR0xFX1RPX1BIWVNJQ1NfQU5HTEUiLCJXaGVlbEpvaW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJKb2ludCIsImVkaXRvciIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwiX21heE1vdG9yVG9ycXVlIiwiX21vdG9yU3BlZWQiLCJfZW5hYmxlTW90b3IiLCJfZnJlcXVlbmN5IiwiX2RhbXBpbmdSYXRpbyIsImxvY2FsQXhpc0EiLCJ2MiIsInRvb2x0aXAiLCJDQ19ERVYiLCJtYXhNb3RvclRvcnF1ZSIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0TWF4TW90b3JUb3JxdWUiLCJtb3RvclNwZWVkIiwiU2V0TW90b3JTcGVlZCIsImVuYWJsZU1vdG9yIiwiRW5hYmxlTW90b3IiLCJmcmVxdWVuY3kiLCJTZXRTcHJpbmdGcmVxdWVuY3lIeiIsImRhbXBpbmdSYXRpbyIsIlNldERhbXBpbmdSYXRpbyIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsImIyIiwiV2hlZWxKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsImZyZXF1ZW5jeUh6IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7O0FB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QUFMLENBQWdCeUIsQ0FBNUIsRUFBK0IsS0FBS3pCLFVBQUwsQ0FBZ0IwQixDQUEvQyxDQUFqQjtBQUVBUCxJQUFBQSxHQUFHLENBQUNmLGNBQUosR0FBcUIsS0FBS0EsY0FBMUI7QUFDQWUsSUFBQUEsR0FBRyxDQUFDVCxVQUFKLEdBQWlCLEtBQUtBLFVBQUwsR0FBa0IxQixzQkFBbkM7QUFDQW1DLElBQUFBLEdBQUcsQ0FBQ1AsV0FBSixHQUFrQixLQUFLQSxXQUF2QjtBQUVBTyxJQUFBQSxHQUFHLENBQUNILFlBQUosR0FBbUIsS0FBS0EsWUFBeEI7QUFDQUcsSUFBQUEsR0FBRyxDQUFDVSxXQUFKLEdBQWtCLEtBQUtmLFNBQXZCO0FBRUEsV0FBT0ssR0FBUDtBQUNIO0FBdkpxQixDQUFULENBQWpCO0FBMEpBakMsRUFBRSxDQUFDRCxVQUFILEdBQWdCNkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUMsVUFBakMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XHJcbnZhciBBTkdMRV9UT19QSFlTSUNTX0FOR0xFID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5BTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQSB3aGVlbCBqb2ludC4gVGhpcyBqb2ludCBwcm92aWRlcyB0d28gZGVncmVlcyBvZiBmcmVlZG9tOiB0cmFuc2xhdGlvblxyXG4gKiBhbG9uZyBhbiBheGlzIGZpeGVkIGluIGJvZHlBIGFuZCByb3RhdGlvbiBpbiB0aGUgcGxhbmUuIFlvdSBjYW4gdXNlIGEgam9pbnQgbW90b3IgdG8gZHJpdmVcclxuICogdGhlIHJvdGF0aW9uIG9yIHRvIG1vZGVsIHJvdGF0aW9uYWwgZnJpY3Rpb24uXHJcbiAqIFRoaXMgam9pbnQgaXMgZGVzaWduZWQgZm9yIHZlaGljbGUgc3VzcGVuc2lvbnMuXHJcbiAqICEjemhcclxuICog6L2u5a2Q5YWz6IqC5o+Q5L6b5Lik5Liq57u05bqm55qE6Ieq55Sx5bqm77ya5peL6L2s5ZKM5rK/552A5oyH5a6a5pa55ZCR5LiK5L2N572u55qE56e75Yqo44CCXHJcbiAqIOS9oOWPr+S7pemAmui/h+W8gOWQr+WFs+iKgumprOi+vuadpeS9v+eUqOmprOi+vumpseWKqOWImuS9k+eahOaXi+i9rOOAglxyXG4gKiDova7nu4TlhbPoioLmmK/kuJPpl6jkuLrmnLrliqjovabnsbvlnovorr7orqHnmoTjgIJcclxuICogQGNsYXNzIFdoZWVsSm9pbnRcclxuICogQGV4dGVuZHMgSm9pbnRcclxuICovXHJcbnZhciBXaGVlbEpvaW50ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLldoZWVsSm9pbnQnLFxyXG4gICAgZXh0ZW5kczogY2MuSm9pbnQsXHJcbiAgICBcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3Mvam9pbnQuanMnLFxyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9XaGVlbCcsXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfbWF4TW90b3JUb3JxdWU6IDAsXHJcbiAgICAgICAgX21vdG9yU3BlZWQ6IDAsXHJcbiAgICAgICAgX2VuYWJsZU1vdG9yOiBmYWxzZSxcclxuICAgICAgICBcclxuICAgICAgICBfZnJlcXVlbmN5OiAyLFxyXG4gICAgICAgIF9kYW1waW5nUmF0aW86IDAuNyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBsb2NhbCBqb2ludCBheGlzIHJlbGF0aXZlIHRvIHJpZ2lkYm9keS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5oyH5a6a5Yia5L2T5Y+v5Lul56e75Yqo55qE5pa55ZCR44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMyfSBsb2NhbEF4aXNBXHJcbiAgICAgICAgICogQGRlZmF1bHQgY2MudjIoMSwgMClcclxuICAgICAgICAgKi9cclxuICAgICAgICBsb2NhbEF4aXNBOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnYyKDEsIDApLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5sb2NhbEF4aXNBJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbWF4aXVtIHRvcnF1ZSBjYW4gYmUgYXBwbGllZCB0byByaWdpZGJvZHkgdG8gcmVhcmNoIHRoZSB0YXJnZXQgbW90b3Igc3BlZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOWPr+S7peaWveWKoOWIsOWImuS9k+eahOacgOWkp+aJreefqeOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtYXhNb3RvclRvcnF1ZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBtYXhNb3RvclRvcnF1ZToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5tYXhNb3RvclRvcnF1ZScsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heE1vdG9yVG9ycXVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TW90b3JUb3JxdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldE1heE1vdG9yVG9ycXVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgZXhwZWN0ZWQgbW90b3Igc3BlZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacn+acm+eahOmprOi+vumAn+W6puOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtb3RvclNwZWVkXHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1vdG9yU3BlZWQ6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubW90b3JTcGVlZCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vdG9yU3BlZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3RvclNwZWVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNb3RvclNwZWVkKHZhbHVlICogQU5HTEVfVE9fUEhZU0lDU19BTkdMRSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogRW5hYmxlIGpvaW50IG1vdG9yP1xyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmmK/lkKblvIDlkK/lhbPoioLpqazovr7vvJ9cclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZU1vdG9yXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbmFibGVNb3Rvcjoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5lbmFibGVNb3RvcicsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZU1vdG9yO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlTW90b3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LkVuYWJsZU1vdG9yKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgc3ByaW5nIGZyZXF1ZW5jeS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5by55oCn57O75pWw44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZyZXF1ZW5jeVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBmcmVxdWVuY3k6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZnJlcXVlbmN5JyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZnJlcXVlbmN5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJlcXVlbmN5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRTcHJpbmdGcmVxdWVuY3lIeih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGRhbXBpbmcgcmF0aW8uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmYu+WwvO+8jOihqOekuuWFs+iKguWPmOW9ouWQju+8jOaBouWkjeWIsOWIneWni+eKtuaAgeWPl+WIsOeahOmYu+WKm+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkYW1waW5nUmF0aW9cclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGFtcGluZ1JhdGlvOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLmRhbXBpbmdSYXRpbycsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhbXBpbmdSYXRpbztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhbXBpbmdSYXRpbyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2pvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fam9pbnQuU2V0RGFtcGluZ1JhdGlvKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZUpvaW50RGVmOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZiA9IG5ldyBiMi5XaGVlbEpvaW50RGVmKCk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQSA9IG5ldyBiMi5WZWMyKHRoaXMuYW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZGVmLmxvY2FsQXhpc0EgPSBuZXcgYjIuVmVjMih0aGlzLmxvY2FsQXhpc0EueCwgdGhpcy5sb2NhbEF4aXNBLnkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRlZi5tYXhNb3RvclRvcnF1ZSA9IHRoaXMubWF4TW90b3JUb3JxdWU7XHJcbiAgICAgICAgZGVmLm1vdG9yU3BlZWQgPSB0aGlzLm1vdG9yU3BlZWQgKiBBTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG4gICAgICAgIGRlZi5lbmFibGVNb3RvciA9IHRoaXMuZW5hYmxlTW90b3I7XHJcblxyXG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSB0aGlzLmRhbXBpbmdSYXRpbztcclxuICAgICAgICBkZWYuZnJlcXVlbmN5SHogPSB0aGlzLmZyZXF1ZW5jeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5XaGVlbEpvaW50ID0gbW9kdWxlLmV4cG9ydHMgPSBXaGVlbEpvaW50O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==