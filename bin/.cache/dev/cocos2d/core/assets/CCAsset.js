
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCAsset.js';
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
var CCObject = require('../platform/CCObject');
/**
 * !#en
 * Base class for handling assets used in Creator.<br/>
 *
 * You may want to override:<br/>
 * - createNode<br/>
 * - getset functions of _nativeAsset<br/>
 * - cc.Object._serialize<br/>
 * - cc.Object._deserialize<br/>
 * !#zh
 * Creator 中的资源基类。<br/>
 *
 * 您可能需要重写：<br/>
 * - createNode <br/>
 * - _nativeAsset 的 getset 方法<br/>
 * - cc.Object._serialize<br/>
 * - cc.Object._deserialize<br/>
 *
 * @class Asset
 * @extends Object
 */


cc.Asset = cc.Class({
  name: 'cc.Asset',
  "extends": CCObject,
  ctor: function ctor() {
    /**
     * @property {String} _uuid
     * @private
     */
    // enumerable is false by default, to avoid uuid being assigned to empty string during destroy
    Object.defineProperty(this, '_uuid', {
      value: '',
      writable: true
    });
    /**
     * !#en
     * Whether the asset is loaded or not.
     * !#zh
     * 该资源是否已经成功加载。
     *
     * @property loaded
     * @type {Boolean}
     */

    this.loaded = true;
    this._nativeUrl = '';
    this._ref = 0;
  },
  properties: {
    /**
     * !#en
     * Returns the url of this asset's native object, if none it will returns an empty string.
     * !#zh
     * 返回该资源对应的目标平台资源的 URL，如果没有将返回一个空字符串。
     * @property nativeUrl
     * @type {String}
     * @readOnly
     */
    nativeUrl: {
      get: function get() {
        if (!this._nativeUrl) {
          if (this._native) {
            var name = this._native;

            if (name.charCodeAt(0) === 47) {
              // '/'
              // remove library tag
              // not imported in library, just created on-the-fly
              return name.slice(1);
            }

            if (name.charCodeAt(0) === 46) {
              // '.'
              // imported in dir where json exist
              this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
                nativeExt: name,
                isNative: true
              });
            } else {
              // imported in an independent dir
              this._nativeUrl = cc.assetManager.utils.getUrlWithUuid(this._uuid, {
                __nativeName__: name,
                nativeExt: cc.path.extname(name),
                isNative: true
              });
            }
          }
        }

        return this._nativeUrl;
      },
      visible: false
    },

    /**
     * !#en
     * The number of reference
     * 
     * !#zh
     * 引用的数量
     * 
     * @property refCount
     * @type {Number}
     */
    refCount: {
      get: function get() {
        return this._ref;
      }
    },

    /**
     * !#en
     * Serializable url for native asset.
     * !#zh
     * 保存原生资源的 URL。
     * @property {String} _native
     * @default undefined
     * @private
     */
    _native: "",

    /**
     * !#en
     * The underlying native asset of this asset if one is available.
     * This property can be used to access additional details or functionality releated to the asset.
     * This property will be initialized by the loader if `_native` is available.
     * !#zh
     * 此资源依赖的底层原生资源（如果有的话）。
     * 此属性可用于访问与资源相关的其他详细信息或功能。
     * 如果 `_native` 可用，则此属性将由加载器初始化。
     * @property {Object} _nativeAsset
     * @default null
     * @private
     */
    _nativeAsset: {
      get: function get() {
        return this._$nativeAsset;
      },
      set: function set(obj) {
        this._$nativeAsset = obj;
      }
    },
    _nativeDep: {
      get: function get() {
        if (this._native) {
          return {
            __isNative__: true,
            uuid: this._uuid,
            ext: this._native
          };
        }
      }
    }
  },
  statics: {
    /**
     * !#en
     * Provide this method at the request of AssetDB.
     * !#zh
     * 应 AssetDB 要求提供这个方法。
     *
     * @method deserialize
     * @param {String} data
     * @return {Asset}
     * @static
     * @private
     */
    deserialize: CC_EDITOR && function (data) {
      return cc.deserialize(data);
    },

    /**
     * !#en Indicates whether its dependent raw assets can support deferred load if the owner scene (or prefab) is marked as `asyncLoadAssets`.
     * !#zh 当场景或 Prefab 被标记为 `asyncLoadAssets`，禁止延迟加载该资源所依赖的其它原始资源。
     *
     * @property {Boolean} preventDeferredLoadDependents
     * @default false
     * @static
     */
    preventDeferredLoadDependents: false,

    /**
     * !#en Indicates whether its native object should be preloaded from native url.
     * !#zh 禁止预加载原生对象。
     *
     * @property {Boolean} preventPreloadNativeObject
     * @default false
     * @static
     */
    preventPreloadNativeObject: false
  },

  /**
   * !#en
   * Returns the asset's url.
     * The `Asset` object overrides the `toString()` method of the `Object` object.
   * For `Asset` objects, the `toString()` method returns a string representation of the object.
   * JavaScript calls the `toString()` method automatically when an asset is to be represented as a text value or when a texture is referred to in a string concatenation.
   * !#zh
   * 返回资源的 URL。
   * 
   * Asset 对象将会重写 Object 对象的 `toString()` 方法。
   * 对于 Asset 对象，`toString()` 方法返回该对象的字符串表示形式。
   * 当资源要表示为文本值时或在字符串连接时引用时，JavaScript 会自动调用 `toString()` 方法。
   * @method toString
   * @return {String}
   */
  toString: function toString() {
    return this.nativeUrl;
  },

  /**
   * !#en
   * Provide this method at the request of AssetDB.
   * !#zh
   * 应 AssetDB 要求提供这个方法。
   *
   * @method serialize
   * @return {String}
   * @private
   */
  serialize: CC_EDITOR && function () {
    return Editor.serialize(this);
  },

  /**
   * !#en
   * Create a new node using this asset in the scene.<br/>
   * If this type of asset dont have its corresponding node type, this method should be null.
   * !#zh
   * 使用该资源在场景中创建一个新节点。<br/>
   * 如果这类资源没有相应的节点类型，该方法应该是空的。
   *
   * @method createNode
   * @param {Function} callback
   * @param {String} callback.error - null or the error info
   * @param {Object} callback.node - the created node or null
   */
  createNode: null,

  /**
   * !#en
   * Set native file name for this asset.
   * !#zh
   * 为此资源设置原生文件名。
   * 
   * @seealso nativeUrl
   *
   * @method _setRawAsset
   * @param {String} filename
   * @param {Boolean} [inLibrary=true]
   * @private
   */
  _setRawAsset: function _setRawAsset(filename, inLibrary) {
    if (inLibrary !== false) {
      this._native = filename || undefined;
    } else {
      this._native = '/' + filename; // simply use '/' to tag location where is not in the library
    }
  },

  /**
   * !#en
   * Add references of asset
   * 
   * !#zh
   * 增加资源的引用
   * 
   * @method addRef
   * @return {Asset} itself
   * 
   * @typescript
   * addRef(): cc.Asset
   */
  addRef: function addRef() {
    this._ref++;
    return this;
  },

  /**
   * !#en
   * Reduce references of asset and it will be auto released when refCount equals 0.
   * 
   * !#zh
   * 减少资源的引用并尝试进行自动释放。
   * 
   * @method decRef
   * @return {Asset} itself
   * 
   * @typescript
   * decRef(): cc.Asset
   */
  decRef: function decRef(autoRelease) {
    this._ref > 0 && this._ref--;
    autoRelease !== false && cc.assetManager._releaseManager.tryRelease(this);
    return this;
  }
});
module.exports = cc.Asset;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NBc3NldC5qcyJdLCJuYW1lcyI6WyJDQ09iamVjdCIsInJlcXVpcmUiLCJjYyIsIkFzc2V0IiwiQ2xhc3MiLCJuYW1lIiwiY3RvciIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImxvYWRlZCIsIl9uYXRpdmVVcmwiLCJfcmVmIiwicHJvcGVydGllcyIsIm5hdGl2ZVVybCIsImdldCIsIl9uYXRpdmUiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJhc3NldE1hbmFnZXIiLCJ1dGlscyIsImdldFVybFdpdGhVdWlkIiwiX3V1aWQiLCJuYXRpdmVFeHQiLCJpc05hdGl2ZSIsIl9fbmF0aXZlTmFtZV9fIiwicGF0aCIsImV4dG5hbWUiLCJ2aXNpYmxlIiwicmVmQ291bnQiLCJfbmF0aXZlQXNzZXQiLCJfJG5hdGl2ZUFzc2V0Iiwic2V0Iiwib2JqIiwiX25hdGl2ZURlcCIsIl9faXNOYXRpdmVfXyIsInV1aWQiLCJleHQiLCJzdGF0aWNzIiwiZGVzZXJpYWxpemUiLCJDQ19FRElUT1IiLCJkYXRhIiwicHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHMiLCJwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdCIsInRvU3RyaW5nIiwic2VyaWFsaXplIiwiRWRpdG9yIiwiY3JlYXRlTm9kZSIsIl9zZXRSYXdBc3NldCIsImZpbGVuYW1lIiwiaW5MaWJyYXJ5IiwidW5kZWZpbmVkIiwiYWRkUmVmIiwiZGVjUmVmIiwiYXV0b1JlbGVhc2UiLCJfcmVsZWFzZU1hbmFnZXIiLCJ0cnlSZWxlYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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S0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgQ0NPYmplY3QgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ09iamVjdCcpO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQmFzZSBjbGFzcyBmb3IgaGFuZGxpbmcgYXNzZXRzIHVzZWQgaW4gQ3JlYXRvci48YnIvPlxyXG4gKlxyXG4gKiBZb3UgbWF5IHdhbnQgdG8gb3ZlcnJpZGU6PGJyLz5cclxuICogLSBjcmVhdGVOb2RlPGJyLz5cclxuICogLSBnZXRzZXQgZnVuY3Rpb25zIG9mIF9uYXRpdmVBc3NldDxici8+XHJcbiAqIC0gY2MuT2JqZWN0Ll9zZXJpYWxpemU8YnIvPlxyXG4gKiAtIGNjLk9iamVjdC5fZGVzZXJpYWxpemU8YnIvPlxyXG4gKiAhI3poXHJcbiAqIENyZWF0b3Ig5Lit55qE6LWE5rqQ5Z+657G744CCPGJyLz5cclxuICpcclxuICog5oKo5Y+v6IO96ZyA6KaB6YeN5YaZ77yaPGJyLz5cclxuICogLSBjcmVhdGVOb2RlIDxici8+XHJcbiAqIC0gX25hdGl2ZUFzc2V0IOeahCBnZXRzZXQg5pa55rOVPGJyLz5cclxuICogLSBjYy5PYmplY3QuX3NlcmlhbGl6ZTxici8+XHJcbiAqIC0gY2MuT2JqZWN0Ll9kZXNlcmlhbGl6ZTxici8+XHJcbiAqXHJcbiAqIEBjbGFzcyBBc3NldFxyXG4gKiBAZXh0ZW5kcyBPYmplY3RcclxuICovXHJcbmNjLkFzc2V0ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkFzc2V0JywgZXh0ZW5kczogQ0NPYmplY3QsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IF91dWlkXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICAvLyBlbnVtZXJhYmxlIGlzIGZhbHNlIGJ5IGRlZmF1bHQsIHRvIGF2b2lkIHV1aWQgYmVpbmcgYXNzaWduZWQgdG8gZW1wdHkgc3RyaW5nIGR1cmluZyBkZXN0cm95XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfdXVpZCcsIHtcclxuICAgICAgICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogV2hldGhlciB0aGUgYXNzZXQgaXMgbG9hZGVkIG9yIG5vdC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog6K+l6LWE5rqQ5piv5ZCm5bey57uP5oiQ5Yqf5Yqg6L2944CCXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcHJvcGVydHkgbG9hZGVkXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZVVybCA9ICcnO1xyXG4gICAgICAgIHRoaXMuX3JlZiA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogUmV0dXJucyB0aGUgdXJsIG9mIHRoaXMgYXNzZXQncyBuYXRpdmUgb2JqZWN0LCBpZiBub25lIGl0IHdpbGwgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOi/lOWbnuivpei1hOa6kOWvueW6lOeahOebruagh+W5s+WPsOi1hOa6kOeahCBVUkzvvIzlpoLmnpzmsqHmnInlsIbov5Tlm57kuIDkuKrnqbrlrZfnrKbkuLLjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgbmF0aXZlVXJsXHJcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAgKiBAcmVhZE9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBuYXRpdmVVcmw6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX25hdGl2ZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSB0aGlzLl9uYXRpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IDQ3KSB7ICAgIC8vICcvJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGxpYnJhcnkgdGFnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3QgaW1wb3J0ZWQgaW4gbGlicmFyeSwganVzdCBjcmVhdGVkIG9uLXRoZS1mbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmNoYXJDb2RlQXQoMCkgPT09IDQ2KSB7ICAvLyAnLidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnRlZCBpbiBkaXIgd2hlcmUganNvbiBleGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmF0aXZlVXJsID0gY2MuYXNzZXRNYW5hZ2VyLnV0aWxzLmdldFVybFdpdGhVdWlkKHRoaXMuX3V1aWQsIHtuYXRpdmVFeHQ6IG5hbWUsIGlzTmF0aXZlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0ZWQgaW4gYW4gaW5kZXBlbmRlbnQgZGlyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVVcmwgPSBjYy5hc3NldE1hbmFnZXIudXRpbHMuZ2V0VXJsV2l0aFV1aWQodGhpcy5fdXVpZCwge19fbmF0aXZlTmFtZV9fOiBuYW1lLCBuYXRpdmVFeHQ6IGNjLnBhdGguZXh0bmFtZShuYW1lKSwgaXNOYXRpdmU6IHRydWV9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVVcmw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBudW1iZXIgb2YgcmVmZXJlbmNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOW8leeUqOeahOaVsOmHj1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSByZWZDb3VudFxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVmQ291bnQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogU2VyaWFsaXphYmxlIHVybCBmb3IgbmF0aXZlIGFzc2V0LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDkv53lrZjljp/nlJ/otYTmupDnmoQgVVJM44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IF9uYXRpdmVcclxuICAgICAgICAgKiBAZGVmYXVsdCB1bmRlZmluZWRcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9uYXRpdmU6IFwiXCIsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgdW5kZXJseWluZyBuYXRpdmUgYXNzZXQgb2YgdGhpcyBhc3NldCBpZiBvbmUgaXMgYXZhaWxhYmxlLlxyXG4gICAgICAgICAqIFRoaXMgcHJvcGVydHkgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGFkZGl0aW9uYWwgZGV0YWlscyBvciBmdW5jdGlvbmFsaXR5IHJlbGVhdGVkIHRvIHRoZSBhc3NldC5cclxuICAgICAgICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgaW5pdGlhbGl6ZWQgYnkgdGhlIGxvYWRlciBpZiBgX25hdGl2ZWAgaXMgYXZhaWxhYmxlLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmraTotYTmupDkvp3otZbnmoTlupXlsYLljp/nlJ/otYTmupDvvIjlpoLmnpzmnInnmoTor53vvInjgIJcclxuICAgICAgICAgKiDmraTlsZ7mgKflj6/nlKjkuo7orr/pl67kuI7otYTmupDnm7jlhbPnmoTlhbbku5bor6bnu4bkv6Hmga/miJblip/og73jgIJcclxuICAgICAgICAgKiDlpoLmnpwgYF9uYXRpdmVgIOWPr+eUqO+8jOWImeatpOWxnuaAp+WwhueUseWKoOi9veWZqOWIneWni+WMluOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBfbmF0aXZlQXNzZXRcclxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBfbmF0aXZlQXNzZXQ6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl8kbmF0aXZlQXNzZXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl8kbmF0aXZlQXNzZXQgPSBvYmo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfbmF0aXZlRGVwOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtfX2lzTmF0aXZlX186IHRydWUsIHV1aWQ6IHRoaXMuX3V1aWQsIGV4dDogdGhpcy5fbmF0aXZlfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBQcm92aWRlIHRoaXMgbWV0aG9kIGF0IHRoZSByZXF1ZXN0IG9mIEFzc2V0REIuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOW6lCBBc3NldERCIOimgeaxguaPkOS+m+i/meS4quaWueazleOAglxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQG1ldGhvZCBkZXNlcmlhbGl6ZVxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7QXNzZXR9XHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVzZXJpYWxpemU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuZGVzZXJpYWxpemUoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBpdHMgZGVwZW5kZW50IHJhdyBhc3NldHMgY2FuIHN1cHBvcnQgZGVmZXJyZWQgbG9hZCBpZiB0aGUgb3duZXIgc2NlbmUgKG9yIHByZWZhYikgaXMgbWFya2VkIGFzIGBhc3luY0xvYWRBc3NldHNgLlxyXG4gICAgICAgICAqICEjemgg5b2T5Zy65pmv5oiWIFByZWZhYiDooqvmoIforrDkuLogYGFzeW5jTG9hZEFzc2V0c2DvvIznpoHmraLlu7bov5/liqDovb3or6XotYTmupDmiYDkvp3otZbnmoTlhbblroPljp/lp4votYTmupDjgIJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmVudERlZmVycmVkTG9hZERlcGVuZGVudHNcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcmV2ZW50RGVmZXJyZWRMb2FkRGVwZW5kZW50czogZmFsc2UsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgaXRzIG5hdGl2ZSBvYmplY3Qgc2hvdWxkIGJlIHByZWxvYWRlZCBmcm9tIG5hdGl2ZSB1cmwuXHJcbiAgICAgICAgICogISN6aCDnpoHmraLpooTliqDovb3ljp/nlJ/lr7nosaHjgIJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmVudFByZWxvYWROYXRpdmVPYmplY3RcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcmV2ZW50UHJlbG9hZE5hdGl2ZU9iamVjdDogZmFsc2VcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgYXNzZXQncyB1cmwuXHJcblxyXG4gICAgICogVGhlIGBBc3NldGAgb2JqZWN0IG92ZXJyaWRlcyB0aGUgYHRvU3RyaW5nKClgIG1ldGhvZCBvZiB0aGUgYE9iamVjdGAgb2JqZWN0LlxyXG4gICAgICogRm9yIGBBc3NldGAgb2JqZWN0cywgdGhlIGB0b1N0cmluZygpYCBtZXRob2QgcmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0LlxyXG4gICAgICogSmF2YVNjcmlwdCBjYWxscyB0aGUgYHRvU3RyaW5nKClgIG1ldGhvZCBhdXRvbWF0aWNhbGx5IHdoZW4gYW4gYXNzZXQgaXMgdG8gYmUgcmVwcmVzZW50ZWQgYXMgYSB0ZXh0IHZhbHVlIG9yIHdoZW4gYSB0ZXh0dXJlIGlzIHJlZmVycmVkIHRvIGluIGEgc3RyaW5nIGNvbmNhdGVuYXRpb24uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDov5Tlm57otYTmupDnmoQgVVJM44CCXHJcbiAgICAgKiBcclxuICAgICAqIEFzc2V0IOWvueixoeWwhuS8mumHjeWGmSBPYmplY3Qg5a+56LGh55qEIGB0b1N0cmluZygpYCDmlrnms5XjgIJcclxuICAgICAqIOWvueS6jiBBc3NldCDlr7nosaHvvIxgdG9TdHJpbmcoKWAg5pa55rOV6L+U5Zue6K+l5a+56LGh55qE5a2X56ym5Liy6KGo56S65b2i5byP44CCXHJcbiAgICAgKiDlvZPotYTmupDopoHooajnpLrkuLrmlofmnKzlgLzml7bmiJblnKjlrZfnrKbkuLLov57mjqXml7blvJXnlKjml7bvvIxKYXZhU2NyaXB0IOS8muiHquWKqOiwg+eUqCBgdG9TdHJpbmcoKWAg5pa55rOV44CCXHJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRvU3RyaW5nICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYXRpdmVVcmw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUHJvdmlkZSB0aGlzIG1ldGhvZCBhdCB0aGUgcmVxdWVzdCBvZiBBc3NldERCLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5bqUIEFzc2V0REIg6KaB5rGC5o+Q5L6b6L+Z5Liq5pa55rOV44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBzZXJpYWxpemVcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHNlcmlhbGl6ZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gRWRpdG9yLnNlcmlhbGl6ZSh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgbm9kZSB1c2luZyB0aGlzIGFzc2V0IGluIHRoZSBzY2VuZS48YnIvPlxyXG4gICAgICogSWYgdGhpcyB0eXBlIG9mIGFzc2V0IGRvbnQgaGF2ZSBpdHMgY29ycmVzcG9uZGluZyBub2RlIHR5cGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBudWxsLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5L2/55So6K+l6LWE5rqQ5Zyo5Zy65pmv5Lit5Yib5bu65LiA5Liq5paw6IqC54K544CCPGJyLz5cclxuICAgICAqIOWmguaenOi/meexu+i1hOa6kOayoeacieebuOW6lOeahOiKgueCueexu+Wei++8jOivpeaWueazleW6lOivpeaYr+epuueahOOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgY3JlYXRlTm9kZVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjYWxsYmFjay5lcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIGluZm9cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjYWxsYmFjay5ub2RlIC0gdGhlIGNyZWF0ZWQgbm9kZSBvciBudWxsXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU5vZGU6IG51bGwsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTZXQgbmF0aXZlIGZpbGUgbmFtZSBmb3IgdGhpcyBhc3NldC5cclxuICAgICAqICEjemhcclxuICAgICAqIOS4uuatpOi1hOa6kOiuvue9ruWOn+eUn+aWh+S7tuWQjeOAglxyXG4gICAgICogXHJcbiAgICAgKiBAc2VlYWxzbyBuYXRpdmVVcmxcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIF9zZXRSYXdBc3NldFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpbkxpYnJhcnk9dHJ1ZV1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIF9zZXRSYXdBc3NldDogZnVuY3Rpb24gKGZpbGVuYW1lLCBpbkxpYnJhcnkpIHtcclxuICAgICAgICBpZiAoaW5MaWJyYXJ5ICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSBmaWxlbmFtZSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmUgPSAnLycgKyBmaWxlbmFtZTsgIC8vIHNpbXBseSB1c2UgJy8nIHRvIHRhZyBsb2NhdGlvbiB3aGVyZSBpcyBub3QgaW4gdGhlIGxpYnJhcnlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQWRkIHJlZmVyZW5jZXMgb2YgYXNzZXRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5aKe5Yqg6LWE5rqQ55qE5byV55SoXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgYWRkUmVmXHJcbiAgICAgKiBAcmV0dXJuIHtBc3NldH0gaXRzZWxmXHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBhZGRSZWYoKTogY2MuQXNzZXRcclxuICAgICAqL1xyXG4gICAgYWRkUmVmICgpIHtcclxuICAgICAgICB0aGlzLl9yZWYrKztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZWR1Y2UgcmVmZXJlbmNlcyBvZiBhc3NldCBhbmQgaXQgd2lsbCBiZSBhdXRvIHJlbGVhc2VkIHdoZW4gcmVmQ291bnQgZXF1YWxzIDAuXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWHj+Wwkei1hOa6kOeahOW8leeUqOW5tuWwneivlei/m+ihjOiHquWKqOmHiuaUvuOAglxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGRlY1JlZlxyXG4gICAgICogQHJldHVybiB7QXNzZXR9IGl0c2VsZlxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGVjUmVmKCk6IGNjLkFzc2V0XHJcbiAgICAgKi9cclxuICAgIGRlY1JlZiAoYXV0b1JlbGVhc2UpIHtcclxuICAgICAgICB0aGlzLl9yZWYgPiAwICYmIHRoaXMuX3JlZi0tO1xyXG4gICAgICAgIGF1dG9SZWxlYXNlICE9PSBmYWxzZSAmJiBjYy5hc3NldE1hbmFnZXIuX3JlbGVhc2VNYW5hZ2VyLnRyeVJlbGVhc2UodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5Bc3NldDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=