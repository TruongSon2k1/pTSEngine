
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCComponentEventHandler.js';
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
 * !#en
 * Component will register a event to target component's handler.
 * And it will trigger the handler when a certain event occurs.
 *
 * !@zh
 * “EventHandler” 类用来设置场景中的事件回调，
 * 该类允许用户设置回调目标节点，目标组件名，组件方法名，
 * 并可通过 emit 方法调用目标函数。
 * @class Component.EventHandler
 * @example
 * // Let's say we have a MainMenu component on newTarget
 * // file: MainMenu.js
 * cc.Class({
 *   extends: cc.Component,
 *   // sender: the node MainMenu.js belongs to
 *   // eventType: CustomEventData
 *   onClick (sender, eventType) {
 *     cc.log('click');
 *   }
 * })
 * // Create new EventHandler
 * var eventHandler = new cc.Component.EventHandler();
 * eventHandler.target = newTarget;
 * eventHandler.component = "MainMenu";
 * eventHandler.handler = "onClick";
 * eventHandler.customEventData = "my data";
 */
cc.Component.EventHandler = cc.Class({
  name: 'cc.ClickEvent',
  properties: {
    /**
     * !#en the node that contains target callback, such as the node example script belongs to
     * !#zh 事件响应函数所在节点 ，比如例子中脚本归属的节点本身
     * @property target
     * @type {Node}
     * @default null
     */
    target: {
      "default": null,
      type: cc.Node
    },

    /**
     * !#en name of the component(script) that contains target callback, such as the name 'MainMenu' of script in example
     * !#zh 事件响应函数所在组件名（脚本名）, 比如例子中的脚本名 'MainMenu'
     * @property component
     * @type {String}
     * @default ''
     */
    // only for deserializing old project component field
    component: '',
    _componentId: '',
    _componentName: {
      get: function get() {
        this._genCompIdIfNeeded();

        return this._compId2Name(this._componentId);
      },
      set: function set(value) {
        this._componentId = this._compName2Id(value);
      }
    },

    /**
     * !#en Event handler, such as function's name 'onClick' in example
     * !#zh 响应事件函数名，比如例子中的 'onClick'
     * @property handler
     * @type {String}
     * @default ''
     */
    handler: {
      "default": ''
    },

    /**
     * !#en Custom Event Data, such as 'eventType' in example
     * !#zh 自定义事件数据，比如例子中的 eventType
     * @property customEventData
     * @default ''
     * @type {String}
     */
    customEventData: {
      "default": ''
    }
  },
  statics: {
    /**
     * @method emitEvents
     * @param {Component.EventHandler[]} events
     * @param {any} ...params
     * @static
     */
    emitEvents: function emitEvents(events) {
      'use strict';

      var args;

      if (arguments.length > 0) {
        args = new Array(arguments.length - 1);

        for (var i = 0, l = args.length; i < l; i++) {
          args[i] = arguments[i + 1];
        }
      }

      for (var _i = 0, _l = events.length; _i < _l; _i++) {
        var event = events[_i];
        if (!(event instanceof cc.Component.EventHandler)) continue;
        event.emit(args);
      }
    }
  },

  /**
   * !#en Emit event with params
   * !#zh 触发目标组件上的指定 handler 函数，该参数是回调函数的参数值（可不填）。
   * @method emit
   * @param {Array} params
   * @example
   * // Call Function
   * var eventHandler = new cc.Component.EventHandler();
   * eventHandler.target = newTarget;
   * eventHandler.component = "MainMenu";
   * eventHandler.handler = "OnClick"
   * eventHandler.emit(["param1", "param2", ....]);
   */
  emit: function emit(params) {
    var target = this.target;
    if (!cc.isValid(target)) return;

    this._genCompIdIfNeeded();

    var compType = cc.js._getClassById(this._componentId);

    var comp = target.getComponent(compType);
    if (!cc.isValid(comp)) return;
    var handler = comp[this.handler];
    if (typeof handler !== 'function') return;

    if (this.customEventData != null && this.customEventData !== '') {
      params = params.slice();
      params.push(this.customEventData);
    }

    handler.apply(comp, params);
  },
  _compName2Id: function _compName2Id(compName) {
    var comp = cc.js.getClassByName(compName);
    return cc.js._getClassId(comp);
  },
  _compId2Name: function _compId2Name(compId) {
    var comp = cc.js._getClassById(compId);

    return cc.js.getClassName(comp);
  },
  // to be deprecated in the future
  _genCompIdIfNeeded: function _genCompIdIfNeeded() {
    if (!this._componentId) {
      this._componentName = this.component;
      this.component = '';
    }
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQ29tcG9uZW50RXZlbnRIYW5kbGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ29tcG9uZW50IiwiRXZlbnRIYW5kbGVyIiwiQ2xhc3MiLCJuYW1lIiwicHJvcGVydGllcyIsInRhcmdldCIsInR5cGUiLCJOb2RlIiwiY29tcG9uZW50IiwiX2NvbXBvbmVudElkIiwiX2NvbXBvbmVudE5hbWUiLCJnZXQiLCJfZ2VuQ29tcElkSWZOZWVkZWQiLCJfY29tcElkMk5hbWUiLCJzZXQiLCJ2YWx1ZSIsIl9jb21wTmFtZTJJZCIsImhhbmRsZXIiLCJjdXN0b21FdmVudERhdGEiLCJzdGF0aWNzIiwiZW1pdEV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBcnJheSIsImkiLCJsIiwiZXZlbnQiLCJlbWl0IiwicGFyYW1zIiwiaXNWYWxpZCIsImNvbXBUeXBlIiwianMiLCJfZ2V0Q2xhc3NCeUlkIiwiY29tcCIsImdldENvbXBvbmVudCIsInNsaWNlIiwicHVzaCIsImFwcGx5IiwiY29tcE5hbWUiLCJnZXRDbGFzc0J5TmFtZSIsIl9nZXRDbGFzc0lkIiwiY29tcElkIiwiZ2V0Q2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxTQUFILENBQWFD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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDb21wb25lbnQgd2lsbCByZWdpc3RlciBhIGV2ZW50IHRvIHRhcmdldCBjb21wb25lbnQncyBoYW5kbGVyLlxyXG4gKiBBbmQgaXQgd2lsbCB0cmlnZ2VyIHRoZSBoYW5kbGVyIHdoZW4gYSBjZXJ0YWluIGV2ZW50IG9jY3Vycy5cclxuICpcclxuICogIUB6aFxyXG4gKiDigJxFdmVudEhhbmRsZXLigJ0g57G755So5p2l6K6+572u5Zy65pmv5Lit55qE5LqL5Lu25Zue6LCD77yMXHJcbiAqIOivpeexu+WFgeiuuOeUqOaIt+iuvue9ruWbnuiwg+ebruagh+iKgueCue+8jOebruagh+e7hOS7tuWQje+8jOe7hOS7tuaWueazleWQje+8jFxyXG4gKiDlubblj6/pgJrov4cgZW1pdCDmlrnms5XosIPnlKjnm67moIflh73mlbDjgIJcclxuICogQGNsYXNzIENvbXBvbmVudC5FdmVudEhhbmRsZXJcclxuICogQGV4YW1wbGVcclxuICogLy8gTGV0J3Mgc2F5IHdlIGhhdmUgYSBNYWluTWVudSBjb21wb25lbnQgb24gbmV3VGFyZ2V0XHJcbiAqIC8vIGZpbGU6IE1haW5NZW51LmpzXHJcbiAqIGNjLkNsYXNzKHtcclxuICogICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcbiAqICAgLy8gc2VuZGVyOiB0aGUgbm9kZSBNYWluTWVudS5qcyBiZWxvbmdzIHRvXHJcbiAqICAgLy8gZXZlbnRUeXBlOiBDdXN0b21FdmVudERhdGFcclxuICogICBvbkNsaWNrIChzZW5kZXIsIGV2ZW50VHlwZSkge1xyXG4gKiAgICAgY2MubG9nKCdjbGljaycpO1xyXG4gKiAgIH1cclxuICogfSlcclxuICogLy8gQ3JlYXRlIG5ldyBFdmVudEhhbmRsZXJcclxuICogdmFyIGV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAqIGV2ZW50SGFuZGxlci50YXJnZXQgPSBuZXdUYXJnZXQ7XHJcbiAqIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSBcIk1haW5NZW51XCI7XHJcbiAqIGV2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJvbkNsaWNrXCI7XHJcbiAqIGV2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBcIm15IGRhdGFcIjtcclxuICovXHJcbmNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQ2xpY2tFdmVudCcsXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiB0aGUgbm9kZSB0aGF0IGNvbnRhaW5zIHRhcmdldCBjYWxsYmFjaywgc3VjaCBhcyB0aGUgbm9kZSBleGFtcGxlIHNjcmlwdCBiZWxvbmdzIHRvXHJcbiAgICAgICAgICogISN6aCDkuovku7blk43lupTlh73mlbDmiYDlnKjoioLngrkg77yM5q+U5aaC5L6L5a2Q5Lit6ISa5pys5b2S5bGe55qE6IqC54K55pys6LqrXHJcbiAgICAgICAgICogQHByb3BlcnR5IHRhcmdldFxyXG4gICAgICAgICAqIEB0eXBlIHtOb2RlfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcclxuICAgICAgICAgKi9cclxuICAgICAgICB0YXJnZXQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gbmFtZSBvZiB0aGUgY29tcG9uZW50KHNjcmlwdCkgdGhhdCBjb250YWlucyB0YXJnZXQgY2FsbGJhY2ssIHN1Y2ggYXMgdGhlIG5hbWUgJ01haW5NZW51JyBvZiBzY3JpcHQgaW4gZXhhbXBsZVxyXG4gICAgICAgICAqICEjemgg5LqL5Lu25ZON5bqU5Ye95pWw5omA5Zyo57uE5Lu25ZCN77yI6ISa5pys5ZCN77yJLCDmr5TlpoLkvovlrZDkuK3nmoTohJrmnKzlkI0gJ01haW5NZW51J1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjb21wb25lbnRcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqIEBkZWZhdWx0ICcnXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy8gb25seSBmb3IgZGVzZXJpYWxpemluZyBvbGQgcHJvamVjdCBjb21wb25lbnQgZmllbGRcclxuICAgICAgICBjb21wb25lbnQ6ICcnLFxyXG4gICAgICAgIF9jb21wb25lbnRJZDogJycsXHJcbiAgICAgICAgX2NvbXBvbmVudE5hbWU6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dlbkNvbXBJZElmTmVlZGVkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBJZDJOYW1lKHRoaXMuX2NvbXBvbmVudElkKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50SWQgPSB0aGlzLl9jb21wTmFtZTJJZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEV2ZW50IGhhbmRsZXIsIHN1Y2ggYXMgZnVuY3Rpb24ncyBuYW1lICdvbkNsaWNrJyBpbiBleGFtcGxlXHJcbiAgICAgICAgICogISN6aCDlk43lupTkuovku7blh73mlbDlkI3vvIzmr5TlpoLkvovlrZDkuK3nmoQgJ29uQ2xpY2snXHJcbiAgICAgICAgICogQHByb3BlcnR5IGhhbmRsZXJcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqIEBkZWZhdWx0ICcnXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGFuZGxlcjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEN1c3RvbSBFdmVudCBEYXRhLCBzdWNoIGFzICdldmVudFR5cGUnIGluIGV4YW1wbGVcclxuICAgICAgICAgKiAhI3poIOiHquWumuS5ieS6i+S7tuaVsOaNru+8jOavlOWmguS+i+WtkOS4reeahCBldmVudFR5cGVcclxuICAgICAgICAgKiBAcHJvcGVydHkgY3VzdG9tRXZlbnREYXRhXHJcbiAgICAgICAgICogQGRlZmF1bHQgJydcclxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGN1c3RvbUV2ZW50RGF0YToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBtZXRob2QgZW1pdEV2ZW50c1xyXG4gICAgICAgICAqIEBwYXJhbSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSBldmVudHNcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gLi4ucGFyYW1zXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGVtaXRFdmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xyXG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgICAgICAgIGxldCBhcmdzO1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSsxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghKGV2ZW50IGluc3RhbmNlb2YgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcikpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50LmVtaXQoYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFbWl0IGV2ZW50IHdpdGggcGFyYW1zXHJcbiAgICAgKiAhI3poIOinpuWPkeebruagh+e7hOS7tuS4iueahOaMh+WumiBoYW5kbGVyIOWHveaVsO+8jOivpeWPguaVsOaYr+Wbnuiwg+WHveaVsOeahOWPguaVsOWAvO+8iOWPr+S4jeWhq++8ieOAglxyXG4gICAgICogQG1ldGhvZCBlbWl0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXNcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBDYWxsIEZ1bmN0aW9uXHJcbiAgICAgKiB2YXIgZXZlbnRIYW5kbGVyID0gbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgICAqIGV2ZW50SGFuZGxlci50YXJnZXQgPSBuZXdUYXJnZXQ7XHJcbiAgICAgKiBldmVudEhhbmRsZXIuY29tcG9uZW50ID0gXCJNYWluTWVudVwiO1xyXG4gICAgICogZXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcIk9uQ2xpY2tcIlxyXG4gICAgICogZXZlbnRIYW5kbGVyLmVtaXQoW1wicGFyYW0xXCIsIFwicGFyYW0yXCIsIC4uLi5dKTtcclxuICAgICAqL1xyXG4gICAgZW1pdDogZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0YXJnZXQpKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2dlbkNvbXBJZElmTmVlZGVkKCk7XHJcbiAgICAgICAgdmFyIGNvbXBUeXBlID0gY2MuanMuX2dldENsYXNzQnlJZCh0aGlzLl9jb21wb25lbnRJZCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNvbXAgPSB0YXJnZXQuZ2V0Q29tcG9uZW50KGNvbXBUeXBlKTtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQoY29tcCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBjb21wW3RoaXMuaGFuZGxlcl07XHJcbiAgICAgICAgaWYgKHR5cGVvZihoYW5kbGVyKSAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXN0b21FdmVudERhdGEgIT0gbnVsbCAmJiB0aGlzLmN1c3RvbUV2ZW50RGF0YSAhPT0gJycpIHtcclxuICAgICAgICAgICAgcGFyYW1zID0gcGFyYW1zLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHRoaXMuY3VzdG9tRXZlbnREYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhbmRsZXIuYXBwbHkoY29tcCwgcGFyYW1zKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NvbXBOYW1lMklkIChjb21wTmFtZSkge1xyXG4gICAgICAgIGxldCBjb21wID0gY2MuanMuZ2V0Q2xhc3NCeU5hbWUoY29tcE5hbWUpO1xyXG4gICAgICAgIHJldHVybiBjYy5qcy5fZ2V0Q2xhc3NJZChjb21wKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NvbXBJZDJOYW1lIChjb21wSWQpIHtcclxuICAgICAgICBsZXQgY29tcCA9IGNjLmpzLl9nZXRDbGFzc0J5SWQoY29tcElkKTtcclxuICAgICAgICByZXR1cm4gY2MuanMuZ2V0Q2xhc3NOYW1lKGNvbXApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB0byBiZSBkZXByZWNhdGVkIGluIHRoZSBmdXR1cmVcclxuICAgIF9nZW5Db21wSWRJZk5lZWRlZCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jb21wb25lbnRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnROYW1lID0gdGhpcy5jb21wb25lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9