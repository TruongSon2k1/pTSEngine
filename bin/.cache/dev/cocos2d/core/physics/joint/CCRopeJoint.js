
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/joint/CCRopeJoint.js';
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
 * A rope joint enforces a maximum distance between two points
 * on two bodies. It has no other effect.
 * Warning: if you attempt to change the maximum length during
 * the simulation you will get some non-physical behavior.
 * !#zh
 * 绳子关节只指定两个刚体间的最大距离，没有其他的效果。
 * 注意：如果你试图动态修改关节的长度，这有可能会得到一些意外的效果。
 * @class RopeJoint
 * @extends Joint
 */


var RopeJoint = cc.Class({
  name: 'cc.RopeJoint',
  "extends": cc.Joint,
  editor: CC_EDITOR && {
    inspector: 'packages://inspector/inspectors/comps/physics/joint.js',
    menu: 'i18n:MAIN_MENU.component.physics/Joint/Rope'
  },
  properties: {
    _maxLength: 1,

    /**
     * !#en
     * The max length.
     * !#zh
     * 最大长度。
     * @property {Number} maxLength
     * @default 1
     */
    maxLength: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.maxLength',
      get: function get() {
        return this._maxLength;
      },
      set: function set(value) {
        this._maxLength = value;

        if (this._joint) {
          this._joint.SetMaxLength(value);
        }
      }
    }
  },
  _createJointDef: function _createJointDef() {
    var def = new b2.RopeJointDef();
    def.localAnchorA = new b2.Vec2(this.anchor.x / PTM_RATIO, this.anchor.y / PTM_RATIO);
    def.localAnchorB = new b2.Vec2(this.connectedAnchor.x / PTM_RATIO, this.connectedAnchor.y / PTM_RATIO);
    def.maxLength = this.maxLength / PTM_RATIO;
    return def;
  }
});
cc.RopeJoint = module.exports = RopeJoint;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGpvaW50XFxDQ1JvcGVKb2ludC5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiUm9wZUpvaW50IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJKb2ludCIsImVkaXRvciIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsIm1lbnUiLCJwcm9wZXJ0aWVzIiwiX21heExlbmd0aCIsIm1heExlbmd0aCIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9qb2ludCIsIlNldE1heExlbmd0aCIsIl9jcmVhdGVKb2ludERlZiIsImRlZiIsImIyIiwiUm9wZUpvaW50RGVmIiwibG9jYWxBbmNob3JBIiwiVmVjMiIsImFuY2hvciIsIngiLCJ5IiwibG9jYWxBbmNob3JCIiwiY29ubmVjdGVkQW5jaG9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlFLFNBQVMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDckJDLEVBQUFBLElBQUksRUFBRSxjQURlO0FBRXJCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGUztBQUlyQkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLFNBQVMsRUFBRSx3REFETTtBQUVqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRlcsR0FKQTtBQVNyQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRSxDQURKOztBQUdSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLG1EQURaO0FBRVBDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLSixVQUFaO0FBQ0gsT0FKTTtBQUtQSyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLTixVQUFMLEdBQWtCTSxLQUFsQjs7QUFDQSxZQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYixlQUFLQSxNQUFMLENBQVlDLFlBQVosQ0FBeUJGLEtBQXpCO0FBQ0g7QUFDSjtBQVZNO0FBWEgsR0FUUztBQW1DckJHLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxZQUFQLEVBQVY7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRyxZQUFKLEdBQW1CLElBQUlGLEVBQUUsQ0FBQ0csSUFBUCxDQUFZLEtBQUtDLE1BQUwsQ0FBWUMsQ0FBWixHQUFjNUIsU0FBMUIsRUFBcUMsS0FBSzJCLE1BQUwsQ0FBWUUsQ0FBWixHQUFjN0IsU0FBbkQsQ0FBbkI7QUFDQXNCLElBQUFBLEdBQUcsQ0FBQ1EsWUFBSixHQUFtQixJQUFJUCxFQUFFLENBQUNHLElBQVAsQ0FBWSxLQUFLSyxlQUFMLENBQXFCSCxDQUFyQixHQUF1QjVCLFNBQW5DLEVBQThDLEtBQUsrQixlQUFMLENBQXFCRixDQUFyQixHQUF1QjdCLFNBQXJFLENBQW5CO0FBQ0FzQixJQUFBQSxHQUFHLENBQUNULFNBQUosR0FBZ0IsS0FBS0EsU0FBTCxHQUFlYixTQUEvQjtBQUVBLFdBQU9zQixHQUFQO0FBQ0g7QUExQ29CLENBQVQsQ0FBaEI7QUE2Q0FuQixFQUFFLENBQUNELFNBQUgsR0FBZThCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9CLFNBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQSByb3BlIGpvaW50IGVuZm9yY2VzIGEgbWF4aW11bSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcclxuICogb24gdHdvIGJvZGllcy4gSXQgaGFzIG5vIG90aGVyIGVmZmVjdC5cclxuICogV2FybmluZzogaWYgeW91IGF0dGVtcHQgdG8gY2hhbmdlIHRoZSBtYXhpbXVtIGxlbmd0aCBkdXJpbmdcclxuICogdGhlIHNpbXVsYXRpb24geW91IHdpbGwgZ2V0IHNvbWUgbm9uLXBoeXNpY2FsIGJlaGF2aW9yLlxyXG4gKiAhI3poXHJcbiAqIOe7s+WtkOWFs+iKguWPquaMh+WumuS4pOS4quWImuS9k+mXtOeahOacgOWkp+i3neemu++8jOayoeacieWFtuS7lueahOaViOaenOOAglxyXG4gKiDms6jmhI/vvJrlpoLmnpzkvaDor5Xlm77liqjmgIHkv67mlLnlhbPoioLnmoTplb/luqbvvIzov5nmnInlj6/og73kvJrlvpfliLDkuIDkupvmhI/lpJbnmoTmlYjmnpzjgIJcclxuICogQGNsYXNzIFJvcGVKb2ludFxyXG4gKiBAZXh0ZW5kcyBKb2ludFxyXG4gKi9cclxudmFyIFJvcGVKb2ludCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Sb3BlSm9pbnQnLFxyXG4gICAgZXh0ZW5kczogY2MuSm9pbnQsXHJcbiAgICBcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3Mvam9pbnQuanMnLFxyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Kb2ludC9Sb3BlJyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9tYXhMZW5ndGg6IDEsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbWF4IGxlbmd0aC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5pyA5aSn6ZW/5bqm44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heExlbmd0aFxyXG4gICAgICAgICAqIEBkZWZhdWx0IDFcclxuICAgICAgICAgKi9cclxuICAgICAgICBtYXhMZW5ndGg6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5waHlzaWNzLnBoeXNpY3NfY29sbGlkZXIubWF4TGVuZ3RoJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGVuZ3RoID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fam9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9qb2ludC5TZXRNYXhMZW5ndGgodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVKb2ludERlZjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWYgPSBuZXcgYjIuUm9wZUpvaW50RGVmKCk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQSA9IG5ldyBiMi5WZWMyKHRoaXMuYW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLmxvY2FsQW5jaG9yQiA9IG5ldyBiMi5WZWMyKHRoaXMuY29ubmVjdGVkQW5jaG9yLngvUFRNX1JBVElPLCB0aGlzLmNvbm5lY3RlZEFuY2hvci55L1BUTV9SQVRJTyk7XHJcbiAgICAgICAgZGVmLm1heExlbmd0aCA9IHRoaXMubWF4TGVuZ3RoL1BUTV9SQVRJTztcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5Sb3BlSm9pbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFJvcGVKb2ludDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=