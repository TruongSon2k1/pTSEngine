
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCToggleGroup.js';
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
 * !#en ToggleGroup is not a visiable UI component but a way to modify the behavior of a set of Toggles.
 * Toggles that belong to the same group could only have one of them to be switched on at a time.
 * !#zh ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，
 * 任何时候只能有一个 Toggle 处于选中状态。
 * @class ToggleGroup
 * @extends Component
 */
var ToggleGroup = cc.Class({
  name: 'cc.ToggleGroup',
  "extends": cc.Component,
  ctor: function ctor() {
    this._toggleItems = [];
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/ToggleGroup (Legacy)',
    help: 'i18n:COMPONENT.help_url.toggleGroup'
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
     * !#en Read only property, return the toggle items array reference managed by toggleGroup.
     * !#zh 只读属性，返回 toggleGroup 管理的 toggle 数组引用
     * @property {Array} toggleItems
     */
    toggleItems: {
      get: function get() {
        return this._toggleItems;
      }
    }
  },
  updateToggles: function updateToggles(toggle) {
    if (!this.enabledInHierarchy) return;

    this._toggleItems.forEach(function (item) {
      if (toggle.isChecked) {
        if (item !== toggle && item.isChecked && item.enabled) {
          item._hideCheckMark();
        }
      }
    });
  },
  addToggle: function addToggle(toggle) {
    var index = this._toggleItems.indexOf(toggle);

    if (index === -1) {
      this._toggleItems.push(toggle);
    }

    this._allowOnlyOneToggleChecked();
  },
  removeToggle: function removeToggle(toggle) {
    var index = this._toggleItems.indexOf(toggle);

    if (index > -1) {
      this._toggleItems.splice(index, 1);
    }

    this._makeAtLeastOneToggleChecked();
  },
  _allowOnlyOneToggleChecked: function _allowOnlyOneToggleChecked() {
    var isChecked = false;

    this._toggleItems.forEach(function (item) {
      if (isChecked && item.enabled) {
        item._hideCheckMark();
      }

      if (item.isChecked && item.enabled) {
        isChecked = true;
      }
    });

    return isChecked;
  },
  _makeAtLeastOneToggleChecked: function _makeAtLeastOneToggleChecked() {
    var isChecked = this._allowOnlyOneToggleChecked();

    if (!isChecked && !this.allowSwitchOff) {
      if (this._toggleItems.length > 0) {
        this._toggleItems[0].isChecked = true;
      }
    }
  },
  start: function start() {
    this._makeAtLeastOneToggleChecked();
  }
});

var js = require('../platform/js');

var showed = false;
js.get(cc, 'ToggleGroup', function () {
  if (!showed) {
    cc.errorID(1405, 'cc.ToggleGroup', 'cc.ToggleContainer');
    showed = true;
  }

  return ToggleGroup;
});
module.exports = ToggleGroup;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDVG9nZ2xlR3JvdXAuanMiXSwibmFtZXMiOlsiVG9nZ2xlR3JvdXAiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsImN0b3IiLCJfdG9nZ2xlSXRlbXMiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsInByb3BlcnRpZXMiLCJhbGxvd1N3aXRjaE9mZiIsInRvb2x0aXAiLCJDQ19ERVYiLCJ0b2dnbGVJdGVtcyIsImdldCIsInVwZGF0ZVRvZ2dsZXMiLCJ0b2dnbGUiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJmb3JFYWNoIiwiaXRlbSIsImlzQ2hlY2tlZCIsImVuYWJsZWQiLCJfaGlkZUNoZWNrTWFyayIsImFkZFRvZ2dsZSIsImluZGV4IiwiaW5kZXhPZiIsInB1c2giLCJfYWxsb3dPbmx5T25lVG9nZ2xlQ2hlY2tlZCIsInJlbW92ZVRvZ2dsZSIsInNwbGljZSIsIl9tYWtlQXRMZWFzdE9uZVRvZ2dsZUNoZWNrZWQiLCJsZW5ndGgiLCJzdGFydCIsImpzIiwicmVxdWlyZSIsInNob3dlZCIsImVycm9ySUQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLElBQUksRUFBRSxnQkFEaUI7QUFFdkIsYUFBU0YsRUFBRSxDQUFDRyxTQUZXO0FBR3ZCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxZQUFMLEdBQW9C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QUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFoQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUcsS0FBYjtBQUNBRixFQUFFLENBQUNuQixHQUFILENBQU9mLEVBQVAsRUFBVyxhQUFYLEVBQTBCLFlBQVk7QUFDbEMsTUFBSSxDQUFDb0MsTUFBTCxFQUFhO0FBQ1RwQyxJQUFBQSxFQUFFLENBQUNxQyxPQUFILENBQVcsSUFBWCxFQUFpQixnQkFBakIsRUFBbUMsb0JBQW5DO0FBQ0FELElBQUFBLE1BQU0sR0FBRyxJQUFUO0FBQ0g7O0FBQ0QsU0FBT3JDLFdBQVA7QUFDSCxDQU5EO0FBUUF1QyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ4QyxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRvZ2dsZUdyb3VwIGlzIG5vdCBhIHZpc2lhYmxlIFVJIGNvbXBvbmVudCBidXQgYSB3YXkgdG8gbW9kaWZ5IHRoZSBiZWhhdmlvciBvZiBhIHNldCBvZiBUb2dnbGVzLlxyXG4gKiBUb2dnbGVzIHRoYXQgYmVsb25nIHRvIHRoZSBzYW1lIGdyb3VwIGNvdWxkIG9ubHkgaGF2ZSBvbmUgb2YgdGhlbSB0byBiZSBzd2l0Y2hlZCBvbiBhdCBhIHRpbWUuXHJcbiAqICEjemggVG9nZ2xlR3JvdXAg5LiN5piv5LiA5Liq5Y+v6KeB55qEIFVJIOe7hOS7tu+8jOWug+WPr+S7peeUqOadpeS/ruaUueS4gOe7hCBUb2dnbGUgIOe7hOS7tueahOihjOS4uuOAguW9k+S4gOe7hCBUb2dnbGUg5bGe5LqO5ZCM5LiA5LiqIFRvZ2dsZUdyb3VwIOeahOaXtuWAme+8jFxyXG4gKiDku7vkvZXml7blgJnlj6rog73mnInkuIDkuKogVG9nZ2xlIOWkhOS6jumAieS4reeKtuaAgeOAglxyXG4gKiBAY2xhc3MgVG9nZ2xlR3JvdXBcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG52YXIgVG9nZ2xlR3JvdXAgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVG9nZ2xlR3JvdXAnLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUl0ZW1zID0gW107XHJcbiAgICB9LFxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvVG9nZ2xlR3JvdXAgKExlZ2FjeSknLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC50b2dnbGVHcm91cCdcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgdGhpcyBzZXR0aW5nIGlzIHRydWUsIGEgdG9nZ2xlIGNvdWxkIGJlIHN3aXRjaGVkIG9mZiBhbmQgb24gd2hlbiBwcmVzc2VkLlxyXG4gICAgICAgICAqIElmIGl0IGlzIGZhbHNlLCBpdCB3aWxsIG1ha2Ugc3VyZSB0aGVyZSBpcyBhbHdheXMgb25seSBvbmUgdG9nZ2xlIGNvdWxkIGJlIHN3aXRjaGVkIG9uXHJcbiAgICAgICAgICogYW5kIHRoZSBhbHJlYWR5IHN3aXRjaGVkIG9uIHRvZ2dsZSBjYW4ndCBiZSBzd2l0Y2hlZCBvZmYuXHJcbiAgICAgICAgICogISN6aCDlpoLmnpzov5nkuKrorr7nva7kuLogdHJ1Ze+8jCDpgqPkuYggdG9nZ2xlIOaMiemSruWcqOiiq+eCueWHu+eahOaXtuWAmeWPr+S7peWPjeWkjeWcsOiiq+mAieS4reWSjOacqumAieS4reOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWxsb3dTd2l0Y2hPZmZcclxuICAgICAgICAgKi9cclxuICAgICAgICBhbGxvd1N3aXRjaE9mZjoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnRvZ2dsZV9ncm91cC5hbGxvd1N3aXRjaE9mZicsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBSZWFkIG9ubHkgcHJvcGVydHksIHJldHVybiB0aGUgdG9nZ2xlIGl0ZW1zIGFycmF5IHJlZmVyZW5jZSBtYW5hZ2VkIGJ5IHRvZ2dsZUdyb3VwLlxyXG4gICAgICAgICAqICEjemgg5Y+q6K+75bGe5oCn77yM6L+U5ZueIHRvZ2dsZUdyb3VwIOeuoeeQhueahCB0b2dnbGUg5pWw57uE5byV55SoXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtBcnJheX0gdG9nZ2xlSXRlbXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0b2dnbGVJdGVtczoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90b2dnbGVJdGVtcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlVG9nZ2xlczogZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIGlmKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl90b2dnbGVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKXtcclxuICAgICAgICAgICAgaWYodG9nZ2xlLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHRvZ2dsZSAmJiBpdGVtLmlzQ2hlY2tlZCAmJiBpdGVtLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLl9oaWRlQ2hlY2tNYXJrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkVG9nZ2xlOiBmdW5jdGlvbiAodG9nZ2xlKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fdG9nZ2xlSXRlbXMuaW5kZXhPZih0b2dnbGUpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlSXRlbXMucHVzaCh0b2dnbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hbGxvd09ubHlPbmVUb2dnbGVDaGVja2VkKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVRvZ2dsZTogZnVuY3Rpb24gKHRvZ2dsZSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX3RvZ2dsZUl0ZW1zLmluZGV4T2YodG9nZ2xlKTtcclxuICAgICAgICBpZihpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21ha2VBdExlYXN0T25lVG9nZ2xlQ2hlY2tlZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYWxsb3dPbmx5T25lVG9nZ2xlQ2hlY2tlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl90b2dnbGVJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmKGlzQ2hlY2tlZCAmJiBpdGVtLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uX2hpZGVDaGVja01hcmsoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXNDaGVja2VkICYmIGl0ZW0uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaXNDaGVja2VkO1xyXG4gICAgfSxcclxuXHJcbiAgICBfbWFrZUF0TGVhc3RPbmVUb2dnbGVDaGVja2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IHRoaXMuX2FsbG93T25seU9uZVRvZ2dsZUNoZWNrZWQoKTtcclxuXHJcbiAgICAgICAgaWYoIWlzQ2hlY2tlZCAmJiAhdGhpcy5hbGxvd1N3aXRjaE9mZikge1xyXG4gICAgICAgICAgICBpZih0aGlzLl90b2dnbGVJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90b2dnbGVJdGVtc1swXS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX21ha2VBdExlYXN0T25lVG9nZ2xlQ2hlY2tlZCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XHJcbnZhciBzaG93ZWQgPSBmYWxzZTtcclxuanMuZ2V0KGNjLCAnVG9nZ2xlR3JvdXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXNob3dlZCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwNSwgJ2NjLlRvZ2dsZUdyb3VwJywgJ2NjLlRvZ2dsZUNvbnRhaW5lcicpO1xyXG4gICAgICAgIHNob3dlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gVG9nZ2xlR3JvdXA7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVHcm91cDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=