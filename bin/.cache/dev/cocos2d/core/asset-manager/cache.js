
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/cache.js';
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

/**
 * @module cc.AssetManager
 */
var js = require('../platform/js');
/**
 * !#en
 * use to cache something
 * 
 * !#zh
 * 用于缓存某些内容
 * 
 * @class Cache
 * @typescript Cache<T = any>
 */


function Cache(map) {
  if (map) {
    this._map = map;
    this._count = Object.keys(map).length;
  } else {
    this._map = js.createMap(true);
    this._count = 0;
  }
}

Cache.prototype = {
  /**
   * !#en
   * Create a cache
   * 
   * !#zh
   * 创建一个 cache
   * 
   * @method constructor
   * @param {Object} [map] - An object used to initialize   
   * 
   * @typescript
   * constructor(map?: Record<string, T>)
   */
  constructor: Cache,

  /**
   * !#en
   * Add Key-Value to cache
   * 
   * !#zh
   * 增加键值对到缓存中
   * 
   * @method add
   * @param {String} key - The key
   * @param {*} val - The value
   * @returns {*} The value
   * 
   * @example
   * var cache = new Cache();
   * cache.add('test', null);
   * 
   * @typescript
   * add(key: string, val: T): T
   */
  add: function add(key, val) {
    if (!(key in this._map)) this._count++;
    return this._map[key] = val;
  },

  /**
   * !#en
   * Get the cached content by key
   * 
   * !#zh
   * 通过 key 获取对应的 value
   * 
   * @method get
   * @param {string} key - The key
   * @returns {*} The corresponding content
   * 
   * @example
   * var cache = new Cache();
   * var test = cache.get('test');
   * 
   * @typescript
   * get(key: string): T
   */
  get: function get(key) {
    return this._map[key];
  },

  /**
   * !#en
   * Check whether or not content exists by key
   * 
   * !#zh
   * 通过 Key 判断是否存在对应的内容
   * 
   * @method has
   * @param {string} key - The key
   * @returns {boolean} True indecates that content of the key exists
   * 
   * @example
   * var cache = new Cache();
   * var exist = cache.has('test');
   * 
   * @typescript
   * has(key: string): boolean
   */
  has: function has(key) {
    return key in this._map;
  },

  /**
   * !#en
   * Remove the cached content by key
   * 
   * !#zh
   * 通过 Key 移除对应的内容
   * 
   * @method remove
   * @param {string} key - The key
   * @returns {*} The removed content
   * 
   * @example
   * var cache = new Cache();
   * var content = cache.remove('test');
   * 
   * @typescript
   * remove(key: string): T
   */
  remove: function remove(key) {
    var out = this._map[key];

    if (key in this._map) {
      delete this._map[key];
      this._count--;
    }

    return out;
  },

  /**
   * !#en
   * Clear all content
   * 
   * !#zh
   * 清除所有内容
   * 
   * @method clear
   * 
   * @example
   * var cache = new Cache();
   * cache.clear();
   * 
   * @typescript
   * clear():void
   */
  clear: function clear() {
    if (this._count !== 0) {
      this._map = js.createMap(true);
      this._count = 0;
    }
  },

  /**
   * !#en
   * Enumerate all content and invoke function
   * 
   * !#zh
   * 枚举所有内容并执行方法
   * 
   * @method forEach
   * @param {Function} func - Function to be invoked
   * @param {*} func.val - The value 
   * @param {String} func.key - The corresponding key
   * 
   * @example
   * var cache = new Cache();
   * cache.forEach((val, key) => console.log(key));
   * 
   * @typescript
   * forEach(func: (val: T, key: string) => void): void
   */
  forEach: function forEach(func) {
    for (var key in this._map) {
      func(this._map[key], key);
    }
  },

  /**
   * !#en
   * Enumerate all content to find one element which can fulfill condition
   * 
   * !#zh
   * 枚举所有内容，找到一个可以满足条件的元素
   * 
   * @method find
   * @param {Function} predicate - The condition
   * @returns {*} content
   * 
   * @example
   * var cache = new Cache();
   * var val = cache.find((val, key) => key === 'test');
   * 
   * @typescript
   * find(predicate: (val: T, key: string) => boolean): T
   */
  find: function find(predicate) {
    for (var key in this._map) {
      if (predicate(this._map[key], key)) return this._map[key];
    }

    return null;
  },

  /**
   * !#en
   * The count of cached content
   * 
   * !#zh
   * 缓存数量
   * 
   * @property count
   * @type {Number}
   */
  get count() {
    return this._count;
  },

  /**
   * !#en
   * Destroy this cache
   * 
   * !#zh
   * 销毁这个 cache
   * 
   * @method destroy
   * 
   * @typescript
   * destroy(): void
   */
  destroy: function destroy() {
    this._map = null;
  }
};
module.exports = Cache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGNhY2hlLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIkNhY2hlIiwibWFwIiwiX21hcCIsIl9jb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJjcmVhdGVNYXAiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImFkZCIsImtleSIsInZhbCIsImdldCIsImhhcyIsInJlbW92ZSIsIm91dCIsImNsZWFyIiwiZm9yRWFjaCIsImZ1bmMiLCJmaW5kIiwicHJlZGljYXRlIiwiY291bnQiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxTQUFTQyxLQUFULENBQWdCQyxHQUFoQixFQUFxQjtBQUNqQixNQUFJQSxHQUFKLEVBQVM7QUFDTCxTQUFLQyxJQUFMLEdBQVlELEdBQVo7QUFDQSxTQUFLRSxNQUFMLEdBQWNDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSixHQUFaLEVBQWlCSyxNQUEvQjtBQUNILEdBSEQsTUFJSztBQUNELFNBQUtKLElBQUwsR0FBWUosRUFBRSxDQUFDUyxTQUFILENBQWEsSUFBYixDQUFaO0FBQ0EsU0FBS0osTUFBTCxHQUFjLENBQWQ7QUFDSDtBQUNKOztBQUVESCxLQUFLLENBQUNRLFNBQU4sR0FBa0I7QUFFZDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxXQUFXLEVBQUVULEtBZkM7O0FBaUJkO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lVLEVBQUFBLEdBcENjLGVBb0NUQyxHQXBDUyxFQW9DSkMsR0FwQ0ksRUFvQ0M7QUFDWCxRQUFJLEVBQUVELEdBQUcsSUFBSSxLQUFLVCxJQUFkLENBQUosRUFBeUIsS0FBS0MsTUFBTDtBQUN6QixXQUFPLEtBQUtELElBQUwsQ0FBVVMsR0FBVixJQUFpQkMsR0FBeEI7QUFDSCxHQXZDYTs7QUF5Q2Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEdBM0RjLGVBMkRURixHQTNEUyxFQTJESjtBQUNOLFdBQU8sS0FBS1QsSUFBTCxDQUFVUyxHQUFWLENBQVA7QUFDSCxHQTdEYTs7QUErRGQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lHLEVBQUFBLEdBakZjLGVBaUZUSCxHQWpGUyxFQWlGSjtBQUNOLFdBQU9BLEdBQUcsSUFBSSxLQUFLVCxJQUFuQjtBQUNILEdBbkZhOztBQXFGZDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWEsRUFBQUEsTUF2R2Msa0JBdUdOSixHQXZHTSxFQXVHRDtBQUNULFFBQUlLLEdBQUcsR0FBRyxLQUFLZCxJQUFMLENBQVVTLEdBQVYsQ0FBVjs7QUFDQSxRQUFJQSxHQUFHLElBQUksS0FBS1QsSUFBaEIsRUFBc0I7QUFDbEIsYUFBTyxLQUFLQSxJQUFMLENBQVVTLEdBQVYsQ0FBUDtBQUNBLFdBQUtSLE1BQUw7QUFDSDs7QUFDRCxXQUFPYSxHQUFQO0FBQ0gsR0E5R2E7O0FBZ0hkO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEtBaEljLG1CQWdJTDtBQUNMLFFBQUksS0FBS2QsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNuQixXQUFLRCxJQUFMLEdBQVlKLEVBQUUsQ0FBQ1MsU0FBSCxDQUFhLElBQWIsQ0FBWjtBQUNBLFdBQUtKLE1BQUwsR0FBYyxDQUFkO0FBQ0g7QUFDSixHQXJJYTs7QUF1SWQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWUsRUFBQUEsT0ExSmMsbUJBMEpMQyxJQTFKSyxFQTBKQztBQUNYLFNBQUssSUFBSVIsR0FBVCxJQUFnQixLQUFLVCxJQUFyQixFQUEyQjtBQUN2QmlCLE1BQUFBLElBQUksQ0FBQyxLQUFLakIsSUFBTCxDQUFVUyxHQUFWLENBQUQsRUFBaUJBLEdBQWpCLENBQUo7QUFDSDtBQUNKLEdBOUphOztBQWdLZDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSVMsRUFBQUEsSUFsTGMsZ0JBa0xSQyxTQWxMUSxFQWtMRztBQUNiLFNBQUssSUFBSVYsR0FBVCxJQUFnQixLQUFLVCxJQUFyQixFQUEyQjtBQUN2QixVQUFJbUIsU0FBUyxDQUFDLEtBQUtuQixJQUFMLENBQVVTLEdBQVYsQ0FBRCxFQUFpQkEsR0FBakIsQ0FBYixFQUFvQyxPQUFPLEtBQUtULElBQUwsQ0FBVVMsR0FBVixDQUFQO0FBQ3ZDOztBQUNELFdBQU8sSUFBUDtBQUNILEdBdkxhOztBQXlMZDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLE1BQUlXLEtBQUosR0FBYTtBQUNULFdBQU8sS0FBS25CLE1BQVo7QUFDSCxHQXJNYTs7QUF1TWQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lvQixFQUFBQSxPQW5OYyxxQkFtTkg7QUFDUCxTQUFLckIsSUFBTCxHQUFZLElBQVo7QUFDSDtBQXJOYSxDQUFsQjtBQXdOQXNCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLEtBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqL1xyXG5cclxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xyXG4vKipcclxuICogISNlblxyXG4gKiB1c2UgdG8gY2FjaGUgc29tZXRoaW5nXHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOeUqOS6jue8k+WtmOafkOS6m+WGheWuuVxyXG4gKiBcclxuICogQGNsYXNzIENhY2hlXHJcbiAqIEB0eXBlc2NyaXB0IENhY2hlPFQgPSBhbnk+XHJcbiAqL1xyXG5mdW5jdGlvbiBDYWNoZSAobWFwKSB7XHJcbiAgICBpZiAobWFwKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwID0gbWFwO1xyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gT2JqZWN0LmtleXMobWFwKS5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLl9tYXAgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fY291bnQgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5DYWNoZS5wcm90b3R5cGUgPSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlIGEgY2FjaGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Yib5bu65LiA5LiqIGNhY2hlXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbbWFwXSAtIEFuIG9iamVjdCB1c2VkIHRvIGluaXRpYWxpemUgICBcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGNvbnN0cnVjdG9yKG1hcD86IFJlY29yZDxzdHJpbmcsIFQ+KVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcjogQ2FjaGUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBZGQgS2V5LVZhbHVlIHRvIGNhY2hlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWinuWKoOmUruWAvOWvueWIsOe8k+WtmOS4rVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGFkZFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFRoZSBrZXlcclxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIC0gVGhlIHZhbHVlXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gVGhlIHZhbHVlXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcclxuICAgICAqIGNhY2hlLmFkZCgndGVzdCcsIG51bGwpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYWRkKGtleTogc3RyaW5nLCB2YWw6IFQpOiBUXHJcbiAgICAgKi9cclxuICAgIGFkZCAoa2V5LCB2YWwpIHsgICAgICAgXHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX21hcCkpIHRoaXMuX2NvdW50Kys7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFtrZXldID0gdmFsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgY2FjaGVkIGNvbnRlbnQgYnkga2V5XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOmAmui/hyBrZXkg6I635Y+W5a+55bqU55qEIHZhbHVlXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleVxyXG4gICAgICogQHJldHVybnMgeyp9IFRoZSBjb3JyZXNwb25kaW5nIGNvbnRlbnRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBjYWNoZSA9IG5ldyBDYWNoZSgpO1xyXG4gICAgICogdmFyIHRlc3QgPSBjYWNoZS5nZXQoJ3Rlc3QnKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldChrZXk6IHN0cmluZyk6IFRcclxuICAgICAqL1xyXG4gICAgZ2V0IChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwW2tleV07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ2hlY2sgd2hldGhlciBvciBub3QgY29udGVudCBleGlzdHMgYnkga2V5XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOmAmui/hyBLZXkg5Yik5pat5piv5ZCm5a2Y5Zyo5a+55bqU55qE5YaF5a65XHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgaGFzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaW5kZWNhdGVzIHRoYXQgY29udGVudCBvZiB0aGUga2V5IGV4aXN0c1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNhY2hlID0gbmV3IENhY2hlKCk7XHJcbiAgICAgKiB2YXIgZXhpc3QgPSBjYWNoZS5oYXMoJ3Rlc3QnKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW5cclxuICAgICAqL1xyXG4gICAgaGFzIChrZXkpIHtcclxuICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuX21hcDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZW1vdmUgdGhlIGNhY2hlZCBjb250ZW50IGJ5IGtleVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDpgJrov4cgS2V5IOenu+mZpOWvueW6lOeahOWGheWuuVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSBrZXlcclxuICAgICAqIEByZXR1cm5zIHsqfSBUaGUgcmVtb3ZlZCBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcclxuICAgICAqIHZhciBjb250ZW50ID0gY2FjaGUucmVtb3ZlKCd0ZXN0Jyk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZW1vdmUoa2V5OiBzdHJpbmcpOiBUXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZSAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG91dCA9IHRoaXMuX21hcFtrZXldO1xyXG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tYXBba2V5XTtcclxuICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDbGVhciBhbGwgY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmuIXpmaTmiYDmnInlhoXlrrlcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBjbGVhclxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNhY2hlID0gbmV3IENhY2hlKCk7XHJcbiAgICAgKiBjYWNoZS5jbGVhcigpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY2xlYXIoKTp2b2lkXHJcbiAgICAgKi9cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fY291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwID0ganMuY3JlYXRlTWFwKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEVudW1lcmF0ZSBhbGwgY29udGVudCBhbmQgaW52b2tlIGZ1bmN0aW9uXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOaemuS4vuaJgOacieWGheWuueW5tuaJp+ihjOaWueazlVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGZvckVhY2hcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBpbnZva2VkXHJcbiAgICAgKiBAcGFyYW0geyp9IGZ1bmMudmFsIC0gVGhlIHZhbHVlIFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZ1bmMua2V5IC0gVGhlIGNvcnJlc3BvbmRpbmcga2V5XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgY2FjaGUgPSBuZXcgQ2FjaGUoKTtcclxuICAgICAqIGNhY2hlLmZvckVhY2goKHZhbCwga2V5KSA9PiBjb25zb2xlLmxvZyhrZXkpKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZvckVhY2goZnVuYzogKHZhbDogVCwga2V5OiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGZvckVhY2ggKGZ1bmMpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fbWFwKSB7XHJcbiAgICAgICAgICAgIGZ1bmModGhpcy5fbWFwW2tleV0sIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEVudW1lcmF0ZSBhbGwgY29udGVudCB0byBmaW5kIG9uZSBlbGVtZW50IHdoaWNoIGNhbiBmdWxmaWxsIGNvbmRpdGlvblxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmnprkuL7miYDmnInlhoXlrrnvvIzmib7liLDkuIDkuKrlj6/ku6Xmu6HotrPmnaHku7bnmoTlhYPntKBcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBmaW5kXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgLSBUaGUgY29uZGl0aW9uXHJcbiAgICAgKiBAcmV0dXJucyB7Kn0gY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIGNhY2hlID0gbmV3IENhY2hlKCk7XHJcbiAgICAgKiB2YXIgdmFsID0gY2FjaGUuZmluZCgodmFsLCBrZXkpID0+IGtleSA9PT0gJ3Rlc3QnKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGZpbmQocHJlZGljYXRlOiAodmFsOiBULCBrZXk6IHN0cmluZykgPT4gYm9vbGVhbik6IFRcclxuICAgICAqL1xyXG4gICAgZmluZCAocHJlZGljYXRlKSB7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX21hcCkge1xyXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKHRoaXMuX21hcFtrZXldLCBrZXkpKSByZXR1cm4gdGhpcy5fbWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBjb3VudCBvZiBjYWNoZWQgY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnvJPlrZjmlbDph49cclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGNvdW50XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXQgY291bnQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEZXN0cm95IHRoaXMgY2FjaGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6ZSA5q+B6L+Z5LiqIGNhY2hlXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZGVzdHJveVxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGVzdHJveSgpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3kgKCkge1xyXG4gICAgICAgIHRoaXMuX21hcCA9IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENhY2hlOyJdLCJzb3VyY2VSb290IjoiLyJ9