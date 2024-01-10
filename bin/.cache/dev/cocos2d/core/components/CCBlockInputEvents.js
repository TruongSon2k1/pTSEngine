
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCBlockInputEvents.js';
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
var BlockEvents = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave', 'mousewheel'];

function stopPropagation(event) {
  event.stopPropagation();
}
/**
 * !#en
 * This component will block all input events (mouse and touch) within the bounding box of the node, preventing the input from penetrating into the underlying node, typically for the background of the top UI.<br>
 * This component does not have any API interface and can be added directly to the scene to take effect.
 * !#zh
 * 该组件将拦截所属节点 bounding box 内的所有输入事件（鼠标和触摸），防止输入穿透到下层节点，一般用于上层 UI 的背景。<br>
 * 该组件没有任何 API 接口，直接添加到场景即可生效。
 *
 * @class BlockInputEvents
 * @extends Component
 */


var BlockInputEvents = cc.Class({
  name: 'cc.BlockInputEvents',
  "extends": require('./CCComponent'),
  editor: {
    menu: 'i18n:MAIN_MENU.component.ui/Block Input Events',
    inspector: 'packages://inspector/inspectors/comps/block-input-events.js',
    help: 'i18n:COMPONENT.help_url.block_input_events'
  },
  onEnable: function onEnable() {
    for (var i = 0; i < BlockEvents.length; i++) {
      // supply the 'this' parameter so that the callback could be added and removed correctly,
      // even if the same component is added more than once to a Node.
      this.node.on(BlockEvents[i], stopPropagation, this);
    }
  },
  onDisable: function onDisable() {
    for (var i = 0; i < BlockEvents.length; i++) {
      this.node.off(BlockEvents[i], stopPropagation, this);
    }
  }
});
cc.BlockInputEvents = module.exports = BlockInputEvents;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQmxvY2tJbnB1dEV2ZW50cy5qcyJdLCJuYW1lcyI6WyJCbG9ja0V2ZW50cyIsInN0b3BQcm9wYWdhdGlvbiIsImV2ZW50IiwiQmxvY2tJbnB1dEV2ZW50cyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsImVkaXRvciIsIm1lbnUiLCJpbnNwZWN0b3IiLCJoZWxwIiwib25FbmFibGUiLCJpIiwibGVuZ3RoIiwibm9kZSIsIm9uIiwib25EaXNhYmxlIiwib2ZmIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsV0FBVyxHQUFHLENBQUMsWUFBRCxFQUFlLFdBQWYsRUFBNEIsVUFBNUIsRUFDQyxXQURELEVBQ2MsV0FEZCxFQUMyQixTQUQzQixFQUVDLFlBRkQsRUFFZSxZQUZmLEVBRTZCLFlBRjdCLENBQXBCOztBQUlBLFNBQVNDLGVBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDO0FBQzdCQSxFQUFBQSxLQUFLLENBQUNELGVBQU47QUFDSDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQU1FLGdCQUFnQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUM5QkMsRUFBQUEsSUFBSSxFQUFFLHFCQUR3QjtBQUU5QixhQUFTQyxPQUFPLENBQUMsZUFBRCxDQUZjO0FBRzlCQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsSUFBSSxFQUFFLGdEQURGO0FBRUpDLElBQUFBLFNBQVMsRUFBRSw2REFGUDtBQUdKQyxJQUFBQSxJQUFJLEVBQUU7QUFIRixHQUhzQjtBQVM5QkMsRUFBQUEsUUFUOEIsc0JBU2xCO0FBQ1IsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHYixXQUFXLENBQUNjLE1BQWhDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQ3pDO0FBQ0E7QUFDQSxXQUFLRSxJQUFMLENBQVVDLEVBQVYsQ0FBYWhCLFdBQVcsQ0FBQ2EsQ0FBRCxDQUF4QixFQUE2QlosZUFBN0IsRUFBOEMsSUFBOUM7QUFDSDtBQUNKLEdBZjZCO0FBZ0I5QmdCLEVBQUFBLFNBaEI4Qix1QkFnQmpCO0FBQ1QsU0FBSyxJQUFJSixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHYixXQUFXLENBQUNjLE1BQWhDLEVBQXdDRCxDQUFDLEVBQXpDLEVBQTZDO0FBQ3pDLFdBQUtFLElBQUwsQ0FBVUcsR0FBVixDQUFjbEIsV0FBVyxDQUFDYSxDQUFELENBQXpCLEVBQThCWixlQUE5QixFQUErQyxJQUEvQztBQUNIO0FBQ0o7QUFwQjZCLENBQVQsQ0FBekI7QUF1QkFHLEVBQUUsQ0FBQ0QsZ0JBQUgsR0FBc0JnQixNQUFNLENBQUNDLE9BQVAsR0FBaUJqQixnQkFBdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBCbG9ja0V2ZW50cyA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJyxcclxuICAgICAgICAgICAgICAgICAgICAgJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZScsICdtb3VzZXdoZWVsJ107XHJcblxyXG5mdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24gKGV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhpcyBjb21wb25lbnQgd2lsbCBibG9jayBhbGwgaW5wdXQgZXZlbnRzIChtb3VzZSBhbmQgdG91Y2gpIHdpdGhpbiB0aGUgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLCBwcmV2ZW50aW5nIHRoZSBpbnB1dCBmcm9tIHBlbmV0cmF0aW5nIGludG8gdGhlIHVuZGVybHlpbmcgbm9kZSwgdHlwaWNhbGx5IGZvciB0aGUgYmFja2dyb3VuZCBvZiB0aGUgdG9wIFVJLjxicj5cclxuICogVGhpcyBjb21wb25lbnQgZG9lcyBub3QgaGF2ZSBhbnkgQVBJIGludGVyZmFjZSBhbmQgY2FuIGJlIGFkZGVkIGRpcmVjdGx5IHRvIHRoZSBzY2VuZSB0byB0YWtlIGVmZmVjdC5cclxuICogISN6aFxyXG4gKiDor6Xnu4Tku7blsIbmi6bmiKrmiYDlsZ7oioLngrkgYm91bmRpbmcgYm94IOWGheeahOaJgOaciei+k+WFpeS6i+S7tu+8iOm8oOagh+WSjOinpuaRuO+8ie+8jOmYsuatoui+k+WFpeepv+mAj+WIsOS4i+WxguiKgueCue+8jOS4gOiIrOeUqOS6juS4iuWxgiBVSSDnmoTog4zmma/jgII8YnI+XHJcbiAqIOivpee7hOS7tuayoeacieS7u+S9lSBBUEkg5o6l5Y+j77yM55u05o6l5re75Yqg5Yiw5Zy65pmv5Y2z5Y+v55Sf5pWI44CCXHJcbiAqXHJcbiAqIEBjbGFzcyBCbG9ja0lucHV0RXZlbnRzXHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxuY29uc3QgQmxvY2tJbnB1dEV2ZW50cyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5CbG9ja0lucHV0RXZlbnRzJyxcclxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcclxuICAgIGVkaXRvcjoge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvQmxvY2sgSW5wdXQgRXZlbnRzJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2Jsb2NrLWlucHV0LWV2ZW50cy5qcycsXHJcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmJsb2NrX2lucHV0X2V2ZW50cycsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEJsb2NrRXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIHN1cHBseSB0aGUgJ3RoaXMnIHBhcmFtZXRlciBzbyB0aGF0IHRoZSBjYWxsYmFjayBjb3VsZCBiZSBhZGRlZCBhbmQgcmVtb3ZlZCBjb3JyZWN0bHksXHJcbiAgICAgICAgICAgIC8vIGV2ZW4gaWYgdGhlIHNhbWUgY29tcG9uZW50IGlzIGFkZGVkIG1vcmUgdGhhbiBvbmNlIHRvIGEgTm9kZS5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKEJsb2NrRXZlbnRzW2ldLCBzdG9wUHJvcGFnYXRpb24sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQmxvY2tFdmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZihCbG9ja0V2ZW50c1tpXSwgc3RvcFByb3BhZ2F0aW9uLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuQmxvY2tJbnB1dEV2ZW50cyA9IG1vZHVsZS5leHBvcnRzID0gQmxvY2tJbnB1dEV2ZW50cztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=