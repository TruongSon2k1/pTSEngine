
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/webview/CCWebView.js';
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
var WebViewImpl = require('./webview-impl');
/**
 * !#en WebView event type
 * !#zh 网页视图事件类型
 * @enum WebView.EventType
 */


var EventType = WebViewImpl.EventType;
/**
 * !#en Web page Load completed.
 * !#zh  网页加载完成
 * @property {String} LOADED
 */

/**
 * !#en Web page is loading.
 * !#zh  网页加载中
 * @property {String} LOADING
 */

/**
 * !#en Web page error occurs when loading.
 * !#zh  网页加载出错
 * @property {String} ERROR
 */
//

function emptyCallback() {}
/**
 * !#en cc.WebView is a component for display web pages in the game. Because different platforms have different authorization, API and control methods for WebView component. And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
 * !#zh WebView 组件，用于在游戏中显示网页。由于不同平台对于 WebView 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
 * @class WebView
 * @extends Component
 */


var WebView = cc.Class({
  name: 'cc.WebView',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/WebView',
    executeInEditMode: true
  },
  properties: {
    _url: '',

    /**
     * !#en A given URL to be loaded by the WebView, it should have a http or https prefix.
     * !#zh 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
     * @property {String} url
     */
    url: {
      type: cc.String,
      tooltip: CC_DEV && 'i18n:COMPONENT.webview.url',
      get: function get() {
        return this._url;
      },
      set: function set(url) {
        this._url = url;
        var impl = this._impl;

        if (impl) {
          impl.loadURL(url);
        }
      }
    },

    /**
     * !#en The webview's event callback , it will be triggered when certain webview event occurs.
     * !#zh WebView 的回调事件，当网页加载过程中，加载完成后或者加载出错时都会回调此函数
     * @property {Component.EventHandler[]} webviewLoadedEvents
     */
    webviewEvents: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    EventType: EventType,
    // Impl will be overrided in the different platform.
    Impl: WebViewImpl
  },
  ctor: function ctor() {
    this._impl = new WebView.Impl();
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new WebView.Impl();
    }
  },
  onEnable: function onEnable() {
    var impl = this._impl;
    impl.createDomElementIfNeeded(this.node.width, this.node.height);

    if (!CC_EDITOR) {
      impl.setEventListener(EventType.LOADED, this._onWebViewLoaded.bind(this));
      impl.setEventListener(EventType.LOADING, this._onWebViewLoading.bind(this));
      impl.setEventListener(EventType.ERROR, this._onWebViewLoadError.bind(this));
    }

    impl.loadURL(this._url);
    impl.setVisible(true);
  },
  onDisable: function onDisable() {
    var impl = this._impl;
    impl.setVisible(false);

    if (!CC_EDITOR) {
      impl.setEventListener(EventType.LOADED, emptyCallback);
      impl.setEventListener(EventType.LOADING, emptyCallback);
      impl.setEventListener(EventType.ERROR, emptyCallback);
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  },
  update: function update(dt) {
    if (this._impl) {
      this._impl.updateMatrix(this.node);
    }
  },
  _onWebViewLoaded: function _onWebViewLoaded() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADED);
    this.node.emit('loaded', this);
  },
  _onWebViewLoading: function _onWebViewLoading() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.LOADING);
    this.node.emit('loading', this);
    return true;
  },
  _onWebViewLoadError: function _onWebViewLoadError() {
    cc.Component.EventHandler.emitEvents(this.webviewEvents, this, EventType.ERROR);
    this.node.emit('error', this);
  },

  /**
   * !#en
   * Set javascript interface scheme (see also setOnJSCallback). <br/>
   * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
   * Please refer to the official documentation for more details.
   * !#zh
   * 设置 JavaScript 接口方案（与 'setOnJSCallback' 配套使用）。<br/>
   * 注意：只支持 Android 和 iOS ，Web 端用法请前往官方文档查看。<br/>
   * 详情请参阅官方文档
   * @method setJavascriptInterfaceScheme
   * @param {String} scheme
   */
  setJavascriptInterfaceScheme: function setJavascriptInterfaceScheme(scheme) {
    if (this._impl) {
      this._impl.setJavascriptInterfaceScheme(scheme);
    }
  },

  /**
   * !#en
   * This callback called when load URL that start with javascript
   * interface scheme (see also setJavascriptInterfaceScheme). <br/>
   * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
   * Please refer to the official documentation for more details.
   * !#zh
   * 当加载 URL 以 JavaScript 接口方案开始时调用这个回调函数。<br/>
   * 注意：只支持 Android 和 iOS，Web 端用法请前往官方文档查看。
   * 详情请参阅官方文档
   * @method setOnJSCallback
   * @param {Function} callback
   */
  setOnJSCallback: function setOnJSCallback(callback) {
    if (this._impl) {
      this._impl.setOnJSCallback(callback);
    }
  },

  /**
   * !#en
   * Evaluates JavaScript in the context of the currently displayed page. <br/>
   * Please refer to the official document for more details <br/>
   * Note: Cross domain issues need to be resolved by yourself <br/>
   * !#zh
   * 执行 WebView 内部页面脚本（详情请参阅官方文档） <br/>
   * 注意：需要自行解决跨域问题
   * @method evaluateJS
   * @param {String} str
   */
  evaluateJS: function evaluateJS(str) {
    if (this._impl) {
      this._impl.evaluateJS(str);
    }
  }
});
cc.WebView = module.exports = WebView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event loaded
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event loading
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event error
 * @param {Event.EventCustom} event
 * @param {WebView} webView - The WebView component.
 */

/**
 * !#en if you don't need the WebView and it isn't in any running Scene, you should
 * call the destroy method on this component or the associated node explicitly.
 * Otherwise, the created DOM element won't be removed from web page.
 * !#zh
 * 如果你不再使用 WebView，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
 * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
 * @example
 * webview.node.parent = null;  // or  webview.node.removeFromParent(false);
 * // when you don't need webview anymore
 * webview.node.destroy();
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHdlYnZpZXdcXENDV2ViVmlldy5qcyJdLCJuYW1lcyI6WyJXZWJWaWV3SW1wbCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJlbXB0eUNhbGxiYWNrIiwiV2ViVmlldyIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsIl91cmwiLCJ1cmwiLCJ0eXBlIiwiU3RyaW5nIiwidG9vbHRpcCIsIkNDX0RFViIsImdldCIsInNldCIsImltcGwiLCJfaW1wbCIsImxvYWRVUkwiLCJ3ZWJ2aWV3RXZlbnRzIiwiRXZlbnRIYW5kbGVyIiwic3RhdGljcyIsIkltcGwiLCJjdG9yIiwib25SZXN0b3JlIiwib25FbmFibGUiLCJjcmVhdGVEb21FbGVtZW50SWZOZWVkZWQiLCJub2RlIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRFdmVudExpc3RlbmVyIiwiTE9BREVEIiwiX29uV2ViVmlld0xvYWRlZCIsImJpbmQiLCJMT0FESU5HIiwiX29uV2ViVmlld0xvYWRpbmciLCJFUlJPUiIsIl9vbldlYlZpZXdMb2FkRXJyb3IiLCJzZXRWaXNpYmxlIiwib25EaXNhYmxlIiwib25EZXN0cm95IiwiZGVzdHJveSIsInVwZGF0ZSIsImR0IiwidXBkYXRlTWF0cml4IiwiZW1pdEV2ZW50cyIsImVtaXQiLCJzZXRKYXZhc2NyaXB0SW50ZXJmYWNlU2NoZW1lIiwic2NoZW1lIiwic2V0T25KU0NhbGxiYWNrIiwiY2FsbGJhY2siLCJldmFsdWF0ZUpTIiwic3RyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDSUMsRUFBQUEsVUE3Sm1CLHNCQTZKUEMsR0E3Sk8sRUE2SkY7QUFDYixRQUFJLEtBQUtuQyxLQUFULEVBQWdCO0FBQ1osV0FBS0EsS0FBTCxDQUFXa0MsVUFBWCxDQUFzQkMsR0FBdEI7QUFDSDtBQUNKO0FBaktrQixDQUFULENBQWQ7QUFxS0FyRCxFQUFFLENBQUNELE9BQUgsR0FBYXVELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhELE9BQTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgV2ViVmlld0ltcGwgPSByZXF1aXJlKCcuL3dlYnZpZXctaW1wbCcpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gV2ViVmlldyBldmVudCB0eXBlXHJcbiAqICEjemgg572R6aG16KeG5Zu+5LqL5Lu257G75Z6LXHJcbiAqIEBlbnVtIFdlYlZpZXcuRXZlbnRUeXBlXHJcbiAqL1xyXG5jb25zdCBFdmVudFR5cGUgPSBXZWJWaWV3SW1wbC5FdmVudFR5cGU7XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gV2ViIHBhZ2UgTG9hZCBjb21wbGV0ZWQuXHJcbiAqICEjemggIOe9kemhteWKoOi9veWujOaIkFxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gTE9BREVEXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gV2ViIHBhZ2UgaXMgbG9hZGluZy5cclxuICogISN6aCAg572R6aG15Yqg6L295LitXHJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMT0FESU5HXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gV2ViIHBhZ2UgZXJyb3Igb2NjdXJzIHdoZW4gbG9hZGluZy5cclxuICogISN6aCAg572R6aG15Yqg6L295Ye66ZSZXHJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFUlJPUlxyXG4gKi9cclxuXHJcbi8vXHJcbmZ1bmN0aW9uIGVtcHR5Q2FsbGJhY2sgKCkgeyB9XHJcblxyXG4vKipcclxuICogISNlbiBjYy5XZWJWaWV3IGlzIGEgY29tcG9uZW50IGZvciBkaXNwbGF5IHdlYiBwYWdlcyBpbiB0aGUgZ2FtZS4gQmVjYXVzZSBkaWZmZXJlbnQgcGxhdGZvcm1zIGhhdmUgZGlmZmVyZW50IGF1dGhvcml6YXRpb24sIEFQSSBhbmQgY29udHJvbCBtZXRob2RzIGZvciBXZWJWaWV3IGNvbXBvbmVudC4gQW5kIGhhdmUgbm90IHlldCBmb3JtZWQgYSB1bmlmaWVkIHN0YW5kYXJkLCBvbmx5IFdlYiwgaU9TLCBhbmQgQW5kcm9pZCBwbGF0Zm9ybXMgYXJlIGN1cnJlbnRseSBzdXBwb3J0ZWQuXHJcbiAqICEjemggV2ViVmlldyDnu4Tku7bvvIznlKjkuo7lnKjmuLjmiI/kuK3mmL7npLrnvZHpobXjgILnlLHkuo7kuI3lkIzlubPlj7Dlr7nkuo4gV2ViVmlldyDnu4Tku7bnmoTmjojmnYPjgIFBUEnjgIHmjqfliLbmlrnlvI/pg73kuI3lkIzvvIzov5jmsqHmnInlvaLmiJDnu5/kuIDnmoTmoIflh4bvvIzmiYDku6Xnm67liY3lj6rmlK/mjIEgV2Vi44CBaU9TIOWSjCBBbmRyb2lkIOW5s+WPsOOAglxyXG4gKiBAY2xhc3MgV2ViVmlld1xyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmxldCBXZWJWaWV3ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLldlYlZpZXcnLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1dlYlZpZXcnLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfdXJsOiAnJyxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEEgZ2l2ZW4gVVJMIHRvIGJlIGxvYWRlZCBieSB0aGUgV2ViVmlldywgaXQgc2hvdWxkIGhhdmUgYSBodHRwIG9yIGh0dHBzIHByZWZpeC5cclxuICAgICAgICAgKiAhI3poIOaMh+WumiBXZWJWaWV3IOWKoOi9veeahOe9keWdgO+8jOWug+W6lOivpeaYr+S4gOS4qiBodHRwIOaIluiAhSBodHRwcyDlvIDlpLTnmoTlrZfnrKbkuLJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gdXJsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdXJsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlN0cmluZyxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53ZWJ2aWV3LnVybCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cmwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1wbCA9IHRoaXMuX2ltcGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltcGwubG9hZFVSTCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgd2VidmlldydzIGV2ZW50IGNhbGxiYWNrICwgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjZXJ0YWluIHdlYnZpZXcgZXZlbnQgb2NjdXJzLlxyXG4gICAgICAgICAqICEjemggV2ViVmlldyDnmoTlm57osIPkuovku7bvvIzlvZPnvZHpobXliqDovb3ov4fnqIvkuK3vvIzliqDovb3lrozmiJDlkI7miJbogIXliqDovb3lh7rplJnml7bpg73kvJrlm57osIPmraTlh73mlbBcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gd2Vidmlld0xvYWRlZEV2ZW50c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHdlYnZpZXdFdmVudHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlLFxyXG4gICAgICAgIC8vIEltcGwgd2lsbCBiZSBvdmVycmlkZWQgaW4gdGhlIGRpZmZlcmVudCBwbGF0Zm9ybS5cclxuICAgICAgICBJbXBsOiBXZWJWaWV3SW1wbFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFdlYlZpZXcuSW1wbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblJlc3RvcmUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFdlYlZpZXcuSW1wbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcclxuICAgICAgICBpbXBsLmNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCh0aGlzLm5vZGUud2lkdGgsIHRoaXMubm9kZS5oZWlnaHQpO1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTE9BREVELCB0aGlzLl9vbldlYlZpZXdMb2FkZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTE9BRElORywgdGhpcy5fb25XZWJWaWV3TG9hZGluZy5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5FUlJPUiwgdGhpcy5fb25XZWJWaWV3TG9hZEVycm9yLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbXBsLmxvYWRVUkwodGhpcy5fdXJsKTtcclxuICAgICAgICBpbXBsLnNldFZpc2libGUodHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgbGV0IGltcGwgPSB0aGlzLl9pbXBsO1xyXG4gICAgICAgIGltcGwuc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5MT0FERUQsIGVtcHR5Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkxPQURJTkcsIGVtcHR5Q2FsbGJhY2spO1xyXG4gICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkVSUk9SLCBlbXB0eUNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwudXBkYXRlTWF0cml4KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25XZWJWaWV3TG9hZGVkICgpIHtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy53ZWJ2aWV3RXZlbnRzLCB0aGlzLCBFdmVudFR5cGUuTE9BREVEKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnbG9hZGVkJywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbldlYlZpZXdMb2FkaW5nICgpIHtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy53ZWJ2aWV3RXZlbnRzLCB0aGlzLCBFdmVudFR5cGUuTE9BRElORyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2xvYWRpbmcnLCB0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uV2ViVmlld0xvYWRFcnJvciAoKSB7XHJcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMud2Vidmlld0V2ZW50cywgdGhpcywgRXZlbnRUeXBlLkVSUk9SKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnZXJyb3InLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgamF2YXNjcmlwdCBpbnRlcmZhY2Ugc2NoZW1lIChzZWUgYWxzbyBzZXRPbkpTQ2FsbGJhY2spLiA8YnIvPlxyXG4gICAgICogTm90ZTogU3VwcG9ydHMgb25seSBvbiB0aGUgQW5kcm9pZCBhbmQgaU9TLiBGb3IgSFRNTDUsIHBsZWFzZSByZWZlciB0byB0aGUgb2ZmaWNpYWwgZG9jdW1lbnRhdGlvbi48YnIvPlxyXG4gICAgICogUGxlYXNlIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBkb2N1bWVudGF0aW9uIGZvciBtb3JlIGRldGFpbHMuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva4gSmF2YVNjcmlwdCDmjqXlj6PmlrnmoYjvvIjkuI4gJ3NldE9uSlNDYWxsYmFjaycg6YWN5aWX5L2/55So77yJ44CCPGJyLz5cclxuICAgICAqIOazqOaEj++8muWPquaUr+aMgSBBbmRyb2lkIOWSjCBpT1Mg77yMV2ViIOerr+eUqOazleivt+WJjeW+gOWumOaWueaWh+aho+afpeeci+OAgjxici8+XHJcbiAgICAgKiDor6bmg4Xor7flj4LpmIXlrpjmlrnmlofmoaNcclxuICAgICAqIEBtZXRob2Qgc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjaGVtZVxyXG4gICAgICovXHJcbiAgICBzZXRKYXZhc2NyaXB0SW50ZXJmYWNlU2NoZW1lIChzY2hlbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLnNldEphdmFzY3JpcHRJbnRlcmZhY2VTY2hlbWUoc2NoZW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhpcyBjYWxsYmFjayBjYWxsZWQgd2hlbiBsb2FkIFVSTCB0aGF0IHN0YXJ0IHdpdGggamF2YXNjcmlwdFxyXG4gICAgICogaW50ZXJmYWNlIHNjaGVtZSAoc2VlIGFsc28gc2V0SmF2YXNjcmlwdEludGVyZmFjZVNjaGVtZSkuIDxici8+XHJcbiAgICAgKiBOb3RlOiBTdXBwb3J0cyBvbmx5IG9uIHRoZSBBbmRyb2lkIGFuZCBpT1MuIEZvciBIVE1MNSwgcGxlYXNlIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBkb2N1bWVudGF0aW9uLjxici8+XHJcbiAgICAgKiBQbGVhc2UgcmVmZXIgdG8gdGhlIG9mZmljaWFsIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgZGV0YWlscy5cclxuICAgICAqICEjemhcclxuICAgICAqIOW9k+WKoOi9vSBVUkwg5LulIEphdmFTY3JpcHQg5o6l5Y+j5pa55qGI5byA5aeL5pe26LCD55So6L+Z5Liq5Zue6LCD5Ye95pWw44CCPGJyLz5cclxuICAgICAqIOazqOaEj++8muWPquaUr+aMgSBBbmRyb2lkIOWSjCBpT1PvvIxXZWIg56uv55So5rOV6K+35YmN5b6A5a6Y5pa55paH5qGj5p+l55yL44CCXHJcbiAgICAgKiDor6bmg4Xor7flj4LpmIXlrpjmlrnmlofmoaNcclxuICAgICAqIEBtZXRob2Qgc2V0T25KU0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBzZXRPbkpTQ2FsbGJhY2sgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRPbkpTQ2FsbGJhY2soY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBFdmFsdWF0ZXMgSmF2YVNjcmlwdCBpbiB0aGUgY29udGV4dCBvZiB0aGUgY3VycmVudGx5IGRpc3BsYXllZCBwYWdlLiA8YnIvPlxyXG4gICAgICogUGxlYXNlIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBkb2N1bWVudCBmb3IgbW9yZSBkZXRhaWxzIDxici8+XHJcbiAgICAgKiBOb3RlOiBDcm9zcyBkb21haW4gaXNzdWVzIG5lZWQgdG8gYmUgcmVzb2x2ZWQgYnkgeW91cnNlbGYgPGJyLz5cclxuICAgICAqICEjemhcclxuICAgICAqIOaJp+ihjCBXZWJWaWV3IOWGhemDqOmhtemdouiEmuacrO+8iOivpuaDheivt+WPgumYheWumOaWueaWh+aho++8iSA8YnIvPlxyXG4gICAgICog5rOo5oSP77ya6ZyA6KaB6Ieq6KGM6Kej5Yaz6Leo5Z+f6Zeu6aKYXHJcbiAgICAgKiBAbWV0aG9kIGV2YWx1YXRlSlNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICAgICAqL1xyXG4gICAgZXZhbHVhdGVKUyAoc3RyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5ldmFsdWF0ZUpTKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pO1xyXG5cclxuY2MuV2ViVmlldyA9IG1vZHVsZS5leHBvcnRzID0gV2ViVmlldztcclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgbG9hZGVkXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7V2ViVmlld30gd2ViVmlldyAtIFRoZSBXZWJWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBsb2FkaW5nXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7V2ViVmlld30gd2ViVmlldyAtIFRoZSBXZWJWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBlcnJvclxyXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxyXG4gKiBAcGFyYW0ge1dlYlZpZXd9IHdlYlZpZXcgLSBUaGUgV2ViVmlldyBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW4gaWYgeW91IGRvbid0IG5lZWQgdGhlIFdlYlZpZXcgYW5kIGl0IGlzbid0IGluIGFueSBydW5uaW5nIFNjZW5lLCB5b3Ugc2hvdWxkXHJcbiAqIGNhbGwgdGhlIGRlc3Ryb3kgbWV0aG9kIG9uIHRoaXMgY29tcG9uZW50IG9yIHRoZSBhc3NvY2lhdGVkIG5vZGUgZXhwbGljaXRseS5cclxuICogT3RoZXJ3aXNlLCB0aGUgY3JlYXRlZCBET00gZWxlbWVudCB3b24ndCBiZSByZW1vdmVkIGZyb20gd2ViIHBhZ2UuXHJcbiAqICEjemhcclxuICog5aaC5p6c5L2g5LiN5YaN5L2/55SoIFdlYlZpZXfvvIzlubbkuJTnu4Tku7bmnKrmt7vliqDliLDlnLrmma/kuK3vvIzpgqPkuYjkvaDlv4XpobvmiYvliqjlr7nnu4Tku7bmiJbmiYDlnKjoioLngrnosIPnlKggZGVzdHJveeOAglxyXG4gKiDov5nmoLfmiY3og73np7vpmaTnvZHpobXkuIrnmoQgRE9NIOiKgueCue+8jOmBv+WFjSBXZWIg5bmz5Y+w5YaF5a2Y5rOE6Zyy44CCXHJcbiAqIEBleGFtcGxlXHJcbiAqIHdlYnZpZXcubm9kZS5wYXJlbnQgPSBudWxsOyAgLy8gb3IgIHdlYnZpZXcubm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICogLy8gd2hlbiB5b3UgZG9uJ3QgbmVlZCB3ZWJ2aWV3IGFueW1vcmVcclxuICogd2Vidmlldy5ub2RlLmRlc3Ryb3koKTtcclxuICogQG1ldGhvZCBkZXN0cm95XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhlIGRlc3Ryb3kgYmVpbmcgY2FsbGVkXHJcbiAqL1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==