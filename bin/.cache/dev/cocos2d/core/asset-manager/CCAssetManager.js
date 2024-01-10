
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/CCAssetManager.js';
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
var preprocess = require('./preprocess');

var fetch = require('./fetch');

var Cache = require('./cache');

var helper = require('./helper');

var releaseManager = require('./releaseManager');

var dependUtil = require('./depend-util');

var load = require('./load');

var Pipeline = require('./pipeline');

var Task = require('./task');

var RequestItem = require('./request-item');

var downloader = require('./downloader');

var parser = require('./parser');

var packManager = require('./pack-manager');

var Bundle = require('./bundle');

var builtins = require('./builtins');

var factory = require('./factory');

var _require = require('./urlTransformer'),
    parse = _require.parse,
    combine = _require.combine;

var _require2 = require('./utilities'),
    parseParameters = _require2.parseParameters,
    asyncify = _require2.asyncify;

var _require3 = require('./shared'),
    assets = _require3.assets,
    files = _require3.files,
    parsed = _require3.parsed,
    pipeline = _require3.pipeline,
    transformPipeline = _require3.transformPipeline,
    fetchPipeline = _require3.fetchPipeline,
    RequestType = _require3.RequestType,
    bundles = _require3.bundles,
    BuiltinBundleName = _require3.BuiltinBundleName;
/**
 * @module cc
 */

/**
 * !#en
 * This module controls asset's behaviors and information, include loading, releasing etc. it is a singleton
 * All member can be accessed with `cc.assetManager`.
 * 
 * !#zh
 * 此模块管理资源的行为和信息，包括加载，释放等，这是一个单例，所有成员能够通过 `cc.assetManager` 调用
 * 
 * @class AssetManager
 */


function AssetManager() {
  this._preprocessPipe = preprocess;
  this._fetchPipe = fetch;
  this._loadPipe = load;
  /**
   * !#en 
   * Normal loading pipeline
   * 
   * !#zh
   * 正常加载管线
   * 
   * @property pipeline
   * @type {Pipeline}
   */

  this.pipeline = pipeline.append(preprocess).append(load);
  /**
   * !#en 
   * Fetching pipeline
   * 
   * !#zh
   * 下载管线
   * 
   * @property fetchPipeline
   * @type {Pipeline}
   */

  this.fetchPipeline = fetchPipeline.append(preprocess).append(fetch);
  /**
   * !#en 
   * Url transformer
   * 
   * !#zh
   * Url 转换器
   * 
   * @property transformPipeline
   * @type {Pipeline}
   */

  this.transformPipeline = transformPipeline.append(parse).append(combine);
  /**
   * !#en 
   * The collection of bundle which is already loaded, you can remove cache with {{#crossLink "AssetManager/removeBundle:method"}}{{/crossLink}}
   * 
   * !#zh
   * 已加载 bundle 的集合， 你能通过 {{#crossLink "AssetManager/removeBundle:method"}}{{/crossLink}} 来移除缓存
   * 
   * @property bundles
   * @type {Cache}
   * @typescript
   * bundles: AssetManager.Cache<AssetManager.Bundle>
   */

  this.bundles = bundles;
  /**
   * !#en 
   * The collection of asset which is already loaded, you can remove cache with {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   * 
   * !#zh
   * 已加载资源的集合， 你能通过 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} 来移除缓存
   * 
   * @property assets
   * @type {Cache}
   * @typescript
   * assets: AssetManager.Cache<cc.Asset>
   */

  this.assets = assets;
  this._files = files;
  this._parsed = parsed;
  this.generalImportBase = '';
  this.generalNativeBase = '';
  /**
   * !#en 
   * Manage relationship between asset and its dependencies
   * 
   * !#zh
   * 管理资源依赖关系
   * 
   * @property dependUtil
   * @type {DependUtil}
   */

  this.dependUtil = dependUtil;
  this._releaseManager = releaseManager;
  /**
   * !#en 
   * Whether or not cache the loaded asset
   * 
   * !#zh
   * 是否缓存已加载的资源
   * 
   * @property cacheAsset
   * @type {boolean}
   */

  this.cacheAsset = true;
  /**
   * !#en 
   * Whether or not load asset forcely, if it is true, asset will be loaded regardless of error
   * 
   * !#zh
   * 是否强制加载资源, 如果为 true ，加载资源将会忽略报错
   * 
   * @property force
   * @type {boolean}
   */

  this.force = false;
  /**
   * !#en 
   * Some useful function
   * 
   * !#zh
   * 一些有用的方法
   * 
   * @property utils
   * @type {Helper}
   */

  this.utils = helper;
  /**
   * !#en 
   * Manage all downloading task
   * 
   * !#zh
   * 管理所有下载任务
   * 
   * @property downloader
   * @type {Downloader}
   */

  this.downloader = downloader;
  /**
   * !#en 
   * Manage all parsing task
   * 
   * !#zh
   * 管理所有解析任务
   * 
   * @property parser
   * @type {Parser}
   */

  this.parser = parser;
  /**
   * !#en 
   * Manage internal asset
   * 
   * !#zh
   * 管理内置资源
   * 
   * @property builtins
   * @type {Builtins}
   */

  this.builtins = builtins;
  /**
   * !#en 
   * Manage all packed asset
   * 
   * !#zh
   * 管理所有合并后的资源
   * 
   * @property packManager
   * @type {PackManager}
   */

  this.packManager = packManager;
  this.factory = factory;
  /**
   * !#en 
   * Cache manager is a module which controls all caches downloaded from server in non-web platform.
   * 
   * !#zh
   * 缓存管理器是一个模块，在非 WEB 平台上，用于管理所有从服务器上下载下来的缓存
   * 
   * @property cacheManager
   * @type {cc.AssetManager.CacheManager}
   * @typescript
   * cacheManager: cc.AssetManager.CacheManager|null
   */

  this.cacheManager = null;
  /**
   * !#en 
   * The preset of options
   * 
   * !#zh
   * 可选参数的预设集
   * 
   * @property presets
   * @type {Object}
   * @typescript
   * presets: Record<string, Record<string, any>>
   */

  this.presets = {
    'default': {
      priority: 0
    },
    'preload': {
      maxConcurrency: 2,
      maxRequestsPerFrame: 2,
      priority: -1
    },
    'scene': {
      maxConcurrency: 8,
      maxRequestsPerFrame: 8,
      priority: 1
    },
    'bundle': {
      maxConcurrency: 8,
      maxRequestsPerFrame: 8,
      priority: 2
    },
    'remote': {
      maxRetryCount: 4
    },
    'script': {
      maxConcurrency: 1024,
      maxRequestsPerFrame: 1024,
      priority: 2
    }
  };
}

AssetManager.Pipeline = Pipeline;
AssetManager.Task = Task;
AssetManager.Cache = Cache;
AssetManager.RequestItem = RequestItem;
AssetManager.Bundle = Bundle;
AssetManager.BuiltinBundleName = BuiltinBundleName;
AssetManager.prototype = {
  constructor: AssetManager,

  /**
   * !#en 
   * The builtin 'main' bundle
   * 
   * !#zh
   * 内置 main 包
   * 
   * @property main
   * @readonly
   * @type {Bundle}
   */
  get main() {
    return bundles.get(BuiltinBundleName.MAIN);
  },

  /**
   * !#en 
   * The builtin 'resources' bundle
   * 
   * !#zh
   * 内置 resources 包
   * 
   * @property resources
   * @readonly
   * @type {Bundle}
   */
  get resources() {
    return bundles.get(BuiltinBundleName.RESOURCES);
  },

  /**
   * !#en 
   * The builtin 'internal' bundle
   * 
   * !#zh
   * 内置 internal 包
   * 
   * @property internal
   * @readonly
   * @type {Bundle}
   */
  get internal() {
    return bundles.get(BuiltinBundleName.INTERNAL);
  },

  /**
   * !#en
   * Initialize assetManager with options
   * 
   * !#zh
   * 初始化资源管理器
   * 
   * @method init
   * @param {Object} options 
   * 
   * @typescript
   * init(options: Record<string, any>): void
   */
  init: function init(options) {
    options = options || Object.create(null);

    this._files.clear();

    this._parsed.clear();

    this._releaseManager.init();

    this.assets.clear();
    this.bundles.clear();
    this.packManager.init();
    this.downloader.init(options.bundleVers, options.server);
    this.parser.init();
    this.dependUtil.init();
    this.generalImportBase = options.importBase;
    this.generalNativeBase = options.nativeBase;
  },

  /**
   * !#en 
   * Get the bundle which has been loaded
   * 
   * !#zh
   * 获取已加载的分包
   * 
   * @method getBundle
   * @param {String} name - The name of bundle 
   * @return {Bundle} - The loaded bundle
   * 
   * @example
   * // ${project}/assets/test1
   * cc.assetManager.getBundle('test1');
   * 
   * cc.assetManager.getBundle('resources');
   * 
   * @typescript
   * getBundle (name: string): cc.AssetManager.Bundle
   */
  getBundle: function getBundle(name) {
    return bundles.get(name);
  },

  /**
   * !#en 
   * Remove this bundle. NOTE: The asset whthin this bundle will not be released automatically, you can call {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} manually before remove it if you need
   * 
   * !#zh 
   * 移除此包, 注意：这个包内的资源不会自动释放, 如果需要的话你可以在摧毁之前手动调用 {{#crossLink "Bundle/releaseAll:method"}}{{/crossLink}} 进行释放
   *
   * @method removeBundle
   * @param {Bundle} bundle - The bundle to be removed 
   * 
   * @typescript
   * removeBundle(bundle: cc.AssetManager.Bundle): void
   */
  removeBundle: function removeBundle(bundle) {
    bundle._destroy();

    bundles.remove(bundle.name);
  },

  /**
   * !#en
   * General interface used to load assets with a progression callback and a complete callback. You can achieve almost all effect you want with combination of `requests` and `options`.
   * It is highly recommended that you use more simple API, such as `load`, `loadDir` etc. Every custom parameter in `options` will be distribute to each of `requests`. 
   * if request already has same one, the parameter in request will be given priority. Besides, if request has dependencies, `options` will distribute to dependencies too.
   * Every custom parameter in `requests` will be tranfered to handler of `downloader` and `parser` as `options`. 
   * You can register you own handler downloader or parser to collect these custom parameters for some effect.
   * 
   * Reserved Keyword: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`
   * `maxRetryCount`, `version`, `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `reload`, `cacheAsset`, `cacheEnabled`,
   * Please DO NOT use these words as custom options!
   * 
   * !#zh
   * 通用加载资源接口，可传入进度回调以及完成回调，通过组合 `request` 和 `options` 参数，几乎可以实现和扩展所有想要的加载效果。非常建议你使用更简单的API，例如 `load`、`loadDir` 等。
   * `options` 中的自定义参数将会分发到 `requests` 的每一项中，如果request中已存在同名的参数则以 `requests` 中为准，同时如果有其他
   * 依赖资源，则 `options` 中的参数会继续向依赖项中分发。request中的自定义参数都会以 `options` 形式传入加载流程中的 `downloader`, `parser` 的方法中, 你可以
   * 扩展 `downloader`, `parser` 收集参数完成想实现的效果。
   * 
   * 保留关键字: `uuid`, `url`, `path`, `dir`, `scene`, `type`, `priority`, `preset`, `audioLoadMode`, `ext`, `bundle`, `onFileProgress`, `maxConcurrency`, `maxRequestsPerFrame`
   * `maxRetryCount`, `version`, `responseType`, `withCredentials`, `mimeType`, `timeout`, `header`, `reload`, `cacheAsset`, `cacheEnabled`,
   * 请不要使用这些字段为自定义参数!
   * 
   * @method loadAny
   * @param {string|string[]|Object|Object[]} requests - The request you want to load
   * @param {Object} [options] - Optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change
   * @param {Number} onProgress.finished - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item - The current request item
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * @param {Object} onComplete.data - The loaded content
   * 
   * @example
   * cc.assetManager.loadAny({url: 'http://example.com/a.png'}, (err, img) => cc.log(img));
   * cc.assetManager.loadAny(['60sVXiTH1D/6Aft4MRt9VC'], (err, assets) => cc.log(assets));
   * cc.assetManager.loadAny([{ uuid: '0cbZa5Y71CTZAccaIFluuZ'}, {url: 'http://example.com/a.png'}], (err, assets) => cc.log(assets));
   * cc.assetManager.downloader.register('.asset', (url, options, onComplete) => {
   *      url += '?userName=' + options.userName + "&password=" + options.password;
   *      cc.assetManager.downloader.downloadFile(url, null, onComplete);
   * });
   * cc.assetManager.parser.register('.asset', (file, options, onComplete) => {
   *      var json = JSON.parse(file);
   *      var skin = json[options.skin];
   *      var model = json[options.model];
   *      onComplete(null, {skin, model});
   * });
   * cc.assetManager.loadAny({ url: 'http://example.com/my.asset', skin: 'xxx', model: 'xxx', userName: 'xxx', password: 'xxx' });
   * 
   * @typescript
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onComplete: (err: Error, data: any) => void): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>): void
   * loadAny(requests: string | string[] | Record<string, any> | Record<string, any>[]): void
   */
  loadAny: function loadAny(requests, options, onProgress, onComplete) {
    var _parseParameters = parseParameters(options, onProgress, onComplete),
        options = _parseParameters.options,
        onProgress = _parseParameters.onProgress,
        onComplete = _parseParameters.onComplete;

    options.preset = options.preset || 'default';
    requests = Array.isArray(requests) ? requests.concat() : requests;
    var task = new Task({
      input: requests,
      onProgress: onProgress,
      onComplete: asyncify(onComplete),
      options: options
    });
    pipeline.async(task);
  },

  /**
   * !#en
   * General interface used to preload assets with a progression callback and a complete callback.It is highly recommended that you use more simple API, such as `preloadRes`, `preloadResDir` etc.
   * Everything about preload is just likes `cc.assetManager.loadAny`, the difference is `cc.assetManager.preloadAny` will only download asset but not parse asset. You need to invoke `cc.assetManager.loadAny(preloadTask)` 
   * to finish loading asset
   * 
   * !#zh
   * 通用预加载资源接口，可传入进度回调以及完成回调，非常建议你使用更简单的 API ，例如 `preloadRes`, `preloadResDir` 等。`preloadAny` 和 `loadAny` 几乎一样，区别在于 `preloadAny` 只会下载资源，不会去解析资源，你需要调用 `cc.assetManager.loadAny(preloadTask)`
   * 来完成资源加载。
   * 
   * @method preloadAny
   * @param {string|string[]|Object|Object[]} requests - The request you want to preload
   * @param {Object} [options] - Optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change
   * @param {Number} onProgress.finished - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item - The current request item
   * @param {Function} [onComplete] - Callback invoked when finish preloading
   * @param {Error} onComplete.err - The error occured in preloading process.
   * @param {RequestItem[]} onComplete.items - The preloaded content
   * 
   * @example
   * cc.assetManager.preloadAny('0cbZa5Y71CTZAccaIFluuZ', (err) => cc.assetManager.loadAny('0cbZa5Y71CTZAccaIFluuZ'));
   * 
   * @typescript
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onProgress: (finished: number, total: number, item: cc.AssetManager.RequestItem) => void, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>, onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], onComplete: (err: Error, items: cc.AssetManager.RequestItem[]) => void): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[], options: Record<string, any>): void
   * preloadAny(requests: string | string[] | Record<string, any> | Record<string, any>[]): void
   */
  preloadAny: function preloadAny(requests, options, onProgress, onComplete) {
    var _parseParameters2 = parseParameters(options, onProgress, onComplete),
        options = _parseParameters2.options,
        onProgress = _parseParameters2.onProgress,
        onComplete = _parseParameters2.onComplete;

    options.preset = options.preset || 'preload';
    requests = Array.isArray(requests) ? requests.concat() : requests;
    var task = new Task({
      input: requests,
      onProgress: onProgress,
      onComplete: asyncify(onComplete),
      options: options
    });
    fetchPipeline.async(task);
  },

  /**
   * !#en
   * Load native file of asset, if you check the option 'Async Load Assets', you may need to load native file with this before you use the asset
   * 
   * !#zh
   * 加载资源的原生文件，如果你勾选了'延迟加载资源'选项，你可能需要在使用资源之前调用此方法来加载原生文件
   * 
   * @method postLoadNative
   * @param {Asset} asset - The asset
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * 
   * @example
   * cc.assetManager.postLoadNative(texture, (err) => console.log(err));
   * 
   * @typescript
   * postLoadNative(asset: cc.Asset, options: Record<string, any>, onComplete: (err: Error) => void): void
   * postLoadNative(asset: cc.Asset, onComplete: (err: Error) => void): void
   * postLoadNative(asset: cc.Asset, options: Record<string, any>): void
   * postLoadNative(asset: cc.Asset): void
   */
  postLoadNative: function postLoadNative(asset, options, onComplete) {
    if (!(asset instanceof cc.Asset)) throw new Error('input is not asset');

    var _parseParameters3 = parseParameters(options, undefined, onComplete),
        options = _parseParameters3.options,
        onComplete = _parseParameters3.onComplete;

    if (!asset._native || asset._nativeAsset) {
      return asyncify(onComplete)(null);
    }

    var depend = dependUtil.getNativeDep(asset._uuid);

    if (depend) {
      if (!bundles.has(depend.bundle)) {
        var bundle = bundles.find(function (bundle) {
          return bundle.getAssetInfo(asset._uuid);
        });

        if (bundle) {
          depend.bundle = bundle.name;
        }
      }

      this.loadAny(depend, options, function (err, _native) {
        if (!err) {
          if (asset.isValid && !asset._nativeAsset) {
            asset._nativeAsset = _native;
          }
        } else {
          cc.error(err.message, err.stack);
        }

        onComplete && onComplete(err);
      });
    }
  },

  /**
   * !#en
   * Load remote asset with url, such as audio, image, text and so on.
   * 
   * !#zh
   * 使用 url 加载远程资源，例如音频，图片，文本等等。
   * 
   * @method loadRemote
   * @param {string} url - The url of asset
   * @param {Object} [options] - Some optional parameters
   * @param {cc.AudioClip.LoadMode} [options.audioLoadMode] - Indicate which mode audio you want to load
   * @param {string} [options.ext] - If the url does not have a extension name, you can specify one manually.
   * @param {Function} [onComplete] - Callback invoked when finish loading
   * @param {Error} onComplete.err - The error occured in loading process.
   * @param {Asset} onComplete.asset - The loaded texture
   * 
   * @example
   * cc.assetManager.loadRemote('http://www.cloud.com/test1.jpg', (err, texture) => console.log(err));
   * cc.assetManager.loadRemote('http://www.cloud.com/test2.mp3', (err, audioClip) => console.log(err));
   * cc.assetManager.loadRemote('http://www.cloud.com/test3', { ext: '.png' }, (err, texture) => console.log(err));
   * 
   * @typescript
   * loadRemote<T extends cc.Asset>(url: string, options: Record<string, any>, onComplete: (err: Error, asset: T) => void): void
   * loadRemote<T extends cc.Asset>(url: string, onComplete: (err: Error, asset: T) => void): void
   * loadRemote<T extends cc.Asset>(url: string, options: Record<string, any>): void
   * loadRemote<T extends cc.Asset>(url: string): void
   */
  loadRemote: function loadRemote(url, options, onComplete) {
    var _parseParameters4 = parseParameters(options, undefined, onComplete),
        options = _parseParameters4.options,
        onComplete = _parseParameters4.onComplete;

    if (this.assets.has(url)) {
      return asyncify(onComplete)(null, this.assets.get(url));
    }

    options.__isNative__ = true;
    options.preset = options.preset || 'remote';
    this.loadAny({
      url: url
    }, options, null, function (err, data) {
      if (err) {
        cc.error(err.message, err.stack);
        onComplete && onComplete(err, null);
      } else {
        factory.create(url, data, options.ext || cc.path.extname(url), options, function (err, out) {
          onComplete && onComplete(err, out);
        });
      }
    });
  },

  /**
   * !#en
   * Load script 
   * 
   * !#zh
   * 加载脚本
   * 
   * @method loadScript
   * @param {string|string[]} url - Url of the script
   * @param {Object} [options] - Some optional paramters
   * @param {boolean} [options.async] - Indicate whether or not loading process should be async
   * @param {Function} [onComplete] - Callback when script loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * 
   * @example
   * loadScript('http://localhost:8080/index.js', null, (err) => console.log(err));
   * 
   * @typescript
   * loadScript(url: string|string[], options: Record<string, any>, onComplete: (err: Error) => void): void
   * loadScript(url: string|string[], onComplete: (err: Error) => void): void
   * loadScript(url: string|string[], options: Record<string, any>): void
   * loadScript(url: string|string[]): void
   */
  loadScript: function loadScript(url, options, onComplete) {
    var _parseParameters5 = parseParameters(options, undefined, onComplete),
        options = _parseParameters5.options,
        onComplete = _parseParameters5.onComplete;

    options.__requestType__ = RequestType.URL;
    options.preset = options.preset || 'script';
    this.loadAny(url, options, onComplete);
  },

  /**
   * !#en
   * load bundle
   * 
   * !#zh
   * 加载资源包
   * 
   * @method loadBundle
   * @param {string} nameOrUrl - The name or root path of bundle
   * @param {Object} [options] - Some optional paramter, same like downloader.downloadFile
   * @param {string} [options.version] - The version of this bundle, you can check config.json in this bundle
   * @param {Function} [onComplete] - Callback when bundle loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Bundle} onComplete.bundle - The loaded bundle
   * 
   * @example
   * loadBundle('http://localhost:8080/test', null, (err, bundle) => console.log(err));
   * 
   * @typescript
   * loadBundle(nameOrUrl: string, options: Record<string, any>, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void
   * loadBundle(nameOrUrl: string, onComplete: (err: Error, bundle: cc.AssetManager.Bundle) => void): void
   * loadBundle(nameOrUrl: string, options: Record<string, any>): void
   * loadBundle(nameOrUrl: string): void
   */
  loadBundle: function loadBundle(nameOrUrl, options, onComplete) {
    var _parseParameters6 = parseParameters(options, undefined, onComplete),
        options = _parseParameters6.options,
        onComplete = _parseParameters6.onComplete;

    var bundleName = cc.path.basename(nameOrUrl);

    if (this.bundles.has(bundleName)) {
      return asyncify(onComplete)(null, this.getBundle(bundleName));
    }

    options.preset = options.preset || 'bundle';
    options.ext = 'bundle';
    this.loadRemote(nameOrUrl, options, onComplete);
  },

  /**
   * !#en
   * Release asset and it's dependencies.
   * This method will not only remove the cache of the asset in assetManager, but also clean up its content.
   * For example, if you release a texture, the texture asset and its gl texture data will be freed up.
   * Notice, this method may cause the texture to be unusable, if there are still other nodes use the same texture, they may turn to black and report gl errors.
   * 
   * !#zh
   * 释放资源以及其依赖资源, 这个方法不仅会从 assetManager 中删除资源的缓存引用，还会清理它的资源内容。
   * 比如说，当你释放一个 texture 资源，这个 texture 和它的 gl 贴图数据都会被释放。
   * 注意，这个函数可能会导致资源贴图或资源所依赖的贴图不可用，如果场景中存在节点仍然依赖同样的贴图，它们可能会变黑并报 GL 错误。
   *
   * @method releaseAsset
   * @param {Asset} asset - The asset to be released
   * 
   * @example
   * // release a texture which is no longer need
   * cc.assetManager.releaseAsset(texture);
   *
   * @typescript
   * releaseAsset(asset: cc.Asset): void
   */
  releaseAsset: function releaseAsset(asset) {
    releaseManager.tryRelease(asset, true);
  },

  /**
   * !#en 
   * Release all unused assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   *
   * @method releaseUnusedAssets
   * @private
   * 
   * @typescript
   * releaseUnusedAssets(): void
   */
  releaseUnusedAssets: function releaseUnusedAssets() {
    assets.forEach(function (asset) {
      releaseManager.tryRelease(asset);
    });
  },

  /**
   * !#en 
   * Release all assets. Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   *
   * @method releaseAll
   * 
   * @typescript
   * releaseAll(): void
   */
  releaseAll: function releaseAll() {
    assets.forEach(function (asset) {
      releaseManager.tryRelease(asset, true);
    });
  },
  _transform: function _transform(input, options) {
    var subTask = Task.create({
      input: input,
      options: options
    });
    var urls = [];

    try {
      var result = transformPipeline.sync(subTask);

      for (var i = 0, l = result.length; i < l; i++) {
        var item = result[i];
        var url = item.url;
        item.recycle();
        urls.push(url);
      }
    } catch (e) {
      for (var i = 0, l = subTask.output.length; i < l; i++) {
        subTask.output[i].recycle();
      }

      cc.error(e.message, e.stack);
    }

    subTask.recycle();
    return urls.length > 1 ? urls : urls[0];
  }
};
cc.AssetManager = AssetManager;
/**
 * @module cc
 */

/**
 * @property assetManager
 * @type {AssetManager}
 */

cc.assetManager = new AssetManager();
Object.defineProperty(cc, 'resources', {
  /**
   * !#en
   * cc.resources is a bundle and controls all asset under assets/resources
   * 
   * !#zh
   * cc.resources 是一个 bundle，用于管理所有在 assets/resources 下的资源
   * 
   * @property resources
   * @readonly
   * @type {AssetManager.Bundle}
   */
  get: function get() {
    return bundles.get(BuiltinBundleName.RESOURCES);
  }
});
module.exports = cc.assetManager;
/**
 * !#en
 * This module controls asset's behaviors and information, include loading, releasing etc. 
 * All member can be accessed with `cc.assetManager`. All class or enum can be accessed with `cc.AssetManager`
 * 
 * !#zh
 * 此模块管理资源的行为和信息，包括加载，释放等，所有成员能够通过 `cc.assetManager` 调用. 所有类型或枚举能通过 `cc.AssetManager` 访问
 * 
 * @module cc.AssetManager
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXENDQXNzZXRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbInByZXByb2Nlc3MiLCJyZXF1aXJlIiwiZmV0Y2giLCJDYWNoZSIsImhlbHBlciIsInJlbGVhc2VNYW5hZ2VyIiwiZGVwZW5kVXRpbCIsImxvYWQiLCJQaXBlbGluZSIsIlRhc2siLCJSZXF1ZXN0SXRlbSIsImRvd25sb2FkZXIiLCJwYXJzZXIiLCJwYWNrTWFuYWdlciIsIkJ1bmRsZSIsImJ1aWx0aW5zIiwiZmFjdG9yeSIsInBhcnNlIiwiY29tYmluZSIsInBhcnNlUGFyYW1ldGVycyIsImFzeW5jaWZ5IiwiYXNzZXRzIiwiZmlsZXMiLCJwYXJzZWQiLCJwaXBlbGluZSIsInRyYW5zZm9ybVBpcGVsaW5lIiwiZmV0Y2hQaXBlbGluZSIsIlJlcXVlc3RUeXBlIiwiYnVuZGxlcyIsIkJ1aWx0aW5CdW5kbGVOYW1lIiwiQXNzZXRNYW5hZ2VyIiwiX3ByZXByb2Nlc3NQaXBlIiwiX2ZldGNoUGlwZSIsIl9sb2FkUGlwZSIsImFwcGVuZCIsIl9maWxlcyIsIl9wYXJzZWQiLCJnZW5lcmFsSW1wb3J0QmFzZSIsImdlbmVyYWxOYXRpdmVCYXNlIiwiX3JlbGVhc2VNYW5hZ2VyIiwiY2FjaGVBc3NldCIsImZvcmNlIiwidXRpbHMiLCJjYWNoZU1hbmFnZXIiLCJwcmVzZXRzIiwicHJpb3JpdHkiLCJtYXhDb25jdXJyZW5jeSIsIm1heFJlcXVlc3RzUGVyRnJhbWUiLCJtYXhSZXRyeUNvdW50IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJtYWluIiwiZ2V0IiwiTUFJTiIsInJlc291cmNlcyIsIlJFU09VUkNFUyIsImludGVybmFsIiwiSU5URVJOQUwiLCJpbml0Iiwib3B0aW9ucyIsIk9iamVjdCIsImNyZWF0ZSIsImNsZWFyIiwiYnVuZGxlVmVycyIsInNlcnZlciIsImltcG9ydEJhc2UiLCJuYXRpdmVCYXNlIiwiZ2V0QnVuZGxlIiwibmFtZSIsInJlbW92ZUJ1bmRsZSIsImJ1bmRsZSIsIl9kZXN0cm95IiwicmVtb3ZlIiwibG9hZEFueSIsInJlcXVlc3RzIiwib25Qcm9ncmVzcyIsIm9uQ29tcGxldGUiLCJwcmVzZXQiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJ0YXNrIiwiaW5wdXQiLCJhc3luYyIsInByZWxvYWRBbnkiLCJwb3N0TG9hZE5hdGl2ZSIsImFzc2V0IiwiY2MiLCJBc3NldCIsIkVycm9yIiwidW5kZWZpbmVkIiwiX25hdGl2ZSIsIl9uYXRpdmVBc3NldCIsImRlcGVuZCIsImdldE5hdGl2ZURlcCIsIl91dWlkIiwiaGFzIiwiZmluZCIsImdldEFzc2V0SW5mbyIsImVyciIsIm5hdGl2ZSIsImlzVmFsaWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGFjayIsImxvYWRSZW1vdGUiLCJ1cmwiLCJfX2lzTmF0aXZlX18iLCJkYXRhIiwiZXh0IiwicGF0aCIsImV4dG5hbWUiLCJvdXQiLCJsb2FkU2NyaXB0IiwiX19yZXF1ZXN0VHlwZV9fIiwiVVJMIiwibG9hZEJ1bmRsZSIsIm5hbWVPclVybCIsImJ1bmRsZU5hbWUiLCJiYXNlbmFtZSIsInJlbGVhc2VBc3NldCIsInRyeVJlbGVhc2UiLCJyZWxlYXNlVW51c2VkQXNzZXRzIiwiZm9yRWFjaCIsInJlbGVhc2VBbGwiLCJfdHJhbnNmb3JtIiwic3ViVGFzayIsInVybHMiLCJyZXN1bHQiLCJzeW5jIiwiaSIsImwiLCJsZW5ndGgiLCJpdGVtIiwicmVjeWNsZSIsInB1c2giLCJlIiwib3V0cHV0IiwiYXNzZXRNYW5hZ2VyIiwiZGVmaW5lUHJvcGVydHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFB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REQsQ0FBQyxFQUFuRCxFQUF1RDtBQUNuREosUUFBQUEsT0FBTyxDQUFDVyxNQUFSLENBQWVQLENBQWYsRUFBa0JJLE9BQWxCO0FBQ0g7O0FBQ0QvQyxNQUFBQSxFQUFFLENBQUNlLEtBQUgsQ0FBU2tDLENBQUMsQ0FBQ2pDLE9BQVgsRUFBb0JpQyxDQUFDLENBQUNoQyxLQUF0QjtBQUNIOztBQUNEc0IsSUFBQUEsT0FBTyxDQUFDUSxPQUFSO0FBQ0EsV0FBT1AsSUFBSSxDQUFDSyxNQUFMLEdBQWMsQ0FBZCxHQUFrQkwsSUFBbEIsR0FBeUJBLElBQUksQ0FBQyxDQUFELENBQXBDO0FBQ0g7QUFqZW9CLENBQXpCO0FBb2VBeEMsRUFBRSxDQUFDekQsWUFBSCxHQUFrQkEsWUFBbEI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F5RCxFQUFFLENBQUNtRCxZQUFILEdBQWtCLElBQUk1RyxZQUFKLEVBQWxCO0FBRUE4QixNQUFNLENBQUMrRSxjQUFQLENBQXNCcEQsRUFBdEIsRUFBMEIsV0FBMUIsRUFBdUM7QUFDbkM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJbkMsRUFBQUEsR0FabUMsaUJBWTVCO0FBQ0gsV0FBT3hCLE9BQU8sQ0FBQ3dCLEdBQVIsQ0FBWXZCLGlCQUFpQixDQUFDMEIsU0FBOUIsQ0FBUDtBQUNIO0FBZGtDLENBQXZDO0FBa0JBcUYsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEQsRUFBRSxDQUFDbUQsWUFBcEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBwcmVwcm9jZXNzID0gcmVxdWlyZSgnLi9wcmVwcm9jZXNzJyk7XHJcbmNvbnN0IGZldGNoID0gcmVxdWlyZSgnLi9mZXRjaCcpO1xyXG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcclxuY29uc3QgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcclxuY29uc3QgcmVsZWFzZU1hbmFnZXIgPSByZXF1aXJlKCcuL3JlbGVhc2VNYW5hZ2VyJyk7XHJcbmNvbnN0IGRlcGVuZFV0aWwgPSByZXF1aXJlKCcuL2RlcGVuZC11dGlsJyk7XHJcbmNvbnN0IGxvYWQgPSByZXF1aXJlKCcuL2xvYWQnKTtcclxuY29uc3QgUGlwZWxpbmUgPSByZXF1aXJlKCcuL3BpcGVsaW5lJyk7XHJcbmNvbnN0IFRhc2sgPSByZXF1aXJlKCcuL3Rhc2snKTtcclxuY29uc3QgUmVxdWVzdEl0ZW0gPSByZXF1aXJlKCcuL3JlcXVlc3QtaXRlbScpO1xyXG5jb25zdCBkb3dubG9hZGVyID0gcmVxdWlyZSgnLi9kb3dubG9hZGVyJyk7XHJcbmNvbnN0IHBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJyk7XHJcbmNvbnN0IHBhY2tNYW5hZ2VyID0gcmVxdWlyZSgnLi9wYWNrLW1hbmFnZXInKTtcclxuY29uc3QgQnVuZGxlID0gcmVxdWlyZSgnLi9idW5kbGUnKTtcclxuY29uc3QgYnVpbHRpbnMgPSByZXF1aXJlKCcuL2J1aWx0aW5zJyk7XHJcbmNvbnN0IGZhY3RvcnkgPSByZXF1aXJlKCcuL2ZhY3RvcnknKTtcclxuY29uc3QgeyBwYXJzZSwgY29tYmluZSB9ID0gcmVxdWlyZSgnLi91cmxUcmFuc2Zvcm1lcicpO1xyXG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycywgYXN5bmNpZnkgfSA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzJyk7XHJcbmNvbnN0IHsgYXNzZXRzLCBmaWxlcywgcGFyc2VkLCBwaXBlbGluZSwgdHJhbnNmb3JtUGlwZWxpbmUsIGZldGNoUGlwZWxpbmUsIFJlcXVlc3RUeXBlLCBidW5kbGVzLCBCdWlsdGluQnVuZGxlTmFtZSB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcclxuXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhpcyBtb2R1bGUgY29udHJvbHMgYXNzZXQncyBiZWhhdmlvcnMgYW5kIGluZm9ybWF0aW9uLCBpbmNsdWRlIGxvYWRpbmcsIHJlbGVhc2luZyBldGMuIGl0IGlzIGEgc2luZ2xldG9uXHJcbiAqIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlcmAuXHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOatpOaooeWdl+euoeeQhui1hOa6kOeahOihjOS4uuWSjOS/oeaBr++8jOWMheaLrOWKoOi9ve+8jOmHiuaUvuetie+8jOi/meaYr+S4gOS4quWNleS+i++8jOaJgOacieaIkOWRmOiDveWkn+mAmui/hyBgY2MuYXNzZXRNYW5hZ2VyYCDosIPnlKhcclxuICogXHJcbiAqIEBjbGFzcyBBc3NldE1hbmFnZXJcclxuICovXHJcbmZ1bmN0aW9uIEFzc2V0TWFuYWdlciAoKSB7XHJcblxyXG4gICAgdGhpcy5fcHJlcHJvY2Vzc1BpcGUgPSBwcmVwcm9jZXNzO1xyXG5cclxuICAgIHRoaXMuX2ZldGNoUGlwZSA9IGZldGNoO1xyXG5cclxuICAgIHRoaXMuX2xvYWRQaXBlID0gbG9hZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBOb3JtYWwgbG9hZGluZyBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmraPluLjliqDovb3nrqHnur9cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHBpcGVsaW5lXHJcbiAgICAgKiBAdHlwZSB7UGlwZWxpbmV9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGlwZWxpbmUgPSBwaXBlbGluZS5hcHBlbmQocHJlcHJvY2VzcykuYXBwZW5kKGxvYWQpO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBGZXRjaGluZyBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkuIvovb3nrqHnur9cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGZldGNoUGlwZWxpbmVcclxuICAgICAqIEB0eXBlIHtQaXBlbGluZX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5mZXRjaFBpcGVsaW5lID0gZmV0Y2hQaXBlbGluZS5hcHBlbmQocHJlcHJvY2VzcykuYXBwZW5kKGZldGNoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBVcmwgdHJhbnNmb3JtZXJcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICogVXJsIOi9rOaNouWZqFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgdHJhbnNmb3JtUGlwZWxpbmVcclxuICAgICAqIEB0eXBlIHtQaXBlbGluZX1cclxuICAgICAqL1xyXG4gICAgdGhpcy50cmFuc2Zvcm1QaXBlbGluZSA9IHRyYW5zZm9ybVBpcGVsaW5lLmFwcGVuZChwYXJzZSkuYXBwZW5kKGNvbWJpbmUpO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgY29sbGVjdGlvbiBvZiBidW5kbGUgd2hpY2ggaXMgYWxyZWFkeSBsb2FkZWQsIHlvdSBjYW4gcmVtb3ZlIGNhY2hlIHdpdGgge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbW92ZUJ1bmRsZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5bey5Yqg6L29IGJ1bmRsZSDnmoTpm4blkIjvvIwg5L2g6IO96YCa6L+HIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZW1vdmVCdW5kbGU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOadpeenu+mZpOe8k+WtmFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgYnVuZGxlc1xyXG4gICAgICogQHR5cGUge0NhY2hlfVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGJ1bmRsZXM6IEFzc2V0TWFuYWdlci5DYWNoZTxBc3NldE1hbmFnZXIuQnVuZGxlPlxyXG4gICAgICovXHJcbiAgICB0aGlzLmJ1bmRsZXMgPSBidW5kbGVzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFRoZSBjb2xsZWN0aW9uIG9mIGFzc2V0IHdoaWNoIGlzIGFscmVhZHkgbG9hZGVkLCB5b3UgY2FuIHJlbW92ZSBjYWNoZSB3aXRoIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOW3suWKoOi9vei1hOa6kOeahOmbhuWQiO+8jCDkvaDog73pgJrov4cge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0g5p2l56e76Zmk57yT5a2YXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBhc3NldHNcclxuICAgICAqIEB0eXBlIHtDYWNoZX1cclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBhc3NldHM6IEFzc2V0TWFuYWdlci5DYWNoZTxjYy5Bc3NldD5cclxuICAgICAqL1xyXG4gICAgdGhpcy5hc3NldHMgPSBhc3NldHM7XHJcbiAgICBcclxuICAgIHRoaXMuX2ZpbGVzID0gZmlsZXM7XHJcbiAgICBcclxuICAgIHRoaXMuX3BhcnNlZCA9IHBhcnNlZDtcclxuXHJcbiAgICB0aGlzLmdlbmVyYWxJbXBvcnRCYXNlID0gJyc7XHJcblxyXG4gICAgdGhpcy5nZW5lcmFsTmF0aXZlQmFzZSA9ICcnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIE1hbmFnZSByZWxhdGlvbnNoaXAgYmV0d2VlbiBhc3NldCBhbmQgaXRzIGRlcGVuZGVuY2llc1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnrqHnkIbotYTmupDkvp3otZblhbPns7tcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGRlcGVuZFV0aWxcclxuICAgICAqIEB0eXBlIHtEZXBlbmRVdGlsfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmRlcGVuZFV0aWwgPSBkZXBlbmRVdGlsO1xyXG5cclxuICAgIHRoaXMuX3JlbGVhc2VNYW5hZ2VyID0gcmVsZWFzZU1hbmFnZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogV2hldGhlciBvciBub3QgY2FjaGUgdGhlIGxvYWRlZCBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmmK/lkKbnvJPlrZjlt7LliqDovb3nmoTotYTmupBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGNhY2hlQXNzZXRcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNhY2hlQXNzZXQgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFdoZXRoZXIgb3Igbm90IGxvYWQgYXNzZXQgZm9yY2VseSwgaWYgaXQgaXMgdHJ1ZSwgYXNzZXQgd2lsbCBiZSBsb2FkZWQgcmVnYXJkbGVzcyBvZiBlcnJvclxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmmK/lkKblvLrliLbliqDovb3otYTmupAsIOWmguaenOS4uiB0cnVlIO+8jOWKoOi9vei1hOa6kOWwhuS8muW/veeVpeaKpemUmVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgZm9yY2VcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZvcmNlID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogU29tZSB1c2VmdWwgZnVuY3Rpb25cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5LiA5Lqb5pyJ55So55qE5pa55rOVXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB1dGlsc1xyXG4gICAgICogQHR5cGUge0hlbHBlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy51dGlscyA9IGhlbHBlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBNYW5hZ2UgYWxsIGRvd25sb2FkaW5nIHRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog566h55CG5omA5pyJ5LiL6L295Lu75YqhXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBkb3dubG9hZGVyXHJcbiAgICAgKiBAdHlwZSB7RG93bmxvYWRlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kb3dubG9hZGVyID0gZG93bmxvYWRlcjsgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogTWFuYWdlIGFsbCBwYXJzaW5nIHRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog566h55CG5omA5pyJ6Kej5p6Q5Lu75YqhXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBwYXJzZXJcclxuICAgICAqIEB0eXBlIHtQYXJzZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGFyc2VyID0gcGFyc2VyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIE1hbmFnZSBpbnRlcm5hbCBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnrqHnkIblhoXnva7otYTmupBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGJ1aWx0aW5zXHJcbiAgICAgKiBAdHlwZSB7QnVpbHRpbnN9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYnVpbHRpbnMgPSBidWlsdGlucztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBNYW5hZ2UgYWxsIHBhY2tlZCBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnrqHnkIbmiYDmnInlkIjlubblkI7nmoTotYTmupBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHBhY2tNYW5hZ2VyXHJcbiAgICAgKiBAdHlwZSB7UGFja01hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGFja01hbmFnZXIgPSBwYWNrTWFuYWdlcjtcclxuXHJcbiAgICB0aGlzLmZhY3RvcnkgPSBmYWN0b3J5O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIENhY2hlIG1hbmFnZXIgaXMgYSBtb2R1bGUgd2hpY2ggY29udHJvbHMgYWxsIGNhY2hlcyBkb3dubG9hZGVkIGZyb20gc2VydmVyIGluIG5vbi13ZWIgcGxhdGZvcm0uXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOe8k+WtmOeuoeeQhuWZqOaYr+S4gOS4quaooeWdl++8jOWcqOmdniBXRUIg5bmz5Y+w5LiK77yM55So5LqO566h55CG5omA5pyJ5LuO5pyN5Yqh5Zmo5LiK5LiL6L295LiL5p2l55qE57yT5a2YXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBjYWNoZU1hbmFnZXJcclxuICAgICAqIEB0eXBlIHtjYy5Bc3NldE1hbmFnZXIuQ2FjaGVNYW5hZ2VyfVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGNhY2hlTWFuYWdlcjogY2MuQXNzZXRNYW5hZ2VyLkNhY2hlTWFuYWdlcnxudWxsXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2FjaGVNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgcHJlc2V0IG9mIG9wdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Y+v6YCJ5Y+C5pWw55qE6aKE6K6+6ZuGXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBwcmVzZXRzXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHByZXNldHM6IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIGFueT4+XHJcbiAgICAgKi9cclxuICAgIHRoaXMucHJlc2V0cyA9IHtcclxuICAgICAgICAnZGVmYXVsdCc6IHtcclxuICAgICAgICAgICAgcHJpb3JpdHk6IDAsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgJ3ByZWxvYWQnOiB7XHJcbiAgICAgICAgICAgIG1heENvbmN1cnJlbmN5OiAyLCBcclxuICAgICAgICAgICAgbWF4UmVxdWVzdHNQZXJGcmFtZTogMixcclxuICAgICAgICAgICAgcHJpb3JpdHk6IC0xLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICdzY2VuZSc6IHtcclxuICAgICAgICAgICAgbWF4Q29uY3VycmVuY3k6IDgsIFxyXG4gICAgICAgICAgICBtYXhSZXF1ZXN0c1BlckZyYW1lOiA4LFxyXG4gICAgICAgICAgICBwcmlvcml0eTogMSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAnYnVuZGxlJzoge1xyXG4gICAgICAgICAgICBtYXhDb25jdXJyZW5jeTogOCwgXHJcbiAgICAgICAgICAgIG1heFJlcXVlc3RzUGVyRnJhbWU6IDgsXHJcbiAgICAgICAgICAgIHByaW9yaXR5OiAyLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgICdyZW1vdGUnOiB7XHJcbiAgICAgICAgICAgIG1heFJldHJ5Q291bnQ6IDRcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAnc2NyaXB0Jzoge1xyXG4gICAgICAgICAgICBtYXhDb25jdXJyZW5jeTogMTAyNCxcclxuICAgICAgICAgICAgbWF4UmVxdWVzdHNQZXJGcmFtZTogMTAyNCxcclxuICAgICAgICAgICAgcHJpb3JpdHk6IDJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5Bc3NldE1hbmFnZXIuUGlwZWxpbmUgPSBQaXBlbGluZTtcclxuQXNzZXRNYW5hZ2VyLlRhc2sgPSBUYXNrO1xyXG5Bc3NldE1hbmFnZXIuQ2FjaGUgPSBDYWNoZTtcclxuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtID0gUmVxdWVzdEl0ZW07XHJcbkFzc2V0TWFuYWdlci5CdW5kbGUgPSBCdW5kbGU7XHJcbkFzc2V0TWFuYWdlci5CdWlsdGluQnVuZGxlTmFtZSA9IEJ1aWx0aW5CdW5kbGVOYW1lO1xyXG5cclxuQXNzZXRNYW5hZ2VyLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcjogQXNzZXRNYW5hZ2VyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFRoZSBidWlsdGluICdtYWluJyBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5YaF572uIG1haW4g5YyFXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBtYWluXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtCdW5kbGV9XHJcbiAgICAgKi9cclxuICAgIGdldCBtYWluICgpIHtcclxuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQoQnVpbHRpbkJ1bmRsZU5hbWUuTUFJTik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFRoZSBidWlsdGluICdyZXNvdXJjZXMnIGJ1bmRsZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhoXnva4gcmVzb3VyY2VzIOWMhVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgcmVzb3VyY2VzXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtCdW5kbGV9XHJcbiAgICAgKi9cclxuICAgIGdldCByZXNvdXJjZXMgKCkge1xyXG4gICAgICAgIHJldHVybiBidW5kbGVzLmdldChCdWlsdGluQnVuZGxlTmFtZS5SRVNPVVJDRVMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgYnVpbHRpbiAnaW50ZXJuYWwnIGJ1bmRsZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlhoXnva4gaW50ZXJuYWwg5YyFXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBpbnRlcm5hbFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QnVuZGxlfVxyXG4gICAgICovXHJcbiAgICBnZXQgaW50ZXJuYWwgKCkge1xyXG4gICAgICAgIHJldHVybiBidW5kbGVzLmdldChCdWlsdGluQnVuZGxlTmFtZS5JTlRFUk5BTCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW5pdGlhbGl6ZSBhc3NldE1hbmFnZXIgd2l0aCBvcHRpb25zXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWIneWni+WMlui1hOa6kOeuoeeQhuWZqFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGluaXRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogaW5pdChvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxyXG4gICAgICovXHJcbiAgICBpbml0IChvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICB0aGlzLl9maWxlcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3BhcnNlZC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3JlbGVhc2VNYW5hZ2VyLmluaXQoKTtcclxuICAgICAgICB0aGlzLmFzc2V0cy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuYnVuZGxlcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMucGFja01hbmFnZXIuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZG93bmxvYWRlci5pbml0KG9wdGlvbnMuYnVuZGxlVmVycywgb3B0aW9ucy5zZXJ2ZXIpO1xyXG4gICAgICAgIHRoaXMucGFyc2VyLmluaXQoKTtcclxuICAgICAgICB0aGlzLmRlcGVuZFV0aWwuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhbEltcG9ydEJhc2UgPSBvcHRpb25zLmltcG9ydEJhc2U7XHJcbiAgICAgICAgdGhpcy5nZW5lcmFsTmF0aXZlQmFzZSA9IG9wdGlvbnMubmF0aXZlQmFzZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogR2V0IHRoZSBidW5kbGUgd2hpY2ggaGFzIGJlZW4gbG9hZGVkXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluW3suWKoOi9veeahOWIhuWMhVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGdldEJ1bmRsZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiBidW5kbGUgXHJcbiAgICAgKiBAcmV0dXJuIHtCdW5kbGV9IC0gVGhlIGxvYWRlZCBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vICR7cHJvamVjdH0vYXNzZXRzL3Rlc3QxXHJcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKCd0ZXN0MScpO1xyXG4gICAgICogXHJcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKCdyZXNvdXJjZXMnKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldEJ1bmRsZSAobmFtZTogc3RyaW5nKTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZVxyXG4gICAgICovXHJcbiAgICBnZXRCdW5kbGUgKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQobmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFJlbW92ZSB0aGlzIGJ1bmRsZS4gTk9URTogVGhlIGFzc2V0IHdodGhpbiB0aGlzIGJ1bmRsZSB3aWxsIG5vdCBiZSByZWxlYXNlZCBhdXRvbWF0aWNhbGx5LCB5b3UgY2FuIGNhbGwge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1hbnVhbGx5IGJlZm9yZSByZW1vdmUgaXQgaWYgeW91IG5lZWRcclxuICAgICAqIFxyXG4gICAgICogISN6aCBcclxuICAgICAqIOenu+mZpOatpOWMhSwg5rOo5oSP77ya6L+Z5Liq5YyF5YaF55qE6LWE5rqQ5LiN5Lya6Ieq5Yqo6YeK5pS+LCDlpoLmnpzpnIDopoHnmoTor53kvaDlj6/ku6XlnKjmkafmr4HkuYvliY3miYvliqjosIPnlKgge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOi/m+ihjOmHiuaUvlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge0J1bmRsZX0gYnVuZGxlIC0gVGhlIGJ1bmRsZSB0byBiZSByZW1vdmVkIFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcmVtb3ZlQnVuZGxlKGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQnVuZGxlIChidW5kbGUpIHtcclxuICAgICAgICBidW5kbGUuX2Rlc3Ryb3koKTtcclxuICAgICAgICBidW5kbGVzLnJlbW92ZShidW5kbGUubmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2VuZXJhbCBpbnRlcmZhY2UgdXNlZCB0byBsb2FkIGFzc2V0cyB3aXRoIGEgcHJvZ3Jlc3Npb24gY2FsbGJhY2sgYW5kIGEgY29tcGxldGUgY2FsbGJhY2suIFlvdSBjYW4gYWNoaWV2ZSBhbG1vc3QgYWxsIGVmZmVjdCB5b3Ugd2FudCB3aXRoIGNvbWJpbmF0aW9uIG9mIGByZXF1ZXN0c2AgYW5kIGBvcHRpb25zYC5cclxuICAgICAqIEl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0aGF0IHlvdSB1c2UgbW9yZSBzaW1wbGUgQVBJLCBzdWNoIGFzIGBsb2FkYCwgYGxvYWREaXJgIGV0Yy4gRXZlcnkgY3VzdG9tIHBhcmFtZXRlciBpbiBgb3B0aW9uc2Agd2lsbCBiZSBkaXN0cmlidXRlIHRvIGVhY2ggb2YgYHJlcXVlc3RzYC4gXHJcbiAgICAgKiBpZiByZXF1ZXN0IGFscmVhZHkgaGFzIHNhbWUgb25lLCB0aGUgcGFyYW1ldGVyIGluIHJlcXVlc3Qgd2lsbCBiZSBnaXZlbiBwcmlvcml0eS4gQmVzaWRlcywgaWYgcmVxdWVzdCBoYXMgZGVwZW5kZW5jaWVzLCBgb3B0aW9uc2Agd2lsbCBkaXN0cmlidXRlIHRvIGRlcGVuZGVuY2llcyB0b28uXHJcbiAgICAgKiBFdmVyeSBjdXN0b20gcGFyYW1ldGVyIGluIGByZXF1ZXN0c2Agd2lsbCBiZSB0cmFuZmVyZWQgdG8gaGFuZGxlciBvZiBgZG93bmxvYWRlcmAgYW5kIGBwYXJzZXJgIGFzIGBvcHRpb25zYC4gXHJcbiAgICAgKiBZb3UgY2FuIHJlZ2lzdGVyIHlvdSBvd24gaGFuZGxlciBkb3dubG9hZGVyIG9yIHBhcnNlciB0byBjb2xsZWN0IHRoZXNlIGN1c3RvbSBwYXJhbWV0ZXJzIGZvciBzb21lIGVmZmVjdC5cclxuICAgICAqIFxyXG4gICAgICogUmVzZXJ2ZWQgS2V5d29yZDogYHV1aWRgLCBgdXJsYCwgYHBhdGhgLCBgZGlyYCwgYHNjZW5lYCwgYHR5cGVgLCBgcHJpb3JpdHlgLCBgcHJlc2V0YCwgYGF1ZGlvTG9hZE1vZGVgLCBgZXh0YCwgYGJ1bmRsZWAsIGBvbkZpbGVQcm9ncmVzc2AsIGBtYXhDb25jdXJyZW5jeWAsIGBtYXhSZXF1ZXN0c1BlckZyYW1lYFxyXG4gICAgICogYG1heFJldHJ5Q291bnRgLCBgdmVyc2lvbmAsIGByZXNwb25zZVR5cGVgLCBgd2l0aENyZWRlbnRpYWxzYCwgYG1pbWVUeXBlYCwgYHRpbWVvdXRgLCBgaGVhZGVyYCwgYHJlbG9hZGAsIGBjYWNoZUFzc2V0YCwgYGNhY2hlRW5hYmxlZGAsXHJcbiAgICAgKiBQbGVhc2UgRE8gTk9UIHVzZSB0aGVzZSB3b3JkcyBhcyBjdXN0b20gb3B0aW9ucyFcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa55So5Yqg6L296LWE5rqQ5o6l5Y+j77yM5Y+v5Lyg5YWl6L+b5bqm5Zue6LCD5Lul5Y+K5a6M5oiQ5Zue6LCD77yM6YCa6L+H57uE5ZCIIGByZXF1ZXN0YCDlkowgYG9wdGlvbnNgIOWPguaVsO+8jOWHoOS5juWPr+S7peWunueOsOWSjOaJqeWxleaJgOacieaDs+imgeeahOWKoOi9veaViOaenOOAgumdnuW4uOW7uuiuruS9oOS9v+eUqOabtOeugOWNleeahEFQSe+8jOS+i+WmgiBgbG9hZGDjgIFgbG9hZERpcmAg562J44CCXHJcbiAgICAgKiBgb3B0aW9uc2Ag5Lit55qE6Ieq5a6a5LmJ5Y+C5pWw5bCG5Lya5YiG5Y+R5YiwIGByZXF1ZXN0c2Ag55qE5q+P5LiA6aG55Lit77yM5aaC5p6ccmVxdWVzdOS4reW3suWtmOWcqOWQjOWQjeeahOWPguaVsOWImeS7pSBgcmVxdWVzdHNgIOS4reS4uuWHhu+8jOWQjOaXtuWmguaenOacieWFtuS7llxyXG4gICAgICog5L6d6LWW6LWE5rqQ77yM5YiZIGBvcHRpb25zYCDkuK3nmoTlj4LmlbDkvJrnu6fnu63lkJHkvp3otZbpobnkuK3liIblj5HjgIJyZXF1ZXN05Lit55qE6Ieq5a6a5LmJ5Y+C5pWw6YO95Lya5LulIGBvcHRpb25zYCDlvaLlvI/kvKDlhaXliqDovb3mtYHnqIvkuK3nmoQgYGRvd25sb2FkZXJgLCBgcGFyc2VyYCDnmoTmlrnms5XkuK0sIOS9oOWPr+S7pVxyXG4gICAgICog5omp5bGVIGBkb3dubG9hZGVyYCwgYHBhcnNlcmAg5pS26ZuG5Y+C5pWw5a6M5oiQ5oOz5a6e546w55qE5pWI5p6c44CCXHJcbiAgICAgKiBcclxuICAgICAqIOS/neeVmeWFs+mUruWtlzogYHV1aWRgLCBgdXJsYCwgYHBhdGhgLCBgZGlyYCwgYHNjZW5lYCwgYHR5cGVgLCBgcHJpb3JpdHlgLCBgcHJlc2V0YCwgYGF1ZGlvTG9hZE1vZGVgLCBgZXh0YCwgYGJ1bmRsZWAsIGBvbkZpbGVQcm9ncmVzc2AsIGBtYXhDb25jdXJyZW5jeWAsIGBtYXhSZXF1ZXN0c1BlckZyYW1lYFxyXG4gICAgICogYG1heFJldHJ5Q291bnRgLCBgdmVyc2lvbmAsIGByZXNwb25zZVR5cGVgLCBgd2l0aENyZWRlbnRpYWxzYCwgYG1pbWVUeXBlYCwgYHRpbWVvdXRgLCBgaGVhZGVyYCwgYHJlbG9hZGAsIGBjYWNoZUFzc2V0YCwgYGNhY2hlRW5hYmxlZGAsXHJcbiAgICAgKiDor7fkuI3opoHkvb/nlKjov5nkupvlrZfmrrXkuLroh6rlrprkuYnlj4LmlbAhXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgbG9hZEFueVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW118T2JqZWN0fE9iamVjdFtdfSByZXF1ZXN0cyAtIFRoZSByZXF1ZXN0IHlvdSB3YW50IHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2hlZCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBvblByb2dyZXNzLml0ZW0gLSBUaGUgY3VycmVudCByZXF1ZXN0IGl0ZW1cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBmaW5pc2ggbG9hZGluZ1xyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgZXJyb3Igb2NjdXJlZCBpbiBsb2FkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb25Db21wbGV0ZS5kYXRhIC0gVGhlIGxvYWRlZCBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh7dXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL2EucG5nJ30sIChlcnIsIGltZykgPT4gY2MubG9nKGltZykpO1xyXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoWyc2MHNWWGlUSDFELzZBZnQ0TVJ0OVZDJ10sIChlcnIsIGFzc2V0cykgPT4gY2MubG9nKGFzc2V0cykpO1xyXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoW3sgdXVpZDogJzBjYlphNVk3MUNUWkFjY2FJRmx1dVonfSwge3VybDogJ2h0dHA6Ly9leGFtcGxlLmNvbS9hLnBuZyd9XSwgKGVyciwgYXNzZXRzKSA9PiBjYy5sb2coYXNzZXRzKSk7XHJcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5yZWdpc3RlcignLmFzc2V0JywgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkgPT4ge1xyXG4gICAgICogICAgICB1cmwgKz0gJz91c2VyTmFtZT0nICsgb3B0aW9ucy51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgb3B0aW9ucy5wYXNzd29yZDtcclxuICAgICAqICAgICAgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXIuZG93bmxvYWRGaWxlKHVybCwgbnVsbCwgb25Db21wbGV0ZSk7XHJcbiAgICAgKiB9KTtcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5wYXJzZXIucmVnaXN0ZXIoJy5hc3NldCcsIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiB7XHJcbiAgICAgKiAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShmaWxlKTtcclxuICAgICAqICAgICAgdmFyIHNraW4gPSBqc29uW29wdGlvbnMuc2tpbl07XHJcbiAgICAgKiAgICAgIHZhciBtb2RlbCA9IGpzb25bb3B0aW9ucy5tb2RlbF07XHJcbiAgICAgKiAgICAgIG9uQ29tcGxldGUobnVsbCwge3NraW4sIG1vZGVsfSk7XHJcbiAgICAgKiB9KTtcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHsgdXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL215LmFzc2V0Jywgc2tpbjogJ3h4eCcsIG1vZGVsOiAneHh4JywgdXNlck5hbWU6ICd4eHgnLCBwYXNzd29yZDogJ3h4eCcgfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICAgKiBsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10pOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWRBbnkgKHJlcXVlc3RzLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG9wdGlvbnMucHJlc2V0ID0gb3B0aW9ucy5wcmVzZXQgfHwgJ2RlZmF1bHQnO1xyXG4gICAgICAgIHJlcXVlc3RzID0gQXJyYXkuaXNBcnJheShyZXF1ZXN0cykgPyByZXF1ZXN0cy5jb25jYXQoKSA6IHJlcXVlc3RzO1xyXG4gICAgICAgIGxldCB0YXNrID0gbmV3IFRhc2soe2lucHV0OiByZXF1ZXN0cywgb25Qcm9ncmVzcywgb25Db21wbGV0ZTogYXN5bmNpZnkob25Db21wbGV0ZSksIG9wdGlvbnN9KTtcclxuICAgICAgICBwaXBlbGluZS5hc3luYyh0YXNrKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZW5lcmFsIGludGVyZmFjZSB1c2VkIHRvIHByZWxvYWQgYXNzZXRzIHdpdGggYSBwcm9ncmVzc2lvbiBjYWxsYmFjayBhbmQgYSBjb21wbGV0ZSBjYWxsYmFjay5JdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdGhhdCB5b3UgdXNlIG1vcmUgc2ltcGxlIEFQSSwgc3VjaCBhcyBgcHJlbG9hZFJlc2AsIGBwcmVsb2FkUmVzRGlyYCBldGMuXHJcbiAgICAgKiBFdmVyeXRoaW5nIGFib3V0IHByZWxvYWQgaXMganVzdCBsaWtlcyBgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnlgLCB0aGUgZGlmZmVyZW5jZSBpcyBgY2MuYXNzZXRNYW5hZ2VyLnByZWxvYWRBbnlgIHdpbGwgb25seSBkb3dubG9hZCBhc3NldCBidXQgbm90IHBhcnNlIGFzc2V0LiBZb3UgbmVlZCB0byBpbnZva2UgYGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHByZWxvYWRUYXNrKWAgXHJcbiAgICAgKiB0byBmaW5pc2ggbG9hZGluZyBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDpgJrnlKjpooTliqDovb3otYTmupDmjqXlj6PvvIzlj6/kvKDlhaXov5vluqblm57osIPku6Xlj4rlrozmiJDlm57osIPvvIzpnZ7luLjlu7rorq7kvaDkvb/nlKjmm7TnroDljZXnmoQgQVBJIO+8jOS+i+WmgiBgcHJlbG9hZFJlc2AsIGBwcmVsb2FkUmVzRGlyYCDnrYnjgIJgcHJlbG9hZEFueWAg5ZKMIGBsb2FkQW55YCDlh6DkuY7kuIDmoLfvvIzljLrliKvlnKjkuo4gYHByZWxvYWRBbnlgIOWPquS8muS4i+i9vei1hOa6kO+8jOS4jeS8muWOu+ino+aekOi1hOa6kO+8jOS9oOmcgOimgeiwg+eUqCBgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkocHJlbG9hZFRhc2spYFxyXG4gICAgICog5p2l5a6M5oiQ6LWE5rqQ5Yqg6L2944CCXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcHJlbG9hZEFueVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW118T2JqZWN0fE9iamVjdFtdfSByZXF1ZXN0cyAtIFRoZSByZXF1ZXN0IHlvdSB3YW50IHRvIHByZWxvYWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2hlZCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtfSBvblByb2dyZXNzLml0ZW0gLSBUaGUgY3VycmVudCByZXF1ZXN0IGl0ZW1cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBmaW5pc2ggcHJlbG9hZGluZ1xyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgZXJyb3Igb2NjdXJlZCBpbiBwcmVsb2FkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtW119IG9uQ29tcGxldGUuaXRlbXMgLSBUaGUgcHJlbG9hZGVkIGNvbnRlbnRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5wcmVsb2FkQW55KCcwY2JaYTVZNzFDVFpBY2NhSUZsdXVaJywgKGVycikgPT4gY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoJzBjYlphNVk3MUNUWkFjY2FJRmx1dVonKSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uUHJvZ3Jlc3M6IChmaW5pc2hlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBpdGVtczogY2MuQXNzZXRNYW5hZ2VyLlJlcXVlc3RJdGVtW10pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkQW55KHJlcXVlc3RzOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFJlY29yZDxzdHJpbmcsIGFueT4gfCBSZWNvcmQ8c3RyaW5nLCBhbnk+W10pOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHByZWxvYWRBbnkgKHJlcXVlc3RzLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgXHJcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAncHJlbG9hZCc7XHJcbiAgICAgICAgcmVxdWVzdHMgPSBBcnJheS5pc0FycmF5KHJlcXVlc3RzKSA/IHJlcXVlc3RzLmNvbmNhdCgpIDogcmVxdWVzdHM7XHJcbiAgICAgICAgdmFyIHRhc2sgPSBuZXcgVGFzayh7aW5wdXQ6IHJlcXVlc3RzLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlOiBhc3luY2lmeShvbkNvbXBsZXRlKSwgb3B0aW9uc30pO1xyXG4gICAgICAgIGZldGNoUGlwZWxpbmUuYXN5bmModGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogTG9hZCBuYXRpdmUgZmlsZSBvZiBhc3NldCwgaWYgeW91IGNoZWNrIHRoZSBvcHRpb24gJ0FzeW5jIExvYWQgQXNzZXRzJywgeW91IG1heSBuZWVkIHRvIGxvYWQgbmF0aXZlIGZpbGUgd2l0aCB0aGlzIGJlZm9yZSB5b3UgdXNlIHRoZSBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliqDovb3otYTmupDnmoTljp/nlJ/mlofku7bvvIzlpoLmnpzkvaDli77pgInkuoYn5bu26L+f5Yqg6L296LWE5rqQJ+mAiemhue+8jOS9oOWPr+iDvemcgOimgeWcqOS9v+eUqOi1hOa6kOS5i+WJjeiwg+eUqOatpOaWueazleadpeWKoOi9veWOn+eUn+aWh+S7tlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHBvc3RMb2FkTmF0aXZlXHJcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fSBhc3NldCAtIFRoZSBhc3NldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGZpbmlzaCBsb2FkaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBlcnJvciBvY2N1cmVkIGluIGxvYWRpbmcgcHJvY2Vzcy5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0ZXh0dXJlLCAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHBvc3RMb2FkTmF0aXZlKGFzc2V0OiBjYy5Bc3NldCwgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwb3N0TG9hZE5hdGl2ZShhc3NldDogY2MuQXNzZXQsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcG9zdExvYWROYXRpdmUoYXNzZXQ6IGNjLkFzc2V0LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxyXG4gICAgICogcG9zdExvYWROYXRpdmUoYXNzZXQ6IGNjLkFzc2V0KTogdm9pZFxyXG4gICAgICovXHJcbiAgICBwb3N0TG9hZE5hdGl2ZSAoYXNzZXQsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICBpZiAoIShhc3NldCBpbnN0YW5jZW9mIGNjLkFzc2V0KSkgdGhyb3cgbmV3IEVycm9yKCdpbnB1dCBpcyBub3QgYXNzZXQnKTtcclxuICAgICAgICB2YXIgeyBvcHRpb25zLCBvbkNvbXBsZXRlIH0gPSBwYXJzZVBhcmFtZXRlcnMob3B0aW9ucywgdW5kZWZpbmVkLCBvbkNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgaWYgKCFhc3NldC5fbmF0aXZlIHx8IGFzc2V0Ll9uYXRpdmVBc3NldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXN5bmNpZnkob25Db21wbGV0ZSkobnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGVwZW5kID0gZGVwZW5kVXRpbC5nZXROYXRpdmVEZXAoYXNzZXQuX3V1aWQpO1xyXG4gICAgICAgIGlmIChkZXBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKCFidW5kbGVzLmhhcyhkZXBlbmQuYnVuZGxlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1bmRsZSA9IGJ1bmRsZXMuZmluZChmdW5jdGlvbiAoYnVuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZS5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kLmJ1bmRsZSA9IGJ1bmRsZS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRBbnkoZGVwZW5kLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyLCBuYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0LmlzVmFsaWQgJiYgIWFzc2V0Ll9uYXRpdmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhc3NldC5fbmF0aXZlQXNzZXQgPSBuYXRpdmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogTG9hZCByZW1vdGUgYXNzZXQgd2l0aCB1cmwsIHN1Y2ggYXMgYXVkaW8sIGltYWdlLCB0ZXh0IGFuZCBzbyBvbi5cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5L2/55SoIHVybCDliqDovb3ov5znqIvotYTmupDvvIzkvovlpoLpn7PpopHvvIzlm77niYfvvIzmlofmnKznrYnnrYnjgIJcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBsb2FkUmVtb3RlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVGhlIHVybCBvZiBhc3NldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtjYy5BdWRpb0NsaXAuTG9hZE1vZGV9IFtvcHRpb25zLmF1ZGlvTG9hZE1vZGVdIC0gSW5kaWNhdGUgd2hpY2ggbW9kZSBhdWRpbyB5b3Ugd2FudCB0byBsb2FkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMuZXh0XSAtIElmIHRoZSB1cmwgZG9lcyBub3QgaGF2ZSBhIGV4dGVuc2lvbiBuYW1lLCB5b3UgY2FuIHNwZWNpZnkgb25lIG1hbnVhbGx5LlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIGZpbmlzaCBsb2FkaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBlcnJvciBvY2N1cmVkIGluIGxvYWRpbmcgcHJvY2Vzcy5cclxuICAgICAqIEBwYXJhbSB7QXNzZXR9IG9uQ29tcGxldGUuYXNzZXQgLSBUaGUgbG9hZGVkIHRleHR1cmVcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKCdodHRwOi8vd3d3LmNsb3VkLmNvbS90ZXN0MS5qcGcnLCAoZXJyLCB0ZXh0dXJlKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKCdodHRwOi8vd3d3LmNsb3VkLmNvbS90ZXN0Mi5tcDMnLCAoZXJyLCBhdWRpb0NsaXApID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoJ2h0dHA6Ly93d3cuY2xvdWQuY29tL3Rlc3QzJywgeyBleHQ6ICcucG5nJyB9LCAoZXJyLCB0ZXh0dXJlKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxvYWRSZW1vdGU8VCBleHRlbmRzIGNjLkFzc2V0Pih1cmw6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBUKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZFJlbW90ZTxUIGV4dGVuZHMgY2MuQXNzZXQ+KHVybDogc3RyaW5nLCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgYXNzZXQ6IFQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVtb3RlPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICAgKiBsb2FkUmVtb3RlPFQgZXh0ZW5kcyBjYy5Bc3NldD4odXJsOiBzdHJpbmcpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWRSZW1vdGUgKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgICAgIHZhciB7IG9wdGlvbnMsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCB1bmRlZmluZWQsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hc3NldHMuaGFzKHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFzeW5jaWZ5KG9uQ29tcGxldGUpKG51bGwsIHRoaXMuYXNzZXRzLmdldCh1cmwpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMuX19pc05hdGl2ZV9fID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb25zLnByZXNldCA9IG9wdGlvbnMucHJlc2V0IHx8ICdyZW1vdGUnO1xyXG4gICAgICAgIHRoaXMubG9hZEFueSh7dXJsfSwgb3B0aW9ucywgbnVsbCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmFjdG9yeS5jcmVhdGUodXJsLCBkYXRhLCBvcHRpb25zLmV4dCB8fCBjYy5wYXRoLmV4dG5hbWUodXJsKSwgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgb3V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgb3V0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogTG9hZCBzY3JpcHQgXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWKoOi9veiEmuacrFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRTY3JpcHRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSB1cmwgLSBVcmwgb2YgdGhlIHNjcmlwdFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmFzeW5jXSAtIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGxvYWRpbmcgcHJvY2VzcyBzaG91bGQgYmUgYXN5bmNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gc2NyaXB0IGxvYWRlZCBvciBmYWlsZWRcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsb2FkU2NyaXB0KCdodHRwOi8vbG9jYWxob3N0OjgwODAvaW5kZXguanMnLCBudWxsLCAoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGxvYWRTY3JpcHQodXJsOiBzdHJpbmd8c3RyaW5nW10sIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZFNjcmlwdCh1cmw6IHN0cmluZ3xzdHJpbmdbXSwgb25Db21wbGV0ZTogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NyaXB0KHVybDogc3RyaW5nfHN0cmluZ1tdLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxyXG4gICAgICogbG9hZFNjcmlwdCh1cmw6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgbG9hZFNjcmlwdCAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XHJcbiAgICAgICAgb3B0aW9ucy5fX3JlcXVlc3RUeXBlX18gPSBSZXF1ZXN0VHlwZS5VUkw7XHJcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnc2NyaXB0JztcclxuICAgICAgICB0aGlzLmxvYWRBbnkodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBsb2FkIGJ1bmRsZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliqDovb3otYTmupDljIVcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBsb2FkQnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZU9yVXJsIC0gVGhlIG5hbWUgb3Igcm9vdCBwYXRoIG9mIGJ1bmRsZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXIsIHNhbWUgbGlrZSBkb3dubG9hZGVyLmRvd25sb2FkRmlsZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnZlcnNpb25dIC0gVGhlIHZlcnNpb24gb2YgdGhpcyBidW5kbGUsIHlvdSBjYW4gY2hlY2sgY29uZmlnLmpzb24gaW4gdGhpcyBidW5kbGVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gYnVuZGxlIGxvYWRlZCBvciBmYWlsZWRcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0ge0J1bmRsZX0gb25Db21wbGV0ZS5idW5kbGUgLSBUaGUgbG9hZGVkIGJ1bmRsZVxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbG9hZEJ1bmRsZSgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Rlc3QnLCBudWxsLCAoZXJyLCBidW5kbGUpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWRCdW5kbGUobmFtZU9yVXJsOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkQnVuZGxlKG5hbWVPclVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxyXG4gICAgICogbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZyk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgbG9hZEJ1bmRsZSAobmFtZU9yVXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XHJcblxyXG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gY2MucGF0aC5iYXNlbmFtZShuYW1lT3JVcmwpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5idW5kbGVzLmhhcyhidW5kbGVOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXN5bmNpZnkob25Db21wbGV0ZSkobnVsbCwgdGhpcy5nZXRCdW5kbGUoYnVuZGxlTmFtZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnYnVuZGxlJztcclxuICAgICAgICBvcHRpb25zLmV4dCA9ICdidW5kbGUnO1xyXG4gICAgICAgIHRoaXMubG9hZFJlbW90ZShuYW1lT3JVcmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlbGVhc2UgYXNzZXQgYW5kIGl0J3MgZGVwZW5kZW5jaWVzLlxyXG4gICAgICogVGhpcyBtZXRob2Qgd2lsbCBub3Qgb25seSByZW1vdmUgdGhlIGNhY2hlIG9mIHRoZSBhc3NldCBpbiBhc3NldE1hbmFnZXIsIGJ1dCBhbHNvIGNsZWFuIHVwIGl0cyBjb250ZW50LlxyXG4gICAgICogRm9yIGV4YW1wbGUsIGlmIHlvdSByZWxlYXNlIGEgdGV4dHVyZSwgdGhlIHRleHR1cmUgYXNzZXQgYW5kIGl0cyBnbCB0ZXh0dXJlIGRhdGEgd2lsbCBiZSBmcmVlZCB1cC5cclxuICAgICAqIE5vdGljZSwgdGhpcyBtZXRob2QgbWF5IGNhdXNlIHRoZSB0ZXh0dXJlIHRvIGJlIHVudXNhYmxlLCBpZiB0aGVyZSBhcmUgc3RpbGwgb3RoZXIgbm9kZXMgdXNlIHRoZSBzYW1lIHRleHR1cmUsIHRoZXkgbWF5IHR1cm4gdG8gYmxhY2sgYW5kIHJlcG9ydCBnbCBlcnJvcnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOmHiuaUvui1hOa6kOS7peWPiuWFtuS+nei1lui1hOa6kCwg6L+Z5Liq5pa55rOV5LiN5LuF5Lya5LuOIGFzc2V0TWFuYWdlciDkuK3liKDpmaTotYTmupDnmoTnvJPlrZjlvJXnlKjvvIzov5jkvJrmuIXnkIblroPnmoTotYTmupDlhoXlrrnjgIJcclxuICAgICAqIOavlOWmguivtO+8jOW9k+S9oOmHiuaUvuS4gOS4qiB0ZXh0dXJlIOi1hOa6kO+8jOi/meS4qiB0ZXh0dXJlIOWSjOWug+eahCBnbCDotLTlm77mlbDmja7pg73kvJrooqvph4rmlL7jgIJcclxuICAgICAqIOazqOaEj++8jOi/meS4quWHveaVsOWPr+iDveS8muWvvOiHtOi1hOa6kOi0tOWbvuaIlui1hOa6kOaJgOS+nei1lueahOi0tOWbvuS4jeWPr+eUqO+8jOWmguaenOWcuuaZr+S4reWtmOWcqOiKgueCueS7jeeEtuS+nei1luWQjOagt+eahOi0tOWbvu+8jOWug+S7rOWPr+iDveS8muWPmOm7keW5tuaKpSBHTCDplJnor6/jgIJcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VBc3NldFxyXG4gICAgICogQHBhcmFtIHtBc3NldH0gYXNzZXQgLSBUaGUgYXNzZXQgdG8gYmUgcmVsZWFzZWRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHJlbGVhc2UgYSB0ZXh0dXJlIHdoaWNoIGlzIG5vIGxvbmdlciBuZWVkXHJcbiAgICAgKiBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KHRleHR1cmUpO1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZWxlYXNlQXNzZXQoYXNzZXQ6IGNjLkFzc2V0KTogdm9pZFxyXG4gICAgICovXHJcbiAgICByZWxlYXNlQXNzZXQgKGFzc2V0KSB7XHJcbiAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCwgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFJlbGVhc2UgYWxsIHVudXNlZCBhc3NldHMuIFJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDph4rmlL7miYDmnInmsqHmnInnlKjliLDnmoTotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VVbnVzZWRBc3NldHNcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZWxlYXNlVW51c2VkQXNzZXRzKCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZVVudXNlZEFzc2V0cyAoKSB7XHJcbiAgICAgICAgYXNzZXRzLmZvckVhY2goZnVuY3Rpb24gKGFzc2V0KSB7XHJcbiAgICAgICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBSZWxlYXNlIGFsbCBhc3NldHMuIFJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDph4rmlL7miYDmnInotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBc3NldDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VBbGxcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJlbGVhc2VBbGwoKTogdm9pZFxyXG4gICAgICovXHJcbiAgICByZWxlYXNlQWxsICgpIHtcclxuICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcclxuICAgICAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF90cmFuc2Zvcm0gKGlucHV0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHN1YlRhc2sgPSBUYXNrLmNyZWF0ZSh7aW5wdXQsIG9wdGlvbnN9KTtcclxuICAgICAgICB2YXIgdXJscyA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0cmFuc2Zvcm1QaXBlbGluZS5zeW5jKHN1YlRhc2spO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlc3VsdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGl0ZW0udXJsO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5yZWN5Y2xlKCk7XHJcbiAgICAgICAgICAgICAgICB1cmxzLnB1c2godXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHN1YlRhc2sub3V0cHV0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3ViVGFzay5vdXRwdXRbaV0ucmVjeWNsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGUubWVzc2FnZSwgZS5zdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1YlRhc2sucmVjeWNsZSgpO1xyXG4gICAgICAgIHJldHVybiB1cmxzLmxlbmd0aCA+IDEgPyB1cmxzIDogdXJsc1swXTtcclxuICAgIH1cclxufTtcclxuXHJcbmNjLkFzc2V0TWFuYWdlciA9IEFzc2V0TWFuYWdlcjtcclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcbi8qKlxyXG4gKiBAcHJvcGVydHkgYXNzZXRNYW5hZ2VyXHJcbiAqIEB0eXBlIHtBc3NldE1hbmFnZXJ9XHJcbiAqL1xyXG5jYy5hc3NldE1hbmFnZXIgPSBuZXcgQXNzZXRNYW5hZ2VyKCk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY2MsICdyZXNvdXJjZXMnLCB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIGNjLnJlc291cmNlcyBpcyBhIGJ1bmRsZSBhbmQgY29udHJvbHMgYWxsIGFzc2V0IHVuZGVyIGFzc2V0cy9yZXNvdXJjZXNcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICogY2MucmVzb3VyY2VzIOaYr+S4gOS4qiBidW5kbGXvvIznlKjkuo7nrqHnkIbmiYDmnInlnKggYXNzZXRzL3Jlc291cmNlcyDkuIvnmoTotYTmupBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IHJlc291cmNlc1xyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7QXNzZXRNYW5hZ2VyLkJ1bmRsZX1cclxuICAgICAqL1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgICByZXR1cm4gYnVuZGxlcy5nZXQoQnVpbHRpbkJ1bmRsZU5hbWUuUkVTT1VSQ0VTKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5hc3NldE1hbmFnZXI7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBUaGlzIG1vZHVsZSBjb250cm9scyBhc3NldCdzIGJlaGF2aW9ycyBhbmQgaW5mb3JtYXRpb24sIGluY2x1ZGUgbG9hZGluZywgcmVsZWFzaW5nIGV0Yy4gXHJcbiAqIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlcmAuIEFsbCBjbGFzcyBvciBlbnVtIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5Bc3NldE1hbmFnZXJgXHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOatpOaooeWdl+euoeeQhui1hOa6kOeahOihjOS4uuWSjOS/oeaBr++8jOWMheaLrOWKoOi9ve+8jOmHiuaUvuetie+8jOaJgOacieaIkOWRmOiDveWkn+mAmui/hyBgY2MuYXNzZXRNYW5hZ2VyYCDosIPnlKguIOaJgOacieexu+Wei+aIluaemuS4vuiDvemAmui/hyBgY2MuQXNzZXRNYW5hZ2VyYCDorr/pl65cclxuICogXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqLyJdLCJzb3VyY2VSb290IjoiLyJ9