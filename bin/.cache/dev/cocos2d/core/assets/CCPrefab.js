
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCPrefab.js';
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

/**
 * !#zh
 * Prefab 创建实例所用的优化策略，配合 {{#crossLink "Prefab.optimizationPolicy"}}cc.Prefab#optimizationPolicy{{/crossLink}} 使用。
 * !#en
 * An enumeration used with the {{#crossLink "Prefab.optimizationPolicy"}}cc.Prefab#optimizationPolicy{{/crossLink}}
 * to specify how to optimize the instantiate operation.
 *
 * @enum Prefab.OptimizationPolicy
 * @since 1.10.0
 */
var OptimizationPolicy = cc.Enum({
  /**
   * !#zh
   * 根据创建次数自动调整优化策略。初次创建实例时，行为等同 SINGLE_INSTANCE，多次创建后将自动采用 MULTI_INSTANCE。
   * !#en
   * The optimization policy is automatically chosen based on the number of instantiations.
   * When you first create an instance, the behavior is the same as SINGLE_INSTANCE. MULTI_INSTANCE will be automatically used after multiple creation.
   * @property {Number} AUTO
   */
  AUTO: 0,

  /**
   * !#zh
   * 优化单次创建性能。<br>
   * 该选项会跳过针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般只会创建一个实例时，请选择此项。
   * !#en
   * Optimize for single instance creation.<br>
   * This option skips code generation for this prefab.
   * When this prefab will usually create only one instances, please select this option.
   * @property {Number} SINGLE_INSTANCE
   */
  SINGLE_INSTANCE: 1,

  /**
   * !#zh
   * 优化多次创建性能。<br>
   * 该选项会启用针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般会创建多个实例时，请选择此项。如果该 prefab 在场景中的节点启用了自动关联，并且在场景中有多份实例，也建议选择此项。
   * !#en
   * Optimize for creating instances multiple times.<br>
   * This option enables code generation for this prefab.
   * When this prefab will usually create multiple instances, please select this option.
   * It is also recommended to select this option if the prefab instance in the scene has Auto Sync enabled and there are multiple instances in the scene.
   * @property {Number} MULTI_INSTANCE
   */
  MULTI_INSTANCE: 2
});
/**
 * !#en Class for prefab handling.
 * !#zh 预制资源类。
 * @class Prefab
 * @extends Asset
 */

var Prefab = cc.Class({
  name: 'cc.Prefab',
  "extends": cc.Asset,
  ctor: function ctor() {
    /**
     * Cache function to optimize instance creaton.
     * @property {Function} _createFunction
     * @private
     */
    this._createFunction = null;
    this._instantiatedTimes = 0;
  },
  properties: {
    /**
     * @property {Node} data - the main cc.Node in the prefab
     */
    data: null,

    /**
     * !#zh
     * 设置实例化这个 prefab 时所用的优化策略。根据使用情况设置为合适的值，能优化该 prefab 实例化所用的时间。
     * !#en
     * Indicates the optimization policy for instantiating this prefab.
     * Set to a suitable value based on usage, can optimize the time it takes to instantiate this prefab.
     *
     * @property {Prefab.OptimizationPolicy} optimizationPolicy
     * @default Prefab.OptimizationPolicy.AUTO
     * @since 1.10.0
     * @example
     * prefab.optimizationPolicy = cc.Prefab.OptimizationPolicy.MULTI_INSTANCE;
     */
    optimizationPolicy: OptimizationPolicy.AUTO,

    /**
     * !#en Indicates the raw assets of this prefab can be load after prefab loaded.
     * !#zh 指示该 Prefab 依赖的资源可否在 Prefab 加载后再延迟加载。
     * @property {Boolean} asyncLoadAssets
     * @default false
     */
    asyncLoadAssets: false,

    /**
     * @property {Boolean} readonly
     * @default false
     */
    readonly: {
      "default": false,
      editorOnly: true
    }
  },
  statics: {
    OptimizationPolicy: OptimizationPolicy,
    OptimizationPolicyThreshold: 3
  },
  createNode: CC_EDITOR && function (cb) {
    var node = cc.instantiate(this);
    node.name = this.name;
    cb(null, node);
  },

  /**
   * Dynamically translation prefab data into minimized code.<br/>
   * This method will be called automatically before the first time the prefab being instantiated,
   * but you can re-call to refresh the create function once you modified the original prefab data in script.
   * @method compileCreateFunction
   */
  compileCreateFunction: function compileCreateFunction() {
    var jit = require('../platform/instantiate-jit');

    this._createFunction = jit.compile(this.data);
  },
  // just instantiate, will not initialize the Node, this will be called during Node's initialization.
  // @param {Node} [rootToRedirect] - specify an instantiated prefabRoot that all references to prefabRoot in prefab
  //                                  will redirect to
  _doInstantiate: function _doInstantiate(rootToRedirect) {
    if (!this.data._prefab) {
      // temp guard code
      cc.warnID(3700);
    }

    if (!this._createFunction) {
      this.compileCreateFunction();
    }

    return this._createFunction(rootToRedirect); // this.data._instantiate();
  },
  _instantiate: function _instantiate() {
    var node,
        useJit = false;

    if (CC_SUPPORT_JIT) {
      if (this.optimizationPolicy === OptimizationPolicy.SINGLE_INSTANCE) {
        useJit = false;
      } else if (this.optimizationPolicy === OptimizationPolicy.MULTI_INSTANCE) {
        useJit = true;
      } else {
        // auto
        useJit = this._instantiatedTimes + 1 >= Prefab.OptimizationPolicyThreshold;
      }
    }

    if (useJit) {
      // instantiate node
      node = this._doInstantiate(); // initialize node

      this.data._instantiate(node);
    } else {
      // instantiate node
      node = this.data._instantiate();
    }

    ++this._instantiatedTimes; // link prefab in editor

    if (CC_EDITOR || CC_TEST) {
      var PrefabUtils = Editor.require('scene://utils/prefab'); // This operation is not necessary, but some old prefab asset may not contain complete data.


      PrefabUtils.linkPrefab(this, node);
    }

    return node;
  },
  destroy: function destroy() {
    this.data && this.data.destroy();

    this._super();
  }
});
cc.Prefab = module.exports = Prefab;
cc.js.obsolete(cc, 'cc._Prefab', 'Prefab');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NQcmVmYWIuanMiXSwibmFtZXMiOlsiT3B0aW1pemF0aW9uUG9saWN5IiwiY2MiLCJFbnVtIiwiQVVUTyIsIlNJTkdMRV9JTlNUQU5DRSIsIk1VTFRJX0lOU1RBTkNFIiwiUHJlZmFiIiwiQ2xhc3MiLCJuYW1lIiwiQXNzZXQiLCJjdG9yIiwiX2NyZWF0ZUZ1bmN0aW9uIiwiX2luc3RhbnRpYXRlZFRpbWVzIiwicHJvcGVydGllcyIsImRhdGEiLCJvcHRpbWl6YXRpb25Qb2xpY3kiLCJhc3luY0xvYWRBc3NldHMiLCJyZWFkb25seSIsImVkaXRvck9ubHkiLCJzdGF0aWNzIiwiT3B0aW1pemF0aW9uUG9saWN5VGhyZXNob2xkIiwiY3JlYXRlTm9kZSIsIkNDX0VESVRPUiIsImNiIiwibm9kZSIsImluc3RhbnRpYXRlIiwiY29tcGlsZUNyZWF0ZUZ1bmN0aW9uIiwiaml0IiwicmVxdWlyZSIsImNvbXBpbGUiLCJfZG9JbnN0YW50aWF0ZSIsInJvb3RUb1JlZGlyZWN0IiwiX3ByZWZhYiIsIndhcm5JRCIsIl9pbnN0YW50aWF0ZSIsInVzZUppdCIsIkNDX1NVUFBPUlRfSklUIiwiQ0NfVEVTVCIsIlByZWZhYlV0aWxzIiwiRWRpdG9yIiwibGlua1ByZWZhYiIsImRlc3Ryb3kiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwianMiLCJvYnNvbGV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsa0JBQWtCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFR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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIFByZWZhYiDliJvlu7rlrp7kvovmiYDnlKjnmoTkvJjljJbnrZbnlaXvvIzphY3lkIgge3sjY3Jvc3NMaW5rIFwiUHJlZmFiLm9wdGltaXphdGlvblBvbGljeVwifX1jYy5QcmVmYWIjb3B0aW1pemF0aW9uUG9saWN5e3svY3Jvc3NMaW5rfX0g5L2/55So44CCXHJcbiAqICEjZW5cclxuICogQW4gZW51bWVyYXRpb24gdXNlZCB3aXRoIHRoZSB7eyNjcm9zc0xpbmsgXCJQcmVmYWIub3B0aW1pemF0aW9uUG9saWN5XCJ9fWNjLlByZWZhYiNvcHRpbWl6YXRpb25Qb2xpY3l7ey9jcm9zc0xpbmt9fVxyXG4gKiB0byBzcGVjaWZ5IGhvdyB0byBvcHRpbWl6ZSB0aGUgaW5zdGFudGlhdGUgb3BlcmF0aW9uLlxyXG4gKlxyXG4gKiBAZW51bSBQcmVmYWIuT3B0aW1pemF0aW9uUG9saWN5XHJcbiAqIEBzaW5jZSAxLjEwLjBcclxuICovXHJcbnZhciBPcHRpbWl6YXRpb25Qb2xpY3kgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISN6aFxyXG4gICAgICog5qC55o2u5Yib5bu65qyh5pWw6Ieq5Yqo6LCD5pW05LyY5YyW562W55Wl44CC5Yid5qyh5Yib5bu65a6e5L6L5pe277yM6KGM5Li6562J5ZCMIFNJTkdMRV9JTlNUQU5DRe+8jOWkmuasoeWIm+W7uuWQjuWwhuiHquWKqOmHh+eUqCBNVUxUSV9JTlNUQU5DReOAglxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIG9wdGltaXphdGlvbiBwb2xpY3kgaXMgYXV0b21hdGljYWxseSBjaG9zZW4gYmFzZWQgb24gdGhlIG51bWJlciBvZiBpbnN0YW50aWF0aW9ucy5cclxuICAgICAqIFdoZW4geW91IGZpcnN0IGNyZWF0ZSBhbiBpbnN0YW5jZSwgdGhlIGJlaGF2aW9yIGlzIHRoZSBzYW1lIGFzIFNJTkdMRV9JTlNUQU5DRS4gTVVMVElfSU5TVEFOQ0Ugd2lsbCBiZSBhdXRvbWF0aWNhbGx5IHVzZWQgYWZ0ZXIgbXVsdGlwbGUgY3JlYXRpb24uXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQVVUT1xyXG4gICAgICovXHJcbiAgICBBVVRPOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvJjljJbljZXmrKHliJvlu7rmgKfog73jgII8YnI+XHJcbiAgICAgKiDor6XpgInpobnkvJrot7Pov4fpkojlr7nov5nkuKogcHJlZmFiIOeahOS7o+eggeeUn+aIkOS8mOWMluaTjeS9nOOAguW9k+ivpSBwcmVmYWIg5Yqg6L295ZCO77yM5LiA6Iis5Y+q5Lya5Yib5bu65LiA5Liq5a6e5L6L5pe277yM6K+36YCJ5oup5q2k6aG544CCXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBPcHRpbWl6ZSBmb3Igc2luZ2xlIGluc3RhbmNlIGNyZWF0aW9uLjxicj5cclxuICAgICAqIFRoaXMgb3B0aW9uIHNraXBzIGNvZGUgZ2VuZXJhdGlvbiBmb3IgdGhpcyBwcmVmYWIuXHJcbiAgICAgKiBXaGVuIHRoaXMgcHJlZmFiIHdpbGwgdXN1YWxseSBjcmVhdGUgb25seSBvbmUgaW5zdGFuY2VzLCBwbGVhc2Ugc2VsZWN0IHRoaXMgb3B0aW9uLlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNJTkdMRV9JTlNUQU5DRVxyXG4gICAgICovXHJcbiAgICBTSU5HTEVfSU5TVEFOQ0U6IDEsXHJcbiAgICAvKipcclxuICAgICAqICEjemhcclxuICAgICAqIOS8mOWMluWkmuasoeWIm+W7uuaAp+iDveOAgjxicj5cclxuICAgICAqIOivpemAiemhueS8muWQr+eUqOmSiOWvuei/meS4qiBwcmVmYWIg55qE5Luj56CB55Sf5oiQ5LyY5YyW5pON5L2c44CC5b2T6K+lIHByZWZhYiDliqDovb3lkI7vvIzkuIDoiKzkvJrliJvlu7rlpJrkuKrlrp7kvovml7bvvIzor7fpgInmi6nmraTpobnjgILlpoLmnpzor6UgcHJlZmFiIOWcqOWcuuaZr+S4reeahOiKgueCueWQr+eUqOS6huiHquWKqOWFs+iBlO+8jOW5tuS4lOWcqOWcuuaZr+S4reacieWkmuS7veWunuS+i++8jOS5n+W7uuiurumAieaLqeatpOmhueOAglxyXG4gICAgICogISNlblxyXG4gICAgICogT3B0aW1pemUgZm9yIGNyZWF0aW5nIGluc3RhbmNlcyBtdWx0aXBsZSB0aW1lcy48YnI+XHJcbiAgICAgKiBUaGlzIG9wdGlvbiBlbmFibGVzIGNvZGUgZ2VuZXJhdGlvbiBmb3IgdGhpcyBwcmVmYWIuXHJcbiAgICAgKiBXaGVuIHRoaXMgcHJlZmFiIHdpbGwgdXN1YWxseSBjcmVhdGUgbXVsdGlwbGUgaW5zdGFuY2VzLCBwbGVhc2Ugc2VsZWN0IHRoaXMgb3B0aW9uLlxyXG4gICAgICogSXQgaXMgYWxzbyByZWNvbW1lbmRlZCB0byBzZWxlY3QgdGhpcyBvcHRpb24gaWYgdGhlIHByZWZhYiBpbnN0YW5jZSBpbiB0aGUgc2NlbmUgaGFzIEF1dG8gU3luYyBlbmFibGVkIGFuZCB0aGVyZSBhcmUgbXVsdGlwbGUgaW5zdGFuY2VzIGluIHRoZSBzY2VuZS5cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBNVUxUSV9JTlNUQU5DRVxyXG4gICAgICovXHJcbiAgICBNVUxUSV9JTlNUQU5DRTogMixcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBDbGFzcyBmb3IgcHJlZmFiIGhhbmRsaW5nLlxyXG4gKiAhI3poIOmihOWItui1hOa6kOexu+OAglxyXG4gKiBAY2xhc3MgUHJlZmFiXHJcbiAqIEBleHRlbmRzIEFzc2V0XHJcbiAqL1xyXG52YXIgUHJlZmFiID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlByZWZhYicsXHJcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhY2hlIGZ1bmN0aW9uIHRvIG9wdGltaXplIGluc3RhbmNlIGNyZWF0b24uXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gX2NyZWF0ZUZ1bmN0aW9uXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9jcmVhdGVGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RhbnRpYXRlZFRpbWVzID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Tm9kZX0gZGF0YSAtIHRoZSBtYWluIGNjLk5vZGUgaW4gdGhlIHByZWZhYlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRhdGE6IG51bGwsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDorr7nva7lrp7kvovljJbov5nkuKogcHJlZmFiIOaXtuaJgOeUqOeahOS8mOWMluetlueVpeOAguagueaNruS9v+eUqOaDheWGteiuvue9ruS4uuWQiOmAgueahOWAvO+8jOiDveS8mOWMluivpSBwcmVmYWIg5a6e5L6L5YyW5omA55So55qE5pe26Ze044CCXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEluZGljYXRlcyB0aGUgb3B0aW1pemF0aW9uIHBvbGljeSBmb3IgaW5zdGFudGlhdGluZyB0aGlzIHByZWZhYi5cclxuICAgICAgICAgKiBTZXQgdG8gYSBzdWl0YWJsZSB2YWx1ZSBiYXNlZCBvbiB1c2FnZSwgY2FuIG9wdGltaXplIHRoZSB0aW1lIGl0IHRha2VzIHRvIGluc3RhbnRpYXRlIHRoaXMgcHJlZmFiLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtQcmVmYWIuT3B0aW1pemF0aW9uUG9saWN5fSBvcHRpbWl6YXRpb25Qb2xpY3lcclxuICAgICAgICAgKiBAZGVmYXVsdCBQcmVmYWIuT3B0aW1pemF0aW9uUG9saWN5LkFVVE9cclxuICAgICAgICAgKiBAc2luY2UgMS4xMC4wXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiBwcmVmYWIub3B0aW1pemF0aW9uUG9saWN5ID0gY2MuUHJlZmFiLk9wdGltaXphdGlvblBvbGljeS5NVUxUSV9JTlNUQU5DRTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBvcHRpbWl6YXRpb25Qb2xpY3k6IE9wdGltaXphdGlvblBvbGljeS5BVVRPLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB0aGUgcmF3IGFzc2V0cyBvZiB0aGlzIHByZWZhYiBjYW4gYmUgbG9hZCBhZnRlciBwcmVmYWIgbG9hZGVkLlxyXG4gICAgICAgICAqICEjemgg5oyH56S66K+lIFByZWZhYiDkvp3otZbnmoTotYTmupDlj6/lkKblnKggUHJlZmFiIOWKoOi9veWQjuWGjeW7tui/n+WKoOi9veOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYXN5bmNMb2FkQXNzZXRzXHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBhc3luY0xvYWRBc3NldHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHJlYWRvbmx5XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICByZWFkb25seToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIE9wdGltaXphdGlvblBvbGljeSxcclxuICAgICAgICBPcHRpbWl6YXRpb25Qb2xpY3lUaHJlc2hvbGQ6IDMsXHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZU5vZGU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoY2IpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMpO1xyXG4gICAgICAgIG5vZGUubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICBjYihudWxsLCBub2RlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEeW5hbWljYWxseSB0cmFuc2xhdGlvbiBwcmVmYWIgZGF0YSBpbnRvIG1pbmltaXplZCBjb2RlLjxici8+XHJcbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJlZm9yZSB0aGUgZmlyc3QgdGltZSB0aGUgcHJlZmFiIGJlaW5nIGluc3RhbnRpYXRlZCxcclxuICAgICAqIGJ1dCB5b3UgY2FuIHJlLWNhbGwgdG8gcmVmcmVzaCB0aGUgY3JlYXRlIGZ1bmN0aW9uIG9uY2UgeW91IG1vZGlmaWVkIHRoZSBvcmlnaW5hbCBwcmVmYWIgZGF0YSBpbiBzY3JpcHQuXHJcbiAgICAgKiBAbWV0aG9kIGNvbXBpbGVDcmVhdGVGdW5jdGlvblxyXG4gICAgICovXHJcbiAgICBjb21waWxlQ3JlYXRlRnVuY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaml0ID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vaW5zdGFudGlhdGUtaml0Jyk7XHJcbiAgICAgICAgdGhpcy5fY3JlYXRlRnVuY3Rpb24gPSBqaXQuY29tcGlsZSh0aGlzLmRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBqdXN0IGluc3RhbnRpYXRlLCB3aWxsIG5vdCBpbml0aWFsaXplIHRoZSBOb2RlLCB0aGlzIHdpbGwgYmUgY2FsbGVkIGR1cmluZyBOb2RlJ3MgaW5pdGlhbGl6YXRpb24uXHJcbiAgICAvLyBAcGFyYW0ge05vZGV9IFtyb290VG9SZWRpcmVjdF0gLSBzcGVjaWZ5IGFuIGluc3RhbnRpYXRlZCBwcmVmYWJSb290IHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gcHJlZmFiUm9vdCBpbiBwcmVmYWJcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgcmVkaXJlY3QgdG9cclxuICAgIF9kb0luc3RhbnRpYXRlOiBmdW5jdGlvbiAocm9vdFRvUmVkaXJlY3QpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5fcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIC8vIHRlbXAgZ3VhcmQgY29kZVxyXG4gICAgICAgICAgICBjYy53YXJuSUQoMzcwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fY3JlYXRlRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5jb21waWxlQ3JlYXRlRnVuY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZUZ1bmN0aW9uKHJvb3RUb1JlZGlyZWN0KTsgIC8vIHRoaXMuZGF0YS5faW5zdGFudGlhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2luc3RhbnRpYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG5vZGUsIHVzZUppdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDQ19TVVBQT1JUX0pJVCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpbWl6YXRpb25Qb2xpY3kgPT09IE9wdGltaXphdGlvblBvbGljeS5TSU5HTEVfSU5TVEFOQ0UpIHtcclxuICAgICAgICAgICAgICAgIHVzZUppdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW1pemF0aW9uUG9saWN5ID09PSBPcHRpbWl6YXRpb25Qb2xpY3kuTVVMVElfSU5TVEFOQ0UpIHtcclxuICAgICAgICAgICAgICAgIHVzZUppdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhdXRvXHJcbiAgICAgICAgICAgICAgICB1c2VKaXQgPSAodGhpcy5faW5zdGFudGlhdGVkVGltZXMgKyAxKSA+PSBQcmVmYWIuT3B0aW1pemF0aW9uUG9saWN5VGhyZXNob2xkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VKaXQpIHtcclxuICAgICAgICAgICAgLy8gaW5zdGFudGlhdGUgbm9kZVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5fZG9JbnN0YW50aWF0ZSgpO1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIG5vZGVcclxuICAgICAgICAgICAgdGhpcy5kYXRhLl9pbnN0YW50aWF0ZShub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGluc3RhbnRpYXRlIG5vZGVcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuZGF0YS5faW5zdGFudGlhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLl9pbnN0YW50aWF0ZWRUaW1lcztcclxuXHJcbiAgICAgICAgLy8gbGluayBwcmVmYWIgaW4gZWRpdG9yXHJcbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICAgICAgICAgIHZhciBQcmVmYWJVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL3ByZWZhYicpO1xyXG4gICAgICAgICAgICAvLyBUaGlzIG9wZXJhdGlvbiBpcyBub3QgbmVjZXNzYXJ5LCBidXQgc29tZSBvbGQgcHJlZmFiIGFzc2V0IG1heSBub3QgY29udGFpbiBjb21wbGV0ZSBkYXRhLlxyXG4gICAgICAgICAgICBQcmVmYWJVdGlscy5saW5rUHJlZmFiKHRoaXMsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhICYmIHRoaXMuZGF0YS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuUHJlZmFiID0gbW9kdWxlLmV4cG9ydHMgPSBQcmVmYWI7XHJcbmNjLmpzLm9ic29sZXRlKGNjLCAnY2MuX1ByZWZhYicsICdQcmVmYWInKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=