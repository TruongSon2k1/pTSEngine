
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCDistanceJoint.js';
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
 * A distance joint constrains two points on two bodies
 * to remain at a fixed distance from each other. You can view
 * this as a massless, rigid rod.
 * !#zh
 * 距离关节通过一个固定的长度来约束关节链接的两个刚体。你可以将它想象成一个无质量，坚固的木棍。
 * @class DistanceJoint
 * @extends Joint
 */


var DistanceJoint = cc.Class({
  name: 'cc.DistanceJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Distance',
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js'
  },
  properties: {
    _distance: 1,
    _frequency: 0,
    _dampingRatio: 0,

    /**
     * !#en
     * The distance separating the two ends of the joint.
     * !#zh
     * 关节两端的距离
     * @property {Number} distance
     * @default 1
     */
    distance: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.distance',
      get: function get() {
        return this._distance;
      },
      set: function set(value) {
        this._distance = value;

        if (this._joint) {
          this._joint.SetLength(value);
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
    var def = new b2.DistanceJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.length = this.distance / PTM_RATIO;
    def.dampingRatio = this.dampingRatio;
    def.frequencyHz = this.frequency;
    return def;
  }
});
cc.DistanceJoint = module.exports = DistanceJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ0Rpc3RhbmNlSm9pbnQuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIkRpc3RhbmNlSm9pbnQiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkpvaW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImluc3BlY3RvciIsInByb3BlcnRpZXMiLCJfZGlzdGFuY2UiLCJfZnJlcXVlbmN5IiwiX2RhbXBpbmdSYXRpbyIsImRpc3RhbmNlIiwidG9vbHRpcCIsIkNDX0RFViIsImdldCIsInNldCIsInZhbHVlIiwiX2pvaW50IiwiU2V0TGVuZ3RoIiwiZnJlcXVlbmN5IiwiU2V0RnJlcXVlbmN5IiwiZGFtcGluZ1JhdGlvIiwiU2V0RGFtcGluZ1JhdGlvIiwiX2NyZWF0ZUpvaW50RGVmIiwiZGVmIiwiYjIiLCJEaXN0YW5jZUpvaW50RGVmIiwibG9jYWxBbmNob3JBIiwiVmVjMiIsImFuY2hvciIsIngiLCJ5IiwibG9jYWxBbmNob3JCIiwiY29ubmVjdGVkQW5jaG9yIiwibGVuZ3RoIiwiZnJlcXVlbmN5SHoiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJRSxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3pCQyxFQUFBQSxJQUFJLEVBQUUsa0JBRG1CO0FBRXpCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGYTtBQUl6QkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSxpREFEVztBQUVqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRk0sR0FKSTtBQVN6QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBRSxDQURIO0FBRVJDLElBQUFBLFVBQVUsRUFBRSxDQUZKO0FBR1JDLElBQUFBLGFBQWEsRUFBRSxDQUhQOztBQUtSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsUUFBUSxFQUFFO0FBQ05DLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGtEQURiO0FBRU5DLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixTQUFaO0FBQ0gsT0FKSztBQUtOTyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUixTQUFMLEdBQWlCUSxLQUFqQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlDLFNBQVosQ0FBc0JGLEtBQXRCO0FBQ0g7QUFDSjtBQVZLLEtBYkY7O0FBMEJSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUcsSUFBQUEsU0FBUyxFQUFFO0FBQ1BQLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG1EQURaO0FBRVBDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTCxVQUFaO0FBQ0gsT0FKTTtBQUtQTSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUCxVQUFMLEdBQWtCTyxLQUFsQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlHLFlBQVosQ0FBeUJKLEtBQXpCO0FBQ0g7QUFDSjtBQVZNLEtBbENIOztBQStDUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRSyxJQUFBQSxZQUFZLEVBQUU7QUFDVlQsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksc0RBRFQ7QUFFVkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtKLGFBQVo7QUFDSCxPQUpTO0FBS1ZLLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtOLGFBQUwsR0FBcUJNLEtBQXJCOztBQUNBLFlBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNiLGVBQUtBLE1BQUwsQ0FBWUssZUFBWixDQUE0Qk4sS0FBNUI7QUFDSDtBQUNKO0FBVlM7QUF0RE4sR0FUYTtBQTZFekJPLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxnQkFBUCxFQUFWO0FBQ0FGLElBQUFBLEdBQUcsQ0FBQ0csWUFBSixHQUFtQixJQUFJRixFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLENBQVosR0FBY2xDLFNBQTFCLEVBQXFDLEtBQUtpQyxNQUFMLENBQVlFLENBQVosR0FBY25DLFNBQW5ELENBQW5CO0FBQ0E0QixJQUFBQSxHQUFHLENBQUNRLFlBQUosR0FBbUIsSUFBSVAsRUFBRSxDQUFDRyxJQUFQLENBQVksS0FBS0ssZUFBTCxDQUFxQkgsQ0FBckIsR0FBdUJsQyxTQUFuQyxFQUE4QyxLQUFLcUMsZUFBTCxDQUFxQkYsQ0FBckIsR0FBdUJuQyxTQUFyRSxDQUFuQjtBQUNBNEIsSUFBQUEsR0FBRyxDQUFDVSxNQUFKLEdBQWEsS0FBS3ZCLFFBQUwsR0FBY2YsU0FBM0I7QUFDQTRCLElBQUFBLEdBQUcsQ0FBQ0gsWUFBSixHQUFtQixLQUFLQSxZQUF4QjtBQUNBRyxJQUFBQSxHQUFHLENBQUNXLFdBQUosR0FBa0IsS0FBS2hCLFNBQXZCO0FBRUEsV0FBT0ssR0FBUDtBQUNIO0FBdEZ3QixDQUFULENBQXBCO0FBeUZBekIsRUFBRSxDQUFDRCxhQUFILEdBQW1Cc0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkMsYUFBcEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBIGRpc3RhbmNlIGpvaW50IGNvbnN0cmFpbnMgdHdvIHBvaW50cyBvbiB0d28gYm9kaWVzXHJcbiAqIHRvIHJlbWFpbiBhdCBhIGZpeGVkIGRpc3RhbmNlIGZyb20gZWFjaCBvdGhlci4gWW91IGNhbiB2aWV3XHJcbiAqIHRoaXMgYXMgYSBtYXNzbGVzcywgcmlnaWQgcm9kLlxyXG4gKiAhI3poXHJcbiAqIOi3neemu+WFs+iKgumAmui/h+S4gOS4quWbuuWumueahOmVv+W6puadpee6puadn+WFs+iKgumTvuaOpeeahOS4pOS4quWImuS9k+OAguS9oOWPr+S7peWwhuWug+aDs+ixoeaIkOS4gOS4quaXoOi0qOmHj++8jOWdmuWbuueahOacqOajjeOAglxyXG4gKiBAY2xhc3MgRGlzdGFuY2VKb2ludFxyXG4gKiBAZXh0ZW5kcyBKb2ludFxyXG4gKi9cclxudmFyIERpc3RhbmNlSm9pbnQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuRGlzdGFuY2VKb2ludCcsXHJcbiAgICBleHRlbmRzOiBjYy5Kb2ludCxcclxuICAgIFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9EaXN0YW5jZScsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL2pvaW50LmpzJyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9kaXN0YW5jZTogMSxcclxuICAgICAgICBfZnJlcXVlbmN5OiAwLFxyXG4gICAgICAgIF9kYW1waW5nUmF0aW86IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgZGlzdGFuY2Ugc2VwYXJhdGluZyB0aGUgdHdvIGVuZHMgb2YgdGhlIGpvaW50LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlhbPoioLkuKTnq6/nmoTot53nprtcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGlzdGFuY2VcclxuICAgICAgICAgKiBAZGVmYXVsdCAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGlzdGFuY2U6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGlzdGFuY2UnLCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXN0YW5jZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3RhbmNlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRMZW5ndGgodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBzcHJpbmcgZnJlcXVlbmN5LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlvLnmgKfns7vmlbDjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZnJlcXVlbmN5XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZyZXF1ZW5jeToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5mcmVxdWVuY3knLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmVxdWVuY3k7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmVxdWVuY3kgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2pvaW50LlNldEZyZXF1ZW5jeSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGRhbXBpbmcgcmF0aW8uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOmYu+WwvO+8jOihqOekuuWFs+iKguWPmOW9ouWQju+8jOaBouWkjeWIsOWIneWni+eKtuaAgeWPl+WIsOeahOmYu+WKm+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkYW1waW5nUmF0aW9cclxuICAgICAgICAgKi9cclxuICAgICAgICBkYW1waW5nUmF0aW86IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIuZGFtcGluZ1JhdGlvJywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGFtcGluZ1JhdGlvO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGFtcGluZ1JhdGlvID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXREYW1waW5nUmF0aW8odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlSm9pbnREZWY6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZGVmID0gbmV3IGIyLkRpc3RhbmNlSm9pbnREZWYoKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JBID0gbmV3IGIyLlZlYzIodGhpcy5hbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuYW5jaG9yLnkvUFRNX1JBVElPKTtcclxuICAgICAgICBkZWYubG9jYWxBbmNob3JCID0gbmV3IGIyLlZlYzIodGhpcy5jb25uZWN0ZWRBbmNob3IueC9QVE1fUkFUSU8sIHRoaXMuY29ubmVjdGVkQW5jaG9yLnkvUFRNX1JBVElPKTtcclxuICAgICAgICBkZWYubGVuZ3RoID0gdGhpcy5kaXN0YW5jZS9QVE1fUkFUSU87XHJcbiAgICAgICAgZGVmLmRhbXBpbmdSYXRpbyA9IHRoaXMuZGFtcGluZ1JhdGlvO1xyXG4gICAgICAgIGRlZi5mcmVxdWVuY3lIeiA9IHRoaXMuZnJlcXVlbmN5O1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLkRpc3RhbmNlSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IERpc3RhbmNlSm9pbnQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9