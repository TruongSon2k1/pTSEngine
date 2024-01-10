
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCSafeArea.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
var Widget = require('./CCWidget');

var WidgetManager = require('../base-ui/CCWidgetManager');
/**
 * !#en
 * This component is used to adjust the layout of current node to respect the safe area of a notched mobile device such as the iPhone X.
 * It is typically used for the top node of the UI interaction area. For specific usage, refer to the official [example-cases/02_ui/16_safeArea/SafeArea.fire](https://github.com/cocos-creator/example-cases).
 *
 * The concept of safe area is to give you a fixed inner rectangle in which you can safely display content that will be drawn on screen.
 * You are strongly discouraged from providing controls outside of this area. But your screen background could embellish edges.
 *
 * This component internally uses the API `cc.sys.getSafeAreaRect();` to obtain the safe area of the current iOS or Android device,
 * and implements the adaptation by using the Widget component and set anchor.
 *
 * !#zh
 * 该组件会将所在节点的布局适配到 iPhone X 等异形屏手机的安全区域内，通常用于 UI 交互区域的顶层节点，具体用法可参考官方范例 [example-cases/02_ui/16_safeArea/SafeArea.fire](https://github.com/cocos-creator/example-cases)。
 *
 * 该组件内部通过 API `cc.sys.getSafeAreaRect();` 获取到当前 iOS 或 Android 设备的安全区域，并通过 Widget 组件实现适配。
 *
 * @class SafeArea
 * @extends Component
 */


var SafeArea = cc.Class({
  name: 'cc.SafeArea',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    help: 'i18n:COMPONENT.help_url.safe_area',
    menu: 'i18n:MAIN_MENU.component.ui/SafeArea',
    inspector: 'packages://inspector/inspectors/comps/safe-area.js',
    executeInEditMode: true,
    requireComponent: Widget
  },
  onEnable: function onEnable() {
    this.updateArea();
    cc.view.on('canvas-resize', this.updateArea, this);
  },
  onDisable: function onDisable() {
    cc.view.off('canvas-resize', this.updateArea, this);
  },

  /**
   * !#en Adapt to safe area
   * !#zh 立即适配安全区域
   * @method updateArea
   * @example
   * let safeArea = this.node.addComponent(cc.SafeArea);
   * safeArea.updateArea();
   */
  updateArea: function updateArea() {
    // TODO Remove Widget dependencies in the future
    var widget = this.node.getComponent(Widget);

    if (!widget) {
      return;
    }

    if (CC_EDITOR) {
      widget.top = widget.bottom = widget.left = widget.right = 0;
      widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
      return;
    } // IMPORTANT: need to update alignment to get the latest position


    widget.updateAlignment();
    var lastPos = this.node.position;
    var lastAnchorPoint = this.node.getAnchorPoint(); //

    widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
    var screenWidth = cc.winSize.width,
        screenHeight = cc.winSize.height;
    var safeArea = cc.sys.getSafeAreaRect();
    widget.top = screenHeight - safeArea.y - safeArea.height;
    widget.bottom = safeArea.y;
    widget.left = safeArea.x;
    widget.right = screenWidth - safeArea.x - safeArea.width;
    widget.updateAlignment(); // set anchor, keep the original position unchanged

    var curPos = this.node.position;
    var anchorX = lastAnchorPoint.x - (curPos.x - lastPos.x) / this.node.width;
    var anchorY = lastAnchorPoint.y - (curPos.y - lastPos.y) / this.node.height;
    this.node.setAnchorPoint(anchorX, anchorY); // IMPORTANT: restore to lastPos even if widget is not ALWAYS

    WidgetManager.add(widget);
  }
});
cc.SafeArea = module.exports = SafeArea;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDU2FmZUFyZWEuanMiXSwibmFtZXMiOlsiV2lkZ2V0IiwicmVxdWlyZSIsIldpZGdldE1hbmFnZXIiLCJTYWZlQXJlYSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiaGVscCIsIm1lbnUiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsInJlcXVpcmVDb21wb25lbnQiLCJvbkVuYWJsZSIsInVwZGF0ZUFyZWEiLCJ2aWV3Iiwib24iLCJvbkRpc2FibGUiLCJvZmYiLCJ3aWRnZXQiLCJub2RlIiwiZ2V0Q29tcG9uZW50IiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiaXNBbGlnblRvcCIsImlzQWxpZ25Cb3R0b20iLCJpc0FsaWduTGVmdCIsImlzQWxpZ25SaWdodCIsInVwZGF0ZUFsaWdubWVudCIsImxhc3RQb3MiLCJwb3NpdGlvbiIsImxhc3RBbmNob3JQb2ludCIsImdldEFuY2hvclBvaW50Iiwic2NyZWVuV2lkdGgiLCJ3aW5TaXplIiwid2lkdGgiLCJzY3JlZW5IZWlnaHQiLCJoZWlnaHQiLCJzYWZlQXJlYSIsInN5cyIsImdldFNhZmVBcmVhUmVjdCIsInkiLCJ4IiwiY3VyUG9zIiwiYW5jaG9yWCIsImFuY2hvclkiLCJzZXRBbmNob3JQb2ludCIsImFkZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXRCOztBQUNBLElBQU1DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLDRCQUFELENBQTdCO0FBQ0E7QUFD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TUFBTSxHQUFHLEtBQUt6QixJQUFMLENBQVVZLFFBQXZCO0FBQ0EsUUFBSWMsT0FBTyxHQUFHYixlQUFlLENBQUNXLENBQWhCLEdBQW9CLENBQUNDLE1BQU0sQ0FBQ0QsQ0FBUCxHQUFXYixPQUFPLENBQUNhLENBQXBCLElBQXlCLEtBQUt4QixJQUFMLENBQVVpQixLQUFyRTtBQUNBLFFBQUlVLE9BQU8sR0FBR2QsZUFBZSxDQUFDVSxDQUFoQixHQUFvQixDQUFDRSxNQUFNLENBQUNGLENBQVAsR0FBV1osT0FBTyxDQUFDWSxDQUFwQixJQUF5QixLQUFLdkIsSUFBTCxDQUFVbUIsTUFBckU7QUFDQSxTQUFLbkIsSUFBTCxDQUFVNEIsY0FBVixDQUF5QkYsT0FBekIsRUFBa0NDLE9BQWxDLEVBN0JVLENBOEJWOztBQUNBOUMsSUFBQUEsYUFBYSxDQUFDZ0QsR0FBZCxDQUFrQjlCLE1BQWxCO0FBQ0g7QUE3RG1CLENBQVQsQ0FBZjtBQWdFQWhCLEVBQUUsQ0FBQ0QsUUFBSCxHQUFjZ0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakQsUUFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDIwIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBXaWRnZXQgPSByZXF1aXJlKCcuL0NDV2lkZ2V0Jyk7XHJcbmNvbnN0IFdpZGdldE1hbmFnZXIgPSByZXF1aXJlKCcuLi9iYXNlLXVpL0NDV2lkZ2V0TWFuYWdlcicpO1xyXG4vKipcclxuICogISNlblxyXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIGFkanVzdCB0aGUgbGF5b3V0IG9mIGN1cnJlbnQgbm9kZSB0byByZXNwZWN0IHRoZSBzYWZlIGFyZWEgb2YgYSBub3RjaGVkIG1vYmlsZSBkZXZpY2Ugc3VjaCBhcyB0aGUgaVBob25lIFguXHJcbiAqIEl0IGlzIHR5cGljYWxseSB1c2VkIGZvciB0aGUgdG9wIG5vZGUgb2YgdGhlIFVJIGludGVyYWN0aW9uIGFyZWEuIEZvciBzcGVjaWZpYyB1c2FnZSwgcmVmZXIgdG8gdGhlIG9mZmljaWFsIFtleGFtcGxlLWNhc2VzLzAyX3VpLzE2X3NhZmVBcmVhL1NhZmVBcmVhLmZpcmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yL2V4YW1wbGUtY2FzZXMpLlxyXG4gKlxyXG4gKiBUaGUgY29uY2VwdCBvZiBzYWZlIGFyZWEgaXMgdG8gZ2l2ZSB5b3UgYSBmaXhlZCBpbm5lciByZWN0YW5nbGUgaW4gd2hpY2ggeW91IGNhbiBzYWZlbHkgZGlzcGxheSBjb250ZW50IHRoYXQgd2lsbCBiZSBkcmF3biBvbiBzY3JlZW4uXHJcbiAqIFlvdSBhcmUgc3Ryb25nbHkgZGlzY291cmFnZWQgZnJvbSBwcm92aWRpbmcgY29udHJvbHMgb3V0c2lkZSBvZiB0aGlzIGFyZWEuIEJ1dCB5b3VyIHNjcmVlbiBiYWNrZ3JvdW5kIGNvdWxkIGVtYmVsbGlzaCBlZGdlcy5cclxuICpcclxuICogVGhpcyBjb21wb25lbnQgaW50ZXJuYWxseSB1c2VzIHRoZSBBUEkgYGNjLnN5cy5nZXRTYWZlQXJlYVJlY3QoKTtgIHRvIG9idGFpbiB0aGUgc2FmZSBhcmVhIG9mIHRoZSBjdXJyZW50IGlPUyBvciBBbmRyb2lkIGRldmljZSxcclxuICogYW5kIGltcGxlbWVudHMgdGhlIGFkYXB0YXRpb24gYnkgdXNpbmcgdGhlIFdpZGdldCBjb21wb25lbnQgYW5kIHNldCBhbmNob3IuXHJcbiAqXHJcbiAqICEjemhcclxuICog6K+l57uE5Lu25Lya5bCG5omA5Zyo6IqC54K555qE5biD5bGA6YCC6YWN5YiwIGlQaG9uZSBYIOetieW8guW9ouWxj+aJi+acuueahOWuieWFqOWMuuWfn+WGhe+8jOmAmuW4uOeUqOS6jiBVSSDkuqTkupLljLrln5/nmoTpobblsYLoioLngrnvvIzlhbfkvZPnlKjms5Xlj6/lj4LogIPlrpjmlrnojIPkvosgW2V4YW1wbGUtY2FzZXMvMDJfdWkvMTZfc2FmZUFyZWEvU2FmZUFyZWEuZmlyZV0oaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvZXhhbXBsZS1jYXNlcynjgIJcclxuICpcclxuICog6K+l57uE5Lu25YaF6YOo6YCa6L+HIEFQSSBgY2Muc3lzLmdldFNhZmVBcmVhUmVjdCgpO2Ag6I635Y+W5Yiw5b2T5YmNIGlPUyDmiJYgQW5kcm9pZCDorr7lpIfnmoTlronlhajljLrln5/vvIzlubbpgJrov4cgV2lkZ2V0IOe7hOS7tuWunueOsOmAgumFjeOAglxyXG4gKlxyXG4gKiBAY2xhc3MgU2FmZUFyZWFcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG52YXIgU2FmZUFyZWEgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2FmZUFyZWEnLFxyXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpLFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuc2FmZV9hcmVhJyxcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1NhZmVBcmVhJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3NhZmUtYXJlYS5qcycsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogV2lkZ2V0LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBcmVhKCk7XHJcbiAgICAgICAgY2Mudmlldy5vbignY2FudmFzLXJlc2l6ZScsIHRoaXMudXBkYXRlQXJlYSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgY2Mudmlldy5vZmYoJ2NhbnZhcy1yZXNpemUnLCB0aGlzLnVwZGF0ZUFyZWEsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWRhcHQgdG8gc2FmZSBhcmVhXHJcbiAgICAgKiAhI3poIOeri+WNs+mAgumFjeWuieWFqOWMuuWfn1xyXG4gICAgICogQG1ldGhvZCB1cGRhdGVBcmVhXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHNhZmVBcmVhID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5TYWZlQXJlYSk7XHJcbiAgICAgKiBzYWZlQXJlYS51cGRhdGVBcmVhKCk7XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUFyZWEgKCkge1xyXG4gICAgICAgIC8vIFRPRE8gUmVtb3ZlIFdpZGdldCBkZXBlbmRlbmNpZXMgaW4gdGhlIGZ1dHVyZVxyXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFdpZGdldCk7XHJcbiAgICAgICAgaWYgKCF3aWRnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB3aWRnZXQudG9wID0gd2lkZ2V0LmJvdHRvbSA9IHdpZGdldC5sZWZ0ID0gd2lkZ2V0LnJpZ2h0ID0gMDtcclxuICAgICAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHdpZGdldC5pc0FsaWduTGVmdCA9IHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIElNUE9SVEFOVDogbmVlZCB0byB1cGRhdGUgYWxpZ25tZW50IHRvIGdldCB0aGUgbGF0ZXN0IHBvc2l0aW9uXHJcbiAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIGxldCBsYXN0UG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBsYXN0QW5jaG9yUG9pbnQgPSB0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB3aWRnZXQuaXNBbGlnbkxlZnQgPSB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc2NyZWVuV2lkdGggPSBjYy53aW5TaXplLndpZHRoLCBzY3JlZW5IZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodDtcclxuICAgICAgICBsZXQgc2FmZUFyZWEgPSBjYy5zeXMuZ2V0U2FmZUFyZWFSZWN0KCk7XHJcbiAgICAgICAgd2lkZ2V0LnRvcCA9IHNjcmVlbkhlaWdodCAtIHNhZmVBcmVhLnkgLSBzYWZlQXJlYS5oZWlnaHQ7XHJcbiAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IHNhZmVBcmVhLnk7XHJcbiAgICAgICAgd2lkZ2V0LmxlZnQgPSBzYWZlQXJlYS54O1xyXG4gICAgICAgIHdpZGdldC5yaWdodCA9IHNjcmVlbldpZHRoIC0gc2FmZUFyZWEueCAtIHNhZmVBcmVhLndpZHRoO1xyXG4gICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAvLyBzZXQgYW5jaG9yLCBrZWVwIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiB1bmNoYW5nZWRcclxuICAgICAgICBsZXQgY3VyUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCBhbmNob3JYID0gbGFzdEFuY2hvclBvaW50LnggLSAoY3VyUG9zLnggLSBsYXN0UG9zLngpIC8gdGhpcy5ub2RlLndpZHRoO1xyXG4gICAgICAgIGxldCBhbmNob3JZID0gbGFzdEFuY2hvclBvaW50LnkgLSAoY3VyUG9zLnkgLSBsYXN0UG9zLnkpIC8gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0QW5jaG9yUG9pbnQoYW5jaG9yWCwgYW5jaG9yWSk7XHJcbiAgICAgICAgLy8gSU1QT1JUQU5UOiByZXN0b3JlIHRvIGxhc3RQb3MgZXZlbiBpZiB3aWRnZXQgaXMgbm90IEFMV0FZU1xyXG4gICAgICAgIFdpZGdldE1hbmFnZXIuYWRkKHdpZGdldCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuU2FmZUFyZWEgPSBtb2R1bGUuZXhwb3J0cyA9IFNhZmVBcmVhO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==