
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/bundle.js';
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
var Config = require('./config');

var releaseManager = require('./releaseManager');

var _require = require('./utilities'),
    parseParameters = _require.parseParameters,
    parseLoadResArgs = _require.parseLoadResArgs;

var _require2 = require('./shared'),
    RequestType = _require2.RequestType,
    assets = _require2.assets,
    bundles = _require2.bundles;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * A bundle contains an amount of assets(includes scene), you can load, preload, release asset which is in this bundle
 * 
 * !#zh
 * 一个包含一定数量资源（包括场景）的包，你可以加载，预加载，释放此包内的资源
 * 
 * @class Bundle
 */


function Bundle() {
  this._config = new Config();
}

Bundle.prototype = {
  /**
   * !#en
   * Create a bundle
   * 
   * !#zh
   * 创建一个 bundle
   * 
   * @method constructor
   * 
   * @typescript
   * constructor()
   */
  constructor: Bundle,

  /**
   * !#en
   * The name of this bundle
   * 
   * !#zh
   * 此 bundle 的名称
   * 
   * @property name
   * @type {string}
   */
  get name() {
    return this._config.name;
  },

  /**
   * !#en
   * The dependency of this bundle
   * 
   * !#zh
   * 此 bundle 的依赖
   * 
   * @property deps
   * @type {string[]}
   */
  get deps() {
    return this._config.deps;
  },

  /**
   * !#en
   * The root path of this bundle, such like 'http://example.com/bundle1'
   * 
   * !#zh
   * 此 bundle 的根路径, 例如 'http://example.com/bundle1'
   * 
   * @property base
   * @type {string}
   */
  get base() {
    return this._config.base;
  },

  /**
   * !#en
   * Get asset's info using path, only valid when asset is in bundle folder.
   *  
   * !#zh
   * 使用 path 获取资源的配置信息
   * 
   * @method getInfoWithPath
   * @param {string} path - The relative path of asset, such as 'images/a'
   * @param {Function} [type] - The constructor of asset, such as  `cc.Texture2D`
   * @returns {Object} The asset info 
   * 
   * @example
   * var info = bundle.getInfoWithPath('image/a', cc.Texture2D);
   * 
   * @typescript
   * getInfoWithPath (path: string, type?: typeof cc.Asset): Record<string, any>
   */
  getInfoWithPath: function getInfoWithPath(path, type) {
    return this._config.getInfoWithPath(path, type);
  },

  /**
   * !#en
   * Get all asset's info within specific folder
   * 
   * !#zh
   * 获取在某个指定文件夹下的所有资源信息
   * 
   * @method getDirWithPath
   * @param {string} path - The relative path of folder, such as 'images'
   * @param {Function} [type] - The constructor should be used to filter paths
   * @param {Array} [out] - The output array
   * @returns {Object[]} Infos
   * 
   * @example 
   * var infos = [];
   * bundle.getDirWithPath('images', cc.Texture2D, infos);
   * 
   * @typescript
   * getDirWithPath (path: string, type: typeof cc.Asset, out: Array<Record<string, any>>): Array<Record<string, any>>
   * getDirWithPath (path: string, type: typeof cc.Asset): Array<Record<string, any>>
   * getDirWithPath (path: string): Array<Record<string, any>>
   */
  getDirWithPath: function getDirWithPath(path, type, out) {
    return this._config.getDirWithPath(path, type, out);
  },

  /**
   * !#en
   * Get asset's info with uuid
   * 
   * !#zh
   * 通过 uuid 获取资源信息
   * 
   * @method getAssetInfo
   * @param {string} uuid - The asset's uuid
   * @returns {Object} info 
   * 
   * @example
   * var info = bundle.getAssetInfo('fcmR3XADNLgJ1ByKhqcC5Z');
   * 
   * @typescript
   * getAssetInfo (uuid: string): Record<string, any>
   */
  getAssetInfo: function getAssetInfo(uuid) {
    return this._config.getAssetInfo(uuid);
  },

  /**
   * !#en
   * Get scene'info with name
   * 
   * !#zh
   * 通过场景名获取场景信息
   * 
   * @method getSceneInfo
   * @param {string} name - The name of scene
   * @return {Object} info
   * 
   * @example
   * var info = bundle.getSceneInfo('first.fire');
   * 
   * @typescript
   * getSceneInfo(name: string): Record<string, any>
   */
  getSceneInfo: function getSceneInfo(name) {
    return this._config.getSceneInfo(name);
  },

  /**
   * !#en
   * Initialize this bundle with options
   * 
   * !#zh
   * 初始化此 bundle
   * 
   * @method init
   * @param {Object} options 
   * 
   * @typescript
   * init(options: Record<string, any>): void
   */
  init: function init(options) {
    this._config.init(options);

    bundles.add(options.name, this);
  },

  /**
   * !#en
   * Load the asset within this bundle by the path which is relative to bundle's path
   * 
   * !#zh
   * 通过相对路径加载分包中的资源。路径是相对分包文件夹路径的相对路径
   *
   * @method load
   * @param {String|String[]} paths - Paths of the target assets.The path is relative to the bundle's folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when all assets loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {Asset|Asset[]} onComplete.assets - The loaded assets.
   *
   * @example
   * // load the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.load('textures/background', cc.Texture2D, (err, texture) => console.log(err));
   * 
   * // load the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.load('music/hit', cc.AudioClip, (err, audio) => console.log(err));
   * 
   * // load the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.load('misc/character/cocos', cc.Prefab, (err, prefab) => console.log(err));
   *
   * // load the sprite frame (${project}/assets/some/xxx/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.load('imgs/cocos', cc.SpriteFrame, null, (err, spriteFrame) => console.log(err));
   * 
   * @typescript
   * load<T extends cc.Asset>(paths: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T) => void): void
   * load<T extends cc.Asset>(paths: string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: T) => void): void
   * load<T extends cc.Asset>(paths: string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string, type: typeof cc.Asset, onComplete?: (error: Error, assets: T) => void): void
   * load<T extends cc.Asset>(paths: string[], type: typeof cc.Asset, onComplete?: (error: Error, assets: Array<T>) => void): void
   * load<T extends cc.Asset>(paths: string, onComplete?: (error: Error, assets: T) => void): void
   * load<T extends cc.Asset>(paths: string[], onComplete?: (error: Error, assets: Array<T>) => void): void
   */
  load: function load(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs.type,
        onProgress = _parseLoadResArgs.onProgress,
        onComplete = _parseLoadResArgs.onComplete;

    cc.assetManager.loadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name,
      __outputAsArray__: Array.isArray(paths)
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload the asset within this bundle by the path which is relative to bundle's path. 
   * After calling this method, you still need to finish loading by calling `Bundle.load`.
   * It will be totally fine to call `Bundle.load` at any time even if the preloading is not
   * yet finished
   * 
   * !#zh
   * 通过相对路径预加载分包中的资源。路径是相对分包文件夹路径的相对路径。调用完后，你仍然需要通过 `Bundle.load` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.load`。
   *
   * @method preload
   * @param {String|String[]} paths - Paths of the target asset.The path is relative to bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {RequestItem} onProgress.item - The finished request item.
   * @param {Function} [onComplete] - Callback invoked when the resource loaded.
   * @param {Error} onComplete.error - The error info or null if loaded successfully.
   * @param {RequestItem[]} onComplete.items - The preloaded items.
   * 
   * @example
   * // preload the texture (${project}/assets/resources/textures/background.jpg) from resources
   * cc.resources.preload('textures/background', cc.Texture2D);
   * 
   * // preload the audio (${project}/assets/resources/music/hit.mp3) from resources
   * cc.resources.preload('music/hit', cc.AudioClip);
   * // wait for while
   * cc.resources.load('music/hit', cc.AudioClip, (err, audioClip) => {});
   * 
   * * // preload the prefab (${project}/assets/bundle1/misc/character/cocos) from bundle1 folder
   * bundle1.preload('misc/character/cocos', cc.Prefab);
   *
   * // load the sprite frame of (${project}/assets/bundle2/imgs/cocos.png) from bundle2 folder
   * bundle2.preload('imgs/cocos', cc.SpriteFrame);
   * // wait for while
   * bundle2.load('imgs/cocos', cc.SpriteFrame, (err, spriteFrame) => {});
   * 
   * @typescript
   * preload(paths: string|string[], type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[], type: typeof cc.Asset): void
   * preload(paths: string|string[], onComplete: (error: Error, items: RequestItem[]) => void): void
   * preload(paths: string|string[]): void
   */
  preload: function preload(paths, type, onProgress, onComplete) {
    var _parseLoadResArgs2 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs2.type,
        onProgress = _parseLoadResArgs2.onProgress,
        onComplete = _parseLoadResArgs2.onComplete;

    cc.assetManager.preloadAny(paths, {
      __requestType__: RequestType.PATH,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Load all assets under a folder inside the bundle folder.<br>
   * <br>
   * Note: All asset paths in Creator use forward slashes, paths using backslashes will not work.
   * 
   * !#zh
   * 加载目标文件夹中的所有资源, 注意：路径中只能使用斜杠，反斜杠将停止工作
   *
   * @method loadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be loaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are loaded successfully, error will be null.
   * @param {Asset[]|Asset} onComplete.assets - An array of all loaded assets.
   * 
   * @example
   * // load all audios (resources/audios/) 
   * cc.resources.loadDir('audios', cc.AudioClip, (err, audios) => {});
   *
   * // load all textures in "resources/imgs/"
   * cc.resources.loadDir('imgs', cc.Texture2D, null, function (err, textures) {
   *     var texture1 = textures[0];
   *     var texture2 = textures[1];
   * });
   * 
   * // load all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.loadDir('misc/characters', cc.Prefab, (err, prefabs) => console.log(err));
   *
   * // load all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.loadDir('skills', cc.SpriteFrame, null, (err, spriteFrames) => console.log(err));
   *
   * @typescript
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string, type: typeof cc.Asset): void
   * loadDir<T extends cc.Asset>(dir: string, onComplete: (error: Error, assets: Array<T>) => void): void
   * loadDir<T extends cc.Asset>(dir: string): void
   */
  loadDir: function loadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs3 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs3.type,
        onProgress = _parseLoadResArgs3.onProgress,
        onComplete = _parseLoadResArgs3.onComplete;

    cc.assetManager.loadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name,
      __outputAsArray__: true
    }, onProgress, onComplete);
  },

  /**
   * !#en
   * Preload all assets under a folder inside the bundle folder.<br> After calling this method, you still need to finish loading by calling `Bundle.loadDir`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh
   * 预加载目标文件夹中的所有资源。调用完后，你仍然需要通过 `Bundle.loadDir` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadDir`。
   *
   * @method preloadDir
   * @param {string} dir - path of the target folder.The path is relative to the bundle folder, extensions must be omitted.
   * @param {Function} [type] - Only asset of type will be preloaded if this argument is supplied.
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - A callback which is called when all assets have been loaded, or an error occurs.
   * @param {Error} onComplete.error - If one of the asset failed, the complete callback is immediately called with the error. If all assets are preloaded successfully, error will be null.
   * @param {RequestItem[]} onComplete.items - An array of all preloaded items.
   * 
   * @example
   * // preload all audios (resources/audios/) 
   * cc.resources.preloadDir('audios', cc.AudioClip);
   *
   * // preload all textures in "resources/imgs/"
   * cc.resources.preloadDir('imgs', cc.Texture2D);
   * // wait for while
   * cc.resources.loadDir('imgs', cc.Texture2D, (err, textures) => {});
   * 
   * // preload all prefabs (${project}/assets/bundle1/misc/characters/) from bundle1 folder
   * bundle1.preloadDir('misc/characters', cc.Prefab);
   *
   * // preload all sprite frame (${project}/assets/some/xxx/bundle2/skills/) from bundle2 folder
   * bundle2.preloadDir('skills', cc.SpriteFrame);
   * // wait for while
   * bundle2.loadDir('skills', cc.SpriteFrame, (err, spriteFrames) => {});
   *                                             
   * @typescript
   * preloadDir(dir: string, type: typeof cc.Asset, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string, type: typeof cc.Asset): void
   * preloadDir(dir: string, onComplete: (error: Error, items: RequestItem[]) => void): void
   * preloadDir(dir: string): void
   */
  preloadDir: function preloadDir(dir, type, onProgress, onComplete) {
    var _parseLoadResArgs4 = parseLoadResArgs(type, onProgress, onComplete),
        type = _parseLoadResArgs4.type,
        onProgress = _parseLoadResArgs4.onProgress,
        onComplete = _parseLoadResArgs4.onComplete;

    cc.assetManager.preloadAny(dir, {
      __requestType__: RequestType.DIR,
      type: type,
      bundle: this.name
    }, onProgress, onComplete);
  },

  /**
   * !#en 
   * Loads the scene within this bundle by its name.  
   * 
   * !#zh 
   * 通过场景名称加载分包中的场景。
   *
   * @method loadScene
   * @param {String} sceneName - The name of the scene to load.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - Callback invoked when progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed.
   * @param {Number} onProgress.total - The total number of the items.
   * @param {Object} onProgress.item - The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene launched.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {SceneAsset} onComplete.sceneAsset - The scene asset
   * 
   * @example
   * bundle1.loadScene('first', (err, sceneAsset) => cc.director.runScene(sceneAsset));
   * 
   * @typescript
   * loadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, onComplete: (error: Error, sceneAsset: cc.SceneAsset) => void): void
   * loadScene(sceneName: string, options: Record<string, any>): void
   * loadScene(sceneName: string): void
   */
  loadScene: function loadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters = parseParameters(options, onProgress, onComplete),
        options = _parseParameters.options,
        onProgress = _parseParameters.onProgress,
        onComplete = _parseParameters.onComplete;

    options.preset = options.preset || 'scene';
    options.bundle = this.name;
    cc.assetManager.loadAny({
      'scene': sceneName
    }, options, onProgress, function (err, sceneAsset) {
      if (err) {
        cc.error(err.message, err.stack);
        onComplete && onComplete(err);
      } else if (sceneAsset instanceof cc.SceneAsset) {
        var scene = sceneAsset.scene;
        scene._id = sceneAsset._uuid;
        scene._name = sceneAsset._name;
        onComplete && onComplete(null, sceneAsset);
      } else {
        onComplete && onComplete(new Error('The asset ' + sceneAsset._uuid + ' is not a scene'));
      }
    });
  },

  /**
   * !#en
   * Preloads the scene within this bundle by its name. After calling this method, you still need to finish loading by calling `Bundle.loadScene` or `cc.director.loadScene`.
   * It will be totally fine to call `Bundle.loadDir` at any time even if the preloading is not yet finished
   * 
   * !#zh 
   * 通过场景名称预加载分包中的场景.调用完后，你仍然需要通过 `Bundle.loadScene` 或 `cc.director.loadScene` 来完成加载。
   * 就算预加载还没完成，你也可以直接调用 `Bundle.loadScene` 或 `cc.director.loadScene`。
   *
   * @method preloadScene
   * @param {String} sceneName - The name of the scene to preload.
   * @param {Object} [options] - Some optional parameters
   * @param {Function} [onProgress] - callback, will be called when the load progression change.
   * @param {Number} onProgress.finish - The number of the items that are already completed
   * @param {Number} onProgress.total - The total number of the items
   * @param {RequestItem} onProgress.item The latest request item
   * @param {Function} [onComplete] - callback, will be called after scene loaded.
   * @param {Error} onComplete.error - null or the error object.
   * 
   * @example
   * bundle1.preloadScene('first');
   * // wait for a while
   * bundle1.loadScene('first', (err, scene) => cc.director.runScene(scene));
   * 
   * @typescript
   * preloadScene(sceneName: string, options: Record<string, any>, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, onProgress: (finish: number, total: number, item: RequestItem) => void, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, onComplete: (error: Error) => void): void
   * preloadScene(sceneName: string, options: Record<string, any>): void
   * preloadScene(sceneName: string): void
   */
  preloadScene: function preloadScene(sceneName, options, onProgress, onComplete) {
    var _parseParameters2 = parseParameters(options, onProgress, onComplete),
        options = _parseParameters2.options,
        onProgress = _parseParameters2.onProgress,
        onComplete = _parseParameters2.onComplete;

    options.bundle = this.name;
    cc.assetManager.preloadAny({
      'scene': sceneName
    }, options, onProgress, function (err) {
      if (err) {
        cc.errorID(1210, sceneName, err.message);
      }

      onComplete && onComplete(err);
    });
  },

  /**
   * !#en
   * Get asset within this bundle by path and type. <br>
   * After you load asset with {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}},
   * you can acquire them by passing the path to this API.
   * 
   * !#zh
   * 通过路径与类型获取资源。在你使用 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 之后，
   * 你能通过传路径通过这个 API 获取到这些资源。
   * 
   * @method get
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be returned if this argument is supplied.
   * @returns {Asset} 
   * 
   * @example
   * bundle1.get('music/hit', cc.AudioClip);
   * 
   * @typescript
   * get<T extends cc.Asset> (path: string, type?: typeof cc.Asset): T
   */
  get: function get(path, type) {
    var info = this.getInfoWithPath(path, type);
    return assets.get(info && info.uuid);
  },

  /**
   * !#en 
   * Release the asset loaded by {{#crossLink "Bundle/load:method"}}{{/crossLink}} or {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} and it's dependencies. 
   * Refer to {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放通过 {{#crossLink "Bundle/load:method"}}{{/crossLink}} 或者 {{#crossLink "Bundle/loadDir:method"}}{{/crossLink}} 加载的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAsset:method"}}{{/crossLink}}
   * 
   * @method release
   * @param {String} path - The path of asset
   * @param {Function} [type] - Only asset of type will be released if this argument is supplied.
   * 
   * @example
   * // release a texture which is no longer need
   * bundle1.release('misc/character/cocos');
   *
   * @typescript
   * release(path: string, type: typeof cc.Asset): void
   * release(path: string): void
   */
  release: function release(path, type) {
    releaseManager.tryRelease(this.get(path, type), true);
  },

  /**
   * !#en 
   * Release all unused assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有没有用到的资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseUnusedAssets
   * @private
   * 
   * @example
   * // release all unused asset within bundle1
   * bundle1.releaseUnusedAssets();
   * 
   * @typescript
   * releaseUnusedAssets(): void
   */
  releaseUnusedAssets: function releaseUnusedAssets() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset);
      }
    });
  },

  /**
   * !#en 
   * Release all assets within this bundle. Refer to {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}} for detailed informations.
   * 
   * !#zh 
   * 释放此包中的所有资源。详细信息请参考 {{#crossLink "AssetManager/releaseAll:method"}}{{/crossLink}}
   *
   * @method releaseAll
   * 
   * @example
   * // release all asset within bundle1
   * bundle1.releaseAll();
   * 
   * @typescript
   * releaseAll(): void
   */
  releaseAll: function releaseAll() {
    var self = this;
    assets.forEach(function (asset) {
      var info = self.getAssetInfo(asset._uuid);

      if (info && !info.redirect) {
        releaseManager.tryRelease(asset, true);
      }
    });
  },
  _destroy: function _destroy() {
    this._config.destroy();
  }
};
module.exports = Bundle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGJ1bmRsZS5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJyZXF1aXJlIiwicmVsZWFzZU1hbmFnZXIiLCJwYXJzZVBhcmFtZXRlcnMiLCJwYXJzZUxvYWRSZXNBcmdzIiwiUmVxdWVzdFR5cGUiLCJhc3NldHMiLCJidW5kbGVzIiwiQnVuZGxlIiwiX2NvbmZpZyIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImRlcHMiLCJiYXNlIiwiZ2V0SW5mb1dpdGhQYXRoIiwicGF0aCIsInR5cGUiLCJnZXREaXJXaXRoUGF0aCIsIm91dCIsImdldEFzc2V0SW5mbyIsInV1aWQiLCJnZXRTY2VuZUluZm8iLCJpbml0Iiwib3B0aW9ucyIsImFkZCIsImxvYWQiLCJwYXRocyIsIm9uUHJvZ3Jlc3MiLCJvbkNvbXBsZXRlIiwiY2MiLCJhc3NldE1hbmFnZXIiLCJsb2FkQW55IiwiX19yZXF1ZXN0VHlwZV9fIiwiUEFUSCIsImJ1bmRsZSIsIl9fb3V0cHV0QXNBcnJheV9fIiwiQXJyYXkiLCJpc0FycmF5IiwicHJlbG9hZCIsInByZWxvYWRBbnkiLCJsb2FkRGlyIiwiZGlyIiwiRElSIiwicHJlbG9hZERpciIsImxvYWRTY2VuZSIsInNjZW5lTmFtZSIsInByZXNldCIsImVyciIsInNjZW5lQXNzZXQiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGFjayIsIlNjZW5lQXNzZXQiLCJzY2VuZSIsIl9pZCIsIl91dWlkIiwiX25hbWUiLCJFcnJvciIsInByZWxvYWRTY2VuZSIsImVycm9ySUQiLCJnZXQiLCJpbmZvIiwicmVsZWFzZSIsInRyeVJlbGVhc2UiLCJyZWxlYXNlVW51c2VkQXNzZXRzIiwic2VsZiIsImZvckVhY2giLCJhc3NldCIsInJlZGlyZWN0IiwicmVsZWFzZUFsbCIsIl9kZXN0cm95IiwiZGVzdHJveSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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QUFDSDtBQW5qQmMsQ0FBbkI7QUF1akJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsRSxNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IENvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnJyk7XHJcbmNvbnN0IHJlbGVhc2VNYW5hZ2VyID0gcmVxdWlyZSgnLi9yZWxlYXNlTWFuYWdlcicpO1xyXG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycywgcGFyc2VMb2FkUmVzQXJncyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcclxuY29uc3QgeyBSZXF1ZXN0VHlwZSwgYXNzZXRzLCBidW5kbGVzIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQSBidW5kbGUgY29udGFpbnMgYW4gYW1vdW50IG9mIGFzc2V0cyhpbmNsdWRlcyBzY2VuZSksIHlvdSBjYW4gbG9hZCwgcHJlbG9hZCwgcmVsZWFzZSBhc3NldCB3aGljaCBpcyBpbiB0aGlzIGJ1bmRsZVxyXG4gKiBcclxuICogISN6aFxyXG4gKiDkuIDkuKrljIXlkKvkuIDlrprmlbDph4/otYTmupDvvIjljIXmi6zlnLrmma/vvInnmoTljIXvvIzkvaDlj6/ku6XliqDovb3vvIzpooTliqDovb3vvIzph4rmlL7mraTljIXlhoXnmoTotYTmupBcclxuICogXHJcbiAqIEBjbGFzcyBCdW5kbGVcclxuICovXHJcbmZ1bmN0aW9uIEJ1bmRsZSAoKSB7XHJcbiAgICB0aGlzLl9jb25maWcgPSBuZXcgQ29uZmlnKCk7XHJcbn1cclxuXHJcbkJ1bmRsZS5wcm90b3R5cGUgPSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlIGEgYnVuZGxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWIm+W7uuS4gOS4qiBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29uc3RydWN0b3IoKVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcjogQnVuZGxlLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhpcyBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5q2kIGJ1bmRsZSDnmoTlkI3np7BcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IG5hbWVcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBuYW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLm5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGRlcGVuZGVuY3kgb2YgdGhpcyBidW5kbGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5q2kIGJ1bmRsZSDnmoTkvp3otZZcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGRlcHNcclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqL1xyXG4gICAgZ2V0IGRlcHMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuZGVwcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgcm9vdCBwYXRoIG9mIHRoaXMgYnVuZGxlLCBzdWNoIGxpa2UgJ2h0dHA6Ly9leGFtcGxlLmNvbS9idW5kbGUxJ1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmraQgYnVuZGxlIOeahOaguei3r+W+hCwg5L6L5aaCICdodHRwOi8vZXhhbXBsZS5jb20vYnVuZGxlMSdcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGJhc2VcclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGdldCBiYXNlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmJhc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGFzc2V0J3MgaW5mbyB1c2luZyBwYXRoLCBvbmx5IHZhbGlkIHdoZW4gYXNzZXQgaXMgaW4gYnVuZGxlIGZvbGRlci5cclxuICAgICAqICBcclxuICAgICAqICEjemhcclxuICAgICAqIOS9v+eUqCBwYXRoIOiOt+WPlui1hOa6kOeahOmFjee9ruS/oeaBr1xyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGdldEluZm9XaXRoUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcmVsYXRpdmUgcGF0aCBvZiBhc3NldCwgc3VjaCBhcyAnaW1hZ2VzL2EnXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHlwZV0gLSBUaGUgY29uc3RydWN0b3Igb2YgYXNzZXQsIHN1Y2ggYXMgIGBjYy5UZXh0dXJlMkRgXHJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgYXNzZXQgaW5mbyBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBpbmZvID0gYnVuZGxlLmdldEluZm9XaXRoUGF0aCgnaW1hZ2UvYScsIGNjLlRleHR1cmUyRCk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBnZXRJbmZvV2l0aFBhdGggKHBhdGg6IHN0cmluZywgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCk6IFJlY29yZDxzdHJpbmcsIGFueT5cclxuICAgICAqL1xyXG4gICAgZ2V0SW5mb1dpdGhQYXRoIChwYXRoLCB0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5nZXRJbmZvV2l0aFBhdGgocGF0aCwgdHlwZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGFsbCBhc3NldCdzIGluZm8gd2l0aGluIHNwZWNpZmljIGZvbGRlclxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5blnKjmn5DkuKrmjIflrprmlofku7blpLnkuIvnmoTmiYDmnInotYTmupDkv6Hmga9cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBnZXREaXJXaXRoUGF0aFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcmVsYXRpdmUgcGF0aCBvZiBmb2xkZXIsIHN1Y2ggYXMgJ2ltYWdlcydcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIFRoZSBjb25zdHJ1Y3RvciBzaG91bGQgYmUgdXNlZCB0byBmaWx0ZXIgcGF0aHNcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFtvdXRdIC0gVGhlIG91dHB1dCBhcnJheVxyXG4gICAgICogQHJldHVybnMge09iamVjdFtdfSBJbmZvc1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZSBcclxuICAgICAqIHZhciBpbmZvcyA9IFtdO1xyXG4gICAgICogYnVuZGxlLmdldERpcldpdGhQYXRoKCdpbWFnZXMnLCBjYy5UZXh0dXJlMkQsIGluZm9zKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldERpcldpdGhQYXRoIChwYXRoOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgb3V0OiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBhbnk+Pik6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XHJcbiAgICAgKiBnZXREaXJXaXRoUGF0aCAocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCBhbnk+PlxyXG4gICAgICogZ2V0RGlyV2l0aFBhdGggKHBhdGg6IHN0cmluZyk6IEFycmF5PFJlY29yZDxzdHJpbmcsIGFueT4+XHJcbiAgICAgKi9cclxuICAgIGdldERpcldpdGhQYXRoIChwYXRoLCB0eXBlLCBvdXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldERpcldpdGhQYXRoKHBhdGgsIHR5cGUsIG91dCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGFzc2V0J3MgaW5mbyB3aXRoIHV1aWRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+HIHV1aWQg6I635Y+W6LWE5rqQ5L+h5oGvXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZ2V0QXNzZXRJbmZvXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXVpZCAtIFRoZSBhc3NldCdzIHV1aWRcclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IGluZm8gXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgaW5mbyA9IGJ1bmRsZS5nZXRBc3NldEluZm8oJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldEFzc2V0SW5mbyAodXVpZDogc3RyaW5nKTogUmVjb3JkPHN0cmluZywgYW55PlxyXG4gICAgICovXHJcbiAgICBnZXRBc3NldEluZm8gKHV1aWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmdldEFzc2V0SW5mbyh1dWlkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgc2NlbmUnaW5mbyB3aXRoIG5hbWVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+H5Zy65pmv5ZCN6I635Y+W5Zy65pmv5L+h5oGvXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZ2V0U2NlbmVJbmZvXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHNjZW5lXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluZm9cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBpbmZvID0gYnVuZGxlLmdldFNjZW5lSW5mbygnZmlyc3QuZmlyZScpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZ2V0U2NlbmVJbmZvKG5hbWU6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIGFueT5cclxuICAgICAqL1xyXG4gICAgZ2V0U2NlbmVJbmZvIChuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5nZXRTY2VuZUluZm8obmFtZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIGJ1bmRsZSB3aXRoIG9wdGlvbnNcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Yid5aeL5YyW5q2kIGJ1bmRsZVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGluaXRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogaW5pdChvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogdm9pZFxyXG4gICAgICovXHJcbiAgICBpbml0IChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLmluaXQob3B0aW9ucyk7XHJcbiAgICAgICAgYnVuZGxlcy5hZGQob3B0aW9ucy5uYW1lLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBMb2FkIHRoZSBhc3NldCB3aXRoaW4gdGhpcyBidW5kbGUgYnkgdGhlIHBhdGggd2hpY2ggaXMgcmVsYXRpdmUgdG8gYnVuZGxlJ3MgcGF0aFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDpgJrov4fnm7jlr7not6/lvoTliqDovb3liIbljIXkuK3nmoTotYTmupDjgILot6/lvoTmmK/nm7jlr7nliIbljIXmlofku7blpLnot6/lvoTnmoTnm7jlr7not6/lvoRcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFN0cmluZ1tdfSBwYXRocyAtIFBhdGhzIG9mIHRoZSB0YXJnZXQgYXNzZXRzLlRoZSBwYXRoIGlzIHJlbGF0aXZlIHRvIHRoZSBidW5kbGUncyBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbX0gb25Qcm9ncmVzcy5pdGVtIC0gVGhlIGZpbmlzaGVkIHJlcXVlc3QgaXRlbS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBhbGwgYXNzZXRzIGxvYWRlZC5cclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgKiBAcGFyYW0ge0Fzc2V0fEFzc2V0W119IG9uQ29tcGxldGUuYXNzZXRzIC0gVGhlIGxvYWRlZCBhc3NldHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIGxvYWQgdGhlIHRleHR1cmUgKCR7cHJvamVjdH0vYXNzZXRzL3Jlc291cmNlcy90ZXh0dXJlcy9iYWNrZ3JvdW5kLmpwZykgZnJvbSByZXNvdXJjZXNcclxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkKCd0ZXh0dXJlcy9iYWNrZ3JvdW5kJywgY2MuVGV4dHVyZTJELCAoZXJyLCB0ZXh0dXJlKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIFxyXG4gICAgICogLy8gbG9hZCB0aGUgYXVkaW8gKCR7cHJvamVjdH0vYXNzZXRzL3Jlc291cmNlcy9tdXNpYy9oaXQubXAzKSBmcm9tIHJlc291cmNlc1xyXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQoJ211c2ljL2hpdCcsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgYXVkaW8pID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBsb2FkIHRoZSBwcmVmYWIgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXIvY29jb3MpIGZyb20gYnVuZGxlMSBmb2xkZXJcclxuICAgICAqIGJ1bmRsZTEubG9hZCgnbWlzYy9jaGFyYWN0ZXIvY29jb3MnLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgKlxyXG4gICAgICogLy8gbG9hZCB0aGUgc3ByaXRlIGZyYW1lICgke3Byb2plY3R9L2Fzc2V0cy9zb21lL3h4eC9idW5kbGUyL2ltZ3MvY29jb3MucG5nKSBmcm9tIGJ1bmRsZTIgZm9sZGVyXHJcbiAgICAgKiBidW5kbGUyLmxvYWQoJ2ltZ3MvY29jb3MnLCBjYy5TcHJpdGVGcmFtZSwgbnVsbCwgKGVyciwgc3ByaXRlRnJhbWUpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBUKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IEFycmF5PFQ+KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogVCkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWQ8VCBleHRlbmRzIGNjLkFzc2V0PihwYXRoczogc3RyaW5nW10sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogQXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkPFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aHM6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlPzogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBUKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlPzogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWQ8VCBleHRlbmRzIGNjLkFzc2V0PihwYXRoczogc3RyaW5nLCBvbkNvbXBsZXRlPzogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBUKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZDxUIGV4dGVuZHMgY2MuQXNzZXQ+KHBhdGhzOiBzdHJpbmdbXSwgb25Db21wbGV0ZT86IChlcnJvcjogRXJyb3IsIGFzc2V0czogQXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWQgKHBhdGhzLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VMb2FkUmVzQXJncyh0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueShwYXRocywgeyBfX3JlcXVlc3RUeXBlX186IFJlcXVlc3RUeXBlLlBBVEgsIHR5cGU6IHR5cGUsIGJ1bmRsZTogdGhpcy5uYW1lLCBfX291dHB1dEFzQXJyYXlfXzogQXJyYXkuaXNBcnJheShwYXRocykgfSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUHJlbG9hZCB0aGUgYXNzZXQgd2l0aGluIHRoaXMgYnVuZGxlIGJ5IHRoZSBwYXRoIHdoaWNoIGlzIHJlbGF0aXZlIHRvIGJ1bmRsZSdzIHBhdGguIFxyXG4gICAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCwgeW91IHN0aWxsIG5lZWQgdG8gZmluaXNoIGxvYWRpbmcgYnkgY2FsbGluZyBgQnVuZGxlLmxvYWRgLlxyXG4gICAgICogSXQgd2lsbCBiZSB0b3RhbGx5IGZpbmUgdG8gY2FsbCBgQnVuZGxlLmxvYWRgIGF0IGFueSB0aW1lIGV2ZW4gaWYgdGhlIHByZWxvYWRpbmcgaXMgbm90XHJcbiAgICAgKiB5ZXQgZmluaXNoZWRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+H55u45a+56Lev5b6E6aKE5Yqg6L295YiG5YyF5Lit55qE6LWE5rqQ44CC6Lev5b6E5piv55u45a+55YiG5YyF5paH5Lu25aS56Lev5b6E55qE55u45a+56Lev5b6E44CC6LCD55So5a6M5ZCO77yM5L2g5LuN54S26ZyA6KaB6YCa6L+HIGBCdW5kbGUubG9hZGAg5p2l5a6M5oiQ5Yqg6L2944CCXHJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYEJ1bmRsZS5sb2FkYOOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgcHJlbG9hZFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8U3RyaW5nW119IHBhdGhzIC0gUGF0aHMgb2YgdGhlIHRhcmdldCBhc3NldC5UaGUgcGF0aCBpcyByZWxhdGl2ZSB0byBidW5kbGUgZm9sZGVyLCBleHRlbnNpb25zIG11c3QgYmUgb21pdHRlZC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIGxvYWRlZCBpZiB0aGlzIGFyZ3VtZW50IGlzIHN1cHBsaWVkLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cclxuICAgICAqIEBwYXJhbSB7UmVxdWVzdEl0ZW19IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBmaW5pc2hlZCByZXF1ZXN0IGl0ZW0uXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIHJlc291cmNlIGxvYWRlZC5cclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyb3IgLSBUaGUgZXJyb3IgaW5mbyBvciBudWxsIGlmIGxvYWRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtW119IG9uQ29tcGxldGUuaXRlbXMgLSBUaGUgcHJlbG9hZGVkIGl0ZW1zLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gcHJlbG9hZCB0aGUgdGV4dHVyZSAoJHtwcm9qZWN0fS9hc3NldHMvcmVzb3VyY2VzL3RleHR1cmVzL2JhY2tncm91bmQuanBnKSBmcm9tIHJlc291cmNlc1xyXG4gICAgICogY2MucmVzb3VyY2VzLnByZWxvYWQoJ3RleHR1cmVzL2JhY2tncm91bmQnLCBjYy5UZXh0dXJlMkQpO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBwcmVsb2FkIHRoZSBhdWRpbyAoJHtwcm9qZWN0fS9hc3NldHMvcmVzb3VyY2VzL211c2ljL2hpdC5tcDMpIGZyb20gcmVzb3VyY2VzXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZCgnbXVzaWMvaGl0JywgY2MuQXVkaW9DbGlwKTtcclxuICAgICAqIC8vIHdhaXQgZm9yIHdoaWxlXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZCgnbXVzaWMvaGl0JywgY2MuQXVkaW9DbGlwLCAoZXJyLCBhdWRpb0NsaXApID0+IHt9KTtcclxuICAgICAqIFxyXG4gICAgICogKiAvLyBwcmVsb2FkIHRoZSBwcmVmYWIgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXIvY29jb3MpIGZyb20gYnVuZGxlMSBmb2xkZXJcclxuICAgICAqIGJ1bmRsZTEucHJlbG9hZCgnbWlzYy9jaGFyYWN0ZXIvY29jb3MnLCBjYy5QcmVmYWIpO1xyXG4gICAgICpcclxuICAgICAqIC8vIGxvYWQgdGhlIHNwcml0ZSBmcmFtZSBvZiAoJHtwcm9qZWN0fS9hc3NldHMvYnVuZGxlMi9pbWdzL2NvY29zLnBuZykgZnJvbSBidW5kbGUyIGZvbGRlclxyXG4gICAgICogYnVuZGxlMi5wcmVsb2FkKCdpbWdzL2NvY29zJywgY2MuU3ByaXRlRnJhbWUpO1xyXG4gICAgICogLy8gd2FpdCBmb3Igd2hpbGVcclxuICAgICAqIGJ1bmRsZTIubG9hZCgnaW1ncy9jb2NvcycsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4ge30pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdLCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZFxyXG4gICAgICogcHJlbG9hZChwYXRoczogc3RyaW5nfHN0cmluZ1tdLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIHByZWxvYWQocGF0aHM6IHN0cmluZ3xzdHJpbmdbXSk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcHJlbG9hZCAocGF0aHMsIHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICB2YXIgeyB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlIH0gPSBwYXJzZUxvYWRSZXNBcmdzKHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5wcmVsb2FkQW55KHBhdGhzLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuUEFUSCwgdHlwZTogdHlwZSwgYnVuZGxlOiB0aGlzLm5hbWUgfSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogTG9hZCBhbGwgYXNzZXRzIHVuZGVyIGEgZm9sZGVyIGluc2lkZSB0aGUgYnVuZGxlIGZvbGRlci48YnI+XHJcbiAgICAgKiA8YnI+XHJcbiAgICAgKiBOb3RlOiBBbGwgYXNzZXQgcGF0aHMgaW4gQ3JlYXRvciB1c2UgZm9yd2FyZCBzbGFzaGVzLCBwYXRocyB1c2luZyBiYWNrc2xhc2hlcyB3aWxsIG5vdCB3b3JrLlxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliqDovb3nm67moIfmlofku7blpLnkuK3nmoTmiYDmnInotYTmupAsIOazqOaEj++8mui3r+W+hOS4reWPquiDveS9v+eUqOaWnOadoO+8jOWPjeaWnOadoOWwhuWBnOatouW3peS9nFxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgbG9hZERpclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpciAtIHBhdGggb2YgdGhlIHRhcmdldCBmb2xkZXIuVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIGJ1bmRsZSBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBhc3NldHMgaGF2ZSBiZWVuIGxvYWRlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJZiBhbGwgYXNzZXRzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5LCBlcnJvciB3aWxsIGJlIG51bGwuXHJcbiAgICAgKiBAcGFyYW0ge0Fzc2V0W118QXNzZXR9IG9uQ29tcGxldGUuYXNzZXRzIC0gQW4gYXJyYXkgb2YgYWxsIGxvYWRlZCBhc3NldHMuXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBsb2FkIGFsbCBhdWRpb3MgKHJlc291cmNlcy9hdWRpb3MvKSBcclxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkRGlyKCdhdWRpb3MnLCBjYy5BdWRpb0NsaXAsIChlcnIsIGF1ZGlvcykgPT4ge30pO1xyXG4gICAgICpcclxuICAgICAqIC8vIGxvYWQgYWxsIHRleHR1cmVzIGluIFwicmVzb3VyY2VzL2ltZ3MvXCJcclxuICAgICAqIGNjLnJlc291cmNlcy5sb2FkRGlyKCdpbWdzJywgY2MuVGV4dHVyZTJELCBudWxsLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlcykge1xyXG4gICAgICogICAgIHZhciB0ZXh0dXJlMSA9IHRleHR1cmVzWzBdO1xyXG4gICAgICogICAgIHZhciB0ZXh0dXJlMiA9IHRleHR1cmVzWzFdO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIGxvYWQgYWxsIHByZWZhYnMgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXJzLykgZnJvbSBidW5kbGUxIGZvbGRlclxyXG4gICAgICogYnVuZGxlMS5sb2FkRGlyKCdtaXNjL2NoYXJhY3RlcnMnLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYnMpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICpcclxuICAgICAqIC8vIGxvYWQgYWxsIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9za2lsbHMvKSBmcm9tIGJ1bmRsZTIgZm9sZGVyXHJcbiAgICAgKiBidW5kbGUyLmxvYWREaXIoJ3NraWxscycsIGNjLlNwcml0ZUZyYW1lLCBudWxsLCAoZXJyLCBzcHJpdGVGcmFtZXMpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgb25Qcm9ncmVzczogKGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBSZXF1ZXN0SXRlbSkgPT4gdm9pZCwgb25Db21wbGV0ZTogKGVycm9yOiBFcnJvciwgYXNzZXRzOiBBcnJheTxUPikgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGxvYWREaXI8VCBleHRlbmRzIGNjLkFzc2V0PihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBhc3NldHM6IEFycmF5PFQ+KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogbG9hZERpcjxUIGV4dGVuZHMgY2MuQXNzZXQ+KGRpcjogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXHJcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGFzc2V0czogQXJyYXk8VD4pID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkRGlyPFQgZXh0ZW5kcyBjYy5Bc3NldD4oZGlyOiBzdHJpbmcpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWREaXIgKGRpciwgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xyXG4gICAgICAgIHZhciB7IHR5cGUsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlTG9hZFJlc0FyZ3ModHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoZGlyLCB7IF9fcmVxdWVzdFR5cGVfXzogUmVxdWVzdFR5cGUuRElSLCB0eXBlOiB0eXBlLCBidW5kbGU6IHRoaXMubmFtZSwgX19vdXRwdXRBc0FycmF5X186IHRydWUgfSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUHJlbG9hZCBhbGwgYXNzZXRzIHVuZGVyIGEgZm9sZGVyIGluc2lkZSB0aGUgYnVuZGxlIGZvbGRlci48YnI+IEFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QsIHlvdSBzdGlsbCBuZWVkIHRvIGZpbmlzaCBsb2FkaW5nIGJ5IGNhbGxpbmcgYEJ1bmRsZS5sb2FkRGlyYC5cclxuICAgICAqIEl0IHdpbGwgYmUgdG90YWxseSBmaW5lIHRvIGNhbGwgYEJ1bmRsZS5sb2FkRGlyYCBhdCBhbnkgdGltZSBldmVuIGlmIHRoZSBwcmVsb2FkaW5nIGlzIG5vdCB5ZXQgZmluaXNoZWRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6aKE5Yqg6L2955uu5qCH5paH5Lu25aS55Lit55qE5omA5pyJ6LWE5rqQ44CC6LCD55So5a6M5ZCO77yM5L2g5LuN54S26ZyA6KaB6YCa6L+HIGBCdW5kbGUubG9hZERpcmAg5p2l5a6M5oiQ5Yqg6L2944CCXHJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYEJ1bmRsZS5sb2FkRGlyYOOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgcHJlbG9hZERpclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRpciAtIHBhdGggb2YgdGhlIHRhcmdldCBmb2xkZXIuVGhlIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIGJ1bmRsZSBmb2xkZXIsIGV4dGVuc2lvbnMgbXVzdCBiZSBvbWl0dGVkLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgcHJlbG9hZGVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBDYWxsYmFjayBpbnZva2VkIHdoZW4gcHJvZ3Jlc3Npb24gY2hhbmdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MuZmluaXNoIC0gVGhlIG51bWJlciBvZiB0aGUgaXRlbXMgdGhhdCBhcmUgYWxyZWFkeSBjb21wbGV0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy50b3RhbCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBBIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aGVuIGFsbCBhc3NldHMgaGF2ZSBiZWVuIGxvYWRlZCwgb3IgYW4gZXJyb3Igb2NjdXJzLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIElmIG9uZSBvZiB0aGUgYXNzZXQgZmFpbGVkLCB0aGUgY29tcGxldGUgY2FsbGJhY2sgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIHdpdGggdGhlIGVycm9yLiBJZiBhbGwgYXNzZXRzIGFyZSBwcmVsb2FkZWQgc3VjY2Vzc2Z1bGx5LCBlcnJvciB3aWxsIGJlIG51bGwuXHJcbiAgICAgKiBAcGFyYW0ge1JlcXVlc3RJdGVtW119IG9uQ29tcGxldGUuaXRlbXMgLSBBbiBhcnJheSBvZiBhbGwgcHJlbG9hZGVkIGl0ZW1zLlxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gcHJlbG9hZCBhbGwgYXVkaW9zIChyZXNvdXJjZXMvYXVkaW9zLykgXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZERpcignYXVkaW9zJywgY2MuQXVkaW9DbGlwKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBwcmVsb2FkIGFsbCB0ZXh0dXJlcyBpbiBcInJlc291cmNlcy9pbWdzL1wiXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMucHJlbG9hZERpcignaW1ncycsIGNjLlRleHR1cmUyRCk7XHJcbiAgICAgKiAvLyB3YWl0IGZvciB3aGlsZVxyXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWREaXIoJ2ltZ3MnLCBjYy5UZXh0dXJlMkQsIChlcnIsIHRleHR1cmVzKSA9PiB7fSk7XHJcbiAgICAgKiBcclxuICAgICAqIC8vIHByZWxvYWQgYWxsIHByZWZhYnMgKCR7cHJvamVjdH0vYXNzZXRzL2J1bmRsZTEvbWlzYy9jaGFyYWN0ZXJzLykgZnJvbSBidW5kbGUxIGZvbGRlclxyXG4gICAgICogYnVuZGxlMS5wcmVsb2FkRGlyKCdtaXNjL2NoYXJhY3RlcnMnLCBjYy5QcmVmYWIpO1xyXG4gICAgICpcclxuICAgICAqIC8vIHByZWxvYWQgYWxsIHNwcml0ZSBmcmFtZSAoJHtwcm9qZWN0fS9hc3NldHMvc29tZS94eHgvYnVuZGxlMi9za2lsbHMvKSBmcm9tIGJ1bmRsZTIgZm9sZGVyXHJcbiAgICAgKiBidW5kbGUyLnByZWxvYWREaXIoJ3NraWxscycsIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAqIC8vIHdhaXQgZm9yIHdoaWxlXHJcbiAgICAgKiBidW5kbGUyLmxvYWREaXIoJ3NraWxscycsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZXMpID0+IHt9KTtcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvblByb2dyZXNzOiAoZmluaXNoOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGl0ZW06IFJlcXVlc3RJdGVtKSA9PiB2b2lkLCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIHByZWxvYWREaXIoZGlyOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0LCBvbkNvbXBsZXRlOiAoZXJyb3I6IEVycm9yLCBpdGVtczogUmVxdWVzdEl0ZW1bXSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIHByZWxvYWREaXIoZGlyOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWRcclxuICAgICAqIHByZWxvYWREaXIoZGlyOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIGl0ZW1zOiBSZXF1ZXN0SXRlbVtdKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcHJlbG9hZERpcihkaXI6IHN0cmluZyk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcHJlbG9hZERpciAoZGlyLCB0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgdHlwZSwgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VMb2FkUmVzQXJncyh0eXBlLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueShkaXIsIHsgX19yZXF1ZXN0VHlwZV9fOiBSZXF1ZXN0VHlwZS5ESVIsIHR5cGU6IHR5cGUsIGJ1bmRsZTogdGhpcy5uYW1lIH0sIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBMb2FkcyB0aGUgc2NlbmUgd2l0aGluIHRoaXMgYnVuZGxlIGJ5IGl0cyBuYW1lLiAgXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDpgJrov4flnLrmma/lkI3np7DliqDovb3liIbljIXkuK3nmoTlnLrmma/jgIJcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIGxvYWRTY2VuZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBsb2FkLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHByb2dyZXNzaW9uIGNoYW5nZS5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvblByb2dyZXNzLmZpbmlzaCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtcy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvblByb2dyZXNzLml0ZW0gLSBUaGUgbGF0ZXN0IHJlcXVlc3QgaXRlbVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHNjZW5lIGxhdW5jaGVkLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSB7U2NlbmVBc3NldH0gb25Db21wbGV0ZS5zY2VuZUFzc2V0IC0gVGhlIHNjZW5lIGFzc2V0XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBidW5kbGUxLmxvYWRTY2VuZSgnZmlyc3QnLCAoZXJyLCBzY2VuZUFzc2V0KSA9PiBjYy5kaXJlY3Rvci5ydW5TY2VuZShzY2VuZUFzc2V0KSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IsIHNjZW5lQXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICAgKiBsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGxvYWRTY2VuZSAoc2NlbmVOYW1lLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG4gICAgXHJcbiAgICAgICAgb3B0aW9ucy5wcmVzZXQgPSBvcHRpb25zLnByZXNldCB8fCAnc2NlbmUnO1xyXG4gICAgICAgIG9wdGlvbnMuYnVuZGxlID0gdGhpcy5uYW1lO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQW55KHsgJ3NjZW5lJzogc2NlbmVOYW1lIH0sIG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIGZ1bmN0aW9uIChlcnIsIHNjZW5lQXNzZXQpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzY2VuZUFzc2V0IGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lID0gc2NlbmVBc3NldC5zY2VuZTtcclxuICAgICAgICAgICAgICAgIHNjZW5lLl9pZCA9IHNjZW5lQXNzZXQuX3V1aWQ7XHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fbmFtZSA9IHNjZW5lQXNzZXQuX25hbWU7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCwgc2NlbmVBc3NldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKCdUaGUgYXNzZXQgJyArIHNjZW5lQXNzZXQuX3V1aWQgKyAnIGlzIG5vdCBhIHNjZW5lJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUHJlbG9hZHMgdGhlIHNjZW5lIHdpdGhpbiB0aGlzIGJ1bmRsZSBieSBpdHMgbmFtZS4gQWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCwgeW91IHN0aWxsIG5lZWQgdG8gZmluaXNoIGxvYWRpbmcgYnkgY2FsbGluZyBgQnVuZGxlLmxvYWRTY2VuZWAgb3IgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAuXHJcbiAgICAgKiBJdCB3aWxsIGJlIHRvdGFsbHkgZmluZSB0byBjYWxsIGBCdW5kbGUubG9hZERpcmAgYXQgYW55IHRpbWUgZXZlbiBpZiB0aGUgcHJlbG9hZGluZyBpcyBub3QgeWV0IGZpbmlzaGVkXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDpgJrov4flnLrmma/lkI3np7DpooTliqDovb3liIbljIXkuK3nmoTlnLrmma8u6LCD55So5a6M5ZCO77yM5L2g5LuN54S26ZyA6KaB6YCa6L+HIGBCdW5kbGUubG9hZFNjZW5lYCDmiJYgYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWAg5p2l5a6M5oiQ5Yqg6L2944CCXHJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYEJ1bmRsZS5sb2FkU2NlbmVgIOaIliBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYOOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgcHJlbG9hZFNjZW5lXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NlbmVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHNjZW5lIHRvIHByZWxvYWQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbWV0ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Qcm9ncmVzc10gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgbG9hZCBwcm9ncmVzc2lvbiBjaGFuZ2UuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5maW5pc2ggLSBUaGUgbnVtYmVyIG9mIHRoZSBpdGVtcyB0aGF0IGFyZSBhbHJlYWR5IGNvbXBsZXRlZFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWwgLSBUaGUgdG90YWwgbnVtYmVyIG9mIHRoZSBpdGVtc1xyXG4gICAgICogQHBhcmFtIHtSZXF1ZXN0SXRlbX0gb25Qcm9ncmVzcy5pdGVtIFRoZSBsYXRlc3QgcmVxdWVzdCBpdGVtXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBjYWxsYmFjaywgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgc2NlbmUgbG9hZGVkLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIG9iamVjdC5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGJ1bmRsZTEucHJlbG9hZFNjZW5lKCdmaXJzdCcpO1xyXG4gICAgICogLy8gd2FpdCBmb3IgYSB3aGlsZVxyXG4gICAgICogYnVuZGxlMS5sb2FkU2NlbmUoJ2ZpcnN0JywgKGVyciwgc2NlbmUpID0+IGNjLmRpcmVjdG9yLnJ1blNjZW5lKHNjZW5lKSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uUHJvZ3Jlc3M6IChmaW5pc2g6IG51bWJlciwgdG90YWw6IG51bWJlciwgaXRlbTogUmVxdWVzdEl0ZW0pID0+IHZvaWQsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9uQ29tcGxldGU6IChlcnJvcjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICAgKiBwcmVsb2FkU2NlbmUoc2NlbmVOYW1lOiBzdHJpbmcpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHByZWxvYWRTY2VuZSAoc2NlbmVOYW1lLCBvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIHsgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUpO1xyXG5cclxuICAgICAgICBvcHRpb25zLmJ1bmRsZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIucHJlbG9hZEFueSh7J3NjZW5lJzogc2NlbmVOYW1lfSwgb3B0aW9ucywgb25Qcm9ncmVzcywgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDEyMTAsIHNjZW5lTmFtZSwgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCBhc3NldCB3aXRoaW4gdGhpcyBidW5kbGUgYnkgcGF0aCBhbmQgdHlwZS4gPGJyPlxyXG4gICAgICogQWZ0ZXIgeW91IGxvYWQgYXNzZXQgd2l0aCB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gb3Ige3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319LFxyXG4gICAgICogeW91IGNhbiBhY3F1aXJlIHRoZW0gYnkgcGFzc2luZyB0aGUgcGF0aCB0byB0aGlzIEFQSS5cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YCa6L+H6Lev5b6E5LiO57G75Z6L6I635Y+W6LWE5rqQ44CC5Zyo5L2g5L2/55SoIHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSDmiJbogIUge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWREaXI6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOS5i+WQju+8jFxyXG4gICAgICog5L2g6IO96YCa6L+H5Lyg6Lev5b6E6YCa6L+H6L+Z5LiqIEFQSSDojrflj5bliLDov5nkupvotYTmupDjgIJcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBnZXRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoIC0gVGhlIHBhdGggb2YgYXNzZXRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFt0eXBlXSAtIE9ubHkgYXNzZXQgb2YgdHlwZSB3aWxsIGJlIHJldHVybmVkIGlmIHRoaXMgYXJndW1lbnQgaXMgc3VwcGxpZWQuXHJcbiAgICAgKiBAcmV0dXJucyB7QXNzZXR9IFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYnVuZGxlMS5nZXQoJ211c2ljL2hpdCcsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBnZXQ8VCBleHRlbmRzIGNjLkFzc2V0PiAocGF0aDogc3RyaW5nLCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogVFxyXG4gICAgICovXHJcbiAgICBnZXQgKHBhdGgsIHR5cGUpIHtcclxuICAgICAgICB2YXIgaW5mbyA9IHRoaXMuZ2V0SW5mb1dpdGhQYXRoKHBhdGgsIHR5cGUpO1xyXG4gICAgICAgIHJldHVybiBhc3NldHMuZ2V0KGluZm8gJiYgaW5mby51dWlkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogUmVsZWFzZSB0aGUgYXNzZXQgbG9hZGVkIGJ5IHt7I2Nyb3NzTGluayBcIkJ1bmRsZS9sb2FkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBvciB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gYW5kIGl0J3MgZGVwZW5kZW5jaWVzLiBcclxuICAgICAqIFJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDph4rmlL7pgJrov4cge3sjY3Jvc3NMaW5rIFwiQnVuZGxlL2xvYWQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOaIluiAhSB7eyNjcm9zc0xpbmsgXCJCdW5kbGUvbG9hZERpcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0g5Yqg6L2955qE6LWE5rqQ44CC6K+m57uG5L+h5oGv6K+35Y+C6ICDIHt7I2Nyb3NzTGluayBcIkFzc2V0TWFuYWdlci9yZWxlYXNlQXNzZXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcmVsZWFzZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBUaGUgcGF0aCBvZiBhc3NldFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3R5cGVdIC0gT25seSBhc3NldCBvZiB0eXBlIHdpbGwgYmUgcmVsZWFzZWQgaWYgdGhpcyBhcmd1bWVudCBpcyBzdXBwbGllZC5cclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHJlbGVhc2UgYSB0ZXh0dXJlIHdoaWNoIGlzIG5vIGxvbmdlciBuZWVkXHJcbiAgICAgKiBidW5kbGUxLnJlbGVhc2UoJ21pc2MvY2hhcmFjdGVyL2NvY29zJyk7XHJcbiAgICAgKlxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJlbGVhc2UocGF0aDogc3RyaW5nLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkXHJcbiAgICAgKiByZWxlYXNlKHBhdGg6IHN0cmluZyk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZSAocGF0aCwgdHlwZSkge1xyXG4gICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UodGhpcy5nZXQocGF0aCwgdHlwZSksIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBSZWxlYXNlIGFsbCB1bnVzZWQgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInmsqHmnInnlKjliLDnmoTotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlVW51c2VkQXNzZXRzXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gcmVsZWFzZSBhbGwgdW51c2VkIGFzc2V0IHdpdGhpbiBidW5kbGUxXHJcbiAgICAgKiBidW5kbGUxLnJlbGVhc2VVbnVzZWRBc3NldHMoKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJlbGVhc2VVbnVzZWRBc3NldHMoKTogdm9pZFxyXG4gICAgICovXHJcbiAgICByZWxlYXNlVW51c2VkQXNzZXRzICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgYXNzZXRzLmZvckVhY2goZnVuY3Rpb24gKGFzc2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gc2VsZi5nZXRBc3NldEluZm8oYXNzZXQuX3V1aWQpO1xyXG4gICAgICAgICAgICBpZiAoaW5mbyAmJiAhaW5mby5yZWRpcmVjdCkge1xyXG4gICAgICAgICAgICAgICAgcmVsZWFzZU1hbmFnZXIudHJ5UmVsZWFzZShhc3NldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogUmVsZWFzZSBhbGwgYXNzZXRzIHdpdGhpbiB0aGlzIGJ1bmRsZS4gUmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGZvciBkZXRhaWxlZCBpbmZvcm1hdGlvbnMuXHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDph4rmlL7mraTljIXkuK3nmoTmiYDmnInotYTmupDjgILor6bnu4bkv6Hmga/or7flj4LogIMge3sjY3Jvc3NMaW5rIFwiQXNzZXRNYW5hZ2VyL3JlbGVhc2VBbGw6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319XHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCByZWxlYXNlQWxsXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyByZWxlYXNlIGFsbCBhc3NldCB3aXRoaW4gYnVuZGxlMVxyXG4gICAgICogYnVuZGxlMS5yZWxlYXNlQWxsKCk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZWxlYXNlQWxsKCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZUFsbCAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGFzc2V0cy5mb3JFYWNoKGZ1bmN0aW9uIChhc3NldCkge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHNlbGYuZ2V0QXNzZXRJbmZvKGFzc2V0Ll91dWlkKTtcclxuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWluZm8ucmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgICAgIHJlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UoYXNzZXQsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kZXN0cm95ICgpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQnVuZGxlOyJdLCJzb3VyY2VSb290IjoiLyJ9