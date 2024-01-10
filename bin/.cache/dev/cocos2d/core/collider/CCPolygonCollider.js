
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCPolygonCollider.js';
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

/**
 * !#en Defines a Polygon Collider .
 * !#zh 用来定义多边形碰撞体
 * @class Collider.Polygon
 */
cc.Collider.Polygon = cc.Class({
  properties: {
    threshold: {
      "default": 1,
      serializable: false,
      visible: false
    },
    _offset: cc.v2(0, 0),

    /**
     * !#en Position offset
     * !#zh 位置偏移量
     * @property offset
     * @type {Vec2}
     */
    offset: {
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;
      },
      type: cc.Vec2
    },

    /**
     * !#en Polygon points
     * !#zh 多边形顶点数组
     * @property points
     * @type {Vec2[]}
     */
    points: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.points',
      "default": function _default() {
        return [cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50)];
      },
      type: [cc.Vec2]
    }
  },
  resetPointsByContour: CC_EDITOR && function () {
    var PhysicsUtils = Editor.require('scene://utils/physics');

    PhysicsUtils.resetPoints(this, {
      threshold: this.threshold
    });
  }
});
/**
 * !#en Polygon Collider.
 * !#zh 多边形碰撞组件
 * @class PolygonCollider
 * @extends Collider
 * @uses Collider.Polygon
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var PolygonCollider = cc.Class({
  name: 'cc.PolygonCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Polygon],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Polygon Collider',
    inspector: 'packages://inspector/inspectors/comps/physics/points-base-collider.js'
  }
});
cc.PolygonCollider = module.exports = PolygonCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbGxpZGVyXFxDQ1BvbHlnb25Db2xsaWRlci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNvbGxpZGVyIiwiUG9seWdvbiIsIkNsYXNzIiwicHJvcGVydGllcyIsInRocmVzaG9sZCIsInNlcmlhbGl6YWJsZSIsInZpc2libGUiLCJfb2Zmc2V0IiwidjIiLCJvZmZzZXQiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsInR5cGUiLCJWZWMyIiwicG9pbnRzIiwidG9vbHRpcCIsIkNDX0RFViIsInJlc2V0UG9pbnRzQnlDb250b3VyIiwiQ0NfRURJVE9SIiwiUGh5c2ljc1V0aWxzIiwiRWRpdG9yIiwicmVxdWlyZSIsInJlc2V0UG9pbnRzIiwiUG9seWdvbkNvbGxpZGVyIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIm1lbnUiLCJpbnNwZWN0b3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsT0FBWixHQUFzQkYsRUFBRSxDQUFDRyxLQUFILENBQVM7QUFDM0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxDQURGO0FBRVBDLE1BQUFBLFlBQVksRUFBRSxLQUZQO0FBR1BDLE1BQUFBLE9BQU8sRUFBRTtBQUhGLEtBREg7QUFPUkMsSUFBQUEsT0FBTyxFQUFFUixFQUFFLENBQUNTLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQVBEOztBQVNSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtILE9BQVo7QUFDSCxPQUhHO0FBSUpJLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtMLE9BQUwsR0FBZUssS0FBZjtBQUNILE9BTkc7QUFPSkMsTUFBQUEsSUFBSSxFQUFFZCxFQUFFLENBQUNlO0FBUEwsS0FmQTs7QUF5QlI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLE1BQU0sRUFBRTtBQUNKQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSxnREFEZjtBQUVKLGlCQUFTLG9CQUFZO0FBQ2hCLGVBQU8sQ0FBQ2xCLEVBQUUsQ0FBQ1MsRUFBSCxDQUFNLENBQUMsRUFBUCxFQUFVLENBQUMsRUFBWCxDQUFELEVBQWlCVCxFQUFFLENBQUNTLEVBQUgsQ0FBTSxFQUFOLEVBQVUsQ0FBQyxFQUFYLENBQWpCLEVBQWlDVCxFQUFFLENBQUNTLEVBQUgsQ0FBTSxFQUFOLEVBQVMsRUFBVCxDQUFqQyxFQUErQ1QsRUFBRSxDQUFDUyxFQUFILENBQU0sQ0FBQyxFQUFQLEVBQVUsRUFBVixDQUEvQyxDQUFQO0FBQ0osT0FKRztBQUtKSyxNQUFBQSxJQUFJLEVBQUUsQ0FBQ2QsRUFBRSxDQUFDZSxJQUFKO0FBTEY7QUEvQkEsR0FEZTtBQXlDM0JJLEVBQUFBLG9CQUFvQixFQUFFQyxTQUFTLElBQUksWUFBWTtBQUMzQyxRQUFJQyxZQUFZLEdBQUdDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLHVCQUFmLENBQW5COztBQUNBRixJQUFBQSxZQUFZLENBQUNHLFdBQWIsQ0FBeUIsSUFBekIsRUFBK0I7QUFBQ25CLE1BQUFBLFNBQVMsRUFBRSxLQUFLQTtBQUFqQixLQUEvQjtBQUNIO0FBNUMwQixDQUFULENBQXRCO0FBZ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlvQixlQUFlLEdBQUd6QixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUMzQnVCLEVBQUFBLElBQUksRUFBRSxvQkFEcUI7QUFFM0IsYUFBUzFCLEVBQUUsQ0FBQ0MsUUFGZTtBQUczQjBCLEVBQUFBLE1BQU0sRUFBRSxDQUFDM0IsRUFBRSxDQUFDQyxRQUFILENBQVlDLE9BQWIsQ0FIbUI7QUFLM0IwQixFQUFBQSxNQUFNLEVBQUVSLFNBQVMsSUFBSTtBQUNqQlMsSUFBQUEsSUFBSSxFQUFFLG9EQURXO0FBRWpCQyxJQUFBQSxTQUFTLEVBQUU7QUFGTTtBQUxNLENBQVQsQ0FBdEI7QUFXQTlCLEVBQUUsQ0FBQ3lCLGVBQUgsR0FBcUJNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlAsZUFBdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBEZWZpbmVzIGEgUG9seWdvbiBDb2xsaWRlciAuXHJcbiAqICEjemgg55So5p2l5a6a5LmJ5aSa6L655b2i56Kw5pKe5L2TXHJcbiAqIEBjbGFzcyBDb2xsaWRlci5Qb2x5Z29uXHJcbiAqL1xyXG5jYy5Db2xsaWRlci5Qb2x5Z29uID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHRocmVzaG9sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9vZmZzZXQ6IGNjLnYyKDAsIDApLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFBvc2l0aW9uIG9mZnNldFxyXG4gICAgICAgICAqICEjemgg5L2N572u5YGP56e76YePXHJcbiAgICAgICAgICogQHByb3BlcnR5IG9mZnNldFxyXG4gICAgICAgICAqIEB0eXBlIHtWZWMyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9mZnNldDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gUG9seWdvbiBwb2ludHNcclxuICAgICAgICAgKiAhI3poIOWkmui+ueW9oumhtueCueaVsOe7hFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwb2ludHNcclxuICAgICAgICAgKiBAdHlwZSB7VmVjMltdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBvaW50czoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5wb2ludHMnLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIFtjYy52MigtNTAsLTUwKSwgY2MudjIoNTAsIC01MCksIGNjLnYyKDUwLDUwKSwgY2MudjIoLTUwLDUwKV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5WZWMyXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRQb2ludHNCeUNvbnRvdXI6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIFBoeXNpY3NVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL3BoeXNpY3MnKTtcclxuICAgICAgICBQaHlzaWNzVXRpbHMucmVzZXRQb2ludHModGhpcywge3RocmVzaG9sZDogdGhpcy50aHJlc2hvbGR9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gUG9seWdvbiBDb2xsaWRlci5cclxuICogISN6aCDlpJrovrnlvaLnorDmkp7nu4Tku7ZcclxuICogQGNsYXNzIFBvbHlnb25Db2xsaWRlclxyXG4gKiBAZXh0ZW5kcyBDb2xsaWRlclxyXG4gKiBAdXNlcyBDb2xsaWRlci5Qb2x5Z29uXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBDb2xsaWRlciBpbmZvIGluIHdvcmxkIGNvb3JkaW5hdGUuXHJcbiAqICEjemhcclxuICog56Kw5pKe5L2T55qE5LiW55WM5Z2Q5qCH57O75LiL55qE5L+h5oGv44CCXHJcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJJbmZvfSB3b3JsZFxyXG4gKi9cclxudmFyIFBvbHlnb25Db2xsaWRlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Qb2x5Z29uQ29sbGlkZXInLFxyXG4gICAgZXh0ZW5kczogY2MuQ29sbGlkZXIsXHJcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5Qb2x5Z29uXSxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5jb2xsaWRlci9Qb2x5Z29uIENvbGxpZGVyJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3MvcG9pbnRzLWJhc2UtY29sbGlkZXIuanMnLFxyXG4gICAgfSxcclxufSk7XHJcblxyXG5jYy5Qb2x5Z29uQ29sbGlkZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFBvbHlnb25Db2xsaWRlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=