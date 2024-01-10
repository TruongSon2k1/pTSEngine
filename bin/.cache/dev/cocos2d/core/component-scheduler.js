
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/component-scheduler.js';
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
require('./platform/CCClass');

var Flags = require('./platform/CCObject').Flags;

var jsArray = require('./platform/js').array;

var IsStartCalled = Flags.IsStartCalled;
var IsOnEnableCalled = Flags.IsOnEnableCalled;
var IsEditorOnEnableCalled = Flags.IsEditorOnEnableCalled;

var callerFunctor = CC_EDITOR && require('./utils/misc').tryCatchFunctor_EDITOR;

var callOnEnableInTryCatch = CC_EDITOR && callerFunctor('onEnable');
var callOnDisableInTryCatch = CC_EDITOR && callerFunctor('onDisable');

function sortedIndex(array, comp) {
  var order = comp.constructor._executionOrder;
  var id = comp._id;

  for (var l = 0, h = array.length - 1, m = h >>> 1; l <= h; m = l + h >>> 1) {
    var test = array[m];
    var testOrder = test.constructor._executionOrder;

    if (testOrder > order) {
      h = m - 1;
    } else if (testOrder < order) {
      l = m + 1;
    } else {
      var testId = test._id;

      if (testId > id) {
        h = m - 1;
      } else if (testId < id) {
        l = m + 1;
      } else {
        return m;
      }
    }
  }

  return ~l;
} // remove disabled and not invoked component from array


function stableRemoveInactive(iterator, flagToClear) {
  var array = iterator.array;
  var next = iterator.i + 1;

  while (next < array.length) {
    var comp = array[next];

    if (comp._enabled && comp.node._activeInHierarchy) {
      ++next;
    } else {
      iterator.removeAt(next);

      if (flagToClear) {
        comp._objFlags &= ~flagToClear;
      }
    }
  }
} // This class contains some queues used to invoke life-cycle methods by script execution order


var LifeCycleInvoker = cc.Class({
  __ctor__: function __ctor__(invokeFunc) {
    var Iterator = jsArray.MutableForwardIterator; // components which priority === 0 (default)

    this._zero = new Iterator([]); // components which priority < 0

    this._neg = new Iterator([]); // components which priority > 0

    this._pos = new Iterator([]);

    if (CC_TEST) {
      cc.assert(typeof invokeFunc === 'function', 'invokeFunc must be type function');
    }

    this._invoke = invokeFunc;
  },
  statics: {
    stableRemoveInactive: stableRemoveInactive
  },
  add: null,
  remove: null,
  invoke: null
});

function compareOrder(a, b) {
  return a.constructor._executionOrder - b.constructor._executionOrder;
} // for onLoad: sort once all components registered, invoke once


var OneOffInvoker = cc.Class({
  "extends": LifeCycleInvoker,
  add: function add(comp) {
    var order = comp.constructor._executionOrder;
    (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).array.push(comp);
  },
  remove: function remove(comp) {
    var order = comp.constructor._executionOrder;
    (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).fastRemove(comp);
  },
  cancelInactive: function cancelInactive(flagToClear) {
    stableRemoveInactive(this._zero, flagToClear);
    stableRemoveInactive(this._neg, flagToClear);
    stableRemoveInactive(this._pos, flagToClear);
  },
  invoke: function invoke() {
    var compsNeg = this._neg;

    if (compsNeg.array.length > 0) {
      compsNeg.array.sort(compareOrder);

      this._invoke(compsNeg);

      compsNeg.array.length = 0;
    }

    this._invoke(this._zero);

    this._zero.array.length = 0;
    var compsPos = this._pos;

    if (compsPos.array.length > 0) {
      compsPos.array.sort(compareOrder);

      this._invoke(compsPos);

      compsPos.array.length = 0;
    }
  }
}); // for update: sort every time new component registered, invoke many times

var ReusableInvoker = cc.Class({
  "extends": LifeCycleInvoker,
  add: function add(comp) {
    var order = comp.constructor._executionOrder;

    if (order === 0) {
      this._zero.array.push(comp);
    } else {
      var array = order < 0 ? this._neg.array : this._pos.array;
      var i = sortedIndex(array, comp);

      if (i < 0) {
        array.splice(~i, 0, comp);
      } else if (CC_DEV) {
        cc.error('component already added');
      }
    }
  },
  remove: function remove(comp) {
    var order = comp.constructor._executionOrder;

    if (order === 0) {
      this._zero.fastRemove(comp);
    } else {
      var iterator = order < 0 ? this._neg : this._pos;
      var i = sortedIndex(iterator.array, comp);

      if (i >= 0) {
        iterator.removeAt(i);
      }
    }
  },
  invoke: function invoke(dt) {
    if (this._neg.array.length > 0) {
      this._invoke(this._neg, dt);
    }

    this._invoke(this._zero, dt);

    if (this._pos.array.length > 0) {
      this._invoke(this._pos, dt);
    }
  }
});

function enableInEditor(comp) {
  if (!(comp._objFlags & IsEditorOnEnableCalled)) {
    cc.engine.emit('component-enabled', comp.uuid);
    comp._objFlags |= IsEditorOnEnableCalled;
  }
} // return function to simply call each component with try catch protection


function createInvokeImpl(indiePath, useDt, ensureFlag, fastPath) {
  if (CC_SUPPORT_JIT) {
    // function (it) {
    //     var a = it.array;
    //     for (it.i = 0; it.i < a.length; ++it.i) {
    //         var c = a[it.i];
    //         // ...
    //     }
    // }
    var body = 'var a=it.array;' + 'for(it.i=0;it.i<a.length;++it.i){' + 'var c=a[it.i];' + indiePath + '}';
    fastPath = useDt ? Function('it', 'dt', body) : Function('it', body);
    indiePath = Function('c', 'dt', indiePath);
  }

  return function (iterator, dt) {
    try {
      fastPath(iterator, dt);
    } catch (e) {
      // slow path
      cc._throw(e);

      var array = iterator.array;

      if (ensureFlag) {
        array[iterator.i]._objFlags |= ensureFlag;
      }

      ++iterator.i; // invoke next callback

      for (; iterator.i < array.length; ++iterator.i) {
        try {
          indiePath(array[iterator.i], dt);
        } catch (e) {
          cc._throw(e);

          if (ensureFlag) {
            array[iterator.i]._objFlags |= ensureFlag;
          }
        }
      }
    }
  };
}

var invokeStart = CC_SUPPORT_JIT ? createInvokeImpl('c.start();c._objFlags|=' + IsStartCalled, false, IsStartCalled) : createInvokeImpl(function (c) {
  c.start();
  c._objFlags |= IsStartCalled;
}, false, IsStartCalled, function (iterator) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    var comp = array[iterator.i];
    comp.start();
    comp._objFlags |= IsStartCalled;
  }
});
var invokeUpdate = CC_SUPPORT_JIT ? createInvokeImpl('c.update(dt)', true) : createInvokeImpl(function (c, dt) {
  c.update(dt);
}, true, undefined, function (iterator, dt) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    array[iterator.i].update(dt);
  }
});
var invokeLateUpdate = CC_SUPPORT_JIT ? createInvokeImpl('c.lateUpdate(dt)', true) : createInvokeImpl(function (c, dt) {
  c.lateUpdate(dt);
}, true, undefined, function (iterator, dt) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    array[iterator.i].lateUpdate(dt);
  }
});
/**
 * The Manager for Component's life-cycle methods.
 */

function ctor() {
  // invokers
  this.startInvoker = new OneOffInvoker(invokeStart);
  this.updateInvoker = new ReusableInvoker(invokeUpdate);
  this.lateUpdateInvoker = new ReusableInvoker(invokeLateUpdate); // components deferred to next frame

  this._deferredComps = []; // during a loop

  this._updating = false;
}

var ComponentScheduler = cc.Class({
  ctor: ctor,
  unscheduleAll: ctor,
  statics: {
    LifeCycleInvoker: LifeCycleInvoker,
    OneOffInvoker: OneOffInvoker,
    createInvokeImpl: createInvokeImpl,
    invokeOnEnable: CC_EDITOR ? function (iterator) {
      var compScheduler = cc.director._compScheduler;
      var array = iterator.array;

      for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
        var comp = array[iterator.i];

        if (comp._enabled) {
          callOnEnableInTryCatch(comp);
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (!deactivatedDuringOnEnable) {
            compScheduler._onEnabled(comp);
          }
        }
      }
    } : function (iterator) {
      var compScheduler = cc.director._compScheduler;
      var array = iterator.array;

      for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
        var comp = array[iterator.i];

        if (comp._enabled) {
          comp.onEnable();
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (!deactivatedDuringOnEnable) {
            compScheduler._onEnabled(comp);
          }
        }
      }
    }
  },
  _onEnabled: function _onEnabled(comp) {
    cc.director.getScheduler().resumeTarget(comp);
    comp._objFlags |= IsOnEnableCalled; // schedule

    if (this._updating) {
      this._deferredComps.push(comp);
    } else {
      this._scheduleImmediate(comp);
    }
  },
  _onDisabled: function _onDisabled(comp) {
    cc.director.getScheduler().pauseTarget(comp);
    comp._objFlags &= ~IsOnEnableCalled; // cancel schedule task

    var index = this._deferredComps.indexOf(comp);

    if (index >= 0) {
      jsArray.fastRemoveAt(this._deferredComps, index);
      return;
    } // unschedule


    if (comp.start && !(comp._objFlags & IsStartCalled)) {
      this.startInvoker.remove(comp);
    }

    if (comp.update) {
      this.updateInvoker.remove(comp);
    }

    if (comp.lateUpdate) {
      this.lateUpdateInvoker.remove(comp);
    }
  },
  enableComp: CC_EDITOR ? function (comp, invoker) {
    if (cc.engine.isPlaying || comp.constructor._executeInEditMode) {
      if (!(comp._objFlags & IsOnEnableCalled)) {
        if (comp.onEnable) {
          if (invoker) {
            invoker.add(comp);
            enableInEditor(comp);
            return;
          } else {
            callOnEnableInTryCatch(comp);
            var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

            if (deactivatedDuringOnEnable) {
              return;
            }
          }
        }

        this._onEnabled(comp);
      }
    }

    enableInEditor(comp);
  } : function (comp, invoker) {
    if (!(comp._objFlags & IsOnEnableCalled)) {
      if (comp.onEnable) {
        if (invoker) {
          invoker.add(comp);
          return;
        } else {
          comp.onEnable();
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (deactivatedDuringOnEnable) {
            return;
          }
        }
      }

      this._onEnabled(comp);
    }
  },
  disableComp: CC_EDITOR ? function (comp) {
    if (cc.engine.isPlaying || comp.constructor._executeInEditMode) {
      if (comp._objFlags & IsOnEnableCalled) {
        if (comp.onDisable) {
          callOnDisableInTryCatch(comp);
        }

        this._onDisabled(comp);
      }
    }

    if (comp._objFlags & IsEditorOnEnableCalled) {
      cc.engine.emit('component-disabled', comp.uuid);
      comp._objFlags &= ~IsEditorOnEnableCalled;
    }
  } : function (comp) {
    if (comp._objFlags & IsOnEnableCalled) {
      if (comp.onDisable) {
        comp.onDisable();
      }

      this._onDisabled(comp);
    }
  },
  _scheduleImmediate: function _scheduleImmediate(comp) {
    if (typeof comp.start === 'function' && !(comp._objFlags & IsStartCalled)) {
      this.startInvoker.add(comp);
    }

    if (typeof comp.update === 'function') {
      this.updateInvoker.add(comp);
    }

    if (typeof comp.lateUpdate === 'function') {
      this.lateUpdateInvoker.add(comp);
    }
  },
  _deferredSchedule: function _deferredSchedule() {
    var comps = this._deferredComps;

    for (var i = 0, len = comps.length; i < len; i++) {
      this._scheduleImmediate(comps[i]);
    }

    comps.length = 0;
  },
  // Call new registered start schedule immediately since last time start phase calling in this frame
  // See cocos-creator/2d-tasks/issues/256
  _startForNewComps: function _startForNewComps() {
    if (this._deferredComps.length > 0) {
      this._deferredSchedule();

      this.startInvoker.invoke();
    }
  },
  startPhase: function startPhase() {
    // Start of this frame
    this._updating = true; // call start

    this.startInvoker.invoke(); // Start components of new activated nodes during start

    this._startForNewComps(); // if (CC_PREVIEW) {
    //     try {
    //         this.startInvoker.invoke();
    //     }
    //     catch (e) {
    //         // prevent start from getting into infinite loop
    //         this.startInvoker._neg.array.length = 0;
    //         this.startInvoker._zero.array.length = 0;
    //         this.startInvoker._pos.array.length = 0;
    //         throw e;
    //     }
    // }
    // else {
    //     this.startInvoker.invoke();
    // }

  },
  updatePhase: function updatePhase(dt) {
    this.updateInvoker.invoke(dt);
  },
  lateUpdatePhase: function lateUpdatePhase(dt) {
    this.lateUpdateInvoker.invoke(dt); // End of this frame

    this._updating = false; // Start components of new activated nodes during update and lateUpdate
    // The start callback will be invoked immediately,
    // update and lateUpdate callback will be running in the next frame

    this._startForNewComps();
  }
});
module.exports = ComponentScheduler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudC1zY2hlZHVsZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkZsYWdzIiwianNBcnJheSIsImFycmF5IiwiSXNTdGFydENhbGxlZCIsIklzT25FbmFibGVDYWxsZWQiLCJJc0VkaXRvck9uRW5hYmxlQ2FsbGVkIiwiY2FsbGVyRnVuY3RvciIsIkNDX0VESVRPUiIsInRyeUNhdGNoRnVuY3Rvcl9FRElUT1IiLCJjYWxsT25FbmFibGVJblRyeUNhdGNoIiwiY2FsbE9uRGlzYWJsZUluVHJ5Q2F0Y2giLCJzb3J0ZWRJbmRleCIsImNvbXAiLCJvcmRlciIsImNvbnN0cnVjdG9yIiwiX2V4ZWN1dGlvbk9yZGVyIiwiaWQiLCJfaWQiLCJsIiwiaCIsImxlbmd0aCIsIm0iLCJ0ZXN0IiwidGVzdE9yZGVyIiwidGVzdElkIiwic3RhYmxlUmVtb3ZlSW5hY3RpdmUiLCJpdGVyYXRvciIsImZsYWdUb0NsZWFyIiwibmV4dCIsImkiLCJfZW5hYmxlZCIsIm5vZGUiLCJfYWN0aXZlSW5IaWVyYXJjaHkiLCJyZW1vdmVBdCIsIl9vYmpGbGFncyIsIkxpZmVDeWNsZUludm9rZXIiLCJjYyIsIkNsYXNzIiwiX19jdG9yX18iLCJpbnZva2VGdW5jIiwiSXRlcmF0b3IiLCJNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yIiwiX3plcm8iLCJfbmVnIiwiX3BvcyIsIkNDX1RFU1QiLCJhc3NlcnQiLCJfaW52b2tlIiwic3RhdGljcyIsImFkZCIsInJlbW92ZSIsImludm9rZSIsImNvbXBhcmVPcmRlciIsImEiLCJiIiwiT25lT2ZmSW52b2tlciIsInB1c2giLCJmYXN0UmVtb3ZlIiwiY2FuY2VsSW5hY3RpdmUiLCJjb21wc05lZyIsInNvcnQiLCJjb21wc1BvcyIsIlJldXNhYmxlSW52b2tlciIsInNwbGljZSIsIkNDX0RFViIsImVycm9yIiwiZHQiLCJlbmFibGVJbkVkaXRvciIsImVuZ2luZSIsImVtaXQiLCJ1dWlkIiwiY3JlYXRlSW52b2tlSW1wbCIsImluZGllUGF0aCIsInVzZUR0IiwiZW5zdXJlRmxhZyIsImZhc3RQYXRoIiwiQ0NfU1VQUE9SVF9KSVQiLCJib2R5IiwiRnVuY3Rpb24iLCJlIiwiX3Rocm93IiwiaW52b2tlU3RhcnQiLCJjIiwic3RhcnQiLCJpbnZva2VVcGRhdGUiLCJ1cGRhdGUiLCJ1bmRlZmluZWQiLCJpbnZva2VMYXRlVXBkYXRlIiwibGF0ZVVwZGF0ZSIsImN0b3IiLCJzdGFydEludm9rZXIiLCJ1cGRhdGVJbnZva2VyIiwibGF0ZVVwZGF0ZUludm9rZXIiLCJfZGVmZXJyZWRDb21wcyIsIl91cGRhdGluZyIsIkNvbXBvbmVudFNjaGVkdWxlciIsInVuc2NoZWR1bGVBbGwiLCJpbnZva2VPbkVuYWJsZSIsImNvbXBTY2hlZHVsZXIiLCJkaXJlY3RvciIsIl9jb21wU2NoZWR1bGVyIiwiZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSIsIl9vbkVuYWJsZWQiLCJvbkVuYWJsZSIsImdldFNjaGVkdWxlciIsInJlc3VtZVRhcmdldCIsIl9zY2hlZHVsZUltbWVkaWF0ZSIsIl9vbkRpc2FibGVkIiwicGF1c2VUYXJnZXQiLCJpbmRleCIsImluZGV4T2YiLCJmYXN0UmVtb3ZlQXQiLCJlbmFibGVDb21wIiwiaW52b2tlciIsImlzUGxheWluZyIsIl9leGVjdXRlSW5FZGl0TW9kZSIsImRpc2FibGVDb21wIiwib25EaXNhYmxlIiwiX2RlZmVycmVkU2NoZWR1bGUiLCJjb21wcyIsImxlbiIsIl9zdGFydEZvck5ld0NvbXBzIiwic3RhcnRQaGFzZSIsInVwZGF0ZVBoYXNlIiwibGF0ZVVwZGF0ZVBoYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QU9WOztBQUNBLFNBQUtzRSxpQkFBTCxHQVJVLENBVVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNILEdBL0w2QjtBQWlNOUJFLEVBQUFBLFdBak04Qix1QkFpTWpCekQsRUFqTWlCLEVBaU1iO0FBQ2IsU0FBS3lCLGFBQUwsQ0FBbUJ4QyxNQUFuQixDQUEwQmUsRUFBMUI7QUFDSCxHQW5NNkI7QUFxTTlCMEQsRUFBQUEsZUFyTThCLDJCQXFNYjFELEVBck1hLEVBcU1UO0FBQ2pCLFNBQUswQixpQkFBTCxDQUF1QnpDLE1BQXZCLENBQThCZSxFQUE5QixFQURpQixDQUdqQjs7QUFDQSxTQUFLNEIsU0FBTCxHQUFpQixLQUFqQixDQUppQixDQU1qQjtBQUNBO0FBQ0E7O0FBQ0EsU0FBSzJCLGlCQUFMO0FBQ0g7QUEvTTZCLENBQVQsQ0FBekI7QUFrTkFJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQi9CLGtCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NDbGFzcycpO1xyXG52YXIgRmxhZ3MgPSByZXF1aXJlKCcuL3BsYXRmb3JtL0NDT2JqZWN0JykuRmxhZ3M7XHJcbnZhciBqc0FycmF5ID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9qcycpLmFycmF5O1xyXG5cclxudmFyIElzU3RhcnRDYWxsZWQgPSBGbGFncy5Jc1N0YXJ0Q2FsbGVkO1xyXG52YXIgSXNPbkVuYWJsZUNhbGxlZCA9IEZsYWdzLklzT25FbmFibGVDYWxsZWQ7XHJcbnZhciBJc0VkaXRvck9uRW5hYmxlQ2FsbGVkID0gRmxhZ3MuSXNFZGl0b3JPbkVuYWJsZUNhbGxlZDtcclxuXHJcbnZhciBjYWxsZXJGdW5jdG9yID0gQ0NfRURJVE9SICYmIHJlcXVpcmUoJy4vdXRpbHMvbWlzYycpLnRyeUNhdGNoRnVuY3Rvcl9FRElUT1I7XHJcbnZhciBjYWxsT25FbmFibGVJblRyeUNhdGNoID0gQ0NfRURJVE9SICYmIGNhbGxlckZ1bmN0b3IoJ29uRW5hYmxlJyk7XHJcbnZhciBjYWxsT25EaXNhYmxlSW5UcnlDYXRjaCA9IENDX0VESVRPUiAmJiBjYWxsZXJGdW5jdG9yKCdvbkRpc2FibGUnKTtcclxuXHJcbmZ1bmN0aW9uIHNvcnRlZEluZGV4IChhcnJheSwgY29tcCkge1xyXG4gICAgdmFyIG9yZGVyID0gY29tcC5jb25zdHJ1Y3Rvci5fZXhlY3V0aW9uT3JkZXI7XHJcbiAgICB2YXIgaWQgPSBjb21wLl9pZDtcclxuICAgIGZvciAodmFyIGwgPSAwLCBoID0gYXJyYXkubGVuZ3RoIC0gMSwgbSA9IGggPj4+IDE7XHJcbiAgICAgICAgIGwgPD0gaDtcclxuICAgICAgICAgbSA9IChsICsgaCkgPj4+IDFcclxuICAgICkge1xyXG4gICAgICAgIHZhciB0ZXN0ID0gYXJyYXlbbV07XHJcbiAgICAgICAgdmFyIHRlc3RPcmRlciA9IHRlc3QuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xyXG4gICAgICAgIGlmICh0ZXN0T3JkZXIgPiBvcmRlcikge1xyXG4gICAgICAgICAgICBoID0gbSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRlc3RPcmRlciA8IG9yZGVyKSB7XHJcbiAgICAgICAgICAgIGwgPSBtICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0SWQgPSB0ZXN0Ll9pZDtcclxuICAgICAgICAgICAgaWYgKHRlc3RJZCA+IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBoID0gbSAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGVzdElkIDwgaWQpIHtcclxuICAgICAgICAgICAgICAgIGwgPSBtICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIH5sO1xyXG59XHJcblxyXG4vLyByZW1vdmUgZGlzYWJsZWQgYW5kIG5vdCBpbnZva2VkIGNvbXBvbmVudCBmcm9tIGFycmF5XHJcbmZ1bmN0aW9uIHN0YWJsZVJlbW92ZUluYWN0aXZlIChpdGVyYXRvciwgZmxhZ1RvQ2xlYXIpIHtcclxuICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLmFycmF5O1xyXG4gICAgdmFyIG5leHQgPSBpdGVyYXRvci5pICsgMTtcclxuICAgIHdoaWxlIChuZXh0IDwgYXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGNvbXAgPSBhcnJheVtuZXh0XTtcclxuICAgICAgICBpZiAoY29tcC5fZW5hYmxlZCAmJiBjb21wLm5vZGUuX2FjdGl2ZUluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICsrbmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZXJhdG9yLnJlbW92ZUF0KG5leHQpO1xyXG4gICAgICAgICAgICBpZiAoZmxhZ1RvQ2xlYXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbXAuX29iakZsYWdzICY9IH5mbGFnVG9DbGVhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gVGhpcyBjbGFzcyBjb250YWlucyBzb21lIHF1ZXVlcyB1c2VkIHRvIGludm9rZSBsaWZlLWN5Y2xlIG1ldGhvZHMgYnkgc2NyaXB0IGV4ZWN1dGlvbiBvcmRlclxyXG52YXIgTGlmZUN5Y2xlSW52b2tlciA9IGNjLkNsYXNzKHtcclxuICAgIF9fY3Rvcl9fIChpbnZva2VGdW5jKSB7XHJcbiAgICAgICAgdmFyIEl0ZXJhdG9yID0ganNBcnJheS5NdXRhYmxlRm9yd2FyZEl0ZXJhdG9yO1xyXG4gICAgICAgIC8vIGNvbXBvbmVudHMgd2hpY2ggcHJpb3JpdHkgPT09IDAgKGRlZmF1bHQpXHJcbiAgICAgICAgdGhpcy5femVybyA9IG5ldyBJdGVyYXRvcihbXSk7XHJcbiAgICAgICAgLy8gY29tcG9uZW50cyB3aGljaCBwcmlvcml0eSA8IDBcclxuICAgICAgICB0aGlzLl9uZWcgPSBuZXcgSXRlcmF0b3IoW10pO1xyXG4gICAgICAgIC8vIGNvbXBvbmVudHMgd2hpY2ggcHJpb3JpdHkgPiAwXHJcbiAgICAgICAgdGhpcy5fcG9zID0gbmV3IEl0ZXJhdG9yKFtdKTtcclxuXHJcbiAgICAgICAgaWYgKENDX1RFU1QpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXJ0KHR5cGVvZiBpbnZva2VGdW5jID09PSAnZnVuY3Rpb24nLCAnaW52b2tlRnVuYyBtdXN0IGJlIHR5cGUgZnVuY3Rpb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW52b2tlID0gaW52b2tlRnVuYztcclxuICAgIH0sXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgc3RhYmxlUmVtb3ZlSW5hY3RpdmVcclxuICAgIH0sXHJcbiAgICBhZGQ6IG51bGwsXHJcbiAgICByZW1vdmU6IG51bGwsXHJcbiAgICBpbnZva2U6IG51bGwsXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY29tcGFyZU9yZGVyIChhLCBiKSB7XHJcbiAgICByZXR1cm4gYS5jb25zdHJ1Y3Rvci5fZXhlY3V0aW9uT3JkZXIgLSBiLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcclxufVxyXG5cclxuLy8gZm9yIG9uTG9hZDogc29ydCBvbmNlIGFsbCBjb21wb25lbnRzIHJlZ2lzdGVyZWQsIGludm9rZSBvbmNlXHJcbnZhciBPbmVPZmZJbnZva2VyID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogTGlmZUN5Y2xlSW52b2tlcixcclxuICAgIGFkZCAoY29tcCkge1xyXG4gICAgICAgIHZhciBvcmRlciA9IGNvbXAuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xyXG4gICAgICAgIChvcmRlciA9PT0gMCA/IHRoaXMuX3plcm8gOiAob3JkZXIgPCAwID8gdGhpcy5fbmVnIDogdGhpcy5fcG9zKSkuYXJyYXkucHVzaChjb21wKTtcclxuICAgIH0sXHJcbiAgICByZW1vdmUgKGNvbXApIHtcclxuICAgICAgICB2YXIgb3JkZXIgPSBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcclxuICAgICAgICAob3JkZXIgPT09IDAgPyB0aGlzLl96ZXJvIDogKG9yZGVyIDwgMCA/IHRoaXMuX25lZyA6IHRoaXMuX3BvcykpLmZhc3RSZW1vdmUoY29tcCk7XHJcbiAgICB9LFxyXG4gICAgY2FuY2VsSW5hY3RpdmUgKGZsYWdUb0NsZWFyKSB7XHJcbiAgICAgICAgc3RhYmxlUmVtb3ZlSW5hY3RpdmUodGhpcy5femVybywgZmxhZ1RvQ2xlYXIpO1xyXG4gICAgICAgIHN0YWJsZVJlbW92ZUluYWN0aXZlKHRoaXMuX25lZywgZmxhZ1RvQ2xlYXIpO1xyXG4gICAgICAgIHN0YWJsZVJlbW92ZUluYWN0aXZlKHRoaXMuX3BvcywgZmxhZ1RvQ2xlYXIpO1xyXG4gICAgfSxcclxuICAgIGludm9rZSAoKSB7XHJcbiAgICAgICAgdmFyIGNvbXBzTmVnID0gdGhpcy5fbmVnO1xyXG4gICAgICAgIGlmIChjb21wc05lZy5hcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbXBzTmVnLmFycmF5LnNvcnQoY29tcGFyZU9yZGVyKTtcclxuICAgICAgICAgICAgdGhpcy5faW52b2tlKGNvbXBzTmVnKTtcclxuICAgICAgICAgICAgY29tcHNOZWcuYXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2ludm9rZSh0aGlzLl96ZXJvKTtcclxuICAgICAgICB0aGlzLl96ZXJvLmFycmF5Lmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIHZhciBjb21wc1BvcyA9IHRoaXMuX3BvcztcclxuICAgICAgICBpZiAoY29tcHNQb3MuYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb21wc1Bvcy5hcnJheS5zb3J0KGNvbXBhcmVPcmRlcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludm9rZShjb21wc1Bvcyk7XHJcbiAgICAgICAgICAgIGNvbXBzUG9zLmFycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcblxyXG4vLyBmb3IgdXBkYXRlOiBzb3J0IGV2ZXJ5IHRpbWUgbmV3IGNvbXBvbmVudCByZWdpc3RlcmVkLCBpbnZva2UgbWFueSB0aW1lc1xyXG52YXIgUmV1c2FibGVJbnZva2VyID0gY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogTGlmZUN5Y2xlSW52b2tlcixcclxuICAgIGFkZCAoY29tcCkge1xyXG4gICAgICAgIHZhciBvcmRlciA9IGNvbXAuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xyXG4gICAgICAgIGlmIChvcmRlciA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl96ZXJvLmFycmF5LnB1c2goY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBvcmRlciA8IDAgPyB0aGlzLl9uZWcuYXJyYXkgOiB0aGlzLl9wb3MuYXJyYXk7XHJcbiAgICAgICAgICAgIHZhciBpID0gc29ydGVkSW5kZXgoYXJyYXksIGNvbXApO1xyXG4gICAgICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZSh+aSwgMCwgY29tcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcignY29tcG9uZW50IGFscmVhZHkgYWRkZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmUgKGNvbXApIHtcclxuICAgICAgICB2YXIgb3JkZXIgPSBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcclxuICAgICAgICBpZiAob3JkZXIgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5femVyby5mYXN0UmVtb3ZlKGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gb3JkZXIgPCAwID8gdGhpcy5fbmVnIDogdGhpcy5fcG9zO1xyXG4gICAgICAgICAgICB2YXIgaSA9IHNvcnRlZEluZGV4KGl0ZXJhdG9yLmFycmF5LCBjb21wKTtcclxuICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlcmF0b3IucmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW52b2tlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9uZWcuYXJyYXkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnZva2UodGhpcy5fbmVnLCBkdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnZva2UodGhpcy5femVybywgZHQpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fcG9zLmFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5faW52b2tlKHRoaXMuX3BvcywgZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZW5hYmxlSW5FZGl0b3IgKGNvbXApIHtcclxuICAgIGlmICghKGNvbXAuX29iakZsYWdzICYgSXNFZGl0b3JPbkVuYWJsZUNhbGxlZCkpIHtcclxuICAgICAgICBjYy5lbmdpbmUuZW1pdCgnY29tcG9uZW50LWVuYWJsZWQnLCBjb21wLnV1aWQpO1xyXG4gICAgICAgIGNvbXAuX29iakZsYWdzIHw9IElzRWRpdG9yT25FbmFibGVDYWxsZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHJldHVybiBmdW5jdGlvbiB0byBzaW1wbHkgY2FsbCBlYWNoIGNvbXBvbmVudCB3aXRoIHRyeSBjYXRjaCBwcm90ZWN0aW9uXHJcbmZ1bmN0aW9uIGNyZWF0ZUludm9rZUltcGwgKGluZGllUGF0aCwgdXNlRHQsIGVuc3VyZUZsYWcsIGZhc3RQYXRoKSB7XHJcbiAgICBpZiAoQ0NfU1VQUE9SVF9KSVQpIHtcclxuICAgICAgICAvLyBmdW5jdGlvbiAoaXQpIHtcclxuICAgICAgICAvLyAgICAgdmFyIGEgPSBpdC5hcnJheTtcclxuICAgICAgICAvLyAgICAgZm9yIChpdC5pID0gMDsgaXQuaSA8IGEubGVuZ3RoOyArK2l0LmkpIHtcclxuICAgICAgICAvLyAgICAgICAgIHZhciBjID0gYVtpdC5pXTtcclxuICAgICAgICAvLyAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGxldCBib2R5ID0gJ3ZhciBhPWl0LmFycmF5OycgK1xyXG4gICAgICAgICAgICAgICAgICAgJ2ZvcihpdC5pPTA7aXQuaTxhLmxlbmd0aDsrK2l0LmkpeycgK1xyXG4gICAgICAgICAgICAgICAgICAgJ3ZhciBjPWFbaXQuaV07JyArXHJcbiAgICAgICAgICAgICAgICAgICBpbmRpZVBhdGggK1xyXG4gICAgICAgICAgICAgICAgICAgJ30nO1xyXG4gICAgICAgIGZhc3RQYXRoID0gdXNlRHQgPyBGdW5jdGlvbignaXQnLCAnZHQnLCBib2R5KSA6IEZ1bmN0aW9uKCdpdCcsIGJvZHkpO1xyXG4gICAgICAgIGluZGllUGF0aCA9IEZ1bmN0aW9uKCdjJywgJ2R0JywgaW5kaWVQYXRoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoaXRlcmF0b3IsIGR0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZmFzdFBhdGgoaXRlcmF0b3IsIGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gc2xvdyBwYXRoXHJcbiAgICAgICAgICAgIGNjLl90aHJvdyhlKTtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuYXJyYXk7XHJcbiAgICAgICAgICAgIGlmIChlbnN1cmVGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJheVtpdGVyYXRvci5pXS5fb2JqRmxhZ3MgfD0gZW5zdXJlRmxhZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2l0ZXJhdG9yLmk7ICAgLy8gaW52b2tlIG5leHQgY2FsbGJhY2tcclxuICAgICAgICAgICAgZm9yICg7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRpZVBhdGgoYXJyYXlbaXRlcmF0b3IuaV0sIGR0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuX3Rocm93KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnN1cmVGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5W2l0ZXJhdG9yLmldLl9vYmpGbGFncyB8PSBlbnN1cmVGbGFnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbnZhciBpbnZva2VTdGFydCA9IENDX1NVUFBPUlRfSklUID9cclxuICAgIGNyZWF0ZUludm9rZUltcGwoJ2Muc3RhcnQoKTtjLl9vYmpGbGFnc3w9JyArIElzU3RhcnRDYWxsZWQsIGZhbHNlLCBJc1N0YXJ0Q2FsbGVkKSA6XHJcbiAgICBjcmVhdGVJbnZva2VJbXBsKGZ1bmN0aW9uIChjKSB7XHJcbiAgICAgICAgICAgIGMuc3RhcnQoKTtcclxuICAgICAgICAgICAgYy5fb2JqRmxhZ3MgfD0gSXNTdGFydENhbGxlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICAgIElzU3RhcnRDYWxsZWQsXHJcbiAgICAgICAgZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLmFycmF5O1xyXG4gICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wID0gYXJyYXlbaXRlcmF0b3IuaV07XHJcbiAgICAgICAgICAgICAgICBjb21wLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICBjb21wLl9vYmpGbGFncyB8PSBJc1N0YXJ0Q2FsbGVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxudmFyIGludm9rZVVwZGF0ZSA9IENDX1NVUFBPUlRfSklUID9cclxuICAgIGNyZWF0ZUludm9rZUltcGwoJ2MudXBkYXRlKGR0KScsIHRydWUpIDpcclxuICAgIGNyZWF0ZUludm9rZUltcGwoZnVuY3Rpb24gKGMsIGR0KSB7XHJcbiAgICAgICAgICAgIGMudXBkYXRlKGR0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRydWUsXHJcbiAgICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICAgIGZ1bmN0aW9uIChpdGVyYXRvciwgZHQpIHtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuYXJyYXk7XHJcbiAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaXRlcmF0b3IuaV0udXBkYXRlKGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcbnZhciBpbnZva2VMYXRlVXBkYXRlID0gQ0NfU1VQUE9SVF9KSVQgP1xyXG4gICAgY3JlYXRlSW52b2tlSW1wbCgnYy5sYXRlVXBkYXRlKGR0KScsIHRydWUpIDpcclxuICAgIGNyZWF0ZUludm9rZUltcGwoZnVuY3Rpb24gKGMsIGR0KSB7XHJcbiAgICAgICAgICAgIGMubGF0ZVVwZGF0ZShkdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICBmdW5jdGlvbiAoaXRlcmF0b3IsIGR0KSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLmFycmF5O1xyXG4gICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2l0ZXJhdG9yLmldLmxhdGVVcGRhdGUoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuLyoqXHJcbiAqIFRoZSBNYW5hZ2VyIGZvciBDb21wb25lbnQncyBsaWZlLWN5Y2xlIG1ldGhvZHMuXHJcbiAqL1xyXG5mdW5jdGlvbiBjdG9yICgpIHtcclxuICAgIC8vIGludm9rZXJzXHJcbiAgICB0aGlzLnN0YXJ0SW52b2tlciA9IG5ldyBPbmVPZmZJbnZva2VyKGludm9rZVN0YXJ0KTtcclxuICAgIHRoaXMudXBkYXRlSW52b2tlciA9IG5ldyBSZXVzYWJsZUludm9rZXIoaW52b2tlVXBkYXRlKTtcclxuICAgIHRoaXMubGF0ZVVwZGF0ZUludm9rZXIgPSBuZXcgUmV1c2FibGVJbnZva2VyKGludm9rZUxhdGVVcGRhdGUpO1xyXG5cclxuICAgIC8vIGNvbXBvbmVudHMgZGVmZXJyZWQgdG8gbmV4dCBmcmFtZVxyXG4gICAgdGhpcy5fZGVmZXJyZWRDb21wcyA9IFtdO1xyXG5cclxuICAgIC8vIGR1cmluZyBhIGxvb3BcclxuICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XHJcbn1cclxudmFyIENvbXBvbmVudFNjaGVkdWxlciA9IGNjLkNsYXNzKHtcclxuICAgIGN0b3I6IGN0b3IsXHJcbiAgICB1bnNjaGVkdWxlQWxsOiBjdG9yLFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBMaWZlQ3ljbGVJbnZva2VyLFxyXG4gICAgICAgIE9uZU9mZkludm9rZXIsXHJcbiAgICAgICAgY3JlYXRlSW52b2tlSW1wbCxcclxuICAgICAgICBpbnZva2VPbkVuYWJsZTogQ0NfRURJVE9SID8gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBjb21wU2NoZWR1bGVyID0gY2MuZGlyZWN0b3IuX2NvbXBTY2hlZHVsZXI7XHJcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLmFycmF5O1xyXG4gICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb21wID0gYXJyYXlbaXRlcmF0b3IuaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcC5fZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxPbkVuYWJsZUluVHJ5Q2F0Y2goY29tcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlYWN0aXZhdGVkRHVyaW5nT25FbmFibGUgPSAhY29tcC5ub2RlLl9hY3RpdmVJbkhpZXJhcmNoeTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlYWN0aXZhdGVkRHVyaW5nT25FbmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcFNjaGVkdWxlci5fb25FbmFibGVkKGNvbXApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gOiBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcclxuICAgICAgICAgICAgdmFyIGNvbXBTY2hlZHVsZXIgPSBjYy5kaXJlY3Rvci5fY29tcFNjaGVkdWxlcjtcclxuICAgICAgICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuYXJyYXk7XHJcbiAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXAgPSBhcnJheVtpdGVyYXRvci5pXTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wLl9lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcC5vbkVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlID0gIWNvbXAubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBTY2hlZHVsZXIuX29uRW5hYmxlZChjb21wKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkVuYWJsZWQgKGNvbXApIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5yZXN1bWVUYXJnZXQoY29tcCk7XHJcbiAgICAgICAgY29tcC5fb2JqRmxhZ3MgfD0gSXNPbkVuYWJsZUNhbGxlZDtcclxuXHJcbiAgICAgICAgLy8gc2NoZWR1bGVcclxuICAgICAgICBpZiAodGhpcy5fdXBkYXRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVmZXJyZWRDb21wcy5wdXNoKGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVJbW1lZGlhdGUoY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25EaXNhYmxlZCAoY29tcCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnBhdXNlVGFyZ2V0KGNvbXApO1xyXG4gICAgICAgIGNvbXAuX29iakZsYWdzICY9IH5Jc09uRW5hYmxlQ2FsbGVkO1xyXG5cclxuICAgICAgICAvLyBjYW5jZWwgc2NoZWR1bGUgdGFza1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2RlZmVycmVkQ29tcHMuaW5kZXhPZihjb21wKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBqc0FycmF5LmZhc3RSZW1vdmVBdCh0aGlzLl9kZWZlcnJlZENvbXBzLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVuc2NoZWR1bGVcclxuICAgICAgICBpZiAoY29tcC5zdGFydCAmJiAhKGNvbXAuX29iakZsYWdzICYgSXNTdGFydENhbGxlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEludm9rZXIucmVtb3ZlKGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tcC51cGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnZva2VyLnJlbW92ZShjb21wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbXAubGF0ZVVwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhdGVVcGRhdGVJbnZva2VyLnJlbW92ZShjb21wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGVuYWJsZUNvbXA6IENDX0VESVRPUiA/IGZ1bmN0aW9uIChjb21wLCBpbnZva2VyKSB7XHJcbiAgICAgICAgaWYgKGNjLmVuZ2luZS5pc1BsYXlpbmcgfHwgY29tcC5jb25zdHJ1Y3Rvci5fZXhlY3V0ZUluRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKCEoY29tcC5fb2JqRmxhZ3MgJiBJc09uRW5hYmxlQ2FsbGVkKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXAub25FbmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2tlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZva2VyLmFkZChjb21wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlSW5FZGl0b3IoY29tcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxPbkVuYWJsZUluVHJ5Q2F0Y2goY29tcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSA9ICFjb21wLm5vZGUuX2FjdGl2ZUluSGllcmFyY2h5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25FbmFibGVkKGNvbXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuYWJsZUluRWRpdG9yKGNvbXApO1xyXG4gICAgfSA6IGZ1bmN0aW9uIChjb21wLCBpbnZva2VyKSB7XHJcbiAgICAgICAgaWYgKCEoY29tcC5fb2JqRmxhZ3MgJiBJc09uRW5hYmxlQ2FsbGVkKSkge1xyXG4gICAgICAgICAgICBpZiAoY29tcC5vbkVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludm9rZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnZva2VyLmFkZChjb21wKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wLm9uRW5hYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlID0gIWNvbXAubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlYWN0aXZhdGVkRHVyaW5nT25FbmFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9vbkVuYWJsZWQoY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBkaXNhYmxlQ29tcDogQ0NfRURJVE9SID8gZnVuY3Rpb24gKGNvbXApIHtcclxuICAgICAgICBpZiAoY2MuZW5naW5lLmlzUGxheWluZyB8fCBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRlSW5FZGl0TW9kZSkge1xyXG4gICAgICAgICAgICBpZiAoY29tcC5fb2JqRmxhZ3MgJiBJc09uRW5hYmxlQ2FsbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcC5vbkRpc2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsT25EaXNhYmxlSW5UcnlDYXRjaChjb21wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX29uRGlzYWJsZWQoY29tcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbXAuX29iakZsYWdzICYgSXNFZGl0b3JPbkVuYWJsZUNhbGxlZCkge1xyXG4gICAgICAgICAgICBjYy5lbmdpbmUuZW1pdCgnY29tcG9uZW50LWRpc2FibGVkJywgY29tcC51dWlkKTtcclxuICAgICAgICAgICAgY29tcC5fb2JqRmxhZ3MgJj0gfklzRWRpdG9yT25FbmFibGVDYWxsZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSA6IGZ1bmN0aW9uIChjb21wKSB7XHJcbiAgICAgICAgaWYgKGNvbXAuX29iakZsYWdzICYgSXNPbkVuYWJsZUNhbGxlZCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcC5vbkRpc2FibGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbXAub25EaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fb25EaXNhYmxlZChjb21wKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zY2hlZHVsZUltbWVkaWF0ZSAoY29tcCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29tcC5zdGFydCA9PT0gJ2Z1bmN0aW9uJyAmJiAhKGNvbXAuX29iakZsYWdzICYgSXNTdGFydENhbGxlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuYWRkKGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGNvbXAudXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW52b2tlci5hZGQoY29tcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgY29tcC5sYXRlVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF0ZVVwZGF0ZUludm9rZXIuYWRkKGNvbXApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2RlZmVycmVkU2NoZWR1bGUgKCkge1xyXG4gICAgICAgIHZhciBjb21wcyA9IHRoaXMuX2RlZmVycmVkQ29tcHM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvbXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlSW1tZWRpYXRlKGNvbXBzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcHMubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ2FsbCBuZXcgcmVnaXN0ZXJlZCBzdGFydCBzY2hlZHVsZSBpbW1lZGlhdGVseSBzaW5jZSBsYXN0IHRpbWUgc3RhcnQgcGhhc2UgY2FsbGluZyBpbiB0aGlzIGZyYW1lXHJcbiAgICAvLyBTZWUgY29jb3MtY3JlYXRvci8yZC10YXNrcy9pc3N1ZXMvMjU2XHJcbiAgICBfc3RhcnRGb3JOZXdDb21wcyAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlZmVycmVkQ29tcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZlcnJlZFNjaGVkdWxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJbnZva2VyLmludm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRQaGFzZSAoKSB7XHJcbiAgICAgICAgLy8gU3RhcnQgb2YgdGhpcyBmcmFtZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gY2FsbCBzdGFydFxyXG4gICAgICAgIHRoaXMuc3RhcnRJbnZva2VyLmludm9rZSgpO1xyXG5cclxuICAgICAgICAvLyBTdGFydCBjb21wb25lbnRzIG9mIG5ldyBhY3RpdmF0ZWQgbm9kZXMgZHVyaW5nIHN0YXJ0XHJcbiAgICAgICAgdGhpcy5fc3RhcnRGb3JOZXdDb21wcygpO1xyXG5cclxuICAgICAgICAvLyBpZiAoQ0NfUFJFVklFVykge1xyXG4gICAgICAgIC8vICAgICB0cnkge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuaW52b2tlKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIHByZXZlbnQgc3RhcnQgZnJvbSBnZXR0aW5nIGludG8gaW5maW5pdGUgbG9vcFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuX25lZy5hcnJheS5sZW5ndGggPSAwO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuX3plcm8uYXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRJbnZva2VyLl9wb3MuYXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAvLyAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRJbnZva2VyLmludm9rZSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUGhhc2UgKGR0KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnZva2VyLmludm9rZShkdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxhdGVVcGRhdGVQaGFzZSAoZHQpIHtcclxuICAgICAgICB0aGlzLmxhdGVVcGRhdGVJbnZva2VyLmludm9rZShkdCk7XHJcblxyXG4gICAgICAgIC8vIEVuZCBvZiB0aGlzIGZyYW1lXHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gU3RhcnQgY29tcG9uZW50cyBvZiBuZXcgYWN0aXZhdGVkIG5vZGVzIGR1cmluZyB1cGRhdGUgYW5kIGxhdGVVcGRhdGVcclxuICAgICAgICAvLyBUaGUgc3RhcnQgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIGltbWVkaWF0ZWx5LFxyXG4gICAgICAgIC8vIHVwZGF0ZSBhbmQgbGF0ZVVwZGF0ZSBjYWxsYmFjayB3aWxsIGJlIHJ1bm5pbmcgaW4gdGhlIG5leHQgZnJhbWVcclxuICAgICAgICB0aGlzLl9zdGFydEZvck5ld0NvbXBzKCk7XHJcbiAgICB9LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50U2NoZWR1bGVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==