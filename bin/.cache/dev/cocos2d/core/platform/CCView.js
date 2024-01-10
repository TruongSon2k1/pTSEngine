
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCView.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var EventTarget = require('../event/event-target');

var js = require('../platform/js');

var renderer = require('../renderer');

require('../platform/CCClass');

var __BrowserGetter = {
  init: function init() {
    this.html = document.getElementsByTagName("html")[0];
  },
  availWidth: function availWidth(frame) {
    if (!frame || frame === this.html) return window.innerWidth;else return frame.clientWidth;
  },
  availHeight: function availHeight(frame) {
    if (!frame || frame === this.html) return window.innerHeight;else return frame.clientHeight;
  },
  meta: {
    "width": "device-width"
  },
  adaptationType: cc.sys.browserType
};
if (cc.sys.os === cc.sys.OS_IOS) // All browsers are WebView
  __BrowserGetter.adaptationType = cc.sys.BROWSER_TYPE_SAFARI;

switch (__BrowserGetter.adaptationType) {
  case cc.sys.BROWSER_TYPE_SAFARI:
  case cc.sys.BROWSER_TYPE_SOUGOU:
  case cc.sys.BROWSER_TYPE_UC:
    __BrowserGetter.meta["minimal-ui"] = "true";

    __BrowserGetter.availWidth = function (frame) {
      return frame.clientWidth;
    };

    __BrowserGetter.availHeight = function (frame) {
      return frame.clientHeight;
    };

    break;
}

var _scissorRect = null;
/**
 * cc.view is the singleton object which represents the game window.<br/>
 * It's main task include: <br/>
 *  - Apply the design resolution policy<br/>
 *  - Provide interaction with the window, like resize event on web, retina display support, etc...<br/>
 *  - Manage the game view port which can be different with the window<br/>
 *  - Manage the content scale and translation<br/>
 * <br/>
 * Since the cc.view is a singleton, you don't need to call any constructor or create functions,<br/>
 * the standard way to use it is by calling:<br/>
 *  - cc.view.methodName(); <br/>
 *
 * @class View
 * @extends EventTarget
 */

var View = function View() {
  EventTarget.call(this);

  var _t = this,
      _strategyer = cc.ContainerStrategy,
      _strategy = cc.ContentStrategy;

  __BrowserGetter.init(this); // Size of parent node that contains cc.game.container and cc.game.canvas


  _t._frameSize = cc.size(0, 0); // resolution size, it is the size appropriate for the app resources.

  _t._designResolutionSize = cc.size(0, 0);
  _t._originalDesignResolutionSize = cc.size(0, 0);
  _t._scaleX = 1;
  _t._scaleY = 1; // Viewport is the container's rect related to content's coordinates in pixel

  _t._viewportRect = cc.rect(0, 0, 0, 0); // The visible rect in content's coordinate in point

  _t._visibleRect = cc.rect(0, 0, 0, 0); // Auto full screen disabled by default

  _t._autoFullScreen = false; // The device's pixel ratio (for retina displays)

  _t._devicePixelRatio = 1;

  if (CC_JSB) {
    _t._maxPixelRatio = 4;
  } else {
    _t._maxPixelRatio = 2;
  } // Retina disabled by default


  _t._retinaEnabled = false; // Custom callback for resize event

  _t._resizeCallback = null;
  _t._resizing = false;
  _t._resizeWithBrowserSize = false;
  _t._orientationChanging = true;
  _t._isRotated = false;
  _t._orientation = cc.macro.ORIENTATION_AUTO;
  _t._isAdjustViewport = true;
  _t._antiAliasEnabled = false; // Setup system default resolution policies

  _t._resolutionPolicy = null;
  _t._rpExactFit = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
  _t._rpShowAll = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.SHOW_ALL);
  _t._rpNoBorder = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
  _t._rpFixedHeight = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
  _t._rpFixedWidth = new cc.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);
  cc.game.once(cc.game.EVENT_ENGINE_INITED, this.init, this);
};

cc.js.extend(View, EventTarget);
cc.js.mixin(View.prototype, {
  init: function init() {
    this._initFrameSize();

    var w = cc.game.canvas.width,
        h = cc.game.canvas.height;
    this._designResolutionSize.width = w;
    this._designResolutionSize.height = h;
    this._originalDesignResolutionSize.width = w;
    this._originalDesignResolutionSize.height = h;
    this._viewportRect.width = w;
    this._viewportRect.height = h;
    this._visibleRect.width = w;
    this._visibleRect.height = h;
    cc.winSize.width = this._visibleRect.width;
    cc.winSize.height = this._visibleRect.height;
    cc.visibleRect && cc.visibleRect.init(this._visibleRect);
  },
  // Resize helper functions
  _resizeEvent: function _resizeEvent(forceOrEvent) {
    var view;

    if (this.setDesignResolutionSize) {
      view = this;
    } else {
      view = cc.view;
    } // HACK: some browsers can't update window size immediately
    // need to handle resize event callback on the next tick


    var sys = cc.sys;

    if (sys.browserType === sys.BROWSER_TYPE_UC && sys.os === sys.OS_IOS) {
      setTimeout(function () {
        view._resizeEvent(forceOrEvent);
      }, 0);
      return;
    } // Check frame size changed or not


    var prevFrameW = view._frameSize.width,
        prevFrameH = view._frameSize.height,
        prevRotated = view._isRotated;

    if (cc.sys.isMobile) {
      var containerStyle = cc.game.container.style,
          margin = containerStyle.margin;
      containerStyle.margin = '0';
      containerStyle.display = 'none';

      view._initFrameSize();

      containerStyle.margin = margin;
      containerStyle.display = 'block';
    } else {
      view._initFrameSize();
    }

    if (forceOrEvent !== true && view._isRotated === prevRotated && view._frameSize.width === prevFrameW && view._frameSize.height === prevFrameH) return; // Frame size changed, do resize works

    var width = view._originalDesignResolutionSize.width;
    var height = view._originalDesignResolutionSize.height;
    view._resizing = true;
    if (width > 0) view.setDesignResolutionSize(width, height, view._resolutionPolicy);
    view._resizing = false;
    view.emit('canvas-resize');

    if (view._resizeCallback) {
      view._resizeCallback.call();
    }
  },
  _orientationChange: function _orientationChange() {
    cc.view._orientationChanging = true;

    cc.view._resizeEvent(); // HACK: show nav bar on iOS safari
    // safari will enter fullscreen when rotate to landscape
    // need to exit fullscreen when rotate back to portrait, scrollTo(0, 1) works.


    if (cc.sys.browserType === cc.sys.BROWSER_TYPE_SAFARI && cc.sys.isMobile) {
      setTimeout(function () {
        if (window.innerHeight > window.innerWidth) {
          window.scrollTo(0, 1);
        }
      }, 500);
    }
  },
  _resize: function _resize() {
    //force resize when size is changed at native
    cc.view._resizeEvent(CC_JSB);
  },

  /**
   * !#en
   * Sets view's target-densitydpi for android mobile browser. it can be set to:           <br/>
   *   1. cc.macro.DENSITYDPI_DEVICE, value is "device-dpi"                                      <br/>
   *   2. cc.macro.DENSITYDPI_HIGH, value is "high-dpi"  (default value)                         <br/>
   *   3. cc.macro.DENSITYDPI_MEDIUM, value is "medium-dpi" (browser's default value)            <br/>
   *   4. cc.macro.DENSITYDPI_LOW, value is "low-dpi"                                            <br/>
   *   5. Custom value, e.g: "480"                                                         <br/>
   * !#zh 设置目标内容的每英寸像素点密度。
   *
   * @method setTargetDensityDPI
   * @param {String} densityDPI
   * @deprecated since v2.0
   */

  /**
   * !#en
   * Returns the current target-densitydpi value of cc.view.
   * !#zh 获取目标内容的每英寸像素点密度。
   * @method getTargetDensityDPI
   * @returns {String}
   * @deprecated since v2.0
   */

  /**
   * !#en
   * Sets whether resize canvas automatically when browser's size changed.<br/>
   * Useful only on web.
   * !#zh 设置当发现浏览器的尺寸改变时，是否自动调整 canvas 尺寸大小。
   * 仅在 Web 模式下有效。
   * @method resizeWithBrowserSize
   * @param {Boolean} enabled - Whether enable automatic resize with browser's resize event
   */
  resizeWithBrowserSize: function resizeWithBrowserSize(enabled) {
    if (enabled) {
      //enable
      if (!this._resizeWithBrowserSize) {
        this._resizeWithBrowserSize = true;
        window.addEventListener('resize', this._resize);
        window.addEventListener('orientationchange', this._orientationChange);
      }
    } else {
      //disable
      if (this._resizeWithBrowserSize) {
        this._resizeWithBrowserSize = false;
        window.removeEventListener('resize', this._resize);
        window.removeEventListener('orientationchange', this._orientationChange);
      }
    }
  },

  /**
   * !#en
   * Sets the callback function for cc.view's resize action,<br/>
   * this callback will be invoked before applying resolution policy, <br/>
   * so you can do any additional modifications within the callback.<br/>
   * Useful only on web.
   * !#zh 设置 cc.view 调整视窗尺寸行为的回调函数，
   * 这个回调函数会在应用适配模式之前被调用，
   * 因此你可以在这个回调函数内添加任意附加改变，
   * 仅在 Web 平台下有效。
   * @method setResizeCallback
   * @param {Function|Null} callback - The callback function
   */
  setResizeCallback: function setResizeCallback(callback) {
    if (CC_EDITOR) return;

    if (typeof callback === 'function' || callback == null) {
      this._resizeCallback = callback;
    }
  },

  /**
   * !#en
   * Sets the orientation of the game, it can be landscape, portrait or auto.
   * When set it to landscape or portrait, and screen w/h ratio doesn't fit,
   * cc.view will automatically rotate the game canvas using CSS.
   * Note that this function doesn't have any effect in native,
   * in native, you need to set the application orientation in native project settings
   * !#zh 设置游戏屏幕朝向，它能够是横版，竖版或自动。
   * 当设置为横版或竖版，并且屏幕的宽高比例不匹配时，
   * cc.view 会自动用 CSS 旋转游戏场景的 canvas，
   * 这个方法不会对 native 部分产生任何影响，对于 native 而言，你需要在应用设置中的设置排版。
   * @method setOrientation
   * @param {Number} orientation - Possible values: cc.macro.ORIENTATION_LANDSCAPE | cc.macro.ORIENTATION_PORTRAIT | cc.macro.ORIENTATION_AUTO
   */
  setOrientation: function setOrientation(orientation) {
    orientation = orientation & cc.macro.ORIENTATION_AUTO;

    if (orientation && this._orientation !== orientation) {
      this._orientation = orientation;
      var designWidth = this._originalDesignResolutionSize.width;
      var designHeight = this._originalDesignResolutionSize.height;
      this.setDesignResolutionSize(designWidth, designHeight, this._resolutionPolicy);
    }
  },
  _initFrameSize: function _initFrameSize() {
    var locFrameSize = this._frameSize;

    var w = __BrowserGetter.availWidth(cc.game.frame);

    var h = __BrowserGetter.availHeight(cc.game.frame);

    var isLandscape = w >= h;

    if (CC_EDITOR || !cc.sys.isMobile || isLandscape && this._orientation & cc.macro.ORIENTATION_LANDSCAPE || !isLandscape && this._orientation & cc.macro.ORIENTATION_PORTRAIT) {
      locFrameSize.width = w;
      locFrameSize.height = h;
      cc.game.container.style['-webkit-transform'] = 'rotate(0deg)';
      cc.game.container.style.transform = 'rotate(0deg)';
      this._isRotated = false;
    } else {
      locFrameSize.width = h;
      locFrameSize.height = w;
      cc.game.container.style['-webkit-transform'] = 'rotate(90deg)';
      cc.game.container.style.transform = 'rotate(90deg)';
      cc.game.container.style['-webkit-transform-origin'] = '0px 0px 0px';
      cc.game.container.style.transformOrigin = '0px 0px 0px';
      this._isRotated = true;
    }

    if (this._orientationChanging) {
      setTimeout(function () {
        cc.view._orientationChanging = false;
      }, 1000);
    }
  },
  _setViewportMeta: function _setViewportMeta(metas, overwrite) {
    var vp = document.getElementById("cocosMetaElement");

    if (vp && overwrite) {
      document.head.removeChild(vp);
    }

    var elems = document.getElementsByName("viewport"),
        currentVP = elems ? elems[0] : null,
        content,
        key,
        pattern;
    content = currentVP ? currentVP.content : "";
    vp = vp || document.createElement("meta");
    vp.id = "cocosMetaElement";
    vp.name = "viewport";
    vp.content = "";

    for (key in metas) {
      if (content.indexOf(key) == -1) {
        content += "," + key + "=" + metas[key];
      } else if (overwrite) {
        pattern = new RegExp(key + "\s*=\s*[^,]+");
        content = content.replace(pattern, key + "=" + metas[key]);
      }
    }

    if (/^,/.test(content)) content = content.substr(1);
    vp.content = content; // For adopting certain android devices which don't support second viewport

    if (currentVP) currentVP.content = content;
    document.head.appendChild(vp);
  },
  _adjustViewportMeta: function _adjustViewportMeta() {
    if (this._isAdjustViewport && !CC_JSB && !CC_RUNTIME) {
      this._setViewportMeta(__BrowserGetter.meta, false);

      this._isAdjustViewport = false;
    }
  },

  /**
   * !#en
   * Sets whether the engine modify the "viewport" meta in your web page.<br/>
   * It's enabled by default, we strongly suggest you not to disable it.<br/>
   * And even when it's enabled, you can still set your own "viewport" meta, it won't be overridden<br/>
   * Only useful on web
   * !#zh 设置引擎是否调整 viewport meta 来配合屏幕适配。
   * 默认设置为启动，我们强烈建议你不要将它设置为关闭。
   * 即使当它启动时，你仍然能够设置你的 viewport meta，它不会被覆盖。
   * 仅在 Web 模式下有效
   * @method adjustViewportMeta
   * @param {Boolean} enabled - Enable automatic modification to "viewport" meta
   */
  adjustViewportMeta: function adjustViewportMeta(enabled) {
    this._isAdjustViewport = enabled;
  },

  /**
   * !#en
   * Retina support is enabled by default for Apple device but disabled for other devices,<br/>
   * it takes effect only when you called setDesignResolutionPolicy<br/>
   * Only useful on web
   * !#zh 对于 Apple 这种支持 Retina 显示的设备上默认进行优化而其他类型设备默认不进行优化，
   * 它仅会在你调用 setDesignResolutionPolicy 方法时有影响。
   * 仅在 Web 模式下有效。
   * @method enableRetina
   * @param {Boolean} enabled - Enable or disable retina display
   */
  enableRetina: function enableRetina(enabled) {
    if (CC_EDITOR && enabled) {
      cc.warn('Can not enable retina in Editor.');
      return;
    }

    this._retinaEnabled = !!enabled;
  },

  /**
   * !#en
   * Check whether retina display is enabled.<br/>
   * Only useful on web
   * !#zh 检查是否对 Retina 显示设备进行优化。
   * 仅在 Web 模式下有效。
   * @method isRetinaEnabled
   * @return {Boolean}
   */
  isRetinaEnabled: function isRetinaEnabled() {
    if (CC_EDITOR) {
      return false;
    }

    return this._retinaEnabled;
  },

  /**
   * !#en Whether to Enable on anti-alias
   * !#zh 控制抗锯齿是否开启
   * @method enableAntiAlias
   * @param {Boolean} enabled - Enable or not anti-alias
   * @deprecated cc.view.enableAntiAlias is deprecated, please use cc.Texture2D.setFilters instead
   * @since v2.3.0
   */
  enableAntiAlias: function enableAntiAlias(enabled) {
    cc.warnID(9200);

    if (this._antiAliasEnabled === enabled) {
      return;
    }

    this._antiAliasEnabled = enabled;

    if (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL) {
      var cache = cc.assetManager.assets;
      cache.forEach(function (asset) {
        if (asset instanceof cc.Texture2D) {
          var Filter = cc.Texture2D.Filter;

          if (enabled) {
            asset.setFilters(Filter.LINEAR, Filter.LINEAR);
          } else {
            asset.setFilters(Filter.NEAREST, Filter.NEAREST);
          }
        }
      });
    } else if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      var ctx = cc.game.canvas.getContext('2d');
      ctx.imageSmoothingEnabled = enabled;
      ctx.mozImageSmoothingEnabled = enabled;
    }
  },

  /**
   * !#en Returns whether the current enable on anti-alias
   * !#zh 返回当前是否抗锯齿
   * @method isAntiAliasEnabled
   * @return {Boolean}
   */
  isAntiAliasEnabled: function isAntiAliasEnabled() {
    return this._antiAliasEnabled;
  },

  /**
   * !#en
   * If enabled, the application will try automatically to enter full screen mode on mobile devices<br/>
   * You can pass true as parameter to enable it and disable it by passing false.<br/>
   * Only useful on web
   * !#zh 启动时，移动端游戏会在移动端自动尝试进入全屏模式。
   * 你能够传入 true 为参数去启动它，用 false 参数来关闭它。
   * @method enableAutoFullScreen
   * @param {Boolean} enabled - Enable or disable auto full screen on mobile devices
   */
  enableAutoFullScreen: function enableAutoFullScreen(enabled) {
    if (enabled && enabled !== this._autoFullScreen && cc.sys.isMobile) {
      // Automatically full screen when user touches on mobile version
      this._autoFullScreen = true;
      cc.screen.autoFullScreen(cc.game.frame);
    } else {
      this._autoFullScreen = false;
      cc.screen.disableAutoFullScreen(cc.game.frame);
    }
  },

  /**
   * !#en
   * Check whether auto full screen is enabled.<br/>
   * Only useful on web
   * !#zh 检查自动进入全屏模式是否启动。
   * 仅在 Web 模式下有效。
   * @method isAutoFullScreenEnabled
   * @return {Boolean} Auto full screen enabled or not
   */
  isAutoFullScreenEnabled: function isAutoFullScreenEnabled() {
    return this._autoFullScreen;
  },

  /*
   * Not support on native.<br/>
   * On web, it sets the size of the canvas.
   * !#zh 这个方法并不支持 native 平台，在 Web 平台下，可以用来设置 canvas 尺寸。
   * @method setCanvasSize
   * @param {Number} width
   * @param {Number} height
   */
  setCanvasSize: function setCanvasSize(width, height) {
    var canvas = cc.game.canvas;
    var container = cc.game.container;
    canvas.width = width * this._devicePixelRatio;
    canvas.height = height * this._devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    container.style.width = width + 'px';
    container.style.height = height + 'px';

    this._resizeEvent();
  },

  /**
   * !#en
   * Returns the canvas size of the view.<br/>
   * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
   * On web, it returns the size of the canvas element.
   * !#zh 返回视图中 canvas 的尺寸。
   * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
   * 在 Web 平台下，它返回 canvas 元素尺寸。
   * @method getCanvasSize
   * @return {Size}
   */
  getCanvasSize: function getCanvasSize() {
    return cc.size(cc.game.canvas.width, cc.game.canvas.height);
  },

  /**
   * !#en
   * Returns the frame size of the view.<br/>
   * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
   * On web, it returns the size of the canvas's outer DOM element.
   * !#zh 返回视图中边框尺寸。
   * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
   * 在 web 平台下，它返回 canvas 元素的外层 DOM 元素尺寸。
   * @method getFrameSize
   * @return {Size}
   */
  getFrameSize: function getFrameSize() {
    return cc.size(this._frameSize.width, this._frameSize.height);
  },

  /**
   * !#en
   * On native, it sets the frame size of view.<br/>
   * On web, it sets the size of the canvas's outer DOM element.
   * !#zh 在 native 平台下，设置视图框架尺寸。
   * 在 web 平台下，设置 canvas 外层 DOM 元素尺寸。
   * @method setFrameSize
   * @param {Number} width
   * @param {Number} height
   */
  setFrameSize: function setFrameSize(width, height) {
    this._frameSize.width = width;
    this._frameSize.height = height;
    cc.game.frame.style.width = width + "px";
    cc.game.frame.style.height = height + "px";

    this._resizeEvent(true);
  },

  /**
   * !#en
   * Returns the visible area size of the view port.
   * !#zh 返回视图窗口可见区域尺寸。
   * @method getVisibleSize
   * @return {Size}
   */
  getVisibleSize: function getVisibleSize() {
    return cc.size(this._visibleRect.width, this._visibleRect.height);
  },

  /**
   * !#en
   * Returns the visible area size of the view port.
   * !#zh 返回视图窗口可见区域像素尺寸。
   * @method getVisibleSizeInPixel
   * @return {Size}
   */
  getVisibleSizeInPixel: function getVisibleSizeInPixel() {
    return cc.size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY);
  },

  /**
   * !#en
   * Returns the visible origin of the view port.
   * !#zh 返回视图窗口可见区域原点。
   * @method getVisibleOrigin
   * @return {Vec2}
   */
  getVisibleOrigin: function getVisibleOrigin() {
    return cc.v2(this._visibleRect.x, this._visibleRect.y);
  },

  /**
   * !#en
   * Returns the visible origin of the view port.
   * !#zh 返回视图窗口可见区域像素原点。
   * @method getVisibleOriginInPixel
   * @return {Vec2}
   */
  getVisibleOriginInPixel: function getVisibleOriginInPixel() {
    return cc.v2(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY);
  },

  /**
   * !#en
   * Returns the current resolution policy
   * !#zh 返回当前分辨率方案
   * @see cc.ResolutionPolicy
   * @method getResolutionPolicy
   * @return {ResolutionPolicy}
   */
  getResolutionPolicy: function getResolutionPolicy() {
    return this._resolutionPolicy;
  },

  /**
   * !#en
   * Sets the current resolution policy
   * !#zh 设置当前分辨率模式
   * @see cc.ResolutionPolicy
   * @method setResolutionPolicy
   * @param {ResolutionPolicy|Number} resolutionPolicy
   */
  setResolutionPolicy: function setResolutionPolicy(resolutionPolicy) {
    var _t = this;

    if (resolutionPolicy instanceof cc.ResolutionPolicy) {
      _t._resolutionPolicy = resolutionPolicy;
    } // Ensure compatibility with JSB
    else {
        var _locPolicy = cc.ResolutionPolicy;
        if (resolutionPolicy === _locPolicy.EXACT_FIT) _t._resolutionPolicy = _t._rpExactFit;
        if (resolutionPolicy === _locPolicy.SHOW_ALL) _t._resolutionPolicy = _t._rpShowAll;
        if (resolutionPolicy === _locPolicy.NO_BORDER) _t._resolutionPolicy = _t._rpNoBorder;
        if (resolutionPolicy === _locPolicy.FIXED_HEIGHT) _t._resolutionPolicy = _t._rpFixedHeight;
        if (resolutionPolicy === _locPolicy.FIXED_WIDTH) _t._resolutionPolicy = _t._rpFixedWidth;
      }
  },

  /**
   * !#en
   * Sets the resolution policy with designed view size in points.<br/>
   * The resolution policy include: <br/>
   * [1] ResolutionExactFit       Fill screen by stretch-to-fit: if the design resolution ratio of width to height is different from the screen resolution ratio, your game view will be stretched.<br/>
   * [2] ResolutionNoBorder       Full screen without black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two areas of your game view will be cut.<br/>
   * [3] ResolutionShowAll        Full screen with black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two black borders will be shown.<br/>
   * [4] ResolutionFixedHeight    Scale the content's height to screen's height and proportionally scale its width<br/>
   * [5] ResolutionFixedWidth     Scale the content's width to screen's width and proportionally scale its height<br/>
   * [cc.ResolutionPolicy]        [Web only feature] Custom resolution policy, constructed by cc.ResolutionPolicy<br/>
   * !#zh 通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配。
   * @method setDesignResolutionSize
   * @param {Number} width Design resolution width.
   * @param {Number} height Design resolution height.
   * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
   */
  setDesignResolutionSize: function setDesignResolutionSize(width, height, resolutionPolicy) {
    // Defensive code
    if (!(width > 0 && height > 0)) {
      cc.errorID(2200);
      return;
    }

    this.setResolutionPolicy(resolutionPolicy);
    var policy = this._resolutionPolicy;

    if (policy) {
      policy.preApply(this);
    } // Reinit frame size


    if (cc.sys.isMobile) this._adjustViewportMeta(); // Permit to re-detect the orientation of device.

    this._orientationChanging = true; // If resizing, then frame size is already initialized, this logic should be improved

    if (!this._resizing) this._initFrameSize();

    if (!policy) {
      cc.logID(2201);
      return;
    }

    this._originalDesignResolutionSize.width = this._designResolutionSize.width = width;
    this._originalDesignResolutionSize.height = this._designResolutionSize.height = height;
    var result = policy.apply(this, this._designResolutionSize);

    if (result.scale && result.scale.length === 2) {
      this._scaleX = result.scale[0];
      this._scaleY = result.scale[1];
    }

    if (result.viewport) {
      var vp = this._viewportRect,
          vb = this._visibleRect,
          rv = result.viewport;
      vp.x = rv.x;
      vp.y = rv.y;
      vp.width = rv.width;
      vp.height = rv.height;
      vb.x = 0;
      vb.y = 0;
      vb.width = rv.width / this._scaleX;
      vb.height = rv.height / this._scaleY;
    }

    policy.postApply(this);
    cc.winSize.width = this._visibleRect.width;
    cc.winSize.height = this._visibleRect.height;
    cc.visibleRect && cc.visibleRect.init(this._visibleRect);
    renderer.updateCameraViewport();

    cc.internal.inputManager._updateCanvasBoundingRect();

    this.emit('design-resolution-changed');
  },

  /**
   * !#en
   * Returns the designed size for the view.
   * Default resolution size is the same as 'getFrameSize'.
   * !#zh 返回视图的设计分辨率。
   * 默认下分辨率尺寸同 `getFrameSize` 方法相同
   * @method getDesignResolutionSize
   * @return {Size}
   */
  getDesignResolutionSize: function getDesignResolutionSize() {
    return cc.size(this._designResolutionSize.width, this._designResolutionSize.height);
  },

  /**
   * !#en
   * Sets the container to desired pixel resolution and fit the game content to it.
   * This function is very useful for adaptation in mobile browsers.
   * In some HD android devices, the resolution is very high, but its browser performance may not be very good.
   * In this case, enabling retina display is very costy and not suggested, and if retina is disabled, the image may be blurry.
   * But this API can be helpful to set a desired pixel resolution which is in between.
   * This API will do the following:
   *     1. Set viewport's width to the desired width in pixel
   *     2. Set body width to the exact pixel resolution
   *     3. The resolution policy will be reset with designed view size in points.
   * !#zh 设置容器（container）需要的像素分辨率并且适配相应分辨率的游戏内容。
   * @method setRealPixelResolution
   * @param {Number} width Design resolution width.
   * @param {Number} height Design resolution height.
   * @param {ResolutionPolicy|Number} resolutionPolicy The resolution policy desired
   */
  setRealPixelResolution: function setRealPixelResolution(width, height, resolutionPolicy) {
    if (!CC_JSB && !CC_RUNTIME) {
      // Set viewport's width
      this._setViewportMeta({
        "width": width
      }, true); // Set body width to the exact pixel resolution


      document.documentElement.style.width = width + "px";
      document.body.style.width = width + "px";
      document.body.style.left = "0px";
      document.body.style.top = "0px";
    } // Reset the resolution size and policy


    this.setDesignResolutionSize(width, height, resolutionPolicy);
  },

  /**
   * !#en
   * Sets view port rectangle with points.
   * !#zh 用设计分辨率下的点尺寸来设置视窗。
   * @method setViewportInPoints
   * @deprecated since v2.0
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w width
   * @param {Number} h height
   */
  setViewportInPoints: function setViewportInPoints(x, y, w, h) {
    var locScaleX = this._scaleX,
        locScaleY = this._scaleY;

    cc.game._renderContext.viewport(x * locScaleX + this._viewportRect.x, y * locScaleY + this._viewportRect.y, w * locScaleX, h * locScaleY);
  },

  /**
   * !#en
   * Sets Scissor rectangle with points.
   * !#zh 用设计分辨率下的点的尺寸来设置 scissor 剪裁区域。
   * @method setScissorInPoints
   * @deprecated since v2.0
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  setScissorInPoints: function setScissorInPoints(x, y, w, h) {
    var scaleX = this._scaleX,
        scaleY = this._scaleY;
    var sx = Math.ceil(x * scaleX + this._viewportRect.x);
    var sy = Math.ceil(y * scaleY + this._viewportRect.y);
    var sw = Math.ceil(w * scaleX);
    var sh = Math.ceil(h * scaleY);
    var gl = cc.game._renderContext;

    if (!_scissorRect) {
      var boxArr = gl.getParameter(gl.SCISSOR_BOX);
      _scissorRect = cc.rect(boxArr[0], boxArr[1], boxArr[2], boxArr[3]);
    }

    if (_scissorRect.x !== sx || _scissorRect.y !== sy || _scissorRect.width !== sw || _scissorRect.height !== sh) {
      _scissorRect.x = sx;
      _scissorRect.y = sy;
      _scissorRect.width = sw;
      _scissorRect.height = sh;
      gl.scissor(sx, sy, sw, sh);
    }
  },

  /**
   * !#en
   * Returns whether GL_SCISSOR_TEST is enable
   * !#zh 检查 scissor 是否生效。
   * @method isScissorEnabled
   * @deprecated since v2.0
   * @return {Boolean}
   */
  isScissorEnabled: function isScissorEnabled() {
    return cc.game._renderContext.isEnabled(gl.SCISSOR_TEST);
  },

  /**
   * !#en
   * Returns the current scissor rectangle
   * !#zh 返回当前的 scissor 剪裁区域。
   * @method getScissorRect
   * @deprecated since v2.0
   * @return {Rect}
   */
  getScissorRect: function getScissorRect() {
    if (!_scissorRect) {
      var boxArr = gl.getParameter(gl.SCISSOR_BOX);
      _scissorRect = cc.rect(boxArr[0], boxArr[1], boxArr[2], boxArr[3]);
    }

    var scaleXFactor = 1 / this._scaleX;
    var scaleYFactor = 1 / this._scaleY;
    return cc.rect((_scissorRect.x - this._viewportRect.x) * scaleXFactor, (_scissorRect.y - this._viewportRect.y) * scaleYFactor, _scissorRect.width * scaleXFactor, _scissorRect.height * scaleYFactor);
  },

  /**
   * !#en
   * Returns the view port rectangle.
   * !#zh 返回视窗剪裁区域。
   * @method getViewportRect
   * @return {Rect}
   */
  getViewportRect: function getViewportRect() {
    return this._viewportRect;
  },

  /**
   * !#en
   * Returns scale factor of the horizontal direction (X axis).
   * !#zh 返回横轴的缩放比，这个缩放比是将画布像素分辨率放到设计分辨率的比例。
   * @method getScaleX
   * @return {Number}
   */
  getScaleX: function getScaleX() {
    return this._scaleX;
  },

  /**
   * !#en
   * Returns scale factor of the vertical direction (Y axis).
   * !#zh 返回纵轴的缩放比，这个缩放比是将画布像素分辨率缩放到设计分辨率的比例。
   * @method getScaleY
   * @return {Number}
   */
  getScaleY: function getScaleY() {
    return this._scaleY;
  },

  /**
   * !#en
   * Returns device pixel ratio for retina display.
   * !#zh 返回设备或浏览器像素比例。
   * @method getDevicePixelRatio
   * @return {Number}
   */
  getDevicePixelRatio: function getDevicePixelRatio() {
    return this._devicePixelRatio;
  },

  /**
   * !#en
   * Returns the real location in view for a translation based on a related position
   * !#zh 将屏幕坐标转换为游戏视图下的坐标。
   * @method convertToLocationInView
   * @param {Number} tx - The X axis translation
   * @param {Number} ty - The Y axis translation
   * @param {Object} relatedPos - The related position object including "left", "top", "width", "height" informations
   * @return {Vec2}
   */
  convertToLocationInView: function convertToLocationInView(tx, ty, relatedPos, out) {
    var result = out || cc.v2();
    var posLeft = relatedPos.adjustedLeft ? relatedPos.adjustedLeft : relatedPos.left;
    var posTop = relatedPos.adjustedTop ? relatedPos.adjustedTop : relatedPos.top;
    var x = this._devicePixelRatio * (tx - posLeft);
    var y = this._devicePixelRatio * (posTop + relatedPos.height - ty);

    if (this._isRotated) {
      result.x = cc.game.canvas.width - y;
      result.y = x;
    } else {
      result.x = x;
      result.y = y;
    }

    return result;
  },
  _convertMouseToLocationInView: function _convertMouseToLocationInView(in_out_point, relatedPos) {
    var viewport = this._viewportRect,
        _t = this;

    in_out_point.x = (_t._devicePixelRatio * (in_out_point.x - relatedPos.left) - viewport.x) / _t._scaleX;
    in_out_point.y = (_t._devicePixelRatio * (relatedPos.top + relatedPos.height - in_out_point.y) - viewport.y) / _t._scaleY;
  },
  _convertPointWithScale: function _convertPointWithScale(point) {
    var viewport = this._viewportRect;
    point.x = (point.x - viewport.x) / this._scaleX;
    point.y = (point.y - viewport.y) / this._scaleY;
  },
  _convertTouchesWithScale: function _convertTouchesWithScale(touches) {
    var viewport = this._viewportRect,
        scaleX = this._scaleX,
        scaleY = this._scaleY,
        selTouch,
        selPoint,
        selPrePoint;

    for (var i = 0; i < touches.length; i++) {
      selTouch = touches[i];
      selPoint = selTouch._point;
      selPrePoint = selTouch._prevPoint;
      selPoint.x = (selPoint.x - viewport.x) / scaleX;
      selPoint.y = (selPoint.y - viewport.y) / scaleY;
      selPrePoint.x = (selPrePoint.x - viewport.x) / scaleX;
      selPrePoint.y = (selPrePoint.y - viewport.y) / scaleY;
    }
  }
});
/**
 * !#en
 * Emit when design resolution changed.
 * !#zh
 * 当设计分辨率改变时发送。
 * @event design-resolution-changed
 */

/**
* !#en
* Emit when canvas resize.
* !#zh
* 当画布大小改变时发送。
* @event canvas-resize
*/

/**
 * <p>cc.game.containerStrategy class is the root strategy class of container's scale strategy,
 * it controls the behavior of how to scale the cc.game.container and cc.game.canvas object</p>
 *
 * @class ContainerStrategy
 */

cc.ContainerStrategy = cc.Class({
  name: "ContainerStrategy",

  /**
   * !#en
   * Manipulation before appling the strategy
   * !#zh 在应用策略之前的操作
   * @method preApply
   * @param {View} view - The target view
   */
  preApply: function preApply(view) {},

  /**
   * !#en
   * Function to apply this strategy
   * !#zh 策略应用方法
   * @method apply
   * @param {View} view
   * @param {Size} designedResolution
   */
  apply: function apply(view, designedResolution) {},

  /**
   * !#en
   * Manipulation after applying the strategy
   * !#zh 策略调用之后的操作
   * @method postApply
   * @param {View} view  The target view
   */
  postApply: function postApply(view) {},
  _setupContainer: function _setupContainer(view, w, h) {
    var locCanvas = cc.game.canvas;

    this._setupStyle(view, w, h); // Setup pixel ratio for retina display


    var devicePixelRatio = view._devicePixelRatio = 1;

    if (CC_JSB) {
      // view.isRetinaEnabled only work on web.
      devicePixelRatio = view._devicePixelRatio = window.devicePixelRatio;
    } else if (view.isRetinaEnabled()) {
      devicePixelRatio = view._devicePixelRatio = Math.min(view._maxPixelRatio, window.devicePixelRatio || 1);
    } // Setup canvas


    locCanvas.width = w * devicePixelRatio;
    locCanvas.height = h * devicePixelRatio;
  },
  _setupStyle: function _setupStyle(view, w, h) {
    var locCanvas = cc.game.canvas;
    var locContainer = cc.game.container;

    if (cc.sys.os === cc.sys.OS_ANDROID) {
      document.body.style.width = (view._isRotated ? h : w) + 'px';
      document.body.style.height = (view._isRotated ? w : h) + 'px';
    } // Setup style


    locContainer.style.width = locCanvas.style.width = w + 'px';
    locContainer.style.height = locCanvas.style.height = h + 'px';
  },
  _fixContainer: function _fixContainer() {
    // Add container to document body
    document.body.insertBefore(cc.game.container, document.body.firstChild); // Set body's width height to window's size, and forbid overflow, so that game will be centered

    var bs = document.body.style;
    bs.width = window.innerWidth + "px";
    bs.height = window.innerHeight + "px";
    bs.overflow = "hidden"; // Body size solution doesn't work on all mobile browser so this is the aleternative: fixed container

    var contStyle = cc.game.container.style;
    contStyle.position = "fixed";
    contStyle.left = contStyle.top = "0px"; // Reposition body

    document.body.scrollTop = 0;
  }
});
/**
 * <p>cc.ContentStrategy class is the root strategy class of content's scale strategy,
 * it controls the behavior of how to scale the scene and setup the viewport for the game</p>
 *
 * @class ContentStrategy
 */

cc.ContentStrategy = cc.Class({
  name: "ContentStrategy",
  ctor: function ctor() {
    this._result = {
      scale: [1, 1],
      viewport: null
    };
  },
  _buildResult: function _buildResult(containerW, containerH, contentW, contentH, scaleX, scaleY) {
    // Makes content fit better the canvas
    Math.abs(containerW - contentW) < 2 && (contentW = containerW);
    Math.abs(containerH - contentH) < 2 && (contentH = containerH);
    var viewport = cc.rect((containerW - contentW) / 2, (containerH - contentH) / 2, contentW, contentH); // Translate the content

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {//TODO: modify something for setTransform
      //cc.game._renderContext.translate(viewport.x, viewport.y + contentH);
    }

    this._result.scale = [scaleX, scaleY];
    this._result.viewport = viewport;
    return this._result;
  },

  /**
   * !#en
   * Manipulation before applying the strategy
   * !#zh 策略应用前的操作
   * @method preApply
   * @param {View} view - The target view
   */
  preApply: function preApply(view) {},

  /**
   * !#en Function to apply this strategy
   * The return value is {scale: [scaleX, scaleY], viewport: {cc.Rect}},
   * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
   * !#zh 调用策略方法
   * @method apply
   * @param {View} view
   * @param {Size} designedResolution
   * @return {Object} scaleAndViewportRect
   */
  apply: function apply(view, designedResolution) {
    return {
      "scale": [1, 1]
    };
  },

  /**
   * !#en
   * Manipulation after applying the strategy
   * !#zh 策略调用之后的操作
   * @method postApply
   * @param {View} view - The target view
   */
  postApply: function postApply(view) {}
});

(function () {
  // Container scale strategys

  /**
   * @class EqualToFrame
   * @extends ContainerStrategy
   */
  var EqualToFrame = cc.Class({
    name: "EqualToFrame",
    "extends": cc.ContainerStrategy,
    apply: function apply(view) {
      var frameH = view._frameSize.height,
          containerStyle = cc.game.container.style;

      this._setupContainer(view, view._frameSize.width, view._frameSize.height); // Setup container's margin and padding


      if (view._isRotated) {
        containerStyle.margin = '0 0 0 ' + frameH + 'px';
      } else {
        containerStyle.margin = '0px';
      }

      containerStyle.padding = "0px";
    }
  });
  /**
   * @class ProportionalToFrame
   * @extends ContainerStrategy
   */

  var ProportionalToFrame = cc.Class({
    name: "ProportionalToFrame",
    "extends": cc.ContainerStrategy,
    apply: function apply(view, designedResolution) {
      var frameW = view._frameSize.width,
          frameH = view._frameSize.height,
          containerStyle = cc.game.container.style,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = frameW / designW,
          scaleY = frameH / designH,
          containerW,
          containerH;
      scaleX < scaleY ? (containerW = frameW, containerH = designH * scaleX) : (containerW = designW * scaleY, containerH = frameH); // Adjust container size with integer value

      var offx = Math.round((frameW - containerW) / 2);
      var offy = Math.round((frameH - containerH) / 2);
      containerW = frameW - 2 * offx;
      containerH = frameH - 2 * offy;

      this._setupContainer(view, containerW, containerH);

      if (!CC_EDITOR) {
        // Setup container's margin and padding
        if (view._isRotated) {
          containerStyle.margin = '0 0 0 ' + frameH + 'px';
        } else {
          containerStyle.margin = '0px';
        }

        containerStyle.paddingLeft = offx + "px";
        containerStyle.paddingRight = offx + "px";
        containerStyle.paddingTop = offy + "px";
        containerStyle.paddingBottom = offy + "px";
      }
    }
  });
  /**
   * @class EqualToWindow
   * @extends EqualToFrame
   */

  var EqualToWindow = cc.Class({
    name: "EqualToWindow",
    "extends": EqualToFrame,
    preApply: function preApply(view) {
      this._super(view);

      cc.game.frame = document.documentElement;
    },
    apply: function apply(view) {
      this._super(view);

      this._fixContainer();
    }
  });
  /**
   * @class ProportionalToWindow
   * @extends ProportionalToFrame
   */

  var ProportionalToWindow = cc.Class({
    name: "ProportionalToWindow",
    "extends": ProportionalToFrame,
    preApply: function preApply(view) {
      this._super(view);

      cc.game.frame = document.documentElement;
    },
    apply: function apply(view, designedResolution) {
      this._super(view, designedResolution);

      this._fixContainer();
    }
  });
  /**
   * @class OriginalContainer
   * @extends ContainerStrategy
   */

  var OriginalContainer = cc.Class({
    name: "OriginalContainer",
    "extends": cc.ContainerStrategy,
    apply: function apply(view) {
      this._setupContainer(view, cc.game.canvas.width, cc.game.canvas.height);
    }
  }); // need to adapt prototype before instantiating

  var _global = typeof window === 'undefined' ? global : window;

  var globalAdapter = _global.__globalAdapter;

  if (globalAdapter) {
    if (globalAdapter.adaptContainerStrategy) {
      globalAdapter.adaptContainerStrategy(cc.ContainerStrategy.prototype);
    }

    if (globalAdapter.adaptView) {
      globalAdapter.adaptView(View.prototype);
    }
  } // #NOT STABLE on Android# Alias: Strategy that makes the container's size equals to the window's size
  //    cc.ContainerStrategy.EQUAL_TO_WINDOW = new EqualToWindow();
  // #NOT STABLE on Android# Alias: Strategy that scale proportionally the container's size to window's size
  //    cc.ContainerStrategy.PROPORTION_TO_WINDOW = new ProportionalToWindow();
  // Alias: Strategy that makes the container's size equals to the frame's size


  cc.ContainerStrategy.EQUAL_TO_FRAME = new EqualToFrame(); // Alias: Strategy that scale proportionally the container's size to frame's size

  cc.ContainerStrategy.PROPORTION_TO_FRAME = new ProportionalToFrame(); // Alias: Strategy that keeps the original container's size

  cc.ContainerStrategy.ORIGINAL_CONTAINER = new OriginalContainer(); // Content scale strategys

  var ExactFit = cc.Class({
    name: "ExactFit",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          scaleX = containerW / designedResolution.width,
          scaleY = containerH / designedResolution.height;
      return this._buildResult(containerW, containerH, containerW, containerH, scaleX, scaleY);
    }
  });
  var ShowAll = cc.Class({
    name: "ShowAll",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = containerW / designW,
          scaleY = containerH / designH,
          scale = 0,
          contentW,
          contentH;
      scaleX < scaleY ? (scale = scaleX, contentW = containerW, contentH = designH * scale) : (scale = scaleY, contentW = designW * scale, contentH = containerH);
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var NoBorder = cc.Class({
    name: "NoBorder",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          designH = designedResolution.height,
          scaleX = containerW / designW,
          scaleY = containerH / designH,
          scale,
          contentW,
          contentH;
      scaleX < scaleY ? (scale = scaleY, contentW = designW * scale, contentH = containerH) : (scale = scaleX, contentW = containerW, contentH = designH * scale);
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var FixedHeight = cc.Class({
    name: "FixedHeight",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designH = designedResolution.height,
          scale = containerH / designH,
          contentW = containerW,
          contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  });
  var FixedWidth = cc.Class({
    name: "FixedWidth",
    "extends": cc.ContentStrategy,
    apply: function apply(view, designedResolution) {
      var containerW = cc.game.canvas.width,
          containerH = cc.game.canvas.height,
          designW = designedResolution.width,
          scale = containerW / designW,
          contentW = containerW,
          contentH = containerH;
      return this._buildResult(containerW, containerH, contentW, contentH, scale, scale);
    }
  }); // Alias: Strategy to scale the content's size to container's size, non proportional

  cc.ContentStrategy.EXACT_FIT = new ExactFit(); // Alias: Strategy to scale the content's size proportionally to maximum size and keeps the whole content area to be visible

  cc.ContentStrategy.SHOW_ALL = new ShowAll(); // Alias: Strategy to scale the content's size proportionally to fill the whole container area

  cc.ContentStrategy.NO_BORDER = new NoBorder(); // Alias: Strategy to scale the content's height to container's height and proportionally scale its width

  cc.ContentStrategy.FIXED_HEIGHT = new FixedHeight(); // Alias: Strategy to scale the content's width to container's width and proportionally scale its height

  cc.ContentStrategy.FIXED_WIDTH = new FixedWidth();
})();
/**
 * <p>cc.ResolutionPolicy class is the root strategy class of scale strategy,
 * its main task is to maintain the compatibility with Cocos2d-x</p>
 *
 * @class ResolutionPolicy
 */

/**
 * @method constructor
 * @param {ContainerStrategy} containerStg The container strategy
 * @param {ContentStrategy} contentStg The content strategy
 */


cc.ResolutionPolicy = cc.Class({
  name: "cc.ResolutionPolicy",

  /**
   * Constructor of cc.ResolutionPolicy
   * @param {ContainerStrategy} containerStg
   * @param {ContentStrategy} contentStg
   */
  ctor: function ctor(containerStg, contentStg) {
    this._containerStrategy = null;
    this._contentStrategy = null;
    this.setContainerStrategy(containerStg);
    this.setContentStrategy(contentStg);
  },

  /**
   * !#en Manipulation before applying the resolution policy
   * !#zh 策略应用前的操作
   * @method preApply
   * @param {View} view The target view
   */
  preApply: function preApply(view) {
    this._containerStrategy.preApply(view);

    this._contentStrategy.preApply(view);
  },

  /**
   * !#en Function to apply this resolution policy
   * The return value is {scale: [scaleX, scaleY], viewport: {cc.Rect}},
   * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
   * !#zh 调用策略方法
   * @method apply
   * @param {View} view - The target view
   * @param {Size} designedResolution - The user defined design resolution
   * @return {Object} An object contains the scale X/Y values and the viewport rect
   */
  apply: function apply(view, designedResolution) {
    this._containerStrategy.apply(view, designedResolution);

    return this._contentStrategy.apply(view, designedResolution);
  },

  /**
   * !#en Manipulation after appyling the strategy
   * !#zh 策略应用之后的操作
   * @method postApply
   * @param {View} view - The target view
   */
  postApply: function postApply(view) {
    this._containerStrategy.postApply(view);

    this._contentStrategy.postApply(view);
  },

  /**
   * !#en
   * Setup the container's scale strategy
   * !#zh 设置容器的适配策略
   * @method setContainerStrategy
   * @param {ContainerStrategy} containerStg
   */
  setContainerStrategy: function setContainerStrategy(containerStg) {
    if (containerStg instanceof cc.ContainerStrategy) this._containerStrategy = containerStg;
  },

  /**
   * !#en
   * Setup the content's scale strategy
   * !#zh 设置内容的适配策略
   * @method setContentStrategy
   * @param {ContentStrategy} contentStg
   */
  setContentStrategy: function setContentStrategy(contentStg) {
    if (contentStg instanceof cc.ContentStrategy) this._contentStrategy = contentStg;
  }
});
js.get(cc.ResolutionPolicy.prototype, "canvasSize", function () {
  return cc.v2(cc.game.canvas.width, cc.game.canvas.height);
});
/**
 * The entire application is visible in the specified area without trying to preserve the original aspect ratio.<br/>
 * Distortion can occur, and the application may appear stretched or compressed.
 * @property {Number} EXACT_FIT
 * @readonly
 * @static
 */

cc.ResolutionPolicy.EXACT_FIT = 0;
/**
 * The entire application fills the specified area, without distortion but possibly with some cropping,<br/>
 * while maintaining the original aspect ratio of the application.
 * @property {Number} NO_BORDER
 * @readonly
 * @static
 */

cc.ResolutionPolicy.NO_BORDER = 1;
/**
 * The entire application is visible in the specified area without distortion while maintaining the original<br/>
 * aspect ratio of the application. Borders can appear on two sides of the application.
 * @property {Number} SHOW_ALL
 * @readonly
 * @static
 */

cc.ResolutionPolicy.SHOW_ALL = 2;
/**
 * The application takes the height of the design resolution size and modifies the width of the internal<br/>
 * canvas so that it fits the aspect ratio of the device<br/>
 * no distortion will occur however you must make sure your application works on different<br/>
 * aspect ratios
 * @property {Number} FIXED_HEIGHT
 * @readonly
 * @static
 */

cc.ResolutionPolicy.FIXED_HEIGHT = 3;
/**
 * The application takes the width of the design resolution size and modifies the height of the internal<br/>
 * canvas so that it fits the aspect ratio of the device<br/>
 * no distortion will occur however you must make sure your application works on different<br/>
 * aspect ratios
 * @property {Number} FIXED_WIDTH
 * @readonly
 * @static
 */

cc.ResolutionPolicy.FIXED_WIDTH = 4;
/**
 * Unknow policy
 * @property {Number} UNKNOWN
 * @readonly
 * @static
 */

cc.ResolutionPolicy.UNKNOWN = 5;
/**
 * @module cc
 */

/**
 * !#en cc.view is the shared view object.
 * !#zh cc.view 是全局的视图对象。
 * @property view
 * @static
 * @type {View}
 */

cc.view = new View();
/**
 * !#en cc.winSize is the alias object for the size of the current game window.
 * !#zh cc.winSize 为当前的游戏窗口的大小。
 * @property winSize
 * @type Size
 */

cc.winSize = cc.size();
module.exports = cc.view;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ1ZpZXcuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwianMiLCJyZW5kZXJlciIsIl9fQnJvd3NlckdldHRlciIsImluaXQiLCJodG1sIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImF2YWlsV2lkdGgiLCJmcmFtZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImF2YWlsSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJtZXRhIiwiYWRhcHRhdGlvblR5cGUiLCJjYyIsInN5cyIsImJyb3dzZXJUeXBlIiwib3MiLCJPU19JT1MiLCJCUk9XU0VSX1RZUEVfU0FGQVJJIiwiQlJPV1NFUl9UWVBFX1NPVUdPVSIsIkJST1dTRVJfVFlQRV9VQyIsIl9zY2lzc29yUmVjdCIsIlZpZXciLCJjYWxsIiwiX3QiLCJfc3RyYXRlZ3llciIsIkNvbnRhaW5lclN0cmF0ZWd5IiwiX3N0cmF0ZWd5IiwiQ29udGVudFN0cmF0ZWd5IiwiX2ZyYW1lU2l6ZSIsInNpemUiLCJfZGVzaWduUmVzb2x1dGlvblNpemUiLCJfb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZSIsIl9zY2FsZVgiLCJfc2NhbGVZIiwiX3ZpZXdwb3J0UmVjdCIsInJlY3QiLCJfdmlzaWJsZVJlY3QiLCJfYXV0b0Z1bGxTY3JlZW4iLCJfZGV2aWNlUGl4ZWxSYXRpbyIsIkNDX0pTQiIsIl9tYXhQaXhlbFJhdGlvIiwiX3JldGluYUVuYWJsZWQiLCJfcmVzaXplQ2FsbGJhY2siLCJfcmVzaXppbmciLCJfcmVzaXplV2l0aEJyb3dzZXJTaXplIiwiX29yaWVudGF0aW9uQ2hhbmdpbmciLCJfaXNSb3RhdGVkIiwiX29yaWVudGF0aW9uIiwibWFjcm8iLCJPUklFTlRBVElPTl9BVVRPIiwiX2lzQWRqdXN0Vmlld3BvcnQiLCJfYW50aUFsaWFzRW5hYmxlZCIsIl9yZXNvbHV0aW9uUG9saWN5IiwiX3JwRXhhY3RGaXQiLCJSZXNvbHV0aW9uUG9saWN5IiwiRVFVQUxfVE9fRlJBTUUiLCJFWEFDVF9GSVQiLCJfcnBTaG93QWxsIiwiU0hPV19BTEwiLCJfcnBOb0JvcmRlciIsIk5PX0JPUkRFUiIsIl9ycEZpeGVkSGVpZ2h0IiwiRklYRURfSEVJR0hUIiwiX3JwRml4ZWRXaWR0aCIsIkZJWEVEX1dJRFRIIiwiZ2FtZSIsIm9uY2UiLCJFVkVOVF9FTkdJTkVfSU5JVEVEIiwiZXh0ZW5kIiwibWl4aW4iLCJwcm90b3R5cGUiLCJfaW5pdEZyYW1lU2l6ZSIsInciLCJjYW52YXMiLCJ3aWR0aCIsImgiLCJoZWlnaHQiLCJ3aW5TaXplIiwidmlzaWJsZVJlY3QiLCJfcmVzaXplRXZlbnQiLCJmb3JjZU9yRXZlbnQiLCJ2aWV3Iiwic2V0RGVzaWduUmVzb2x1dGlvblNpemUiLCJzZXRUaW1lb3V0IiwicHJldkZyYW1lVyIsInByZXZGcmFtZUgiLCJwcmV2Um90YXRlZCIsImlzTW9iaWxlIiwiY29udGFpbmVyU3R5bGUiLCJjb250YWluZXIiLCJzdHlsZSIsIm1hcmdpbiIsImRpc3BsYXkiLCJlbWl0IiwiX29yaWVudGF0aW9uQ2hhbmdlIiwic2Nyb2xsVG8iLCJfcmVzaXplIiwicmVzaXplV2l0aEJyb3dzZXJTaXplIiwiZW5hYmxlZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0UmVzaXplQ2FsbGJhY2siLCJjYWxsYmFjayIsIkNDX0VESVRPUiIsInNldE9yaWVudGF0aW9uIiwib3JpZW50YXRpb24iLCJkZXNpZ25XaWR0aCIsImRlc2lnbkhlaWdodCIsImxvY0ZyYW1lU2l6ZSIsImlzTGFuZHNjYXBlIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiT1JJRU5UQVRJT05fUE9SVFJBSVQiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2Zvcm1PcmlnaW4iLCJfc2V0Vmlld3BvcnRNZXRhIiwibWV0YXMiLCJvdmVyd3JpdGUiLCJ2cCIsImdldEVsZW1lbnRCeUlkIiwiaGVhZCIsInJlbW92ZUNoaWxkIiwiZWxlbXMiLCJnZXRFbGVtZW50c0J5TmFtZSIsImN1cnJlbnRWUCIsImNvbnRlbnQiLCJrZXkiLCJwYXR0ZXJuIiwiY3JlYXRlRWxlbWVudCIsImlkIiwibmFtZSIsImluZGV4T2YiLCJSZWdFeHAiLCJyZXBsYWNlIiwidGVzdCIsInN1YnN0ciIsImFwcGVuZENoaWxkIiwiX2FkanVzdFZpZXdwb3J0TWV0YSIsIkNDX1JVTlRJTUUiLCJhZGp1c3RWaWV3cG9ydE1ldGEiLCJlbmFibGVSZXRpbmEiLCJ3YXJuIiwiaXNSZXRpbmFFbmFibGVkIiwiZW5hYmxlQW50aUFsaWFzIiwid2FybklEIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX1dFQkdMIiwiY2FjaGUiLCJhc3NldE1hbmFnZXIiLCJhc3NldHMiLCJmb3JFYWNoIiwiYXNzZXQiLCJUZXh0dXJlMkQiLCJGaWx0ZXIiLCJzZXRGaWx0ZXJzIiwiTElORUFSIiwiTkVBUkVTVCIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsImN0eCIsImdldENvbnRleHQiLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJtb3pJbWFnZVNtb290aGluZ0VuYWJsZWQiLCJpc0FudGlBbGlhc0VuYWJsZWQiLCJlbmFibGVBdXRvRnVsbFNjcmVlbiIsInNjcmVlbiIsImF1dG9GdWxsU2NyZWVuIiwiZGlzYWJsZUF1dG9GdWxsU2NyZWVuIiwiaXNBdXRvRnVsbFNjcmVlbkVuYWJsZWQiLCJzZXRDYW52YXNTaXplIiwiZ2V0Q2FudmFzU2l6ZSIsImdldEZyYW1lU2l6ZSIsInNldEZyYW1lU2l6ZSIsImdldFZpc2libGVTaXplIiwiZ2V0VmlzaWJsZVNpemVJblBpeGVsIiwiZ2V0VmlzaWJsZU9yaWdpbiIsInYyIiwieCIsInkiLCJnZXRWaXNpYmxlT3JpZ2luSW5QaXhlbCIsImdldFJlc29sdXRpb25Qb2xpY3kiLCJzZXRSZXNvbHV0aW9uUG9saWN5IiwicmVzb2x1dGlvblBvbGljeSIsIl9sb2NQb2xpY3kiLCJlcnJvcklEIiwicG9saWN5IiwicHJlQXBwbHkiLCJsb2dJRCIsInJlc3VsdCIsImFwcGx5Iiwic2NhbGUiLCJsZW5ndGgiLCJ2aWV3cG9ydCIsInZiIiwicnYiLCJwb3N0QXBwbHkiLCJ1cGRhdGVDYW1lcmFWaWV3cG9ydCIsImludGVybmFsIiwiaW5wdXRNYW5hZ2VyIiwiX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdCIsImdldERlc2lnblJlc29sdXRpb25TaXplIiwic2V0UmVhbFBpeGVsUmVzb2x1dGlvbiIsImRvY3VtZW50RWxlbWVudCIsImJvZHkiLCJsZWZ0IiwidG9wIiwic2V0Vmlld3BvcnRJblBvaW50cyIsImxvY1NjYWxlWCIsImxvY1NjYWxlWSIsIl9yZW5kZXJDb250ZXh0Iiwic2V0U2Npc3NvckluUG9pbnRzIiwic2NhbGVYIiwic2NhbGVZIiwic3giLCJNYXRoIiwiY2VpbCIsInN5Iiwic3ciLCJzaCIsImdsIiwiYm94QXJyIiwiZ2V0UGFyYW1ldGVyIiwiU0NJU1NPUl9CT1giLCJzY2lzc29yIiwiaXNTY2lzc29yRW5hYmxlZCIsImlzRW5hYmxlZCIsIlNDSVNTT1JfVEVTVCIsImdldFNjaXNzb3JSZWN0Iiwic2NhbGVYRmFjdG9yIiwic2NhbGVZRmFjdG9yIiwiZ2V0Vmlld3BvcnRSZWN0IiwiZ2V0U2NhbGVYIiwiZ2V0U2NhbGVZIiwiZ2V0RGV2aWNlUGl4ZWxSYXRpbyIsImNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3IiwidHgiLCJ0eSIsInJlbGF0ZWRQb3MiLCJvdXQiLCJwb3NMZWZ0IiwiYWRqdXN0ZWRMZWZ0IiwicG9zVG9wIiwiYWRqdXN0ZWRUb3AiLCJfY29udmVydE1vdXNlVG9Mb2NhdGlvbkluVmlldyIsImluX291dF9wb2ludCIsIl9jb252ZXJ0UG9pbnRXaXRoU2NhbGUiLCJwb2ludCIsIl9jb252ZXJ0VG91Y2hlc1dpdGhTY2FsZSIsInRvdWNoZXMiLCJzZWxUb3VjaCIsInNlbFBvaW50Iiwic2VsUHJlUG9pbnQiLCJpIiwiX3BvaW50IiwiX3ByZXZQb2ludCIsIkNsYXNzIiwiZGVzaWduZWRSZXNvbHV0aW9uIiwiX3NldHVwQ29udGFpbmVyIiwibG9jQ2FudmFzIiwiX3NldHVwU3R5bGUiLCJkZXZpY2VQaXhlbFJhdGlvIiwibWluIiwibG9jQ29udGFpbmVyIiwiT1NfQU5EUk9JRCIsIl9maXhDb250YWluZXIiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYnMiLCJvdmVyZmxvdyIsImNvbnRTdHlsZSIsInBvc2l0aW9uIiwic2Nyb2xsVG9wIiwiY3RvciIsIl9yZXN1bHQiLCJfYnVpbGRSZXN1bHQiLCJjb250YWluZXJXIiwiY29udGFpbmVySCIsImNvbnRlbnRXIiwiY29udGVudEgiLCJhYnMiLCJFcXVhbFRvRnJhbWUiLCJmcmFtZUgiLCJwYWRkaW5nIiwiUHJvcG9ydGlvbmFsVG9GcmFtZSIsImZyYW1lVyIsImRlc2lnblciLCJkZXNpZ25IIiwib2ZmeCIsInJvdW5kIiwib2ZmeSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJFcXVhbFRvV2luZG93IiwiX3N1cGVyIiwiUHJvcG9ydGlvbmFsVG9XaW5kb3ciLCJPcmlnaW5hbENvbnRhaW5lciIsIl9nbG9iYWwiLCJnbG9iYWwiLCJnbG9iYWxBZGFwdGVyIiwiX19nbG9iYWxBZGFwdGVyIiwiYWRhcHRDb250YWluZXJTdHJhdGVneSIsImFkYXB0VmlldyIsIlBST1BPUlRJT05fVE9fRlJBTUUiLCJPUklHSU5BTF9DT05UQUlORVIiLCJFeGFjdEZpdCIsIlNob3dBbGwiLCJOb0JvcmRlciIsIkZpeGVkSGVpZ2h0IiwiRml4ZWRXaWR0aCIsImNvbnRhaW5lclN0ZyIsImNvbnRlbnRTdGciLCJfY29udGFpbmVyU3RyYXRlZ3kiLCJfY29udGVudFN0cmF0ZWd5Iiwic2V0Q29udGFpbmVyU3RyYXRlZ3kiLCJzZXRDb250ZW50U3RyYXRlZ3kiLCJnZXQiLCJVTktOT1dOIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFB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QUFQO0FBQ0gsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBaEUsRUFBRSxDQUFDMEMsZ0JBQUgsQ0FBb0JFLFNBQXBCLEdBQWdDLENBQWhDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E1QyxFQUFFLENBQUMwQyxnQkFBSCxDQUFvQk0sU0FBcEIsR0FBZ0MsQ0FBaEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWhELEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CSSxRQUFwQixHQUErQixDQUEvQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTlDLEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CUSxZQUFwQixHQUFtQyxDQUFuQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWxELEVBQUUsQ0FBQzBDLGdCQUFILENBQW9CVSxXQUFwQixHQUFrQyxDQUFsQztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQXBELEVBQUUsQ0FBQzBDLGdCQUFILENBQW9Cc1EsT0FBcEIsR0FBOEIsQ0FBOUI7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FoVCxFQUFFLENBQUNxRSxJQUFILEdBQVUsSUFBSTVELElBQUosRUFBVjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQVQsRUFBRSxDQUFDaUUsT0FBSCxHQUFhakUsRUFBRSxDQUFDaUIsSUFBSCxFQUFiO0FBRUFnUyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsVCxFQUFFLENBQUNxRSxJQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcbmNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXInKTtcbnJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDQ2xhc3MnKTtcblxudmFyIF9fQnJvd3NlckdldHRlciA9IHtcbiAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF07XG4gICAgfSxcbiAgICBhdmFpbFdpZHRoOiBmdW5jdGlvbihmcmFtZSl7XG4gICAgICAgIGlmICghZnJhbWUgfHwgZnJhbWUgPT09IHRoaXMuaHRtbClcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZyYW1lLmNsaWVudFdpZHRoO1xuICAgIH0sXG4gICAgYXZhaWxIZWlnaHQ6IGZ1bmN0aW9uKGZyYW1lKXtcbiAgICAgICAgaWYgKCFmcmFtZSB8fCBmcmFtZSA9PT0gdGhpcy5odG1sKVxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZyYW1lLmNsaWVudEhlaWdodDtcbiAgICB9LFxuICAgIG1ldGE6IHtcbiAgICAgICAgXCJ3aWR0aFwiOiBcImRldmljZS13aWR0aFwiXG4gICAgfSxcbiAgICBhZGFwdGF0aW9uVHlwZTogY2Muc3lzLmJyb3dzZXJUeXBlXG59O1xuXG5pZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfSU9TKSAvLyBBbGwgYnJvd3NlcnMgYXJlIFdlYlZpZXdcbiAgICBfX0Jyb3dzZXJHZXR0ZXIuYWRhcHRhdGlvblR5cGUgPSBjYy5zeXMuQlJPV1NFUl9UWVBFX1NBRkFSSTtcblxuc3dpdGNoIChfX0Jyb3dzZXJHZXR0ZXIuYWRhcHRhdGlvblR5cGUpIHtcbiAgICBjYXNlIGNjLnN5cy5CUk9XU0VSX1RZUEVfU0FGQVJJOlxuICAgIGNhc2UgY2Muc3lzLkJST1dTRVJfVFlQRV9TT1VHT1U6XG4gICAgY2FzZSBjYy5zeXMuQlJPV1NFUl9UWVBFX1VDOlxuICAgICAgICBfX0Jyb3dzZXJHZXR0ZXIubWV0YVtcIm1pbmltYWwtdWlcIl0gPSBcInRydWVcIjtcbiAgICAgICAgX19Ccm93c2VyR2V0dGVyLmF2YWlsV2lkdGggPSBmdW5jdGlvbihmcmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWUuY2xpZW50V2lkdGg7XG4gICAgICAgIH07XG4gICAgICAgIF9fQnJvd3NlckdldHRlci5hdmFpbEhlaWdodCA9IGZ1bmN0aW9uKGZyYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xufVxuXG52YXIgX3NjaXNzb3JSZWN0ID0gbnVsbDtcblxuLyoqXG4gKiBjYy52aWV3IGlzIHRoZSBzaW5nbGV0b24gb2JqZWN0IHdoaWNoIHJlcHJlc2VudHMgdGhlIGdhbWUgd2luZG93Ljxici8+XG4gKiBJdCdzIG1haW4gdGFzayBpbmNsdWRlOiA8YnIvPlxuICogIC0gQXBwbHkgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHBvbGljeTxici8+XG4gKiAgLSBQcm92aWRlIGludGVyYWN0aW9uIHdpdGggdGhlIHdpbmRvdywgbGlrZSByZXNpemUgZXZlbnQgb24gd2ViLCByZXRpbmEgZGlzcGxheSBzdXBwb3J0LCBldGMuLi48YnIvPlxuICogIC0gTWFuYWdlIHRoZSBnYW1lIHZpZXcgcG9ydCB3aGljaCBjYW4gYmUgZGlmZmVyZW50IHdpdGggdGhlIHdpbmRvdzxici8+XG4gKiAgLSBNYW5hZ2UgdGhlIGNvbnRlbnQgc2NhbGUgYW5kIHRyYW5zbGF0aW9uPGJyLz5cbiAqIDxici8+XG4gKiBTaW5jZSB0aGUgY2MudmlldyBpcyBhIHNpbmdsZXRvbiwgeW91IGRvbid0IG5lZWQgdG8gY2FsbCBhbnkgY29uc3RydWN0b3Igb3IgY3JlYXRlIGZ1bmN0aW9ucyw8YnIvPlxuICogdGhlIHN0YW5kYXJkIHdheSB0byB1c2UgaXQgaXMgYnkgY2FsbGluZzo8YnIvPlxuICogIC0gY2Mudmlldy5tZXRob2ROYW1lKCk7IDxici8+XG4gKlxuICogQGNsYXNzIFZpZXdcbiAqIEBleHRlbmRzIEV2ZW50VGFyZ2V0XG4gKi9cbnZhciBWaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG5cbiAgICB2YXIgX3QgPSB0aGlzLCBfc3RyYXRlZ3llciA9IGNjLkNvbnRhaW5lclN0cmF0ZWd5LCBfc3RyYXRlZ3kgPSBjYy5Db250ZW50U3RyYXRlZ3k7XG5cbiAgICBfX0Jyb3dzZXJHZXR0ZXIuaW5pdCh0aGlzKTtcblxuICAgIC8vIFNpemUgb2YgcGFyZW50IG5vZGUgdGhhdCBjb250YWlucyBjYy5nYW1lLmNvbnRhaW5lciBhbmQgY2MuZ2FtZS5jYW52YXNcbiAgICBfdC5fZnJhbWVTaXplID0gY2Muc2l6ZSgwLCAwKTtcblxuICAgIC8vIHJlc29sdXRpb24gc2l6ZSwgaXQgaXMgdGhlIHNpemUgYXBwcm9wcmlhdGUgZm9yIHRoZSBhcHAgcmVzb3VyY2VzLlxuICAgIF90Ll9kZXNpZ25SZXNvbHV0aW9uU2l6ZSA9IGNjLnNpemUoMCwgMCk7XG4gICAgX3QuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUgPSBjYy5zaXplKDAsIDApO1xuICAgIF90Ll9zY2FsZVggPSAxO1xuICAgIF90Ll9zY2FsZVkgPSAxO1xuICAgIC8vIFZpZXdwb3J0IGlzIHRoZSBjb250YWluZXIncyByZWN0IHJlbGF0ZWQgdG8gY29udGVudCdzIGNvb3JkaW5hdGVzIGluIHBpeGVsXG4gICAgX3QuX3ZpZXdwb3J0UmVjdCA9IGNjLnJlY3QoMCwgMCwgMCwgMCk7XG4gICAgLy8gVGhlIHZpc2libGUgcmVjdCBpbiBjb250ZW50J3MgY29vcmRpbmF0ZSBpbiBwb2ludFxuICAgIF90Ll92aXNpYmxlUmVjdCA9IGNjLnJlY3QoMCwgMCwgMCwgMCk7XG4gICAgLy8gQXV0byBmdWxsIHNjcmVlbiBkaXNhYmxlZCBieSBkZWZhdWx0XG4gICAgX3QuX2F1dG9GdWxsU2NyZWVuID0gZmFsc2U7XG4gICAgLy8gVGhlIGRldmljZSdzIHBpeGVsIHJhdGlvIChmb3IgcmV0aW5hIGRpc3BsYXlzKVxuICAgIF90Ll9kZXZpY2VQaXhlbFJhdGlvID0gMTtcbiAgICBpZihDQ19KU0IpIHtcbiAgICAgICAgX3QuX21heFBpeGVsUmF0aW8gPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90Ll9tYXhQaXhlbFJhdGlvID0gMjtcbiAgICB9XG4gICAgLy8gUmV0aW5hIGRpc2FibGVkIGJ5IGRlZmF1bHRcbiAgICBfdC5fcmV0aW5hRW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIEN1c3RvbSBjYWxsYmFjayBmb3IgcmVzaXplIGV2ZW50XG4gICAgX3QuX3Jlc2l6ZUNhbGxiYWNrID0gbnVsbDtcbiAgICBfdC5fcmVzaXppbmcgPSBmYWxzZTtcbiAgICBfdC5fcmVzaXplV2l0aEJyb3dzZXJTaXplID0gZmFsc2U7XG4gICAgX3QuX29yaWVudGF0aW9uQ2hhbmdpbmcgPSB0cnVlO1xuICAgIF90Ll9pc1JvdGF0ZWQgPSBmYWxzZTtcbiAgICBfdC5fb3JpZW50YXRpb24gPSBjYy5tYWNyby5PUklFTlRBVElPTl9BVVRPO1xuICAgIF90Ll9pc0FkanVzdFZpZXdwb3J0ID0gdHJ1ZTtcbiAgICBfdC5fYW50aUFsaWFzRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgLy8gU2V0dXAgc3lzdGVtIGRlZmF1bHQgcmVzb2x1dGlvbiBwb2xpY2llc1xuICAgIF90Ll9yZXNvbHV0aW9uUG9saWN5ID0gbnVsbDtcbiAgICBfdC5fcnBFeGFjdEZpdCA9IG5ldyBjYy5SZXNvbHV0aW9uUG9saWN5KF9zdHJhdGVneWVyLkVRVUFMX1RPX0ZSQU1FLCBfc3RyYXRlZ3kuRVhBQ1RfRklUKTtcbiAgICBfdC5fcnBTaG93QWxsID0gbmV3IGNjLlJlc29sdXRpb25Qb2xpY3koX3N0cmF0ZWd5ZXIuRVFVQUxfVE9fRlJBTUUsIF9zdHJhdGVneS5TSE9XX0FMTCk7XG4gICAgX3QuX3JwTm9Cb3JkZXIgPSBuZXcgY2MuUmVzb2x1dGlvblBvbGljeShfc3RyYXRlZ3llci5FUVVBTF9UT19GUkFNRSwgX3N0cmF0ZWd5Lk5PX0JPUkRFUik7XG4gICAgX3QuX3JwRml4ZWRIZWlnaHQgPSBuZXcgY2MuUmVzb2x1dGlvblBvbGljeShfc3RyYXRlZ3llci5FUVVBTF9UT19GUkFNRSwgX3N0cmF0ZWd5LkZJWEVEX0hFSUdIVCk7XG4gICAgX3QuX3JwRml4ZWRXaWR0aCA9IG5ldyBjYy5SZXNvbHV0aW9uUG9saWN5KF9zdHJhdGVneWVyLkVRVUFMX1RPX0ZSQU1FLCBfc3RyYXRlZ3kuRklYRURfV0lEVEgpO1xuXG4gICAgY2MuZ2FtZS5vbmNlKGNjLmdhbWUuRVZFTlRfRU5HSU5FX0lOSVRFRCwgdGhpcy5pbml0LCB0aGlzKTtcbn07XG5cbmNjLmpzLmV4dGVuZChWaWV3LCBFdmVudFRhcmdldCk7XG5cbmNjLmpzLm1peGluKFZpZXcucHJvdG90eXBlLCB7XG4gICAgaW5pdCAoKSB7XG4gICAgICAgIHRoaXMuX2luaXRGcmFtZVNpemUoKTtcblxuICAgICAgICB2YXIgdyA9IGNjLmdhbWUuY2FudmFzLndpZHRoLCBoID0gY2MuZ2FtZS5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9kZXNpZ25SZXNvbHV0aW9uU2l6ZS53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuX2Rlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUud2lkdGggPSB3O1xuICAgICAgICB0aGlzLl9vcmlnaW5hbERlc2lnblJlc29sdXRpb25TaXplLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMuX3ZpZXdwb3J0UmVjdC53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuX3ZpZXdwb3J0UmVjdC5oZWlnaHQgPSBoO1xuICAgICAgICB0aGlzLl92aXNpYmxlUmVjdC53aWR0aCA9IHc7XG4gICAgICAgIHRoaXMuX3Zpc2libGVSZWN0LmhlaWdodCA9IGg7XG5cbiAgICAgICAgY2Mud2luU2l6ZS53aWR0aCA9IHRoaXMuX3Zpc2libGVSZWN0LndpZHRoO1xuICAgICAgICBjYy53aW5TaXplLmhlaWdodCA9IHRoaXMuX3Zpc2libGVSZWN0LmhlaWdodDtcbiAgICAgICAgY2MudmlzaWJsZVJlY3QgJiYgY2MudmlzaWJsZVJlY3QuaW5pdCh0aGlzLl92aXNpYmxlUmVjdCk7XG4gICAgfSxcblxuICAgIC8vIFJlc2l6ZSBoZWxwZXIgZnVuY3Rpb25zXG4gICAgX3Jlc2l6ZUV2ZW50OiBmdW5jdGlvbiAoZm9yY2VPckV2ZW50KSB7XG4gICAgICAgIHZhciB2aWV3O1xuICAgICAgICBpZiAodGhpcy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSkge1xuICAgICAgICAgICAgdmlldyA9IHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2aWV3ID0gY2MudmlldztcbiAgICAgICAgfVxuICAgICAgICAvLyBIQUNLOiBzb21lIGJyb3dzZXJzIGNhbid0IHVwZGF0ZSB3aW5kb3cgc2l6ZSBpbW1lZGlhdGVseVxuICAgICAgICAvLyBuZWVkIHRvIGhhbmRsZSByZXNpemUgZXZlbnQgY2FsbGJhY2sgb24gdGhlIG5leHQgdGlja1xuICAgICAgICBsZXQgc3lzID0gY2Muc3lzO1xuICAgICAgICBpZiAoc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX1VDICYmIHN5cy5vcyA9PT0gc3lzLk9TX0lPUykge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmlldy5fcmVzaXplRXZlbnQoZm9yY2VPckV2ZW50KTtcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBmcmFtZSBzaXplIGNoYW5nZWQgb3Igbm90XG4gICAgICAgIHZhciBwcmV2RnJhbWVXID0gdmlldy5fZnJhbWVTaXplLndpZHRoLCBwcmV2RnJhbWVIID0gdmlldy5fZnJhbWVTaXplLmhlaWdodCwgcHJldlJvdGF0ZWQgPSB2aWV3Ll9pc1JvdGF0ZWQ7XG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJTdHlsZSA9IGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLFxuICAgICAgICAgICAgICAgIG1hcmdpbiA9IGNvbnRhaW5lclN0eWxlLm1hcmdpbjtcbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB2aWV3Ll9pbml0RnJhbWVTaXplKCk7XG4gICAgICAgICAgICBjb250YWluZXJTdHlsZS5tYXJnaW4gPSBtYXJnaW47XG4gICAgICAgICAgICBjb250YWluZXJTdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZpZXcuX2luaXRGcmFtZVNpemUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9yY2VPckV2ZW50ICE9PSB0cnVlICYmIHZpZXcuX2lzUm90YXRlZCA9PT0gcHJldlJvdGF0ZWQgJiYgdmlldy5fZnJhbWVTaXplLndpZHRoID09PSBwcmV2RnJhbWVXICYmIHZpZXcuX2ZyYW1lU2l6ZS5oZWlnaHQgPT09IHByZXZGcmFtZUgpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gRnJhbWUgc2l6ZSBjaGFuZ2VkLCBkbyByZXNpemUgd29ya3NcbiAgICAgICAgdmFyIHdpZHRoID0gdmlldy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS53aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHZpZXcuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0O1xuICAgICAgICB2aWV3Ll9yZXNpemluZyA9IHRydWU7XG4gICAgICAgIGlmICh3aWR0aCA+IDApXG4gICAgICAgICAgICB2aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKHdpZHRoLCBoZWlnaHQsIHZpZXcuX3Jlc29sdXRpb25Qb2xpY3kpO1xuICAgICAgICB2aWV3Ll9yZXNpemluZyA9IGZhbHNlO1xuXG4gICAgICAgIHZpZXcuZW1pdCgnY2FudmFzLXJlc2l6ZScpO1xuICAgICAgICBpZiAodmlldy5fcmVzaXplQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZpZXcuX3Jlc2l6ZUNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb3JpZW50YXRpb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2Mudmlldy5fb3JpZW50YXRpb25DaGFuZ2luZyA9IHRydWU7XG4gICAgICAgIGNjLnZpZXcuX3Jlc2l6ZUV2ZW50KCk7XG4gICAgICAgIC8vIEhBQ0s6IHNob3cgbmF2IGJhciBvbiBpT1Mgc2FmYXJpXG4gICAgICAgIC8vIHNhZmFyaSB3aWxsIGVudGVyIGZ1bGxzY3JlZW4gd2hlbiByb3RhdGUgdG8gbGFuZHNjYXBlXG4gICAgICAgIC8vIG5lZWQgdG8gZXhpdCBmdWxsc2NyZWVuIHdoZW4gcm90YXRlIGJhY2sgdG8gcG9ydHJhaXQsIHNjcm9sbFRvKDAsIDEpIHdvcmtzLlxuICAgICAgICBpZiAoY2Muc3lzLmJyb3dzZXJUeXBlID09PSBjYy5zeXMuQlJPV1NFUl9UWVBFX1NBRkFSSSAmJiBjYy5zeXMuaXNNb2JpbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVzaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9mb3JjZSByZXNpemUgd2hlbiBzaXplIGlzIGNoYW5nZWQgYXQgbmF0aXZlXG4gICAgICAgIGNjLnZpZXcuX3Jlc2l6ZUV2ZW50KENDX0pTQik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHZpZXcncyB0YXJnZXQtZGVuc2l0eWRwaSBmb3IgYW5kcm9pZCBtb2JpbGUgYnJvd3Nlci4gaXQgY2FuIGJlIHNldCB0bzogICAgICAgICAgIDxici8+XG4gICAgICogICAxLiBjYy5tYWNyby5ERU5TSVRZRFBJX0RFVklDRSwgdmFsdWUgaXMgXCJkZXZpY2UtZHBpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAyLiBjYy5tYWNyby5ERU5TSVRZRFBJX0hJR0gsIHZhbHVlIGlzIFwiaGlnaC1kcGlcIiAgKGRlZmF1bHQgdmFsdWUpICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAzLiBjYy5tYWNyby5ERU5TSVRZRFBJX01FRElVTSwgdmFsdWUgaXMgXCJtZWRpdW0tZHBpXCIgKGJyb3dzZXIncyBkZWZhdWx0IHZhbHVlKSAgICAgICAgICAgIDxici8+XG4gICAgICogICA0LiBjYy5tYWNyby5ERU5TSVRZRFBJX0xPVywgdmFsdWUgaXMgXCJsb3ctZHBpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICA1LiBDdXN0b20gdmFsdWUsIGUuZzogXCI0ODBcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogISN6aCDorr7nva7nm67moIflhoXlrrnnmoTmr4/oi7Hlr7jlg4/ntKDngrnlr4bluqbjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2V0VGFyZ2V0RGVuc2l0eURQSVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkZW5zaXR5RFBJXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdGFyZ2V0LWRlbnNpdHlkcGkgdmFsdWUgb2YgY2Mudmlldy5cbiAgICAgKiAhI3poIOiOt+WPluebruagh+WGheWuueeahOavj+iLseWvuOWDj+e0oOeCueWvhuW6puOAglxuICAgICAqIEBtZXRob2QgZ2V0VGFyZ2V0RGVuc2l0eURQSVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgd2hldGhlciByZXNpemUgY2FudmFzIGF1dG9tYXRpY2FsbHkgd2hlbiBicm93c2VyJ3Mgc2l6ZSBjaGFuZ2VkLjxici8+XG4gICAgICogVXNlZnVsIG9ubHkgb24gd2ViLlxuICAgICAqICEjemgg6K6+572u5b2T5Y+R546w5rWP6KeI5Zmo55qE5bC65a+45pS55Y+Y5pe277yM5piv5ZCm6Ieq5Yqo6LCD5pW0IGNhbnZhcyDlsLrlr7jlpKflsI/jgIJcbiAgICAgKiDku4XlnKggV2ViIOaooeW8j+S4i+acieaViOOAglxuICAgICAqIEBtZXRob2QgcmVzaXplV2l0aEJyb3dzZXJTaXplXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVkIC0gV2hldGhlciBlbmFibGUgYXV0b21hdGljIHJlc2l6ZSB3aXRoIGJyb3dzZXIncyByZXNpemUgZXZlbnRcbiAgICAgKi9cbiAgICByZXNpemVXaXRoQnJvd3NlclNpemU6IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAvL2VuYWJsZVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9yZXNpemVXaXRoQnJvd3NlclNpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemVXaXRoQnJvd3NlclNpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemUpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vZGlzYWJsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX3Jlc2l6ZVdpdGhCcm93c2VyU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZVdpdGhCcm93c2VyU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemUpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIGNjLnZpZXcncyByZXNpemUgYWN0aW9uLDxici8+XG4gICAgICogdGhpcyBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgYmVmb3JlIGFwcGx5aW5nIHJlc29sdXRpb24gcG9saWN5LCA8YnIvPlxuICAgICAqIHNvIHlvdSBjYW4gZG8gYW55IGFkZGl0aW9uYWwgbW9kaWZpY2F0aW9ucyB3aXRoaW4gdGhlIGNhbGxiYWNrLjxici8+XG4gICAgICogVXNlZnVsIG9ubHkgb24gd2ViLlxuICAgICAqICEjemgg6K6+572uIGNjLnZpZXcg6LCD5pW06KeG56qX5bC65a+46KGM5Li655qE5Zue6LCD5Ye95pWw77yMXG4gICAgICog6L+Z5Liq5Zue6LCD5Ye95pWw5Lya5Zyo5bqU55So6YCC6YWN5qih5byP5LmL5YmN6KKr6LCD55So77yMXG4gICAgICog5Zug5q2k5L2g5Y+v5Lul5Zyo6L+Z5Liq5Zue6LCD5Ye95pWw5YaF5re75Yqg5Lu75oSP6ZmE5Yqg5pS55Y+Y77yMXG4gICAgICog5LuF5ZyoIFdlYiDlubPlj7DkuIvmnInmlYjjgIJcbiAgICAgKiBAbWV0aG9kIHNldFJlc2l6ZUNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxOdWxsfSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqL1xuICAgIHNldFJlc2l6ZUNhbGxiYWNrOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nIHx8IGNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBnYW1lLCBpdCBjYW4gYmUgbGFuZHNjYXBlLCBwb3J0cmFpdCBvciBhdXRvLlxuICAgICAqIFdoZW4gc2V0IGl0IHRvIGxhbmRzY2FwZSBvciBwb3J0cmFpdCwgYW5kIHNjcmVlbiB3L2ggcmF0aW8gZG9lc24ndCBmaXQsXG4gICAgICogY2MudmlldyB3aWxsIGF1dG9tYXRpY2FsbHkgcm90YXRlIHRoZSBnYW1lIGNhbnZhcyB1c2luZyBDU1MuXG4gICAgICogTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gZG9lc24ndCBoYXZlIGFueSBlZmZlY3QgaW4gbmF0aXZlLFxuICAgICAqIGluIG5hdGl2ZSwgeW91IG5lZWQgdG8gc2V0IHRoZSBhcHBsaWNhdGlvbiBvcmllbnRhdGlvbiBpbiBuYXRpdmUgcHJvamVjdCBzZXR0aW5nc1xuICAgICAqICEjemgg6K6+572u5ri45oiP5bGP5bmV5pyd5ZCR77yM5a6D6IO95aSf5piv5qiq54mI77yM56uW54mI5oiW6Ieq5Yqo44CCXG4gICAgICog5b2T6K6+572u5Li65qiq54mI5oiW56uW54mI77yM5bm25LiU5bGP5bmV55qE5a696auY5q+U5L6L5LiN5Yy56YWN5pe277yMXG4gICAgICogY2MudmlldyDkvJroh6rliqjnlKggQ1NTIOaXi+i9rOa4uOaIj+WcuuaZr+eahCBjYW52YXPvvIxcbiAgICAgKiDov5nkuKrmlrnms5XkuI3kvJrlr7kgbmF0aXZlIOmDqOWIhuS6p+eUn+S7u+S9leW9seWTje+8jOWvueS6jiBuYXRpdmUg6ICM6KiA77yM5L2g6ZyA6KaB5Zyo5bqU55So6K6+572u5Lit55qE6K6+572u5o6S54mI44CCXG4gICAgICogQG1ldGhvZCBzZXRPcmllbnRhdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcmllbnRhdGlvbiAtIFBvc3NpYmxlIHZhbHVlczogY2MubWFjcm8uT1JJRU5UQVRJT05fTEFORFNDQVBFIHwgY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQgfCBjYy5tYWNyby5PUklFTlRBVElPTl9BVVRPXG4gICAgICovXG4gICAgc2V0T3JpZW50YXRpb246IGZ1bmN0aW9uIChvcmllbnRhdGlvbikge1xuICAgICAgICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uICYgY2MubWFjcm8uT1JJRU5UQVRJT05fQVVUTztcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uICYmIHRoaXMuX29yaWVudGF0aW9uICE9PSBvcmllbnRhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgICAgIHZhciBkZXNpZ25XaWR0aCA9IHRoaXMuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUud2lkdGg7XG4gICAgICAgICAgICB2YXIgZGVzaWduSGVpZ2h0ID0gdGhpcy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNldERlc2lnblJlc29sdXRpb25TaXplKGRlc2lnbldpZHRoLCBkZXNpZ25IZWlnaHQsIHRoaXMuX3Jlc29sdXRpb25Qb2xpY3kpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0RnJhbWVTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2NGcmFtZVNpemUgPSB0aGlzLl9mcmFtZVNpemU7XG4gICAgICAgIHZhciB3ID0gX19Ccm93c2VyR2V0dGVyLmF2YWlsV2lkdGgoY2MuZ2FtZS5mcmFtZSk7XG4gICAgICAgIHZhciBoID0gX19Ccm93c2VyR2V0dGVyLmF2YWlsSGVpZ2h0KGNjLmdhbWUuZnJhbWUpO1xuICAgICAgICB2YXIgaXNMYW5kc2NhcGUgPSB3ID49IGg7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCAhY2Muc3lzLmlzTW9iaWxlIHx8XG4gICAgICAgICAgICAoaXNMYW5kc2NhcGUgJiYgdGhpcy5fb3JpZW50YXRpb24gJiBjYy5tYWNyby5PUklFTlRBVElPTl9MQU5EU0NBUEUpIHx8XG4gICAgICAgICAgICAoIWlzTGFuZHNjYXBlICYmIHRoaXMuX29yaWVudGF0aW9uICYgY2MubWFjcm8uT1JJRU5UQVRJT05fUE9SVFJBSVQpKSB7XG4gICAgICAgICAgICBsb2NGcmFtZVNpemUud2lkdGggPSB3O1xuICAgICAgICAgICAgbG9jRnJhbWVTaXplLmhlaWdodCA9IGg7XG4gICAgICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5zdHlsZVsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9ICdyb3RhdGUoMGRlZyknO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSgwZGVnKSc7XG4gICAgICAgICAgICB0aGlzLl9pc1JvdGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvY0ZyYW1lU2l6ZS53aWR0aCA9IGg7XG4gICAgICAgICAgICBsb2NGcmFtZVNpemUuaGVpZ2h0ID0gdztcbiAgICAgICAgICAgIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlWyctd2Via2l0LXRyYW5zZm9ybSddID0gJ3JvdGF0ZSg5MGRlZyknO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZSg5MGRlZyknO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIuc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAwcHggMHB4JztcbiAgICAgICAgICAgIGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICcwcHggMHB4IDBweCc7XG4gICAgICAgICAgICB0aGlzLl9pc1JvdGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbkNoYW5naW5nKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYy52aWV3Ll9vcmllbnRhdGlvbkNoYW5naW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0Vmlld3BvcnRNZXRhOiBmdW5jdGlvbiAobWV0YXMsIG92ZXJ3cml0ZSkge1xuICAgICAgICB2YXIgdnAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvY29zTWV0YUVsZW1lbnRcIik7XG4gICAgICAgIGlmKHZwICYmIG92ZXJ3cml0ZSl7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHZwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwidmlld3BvcnRcIiksXG4gICAgICAgICAgICBjdXJyZW50VlAgPSBlbGVtcyA/IGVsZW1zWzBdIDogbnVsbCxcbiAgICAgICAgICAgIGNvbnRlbnQsIGtleSwgcGF0dGVybjtcblxuICAgICAgICBjb250ZW50ID0gY3VycmVudFZQID8gY3VycmVudFZQLmNvbnRlbnQgOiBcIlwiO1xuICAgICAgICB2cCA9IHZwIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRhXCIpO1xuICAgICAgICB2cC5pZCA9IFwiY29jb3NNZXRhRWxlbWVudFwiO1xuICAgICAgICB2cC5uYW1lID0gXCJ2aWV3cG9ydFwiO1xuICAgICAgICB2cC5jb250ZW50ID0gXCJcIjtcblxuICAgICAgICBmb3IgKGtleSBpbiBtZXRhcykge1xuICAgICAgICAgICAgaWYgKGNvbnRlbnQuaW5kZXhPZihrZXkpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCArPSBcIixcIiArIGtleSArIFwiPVwiICsgbWV0YXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG92ZXJ3cml0ZSkge1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUmVnRXhwKGtleStcIlxccyo9XFxzKlteLF0rXCIpO1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UocGF0dGVybiwga2V5ICsgXCI9XCIgKyBtZXRhc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZigvXiwvLnRlc3QoY29udGVudCkpXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHIoMSk7XG5cbiAgICAgICAgdnAuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIC8vIEZvciBhZG9wdGluZyBjZXJ0YWluIGFuZHJvaWQgZGV2aWNlcyB3aGljaCBkb24ndCBzdXBwb3J0IHNlY29uZCB2aWV3cG9ydFxuICAgICAgICBpZiAoY3VycmVudFZQKVxuICAgICAgICAgICAgY3VycmVudFZQLmNvbnRlbnQgPSBjb250ZW50O1xuXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodnApO1xuICAgIH0sXG5cbiAgICBfYWRqdXN0Vmlld3BvcnRNZXRhOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0FkanVzdFZpZXdwb3J0ICYmICFDQ19KU0IgJiYgIUNDX1JVTlRJTUUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFZpZXdwb3J0TWV0YShfX0Jyb3dzZXJHZXR0ZXIubWV0YSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5faXNBZGp1c3RWaWV3cG9ydCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHdoZXRoZXIgdGhlIGVuZ2luZSBtb2RpZnkgdGhlIFwidmlld3BvcnRcIiBtZXRhIGluIHlvdXIgd2ViIHBhZ2UuPGJyLz5cbiAgICAgKiBJdCdzIGVuYWJsZWQgYnkgZGVmYXVsdCwgd2Ugc3Ryb25nbHkgc3VnZ2VzdCB5b3Ugbm90IHRvIGRpc2FibGUgaXQuPGJyLz5cbiAgICAgKiBBbmQgZXZlbiB3aGVuIGl0J3MgZW5hYmxlZCwgeW91IGNhbiBzdGlsbCBzZXQgeW91ciBvd24gXCJ2aWV3cG9ydFwiIG1ldGEsIGl0IHdvbid0IGJlIG92ZXJyaWRkZW48YnIvPlxuICAgICAqIE9ubHkgdXNlZnVsIG9uIHdlYlxuICAgICAqICEjemgg6K6+572u5byV5pOO5piv5ZCm6LCD5pW0IHZpZXdwb3J0IG1ldGEg5p2l6YWN5ZCI5bGP5bmV6YCC6YWN44CCXG4gICAgICog6buY6K6k6K6+572u5Li65ZCv5Yqo77yM5oiR5Lus5by654OI5bu66K6u5L2g5LiN6KaB5bCG5a6D6K6+572u5Li65YWz6Zet44CCXG4gICAgICog5Y2z5L2/5b2T5a6D5ZCv5Yqo5pe277yM5L2g5LuN54S26IO95aSf6K6+572u5L2g55qEIHZpZXdwb3J0IG1ldGHvvIzlroPkuI3kvJrooqvopobnm5bjgIJcbiAgICAgKiDku4XlnKggV2ViIOaooeW8j+S4i+acieaViFxuICAgICAqIEBtZXRob2QgYWRqdXN0Vmlld3BvcnRNZXRhXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBlbmFibGVkIC0gRW5hYmxlIGF1dG9tYXRpYyBtb2RpZmljYXRpb24gdG8gXCJ2aWV3cG9ydFwiIG1ldGFcbiAgICAgKi9cbiAgICBhZGp1c3RWaWV3cG9ydE1ldGE6IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAgIHRoaXMuX2lzQWRqdXN0Vmlld3BvcnQgPSBlbmFibGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0aW5hIHN1cHBvcnQgaXMgZW5hYmxlZCBieSBkZWZhdWx0IGZvciBBcHBsZSBkZXZpY2UgYnV0IGRpc2FibGVkIGZvciBvdGhlciBkZXZpY2VzLDxici8+XG4gICAgICogaXQgdGFrZXMgZWZmZWN0IG9ubHkgd2hlbiB5b3UgY2FsbGVkIHNldERlc2lnblJlc29sdXRpb25Qb2xpY3k8YnIvPlxuICAgICAqIE9ubHkgdXNlZnVsIG9uIHdlYlxuICAgICAqICEjemgg5a+55LqOIEFwcGxlIOi/meenjeaUr+aMgSBSZXRpbmEg5pi+56S655qE6K6+5aSH5LiK6buY6K6k6L+b6KGM5LyY5YyW6ICM5YW25LuW57G75Z6L6K6+5aSH6buY6K6k5LiN6L+b6KGM5LyY5YyW77yMXG4gICAgICog5a6D5LuF5Lya5Zyo5L2g6LCD55SoIHNldERlc2lnblJlc29sdXRpb25Qb2xpY3kg5pa55rOV5pe25pyJ5b2x5ZON44CCXG4gICAgICog5LuF5ZyoIFdlYiDmqKHlvI/kuIvmnInmlYjjgIJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZVJldGluYVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBkaXNhYmxlIHJldGluYSBkaXNwbGF5XG4gICAgICovXG4gICAgZW5hYmxlUmV0aW5hOiBmdW5jdGlvbihlbmFibGVkKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgZW5hYmxlZCkge1xuICAgICAgICAgICAgY2Mud2FybignQ2FuIG5vdCBlbmFibGUgcmV0aW5hIGluIEVkaXRvci4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXRpbmFFbmFibGVkID0gISFlbmFibGVkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2hlY2sgd2hldGhlciByZXRpbmEgZGlzcGxheSBpcyBlbmFibGVkLjxici8+XG4gICAgICogT25seSB1c2VmdWwgb24gd2ViXG4gICAgICogISN6aCDmo4Dmn6XmmK/lkKblr7kgUmV0aW5hIOaYvuekuuiuvuWkh+i/m+ihjOS8mOWMluOAglxuICAgICAqIOS7heWcqCBXZWIg5qih5byP5LiL5pyJ5pWI44CCXG4gICAgICogQG1ldGhvZCBpc1JldGluYUVuYWJsZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzUmV0aW5hRW5hYmxlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcmV0aW5hRW5hYmxlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIHRvIEVuYWJsZSBvbiBhbnRpLWFsaWFzXG4gICAgICogISN6aCDmjqfliLbmipfplK/pvb/mmK/lkKblvIDlkK9cbiAgICAgKiBAbWV0aG9kIGVuYWJsZUFudGlBbGlhc1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBub3QgYW50aS1hbGlhc1xuICAgICAqIEBkZXByZWNhdGVkIGNjLnZpZXcuZW5hYmxlQW50aUFsaWFzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuVGV4dHVyZTJELnNldEZpbHRlcnMgaW5zdGVhZFxuICAgICAqIEBzaW5jZSB2Mi4zLjBcbiAgICAgKi9cbiAgICBlbmFibGVBbnRpQWxpYXM6IGZ1bmN0aW9uIChlbmFibGVkKSB7XG4gICAgICAgIGNjLndhcm5JRCg5MjAwKTtcbiAgICAgICAgaWYgKHRoaXMuX2FudGlBbGlhc0VuYWJsZWQgPT09IGVuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbnRpQWxpYXNFbmFibGVkID0gZW5hYmxlZDtcbiAgICAgICAgaWYoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX1dFQkdMKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGUgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzO1xuICAgICAgICAgICAgY2FjaGUuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIEZpbHRlciA9IGNjLlRleHR1cmUyRC5GaWx0ZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5zZXRGaWx0ZXJzKEZpbHRlci5MSU5FQVIsIEZpbHRlci5MSU5FQVIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQuc2V0RmlsdGVycyhGaWx0ZXIuTkVBUkVTVCwgRmlsdGVyLk5FQVJFU1QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gY2MuZ2FtZS5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBlbmFibGVkO1xuICAgICAgICAgICAgY3R4Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGVuYWJsZWQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIGN1cnJlbnQgZW5hYmxlIG9uIGFudGktYWxpYXNcbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeaYr+WQpuaKl+mUr+m9v1xuICAgICAqIEBtZXRob2QgaXNBbnRpQWxpYXNFbmFibGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0FudGlBbGlhc0VuYWJsZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FudGlBbGlhc0VuYWJsZWQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSWYgZW5hYmxlZCwgdGhlIGFwcGxpY2F0aW9uIHdpbGwgdHJ5IGF1dG9tYXRpY2FsbHkgdG8gZW50ZXIgZnVsbCBzY3JlZW4gbW9kZSBvbiBtb2JpbGUgZGV2aWNlczxici8+XG4gICAgICogWW91IGNhbiBwYXNzIHRydWUgYXMgcGFyYW1ldGVyIHRvIGVuYWJsZSBpdCBhbmQgZGlzYWJsZSBpdCBieSBwYXNzaW5nIGZhbHNlLjxici8+XG4gICAgICogT25seSB1c2VmdWwgb24gd2ViXG4gICAgICogISN6aCDlkK/liqjml7bvvIznp7vliqjnq6/muLjmiI/kvJrlnKjnp7vliqjnq6/oh6rliqjlsJ3or5Xov5vlhaXlhajlsY/mqKHlvI/jgIJcbiAgICAgKiDkvaDog73lpJ/kvKDlhaUgdHJ1ZSDkuLrlj4LmlbDljrvlkK/liqjlroPvvIznlKggZmFsc2Ug5Y+C5pWw5p2l5YWz6Zet5a6D44CCXG4gICAgICogQG1ldGhvZCBlbmFibGVBdXRvRnVsbFNjcmVlblxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZCAtIEVuYWJsZSBvciBkaXNhYmxlIGF1dG8gZnVsbCBzY3JlZW4gb24gbW9iaWxlIGRldmljZXNcbiAgICAgKi9cbiAgICBlbmFibGVBdXRvRnVsbFNjcmVlbjogZnVuY3Rpb24oZW5hYmxlZCkge1xuICAgICAgICBpZiAoZW5hYmxlZCAmJlxuICAgICAgICAgICAgZW5hYmxlZCAhPT0gdGhpcy5fYXV0b0Z1bGxTY3JlZW4gJiZcbiAgICAgICAgICAgIGNjLnN5cy5pc01vYmlsZSkge1xuICAgICAgICAgICAgLy8gQXV0b21hdGljYWxseSBmdWxsIHNjcmVlbiB3aGVuIHVzZXIgdG91Y2hlcyBvbiBtb2JpbGUgdmVyc2lvblxuICAgICAgICAgICAgdGhpcy5fYXV0b0Z1bGxTY3JlZW4gPSB0cnVlO1xuICAgICAgICAgICAgY2Muc2NyZWVuLmF1dG9GdWxsU2NyZWVuKGNjLmdhbWUuZnJhbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXV0b0Z1bGxTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNjLnNjcmVlbi5kaXNhYmxlQXV0b0Z1bGxTY3JlZW4oY2MuZ2FtZS5mcmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENoZWNrIHdoZXRoZXIgYXV0byBmdWxsIHNjcmVlbiBpcyBlbmFibGVkLjxici8+XG4gICAgICogT25seSB1c2VmdWwgb24gd2ViXG4gICAgICogISN6aCDmo4Dmn6Xoh6rliqjov5vlhaXlhajlsY/mqKHlvI/mmK/lkKblkK/liqjjgIJcbiAgICAgKiDku4XlnKggV2ViIOaooeW8j+S4i+acieaViOOAglxuICAgICAqIEBtZXRob2QgaXNBdXRvRnVsbFNjcmVlbkVuYWJsZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBBdXRvIGZ1bGwgc2NyZWVuIGVuYWJsZWQgb3Igbm90XG4gICAgICovXG4gICAgaXNBdXRvRnVsbFNjcmVlbkVuYWJsZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0Z1bGxTY3JlZW47XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogTm90IHN1cHBvcnQgb24gbmF0aXZlLjxici8+XG4gICAgICogT24gd2ViLCBpdCBzZXRzIHRoZSBzaXplIG9mIHRoZSBjYW52YXMuXG4gICAgICogISN6aCDov5nkuKrmlrnms5XlubbkuI3mlK/mjIEgbmF0aXZlIOW5s+WPsO+8jOWcqCBXZWIg5bmz5Y+w5LiL77yM5Y+v5Lul55So5p2l6K6+572uIGNhbnZhcyDlsLrlr7jjgIJcbiAgICAgKiBAbWV0aG9kIHNldENhbnZhc1NpemVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gICAgICovXG4gICAgc2V0Q2FudmFzU2l6ZTogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGNjLmdhbWUuY2FudmFzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gY2MuZ2FtZS5jb250YWluZXI7XG5cbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGggKiB0aGlzLl9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5fZGV2aWNlUGl4ZWxSYXRpbztcblxuICAgICAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG5cbiAgICAgICAgdGhpcy5fcmVzaXplRXZlbnQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGNhbnZhcyBzaXplIG9mIHRoZSB2aWV3Ljxici8+XG4gICAgICogT24gbmF0aXZlIHBsYXRmb3JtcywgaXQgcmV0dXJucyB0aGUgc2NyZWVuIHNpemUgc2luY2UgdGhlIHZpZXcgaXMgYSBmdWxsc2NyZWVuIHZpZXcuPGJyLz5cbiAgICAgKiBPbiB3ZWIsIGl0IHJldHVybnMgdGhlIHNpemUgb2YgdGhlIGNhbnZhcyBlbGVtZW50LlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+5LitIGNhbnZhcyDnmoTlsLrlr7jjgIJcbiAgICAgKiDlnKggbmF0aXZlIOW5s+WPsOS4i++8jOWug+i/lOWbnuWFqOWxj+inhuWbvuS4i+Wxj+W5leeahOWwuuWvuOOAglxuICAgICAqIOWcqCBXZWIg5bmz5Y+w5LiL77yM5a6D6L+U5ZueIGNhbnZhcyDlhYPntKDlsLrlr7jjgIJcbiAgICAgKiBAbWV0aG9kIGdldENhbnZhc1NpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqL1xuICAgIGdldENhbnZhc1NpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUoY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNjLmdhbWUuY2FudmFzLmhlaWdodCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBmcmFtZSBzaXplIG9mIHRoZSB2aWV3Ljxici8+XG4gICAgICogT24gbmF0aXZlIHBsYXRmb3JtcywgaXQgcmV0dXJucyB0aGUgc2NyZWVuIHNpemUgc2luY2UgdGhlIHZpZXcgaXMgYSBmdWxsc2NyZWVuIHZpZXcuPGJyLz5cbiAgICAgKiBPbiB3ZWIsIGl0IHJldHVybnMgdGhlIHNpemUgb2YgdGhlIGNhbnZhcydzIG91dGVyIERPTSBlbGVtZW50LlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+5Lit6L655qGG5bC65a+444CCXG4gICAgICog5ZyoIG5hdGl2ZSDlubPlj7DkuIvvvIzlroPov5Tlm57lhajlsY/op4blm77kuIvlsY/luZXnmoTlsLrlr7jjgIJcbiAgICAgKiDlnKggd2ViIOW5s+WPsOS4i++8jOWug+i/lOWbniBjYW52YXMg5YWD57Sg55qE5aSW5bGCIERPTSDlhYPntKDlsLrlr7jjgIJcbiAgICAgKiBAbWV0aG9kIGdldEZyYW1lU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0RnJhbWVTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHRoaXMuX2ZyYW1lU2l6ZS53aWR0aCwgdGhpcy5fZnJhbWVTaXplLmhlaWdodCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBPbiBuYXRpdmUsIGl0IHNldHMgdGhlIGZyYW1lIHNpemUgb2Ygdmlldy48YnIvPlxuICAgICAqIE9uIHdlYiwgaXQgc2V0cyB0aGUgc2l6ZSBvZiB0aGUgY2FudmFzJ3Mgb3V0ZXIgRE9NIGVsZW1lbnQuXG4gICAgICogISN6aCDlnKggbmF0aXZlIOW5s+WPsOS4i++8jOiuvue9ruinhuWbvuahhuaetuWwuuWvuOOAglxuICAgICAqIOWcqCB3ZWIg5bmz5Y+w5LiL77yM6K6+572uIGNhbnZhcyDlpJblsYIgRE9NIOWFg+e0oOWwuuWvuOOAglxuICAgICAqIEBtZXRob2Qgc2V0RnJhbWVTaXplXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxuICAgICAqL1xuICAgIHNldEZyYW1lU2l6ZTogZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fZnJhbWVTaXplLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2ZyYW1lU2l6ZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGNjLmdhbWUuZnJhbWUuc3R5bGUud2lkdGggPSB3aWR0aCArIFwicHhcIjtcbiAgICAgICAgY2MuZ2FtZS5mcmFtZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUV2ZW50KHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgdmlzaWJsZSBhcmVhIHNpemUgb2YgdGhlIHZpZXcgcG9ydC5cbiAgICAgKiAhI3poIOi/lOWbnuinhuWbvueql+WPo+WPr+ingeWMuuWfn+WwuuWvuOOAglxuICAgICAqIEBtZXRob2QgZ2V0VmlzaWJsZVNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqL1xuICAgIGdldFZpc2libGVTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHRoaXMuX3Zpc2libGVSZWN0LndpZHRoLHRoaXMuX3Zpc2libGVSZWN0LmhlaWdodCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmxlIGFyZWEgc2l6ZSBvZiB0aGUgdmlldyBwb3J0LlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+56qX5Y+j5Y+v6KeB5Yy65Z+f5YOP57Sg5bC65a+444CCXG4gICAgICogQG1ldGhvZCBnZXRWaXNpYmxlU2l6ZUluUGl4ZWxcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqL1xuICAgIGdldFZpc2libGVTaXplSW5QaXhlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZSggdGhpcy5fdmlzaWJsZVJlY3Qud2lkdGggKiB0aGlzLl9zY2FsZVgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmxlUmVjdC5oZWlnaHQgKiB0aGlzLl9zY2FsZVkgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHZpc2libGUgb3JpZ2luIG9mIHRoZSB2aWV3IHBvcnQuXG4gICAgICogISN6aCDov5Tlm57op4blm77nqpflj6Plj6/op4HljLrln5/ljp/ngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldFZpc2libGVPcmlnaW5cbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqL1xuICAgIGdldFZpc2libGVPcmlnaW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3Zpc2libGVSZWN0LngsdGhpcy5fdmlzaWJsZVJlY3QueSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB2aXNpYmxlIG9yaWdpbiBvZiB0aGUgdmlldyBwb3J0LlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+56qX5Y+j5Y+v6KeB5Yy65Z+f5YOP57Sg5Y6f54K544CCXG4gICAgICogQG1ldGhvZCBnZXRWaXNpYmxlT3JpZ2luSW5QaXhlbFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0VmlzaWJsZU9yaWdpbkluUGl4ZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX3Zpc2libGVSZWN0LnggKiB0aGlzLl9zY2FsZVgsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2libGVSZWN0LnkgKiB0aGlzLl9zY2FsZVkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCByZXNvbHV0aW9uIHBvbGljeVxuICAgICAqICEjemgg6L+U5Zue5b2T5YmN5YiG6L6o546H5pa55qGIXG4gICAgICogQHNlZSBjYy5SZXNvbHV0aW9uUG9saWN5XG4gICAgICogQG1ldGhvZCBnZXRSZXNvbHV0aW9uUG9saWN5XG4gICAgICogQHJldHVybiB7UmVzb2x1dGlvblBvbGljeX1cbiAgICAgKi9cbiAgICBnZXRSZXNvbHV0aW9uUG9saWN5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNvbHV0aW9uUG9saWN5O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgY3VycmVudCByZXNvbHV0aW9uIHBvbGljeVxuICAgICAqICEjemgg6K6+572u5b2T5YmN5YiG6L6o546H5qih5byPXG4gICAgICogQHNlZSBjYy5SZXNvbHV0aW9uUG9saWN5XG4gICAgICogQG1ldGhvZCBzZXRSZXNvbHV0aW9uUG9saWN5XG4gICAgICogQHBhcmFtIHtSZXNvbHV0aW9uUG9saWN5fE51bWJlcn0gcmVzb2x1dGlvblBvbGljeVxuICAgICAqL1xuICAgIHNldFJlc29sdXRpb25Qb2xpY3k6IGZ1bmN0aW9uIChyZXNvbHV0aW9uUG9saWN5KSB7XG4gICAgICAgIHZhciBfdCA9IHRoaXM7XG4gICAgICAgIGlmIChyZXNvbHV0aW9uUG9saWN5IGluc3RhbmNlb2YgY2MuUmVzb2x1dGlvblBvbGljeSkge1xuICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSByZXNvbHV0aW9uUG9saWN5O1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuc3VyZSBjb21wYXRpYmlsaXR5IHdpdGggSlNCXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIF9sb2NQb2xpY3kgPSBjYy5SZXNvbHV0aW9uUG9saWN5O1xuICAgICAgICAgICAgaWYocmVzb2x1dGlvblBvbGljeSA9PT0gX2xvY1BvbGljeS5FWEFDVF9GSVQpXG4gICAgICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSBfdC5fcnBFeGFjdEZpdDtcbiAgICAgICAgICAgIGlmKHJlc29sdXRpb25Qb2xpY3kgPT09IF9sb2NQb2xpY3kuU0hPV19BTEwpXG4gICAgICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSBfdC5fcnBTaG93QWxsO1xuICAgICAgICAgICAgaWYocmVzb2x1dGlvblBvbGljeSA9PT0gX2xvY1BvbGljeS5OT19CT1JERVIpXG4gICAgICAgICAgICAgICAgX3QuX3Jlc29sdXRpb25Qb2xpY3kgPSBfdC5fcnBOb0JvcmRlcjtcbiAgICAgICAgICAgIGlmKHJlc29sdXRpb25Qb2xpY3kgPT09IF9sb2NQb2xpY3kuRklYRURfSEVJR0hUKVxuICAgICAgICAgICAgICAgIF90Ll9yZXNvbHV0aW9uUG9saWN5ID0gX3QuX3JwRml4ZWRIZWlnaHQ7XG4gICAgICAgICAgICBpZihyZXNvbHV0aW9uUG9saWN5ID09PSBfbG9jUG9saWN5LkZJWEVEX1dJRFRIKVxuICAgICAgICAgICAgICAgIF90Ll9yZXNvbHV0aW9uUG9saWN5ID0gX3QuX3JwRml4ZWRXaWR0aDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgcmVzb2x1dGlvbiBwb2xpY3kgd2l0aCBkZXNpZ25lZCB2aWV3IHNpemUgaW4gcG9pbnRzLjxici8+XG4gICAgICogVGhlIHJlc29sdXRpb24gcG9saWN5IGluY2x1ZGU6IDxici8+XG4gICAgICogWzFdIFJlc29sdXRpb25FeGFjdEZpdCAgICAgICBGaWxsIHNjcmVlbiBieSBzdHJldGNoLXRvLWZpdDogaWYgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHJhdGlvIG9mIHdpZHRoIHRvIGhlaWdodCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgc2NyZWVuIHJlc29sdXRpb24gcmF0aW8sIHlvdXIgZ2FtZSB2aWV3IHdpbGwgYmUgc3RyZXRjaGVkLjxici8+XG4gICAgICogWzJdIFJlc29sdXRpb25Ob0JvcmRlciAgICAgICBGdWxsIHNjcmVlbiB3aXRob3V0IGJsYWNrIGJvcmRlcjogaWYgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHJhdGlvIG9mIHdpZHRoIHRvIGhlaWdodCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgc2NyZWVuIHJlc29sdXRpb24gcmF0aW8sIHR3byBhcmVhcyBvZiB5b3VyIGdhbWUgdmlldyB3aWxsIGJlIGN1dC48YnIvPlxuICAgICAqIFszXSBSZXNvbHV0aW9uU2hvd0FsbCAgICAgICAgRnVsbCBzY3JlZW4gd2l0aCBibGFjayBib3JkZXI6IGlmIHRoZSBkZXNpZ24gcmVzb2x1dGlvbiByYXRpbyBvZiB3aWR0aCB0byBoZWlnaHQgaXMgZGlmZmVyZW50IGZyb20gdGhlIHNjcmVlbiByZXNvbHV0aW9uIHJhdGlvLCB0d28gYmxhY2sgYm9yZGVycyB3aWxsIGJlIHNob3duLjxici8+XG4gICAgICogWzRdIFJlc29sdXRpb25GaXhlZEhlaWdodCAgICBTY2FsZSB0aGUgY29udGVudCdzIGhlaWdodCB0byBzY3JlZW4ncyBoZWlnaHQgYW5kIHByb3BvcnRpb25hbGx5IHNjYWxlIGl0cyB3aWR0aDxici8+XG4gICAgICogWzVdIFJlc29sdXRpb25GaXhlZFdpZHRoICAgICBTY2FsZSB0aGUgY29udGVudCdzIHdpZHRoIHRvIHNjcmVlbidzIHdpZHRoIGFuZCBwcm9wb3J0aW9uYWxseSBzY2FsZSBpdHMgaGVpZ2h0PGJyLz5cbiAgICAgKiBbY2MuUmVzb2x1dGlvblBvbGljeV0gICAgICAgIFtXZWIgb25seSBmZWF0dXJlXSBDdXN0b20gcmVzb2x1dGlvbiBwb2xpY3ksIGNvbnN0cnVjdGVkIGJ5IGNjLlJlc29sdXRpb25Qb2xpY3k8YnIvPlxuICAgICAqICEjemgg6YCa6L+H6K6+572u6K6+6K6h5YiG6L6o546H5ZKM5Yy56YWN5qih5byP5p2l6L+b6KGM5ri45oiP55S76Z2i55qE5bGP5bmV6YCC6YWN44CCXG4gICAgICogQG1ldGhvZCBzZXREZXNpZ25SZXNvbHV0aW9uU2l6ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aCBEZXNpZ24gcmVzb2x1dGlvbiB3aWR0aC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0IERlc2lnbiByZXNvbHV0aW9uIGhlaWdodC5cbiAgICAgKiBAcGFyYW0ge1Jlc29sdXRpb25Qb2xpY3l8TnVtYmVyfSByZXNvbHV0aW9uUG9saWN5IFRoZSByZXNvbHV0aW9uIHBvbGljeSBkZXNpcmVkXG4gICAgICovXG4gICAgc2V0RGVzaWduUmVzb2x1dGlvblNpemU6IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCByZXNvbHV0aW9uUG9saWN5KSB7XG4gICAgICAgIC8vIERlZmVuc2l2ZSBjb2RlXG4gICAgICAgIGlmKCAhKHdpZHRoID4gMCAmJiBoZWlnaHQgPiAwKSApe1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgyMjAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UmVzb2x1dGlvblBvbGljeShyZXNvbHV0aW9uUG9saWN5KTtcbiAgICAgICAgdmFyIHBvbGljeSA9IHRoaXMuX3Jlc29sdXRpb25Qb2xpY3k7XG4gICAgICAgIGlmIChwb2xpY3kpIHtcbiAgICAgICAgICAgIHBvbGljeS5wcmVBcHBseSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlaW5pdCBmcmFtZSBzaXplXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpXG4gICAgICAgICAgICB0aGlzLl9hZGp1c3RWaWV3cG9ydE1ldGEoKTtcblxuICAgICAgICAvLyBQZXJtaXQgdG8gcmUtZGV0ZWN0IHRoZSBvcmllbnRhdGlvbiBvZiBkZXZpY2UuXG4gICAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdpbmcgPSB0cnVlO1xuICAgICAgICAvLyBJZiByZXNpemluZywgdGhlbiBmcmFtZSBzaXplIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQsIHRoaXMgbG9naWMgc2hvdWxkIGJlIGltcHJvdmVkXG4gICAgICAgIGlmICghdGhpcy5fcmVzaXppbmcpXG4gICAgICAgICAgICB0aGlzLl9pbml0RnJhbWVTaXplKCk7XG5cbiAgICAgICAgaWYgKCFwb2xpY3kpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDIyMDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb3JpZ2luYWxEZXNpZ25SZXNvbHV0aW9uU2l6ZS53aWR0aCA9IHRoaXMuX2Rlc2lnblJlc29sdXRpb25TaXplLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsRGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0ID0gdGhpcy5fZGVzaWduUmVzb2x1dGlvblNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBwb2xpY3kuYXBwbHkodGhpcywgdGhpcy5fZGVzaWduUmVzb2x1dGlvblNpemUpO1xuXG4gICAgICAgIGlmKHJlc3VsdC5zY2FsZSAmJiByZXN1bHQuc2NhbGUubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlWCA9IHJlc3VsdC5zY2FsZVswXTtcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlWSA9IHJlc3VsdC5zY2FsZVsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJlc3VsdC52aWV3cG9ydCl7XG4gICAgICAgICAgICB2YXIgdnAgPSB0aGlzLl92aWV3cG9ydFJlY3QsXG4gICAgICAgICAgICAgICAgdmIgPSB0aGlzLl92aXNpYmxlUmVjdCxcbiAgICAgICAgICAgICAgICBydiA9IHJlc3VsdC52aWV3cG9ydDtcblxuICAgICAgICAgICAgdnAueCA9IHJ2Lng7XG4gICAgICAgICAgICB2cC55ID0gcnYueTtcbiAgICAgICAgICAgIHZwLndpZHRoID0gcnYud2lkdGg7XG4gICAgICAgICAgICB2cC5oZWlnaHQgPSBydi5oZWlnaHQ7XG5cbiAgICAgICAgICAgIHZiLnggPSAwO1xuICAgICAgICAgICAgdmIueSA9IDA7XG4gICAgICAgICAgICB2Yi53aWR0aCA9IHJ2LndpZHRoIC8gdGhpcy5fc2NhbGVYO1xuICAgICAgICAgICAgdmIuaGVpZ2h0ID0gcnYuaGVpZ2h0IC8gdGhpcy5fc2NhbGVZO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9saWN5LnBvc3RBcHBseSh0aGlzKTtcbiAgICAgICAgY2Mud2luU2l6ZS53aWR0aCA9IHRoaXMuX3Zpc2libGVSZWN0LndpZHRoO1xuICAgICAgICBjYy53aW5TaXplLmhlaWdodCA9IHRoaXMuX3Zpc2libGVSZWN0LmhlaWdodDtcblxuICAgICAgICBjYy52aXNpYmxlUmVjdCAmJiBjYy52aXNpYmxlUmVjdC5pbml0KHRoaXMuX3Zpc2libGVSZWN0KTtcblxuICAgICAgICByZW5kZXJlci51cGRhdGVDYW1lcmFWaWV3cG9ydCgpO1xuICAgICAgICBjYy5pbnRlcm5hbC5pbnB1dE1hbmFnZXIuX3VwZGF0ZUNhbnZhc0JvdW5kaW5nUmVjdCgpO1xuICAgICAgICB0aGlzLmVtaXQoJ2Rlc2lnbi1yZXNvbHV0aW9uLWNoYW5nZWQnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGRlc2lnbmVkIHNpemUgZm9yIHRoZSB2aWV3LlxuICAgICAqIERlZmF1bHQgcmVzb2x1dGlvbiBzaXplIGlzIHRoZSBzYW1lIGFzICdnZXRGcmFtZVNpemUnLlxuICAgICAqICEjemgg6L+U5Zue6KeG5Zu+55qE6K6+6K6h5YiG6L6o546H44CCXG4gICAgICog6buY6K6k5LiL5YiG6L6o546H5bC65a+45ZCMIGBnZXRGcmFtZVNpemVgIOaWueazleebuOWQjFxuICAgICAqIEBtZXRob2QgZ2V0RGVzaWduUmVzb2x1dGlvblNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqL1xuICAgIGdldERlc2lnblJlc29sdXRpb25TaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHRoaXMuX2Rlc2lnblJlc29sdXRpb25TaXplLndpZHRoLCB0aGlzLl9kZXNpZ25SZXNvbHV0aW9uU2l6ZS5oZWlnaHQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgY29udGFpbmVyIHRvIGRlc2lyZWQgcGl4ZWwgcmVzb2x1dGlvbiBhbmQgZml0IHRoZSBnYW1lIGNvbnRlbnQgdG8gaXQuXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB2ZXJ5IHVzZWZ1bCBmb3IgYWRhcHRhdGlvbiBpbiBtb2JpbGUgYnJvd3NlcnMuXG4gICAgICogSW4gc29tZSBIRCBhbmRyb2lkIGRldmljZXMsIHRoZSByZXNvbHV0aW9uIGlzIHZlcnkgaGlnaCwgYnV0IGl0cyBicm93c2VyIHBlcmZvcm1hbmNlIG1heSBub3QgYmUgdmVyeSBnb29kLlxuICAgICAqIEluIHRoaXMgY2FzZSwgZW5hYmxpbmcgcmV0aW5hIGRpc3BsYXkgaXMgdmVyeSBjb3N0eSBhbmQgbm90IHN1Z2dlc3RlZCwgYW5kIGlmIHJldGluYSBpcyBkaXNhYmxlZCwgdGhlIGltYWdlIG1heSBiZSBibHVycnkuXG4gICAgICogQnV0IHRoaXMgQVBJIGNhbiBiZSBoZWxwZnVsIHRvIHNldCBhIGRlc2lyZWQgcGl4ZWwgcmVzb2x1dGlvbiB3aGljaCBpcyBpbiBiZXR3ZWVuLlxuICAgICAqIFRoaXMgQVBJIHdpbGwgZG8gdGhlIGZvbGxvd2luZzpcbiAgICAgKiAgICAgMS4gU2V0IHZpZXdwb3J0J3Mgd2lkdGggdG8gdGhlIGRlc2lyZWQgd2lkdGggaW4gcGl4ZWxcbiAgICAgKiAgICAgMi4gU2V0IGJvZHkgd2lkdGggdG8gdGhlIGV4YWN0IHBpeGVsIHJlc29sdXRpb25cbiAgICAgKiAgICAgMy4gVGhlIHJlc29sdXRpb24gcG9saWN5IHdpbGwgYmUgcmVzZXQgd2l0aCBkZXNpZ25lZCB2aWV3IHNpemUgaW4gcG9pbnRzLlxuICAgICAqICEjemgg6K6+572u5a655Zmo77yIY29udGFpbmVy77yJ6ZyA6KaB55qE5YOP57Sg5YiG6L6o546H5bm25LiU6YCC6YWN55u45bqU5YiG6L6o546H55qE5ri45oiP5YaF5a6544CCXG4gICAgICogQG1ldGhvZCBzZXRSZWFsUGl4ZWxSZXNvbHV0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHdpZHRoIERlc2lnbiByZXNvbHV0aW9uIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHQgRGVzaWduIHJlc29sdXRpb24gaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB7UmVzb2x1dGlvblBvbGljeXxOdW1iZXJ9IHJlc29sdXRpb25Qb2xpY3kgVGhlIHJlc29sdXRpb24gcG9saWN5IGRlc2lyZWRcbiAgICAgKi9cbiAgICBzZXRSZWFsUGl4ZWxSZXNvbHV0aW9uOiBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgcmVzb2x1dGlvblBvbGljeSkge1xuICAgICAgICBpZiAoIUNDX0pTQiAmJiAhQ0NfUlVOVElNRSkge1xuICAgICAgICAgICAgLy8gU2V0IHZpZXdwb3J0J3Mgd2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3NldFZpZXdwb3J0TWV0YSh7XCJ3aWR0aFwiOiB3aWR0aH0sIHRydWUpO1xuXG4gICAgICAgICAgICAvLyBTZXQgYm9keSB3aWR0aCB0byB0aGUgZXhhY3QgcGl4ZWwgcmVzb2x1dGlvblxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIHJlc29sdXRpb24gc2l6ZSBhbmQgcG9saWN5XG4gICAgICAgIHRoaXMuc2V0RGVzaWduUmVzb2x1dGlvblNpemUod2lkdGgsIGhlaWdodCwgcmVzb2x1dGlvblBvbGljeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHZpZXcgcG9ydCByZWN0YW5nbGUgd2l0aCBwb2ludHMuXG4gICAgICogISN6aCDnlKjorr7orqHliIbovqjnjofkuIvnmoTngrnlsLrlr7jmnaXorr7nva7op4bnqpfjgIJcbiAgICAgKiBAbWV0aG9kIHNldFZpZXdwb3J0SW5Qb2ludHNcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0geVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB3IHdpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGggaGVpZ2h0XG4gICAgICovXG4gICAgc2V0Vmlld3BvcnRJblBvaW50czogZnVuY3Rpb24gKHgsIHksIHcsIGgpIHtcbiAgICAgICAgdmFyIGxvY1NjYWxlWCA9IHRoaXMuX3NjYWxlWCwgbG9jU2NhbGVZID0gdGhpcy5fc2NhbGVZO1xuICAgICAgICBjYy5nYW1lLl9yZW5kZXJDb250ZXh0LnZpZXdwb3J0KCh4ICogbG9jU2NhbGVYICsgdGhpcy5fdmlld3BvcnRSZWN0LngpLFxuICAgICAgICAgICAgKHkgKiBsb2NTY2FsZVkgKyB0aGlzLl92aWV3cG9ydFJlY3QueSksXG4gICAgICAgICAgICAodyAqIGxvY1NjYWxlWCksXG4gICAgICAgICAgICAoaCAqIGxvY1NjYWxlWSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyBTY2lzc29yIHJlY3RhbmdsZSB3aXRoIHBvaW50cy5cbiAgICAgKiAhI3poIOeUqOiuvuiuoeWIhui+qOeOh+S4i+eahOeCueeahOWwuuWvuOadpeiuvue9riBzY2lzc29yIOWJquijgeWMuuWfn+OAglxuICAgICAqIEBtZXRob2Qgc2V0U2Npc3NvckluUG9pbnRzXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gd1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoXG4gICAgICovXG4gICAgc2V0U2Npc3NvckluUG9pbnRzOiBmdW5jdGlvbiAoeCwgeSwgdywgaCkge1xuICAgICAgICBsZXQgc2NhbGVYID0gdGhpcy5fc2NhbGVYLCBzY2FsZVkgPSB0aGlzLl9zY2FsZVk7XG4gICAgICAgIGxldCBzeCA9IE1hdGguY2VpbCh4ICogc2NhbGVYICsgdGhpcy5fdmlld3BvcnRSZWN0LngpO1xuICAgICAgICBsZXQgc3kgPSBNYXRoLmNlaWwoeSAqIHNjYWxlWSArIHRoaXMuX3ZpZXdwb3J0UmVjdC55KTtcbiAgICAgICAgbGV0IHN3ID0gTWF0aC5jZWlsKHcgKiBzY2FsZVgpO1xuICAgICAgICBsZXQgc2ggPSBNYXRoLmNlaWwoaCAqIHNjYWxlWSk7XG4gICAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG5cbiAgICAgICAgaWYgKCFfc2Npc3NvclJlY3QpIHtcbiAgICAgICAgICAgIHZhciBib3hBcnIgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuU0NJU1NPUl9CT1gpO1xuICAgICAgICAgICAgX3NjaXNzb3JSZWN0ID0gY2MucmVjdChib3hBcnJbMF0sIGJveEFyclsxXSwgYm94QXJyWzJdLCBib3hBcnJbM10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9zY2lzc29yUmVjdC54ICE9PSBzeCB8fCBfc2Npc3NvclJlY3QueSAhPT0gc3kgfHwgX3NjaXNzb3JSZWN0LndpZHRoICE9PSBzdyB8fCBfc2Npc3NvclJlY3QuaGVpZ2h0ICE9PSBzaCkge1xuICAgICAgICAgICAgX3NjaXNzb3JSZWN0LnggPSBzeDtcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdC55ID0gc3k7XG4gICAgICAgICAgICBfc2Npc3NvclJlY3Qud2lkdGggPSBzdztcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdC5oZWlnaHQgPSBzaDtcbiAgICAgICAgICAgIGdsLnNjaXNzb3Ioc3gsIHN5LCBzdywgc2gpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgR0xfU0NJU1NPUl9URVNUIGlzIGVuYWJsZVxuICAgICAqICEjemgg5qOA5p+lIHNjaXNzb3Ig5piv5ZCm55Sf5pWI44CCXG4gICAgICogQG1ldGhvZCBpc1NjaXNzb3JFbmFibGVkXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTY2lzc29yRW5hYmxlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2MuZ2FtZS5fcmVuZGVyQ29udGV4dC5pc0VuYWJsZWQoZ2wuU0NJU1NPUl9URVNUKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgc2Npc3NvciByZWN0YW5nbGVcbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeeahCBzY2lzc29yIOWJquijgeWMuuWfn+OAglxuICAgICAqIEBtZXRob2QgZ2V0U2Npc3NvclJlY3RcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBnZXRTY2lzc29yUmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIV9zY2lzc29yUmVjdCkge1xuICAgICAgICAgICAgdmFyIGJveEFyciA9IGdsLmdldFBhcmFtZXRlcihnbC5TQ0lTU09SX0JPWCk7XG4gICAgICAgICAgICBfc2Npc3NvclJlY3QgPSBjYy5yZWN0KGJveEFyclswXSwgYm94QXJyWzFdLCBib3hBcnJbMl0sIGJveEFyclszXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjYWxlWEZhY3RvciA9IDEgLyB0aGlzLl9zY2FsZVg7XG4gICAgICAgIHZhciBzY2FsZVlGYWN0b3IgPSAxIC8gdGhpcy5fc2NhbGVZO1xuICAgICAgICByZXR1cm4gY2MucmVjdChcbiAgICAgICAgICAgIChfc2Npc3NvclJlY3QueCAtIHRoaXMuX3ZpZXdwb3J0UmVjdC54KSAqIHNjYWxlWEZhY3RvcixcbiAgICAgICAgICAgIChfc2Npc3NvclJlY3QueSAtIHRoaXMuX3ZpZXdwb3J0UmVjdC55KSAqIHNjYWxlWUZhY3RvcixcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdC53aWR0aCAqIHNjYWxlWEZhY3RvcixcbiAgICAgICAgICAgIF9zY2lzc29yUmVjdC5oZWlnaHQgKiBzY2FsZVlGYWN0b3JcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHZpZXcgcG9ydCByZWN0YW5nbGUuXG4gICAgICogISN6aCDov5Tlm57op4bnqpfliaroo4HljLrln5/jgIJcbiAgICAgKiBAbWV0aG9kIGdldFZpZXdwb3J0UmVjdFxuICAgICAqIEByZXR1cm4ge1JlY3R9XG4gICAgICovXG4gICAgZ2V0Vmlld3BvcnRSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3cG9ydFJlY3Q7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHNjYWxlIGZhY3RvciBvZiB0aGUgaG9yaXpvbnRhbCBkaXJlY3Rpb24gKFggYXhpcykuXG4gICAgICogISN6aCDov5Tlm57mqKrovbTnmoTnvKnmlL7mr5TvvIzov5nkuKrnvKnmlL7mr5TmmK/lsIbnlLvluIPlg4/ntKDliIbovqjnjofmlL7liLDorr7orqHliIbovqjnjofnmoTmr5TkvovjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNjYWxlWFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgc2NhbGUgZmFjdG9yIG9mIHRoZSB2ZXJ0aWNhbCBkaXJlY3Rpb24gKFkgYXhpcykuXG4gICAgICogISN6aCDov5Tlm57nurXovbTnmoTnvKnmlL7mr5TvvIzov5nkuKrnvKnmlL7mr5TmmK/lsIbnlLvluIPlg4/ntKDliIbovqjnjofnvKnmlL7liLDorr7orqHliIbovqjnjofnmoTmr5TkvovjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNjYWxlWVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTY2FsZVk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlWTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgZGV2aWNlIHBpeGVsIHJhdGlvIGZvciByZXRpbmEgZGlzcGxheS5cbiAgICAgKiAhI3poIOi/lOWbnuiuvuWkh+aIlua1j+iniOWZqOWDj+e0oOavlOS+i+OAglxuICAgICAqIEBtZXRob2QgZ2V0RGV2aWNlUGl4ZWxSYXRpb1xuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXREZXZpY2VQaXhlbFJhdGlvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RldmljZVBpeGVsUmF0aW87XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSByZWFsIGxvY2F0aW9uIGluIHZpZXcgZm9yIGEgdHJhbnNsYXRpb24gYmFzZWQgb24gYSByZWxhdGVkIHBvc2l0aW9uXG4gICAgICogISN6aCDlsIblsY/luZXlnZDmoIfovazmjaLkuLrmuLjmiI/op4blm77kuIvnmoTlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IC0gVGhlIFggYXhpcyB0cmFuc2xhdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0eSAtIFRoZSBZIGF4aXMgdHJhbnNsYXRpb25cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVsYXRlZFBvcyAtIFRoZSByZWxhdGVkIHBvc2l0aW9uIG9iamVjdCBpbmNsdWRpbmcgXCJsZWZ0XCIsIFwidG9wXCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiBpbmZvcm1hdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqL1xuICAgIGNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3OiBmdW5jdGlvbiAodHgsIHR5LCByZWxhdGVkUG9zLCBvdXQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG91dCB8fCBjYy52MigpO1xuICAgICAgICBsZXQgcG9zTGVmdCA9IHJlbGF0ZWRQb3MuYWRqdXN0ZWRMZWZ0ID8gcmVsYXRlZFBvcy5hZGp1c3RlZExlZnQgOiByZWxhdGVkUG9zLmxlZnQ7XG4gICAgICAgIGxldCBwb3NUb3AgPSByZWxhdGVkUG9zLmFkanVzdGVkVG9wID8gcmVsYXRlZFBvcy5hZGp1c3RlZFRvcCA6IHJlbGF0ZWRQb3MudG9wO1xuICAgICAgICBsZXQgeCA9IHRoaXMuX2RldmljZVBpeGVsUmF0aW8gKiAodHggLSBwb3NMZWZ0KTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLl9kZXZpY2VQaXhlbFJhdGlvICogKHBvc1RvcCArIHJlbGF0ZWRQb3MuaGVpZ2h0IC0gdHkpO1xuICAgICAgICBpZiAodGhpcy5faXNSb3RhdGVkKSB7XG4gICAgICAgICAgICByZXN1bHQueCA9IGNjLmdhbWUuY2FudmFzLndpZHRoIC0geTtcbiAgICAgICAgICAgIHJlc3VsdC55ID0geDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC54ID0geDtcbiAgICAgICAgICAgIHJlc3VsdC55ID0geTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfY29udmVydE1vdXNlVG9Mb2NhdGlvbkluVmlldzogZnVuY3Rpb24gKGluX291dF9wb2ludCwgcmVsYXRlZFBvcykge1xuICAgICAgICB2YXIgdmlld3BvcnQgPSB0aGlzLl92aWV3cG9ydFJlY3QsIF90ID0gdGhpcztcbiAgICAgICAgaW5fb3V0X3BvaW50LnggPSAoKF90Ll9kZXZpY2VQaXhlbFJhdGlvICogKGluX291dF9wb2ludC54IC0gcmVsYXRlZFBvcy5sZWZ0KSkgLSB2aWV3cG9ydC54KSAvIF90Ll9zY2FsZVg7XG4gICAgICAgIGluX291dF9wb2ludC55ID0gKF90Ll9kZXZpY2VQaXhlbFJhdGlvICogKHJlbGF0ZWRQb3MudG9wICsgcmVsYXRlZFBvcy5oZWlnaHQgLSBpbl9vdXRfcG9pbnQueSkgLSB2aWV3cG9ydC55KSAvIF90Ll9zY2FsZVk7XG4gICAgfSxcblxuICAgIF9jb252ZXJ0UG9pbnRXaXRoU2NhbGU6IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICB2YXIgdmlld3BvcnQgPSB0aGlzLl92aWV3cG9ydFJlY3Q7XG4gICAgICAgIHBvaW50LnggPSAocG9pbnQueCAtIHZpZXdwb3J0LngpIC8gdGhpcy5fc2NhbGVYO1xuICAgICAgICBwb2ludC55ID0gKHBvaW50LnkgLSB2aWV3cG9ydC55KSAvIHRoaXMuX3NjYWxlWTtcbiAgICB9LFxuXG4gICAgX2NvbnZlcnRUb3VjaGVzV2l0aFNjYWxlOiBmdW5jdGlvbiAodG91Y2hlcykge1xuICAgICAgICB2YXIgdmlld3BvcnQgPSB0aGlzLl92aWV3cG9ydFJlY3QsIHNjYWxlWCA9IHRoaXMuX3NjYWxlWCwgc2NhbGVZID0gdGhpcy5fc2NhbGVZLFxuICAgICAgICAgICAgc2VsVG91Y2gsIHNlbFBvaW50LCBzZWxQcmVQb2ludDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxUb3VjaCA9IHRvdWNoZXNbaV07XG4gICAgICAgICAgICBzZWxQb2ludCA9IHNlbFRvdWNoLl9wb2ludDtcbiAgICAgICAgICAgIHNlbFByZVBvaW50ID0gc2VsVG91Y2guX3ByZXZQb2ludDtcblxuICAgICAgICAgICAgc2VsUG9pbnQueCA9IChzZWxQb2ludC54IC0gdmlld3BvcnQueCkgLyBzY2FsZVg7XG4gICAgICAgICAgICBzZWxQb2ludC55ID0gKHNlbFBvaW50LnkgLSB2aWV3cG9ydC55KSAvIHNjYWxlWTtcbiAgICAgICAgICAgIHNlbFByZVBvaW50LnggPSAoc2VsUHJlUG9pbnQueCAtIHZpZXdwb3J0LngpIC8gc2NhbGVYO1xuICAgICAgICAgICAgc2VsUHJlUG9pbnQueSA9IChzZWxQcmVQb2ludC55IC0gdmlld3BvcnQueSkgLyBzY2FsZVk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBFbWl0IHdoZW4gZGVzaWduIHJlc29sdXRpb24gY2hhbmdlZC5cbiAqICEjemhcbiAqIOW9k+iuvuiuoeWIhui+qOeOh+aUueWPmOaXtuWPkemAgeOAglxuICogQGV2ZW50IGRlc2lnbi1yZXNvbHV0aW9uLWNoYW5nZWRcbiAqL1xuIC8qKlxuICogISNlblxuICogRW1pdCB3aGVuIGNhbnZhcyByZXNpemUuXG4gKiAhI3poXG4gKiDlvZPnlLvluIPlpKflsI/mlLnlj5jml7blj5HpgIHjgIJcbiAqIEBldmVudCBjYW52YXMtcmVzaXplXG4gKi9cblxuXG4vKipcbiAqIDxwPmNjLmdhbWUuY29udGFpbmVyU3RyYXRlZ3kgY2xhc3MgaXMgdGhlIHJvb3Qgc3RyYXRlZ3kgY2xhc3Mgb2YgY29udGFpbmVyJ3Mgc2NhbGUgc3RyYXRlZ3ksXG4gKiBpdCBjb250cm9scyB0aGUgYmVoYXZpb3Igb2YgaG93IHRvIHNjYWxlIHRoZSBjYy5nYW1lLmNvbnRhaW5lciBhbmQgY2MuZ2FtZS5jYW52YXMgb2JqZWN0PC9wPlxuICpcbiAqIEBjbGFzcyBDb250YWluZXJTdHJhdGVneVxuICovXG5jYy5Db250YWluZXJTdHJhdGVneSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiBcIkNvbnRhaW5lclN0cmF0ZWd5XCIsXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE1hbmlwdWxhdGlvbiBiZWZvcmUgYXBwbGluZyB0aGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOWcqOW6lOeUqOetlueVpeS5i+WJjeeahOaTjeS9nFxuICAgICAqIEBtZXRob2QgcHJlQXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXcgLSBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKi9cbiAgICBwcmVBcHBseTogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEZ1bmN0aW9uIHRvIGFwcGx5IHRoaXMgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOetlueVpeW6lOeUqOaWueazlVxuICAgICAqIEBtZXRob2QgYXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAgICAgKiBAcGFyYW0ge1NpemV9IGRlc2lnbmVkUmVzb2x1dGlvblxuICAgICAqL1xuICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBNYW5pcHVsYXRpb24gYWZ0ZXIgYXBwbHlpbmcgdGhlIHN0cmF0ZWd5XG4gICAgICogISN6aCDnrZbnlaXosIPnlKjkuYvlkI7nmoTmk43kvZxcbiAgICAgKiBAbWV0aG9kIHBvc3RBcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlldyAgVGhlIHRhcmdldCB2aWV3XG4gICAgICovXG4gICAgcG9zdEFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuXG4gICAgfSxcblxuICAgIF9zZXR1cENvbnRhaW5lcjogZnVuY3Rpb24gKHZpZXcsIHcsIGgpIHtcbiAgICAgICAgdmFyIGxvY0NhbnZhcyA9IGNjLmdhbWUuY2FudmFzO1xuXG4gICAgICAgIHRoaXMuX3NldHVwU3R5bGUodmlldywgdywgaCk7XG5cbiAgICAgICAgLy8gU2V0dXAgcGl4ZWwgcmF0aW8gZm9yIHJldGluYSBkaXNwbGF5XG4gICAgICAgIHZhciBkZXZpY2VQaXhlbFJhdGlvID0gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG4gICAgICAgIGlmKENDX0pTQil7XG4gICAgICAgICAgICAvLyB2aWV3LmlzUmV0aW5hRW5hYmxlZCBvbmx5IHdvcmsgb24gd2ViLlxuICAgICAgICAgICAgZGV2aWNlUGl4ZWxSYXRpbyA9IHZpZXcuX2RldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfWVsc2UgaWYgKHZpZXcuaXNSZXRpbmFFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGRldmljZVBpeGVsUmF0aW8gPSB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvID0gTWF0aC5taW4odmlldy5fbWF4UGl4ZWxSYXRpbywgd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0dXAgY2FudmFzXG4gICAgICAgIGxvY0NhbnZhcy53aWR0aCA9IHcgKiBkZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICBsb2NDYW52YXMuaGVpZ2h0ID0gaCAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgfSxcblxuICAgIF9zZXR1cFN0eWxlOiBmdW5jdGlvbiAodmlldywgdywgaCkge1xuICAgICAgICBsZXQgbG9jQ2FudmFzID0gY2MuZ2FtZS5jYW52YXM7XG4gICAgICAgIGxldCBsb2NDb250YWluZXIgPSBjYy5nYW1lLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUud2lkdGggPSAodmlldy5faXNSb3RhdGVkID8gaCA6IHcpICsgJ3B4JztcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gKHZpZXcuX2lzUm90YXRlZCA/IHcgOiBoKSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0dXAgc3R5bGVcbiAgICAgICAgbG9jQ29udGFpbmVyLnN0eWxlLndpZHRoID0gbG9jQ2FudmFzLnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gICAgICAgIGxvY0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBsb2NDYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG4gICAgfSxcblxuICAgIF9maXhDb250YWluZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQWRkIGNvbnRhaW5lciB0byBkb2N1bWVudCBib2R5XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKGNjLmdhbWUuY29udGFpbmVyLCBkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAvLyBTZXQgYm9keSdzIHdpZHRoIGhlaWdodCB0byB3aW5kb3cncyBzaXplLCBhbmQgZm9yYmlkIG92ZXJmbG93LCBzbyB0aGF0IGdhbWUgd2lsbCBiZSBjZW50ZXJlZFxuICAgICAgICB2YXIgYnMgPSBkb2N1bWVudC5ib2R5LnN0eWxlO1xuICAgICAgICBicy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICsgXCJweFwiO1xuICAgICAgICBicy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIGJzLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgLy8gQm9keSBzaXplIHNvbHV0aW9uIGRvZXNuJ3Qgd29yayBvbiBhbGwgbW9iaWxlIGJyb3dzZXIgc28gdGhpcyBpcyB0aGUgYWxldGVybmF0aXZlOiBmaXhlZCBjb250YWluZXJcbiAgICAgICAgdmFyIGNvbnRTdHlsZSA9IGNjLmdhbWUuY29udGFpbmVyLnN0eWxlO1xuICAgICAgICBjb250U3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gICAgICAgIGNvbnRTdHlsZS5sZWZ0ID0gY29udFN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgIC8vIFJlcG9zaXRpb24gYm9keVxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxufSk7XG5cbi8qKlxuICogPHA+Y2MuQ29udGVudFN0cmF0ZWd5IGNsYXNzIGlzIHRoZSByb290IHN0cmF0ZWd5IGNsYXNzIG9mIGNvbnRlbnQncyBzY2FsZSBzdHJhdGVneSxcbiAqIGl0IGNvbnRyb2xzIHRoZSBiZWhhdmlvciBvZiBob3cgdG8gc2NhbGUgdGhlIHNjZW5lIGFuZCBzZXR1cCB0aGUgdmlld3BvcnQgZm9yIHRoZSBnYW1lPC9wPlxuICpcbiAqIEBjbGFzcyBDb250ZW50U3RyYXRlZ3lcbiAqL1xuY2MuQ29udGVudFN0cmF0ZWd5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6IFwiQ29udGVudFN0cmF0ZWd5XCIsXG5cbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Jlc3VsdCA9IHtcbiAgICAgICAgICAgIHNjYWxlOiBbMSwgMV0sXG4gICAgICAgICAgICB2aWV3cG9ydDogbnVsbFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBfYnVpbGRSZXN1bHQ6IGZ1bmN0aW9uIChjb250YWluZXJXLCBjb250YWluZXJILCBjb250ZW50VywgY29udGVudEgsIHNjYWxlWCwgc2NhbGVZKSB7XG4gICAgICAgIC8vIE1ha2VzIGNvbnRlbnQgZml0IGJldHRlciB0aGUgY2FudmFzXG4gICAgICAgIE1hdGguYWJzKGNvbnRhaW5lclcgLSBjb250ZW50VykgPCAyICYmIChjb250ZW50VyA9IGNvbnRhaW5lclcpO1xuICAgICAgICBNYXRoLmFicyhjb250YWluZXJIIC0gY29udGVudEgpIDwgMiAmJiAoY29udGVudEggPSBjb250YWluZXJIKTtcblxuICAgICAgICB2YXIgdmlld3BvcnQgPSBjYy5yZWN0KChjb250YWluZXJXIC0gY29udGVudFcpIC8gMiwgKGNvbnRhaW5lckggLSBjb250ZW50SCkgLyAyLCBjb250ZW50VywgY29udGVudEgpO1xuXG4gICAgICAgIC8vIFRyYW5zbGF0ZSB0aGUgY29udGVudFxuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUyl7XG4gICAgICAgICAgICAvL1RPRE86IG1vZGlmeSBzb21ldGhpbmcgZm9yIHNldFRyYW5zZm9ybVxuICAgICAgICAgICAgLy9jYy5nYW1lLl9yZW5kZXJDb250ZXh0LnRyYW5zbGF0ZSh2aWV3cG9ydC54LCB2aWV3cG9ydC55ICsgY29udGVudEgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVzdWx0LnNjYWxlID0gW3NjYWxlWCwgc2NhbGVZXTtcbiAgICAgICAgdGhpcy5fcmVzdWx0LnZpZXdwb3J0ID0gdmlld3BvcnQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBNYW5pcHVsYXRpb24gYmVmb3JlIGFwcGx5aW5nIHRoZSBzdHJhdGVneVxuICAgICAqICEjemgg562W55Wl5bqU55So5YmN55qE5pON5L2cXG4gICAgICogQG1ldGhvZCBwcmVBcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlldyAtIFRoZSB0YXJnZXQgdmlld1xuICAgICAqL1xuICAgIHByZUFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZ1bmN0aW9uIHRvIGFwcGx5IHRoaXMgc3RyYXRlZ3lcbiAgICAgKiBUaGUgcmV0dXJuIHZhbHVlIGlzIHtzY2FsZTogW3NjYWxlWCwgc2NhbGVZXSwgdmlld3BvcnQ6IHtjYy5SZWN0fX0sXG4gICAgICogVGhlIHRhcmdldCB2aWV3IGNhbiB0aGVuIGFwcGx5IHRoZXNlIHZhbHVlIHRvIGl0c2VsZiwgaXQncyBwcmVmZXJyZWQgbm90IHRvIG1vZGlmeSBkaXJlY3RseSBpdHMgcHJpdmF0ZSB2YXJpYWJsZXNcbiAgICAgKiAhI3poIOiwg+eUqOetlueVpeaWueazlVxuICAgICAqIEBtZXRob2QgYXBwbHlcbiAgICAgKiBAcGFyYW0ge1ZpZXd9IHZpZXdcbiAgICAgKiBAcGFyYW0ge1NpemV9IGRlc2lnbmVkUmVzb2x1dGlvblxuICAgICAqIEByZXR1cm4ge09iamVjdH0gc2NhbGVBbmRWaWV3cG9ydFJlY3RcbiAgICAgKi9cbiAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICByZXR1cm4ge1wic2NhbGVcIjogWzEsIDFdfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIE1hbmlwdWxhdGlvbiBhZnRlciBhcHBseWluZyB0aGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOetlueVpeiwg+eUqOS5i+WQjueahOaTjeS9nFxuICAgICAqIEBtZXRob2QgcG9zdEFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3IC0gVGhlIHRhcmdldCB2aWV3XG4gICAgICovXG4gICAgcG9zdEFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgIH1cbn0pO1xuXG4oZnVuY3Rpb24gKCkge1xuXG4vLyBDb250YWluZXIgc2NhbGUgc3RyYXRlZ3lzXG4gICAgLyoqXG4gICAgICogQGNsYXNzIEVxdWFsVG9GcmFtZVxuICAgICAqIEBleHRlbmRzIENvbnRhaW5lclN0cmF0ZWd5XG4gICAgICovXG4gICAgdmFyIEVxdWFsVG9GcmFtZSA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJFcXVhbFRvRnJhbWVcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGFpbmVyU3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAgICAgdmFyIGZyYW1lSCA9IHZpZXcuX2ZyYW1lU2l6ZS5oZWlnaHQsIGNvbnRhaW5lclN0eWxlID0gY2MuZ2FtZS5jb250YWluZXIuc3R5bGU7XG4gICAgICAgICAgICB0aGlzLl9zZXR1cENvbnRhaW5lcih2aWV3LCB2aWV3Ll9mcmFtZVNpemUud2lkdGgsIHZpZXcuX2ZyYW1lU2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgLy8gU2V0dXAgY29udGFpbmVyJ3MgbWFyZ2luIGFuZCBwYWRkaW5nXG4gICAgICAgICAgICBpZiAodmlldy5faXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUubWFyZ2luID0gJzAgMCAwICcgKyBmcmFtZUggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUubWFyZ2luID0gJzBweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXJTdHlsZS5wYWRkaW5nID0gXCIwcHhcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIFByb3BvcnRpb25hbFRvRnJhbWVcbiAgICAgKiBAZXh0ZW5kcyBDb250YWluZXJTdHJhdGVneVxuICAgICAqL1xuICAgIHZhciBQcm9wb3J0aW9uYWxUb0ZyYW1lID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIlByb3BvcnRpb25hbFRvRnJhbWVcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGFpbmVyU3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICB2YXIgZnJhbWVXID0gdmlldy5fZnJhbWVTaXplLndpZHRoLCBmcmFtZUggPSB2aWV3Ll9mcmFtZVNpemUuaGVpZ2h0LCBjb250YWluZXJTdHlsZSA9IGNjLmdhbWUuY29udGFpbmVyLnN0eWxlLFxuICAgICAgICAgICAgICAgIGRlc2lnblcgPSBkZXNpZ25lZFJlc29sdXRpb24ud2lkdGgsIGRlc2lnbkggPSBkZXNpZ25lZFJlc29sdXRpb24uaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNjYWxlWCA9IGZyYW1lVyAvIGRlc2lnblcsIHNjYWxlWSA9IGZyYW1lSCAvIGRlc2lnbkgsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyVywgY29udGFpbmVySDtcblxuICAgICAgICAgICAgc2NhbGVYIDwgc2NhbGVZID8gKGNvbnRhaW5lclcgPSBmcmFtZVcsIGNvbnRhaW5lckggPSBkZXNpZ25IICogc2NhbGVYKSA6IChjb250YWluZXJXID0gZGVzaWduVyAqIHNjYWxlWSwgY29udGFpbmVySCA9IGZyYW1lSCk7XG5cbiAgICAgICAgICAgIC8vIEFkanVzdCBjb250YWluZXIgc2l6ZSB3aXRoIGludGVnZXIgdmFsdWVcbiAgICAgICAgICAgIHZhciBvZmZ4ID0gTWF0aC5yb3VuZCgoZnJhbWVXIC0gY29udGFpbmVyVykgLyAyKTtcbiAgICAgICAgICAgIHZhciBvZmZ5ID0gTWF0aC5yb3VuZCgoZnJhbWVIIC0gY29udGFpbmVySCkgLyAyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lclcgPSBmcmFtZVcgLSAyICogb2ZmeDtcbiAgICAgICAgICAgIGNvbnRhaW5lckggPSBmcmFtZUggLSAyICogb2ZmeTtcblxuICAgICAgICAgICAgdGhpcy5fc2V0dXBDb250YWluZXIodmlldywgY29udGFpbmVyVywgY29udGFpbmVySCk7XG4gICAgICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIC8vIFNldHVwIGNvbnRhaW5lcidzIG1hcmdpbiBhbmQgcGFkZGluZ1xuICAgICAgICAgICAgICAgIGlmICh2aWV3Ll9pc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUubWFyZ2luID0gJzAgMCAwICcgKyBmcmFtZUggKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyU3R5bGUubWFyZ2luID0gJzBweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLnBhZGRpbmdMZWZ0ID0gb2ZmeCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZS5wYWRkaW5nUmlnaHQgPSBvZmZ4ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLnBhZGRpbmdUb3AgPSBvZmZ5ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclN0eWxlLnBhZGRpbmdCb3R0b20gPSBvZmZ5ICsgXCJweFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAY2xhc3MgRXF1YWxUb1dpbmRvd1xuICAgICAqIEBleHRlbmRzIEVxdWFsVG9GcmFtZVxuICAgICAqL1xuICAgIHZhciBFcXVhbFRvV2luZG93ID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIkVxdWFsVG9XaW5kb3dcIixcbiAgICAgICAgZXh0ZW5kczogRXF1YWxUb0ZyYW1lLFxuICAgICAgICBwcmVBcHBseTogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKHZpZXcpO1xuICAgICAgICAgICAgY2MuZ2FtZS5mcmFtZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgfSxcblxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKHZpZXcpO1xuICAgICAgICAgICAgdGhpcy5fZml4Q29udGFpbmVyKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBjbGFzcyBQcm9wb3J0aW9uYWxUb1dpbmRvd1xuICAgICAqIEBleHRlbmRzIFByb3BvcnRpb25hbFRvRnJhbWVcbiAgICAgKi9cbiAgICB2YXIgUHJvcG9ydGlvbmFsVG9XaW5kb3cgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiUHJvcG9ydGlvbmFsVG9XaW5kb3dcIixcbiAgICAgICAgZXh0ZW5kczogUHJvcG9ydGlvbmFsVG9GcmFtZSxcbiAgICAgICAgcHJlQXBwbHk6IGZ1bmN0aW9uICh2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9zdXBlcih2aWV3KTtcbiAgICAgICAgICAgIGNjLmdhbWUuZnJhbWUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N1cGVyKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbik7XG4gICAgICAgICAgICB0aGlzLl9maXhDb250YWluZXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQGNsYXNzIE9yaWdpbmFsQ29udGFpbmVyXG4gICAgICogQGV4dGVuZHMgQ29udGFpbmVyU3RyYXRlZ3lcbiAgICAgKi9cbiAgICB2YXIgT3JpZ2luYWxDb250YWluZXIgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiT3JpZ2luYWxDb250YWluZXJcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGFpbmVyU3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICAgICAgdGhpcy5fc2V0dXBDb250YWluZXIodmlldywgY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNjLmdhbWUuY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIG5lZWQgdG8gYWRhcHQgcHJvdG90eXBlIGJlZm9yZSBpbnN0YW50aWF0aW5nXG4gICAgbGV0IF9nbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcbiAgICBsZXQgZ2xvYmFsQWRhcHRlciA9IF9nbG9iYWwuX19nbG9iYWxBZGFwdGVyO1xuICAgIGlmIChnbG9iYWxBZGFwdGVyKSB7XG4gICAgICAgIGlmIChnbG9iYWxBZGFwdGVyLmFkYXB0Q29udGFpbmVyU3RyYXRlZ3kpIHtcbiAgICAgICAgICAgIGdsb2JhbEFkYXB0ZXIuYWRhcHRDb250YWluZXJTdHJhdGVneShjYy5Db250YWluZXJTdHJhdGVneS5wcm90b3R5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbG9iYWxBZGFwdGVyLmFkYXB0Vmlldykge1xuICAgICAgICAgICAgZ2xvYmFsQWRhcHRlci5hZGFwdFZpZXcoVmlldy5wcm90b3R5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyAjTk9UIFNUQUJMRSBvbiBBbmRyb2lkIyBBbGlhczogU3RyYXRlZ3kgdGhhdCBtYWtlcyB0aGUgY29udGFpbmVyJ3Mgc2l6ZSBlcXVhbHMgdG8gdGhlIHdpbmRvdydzIHNpemVcbi8vICAgIGNjLkNvbnRhaW5lclN0cmF0ZWd5LkVRVUFMX1RPX1dJTkRPVyA9IG5ldyBFcXVhbFRvV2luZG93KCk7XG4vLyAjTk9UIFNUQUJMRSBvbiBBbmRyb2lkIyBBbGlhczogU3RyYXRlZ3kgdGhhdCBzY2FsZSBwcm9wb3J0aW9uYWxseSB0aGUgY29udGFpbmVyJ3Mgc2l6ZSB0byB3aW5kb3cncyBzaXplXG4vLyAgICBjYy5Db250YWluZXJTdHJhdGVneS5QUk9QT1JUSU9OX1RPX1dJTkRPVyA9IG5ldyBQcm9wb3J0aW9uYWxUb1dpbmRvdygpO1xuLy8gQWxpYXM6IFN0cmF0ZWd5IHRoYXQgbWFrZXMgdGhlIGNvbnRhaW5lcidzIHNpemUgZXF1YWxzIHRvIHRoZSBmcmFtZSdzIHNpemVcbiAgICBjYy5Db250YWluZXJTdHJhdGVneS5FUVVBTF9UT19GUkFNRSA9IG5ldyBFcXVhbFRvRnJhbWUoKTtcbi8vIEFsaWFzOiBTdHJhdGVneSB0aGF0IHNjYWxlIHByb3BvcnRpb25hbGx5IHRoZSBjb250YWluZXIncyBzaXplIHRvIGZyYW1lJ3Mgc2l6ZVxuICAgIGNjLkNvbnRhaW5lclN0cmF0ZWd5LlBST1BPUlRJT05fVE9fRlJBTUUgPSBuZXcgUHJvcG9ydGlvbmFsVG9GcmFtZSgpO1xuLy8gQWxpYXM6IFN0cmF0ZWd5IHRoYXQga2VlcHMgdGhlIG9yaWdpbmFsIGNvbnRhaW5lcidzIHNpemVcbiAgICBjYy5Db250YWluZXJTdHJhdGVneS5PUklHSU5BTF9DT05UQUlORVIgPSBuZXcgT3JpZ2luYWxDb250YWluZXIoKTtcblxuLy8gQ29udGVudCBzY2FsZSBzdHJhdGVneXNcbiAgICB2YXIgRXhhY3RGaXQgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiRXhhY3RGaXRcIixcbiAgICAgICAgZXh0ZW5kczogY2MuQ29udGVudFN0cmF0ZWd5LFxuICAgICAgICBhcHBseTogZnVuY3Rpb24gKHZpZXcsIGRlc2lnbmVkUmVzb2x1dGlvbikge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lclcgPSBjYy5nYW1lLmNhbnZhcy53aWR0aCwgY29udGFpbmVySCA9IGNjLmdhbWUuY2FudmFzLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzY2FsZVggPSBjb250YWluZXJXIC8gZGVzaWduZWRSZXNvbHV0aW9uLndpZHRoLCBzY2FsZVkgPSBjb250YWluZXJIIC8gZGVzaWduZWRSZXNvbHV0aW9uLmhlaWdodDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkUmVzdWx0KGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIFNob3dBbGwgPSBjYy5DbGFzcyh7XG4gICAgICAgIG5hbWU6IFwiU2hvd0FsbFwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250ZW50U3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyVyA9IGNjLmdhbWUuY2FudmFzLndpZHRoLCBjb250YWluZXJIID0gY2MuZ2FtZS5jYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRlc2lnblcgPSBkZXNpZ25lZFJlc29sdXRpb24ud2lkdGgsIGRlc2lnbkggPSBkZXNpZ25lZFJlc29sdXRpb24uaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNjYWxlWCA9IGNvbnRhaW5lclcgLyBkZXNpZ25XLCBzY2FsZVkgPSBjb250YWluZXJIIC8gZGVzaWduSCwgc2NhbGUgPSAwLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXLCBjb250ZW50SDtcblxuICAgICAgICAgICAgc2NhbGVYIDwgc2NhbGVZID8gKHNjYWxlID0gc2NhbGVYLCBjb250ZW50VyA9IGNvbnRhaW5lclcsIGNvbnRlbnRIID0gZGVzaWduSCAqIHNjYWxlKVxuICAgICAgICAgICAgICAgIDogKHNjYWxlID0gc2NhbGVZLCBjb250ZW50VyA9IGRlc2lnblcgKiBzY2FsZSwgY29udGVudEggPSBjb250YWluZXJIKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkUmVzdWx0KGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIGNvbnRlbnRXLCBjb250ZW50SCwgc2NhbGUsIHNjYWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIE5vQm9yZGVyID0gY2MuQ2xhc3Moe1xuICAgICAgICBuYW1lOiBcIk5vQm9yZGVyXCIsXG4gICAgICAgIGV4dGVuZHM6IGNjLkNvbnRlbnRTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXID0gY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNvbnRhaW5lckggPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgZGVzaWduVyA9IGRlc2lnbmVkUmVzb2x1dGlvbi53aWR0aCwgZGVzaWduSCA9IGRlc2lnbmVkUmVzb2x1dGlvbi5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc2NhbGVYID0gY29udGFpbmVyVyAvIGRlc2lnblcsIHNjYWxlWSA9IGNvbnRhaW5lckggLyBkZXNpZ25ILCBzY2FsZSxcbiAgICAgICAgICAgICAgICBjb250ZW50VywgY29udGVudEg7XG5cbiAgICAgICAgICAgIHNjYWxlWCA8IHNjYWxlWSA/IChzY2FsZSA9IHNjYWxlWSwgY29udGVudFcgPSBkZXNpZ25XICogc2NhbGUsIGNvbnRlbnRIID0gY29udGFpbmVySClcbiAgICAgICAgICAgICAgICA6IChzY2FsZSA9IHNjYWxlWCwgY29udGVudFcgPSBjb250YWluZXJXLCBjb250ZW50SCA9IGRlc2lnbkggKiBzY2FsZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWlsZFJlc3VsdChjb250YWluZXJXLCBjb250YWluZXJILCBjb250ZW50VywgY29udGVudEgsIHNjYWxlLCBzY2FsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBGaXhlZEhlaWdodCA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJGaXhlZEhlaWdodFwiLFxuICAgICAgICBleHRlbmRzOiBjYy5Db250ZW50U3RyYXRlZ3ksXG4gICAgICAgIGFwcGx5OiBmdW5jdGlvbiAodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyVyA9IGNjLmdhbWUuY2FudmFzLndpZHRoLCBjb250YWluZXJIID0gY2MuZ2FtZS5jYW52YXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRlc2lnbkggPSBkZXNpZ25lZFJlc29sdXRpb24uaGVpZ2h0LCBzY2FsZSA9IGNvbnRhaW5lckggLyBkZXNpZ25ILFxuICAgICAgICAgICAgICAgIGNvbnRlbnRXID0gY29udGFpbmVyVywgY29udGVudEggPSBjb250YWluZXJIO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRSZXN1bHQoY29udGFpbmVyVywgY29udGFpbmVySCwgY29udGVudFcsIGNvbnRlbnRILCBzY2FsZSwgc2NhbGUpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgRml4ZWRXaWR0aCA9IGNjLkNsYXNzKHtcbiAgICAgICAgbmFtZTogXCJGaXhlZFdpZHRoXCIsXG4gICAgICAgIGV4dGVuZHM6IGNjLkNvbnRlbnRTdHJhdGVneSxcbiAgICAgICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJXID0gY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNvbnRhaW5lckggPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgZGVzaWduVyA9IGRlc2lnbmVkUmVzb2x1dGlvbi53aWR0aCwgc2NhbGUgPSBjb250YWluZXJXIC8gZGVzaWduVyxcbiAgICAgICAgICAgICAgICBjb250ZW50VyA9IGNvbnRhaW5lclcsIGNvbnRlbnRIID0gY29udGFpbmVySDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkUmVzdWx0KGNvbnRhaW5lclcsIGNvbnRhaW5lckgsIGNvbnRlbnRXLCBjb250ZW50SCwgc2NhbGUsIHNjYWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4vLyBBbGlhczogU3RyYXRlZ3kgdG8gc2NhbGUgdGhlIGNvbnRlbnQncyBzaXplIHRvIGNvbnRhaW5lcidzIHNpemUsIG5vbiBwcm9wb3J0aW9uYWxcbiAgICBjYy5Db250ZW50U3RyYXRlZ3kuRVhBQ1RfRklUID0gbmV3IEV4YWN0Rml0KCk7XG4vLyBBbGlhczogU3RyYXRlZ3kgdG8gc2NhbGUgdGhlIGNvbnRlbnQncyBzaXplIHByb3BvcnRpb25hbGx5IHRvIG1heGltdW0gc2l6ZSBhbmQga2VlcHMgdGhlIHdob2xlIGNvbnRlbnQgYXJlYSB0byBiZSB2aXNpYmxlXG4gICAgY2MuQ29udGVudFN0cmF0ZWd5LlNIT1dfQUxMID0gbmV3IFNob3dBbGwoKTtcbi8vIEFsaWFzOiBTdHJhdGVneSB0byBzY2FsZSB0aGUgY29udGVudCdzIHNpemUgcHJvcG9ydGlvbmFsbHkgdG8gZmlsbCB0aGUgd2hvbGUgY29udGFpbmVyIGFyZWFcbiAgICBjYy5Db250ZW50U3RyYXRlZ3kuTk9fQk9SREVSID0gbmV3IE5vQm9yZGVyKCk7XG4vLyBBbGlhczogU3RyYXRlZ3kgdG8gc2NhbGUgdGhlIGNvbnRlbnQncyBoZWlnaHQgdG8gY29udGFpbmVyJ3MgaGVpZ2h0IGFuZCBwcm9wb3J0aW9uYWxseSBzY2FsZSBpdHMgd2lkdGhcbiAgICBjYy5Db250ZW50U3RyYXRlZ3kuRklYRURfSEVJR0hUID0gbmV3IEZpeGVkSGVpZ2h0KCk7XG4vLyBBbGlhczogU3RyYXRlZ3kgdG8gc2NhbGUgdGhlIGNvbnRlbnQncyB3aWR0aCB0byBjb250YWluZXIncyB3aWR0aCBhbmQgcHJvcG9ydGlvbmFsbHkgc2NhbGUgaXRzIGhlaWdodFxuICAgIGNjLkNvbnRlbnRTdHJhdGVneS5GSVhFRF9XSURUSCA9IG5ldyBGaXhlZFdpZHRoKCk7XG5cbn0pKCk7XG5cbi8qKlxuICogPHA+Y2MuUmVzb2x1dGlvblBvbGljeSBjbGFzcyBpcyB0aGUgcm9vdCBzdHJhdGVneSBjbGFzcyBvZiBzY2FsZSBzdHJhdGVneSxcbiAqIGl0cyBtYWluIHRhc2sgaXMgdG8gbWFpbnRhaW4gdGhlIGNvbXBhdGliaWxpdHkgd2l0aCBDb2NvczJkLXg8L3A+XG4gKlxuICogQGNsYXNzIFJlc29sdXRpb25Qb2xpY3lcbiAqL1xuLyoqXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbnRhaW5lclN0cmF0ZWd5fSBjb250YWluZXJTdGcgVGhlIGNvbnRhaW5lciBzdHJhdGVneVxuICogQHBhcmFtIHtDb250ZW50U3RyYXRlZ3l9IGNvbnRlbnRTdGcgVGhlIGNvbnRlbnQgc3RyYXRlZ3lcbiAqL1xuY2MuUmVzb2x1dGlvblBvbGljeSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiBcImNjLlJlc29sdXRpb25Qb2xpY3lcIixcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvciBvZiBjYy5SZXNvbHV0aW9uUG9saWN5XG4gICAgICogQHBhcmFtIHtDb250YWluZXJTdHJhdGVneX0gY29udGFpbmVyU3RnXG4gICAgICogQHBhcmFtIHtDb250ZW50U3RyYXRlZ3l9IGNvbnRlbnRTdGdcbiAgICAgKi9cbiAgICBjdG9yOiBmdW5jdGlvbiAoY29udGFpbmVyU3RnLCBjb250ZW50U3RnKSB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lclN0cmF0ZWd5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY29udGVudFN0cmF0ZWd5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZXRDb250YWluZXJTdHJhdGVneShjb250YWluZXJTdGcpO1xuICAgICAgICB0aGlzLnNldENvbnRlbnRTdHJhdGVneShjb250ZW50U3RnKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBNYW5pcHVsYXRpb24gYmVmb3JlIGFwcGx5aW5nIHRoZSByZXNvbHV0aW9uIHBvbGljeVxuICAgICAqICEjemgg562W55Wl5bqU55So5YmN55qE5pON5L2cXG4gICAgICogQG1ldGhvZCBwcmVBcHBseVxuICAgICAqIEBwYXJhbSB7Vmlld30gdmlldyBUaGUgdGFyZ2V0IHZpZXdcbiAgICAgKi9cbiAgICBwcmVBcHBseTogZnVuY3Rpb24gKHZpZXcpIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyU3RyYXRlZ3kucHJlQXBwbHkodmlldyk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRTdHJhdGVneS5wcmVBcHBseSh2aWV3KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGdW5jdGlvbiB0byBhcHBseSB0aGlzIHJlc29sdXRpb24gcG9saWN5XG4gICAgICogVGhlIHJldHVybiB2YWx1ZSBpcyB7c2NhbGU6IFtzY2FsZVgsIHNjYWxlWV0sIHZpZXdwb3J0OiB7Y2MuUmVjdH19LFxuICAgICAqIFRoZSB0YXJnZXQgdmlldyBjYW4gdGhlbiBhcHBseSB0aGVzZSB2YWx1ZSB0byBpdHNlbGYsIGl0J3MgcHJlZmVycmVkIG5vdCB0byBtb2RpZnkgZGlyZWN0bHkgaXRzIHByaXZhdGUgdmFyaWFibGVzXG4gICAgICogISN6aCDosIPnlKjnrZbnlaXmlrnms5VcbiAgICAgKiBAbWV0aG9kIGFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3IC0gVGhlIHRhcmdldCB2aWV3XG4gICAgICogQHBhcmFtIHtTaXplfSBkZXNpZ25lZFJlc29sdXRpb24gLSBUaGUgdXNlciBkZWZpbmVkIGRlc2lnbiByZXNvbHV0aW9uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgY29udGFpbnMgdGhlIHNjYWxlIFgvWSB2YWx1ZXMgYW5kIHRoZSB2aWV3cG9ydCByZWN0XG4gICAgICovXG4gICAgYXBwbHk6IGZ1bmN0aW9uICh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyU3RyYXRlZ3kuYXBwbHkodmlldywgZGVzaWduZWRSZXNvbHV0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTdHJhdGVneS5hcHBseSh2aWV3LCBkZXNpZ25lZFJlc29sdXRpb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1hbmlwdWxhdGlvbiBhZnRlciBhcHB5bGluZyB0aGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOetlueVpeW6lOeUqOS5i+WQjueahOaTjeS9nFxuICAgICAqIEBtZXRob2QgcG9zdEFwcGx5XG4gICAgICogQHBhcmFtIHtWaWV3fSB2aWV3IC0gVGhlIHRhcmdldCB2aWV3XG4gICAgICovXG4gICAgcG9zdEFwcGx5OiBmdW5jdGlvbiAodmlldykge1xuICAgICAgICB0aGlzLl9jb250YWluZXJTdHJhdGVneS5wb3N0QXBwbHkodmlldyk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRTdHJhdGVneS5wb3N0QXBwbHkodmlldyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXR1cCB0aGUgY29udGFpbmVyJ3Mgc2NhbGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOiuvue9ruWuueWZqOeahOmAgumFjeetlueVpVxuICAgICAqIEBtZXRob2Qgc2V0Q29udGFpbmVyU3RyYXRlZ3lcbiAgICAgKiBAcGFyYW0ge0NvbnRhaW5lclN0cmF0ZWd5fSBjb250YWluZXJTdGdcbiAgICAgKi9cbiAgICBzZXRDb250YWluZXJTdHJhdGVneTogZnVuY3Rpb24gKGNvbnRhaW5lclN0Zykge1xuICAgICAgICBpZiAoY29udGFpbmVyU3RnIGluc3RhbmNlb2YgY2MuQ29udGFpbmVyU3RyYXRlZ3kpXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXJTdHJhdGVneSA9IGNvbnRhaW5lclN0ZztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHVwIHRoZSBjb250ZW50J3Mgc2NhbGUgc3RyYXRlZ3lcbiAgICAgKiAhI3poIOiuvue9ruWGheWuueeahOmAgumFjeetlueVpVxuICAgICAqIEBtZXRob2Qgc2V0Q29udGVudFN0cmF0ZWd5XG4gICAgICogQHBhcmFtIHtDb250ZW50U3RyYXRlZ3l9IGNvbnRlbnRTdGdcbiAgICAgKi9cbiAgICBzZXRDb250ZW50U3RyYXRlZ3k6IGZ1bmN0aW9uIChjb250ZW50U3RnKSB7XG4gICAgICAgIGlmIChjb250ZW50U3RnIGluc3RhbmNlb2YgY2MuQ29udGVudFN0cmF0ZWd5KVxuICAgICAgICAgICAgdGhpcy5fY29udGVudFN0cmF0ZWd5ID0gY29udGVudFN0ZztcbiAgICB9XG59KTtcblxuanMuZ2V0KGNjLlJlc29sdXRpb25Qb2xpY3kucHJvdG90eXBlLCBcImNhbnZhc1NpemVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYy52MihjYy5nYW1lLmNhbnZhcy53aWR0aCwgY2MuZ2FtZS5jYW52YXMuaGVpZ2h0KTtcbn0pO1xuXG4vKipcbiAqIFRoZSBlbnRpcmUgYXBwbGljYXRpb24gaXMgdmlzaWJsZSBpbiB0aGUgc3BlY2lmaWVkIGFyZWEgd2l0aG91dCB0cnlpbmcgdG8gcHJlc2VydmUgdGhlIG9yaWdpbmFsIGFzcGVjdCByYXRpby48YnIvPlxuICogRGlzdG9ydGlvbiBjYW4gb2NjdXIsIGFuZCB0aGUgYXBwbGljYXRpb24gbWF5IGFwcGVhciBzdHJldGNoZWQgb3IgY29tcHJlc3NlZC5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFWEFDVF9GSVRcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5LkVYQUNUX0ZJVCA9IDA7XG5cbi8qKlxuICogVGhlIGVudGlyZSBhcHBsaWNhdGlvbiBmaWxscyB0aGUgc3BlY2lmaWVkIGFyZWEsIHdpdGhvdXQgZGlzdG9ydGlvbiBidXQgcG9zc2libHkgd2l0aCBzb21lIGNyb3BwaW5nLDxici8+XG4gKiB3aGlsZSBtYWludGFpbmluZyB0aGUgb3JpZ2luYWwgYXNwZWN0IHJhdGlvIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT19CT1JERVJcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5Lk5PX0JPUkRFUiA9IDE7XG5cbi8qKlxuICogVGhlIGVudGlyZSBhcHBsaWNhdGlvbiBpcyB2aXNpYmxlIGluIHRoZSBzcGVjaWZpZWQgYXJlYSB3aXRob3V0IGRpc3RvcnRpb24gd2hpbGUgbWFpbnRhaW5pbmcgdGhlIG9yaWdpbmFsPGJyLz5cbiAqIGFzcGVjdCByYXRpbyBvZiB0aGUgYXBwbGljYXRpb24uIEJvcmRlcnMgY2FuIGFwcGVhciBvbiB0d28gc2lkZXMgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFNIT1dfQUxMXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuUmVzb2x1dGlvblBvbGljeS5TSE9XX0FMTCA9IDI7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIHRha2VzIHRoZSBoZWlnaHQgb2YgdGhlIGRlc2lnbiByZXNvbHV0aW9uIHNpemUgYW5kIG1vZGlmaWVzIHRoZSB3aWR0aCBvZiB0aGUgaW50ZXJuYWw8YnIvPlxuICogY2FudmFzIHNvIHRoYXQgaXQgZml0cyB0aGUgYXNwZWN0IHJhdGlvIG9mIHRoZSBkZXZpY2U8YnIvPlxuICogbm8gZGlzdG9ydGlvbiB3aWxsIG9jY3VyIGhvd2V2ZXIgeW91IG11c3QgbWFrZSBzdXJlIHlvdXIgYXBwbGljYXRpb24gd29ya3Mgb24gZGlmZmVyZW50PGJyLz5cbiAqIGFzcGVjdCByYXRpb3NcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGSVhFRF9IRUlHSFRcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5SZXNvbHV0aW9uUG9saWN5LkZJWEVEX0hFSUdIVCA9IDM7XG5cbi8qKlxuICogVGhlIGFwcGxpY2F0aW9uIHRha2VzIHRoZSB3aWR0aCBvZiB0aGUgZGVzaWduIHJlc29sdXRpb24gc2l6ZSBhbmQgbW9kaWZpZXMgdGhlIGhlaWdodCBvZiB0aGUgaW50ZXJuYWw8YnIvPlxuICogY2FudmFzIHNvIHRoYXQgaXQgZml0cyB0aGUgYXNwZWN0IHJhdGlvIG9mIHRoZSBkZXZpY2U8YnIvPlxuICogbm8gZGlzdG9ydGlvbiB3aWxsIG9jY3VyIGhvd2V2ZXIgeW91IG11c3QgbWFrZSBzdXJlIHlvdXIgYXBwbGljYXRpb24gd29ya3Mgb24gZGlmZmVyZW50PGJyLz5cbiAqIGFzcGVjdCByYXRpb3NcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGSVhFRF9XSURUSFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLlJlc29sdXRpb25Qb2xpY3kuRklYRURfV0lEVEggPSA0O1xuXG4vKipcbiAqIFVua25vdyBwb2xpY3lcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBVTktOT1dOXG4gKiBAcmVhZG9ubHlcbiAqIEBzdGF0aWNcbiAqL1xuY2MuUmVzb2x1dGlvblBvbGljeS5VTktOT1dOID0gNTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuIGNjLnZpZXcgaXMgdGhlIHNoYXJlZCB2aWV3IG9iamVjdC5cbiAqICEjemggY2MudmlldyDmmK/lhajlsYDnmoTop4blm77lr7nosaHjgIJcbiAqIEBwcm9wZXJ0eSB2aWV3XG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7Vmlld31cbiAqL1xuY2MudmlldyA9IG5ldyBWaWV3KCk7XG5cbi8qKlxuICogISNlbiBjYy53aW5TaXplIGlzIHRoZSBhbGlhcyBvYmplY3QgZm9yIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50IGdhbWUgd2luZG93LlxuICogISN6aCBjYy53aW5TaXplIOS4uuW9k+WJjeeahOa4uOaIj+eql+WPo+eahOWkp+Wwj+OAglxuICogQHByb3BlcnR5IHdpblNpemVcbiAqIEB0eXBlIFNpemVcbiAqL1xuY2Mud2luU2l6ZSA9IGNjLnNpemUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy52aWV3O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=