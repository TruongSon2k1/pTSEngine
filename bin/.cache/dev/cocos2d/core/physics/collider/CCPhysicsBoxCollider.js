
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsBoxCollider.js';
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
 * @class PhysicsBoxCollider
 * @extends PhysicsCollider
 * @uses Collider.Box
 */


var PhysicsBoxCollider = cc.Class({
  name: 'cc.PhysicsBoxCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Box],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Box',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var scaleX = Math.abs(scale.x);
    var scaleY = Math.abs(scale.y);
    var width = this.size.width / 2 / PTM_RATIO * scaleX;
    var height = this.size.height / 2 / PTM_RATIO * scaleY;
    var offsetX = this.offset.x / PTM_RATIO * scaleX;
    var offsetY = this.offset.y / PTM_RATIO * scaleY;
    var shape = new b2.PolygonShape();
    shape.SetAsBox(width, height, new b2.Vec2(offsetX, offsetY), 0);
    return shape;
  }
});
cc.PhysicsBoxCollider = module.exports = PhysicsBoxCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGNvbGxpZGVyXFxDQ1BoeXNpY3NCb3hDb2xsaWRlci5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiUGh5c2ljc0JveENvbGxpZGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJQaHlzaWNzQ29sbGlkZXIiLCJtaXhpbnMiLCJDb2xsaWRlciIsIkJveCIsImVkaXRvciIsIm1lbnUiLCJDQ19FRElUT1IiLCJyZXF1aXJlQ29tcG9uZW50IiwiUmlnaWRCb2R5IiwiX2NyZWF0ZVNoYXBlIiwic2NhbGUiLCJzY2FsZVgiLCJNYXRoIiwiYWJzIiwieCIsInNjYWxlWSIsInkiLCJ3aWR0aCIsInNpemUiLCJoZWlnaHQiLCJvZmZzZXRYIiwib2Zmc2V0Iiwib2Zmc2V0WSIsInNoYXBlIiwiYjIiLCJQb2x5Z29uU2hhcGUiLCJTZXRBc0JveCIsIlZlYzIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFQLENBQTZCRCxTQUE3QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlFLGtCQUFrQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLHVCQUR3QjtBQUU5QixhQUFTRixFQUFFLENBQUNHLGVBRmtCO0FBRzlCQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQ0osRUFBRSxDQUFDSyxRQUFILENBQVlDLEdBQWIsQ0FIc0I7QUFLOUJDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUVDLFNBQVMsSUFBSSwrQ0FEZjtBQUVKQyxJQUFBQSxnQkFBZ0IsRUFBRVYsRUFBRSxDQUFDVztBQUZqQixHQUxzQjtBQVU5QkMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxLQUFWLEVBQWlCO0FBQzNCLFFBQUlDLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNILEtBQUssQ0FBQ0ksQ0FBZixDQUFiO0FBQ0EsUUFBSUMsTUFBTSxHQUFHSCxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsS0FBSyxDQUFDTSxDQUFmLENBQWI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsSUFBTCxDQUFVRCxLQUFWLEdBQWdCLENBQWhCLEdBQWtCdkIsU0FBbEIsR0FBOEJpQixNQUExQztBQUNBLFFBQUlRLE1BQU0sR0FBRyxLQUFLRCxJQUFMLENBQVVDLE1BQVYsR0FBaUIsQ0FBakIsR0FBbUJ6QixTQUFuQixHQUErQnFCLE1BQTVDO0FBQ0EsUUFBSUssT0FBTyxHQUFHLEtBQUtDLE1BQUwsQ0FBWVAsQ0FBWixHQUFjcEIsU0FBZCxHQUF5QmlCLE1BQXZDO0FBQ0EsUUFBSVcsT0FBTyxHQUFHLEtBQUtELE1BQUwsQ0FBWUwsQ0FBWixHQUFjdEIsU0FBZCxHQUF5QnFCLE1BQXZDO0FBRUEsUUFBSVEsS0FBSyxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsWUFBUCxFQUFaO0FBQ0FGLElBQUFBLEtBQUssQ0FBQ0csUUFBTixDQUFlVCxLQUFmLEVBQXNCRSxNQUF0QixFQUE4QixJQUFJSyxFQUFFLENBQUNHLElBQVAsQ0FBWVAsT0FBWixFQUFxQkUsT0FBckIsQ0FBOUIsRUFBNkQsQ0FBN0Q7QUFDQSxXQUFPQyxLQUFQO0FBQ0g7QUFyQjZCLENBQVQsQ0FBekI7QUF3QkExQixFQUFFLENBQUNELGtCQUFILEdBQXdCZ0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakMsa0JBQXpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBQaHlzaWNzQm94Q29sbGlkZXJcclxuICogQGV4dGVuZHMgUGh5c2ljc0NvbGxpZGVyXHJcbiAqIEB1c2VzIENvbGxpZGVyLkJveFxyXG4gKi9cclxudmFyIFBoeXNpY3NCb3hDb2xsaWRlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5QaHlzaWNzQm94Q29sbGlkZXInLFxyXG4gICAgZXh0ZW5kczogY2MuUGh5c2ljc0NvbGxpZGVyLFxyXG4gICAgbWl4aW5zOiBbY2MuQ29sbGlkZXIuQm94XSxcclxuXHJcbiAgICBlZGl0b3I6IHtcclxuICAgICAgICBtZW51OiBDQ19FRElUT1IgJiYgJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0NvbGxpZGVyL0JveCcsXHJcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuUmlnaWRCb2R5XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVTaGFwZTogZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgdmFyIHNjYWxlWCA9IE1hdGguYWJzKHNjYWxlLngpO1xyXG4gICAgICAgIHZhciBzY2FsZVkgPSBNYXRoLmFicyhzY2FsZS55KTtcclxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLnNpemUud2lkdGgvMi9QVE1fUkFUSU8gKiBzY2FsZVg7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuc2l6ZS5oZWlnaHQvMi9QVE1fUkFUSU8gKiBzY2FsZVk7XHJcbiAgICAgICAgdmFyIG9mZnNldFggPSB0aGlzLm9mZnNldC54L1BUTV9SQVRJTyAqc2NhbGVYO1xyXG4gICAgICAgIHZhciBvZmZzZXRZID0gdGhpcy5vZmZzZXQueS9QVE1fUkFUSU8gKnNjYWxlWTtcclxuXHJcbiAgICAgICAgdmFyIHNoYXBlID0gbmV3IGIyLlBvbHlnb25TaGFwZSgpO1xyXG4gICAgICAgIHNoYXBlLlNldEFzQm94KHdpZHRoLCBoZWlnaHQsIG5ldyBiMi5WZWMyKG9mZnNldFgsIG9mZnNldFkpLCAwKTtcclxuICAgICAgICByZXR1cm4gc2hhcGU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuUGh5c2ljc0JveENvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQm94Q29sbGlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9