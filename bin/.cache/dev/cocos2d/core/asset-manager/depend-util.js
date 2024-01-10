
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/depend-util.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = _interopRequireWildcard(require("../platform/deserialize-compiled"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var Cache = require('./cache');

var deserialize = require('./deserialize');

var _require = require('./shared'),
    files = _require.files,
    parsed = _require.parsed;

/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Control asset's dependency list, it is a singleton. All member can be accessed with `cc.assetManager.dependUtil`
 * 
 * !#zh
 * 控制资源的依赖列表，这是一个单例, 所有成员能通过 `cc.assetManager.dependUtil` 访问
 * 
 * @class DependUtil
 */
var dependUtil = {
  _depends: new Cache(),
  init: function init() {
    this._depends.clear();
  },

  /**
   * !#en
   * Get asset's native dependency. For example, Texture's native dependency is image.
   * 
   * !#zh
   * 获取资源的原生依赖，例如 Texture 的原生依赖是图片
   * 
   * @method getNativeDep
   * @param {string} uuid - asset's uuid
   * @returns {Object} native dependency
   * 
   * @example
   * var dep = dependUtil.getNativeDep('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getNativeDep(uuid: string): Record<string, any>
   */
  getNativeDep: function getNativeDep(uuid) {
    var depend = this._depends.get(uuid);

    if (depend) return depend.nativeDep && Object.assign({}, depend.nativeDep);
    return null;
  },

  /**
   * !#en
   * Get asset's direct referencing non-native dependency list. For example, Material's non-native dependencies are Texture.
   * 
   * !#zh
   * 获取资源直接引用的非原生依赖列表，例如，材质的非原生依赖是 Texture
   * 
   * @method getDeps
   * @param {string} uuid - asset's uuid
   * @returns {string[]} direct referencing non-native dependency list
   * 
   * @example
   * var deps = dependUtil.getDeps('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getDeps(uuid: string): string[]
   */
  getDeps: function getDeps(uuid) {
    if (this._depends.has(uuid)) {
      return this._depends.get(uuid).deps;
    }

    return [];
  },

  /**
   * !#en
   * Get non-native dependency list of the loaded asset, include indirect reference.
   * The returned array stores the dependencies with their uuid, after retrieve dependencies,
   * 
   * !#zh
   * 获取某个已经加载好的资源的所有非原生依赖资源列表，包括间接引用的资源，并保存在数组中返回。
   * 返回的数组将仅保存依赖资源的 uuid。
   *
   * @method getDependsRecursively
   * @param {String} uuid - The asset's uuid
   * @returns {string[]} non-native dependency list
   * 
   * @example
   * var deps = dependUtil.getDepsRecursively('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getDepsRecursively(uuid: string): string[]
   */
  getDepsRecursively: function getDepsRecursively(uuid) {
    var exclude = Object.create(null),
        depends = [];

    this._descend(uuid, exclude, depends);

    return depends;
  },
  _descend: function _descend(uuid, exclude, depends) {
    var deps = this.getDeps(uuid);

    for (var i = 0; i < deps.length; i++) {
      var depend = deps[i];

      if (!exclude[depend]) {
        exclude[depend] = true;
        depends.push(depend);

        this._descend(depend, exclude, depends);
      }
    }
  },
  remove: function remove(uuid) {
    this._depends.remove(uuid);
  },

  /**
   * !#en
   * Extract dependency list from serialized data or asset and then store in cache.
   * 
   * !#zh
   * 从序列化数据或资源中提取出依赖列表，并且存储在缓存中。
   * 
   * @param {string} uuid - The uuid of serialized data or asset
   * @param {Object} json - Serialized data or asset
   * @returns {Object} dependency list, include non-native and native dependency
   * 
   * @example
   * downloader.downloadFile('test.json', {responseType: 'json'}, null, (err, file) => {
   *     var dependencies = parse('fcmR3XADNLgJ1ByKhqcC5Z', file);
   * });
   * 
   * @typescript
   * parse(uuid: string, json: any): { deps?: string[], nativeDep?: any }
   */
  parse: function parse(uuid, json) {
    var out = null;

    if (Array.isArray(json) || json.__type__) {
      if (out = this._depends.get(uuid)) return out;

      if (Array.isArray(json) && (!(CC_BUILD || _deserializeCompiled["default"].isCompiledJson(json)) || !(0, _deserializeCompiled.hasNativeDep)(json))) {
        out = {
          deps: this._parseDepsFromJson(json)
        };
      } else {
        try {
          var asset = deserialize(json);
          out = this._parseDepsFromAsset(asset);
          out.nativeDep && (out.nativeDep.uuid = uuid);
          parsed.add(uuid + '@import', asset);
        } catch (e) {
          files.remove(uuid + '@import');
          out = {
            deps: []
          };
        }
      }
    } // get deps from an existing asset 
    else {
        if (!CC_EDITOR && (out = this._depends.get(uuid)) && out.parsedFromExistAsset) return out;
        out = this._parseDepsFromAsset(json);
      } // cache dependency list


    this._depends.add(uuid, out);

    return out;
  },
  _parseDepsFromAsset: function _parseDepsFromAsset(asset) {
    var out = {
      deps: [],
      parsedFromExistAsset: true,
      preventPreloadNativeObject: asset.constructor.preventPreloadNativeObject,
      preventDeferredLoadDependents: asset.constructor.preventDeferredLoadDependents
    };
    var deps = asset.__depends__;

    for (var i = 0, l = deps.length; i < l; i++) {
      var dep = deps[i].uuid;
      out.deps.push(dep);
    }

    if (asset.__nativeDepend__) {
      out.nativeDep = asset._nativeDep;
    }

    return out;
  },
  _parseDepsFromJson: CC_EDITOR || CC_PREVIEW ? function (json) {
    if (_deserializeCompiled["default"].isCompiledJson(json)) {
      var _depends = (0, _deserializeCompiled.getDependUuidList)(json);

      _depends.forEach(function (uuid, index) {
        return _depends[index] = cc.assetManager.utils.decodeUuid(uuid);
      });

      return _depends;
    }

    var depends = [];

    function parseDependRecursively(data, out) {
      if (!data || typeof data !== 'object' || data.__id__) return;
      var uuid = data.__uuid__;

      if (Array.isArray(data)) {
        for (var i = 0, l = data.length; i < l; i++) {
          parseDependRecursively(data[i], out);
        }
      } else if (uuid) {
        out.push(cc.assetManager.utils.decodeUuid(uuid));
      } else {
        for (var prop in data) {
          parseDependRecursively(data[prop], out);
        }
      }
    }

    parseDependRecursively(json, depends);
    return depends;
  } : function (json) {
    var depends = (0, _deserializeCompiled.getDependUuidList)(json);
    depends.forEach(function (uuid, index) {
      return depends[index] = cc.assetManager.utils.decodeUuid(uuid);
    });
    return depends;
  }
};
module.exports = dependUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRlcGVuZC11dGlsLmpzIl0sIm5hbWVzIjpbIkNhY2hlIiwicmVxdWlyZSIsImRlc2VyaWFsaXplIiwiZmlsZXMiLCJwYXJzZWQiLCJkZXBlbmRVdGlsIiwiX2RlcGVuZHMiLCJpbml0IiwiY2xlYXIiLCJnZXROYXRpdmVEZXAiLCJ1dWlkIiwiZGVwZW5kIiwiZ2V0IiwibmF0aXZlRGVwIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0RGVwcyIsImhhcyIsImRlcHMiLCJnZXREZXBzUmVjdXJzaXZlbHkiLCJleGNsdWRlIiwiY3JlYXRlIiwiZGVwZW5kcyIsIl9kZXNjZW5kIiwiaSIsImxlbmd0aCIsInB1c2giLCJyZW1vdmUiLCJwYXJzZSIsImpzb24iLCJvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJfX3R5cGVfXyIsIkNDX0JVSUxEIiwiZGVzZXJpYWxpemVGb3JDb21waWxlZCIsImlzQ29tcGlsZWRKc29uIiwiX3BhcnNlRGVwc0Zyb21Kc29uIiwiYXNzZXQiLCJfcGFyc2VEZXBzRnJvbUFzc2V0IiwiYWRkIiwiZSIsIkNDX0VESVRPUiIsInBhcnNlZEZyb21FeGlzdEFzc2V0IiwicHJldmVudFByZWxvYWROYXRpdmVPYmplY3QiLCJjb25zdHJ1Y3RvciIsInByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzIiwiX19kZXBlbmRzX18iLCJsIiwiZGVwIiwiX19uYXRpdmVEZXBlbmRfXyIsIl9uYXRpdmVEZXAiLCJDQ19QUkVWSUVXIiwiZm9yRWFjaCIsImluZGV4IiwiY2MiLCJhc3NldE1hbmFnZXIiLCJ1dGlscyIsImRlY29kZVV1aWQiLCJwYXJzZURlcGVuZFJlY3Vyc2l2ZWx5IiwiZGF0YSIsIl9faWRfXyIsIl9fdXVpZF9fIiwicHJvcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEyQkE7Ozs7OztBQTNCQTtBQUNBO0FBQ0E7QUFDQTtB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QSxzQkFBc0IsQ0FBQ0MsSUFBSSxDQUFDcEMsQ0FBRCxDQUFMLEVBQVVNLEdBQVYsQ0FBdEI7QUFDSDtBQUNKLE9BSkQsTUFLSyxJQUFJcEIsSUFBSixFQUFVO0FBQ1hvQixRQUFBQSxHQUFHLENBQUNKLElBQUosQ0FBUzZCLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQkMsS0FBaEIsQ0FBc0JDLFVBQXRCLENBQWlDaEQsSUFBakMsQ0FBVDtBQUNILE9BRkksTUFHQTtBQUNELGFBQUssSUFBSXFELElBQVQsSUFBaUJILElBQWpCLEVBQXVCO0FBQ25CRCxVQUFBQSxzQkFBc0IsQ0FBQ0MsSUFBSSxDQUFDRyxJQUFELENBQUwsRUFBYWpDLEdBQWIsQ0FBdEI7QUFDSDtBQUNKO0FBQ0o7O0FBQ0Q2QixJQUFBQSxzQkFBc0IsQ0FBQzlCLElBQUQsRUFBT1AsT0FBUCxDQUF0QjtBQUNBLFdBQU9BLE9BQVA7QUFDSCxHQTVCbUIsR0E0QmhCLFVBQVVPLElBQVYsRUFBZ0I7QUFDaEIsUUFBSVAsT0FBTyxHQUFHLDRDQUFrQk8sSUFBbEIsQ0FBZDtBQUNBUCxJQUFBQSxPQUFPLENBQUMrQixPQUFSLENBQWdCLFVBQUMzQyxJQUFELEVBQU80QyxLQUFQO0FBQUEsYUFBaUJoQyxPQUFPLENBQUNnQyxLQUFELENBQVAsR0FBaUJDLEVBQUUsQ0FBQ0MsWUFBSCxDQUFnQkMsS0FBaEIsQ0FBc0JDLFVBQXRCLENBQWlDaEQsSUFBakMsQ0FBbEM7QUFBQSxLQUFoQjtBQUNBLFdBQU9ZLE9BQVA7QUFDSDtBQXhNWSxDQUFqQjtBQTJNQTBDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVELFVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XHJcbmNvbnN0IGRlc2VyaWFsaXplID0gcmVxdWlyZSgnLi9kZXNlcmlhbGl6ZScpO1xyXG5jb25zdCB7IGZpbGVzLCBwYXJzZWQgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XHJcbmltcG9ydCB7IGhhc05hdGl2ZURlcCAsIGdldERlcGVuZFV1aWRMaXN0IH0gZnJvbSAnLi4vcGxhdGZvcm0vZGVzZXJpYWxpemUtY29tcGlsZWQnO1xyXG5pbXBvcnQgZGVzZXJpYWxpemVGb3JDb21waWxlZCBmcm9tICcuLi9wbGF0Zm9ybS9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENvbnRyb2wgYXNzZXQncyBkZXBlbmRlbmN5IGxpc3QsIGl0IGlzIGEgc2luZ2xldG9uLiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIuZGVwZW5kVXRpbGBcclxuICogXHJcbiAqICEjemhcclxuICog5o6n5Yi26LWE5rqQ55qE5L6d6LWW5YiX6KGo77yM6L+Z5piv5LiA5Liq5Y2V5L6LLCDmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWdlci5kZXBlbmRVdGlsYCDorr/pl65cclxuICogXHJcbiAqIEBjbGFzcyBEZXBlbmRVdGlsXHJcbiAqL1xyXG52YXIgZGVwZW5kVXRpbCA9IHtcclxuICAgIF9kZXBlbmRzOiBuZXcgQ2FjaGUoKSxcclxuXHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB0aGlzLl9kZXBlbmRzLmNsZWFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGFzc2V0J3MgbmF0aXZlIGRlcGVuZGVuY3kuIEZvciBleGFtcGxlLCBUZXh0dXJlJ3MgbmF0aXZlIGRlcGVuZGVuY3kgaXMgaW1hZ2UuXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPlui1hOa6kOeahOWOn+eUn+S+nei1lu+8jOS+i+WmgiBUZXh0dXJlIOeahOWOn+eUn+S+nei1luaYr+WbvueJh1xyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGdldE5hdGl2ZURlcFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBhc3NldCdzIHV1aWRcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG5hdGl2ZSBkZXBlbmRlbmN5XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgZGVwID0gZGVwZW5kVXRpbC5nZXROYXRpdmVEZXAoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldE5hdGl2ZURlcCh1dWlkOiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBhbnk+XHJcbiAgICAgKi9cclxuICAgIGdldE5hdGl2ZURlcCAodXVpZCkge1xyXG4gICAgICAgIGxldCBkZXBlbmQgPSB0aGlzLl9kZXBlbmRzLmdldCh1dWlkKTtcclxuICAgICAgICBpZiAoZGVwZW5kKSByZXR1cm4gZGVwZW5kLm5hdGl2ZURlcCAmJiBPYmplY3QuYXNzaWduKHt9LCBkZXBlbmQubmF0aXZlRGVwKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgYXNzZXQncyBkaXJlY3QgcmVmZXJlbmNpbmcgbm9uLW5hdGl2ZSBkZXBlbmRlbmN5IGxpc3QuIEZvciBleGFtcGxlLCBNYXRlcmlhbCdzIG5vbi1uYXRpdmUgZGVwZW5kZW5jaWVzIGFyZSBUZXh0dXJlLlxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5botYTmupDnm7TmjqXlvJXnlKjnmoTpnZ7ljp/nlJ/kvp3otZbliJfooajvvIzkvovlpoLvvIzmnZDotKjnmoTpnZ7ljp/nlJ/kvp3otZbmmK8gVGV4dHVyZVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGdldERlcHNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1dWlkIC0gYXNzZXQncyB1dWlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IGRpcmVjdCByZWZlcmVuY2luZyBub24tbmF0aXZlIGRlcGVuZGVuY3kgbGlzdFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGRlcHMgPSBkZXBlbmRVdGlsLmdldERlcHMoJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldERlcHModXVpZDogc3RyaW5nKTogc3RyaW5nW11cclxuICAgICAqL1xyXG4gICAgZ2V0RGVwcyAodXVpZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kZXBlbmRzLmhhcyh1dWlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVwZW5kcy5nZXQodXVpZCkuZGVwcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgbm9uLW5hdGl2ZSBkZXBlbmRlbmN5IGxpc3Qgb2YgdGhlIGxvYWRlZCBhc3NldCwgaW5jbHVkZSBpbmRpcmVjdCByZWZlcmVuY2UuXHJcbiAgICAgKiBUaGUgcmV0dXJuZWQgYXJyYXkgc3RvcmVzIHRoZSBkZXBlbmRlbmNpZXMgd2l0aCB0aGVpciB1dWlkLCBhZnRlciByZXRyaWV2ZSBkZXBlbmRlbmNpZXMsXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluafkOS4quW3sue7j+WKoOi9veWlveeahOi1hOa6kOeahOaJgOaciemdnuWOn+eUn+S+nei1lui1hOa6kOWIl+ihqO+8jOWMheaLrOmXtOaOpeW8leeUqOeahOi1hOa6kO+8jOW5tuS/neWtmOWcqOaVsOe7hOS4rei/lOWbnuOAglxyXG4gICAgICog6L+U5Zue55qE5pWw57uE5bCG5LuF5L+d5a2Y5L6d6LWW6LWE5rqQ55qEIHV1aWTjgIJcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldERlcGVuZHNSZWN1cnNpdmVseVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWQgLSBUaGUgYXNzZXQncyB1dWlkXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119IG5vbi1uYXRpdmUgZGVwZW5kZW5jeSBsaXN0XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgZGVwcyA9IGRlcGVuZFV0aWwuZ2V0RGVwc1JlY3Vyc2l2ZWx5KCdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJyk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBnZXREZXBzUmVjdXJzaXZlbHkodXVpZDogc3RyaW5nKTogc3RyaW5nW11cclxuICAgICAqL1xyXG4gICAgZ2V0RGVwc1JlY3Vyc2l2ZWx5ICh1dWlkKSB7XHJcbiAgICAgICAgdmFyIGV4Y2x1ZGUgPSBPYmplY3QuY3JlYXRlKG51bGwpLCBkZXBlbmRzID0gW107XHJcbiAgICAgICAgdGhpcy5fZGVzY2VuZCh1dWlkLCBleGNsdWRlLCBkZXBlbmRzKTtcclxuICAgICAgICByZXR1cm4gZGVwZW5kcztcclxuICAgIH0sXHJcblxyXG4gICAgX2Rlc2NlbmQgKHV1aWQsIGV4Y2x1ZGUsIGRlcGVuZHMpIHtcclxuICAgICAgICB2YXIgZGVwcyA9IHRoaXMuZ2V0RGVwcyh1dWlkKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRlcGVuZCA9IGRlcHNbaV07XHJcbiAgICAgICAgICAgIGlmICggIWV4Y2x1ZGVbZGVwZW5kXSApIHtcclxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVbZGVwZW5kXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZXBlbmRzLnB1c2goZGVwZW5kKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2NlbmQoZGVwZW5kLCBleGNsdWRlLCBkZXBlbmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlICh1dWlkKSB7XHJcbiAgICAgICAgdGhpcy5fZGVwZW5kcy5yZW1vdmUodXVpZCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEV4dHJhY3QgZGVwZW5kZW5jeSBsaXN0IGZyb20gc2VyaWFsaXplZCBkYXRhIG9yIGFzc2V0IGFuZCB0aGVuIHN0b3JlIGluIGNhY2hlLlxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDku47luo/liJfljJbmlbDmja7miJbotYTmupDkuK3mj5Dlj5blh7rkvp3otZbliJfooajvvIzlubbkuJTlrZjlgqjlnKjnvJPlrZjkuK3jgIJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCBvZiBzZXJpYWxpemVkIGRhdGEgb3IgYXNzZXRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIC0gU2VyaWFsaXplZCBkYXRhIG9yIGFzc2V0XHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBkZXBlbmRlbmN5IGxpc3QsIGluY2x1ZGUgbm9uLW5hdGl2ZSBhbmQgbmF0aXZlIGRlcGVuZGVuY3lcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCd0ZXN0Lmpzb24nLCB7cmVzcG9uc2VUeXBlOiAnanNvbid9LCBudWxsLCAoZXJyLCBmaWxlKSA9PiB7XHJcbiAgICAgKiAgICAgdmFyIGRlcGVuZGVuY2llcyA9IHBhcnNlKCdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJywgZmlsZSk7XHJcbiAgICAgKiB9KTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHBhcnNlKHV1aWQ6IHN0cmluZywganNvbjogYW55KTogeyBkZXBzPzogc3RyaW5nW10sIG5hdGl2ZURlcD86IGFueSB9XHJcbiAgICAgKi9cclxuICAgIHBhcnNlICh1dWlkLCBqc29uKSB7XHJcbiAgICAgICAgdmFyIG91dCA9IG51bGw7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikgfHwganNvbi5fX3R5cGVfXykge1xyXG5cclxuICAgICAgICAgICAgaWYgKG91dCA9IHRoaXMuX2RlcGVuZHMuZ2V0KHV1aWQpKSByZXR1cm4gb3V0O1xyXG5cclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoanNvbikgJiYgKCEoQ0NfQlVJTEQgfHwgZGVzZXJpYWxpemVGb3JDb21waWxlZC5pc0NvbXBpbGVkSnNvbihqc29uKSkgfHwgIWhhc05hdGl2ZURlcChqc29uKSkpIHtcclxuICAgICAgICAgICAgICAgIG91dCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBkZXBzOiB0aGlzLl9wYXJzZURlcHNGcm9tSnNvbihqc29uKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhc3NldCA9IGRlc2VyaWFsaXplKGpzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIG91dCA9IHRoaXMuX3BhcnNlRGVwc0Zyb21Bc3NldChhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0Lm5hdGl2ZURlcCAmJiAob3V0Lm5hdGl2ZURlcC51dWlkID0gdXVpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmFkZCh1dWlkICsgJ0BpbXBvcnQnLCBhc3NldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzLnJlbW92ZSh1dWlkICsgJ0BpbXBvcnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBvdXQgPSB7IGRlcHM6IFtdIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2V0IGRlcHMgZnJvbSBhbiBleGlzdGluZyBhc3NldCBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IgJiYgKG91dCA9IHRoaXMuX2RlcGVuZHMuZ2V0KHV1aWQpKSAmJiBvdXQucGFyc2VkRnJvbUV4aXN0QXNzZXQpIHJldHVybiBvdXQ7XHJcbiAgICAgICAgICAgIG91dCA9IHRoaXMuX3BhcnNlRGVwc0Zyb21Bc3NldChqc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2FjaGUgZGVwZW5kZW5jeSBsaXN0XHJcbiAgICAgICAgdGhpcy5fZGVwZW5kcy5hZGQodXVpZCwgb3V0KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfcGFyc2VEZXBzRnJvbUFzc2V0OiBmdW5jdGlvbiAoYXNzZXQpIHtcclxuICAgICAgICB2YXIgb3V0ID0ge1xyXG4gICAgICAgICAgICBkZXBzOiBbXSxcclxuICAgICAgICAgICAgcGFyc2VkRnJvbUV4aXN0QXNzZXQ6IHRydWUsXHJcbiAgICAgICAgICAgIHByZXZlbnRQcmVsb2FkTmF0aXZlT2JqZWN0OiBhc3NldC5jb25zdHJ1Y3Rvci5wcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdCxcclxuICAgICAgICAgICAgcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHM6IGFzc2V0LmNvbnN0cnVjdG9yLnByZXZlbnREZWZlcnJlZExvYWREZXBlbmRlbnRzXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGVwcyA9IGFzc2V0Ll9fZGVwZW5kc19fO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGVwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGRlcCA9IGRlcHNbaV0udXVpZDtcclxuICAgICAgICAgICAgb3V0LmRlcHMucHVzaChkZXApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmIChhc3NldC5fX25hdGl2ZURlcGVuZF9fKSB7XHJcbiAgICAgICAgICAgIG91dC5uYXRpdmVEZXAgPSBhc3NldC5fbmF0aXZlRGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgX3BhcnNlRGVwc0Zyb21Kc29uOiBDQ19FRElUT1IgfHwgQ0NfUFJFVklFVyA/IGZ1bmN0aW9uIChqc29uKSB7XHJcblxyXG4gICAgICAgIGlmIChkZXNlcmlhbGl6ZUZvckNvbXBpbGVkLmlzQ29tcGlsZWRKc29uKGpzb24pKSB7XHJcbiAgICAgICAgICAgIGxldCBkZXBlbmRzID0gZ2V0RGVwZW5kVXVpZExpc3QoanNvbik7XHJcbiAgICAgICAgICAgIGRlcGVuZHMuZm9yRWFjaCgodXVpZCwgaW5kZXgpID0+IGRlcGVuZHNbaW5kZXhdID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmRlY29kZVV1aWQodXVpZCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVwZW5kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciBkZXBlbmRzID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VEZXBlbmRSZWN1cnNpdmVseSAoZGF0YSwgb3V0KSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgfHwgZGF0YS5fX2lkX18pIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSBkYXRhLl9fdXVpZF9fO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkoZGF0YVtpXSwgb3V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1dWlkKSB7IFxyXG4gICAgICAgICAgICAgICAgb3V0LnB1c2goY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmRlY29kZVV1aWQodXVpZCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VEZXBlbmRSZWN1cnNpdmVseShkYXRhW3Byb3BdLCBvdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcnNlRGVwZW5kUmVjdXJzaXZlbHkoanNvbiwgZGVwZW5kcyk7XHJcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XHJcbiAgICB9IDogZnVuY3Rpb24gKGpzb24pIHtcclxuICAgICAgICBsZXQgZGVwZW5kcyA9IGdldERlcGVuZFV1aWRMaXN0KGpzb24pO1xyXG4gICAgICAgIGRlcGVuZHMuZm9yRWFjaCgodXVpZCwgaW5kZXgpID0+IGRlcGVuZHNbaW5kZXhdID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmRlY29kZVV1aWQodXVpZCkpO1xyXG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkZXBlbmRVdGlsOyJdLCJzb3VyY2VSb290IjoiLyJ9