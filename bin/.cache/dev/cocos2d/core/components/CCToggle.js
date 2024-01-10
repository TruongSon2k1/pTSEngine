
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCToggle.js';
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
var GraySpriteState = require('../utils/gray-sprite-state');
/**
 * !#en The toggle component is a CheckBox, when it used together with a ToggleGroup, it
 * could be treated as a RadioButton.
 * !#zh Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
 * @class Toggle
 * @extends Button
 * @uses GraySpriteState
 */


var Toggle = cc.Class({
  name: 'cc.Toggle',
  "extends": require('./CCButton'),
  mixins: [GraySpriteState],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Toggle',
    help: 'i18n:COMPONENT.help_url.toggle',
    inspector: 'packages://inspector/inspectors/comps/toggle.js'
  },
  properties: {
    /**
     * !#en When this value is true, the check mark component will be enabled, otherwise
     * the check mark component will be disabled.
     * !#zh 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
     * @property {Boolean} isChecked
     */
    _N$isChecked: true,
    isChecked: {
      get: function get() {
        return this._N$isChecked;
      },
      set: function set(value) {
        if (value === this._N$isChecked) {
          return;
        }

        var group = this.toggleGroup || this._toggleContainer;

        if (group && group.enabled && this._N$isChecked) {
          if (!group.allowSwitchOff) {
            return;
          }
        }

        this._N$isChecked = value;

        this._updateCheckMark();

        if (group && group.enabled) {
          group.updateToggles(this);
        }

        if (cc.Toggle._triggerEventInScript_isChecked) {
          this._emitToggleEvents();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.isChecked'
    },

    /**
     * !#en The toggle group which the toggle belongs to, when it is null, the toggle is a CheckBox.
     * Otherwise, the toggle is a RadioButton.
     * !#zh Toggle 所属的 ToggleGroup，这个属性是可选的。如果这个属性为 null，则 Toggle 是一个 CheckBox，
     * 否则，Toggle 是一个 RadioButton。
     * @property {ToggleGroup} toggleGroup
     */
    toggleGroup: {
      "default": null,
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.toggleGroup',
      type: require('./CCToggleGroup')
    },

    /**
     * !#en The image used for the checkmark.
     * !#zh Toggle 处于选中状态时显示的图片
     * @property {Sprite} checkMark
     */
    checkMark: {
      "default": null,
      type: cc.Sprite,
      tooltip: CC_DEV && 'i18n:COMPONENT.toggle.checkMark'
    },

    /**
     * !#en If Toggle is clicked, it will trigger event's handler
     * !#zh Toggle 按钮的点击事件列表。
     * @property {Component.EventHandler[]} checkEvents
     */
    checkEvents: {
      "default": [],
      type: cc.Component.EventHandler
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    }
  },
  statics: {
    _triggerEventInScript_check: false,
    _triggerEventInScript_isChecked: false
  },
  onEnable: function onEnable() {
    this._super();

    if (!CC_EDITOR) {
      this._registerToggleEvent();
    }

    if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
      this.toggleGroup.addToggle(this);
    }
  },
  onDisable: function onDisable() {
    this._super();

    if (!CC_EDITOR) {
      this._unregisterToggleEvent();
    }

    if (this.toggleGroup && this.toggleGroup.enabledInHierarchy) {
      this.toggleGroup.removeToggle(this);
    }
  },
  _hideCheckMark: function _hideCheckMark() {
    this._N$isChecked = false;

    this._updateCheckMark();
  },
  toggle: function toggle(event) {
    this.isChecked = !this.isChecked;

    if (!cc.Toggle._triggerEventInScript_isChecked && (cc.Toggle._triggerEventInScript_check || event)) {
      this._emitToggleEvents();
    }
  },

  /**
   * !#en Make the toggle button checked.
   * !#zh 使 toggle 按钮处于选中状态
   * @method check
   */
  check: function check() {
    this.isChecked = true;

    if (!cc.Toggle._triggerEventInScript_isChecked && cc.Toggle._triggerEventInScript_check) {
      this._emitToggleEvents();
    }
  },

  /**
   * !#en Make the toggle button unchecked.
   * !#zh 使 toggle 按钮处于未选中状态
   * @method uncheck
   */
  uncheck: function uncheck() {
    this.isChecked = false;

    if (!cc.Toggle._triggerEventInScript_isChecked && cc.Toggle._triggerEventInScript_check) {
      this._emitToggleEvents();
    }
  },
  _updateCheckMark: function _updateCheckMark() {
    if (this.checkMark) {
      this.checkMark.node.active = !!this.isChecked;
    }
  },
  _updateDisabledState: function _updateDisabledState() {
    this._super();

    if (this.enableAutoGrayEffect && this.checkMark) {
      var useGrayMaterial = !this.interactable;

      this._switchGrayMaterial(useGrayMaterial, this.checkMark);
    }
  },
  _registerToggleEvent: function _registerToggleEvent() {
    this.node.on('click', this.toggle, this);
  },
  _unregisterToggleEvent: function _unregisterToggleEvent() {
    this.node.off('click', this.toggle, this);
  },
  _emitToggleEvents: function _emitToggleEvents() {
    this.node.emit('toggle', this);

    if (this.checkEvents) {
      cc.Component.EventHandler.emitEvents(this.checkEvents, this);
    }
  }
});
cc.Toggle = module.exports = Toggle;

var js = require('../platform/js');

js.get(Toggle.prototype, '_toggleContainer', function () {
  var parent = this.node.parent;

  if (cc.Node.isNode(parent)) {
    return parent.getComponent(cc.ToggleContainer);
  }

  return null;
});
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event toggle
 * @param {Event.EventCustom} event
 * @param {Toggle} toggle - The Toggle component.
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDVG9nZ2xlLmpzIl0sIm5hbWVzIjpbIkdyYXlTcHJpdGVTdGF0ZSIsInJlcXVpcmUiLCJUb2dnbGUiLCJjYyIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwicHJvcGVydGllcyIsIl9OJGlzQ2hlY2tlZCIsImlzQ2hlY2tlZCIsImdldCIsInNldCIsInZhbHVlIiwiZ3JvdXAiLCJ0b2dnbGVHcm91cCIsIl90b2dnbGVDb250YWluZXIiLCJlbmFibGVkIiwiYWxsb3dTd2l0Y2hPZmYiLCJfdXBkYXRlQ2hlY2tNYXJrIiwidXBkYXRlVG9nZ2xlcyIsIl90cmlnZ2VyRXZlbnRJblNjcmlwdF9pc0NoZWNrZWQiLCJfZW1pdFRvZ2dsZUV2ZW50cyIsInRvb2x0aXAiLCJDQ19ERVYiLCJ0eXBlIiwiY2hlY2tNYXJrIiwiU3ByaXRlIiwiY2hlY2tFdmVudHMiLCJDb21wb25lbnQiLCJFdmVudEhhbmRsZXIiLCJfcmVzaXplVG9UYXJnZXQiLCJhbmltYXRhYmxlIiwiX3Jlc2l6ZU5vZGVUb1RhcmdldE5vZGUiLCJzdGF0aWNzIiwiX3RyaWdnZXJFdmVudEluU2NyaXB0X2NoZWNrIiwib25FbmFibGUiLCJfc3VwZXIiLCJfcmVnaXN0ZXJUb2dnbGVFdmVudCIsImVuYWJsZWRJbkhpZXJhcmNoeSIsImFkZFRvZ2dsZSIsIm9uRGlzYWJsZSIsIl91bnJlZ2lzdGVyVG9nZ2xlRXZlbnQiLCJyZW1vdmVUb2dnbGUiLCJfaGlkZUNoZWNrTWFyayIsInRvZ2dsZSIsImV2ZW50IiwiY2hlY2siLCJ1bmNoZWNrIiwibm9kZSIsImFjdGl2ZSIsIl91cGRhdGVEaXNhYmxlZFN0YXRlIiwiZW5hYmxlQXV0b0dyYXlFZmZlY3QiLCJ1c2VHcmF5TWF0ZXJpYWwiLCJpbnRlcmFjdGFibGUiLCJfc3dpdGNoR3JheU1hdGVyaWFsIiwib24iLCJvZmYiLCJlbWl0IiwiZW1pdEV2ZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJqcyIsInByb3RvdHlwZSIsInBhcmVudCIsIk5vZGUiLCJpc05vZGUiLCJnZXRDb21wb25lbnQiLCJUb2dnbGVDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQS9CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQkMsRUFBQUEsSUFBSSxFQUFFLFdBRFk7QUFFbEIsYUFBU0osT0FBTyxDQUFDLFlBQUQsQ0FGRTtBQUdsQkssRUFBQUEsTUFBTSxFQUFFLENBQUNOLGVBQUQsQ0FIVTtBQUlsQk8sRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSxvQ0FEVztBQUVqQkMsSUFBQUEsSUFBSSxFQUFFLGdDQUZXO0FBR2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFITSxHQUpIO0FBVWxCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsWUFBWSxFQUFFLElBUE47QUFRUkMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLRixZQUFaO0FBQ0gsT0FITTtBQUlQRyxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixZQUFJQSxLQUFLLEtBQUssS0FBS0osWUFBbkIsRUFBaUM7QUFDN0I7QUFDSDs7QUFFRCxZQUFJSyxLQUFLLEdBQUcs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YixFQUFzQixLQUFLWCxNQUEzQixFQUFtQyxJQUFuQztBQUNILEdBNUtpQjtBQThLbEJILEVBQUFBLHNCQUFzQixFQUFFLGtDQUFZO0FBQ2hDLFNBQUtPLElBQUwsQ0FBVVEsR0FBVixDQUFjLE9BQWQsRUFBdUIsS0FBS1osTUFBNUIsRUFBb0MsSUFBcEM7QUFDSCxHQWhMaUI7QUFrTGxCdkIsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVk7QUFDM0IsU0FBSzJCLElBQUwsQ0FBVVMsSUFBVixDQUFlLFFBQWYsRUFBeUIsSUFBekI7O0FBQ0EsUUFBSSxLQUFLOUIsV0FBVCxFQUFzQjtBQUNsQjdCLE1BQUFBLEVBQUUsQ0FBQzhCLFNBQUgsQ0FBYUMsWUFBYixDQUEwQjZCLFVBQTFCLENBQXFDLEtBQUsvQixXQUExQyxFQUF1RCxJQUF2RDtBQUNIO0FBQ0o7QUF2TGlCLENBQVQsQ0FBYjtBQTJMQTdCLEVBQUUsQ0FBQ0QsTUFBSCxHQUFZOEQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0QsTUFBN0I7O0FBRUEsSUFBTWdFLEVBQUUsR0FBR2pFLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFFQWlFLEVBQUUsQ0FBQ25ELEdBQUgsQ0FBT2IsTUFBTSxDQUFDaUUsU0FBZCxFQUF5QixrQkFBekIsRUFDSSxZQUFZO0FBQ1IsTUFBSUMsTUFBTSxHQUFHLEtBQUtmLElBQUwsQ0FBVWUsTUFBdkI7O0FBQ0EsTUFBSWpFLEVBQUUsQ0FBQ2tFLElBQUgsQ0FBUUMsTUFBUixDQUFlRixNQUFmLENBQUosRUFBNEI7QUFDeEIsV0FBT0EsTUFBTSxDQUFDRyxZQUFQLENBQW9CcEUsRUFBRSxDQUFDcUUsZUFBdkIsQ0FBUDtBQUNIOztBQUNELFNBQU8sSUFBUDtBQUNILENBUEw7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBHcmF5U3ByaXRlU3RhdGUgPSByZXF1aXJlKCcuLi91dGlscy9ncmF5LXNwcml0ZS1zdGF0ZScpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHRvZ2dsZSBjb21wb25lbnQgaXMgYSBDaGVja0JveCwgd2hlbiBpdCB1c2VkIHRvZ2V0aGVyIHdpdGggYSBUb2dnbGVHcm91cCwgaXRcclxuICogY291bGQgYmUgdHJlYXRlZCBhcyBhIFJhZGlvQnV0dG9uLlxyXG4gKiAhI3poIFRvZ2dsZSDmmK/kuIDkuKogQ2hlY2tCb3jvvIzlvZPlroPlkowgVG9nZ2xlR3JvdXAg5LiA6LW35L2/55So55qE5pe25YCZ77yM5Y+v5Lul5Y+Y5oiQIFJhZGlvQnV0dG9u44CCXHJcbiAqIEBjbGFzcyBUb2dnbGVcclxuICogQGV4dGVuZHMgQnV0dG9uXHJcbiAqIEB1c2VzIEdyYXlTcHJpdGVTdGF0ZVxyXG4gKi9cclxubGV0IFRvZ2dsZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Ub2dnbGUnLFxyXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ0J1dHRvbicpLFxyXG4gICAgbWl4aW5zOiBbR3JheVNwcml0ZVN0YXRlXSxcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1RvZ2dsZScsXHJcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLnRvZ2dsZScsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy90b2dnbGUuanMnLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGVuIHRoaXMgdmFsdWUgaXMgdHJ1ZSwgdGhlIGNoZWNrIG1hcmsgY29tcG9uZW50IHdpbGwgYmUgZW5hYmxlZCwgb3RoZXJ3aXNlXHJcbiAgICAgICAgICogdGhlIGNoZWNrIG1hcmsgY29tcG9uZW50IHdpbGwgYmUgZGlzYWJsZWQuXHJcbiAgICAgICAgICogISN6aCDlpoLmnpzov5nkuKrorr7nva7kuLogdHJ1Ze+8jOWImSBjaGVjayBtYXJrIOe7hOS7tuS8muWkhOS6jiBlbmFibGVkIOeKtuaAge+8jOWQpuWImeWkhOS6jiBkaXNhYmxlZCDnirbmgIHjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzQ2hlY2tlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9OJGlzQ2hlY2tlZDogdHJ1ZSxcclxuICAgICAgICBpc0NoZWNrZWQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fTiRpc0NoZWNrZWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuX04kaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBncm91cCA9IHRoaXMudG9nZ2xlR3JvdXAgfHwgdGhpcy5fdG9nZ2xlQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwICYmIGdyb3VwLmVuYWJsZWQgJiYgdGhpcy5fTiRpc0NoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3VwLmFsbG93U3dpdGNoT2ZmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX04kaXNDaGVja2VkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDaGVja01hcmsoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLnVwZGF0ZVRvZ2dsZXModGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW1pdFRvZ2dsZUV2ZW50cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnRvZ2dsZS5pc0NoZWNrZWQnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHRvZ2dsZSBncm91cCB3aGljaCB0aGUgdG9nZ2xlIGJlbG9uZ3MgdG8sIHdoZW4gaXQgaXMgbnVsbCwgdGhlIHRvZ2dsZSBpcyBhIENoZWNrQm94LlxyXG4gICAgICAgICAqIE90aGVyd2lzZSwgdGhlIHRvZ2dsZSBpcyBhIFJhZGlvQnV0dG9uLlxyXG4gICAgICAgICAqICEjemggVG9nZ2xlIOaJgOWxnueahCBUb2dnbGVHcm91cO+8jOi/meS4quWxnuaAp+aYr+WPr+mAieeahOOAguWmguaenOi/meS4quWxnuaAp+S4uiBudWxs77yM5YiZIFRvZ2dsZSDmmK/kuIDkuKogQ2hlY2tCb3jvvIxcclxuICAgICAgICAgKiDlkKbliJnvvIxUb2dnbGUg5piv5LiA5LiqIFJhZGlvQnV0dG9u44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtUb2dnbGVHcm91cH0gdG9nZ2xlR3JvdXBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0b2dnbGVHcm91cDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnRvZ2dsZS50b2dnbGVHcm91cCcsXHJcbiAgICAgICAgICAgIHR5cGU6IHJlcXVpcmUoJy4vQ0NUb2dnbGVHcm91cCcpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgaW1hZ2UgdXNlZCBmb3IgdGhlIGNoZWNrbWFyay5cclxuICAgICAgICAgKiAhI3poIFRvZ2dsZSDlpITkuo7pgInkuK3nirbmgIHml7bmmL7npLrnmoTlm77niYdcclxuICAgICAgICAgKiBAcHJvcGVydHkge1Nwcml0ZX0gY2hlY2tNYXJrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2hlY2tNYXJrOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC50b2dnbGUuY2hlY2tNYXJrJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgVG9nZ2xlIGlzIGNsaWNrZWQsIGl0IHdpbGwgdHJpZ2dlciBldmVudCdzIGhhbmRsZXJcclxuICAgICAgICAgKiAhI3poIFRvZ2dsZSDmjInpkq7nmoTngrnlh7vkuovku7bliJfooajjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gY2hlY2tFdmVudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBjaGVja0V2ZW50czoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlclxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZXNpemVUb1RhcmdldDoge1xyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZU5vZGVUb1RhcmdldE5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgX3RyaWdnZXJFdmVudEluU2NyaXB0X2NoZWNrOiBmYWxzZSxcclxuICAgICAgICBfdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkOiBmYWxzZSxcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyVG9nZ2xlRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlR3JvdXAgJiYgdGhpcy50b2dnbGVHcm91cC5lbmFibGVkSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVHcm91cC5hZGRUb2dnbGUodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VucmVnaXN0ZXJUb2dnbGVFdmVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b2dnbGVHcm91cCAmJiB0aGlzLnRvZ2dsZUdyb3VwLmVuYWJsZWRJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUdyb3VwLnJlbW92ZVRvZ2dsZSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9oaWRlQ2hlY2tNYXJrICgpIHtcclxuICAgICAgICB0aGlzLl9OJGlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNoZWNrTWFyaygpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gIXRoaXMuaXNDaGVja2VkO1xyXG4gICAgICAgIGlmICghY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9pc0NoZWNrZWQgJiYgKGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfY2hlY2sgfHwgZXZlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VtaXRUb2dnbGVFdmVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNYWtlIHRoZSB0b2dnbGUgYnV0dG9uIGNoZWNrZWQuXHJcbiAgICAgKiAhI3poIOS9vyB0b2dnbGUg5oyJ6ZKu5aSE5LqO6YCJ5Lit54q25oCBXHJcbiAgICAgKiBAbWV0aG9kIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIGNoZWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICghY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9pc0NoZWNrZWQgJiYgY2MuVG9nZ2xlLl90cmlnZ2VyRXZlbnRJblNjcmlwdF9jaGVjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbWl0VG9nZ2xlRXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTWFrZSB0aGUgdG9nZ2xlIGJ1dHRvbiB1bmNoZWNrZWQuXHJcbiAgICAgKiAhI3poIOS9vyB0b2dnbGUg5oyJ6ZKu5aSE5LqO5pyq6YCJ5Lit54q25oCBXHJcbiAgICAgKiBAbWV0aG9kIHVuY2hlY2tcclxuICAgICAqL1xyXG4gICAgdW5jaGVjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2lzQ2hlY2tlZCAmJiBjYy5Ub2dnbGUuX3RyaWdnZXJFdmVudEluU2NyaXB0X2NoZWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VtaXRUb2dnbGVFdmVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVDaGVja01hcms6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja01hcmspIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja01hcmsubm9kZS5hY3RpdmUgPSAhIXRoaXMuaXNDaGVja2VkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZURpc2FibGVkU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbmFibGVBdXRvR3JheUVmZmVjdCAmJiB0aGlzLmNoZWNrTWFyaykge1xyXG4gICAgICAgICAgICBsZXQgdXNlR3JheU1hdGVyaWFsID0gIXRoaXMuaW50ZXJhY3RhYmxlO1xyXG4gICAgICAgICAgICB0aGlzLl9zd2l0Y2hHcmF5TWF0ZXJpYWwodXNlR3JheU1hdGVyaWFsLCB0aGlzLmNoZWNrTWFyayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcmVnaXN0ZXJUb2dnbGVFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCB0aGlzLnRvZ2dsZSwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91bnJlZ2lzdGVyVG9nZ2xlRXZlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCdjbGljaycsIHRoaXMudG9nZ2xlLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2VtaXRUb2dnbGVFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgndG9nZ2xlJywgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tFdmVudHMpIHtcclxuICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuY2hlY2tFdmVudHMsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuY2MuVG9nZ2xlID0gbW9kdWxlLmV4cG9ydHMgPSBUb2dnbGU7XHJcblxyXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XHJcblxyXG5qcy5nZXQoVG9nZ2xlLnByb3RvdHlwZSwgJ190b2dnbGVDb250YWluZXInLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIGlmIChjYy5Ob2RlLmlzTm9kZShwYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlRvZ2dsZUNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgdG9nZ2xlXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7VG9nZ2xlfSB0b2dnbGUgLSBUaGUgVG9nZ2xlIGNvbXBvbmVudC5cclxuICovXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9