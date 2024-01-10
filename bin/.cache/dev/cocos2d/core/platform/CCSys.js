
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCSys.js';
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
var settingPlatform;

if (!CC_EDITOR) {
  settingPlatform = window._CCSettings ? _CCSettings.platform : undefined;
}

var isVivoGame = settingPlatform === 'qgame';
var isOppoGame = settingPlatform === 'quickgame';
var isHuaweiGame = settingPlatform === 'huawei';
var isJKWGame = settingPlatform === 'jkw-game';
var isQttGame = settingPlatform === 'qtt-game';
var isLinkSure = settingPlatform === 'link-sure';

var _global = typeof window === 'undefined' ? global : window;

function initSys() {
  /**
   * System variables
   * @class sys
   * @main
   * @static
   */
  cc.sys = {};
  var sys = cc.sys;
  /**
   * English language code
   * @property {String} LANGUAGE_ENGLISH
   * @readOnly
   */

  sys.LANGUAGE_ENGLISH = "en";
  /**
   * Chinese language code
   * @property {String} LANGUAGE_CHINESE
   * @readOnly
   */

  sys.LANGUAGE_CHINESE = "zh";
  /**
   * French language code
   * @property {String} LANGUAGE_FRENCH
   * @readOnly
   */

  sys.LANGUAGE_FRENCH = "fr";
  /**
   * Italian language code
   * @property {String} LANGUAGE_ITALIAN
   * @readOnly
   */

  sys.LANGUAGE_ITALIAN = "it";
  /**
   * German language code
   * @property {String} LANGUAGE_GERMAN
   * @readOnly
   */

  sys.LANGUAGE_GERMAN = "de";
  /**
   * Spanish language code
   * @property {String} LANGUAGE_SPANISH
   * @readOnly
   */

  sys.LANGUAGE_SPANISH = "es";
  /**
   * Spanish language code
   * @property {String} LANGUAGE_DUTCH
   * @readOnly
   */

  sys.LANGUAGE_DUTCH = "du";
  /**
   * Russian language code
   * @property {String} LANGUAGE_RUSSIAN
   * @readOnly
   */

  sys.LANGUAGE_RUSSIAN = "ru";
  /**
   * Korean language code
   * @property {String} LANGUAGE_KOREAN
   * @readOnly
   */

  sys.LANGUAGE_KOREAN = "ko";
  /**
   * Japanese language code
   * @property {String} LANGUAGE_JAPANESE
   * @readOnly
   */

  sys.LANGUAGE_JAPANESE = "ja";
  /**
   * Hungarian language code
   * @property {String} LANGUAGE_HUNGARIAN
   * @readonly
   */

  sys.LANGUAGE_HUNGARIAN = "hu";
  /**
   * Portuguese language code
   * @property {String} LANGUAGE_PORTUGUESE
   * @readOnly
   */

  sys.LANGUAGE_PORTUGUESE = "pt";
  /**
   * Arabic language code
   * @property {String} LANGUAGE_ARABIC
   * @readOnly
   */

  sys.LANGUAGE_ARABIC = "ar";
  /**
   * Norwegian language code
   * @property {String} LANGUAGE_NORWEGIAN
   * @readOnly
   */

  sys.LANGUAGE_NORWEGIAN = "no";
  /**
   * Polish language code
   * @property {String} LANGUAGE_POLISH
   * @readOnly
   */

  sys.LANGUAGE_POLISH = "pl";
  /**
   * Turkish language code
   * @property {String} LANGUAGE_TURKISH
   * @readOnly
   */

  sys.LANGUAGE_TURKISH = "tr";
  /**
   * Ukrainian language code
   * @property {String} LANGUAGE_UKRAINIAN
   * @readOnly
   */

  sys.LANGUAGE_UKRAINIAN = "uk";
  /**
   * Romanian language code
   * @property {String} LANGUAGE_ROMANIAN
   * @readOnly
   */

  sys.LANGUAGE_ROMANIAN = "ro";
  /**
   * Bulgarian language code
   * @property {String} LANGUAGE_BULGARIAN
   * @readOnly
   */

  sys.LANGUAGE_BULGARIAN = "bg";
  /**
   * Unknown language code
   * @property {String} LANGUAGE_UNKNOWN
   * @readOnly
   */

  sys.LANGUAGE_UNKNOWN = "unknown";
  /**
   * @property {String} OS_IOS
   * @readOnly
   */

  sys.OS_IOS = "iOS";
  /**
   * @property {String} OS_ANDROID
   * @readOnly
   */

  sys.OS_ANDROID = "Android";
  /**
   * @property {String} OS_WINDOWS
   * @readOnly
   */

  sys.OS_WINDOWS = "Windows";
  /**
   * @property {String} OS_MARMALADE
   * @readOnly
   */

  sys.OS_MARMALADE = "Marmalade";
  /**
   * @property {String} OS_LINUX
   * @readOnly
   */

  sys.OS_LINUX = "Linux";
  /**
   * @property {String} OS_BADA
   * @readOnly
   */

  sys.OS_BADA = "Bada";
  /**
   * @property {String} OS_BLACKBERRY
   * @readOnly
   */

  sys.OS_BLACKBERRY = "Blackberry";
  /**
   * @property {String} OS_OSX
   * @readOnly
   */

  sys.OS_OSX = "OS X";
  /**
   * @property {String} OS_WP8
   * @readOnly
   */

  sys.OS_WP8 = "WP8";
  /**
   * @property {String} OS_WINRT
   * @readOnly
   */

  sys.OS_WINRT = "WINRT";
  /**
   * @property {String} OS_UNKNOWN
   * @readOnly
   */

  sys.OS_UNKNOWN = "Unknown";
  /**
   * @property {Number} UNKNOWN
   * @readOnly
   * @default -1
   */

  sys.UNKNOWN = -1;
  /**
   * @property {Number} WIN32
   * @readOnly
   * @default 0
   */

  sys.WIN32 = 0;
  /**
   * @property {Number} LINUX
   * @readOnly
   * @default 1
   */

  sys.LINUX = 1;
  /**
   * @property {Number} MACOS
   * @readOnly
   * @default 2
   */

  sys.MACOS = 2;
  /**
   * @property {Number} ANDROID
   * @readOnly
   * @default 3
   */

  sys.ANDROID = 3;
  /**
   * @property {Number} IPHONE
   * @readOnly
   * @default 4
   */

  sys.IPHONE = 4;
  /**
   * @property {Number} IPAD
   * @readOnly
   * @default 5
   */

  sys.IPAD = 5;
  /**
   * @property {Number} BLACKBERRY
   * @readOnly
   * @default 6
   */

  sys.BLACKBERRY = 6;
  /**
   * @property {Number} NACL
   * @readOnly
   * @default 7
   */

  sys.NACL = 7;
  /**
   * @property {Number} EMSCRIPTEN
   * @readOnly
   * @default 8
   */

  sys.EMSCRIPTEN = 8;
  /**
   * @property {Number} TIZEN
   * @readOnly
   * @default 9
   */

  sys.TIZEN = 9;
  /**
   * @property {Number} WINRT
   * @readOnly
   * @default 10
   */

  sys.WINRT = 10;
  /**
   * @property {Number} WP8
   * @readOnly
   * @default 11
   */

  sys.WP8 = 11;
  /**
   * @property {Number} MOBILE_BROWSER
   * @readOnly
   * @default 100
   */

  sys.MOBILE_BROWSER = 100;
  /**
   * @property {Number} DESKTOP_BROWSER
   * @readOnly
   * @default 101
   */

  sys.DESKTOP_BROWSER = 101;
  /**
   * Indicates whether executes in editor's window process (Electron's renderer context)
   * @property {Number} EDITOR_PAGE
   * @readOnly
   * @default 102
   */

  sys.EDITOR_PAGE = 102;
  /**
   * Indicates whether executes in editor's main process (Electron's browser context)
   * @property {Number} EDITOR_CORE
   * @readOnly
   * @default 103
   */

  sys.EDITOR_CORE = 103;
  /**
   * @property {Number} WECHAT_GAME
   * @readOnly
   * @default 104
   */

  sys.WECHAT_GAME = 104;
  /**
   * @property {Number} QQ_PLAY
   * @readOnly
   * @default 105
   */

  sys.QQ_PLAY = 105;
  /**
   * @property {Number} FB_PLAYABLE_ADS
   * @readOnly
   * @default 106
   */

  sys.FB_PLAYABLE_ADS = 106;
  /**
   * @property {Number} BAIDU_GAME
   * @readOnly
   * @default 107
   */

  sys.BAIDU_GAME = 107;
  /**
   * @property {Number} VIVO_GAME
   * @readOnly
   * @default 108
   */

  sys.VIVO_GAME = 108;
  /**
   * @property {Number} OPPO_GAME
   * @readOnly
   * @default 109
   */

  sys.OPPO_GAME = 109;
  /**
   * @property {Number} HUAWEI_GAME
   * @readOnly
   * @default 110
   */

  sys.HUAWEI_GAME = 110;
  /**
   * @property {Number} XIAOMI_GAME
   * @readOnly
   * @default 111
   */

  sys.XIAOMI_GAME = 111;
  /**
   * @property {Number} JKW_GAME
   * @readOnly
   * @default 112
   */

  sys.JKW_GAME = 112;
  /**
   * @property {Number} ALIPAY_GAME
   * @readOnly
   * @default 113
   */

  sys.ALIPAY_GAME = 113;
  /**
   * @property {Number} WECHAT_GAME_SUB
   * @readOnly
   * @default 114
   */

  sys.WECHAT_GAME_SUB = 114;
  /**
   * @property {Number} BAIDU_GAME_SUB
   * @readOnly
   * @default 115
   */

  sys.BAIDU_GAME_SUB = 115;
  /**
   * @property {Number} QTT_GAME
   * @readOnly
   * @default 116
   */

  sys.QTT_GAME = 116;
  /**
   * @property {Number} BYTEDANCE_GAME
   * @readOnly
   * @default 117
   */

  sys.BYTEDANCE_GAME = 117;
  /**
   * @property {Number} BYTEDANCE_GAME_SUB
   * @readOnly
   * @default 118
   */

  sys.BYTEDANCE_GAME_SUB = 118;
  /**
   * @property {Number} LINKSURE
   * @readOnly
   * @default 119
   */

  sys.LINKSURE = 119;
  /**
   * BROWSER_TYPE_WECHAT
   * @property {String} BROWSER_TYPE_WECHAT
   * @readOnly
   * @default "wechat"
   */

  sys.BROWSER_TYPE_WECHAT = "wechat";
  /**
   *
   * @property {String} BROWSER_TYPE_ANDROID
   * @readOnly
   * @default "androidbrowser"
   */

  sys.BROWSER_TYPE_ANDROID = "androidbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_IE
   * @readOnly
   * @default "ie"
   */

  sys.BROWSER_TYPE_IE = "ie";
  /**
   *
   * @property {String} BROWSER_TYPE_EDGE
   * @readOnly
   * @default "edge"
   */

  sys.BROWSER_TYPE_EDGE = "edge";
  /**
   *
   * @property {String} BROWSER_TYPE_QQ
   * @readOnly
   * @default "qqbrowser"
   */

  sys.BROWSER_TYPE_QQ = "qqbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_MOBILE_QQ
   * @readOnly
   * @default "mqqbrowser"
   */

  sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_UC
   * @readOnly
   * @default "ucbrowser"
   */

  sys.BROWSER_TYPE_UC = "ucbrowser";
  /**
   * uc third party integration.
   * @property {String} BROWSER_TYPE_UCBS
   * @readOnly
   * @default "ucbs"
   */

  sys.BROWSER_TYPE_UCBS = "ucbs";
  /**
   *
   * @property {String} BROWSER_TYPE_360
   * @readOnly
   * @default "360browser"
   */

  sys.BROWSER_TYPE_360 = "360browser";
  /**
   *
   * @property {String} BROWSER_TYPE_BAIDU_APP
   * @readOnly
   * @default "baiduboxapp"
   */

  sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
  /**
   *
   * @property {String} BROWSER_TYPE_BAIDU
   * @readOnly
   * @default "baidubrowser"
   */

  sys.BROWSER_TYPE_BAIDU = "baidubrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_MAXTHON
   * @readOnly
   * @default "maxthon"
   */

  sys.BROWSER_TYPE_MAXTHON = "maxthon";
  /**
   *
   * @property {String} BROWSER_TYPE_OPERA
   * @readOnly
   * @default "opera"
   */

  sys.BROWSER_TYPE_OPERA = "opera";
  /**
   *
   * @property {String} BROWSER_TYPE_OUPENG
   * @readOnly
   * @default "oupeng"
   */

  sys.BROWSER_TYPE_OUPENG = "oupeng";
  /**
   *
   * @property {String} BROWSER_TYPE_MIUI
   * @readOnly
   * @default "miuibrowser"
   */

  sys.BROWSER_TYPE_MIUI = "miuibrowser";
  /**
   *
   * @property {String} BROWSER_TYPE_FIREFOX
   * @readOnly
   * @default "firefox"
   */

  sys.BROWSER_TYPE_FIREFOX = "firefox";
  /**
   *
   * @property {String} BROWSER_TYPE_SAFARI
   * @readOnly
   * @default "safari"
   */

  sys.BROWSER_TYPE_SAFARI = "safari";
  /**
   *
   * @property {String} BROWSER_TYPE_CHROME
   * @readOnly
   * @default "chrome"
   */

  sys.BROWSER_TYPE_CHROME = "chrome";
  /**
   *
   * @property {String} BROWSER_TYPE_LIEBAO
   * @readOnly
   * @default "liebao"
   */

  sys.BROWSER_TYPE_LIEBAO = "liebao";
  /**
   *
   * @property {String} BROWSER_TYPE_QZONE
   * @readOnly
   * @default "qzone"
   */

  sys.BROWSER_TYPE_QZONE = "qzone";
  /**
   *
   * @property {String} BROWSER_TYPE_SOUGOU
   * @readOnly
   * @default "sogou"
   */

  sys.BROWSER_TYPE_SOUGOU = "sogou";
  /**
   *
   * @property {String} BROWSER_TYPE_HUAWEI
   * @readOnly
   * @default "huawei"
   */

  sys.BROWSER_TYPE_HUAWEI = "huawei";
  /**
   *
   * @property {String} BROWSER_TYPE_UNKNOWN
   * @readOnly
   * @default "unknown"
   */

  sys.BROWSER_TYPE_UNKNOWN = "unknown";
  /**
   * Is native ? This is set to be true in jsb auto.
   * @property {Boolean} isNative
   */

  sys.isNative = CC_JSB || CC_RUNTIME;
  /**
   * Is web browser ?
   * @property {Boolean} isBrowser
   */

  sys.isBrowser = typeof window === 'object' && typeof document === 'object' && !CC_JSB && !CC_RUNTIME;
  /**
   * Is webgl extension support?
   * @method glExtension
   * @param name
   * @return {Boolean}
   */

  sys.glExtension = function (name) {
    return !!cc.renderer.device.ext(name);
  };
  /**
   * Get max joint matrix size for skinned mesh renderer.
   * @method getMaxJointMatrixSize
   */


  sys.getMaxJointMatrixSize = function () {
    if (!sys._maxJointMatrixSize) {
      var JOINT_MATRICES_SIZE = 50;
      var LEFT_UNIFORM_SIZE = 10;
      var gl = cc.game._renderContext;
      var maxUniforms = Math.floor(gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) / 4) - LEFT_UNIFORM_SIZE;

      if (maxUniforms < JOINT_MATRICES_SIZE) {
        sys._maxJointMatrixSize = 0;
      } else {
        sys._maxJointMatrixSize = JOINT_MATRICES_SIZE;
      }
    }

    return sys._maxJointMatrixSize;
  };
  /**
   * !#en
   * Returns the safe area of the screen (in design resolution). If the screen is not notched, the visibleRect will be returned by default.
   * Currently supports Android, iOS and WeChat Mini Game platform.
   * !#zh
   * 返回手机屏幕安全区域（设计分辨率为单位），如果不是异形屏将默认返回 visibleRect。目前支持安卓、iOS 原生平台和微信小游戏平台。
   * @method getSafeAreaRect
   * @return {Rect}
  */


  sys.getSafeAreaRect = function () {
    var visibleSize = cc.view.getVisibleSize();
    return cc.rect(0, 0, visibleSize.width, visibleSize.height);
  };

  if (_global.__globalAdapter && _global.__globalAdapter.adaptSys) {
    // init sys info in adapter
    _global.__globalAdapter.adaptSys(sys);
  } else if (CC_EDITOR && Editor.isMainProcess) {
    sys.isMobile = false;
    sys.platform = sys.EDITOR_CORE;
    sys.language = sys.LANGUAGE_UNKNOWN;
    sys.languageCode = undefined;
    sys.os = {
      darwin: sys.OS_OSX,
      win32: sys.OS_WINDOWS,
      linux: sys.OS_LINUX
    }[process.platform] || sys.OS_UNKNOWN;
    sys.browserType = null;
    sys.browserVersion = null;
    sys.windowPixelResolution = {
      width: 0,
      height: 0
    };
    sys.capabilities = {
      'imageBitmap': false
    };
    sys.__audioSupport = {};
  } else if (CC_JSB || CC_RUNTIME) {
    var platform;

    if (isVivoGame) {
      platform = sys.VIVO_GAME;
    } else if (isOppoGame) {
      platform = sys.OPPO_GAME;
    } else if (isHuaweiGame) {
      platform = sys.HUAWEI_GAME;
    } else if (isJKWGame) {
      platform = sys.JKW_GAME;
    } else if (isQttGame) {
      platform = sys.QTT_GAME;
    } else if (isLinkSure) {
      platform = sys.LINKSURE;
    } else {
      platform = __getPlatform();
    }

    sys.platform = platform;
    sys.isMobile = platform === sys.ANDROID || platform === sys.IPAD || platform === sys.IPHONE || platform === sys.WP8 || platform === sys.TIZEN || platform === sys.BLACKBERRY || platform === sys.XIAOMI_GAME || isVivoGame || isOppoGame || isHuaweiGame || isJKWGame || isQttGame;
    sys.os = __getOS();
    sys.language = __getCurrentLanguage();
    var languageCode;

    if (CC_JSB) {
      languageCode = __getCurrentLanguageCode();
    }

    sys.languageCode = languageCode ? languageCode.toLowerCase() : undefined;
    sys.osVersion = __getOSVersion();
    sys.osMainVersion = parseInt(sys.osVersion);
    sys.browserType = null;
    sys.browserVersion = null;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var ratio = window.devicePixelRatio || 1;
    sys.windowPixelResolution = {
      width: ratio * w,
      height: ratio * h
    };
    sys.localStorage = window.localStorage;
    var capabilities;
    capabilities = sys.capabilities = {
      "canvas": false,
      "opengl": true,
      "webp": true
    };

    if (sys.isMobile) {
      capabilities["accelerometer"] = true;
      capabilities["touches"] = true;
    } else {
      // desktop
      capabilities["keyboard"] = true;
      capabilities["mouse"] = true;
      capabilities["touches"] = false;
    }

    capabilities['imageBitmap'] = false;
    sys.__audioSupport = {
      ONLY_ONE: false,
      WEB_AUDIO: false,
      DELAY_CREATE_CTX: false,
      format: ['.mp3']
    };
  } else {
    // browser or runtime
    var win = window,
        nav = win.navigator,
        doc = document,
        docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();

    if (CC_EDITOR) {
      sys.isMobile = false;
      sys.platform = sys.EDITOR_PAGE;
    } else {
      /**
       * Indicate whether system is mobile system
       * @property {Boolean} isMobile
       */
      sys.isMobile = /mobile|android|iphone|ipad/.test(ua);
      /**
       * Indicate the running platform
       * @property {Number} platform
       */

      if (typeof FbPlayableAd !== "undefined") {
        sys.platform = sys.FB_PLAYABLE_ADS;
      } else {
        sys.platform = sys.isMobile ? sys.MOBILE_BROWSER : sys.DESKTOP_BROWSER;
      }
    }

    var currLanguage = nav.language;
    currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
    /**
     * Get current language iso 639-1 code.
     * Examples of valid language codes include "zh-tw", "en", "en-us", "fr", "fr-fr", "es-es", etc.
     * The actual value totally depends on results provided by destination platform.
     * @property {String} languageCode
     */

    sys.languageCode = currLanguage.toLowerCase();
    currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;
    /**
     * Indicate the current language of the running system
     * @property {String} language
     */

    sys.language = currLanguage; // Get the os of system

    var isAndroid = false,
        iOS = false,
        osVersion = '',
        osMainVersion = 0;
    var uaResult = /android\s*(\d+(?:\.\d+)*)/i.exec(ua) || /android\s*(\d+(?:\.\d+)*)/i.exec(nav.platform);

    if (uaResult) {
      isAndroid = true;
      osVersion = uaResult[1] || '';
      osMainVersion = parseInt(osVersion) || 0;
    }

    uaResult = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(ua);

    if (uaResult) {
      iOS = true;
      osVersion = uaResult[2] || '';
      osMainVersion = parseInt(osVersion) || 0;
    } // refer to https://github.com/cocos-creator/engine/pull/5542 , thanks for contribition from @krapnikkk
    // ipad OS 13 safari identifies itself as "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko)" 
    // so use maxTouchPoints to check whether it's desktop safari or not. 
    // reference: https://stackoverflow.com/questions/58019463/how-to-detect-device-name-in-safari-on-ios-13-while-it-doesnt-show-the-correct
    // FIXME: should remove it when touch-enabled macs are available
    else if (/(iPhone|iPad|iPod)/.exec(nav.platform) || nav.platform === 'MacIntel' && nav.maxTouchPoints && nav.maxTouchPoints > 1) {
        iOS = true;
        osVersion = '';
        osMainVersion = 0;
      }

    var osName = sys.OS_UNKNOWN;
    if (nav.appVersion.indexOf("Win") !== -1) osName = sys.OS_WINDOWS;else if (iOS) osName = sys.OS_IOS;else if (nav.appVersion.indexOf("Mac") !== -1) osName = sys.OS_OSX;else if (nav.appVersion.indexOf("X11") !== -1 && nav.appVersion.indexOf("Linux") === -1) osName = sys.OS_UNIX;else if (isAndroid) osName = sys.OS_ANDROID;else if (nav.appVersion.indexOf("Linux") !== -1 || ua.indexOf("ubuntu") !== -1) osName = sys.OS_LINUX;
    /**
     * Indicate the running os name
     * @property {String} os
     */

    sys.os = osName;
    /**
     * Indicate the running os version
     * @property {String} osVersion
     */

    sys.osVersion = osVersion;
    /**
     * Indicate the running os main version
     * @property {Number} osMainVersion
     */

    sys.osMainVersion = osMainVersion;
    /**
     * Indicate the running browser type
     * @property {String | null} browserType
     */

    sys.browserType = sys.BROWSER_TYPE_UNKNOWN;
    /* Determine the browser type */

    (function () {
      var typeReg1 = /mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|ucbs|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i;
      var typeReg2 = /qq|ucbrowser|ubrowser|edge|HuaweiBrowser/i;
      var typeReg3 = /chrome|safari|firefox|trident|opera|opr\/|oupeng/i;
      var browserTypes = typeReg1.exec(ua) || typeReg2.exec(ua) || typeReg3.exec(ua);
      var browserType = browserTypes ? browserTypes[0].toLowerCase() : sys.BROWSER_TYPE_UNKNOWN;
      if (browserType === "safari" && isAndroid) browserType = sys.BROWSER_TYPE_ANDROID;else if (browserType === "qq" && ua.match(/android.*applewebkit/i)) browserType = sys.BROWSER_TYPE_ANDROID;
      var typeMap = {
        'micromessenger': sys.BROWSER_TYPE_WECHAT,
        'trident': sys.BROWSER_TYPE_IE,
        'edge': sys.BROWSER_TYPE_EDGE,
        '360 aphone': sys.BROWSER_TYPE_360,
        'mxbrowser': sys.BROWSER_TYPE_MAXTHON,
        'opr/': sys.BROWSER_TYPE_OPERA,
        'ubrowser': sys.BROWSER_TYPE_UC,
        'huaweibrowser': sys.BROWSER_TYPE_HUAWEI
      };

      if (browserType === "qqbrowser" || browserType === "mqqbrowser") {
        if (ua.match(/wechat|micromessenger/i)) {
          browserType = sys.BROWSER_TYPE_WECHAT;
        }
      }

      sys.browserType = typeMap[browserType] || browserType;
    })();
    /**
     * Indicate the running browser version
     * @property {String | null} browserVersion
     */


    sys.browserVersion = "";
    /* Determine the browser version number */

    (function () {
      var versionReg1 = /(mqqbrowser|micromessenger|qqbrowser|sogou|qzone|liebao|maxthon|uc|ucbs|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui(?:.hybrid)?)(mobile)?(browser)?\/?([\d.]+)/i;
      var versionReg2 = /(qq|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i;
      var tmp = ua.match(versionReg1);
      if (!tmp) tmp = ua.match(versionReg2);
      sys.browserVersion = tmp ? tmp[4] : "";
    })();

    var w = window.innerWidth || document.documentElement.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var ratio = window.devicePixelRatio || 1;
    /**
     * Indicate the real pixel resolution of the whole game window
     * @property {Size} windowPixelResolution
     */

    sys.windowPixelResolution = {
      width: ratio * w,
      height: ratio * h
    };

    sys._checkWebGLRenderMode = function () {
      if (cc.game.renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.");
    };

    var _tmpCanvas1 = document.createElement("canvas");

    var create3DContext = function create3DContext(canvas, opt_attribs, opt_contextType) {
      if (opt_contextType) {
        try {
          return canvas.getContext(opt_contextType, opt_attribs);
        } catch (e) {
          return null;
        }
      } else {
        return create3DContext(canvas, opt_attribs, "webgl") || create3DContext(canvas, opt_attribs, "experimental-webgl") || create3DContext(canvas, opt_attribs, "webkit-3d") || create3DContext(canvas, opt_attribs, "moz-webgl") || null;
      }
    };
    /**
     * cc.sys.localStorage is a local storage component.
     * @property {Object} localStorage
     */


    try {
      var localStorage = sys.localStorage = win.localStorage;
      localStorage.setItem("storage", "");
      localStorage.removeItem("storage");
      localStorage = null;
    } catch (e) {
      var warn = function warn() {
        cc.warnID(5200);
      };

      sys.localStorage = {
        getItem: warn,
        setItem: warn,
        removeItem: warn,
        clear: warn
      };
    }

    var _supportWebp = _tmpCanvas1.toDataURL('image/webp').startsWith('data:image/webp');

    var _supportCanvas = !!_tmpCanvas1.getContext("2d");

    var _supportWebGL = false;

    if (CC_TEST) {
      _supportWebGL = false;
    } else if (win.WebGLRenderingContext) {
      _supportWebGL = true;
    }
    /**
     * The capabilities of the current platform
     * @property {Object} capabilities
     */


    var capabilities = sys.capabilities = {
      "canvas": _supportCanvas,
      "opengl": _supportWebGL,
      "webp": _supportWebp,
      'imageBitmap': false
    };

    if (typeof createImageBitmap !== 'undefined' && typeof Blob !== 'undefined') {
      _tmpCanvas1.width = _tmpCanvas1.height = 2;
      createImageBitmap(_tmpCanvas1, {}).then(function (imageBitmap) {
        capabilities.imageBitmap = true;
        imageBitmap.close && imageBitmap.close();
      })["catch"](function (err) {});
    }

    if (docEle['ontouchstart'] !== undefined || doc['ontouchstart'] !== undefined || nav.msPointerEnabled) capabilities["touches"] = true;
    if (docEle['onmouseup'] !== undefined) capabilities["mouse"] = true;
    if (docEle['onkeyup'] !== undefined) capabilities["keyboard"] = true;
    if (win.DeviceMotionEvent || win.DeviceOrientationEvent) capabilities["accelerometer"] = true;

    var __audioSupport;
    /**
     * Audio support in the browser
     *
     * MULTI_CHANNEL        : Multiple audio while playing - If it doesn't, you can only play background music
     * WEB_AUDIO            : Support for WebAudio - Support W3C WebAudio standards, all of the audio can be played
     * AUTOPLAY             : Supports auto-play audio - if Don‘t support it, On a touch detecting background music canvas, and then replay
     * REPLAY_AFTER_TOUCH   : The first music will fail, must be replay after touchstart
     * USE_EMPTIED_EVENT    : Whether to use the emptied event to replace load callback
     * DELAY_CREATE_CTX     : delay created the context object - only webAudio
     * NEED_MANUAL_LOOP     : loop attribute failure, need to perform loop manually
     *
     * May be modifications for a few browser version
     */


    (function () {
      var DEBUG = false;
      var version = sys.browserVersion; // check if browser supports Web Audio
      // check Web Audio's context

      var supportWebAudio = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
      __audioSupport = {
        ONLY_ONE: false,
        WEB_AUDIO: supportWebAudio,
        DELAY_CREATE_CTX: false
      };

      if (sys.os === sys.OS_IOS) {
        // IOS no event that used to parse completed callback
        // this time is not complete, can not play
        //
        __audioSupport.USE_LOADER_EVENT = 'loadedmetadata';
      }

      if (sys.browserType === sys.BROWSER_TYPE_FIREFOX) {
        __audioSupport.DELAY_CREATE_CTX = true;
        __audioSupport.USE_LOADER_EVENT = 'canplay';
      }

      if (sys.os === sys.OS_ANDROID) {
        if (sys.browserType === sys.BROWSER_TYPE_UC) {
          __audioSupport.ONE_SOURCE = true;
        }
      }

      if (DEBUG) {
        setTimeout(function () {
          cc.log('browse type: ' + sys.browserType);
          cc.log('browse version: ' + version);
          cc.log('MULTI_CHANNEL: ' + __audioSupport.MULTI_CHANNEL);
          cc.log('WEB_AUDIO: ' + __audioSupport.WEB_AUDIO);
          cc.log('AUTOPLAY: ' + __audioSupport.AUTOPLAY);
        }, 0);
      }
    })();

    try {
      if (__audioSupport.WEB_AUDIO) {
        __audioSupport.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();

        if (__audioSupport.DELAY_CREATE_CTX) {
          setTimeout(function () {
            __audioSupport.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
          }, 0);
        }
      }
    } catch (error) {
      __audioSupport.WEB_AUDIO = false;
      cc.logID(5201);
    }

    var formatSupport = [];

    (function () {
      var audio = document.createElement('audio');

      if (audio.canPlayType) {
        var ogg = audio.canPlayType('audio/ogg; codecs="vorbis"');
        if (ogg) formatSupport.push('.ogg');
        var mp3 = audio.canPlayType('audio/mpeg');
        if (mp3) formatSupport.push('.mp3');
        var wav = audio.canPlayType('audio/wav; codecs="1"');
        if (wav) formatSupport.push('.wav');
        var mp4 = audio.canPlayType('audio/mp4');
        if (mp4) formatSupport.push('.mp4');
        var m4a = audio.canPlayType('audio/x-m4a');
        if (m4a) formatSupport.push('.m4a');
      }
    })();

    __audioSupport.format = formatSupport;
    sys.__audioSupport = __audioSupport;
  }
  /**
   * !#en
   * Network type enumeration
   * !#zh
   * 网络类型枚举
   *
   * @enum sys.NetworkType
   */


  sys.NetworkType = {
    /**
     * !#en
     * Network is unreachable.
     * !#zh
     * 网络不通
     *
     * @property {Number} NONE
     */
    NONE: 0,

    /**
     * !#en
     * Network is reachable via WiFi or cable.
     * !#zh
     * 通过无线或者有线本地网络连接因特网
     *
     * @property {Number} LAN
     */
    LAN: 1,

    /**
     * !#en
     * Network is reachable via Wireless Wide Area Network
     * !#zh
     * 通过蜂窝移动网络连接因特网
     *
     * @property {Number} WWAN
     */
    WWAN: 2
  };
  /**
   * @class sys
   */

  /**
   * !#en
   * Get the network type of current device, return cc.sys.NetworkType.LAN if failure.
   * !#zh
   * 获取当前设备的网络类型, 如果网络类型无法获取，默认将返回 cc.sys.NetworkType.LAN
   *
   * @method getNetworkType
   * @return {sys.NetworkType}
   */

  sys.getNetworkType = function () {
    // TODO: need to implement this for mobile phones.
    return sys.NetworkType.LAN;
  };
  /**
   * !#en
   * Get the battery level of current device, return 1.0 if failure.
   * !#zh
   * 获取当前设备的电池电量，如果电量无法获取，默认将返回 1
   *
   * @method getBatteryLevel
   * @return {Number} - 0.0 ~ 1.0
   */


  sys.getBatteryLevel = function () {
    // TODO: need to implement this for mobile phones.
    return 1.0;
  };
  /**
   * Forces the garbage collection, only available in JSB
   * @method garbageCollect
   */


  sys.garbageCollect = function () {// N/A in web
  };
  /**
   * Restart the JS VM, only available in JSB
   * @method restartVM
   */


  sys.restartVM = function () {// N/A in web
  };
  /**
   * Check whether an object is valid,
   * In web engine, it will return true if the object exist
   * In native engine, it will return true if the JS object and the correspond native object are both valid
   * @method isObjectValid
   * @param {Object} obj
   * @return {Boolean} Validity of the object
   */


  sys.isObjectValid = function (obj) {
    if (obj) {
      return true;
    }

    return false;
  };
  /**
   * Dump system informations
   * @method dump
   */


  sys.dump = function () {
    var self = this;
    var str = "";
    str += "isMobile : " + self.isMobile + "\r\n";
    str += "language : " + self.language + "\r\n";
    str += "browserType : " + self.browserType + "\r\n";
    str += "browserVersion : " + self.browserVersion + "\r\n";
    str += "capabilities : " + JSON.stringify(self.capabilities) + "\r\n";
    str += "os : " + self.os + "\r\n";
    str += "osVersion : " + self.osVersion + "\r\n";
    str += "platform : " + self.platform + "\r\n";
    str += "Using " + (cc.game.renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer." + "\r\n";
    cc.log(str);
  };
  /**
   * Open a url in browser
   * @method openURL
   * @param {String} url
   */


  sys.openURL = function (url) {
    if (CC_JSB || CC_RUNTIME) {
      jsb.openURL(url);
    } else {
      window.open(url);
    }
  };
  /**
   * Get the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
   * @method now
   * @return {Number}
   */


  sys.now = function () {
    if (Date.now) {
      return Date.now();
    } else {
      return +new Date();
    }
  };

  return sys;
}

var sys = cc && cc.sys ? cc.sys : initSys();
module.exports = sys;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ1N5cy5qcyJdLCJuYW1lcyI6WyJzZXR0aW5nUGxhdGZvcm0iLCJDQ19FRElUT1IiLCJ3aW5kb3ciLCJfQ0NTZXR0aW5ncyIsInBsYXRmb3JtIiwidW5kZWZpbmVkIiwiaXNWaXZvR2FtZSIsImlzT3Bwb0dhbWUiLCJpc0h1YXdlaUdhbWUiLCJpc0pLV0dhbWUiLCJpc1F0dEdhbWUiLCJpc0xpbmtTdXJlIiwiX2dsb2JhbCIsImdsb2JhbCIsImluaXRTeXMiLCJjYyIsInN5cyIsIkxBTkdVQUdFX0VOR0xJU0giLCJMQU5HVUFHRV9DSElORVNFIiwiTEFOR1VBR0VfRlJFTkNIIiwiTEFOR1VBR0VfSVRBTElBTiIsIkxBTkdVQUdFX0dFUk1BTiIsIkxBTkdVQUdFX1NQQU5JU0giLCJMQU5HVUFHRV9EVVRDSCIsIkxBTkdVQUdFX1JVU1NJQU4iLCJMQU5HVUFHRV9LT1JFQU4iLCJMQU5HVUFHRV9KQVBBTkVTRSIsIkxBTkdVQUdFX0hVTkdBUklBTiIsIkxBTkdVQUdFX1BPUlRVR1VFU0UiLCJMQU5HVUFHRV9BUkFCSUMiLCJMQU5HVUFHRV9OT1JXRUdJQU4iLCJMQU5HVUFHRV9QT0xJU0giLCJMQU5HVUFHRV9UVVJLSVNIIiwiTEFOR1VBR0VfVUtSQUlOSUFOIiwiTEFOR1VBR0VfUk9NQU5JQU4iLCJMQU5HVUFHRV9CVUxHQVJJQU4iLCJMQU5HVUFHRV9VTktOT1dOIiwiT1NfSU9TIiwiT1NfQU5EUk9JRCIsIk9TX1dJTkRPV1MiLCJPU19NQVJNQUxBREUiLCJPU19MSU5VWCIsIk9TX0JBREEiLCJPU19CTEFDS0JFUlJZIiwiT1NfT1NYIiwiT1NfV1A4IiwiT1NfV0lOUlQiLCJPU19VTktOT1dOIiwiVU5LTk9XTiIsIldJTjMyIiwiTElOVVgiLCJNQUNPUyIsIkFORFJPSUQiLCJJUEhPTkUiLCJJUEFEIiwiQkxBQ0tCRVJSWSIsIk5BQ0wiLCJFTVNDUklQVEVOIiwiVElaRU4iLCJXSU5SVCIsIldQOCIsIk1PQklMRV9CUk9XU0VSIiwiREVTS1RPUF9CUk9XU0VSIiwiRURJVE9SX1BBR0UiLCJFRElUT1JfQ09SRSIsIldFQ0hBVF9HQU1FIiwiUVFfUExBWSIsIkZCX1BMQVlBQkxFX0FEUyIsIkJBSURVX0dBTUUiLCJWSVZPX0dBTUUiLCJPUFBPX0dBTUUiLCJIVUFXRUlfR0FNRSIsIlhJQU9NSV9HQU1FIiwiSktXX0dBTUUiLCJBTElQQVlfR0FNRSIsIldFQ0hBVF9HQU1FX1NVQiIsIkJBSURVX0dBTUVfU1VCIiwiUVRUX0dBTUUiLCJCWVRFREFOQ0VfR0FNRSIsIkJZVEVEQU5DRV9HQU1FX1NVQiIsIkxJTktTVVJFIiwiQlJPV1NFUl9UWVBFX1dFQ0hBVCIsIkJST1dTRVJfVFlQRV9BTkRST0lEIiwiQlJPV1NFUl9UWVBFX0lFIiwiQlJPV1NFUl9UWVBFX0VER0UiLCJCUk9XU0VSX1RZUEVfUVEiLCJCUk9XU0VSX1RZUEVfTU9CSUxFX1FRIiwiQlJPV1NFUl9UWVBFX1VDIiwiQlJPV1NFUl9UWVBFX1VDQlMiLCJCUk9XU0VSX1RZUEVfMzYwIiwiQlJPV1NFUl9UWVBFX0JBSURVX0FQUCIsIkJST1dTRVJfVFlQRV9CQUlEVSIsIkJST1dTRVJfVFlQRV9NQVhUSE9OIiwiQlJPV1NFUl9UWVBFX09QRVJBIiwiQlJPV1NFUl9UWVBFX09VUEVORyIsIkJST1dTRVJfVFlQRV9NSVVJIiwiQlJPV1NFUl9UWVBFX0ZJUkVGT1giLCJCUk9XU0VSX1RZUEVfU0FGQVJJIiwiQlJPV1NFUl9UWVBFX0NIUk9NRSIsIkJST1dTRVJfVFlQRV9MSUVCQU8iLCJCUk9XU0VSX1RZUEVfUVpPTkUiLCJCUk9XU0VSX1RZUEVfU09VR09VIiwiQlJPV1NFUl9UWVBFX0hVQVdFSSIsIkJST1dTRVJfVFlQRV9VTktOT1dOIiwiaXNOYXRpdmUiLCJDQ19KU0IiLCJDQ19SVU5USU1FIiwiaXNCcm93c2VyIiwiZG9jdW1lbnQiLCJnbEV4dGVuc2lvbiIsIm5hbWUiLCJyZW5kZXJlciIsImRldmljZSIsImV4dCIsImdldE1heEpvaW50TWF0cml4U2l6ZSIsIl9tYXhKb2ludE1hdHJpeFNpemUiLCJKT0lOVF9NQVRSSUNFU19TSVpFIiwiTEVGVF9VTklGT1JNX1NJWkUiLCJnbCIsImdhbWUiLCJfcmVuZGVyQ29udGV4dCIsIm1heFVuaWZvcm1zIiwiTWF0aCIsImZsb29yIiwiZ2V0UGFyYW1ldGVyIiwiTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMiLCJnZXRTYWZlQXJlYVJlY3QiLCJ2aXNpYmxlU2l6ZSIsInZpZXciLCJnZXRWaXNpYmxlU2l6ZSIsInJlY3QiLCJ3aWR0aCIsImhlaWdodCIsIl9fZ2xvYmFsQWRhcHRlciIsImFkYXB0U3lzIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsImlzTW9iaWxlIiwibGFuZ3VhZ2UiLCJsYW5ndWFnZUNvZGUiLCJvcyIsImRhcndpbiIsIndpbjMyIiwibGludXgiLCJwcm9jZXNzIiwiYnJvd3NlclR5cGUiLCJicm93c2VyVmVyc2lvbiIsIndpbmRvd1BpeGVsUmVzb2x1dGlvbiIsImNhcGFiaWxpdGllcyIsIl9fYXVkaW9TdXBwb3J0IiwiX19nZXRQbGF0Zm9ybSIsIl9fZ2V0T1MiLCJfX2dldEN1cnJlbnRMYW5ndWFnZSIsIl9fZ2V0Q3VycmVudExhbmd1YWdlQ29kZSIsInRvTG93ZXJDYXNlIiwib3NWZXJzaW9uIiwiX19nZXRPU1ZlcnNpb24iLCJvc01haW5WZXJzaW9uIiwicGFyc2VJbnQiLCJ3IiwiaW5uZXJXaWR0aCIsImgiLCJpbm5lckhlaWdodCIsInJhdGlvIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImxvY2FsU3RvcmFnZSIsIk9OTFlfT05FIiwiV0VCX0FVRElPIiwiREVMQVlfQ1JFQVRFX0NUWCIsImZvcm1hdCIsIndpbiIsIm5hdiIsIm5hdmlnYXRvciIsImRvYyIsImRvY0VsZSIsImRvY3VtZW50RWxlbWVudCIsInVhIiwidXNlckFnZW50IiwidGVzdCIsIkZiUGxheWFibGVBZCIsImN1cnJMYW5ndWFnZSIsImJyb3dzZXJMYW5ndWFnZSIsInNwbGl0IiwiaXNBbmRyb2lkIiwiaU9TIiwidWFSZXN1bHQiLCJleGVjIiwibWF4VG91Y2hQb2ludHMiLCJvc05hbWUiLCJhcHBWZXJzaW9uIiwiaW5kZXhPZiIsIk9TX1VOSVgiLCJ0eXBlUmVnMSIsInR5cGVSZWcyIiwidHlwZVJlZzMiLCJicm93c2VyVHlwZXMiLCJtYXRjaCIsInR5cGVNYXAiLCJ2ZXJzaW9uUmVnMSIsInZlcnNpb25SZWcyIiwidG1wIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJfY2hlY2tXZWJHTFJlbmRlck1vZGUiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfV0VCR0wiLCJFcnJvciIsIl90bXBDYW52YXMxIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZTNEQ29udGV4dCIsImNhbnZhcyIsIm9wdF9hdHRyaWJzIiwib3B0X2NvbnRleHRUeXBlIiwiZ2V0Q29udGV4dCIsImUiLCJzZXRJdGVtIiwicmVtb3ZlSXRlbSIsIndhcm4iLCJ3YXJuSUQiLCJnZXRJdGVtIiwiY2xlYXIiLCJfc3VwcG9ydFdlYnAiLCJ0b0RhdGFVUkwiLCJzdGFydHNXaXRoIiwiX3N1cHBvcnRDYW52YXMiLCJfc3VwcG9ydFdlYkdMIiwiQ0NfVEVTVCIsIldlYkdMUmVuZGVyaW5nQ29udGV4dCIsImNyZWF0ZUltYWdlQml0bWFwIiwiQmxvYiIsInRoZW4iLCJpbWFnZUJpdG1hcCIsImNsb3NlIiwiZXJyIiwibXNQb2ludGVyRW5hYmxlZCIsIkRldmljZU1vdGlvbkV2ZW50IiwiRGV2aWNlT3JpZW50YXRpb25FdmVudCIsIkRFQlVHIiwidmVyc2lvbiIsInN1cHBvcnRXZWJBdWRpbyIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsIm1vekF1ZGlvQ29udGV4dCIsIlVTRV9MT0FERVJfRVZFTlQiLCJPTkVfU09VUkNFIiwic2V0VGltZW91dCIsImxvZyIsIk1VTFRJX0NIQU5ORUwiLCJBVVRPUExBWSIsImNvbnRleHQiLCJlcnJvciIsImxvZ0lEIiwiZm9ybWF0U3VwcG9ydCIsImF1ZGlvIiwiY2FuUGxheVR5cGUiLCJvZ2ciLCJwdXNoIiwibXAzIiwid2F2IiwibXA0IiwibTRhIiwiTmV0d29ya1R5cGUiLCJOT05FIiwiTEFOIiwiV1dBTiIsImdldE5ldHdvcmtUeXBlIiwiZ2V0QmF0dGVyeUxldmVsIiwiZ2FyYmFnZUNvbGxlY3QiLCJyZXN0YXJ0Vk0iLCJpc09iamVjdFZhbGlkIiwib2JqIiwiZHVtcCIsInNlbGYiLCJzdHIiLCJKU09OIiwic3RyaW5naWZ5Iiwib3BlblVSTCIsInVybCIsImpzYiIsIm9wZW4iLCJub3ciLCJEYXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsZUFBSjs7QUFDQyxJQUFJLENBQUNDLFNBQUwsRUFBZ0I7QUFDYkQsRUFBQUEsZUFBZSxHQUFHRSxNQUFNLENBQUNDLFdBQVAsR0FBcUJBLFdBQVcsQ0FBQ0MsUUFBakMsR0FBMkNDLFNBQTdEO0FBQ0Y7O0FBQ0YsSUFBTUMsVUFBVSxHQUFJTixlQUFlLEtBQUssT0FBeEM7QUFDQSxJQUFNTyxVQUFVLEdBQUlQLGVBQWUsS0FBSyxXQUF4QztBQUNBLElBQU1RLFlBQVksR0FBSVIsZUFBZSxLQUFLLFFBQTFDO0FBQ0EsSUFBTVMsU0FBUyxHQUFJVCxlQUFlLEtBQUssVUFBdkM7QUFDQSxJQUFNVSxTQUFTLEdBQUlWLGVBQWUsS0FBSyxVQUF2QztBQUNBLElBQU1XLFVBQVUsR0FBSVgsZUFBZSxLQUFLLFdBQXhDOztBQUVBLElBQU1ZLE9BQU8sR0FBRyxPQUFPVixNQUFQLEtBQWtCLFdBQWxCLEdBQWdDVyxNQUFoQyxHQUF5Q1gsTUFBekQ7O0FBRUEsU0FBU1ksT0FBVCxHQUFvQjtBQUNoQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMs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QWdDLE1BQXZDO0FBQ0E2USxJQUFBQSxHQUFHLElBQUksWUFBWWxRLEVBQUUsQ0FBQ3dHLElBQUgsQ0FBUXFGLFVBQVIsS0FBdUI3TCxFQUFFLENBQUN3RyxJQUFILENBQVFzRixpQkFBL0IsR0FBbUQsT0FBbkQsR0FBNkQsUUFBekUsSUFBcUYsWUFBckYsR0FBb0csTUFBM0c7QUFDQTlMLElBQUFBLEVBQUUsQ0FBQ3VPLEdBQUgsQ0FBTzJCLEdBQVA7QUFDSCxHQWJEO0FBZUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0lqUSxFQUFBQSxHQUFHLENBQUNvUSxPQUFKLEdBQWMsVUFBVUMsR0FBVixFQUFlO0FBQ3pCLFFBQUk1SyxNQUFNLElBQUlDLFVBQWQsRUFBMEI7QUFDdEI0SyxNQUFBQSxHQUFHLENBQUNGLE9BQUosQ0FBWUMsR0FBWjtBQUNILEtBRkQsTUFHSztBQUNEblIsTUFBQUEsTUFBTSxDQUFDcVIsSUFBUCxDQUFZRixHQUFaO0FBQ0g7QUFDSixHQVBEO0FBU0E7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0lyUSxFQUFBQSxHQUFHLENBQUN3USxHQUFKLEdBQVUsWUFBWTtBQUNsQixRQUFJQyxJQUFJLENBQUNELEdBQVQsRUFBYztBQUNWLGFBQU9DLElBQUksQ0FBQ0QsR0FBTCxFQUFQO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsYUFBTyxDQUFFLElBQUlDLElBQUosRUFBVDtBQUNIO0FBQ0osR0FQRDs7QUFTQSxTQUFPelEsR0FBUDtBQUNIOztBQUVELElBQUlBLEdBQUcsR0FBR0QsRUFBRSxJQUFJQSxFQUFFLENBQUNDLEdBQVQsR0FBZUQsRUFBRSxDQUFDQyxHQUFsQixHQUF3QkYsT0FBTyxFQUF6QztBQUVBNFEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM1EsR0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5sZXQgc2V0dGluZ1BsYXRmb3JtO1xyXG4gaWYgKCFDQ19FRElUT1IpIHtcclxuICAgIHNldHRpbmdQbGF0Zm9ybSA9IHdpbmRvdy5fQ0NTZXR0aW5ncyA/IF9DQ1NldHRpbmdzLnBsYXRmb3JtOiB1bmRlZmluZWQ7XHJcbiB9XHJcbmNvbnN0IGlzVml2b0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAncWdhbWUnKTtcclxuY29uc3QgaXNPcHBvR2FtZSA9IChzZXR0aW5nUGxhdGZvcm0gPT09ICdxdWlja2dhbWUnKTtcclxuY29uc3QgaXNIdWF3ZWlHYW1lID0gKHNldHRpbmdQbGF0Zm9ybSA9PT0gJ2h1YXdlaScpO1xyXG5jb25zdCBpc0pLV0dhbWUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnamt3LWdhbWUnKTtcclxuY29uc3QgaXNRdHRHYW1lID0gKHNldHRpbmdQbGF0Zm9ybSA9PT0gJ3F0dC1nYW1lJyk7XHJcbmNvbnN0IGlzTGlua1N1cmUgPSAoc2V0dGluZ1BsYXRmb3JtID09PSAnbGluay1zdXJlJyk7XHJcblxyXG5jb25zdCBfZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3c7XHJcbiBcclxuZnVuY3Rpb24gaW5pdFN5cyAoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFN5c3RlbSB2YXJpYWJsZXNcclxuICAgICAqIEBjbGFzcyBzeXNcclxuICAgICAqIEBtYWluXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIGNjLnN5cyA9IHt9O1xyXG4gICAgdmFyIHN5cyA9IGNjLnN5cztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuZ2xpc2ggbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0VOR0xJU0hcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfRU5HTElTSCA9IFwiZW5cIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoaW5lc2UgbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0NISU5FU0VcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfQ0hJTkVTRSA9IFwiemhcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyZW5jaCBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfRlJFTkNIXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLkxBTkdVQUdFX0ZSRU5DSCA9IFwiZnJcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEl0YWxpYW4gbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0lUQUxJQU5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfSVRBTElBTiA9IFwiaXRcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlcm1hbiBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfR0VSTUFOXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLkxBTkdVQUdFX0dFUk1BTiA9IFwiZGVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwYW5pc2ggbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1NQQU5JU0hcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfU1BBTklTSCA9IFwiZXNcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNwYW5pc2ggbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0RVVENIXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLkxBTkdVQUdFX0RVVENIID0gXCJkdVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUnVzc2lhbiBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfUlVTU0lBTlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5MQU5HVUFHRV9SVVNTSUFOID0gXCJydVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogS29yZWFuIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9LT1JFQU5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfS09SRUFOID0gXCJrb1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSmFwYW5lc2UgbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX0pBUEFORVNFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLkxBTkdVQUdFX0pBUEFORVNFID0gXCJqYVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSHVuZ2FyaWFuIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9IVU5HQVJJQU5cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfSFVOR0FSSUFOID0gXCJodVwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9ydHVndWVzZSBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfUE9SVFVHVUVTRVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5MQU5HVUFHRV9QT1JUVUdVRVNFID0gXCJwdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXJhYmljIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9BUkFCSUNcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfQVJBQklDID0gXCJhclwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTm9yd2VnaWFuIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9OT1JXRUdJQU5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfTk9SV0VHSUFOID0gXCJub1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9saXNoIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9QT0xJU0hcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfUE9MSVNIID0gXCJwbFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHVya2lzaCBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVFVSS0lTSFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5MQU5HVUFHRV9UVVJLSVNIID0gXCJ0clwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVWtyYWluaWFuIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9VS1JBSU5JQU5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfVUtSQUlOSUFOID0gXCJ1a1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm9tYW5pYW4gbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBTkdVQUdFX1JPTUFOSUFOXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLkxBTkdVQUdFX1JPTUFOSUFOID0gXCJyb1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVsZ2FyaWFuIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBMQU5HVUFHRV9CVUxHQVJJQU5cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuTEFOR1VBR0VfQlVMR0FSSUFOID0gXCJiZ1wiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVW5rbm93biBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTEFOR1VBR0VfVU5LTk9XTlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5MQU5HVUFHRV9VTktOT1dOID0gXCJ1bmtub3duXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfSU9TXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLk9TX0lPUyA9IFwiaU9TXCI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19BTkRST0lEXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLk9TX0FORFJPSUQgPSBcIkFuZHJvaWRcIjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX1dJTkRPV1NcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuT1NfV0lORE9XUyA9IFwiV2luZG93c1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfTUFSTUFMQURFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLk9TX01BUk1BTEFERSA9IFwiTWFybWFsYWRlXCI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19MSU5VWFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5PU19MSU5VWCA9IFwiTGludXhcIjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX0JBREFcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuT1NfQkFEQSA9IFwiQmFkYVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfQkxBQ0tCRVJSWVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5PU19CTEFDS0JFUlJZID0gXCJCbGFja2JlcnJ5XCI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19PU1hcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuT1NfT1NYID0gXCJPUyBYXCI7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBPU19XUDhcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICovXHJcbiAgICBzeXMuT1NfV1A4ID0gXCJXUDhcIjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE9TX1dJTlJUXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqL1xyXG4gICAgc3lzLk9TX1dJTlJUID0gXCJXSU5SVFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gT1NfVU5LTk9XTlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKi9cclxuICAgIHN5cy5PU19VTktOT1dOID0gXCJVbmtub3duXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVU5LTk9XTlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAtMVxyXG4gICAgICovXHJcbiAgICBzeXMuVU5LTk9XTiA9IC0xO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV0lOMzJcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMFxyXG4gICAgICovXHJcbiAgICBzeXMuV0lOMzIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTElOVVhcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMVxyXG4gICAgICovXHJcbiAgICBzeXMuTElOVVggPSAxO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTUFDT1NcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMlxyXG4gICAgICovXHJcbiAgICBzeXMuTUFDT1MgPSAyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQU5EUk9JRFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAzXHJcbiAgICAgKi9cclxuICAgIHN5cy5BTkRST0lEID0gMztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IElQSE9ORVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCA0XHJcbiAgICAgKi9cclxuICAgIHN5cy5JUEhPTkUgPSA0O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSVBBRFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCA1XHJcbiAgICAgKi9cclxuICAgIHN5cy5JUEFEID0gNTtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJMQUNLQkVSUllcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgNlxyXG4gICAgICovXHJcbiAgICBzeXMuQkxBQ0tCRVJSWSA9IDY7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOQUNMXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDdcclxuICAgICAqL1xyXG4gICAgc3lzLk5BQ0wgPSA3O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRU1TQ1JJUFRFTlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCA4XHJcbiAgICAgKi9cclxuICAgIHN5cy5FTVNDUklQVEVOID0gODtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRJWkVOXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDlcclxuICAgICAqL1xyXG4gICAgc3lzLlRJWkVOID0gOTtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdJTlJUXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwXHJcbiAgICAgKi9cclxuICAgIHN5cy5XSU5SVCA9IDEwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gV1A4XHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDExXHJcbiAgICAgKi9cclxuICAgIHN5cy5XUDggPSAxMTtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1PQklMRV9CUk9XU0VSXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwMFxyXG4gICAgICovXHJcbiAgICBzeXMuTU9CSUxFX0JST1dTRVIgPSAxMDA7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBERVNLVE9QX0JST1dTRVJcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTAxXHJcbiAgICAgKi9cclxuICAgIHN5cy5ERVNLVE9QX0JST1dTRVIgPSAxMDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBleGVjdXRlcyBpbiBlZGl0b3IncyB3aW5kb3cgcHJvY2VzcyAoRWxlY3Ryb24ncyByZW5kZXJlciBjb250ZXh0KVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVESVRPUl9QQUdFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwMlxyXG4gICAgICovXHJcbiAgICBzeXMuRURJVE9SX1BBR0UgPSAxMDI7XHJcbiAgICAvKipcclxuICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGV4ZWN1dGVzIGluIGVkaXRvcidzIG1haW4gcHJvY2VzcyAoRWxlY3Ryb24ncyBicm93c2VyIGNvbnRleHQpXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRURJVE9SX0NPUkVcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTAzXHJcbiAgICAgKi9cclxuICAgIHN5cy5FRElUT1JfQ09SRSA9IDEwMztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwNFxyXG4gICAgICovXHJcbiAgICBzeXMuV0VDSEFUX0dBTUUgPSAxMDQ7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRUV9QTEFZXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwNVxyXG4gICAgICovXHJcbiAgICBzeXMuUVFfUExBWSA9IDEwNTtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZCX1BMQVlBQkxFX0FEU1xyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAxMDZcclxuICAgICAqL1xyXG4gICAgc3lzLkZCX1BMQVlBQkxFX0FEUyA9IDEwNjtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTA3XHJcbiAgICAgKi9cclxuICAgIHN5cy5CQUlEVV9HQU1FID0gMTA3O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVklWT19HQU1FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwOFxyXG4gICAgICovXHJcbiAgICBzeXMuVklWT19HQU1FID0gMTA4O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gT1BQT19HQU1FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDEwOVxyXG4gICAgICovXHJcbiAgICBzeXMuT1BQT19HQU1FID0gMTA5O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSFVBV0VJX0dBTUVcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTEwXHJcbiAgICAgKi9cclxuICAgIHN5cy5IVUFXRUlfR0FNRSA9IDExMDtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFhJQU9NSV9HQU1FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDExMVxyXG4gICAgICovXHJcbiAgICBzeXMuWElBT01JX0dBTUUgPSAxMTE7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBKS1dfR0FNRVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAxMTJcclxuICAgICAqL1xyXG4gICAgc3lzLkpLV19HQU1FID0gMTEyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxJUEFZX0dBTUVcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTEzXHJcbiAgICAgKi9cclxuICAgIHN5cy5BTElQQVlfR0FNRSA9IDExMztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFdFQ0hBVF9HQU1FX1NVQlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAxMTRcclxuICAgICAqL1xyXG4gICAgc3lzLldFQ0hBVF9HQU1FX1NVQiA9IDExNDtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJBSURVX0dBTUVfU1VCXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDExNVxyXG4gICAgICovXHJcbiAgICBzeXMuQkFJRFVfR0FNRV9TVUIgPSAxMTU7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBRVFRfR0FNRVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAxMTZcclxuICAgICAqL1xyXG4gICAgc3lzLlFUVF9HQU1FID0gMTE2O1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQllURURBTkNFX0dBTUVcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgMTE3XHJcbiAgICAgKi9cclxuICAgIHN5cy5CWVRFREFOQ0VfR0FNRSA9IDExNztcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJZVEVEQU5DRV9HQU1FX1NVQlxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCAxMThcclxuICAgICAqL1xyXG4gICAgc3lzLkJZVEVEQU5DRV9HQU1FX1NVQiA9IDExODtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IExJTktTVVJFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IDExOVxyXG4gICAgICovXHJcbiAgICBzeXMuTElOS1NVUkUgPSAxMTk7XHJcbiAgICAvKipcclxuICAgICAqIEJST1dTRVJfVFlQRV9XRUNIQVRcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfV0VDSEFUXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwid2VjaGF0XCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9XRUNIQVQgPSBcIndlY2hhdFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9BTkRST0lEXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwiYW5kcm9pZGJyb3dzZXJcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX0FORFJPSUQgPSBcImFuZHJvaWRicm93c2VyXCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX0lFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwiaWVcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX0lFID0gXCJpZVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9FREdFXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwiZWRnZVwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfRURHRSA9IFwiZWRnZVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9RUVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCBcInFxYnJvd3NlclwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfUVEgPSBcInFxYnJvd3NlclwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9NT0JJTEVfUVFcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJtcXFicm93c2VyXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9NT0JJTEVfUVEgPSBcIm1xcWJyb3dzZXJcIjtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfVUNcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJ1Y2Jyb3dzZXJcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX1VDID0gXCJ1Y2Jyb3dzZXJcIjtcclxuICAgIC8qKlxyXG4gICAgICogdWMgdGhpcmQgcGFydHkgaW50ZWdyYXRpb24uXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1VDQlNcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJ1Y2JzXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9VQ0JTID0gXCJ1Y2JzXCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFXzM2MFxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCBcIjM2MGJyb3dzZXJcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFXzM2MCA9IFwiMzYwYnJvd3NlclwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9CQUlEVV9BUFBcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJiYWlkdWJveGFwcFwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfQkFJRFVfQVBQID0gXCJiYWlkdWJveGFwcFwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9CQUlEVVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCBcImJhaWR1YnJvd3NlclwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfQkFJRFUgPSBcImJhaWR1YnJvd3NlclwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9NQVhUSE9OXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwibWF4dGhvblwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfTUFYVEhPTiA9IFwibWF4dGhvblwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9PUEVSQVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCBcIm9wZXJhXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9PUEVSQSA9IFwib3BlcmFcIjtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfT1VQRU5HXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwib3VwZW5nXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9PVVBFTkcgPSBcIm91cGVuZ1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9NSVVJXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwibWl1aWJyb3dzZXJcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX01JVUkgPSBcIm1pdWlicm93c2VyXCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX0ZJUkVGT1hcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJmaXJlZm94XCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9GSVJFRk9YID0gXCJmaXJlZm94XCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1NBRkFSSVxyXG4gICAgICogQHJlYWRPbmx5XHJcbiAgICAgKiBAZGVmYXVsdCBcInNhZmFyaVwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfU0FGQVJJID0gXCJzYWZhcmlcIjtcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBCUk9XU0VSX1RZUEVfQ0hST01FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwiY2hyb21lXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9DSFJPTUUgPSBcImNocm9tZVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9MSUVCQU9cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJsaWViYW9cIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX0xJRUJBTyA9IFwibGllYmFvXCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1FaT05FXHJcbiAgICAgKiBAcmVhZE9ubHlcclxuICAgICAqIEBkZWZhdWx0IFwicXpvbmVcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX1FaT05FID0gXCJxem9uZVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9TT1VHT1VcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJzb2dvdVwiXHJcbiAgICAgKi9cclxuICAgIHN5cy5CUk9XU0VSX1RZUEVfU09VR09VID0gXCJzb2dvdVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEJST1dTRVJfVFlQRV9IVUFXRUlcclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJodWF3ZWlcIlxyXG4gICAgICovXHJcbiAgICBzeXMuQlJPV1NFUl9UWVBFX0hVQVdFSSA9IFwiaHVhd2VpXCI7XHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQlJPV1NFUl9UWVBFX1VOS05PV05cclxuICAgICAqIEByZWFkT25seVxyXG4gICAgICogQGRlZmF1bHQgXCJ1bmtub3duXCJcclxuICAgICAqL1xyXG4gICAgc3lzLkJST1dTRVJfVFlQRV9VTktOT1dOID0gXCJ1bmtub3duXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBuYXRpdmUgPyBUaGlzIGlzIHNldCB0byBiZSB0cnVlIGluIGpzYiBhdXRvLlxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc05hdGl2ZVxyXG4gICAgICovXHJcbiAgICBzeXMuaXNOYXRpdmUgPSBDQ19KU0IgfHwgQ0NfUlVOVElNRTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIHdlYiBicm93c2VyID9cclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNCcm93c2VyXHJcbiAgICAgKi9cclxuICAgIHN5cy5pc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZG9jdW1lbnQgPT09ICdvYmplY3QnICYmICFDQ19KU0IgJiYgIUNDX1JVTlRJTUU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyB3ZWJnbCBleHRlbnNpb24gc3VwcG9ydD9cclxuICAgICAqIEBtZXRob2QgZ2xFeHRlbnNpb25cclxuICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBzeXMuZ2xFeHRlbnNpb24gPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHJldHVybiAhIWNjLnJlbmRlcmVyLmRldmljZS5leHQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbWF4IGpvaW50IG1hdHJpeCBzaXplIGZvciBza2lubmVkIG1lc2ggcmVuZGVyZXIuXHJcbiAgICAgKiBAbWV0aG9kIGdldE1heEpvaW50TWF0cml4U2l6ZVxyXG4gICAgICovXHJcbiAgICBzeXMuZ2V0TWF4Sm9pbnRNYXRyaXhTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghc3lzLl9tYXhKb2ludE1hdHJpeFNpemUpIHtcclxuICAgICAgICAgICAgY29uc3QgSk9JTlRfTUFUUklDRVNfU0laRSA9IDUwO1xyXG4gICAgICAgICAgICBjb25zdCBMRUZUX1VOSUZPUk1fU0laRSA9IDEwO1xyXG5cclxuICAgICAgICAgICAgbGV0IGdsID0gY2MuZ2FtZS5fcmVuZGVyQ29udGV4dDtcclxuICAgICAgICAgICAgbGV0IG1heFVuaWZvcm1zID0gTWF0aC5mbG9vcihnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMpIC8gNCkgLSBMRUZUX1VOSUZPUk1fU0laRTtcclxuICAgICAgICAgICAgaWYgKG1heFVuaWZvcm1zIDwgSk9JTlRfTUFUUklDRVNfU0laRSkge1xyXG4gICAgICAgICAgICAgICAgc3lzLl9tYXhKb2ludE1hdHJpeFNpemUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3lzLl9tYXhKb2ludE1hdHJpeFNpemUgPSBKT0lOVF9NQVRSSUNFU19TSVpFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzeXMuX21heEpvaW50TWF0cml4U2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzYWZlIGFyZWEgb2YgdGhlIHNjcmVlbiAoaW4gZGVzaWduIHJlc29sdXRpb24pLiBJZiB0aGUgc2NyZWVuIGlzIG5vdCBub3RjaGVkLCB0aGUgdmlzaWJsZVJlY3Qgd2lsbCBiZSByZXR1cm5lZCBieSBkZWZhdWx0LlxyXG4gICAgICogQ3VycmVudGx5IHN1cHBvcnRzIEFuZHJvaWQsIGlPUyBhbmQgV2VDaGF0IE1pbmkgR2FtZSBwbGF0Zm9ybS5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/lOWbnuaJi+acuuWxj+W5leWuieWFqOWMuuWfn++8iOiuvuiuoeWIhui+qOeOh+S4uuWNleS9je+8ie+8jOWmguaenOS4jeaYr+W8guW9ouWxj+Wwhum7mOiupOi/lOWbniB2aXNpYmxlUmVjdOOAguebruWJjeaUr+aMgeWuieWNk+OAgWlPUyDljp/nlJ/lubPlj7Dlkozlvq7kv6HlsI/muLjmiI/lubPlj7DjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0U2FmZUFyZWFSZWN0XHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxyXG4gICAgKi9cclxuICAgc3lzLmdldFNhZmVBcmVhUmVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgdmlzaWJsZVNpemUgPSBjYy52aWV3LmdldFZpc2libGVTaXplKCk7XHJcbiAgICAgICAgcmV0dXJuIGNjLnJlY3QoMCwgMCwgdmlzaWJsZVNpemUud2lkdGgsIHZpc2libGVTaXplLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChfZ2xvYmFsLl9fZ2xvYmFsQWRhcHRlciAmJiBfZ2xvYmFsLl9fZ2xvYmFsQWRhcHRlci5hZGFwdFN5cykge1xyXG4gICAgICAgIC8vIGluaXQgc3lzIGluZm8gaW4gYWRhcHRlclxyXG4gICAgICAgIF9nbG9iYWwuX19nbG9iYWxBZGFwdGVyLmFkYXB0U3lzKHN5cyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChDQ19FRElUT1IgJiYgRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcclxuICAgICAgICBzeXMuaXNNb2JpbGUgPSBmYWxzZTtcclxuICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuRURJVE9SX0NPUkU7XHJcbiAgICAgICAgc3lzLmxhbmd1YWdlID0gc3lzLkxBTkdVQUdFX1VOS05PV047XHJcbiAgICAgICAgc3lzLmxhbmd1YWdlQ29kZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICBzeXMub3MgPSAoe1xyXG4gICAgICAgICAgICBkYXJ3aW46IHN5cy5PU19PU1gsXHJcbiAgICAgICAgICAgIHdpbjMyOiBzeXMuT1NfV0lORE9XUyxcclxuICAgICAgICAgICAgbGludXg6IHN5cy5PU19MSU5VWFxyXG4gICAgICAgIH0pW3Byb2Nlc3MucGxhdGZvcm1dIHx8IHN5cy5PU19VTktOT1dOO1xyXG4gICAgICAgIHN5cy5icm93c2VyVHlwZSA9IG51bGw7XHJcbiAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gbnVsbDtcclxuICAgICAgICBzeXMud2luZG93UGl4ZWxSZXNvbHV0aW9uID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzeXMuY2FwYWJpbGl0aWVzID0ge1xyXG4gICAgICAgICAgICAnaW1hZ2VCaXRtYXAnOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3lzLl9fYXVkaW9TdXBwb3J0ID0ge307XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xyXG4gICAgICAgIGxldCBwbGF0Zm9ybTtcclxuICAgICAgICBpZiAoaXNWaXZvR2FtZSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5WSVZPX0dBTUU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc09wcG9HYW1lKSB7XHJcbiAgICAgICAgICAgIHBsYXRmb3JtID0gc3lzLk9QUE9fR0FNRTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzSHVhd2VpR2FtZSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5IVUFXRUlfR0FNRTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzSktXR2FtZSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5KS1dfR0FNRTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzUXR0R2FtZSkge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IHN5cy5RVFRfR0FNRTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTGlua1N1cmUpIHtcclxuICAgICAgICAgICAgcGxhdGZvcm0gPSBzeXMuTElOS1NVUkU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybSA9IF9fZ2V0UGxhdGZvcm0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3lzLnBsYXRmb3JtID0gcGxhdGZvcm07XHJcbiAgICAgICAgc3lzLmlzTW9iaWxlID0gKHBsYXRmb3JtID09PSBzeXMuQU5EUk9JRCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLklQQUQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5JUEhPTkUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5XUDggfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5USVpFTiB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9PT0gc3lzLkJMQUNLQkVSUlkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0gPT09IHN5cy5YSUFPTUlfR0FNRSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Zpdm9HYW1lIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3Bwb0dhbWUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNIdWF3ZWlHYW1lIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSktXR2FtZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1F0dEdhbWUpO1xyXG5cclxuICAgICAgICBzeXMub3MgPSBfX2dldE9TKCk7XHJcbiAgICAgICAgc3lzLmxhbmd1YWdlID0gX19nZXRDdXJyZW50TGFuZ3VhZ2UoKTtcclxuICAgICAgICB2YXIgbGFuZ3VhZ2VDb2RlOyBcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlQ29kZSA9IF9fZ2V0Q3VycmVudExhbmd1YWdlQ29kZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzeXMubGFuZ3VhZ2VDb2RlID0gbGFuZ3VhZ2VDb2RlID8gbGFuZ3VhZ2VDb2RlLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgc3lzLm9zVmVyc2lvbiA9IF9fZ2V0T1NWZXJzaW9uKCk7XHJcbiAgICAgICAgc3lzLm9zTWFpblZlcnNpb24gPSBwYXJzZUludChzeXMub3NWZXJzaW9uKTtcclxuICAgICAgICBzeXMuYnJvd3NlclR5cGUgPSBudWxsO1xyXG4gICAgICAgIHN5cy5icm93c2VyVmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHZhciB3ID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgdmFyIGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHJhdGlvID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuICAgICAgICBzeXMud2luZG93UGl4ZWxSZXNvbHV0aW9uID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogcmF0aW8gKiB3LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJhdGlvICogaFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN5cy5sb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAgICAgICB2YXIgY2FwYWJpbGl0aWVzO1xyXG4gICAgICAgIGNhcGFiaWxpdGllcyA9IHN5cy5jYXBhYmlsaXRpZXMgPSB7XHJcbiAgICAgICAgICAgIFwiY2FudmFzXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcIm9wZW5nbFwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcIndlYnBcIjogdHJ1ZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgIGlmIChzeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wiYWNjZWxlcm9tZXRlclwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcInRvdWNoZXNcIl0gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRlc2t0b3BcclxuICAgICAgICAgICAgY2FwYWJpbGl0aWVzW1wia2V5Ym9hcmRcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJtb3VzZVwiXSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcInRvdWNoZXNcIl0gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhcGFiaWxpdGllc1snaW1hZ2VCaXRtYXAnXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzeXMuX19hdWRpb1N1cHBvcnQgPSB7XHJcbiAgICAgICAgICAgIE9OTFlfT05FOiBmYWxzZSxcclxuICAgICAgICAgICAgV0VCX0FVRElPOiBmYWxzZSxcclxuICAgICAgICAgICAgREVMQVlfQ1JFQVRFX0NUWDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZvcm1hdDogWycubXAzJ11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gYnJvd3NlciBvciBydW50aW1lXHJcbiAgICAgICAgdmFyIHdpbiA9IHdpbmRvdywgbmF2ID0gd2luLm5hdmlnYXRvciwgZG9jID0gZG9jdW1lbnQsIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIHVhID0gbmF2LnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHN5cy5pc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuRURJVE9SX1BBR0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSW5kaWNhdGUgd2hldGhlciBzeXN0ZW0gaXMgbW9iaWxlIHN5c3RlbVxyXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzTW9iaWxlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzeXMuaXNNb2JpbGUgPSAvbW9iaWxlfGFuZHJvaWR8aXBob25lfGlwYWQvLnRlc3QodWEpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIHBsYXRmb3JtXHJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwbGF0Zm9ybVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBGYlBsYXlhYmxlQWQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHN5cy5wbGF0Zm9ybSA9IHN5cy5GQl9QTEFZQUJMRV9BRFM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzeXMucGxhdGZvcm0gPSBzeXMuaXNNb2JpbGUgPyBzeXMuTU9CSUxFX0JST1dTRVIgOiBzeXMuREVTS1RPUF9CUk9XU0VSO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY3Vyckxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlO1xyXG4gICAgICAgIGN1cnJMYW5ndWFnZSA9IGN1cnJMYW5ndWFnZSA/IGN1cnJMYW5ndWFnZSA6IG5hdi5icm93c2VyTGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCBjdXJyZW50IGxhbmd1YWdlIGlzbyA2MzktMSBjb2RlLlxyXG4gICAgICAgICAqIEV4YW1wbGVzIG9mIHZhbGlkIGxhbmd1YWdlIGNvZGVzIGluY2x1ZGUgXCJ6aC10d1wiLCBcImVuXCIsIFwiZW4tdXNcIiwgXCJmclwiLCBcImZyLWZyXCIsIFwiZXMtZXNcIiwgZXRjLlxyXG4gICAgICAgICAqIFRoZSBhY3R1YWwgdmFsdWUgdG90YWxseSBkZXBlbmRzIG9uIHJlc3VsdHMgcHJvdmlkZWQgYnkgZGVzdGluYXRpb24gcGxhdGZvcm0uXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGxhbmd1YWdlQ29kZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN5cy5sYW5ndWFnZUNvZGUgPSBjdXJyTGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgY3Vyckxhbmd1YWdlID0gY3Vyckxhbmd1YWdlID8gY3Vyckxhbmd1YWdlLnNwbGl0KFwiLVwiKVswXSA6IHN5cy5MQU5HVUFHRV9FTkdMSVNIO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBvZiB0aGUgcnVubmluZyBzeXN0ZW1cclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gbGFuZ3VhZ2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBzeXMubGFuZ3VhZ2UgPSBjdXJyTGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgb3Mgb2Ygc3lzdGVtXHJcbiAgICAgICAgdmFyIGlzQW5kcm9pZCA9IGZhbHNlLCBpT1MgPSBmYWxzZSwgb3NWZXJzaW9uID0gJycsIG9zTWFpblZlcnNpb24gPSAwO1xyXG4gICAgICAgIHZhciB1YVJlc3VsdCA9IC9hbmRyb2lkXFxzKihcXGQrKD86XFwuXFxkKykqKS9pLmV4ZWModWEpIHx8IC9hbmRyb2lkXFxzKihcXGQrKD86XFwuXFxkKykqKS9pLmV4ZWMobmF2LnBsYXRmb3JtKTtcclxuICAgICAgICBpZiAodWFSZXN1bHQpIHtcclxuICAgICAgICAgICAgaXNBbmRyb2lkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gdWFSZXN1bHRbMV0gfHwgJyc7XHJcbiAgICAgICAgICAgIG9zTWFpblZlcnNpb24gPSBwYXJzZUludChvc1ZlcnNpb24pIHx8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVhUmVzdWx0ID0gLyhpUGFkfGlQaG9uZXxpUG9kKS4qT1MgKChcXGQrXz8pezIsM30pL2kuZXhlYyh1YSk7XHJcbiAgICAgICAgaWYgKHVhUmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGlPUyA9IHRydWU7XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IHVhUmVzdWx0WzJdIHx8ICcnO1xyXG4gICAgICAgICAgICBvc01haW5WZXJzaW9uID0gcGFyc2VJbnQob3NWZXJzaW9uKSB8fCAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZWZlciB0byBodHRwczovL2dpdGh1Yi5jb20vY29jb3MtY3JlYXRvci9lbmdpbmUvcHVsbC81NTQyICwgdGhhbmtzIGZvciBjb250cmliaXRpb24gZnJvbSBAa3JhcG5pa2trXHJcbiAgICAgICAgLy8gaXBhZCBPUyAxMyBzYWZhcmkgaWRlbnRpZmllcyBpdHNlbGYgYXMgXCJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNSkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKVwiIFxyXG4gICAgICAgIC8vIHNvIHVzZSBtYXhUb3VjaFBvaW50cyB0byBjaGVjayB3aGV0aGVyIGl0J3MgZGVza3RvcCBzYWZhcmkgb3Igbm90LiBcclxuICAgICAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU4MDE5NDYzL2hvdy10by1kZXRlY3QtZGV2aWNlLW5hbWUtaW4tc2FmYXJpLW9uLWlvcy0xMy13aGlsZS1pdC1kb2VzbnQtc2hvdy10aGUtY29ycmVjdFxyXG4gICAgICAgIC8vIEZJWE1FOiBzaG91bGQgcmVtb3ZlIGl0IHdoZW4gdG91Y2gtZW5hYmxlZCBtYWNzIGFyZSBhdmFpbGFibGVcclxuICAgICAgICBlbHNlIGlmICgvKGlQaG9uZXxpUGFkfGlQb2QpLy5leGVjKG5hdi5wbGF0Zm9ybSkgfHwgKG5hdi5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXYubWF4VG91Y2hQb2ludHMgJiYgbmF2Lm1heFRvdWNoUG9pbnRzID4gMSkpIHsgXHJcbiAgICAgICAgICAgIGlPUyA9IHRydWU7XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9ICcnO1xyXG4gICAgICAgICAgICBvc01haW5WZXJzaW9uID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBvc05hbWUgPSBzeXMuT1NfVU5LTk9XTjtcclxuICAgICAgICBpZiAobmF2LmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPT0gLTEpIG9zTmFtZSA9IHN5cy5PU19XSU5ET1dTO1xyXG4gICAgICAgIGVsc2UgaWYgKGlPUykgb3NOYW1lID0gc3lzLk9TX0lPUztcclxuICAgICAgICBlbHNlIGlmIChuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9PSAtMSkgb3NOYW1lID0gc3lzLk9TX09TWDtcclxuICAgICAgICBlbHNlIGlmIChuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiWDExXCIpICE9PSAtMSAmJiBuYXYuYXBwVmVyc2lvbi5pbmRleE9mKFwiTGludXhcIikgPT09IC0xKSBvc05hbWUgPSBzeXMuT1NfVU5JWDtcclxuICAgICAgICBlbHNlIGlmIChpc0FuZHJvaWQpIG9zTmFtZSA9IHN5cy5PU19BTkRST0lEO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdi5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSAhPT0gLTEgfHwgdWEuaW5kZXhPZihcInVidW50dVwiKSAhPT0gLTEpIG9zTmFtZSA9IHN5cy5PU19MSU5VWDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgb3MgbmFtZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBvc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN5cy5vcyA9IG9zTmFtZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBvcyB2ZXJzaW9uXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IG9zVmVyc2lvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN5cy5vc1ZlcnNpb24gPSBvc1ZlcnNpb247XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5kaWNhdGUgdGhlIHJ1bm5pbmcgb3MgbWFpbiB2ZXJzaW9uXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG9zTWFpblZlcnNpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBzeXMub3NNYWluVmVyc2lvbiA9IG9zTWFpblZlcnNpb247XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlIHRoZSBydW5uaW5nIGJyb3dzZXIgdHlwZVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nIHwgbnVsbH0gYnJvd3NlclR5cGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBzeXMuYnJvd3NlclR5cGUgPSBzeXMuQlJPV1NFUl9UWVBFX1VOS05PV047XHJcbiAgICAgICAgLyogRGV0ZXJtaW5lIHRoZSBicm93c2VyIHR5cGUgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHR5cGVSZWcxID0gL21xcWJyb3dzZXJ8bWljcm9tZXNzZW5nZXJ8cXFicm93c2VyfHNvZ291fHF6b25lfGxpZWJhb3xtYXh0aG9ufHVjYnN8MzYwIGFwaG9uZXwzNjBicm93c2VyfGJhaWR1Ym94YXBwfGJhaWR1YnJvd3NlcnxtYXh0aG9ufG14YnJvd3NlcnxtaXVpYnJvd3Nlci9pO1xyXG4gICAgICAgICAgICB2YXIgdHlwZVJlZzIgPSAvcXF8dWNicm93c2VyfHVicm93c2VyfGVkZ2V8SHVhd2VpQnJvd3Nlci9pO1xyXG4gICAgICAgICAgICB2YXIgdHlwZVJlZzMgPSAvY2hyb21lfHNhZmFyaXxmaXJlZm94fHRyaWRlbnR8b3BlcmF8b3ByXFwvfG91cGVuZy9pO1xyXG4gICAgICAgICAgICB2YXIgYnJvd3NlclR5cGVzID0gdHlwZVJlZzEuZXhlYyh1YSkgfHwgdHlwZVJlZzIuZXhlYyh1YSkgfHwgdHlwZVJlZzMuZXhlYyh1YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnJvd3NlclR5cGUgPSBicm93c2VyVHlwZXMgPyBicm93c2VyVHlwZXNbMF0udG9Mb3dlckNhc2UoKSA6IHN5cy5CUk9XU0VSX1RZUEVfVU5LTk9XTjtcclxuXHJcbiAgICAgICAgICAgIGlmIChicm93c2VyVHlwZSA9PT0gXCJzYWZhcmlcIiAmJiBpc0FuZHJvaWQpXHJcbiAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9IHN5cy5CUk9XU0VSX1RZUEVfQU5EUk9JRDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoYnJvd3NlclR5cGUgPT09IFwicXFcIiAmJiB1YS5tYXRjaCgvYW5kcm9pZC4qYXBwbGV3ZWJraXQvaSkpXHJcbiAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9IHN5cy5CUk9XU0VSX1RZUEVfQU5EUk9JRDtcclxuICAgICAgICAgICAgbGV0IHR5cGVNYXAgPSB7XHJcbiAgICAgICAgICAgICAgICAnbWljcm9tZXNzZW5nZXInOiBzeXMuQlJPV1NFUl9UWVBFX1dFQ0hBVCxcclxuICAgICAgICAgICAgICAgICd0cmlkZW50Jzogc3lzLkJST1dTRVJfVFlQRV9JRSxcclxuICAgICAgICAgICAgICAgICdlZGdlJzogc3lzLkJST1dTRVJfVFlQRV9FREdFLFxyXG4gICAgICAgICAgICAgICAgJzM2MCBhcGhvbmUnOiBzeXMuQlJPV1NFUl9UWVBFXzM2MCxcclxuICAgICAgICAgICAgICAgICdteGJyb3dzZXInOiBzeXMuQlJPV1NFUl9UWVBFX01BWFRIT04sXHJcbiAgICAgICAgICAgICAgICAnb3ByLyc6IHN5cy5CUk9XU0VSX1RZUEVfT1BFUkEsXHJcbiAgICAgICAgICAgICAgICAndWJyb3dzZXInOiBzeXMuQlJPV1NFUl9UWVBFX1VDLFxyXG4gICAgICAgICAgICAgICAgJ2h1YXdlaWJyb3dzZXInOiBzeXMuQlJPV1NFUl9UWVBFX0hVQVdFSSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGJyb3dzZXJUeXBlID09PSBcInFxYnJvd3NlclwiIHx8IGJyb3dzZXJUeXBlID09PSBcIm1xcWJyb3dzZXJcIil7XHJcbiAgICAgICAgICAgICAgICBpZih1YS5tYXRjaCgvd2VjaGF0fG1pY3JvbWVzc2VuZ2VyL2kpKXtcclxuICAgICAgICAgICAgICAgICAgICBicm93c2VyVHlwZSA9IHN5cy5CUk9XU0VSX1RZUEVfV0VDSEFUO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzeXMuYnJvd3NlclR5cGUgPSB0eXBlTWFwW2Jyb3dzZXJUeXBlXSB8fCBicm93c2VyVHlwZTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmRpY2F0ZSB0aGUgcnVubmluZyBicm93c2VyIHZlcnNpb25cclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZyB8IG51bGx9IGJyb3dzZXJWZXJzaW9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gXCJcIjtcclxuICAgICAgICAvKiBEZXRlcm1pbmUgdGhlIGJyb3dzZXIgdmVyc2lvbiBudW1iZXIgKi9cclxuICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHZlcnNpb25SZWcxID0gLyhtcXFicm93c2VyfG1pY3JvbWVzc2VuZ2VyfHFxYnJvd3Nlcnxzb2dvdXxxem9uZXxsaWViYW98bWF4dGhvbnx1Y3x1Y2JzfDM2MCBhcGhvbmV8MzYwfGJhaWR1Ym94YXBwfGJhaWR1fG1heHRob258bXhicm93c2VyfG1pdWkoPzouaHlicmlkKT8pKG1vYmlsZSk/KGJyb3dzZXIpP1xcLz8oW1xcZC5dKykvaTtcclxuICAgICAgICAgICAgdmFyIHZlcnNpb25SZWcyID0gLyhxcXxjaHJvbWV8c2FmYXJpfGZpcmVmb3h8dHJpZGVudHxvcGVyYXxvcHJcXC98b3VwZW5nKShtb2JpbGUpPyhicm93c2VyKT9cXC8/KFtcXGQuXSspL2k7XHJcbiAgICAgICAgICAgIHZhciB0bXAgPSB1YS5tYXRjaCh2ZXJzaW9uUmVnMSk7XHJcbiAgICAgICAgICAgIGlmKCF0bXApIHRtcCA9IHVhLm1hdGNoKHZlcnNpb25SZWcyKTtcclxuICAgICAgICAgICAgc3lzLmJyb3dzZXJWZXJzaW9uID0gdG1wID8gdG1wWzRdIDogXCJcIjtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICB2YXIgdyA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgaCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHZhciByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluZGljYXRlIHRoZSByZWFsIHBpeGVsIHJlc29sdXRpb24gb2YgdGhlIHdob2xlIGdhbWUgd2luZG93XHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTaXplfSB3aW5kb3dQaXhlbFJlc29sdXRpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBzeXMud2luZG93UGl4ZWxSZXNvbHV0aW9uID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogcmF0aW8gKiB3LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJhdGlvICogaFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN5cy5fY2hlY2tXZWJHTFJlbmRlck1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgIT09IGNjLmdhbWUuUkVOREVSX1RZUEVfV0VCR0wpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGZlYXR1cmUgc3VwcG9ydHMgV2ViR0wgcmVuZGVyIG1vZGUgb25seS5cIik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIF90bXBDYW52YXMxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuXHJcbiAgICAgICAgdmFyIGNyZWF0ZTNEQ29udGV4dCA9IGZ1bmN0aW9uIChjYW52YXMsIG9wdF9hdHRyaWJzLCBvcHRfY29udGV4dFR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKG9wdF9jb250ZXh0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FudmFzLmdldENvbnRleHQob3B0X2NvbnRleHRUeXBlLCBvcHRfYXR0cmlicyk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlM0RDb250ZXh0KGNhbnZhcywgb3B0X2F0dHJpYnMsIFwid2ViZ2xcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUzRENvbnRleHQoY2FudmFzLCBvcHRfYXR0cmlicywgXCJleHBlcmltZW50YWwtd2ViZ2xcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUzRENvbnRleHQoY2FudmFzLCBvcHRfYXR0cmlicywgXCJ3ZWJraXQtM2RcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGUzRENvbnRleHQoY2FudmFzLCBvcHRfYXR0cmlicywgXCJtb3otd2ViZ2xcIikgfHxcclxuICAgICAgICAgICAgICAgICAgICBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY2Muc3lzLmxvY2FsU3RvcmFnZSBpcyBhIGxvY2FsIHN0b3JhZ2UgY29tcG9uZW50LlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBsb2NhbFN0b3JhZ2VcclxuICAgICAgICAgKi9cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxTdG9yYWdlID0gc3lzLmxvY2FsU3RvcmFnZSA9IHdpbi5sb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RvcmFnZVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJzdG9yYWdlXCIpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UgPSBudWxsO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgdmFyIHdhcm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoNTIwMCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHN5cy5sb2NhbFN0b3JhZ2UgPSB7XHJcbiAgICAgICAgICAgICAgICBnZXRJdGVtIDogd2FybixcclxuICAgICAgICAgICAgICAgIHNldEl0ZW0gOiB3YXJuLFxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlSXRlbSA6IHdhcm4sXHJcbiAgICAgICAgICAgICAgICBjbGVhciA6IHdhcm5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBfc3VwcG9ydFdlYnAgPSBfdG1wQ2FudmFzMS50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnKS5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3dlYnAnKTtcclxuICAgICAgICB2YXIgX3N1cHBvcnRDYW52YXMgPSAhIV90bXBDYW52YXMxLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB2YXIgX3N1cHBvcnRXZWJHTCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDQ19URVNUKSB7XHJcbiAgICAgICAgICAgIF9zdXBwb3J0V2ViR0wgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAod2luLldlYkdMUmVuZGVyaW5nQ29udGV4dCkge1xyXG4gICAgICAgICAgICBfc3VwcG9ydFdlYkdMID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBjYXBhYmlsaXRpZXMgb2YgdGhlIGN1cnJlbnQgcGxhdGZvcm1cclxuICAgICAgICAgKiBAcHJvcGVydHkge09iamVjdH0gY2FwYWJpbGl0aWVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIGNhcGFiaWxpdGllcyA9IHN5cy5jYXBhYmlsaXRpZXMgPSB7XHJcbiAgICAgICAgICAgIFwiY2FudmFzXCI6IF9zdXBwb3J0Q2FudmFzLFxyXG4gICAgICAgICAgICBcIm9wZW5nbFwiOiBfc3VwcG9ydFdlYkdMLFxyXG4gICAgICAgICAgICBcIndlYnBcIjogX3N1cHBvcnRXZWJwLFxyXG4gICAgICAgICAgICAnaW1hZ2VCaXRtYXAnOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNyZWF0ZUltYWdlQml0bWFwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgX3RtcENhbnZhczEud2lkdGggPSBfdG1wQ2FudmFzMS5oZWlnaHQgPSAyO1xyXG4gICAgICAgICAgICBjcmVhdGVJbWFnZUJpdG1hcChfdG1wQ2FudmFzMSwge30pLnRoZW4oaW1hZ2VCaXRtYXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FwYWJpbGl0aWVzLmltYWdlQml0bWFwID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGltYWdlQml0bWFwLmNsb3NlICYmIGltYWdlQml0bWFwLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2NFbGVbJ29udG91Y2hzdGFydCddICE9PSB1bmRlZmluZWQgfHwgZG9jWydvbnRvdWNoc3RhcnQnXSAhPT0gdW5kZWZpbmVkIHx8IG5hdi5tc1BvaW50ZXJFbmFibGVkKVxyXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJ0b3VjaGVzXCJdID0gdHJ1ZTtcclxuICAgICAgICBpZiAoZG9jRWxlWydvbm1vdXNldXAnXSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJtb3VzZVwiXSA9IHRydWU7XHJcbiAgICAgICAgaWYgKGRvY0VsZVsnb25rZXl1cCddICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNhcGFiaWxpdGllc1tcImtleWJvYXJkXCJdID0gdHJ1ZTtcclxuICAgICAgICBpZiAod2luLkRldmljZU1vdGlvbkV2ZW50IHx8IHdpbi5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KVxyXG4gICAgICAgICAgICBjYXBhYmlsaXRpZXNbXCJhY2NlbGVyb21ldGVyXCJdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIF9fYXVkaW9TdXBwb3J0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBdWRpbyBzdXBwb3J0IGluIHRoZSBicm93c2VyXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBNVUxUSV9DSEFOTkVMICAgICAgICA6IE11bHRpcGxlIGF1ZGlvIHdoaWxlIHBsYXlpbmcgLSBJZiBpdCBkb2Vzbid0LCB5b3UgY2FuIG9ubHkgcGxheSBiYWNrZ3JvdW5kIG11c2ljXHJcbiAgICAgICAgICogV0VCX0FVRElPICAgICAgICAgICAgOiBTdXBwb3J0IGZvciBXZWJBdWRpbyAtIFN1cHBvcnQgVzNDIFdlYkF1ZGlvIHN0YW5kYXJkcywgYWxsIG9mIHRoZSBhdWRpbyBjYW4gYmUgcGxheWVkXHJcbiAgICAgICAgICogQVVUT1BMQVkgICAgICAgICAgICAgOiBTdXBwb3J0cyBhdXRvLXBsYXkgYXVkaW8gLSBpZiBEb27igJh0IHN1cHBvcnQgaXQsIE9uIGEgdG91Y2ggZGV0ZWN0aW5nIGJhY2tncm91bmQgbXVzaWMgY2FudmFzLCBhbmQgdGhlbiByZXBsYXlcclxuICAgICAgICAgKiBSRVBMQVlfQUZURVJfVE9VQ0ggICA6IFRoZSBmaXJzdCBtdXNpYyB3aWxsIGZhaWwsIG11c3QgYmUgcmVwbGF5IGFmdGVyIHRvdWNoc3RhcnRcclxuICAgICAgICAgKiBVU0VfRU1QVElFRF9FVkVOVCAgICA6IFdoZXRoZXIgdG8gdXNlIHRoZSBlbXB0aWVkIGV2ZW50IHRvIHJlcGxhY2UgbG9hZCBjYWxsYmFja1xyXG4gICAgICAgICAqIERFTEFZX0NSRUFURV9DVFggICAgIDogZGVsYXkgY3JlYXRlZCB0aGUgY29udGV4dCBvYmplY3QgLSBvbmx5IHdlYkF1ZGlvXHJcbiAgICAgICAgICogTkVFRF9NQU5VQUxfTE9PUCAgICAgOiBsb29wIGF0dHJpYnV0ZSBmYWlsdXJlLCBuZWVkIHRvIHBlcmZvcm0gbG9vcCBtYW51YWxseVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogTWF5IGJlIG1vZGlmaWNhdGlvbnMgZm9yIGEgZmV3IGJyb3dzZXIgdmVyc2lvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgdmFyIERFQlVHID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmVyc2lvbiA9IHN5cy5icm93c2VyVmVyc2lvbjtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGJyb3dzZXIgc3VwcG9ydHMgV2ViIEF1ZGlvXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIFdlYiBBdWRpbydzIGNvbnRleHRcclxuICAgICAgICAgICAgdmFyIHN1cHBvcnRXZWJBdWRpbyA9ICEhKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCB8fCB3aW5kb3cubW96QXVkaW9Db250ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0ID0geyBPTkxZX09ORTogZmFsc2UsIFdFQl9BVURJTzogc3VwcG9ydFdlYkF1ZGlvLCBERUxBWV9DUkVBVEVfQ1RYOiBmYWxzZSB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICAgICAgLy8gSU9TIG5vIGV2ZW50IHRoYXQgdXNlZCB0byBwYXJzZSBjb21wbGV0ZWQgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgdGltZSBpcyBub3QgY29tcGxldGUsIGNhbiBub3QgcGxheVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQgPSAnbG9hZGVkbWV0YWRhdGEnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX0ZJUkVGT1gpIHtcclxuICAgICAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LkRFTEFZX0NSRUFURV9DVFggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuVVNFX0xPQURFUl9FVkVOVCA9ICdjYW5wbGF5JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0FORFJPSUQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfVUMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5PTkVfU09VUkNFID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoREVCVUcpe1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnYnJvd3NlIHR5cGU6ICcgKyBzeXMuYnJvd3NlclR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnYnJvd3NlIHZlcnNpb246ICcgKyB2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ01VTFRJX0NIQU5ORUw6ICcgKyBfX2F1ZGlvU3VwcG9ydC5NVUxUSV9DSEFOTkVMKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ1dFQl9BVURJTzogJyArIF9fYXVkaW9TdXBwb3J0LldFQl9BVURJTyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKCdBVVRPUExBWTogJyArIF9fYXVkaW9TdXBwb3J0LkFVVE9QTEFZKTtcclxuICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKF9fYXVkaW9TdXBwb3J0LldFQl9BVURJTykge1xyXG4gICAgICAgICAgICAgICAgX19hdWRpb1N1cHBvcnQuY29udGV4dCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0IHx8IHdpbmRvdy5tb3pBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAgICAgICAgICAgICBpZihfX2F1ZGlvU3VwcG9ydC5ERUxBWV9DUkVBVEVfQ1RYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyBfX2F1ZGlvU3VwcG9ydC5jb250ZXh0ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQgfHwgd2luZG93Lm1vekF1ZGlvQ29udGV4dCkoKTsgfSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIF9fYXVkaW9TdXBwb3J0LldFQl9BVURJTyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjYy5sb2dJRCg1MjAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmb3JtYXRTdXBwb3J0ID0gW107XHJcblxyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgICAgICAgICBpZihhdWRpby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9nZyA9IGF1ZGlvLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2dnKSBmb3JtYXRTdXBwb3J0LnB1c2goJy5vZ2cnKTtcclxuICAgICAgICAgICAgICAgIHZhciBtcDMgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vbXBlZycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1wMykgZm9ybWF0U3VwcG9ydC5wdXNoKCcubXAzJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2F2ID0gYXVkaW8uY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2F2KSBmb3JtYXRTdXBwb3J0LnB1c2goJy53YXYnKTtcclxuICAgICAgICAgICAgICAgIHZhciBtcDQgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8vbXA0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobXA0KSBmb3JtYXRTdXBwb3J0LnB1c2goJy5tcDQnKTtcclxuICAgICAgICAgICAgICAgIHZhciBtNGEgPSBhdWRpby5jYW5QbGF5VHlwZSgnYXVkaW8veC1tNGEnKTtcclxuICAgICAgICAgICAgICAgIGlmIChtNGEpIGZvcm1hdFN1cHBvcnQucHVzaCgnLm00YScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICBfX2F1ZGlvU3VwcG9ydC5mb3JtYXQgPSBmb3JtYXRTdXBwb3J0O1xyXG5cclxuICAgICAgICBzeXMuX19hdWRpb1N1cHBvcnQgPSBfX2F1ZGlvU3VwcG9ydDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIE5ldHdvcmsgdHlwZSBlbnVtZXJhdGlvblxyXG4gICAgICogISN6aFxyXG4gICAgICog572R57uc57G75Z6L5p6a5Li+XHJcbiAgICAgKlxyXG4gICAgICogQGVudW0gc3lzLk5ldHdvcmtUeXBlXHJcbiAgICAgKi9cclxuICAgIHN5cy5OZXR3b3JrVHlwZSA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogTmV0d29yayBpcyB1bnJlYWNoYWJsZS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog572R57uc5LiN6YCaXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTk9ORVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE5PTkU6IDAsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIE5ldHdvcmsgaXMgcmVhY2hhYmxlIHZpYSBXaUZpIG9yIGNhYmxlLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDpgJrov4fml6Dnur/miJbogIXmnInnur/mnKzlnLDnvZHnu5zov57mjqXlm6DnibnnvZFcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMQU5cclxuICAgICAgICAgKi9cclxuICAgICAgICBMQU46IDEsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIE5ldHdvcmsgaXMgcmVhY2hhYmxlIHZpYSBXaXJlbGVzcyBXaWRlIEFyZWEgTmV0d29ya1xyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDpgJrov4fonILnqp3np7vliqjnvZHnu5zov57mjqXlm6DnibnnvZFcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBXV0FOXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgV1dBTjogMlxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBjbGFzcyBzeXNcclxuICAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IHRoZSBuZXR3b3JrIHR5cGUgb2YgY3VycmVudCBkZXZpY2UsIHJldHVybiBjYy5zeXMuTmV0d29ya1R5cGUuTEFOIGlmIGZhaWx1cmUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5blvZPliY3orr7lpIfnmoTnvZHnu5znsbvlnossIOWmguaenOe9kee7nOexu+Wei+aXoOazleiOt+WPlu+8jOm7mOiupOWwhui/lOWbniBjYy5zeXMuTmV0d29ya1R5cGUuTEFOXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBnZXROZXR3b3JrVHlwZVxyXG4gICAgICogQHJldHVybiB7c3lzLk5ldHdvcmtUeXBlfVxyXG4gICAgICovXHJcbiAgICBzeXMuZ2V0TmV0d29ya1R5cGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBUT0RPOiBuZWVkIHRvIGltcGxlbWVudCB0aGlzIGZvciBtb2JpbGUgcGhvbmVzLlxyXG4gICAgICAgIHJldHVybiBzeXMuTmV0d29ya1R5cGUuTEFOO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgYmF0dGVyeSBsZXZlbCBvZiBjdXJyZW50IGRldmljZSwgcmV0dXJuIDEuMCBpZiBmYWlsdXJlLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5b2T5YmN6K6+5aSH55qE55S15rGg55S16YeP77yM5aaC5p6c55S16YeP5peg5rOV6I635Y+W77yM6buY6K6k5bCG6L+U5ZueIDFcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldEJhdHRlcnlMZXZlbFxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAtIDAuMCB+IDEuMFxyXG4gICAgICovXHJcbiAgICBzeXMuZ2V0QmF0dGVyeUxldmVsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gVE9ETzogbmVlZCB0byBpbXBsZW1lbnQgdGhpcyBmb3IgbW9iaWxlIHBob25lcy5cclxuICAgICAgICByZXR1cm4gMS4wO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlcyB0aGUgZ2FyYmFnZSBjb2xsZWN0aW9uLCBvbmx5IGF2YWlsYWJsZSBpbiBKU0JcclxuICAgICAqIEBtZXRob2QgZ2FyYmFnZUNvbGxlY3RcclxuICAgICAqL1xyXG4gICAgc3lzLmdhcmJhZ2VDb2xsZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIE4vQSBpbiB3ZWJcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXN0YXJ0IHRoZSBKUyBWTSwgb25seSBhdmFpbGFibGUgaW4gSlNCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3RhcnRWTVxyXG4gICAgICovXHJcbiAgICBzeXMucmVzdGFydFZNID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIE4vQSBpbiB3ZWJcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB3aGV0aGVyIGFuIG9iamVjdCBpcyB2YWxpZCxcclxuICAgICAqIEluIHdlYiBlbmdpbmUsIGl0IHdpbGwgcmV0dXJuIHRydWUgaWYgdGhlIG9iamVjdCBleGlzdFxyXG4gICAgICogSW4gbmF0aXZlIGVuZ2luZSwgaXQgd2lsbCByZXR1cm4gdHJ1ZSBpZiB0aGUgSlMgb2JqZWN0IGFuZCB0aGUgY29ycmVzcG9uZCBuYXRpdmUgb2JqZWN0IGFyZSBib3RoIHZhbGlkXHJcbiAgICAgKiBAbWV0aG9kIGlzT2JqZWN0VmFsaWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFZhbGlkaXR5IG9mIHRoZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgc3lzLmlzT2JqZWN0VmFsaWQgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgaWYgKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIER1bXAgc3lzdGVtIGluZm9ybWF0aW9uc1xyXG4gICAgICogQG1ldGhvZCBkdW1wXHJcbiAgICAgKi9cclxuICAgIHN5cy5kdW1wID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICBzdHIgKz0gXCJpc01vYmlsZSA6IFwiICsgc2VsZi5pc01vYmlsZSArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgc3RyICs9IFwibGFuZ3VhZ2UgOiBcIiArIHNlbGYubGFuZ3VhZ2UgKyBcIlxcclxcblwiO1xyXG4gICAgICAgIHN0ciArPSBcImJyb3dzZXJUeXBlIDogXCIgKyBzZWxmLmJyb3dzZXJUeXBlICsgXCJcXHJcXG5cIjtcclxuICAgICAgICBzdHIgKz0gXCJicm93c2VyVmVyc2lvbiA6IFwiICsgc2VsZi5icm93c2VyVmVyc2lvbiArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgc3RyICs9IFwiY2FwYWJpbGl0aWVzIDogXCIgKyBKU09OLnN0cmluZ2lmeShzZWxmLmNhcGFiaWxpdGllcykgKyBcIlxcclxcblwiO1xyXG4gICAgICAgIHN0ciArPSBcIm9zIDogXCIgKyBzZWxmLm9zICsgXCJcXHJcXG5cIjtcclxuICAgICAgICBzdHIgKz0gXCJvc1ZlcnNpb24gOiBcIiArIHNlbGYub3NWZXJzaW9uICsgXCJcXHJcXG5cIjtcclxuICAgICAgICBzdHIgKz0gXCJwbGF0Zm9ybSA6IFwiICsgc2VsZi5wbGF0Zm9ybSArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgc3RyICs9IFwiVXNpbmcgXCIgKyAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX1dFQkdMID8gXCJXRUJHTFwiIDogXCJDQU5WQVNcIikgKyBcIiByZW5kZXJlci5cIiArIFwiXFxyXFxuXCI7XHJcbiAgICAgICAgY2MubG9nKHN0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiBhIHVybCBpbiBicm93c2VyXHJcbiAgICAgKiBAbWV0aG9kIG9wZW5VUkxcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICAgICAqL1xyXG4gICAgc3lzLm9wZW5VUkwgPSBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgaWYgKENDX0pTQiB8fCBDQ19SVU5USU1FKSB7XHJcbiAgICAgICAgICAgIGpzYi5vcGVuVVJMKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cub3Blbih1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZWxhcHNlZCBzaW5jZSAxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMuXHJcbiAgICAgKiBAbWV0aG9kIG5vd1xyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBzeXMubm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChEYXRlLm5vdykge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiArKG5ldyBEYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBzeXM7XHJcbn1cclxuXHJcbnZhciBzeXMgPSBjYyAmJiBjYy5zeXMgPyBjYy5zeXMgOiBpbml0U3lzKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN5cztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=