
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/CCPath.js';
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
require('../platform/CCSys');

var EXTNAME_RE = /(\.[^\.\/\?\\]*)(\?.*)?$/;
var DIRNAME_RE = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/;
var NORMALIZE_RE = /[^\.\/]+\/\.\.\//;
/**
 * !#en The module provides utilities for working with file and directory paths
 * !#zh 用于处理文件与目录的路径的模块
 * @class path
 * @static
 */

cc.path =
/** @lends cc.path# */
{
  /**
   * !#en Join strings to be a path.
   * !#zh 拼接字符串为 Path
   * @method join
   * @example {@link cocos2d/core/utils/CCPath/join.js}
   * @returns {String}
   */
  join: function join() {
    var l = arguments.length;
    var result = "";

    for (var i = 0; i < l; i++) {
      result = (result + (result === "" ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
    }

    return result;
  },

  /**
   * !#en Get the ext name of a path including '.', like '.png'.
   * !#zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
   * @method extname
   * @example {@link cocos2d/core/utils/CCPath/extname.js}
   * @param {String} pathStr
   * @returns {*}
   */
  extname: function extname(pathStr) {
    var temp = EXTNAME_RE.exec(pathStr);
    return temp ? temp[1] : '';
  },

  /**
   * !#en Get the main name of a file name
   * !#zh 获取文件名的主名称
   * @method mainFileName
   * @param {String} fileName
   * @returns {String}
   * @deprecated
   */
  mainFileName: function mainFileName(fileName) {
    if (fileName) {
      var idx = fileName.lastIndexOf(".");
      if (idx !== -1) return fileName.substring(0, idx);
    }

    return fileName;
  },

  /**
   * !#en Get the file name of a file path.
   * !#zh 获取文件路径的文件名。
   * @method basename
   * @example {@link cocos2d/core/utils/CCPath/basename.js}
   * @param {String} pathStr
   * @param {String} [extname]
   * @returns {*}
   */
  basename: function basename(pathStr, extname) {
    var index = pathStr.indexOf("?");
    if (index > 0) pathStr = pathStr.substring(0, index);
    var reg = /(\/|\\)([^\/\\]+)$/g;
    var result = reg.exec(pathStr.replace(/(\/|\\)$/, ""));
    if (!result) return pathStr;
    var baseName = result[2];
    if (extname && pathStr.substring(pathStr.length - extname.length).toLowerCase() === extname.toLowerCase()) return baseName.substring(0, baseName.length - extname.length);
    return baseName;
  },

  /**
   * !#en Get dirname of a file path.
   * !#zh 获取文件路径的目录名。
   * @method dirname
   * @example {@link cocos2d/core/utils/CCPath/dirname.js}
   * @param {String} pathStr
   * @returns {*}
   */
  dirname: function dirname(pathStr) {
    var temp = DIRNAME_RE.exec(pathStr);
    return temp ? temp[2] : '';
  },

  /**
   * !#en Change extname of a file path.
   * !#zh 更改文件路径的扩展名。
   * @method changeExtname
   * @example {@link cocos2d/core/utils/CCPath/changeExtname.js}
   * @param {String} pathStr
   * @param {String} [extname]
   * @returns {String}
   */
  changeExtname: function changeExtname(pathStr, extname) {
    extname = extname || "";
    var index = pathStr.indexOf("?");
    var tempStr = "";

    if (index > 0) {
      tempStr = pathStr.substring(index);
      pathStr = pathStr.substring(0, index);
    }

    index = pathStr.lastIndexOf(".");
    if (index < 0) return pathStr + extname + tempStr;
    return pathStr.substring(0, index) + extname + tempStr;
  },

  /**
   * !#en Change file name of a file path.
   * !#zh 更改文件路径的文件名。
   * @example {@link cocos2d/core/utils/CCPath/changeBasename.js}
   * @param {String} pathStr
   * @param {String} basename
   * @param {Boolean} [isSameExt]
   * @returns {String}
   */
  changeBasename: function changeBasename(pathStr, basename, isSameExt) {
    if (basename.indexOf(".") === 0) return this.changeExtname(pathStr, basename);
    var index = pathStr.indexOf("?");
    var tempStr = "";
    var ext = isSameExt ? this.extname(pathStr) : "";

    if (index > 0) {
      tempStr = pathStr.substring(index);
      pathStr = pathStr.substring(0, index);
    }

    index = pathStr.lastIndexOf("/");
    index = index <= 0 ? 0 : index + 1;
    return pathStr.substring(0, index) + basename + ext + tempStr;
  },
  //todo make public after verification
  _normalize: function _normalize(url) {
    var oldUrl = url = String(url); //removing all ../

    do {
      oldUrl = url;
      url = url.replace(NORMALIZE_RE, "");
    } while (oldUrl.length !== url.length);

    return url;
  },
  // The platform-specific file separator. '\\' or '/'.
  sep: cc.sys.os === cc.sys.OS_WINDOWS ? '\\' : '/',
  // @param {string} path
  stripSep: function stripSep(path) {
    return path.replace(/[\/\\]$/, '');
  }
};
module.exports = cc.path;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxDQ1BhdGguanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkVYVE5BTUVfUkUiLCJESVJOQU1FX1JFIiwiTk9STUFMSVpFX1JFIiwiY2MiLCJwYXRoIiwiam9pbiIsImwiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyZXN1bHQiLCJpIiwicmVwbGFjZSIsImV4dG5hbWUiLCJwYXRoU3RyIiwidGVtcCIsImV4ZWMiLCJtYWluRmlsZU5hbWUiLCJmaWxlTmFtZSIsImlkeCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiYmFzZW5hbWUiLCJpbmRleCIsImluZGV4T2YiLCJyZWciLCJiYXNlTmFtZSIsInRvTG93ZXJDYXNlIiwiZGlybmFtZSIsImNoYW5nZUV4dG5hbWUiLCJ0ZW1wU3RyIiwiY2hhbmdlQmFzZW5hbWUiLCJpc1NhbWVFeHQiLCJleHQiLCJfbm9ybWFsaXplIiwidXJsIiwib2xkVXJsIiwiU3RyaW5nIiwic2VwIiwic3lzIiwib3MiLCJPU19XSU5ET1dTIiwic3RyaXBTZXAiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBRUEsSUFBSUMsVUFBVSxHQUFHLDBCQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxnQ0FBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsa0JBQW5CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBQyxFQUFFLENBQUNDLElBQUg7QUFBVTtBQUFzQjtBQUM1QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVB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QUNPLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLEVBQXhCLENBQVA7QUFDSDtBQTlJMkIsQ0FBaEM7QUFpSkErQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ4QyxFQUFFLENBQUNDLElBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxucmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NTeXMnKTtcclxuXHJcbnZhciBFWFROQU1FX1JFID0gLyhcXC5bXlxcLlxcL1xcP1xcXFxdKikoXFw/LiopPyQvO1xyXG52YXIgRElSTkFNRV9SRSA9IC8oKC4qKShcXC98XFxcXHxcXFxcXFxcXCkpPyguKj9cXC4uKiQpPy87XHJcbnZhciBOT1JNQUxJWkVfUkUgPSAvW15cXC5cXC9dK1xcL1xcLlxcLlxcLy87XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgbW9kdWxlIHByb3ZpZGVzIHV0aWxpdGllcyBmb3Igd29ya2luZyB3aXRoIGZpbGUgYW5kIGRpcmVjdG9yeSBwYXRoc1xyXG4gKiAhI3poIOeUqOS6juWkhOeQhuaWh+S7tuS4juebruW9leeahOi3r+W+hOeahOaooeWdl1xyXG4gKiBAY2xhc3MgcGF0aFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5jYy5wYXRoID0gLyoqIEBsZW5kcyBjYy5wYXRoIyAqL3tcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBKb2luIHN0cmluZ3MgdG8gYmUgYSBwYXRoLlxyXG4gICAgICogISN6aCDmi7zmjqXlrZfnrKbkuLLkuLogUGF0aFxyXG4gICAgICogQG1ldGhvZCBqb2luXHJcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3V0aWxzL0NDUGF0aC9qb2luLmpzfVxyXG4gICAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgam9pbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0ICsgKHJlc3VsdCA9PT0gXCJcIiA/IFwiXCIgOiBcIi9cIikgKyBhcmd1bWVudHNbaV0pLnJlcGxhY2UoLyhcXC98XFxcXFxcXFwpJC8sIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IHRoZSBleHQgbmFtZSBvZiBhIHBhdGggaW5jbHVkaW5nICcuJywgbGlrZSAnLnBuZycuXHJcbiAgICAgKiAhI3poIOi/lOWbniBQYXRoIOeahOaJqeWxleWQje+8jOWMheaLrCAnLifvvIzkvovlpoIgJy5wbmcn44CCXHJcbiAgICAgKiBAbWV0aG9kIGV4dG5hbWVcclxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2V4dG5hbWUuanN9XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFN0clxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGV4dG5hbWU6IGZ1bmN0aW9uIChwYXRoU3RyKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBFWFROQU1FX1JFLmV4ZWMocGF0aFN0cik7XHJcbiAgICAgICAgcmV0dXJuIHRlbXAgPyB0ZW1wWzFdIDogJyc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgdGhlIG1haW4gbmFtZSBvZiBhIGZpbGUgbmFtZVxyXG4gICAgICogISN6aCDojrflj5bmlofku7blkI3nmoTkuLvlkI3np7BcclxuICAgICAqIEBtZXRob2QgbWFpbkZpbGVOYW1lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWVcclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICovXHJcbiAgICBtYWluRmlsZU5hbWU6IGZ1bmN0aW9uIChmaWxlTmFtZSkge1xyXG4gICAgICAgIGlmIChmaWxlTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gZmlsZU5hbWUubGFzdEluZGV4T2YoXCIuXCIpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ICE9PSAtMSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlTmFtZS5zdWJzdHJpbmcoMCwgaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbGVOYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IHRoZSBmaWxlIG5hbWUgb2YgYSBmaWxlIHBhdGguXHJcbiAgICAgKiAhI3poIOiOt+WPluaWh+S7tui3r+W+hOeahOaWh+S7tuWQjeOAglxyXG4gICAgICogQG1ldGhvZCBiYXNlbmFtZVxyXG4gICAgICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS91dGlscy9DQ1BhdGgvYmFzZW5hbWUuanN9XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFN0clxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtleHRuYW1lXVxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGJhc2VuYW1lOiBmdW5jdGlvbiAocGF0aFN0ciwgZXh0bmFtZSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhdGhTdHIuaW5kZXhPZihcIj9cIik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkgcGF0aFN0ciA9IHBhdGhTdHIuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuICAgICAgICB2YXIgcmVnID0gLyhcXC98XFxcXCkoW15cXC9cXFxcXSspJC9nO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSByZWcuZXhlYyhwYXRoU3RyLnJlcGxhY2UoLyhcXC98XFxcXCkkLywgXCJcIikpO1xyXG4gICAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gcGF0aFN0cjtcclxuICAgICAgICB2YXIgYmFzZU5hbWUgPSByZXN1bHRbMl07XHJcbiAgICAgICAgaWYgKGV4dG5hbWUgJiYgcGF0aFN0ci5zdWJzdHJpbmcocGF0aFN0ci5sZW5ndGggLSBleHRuYW1lLmxlbmd0aCkudG9Mb3dlckNhc2UoKSA9PT0gZXh0bmFtZS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gYmFzZU5hbWUuc3Vic3RyaW5nKDAsIGJhc2VOYW1lLmxlbmd0aCAtIGV4dG5hbWUubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gYmFzZU5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgZGlybmFtZSBvZiBhIGZpbGUgcGF0aC5cclxuICAgICAqICEjemgg6I635Y+W5paH5Lu26Lev5b6E55qE55uu5b2V5ZCN44CCXHJcbiAgICAgKiBAbWV0aG9kIGRpcm5hbWVcclxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2Rpcm5hbWUuanN9XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFN0clxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIGRpcm5hbWU6IGZ1bmN0aW9uIChwYXRoU3RyKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBESVJOQU1FX1JFLmV4ZWMocGF0aFN0cik7XHJcbiAgICAgICAgcmV0dXJuIHRlbXAgPyB0ZW1wWzJdIDogJyc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGFuZ2UgZXh0bmFtZSBvZiBhIGZpbGUgcGF0aC5cclxuICAgICAqICEjemgg5pu05pS55paH5Lu26Lev5b6E55qE5omp5bGV5ZCN44CCXHJcbiAgICAgKiBAbWV0aG9kIGNoYW5nZUV4dG5hbWVcclxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2NoYW5nZUV4dG5hbWUuanN9XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFN0clxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtleHRuYW1lXVxyXG4gICAgICogQHJldHVybnMge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgY2hhbmdlRXh0bmFtZTogZnVuY3Rpb24gKHBhdGhTdHIsIGV4dG5hbWUpIHtcclxuICAgICAgICBleHRuYW1lID0gZXh0bmFtZSB8fCBcIlwiO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhdGhTdHIuaW5kZXhPZihcIj9cIik7XHJcbiAgICAgICAgdmFyIHRlbXBTdHIgPSBcIlwiO1xyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgdGVtcFN0ciA9IHBhdGhTdHIuc3Vic3RyaW5nKGluZGV4KTtcclxuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhTdHIuc3Vic3RyaW5nKDAsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXggPSBwYXRoU3RyLmxhc3RJbmRleE9mKFwiLlwiKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm4gcGF0aFN0ciArIGV4dG5hbWUgKyB0ZW1wU3RyO1xyXG4gICAgICAgIHJldHVybiBwYXRoU3RyLnN1YnN0cmluZygwLCBpbmRleCkgKyBleHRuYW1lICsgdGVtcFN0cjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hhbmdlIGZpbGUgbmFtZSBvZiBhIGZpbGUgcGF0aC5cclxuICAgICAqICEjemgg5pu05pS55paH5Lu26Lev5b6E55qE5paH5Lu25ZCN44CCXHJcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3V0aWxzL0NDUGF0aC9jaGFuZ2VCYXNlbmFtZS5qc31cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoU3RyXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYmFzZW5hbWVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzU2FtZUV4dF1cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGNoYW5nZUJhc2VuYW1lOiBmdW5jdGlvbiAocGF0aFN0ciwgYmFzZW5hbWUsIGlzU2FtZUV4dCkge1xyXG4gICAgICAgIGlmIChiYXNlbmFtZS5pbmRleE9mKFwiLlwiKSA9PT0gMCkgcmV0dXJuIHRoaXMuY2hhbmdlRXh0bmFtZShwYXRoU3RyLCBiYXNlbmFtZSk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcGF0aFN0ci5pbmRleE9mKFwiP1wiKTtcclxuICAgICAgICB2YXIgdGVtcFN0ciA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGV4dCA9IGlzU2FtZUV4dCA/IHRoaXMuZXh0bmFtZShwYXRoU3RyKSA6IFwiXCI7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICB0ZW1wU3RyID0gcGF0aFN0ci5zdWJzdHJpbmcoaW5kZXgpO1xyXG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmRleCA9IHBhdGhTdHIubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXggPD0gMCA/IDAgOiBpbmRleCArIDE7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhTdHIuc3Vic3RyaW5nKDAsIGluZGV4KSArIGJhc2VuYW1lICsgZXh0ICsgdGVtcFN0cjtcclxuICAgIH0sXHJcbiAgICAvL3RvZG8gbWFrZSBwdWJsaWMgYWZ0ZXIgdmVyaWZpY2F0aW9uXHJcbiAgICBfbm9ybWFsaXplOiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgdmFyIG9sZFVybCA9IHVybCA9IFN0cmluZyh1cmwpO1xyXG5cclxuICAgICAgICAvL3JlbW92aW5nIGFsbCAuLi9cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG9sZFVybCA9IHVybDtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoTk9STUFMSVpFX1JFLCBcIlwiKTtcclxuICAgICAgICB9IHdoaWxlIChvbGRVcmwubGVuZ3RoICE9PSB1cmwubGVuZ3RoKTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBUaGUgcGxhdGZvcm0tc3BlY2lmaWMgZmlsZSBzZXBhcmF0b3IuICdcXFxcJyBvciAnLycuXHJcbiAgICBzZXA6IChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19XSU5ET1dTID8gJ1xcXFwnIDogJy8nKSxcclxuXHJcbiAgICAvLyBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAgc3RyaXBTZXAgKHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9bXFwvXFxcXF0kLywgJycpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5wYXRoOyJdLCJzb3VyY2VSb290IjoiLyJ9