
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/ccpool/CCNodePool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en
 *  cc.NodePool is the cache pool designed for node type.<br/>
 *  It can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
 *
 * It's recommended to create cc.NodePool instances by node type, the type corresponds to node type in game design, not the class, 
 * for example, a prefab is a specific node type. <br/>
 * When you create a node pool, you can pass a Component which contains `unuse`, `reuse` functions to control the content of node.<br/>
 *
 * Some common use case is :<br/>
 *      1. Bullets in game (die very soon, massive creation and recreation, no side effect on other objects)<br/>
 *      2. Blocks in candy crash (massive creation and recreation)<br/>
 *      etc...
 * !#zh
 * cc.NodePool 是用于管理节点对象的对象缓存池。<br/>
 * 它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁<br/>
 * 以前 cocos2d-x 中的 cc.pool 和新的节点事件注册系统不兼容，因此请使用 cc.NodePool 来代替。
 *
 * 新的 NodePool 需要实例化之后才能使用，每种不同的节点对象池需要一个不同的对象池实例，这里的种类对应于游戏中的节点设计，一个 prefab 相当于一个种类的节点。<br/>
 * 在创建缓冲池时，可以传入一个包含 unuse, reuse 函数的组件类型用于节点的回收和复用逻辑。<br/>
 *
 * 一些常见的用例是：<br/>
 *      1.在游戏中的子弹（死亡很快，频繁创建，对其他对象无副作用）<br/>
 *      2.糖果粉碎传奇中的木块（频繁创建）。
 *      等等....
 * @class NodePool
 */

/**
 * !#en
 * Constructor for creating a pool for a specific node template (usually a prefab). You can pass a component (type or name) argument for handling event for reusing and recycling node.
 * !#zh
 * 使用构造函数来创建一个节点专用的对象池，您可以传递一个组件类型或名称，用于处理节点回收和复用时的事件逻辑。
 * @method constructor
 * @param {Function|String} [poolHandlerComp] !#en The constructor or the class name of the component to control the unuse/reuse logic. !#zh 处理节点回收和复用事件逻辑的组件类型或名称。
 * @example
 *  properties: {
 *    template: cc.Prefab
 *  },
 *  onLoad () {
      // MyTemplateHandler is a component with 'unuse' and 'reuse' to handle events when node is reused or recycled.
 *    this.myPool = new cc.NodePool('MyTemplateHandler');
 *  }
 * @typescript
 * constructor(poolHandlerComp?: {prototype: Component}|string)
 */
cc.NodePool = function (poolHandlerComp) {
  /**
   * !#en The pool handler component, it could be the class name or the constructor.
   * !#zh 缓冲池处理组件，用于节点的回收和复用逻辑，这个属性可以是组件类名或组件的构造函数。
   * @property poolHandlerComp
   * @type {Function|String}
   */
  this.poolHandlerComp = poolHandlerComp;
  this._pool = [];
};

cc.NodePool.prototype = {
  constructor: cc.NodePool,

  /**
   * !#en The current available size in the pool
   * !#zh 获取当前缓冲池的可用对象数量
   * @method size
   * @return {Number}
   */
  size: function size() {
    return this._pool.length;
  },

  /**
   * !#en Destroy all cached nodes in the pool
   * !#zh 销毁对象池中缓存的所有节点
   * @method clear
   */
  clear: function clear() {
    var count = this._pool.length;

    for (var i = 0; i < count; ++i) {
      this._pool[i].destroy();
    }

    this._pool.length = 0;
  },

  /**
   * !#en Put a new Node into the pool.
   * It will automatically remove the node from its parent without cleanup.
   * It will also invoke unuse method of the poolHandlerComp if exist.
   * !#zh 向缓冲池中存入一个不再需要的节点对象。
   * 这个函数会自动将目标节点从父节点上移除，但是不会进行 cleanup 操作。
   * 这个函数会调用 poolHandlerComp 的 unuse 函数，如果组件和函数都存在的话。
   * @method put
   * @param {Node} obj
   * @example
   *   let myNode = cc.instantiate(this.template);
   *   this.myPool.put(myNode);
   */
  put: function put(obj) {
    if (obj && this._pool.indexOf(obj) === -1) {
      // Remove from parent, but don't cleanup
      obj.removeFromParent(false); // Invoke pool handler

      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.unuse) {
        handler.unuse();
      }

      this._pool.push(obj);
    }
  },

  /**
   * !#en Get a obj from pool, if no available object in pool, null will be returned.
   * This function will invoke the reuse function of poolHandlerComp if exist.
   * !#zh 获取对象池中的对象，如果对象池没有可用对象，则返回空。
   * 这个函数会调用 poolHandlerComp 的 reuse 函数，如果组件和函数都存在的话。
   * @method get
   * @param {any} ...params - !#en Params to pass to 'reuse' method in poolHandlerComp !#zh 向 poolHandlerComp 中的 'reuse' 函数传递的参数
   * @return {Node|null}
   * @example
   *   let newNode = this.myPool.get();
   */
  get: function get() {
    var last = this._pool.length - 1;

    if (last < 0) {
      return null;
    } else {
      // Pop the last object in pool
      var obj = this._pool[last];
      this._pool.length = last; // Invoke pool handler

      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.reuse) {
        handler.reuse.apply(handler, arguments);
      }

      return obj;
    }
  }
};
module.exports = cc.NodePool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGNjcG9vbFxcQ0NOb2RlUG9vbC5qcyJdLCJuYW1lcyI6WyJjYyIsIk5vZGVQb29sIiwicG9vbEhhbmRsZXJDb21wIiwiX3Bvb2wiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJsZW5ndGgiLCJjbGVhciIsImNvdW50IiwiaSIsImRlc3Ryb3kiLCJwdXQiLCJvYmoiLCJpbmRleE9mIiwicmVtb3ZlRnJvbVBhcmVudCIsImhhbmRsZXIiLCJnZXRDb21wb25lbnQiLCJ1bnVzZSIsInB1c2giLCJnZXQiLCJsYXN0IiwicmV1c2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxFQUFFLENBQUNDLFFBQUgsR0FBYyxVQUFVQyxlQUFWLEVBQTJCO0FBQ3JDO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLE9BQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDSCxDQVREOztBQVVBSCxFQUFFLENBQUNDLFFBQUgsQ0FBWUcsU0FBWixHQUF3QjtBQUNwQkMsRUFBQUEsV0FBVyxFQUFFTCxFQUFFLENBQUNDLFFBREk7O0FBR3BCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxXQUFPLEtBQUtILEtBQUwsQ0FBV0ksTUFBbEI7QUFDSCxHQVhtQjs7QUFhcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZixRQUFJQyxLQUFLLEdBQUcsS0FBS04sS0FBTCxDQUFXSSxNQUF2Qjs7QUFDQSxTQUFLLElBQUlHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEtBQXBCLEVBQTJCLEVBQUVDLENBQTdCLEVBQWdDO0FBQzVCLFdBQUtQLEtBQUwsQ0FBV08sQ0FBWCxFQUFjQyxPQUFkO0FBQ0g7O0FBQ0QsU0FBS1IsS0FBTCxDQUFXSSxNQUFYLEdBQW9CLENBQXBCO0FBQ0gsR0F4Qm1COztBQTBCcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUssRUFBQUEsR0FBRyxFQUFFLGFBQVVDLEdBQVYsRUFBZTtBQUNoQixRQUFJQSxHQUFHLElBQUksS0FBS1YsS0FBTCxDQUFXVyxPQUFYLENBQW1CRCxHQUFuQixNQUE0QixDQUFDLENBQXhDLEVBQTJDO0FBQ3ZDO0FBQ0FBLE1BQUFBLEdBQUcsQ0FBQ0UsZ0JBQUosQ0FBcUIsS0FBckIsRUFGdUMsQ0FJdkM7O0FBQ0EsVUFBSUMsT0FBTyxHQUFHLEtBQUtkLGVBQUwsR0FBdUJXLEdBQUcsQ0FBQ0ksWUFBSixDQUFpQixLQUFLZixlQUF0QixDQUF2QixHQUFnRSxJQUE5RTs7QUFDQSxVQUFJYyxPQUFPLElBQUlBLE9BQU8sQ0FBQ0UsS0FBdkIsRUFBOEI7QUFDMUJGLFFBQUFBLE9BQU8sQ0FBQ0UsS0FBUjtBQUNIOztBQUVELFdBQUtmLEtBQUwsQ0FBV2dCLElBQVgsQ0FBZ0JOLEdBQWhCO0FBQ0g7QUFDSixHQXBEbUI7O0FBc0RwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lPLEVBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsUUFBSUMsSUFBSSxHQUFHLEtBQUtsQixLQUFMLENBQVdJLE1BQVgsR0FBa0IsQ0FBN0I7O0FBQ0EsUUFBSWMsSUFBSSxHQUFHLENBQVgsRUFBYztBQUNWLGFBQU8sSUFBUDtBQUNILEtBRkQsTUFHSztBQUNEO0FBQ0EsVUFBSVIsR0FBRyxHQUFHLEtBQUtWLEtBQUwsQ0FBV2tCLElBQVgsQ0FBVjtBQUNBLFdBQUtsQixLQUFMLENBQVdJLE1BQVgsR0FBb0JjLElBQXBCLENBSEMsQ0FLRDs7QUFDQSxVQUFJTCxPQUFPLEdBQUcsS0FBS2QsZUFBTCxHQUF1QlcsR0FBRyxDQUFDSSxZQUFKLENBQWlCLEtBQUtmLGVBQXRCLENBQXZCLEdBQWdFLElBQTlFOztBQUNBLFVBQUljLE9BQU8sSUFBSUEsT0FBTyxDQUFDTSxLQUF2QixFQUE4QjtBQUMxQk4sUUFBQUEsT0FBTyxDQUFDTSxLQUFSLENBQWNDLEtBQWQsQ0FBb0JQLE9BQXBCLEVBQTZCUSxTQUE3QjtBQUNIOztBQUNELGFBQU9YLEdBQVA7QUFDSDtBQUNKO0FBbEZtQixDQUF4QjtBQXFGQVksTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsRUFBRSxDQUFDQyxRQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiAgY2MuTm9kZVBvb2wgaXMgdGhlIGNhY2hlIHBvb2wgZGVzaWduZWQgZm9yIG5vZGUgdHlwZS48YnIvPlxyXG4gKiAgSXQgY2FuIGhlbHBzIHlvdSB0byBpbXByb3ZlIHlvdXIgZ2FtZSBwZXJmb3JtYW5jZSBmb3Igb2JqZWN0cyB3aGljaCBuZWVkIGZyZXF1ZW50IHJlbGVhc2UgYW5kIHJlY3JlYXRlIG9wZXJhdGlvbnM8YnIvPlxyXG4gKlxyXG4gKiBJdCdzIHJlY29tbWVuZGVkIHRvIGNyZWF0ZSBjYy5Ob2RlUG9vbCBpbnN0YW5jZXMgYnkgbm9kZSB0eXBlLCB0aGUgdHlwZSBjb3JyZXNwb25kcyB0byBub2RlIHR5cGUgaW4gZ2FtZSBkZXNpZ24sIG5vdCB0aGUgY2xhc3MsIFxyXG4gKiBmb3IgZXhhbXBsZSwgYSBwcmVmYWIgaXMgYSBzcGVjaWZpYyBub2RlIHR5cGUuIDxici8+XHJcbiAqIFdoZW4geW91IGNyZWF0ZSBhIG5vZGUgcG9vbCwgeW91IGNhbiBwYXNzIGEgQ29tcG9uZW50IHdoaWNoIGNvbnRhaW5zIGB1bnVzZWAsIGByZXVzZWAgZnVuY3Rpb25zIHRvIGNvbnRyb2wgdGhlIGNvbnRlbnQgb2Ygbm9kZS48YnIvPlxyXG4gKlxyXG4gKiBTb21lIGNvbW1vbiB1c2UgY2FzZSBpcyA6PGJyLz5cclxuICogICAgICAxLiBCdWxsZXRzIGluIGdhbWUgKGRpZSB2ZXJ5IHNvb24sIG1hc3NpdmUgY3JlYXRpb24gYW5kIHJlY3JlYXRpb24sIG5vIHNpZGUgZWZmZWN0IG9uIG90aGVyIG9iamVjdHMpPGJyLz5cclxuICogICAgICAyLiBCbG9ja3MgaW4gY2FuZHkgY3Jhc2ggKG1hc3NpdmUgY3JlYXRpb24gYW5kIHJlY3JlYXRpb24pPGJyLz5cclxuICogICAgICBldGMuLi5cclxuICogISN6aFxyXG4gKiBjYy5Ob2RlUG9vbCDmmK/nlKjkuo7nrqHnkIboioLngrnlr7nosaHnmoTlr7nosaHnvJPlrZjmsaDjgII8YnIvPlxyXG4gKiDlroPlj6/ku6XluK7liqnmgqjmj5Dpq5jmuLjmiI/mgKfog73vvIzpgILnlKjkuo7kvJjljJblr7nosaHnmoTlj43lpI3liJvlu7rlkozplIDmr4E8YnIvPlxyXG4gKiDku6XliY0gY29jb3MyZC14IOS4reeahCBjYy5wb29sIOWSjOaWsOeahOiKgueCueS6i+S7tuazqOWGjOezu+e7n+S4jeWFvOWuue+8jOWboOatpOivt+S9v+eUqCBjYy5Ob2RlUG9vbCDmnaXku6Pmm7/jgIJcclxuICpcclxuICog5paw55qEIE5vZGVQb29sIOmcgOimgeWunuS+i+WMluS5i+WQjuaJjeiDveS9v+eUqO+8jOavj+enjeS4jeWQjOeahOiKgueCueWvueixoeaxoOmcgOimgeS4gOS4quS4jeWQjOeahOWvueixoeaxoOWunuS+i++8jOi/memHjOeahOenjeexu+WvueW6lOS6jua4uOaIj+S4reeahOiKgueCueiuvuiuoe+8jOS4gOS4qiBwcmVmYWIg55u45b2T5LqO5LiA5Liq56eN57G755qE6IqC54K544CCPGJyLz5cclxuICog5Zyo5Yib5bu657yT5Yay5rGg5pe277yM5Y+v5Lul5Lyg5YWl5LiA5Liq5YyF5ZCrIHVudXNlLCByZXVzZSDlh73mlbDnmoTnu4Tku7bnsbvlnovnlKjkuo7oioLngrnnmoTlm57mlLblkozlpI3nlKjpgLvovpHjgII8YnIvPlxyXG4gKlxyXG4gKiDkuIDkupvluLjop4HnmoTnlKjkvovmmK/vvJo8YnIvPlxyXG4gKiAgICAgIDEu5Zyo5ri45oiP5Lit55qE5a2Q5by577yI5q275Lqh5b6I5b+r77yM6aKR57mB5Yib5bu677yM5a+55YW25LuW5a+56LGh5peg5Ymv5L2c55So77yJPGJyLz5cclxuICogICAgICAyLuezluaenOeyieeijuS8oOWlh+S4reeahOacqOWdl++8iOmikee5geWIm+W7uu+8ieOAglxyXG4gKiAgICAgIOetieetiS4uLi5cclxuICogQGNsYXNzIE5vZGVQb29sXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ29uc3RydWN0b3IgZm9yIGNyZWF0aW5nIGEgcG9vbCBmb3IgYSBzcGVjaWZpYyBub2RlIHRlbXBsYXRlICh1c3VhbGx5IGEgcHJlZmFiKS4gWW91IGNhbiBwYXNzIGEgY29tcG9uZW50ICh0eXBlIG9yIG5hbWUpIGFyZ3VtZW50IGZvciBoYW5kbGluZyBldmVudCBmb3IgcmV1c2luZyBhbmQgcmVjeWNsaW5nIG5vZGUuXHJcbiAqICEjemhcclxuICog5L2/55So5p6E6YCg5Ye95pWw5p2l5Yib5bu65LiA5Liq6IqC54K55LiT55So55qE5a+56LGh5rGg77yM5oKo5Y+v5Lul5Lyg6YCS5LiA5Liq57uE5Lu257G75Z6L5oiW5ZCN56ew77yM55So5LqO5aSE55CG6IqC54K55Zue5pS25ZKM5aSN55So5pe255qE5LqL5Lu26YC76L6R44CCXHJcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IFtwb29sSGFuZGxlckNvbXBdICEjZW4gVGhlIGNvbnN0cnVjdG9yIG9yIHRoZSBjbGFzcyBuYW1lIG9mIHRoZSBjb21wb25lbnQgdG8gY29udHJvbCB0aGUgdW51c2UvcmV1c2UgbG9naWMuICEjemgg5aSE55CG6IqC54K55Zue5pS25ZKM5aSN55So5LqL5Lu26YC76L6R55qE57uE5Lu257G75Z6L5oiW5ZCN56ew44CCXHJcbiAqIEBleGFtcGxlXHJcbiAqICBwcm9wZXJ0aWVzOiB7XHJcbiAqICAgIHRlbXBsYXRlOiBjYy5QcmVmYWJcclxuICogIH0sXHJcbiAqICBvbkxvYWQgKCkge1xyXG4gICAgICAvLyBNeVRlbXBsYXRlSGFuZGxlciBpcyBhIGNvbXBvbmVudCB3aXRoICd1bnVzZScgYW5kICdyZXVzZScgdG8gaGFuZGxlIGV2ZW50cyB3aGVuIG5vZGUgaXMgcmV1c2VkIG9yIHJlY3ljbGVkLlxyXG4gKiAgICB0aGlzLm15UG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnTXlUZW1wbGF0ZUhhbmRsZXInKTtcclxuICogIH1cclxuICogQHR5cGVzY3JpcHRcclxuICogY29uc3RydWN0b3IocG9vbEhhbmRsZXJDb21wPzoge3Byb3RvdHlwZTogQ29tcG9uZW50fXxzdHJpbmcpXHJcbiAqL1xyXG5jYy5Ob2RlUG9vbCA9IGZ1bmN0aW9uIChwb29sSGFuZGxlckNvbXApIHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcG9vbCBoYW5kbGVyIGNvbXBvbmVudCwgaXQgY291bGQgYmUgdGhlIGNsYXNzIG5hbWUgb3IgdGhlIGNvbnN0cnVjdG9yLlxyXG4gICAgICogISN6aCDnvJPlhrLmsaDlpITnkIbnu4Tku7bvvIznlKjkuo7oioLngrnnmoTlm57mlLblkozlpI3nlKjpgLvovpHvvIzov5nkuKrlsZ7mgKflj6/ku6XmmK/nu4Tku7bnsbvlkI3miJbnu4Tku7bnmoTmnoTpgKDlh73mlbDjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBwb29sSGFuZGxlckNvbXBcclxuICAgICAqIEB0eXBlIHtGdW5jdGlvbnxTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucG9vbEhhbmRsZXJDb21wID0gcG9vbEhhbmRsZXJDb21wO1xyXG4gICAgdGhpcy5fcG9vbCA9IFtdO1xyXG59O1xyXG5jYy5Ob2RlUG9vbC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogY2MuTm9kZVBvb2wsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBjdXJyZW50IGF2YWlsYWJsZSBzaXplIGluIHRoZSBwb29sXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjee8k+WGsuaxoOeahOWPr+eUqOWvueixoeaVsOmHj1xyXG4gICAgICogQG1ldGhvZCBzaXplXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbC5sZW5ndGg7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXN0cm95IGFsbCBjYWNoZWQgbm9kZXMgaW4gdGhlIHBvb2xcclxuICAgICAqICEjemgg6ZSA5q+B5a+56LGh5rGg5Lit57yT5a2Y55qE5omA5pyJ6IqC54K5XHJcbiAgICAgKiBAbWV0aG9kIGNsZWFyXHJcbiAgICAgKi9cclxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5fcG9vbC5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bvb2xbaV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9wb29sLmxlbmd0aCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQdXQgYSBuZXcgTm9kZSBpbnRvIHRoZSBwb29sLlxyXG4gICAgICogSXQgd2lsbCBhdXRvbWF0aWNhbGx5IHJlbW92ZSB0aGUgbm9kZSBmcm9tIGl0cyBwYXJlbnQgd2l0aG91dCBjbGVhbnVwLlxyXG4gICAgICogSXQgd2lsbCBhbHNvIGludm9rZSB1bnVzZSBtZXRob2Qgb2YgdGhlIHBvb2xIYW5kbGVyQ29tcCBpZiBleGlzdC5cclxuICAgICAqICEjemgg5ZCR57yT5Yay5rGg5Lit5a2Y5YWl5LiA5Liq5LiN5YaN6ZyA6KaB55qE6IqC54K55a+56LGh44CCXHJcbiAgICAgKiDov5nkuKrlh73mlbDkvJroh6rliqjlsIbnm67moIfoioLngrnku47niLboioLngrnkuIrnp7vpmaTvvIzkvYbmmK/kuI3kvJrov5vooYwgY2xlYW51cCDmk43kvZzjgIJcclxuICAgICAqIOi/meS4quWHveaVsOS8muiwg+eUqCBwb29sSGFuZGxlckNvbXAg55qEIHVudXNlIOWHveaVsO+8jOWmguaenOe7hOS7tuWSjOWHveaVsOmDveWtmOWcqOeahOivneOAglxyXG4gICAgICogQG1ldGhvZCBwdXRcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gb2JqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogICBsZXQgbXlOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZW1wbGF0ZSk7XHJcbiAgICAgKiAgIHRoaXMubXlQb29sLnB1dChteU5vZGUpO1xyXG4gICAgICovXHJcbiAgICBwdXQ6IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBpZiAob2JqICYmIHRoaXMuX3Bvb2wuaW5kZXhPZihvYmopID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgZnJvbSBwYXJlbnQsIGJ1dCBkb24ndCBjbGVhbnVwXHJcbiAgICAgICAgICAgIG9iai5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSBwb29sIGhhbmRsZXJcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLnBvb2xIYW5kbGVyQ29tcCA/IG9iai5nZXRDb21wb25lbnQodGhpcy5wb29sSGFuZGxlckNvbXApIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXIgJiYgaGFuZGxlci51bnVzZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlci51bnVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wb29sLnB1c2gob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgYSBvYmogZnJvbSBwb29sLCBpZiBubyBhdmFpbGFibGUgb2JqZWN0IGluIHBvb2wsIG51bGwgd2lsbCBiZSByZXR1cm5lZC5cclxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBpbnZva2UgdGhlIHJldXNlIGZ1bmN0aW9uIG9mIHBvb2xIYW5kbGVyQ29tcCBpZiBleGlzdC5cclxuICAgICAqICEjemgg6I635Y+W5a+56LGh5rGg5Lit55qE5a+56LGh77yM5aaC5p6c5a+56LGh5rGg5rKh5pyJ5Y+v55So5a+56LGh77yM5YiZ6L+U5Zue56m644CCXHJcbiAgICAgKiDov5nkuKrlh73mlbDkvJrosIPnlKggcG9vbEhhbmRsZXJDb21wIOeahCByZXVzZSDlh73mlbDvvIzlpoLmnpznu4Tku7blkozlh73mlbDpg73lrZjlnKjnmoTor53jgIJcclxuICAgICAqIEBtZXRob2QgZ2V0XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gLi4ucGFyYW1zIC0gISNlbiBQYXJhbXMgdG8gcGFzcyB0byAncmV1c2UnIG1ldGhvZCBpbiBwb29sSGFuZGxlckNvbXAgISN6aCDlkJEgcG9vbEhhbmRsZXJDb21wIOS4reeahCAncmV1c2UnIOWHveaVsOS8oOmAkueahOWPguaVsFxyXG4gICAgICogQHJldHVybiB7Tm9kZXxudWxsfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqICAgbGV0IG5ld05vZGUgPSB0aGlzLm15UG9vbC5nZXQoKTtcclxuICAgICAqL1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxhc3QgPSB0aGlzLl9wb29sLmxlbmd0aC0xO1xyXG4gICAgICAgIGlmIChsYXN0IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFBvcCB0aGUgbGFzdCBvYmplY3QgaW4gcG9vbFxyXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5fcG9vbFtsYXN0XTtcclxuICAgICAgICAgICAgdGhpcy5fcG9vbC5sZW5ndGggPSBsYXN0O1xyXG5cclxuICAgICAgICAgICAgLy8gSW52b2tlIHBvb2wgaGFuZGxlclxyXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMucG9vbEhhbmRsZXJDb21wID8gb2JqLmdldENvbXBvbmVudCh0aGlzLnBvb2xIYW5kbGVyQ29tcCkgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlciAmJiBoYW5kbGVyLnJldXNlKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnJldXNlLmFwcGx5KGhhbmRsZXIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLk5vZGVQb29sOyJdLCJzb3VyY2VSb290IjoiLyJ9