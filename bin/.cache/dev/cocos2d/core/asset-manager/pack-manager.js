
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/pack-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = require("../platform/deserialize-compiled");

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
var downloader = require('./downloader');

var Cache = require('./cache');

var js = require('../platform/js');

var _require = require('./shared'),
    files = _require.files;

var _loading = new Cache();

function isLoading(val) {
  return _loading.has(val.uuid);
}
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Handle the packed asset, include unpacking, loading, cache and so on. It is a singleton. All member can be accessed with `cc.assetManager.packManager`
 * 
 * !#zh
 * 处理打包资源，包括拆包，加载，缓存等等，这是一个单例, 所有成员能通过 `cc.assetManager.packManager` 访问
 * 
 * @class PackManager
 */


var packManager = {
  /**
   * !#en
   * Unpack the json, revert to what it was before packing
   * 
   * !#zh
   * 拆解 json 包，恢复为打包之前的内容
   * 
   * @method unpackJson
   * @param {String[]} pack - The pack
   * @param {Object} json - The content of pack
   * @param {Object} options - Some optional parameters
   * @param {Function} onComplete - Callback when finish unpacking
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.content - The unpacked assets
   * 
   * @example
   * downloader.downloadFile('pack.json', {responseType: 'json'}, null, (err, file) => {
   *      packManager.unpackJson(['a', 'b'], file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * unpackJson(pack: string[], json: any, options: Record<string, any>, onComplete?: (err: Error, content: any) => void): void
   */
  unpackJson: function unpackJson(pack, json, options, onComplete) {
    var out = js.createMap(true),
        err = null;

    if (Array.isArray(json)) {
      json = (0, _deserializeCompiled.unpackJSONs)(json);

      if (json.length !== pack.length) {
        cc.errorID(4915);
      }

      for (var i = 0; i < pack.length; i++) {
        var key = pack[i] + '@import';
        out[key] = json[i];
      }
    } else {
      var textureType = js._getClassId(cc.Texture2D);

      if (json.type === textureType) {
        if (json.data) {
          var datas = json.data.split('|');

          if (datas.length !== pack.length) {
            cc.errorID(4915);
          }

          for (var _i = 0; _i < pack.length; _i++) {
            out[pack[_i] + '@import'] = (0, _deserializeCompiled.packCustomObjData)(textureType, datas[_i], true);
          }
        }
      } else {
        err = new Error('unmatched type pack!');
        out = null;
      }
    }

    onComplete && onComplete(err, out);
  },
  init: function init() {
    _loading.clear();
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend packManager to unpack other format pack
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 packManager 来拆分其他格式的包时可以注册自定义的 handler
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.bin' or map likes {'.bin': binHandler, '.ab': abHandler}
   * @param {Function} [handler] - handler
   * @param {string} handler.packUuid - The uuid of pack
   * @param {*} handler.data - The content of pack
   * @param {Object} handler.options - Some optional parameters
   * @param {Function} handler.onComplete - Callback when finishing unpacking
   * 
   * @example
   * packManager.register('.bin', (packUuid, file, options, onComplete) => onComplete(null, null));
   * packManager.register({'.bin': (packUuid, file, options, onComplete) => onComplete(null, null), '.ab': (packUuid, file, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (packUuid: string, data: any, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void): void
   * register(map: Record<string, (packUuid: string, data: any, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(unpackers, type);
    } else {
      unpackers[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to unpack package
   * 
   * !#zh
   * 用对应的 handler 来进行解包 
   * 
   * @method unpack
   * @param {String[]} pack - The uuid of packed assets 
   * @param {*} data - The packed data
   * @param {string} type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param {Object} options - Some optional parameter
   * @param {Function} onComplete - callback when finishing unpacking
   * @param {Error} onComplete.err -  The occurred error, null indicetes success
   * @param {*} onComplete.data - Original assets
   * 
   * @example
   * downloader.downloadFile('pack.json', {responseType: 'json'}, null, (err, file) => {
   *      packManager.unpack(['2fawq123d', '1zsweq23f'], file, '.json', null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * unpack(pack: string[], data: any, type: string, options: Record<string, any>, onComplete?: (err: Error, data: any) => void): void
   */
  unpack: function unpack(pack, data, type, options, onComplete) {
    if (!data) {
      onComplete && onComplete(new Error('package data is wrong!'));
      return;
    }

    var unpacker = unpackers[type];
    unpacker(pack, data, options, onComplete);
  },

  /**
   * !#en
   * Download request item, If item is not in any package, download as usual. Otherwise, download the corresponding package and unpack it. 
   * And then retrieve the corresponding content form it.
   * 
   * !#zh
   * 下载请求对象，如果请求对象不在任何包内，则正常下载，否则下载对应的 package 并进行拆解，并取回包内对应的内容
   * 
   * @method load
   * @param {RequestItem} item - Some item you want to download
   * @param {Object} options - Some optional parameters
   * @param {Function} onComplete - Callback when finished
   * @param {Err} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.data - The unpacked data retrieved from package
   * 
   * @example
   * var requestItem = cc.AssetManager.RequestItem.create();
   * requestItem.uuid = 'fcmR3XADNLgJ1ByKhqcC5Z';
   * requestItem.info = config.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * packManager.load(requestItem, null, (err, data) => console.log(err));
   * 
   * @typescript
   * load(item: RequestItem, options: Record<string, any>, onComplete: (err: Error, data: any) => void): void
   * 
   */
  load: function load(item, options, onComplete) {
    // if not in any package, download as uausl
    if (item.isNative || !item.info || !item.info.packs) return downloader.download(item.id, item.url, item.ext, item.options, onComplete);
    if (files.has(item.id)) return onComplete(null, files.get(item.id));
    var packs = item.info.packs; // find a loading package

    var pack = packs.find(isLoading);
    if (pack) return _loading.get(pack.uuid).push({
      onComplete: onComplete,
      id: item.id
    }); // download a new package

    pack = packs[0];

    _loading.add(pack.uuid, [{
      onComplete: onComplete,
      id: item.id
    }]);

    var url = cc.assetManager._transform(pack.uuid, {
      ext: pack.ext,
      bundle: item.config.name
    });

    downloader.download(pack.uuid, url, pack.ext, item.options, function (err, data) {
      files.remove(pack.uuid);

      if (err) {
        cc.error(err.message, err.stack);
      } // unpack package


      packManager.unpack(pack.packs, data, pack.ext, item.options, function (err, result) {
        if (!err) {
          for (var id in result) {
            files.add(id, result[id]);
          }
        }

        var callbacks = _loading.remove(pack.uuid);

        for (var i = 0, l = callbacks.length; i < l; i++) {
          var cb = callbacks[i];

          if (err) {
            cb.onComplete(err);
            continue;
          }

          var data = result[cb.id];

          if (!data) {
            cb.onComplete(new Error('can not retrieve data from package'));
          } else {
            cb.onComplete(null, data);
          }
        }
      });
    });
  }
};
var unpackers = {
  '.json': packManager.unpackJson
};
module.exports = packManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHBhY2stbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJkb3dubG9hZGVyIiwicmVxdWlyZSIsIkNhY2hlIiwianMiLCJmaWxlcyIsIl9sb2FkaW5nIiwiaXNMb2FkaW5nIiwidmFsIiwiaGFzIiwidXVpZCIsInBhY2tNYW5hZ2VyIiwidW5wYWNrSnNvbiIsInBhY2siLCJqc29uIiwib3B0aW9ucyIsIm9uQ29tcGxldGUiLCJvdXQiLCJjcmVhdGVNYXAiLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJjYyIsImVycm9ySUQiLCJpIiwia2V5IiwidGV4dHVyZVR5cGUiLCJfZ2V0Q2xhc3NJZCIsIlRleHR1cmUyRCIsInR5cGUiLCJkYXRhIiwiZGF0YXMiLCJzcGxpdCIsIkVycm9yIiwiaW5pdCIsImNsZWFyIiwicmVnaXN0ZXIiLCJoYW5kbGVyIiwibWl4aW4iLCJ1bnBhY2tlcnMiLCJ1bnBhY2siLCJ1bnBhY2tlciIsImxvYWQiLCJpdGVtIiwiaXNOYXRpdmUiLCJpbmZvIiwicGFja3MiLCJkb3dubG9hZCIsImlkIiwidXJsIiwiZXh0IiwiZ2V0IiwiZmluZCIsInB1c2giLCJhZGQiLCJhc3NldE1hbmFnZXIiLCJfdHJhbnNmb3JtIiwiYnVuZGxlIiwiY29uZmlnIiwibmFtZSIsInJlbW92ZSIsImVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwicmVzdWx0IiwiY2FsbGJhY2tzIiwibCIsImNiIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsY0FBRCxDQUEx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RCxDQUFwQjtBQUNIO0FBQ0o7O0FBQ0QsWUFBSWlCLFNBQVMsR0FBRzVELFFBQVEsQ0FBQ3VELE1BQVQsQ0FBZ0JoRCxJQUFJLENBQUNILElBQXJCLENBQWhCOztBQUNBLGFBQUssSUFBSWUsQ0FBQyxHQUFHLENBQVIsRUFBVzBDLENBQUMsR0FBR0QsU0FBUyxDQUFDNUMsTUFBOUIsRUFBc0NHLENBQUMsR0FBRzBDLENBQTFDLEVBQTZDMUMsQ0FBQyxFQUE5QyxFQUFrRDtBQUM5QyxjQUFJMkMsRUFBRSxHQUFHRixTQUFTLENBQUN6QyxDQUFELENBQWxCOztBQUNBLGNBQUlOLEdBQUosRUFBUztBQUNMaUQsWUFBQUEsRUFBRSxDQUFDcEQsVUFBSCxDQUFjRyxHQUFkO0FBQ0E7QUFDSDs7QUFFRCxjQUFJWSxJQUFJLEdBQUdrQyxNQUFNLENBQUNHLEVBQUUsQ0FBQ25CLEVBQUosQ0FBakI7O0FBQ0EsY0FBSSxDQUFDbEIsSUFBTCxFQUFXO0FBQ1BxQyxZQUFBQSxFQUFFLENBQUNwRCxVQUFILENBQWMsSUFBSWtCLEtBQUosQ0FBVSxvQ0FBVixDQUFkO0FBQ0gsV0FGRCxNQUdLO0FBQ0RrQyxZQUFBQSxFQUFFLENBQUNwRCxVQUFILENBQWMsSUFBZCxFQUFvQmUsSUFBcEI7QUFDSDtBQUNKO0FBQ0osT0F0QkQ7QUF1QkgsS0E3QkQ7QUE4Qkg7QUE3TWEsQ0FBbEI7QUFnTkEsSUFBSVMsU0FBUyxHQUFHO0FBQ1osV0FBUzdCLFdBQVcsQ0FBQ0M7QUFEVCxDQUFoQjtBQUlBeUQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0QsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyB1bnBhY2tKU09OcywgcGFja0N1c3RvbU9iakRhdGEgfSBmcm9tICcuLi9wbGF0Zm9ybS9kZXNlcmlhbGl6ZS1jb21waWxlZCc7XHJcblxyXG5jb25zdCBkb3dubG9hZGVyID0gcmVxdWlyZSgnLi9kb3dubG9hZGVyJyk7XHJcbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xyXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XHJcbmNvbnN0IHsgZmlsZXMgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XHJcblxyXG52YXIgX2xvYWRpbmcgPSBuZXcgQ2FjaGUoKTtcclxuXHJcbmZ1bmN0aW9uIGlzTG9hZGluZyAodmFsKSB7XHJcbiAgICByZXR1cm4gX2xvYWRpbmcuaGFzKHZhbC51dWlkKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogSGFuZGxlIHRoZSBwYWNrZWQgYXNzZXQsIGluY2x1ZGUgdW5wYWNraW5nLCBsb2FkaW5nLCBjYWNoZSBhbmQgc28gb24uIEl0IGlzIGEgc2luZ2xldG9uLiBBbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgXHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOWkhOeQhuaJk+WMhei1hOa6kO+8jOWMheaLrOaLhuWMhe+8jOWKoOi9ve+8jOe8k+WtmOetieetie+8jOi/meaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIucGFja01hbmFnZXJgIOiuv+mXrlxyXG4gKiBcclxuICogQGNsYXNzIFBhY2tNYW5hZ2VyXHJcbiAqL1xyXG52YXIgcGFja01hbmFnZXIgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBVbnBhY2sgdGhlIGpzb24sIHJldmVydCB0byB3aGF0IGl0IHdhcyBiZWZvcmUgcGFja2luZ1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmi4bop6MganNvbiDljIXvvIzmgaLlpI3kuLrmiZPljIXkuYvliY3nmoTlhoXlrrlcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCB1bnBhY2tKc29uXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrIC0gVGhlIHBhY2tcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBqc29uIC0gVGhlIGNvbnRlbnQgb2YgcGFja1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCB1bnBhY2tpbmdcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Db21wbGV0ZS5jb250ZW50IC0gVGhlIHVucGFja2VkIGFzc2V0c1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3BhY2suanNvbicsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcclxuICAgICAqICAgICAgcGFja01hbmFnZXIudW5wYWNrSnNvbihbJ2EnLCAnYiddLCBmaWxlLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdW5wYWNrSnNvbihwYWNrOiBzdHJpbmdbXSwganNvbjogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgdW5wYWNrSnNvbiAocGFjaywganNvbiwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG5cclxuICAgICAgICB2YXIgb3V0ID0ganMuY3JlYXRlTWFwKHRydWUpLCBlcnIgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGpzb24pKSB7XHJcblxyXG4gICAgICAgICAgICBqc29uID0gdW5wYWNrSlNPTnMoanNvbik7XHJcblxyXG4gICAgICAgICAgICBpZiAoanNvbi5sZW5ndGggIT09IHBhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDQ5MTUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHBhY2tbaV0gKyAnQGltcG9ydCc7XHJcbiAgICAgICAgICAgICAgICBvdXRba2V5XSA9IGpzb25baV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRleHR1cmVUeXBlID0ganMuX2dldENsYXNzSWQoY2MuVGV4dHVyZTJEKTtcclxuICAgICAgICAgICAgaWYgKGpzb24udHlwZSA9PT0gdGV4dHVyZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YXMgPSBqc29uLmRhdGEuc3BsaXQoJ3wnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YXMubGVuZ3RoICE9PSBwYWNrLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDQ5MTUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0W3BhY2tbaV0gKyAnQGltcG9ydCddID0gcGFja0N1c3RvbU9iakRhdGEodGV4dHVyZVR5cGUsIGRhdGFzW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoJ3VubWF0Y2hlZCB0eXBlIHBhY2shJyk7XHJcbiAgICAgICAgICAgICAgICBvdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG91dCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIF9sb2FkaW5nLmNsZWFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVnaXN0ZXIgY3VzdG9tIGhhbmRsZXIgaWYgeW91IHdhbnQgdG8gY2hhbmdlIGRlZmF1bHQgYmVoYXZpb3Igb3IgZXh0ZW5kIHBhY2tNYW5hZ2VyIHRvIHVucGFjayBvdGhlciBmb3JtYXQgcGFja1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlvZPkvaDmg7Pkv67mlLnpu5jorqTooYzkuLrmiJbogIXmi5PlsZUgcGFja01hbmFnZXIg5p2l5ouG5YiG5YW25LuW5qC85byP55qE5YyF5pe25Y+v5Lul5rOo5YaM6Ieq5a6a5LmJ55qEIGhhbmRsZXJcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCByZWdpc3RlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSB0eXBlIC0gRXh0ZW5zaW9uIGxpa2VzICcuYmluJyBvciBtYXAgbGlrZXMgeycuYmluJzogYmluSGFuZGxlciwgJy5hYic6IGFiSGFuZGxlcn1cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtoYW5kbGVyXSAtIGhhbmRsZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoYW5kbGVyLnBhY2tVdWlkIC0gVGhlIHV1aWQgb2YgcGFja1xyXG4gICAgICogQHBhcmFtIHsqfSBoYW5kbGVyLmRhdGEgLSBUaGUgY29udGVudCBvZiBwYWNrXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlci5vcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyLm9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaGluZyB1bnBhY2tpbmdcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHBhY2tNYW5hZ2VyLnJlZ2lzdGVyKCcuYmluJywgKHBhY2tVdWlkLCBmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpKTtcclxuICAgICAqIHBhY2tNYW5hZ2VyLnJlZ2lzdGVyKHsnLmJpbic6IChwYWNrVXVpZCwgZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKSwgJy5hYic6IChwYWNrVXVpZCwgZmlsZSwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4gb25Db21wbGV0ZShudWxsLCBudWxsKX0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcmVnaXN0ZXIodHlwZTogc3RyaW5nLCBoYW5kbGVyOiAocGFja1V1aWQ6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcmVnaXN0ZXIobWFwOiBSZWNvcmQ8c3RyaW5nLCAocGFja1V1aWQ6IHN0cmluZywgZGF0YTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkPik6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXIgKHR5cGUsIGhhbmRsZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGpzLm1peGluKHVucGFja2VycywgdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1bnBhY2tlcnNbdHlwZV0gPSBoYW5kbGVyO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVXNlIGNvcnJlc3BvbmRpbmcgaGFuZGxlciB0byB1bnBhY2sgcGFja2FnZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnlKjlr7nlupTnmoQgaGFuZGxlciDmnaXov5vooYzop6PljIUgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgdW5wYWNrXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBwYWNrIC0gVGhlIHV1aWQgb2YgcGFja2VkIGFzc2V0cyBcclxuICAgICAqIEBwYXJhbSB7Kn0gZGF0YSAtIFRoZSBwYWNrZWQgZGF0YVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBpbmRpY2F0ZXMgdGhhdCB3aGljaCBoYW5kbGVyIHNob3VsZCBiZSB1c2VkIHRvIGRvd25sb2FkLCBzdWNoIGFzICcuanBnJ1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBTb21lIG9wdGlvbmFsIHBhcmFtZXRlclxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoaW5nIHVucGFja2luZ1xyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSAgVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0geyp9IG9uQ29tcGxldGUuZGF0YSAtIE9yaWdpbmFsIGFzc2V0c1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3BhY2suanNvbicsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcclxuICAgICAqICAgICAgcGFja01hbmFnZXIudW5wYWNrKFsnMmZhd3ExMjNkJywgJzF6c3dlcTIzZiddLCBmaWxlLCAnLmpzb24nLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogdW5wYWNrKHBhY2s6IHN0cmluZ1tdLCBkYXRhOiBhbnksIHR5cGU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHVucGFjayAocGFjaywgZGF0YSwgdHlwZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKCdwYWNrYWdlIGRhdGEgaXMgd3JvbmchJykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB1bnBhY2tlciA9IHVucGFja2Vyc1t0eXBlXTtcclxuICAgICAgICB1bnBhY2tlcihwYWNrLCBkYXRhLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEb3dubG9hZCByZXF1ZXN0IGl0ZW0sIElmIGl0ZW0gaXMgbm90IGluIGFueSBwYWNrYWdlLCBkb3dubG9hZCBhcyB1c3VhbC4gT3RoZXJ3aXNlLCBkb3dubG9hZCB0aGUgY29ycmVzcG9uZGluZyBwYWNrYWdlIGFuZCB1bnBhY2sgaXQuIFxyXG4gICAgICogQW5kIHRoZW4gcmV0cmlldmUgdGhlIGNvcnJlc3BvbmRpbmcgY29udGVudCBmb3JtIGl0LlxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkuIvovb3or7fmsYLlr7nosaHvvIzlpoLmnpzor7fmsYLlr7nosaHkuI3lnKjku7vkvZXljIXlhoXvvIzliJnmraPluLjkuIvovb3vvIzlkKbliJnkuIvovb3lr7nlupTnmoQgcGFja2FnZSDlubbov5vooYzmi4bop6PvvIzlubblj5blm57ljIXlhoXlr7nlupTnmoTlhoXlrrlcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBsb2FkXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBpdGVtIC0gU29tZSBpdGVtIHlvdSB3YW50IHRvIGRvd25sb2FkXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIENhbGxiYWNrIHdoZW4gZmluaXNoZWRcclxuICAgICAqIEBwYXJhbSB7RXJyfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmRhdGEgLSBUaGUgdW5wYWNrZWQgZGF0YSByZXRyaWV2ZWQgZnJvbSBwYWNrYWdlXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgcmVxdWVzdEl0ZW0gPSBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0uY3JlYXRlKCk7XHJcbiAgICAgKiByZXF1ZXN0SXRlbS51dWlkID0gJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonO1xyXG4gICAgICogcmVxdWVzdEl0ZW0uaW5mbyA9IGNvbmZpZy5nZXRBc3NldEluZm8oJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcclxuICAgICAqIHBhY2tNYW5hZ2VyLmxvYWQocmVxdWVzdEl0ZW0sIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbG9hZChpdGVtOiBSZXF1ZXN0SXRlbSwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBsb2FkIChpdGVtLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgLy8gaWYgbm90IGluIGFueSBwYWNrYWdlLCBkb3dubG9hZCBhcyB1YXVzbFxyXG4gICAgICAgIGlmIChpdGVtLmlzTmF0aXZlIHx8ICFpdGVtLmluZm8gfHwgIWl0ZW0uaW5mby5wYWNrcykgcmV0dXJuIGRvd25sb2FkZXIuZG93bmxvYWQoaXRlbS5pZCwgaXRlbS51cmwsIGl0ZW0uZXh0LCBpdGVtLm9wdGlvbnMsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgICAgICBpZiAoZmlsZXMuaGFzKGl0ZW0uaWQpKSByZXR1cm4gb25Db21wbGV0ZShudWxsLCBmaWxlcy5nZXQoaXRlbS5pZCkpO1xyXG5cclxuICAgICAgICB2YXIgcGFja3MgPSBpdGVtLmluZm8ucGFja3M7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgYSBsb2FkaW5nIHBhY2thZ2VcclxuICAgICAgICB2YXIgcGFjayA9IHBhY2tzLmZpbmQoaXNMb2FkaW5nKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocGFjaykgcmV0dXJuIF9sb2FkaW5nLmdldChwYWNrLnV1aWQpLnB1c2goeyBvbkNvbXBsZXRlLCBpZDogaXRlbS5pZCB9KTtcclxuXHJcbiAgICAgICAgLy8gZG93bmxvYWQgYSBuZXcgcGFja2FnZVxyXG4gICAgICAgIHBhY2sgPSBwYWNrc1swXTtcclxuICAgICAgICBfbG9hZGluZy5hZGQocGFjay51dWlkLCBbeyBvbkNvbXBsZXRlLCBpZDogaXRlbS5pZCB9XSk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSBjYy5hc3NldE1hbmFnZXIuX3RyYW5zZm9ybShwYWNrLnV1aWQsIHtleHQ6IHBhY2suZXh0LCBidW5kbGU6IGl0ZW0uY29uZmlnLm5hbWV9KTtcclxuXHJcbiAgICAgICAgZG93bmxvYWRlci5kb3dubG9hZChwYWNrLnV1aWQsIHVybCwgcGFjay5leHQsIGl0ZW0ub3B0aW9ucywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBmaWxlcy5yZW1vdmUocGFjay51dWlkKTtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdW5wYWNrIHBhY2thZ2VcclxuICAgICAgICAgICAgcGFja01hbmFnZXIudW5wYWNrKHBhY2sucGFja3MsIGRhdGEsIHBhY2suZXh0LCBpdGVtLm9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpZCBpbiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXMuYWRkKGlkLCByZXN1bHRbaWRdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gX2xvYWRpbmcucmVtb3ZlKHBhY2sudXVpZCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYi5vbkNvbXBsZXRlKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXN1bHRbY2IuaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYi5vbkNvbXBsZXRlKG5ldyBFcnJvcignY2FuIG5vdCByZXRyaWV2ZSBkYXRhIGZyb20gcGFja2FnZScpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiLm9uQ29tcGxldGUobnVsbCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciB1bnBhY2tlcnMgPSB7XHJcbiAgICAnLmpzb24nOiBwYWNrTWFuYWdlci51bnBhY2tKc29uXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHBhY2tNYW5hZ2VyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==