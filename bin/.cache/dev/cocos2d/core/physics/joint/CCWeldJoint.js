
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCWeldJoint.js';
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
 * A weld joint essentially glues two bodies together. A weld joint may
 * distort somewhat because the island constraint solver is approximate.
 * !#zh
 * 熔接关节相当于将两个刚体粘在了一起。
 * 熔接关节可能会使某些东西失真，因为约束求解器算出的都是近似值。
 * @class WeldJoint
 * @extends Joint
 */


var WeldJoint = cc.Class({
  name: 'cc.WeldJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Weld'
  },
  properties: {
    /**
     * !#en
     * The reference angle.
     * !#zh
     * 相对角度。
     * @property {Number} referenceAngle
     * @default 0
     */
    referenceAngle: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.referenceAngle'
    },
    _frequency: 0,
    _dampingRatio: 0,

    /**
     * !#en
     * The frequency.
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
          this._joint.SetFrequency(value);
        }
      }
    },

    /**
     * !#en
     * The damping ratio.
     * !#zh
     * 阻尼，表示关节变形后，恢复到初始状态受到的阻力。
     * @property {Number} dampingRatio
     * @property 0
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
    var def = new b2.WeldJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.referenceAngle = this.referenceAngle * ANGLE_TO_PHYSICS_ANGLE;
    def.frequencyHz = this.frequency;
    def.dampingRatio = this.dampingRatio;
    return def;
  }
});
cc.WeldJoint = module.exports = WeldJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ1dlbGRKb2ludC5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiQU5HTEVfVE9fUEhZU0lDU19BTkdMRSIsIldlbGRKb2ludCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiSm9pbnQiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJpbnNwZWN0b3IiLCJtZW51IiwicHJvcGVydGllcyIsInJlZmVyZW5jZUFuZ2xlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9mcmVxdWVuY3kiLCJfZGFtcGluZ1JhdGlvIiwiZnJlcXVlbmN5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfam9pbnQiLCJTZXRGcmVxdWVuY3kiLCJkYW1waW5nUmF0aW8iLCJTZXREYW1waW5nUmF0aW8iLCJfY3JlYXRlSm9pbnREZWYiLCJkZWYiLCJiMiIsIldlbGRKb2ludERlZiIsImxvY2FsQW5jaG9yQSIsIlZlYzIiLCJhbmNob3IiLCJ4IiwieSIsImxvY2FsQW5jaG9yQiIsImNvbm5lY3RlZEFuY2hvciIsImZyZXF1ZW5jeUh6IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7O0FBQ0EsSUFBSUUsc0JBQXNCLEdBQUdELE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCQyxzQkFBMUQ7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU0YsRUFBRSxDQUFDRyxLQUZTO0FBSXJCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFLHdEQURNO0FBRWpCQyxJQUFBQSxJQUFJLEVBQUU7QUFGVyxHQUpBO0FBU3JCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLGNBQWMsRUFBRTtBQUNaLGlCQUFTLENBREc7QUFFWkMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFGUCxLQVRSO0FBY1JDLElBQUFBLFVBQVUsRUFBRSxDQWRKO0FBZVJDLElBQUFBLGFBQWEsRUFBRSxDQWZQOztBQWlCUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLFNBQVMsRUFBRTtBQUNQSixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxtREFEWjtBQUVQSSxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0gsVUFBWjtBQUNILE9BSk07QUFLUEksTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS0wsVUFBTCxHQUFrQkssS0FBbEI7O0FBQ0EsWUFBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2IsZUFBS0EsTUFBTCxDQUFZQyxZQUFaLENBQXlCRixLQUF6QjtBQUNIO0FBQ0o7QUFWTSxLQXpCSDs7QUFzQ1I7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRRyxJQUFBQSxZQUFZLEVBQUU7QUFDVlYsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksc0RBRFQ7QUFFVkksTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtGLGFBQVo7QUFDSCxPQUpTO0FBS1ZHLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtKLGFBQUwsR0FBcUJJLEtBQXJCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUcsZUFBWixDQUE0QkosS0FBNUI7QUFDSDtBQUNKO0FBVlM7QUE5Q04sR0FUUztBQXFFckJLLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxZQUFQLEVBQVY7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRyxZQUFKLEdBQW1CLElBQUlGLEVBQUUsQ0FBQ0csSUFBUCxDQUFZLEtBQUtDLE1BQUwsQ0FBWUMsQ0FBWixHQUFjakMsU0FBMUIsRUFBcUMsS0FBS2dDLE1BQUwsQ0FBWUUsQ0FBWixHQUFjbEMsU0FBbkQsQ0FBbkI7QUFDQTJCLElBQUFBLEdBQUcsQ0FBQ1EsWUFBSixHQUFtQixJQUFJUCxFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLSyxlQUFMLENBQXFCSCxDQUFyQixHQUF1QmpDLFNBQW5DLEVBQThDLEtBQUtvQyxlQUFMLENBQXFCRixDQUFyQixHQUF1QmxDLFNBQXJFLENBQW5CO0FBQ0EyQixJQUFBQSxHQUFHLENBQUNkLGNBQUosR0FBcUIsS0FBS0EsY0FBTCxHQUFzQlgsc0JBQTNDO0FBRUF5QixJQUFBQSxHQUFHLENBQUNVLFdBQUosR0FBa0IsS0FBS25CLFNBQXZCO0FBQ0FTLElBQUFBLEdBQUcsQ0FBQ0gsWUFBSixHQUFtQixLQUFLQSxZQUF4QjtBQUVBLFdBQU9HLEdBQVA7QUFDSDtBQS9Fb0IsQ0FBVCxDQUFoQjtBQWtGQXZCLEVBQUUsQ0FBQ0QsU0FBSCxHQUFlbUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEMsU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XHJcbnZhciBBTkdMRV9UT19QSFlTSUNTX0FOR0xFID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5BTkdMRV9UT19QSFlTSUNTX0FOR0xFO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQSB3ZWxkIGpvaW50IGVzc2VudGlhbGx5IGdsdWVzIHR3byBib2RpZXMgdG9nZXRoZXIuIEEgd2VsZCBqb2ludCBtYXlcclxuICogZGlzdG9ydCBzb21ld2hhdCBiZWNhdXNlIHRoZSBpc2xhbmQgY29uc3RyYWludCBzb2x2ZXIgaXMgYXBwcm94aW1hdGUuXHJcbiAqICEjemhcclxuICog54aU5o6l5YWz6IqC55u45b2T5LqO5bCG5Lik5Liq5Yia5L2T57KY5Zyo5LqG5LiA6LW344CCXHJcbiAqIOeGlOaOpeWFs+iKguWPr+iDveS8muS9v+afkOS6m+S4nOilv+Wkseecn++8jOWboOS4uue6puadn+axguino+WZqOeul+WHuueahOmDveaYr+i/keS8vOWAvOOAglxyXG4gKiBAY2xhc3MgV2VsZEpvaW50XHJcbiAqIEBleHRlbmRzIEpvaW50XHJcbiAqL1xyXG52YXIgV2VsZEpvaW50ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLldlbGRKb2ludCcsXHJcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcclxuICAgIFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGh5c2ljcy9qb2ludC5qcycsXHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0pvaW50L1dlbGQnLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSByZWZlcmVuY2UgYW5nbGUuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOebuOWvueinkuW6puOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByZWZlcmVuY2VBbmdsZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICByZWZlcmVuY2VBbmdsZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5yZWZlcmVuY2VBbmdsZScgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfZnJlcXVlbmN5OiAwLFxyXG4gICAgICAgIF9kYW1waW5nUmF0aW86IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgZnJlcXVlbmN5LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlvLnmgKfns7vmlbDjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJlcXVlbmN5XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZyZXF1ZW5jeToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5mcmVxdWVuY3knLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmVxdWVuY3k7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldEZyZXF1ZW5jeSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGRhbXBpbmcgcmF0aW8uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmYu+WwvO+8jOihqOekuuWFs+iKguWPmOW9ouWQju+8jOaBouWkjeWIsOWIneWni+eKtuaAgeWPl+WIsOeahOmYu+WKm+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkYW1waW5nUmF0aW9cclxuICAgICAgICAgKiBAcHJvcGVydHkgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRhbXBpbmdSYXRpbzoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5kYW1waW5nUmF0aW8nLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYW1waW5nUmF0aW87XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYW1waW5nUmF0aW8gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldERhbXBpbmdSYXRpbyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVKb2ludERlZjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuV2VsZEpvaW50RGVmKCk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQSA9IG5ldyBiMi5WZWMyKHRoaXMuYW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLnJlZmVyZW5jZUFuZ2xlID0gdGhpcy5yZWZlcmVuY2VBbmdsZSAqIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU7XHJcblxyXG4gICAgICAgIGRlZi5mcmVxdWVuY3lIeiA9IHRoaXMuZnJlcXVlbmN5O1xyXG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSB0aGlzLmRhbXBpbmdSYXRpbztcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5XZWxkSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFdlbGRKb2ludDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=