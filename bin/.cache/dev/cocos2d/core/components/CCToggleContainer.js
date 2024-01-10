
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCToggleContainer.js';
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
 * !#en ToggleContainer is not a visiable UI component but a way to modify the behavior of a set of Toggles. <br/>
 * Toggles that belong to the same group could only have one of them to be switched on at a time.<br/>
 * Note: All the first layer child node containing the toggle component will auto be added to the container
 * !#zh ToggleContainer 不是一个可见的 UI 组件，它可以用来修改一组 Toggle 组件的行为。<br/>
 * 当一组 Toggle 属于同一个 ToggleContainer 的时候，任何时候只能有一个 Toggle 处于选中状态。<br/>
 * 注意：所有包含 Toggle 组件的一级子节点都会自动被添加到该容器中
 * @class ToggleContainer
 * @extends Component
 */
var ToggleContainer = cc.Class({
  name: 'cc.ToggleContainer',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/ToggleContainer',
    help: 'i18n:COMPONENT.help_url.toggleContainer',
    executeInEditMode: true
  },
  properties: {
    /**
     * !#en If this setting is true, a toggle could be switched off and on when pressed.
     * If it is false, it will make sure there is always only one toggle could be switched on
     * and the already switched on toggle can't be switched off.
     * !#zh 如果这个设置为 true， 那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。
     * @property {Boolean} allowSwitchOff
     */
    allowSwitchOff: {
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle_group.allowSwitchOff',
      "default": false
    },

    /**
     * !#en If Toggle is clicked, it will trigger event's handler
     * !#zh Toggle 按钮的点击事件列表。
     * @property {Component.EventHandler[]} checkEvents
     */
    checkEvents: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  updateToggles: function updateToggles(toggle) {
    if (!this.enabledInHierarchy) return;

    if (toggle.isChecked) {
      this.toggleItems.forEach(function (item) {
        if (item !== toggle && item.isChecked && item.enabled) {
          item._hideCheckMark();
        }
      });

      if (this.checkEvents) {
        cc.Component.EventHandler.emitEvents(this.checkEvents, toggle);
      }
    }
  },
  _allowOnlyOneToggleChecked: function _allowOnlyOneToggleChecked() {
    var isChecked = false;
    this.toggleItems.forEach(function (item) {
      if (isChecked) {
        item._hideCheckMark();
      } else if (item.isChecked) {
        isChecked = true;
      }
    });
    return isChecked;
  },
  _makeAtLeastOneToggleChecked: function _makeAtLeastOneToggleChecked() {
    var isChecked = this._allowOnlyOneToggleChecked();

    if (!isChecked && !this.allowSwitchOff) {
      var toggleItems = this.toggleItems;

      if (toggleItems.length > 0) {
        toggleItems[0].check();
      }
    }
  },
  onEnable: function onEnable() {
    this._makeAtLeastOneToggleChecked();

    this.node.on('child-added', this._allowOnlyOneToggleChecked, this);
    this.node.on('child-removed', this._makeAtLeastOneToggleChecked, this);
  },
  onDisable: function onDisable() {
    this.node.off('child-added', this._allowOnlyOneToggleChecked, this);
    this.node.off('child-removed', this._makeAtLeastOneToggleChecked, this);
  }
});
/**
 * !#en Read only property, return the toggle items array reference managed by ToggleContainer.
 * !#zh 只读属性，返回 ToggleContainer 管理的 toggle 数组引用
 * @property {Toggle[]} toggleItems
 */

var js = require('../platform/js');

js.get(ToggleContainer.prototype, 'toggleItems', function () {
  return this.node._children.map(function (item) {
    return item.getComponent(cc.Toggle);
  }).filter(Boolean);
});
cc.ToggleContainer = module.exports = ToggleContainer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDVG9nZ2xlQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIlRvZ2dsZUNvbnRhaW5lciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJleGVjdXRlSW5FZGl0TW9kZSIsInByb3BlcnRpZXMiLCJhbGxvd1N3aXRjaE9mZiIsInRvb2x0aXAiLCJDQ19ERVYiLCJjaGVja0V2ZW50cyIsInR5cGUiLCJFdmVudEhhbmRsZXIiLCJ1cGRhdGVUb2dnbGVzIiwidG9nZ2xlIiwiZW5hYmxlZEluSGllcmFyY2h5IiwiaXNDaGVja2VkIiwidG9nZ2xlSXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsImVuYWJsZWQiLCJfaGlkZUNoZWNrTWFyayIsImVtaXRFdmVudHMiLCJfYWxsb3dPbmx5T25lVG9nZ2xlQ2hlY2tlZCIsIl9tYWtlQXRMZWFzdE9uZVRvZ2dsZUNoZWNrZWQiLCJsZW5ndGgiLCJjaGVjayIsIm9uRW5hYmxlIiwibm9kZSIsIm9uIiwib25EaXNhYmxlIiwib2ZmIiwianMiLCJyZXF1aXJlIiwiZ2V0IiwicHJvdG90eXBlIiwiX2NoaWxkcmVuIiwibWFwIiwiZ2V0Q29tcG9uZW50IiwiVG9nZ2xlIiwiZmlsdGVyIiwiQm9vbGVhbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLGVBQWUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDM0JDLEVB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlRLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCOztBQUNBRCxFQUFFLENBQUNFLEdBQUgsQ0FBT3RDLGVBQWUsQ0FBQ3VDLFNBQXZCLEVBQWtDLGFBQWxDLEVBQ0ksWUFBWTtBQUNSLFNBQU8sS0FBS1AsSUFBTCxDQUFVUSxTQUFWLENBQW9CQyxHQUFwQixDQUF3QixVQUFVbEIsSUFBVixFQUFnQjtBQUMzQyxXQUFPQSxJQUFJLENBQUNtQixZQUFMLENBQWtCekMsRUFBRSxDQUFDMEMsTUFBckIsQ0FBUDtBQUNILEdBRk0sRUFFSkMsTUFGSSxDQUVHQyxPQUZILENBQVA7QUFHSCxDQUxMO0FBUUE1QyxFQUFFLENBQUNELGVBQUgsR0FBcUI4QyxNQUFNLENBQUNDLE9BQVAsR0FBaUIvQyxlQUF0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRvZ2dsZUNvbnRhaW5lciBpcyBub3QgYSB2aXNpYWJsZSBVSSBjb21wb25lbnQgYnV0IGEgd2F5IHRvIG1vZGlmeSB0aGUgYmVoYXZpb3Igb2YgYSBzZXQgb2YgVG9nZ2xlcy4gPGJyLz5cclxuICogVG9nZ2xlcyB0aGF0IGJlbG9uZyB0byB0aGUgc2FtZSBncm91cCBjb3VsZCBvbmx5IGhhdmUgb25lIG9mIHRoZW0gdG8gYmUgc3dpdGNoZWQgb24gYXQgYSB0aW1lLjxici8+XHJcbiAqIE5vdGU6IEFsbCB0aGUgZmlyc3QgbGF5ZXIgY2hpbGQgbm9kZSBjb250YWluaW5nIHRoZSB0b2dnbGUgY29tcG9uZW50IHdpbGwgYXV0byBiZSBhZGRlZCB0byB0aGUgY29udGFpbmVyXHJcbiAqICEjemggVG9nZ2xlQ29udGFpbmVyIOS4jeaYr+S4gOS4quWPr+ingeeahCBVSSDnu4Tku7bvvIzlroPlj6/ku6XnlKjmnaXkv67mlLnkuIDnu4QgVG9nZ2xlIOe7hOS7tueahOihjOS4uuOAgjxici8+XHJcbiAqIOW9k+S4gOe7hCBUb2dnbGUg5bGe5LqO5ZCM5LiA5LiqIFRvZ2dsZUNvbnRhaW5lciDnmoTml7blgJnvvIzku7vkvZXml7blgJnlj6rog73mnInkuIDkuKogVG9nZ2xlIOWkhOS6jumAieS4reeKtuaAgeOAgjxici8+XHJcbiAqIOazqOaEj++8muaJgOacieWMheWQqyBUb2dnbGUg57uE5Lu255qE5LiA57qn5a2Q6IqC54K56YO95Lya6Ieq5Yqo6KKr5re75Yqg5Yiw6K+l5a655Zmo5LitXHJcbiAqIEBjbGFzcyBUb2dnbGVDb250YWluZXJcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG52YXIgVG9nZ2xlQ29udGFpbmVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlRvZ2dsZUNvbnRhaW5lcicsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9Ub2dnbGVDb250YWluZXInLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC50b2dnbGVDb250YWluZXInLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIElmIHRoaXMgc2V0dGluZyBpcyB0cnVlLCBhIHRvZ2dsZSBjb3VsZCBiZSBzd2l0Y2hlZCBvZmYgYW5kIG9uIHdoZW4gcHJlc3NlZC5cclxuICAgICAgICAgKiBJZiBpdCBpcyBmYWxzZSwgaXQgd2lsbCBtYWtlIHN1cmUgdGhlcmUgaXMgYWx3YXlzIG9ubHkgb25lIHRvZ2dsZSBjb3VsZCBiZSBzd2l0Y2hlZCBvblxyXG4gICAgICAgICAqIGFuZCB0aGUgYWxyZWFkeSBzd2l0Y2hlZCBvbiB0b2dnbGUgY2FuJ3QgYmUgc3dpdGNoZWQgb2ZmLlxyXG4gICAgICAgICAqICEjemgg5aaC5p6c6L+Z5Liq6K6+572u5Li6IHRydWXvvIwg6YKj5LmIIHRvZ2dsZSDmjInpkq7lnKjooqvngrnlh7vnmoTml7blgJnlj6/ku6Xlj43lpI3lnLDooqvpgInkuK3lkozmnKrpgInkuK3jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFsbG93U3dpdGNoT2ZmXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWxsb3dTd2l0Y2hPZmY6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC50b2dnbGVfZ3JvdXAuYWxsb3dTd2l0Y2hPZmYnLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgVG9nZ2xlIGlzIGNsaWNrZWQsIGl0IHdpbGwgdHJpZ2dlciBldmVudCdzIGhhbmRsZXJcclxuICAgICAgICAgKiAhI3poIFRvZ2dsZSDmjInpkq7nmoTngrnlh7vkuovku7bliJfooajjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gY2hlY2tFdmVudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja0V2ZW50czoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlclxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVRvZ2dsZXM6IGZ1bmN0aW9uICh0b2dnbGUpIHtcclxuICAgICAgICBpZighdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRvZ2dsZS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdG9nZ2xlICYmIGl0ZW0uaXNDaGVja2VkICYmIGl0ZW0uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uX2hpZGVDaGVja01hcmsoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0V2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuY2hlY2tFdmVudHMsIHRvZ2dsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9hbGxvd09ubHlPbmVUb2dnbGVDaGVja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLl9oaWRlQ2hlY2tNYXJrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbS5pc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIGlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzQ2hlY2tlZDtcclxuICAgIH0sXHJcblxyXG4gICAgX21ha2VBdExlYXN0T25lVG9nZ2xlQ2hlY2tlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpc0NoZWNrZWQgPSB0aGlzLl9hbGxvd09ubHlPbmVUb2dnbGVDaGVja2VkKCk7XHJcblxyXG4gICAgICAgIGlmICghaXNDaGVja2VkICYmICF0aGlzLmFsbG93U3dpdGNoT2ZmKSB7XHJcbiAgICAgICAgICAgIHZhciB0b2dnbGVJdGVtcyA9IHRoaXMudG9nZ2xlSXRlbXM7XHJcbiAgICAgICAgICAgIGlmICh0b2dnbGVJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVJdGVtc1swXS5jaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX21ha2VBdExlYXN0T25lVG9nZ2xlQ2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbignY2hpbGQtYWRkZWQnLCB0aGlzLl9hbGxvd09ubHlPbmVUb2dnbGVDaGVja2VkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oJ2NoaWxkLXJlbW92ZWQnLCB0aGlzLl9tYWtlQXRMZWFzdE9uZVRvZ2dsZUNoZWNrZWQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCdjaGlsZC1hZGRlZCcsIHRoaXMuX2FsbG93T25seU9uZVRvZ2dsZUNoZWNrZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoJ2NoaWxkLXJlbW92ZWQnLCB0aGlzLl9tYWtlQXRMZWFzdE9uZVRvZ2dsZUNoZWNrZWQsIHRoaXMpO1xyXG4gICAgfSxcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBSZWFkIG9ubHkgcHJvcGVydHksIHJldHVybiB0aGUgdG9nZ2xlIGl0ZW1zIGFycmF5IHJlZmVyZW5jZSBtYW5hZ2VkIGJ5IFRvZ2dsZUNvbnRhaW5lci5cclxuICogISN6aCDlj6ror7vlsZ7mgKfvvIzov5Tlm54gVG9nZ2xlQ29udGFpbmVyIOeuoeeQhueahCB0b2dnbGUg5pWw57uE5byV55SoXHJcbiAqIEBwcm9wZXJ0eSB7VG9nZ2xlW119IHRvZ2dsZUl0ZW1zXHJcbiAqL1xyXG52YXIganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xyXG5qcy5nZXQoVG9nZ2xlQ29udGFpbmVyLnByb3RvdHlwZSwgJ3RvZ2dsZUl0ZW1zJyxcclxuICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLl9jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZSk7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuY2MuVG9nZ2xlQ29udGFpbmVyID0gbW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVDb250YWluZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9