
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCCollider.js';
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
 * !#en Collider component base class.
 * !#zh 碰撞组件基类
 * @class Collider
 * @extends Component
 */
var Collider = cc.Class({
  name: 'cc.Collider',
  "extends": cc.Component,
  properties: {
    editing: {
      "default": false,
      serializable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.collider.editing'
    },

    /**
     * !#en Tag. If a node has several collider components, you can judge which type of collider is collided according to the tag.
     * !#zh 标签。当一个节点上有多个碰撞组件时，在发生碰撞后，可以使用此标签来判断是节点上的哪个碰撞组件被碰撞了。
     * @property tag
     * @type {Integer}
     * @default 0
     */
    tag: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.tag',
      "default": 0,
      range: [0, 10e6],
      type: cc.Integer
    }
  },
  onDisable: function onDisable() {
    cc.director.getCollisionManager().removeCollider(this);
  },
  onEnable: function onEnable() {
    cc.director.getCollisionManager().addCollider(this);
  }
});
cc.Collider = module.exports = Collider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbGxpZGVyXFxDQ0NvbGxpZGVyLmpzIl0sIm5hbWVzIjpbIkNvbGxpZGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZWRpdGluZyIsInNlcmlhbGl6YWJsZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJ0YWciLCJyYW5nZSIsInR5cGUiLCJJbnRlZ2VyIiwib25EaXNhYmxlIiwiZGlyZWN0b3IiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwicmVtb3ZlQ29sbGlkZXIiLCJvbkVuYWJsZSIsImFkZENvbGxpZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxhQURjO0FBRXBCLGFBQVNGLEVBQUUsQ0FBQ0csU0FGUTtBQUlwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLEtBREo7QUFFTEMsTUFBQUEsWUFBWSxFQUFFLEtBRlQ7QUFHTEMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFIZCxLQUREOztBQU9SO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLEdBQUcsRUFBRTtBQUNERixNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw2Q0FEbEI7QUFFRCxpQkFBUyxDQUZSO0FBR0RFLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxJQUFKLENBSE47QUFJREMsTUFBQUEsSUFBSSxFQUFFWCxFQUFFLENBQUNZO0FBSlI7QUFkRyxHQUpRO0FBMEJwQkMsRUFBQUEsU0FBUyxFQUFFLHFCQUFZO0FBQ25CYixJQUFBQSxFQUFFLENBQUNjLFFBQUgsQ0FBWUMsbUJBQVosR0FBa0NDLGNBQWxDLENBQWlELElBQWpEO0FBQ0gsR0E1Qm1CO0FBOEJwQkMsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCakIsSUFBQUEsRUFBRSxDQUFDYyxRQUFILENBQVlDLG1CQUFaLEdBQWtDRyxXQUFsQyxDQUE4QyxJQUE5QztBQUNIO0FBaENtQixDQUFULENBQWY7QUFtQ0FsQixFQUFFLENBQUNELFFBQUgsR0FBY29CLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJCLFFBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gQ29sbGlkZXIgY29tcG9uZW50IGJhc2UgY2xhc3MuXHJcbiAqICEjemgg56Kw5pKe57uE5Lu25Z+657G7XHJcbiAqIEBjbGFzcyBDb2xsaWRlclxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbnZhciBDb2xsaWRlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Db2xsaWRlcicsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGVkaXRpbmc6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY29sbGlkZXIuZWRpdGluZydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRhZy4gSWYgYSBub2RlIGhhcyBzZXZlcmFsIGNvbGxpZGVyIGNvbXBvbmVudHMsIHlvdSBjYW4ganVkZ2Ugd2hpY2ggdHlwZSBvZiBjb2xsaWRlciBpcyBjb2xsaWRlZCBhY2NvcmRpbmcgdG8gdGhlIHRhZy5cclxuICAgICAgICAgKiAhI3poIOagh+etvuOAguW9k+S4gOS4quiKgueCueS4iuacieWkmuS4queisOaSnue7hOS7tuaXtu+8jOWcqOWPkeeUn+eisOaSnuWQju+8jOWPr+S7peS9v+eUqOatpOagh+etvuadpeWIpOaWreaYr+iKgueCueS4iueahOWTquS4queisOaSnue7hOS7tuiiq+eisOaSnuS6huOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0YWdcclxuICAgICAgICAgKiBAdHlwZSB7SW50ZWdlcn1cclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGFnOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnRhZycsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBlNl0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5yZW1vdmVDb2xsaWRlcih0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuYWRkQ29sbGlkZXIodGhpcyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuQ29sbGlkZXIgPSBtb2R1bGUuZXhwb3J0cyA9IENvbGxpZGVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==