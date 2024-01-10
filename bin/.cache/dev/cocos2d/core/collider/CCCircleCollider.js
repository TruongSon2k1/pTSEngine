
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCCircleCollider.js';
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
 * !#en Defines a Circle Collider .
 * !#zh 用来定义圆形碰撞体
 * @class Collider.Circle
 */
cc.Collider.Circle = cc.Class({
  properties: {
    _offset: cc.v2(0, 0),
    _radius: 50,

    /**
     * !#en Position offset
     * !#zh 位置偏移量
     * @property offset
     * @type {Vec2}
     */
    offset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.offset',
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;
      },
      type: cc.Vec2
    },

    /**
     * !#en Circle radius
     * !#zh 圆形半径
     * @property radius
     * @type {Number}
     */
    radius: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.radius',
      get: function get() {
        return this._radius;
      },
      set: function set(value) {
        this._radius = value < 0 ? 0 : value;
      }
    }
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      var size = this.node.getContentSize();
      var radius = Math.max(size.width, size.height);

      if (radius !== 0) {
        this.radius = radius;
      }
    }
  }
});
/**
 * !#en Circle Collider.
 * !#zh 圆形碰撞组件
 * @class CircleCollider
 * @extends Collider
 * @uses Collider.Circle
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var CircleCollider = cc.Class({
  name: 'cc.CircleCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Circle],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Circle Collider'
  }
});
cc.CircleCollider = module.exports = CircleCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbGxpZGVyXFxDQ0NpcmNsZUNvbGxpZGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ29sbGlkZXIiLCJDaXJjbGUiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJfb2Zmc2V0IiwidjIiLCJfcmFkaXVzIiwib2Zmc2V0IiwidG9vbHRpcCIsIkNDX0RFViIsImdldCIsInNldCIsInZhbHVlIiwidHlwZSIsIlZlYzIiLCJyYWRpdXMiLCJyZXNldEluRWRpdG9yIiwiQ0NfRURJVE9SIiwiZGlkUmVzZXRUb0RlZmF1bHQiLCJzaXplIiwibm9kZSIsImdldENvbnRlbnRTaXplIiwiTWF0aCIsIm1heCIsIndpZHRoIiwiaGVpZ2h0IiwiQ2lyY2xlQ29sbGlkZXIiLCJuYW1lIiwibWl4aW5zIiwiZWRpdG9yIiwibWVudSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxNQUFaLEdBQXFCRixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUMxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUwsRUFBRSxDQUFDTSxFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsQ0FERDtBQUVSQyxJQUFBQSxPQUFPLEVBQUUsRUFGRDs7QUFJUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLTixPQUFaO0FBQ0gsT0FKRztBQUtKTyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLUixPQUFMLEdBQWVRLEtBQWY7QUFDSCxPQVBHO0FBUUpDLE1BQUFBLElBQUksRUFBRWQsRUFBRSxDQUFDZTtBQVJMLEtBVkE7O0FBcUJSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxNQUFNLEVBQUU7QUFDSlAsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksZ0RBRGY7QUFFSkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtKLE9BQVo7QUFDSCxPQUpHO0FBS0pLLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtOLE9BQUwsR0FBZU0sS0FBSyxHQUFHLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxLQUEvQjtBQUNIO0FBUEc7QUEzQkEsR0FEYztBQXVDMUJJLEVBQUFBLGFBQWEsRUFBRUMsU0FBUyxJQUFJLFVBQVVDLGlCQUFWLEVBQTZCO0FBQ3JELFFBQUlBLGlCQUFKLEVBQXVCO0FBQ25CLFVBQUlDLElBQUksR0FBRyxLQUFLQyxJQUFMLENBQVVDLGNBQVYsRUFBWDtBQUNBLFVBQUlOLE1BQU0sR0FBR08sSUFBSSxDQUFDQyxHQUFMLENBQVNKLElBQUksQ0FBQ0ssS0FBZCxFQUFxQkwsSUFBSSxDQUFDTSxNQUExQixDQUFiOztBQUNBLFVBQUlWLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2QsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7QUFDSjtBQUNKO0FBL0N5QixDQUFULENBQXJCO0FBa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlXLGNBQWMsR0FBRzNCLEVBQUUsQ0FBQ0csS0FBSCxDQUFTO0FBQzFCeUIsRUFBQUEsSUFBSSxFQUFFLG1CQURvQjtBQUUxQixhQUFTNUIsRUFBRSxDQUFDQyxRQUZjO0FBRzFCNEIsRUFBQUEsTUFBTSxFQUFFLENBQUM3QixFQUFFLENBQUNDLFFBQUgsQ0FBWUMsTUFBYixDQUhrQjtBQUsxQjRCLEVBQUFBLE1BQU0sRUFBRVosU0FBUyxJQUFJO0FBQ2pCYSxJQUFBQSxJQUFJLEVBQUU7QUFEVztBQUxLLENBQVQsQ0FBckI7QUFVQS9CLEVBQUUsQ0FBQzJCLGNBQUgsR0FBb0JLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQk4sY0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBEZWZpbmVzIGEgQ2lyY2xlIENvbGxpZGVyIC5cclxuICogISN6aCDnlKjmnaXlrprkuYnlnIblvaLnorDmkp7kvZNcclxuICogQGNsYXNzIENvbGxpZGVyLkNpcmNsZVxyXG4gKi9cclxuY2MuQ29sbGlkZXIuQ2lyY2xlID0gY2MuQ2xhc3Moe1xyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9vZmZzZXQ6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgIF9yYWRpdXM6IDUwLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFBvc2l0aW9uIG9mZnNldFxyXG4gICAgICAgICAqICEjemgg5L2N572u5YGP56e76YePXHJcbiAgICAgICAgICogQHByb3BlcnR5IG9mZnNldFxyXG4gICAgICAgICAqIEB0eXBlIHtWZWMyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9mZnNldDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5vZmZzZXQnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQ2lyY2xlIHJhZGl1c1xyXG4gICAgICAgICAqICEjemgg5ZyG5b2i5Y2K5b6EXHJcbiAgICAgICAgICogQHByb3BlcnR5IHJhZGl1c1xyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmFkaXVzOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnJhZGl1cycsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlIDwgMCA/IDAgOiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRJbkVkaXRvcjogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChkaWRSZXNldFRvRGVmYXVsdCkge1xyXG4gICAgICAgIGlmIChkaWRSZXNldFRvRGVmYXVsdCkge1xyXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICB2YXIgcmFkaXVzID0gTWF0aC5tYXgoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAocmFkaXVzICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDaXJjbGUgQ29sbGlkZXIuXHJcbiAqICEjemgg5ZyG5b2i56Kw5pKe57uE5Lu2XHJcbiAqIEBjbGFzcyBDaXJjbGVDb2xsaWRlclxyXG4gKiBAZXh0ZW5kcyBDb2xsaWRlclxyXG4gKiBAdXNlcyBDb2xsaWRlci5DaXJjbGVcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENvbGxpZGVyIGluZm8gaW4gd29ybGQgY29vcmRpbmF0ZS5cclxuICogISN6aFxyXG4gKiDnorDmkp7kvZPnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTkv6Hmga/jgIJcclxuICogQHByb3BlcnR5IHtDb2xsaWRlckluZm99IHdvcmxkXHJcbiAqL1xyXG52YXIgQ2lyY2xlQ29sbGlkZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQ2lyY2xlQ29sbGlkZXInLFxyXG4gICAgZXh0ZW5kczogY2MuQ29sbGlkZXIsXHJcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5DaXJjbGVdLFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LmNvbGxpZGVyL0NpcmNsZSBDb2xsaWRlcidcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuQ2lyY2xlQ29sbGlkZXIgPSBtb2R1bGUuZXhwb3J0cyA9IENpcmNsZUNvbGxpZGVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==