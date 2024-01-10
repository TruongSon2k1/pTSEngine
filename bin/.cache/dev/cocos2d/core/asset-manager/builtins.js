
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/builtins.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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

var releaseManager = require('./releaseManager');

var _require = require('./shared'),
    BuiltinBundleName = _require.BuiltinBundleName;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * This module contains the builtin asset, it's a singleton, all member can be accessed with `cc.assetManager.builtins` 
 * 
 * !#zh
 * 此模块包含内建资源，这是一个单例，所有成员能通过 `cc.assetManager.builtins` 访问
 * 
 * @class Builtins
 */


var builtins = {
  _assets: new Cache({
    material: new Cache(),
    effect: new Cache()
  }),
  // builtin assets
  _loadBuiltins: function _loadBuiltins(name, cb) {
    var dirname = name + 's';

    var builtin = this._assets.get(name);

    return cc.assetManager.internal.loadDir(dirname, null, null, function (err, assets) {
      if (err) {
        cc.error(err.message, err.stack);
      } else {
        for (var i = 0; i < assets.length; i++) {
          var asset = assets[i];
          builtin.add(asset.name, asset.addRef());
        }
      }

      cb();
    });
  },

  /**
   * !#en
   * Initialize
   * 
   * !#zh
   * 初始化 
   * 
   * @method init
   * @param {Function} cb - Callback when finish loading built-in assets
   * 
   * @typescript
   * init (cb: () => void): void
   */
  init: function init(cb) {
    var _this = this;

    this.clear();

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS || !cc.assetManager.bundles.has(BuiltinBundleName.INTERNAL)) {
      return cb && cb();
    }

    this._loadBuiltins('effect', function () {
      _this._loadBuiltins('material', cb);
    });
  },

  /**
   * !#en
   * Get the built-in asset using specific type and name.
   * 
   * !#zh
   * 通过特定的类型和名称获取内建资源
   * 
   * @method getBuiltin
   * @param {string} [type] - The type of asset, such as `effect`
   * @param {string} [name] - The name of asset, such as `phong`
   * @return {Asset|Cache} Builtin-assets
   * 
   * @example
   * cc.assetManaer.builtins.getBuiltin('effect', 'phone');
   * 
   * @typescript
   * getBuiltin(type?: string, name?: string): cc.Asset | Cache<cc.Asset>
   */
  getBuiltin: function getBuiltin(type, name) {
    if (arguments.length === 0) return this._assets;else if (arguments.length === 1) return this._assets.get(type);else return this._assets.get(type).get(name);
  },

  /**
   * !#en
   * Clear all builtin assets
   * 
   * !#zh
   * 清空所有内置资源
   * 
   * @method clear
   * 
   * @typescript
   * clear(): void
   */
  clear: function clear() {
    this._assets.forEach(function (assets) {
      assets.forEach(function (asset) {
        releaseManager.tryRelease(asset, true);
      });
      assets.clear();
    });
  }
};
module.exports = builtins;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGJ1aWx0aW5zLmpzIl0sIm5hbWVzIjpbIkNhY2hlIiwicmVxdWlyZSIsInJlbGVhc2VNYW5hZ2VyIiwiQnVpbHRpbkJ1bmRsZU5hbWUiLCJidWlsdGlucyIsIl9hc3NldHMiLCJtYXRlcmlhbCIsImVmZmVjdCIsIl9sb2FkQnVpbHRpbnMiLCJuYW1lIiwiY2IiLCJkaXJuYW1lIiwiYnVpbHRpbiIsImdldCIsImNjIiwiYXNzZXRNYW5hZ2VyIiwiaW50ZXJuYWwiLCJsb2FkRGlyIiwiZXJyIiwiYXNzZXRzIiwiZXJyb3IiLCJtZXNzYWdlIiwic3RhY2siLCJpIiwibGVuZ3RoIiwiYXNzZXQiLCJhZGQiLCJhZGRSZWYiLCJpbml0IiwiY2xlYXIiLCJnYW1lIiwicmVuZGVyVHlwZSIsIlJFTkRFUl9UWVBFX0NBTlZBUyIsImJ1bmRsZXMiLCJoYXMiLCJJTlRFUk5BTCIsImdldEJ1aWx0aW4iLCJ0eXBlIiwiYXJndW1lbnRzIiwiZm9yRWFjaCIsInRyeVJlbGVhc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUdELE9BQU8sQ0FBQyxrQkFBRCxDQUE5Qjs7ZUFDOEJBLE9BQU8sQ0FBQyxVQUFEO0lBQTdCRSw2QkFBQUE7QUFFUjtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJQyxRQUFRLEdBQUc7QUFFWEMsRUFBQUEsT0FBTyxFQUFFLElBQUlMLEtB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QUFWLEVBQWlCO0FBQzVCdkIsUUFBQUEsY0FBYyxDQUFDc0MsVUFBZixDQUEwQmYsS0FBMUIsRUFBaUMsSUFBakM7QUFDSCxPQUZEO0FBR0FOLE1BQUFBLE1BQU0sQ0FBQ1UsS0FBUDtBQUNILEtBTEQ7QUFNSDtBQXpGVSxDQUFmO0FBNEZBWSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QyxRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xyXG5jb25zdCByZWxlYXNlTWFuYWdlciA9IHJlcXVpcmUoJy4vcmVsZWFzZU1hbmFnZXInKTtcclxuY29uc3QgeyBCdWlsdGluQnVuZGxlTmFtZSB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTsgXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIHRoZSBidWlsdGluIGFzc2V0LCBpdCdzIGEgc2luZ2xldG9uLCBhbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnNgIFxyXG4gKiBcclxuICogISN6aFxyXG4gKiDmraTmqKHlnZfljIXlkKvlhoXlu7rotYTmupDvvIzov5nmmK/kuIDkuKrljZXkvovvvIzmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWdlci5idWlsdGluc2Ag6K6/6ZeuXHJcbiAqIFxyXG4gKiBAY2xhc3MgQnVpbHRpbnNcclxuICovXHJcbnZhciBidWlsdGlucyA9IHtcclxuICAgIFxyXG4gICAgX2Fzc2V0czogbmV3IENhY2hlKHsgbWF0ZXJpYWw6IG5ldyBDYWNoZSgpLCBlZmZlY3Q6IG5ldyBDYWNoZSgpIH0pLCAvLyBidWlsdGluIGFzc2V0c1xyXG5cclxuICAgIF9sb2FkQnVpbHRpbnMgKG5hbWUsIGNiKSB7XHJcbiAgICAgICAgbGV0IGRpcm5hbWUgPSBuYW1lICArICdzJztcclxuICAgICAgICBsZXQgYnVpbHRpbiA9IHRoaXMuX2Fzc2V0cy5nZXQobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5pbnRlcm5hbC5sb2FkRGlyKGRpcm5hbWUsIG51bGwsIG51bGwsIChlcnIsIGFzc2V0cykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2V0ID0gYXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWx0aW4uYWRkKGFzc2V0Lm5hbWUsIGFzc2V0LmFkZFJlZigpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbml0aWFsaXplXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWIneWni+WMliBcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBpbml0XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIENhbGxiYWNrIHdoZW4gZmluaXNoIGxvYWRpbmcgYnVpbHQtaW4gYXNzZXRzXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBpbml0IChjYjogKCkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgaW5pdCAoY2IpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMgfHwgIWNjLmFzc2V0TWFuYWdlci5idW5kbGVzLmhhcyhCdWlsdGluQnVuZGxlTmFtZS5JTlRFUk5BTCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNiICYmIGNiKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb2FkQnVpbHRpbnMoJ2VmZmVjdCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZEJ1aWx0aW5zKCdtYXRlcmlhbCcsIGNiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIGJ1aWx0LWluIGFzc2V0IHVzaW5nIHNwZWNpZmljIHR5cGUgYW5kIG5hbWUuXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOmAmui/h+eJueWumueahOexu+Wei+WSjOWQjeensOiOt+WPluWGheW7uui1hOa6kFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGdldEJ1aWx0aW5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV0gLSBUaGUgdHlwZSBvZiBhc3NldCwgc3VjaCBhcyBgZWZmZWN0YFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lXSAtIFRoZSBuYW1lIG9mIGFzc2V0LCBzdWNoIGFzIGBwaG9uZ2BcclxuICAgICAqIEByZXR1cm4ge0Fzc2V0fENhY2hlfSBCdWlsdGluLWFzc2V0c1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXNzZXRNYW5hZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignZWZmZWN0JywgJ3Bob25lJyk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBnZXRCdWlsdGluKHR5cGU/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiBjYy5Bc3NldCB8IENhY2hlPGNjLkFzc2V0PlxyXG4gICAgICovXHJcbiAgICBnZXRCdWlsdGluICh0eXBlLCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9hc3NldHM7XHJcbiAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHRoaXMuX2Fzc2V0cy5nZXQodHlwZSk7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5fYXNzZXRzLmdldCh0eXBlKS5nZXQobmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ2xlYXIgYWxsIGJ1aWx0aW4gYXNzZXRzXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOa4heepuuaJgOacieWGhee9rui1hOa6kFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGNsZWFyXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjbGVhcigpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9hc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXRzKSB7XHJcbiAgICAgICAgICAgIGFzc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhc3NldHMuY2xlYXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsdGlucztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=