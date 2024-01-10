
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabelShadow.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2019 Xiamen Yaji Software Co., Ltd.

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
 * !#en Shadow effect for Label component, only for system fonts or TTF fonts
 * !#zh 用于给 Label 组件添加阴影效果，只能用于系统字体或 ttf 字体
 * @class LabelShadow
 * @extends Component
 * @example
 *  // Create a new node and add label components.
 *  var node = new cc.Node("New Label");
 *  var label = node.addComponent(cc.Label);
 *  label.string = "hello world";
 *  var labelShadow = node.addComponent(cc.LabelShadow);
 *  node.parent = this.node;
 */
var LabelShadow = cc.Class({
  name: 'cc.LabelShadow',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/LabelShadow',
    executeInEditMode: true,
    requireComponent: cc.Label
  },
  properties: {
    _color: cc.Color.WHITE,
    _offset: cc.v2(2, 2),
    _blur: 2,

    /**
     * !#en The shadow color
     * !#zh 阴影的颜色
     * @property color
     * @type {Color}
     * @example
     * labelShadow.color = cc.Color.YELLOW;
     */
    color: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.color',
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
     * !#en Offset between font and shadow
     * !#zh 字体与阴影的偏移
     * @property offset
     * @type {Vec2}
     * @example
     * labelShadow.offset = new cc.Vec2(2, 2);
     */
    offset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.offset',
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;

        this._updateRenderData();
      }
    },

    /**
     * !#en A non-negative float specifying the level of shadow blur
     * !#zh 阴影的模糊程度
     * @property blur
     * @type {Number}
     * @example
     * labelShadow.blur = 2;
     */
    blur: {
      tooltip: CC_DEV && 'i18n:COMPONENT.shadow.blur',
      get: function get() {
        return this._blur;
      },
      set: function set(value) {
        this._blur = value;

        this._updateRenderData();
      },
      range: [0, 1024]
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
      label.markForRender(true);
    }
  }
});
cc.LabelShadow = module.exports = LabelShadow;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTGFiZWxTaGFkb3cuanMiXSwibmFtZXMiOlsiTGFiZWxTaGFkb3ciLCJjYyIsIkNsYXNzIiwibmFtZSIsInJlcXVpcmUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJyZXF1aXJlQ29tcG9uZW50IiwiTGFiZWwiLCJwcm9wZXJ0aWVzIiwiX2NvbG9yIiwiQ29sb3IiLCJXSElURSIsIl9vZmZzZXQiLCJ2MiIsIl9ibHVyIiwiY29sb3IiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZ2V0IiwiY2xvbmUiLCJzZXQiLCJ2YWx1ZSIsImVxdWFscyIsIl91cGRhdGVSZW5kZXJEYXRhIiwib2Zmc2V0IiwiYmx1ciIsInJhbmdlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJsYWJlbCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJtYXJrRm9yUmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTQyxPQUFPLENBQUMsZUFBRCxDQUZPO0FBR3ZCQyxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFLGdEQURXO0FBRWpCQyxJQUFBQSxpQkFBaUIsRUFBRSxJQUZGO0FBR2pCQyxJQUFBQSxnQkFBZ0IsRUFBRVIsRUFBRSxDQUFDUztBQUhKLEdBSEU7QUFTdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUVYLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxLQURUO0FBRVJDLElBQUFBLE9BQU8sRUFBRWQsRUFBRSxDQUFDZSxFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsQ0FGRDtBQUdSQyxJQUFBQSxLQUFLLEVBQUUsQ0FIQzs7QUFLUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLEtBQUssRUFBRTtBQUNIQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw2QkFEaEI7QUFFSEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtULE1BQUwsQ0FBWVUsS0FBWixFQUFQO0FBQ0gsT0FKRTtBQUtIQyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixZQUFJLENBQUMsS0FBS1osTUFBTCxDQUFZYSxNQUFaLENBQW1CRCxLQUFuQixDQUFMLEVBQWdDO0FBQzVCLGVBQUtaLE1BQUwsQ0FBWVcsR0FBWixDQUFnQkMsS0FBaEI7QUFDSDs7QUFDRCxhQUFLRSxpQkFBTDtBQUNIO0FBVkUsS0FiQzs7QUEwQlI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxNQUFNLEVBQUU7QUFDSlIsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksOEJBRGY7QUFFSkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtOLE9BQVo7QUFDSCxPQUpHO0FBS0pRLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtULE9BQUwsR0FBZVMsS0FBZjs7QUFDQSxhQUFLRSxpQkFBTDtBQUNIO0FBUkcsS0FsQ0E7O0FBNkNSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUUsSUFBQUEsSUFBSSxFQUFFO0FBQ0ZULE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDRCQURqQjtBQUVGQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osS0FBWjtBQUNILE9BSkM7QUFLRk0sTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsYUFBS1AsS0FBTCxHQUFhTyxLQUFiOztBQUNBLGFBQUtFLGlCQUFMO0FBQ0gsT0FSQztBQVNGRyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFELEVBQUksSUFBSjtBQVRMO0FBckRFLEdBVFc7QUEyRXZCQyxFQUFBQSxRQTNFdUIsc0JBMkVYO0FBQ1IsU0FBS0osaUJBQUw7QUFDSCxHQTdFc0I7QUErRXZCSyxFQUFBQSxTQS9FdUIsdUJBK0VWO0FBQ1QsU0FBS0wsaUJBQUw7QUFDSCxHQWpGc0I7QUFtRnZCQSxFQUFBQSxpQkFuRnVCLCtCQW1GRjtBQUNqQixRQUFJTSxLQUFLLEdBQUcsS0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCakMsRUFBRSxDQUFDUyxLQUExQixDQUFaOztBQUNBLFFBQUlzQixLQUFKLEVBQVc7QUFDUEEsTUFBQUEsS0FBSyxDQUFDRyxhQUFOLENBQW9CLElBQXBCO0FBQ0g7QUFDSjtBQXhGc0IsQ0FBVCxDQUFsQjtBQTRGQWxDLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQm9DLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJDLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBTaGFkb3cgZWZmZWN0IGZvciBMYWJlbCBjb21wb25lbnQsIG9ubHkgZm9yIHN5c3RlbSBmb250cyBvciBUVEYgZm9udHNcclxuICogISN6aCDnlKjkuo7nu5kgTGFiZWwg57uE5Lu25re75Yqg6Zi05b2x5pWI5p6c77yM5Y+q6IO955So5LqO57O757uf5a2X5L2T5oiWIHR0ZiDlrZfkvZNcclxuICogQGNsYXNzIExhYmVsU2hhZG93XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAgLy8gQ3JlYXRlIGEgbmV3IG5vZGUgYW5kIGFkZCBsYWJlbCBjb21wb25lbnRzLlxyXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBMYWJlbFwiKTtcclxuICogIHZhciBsYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICogIGxhYmVsLnN0cmluZyA9IFwiaGVsbG8gd29ybGRcIjtcclxuICogIHZhciBsYWJlbFNoYWRvdyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsU2hhZG93KTtcclxuICogIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gKi9cclxuXHJcbmxldCBMYWJlbFNoYWRvdyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5MYWJlbFNoYWRvdycsXHJcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvTGFiZWxTaGFkb3cnLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLkxhYmVsLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcclxuICAgICAgICBfb2Zmc2V0OiBjYy52MigyLCAyKSxcclxuICAgICAgICBfYmx1cjogMixcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc2hhZG93IGNvbG9yXHJcbiAgICAgICAgICogISN6aCDpmLTlvbHnmoTpopzoibJcclxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcclxuICAgICAgICAgKiBAdHlwZSB7Q29sb3J9XHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBsYWJlbFNoYWRvdy5jb2xvciA9IGNjLkNvbG9yLllFTExPVztcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb2xvcjoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5jb2xvcicsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBPZmZzZXQgYmV0d2VlbiBmb250IGFuZCBzaGFkb3dcclxuICAgICAgICAgKiAhI3poIOWtl+S9k+S4jumYtOW9seeahOWBj+enu1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBvZmZzZXRcclxuICAgICAgICAgKiBAdHlwZSB7VmVjMn1cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGxhYmVsU2hhZG93Lm9mZnNldCA9IG5ldyBjYy5WZWMyKDIsIDIpO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9mZnNldDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNoYWRvdy5vZmZzZXQnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQSBub24tbmVnYXRpdmUgZmxvYXQgc3BlY2lmeWluZyB0aGUgbGV2ZWwgb2Ygc2hhZG93IGJsdXJcclxuICAgICAgICAgKiAhI3poIOmYtOW9seeahOaooeeziueoi+W6plxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBibHVyXHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIGxhYmVsU2hhZG93LmJsdXIgPSAyO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJsdXI6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zaGFkb3cuYmx1cicsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JsdXI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ibHVyID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTAyNF0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlICgpIHtcclxuICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVSZW5kZXJEYXRhICgpIHtcclxuICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgbGFiZWwubWFya0ZvclJlbmRlcih0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbmNjLkxhYmVsU2hhZG93ID0gbW9kdWxlLmV4cG9ydHMgPSBMYWJlbFNoYWRvdztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=