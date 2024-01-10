
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/deprecated.js';
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
var js = require('../platform/js');

require('../CCDirector');

var utilities = require('./utilities');

var dependUtil = require('./depend-util');

var releaseManager = require('./releaseManager');

var downloader = require('./downloader');

var factory = require('./factory');

var helper = require('./helper');

var ImageFmts = ['.png', '.jpg', '.bmp', '.jpeg', '.gif', '.ico', '.tiff', '.webp', '.image', '.pvr', '.pkm'];
var AudioFmts = ['.mp3', '.ogg', '.wav', '.m4a'];

function GetTrue() {
  return true;
}

var md5Pipe = {
  transformURL: function transformURL(url) {
    var uuid = helper.getUuidFromURL(url);

    if (!uuid) {
      return url;
    }

    var bundle = cc.assetManager.bundles.find(function (b) {
      return !!b.getAssetInfo(uuid);
    });

    if (!bundle) {
      return url;
    }

    var hashValue = '';
    var info = bundle.getAssetInfo(uuid);

    if (url.startsWith(bundle.base + bundle._config.nativeBase)) {
      hashValue = info.nativeVer || '';
    } else {
      hashValue = info.ver || '';
    }

    if (!hashValue || url.indexOf(hashValue) !== -1) {
      return url;
    }

    var hashPatchInFolder = false;

    if (cc.path.extname(url) === '.ttf') {
      hashPatchInFolder = true;
    }

    if (hashPatchInFolder) {
      var dirname = cc.path.dirname(url);
      var basename = cc.path.basename(url);
      url = dirname + "." + hashValue + "/" + basename;
    } else {
      url = url.replace(/.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/, function (match, uuid) {
        return match + '.' + hashValue;
      });
    }

    return url;
  }
};
/**
 * `cc.loader` is deprecated, please backup your project and upgrade to {{#crossLink "AssetManager"}}{{/crossLink}}
 *
 * @class loader
 * @static
 * @deprecated cc.loader is deprecated, please backup your project and upgrade to cc.assetManager
 */

var loader = {
  /**
   * `cc.loader.onProgress` is deprecated, please transfer onProgress to API as a parameter
   * @property onProgress
   * @deprecated cc.loader.onProgress is deprecated, please transfer onProgress to API as a parameter
   */
  onProgress: null,
  _autoReleaseSetting: Object.create(null),

  get _cache() {
    return cc.assetManager.assets._map;
  },

  /**
   * `cc.loader.load` is deprecated, please use {{#crossLink "AssetManager/loadAny:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.load is deprecated, please use cc.assetManager.loadAny instead
   *
   * @method load
   * @param {String|String[]|Object} resources - Url list in an array
   * @param {Function} [progressCallback] - Callback invoked when progression change
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed
   * @param {Number} progressCallback.totalCount - The total number of the items
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline
   * @param {Function} [completeCallback] - Callback invoked when all resources loaded
   * @typescript
   * load(resources: string|string[]|{uuid?: string, url?: string, type?: string}, completeCallback?: Function): void
   * load(resources: string|string[]|{uuid?: string, url?: string, type?: string}, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: Function|null): void
   */
  load: function load(resources, progressCallback, completeCallback) {
    if (completeCallback === undefined) {
      if (progressCallback !== undefined) {
        completeCallback = progressCallback;
        progressCallback = null;
      }
    }

    resources = Array.isArray(resources) ? resources : [resources];

    for (var i = 0; i < resources.length; i++) {
      var item = resources[i];

      if (typeof item === 'string') {
        resources[i] = {
          url: item,
          __isNative__: true
        };
      } else {
        if (item.type) {
          item.ext = '.' + item.type;
          item.type = undefined;
        }

        if (item.url) {
          item.__isNative__ = true;
        }
      }
    }

    var images = [];
    var audios = [];
    cc.assetManager.loadAny(resources, null, function (finish, total, item) {
      if (item.content) {
        if (ImageFmts.includes(item.ext)) {
          images.push(item.content);
        } else if (AudioFmts.includes(item.ext)) {
          audios.push(item.content);
        }
      }

      progressCallback && progressCallback(finish, total, item);
    }, function (err, _native) {
      var res = null;

      if (!err) {
        _native = Array.isArray(_native) ? _native : [_native];

        for (var i = 0; i < _native.length; i++) {
          var item = _native[i];

          if (!(item instanceof cc.Asset)) {
            var asset = item;
            var url = resources[i].url;

            if (images.includes(asset)) {
              factory.create(url, item, '.png', null, function (err, image) {
                asset = _native[i] = image;
              });
            } else if (audios.includes(asset)) {
              factory.create(url, item, '.mp3', null, function (err, audio) {
                asset = _native[i] = audio;
              });
            }

            cc.assetManager.assets.add(url, asset);
          }
        }

        if (_native.length > 1) {
          var map = Object.create(null);

          _native.forEach(function (asset) {
            map[asset._uuid] = asset;
          });

          res = {
            isCompleted: GetTrue,
            _map: map
          };
        } else {
          res = _native[0];
        }
      }

      completeCallback && completeCallback(err, res);
    });
  },

  /**
   * `cc.loader.getXMLHttpRequest` is deprecated, please use `XMLHttpRequest` directly
   *
   * @method getXMLHttpRequest
   * @deprecated cc.loader.getXMLHttpRequest is deprecated, please use XMLHttpRequest directly
   * @returns {XMLHttpRequest}
   */
  getXMLHttpRequest: function getXMLHttpRequest() {
    return new XMLHttpRequest();
  },
  _parseLoadResArgs: utilities.parseLoadResArgs,

  /**
   * `cc.loader.getItem` is deprecated, please use `cc.assetManager.asset.get` instead
   *
   * @method getItem
   * @param {Object} id The id of the item
   * @return {Object}
   * @deprecated cc.loader.getItem is deprecated, please use cc.assetManager.assets.get instead
   */
  getItem: function getItem(key) {
    return cc.assetManager.assets.has(key) ? {
      content: cc.assetManager.assets.get(key)
    } : null;
  },

  /**
   * `cc.loader.loadRes` is deprecated, please use {{#crossLink "Bundle/load:method"}}{{/crossLink}}  instead
   *
   * @deprecated cc.loader.loadRes is deprecated, please use cc.resources.load  instead
   * @method loadRes
   * @param {String} url - Url of the target resource.
   *                       The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - Callback invoked when the resource loaded.
   * @param {Error} completeCallback.error - The error info or null if loaded successfully.
   * @param {Object} completeCallback.resource - The loaded resource if it can be found otherwise returns null.
   *
   * @typescript
   * loadRes(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void)|null): void
   * loadRes(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any) => void): void
   * loadRes(url: string, type: typeof cc.Asset): void
   * loadRes(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any) => void)|null): void
   * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
   * loadRes(url: string): void
   */
  loadRes: function loadRes(url, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr.type,
        onProgress = _this$_parseLoadResAr.onProgress,
        onComplete = _this$_parseLoadResAr.onComplete;

    var extname = cc.path.extname(url);

    if (extname) {
      // strip extname
      url = url.slice(0, -extname.length);
    }

    cc.resources.load(url, type, onProgress, onComplete);
  },

  /**
   * `cc.loader.loadResArray` is deprecated, please use {{#crossLink "Bundle/load:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.loadResArray is deprecated, please use cc.resources.load instead
   * @method loadResArray
   * @param {String[]} urls - Array of URLs of the target resource.
   *                          The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
   *                                         with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
   *                                                     If nothing to load, assets will be an empty array.
   * @typescript
   * loadResArray(url: string[], type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void)|null): void
   * loadResArray(url: string[], type: typeof cc.Asset, completeCallback: (error: Error, resource: any[]) => void): void
   * loadResArray(url: string[], type: typeof cc.Asset): void
   * loadResArray(url: string[], progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[]) => void)|null): void
   * loadResArray(url: string[], completeCallback: (error: Error, resource: any[]) => void): void
   * loadResArray(url: string[]): void
   * loadResArray(url: string[], type: typeof cc.Asset[]): void
   */
  loadResArray: function loadResArray(urls, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr2 = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr2.type,
        onProgress = _this$_parseLoadResAr2.onProgress,
        onComplete = _this$_parseLoadResAr2.onComplete;

    urls.forEach(function (url, i) {
      var extname = cc.path.extname(url);

      if (extname) {
        // strip extname
        urls[i] = url.slice(0, -extname.length);
      }
    });
    cc.resources.load(urls, type, onProgress, onComplete);
  },

  /**
   * `cc.loader.loadResDir` is deprecated, please use {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.loadResDir is deprecated, please use cc.resources.loadDir instead
   * @method loadResDir
   * @param {String} url - Url of the target folder.
   *                       The url is relative to the "resources" folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [progressCallback] - Callback invoked when progression change.
   * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
   * @param {Number} progressCallback.totalCount - The total number of the items.
   * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
   * @param {Function} [completeCallback] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
   *                                         with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
   *                                             If nothing to load, assets will be an empty array.
   * @param {String[]} completeCallback.urls - An array that lists all the URLs of loaded assets.
   *
   * @typescript
   * loadResDir(url: string, type: typeof cc.Asset, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void)|null): void
   * loadResDir(url: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: any[], urls: string[]) => void): void
   * loadResDir(url: string, type: typeof cc.Asset): void
   * loadResDir(url: string, progressCallback: (completedCount: number, totalCount: number, item: any) => void, completeCallback: ((error: Error, resource: any[], urls: string[]) => void)|null): void
   * loadResDir(url: string, completeCallback: (error: Error, resource: any[], urls: string[]) => void): void
   * loadResDir(url: string): void
   */
  loadResDir: function loadResDir(url, type, progressCallback, completeCallback) {
    var _this$_parseLoadResAr3 = this._parseLoadResArgs(type, progressCallback, completeCallback),
        type = _this$_parseLoadResAr3.type,
        onProgress = _this$_parseLoadResAr3.onProgress,
        onComplete = _this$_parseLoadResAr3.onComplete;

    cc.resources.loadDir(url, type, onProgress, function (err, assets) {
      var urls = [];

      if (!err) {
        var infos = cc.resources.getDirWithPath(url, type);
        urls = infos.map(function (info) {
          return info.path;
        });
      }

      onComplete && onComplete(err, assets, urls);
    });
  },

  /**
   * `cc.loader.getRes` is deprecated, please use {{#crossLink "Bundle/get:method"}}{{/crossLink}} instead
   *
   * @method getRes
   * @param {String} url
   * @param {Function} [type] - Only asset of type will be returned if this argument is supplied.
   * @returns {*}
   * @deprecated cc.loader.getRes is deprecated, please use cc.resources.get instead
   */
  getRes: function getRes(url, type) {
    return cc.assetManager.assets.has(url) ? cc.assetManager.assets.get(url) : cc.resources.get(url, type);
  },
  getResCount: function getResCount() {
    return cc.assetManager.assets.count;
  },

  /**
   * `cc.loader.getDependsRecursively` is deprecated, please use use {{#crossLink "DependUtil/getDepsRecursively:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.getDependsRecursively is deprecated, please use use cc.assetManager.dependUtil.getDepsRecursively instead
   * @method getDependsRecursively
   * @param {Asset|String} owner - The owner asset or the resource url or the asset's uuid
   * @returns {Array}
   */
  getDependsRecursively: function getDependsRecursively(owner) {
    if (!owner) return [];
    return dependUtil.getDepsRecursively(typeof owner === 'string' ? owner : owner._uuid).concat([owner._uuid]);
  },

  /**
   * `cc.loader.assetLoader` was removed, assetLoader and md5Pipe were merged into {{#crossLink "AssetManager/transformPipeline:property"}}{{/crossLink}}
   *
   * @property assetLoader
   * @deprecated cc.loader.assetLoader was removed, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline
   * @type {Object}
   */
  get assetLoader() {
    if (CC_DEBUG) {
      cc.error('cc.loader.assetLoader was removed, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline');
    }
  },

  /**
   * `cc.loader.md5Pipe` is deprecated, assetLoader and md5Pipe were merged into {{#crossLink "AssetManager/transformPipeline:property"}}{{/crossLink}}
   *
   * @property md5Pipe
   * @deprecated cc.loader.md5Pipe is deprecated, assetLoader and md5Pipe were merged into cc.assetManager.transformPipeline
   * @type {Object}
   */
  get md5Pipe() {
    return md5Pipe;
  },

  /**
   * `cc.loader.downloader` is deprecated, please use {{#crossLink "AssetManager/downloader:property"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.downloader is deprecated, please use cc.assetManager.downloader instead
   * @property downloader
   * @type {Object}
   */
  get downloader() {
    return cc.assetManager.downloader;
  },

  /**
   * `cc.loader.loader` is deprecated, please use {{#crossLink "AssetManager/parser:property"}}{{/crossLink}} instead
   *
   * @property loader
   * @type {Object}
   * @deprecated cc.loader.loader is deprecated, please use cc.assetManager.parser instead
   */
  get loader() {
    return cc.assetManager.parser;
  },

  /**
   * `cc.loader.addDownloadHandlers` is deprecated, please use `cc.assetManager.downloader.register` instead
   *
   * @method addDownloadHandlers
   * @param {Object} extMap Custom supported types with corresponded handler
   * @deprecated cc.loader.addDownloadHandlers is deprecated, please use cc.assetManager.downloader.register instead
  */
  addDownloadHandlers: function addDownloadHandlers(extMap) {
    if (CC_DEBUG) {
      cc.warn('`cc.loader.addDownloadHandlers` is deprecated, please use `cc.assetManager.downloader.register` instead');
    }

    var handler = Object.create(null);

    for (var type in extMap) {
      var func = extMap[type];

      handler['.' + type] = function (url, options, onComplete) {
        func({
          url: url
        }, onComplete);
      };
    }

    cc.assetManager.downloader.register(handler);
  },

  /**
   * `cc.loader.addLoadHandlers` is deprecated, please use `cc.assetManager.parser.register` instead
   *
   * @method addLoadHandlers
   * @param {Object} extMap Custom supported types with corresponded handler
   * @deprecated cc.loader.addLoadHandlers is deprecated, please use cc.assetManager.parser.register instead
   */
  addLoadHandlers: function addLoadHandlers(extMap) {
    if (CC_DEBUG) {
      cc.warn('`cc.loader.addLoadHandlers` is deprecated, please use `cc.assetManager.parser.register` instead');
    }

    var handler = Object.create(null);

    for (var type in extMap) {
      var func = extMap[type];

      handler['.' + type] = function (file, options, onComplete) {
        func({
          content: file
        }, onComplete);
      };
    }

    cc.assetManager.parser.register(handler);
  },
  flowInDeps: function flowInDeps() {
    if (CC_DEBUG) {
      cc.error('cc.loader.flowInDeps was removed');
    }
  },

  /**
   * `cc.loader.release` is deprecated, please use {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} instead
   *
   * @method release
   * @param {Asset|String|Array} asset
   * @deprecated cc.loader.release is deprecated, please use cc.assetManager.releaseAsset instead
   */
  release: function release(asset) {
    if (Array.isArray(asset)) {
      for (var i = 0; i < asset.length; i++) {
        var key = asset[i];
        if (typeof key === 'string') key = cc.assetManager.assets.get(key);

        var isBuiltin = cc.assetManager.builtins._assets.find(function (assets) {
          return assets.find(function (builtinAsset) {
            return builtinAsset === key;
          });
        });

        if (isBuiltin) continue;
        cc.assetManager.releaseAsset(key);
      }
    } else if (asset) {
      if (typeof asset === 'string') asset = cc.assetManager.assets.get(asset);

      var _isBuiltin = cc.assetManager.builtins._assets.find(function (assets) {
        return assets.find(function (builtinAsset) {
          return builtinAsset === asset;
        });
      });

      if (_isBuiltin) return;
      cc.assetManager.releaseAsset(asset);
    }
  },

  /**
   * `cc.loader.releaseAsset` is deprecated, please use {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseAsset is deprecated, please use cc.assetManager.releaseAsset instead
   * @method releaseAsset
   * @param {Asset} asset
   */
  releaseAsset: function releaseAsset(asset) {
    cc.assetManager.releaseAsset(asset);
  },

  /**
   * `cc.loader.releaseRes` is deprecated, please use {{#crossLink "AssetManager/releaseRes:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseRes is deprecated, please use cc.assetManager.releaseRes instead
   * @method releaseRes
   * @param {String} url
   * @param {Function} [type] - Only asset of type will be released if this argument is supplied.
   */
  releaseRes: function releaseRes(url, type) {
    cc.resources.release(url, type);
  },

  /**
   * `cc.loader.releaseResDir` was removed, please use {{#crossLink "AssetManager/releaseRes:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseResDir was removed, please use cc.assetManager.releaseRes instead
   * @method releaseResDir
   */
  releaseResDir: function releaseResDir() {
    if (CC_DEBUG) {
      cc.error('cc.loader.releaseResDir was removed, please use cc.assetManager.releaseAsset instead');
    }
  },

  /**
   * `cc.loader.releaseAll` is deprecated, please use {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.releaseAll is deprecated, please use cc.assetManager.releaseAll instead
   * @method releaseAll
   */
  releaseAll: function releaseAll() {
    cc.assetManager.releaseAll();
    cc.assetManager.assets.clear();
  },

  /**
   * `cc.loader.removeItem` is deprecated, please use `cc.assetManager.assets.remove` instead
   *
   * @deprecated cc.loader.removeItem is deprecated, please use cc.assetManager.assets.remove instead
   * @method removeItem
   * @param {Object} id The id of the item
   * @return {Boolean} succeed or not
   */
  removeItem: function removeItem(key) {
    cc.assetManager.assets.remove(key);
  },

  /**
   * `cc.loader.setAutoRelease` is deprecated, if you want to prevent some asset from auto releasing, please use {{#crossLink "Asset/addRef:method"}}{{/crossLink}} instead
   *
   * @deprecated cc.loader.setAutoRelease is deprecated, if you want to prevent some asset from auto releasing, please use cc.Asset.addRef instead
   * @method setAutoRelease
   * @param {Asset|String} assetOrUrlOrUuid - asset object or the raw asset's url or uuid
   * @param {Boolean} autoRelease - indicates whether should release automatically
   */
  setAutoRelease: function setAutoRelease(asset, autoRelease) {
    if (typeof asset === 'object') asset = asset._uuid;
    this._autoReleaseSetting[asset] = !!autoRelease;
  },

  /**
   * `cc.loader.setAutoReleaseRecursively` is deprecated, if you want to prevent some asset from auto releasing, please use {{#crossLink "Asset/addRef:method"}}{{/crossLink}} instead
   *
   * @method setAutoReleaseRecursively
   * @param {Asset|String} assetOrUrlOrUuid - asset object or the raw asset's url or uuid
   * @param {Boolean} autoRelease - indicates whether should release automatically
   * @deprecated cc.loader.setAutoReleaseRecursively is deprecated, if you want to prevent some asset from auto releasing, please use cc.Asset.addRef instead
   */
  setAutoReleaseRecursively: function setAutoReleaseRecursively(asset, autoRelease) {
    if (typeof asset === 'object') asset = asset._uuid;
    autoRelease = !!autoRelease;
    this._autoReleaseSetting[asset] = autoRelease;
    var depends = dependUtil.getDepsRecursively(asset);

    for (var i = 0; i < depends.length; i++) {
      var depend = depends[i];
      this._autoReleaseSetting[depend] = autoRelease;
    }
  },

  /**
   * `cc.loader.isAutoRelease` is deprecated
   *
   * @method isAutoRelease
   * @param {Asset|String} assetOrUrl - asset object or the raw asset's url
   * @returns {Boolean}
   * @deprecated cc.loader.isAutoRelease is deprecated
   */
  isAutoRelease: function isAutoRelease(asset) {
    if (typeof asset === 'object') asset = asset._uuid;
    return !!this._autoReleaseSetting[asset];
  }
};
/**
 * @class Downloader
 */

/**
 * `cc.loader.downloader.loadSubpackage` is deprecated, please use {{#crossLink "AssetManager/loadBundle:method"}}{{/crossLink}} instead
 *
 * @deprecated cc.loader.downloader.loadSubpackage is deprecated, please use AssetManager.loadBundle instead
 * @method loadSubpackage
 * @param {String} name - Subpackage name
 * @param {Function} [completeCallback] -  Callback invoked when subpackage loaded
 * @param {Error} completeCallback.error - error information
 */

downloader.loadSubpackage = function (name, completeCallback) {
  cc.assetManager.loadBundle(name, null, completeCallback);
};
/**
 * @deprecated cc.AssetLibrary is deprecated, please backup your project and upgrade to cc.assetManager
 */


var AssetLibrary = {
  /**
   * @deprecated cc.AssetLibrary.init is deprecated, please use cc.assetManager.init instead
   */
  init: function init(options) {
    options.importBase = options.libraryPath;
    options.nativeBase = CC_BUILD ? options.rawAssetsBase : options.libraryPath;
    cc.assetManager.init(options);

    if (options.rawAssets) {
      var resources = new cc.AssetManager.Bundle();
      resources.init({
        name: cc.AssetManager.BuiltinBundleName.RESOURCES,
        importBase: options.importBase,
        nativeBase: options.nativeBase,
        paths: options.rawAssets.assets,
        uuids: Object.keys(options.rawAssets.assets)
      });
    }
  },

  /**
   * @deprecated cc.AssetLibrary is deprecated, please use cc.assetManager.loadAny instead
   */
  loadAsset: function loadAsset(uuid, onComplete) {
    cc.assetManager.loadAny(uuid, onComplete);
  },
  getLibUrlNoExt: function getLibUrlNoExt() {
    if (CC_DEBUG) {
      cc.error('cc.AssetLibrary.getLibUrlNoExt was removed, if you want to transform url, please use cc.assetManager.utils.getUrlWithUuid instead');
    }
  },
  queryAssetInfo: function queryAssetInfo() {
    if (CC_DEBUG) {
      cc.error('cc.AssetLibrary.queryAssetInfo was removed, only available in the editor by using cc.assetManager.editorExtend.queryAssetInfo');
    }
  }
};
/**
 * `cc.url` is deprecated
 *
 * @deprecated cc.url is deprecated
 * @class url
 * @static
 */

cc.url = {
  normalize: function normalize(url) {
    cc.warnID(1400, 'cc.url.normalize', 'cc.assetManager.utils.normalize');
    return cc.assetManager.utils.normalize(url);
  },

  /**
   * `cc.url.raw` is deprecated, please use `cc.resources.load` directly, or use `Asset.nativeUrl` instead.
   *
   * @deprecated cc.url.raw is deprecated, please use cc.resources.load directly, or use Asset.nativeUrl instead.
   * @method raw
   * @param {String} url
   * @return {String}
   */
  raw: function raw(url) {
    cc.warnID(1400, 'cc.url.raw', 'cc.resources.load');

    if (url.startsWith('resources/')) {
      return cc.assetManager._transform({
        'path': cc.path.changeExtname(url.substr(10)),
        bundle: cc.AssetManager.BuiltinBundleName.RESOURCES,
        __isNative__: true,
        ext: cc.path.extname(url)
      });
    }

    return '';
  }
};
var onceWarns = {
  loader: true,
  assetLibrary: true
};
Object.defineProperties(cc, {
  loader: {
    get: function get() {
      if (CC_DEBUG) {
        if (onceWarns.loader) {
          onceWarns.loader = false;
          cc.log('cc.loader is deprecated, use cc.assetManager instead please. See https://docs.cocos.com/creator/manual/zh/release-notes/asset-manager-upgrade-guide.html');
        }
      }

      return loader;
    }
  },
  AssetLibrary: {
    get: function get() {
      if (CC_DEBUG) {
        if (onceWarns.assetLibrary) {
          onceWarns.assetLibrary = false;
          cc.log('cc.AssetLibrary is deprecated, use cc.assetManager instead please. See https://docs.cocos.com/creator/manual/zh/release-notes/asset-manager-upgrade-guide.html');
        }
      }

      return AssetLibrary;
    }
  },

  /**
   * `cc.LoadingItems` was removed, please use {{#crossLink "Task"}}{{/crossLink}} instead
   *
   * @deprecated cc.LoadingItems was removed, please use cc.AssetManager.Task instead
   * @class LoadingItems
   */
  LoadingItems: {
    get: function get() {
      cc.warnID(1400, 'cc.LoadingItems', 'cc.AssetManager.Task');
      return cc.AssetManager.Task;
    }
  },
  Pipeline: {
    get: function get() {
      cc.warnID(1400, 'cc.Pipeline', 'cc.AssetManager.Pipeline');
      return cc.AssetManager.Pipeline;
    }
  }
});
js.obsolete(cc, 'cc.RawAsset', 'cc.Asset');
/**
 * @class Asset
 */

/**
 * `cc.Asset.url` is deprecated, please use {{#crossLink "Asset/nativeUrl:property"}}{{/crossLink}} instead
 * @property url
 * @type {String}
 * @deprecated cc.Asset.url is deprecated, please use cc.Asset.nativeUrl instead
 */

js.obsolete(cc.Asset.prototype, 'cc.Asset.url', 'nativeUrl');
/**
 * @class macro
 * @static
 */

Object.defineProperties(cc.macro, {
  /**
   * `cc.macro.DOWNLOAD_MAX_CONCURRENT` is deprecated now, please use {{#crossLink "Downloader/maxConcurrency:property"}}{{/crossLink}} instead
   * 
   * @property DOWNLOAD_MAX_CONCURRENT
   * @type {Number}
   * @deprecated cc.macro.DOWNLOAD_MAX_CONCURRENT is deprecated now, please use cc.assetManager.downloader.maxConcurrency instead
   */
  DOWNLOAD_MAX_CONCURRENT: {
    get: function get() {
      return cc.assetManager.downloader.maxConcurrency;
    },
    set: function set(val) {
      cc.assetManager.downloader.maxConcurrency = val;
    }
  }
});
Object.assign(cc.director, {
  _getSceneUuid: function _getSceneUuid(sceneName) {
    cc.assetManager.main.getSceneInfo(sceneName);
  }
});
Object.defineProperties(cc.game, {
  _sceneInfos: {
    get: function get() {
      var scenes = [];

      cc.assetManager.main._config.scenes.forEach(function (val) {
        scenes.push(val);
      });

      return scenes;
    }
  }
});
var parseParameters = utilities.parseParameters;

utilities.parseParameters = function (options, onProgress, onComplete) {
  var result = parseParameters(options, onProgress, onComplete);
  result.onProgress = result.onProgress || loader.onProgress;
  return result;
};

var autoRelease = releaseManager._autoRelease;

releaseManager._autoRelease = function () {
  autoRelease.apply(this, arguments);
  var releaseSettings = loader._autoReleaseSetting;
  var keys = Object.keys(releaseSettings);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (releaseSettings[key] === true) {
      var asset = cc.assetManager.assets.get(key);
      asset && releaseManager.tryRelease(asset);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRlcHJlY2F0ZWQuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwidXRpbGl0aWVzIiwiZGVwZW5kVXRpbCIsInJlbGVhc2VNYW5hZ2VyIiwiZG93bmxvYWRlciIsImZhY3RvcnkiLCJoZWxwZXIiLCJJbWFnZUZtdHMiLCJBdWRpb0ZtdHMiLCJHZXRUcnVlIiwibWQ1UGlwZSIsInRyYW5zZm9ybVVSTCIsInVybCIsInV1aWQiLCJnZXRVdWlkRnJvbVVSTCIsImJ1bmRsZSIsImNjIiwiYXNzZXRNYW5hZ2VyIiwiYnVuZGxlcyIsImZpbmQiLCJiIiwiZ2V0QXNzZXRJbmZvIiwiaGFzaFZhbHVlIiwiaW5mbyIsInN0YXJ0c1dpdGgiLCJiYXNlIiwiX2NvbmZpZyIsIm5hdGl2ZUJhc2UiLCJuYXRpdmVWZXIiLCJ2ZXIiLCJpbmRleE9mIiwiaGFzaFBhdGNoSW5Gb2xkZXIiLCJwYXRoIiwiZXh0bmFtZSIsImRpcm5hbWUiLCJiYXNlbmFtZSIsInJlcGxhY2UiLCJtYXRjaCIsImxvYWRlciIsIm9uUHJvZ3Jlc3MiLCJfYXV0b1JlbGVhc2VTZXR0aW5nIiwiT2JqZWN0IiwiY3JlYXRlIiwiX2NhY2hlIiwiYXNzZXRzIiwiX21hcCIsImxvYWQiLCJyZXNvdXJjZXMiLCJwcm9ncmVzc0NhbGxiYWNrIiwiY29tcGxldGVDYWxsYmFjayIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJsZW5ndGgiLCJpdGVtIiwiX19pc05hdGl2ZV9fIiwidHlwZSIsImV4dCIsImltYWdlcyIsImF1ZGlvcyIsImxvYWRBbnkiLCJmaW5pc2giLCJ0b3RhbCIsImNvbnRlbnQiLCJpbmNsdWRlcyIsInB1c2giLCJlcnIiLCJuYXRpdmUiLCJyZXMiLCJBc3NldCIsImFzc2V0IiwiaW1hZ2UiLCJhdWRpbyIsImFkZCIsIm1hcCIsImZvckVhY2giLCJfdXVpZCIsImlzQ29tcGxldGVkIiwiZ2V0WE1MSHR0cFJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIl9wYXJzZUxvYWRSZXNBcmdzIiwicGFyc2VMb2FkUmVzQXJncyIsImdldEl0ZW0iLCJrZXkiLCJoYXMiLCJnZXQiLCJsb2FkUmVzIiwib25Db21wbGV0ZSIsInNsaWNlIiwibG9hZFJlc0FycmF5IiwidXJscyIsImxvYWRSZXNEaXIiLCJsb2FkRGlyIiwiaW5mb3MiLCJnZXREaXJXaXRoUGF0aCIsImdldFJlcyIsImdldFJlc0NvdW50IiwiY291bnQiLCJnZXREZXBlbmRzUmVjdXJzaXZlbHkiLCJvd25lciIsImdldERlcHNSZWN1cnNpdmVseSIsImNvbmNhdCIsImFzc2V0TG9hZGVyIiwiQ0NfREVCVUciLCJlcnJvciIsInBhcnNlciIsImFkZERvd25sb2FkSGFuZGxlcnMiLCJleHRNYXAiLCJ3YXJuIiwiaGFuZGxlciIsImZ1bmMiLCJvcHRpb25zIiwicmVnaXN0ZXIiLCJhZGRMb2FkSGFuZGxlcnMiLCJmaWxlIiwiZmxvd0luRGVwcyIsInJlbGVhc2UiLCJpc0J1aWx0aW4iLCJidWlsdGlucyIsIl9hc3NldHMiLCJidWlsdGluQXNzZXQiLCJyZWxlYXNlQXNzZXQiLCJyZWxlYXNlUmVzIiwicmVsZWFzZVJlc0RpciIsInJlbGVhc2VBbGwiLCJjbGVhciIsInJlbW92ZUl0ZW0iLCJyZW1vdmUiLCJzZXRBdXRvUmVsZWFzZSIsImF1dG9SZWxlYXNlIiwic2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseSIsImRlcGVuZHMiLCJkZXBlbmQiLCJpc0F1dG9SZWxlYXNlIiwibG9hZFN1YnBhY2thZ2UiLCJuYW1lIiwibG9hZEJ1bmRsZSIsIkFzc2V0TGlicmFyeSIsImluaXQiLCJpbXBvcnRCYXNlIiwibGlicmFyeVBhdGgiLCJDQ19CVUlMRCIsInJhd0Fzc2V0c0Jhc2UiLCJyYXdBc3NldHMiLCJBc3NldE1hbmFnZXIiLCJCdW5kbGUiLCJCdWlsdGluQnVuZGxlTmFtZSIsIlJFU09VUkNFUyIsInBhdGhzIiwidXVpZHMiLCJrZXlzIiwibG9hZEFzc2V0IiwiZ2V0TGliVXJsTm9FeHQiLCJxdWVyeUFzc2V0SW5mbyIsIm5vcm1hbGl6ZSIsIndhcm5JRCIsInV0aWxzIiwicmF3IiwiX3RyYW5zZm9ybSIsImNoYW5nZUV4dG5hbWUiLCJzdWJzdHIiLCJvbmNlV2FybnMiLCJhc3NldExpYnJhcnkiLCJkZWZpbmVQcm9wZXJ0aWVzIiwibG9nIiwiTG9hZGluZ0l0ZW1zIiwiVGFzayIsIlBpcGVsaW5lIiwib2Jzb2xldGUiLCJwcm90b3R5cGUiLCJtYWNybyIsIkRPV05MT0FEX01BWF9DT05DVVJSRU5UIiwibWF4Q29uY3VycmVuY3kiLCJzZXQiLCJ2YWwiLCJhc3NpZ24iLCJkaXJlY3RvciIsIl9nZXRTY2VuZVV1aWQiLCJzY2VuZU5hbWUiLCJtYWluIiwiZ2V0U2NlbmVJbmZvIiwiZ2FtZSIsIl9zY2VuZUluZm9zIiwic2NlbmVzIiwicGFyc2VQYXJhbWV0ZXJzIiwicmVzdWx0IiwiX2F1dG9SZWxlYXNlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJyZWxlYXNlU2V0dGluZ3MiLCJ0cnlSZWxlYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUF6Qjs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTFCOztBQUNBLElBQU1HLGNBQWMsR0FBR0gsT0FBTyxDQUFDLGtCQUFELENBQTlCOztBQUNBLElBQU1JLFVBQVUsR0FBR0osT0FBTyxDQUFDLGNBQUQsQ0FBMUI7O0FBQ0EsSUFBTUssT0FBTyxHQUFHTCxPQUFPLENBQUMs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K0JpRCxVQUEvQixFQUEyQztBQUNuRSxNQUFJa0csTUFBTSxHQUFHRCxlQUFlLENBQUN6RSxPQUFELEVBQVV6RSxVQUFWLEVBQXNCaUQsVUFBdEIsQ0FBNUI7QUFDQWtHLEVBQUFBLE1BQU0sQ0FBQ25KLFVBQVAsR0FBb0JtSixNQUFNLENBQUNuSixVQUFQLElBQXFCRCxNQUFNLENBQUNDLFVBQWhEO0FBQ0EsU0FBT21KLE1BQVA7QUFDSCxDQUpEOztBQU1BLElBQUl4RCxXQUFXLEdBQUcvSCxjQUFjLENBQUN3TCxZQUFqQzs7QUFDQXhMLGNBQWMsQ0FBQ3dMLFlBQWYsR0FBOEIsWUFBWTtBQUN0Q3pELEVBQUFBLFdBQVcsQ0FBQzBELEtBQVosQ0FBa0IsSUFBbEIsRUFBd0JDLFNBQXhCO0FBQ0EsTUFBSUMsZUFBZSxHQUFHeEosTUFBTSxDQUFDRSxtQkFBN0I7QUFDQSxNQUFJK0csSUFBSSxHQUFHOUcsTUFBTSxDQUFDOEcsSUFBUCxDQUFZdUMsZUFBWixDQUFYOztBQUNBLE9BQUssSUFBSXpJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdrRyxJQUFJLENBQUNqRyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxRQUFJK0IsR0FBRyxHQUFHbUUsSUFBSSxDQUFDbEcsQ0FBRCxDQUFkOztBQUNBLFFBQUl5SSxlQUFlLENBQUMxRyxHQUFELENBQWYsS0FBeUIsSUFBN0IsRUFBbUM7QUFDL0IsVUFBSWIsS0FBSyxHQUFHdkQsRUFBRSxDQUFDQyxZQUFILENBQWdCMkIsTUFBaEIsQ0FBdUIwQyxHQUF2QixDQUEyQkYsR0FBM0IsQ0FBWjtBQUNBYixNQUFBQSxLQUFLLElBQUlwRSxjQUFjLENBQUM0TCxVQUFmLENBQTBCeEgsS0FBMUIsQ0FBVDtBQUNIO0FBQ0o7QUFDSixDQVhEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcclxucmVxdWlyZSgnLi4vQ0NEaXJlY3RvcicpO1xyXG5jb25zdCB1dGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcycpO1xyXG5jb25zdCBkZXBlbmRVdGlsID0gcmVxdWlyZSgnLi9kZXBlbmQtdXRpbCcpO1xyXG5jb25zdCByZWxlYXNlTWFuYWdlciA9IHJlcXVpcmUoJy4vcmVsZWFzZU1hbmFnZXInKTtcclxuY29uc3QgZG93bmxvYWRlciA9IHJlcXVpcmUoJy4vZG93bmxvYWRlcicpO1xyXG5jb25zdCBmYWN0b3J5ID0gcmVxdWlyZSgnLi9mYWN0b3J5Jyk7XHJcbmNvbnN0IGhlbHBlciA9IHJlcXVpcmUoJy4vaGVscGVyJyk7XHJcblxyXG5jb25zdCBJbWFnZUZtdHMgPSBbJy5wbmcnLCAnLmpwZycsICcuYm1wJywgJy5qcGVnJywgJy5naWYnLCAnLmljbycsICcudGlmZicsICcud2VicCcsICcuaW1hZ2UnLCAnLnB2cicsICcucGttJ107XHJcbmNvbnN0IEF1ZGlvRm10cyA9IFsnLm1wMycsICcub2dnJywgJy53YXYnLCAnLm00YSddO1xyXG5cclxuZnVuY3Rpb24gR2V0VHJ1ZSAoKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG5jb25zdCBtZDVQaXBlID0ge1xyXG4gICAgdHJhbnNmb3JtVVJMICh1cmwpIHtcclxuICAgICAgICBsZXQgdXVpZCA9IGhlbHBlci5nZXRVdWlkRnJvbVVSTCh1cmwpO1xyXG4gICAgICAgIGlmICghdXVpZCkgeyByZXR1cm4gdXJsOyB9XHJcbiAgICAgICAgbGV0IGJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5idW5kbGVzLmZpbmQoKGIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICEhYi5nZXRBc3NldEluZm8odXVpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFidW5kbGUpIHsgcmV0dXJuIHVybDsgfVxyXG4gICAgICAgIGxldCBoYXNoVmFsdWUgPSAnJztcclxuICAgICAgICBsZXQgaW5mbyA9IGJ1bmRsZS5nZXRBc3NldEluZm8odXVpZCk7XHJcbiAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKGJ1bmRsZS5iYXNlICsgYnVuZGxlLl9jb25maWcubmF0aXZlQmFzZSkpIHtcclxuICAgICAgICAgICAgaGFzaFZhbHVlID0gaW5mby5uYXRpdmVWZXIgfHwgJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoYXNoVmFsdWUgPSBpbmZvLnZlciB8fCAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYXNoVmFsdWUgfHwgdXJsLmluZGV4T2YoaGFzaFZhbHVlKSAhPT0gLTEpIHsgcmV0dXJuIHVybDsgfVxyXG4gICAgICAgIGxldCBoYXNoUGF0Y2hJbkZvbGRlciA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChjYy5wYXRoLmV4dG5hbWUodXJsKSA9PT0gJy50dGYnKSB7XHJcbiAgICAgICAgICAgIGhhc2hQYXRjaEluRm9sZGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhhc2hQYXRjaEluRm9sZGVyKSB7XHJcbiAgICAgICAgICAgIGxldCBkaXJuYW1lID0gY2MucGF0aC5kaXJuYW1lKHVybCk7XHJcbiAgICAgICAgICAgIGxldCBiYXNlbmFtZSA9IGNjLnBhdGguYmFzZW5hbWUodXJsKTtcclxuICAgICAgICAgICAgdXJsID0gYCR7ZGlybmFtZX0uJHtoYXNoVmFsdWV9LyR7YmFzZW5hbWV9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvLipbL1xcXFxdWzAtOWEtZkEtRl17Mn1bL1xcXFxdKFswLTlhLWZBLUYtXXs4LH0pLywgKG1hdGNoLCB1dWlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2ggKyAnLicgKyBoYXNoVmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfSxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBgY2MubG9hZGVyYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYmFja3VwIHlvdXIgcHJvamVjdCBhbmQgdXBncmFkZSB0byB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXJcIn19e3svY3Jvc3NMaW5rfX1cclxuICpcclxuICogQGNsYXNzIGxvYWRlclxyXG4gKiBAc3RhdGljXHJcbiAqIEBkZXByZWNhdGVkIGNjLmxvYWRlciBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYmFja3VwIHlvdXIgcHJvamVjdCBhbmQgdXBncmFkZSB0byBjYy5hc3NldE1hbmFnZXJcclxuICovXHJcbmNvbnN0IGxvYWRlciA9IHtcclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5vblByb2dyZXNzYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdHJhbnNmZXIgb25Qcm9ncmVzcyB0byBBUEkgYXMgYSBwYXJhbWV0ZXJcclxuICAgICAqIEBwcm9wZXJ0eSBvblByb2dyZXNzXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIub25Qcm9ncmVzcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdHJhbnNmZXIgb25Qcm9ncmVzcyB0byBBUEkgYXMgYSBwYXJhbWV0ZXJcclxuICAgICAqL1xyXG4gICAgb25Qcm9ncmVzczogbnVsbCxcclxuICAgIF9hdXRvUmVsZWFzZVNldHRpbmc6IE9iamVjdC5jcmVhdGUobnVsbCksXHJcblxyXG4gICAgZ2V0IF9jYWNoZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuX21hcDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL2xvYWRBbnk6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIubG9hZCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFN0cmluZ1tdfE9iamVjdH0gcmVzb3VyY2VzIC0gVXJsIGxpc3QgaW4gYW4gYXJyYXlcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLmNvbXBsZXRlZENvdW50IC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLnRvdGFsQ291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb2dyZXNzQ2FsbGJhY2suaXRlbSAtIFRoZSBsYXRlc3QgaXRlbSB3aGljaCBmbG93IG91dCB0aGUgcGlwZWxpbmVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wbGV0ZUNhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBhbGwgcmVzb3VyY2VzIGxvYWRlZFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxvYWQocmVzb3VyY2VzOiBzdHJpbmd8c3RyaW5nW118e3V1aWQ/OiBzdHJpbmcsIHVybD86IHN0cmluZywgdHlwZT86IHN0cmluZ30sIGNvbXBsZXRlQ2FsbGJhY2s/OiBGdW5jdGlvbik6IHZvaWRcclxuICAgICAqIGxvYWQocmVzb3VyY2VzOiBzdHJpbmd8c3RyaW5nW118e3V1aWQ/OiBzdHJpbmcsIHVybD86IHN0cmluZywgdHlwZT86IHN0cmluZ30sIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogRnVuY3Rpb258bnVsbCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgbG9hZCAocmVzb3VyY2VzLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGNvbXBsZXRlQ2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3NDYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUNhbGxiYWNrID0gcHJvZ3Jlc3NDYWxsYmFjaztcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc291cmNlcyA9IEFycmF5LmlzQXJyYXkocmVzb3VyY2VzKSA/IHJlc291cmNlcyA6IFtyZXNvdXJjZXNdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gcmVzb3VyY2VzW2ldO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZXNbaV0gPSB7IHVybDogaXRlbSwgX19pc05hdGl2ZV9fOiB0cnVlfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmV4dCA9ICcuJyArIGl0ZW0udHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5fX2lzTmF0aXZlX18gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpbWFnZXMgPSBbXTtcclxuICAgICAgICB2YXIgYXVkaW9zID0gW107XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkocmVzb3VyY2VzLCBudWxsLCAoZmluaXNoLCB0b3RhbCwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW1hZ2VGbXRzLmluY2x1ZGVzKGl0ZW0uZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5wdXNoKGl0ZW0uY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBdWRpb0ZtdHMuaW5jbHVkZXMoaXRlbS5leHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9zLnB1c2goaXRlbS5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9ncmVzc0NhbGxiYWNrICYmIHByb2dyZXNzQ2FsbGJhY2soZmluaXNoLCB0b3RhbCwgaXRlbSk7XHJcbiAgICAgICAgfSwgKGVyciwgbmF0aXZlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlID0gQXJyYXkuaXNBcnJheShuYXRpdmUpID8gbmF0aXZlIDogW25hdGl2ZV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hdGl2ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbmF0aXZlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGl0ZW0gaW5zdGFuY2VvZiBjYy5Bc3NldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2V0ID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHJlc291cmNlc1tpXS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZXMuaW5jbHVkZXMoYXNzZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3J5LmNyZWF0ZSh1cmwsIGl0ZW0sICcucG5nJywgbnVsbCwgKGVyciwgaW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NldCA9IG5hdGl2ZVtpXSA9IGltYWdlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXVkaW9zLmluY2x1ZGVzKGFzc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjdG9yeS5jcmVhdGUodXJsLCBpdGVtLCAnLm1wMycsIG51bGwsIChlcnIsIGF1ZGlvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXQgPSBuYXRpdmVbaV0gPSBhdWRpbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuYWRkKHVybCwgYXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuYXRpdmUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZS5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBbYXNzZXQuX3V1aWRdID0gYXNzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzID0geyBpc0NvbXBsZXRlZDogR2V0VHJ1ZSwgX21hcDogbWFwIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgPSBuYXRpdmVbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjayAmJiBjb21wbGV0ZUNhbGxiYWNrKGVyciwgcmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0YCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBYTUxIdHRwUmVxdWVzdGAgZGlyZWN0bHlcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBYTUxIdHRwUmVxdWVzdCBkaXJlY3RseVxyXG4gICAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fVxyXG4gICAgICovXHJcbiAgICBnZXRYTUxIdHRwUmVxdWVzdCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcGFyc2VMb2FkUmVzQXJnczogdXRpbGl0aWVzLnBhcnNlTG9hZFJlc0FyZ3MsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmdldEl0ZW1gIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLmFzc2V0TWFuYWdlci5hc3NldC5nZXRgIGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGdldEl0ZW1cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBpZCBUaGUgaWQgb2YgdGhlIGl0ZW1cclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5nZXRJdGVtIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQgaW5zdGVhZFxyXG4gICAgICovXHJcbiAgICBnZXRJdGVtIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5oYXMoa2V5KSA/IHsgY29udGVudDogY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQoa2V5KSB9IDogbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRSZXNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319ICBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmxvYWRSZXMgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5yZXNvdXJjZXMubG9hZCAgaW5zdGVhZFxyXG4gICAgICogQG1ldGhvZCBsb2FkUmVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSB0YXJnZXQgcmVzb3VyY2UuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgVGhlIHVybCBpcyByZWxhdGl2ZSB0byB0aGUgXCJyZXNvdXJjZXNcIiBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJvZ3Jlc3NDYWxsYmFja10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2suY29tcGxldGVkQ291bnQgLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwcm9ncmVzc0NhbGxiYWNrLnRvdGFsQ291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9ncmVzc0NhbGxiYWNrLml0ZW0gLSBUaGUgbGF0ZXN0IGl0ZW0gd2hpY2ggZmxvdyBvdXQgdGhlIHBpcGVsaW5lLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbXBsZXRlQ2FsbGJhY2tdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHRoZSByZXNvdXJjZSBsb2FkZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBjb21wbGV0ZUNhbGxiYWNrLmVycm9yIC0gVGhlIGVycm9yIGluZm8gb3IgbnVsbCBpZiBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbXBsZXRlQ2FsbGJhY2sucmVzb3VyY2UgLSBUaGUgbG9hZGVkIHJlc291cmNlIGlmIGl0IGNhbiBiZSBmb3VuZCBvdGhlcndpc2UgcmV0dXJucyBudWxsLlxyXG4gICAgICpcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpfG51bGwpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVzKHVybDogc3RyaW5nLCBwcm9ncmVzc0NhbGxiYWNrOiAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlQ2FsbGJhY2s6ICgoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55KSA9PiB2b2lkKXxudWxsKTogdm9pZFxyXG4gICAgICogbG9hZFJlcyh1cmw6IHN0cmluZywgY29tcGxldGVDYWxsYmFjazogKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXModXJsOiBzdHJpbmcpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWRSZXMgKHVybCwgdHlwZSwgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHRoaXMuX3BhcnNlTG9hZFJlc0FyZ3ModHlwZSwgcHJvZ3Jlc3NDYWxsYmFjaywgY29tcGxldGVDYWxsYmFjayk7XHJcbiAgICAgICAgdmFyIGV4dG5hbWUgPSBjYy5wYXRoLmV4dG5hbWUodXJsKTtcclxuICAgICAgICBpZiAoZXh0bmFtZSkge1xyXG4gICAgICAgICAgICAvLyBzdHJpcCBleHRuYW1lXHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zbGljZSgwLCAtIGV4dG5hbWUubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQodXJsLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRSZXNBcnJheWAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5yZXNvdXJjZXMubG9hZCBpbnN0ZWFkXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRSZXNBcnJheVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gdXJscyAtIEFycmF5IG9mIFVSTHMgb2YgdGhlIHRhcmdldCByZXNvdXJjZS5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgdXJsIGlzIHJlbGF0aXZlIHRvIHRoZSBcInJlc291cmNlc1wiIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJvZ3Jlc3NDYWxsYmFjay5jb21wbGV0ZWRDb3VudCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2sudG90YWxDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb2dyZXNzQ2FsbGJhY2suaXRlbSAtIFRoZSBsYXRlc3QgaXRlbSB3aGljaCBmbG93IG91dCB0aGUgcGlwZWxpbmUuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGxldGVDYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBhc3NldHMgaGF2ZSBiZWVuIGxvYWRlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gY29tcGxldGVDYWxsYmFjay5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgZXJyb3IuIElmIGFsbCBhc3NldHMgYXJlIGxvYWRlZCBzdWNjZXNzZnVsbHksIGVycm9yIHdpbGwgYmUgbnVsbC5cclxuICAgICAqIEBwYXJhbSB7QXNzZXRbXXxBcnJheX0gY29tcGxldGVDYWxsYmFjay5hc3NldHMgLSBBbiBhcnJheSBvZiBhbGwgbG9hZGVkIGFzc2V0cy5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiBub3RoaW5nIHRvIGxvYWQsIGFzc2V0cyB3aWxsIGJlIGFuIGVtcHR5IGFycmF5LlxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCl8bnVsbCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVzQXJyYXkodXJsOiBzdHJpbmdbXSwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdKSA9PiB2b2lkKXxudWxsKTogdm9pZFxyXG4gICAgICogbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIGNvbXBsZXRlQ2FsbGJhY2s6IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNBcnJheSh1cmw6IHN0cmluZ1tdKTogdm9pZFxyXG4gICAgICogbG9hZFJlc0FycmF5KHVybDogc3RyaW5nW10sIHR5cGU6IHR5cGVvZiBjYy5Bc3NldFtdKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBsb2FkUmVzQXJyYXkgKHVybHMsIHR5cGUsIHByb2dyZXNzQ2FsbGJhY2ssIGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSB0aGlzLl9wYXJzZUxvYWRSZXNBcmdzKHR5cGUsIHByb2dyZXNzQ2FsbGJhY2ssIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG4gICAgICAgIHVybHMuZm9yRWFjaCgodXJsLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBleHRuYW1lID0gY2MucGF0aC5leHRuYW1lKHVybCk7XHJcbiAgICAgICAgICAgIGlmIChleHRuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdHJpcCBleHRuYW1lXHJcbiAgICAgICAgICAgICAgICB1cmxzW2ldID0gdXJsLnNsaWNlKDAsIC0gZXh0bmFtZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmxzLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRSZXNEaXJgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIubG9hZFJlc0RpciBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLnJlc291cmNlcy5sb2FkRGlyIGluc3RlYWRcclxuICAgICAqIEBtZXRob2QgbG9hZFJlc0RpclxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIFVybCBvZiB0aGUgdGFyZ2V0IGZvbGRlci5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICBUaGUgdXJsIGlzIHJlbGF0aXZlIHRvIHRoZSBcInJlc291cmNlc1wiIGZvbGRlciwgZXh0ZW5zaW9ucyBtdXN0IGJlIG9taXR0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSBsb2FkZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcm9ncmVzc0NhbGxiYWNrXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBwcm9ncmVzc2lvbiBjaGFuZ2UuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcHJvZ3Jlc3NDYWxsYmFjay5jb21wbGV0ZWRDb3VudCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb2dyZXNzQ2FsbGJhY2sudG90YWxDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb2dyZXNzQ2FsbGJhY2suaXRlbSAtIFRoZSBsYXRlc3QgaXRlbSB3aGljaCBmbG93IG91dCB0aGUgcGlwZWxpbmUuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGxldGVDYWxsYmFja10gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBhc3NldHMgaGF2ZSBiZWVuIGxvYWRlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gY29tcGxldGVDYWxsYmFjay5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgZXJyb3IuIElmIGFsbCBhc3NldHMgYXJlIGxvYWRlZCBzdWNjZXNzZnVsbHksIGVycm9yIHdpbGwgYmUgbnVsbC5cclxuICAgICAqIEBwYXJhbSB7QXNzZXRbXXxBcnJheX0gY29tcGxldGVDYWxsYmFjay5hc3NldHMgLSBBbiBhcnJheSBvZiBhbGwgbG9hZGVkIGFzc2V0cy5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSWYgbm90aGluZyB0byBsb2FkLCBhc3NldHMgd2lsbCBiZSBhbiBlbXB0eSBhcnJheS5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGNvbXBsZXRlQ2FsbGJhY2sudXJscyAtIEFuIGFycmF5IHRoYXQgbGlzdHMgYWxsIHRoZSBVUkxzIG9mIGxvYWRlZCBhc3NldHMuXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgcHJvZ3Jlc3NDYWxsYmFjazogKGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBjb21wbGV0ZUNhbGxiYWNrOiAoKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdLCB1cmxzOiBzdHJpbmdbXSkgPT4gdm9pZCl8bnVsbCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgY29tcGxldGVDYWxsYmFjazogKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueVtdLCB1cmxzOiBzdHJpbmdbXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcclxuICAgICAqIGxvYWRSZXNEaXIodXJsOiBzdHJpbmcsIHByb2dyZXNzQ2FsbGJhY2s6IChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgY29tcGxldGVDYWxsYmFjazogKChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnlbXSwgdXJsczogc3RyaW5nW10pID0+IHZvaWQpfG51bGwpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVzRGlyKHVybDogc3RyaW5nLCBjb21wbGV0ZUNhbGxiYWNrOiAoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55W10sIHVybHM6IHN0cmluZ1tdKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZFJlc0Rpcih1cmw6IHN0cmluZyk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgbG9hZFJlc0RpciAodXJsLCB0eXBlLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHsgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gdGhpcy5fcGFyc2VMb2FkUmVzQXJncyh0eXBlLCBwcm9ncmVzc0NhbGxiYWNrLCBjb21wbGV0ZUNhbGxiYWNrKTtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcih1cmwsIHR5cGUsIG9uUHJvZ3Jlc3MsIGZ1bmN0aW9uIChlcnIsIGFzc2V0cykge1xyXG4gICAgICAgICAgICB2YXIgdXJscyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIWVycikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm9zID0gY2MucmVzb3VyY2VzLmdldERpcldpdGhQYXRoKHVybCwgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB1cmxzID0gaW5mb3MubWFwKGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZm8ucGF0aDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIGFzc2V0cywgdXJscyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5nZXRSZXNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2dldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgZ2V0UmVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBPbmx5IGFzc2V0IG9mIHR5cGUgd2lsbCBiZSByZXR1cm5lZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuZ2V0UmVzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MucmVzb3VyY2VzLmdldCBpbnN0ZWFkXHJcbiAgICAgKi9cclxuICAgIGdldFJlcyAodXJsLCB0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuaGFzKHVybCkgPyBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldCh1cmwpIDogY2MucmVzb3VyY2VzLmdldCh1cmwsIHR5cGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRSZXNDb3VudCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmFzc2V0TWFuYWdlci5hc3NldHMuY291bnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5nZXREZXBlbmRzUmVjdXJzaXZlbHlgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgdXNlIHt7I2Nyb3NzTGluayBcIkRlcGVuZFV0aWwvZ2V0RGVwc1JlY3Vyc2l2ZWx5Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmdldERlcGVuZHNSZWN1cnNpdmVseSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuZGVwZW5kVXRpbC5nZXREZXBzUmVjdXJzaXZlbHkgaW5zdGVhZFxyXG4gICAgICogQG1ldGhvZCBnZXREZXBlbmRzUmVjdXJzaXZlbHlcclxuICAgICAqIEBwYXJhbSB7QXNzZXR8U3RyaW5nfSBvd25lciAtIFRoZSBvd25lciBhc3NldCBvciB0aGUgcmVzb3VyY2UgdXJsIG9yIHRoZSBhc3NldCdzIHV1aWRcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5IChvd25lcikge1xyXG4gICAgICAgIGlmICghb3duZXIpIHJldHVybiBbXTtcclxuICAgICAgICByZXR1cm4gZGVwZW5kVXRpbC5nZXREZXBzUmVjdXJzaXZlbHkodHlwZW9mIG93bmVyID09PSAnc3RyaW5nJyA/IG93bmVyIDogb3duZXIuX3V1aWQpLmNvbmNhdChbIG93bmVyLl91dWlkIF0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIuYXNzZXRMb2FkZXJgIHdhcyByZW1vdmVkLCBhc3NldExvYWRlciBhbmQgbWQ1UGlwZSB3ZXJlIG1lcmdlZCBpbnRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci90cmFuc2Zvcm1QaXBlbGluZTpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSBhc3NldExvYWRlclxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmFzc2V0TG9hZGVyIHdhcyByZW1vdmVkLCBhc3NldExvYWRlciBhbmQgbWQ1UGlwZSB3ZXJlIG1lcmdlZCBpbnRvIGNjLmFzc2V0TWFuYWdlci50cmFuc2Zvcm1QaXBlbGluZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0IGFzc2V0TG9hZGVyICgpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLmxvYWRlci5hc3NldExvYWRlciB3YXMgcmVtb3ZlZCwgYXNzZXRMb2FkZXIgYW5kIG1kNVBpcGUgd2VyZSBtZXJnZWQgaW50byBjYy5hc3NldE1hbmFnZXIudHJhbnNmb3JtUGlwZWxpbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5tZDVQaXBlYCBpcyBkZXByZWNhdGVkLCBhc3NldExvYWRlciBhbmQgbWQ1UGlwZSB3ZXJlIG1lcmdlZCBpbnRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci90cmFuc2Zvcm1QaXBlbGluZTpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fVxyXG4gICAgICpcclxuICAgICAqIEBwcm9wZXJ0eSBtZDVQaXBlXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIubWQ1UGlwZSBpcyBkZXByZWNhdGVkLCBhc3NldExvYWRlciBhbmQgbWQ1UGlwZSB3ZXJlIG1lcmdlZCBpbnRvIGNjLmFzc2V0TWFuYWdlci50cmFuc2Zvcm1QaXBlbGluZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0IG1kNVBpcGUgKCkge1xyXG4gICAgICAgIHJldHVybiBtZDVQaXBlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIuZG93bmxvYWRlcmAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvZG93bmxvYWRlcjpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmRvd25sb2FkZXIgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlciBpbnN0ZWFkXHJcbiAgICAgKiBAcHJvcGVydHkgZG93bmxvYWRlclxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0IGRvd25sb2FkZXIgKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmxvYWRlcmAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcGFyc2VyOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAcHJvcGVydHkgbG9hZGVyXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmxvYWRlciBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5wYXJzZXIgaW5zdGVhZFxyXG4gICAgICovXHJcbiAgICBnZXQgbG9hZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLnBhcnNlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLmFkZERvd25sb2FkSGFuZGxlcnNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLnJlZ2lzdGVyYCBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBhZGREb3dubG9hZEhhbmRsZXJzXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXh0TWFwIEN1c3RvbSBzdXBwb3J0ZWQgdHlwZXMgd2l0aCBjb3JyZXNwb25kZWQgaGFuZGxlclxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLmFkZERvd25sb2FkSGFuZGxlcnMgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5yZWdpc3RlciBpbnN0ZWFkXHJcbiAgICAqL1xyXG4gICAgYWRkRG93bmxvYWRIYW5kbGVycyAoZXh0TWFwKSB7XHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oJ2BjYy5sb2FkZXIuYWRkRG93bmxvYWRIYW5kbGVyc2AgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIucmVnaXN0ZXJgIGluc3RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gZXh0TWFwKSB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jID0gZXh0TWFwW3R5cGVdO1xyXG4gICAgICAgICAgICBoYW5kbGVyWycuJyArIHR5cGVdID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgZnVuYyh7dXJsfSwgb25Db21wbGV0ZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLnJlZ2lzdGVyKGhhbmRsZXIpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIuYWRkTG9hZEhhbmRsZXJzYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjYy5hc3NldE1hbmFnZXIucGFyc2VyLnJlZ2lzdGVyYCBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBhZGRMb2FkSGFuZGxlcnNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBleHRNYXAgQ3VzdG9tIHN1cHBvcnRlZCB0eXBlcyB3aXRoIGNvcnJlc3BvbmRlZCBoYW5kbGVyXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuYWRkTG9hZEhhbmRsZXJzIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnBhcnNlci5yZWdpc3RlciBpbnN0ZWFkXHJcbiAgICAgKi9cclxuICAgIGFkZExvYWRIYW5kbGVycyAoZXh0TWFwKSB7XHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oJ2BjYy5sb2FkZXIuYWRkTG9hZEhhbmRsZXJzYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjYy5hc3NldE1hbmFnZXIucGFyc2VyLnJlZ2lzdGVyYCBpbnN0ZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoYW5kbGVyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICBmb3IgKHZhciB0eXBlIGluIGV4dE1hcCkge1xyXG4gICAgICAgICAgICB2YXIgZnVuYyA9IGV4dE1hcFt0eXBlXTtcclxuICAgICAgICAgICAgaGFuZGxlclsnLicgKyB0eXBlXSA9IGZ1bmN0aW9uIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jKHtjb250ZW50OiBmaWxlfSwgb25Db21wbGV0ZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5wYXJzZXIucmVnaXN0ZXIoaGFuZGxlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIGZsb3dJbkRlcHMgKCkge1xyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICBjYy5lcnJvcignY2MubG9hZGVyLmZsb3dJbkRlcHMgd2FzIHJlbW92ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5yZWxlYXNlYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VcclxuICAgICAqIEBwYXJhbSB7QXNzZXR8U3RyaW5nfEFycmF5fSBhc3NldFxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2UgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0IGluc3RlYWRcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZSAoYXNzZXQpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhc3NldCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc3NldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGFzc2V0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSBrZXkgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzQnVpbHRpbiA9IGNjLmFzc2V0TWFuYWdlci5idWlsdGlucy5fYXNzZXRzLmZpbmQoZnVuY3Rpb24gKGFzc2V0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhc3NldHMuZmluZChidWlsdGluQXNzZXQgPT4gYnVpbHRpbkFzc2V0ID09PSBrZXkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNCdWlsdGluKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhc3NldCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnc3RyaW5nJykgYXNzZXQgPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChhc3NldCk7XHJcbiAgICAgICAgICAgIGxldCBpc0J1aWx0aW4gPSBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnMuX2Fzc2V0cy5maW5kKGZ1bmN0aW9uIChhc3NldHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhc3NldHMuZmluZChidWlsdGluQXNzZXQgPT4gYnVpbHRpbkFzc2V0ID09PSBhc3NldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoaXNCdWlsdGluKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQoYXNzZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VBc3NldGAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFzc2V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2VBc3NldCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQgaW5zdGVhZFxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlQXNzZXRcclxuICAgICAqIEBwYXJhbSB7QXNzZXR9IGFzc2V0XHJcbiAgICAgKi9cclxuICAgIHJlbGVhc2VBc3NldCAoYXNzZXQpIHtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KGFzc2V0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VSZXNgIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VSZXM6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIucmVsZWFzZVJlcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlUmVzIGluc3RlYWRcclxuICAgICAqIEBtZXRob2QgcmVsZWFzZVJlc1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgcmVsZWFzZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cclxuICAgICAqL1xyXG4gICAgcmVsZWFzZVJlcyAodXJsLCB0eXBlKSB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLnJlbGVhc2UodXJsLCB0eXBlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLnJlbGVhc2VSZXNEaXJgIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlUmVzOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MubG9hZGVyLnJlbGVhc2VSZXNEaXIgd2FzIHJlbW92ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VSZXMgaW5zdGVhZFxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlUmVzRGlyXHJcbiAgICAgKi9cclxuICAgIHJlbGVhc2VSZXNEaXIgKCkge1xyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICBjYy5lcnJvcignY2MubG9hZGVyLnJlbGVhc2VSZXNEaXIgd2FzIHJlbW92ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldCBpbnN0ZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIucmVsZWFzZUFsbGAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldE1hbmFnZXIvcmVsZWFzZUFsbDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5yZWxlYXNlQWxsIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBbGwgaW5zdGVhZFxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlQWxsXHJcbiAgICAgKi9cclxuICAgIHJlbGVhc2VBbGwgKCkge1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQWxsKCk7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5jbGVhcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIucmVtb3ZlSXRlbWAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5yZW1vdmVgIGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIucmVtb3ZlSXRlbSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5hc3NldHMucmVtb3ZlIGluc3RlYWRcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlSXRlbVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGlkIFRoZSBpZCBvZiB0aGUgaXRlbVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gc3VjY2VlZCBvciBub3RcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlSXRlbSAoa2V5KSB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5yZW1vdmUoa2V5KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBgY2MubG9hZGVyLnNldEF1dG9SZWxlYXNlYCBpcyBkZXByZWNhdGVkLCBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IHNvbWUgYXNzZXQgZnJvbSBhdXRvIHJlbGVhc2luZywgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldC9hZGRSZWY6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGluc3RlYWRcclxuICAgICAqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2UgaXMgZGVwcmVjYXRlZCwgaWYgeW91IHdhbnQgdG8gcHJldmVudCBzb21lIGFzc2V0IGZyb20gYXV0byByZWxlYXNpbmcsIHBsZWFzZSB1c2UgY2MuQXNzZXQuYWRkUmVmIGluc3RlYWRcclxuICAgICAqIEBtZXRob2Qgc2V0QXV0b1JlbGVhc2VcclxuICAgICAqIEBwYXJhbSB7QXNzZXR8U3RyaW5nfSBhc3NldE9yVXJsT3JVdWlkIC0gYXNzZXQgb2JqZWN0IG9yIHRoZSByYXcgYXNzZXQncyB1cmwgb3IgdXVpZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBhdXRvUmVsZWFzZSAtIGluZGljYXRlcyB3aGV0aGVyIHNob3VsZCByZWxlYXNlIGF1dG9tYXRpY2FsbHlcclxuICAgICAqL1xyXG4gICAgc2V0QXV0b1JlbGVhc2UgKGFzc2V0LCBhdXRvUmVsZWFzZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXNzZXQgPT09ICdvYmplY3QnKSBhc3NldCA9IGFzc2V0Ll91dWlkO1xyXG4gICAgICAgIHRoaXMuX2F1dG9SZWxlYXNlU2V0dGluZ1thc3NldF0gPSAhIWF1dG9SZWxlYXNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseWAgaXMgZGVwcmVjYXRlZCwgaWYgeW91IHdhbnQgdG8gcHJldmVudCBzb21lIGFzc2V0IGZyb20gYXV0byByZWxlYXNpbmcsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiQXNzZXQvYWRkUmVmOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBzZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5XHJcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fFN0cmluZ30gYXNzZXRPclVybE9yVXVpZCAtIGFzc2V0IG9iamVjdCBvciB0aGUgcmF3IGFzc2V0J3MgdXJsIG9yIHV1aWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYXV0b1JlbGVhc2UgLSBpbmRpY2F0ZXMgd2hldGhlciBzaG91bGQgcmVsZWFzZSBhdXRvbWF0aWNhbGx5XHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseSBpcyBkZXByZWNhdGVkLCBpZiB5b3Ugd2FudCB0byBwcmV2ZW50IHNvbWUgYXNzZXQgZnJvbSBhdXRvIHJlbGVhc2luZywgcGxlYXNlIHVzZSBjYy5Bc3NldC5hZGRSZWYgaW5zdGVhZFxyXG4gICAgICovXHJcbiAgICBzZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5IChhc3NldCwgYXV0b1JlbGVhc2UpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnb2JqZWN0JykgYXNzZXQgPSBhc3NldC5fdXVpZDtcclxuICAgICAgICBhdXRvUmVsZWFzZSA9ICEhYXV0b1JlbGVhc2U7XHJcbiAgICAgICAgdGhpcy5fYXV0b1JlbGVhc2VTZXR0aW5nW2Fzc2V0XSA9IGF1dG9SZWxlYXNlO1xyXG4gICAgICAgIHZhciBkZXBlbmRzID0gZGVwZW5kVXRpbC5nZXREZXBzUmVjdXJzaXZlbHkoYXNzZXQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVwZW5kcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgZGVwZW5kID0gZGVwZW5kc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b1JlbGVhc2VTZXR0aW5nW2RlcGVuZF0gPSBhdXRvUmVsZWFzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLmxvYWRlci5pc0F1dG9SZWxlYXNlYCBpcyBkZXByZWNhdGVkXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBpc0F1dG9SZWxlYXNlXHJcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fFN0cmluZ30gYXNzZXRPclVybCAtIGFzc2V0IG9iamVjdCBvciB0aGUgcmF3IGFzc2V0J3MgdXJsXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5pc0F1dG9SZWxlYXNlIGlzIGRlcHJlY2F0ZWRcclxuICAgICAqL1xyXG4gICAgaXNBdXRvUmVsZWFzZSAoYXNzZXQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGFzc2V0ID09PSAnb2JqZWN0JykgYXNzZXQgPSBhc3NldC5fdXVpZDtcclxuICAgICAgICByZXR1cm4gISF0aGlzLl9hdXRvUmVsZWFzZVNldHRpbmdbYXNzZXRdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBEb3dubG9hZGVyXHJcbiAqL1xyXG4vKipcclxuICogYGNjLmxvYWRlci5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlYCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9sb2FkQnVuZGxlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAqXHJcbiAqIEBkZXByZWNhdGVkIGNjLmxvYWRlci5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgQXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUgaW5zdGVhZFxyXG4gKiBAbWV0aG9kIGxvYWRTdWJwYWNrYWdlXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gU3VicGFja2FnZSBuYW1lXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb21wbGV0ZUNhbGxiYWNrXSAtICBDYWxsYmFjayBpbnZva2VkIHdoZW4gc3VicGFja2FnZSBsb2FkZWRcclxuICogQHBhcmFtIHtFcnJvcn0gY29tcGxldGVDYWxsYmFjay5lcnJvciAtIGVycm9yIGluZm9ybWF0aW9uXHJcbiAqL1xyXG5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlID0gZnVuY3Rpb24gKG5hbWUsIGNvbXBsZXRlQ2FsbGJhY2spIHtcclxuICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKG5hbWUsIG51bGwsIGNvbXBsZXRlQ2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkIGNjLkFzc2V0TGlicmFyeSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYmFja3VwIHlvdXIgcHJvamVjdCBhbmQgdXBncmFkZSB0byBjYy5hc3NldE1hbmFnZXJcclxuICovXHJcbnZhciBBc3NldExpYnJhcnkgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCBjYy5Bc3NldExpYnJhcnkuaW5pdCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5pbml0IGluc3RlYWRcclxuICAgICAqL1xyXG4gICAgaW5pdCAob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMuaW1wb3J0QmFzZSA9IG9wdGlvbnMubGlicmFyeVBhdGg7XHJcbiAgICAgICAgb3B0aW9ucy5uYXRpdmVCYXNlID0gQ0NfQlVJTEQgPyBvcHRpb25zLnJhd0Fzc2V0c0Jhc2UgOiBvcHRpb25zLmxpYnJhcnlQYXRoO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5pbml0KG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnJhd0Fzc2V0cykge1xyXG4gICAgICAgICAgICB2YXIgcmVzb3VyY2VzID0gbmV3IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUoKTtcclxuICAgICAgICAgICAgcmVzb3VyY2VzLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogY2MuQXNzZXRNYW5hZ2VyLkJ1aWx0aW5CdW5kbGVOYW1lLlJFU09VUkNFUyxcclxuICAgICAgICAgICAgICAgIGltcG9ydEJhc2U6IG9wdGlvbnMuaW1wb3J0QmFzZSxcclxuICAgICAgICAgICAgICAgIG5hdGl2ZUJhc2U6IG9wdGlvbnMubmF0aXZlQmFzZSxcclxuICAgICAgICAgICAgICAgIHBhdGhzOiBvcHRpb25zLnJhd0Fzc2V0cy5hc3NldHMsXHJcbiAgICAgICAgICAgICAgICB1dWlkczogT2JqZWN0LmtleXMob3B0aW9ucy5yYXdBc3NldHMuYXNzZXRzKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIGNjLkFzc2V0TGlicmFyeSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55IGluc3RlYWRcclxuICAgICAqL1xyXG4gICAgbG9hZEFzc2V0ICh1dWlkLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkodXVpZCwgb25Db21wbGV0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldExpYlVybE5vRXh0ICgpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoJ2NjLkFzc2V0TGlicmFyeS5nZXRMaWJVcmxOb0V4dCB3YXMgcmVtb3ZlZCwgaWYgeW91IHdhbnQgdG8gdHJhbnNmb3JtIHVybCwgcGxlYXNlIHVzZSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQgaW5zdGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcXVlcnlBc3NldEluZm8gKCkge1xyXG4gICAgICAgIGlmIChDQ19ERUJVRykge1xyXG4gICAgICAgICAgICBjYy5lcnJvcignY2MuQXNzZXRMaWJyYXJ5LnF1ZXJ5QXNzZXRJbmZvIHdhcyByZW1vdmVkLCBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZWRpdG9yIGJ5IHVzaW5nIGNjLmFzc2V0TWFuYWdlci5lZGl0b3JFeHRlbmQucXVlcnlBc3NldEluZm8nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogYGNjLnVybGAgaXMgZGVwcmVjYXRlZFxyXG4gKlxyXG4gKiBAZGVwcmVjYXRlZCBjYy51cmwgaXMgZGVwcmVjYXRlZFxyXG4gKiBAY2xhc3MgdXJsXHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmNjLnVybCA9IHtcclxuICAgIG5vcm1hbGl6ZSAodXJsKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy51cmwubm9ybWFsaXplJywgJ2NjLmFzc2V0TWFuYWdlci51dGlscy5ub3JtYWxpemUnKTtcclxuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLm5vcm1hbGl6ZSh1cmwpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGBjYy51cmwucmF3YCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjYy5yZXNvdXJjZXMubG9hZGAgZGlyZWN0bHksIG9yIHVzZSBgQXNzZXQubmF0aXZlVXJsYCBpbnN0ZWFkLlxyXG4gICAgICpcclxuICAgICAqIEBkZXByZWNhdGVkIGNjLnVybC5yYXcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5yZXNvdXJjZXMubG9hZCBkaXJlY3RseSwgb3IgdXNlIEFzc2V0Lm5hdGl2ZVVybCBpbnN0ZWFkLlxyXG4gICAgICogQG1ldGhvZCByYXdcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgcmF3ICh1cmwpIHtcclxuICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLnVybC5yYXcnLCAnY2MucmVzb3VyY2VzLmxvYWQnKTtcclxuICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJ3Jlc291cmNlcy8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLl90cmFuc2Zvcm0oeydwYXRoJzogY2MucGF0aC5jaGFuZ2VFeHRuYW1lKHVybC5zdWJzdHIoMTApKSwgYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVpbHRpbkJ1bmRsZU5hbWUuUkVTT1VSQ0VTLCBfX2lzTmF0aXZlX186IHRydWUsIGV4dDogY2MucGF0aC5leHRuYW1lKHVybCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59O1xyXG5cclxubGV0IG9uY2VXYXJucyA9IHtcclxuICAgIGxvYWRlcjogdHJ1ZSxcclxuICAgIGFzc2V0TGlicmFyeTogdHJ1ZSxcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLCB7XHJcbiAgICBsb2FkZXI6IHtcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvbmNlV2FybnMubG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25jZVdhcm5zLmxvYWRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnY2MubG9hZGVyIGlzIGRlcHJlY2F0ZWQsIHVzZSBjYy5hc3NldE1hbmFnZXIgaW5zdGVhZCBwbGVhc2UuIFNlZSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3JlbGVhc2Utbm90ZXMvYXNzZXQtbWFuYWdlci11cGdyYWRlLWd1aWRlLmh0bWwnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbG9hZGVyO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgQXNzZXRMaWJyYXJ5OiB7XHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob25jZVdhcm5zLmFzc2V0TGlicmFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uY2VXYXJucy5hc3NldExpYnJhcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2NjLkFzc2V0TGlicmFyeSBpcyBkZXByZWNhdGVkLCB1c2UgY2MuYXNzZXRNYW5hZ2VyIGluc3RlYWQgcGxlYXNlLiBTZWUgaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9yZWxlYXNlLW5vdGVzL2Fzc2V0LW1hbmFnZXItdXBncmFkZS1ndWlkZS5odG1sJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEFzc2V0TGlicmFyeTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYGNjLkxvYWRpbmdJdGVtc2Agd2FzIHJlbW92ZWQsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiVGFza1wifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgY2MuTG9hZGluZ0l0ZW1zIHdhcyByZW1vdmVkLCBwbGVhc2UgdXNlIGNjLkFzc2V0TWFuYWdlci5UYXNrIGluc3RlYWRcclxuICAgICAqIEBjbGFzcyBMb2FkaW5nSXRlbXNcclxuICAgICAqL1xyXG4gICAgTG9hZGluZ0l0ZW1zOiB7XHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy5Mb2FkaW5nSXRlbXMnLCAnY2MuQXNzZXRNYW5hZ2VyLlRhc2snKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLkFzc2V0TWFuYWdlci5UYXNrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgUGlwZWxpbmU6IHtcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ2NjLlBpcGVsaW5lJywgJ2NjLkFzc2V0TWFuYWdlci5QaXBlbGluZScpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuQXNzZXRNYW5hZ2VyLlBpcGVsaW5lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5qcy5vYnNvbGV0ZShjYywgJ2NjLlJhd0Fzc2V0JywgJ2NjLkFzc2V0Jyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEFzc2V0XHJcbiAqL1xyXG4vKipcclxuICogYGNjLkFzc2V0LnVybGAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSB7eyNjcm9zc0xpbmsgXCJBc3NldC9uYXRpdmVVcmw6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gaW5zdGVhZFxyXG4gKiBAcHJvcGVydHkgdXJsXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBkZXByZWNhdGVkIGNjLkFzc2V0LnVybCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGNjLkFzc2V0Lm5hdGl2ZVVybCBpbnN0ZWFkXHJcbiAqL1xyXG5qcy5vYnNvbGV0ZShjYy5Bc3NldC5wcm90b3R5cGUsICdjYy5Bc3NldC51cmwnLCAnbmF0aXZlVXJsJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIG1hY3JvXHJcbiAqIEBzdGF0aWNcclxuICovXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLm1hY3JvLCB7XHJcbiAgICAvKipcclxuICAgICAqIGBjYy5tYWNyby5ET1dOTE9BRF9NQVhfQ09OQ1VSUkVOVGAgaXMgZGVwcmVjYXRlZCBub3csIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiRG93bmxvYWRlci9tYXhDb25jdXJyZW5jeTpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBpbnN0ZWFkXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBET1dOTE9BRF9NQVhfQ09OQ1VSUkVOVFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBkZXByZWNhdGVkIGNjLm1hY3JvLkRPV05MT0FEX01BWF9DT05DVVJSRU5UIGlzIGRlcHJlY2F0ZWQgbm93LCBwbGVhc2UgdXNlIGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyLm1heENvbmN1cnJlbmN5IGluc3RlYWRcclxuICAgICAqL1xyXG4gICAgRE9XTkxPQURfTUFYX0NPTkNVUlJFTlQ6IHtcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIubWF4Q29uY3VycmVuY3k7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0ICh2YWwpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIubWF4Q29uY3VycmVuY3kgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5hc3NpZ24oY2MuZGlyZWN0b3IsIHtcclxuICAgIF9nZXRTY2VuZVV1aWQgKHNjZW5lTmFtZSkge1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5tYWluLmdldFNjZW5lSW5mbyhzY2VuZU5hbWUpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLmdhbWUsIHtcclxuICAgIF9zY2VuZUluZm9zOiB7XHJcbiAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lcyA9IFtdO1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubWFpbi5fY29uZmlnLnNjZW5lcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgICAgIHNjZW5lcy5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgcGFyc2VQYXJhbWV0ZXJzID0gdXRpbGl0aWVzLnBhcnNlUGFyYW1ldGVycztcclxudXRpbGl0aWVzLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgcmVzdWx0Lm9uUHJvZ3Jlc3MgPSByZXN1bHQub25Qcm9ncmVzcyB8fCBsb2FkZXIub25Qcm9ncmVzcztcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcblxyXG52YXIgYXV0b1JlbGVhc2UgPSByZWxlYXNlTWFuYWdlci5fYXV0b1JlbGVhc2U7XHJcbnJlbGVhc2VNYW5hZ2VyLl9hdXRvUmVsZWFzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGF1dG9SZWxlYXNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB2YXIgcmVsZWFzZVNldHRpbmdzID0gbG9hZGVyLl9hdXRvUmVsZWFzZVNldHRpbmc7XHJcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlbGVhc2VTZXR0aW5ncyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICBpZiAocmVsZWFzZVNldHRpbmdzW2tleV0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGFzc2V0ID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5nZXQoa2V5KTtcclxuICAgICAgICAgICAgYXNzZXQgJiYgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiLyJ9