
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCNode.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
'use strict';

var _valueTypes = require("./value-types");

var BaseNode = require('./utils/base-node');

var PrefabHelper = require('./utils/prefab-helper');

var nodeMemPool = require('./utils/trans-pool').NodeMemPool;

var AffineTrans = require('./utils/affine-transform');

var eventManager = require('./event-manager');

var macro = require('./platform/CCMacro');

var js = require('./platform/js');

var Event = require('./event/event');

var EventTarget = require('./event/event-target');

var RenderFlow = require('./renderer/render-flow');

var Flags = cc.Object.Flags;
var Destroying = Flags.Destroying;
var ERR_INVALID_NUMBER = CC_EDITOR && 'The %s is invalid';
var ONE_DEGREE = Math.PI / 180;
var ActionManagerExist = !!cc.ActionManager;

var emptyFunc = function emptyFunc() {}; // getWorldPosition temp var


var _gwpVec3 = new _valueTypes.Vec3();

var _gwpQuat = new _valueTypes.Quat(); // _invTransformPoint temp var


var _tpVec3a = new _valueTypes.Vec3();

var _tpVec3b = new _valueTypes.Vec3();

var _tpQuata = new _valueTypes.Quat();

var _tpQuatb = new _valueTypes.Quat(); // setWorldPosition temp var


var _swpVec3 = new _valueTypes.Vec3(); // getWorldScale temp var


var _gwsVec3 = new _valueTypes.Vec3(); // setWorldScale temp var


var _swsVec3 = new _valueTypes.Vec3(); // getWorldRT temp var


var _gwrtVec3a = new _valueTypes.Vec3();

var _gwrtVec3b = new _valueTypes.Vec3();

var _gwrtQuata = new _valueTypes.Quat();

var _gwrtQuatb = new _valueTypes.Quat(); // lookAt temp var


var _laVec3 = new _valueTypes.Vec3();

var _laQuat = new _valueTypes.Quat(); //up、right、forward temp var


var _urfVec3 = new _valueTypes.Vec3();

var _urfQuat = new _valueTypes.Quat(); // _hitTest temp var


var _htVec3a = new _valueTypes.Vec3();

var _htVec3b = new _valueTypes.Vec3(); // getWorldRotation temp var


var _gwrQuat = new _valueTypes.Quat(); // setWorldRotation temp var


var _swrQuat = new _valueTypes.Quat();

var _quata = new _valueTypes.Quat();

var _mat4_temp = cc.mat4();

var _vec3_temp = new _valueTypes.Vec3();

var _cachedArray = new Array(16);

_cachedArray.length = 0;
var POSITION_ON = 1 << 0;
var SCALE_ON = 1 << 1;
var ROTATION_ON = 1 << 2;
var SIZE_ON = 1 << 3;
var ANCHOR_ON = 1 << 4;
var COLOR_ON = 1 << 5;
var BuiltinGroupIndex = cc.Enum({
  DEBUG: 31
});
/**
 * !#en Node's local dirty properties flag
 * !#zh Node 的本地属性 dirty 状态位
 * @enum Node._LocalDirtyFlag
 * @static
 * @private
 * @namespace Node
 */

var LocalDirtyFlag = cc.Enum({
  /**
   * !#en Flag for position dirty
   * !#zh 位置 dirty 的标记位
   * @property {Number} POSITION
   * @static
   */
  POSITION: 1 << 0,

  /**
   * !#en Flag for scale dirty
   * !#zh 缩放 dirty 的标记位
   * @property {Number} SCALE
   * @static
   */
  SCALE: 1 << 1,

  /**
   * !#en Flag for rotation dirty
   * !#zh 旋转 dirty 的标记位
   * @property {Number} ROTATION
   * @static
   */
  ROTATION: 1 << 2,

  /**
   * !#en Flag for skew dirty
   * !#zh skew dirty 的标记位
   * @property {Number} SKEW
   * @static
   */
  SKEW: 1 << 3,

  /**
   * !#en Flag for rotation, scale or position dirty
   * !#zh 旋转，缩放，或位置 dirty 的标记位
   * @property {Number} TRS
   * @static
   */
  TRS: 1 << 0 | 1 << 1 | 1 << 2,

  /**
   * !#en Flag for rotation or scale dirty
   * !#zh 旋转或缩放 dirty 的标记位
   * @property {Number} RS
   * @static
   */
  RS: 1 << 1 | 1 << 2,

  /**
   * !#en Flag for rotation, scale, position, skew dirty
   * !#zh 旋转，缩放，位置，或斜角 dirty 的标记位
   * @property {Number} TRS
   * @static
   */
  TRSS: 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3,

  /**
   * !#en Flag for physics position dirty
   * !#zh 物理位置 dirty 的标记位
   * @property {Number} PHYSICS_POSITION
   * @static
   */
  PHYSICS_POSITION: 1 << 4,

  /**
   * !#en Flag for physics scale dirty
   * !#zh 物理缩放 dirty 的标记位
   * @property {Number} PHYSICS_SCALE
   * @static
   */
  PHYSICS_SCALE: 1 << 5,

  /**
   * !#en Flag for physics rotation dirty
   * !#zh 物理旋转 dirty 的标记位
   * @property {Number} PHYSICS_ROTATION
   * @static
   */
  PHYSICS_ROTATION: 1 << 6,

  /**
   * !#en Flag for physics trs dirty
   * !#zh 物理位置旋转缩放 dirty 的标记位
   * @property {Number} PHYSICS_TRS
   * @static
   */
  PHYSICS_TRS: 1 << 4 | 1 << 5 | 1 << 6,

  /**
   * !#en Flag for physics rs dirty
   * !#zh 物理旋转缩放 dirty 的标记位
   * @property {Number} PHYSICS_RS
   * @static
   */
  PHYSICS_RS: 1 << 5 | 1 << 6,

  /**
   * !#en Flag for node and physics position dirty
   * !#zh 所有位置 dirty 的标记位
   * @property {Number} ALL_POSITION
   * @static
   */
  ALL_POSITION: 1 << 0 | 1 << 4,

  /**
   * !#en Flag for node and physics scale dirty
   * !#zh 所有缩放 dirty 的标记位
   * @property {Number} ALL_SCALE
   * @static
   */
  ALL_SCALE: 1 << 1 | 1 << 5,

  /**
   * !#en Flag for node and physics rotation dirty
   * !#zh 所有旋转 dirty 的标记位
   * @property {Number} ALL_ROTATION
   * @static
   */
  ALL_ROTATION: 1 << 2 | 1 << 6,

  /**
   * !#en Flag for node and physics trs dirty
   * !#zh 所有trs dirty 的标记位
   * @property {Number} ALL_TRS
   * @static
   */
  ALL_TRS: 1 << 0 | 1 << 1 | 1 << 2 | 1 << 4 | 1 << 5 | 1 << 6,

  /**
   * !#en Flag for all dirty properties
   * !#zh 覆盖所有 dirty 状态的标记位
   * @property {Number} ALL
   * @static
   */
  ALL: 0xffff
});
/**
 * !#en The event type supported by Node
 * !#zh Node 支持的事件类型
 * @class Node.EventType
 * @static
 * @namespace Node
 */
// Why EventType defined as class, because the first parameter of Node.on method needs set as 'string' type.

var EventType = cc.Enum({
  /**
   * !#en The event type for touch start event, you can use its value directly: 'touchstart'
   * !#zh 当手指触摸到屏幕时。
   * @property {String} TOUCH_START
   * @static
   */
  TOUCH_START: 'touchstart',

  /**
   * !#en The event type for touch move event, you can use its value directly: 'touchmove'
   * !#zh 当手指在屏幕上移动时。
   * @property {String} TOUCH_MOVE
   * @static
   */
  TOUCH_MOVE: 'touchmove',

  /**
   * !#en The event type for touch end event, you can use its value directly: 'touchend'
   * !#zh 当手指在目标节点区域内离开屏幕时。
   * @property {String} TOUCH_END
   * @static
   */
  TOUCH_END: 'touchend',

  /**
   * !#en The event type for touch end event, you can use its value directly: 'touchcancel'
   * !#zh 当手指在目标节点区域外离开屏幕时。
   * @property {String} TOUCH_CANCEL
   * @static
   */
  TOUCH_CANCEL: 'touchcancel',

  /**
   * !#en The event type for mouse down events, you can use its value directly: 'mousedown'
   * !#zh 当鼠标按下时触发一次。
   * @property {String} MOUSE_DOWN
   * @static
   */
  MOUSE_DOWN: 'mousedown',

  /**
   * !#en The event type for mouse move events, you can use its value directly: 'mousemove'
   * !#zh 当鼠标在目标节点在目标节点区域中移动时，不论是否按下。
   * @property {String} MOUSE_MOVE
   * @static
   */
  MOUSE_MOVE: 'mousemove',

  /**
   * !#en The event type for mouse enter target events, you can use its value directly: 'mouseenter'
   * !#zh 当鼠标移入目标节点区域时，不论是否按下。
   * @property {String} MOUSE_ENTER
   * @static
   */
  MOUSE_ENTER: 'mouseenter',

  /**
   * !#en The event type for mouse leave target events, you can use its value directly: 'mouseleave'
   * !#zh 当鼠标移出目标节点区域时，不论是否按下。
   * @property {String} MOUSE_LEAVE
   * @static
   */
  MOUSE_LEAVE: 'mouseleave',

  /**
   * !#en The event type for mouse up events, you can use its value directly: 'mouseup'
   * !#zh 当鼠标从按下状态松开时触发一次。
   * @property {String} MOUSE_UP
   * @static
   */
  MOUSE_UP: 'mouseup',

  /**
   * !#en The event type for mouse wheel events, you can use its value directly: 'mousewheel'
   * !#zh 当鼠标滚轮滚动时。
   * @property {String} MOUSE_WHEEL
   * @static
   */
  MOUSE_WHEEL: 'mousewheel',

  /**
   * !#en The event type for position change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点位置改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} POSITION_CHANGED
   * @static
   */
  POSITION_CHANGED: 'position-changed',

  /**
   * !#en The event type for rotation change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点旋转改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} ROTATION_CHANGED
   * @static
   */
  ROTATION_CHANGED: 'rotation-changed',

  /**
   * !#en The event type for scale change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点缩放改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} SCALE_CHANGED
   * @static
   */
  SCALE_CHANGED: 'scale-changed',

  /**
   * !#en The event type for size change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点尺寸改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} SIZE_CHANGED
   * @static
   */
  SIZE_CHANGED: 'size-changed',

  /**
   * !#en The event type for anchor point change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点锚点改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} ANCHOR_CHANGED
   * @static
   */
  ANCHOR_CHANGED: 'anchor-changed',

  /**
  * !#en The event type for color change events.
  * Performance note, this event will be triggered every time corresponding properties being changed,
  * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
  * !#zh 当节点颜色改变时触发的事件。
  * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
  * @property {String} COLOR_CHANGED
  * @static
  */
  COLOR_CHANGED: 'color-changed',

  /**
   * !#en The event type for new child added events.
   * !#zh 当新的子节点被添加时触发的事件。
   * @property {String} CHILD_ADDED
   * @static
   */
  CHILD_ADDED: 'child-added',

  /**
   * !#en The event type for child removed events.
   * !#zh 当子节点被移除时触发的事件。
   * @property {String} CHILD_REMOVED
   * @static
   */
  CHILD_REMOVED: 'child-removed',

  /**
   * !#en The event type for children reorder events.
   * !#zh 当子节点顺序改变时触发的事件。
   * @property {String} CHILD_REORDER
   * @static
   */
  CHILD_REORDER: 'child-reorder',

  /**
   * !#en The event type for node group changed events.
   * !#zh 当节点归属群组发生变化时触发的事件。
   * @property {String} GROUP_CHANGED
   * @static
   */
  GROUP_CHANGED: 'group-changed',

  /**
   * !#en The event type for node's sibling order changed.
   * !#zh 当节点在兄弟节点中的顺序发生变化时触发的事件。
   * @property {String} SIBLING_ORDER_CHANGED
   * @static
   */
  SIBLING_ORDER_CHANGED: 'sibling-order-changed'
});
var _touchEvents = [EventType.TOUCH_START, EventType.TOUCH_MOVE, EventType.TOUCH_END, EventType.TOUCH_CANCEL];
var _mouseEvents = [EventType.MOUSE_DOWN, EventType.MOUSE_ENTER, EventType.MOUSE_MOVE, EventType.MOUSE_LEAVE, EventType.MOUSE_UP, EventType.MOUSE_WHEEL];
var _skewNeedWarn = true;

var _skewWarn = function _skewWarn(value, node) {
  if (value !== 0) {
    var nodePath = "";

    if (CC_EDITOR) {
      var NodeUtils = Editor.require('scene://utils/node');

      nodePath = "Node: " + NodeUtils.getNodePath(node) + ".";
    }

    _skewNeedWarn && cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", nodePath);
    !CC_EDITOR && (_skewNeedWarn = false);
  }
};

var _currentHovered = null;

var _touchStartHandler = function _touchStartHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.TOUCH_START;
    event.touch = touch;
    event.bubbles = true;
    node.dispatchEvent(event);
    return true;
  }

  return false;
};

var _touchMoveHandler = function _touchMoveHandler(touch, event) {
  var node = this.owner;
  event.type = EventType.TOUCH_MOVE;
  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _touchEndHandler = function _touchEndHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.TOUCH_END;
  } else {
    event.type = EventType.TOUCH_CANCEL;
  }

  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _touchCancelHandler = function _touchCancelHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;
  event.type = EventType.TOUCH_CANCEL;
  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _mouseDownHandler = function _mouseDownHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_DOWN;
    event.bubbles = true;
    node.dispatchEvent(event);
  }
};

var _mouseMoveHandler = function _mouseMoveHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  var hit = node._hitTest(pos, this);

  if (hit) {
    if (!this._previousIn) {
      // Fix issue when hover node switched, previous hovered node won't get MOUSE_LEAVE notification
      if (_currentHovered && _currentHovered._mouseListener) {
        event.type = EventType.MOUSE_LEAVE;

        _currentHovered.dispatchEvent(event);

        _currentHovered._mouseListener._previousIn = false;
      }

      _currentHovered = this.owner;
      event.type = EventType.MOUSE_ENTER;
      node.dispatchEvent(event);
      this._previousIn = true;
    }

    event.type = EventType.MOUSE_MOVE;
    event.bubbles = true;
    node.dispatchEvent(event);
  } else if (this._previousIn) {
    event.type = EventType.MOUSE_LEAVE;
    node.dispatchEvent(event);
    this._previousIn = false;
    _currentHovered = null;
  } else {
    // continue dispatching
    return;
  } // Event processed, cleanup


  event.stopPropagation();
};

var _mouseUpHandler = function _mouseUpHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_UP;
    event.bubbles = true;
    node.dispatchEvent(event);
    event.stopPropagation();
  }
};

var _mouseWheelHandler = function _mouseWheelHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_WHEEL;
    event.bubbles = true;
    node.dispatchEvent(event);
    event.stopPropagation();
  }
};

function _searchComponentsInParent(node, comp) {
  if (comp) {
    var index = 0;
    var list = null;

    for (var curr = node; curr && cc.Node.isNode(curr); curr = curr._parent, ++index) {
      if (curr.getComponent(comp)) {
        var next = {
          index: index,
          node: curr
        };

        if (list) {
          list.push(next);
        } else {
          list = [next];
        }
      }
    }

    return list;
  }

  return null;
}

function _checkListeners(node, events) {
  if (!(node._objFlags & Destroying)) {
    if (node._bubblingListeners) {
      for (var i = 0, l = events.length; i < l; ++i) {
        if (node._bubblingListeners.hasEventListener(events[i])) {
          return true;
        }
      }
    }

    if (node._capturingListeners) {
      for (var _i = 0, _l = events.length; _i < _l; ++_i) {
        if (node._capturingListeners.hasEventListener(events[_i])) {
          return true;
        }
      }
    }

    return false;
  }

  return true;
}

function _doDispatchEvent(owner, event) {
  var target, i;
  event.target = owner; // Event.CAPTURING_PHASE

  _cachedArray.length = 0;

  owner._getCapturingTargets(event.type, _cachedArray); // capturing


  event.eventPhase = 1;

  for (i = _cachedArray.length - 1; i >= 0; --i) {
    target = _cachedArray[i];

    if (target._capturingListeners) {
      event.currentTarget = target; // fire event

      target._capturingListeners.emit(event.type, event, _cachedArray); // check if propagation stopped


      if (event._propagationStopped) {
        _cachedArray.length = 0;
        return;
      }
    }
  }

  _cachedArray.length = 0; // Event.AT_TARGET
  // checks if destroyed in capturing callbacks

  event.eventPhase = 2;
  event.currentTarget = owner;

  if (owner._capturingListeners) {
    owner._capturingListeners.emit(event.type, event);
  }

  if (!event._propagationImmediateStopped && owner._bubblingListeners) {
    owner._bubblingListeners.emit(event.type, event);
  }

  if (!event._propagationStopped && event.bubbles) {
    // Event.BUBBLING_PHASE
    owner._getBubblingTargets(event.type, _cachedArray); // propagate


    event.eventPhase = 3;

    for (i = 0; i < _cachedArray.length; ++i) {
      target = _cachedArray[i];

      if (target._bubblingListeners) {
        event.currentTarget = target; // fire event

        target._bubblingListeners.emit(event.type, event); // check if propagation stopped


        if (event._propagationStopped) {
          _cachedArray.length = 0;
          return;
        }
      }
    }
  }

  _cachedArray.length = 0;
} // traversal the node tree, child cullingMask must keep the same with the parent.


function _getActualGroupIndex(node) {
  var groupIndex = node.groupIndex;

  if (groupIndex === 0 && node.parent) {
    groupIndex = _getActualGroupIndex(node.parent);
  }

  return groupIndex;
}

function _updateCullingMask(node) {
  var index = _getActualGroupIndex(node);

  node._cullingMask = 1 << index;

  if (CC_JSB && CC_NATIVERENDERER) {
    node._proxy && node._proxy.updateCullingMask();
  }

  for (var i = 0; i < node._children.length; i++) {
    _updateCullingMask(node._children[i]);
  }
} // 2D/3D matrix functions


function updateLocalMatrix3D() {
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    // Update transform
    var t = this._matrix;
    var tm = t.m;

    _valueTypes.Trs.toMat4(t, this._trs); // skew


    if (this._skewX || this._skewY) {
      var a = tm[0],
          b = tm[1],
          c = tm[4],
          d = tm[5];
      var skx = Math.tan(this._skewX * ONE_DEGREE);
      var sky = Math.tan(this._skewY * ONE_DEGREE);
      if (skx === Infinity) skx = 99999999;
      if (sky === Infinity) sky = 99999999;
      tm[0] = a + c * sky;
      tm[1] = b + d * sky;
      tm[4] = c + a * skx;
      tm[5] = d + b * skx;
    }

    this._localMatDirty &= ~LocalDirtyFlag.TRSS; // Register dirty status of world matrix so that it can be recalculated

    this._worldMatDirty = true;
  }
}

function updateLocalMatrix2D() {
  var dirtyFlag = this._localMatDirty;
  if (!(dirtyFlag & LocalDirtyFlag.TRSS)) return; // Update transform

  var t = this._matrix;
  var tm = t.m;
  var trs = this._trs;

  if (dirtyFlag & (LocalDirtyFlag.RS | LocalDirtyFlag.SKEW)) {
    var rotation = -this._eulerAngles.z;
    var hasSkew = this._skewX || this._skewY;
    var sx = trs[7],
        sy = trs[8];

    if (rotation || hasSkew) {
      var a = 1,
          b = 0,
          c = 0,
          d = 1; // rotation

      if (rotation) {
        var rotationRadians = rotation * ONE_DEGREE;
        c = Math.sin(rotationRadians);
        d = Math.cos(rotationRadians);
        a = d;
        b = -c;
      } // scale


      tm[0] = a *= sx;
      tm[1] = b *= sx;
      tm[4] = c *= sy;
      tm[5] = d *= sy; // skew

      if (hasSkew) {
        var _a = tm[0],
            _b = tm[1],
            _c = tm[4],
            _d = tm[5];
        var skx = Math.tan(this._skewX * ONE_DEGREE);
        var sky = Math.tan(this._skewY * ONE_DEGREE);
        if (skx === Infinity) skx = 99999999;
        if (sky === Infinity) sky = 99999999;
        tm[0] = _a + _c * sky;
        tm[1] = _b + _d * sky;
        tm[4] = _c + _a * skx;
        tm[5] = _d + _b * skx;
      }
    } else {
      tm[0] = sx;
      tm[1] = 0;
      tm[4] = 0;
      tm[5] = sy;
    }
  } // position


  tm[12] = trs[0];
  tm[13] = trs[1];
  this._localMatDirty &= ~LocalDirtyFlag.TRSS; // Register dirty status of world matrix so that it can be recalculated

  this._worldMatDirty = true;
}

function calculWorldMatrix3D() {
  // Avoid as much function call as possible
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    this._updateLocalMatrix();
  }

  if (this._parent) {
    var parentMat = this._parent._worldMatrix;

    _valueTypes.Mat4.mul(this._worldMatrix, parentMat, this._matrix);
  } else {
    _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
  }

  this._worldMatDirty = false;
}

function calculWorldMatrix2D() {
  // Avoid as much function call as possible
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    this._updateLocalMatrix();
  } // Assume parent world matrix is correct


  var parent = this._parent;

  if (parent) {
    this._mulMat(this._worldMatrix, parent._worldMatrix, this._matrix);
  } else {
    _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
  }

  this._worldMatDirty = false;
}

function mulMat2D(out, a, b) {
  var am = a.m,
      bm = b.m,
      outm = out.m;
  var aa = am[0],
      ab = am[1],
      ac = am[4],
      ad = am[5],
      atx = am[12],
      aty = am[13];
  var ba = bm[0],
      bb = bm[1],
      bc = bm[4],
      bd = bm[5],
      btx = bm[12],
      bty = bm[13];

  if (ab !== 0 || ac !== 0) {
    outm[0] = ba * aa + bb * ac;
    outm[1] = ba * ab + bb * ad;
    outm[4] = bc * aa + bd * ac;
    outm[5] = bc * ab + bd * ad;
    outm[12] = aa * btx + ac * bty + atx;
    outm[13] = ab * btx + ad * bty + aty;
  } else {
    outm[0] = ba * aa;
    outm[1] = bb * ad;
    outm[4] = bc * aa;
    outm[5] = bd * ad;
    outm[12] = aa * btx + atx;
    outm[13] = ad * bty + aty;
  }
}

var mulMat3D = _valueTypes.Mat4.mul;
/**
 * !#en
 * Class of all entities in Cocos Creator scenes.<br/>
 * For events supported by Node, please refer to {{#crossLink "Node.EventType"}}{{/crossLink}}
 * !#zh
 * Cocos Creator 场景中的所有节点类。<br/>
 * 支持的节点事件，请参阅 {{#crossLink "Node.EventType"}}{{/crossLink}}。
 * @class Node
 * @extends _BaseNode
 */

var NodeDefines = {
  name: 'cc.Node',
  "extends": BaseNode,
  properties: {
    // SERIALIZABLE
    _opacity: 255,
    _color: cc.Color.WHITE,
    _contentSize: cc.Size,
    _anchorPoint: cc.v2(0.5, 0.5),
    _position: undefined,
    _scale: undefined,
    _trs: null,
    _eulerAngles: cc.Vec3,
    _skewX: 0.0,
    _skewY: 0.0,
    _zIndex: {
      "default": undefined,
      type: cc.Integer
    },
    _localZOrder: {
      "default": 0,
      serializable: false
    },
    _is3DNode: false,
    // internal properties

    /**
     * !#en
     * Group index of node.<br/>
     * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
     * !#zh
     * 节点的分组索引。<br/>
     * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
     * @property groupIndex
     * @type {Integer}
     * @default 0
     */
    _groupIndex: {
      "default": 0,
      formerlySerializedAs: 'groupIndex'
    },
    groupIndex: {
      get: function get() {
        return this._groupIndex;
      },
      set: function set(value) {
        this._groupIndex = value;

        _updateCullingMask(this);

        this.emit(EventType.GROUP_CHANGED, this);
      }
    },

    /**
     * !#en
     * Group of node.<br/>
     * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
     * !#zh
     * 节点的分组。<br/>
     * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
     * @property group
     * @type {String}
     */
    group: {
      get: function get() {
        return cc.game.groupList[this.groupIndex] || '';
      },
      set: function set(value) {
        // update the groupIndex
        this.groupIndex = cc.game.groupList.indexOf(value);
      }
    },
    //properties moved from base node begin

    /**
     * !#en The position (x, y) of the node in its parent's coordinates.
     * !#zh 节点在父节点坐标系中的位置（x, y）。
     * @property {Vec3} position
     * @example
     * cc.log("Node Position: " + node.position);
     */

    /**
     * !#en x axis position of node.
     * !#zh 节点 X 轴坐标。
     * @property x
     * @type {Number}
     * @example
     * node.x = 100;
     * cc.log("Node Position X: " + node.x);
     */
    x: {
      get: function get() {
        return this._trs[0];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[0]) {
          if (!CC_EDITOR || isFinite(value)) {
            var oldValue;

            if (CC_EDITOR) {
              oldValue = trs[0];
            }

            trs[0] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

            if (this._eventMask & POSITION_ON) {
              // send event
              if (CC_EDITOR) {
                this.emit(EventType.POSITION_CHANGED, new cc.Vec3(oldValue, trs[1], trs[2]));
              } else {
                this.emit(EventType.POSITION_CHANGED);
              }
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new x');
          }
        }
      }
    },

    /**
     * !#en y axis position of node.
     * !#zh 节点 Y 轴坐标。
     * @property y
     * @type {Number}
     * @example
     * node.y = 100;
     * cc.log("Node Position Y: " + node.y);
     */
    y: {
      get: function get() {
        return this._trs[1];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[1]) {
          if (!CC_EDITOR || isFinite(value)) {
            var oldValue;

            if (CC_EDITOR) {
              oldValue = trs[1];
            }

            trs[1] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

            if (this._eventMask & POSITION_ON) {
              // send event
              if (CC_EDITOR) {
                this.emit(EventType.POSITION_CHANGED, new cc.Vec3(trs[0], oldValue, trs[2]));
              } else {
                this.emit(EventType.POSITION_CHANGED);
              }
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new y');
          }
        }
      }
    },

    /**
     * !#en z axis position of node.
     * !#zh 节点 Z 轴坐标。
     * @property z
     * @type {Number}
     */
    z: {
      get: function get() {
        return this._trs[2];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[2]) {
          if (!CC_EDITOR || isFinite(value)) {
            var oldValue;

            if (CC_EDITOR) {
              oldValue = trs[2];
            }

            trs[2] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);
            !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM); // fast check event

            if (this._eventMask & POSITION_ON) {
              if (CC_EDITOR) {
                this.emit(EventType.POSITION_CHANGED, new cc.Vec3(trs[0], trs[1], oldValue));
              } else {
                this.emit(EventType.POSITION_CHANGED);
              }
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new z');
          }
        }
      }
    },

    /**
     * !#en Rotation of node.
     * !#zh 该节点旋转角度。
     * @property rotation
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.rotation = 90;
     * cc.log("Node Rotation: " + node.rotation);
     */
    rotation: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotation` is deprecated since v2.1.0, please use `-angle` instead. (`this.node.rotation` -> `-this.node.angle`)");
        }

        return -this.angle;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotation` is deprecated since v2.1.0, please set `-angle` instead. (`this.node.rotation = x` -> `this.node.angle = -x`)");
        }

        this.angle = -value;
      }
    },

    /**
     * !#en
     * Angle of node, the positive value is anti-clockwise direction.
     * !#zh
     * 该节点的旋转角度，正值为逆时针方向。
     * @property angle
     * @type {Number}
     */
    angle: {
      get: function get() {
        return this._eulerAngles.z;
      },
      set: function set(value) {
        _valueTypes.Vec3.set(this._eulerAngles, 0, 0, value);

        _valueTypes.Trs.fromAngleZ(this._trs, value);

        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }
      }
    },

    /**
     * !#en The rotation as Euler angles in degrees, used in 3D node.
     * !#zh 该节点的欧拉角度，用于 3D 节点。
     * @property eulerAngles
     * @type {Vec3}
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(45, 45, 45);
     * cc.log("Node eulerAngles (X, Y, Z): " + node.eulerAngles.toString());
     */

    /**
     * !#en Rotation on x axis.
     * !#zh 该节点 X 轴旋转角度。
     * @property rotationX
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(45, 0, 0);
     * cc.log("Node eulerAngles X: " + node.eulerAngles.x);
     */
    rotationX: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationX` is deprecated since v2.1.0, please use `eulerAngles.x` instead. (`this.node.rotationX` -> `this.node.eulerAngles.x`)");
        }

        return this._eulerAngles.x;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationX` is deprecated since v2.1.0, please set `eulerAngles` instead. (`this.node.rotationX = x` -> `this.node.is3DNode = true; this.node.eulerAngles = cc.v3(x, 0, 0)`");
        }

        if (this._eulerAngles.x !== value) {
          this._eulerAngles.x = value; // Update quaternion from rotation

          if (this._eulerAngles.x === this._eulerAngles.y) {
            _valueTypes.Trs.fromAngleZ(this._trs, -value);
          } else {
            _valueTypes.Trs.fromEulerNumber(this._trs, value, this._eulerAngles.y, 0);
          }

          this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

          if (this._eventMask & ROTATION_ON) {
            this.emit(EventType.ROTATION_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Rotation on y axis.
     * !#zh 该节点 Y 轴旋转角度。
     * @property rotationY
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(0, 45, 0);
     * cc.log("Node eulerAngles Y: " + node.eulerAngles.y);
     */
    rotationY: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationY` is deprecated since v2.1.0, please use `eulerAngles.y` instead. (`this.node.rotationY` -> `this.node.eulerAngles.y`)");
        }

        return this._eulerAngles.y;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationY` is deprecated since v2.1.0, please set `eulerAngles` instead. (`this.node.rotationY = y` -> `this.node.is3DNode = true; this.node.eulerAngles = cc.v3(0, y, 0)`");
        }

        if (this._eulerAngles.y !== value) {
          this._eulerAngles.y = value; // Update quaternion from rotation

          if (this._eulerAngles.x === this._eulerAngles.y) {
            _valueTypes.Trs.fromAngleZ(this._trs, -value);
          } else {
            _valueTypes.Trs.fromEulerNumber(this._trs, this._eulerAngles.x, value, 0);
          }

          this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

          if (this._eventMask & ROTATION_ON) {
            this.emit(EventType.ROTATION_CHANGED);
          }
        }
      }
    },
    eulerAngles: {
      get: function get() {
        if (CC_EDITOR) {
          return this._eulerAngles;
        } else {
          return _valueTypes.Trs.toEuler(this._eulerAngles, this._trs);
        }
      },
      set: function set(v) {
        if (CC_EDITOR) {
          this._eulerAngles.set(v);
        }

        _valueTypes.Trs.fromEuler(this._trs, v);

        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);
        !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }
      }
    },
    // This property is used for Mesh Skeleton Animation
    // Should be removed when node.rotation upgrade to quaternion value
    quat: {
      get: function get() {
        var trs = this._trs;
        return new _valueTypes.Quat(trs[3], trs[4], trs[5], trs[6]);
      },
      set: function set(v) {
        this.setRotation(v);
      }
    },

    /**
     * !#en The local scale relative to the parent.
     * !#zh 节点相对父节点的缩放。
     * @property scale
     * @type {Number}
     * @example
     * node.scale = 1;
     */
    scale: {
      get: function get() {
        return this._trs[7];
      },
      set: function set(v) {
        this.setScale(v);
      }
    },

    /**
     * !#en Scale on x axis.
     * !#zh 节点 X 轴缩放。
     * @property scaleX
     * @type {Number}
     * @example
     * node.scaleX = 0.5;
     * cc.log("Node Scale X: " + node.scaleX);
     */
    scaleX: {
      get: function get() {
        return this._trs[7];
      },
      set: function set(value) {
        if (this._trs[7] !== value) {
          this._trs[7] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Scale on y axis.
     * !#zh 节点 Y 轴缩放。
     * @property scaleY
     * @type {Number}
     * @example
     * node.scaleY = 0.5;
     * cc.log("Node Scale Y: " + node.scaleY);
     */
    scaleY: {
      get: function get() {
        return this._trs[8];
      },
      set: function set(value) {
        if (this._trs[8] !== value) {
          this._trs[8] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Scale on z axis.
     * !#zh 节点 Z 轴缩放。
     * @property scaleZ
     * @type {Number}
     */
    scaleZ: {
      get: function get() {
        return this._trs[9];
      },
      set: function set(value) {
        if (this._trs[9] !== value) {
          this._trs[9] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
          !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Skew x
     * !#zh 该节点 X 轴倾斜角度。
     * @property skewX
     * @type {Number}
     * @example
     * node.skewX = 0;
     * cc.log("Node SkewX: " + node.skewX);
     * @deprecated since v2.2.1
     */
    skewX: {
      get: function get() {
        return this._skewX;
      },
      set: function set(value) {
        _skewWarn(value, this);

        this._skewX = value;
        this.setLocalDirty(LocalDirtyFlag.SKEW);

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.updateSkew();
        }
      }
    },

    /**
     * !#en Skew y
     * !#zh 该节点 Y 轴倾斜角度。
     * @property skewY
     * @type {Number}
     * @example
     * node.skewY = 0;
     * cc.log("Node SkewY: " + node.skewY);
     * @deprecated since v2.2.1
     */
    skewY: {
      get: function get() {
        return this._skewY;
      },
      set: function set(value) {
        _skewWarn(value, this);

        this._skewY = value;
        this.setLocalDirty(LocalDirtyFlag.SKEW);

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.updateSkew();
        }
      }
    },

    /**
     * !#en Opacity of node, default value is 255.
     * !#zh 节点透明度，默认值为 255。
     * @property opacity
     * @type {Number}
     * @example
     * node.opacity = 255;
     */
    opacity: {
      get: function get() {
        return this._opacity;
      },
      set: function set(value) {
        value = cc.misc.clampf(value, 0, 255);

        if (this._opacity !== value) {
          this._opacity = value;

          if (CC_JSB && CC_NATIVERENDERER) {
            this._proxy.updateOpacity();
          }

          this._renderFlag |= RenderFlow.FLAG_OPACITY_COLOR;
        }
      },
      range: [0, 255]
    },

    /**
     * !#en Color of node, default value is white: (255, 255, 255).
     * !#zh 节点颜色。默认为白色，数值为：（255，255，255）。
     * @property color
     * @type {Color}
     * @example
     * node.color = new cc.Color(255, 255, 255);
     */
    color: {
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);

          if (CC_DEV && value.a !== 255) {
            cc.warnID(1626);
          }

          this._renderFlag |= RenderFlow.FLAG_COLOR;

          if (this._eventMask & COLOR_ON) {
            this.emit(EventType.COLOR_CHANGED, value);
          }
        }
      }
    },

    /**
     * !#en Anchor point's position on x axis.
     * !#zh 节点 X 轴锚点位置。
     * @property anchorX
     * @type {Number}
     * @example
     * node.anchorX = 0;
     */
    anchorX: {
      get: function get() {
        return this._anchorPoint.x;
      },
      set: function set(value) {
        var anchorPoint = this._anchorPoint;

        if (anchorPoint.x !== value) {
          anchorPoint.x = value;

          if (this._eventMask & ANCHOR_ON) {
            this.emit(EventType.ANCHOR_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Anchor point's position on y axis.
     * !#zh 节点 Y 轴锚点位置。
     * @property anchorY
     * @type {Number}
     * @example
     * node.anchorY = 0;
     */
    anchorY: {
      get: function get() {
        return this._anchorPoint.y;
      },
      set: function set(value) {
        var anchorPoint = this._anchorPoint;

        if (anchorPoint.y !== value) {
          anchorPoint.y = value;

          if (this._eventMask & ANCHOR_ON) {
            this.emit(EventType.ANCHOR_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Width of node.
     * !#zh 节点宽度。
     * @property width
     * @type {Number}
     * @example
     * node.width = 100;
     */
    width: {
      get: function get() {
        return this._contentSize.width;
      },
      set: function set(value) {
        if (value !== this._contentSize.width) {
          if (CC_EDITOR) {
            var clone = cc.size(this._contentSize.width, this._contentSize.height);
          }

          this._contentSize.width = value;

          if (this._eventMask & SIZE_ON) {
            if (CC_EDITOR) {
              this.emit(EventType.SIZE_CHANGED, clone);
            } else {
              this.emit(EventType.SIZE_CHANGED);
            }
          }
        }
      }
    },

    /**
     * !#en Height of node.
     * !#zh 节点高度。
     * @property height
     * @type {Number}
     * @example
     * node.height = 100;
     */
    height: {
      get: function get() {
        return this._contentSize.height;
      },
      set: function set(value) {
        if (value !== this._contentSize.height) {
          if (CC_EDITOR) {
            var clone = cc.size(this._contentSize.width, this._contentSize.height);
          }

          this._contentSize.height = value;

          if (this._eventMask & SIZE_ON) {
            if (CC_EDITOR) {
              this.emit(EventType.SIZE_CHANGED, clone);
            } else {
              this.emit(EventType.SIZE_CHANGED);
            }
          }
        }
      }
    },

    /**
     * !#en zIndex is the 'key' used to sort the node relative to its siblings.<br/>
     * The value of zIndex should be in the range between cc.macro.MIN_ZINDEX and cc.macro.MAX_ZINDEX.<br/>
     * The Node's parent will sort all its children based on the zIndex value and the arrival order.<br/>
     * Nodes with greater zIndex will be sorted after nodes with smaller zIndex.<br/>
     * If two nodes have the same zIndex, then the node that was added first to the children's array will be in front of the other node in the array.<br/>
     * Node's order in children list will affect its rendering order. Parent is always rendering before all children.
     * !#zh zIndex 是用来对节点进行排序的关键属性，它决定一个节点在兄弟节点之间的位置。<br/>
     * zIndex 的取值应该介于 cc.macro.MIN_ZINDEX 和 cc.macro.MAX_ZINDEX 之间
     * 父节点主要根据节点的 zIndex 和添加次序来排序，拥有更高 zIndex 的节点将被排在后面，如果两个节点的 zIndex 一致，先添加的节点会稳定排在另一个节点之前。<br/>
     * 节点在 children 中的顺序决定了其渲染顺序。父节点永远在所有子节点之前被渲染
     * @property zIndex
     * @type {Number}
     * @example
     * node.zIndex = 1;
     * cc.log("Node zIndex: " + node.zIndex);
     */
    zIndex: {
      get: function get() {
        return this._localZOrder >> 16;
      },
      set: function set(value) {
        if (value > macro.MAX_ZINDEX) {
          cc.warnID(1636);
          value = macro.MAX_ZINDEX;
        } else if (value < macro.MIN_ZINDEX) {
          cc.warnID(1637);
          value = macro.MIN_ZINDEX;
        }

        if (this.zIndex !== value) {
          this._localZOrder = this._localZOrder & 0x0000ffff | value << 16;
          this.emit(EventType.SIBLING_ORDER_CHANGED);

          this._onSiblingIndexChanged();
        }
      }
    },

    /**
     * !#en
     * Switch 2D/3D node. The 2D nodes will run faster.
     * !#zh
     * 切换 2D/3D 节点，2D 节点会有更高的运行效率
     * @property {Boolean} is3DNode
     * @default false
    */
    is3DNode: {
      get: function get() {
        return this._is3DNode;
      },
      set: function set(v) {
        this._is3DNode = v;

        this._update3DFunction();
      }
    },

    /**
     * !#en Returns a normalized vector representing the up direction (Y axis) of the node in world space.
     * !#zh 获取节点正上方（y 轴）面对的方向，返回值为世界坐标系下的归一化向量
     *
     * @property up
     * @type {Vec3}
     */
    up: {
      get: function get() {
        var _up = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.UP, this.getWorldRotation(_urfQuat));

        return _up.clone();
      }
    },

    /**
     * !#en Returns a normalized vector representing the right direction (X axis) of the node in world space.
     * !#zh 获取节点正右方（x 轴）面对的方向，返回值为世界坐标系下的归一化向量
     *
     * @property right
     * @type {Vec3}
     */
    right: {
      get: function get() {
        var _right = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.RIGHT, this.getWorldRotation(_urfQuat));

        return _right.clone();
      }
    },

    /**
     * !#en Returns a normalized vector representing the forward direction (Z axis) of the node in world space.
     * !#zh 获取节点正前方（z 轴）面对的方向，返回值为世界坐标系下的归一化向量
     *
     * @property forward
     * @type {Vec3}
     */
    forward: {
      get: function get() {
        var _forward = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.FORWARD, this.getWorldRotation(_urfQuat));

        return _forward.clone();
      }
    }
  },
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor() {
    this._reorderChildDirty = false; // cache component

    this._widget = null; // fast render component access

    this._renderComponent = null; // Event listeners

    this._capturingListeners = null;
    this._bubblingListeners = null; // Touch event listener

    this._touchListener = null; // Mouse event listener

    this._mouseListener = null;

    this._initDataFromPool();

    this._eventMask = 0;
    this._cullingMask = 1;
    this._childArrivalOrder = 1; // Proxy

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy = new renderer.NodeProxy(this._spaceInfo.unitID, this._spaceInfo.index, this._id, this._name);

      this._proxy.init(this);
    } // should reset _renderFlag for both web and native


    this._renderFlag = RenderFlow.FLAG_TRANSFORM | RenderFlow.FLAG_OPACITY_COLOR;
  },
  statics: {
    EventType: EventType,
    _LocalDirtyFlag: LocalDirtyFlag,
    // is node but not scene
    isNode: function isNode(obj) {
      return obj instanceof Node && (obj.constructor === Node || !(obj instanceof cc.Scene));
    },
    BuiltinGroupIndex: BuiltinGroupIndex
  },
  // OVERRIDES
  _onSiblingIndexChanged: function _onSiblingIndexChanged() {
    // update rendering scene graph, sort them by arrivalOrder
    if (this._parent) {
      this._parent._delaySort();
    }
  },
  _onPreDestroy: function _onPreDestroy() {
    var destroyByParent = this._onPreDestroyBase(); // Actions


    if (ActionManagerExist) {
      cc.director.getActionManager().removeAllActionsFromTarget(this);
    } // Remove Node.currentHovered


    if (_currentHovered === this) {
      _currentHovered = null;
    }

    this._bubblingListeners && this._bubblingListeners.clear();
    this._capturingListeners && this._capturingListeners.clear(); // Remove all event listeners if necessary

    if (this._touchListener || this._mouseListener) {
      eventManager.removeListeners(this);

      if (this._touchListener) {
        this._touchListener.owner = null;
        this._touchListener.mask = null;
        this._touchListener = null;
      }

      if (this._mouseListener) {
        this._mouseListener.owner = null;
        this._mouseListener.mask = null;
        this._mouseListener = null;
      }
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.destroy();

      this._proxy = null;
    }

    this._backDataIntoPool();

    if (this._reorderChildDirty) {
      cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }

    if (!destroyByParent) {
      // simulate some destruct logic to make undo system work correctly
      if (CC_EDITOR) {
        // ensure this node can reattach to scene by undo system
        this._parent = null;
      }
    }
  },
  _onPostActivated: function _onPostActivated(active) {
    var actionManager = ActionManagerExist ? cc.director.getActionManager() : null;

    if (active) {
      // Refresh transform
      this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM; // ActionManager & EventManager

      actionManager && actionManager.resumeTarget(this);
      eventManager.resumeTarget(this); // Search Mask in parent

      this._checkListenerMask();
    } else {
      // deactivate
      actionManager && actionManager.pauseTarget(this);
      eventManager.pauseTarget(this);
    }
  },
  _onHierarchyChanged: function _onHierarchyChanged(oldParent) {
    this._updateOrderOfArrival(); // Fixed a bug where children and parent node groups were forced to synchronize, instead of only synchronizing `_cullingMask` value


    _updateCullingMask(this);

    if (this._parent) {
      this._parent._delaySort();
    }

    this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM;

    this._onHierarchyChangedBase(oldParent);

    if (cc._widgetManager) {
      cc._widgetManager._nodesOrderDirty = true;
    }

    if (oldParent && this._activeInHierarchy) {
      //TODO: It may be necessary to update the listener mask of all child nodes.
      this._checkListenerMask();
    } // Node proxy


    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.updateParent();
    }
  },
  // INTERNAL
  _update3DFunction: function _update3DFunction() {
    if (this._is3DNode) {
      this._updateLocalMatrix = updateLocalMatrix3D;
      this._calculWorldMatrix = calculWorldMatrix3D;
      this._mulMat = mulMat3D;
    } else {
      this._updateLocalMatrix = updateLocalMatrix2D;
      this._calculWorldMatrix = calculWorldMatrix2D;
      this._mulMat = mulMat2D;
    }

    if (this._renderComponent && this._renderComponent._on3DNodeChanged) {
      this._renderComponent._on3DNodeChanged();
    }

    this._renderFlag |= RenderFlow.FLAG_TRANSFORM;
    this._localMatDirty = LocalDirtyFlag.ALL;

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.update3DNode();
    }
  },
  _initDataFromPool: function _initDataFromPool() {
    if (!this._spaceInfo) {
      if (CC_EDITOR || CC_TEST) {
        this._spaceInfo = {
          trs: new Float64Array(10),
          localMat: new Float64Array(16),
          worldMat: new Float64Array(16)
        };
      } else {
        this._spaceInfo = nodeMemPool.pop();
      }
    }

    var spaceInfo = this._spaceInfo;
    this._matrix = cc.mat4(spaceInfo.localMat);

    _valueTypes.Mat4.identity(this._matrix);

    this._worldMatrix = cc.mat4(spaceInfo.worldMat);

    _valueTypes.Mat4.identity(this._worldMatrix);

    this._localMatDirty = LocalDirtyFlag.ALL;
    this._worldMatDirty = true;
    var trs = this._trs = spaceInfo.trs;
    trs[0] = 0; // position.x

    trs[1] = 0; // position.y

    trs[2] = 0; // position.z

    trs[3] = 0; // rotation.x

    trs[4] = 0; // rotation.y

    trs[5] = 0; // rotation.z

    trs[6] = 1; // rotation.w

    trs[7] = 1; // scale.x

    trs[8] = 1; // scale.y

    trs[9] = 1; // scale.z
  },
  _backDataIntoPool: function _backDataIntoPool() {
    if (!(CC_EDITOR || CC_TEST)) {
      // push back to pool
      nodeMemPool.push(this._spaceInfo);
      this._matrix = null;
      this._worldMatrix = null;
      this._trs = null;
      this._spaceInfo = null;
    }
  },
  _toEuler: function _toEuler() {
    if (this.is3DNode) {
      _valueTypes.Trs.toEuler(this._eulerAngles, this._trs);
    } else {
      var z = Math.asin(this._trs[5]) / ONE_DEGREE * 2;

      _valueTypes.Vec3.set(this._eulerAngles, 0, 0, z);
    }
  },
  _fromEuler: function _fromEuler() {
    if (this.is3DNode) {
      _valueTypes.Trs.fromEuler(this._trs, this._eulerAngles);
    } else {
      _valueTypes.Trs.fromAngleZ(this._trs, this._eulerAngles.z);
    }
  },
  _initProperties: function _initProperties() {
    if (this._is3DNode) {
      this._update3DFunction();
    }

    var trs = this._trs;

    if (trs) {
      var desTrs = trs;
      trs = this._trs = this._spaceInfo.trs; // just adapt to old trs

      if (desTrs.length === 11) {
        trs.set(desTrs.subarray(1));
      } else {
        trs.set(desTrs);
      }
    } else {
      trs = this._trs = this._spaceInfo.trs;
    }

    if (CC_EDITOR) {
      if (this._skewX !== 0 || this._skewY !== 0) {
        var NodeUtils = Editor.require('scene://utils/node');

        cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", "Node: " + NodeUtils.getNodePath(this) + ".");
      }
    }

    this._fromEuler();

    if (CC_JSB && CC_NATIVERENDERER) {
      this._renderFlag |= RenderFlow.FLAG_TRANSFORM | RenderFlow.FLAG_OPACITY_COLOR;
    }
  },

  /*
   * The initializer for Node which will be called before all components onLoad
   */
  _onBatchCreated: function _onBatchCreated(dontSyncChildPrefab) {
    this._initProperties(); // Fixed a bug where children and parent node groups were forced to synchronize, instead of only synchronizing `_cullingMask` value


    this._cullingMask = 1 << _getActualGroupIndex(this);

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy && this._proxy.updateCullingMask();
    }

    if (!this._activeInHierarchy) {
      if (CC_EDITOR ? cc.director.getActionManager() : ActionManagerExist) {
        // deactivate ActionManager and EventManager by default
        cc.director.getActionManager().pauseTarget(this);
      }

      eventManager.pauseTarget(this);
    }

    var children = this._children;

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];

      if (!dontSyncChildPrefab) {
        // sync child prefab
        var prefabInfo = child._prefab;

        if (prefabInfo && prefabInfo.sync && prefabInfo.root === child) {
          PrefabHelper.syncWithPrefab(child);
        }

        child._updateOrderOfArrival();
      }

      child._onBatchCreated(dontSyncChildPrefab);
    }

    if (children.length > 0) {
      this._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.initNative();
    }
  },
  // EVENT TARGET
  _checkListenerMask: function _checkListenerMask() {
    // Because Mask may be nested, need to find all the Mask components in the parent node.
    // The click area must satisfy all Masks to trigger the click.
    if (this._touchListener) {
      var mask = this._touchListener.mask = _searchComponentsInParent(this, cc.Mask);

      if (this._mouseListener) {
        this._mouseListener.mask = mask;
      }
    } else if (this._mouseListener) {
      this._mouseListener.mask = _searchComponentsInParent(this, cc.Mask);
    }
  },
  _checknSetupSysEvent: function _checknSetupSysEvent(type) {
    var newAdded = false;
    var forDispatch = false;

    if (_touchEvents.indexOf(type) !== -1) {
      if (!this._touchListener) {
        this._touchListener = cc.EventListener.create({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          owner: this,
          mask: _searchComponentsInParent(this, cc.Mask),
          onTouchBegan: _touchStartHandler,
          onTouchMoved: _touchMoveHandler,
          onTouchEnded: _touchEndHandler,
          onTouchCancelled: _touchCancelHandler
        });
        eventManager.addListener(this._touchListener, this);
        newAdded = true;
      }

      forDispatch = true;
    } else if (_mouseEvents.indexOf(type) !== -1) {
      if (!this._mouseListener) {
        this._mouseListener = cc.EventListener.create({
          event: cc.EventListener.MOUSE,
          _previousIn: false,
          owner: this,
          mask: _searchComponentsInParent(this, cc.Mask),
          onMouseDown: _mouseDownHandler,
          onMouseMove: _mouseMoveHandler,
          onMouseUp: _mouseUpHandler,
          onMouseScroll: _mouseWheelHandler
        });
        eventManager.addListener(this._mouseListener, this);
        newAdded = true;
      }

      forDispatch = true;
    }

    if (newAdded && !this._activeInHierarchy) {
      cc.director.getScheduler().schedule(function () {
        if (!this._activeInHierarchy) {
          eventManager.pauseTarget(this);
        }
      }, this, 0, 0, 0, false);
    }

    return forDispatch;
  },

  /**
   * !#en
   * Register a callback of a specific event type on Node.<br/>
   * Use this method to register touch or mouse event permit propagation based on scene graph,<br/>
   * These kinds of event are triggered with dispatchEvent, the dispatch process has three steps:<br/>
   * 1. Capturing phase: dispatch in capture targets (`_getCapturingTargets`), e.g. parents in node tree, from root to the real target<br/>
   * 2. At target phase: dispatch to the listeners of the real target<br/>
   * 3. Bubbling phase: dispatch in bubble targets (`_getBubblingTargets`), e.g. parents in node tree, from the real target to root<br/>
   * In any moment of the dispatching process, it can be stopped via `event.stopPropagation()` or `event.stopPropagationImmidiate()`.<br/>
   * It's the recommended way to register touch/mouse event for Node,<br/>
   * please do not use cc.eventManager directly for Node.<br/>
   * You can also register custom event and use `emit` to trigger custom event on Node.<br/>
   * For such events, there won't be capturing and bubbling phase, your event will be dispatched directly to its listeners registered on the same node.<br/>
   * You can also pass event callback parameters with `emit` by passing parameters after `type`.
   * !#zh
   * 在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的 this 对象。<br/>
   * 鼠标或触摸事件会被系统调用 dispatchEvent 方法触发，触发的过程包含三个阶段：<br/>
   * 1. 捕获阶段：派发事件给捕获目标（通过 `_getCapturingTargets` 获取），比如，节点树中注册了捕获阶段的父节点，从根节点开始派发直到目标节点。<br/>
   * 2. 目标阶段：派发给目标节点的监听器。<br/>
   * 3. 冒泡阶段：派发事件给冒泡目标（通过 `_getBubblingTargets` 获取），比如，节点树中注册了冒泡阶段的父节点，从目标节点开始派发直到根节点。<br/>
   * 同时您可以将事件派发到父节点或者通过调用 stopPropagation 拦截它。<br/>
   * 推荐使用这种方式来监听节点上的触摸或鼠标事件，请不要在节点上直接使用 cc.eventManager。<br/>
   * 你也可以注册自定义事件到节点上，并通过 emit 方法触发此类事件，对于这类事件，不会发生捕获冒泡阶段，只会直接派发给注册在该节点上的监听器<br/>
   * 你可以通过在 emit 方法调用时在 type 之后传递额外的参数作为事件回调的参数列表
   * @method on
   * @param {String|Node.EventType} type - A string representing the event type to listen for.<br>See {{#crossLink "Node/EventTyupe/POSITION_CHANGED"}}Node Events{{/crossLink}} for all builtin events.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched. The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {Event|any} [callback.event] event or first argument when emit
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @param {Boolean} [useCapture=false] - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
   * node.on(cc.Node.EventType.TOUCH_START, callback, this);
   * node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
   * node.on(cc.Node.EventType.TOUCH_END, callback, this);
   * node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this);
   * node.on(cc.Node.EventType.ANCHOR_CHANGED, callback);
   * node.on(cc.Node.EventType.COLOR_CHANGED, callback);
   */
  on: function on(type, callback, target, useCapture) {
    var forDispatch = this._checknSetupSysEvent(type);

    if (forDispatch) {
      return this._onDispatch(type, callback, target, useCapture);
    } else {
      switch (type) {
        case EventType.POSITION_CHANGED:
          this._eventMask |= POSITION_ON;
          break;

        case EventType.SCALE_CHANGED:
          this._eventMask |= SCALE_ON;
          break;

        case EventType.ROTATION_CHANGED:
          this._eventMask |= ROTATION_ON;
          break;

        case EventType.SIZE_CHANGED:
          this._eventMask |= SIZE_ON;
          break;

        case EventType.ANCHOR_CHANGED:
          this._eventMask |= ANCHOR_ON;
          break;

        case EventType.COLOR_CHANGED:
          this._eventMask |= COLOR_ON;
          break;
      }

      if (!this._bubblingListeners) {
        this._bubblingListeners = new EventTarget();
      }

      return this._bubblingListeners.on(type, callback, target);
    }
  },

  /**
   * !#en
   * Register an callback of a specific event type on the Node,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册节点的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {Event|any} [callback.event] event or first argument when emit
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @typescript
   * once<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * node.once(cc.Node.EventType.ANCHOR_CHANGED, callback);
   */
  once: function once(type, callback, target, useCapture) {
    var _this = this;

    var forDispatch = this._checknSetupSysEvent(type);

    var listeners = null;

    if (forDispatch && useCapture) {
      listeners = this._capturingListeners = this._capturingListeners || new EventTarget();
    } else {
      listeners = this._bubblingListeners = this._bubblingListeners || new EventTarget();
    }

    listeners.once(type, callback, target);
    listeners.once(type, function () {
      _this.off(type, callback, target);
    }, undefined);
  },
  _onDispatch: function _onDispatch(type, callback, target, useCapture) {
    // Accept also patameters like: (type, callback, useCapture)
    if (typeof target === 'boolean') {
      useCapture = target;
      target = undefined;
    } else useCapture = !!useCapture;

    if (!callback) {
      cc.errorID(6800);
      return;
    }

    var listeners = null;

    if (useCapture) {
      listeners = this._capturingListeners = this._capturingListeners || new EventTarget();
    } else {
      listeners = this._bubblingListeners = this._bubblingListeners || new EventTarget();
    }

    if (!listeners.hasEventListener(type, callback, target)) {
      listeners.on(type, callback, target);

      if (target && target.__eventTargets) {
        target.__eventTargets.push(this);
      }
    }

    return callback;
  },

  /**
   * !#en
   * Removes the callback previously registered with the same type, callback, target and or useCapture.
   * This method is merely an alias to removeEventListener.
   * !#zh 删除之前与同类型，回调，目标或 useCapture 注册的回调。
   * @method off
   * @param {String} type - A string representing the event type being removed.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
   * @param {Boolean} [useCapture=false] - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
   * @example
   * this.node.off(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
   * node.off(cc.Node.EventType.TOUCH_START, callback, this.node);
   * node.off(cc.Node.EventType.ANCHOR_CHANGED, callback, this);
   */
  off: function off(type, callback, target, useCapture) {
    var touchEvent = _touchEvents.indexOf(type) !== -1;
    var mouseEvent = !touchEvent && _mouseEvents.indexOf(type) !== -1;

    if (touchEvent || mouseEvent) {
      this._offDispatch(type, callback, target, useCapture);

      if (touchEvent) {
        if (this._touchListener && !_checkListeners(this, _touchEvents)) {
          eventManager.removeListener(this._touchListener);
          this._touchListener = null;
        }
      } else if (mouseEvent) {
        if (this._mouseListener && !_checkListeners(this, _mouseEvents)) {
          eventManager.removeListener(this._mouseListener);
          this._mouseListener = null;
        }
      }
    } else if (this._bubblingListeners) {
      this._bubblingListeners.off(type, callback, target);

      var hasListeners = this._bubblingListeners.hasEventListener(type); // All listener removed


      if (!hasListeners) {
        switch (type) {
          case EventType.POSITION_CHANGED:
            this._eventMask &= ~POSITION_ON;
            break;

          case EventType.SCALE_CHANGED:
            this._eventMask &= ~SCALE_ON;
            break;

          case EventType.ROTATION_CHANGED:
            this._eventMask &= ~ROTATION_ON;
            break;

          case EventType.SIZE_CHANGED:
            this._eventMask &= ~SIZE_ON;
            break;

          case EventType.ANCHOR_CHANGED:
            this._eventMask &= ~ANCHOR_ON;
            break;

          case EventType.COLOR_CHANGED:
            this._eventMask &= ~COLOR_ON;
            break;
        }
      }
    }
  },
  _offDispatch: function _offDispatch(type, callback, target, useCapture) {
    // Accept also patameters like: (type, callback, useCapture)
    if (typeof target === 'boolean') {
      useCapture = target;
      target = undefined;
    } else useCapture = !!useCapture;

    if (!callback) {
      this._capturingListeners && this._capturingListeners.removeAll(type);
      this._bubblingListeners && this._bubblingListeners.removeAll(type);
    } else {
      var listeners = useCapture ? this._capturingListeners : this._bubblingListeners;

      if (listeners) {
        listeners.off(type, callback, target);

        if (target && target.__eventTargets) {
          js.array.fastRemove(target.__eventTargets, this);
        }
      }
    }
  },

  /**
   * !#en Removes all callbacks previously registered with the same target.
   * !#zh 移除目标上的所有注册事件。
   * @method targetOff
   * @param {Object} target - The target to be searched for all related callbacks
   * @example
   * node.targetOff(target);
   */
  targetOff: function targetOff(target) {
    var listeners = this._bubblingListeners;

    if (listeners) {
      listeners.targetOff(target); // Check for event mask reset

      if (this._eventMask & POSITION_ON && !listeners.hasEventListener(EventType.POSITION_CHANGED)) {
        this._eventMask &= ~POSITION_ON;
      }

      if (this._eventMask & SCALE_ON && !listeners.hasEventListener(EventType.SCALE_CHANGED)) {
        this._eventMask &= ~SCALE_ON;
      }

      if (this._eventMask & ROTATION_ON && !listeners.hasEventListener(EventType.ROTATION_CHANGED)) {
        this._eventMask &= ~ROTATION_ON;
      }

      if (this._eventMask & SIZE_ON && !listeners.hasEventListener(EventType.SIZE_CHANGED)) {
        this._eventMask &= ~SIZE_ON;
      }

      if (this._eventMask & ANCHOR_ON && !listeners.hasEventListener(EventType.ANCHOR_CHANGED)) {
        this._eventMask &= ~ANCHOR_ON;
      }

      if (this._eventMask & COLOR_ON && !listeners.hasEventListener(EventType.COLOR_CHANGED)) {
        this._eventMask &= ~COLOR_ON;
      }
    }

    if (this._capturingListeners) {
      this._capturingListeners.targetOff(target);
    }

    if (target && target.__eventTargets) {
      js.array.fastRemove(target.__eventTargets, this);
    }

    if (this._touchListener && !_checkListeners(this, _touchEvents)) {
      eventManager.removeListener(this._touchListener);
      this._touchListener = null;
    }

    if (this._mouseListener && !_checkListeners(this, _mouseEvents)) {
      eventManager.removeListener(this._mouseListener);
      this._mouseListener = null;
    }
  },

  /**
   * !#en Checks whether the EventTarget object has any callback registered for a specific type of event.
   * !#zh 检查事件目标对象是否有为特定类型的事件注册的回调。
   * @method hasEventListener
   * @param {String} type - The type of event.
   * @return {Boolean} True if a callback of the specified type is registered; false otherwise.
   */
  hasEventListener: function hasEventListener(type) {
    var has = false;

    if (this._bubblingListeners) {
      has = this._bubblingListeners.hasEventListener(type);
    }

    if (!has && this._capturingListeners) {
      has = this._capturingListeners.hasEventListener(type);
    }

    return has;
  },

  /**
   * !#en
   * Trigger an event directly with the event name and necessary arguments.
   * !#zh
   * 通过事件名发送自定义事件
   *
   * @method emit
   * @param {String} type - event type
   * @param {*} [arg1] - First argument in callback
   * @param {*} [arg2] - Second argument in callback
   * @param {*} [arg3] - Third argument in callback
   * @param {*} [arg4] - Fourth argument in callback
   * @param {*} [arg5] - Fifth argument in callback
   * @example
   *
   * eventTarget.emit('fire', event);
   * eventTarget.emit('fire', message, emitter);
   */
  emit: function emit(type, arg1, arg2, arg3, arg4, arg5) {
    if (this._bubblingListeners) {
      this._bubblingListeners.emit(type, arg1, arg2, arg3, arg4, arg5);
    }
  },

  /**
   * !#en
   * Dispatches an event into the event flow.
   * The event target is the EventTarget object upon which the dispatchEvent() method is called.
   * !#zh 分发事件到事件流中。
   *
   * @method dispatchEvent
   * @param {Event} event - The Event object that is dispatched into the event flow
   */
  dispatchEvent: function dispatchEvent(event) {
    _doDispatchEvent(this, event);

    _cachedArray.length = 0;
  },

  /**
   * !#en Pause node related system events registered with the current Node. Node system events includes touch and mouse events.
   * If recursive is set to true, then this API will pause the node system events for the node and all nodes in its sub node tree.
   * Reference: http://docs.cocos2d-x.org/editors_and_tools/creator-chapters/scripting/internal-events/
   * !#zh 暂停当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
   * 如果传递 recursive 为 true，那么这个 API 将暂停本节点和它的子树上所有节点的节点系统事件。
   * 参考：https://www.cocos.com/docs/creator/scripting/internal-events.html
   * @method pauseSystemEvents
   * @param {Boolean} recursive - Whether to pause node system events on the sub node tree.
   * @example
   * node.pauseSystemEvents(true);
   */
  pauseSystemEvents: function pauseSystemEvents(recursive) {
    eventManager.pauseTarget(this, recursive);
  },

  /**
   * !#en Resume node related system events registered with the current Node. Node system events includes touch and mouse events.
   * If recursive is set to true, then this API will resume the node system events for the node and all nodes in its sub node tree.
   * Reference: http://docs.cocos2d-x.org/editors_and_tools/creator-chapters/scripting/internal-events/
   * !#zh 恢复当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
   * 如果传递 recursive 为 true，那么这个 API 将恢复本节点和它的子树上所有节点的节点系统事件。
   * 参考：https://www.cocos.com/docs/creator/scripting/internal-events.html
   * @method resumeSystemEvents
   * @param {Boolean} recursive - Whether to resume node system events on the sub node tree.
   * @example
   * node.resumeSystemEvents(true);
   */
  resumeSystemEvents: function resumeSystemEvents(recursive) {
    eventManager.resumeTarget(this, recursive);
  },
  _hitTest: function _hitTest(point, listener) {
    var w = this._contentSize.width,
        h = this._contentSize.height,
        cameraPt = _htVec3a,
        testPt = _htVec3b;
    var camera = cc.Camera.findCamera(this);

    if (camera) {
      camera.getScreenToWorldPoint(point, cameraPt);
    } else {
      cameraPt.set(point);
    }

    this._updateWorldMatrix(); // If scale is 0, it can't be hit.


    if (!_valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix)) {
      return false;
    }

    _valueTypes.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);

    testPt.x += this._anchorPoint.x * w;
    testPt.y += this._anchorPoint.y * h;
    var hit = false;

    if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
      hit = true;

      if (listener && listener.mask) {
        var mask = listener.mask;
        var parent = this;
        var length = mask ? mask.length : 0; // find mask parent, should hit test it

        for (var i = 0, j = 0; parent && j < length; ++i, parent = parent.parent) {
          var temp = mask[j];

          if (i === temp.index) {
            if (parent === temp.node) {
              var comp = parent.getComponent(cc.Mask);

              if (comp && comp._enabled && !comp._hitTest(cameraPt)) {
                hit = false;
                break;
              }

              j++;
            } else {
              // mask parent no longer exists
              mask.length = j;
              break;
            }
          } else if (i > temp.index) {
            // mask parent no longer exists
            mask.length = j;
            break;
          }
        }
      }
    }

    return hit;
  },

  /**
   * Get all the targets listening to the supplied type of event in the target's capturing phase.
   * The capturing phase comprises the journey from the root to the last node BEFORE the event target's node.
   * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
   *
   * Subclasses can override this method to make event propagable.
   * @method _getCapturingTargets
   * @private
   * @param {String} type - the event type
   * @param {Array} array - the array to receive targets
   * @example {@link cocos2d/core/event/_getCapturingTargets.js}
   */
  _getCapturingTargets: function _getCapturingTargets(type, array) {
    var parent = this.parent;

    while (parent) {
      if (parent._capturingListeners && parent._capturingListeners.hasEventListener(type)) {
        array.push(parent);
      }

      parent = parent.parent;
    }
  },

  /**
   * Get all the targets listening to the supplied type of event in the target's bubbling phase.
   * The bubbling phase comprises any SUBSEQUENT nodes encountered on the return trip to the root of the tree.
   * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
   *
   * Subclasses can override this method to make event propagable.
   * @method _getBubblingTargets
   * @private
   * @param {String} type - the event type
   * @param {Array} array - the array to receive targets
   */
  _getBubblingTargets: function _getBubblingTargets(type, array) {
    var parent = this.parent;

    while (parent) {
      if (parent._bubblingListeners && parent._bubblingListeners.hasEventListener(type)) {
        array.push(parent);
      }

      parent = parent.parent;
    }
  },
  // ACTIONS

  /**
   * !#en
   * Executes an action, and returns the action that is executed.<br/>
   * The node becomes the action's target. Refer to cc.Action's getTarget() <br/>
   * Calling runAction while the node is not active won't have any effect. <br/>
   * Note：You shouldn't modify the action after runAction, that won't take any effect.<br/>
   * if you want to modify, when you define action plus.
   * !#zh
   * 执行并返回该执行的动作。该节点将会变成动作的目标。<br/>
   * 调用 runAction 时，节点自身处于不激活状态将不会有任何效果。<br/>
   * 注意：你不应该修改 runAction 后的动作，将无法发挥作用，如果想进行修改，请在定义 action 时加入。
   * @method runAction
   * @param {Action} action
   * @return {Action} An Action pointer
   * @example
   * var action = cc.scaleTo(0.2, 1, 0.6);
   * node.runAction(action);
   * node.runAction(action).repeatForever(); // fail
   * node.runAction(action.repeatForever()); // right
   */
  runAction: ActionManagerExist ? function (action) {
    if (!this.active) return;
    cc.assertID(action, 1618);
    var am = cc.director.getActionManager();

    if (!am._suppressDeprecation) {
      am._suppressDeprecation = true;
      cc.warnID(1639);
    }

    am.addAction(action, this, false);
    return action;
  } : emptyFunc,

  /**
   * !#en Pause all actions running on the current node. Equals to `cc.director.getActionManager().pauseTarget(node)`.
   * !#zh 暂停本节点上所有正在运行的动作。和 `cc.director.getActionManager().pauseTarget(node);` 等价。
   * @method pauseAllActions
   * @example
   * node.pauseAllActions();
   */
  pauseAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().pauseTarget(this);
  } : emptyFunc,

  /**
   * !#en Resume all paused actions on the current node. Equals to `cc.director.getActionManager().resumeTarget(node)`.
   * !#zh 恢复运行本节点上所有暂停的动作。和 `cc.director.getActionManager().resumeTarget(node);` 等价。
   * @method resumeAllActions
   * @example
   * node.resumeAllActions();
   */
  resumeAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().resumeTarget(this);
  } : emptyFunc,

  /**
   * !#en Stops and removes all actions from the running action list .
   * !#zh 停止并且移除所有正在运行的动作列表。
   * @method stopAllActions
   * @example
   * node.stopAllActions();
   */
  stopAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().removeAllActionsFromTarget(this);
  } : emptyFunc,

  /**
   * !#en Stops and removes an action from the running action list.
   * !#zh 停止并移除指定的动作。
   * @method stopAction
   * @param {Action} action An action object to be removed.
   * @example
   * var action = cc.scaleTo(0.2, 1, 0.6);
   * node.stopAction(action);
   */
  stopAction: ActionManagerExist ? function (action) {
    cc.director.getActionManager().removeAction(action);
  } : emptyFunc,

  /**
   * !#en Removes an action from the running action list by its tag.
   * !#zh 停止并且移除指定标签的动作。
   * @method stopActionByTag
   * @param {Number} tag A tag that indicates the action to be removed.
   * @example
   * node.stopActionByTag(1);
   */
  stopActionByTag: ActionManagerExist ? function (tag) {
    if (tag === cc.Action.TAG_INVALID) {
      cc.logID(1612);
      return;
    }

    cc.director.getActionManager().removeActionByTag(tag, this);
  } : emptyFunc,

  /**
   * !#en Returns an action from the running action list by its tag.
   * !#zh 通过标签获取指定动作。
   * @method getActionByTag
   * @see cc.Action#getTag and cc.Action#setTag
   * @param {Number} tag
   * @return {Action} The action object with the given tag.
   * @example
   * var action = node.getActionByTag(1);
   */
  getActionByTag: ActionManagerExist ? function (tag) {
    if (tag === cc.Action.TAG_INVALID) {
      cc.logID(1613);
      return null;
    }

    return cc.director.getActionManager().getActionByTag(tag, this);
  } : function () {
    return null;
  },

  /**
   * !#en
   * Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).<br/>
   *    Composable actions are counted as 1 action. Example:<br/>
   *    If you are running 1 Sequence of 7 actions, it will return 1. <br/>
   *    If you are running 7 Sequences of 2 actions, it will return 7.</p>
   * !#zh
   * 获取运行着的动作加上正在调度运行的动作的总数。<br/>
   * 例如：<br/>
   * - 如果你正在运行 7 个动作中的 1 个 Sequence，它将返回 1。<br/>
   * - 如果你正在运行 2 个动作中的 7 个 Sequence，它将返回 7。<br/>
   *
   * @method getNumberOfRunningActions
   * @return {Number} The number of actions that are running plus the ones that are schedule to run
   * @example
   * var count = node.getNumberOfRunningActions();
   * cc.log("Running Action Count: " + count);
   */
  getNumberOfRunningActions: ActionManagerExist ? function () {
    return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
  } : function () {
    return 0;
  },
  // TRANSFORM RELATED

  /**
   * !#en
   * Returns a copy of the position (x, y, z) of the node in its parent's coordinates.
   * You can pass a cc.Vec2 or cc.Vec3 as the argument to receive the return values.
   * !#zh
   * 获取节点在父节点坐标系中的位置（x, y, z）。
   * 你可以传一个 cc.Vec2 或者 cc.Vec3 作为参数来接收返回值。
   * @method getPosition
   * @param {Vec2|Vec3} [out] - The return value to receive position
   * @return {Vec2|Vec3} The position (x, y, z) of the node in its parent's coordinates
   * @example
   * cc.log("Node Position: " + node.getPosition());
   */
  getPosition: function getPosition(out) {
    out = out || new _valueTypes.Vec3();
    return _valueTypes.Trs.toPosition(out, this._trs);
  },

  /**
   * !#en
   * Sets the position (x, y, z) of the node in its parent's coordinates.<br/>
   * Usually we use cc.v2(x, y) to compose cc.Vec2 object, in this case, position.z will become 0.<br/>
   * and passing two numbers (x, y) is more efficient than passing cc.Vec2 object, in this case, position.z will remain unchanged.
   * For 3D node we can use cc.v3(x, y, z) to compose cc.Vec3 object,<br/>
   * and passing three numbers (x, y, z) is more efficient than passing cc.Vec3 object.
   * !#zh
   * 设置节点在父节点坐标系中的位置。<br/>
   * 可以通过下面的方式设置坐标点：<br/>
   * 1. 传入 2 个数值 x, y (此时不会改变 position.z 的值)。<br/>
   * 2. 传入 cc.v2(x, y) 类型为 cc.Vec2 的对象 (此时 position.z 的值将被设置为0)。
   * 3. 对于 3D 节点可以传入 3 个数值 x, y, z。<br/>
   * 4. 对于 3D 节点可以传入 cc.v3(x, y, z) 类型为 cc.Vec3 的对象。
   * @method setPosition
   * @param {Vec2|Vec3|Number} x - X coordinate for position or the position object
   * @param {Number} [y] - Y coordinate for position
   * @param {Number} [z] - Z coordinate for position
   */
  setPosition: function setPosition(newPosOrX, y, z) {
    var x;

    if (y === undefined) {
      x = newPosOrX.x;
      y = newPosOrX.y;
      z = newPosOrX.z;
    } else {
      x = newPosOrX;
    }

    var trs = this._trs;

    if (z === undefined) {
      z = trs[2];
    }

    if (trs[0] === x && trs[1] === y && trs[2] === z) {
      return;
    }

    if (CC_EDITOR) {
      var oldPosition = new cc.Vec3(trs[0], trs[1], trs[2]);
    }

    trs[0] = x;
    trs[1] = y;
    trs[2] = z;
    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);
    !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM); // fast check event

    if (this._eventMask & POSITION_ON) {
      if (CC_EDITOR) {
        this.emit(EventType.POSITION_CHANGED, oldPosition);
      } else {
        this.emit(EventType.POSITION_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Returns the scale factor of the node.
   * Need pass a cc.Vec2 or cc.Vec3 as the argument to receive the return values.
   * !#zh 获取节点的缩放，需要传一个 cc.Vec2 或者 cc.Vec3 作为参数来接收返回值。
   * @method getScale
   * @param {Vec2|Vec3} out
   * @return {Vec2|Vec3} The scale factor
   * @example
   * cc.log("Node Scale: " + node.getScale(cc.v3()));
   */
  getScale: function getScale(out) {
    if (out !== undefined) {
      return _valueTypes.Trs.toScale(out, this._trs);
    } else {
      cc.errorID(1400, 'cc.Node.getScale', 'cc.Node.scale or cc.Node.getScale(cc.Vec3)');
      return this._trs[7];
    }
  },

  /**
   * !#en
   * Sets the scale of axis in local coordinates of the node.
   * You can operate 2 axis in 2D node, and 3 axis in 3D node.
   * When only (x, y) is passed, the value of scale.z will not be changed.
   * When a Vec2 is passed in, the value of scale.z will be set to 0.
   * !#zh
   * 设置节点在本地坐标系中坐标轴上的缩放比例。
   * 2D 节点可以操作两个坐标轴，而 3D 节点可以操作三个坐标轴。
   * 当只传入 (x, y) 时，scale.z 的值不会被改变。
   * 当只传入 Vec2 对象时，scale.z 的值将被设置为0。
   * @method setScale
   * @param {Number|Vec2|Vec3} x - scaleX or scale object
   * @param {Number} [y]
   * @param {Number} [z]
   * @example
   * node.setScale(cc.v2(2, 2)); // Notice: scaleZ will be 0
   * node.setScale(cc.v3(2, 2, 2)); // for 3D node
   * node.setScale(2);
   */
  setScale: function setScale(newScaleOrX, y, z) {
    var x; // only one parameter, and it's a Vec2/Vec3:

    if (newScaleOrX && typeof newScaleOrX !== 'number') {
      x = newScaleOrX.x;
      y = newScaleOrX.y;
      z = newScaleOrX.z;
    } // only one parameter, and it's a number:
    else if (newScaleOrX !== undefined && y === undefined) {
        x = newScaleOrX;
        y = newScaleOrX;
        z = newScaleOrX;
      } // two or three paramters:
      else {
          x = newScaleOrX;
        }

    var trs = this._trs;

    if (z === undefined) {
      z = trs[9];
    }

    if (trs[7] !== x || trs[8] !== y || trs[9] !== z) {
      trs[7] = x;
      trs[8] = y;
      trs[9] = z;
      this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
      !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

      if (this._eventMask & SCALE_ON) {
        this.emit(EventType.SCALE_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Get rotation of node (in quaternion).
   * Need pass a cc.Quat as the argument to receive the return values.
   * !#zh
   * 获取该节点的 quaternion 旋转角度，需要传一个 cc.Quat 作为参数来接收返回值。
   * @method getRotation
   * @param {Quat} out
   * @return {Quat} Quaternion object represents the rotation
   */
  getRotation: function getRotation(out) {
    if (out instanceof _valueTypes.Quat) {
      return _valueTypes.Trs.toRotation(out, this._trs);
    } else {
      if (CC_DEBUG) {
        cc.warn("`cc.Node.getRotation()` is deprecated since v2.1.0, please use `-cc.Node.angle` instead. (`this.node.getRotation()` -> `-this.node.angle`)");
      }

      return -this.angle;
    }
  },

  /**
   * !#en Set rotation of node (in quaternion).
   * !#zh 设置该节点的 quaternion 旋转角度。
   * @method setRotation
   * @param {cc.Quat|Number} quat Quaternion object represents the rotation or the x value of quaternion
   * @param {Number} [y] y value of quternion
   * @param {Number} [z] z value of quternion
   * @param {Number} [w] w value of quternion
   */
  setRotation: function setRotation(rotation, y, z, w) {
    if (typeof rotation === 'number' && y === undefined) {
      if (CC_DEBUG) {
        cc.warn("`cc.Node.setRotation(degree)` is deprecated since v2.1.0, please set `-cc.Node.angle` instead. (`this.node.setRotation(x)` -> `this.node.angle = -x`)");
      }

      this.angle = -rotation;
    } else {
      var x = rotation;

      if (y === undefined) {
        x = rotation.x;
        y = rotation.y;
        z = rotation.z;
        w = rotation.w;
      }

      var trs = this._trs;

      if (trs[3] !== x || trs[4] !== y || trs[5] !== z || trs[6] !== w) {
        trs[3] = x;
        trs[4] = y;
        trs[5] = z;
        trs[6] = w;
        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }

        if (CC_EDITOR) {
          this._toEuler();
        }
      }
    }
  },

  /**
   * !#en
   * Returns a copy the untransformed size of the node. <br/>
   * The contentSize remains the same no matter the node is scaled or rotated.<br/>
   * All nodes has a size. Layer and Scene has the same size of the screen by default. <br/>
   * !#zh 获取节点自身大小，不受该节点是否被缩放或者旋转的影响。
   * @method getContentSize
   * @return {Size} The untransformed size of the node.
   * @example
   * cc.log("Content Size: " + node.getContentSize());
   */
  getContentSize: function getContentSize() {
    return cc.size(this._contentSize.width, this._contentSize.height);
  },

  /**
   * !#en
   * Sets the untransformed size of the node.<br/>
   * The contentSize remains the same no matter the node is scaled or rotated.<br/>
   * All nodes has a size. Layer and Scene has the same size of the screen.
   * !#zh 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
   * @method setContentSize
   * @param {Size|Number} size - The untransformed size of the node or The untransformed size's width of the node.
   * @param {Number} [height] - The untransformed size's height of the node.
   * @example
   * node.setContentSize(cc.size(100, 100));
   * node.setContentSize(100, 100);
   */
  setContentSize: function setContentSize(size, height) {
    var locContentSize = this._contentSize;
    var clone;

    if (height === undefined) {
      if (size.width === locContentSize.width && size.height === locContentSize.height) return;

      if (CC_EDITOR) {
        clone = cc.size(locContentSize.width, locContentSize.height);
      }

      locContentSize.width = size.width;
      locContentSize.height = size.height;
    } else {
      if (size === locContentSize.width && height === locContentSize.height) return;

      if (CC_EDITOR) {
        clone = cc.size(locContentSize.width, locContentSize.height);
      }

      locContentSize.width = size;
      locContentSize.height = height;
    }

    if (this._eventMask & SIZE_ON) {
      if (CC_EDITOR) {
        this.emit(EventType.SIZE_CHANGED, clone);
      } else {
        this.emit(EventType.SIZE_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Returns a copy of the anchor point.<br/>
   * Anchor point is the point around which all transformations and positioning manipulations take place.<br/>
   * It's like a pin in the node where it is "attached" to its parent. <br/>
   * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner. <br/>
   * But you can use values higher than (1,1) and lower than (0,0) too.  <br/>
   * The default anchor point is (0.5,0.5), so it starts at the center of the node.
   * !#zh
   * 获取节点锚点，用百分比表示。<br/>
   * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
   * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
   * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
   * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
   * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
   * @method getAnchorPoint
   * @return {Vec2} The anchor point of node.
   * @example
   * cc.log("Node AnchorPoint: " + node.getAnchorPoint());
   */
  getAnchorPoint: function getAnchorPoint() {
    return cc.v2(this._anchorPoint);
  },

  /**
   * !#en
   * Sets the anchor point in percent. <br/>
   * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
   * It's like a pin in the node where it is "attached" to its parent. <br/>
   * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
   * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
   * The default anchor point is (0.5,0.5), so it starts at the center of the node.
   * !#zh
   * 设置锚点的百分比。<br/>
   * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
   * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
   * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
   * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
   * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
   * @method setAnchorPoint
   * @param {Vec2|Number} point - The anchor point of node or The x axis anchor of node.
   * @param {Number} [y] - The y axis anchor of node.
   * @example
   * node.setAnchorPoint(cc.v2(1, 1));
   * node.setAnchorPoint(1, 1);
   */
  setAnchorPoint: function setAnchorPoint(point, y) {
    var locAnchorPoint = this._anchorPoint;

    if (y === undefined) {
      if (point.x === locAnchorPoint.x && point.y === locAnchorPoint.y) return;
      locAnchorPoint.x = point.x;
      locAnchorPoint.y = point.y;
    } else {
      if (point === locAnchorPoint.x && y === locAnchorPoint.y) return;
      locAnchorPoint.x = point;
      locAnchorPoint.y = y;
    }

    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);

    if (this._eventMask & ANCHOR_ON) {
      this.emit(EventType.ANCHOR_CHANGED);
    }
  },

  /*
   * Transforms position from world space to local space.
   * @method _invTransformPoint
   * @param {Vec3} out
   * @param {Vec3} vec3
   */
  _invTransformPoint: function _invTransformPoint(out, pos) {
    if (this._parent) {
      this._parent._invTransformPoint(out, pos);
    } else {
      _valueTypes.Vec3.copy(out, pos);
    }

    var ltrs = this._trs; // out = parent_inv_pos - pos

    _valueTypes.Trs.toPosition(_tpVec3a, ltrs);

    _valueTypes.Vec3.sub(out, out, _tpVec3a); // out = inv(rot) * out


    _valueTypes.Trs.toRotation(_tpQuata, ltrs);

    _valueTypes.Quat.conjugate(_tpQuatb, _tpQuata);

    _valueTypes.Vec3.transformQuat(out, out, _tpQuatb); // out = (1/scale) * out


    _valueTypes.Trs.toScale(_tpVec3a, ltrs);

    _valueTypes.Vec3.inverseSafe(_tpVec3b, _tpVec3a);

    _valueTypes.Vec3.mul(out, out, _tpVec3b);

    return out;
  },

  /*
   * Calculate and return world position.
   * This is not a public API yet, its usage could be updated
   * @method getWorldPosition
   * @param {Vec3} out
   * @return {Vec3}
   */
  getWorldPosition: function getWorldPosition(out) {
    _valueTypes.Trs.toPosition(out, this._trs);

    var curr = this._parent;
    var ltrs;

    while (curr) {
      ltrs = curr._trs; // out = parent_scale * pos

      _valueTypes.Trs.toScale(_gwpVec3, ltrs);

      _valueTypes.Vec3.mul(out, out, _gwpVec3); // out = parent_quat * out


      _valueTypes.Trs.toRotation(_gwpQuat, ltrs);

      _valueTypes.Vec3.transformQuat(out, out, _gwpQuat); // out = out + pos


      _valueTypes.Trs.toPosition(_gwpVec3, ltrs);

      _valueTypes.Vec3.add(out, out, _gwpVec3);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world position.
   * This is not a public API yet, its usage could be updated
   * @method setWorldPosition
   * @param {Vec3} pos
   */
  setWorldPosition: function setWorldPosition(pos) {
    var ltrs = this._trs;

    if (CC_EDITOR) {
      var oldPosition = new cc.Vec3(ltrs[0], ltrs[1], ltrs[2]);
    } // NOTE: this is faster than invert world matrix and transform the point


    if (this._parent) {
      this._parent._invTransformPoint(_swpVec3, pos);
    } else {
      _valueTypes.Vec3.copy(_swpVec3, pos);
    }

    _valueTypes.Trs.fromPosition(ltrs, _swpVec3);

    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

    if (this._eventMask & POSITION_ON) {
      // send event
      if (CC_EDITOR) {
        this.emit(EventType.POSITION_CHANGED, oldPosition);
      } else {
        this.emit(EventType.POSITION_CHANGED);
      }
    }
  },

  /*
   * Calculate and return world rotation
   * This is not a public API yet, its usage could be updated
   * @method getWorldRotation
   * @param {Quat} out
   * @return {Quat}
   */
  getWorldRotation: function getWorldRotation(out) {
    _valueTypes.Trs.toRotation(_gwrQuat, this._trs);

    _valueTypes.Quat.copy(out, _gwrQuat);

    var curr = this._parent;

    while (curr) {
      _valueTypes.Trs.toRotation(_gwrQuat, curr._trs);

      _valueTypes.Quat.mul(out, _gwrQuat, out);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world rotation with quaternion
   * This is not a public API yet, its usage could be updated
   * @method setWorldRotation
   * @param {Quat} val
   */
  setWorldRotation: function setWorldRotation(val) {
    if (this._parent) {
      this._parent.getWorldRotation(_swrQuat);

      _valueTypes.Quat.conjugate(_swrQuat, _swrQuat);

      _valueTypes.Quat.mul(_swrQuat, _swrQuat, val);
    } else {
      _valueTypes.Quat.copy(_swrQuat, val);
    }

    _valueTypes.Trs.fromRotation(this._trs, _swrQuat);

    if (CC_EDITOR) {
      this._toEuler();
    }

    this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);
  },

  /*
   * Calculate and return world scale
   * This is not a public API yet, its usage could be updated
   * @method getWorldScale
   * @param {Vec3} out
   * @return {Vec3}
   */
  getWorldScale: function getWorldScale(out) {
    _valueTypes.Trs.toScale(_gwsVec3, this._trs);

    _valueTypes.Vec3.copy(out, _gwsVec3);

    var curr = this._parent;

    while (curr) {
      _valueTypes.Trs.toScale(_gwsVec3, curr._trs);

      _valueTypes.Vec3.mul(out, out, _gwsVec3);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world scale with vec3
   * This is not a public API yet, its usage could be updated
   * @method setWorldScale
   * @param {Vec3} scale
   */
  setWorldScale: function setWorldScale(scale) {
    if (this._parent) {
      this._parent.getWorldScale(_swsVec3);

      _valueTypes.Vec3.div(_swsVec3, scale, _swsVec3);
    } else {
      _valueTypes.Vec3.copy(_swsVec3, scale);
    }

    _valueTypes.Trs.fromScale(this._trs, _swsVec3);

    this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
  },
  getWorldRT: function getWorldRT(out) {
    var opos = _gwrtVec3a;
    var orot = _gwrtQuata;
    var ltrs = this._trs;

    _valueTypes.Trs.toPosition(opos, ltrs);

    _valueTypes.Trs.toRotation(orot, ltrs);

    var curr = this._parent;

    while (curr) {
      ltrs = curr._trs; // opos = parent_lscale * lpos

      _valueTypes.Trs.toScale(_gwrtVec3b, ltrs);

      _valueTypes.Vec3.mul(opos, opos, _gwrtVec3b); // opos = parent_lrot * opos


      _valueTypes.Trs.toRotation(_gwrtQuatb, ltrs);

      _valueTypes.Vec3.transformQuat(opos, opos, _gwrtQuatb); // opos = opos + lpos


      _valueTypes.Trs.toPosition(_gwrtVec3b, ltrs);

      _valueTypes.Vec3.add(opos, opos, _gwrtVec3b); // orot = lrot * orot


      _valueTypes.Quat.mul(orot, _gwrtQuatb, orot);

      curr = curr._parent;
    }

    _valueTypes.Mat4.fromRT(out, orot, opos);

    return out;
  },

  /**
   * !#en Set rotation by lookAt target point, normally used by Camera Node
   * !#zh 通过观察目标来设置 rotation，一般用于 Camera Node 上
   * @method lookAt
   * @param {Vec3} pos
   * @param {Vec3} [up] - default is (0,1,0)
   */
  lookAt: function lookAt(pos, up) {
    this.getWorldPosition(_laVec3);

    _valueTypes.Vec3.sub(_laVec3, _laVec3, pos); // NOTE: we use -z for view-dir


    _valueTypes.Vec3.normalize(_laVec3, _laVec3);

    _valueTypes.Quat.fromViewUp(_laQuat, _laVec3, up);

    this.setWorldRotation(_laQuat);
  },
  _updateLocalMatrix: updateLocalMatrix2D,
  _calculWorldMatrix: function _calculWorldMatrix() {
    // Avoid as much function call as possible
    if (this._localMatDirty & LocalDirtyFlag.TRSS) {
      this._updateLocalMatrix();
    } // Assume parent world matrix is correct


    var parent = this._parent;

    if (parent) {
      this._mulMat(this._worldMatrix, parent._worldMatrix, this._matrix);
    } else {
      _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
    }

    this._worldMatDirty = false;
  },
  _mulMat: mulMat2D,
  _updateWorldMatrix: function _updateWorldMatrix() {
    if (this._parent) {
      this._parent._updateWorldMatrix();
    }

    if (this._worldMatDirty) {
      this._calculWorldMatrix(); // Sync dirty to children


      var children = this._children;

      for (var i = 0, l = children.length; i < l; i++) {
        children[i]._worldMatDirty = true;
      }
    }
  },
  setLocalDirty: function setLocalDirty(flag) {
    this._localMatDirty |= flag;
    this._worldMatDirty = true;

    if (flag === LocalDirtyFlag.ALL_POSITION || flag === LocalDirtyFlag.POSITION) {
      this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM;
    } else {
      this._renderFlag |= RenderFlow.FLAG_TRANSFORM;
    }
  },
  setWorldDirty: function setWorldDirty() {
    this._worldMatDirty = true;
  },

  /**
   * !#en
   * Get the local transform matrix (4x4), based on parent node coordinates
   * !#zh 返回局部空间坐标系的矩阵，基于父节点坐标系。
   * @method getLocalMatrix
   * @param {Mat4} out The matrix object to be filled with data
   * @return {Mat4} Same as the out matrix object
   * @example
   * let mat4 = cc.mat4();
   * node.getLocalMatrix(mat4);
   */
  getLocalMatrix: function getLocalMatrix(out) {
    this._updateLocalMatrix();

    return _valueTypes.Mat4.copy(out, this._matrix);
  },

  /**
   * !#en
   * Get the world transform matrix (4x4)
   * !#zh 返回世界空间坐标系的矩阵。
   * @method getWorldMatrix
   * @param {Mat4} out The matrix object to be filled with data
   * @return {Mat4} Same as the out matrix object
   * @example
   * let mat4 = cc.mat4();
   * node.getWorldMatrix(mat4);
   */
  getWorldMatrix: function getWorldMatrix(out) {
    this._updateWorldMatrix();

    return _valueTypes.Mat4.copy(out, this._worldMatrix);
  },

  /**
   * !#en
   * Converts a Point to node (local) space coordinates.
   * !#zh
   * 将一个点转换到节点 (局部) 空间坐标系。
   * @method convertToNodeSpaceAR
   * @param {Vec3|Vec2} worldPoint
   * @param {Vec3|Vec2} [out]
   * @return {Vec3|Vec2}
   * @typescript
   * convertToNodeSpaceAR<T extends cc.Vec2 | cc.Vec3>(worldPoint: T, out?: T): T
   * @example
   * var newVec2 = node.convertToNodeSpaceAR(cc.v2(100, 100));
   * var newVec3 = node.convertToNodeSpaceAR(cc.v3(100, 100, 100));
   */
  convertToNodeSpaceAR: function convertToNodeSpaceAR(worldPoint, out) {
    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    if (worldPoint instanceof cc.Vec2) {
      out = out || new cc.Vec2();
      return _valueTypes.Vec2.transformMat4(out, worldPoint, _mat4_temp);
    } else {
      out = out || new cc.Vec3();
      return _valueTypes.Vec3.transformMat4(out, worldPoint, _mat4_temp);
    }
  },

  /**
   * !#en
   * Converts a Point in node coordinates to world space coordinates.
   * !#zh
   * 将节点坐标系下的一个点转换到世界空间坐标系。
   * @method convertToWorldSpaceAR
   * @param {Vec3|Vec2} nodePoint
   * @param {Vec3|Vec2} [out]
   * @return {Vec3|Vec2}
   * @typescript
   * convertToWorldSpaceAR<T extends cc.Vec2 | cc.Vec3>(nodePoint: T, out?: T): T
   * @example
   * var newVec2 = node.convertToWorldSpaceAR(cc.v2(100, 100));
   * var newVec3 = node.convertToWorldSpaceAR(cc.v3(100, 100, 100));
   */
  convertToWorldSpaceAR: function convertToWorldSpaceAR(nodePoint, out) {
    this._updateWorldMatrix();

    if (nodePoint instanceof cc.Vec2) {
      out = out || new cc.Vec2();
      return _valueTypes.Vec2.transformMat4(out, nodePoint, this._worldMatrix);
    } else {
      out = out || new cc.Vec3();
      return _valueTypes.Vec3.transformMat4(out, nodePoint, this._worldMatrix);
    }
  },
  // OLD TRANSFORM ACCESS APIs

  /**
      * !#en Converts a Point to node (local) space coordinates then add the anchor point position.
      * So the return position will be related to the left bottom corner of the node's bounding box.
      * This equals to the API behavior of cocos2d-x, you probably want to use convertToNodeSpaceAR instead
      * !#zh 将一个点转换到节点 (局部) 坐标系，并加上锚点的坐标。<br/>
      * 也就是说返回的坐标是相对于节点包围盒左下角的坐标。<br/>
      * 这个 API 的设计是为了和 cocos2d-x 中行为一致，更多情况下你可能需要使用 convertToNodeSpaceAR。
      * @method convertToNodeSpace
      * @deprecated since v2.1.3
      * @param {Vec2} worldPoint
      * @return {Vec2}
      * @example
      * var newVec2 = node.convertToNodeSpace(cc.v2(100, 100));
      */
  convertToNodeSpace: function convertToNodeSpace(worldPoint) {
    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    var out = new cc.Vec2();

    _valueTypes.Vec2.transformMat4(out, worldPoint, _mat4_temp);

    out.x += this._anchorPoint.x * this._contentSize.width;
    out.y += this._anchorPoint.y * this._contentSize.height;
    return out;
  },

  /**
   * !#en Converts a Point related to the left bottom corner of the node's bounding box to world space coordinates.
   * This equals to the API behavior of cocos2d-x, you probably want to use convertToWorldSpaceAR instead
   * !#zh 将一个相对于节点左下角的坐标位置转换到世界空间坐标系。
   * 这个 API 的设计是为了和 cocos2d-x 中行为一致，更多情况下你可能需要使用 convertToWorldSpaceAR
   * @method convertToWorldSpace
   * @deprecated since v2.1.3
   * @param {Vec2} nodePoint
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertToWorldSpace(cc.v2(100, 100));
   */
  convertToWorldSpace: function convertToWorldSpace(nodePoint) {
    this._updateWorldMatrix();

    var out = new cc.Vec2(nodePoint.x - this._anchorPoint.x * this._contentSize.width, nodePoint.y - this._anchorPoint.y * this._contentSize.height);
    return _valueTypes.Vec2.transformMat4(out, out, this._worldMatrix);
  },

  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
   * The matrix is in Pixels.
   * !#zh 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。这个矩阵以像素为单位。
   * @method getNodeToParentTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToParentTransform(affineTransform);
   */
  getNodeToParentTransform: function getNodeToParentTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    var contentSize = this._contentSize;
    _vec3_temp.x = -this._anchorPoint.x * contentSize.width;
    _vec3_temp.y = -this._anchorPoint.y * contentSize.height;

    _valueTypes.Mat4.copy(_mat4_temp, this._matrix);

    _valueTypes.Mat4.transform(_mat4_temp, _mat4_temp, _vec3_temp);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
   * The matrix is in Pixels.<br/>
   * This method is AR (Anchor Relative).
   * !#zh
   * 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。<br/>
   * 这个矩阵以像素为单位。<br/>
   * 该方法基于节点坐标。
   * @method getNodeToParentTransformAR
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToParentTransformAR(affineTransform);
   */
  getNodeToParentTransformAR: function getNodeToParentTransformAR(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    return AffineTrans.fromMat4(out, this._matrix);
  },

  /**
   * !#en Returns the world affine transform matrix. The matrix is in Pixels.
   * !#zh 返回节点到世界坐标系的仿射变换矩阵。矩阵单位是像素。
   * @method getNodeToWorldTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToWorldTransform(affineTransform);
   */
  getNodeToWorldTransform: function getNodeToWorldTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    var contentSize = this._contentSize;
    _vec3_temp.x = -this._anchorPoint.x * contentSize.width;
    _vec3_temp.y = -this._anchorPoint.y * contentSize.height;

    _valueTypes.Mat4.copy(_mat4_temp, this._worldMatrix);

    _valueTypes.Mat4.transform(_mat4_temp, _mat4_temp, _vec3_temp);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en
   * Returns the world affine transform matrix. The matrix is in Pixels.<br/>
   * This method is AR (Anchor Relative).
   * !#zh
   * 返回节点到世界坐标仿射变换矩阵。矩阵单位是像素。<br/>
   * 该方法基于节点坐标。
   * @method getNodeToWorldTransformAR
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToWorldTransformAR(affineTransform);
   */
  getNodeToWorldTransformAR: function getNodeToWorldTransformAR(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    return AffineTrans.fromMat4(out, this._worldMatrix);
  },

  /**
   * !#en
   * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.<br/>
   * The matrix is in Pixels. The returned transform is readonly and cannot be changed.
   * !#zh
   * 返回将父节点的坐标系转换成节点（局部）的空间坐标系的矩阵。<br/>
   * 该矩阵以像素为单位。返回的矩阵是只读的，不能更改。
   * @method getParentToNodeTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getParentToNodeTransform(affineTransform);
   */
  getParentToNodeTransform: function getParentToNodeTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._matrix);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en Returns the inverse world affine transform matrix. The matrix is in Pixels.
   * !#en 返回世界坐标系到节点坐标系的逆矩阵。
   * @method getWorldToNodeTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getWorldToNodeTransform(affineTransform);
   */
  getWorldToNodeTransform: function getWorldToNodeTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en convenience methods which take a cc.Touch instead of cc.Vec2.
   * !#zh 将触摸点转换成本地坐标系中位置。
   * @method convertTouchToNodeSpace
   * @deprecated since v2.0
   * @param {Touch} touch - The touch object
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertTouchToNodeSpace(touch);
   */
  convertTouchToNodeSpace: function convertTouchToNodeSpace(touch) {
    return this.convertToNodeSpace(touch.getLocation());
  },

  /**
   * !#en converts a cc.Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
   * !#zh 转换一个 cc.Touch（世界坐标）到一个局部坐标，该方法基于节点坐标。
   * @method convertTouchToNodeSpaceAR
   * @deprecated since v2.0
   * @param {Touch} touch - The touch object
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertTouchToNodeSpaceAR(touch);
   */
  convertTouchToNodeSpaceAR: function convertTouchToNodeSpaceAR(touch) {
    return this.convertToNodeSpaceAR(touch.getLocation());
  },

  /**
   * !#en
   * Returns a "local" axis aligned bounding box of the node. <br/>
   * The returned box is relative only to its parent.
   * !#zh 返回父节坐标系下的轴向对齐的包围盒。
   * @method getBoundingBox
   * @return {Rect} The calculated bounding box of the node
   * @example
   * var boundingBox = node.getBoundingBox();
   */
  getBoundingBox: function getBoundingBox() {
    this._updateLocalMatrix();

    var width = this._contentSize.width;
    var height = this._contentSize.height;
    var rect = cc.rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
    return rect.transformMat4(rect, this._matrix);
  },

  /**
   * !#en
   * Returns a "world" axis aligned bounding box of the node.<br/>
   * The bounding box contains self and active children's world bounding box.
   * !#zh
   * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。<br/>
   * 该边框包含自身和已激活的子节点的世界边框。
   * @method getBoundingBoxToWorld
   * @return {Rect}
   * @example
   * var newRect = node.getBoundingBoxToWorld();
   */
  getBoundingBoxToWorld: function getBoundingBoxToWorld() {
    if (this._parent) {
      this._parent._updateWorldMatrix();

      return this._getBoundingBoxTo();
    } else {
      return this.getBoundingBox();
    }
  },
  _getBoundingBoxTo: function _getBoundingBoxTo() {
    var width = this._contentSize.width;
    var height = this._contentSize.height;
    var rect = cc.rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

    this._calculWorldMatrix();

    rect.transformMat4(rect, this._worldMatrix); //query child's BoundingBox

    if (!this._children) return rect;
    var locChildren = this._children;

    for (var i = 0; i < locChildren.length; i++) {
      var child = locChildren[i];

      if (child && child.active) {
        var childRect = child._getBoundingBoxTo();

        if (childRect) rect.union(rect, childRect);
      }
    }

    return rect;
  },
  _updateOrderOfArrival: function _updateOrderOfArrival() {
    var arrivalOrder = this._parent ? ++this._parent._childArrivalOrder : 0;
    this._localZOrder = this._localZOrder & 0xffff0000 | arrivalOrder;
    this.emit(EventType.SIBLING_ORDER_CHANGED);
  },

  /**
   * !#en
   * Adds a child to the node with z order and name.
   * !#zh
   * 添加子节点，并且可以修改该节点的 局部 Z 顺序和名字。
   * @method addChild
   * @param {Node} child - A child node
   * @param {Number} [zIndex] - Z order for drawing priority. Please refer to zIndex property
   * @param {String} [name] - A name to identify the node easily. Please refer to name property
   * @example
   * node.addChild(newNode, 1, "node");
   */
  addChild: function addChild(child, zIndex, name) {
    if (CC_DEV && !cc.Node.isNode(child)) {
      return cc.errorID(1634, cc.js.getClassName(child));
    }

    cc.assertID(child, 1606);
    cc.assertID(child._parent === null, 1605); // invokes the parent setter

    child.parent = this;

    if (zIndex !== undefined) {
      child.zIndex = zIndex;
    }

    if (name !== undefined) {
      child.name = name;
    }
  },

  /**
   * !#en Stops all running actions and schedulers.
   * !#zh 停止所有正在播放的动作和计时器。
   * @method cleanup
   * @example
   * node.cleanup();
   */
  cleanup: function cleanup() {
    // actions
    ActionManagerExist && cc.director.getActionManager().removeAllActionsFromTarget(this); // event

    eventManager.removeListeners(this); // children

    var i,
        len = this._children.length,
        node;

    for (i = 0; i < len; ++i) {
      node = this._children[i];
      if (node) node.cleanup();
    }
  },

  /**
   * !#en Sorts the children array depends on children's zIndex and arrivalOrder,
   * normally you won't need to invoke this function.
   * !#zh 根据子节点的 zIndex 和 arrivalOrder 进行排序，正常情况下开发者不需要手动调用这个函数。
   *
   * @method sortAllChildren
   */
  sortAllChildren: function sortAllChildren() {
    if (this._reorderChildDirty) {
      this._reorderChildDirty = false; // delay update arrivalOrder before sort children

      var _children = this._children,
          child; // reset arrivalOrder before sort children

      this._childArrivalOrder = 1;

      for (var i = 0, len = _children.length; i < len; i++) {
        child = _children[i];

        child._updateOrderOfArrival();
      } // Optimize reordering event code to fix problems with setting zindex
      // https://github.com/cocos-creator/2d-tasks/issues/1186


      eventManager._setDirtyForNode(this);

      if (_children.length > 1) {
        // insertion sort
        var _child, child2;

        for (var _i2 = 1, count = _children.length; _i2 < count; _i2++) {
          _child = _children[_i2];
          var j = _i2;

          for (; j > 0 && (child2 = _children[j - 1])._localZOrder > _child._localZOrder; j--) {
            _children[j] = child2;
          }

          _children[j] = _child;
        }

        this.emit(EventType.CHILD_REORDER, this);
      }

      cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }
  },
  _delaySort: function _delaySort() {
    if (!this._reorderChildDirty) {
      this._reorderChildDirty = true;

      cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }
  },
  _restoreProperties: CC_EDITOR && function () {
    /*
     * TODO: Refine this code after completing undo/redo 2.0.
     * The node will be destroyed when deleting in the editor,
     * but it will be reserved and reused for undo.
    */
    // restore 3d node
    this.is3DNode = this.is3DNode;

    if (!this._matrix) {
      this._matrix = cc.mat4(this._spaceInfo.localMat);

      _valueTypes.Mat4.identity(this._matrix);
    }

    if (!this._worldMatrix) {
      this._worldMatrix = cc.mat4(this._spaceInfo.worldMat);

      _valueTypes.Mat4.identity(this._worldMatrix);
    }

    this._localMatDirty = LocalDirtyFlag.ALL;
    this._worldMatDirty = true;

    this._fromEuler();

    this._renderFlag |= RenderFlow.FLAG_TRANSFORM;

    if (this._renderComponent) {
      this._renderComponent.markForRender(true);
    }

    if (this._children.length > 0) {
      this._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }
  },
  onRestore: CC_EDITOR && function () {
    this._onRestoreBase();

    this._restoreProperties();

    var actionManager = cc.director.getActionManager();

    if (this._activeInHierarchy) {
      actionManager && actionManager.resumeTarget(this);
      eventManager.resumeTarget(this);
    } else {
      actionManager && actionManager.pauseTarget(this);
      eventManager.pauseTarget(this);
    }
  }
};

if (CC_EDITOR) {
  // deprecated, only used to import old data in editor
  js.mixin(NodeDefines.properties, {
    _scaleX: {
      "default": undefined,
      type: cc.Float,
      editorOnly: true
    },
    _scaleY: {
      "default": undefined,
      type: cc.Float,
      editorOnly: true
    }
  });
}

var Node = cc.Class(NodeDefines); // 3D Node Property
// Node Event

/**
 * !#en
 * The position changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.POSITION_CHANGED, callback, this);
 * !#zh
 * 位置变动监听事件, 通过 this.node.on(cc.Node.EventType.POSITION_CHANGED, callback, this); 进行监听。
 * @event position-changed
 * @param {Vec2} oldPos - The old position, but this parameter is only available in editor!
 */

/**
 * !#en
 * The size changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.SIZE_CHANGED, callback, this);
 * !#zh
 * 尺寸变动监听事件，通过 this.node.on(cc.Node.EventType.SIZE_CHANGED, callback, this); 进行监听。
 * @event size-changed
 * @param {Size} oldSize - The old size, but this parameter is only available in editor!
 */

/**
 * !#en
 * The anchor changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback, this);
 * !#zh
 * 锚点变动监听事件，通过 this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback, this); 进行监听。
 * @event anchor-changed
 */

/**
 * !#en
 * The adding child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_ADDED, callback, this);
 * !#zh
 * 增加子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_ADDED, callback, this); 进行监听。
 * @event child-added
 * @param {Node} child - child which have been added
 */

/**
 * !#en
 * The removing child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_REMOVED, callback, this);
 * !#zh
 * 删除子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REMOVED, callback, this); 进行监听。
 * @event child-removed
 * @param {Node} child - child which have been removed
 */

/**
 * !#en
 * The reordering child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_REORDER, callback, this);
 * !#zh
 * 子节点顺序变动监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REORDER, callback, this); 进行监听。
 * @event child-reorder
 * @param {Node} node - node whose children have been reordered
 */

/**
 * !#en
 * The group changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.GROUP_CHANGED, callback, this);
 * !#zh
 * 节点分组变动监听事件，通过 this.node.on(cc.Node.EventType.GROUP_CHANGED, callback, this); 进行监听。
 * @event group-changed
 * @param {Node} node - node whose group has changed
 */
// Deprecated APIs

/**
 * !#en
 * Returns the displayed opacity of Node,
 * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
 * !#zh
 * 获取节点显示透明度，
 * 显示透明度和透明度之间的不同之处在于当启用级连透明度时，
 * 显示透明度是基于自身透明度和父节点透明度计算的。
 *
 * @method getDisplayedOpacity
 * @return {number} displayed opacity
 * @deprecated since v2.0, please use opacity property, cascade opacity is removed
 */

/**
 * !#en
 * Returns the displayed color of Node,
 * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
 * !#zh
 * 获取节点的显示颜色，
 * 显示颜色和颜色之间的不同之处在于当启用级连颜色时，
 * 显示颜色是基于自身颜色和父节点颜色计算的。
 *
 * @method getDisplayedColor
 * @return {Color}
 * @deprecated since v2.0, please use color property, cascade color is removed
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Indicate whether node's opacity value affect its child nodes, default value is true.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 节点的不透明度值是否影响其子节点，默认值为 true。
 * @property cascadeOpacity
 * @deprecated since v2.0
 * @type {Boolean}
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Returns whether node's opacity value affect its child nodes.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 返回节点的不透明度值是否影响其子节点。
 * @method isCascadeOpacityEnabled
 * @deprecated since v2.0
 * @return {Boolean}
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 启用或禁用级连不透明度，如果级连启用，子节点的不透明度将是父不透明度乘上它自己的不透明度。
 * @method setCascadeOpacityEnabled
 * @deprecated since v2.0
 * @param {Boolean} cascadeOpacityEnabled
 */

/**
 * !#en Opacity modify RGB have been removed since v2.0
 * Set whether color should be changed with the opacity value,
 * useless in ccsg.Node, but this function is override in some class to have such behavior.
 * !#zh 透明度影响颜色配置已经被废弃
 * 设置更改透明度时是否修改RGB值，
 * @method setOpacityModifyRGB
 * @deprecated since v2.0
 * @param {Boolean} opacityValue
 */

/**
 * !#en Opacity modify RGB have been removed since v2.0
 * Get whether color should be changed with the opacity value.
 * !#zh 透明度影响颜色配置已经被废弃
 * 获取更改透明度时是否修改RGB值。
 * @method isOpacityModifyRGB
 * @deprecated since v2.0
 * @return {Boolean}
 */

var _p = Node.prototype;
js.getset(_p, 'position', _p.getPosition, _p.setPosition, false, true);

if (CC_EDITOR) {
  var vec3_tmp = new _valueTypes.Vec3();
  cc.js.getset(_p, 'worldEulerAngles', function () {
    var angles = new _valueTypes.Vec3(this._eulerAngles);
    var parent = this.parent;

    while (parent) {
      angles.addSelf(parent._eulerAngles);
      parent = parent.parent;
    }

    return angles;
  }, function (v) {
    vec3_tmp.set(v);
    var parent = this.parent;

    while (parent) {
      vec3_tmp.subSelf(parent._eulerAngles);
      parent = parent.parent;
    }

    this.eulerAngles = vec3_tmp;
  });
}

cc.Node = module.exports = Node;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDTm9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlTm9kZSIsInJlcXVpcmUiLCJQcmVmYWJIZWxwZXIiLCJub2RlTWVtUG9vbCIsIk5vZGVNZW1Qb29sIiwiQWZmaW5lVHJhbnMiLCJldmVudE1hbmFnZXIiLCJtYWNybyIsImpzIiwiRXZlbnQiLCJFdmVudFRhcmdldCIsIlJlbmRlckZsb3ciLCJGbGFncyIsImNjIiwiT2JqZWN0IiwiRGVzdHJveWluZyIsIkVSUl9JTlZBTElEX05VTUJFUiIsIkNDX0VESVRPUiIsIk9ORV9ERUdSRUUiLCJNYXRoIiwiUEkiLCJBY3Rpb25NYW5hZ2VyRXhpc3QiLCJBY3Rpb25NYW5hZ2VyIiwiZW1wdHlGdW5jIiwiX2d3cFZlYzMiLCJWZWMzIiwiX2d3cFF1YXQiLCJRdWF0IiwiX3RwVmVjM2EiLCJfdHBWZWMzYiIsIl90cFF1YXRhIiwiX3RwUXVhdGIiLCJfc3dwVmVjMyIsIl9nd3NWZWMzIiwiX3N3c1ZlYzMiLCJfZ3dydFZlYzNhIiwiX2d3cnRWZWMzYiIsIl9nd3J0UXVhdGEiLCJfZ3dydFF1YXRiIiwiX2xhVmVjMyIsIl9sYVF1YXQiLCJfdXJmVmVjMyIsIl91cmZRdWF0IiwiX2h0VmVjM2EiLCJfaHRWZWMzYiIsIl9nd3JRdWF0IiwiX3N3clF1YXQiLCJfcXVhdGEiLCJfbWF0NF90ZW1wIiwibWF0NCIsIl92ZWMzX3RlbXAiLCJfY2FjaGVkQXJyYXkiLCJBcnJheSIsImxlbmd0aCIsIlBPU0lUSU9OX09OIiwiU0NBTEVfT04iLCJST1RBVElPTl9PTiIsIlNJWkVfT04iLCJBTkNIT1JfT04iLCJDT0xPUl9PTiIsIkJ1aWx0aW5Hcm91cEluZGV4IiwiRW51bSIsIkRFQlVHIiwiTG9jYWxEaXJ0eUZsYWciLCJQT1NJVElPTiIsIlNDQUxFIiwiUk9UQVRJT04iLCJTS0VXIiwiVFJTIiwiUlMiLCJUUlNTIiwiUEhZU0lDU19QT1NJVElPTiIsIlBIWVNJQ1NfU0NBTEUiLCJQSFlTSUNTX1JPVEFUSU9OIiwiUEhZU0lDU19UUlMiLCJQSFlTSUNTX1JTIiwiQUxMX1BPU0lUSU9OIiwiQUxMX1NDQUxFIiwiQUxMX1JPVEFUSU9OIiwiQUxMX1RSUyIsIkFMTCIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsIk1PVVNFX0RPV04iLCJNT1VTRV9NT1ZFIiwiTU9VU0VfRU5URVIiLCJNT1VTRV9MRUFWRSIsIk1PVVNFX1VQIiwiTU9VU0VfV0hFRUwiLCJQT1NJVElPTl9DSEFOR0VEIiwiUk9UQVRJT05fQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJTSVpFX0NIQU5HRUQiLCJBTkNIT1JfQ0hBTkdFRCIsIkNPTE9SX0NIQU5HRUQiLCJDSElMRF9BRERFRCIsIkNISUxEX1JFTU9WRUQiLCJDSElMRF9SRU9SREVSIiwiR1JPVVBfQ0hBTkdFRCIsIlNJQkxJTkdfT1JERVJfQ0hBTkdFRCIsIl90b3VjaEV2ZW50cyIsIl9tb3VzZUV2ZW50cyIsIl9za2V3TmVlZFdhcm4iLCJfc2tld1dhcm4iLCJ2YWx1ZSIsIm5vZGUiLCJub2RlUGF0aCIsIk5vZGVVdGlscyIsIkVkaXRvciIsImdldE5vZGVQYXRoIiwid2FybiIsIl9jdXJyZW50SG92ZXJlZCIsIl90b3VjaFN0YXJ0SGFuZGxlciIsInRvdWNoIiwiZXZlbnQiLCJwb3MiLCJnZXRMb2NhdGlvbiIsIm93bmVyIiwiX2hpdFRlc3QiLCJ0eXBlIiwiYnViYmxlcyIsImRpc3BhdGNoRXZlbnQiLCJfdG91Y2hNb3ZlSGFuZGxlciIsIl90b3VjaEVuZEhhbmRsZXIiLCJfdG91Y2hDYW5jZWxIYW5kbGVyIiwiX21vdXNlRG93bkhhbmRsZXIiLCJfbW91c2VNb3ZlSGFuZGxlciIsImhpdCIsIl9wcmV2aW91c0luIiwiX21vdXNlTGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJfbW91c2VVcEhhbmRsZXIiLCJfbW91c2VXaGVlbEhhbmRsZXIiLCJfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50IiwiY29tcCIsImluZGV4IiwibGlzdCIsImN1cnIiLCJOb2RlIiwiaXNOb2RlIiwiX3BhcmVudCIsImdldENvbXBvbmVudCIsIm5leHQiLCJwdXNoIiwiX2NoZWNrTGlzdGVuZXJzIiwiZXZlbnRzIiwiX29iakZsYWdzIiwiX2J1YmJsaW5nTGlzdGVuZXJzIiwiaSIsImwiLCJoYXNFdmVudExpc3RlbmVyIiwiX2NhcHR1cmluZ0xpc3RlbmVycyIsIl9kb0Rpc3BhdGNoRXZlbnQiLCJ0YXJnZXQiLCJfZ2V0Q2FwdHVyaW5nVGFyZ2V0cyIsImV2ZW50UGhhc2UiLCJjdXJyZW50VGFyZ2V0IiwiZW1pdCIsIl9wcm9wYWdhdGlvblN0b3BwZWQiLCJfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkIiwiX2dldEJ1YmJsaW5nVGFyZ2V0cyIsIl9nZXRBY3R1YWxHcm91cEluZGV4IiwiZ3JvdXBJbmRleCIsInBhcmVudCIsIl91cGRhdGVDdWxsaW5nTWFzayIsIl9jdWxsaW5nTWFzayIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiX3Byb3h5IiwidXBkYXRlQ3VsbGluZ01hc2siLCJfY2hpbGRyZW4iLCJ1cGRhdGVMb2NhbE1hdHJpeDNEIiwiX2xvY2FsTWF0RGlydHkiLCJ0IiwiX21hdHJpeCIsInRtIiwibSIsIlRycyIsInRvTWF0NCIsIl90cnMiLCJfc2tld1giLCJfc2tld1kiLCJhIiwiYiIsImMiLCJkIiwic2t4IiwidGFuIiwic2t5IiwiSW5maW5pdHkiLCJfd29ybGRNYXREaXJ0eSIsInVwZGF0ZUxvY2FsTWF0cml4MkQiLCJkaXJ0eUZsYWciLCJ0cnMiLCJyb3RhdGlvbiIsIl9ldWxlckFuZ2xlcyIsInoiLCJoYXNTa2V3Iiwic3giLCJzeSIsInJvdGF0aW9uUmFkaWFucyIsInNpbiIsImNvcyIsImNhbGN1bFdvcmxkTWF0cml4M0QiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJwYXJlbnRNYXQiLCJfd29ybGRNYXRyaXgiLCJNYXQ0IiwibXVsIiwiY29weSIsImNhbGN1bFdvcmxkTWF0cml4MkQiLCJfbXVsTWF0IiwibXVsTWF0MkQiLCJvdXQiLCJhbSIsImJtIiwib3V0bSIsImFhIiwiYWIiLCJhYyIsImFkIiwiYXR4IiwiYXR5IiwiYmEiLCJiYiIsImJjIiwiYmQiLCJidHgiLCJidHkiLCJtdWxNYXQzRCIsIk5vZGVEZWZpbmVzIiwibmFtZSIsInByb3BlcnRpZXMiLCJfb3BhY2l0eSIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJfY29udGVudFNpemUiLCJTaXplIiwiX2FuY2hvclBvaW50IiwidjIiLCJfcG9zaXRpb24iLCJ1bmRlZmluZWQiLCJfc2NhbGUiLCJfekluZGV4IiwiSW50ZWdlciIsIl9sb2NhbFpPcmRlciIsInNlcmlhbGl6YWJsZSIsIl9pczNETm9kZSIsIl9ncm91cEluZGV4IiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJnZXQiLCJzZXQiLCJncm91cCIsImdhbWUiLCJncm91cExpc3QiLCJpbmRleE9mIiwieCIsImlzRmluaXRlIiwib2xkVmFsdWUiLCJzZXRMb2NhbERpcnR5IiwiX2V2ZW50TWFzayIsImVycm9yIiwieSIsIl9yZW5kZXJGbGFnIiwiRkxBR19XT1JMRF9UUkFOU0ZPUk0iLCJDQ19ERUJVRyIsImFuZ2xlIiwiZnJvbUFuZ2xlWiIsInJvdGF0aW9uWCIsImZyb21FdWxlck51bWJlciIsInJvdGF0aW9uWSIsImV1bGVyQW5nbGVzIiwidG9FdWxlciIsInYiLCJmcm9tRXVsZXIiLCJGTEFHX1RSQU5TRk9STSIsInF1YXQiLCJzZXRSb3RhdGlvbiIsInNjYWxlIiwic2V0U2NhbGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJza2V3WCIsInVwZGF0ZVNrZXciLCJza2V3WSIsIm9wYWNpdHkiLCJtaXNjIiwiY2xhbXBmIiwidXBkYXRlT3BhY2l0eSIsIkZMQUdfT1BBQ0lUWV9DT0xPUiIsInJhbmdlIiwiY29sb3IiLCJjbG9uZSIsImVxdWFscyIsIkNDX0RFViIsIndhcm5JRCIsIkZMQUdfQ09MT1IiLCJhbmNob3JYIiwiYW5jaG9yUG9pbnQiLCJhbmNob3JZIiwid2lkdGgiLCJzaXplIiwiaGVpZ2h0IiwiekluZGV4IiwiTUFYX1pJTkRFWCIsIk1JTl9aSU5ERVgiLCJfb25TaWJsaW5nSW5kZXhDaGFuZ2VkIiwiaXMzRE5vZGUiLCJfdXBkYXRlM0RGdW5jdGlvbiIsInVwIiwiX3VwIiwidHJhbnNmb3JtUXVhdCIsIlVQIiwiZ2V0V29ybGRSb3RhdGlvbiIsInJpZ2h0IiwiX3JpZ2h0IiwiUklHSFQiLCJmb3J3YXJkIiwiX2ZvcndhcmQiLCJGT1JXQVJEIiwiY3RvciIsIl9yZW9yZGVyQ2hpbGREaXJ0eSIsIl93aWRnZXQiLCJfcmVuZGVyQ29tcG9uZW50IiwiX3RvdWNoTGlzdGVuZXIiLCJfaW5pdERhdGFGcm9tUG9vbCIsIl9jaGlsZEFycml2YWxPcmRlciIsInJlbmRlcmVyIiwiTm9kZVByb3h5IiwiX3NwYWNlSW5mbyIsInVuaXRJRCIsIl9pZCIsIl9uYW1lIiwiaW5pdCIsInN0YXRpY3MiLCJfTG9jYWxEaXJ0eUZsYWciLCJvYmoiLCJjb25zdHJ1Y3RvciIsIlNjZW5lIiwiX2RlbGF5U29ydCIsIl9vblByZURlc3Ryb3kiLCJkZXN0cm95QnlQYXJlbnQiLCJfb25QcmVEZXN0cm95QmFzZSIsImRpcmVjdG9yIiwiZ2V0QWN0aW9uTWFuYWdlciIsInJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0IiwiY2xlYXIiLCJyZW1vdmVMaXN0ZW5lcnMiLCJtYXNrIiwiZGVzdHJveSIsIl9iYWNrRGF0YUludG9Qb29sIiwiX19mYXN0T2ZmIiwiRGlyZWN0b3IiLCJFVkVOVF9BRlRFUl9VUERBVEUiLCJzb3J0QWxsQ2hpbGRyZW4iLCJfb25Qb3N0QWN0aXZhdGVkIiwiYWN0aXZlIiwiYWN0aW9uTWFuYWdlciIsInJlc3VtZVRhcmdldCIsIl9jaGVja0xpc3RlbmVyTWFzayIsInBhdXNlVGFyZ2V0IiwiX29uSGllcmFyY2h5Q2hhbmdlZCIsIm9sZFBhcmVudCIsIl91cGRhdGVPcmRlck9mQXJyaXZhbCIsIl9vbkhpZXJhcmNoeUNoYW5nZWRCYXNlIiwiX3dpZGdldE1hbmFnZXIiLCJfbm9kZXNPcmRlckRpcnR5IiwiX2FjdGl2ZUluSGllcmFyY2h5IiwidXBkYXRlUGFyZW50IiwiX2NhbGN1bFdvcmxkTWF0cml4IiwiX29uM0ROb2RlQ2hhbmdlZCIsInVwZGF0ZTNETm9kZSIsIkNDX1RFU1QiLCJGbG9hdDY0QXJyYXkiLCJsb2NhbE1hdCIsIndvcmxkTWF0IiwicG9wIiwic3BhY2VJbmZvIiwiaWRlbnRpdHkiLCJfdG9FdWxlciIsImFzaW4iLCJfZnJvbUV1bGVyIiwiX2luaXRQcm9wZXJ0aWVzIiwiZGVzVHJzIiwic3ViYXJyYXkiLCJfb25CYXRjaENyZWF0ZWQiLCJkb250U3luY0NoaWxkUHJlZmFiIiwiY2hpbGRyZW4iLCJsZW4iLCJjaGlsZCIsInByZWZhYkluZm8iLCJfcHJlZmFiIiwic3luYyIsInJvb3QiLCJzeW5jV2l0aFByZWZhYiIsIkZMQUdfQ0hJTERSRU4iLCJpbml0TmF0aXZlIiwiTWFzayIsIl9jaGVja25TZXR1cFN5c0V2ZW50IiwibmV3QWRkZWQiLCJmb3JEaXNwYXRjaCIsIkV2ZW50TGlzdGVuZXIiLCJjcmVhdGUiLCJUT1VDSF9PTkVfQllfT05FIiwic3dhbGxvd1RvdWNoZXMiLCJvblRvdWNoQmVnYW4iLCJvblRvdWNoTW92ZWQiLCJvblRvdWNoRW5kZWQiLCJvblRvdWNoQ2FuY2VsbGVkIiwiYWRkTGlzdGVuZXIiLCJNT1VTRSIsIm9uTW91c2VEb3duIiwib25Nb3VzZU1vdmUiLCJvbk1vdXNlVXAiLCJvbk1vdXNlU2Nyb2xsIiwiZ2V0U2NoZWR1bGVyIiwic2NoZWR1bGUiLCJvbiIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsIl9vbkRpc3BhdGNoIiwib25jZSIsImxpc3RlbmVycyIsIm9mZiIsImVycm9ySUQiLCJfX2V2ZW50VGFyZ2V0cyIsInRvdWNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiX29mZkRpc3BhdGNoIiwicmVtb3ZlTGlzdGVuZXIiLCJoYXNMaXN0ZW5lcnMiLCJyZW1vdmVBbGwiLCJhcnJheSIsImZhc3RSZW1vdmUiLCJ0YXJnZXRPZmYiLCJoYXMiLCJhcmcxIiwiYXJnMiIsImFyZzMiLCJhcmc0IiwiYXJnNSIsInBhdXNlU3lzdGVtRXZlbnRzIiwicmVjdXJzaXZlIiwicmVzdW1lU3lzdGVtRXZlbnRzIiwicG9pbnQiLCJsaXN0ZW5lciIsInciLCJoIiwiY2FtZXJhUHQiLCJ0ZXN0UHQiLCJjYW1lcmEiLCJDYW1lcmEiLCJmaW5kQ2FtZXJhIiwiZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IiwiX3VwZGF0ZVdvcmxkTWF0cml4IiwiaW52ZXJ0IiwiVmVjMiIsInRyYW5zZm9ybU1hdDQiLCJqIiwidGVtcCIsIl9lbmFibGVkIiwicnVuQWN0aW9uIiwiYWN0aW9uIiwiYXNzZXJ0SUQiLCJfc3VwcHJlc3NEZXByZWNhdGlvbiIsImFkZEFjdGlvbiIsInBhdXNlQWxsQWN0aW9ucyIsInJlc3VtZUFsbEFjdGlvbnMiLCJzdG9wQWxsQWN0aW9ucyIsInN0b3BBY3Rpb24iLCJyZW1vdmVBY3Rpb24iLCJzdG9wQWN0aW9uQnlUYWciLCJ0YWciLCJBY3Rpb24iLCJUQUdfSU5WQUxJRCIsImxvZ0lEIiwicmVtb3ZlQWN0aW9uQnlUYWciLCJnZXRBY3Rpb25CeVRhZyIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnMiLCJnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zSW5UYXJnZXQiLCJnZXRQb3NpdGlvbiIsInRvUG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsIm5ld1Bvc09yWCIsIm9sZFBvc2l0aW9uIiwiZ2V0U2NhbGUiLCJ0b1NjYWxlIiwibmV3U2NhbGVPclgiLCJnZXRSb3RhdGlvbiIsInRvUm90YXRpb24iLCJnZXRDb250ZW50U2l6ZSIsInNldENvbnRlbnRTaXplIiwibG9jQ29udGVudFNpemUiLCJnZXRBbmNob3JQb2ludCIsInNldEFuY2hvclBvaW50IiwibG9jQW5jaG9yUG9pbnQiLCJfaW52VHJhbnNmb3JtUG9pbnQiLCJsdHJzIiwic3ViIiwiY29uanVnYXRlIiwiaW52ZXJzZVNhZmUiLCJnZXRXb3JsZFBvc2l0aW9uIiwiYWRkIiwic2V0V29ybGRQb3NpdGlvbiIsImZyb21Qb3NpdGlvbiIsInNldFdvcmxkUm90YXRpb24iLCJ2YWwiLCJmcm9tUm90YXRpb24iLCJnZXRXb3JsZFNjYWxlIiwic2V0V29ybGRTY2FsZSIsImRpdiIsImZyb21TY2FsZSIsImdldFdvcmxkUlQiLCJvcG9zIiwib3JvdCIsImZyb21SVCIsImxvb2tBdCIsIm5vcm1hbGl6ZSIsImZyb21WaWV3VXAiLCJmbGFnIiwic2V0V29ybGREaXJ0eSIsImdldExvY2FsTWF0cml4IiwiZ2V0V29ybGRNYXRyaXgiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsIndvcmxkUG9pbnQiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJub2RlUG9pbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2UiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlIiwiZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtIiwiY29udGVudFNpemUiLCJ0cmFuc2Zvcm0iLCJmcm9tTWF0NCIsImdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSIiwiZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm0iLCJnZXROb2RlVG9Xb3JsZFRyYW5zZm9ybUFSIiwiZ2V0UGFyZW50VG9Ob2RlVHJhbnNmb3JtIiwiZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm0iLCJjb252ZXJ0VG91Y2hUb05vZGVTcGFjZSIsImNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIiLCJnZXRCb3VuZGluZ0JveCIsInJlY3QiLCJnZXRCb3VuZGluZ0JveFRvV29ybGQiLCJfZ2V0Qm91bmRpbmdCb3hUbyIsImxvY0NoaWxkcmVuIiwiY2hpbGRSZWN0IiwidW5pb24iLCJhcnJpdmFsT3JkZXIiLCJhZGRDaGlsZCIsImdldENsYXNzTmFtZSIsImNsZWFudXAiLCJfc2V0RGlydHlGb3JOb2RlIiwiY2hpbGQyIiwiY291bnQiLCJfX2Zhc3RPbiIsIl9yZXN0b3JlUHJvcGVydGllcyIsIm1hcmtGb3JSZW5kZXIiLCJvblJlc3RvcmUiLCJfb25SZXN0b3JlQmFzZSIsIm1peGluIiwiX3NjYWxlWCIsIkZsb2F0IiwiZWRpdG9yT25seSIsIl9zY2FsZVkiLCJDbGFzcyIsIl9wIiwicHJvdG90eXBlIiwiZ2V0c2V0IiwidmVjM190bXAiLCJhbmdsZXMiLCJhZGRTZWxmIiwic3ViU2VsZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7O0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBeEI7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHRCxPQUFPLENBQUMsdUJBQUQsQ0FBNUI7O0FBQ0EsSUFBTUUsV0FBVyxHQUFHRixPQUFPLENBQUMsb0JBQUQsQ0FBUCxDQUE4QkcsV0FBbEQ7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHSixPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUssWUFBWSxHQUFHTCxPQUFPLENBQUMsaUJBQUQsQ0FBNUI7O0FBQ0EsSUFBTU0sS0FBSyxHQUFHTixPQUFPLENBQUMsb0JBQUQsQ0FBckI7O0FBQ0EsSUFBTU8sRUFBRSxHQUFHUCxPQUFPLENBQUMsZUFBRCxDQUFsQjs7QUFDQSxJQUFNUSxLQUFLLEdBQUdSLE9BQU8sQ0FBQyxlQUFELENBQXJCOztBQUNBLElBQU1TLFdBQVcsR0FBR1QsT0FBTyxDQUFDLHNCQUFELENBQTNCOztBQUNBLElBQU1VLFVBQVUsR0FBR1YsT0FBTyxDQUFDLHdCQUFELENBQTFCOztBQUVBLElBQU1XLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxNQUFILENBQVVGLEtBQXhCO0FBQ0EsSUFBTUcsVUFBVSxHQUFHSCxLQUFLLENBQUNHLFVBQXpCO0FBRUEsSUFBTUMsa0JBQWtCLEdBQUdDLFNBQVMsSUFBSSxtQkFBeEM7QUFDQSxJQUFNQyxVQUFV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QUFqRTs7QUFFQSxJQUFJdGQsU0FBSixFQUFlO0FBQ1gsTUFBSTRpQixRQUFRLEdBQUcsSUFBSXBpQixnQkFBSixFQUFmO0FBQ0FaLEVBQUFBLEVBQUUsQ0FBQ0wsRUFBSCxDQUFNb2pCLE1BQU4sQ0FBYUYsRUFBYixFQUFpQixrQkFBakIsRUFBcUMsWUFBWTtBQUM3QyxRQUFJSSxNQUFNLEdBQUcsSUFBSXJpQixnQkFBSixDQUFTLEtBQUs2SyxZQUFkLENBQWI7QUFDQSxRQUFJaEMsTUFBTSxHQUFHLEtBQUtBLE1BQWxCOztBQUNBLFdBQU9BLE1BQVAsRUFBZTtBQUNYd1osTUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWV6WixNQUFNLENBQUNnQyxZQUF0QjtBQUNBaEMsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBQ0QsV0FBT3daLE1BQVA7QUFDSCxHQVJELEVBUUcsVUFBVXpTLENBQVYsRUFBYTtBQUNad1MsSUFBQUEsUUFBUSxDQUFDOVQsR0FBVCxDQUFhc0IsQ0FBYjtBQUNBLFFBQUkvRyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsV0FBT0EsTUFBUCxFQUFlO0FBQ1h1WixNQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIxWixNQUFNLENBQUNnQyxZQUF4QjtBQUNBaEMsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBQ0QsU0FBSzZHLFdBQUwsR0FBbUIwUyxRQUFuQjtBQUNILEdBaEJEO0FBaUJIOztBQUVEaGpCLEVBQUUsQ0FBQ2dJLElBQUgsR0FBVW9iLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnJiLElBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTWF0NCwgVmVjMiwgVmVjMywgUXVhdCwgVHJzIH0gZnJvbSAnLi92YWx1ZS10eXBlcyc7XG5cbmNvbnN0IEJhc2VOb2RlID0gcmVxdWlyZSgnLi91dGlscy9iYXNlLW5vZGUnKTtcbmNvbnN0IFByZWZhYkhlbHBlciA9IHJlcXVpcmUoJy4vdXRpbHMvcHJlZmFiLWhlbHBlcicpO1xuY29uc3Qgbm9kZU1lbVBvb2wgPSByZXF1aXJlKCcuL3V0aWxzL3RyYW5zLXBvb2wnKS5Ob2RlTWVtUG9vbDtcbmNvbnN0IEFmZmluZVRyYW5zID0gcmVxdWlyZSgnLi91dGlscy9hZmZpbmUtdHJhbnNmb3JtJyk7XG5jb25zdCBldmVudE1hbmFnZXIgPSByZXF1aXJlKCcuL2V2ZW50LW1hbmFnZXInKTtcbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4vcGxhdGZvcm0vanMnKTtcbmNvbnN0IEV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudCcpO1xuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcblxuY29uc3QgRmxhZ3MgPSBjYy5PYmplY3QuRmxhZ3M7XG5jb25zdCBEZXN0cm95aW5nID0gRmxhZ3MuRGVzdHJveWluZztcblxuY29uc3QgRVJSX0lOVkFMSURfTlVNQkVSID0gQ0NfRURJVE9SICYmICdUaGUgJXMgaXMgaW52YWxpZCc7XG5jb25zdCBPTkVfREVHUkVFID0gTWF0aC5QSSAvIDE4MDtcblxudmFyIEFjdGlvbk1hbmFnZXJFeGlzdCA9ICEhY2MuQWN0aW9uTWFuYWdlcjtcbnZhciBlbXB0eUZ1bmMgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gZ2V0V29ybGRQb3NpdGlvbiB0ZW1wIHZhclxudmFyIF9nd3BWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfZ3dwUXVhdCA9IG5ldyBRdWF0KCk7XG5cbi8vIF9pbnZUcmFuc2Zvcm1Qb2ludCB0ZW1wIHZhclxudmFyIF90cFZlYzNhID0gbmV3IFZlYzMoKTtcbnZhciBfdHBWZWMzYiA9IG5ldyBWZWMzKCk7XG52YXIgX3RwUXVhdGEgPSBuZXcgUXVhdCgpO1xudmFyIF90cFF1YXRiID0gbmV3IFF1YXQoKTtcblxuLy8gc2V0V29ybGRQb3NpdGlvbiB0ZW1wIHZhclxudmFyIF9zd3BWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRTY2FsZSB0ZW1wIHZhclxudmFyIF9nd3NWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gc2V0V29ybGRTY2FsZSB0ZW1wIHZhclxudmFyIF9zd3NWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRSVCB0ZW1wIHZhclxudmFyIF9nd3J0VmVjM2EgPSBuZXcgVmVjMygpO1xudmFyIF9nd3J0VmVjM2IgPSBuZXcgVmVjMygpO1xudmFyIF9nd3J0UXVhdGEgPSBuZXcgUXVhdCgpO1xudmFyIF9nd3J0UXVhdGIgPSBuZXcgUXVhdCgpO1xuXG4vLyBsb29rQXQgdGVtcCB2YXJcbnZhciBfbGFWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfbGFRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy91cOOAgXJpZ2h044CBZm9yd2FyZCB0ZW1wIHZhclxudmFyIF91cmZWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfdXJmUXVhdCA9IG5ldyBRdWF0KCk7XG5cbi8vIF9oaXRUZXN0IHRlbXAgdmFyXG52YXIgX2h0VmVjM2EgPSBuZXcgVmVjMygpO1xudmFyIF9odFZlYzNiID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRSb3RhdGlvbiB0ZW1wIHZhclxudmFyIF9nd3JRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy8gc2V0V29ybGRSb3RhdGlvbiB0ZW1wIHZhclxudmFyIF9zd3JRdWF0ID0gbmV3IFF1YXQoKTtcblxudmFyIF9xdWF0YSA9IG5ldyBRdWF0KCk7XG52YXIgX21hdDRfdGVtcCA9IGNjLm1hdDQoKTtcbnZhciBfdmVjM190ZW1wID0gbmV3IFZlYzMoKTtcblxudmFyIF9jYWNoZWRBcnJheSA9IG5ldyBBcnJheSgxNik7XG5fY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcblxuY29uc3QgUE9TSVRJT05fT04gPSAxIDw8IDA7XG5jb25zdCBTQ0FMRV9PTiA9IDEgPDwgMTtcbmNvbnN0IFJPVEFUSU9OX09OID0gMSA8PCAyO1xuY29uc3QgU0laRV9PTiA9IDEgPDwgMztcbmNvbnN0IEFOQ0hPUl9PTiA9IDEgPDwgNDtcbmNvbnN0IENPTE9SX09OID0gMSA8PCA1O1xuXG5cbmxldCBCdWlsdGluR3JvdXBJbmRleCA9IGNjLkVudW0oe1xuICAgIERFQlVHOiAzMVxufSk7XG5cbi8qKlxuICogISNlbiBOb2RlJ3MgbG9jYWwgZGlydHkgcHJvcGVydGllcyBmbGFnXG4gKiAhI3poIE5vZGUg55qE5pys5Zyw5bGe5oCnIGRpcnR5IOeKtuaAgeS9jVxuICogQGVudW0gTm9kZS5fTG9jYWxEaXJ0eUZsYWdcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKiBAbmFtZXNwYWNlIE5vZGVcbiAqL1xudmFyIExvY2FsRGlydHlGbGFnID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwb3NpdGlvbiBkaXJ0eVxuICAgICAqICEjemgg5L2N572uIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQT1NJVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQT1NJVElPTjogMSA8PCAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igc2NhbGUgZGlydHlcbiAgICAgKiAhI3poIOe8qeaUviBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgU0NBTEU6IDEgPDwgMSxcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHJvdGF0aW9uIGRpcnR5XG4gICAgICogISN6aCDml4vovawgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJPVEFUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJPVEFUSU9OOiAxIDw8IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBza2V3IGRpcnR5XG4gICAgICogISN6aCBza2V3IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTS0VXXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNLRVc6IDEgPDwgMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHJvdGF0aW9uLCBzY2FsZSBvciBwb3NpdGlvbiBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s77yM57yp5pS+77yM5oiW5L2N572uIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVFJTOiAxIDw8IDAgfCAxIDw8IDEgfCAxIDw8IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciByb3RhdGlvbiBvciBzY2FsZSBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s5oiW57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBSUzogMSA8PCAxIHwgMSA8PCAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igcm90YXRpb24sIHNjYWxlLCBwb3NpdGlvbiwgc2tldyBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s77yM57yp5pS+77yM5L2N572u77yM5oiW5pac6KeSIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVFJTUzogMSA8PCAwIHwgMSA8PCAxIHwgMSA8PCAyIHwgMSA8PCAzLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDniannkIbkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUE9TSVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19QT1NJVElPTjogMSA8PCA0LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHNjYWxlIGRpcnR5XG4gICAgICogISN6aCDniannkIbnvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19TQ0FMRTogMSA8PCA1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHJvdGF0aW9uIGRpcnR5XG4gICAgICogISN6aCDniannkIbml4vovawgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUk9UQVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19ST1RBVElPTjogMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHRycyBkaXJ0eVxuICAgICAqICEjemgg54mp55CG5L2N572u5peL6L2s57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQSFlTSUNTX1RSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1RSUzogMSA8PCA0IHwgMSA8PCA1IHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHJzIGRpcnR5XG4gICAgICogISN6aCDniannkIbml4vovaznvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19SUzogMSA8PCA1IHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBub2RlIGFuZCBwaHlzaWNzIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDmiYDmnInkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMTF9QT1NJVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBBTExfUE9TSVRJT046IDEgPDwgMCB8IDEgPDwgNCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igbm9kZSBhbmQgcGh5c2ljcyBzY2FsZSBkaXJ0eVxuICAgICAqICEjemgg5omA5pyJ57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExfU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQUxMX1NDQUxFOiAxIDw8IDEgfCAxIDw8IDUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIG5vZGUgYW5kIHBoeXNpY3Mgcm90YXRpb24gZGlydHlcbiAgICAgKiAhI3poIOaJgOacieaXi+i9rCBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxMX1JPVEFUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTF9ST1RBVElPTjogMSA8PCAyIHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBub2RlIGFuZCBwaHlzaWNzIHRycyBkaXJ0eVxuICAgICAqICEjemgg5omA5pyJdHJzIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExfVFJTXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTF9UUlM6IDEgPDwgMCB8IDEgPDwgMSB8IDEgPDwgMiB8IDEgPDwgNCB8IDEgPDwgNSB8IDEgPDwgNixcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3IgYWxsIGRpcnR5IHByb3BlcnRpZXNcbiAgICAgKiAhI3poIOimhuebluaJgOaciSBkaXJ0eSDnirbmgIHnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxMXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTDogMHhmZmZmLFxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBzdXBwb3J0ZWQgYnkgTm9kZVxuICogISN6aCBOb2RlIOaUr+aMgeeahOS6i+S7tuexu+Wei1xuICogQGNsYXNzIE5vZGUuRXZlbnRUeXBlXG4gKiBAc3RhdGljXG4gKiBAbmFtZXNwYWNlIE5vZGVcbiAqL1xuLy8gV2h5IEV2ZW50VHlwZSBkZWZpbmVkIGFzIGNsYXNzLCBiZWNhdXNlIHRoZSBmaXJzdCBwYXJhbWV0ZXIgb2YgTm9kZS5vbiBtZXRob2QgbmVlZHMgc2V0IGFzICdzdHJpbmcnIHR5cGUuXG52YXIgRXZlbnRUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgdG91Y2ggc3RhcnQgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNoc3RhcnQnXG4gICAgICogISN6aCDlvZPmiYvmjIfop6bmkbjliLDlsY/luZXml7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gVE9VQ0hfU1RBUlRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVE9VQ0hfU1RBUlQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBtb3ZlIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICd0b3VjaG1vdmUnXG4gICAgICogISN6aCDlvZPmiYvmjIflnKjlsY/luZXkuIrnp7vliqjml7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gVE9VQ0hfTU9WRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9NT1ZFOiAndG91Y2htb3ZlJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBlbmQgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNoZW5kJ1xuICAgICAqICEjemgg5b2T5omL5oyH5Zyo55uu5qCH6IqC54K55Yy65Z+f5YaF56a75byA5bGP5bmV5pe244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFRPVUNIX0VORFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgdG91Y2ggZW5kIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICd0b3VjaGNhbmNlbCdcbiAgICAgKiAhI3poIOW9k+aJi+aMh+WcqOebruagh+iKgueCueWMuuWfn+Wkluemu+W8gOWxj+W5leaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBUT1VDSF9DQU5DRUxcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVE9VQ0hfQ0FOQ0VMOiAndG91Y2hjYW5jZWwnLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgZG93biBldmVudHMsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ21vdXNlZG93bidcbiAgICAgKiAhI3poIOW9k+m8oOagh+aMieS4i+aXtuinpuWPkeS4gOasoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9ET1dOXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIG1vdmUgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZW1vdmUnXG4gICAgICogISN6aCDlvZPpvKDmoIflnKjnm67moIfoioLngrnlnKjnm67moIfoioLngrnljLrln5/kuK3np7vliqjml7bvvIzkuI3orrrmmK/lkKbmjInkuIvjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTU9VU0VfTU9WRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBtb3VzZSBlbnRlciB0YXJnZXQgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZWVudGVyJ1xuICAgICAqICEjemgg5b2T6byg5qCH56e75YWl55uu5qCH6IqC54K55Yy65Z+f5pe277yM5LiN6K665piv5ZCm5oyJ5LiL44CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX0VOVEVSXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX0VOVEVSOiAnbW91c2VlbnRlcicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgbGVhdmUgdGFyZ2V0IGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2VsZWF2ZSdcbiAgICAgKiAhI3poIOW9k+m8oOagh+enu+WHuuebruagh+iKgueCueWMuuWfn+aXtu+8jOS4jeiuuuaYr+WQpuaMieS4i+OAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9MRUFWRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9MRUFWRTogJ21vdXNlbGVhdmUnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIHVwIGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2V1cCdcbiAgICAgKiAhI3poIOW9k+m8oOagh+S7juaMieS4i+eKtuaAgeadvuW8gOaXtuinpuWPkeS4gOasoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9VUFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIHdoZWVsIGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2V3aGVlbCdcbiAgICAgKiAhI3poIOW9k+m8oOagh+a7mui9rua7muWKqOaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9XSEVFTFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9XSEVFTDogJ21vdXNld2hlZWwnLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgcG9zaXRpb24gY2hhbmdlIGV2ZW50cy5cbiAgICAgKiBQZXJmb3JtYW5jZSBub3RlLCB0aGlzIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIGJlaW5nIGNoYW5nZWQsXG4gICAgICogaWYgdGhlIGV2ZW50IGNhbGxiYWNrIGhhdmUgaGVhdnkgbG9naWMgaXQgbWF5IGhhdmUgZ3JlYXQgcGVyZm9ybWFuY2UgaW1wYWN0LCB0cnkgdG8gYXZvaWQgc3VjaCBzY2VuYXJpby5cbiAgICAgKiAhI3poIOW9k+iKgueCueS9jee9ruaUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIOaAp+iDveitpuWRiu+8mui/meS4quS6i+S7tuS8muWcqOavj+asoeWvueW6lOeahOWxnuaAp+iiq+S/ruaUueaXtuinpuWPke+8jOWmguaenOS6i+S7tuWbnuiwg+aNn+iAl+i+g+mrmO+8jOacieWPr+iDveWvueaAp+iDveacieW+iOWkp+eahOi0n+mdouW9seWTje+8jOivt+WwvemHj+mBv+WFjei/meenjeaDheWGteOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBQT1NJVElPTl9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFBPU0lUSU9OX0NIQU5HRUQ6ICdwb3NpdGlvbi1jaGFuZ2VkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciByb3RhdGlvbiBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K55peL6L2s5pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFJPVEFUSU9OX0NIQU5HRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUk9UQVRJT05fQ0hBTkdFRDogJ3JvdGF0aW9uLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHNjYWxlIGNoYW5nZSBldmVudHMuXG4gICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgICogISN6aCDlvZPoioLngrnnvKnmlL7mlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gU0NBTEVfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTQ0FMRV9DSEFOR0VEOiAnc2NhbGUtY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3Igc2l6ZSBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K55bC65a+45pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFNJWkVfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTSVpFX0NIQU5HRUQ6ICdzaXplLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIGFuY2hvciBwb2ludCBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K56ZSa54K55pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEFOQ0hPUl9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFOQ0hPUl9DSEFOR0VEOiAnYW5jaG9yLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY29sb3IgY2hhbmdlIGV2ZW50cy5cbiAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgKiAhI3poIOW9k+iKgueCueminOiJsuaUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ09MT1JfQ0hBTkdFRFxuICAgICogQHN0YXRpY1xuICAgICovXG4gICAgQ09MT1JfQ0hBTkdFRDogJ2NvbG9yLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG5ldyBjaGlsZCBhZGRlZCBldmVudHMuXG4gICAgICogISN6aCDlvZPmlrDnmoTlrZDoioLngrnooqvmt7vliqDml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfQURERURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQ0hJTERfQURERUQ6ICdjaGlsZC1hZGRlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY2hpbGQgcmVtb3ZlZCBldmVudHMuXG4gICAgICogISN6aCDlvZPlrZDoioLngrnooqvnp7vpmaTml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfUkVNT1ZFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBDSElMRF9SRU1PVkVEOiAnY2hpbGQtcmVtb3ZlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY2hpbGRyZW4gcmVvcmRlciBldmVudHMuXG4gICAgICogISN6aCDlvZPlrZDoioLngrnpobrluo/mlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfUkVPUkRFUlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBDSElMRF9SRU9SREVSOiAnY2hpbGQtcmVvcmRlcicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3Igbm9kZSBncm91cCBjaGFuZ2VkIGV2ZW50cy5cbiAgICAgKiAhI3poIOW9k+iKgueCueW9kuWxnue+pOe7hOWPkeeUn+WPmOWMluaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBHUk9VUF9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEdST1VQX0NIQU5HRUQ6ICdncm91cC1jaGFuZ2VkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBub2RlJ3Mgc2libGluZyBvcmRlciBjaGFuZ2VkLlxuICAgICAqICEjemgg5b2T6IqC54K55Zyo5YWE5byf6IqC54K55Lit55qE6aG65bqP5Y+R55Sf5Y+Y5YyW5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFNJQkxJTkdfT1JERVJfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTSUJMSU5HX09SREVSX0NIQU5HRUQ6ICdzaWJsaW5nLW9yZGVyLWNoYW5nZWQnLFxufSk7XG5cbnZhciBfdG91Y2hFdmVudHMgPSBbXG4gICAgRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxuICAgIEV2ZW50VHlwZS5UT1VDSF9NT1ZFLFxuICAgIEV2ZW50VHlwZS5UT1VDSF9FTkQsXG4gICAgRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCxcbl07XG52YXIgX21vdXNlRXZlbnRzID0gW1xuICAgIEV2ZW50VHlwZS5NT1VTRV9ET1dOLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9FTlRFUixcbiAgICBFdmVudFR5cGUuTU9VU0VfTU9WRSxcbiAgICBFdmVudFR5cGUuTU9VU0VfTEVBVkUsXG4gICAgRXZlbnRUeXBlLk1PVVNFX1VQLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9XSEVFTCxcbl07XG5cbnZhciBfc2tld05lZWRXYXJuID0gdHJ1ZTtcbnZhciBfc2tld1dhcm4gPSBmdW5jdGlvbiAodmFsdWUsIG5vZGUpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgICAgdmFyIG5vZGVQYXRoID0gXCJcIjtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgIG5vZGVQYXRoID0gYE5vZGU6ICR7Tm9kZVV0aWxzLmdldE5vZGVQYXRoKG5vZGUpfS5gXG4gICAgICAgIH1cbiAgICAgICAgX3NrZXdOZWVkV2FybiAmJiBjYy53YXJuKFwiYGNjLk5vZGUuc2tld1gvWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjEsIHBsZWFzZSB1c2UgM0Qgbm9kZSBpbnN0ZWFkLlwiLCBub2RlUGF0aCk7XG4gICAgICAgICFDQ19FRElUT1IgJiYgKF9za2V3TmVlZFdhcm4gPSBmYWxzZSk7XG4gICAgfVxufVxuXG52YXIgX2N1cnJlbnRIb3ZlcmVkID0gbnVsbDtcblxudmFyIF90b3VjaFN0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuVE9VQ0hfU1RBUlQ7XG4gICAgICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBfdG91Y2hNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG4gICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9NT1ZFO1xuICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG52YXIgX3RvdWNoRW5kSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuVE9VQ0hfRU5EO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9DQU5DRUw7XG4gICAgfVxuICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG52YXIgX3RvdWNoQ2FuY2VsSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDtcbiAgICBldmVudC50b3VjaCA9IHRvdWNoO1xuICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG52YXIgX21vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfRE9XTjtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxufTtcbnZhciBfbW91c2VNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcbiAgICB2YXIgaGl0ID0gbm9kZS5faGl0VGVzdChwb3MsIHRoaXMpO1xuICAgIGlmIChoaXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcmV2aW91c0luKSB7XG4gICAgICAgICAgICAvLyBGaXggaXNzdWUgd2hlbiBob3ZlciBub2RlIHN3aXRjaGVkLCBwcmV2aW91cyBob3ZlcmVkIG5vZGUgd29uJ3QgZ2V0IE1PVVNFX0xFQVZFIG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgaWYgKF9jdXJyZW50SG92ZXJlZCAmJiBfY3VycmVudEhvdmVyZWQuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX0xFQVZFO1xuICAgICAgICAgICAgICAgIF9jdXJyZW50SG92ZXJlZC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBfY3VycmVudEhvdmVyZWQuX21vdXNlTGlzdGVuZXIuX3ByZXZpb3VzSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdXJyZW50SG92ZXJlZCA9IHRoaXMub3duZXI7XG4gICAgICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX0VOVEVSO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzSW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfTU9WRTtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuX3ByZXZpb3VzSW4pIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9MRUFWRTtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNJbiA9IGZhbHNlO1xuICAgICAgICBfY3VycmVudEhvdmVyZWQgPSBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gY29udGludWUgZGlzcGF0Y2hpbmdcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEV2ZW50IHByb2Nlc3NlZCwgY2xlYW51cFxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xufTtcbnZhciBfbW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfVVA7XG4gICAgICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59O1xudmFyIF9tb3VzZVdoZWVsSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9XSEVFTDtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIF9zZWFyY2hDb21wb25lbnRzSW5QYXJlbnQgKG5vZGUsIGNvbXApIHtcbiAgICBpZiAoY29tcCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgbGlzdCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGN1cnIgPSBub2RlOyBjdXJyICYmIGNjLk5vZGUuaXNOb2RlKGN1cnIpOyBjdXJyID0gY3Vyci5fcGFyZW50LCArK2luZGV4KSB7XG4gICAgICAgICAgICBpZiAoY3Vyci5nZXRDb21wb25lbnQoY29tcCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBjdXJyLFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtuZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gX2NoZWNrTGlzdGVuZXJzIChub2RlLCBldmVudHMpIHtcbiAgICBpZiAoIShub2RlLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpKSB7XG4gICAgICAgIGlmIChub2RlLl9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2J1YmJsaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoZXZlbnRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuX2NhcHR1cmluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBldmVudHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuX2NhcHR1cmluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKGV2ZW50c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9kb0Rpc3BhdGNoRXZlbnQgKG93bmVyLCBldmVudCkge1xuICAgIHZhciB0YXJnZXQsIGk7XG4gICAgZXZlbnQudGFyZ2V0ID0gb3duZXI7XG5cbiAgICAvLyBFdmVudC5DQVBUVVJJTkdfUEhBU0VcbiAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbiAgICBvd25lci5fZ2V0Q2FwdHVyaW5nVGFyZ2V0cyhldmVudC50eXBlLCBfY2FjaGVkQXJyYXkpO1xuICAgIC8vIGNhcHR1cmluZ1xuICAgIGV2ZW50LmV2ZW50UGhhc2UgPSAxO1xuICAgIGZvciAoaSA9IF9jYWNoZWRBcnJheS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB0YXJnZXQgPSBfY2FjaGVkQXJyYXlbaV07XG4gICAgICAgIGlmICh0YXJnZXQuX2NhcHR1cmluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRcbiAgICAgICAgICAgIHRhcmdldC5fY2FwdHVyaW5nTGlzdGVuZXJzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQsIF9jYWNoZWRBcnJheSk7XG4gICAgICAgICAgICAvLyBjaGVjayBpZiBwcm9wYWdhdGlvbiBzdG9wcGVkXG4gICAgICAgICAgICBpZiAoZXZlbnQuX3Byb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcblxuICAgIC8vIEV2ZW50LkFUX1RBUkdFVFxuICAgIC8vIGNoZWNrcyBpZiBkZXN0cm95ZWQgaW4gY2FwdHVyaW5nIGNhbGxiYWNrc1xuICAgIGV2ZW50LmV2ZW50UGhhc2UgPSAyO1xuICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBvd25lcjtcbiAgICBpZiAob3duZXIuX2NhcHR1cmluZ0xpc3RlbmVycykge1xuICAgICAgICBvd25lci5fY2FwdHVyaW5nTGlzdGVuZXJzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cbiAgICBpZiAoIWV2ZW50Ll9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWQgJiYgb3duZXIuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgIG93bmVyLl9idWJibGluZ0xpc3RlbmVycy5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9XG5cbiAgICBpZiAoIWV2ZW50Ll9wcm9wYWdhdGlvblN0b3BwZWQgJiYgZXZlbnQuYnViYmxlcykge1xuICAgICAgICAvLyBFdmVudC5CVUJCTElOR19QSEFTRVxuICAgICAgICBvd25lci5fZ2V0QnViYmxpbmdUYXJnZXRzKGV2ZW50LnR5cGUsIF9jYWNoZWRBcnJheSk7XG4gICAgICAgIC8vIHByb3BhZ2F0ZVxuICAgICAgICBldmVudC5ldmVudFBoYXNlID0gMztcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IF9jYWNoZWRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGFyZ2V0ID0gX2NhY2hlZEFycmF5W2ldO1xuICAgICAgICAgICAgaWYgKHRhcmdldC5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRcbiAgICAgICAgICAgICAgICB0YXJnZXQuX2J1YmJsaW5nTGlzdGVuZXJzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHByb3BhZ2F0aW9uIHN0b3BwZWRcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuX3Byb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbn1cblxuLy8gdHJhdmVyc2FsIHRoZSBub2RlIHRyZWUsIGNoaWxkIGN1bGxpbmdNYXNrIG11c3Qga2VlcCB0aGUgc2FtZSB3aXRoIHRoZSBwYXJlbnQuXG5mdW5jdGlvbiBfZ2V0QWN0dWFsR3JvdXBJbmRleCAobm9kZSkge1xuICAgIGxldCBncm91cEluZGV4ID0gbm9kZS5ncm91cEluZGV4O1xuICAgIGlmIChncm91cEluZGV4ID09PSAwICYmIG5vZGUucGFyZW50KSB7XG4gICAgICAgIGdyb3VwSW5kZXggPSBfZ2V0QWN0dWFsR3JvdXBJbmRleChub2RlLnBhcmVudCk7XG4gICAgfVxuICAgIHJldHVybiBncm91cEluZGV4O1xufVxuXG5mdW5jdGlvbiBfdXBkYXRlQ3VsbGluZ01hc2sgKG5vZGUpIHtcbiAgICBsZXQgaW5kZXggPSBfZ2V0QWN0dWFsR3JvdXBJbmRleChub2RlKTtcbiAgICBub2RlLl9jdWxsaW5nTWFzayA9IDEgPDwgaW5kZXg7XG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICBub2RlLl9wcm94eSAmJiBub2RlLl9wcm94eS51cGRhdGVDdWxsaW5nTWFzaygpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayhub2RlLl9jaGlsZHJlbltpXSk7XG4gICAgfVxufVxuXG4vLyAyRC8zRCBtYXRyaXggZnVuY3Rpb25zXG5mdW5jdGlvbiB1cGRhdGVMb2NhbE1hdHJpeDNEICgpIHtcbiAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRyYW5zZm9ybVxuICAgICAgICBsZXQgdCA9IHRoaXMuX21hdHJpeDtcbiAgICAgICAgbGV0IHRtID0gdC5tO1xuICAgICAgICBUcnMudG9NYXQ0KHQsIHRoaXMuX3Rycyk7XG5cbiAgICAgICAgLy8gc2tld1xuICAgICAgICBpZiAodGhpcy5fc2tld1ggfHwgdGhpcy5fc2tld1kpIHtcbiAgICAgICAgICAgIGxldCBhID0gdG1bMF0sIGIgPSB0bVsxXSwgYyA9IHRtWzRdLCBkID0gdG1bNV07XG4gICAgICAgICAgICBsZXQgc2t4ID0gTWF0aC50YW4odGhpcy5fc2tld1ggKiBPTkVfREVHUkVFKTtcbiAgICAgICAgICAgIGxldCBza3kgPSBNYXRoLnRhbih0aGlzLl9za2V3WSAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgaWYgKHNreCA9PT0gSW5maW5pdHkpXG4gICAgICAgICAgICAgICAgc2t4ID0gOTk5OTk5OTk7XG4gICAgICAgICAgICBpZiAoc2t5ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICBza3kgPSA5OTk5OTk5OTtcbiAgICAgICAgICAgIHRtWzBdID0gYSArIGMgKiBza3k7XG4gICAgICAgICAgICB0bVsxXSA9IGIgKyBkICogc2t5O1xuICAgICAgICAgICAgdG1bNF0gPSBjICsgYSAqIHNreDtcbiAgICAgICAgICAgIHRtWzVdID0gZCArIGIgKiBza3g7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxNYXREaXJ0eSAmPSB+TG9jYWxEaXJ0eUZsYWcuVFJTUztcbiAgICAgICAgLy8gUmVnaXN0ZXIgZGlydHkgc3RhdHVzIG9mIHdvcmxkIG1hdHJpeCBzbyB0aGF0IGl0IGNhbiBiZSByZWNhbGN1bGF0ZWRcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbE1hdHJpeDJEICgpIHtcbiAgICBsZXQgZGlydHlGbGFnID0gdGhpcy5fbG9jYWxNYXREaXJ0eTtcbiAgICBpZiAoIShkaXJ0eUZsYWcgJiBMb2NhbERpcnR5RmxhZy5UUlNTKSkgcmV0dXJuO1xuXG4gICAgLy8gVXBkYXRlIHRyYW5zZm9ybVxuICAgIGxldCB0ID0gdGhpcy5fbWF0cml4O1xuICAgIGxldCB0bSA9IHQubTtcbiAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuXG4gICAgaWYgKGRpcnR5RmxhZyAmIChMb2NhbERpcnR5RmxhZy5SUyB8IExvY2FsRGlydHlGbGFnLlNLRVcpKSB7XG4gICAgICAgIGxldCByb3RhdGlvbiA9IC10aGlzLl9ldWxlckFuZ2xlcy56O1xuICAgICAgICBsZXQgaGFzU2tldyA9IHRoaXMuX3NrZXdYIHx8IHRoaXMuX3NrZXdZO1xuICAgICAgICBsZXQgc3ggPSB0cnNbN10sIHN5ID0gdHJzWzhdO1xuXG4gICAgICAgIGlmIChyb3RhdGlvbiB8fCBoYXNTa2V3KSB7XG4gICAgICAgICAgICBsZXQgYSA9IDEsIGIgPSAwLCBjID0gMCwgZCA9IDE7XG4gICAgICAgICAgICAvLyByb3RhdGlvblxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdGF0aW9uUmFkaWFucyA9IHJvdGF0aW9uICogT05FX0RFR1JFRTtcbiAgICAgICAgICAgICAgICBjID0gTWF0aC5zaW4ocm90YXRpb25SYWRpYW5zKTtcbiAgICAgICAgICAgICAgICBkID0gTWF0aC5jb3Mocm90YXRpb25SYWRpYW5zKTtcbiAgICAgICAgICAgICAgICBhID0gZDtcbiAgICAgICAgICAgICAgICBiID0gLWM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzY2FsZVxuICAgICAgICAgICAgdG1bMF0gPSBhICo9IHN4O1xuICAgICAgICAgICAgdG1bMV0gPSBiICo9IHN4O1xuICAgICAgICAgICAgdG1bNF0gPSBjICo9IHN5O1xuICAgICAgICAgICAgdG1bNV0gPSBkICo9IHN5O1xuICAgICAgICAgICAgLy8gc2tld1xuICAgICAgICAgICAgaWYgKGhhc1NrZXcpIHtcbiAgICAgICAgICAgICAgICBsZXQgYSA9IHRtWzBdLCBiID0gdG1bMV0sIGMgPSB0bVs0XSwgZCA9IHRtWzVdO1xuICAgICAgICAgICAgICAgIGxldCBza3ggPSBNYXRoLnRhbih0aGlzLl9za2V3WCAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgICAgIGxldCBza3kgPSBNYXRoLnRhbih0aGlzLl9za2V3WSAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgICAgIGlmIChza3ggPT09IEluZmluaXR5KVxuICAgICAgICAgICAgICAgICAgICBza3ggPSA5OTk5OTk5OTtcbiAgICAgICAgICAgICAgICBpZiAoc2t5ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICAgICAgc2t5ID0gOTk5OTk5OTk7XG4gICAgICAgICAgICAgICAgdG1bMF0gPSBhICsgYyAqIHNreTtcbiAgICAgICAgICAgICAgICB0bVsxXSA9IGIgKyBkICogc2t5O1xuICAgICAgICAgICAgICAgIHRtWzRdID0gYyArIGEgKiBza3g7XG4gICAgICAgICAgICAgICAgdG1bNV0gPSBkICsgYiAqIHNreDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRtWzBdID0gc3g7XG4gICAgICAgICAgICB0bVsxXSA9IDA7XG4gICAgICAgICAgICB0bVs0XSA9IDA7XG4gICAgICAgICAgICB0bVs1XSA9IHN5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0bVsxMl0gPSB0cnNbMF07XG4gICAgdG1bMTNdID0gdHJzWzFdO1xuXG4gICAgdGhpcy5fbG9jYWxNYXREaXJ0eSAmPSB+TG9jYWxEaXJ0eUZsYWcuVFJTUztcbiAgICAvLyBSZWdpc3RlciBkaXJ0eSBzdGF0dXMgb2Ygd29ybGQgbWF0cml4IHNvIHRoYXQgaXQgY2FuIGJlIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxXb3JsZE1hdHJpeDNEICgpIHtcbiAgICAvLyBBdm9pZCBhcyBtdWNoIGZ1bmN0aW9uIGNhbGwgYXMgcG9zc2libGVcbiAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnRNYXQgPSB0aGlzLl9wYXJlbnQuX3dvcmxkTWF0cml4O1xuICAgICAgICBNYXQ0Lm11bCh0aGlzLl93b3JsZE1hdHJpeCwgcGFyZW50TWF0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTWF0NC5jb3B5KHRoaXMuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bFdvcmxkTWF0cml4MkQgKCkge1xuICAgIC8vIEF2b2lkIGFzIG11Y2ggZnVuY3Rpb24gY2FsbCBhcyBwb3NzaWJsZVxuICAgIGlmICh0aGlzLl9sb2NhbE1hdERpcnR5ICYgTG9jYWxEaXJ0eUZsYWcuVFJTUykge1xuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgIH1cblxuICAgIC8vIEFzc3VtZSBwYXJlbnQgd29ybGQgbWF0cml4IGlzIGNvcnJlY3RcbiAgICBsZXQgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fbXVsTWF0KHRoaXMuX3dvcmxkTWF0cml4LCBwYXJlbnQuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTWF0NC5jb3B5KHRoaXMuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG11bE1hdDJEIChvdXQsIGEsIGIpIHtcbiAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XG4gICAgbGV0IGFhPWFtWzBdLCBhYj1hbVsxXSwgYWM9YW1bNF0sIGFkPWFtWzVdLCBhdHg9YW1bMTJdLCBhdHk9YW1bMTNdO1xuICAgIGxldCBiYT1ibVswXSwgYmI9Ym1bMV0sIGJjPWJtWzRdLCBiZD1ibVs1XSwgYnR4PWJtWzEyXSwgYnR5PWJtWzEzXTtcbiAgICBpZiAoYWIgIT09IDAgfHwgYWMgIT09IDApIHtcbiAgICAgICAgb3V0bVswXSA9IGJhICogYWEgKyBiYiAqIGFjO1xuICAgICAgICBvdXRtWzFdID0gYmEgKiBhYiArIGJiICogYWQ7XG4gICAgICAgIG91dG1bNF0gPSBiYyAqIGFhICsgYmQgKiBhYztcbiAgICAgICAgb3V0bVs1XSA9IGJjICogYWIgKyBiZCAqIGFkO1xuICAgICAgICBvdXRtWzEyXSA9IGFhICogYnR4ICsgYWMgKiBidHkgKyBhdHg7XG4gICAgICAgIG91dG1bMTNdID0gYWIgKiBidHggKyBhZCAqIGJ0eSArIGF0eTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG91dG1bMF0gPSBiYSAqIGFhO1xuICAgICAgICBvdXRtWzFdID0gYmIgKiBhZDtcbiAgICAgICAgb3V0bVs0XSA9IGJjICogYWE7XG4gICAgICAgIG91dG1bNV0gPSBiZCAqIGFkO1xuICAgICAgICBvdXRtWzEyXSA9IGFhICogYnR4ICsgYXR4O1xuICAgICAgICBvdXRtWzEzXSA9IGFkICogYnR5ICsgYXR5O1xuICAgIH1cbn1cblxuY29uc3QgbXVsTWF0M0QgPSBNYXQ0Lm11bDtcblxuLyoqXG4gKiAhI2VuXG4gKiBDbGFzcyBvZiBhbGwgZW50aXRpZXMgaW4gQ29jb3MgQ3JlYXRvciBzY2VuZXMuPGJyLz5cbiAqIEZvciBldmVudHMgc3VwcG9ydGVkIGJ5IE5vZGUsIHBsZWFzZSByZWZlciB0byB7eyNjcm9zc0xpbmsgXCJOb2RlLkV2ZW50VHlwZVwifX17ey9jcm9zc0xpbmt9fVxuICogISN6aFxuICogQ29jb3MgQ3JlYXRvciDlnLrmma/kuK3nmoTmiYDmnInoioLngrnnsbvjgII8YnIvPlxuICog5pSv5oyB55qE6IqC54K55LqL5Lu277yM6K+35Y+C6ZiFIHt7I2Nyb3NzTGluayBcIk5vZGUuRXZlbnRUeXBlXCJ9fXt7L2Nyb3NzTGlua31944CCXG4gKiBAY2xhc3MgTm9kZVxuICogQGV4dGVuZHMgX0Jhc2VOb2RlXG4gKi9cbmxldCBOb2RlRGVmaW5lcyA9IHtcbiAgICBuYW1lOiAnY2MuTm9kZScsXG4gICAgZXh0ZW5kczogQmFzZU5vZGUsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIFNFUklBTElaQUJMRVxuICAgICAgICBfb3BhY2l0eTogMjU1LFxuICAgICAgICBfY29sb3I6IGNjLkNvbG9yLldISVRFLFxuICAgICAgICBfY29udGVudFNpemU6IGNjLlNpemUsXG4gICAgICAgIF9hbmNob3JQb2ludDogY2MudjIoMC41LCAwLjUpLFxuICAgICAgICBfcG9zaXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgX3NjYWxlOiB1bmRlZmluZWQsXG4gICAgICAgIF90cnM6IG51bGwsXG4gICAgICAgIF9ldWxlckFuZ2xlczogY2MuVmVjMyxcbiAgICAgICAgX3NrZXdYOiAwLjAsXG4gICAgICAgIF9za2V3WTogMC4wLFxuICAgICAgICBfekluZGV4OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gICAgICAgIH0sXG4gICAgICAgIF9sb2NhbFpPcmRlcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2lzM0ROb2RlOiBmYWxzZSxcblxuICAgICAgICAvLyBpbnRlcm5hbCBwcm9wZXJ0aWVzXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEdyb3VwIGluZGV4IG9mIG5vZGUuPGJyLz5cbiAgICAgICAgICogV2hpY2ggR3JvdXAgdGhpcyBub2RlIGJlbG9uZ3MgdG8gd2lsbCByZXNvbHZlIHRoYXQgdGhpcyBub2RlJ3MgY29sbGlzaW9uIGNvbXBvbmVudHMgY2FuIGNvbGxpZGUgd2l0aCB3aGljaCBvdGhlciBjb2xsaXNpb24gY29tcG9uZW50bnMuPGJyLz5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDoioLngrnnmoTliIbnu4TntKLlvJXjgII8YnIvPlxuICAgICAgICAgKiDoioLngrnnmoTliIbnu4TlsIblhbPns7vliLDoioLngrnnmoTnorDmkp7nu4Tku7blj6/ku6XkuI7lk6rkupvnorDmkp7nu4Tku7bnm7jnorDmkp7jgII8YnIvPlxuICAgICAgICAgKiBAcHJvcGVydHkgZ3JvdXBJbmRleFxuICAgICAgICAgKiBAdHlwZSB7SW50ZWdlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgX2dyb3VwSW5kZXg6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ2dyb3VwSW5kZXgnXG4gICAgICAgIH0sXG4gICAgICAgIGdyb3VwSW5kZXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dyb3VwSW5kZXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dyb3VwSW5kZXggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBfdXBkYXRlQ3VsbGluZ01hc2sodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5HUk9VUF9DSEFOR0VELCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBHcm91cCBvZiBub2RlLjxici8+XG4gICAgICAgICAqIFdoaWNoIEdyb3VwIHRoaXMgbm9kZSBiZWxvbmdzIHRvIHdpbGwgcmVzb2x2ZSB0aGF0IHRoaXMgbm9kZSdzIGNvbGxpc2lvbiBjb21wb25lbnRzIGNhbiBjb2xsaWRlIHdpdGggd2hpY2ggb3RoZXIgY29sbGlzaW9uIGNvbXBvbmVudG5zLjxici8+XG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6IqC54K555qE5YiG57uE44CCPGJyLz5cbiAgICAgICAgICog6IqC54K555qE5YiG57uE5bCG5YWz57O75Yiw6IqC54K555qE56Kw5pKe57uE5Lu25Y+v5Lul5LiO5ZOq5Lqb56Kw5pKe57uE5Lu255u456Kw5pKe44CCPGJyLz5cbiAgICAgICAgICogQHByb3BlcnR5IGdyb3VwXG4gICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBncm91cDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuZ2FtZS5ncm91cExpc3RbdGhpcy5ncm91cEluZGV4XSB8fCAnJztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGdyb3VwSW5kZXhcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VwSW5kZXggPSBjYy5nYW1lLmdyb3VwTGlzdC5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL3Byb3BlcnRpZXMgbW92ZWQgZnJvbSBiYXNlIG5vZGUgYmVnaW5cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgcG9zaXRpb24gKHgsIHkpIG9mIHRoZSBub2RlIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlcy5cbiAgICAgICAgICogISN6aCDoioLngrnlnKjniLboioLngrnlnZDmoIfns7vkuK3nmoTkvY3nva7vvIh4LCB577yJ44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gcG9zaXRpb25cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBQb3NpdGlvbjogXCIgKyBub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4geCBheGlzIHBvc2l0aW9uIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K5IFgg6L205Z2Q5qCH44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB4XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUueCA9IDEwMDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBQb3NpdGlvbiBYOiBcIiArIG5vZGUueCk7XG4gICAgICAgICAqL1xuICAgICAgICB4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbMF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IgfHwgaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgPSB0cnNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyc1swXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgY2hlY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgbmV3IGNjLlZlYzMob2xkVmFsdWUsIHRyc1sxXSwgdHJzWzJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUl9JTlZBTElEX05VTUJFUiwgJ25ldyB4Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHkgYXhpcyBwb3NpdGlvbiBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBZIOi9tOWdkOagh+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgeVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnkgPSAxMDA7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgUG9zaXRpb24gWTogXCIgKyBub2RlLnkpO1xuICAgICAgICAgKi9cbiAgICAgICAgeToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzFdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SIHx8IGlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gdHJzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnNbMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUE9TSVRJT04pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZW5kIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIG5ldyBjYy5WZWMzKHRyc1swXSwgb2xkVmFsdWUsIHRyc1syXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihFUlJfSU5WQUxJRF9OVU1CRVIsICduZXcgeScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB6IGF4aXMgcG9zaXRpb24gb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDoioLngrkgWiDovbTlnZDmoIfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHpcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHo6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1syXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRyc1syXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHRyc1syXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyc1syXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICAhQ0NfTkFUSVZFUkVOREVSRVIgJiYgKHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1dPUkxEX1RSQU5TRk9STSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgbmV3IGNjLlZlYzModHJzWzBdLCB0cnNbMV0sIG9sZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUl9JTlZBTElEX05VTUJFUiwgJ25ldyB6Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUm90YXRpb24gb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDor6XoioLngrnml4vovazop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5yb3RhdGlvbiA9IDkwO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFJvdGF0aW9uOiBcIiArIG5vZGUucm90YXRpb24pO1xuICAgICAgICAgKi9cbiAgICAgICAgcm90YXRpb246IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvbmAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSB1c2UgYC1hbmdsZWAgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb25gIC0+IGAtdGhpcy5ub2RlLmFuZ2xlYClcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAtdGhpcy5hbmdsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvbmAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSBzZXQgYC1hbmdsZWAgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb24gPSB4YCAtPiBgdGhpcy5ub2RlLmFuZ2xlID0gLXhgKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC12YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBBbmdsZSBvZiBub2RlLCB0aGUgcG9zaXRpdmUgdmFsdWUgaXMgYW50aS1jbG9ja3dpc2UgZGlyZWN0aW9uLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOivpeiKgueCueeahOaXi+i9rOinkuW6pu+8jOato+WAvOS4uumAhuaXtumSiOaWueWQkeOAglxuICAgICAgICAgKiBAcHJvcGVydHkgYW5nbGVcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGFuZ2xlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldWxlckFuZ2xlcy56O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBWZWMzLnNldCh0aGlzLl9ldWxlckFuZ2xlcywgMCwgMCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIFRycy5mcm9tQW5nbGVaKHRoaXMuX3RycywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUk9UQVRJT04pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFJPVEFUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSByb3RhdGlvbiBhcyBFdWxlciBhbmdsZXMgaW4gZGVncmVlcywgdXNlZCBpbiAzRCBub2RlLlxuICAgICAgICAgKiAhI3poIOivpeiKgueCueeahOasp+aLieinkuW6pu+8jOeUqOS6jiAzRCDoioLngrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGV1bGVyQW5nbGVzXG4gICAgICAgICAqIEB0eXBlIHtWZWMzfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmlzM0ROb2RlID0gdHJ1ZTtcbiAgICAgICAgICogbm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKDQ1LCA0NSwgNDUpO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIGV1bGVyQW5nbGVzIChYLCBZLCBaKTogXCIgKyBub2RlLmV1bGVyQW5nbGVzLnRvU3RyaW5nKCkpO1xuICAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSb3RhdGlvbiBvbiB4IGF4aXMuXG4gICAgICAgICAqICEjemgg6K+l6IqC54K5IFgg6L205peL6L2s6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSByb3RhdGlvblhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmlzM0ROb2RlID0gdHJ1ZTtcbiAgICAgICAgICogbm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKDQ1LCAwLCAwKTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBldWxlckFuZ2xlcyBYOiBcIiArIG5vZGUuZXVsZXJBbmdsZXMueCk7XG4gICAgICAgICAqL1xuICAgICAgICByb3RhdGlvblg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvblhgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2UgdXNlIGBldWxlckFuZ2xlcy54YCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvblhgIC0+IGB0aGlzLm5vZGUuZXVsZXJBbmdsZXMueGApXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXVsZXJBbmdsZXMueDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvblhgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2Ugc2V0IGBldWxlckFuZ2xlc2AgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb25YID0geGAgLT4gYHRoaXMubm9kZS5pczNETm9kZSA9IHRydWU7IHRoaXMubm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKHgsIDAsIDApYFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V1bGVyQW5nbGVzLnggIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V1bGVyQW5nbGVzLnggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHF1YXRlcm5pb24gZnJvbSByb3RhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXVsZXJBbmdsZXMueCA9PT0gdGhpcy5fZXVsZXJBbmdsZXMueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJzLmZyb21BbmdsZVoodGhpcy5fdHJzLCAtdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJzLmZyb21FdWxlck51bWJlcih0aGlzLl90cnMsIHZhbHVlLCB0aGlzLl9ldWxlckFuZ2xlcy55LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFJvdGF0aW9uIG9uIHkgYXhpcy5cbiAgICAgICAgICogISN6aCDor6XoioLngrkgWSDovbTml4vovazop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uWVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuaXMzRE5vZGUgPSB0cnVlO1xuICAgICAgICAgKiBub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoMCwgNDUsIDApO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIGV1bGVyQW5nbGVzIFk6IFwiICsgbm9kZS5ldWxlckFuZ2xlcy55KTtcbiAgICAgICAgICovXG4gICAgICAgIHJvdGF0aW9uWToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSB1c2UgYGV1bGVyQW5nbGVzLnlgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uWWAgLT4gYHRoaXMubm9kZS5ldWxlckFuZ2xlcy55YClcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldWxlckFuZ2xlcy55O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSBzZXQgYGV1bGVyQW5nbGVzYCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvblkgPSB5YCAtPiBgdGhpcy5ub2RlLmlzM0ROb2RlID0gdHJ1ZTsgdGhpcy5ub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoMCwgeSwgMClgXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXVsZXJBbmdsZXMueSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXVsZXJBbmdsZXMueSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgcXVhdGVybmlvbiBmcm9tIHJvdGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldWxlckFuZ2xlcy54ID09PSB0aGlzLl9ldWxlckFuZ2xlcy55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUcnMuZnJvbUFuZ2xlWih0aGlzLl90cnMsIC12YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUcnMuZnJvbUV1bGVyTnVtYmVyKHRoaXMuX3RycywgdGhpcy5fZXVsZXJBbmdsZXMueCwgdmFsdWUsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUk9UQVRJT04pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgZXVsZXJBbmdsZXM6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXVsZXJBbmdsZXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJzLnRvRXVsZXIodGhpcy5fZXVsZXJBbmdsZXMsIHRoaXMuX3Rycyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldWxlckFuZ2xlcy5zZXQodik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgVHJzLmZyb21FdWxlcih0aGlzLl90cnMsIHYpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUk9UQVRJT04pO1xuICAgICAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBmb3IgTWVzaCBTa2VsZXRvbiBBbmltYXRpb25cbiAgICAgICAgLy8gU2hvdWxkIGJlIHJlbW92ZWQgd2hlbiBub2RlLnJvdGF0aW9uIHVwZ3JhZGUgdG8gcXVhdGVybmlvbiB2YWx1ZVxuICAgICAgICBxdWF0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRyc1szXSwgdHJzWzRdLCB0cnNbNV0sIHRyc1s2XSk7XG4gICAgICAgICAgICB9LCBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvdGF0aW9uKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBsb2NhbCBzY2FsZSByZWxhdGl2ZSB0byB0aGUgcGFyZW50LlxuICAgICAgICAgKiAhI3poIOiKgueCueebuOWvueeItuiKgueCueeahOe8qeaUvuOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5zY2FsZSA9IDE7XG4gICAgICAgICAqL1xuICAgICAgICBzY2FsZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzddO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2NhbGUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2NhbGUgb24geCBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBYIOi9tOe8qeaUvuOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVYXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuc2NhbGVYID0gMC41O1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFNjYWxlIFg6IFwiICsgbm9kZS5zY2FsZVgpO1xuICAgICAgICAgKi9cbiAgICAgICAgc2NhbGVYOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbN107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cnNbN10gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Ryc1s3XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0NBTEVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNjYWxlIG9uIHkgYXhpcy5cbiAgICAgICAgICogISN6aCDoioLngrkgWSDovbTnvKnmlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlWVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNjYWxlWSA9IDAuNTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBTY2FsZSBZOiBcIiArIG5vZGUuc2NhbGVZKTtcbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlWToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzhdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJzWzhdICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnNbOF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9TQ0FMRSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTY2FsZSBvbiB6IGF4aXMuXG4gICAgICAgICAqICEjemgg6IqC54K5IFog6L2057yp5pS+44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVpcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlWjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzldO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJzWzldICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnNbOV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9TQ0FMRSk7XG4gICAgICAgICAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0NBTEVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2tldyB4XG4gICAgICAgICAqICEjemgg6K+l6IqC54K5IFgg6L205YC+5pac6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBza2V3WFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNrZXdYID0gMDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBTa2V3WDogXCIgKyBub2RlLnNrZXdYKTtcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMi4xXG4gICAgICAgICAqL1xuICAgICAgICBza2V3WDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tld1g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9za2V3V2Fybih2YWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9za2V3WCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5TS0VXKTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb3h5LnVwZGF0ZVNrZXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNrZXcgeVxuICAgICAgICAgKiAhI3poIOivpeiKgueCuSBZIOi9tOWAvuaWnOinkuW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc2tld1lcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5za2V3WSA9IDA7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgU2tld1k6IFwiICsgbm9kZS5za2V3WSk7XG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjIuMVxuICAgICAgICAgKi9cbiAgICAgICAgc2tld1k6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NrZXdZO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBfc2tld1dhcm4odmFsdWUsIHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tld1kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuU0tFVyk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm94eS51cGRhdGVTa2V3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBPcGFjaXR5IG9mIG5vZGUsIGRlZmF1bHQgdmFsdWUgaXMgMjU1LlxuICAgICAgICAgKiAhI3poIOiKgueCuemAj+aYjuW6pu+8jOm7mOiupOWAvOS4uiAyNTXjgIJcbiAgICAgICAgICogQHByb3BlcnR5IG9wYWNpdHlcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgKi9cbiAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjYy5taXNjLmNsYW1wZih2YWx1ZSwgMCwgMjU1KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3BhY2l0eSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm94eS51cGRhdGVPcGFjaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfT1BBQ0lUWV9DT0xPUjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmFuZ2U6IFswLCAyNTVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ29sb3Igb2Ygbm9kZSwgZGVmYXVsdCB2YWx1ZSBpcyB3aGl0ZTogKDI1NSwgMjU1LCAyNTUpLlxuICAgICAgICAgKiAhI3poIOiKgueCueminOiJsuOAgum7mOiupOS4uueZveiJsu+8jOaVsOWAvOS4uu+8mu+8iDI1Ne+8jDI1Ne+8jDI1Ne+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICAgKi9cbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmNsb25lKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jb2xvci5lcXVhbHModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERVYgJiYgdmFsdWUuYSAhPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTYyNik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DT0xPUjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgQ09MT1JfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBBbmNob3IgcG9pbnQncyBwb3NpdGlvbiBvbiB4IGF4aXMuXG4gICAgICAgICAqICEjemgg6IqC54K5IFgg6L206ZSa54K55L2N572u44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbmNob3JYXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuYW5jaG9yWCA9IDA7XG4gICAgICAgICAqL1xuICAgICAgICBhbmNob3JYOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JQb2ludC54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5jaG9yUG9pbnQgPSB0aGlzLl9hbmNob3JQb2ludDtcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yUG9pbnQueCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yUG9pbnQueCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgQU5DSE9SX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQW5jaG9yIHBvaW50J3MgcG9zaXRpb24gb24geSBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBZIOi9tOmUmueCueS9jee9ruOAglxuICAgICAgICAgKiBAcHJvcGVydHkgYW5jaG9yWVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmFuY2hvclkgPSAwO1xuICAgICAgICAgKi9cbiAgICAgICAgYW5jaG9yWToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yUG9pbnQueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFuY2hvclBvaW50ID0gdGhpcy5fYW5jaG9yUG9pbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvclBvaW50LnkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvclBvaW50LnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdpZHRoIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K55a695bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLndpZHRoID0gMTAwO1xuICAgICAgICAgKi9cbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9IGNjLnNpemUodGhpcy5fY29udGVudFNpemUud2lkdGgsIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGVudFNpemUud2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNJWkVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgY2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBIZWlnaHQgb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDoioLngrnpq5jluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICovXG4gICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBjYy5zaXplKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoLCB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0laRV9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VELCBjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHpJbmRleCBpcyB0aGUgJ2tleScgdXNlZCB0byBzb3J0IHRoZSBub2RlIHJlbGF0aXZlIHRvIGl0cyBzaWJsaW5ncy48YnIvPlxuICAgICAgICAgKiBUaGUgdmFsdWUgb2YgekluZGV4IHNob3VsZCBiZSBpbiB0aGUgcmFuZ2UgYmV0d2VlbiBjYy5tYWNyby5NSU5fWklOREVYIGFuZCBjYy5tYWNyby5NQVhfWklOREVYLjxici8+XG4gICAgICAgICAqIFRoZSBOb2RlJ3MgcGFyZW50IHdpbGwgc29ydCBhbGwgaXRzIGNoaWxkcmVuIGJhc2VkIG9uIHRoZSB6SW5kZXggdmFsdWUgYW5kIHRoZSBhcnJpdmFsIG9yZGVyLjxici8+XG4gICAgICAgICAqIE5vZGVzIHdpdGggZ3JlYXRlciB6SW5kZXggd2lsbCBiZSBzb3J0ZWQgYWZ0ZXIgbm9kZXMgd2l0aCBzbWFsbGVyIHpJbmRleC48YnIvPlxuICAgICAgICAgKiBJZiB0d28gbm9kZXMgaGF2ZSB0aGUgc2FtZSB6SW5kZXgsIHRoZW4gdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWQgZmlyc3QgdG8gdGhlIGNoaWxkcmVuJ3MgYXJyYXkgd2lsbCBiZSBpbiBmcm9udCBvZiB0aGUgb3RoZXIgbm9kZSBpbiB0aGUgYXJyYXkuPGJyLz5cbiAgICAgICAgICogTm9kZSdzIG9yZGVyIGluIGNoaWxkcmVuIGxpc3Qgd2lsbCBhZmZlY3QgaXRzIHJlbmRlcmluZyBvcmRlci4gUGFyZW50IGlzIGFsd2F5cyByZW5kZXJpbmcgYmVmb3JlIGFsbCBjaGlsZHJlbi5cbiAgICAgICAgICogISN6aCB6SW5kZXgg5piv55So5p2l5a+56IqC54K56L+b6KGM5o6S5bqP55qE5YWz6ZSu5bGe5oCn77yM5a6D5Yaz5a6a5LiA5Liq6IqC54K55Zyo5YWE5byf6IqC54K55LmL6Ze055qE5L2N572u44CCPGJyLz5cbiAgICAgICAgICogekluZGV4IOeahOWPluWAvOW6lOivpeS7i+S6jiBjYy5tYWNyby5NSU5fWklOREVYIOWSjCBjYy5tYWNyby5NQVhfWklOREVYIOS5i+mXtFxuICAgICAgICAgKiDniLboioLngrnkuLvopoHmoLnmja7oioLngrnnmoQgekluZGV4IOWSjOa3u+WKoOasoeW6j+adpeaOkuW6j++8jOaLpeacieabtOmrmCB6SW5kZXgg55qE6IqC54K55bCG6KKr5o6S5Zyo5ZCO6Z2i77yM5aaC5p6c5Lik5Liq6IqC54K555qEIHpJbmRleCDkuIDoh7TvvIzlhYjmt7vliqDnmoToioLngrnkvJrnqLPlrprmjpLlnKjlj6bkuIDkuKroioLngrnkuYvliY3jgII8YnIvPlxuICAgICAgICAgKiDoioLngrnlnKggY2hpbGRyZW4g5Lit55qE6aG65bqP5Yaz5a6a5LqG5YW25riy5p+T6aG65bqP44CC54i26IqC54K55rC46L+c5Zyo5omA5pyJ5a2Q6IqC54K55LmL5YmN6KKr5riy5p+TXG4gICAgICAgICAqIEBwcm9wZXJ0eSB6SW5kZXhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS56SW5kZXggPSAxO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIHpJbmRleDogXCIgKyBub2RlLnpJbmRleCk7XG4gICAgICAgICAqL1xuICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsWk9yZGVyID4+IDE2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiBtYWNyby5NQVhfWklOREVYKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNjM2KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtYWNyby5NQVhfWklOREVYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA8IG1hY3JvLk1JTl9aSU5ERVgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDE2MzcpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1hY3JvLk1JTl9aSU5ERVg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuekluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9ICh0aGlzLl9sb2NhbFpPcmRlciAmIDB4MDAwMGZmZmYpIHwgKHZhbHVlIDw8IDE2KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSUJMSU5HX09SREVSX0NIQU5HRUQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uU2libGluZ0luZGV4Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTd2l0Y2ggMkQvM0Qgbm9kZS4gVGhlIDJEIG5vZGVzIHdpbGwgcnVuIGZhc3Rlci5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDliIfmjaIgMkQvM0Qg6IqC54K577yMMkQg6IqC54K55Lya5pyJ5pu06auY55qE6L+Q6KGM5pWI546HXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXMzRE5vZGVcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgKi9cbiAgICAgICAgaXMzRE5vZGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzM0ROb2RlO1xuICAgICAgICAgICAgfSwgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXMzRE5vZGUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZTNERnVuY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSZXR1cm5zIGEgbm9ybWFsaXplZCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB1cCBkaXJlY3Rpb24gKFkgYXhpcykgb2YgdGhlIG5vZGUgaW4gd29ybGQgc3BhY2UuXG4gICAgICAgICAqICEjemgg6I635Y+W6IqC54K55q2j5LiK5pa577yIeSDovbTvvInpnaLlr7nnmoTmlrnlkJHvvIzov5Tlm57lgLzkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTlvZLkuIDljJblkJHph49cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHVwXG4gICAgICAgICAqIEB0eXBlIHtWZWMzfVxuICAgICAgICAgKi9cbiAgICAgICAgdXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF91cCA9IFZlYzMudHJhbnNmb3JtUXVhdChfdXJmVmVjMywgVmVjMy5VUCwgdGhpcy5nZXRXb3JsZFJvdGF0aW9uKF91cmZRdWF0KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF91cC5jbG9uZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFJldHVybnMgYSBub3JtYWxpemVkIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHJpZ2h0IGRpcmVjdGlvbiAoWCBheGlzKSBvZiB0aGUgbm9kZSBpbiB3b3JsZCBzcGFjZS5cbiAgICAgICAgICogISN6aCDojrflj5boioLngrnmraPlj7PmlrnvvIh4IOi9tO+8iemdouWvueeahOaWueWQke+8jOi/lOWbnuWAvOS4uuS4lueVjOWdkOagh+ezu+S4i+eahOW9kuS4gOWMluWQkemHj1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgcmlnaHRcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JpZ2h0ID0gVmVjMy50cmFuc2Zvcm1RdWF0KF91cmZWZWMzLCBWZWMzLlJJR0hULCB0aGlzLmdldFdvcmxkUm90YXRpb24oX3VyZlF1YXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JpZ2h0LmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmV0dXJucyBhIG5vcm1hbGl6ZWQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgZm9yd2FyZCBkaXJlY3Rpb24gKFogYXhpcykgb2YgdGhlIG5vZGUgaW4gd29ybGQgc3BhY2UuXG4gICAgICAgICAqICEjemgg6I635Y+W6IqC54K55q2j5YmN5pa577yIeiDovbTvvInpnaLlr7nnmoTmlrnlkJHvvIzov5Tlm57lgLzkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTlvZLkuIDljJblkJHph49cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IGZvcndhcmRcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICBmb3J3YXJkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHZhciBfZm9yd2FyZCA9IFZlYzMudHJhbnNmb3JtUXVhdChfdXJmVmVjMywgVmVjMy5GT1JXQVJELCB0aGlzLmdldFdvcmxkUm90YXRpb24oX3VyZlF1YXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZvcndhcmQuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKi9cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcmVvcmRlckNoaWxkRGlydHkgPSBmYWxzZTtcblxuICAgICAgICAvLyBjYWNoZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgLy8gZmFzdCByZW5kZXIgY29tcG9uZW50IGFjY2Vzc1xuICAgICAgICB0aGlzLl9yZW5kZXJDb21wb25lbnQgPSBudWxsO1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICAvLyBUb3VjaCBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgLy8gTW91c2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5faW5pdERhdGFGcm9tUG9vbCgpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50TWFzayA9IDA7XG4gICAgICAgIHRoaXMuX2N1bGxpbmdNYXNrID0gMTtcbiAgICAgICAgdGhpcy5fY2hpbGRBcnJpdmFsT3JkZXIgPSAxO1xuXG4gICAgICAgIC8vIFByb3h5XG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ID0gbmV3IHJlbmRlcmVyLk5vZGVQcm94eSh0aGlzLl9zcGFjZUluZm8udW5pdElELCB0aGlzLl9zcGFjZUluZm8uaW5kZXgsIHRoaXMuX2lkLCB0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5LmluaXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHJlc2V0IF9yZW5kZXJGbGFnIGZvciBib3RoIHdlYiBhbmQgbmF0aXZlXG4gICAgICAgIHRoaXMuX3JlbmRlckZsYWcgPSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNIHwgUmVuZGVyRmxvdy5GTEFHX09QQUNJVFlfQ09MT1I7XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRXZlbnRUeXBlLFxuICAgICAgICBfTG9jYWxEaXJ0eUZsYWc6IExvY2FsRGlydHlGbGFnLFxuICAgICAgICAvLyBpcyBub2RlIGJ1dCBub3Qgc2NlbmVcbiAgICAgICAgaXNOb2RlIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBOb2RlICYmIChvYmouY29uc3RydWN0b3IgPT09IE5vZGUgfHwgIShvYmogaW5zdGFuY2VvZiBjYy5TY2VuZSkpO1xuICAgICAgICB9LFxuICAgICAgICBCdWlsdGluR3JvdXBJbmRleFxuICAgIH0sXG5cbiAgICAvLyBPVkVSUklERVNcblxuICAgIF9vblNpYmxpbmdJbmRleENoYW5nZWQgKCkge1xuICAgICAgICAvLyB1cGRhdGUgcmVuZGVyaW5nIHNjZW5lIGdyYXBoLCBzb3J0IHRoZW0gYnkgYXJyaXZhbE9yZGVyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fZGVsYXlTb3J0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uUHJlRGVzdHJveSAoKSB7XG4gICAgICAgIHZhciBkZXN0cm95QnlQYXJlbnQgPSB0aGlzLl9vblByZURlc3Ryb3lCYXNlKCk7XG5cbiAgICAgICAgLy8gQWN0aW9uc1xuICAgICAgICBpZiAoQWN0aW9uTWFuYWdlckV4aXN0KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgTm9kZS5jdXJyZW50SG92ZXJlZFxuICAgICAgICBpZiAoX2N1cnJlbnRIb3ZlcmVkID09PSB0aGlzKSB7XG4gICAgICAgICAgICBfY3VycmVudEhvdmVyZWQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgJiYgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciB8fCB0aGlzLl9tb3VzZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fcHJveHkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmFja0RhdGFJbnRvUG9vbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX19mYXN0T2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5zb3J0QWxsQ2hpbGRyZW4sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkZXN0cm95QnlQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIHNvbWUgZGVzdHJ1Y3QgbG9naWMgdG8gbWFrZSB1bmRvIHN5c3RlbSB3b3JrIGNvcnJlY3RseVxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGlzIG5vZGUgY2FuIHJlYXR0YWNoIHRvIHNjZW5lIGJ5IHVuZG8gc3lzdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25Qb3N0QWN0aXZhdGVkIChhY3RpdmUpIHtcbiAgICAgICAgdmFyIGFjdGlvbk1hbmFnZXIgPSBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkgOiBudWxsO1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRyYW5zZm9ybVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNO1xuICAgICAgICAgICAgLy8gQWN0aW9uTWFuYWdlciAmIEV2ZW50TWFuYWdlclxuICAgICAgICAgICAgYWN0aW9uTWFuYWdlciAmJiBhY3Rpb25NYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICAvLyBTZWFyY2ggTWFzayBpbiBwYXJlbnRcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXJNYXNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWFjdGl2YXRlXG4gICAgICAgICAgICBhY3Rpb25NYW5hZ2VyICYmIGFjdGlvbk1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uSGllcmFyY2h5Q2hhbmdlZCAob2xkUGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCk7XG4gICAgICAgIC8vIEZpeGVkIGEgYnVnIHdoZXJlIGNoaWxkcmVuIGFuZCBwYXJlbnQgbm9kZSBncm91cHMgd2VyZSBmb3JjZWQgdG8gc3luY2hyb25pemUsIGluc3RlYWQgb2Ygb25seSBzeW5jaHJvbml6aW5nIGBfY3VsbGluZ01hc2tgIHZhbHVlXG4gICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9kZWxheVNvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19XT1JMRF9UUkFOU0ZPUk07XG4gICAgICAgIHRoaXMuX29uSGllcmFyY2h5Q2hhbmdlZEJhc2Uob2xkUGFyZW50KTtcbiAgICAgICAgaWYgKGNjLl93aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBjYy5fd2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRQYXJlbnQgJiYgdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIC8vVE9ETzogSXQgbWF5IGJlIG5lY2Vzc2FyeSB0byB1cGRhdGUgdGhlIGxpc3RlbmVyIG1hc2sgb2YgYWxsIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgdGhpcy5fY2hlY2tMaXN0ZW5lck1hc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vZGUgcHJveHlcbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlUGFyZW50KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gSU5URVJOQUxcblxuICAgIF91cGRhdGUzREZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzM0ROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCA9IHVwZGF0ZUxvY2FsTWF0cml4M0Q7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxXb3JsZE1hdHJpeCA9IGNhbGN1bFdvcmxkTWF0cml4M0Q7XG4gICAgICAgICAgICB0aGlzLl9tdWxNYXQgPSBtdWxNYXQzRDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4ID0gdXBkYXRlTG9jYWxNYXRyaXgyRDtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bFdvcmxkTWF0cml4ID0gY2FsY3VsV29ybGRNYXRyaXgyRDtcbiAgICAgICAgICAgIHRoaXMuX211bE1hdCA9IG11bE1hdDJEO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJDb21wb25lbnQgJiYgdGhpcy5fcmVuZGVyQ29tcG9uZW50Ll9vbjNETm9kZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckNvbXBvbmVudC5fb24zRE5vZGVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICB0aGlzLl9sb2NhbE1hdERpcnR5ID0gTG9jYWxEaXJ0eUZsYWcuQUxMO1xuXG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5LnVwZGF0ZTNETm9kZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0RGF0YUZyb21Qb29sICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zcGFjZUluZm8pIHtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NwYWNlSW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHJzOiBuZXcgRmxvYXQ2NEFycmF5KDEwKSxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxNYXQ6IG5ldyBGbG9hdDY0QXJyYXkoMTYpLFxuICAgICAgICAgICAgICAgICAgICB3b3JsZE1hdDogbmV3IEZsb2F0NjRBcnJheSgxNiksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2VJbmZvID0gbm9kZU1lbVBvb2wucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhY2VJbmZvID0gdGhpcy5fc3BhY2VJbmZvO1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBjYy5tYXQ0KHNwYWNlSW5mby5sb2NhbE1hdCk7XG4gICAgICAgIE1hdDQuaWRlbnRpdHkodGhpcy5fbWF0cml4KTtcbiAgICAgICAgdGhpcy5fd29ybGRNYXRyaXggPSBjYy5tYXQ0KHNwYWNlSW5mby53b3JsZE1hdCk7XG4gICAgICAgIE1hdDQuaWRlbnRpdHkodGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICB0aGlzLl9sb2NhbE1hdERpcnR5ID0gTG9jYWxEaXJ0eUZsYWcuQUxMO1xuICAgICAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcblxuICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzID0gc3BhY2VJbmZvLnRycztcbiAgICAgICAgdHJzWzBdID0gMDsgLy8gcG9zaXRpb24ueFxuICAgICAgICB0cnNbMV0gPSAwOyAvLyBwb3NpdGlvbi55XG4gICAgICAgIHRyc1syXSA9IDA7IC8vIHBvc2l0aW9uLnpcbiAgICAgICAgdHJzWzNdID0gMDsgLy8gcm90YXRpb24ueFxuICAgICAgICB0cnNbNF0gPSAwOyAvLyByb3RhdGlvbi55XG4gICAgICAgIHRyc1s1XSA9IDA7IC8vIHJvdGF0aW9uLnpcbiAgICAgICAgdHJzWzZdID0gMTsgLy8gcm90YXRpb24ud1xuICAgICAgICB0cnNbN10gPSAxOyAvLyBzY2FsZS54XG4gICAgICAgIHRyc1s4XSA9IDE7IC8vIHNjYWxlLnlcbiAgICAgICAgdHJzWzldID0gMTsgLy8gc2NhbGUuelxuICAgIH0sXG5cbiAgICBfYmFja0RhdGFJbnRvUG9vbCAoKSB7XG4gICAgICAgIGlmICghKENDX0VESVRPUiB8fCBDQ19URVNUKSkge1xuICAgICAgICAgICAgLy8gcHVzaCBiYWNrIHRvIHBvb2xcbiAgICAgICAgICAgIG5vZGVNZW1Qb29sLnB1c2godGhpcy5fc3BhY2VJbmZvKTtcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl93b3JsZE1hdHJpeCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl90cnMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fc3BhY2VJbmZvID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdG9FdWxlciAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzM0ROb2RlKSB7XG4gICAgICAgICAgICBUcnMudG9FdWxlcih0aGlzLl9ldWxlckFuZ2xlcywgdGhpcy5fdHJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB6ID0gTWF0aC5hc2luKHRoaXMuX3Ryc1s1XSkgLyBPTkVfREVHUkVFICogMjtcbiAgICAgICAgICAgIFZlYzMuc2V0KHRoaXMuX2V1bGVyQW5nbGVzLCAwLCAwLCB6KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZnJvbUV1bGVyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXMzRE5vZGUpIHtcbiAgICAgICAgICAgIFRycy5mcm9tRXVsZXIodGhpcy5fdHJzLCB0aGlzLl9ldWxlckFuZ2xlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBUcnMuZnJvbUFuZ2xlWih0aGlzLl90cnMsIHRoaXMuX2V1bGVyQW5nbGVzLnopO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0UHJvcGVydGllcyAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pczNETm9kZSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlM0RGdW5jdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgaWYgKHRycykge1xuICAgICAgICAgICAgbGV0IGRlc1RycyA9IHRycztcbiAgICAgICAgICAgIHRycyA9IHRoaXMuX3RycyA9IHRoaXMuX3NwYWNlSW5mby50cnM7XG4gICAgICAgICAgICAvLyBqdXN0IGFkYXB0IHRvIG9sZCB0cnNcbiAgICAgICAgICAgIGlmIChkZXNUcnMubGVuZ3RoID09PSAxMSkge1xuICAgICAgICAgICAgICAgIHRycy5zZXQoZGVzVHJzLnN1YmFycmF5KDEpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJzLnNldChkZXNUcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJzID0gdGhpcy5fdHJzID0gdGhpcy5fc3BhY2VJbmZvLnRycztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9za2V3WCAhPT0gMCB8fCB0aGlzLl9za2V3WSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBOb2RlVXRpbHMgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly91dGlscy9ub2RlJyk7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnNrZXdYL1lgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMi4xLCBwbGVhc2UgdXNlIDNEIG5vZGUgaW5zdGVhZC5cIiwgYE5vZGU6ICR7Tm9kZVV0aWxzLmdldE5vZGVQYXRoKHRoaXMpfS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Zyb21FdWxlcigpO1xuXG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSB8IFJlbmRlckZsb3cuRkxBR19PUEFDSVRZX0NPTE9SO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogVGhlIGluaXRpYWxpemVyIGZvciBOb2RlIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGJlZm9yZSBhbGwgY29tcG9uZW50cyBvbkxvYWRcbiAgICAgKi9cbiAgICBfb25CYXRjaENyZWF0ZWQgKGRvbnRTeW5jQ2hpbGRQcmVmYWIpIHtcbiAgICAgICAgdGhpcy5faW5pdFByb3BlcnRpZXMoKTtcblxuICAgICAgICAvLyBGaXhlZCBhIGJ1ZyB3aGVyZSBjaGlsZHJlbiBhbmQgcGFyZW50IG5vZGUgZ3JvdXBzIHdlcmUgZm9yY2VkIHRvIHN5bmNocm9uaXplLCBpbnN0ZWFkIG9mIG9ubHkgc3luY2hyb25pemluZyBgX2N1bGxpbmdNYXNrYCB2YWx1ZVxuICAgICAgICB0aGlzLl9jdWxsaW5nTWFzayA9IDEgPDwgX2dldEFjdHVhbEdyb3VwSW5kZXgodGhpcyk7XG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ICYmIHRoaXMuX3Byb3h5LnVwZGF0ZUN1bGxpbmdNYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SID8gY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpIDogQWN0aW9uTWFuYWdlckV4aXN0KSB7XG4gICAgICAgICAgICAgICAgLy8gZGVhY3RpdmF0ZSBBY3Rpb25NYW5hZ2VyIGFuZCBFdmVudE1hbmFnZXIgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKCFkb250U3luY0NoaWxkUHJlZmFiKSB7XG4gICAgICAgICAgICAgICAgLy8gc3luYyBjaGlsZCBwcmVmYWJcbiAgICAgICAgICAgICAgICBsZXQgcHJlZmFiSW5mbyA9IGNoaWxkLl9wcmVmYWI7XG4gICAgICAgICAgICAgICAgaWYgKHByZWZhYkluZm8gJiYgcHJlZmFiSW5mby5zeW5jICYmIHByZWZhYkluZm8ucm9vdCA9PT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgUHJlZmFiSGVscGVyLnN5bmNXaXRoUHJlZmFiKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hpbGQuX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZC5fb25CYXRjaENyZWF0ZWQoZG9udFN5bmNDaGlsZFByZWZhYik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfQ0hJTERSRU47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eS5pbml0TmF0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gRVZFTlQgVEFSR0VUXG4gICAgX2NoZWNrTGlzdGVuZXJNYXNrICgpIHtcbiAgICAgICAgLy8gQmVjYXVzZSBNYXNrIG1heSBiZSBuZXN0ZWQsIG5lZWQgdG8gZmluZCBhbGwgdGhlIE1hc2sgY29tcG9uZW50cyBpbiB0aGUgcGFyZW50IG5vZGUuXG4gICAgICAgIC8vIFRoZSBjbGljayBhcmVhIG11c3Qgc2F0aXNmeSBhbGwgTWFza3MgdG8gdHJpZ2dlciB0aGUgY2xpY2suXG4gICAgICAgIGlmICh0aGlzLl90b3VjaExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgbWFzayA9IHRoaXMuX3RvdWNoTGlzdGVuZXIubWFzayA9IF9zZWFyY2hDb21wb25lbnRzSW5QYXJlbnQodGhpcywgY2MuTWFzayk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIubWFzayA9IG1hc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lci5tYXNrID0gX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tuU2V0dXBTeXNFdmVudCAodHlwZSkge1xuICAgICAgICBsZXQgbmV3QWRkZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGZvckRpc3BhdGNoID0gZmFsc2U7XG4gICAgICAgIGlmIChfdG91Y2hFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdG91Y2hMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLlRPVUNIX09ORV9CWV9PTkUsXG4gICAgICAgICAgICAgICAgICAgIHN3YWxsb3dUb3VjaGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKSxcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBfdG91Y2hTdGFydEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlZDogX3RvdWNoTW92ZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hFbmRlZDogX3RvdWNoRW5kSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaENhbmNlbGxlZDogX3RvdWNoQ2FuY2VsSGFuZGxlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih0aGlzLl90b3VjaExpc3RlbmVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBuZXdBZGRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JEaXNwYXRjaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX21vdXNlRXZlbnRzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5NT1VTRSxcbiAgICAgICAgICAgICAgICAgICAgX3ByZXZpb3VzSW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKSxcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd246IF9tb3VzZURvd25IYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTW92ZTogX21vdXNlTW92ZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VVcDogX21vdXNlVXBIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlU2Nyb2xsOiBfbW91c2VXaGVlbEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG5ld0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvckRpc3BhdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3QWRkZWQgJiYgIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcywgMCwgMCwgMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JEaXNwYXRjaDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIE5vZGUuPGJyLz5cbiAgICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcmVnaXN0ZXIgdG91Y2ggb3IgbW91c2UgZXZlbnQgcGVybWl0IHByb3BhZ2F0aW9uIGJhc2VkIG9uIHNjZW5lIGdyYXBoLDxici8+XG4gICAgICogVGhlc2Uga2luZHMgb2YgZXZlbnQgYXJlIHRyaWdnZXJlZCB3aXRoIGRpc3BhdGNoRXZlbnQsIHRoZSBkaXNwYXRjaCBwcm9jZXNzIGhhcyB0aHJlZSBzdGVwczo8YnIvPlxuICAgICAqIDEuIENhcHR1cmluZyBwaGFzZTogZGlzcGF0Y2ggaW4gY2FwdHVyZSB0YXJnZXRzIChgX2dldENhcHR1cmluZ1RhcmdldHNgKSwgZS5nLiBwYXJlbnRzIGluIG5vZGUgdHJlZSwgZnJvbSByb290IHRvIHRoZSByZWFsIHRhcmdldDxici8+XG4gICAgICogMi4gQXQgdGFyZ2V0IHBoYXNlOiBkaXNwYXRjaCB0byB0aGUgbGlzdGVuZXJzIG9mIHRoZSByZWFsIHRhcmdldDxici8+XG4gICAgICogMy4gQnViYmxpbmcgcGhhc2U6IGRpc3BhdGNoIGluIGJ1YmJsZSB0YXJnZXRzIChgX2dldEJ1YmJsaW5nVGFyZ2V0c2ApLCBlLmcuIHBhcmVudHMgaW4gbm9kZSB0cmVlLCBmcm9tIHRoZSByZWFsIHRhcmdldCB0byByb290PGJyLz5cbiAgICAgKiBJbiBhbnkgbW9tZW50IG9mIHRoZSBkaXNwYXRjaGluZyBwcm9jZXNzLCBpdCBjYW4gYmUgc3RvcHBlZCB2aWEgYGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpYCBvciBgZXZlbnQuc3RvcFByb3BhZ2F0aW9uSW1taWRpYXRlKClgLjxici8+XG4gICAgICogSXQncyB0aGUgcmVjb21tZW5kZWQgd2F5IHRvIHJlZ2lzdGVyIHRvdWNoL21vdXNlIGV2ZW50IGZvciBOb2RlLDxici8+XG4gICAgICogcGxlYXNlIGRvIG5vdCB1c2UgY2MuZXZlbnRNYW5hZ2VyIGRpcmVjdGx5IGZvciBOb2RlLjxici8+XG4gICAgICogWW91IGNhbiBhbHNvIHJlZ2lzdGVyIGN1c3RvbSBldmVudCBhbmQgdXNlIGBlbWl0YCB0byB0cmlnZ2VyIGN1c3RvbSBldmVudCBvbiBOb2RlLjxici8+XG4gICAgICogRm9yIHN1Y2ggZXZlbnRzLCB0aGVyZSB3b24ndCBiZSBjYXB0dXJpbmcgYW5kIGJ1YmJsaW5nIHBoYXNlLCB5b3VyIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBkaXJlY3RseSB0byBpdHMgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgb24gdGhlIHNhbWUgbm9kZS48YnIvPlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGV2ZW50IGNhbGxiYWNrIHBhcmFtZXRlcnMgd2l0aCBgZW1pdGAgYnkgcGFzc2luZyBwYXJhbWV0ZXJzIGFmdGVyIGB0eXBlYC5cbiAgICAgKiAhI3poXG4gICAgICog5Zyo6IqC54K55LiK5rOo5YaM5oyH5a6a57G75Z6L55qE5Zue6LCD5Ye95pWw77yM5Lmf5Y+v5Lul6K6+572uIHRhcmdldCDnlKjkuo7nu5Hlrprlk43lupTlh73mlbDnmoQgdGhpcyDlr7nosaHjgII8YnIvPlxuICAgICAqIOm8oOagh+aIluinpuaRuOS6i+S7tuS8muiiq+ezu+e7n+iwg+eUqCBkaXNwYXRjaEV2ZW50IOaWueazleinpuWPke+8jOinpuWPkeeahOi/h+eoi+WMheWQq+S4ieS4qumYtuaute+8mjxici8+XG4gICAgICogMS4g5o2V6I636Zi25q6177ya5rS+5Y+R5LqL5Lu257uZ5o2V6I6355uu5qCH77yI6YCa6L+HIGBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c2Ag6I635Y+W77yJ77yM5q+U5aaC77yM6IqC54K55qCR5Lit5rOo5YaM5LqG5o2V6I636Zi25q6155qE54i26IqC54K577yM5LuO5qC56IqC54K55byA5aeL5rS+5Y+R55u05Yiw55uu5qCH6IqC54K544CCPGJyLz5cbiAgICAgKiAyLiDnm67moIfpmLbmrrXvvJrmtL7lj5Hnu5nnm67moIfoioLngrnnmoTnm5HlkKzlmajjgII8YnIvPlxuICAgICAqIDMuIOWGkuazoemYtuaute+8mua0vuWPkeS6i+S7tue7meWGkuazoeebruagh++8iOmAmui/hyBgX2dldEJ1YmJsaW5nVGFyZ2V0c2Ag6I635Y+W77yJ77yM5q+U5aaC77yM6IqC54K55qCR5Lit5rOo5YaM5LqG5YaS5rOh6Zi25q6155qE54i26IqC54K577yM5LuO55uu5qCH6IqC54K55byA5aeL5rS+5Y+R55u05Yiw5qC56IqC54K544CCPGJyLz5cbiAgICAgKiDlkIzml7bmgqjlj6/ku6XlsIbkuovku7bmtL7lj5HliLDniLboioLngrnmiJbogIXpgJrov4fosIPnlKggc3RvcFByb3BhZ2F0aW9uIOaLpuaIquWug+OAgjxici8+XG4gICAgICog5o6o6I2Q5L2/55So6L+Z56eN5pa55byP5p2l55uR5ZCs6IqC54K55LiK55qE6Kem5pG45oiW6byg5qCH5LqL5Lu277yM6K+35LiN6KaB5Zyo6IqC54K55LiK55u05o6l5L2/55SoIGNjLmV2ZW50TWFuYWdlcuOAgjxici8+XG4gICAgICog5L2g5Lmf5Y+v5Lul5rOo5YaM6Ieq5a6a5LmJ5LqL5Lu25Yiw6IqC54K55LiK77yM5bm26YCa6L+HIGVtaXQg5pa55rOV6Kem5Y+R5q2k57G75LqL5Lu277yM5a+55LqO6L+Z57G75LqL5Lu277yM5LiN5Lya5Y+R55Sf5o2V6I635YaS5rOh6Zi25q6177yM5Y+q5Lya55u05o6l5rS+5Y+R57uZ5rOo5YaM5Zyo6K+l6IqC54K55LiK55qE55uR5ZCs5ZmoPGJyLz5cbiAgICAgKiDkvaDlj6/ku6XpgJrov4flnKggZW1pdCDmlrnms5XosIPnlKjml7blnKggdHlwZSDkuYvlkI7kvKDpgJLpop3lpJbnmoTlj4LmlbDkvZzkuLrkuovku7blm57osIPnmoTlj4LmlbDliJfooahcbiAgICAgKiBAbWV0aG9kIG9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZS5FdmVudFR5cGV9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci48YnI+U2VlIHt7I2Nyb3NzTGluayBcIk5vZGUvRXZlbnRUeXVwZS9QT1NJVElPTl9DSEFOR0VEXCJ9fU5vZGUgRXZlbnRze3svY3Jvc3NMaW5rfX0gZm9yIGFsbCBidWlsdGluIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLiBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fGFueX0gW2NhbGxiYWNrLmV2ZW50XSBldmVudCBvciBmaXJzdCBhcmd1bWVudCB3aGVuIGVtaXRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzNdIGFyZzNcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDYXB0dXJlPWZhbHNlXSAtIFdoZW4gc2V0IHRvIHRydWUsIHRoZSBsaXN0ZW5lciB3aWxsIGJlIHRyaWdnZXJlZCBhdCBjYXB0dXJpbmcgcGhhc2Ugd2hpY2ggaXMgYWhlYWQgb2YgdGhlIGZpbmFsIHRhcmdldCBlbWl0LCBvdGhlcndpc2UgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgZHVyaW5nIGJ1YmJsaW5nIHBoYXNlLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIEp1c3QgcmV0dXJucyB0aGUgaW5jb21pbmcgY2FsbGJhY2sgc28geW91IGNhbiBzYXZlIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24gZWFzaWVyLlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogb248VCBleHRlbmRzIEZ1bmN0aW9uPih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBULCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm1lbWJlckZ1bmN0aW9uLCB0aGlzKTsgIC8vIGlmIFwidGhpc1wiIGlzIGNvbXBvbmVudCBhbmQgdGhlIFwibWVtYmVyRnVuY3Rpb25cIiBkZWNsYXJlZCBpbiBDQ0NsYXNzLlxuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKiBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKiBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqL1xuICAgIG9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIGxldCBmb3JEaXNwYXRjaCA9IHRoaXMuX2NoZWNrblNldHVwU3lzRXZlbnQodHlwZSk7XG4gICAgICAgIGlmIChmb3JEaXNwYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uRGlzcGF0Y2godHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBQT1NJVElPTl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBTQ0FMRV9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBST1RBVElPTl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IFNJWkVfT047XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IEFOQ0hPUl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5DT0xPUl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBDT0xPUl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycyA9IG5ldyBFdmVudFRhcmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIE5vZGUsXG4gICAgICogdGhlIGNhbGxiYWNrIHdpbGwgcmVtb3ZlIGl0c2VsZiBhZnRlciB0aGUgZmlyc3QgdGltZSBpdCBpcyB0cmlnZ2VyZWQuXG4gICAgICogISN6aFxuICAgICAqIOazqOWGjOiKgueCueeahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg++8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBvbmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gICAgICogQHBhcmFtIHtFdmVudHxhbnl9IFtjYWxsYmFjay5ldmVudF0gZXZlbnQgb3IgZmlyc3QgYXJndW1lbnQgd2hlbiBlbWl0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcyXSBhcmcyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc1XSBhcmc1XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvbmNlPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IFRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqL1xuICAgIG9uY2UgKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgbGV0IGZvckRpc3BhdGNoID0gdGhpcy5fY2hlY2tuU2V0dXBTeXNFdmVudCh0eXBlKTtcblxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgaWYgKGZvckRpc3BhdGNoICYmIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgfHwgbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0ZW5lcnMub25jZSh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcbiAgICAgICAgbGlzdGVuZXJzLm9uY2UodHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgfSxcblxuICAgIF9vbkRpc3BhdGNoICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIC8vIEFjY2VwdCBhbHNvIHBhdGFtZXRlcnMgbGlrZTogKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKVxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB1c2VDYXB0dXJlID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgdXNlQ2FwdHVyZSA9ICEhdXNlQ2FwdHVyZTtcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCg2ODAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICBpZiAodXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzIHx8IG5ldyBFdmVudFRhcmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpICkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5fX2V2ZW50VGFyZ2V0cy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlcyB0aGUgY2FsbGJhY2sgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCBhbmQgb3IgdXNlQ2FwdHVyZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBtZXJlbHkgYW4gYWxpYXMgdG8gcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICAgKiAhI3poIOWIoOmZpOS5i+WJjeS4juWQjOexu+Wei++8jOWbnuiwg++8jOebruagh+aIliB1c2VDYXB0dXJlIOazqOWGjOeahOWbnuiwg+OAglxuICAgICAqIEBtZXRob2Qgb2ZmXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgYmVpbmcgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgaWYgaXQncyBub3QgZ2l2ZW4sIG9ubHkgY2FsbGJhY2sgd2l0aG91dCB0YXJnZXQgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZT1mYWxzZV0gLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgbGlzdGVuZXIgd2lsbCBiZSB0cmlnZ2VyZWQgYXQgY2FwdHVyaW5nIHBoYXNlIHdoaWNoIGlzIGFoZWFkIG9mIHRoZSBmaW5hbCB0YXJnZXQgZW1pdCwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIGR1cmluZyBidWJibGluZyBwaGFzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMubWVtYmVyRnVuY3Rpb24sIHRoaXMpO1xuICAgICAqIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBjYWxsYmFjaywgdGhpcy5ub2RlKTtcbiAgICAgKiBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqL1xuICAgIG9mZiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICBsZXQgdG91Y2hFdmVudCA9IF90b3VjaEV2ZW50cy5pbmRleE9mKHR5cGUpICE9PSAtMTtcbiAgICAgICAgbGV0IG1vdXNlRXZlbnQgPSAhdG91Y2hFdmVudCAmJiBfbW91c2VFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTE7XG4gICAgICAgIGlmICh0b3VjaEV2ZW50IHx8IG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZkRpc3BhdGNoKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b3VjaExpc3RlbmVyICYmICFfY2hlY2tMaXN0ZW5lcnModGhpcywgX3RvdWNoRXZlbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdG91Y2hMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF9tb3VzZUV2ZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLm9mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcblxuICAgICAgICAgICAgdmFyIGhhc0xpc3RlbmVycyA9IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG4gICAgICAgICAgICAvLyBBbGwgbGlzdGVuZXIgcmVtb3ZlZFxuICAgICAgICAgICAgaWYgKCFoYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5QT1NJVElPTl9PTjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+U0NBTEVfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflJPVEFUSU9OX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuU0laRV9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflNJWkVfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5BTkNIT1JfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5DT0xPUl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkNPTE9SX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29mZkRpc3BhdGNoICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIC8vIEFjY2VwdCBhbHNvIHBhdGFtZXRlcnMgbGlrZTogKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKVxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB1c2VDYXB0dXJlID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgdXNlQ2FwdHVyZSA9ICEhdXNlQ2FwdHVyZTtcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy5yZW1vdmVBbGwodHlwZSk7XG4gICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycyAmJiB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5yZW1vdmVBbGwodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdXNlQ2FwdHVyZSA/IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA6IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgICAgICAgICBqcy5hcnJheS5mYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZW1vdmVzIGFsbCBjYWxsYmFja3MgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdGFyZ2V0LlxuICAgICAqICEjemgg56e76Zmk55uu5qCH5LiK55qE5omA5pyJ5rOo5YaM5LqL5Lu244CCXG4gICAgICogQG1ldGhvZCB0YXJnZXRPZmZcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBiZSBzZWFyY2hlZCBmb3IgYWxsIHJlbGF0ZWQgY2FsbGJhY2tzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnRhcmdldE9mZih0YXJnZXQpO1xuICAgICAqL1xuICAgIHRhcmdldE9mZiAodGFyZ2V0KSB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycztcbiAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnRhcmdldE9mZih0YXJnZXQpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgZXZlbnQgbWFzayByZXNldFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+UE9TSVRJT05fT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5TQ0FMRV9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflJPVEFUSU9OX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBTSVpFX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflNJWkVfT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkFOQ0hPUl9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgQ09MT1JfT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkNPTE9SX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy50YXJnZXRPZmYodGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XG4gICAgICAgICAgICBqcy5hcnJheS5mYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF90b3VjaEV2ZW50cykpIHtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl90b3VjaExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tb3VzZUxpc3RlbmVyICYmICFfY2hlY2tMaXN0ZW5lcnModGhpcywgX21vdXNlRXZlbnRzKSkge1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgRXZlbnRUYXJnZXQgb2JqZWN0IGhhcyBhbnkgY2FsbGJhY2sgcmVnaXN0ZXJlZCBmb3IgYSBzcGVjaWZpYyB0eXBlIG9mIGV2ZW50LlxuICAgICAqICEjemgg5qOA5p+l5LqL5Lu255uu5qCH5a+56LGh5piv5ZCm5pyJ5Li654m55a6a57G75Z6L55qE5LqL5Lu25rOo5YaM55qE5Zue6LCD44CCXG4gICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGEgY2FsbGJhY2sgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGlzIHJlZ2lzdGVyZWQ7IGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBoYXNFdmVudExpc3RlbmVyICh0eXBlKSB7XG4gICAgICAgIGxldCBoYXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBoYXMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgaGFzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRyaWdnZXIgYW4gZXZlbnQgZGlyZWN0bHkgd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgbmVjZXNzYXJ5IGFyZ3VtZW50cy5cbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+H5LqL5Lu25ZCN5Y+R6YCB6Ieq5a6a5LmJ5LqL5Lu2XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGVtaXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0geyp9IFthcmcxXSAtIEZpcnN0IGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnMl0gLSBTZWNvbmQgYXJndW1lbnQgaW4gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0geyp9IFthcmczXSAtIFRoaXJkIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnNF0gLSBGb3VydGggYXJndW1lbnQgaW4gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0geyp9IFthcmc1XSAtIEZpZnRoIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqIGV2ZW50VGFyZ2V0LmVtaXQoJ2ZpcmUnLCBldmVudCk7XG4gICAgICogZXZlbnRUYXJnZXQuZW1pdCgnZmlyZScsIG1lc3NhZ2UsIGVtaXR0ZXIpO1xuICAgICAqL1xuICAgIGVtaXQgKHR5cGUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgICAgICAgaWYgKHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5lbWl0KHR5cGUsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEaXNwYXRjaGVzIGFuIGV2ZW50IGludG8gdGhlIGV2ZW50IGZsb3cuXG4gICAgICogVGhlIGV2ZW50IHRhcmdldCBpcyB0aGUgRXZlbnRUYXJnZXQgb2JqZWN0IHVwb24gd2hpY2ggdGhlIGRpc3BhdGNoRXZlbnQoKSBtZXRob2QgaXMgY2FsbGVkLlxuICAgICAqICEjemgg5YiG5Y+R5LqL5Lu25Yiw5LqL5Lu25rWB5Lit44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBFdmVudCBvYmplY3QgdGhhdCBpcyBkaXNwYXRjaGVkIGludG8gdGhlIGV2ZW50IGZsb3dcbiAgICAgKi9cbiAgICBkaXNwYXRjaEV2ZW50IChldmVudCkge1xuICAgICAgICBfZG9EaXNwYXRjaEV2ZW50KHRoaXMsIGV2ZW50KTtcbiAgICAgICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2Ugbm9kZSByZWxhdGVkIHN5c3RlbSBldmVudHMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjdXJyZW50IE5vZGUuIE5vZGUgc3lzdGVtIGV2ZW50cyBpbmNsdWRlcyB0b3VjaCBhbmQgbW91c2UgZXZlbnRzLlxuICAgICAqIElmIHJlY3Vyc2l2ZSBpcyBzZXQgdG8gdHJ1ZSwgdGhlbiB0aGlzIEFQSSB3aWxsIHBhdXNlIHRoZSBub2RlIHN5c3RlbSBldmVudHMgZm9yIHRoZSBub2RlIGFuZCBhbGwgbm9kZXMgaW4gaXRzIHN1YiBub2RlIHRyZWUuXG4gICAgICogUmVmZXJlbmNlOiBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2VkaXRvcnNfYW5kX3Rvb2xzL2NyZWF0b3ItY2hhcHRlcnMvc2NyaXB0aW5nL2ludGVybmFsLWV2ZW50cy9cbiAgICAgKiAhI3poIOaaguWBnOW9k+WJjeiKgueCueS4iuazqOWGjOeahOaJgOacieiKgueCueezu+e7n+S6i+S7tu+8jOiKgueCueezu+e7n+S6i+S7tuWMheWQq+inpuaRuOWSjOm8oOagh+S6i+S7tuOAglxuICAgICAqIOWmguaenOS8oOmAkiByZWN1cnNpdmUg5Li6IHRydWXvvIzpgqPkuYjov5nkuKogQVBJIOWwhuaaguWBnOacrOiKgueCueWSjOWug+eahOWtkOagkeS4iuaJgOacieiKgueCueeahOiKgueCueezu+e7n+S6i+S7tuOAglxuICAgICAqIOWPguiAg++8mmh0dHBzOi8vd3d3LmNvY29zLmNvbS9kb2NzL2NyZWF0b3Ivc2NyaXB0aW5nL2ludGVybmFsLWV2ZW50cy5odG1sXG4gICAgICogQG1ldGhvZCBwYXVzZVN5c3RlbUV2ZW50c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVjdXJzaXZlIC0gV2hldGhlciB0byBwYXVzZSBub2RlIHN5c3RlbSBldmVudHMgb24gdGhlIHN1YiBub2RlIHRyZWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnBhdXNlU3lzdGVtRXZlbnRzKHRydWUpO1xuICAgICAqL1xuICAgIHBhdXNlU3lzdGVtRXZlbnRzIChyZWN1cnNpdmUpIHtcbiAgICAgICAgZXZlbnRNYW5hZ2VyLnBhdXNlVGFyZ2V0KHRoaXMsIHJlY3Vyc2l2ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIG5vZGUgcmVsYXRlZCBzeXN0ZW0gZXZlbnRzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY3VycmVudCBOb2RlLiBOb2RlIHN5c3RlbSBldmVudHMgaW5jbHVkZXMgdG91Y2ggYW5kIG1vdXNlIGV2ZW50cy5cbiAgICAgKiBJZiByZWN1cnNpdmUgaXMgc2V0IHRvIHRydWUsIHRoZW4gdGhpcyBBUEkgd2lsbCByZXN1bWUgdGhlIG5vZGUgc3lzdGVtIGV2ZW50cyBmb3IgdGhlIG5vZGUgYW5kIGFsbCBub2RlcyBpbiBpdHMgc3ViIG5vZGUgdHJlZS5cbiAgICAgKiBSZWZlcmVuY2U6IGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvZWRpdG9yc19hbmRfdG9vbHMvY3JlYXRvci1jaGFwdGVycy9zY3JpcHRpbmcvaW50ZXJuYWwtZXZlbnRzL1xuICAgICAqICEjemgg5oGi5aSN5b2T5YmN6IqC54K55LiK5rOo5YaM55qE5omA5pyJ6IqC54K557O757uf5LqL5Lu277yM6IqC54K557O757uf5LqL5Lu25YyF5ZCr6Kem5pG45ZKM6byg5qCH5LqL5Lu244CCXG4gICAgICog5aaC5p6c5Lyg6YCSIHJlY3Vyc2l2ZSDkuLogdHJ1Ze+8jOmCo+S5iOi/meS4qiBBUEkg5bCG5oGi5aSN5pys6IqC54K55ZKM5a6D55qE5a2Q5qCR5LiK5omA5pyJ6IqC54K555qE6IqC54K557O757uf5LqL5Lu244CCXG4gICAgICog5Y+C6ICD77yaaHR0cHM6Ly93d3cuY29jb3MuY29tL2RvY3MvY3JlYXRvci9zY3JpcHRpbmcvaW50ZXJuYWwtZXZlbnRzLmh0bWxcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVN5c3RlbUV2ZW50c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVjdXJzaXZlIC0gV2hldGhlciB0byByZXN1bWUgbm9kZSBzeXN0ZW0gZXZlbnRzIG9uIHRoZSBzdWIgbm9kZSB0cmVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5yZXN1bWVTeXN0ZW1FdmVudHModHJ1ZSk7XG4gICAgICovXG4gICAgcmVzdW1lU3lzdGVtRXZlbnRzIChyZWN1cnNpdmUpIHtcbiAgICAgICAgZXZlbnRNYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzLCByZWN1cnNpdmUpO1xuICAgIH0sXG5cbiAgICBfaGl0VGVzdCAocG9pbnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIGxldCB3ID0gdGhpcy5fY29udGVudFNpemUud2lkdGgsXG4gICAgICAgICAgICBoID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0LFxuICAgICAgICAgICAgY2FtZXJhUHQgPSBfaHRWZWMzYSxcbiAgICAgICAgICAgIHRlc3RQdCA9IF9odFZlYzNiO1xuXG4gICAgICAgIGxldCBjYW1lcmEgPSBjYy5DYW1lcmEuZmluZENhbWVyYSh0aGlzKTtcbiAgICAgICAgaWYgKGNhbWVyYSkge1xuICAgICAgICAgICAgY2FtZXJhLmdldFNjcmVlblRvV29ybGRQb2ludChwb2ludCwgY2FtZXJhUHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FtZXJhUHQuc2V0KHBvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIC8vIElmIHNjYWxlIGlzIDAsIGl0IGNhbid0IGJlIGhpdC5cbiAgICAgICAgaWYgKCFNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl93b3JsZE1hdHJpeCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQodGVzdFB0LCBjYW1lcmFQdCwgX21hdDRfdGVtcCk7XG4gICAgICAgIHRlc3RQdC54ICs9IHRoaXMuX2FuY2hvclBvaW50LnggKiB3O1xuICAgICAgICB0ZXN0UHQueSArPSB0aGlzLl9hbmNob3JQb2ludC55ICogaDtcblxuICAgICAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0ZXN0UHQueCA+PSAwICYmIHRlc3RQdC55ID49IDAgJiYgdGVzdFB0LnggPD0gdyAmJiB0ZXN0UHQueSA8PSBoKSB7XG4gICAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGxpc3RlbmVyLm1hc2spIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFzayA9IGxpc3RlbmVyLm1hc2s7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IG1hc2sgPyBtYXNrLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBtYXNrIHBhcmVudCwgc2hvdWxkIGhpdCB0ZXN0IGl0XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBwYXJlbnQgJiYgaiA8IGxlbmd0aDsgKytpLCBwYXJlbnQgPSBwYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbWFza1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHRlbXAuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IHRlbXAubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wID0gcGFyZW50LmdldENvbXBvbmVudChjYy5NYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcCAmJiBjb21wLl9lbmFibGVkICYmICFjb21wLl9oaXRUZXN0KGNhbWVyYVB0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hc2sgcGFyZW50IG5vIGxvbmdlciBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNrLmxlbmd0aCA9IGo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gdGVtcC5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFzayBwYXJlbnQgbm8gbG9uZ2VyIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFzay5sZW5ndGggPSBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBoaXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdGhlIHRhcmdldHMgbGlzdGVuaW5nIHRvIHRoZSBzdXBwbGllZCB0eXBlIG9mIGV2ZW50IGluIHRoZSB0YXJnZXQncyBjYXB0dXJpbmcgcGhhc2UuXG4gICAgICogVGhlIGNhcHR1cmluZyBwaGFzZSBjb21wcmlzZXMgdGhlIGpvdXJuZXkgZnJvbSB0aGUgcm9vdCB0byB0aGUgbGFzdCBub2RlIEJFRk9SRSB0aGUgZXZlbnQgdGFyZ2V0J3Mgbm9kZS5cbiAgICAgKiBUaGUgcmVzdWx0IHNob3VsZCBzYXZlIGluIHRoZSBhcnJheSBwYXJhbWV0ZXIsIGFuZCBNVVNUIFNPUlQgZnJvbSBjaGlsZCBub2RlcyB0byBwYXJlbnQgbm9kZXMuXG4gICAgICpcbiAgICAgKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBtYWtlIGV2ZW50IHByb3BhZ2FibGUuXG4gICAgICogQG1ldGhvZCBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gdGhlIGFycmF5IHRvIHJlY2VpdmUgdGFyZ2V0c1xuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvZXZlbnQvX2dldENhcHR1cmluZ1RhcmdldHMuanN9XG4gICAgICovXG4gICAgX2dldENhcHR1cmluZ1RhcmdldHMgKHR5cGUsIGFycmF5KSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHBhcmVudC5fY2FwdHVyaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdGhlIHRhcmdldHMgbGlzdGVuaW5nIHRvIHRoZSBzdXBwbGllZCB0eXBlIG9mIGV2ZW50IGluIHRoZSB0YXJnZXQncyBidWJibGluZyBwaGFzZS5cbiAgICAgKiBUaGUgYnViYmxpbmcgcGhhc2UgY29tcHJpc2VzIGFueSBTVUJTRVFVRU5UIG5vZGVzIGVuY291bnRlcmVkIG9uIHRoZSByZXR1cm4gdHJpcCB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAgICAgKiBUaGUgcmVzdWx0IHNob3VsZCBzYXZlIGluIHRoZSBhcnJheSBwYXJhbWV0ZXIsIGFuZCBNVVNUIFNPUlQgZnJvbSBjaGlsZCBub2RlcyB0byBwYXJlbnQgbm9kZXMuXG4gICAgICpcbiAgICAgKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBtYWtlIGV2ZW50IHByb3BhZ2FibGUuXG4gICAgICogQG1ldGhvZCBfZ2V0QnViYmxpbmdUYXJnZXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSB0aGUgYXJyYXkgdG8gcmVjZWl2ZSB0YXJnZXRzXG4gICAgICovXG4gICAgX2dldEJ1YmJsaW5nVGFyZ2V0cyAodHlwZSwgYXJyYXkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9idWJibGluZ0xpc3RlbmVycyAmJiBwYXJlbnQuX2J1YmJsaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gQUNUSU9OU1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFeGVjdXRlcyBhbiBhY3Rpb24sIGFuZCByZXR1cm5zIHRoZSBhY3Rpb24gdGhhdCBpcyBleGVjdXRlZC48YnIvPlxuICAgICAqIFRoZSBub2RlIGJlY29tZXMgdGhlIGFjdGlvbidzIHRhcmdldC4gUmVmZXIgdG8gY2MuQWN0aW9uJ3MgZ2V0VGFyZ2V0KCkgPGJyLz5cbiAgICAgKiBDYWxsaW5nIHJ1bkFjdGlvbiB3aGlsZSB0aGUgbm9kZSBpcyBub3QgYWN0aXZlIHdvbid0IGhhdmUgYW55IGVmZmVjdC4gPGJyLz5cbiAgICAgKiBOb3Rl77yaWW91IHNob3VsZG4ndCBtb2RpZnkgdGhlIGFjdGlvbiBhZnRlciBydW5BY3Rpb24sIHRoYXQgd29uJ3QgdGFrZSBhbnkgZWZmZWN0Ljxici8+XG4gICAgICogaWYgeW91IHdhbnQgdG8gbW9kaWZ5LCB3aGVuIHlvdSBkZWZpbmUgYWN0aW9uIHBsdXMuXG4gICAgICogISN6aFxuICAgICAqIOaJp+ihjOW5tui/lOWbnuivpeaJp+ihjOeahOWKqOS9nOOAguivpeiKgueCueWwhuS8muWPmOaIkOWKqOS9nOeahOebruagh+OAgjxici8+XG4gICAgICog6LCD55SoIHJ1bkFjdGlvbiDml7bvvIzoioLngrnoh6rouqvlpITkuo7kuI3mv4DmtLvnirbmgIHlsIbkuI3kvJrmnInku7vkvZXmlYjmnpzjgII8YnIvPlxuICAgICAqIOazqOaEj++8muS9oOS4jeW6lOivpeS/ruaUuSBydW5BY3Rpb24g5ZCO55qE5Yqo5L2c77yM5bCG5peg5rOV5Y+R5oyl5L2c55So77yM5aaC5p6c5oOz6L+b6KGM5L+u5pS577yM6K+35Zyo5a6a5LmJIGFjdGlvbiDml7bliqDlhaXjgIJcbiAgICAgKiBAbWV0aG9kIHJ1bkFjdGlvblxuICAgICAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBY3Rpb259IEFuIEFjdGlvbiBwb2ludGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICogbm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgKiBub2RlLnJ1bkFjdGlvbihhY3Rpb24pLnJlcGVhdEZvcmV2ZXIoKTsgLy8gZmFpbFxuICAgICAqIG5vZGUucnVuQWN0aW9uKGFjdGlvbi5yZXBlYXRGb3JldmVyKCkpOyAvLyByaWdodFxuICAgICAqL1xuICAgIHJ1bkFjdGlvbjogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYy5hc3NlcnRJRChhY3Rpb24sIDE2MTgpO1xuICAgICAgICBsZXQgYW0gPSBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCk7XG4gICAgICAgIGlmICghYW0uX3N1cHByZXNzRGVwcmVjYXRpb24pIHtcbiAgICAgICAgICAgIGFtLl9zdXBwcmVzc0RlcHJlY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNjM5KTtcbiAgICAgICAgfVxuICAgICAgICBhbS5hZGRBY3Rpb24oYWN0aW9uLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgYWxsIGFjdGlvbnMgcnVubmluZyBvbiB0aGUgY3VycmVudCBub2RlLiBFcXVhbHMgdG8gYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldChub2RlKWAuXG4gICAgICogISN6aCDmmoLlgZzmnKzoioLngrnkuIrmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzjgILlkowgYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldChub2RlKTtgIOetieS7t+OAglxuICAgICAqIEBtZXRob2QgcGF1c2VBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnBhdXNlQWxsQWN0aW9ucygpO1xuICAgICAqL1xuICAgIHBhdXNlQWxsQWN0aW9uczogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIGFsbCBwYXVzZWQgYWN0aW9ucyBvbiB0aGUgY3VycmVudCBub2RlLiBFcXVhbHMgdG8gYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZXN1bWVUYXJnZXQobm9kZSlgLlxuICAgICAqICEjemgg5oGi5aSN6L+Q6KGM5pys6IqC54K55LiK5omA5pyJ5pqC5YGc55qE5Yqo5L2c44CC5ZKMIGBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVzdW1lVGFyZ2V0KG5vZGUpO2Ag562J5Lu344CCXG4gICAgICogQG1ldGhvZCByZXN1bWVBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnJlc3VtZUFsbEFjdGlvbnMoKTtcbiAgICAgKi9cbiAgICByZXN1bWVBbGxBY3Rpb25zOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgYW5kIHJlbW92ZXMgYWxsIGFjdGlvbnMgZnJvbSB0aGUgcnVubmluZyBhY3Rpb24gbGlzdCAuXG4gICAgICogISN6aCDlgZzmraLlubbkuJTnp7vpmaTmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzliJfooajjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICovXG4gICAgc3RvcEFsbEFjdGlvbnM6IEFjdGlvbk1hbmFnZXJFeGlzdCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0KHRoaXMpO1xuICAgIH0gOiBlbXB0eUZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3BzIGFuZCByZW1vdmVzIGFuIGFjdGlvbiBmcm9tIHRoZSBydW5uaW5nIGFjdGlvbiBsaXN0LlxuICAgICAqICEjemgg5YGc5q2i5bm256e76Zmk5oyH5a6a55qE5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCBzdG9wQWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb259IGFjdGlvbiBBbiBhY3Rpb24gb2JqZWN0IHRvIGJlIHJlbW92ZWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICogbm9kZS5zdG9wQWN0aW9uKGFjdGlvbik7XG4gICAgICovXG4gICAgc3RvcEFjdGlvbjogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWN0aW9uKGFjdGlvbik7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyBhbiBhY3Rpb24gZnJvbSB0aGUgcnVubmluZyBhY3Rpb24gbGlzdCBieSBpdHMgdGFnLlxuICAgICAqICEjemgg5YGc5q2i5bm25LiU56e76Zmk5oyH5a6a5qCH562+55qE5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCBzdG9wQWN0aW9uQnlUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnIEEgdGFnIHRoYXQgaW5kaWNhdGVzIHRoZSBhY3Rpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc3RvcEFjdGlvbkJ5VGFnKDEpO1xuICAgICAqL1xuICAgIHN0b3BBY3Rpb25CeVRhZzogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKHRhZykge1xuICAgICAgICBpZiAodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE2MTIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIHRoaXMpO1xuICAgIH0gOiBlbXB0eUZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYW4gYWN0aW9uIGZyb20gdGhlIHJ1bm5pbmcgYWN0aW9uIGxpc3QgYnkgaXRzIHRhZy5cbiAgICAgKiAhI3poIOmAmui/h+agh+etvuiOt+WPluaMh+WumuWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgZ2V0QWN0aW9uQnlUYWdcbiAgICAgKiBAc2VlIGNjLkFjdGlvbiNnZXRUYWcgYW5kIGNjLkFjdGlvbiNzZXRUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXG4gICAgICogQHJldHVybiB7QWN0aW9ufSBUaGUgYWN0aW9uIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB0YWcuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gbm9kZS5nZXRBY3Rpb25CeVRhZygxKTtcbiAgICAgKi9cbiAgICBnZXRBY3Rpb25CeVRhZzogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKHRhZykge1xuICAgICAgICBpZiAodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE2MTMpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5nZXRBY3Rpb25CeVRhZyh0YWcsIHRoaXMpO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVycyBvZiBhY3Rpb25zIHRoYXQgYXJlIHJ1bm5pbmcgcGx1cyB0aGUgb25lcyB0aGF0IGFyZSBzY2hlZHVsZSB0byBydW4gKGFjdGlvbnMgaW4gYWN0aW9uc1RvQWRkIGFuZCBhY3Rpb25zIGFycmF5cykuPGJyLz5cbiAgICAgKiAgICBDb21wb3NhYmxlIGFjdGlvbnMgYXJlIGNvdW50ZWQgYXMgMSBhY3Rpb24uIEV4YW1wbGU6PGJyLz5cbiAgICAgKiAgICBJZiB5b3UgYXJlIHJ1bm5pbmcgMSBTZXF1ZW5jZSBvZiA3IGFjdGlvbnMsIGl0IHdpbGwgcmV0dXJuIDEuIDxici8+XG4gICAgICogICAgSWYgeW91IGFyZSBydW5uaW5nIDcgU2VxdWVuY2VzIG9mIDIgYWN0aW9ucywgaXQgd2lsbCByZXR1cm4gNy48L3A+XG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlui/kOihjOedgOeahOWKqOS9nOWKoOS4iuato+WcqOiwg+W6pui/kOihjOeahOWKqOS9nOeahOaAu+aVsOOAgjxici8+XG4gICAgICog5L6L5aaC77yaPGJyLz5cbiAgICAgKiAtIOWmguaenOS9oOato+WcqOi/kOihjCA3IOS4quWKqOS9nOS4reeahCAxIOS4qiBTZXF1ZW5jZe+8jOWug+Wwhui/lOWbniAx44CCPGJyLz5cbiAgICAgKiAtIOWmguaenOS9oOato+WcqOi/kOihjCAyIOS4quWKqOS9nOS4reeahCA3IOS4qiBTZXF1ZW5jZe+8jOWug+Wwhui/lOWbniA344CCPGJyLz5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9uc1xuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBhY3Rpb25zIHRoYXQgYXJlIHJ1bm5pbmcgcGx1cyB0aGUgb25lcyB0aGF0IGFyZSBzY2hlZHVsZSB0byBydW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb3VudCA9IG5vZGUuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9ucygpO1xuICAgICAqIGNjLmxvZyhcIlJ1bm5pbmcgQWN0aW9uIENvdW50OiBcIiArIGNvdW50KTtcbiAgICAgKi9cbiAgICBnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9uc0luVGFyZ2V0KHRoaXMpO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cblxuLy8gVFJBTlNGT1JNIFJFTEFURURcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIHBvc2l0aW9uICh4LCB5LCB6KSBvZiB0aGUgbm9kZSBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZXMuXG4gICAgICogWW91IGNhbiBwYXNzIGEgY2MuVmVjMiBvciBjYy5WZWMzIGFzIHRoZSBhcmd1bWVudCB0byByZWNlaXZlIHRoZSByZXR1cm4gdmFsdWVzLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5boioLngrnlnKjniLboioLngrnlnZDmoIfns7vkuK3nmoTkvY3nva7vvIh4LCB5LCB677yJ44CCXG4gICAgICog5L2g5Y+v5Lul5Lyg5LiA5LiqIGNjLlZlYzIg5oiW6ICFIGNjLlZlYzMg5L2c5Li65Y+C5pWw5p2l5o6l5pS26L+U5Zue5YC844CCXG4gICAgICogQG1ldGhvZCBnZXRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMnxWZWMzfSBbb3V0XSAtIFRoZSByZXR1cm4gdmFsdWUgdG8gcmVjZWl2ZSBwb3NpdGlvblxuICAgICAqIEByZXR1cm4ge1ZlYzJ8VmVjM30gVGhlIHBvc2l0aW9uICh4LCB5LCB6KSBvZiB0aGUgbm9kZSBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZXNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmxvZyhcIk5vZGUgUG9zaXRpb246IFwiICsgbm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbiAob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMygpO1xuICAgICAgICByZXR1cm4gVHJzLnRvUG9zaXRpb24ob3V0LCB0aGlzLl90cnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gKHgsIHksIHopIG9mIHRoZSBub2RlIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlcy48YnIvPlxuICAgICAqIFVzdWFsbHkgd2UgdXNlIGNjLnYyKHgsIHkpIHRvIGNvbXBvc2UgY2MuVmVjMiBvYmplY3QsIGluIHRoaXMgY2FzZSwgcG9zaXRpb24ueiB3aWxsIGJlY29tZSAwLjxici8+XG4gICAgICogYW5kIHBhc3NpbmcgdHdvIG51bWJlcnMgKHgsIHkpIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gcGFzc2luZyBjYy5WZWMyIG9iamVjdCwgaW4gdGhpcyBjYXNlLCBwb3NpdGlvbi56IHdpbGwgcmVtYWluIHVuY2hhbmdlZC5cbiAgICAgKiBGb3IgM0Qgbm9kZSB3ZSBjYW4gdXNlIGNjLnYzKHgsIHksIHopIHRvIGNvbXBvc2UgY2MuVmVjMyBvYmplY3QsPGJyLz5cbiAgICAgKiBhbmQgcGFzc2luZyB0aHJlZSBudW1iZXJzICh4LCB5LCB6KSBpcyBtb3JlIGVmZmljaWVudCB0aGFuIHBhc3NpbmcgY2MuVmVjMyBvYmplY3QuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9ruiKgueCueWcqOeItuiKgueCueWdkOagh+ezu+S4reeahOS9jee9ruOAgjxici8+XG4gICAgICog5Y+v5Lul6YCa6L+H5LiL6Z2i55qE5pa55byP6K6+572u5Z2Q5qCH54K577yaPGJyLz5cbiAgICAgKiAxLiDkvKDlhaUgMiDkuKrmlbDlgLwgeCwgeSAo5q2k5pe25LiN5Lya5pS55Y+YIHBvc2l0aW9uLnog55qE5YC8KeOAgjxici8+XG4gICAgICogMi4g5Lyg5YWlIGNjLnYyKHgsIHkpIOexu+Wei+S4uiBjYy5WZWMyIOeahOWvueixoSAo5q2k5pe2IHBvc2l0aW9uLnog55qE5YC85bCG6KKr6K6+572u5Li6MCnjgIJcbiAgICAgKiAzLiDlr7nkuo4gM0Qg6IqC54K55Y+v5Lul5Lyg5YWlIDMg5Liq5pWw5YC8IHgsIHksIHrjgII8YnIvPlxuICAgICAqIDQuIOWvueS6jiAzRCDoioLngrnlj6/ku6XkvKDlhaUgY2MudjMoeCwgeSwgeikg57G75Z6L5Li6IGNjLlZlYzMg55qE5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBzZXRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMnxWZWMzfE51bWJlcn0geCAtIFggY29vcmRpbmF0ZSBmb3IgcG9zaXRpb24gb3IgdGhlIHBvc2l0aW9uIG9iamVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gLSBZIGNvb3JkaW5hdGUgZm9yIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt6XSAtIFogY29vcmRpbmF0ZSBmb3IgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbiAobmV3UG9zT3JYLCB5LCB6KSB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB4ID0gbmV3UG9zT3JYLng7XG4gICAgICAgICAgICB5ID0gbmV3UG9zT3JYLnk7XG4gICAgICAgICAgICB6ID0gbmV3UG9zT3JYLno7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB4ID0gbmV3UG9zT3JYO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcblxuICAgICAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB6ID0gdHJzWzJdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyc1swXSA9PT0geCAmJiB0cnNbMV0gPT09IHkgJiYgdHJzWzJdID09PSB6KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgb2xkUG9zaXRpb24gPSBuZXcgY2MuVmVjMyh0cnNbMF0sIHRyc1sxXSwgdHJzWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyc1swXSA9IHg7XG4gICAgICAgIHRyc1sxXSA9IHk7XG4gICAgICAgIHRyc1syXSA9IHo7XG5cbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG4gICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNKTtcblxuICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgb2xkUG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgc2NhbGUgZmFjdG9yIG9mIHRoZSBub2RlLlxuICAgICAqIE5lZWQgcGFzcyBhIGNjLlZlYzIgb3IgY2MuVmVjMyBhcyB0aGUgYXJndW1lbnQgdG8gcmVjZWl2ZSB0aGUgcmV0dXJuIHZhbHVlcy5cbiAgICAgKiAhI3poIOiOt+WPluiKgueCueeahOe8qeaUvu+8jOmcgOimgeS8oOS4gOS4qiBjYy5WZWMyIOaIluiAhSBjYy5WZWMzIOS9nOS4uuWPguaVsOadpeaOpeaUtui/lOWbnuWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0U2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8VmVjM30gb3V0XG4gICAgICogQHJldHVybiB7VmVjMnxWZWMzfSBUaGUgc2NhbGUgZmFjdG9yXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5sb2coXCJOb2RlIFNjYWxlOiBcIiArIG5vZGUuZ2V0U2NhbGUoY2MudjMoKSkpO1xuICAgICAqL1xuICAgIGdldFNjYWxlIChvdXQpIHtcbiAgICAgICAgaWYgKG91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJzLnRvU2NhbGUob3V0LCB0aGlzLl90cnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuTm9kZS5nZXRTY2FsZScsICdjYy5Ob2RlLnNjYWxlIG9yIGNjLk5vZGUuZ2V0U2NhbGUoY2MuVmVjMyknKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbN107XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHNjYWxlIG9mIGF4aXMgaW4gbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIG5vZGUuXG4gICAgICogWW91IGNhbiBvcGVyYXRlIDIgYXhpcyBpbiAyRCBub2RlLCBhbmQgMyBheGlzIGluIDNEIG5vZGUuXG4gICAgICogV2hlbiBvbmx5ICh4LCB5KSBpcyBwYXNzZWQsIHRoZSB2YWx1ZSBvZiBzY2FsZS56IHdpbGwgbm90IGJlIGNoYW5nZWQuXG4gICAgICogV2hlbiBhIFZlYzIgaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgb2Ygc2NhbGUueiB3aWxsIGJlIHNldCB0byAwLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7oioLngrnlnKjmnKzlnLDlnZDmoIfns7vkuK3lnZDmoIfovbTkuIrnmoTnvKnmlL7mr5TkvovjgIJcbiAgICAgKiAyRCDoioLngrnlj6/ku6Xmk43kvZzkuKTkuKrlnZDmoIfovbTvvIzogIwgM0Qg6IqC54K55Y+v5Lul5pON5L2c5LiJ5Liq5Z2Q5qCH6L2044CCXG4gICAgICog5b2T5Y+q5Lyg5YWlICh4LCB5KSDml7bvvIxzY2FsZS56IOeahOWAvOS4jeS8muiiq+aUueWPmOOAglxuICAgICAqIOW9k+WPquS8oOWFpSBWZWMyIOWvueixoeaXtu+8jHNjYWxlLnog55qE5YC85bCG6KKr6K6+572u5Li6MOOAglxuICAgICAqIEBtZXRob2Qgc2V0U2NhbGVcbiAgICAgKiBAcGFyYW0ge051bWJlcnxWZWMyfFZlYzN9IHggLSBzY2FsZVggb3Igc2NhbGUgb2JqZWN0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbel1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc2V0U2NhbGUoY2MudjIoMiwgMikpOyAvLyBOb3RpY2U6IHNjYWxlWiB3aWxsIGJlIDBcbiAgICAgKiBub2RlLnNldFNjYWxlKGNjLnYzKDIsIDIsIDIpKTsgLy8gZm9yIDNEIG5vZGVcbiAgICAgKiBub2RlLnNldFNjYWxlKDIpO1xuICAgICAqL1xuICAgIHNldFNjYWxlIChuZXdTY2FsZU9yWCwgeSwgeikge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgLy8gb25seSBvbmUgcGFyYW1ldGVyLCBhbmQgaXQncyBhIFZlYzIvVmVjMzpcbiAgICAgICAgaWYgKG5ld1NjYWxlT3JYICYmIHR5cGVvZiBuZXdTY2FsZU9yWCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHggPSBuZXdTY2FsZU9yWC54O1xuICAgICAgICAgICAgeSA9IG5ld1NjYWxlT3JYLnk7XG4gICAgICAgICAgICB6ID0gbmV3U2NhbGVPclguejtcbiAgICAgICAgfVxuICAgICAgICAvLyBvbmx5IG9uZSBwYXJhbWV0ZXIsIGFuZCBpdCdzIGEgbnVtYmVyOlxuICAgICAgICBlbHNlIGlmIChuZXdTY2FsZU9yWCAhPT0gdW5kZWZpbmVkICYmIHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeCA9IG5ld1NjYWxlT3JYO1xuICAgICAgICAgICAgeSA9IG5ld1NjYWxlT3JYO1xuICAgICAgICAgICAgeiA9IG5ld1NjYWxlT3JYO1xuICAgICAgICB9XG4gICAgICAgIC8vIHR3byBvciB0aHJlZSBwYXJhbXRlcnM6XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IG5ld1NjYWxlT3JYO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcblxuICAgICAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB6ID0gdHJzWzldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyc1s3XSAhPT0geCB8fCB0cnNbOF0gIT09IHkgfHwgdHJzWzldICE9PSB6KSB7XG4gICAgICAgICAgICB0cnNbN10gPSB4O1xuICAgICAgICAgICAgdHJzWzhdID0geTtcbiAgICAgICAgICAgIHRyc1s5XSA9IHo7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcbiAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHJvdGF0aW9uIG9mIG5vZGUgKGluIHF1YXRlcm5pb24pLlxuICAgICAqIE5lZWQgcGFzcyBhIGNjLlF1YXQgYXMgdGhlIGFyZ3VtZW50IHRvIHJlY2VpdmUgdGhlIHJldHVybiB2YWx1ZXMuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluivpeiKgueCueeahCBxdWF0ZXJuaW9uIOaXi+i9rOinkuW6pu+8jOmcgOimgeS8oOS4gOS4qiBjYy5RdWF0IOS9nOS4uuWPguaVsOadpeaOpeaUtui/lOWbnuWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0ge1F1YXR9IG91dFxuICAgICAqIEByZXR1cm4ge1F1YXR9IFF1YXRlcm5pb24gb2JqZWN0IHJlcHJlc2VudHMgdGhlIHJvdGF0aW9uXG4gICAgICovXG4gICAgZ2V0Um90YXRpb24gKG91dCkge1xuICAgICAgICBpZiAob3V0IGluc3RhbmNlb2YgUXVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIFRycy50b1JvdGF0aW9uKG91dCwgdGhpcy5fdHJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5nZXRSb3RhdGlvbigpYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHVzZSBgLWNjLk5vZGUuYW5nbGVgIGluc3RlYWQuIChgdGhpcy5ub2RlLmdldFJvdGF0aW9uKClgIC0+IGAtdGhpcy5ub2RlLmFuZ2xlYClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMuYW5nbGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgcm90YXRpb24gb2Ygbm9kZSAoaW4gcXVhdGVybmlvbikuXG4gICAgICogISN6aCDorr7nva7or6XoioLngrnnmoQgcXVhdGVybmlvbiDml4vovazop5LluqbjgIJcbiAgICAgKiBAbWV0aG9kIHNldFJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtjYy5RdWF0fE51bWJlcn0gcXVhdCBRdWF0ZXJuaW9uIG9iamVjdCByZXByZXNlbnRzIHRoZSByb3RhdGlvbiBvciB0aGUgeCB2YWx1ZSBvZiBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSB5IHZhbHVlIG9mIHF1dGVybmlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbel0geiB2YWx1ZSBvZiBxdXRlcm5pb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ddIHcgdmFsdWUgb2YgcXV0ZXJuaW9uXG4gICAgICovXG4gICAgc2V0Um90YXRpb24gKHJvdGF0aW9uLCB5LCB6LCB3KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09ICdudW1iZXInICYmIHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnNldFJvdGF0aW9uKGRlZ3JlZSlgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2Ugc2V0IGAtY2MuTm9kZS5hbmdsZWAgaW5zdGVhZC4gKGB0aGlzLm5vZGUuc2V0Um90YXRpb24oeClgIC0+IGB0aGlzLm5vZGUuYW5nbGUgPSAteGApXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC1yb3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4ID0gcm90YXRpb247XG4gICAgICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgeCA9IHJvdGF0aW9uLng7XG4gICAgICAgICAgICAgICAgeSA9IHJvdGF0aW9uLnk7XG4gICAgICAgICAgICAgICAgeiA9IHJvdGF0aW9uLno7XG4gICAgICAgICAgICAgICAgdyA9IHJvdGF0aW9uLnc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgICAgICBpZiAodHJzWzNdICE9PSB4IHx8IHRyc1s0XSAhPT0geSB8fCB0cnNbNV0gIT09IHogfHwgdHJzWzZdICE9PSB3KSB7XG4gICAgICAgICAgICAgICAgdHJzWzNdID0geDtcbiAgICAgICAgICAgICAgICB0cnNbNF0gPSB5O1xuICAgICAgICAgICAgICAgIHRyc1s1XSA9IHo7XG4gICAgICAgICAgICAgICAgdHJzWzZdID0gdztcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9FdWxlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgdGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZS4gPGJyLz5cbiAgICAgKiBUaGUgY29udGVudFNpemUgcmVtYWlucyB0aGUgc2FtZSBubyBtYXR0ZXIgdGhlIG5vZGUgaXMgc2NhbGVkIG9yIHJvdGF0ZWQuPGJyLz5cbiAgICAgKiBBbGwgbm9kZXMgaGFzIGEgc2l6ZS4gTGF5ZXIgYW5kIFNjZW5lIGhhcyB0aGUgc2FtZSBzaXplIG9mIHRoZSBzY3JlZW4gYnkgZGVmYXVsdC4gPGJyLz5cbiAgICAgKiAhI3poIOiOt+WPluiKgueCueiHqui6q+Wkp+Wwj++8jOS4jeWPl+ivpeiKgueCueaYr+WQpuiiq+e8qeaUvuaIluiAheaXi+i9rOeahOW9seWTjeOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29udGVudFNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfSBUaGUgdW50cmFuc2Zvcm1lZCBzaXplIG9mIHRoZSBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiQ29udGVudCBTaXplOiBcIiArIG5vZGUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICovXG4gICAgZ2V0Q29udGVudFNpemUgKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9jb250ZW50U2l6ZS53aWR0aCwgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZS48YnIvPlxuICAgICAqIFRoZSBjb250ZW50U2l6ZSByZW1haW5zIHRoZSBzYW1lIG5vIG1hdHRlciB0aGUgbm9kZSBpcyBzY2FsZWQgb3Igcm90YXRlZC48YnIvPlxuICAgICAqIEFsbCBub2RlcyBoYXMgYSBzaXplLiBMYXllciBhbmQgU2NlbmUgaGFzIHRoZSBzYW1lIHNpemUgb2YgdGhlIHNjcmVlbi5cbiAgICAgKiAhI3poIOiuvue9ruiKgueCueWOn+Wni+Wkp+Wwj++8jOS4jeWPl+ivpeiKgueCueaYr+WQpuiiq+e8qeaUvuaIluiAheaXi+i9rOeahOW9seWTjeOAglxuICAgICAqIEBtZXRob2Qgc2V0Q29udGVudFNpemVcbiAgICAgKiBAcGFyYW0ge1NpemV8TnVtYmVyfSBzaXplIC0gVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZSBvciBUaGUgdW50cmFuc2Zvcm1lZCBzaXplJ3Mgd2lkdGggb2YgdGhlIG5vZGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSdzIGhlaWdodCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc2V0Q29udGVudFNpemUoY2Muc2l6ZSgxMDAsIDEwMCkpO1xuICAgICAqIG5vZGUuc2V0Q29udGVudFNpemUoMTAwLCAxMDApO1xuICAgICAqL1xuICAgIHNldENvbnRlbnRTaXplIChzaXplLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxvY0NvbnRlbnRTaXplID0gdGhpcy5fY29udGVudFNpemU7XG4gICAgICAgIHZhciBjbG9uZTtcbiAgICAgICAgaWYgKGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoKHNpemUud2lkdGggPT09IGxvY0NvbnRlbnRTaXplLndpZHRoKSAmJiAoc2l6ZS5oZWlnaHQgPT09IGxvY0NvbnRlbnRTaXplLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGNsb25lID0gY2Muc2l6ZShsb2NDb250ZW50U2l6ZS53aWR0aCwgbG9jQ29udGVudFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzaXplID09PSBsb2NDb250ZW50U2l6ZS53aWR0aCkgJiYgKGhlaWdodCA9PT0gbG9jQ29udGVudFNpemUuaGVpZ2h0KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgY2xvbmUgPSBjYy5zaXplKGxvY0NvbnRlbnRTaXplLndpZHRoLCBsb2NDb250ZW50U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jQ29udGVudFNpemUud2lkdGggPSBzaXplO1xuICAgICAgICAgICAgbG9jQ29udGVudFNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTSVpFX09OKSB7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIGNsb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGFuY2hvciBwb2ludC48YnIvPlxuICAgICAqIEFuY2hvciBwb2ludCBpcyB0aGUgcG9pbnQgYXJvdW5kIHdoaWNoIGFsbCB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBvc2l0aW9uaW5nIG1hbmlwdWxhdGlvbnMgdGFrZSBwbGFjZS48YnIvPlxuICAgICAqIEl0J3MgbGlrZSBhIHBpbiBpbiB0aGUgbm9kZSB3aGVyZSBpdCBpcyBcImF0dGFjaGVkXCIgdG8gaXRzIHBhcmVudC4gPGJyLz5cbiAgICAgKiBUaGUgYW5jaG9yUG9pbnQgaXMgbm9ybWFsaXplZCwgbGlrZSBhIHBlcmNlbnRhZ2UuICgwLDApIG1lYW5zIHRoZSBib3R0b20tbGVmdCBjb3JuZXIgYW5kICgxLDEpIG1lYW5zIHRoZSB0b3AtcmlnaHQgY29ybmVyLiA8YnIvPlxuICAgICAqIEJ1dCB5b3UgY2FuIHVzZSB2YWx1ZXMgaGlnaGVyIHRoYW4gKDEsMSkgYW5kIGxvd2VyIHRoYW4gKDAsMCkgdG9vLiAgPGJyLz5cbiAgICAgKiBUaGUgZGVmYXVsdCBhbmNob3IgcG9pbnQgaXMgKDAuNSwwLjUpLCBzbyBpdCBzdGFydHMgYXQgdGhlIGNlbnRlciBvZiB0aGUgbm9kZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6IqC54K56ZSa54K577yM55So55m+5YiG5q+U6KGo56S644CCPGJyLz5cbiAgICAgKiDplJrngrnlupTnlKjkuo7miYDmnInlj5jmjaLlkozlnZDmoIfngrnnmoTmk43kvZzvvIzlroPlsLHlg4/lnKjoioLngrnkuIrov57mjqXlhbbniLboioLngrnnmoTlpKflpLTpkojjgII8YnIvPlxuICAgICAqIOmUmueCueaYr+agh+WHhuWMlueahO+8jOWwseWDj+eZvuWIhuavlOS4gOagt+OAgigw77yMMCkg6KGo56S65bem5LiL6KeS77yMKDHvvIwxKSDooajnpLrlj7PkuIrop5LjgII8YnIvPlxuICAgICAqIOS9huaYr+S9oOWPr+S7peS9v+eUqOavlO+8iDHvvIwx77yJ5pu06auY55qE5YC85oiW6ICF5q+U77yIMO+8jDDvvInmm7TkvY7nmoTlgLzjgII8YnIvPlxuICAgICAqIOm7mOiupOeahOmUmueCueaYr++8iDAuNe+8jDAuNe+8ie+8jOWboOatpOWug+W8gOWni+S6juiKgueCueeahOS4reW/g+S9jee9ruOAgjxici8+XG4gICAgICog5rOo5oSP77yaQ3JlYXRvciDkuK3nmoTplJrngrnku4XnlKjkuo7lrprkvY3miYDlnKjnmoToioLngrnvvIzlrZDoioLngrnnmoTlrprkvY3kuI3lj5flvbHlk43jgIJcbiAgICAgKiBAbWV0aG9kIGdldEFuY2hvclBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn0gVGhlIGFuY2hvciBwb2ludCBvZiBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiTm9kZSBBbmNob3JQb2ludDogXCIgKyBub2RlLmdldEFuY2hvclBvaW50KCkpO1xuICAgICAqL1xuICAgIGdldEFuY2hvclBvaW50ICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX2FuY2hvclBvaW50KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIGFuY2hvciBwb2ludCBpbiBwZXJjZW50LiA8YnIvPlxuICAgICAqIGFuY2hvciBwb2ludCBpcyB0aGUgcG9pbnQgYXJvdW5kIHdoaWNoIGFsbCB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBvc2l0aW9uaW5nIG1hbmlwdWxhdGlvbnMgdGFrZSBwbGFjZS4gPGJyLz5cbiAgICAgKiBJdCdzIGxpa2UgYSBwaW4gaW4gdGhlIG5vZGUgd2hlcmUgaXQgaXMgXCJhdHRhY2hlZFwiIHRvIGl0cyBwYXJlbnQuIDxici8+XG4gICAgICogVGhlIGFuY2hvclBvaW50IGlzIG5vcm1hbGl6ZWQsIGxpa2UgYSBwZXJjZW50YWdlLiAoMCwwKSBtZWFucyB0aGUgYm90dG9tLWxlZnQgY29ybmVyIGFuZCAoMSwxKSBtZWFucyB0aGUgdG9wLXJpZ2h0IGNvcm5lci48YnIvPlxuICAgICAqIEJ1dCB5b3UgY2FuIHVzZSB2YWx1ZXMgaGlnaGVyIHRoYW4gKDEsMSkgYW5kIGxvd2VyIHRoYW4gKDAsMCkgdG9vLjxici8+XG4gICAgICogVGhlIGRlZmF1bHQgYW5jaG9yIHBvaW50IGlzICgwLjUsMC41KSwgc28gaXQgc3RhcnRzIGF0IHRoZSBjZW50ZXIgb2YgdGhlIG5vZGUuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9rumUmueCueeahOeZvuWIhuavlOOAgjxici8+XG4gICAgICog6ZSa54K55bqU55So5LqO5omA5pyJ5Y+Y5o2i5ZKM5Z2Q5qCH54K555qE5pON5L2c77yM5a6D5bCx5YOP5Zyo6IqC54K55LiK6L+e5o6l5YW254i26IqC54K555qE5aSn5aS06ZKI44CCPGJyLz5cbiAgICAgKiDplJrngrnmmK/moIflh4bljJbnmoTvvIzlsLHlg4/nmb7liIbmr5TkuIDmoLfjgIIoMO+8jDApIOihqOekuuW3puS4i+inku+8jCgx77yMMSkg6KGo56S65Y+z5LiK6KeS44CCPGJyLz5cbiAgICAgKiDkvYbmmK/kvaDlj6/ku6Xkvb/nlKjmr5TvvIgx77yMMe+8ieabtOmrmOeahOWAvOaIluiAheavlO+8iDDvvIww77yJ5pu05L2O55qE5YC844CCPGJyLz5cbiAgICAgKiDpu5jorqTnmoTplJrngrnmmK/vvIgwLjXvvIwwLjXvvInvvIzlm6DmraTlroPlvIDlp4vkuo7oioLngrnnmoTkuK3lv4PkvY3nva7jgII8YnIvPlxuICAgICAqIOazqOaEj++8mkNyZWF0b3Ig5Lit55qE6ZSa54K55LuF55So5LqO5a6a5L2N5omA5Zyo55qE6IqC54K577yM5a2Q6IqC54K555qE5a6a5L2N5LiN5Y+X5b2x5ZON44CCXG4gICAgICogQG1ldGhvZCBzZXRBbmNob3JQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvaW50IC0gVGhlIGFuY2hvciBwb2ludCBvZiBub2RlIG9yIFRoZSB4IGF4aXMgYW5jaG9yIG9mIG5vZGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSAtIFRoZSB5IGF4aXMgYW5jaG9yIG9mIG5vZGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldEFuY2hvclBvaW50KGNjLnYyKDEsIDEpKTtcbiAgICAgKiBub2RlLnNldEFuY2hvclBvaW50KDEsIDEpO1xuICAgICAqL1xuICAgIHNldEFuY2hvclBvaW50IChwb2ludCwgeSkge1xuICAgICAgICB2YXIgbG9jQW5jaG9yUG9pbnQgPSB0aGlzLl9hbmNob3JQb2ludDtcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKChwb2ludC54ID09PSBsb2NBbmNob3JQb2ludC54KSAmJiAocG9pbnQueSA9PT0gbG9jQW5jaG9yUG9pbnQueSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbG9jQW5jaG9yUG9pbnQueCA9IHBvaW50Lng7XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC55ID0gcG9pbnQueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgocG9pbnQgPT09IGxvY0FuY2hvclBvaW50LngpICYmICh5ID09PSBsb2NBbmNob3JQb2ludC55KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC54ID0gcG9pbnQ7XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC55ID0geTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBUcmFuc2Zvcm1zIHBvc2l0aW9uIGZyb20gd29ybGQgc3BhY2UgdG8gbG9jYWwgc3BhY2UuXG4gICAgICogQG1ldGhvZCBfaW52VHJhbnNmb3JtUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dFxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjM1xuICAgICAqL1xuICAgIF9pbnZUcmFuc2Zvcm1Qb2ludCAob3V0LCBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9pbnZUcmFuc2Zvcm1Qb2ludChvdXQsIHBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNvcHkob3V0LCBwb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGx0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIC8vIG91dCA9IHBhcmVudF9pbnZfcG9zIC0gcG9zXG4gICAgICAgIFRycy50b1Bvc2l0aW9uKF90cFZlYzNhLCBsdHJzKTtcbiAgICAgICAgVmVjMy5zdWIob3V0LCBvdXQsIF90cFZlYzNhKTtcblxuICAgICAgICAvLyBvdXQgPSBpbnYocm90KSAqIG91dFxuICAgICAgICBUcnMudG9Sb3RhdGlvbihfdHBRdWF0YSwgbHRycyk7XG4gICAgICAgIFF1YXQuY29uanVnYXRlKF90cFF1YXRiLCBfdHBRdWF0YSk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChvdXQsIG91dCwgX3RwUXVhdGIpO1xuXG4gICAgICAgIC8vIG91dCA9ICgxL3NjYWxlKSAqIG91dFxuICAgICAgICBUcnMudG9TY2FsZShfdHBWZWMzYSwgbHRycyk7XG4gICAgICAgIFZlYzMuaW52ZXJzZVNhZmUoX3RwVmVjM2IsIF90cFZlYzNhKTtcbiAgICAgICAgVmVjMy5tdWwob3V0LCBvdXQsIF90cFZlYzNiKTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIENhbGN1bGF0ZSBhbmQgcmV0dXJuIHdvcmxkIHBvc2l0aW9uLlxuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXRcbiAgICAgKiBAcmV0dXJuIHtWZWMzfVxuICAgICAqL1xuICAgIGdldFdvcmxkUG9zaXRpb24gKG91dCkge1xuICAgICAgICBUcnMudG9Qb3NpdGlvbihvdXQsIHRoaXMuX3Rycyk7XG4gICAgICAgIGxldCBjdXJyID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBsZXQgbHRycztcbiAgICAgICAgd2hpbGUgKGN1cnIpIHtcbiAgICAgICAgICAgIGx0cnMgPSBjdXJyLl90cnM7XG4gICAgICAgICAgICAvLyBvdXQgPSBwYXJlbnRfc2NhbGUgKiBwb3NcbiAgICAgICAgICAgIFRycy50b1NjYWxlKF9nd3BWZWMzLCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMubXVsKG91dCwgb3V0LCBfZ3dwVmVjMyk7XG4gICAgICAgICAgICAvLyBvdXQgPSBwYXJlbnRfcXVhdCAqIG91dFxuICAgICAgICAgICAgVHJzLnRvUm90YXRpb24oX2d3cFF1YXQsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KG91dCwgb3V0LCBfZ3dwUXVhdCk7XG4gICAgICAgICAgICAvLyBvdXQgPSBvdXQgKyBwb3NcbiAgICAgICAgICAgIFRycy50b1Bvc2l0aW9uKF9nd3BWZWMzLCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMuYWRkKG91dCwgb3V0LCBfZ3dwVmVjMyk7XG4gICAgICAgICAgICBjdXJyID0gY3Vyci5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHdvcmxkIHBvc2l0aW9uLlxuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBzZXRXb3JsZFBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtWZWMzfSBwb3NcbiAgICAgKi9cbiAgICBzZXRXb3JsZFBvc2l0aW9uIChwb3MpIHtcbiAgICAgICAgbGV0IGx0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHZhciBvbGRQb3NpdGlvbiA9IG5ldyBjYy5WZWMzKGx0cnNbMF0sIGx0cnNbMV0sIGx0cnNbMl0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5PVEU6IHRoaXMgaXMgZmFzdGVyIHRoYW4gaW52ZXJ0IHdvcmxkIG1hdHJpeCBhbmQgdHJhbnNmb3JtIHRoZSBwb2ludFxuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuX2ludlRyYW5zZm9ybVBvaW50KF9zd3BWZWMzLCBwb3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVmVjMy5jb3B5KF9zd3BWZWMzLCBwb3MpO1xuICAgICAgICB9XG4gICAgICAgIFRycy5mcm9tUG9zaXRpb24obHRycywgX3N3cFZlYzMpO1xuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcblxuICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgLy8gc2VuZCBldmVudFxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgb2xkUG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIENhbGN1bGF0ZSBhbmQgcmV0dXJuIHdvcmxkIHJvdGF0aW9uXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkUm90YXRpb25cbiAgICAgKiBAcGFyYW0ge1F1YXR9IG91dFxuICAgICAqIEByZXR1cm4ge1F1YXR9XG4gICAgICovXG4gICAgZ2V0V29ybGRSb3RhdGlvbiAob3V0KSB7XG4gICAgICAgIFRycy50b1JvdGF0aW9uKF9nd3JRdWF0LCB0aGlzLl90cnMpO1xuICAgICAgICBRdWF0LmNvcHkob3V0LCBfZ3dyUXVhdCk7XG4gICAgICAgIGxldCBjdXJyID0gdGhpcy5fcGFyZW50O1xuICAgICAgICB3aGlsZSAoY3Vycikge1xuICAgICAgICAgICAgVHJzLnRvUm90YXRpb24oX2d3clF1YXQsIGN1cnIuX3Rycyk7XG4gICAgICAgICAgICBRdWF0Lm11bChvdXQsIF9nd3JRdWF0LCBvdXQpO1xuICAgICAgICAgICAgY3VyciA9IGN1cnIuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB3b3JsZCByb3RhdGlvbiB3aXRoIHF1YXRlcm5pb25cbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2Qgc2V0V29ybGRSb3RhdGlvblxuICAgICAqIEBwYXJhbSB7UXVhdH0gdmFsXG4gICAgICovXG4gICAgc2V0V29ybGRSb3RhdGlvbiAodmFsKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5nZXRXb3JsZFJvdGF0aW9uKF9zd3JRdWF0KTtcbiAgICAgICAgICAgIFF1YXQuY29uanVnYXRlKF9zd3JRdWF0LCBfc3dyUXVhdCk7XG4gICAgICAgICAgICBRdWF0Lm11bChfc3dyUXVhdCwgX3N3clF1YXQsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBRdWF0LmNvcHkoX3N3clF1YXQsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgVHJzLmZyb21Sb3RhdGlvbih0aGlzLl90cnMsIF9zd3JRdWF0KTtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fdG9FdWxlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUk9UQVRJT04pO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIENhbGN1bGF0ZSBhbmQgcmV0dXJuIHdvcmxkIHNjYWxlXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkU2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dFxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgZ2V0V29ybGRTY2FsZSAob3V0KSB7XG4gICAgICAgIFRycy50b1NjYWxlKF9nd3NWZWMzLCB0aGlzLl90cnMpO1xuICAgICAgICBWZWMzLmNvcHkob3V0LCBfZ3dzVmVjMyk7XG4gICAgICAgIGxldCBjdXJyID0gdGhpcy5fcGFyZW50O1xuICAgICAgICB3aGlsZSAoY3Vycikge1xuICAgICAgICAgICAgVHJzLnRvU2NhbGUoX2d3c1ZlYzMsIGN1cnIuX3Rycyk7XG4gICAgICAgICAgICBWZWMzLm11bChvdXQsIG91dCwgX2d3c1ZlYzMpO1xuICAgICAgICAgICAgY3VyciA9IGN1cnIuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB3b3JsZCBzY2FsZSB3aXRoIHZlYzNcbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2Qgc2V0V29ybGRTY2FsZVxuICAgICAqIEBwYXJhbSB7VmVjM30gc2NhbGVcbiAgICAgKi9cbiAgICBzZXRXb3JsZFNjYWxlIChzY2FsZSkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0V29ybGRTY2FsZShfc3dzVmVjMyk7XG4gICAgICAgICAgICBWZWMzLmRpdihfc3dzVmVjMywgc2NhbGUsIF9zd3NWZWMzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFZlYzMuY29weShfc3dzVmVjMywgc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIFRycy5mcm9tU2NhbGUodGhpcy5fdHJzLCBfc3dzVmVjMyk7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfU0NBTEUpO1xuICAgIH0sXG5cbiAgICBnZXRXb3JsZFJUIChvdXQpIHtcbiAgICAgICAgbGV0IG9wb3MgPSBfZ3dydFZlYzNhO1xuICAgICAgICBsZXQgb3JvdCA9IF9nd3J0UXVhdGE7XG4gICAgICAgIGxldCBsdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICBUcnMudG9Qb3NpdGlvbihvcG9zLCBsdHJzKTtcbiAgICAgICAgVHJzLnRvUm90YXRpb24ob3JvdCwgbHRycyk7XG5cbiAgICAgICAgbGV0IGN1cnIgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChjdXJyKSB7XG4gICAgICAgICAgICBsdHJzID0gY3Vyci5fdHJzO1xuICAgICAgICAgICAgLy8gb3BvcyA9IHBhcmVudF9sc2NhbGUgKiBscG9zXG4gICAgICAgICAgICBUcnMudG9TY2FsZShfZ3dydFZlYzNiLCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMubXVsKG9wb3MsIG9wb3MsIF9nd3J0VmVjM2IpO1xuICAgICAgICAgICAgLy8gb3BvcyA9IHBhcmVudF9scm90ICogb3Bvc1xuICAgICAgICAgICAgVHJzLnRvUm90YXRpb24oX2d3cnRRdWF0YiwgbHRycyk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQob3Bvcywgb3BvcywgX2d3cnRRdWF0Yik7XG4gICAgICAgICAgICAvLyBvcG9zID0gb3BvcyArIGxwb3NcbiAgICAgICAgICAgIFRycy50b1Bvc2l0aW9uKF9nd3J0VmVjM2IsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy5hZGQob3Bvcywgb3BvcywgX2d3cnRWZWMzYik7XG4gICAgICAgICAgICAvLyBvcm90ID0gbHJvdCAqIG9yb3RcbiAgICAgICAgICAgIFF1YXQubXVsKG9yb3QsIF9nd3J0UXVhdGIsIG9yb3QpO1xuICAgICAgICAgICAgY3VyciA9IGN1cnIuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBNYXQ0LmZyb21SVChvdXQsIG9yb3QsIG9wb3MpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCByb3RhdGlvbiBieSBsb29rQXQgdGFyZ2V0IHBvaW50LCBub3JtYWxseSB1c2VkIGJ5IENhbWVyYSBOb2RlXG4gICAgICogISN6aCDpgJrov4fop4Llr5/nm67moIfmnaXorr7nva4gcm90YXRpb27vvIzkuIDoiKznlKjkuo4gQ2FtZXJhIE5vZGUg5LiKXG4gICAgICogQG1ldGhvZCBsb29rQXRcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHBvc1xuICAgICAqIEBwYXJhbSB7VmVjM30gW3VwXSAtIGRlZmF1bHQgaXMgKDAsMSwwKVxuICAgICAqL1xuICAgIGxvb2tBdCAocG9zLCB1cCkge1xuICAgICAgICB0aGlzLmdldFdvcmxkUG9zaXRpb24oX2xhVmVjMyk7XG4gICAgICAgIFZlYzMuc3ViKF9sYVZlYzMsIF9sYVZlYzMsIHBvcyk7IC8vIE5PVEU6IHdlIHVzZSAteiBmb3Igdmlldy1kaXJcbiAgICAgICAgVmVjMy5ub3JtYWxpemUoX2xhVmVjMywgX2xhVmVjMyk7XG4gICAgICAgIFF1YXQuZnJvbVZpZXdVcChfbGFRdWF0LCBfbGFWZWMzLCB1cCk7XG5cbiAgICAgICAgdGhpcy5zZXRXb3JsZFJvdGF0aW9uKF9sYVF1YXQpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTG9jYWxNYXRyaXg6IHVwZGF0ZUxvY2FsTWF0cml4MkQsXG5cbiAgICBfY2FsY3VsV29ybGRNYXRyaXggKCkge1xuICAgICAgICAvLyBBdm9pZCBhcyBtdWNoIGZ1bmN0aW9uIGNhbGwgYXMgcG9zc2libGVcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsTWF0RGlydHkgJiBMb2NhbERpcnR5RmxhZy5UUlNTKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXNzdW1lIHBhcmVudCB3b3JsZCBtYXRyaXggaXMgY29ycmVjdFxuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9tdWxNYXQodGhpcy5fd29ybGRNYXRyaXgsIHBhcmVudC5fd29ybGRNYXRyaXgsIHRoaXMuX21hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBNYXQ0LmNvcHkodGhpcy5fd29ybGRNYXRyaXgsIHRoaXMuX21hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfbXVsTWF0OiBtdWxNYXQyRCxcblxuICAgIF91cGRhdGVXb3JsZE1hdHJpeCAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fd29ybGRNYXREaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsV29ybGRNYXRyaXgoKTtcbiAgICAgICAgICAgIC8vIFN5bmMgZGlydHkgdG8gY2hpbGRyZW5cbiAgICAgICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0TG9jYWxEaXJ0eSAoZmxhZykge1xuICAgICAgICB0aGlzLl9sb2NhbE1hdERpcnR5IHw9IGZsYWc7XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChmbGFnID09PSBMb2NhbERpcnR5RmxhZy5BTExfUE9TSVRJT04gfHwgZmxhZyA9PT0gTG9jYWxEaXJ0eUZsYWcuUE9TSVRJT04pIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1dPUkxEX1RSQU5TRk9STTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRXb3JsZERpcnR5ICgpIHtcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGxvY2FsIHRyYW5zZm9ybSBtYXRyaXggKDR4NCksIGJhc2VkIG9uIHBhcmVudCBub2RlIGNvb3JkaW5hdGVzXG4gICAgICogISN6aCDov5Tlm57lsYDpg6jnqbrpl7TlnZDmoIfns7vnmoTnn6npmLXvvIzln7rkuo7niLboioLngrnlnZDmoIfns7vjgIJcbiAgICAgKiBAbWV0aG9kIGdldExvY2FsTWF0cml4XG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdXQgVGhlIG1hdHJpeCBvYmplY3QgdG8gYmUgZmlsbGVkIHdpdGggZGF0YVxuICAgICAqIEByZXR1cm4ge01hdDR9IFNhbWUgYXMgdGhlIG91dCBtYXRyaXggb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgbWF0NCA9IGNjLm1hdDQoKTtcbiAgICAgKiBub2RlLmdldExvY2FsTWF0cml4KG1hdDQpO1xuICAgICAqL1xuICAgIGdldExvY2FsTWF0cml4IChvdXQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuY29weShvdXQsIHRoaXMuX21hdHJpeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIHdvcmxkIHRyYW5zZm9ybSBtYXRyaXggKDR4NClcbiAgICAgKiAhI3poIOi/lOWbnuS4lueVjOepuumXtOWdkOagh+ezu+eahOefqemYteOAglxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRNYXRyaXhcbiAgICAgKiBAcGFyYW0ge01hdDR9IG91dCBUaGUgbWF0cml4IG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7TWF0NH0gU2FtZSBhcyB0aGUgb3V0IG1hdHJpeCBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBtYXQ0ID0gY2MubWF0NCgpO1xuICAgICAqIG5vZGUuZ2V0V29ybGRNYXRyaXgobWF0NCk7XG4gICAgICovXG4gICAgZ2V0V29ybGRNYXRyaXggKG91dCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICByZXR1cm4gTWF0NC5jb3B5KG91dCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYSBQb2ludCB0byBub2RlIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOWwhuS4gOS4queCuei9rOaNouWIsOiKgueCuSAo5bGA6YOoKSDnqbrpl7TlnZDmoIfns7vjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb05vZGVTcGFjZUFSXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IHdvcmxkUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gW291dF1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfFZlYzJ9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb252ZXJ0VG9Ob2RlU3BhY2VBUjxUIGV4dGVuZHMgY2MuVmVjMiB8IGNjLlZlYzM+KHdvcmxkUG9pbnQ6IFQsIG91dD86IFQpOiBUXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoMTAwLCAxMDApKTtcbiAgICAgKiB2YXIgbmV3VmVjMyA9IG5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjMoMTAwLCAxMDAsIDEwMCkpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb05vZGVTcGFjZUFSICh3b3JsZFBvaW50LCBvdXQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuXG4gICAgICAgIGlmICh3b3JsZFBvaW50IGluc3RhbmNlb2YgY2MuVmVjMikge1xuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBjYy5WZWMyKCk7XG4gICAgICAgICAgICByZXR1cm4gVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgd29ybGRQb2ludCwgX21hdDRfdGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzMoKTtcbiAgICAgICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCB3b3JsZFBvaW50LCBfbWF0NF90ZW1wKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYSBQb2ludCBpbiBub2RlIGNvb3JkaW5hdGVzIHRvIHdvcmxkIHNwYWNlIGNvb3JkaW5hdGVzLlxuICAgICAqICEjemhcbiAgICAgKiDlsIboioLngrnlnZDmoIfns7vkuIvnmoTkuIDkuKrngrnovazmjaLliLDkuJbnlYznqbrpl7TlnZDmoIfns7vjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb1dvcmxkU3BhY2VBUlxuICAgICAqIEBwYXJhbSB7VmVjM3xWZWMyfSBub2RlUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gW291dF1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfFZlYzJ9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb252ZXJ0VG9Xb3JsZFNwYWNlQVI8VCBleHRlbmRzIGNjLlZlYzIgfCBjYy5WZWMzPihub2RlUG9pbnQ6IFQsIG91dD86IFQpOiBUXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDEwMCwgMTAwKSk7XG4gICAgICogdmFyIG5ld1ZlYzMgPSBub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MygxMDAsIDEwMCwgMTAwKSk7XG4gICAgICovXG4gICAgY29udmVydFRvV29ybGRTcGFjZUFSIChub2RlUG9pbnQsIG91dCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICBpZiAobm9kZVBvaW50IGluc3RhbmNlb2YgY2MuVmVjMikge1xuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBjYy5WZWMyKCk7XG4gICAgICAgICAgICByZXR1cm4gVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgbm9kZVBvaW50LCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzMoKTtcbiAgICAgICAgICAgIHJldHVybiBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LCBub2RlUG9pbnQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbi8vIE9MRCBUUkFOU0ZPUk0gQUNDRVNTIEFQSXNcbiAvKipcbiAgICAgKiAhI2VuIENvbnZlcnRzIGEgUG9pbnQgdG8gbm9kZSAobG9jYWwpIHNwYWNlIGNvb3JkaW5hdGVzIHRoZW4gYWRkIHRoZSBhbmNob3IgcG9pbnQgcG9zaXRpb24uXG4gICAgICogU28gdGhlIHJldHVybiBwb3NpdGlvbiB3aWxsIGJlIHJlbGF0ZWQgdG8gdGhlIGxlZnQgYm90dG9tIGNvcm5lciBvZiB0aGUgbm9kZSdzIGJvdW5kaW5nIGJveC5cbiAgICAgKiBUaGlzIGVxdWFscyB0byB0aGUgQVBJIGJlaGF2aW9yIG9mIGNvY29zMmQteCwgeW91IHByb2JhYmx5IHdhbnQgdG8gdXNlIGNvbnZlcnRUb05vZGVTcGFjZUFSIGluc3RlYWRcbiAgICAgKiAhI3poIOWwhuS4gOS4queCuei9rOaNouWIsOiKgueCuSAo5bGA6YOoKSDlnZDmoIfns7vvvIzlubbliqDkuIrplJrngrnnmoTlnZDmoIfjgII8YnIvPlxuICAgICAqIOS5n+WwseaYr+ivtOi/lOWbnueahOWdkOagh+aYr+ebuOWvueS6juiKgueCueWMheWbtOebkuW3puS4i+inkueahOWdkOagh+OAgjxici8+XG4gICAgICog6L+Z5LiqIEFQSSDnmoTorr7orqHmmK/kuLrkuoblkowgY29jb3MyZC14IOS4reihjOS4uuS4gOiHtO+8jOabtOWkmuaDheWGteS4i+S9oOWPr+iDvemcgOimgeS9v+eUqCBjb252ZXJ0VG9Ob2RlU3BhY2VBUuOAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvTm9kZVNwYWNlXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4zXG4gICAgICogQHBhcmFtIHtWZWMyfSB3b3JsZFBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdWZWMyID0gbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2UoY2MudjIoMTAwLCAxMDApKTtcbiAgICAgKi9cbiAgICBjb252ZXJ0VG9Ob2RlU3BhY2UgKHdvcmxkUG9pbnQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICBsZXQgb3V0ID0gbmV3IGNjLlZlYzIoKTtcbiAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgd29ybGRQb2ludCwgX21hdDRfdGVtcCk7XG4gICAgICAgIG91dC54ICs9IHRoaXMuX2FuY2hvclBvaW50LnggKiB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgb3V0LnkgKz0gdGhpcy5fYW5jaG9yUG9pbnQueSAqIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDb252ZXJ0cyBhIFBvaW50IHJlbGF0ZWQgdG8gdGhlIGxlZnQgYm90dG9tIGNvcm5lciBvZiB0aGUgbm9kZSdzIGJvdW5kaW5nIGJveCB0byB3b3JsZCBzcGFjZSBjb29yZGluYXRlcy5cbiAgICAgKiBUaGlzIGVxdWFscyB0byB0aGUgQVBJIGJlaGF2aW9yIG9mIGNvY29zMmQteCwgeW91IHByb2JhYmx5IHdhbnQgdG8gdXNlIGNvbnZlcnRUb1dvcmxkU3BhY2VBUiBpbnN0ZWFkXG4gICAgICogISN6aCDlsIbkuIDkuKrnm7jlr7nkuo7oioLngrnlt6bkuIvop5LnmoTlnZDmoIfkvY3nva7ovazmjaLliLDkuJbnlYznqbrpl7TlnZDmoIfns7vjgIJcbiAgICAgKiDov5nkuKogQVBJIOeahOiuvuiuoeaYr+S4uuS6huWSjCBjb2NvczJkLXgg5Lit6KGM5Li65LiA6Ie077yM5pu05aSa5oOF5Ya15LiL5L2g5Y+v6IO96ZyA6KaB5L2/55SoIGNvbnZlcnRUb1dvcmxkU3BhY2VBUlxuICAgICAqIEBtZXRob2QgY29udmVydFRvV29ybGRTcGFjZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuM1xuICAgICAqIEBwYXJhbSB7VmVjMn0gbm9kZVBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdWZWMyID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKGNjLnYyKDEwMCwgMTAwKSk7XG4gICAgICovXG4gICAgY29udmVydFRvV29ybGRTcGFjZSAobm9kZVBvaW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIGxldCBvdXQgPSBuZXcgY2MuVmVjMihcbiAgICAgICAgICAgIG5vZGVQb2ludC54IC0gdGhpcy5fYW5jaG9yUG9pbnQueCAqIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoLFxuICAgICAgICAgICAgbm9kZVBvaW50LnkgLSB0aGlzLl9hbmNob3JQb2ludC55ICogdGhpcy5fY29udGVudFNpemUuaGVpZ2h0XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCBvdXQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMgaW50byB0aGUgcGFyZW50J3Mgc3BhY2UgY29vcmRpbmF0ZXMuPGJyLz5cbiAgICAgKiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy5cbiAgICAgKiAhI3poIOi/lOWbnui/meS4quWwhuiKgueCue+8iOWxgOmDqO+8ieeahOepuumXtOWdkOagh+ezu+i9rOaNouaIkOeItuiKgueCueeahOepuumXtOWdkOagh+ezu+eahOefqemYteOAgui/meS4quefqemYteS7peWDj+e0oOS4uuWNleS9jeOAglxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSBbb3V0XSBUaGUgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3QgdG8gYmUgZmlsbGVkIHdpdGggZGF0YVxuICAgICAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX0gU2FtZSBhcyB0aGUgb3V0IGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgYWZmaW5lVHJhbnNmb3JtID0gY2MuQWZmaW5lVHJhbnNmb3JtLmNyZWF0ZSgpO1xuICAgICAqIG5vZGUuZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcblxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLl9jb250ZW50U2l6ZTtcbiAgICAgICAgX3ZlYzNfdGVtcC54ID0gLXRoaXMuX2FuY2hvclBvaW50LnggKiBjb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgX3ZlYzNfdGVtcC55ID0gLXRoaXMuX2FuY2hvclBvaW50LnkgKiBjb250ZW50U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgTWF0NC5jb3B5KF9tYXQ0X3RlbXAsIHRoaXMuX21hdHJpeCk7XG4gICAgICAgIE1hdDQudHJhbnNmb3JtKF9tYXQ0X3RlbXAsIF9tYXQ0X3RlbXAsIF92ZWMzX3RlbXApO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMgaW50byB0aGUgcGFyZW50J3Mgc3BhY2UgY29vcmRpbmF0ZXMuPGJyLz5cbiAgICAgKiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy48YnIvPlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIEFSIChBbmNob3IgUmVsYXRpdmUpLlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57ov5nkuKrlsIboioLngrnvvIjlsYDpg6jvvInnmoTnqbrpl7TlnZDmoIfns7vovazmjaLmiJDniLboioLngrnnmoTnqbrpl7TlnZDmoIfns7vnmoTnn6npmLXjgII8YnIvPlxuICAgICAqIOi/meS4quefqemYteS7peWDj+e0oOS4uuWNleS9jeOAgjxici8+XG4gICAgICog6K+l5pa55rOV5Z+65LqO6IqC54K55Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtQVIgKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHdvcmxkIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy5cbiAgICAgKiAhI3poIOi/lOWbnuiKgueCueWIsOS4lueVjOWdkOagh+ezu+eahOS7v+WwhOWPmOaNouefqemYteOAguefqemYteWNleS9jeaYr+WDj+e0oOOAglxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcblxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLl9jb250ZW50U2l6ZTtcbiAgICAgICAgX3ZlYzNfdGVtcC54ID0gLXRoaXMuX2FuY2hvclBvaW50LnggKiBjb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgX3ZlYzNfdGVtcC55ID0gLXRoaXMuX2FuY2hvclBvaW50LnkgKiBjb250ZW50U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgTWF0NC5jb3B5KF9tYXQ0X3RlbXAsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgTWF0NC50cmFuc2Zvcm0oX21hdDRfdGVtcCwgX21hdDRfdGVtcCwgX3ZlYzNfdGVtcCk7XG5cbiAgICAgICAgcmV0dXJuIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgX21hdDRfdGVtcCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBhZmZpbmUgdHJhbnNmb3JtIG1hdHJpeC4gVGhlIG1hdHJpeCBpcyBpbiBQaXhlbHMuPGJyLz5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBBUiAoQW5jaG9yIFJlbGF0aXZlKS5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue6IqC54K55Yiw5LiW55WM5Z2Q5qCH5Lu/5bCE5Y+Y5o2i55+p6Zi144CC55+p6Zi15Y2V5L2N5piv5YOP57Sg44CCPGJyLz5cbiAgICAgKiDor6Xmlrnms5Xln7rkuo7oioLngrnlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVJcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybUFSKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1BUiAob3V0KSB7XG4gICAgICAgIGlmICghb3V0KSB7XG4gICAgICAgICAgICBvdXQgPSBBZmZpbmVUcmFucy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIHJldHVybiBBZmZpbmVUcmFucy5mcm9tTWF0NChvdXQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSBwYXJlbnQncyBzcGFjZSBjb29yZGluYXRlcyB0byB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMuPGJyLz5cbiAgICAgKiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy4gVGhlIHJldHVybmVkIHRyYW5zZm9ybSBpcyByZWFkb25seSBhbmQgY2Fubm90IGJlIGNoYW5nZWQuXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuWwhueItuiKgueCueeahOWdkOagh+ezu+i9rOaNouaIkOiKgueCue+8iOWxgOmDqO+8ieeahOepuumXtOWdkOagh+ezu+eahOefqemYteOAgjxici8+XG4gICAgICog6K+l55+p6Zi15Lul5YOP57Sg5Li65Y2V5L2N44CC6L+U5Zue55qE55+p6Zi15piv5Y+q6K+755qE77yM5LiN6IO95pu05pS544CCXG4gICAgICogQG1ldGhvZCBnZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm0oYWZmaW5lVHJhbnNmb3JtKTtcbiAgICAgKi9cbiAgICBnZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm0gKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl9tYXRyaXgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBpbnZlcnNlIHdvcmxkIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy5cbiAgICAgKiAhI2VuIOi/lOWbnuS4lueVjOWdkOagh+ezu+WIsOiKgueCueWdkOagh+ezu+eahOmAhuefqemYteOAglxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXRXb3JsZFRvTm9kZVRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBjb252ZW5pZW5jZSBtZXRob2RzIHdoaWNoIHRha2UgYSBjYy5Ub3VjaCBpbnN0ZWFkIG9mIGNjLlZlYzIuXG4gICAgICogISN6aCDlsIbop6bmkbjngrnovazmjaLmiJDmnKzlnLDlnZDmoIfns7vkuK3kvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7VG91Y2h9IHRvdWNoIC0gVGhlIHRvdWNoIG9iamVjdFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvdWNoVG9Ob2RlU3BhY2UodG91Y2gpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlICh0b3VjaCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9Ob2RlU3BhY2UodG91Y2guZ2V0TG9jYXRpb24oKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gY29udmVydHMgYSBjYy5Ub3VjaCAod29ybGQgY29vcmRpbmF0ZXMpIGludG8gYSBsb2NhbCBjb29yZGluYXRlLiBUaGlzIG1ldGhvZCBpcyBBUiAoQW5jaG9yIFJlbGF0aXZlKS5cbiAgICAgKiAhI3poIOi9rOaNouS4gOS4qiBjYy5Ub3VjaO+8iOS4lueVjOWdkOagh++8ieWIsOS4gOS4quWxgOmDqOWdkOagh++8jOivpeaWueazleWfuuS6juiKgueCueWdkOagh+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge1RvdWNofSB0b3VjaCAtIFRoZSB0b3VjaCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIodG91Y2gpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIgKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoLmdldExvY2F0aW9uKCkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIFwibG9jYWxcIiBheGlzIGFsaWduZWQgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLiA8YnIvPlxuICAgICAqIFRoZSByZXR1cm5lZCBib3ggaXMgcmVsYXRpdmUgb25seSB0byBpdHMgcGFyZW50LlxuICAgICAqICEjemgg6L+U5Zue54i26IqC5Z2Q5qCH57O75LiL55qE6L205ZCR5a+56b2Q55qE5YyF5Zu055uS44CCXG4gICAgICogQG1ldGhvZCBnZXRCb3VuZGluZ0JveFxuICAgICAqIEByZXR1cm4ge1JlY3R9IFRoZSBjYWxjdWxhdGVkIGJvdW5kaW5nIGJveCBvZiB0aGUgbm9kZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGJvdW5kaW5nQm94ID0gbm9kZS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQm94ICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCByZWN0ID0gY2MucmVjdChcbiAgICAgICAgICAgIC10aGlzLl9hbmNob3JQb2ludC54ICogd2lkdGgsXG4gICAgICAgICAgICAtdGhpcy5fYW5jaG9yUG9pbnQueSAqIGhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHJlY3QudHJhbnNmb3JtTWF0NChyZWN0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIFwid29ybGRcIiBheGlzIGFsaWduZWQgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLjxici8+XG4gICAgICogVGhlIGJvdW5kaW5nIGJveCBjb250YWlucyBzZWxmIGFuZCBhY3RpdmUgY2hpbGRyZW4ncyB3b3JsZCBib3VuZGluZyBib3guXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuiKgueCueWcqOS4lueVjOWdkOagh+ezu+S4i+eahOWvuem9kOi9tOWQkeeahOWMheWbtOebku+8iEFBQkLvvInjgII8YnIvPlxuICAgICAqIOivpei+ueahhuWMheWQq+iHqui6q+WSjOW3sua/gOa0u+eahOWtkOiKgueCueeahOS4lueVjOi+ueahhuOAglxuICAgICAqIEBtZXRob2QgZ2V0Qm91bmRpbmdCb3hUb1dvcmxkXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0JveFRvV29ybGQgKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Qm91bmRpbmdCb3hUbygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0Qm91bmRpbmdCb3hUbyAoKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgcmVjdCA9IGNjLnJlY3QoXG4gICAgICAgICAgICAtdGhpcy5fYW5jaG9yUG9pbnQueCAqIHdpZHRoLFxuICAgICAgICAgICAgLXRoaXMuX2FuY2hvclBvaW50LnkgKiBoZWlnaHQsXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCk7XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsV29ybGRNYXRyaXgoKTtcbiAgICAgICAgcmVjdC50cmFuc2Zvcm1NYXQ0KHJlY3QsIHRoaXMuX3dvcmxkTWF0cml4KTtcblxuICAgICAgICAvL3F1ZXJ5IGNoaWxkJ3MgQm91bmRpbmdCb3hcbiAgICAgICAgaWYgKCF0aGlzLl9jaGlsZHJlbilcbiAgICAgICAgICAgIHJldHVybiByZWN0O1xuXG4gICAgICAgIHZhciBsb2NDaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBsb2NDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRSZWN0ID0gY2hpbGQuX2dldEJvdW5kaW5nQm94VG8oKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRSZWN0KVxuICAgICAgICAgICAgICAgICAgICByZWN0LnVuaW9uKHJlY3QsIGNoaWxkUmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfSxcblxuICAgIF91cGRhdGVPcmRlck9mQXJyaXZhbCAoKSB7XG4gICAgICAgIHZhciBhcnJpdmFsT3JkZXIgPSB0aGlzLl9wYXJlbnQgPyArK3RoaXMuX3BhcmVudC5fY2hpbGRBcnJpdmFsT3JkZXIgOiAwO1xuICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9ICh0aGlzLl9sb2NhbFpPcmRlciAmIDB4ZmZmZjAwMDApIHwgYXJyaXZhbE9yZGVyO1xuXG4gICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0lCTElOR19PUkRFUl9DSEFOR0VEKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZHMgYSBjaGlsZCB0byB0aGUgbm9kZSB3aXRoIHogb3JkZXIgYW5kIG5hbWUuXG4gICAgICogISN6aFxuICAgICAqIOa3u+WKoOWtkOiKgueCue+8jOW5tuS4lOWPr+S7peS/ruaUueivpeiKgueCueeahCDlsYDpg6ggWiDpobrluo/lkozlkI3lrZfjgIJcbiAgICAgKiBAbWV0aG9kIGFkZENoaWxkXG4gICAgICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIEEgY2hpbGQgbm9kZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbekluZGV4XSAtIFogb3JkZXIgZm9yIGRyYXdpbmcgcHJpb3JpdHkuIFBsZWFzZSByZWZlciB0byB6SW5kZXggcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gQSBuYW1lIHRvIGlkZW50aWZ5IHRoZSBub2RlIGVhc2lseS4gUGxlYXNlIHJlZmVyIHRvIG5hbWUgcHJvcGVydHlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuYWRkQ2hpbGQobmV3Tm9kZSwgMSwgXCJub2RlXCIpO1xuICAgICAqL1xuICAgIGFkZENoaWxkIChjaGlsZCwgekluZGV4LCBuYW1lKSB7XG4gICAgICAgIGlmIChDQ19ERVYgJiYgIWNjLk5vZGUuaXNOb2RlKGNoaWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoMTYzNCwgY2MuanMuZ2V0Q2xhc3NOYW1lKGNoaWxkKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuYXNzZXJ0SUQoY2hpbGQsIDE2MDYpO1xuICAgICAgICBjYy5hc3NlcnRJRChjaGlsZC5fcGFyZW50ID09PSBudWxsLCAxNjA1KTtcblxuICAgICAgICAvLyBpbnZva2VzIHRoZSBwYXJlbnQgc2V0dGVyXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHpJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZC56SW5kZXggPSB6SW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hpbGQubmFtZSA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wcyBhbGwgcnVubmluZyBhY3Rpb25zIGFuZCBzY2hlZHVsZXJzLlxuICAgICAqICEjemgg5YGc5q2i5omA5pyJ5q2j5Zyo5pKt5pS+55qE5Yqo5L2c5ZKM6K6h5pe25Zmo44CCXG4gICAgICogQG1ldGhvZCBjbGVhbnVwXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLmNsZWFudXAoKTtcbiAgICAgKi9cbiAgICBjbGVhbnVwICgpIHtcbiAgICAgICAgLy8gYWN0aW9uc1xuICAgICAgICBBY3Rpb25NYW5hZ2VyRXhpc3QgJiYgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0KHRoaXMpO1xuICAgICAgICAvLyBldmVudFxuICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICAgIHZhciBpLCBsZW4gPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGgsIG5vZGU7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX2NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZS5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTb3J0cyB0aGUgY2hpbGRyZW4gYXJyYXkgZGVwZW5kcyBvbiBjaGlsZHJlbidzIHpJbmRleCBhbmQgYXJyaXZhbE9yZGVyLFxuICAgICAqIG5vcm1hbGx5IHlvdSB3b24ndCBuZWVkIHRvIGludm9rZSB0aGlzIGZ1bmN0aW9uLlxuICAgICAqICEjemgg5qC55o2u5a2Q6IqC54K555qEIHpJbmRleCDlkowgYXJyaXZhbE9yZGVyIOi/m+ihjOaOkuW6j++8jOato+W4uOaDheWGteS4i+W8gOWPkeiAheS4jemcgOimgeaJi+WKqOiwg+eUqOi/meS4quWHveaVsOOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBzb3J0QWxsQ2hpbGRyZW5cbiAgICAgKi9cbiAgICBzb3J0QWxsQ2hpbGRyZW4gKCkge1xuICAgICAgICBpZiAodGhpcy5fcmVvcmRlckNoaWxkRGlydHkpIHtcblxuICAgICAgICAgICAgdGhpcy5fcmVvcmRlckNoaWxkRGlydHkgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gZGVsYXkgdXBkYXRlIGFycml2YWxPcmRlciBiZWZvcmUgc29ydCBjaGlsZHJlblxuICAgICAgICAgICAgdmFyIF9jaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuLCBjaGlsZDtcbiAgICAgICAgICAgIC8vIHJlc2V0IGFycml2YWxPcmRlciBiZWZvcmUgc29ydCBjaGlsZHJlblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRBcnJpdmFsT3JkZXIgPSAxO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IF9jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gX2NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgIGNoaWxkLl91cGRhdGVPcmRlck9mQXJyaXZhbCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPcHRpbWl6ZSByZW9yZGVyaW5nIGV2ZW50IGNvZGUgdG8gZml4IHByb2JsZW1zIHdpdGggc2V0dGluZyB6aW5kZXhcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yLzJkLXRhc2tzL2lzc3Vlcy8xMTg2XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuX3NldERpcnR5Rm9yTm9kZSh0aGlzKTtcblxuICAgICAgICAgICAgaWYgKF9jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5zZXJ0aW9uIHNvcnRcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQsIGNoaWxkMjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMSwgY291bnQgPSBfY2hpbGRyZW4ubGVuZ3RoOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IF9jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGogPSBpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaiA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2hpbGQyID0gX2NoaWxkcmVuW2ogLSAxXSkuX2xvY2FsWk9yZGVyID4gY2hpbGQuX2xvY2FsWk9yZGVyOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jaGlsZHJlbltqXSA9IGNoaWxkMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfY2hpbGRyZW5bal0gPSBjaGlsZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkNISUxEX1JFT1JERVIsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX19mYXN0T2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5zb3J0QWxsQ2hpbGRyZW4sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9kZWxheVNvcnQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Jlb3JkZXJDaGlsZERpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5fX2Zhc3RPbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHRoaXMuc29ydEFsbENoaWxkcmVuLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcmVzdG9yZVByb3BlcnRpZXM6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIFRPRE86IFJlZmluZSB0aGlzIGNvZGUgYWZ0ZXIgY29tcGxldGluZyB1bmRvL3JlZG8gMi4wLlxuICAgICAgICAgKiBUaGUgbm9kZSB3aWxsIGJlIGRlc3Ryb3llZCB3aGVuIGRlbGV0aW5nIGluIHRoZSBlZGl0b3IsXG4gICAgICAgICAqIGJ1dCBpdCB3aWxsIGJlIHJlc2VydmVkIGFuZCByZXVzZWQgZm9yIHVuZG8uXG4gICAgICAgICovXG5cbiAgICAgICAgLy8gcmVzdG9yZSAzZCBub2RlXG4gICAgICAgIHRoaXMuaXMzRE5vZGUgPSB0aGlzLmlzM0ROb2RlO1xuXG4gICAgICAgIGlmICghdGhpcy5fbWF0cml4KSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRyaXggPSBjYy5tYXQ0KHRoaXMuX3NwYWNlSW5mby5sb2NhbE1hdCk7XG4gICAgICAgICAgICBNYXQ0LmlkZW50aXR5KHRoaXMuX21hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl93b3JsZE1hdHJpeCkge1xuICAgICAgICAgICAgdGhpcy5fd29ybGRNYXRyaXggPSBjYy5tYXQ0KHRoaXMuX3NwYWNlSW5mby53b3JsZE1hdCk7XG4gICAgICAgICAgICBNYXQ0LmlkZW50aXR5KHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgPSBMb2NhbERpcnR5RmxhZy5BTEw7XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2Zyb21FdWxlcigpO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STTtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlckNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQ29tcG9uZW50Lm1hcmtGb3JSZW5kZXIodHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfQ0hJTERSRU47XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25SZXN0b3JlOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9vblJlc3RvcmVCYXNlKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzdG9yZVByb3BlcnRpZXMoKTtcblxuICAgICAgICB2YXIgYWN0aW9uTWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICBhY3Rpb25NYW5hZ2VyICYmIGFjdGlvbk1hbmFnZXIucmVzdW1lVGFyZ2V0KHRoaXMpO1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdGlvbk1hbmFnZXIgJiYgYWN0aW9uTWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbn07XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICAvLyBkZXByZWNhdGVkLCBvbmx5IHVzZWQgdG8gaW1wb3J0IG9sZCBkYXRhIGluIGVkaXRvclxuICAgIGpzLm1peGluKE5vZGVEZWZpbmVzLnByb3BlcnRpZXMsIHtcbiAgICAgICAgX3NjYWxlWDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIF9zY2FsZVk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZVxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5sZXQgTm9kZSA9IGNjLkNsYXNzKE5vZGVEZWZpbmVzKTtcblxuLy8gM0QgTm9kZSBQcm9wZXJ0eVxuXG5cbi8vIE5vZGUgRXZlbnRcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgcG9zaXRpb24gY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDkvY3nva7lj5jliqjnm5HlkKzkuovku7YsIOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBwb3NpdGlvbi1jaGFuZ2VkXG4gKiBAcGFyYW0ge1ZlYzJ9IG9sZFBvcyAtIFRoZSBvbGQgcG9zaXRpb24sIGJ1dCB0aGlzIHBhcmFtZXRlciBpcyBvbmx5IGF2YWlsYWJsZSBpbiBlZGl0b3IhXG4gKi9cbi8qKlxuICogISNlblxuICogVGhlIHNpemUgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWwuuWvuOWPmOWKqOebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7IOi/m+ihjOebkeWQrOOAglxuICogQGV2ZW50IHNpemUtY2hhbmdlZFxuICogQHBhcmFtIHtTaXplfSBvbGRTaXplIC0gVGhlIG9sZCBzaXplLCBidXQgdGhpcyBwYXJhbWV0ZXIgaXMgb25seSBhdmFpbGFibGUgaW4gZWRpdG9yIVxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBhbmNob3IgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog6ZSa54K55Y+Y5Yqo55uR5ZCs5LqL5Lu277yM6YCa6L+HIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBhbmNob3ItY2hhbmdlZFxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBhZGRpbmcgY2hpbGQgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9BRERFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog5aKe5Yqg5a2Q6IqC54K555uR5ZCs5LqL5Lu277yM6YCa6L+HIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9BRERFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1hZGRlZFxuICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIGNoaWxkIHdoaWNoIGhhdmUgYmVlbiBhZGRlZFxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSByZW1vdmluZyBjaGlsZCBldmVudCwgeW91IGNhbiBsaXN0ZW4gdG8gdGhpcyBldmVudCB0aHJvdWdoIHRoZSBzdGF0ZW1lbnQgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFTU9WRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWIoOmZpOWtkOiKgueCueebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfUkVNT1ZFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1yZW1vdmVkXG4gKiBAcGFyYW0ge05vZGV9IGNoaWxkIC0gY2hpbGQgd2hpY2ggaGF2ZSBiZWVuIHJlbW92ZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgcmVvcmRlcmluZyBjaGlsZCBldmVudCwgeW91IGNhbiBsaXN0ZW4gdG8gdGhpcyBldmVudCB0aHJvdWdoIHRoZSBzdGF0ZW1lbnQgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFT1JERVIsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWtkOiKgueCuemhuuW6j+WPmOWKqOebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfUkVPUkRFUiwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1yZW9yZGVyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBub2RlIHdob3NlIGNoaWxkcmVuIGhhdmUgYmVlbiByZW9yZGVyZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgZ3JvdXAgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5HUk9VUF9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDoioLngrnliIbnu4Tlj5jliqjnm5HlkKzkuovku7bvvIzpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkdST1VQX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgZ3JvdXAtY2hhbmdlZFxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gbm9kZSB3aG9zZSBncm91cCBoYXMgY2hhbmdlZFxuICovXG5cbi8vIERlcHJlY2F0ZWQgQVBJc1xuXG4vKipcbiAqICEjZW5cbiAqIFJldHVybnMgdGhlIGRpc3BsYXllZCBvcGFjaXR5IG9mIE5vZGUsXG4gKiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGRpc3BsYXllZCBvcGFjaXR5IGFuZCBvcGFjaXR5IGlzIHRoYXQgZGlzcGxheWVkIG9wYWNpdHkgaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiBvcGFjaXR5IGFuZCBwYXJlbnQgbm9kZSdzIG9wYWNpdHkgd2hlbiBjYXNjYWRlIG9wYWNpdHkgZW5hYmxlZC5cbiAqICEjemhcbiAqIOiOt+WPluiKgueCueaYvuekuumAj+aYjuW6pu+8jFxuICog5pi+56S66YCP5piO5bqm5ZKM6YCP5piO5bqm5LmL6Ze055qE5LiN5ZCM5LmL5aSE5Zyo5LqO5b2T5ZCv55So57qn6L+e6YCP5piO5bqm5pe277yMXG4gKiDmmL7npLrpgI/mmI7luqbmmK/ln7rkuo7oh6rouqvpgI/mmI7luqblkozniLboioLngrnpgI/mmI7luqborqHnrpfnmoTjgIJcbiAqXG4gKiBAbWV0aG9kIGdldERpc3BsYXllZE9wYWNpdHlcbiAqIEByZXR1cm4ge251bWJlcn0gZGlzcGxheWVkIG9wYWNpdHlcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjAsIHBsZWFzZSB1c2Ugb3BhY2l0eSBwcm9wZXJ0eSwgY2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIFJldHVybnMgdGhlIGRpc3BsYXllZCBjb2xvciBvZiBOb2RlLFxuICogdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBkaXNwbGF5ZWQgY29sb3IgYW5kIGNvbG9yIGlzIHRoYXQgZGlzcGxheWVkIGNvbG9yIGlzIGNhbGN1bGF0ZWQgYmFzZWQgb24gY29sb3IgYW5kIHBhcmVudCBub2RlJ3MgY29sb3Igd2hlbiBjYXNjYWRlIGNvbG9yIGVuYWJsZWQuXG4gKiAhI3poXG4gKiDojrflj5boioLngrnnmoTmmL7npLrpopzoibLvvIxcbiAqIOaYvuekuuminOiJsuWSjOminOiJsuS5i+mXtOeahOS4jeWQjOS5i+WkhOWcqOS6juW9k+WQr+eUqOe6p+i/numinOiJsuaXtu+8jFxuICog5pi+56S66aKc6Imy5piv5Z+65LqO6Ieq6Lqr6aKc6Imy5ZKM54i26IqC54K56aKc6Imy6K6h566X55qE44CCXG4gKlxuICogQG1ldGhvZCBnZXREaXNwbGF5ZWRDb2xvclxuICogQHJldHVybiB7Q29sb3J9XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wLCBwbGVhc2UgdXNlIGNvbG9yIHByb3BlcnR5LCBjYXNjYWRlIGNvbG9yIGlzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqICEjZW4gQ2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWQgZnJvbSB2Mi4wXG4gKiBJbmRpY2F0ZSB3aGV0aGVyIG5vZGUncyBvcGFjaXR5IHZhbHVlIGFmZmVjdCBpdHMgY2hpbGQgbm9kZXMsIGRlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAqICEjemgg6YCP5piO5bqm57qn6IGU5Yqf6IO95LuOIHYyLjAg5byA5aeL5bey56e76ZmkXG4gKiDoioLngrnnmoTkuI3pgI/mmI7luqblgLzmmK/lkKblvbHlk43lhbblrZDoioLngrnvvIzpu5jorqTlgLzkuLogdHJ1ZeOAglxuICogQHByb3BlcnR5IGNhc2NhZGVPcGFjaXR5XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xuXG4vKipcbiAqICEjZW4gQ2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWQgZnJvbSB2Mi4wXG4gKiBSZXR1cm5zIHdoZXRoZXIgbm9kZSdzIG9wYWNpdHkgdmFsdWUgYWZmZWN0IGl0cyBjaGlsZCBub2Rlcy5cbiAqICEjemgg6YCP5piO5bqm57qn6IGU5Yqf6IO95LuOIHYyLjAg5byA5aeL5bey56e76ZmkXG4gKiDov5Tlm57oioLngrnnmoTkuI3pgI/mmI7luqblgLzmmK/lkKblvbHlk43lhbblrZDoioLngrnjgIJcbiAqIEBtZXRob2QgaXNDYXNjYWRlT3BhY2l0eUVuYWJsZWRcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuLyoqXG4gKiAhI2VuIENhc2NhZGUgb3BhY2l0eSBpcyByZW1vdmVkIGZyb20gdjIuMFxuICogRW5hYmxlIG9yIGRpc2FibGUgY2FzY2FkZSBvcGFjaXR5LCBpZiBjYXNjYWRlIGVuYWJsZWQsIGNoaWxkIG5vZGVzJyBvcGFjaXR5IHdpbGwgYmUgdGhlIG11bHRpcGxpY2F0aW9uIG9mIHBhcmVudCBvcGFjaXR5IGFuZCBpdHMgb3duIG9wYWNpdHkuXG4gKiAhI3poIOmAj+aYjuW6pue6p+iBlOWKn+iDveS7jiB2Mi4wIOW8gOWni+W3suenu+mZpFxuICog5ZCv55So5oiW56aB55So57qn6L+e5LiN6YCP5piO5bqm77yM5aaC5p6c57qn6L+e5ZCv55So77yM5a2Q6IqC54K555qE5LiN6YCP5piO5bqm5bCG5piv54i25LiN6YCP5piO5bqm5LmY5LiK5a6D6Ieq5bex55qE5LiN6YCP5piO5bqm44CCXG4gKiBAbWV0aG9kIHNldENhc2NhZGVPcGFjaXR5RW5hYmxlZFxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICogQHBhcmFtIHtCb29sZWFufSBjYXNjYWRlT3BhY2l0eUVuYWJsZWRcbiAqL1xuXG4vKipcbiAqICEjZW4gT3BhY2l0eSBtb2RpZnkgUkdCIGhhdmUgYmVlbiByZW1vdmVkIHNpbmNlIHYyLjBcbiAqIFNldCB3aGV0aGVyIGNvbG9yIHNob3VsZCBiZSBjaGFuZ2VkIHdpdGggdGhlIG9wYWNpdHkgdmFsdWUsXG4gKiB1c2VsZXNzIGluIGNjc2cuTm9kZSwgYnV0IHRoaXMgZnVuY3Rpb24gaXMgb3ZlcnJpZGUgaW4gc29tZSBjbGFzcyB0byBoYXZlIHN1Y2ggYmVoYXZpb3IuXG4gKiAhI3poIOmAj+aYjuW6puW9seWTjeminOiJsumFjee9ruW3sue7j+iiq+W6n+W8g1xuICog6K6+572u5pu05pS56YCP5piO5bqm5pe25piv5ZCm5L+u5pS5UkdC5YC877yMXG4gKiBAbWV0aG9kIHNldE9wYWNpdHlNb2RpZnlSR0JcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3BhY2l0eVZhbHVlXG4gKi9cblxuLyoqXG4gKiAhI2VuIE9wYWNpdHkgbW9kaWZ5IFJHQiBoYXZlIGJlZW4gcmVtb3ZlZCBzaW5jZSB2Mi4wXG4gKiBHZXQgd2hldGhlciBjb2xvciBzaG91bGQgYmUgY2hhbmdlZCB3aXRoIHRoZSBvcGFjaXR5IHZhbHVlLlxuICogISN6aCDpgI/mmI7luqblvbHlk43popzoibLphY3nva7lt7Lnu4/ooqvlup/lvINcbiAqIOiOt+WPluabtOaUuemAj+aYjuW6puaXtuaYr+WQpuS/ruaUuVJHQuWAvOOAglxuICogQG1ldGhvZCBpc09wYWNpdHlNb2RpZnlSR0JcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuXG5sZXQgX3AgPSBOb2RlLnByb3RvdHlwZTtcbmpzLmdldHNldChfcCwgJ3Bvc2l0aW9uJywgX3AuZ2V0UG9zaXRpb24sIF9wLnNldFBvc2l0aW9uLCBmYWxzZSwgdHJ1ZSk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBsZXQgdmVjM190bXAgPSBuZXcgVmVjMygpO1xuICAgIGNjLmpzLmdldHNldChfcCwgJ3dvcmxkRXVsZXJBbmdsZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhbmdsZXMgPSBuZXcgVmVjMyh0aGlzLl9ldWxlckFuZ2xlcyk7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgYW5nbGVzLmFkZFNlbGYocGFyZW50Ll9ldWxlckFuZ2xlcyk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmdsZXM7XG4gICAgfSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmVjM190bXAuc2V0KHYpO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHZlYzNfdG1wLnN1YlNlbGYocGFyZW50Ll9ldWxlckFuZ2xlcyk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXVsZXJBbmdsZXMgPSB2ZWMzX3RtcDtcbiAgICB9KTtcbn1cblxuY2MuTm9kZSA9IG1vZHVsZS5leHBvcnRzID0gTm9kZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9