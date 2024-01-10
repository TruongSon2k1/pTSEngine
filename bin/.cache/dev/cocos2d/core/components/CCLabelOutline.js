
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabelOutline.js';
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
 * !#en Outline effect used to change the display, only for system fonts or TTF fonts
 * !#zh 描边效果组件,用于字体描边,只能用于系统字体
 * @class LabelOutline
 * @extends Component
 * @example
 *  // Create a new node and add label components.
 *  var node = new cc.Node("New Label");
 *  var label = node.addComponent(cc.Label);
 *  label.string = "hello world";
 *  var outline = node.addComponent(cc.LabelOutline);
 *  node.parent = this.node;
 */
var LabelOutline = cc.Class({
  name: 'cc.LabelOutline',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/LabelOutline',
    executeInEditMode: true,
    requireComponent: cc.Label
  },
  properties: {
    _color: cc.Color.WHITE,
    _width: 1,

    /**
     * !#en outline color
     * !#zh 改变描边的颜色
     * @property color
     * @type {Color}
     * @example
     * outline.color = cc.Color.BLACK;
     */
    color: {
      tooltip: CC_DEV && 'i18n:COMPONENT.outline.color',
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);
        }

        this._updateRenderData();
      }
    },

    /**
     * !#en Change the outline width
     * !#zh 改变描边的宽度
     * @property width
     * @type {Number}
     * @example
     * outline.width = 3;
     */
    width: {
      tooltip: CC_DEV && 'i18n:COMPONENT.outline.width',
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (this._width === value) return;
        this._width = value;

        this._updateRenderData();
      },
      range: [0, 512]
    }
  },
  onEnable: function onEnable() {
    this._updateRenderData();
  },
  onDisable: function onDisable() {
    this._updateRenderData();
  },
  _updateRenderData: function _updateRenderData() {
    var label = this.node.getComponent(cc.Label);

    if (label) {
      label.setVertsDirty();
    }
  }
});
cc.LabelOutline = module.exports = LabelOutline;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTGFiZWxPdXRsaW5lLmpzIl0sIm5hbWVzIjpbIkxhYmVsT3V0bGluZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJleGVjdXRlSW5FZGl0TW9kZSIsInJlcXVpcmVDb21wb25lbnQiLCJMYWJlbCIsInByb3BlcnRpZXMiLCJfY29sb3IiLCJDb2xvciIsIldISVRFIiwiX3dpZHRoIiwiY29sb3IiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0IiwiY2xvbmUiLCJzZXQiLCJ2YWx1ZSIsImVxdWFscyIsIl91cGRhdGVSZW5kZXJEYXRhIiwid2lkdGgiLCJyYW5nZSIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwibGFiZWwiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic2V0VmVydHNEaXJ0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxpQkFEa0I7QUFFeEIsYUFBU0MsT0FBTyxDQUFDLGVBQUQsQ0FGUTtBQUd4QkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSxpREFEVztBQUVqQkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFGRjtBQUdqQkMsSUFBQUEsZ0JBQWdCLEVBQUVSLEVBQUUsQ0FBQ1M7QUFISixHQUhHO0FBU3hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFWCxFQUFFLENBQUNZLEtBQUgsQ0FBU0MsS0FEVDtBQUVSQyxJQUFBQSxNQUFNLEVBQUUsQ0FGQTs7QUFJUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLEtBQUssRUFBRTtBQUNIQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw4QkFEaEI7QUFFSEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtQLE1BQUwsQ0FBWVEsS0FBWixFQUFQO0FBQ0gsT0FKRTtBQUtIQyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixZQUFJLENBQUMsS0FBS1YsTUFBTCxDQUFZVyxNQUFaLENBQW1CRCxLQUFuQixDQUFMLEVBQWdDO0FBQzVCLGVBQUtWLE1BQUwsQ0FBWVMsR0FBWixDQUFnQkMsS0FBaEI7QUFDSDs7QUFDRCxhQUFLRSxpQkFBTDtBQUNIO0FBVkUsS0FaQzs7QUF5QlI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxLQUFLLEVBQUU7QUFDSFIsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksOEJBRGhCO0FBRUhDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLSixNQUFaO0FBQ0gsT0FKRTtBQUtITSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixZQUFJLEtBQUtQLE1BQUwsS0FBZ0JPLEtBQXBCLEVBQTJCO0FBRTNCLGFBQUtQLE1BQUwsR0FBY08sS0FBZDs7QUFDQSxhQUFLRSxpQkFBTDtBQUNILE9BVkU7QUFXSEUsTUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBRCxFQUFJLEdBQUo7QUFYSjtBQWpDQyxHQVRZO0FBeUR4QkMsRUFBQUEsUUF6RHdCLHNCQXlEWjtBQUNSLFNBQUtILGlCQUFMO0FBQ0gsR0EzRHVCO0FBNkR4QkksRUFBQUEsU0E3RHdCLHVCQTZEWDtBQUNULFNBQUtKLGlCQUFMO0FBQ0gsR0EvRHVCO0FBaUV4QkEsRUFBQUEsaUJBakV3QiwrQkFpRUg7QUFDakIsUUFBSUssS0FBSyxHQUFHLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QjlCLEVBQUUsQ0FBQ1MsS0FBMUIsQ0FBWjs7QUFDQSxRQUFJbUIsS0FBSixFQUFXO0FBQ1BBLE1BQUFBLEtBQUssQ0FBQ0csYUFBTjtBQUNIO0FBQ0o7QUF0RXVCLENBQVQsQ0FBbkI7QUEwRUEvQixFQUFFLENBQUNELFlBQUgsR0FBa0JpQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQyxZQUFuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gT3V0bGluZSBlZmZlY3QgdXNlZCB0byBjaGFuZ2UgdGhlIGRpc3BsYXksIG9ubHkgZm9yIHN5c3RlbSBmb250cyBvciBUVEYgZm9udHNcclxuICogISN6aCDmj4/ovrnmlYjmnpznu4Tku7Ys55So5LqO5a2X5L2T5o+P6L65LOWPquiDveeUqOS6juezu+e7n+Wtl+S9k1xyXG4gKiBAY2xhc3MgTGFiZWxPdXRsaW5lXHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgLy8gQ3JlYXRlIGEgbmV3IG5vZGUgYW5kIGFkZCBsYWJlbCBjb21wb25lbnRzLlxyXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBMYWJlbFwiKTtcclxuICogIHZhciBsYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICogIGxhYmVsLnN0cmluZyA9IFwiaGVsbG8gd29ybGRcIjtcclxuICogIHZhciBvdXRsaW5lID0gbm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKTtcclxuICogIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gKi9cclxuXHJcbmxldCBMYWJlbE91dGxpbmUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTGFiZWxPdXRsaW5lJyxcclxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbE91dGxpbmUnLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICBfd2lkdGg6IDEsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gb3V0bGluZSBjb2xvclxyXG4gICAgICAgICAqICEjemgg5pS55Y+Y5o+P6L6555qE6aKc6ImyXHJcbiAgICAgICAgICogQHByb3BlcnR5IGNvbG9yXHJcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogb3V0bGluZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbG9yOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQub3V0bGluZS5jb2xvcicsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBDaGFuZ2UgdGhlIG91dGxpbmUgd2lkdGhcclxuICAgICAgICAgKiAhI3poIOaUueWPmOaPj+i+ueeahOWuveW6plxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBvdXRsaW5lLndpZHRoID0gMztcclxuICAgICAgICAgKi9cclxuICAgICAgICB3aWR0aDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm91dGxpbmUud2lkdGgnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWR0aCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYW5nZTogWzAsIDUxMl0sXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVJlbmRlckRhdGEgKCkge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICBsYWJlbC5zZXRWZXJ0c0RpcnR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jYy5MYWJlbE91dGxpbmUgPSBtb2R1bGUuZXhwb3J0cyA9IExhYmVsT3V0bGluZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=