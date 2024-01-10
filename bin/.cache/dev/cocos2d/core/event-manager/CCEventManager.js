
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCEventManager.js';
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
var js = require('../platform/js');

require('./CCEventListener');

var ListenerID = cc.EventListener.ListenerID;

var _EventListenerVector = function _EventListenerVector() {
  this._fixedListeners = [];
  this._sceneGraphListeners = [];
  this.gt0Index = 0;
};

_EventListenerVector.prototype = {
  constructor: _EventListenerVector,
  size: function size() {
    return this._fixedListeners.length + this._sceneGraphListeners.length;
  },
  empty: function empty() {
    return this._fixedListeners.length === 0 && this._sceneGraphListeners.length === 0;
  },
  push: function push(listener) {
    if (listener._getFixedPriority() === 0) this._sceneGraphListeners.push(listener);else this._fixedListeners.push(listener);
  },
  clearSceneGraphListeners: function clearSceneGraphListeners() {
    this._sceneGraphListeners.length = 0;
  },
  clearFixedListeners: function clearFixedListeners() {
    this._fixedListeners.length = 0;
  },
  clear: function clear() {
    this._sceneGraphListeners.length = 0;
    this._fixedListeners.length = 0;
  },
  getFixedPriorityListeners: function getFixedPriorityListeners() {
    return this._fixedListeners;
  },
  getSceneGraphPriorityListeners: function getSceneGraphPriorityListeners() {
    return this._sceneGraphListeners;
  }
};

var __getListenerID = function __getListenerID(event) {
  var eventType = cc.Event,
      type = event.type;
  if (type === eventType.ACCELERATION) return ListenerID.ACCELERATION;
  if (type === eventType.KEYBOARD) return ListenerID.KEYBOARD;
  if (type.startsWith(eventType.MOUSE)) return ListenerID.MOUSE;

  if (type.startsWith(eventType.TOUCH)) {
    // Touch listener is very special, it contains two kinds of listeners, EventListenerTouchOneByOne and EventListenerTouchAllAtOnce.
    // return UNKNOWN instead.
    cc.logID(2000);
  }

  return "";
};
/**
 * !#en
 * This class has been deprecated, please use cc.systemEvent or cc.EventTarget instead. See [Listen to and launch events](../../../manual/en/scripting/events.html) for details.<br>
 * <br>
 * cc.eventManager is a singleton object which manages event listener subscriptions and event dispatching.
 * The EventListener list is managed in such way so that event listeners can be added and removed
 * while events are being dispatched.
 *
 * !#zh
 * 该类已废弃，请使用 cc.systemEvent 或 cc.EventTarget 代替，详见 [监听和发射事件](../../../manual/zh/scripting/events.html)。<br>
 * <br>
 * 事件管理器，它主要管理事件监听器注册和派发系统事件。
 *
 * @class eventManager
 * @static
 * @example {@link cocos2d/core/event-manager/CCEventManager/addListener.js}
 * @deprecated
 */


var eventManager = {
  //Priority dirty flag
  DIRTY_NONE: 0,
  DIRTY_FIXED_PRIORITY: 1 << 0,
  DIRTY_SCENE_GRAPH_PRIORITY: 1 << 1,
  DIRTY_ALL: 3,
  _listenersMap: {},
  _priorityDirtyFlagMap: {},
  _nodeListenersMap: {},
  _toAddedListeners: [],
  _toRemovedListeners: [],
  _dirtyListeners: {},
  _inDispatch: 0,
  _isEnabled: false,
  _currentTouch: null,
  _currentTouchListener: null,
  _internalCustomListenerIDs: [],
  _setDirtyForNode: function _setDirtyForNode(node) {
    // Mark the node dirty only when there is an event listener associated with it.
    var selListeners = this._nodeListenersMap[node._id];

    if (selListeners !== undefined) {
      for (var j = 0, len = selListeners.length; j < len; j++) {
        var selListener = selListeners[j];

        var listenerID = selListener._getListenerID();

        if (this._dirtyListeners[listenerID] == null) this._dirtyListeners[listenerID] = true;
      }
    }

    if (node.childrenCount > 0) {
      var children = node._children;

      for (var i = 0, _len = children.length; i < _len; i++) {
        this._setDirtyForNode(children[i]);
      }
    }
  },

  /**
   * !#en Pauses all listeners which are associated the specified target.
   * !#zh 暂停传入的 node 相关的所有监听器的事件响应。
   * @method pauseTarget
   * @param {Node} node
   * @param {Boolean} [recursive=false]
   */
  pauseTarget: function pauseTarget(node, recursive) {
    if (!(node instanceof cc._BaseNode)) {
      cc.warnID(3506);
      return;
    }

    var listeners = this._nodeListenersMap[node._id],
        i,
        len;

    if (listeners) {
      for (i = 0, len = listeners.length; i < len; i++) {
        listeners[i]._setPaused(true);
      }
    }

    if (recursive === true) {
      var locChildren = node._children;

      for (i = 0, len = locChildren ? locChildren.length : 0; i < len; i++) {
        this.pauseTarget(locChildren[i], true);
      }
    }
  },

  /**
   * !#en Resumes all listeners which are associated the specified target.
   * !#zh 恢复传入的 node 相关的所有监听器的事件响应。
   * @method resumeTarget
   * @param {Node} node
   * @param {Boolean} [recursive=false]
   */
  resumeTarget: function resumeTarget(node, recursive) {
    if (!(node instanceof cc._BaseNode)) {
      cc.warnID(3506);
      return;
    }

    var listeners = this._nodeListenersMap[node._id],
        i,
        len;

    if (listeners) {
      for (i = 0, len = listeners.length; i < len; i++) {
        listeners[i]._setPaused(false);
      }
    }

    this._setDirtyForNode(node);

    if (recursive === true) {
      var locChildren = node._children;

      for (i = 0, len = locChildren ? locChildren.length : 0; i < len; i++) {
        this.resumeTarget(locChildren[i], true);
      }
    }
  },
  _addListener: function _addListener(listener) {
    if (this._inDispatch === 0) this._forceAddEventListener(listener);else this._toAddedListeners.push(listener);
  },
  _forceAddEventListener: function _forceAddEventListener(listener) {
    var listenerID = listener._getListenerID();

    var listeners = this._listenersMap[listenerID];

    if (!listeners) {
      listeners = new _EventListenerVector();
      this._listenersMap[listenerID] = listeners;
    }

    listeners.push(listener);

    if (listener._getFixedPriority() === 0) {
      this._setDirty(listenerID, this.DIRTY_SCENE_GRAPH_PRIORITY);

      var node = listener._getSceneGraphPriority();

      if (node === null) cc.logID(3507);

      this._associateNodeAndEventListener(node, listener);

      if (node.activeInHierarchy) this.resumeTarget(node);
    } else this._setDirty(listenerID, this.DIRTY_FIXED_PRIORITY);
  },
  _getListeners: function _getListeners(listenerID) {
    return this._listenersMap[listenerID];
  },
  _updateDirtyFlagForSceneGraph: function _updateDirtyFlagForSceneGraph() {
    var locDirtyListeners = this._dirtyListeners;

    for (var selKey in locDirtyListeners) {
      this._setDirty(selKey, this.DIRTY_SCENE_GRAPH_PRIORITY);
    }

    this._dirtyListeners = {};
  },
  _removeAllListenersInVector: function _removeAllListenersInVector(listenerVector) {
    if (!listenerVector) return;
    var selListener;

    for (var i = listenerVector.length - 1; i >= 0; i--) {
      selListener = listenerVector[i];

      selListener._setRegistered(false);

      if (selListener._getSceneGraphPriority() != null) {
        this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);

        selListener._setSceneGraphPriority(null); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.

      }

      if (this._inDispatch === 0) cc.js.array.removeAt(listenerVector, i);
    }
  },
  _removeListenersForListenerID: function _removeListenersForListenerID(listenerID) {
    var listeners = this._listenersMap[listenerID],
        i;

    if (listeners) {
      var fixedPriorityListeners = listeners.getFixedPriorityListeners();
      var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();

      this._removeAllListenersInVector(sceneGraphPriorityListeners);

      this._removeAllListenersInVector(fixedPriorityListeners); // Remove the dirty flag according the 'listenerID'.
      // No need to check whether the dispatcher is dispatching event.


      delete this._priorityDirtyFlagMap[listenerID];

      if (!this._inDispatch) {
        listeners.clear();
        delete this._listenersMap[listenerID];
      }
    }

    var locToAddedListeners = this._toAddedListeners,
        listener;

    for (i = locToAddedListeners.length - 1; i >= 0; i--) {
      listener = locToAddedListeners[i];
      if (listener && listener._getListenerID() === listenerID) cc.js.array.removeAt(locToAddedListeners, i);
    }
  },
  _sortEventListeners: function _sortEventListeners(listenerID) {
    var dirtyFlag = this.DIRTY_NONE,
        locFlagMap = this._priorityDirtyFlagMap;
    if (locFlagMap[listenerID]) dirtyFlag = locFlagMap[listenerID];

    if (dirtyFlag !== this.DIRTY_NONE) {
      // Clear the dirty flag first, if `rootNode` is null, then set its dirty flag of scene graph priority
      locFlagMap[listenerID] = this.DIRTY_NONE;
      if (dirtyFlag & this.DIRTY_FIXED_PRIORITY) this._sortListenersOfFixedPriority(listenerID);

      if (dirtyFlag & this.DIRTY_SCENE_GRAPH_PRIORITY) {
        var rootEntity = cc.director.getScene();
        if (rootEntity) this._sortListenersOfSceneGraphPriority(listenerID);
      }
    }
  },
  _sortListenersOfSceneGraphPriority: function _sortListenersOfSceneGraphPriority(listenerID) {
    var listeners = this._getListeners(listenerID);

    if (!listeners) return;
    var sceneGraphListener = listeners.getSceneGraphPriorityListeners();
    if (!sceneGraphListener || sceneGraphListener.length === 0) return; // After sort: priority < 0, > 0

    listeners.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes);
  },
  _sortEventListenersOfSceneGraphPriorityDes: function _sortEventListenersOfSceneGraphPriorityDes(l1, l2) {
    var node1 = l1._getSceneGraphPriority(),
        node2 = l2._getSceneGraphPriority();

    if (!l2 || !node2 || !node2._activeInHierarchy || node2._parent === null) return -1;else if (!l1 || !node1 || !node1._activeInHierarchy || node1._parent === null) return 1;
    var p1 = node1,
        p2 = node2,
        ex = false;

    while (p1._parent._id !== p2._parent._id) {
      p1 = p1._parent._parent === null ? (ex = true) && node2 : p1._parent;
      p2 = p2._parent._parent === null ? (ex = true) && node1 : p2._parent;
    }

    if (p1._id === p2._id) {
      if (p1._id === node2._id) return -1;
      if (p1._id === node1._id) return 1;
    }

    return ex ? p1._localZOrder - p2._localZOrder : p2._localZOrder - p1._localZOrder;
  },
  _sortListenersOfFixedPriority: function _sortListenersOfFixedPriority(listenerID) {
    var listeners = this._listenersMap[listenerID];
    if (!listeners) return;
    var fixedListeners = listeners.getFixedPriorityListeners();
    if (!fixedListeners || fixedListeners.length === 0) return; // After sort: priority < 0, > 0

    fixedListeners.sort(this._sortListenersOfFixedPriorityAsc); // FIXME: Should use binary search

    var index = 0;

    for (var len = fixedListeners.length; index < len;) {
      if (fixedListeners[index]._getFixedPriority() >= 0) break;
      ++index;
    }

    listeners.gt0Index = index;
  },
  _sortListenersOfFixedPriorityAsc: function _sortListenersOfFixedPriorityAsc(l1, l2) {
    return l1._getFixedPriority() - l2._getFixedPriority();
  },
  _onUpdateListeners: function _onUpdateListeners(listeners) {
    var fixedPriorityListeners = listeners.getFixedPriorityListeners();
    var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
    var i,
        selListener,
        idx,
        toRemovedListeners = this._toRemovedListeners;

    if (sceneGraphPriorityListeners) {
      for (i = sceneGraphPriorityListeners.length - 1; i >= 0; i--) {
        selListener = sceneGraphPriorityListeners[i];

        if (!selListener._isRegistered()) {
          cc.js.array.removeAt(sceneGraphPriorityListeners, i); // if item in toRemove list, remove it from the list

          idx = toRemovedListeners.indexOf(selListener);
          if (idx !== -1) toRemovedListeners.splice(idx, 1);
        }
      }
    }

    if (fixedPriorityListeners) {
      for (i = fixedPriorityListeners.length - 1; i >= 0; i--) {
        selListener = fixedPriorityListeners[i];

        if (!selListener._isRegistered()) {
          cc.js.array.removeAt(fixedPriorityListeners, i); // if item in toRemove list, remove it from the list

          idx = toRemovedListeners.indexOf(selListener);
          if (idx !== -1) toRemovedListeners.splice(idx, 1);
        }
      }
    }

    if (sceneGraphPriorityListeners && sceneGraphPriorityListeners.length === 0) listeners.clearSceneGraphListeners();
    if (fixedPriorityListeners && fixedPriorityListeners.length === 0) listeners.clearFixedListeners();
  },
  frameUpdateListeners: function frameUpdateListeners() {
    var locListenersMap = this._listenersMap,
        locPriorityDirtyFlagMap = this._priorityDirtyFlagMap;

    for (var selKey in locListenersMap) {
      if (locListenersMap[selKey].empty()) {
        delete locPriorityDirtyFlagMap[selKey];
        delete locListenersMap[selKey];
      }
    }

    var locToAddedListeners = this._toAddedListeners;

    if (locToAddedListeners.length !== 0) {
      for (var i = 0, len = locToAddedListeners.length; i < len; i++) {
        this._forceAddEventListener(locToAddedListeners[i]);
      }

      locToAddedListeners.length = 0;
    }

    if (this._toRemovedListeners.length !== 0) {
      this._cleanToRemovedListeners();
    }
  },
  _updateTouchListeners: function _updateTouchListeners(event) {
    var locInDispatch = this._inDispatch;
    cc.assertID(locInDispatch > 0, 3508);
    if (locInDispatch > 1) return;
    var listeners;
    listeners = this._listenersMap[ListenerID.TOUCH_ONE_BY_ONE];

    if (listeners) {
      this._onUpdateListeners(listeners);
    }

    listeners = this._listenersMap[ListenerID.TOUCH_ALL_AT_ONCE];

    if (listeners) {
      this._onUpdateListeners(listeners);
    }

    cc.assertID(locInDispatch === 1, 3509);
    var locToAddedListeners = this._toAddedListeners;

    if (locToAddedListeners.length !== 0) {
      for (var i = 0, len = locToAddedListeners.length; i < len; i++) {
        this._forceAddEventListener(locToAddedListeners[i]);
      }

      this._toAddedListeners.length = 0;
    }

    if (this._toRemovedListeners.length !== 0) {
      this._cleanToRemovedListeners();
    }
  },
  //Remove all listeners in _toRemoveListeners list and cleanup
  _cleanToRemovedListeners: function _cleanToRemovedListeners() {
    var toRemovedListeners = this._toRemovedListeners;

    for (var i = 0; i < toRemovedListeners.length; i++) {
      var selListener = toRemovedListeners[i];

      var listeners = this._listenersMap[selListener._getListenerID()];

      if (!listeners) continue;
      var idx,
          fixedPriorityListeners = listeners.getFixedPriorityListeners(),
          sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();

      if (sceneGraphPriorityListeners) {
        idx = sceneGraphPriorityListeners.indexOf(selListener);

        if (idx !== -1) {
          sceneGraphPriorityListeners.splice(idx, 1);
        }
      }

      if (fixedPriorityListeners) {
        idx = fixedPriorityListeners.indexOf(selListener);

        if (idx !== -1) {
          fixedPriorityListeners.splice(idx, 1);
        }
      }
    }

    toRemovedListeners.length = 0;
  },
  _onTouchEventCallback: function _onTouchEventCallback(listener, argsObj) {
    // Skip if the listener was removed.
    if (!listener._isRegistered()) return false;
    var event = argsObj.event,
        selTouch = event.currentTouch;
    event.currentTarget = listener._node;
    var isClaimed = false,
        removedIdx;
    var getCode = event.getEventCode(),
        EventTouch = cc.Event.EventTouch;

    if (getCode === EventTouch.BEGAN) {
      if (!cc.macro.ENABLE_MULTI_TOUCH && eventManager._currentTouch) {
        var node = eventManager._currentTouchListener._node;

        if (node && node.activeInHierarchy) {
          return false;
        }
      }

      if (listener.onTouchBegan) {
        isClaimed = listener.onTouchBegan(selTouch, event);

        if (isClaimed && listener._registered) {
          listener._claimedTouches.push(selTouch);

          eventManager._currentTouchListener = listener;
          eventManager._currentTouch = selTouch;
        }
      }
    } else if (listener._claimedTouches.length > 0 && (removedIdx = listener._claimedTouches.indexOf(selTouch)) !== -1) {
      isClaimed = true;

      if (!cc.macro.ENABLE_MULTI_TOUCH && eventManager._currentTouch && eventManager._currentTouch !== selTouch) {
        return false;
      }

      if (getCode === EventTouch.MOVED && listener.onTouchMoved) {
        listener.onTouchMoved(selTouch, event);
      } else if (getCode === EventTouch.ENDED) {
        if (listener.onTouchEnded) listener.onTouchEnded(selTouch, event);
        if (listener._registered) listener._claimedTouches.splice(removedIdx, 1);

        eventManager._clearCurTouch();
      } else if (getCode === EventTouch.CANCELED) {
        if (listener.onTouchCancelled) listener.onTouchCancelled(selTouch, event);
        if (listener._registered) listener._claimedTouches.splice(removedIdx, 1);

        eventManager._clearCurTouch();
      }
    } // If the event was stopped, return directly.


    if (event.isStopped()) {
      eventManager._updateTouchListeners(event);

      return true;
    }

    if (isClaimed && listener.swallowTouches) {
      if (argsObj.needsMutableSet) argsObj.touches.splice(selTouch, 1);
      return true;
    }

    return false;
  },
  _dispatchTouchEvent: function _dispatchTouchEvent(event) {
    this._sortEventListeners(ListenerID.TOUCH_ONE_BY_ONE);

    this._sortEventListeners(ListenerID.TOUCH_ALL_AT_ONCE);

    var oneByOneListeners = this._getListeners(ListenerID.TOUCH_ONE_BY_ONE);

    var allAtOnceListeners = this._getListeners(ListenerID.TOUCH_ALL_AT_ONCE); // If there aren't any touch listeners, return directly.


    if (null === oneByOneListeners && null === allAtOnceListeners) return;
    var originalTouches = event.getTouches(),
        mutableTouches = cc.js.array.copy(originalTouches);
    var oneByOneArgsObj = {
      event: event,
      needsMutableSet: oneByOneListeners && allAtOnceListeners,
      touches: mutableTouches,
      selTouch: null
    }; //
    // process the target handlers 1st
    //

    if (oneByOneListeners) {
      for (var i = 0; i < originalTouches.length; i++) {
        event.currentTouch = originalTouches[i];
        event._propagationStopped = event._propagationImmediateStopped = false;

        this._dispatchEventToListeners(oneByOneListeners, this._onTouchEventCallback, oneByOneArgsObj);
      }
    } //
    // process standard handlers 2nd
    //


    if (allAtOnceListeners && mutableTouches.length > 0) {
      this._dispatchEventToListeners(allAtOnceListeners, this._onTouchesEventCallback, {
        event: event,
        touches: mutableTouches
      });

      if (event.isStopped()) return;
    }

    this._updateTouchListeners(event);
  },
  _onTouchesEventCallback: function _onTouchesEventCallback(listener, callbackParams) {
    // Skip if the listener was removed.
    if (!listener._registered) return false;
    var EventTouch = cc.Event.EventTouch,
        event = callbackParams.event,
        touches = callbackParams.touches,
        getCode = event.getEventCode();
    event.currentTarget = listener._node;
    if (getCode === EventTouch.BEGAN && listener.onTouchesBegan) listener.onTouchesBegan(touches, event);else if (getCode === EventTouch.MOVED && listener.onTouchesMoved) listener.onTouchesMoved(touches, event);else if (getCode === EventTouch.ENDED && listener.onTouchesEnded) listener.onTouchesEnded(touches, event);else if (getCode === EventTouch.CANCELED && listener.onTouchesCancelled) listener.onTouchesCancelled(touches, event); // If the event was stopped, return directly.

    if (event.isStopped()) {
      eventManager._updateTouchListeners(event);

      return true;
    }

    return false;
  },
  _associateNodeAndEventListener: function _associateNodeAndEventListener(node, listener) {
    var listeners = this._nodeListenersMap[node._id];

    if (!listeners) {
      listeners = [];
      this._nodeListenersMap[node._id] = listeners;
    }

    listeners.push(listener);
  },
  _dissociateNodeAndEventListener: function _dissociateNodeAndEventListener(node, listener) {
    var listeners = this._nodeListenersMap[node._id];

    if (listeners) {
      cc.js.array.remove(listeners, listener);
      if (listeners.length === 0) delete this._nodeListenersMap[node._id];
    }
  },
  _dispatchEventToListeners: function _dispatchEventToListeners(listeners, onEvent, eventOrArgs) {
    var shouldStopPropagation = false;
    var fixedPriorityListeners = listeners.getFixedPriorityListeners();
    var sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
    var i = 0,
        j,
        selListener;

    if (fixedPriorityListeners) {
      // priority < 0
      if (fixedPriorityListeners.length !== 0) {
        for (; i < listeners.gt0Index; ++i) {
          selListener = fixedPriorityListeners[i];

          if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
            shouldStopPropagation = true;
            break;
          }
        }
      }
    }

    if (sceneGraphPriorityListeners && !shouldStopPropagation) {
      // priority == 0, scene graph priority
      for (j = 0; j < sceneGraphPriorityListeners.length; j++) {
        selListener = sceneGraphPriorityListeners[j];

        if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
          shouldStopPropagation = true;
          break;
        }
      }
    }

    if (fixedPriorityListeners && !shouldStopPropagation) {
      // priority > 0
      for (; i < fixedPriorityListeners.length; ++i) {
        selListener = fixedPriorityListeners[i];

        if (selListener.isEnabled() && !selListener._isPaused() && selListener._isRegistered() && onEvent(selListener, eventOrArgs)) {
          shouldStopPropagation = true;
          break;
        }
      }
    }
  },
  _setDirty: function _setDirty(listenerID, flag) {
    var locDirtyFlagMap = this._priorityDirtyFlagMap;
    if (locDirtyFlagMap[listenerID] == null) locDirtyFlagMap[listenerID] = flag;else locDirtyFlagMap[listenerID] = flag | locDirtyFlagMap[listenerID];
  },
  _sortNumberAsc: function _sortNumberAsc(a, b) {
    return a - b;
  },

  /**
   * !#en Query whether the specified event listener id has been added.
   * !#zh 查询指定的事件 ID 是否存在
   * @method hasEventListener
   * @param {String|Number} listenerID - The listener id.
   * @return {Boolean} true or false
   */
  hasEventListener: function hasEventListener(listenerID) {
    return !!this._getListeners(listenerID);
  },

  /**
   * !#en
   * <p>
   * Adds a event listener for a specified event.<br/>
   * if the parameter "nodeOrPriority" is a node,
   * it means to add a event listener for a specified event with the priority of scene graph.<br/>
   * if the parameter "nodeOrPriority" is a Number,
   * it means to add a event listener for a specified event with the fixed priority.<br/>
   * </p>
   * !#zh
   * 将事件监听器添加到事件管理器中。<br/>
   * 如果参数 “nodeOrPriority” 是节点，优先级由 node 的渲染顺序决定，显示在上层的节点将优先收到事件。<br/>
   * 如果参数 “nodeOrPriority” 是数字，优先级则固定为该参数的数值，数字越小，优先级越高。<br/>
   *
   * @method addListener
   * @param {EventListener|Object} listener - The listener of a specified event or a object of some event parameters.
   * @param {Node|Number} nodeOrPriority - The priority of the listener is based on the draw order of this node or fixedPriority The fixed priority of the listener.
   * @note  The priority of scene graph will be fixed value 0. So the order of listener item in the vector will be ' <0, scene graph (0 priority), >0'.
   *         A lower priority will be called before the ones that have a higher value. 0 priority is forbidden for fixed priority since it's used for scene graph based priority.
   *         The listener must be a cc.EventListener object when adding a fixed priority listener, because we can't remove a fixed priority listener without the listener handler,
   *         except calls removeAllListeners().
   * @return {EventListener} Return the listener. Needed in order to remove the event from the dispatcher.
   */
  addListener: function addListener(listener, nodeOrPriority) {
    cc.assertID(listener && nodeOrPriority, 3503);

    if (!(cc.js.isNumber(nodeOrPriority) || nodeOrPriority instanceof cc._BaseNode)) {
      cc.warnID(3506);
      return;
    }

    if (!(listener instanceof cc.EventListener)) {
      cc.assertID(!cc.js.isNumber(nodeOrPriority), 3504);
      listener = cc.EventListener.create(listener);
    } else {
      if (listener._isRegistered()) {
        cc.logID(3505);
        return;
      }
    }

    if (!listener.checkAvailable()) return;

    if (cc.js.isNumber(nodeOrPriority)) {
      if (nodeOrPriority === 0) {
        cc.logID(3500);
        return;
      }

      listener._setSceneGraphPriority(null);

      listener._setFixedPriority(nodeOrPriority);

      listener._setRegistered(true);

      listener._setPaused(false);

      this._addListener(listener);
    } else {
      listener._setSceneGraphPriority(nodeOrPriority);

      listener._setFixedPriority(0);

      listener._setRegistered(true);

      this._addListener(listener);
    }

    return listener;
  },

  /*
   * !#en Adds a Custom event listener. It will use a fixed priority of 1.
   * !#zh 向事件管理器添加一个自定义事件监听器。
   * @method addCustomListener
   * @param {String} eventName
   * @param {Function} callback
   * @return {EventListener} the generated event. Needed in order to remove the event from the dispatcher
   */
  addCustomListener: function addCustomListener(eventName, callback) {
    var listener = new cc.EventListener.create({
      event: cc.EventListener.CUSTOM,
      eventName: eventName,
      callback: callback
    });
    this.addListener(listener, 1);
    return listener;
  },

  /**
   * !#en Remove a listener.
   * !#zh 移除一个已添加的监听器。
   * @method removeListener
   * @param {EventListener} listener - an event listener or a registered node target
   * @example {@link cocos2d/core/event-manager/CCEventManager/removeListener.js}
   */
  removeListener: function removeListener(listener) {
    if (listener == null) return;
    var isFound,
        locListener = this._listenersMap;

    for (var selKey in locListener) {
      var listeners = locListener[selKey];
      var fixedPriorityListeners = listeners.getFixedPriorityListeners(),
          sceneGraphPriorityListeners = listeners.getSceneGraphPriorityListeners();
      isFound = this._removeListenerInVector(sceneGraphPriorityListeners, listener);

      if (isFound) {
        // fixed #4160: Dirty flag need to be updated after listeners were removed.
        this._setDirty(listener._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY);
      } else {
        isFound = this._removeListenerInVector(fixedPriorityListeners, listener);
        if (isFound) this._setDirty(listener._getListenerID(), this.DIRTY_FIXED_PRIORITY);
      }

      if (listeners.empty()) {
        delete this._priorityDirtyFlagMap[listener._getListenerID()];
        delete locListener[selKey];
      }

      if (isFound) break;
    }

    if (!isFound) {
      var locToAddedListeners = this._toAddedListeners;

      for (var i = locToAddedListeners.length - 1; i >= 0; i--) {
        var selListener = locToAddedListeners[i];

        if (selListener === listener) {
          cc.js.array.removeAt(locToAddedListeners, i);

          selListener._setRegistered(false);

          break;
        }
      }
    }

    this._currentTouchListener === listener && this._clearCurTouch();
  },
  _clearCurTouch: function _clearCurTouch() {
    this._currentTouchListener = null;
    this._currentTouch = null;
  },
  _removeListenerInCallback: function _removeListenerInCallback(listeners, callback) {
    if (listeners == null) return false;

    for (var i = listeners.length - 1; i >= 0; i--) {
      var selListener = listeners[i];

      if (selListener._onCustomEvent === callback || selListener._onEvent === callback) {
        selListener._setRegistered(false);

        if (selListener._getSceneGraphPriority() != null) {
          this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);

          selListener._setSceneGraphPriority(null); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.

        }

        if (this._inDispatch === 0) cc.js.array.removeAt(listeners, i);else this._toRemovedListeners.push(selListener);
        return true;
      }
    }

    return false;
  },
  _removeListenerInVector: function _removeListenerInVector(listeners, listener) {
    if (listeners == null) return false;

    for (var i = listeners.length - 1; i >= 0; i--) {
      var selListener = listeners[i];

      if (selListener === listener) {
        selListener._setRegistered(false);

        if (selListener._getSceneGraphPriority() != null) {
          this._dissociateNodeAndEventListener(selListener._getSceneGraphPriority(), selListener);

          selListener._setSceneGraphPriority(null); // NULL out the node pointer so we don't have any dangling pointers to destroyed nodes.

        }

        if (this._inDispatch === 0) cc.js.array.removeAt(listeners, i);else this._toRemovedListeners.push(selListener);
        return true;
      }
    }

    return false;
  },

  /**
   * !#en Removes all listeners with the same event listener type or removes all listeners of a node.
   * !#zh
   * 移除注册到 eventManager 中指定类型的所有事件监听器。<br/>
   * 1. 如果传入的第一个参数类型是 Node，那么事件管理器将移除与该对象相关的所有事件监听器。
   * （如果第二参数 recursive 是 true 的话，就会连同该对象的子控件上所有的事件监听器也一并移除）<br/>
   * 2. 如果传入的第一个参数类型是 Number（该类型 EventListener 中定义的事件类型），
   * 那么事件管理器将移除该类型的所有事件监听器。<br/>
   *
   * 下列是目前存在监听器类型：       <br/>
   * cc.EventListener.UNKNOWN       <br/>
   * cc.EventListener.KEYBOARD      <br/>
   * cc.EventListener.ACCELERATION，<br/>
   *
   * @method removeListeners
   * @param {Number|Node} listenerType - listenerType or a node
   * @param {Boolean} [recursive=false]
   */
  removeListeners: function removeListeners(listenerType, recursive) {
    var i,
        _t = this;

    if (!(cc.js.isNumber(listenerType) || listenerType instanceof cc._BaseNode)) {
      cc.warnID(3506);
      return;
    }

    if (listenerType._id !== undefined) {
      // Ensure the node is removed from these immediately also.
      // Don't want any dangling pointers or the possibility of dealing with deleted objects..
      var listeners = _t._nodeListenersMap[listenerType._id],
          i;

      if (listeners) {
        var listenersCopy = cc.js.array.copy(listeners);

        for (i = 0; i < listenersCopy.length; i++) {
          _t.removeListener(listenersCopy[i]);
        }

        delete _t._nodeListenersMap[listenerType._id];
      } // Bug fix: ensure there are no references to the node in the list of listeners to be added.
      // If we find any listeners associated with the destroyed node in this list then remove them.
      // This is to catch the scenario where the node gets destroyed before it's listener
      // is added into the event dispatcher fully. This could happen if a node registers a listener
      // and gets destroyed while we are dispatching an event (touch etc.)


      var locToAddedListeners = _t._toAddedListeners;

      for (i = 0; i < locToAddedListeners.length;) {
        var listener = locToAddedListeners[i];

        if (listener._getSceneGraphPriority() === listenerType) {
          listener._setSceneGraphPriority(null); // Ensure no dangling ptr to the target node.


          listener._setRegistered(false);

          locToAddedListeners.splice(i, 1);
        } else ++i;
      }

      if (recursive === true) {
        var locChildren = listenerType.children,
            len;

        for (i = 0, len = locChildren.length; i < len; i++) {
          _t.removeListeners(locChildren[i], true);
        }
      }
    } else {
      if (listenerType === cc.EventListener.TOUCH_ONE_BY_ONE) _t._removeListenersForListenerID(ListenerID.TOUCH_ONE_BY_ONE);else if (listenerType === cc.EventListener.TOUCH_ALL_AT_ONCE) _t._removeListenersForListenerID(ListenerID.TOUCH_ALL_AT_ONCE);else if (listenerType === cc.EventListener.MOUSE) _t._removeListenersForListenerID(ListenerID.MOUSE);else if (listenerType === cc.EventListener.ACCELERATION) _t._removeListenersForListenerID(ListenerID.ACCELERATION);else if (listenerType === cc.EventListener.KEYBOARD) _t._removeListenersForListenerID(ListenerID.KEYBOARD);else cc.logID(3501);
    }
  },

  /*
   * !#en Removes all custom listeners with the same event name.
   * !#zh 移除同一事件名的自定义事件监听器。
   * @method removeCustomListeners
   * @param {String} customEventName
   */
  removeCustomListeners: function removeCustomListeners(customEventName) {
    this._removeListenersForListenerID(customEventName);
  },

  /**
   * !#en Removes all listeners
   * !#zh 移除所有事件监听器。
   * @method removeAllListeners
   */
  removeAllListeners: function removeAllListeners() {
    var locListeners = this._listenersMap,
        locInternalCustomEventIDs = this._internalCustomListenerIDs;

    for (var selKey in locListeners) {
      if (locInternalCustomEventIDs.indexOf(selKey) === -1) this._removeListenersForListenerID(selKey);
    }
  },

  /**
   * !#en Sets listener's priority with fixed value.
   * !#zh 设置 FixedPriority 类型监听器的优先级。
   * @method setPriority
   * @param {EventListener} listener
   * @param {Number} fixedPriority
   */
  setPriority: function setPriority(listener, fixedPriority) {
    if (listener == null) return;
    var locListeners = this._listenersMap;

    for (var selKey in locListeners) {
      var selListeners = locListeners[selKey];
      var fixedPriorityListeners = selListeners.getFixedPriorityListeners();

      if (fixedPriorityListeners) {
        var found = fixedPriorityListeners.indexOf(listener);

        if (found !== -1) {
          if (listener._getSceneGraphPriority() != null) cc.logID(3502);

          if (listener._getFixedPriority() !== fixedPriority) {
            listener._setFixedPriority(fixedPriority);

            this._setDirty(listener._getListenerID(), this.DIRTY_FIXED_PRIORITY);
          }

          return;
        }
      }
    }
  },

  /**
   * !#en Whether to enable dispatching events
   * !#zh 启用或禁用事件管理器，禁用后不会分发任何事件。
   * @method setEnabled
   * @param {Boolean} enabled
   */
  setEnabled: function setEnabled(enabled) {
    this._isEnabled = enabled;
  },

  /**
   * !#en Checks whether dispatching events is enabled
   * !#zh 检测事件管理器是否启用。
   * @method isEnabled
   * @returns {Boolean}
   */
  isEnabled: function isEnabled() {
    return this._isEnabled;
  },

  /*
   * !#en Dispatches the event, also removes all EventListeners marked for deletion from the event dispatcher list.
   * !#zh 分发事件。
   * @method dispatchEvent
   * @param {Event} event
   */
  dispatchEvent: function dispatchEvent(event) {
    if (!this._isEnabled) return;

    this._updateDirtyFlagForSceneGraph();

    this._inDispatch++;

    if (!event || !event.getType) {
      cc.errorID(3511);
      return;
    }

    if (event.getType().startsWith(cc.Event.TOUCH)) {
      this._dispatchTouchEvent(event);

      this._inDispatch--;
      return;
    }

    var listenerID = __getListenerID(event);

    this._sortEventListeners(listenerID);

    var selListeners = this._listenersMap[listenerID];

    if (selListeners != null) {
      this._dispatchEventToListeners(selListeners, this._onListenerCallback, event);

      this._onUpdateListeners(selListeners);
    }

    this._inDispatch--;
  },
  _onListenerCallback: function _onListenerCallback(listener, event) {
    event.currentTarget = listener._target;

    listener._onEvent(event);

    return event.isStopped();
  },

  /*
   * !#en Dispatches a Custom Event with a event name an optional user data
   * !#zh 分发自定义事件。
   * @method dispatchCustomEvent
   * @param {String} eventName
   * @param {*} optionalUserData
   */
  dispatchCustomEvent: function dispatchCustomEvent(eventName, optionalUserData) {
    var ev = new cc.Event.EventCustom(eventName);
    ev.setUserData(optionalUserData);
    this.dispatchEvent(ev);
  }
};
js.get(cc, 'eventManager', function () {
  cc.errorID(1405, 'cc.eventManager', 'cc.EventTarget or cc.systemEvent');
  return eventManager;
});
module.exports = cc.internal.eventManager = eventManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGV2ZW50LW1hbmFnZXJcXENDRXZlbnRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIkxpc3RlbmVySUQiLCJjYyIsIkV2ZW50TGlzdGVuZXIiLCJfRXZlbnRMaXN0ZW5lclZlY3RvciIsIl9maXhlZExpc3RlbmVycyIsIl9zY2VuZUdyYXBoTGlzdGVuZXJzIiwiZ3QwSW5kZXgiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJsZW5ndGgiLCJlbXB0eSIsInB1c2giLCJsaXN0ZW5lciIsIl9nZXRGaXhlZFByaW9yaXR5IiwiY2xlYXJTY2VuZUdyYXBoTGlzdGVuZXJzIiwiY2xlYXJGaXhlZExpc3RlbmVycyIsImNsZWFyIiwiZ2V0Rml4ZWRQcmlvcml0eUxpc3RlbmVycyIsImdldFNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycyIsIl9fZ2V0TGlzdGVuZXJJRCIsImV2ZW50IiwiZXZlbnRUeXBlIiwiRXZlbnQiLCJ0eXBlIiwiQUNDRUxFUkFUSU9OIiwiS0VZQk9BUkQiLCJzdGFydHNXaXRoIiwiTU9VU0UiLCJUT1VDSCIsImxvZ0lEIiwiZXZlbnRNYW5hZ2VyIiwiRElSVFlfTk9ORSIsIkRJUlRZX0ZJWEVEX1BSSU9SSVRZIiwiRElSVFlfU0NFTkVfR1JBUEhfUFJJT1JJVFkiLCJESVJUWV9BTEwiLCJfbGlzdGVuZXJzTWFwIiwiX3ByaW9yaXR5RGlydHlGbGFnTWFwIiwiX25vZGVMaXN0ZW5lcnNNYXAiLCJfdG9BZGRlZExpc3RlbmVycyIsIl90b1JlbW92ZWRMaXN0ZW5lcnMiLCJfZGlydHlMaXN0ZW5lcnMiLCJfaW5EaXNwYXRjaCIsIl9pc0VuYWJsZWQiLCJfY3VycmVudFRvdWNoIiwiX2N1cnJlbnRUb3VjaExpc3RlbmVyIiwiX2ludGVybmFsQ3VzdG9tTGlzdGVuZXJJRHMiLCJfc2V0RGlydHlGb3JOb2RlIiwibm9kZSIsInNlbExpc3RlbmVycyIsIl9pZCIsInVuZGVmaW5lZCIsImoiLCJsZW4iLCJzZWxMaXN0ZW5lciIsImxpc3RlbmVySUQiLCJfZ2V0TGlzdGVuZXJJRCIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsIl9jaGlsZHJlbiIsImkiLCJwYXVzZVRhcmdldCIsInJlY3Vyc2l2ZSIsIl9CYXNlTm9kZSIsIndhcm5JRCIsImxpc3RlbmVycyIsIl9zZXRQYXVzZWQiLCJsb2NDaGlsZHJlbiIsInJlc3VtZVRhcmdldCIsIl9hZGRMaXN0ZW5lciIsIl9mb3JjZUFkZEV2ZW50TGlzdGVuZXIiLCJfc2V0RGlydHkiLCJfZ2V0U2NlbmVHcmFwaFByaW9yaXR5IiwiX2Fzc29jaWF0ZU5vZGVBbmRFdmVudExpc3RlbmVyIiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJfZ2V0TGlzdGVuZXJzIiwiX3VwZGF0ZURpcnR5RmxhZ0ZvclNjZW5lR3JhcGgiLCJsb2NEaXJ0eUxpc3RlbmVycyIsInNlbEtleSIsIl9yZW1vdmVBbGxMaXN0ZW5lcnNJblZlY3RvciIsImxpc3RlbmVyVmVjdG9yIiwiX3NldFJlZ2lzdGVyZWQiLCJfZGlzc29jaWF0ZU5vZGVBbmRFdmVudExpc3RlbmVyIiwiX3NldFNjZW5lR3JhcGhQcmlvcml0eSIsImFycmF5IiwicmVtb3ZlQXQiLCJfcmVtb3ZlTGlzdGVuZXJzRm9yTGlzdGVuZXJJRCIsImZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMiLCJzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMiLCJsb2NUb0FkZGVkTGlzdGVuZXJzIiwiX3NvcnRFdmVudExpc3RlbmVycyIsImRpcnR5RmxhZyIsImxvY0ZsYWdNYXAiLCJfc29ydExpc3RlbmVyc09mRml4ZWRQcmlvcml0eSIsInJvb3RFbnRpdHkiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiX3NvcnRMaXN0ZW5lcnNPZlNjZW5lR3JhcGhQcmlvcml0eSIsInNjZW5lR3JhcGhMaXN0ZW5lciIsInNvcnQiLCJfc29ydEV2ZW50TGlzdGVuZXJzT2ZTY2VuZUdyYXBoUHJpb3JpdHlEZXMiLCJsMSIsImwyIiwibm9kZTEiLCJub2RlMiIsIl9hY3RpdmVJbkhpZXJhcmNoeSIsIl9wYXJlbnQiLCJwMSIsInAyIiwiZXgiLCJfbG9jYWxaT3JkZXIiLCJmaXhlZExpc3RlbmVycyIsIl9zb3J0TGlzdGVuZXJzT2ZGaXhlZFByaW9yaXR5QXNjIiwiaW5kZXgiLCJfb25VcGRhdGVMaXN0ZW5lcnMiLCJpZHgiLCJ0b1JlbW92ZWRMaXN0ZW5lcnMiLCJfaXNSZWdpc3RlcmVkIiwiaW5kZXhPZiIsInNwbGljZSIsImZyYW1lVXBkYXRlTGlzdGVuZXJzIiwibG9jTGlzdGVuZXJzTWFwIiwibG9jUHJpb3JpdHlEaXJ0eUZsYWdNYXAiLCJfY2xlYW5Ub1JlbW92ZWRMaXN0ZW5lcnMiLCJfdXBkYXRlVG91Y2hMaXN0ZW5lcnMiLCJsb2NJbkRpc3BhdGNoIiwiYXNzZXJ0SUQiLCJUT1VDSF9PTkVfQllfT05FIiwiVE9VQ0hfQUxMX0FUX09OQ0UiLCJfb25Ub3VjaEV2ZW50Q2FsbGJhY2siLCJhcmdzT2JqIiwic2VsVG91Y2giLCJjdXJyZW50VG91Y2giLCJjdXJyZW50VGFyZ2V0IiwiX25vZGUiLCJpc0NsYWltZWQiLCJyZW1vdmVkSWR4IiwiZ2V0Q29kZSIsImdldEV2ZW50Q29kZSIsIkV2ZW50VG91Y2giLCJCRUdBTiIsIm1hY3JvIiwiRU5BQkxFX01VTFRJX1RPVUNIIiwib25Ub3VjaEJlZ2FuIiwiX3JlZ2lzdGVyZWQiLCJfY2xhaW1lZFRvdWNoZXMiLCJNT1ZFRCIsIm9uVG91Y2hNb3ZlZCIsIkVOREVEIiwib25Ub3VjaEVuZGVkIiwiX2NsZWFyQ3VyVG91Y2giLCJDQU5DRUxFRCIsIm9uVG91Y2hDYW5jZWxsZWQiLCJpc1N0b3BwZWQiLCJzd2FsbG93VG91Y2hlcyIsIm5lZWRzTXV0YWJsZVNldCIsInRvdWNoZXMiLCJfZGlzcGF0Y2hUb3VjaEV2ZW50Iiwib25lQnlPbmVMaXN0ZW5lcnMiLCJhbGxBdE9uY2VMaXN0ZW5lcnMiLCJvcmlnaW5hbFRvdWNoZXMiLCJnZXRUb3VjaGVzIiwibXV0YWJsZVRvdWNoZXMiLCJjb3B5Iiwib25lQnlPbmVBcmdzT2JqIiwiX3Byb3BhZ2F0aW9uU3RvcHBlZCIsIl9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWQiLCJfZGlzcGF0Y2hFdmVudFRvTGlzdGVuZXJzIiwiX29uVG91Y2hlc0V2ZW50Q2FsbGJhY2siLCJjYWxsYmFja1BhcmFtcyIsIm9uVG91Y2hlc0JlZ2FuIiwib25Ub3VjaGVzTW92ZWQiLCJvblRvdWNoZXNFbmRlZCIsIm9uVG91Y2hlc0NhbmNlbGxlZCIsInJlbW92ZSIsIm9uRXZlbnQiLCJldmVudE9yQXJncyIsInNob3VsZFN0b3BQcm9wYWdhdGlvbiIsImlzRW5hYmxlZCIsIl9pc1BhdXNlZCIsImZsYWciLCJsb2NEaXJ0eUZsYWdNYXAiLCJfc29ydE51bWJlckFzYyIsImEiLCJiIiwiaGFzRXZlbnRMaXN0ZW5lciIsImFkZExpc3RlbmVyIiwibm9kZU9yUHJpb3JpdHkiLCJpc051bWJlciIsImNyZWF0ZSIsImNoZWNrQXZhaWxhYmxlIiwiX3NldEZpeGVkUHJpb3JpdHkiLCJhZGRDdXN0b21MaXN0ZW5lciIsImV2ZW50TmFtZSIsImNhbGxiYWNrIiwiQ1VTVE9NIiwicmVtb3ZlTGlzdGVuZXIiLCJpc0ZvdW5kIiwibG9jTGlzdGVuZXIiLCJfcmVtb3ZlTGlzdGVuZXJJblZlY3RvciIsIl9yZW1vdmVMaXN0ZW5lckluQ2FsbGJhY2siLCJfb25DdXN0b21FdmVudCIsIl9vbkV2ZW50IiwicmVtb3ZlTGlzdGVuZXJzIiwibGlzdGVuZXJUeXBlIiwiX3QiLCJsaXN0ZW5lcnNDb3B5IiwicmVtb3ZlQ3VzdG9tTGlzdGVuZXJzIiwiY3VzdG9tRXZlbnROYW1lIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwibG9jTGlzdGVuZXJzIiwibG9jSW50ZXJuYWxDdXN0b21FdmVudElEcyIsInNldFByaW9yaXR5IiwiZml4ZWRQcmlvcml0eSIsImZvdW5kIiwic2V0RW5hYmxlZCIsImVuYWJsZWQiLCJkaXNwYXRjaEV2ZW50IiwiZ2V0VHlwZSIsImVycm9ySUQiLCJfb25MaXN0ZW5lckNhbGxiYWNrIiwiX3RhcmdldCIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJvcHRpb25hbFVzZXJEYXRhIiwiZXYiLCJFdmVudEN1c3RvbSIsInNldFVzZXJEYXRhIiwiZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyIsImludGVybmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFoQjs7QUFDQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBQ0EsSUFBSUMsVUFBVSxHQUFHQyxFQUFFLENBQUNDLGFBQUgsQ0FBaUJGLFVBQWxDOztBQUVBLElBQUlHLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsR0FBWTtBQUNuQyxPQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsT0FBS0Msb0JBQUwsR0FBNEIsRUFBNUI7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0gsQ0FKRDs7QUFLQUgsb0JBQW9CLENBQUNJLFNBQXJCLEdBQWlDO0FBQzdCQyxFQUFBQSxXQUFXLEVBQUVMLG9CQURnQjtBQUU3Qk0sRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsV0FBTyxLQUFLTCxlQUFMLENBQXFCTSxNQUFyQixHQUE4QixLQUFLTCxvQkFBTCxDQUEwQkssTUFBL0Q7QUFDSCxHQUo0QjtBQU03QkMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsV0FBUSxLQUFLUCxlQUFMLENBQXFCTSxNQUFyQixLQUFnQyxDQUFqQyxJQUF3QyxLQUFLTCxvQkFBTCxDQUEwQkssTUFBMUIsS0FBcUMsQ0FBcEY7QUFDSCxHQVI0QjtBQVU3QkUsRUFBQUEsSUFBSSxFQUFFLGNBQVVDLFFBQVYsRUFBb0I7QUFDdEIsUUFBSUEsUUFBUSxDQUFD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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG52YXIganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xyXG5yZXF1aXJlKCcuL0NDRXZlbnRMaXN0ZW5lcicpO1xyXG52YXIgTGlzdGVuZXJJRCA9IGNjLkV2ZW50TGlzdGVuZXIuTGlzdGVuZXJJRDtcclxuXHJcbnZhciBfRXZlbnRMaXN0ZW5lclZlY3RvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2ZpeGVkTGlzdGVuZXJzID0gW107XHJcbiAgICB0aGlzLl9zY2VuZUdyYXBoTGlzdGVuZXJzID0gW107XHJcbiAgICB0aGlzLmd0MEluZGV4ID0gMDtcclxufTtcclxuX0V2ZW50TGlzdGVuZXJWZWN0b3IucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IF9FdmVudExpc3RlbmVyVmVjdG9yLFxyXG4gICAgc2l6ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maXhlZExpc3RlbmVycy5sZW5ndGggKyB0aGlzLl9zY2VuZUdyYXBoTGlzdGVuZXJzLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgZW1wdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2ZpeGVkTGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkgJiYgKHRoaXMuX3NjZW5lR3JhcGhMaXN0ZW5lcnMubGVuZ3RoID09PSAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgcHVzaDogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyLl9nZXRGaXhlZFByaW9yaXR5KCkgPT09IDApXHJcbiAgICAgICAgICAgIHRoaXMuX3NjZW5lR3JhcGhMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9maXhlZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXJTY2VuZUdyYXBoTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fc2NlbmVHcmFwaExpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbGVhckZpeGVkTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZml4ZWRMaXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zY2VuZUdyYXBoTGlzdGVuZXJzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZml4ZWRMaXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Rml4ZWRQcmlvcml0eUxpc3RlbmVyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maXhlZExpc3RlbmVycztcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0U2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lR3JhcGhMaXN0ZW5lcnM7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgX19nZXRMaXN0ZW5lcklEID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICB2YXIgZXZlbnRUeXBlID0gY2MuRXZlbnQsIHR5cGUgPSBldmVudC50eXBlO1xyXG4gICAgaWYgKHR5cGUgPT09IGV2ZW50VHlwZS5BQ0NFTEVSQVRJT04pXHJcbiAgICAgICAgcmV0dXJuIExpc3RlbmVySUQuQUNDRUxFUkFUSU9OO1xyXG4gICAgaWYgKHR5cGUgPT09IGV2ZW50VHlwZS5LRVlCT0FSRClcclxuICAgICAgICByZXR1cm4gTGlzdGVuZXJJRC5LRVlCT0FSRDtcclxuICAgIGlmICh0eXBlLnN0YXJ0c1dpdGgoZXZlbnRUeXBlLk1PVVNFKSlcclxuICAgICAgICByZXR1cm4gTGlzdGVuZXJJRC5NT1VTRTtcclxuICAgIGlmICh0eXBlLnN0YXJ0c1dpdGgoZXZlbnRUeXBlLlRPVUNIKSl7XHJcbiAgICAgICAgLy8gVG91Y2ggbGlzdGVuZXIgaXMgdmVyeSBzcGVjaWFsLCBpdCBjb250YWlucyB0d28ga2luZHMgb2YgbGlzdGVuZXJzLCBFdmVudExpc3RlbmVyVG91Y2hPbmVCeU9uZSBhbmQgRXZlbnRMaXN0ZW5lclRvdWNoQWxsQXRPbmNlLlxyXG4gICAgICAgIC8vIHJldHVybiBVTktOT1dOIGluc3RlYWQuXHJcbiAgICAgICAgY2MubG9nSUQoMjAwMCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoaXMgY2xhc3MgaGFzIGJlZW4gZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjYy5zeXN0ZW1FdmVudCBvciBjYy5FdmVudFRhcmdldCBpbnN0ZWFkLiBTZWUgW0xpc3RlbiB0byBhbmQgbGF1bmNoIGV2ZW50c10oLi4vLi4vLi4vbWFudWFsL2VuL3NjcmlwdGluZy9ldmVudHMuaHRtbCkgZm9yIGRldGFpbHMuPGJyPlxyXG4gKiA8YnI+XHJcbiAqIGNjLmV2ZW50TWFuYWdlciBpcyBhIHNpbmdsZXRvbiBvYmplY3Qgd2hpY2ggbWFuYWdlcyBldmVudCBsaXN0ZW5lciBzdWJzY3JpcHRpb25zIGFuZCBldmVudCBkaXNwYXRjaGluZy5cclxuICogVGhlIEV2ZW50TGlzdGVuZXIgbGlzdCBpcyBtYW5hZ2VkIGluIHN1Y2ggd2F5IHNvIHRoYXQgZXZlbnQgbGlzdGVuZXJzIGNhbiBiZSBhZGRlZCBhbmQgcmVtb3ZlZFxyXG4gKiB3aGlsZSBldmVudHMgYXJlIGJlaW5nIGRpc3BhdGNoZWQuXHJcbiAqXHJcbiAqICEjemhcclxuICog6K+l57G75bey5bqf5byD77yM6K+35L2/55SoIGNjLnN5c3RlbUV2ZW50IOaIliBjYy5FdmVudFRhcmdldCDku6Pmm7/vvIzor6bop4EgW+ebkeWQrOWSjOWPkeWwhOS6i+S7tl0oLi4vLi4vLi4vbWFudWFsL3poL3NjcmlwdGluZy9ldmVudHMuaHRtbCnjgII8YnI+XHJcbiAqIDxicj5cclxuICog5LqL5Lu2566h55CG5Zmo77yM5a6D5Li76KaB566h55CG5LqL5Lu255uR5ZCs5Zmo5rOo5YaM5ZKM5rS+5Y+R57O757uf5LqL5Lu244CCXHJcbiAqXHJcbiAqIEBjbGFzcyBldmVudE1hbmFnZXJcclxuICogQHN0YXRpY1xyXG4gKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NFdmVudE1hbmFnZXIvYWRkTGlzdGVuZXIuanN9XHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqL1xyXG52YXIgZXZlbnRNYW5hZ2VyID0ge1xyXG4gICAgLy9Qcmlvcml0eSBkaXJ0eSBmbGFnXHJcbiAgICBESVJUWV9OT05FOiAwLFxyXG4gICAgRElSVFlfRklYRURfUFJJT1JJVFk6IDEgPDwgMCxcclxuICAgIERJUlRZX1NDRU5FX0dSQVBIX1BSSU9SSVRZOiAxIDw8IDEsXHJcbiAgICBESVJUWV9BTEw6IDMsXHJcbiAgICBcclxuICAgIF9saXN0ZW5lcnNNYXA6IHt9LFxyXG4gICAgX3ByaW9yaXR5RGlydHlGbGFnTWFwOiB7fSxcclxuICAgIF9ub2RlTGlzdGVuZXJzTWFwOiB7fSxcclxuICAgIF90b0FkZGVkTGlzdGVuZXJzOiBbXSxcclxuICAgIF90b1JlbW92ZWRMaXN0ZW5lcnM6IFtdLFxyXG4gICAgX2RpcnR5TGlzdGVuZXJzOiB7fSxcclxuICAgIF9pbkRpc3BhdGNoOiAwLFxyXG4gICAgX2lzRW5hYmxlZDogZmFsc2UsXHJcbiAgICBfY3VycmVudFRvdWNoOiBudWxsLFxyXG4gICAgX2N1cnJlbnRUb3VjaExpc3RlbmVyOiBudWxsLFxyXG5cclxuICAgIF9pbnRlcm5hbEN1c3RvbUxpc3RlbmVySURzOltdLFxyXG5cclxuICAgIF9zZXREaXJ0eUZvck5vZGU6IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgLy8gTWFyayB0aGUgbm9kZSBkaXJ0eSBvbmx5IHdoZW4gdGhlcmUgaXMgYW4gZXZlbnQgbGlzdGVuZXIgYXNzb2NpYXRlZCB3aXRoIGl0LlxyXG4gICAgICAgIGxldCBzZWxMaXN0ZW5lcnMgPSB0aGlzLl9ub2RlTGlzdGVuZXJzTWFwW25vZGUuX2lkXTtcclxuICAgICAgICBpZiAoc2VsTGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxlbiA9IHNlbExpc3RlbmVycy5sZW5ndGg7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbExpc3RlbmVyID0gc2VsTGlzdGVuZXJzW2pdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVySUQgPSBzZWxMaXN0ZW5lci5fZ2V0TGlzdGVuZXJJRCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5TGlzdGVuZXJzW2xpc3RlbmVySURdID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlydHlMaXN0ZW5lcnNbbGlzdGVuZXJJRF0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IG5vZGUuX2NoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERpcnR5Rm9yTm9kZShjaGlsZHJlbltpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGF1c2VzIGFsbCBsaXN0ZW5lcnMgd2hpY2ggYXJlIGFzc29jaWF0ZWQgdGhlIHNwZWNpZmllZCB0YXJnZXQuXHJcbiAgICAgKiAhI3poIOaaguWBnOS8oOWFpeeahCBub2RlIOebuOWFs+eahOaJgOacieebkeWQrOWZqOeahOS6i+S7tuWTjeW6lOOAglxyXG4gICAgICogQG1ldGhvZCBwYXVzZVRhcmdldFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyZWN1cnNpdmU9ZmFsc2VdXHJcbiAgICAgKi9cclxuICAgIHBhdXNlVGFyZ2V0OiBmdW5jdGlvbiAobm9kZSwgcmVjdXJzaXZlKSB7XHJcbiAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM1MDYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ub2RlTGlzdGVuZXJzTWFwW25vZGUuX2lkXSwgaSwgbGVuO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2ldLl9zZXRQYXVzZWQodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZWN1cnNpdmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIGxvY0NoaWxkcmVuID0gbm9kZS5fY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxvY0NoaWxkcmVuID8gbG9jQ2hpbGRyZW4ubGVuZ3RoIDogMDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZVRhcmdldChsb2NDaGlsZHJlbltpXSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVzdW1lcyBhbGwgbGlzdGVuZXJzIHdoaWNoIGFyZSBhc3NvY2lhdGVkIHRoZSBzcGVjaWZpZWQgdGFyZ2V0LlxyXG4gICAgICogISN6aCDmgaLlpI3kvKDlhaXnmoQgbm9kZSDnm7jlhbPnmoTmiYDmnInnm5HlkKzlmajnmoTkuovku7blk43lupTjgIJcclxuICAgICAqIEBtZXRob2QgcmVzdW1lVGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JlY3Vyc2l2ZT1mYWxzZV1cclxuICAgICAqL1xyXG4gICAgcmVzdW1lVGFyZ2V0OiBmdW5jdGlvbiAobm9kZSwgcmVjdXJzaXZlKSB7XHJcbiAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM1MDYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ub2RlTGlzdGVuZXJzTWFwW25vZGUuX2lkXSwgaSwgbGVuO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpe1xyXG4gICAgICAgICAgICBmb3IgKCBpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2ldLl9zZXRQYXVzZWQoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZXREaXJ0eUZvck5vZGUobm9kZSk7XHJcbiAgICAgICAgaWYgKHJlY3Vyc2l2ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB2YXIgbG9jQ2hpbGRyZW4gPSBub2RlLl9jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbG9jQ2hpbGRyZW4gPyBsb2NDaGlsZHJlbi5sZW5ndGggOiAwOyBpIDwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VtZVRhcmdldChsb2NDaGlsZHJlbltpXSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfYWRkTGlzdGVuZXI6IGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbkRpc3BhdGNoID09PSAwKVxyXG4gICAgICAgICAgICB0aGlzLl9mb3JjZUFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fdG9BZGRlZExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2ZvcmNlQWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVySUQgPSBsaXN0ZW5lci5fZ2V0TGlzdGVuZXJJRCgpO1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNNYXBbbGlzdGVuZXJJRF07XHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJzID0gbmV3IF9FdmVudExpc3RlbmVyVmVjdG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc01hcFtsaXN0ZW5lcklEXSA9IGxpc3RlbmVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgICAgICBpZiAobGlzdGVuZXIuX2dldEZpeGVkUHJpb3JpdHkoKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXREaXJ0eShsaXN0ZW5lcklELCB0aGlzLkRJUlRZX1NDRU5FX0dSQVBIX1BSSU9SSVRZKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBub2RlID0gbGlzdGVuZXIuX2dldFNjZW5lR3JhcGhQcmlvcml0eSgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDM1MDcpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXNzb2NpYXRlTm9kZUFuZEV2ZW50TGlzdGVuZXIobm9kZSwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5hY3RpdmVJbkhpZXJhcmNoeSlcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lVGFyZ2V0KG5vZGUpO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICB0aGlzLl9zZXREaXJ0eShsaXN0ZW5lcklELCB0aGlzLkRJUlRZX0ZJWEVEX1BSSU9SSVRZKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldExpc3RlbmVyczogZnVuY3Rpb24gKGxpc3RlbmVySUQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzTWFwW2xpc3RlbmVySURdO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlRGlydHlGbGFnRm9yU2NlbmVHcmFwaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsb2NEaXJ0eUxpc3RlbmVycyA9IHRoaXMuX2RpcnR5TGlzdGVuZXJzXHJcbiAgICAgICAgZm9yICh2YXIgc2VsS2V5IGluIGxvY0RpcnR5TGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KHNlbEtleSwgdGhpcy5ESVJUWV9TQ0VORV9HUkFQSF9QUklPUklUWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kaXJ0eUxpc3RlbmVycyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVtb3ZlQWxsTGlzdGVuZXJzSW5WZWN0b3I6IGZ1bmN0aW9uIChsaXN0ZW5lclZlY3Rvcikge1xyXG4gICAgICAgIGlmICghbGlzdGVuZXJWZWN0b3IpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgc2VsTGlzdGVuZXI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGxpc3RlbmVyVmVjdG9yLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHNlbExpc3RlbmVyID0gbGlzdGVuZXJWZWN0b3JbaV07XHJcbiAgICAgICAgICAgIHNlbExpc3RlbmVyLl9zZXRSZWdpc3RlcmVkKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHNlbExpc3RlbmVyLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNzb2NpYXRlTm9kZUFuZEV2ZW50TGlzdGVuZXIoc2VsTGlzdGVuZXIuX2dldFNjZW5lR3JhcGhQcmlvcml0eSgpLCBzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBzZWxMaXN0ZW5lci5fc2V0U2NlbmVHcmFwaFByaW9yaXR5KG51bGwpOyAgIC8vIE5VTEwgb3V0IHRoZSBub2RlIHBvaW50ZXIgc28gd2UgZG9uJ3QgaGF2ZSBhbnkgZGFuZ2xpbmcgcG9pbnRlcnMgdG8gZGVzdHJveWVkIG5vZGVzLlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faW5EaXNwYXRjaCA9PT0gMClcclxuICAgICAgICAgICAgICAgIGNjLmpzLmFycmF5LnJlbW92ZUF0KGxpc3RlbmVyVmVjdG9yLCBpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVMaXN0ZW5lcnNGb3JMaXN0ZW5lcklEOiBmdW5jdGlvbiAobGlzdGVuZXJJRCkge1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNNYXBbbGlzdGVuZXJJRF0sIGk7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRQcmlvcml0eUxpc3RlbmVycyA9IGxpc3RlbmVycy5nZXRGaXhlZFByaW9yaXR5TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0U2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxMaXN0ZW5lcnNJblZlY3RvcihzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVBbGxMaXN0ZW5lcnNJblZlY3RvcihmaXhlZFByaW9yaXR5TGlzdGVuZXJzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZGlydHkgZmxhZyBhY2NvcmRpbmcgdGhlICdsaXN0ZW5lcklEJy5cclxuICAgICAgICAgICAgLy8gTm8gbmVlZCB0byBjaGVjayB3aGV0aGVyIHRoZSBkaXNwYXRjaGVyIGlzIGRpc3BhdGNoaW5nIGV2ZW50LlxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJpb3JpdHlEaXJ0eUZsYWdNYXBbbGlzdGVuZXJJRF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2luRGlzcGF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc01hcFtsaXN0ZW5lcklEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY1RvQWRkZWRMaXN0ZW5lcnMgPSB0aGlzLl90b0FkZGVkTGlzdGVuZXJzLCBsaXN0ZW5lcjtcclxuICAgICAgICBmb3IgKGkgPSBsb2NUb0FkZGVkTGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gbG9jVG9BZGRlZExpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGxpc3RlbmVyLl9nZXRMaXN0ZW5lcklEKCkgPT09IGxpc3RlbmVySUQpXHJcbiAgICAgICAgICAgICAgICBjYy5qcy5hcnJheS5yZW1vdmVBdChsb2NUb0FkZGVkTGlzdGVuZXJzLCBpKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zb3J0RXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uIChsaXN0ZW5lcklEKSB7XHJcbiAgICAgICAgdmFyIGRpcnR5RmxhZyA9IHRoaXMuRElSVFlfTk9ORSwgbG9jRmxhZ01hcCA9IHRoaXMuX3ByaW9yaXR5RGlydHlGbGFnTWFwO1xyXG4gICAgICAgIGlmIChsb2NGbGFnTWFwW2xpc3RlbmVySURdKVxyXG4gICAgICAgICAgICBkaXJ0eUZsYWcgPSBsb2NGbGFnTWFwW2xpc3RlbmVySURdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkaXJ0eUZsYWcgIT09IHRoaXMuRElSVFlfTk9ORSkge1xyXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgZGlydHkgZmxhZyBmaXJzdCwgaWYgYHJvb3ROb2RlYCBpcyBudWxsLCB0aGVuIHNldCBpdHMgZGlydHkgZmxhZyBvZiBzY2VuZSBncmFwaCBwcmlvcml0eVxyXG4gICAgICAgICAgICBsb2NGbGFnTWFwW2xpc3RlbmVySURdID0gdGhpcy5ESVJUWV9OT05FO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcnR5RmxhZyAmIHRoaXMuRElSVFlfRklYRURfUFJJT1JJVFkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TGlzdGVuZXJzT2ZGaXhlZFByaW9yaXR5KGxpc3RlbmVySUQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRpcnR5RmxhZyAmIHRoaXMuRElSVFlfU0NFTkVfR1JBUEhfUFJJT1JJVFkpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RFbnRpdHkgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYocm9vdEVudGl0eSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TGlzdGVuZXJzT2ZTY2VuZUdyYXBoUHJpb3JpdHkobGlzdGVuZXJJRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zb3J0TGlzdGVuZXJzT2ZTY2VuZUdyYXBoUHJpb3JpdHk6IGZ1bmN0aW9uIChsaXN0ZW5lcklEKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhsaXN0ZW5lcklEKTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVycylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgc2NlbmVHcmFwaExpc3RlbmVyID0gbGlzdGVuZXJzLmdldFNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycygpO1xyXG4gICAgICAgIGlmICghc2NlbmVHcmFwaExpc3RlbmVyIHx8IHNjZW5lR3JhcGhMaXN0ZW5lci5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gQWZ0ZXIgc29ydDogcHJpb3JpdHkgPCAwLCA+IDBcclxuICAgICAgICBsaXN0ZW5lcnMuZ2V0U2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzKCkuc29ydCh0aGlzLl9zb3J0RXZlbnRMaXN0ZW5lcnNPZlNjZW5lR3JhcGhQcmlvcml0eURlcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9zb3J0RXZlbnRMaXN0ZW5lcnNPZlNjZW5lR3JhcGhQcmlvcml0eURlczogZnVuY3Rpb24gKGwxLCBsMikge1xyXG4gICAgICAgIGxldCBub2RlMSA9IGwxLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSxcclxuICAgICAgICAgICAgbm9kZTIgPSBsMi5fZ2V0U2NlbmVHcmFwaFByaW9yaXR5KCk7XHJcblxyXG4gICAgICAgIGlmICghbDIgfHwgIW5vZGUyIHx8ICFub2RlMi5fYWN0aXZlSW5IaWVyYXJjaHkgfHwgbm9kZTIuX3BhcmVudCA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIGVsc2UgaWYgKCFsMSB8fCAhbm9kZTEgfHwgIW5vZGUxLl9hY3RpdmVJbkhpZXJhcmNoeSB8fCBub2RlMS5fcGFyZW50ID09PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcDEgPSBub2RlMSwgcDIgPSBub2RlMiwgZXggPSBmYWxzZTtcclxuICAgICAgICB3aGlsZSAocDEuX3BhcmVudC5faWQgIT09IHAyLl9wYXJlbnQuX2lkKSB7XHJcbiAgICAgICAgICAgIHAxID0gcDEuX3BhcmVudC5fcGFyZW50ID09PSBudWxsID8gKGV4ID0gdHJ1ZSkgJiYgbm9kZTIgOiBwMS5fcGFyZW50O1xyXG4gICAgICAgICAgICBwMiA9IHAyLl9wYXJlbnQuX3BhcmVudCA9PT0gbnVsbCA/IChleCA9IHRydWUpICYmIG5vZGUxIDogcDIuX3BhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwMS5faWQgPT09IHAyLl9pZCkge1xyXG4gICAgICAgICAgICBpZiAocDEuX2lkID09PSBub2RlMi5faWQpIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICBpZiAocDEuX2lkID09PSBub2RlMS5faWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBleCA/IHAxLl9sb2NhbFpPcmRlciAtIHAyLl9sb2NhbFpPcmRlciA6IHAyLl9sb2NhbFpPcmRlciAtIHAxLl9sb2NhbFpPcmRlcjtcclxuICAgIH0sXHJcblxyXG4gICAgX3NvcnRMaXN0ZW5lcnNPZkZpeGVkUHJpb3JpdHk6IGZ1bmN0aW9uIChsaXN0ZW5lcklEKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc01hcFtsaXN0ZW5lcklEXTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVycylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgZml4ZWRMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0Rml4ZWRQcmlvcml0eUxpc3RlbmVycygpO1xyXG4gICAgICAgIGlmKCFmaXhlZExpc3RlbmVycyB8fCBmaXhlZExpc3RlbmVycy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBBZnRlciBzb3J0OiBwcmlvcml0eSA8IDAsID4gMFxyXG4gICAgICAgIGZpeGVkTGlzdGVuZXJzLnNvcnQodGhpcy5fc29ydExpc3RlbmVyc09mRml4ZWRQcmlvcml0eUFzYyk7XHJcblxyXG4gICAgICAgIC8vIEZJWE1FOiBTaG91bGQgdXNlIGJpbmFyeSBzZWFyY2hcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGxlbiA9IGZpeGVkTGlzdGVuZXJzLmxlbmd0aDsgaW5kZXggPCBsZW47KSB7XHJcbiAgICAgICAgICAgIGlmIChmaXhlZExpc3RlbmVyc1tpbmRleF0uX2dldEZpeGVkUHJpb3JpdHkoKSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICsraW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RlbmVycy5ndDBJbmRleCA9IGluZGV4O1xyXG4gICAgfSxcclxuXHJcbiAgICBfc29ydExpc3RlbmVyc09mRml4ZWRQcmlvcml0eUFzYzogZnVuY3Rpb24gKGwxLCBsMikge1xyXG4gICAgICAgIHJldHVybiBsMS5fZ2V0Rml4ZWRQcmlvcml0eSgpIC0gbDIuX2dldEZpeGVkUHJpb3JpdHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uVXBkYXRlTGlzdGVuZXJzOiBmdW5jdGlvbiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgdmFyIGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0Rml4ZWRQcmlvcml0eUxpc3RlbmVycygpO1xyXG4gICAgICAgIHZhciBzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0U2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdmFyIGksIHNlbExpc3RlbmVyLCBpZHgsIHRvUmVtb3ZlZExpc3RlbmVycyA9IHRoaXMuX3RvUmVtb3ZlZExpc3RlbmVycztcclxuXHJcbiAgICAgICAgaWYgKHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSBzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHNlbExpc3RlbmVyID0gc2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxMaXN0ZW5lci5faXNSZWdpc3RlcmVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5qcy5hcnJheS5yZW1vdmVBdChzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaW4gdG9SZW1vdmUgbGlzdCwgcmVtb3ZlIGl0IGZyb20gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBpZHggPSB0b1JlbW92ZWRMaXN0ZW5lcnMuaW5kZXhPZihzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWR4ICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZW1vdmVkTGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZml4ZWRQcmlvcml0eUxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSBmaXhlZFByaW9yaXR5TGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxMaXN0ZW5lciA9IGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbExpc3RlbmVyLl9pc1JlZ2lzdGVyZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmpzLmFycmF5LnJlbW92ZUF0KGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0ZW0gaW4gdG9SZW1vdmUgbGlzdCwgcmVtb3ZlIGl0IGZyb20gdGhlIGxpc3RcclxuICAgICAgICAgICAgICAgICAgICBpZHggPSB0b1JlbW92ZWRMaXN0ZW5lcnMuaW5kZXhPZihzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWR4ICE9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9SZW1vdmVkTGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzICYmIHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5jbGVhclNjZW5lR3JhcGhMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMgJiYgZml4ZWRQcmlvcml0eUxpc3RlbmVycy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5jbGVhckZpeGVkTGlzdGVuZXJzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGZyYW1lVXBkYXRlTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxvY0xpc3RlbmVyc01hcCA9IHRoaXMuX2xpc3RlbmVyc01hcCwgbG9jUHJpb3JpdHlEaXJ0eUZsYWdNYXAgPSB0aGlzLl9wcmlvcml0eURpcnR5RmxhZ01hcDtcclxuICAgICAgICBmb3IgKHZhciBzZWxLZXkgaW4gbG9jTGlzdGVuZXJzTWFwKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NMaXN0ZW5lcnNNYXBbc2VsS2V5XS5lbXB0eSgpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbG9jUHJpb3JpdHlEaXJ0eUZsYWdNYXBbc2VsS2V5XTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NMaXN0ZW5lcnNNYXBbc2VsS2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY1RvQWRkZWRMaXN0ZW5lcnMgPSB0aGlzLl90b0FkZGVkTGlzdGVuZXJzO1xyXG4gICAgICAgIGlmIChsb2NUb0FkZGVkTGlzdGVuZXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbG9jVG9BZGRlZExpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlQWRkRXZlbnRMaXN0ZW5lcihsb2NUb0FkZGVkTGlzdGVuZXJzW2ldKTtcclxuICAgICAgICAgICAgbG9jVG9BZGRlZExpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdG9SZW1vdmVkTGlzdGVuZXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblRvUmVtb3ZlZExpc3RlbmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVRvdWNoTGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgbG9jSW5EaXNwYXRjaCA9IHRoaXMuX2luRGlzcGF0Y2g7XHJcbiAgICAgICAgY2MuYXNzZXJ0SUQobG9jSW5EaXNwYXRjaCA+IDAsIDM1MDgpO1xyXG5cclxuICAgICAgICBpZiAobG9jSW5EaXNwYXRjaCA+IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGxpc3RlbmVycztcclxuICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNNYXBbTGlzdGVuZXJJRC5UT1VDSF9PTkVfQllfT05FXTtcclxuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uVXBkYXRlTGlzdGVuZXJzKGxpc3RlbmVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc01hcFtMaXN0ZW5lcklELlRPVUNIX0FMTF9BVF9PTkNFXTtcclxuICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uVXBkYXRlTGlzdGVuZXJzKGxpc3RlbmVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy5hc3NlcnRJRChsb2NJbkRpc3BhdGNoID09PSAxLCAzNTA5KTtcclxuXHJcbiAgICAgICAgdmFyIGxvY1RvQWRkZWRMaXN0ZW5lcnMgPSB0aGlzLl90b0FkZGVkTGlzdGVuZXJzO1xyXG4gICAgICAgIGlmIChsb2NUb0FkZGVkTGlzdGVuZXJzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbG9jVG9BZGRlZExpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKylcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlQWRkRXZlbnRMaXN0ZW5lcihsb2NUb0FkZGVkTGlzdGVuZXJzW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5fdG9BZGRlZExpc3RlbmVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3RvUmVtb3ZlZExpc3RlbmVycy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Ub1JlbW92ZWRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gX3RvUmVtb3ZlTGlzdGVuZXJzIGxpc3QgYW5kIGNsZWFudXBcclxuICAgIF9jbGVhblRvUmVtb3ZlZExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0b1JlbW92ZWRMaXN0ZW5lcnMgPSB0aGlzLl90b1JlbW92ZWRMaXN0ZW5lcnM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b1JlbW92ZWRMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNlbExpc3RlbmVyID0gdG9SZW1vdmVkTGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzTWFwW3NlbExpc3RlbmVyLl9nZXRMaXN0ZW5lcklEKCldO1xyXG4gICAgICAgICAgICBpZiAoIWxpc3RlbmVycylcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkeCwgZml4ZWRQcmlvcml0eUxpc3RlbmVycyA9IGxpc3RlbmVycy5nZXRGaXhlZFByaW9yaXR5TGlzdGVuZXJzKCksXHJcbiAgICAgICAgICAgICAgICBzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZ2V0U2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZHggPSBzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMuaW5kZXhPZihzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZml4ZWRQcmlvcml0eUxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgaWR4ID0gZml4ZWRQcmlvcml0eUxpc3RlbmVycy5pbmRleE9mKHNlbExpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZml4ZWRQcmlvcml0eUxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0b1JlbW92ZWRMaXN0ZW5lcnMubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgX29uVG91Y2hFdmVudENhbGxiYWNrOiBmdW5jdGlvbiAobGlzdGVuZXIsIGFyZ3NPYmopIHtcclxuICAgICAgICAvLyBTa2lwIGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cclxuICAgICAgICBpZiAoIWxpc3RlbmVyLl9pc1JlZ2lzdGVyZWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgZXZlbnQgPSBhcmdzT2JqLmV2ZW50LCBzZWxUb3VjaCA9IGV2ZW50LmN1cnJlbnRUb3VjaDtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gbGlzdGVuZXIuX25vZGU7XHJcblxyXG4gICAgICAgIHZhciBpc0NsYWltZWQgPSBmYWxzZSwgcmVtb3ZlZElkeDtcclxuICAgICAgICB2YXIgZ2V0Q29kZSA9IGV2ZW50LmdldEV2ZW50Q29kZSgpLCBFdmVudFRvdWNoID0gY2MuRXZlbnQuRXZlbnRUb3VjaDtcclxuICAgICAgICBpZiAoZ2V0Q29kZSA9PT0gRXZlbnRUb3VjaC5CRUdBTikge1xyXG4gICAgICAgICAgICBpZiAoIWNjLm1hY3JvLkVOQUJMRV9NVUxUSV9UT1VDSCAmJiBldmVudE1hbmFnZXIuX2N1cnJlbnRUb3VjaCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBldmVudE1hbmFnZXIuX2N1cnJlbnRUb3VjaExpc3RlbmVyLl9ub2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uVG91Y2hCZWdhbikge1xyXG4gICAgICAgICAgICAgICAgaXNDbGFpbWVkID0gbGlzdGVuZXIub25Ub3VjaEJlZ2FuKHNlbFRvdWNoLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDbGFpbWVkICYmIGxpc3RlbmVyLl9yZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuX2NsYWltZWRUb3VjaGVzLnB1c2goc2VsVG91Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5fY3VycmVudFRvdWNoTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIuX2N1cnJlbnRUb3VjaCA9IHNlbFRvdWNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lci5fY2xhaW1lZFRvdWNoZXMubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAmJiAoKHJlbW92ZWRJZHggPSBsaXN0ZW5lci5fY2xhaW1lZFRvdWNoZXMuaW5kZXhPZihzZWxUb3VjaCkpICE9PSAtMSkpIHtcclxuICAgICAgICAgICAgaXNDbGFpbWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghY2MubWFjcm8uRU5BQkxFX01VTFRJX1RPVUNIICYmIGV2ZW50TWFuYWdlci5fY3VycmVudFRvdWNoICYmIGV2ZW50TWFuYWdlci5fY3VycmVudFRvdWNoICE9PSBzZWxUb3VjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0Q29kZSA9PT0gRXZlbnRUb3VjaC5NT1ZFRCAmJiBsaXN0ZW5lci5vblRvdWNoTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uVG91Y2hNb3ZlZChzZWxUb3VjaCwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdldENvZGUgPT09IEV2ZW50VG91Y2guRU5ERUQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vblRvdWNoRW5kZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIub25Ub3VjaEVuZGVkKHNlbFRvdWNoLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuX3JlZ2lzdGVyZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuX2NsYWltZWRUb3VjaGVzLnNwbGljZShyZW1vdmVkSWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5fY2xlYXJDdXJUb3VjaCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdldENvZGUgPT09IEV2ZW50VG91Y2guQ0FOQ0VMRUQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vblRvdWNoQ2FuY2VsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uVG91Y2hDYW5jZWxsZWQoc2VsVG91Y2gsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5fcmVnaXN0ZXJlZClcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5fY2xhaW1lZFRvdWNoZXMuc3BsaWNlKHJlbW92ZWRJZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLl9jbGVhckN1clRvdWNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBldmVudCB3YXMgc3RvcHBlZCwgcmV0dXJuIGRpcmVjdGx5LlxyXG4gICAgICAgIGlmIChldmVudC5pc1N0b3BwZWQoKSkge1xyXG4gICAgICAgICAgICBldmVudE1hbmFnZXIuX3VwZGF0ZVRvdWNoTGlzdGVuZXJzKGV2ZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDbGFpbWVkICYmIGxpc3RlbmVyLnN3YWxsb3dUb3VjaGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzT2JqLm5lZWRzTXV0YWJsZVNldClcclxuICAgICAgICAgICAgICAgIGFyZ3NPYmoudG91Y2hlcy5zcGxpY2Uoc2VsVG91Y2gsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZGlzcGF0Y2hUb3VjaEV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9zb3J0RXZlbnRMaXN0ZW5lcnMoTGlzdGVuZXJJRC5UT1VDSF9PTkVfQllfT05FKTtcclxuICAgICAgICB0aGlzLl9zb3J0RXZlbnRMaXN0ZW5lcnMoTGlzdGVuZXJJRC5UT1VDSF9BTExfQVRfT05DRSk7XHJcblxyXG4gICAgICAgIHZhciBvbmVCeU9uZUxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVycyhMaXN0ZW5lcklELlRPVUNIX09ORV9CWV9PTkUpO1xyXG4gICAgICAgIHZhciBhbGxBdE9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnMoTGlzdGVuZXJJRC5UT1VDSF9BTExfQVRfT05DRSk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZW4ndCBhbnkgdG91Y2ggbGlzdGVuZXJzLCByZXR1cm4gZGlyZWN0bHkuXHJcbiAgICAgICAgaWYgKG51bGwgPT09IG9uZUJ5T25lTGlzdGVuZXJzICYmIG51bGwgPT09IGFsbEF0T25jZUxpc3RlbmVycylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgb3JpZ2luYWxUb3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpLCBtdXRhYmxlVG91Y2hlcyA9IGNjLmpzLmFycmF5LmNvcHkob3JpZ2luYWxUb3VjaGVzKTtcclxuICAgICAgICB2YXIgb25lQnlPbmVBcmdzT2JqID0ge2V2ZW50OiBldmVudCwgbmVlZHNNdXRhYmxlU2V0OiAob25lQnlPbmVMaXN0ZW5lcnMgJiYgYWxsQXRPbmNlTGlzdGVuZXJzKSwgdG91Y2hlczogbXV0YWJsZVRvdWNoZXMsIHNlbFRvdWNoOiBudWxsfTtcclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBwcm9jZXNzIHRoZSB0YXJnZXQgaGFuZGxlcnMgMXN0XHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAob25lQnlPbmVMaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcmlnaW5hbFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUb3VjaCA9IG9yaWdpbmFsVG91Y2hlc1tpXTtcclxuICAgICAgICAgICAgICAgIGV2ZW50Ll9wcm9wYWdhdGlvblN0b3BwZWQgPSBldmVudC5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50VG9MaXN0ZW5lcnMob25lQnlPbmVMaXN0ZW5lcnMsIHRoaXMuX29uVG91Y2hFdmVudENhbGxiYWNrLCBvbmVCeU9uZUFyZ3NPYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHByb2Nlc3Mgc3RhbmRhcmQgaGFuZGxlcnMgMm5kXHJcbiAgICAgICAgLy9cclxuICAgICAgICBpZiAoYWxsQXRPbmNlTGlzdGVuZXJzICYmIG11dGFibGVUb3VjaGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudFRvTGlzdGVuZXJzKGFsbEF0T25jZUxpc3RlbmVycywgdGhpcy5fb25Ub3VjaGVzRXZlbnRDYWxsYmFjaywge2V2ZW50OiBldmVudCwgdG91Y2hlczogbXV0YWJsZVRvdWNoZXN9KTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmlzU3RvcHBlZCgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91cGRhdGVUb3VjaExpc3RlbmVycyhldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoZXNFdmVudENhbGxiYWNrOiBmdW5jdGlvbiAobGlzdGVuZXIsIGNhbGxiYWNrUGFyYW1zKSB7XHJcbiAgICAgICAgLy8gU2tpcCBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lci5fcmVnaXN0ZXJlZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgRXZlbnRUb3VjaCA9IGNjLkV2ZW50LkV2ZW50VG91Y2gsIGV2ZW50ID0gY2FsbGJhY2tQYXJhbXMuZXZlbnQsIHRvdWNoZXMgPSBjYWxsYmFja1BhcmFtcy50b3VjaGVzLCBnZXRDb2RlID0gZXZlbnQuZ2V0RXZlbnRDb2RlKCk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IGxpc3RlbmVyLl9ub2RlO1xyXG4gICAgICAgIGlmIChnZXRDb2RlID09PSBFdmVudFRvdWNoLkJFR0FOICYmIGxpc3RlbmVyLm9uVG91Y2hlc0JlZ2FuKVxyXG4gICAgICAgICAgICBsaXN0ZW5lci5vblRvdWNoZXNCZWdhbih0b3VjaGVzLCBldmVudCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZ2V0Q29kZSA9PT0gRXZlbnRUb3VjaC5NT1ZFRCAmJiBsaXN0ZW5lci5vblRvdWNoZXNNb3ZlZClcclxuICAgICAgICAgICAgbGlzdGVuZXIub25Ub3VjaGVzTW92ZWQodG91Y2hlcywgZXZlbnQpO1xyXG4gICAgICAgIGVsc2UgaWYgKGdldENvZGUgPT09IEV2ZW50VG91Y2guRU5ERUQgJiYgbGlzdGVuZXIub25Ub3VjaGVzRW5kZWQpXHJcbiAgICAgICAgICAgIGxpc3RlbmVyLm9uVG91Y2hlc0VuZGVkKHRvdWNoZXMsIGV2ZW50KTtcclxuICAgICAgICBlbHNlIGlmIChnZXRDb2RlID09PSBFdmVudFRvdWNoLkNBTkNFTEVEICYmIGxpc3RlbmVyLm9uVG91Y2hlc0NhbmNlbGxlZClcclxuICAgICAgICAgICAgbGlzdGVuZXIub25Ub3VjaGVzQ2FuY2VsbGVkKHRvdWNoZXMsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGV2ZW50IHdhcyBzdG9wcGVkLCByZXR1cm4gZGlyZWN0bHkuXHJcbiAgICAgICAgaWYgKGV2ZW50LmlzU3RvcHBlZCgpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5fdXBkYXRlVG91Y2hMaXN0ZW5lcnMoZXZlbnQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYXNzb2NpYXRlTm9kZUFuZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIChub2RlLCBsaXN0ZW5lcikge1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ub2RlTGlzdGVuZXJzTWFwW25vZGUuX2lkXTtcclxuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZUxpc3RlbmVyc01hcFtub2RlLl9pZF0gPSBsaXN0ZW5lcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2Rpc3NvY2lhdGVOb2RlQW5kRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKG5vZGUsIGxpc3RlbmVyKSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX25vZGVMaXN0ZW5lcnNNYXBbbm9kZS5faWRdO1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgY2MuanMuYXJyYXkucmVtb3ZlKGxpc3RlbmVycywgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ub2RlTGlzdGVuZXJzTWFwW25vZGUuX2lkXTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9kaXNwYXRjaEV2ZW50VG9MaXN0ZW5lcnM6IGZ1bmN0aW9uIChsaXN0ZW5lcnMsIG9uRXZlbnQsIGV2ZW50T3JBcmdzKSB7XHJcbiAgICAgICAgdmFyIHNob3VsZFN0b3BQcm9wYWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmaXhlZFByaW9yaXR5TGlzdGVuZXJzID0gbGlzdGVuZXJzLmdldEZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMoKTtcclxuICAgICAgICB2YXIgc2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzID0gbGlzdGVuZXJzLmdldFNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycygpO1xyXG5cclxuICAgICAgICB2YXIgaSA9IDAsIGosIHNlbExpc3RlbmVyO1xyXG4gICAgICAgIGlmIChmaXhlZFByaW9yaXR5TGlzdGVuZXJzKSB7ICAvLyBwcmlvcml0eSA8IDBcclxuICAgICAgICAgICAgaWYgKGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGxpc3RlbmVycy5ndDBJbmRleDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsTGlzdGVuZXIgPSBmaXhlZFByaW9yaXR5TGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxMaXN0ZW5lci5pc0VuYWJsZWQoKSAmJiAhc2VsTGlzdGVuZXIuX2lzUGF1c2VkKCkgJiYgc2VsTGlzdGVuZXIuX2lzUmVnaXN0ZXJlZCgpICYmIG9uRXZlbnQoc2VsTGlzdGVuZXIsIGV2ZW50T3JBcmdzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG91bGRTdG9wUHJvcGFnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMgJiYgIXNob3VsZFN0b3BQcm9wYWdhdGlvbikgeyAgICAvLyBwcmlvcml0eSA9PSAwLCBzY2VuZSBncmFwaCBwcmlvcml0eVxyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgc2NlbmVHcmFwaFByaW9yaXR5TGlzdGVuZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxMaXN0ZW5lciA9IHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVyc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxMaXN0ZW5lci5pc0VuYWJsZWQoKSAmJiAhc2VsTGlzdGVuZXIuX2lzUGF1c2VkKCkgJiYgc2VsTGlzdGVuZXIuX2lzUmVnaXN0ZXJlZCgpICYmIG9uRXZlbnQoc2VsTGlzdGVuZXIsIGV2ZW50T3JBcmdzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFN0b3BQcm9wYWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmaXhlZFByaW9yaXR5TGlzdGVuZXJzICYmICFzaG91bGRTdG9wUHJvcGFnYXRpb24pIHsgICAgLy8gcHJpb3JpdHkgPiAwXHJcbiAgICAgICAgICAgIGZvciAoOyBpIDwgZml4ZWRQcmlvcml0eUxpc3RlbmVycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgc2VsTGlzdGVuZXIgPSBmaXhlZFByaW9yaXR5TGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbExpc3RlbmVyLmlzRW5hYmxlZCgpICYmICFzZWxMaXN0ZW5lci5faXNQYXVzZWQoKSAmJiBzZWxMaXN0ZW5lci5faXNSZWdpc3RlcmVkKCkgJiYgb25FdmVudChzZWxMaXN0ZW5lciwgZXZlbnRPckFyZ3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3NldERpcnR5OiBmdW5jdGlvbiAobGlzdGVuZXJJRCwgZmxhZykge1xyXG4gICAgICAgIHZhciBsb2NEaXJ0eUZsYWdNYXAgPSB0aGlzLl9wcmlvcml0eURpcnR5RmxhZ01hcDtcclxuICAgICAgICBpZiAobG9jRGlydHlGbGFnTWFwW2xpc3RlbmVySURdID09IG51bGwpXHJcbiAgICAgICAgICAgIGxvY0RpcnR5RmxhZ01hcFtsaXN0ZW5lcklEXSA9IGZsYWc7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBsb2NEaXJ0eUZsYWdNYXBbbGlzdGVuZXJJRF0gPSBmbGFnIHwgbG9jRGlydHlGbGFnTWFwW2xpc3RlbmVySURdO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc29ydE51bWJlckFzYzogZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBRdWVyeSB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgZXZlbnQgbGlzdGVuZXIgaWQgaGFzIGJlZW4gYWRkZWQuXHJcbiAgICAgKiAhI3poIOafpeivouaMh+WumueahOS6i+S7tiBJRCDmmK/lkKblrZjlnKhcclxuICAgICAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBsaXN0ZW5lcklEIC0gVGhlIGxpc3RlbmVyIGlkLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxyXG4gICAgICovXHJcbiAgICBoYXNFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXJJRCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX2dldExpc3RlbmVycyhsaXN0ZW5lcklEKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiA8cD5cclxuICAgICAqIEFkZHMgYSBldmVudCBsaXN0ZW5lciBmb3IgYSBzcGVjaWZpZWQgZXZlbnQuPGJyLz5cclxuICAgICAqIGlmIHRoZSBwYXJhbWV0ZXIgXCJub2RlT3JQcmlvcml0eVwiIGlzIGEgbm9kZSxcclxuICAgICAqIGl0IG1lYW5zIHRvIGFkZCBhIGV2ZW50IGxpc3RlbmVyIGZvciBhIHNwZWNpZmllZCBldmVudCB3aXRoIHRoZSBwcmlvcml0eSBvZiBzY2VuZSBncmFwaC48YnIvPlxyXG4gICAgICogaWYgdGhlIHBhcmFtZXRlciBcIm5vZGVPclByaW9yaXR5XCIgaXMgYSBOdW1iZXIsXHJcbiAgICAgKiBpdCBtZWFucyB0byBhZGQgYSBldmVudCBsaXN0ZW5lciBmb3IgYSBzcGVjaWZpZWQgZXZlbnQgd2l0aCB0aGUgZml4ZWQgcHJpb3JpdHkuPGJyLz5cclxuICAgICAqIDwvcD5cclxuICAgICAqICEjemhcclxuICAgICAqIOWwhuS6i+S7tuebkeWQrOWZqOa3u+WKoOWIsOS6i+S7tueuoeeQhuWZqOS4reOAgjxici8+XHJcbiAgICAgKiDlpoLmnpzlj4LmlbAg4oCcbm9kZU9yUHJpb3JpdHnigJ0g5piv6IqC54K577yM5LyY5YWI57qn55SxIG5vZGUg55qE5riy5p+T6aG65bqP5Yaz5a6a77yM5pi+56S65Zyo5LiK5bGC55qE6IqC54K55bCG5LyY5YWI5pS25Yiw5LqL5Lu244CCPGJyLz5cclxuICAgICAqIOWmguaenOWPguaVsCDigJxub2RlT3JQcmlvcml0eeKAnSDmmK/mlbDlrZfvvIzkvJjlhYjnuqfliJnlm7rlrprkuLror6Xlj4LmlbDnmoTmlbDlgLzvvIzmlbDlrZfotorlsI/vvIzkvJjlhYjnuqfotorpq5jjgII8YnIvPlxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgYWRkTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7RXZlbnRMaXN0ZW5lcnxPYmplY3R9IGxpc3RlbmVyIC0gVGhlIGxpc3RlbmVyIG9mIGEgc3BlY2lmaWVkIGV2ZW50IG9yIGEgb2JqZWN0IG9mIHNvbWUgZXZlbnQgcGFyYW1ldGVycy5cclxuICAgICAqIEBwYXJhbSB7Tm9kZXxOdW1iZXJ9IG5vZGVPclByaW9yaXR5IC0gVGhlIHByaW9yaXR5IG9mIHRoZSBsaXN0ZW5lciBpcyBiYXNlZCBvbiB0aGUgZHJhdyBvcmRlciBvZiB0aGlzIG5vZGUgb3IgZml4ZWRQcmlvcml0eSBUaGUgZml4ZWQgcHJpb3JpdHkgb2YgdGhlIGxpc3RlbmVyLlxyXG4gICAgICogQG5vdGUgIFRoZSBwcmlvcml0eSBvZiBzY2VuZSBncmFwaCB3aWxsIGJlIGZpeGVkIHZhbHVlIDAuIFNvIHRoZSBvcmRlciBvZiBsaXN0ZW5lciBpdGVtIGluIHRoZSB2ZWN0b3Igd2lsbCBiZSAnIDwwLCBzY2VuZSBncmFwaCAoMCBwcmlvcml0eSksID4wJy5cclxuICAgICAqICAgICAgICAgQSBsb3dlciBwcmlvcml0eSB3aWxsIGJlIGNhbGxlZCBiZWZvcmUgdGhlIG9uZXMgdGhhdCBoYXZlIGEgaGlnaGVyIHZhbHVlLiAwIHByaW9yaXR5IGlzIGZvcmJpZGRlbiBmb3IgZml4ZWQgcHJpb3JpdHkgc2luY2UgaXQncyB1c2VkIGZvciBzY2VuZSBncmFwaCBiYXNlZCBwcmlvcml0eS5cclxuICAgICAqICAgICAgICAgVGhlIGxpc3RlbmVyIG11c3QgYmUgYSBjYy5FdmVudExpc3RlbmVyIG9iamVjdCB3aGVuIGFkZGluZyBhIGZpeGVkIHByaW9yaXR5IGxpc3RlbmVyLCBiZWNhdXNlIHdlIGNhbid0IHJlbW92ZSBhIGZpeGVkIHByaW9yaXR5IGxpc3RlbmVyIHdpdGhvdXQgdGhlIGxpc3RlbmVyIGhhbmRsZXIsXHJcbiAgICAgKiAgICAgICAgIGV4Y2VwdCBjYWxscyByZW1vdmVBbGxMaXN0ZW5lcnMoKS5cclxuICAgICAqIEByZXR1cm4ge0V2ZW50TGlzdGVuZXJ9IFJldHVybiB0aGUgbGlzdGVuZXIuIE5lZWRlZCBpbiBvcmRlciB0byByZW1vdmUgdGhlIGV2ZW50IGZyb20gdGhlIGRpc3BhdGNoZXIuXHJcbiAgICAgKi9cclxuICAgIGFkZExpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIsIG5vZGVPclByaW9yaXR5KSB7XHJcbiAgICAgICAgY2MuYXNzZXJ0SUQobGlzdGVuZXIgJiYgbm9kZU9yUHJpb3JpdHksIDM1MDMpO1xyXG4gICAgICAgIGlmICghKGNjLmpzLmlzTnVtYmVyKG5vZGVPclByaW9yaXR5KSB8fCBub2RlT3JQcmlvcml0eSBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM1MDYpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKGxpc3RlbmVyIGluc3RhbmNlb2YgY2MuRXZlbnRMaXN0ZW5lcikpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXJ0SUQoIWNjLmpzLmlzTnVtYmVyKG5vZGVPclByaW9yaXR5KSwgMzUwNCk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUobGlzdGVuZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lci5faXNSZWdpc3RlcmVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDM1MDUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWxpc3RlbmVyLmNoZWNrQXZhaWxhYmxlKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGNjLmpzLmlzTnVtYmVyKG5vZGVPclByaW9yaXR5KSkge1xyXG4gICAgICAgICAgICBpZiAobm9kZU9yUHJpb3JpdHkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDM1MDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0ZW5lci5fc2V0U2NlbmVHcmFwaFByaW9yaXR5KG51bGwpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5fc2V0Rml4ZWRQcmlvcml0eShub2RlT3JQcmlvcml0eSk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLl9zZXRSZWdpc3RlcmVkKHRydWUpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5fc2V0UGF1c2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5fYWRkTGlzdGVuZXIobGlzdGVuZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLl9zZXRTY2VuZUdyYXBoUHJpb3JpdHkobm9kZU9yUHJpb3JpdHkpO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5fc2V0Rml4ZWRQcmlvcml0eSgwKTtcclxuICAgICAgICAgICAgbGlzdGVuZXIuX3NldFJlZ2lzdGVyZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZExpc3RlbmVyKGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW4gQWRkcyBhIEN1c3RvbSBldmVudCBsaXN0ZW5lci4gSXQgd2lsbCB1c2UgYSBmaXhlZCBwcmlvcml0eSBvZiAxLlxyXG4gICAgICogISN6aCDlkJHkuovku7bnrqHnkIblmajmt7vliqDkuIDkuKroh6rlrprkuYnkuovku7bnm5HlkKzlmajjgIJcclxuICAgICAqIEBtZXRob2QgYWRkQ3VzdG9tTGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgKiBAcmV0dXJuIHtFdmVudExpc3RlbmVyfSB0aGUgZ2VuZXJhdGVkIGV2ZW50LiBOZWVkZWQgaW4gb3JkZXIgdG8gcmVtb3ZlIHRoZSBldmVudCBmcm9tIHRoZSBkaXNwYXRjaGVyXHJcbiAgICAgKi9cclxuICAgIGFkZEN1c3RvbUxpc3RlbmVyOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IG5ldyBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLkNVU1RPTSxcclxuICAgICAgICAgICAgZXZlbnROYW1lOiBldmVudE5hbWUsIFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKGxpc3RlbmVyLCAxKTtcclxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmUgYSBsaXN0ZW5lci5cclxuICAgICAqICEjemgg56e76Zmk5LiA5Liq5bey5re75Yqg55qE55uR5ZCs5Zmo44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IGxpc3RlbmVyIC0gYW4gZXZlbnQgbGlzdGVuZXIgb3IgYSByZWdpc3RlcmVkIG5vZGUgdGFyZ2V0XHJcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NFdmVudE1hbmFnZXIvcmVtb3ZlTGlzdGVuZXIuanN9XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgICAgICBpZiAobGlzdGVuZXIgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgaXNGb3VuZCwgbG9jTGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcnNNYXA7XHJcbiAgICAgICAgZm9yICh2YXIgc2VsS2V5IGluIGxvY0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBsb2NMaXN0ZW5lcltzZWxLZXldO1xyXG4gICAgICAgICAgICB2YXIgZml4ZWRQcmlvcml0eUxpc3RlbmVycyA9IGxpc3RlbmVycy5nZXRGaXhlZFByaW9yaXR5TGlzdGVuZXJzKCksIHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycyA9IGxpc3RlbmVycy5nZXRTY2VuZUdyYXBoUHJpb3JpdHlMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgICAgIGlzRm91bmQgPSB0aGlzLl9yZW1vdmVMaXN0ZW5lckluVmVjdG9yKHNjZW5lR3JhcGhQcmlvcml0eUxpc3RlbmVycywgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBpZiAoaXNGb3VuZCl7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXhlZCAjNDE2MDogRGlydHkgZmxhZyBuZWVkIHRvIGJlIHVwZGF0ZWQgYWZ0ZXIgbGlzdGVuZXJzIHdlcmUgcmVtb3ZlZC5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KGxpc3RlbmVyLl9nZXRMaXN0ZW5lcklEKCksIHRoaXMuRElSVFlfU0NFTkVfR1JBUEhfUFJJT1JJVFkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlzRm91bmQgPSB0aGlzLl9yZW1vdmVMaXN0ZW5lckluVmVjdG9yKGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMsIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0ZvdW5kKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KGxpc3RlbmVyLl9nZXRMaXN0ZW5lcklEKCksIHRoaXMuRElSVFlfRklYRURfUFJJT1JJVFkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmVtcHR5KCkpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmlvcml0eURpcnR5RmxhZ01hcFtsaXN0ZW5lci5fZ2V0TGlzdGVuZXJJRCgpXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsb2NMaXN0ZW5lcltzZWxLZXldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNGb3VuZClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0ZvdW5kKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NUb0FkZGVkTGlzdGVuZXJzID0gdGhpcy5fdG9BZGRlZExpc3RlbmVycztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGxvY1RvQWRkZWRMaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWxMaXN0ZW5lciA9IGxvY1RvQWRkZWRMaXN0ZW5lcnNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsTGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuanMuYXJyYXkucmVtb3ZlQXQobG9jVG9BZGRlZExpc3RlbmVycywgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsTGlzdGVuZXIuX3NldFJlZ2lzdGVyZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50VG91Y2hMaXN0ZW5lciA9PT0gbGlzdGVuZXIgJiYgdGhpcy5fY2xlYXJDdXJUb3VjaCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2xlYXJDdXJUb3VjaCAoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFRvdWNoTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUb3VjaCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVMaXN0ZW5lckluQ2FsbGJhY2s6IGZ1bmN0aW9uKGxpc3RlbmVycywgY2FsbGJhY2spe1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxMaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNlbExpc3RlbmVyLl9vbkN1c3RvbUV2ZW50ID09PSBjYWxsYmFjayB8fCBzZWxMaXN0ZW5lci5fb25FdmVudCA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbExpc3RlbmVyLl9zZXRSZWdpc3RlcmVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxMaXN0ZW5lci5fZ2V0U2NlbmVHcmFwaFByaW9yaXR5KCkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzc29jaWF0ZU5vZGVBbmRFdmVudExpc3RlbmVyKHNlbExpc3RlbmVyLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSwgc2VsTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbExpc3RlbmVyLl9zZXRTY2VuZUdyYXBoUHJpb3JpdHkobnVsbCk7ICAgICAgICAgLy8gTlVMTCBvdXQgdGhlIG5vZGUgcG9pbnRlciBzbyB3ZSBkb24ndCBoYXZlIGFueSBkYW5nbGluZyBwb2ludGVycyB0byBkZXN0cm95ZWQgbm9kZXMuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luRGlzcGF0Y2ggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuanMuYXJyYXkucmVtb3ZlQXQobGlzdGVuZXJzLCBpKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b1JlbW92ZWRMaXN0ZW5lcnMucHVzaChzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVMaXN0ZW5lckluVmVjdG9yOiBmdW5jdGlvbiAobGlzdGVuZXJzLCBsaXN0ZW5lcikge1xyXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxMaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNlbExpc3RlbmVyID09PSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgc2VsTGlzdGVuZXIuX3NldFJlZ2lzdGVyZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbExpc3RlbmVyLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzc29jaWF0ZU5vZGVBbmRFdmVudExpc3RlbmVyKHNlbExpc3RlbmVyLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSwgc2VsTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbExpc3RlbmVyLl9zZXRTY2VuZUdyYXBoUHJpb3JpdHkobnVsbCk7ICAgICAgICAgLy8gTlVMTCBvdXQgdGhlIG5vZGUgcG9pbnRlciBzbyB3ZSBkb24ndCBoYXZlIGFueSBkYW5nbGluZyBwb2ludGVycyB0byBkZXN0cm95ZWQgbm9kZXMuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luRGlzcGF0Y2ggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuanMuYXJyYXkucmVtb3ZlQXQobGlzdGVuZXJzLCBpKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b1JlbW92ZWRMaXN0ZW5lcnMucHVzaChzZWxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgd2l0aCB0aGUgc2FtZSBldmVudCBsaXN0ZW5lciB0eXBlIG9yIHJlbW92ZXMgYWxsIGxpc3RlbmVycyBvZiBhIG5vZGUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnp7vpmaTms6jlhozliLAgZXZlbnRNYW5hZ2VyIOS4reaMh+Wumuexu+Wei+eahOaJgOacieS6i+S7tuebkeWQrOWZqOOAgjxici8+XHJcbiAgICAgKiAxLiDlpoLmnpzkvKDlhaXnmoTnrKzkuIDkuKrlj4LmlbDnsbvlnovmmK8gTm9kZe+8jOmCo+S5iOS6i+S7tueuoeeQhuWZqOWwhuenu+mZpOS4juivpeWvueixoeebuOWFs+eahOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAgICog77yI5aaC5p6c56ys5LqM5Y+C5pWwIHJlY3Vyc2l2ZSDmmK8gdHJ1ZSDnmoTor53vvIzlsLHkvJrov57lkIzor6Xlr7nosaHnmoTlrZDmjqfku7bkuIrmiYDmnInnmoTkuovku7bnm5HlkKzlmajkuZ/kuIDlubbnp7vpmaTvvIk8YnIvPlxyXG4gICAgICogMi4g5aaC5p6c5Lyg5YWl55qE56ys5LiA5Liq5Y+C5pWw57G75Z6L5pivIE51bWJlcu+8iOivpeexu+WeiyBFdmVudExpc3RlbmVyIOS4reWumuS5ieeahOS6i+S7tuexu+Wei++8ie+8jFxyXG4gICAgICog6YKj5LmI5LqL5Lu2566h55CG5Zmo5bCG56e76Zmk6K+l57G75Z6L55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo44CCPGJyLz5cclxuICAgICAqXHJcbiAgICAgKiDkuIvliJfmmK/nm67liY3lrZjlnKjnm5HlkKzlmajnsbvlnovvvJogICAgICAgPGJyLz5cclxuICAgICAqIGNjLkV2ZW50TGlzdGVuZXIuVU5LTk9XTiAgICAgICA8YnIvPlxyXG4gICAgICogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCAgICAgIDxici8+XHJcbiAgICAgKiBjYy5FdmVudExpc3RlbmVyLkFDQ0VMRVJBVElPTu+8jDxici8+XHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCByZW1vdmVMaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE5vZGV9IGxpc3RlbmVyVHlwZSAtIGxpc3RlbmVyVHlwZSBvciBhIG5vZGVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JlY3Vyc2l2ZT1mYWxzZV1cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlTGlzdGVuZXJzOiBmdW5jdGlvbiAobGlzdGVuZXJUeXBlLCByZWN1cnNpdmUpIHtcclxuICAgICAgICB2YXIgaSwgX3QgPSB0aGlzO1xyXG4gICAgICAgIGlmICghKGNjLmpzLmlzTnVtYmVyKGxpc3RlbmVyVHlwZSkgfHwgbGlzdGVuZXJUeXBlIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlKSkge1xyXG4gICAgICAgICAgICBjYy53YXJuSUQoMzUwNik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyVHlwZS5faWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhlIG5vZGUgaXMgcmVtb3ZlZCBmcm9tIHRoZXNlIGltbWVkaWF0ZWx5IGFsc28uXHJcbiAgICAgICAgICAgIC8vIERvbid0IHdhbnQgYW55IGRhbmdsaW5nIHBvaW50ZXJzIG9yIHRoZSBwb3NzaWJpbGl0eSBvZiBkZWFsaW5nIHdpdGggZGVsZXRlZCBvYmplY3RzLi5cclxuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IF90Ll9ub2RlTGlzdGVuZXJzTWFwW2xpc3RlbmVyVHlwZS5faWRdLCBpO1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXJzQ29weSA9IGNjLmpzLmFycmF5LmNvcHkobGlzdGVuZXJzKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnNDb3B5Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIF90LnJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyc0NvcHlbaV0pO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIF90Ll9ub2RlTGlzdGVuZXJzTWFwW2xpc3RlbmVyVHlwZS5faWRdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBCdWcgZml4OiBlbnN1cmUgdGhlcmUgYXJlIG5vIHJlZmVyZW5jZXMgdG8gdGhlIG5vZGUgaW4gdGhlIGxpc3Qgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxyXG4gICAgICAgICAgICAvLyBJZiB3ZSBmaW5kIGFueSBsaXN0ZW5lcnMgYXNzb2NpYXRlZCB3aXRoIHRoZSBkZXN0cm95ZWQgbm9kZSBpbiB0aGlzIGxpc3QgdGhlbiByZW1vdmUgdGhlbS5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0byBjYXRjaCB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlIG5vZGUgZ2V0cyBkZXN0cm95ZWQgYmVmb3JlIGl0J3MgbGlzdGVuZXJcclxuICAgICAgICAgICAgLy8gaXMgYWRkZWQgaW50byB0aGUgZXZlbnQgZGlzcGF0Y2hlciBmdWxseS4gVGhpcyBjb3VsZCBoYXBwZW4gaWYgYSBub2RlIHJlZ2lzdGVycyBhIGxpc3RlbmVyXHJcbiAgICAgICAgICAgIC8vIGFuZCBnZXRzIGRlc3Ryb3llZCB3aGlsZSB3ZSBhcmUgZGlzcGF0Y2hpbmcgYW4gZXZlbnQgKHRvdWNoIGV0Yy4pXHJcbiAgICAgICAgICAgIHZhciBsb2NUb0FkZGVkTGlzdGVuZXJzID0gX3QuX3RvQWRkZWRMaXN0ZW5lcnM7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsb2NUb0FkZGVkTGlzdGVuZXJzLmxlbmd0aDsgKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBsb2NUb0FkZGVkTGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLl9nZXRTY2VuZUdyYXBoUHJpb3JpdHkoKSA9PT0gbGlzdGVuZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuX3NldFNjZW5lR3JhcGhQcmlvcml0eShudWxsKTsgICAgICAgICAgICAgICAgICAgICAgLy8gRW5zdXJlIG5vIGRhbmdsaW5nIHB0ciB0byB0aGUgdGFyZ2V0IG5vZGUuXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuX3NldFJlZ2lzdGVyZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY1RvQWRkZWRMaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgKytpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVjdXJzaXZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jQ2hpbGRyZW4gPSBsaXN0ZW5lclR5cGUuY2hpbGRyZW4sIGxlbjtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGxvY0NoaWxkcmVuLmxlbmd0aDsgaTwgbGVuOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAgX3QucmVtb3ZlTGlzdGVuZXJzKGxvY0NoaWxkcmVuW2ldLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lclR5cGUgPT09IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSlcclxuICAgICAgICAgICAgICAgIF90Ll9yZW1vdmVMaXN0ZW5lcnNGb3JMaXN0ZW5lcklEKExpc3RlbmVySUQuVE9VQ0hfT05FX0JZX09ORSk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGxpc3RlbmVyVHlwZSA9PT0gY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9BTExfQVRfT05DRSlcclxuICAgICAgICAgICAgICAgIF90Ll9yZW1vdmVMaXN0ZW5lcnNGb3JMaXN0ZW5lcklEKExpc3RlbmVySUQuVE9VQ0hfQUxMX0FUX09OQ0UpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChsaXN0ZW5lclR5cGUgPT09IGNjLkV2ZW50TGlzdGVuZXIuTU9VU0UpXHJcbiAgICAgICAgICAgICAgICBfdC5fcmVtb3ZlTGlzdGVuZXJzRm9yTGlzdGVuZXJJRChMaXN0ZW5lcklELk1PVVNFKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLkFDQ0VMRVJBVElPTilcclxuICAgICAgICAgICAgICAgIF90Ll9yZW1vdmVMaXN0ZW5lcnNGb3JMaXN0ZW5lcklEKExpc3RlbmVySUQuQUNDRUxFUkFUSU9OKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJEKVxyXG4gICAgICAgICAgICAgICAgX3QuX3JlbW92ZUxpc3RlbmVyc0Zvckxpc3RlbmVySUQoTGlzdGVuZXJJRC5LRVlCT0FSRCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDM1MDEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW4gUmVtb3ZlcyBhbGwgY3VzdG9tIGxpc3RlbmVycyB3aXRoIHRoZSBzYW1lIGV2ZW50IG5hbWUuXHJcbiAgICAgKiAhI3poIOenu+mZpOWQjOS4gOS6i+S7tuWQjeeahOiHquWumuS5ieS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAgICogQG1ldGhvZCByZW1vdmVDdXN0b21MaXN0ZW5lcnNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXN0b21FdmVudE5hbWVcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQ3VzdG9tTGlzdGVuZXJzOiBmdW5jdGlvbiAoY3VzdG9tRXZlbnROYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzRm9yTGlzdGVuZXJJRChjdXN0b21FdmVudE5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVtb3ZlcyBhbGwgbGlzdGVuZXJzXHJcbiAgICAgKiAhI3poIOenu+mZpOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAgICogQG1ldGhvZCByZW1vdmVBbGxMaXN0ZW5lcnNcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlQWxsTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxvY0xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc01hcCwgbG9jSW50ZXJuYWxDdXN0b21FdmVudElEcyA9IHRoaXMuX2ludGVybmFsQ3VzdG9tTGlzdGVuZXJJRHM7XHJcbiAgICAgICAgZm9yICh2YXIgc2VsS2V5IGluIGxvY0xpc3RlbmVycyl7XHJcbiAgICAgICAgICAgIGlmKGxvY0ludGVybmFsQ3VzdG9tRXZlbnRJRHMuaW5kZXhPZihzZWxLZXkpID09PSAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVyc0Zvckxpc3RlbmVySUQoc2VsS2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIGxpc3RlbmVyJ3MgcHJpb3JpdHkgd2l0aCBmaXhlZCB2YWx1ZS5cclxuICAgICAqICEjemgg6K6+572uIEZpeGVkUHJpb3JpdHkg57G75Z6L55uR5ZCs5Zmo55qE5LyY5YWI57qn44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFByaW9yaXR5XHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50TGlzdGVuZXJ9IGxpc3RlbmVyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZml4ZWRQcmlvcml0eVxyXG4gICAgICovXHJcbiAgICBzZXRQcmlvcml0eTogZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXhlZFByaW9yaXR5KSB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGxvY0xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVyc01hcDtcclxuICAgICAgICBmb3IgKHZhciBzZWxLZXkgaW4gbG9jTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxMaXN0ZW5lcnMgPSBsb2NMaXN0ZW5lcnNbc2VsS2V5XTtcclxuICAgICAgICAgICAgdmFyIGZpeGVkUHJpb3JpdHlMaXN0ZW5lcnMgPSBzZWxMaXN0ZW5lcnMuZ2V0Rml4ZWRQcmlvcml0eUxpc3RlbmVycygpO1xyXG4gICAgICAgICAgICBpZiAoZml4ZWRQcmlvcml0eUxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZml4ZWRQcmlvcml0eUxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChmb3VuZCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihsaXN0ZW5lci5fZ2V0U2NlbmVHcmFwaFByaW9yaXR5KCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nSUQoMzUwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLl9nZXRGaXhlZFByaW9yaXR5KCkgIT09IGZpeGVkUHJpb3JpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIuX3NldEZpeGVkUHJpb3JpdHkoZml4ZWRQcmlvcml0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldERpcnR5KGxpc3RlbmVyLl9nZXRMaXN0ZW5lcklEKCksIHRoaXMuRElSVFlfRklYRURfUFJJT1JJVFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBXaGV0aGVyIHRvIGVuYWJsZSBkaXNwYXRjaGluZyBldmVudHNcclxuICAgICAqICEjemgg5ZCv55So5oiW56aB55So5LqL5Lu2566h55CG5Zmo77yM56aB55So5ZCO5LiN5Lya5YiG5Y+R5Lu75L2V5LqL5Lu244CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEVuYWJsZWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBzZXRFbmFibGVkOiBmdW5jdGlvbiAoZW5hYmxlZCkge1xyXG4gICAgICAgIHRoaXMuX2lzRW5hYmxlZCA9IGVuYWJsZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciBkaXNwYXRjaGluZyBldmVudHMgaXMgZW5hYmxlZFxyXG4gICAgICogISN6aCDmo4DmtYvkuovku7bnrqHnkIblmajmmK/lkKblkK/nlKjjgIJcclxuICAgICAqIEBtZXRob2QgaXNFbmFibGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNFbmFibGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW5hYmxlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW4gRGlzcGF0Y2hlcyB0aGUgZXZlbnQsIGFsc28gcmVtb3ZlcyBhbGwgRXZlbnRMaXN0ZW5lcnMgbWFya2VkIGZvciBkZWxldGlvbiBmcm9tIHRoZSBldmVudCBkaXNwYXRjaGVyIGxpc3QuXHJcbiAgICAgKiAhI3poIOWIhuWPkeS6i+S7tuOAglxyXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxyXG4gICAgICovXHJcbiAgICBkaXNwYXRjaEV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzRW5hYmxlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVEaXJ0eUZsYWdGb3JTY2VuZUdyYXBoKCk7XHJcbiAgICAgICAgdGhpcy5faW5EaXNwYXRjaCsrO1xyXG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LmdldFR5cGUpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNTExKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuZ2V0VHlwZSgpLnN0YXJ0c1dpdGgoY2MuRXZlbnQuVE9VQ0gpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoVG91Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luRGlzcGF0Y2gtLTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxpc3RlbmVySUQgPSBfX2dldExpc3RlbmVySUQoZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuX3NvcnRFdmVudExpc3RlbmVycyhsaXN0ZW5lcklEKTtcclxuICAgICAgICB2YXIgc2VsTGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzTWFwW2xpc3RlbmVySURdO1xyXG4gICAgICAgIGlmIChzZWxMaXN0ZW5lcnMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50VG9MaXN0ZW5lcnMoc2VsTGlzdGVuZXJzLCB0aGlzLl9vbkxpc3RlbmVyQ2FsbGJhY2ssIGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fb25VcGRhdGVMaXN0ZW5lcnMoc2VsTGlzdGVuZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luRGlzcGF0Y2gtLTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uTGlzdGVuZXJDYWxsYmFjazogZnVuY3Rpb24obGlzdGVuZXIsIGV2ZW50KXtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gbGlzdGVuZXIuX3RhcmdldDtcclxuICAgICAgICBsaXN0ZW5lci5fb25FdmVudChldmVudCk7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LmlzU3RvcHBlZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogISNlbiBEaXNwYXRjaGVzIGEgQ3VzdG9tIEV2ZW50IHdpdGggYSBldmVudCBuYW1lIGFuIG9wdGlvbmFsIHVzZXIgZGF0YVxyXG4gICAgICogISN6aCDliIblj5Hoh6rlrprkuYnkuovku7bjgIJcclxuICAgICAqIEBtZXRob2QgZGlzcGF0Y2hDdXN0b21FdmVudFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBvcHRpb25hbFVzZXJEYXRhXHJcbiAgICAgKi9cclxuICAgIGRpc3BhdGNoQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIChldmVudE5hbWUsIG9wdGlvbmFsVXNlckRhdGEpIHtcclxuICAgICAgICB2YXIgZXYgPSBuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oZXZlbnROYW1lKTtcclxuICAgICAgICBldi5zZXRVc2VyRGF0YShvcHRpb25hbFVzZXJEYXRhKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmpzLmdldChjYywgJ2V2ZW50TWFuYWdlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLmVycm9ySUQoMTQwNSwgJ2NjLmV2ZW50TWFuYWdlcicsICdjYy5FdmVudFRhcmdldCBvciBjYy5zeXN0ZW1FdmVudCcpO1xyXG4gICAgcmV0dXJuIGV2ZW50TWFuYWdlcjtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLmludGVybmFsLmV2ZW50TWFuYWdlciA9IGV2ZW50TWFuYWdlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=