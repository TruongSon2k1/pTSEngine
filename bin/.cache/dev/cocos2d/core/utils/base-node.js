
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/base-node.js';
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
var Flags = require('../platform/CCObject').Flags;

var misc = require('./misc');

var js = require('../platform/js');

var IdGenerater = require('../platform/id-generater');

var eventManager = require('../event-manager');

var RenderFlow = require('../renderer/render-flow');

var Destroying = Flags.Destroying;
var DontDestroy = Flags.DontDestroy;
var Deactivating = Flags.Deactivating;
var CHILD_ADDED = 'child-added';
var CHILD_REMOVED = 'child-removed';
var idGenerater = new IdGenerater('Node');

function getConstructor(typeOrClassName) {
  if (!typeOrClassName) {
    cc.errorID(3804);
    return null;
  }

  if (typeof typeOrClassName === 'string') {
    return js.getClassByName(typeOrClassName);
  }

  return typeOrClassName;
}

function findComponent(node, constructor) {
  if (constructor._sealed) {
    for (var i = 0; i < node._components.length; ++i) {
      var comp = node._components[i];

      if (comp.constructor === constructor) {
        return comp;
      }
    }
  } else {
    for (var _i = 0; _i < node._components.length; ++_i) {
      var _comp = node._components[_i];

      if (_comp instanceof constructor) {
        return _comp;
      }
    }
  }

  return null;
}

function findComponents(node, constructor, components) {
  if (constructor._sealed) {
    for (var i = 0; i < node._components.length; ++i) {
      var comp = node._components[i];

      if (comp.constructor === constructor) {
        components.push(comp);
      }
    }
  } else {
    for (var _i2 = 0; _i2 < node._components.length; ++_i2) {
      var _comp2 = node._components[_i2];

      if (_comp2 instanceof constructor) {
        components.push(_comp2);
      }
    }
  }
}

function findChildComponent(children, constructor) {
  for (var i = 0; i < children.length; ++i) {
    var node = children[i];
    var comp = findComponent(node, constructor);

    if (comp) {
      return comp;
    } else if (node._children.length > 0) {
      comp = findChildComponent(node._children, constructor);

      if (comp) {
        return comp;
      }
    }
  }

  return null;
}

function findChildComponents(children, constructor, components) {
  for (var i = 0; i < children.length; ++i) {
    var node = children[i];
    findComponents(node, constructor, components);

    if (node._children.length > 0) {
      findChildComponents(node._children, constructor, components);
    }
  }
}
/**
 * A base node for CCNode, it will:
 * - maintain scene hierarchy and active logic
 * - notifications if some properties changed
 * - define some interfaces shares between CCNode
 * - define machanisms for Enity Component Systems
 * - define prefab and serialize functions
 *
 * @class _BaseNode
 * @extends Object
 * @uses EventTarget
 * @constructor
 * @param {String} [name]
 * @private
 */


var BaseNode = cc.Class({
  name: 'cc._BaseNode',
  "extends": cc.Object,
  properties: {
    // SERIALIZABLE
    _parent: null,
    _children: [],
    _active: true,

    /**
     * @property _components
     * @type {Component[]}
     * @default []
     * @readOnly
     * @private
     */
    _components: [],

    /**
     * The PrefabInfo object
     * @property _prefab
     * @type {PrefabInfo}
     * @private
     */
    _prefab: null,

    /**
     * If true, the node is an persist node which won't be destroyed during scene transition.
     * If false, the node will be destroyed automatically when loading a new scene. Default is false.
     * @property _persistNode
     * @type {Boolean}
     * @default false
     * @private
     */
    _persistNode: {
      get: function get() {
        return (this._objFlags & DontDestroy) > 0;
      },
      set: function set(value) {
        if (value) {
          this._objFlags |= DontDestroy;
        } else {
          this._objFlags &= ~DontDestroy;
        }
      }
    },
    // API

    /**
     * !#en Name of node.
     * !#zh 该节点名称。
     * @property name
     * @type {String}
     * @example
     * node.name = "New Node";
     * cc.log("Node Name: " + node.name);
     */
    name: {
      get: function get() {
        return this._name;
      },
      set: function set(value) {
        if (CC_DEV && value.indexOf('/') !== -1) {
          cc.errorID(1632);
          return;
        }

        this._name = value;

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.setName(this._name);
        }
      }
    },

    /**
     * !#en The uuid for editor, will be stripped before building project.
     * !#zh 主要用于编辑器的 uuid，在编辑器下可用于持久化存储，在项目构建之后将变成自增的 id。
     * @property uuid
     * @type {String}
     * @readOnly
     * @example
     * cc.log("Node Uuid: " + node.uuid);
     */
    uuid: {
      get: function get() {
        return this._id;
      }
    },

    /**
     * !#en All children nodes.
     * !#zh 节点的所有子节点。
     * @property children
     * @type {Node[]}
     * @readOnly
     * @example
     * var children = node.children;
     * for (var i = 0; i < children.length; ++i) {
     *     cc.log("Node: " + children[i]);
     * }
     */
    children: {
      get: function get() {
        return this._children;
      }
    },

    /**
     * !#en All children nodes.
     * !#zh 节点的子节点数量。
     * @property childrenCount
     * @type {Number}
     * @readOnly
     * @example
     * var count = node.childrenCount;
     * cc.log("Node Children Count: " + count);
     */
    childrenCount: {
      get: function get() {
        return this._children.length;
      }
    },

    /**
     * !#en
     * The local active state of this node.<br/>
     * Note that a Node may be inactive because a parent is not active, even if this returns true.<br/>
     * Use {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}} if you want to check if the Node is actually treated as active in the scene.
     * !#zh
     * 当前节点的自身激活状态。<br/>
     * 值得注意的是，一个节点的父节点如果不被激活，那么即使它自身设为激活，它仍然无法激活。<br/>
     * 如果你想检查节点在场景中实际的激活状态可以使用 {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}}。
     * @property active
     * @type {Boolean}
     * @default true
     * @example
     * node.active = false;
     */
    active: {
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        value = !!value;

        if (this._active !== value) {
          this._active = value;
          var parent = this._parent;

          if (parent) {
            var couldActiveInScene = parent._activeInHierarchy;

            if (couldActiveInScene) {
              cc.director._nodeActivator.activateNode(this, value);
            }
          }
        }
      }
    },

    /**
     * !#en Indicates whether this node is active in the scene.
     * !#zh 表示此节点是否在场景中激活。
     * @property activeInHierarchy
     * @type {Boolean}
     * @example
     * cc.log("activeInHierarchy: " + node.activeInHierarchy);
     */
    activeInHierarchy: {
      get: function get() {
        return this._activeInHierarchy;
      }
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor(name) {
    this._name = name !== undefined ? name : 'New Node';
    this._activeInHierarchy = false;
    this._id = CC_EDITOR ? Editor.Utils.UuidUtils.uuid() : idGenerater.getNewId();
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    /**
     * Register all related EventTargets,
     * all event callbacks will be removed in _onPreDestroy
     * @property __eventTargets
     * @type {EventTarget[]}
     * @private
     */

    this.__eventTargets = [];
  },

  /**
   * !#en The parent of the node.
   * !#zh 该节点的父节点。
   * @property {Node} parent
   * @example
   * cc.log("Node Parent: " + node.parent);
   */

  /**
   * !#en Get parent of the node.
   * !#zh 获取该节点的父节点。
   * @method getParent
   * @return {Node}
   * @example
   * var parent = this.node.getParent();
   */
  getParent: function getParent() {
    return this._parent;
  },

  /**
   * !#en Set parent of the node.
   * !#zh 设置该节点的父节点。
   * @method setParent
   * @param {Node} value
   * @example
   * node.setParent(newNode);
   */
  setParent: function setParent(value) {
    if (this._parent === value) {
      return;
    }

    if (CC_EDITOR && cc.engine && !cc.engine.isPlaying) {
      if (_Scene.DetectConflict.beforeAddChild(this, value)) {
        return;
      }
    }

    var oldParent = this._parent;

    if (CC_DEBUG && oldParent && oldParent._objFlags & Deactivating) {
      cc.errorID(3821);
    }

    this._parent = value || null;

    this._onSetParent(value);

    if (value) {
      if (CC_DEBUG && value._objFlags & Deactivating) {
        cc.errorID(3821);
      }

      eventManager._setDirtyForNode(this);

      value._children.push(this);

      value.emit && value.emit(CHILD_ADDED, this);
      value._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }

    if (oldParent) {
      if (!(oldParent._objFlags & Destroying)) {
        var removeAt = oldParent._children.indexOf(this);

        if (CC_DEV && removeAt < 0) {
          return cc.errorID(1633);
        }

        oldParent._children.splice(removeAt, 1);

        oldParent.emit && oldParent.emit(CHILD_REMOVED, this);

        this._onHierarchyChanged(oldParent);

        if (oldParent._children.length === 0) {
          oldParent._renderFlag &= ~RenderFlow.FLAG_CHILDREN;
        }
      }
    } else if (value) {
      this._onHierarchyChanged(null);
    }
  },
  // ABSTRACT INTERFACES

  /**
   * !#en
   * Properties configuration function <br/>
   * All properties in attrs will be set to the node, <br/>
   * when the setter of the node is available, <br/>
   * the property will be set via setter function.<br/>
   * !#zh 属性配置函数。在 attrs 的所有属性将被设置为节点属性。
   * @method attr
   * @param {Object} attrs - Properties to be set to node
   * @example
   * var attrs = { key: 0, num: 100 };
   * node.attr(attrs);
   */
  attr: function attr(attrs) {
    js.mixin(this, attrs);
  },
  // composition: GET

  /**
   * !#en Returns a child from the container given its uuid.
   * !#zh 通过 uuid 获取节点的子节点。
   * @method getChildByUuid
   * @param {String} uuid - The uuid to find the child node.
   * @return {Node} a Node whose uuid equals to the input parameter
   * @example
   * var child = node.getChildByUuid(uuid);
   */
  getChildByUuid: function getChildByUuid(uuid) {
    if (!uuid) {
      cc.log("Invalid uuid");
      return null;
    }

    var locChildren = this._children;

    for (var i = 0, len = locChildren.length; i < len; i++) {
      if (locChildren[i]._id === uuid) return locChildren[i];
    }

    return null;
  },

  /**
   * !#en Returns a child from the container given its name.
   * !#zh 通过名称获取节点的子节点。
   * @method getChildByName
   * @param {String} name - A name to find the child node.
   * @return {Node} a CCNode object whose name equals to the input parameter
   * @example
   * var child = node.getChildByName("Test Node");
   */
  getChildByName: function getChildByName(name) {
    if (!name) {
      cc.log("Invalid name");
      return null;
    }

    var locChildren = this._children;

    for (var i = 0, len = locChildren.length; i < len; i++) {
      if (locChildren[i]._name === name) return locChildren[i];
    }

    return null;
  },
  // composition: ADD
  addChild: function addChild(child) {
    if (CC_DEV && !(child instanceof cc._BaseNode)) {
      return cc.errorID(1634, cc.js.getClassName(child));
    }

    cc.assertID(child, 1606);
    cc.assertID(child._parent === null, 1605); // invokes the parent setter

    child.setParent(this);
  },

  /**
   * !#en
   * Inserts a child to the node at a specified index.
   * !#zh
   * 插入子节点到指定位置
   * @method insertChild
   * @param {Node} child - the child node to be inserted
   * @param {Number} siblingIndex - the sibling index to place the child in
   * @example
   * node.insertChild(child, 2);
   */
  insertChild: function insertChild(child, siblingIndex) {
    child.parent = this;
    child.setSiblingIndex(siblingIndex);
  },
  // HIERARCHY METHODS

  /**
   * !#en Get the sibling index.
   * !#zh 获取同级索引。
   * @method getSiblingIndex
   * @return {Number}
   * @example
   * var index = node.getSiblingIndex();
   */
  getSiblingIndex: function getSiblingIndex() {
    if (this._parent) {
      return this._parent._children.indexOf(this);
    } else {
      return 0;
    }
  },

  /**
   * !#en Set the sibling index of this node.
   * !#zh 设置节点同级索引。
   * @method setSiblingIndex
   * @param {Number} index
   * @example
   * node.setSiblingIndex(1);
   */
  setSiblingIndex: function setSiblingIndex(index) {
    if (!this._parent) {
      return;
    }

    if (this._parent._objFlags & Deactivating) {
      cc.errorID(3821);
      return;
    }

    var siblings = this._parent._children;
    index = index !== -1 ? index : siblings.length - 1;
    var oldIndex = siblings.indexOf(this);

    if (index !== oldIndex) {
      siblings.splice(oldIndex, 1);

      if (index < siblings.length) {
        siblings.splice(index, 0, this);
      } else {
        siblings.push(this);
      }

      this._onSiblingIndexChanged && this._onSiblingIndexChanged(index);
    }
  },

  /**
   * !#en Walk though the sub children tree of the current node.
   * Each node, including the current node, in the sub tree will be visited two times, before all children and after all children.
   * This function call is not recursive, it's based on stack.
   * Please don't walk any other node inside the walk process.
   * !#zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
   * 对子树中的所有节点，包含当前节点，会执行两次回调，prefunc 会在访问它的子节点之前调用，postfunc 会在访问所有子节点之后调用。
   * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
   * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
   * @method walk
   * @param {Function} prefunc The callback to process node when reach the node for the first time
   * @param {_BaseNode} prefunc.target The current visiting node
   * @param {Function} postfunc The callback to process node when re-visit the node after walked all children in its sub tree
   * @param {_BaseNode} postfunc.target The current visiting node
   * @example
   * node.walk(function (target) {
   *     console.log('Walked through node ' + target.name + ' for the first time');
   * }, function (target) {
   *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
   * });
   */
  walk: function walk(prefunc, postfunc) {
    var BaseNode = cc._BaseNode;
    var index = 1;
    var children, child, curr, i, afterChildren;
    var stack = BaseNode._stacks[BaseNode._stackId];

    if (!stack) {
      stack = [];

      BaseNode._stacks.push(stack);
    }

    BaseNode._stackId++;
    stack.length = 0;
    stack[0] = this;
    var parent = null;
    afterChildren = false;

    while (index) {
      index--;
      curr = stack[index];

      if (!curr) {
        continue;
      }

      if (!afterChildren && prefunc) {
        // pre call
        prefunc(curr);
      } else if (afterChildren && postfunc) {
        // post call
        postfunc(curr);
      } // Avoid memory leak


      stack[index] = null; // Do not repeatly visit child tree, just do post call and continue walk

      if (afterChildren) {
        if (parent === this._parent) break;
        afterChildren = false;
      } else {
        // Children not proceeded and has children, proceed to child tree
        if (curr._children.length > 0) {
          parent = curr;
          children = curr._children;
          i = 0;
          stack[index] = children[i];
          index++;
        } // No children, then repush curr to be walked for post func
        else {
            stack[index] = curr;
            index++;
            afterChildren = true;
          }

        continue;
      } // curr has no sub tree, so look into the siblings in parent children


      if (children) {
        i++; // Proceed to next sibling in parent children

        if (children[i]) {
          stack[index] = children[i];
          index++;
        } // No children any more in this sub tree, go upward
        else if (parent) {
            stack[index] = parent;
            index++; // Setup parent walk env

            afterChildren = true;

            if (parent._parent) {
              children = parent._parent._children;
              i = children.indexOf(parent);
              parent = parent._parent;
            } else {
              // At root
              parent = null;
              children = null;
            } // ERROR


            if (i < 0) {
              break;
            }
          }
      }
    }

    stack.length = 0;
    BaseNode._stackId--;
  },
  cleanup: function cleanup() {},

  /**
   * !#en
   * Remove itself from its parent node. If cleanup is `true`, then also remove all events and actions. <br/>
   * If the cleanup parameter is not passed, it will force a cleanup, so it is recommended that you always pass in the `false` parameter when calling this API.<br/>
   * If the node orphan, then nothing happens.
   * !#zh
   * 从父节点中删除该节点。如果不传入 cleanup 参数或者传入 `true`，那么这个节点上所有绑定的事件、action 都会被删除。<br/>
   * 因此建议调用这个 API 时总是传入 `false` 参数。<br/>
   * 如果这个节点是一个孤节点，那么什么都不会发生。
   * @method removeFromParent
   * @param {Boolean} [cleanup=true] - true if all actions and callbacks on this node should be removed, false otherwise.
   * @example
   * node.removeFromParent();
   * node.removeFromParent(false);
   */
  removeFromParent: function removeFromParent(cleanup) {
    if (this._parent) {
      if (cleanup === undefined) cleanup = true;

      this._parent.removeChild(this, cleanup);
    }
  },

  /**
   * !#en
   * Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter. </p>
   * If the cleanup parameter is not passed, it will force a cleanup. <br/>
   * "remove" logic MUST only be on this method  <br/>
   * If a class wants to extend the 'removeChild' behavior it only needs <br/>
   * to override this method.
   * !#zh
   * 移除节点中指定的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
   * 如果 cleanup 参数不传入，默认为 true 表示清理。<br/>
   * @method removeChild
   * @param {Node} child - The child node which will be removed.
   * @param {Boolean} [cleanup=true] - true if all running actions and callbacks on the child node will be cleanup, false otherwise.
   * @example
   * node.removeChild(newNode);
   * node.removeChild(newNode, false);
   */
  removeChild: function removeChild(child, cleanup) {
    if (this._children.indexOf(child) > -1) {
      // If you don't do cleanup, the child's actions will not get removed and the
      if (cleanup || cleanup === undefined) {
        child.cleanup();
      } // invoke the parent setter


      child.parent = null;
    }
  },

  /**
   * !#en
   * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter. <br/>
   * If the cleanup parameter is not passed, it will force a cleanup.
   * !#zh
   * 移除节点所有的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
   * 如果 cleanup 参数不传入，默认为 true 表示清理。
   * @method removeAllChildren
   * @param {Boolean} [cleanup=true] - true if all running actions on all children nodes should be cleanup, false otherwise.
   * @example
   * node.removeAllChildren();
   * node.removeAllChildren(false);
   */
  removeAllChildren: function removeAllChildren(cleanup) {
    // not using detachChild improves speed here
    var children = this._children;
    if (cleanup === undefined) cleanup = true;

    for (var i = children.length - 1; i >= 0; i--) {
      var node = children[i];

      if (node) {
        // If you don't do cleanup, the node's actions will not get removed and the
        if (cleanup) node.cleanup();
        node.parent = null;
      }
    }

    this._children.length = 0;
  },

  /**
   * !#en Is this node a child of the given node?
   * !#zh 是否是指定节点的子节点？
   * @method isChildOf
   * @param {Node} parent
   * @return {Boolean} - Returns true if this node is a child, deep child or identical to the given node.
   * @example
   * node.isChildOf(newNode);
   */
  isChildOf: function isChildOf(parent) {
    var child = this;

    do {
      if (child === parent) {
        return true;
      }

      child = child._parent;
    } while (child);

    return false;
  },
  // COMPONENT

  /**
   * !#en
   * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
   * You can also get component in the node by passing in the name of the script.
   * !#zh
   * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
   * 传入参数也可以是脚本的名称。
   * @method getComponent
   * @param {Function|String} typeOrClassName
   * @return {Component}
   * @example
   * // get sprite component
   * var sprite = node.getComponent(cc.Sprite);
   * // get custom test class
   * var test = node.getComponent("Test");
   * @typescript
   * getComponent<T extends Component>(type: {prototype: T}): T
   * getComponent(className: string): any
   */
  getComponent: function getComponent(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName);

    if (constructor) {
      return findComponent(this, constructor);
    }

    return null;
  },

  /**
   * !#en Returns all components of supplied type in the node.
   * !#zh 返回节点上指定类型的所有组件。
   * @method getComponents
   * @param {Function|String} typeOrClassName
   * @return {Component[]}
   * @example
   * var sprites = node.getComponents(cc.Sprite);
   * var tests = node.getComponents("Test");
   * @typescript
   * getComponents<T extends Component>(type: {prototype: T}): T[]
   * getComponents(className: string): any[]
   */
  getComponents: function getComponents(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName),
        components = [];

    if (constructor) {
      findComponents(this, constructor, components);
    }

    return components;
  },

  /**
   * !#en Returns the component of supplied type in any of its children using depth first search.
   * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
   * @method getComponentInChildren
   * @param {Function|String} typeOrClassName
   * @return {Component}
   * @example
   * var sprite = node.getComponentInChildren(cc.Sprite);
   * var Test = node.getComponentInChildren("Test");
   * @typescript
   * getComponentInChildren<T extends Component>(type: {prototype: T}): T
   * getComponentInChildren(className: string): any
   */
  getComponentInChildren: function getComponentInChildren(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName);

    if (constructor) {
      return findChildComponent(this._children, constructor);
    }

    return null;
  },

  /**
   * !#en Returns all components of supplied type in self or any of its children.
   * !#zh 递归查找自身或所有子节点中指定类型的组件
   * @method getComponentsInChildren
   * @param {Function|String} typeOrClassName
   * @return {Component[]}
   * @example
   * var sprites = node.getComponentsInChildren(cc.Sprite);
   * var tests = node.getComponentsInChildren("Test");
   * @typescript
   * getComponentsInChildren<T extends Component>(type: {prototype: T}): T[]
   * getComponentsInChildren(className: string): any[]
   */
  getComponentsInChildren: function getComponentsInChildren(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName),
        components = [];

    if (constructor) {
      findComponents(this, constructor, components);
      findChildComponents(this._children, constructor, components);
    }

    return components;
  },
  _checkMultipleComp: (CC_EDITOR || CC_PREVIEW) && function (ctor) {
    var existing = this.getComponent(ctor._disallowMultiple);

    if (existing) {
      if (existing.constructor === ctor) {
        cc.errorID(3805, js.getClassName(ctor), this._name);
      } else {
        cc.errorID(3806, js.getClassName(ctor), this._name, js.getClassName(existing));
      }

      return false;
    }

    return true;
  },

  /**
   * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
   * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
   * @method addComponent
   * @param {Function|String} typeOrClassName - The constructor or the class name of the component to add
   * @return {Component} - The newly added component
   * @example
   * var sprite = node.addComponent(cc.Sprite);
   * var test = node.addComponent("Test");
   * @typescript
   * addComponent<T extends Component>(type: {new(): T}): T
   * addComponent(className: string): any
   */
  addComponent: function addComponent(typeOrClassName) {
    if (CC_EDITOR && this._objFlags & Destroying) {
      cc.error('isDestroying');
      return null;
    } // get component


    var constructor;

    if (typeof typeOrClassName === 'string') {
      constructor = js.getClassByName(typeOrClassName);

      if (!constructor) {
        cc.errorID(3807, typeOrClassName);

        if (cc._RFpeek()) {
          cc.errorID(3808, typeOrClassName);
        }

        return null;
      }
    } else {
      if (!typeOrClassName) {
        cc.errorID(3804);
        return null;
      }

      constructor = typeOrClassName;
    } // check component


    if (typeof constructor !== 'function') {
      cc.errorID(3809);
      return null;
    }

    if (!js.isChildClassOf(constructor, cc.Component)) {
      cc.errorID(3810);
      return null;
    }

    if ((CC_EDITOR || CC_PREVIEW) && constructor._disallowMultiple) {
      if (!this._checkMultipleComp(constructor)) {
        return null;
      }
    } // check requirement


    var ReqComp = constructor._requireComponent;

    if (ReqComp && !this.getComponent(ReqComp)) {
      var depended = this.addComponent(ReqComp);

      if (!depended) {
        // depend conflicts
        return null;
      }
    } //// check conflict
    //
    //if (CC_EDITOR && !_Scene.DetectConflict.beforeAddComponent(this, constructor)) {
    //    return null;
    //}
    //


    var component = new constructor();
    component.node = this;

    this._components.push(component);

    if ((CC_EDITOR || CC_TEST) && cc.engine && this._id in cc.engine.attachedObjsForEditor) {
      cc.engine.attachedObjsForEditor[component._id] = component;
    }

    if (this._activeInHierarchy) {
      cc.director._nodeActivator.activateComp(component);
    }

    return component;
  },

  /**
   * This api should only used by undo system
   * @method _addComponentAt
   * @param {Component} comp
   * @param {Number} index
   * @private
   */
  _addComponentAt: CC_EDITOR && function (comp, index) {
    if (this._objFlags & Destroying) {
      return cc.error('isDestroying');
    }

    if (!(comp instanceof cc.Component)) {
      return cc.errorID(3811);
    }

    if (index > this._components.length) {
      return cc.errorID(3812);
    } // recheck attributes because script may changed


    var ctor = comp.constructor;

    if (ctor._disallowMultiple) {
      if (!this._checkMultipleComp(ctor)) {
        return;
      }
    }

    var ReqComp = ctor._requireComponent;

    if (ReqComp && !this.getComponent(ReqComp)) {
      if (index === this._components.length) {
        // If comp should be last component, increase the index because required component added
        ++index;
      }

      var depended = this.addComponent(ReqComp);

      if (!depended) {
        // depend conflicts
        return null;
      }
    }

    comp.node = this;

    this._components.splice(index, 0, comp);

    if ((CC_EDITOR || CC_TEST) && cc.engine && this._id in cc.engine.attachedObjsForEditor) {
      cc.engine.attachedObjsForEditor[comp._id] = comp;
    }

    if (this._activeInHierarchy) {
      cc.director._nodeActivator.activateComp(comp);
    }
  },

  /**
   * !#en
   * Removes a component identified by the given name or removes the component object given.
   * You can also use component.destroy() if you already have the reference.
   * !#zh
   * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
   * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
   * @method removeComponent
   * @param {String|Function|Component} component - The need remove component.
   * @deprecated please destroy the component to remove it.
   * @example
   * node.removeComponent(cc.Sprite);
   * var Test = require("Test");
   * node.removeComponent(Test);
   */
  removeComponent: function removeComponent(component) {
    if (!component) {
      cc.errorID(3813);
      return;
    }

    if (!(component instanceof cc.Component)) {
      component = this.getComponent(component);
    }

    if (component) {
      component.destroy();
    }
  },

  /**
   * @method _getDependComponent
   * @param {Component} depended
   * @return {Component}
   * @private
   */
  _getDependComponent: CC_EDITOR && function (depended) {
    for (var i = 0; i < this._components.length; i++) {
      var comp = this._components[i];

      if (comp !== depended && comp.isValid && !cc.Object._willDestroy(comp)) {
        var depend = comp.constructor._requireComponent;

        if (depend && depended instanceof depend) {
          return comp;
        }
      }
    }

    return null;
  },
  // do remove component, only used internally
  _removeComponent: function _removeComponent(component) {
    if (!component) {
      cc.errorID(3814);
      return;
    }

    if (!(this._objFlags & Destroying)) {
      var i = this._components.indexOf(component);

      if (i !== -1) {
        this._components.splice(i, 1);

        if ((CC_EDITOR || CC_TEST) && cc.engine) {
          delete cc.engine.attachedObjsForEditor[component._id];
        }
      } else if (component.node !== this) {
        cc.errorID(3815);
      }
    }
  },
  destroy: function destroy() {
    if (cc.Object.prototype.destroy.call(this)) {
      this.active = false;
    }
  },

  /**
   * !#en
   * Destroy all children from the node, and release all their own references to other objects.<br/>
   * Actual destruct operation will delayed until before rendering.
   * !#zh
   * 销毁所有子节点，并释放所有它们对其它对象的引用。<br/>
   * 实际销毁操作会延迟到当前帧渲染前执行。
   * @method destroyAllChildren
   * @example
   * node.destroyAllChildren();
   */
  destroyAllChildren: function destroyAllChildren() {
    var children = this._children;

    for (var i = 0; i < children.length; ++i) {
      children[i].destroy();
    }
  },
  _onSetParent: function _onSetParent(value) {},
  _onPostActivated: function _onPostActivated() {},
  _onBatchCreated: function _onBatchCreated(dontSyncChildPrefab) {},
  _onHierarchyChanged: function _onHierarchyChanged(oldParent) {
    var newParent = this._parent;

    if (this._persistNode && !(newParent instanceof cc.Scene)) {
      cc.game.removePersistRootNode(this);

      if (CC_EDITOR) {
        cc.warnID(1623);
      }
    }

    if (CC_EDITOR || CC_TEST) {
      var scene = cc.director.getScene();
      var inCurrentSceneBefore = oldParent && oldParent.isChildOf(scene);
      var inCurrentSceneNow = newParent && newParent.isChildOf(scene);

      if (!inCurrentSceneBefore && inCurrentSceneNow) {
        // attached
        this._registerIfAttached(true);
      } else if (inCurrentSceneBefore && !inCurrentSceneNow) {
        // detached
        this._registerIfAttached(false);
      } // update prefab


      var newPrefabRoot = newParent && newParent._prefab && newParent._prefab.root;
      var myPrefabInfo = this._prefab;

      var PrefabUtils = Editor.require('scene://utils/prefab');

      if (myPrefabInfo) {
        if (newPrefabRoot) {
          if (myPrefabInfo.root !== newPrefabRoot) {
            if (myPrefabInfo.root === this) {
              // nest prefab
              myPrefabInfo.fileId || (myPrefabInfo.fileId = Editor.Utils.UuidUtils.uuid());
              PrefabUtils.checkCircularReference(myPrefabInfo.root);
            } else {
              // change prefab
              PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
              PrefabUtils.checkCircularReference(newPrefabRoot);
            }
          }
        } else if (myPrefabInfo.root === this) {
          // nested prefab to root prefab
          myPrefabInfo.fileId = ''; // root prefab doesn't have fileId
        } else {
          // detach from prefab
          PrefabUtils.unlinkPrefab(this);
        }
      } else if (newPrefabRoot) {
        // attach to prefab
        PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
        PrefabUtils.checkCircularReference(newPrefabRoot);
      } // conflict detection


      _Scene.DetectConflict.afterAddChild(this);
    }

    var shouldActiveNow = this._active && !!(newParent && newParent._activeInHierarchy);

    if (this._activeInHierarchy !== shouldActiveNow) {
      cc.director._nodeActivator.activateNode(this, shouldActiveNow);
    }
  },
  _instantiate: function _instantiate(cloned, isSyncedNode) {
    if (!cloned) {
      cloned = cc.instantiate._clone(this, this);
    }

    var newPrefabInfo = cloned._prefab;

    if (CC_EDITOR && newPrefabInfo) {
      if (cloned === newPrefabInfo.root) {
        newPrefabInfo.fileId = '';
      } else {
        var PrefabUtils = Editor.require('scene://utils/prefab');

        PrefabUtils.unlinkPrefab(cloned);
      }
    }

    if (CC_EDITOR && cc.engine._isPlaying) {
      var syncing = newPrefabInfo && cloned === newPrefabInfo.root && newPrefabInfo.sync;

      if (!syncing) {
        cloned._name += ' (Clone)';
      }
    } // reset and init


    cloned._parent = null;

    cloned._onBatchCreated(isSyncedNode);

    return cloned;
  },
  _registerIfAttached: (CC_EDITOR || CC_TEST) && function (register) {
    var attachedObjsForEditor = cc.engine.attachedObjsForEditor;

    if (register) {
      attachedObjsForEditor[this._id] = this;

      for (var i = 0; i < this._components.length; i++) {
        var comp = this._components[i];
        attachedObjsForEditor[comp._id] = comp;
      }

      cc.engine.emit('node-attach-to-scene', this);
    } else {
      cc.engine.emit('node-detach-from-scene', this);
      delete attachedObjsForEditor[this._id];

      for (var _i3 = 0; _i3 < this._components.length; _i3++) {
        var _comp3 = this._components[_i3];
        delete attachedObjsForEditor[_comp3._id];
      }
    }

    var children = this._children;

    for (var _i4 = 0, len = children.length; _i4 < len; ++_i4) {
      var child = children[_i4];

      child._registerIfAttached(register);
    }
  },
  _onPreDestroy: function _onPreDestroy() {
    var i, len; // marked as destroying

    this._objFlags |= Destroying; // detach self and children from editor

    var parent = this._parent;
    var destroyByParent = parent && parent._objFlags & Destroying;

    if (!destroyByParent && (CC_EDITOR || CC_TEST)) {
      this._registerIfAttached(false);
    } // destroy children


    var children = this._children;

    for (i = 0, len = children.length; i < len; ++i) {
      // destroy immediate so its _onPreDestroy can be called
      children[i]._destroyImmediate();
    } // destroy self components


    for (i = 0, len = this._components.length; i < len; ++i) {
      var component = this._components[i]; // destroy immediate so its _onPreDestroy can be called

      component._destroyImmediate();
    }

    var eventTargets = this.__eventTargets;

    for (i = 0, len = eventTargets.length; i < len; ++i) {
      var target = eventTargets[i];
      target && target.targetOff(this);
    }

    eventTargets.length = 0; // remove from persist

    if (this._persistNode) {
      cc.game.removePersistRootNode(this);
    }

    if (!destroyByParent) {
      // remove from parent
      if (parent) {
        var childIndex = parent._children.indexOf(this);

        parent._children.splice(childIndex, 1);

        parent.emit && parent.emit('child-removed', this);
      }
    }

    return destroyByParent;
  },
  onRestore: CC_EDITOR && function () {
    // check activity state
    var shouldActiveNow = this._active && !!(this._parent && this._parent._activeInHierarchy);

    if (this._activeInHierarchy !== shouldActiveNow) {
      cc.director._nodeActivator.activateNode(this, shouldActiveNow);
    }
  }
});
BaseNode.idGenerater = idGenerater; // For walk

BaseNode._stacks = [[]];
BaseNode._stackId = 0;
BaseNode.prototype._onPreDestroyBase = BaseNode.prototype._onPreDestroy;

if (CC_EDITOR) {
  BaseNode.prototype._onPreDestroy = function () {
    var destroyByParent = this._onPreDestroyBase();

    if (!destroyByParent) {
      // ensure this node can reattach to scene by undo system
      // (simulate some destruct logic to make undo system work correctly)
      this._parent = null;
    }

    return destroyByParent;
  };
}

BaseNode.prototype._onHierarchyChangedBase = BaseNode.prototype._onHierarchyChanged;

if (CC_EDITOR) {
  BaseNode.prototype._onRestoreBase = BaseNode.prototype.onRestore;
} // Define public getter and setter methods to ensure api compatibility.


var SameNameGetSets = ['parent', 'name', 'children', 'childrenCount'];
misc.propertyDefine(BaseNode, SameNameGetSets, {});

if (CC_DEV) {
  // promote debug info
  js.get(BaseNode.prototype, ' INFO ', function () {
    var path = '';
    var node = this;

    while (node && !(node instanceof cc.Scene)) {
      if (path) {
        path = node.name + '/' + path;
      } else {
        path = node.name;
      }

      node = node._parent;
    }

    return this.name + ', path: ' + path;
  });
}
/**
 * !#en
 * Note: This event is only emitted from the top most node whose active value did changed,
 * not including its child nodes.
 * !#zh
 * 注意：此节点激活时，此事件仅从最顶部的节点发出。
 * @event active-in-hierarchy-changed
 * @param {Event.EventCustom} event
 */


cc._BaseNode = module.exports = BaseNode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxiYXNlLW5vZGUuanMiXSwibmFtZXMiOlsiRmxhZ3MiLCJyZXF1aXJlIiwibWlzYyIsImpzIiwiSWRHZW5lcmF0ZXIiLCJldmVudE1hbmFnZXIiLCJSZW5kZXJGbG93IiwiRGVzdHJveWluZyIsIkRvbnREZXN0cm95IiwiRGVhY3RpdmF0aW5nIiwiQ0hJTERfQURERUQiLCJDSElMRF9SRU1PVkVEIiwiaWRHZW5lcmF0ZXIiLCJnZXRDb25zdHJ1Y3RvciIsInR5cGVPckNsYXNzTmFtZSIsImNjIiwiZXJyb3JJRCIsImdldENsYXNzQnlOYW1lIiwiZmluZENvbXBvbmVudCIsIm5vZGUiLCJjb25zdHJ1Y3RvciIsIl9zZWFsZWQiLCJpIiwiX2NvbXBvbmVudHMiLCJsZW5ndGgiLCJjb21wIiwiZmluZENvbXBvbmVudHMiLCJjb21wb25lbnRzIiwicHVzaCIsImZpbmRDaGlsZENvbXBvbmVudCIsImNoaWxkcmVuIiwiX2NoaWxkcmVuIiwiZmluZENoaWxkQ29tcG9uZW50cyIsIkJhc2VOb2RlIiwiQ2xhc3MiLCJuYW1lIiwiT2JqZWN0IiwicHJvcGVydGllcyIsIl9wYXJlbnQiLCJfYWN0aXZlIiwiX3ByZWZhYiIsIl9wZXJzaXN0Tm9kZSIsImdldCIsIl9vYmpGbGFncyIsInNldCIsInZhbHVlIiwiX25hbWUiLCJDQ19ERVYiLCJpbmRleE9mIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJfcHJveHkiLCJzZXROYW1lIiwidXVpZCIsIl9pZCIsImNoaWxkcmVuQ291bnQiLCJhY3RpdmUiLCJwYXJlbnQiLCJjb3VsZEFjdGl2ZUluU2NlbmUiLCJfYWN0aXZlSW5IaWVyYXJjaHkiLCJkaXJlY3RvciIsIl9ub2RlQWN0aXZhdG9yIiwiYWN0aXZhdGVOb2RlIiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJjdG9yIiwidW5kZWZpbmVkIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiVXRpbHMiLCJVdWlkVXRpbHMiLCJnZXROZXdJZCIsIl9zY2hlZHVsZXIiLCJlbmFibGVGb3JUYXJnZXQiLCJfX2V2ZW50VGFyZ2V0cyIsImdldFBhcmVudCIsInNldFBhcmVudCIsImVuZ2luZSIsImlzUGxheWluZyIsIl9TY2VuZSIsIkRldGVjdENvbmZsaWN0IiwiYmVmb3JlQWRkQ2hpbGQiLCJvbGRQYXJlbnQiLCJDQ19ERUJVRyIsIl9vblNldFBhcmVudCIsIl9zZXREaXJ0eUZvck5vZGUiLCJlbWl0IiwiX3JlbmRlckZsYWciLCJGTEFHX0NISUxEUkVOIiwicmVtb3ZlQXQiLCJzcGxpY2UiLCJfb25IaWVyYXJjaHlDaGFuZ2VkIiwiYXR0ciIsImF0dHJzIiwibWl4aW4iLCJnZXRDaGlsZEJ5VXVpZCIsImxvZyIsImxvY0NoaWxkcmVuIiwibGVuIiwiZ2V0Q2hpbGRCeU5hbWUiLCJhZGRDaGlsZCIsImNoaWxkIiwiX0Jhc2VOb2RlIiwiZ2V0Q2xhc3NOYW1lIiwiYXNzZXJ0SUQiLCJpbnNlcnRDaGlsZCIsInNpYmxpbmdJbmRleCIsInNldFNpYmxpbmdJbmRleCIsImdldFNpYmxpbmdJbmRleCIsImluZGV4Iiwic2libGluZ3MiLCJvbGRJbmRleCIsIl9vblNpYmxpbmdJbmRleENoYW5nZWQiLCJ3YWxrIiwicHJlZnVuYyIsInBvc3RmdW5jIiwiY3VyciIsImFmdGVyQ2hpbGRyZW4iLCJzdGFjayIsIl9zdGFja3MiLCJfc3RhY2tJZCIsImNsZWFudXAiLCJyZW1vdmVGcm9tUGFyZW50IiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVBbGxDaGlsZHJlbiIsImlzQ2hpbGRPZiIsImdldENvbXBvbmVudCIsImdldENvbXBvbmVudHMiLCJnZXRDb21wb25lbnRJbkNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4iLCJfY2hlY2tNdWx0aXBsZUNvbXAiLCJDQ19QUkVWSUVXIiwiZXhpc3RpbmciLCJfZGlzYWxsb3dNdWx0aXBsZSIsImFkZENvbXBvbmVudCIsImVycm9yIiwiX1JGcGVlayIsImlzQ2hpbGRDbGFzc09mIiwiQ29tcG9uZW50IiwiUmVxQ29tcCIsIl9yZXF1aXJlQ29tcG9uZW50IiwiZGVwZW5kZWQiLCJjb21wb25lbnQiLCJDQ19URVNUIiwiYXR0YWNoZWRPYmpzRm9yRWRpdG9yIiwiYWN0aXZhdGVDb21wIiwiX2FkZENvbXBvbmVudEF0IiwicmVtb3ZlQ29tcG9uZW50IiwiZGVzdHJveSIsIl9nZXREZXBlbmRDb21wb25lbnQiLCJpc1ZhbGlkIiwiX3dpbGxEZXN0cm95IiwiZGVwZW5kIiwiX3JlbW92ZUNvbXBvbmVudCIsInByb3RvdHlwZSIsImNhbGwiLCJkZXN0cm95QWxsQ2hpbGRyZW4iLCJfb25Qb3N0QWN0aXZhdGVkIiwiX29uQmF0Y2hDcmVhdGVkIiwiZG9udFN5bmNDaGlsZFByZWZhYiIsIm5ld1BhcmVudCIsIlNjZW5lIiwiZ2FtZSIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsIndhcm5JRCIsInNjZW5lIiwiZ2V0U2NlbmUiLCJpbkN1cnJlbnRTY2VuZUJlZm9yZSIsImluQ3VycmVudFNjZW5lTm93IiwiX3JlZ2lzdGVySWZBdHRhY2hlZCIsIm5ld1ByZWZhYlJvb3QiLCJyb290IiwibXlQcmVmYWJJbmZvIiwiUHJlZmFiVXRpbHMiLCJmaWxlSWQiLCJjaGVja0NpcmN1bGFyUmVmZXJlbmNlIiwibGlua1ByZWZhYiIsImFzc2V0IiwidW5saW5rUHJlZmFiIiwiYWZ0ZXJBZGRDaGlsZCIsInNob3VsZEFjdGl2ZU5vdyIsIl9pbnN0YW50aWF0ZSIsImNsb25lZCIsImlzU3luY2VkTm9kZSIsImluc3RhbnRpYXRlIiwiX2Nsb25lIiwibmV3UHJlZmFiSW5mbyIsIl9pc1BsYXlpbmciLCJzeW5jaW5nIiwic3luYyIsInJlZ2lzdGVyIiwiX29uUHJlRGVzdHJveSIsImRlc3Ryb3lCeVBhcmVudCIsIl9kZXN0cm95SW1tZWRpYXRlIiwiZXZlbnRUYXJnZXRzIiwidGFyZ2V0IiwidGFyZ2V0T2ZmIiwiY2hpbGRJbmRleCIsIm9uUmVzdG9yZSIsIl9vblByZURlc3Ryb3lCYXNlIiwiX29uSGllcmFyY2h5Q2hhbmdlZEJhc2UiLCJfb25SZXN0b3JlQmFzZSIsIlNhbWVOYW1lR2V0U2V0cyIsInByb3BlcnR5RGVmaW5lIiwicGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLHNCQUFELENBQVAsQ0FBZ0NELEtBQTlDOztBQUNBLElBQU1FLElBQUksR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBcEI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRixPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUksWUFBWSxHQUFHSixPQUFPLENBQUMsa0JBQUQsQ0FBNUI7O0FBQ0EsSUFBTUssVUFBVSxHQUFHTCxPQUFPLENBQUMseUJBQUQsQ0FBMUI7O0FBRUEsSUFBTU0sVUFBVSxHQUFHUCxLQUFLLENBQUNPLFVBQXpCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHUixLQUFLLENBQUNRLFdBQTFCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHVCxLQUFLLENBQUNTLFlBQTNCO0FBRUEsSUFBTUMsV0FBVyxHQUFHLGFBQXBCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLGVBQXRCO0FBRUEsSUFBSUMsV0FBVyxHQUFHLElBQUlSLFdBQUosQ0FBZ0IsTUFBaEIsQ0FBbEI7O0FBRUEsU0FBU1MsY0FBVCxDQUF3QkMsZUFBeEIsRUFBeUM7QUFDckMsTUFBSSxDQUFDQSxlQUFMLEVBQXNCO0FBQ2xCQyxJQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxJQUFYO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBQ0QsTUFBSSxPQUFPRixlQUFQLEtBQTJCLFFBQS9C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SDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE1TCxFQUFFLENBQUNzRixTQUFILEdBQWV1RyxNQUFNLENBQUNDLE9BQVAsR0FBaUI1SyxRQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBGbGFncyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDT2JqZWN0JykuRmxhZ3M7XG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi9taXNjJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCBJZEdlbmVyYXRlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2lkLWdlbmVyYXRlcicpO1xuY29uc3QgZXZlbnRNYW5hZ2VyID0gcmVxdWlyZSgnLi4vZXZlbnQtbWFuYWdlcicpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5cbmNvbnN0IERlc3Ryb3lpbmcgPSBGbGFncy5EZXN0cm95aW5nO1xuY29uc3QgRG9udERlc3Ryb3kgPSBGbGFncy5Eb250RGVzdHJveTtcbmNvbnN0IERlYWN0aXZhdGluZyA9IEZsYWdzLkRlYWN0aXZhdGluZztcblxuY29uc3QgQ0hJTERfQURERUQgPSAnY2hpbGQtYWRkZWQnO1xuY29uc3QgQ0hJTERfUkVNT1ZFRCA9ICdjaGlsZC1yZW1vdmVkJztcblxudmFyIGlkR2VuZXJhdGVyID0gbmV3IElkR2VuZXJhdGVyKCdOb2RlJyk7XG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSkge1xuICAgIGlmICghdHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIGNjLmVycm9ySUQoMzgwNCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHR5cGVPckNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGpzLmdldENsYXNzQnlOYW1lKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHR5cGVPckNsYXNzTmFtZTtcbn1cblxuZnVuY3Rpb24gZmluZENvbXBvbmVudChub2RlLCBjb25zdHJ1Y3Rvcikge1xuICAgIGlmIChjb25zdHJ1Y3Rvci5fc2VhbGVkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5fY29tcG9uZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGNvbXAgPSBub2RlLl9jb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXAuY29uc3RydWN0b3IgPT09IGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5fY29tcG9uZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGNvbXAgPSBub2RlLl9jb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBmaW5kQ29tcG9uZW50cyhub2RlLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cykge1xuICAgIGlmIChjb25zdHJ1Y3Rvci5fc2VhbGVkKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5fY29tcG9uZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IGNvbXAgPSBub2RlLl9jb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGNvbXAuY29uc3RydWN0b3IgPT09IGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NvbXBvbmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0gbm9kZS5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wIGluc3RhbmNlb2YgY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRDaGlsZENvbXBvbmVudChjaGlsZHJlbiwgY29uc3RydWN0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBub2RlID0gY2hpbGRyZW5baV07XG4gICAgICAgIHZhciBjb21wID0gZmluZENvbXBvbmVudChub2RlLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgIGlmIChjb21wKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChub2RlLl9jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb21wID0gZmluZENoaWxkQ29tcG9uZW50KG5vZGUuX2NoaWxkcmVuLCBjb25zdHJ1Y3Rvcik7XG4gICAgICAgICAgICBpZiAoY29tcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBmaW5kQ2hpbGRDb21wb25lbnRzKGNoaWxkcmVuLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgZmluZENvbXBvbmVudHMobm9kZSwgY29uc3RydWN0b3IsIGNvbXBvbmVudHMpO1xuICAgICAgICBpZiAobm9kZS5fY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmluZENoaWxkQ29tcG9uZW50cyhub2RlLl9jaGlsZHJlbiwgY29uc3RydWN0b3IsIGNvbXBvbmVudHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEEgYmFzZSBub2RlIGZvciBDQ05vZGUsIGl0IHdpbGw6XG4gKiAtIG1haW50YWluIHNjZW5lIGhpZXJhcmNoeSBhbmQgYWN0aXZlIGxvZ2ljXG4gKiAtIG5vdGlmaWNhdGlvbnMgaWYgc29tZSBwcm9wZXJ0aWVzIGNoYW5nZWRcbiAqIC0gZGVmaW5lIHNvbWUgaW50ZXJmYWNlcyBzaGFyZXMgYmV0d2VlbiBDQ05vZGVcbiAqIC0gZGVmaW5lIG1hY2hhbmlzbXMgZm9yIEVuaXR5IENvbXBvbmVudCBTeXN0ZW1zXG4gKiAtIGRlZmluZSBwcmVmYWIgYW5kIHNlcmlhbGl6ZSBmdW5jdGlvbnNcbiAqXG4gKiBAY2xhc3MgX0Jhc2VOb2RlXG4gKiBAZXh0ZW5kcyBPYmplY3RcbiAqIEB1c2VzIEV2ZW50VGFyZ2V0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBCYXNlTm9kZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuX0Jhc2VOb2RlJyxcbiAgICBleHRlbmRzOiBjYy5PYmplY3QsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIFNFUklBTElaQUJMRVxuXG4gICAgICAgIF9wYXJlbnQ6IG51bGwsXG4gICAgICAgIF9jaGlsZHJlbjogW10sXG5cbiAgICAgICAgX2FjdGl2ZTogdHJ1ZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IF9jb21wb25lbnRzXG4gICAgICAgICAqIEB0eXBlIHtDb21wb25lbnRbXX1cbiAgICAgICAgICogQGRlZmF1bHQgW11cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfY29tcG9uZW50czogW10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBQcmVmYWJJbmZvIG9iamVjdFxuICAgICAgICAgKiBAcHJvcGVydHkgX3ByZWZhYlxuICAgICAgICAgKiBAdHlwZSB7UHJlZmFiSW5mb31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9wcmVmYWI6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRydWUsIHRoZSBub2RlIGlzIGFuIHBlcnNpc3Qgbm9kZSB3aGljaCB3b24ndCBiZSBkZXN0cm95ZWQgZHVyaW5nIHNjZW5lIHRyYW5zaXRpb24uXG4gICAgICAgICAqIElmIGZhbHNlLCB0aGUgbm9kZSB3aWxsIGJlIGRlc3Ryb3llZCBhdXRvbWF0aWNhbGx5IHdoZW4gbG9hZGluZyBhIG5ldyBzY2VuZS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAgICAgICAgICogQHByb3BlcnR5IF9wZXJzaXN0Tm9kZVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF9wZXJzaXN0Tm9kZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX29iakZsYWdzICYgRG9udERlc3Ryb3kpID4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29iakZsYWdzIHw9IERvbnREZXN0cm95O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb2JqRmxhZ3MgJj0gfkRvbnREZXN0cm95O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyBBUElcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBOYW1lIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6K+l6IqC54K55ZCN56ew44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUubmFtZSA9IFwiTmV3IE5vZGVcIjtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBOYW1lOiBcIiArIG5vZGUubmFtZSk7XG4gICAgICAgICAqL1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVWICYmIHZhbHVlLmluZGV4T2YoJy8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgxNjMyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm94eS5zZXROYW1lKHRoaXMuX25hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHV1aWQgZm9yIGVkaXRvciwgd2lsbCBiZSBzdHJpcHBlZCBiZWZvcmUgYnVpbGRpbmcgcHJvamVjdC5cbiAgICAgICAgICogISN6aCDkuLvopoHnlKjkuo7nvJbovpHlmajnmoQgdXVpZO+8jOWcqOe8lui+keWZqOS4i+WPr+eUqOS6juaMgeS5heWMluWtmOWCqO+8jOWcqOmhueebruaehOW7uuS5i+WQjuWwhuWPmOaIkOiHquWinueahCBpZOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgdXVpZFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBVdWlkOiBcIiArIG5vZGUudXVpZCk7XG4gICAgICAgICAqL1xuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBBbGwgY2hpbGRyZW4gbm9kZXMuXG4gICAgICAgICAqICEjemgg6IqC54K555qE5omA5pyJ5a2Q6IqC54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjaGlsZHJlblxuICAgICAgICAgKiBAdHlwZSB7Tm9kZVtdfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgICogZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgKiAgICAgY2MubG9nKFwiTm9kZTogXCIgKyBjaGlsZHJlbltpXSk7XG4gICAgICAgICAqIH1cbiAgICAgICAgICovXG4gICAgICAgIGNoaWxkcmVuOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBBbGwgY2hpbGRyZW4gbm9kZXMuXG4gICAgICAgICAqICEjemgg6IqC54K555qE5a2Q6IqC54K55pWw6YeP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjaGlsZHJlbkNvdW50XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiB2YXIgY291bnQgPSBub2RlLmNoaWxkcmVuQ291bnQ7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgQ2hpbGRyZW4gQ291bnQ6IFwiICsgY291bnQpO1xuICAgICAgICAgKi9cbiAgICAgICAgY2hpbGRyZW5Db3VudDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBsb2NhbCBhY3RpdmUgc3RhdGUgb2YgdGhpcyBub2RlLjxici8+XG4gICAgICAgICAqIE5vdGUgdGhhdCBhIE5vZGUgbWF5IGJlIGluYWN0aXZlIGJlY2F1c2UgYSBwYXJlbnQgaXMgbm90IGFjdGl2ZSwgZXZlbiBpZiB0aGlzIHJldHVybnMgdHJ1ZS48YnIvPlxuICAgICAgICAgKiBVc2Uge3sjY3Jvc3NMaW5rIFwiTm9kZS9hY3RpdmVJbkhpZXJhcmNoeTpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBpZiB5b3Ugd2FudCB0byBjaGVjayBpZiB0aGUgTm9kZSBpcyBhY3R1YWxseSB0cmVhdGVkIGFzIGFjdGl2ZSBpbiB0aGUgc2NlbmUuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5b2T5YmN6IqC54K555qE6Ieq6Lqr5r+A5rS754q25oCB44CCPGJyLz5cbiAgICAgICAgICog5YC85b6X5rOo5oSP55qE5piv77yM5LiA5Liq6IqC54K555qE54i26IqC54K55aaC5p6c5LiN6KKr5r+A5rS777yM6YKj5LmI5Y2z5L2/5a6D6Ieq6Lqr6K6+5Li65r+A5rS777yM5a6D5LuN54S25peg5rOV5r+A5rS744CCPGJyLz5cbiAgICAgICAgICog5aaC5p6c5L2g5oOz5qOA5p+l6IqC54K55Zyo5Zy65pmv5Lit5a6e6ZmF55qE5r+A5rS754q25oCB5Y+v5Lul5L2/55SoIHt7I2Nyb3NzTGluayBcIk5vZGUvYWN0aXZlSW5IaWVyYXJjaHk6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX3jgIJcbiAgICAgICAgICogQHByb3BlcnR5IGFjdGl2ZVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgKi9cbiAgICAgICAgYWN0aXZlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvdWxkQWN0aXZlSW5TY2VuZSA9IHBhcmVudC5fYWN0aXZlSW5IaWVyYXJjaHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bGRBY3RpdmVJblNjZW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuX25vZGVBY3RpdmF0b3IuYWN0aXZhdGVOb2RlKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIG5vZGUgaXMgYWN0aXZlIGluIHRoZSBzY2VuZS5cbiAgICAgICAgICogISN6aCDooajnpLrmraToioLngrnmmK/lkKblnKjlnLrmma/kuK3mv4DmtLvjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGFjdGl2ZUluSGllcmFyY2h5XG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjYy5sb2coXCJhY3RpdmVJbkhpZXJhcmNoeTogXCIgKyBub2RlLmFjdGl2ZUluSGllcmFyY2h5KTtcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZUluSGllcmFyY2h5OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKi9cbiAgICBjdG9yIChuYW1lKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lICE9PSB1bmRlZmluZWQgPyBuYW1lIDogJ05ldyBOb2RlJztcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSBDQ19FRElUT1IgPyBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLnV1aWQoKSA6IGlkR2VuZXJhdGVyLmdldE5ld0lkKCk7XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuX3NjaGVkdWxlciAmJiBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXIgYWxsIHJlbGF0ZWQgRXZlbnRUYXJnZXRzLFxuICAgICAgICAgKiBhbGwgZXZlbnQgY2FsbGJhY2tzIHdpbGwgYmUgcmVtb3ZlZCBpbiBfb25QcmVEZXN0cm95XG4gICAgICAgICAqIEBwcm9wZXJ0eSBfX2V2ZW50VGFyZ2V0c1xuICAgICAgICAgKiBAdHlwZSB7RXZlbnRUYXJnZXRbXX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX19ldmVudFRhcmdldHMgPSBbXTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICAgKiAhI3poIOivpeiKgueCueeahOeItuiKgueCueOAglxuICAgICAqIEBwcm9wZXJ0eSB7Tm9kZX0gcGFyZW50XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5sb2coXCJOb2RlIFBhcmVudDogXCIgKyBub2RlLnBhcmVudCk7XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAgICogISN6aCDojrflj5bor6XoioLngrnnmoTniLboioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBhcmVudFxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcGFyZW50ID0gdGhpcy5ub2RlLmdldFBhcmVudCgpO1xuICAgICAqL1xuICAgIGdldFBhcmVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICAgKiAhI3poIOiuvue9ruivpeiKgueCueeahOeItuiKgueCueOAglxuICAgICAqIEBtZXRob2Qgc2V0UGFyZW50XG4gICAgICogQHBhcmFtIHtOb2RlfSB2YWx1ZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5zZXRQYXJlbnQobmV3Tm9kZSk7XG4gICAgICovXG4gICAgc2V0UGFyZW50ICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50ID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgY2MuZW5naW5lICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAoX1NjZW5lLkRldGVjdENvbmZsaWN0LmJlZm9yZUFkZENoaWxkKHRoaXMsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgb2xkUGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgb2xkUGFyZW50ICYmIChvbGRQYXJlbnQuX29iakZsYWdzICYgRGVhY3RpdmF0aW5nKSkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzODIxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZSB8fCBudWxsO1xuXG4gICAgICAgIHRoaXMuX29uU2V0UGFyZW50KHZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRyAmJiAodmFsdWUuX29iakZsYWdzICYgRGVhY3RpdmF0aW5nKSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgyMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuX3NldERpcnR5Rm9yTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIHZhbHVlLl9jaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgdmFsdWUuZW1pdCAmJiB2YWx1ZS5lbWl0KENISUxEX0FEREVELCB0aGlzKTtcbiAgICAgICAgICAgIHZhbHVlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkUGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoIShvbGRQYXJlbnQuX29iakZsYWdzICYgRGVzdHJveWluZykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlQXQgPSBvbGRQYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFViAmJiByZW1vdmVBdCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoMTYzMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5fY2hpbGRyZW4uc3BsaWNlKHJlbW92ZUF0LCAxKTtcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQuZW1pdCAmJiBvbGRQYXJlbnQuZW1pdChDSElMRF9SRU1PVkVELCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkhpZXJhcmNoeUNoYW5nZWQob2xkUGFyZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChvbGRQYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRQYXJlbnQuX3JlbmRlckZsYWcgJj0gflJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX29uSGllcmFyY2h5Q2hhbmdlZChudWxsKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBQlNUUkFDVCBJTlRFUkZBQ0VTXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJvcGVydGllcyBjb25maWd1cmF0aW9uIGZ1bmN0aW9uIDxici8+XG4gICAgICogQWxsIHByb3BlcnRpZXMgaW4gYXR0cnMgd2lsbCBiZSBzZXQgdG8gdGhlIG5vZGUsIDxici8+XG4gICAgICogd2hlbiB0aGUgc2V0dGVyIG9mIHRoZSBub2RlIGlzIGF2YWlsYWJsZSwgPGJyLz5cbiAgICAgKiB0aGUgcHJvcGVydHkgd2lsbCBiZSBzZXQgdmlhIHNldHRlciBmdW5jdGlvbi48YnIvPlxuICAgICAqICEjemgg5bGe5oCn6YWN572u5Ye95pWw44CC5ZyoIGF0dHJzIOeahOaJgOacieWxnuaAp+Wwhuiiq+iuvue9ruS4uuiKgueCueWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgYXR0clxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIFByb3BlcnRpZXMgdG8gYmUgc2V0IHRvIG5vZGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhdHRycyA9IHsga2V5OiAwLCBudW06IDEwMCB9O1xuICAgICAqIG5vZGUuYXR0cihhdHRycyk7XG4gICAgICovXG4gICAgYXR0ciAoYXR0cnMpIHtcbiAgICAgICAganMubWl4aW4odGhpcywgYXR0cnMpO1xuICAgIH0sXG5cbiAgICAvLyBjb21wb3NpdGlvbjogR0VUXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYSBjaGlsZCBmcm9tIHRoZSBjb250YWluZXIgZ2l2ZW4gaXRzIHV1aWQuXG4gICAgICogISN6aCDpgJrov4cgdXVpZCDojrflj5boioLngrnnmoTlrZDoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldENoaWxkQnlVdWlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCB0byBmaW5kIHRoZSBjaGlsZCBub2RlLlxuICAgICAqIEByZXR1cm4ge05vZGV9IGEgTm9kZSB3aG9zZSB1dWlkIGVxdWFscyB0byB0aGUgaW5wdXQgcGFyYW1ldGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY2hpbGQgPSBub2RlLmdldENoaWxkQnlVdWlkKHV1aWQpO1xuICAgICAqL1xuICAgIGdldENoaWxkQnlVdWlkICh1dWlkKSB7XG4gICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgY2MubG9nKFwiSW52YWxpZCB1dWlkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9jQ2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxvY0NoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobG9jQ2hpbGRyZW5baV0uX2lkID09PSB1dWlkKVxuICAgICAgICAgICAgICAgIHJldHVybiBsb2NDaGlsZHJlbltpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGEgY2hpbGQgZnJvbSB0aGUgY29udGFpbmVyIGdpdmVuIGl0cyBuYW1lLlxuICAgICAqICEjemgg6YCa6L+H5ZCN56ew6I635Y+W6IqC54K555qE5a2Q6IqC54K544CCXG4gICAgICogQG1ldGhvZCBnZXRDaGlsZEJ5TmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gQSBuYW1lIHRvIGZpbmQgdGhlIGNoaWxkIG5vZGUuXG4gICAgICogQHJldHVybiB7Tm9kZX0gYSBDQ05vZGUgb2JqZWN0IHdob3NlIG5hbWUgZXF1YWxzIHRvIHRoZSBpbnB1dCBwYXJhbWV0ZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJUZXN0IE5vZGVcIik7XG4gICAgICovXG4gICAgZ2V0Q2hpbGRCeU5hbWUgKG5hbWUpIHtcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJJbnZhbGlkIG5hbWVcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2NDaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbG9jQ2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsb2NDaGlsZHJlbltpXS5fbmFtZSA9PT0gbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jQ2hpbGRyZW5baV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8vIGNvbXBvc2l0aW9uOiBBRERcblxuICAgIGFkZENoaWxkIChjaGlsZCkge1xuXG4gICAgICAgIGlmIChDQ19ERVYgJiYgIShjaGlsZCBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDE2MzQsIGNjLmpzLmdldENsYXNzTmFtZShjaGlsZCkpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmFzc2VydElEKGNoaWxkLCAxNjA2KTtcbiAgICAgICAgY2MuYXNzZXJ0SUQoY2hpbGQuX3BhcmVudCA9PT0gbnVsbCwgMTYwNSk7XG5cbiAgICAgICAgLy8gaW52b2tlcyB0aGUgcGFyZW50IHNldHRlclxuICAgICAgICBjaGlsZC5zZXRQYXJlbnQodGhpcyk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluc2VydHMgYSBjaGlsZCB0byB0aGUgbm9kZSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKiAhI3poXG4gICAgICog5o+S5YWl5a2Q6IqC54K55Yiw5oyH5a6a5L2N572uXG4gICAgICogQG1ldGhvZCBpbnNlcnRDaGlsZFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY2hpbGQgLSB0aGUgY2hpbGQgbm9kZSB0byBiZSBpbnNlcnRlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzaWJsaW5nSW5kZXggLSB0aGUgc2libGluZyBpbmRleCB0byBwbGFjZSB0aGUgY2hpbGQgaW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuaW5zZXJ0Q2hpbGQoY2hpbGQsIDIpO1xuICAgICAqL1xuICAgIGluc2VydENoaWxkIChjaGlsZCwgc2libGluZ0luZGV4KSB7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIGNoaWxkLnNldFNpYmxpbmdJbmRleChzaWJsaW5nSW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLyBISUVSQVJDSFkgTUVUSE9EU1xuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIHNpYmxpbmcgaW5kZXguXG4gICAgICogISN6aCDojrflj5blkIznuqfntKLlvJXjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNpYmxpbmdJbmRleFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbmRleCA9IG5vZGUuZ2V0U2libGluZ0luZGV4KCk7XG4gICAgICovXG4gICAgZ2V0U2libGluZ0luZGV4ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBzaWJsaW5nIGluZGV4IG9mIHRoaXMgbm9kZS5cbiAgICAgKiAhI3poIOiuvue9ruiKgueCueWQjOe6p+e0ouW8leOAglxuICAgICAqIEBtZXRob2Qgc2V0U2libGluZ0luZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldFNpYmxpbmdJbmRleCgxKTtcbiAgICAgKi9cbiAgICBzZXRTaWJsaW5nSW5kZXggKGluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudC5fb2JqRmxhZ3MgJiBEZWFjdGl2YXRpbmcpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgyMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdzID0gdGhpcy5fcGFyZW50Ll9jaGlsZHJlbjtcbiAgICAgICAgaW5kZXggPSBpbmRleCAhPT0gLTEgPyBpbmRleCA6IHNpYmxpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRJbmRleCA9IHNpYmxpbmdzLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLnNwbGljZShvbGRJbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzaWJsaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5ncy5zcGxpY2UoaW5kZXgsIDAsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2libGluZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uU2libGluZ0luZGV4Q2hhbmdlZCAmJiB0aGlzLl9vblNpYmxpbmdJbmRleENoYW5nZWQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gV2FsayB0aG91Z2ggdGhlIHN1YiBjaGlsZHJlbiB0cmVlIG9mIHRoZSBjdXJyZW50IG5vZGUuXG4gICAgICogRWFjaCBub2RlLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgbm9kZSwgaW4gdGhlIHN1YiB0cmVlIHdpbGwgYmUgdmlzaXRlZCB0d28gdGltZXMsIGJlZm9yZSBhbGwgY2hpbGRyZW4gYW5kIGFmdGVyIGFsbCBjaGlsZHJlbi5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNhbGwgaXMgbm90IHJlY3Vyc2l2ZSwgaXQncyBiYXNlZCBvbiBzdGFjay5cbiAgICAgKiBQbGVhc2UgZG9uJ3Qgd2FsayBhbnkgb3RoZXIgbm9kZSBpbnNpZGUgdGhlIHdhbGsgcHJvY2Vzcy5cbiAgICAgKiAhI3poIOmBjeWOhuivpeiKgueCueeahOWtkOagkemHjOeahOaJgOacieiKgueCueW5tuaMieinhOWImeaJp+ihjOWbnuiwg+WHveaVsOOAglxuICAgICAqIOWvueWtkOagkeS4reeahOaJgOacieiKgueCue+8jOWMheWQq+W9k+WJjeiKgueCue+8jOS8muaJp+ihjOS4pOasoeWbnuiwg++8jHByZWZ1bmMg5Lya5Zyo6K6/6Zeu5a6D55qE5a2Q6IqC54K55LmL5YmN6LCD55So77yMcG9zdGZ1bmMg5Lya5Zyo6K6/6Zeu5omA5pyJ5a2Q6IqC54K55LmL5ZCO6LCD55So44CCXG4gICAgICog6L+Z5Liq5Ye95pWw55qE5a6e546w5LiN5piv5Z+65LqO6YCS5b2S55qE77yM6ICM5piv5Z+65LqO5qCI5bGV5byA6YCS5b2S55qE5pa55byP44CCXG4gICAgICog6K+35LiN6KaB5ZyoIHdhbGsg6L+H56iL5Lit5a+55Lu75L2V5YW25LuW55qE6IqC54K55bWM5aWX5omn6KGMIHdhbGvjgIJcbiAgICAgKiBAbWV0aG9kIHdhbGtcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVmdW5jIFRoZSBjYWxsYmFjayB0byBwcm9jZXNzIG5vZGUgd2hlbiByZWFjaCB0aGUgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgKiBAcGFyYW0ge19CYXNlTm9kZX0gcHJlZnVuYy50YXJnZXQgVGhlIGN1cnJlbnQgdmlzaXRpbmcgbm9kZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHBvc3RmdW5jIFRoZSBjYWxsYmFjayB0byBwcm9jZXNzIG5vZGUgd2hlbiByZS12aXNpdCB0aGUgbm9kZSBhZnRlciB3YWxrZWQgYWxsIGNoaWxkcmVuIGluIGl0cyBzdWIgdHJlZVxuICAgICAqIEBwYXJhbSB7X0Jhc2VOb2RlfSBwb3N0ZnVuYy50YXJnZXQgVGhlIGN1cnJlbnQgdmlzaXRpbmcgbm9kZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS53YWxrKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1dhbGtlZCB0aHJvdWdoIG5vZGUgJyArIHRhcmdldC5uYW1lICsgJyBmb3IgdGhlIGZpcnN0IHRpbWUnKTtcbiAgICAgKiB9LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXYWxrZWQgdGhyb3VnaCBub2RlICcgKyB0YXJnZXQubmFtZSArICcgYWZ0ZXIgd2Fsa2VkIGFsbCBjaGlsZHJlbiBpbiBpdHMgc3ViIHRyZWUnKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB3YWxrIChwcmVmdW5jLCBwb3N0ZnVuYykge1xuICAgICAgICB2YXIgQmFzZU5vZGUgPSBjYy5fQmFzZU5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICAgIHZhciBjaGlsZHJlbiwgY2hpbGQsIGN1cnIsIGksIGFmdGVyQ2hpbGRyZW47XG4gICAgICAgIHZhciBzdGFjayA9IEJhc2VOb2RlLl9zdGFja3NbQmFzZU5vZGUuX3N0YWNrSWRdO1xuICAgICAgICBpZiAoIXN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjayA9IFtdO1xuICAgICAgICAgICAgQmFzZU5vZGUuX3N0YWNrcy5wdXNoKHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBCYXNlTm9kZS5fc3RhY2tJZCsrO1xuXG4gICAgICAgIHN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgIHN0YWNrWzBdID0gdGhpcztcbiAgICAgICAgdmFyIHBhcmVudCA9IG51bGw7XG4gICAgICAgIGFmdGVyQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGluZGV4KSB7XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgY3VyciA9IHN0YWNrW2luZGV4XTtcbiAgICAgICAgICAgIGlmICghY3Vycikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZnRlckNoaWxkcmVuICYmIHByZWZ1bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBwcmUgY2FsbFxuICAgICAgICAgICAgICAgIHByZWZ1bmMoY3Vycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhZnRlckNoaWxkcmVuICYmIHBvc3RmdW5jKSB7XG4gICAgICAgICAgICAgICAgLy8gcG9zdCBjYWxsXG4gICAgICAgICAgICAgICAgcG9zdGZ1bmMoY3Vycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEF2b2lkIG1lbW9yeSBsZWFrXG4gICAgICAgICAgICBzdGFja1tpbmRleF0gPSBudWxsO1xuICAgICAgICAgICAgLy8gRG8gbm90IHJlcGVhdGx5IHZpc2l0IGNoaWxkIHRyZWUsIGp1c3QgZG8gcG9zdCBjYWxsIGFuZCBjb250aW51ZSB3YWxrXG4gICAgICAgICAgICBpZiAoYWZ0ZXJDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IHRoaXMuX3BhcmVudCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgYWZ0ZXJDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hpbGRyZW4gbm90IHByb2NlZWRlZCBhbmQgaGFzIGNoaWxkcmVuLCBwcm9jZWVkIHRvIGNoaWxkIHRyZWVcbiAgICAgICAgICAgICAgICBpZiAoY3Vyci5fY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBjdXJyO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IGN1cnIuX2NoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbaW5kZXhdID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5vIGNoaWxkcmVuLCB0aGVuIHJlcHVzaCBjdXJyIHRvIGJlIHdhbGtlZCBmb3IgcG9zdCBmdW5jXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW2luZGV4XSA9IGN1cnI7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGFmdGVyQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN1cnIgaGFzIG5vIHN1YiB0cmVlLCBzbyBsb29rIGludG8gdGhlIHNpYmxpbmdzIGluIHBhcmVudCBjaGlsZHJlblxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIC8vIFByb2NlZWQgdG8gbmV4dCBzaWJsaW5nIGluIHBhcmVudCBjaGlsZHJlblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFja1tpbmRleF0gPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTm8gY2hpbGRyZW4gYW55IG1vcmUgaW4gdGhpcyBzdWIgdHJlZSwgZ28gdXB3YXJkXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW2luZGV4XSA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dXAgcGFyZW50IHdhbGsgZW52XG4gICAgICAgICAgICAgICAgICAgIGFmdGVyQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50Ll9wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gcGFyZW50Ll9wYXJlbnQuX2NoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGNoaWxkcmVuLmluZGV4T2YocGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5fcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXQgcm9vdFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVSUk9SXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgQmFzZU5vZGUuX3N0YWNrSWQtLTtcbiAgICB9LFxuXG4gICAgY2xlYW51cCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbW92ZSBpdHNlbGYgZnJvbSBpdHMgcGFyZW50IG5vZGUuIElmIGNsZWFudXAgaXMgYHRydWVgLCB0aGVuIGFsc28gcmVtb3ZlIGFsbCBldmVudHMgYW5kIGFjdGlvbnMuIDxici8+XG4gICAgICogSWYgdGhlIGNsZWFudXAgcGFyYW1ldGVyIGlzIG5vdCBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgYSBjbGVhbnVwLCBzbyBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSBhbHdheXMgcGFzcyBpbiB0aGUgYGZhbHNlYCBwYXJhbWV0ZXIgd2hlbiBjYWxsaW5nIHRoaXMgQVBJLjxici8+XG4gICAgICogSWYgdGhlIG5vZGUgb3JwaGFuLCB0aGVuIG5vdGhpbmcgaGFwcGVucy5cbiAgICAgKiAhI3poXG4gICAgICog5LuO54i26IqC54K55Lit5Yig6Zmk6K+l6IqC54K544CC5aaC5p6c5LiN5Lyg5YWlIGNsZWFudXAg5Y+C5pWw5oiW6ICF5Lyg5YWlIGB0cnVlYO+8jOmCo+S5iOi/meS4quiKgueCueS4iuaJgOaciee7keWumueahOS6i+S7tuOAgWFjdGlvbiDpg73kvJrooqvliKDpmaTjgII8YnIvPlxuICAgICAqIOWboOatpOW7uuiuruiwg+eUqOi/meS4qiBBUEkg5pe25oC75piv5Lyg5YWlIGBmYWxzZWAg5Y+C5pWw44CCPGJyLz5cbiAgICAgKiDlpoLmnpzov5nkuKroioLngrnmmK/kuIDkuKrlraToioLngrnvvIzpgqPkuYjku4DkuYjpg73kuI3kvJrlj5HnlJ/jgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUZyb21QYXJlbnRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgYWN0aW9ucyBhbmQgY2FsbGJhY2tzIG9uIHRoaXMgbm9kZSBzaG91bGQgYmUgcmVtb3ZlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICogbm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcbiAgICAgKi9cbiAgICByZW1vdmVGcm9tUGFyZW50IChjbGVhbnVwKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjbGVhbnVwID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcywgY2xlYW51cCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSBjb250YWluZXIuIEl0IHdpbGwgYWxzbyBjbGVhbnVwIGFsbCBydW5uaW5nIGFjdGlvbnMgZGVwZW5kaW5nIG9uIHRoZSBjbGVhbnVwIHBhcmFtZXRlci4gPC9wPlxuICAgICAqIElmIHRoZSBjbGVhbnVwIHBhcmFtZXRlciBpcyBub3QgcGFzc2VkLCBpdCB3aWxsIGZvcmNlIGEgY2xlYW51cC4gPGJyLz5cbiAgICAgKiBcInJlbW92ZVwiIGxvZ2ljIE1VU1Qgb25seSBiZSBvbiB0aGlzIG1ldGhvZCAgPGJyLz5cbiAgICAgKiBJZiBhIGNsYXNzIHdhbnRzIHRvIGV4dGVuZCB0aGUgJ3JlbW92ZUNoaWxkJyBiZWhhdmlvciBpdCBvbmx5IG5lZWRzIDxici8+XG4gICAgICogdG8gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gICAgICogISN6aFxuICAgICAqIOenu+mZpOiKgueCueS4reaMh+WumueahOWtkOiKgueCue+8jOaYr+WQpumcgOimgea4heeQhuaJgOacieato+WcqOi/kOihjOeahOihjOS4uuWPluWGs+S6jiBjbGVhbnVwIOWPguaVsOOAgjxici8+XG4gICAgICog5aaC5p6cIGNsZWFudXAg5Y+C5pWw5LiN5Lyg5YWl77yM6buY6K6k5Li6IHRydWUg6KGo56S65riF55CG44CCPGJyLz5cbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIFRoZSBjaGlsZCBub2RlIHdoaWNoIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgcnVubmluZyBhY3Rpb25zIGFuZCBjYWxsYmFja3Mgb24gdGhlIGNoaWxkIG5vZGUgd2lsbCBiZSBjbGVhbnVwLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnJlbW92ZUNoaWxkKG5ld05vZGUpO1xuICAgICAqIG5vZGUucmVtb3ZlQ2hpbGQobmV3Tm9kZSwgZmFsc2UpO1xuICAgICAqL1xuICAgIHJlbW92ZUNoaWxkIChjaGlsZCwgY2xlYW51cCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkgPiAtMSkge1xuICAgICAgICAgICAgLy8gSWYgeW91IGRvbid0IGRvIGNsZWFudXAsIHRoZSBjaGlsZCdzIGFjdGlvbnMgd2lsbCBub3QgZ2V0IHJlbW92ZWQgYW5kIHRoZVxuICAgICAgICAgICAgaWYgKGNsZWFudXAgfHwgY2xlYW51cCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2xlYW51cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaW52b2tlIHRoZSBwYXJlbnQgc2V0dGVyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBjb250YWluZXIgYW5kIGRvIGEgY2xlYW51cCBhbGwgcnVubmluZyBhY3Rpb25zIGRlcGVuZGluZyBvbiB0aGUgY2xlYW51cCBwYXJhbWV0ZXIuIDxici8+XG4gICAgICogSWYgdGhlIGNsZWFudXAgcGFyYW1ldGVyIGlzIG5vdCBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgYSBjbGVhbnVwLlxuICAgICAqICEjemhcbiAgICAgKiDnp7vpmaToioLngrnmiYDmnInnmoTlrZDoioLngrnvvIzmmK/lkKbpnIDopoHmuIXnkIbmiYDmnInmraPlnKjov5DooYznmoTooYzkuLrlj5blhrPkuo4gY2xlYW51cCDlj4LmlbDjgII8YnIvPlxuICAgICAqIOWmguaenCBjbGVhbnVwIOWPguaVsOS4jeS8oOWFpe+8jOm7mOiupOS4uiB0cnVlIOihqOekuua4heeQhuOAglxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsQ2hpbGRyZW5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgcnVubmluZyBhY3Rpb25zIG9uIGFsbCBjaGlsZHJlbiBub2RlcyBzaG91bGQgYmUgY2xlYW51cCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAqIG5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oZmFsc2UpO1xuICAgICAqL1xuICAgIHJlbW92ZUFsbENoaWxkcmVuIChjbGVhbnVwKSB7XG4gICAgICAgIC8vIG5vdCB1c2luZyBkZXRhY2hDaGlsZCBpbXByb3ZlcyBzcGVlZCBoZXJlXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBpZiAoY2xlYW51cCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY2xlYW51cCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgeW91IGRvbid0IGRvIGNsZWFudXAsIHRoZSBub2RlJ3MgYWN0aW9ucyB3aWxsIG5vdCBnZXQgcmVtb3ZlZCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgaWYgKGNsZWFudXApXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2xlYW51cCgpO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSXMgdGhpcyBub2RlIGEgY2hpbGQgb2YgdGhlIGdpdmVuIG5vZGU/XG4gICAgICogISN6aCDmmK/lkKbmmK/mjIflrproioLngrnnmoTlrZDoioLngrnvvJ9cbiAgICAgKiBAbWV0aG9kIGlzQ2hpbGRPZlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhpcyBub2RlIGlzIGEgY2hpbGQsIGRlZXAgY2hpbGQgb3IgaWRlbnRpY2FsIHRvIHRoZSBnaXZlbiBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5pc0NoaWxkT2YobmV3Tm9kZSk7XG4gICAgICovXG4gICAgaXNDaGlsZE9mIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoY2hpbGQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIENPTVBPTkVOVFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBvZiBzdXBwbGllZCB0eXBlIGlmIHRoZSBub2RlIGhhcyBvbmUgYXR0YWNoZWQsIG51bGwgaWYgaXQgZG9lc24ndC48YnIvPlxuICAgICAqIFlvdSBjYW4gYWxzbyBnZXQgY29tcG9uZW50IGluIHRoZSBub2RlIGJ5IHBhc3NpbmcgaW4gdGhlIG5hbWUgb2YgdGhlIHNjcmlwdC5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6IqC54K55LiK5oyH5a6a57G75Z6L55qE57uE5Lu277yM5aaC5p6c6IqC54K55pyJ6ZmE5Yqg5oyH5a6a57G75Z6L55qE57uE5Lu277yM5YiZ6L+U5Zue77yM5aaC5p6c5rKh5pyJ5YiZ5Li656m644CCPGJyLz5cbiAgICAgKiDkvKDlhaXlj4LmlbDkuZ/lj6/ku6XmmK/ohJrmnKznmoTlkI3np7DjgIJcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBnZXQgc3ByaXRlIGNvbXBvbmVudFxuICAgICAqIHZhciBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAqIC8vIGdldCBjdXN0b20gdGVzdCBjbGFzc1xuICAgICAqIHZhciB0ZXN0ID0gbm9kZS5nZXRDb21wb25lbnQoXCJUZXN0XCIpO1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KHR5cGU6IHtwcm90b3R5cGU6IFR9KTogVFxuICAgICAqIGdldENvbXBvbmVudChjbGFzc05hbWU6IHN0cmluZyk6IGFueVxuICAgICAqL1xuICAgIGdldENvbXBvbmVudCAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRDb21wb25lbnQodGhpcywgY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYWxsIGNvbXBvbmVudHMgb2Ygc3VwcGxpZWQgdHlwZSBpbiB0aGUgbm9kZS5cbiAgICAgKiAhI3poIOi/lOWbnuiKgueCueS4iuaMh+Wumuexu+Wei+eahOaJgOaciee7hOS7tuOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnRbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzcHJpdGVzID0gbm9kZS5nZXRDb21wb25lbnRzKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3RzID0gbm9kZS5nZXRDb21wb25lbnRzKFwiVGVzdFwiKTtcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldENvbXBvbmVudHM8VCBleHRlbmRzIENvbXBvbmVudD4odHlwZToge3Byb3RvdHlwZTogVH0pOiBUW11cbiAgICAgKiBnZXRDb21wb25lbnRzKGNsYXNzTmFtZTogc3RyaW5nKTogYW55W11cbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRzICh0eXBlT3JDbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gZ2V0Q29uc3RydWN0b3IodHlwZU9yQ2xhc3NOYW1lKSwgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBpZiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnRzKHRoaXMsIGNvbnN0cnVjdG9yLCBjb21wb25lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjb21wb25lbnQgb2Ygc3VwcGxpZWQgdHlwZSBpbiBhbnkgb2YgaXRzIGNoaWxkcmVuIHVzaW5nIGRlcHRoIGZpcnN0IHNlYXJjaC5cbiAgICAgKiAhI3poIOmAkuW9kuafpeaJvuaJgOacieWtkOiKgueCueS4reesrOS4gOS4quWMuemFjeaMh+Wumuexu+Wei+eahOe7hOS7tuOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29tcG9uZW50SW5DaGlsZHJlblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgc3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIFRlc3QgPSBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oXCJUZXN0XCIpO1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Q29tcG9uZW50SW5DaGlsZHJlbjxUIGV4dGVuZHMgQ29tcG9uZW50Pih0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFRcbiAgICAgKiBnZXRDb21wb25lbnRJbkNoaWxkcmVuKGNsYXNzTmFtZTogc3RyaW5nKTogYW55XG4gICAgICovXG4gICAgZ2V0Q29tcG9uZW50SW5DaGlsZHJlbiAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRDaGlsZENvbXBvbmVudCh0aGlzLl9jaGlsZHJlbiwgY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYWxsIGNvbXBvbmVudHMgb2Ygc3VwcGxpZWQgdHlwZSBpbiBzZWxmIG9yIGFueSBvZiBpdHMgY2hpbGRyZW4uXG4gICAgICogISN6aCDpgJLlvZLmn6Xmib7oh6rouqvmiJbmiYDmnInlrZDoioLngrnkuK3mjIflrprnsbvlnovnmoTnu4Tku7ZcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudHNJbkNoaWxkcmVuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IHR5cGVPckNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudFtdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZXMgPSBub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3RzID0gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRDb21wb25lbnRzSW5DaGlsZHJlbjxUIGV4dGVuZHMgQ29tcG9uZW50Pih0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFRbXVxuICAgICAqIGdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNsYXNzTmFtZTogc3RyaW5nKTogYW55W11cbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRzSW5DaGlsZHJlbiAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSksIGNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgaWYgKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50cyh0aGlzLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cyk7XG4gICAgICAgICAgICBmaW5kQ2hpbGRDb21wb25lbnRzKHRoaXMuX2NoaWxkcmVuLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfSxcblxuICAgIF9jaGVja011bHRpcGxlQ29tcDogKENDX0VESVRPUiB8fCBDQ19QUkVWSUVXKSAmJiBmdW5jdGlvbiAoY3Rvcikge1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldENvbXBvbmVudChjdG9yLl9kaXNhbGxvd011bHRpcGxlKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcuY29uc3RydWN0b3IgPT09IGN0b3IpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM4MDUsIGpzLmdldENsYXNzTmFtZShjdG9yKSwgdGhpcy5fbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM4MDYsIGpzLmdldENsYXNzTmFtZShjdG9yKSwgdGhpcy5fbmFtZSwganMuZ2V0Q2xhc3NOYW1lKGV4aXN0aW5nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhIGNvbXBvbmVudCBjbGFzcyB0byB0aGUgbm9kZS4gWW91IGNhbiBhbHNvIGFkZCBjb21wb25lbnQgdG8gbm9kZSBieSBwYXNzaW5nIGluIHRoZSBuYW1lIG9mIHRoZSBzY3JpcHQuXG4gICAgICogISN6aCDlkJHoioLngrnmt7vliqDkuIDkuKrmjIflrprnsbvlnovnmoTnu4Tku7bnsbvvvIzkvaDov5jlj6/ku6XpgJrov4fkvKDlhaXohJrmnKznmoTlkI3np7DmnaXmt7vliqDnu4Tku7bjgIJcbiAgICAgKiBAbWV0aG9kIGFkZENvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWUgLSBUaGUgY29uc3RydWN0b3Igb3IgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBhZGRcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIG5ld2x5IGFkZGVkIGNvbXBvbmVudFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3QgPSBub2RlLmFkZENvbXBvbmVudChcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGRDb21wb25lbnQ8VCBleHRlbmRzIENvbXBvbmVudD4odHlwZToge25ldygpOiBUfSk6IFRcbiAgICAgKiBhZGRDb21wb25lbnQoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnlcbiAgICAgKi9cbiAgICBhZGRDb21wb25lbnQgKHR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpKSB7XG4gICAgICAgICAgICBjYy5lcnJvcignaXNEZXN0cm95aW5nJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBjb21wb25lbnRcblxuICAgICAgICB2YXIgY29uc3RydWN0b3I7XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZU9yQ2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3RydWN0b3IgPSBqcy5nZXRDbGFzc0J5TmFtZSh0eXBlT3JDbGFzc05hbWUpO1xuICAgICAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwNywgdHlwZU9yQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoY2MuX1JGcGVlaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwOCwgdHlwZU9yQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwNCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IHR5cGVPckNsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGNvbXBvbmVudFxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwOSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWpzLmlzQ2hpbGRDbGFzc09mKGNvbnN0cnVjdG9yLCBjYy5Db21wb25lbnQpKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDM4MTApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19QUkVWSUVXKSAmJiBjb25zdHJ1Y3Rvci5fZGlzYWxsb3dNdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGVja011bHRpcGxlQ29tcChjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHJlcXVpcmVtZW50XG5cbiAgICAgICAgdmFyIFJlcUNvbXAgPSBjb25zdHJ1Y3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgaWYgKFJlcUNvbXAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50KFJlcUNvbXApKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kZWQgPSB0aGlzLmFkZENvbXBvbmVudChSZXFDb21wKTtcbiAgICAgICAgICAgIGlmICghZGVwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmQgY29uZmxpY3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8vIGNoZWNrIGNvbmZsaWN0XG4gICAgICAgIC8vXG4gICAgICAgIC8vaWYgKENDX0VESVRPUiAmJiAhX1NjZW5lLkRldGVjdENvbmZsaWN0LmJlZm9yZUFkZENvbXBvbmVudCh0aGlzLCBjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgLy8gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vXG5cbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb21wb25lbnQubm9kZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiBjYy5lbmdpbmUgJiYgKHRoaXMuX2lkIGluIGNjLmVuZ2luZS5hdHRhY2hlZE9ianNGb3JFZGl0b3IpKSB7XG4gICAgICAgICAgICBjYy5lbmdpbmUuYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXBvbmVudC5faWRdID0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX25vZGVBY3RpdmF0b3IuYWN0aXZhdGVDb21wKGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGFwaSBzaG91bGQgb25seSB1c2VkIGJ5IHVuZG8gc3lzdGVtXG4gICAgICogQG1ldGhvZCBfYWRkQ29tcG9uZW50QXRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZENvbXBvbmVudEF0OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGNvbXAsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcignaXNEZXN0cm95aW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoY29tcCBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDM4MTEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCgzODEyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY2hlY2sgYXR0cmlidXRlcyBiZWNhdXNlIHNjcmlwdCBtYXkgY2hhbmdlZFxuICAgICAgICB2YXIgY3RvciA9IGNvbXAuY29uc3RydWN0b3I7XG4gICAgICAgIGlmIChjdG9yLl9kaXNhbGxvd011bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NoZWNrTXVsdGlwbGVDb21wKGN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBSZXFDb21wID0gY3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgaWYgKFJlcUNvbXAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50KFJlcUNvbXApKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgY29tcCBzaG91bGQgYmUgbGFzdCBjb21wb25lbnQsIGluY3JlYXNlIHRoZSBpbmRleCBiZWNhdXNlIHJlcXVpcmVkIGNvbXBvbmVudCBhZGRlZFxuICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVwZW5kZWQgPSB0aGlzLmFkZENvbXBvbmVudChSZXFDb21wKTtcbiAgICAgICAgICAgIGlmICghZGVwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmQgY29uZmxpY3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb21wLm5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jb21wb25lbnRzLnNwbGljZShpbmRleCwgMCwgY29tcCk7XG4gICAgICAgIGlmICgoQ0NfRURJVE9SIHx8IENDX1RFU1QpICYmIGNjLmVuZ2luZSAmJiAodGhpcy5faWQgaW4gY2MuZW5naW5lLmF0dGFjaGVkT2Jqc0ZvckVkaXRvcikpIHtcbiAgICAgICAgICAgIGNjLmVuZ2luZS5hdHRhY2hlZE9ianNGb3JFZGl0b3JbY29tcC5faWRdID0gY29tcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9ub2RlQWN0aXZhdG9yLmFjdGl2YXRlQ29tcChjb21wKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBpZGVudGlmaWVkIGJ5IHRoZSBnaXZlbiBuYW1lIG9yIHJlbW92ZXMgdGhlIGNvbXBvbmVudCBvYmplY3QgZ2l2ZW4uXG4gICAgICogWW91IGNhbiBhbHNvIHVzZSBjb21wb25lbnQuZGVzdHJveSgpIGlmIHlvdSBhbHJlYWR5IGhhdmUgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiAhI3poXG4gICAgICog5Yig6Zmk6IqC54K55LiK55qE5oyH5a6a57uE5Lu277yM5Lyg5YWl5Y+C5pWw5Y+v5Lul5piv5LiA5Liq57uE5Lu25p6E6YCg5Ye95pWw5oiW57uE5Lu25ZCN77yM5Lmf5Y+v5Lul5piv5bey57uP6I635b6X55qE57uE5Lu25byV55So44CCXG4gICAgICog5aaC5p6c5L2g5bey57uP6I635b6X57uE5Lu25byV55So77yM5L2g5Lmf5Y+v5Lul55u05o6l6LCD55SoIGNvbXBvbmVudC5kZXN0cm95KClcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufENvbXBvbmVudH0gY29tcG9uZW50IC0gVGhlIG5lZWQgcmVtb3ZlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVwcmVjYXRlZCBwbGVhc2UgZGVzdHJveSB0aGUgY29tcG9uZW50IHRvIHJlbW92ZSBpdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucmVtb3ZlQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogdmFyIFRlc3QgPSByZXF1aXJlKFwiVGVzdFwiKTtcbiAgICAgKiBub2RlLnJlbW92ZUNvbXBvbmVudChUZXN0KTtcbiAgICAgKi9cbiAgICByZW1vdmVDb21wb25lbnQgKGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzODEzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShjb21wb25lbnQgaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSB0aGlzLmdldENvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBfZ2V0RGVwZW5kQ29tcG9uZW50XG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGRlcGVuZGVkXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldERlcGVuZENvbXBvbmVudDogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChkZXBlbmRlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb21wID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wICE9PSBkZXBlbmRlZCAmJiBjb21wLmlzVmFsaWQgJiYgIWNjLk9iamVjdC5fd2lsbERlc3Ryb3koY29tcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwZW5kID0gY29tcC5jb25zdHJ1Y3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kICYmIGRlcGVuZGVkIGluc3RhbmNlb2YgZGVwZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLy8gZG8gcmVtb3ZlIGNvbXBvbmVudCwgb25seSB1c2VkIGludGVybmFsbHlcbiAgICBfcmVtb3ZlQ29tcG9uZW50IChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgxNCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuX2NvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKChDQ19FRElUT1IgfHwgQ0NfVEVTVCkgJiYgY2MuZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYy5lbmdpbmUuYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXBvbmVudC5faWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbXBvbmVudC5ub2RlICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzODE1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgaWYgKGNjLk9iamVjdC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEZXN0cm95IGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBub2RlLCBhbmQgcmVsZWFzZSBhbGwgdGhlaXIgb3duIHJlZmVyZW5jZXMgdG8gb3RoZXIgb2JqZWN0cy48YnIvPlxuICAgICAqIEFjdHVhbCBkZXN0cnVjdCBvcGVyYXRpb24gd2lsbCBkZWxheWVkIHVudGlsIGJlZm9yZSByZW5kZXJpbmcuXG4gICAgICogISN6aFxuICAgICAqIOmUgOavgeaJgOacieWtkOiKgueCue+8jOW5tumHiuaUvuaJgOacieWug+S7rOWvueWFtuWug+WvueixoeeahOW8leeUqOOAgjxici8+XG4gICAgICog5a6e6ZmF6ZSA5q+B5pON5L2c5Lya5bu26L+f5Yiw5b2T5YmN5bin5riy5p+T5YmN5omn6KGM44CCXG4gICAgICogQG1ldGhvZCBkZXN0cm95QWxsQ2hpbGRyZW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgICovXG4gICAgZGVzdHJveUFsbENoaWxkcmVuICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25TZXRQYXJlbnQgKHZhbHVlKSB7fSxcbiAgICBfb25Qb3N0QWN0aXZhdGVkICgpIHt9LFxuICAgIF9vbkJhdGNoQ3JlYXRlZCAoZG9udFN5bmNDaGlsZFByZWZhYikge30sXG5cbiAgICBfb25IaWVyYXJjaHlDaGFuZ2VkIChvbGRQYXJlbnQpIHtcbiAgICAgICAgdmFyIG5ld1BhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgaWYgKHRoaXMuX3BlcnNpc3ROb2RlICYmICEobmV3UGFyZW50IGluc3RhbmNlb2YgY2MuU2NlbmUpKSB7XG4gICAgICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTYyMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgICAgICAgICB2YXIgaW5DdXJyZW50U2NlbmVCZWZvcmUgPSBvbGRQYXJlbnQgJiYgb2xkUGFyZW50LmlzQ2hpbGRPZihzY2VuZSk7XG4gICAgICAgICAgICB2YXIgaW5DdXJyZW50U2NlbmVOb3cgPSBuZXdQYXJlbnQgJiYgbmV3UGFyZW50LmlzQ2hpbGRPZihzY2VuZSk7XG4gICAgICAgICAgICBpZiAoIWluQ3VycmVudFNjZW5lQmVmb3JlICYmIGluQ3VycmVudFNjZW5lTm93KSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoZWRcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklmQXR0YWNoZWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbkN1cnJlbnRTY2VuZUJlZm9yZSAmJiAhaW5DdXJyZW50U2NlbmVOb3cpIHtcbiAgICAgICAgICAgICAgICAvLyBkZXRhY2hlZFxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVySWZBdHRhY2hlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBwcmVmYWJcbiAgICAgICAgICAgIHZhciBuZXdQcmVmYWJSb290ID0gbmV3UGFyZW50ICYmIG5ld1BhcmVudC5fcHJlZmFiICYmIG5ld1BhcmVudC5fcHJlZmFiLnJvb3Q7XG4gICAgICAgICAgICB2YXIgbXlQcmVmYWJJbmZvID0gdGhpcy5fcHJlZmFiO1xuICAgICAgICAgICAgdmFyIFByZWZhYlV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvcHJlZmFiJyk7XG4gICAgICAgICAgICBpZiAobXlQcmVmYWJJbmZvKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ByZWZhYlJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG15UHJlZmFiSW5mby5yb290ICE9PSBuZXdQcmVmYWJSb290KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXlQcmVmYWJJbmZvLnJvb3QgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXN0IHByZWZhYlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG15UHJlZmFiSW5mby5maWxlSWQgfHwgKG15UHJlZmFiSW5mby5maWxlSWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLnV1aWQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmFiVXRpbHMuY2hlY2tDaXJjdWxhclJlZmVyZW5jZShteVByZWZhYkluZm8ucm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgcHJlZmFiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJlZmFiVXRpbHMubGlua1ByZWZhYihuZXdQcmVmYWJSb290Ll9wcmVmYWIuYXNzZXQsIG5ld1ByZWZhYlJvb3QsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZWZhYlV0aWxzLmNoZWNrQ2lyY3VsYXJSZWZlcmVuY2UobmV3UHJlZmFiUm9vdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobXlQcmVmYWJJbmZvLnJvb3QgPT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmVzdGVkIHByZWZhYiB0byByb290IHByZWZhYlxuICAgICAgICAgICAgICAgICAgICBteVByZWZhYkluZm8uZmlsZUlkID0gJyc7ICAgLy8gcm9vdCBwcmVmYWIgZG9lc24ndCBoYXZlIGZpbGVJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWNoIGZyb20gcHJlZmFiXG4gICAgICAgICAgICAgICAgICAgIFByZWZhYlV0aWxzLnVubGlua1ByZWZhYih0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdQcmVmYWJSb290KSB7XG4gICAgICAgICAgICAgICAgLy8gYXR0YWNoIHRvIHByZWZhYlxuICAgICAgICAgICAgICAgIFByZWZhYlV0aWxzLmxpbmtQcmVmYWIobmV3UHJlZmFiUm9vdC5fcHJlZmFiLmFzc2V0LCBuZXdQcmVmYWJSb290LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy5jaGVja0NpcmN1bGFyUmVmZXJlbmNlKG5ld1ByZWZhYlJvb3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb25mbGljdCBkZXRlY3Rpb25cbiAgICAgICAgICAgIF9TY2VuZS5EZXRlY3RDb25mbGljdC5hZnRlckFkZENoaWxkKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNob3VsZEFjdGl2ZU5vdyA9IHRoaXMuX2FjdGl2ZSAmJiAhIShuZXdQYXJlbnQgJiYgbmV3UGFyZW50Ll9hY3RpdmVJbkhpZXJhcmNoeSk7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSAhPT0gc2hvdWxkQWN0aXZlTm93KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5fbm9kZUFjdGl2YXRvci5hY3RpdmF0ZU5vZGUodGhpcywgc2hvdWxkQWN0aXZlTm93KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaW5zdGFudGlhdGUgKGNsb25lZCwgaXNTeW5jZWROb2RlKSB7XG4gICAgICAgIGlmICghY2xvbmVkKSB7XG4gICAgICAgICAgICBjbG9uZWQgPSBjYy5pbnN0YW50aWF0ZS5fY2xvbmUodGhpcywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3UHJlZmFiSW5mbyA9IGNsb25lZC5fcHJlZmFiO1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIG5ld1ByZWZhYkluZm8pIHtcbiAgICAgICAgICAgIGlmIChjbG9uZWQgPT09IG5ld1ByZWZhYkluZm8ucm9vdCkge1xuICAgICAgICAgICAgICAgIG5ld1ByZWZhYkluZm8uZmlsZUlkID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgUHJlZmFiVXRpbHMgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly91dGlscy9wcmVmYWInKTtcbiAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy51bmxpbmtQcmVmYWIoY2xvbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIGNjLmVuZ2luZS5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBsZXQgc3luY2luZyA9IG5ld1ByZWZhYkluZm8gJiYgY2xvbmVkID09PSBuZXdQcmVmYWJJbmZvLnJvb3QgJiYgbmV3UHJlZmFiSW5mby5zeW5jO1xuICAgICAgICAgICAgaWYgKCFzeW5jaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xvbmVkLl9uYW1lICs9ICcgKENsb25lKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCBhbmQgaW5pdFxuICAgICAgICBjbG9uZWQuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIGNsb25lZC5fb25CYXRjaENyZWF0ZWQoaXNTeW5jZWROb2RlKTtcblxuICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH0sXG5cbiAgICBfcmVnaXN0ZXJJZkF0dGFjaGVkOiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpICYmIGZ1bmN0aW9uIChyZWdpc3Rlcikge1xuICAgICAgICB2YXIgYXR0YWNoZWRPYmpzRm9yRWRpdG9yID0gY2MuZW5naW5lLmF0dGFjaGVkT2Jqc0ZvckVkaXRvcjtcbiAgICAgICAgaWYgKHJlZ2lzdGVyKSB7XG4gICAgICAgICAgICBhdHRhY2hlZE9ianNGb3JFZGl0b3JbdGhpcy5faWRdID0gdGhpcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb21wID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgICAgICBhdHRhY2hlZE9ianNGb3JFZGl0b3JbY29tcC5faWRdID0gY29tcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmVuZ2luZS5lbWl0KCdub2RlLWF0dGFjaC10by1zY2VuZScsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZW5naW5lLmVtaXQoJ25vZGUtZGV0YWNoLWZyb20tc2NlbmUnLCB0aGlzKTtcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRhY2hlZE9ianNGb3JFZGl0b3JbdGhpcy5faWRdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXAgPSB0aGlzLl9jb21wb25lbnRzW2ldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhdHRhY2hlZE9ianNGb3JFZGl0b3JbY29tcC5faWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQuX3JlZ2lzdGVySWZBdHRhY2hlZChyZWdpc3Rlcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uUHJlRGVzdHJveSAoKSB7XG4gICAgICAgIHZhciBpLCBsZW47XG5cbiAgICAgICAgLy8gbWFya2VkIGFzIGRlc3Ryb3lpbmdcbiAgICAgICAgdGhpcy5fb2JqRmxhZ3MgfD0gRGVzdHJveWluZztcblxuICAgICAgICAvLyBkZXRhY2ggc2VsZiBhbmQgY2hpbGRyZW4gZnJvbSBlZGl0b3JcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgdmFyIGRlc3Ryb3lCeVBhcmVudCA9IHBhcmVudCAmJiAocGFyZW50Ll9vYmpGbGFncyAmIERlc3Ryb3lpbmcpO1xuICAgICAgICBpZiAoIWRlc3Ryb3lCeVBhcmVudCAmJiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklmQXR0YWNoZWQoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzdHJveSBjaGlsZHJlblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGRlc3Ryb3kgaW1tZWRpYXRlIHNvIGl0cyBfb25QcmVEZXN0cm95IGNhbiBiZSBjYWxsZWRcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLl9kZXN0cm95SW1tZWRpYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXN0cm95IHNlbGYgY29tcG9uZW50c1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB0aGlzLl9jb21wb25lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIC8vIGRlc3Ryb3kgaW1tZWRpYXRlIHNvIGl0cyBfb25QcmVEZXN0cm95IGNhbiBiZSBjYWxsZWRcbiAgICAgICAgICAgIGNvbXBvbmVudC5fZGVzdHJveUltbWVkaWF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGV2ZW50VGFyZ2V0cyA9IHRoaXMuX19ldmVudFRhcmdldHM7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGV2ZW50VGFyZ2V0cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGV2ZW50VGFyZ2V0c1tpXTtcbiAgICAgICAgICAgIHRhcmdldCAmJiB0YXJnZXQudGFyZ2V0T2ZmKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50VGFyZ2V0cy5sZW5ndGggPSAwO1xuXG4gICAgICAgIC8vIHJlbW92ZSBmcm9tIHBlcnNpc3RcbiAgICAgICAgaWYgKHRoaXMuX3BlcnNpc3ROb2RlKSB7XG4gICAgICAgICAgICBjYy5nYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGVzdHJveUJ5UGFyZW50KSB7XG4gICAgICAgICAgICAvLyByZW1vdmUgZnJvbSBwYXJlbnRcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRJbmRleCA9IHBhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuX2NoaWxkcmVuLnNwbGljZShjaGlsZEluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuZW1pdCAmJiBwYXJlbnQuZW1pdCgnY2hpbGQtcmVtb3ZlZCcsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlc3Ryb3lCeVBhcmVudDtcbiAgICB9LFxuXG4gICAgb25SZXN0b3JlOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBjaGVjayBhY3Rpdml0eSBzdGF0ZVxuICAgICAgICB2YXIgc2hvdWxkQWN0aXZlTm93ID0gdGhpcy5fYWN0aXZlICYmICEhKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuX2FjdGl2ZUluSGllcmFyY2h5KTtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUluSGllcmFyY2h5ICE9PSBzaG91bGRBY3RpdmVOb3cpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9ub2RlQWN0aXZhdG9yLmFjdGl2YXRlTm9kZSh0aGlzLCBzaG91bGRBY3RpdmVOb3cpO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5CYXNlTm9kZS5pZEdlbmVyYXRlciA9IGlkR2VuZXJhdGVyO1xuXG4vLyBGb3Igd2Fsa1xuQmFzZU5vZGUuX3N0YWNrcyA9IFtbXV07XG5CYXNlTm9kZS5fc3RhY2tJZCA9IDA7XG5cbkJhc2VOb2RlLnByb3RvdHlwZS5fb25QcmVEZXN0cm95QmFzZSA9IEJhc2VOb2RlLnByb3RvdHlwZS5fb25QcmVEZXN0cm95O1xuaWYgKENDX0VESVRPUikge1xuICAgIEJhc2VOb2RlLnByb3RvdHlwZS5fb25QcmVEZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgIHZhciBkZXN0cm95QnlQYXJlbnQgPSB0aGlzLl9vblByZURlc3Ryb3lCYXNlKCk7XG4gICAgICAgaWYgKCFkZXN0cm95QnlQYXJlbnQpIHtcbiAgICAgICAgICAgLy8gZW5zdXJlIHRoaXMgbm9kZSBjYW4gcmVhdHRhY2ggdG8gc2NlbmUgYnkgdW5kbyBzeXN0ZW1cbiAgICAgICAgICAgLy8gKHNpbXVsYXRlIHNvbWUgZGVzdHJ1Y3QgbG9naWMgdG8gbWFrZSB1bmRvIHN5c3RlbSB3b3JrIGNvcnJlY3RseSlcbiAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICB9XG4gICAgICAgcmV0dXJuIGRlc3Ryb3lCeVBhcmVudDtcbiAgIH07XG59XG5cbkJhc2VOb2RlLnByb3RvdHlwZS5fb25IaWVyYXJjaHlDaGFuZ2VkQmFzZSA9IEJhc2VOb2RlLnByb3RvdHlwZS5fb25IaWVyYXJjaHlDaGFuZ2VkO1xuXG5pZihDQ19FRElUT1IpIHtcbiAgICBCYXNlTm9kZS5wcm90b3R5cGUuX29uUmVzdG9yZUJhc2UgPSBCYXNlTm9kZS5wcm90b3R5cGUub25SZXN0b3JlO1xufVxuXG4vLyBEZWZpbmUgcHVibGljIGdldHRlciBhbmQgc2V0dGVyIG1ldGhvZHMgdG8gZW5zdXJlIGFwaSBjb21wYXRpYmlsaXR5LlxudmFyIFNhbWVOYW1lR2V0U2V0cyA9IFsncGFyZW50JywgJ25hbWUnLCAnY2hpbGRyZW4nLCAnY2hpbGRyZW5Db3VudCcsXTtcbm1pc2MucHJvcGVydHlEZWZpbmUoQmFzZU5vZGUsIFNhbWVOYW1lR2V0U2V0cywge30pO1xuXG5pZiAoQ0NfREVWKSB7XG4gICAgLy8gcHJvbW90ZSBkZWJ1ZyBpbmZvXG4gICAganMuZ2V0KEJhc2VOb2RlLnByb3RvdHlwZSwgJyBJTkZPICcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhdGggPSAnJztcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzO1xuICAgICAgICB3aGlsZSAobm9kZSAmJiAhKG5vZGUgaW5zdGFuY2VvZiBjYy5TY2VuZSkpIHtcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IG5vZGUubmFtZSArICcvJyArIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gbm9kZS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZSA9IG5vZGUuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgJywgcGF0aDogJyArIHBhdGg7XG4gICAgfSk7XG59XG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBvbmx5IGVtaXR0ZWQgZnJvbSB0aGUgdG9wIG1vc3Qgbm9kZSB3aG9zZSBhY3RpdmUgdmFsdWUgZGlkIGNoYW5nZWQsXG4gKiBub3QgaW5jbHVkaW5nIGl0cyBjaGlsZCBub2Rlcy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOiKgueCuea/gOa0u+aXtu+8jOatpOS6i+S7tuS7heS7juacgOmhtumDqOeahOiKgueCueWPkeWHuuOAglxuICogQGV2ZW50IGFjdGl2ZS1pbi1oaWVyYXJjaHktY2hhbmdlZFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqL1xuXG5jYy5fQmFzZU5vZGUgPSBtb2R1bGUuZXhwb3J0cyA9IEJhc2VOb2RlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=