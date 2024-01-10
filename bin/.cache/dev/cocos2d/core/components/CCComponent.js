
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCComponent.js';
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

var js = require('../platform/js');

var idGenerater = new (require('../platform/id-generater'))('Comp');
var IsOnEnableCalled = CCObject.Flags.IsOnEnableCalled;
var IsOnLoadCalled = CCObject.Flags.IsOnLoadCalled;
var ActionManagerExist = !!cc.ActionManager;
/**
 * !#en
 * Base class for everything attached to Node(Entity).<br/>
 * <br/>
 * NOTE: Not allowed to use construction parameters for Component's subclasses,
 * because Component is created by the engine.
 * !#zh
 * 所有附加到节点的基类。<br/>
 * <br/>
 * 注意：不允许使用组件的子类构造参数，因为组件是由引擎创建的。
 *
 * @class Component
 * @extends Object
 */

var Component = cc.Class({
  name: 'cc.Component',
  "extends": CCObject,
  ctor: CC_EDITOR ? function () {
    if (typeof _Scene !== "undefined" && _Scene.AssetsWatcher) {
      _Scene.AssetsWatcher.initComponent(this);
    }

    this._id = Editor.Utils.UuidUtils.uuid();
    /**
     * !#en
     * Register all related EventTargets,
     * all event callbacks will be removed in `_onPreDestroy`.
     * !#zh
     * 注册所有相关的 EventTargets，所有事件回调将在 `_onPreDestroy` 中删除。
     * @property {Array} __eventTargets
     * @private
     */

    this.__eventTargets = [];
  } : function () {
    this._id = idGenerater.getNewId();
    this.__eventTargets = [];
  },
  properties: {
    /**
     * !#en The node this component is attached to. A component is always attached to a node.
     * !#zh 该组件被附加到的节点。组件总会附加到一个节点。
     * @property node
     * @type {Node}
     * @example
     * cc.log(comp.node);
     */
    node: {
      "default": null,
      visible: false
    },
    name: {
      get: function get() {
        if (this._name) {
          return this._name;
        }

        var className = cc.js.getClassName(this);
        var trimLeft = className.lastIndexOf('.');

        if (trimLeft >= 0) {
          className = className.slice(trimLeft + 1);
        }

        return this.node.name + '<' + className + '>';
      },
      set: function set(value) {
        this._name = value;
      },
      visible: false
    },

    /**
     * !#en The uuid for editor.
     * !#zh 组件的 uuid，用于编辑器。
     * @property uuid
     * @type {String}
     * @readOnly
     * @example
     * cc.log(comp.uuid);
     */
    uuid: {
      get: function get() {
        return this._id;
      },
      visible: false
    },
    __scriptAsset: CC_EDITOR && {
      get: function get() {},
      //set (value) {
      //    if (this.__scriptUuid !== value) {
      //        if (value && Editor.Utils.UuidUtils.isUuid(value._uuid)) {
      //            var classId = Editor.Utils.UuidUtils.compressUuid(value._uuid);
      //            var NewComp = cc.js._getClassById(classId);
      //            if (js.isChildClassOf(NewComp, cc.Component)) {
      //                cc.warn('Sorry, replacing component script is not yet implemented.');
      //                //Editor.Ipc.sendToWins('reload:window-scripts', Editor._Sandbox.compiled);
      //            }
      //            else {
      //                cc.error('Can not find a component in the script which uuid is "%s".', value._uuid);
      //            }
      //        }
      //        else {
      //            cc.error('Invalid Script');
      //        }
      //    }
      //},
      displayName: 'Script',
      type: cc._Script,
      tooltip: CC_DEV && 'i18n:INSPECTOR.component.script'
    },

    /**
     * @property _enabled
     * @type {Boolean}
     * @private
     */
    _enabled: true,

    /**
     * !#en indicates whether this component is enabled or not.
     * !#zh 表示该组件自身是否启用。
     * @property enabled
     * @type {Boolean}
     * @default true
     * @example
     * comp.enabled = true;
     * cc.log(comp.enabled);
     */
    enabled: {
      get: function get() {
        return this._enabled;
      },
      set: function set(value) {
        if (this._enabled !== value) {
          this._enabled = value;

          if (this.node._activeInHierarchy) {
            var compScheduler = cc.director._compScheduler;

            if (value) {
              compScheduler.enableComp(this);
            } else {
              compScheduler.disableComp(this);
            }
          }
        }
      },
      visible: false,
      animatable: true
    },

    /**
     * !#en indicates whether this component is enabled and its node is also active in the hierarchy.
     * !#zh 表示该组件是否被启用并且所在的节点也处于激活状态。
     * @property enabledInHierarchy
     * @type {Boolean}
     * @readOnly
     * @example
     * cc.log(comp.enabledInHierarchy);
     */
    enabledInHierarchy: {
      get: function get() {
        return this._enabled && this.node._activeInHierarchy;
      },
      visible: false
    },

    /**
     * !#en Returns a value which used to indicate the onLoad get called or not.
     * !#zh 返回一个值用来判断 onLoad 是否被调用过，不等于 0 时调用过，等于 0 时未调用。
     * @property _isOnLoadCalled
     * @type {Number}
     * @readOnly
     * @example
     * cc.log(this._isOnLoadCalled > 0);
     */
    _isOnLoadCalled: {
      get: function get() {
        return this._objFlags & IsOnLoadCalled;
      }
    }
  },
  //////// NEW, ADDED BY pTS

  /**
   *
   */
  onChange: null,
  _executeOnChange: function _executeOnChange() {
    if (this.onChange) this.onChange();
  },
  /////////////////
  // LIFECYCLE METHODS
  // Fireball provides lifecycle methods that you can specify to hook into this process.
  // We provide Pre methods, which are called right before something happens, and Post methods which are called right after something happens.

  /**
   * !#en Update is called every frame, if the Component is enabled.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh 如果该组件启用，则每帧调用 update。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method update
   * @param {Number} dt - the delta time in seconds it took to complete the last frame
   * @protected
   */
  update: null,

  /**
   * !#en LateUpdate is called every frame, if the Component is enabled.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh 如果该组件启用，则每帧调用 LateUpdate。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method lateUpdate
   * @param {Number} dt - the delta time in seconds it took to complete the last frame
   * @protected
   */
  lateUpdate: null,

  /**
   * `__preload` is called before every onLoad.
   * It is used to initialize the builtin components internally,
   * to avoid checking whether onLoad is called before every public method calls.
   * This method should be removed if script priority is supported.
   *
   * @method __preload
   * @private
   */
  __preload: null,

  /**
   * !#en
   * When attaching to an active node or its node first activated.
   * onLoad is always called before any start functions, this allows you to order initialization of scripts.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh
   * 当附加到一个激活的节点上或者其节点第一次激活时候调用。onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method onLoad
   * @protected
   */
  onLoad: null,

  /**
   * !#en
   * Called before all scripts' update if the Component is enabled the first time.
   * Usually used to initialize some logic which need to be called after all components' `onload` methods called.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh
   * 如果该组件第一次启用，则在所有组件的 update 之前调用。通常用于需要在所有组件的 onLoad 初始化完毕后执行的逻辑。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method start
   * @protected
   */
  start: null,

  /**
   * !#en Called when this component becomes enabled and its node is active.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh 当该组件被启用，并且它的节点也激活时。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method onEnable
   * @protected
   */
  onEnable: null,

  /**
   * !#en Called when this component becomes disabled or its node becomes inactive.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh 当该组件被禁用或节点变为无效时调用。<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method onDisable
   * @protected
   */
  onDisable: null,

  /**
   * !#en Called when this component will be destroyed.<br/>
   * This is a lifecycle method. It may not be implemented in the super class. You can only call its super class method inside it. It should not be called manually elsewhere.
   * !#zh 当该组件被销毁时调用<br/>
   * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
   * @method onDestroy
   * @protected
   */
  onDestroy: null,

  /**
   * @method onFocusInEditor
   * @protected
   */
  onFocusInEditor: null,

  /**
   * @method onLostFocusInEditor
   * @protected
   */
  onLostFocusInEditor: null,

  /**
   * !#en Called to initialize the component or node’s properties when adding the component the first time or when the Reset command is used. This function is only called in editor.
   * !#zh 用来初始化组件或节点的一些属性，当该组件被第一次添加到节点上或用户点击了它的 Reset 菜单时调用。这个回调只会在编辑器下调用。
   * @method resetInEditor
   * @protected
   */
  resetInEditor: null,
  // PUBLIC

  /**
   * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
   * !#zh 向节点添加一个组件类，你还可以通过传入脚本的名称来添加组件。
   *
   * @method addComponent
   * @param {Function|String} typeOrClassName - the constructor or the class name of the component to add
   * @return {Component} - the newly added component
   * @example
   * var sprite = node.addComponent(cc.Sprite);
   * var test = node.addComponent("Test");
   * @typescript
   * addComponent<T extends Component>(type: {new(): T}): T
   * addComponent(className: string): any
   */
  addComponent: function addComponent(typeOrClassName) {
    return this.node.addComponent(typeOrClassName);
  },

  /**
   * !#en
   * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
   * You can also get component in the node by passing in the name of the script.
   * !#zh
   * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
   * 传入参数也可以是脚本的名称。
   *
   * @method getComponent
   * @param {Function|String} typeOrClassName
   * @return {Component}
   * @example
   * // get sprite component.
   * var sprite = node.getComponent(cc.Sprite);
   * // get custom test calss.
   * var test = node.getComponent("Test");
   * @typescript
   * getComponent<T extends Component>(type: {prototype: T}): T
   * getComponent(className: string): any
   */
  getComponent: function getComponent(typeOrClassName) {
    return this.node.getComponent(typeOrClassName);
  },

  /**
   * !#en Returns all components of supplied Type in the node.
   * !#zh 返回节点上指定类型的所有组件。
   *
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
    return this.node.getComponents(typeOrClassName);
  },

  /**
   * !#en Returns the component of supplied type in any of its children using depth first search.
   * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
   *
   * @method getComponentInChildren
   * @param {Function|String} typeOrClassName
   * @returns {Component}
   * @example
   * var sprite = node.getComponentInChildren(cc.Sprite);
   * var Test = node.getComponentInChildren("Test");
   * @typescript
   * getComponentInChildren<T extends Component>(type: {prototype: T}): T
   * getComponentInChildren(className: string): any
   */
  getComponentInChildren: function getComponentInChildren(typeOrClassName) {
    return this.node.getComponentInChildren(typeOrClassName);
  },

  /**
   * !#en Returns the components of supplied type in self or any of its children using depth first search.
   * !#zh 递归查找自身或所有子节点中指定类型的组件
   *
   * @method getComponentsInChildren
   * @param {Function|String} typeOrClassName
   * @returns {Component[]}
   * @example
   * var sprites = node.getComponentsInChildren(cc.Sprite);
   * var tests = node.getComponentsInChildren("Test");
   * @typescript
   * getComponentsInChildren<T extends Component>(type: {prototype: T}): T[]
   * getComponentsInChildren(className: string): any[]
   */
  getComponentsInChildren: function getComponentsInChildren(typeOrClassName) {
    return this.node.getComponentsInChildren(typeOrClassName);
  },
  // VIRTUAL

  /**
   * !#en
   * If the component's bounding box is different from the node's, you can implement this method to supply
   * a custom axis aligned bounding box (AABB), so the editor's scene view can perform hit test properly.
   * !#zh
   * 如果组件的包围盒与节点不同，您可以实现该方法以提供自定义的轴向对齐的包围盒（AABB），
   * 以便编辑器的场景视图可以正确地执行点选测试。
   *
   * @method _getLocalBounds
   * @param {Rect} out_rect - the Rect to receive the bounding box
   */
  _getLocalBounds: null,

  /**
   * !#en
   * onRestore is called after the user clicks the Reset item in the Inspector's context menu or performs
   * an undo operation on this component.<br/>
   * <br/>
   * If the component contains the "internal state", short for "temporary member variables which not included<br/>
   * in its CCClass properties", then you may need to implement this function.<br/>
   * <br/>
   * The editor will call the getset accessors of your component to record/restore the component's state<br/>
   * for undo/redo operation. However, in extreme cases, it may not works well. Then you should implement<br/>
   * this function to manually synchronize your component's "internal states" with its public properties.<br/>
   * Once you implement this function, all the getset accessors of your component will not be called when<br/>
   * the user performs an undo/redo operation. Which means that only the properties with default value<br/>
   * will be recorded or restored by editor.<br/>
   * <br/>
   * Similarly, the editor may failed to reset your component correctly in extreme cases. Then if you need<br/>
   * to support the reset menu, you should manually synchronize your component's "internal states" with its<br/>
   * properties in this function. Once you implement this function, all the getset accessors of your component<br/>
   * will not be called during reset operation. Which means that only the properties with default value<br/>
   * will be reset by editor.
   *
   * This function is only called in editor mode.
   * !#zh
   * onRestore 是用户在检查器菜单点击 Reset 时，对此组件执行撤消操作后调用的。<br/>
   * <br/>
   * 如果组件包含了“内部状态”（不在 CCClass 属性中定义的临时成员变量），那么你可能需要实现该方法。<br/>
   * <br/>
   * 编辑器执行撤销/重做操作时，将调用组件的 get set 来录制和还原组件的状态。然而，在极端的情况下，它可能无法良好运作。<br/>
   * 那么你就应该实现这个方法，手动根据组件的属性同步“内部状态”。一旦你实现这个方法，当用户撤销或重做时，组件的所有 get set 都不会再被调用。这意味着仅仅指定了默认值的属性将被编辑器记录和还原。<br/>
   * <br/>
   * 同样的，编辑可能无法在极端情况下正确地重置您的组件。如果你需要支持组件重置菜单，则需要在该方法中手工同步组件属性到“内部状态”。一旦你实现这个方法，组件的所有 get set 都不会在重置操作时被调用。这意味着仅仅指定了默认值的属性将被编辑器重置。
   * <br/>
   * 此方法仅在编辑器下会被调用。
   * @method onRestore
   */
  onRestore: null,
  // OVERRIDE
  destroy: function destroy() {
    if (CC_EDITOR) {
      var depend = this.node._getDependComponent(this);

      if (depend) {
        return cc.errorID(3626, cc.js.getClassName(this), cc.js.getClassName(depend));
      }
    }

    if (this._super()) {
      if (this._enabled && this.node._activeInHierarchy) {
        cc.director._compScheduler.disableComp(this);
      }
    }
  },
  _onPreDestroy: function _onPreDestroy() {
    if (ActionManagerExist) {
      cc.director.getActionManager().removeAllActionsFromTarget(this);
    } // Schedules


    this.unscheduleAllCallbacks(); // Remove all listeners

    var eventTargets = this.__eventTargets;

    for (var i = eventTargets.length - 1; i >= 0; --i) {
      var target = eventTargets[i];
      target && target.targetOff(this);
    }

    eventTargets.length = 0; //

    if (CC_EDITOR && !CC_TEST) {
      _Scene.AssetsWatcher.stop(this);
    } // onDestroy


    cc.director._nodeActivator.destroyComp(this); // do remove component


    this.node._removeComponent(this);
  },
  _instantiate: function _instantiate(cloned) {
    if (!cloned) {
      cloned = cc.instantiate._clone(this, this);
    }

    cloned.node = null;
    return cloned;
  },
  // Scheduler

  /**
   * !#en
   * Schedules a custom selector.<br/>
   * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.
   * !#zh
   * 调度一个自定义的回调函数。<br/>
   * 如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
   * @method schedule
   * @param {function} callback The callback function
   * @param {Number} [interval=0]  Tick interval in seconds. 0 means tick every frame.
   * @param {Number} [repeat=cc.macro.REPEAT_FOREVER]    The selector will be executed (repeat + 1) times, you can use cc.macro.REPEAT_FOREVER for tick infinitely.
   * @param {Number} [delay=0]     The amount of time that the first tick will wait before execution. Unit: s
   * @example
   * var timeCallback = function (dt) {
   *   cc.log("time: " + dt);
   * }
   * this.schedule(timeCallback, 1);
   */
  schedule: function schedule(callback, interval, repeat, delay) {
    cc.assertID(callback, 1619);
    interval = interval || 0;
    cc.assertID(interval >= 0, 1620);
    repeat = isNaN(repeat) ? cc.macro.REPEAT_FOREVER : repeat;
    delay = delay || 0;
    var scheduler = cc.director.getScheduler(); // should not use enabledInHierarchy to judge whether paused,
    // because enabledInHierarchy is assigned after onEnable.
    // Actually, if not yet scheduled, resumeTarget/pauseTarget has no effect on component,
    // therefore there is no way to guarantee the paused state other than isTargetPaused.

    var paused = scheduler.isTargetPaused(this);
    scheduler.schedule(callback, this, interval, repeat, delay, paused);
  },

  /**
   * !#en Schedules a callback function that runs only once, with a delay of 0 or larger.
   * !#zh 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
   * @method scheduleOnce
   * @see cc.Node#schedule
   * @param {function} callback  A function wrapped as a selector
   * @param {Number} [delay=0]  The amount of time that the first tick will wait before execution. Unit: s
   * @example
   * var timeCallback = function (dt) {
   *   cc.log("time: " + dt);
   * }
   * this.scheduleOnce(timeCallback, 2);
   */
  scheduleOnce: function scheduleOnce(callback, delay) {
    this.schedule(callback, 0, 0, delay);
  },

  /**
   * !#en Unschedules a custom callback function.
   * !#zh 取消调度一个自定义的回调函数。
   * @method unschedule
   * @see cc.Node#schedule
   * @param {function} callback_fn  A function wrapped as a selector
   * @example
   * this.unschedule(_callback);
   */
  unschedule: function unschedule(callback_fn) {
    if (!callback_fn) return;
    cc.director.getScheduler().unschedule(callback_fn, this);
  },

  /**
   * !#en
   * unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.<br/>
   * Actions are not affected by this method.
   * !#zh 取消调度所有已调度的回调函数：定制的回调函数以及 `update` 回调函数。动作不受此方法影响。
   * @method unscheduleAllCallbacks
   * @example
   * this.unscheduleAllCallbacks();
   */
  unscheduleAllCallbacks: function unscheduleAllCallbacks() {
    cc.director.getScheduler().unscheduleAllForTarget(this);
  }
});
Component._requireComponent = null;
Component._executionOrder = 0;
if (CC_EDITOR && CC_PREVIEW) Component._disallowMultiple = null;

if (CC_EDITOR || CC_TEST) {
  // INHERITABLE STATIC MEMBERS
  Component._executeInEditMode = false;
  Component._playOnFocus = false;
  Component._help = ''; // NON-INHERITED STATIC MEMBERS
  // (TypeScript 2.3 will still inherit them, so always check hasOwnProperty before using)

  js.value(Component, '_inspector', '', true);
  js.value(Component, '_icon', '', true); // COMPONENT HELPERS

  cc._componentMenuItems = [];

  Component._addMenuItem = function (cls, path, priority) {
    cc._componentMenuItems.push({
      component: cls,
      menuPath: path,
      priority: priority
    });
  };
} // We make this non-enumerable, to prevent inherited by sub classes.


js.value(Component, '_registerEditorProps', function (cls, props) {
  var reqComp = props.requireComponent;

  if (reqComp) {
    cls._requireComponent = reqComp;
  }

  var order = props.executionOrder;

  if (order && typeof order === 'number') {
    cls._executionOrder = order;
  }

  if ((CC_EDITOR || CC_PREVIEW) && 'disallowMultiple' in props) {
    cls._disallowMultiple = cls;
  }

  if (CC_EDITOR || CC_TEST) {
    var name = cc.js.getClassName(cls);

    for (var key in props) {
      var val = props[key];

      switch (key) {
        case 'executeInEditMode':
          cls._executeInEditMode = !!val;
          break;

        case 'playOnFocus':
          if (val) {
            var willExecuteInEditMode = 'executeInEditMode' in props ? props.executeInEditMode : cls._executeInEditMode;

            if (willExecuteInEditMode) {
              cls._playOnFocus = true;
            } else {
              cc.warnID(3601, name);
            }
          }

          break;

        case 'inspector':
          js.value(cls, '_inspector', val, true);
          break;

        case 'icon':
          js.value(cls, '_icon', val, true);
          break;

        case 'menu':
          Component._addMenuItem(cls, val, props.menuPriority);

          break;

        case 'requireComponent':
        case 'executionOrder':
        case 'disallowMultiple':
          // skip here
          break;

        case 'help':
          cls._help = val;
          break;

        default:
          cc.warnID(3602, key, name);
          break;
      }
    }
  }
});
Component.prototype.__scriptUuid = '';
cc.Component = module.exports = Component;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQ29tcG9uZW50LmpzIl0sIm5hbWVzIjpbIkNDT2JqZWN0IiwicmVxdWlyZSIsImpzIiwiaWRHZW5lcmF0ZXIiLCJJc09uRW5hYmxlQ2FsbGVkIiwiRmxhZ3MiLCJJc09uTG9hZENhbGxlZCIsIkFjdGlvbk1hbmFnZXJFeGlzdCIsImNjIiwiQWN0aW9uTWFuYWdlciIsIkNvbXBvbmVudCIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJDQ19FRElUT1IiLCJfU2NlbmUiLCJBc3NldHNXYXRjaGVyIiwiaW5pdENvbXBvbmVudCIsIl9pZCIsIkVkaXRvciIsIlV0aWxzIiwiVXVpZFV0aWxzIiwidXVpZCIsIl9fZXZlbnRUYXJnZXRzIiwiZ2V0TmV3SWQiLCJwcm9wZXJ0aWVzIiwibm9kZSIsInZpc2libGUiLCJnZXQiLCJfbmFtZSIsImNsYXNzTmFtZSIsImdldENsYXNzTmFtZSIsInRyaW1MZWZ0IiwibGFzdEluZGV4T2YiLCJzbGljZSIsInNldCIsInZhbHVlIiwiX19zY3JpcHRBc3NldCIsImRpc3BsYXlOYW1lIiwidHlwZSIsIl9TY3JpcHQiLCJ0b29sdGlwIiwiQ0NfREVWIiwiX2VuYWJsZWQiLCJlbmFibGVkIiwiX2FjdGl2ZUluSGllcmFyY2h5IiwiY29tcFNjaGVkdWxlciIsImRpcmVjdG9yIiwiX2NvbXBTY2hlZHVsZXIiLCJlbmFibGVDb21wIiwiZGlzYWJsZUNvbXAiLCJhbmltYXRhYmxlIiwiZW5hYmxlZEluSGllcmFyY2h5IiwiX2lzT25Mb2FkQ2FsbGVkIiwiX29iakZsYWdzIiwib25DaGFuZ2UiLCJfZXhlY3V0ZU9uQ2hhbmdlIiwidXBkYXRlIiwibGF0ZVVwZGF0ZSIsIl9fcHJlbG9hZCIsIm9uTG9hZCIsInN0YXJ0Iiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJvbkRlc3Ryb3kiLCJvbkZvY3VzSW5FZGl0b3IiLCJvbkxvc3RGb2N1c0luRWRpdG9yIiwicmVzZXRJbkVkaXRvciIsImFkZENvbXBvbmVudCIsInR5cGVPckNsYXNzTmFtZSIsImdldENvbXBvbmVudCIsImdldENvbXBvbmVudHMiLCJnZXRDb21wb25lbnRJbkNoaWxkcmVuIiwiZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4iLCJfZ2V0TG9jYWxCb3VuZHMiLCJvblJlc3RvcmUiLCJkZXN0cm95IiwiZGVwZW5kIiwiX2dldERlcGVuZENvbXBvbmVudCIsImVycm9ySUQiLCJfc3VwZXIiLCJfb25QcmVEZXN0cm95IiwiZ2V0QWN0aW9uTWFuYWdlciIsInJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0IiwidW5zY2hlZHVsZUFsbENhbGxiYWNrcyIsImV2ZW50VGFyZ2V0cyIsImkiLCJsZW5ndGgiLCJ0YXJnZXQiLCJ0YXJnZXRPZmYiLCJDQ19URVNUIiwic3RvcCIsIl9ub2RlQWN0aXZhdG9yIiwiZGVzdHJveUNvbXAiLCJfcmVtb3ZlQ29tcG9uZW50IiwiX2luc3RhbnRpYXRlIiwiY2xvbmVkIiwiaW5zdGFudGlhdGUiLCJfY2xvbmUiLCJzY2hlZHVsZSIsImNhbGxiYWNrIiwiaW50ZXJ2YWwiLCJyZXBlYXQiLCJkZWxheSIsImFzc2VydElEIiwiaXNOYU4iLCJtYWNybyIsIlJFUEVBVF9GT1JFVkVSIiwic2NoZWR1bGVyIiwiZ2V0U2NoZWR1bGVyIiwicGF1c2VkIiwiaXNUYXJnZXRQYXVzZWQiLCJzY2hlZHVsZU9uY2UiLCJ1bnNjaGVkdWxlIiwiY2FsbGJhY2tfZm4iLCJ1bnNjaGVkdWxlQWxsRm9yVGFyZ2V0IiwiX3JlcXVpcmVDb21wb25lbnQiLCJfZXhlY3V0aW9uT3JkZXIiLCJDQ19QUkVWSUVXIiwiX2Rpc2FsbG93TXVsdGlwbGUiLCJfZXhlY3V0ZUluRWRpdE1vZGUiLCJfcGxheU9uRm9jdXMiLCJfaGVscCIsIl9jb21wb25lbnRNZW51SXRlbXMiLCJfYWRkTWVudUl0ZW0iLCJjbHMiLCJwYXRoIiwicHJpb3JpdHkiLCJwdXNoIiwiY29tcG9uZW50IiwibWVudVBhdGgiLCJwcm9wcyIsInJlcUNvbXAiLCJyZXF1aXJlQ29tcG9uZW50Iiwib3JkZXIiLCJleGVjdXRpb25PcmRlciIsImtleSIsInZhbCIsIndpbGxFeGVjdXRlSW5FZGl0TW9kZSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwid2FybklEIiwibWVudVByaW9yaXR5IiwicHJvdG90eXBlIiwiX19zY3JpcHRVdWlkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsZ0JBQUQsQ0FBaEI7O0FBQ0EsSUFBSUUsV0FBVyxHQUFHLEtBQUtGLE9BQU8sQ0FBQywwQkFBRCxDQUFaLEVBQTBDLE1BQTFDLENBQWxCO0FBRUEsSUFBSUcsZ0JBQWdCLEdBQUdKLFFBQVEsQ0FBQ0ssS0FBVCxDQUFlRCxnQkFBdEM7QUFDQSxJQUFJRSxjQUFjLEdBQUdOLFFBQVEsQ0FBQ0ssS0FBVCxDQUFlQyxjQUFwQztBQUVBLElBQUlDLGtCQUFrQixHQUFHLENBQUMsQ0FBQ0MsRUFBRSxDQUFDQyxhQUE5QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixFQUFFLENBQUNHLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBU1osUUFGWTtBQUlyQmEsRUFBQUEsSUFBSSxFQUFFQyxTQUFTLEdBQUcsWUFBWTtBQUMxQixRQUFLLE9BQU9DLE1BQVAsS0FBa0IsV0FBbkIsSUFBbUNBLE1BQU0sQ0FBQ0MsYUFBOUMsRUFBNkQ7QUFDekRE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QWhCO0FBQ0g7QUFDSjs7QUFDRDs7QUFFSixhQUFLLFdBQUw7QUFDSVYsVUFBQUEsRUFBRSxDQUFDa0MsS0FBSCxDQUFTeUYsR0FBVCxFQUFjLFlBQWQsRUFBNEJZLEdBQTVCLEVBQWlDLElBQWpDO0FBQ0E7O0FBRUosYUFBSyxNQUFMO0FBQ0l2SSxVQUFBQSxFQUFFLENBQUNrQyxLQUFILENBQVN5RixHQUFULEVBQWMsT0FBZCxFQUF1QlksR0FBdkIsRUFBNEIsSUFBNUI7QUFDQTs7QUFFSixhQUFLLE1BQUw7QUFDSS9ILFVBQUFBLFNBQVMsQ0FBQ2tILFlBQVYsQ0FBdUJDLEdBQXZCLEVBQTRCWSxHQUE1QixFQUFpQ04sS0FBSyxDQUFDVSxZQUF2Qzs7QUFDQTs7QUFFSixhQUFLLGtCQUFMO0FBQ0EsYUFBSyxnQkFBTDtBQUNBLGFBQUssa0JBQUw7QUFDSTtBQUNBOztBQUVKLGFBQUssTUFBTDtBQUNJaEIsVUFBQUEsR0FBRyxDQUFDSCxLQUFKLEdBQVllLEdBQVo7QUFDQTs7QUFFSjtBQUNJakksVUFBQUEsRUFBRSxDQUFDb0ksTUFBSCxDQUFVLElBQVYsRUFBZ0JKLEdBQWhCLEVBQXFCNUgsSUFBckI7QUFDQTtBQXpDUjtBQTJDSDtBQUNKO0FBQ0osQ0E3REQ7QUErREFGLFNBQVMsQ0FBQ29JLFNBQVYsQ0FBb0JDLFlBQXBCLEdBQW1DLEVBQW5DO0FBRUF2SSxFQUFFLENBQUNFLFNBQUgsR0FBZXNJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnZJLFNBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgQ0NPYmplY3QgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ09iamVjdCcpO1xudmFyIGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcbnZhciBpZEdlbmVyYXRlciA9IG5ldyAocmVxdWlyZSgnLi4vcGxhdGZvcm0vaWQtZ2VuZXJhdGVyJykpKCdDb21wJyk7XG5cbnZhciBJc09uRW5hYmxlQ2FsbGVkID0gQ0NPYmplY3QuRmxhZ3MuSXNPbkVuYWJsZUNhbGxlZDtcbnZhciBJc09uTG9hZENhbGxlZCA9IENDT2JqZWN0LkZsYWdzLklzT25Mb2FkQ2FsbGVkO1xuXG52YXIgQWN0aW9uTWFuYWdlckV4aXN0ID0gISFjYy5BY3Rpb25NYW5hZ2VyO1xuXG4vKipcbiAqICEjZW5cbiAqIEJhc2UgY2xhc3MgZm9yIGV2ZXJ5dGhpbmcgYXR0YWNoZWQgdG8gTm9kZShFbnRpdHkpLjxici8+XG4gKiA8YnIvPlxuICogTk9URTogTm90IGFsbG93ZWQgdG8gdXNlIGNvbnN0cnVjdGlvbiBwYXJhbWV0ZXJzIGZvciBDb21wb25lbnQncyBzdWJjbGFzc2VzLFxuICogYmVjYXVzZSBDb21wb25lbnQgaXMgY3JlYXRlZCBieSB0aGUgZW5naW5lLlxuICogISN6aFxuICog5omA5pyJ6ZmE5Yqg5Yiw6IqC54K555qE5Z+657G744CCPGJyLz5cbiAqIDxici8+XG4gKiDms6jmhI/vvJrkuI3lhYHorrjkvb/nlKjnu4Tku7bnmoTlrZDnsbvmnoTpgKDlj4LmlbDvvIzlm6DkuLrnu4Tku7bmmK/nlLHlvJXmk47liJvlu7rnmoTjgIJcbiAqXG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKiBAZXh0ZW5kcyBPYmplY3RcbiAqL1xudmFyIENvbXBvbmVudCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ29tcG9uZW50JyxcbiAgICBleHRlbmRzOiBDQ09iamVjdCxcblxuICAgIGN0b3I6IENDX0VESVRPUiA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgX1NjZW5lICE9PSBcInVuZGVmaW5lZFwiKSAmJiBfU2NlbmUuQXNzZXRzV2F0Y2hlcikge1xuICAgICAgICAgICAgX1NjZW5lLkFzc2V0c1dhdGNoZXIuaW5pdENvbXBvbmVudCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pZCA9IEVkaXRvci5VdGlscy5VdWlkVXRpbHMudXVpZCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFJlZ2lzdGVyIGFsbCByZWxhdGVkIEV2ZW50VGFyZ2V0cyxcbiAgICAgICAgICogYWxsIGV2ZW50IGNhbGxiYWNrcyB3aWxsIGJlIHJlbW92ZWQgaW4gYF9vblByZURlc3Ryb3lgLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOazqOWGjOaJgOacieebuOWFs+eahCBFdmVudFRhcmdldHPvvIzmiYDmnInkuovku7blm57osIPlsIblnKggYF9vblByZURlc3Ryb3lgIOS4reWIoOmZpOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5fSBfX2V2ZW50VGFyZ2V0c1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fX2V2ZW50VGFyZ2V0cyA9IFtdO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWRHZW5lcmF0ZXIuZ2V0TmV3SWQoKTtcblxuICAgICAgICB0aGlzLl9fZXZlbnRUYXJnZXRzID0gW107XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG5vZGUgdGhpcyBjb21wb25lbnQgaXMgYXR0YWNoZWQgdG8uIEEgY29tcG9uZW50IGlzIGFsd2F5cyBhdHRhY2hlZCB0byBhIG5vZGUuXG4gICAgICAgICAqICEjemgg6K+l57uE5Lu26KKr6ZmE5Yqg5Yiw55qE6IqC54K544CC57uE5Lu25oC75Lya6ZmE5Yqg5Yiw5LiA5Liq6IqC54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBub2RlXG4gICAgICAgICAqIEB0eXBlIHtOb2RlfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjYy5sb2coY29tcC5ub2RlKTtcbiAgICAgICAgICovXG4gICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1MZWZ0ID0gY2xhc3NOYW1lLmxhc3RJbmRleE9mKCcuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRyaW1MZWZ0ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnNsaWNlKHRyaW1MZWZ0ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUubmFtZSArICc8JyArIGNsYXNzTmFtZSArICc+JztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHV1aWQgZm9yIGVkaXRvci5cbiAgICAgICAgICogISN6aCDnu4Tku7bnmoQgdXVpZO+8jOeUqOS6jue8lui+keWZqOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgdXVpZFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2MubG9nKGNvbXAudXVpZCk7XG4gICAgICAgICAqL1xuICAgICAgICB1dWlkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9fc2NyaXB0QXNzZXQ6IENDX0VESVRPUiAmJiB7XG4gICAgICAgICAgICBnZXQgKCkge30sXG4gICAgICAgICAgICAvL3NldCAodmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLl9fc2NyaXB0VXVpZCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAodmFsdWUgJiYgRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5pc1V1aWQodmFsdWUuX3V1aWQpKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBjbGFzc0lkID0gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5jb21wcmVzc1V1aWQodmFsdWUuX3V1aWQpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgTmV3Q29tcCA9IGNjLmpzLl9nZXRDbGFzc0J5SWQoY2xhc3NJZCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlmIChqcy5pc0NoaWxkQ2xhc3NPZihOZXdDb21wLCBjYy5Db21wb25lbnQpKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYy53YXJuKCdTb3JyeSwgcmVwbGFjaW5nIGNvbXBvbmVudCBzY3JpcHQgaXMgbm90IHlldCBpbXBsZW1lbnRlZC4nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vRWRpdG9yLklwYy5zZW5kVG9XaW5zKCdyZWxvYWQ6d2luZG93LXNjcmlwdHMnLCBFZGl0b3IuX1NhbmRib3guY29tcGlsZWQpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY2MuZXJyb3IoJ0NhbiBub3QgZmluZCBhIGNvbXBvbmVudCBpbiB0aGUgc2NyaXB0IHdoaWNoIHV1aWQgaXMgXCIlc1wiLicsIHZhbHVlLl91dWlkKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2MuZXJyb3IoJ0ludmFsaWQgU2NyaXB0Jyk7XG4gICAgICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99LFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTY3JpcHQnLFxuICAgICAgICAgICAgdHlwZTogY2MuX1NjcmlwdCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpJTlNQRUNUT1IuY29tcG9uZW50LnNjcmlwdCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3BlcnR5IF9lbmFibGVkXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2VuYWJsZWQ6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gaW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBjb21wb25lbnQgaXMgZW5hYmxlZCBvciBub3QuXG4gICAgICAgICAqICEjemgg6KGo56S66K+l57uE5Lu26Ieq6Lqr5piv5ZCm5ZCv55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBlbmFibGVkXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNvbXAuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAqIGNjLmxvZyhjb21wLmVuYWJsZWQpO1xuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlZDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VuYWJsZWQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wU2NoZWR1bGVyID0gY2MuZGlyZWN0b3IuX2NvbXBTY2hlZHVsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wU2NoZWR1bGVyLmVuYWJsZUNvbXAodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wU2NoZWR1bGVyLmRpc2FibGVDb21wKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIGluZGljYXRlcyB3aGV0aGVyIHRoaXMgY29tcG9uZW50IGlzIGVuYWJsZWQgYW5kIGl0cyBub2RlIGlzIGFsc28gYWN0aXZlIGluIHRoZSBoaWVyYXJjaHkuXG4gICAgICAgICAqICEjemgg6KGo56S66K+l57uE5Lu25piv5ZCm6KKr5ZCv55So5bm25LiU5omA5Zyo55qE6IqC54K55Lmf5aSE5LqO5r+A5rS754q25oCB44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBlbmFibGVkSW5IaWVyYXJjaHlcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjYy5sb2coY29tcC5lbmFibGVkSW5IaWVyYXJjaHkpO1xuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlZEluSGllcmFyY2h5OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkICYmIHRoaXMubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSZXR1cm5zIGEgdmFsdWUgd2hpY2ggdXNlZCB0byBpbmRpY2F0ZSB0aGUgb25Mb2FkIGdldCBjYWxsZWQgb3Igbm90LlxuICAgICAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWAvOeUqOadpeWIpOaWrSBvbkxvYWQg5piv5ZCm6KKr6LCD55So6L+H77yM5LiN562J5LqOIDAg5pe26LCD55So6L+H77yM562J5LqOIDAg5pe25pyq6LCD55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfaXNPbkxvYWRDYWxsZWRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNjLmxvZyh0aGlzLl9pc09uTG9hZENhbGxlZCA+IDApO1xuICAgICAgICAgKi9cbiAgICAgICAgX2lzT25Mb2FkQ2FsbGVkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vYmpGbGFncyAmIElzT25Mb2FkQ2FsbGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICAvLy8vLy8vLyBORVcsIEFEREVEIEJZIHBUU1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgb25DaGFuZ2U6IG51bGwsXG4gICAgX2V4ZWN1dGVPbkNoYW5nZSgpXG4gICAge1xuICAgICAgICBpZih0aGlzLm9uQ2hhbmdlKSB0aGlzLm9uQ2hhbmdlKCk7XG4gICAgfSxcbiAgICAvLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLy8gTElGRUNZQ0xFIE1FVEhPRFNcblxuICAgIC8vIEZpcmViYWxsIHByb3ZpZGVzIGxpZmVjeWNsZSBtZXRob2RzIHRoYXQgeW91IGNhbiBzcGVjaWZ5IHRvIGhvb2sgaW50byB0aGlzIHByb2Nlc3MuXG4gICAgLy8gV2UgcHJvdmlkZSBQcmUgbWV0aG9kcywgd2hpY2ggYXJlIGNhbGxlZCByaWdodCBiZWZvcmUgc29tZXRoaW5nIGhhcHBlbnMsIGFuZCBQb3N0IG1ldGhvZHMgd2hpY2ggYXJlIGNhbGxlZCByaWdodCBhZnRlciBzb21ldGhpbmcgaGFwcGVucy5cblxuICAgIC8qKlxuICAgICAqICEjZW4gVXBkYXRlIGlzIGNhbGxlZCBldmVyeSBmcmFtZSwgaWYgdGhlIENvbXBvbmVudCBpcyBlbmFibGVkLjxici8+XG4gICAgICogVGhpcyBpcyBhIGxpZmVjeWNsZSBtZXRob2QuIEl0IG1heSBub3QgYmUgaW1wbGVtZW50ZWQgaW4gdGhlIHN1cGVyIGNsYXNzLiBZb3UgY2FuIG9ubHkgY2FsbCBpdHMgc3VwZXIgY2xhc3MgbWV0aG9kIGluc2lkZSBpdC4gSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgbWFudWFsbHkgZWxzZXdoZXJlLlxuICAgICAqICEjemgg5aaC5p6c6K+l57uE5Lu25ZCv55So77yM5YiZ5q+P5bin6LCD55SoIHVwZGF0ZeOAgjxici8+XG4gICAgICog6K+l5pa55rOV5Li655Sf5ZG95ZGo5pyf5pa55rOV77yM54i257G75pyq5b+F5Lya5pyJ5a6e546w44CC5bm25LiU5L2g5Y+q6IO95Zyo6K+l5pa55rOV5YaF6YOo6LCD55So54i257G755qE5a6e546w77yM5LiN5Y+v5Zyo5YW25a6D5Zyw5pa555u05o6l6LCD55So6K+l5pa55rOV44CCXG4gICAgICogQG1ldGhvZCB1cGRhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHQgLSB0aGUgZGVsdGEgdGltZSBpbiBzZWNvbmRzIGl0IHRvb2sgdG8gY29tcGxldGUgdGhlIGxhc3QgZnJhbWVcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdXBkYXRlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBMYXRlVXBkYXRlIGlzIGNhbGxlZCBldmVyeSBmcmFtZSwgaWYgdGhlIENvbXBvbmVudCBpcyBlbmFibGVkLjxici8+XG4gICAgICogVGhpcyBpcyBhIGxpZmVjeWNsZSBtZXRob2QuIEl0IG1heSBub3QgYmUgaW1wbGVtZW50ZWQgaW4gdGhlIHN1cGVyIGNsYXNzLiBZb3UgY2FuIG9ubHkgY2FsbCBpdHMgc3VwZXIgY2xhc3MgbWV0aG9kIGluc2lkZSBpdC4gSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgbWFudWFsbHkgZWxzZXdoZXJlLlxuICAgICAqICEjemgg5aaC5p6c6K+l57uE5Lu25ZCv55So77yM5YiZ5q+P5bin6LCD55SoIExhdGVVcGRhdGXjgII8YnIvPlxuICAgICAqIOivpeaWueazleS4uueUn+WRveWRqOacn+aWueazle+8jOeItuexu+acquW/heS8muacieWunueOsOOAguW5tuS4lOS9oOWPquiDveWcqOivpeaWueazleWGhemDqOiwg+eUqOeItuexu+eahOWunueOsO+8jOS4jeWPr+WcqOWFtuWug+WcsOaWueebtOaOpeiwg+eUqOivpeaWueazleOAglxuICAgICAqIEBtZXRob2QgbGF0ZVVwZGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdCAtIHRoZSBkZWx0YSB0aW1lIGluIHNlY29uZHMgaXQgdG9vayB0byBjb21wbGV0ZSB0aGUgbGFzdCBmcmFtZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBsYXRlVXBkYXRlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogYF9fcHJlbG9hZGAgaXMgY2FsbGVkIGJlZm9yZSBldmVyeSBvbkxvYWQuXG4gICAgICogSXQgaXMgdXNlZCB0byBpbml0aWFsaXplIHRoZSBidWlsdGluIGNvbXBvbmVudHMgaW50ZXJuYWxseSxcbiAgICAgKiB0byBhdm9pZCBjaGVja2luZyB3aGV0aGVyIG9uTG9hZCBpcyBjYWxsZWQgYmVmb3JlIGV2ZXJ5IHB1YmxpYyBtZXRob2QgY2FsbHMuXG4gICAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIHJlbW92ZWQgaWYgc2NyaXB0IHByaW9yaXR5IGlzIHN1cHBvcnRlZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgX19wcmVsb2FkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfX3ByZWxvYWQ6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogV2hlbiBhdHRhY2hpbmcgdG8gYW4gYWN0aXZlIG5vZGUgb3IgaXRzIG5vZGUgZmlyc3QgYWN0aXZhdGVkLlxuICAgICAqIG9uTG9hZCBpcyBhbHdheXMgY2FsbGVkIGJlZm9yZSBhbnkgc3RhcnQgZnVuY3Rpb25zLCB0aGlzIGFsbG93cyB5b3UgdG8gb3JkZXIgaW5pdGlhbGl6YXRpb24gb2Ygc2NyaXB0cy48YnIvPlxuICAgICAqIFRoaXMgaXMgYSBsaWZlY3ljbGUgbWV0aG9kLiBJdCBtYXkgbm90IGJlIGltcGxlbWVudGVkIGluIHRoZSBzdXBlciBjbGFzcy4gWW91IGNhbiBvbmx5IGNhbGwgaXRzIHN1cGVyIGNsYXNzIG1ldGhvZCBpbnNpZGUgaXQuIEl0IHNob3VsZCBub3QgYmUgY2FsbGVkIG1hbnVhbGx5IGVsc2V3aGVyZS5cbiAgICAgKiAhI3poXG4gICAgICog5b2T6ZmE5Yqg5Yiw5LiA5Liq5r+A5rS755qE6IqC54K55LiK5oiW6ICF5YW26IqC54K556ys5LiA5qyh5r+A5rS75pe25YCZ6LCD55So44CCb25Mb2FkIOaAu+aYr+S8muWcqOS7u+S9lSBzdGFydCDmlrnms5XosIPnlKjliY3miafooYzvvIzov5nog73nlKjkuo7lronmjpLohJrmnKznmoTliJ3lp4vljJbpobrluo/jgII8YnIvPlxuICAgICAqIOivpeaWueazleS4uueUn+WRveWRqOacn+aWueazle+8jOeItuexu+acquW/heS8muacieWunueOsOOAguW5tuS4lOS9oOWPquiDveWcqOivpeaWueazleWGhemDqOiwg+eUqOeItuexu+eahOWunueOsO+8jOS4jeWPr+WcqOWFtuWug+WcsOaWueebtOaOpeiwg+eUqOivpeaWueazleOAglxuICAgICAqIEBtZXRob2Qgb25Mb2FkXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uTG9hZDogbnVsbCxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDYWxsZWQgYmVmb3JlIGFsbCBzY3JpcHRzJyB1cGRhdGUgaWYgdGhlIENvbXBvbmVudCBpcyBlbmFibGVkIHRoZSBmaXJzdCB0aW1lLlxuICAgICAqIFVzdWFsbHkgdXNlZCB0byBpbml0aWFsaXplIHNvbWUgbG9naWMgd2hpY2ggbmVlZCB0byBiZSBjYWxsZWQgYWZ0ZXIgYWxsIGNvbXBvbmVudHMnIGBvbmxvYWRgIG1ldGhvZHMgY2FsbGVkLjxici8+XG4gICAgICogVGhpcyBpcyBhIGxpZmVjeWNsZSBtZXRob2QuIEl0IG1heSBub3QgYmUgaW1wbGVtZW50ZWQgaW4gdGhlIHN1cGVyIGNsYXNzLiBZb3UgY2FuIG9ubHkgY2FsbCBpdHMgc3VwZXIgY2xhc3MgbWV0aG9kIGluc2lkZSBpdC4gSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgbWFudWFsbHkgZWxzZXdoZXJlLlxuICAgICAqICEjemhcbiAgICAgKiDlpoLmnpzor6Xnu4Tku7bnrKzkuIDmrKHlkK/nlKjvvIzliJnlnKjmiYDmnInnu4Tku7bnmoQgdXBkYXRlIOS5i+WJjeiwg+eUqOOAgumAmuW4uOeUqOS6jumcgOimgeWcqOaJgOaciee7hOS7tueahCBvbkxvYWQg5Yid5aeL5YyW5a6M5q+V5ZCO5omn6KGM55qE6YC76L6R44CCPGJyLz5cbiAgICAgKiDor6Xmlrnms5XkuLrnlJ/lkb3lkajmnJ/mlrnms5XvvIzniLbnsbvmnKrlv4XkvJrmnInlrp7njrDjgILlubbkuJTkvaDlj6rog73lnKjor6Xmlrnms5XlhoXpg6josIPnlKjniLbnsbvnmoTlrp7njrDvvIzkuI3lj6/lnKjlhbblroPlnLDmlrnnm7TmjqXosIPnlKjor6Xmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIHN0YXJ0XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXJ0OiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDYWxsZWQgd2hlbiB0aGlzIGNvbXBvbmVudCBiZWNvbWVzIGVuYWJsZWQgYW5kIGl0cyBub2RlIGlzIGFjdGl2ZS48YnIvPlxuICAgICAqIFRoaXMgaXMgYSBsaWZlY3ljbGUgbWV0aG9kLiBJdCBtYXkgbm90IGJlIGltcGxlbWVudGVkIGluIHRoZSBzdXBlciBjbGFzcy4gWW91IGNhbiBvbmx5IGNhbGwgaXRzIHN1cGVyIGNsYXNzIG1ldGhvZCBpbnNpZGUgaXQuIEl0IHNob3VsZCBub3QgYmUgY2FsbGVkIG1hbnVhbGx5IGVsc2V3aGVyZS5cbiAgICAgKiAhI3poIOW9k+ivpee7hOS7tuiiq+WQr+eUqO+8jOW5tuS4lOWug+eahOiKgueCueS5n+a/gOa0u+aXtuOAgjxici8+XG4gICAgICog6K+l5pa55rOV5Li655Sf5ZG95ZGo5pyf5pa55rOV77yM54i257G75pyq5b+F5Lya5pyJ5a6e546w44CC5bm25LiU5L2g5Y+q6IO95Zyo6K+l5pa55rOV5YaF6YOo6LCD55So54i257G755qE5a6e546w77yM5LiN5Y+v5Zyo5YW25a6D5Zyw5pa555u05o6l6LCD55So6K+l5pa55rOV44CCXG4gICAgICogQG1ldGhvZCBvbkVuYWJsZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkVuYWJsZTogbnVsbCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsbGVkIHdoZW4gdGhpcyBjb21wb25lbnQgYmVjb21lcyBkaXNhYmxlZCBvciBpdHMgbm9kZSBiZWNvbWVzIGluYWN0aXZlLjxici8+XG4gICAgICogVGhpcyBpcyBhIGxpZmVjeWNsZSBtZXRob2QuIEl0IG1heSBub3QgYmUgaW1wbGVtZW50ZWQgaW4gdGhlIHN1cGVyIGNsYXNzLiBZb3UgY2FuIG9ubHkgY2FsbCBpdHMgc3VwZXIgY2xhc3MgbWV0aG9kIGluc2lkZSBpdC4gSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgbWFudWFsbHkgZWxzZXdoZXJlLlxuICAgICAqICEjemgg5b2T6K+l57uE5Lu26KKr56aB55So5oiW6IqC54K55Y+Y5Li65peg5pWI5pe26LCD55So44CCPGJyLz5cbiAgICAgKiDor6Xmlrnms5XkuLrnlJ/lkb3lkajmnJ/mlrnms5XvvIzniLbnsbvmnKrlv4XkvJrmnInlrp7njrDjgILlubbkuJTkvaDlj6rog73lnKjor6Xmlrnms5XlhoXpg6josIPnlKjniLbnsbvnmoTlrp7njrDvvIzkuI3lj6/lnKjlhbblroPlnLDmlrnnm7TmjqXosIPnlKjor6Xmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIG9uRGlzYWJsZVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRpc2FibGU6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENhbGxlZCB3aGVuIHRoaXMgY29tcG9uZW50IHdpbGwgYmUgZGVzdHJveWVkLjxici8+XG4gICAgICogVGhpcyBpcyBhIGxpZmVjeWNsZSBtZXRob2QuIEl0IG1heSBub3QgYmUgaW1wbGVtZW50ZWQgaW4gdGhlIHN1cGVyIGNsYXNzLiBZb3UgY2FuIG9ubHkgY2FsbCBpdHMgc3VwZXIgY2xhc3MgbWV0aG9kIGluc2lkZSBpdC4gSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgbWFudWFsbHkgZWxzZXdoZXJlLlxuICAgICAqICEjemgg5b2T6K+l57uE5Lu26KKr6ZSA5q+B5pe26LCD55SoPGJyLz5cbiAgICAgKiDor6Xmlrnms5XkuLrnlJ/lkb3lkajmnJ/mlrnms5XvvIzniLbnsbvmnKrlv4XkvJrmnInlrp7njrDjgILlubbkuJTkvaDlj6rog73lnKjor6Xmlrnms5XlhoXpg6josIPnlKjniLbnsbvnmoTlrp7njrDvvIzkuI3lj6/lnKjlhbblroPlnLDmlrnnm7TmjqXosIPnlKjor6Xmlrnms5XjgIJcbiAgICAgKiBAbWV0aG9kIG9uRGVzdHJveVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRlc3Ryb3k6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIG9uRm9jdXNJbkVkaXRvclxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkZvY3VzSW5FZGl0b3I6IG51bGwsXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBvbkxvc3RGb2N1c0luRWRpdG9yXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uTG9zdEZvY3VzSW5FZGl0b3I6IG51bGwsXG4gICAgLyoqXG4gICAgICogISNlbiBDYWxsZWQgdG8gaW5pdGlhbGl6ZSB0aGUgY29tcG9uZW50IG9yIG5vZGXigJlzIHByb3BlcnRpZXMgd2hlbiBhZGRpbmcgdGhlIGNvbXBvbmVudCB0aGUgZmlyc3QgdGltZSBvciB3aGVuIHRoZSBSZXNldCBjb21tYW5kIGlzIHVzZWQuIFRoaXMgZnVuY3Rpb24gaXMgb25seSBjYWxsZWQgaW4gZWRpdG9yLlxuICAgICAqICEjemgg55So5p2l5Yid5aeL5YyW57uE5Lu25oiW6IqC54K555qE5LiA5Lqb5bGe5oCn77yM5b2T6K+l57uE5Lu26KKr56ys5LiA5qyh5re75Yqg5Yiw6IqC54K55LiK5oiW55So5oi354K55Ye75LqG5a6D55qEIFJlc2V0IOiPnOWNleaXtuiwg+eUqOOAgui/meS4quWbnuiwg+WPquS8muWcqOe8lui+keWZqOS4i+iwg+eUqOOAglxuICAgICAqIEBtZXRob2QgcmVzZXRJbkVkaXRvclxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZXNldEluRWRpdG9yOiBudWxsLFxuXG4gICAgLy8gUFVCTElDXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYSBjb21wb25lbnQgY2xhc3MgdG8gdGhlIG5vZGUuIFlvdSBjYW4gYWxzbyBhZGQgY29tcG9uZW50IHRvIG5vZGUgYnkgcGFzc2luZyBpbiB0aGUgbmFtZSBvZiB0aGUgc2NyaXB0LlxuICAgICAqICEjemgg5ZCR6IqC54K55re75Yqg5LiA5Liq57uE5Lu257G777yM5L2g6L+Y5Y+v5Lul6YCa6L+H5Lyg5YWl6ISa5pys55qE5ZCN56ew5p2l5re75Yqg57uE5Lu244CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFkZENvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWUgLSB0aGUgY29uc3RydWN0b3Igb3IgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBhZGRcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gdGhlIG5ld2x5IGFkZGVkIGNvbXBvbmVudFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3QgPSBub2RlLmFkZENvbXBvbmVudChcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGRDb21wb25lbnQ8VCBleHRlbmRzIENvbXBvbmVudD4odHlwZToge25ldygpOiBUfSk6IFRcbiAgICAgKiBhZGRDb21wb25lbnQoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnlcbiAgICAgKi9cbiAgICBhZGRDb21wb25lbnQgKHR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmFkZENvbXBvbmVudCh0eXBlT3JDbGFzc05hbWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgY29tcG9uZW50IG9mIHN1cHBsaWVkIHR5cGUgaWYgdGhlIG5vZGUgaGFzIG9uZSBhdHRhY2hlZCwgbnVsbCBpZiBpdCBkb2Vzbid0Ljxici8+XG4gICAgICogWW91IGNhbiBhbHNvIGdldCBjb21wb25lbnQgaW4gdGhlIG5vZGUgYnkgcGFzc2luZyBpbiB0aGUgbmFtZSBvZiB0aGUgc2NyaXB0LlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5boioLngrnkuIrmjIflrprnsbvlnovnmoTnu4Tku7bvvIzlpoLmnpzoioLngrnmnInpmYTliqDmjIflrprnsbvlnovnmoTnu4Tku7bvvIzliJnov5Tlm57vvIzlpoLmnpzmsqHmnInliJnkuLrnqbrjgII8YnIvPlxuICAgICAqIOS8oOWFpeWPguaVsOS5n+WPr+S7peaYr+iEmuacrOeahOWQjeensOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRDb21wb25lbnRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gdHlwZU9yQ2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gZ2V0IHNwcml0ZSBjb21wb25lbnQuXG4gICAgICogdmFyIHNwcml0ZSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogLy8gZ2V0IGN1c3RvbSB0ZXN0IGNhbHNzLlxuICAgICAqIHZhciB0ZXN0ID0gbm9kZS5nZXRDb21wb25lbnQoXCJUZXN0XCIpO1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KHR5cGU6IHtwcm90b3R5cGU6IFR9KTogVFxuICAgICAqIGdldENvbXBvbmVudChjbGFzc05hbWU6IHN0cmluZyk6IGFueVxuICAgICAqL1xuICAgIGdldENvbXBvbmVudCAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHR5cGVPckNsYXNzTmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBhbGwgY29tcG9uZW50cyBvZiBzdXBwbGllZCBUeXBlIGluIHRoZSBub2RlLlxuICAgICAqICEjemgg6L+U5Zue6IqC54K55LiK5oyH5a6a57G75Z6L55qE5omA5pyJ57uE5Lu244CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudHNcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gdHlwZU9yQ2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50W119XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgc3ByaXRlcyA9IG5vZGUuZ2V0Q29tcG9uZW50cyhjYy5TcHJpdGUpO1xuICAgICAqIHZhciB0ZXN0cyA9IG5vZGUuZ2V0Q29tcG9uZW50cyhcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRDb21wb25lbnRzPFQgZXh0ZW5kcyBDb21wb25lbnQ+KHR5cGU6IHtwcm90b3R5cGU6IFR9KTogVFtdXG4gICAgICogZ2V0Q29tcG9uZW50cyhjbGFzc05hbWU6IHN0cmluZyk6IGFueVtdXG4gICAgICovXG4gICAgZ2V0Q29tcG9uZW50cyAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50cyh0eXBlT3JDbGFzc05hbWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGNvbXBvbmVudCBvZiBzdXBwbGllZCB0eXBlIGluIGFueSBvZiBpdHMgY2hpbGRyZW4gdXNpbmcgZGVwdGggZmlyc3Qgc2VhcmNoLlxuICAgICAqICEjemgg6YCS5b2S5p+l5om+5omA5pyJ5a2Q6IqC54K55Lit56ys5LiA5Liq5Yy56YWN5oyH5a6a57G75Z6L55qE57uE5Lu244CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudEluQ2hpbGRyZW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gdHlwZU9yQ2xhc3NOYW1lXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuU3ByaXRlKTtcbiAgICAgKiB2YXIgVGVzdCA9IG5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRDb21wb25lbnRJbkNoaWxkcmVuPFQgZXh0ZW5kcyBDb21wb25lbnQ+KHR5cGU6IHtwcm90b3R5cGU6IFR9KTogVFxuICAgICAqIGdldENvbXBvbmVudEluQ2hpbGRyZW4oY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnlcbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRJbkNoaWxkcmVuICh0eXBlT3JDbGFzc05hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY29tcG9uZW50cyBvZiBzdXBwbGllZCB0eXBlIGluIHNlbGYgb3IgYW55IG9mIGl0cyBjaGlsZHJlbiB1c2luZyBkZXB0aCBmaXJzdCBzZWFyY2guXG4gICAgICogISN6aCDpgJLlvZLmn6Xmib7oh6rouqvmiJbmiYDmnInlrZDoioLngrnkuK3mjIflrprnsbvlnovnmoTnu4Tku7ZcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gdHlwZU9yQ2xhc3NOYW1lXG4gICAgICogQHJldHVybnMge0NvbXBvbmVudFtdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZXMgPSBub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3RzID0gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRDb21wb25lbnRzSW5DaGlsZHJlbjxUIGV4dGVuZHMgQ29tcG9uZW50Pih0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFRbXVxuICAgICAqIGdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNsYXNzTmFtZTogc3RyaW5nKTogYW55W11cbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRzSW5DaGlsZHJlbiAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4odHlwZU9yQ2xhc3NOYW1lKTtcbiAgICB9LFxuXG4gICAgLy8gVklSVFVBTFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIElmIHRoZSBjb21wb25lbnQncyBib3VuZGluZyBib3ggaXMgZGlmZmVyZW50IGZyb20gdGhlIG5vZGUncywgeW91IGNhbiBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gc3VwcGx5XG4gICAgICogYSBjdXN0b20gYXhpcyBhbGlnbmVkIGJvdW5kaW5nIGJveCAoQUFCQiksIHNvIHRoZSBlZGl0b3IncyBzY2VuZSB2aWV3IGNhbiBwZXJmb3JtIGhpdCB0ZXN0IHByb3Blcmx5LlxuICAgICAqICEjemhcbiAgICAgKiDlpoLmnpznu4Tku7bnmoTljIXlm7Tnm5LkuI7oioLngrnkuI3lkIzvvIzmgqjlj6/ku6Xlrp7njrDor6Xmlrnms5Xku6Xmj5Dkvpvoh6rlrprkuYnnmoTovbTlkJHlr7npvZDnmoTljIXlm7Tnm5LvvIhBQUJC77yJ77yMXG4gICAgICog5Lul5L6/57yW6L6R5Zmo55qE5Zy65pmv6KeG5Zu+5Y+v5Lul5q2j56Gu5Zyw5omn6KGM54K56YCJ5rWL6K+V44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9nZXRMb2NhbEJvdW5kc1xuICAgICAqIEBwYXJhbSB7UmVjdH0gb3V0X3JlY3QgLSB0aGUgUmVjdCB0byByZWNlaXZlIHRoZSBib3VuZGluZyBib3hcbiAgICAgKi9cbiAgICBfZ2V0TG9jYWxCb3VuZHM6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogb25SZXN0b3JlIGlzIGNhbGxlZCBhZnRlciB0aGUgdXNlciBjbGlja3MgdGhlIFJlc2V0IGl0ZW0gaW4gdGhlIEluc3BlY3RvcidzIGNvbnRleHQgbWVudSBvciBwZXJmb3Jtc1xuICAgICAqIGFuIHVuZG8gb3BlcmF0aW9uIG9uIHRoaXMgY29tcG9uZW50Ljxici8+XG4gICAgICogPGJyLz5cbiAgICAgKiBJZiB0aGUgY29tcG9uZW50IGNvbnRhaW5zIHRoZSBcImludGVybmFsIHN0YXRlXCIsIHNob3J0IGZvciBcInRlbXBvcmFyeSBtZW1iZXIgdmFyaWFibGVzIHdoaWNoIG5vdCBpbmNsdWRlZDxici8+XG4gICAgICogaW4gaXRzIENDQ2xhc3MgcHJvcGVydGllc1wiLCB0aGVuIHlvdSBtYXkgbmVlZCB0byBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbi48YnIvPlxuICAgICAqIDxici8+XG4gICAgICogVGhlIGVkaXRvciB3aWxsIGNhbGwgdGhlIGdldHNldCBhY2Nlc3NvcnMgb2YgeW91ciBjb21wb25lbnQgdG8gcmVjb3JkL3Jlc3RvcmUgdGhlIGNvbXBvbmVudCdzIHN0YXRlPGJyLz5cbiAgICAgKiBmb3IgdW5kby9yZWRvIG9wZXJhdGlvbi4gSG93ZXZlciwgaW4gZXh0cmVtZSBjYXNlcywgaXQgbWF5IG5vdCB3b3JrcyB3ZWxsLiBUaGVuIHlvdSBzaG91bGQgaW1wbGVtZW50PGJyLz5cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIHRvIG1hbnVhbGx5IHN5bmNocm9uaXplIHlvdXIgY29tcG9uZW50J3MgXCJpbnRlcm5hbCBzdGF0ZXNcIiB3aXRoIGl0cyBwdWJsaWMgcHJvcGVydGllcy48YnIvPlxuICAgICAqIE9uY2UgeW91IGltcGxlbWVudCB0aGlzIGZ1bmN0aW9uLCBhbGwgdGhlIGdldHNldCBhY2Nlc3NvcnMgb2YgeW91ciBjb21wb25lbnQgd2lsbCBub3QgYmUgY2FsbGVkIHdoZW48YnIvPlxuICAgICAqIHRoZSB1c2VyIHBlcmZvcm1zIGFuIHVuZG8vcmVkbyBvcGVyYXRpb24uIFdoaWNoIG1lYW5zIHRoYXQgb25seSB0aGUgcHJvcGVydGllcyB3aXRoIGRlZmF1bHQgdmFsdWU8YnIvPlxuICAgICAqIHdpbGwgYmUgcmVjb3JkZWQgb3IgcmVzdG9yZWQgYnkgZWRpdG9yLjxici8+XG4gICAgICogPGJyLz5cbiAgICAgKiBTaW1pbGFybHksIHRoZSBlZGl0b3IgbWF5IGZhaWxlZCB0byByZXNldCB5b3VyIGNvbXBvbmVudCBjb3JyZWN0bHkgaW4gZXh0cmVtZSBjYXNlcy4gVGhlbiBpZiB5b3UgbmVlZDxici8+XG4gICAgICogdG8gc3VwcG9ydCB0aGUgcmVzZXQgbWVudSwgeW91IHNob3VsZCBtYW51YWxseSBzeW5jaHJvbml6ZSB5b3VyIGNvbXBvbmVudCdzIFwiaW50ZXJuYWwgc3RhdGVzXCIgd2l0aCBpdHM8YnIvPlxuICAgICAqIHByb3BlcnRpZXMgaW4gdGhpcyBmdW5jdGlvbi4gT25jZSB5b3UgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24sIGFsbCB0aGUgZ2V0c2V0IGFjY2Vzc29ycyBvZiB5b3VyIGNvbXBvbmVudDxici8+XG4gICAgICogd2lsbCBub3QgYmUgY2FsbGVkIGR1cmluZyByZXNldCBvcGVyYXRpb24uIFdoaWNoIG1lYW5zIHRoYXQgb25seSB0aGUgcHJvcGVydGllcyB3aXRoIGRlZmF1bHQgdmFsdWU8YnIvPlxuICAgICAqIHdpbGwgYmUgcmVzZXQgYnkgZWRpdG9yLlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBvbmx5IGNhbGxlZCBpbiBlZGl0b3IgbW9kZS5cbiAgICAgKiAhI3poXG4gICAgICogb25SZXN0b3JlIOaYr+eUqOaIt+WcqOajgOafpeWZqOiPnOWNleeCueWHuyBSZXNldCDml7bvvIzlr7nmraTnu4Tku7bmiafooYzmkqTmtojmk43kvZzlkI7osIPnlKjnmoTjgII8YnIvPlxuICAgICAqIDxici8+XG4gICAgICog5aaC5p6c57uE5Lu25YyF5ZCr5LqG4oCc5YaF6YOo54q25oCB4oCd77yI5LiN5ZyoIENDQ2xhc3Mg5bGe5oCn5Lit5a6a5LmJ55qE5Li05pe25oiQ5ZGY5Y+Y6YeP77yJ77yM6YKj5LmI5L2g5Y+v6IO96ZyA6KaB5a6e546w6K+l5pa55rOV44CCPGJyLz5cbiAgICAgKiA8YnIvPlxuICAgICAqIOe8lui+keWZqOaJp+ihjOaSpOmUgC/ph43lgZrmk43kvZzml7bvvIzlsIbosIPnlKjnu4Tku7bnmoQgZ2V0IHNldCDmnaXlvZXliLblkozov5jljp/nu4Tku7bnmoTnirbmgIHjgILnhLbogIzvvIzlnKjmnoHnq6/nmoTmg4XlhrXkuIvvvIzlroPlj6/og73ml6Dms5Xoia/lpb3ov5DkvZzjgII8YnIvPlxuICAgICAqIOmCo+S5iOS9oOWwseW6lOivpeWunueOsOi/meS4quaWueazle+8jOaJi+WKqOagueaNrue7hOS7tueahOWxnuaAp+WQjOatpeKAnOWGhemDqOeKtuaAgeKAneOAguS4gOaXpuS9oOWunueOsOi/meS4quaWueazle+8jOW9k+eUqOaIt+aSpOmUgOaIlumHjeWBmuaXtu+8jOe7hOS7tueahOaJgOaciSBnZXQgc2V0IOmDveS4jeS8muWGjeiiq+iwg+eUqOOAgui/meaEj+WRs+edgOS7heS7heaMh+WumuS6hum7mOiupOWAvOeahOWxnuaAp+Wwhuiiq+e8lui+keWZqOiusOW9leWSjOi/mOWOn+OAgjxici8+XG4gICAgICogPGJyLz5cbiAgICAgKiDlkIzmoLfnmoTvvIznvJbovpHlj6/og73ml6Dms5XlnKjmnoHnq6/mg4XlhrXkuIvmraPnoa7lnLDph43nva7mgqjnmoTnu4Tku7bjgILlpoLmnpzkvaDpnIDopoHmlK/mjIHnu4Tku7bph43nva7oj5zljZXvvIzliJnpnIDopoHlnKjor6Xmlrnms5XkuK3miYvlt6XlkIzmraXnu4Tku7blsZ7mgKfliLDigJzlhoXpg6jnirbmgIHigJ3jgILkuIDml6bkvaDlrp7njrDov5nkuKrmlrnms5XvvIznu4Tku7bnmoTmiYDmnIkgZ2V0IHNldCDpg73kuI3kvJrlnKjph43nva7mk43kvZzml7booqvosIPnlKjjgILov5nmhI/lkbPnnYDku4Xku4XmjIflrprkuobpu5jorqTlgLznmoTlsZ7mgKflsIbooqvnvJbovpHlmajph43nva7jgIJcbiAgICAgKiA8YnIvPlxuICAgICAqIOatpOaWueazleS7heWcqOe8lui+keWZqOS4i+S8muiiq+iwg+eUqOOAglxuICAgICAqIEBtZXRob2Qgb25SZXN0b3JlXG4gICAgICovXG4gICAgb25SZXN0b3JlOiBudWxsLFxuXG4gICAgLy8gT1ZFUlJJREVcblxuICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kID0gdGhpcy5ub2RlLl9nZXREZXBlbmRDb21wb25lbnQodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGVwZW5kKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoMzYyNixcbiAgICAgICAgICAgICAgICAgICAgY2MuanMuZ2V0Q2xhc3NOYW1lKHRoaXMpLCBjYy5qcy5nZXRDbGFzc05hbWUoZGVwZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3N1cGVyKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmFibGVkICYmIHRoaXMubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5fY29tcFNjaGVkdWxlci5kaXNhYmxlQ29tcCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25QcmVEZXN0cm95ICgpIHtcbiAgICAgICAgaWYgKEFjdGlvbk1hbmFnZXJFeGlzdCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2NoZWR1bGVzXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICAgIHZhciBldmVudFRhcmdldHMgPSB0aGlzLl9fZXZlbnRUYXJnZXRzO1xuICAgICAgICBmb3IgKHZhciBpID0gZXZlbnRUYXJnZXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnRUYXJnZXRzW2ldO1xuICAgICAgICAgICAgdGFyZ2V0ICYmIHRhcmdldC50YXJnZXRPZmYodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnRUYXJnZXRzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgLy9cbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhQ0NfVEVTVCkge1xuICAgICAgICAgICAgX1NjZW5lLkFzc2V0c1dhdGNoZXIuc3RvcCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9uRGVzdHJveVxuICAgICAgICBjYy5kaXJlY3Rvci5fbm9kZUFjdGl2YXRvci5kZXN0cm95Q29tcCh0aGlzKTtcblxuICAgICAgICAvLyBkbyByZW1vdmUgY29tcG9uZW50XG4gICAgICAgIHRoaXMubm9kZS5fcmVtb3ZlQ29tcG9uZW50KHRoaXMpO1xuICAgIH0sXG5cbiAgICBfaW5zdGFudGlhdGUgKGNsb25lZCkge1xuICAgICAgICBpZiAoIWNsb25lZCkge1xuICAgICAgICAgICAgY2xvbmVkID0gY2MuaW5zdGFudGlhdGUuX2Nsb25lKHRoaXMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNsb25lZC5ub2RlID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9LFxuXG4vLyBTY2hlZHVsZXJcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTY2hlZHVsZXMgYSBjdXN0b20gc2VsZWN0b3IuPGJyLz5cbiAgICAgKiBJZiB0aGUgc2VsZWN0b3IgaXMgYWxyZWFkeSBzY2hlZHVsZWQsIHRoZW4gdGhlIGludGVydmFsIHBhcmFtZXRlciB3aWxsIGJlIHVwZGF0ZWQgd2l0aG91dCBzY2hlZHVsaW5nIGl0IGFnYWluLlxuICAgICAqICEjemhcbiAgICAgKiDosIPluqbkuIDkuKroh6rlrprkuYnnmoTlm57osIPlh73mlbDjgII8YnIvPlxuICAgICAqIOWmguaenOWbnuiwg+WHveaVsOW3suiwg+W6pu+8jOmCo+S5iOWwhuS4jeS8mumHjeWkjeiwg+W6puWug++8jOWPquS8muabtOaWsOaXtumXtOmXtOmalOWPguaVsOOAglxuICAgICAqIEBtZXRob2Qgc2NoZWR1bGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2ludGVydmFsPTBdICBUaWNrIGludGVydmFsIGluIHNlY29uZHMuIDAgbWVhbnMgdGljayBldmVyeSBmcmFtZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3JlcGVhdD1jYy5tYWNyby5SRVBFQVRfRk9SRVZFUl0gICAgVGhlIHNlbGVjdG9yIHdpbGwgYmUgZXhlY3V0ZWQgKHJlcGVhdCArIDEpIHRpbWVzLCB5b3UgY2FuIHVzZSBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUiBmb3IgdGljayBpbmZpbml0ZWx5LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsYXk9MF0gICAgIFRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHRoZSBmaXJzdCB0aWNrIHdpbGwgd2FpdCBiZWZvcmUgZXhlY3V0aW9uLiBVbml0OiBzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdGltZUNhbGxiYWNrID0gZnVuY3Rpb24gKGR0KSB7XG4gICAgICogICBjYy5sb2coXCJ0aW1lOiBcIiArIGR0KTtcbiAgICAgKiB9XG4gICAgICogdGhpcy5zY2hlZHVsZSh0aW1lQ2FsbGJhY2ssIDEpO1xuICAgICAqL1xuICAgIHNjaGVkdWxlIChjYWxsYmFjaywgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXkpIHtcbiAgICAgICAgY2MuYXNzZXJ0SUQoY2FsbGJhY2ssIDE2MTkpO1xuXG4gICAgICAgIGludGVydmFsID0gaW50ZXJ2YWwgfHwgMDtcbiAgICAgICAgY2MuYXNzZXJ0SUQoaW50ZXJ2YWwgPj0gMCwgMTYyMCk7XG5cbiAgICAgICAgcmVwZWF0ID0gaXNOYU4ocmVwZWF0KSA/IGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSIDogcmVwZWF0O1xuICAgICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XG5cbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpO1xuXG4gICAgICAgIC8vIHNob3VsZCBub3QgdXNlIGVuYWJsZWRJbkhpZXJhcmNoeSB0byBqdWRnZSB3aGV0aGVyIHBhdXNlZCxcbiAgICAgICAgLy8gYmVjYXVzZSBlbmFibGVkSW5IaWVyYXJjaHkgaXMgYXNzaWduZWQgYWZ0ZXIgb25FbmFibGUuXG4gICAgICAgIC8vIEFjdHVhbGx5LCBpZiBub3QgeWV0IHNjaGVkdWxlZCwgcmVzdW1lVGFyZ2V0L3BhdXNlVGFyZ2V0IGhhcyBubyBlZmZlY3Qgb24gY29tcG9uZW50LFxuICAgICAgICAvLyB0aGVyZWZvcmUgdGhlcmUgaXMgbm8gd2F5IHRvIGd1YXJhbnRlZSB0aGUgcGF1c2VkIHN0YXRlIG90aGVyIHRoYW4gaXNUYXJnZXRQYXVzZWQuXG4gICAgICAgIHZhciBwYXVzZWQgPSBzY2hlZHVsZXIuaXNUYXJnZXRQYXVzZWQodGhpcyk7XG5cbiAgICAgICAgc2NoZWR1bGVyLnNjaGVkdWxlKGNhbGxiYWNrLCB0aGlzLCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSwgcGF1c2VkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY2hlZHVsZXMgYSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHJ1bnMgb25seSBvbmNlLCB3aXRoIGEgZGVsYXkgb2YgMCBvciBsYXJnZXIuXG4gICAgICogISN6aCDosIPluqbkuIDkuKrlj6rov5DooYzkuIDmrKHnmoTlm57osIPlh73mlbDvvIzlj6/ku6XmjIflrpogMCDorqnlm57osIPlh73mlbDlnKjkuIvkuIDluKfnq4vljbPmiafooYzmiJbogIXlnKjkuIDlrprnmoTlu7bml7bkuYvlkI7miafooYzjgIJcbiAgICAgKiBAbWV0aG9kIHNjaGVkdWxlT25jZVxuICAgICAqIEBzZWUgY2MuTm9kZSNzY2hlZHVsZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrICBBIGZ1bmN0aW9uIHdyYXBwZWQgYXMgYSBzZWxlY3RvclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsYXk9MF0gIFRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHRoZSBmaXJzdCB0aWNrIHdpbGwgd2FpdCBiZWZvcmUgZXhlY3V0aW9uLiBVbml0OiBzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdGltZUNhbGxiYWNrID0gZnVuY3Rpb24gKGR0KSB7XG4gICAgICogICBjYy5sb2coXCJ0aW1lOiBcIiArIGR0KTtcbiAgICAgKiB9XG4gICAgICogdGhpcy5zY2hlZHVsZU9uY2UodGltZUNhbGxiYWNrLCAyKTtcbiAgICAgKi9cbiAgICBzY2hlZHVsZU9uY2UgKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGNhbGxiYWNrLCAwLCAwLCBkZWxheSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVW5zY2hlZHVsZXMgYSBjdXN0b20gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogISN6aCDlj5bmtojosIPluqbkuIDkuKroh6rlrprkuYnnmoTlm57osIPlh73mlbDjgIJcbiAgICAgKiBAbWV0aG9kIHVuc2NoZWR1bGVcbiAgICAgKiBAc2VlIGNjLk5vZGUjc2NoZWR1bGVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja19mbiAgQSBmdW5jdGlvbiB3cmFwcGVkIGFzIGEgc2VsZWN0b3JcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMudW5zY2hlZHVsZShfY2FsbGJhY2spO1xuICAgICAqL1xuICAgIHVuc2NoZWR1bGUgKGNhbGxiYWNrX2ZuKSB7XG4gICAgICAgIGlmICghY2FsbGJhY2tfZm4pXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZShjYWxsYmFja19mbiwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiB1bnNjaGVkdWxlIGFsbCBzY2hlZHVsZWQgY2FsbGJhY2sgZnVuY3Rpb25zOiBjdXN0b20gY2FsbGJhY2sgZnVuY3Rpb25zLCBhbmQgdGhlICd1cGRhdGUnIGNhbGxiYWNrIGZ1bmN0aW9uLjxici8+XG4gICAgICogQWN0aW9ucyBhcmUgbm90IGFmZmVjdGVkIGJ5IHRoaXMgbWV0aG9kLlxuICAgICAqICEjemgg5Y+W5raI6LCD5bqm5omA5pyJ5bey6LCD5bqm55qE5Zue6LCD5Ye95pWw77ya5a6a5Yi255qE5Zue6LCD5Ye95pWw5Lul5Y+KIGB1cGRhdGVgIOWbnuiwg+WHveaVsOOAguWKqOS9nOS4jeWPl+atpOaWueazleW9seWTjeOAglxuICAgICAqIEBtZXRob2QgdW5zY2hlZHVsZUFsbENhbGxiYWNrc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICovXG4gICAgdW5zY2hlZHVsZUFsbENhbGxiYWNrcyAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVBbGxGb3JUYXJnZXQodGhpcyk7XG4gICAgfSxcbn0pO1xuXG5Db21wb25lbnQuX3JlcXVpcmVDb21wb25lbnQgPSBudWxsO1xuQ29tcG9uZW50Ll9leGVjdXRpb25PcmRlciA9IDA7XG5pZiAoQ0NfRURJVE9SICYmIENDX1BSRVZJRVcpIENvbXBvbmVudC5fZGlzYWxsb3dNdWx0aXBsZSA9IG51bGw7XG5cbmlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuXG4gICAgLy8gSU5IRVJJVEFCTEUgU1RBVElDIE1FTUJFUlNcblxuICAgIENvbXBvbmVudC5fZXhlY3V0ZUluRWRpdE1vZGUgPSBmYWxzZTtcbiAgICBDb21wb25lbnQuX3BsYXlPbkZvY3VzID0gZmFsc2U7XG4gICAgQ29tcG9uZW50Ll9oZWxwID0gJyc7XG5cbiAgICAvLyBOT04tSU5IRVJJVEVEIFNUQVRJQyBNRU1CRVJTXG4gICAgLy8gKFR5cGVTY3JpcHQgMi4zIHdpbGwgc3RpbGwgaW5oZXJpdCB0aGVtLCBzbyBhbHdheXMgY2hlY2sgaGFzT3duUHJvcGVydHkgYmVmb3JlIHVzaW5nKVxuXG4gICAganMudmFsdWUoQ29tcG9uZW50LCAnX2luc3BlY3RvcicsICcnLCB0cnVlKTtcbiAgICBqcy52YWx1ZShDb21wb25lbnQsICdfaWNvbicsICcnLCB0cnVlKTtcblxuICAgIC8vIENPTVBPTkVOVCBIRUxQRVJTXG5cbiAgICBjYy5fY29tcG9uZW50TWVudUl0ZW1zID0gW107XG5cbiAgICBDb21wb25lbnQuX2FkZE1lbnVJdGVtID0gZnVuY3Rpb24gKGNscywgcGF0aCwgcHJpb3JpdHkpIHtcbiAgICAgICAgY2MuX2NvbXBvbmVudE1lbnVJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIGNvbXBvbmVudDogY2xzLFxuICAgICAgICAgICAgbWVudVBhdGg6IHBhdGgsXG4gICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHlcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cblxuLy8gV2UgbWFrZSB0aGlzIG5vbi1lbnVtZXJhYmxlLCB0byBwcmV2ZW50IGluaGVyaXRlZCBieSBzdWIgY2xhc3Nlcy5cbmpzLnZhbHVlKENvbXBvbmVudCwgJ19yZWdpc3RlckVkaXRvclByb3BzJywgZnVuY3Rpb24gKGNscywgcHJvcHMpIHtcbiAgICB2YXIgcmVxQ29tcCA9IHByb3BzLnJlcXVpcmVDb21wb25lbnQ7XG4gICAgaWYgKHJlcUNvbXApIHtcbiAgICAgICAgY2xzLl9yZXF1aXJlQ29tcG9uZW50ID0gcmVxQ29tcDtcbiAgICB9XG4gICAgdmFyIG9yZGVyID0gcHJvcHMuZXhlY3V0aW9uT3JkZXI7XG4gICAgaWYgKG9yZGVyICYmIHR5cGVvZiBvcmRlciA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY2xzLl9leGVjdXRpb25PcmRlciA9IG9yZGVyO1xuICAgIH1cbiAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19QUkVWSUVXKSAmJiAnZGlzYWxsb3dNdWx0aXBsZScgaW4gcHJvcHMpIHtcbiAgICAgICAgY2xzLl9kaXNhbGxvd011bHRpcGxlID0gY2xzO1xuICAgIH1cbiAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBjYy5qcy5nZXRDbGFzc05hbWUoY2xzKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZUluRWRpdE1vZGUnOlxuICAgICAgICAgICAgICAgICAgICBjbHMuX2V4ZWN1dGVJbkVkaXRNb2RlID0gISF2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGxheU9uRm9jdXMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2lsbEV4ZWN1dGVJbkVkaXRNb2RlID0gKCdleGVjdXRlSW5FZGl0TW9kZScgaW4gcHJvcHMpID8gcHJvcHMuZXhlY3V0ZUluRWRpdE1vZGUgOiBjbHMuX2V4ZWN1dGVJbkVkaXRNb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbGxFeGVjdXRlSW5FZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNscy5fcGxheU9uRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDEsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5zcGVjdG9yJzpcbiAgICAgICAgICAgICAgICAgICAganMudmFsdWUoY2xzLCAnX2luc3BlY3RvcicsIHZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIGpzLnZhbHVlKGNscywgJ19pY29uJywgdmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtZW51JzpcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50Ll9hZGRNZW51SXRlbShjbHMsIHZhbCwgcHJvcHMubWVudVByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlQ29tcG9uZW50JzpcbiAgICAgICAgICAgICAgICBjYXNlICdleGVjdXRpb25PcmRlcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnZGlzYWxsb3dNdWx0aXBsZSc6XG4gICAgICAgICAgICAgICAgICAgIC8vIHNraXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgICAgICAgICAgICAgICBjbHMuX2hlbHAgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDM2MDIsIGtleSwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuX19zY3JpcHRVdWlkID0gJyc7XG5cbmNjLkNvbXBvbmVudCA9IG1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=