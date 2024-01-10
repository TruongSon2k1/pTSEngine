
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCDebug.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var utils = require('./platform/utils');

var debugInfos = require('../../DebugInfos') || {};
var ERROR_MAP_URL = 'https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md'; // the html element displays log in web page (DebugMode.INFO_FOR_WEB_PAGE)

var logList;
/**
 * @module cc
 */

cc.log = cc.warn = cc.error = cc.assert = console.log.bind ? console.log.bind(console) : console.log;

var resetDebugSetting = function resetDebugSetting(mode) {
  // reset
  cc.log = cc.warn = cc.error = cc.assert = function () {};

  if (mode === DebugMode.NONE) return;

  if (mode > DebugMode.ERROR) {
    //log to web page
    var logToWebPage = function logToWebPage(msg) {
      if (!cc.game.canvas) return;

      if (!logList) {
        var logDiv = document.createElement("Div");
        logDiv.setAttribute("id", "logInfoDiv");
        logDiv.setAttribute("width", "200");
        logDiv.setAttribute("height", cc.game.canvas.height);
        var logDivStyle = logDiv.style;
        logDivStyle.zIndex = "99999";
        logDivStyle.position = "absolute";
        logDivStyle.top = logDivStyle.left = "0";
        logList = document.createElement("textarea");
        logList.setAttribute("rows", "20");
        logList.setAttribute("cols", "30");
        logList.setAttribute("disabled", "true");
        var logListStyle = logList.style;
        logListStyle.backgroundColor = "transparent";
        logListStyle.borderBottom = "1px solid #cccccc";
        logListStyle.borderTopWidth = logListStyle.borderLeftWidth = logListStyle.borderRightWidth = "0px";
        logListStyle.borderTopStyle = logListStyle.borderLeftStyle = logListStyle.borderRightStyle = "none";
        logListStyle.padding = "0px";
        logListStyle.margin = 0;
        logDiv.appendChild(logList);
        cc.game.canvas.parentNode.appendChild(logDiv);
      }

      logList.value = logList.value + msg + "\r\n";
      logList.scrollTop = logList.scrollHeight;
    };

    cc.error = function () {
      logToWebPage("ERROR :  " + cc.js.formatStr.apply(null, arguments));
    };

    cc.assert = function (cond, msg) {
      'use strict';

      if (!cond && msg) {
        msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
        logToWebPage("ASSERT: " + msg);
      }
    };

    if (mode !== DebugMode.ERROR_FOR_WEB_PAGE) {
      cc.warn = function () {
        logToWebPage("WARN :  " + cc.js.formatStr.apply(null, arguments));
      };
    }

    if (mode === DebugMode.INFO_FOR_WEB_PAGE) {
      cc.log = function () {
        logToWebPage(cc.js.formatStr.apply(null, arguments));
      };
    }
  } else if (console && console.log.apply) {
    //console is null when user doesn't open dev tool on IE9
    //log to console
    // For JSB
    if (!console.error) console.error = console.log;
    if (!console.warn) console.warn = console.log;
    /**
     * !#en
     * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
     * - In Cocos Creator, error is red.<br/>
     * - In Chrome, error have a red icon along with red message text.<br/>
     * !#zh
     * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
     * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
     * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
     *
     * @method error
     * @param {any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */

    if (CC_EDITOR) {
      cc.error = Editor.error;
    } else if (console.error.bind) {
      // use bind to avoid pollute call stacks
      cc.error = console.error.bind(console);
    } else {
      cc.error = CC_JSB || CC_RUNTIME ? console.error : function () {
        return console.error.apply(console, arguments);
      };
    }

    cc.assert = function (cond, msg) {
      if (!cond) {
        if (msg) {
          msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
        }

        if (CC_DEV) {
          debugger;
        }

        if (CC_TEST) {
          ok(false, msg);
        } else {
          throw new Error(msg);
        }
      }
    };
  }

  if (mode !== DebugMode.ERROR) {
    /**
     * !#en
     * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
     * - In Cocos Creator, warning is yellow.
     * - In Chrome, warning have a yellow warning icon with the message text.
     * !#zh
     * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
     * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
     * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
     * @method warn
     * @param {any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */
    if (CC_EDITOR) {
      cc.warn = Editor.warn;
    } else if (console.warn.bind) {
      // use bind to avoid pollute call stacks
      cc.warn = console.warn.bind(console);
    } else {
      cc.warn = CC_JSB || CC_RUNTIME ? console.warn : function () {
        return console.warn.apply(console, arguments);
      };
    }
  }

  if (CC_EDITOR) {
    cc.log = Editor.log;
  } else if (mode === DebugMode.INFO) {
    /**
     * !#en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime).
     * !#zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
     * @method log
     * @param {String|any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */
    if (CC_JSB || CC_RUNTIME) {
      if (scriptEngineType === "JavaScriptCore") {
        // console.log has to use `console` as its context for iOS 8~9. Therefore, apply it.
        cc.log = function () {
          return console.log.apply(console, arguments);
        };
      } else {
        cc.log = console.log;
      }
    } else if (console.log.bind) {
      // use bind to avoid pollute call stacks
      cc.log = console.log.bind(console);
    } else {
      cc.log = function () {
        return console.log.apply(console, arguments);
      };
    }
  }
};

cc._throw = CC_EDITOR ? Editor.error : function (error) {
  utils.callInNextTick(function () {
    throw error;
  });
};

function getTypedFormatter(type) {
  return function () {
    var id = arguments[0];
    var msg = CC_DEBUG ? debugInfos[id] || 'unknown id' : type + " " + id + ", please go to " + ERROR_MAP_URL + "#" + id + " to see details.";

    if (arguments.length === 1) {
      return msg;
    } else if (arguments.length === 2) {
      return CC_DEBUG ? cc.js.formatStr(msg, arguments[1]) : msg + ' Arguments: ' + arguments[1];
    } else {
      var argsArray = cc.js.shiftArguments.apply(null, arguments);
      return CC_DEBUG ? cc.js.formatStr.apply(null, [msg].concat(argsArray)) : msg + ' Arguments: ' + argsArray.join(', ');
    }
  };
}

var logFormatter = getTypedFormatter('Log');

cc.logID = function () {
  cc.log(logFormatter.apply(null, arguments));
};

var warnFormatter = getTypedFormatter('Warning');

cc.warnID = function () {
  cc.warn(warnFormatter.apply(null, arguments));
};

var errorFormatter = getTypedFormatter('Error');

cc.errorID = function () {
  cc.error(errorFormatter.apply(null, arguments));
};

var assertFormatter = getTypedFormatter('Assert');

cc.assertID = function (cond) {
  'use strict';

  if (cond) {
    return;
  }

  cc.assert(false, assertFormatter.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};
/**
* !#en Enum for debug modes.
* !#zh 调试模式
* @enum debug.DebugMode
* @memberof cc
 */


var DebugMode = cc.Enum({
  /**
   * !#en The debug mode none.
   * !#zh 禁止模式，禁止显示任何日志信息。
   * @property NONE
   * @type {Number}
   * @static
   */
  NONE: 0,

  /**
   * !#en The debug mode info.
   * !#zh 信息模式，在 console 中显示所有日志。
   * @property INFO
   * @type {Number}
   * @static
   */
  INFO: 1,

  /**
   * !#en The debug mode warn.
   * !#zh 警告模式，在 console 中只显示 warn 级别以上的（包含 error）日志。
   * @property WARN
   * @type {Number}
   * @static
   */
  WARN: 2,

  /**
   * !#en The debug mode error.
   * !#zh 错误模式，在 console 中只显示 error 日志。
   * @property ERROR
   * @type {Number}
   * @static
   */
  ERROR: 3,

  /**
   * !#en The debug mode info for web page.
   * !#zh 信息模式（仅 WEB 端有效），在画面上输出所有信息。
   * @property INFO_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  INFO_FOR_WEB_PAGE: 4,

  /**
   * !#en The debug mode warn for web page.
   * !#zh 警告模式（仅 WEB 端有效），在画面上输出 warn 级别以上的（包含 error）信息。
   * @property WARN_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  WARN_FOR_WEB_PAGE: 5,

  /**
   * !#en The debug mode error for web page.
   * !#zh 错误模式（仅 WEB 端有效），在画面上输出 error 信息。
   * @property ERROR_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  ERROR_FOR_WEB_PAGE: 6
});
/**
 * !#en An object to boot the game.
 * !#zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 * @class debug
 * @main
 * @static
 */

module.exports = cc.debug = {
  DebugMode: DebugMode,
  _resetDebugSetting: resetDebugSetting,

  /**
   * !#en Gets error message with the error id and possible parameters.
   * !#zh 通过 error id 和必要的参数来获取错误信息。
   * @method getError
   * @param {Number} errorId
   * @param {any} [param]
   * @return {String}
   */
  getError: getTypedFormatter('ERROR'),

  /**
   * !#en Returns whether or not to display the FPS informations.
   * !#zh 是否显示 FPS 信息。
   * @method isDisplayStats
   * @return {Boolean}
   */
  isDisplayStats: function isDisplayStats() {
    return cc.profiler ? cc.profiler.isShowingStats() : false;
  },

  /**
   * !#en Sets whether display the FPS on the bottom-left corner.
   * !#zh 设置是否在左下角显示 FPS。
   * @method setDisplayStats
   * @param {Boolean} displayStats
   */
  setDisplayStats: function setDisplayStats(displayStats) {
    if (cc.profiler && cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
      displayStats ? cc.profiler.showStats() : cc.profiler.hideStats();
      cc.game.config.showFPS = !!displayStats;
    }
  }
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDRGVidWcuanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZXF1aXJlIiwiZGVidWdJbmZvcyIsIkVSUk9SX01BUF9VUkwiLCJsb2dMaXN0IiwiY2MiLCJsb2ciLCJ3YXJuIiwiZXJyb3IiLCJhc3NlcnQiLCJjb25zb2xlIiwiYmluZCIsInJlc2V0RGVidWdTZXR0aW5nIiwibW9kZSIsIkRlYnVnTW9kZSIsIk5PTkUiLCJFUlJPUiIsImxvZ1RvV2ViUGFnZSIsIm1zZyIsImdhbWUiLCJjYW52YXMiLCJsb2dEaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJoZWlnaHQiLCJsb2dEaXZTdHlsZSIsInN0eWxlIiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibG9nTGlzdFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQm90dG9tIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiYm9yZGVyVG9wU3R5bGUiLCJib3JkZXJMZWZ0U3R5bGUiLCJib3JkZXJSaWdodFN0eWxlIiwicGFkZGluZyIsIm1hcmdpbiIsImFwcGVuZENoaWxkIiwicGFyZW50Tm9kZSIsInZhbHVlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwianMiLCJmb3JtYXRTdHIiLCJhcHBseSIsImFyZ3VtZW50cyIsImNvbmQiLCJzaGlmdEFyZ3VtZW50cyIsIkVSUk9SX0ZPUl9XRUJfUEFHRSIsIklORk9fRk9SX1dFQl9QQUdFIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsIkNDX0RFViIsIkNDX1RFU1QiLCJvayIsIkVycm9yIiwiSU5GTyIsInNjcmlwdEVuZ2luZVR5cGUiLCJfdGhyb3ciLCJjYWxsSW5OZXh0VGljayIsImdldFR5cGVkRm9ybWF0dGVyIiwidHlwZSIsImlkIiwiQ0NfREVCVUciLCJsZW5ndGgiLCJhcmdzQXJyYXkiLCJjb25jYXQiLCJqb2luIiwibG9nRm9ybWF0dGVyIiwibG9nSUQiLCJ3YXJuRm9ybWF0dGVyIiwid2FybklEIiwiZXJyb3JGb3JtYXR0ZXIiLCJlcnJvcklEIiwiYXNzZXJ0Rm9ybWF0dGVyIiwiYXNzZXJ0SUQiLCJFbnVtIiwiV0FSTiIsIldBUk5fRk9SX1dFQl9QQUdFIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlYnVnIiwiX3Jlc2V0RGVidWdTZXR0aW5nIiwiZ2V0RXJyb3IiLCJpc0Rpc3BsYXlTdGF0cyIsInByb2ZpbGVyIiwiaXNTaG93aW5nU3RhdHMiLCJzZXREaXNwbGF5U3RhdHMiLCJkaXNwbGF5U3RhdHMiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwic2hvd1N0YXRzIiwiaGlkZVN0YXRzIiwiY29uZmlnIiwic2hvd0ZQUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLGtCQUFELENBQXJCOztBQUNBLElBQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLGtCQUFELENBQVAsSUFBK0IsRUFBbEQ7QUFDQSxJQUFNRSxhQUFhLEdBQUcsdUVBQXRCLEVBRUE7O0FBQ0EsSUFBSUMsT0FBSjtBQUVBO0FBQ0E7QUFDQTs7QUFFQUMsRUFBRSxDQUFDQyxHQUFILEdBQVNELEVBQUUsQ0FBQ0UsSUFBSCxHQUFVRixFQUFFLENBQUNHLEtBQUgsR0FBV0gsRUFBRSxDQUFDSSxNQUFILEdBQVlDLE9BQU8sQ0FBQ0osR0FBUixDQUFZSyxJQUFaLEdBQW1CRCxPQUFPLENBQUNKLEdBQVIsQ0FBWUssSUFBWixDQUFpQkQsT0FBakIsQ0FBbkIsR0FBK0NBLE9BQU8sQ0FBQ0osR0FBakc7O0FB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QUF6QztBQUNBL0YsTUFBQUEsRUFBRSxDQUFDYyxJQUFILENBQVFrRixNQUFSLENBQWVDLE9BQWYsR0FBeUIsQ0FBQyxDQUFDTixZQUEzQjtBQUNIO0FBQ0o7QUFwQ3VCLENBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vcGxhdGZvcm0vdXRpbHMnKTtcbmNvbnN0IGRlYnVnSW5mb3MgPSByZXF1aXJlKCcuLi8uLi9EZWJ1Z0luZm9zJykgfHwge307XG5jb25zdCBFUlJPUl9NQVBfVVJMID0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yL2VuZ2luZS9ibG9iL21hc3Rlci9FbmdpbmVFcnJvck1hcC5tZCc7XG5cbi8vIHRoZSBodG1sIGVsZW1lbnQgZGlzcGxheXMgbG9nIGluIHdlYiBwYWdlIChEZWJ1Z01vZGUuSU5GT19GT1JfV0VCX1BBR0UpXG5sZXQgbG9nTGlzdDtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuY2MubG9nID0gY2Mud2FybiA9IGNjLmVycm9yID0gY2MuYXNzZXJ0ID0gY29uc29sZS5sb2cuYmluZCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSkgOiBjb25zb2xlLmxvZztcblxubGV0IHJlc2V0RGVidWdTZXR0aW5nID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgICAvLyByZXNldFxuICAgIGNjLmxvZyA9IGNjLndhcm4gPSBjYy5lcnJvciA9IGNjLmFzc2VydCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgaWYgKG1vZGUgPT09IERlYnVnTW9kZS5OT05FKVxuICAgICAgICByZXR1cm47XG5cbiAgICBpZiAobW9kZSA+IERlYnVnTW9kZS5FUlJPUikge1xuICAgICAgICAvL2xvZyB0byB3ZWIgcGFnZVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ1RvV2ViUGFnZSAobXNnKSB7XG4gICAgICAgICAgICBpZiAoIWNjLmdhbWUuY2FudmFzKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKCFsb2dMaXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJEaXZcIik7XG4gICAgICAgICAgICAgICAgbG9nRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibG9nSW5mb0RpdlwiKTtcbiAgICAgICAgICAgICAgICBsb2dEaXYuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCIyMDBcIik7XG4gICAgICAgICAgICAgICAgbG9nRGl2LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBjYy5nYW1lLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIHZhciBsb2dEaXZTdHlsZSA9IGxvZ0Rpdi5zdHlsZTtcbiAgICAgICAgICAgICAgICBsb2dEaXZTdHlsZS56SW5kZXggPSBcIjk5OTk5XCI7XG4gICAgICAgICAgICAgICAgbG9nRGl2U3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgICAgICAgICAgbG9nRGl2U3R5bGUudG9wID0gbG9nRGl2U3R5bGUubGVmdCA9IFwiMFwiO1xuXG4gICAgICAgICAgICAgICAgbG9nTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgICAgICAgICAgICAgICBsb2dMaXN0LnNldEF0dHJpYnV0ZShcInJvd3NcIiwgXCIyMFwiKTtcbiAgICAgICAgICAgICAgICBsb2dMaXN0LnNldEF0dHJpYnV0ZShcImNvbHNcIiwgXCIzMFwiKTtcbiAgICAgICAgICAgICAgICBsb2dMaXN0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9nTGlzdFN0eWxlID0gbG9nTGlzdC5zdHlsZTtcbiAgICAgICAgICAgICAgICBsb2dMaXN0U3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiO1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RTdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCAjY2NjY2NjXCI7XG4gICAgICAgICAgICAgICAgbG9nTGlzdFN0eWxlLmJvcmRlclRvcFdpZHRoID0gbG9nTGlzdFN0eWxlLmJvcmRlckxlZnRXaWR0aCA9IGxvZ0xpc3RTdHlsZS5ib3JkZXJSaWdodFdpZHRoID0gXCIwcHhcIjtcbiAgICAgICAgICAgICAgICBsb2dMaXN0U3R5bGUuYm9yZGVyVG9wU3R5bGUgPSBsb2dMaXN0U3R5bGUuYm9yZGVyTGVmdFN0eWxlID0gbG9nTGlzdFN0eWxlLmJvcmRlclJpZ2h0U3R5bGUgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBsb2dMaXN0U3R5bGUucGFkZGluZyA9IFwiMHB4XCI7XG4gICAgICAgICAgICAgICAgbG9nTGlzdFN0eWxlLm1hcmdpbiA9IDA7XG5cbiAgICAgICAgICAgICAgICBsb2dEaXYuYXBwZW5kQ2hpbGQobG9nTGlzdCk7XG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5jYW52YXMucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChsb2dEaXYpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2dMaXN0LnZhbHVlID0gbG9nTGlzdC52YWx1ZSArIG1zZyArIFwiXFxyXFxuXCI7XG4gICAgICAgICAgICBsb2dMaXN0LnNjcm9sbFRvcCA9IGxvZ0xpc3Quc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgY2MuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2dUb1dlYlBhZ2UoXCJFUlJPUiA6ICBcIiArIGNjLmpzLmZvcm1hdFN0ci5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY2MuYXNzZXJ0ID0gZnVuY3Rpb24gKGNvbmQsIG1zZykge1xuICAgICAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICAgICAgaWYgKCFjb25kICYmIG1zZykge1xuICAgICAgICAgICAgICAgIG1zZyA9IGNjLmpzLmZvcm1hdFN0ci5hcHBseShudWxsLCBjYy5qcy5zaGlmdEFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICBsb2dUb1dlYlBhZ2UoXCJBU1NFUlQ6IFwiICsgbXNnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1vZGUgIT09IERlYnVnTW9kZS5FUlJPUl9GT1JfV0VCX1BBR0UpIHtcbiAgICAgICAgICAgIGNjLndhcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbG9nVG9XZWJQYWdlKFwiV0FSTiA6ICBcIiArIGNjLmpzLmZvcm1hdFN0ci5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1vZGUgPT09IERlYnVnTW9kZS5JTkZPX0ZPUl9XRUJfUEFHRSkge1xuICAgICAgICAgICAgY2MubG9nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxvZ1RvV2ViUGFnZShjYy5qcy5mb3JtYXRTdHIuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnNvbGUgJiYgY29uc29sZS5sb2cuYXBwbHkpIHsvL2NvbnNvbGUgaXMgbnVsbCB3aGVuIHVzZXIgZG9lc24ndCBvcGVuIGRldiB0b29sIG9uIElFOVxuICAgICAgICAvL2xvZyB0byBjb25zb2xlXG5cbiAgICAgICAgLy8gRm9yIEpTQlxuICAgICAgICBpZiAoIWNvbnNvbGUuZXJyb3IpIGNvbnNvbGUuZXJyb3IgPSBjb25zb2xlLmxvZztcbiAgICAgICAgaWYgKCFjb25zb2xlLndhcm4pIGNvbnNvbGUud2FybiA9IGNvbnNvbGUubG9nO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE91dHB1dHMgYW4gZXJyb3IgbWVzc2FnZSB0byB0aGUgQ29jb3MgQ3JlYXRvciBDb25zb2xlIChlZGl0b3IpIG9yIFdlYiBDb25zb2xlIChydW50aW1lKS48YnIvPlxuICAgICAgICAgKiAtIEluIENvY29zIENyZWF0b3IsIGVycm9yIGlzIHJlZC48YnIvPlxuICAgICAgICAgKiAtIEluIENocm9tZSwgZXJyb3IgaGF2ZSBhIHJlZCBpY29uIGFsb25nIHdpdGggcmVkIG1lc3NhZ2UgdGV4dC48YnIvPlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOi+k+WHuumUmeivr+a2iOaBr+WIsCBDb2NvcyBDcmVhdG9yIOe8lui+keWZqOeahCBDb25zb2xlIOaIlui/kOihjOaXtumhtemdouerr+eahCBDb25zb2xlIOS4reOAgjxici8+XG4gICAgICAgICAqIC0g5ZyoIENvY29zIENyZWF0b3Ig5Lit77yM6ZSZ6K+v5L+h5oGv5pi+56S65piv57qi6Imy55qE44CCPGJyLz5cbiAgICAgICAgICogLSDlnKggQ2hyb21lIOS4re+8jOmUmeivr+S/oeaBr+aciee6ouiJsueahOWbvuagh+S7peWPiue6ouiJsueahOa2iOaBr+aWh+acrOOAgjxici8+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZXJyb3JcbiAgICAgICAgICogQHBhcmFtIHthbnl9IG1zZyAtIEEgSmF2YVNjcmlwdCBzdHJpbmcgY29udGFpbmluZyB6ZXJvIG9yIG1vcmUgc3Vic3RpdHV0aW9uIHN0cmluZ3MuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSAuLi5zdWJzdCAtIEphdmFTY3JpcHQgb2JqZWN0cyB3aXRoIHdoaWNoIHRvIHJlcGxhY2Ugc3Vic3RpdHV0aW9uIHN0cmluZ3Mgd2l0aGluIG1zZy4gVGhpcyBnaXZlcyB5b3UgYWRkaXRpb25hbCBjb250cm9sIG92ZXIgdGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgY2MuZXJyb3IgPSBFZGl0b3IuZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uc29sZS5lcnJvci5iaW5kKSB7XG4gICAgICAgICAgICAvLyB1c2UgYmluZCB0byBhdm9pZCBwb2xsdXRlIGNhbGwgc3RhY2tzXG4gICAgICAgICAgICBjYy5lcnJvciA9IGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9yID0gQ0NfSlNCIHx8IENDX1JVTlRJTUUgPyBjb25zb2xlLmVycm9yIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNjLmFzc2VydCA9IGZ1bmN0aW9uIChjb25kLCBtc2cpIHtcbiAgICAgICAgICAgIGlmICghY29uZCkge1xuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gY2MuanMuZm9ybWF0U3RyLmFwcGx5KG51bGwsIGNjLmpzLnNoaWZ0QXJndW1lbnRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoQ0NfVEVTVCkge1xuICAgICAgICAgICAgICAgICAgICBvayhmYWxzZSwgbXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9kZSAhPT0gRGVidWdNb2RlLkVSUk9SKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE91dHB1dHMgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIENvY29zIENyZWF0b3IgQ29uc29sZSAoZWRpdG9yKSBvciBXZWIgQ29uc29sZSAocnVudGltZSkuXG4gICAgICAgICAqIC0gSW4gQ29jb3MgQ3JlYXRvciwgd2FybmluZyBpcyB5ZWxsb3cuXG4gICAgICAgICAqIC0gSW4gQ2hyb21lLCB3YXJuaW5nIGhhdmUgYSB5ZWxsb3cgd2FybmluZyBpY29uIHdpdGggdGhlIG1lc3NhZ2UgdGV4dC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDovpPlh7rorablkYrmtojmga/liLAgQ29jb3MgQ3JlYXRvciDnvJbovpHlmajnmoQgQ29uc29sZSDmiJbov5DooYzml7YgV2ViIOerr+eahCBDb25zb2xlIOS4reOAgjxici8+XG4gICAgICAgICAqIC0g5ZyoIENvY29zIENyZWF0b3Ig5Lit77yM6K2m5ZGK5L+h5oGv5pi+56S65piv6buE6Imy55qE44CCPGJyLz5cbiAgICAgICAgICogLSDlnKggQ2hyb21lIOS4re+8jOitpuWRiuS/oeaBr+acieedgOm7hOiJsueahOWbvuagh+S7peWPium7hOiJsueahOa2iOaBr+aWh+acrOOAgjxici8+XG4gICAgICAgICAqIEBtZXRob2Qgd2FyblxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gbXNnIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncy5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IC4uLnN1YnN0IC0gSmF2YVNjcmlwdCBvYmplY3RzIHdpdGggd2hpY2ggdG8gcmVwbGFjZSBzdWJzdGl0dXRpb24gc3RyaW5ncyB3aXRoaW4gbXNnLiBUaGlzIGdpdmVzIHlvdSBhZGRpdGlvbmFsIGNvbnRyb2wgb3ZlciB0aGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBjYy53YXJuID0gRWRpdG9yLndhcm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uc29sZS53YXJuLmJpbmQpIHtcbiAgICAgICAgICAgIC8vIHVzZSBiaW5kIHRvIGF2b2lkIHBvbGx1dGUgY2FsbCBzdGFja3NcbiAgICAgICAgICAgIGNjLndhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLndhcm4gPSBDQ19KU0IgfHwgQ0NfUlVOVElNRSA/IGNvbnNvbGUud2FybiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgY2MubG9nID0gRWRpdG9yLmxvZztcbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PT0gRGVidWdNb2RlLklORk8pIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gT3V0cHV0cyBhIG1lc3NhZ2UgdG8gdGhlIENvY29zIENyZWF0b3IgQ29uc29sZSAoZWRpdG9yKSBvciBXZWIgQ29uc29sZSAocnVudGltZSkuXG4gICAgICAgICAqICEjemgg6L6T5Ye65LiA5p2h5raI5oGv5YiwIENvY29zIENyZWF0b3Ig57yW6L6R5Zmo55qEIENvbnNvbGUg5oiW6L+Q6KGM5pe2IFdlYiDnq6/nmoQgQ29uc29sZSDkuK3jgIJcbiAgICAgICAgICogQG1ldGhvZCBsb2dcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8YW55fSBtc2cgLSBBIEphdmFTY3JpcHQgc3RyaW5nIGNvbnRhaW5pbmcgemVybyBvciBtb3JlIHN1YnN0aXR1dGlvbiBzdHJpbmdzLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gLi4uc3Vic3QgLSBKYXZhU2NyaXB0IG9iamVjdHMgd2l0aCB3aGljaCB0byByZXBsYWNlIHN1YnN0aXR1dGlvbiBzdHJpbmdzIHdpdGhpbiBtc2cuIFRoaXMgZ2l2ZXMgeW91IGFkZGl0aW9uYWwgY29udHJvbCBvdmVyIHRoZSBmb3JtYXQgb2YgdGhlIG91dHB1dC5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xuICAgICAgICAgICAgaWYgKHNjcmlwdEVuZ2luZVR5cGUgPT09IFwiSmF2YVNjcmlwdENvcmVcIikge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nIGhhcyB0byB1c2UgYGNvbnNvbGVgIGFzIGl0cyBjb250ZXh0IGZvciBpT1MgOH45LiBUaGVyZWZvcmUsIGFwcGx5IGl0LlxuICAgICAgICAgICAgICAgIGNjLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uc29sZS5sb2cuYmluZCkge1xuICAgICAgICAgICAgLy8gdXNlIGJpbmQgdG8gYXZvaWQgcG9sbHV0ZSBjYWxsIHN0YWNrc1xuICAgICAgICAgICAgY2MubG9nID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jYy5fdGhyb3cgPSBDQ19FRElUT1IgPyBFZGl0b3IuZXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICB1dGlscy5jYWxsSW5OZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0VHlwZWRGb3JtYXR0ZXIgKHR5cGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWQgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHZhciBtc2cgPSBDQ19ERUJVRyA/IChkZWJ1Z0luZm9zW2lkXSB8fCAndW5rbm93biBpZCcpIDogYCR7dHlwZX0gJHtpZH0sIHBsZWFzZSBnbyB0byAke0VSUk9SX01BUF9VUkx9IyR7aWR9IHRvIHNlZSBkZXRhaWxzLmA7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gbXNnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBDQ19ERUJVRyA/IGNjLmpzLmZvcm1hdFN0cihtc2csIGFyZ3VtZW50c1sxXSkgOlxuICAgICAgICAgICAgICAgIG1zZyArICcgQXJndW1lbnRzOiAnICsgYXJndW1lbnRzWzFdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGFyZ3NBcnJheSA9IGNjLmpzLnNoaWZ0QXJndW1lbnRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gQ0NfREVCVUcgPyBjYy5qcy5mb3JtYXRTdHIuYXBwbHkobnVsbCwgW21zZ10uY29uY2F0KGFyZ3NBcnJheSkpIDpcbiAgICAgICAgICAgICAgICBtc2cgKyAnIEFyZ3VtZW50czogJyArIGFyZ3NBcnJheS5qb2luKCcsICcpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxudmFyIGxvZ0Zvcm1hdHRlciA9IGdldFR5cGVkRm9ybWF0dGVyKCdMb2cnKTtcbmNjLmxvZ0lEID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLmxvZyhsb2dGb3JtYXR0ZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG59O1xuXG52YXIgd2FybkZvcm1hdHRlciA9IGdldFR5cGVkRm9ybWF0dGVyKCdXYXJuaW5nJyk7XG5jYy53YXJuSUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2Mud2Fybih3YXJuRm9ybWF0dGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xufTtcblxudmFyIGVycm9yRm9ybWF0dGVyID0gZ2V0VHlwZWRGb3JtYXR0ZXIoJ0Vycm9yJyk7XG5jYy5lcnJvcklEID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLmVycm9yKGVycm9yRm9ybWF0dGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xufTtcblxudmFyIGFzc2VydEZvcm1hdHRlciA9IGdldFR5cGVkRm9ybWF0dGVyKCdBc3NlcnQnKTtcbmNjLmFzc2VydElEID0gZnVuY3Rpb24gKGNvbmQpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgaWYgKGNvbmQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYy5hc3NlcnQoZmFsc2UsIGFzc2VydEZvcm1hdHRlci5hcHBseShudWxsLCBjYy5qcy5zaGlmdEFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpKSk7XG59O1xuXG4vKipcbiogISNlbiBFbnVtIGZvciBkZWJ1ZyBtb2Rlcy5cbiogISN6aCDosIPor5XmqKHlvI9cbiogQGVudW0gZGVidWcuRGVidWdNb2RlXG4qIEBtZW1iZXJvZiBjY1xuICovXG52YXIgRGVidWdNb2RlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSBub25lLlxuICAgICAqICEjemgg56aB5q2i5qih5byP77yM56aB5q2i5pi+56S65Lu75L2V5pel5b+X5L+h5oGv44CCXG4gICAgICogQHByb3BlcnR5IE5PTkVcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBOT05FOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRlYnVnIG1vZGUgaW5mby5cbiAgICAgKiAhI3poIOS/oeaBr+aooeW8j++8jOWcqCBjb25zb2xlIOS4reaYvuekuuaJgOacieaXpeW/l+OAglxuICAgICAqIEBwcm9wZXJ0eSBJTkZPXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSU5GTzogMSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkZWJ1ZyBtb2RlIHdhcm4uXG4gICAgICogISN6aCDorablkYrmqKHlvI/vvIzlnKggY29uc29sZSDkuK3lj6rmmL7npLogd2FybiDnuqfliKvku6XkuIrnmoTvvIjljIXlkKsgZXJyb3LvvInml6Xlv5fjgIJcbiAgICAgKiBAcHJvcGVydHkgV0FSTlxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFdBUk46IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSBlcnJvci5cbiAgICAgKiAhI3poIOmUmeivr+aooeW8j++8jOWcqCBjb25zb2xlIOS4reWPquaYvuekuiBlcnJvciDml6Xlv5fjgIJcbiAgICAgKiBAcHJvcGVydHkgRVJST1JcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBFUlJPUjogMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkZWJ1ZyBtb2RlIGluZm8gZm9yIHdlYiBwYWdlLlxuICAgICAqICEjemgg5L+h5oGv5qih5byP77yI5LuFIFdFQiDnq6/mnInmlYjvvInvvIzlnKjnlLvpnaLkuIrovpPlh7rmiYDmnInkv6Hmga/jgIJcbiAgICAgKiBAcHJvcGVydHkgSU5GT19GT1JfV0VCX1BBR0VcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBJTkZPX0ZPUl9XRUJfUEFHRTogNCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkZWJ1ZyBtb2RlIHdhcm4gZm9yIHdlYiBwYWdlLlxuICAgICAqICEjemgg6K2m5ZGK5qih5byP77yI5LuFIFdFQiDnq6/mnInmlYjvvInvvIzlnKjnlLvpnaLkuIrovpPlh7ogd2FybiDnuqfliKvku6XkuIrnmoTvvIjljIXlkKsgZXJyb3LvvInkv6Hmga/jgIJcbiAgICAgKiBAcHJvcGVydHkgV0FSTl9GT1JfV0VCX1BBR0VcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBXQVJOX0ZPUl9XRUJfUEFHRTogNSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkZWJ1ZyBtb2RlIGVycm9yIGZvciB3ZWIgcGFnZS5cbiAgICAgKiAhI3poIOmUmeivr+aooeW8j++8iOS7hSBXRUIg56uv5pyJ5pWI77yJ77yM5Zyo55S76Z2i5LiK6L6T5Ye6IGVycm9yIOS/oeaBr+OAglxuICAgICAqIEBwcm9wZXJ0eSBFUlJPUl9GT1JfV0VCX1BBR0VcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBFUlJPUl9GT1JfV0VCX1BBR0U6IDZcbn0pO1xuLyoqXG4gKiAhI2VuIEFuIG9iamVjdCB0byBib290IHRoZSBnYW1lLlxuICogISN6aCDljIXlkKvmuLjmiI/kuLvkvZPkv6Hmga/lubbotJ/otKPpqbHliqjmuLjmiI/nmoTmuLjmiI/lr7nosaHjgIJcbiAqIEBjbGFzcyBkZWJ1Z1xuICogQG1haW5cbiAqIEBzdGF0aWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBjYy5kZWJ1ZyA9IHtcbiAgICBEZWJ1Z01vZGU6IERlYnVnTW9kZSxcblxuICAgIF9yZXNldERlYnVnU2V0dGluZzogcmVzZXREZWJ1Z1NldHRpbmcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBlcnJvciBpZCBhbmQgcG9zc2libGUgcGFyYW1ldGVycy5cbiAgICAgKiAhI3poIOmAmui/hyBlcnJvciBpZCDlkozlv4XopoHnmoTlj4LmlbDmnaXojrflj5bplJnor6/kv6Hmga/jgIJcbiAgICAgKiBAbWV0aG9kIGdldEVycm9yXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGVycm9ySWRcbiAgICAgKiBAcGFyYW0ge2FueX0gW3BhcmFtXVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRFcnJvcjogZ2V0VHlwZWRGb3JtYXR0ZXIoJ0VSUk9SJyksXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciBvciBub3QgdG8gZGlzcGxheSB0aGUgRlBTIGluZm9ybWF0aW9ucy5cbiAgICAgKiAhI3poIOaYr+WQpuaYvuekuiBGUFMg5L+h5oGv44CCXG4gICAgICogQG1ldGhvZCBpc0Rpc3BsYXlTdGF0c1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNEaXNwbGF5U3RhdHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnByb2ZpbGVyID8gY2MucHJvZmlsZXIuaXNTaG93aW5nU3RhdHMoKSA6IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgd2hldGhlciBkaXNwbGF5IHRoZSBGUFMgb24gdGhlIGJvdHRvbS1sZWZ0IGNvcm5lci5cbiAgICAgKiAhI3poIOiuvue9ruaYr+WQpuWcqOW3puS4i+inkuaYvuekuiBGUFPjgIJcbiAgICAgKiBAbWV0aG9kIHNldERpc3BsYXlTdGF0c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzcGxheVN0YXRzXG4gICAgICovXG4gICAgc2V0RGlzcGxheVN0YXRzOiBmdW5jdGlvbiAoZGlzcGxheVN0YXRzKSB7XG4gICAgICAgIGlmIChjYy5wcm9maWxlciAmJiBjYy5nYW1lLnJlbmRlclR5cGUgIT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgICAgICBkaXNwbGF5U3RhdHMgPyBjYy5wcm9maWxlci5zaG93U3RhdHMoKSA6IGNjLnByb2ZpbGVyLmhpZGVTdGF0cygpO1xuICAgICAgICAgICAgY2MuZ2FtZS5jb25maWcuc2hvd0ZQUyA9ICEhZGlzcGxheVN0YXRzO1xuICAgICAgICB9XG4gICAgfSxcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9