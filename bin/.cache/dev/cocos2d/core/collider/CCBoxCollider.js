
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCBoxCollider.js';
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
 * !#en Defines a Box Collider .
 * !#zh 用来定义包围盒碰撞体
 * @class Collider.Box
 */
cc.Collider.Box = cc.Class({
  properties: {
    _offset: cc.v2(0, 0),
    _size: cc.size(100, 100),

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
     * !#en Box size
     * !#zh 包围盒大小
     * @property size
     * @type {Size}
     */
    size: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.size',
      get: function get() {
        return this._size;
      },
      set: function set(value) {
        this._size.width = value.width < 0 ? 0 : value.width;
        this._size.height = value.height < 0 ? 0 : value.height;
      },
      type: cc.Size
    }
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      var size = this.node.getContentSize();

      if (size.width !== 0 && size.height !== 0) {
        this.size = cc.size(size);
        this.offset.x = (0.5 - this.node.anchorX) * size.width;
        this.offset.y = (0.5 - this.node.anchorY) * size.height;
      }
    }
  }
});
/**
 * !#en Box Collider.
 * !#zh 包围盒碰撞组件
 * @class BoxCollider
 * @extends Collider
 * @uses Collider.Box
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var BoxCollider = cc.Class({
  name: 'cc.BoxCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Box],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Box Collider'
  }
});
cc.BoxCollider = module.exports = BoxCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbGxpZGVyXFxDQ0JveENvbGxpZGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ29sbGlkZXIiLCJCb3giLCJDbGFzcyIsInByb3BlcnRpZXMiLCJfb2Zmc2V0IiwidjIiLCJfc2l6ZSIsInNpemUiLCJvZmZzZXQiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJ0eXBlIiwiVmVjMiIsIndpZHRoIiwiaGVpZ2h0IiwiU2l6ZSIsInJlc2V0SW5FZGl0b3IiLCJDQ19FRElUT1IiLCJkaWRSZXNldFRvRGVmYXVsdCIsIm5vZGUiLCJnZXRDb250ZW50U2l6ZSIsIngiLCJhbmNob3JYIiwieSIsImFuY2hvclkiLCJCb3hDb2xsaWRlciIsIm5hbWUiLCJtaXhpbnMiLCJlZGl0b3IiLCJtZW51IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxRQUFILENBQVlDLEdBQVosR0FBa0JGLEVBQUUsQ0FBQ0csS0FBSCxDQUFTO0FBQ3ZCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsT0FBTyxFQUFFTCxFQUFFLENBQUNNLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxDQUREO0FBRVJDLElBQUFBLEtBQUssRUFBRVAsRUFBRSxDQUFDUSxJQUFILENBQVEsR0FBUixFQUFhLEdBQWIsQ0FGQzs7QUFJUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLUCxPQUFaO0FBQ0gsT0FKRztBQUtKUSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLVCxPQUFMLEdBQWVTLEtBQWY7QUFDSCxPQVBHO0FBUUpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0I7QUFSTCxLQVZBOztBQXFCUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUVIsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZFLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhDQURqQjtBQUVGQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0wsS0FBWjtBQUNILE9BSkM7QUFLRk0sTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS1AsS0FBTCxDQUFXVSxLQUFYLEdBQW1CSCxLQUFLLENBQUNHLEtBQU4sR0FBYyxDQUFkLEdBQWtCLENBQWxCLEdBQXNCSCxLQUFLLENBQUNHLEtBQS9DO0FBQ0EsYUFBS1YsS0FBTCxDQUFXVyxNQUFYLEdBQW9CSixLQUFLLENBQUNJLE1BQU4sR0FBZSxDQUFmLEdBQW1CLENBQW5CLEdBQXVCSixLQUFLLENBQUNJLE1BQWpEO0FBQ0gsT0FSQztBQVNGSCxNQUFBQSxJQUFJLEVBQUVmLEVBQUUsQ0FBQ21CO0FBVFA7QUEzQkUsR0FEVztBQXlDdkJDLEVBQUFBLGFBQWEsRUFBRUMsU0FBUyxJQUFJLFVBQVVDLGlCQUFWLEVBQTZCO0FBQ3JELFFBQUlBLGlCQUFKLEVBQXVCO0FBQ25CLFVBQUlkLElBQUksR0FBRyxLQUFLZSxJQUFMLENBQVVDLGNBQVYsRUFBWDs7QUFDQSxVQUFJaEIsSUFBSSxDQUFDUyxLQUFMLEtBQWUsQ0FBZixJQUFvQlQsSUFBSSxDQUFDVSxNQUFMLEtBQWdCLENBQXhDLEVBQTJDO0FBQ3ZDLGFBQUtWLElBQUwsR0FBWVIsRUFBRSxDQUFDUSxJQUFILENBQVNBLElBQVQsQ0FBWjtBQUNBLGFBQUtDLE1BQUwsQ0FBWWdCLENBQVosR0FBZ0IsQ0FBQyxNQUFNLEtBQUtGLElBQUwsQ0FBVUcsT0FBakIsSUFBNEJsQixJQUFJLENBQUNTLEtBQWpEO0FBQ0EsYUFBS1IsTUFBTCxDQUFZa0IsQ0FBWixHQUFnQixDQUFDLE1BQU0sS0FBS0osSUFBTCxDQUFVSyxPQUFqQixJQUE0QnBCLElBQUksQ0FBQ1UsTUFBakQ7QUFDSDtBQUNKO0FBQ0o7QUFsRHNCLENBQVQsQ0FBbEI7QUFxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSVcsV0FBVyxHQUFHN0IsRUFBRSxDQUFDRyxLQUFILENBQVM7QUFDdkIyQixFQUFBQSxJQUFJLEVBQUUsZ0JBRGlCO0FBRXZCLGFBQVM5QixFQUFFLENBQUNDLFFBRlc7QUFHdkI4QixFQUFBQSxNQUFNLEVBQUUsQ0FBQy9CLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxHQUFiLENBSGU7QUFLdkI4QixFQUFBQSxNQUFNLEVBQUVYLFNBQVMsSUFBSTtBQUNqQlksSUFBQUEsSUFBSSxFQUFFO0FBRFc7QUFMRSxDQUFULENBQWxCO0FBVUFqQyxFQUFFLENBQUM2QixXQUFILEdBQWlCSyxNQUFNLENBQUNDLE9BQVAsR0FBaUJOLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiAhI2VuIERlZmluZXMgYSBCb3ggQ29sbGlkZXIgLlxyXG4gKiAhI3poIOeUqOadpeWumuS5ieWMheWbtOebkueisOaSnuS9k1xyXG4gKiBAY2xhc3MgQ29sbGlkZXIuQm94XHJcbiAqL1xyXG5jYy5Db2xsaWRlci5Cb3ggPSBjYy5DbGFzcyh7XHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX29mZnNldDogY2MudjIoMCwgMCksXHJcbiAgICAgICAgX3NpemU6IGNjLnNpemUoMTAwLCAxMDApLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFBvc2l0aW9uIG9mZnNldFxyXG4gICAgICAgICAqICEjemgg5L2N572u5YGP56e76YePXHJcbiAgICAgICAgICogQHByb3BlcnR5IG9mZnNldFxyXG4gICAgICAgICAqIEB0eXBlIHtWZWMyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9mZnNldDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5vZmZzZXQnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogY2MuVmVjMlxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQm94IHNpemVcclxuICAgICAgICAgKiAhI3poIOWMheWbtOebkuWkp+Wwj1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzaXplXHJcbiAgICAgICAgICogQHR5cGUge1NpemV9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2l6ZToge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5zaXplJywgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NpemUud2lkdGggPSB2YWx1ZS53aWR0aCA8IDAgPyAwIDogdmFsdWUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplLmhlaWdodCA9IHZhbHVlLmhlaWdodCA8IDAgPyAwIDogdmFsdWUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TaXplXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZXNldEluRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGRpZFJlc2V0VG9EZWZhdWx0KSB7XHJcbiAgICAgICAgaWYgKGRpZFJlc2V0VG9EZWZhdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgICAgIGlmIChzaXplLndpZHRoICE9PSAwICYmIHNpemUuaGVpZ2h0ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBjYy5zaXplKCBzaXplICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldC54ID0gKDAuNSAtIHRoaXMubm9kZS5hbmNob3JYKSAqIHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9mZnNldC55ID0gKDAuNSAtIHRoaXMubm9kZS5hbmNob3JZKSAqIHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEJveCBDb2xsaWRlci5cclxuICogISN6aCDljIXlm7Tnm5LnorDmkp7nu4Tku7ZcclxuICogQGNsYXNzIEJveENvbGxpZGVyXHJcbiAqIEBleHRlbmRzIENvbGxpZGVyXHJcbiAqIEB1c2VzIENvbGxpZGVyLkJveFxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ29sbGlkZXIgaW5mbyBpbiB3b3JsZCBjb29yZGluYXRlLlxyXG4gKiAhI3poXHJcbiAqIOeisOaSnuS9k+eahOS4lueVjOWdkOagh+ezu+S4i+eahOS/oeaBr+OAglxyXG4gKiBAcHJvcGVydHkge0NvbGxpZGVySW5mb30gd29ybGRcclxuICovXHJcbnZhciBCb3hDb2xsaWRlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Cb3hDb2xsaWRlcicsXHJcbiAgICBleHRlbmRzOiBjYy5Db2xsaWRlcixcclxuICAgIG1peGluczogW2NjLkNvbGxpZGVyLkJveF0sXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQuY29sbGlkZXIvQm94IENvbGxpZGVyJyxcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5Cb3hDb2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gQm94Q29sbGlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9