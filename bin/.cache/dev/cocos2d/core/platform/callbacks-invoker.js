
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/callbacks-invoker.js';
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
var js = require('./js');

var fastRemoveAt = js.array.fastRemoveAt;

function empty() {}

function CallbackInfo() {
  this.callback = empty;
  this.target = undefined;
  this.once = false;
}

CallbackInfo.prototype.set = function (callback, target, once) {
  this.callback = callback;
  this.target = target;
  this.once = !!once;
};

var callbackInfoPool = new js.Pool(function (info) {
  info.callback = empty;
  info.target = undefined;
  info.once = false;
  return true;
}, 32);

callbackInfoPool.get = function () {
  return this._get() || new CallbackInfo();
};

function CallbackList() {
  this.callbackInfos = [];
  this.isInvoking = false;
  this.containCanceled = false;
}

var proto = CallbackList.prototype;
/**
 * !#zh
 * 从列表中移除与指定目标相同回调函数的事件。
 * @param cb
 */

proto.removeByCallback = function (cb) {
  for (var i = 0; i < this.callbackInfos.length; ++i) {
    var info = this.callbackInfos[i];

    if (info && info.callback === cb) {
      callbackInfoPool.put(info);
      fastRemoveAt(this.callbackInfos, i);
      --i;
    }
  }
};
/**
 * !#zh
 * 从列表中移除与指定目标相同调用者的事件。
 * @param target
 */


proto.removeByTarget = function (target) {
  for (var i = 0; i < this.callbackInfos.length; ++i) {
    var info = this.callbackInfos[i];

    if (info && info.target === target) {
      callbackInfoPool.put(info);
      fastRemoveAt(this.callbackInfos, i);
      --i;
    }
  }
};
/**
 * !#zh
 * 移除指定编号事件。
 *
 * @param index
 */


proto.cancel = function (index) {
  var info = this.callbackInfos[index];

  if (info) {
    callbackInfoPool.put(info);
    this.callbackInfos[index] = null;
  }

  this.containCanceled = true;
};
/**
 * !#zh
 * 注销所有事件。
 */


proto.cancelAll = function () {
  for (var i = 0; i < this.callbackInfos.length; i++) {
    var info = this.callbackInfos[i];

    if (info) {
      callbackInfoPool.put(info);
      this.callbackInfos[i] = null;
    }
  }

  this.containCanceled = true;
}; // filter all removed callbacks and compact array


proto.purgeCanceled = function () {
  for (var i = this.callbackInfos.length - 1; i >= 0; --i) {
    var info = this.callbackInfos[i];

    if (!info) {
      fastRemoveAt(this.callbackInfos, i);
    }
  }

  this.containCanceled = false;
};

proto.clear = function () {
  this.cancelAll();
  this.callbackInfos.length = 0;
  this.isInvoking = false;
  this.containCanceled = false;
};

var MAX_SIZE = 16;
var callbackListPool = new js.Pool(function (info) {
  info.callbackInfos = [];
  info.isInvoking = false;
  info.containCanceled = false;
  return true;
}, MAX_SIZE);

callbackListPool.get = function () {
  return this._get() || new CallbackList();
};
/**
 * !#en The callbacks invoker to handle and invoke callbacks by key.
 * !#zh CallbacksInvoker 用来根据 Key 管理并调用回调方法。
 * @class CallbacksInvoker
 */


function CallbacksInvoker() {
  this._callbackTable = js.createMap(true);
}

proto = CallbacksInvoker.prototype;
/**
 * !#zh
 * 事件添加管理
 *
 * @param key
 * @param callback
 * @param target
 * @param once
 */

proto.on = function (key, callback, target, once) {
  var list = this._callbackTable[key];

  if (!list) {
    list = this._callbackTable[key] = callbackListPool.get();
  }

  var info = callbackInfoPool.get();
  info.set(callback, target, once);
  list.callbackInfos.push(info);
};
/**
 *
 * !#zh
 * 检查指定事件是否已注册回调。
 *
 * !#en
 * Check if the specified key has any registered callback. If a callback is also specified,
 * it will only return true if the callback is registered.
 *
 * @method hasEventListener
 * @param {String} key
 * @param {Function} [callback]
 * @param {Object} [target]
 * @return {Boolean}
 */


proto.hasEventListener = function (key, callback, target) {
  var list = this._callbackTable[key];

  if (!list) {
    return false;
  } // check any valid callback


  var infos = list.callbackInfos;

  if (!callback) {
    // Make sure no cancelled callbacks
    if (list.isInvoking) {
      for (var i = 0; i < infos.length; ++i) {
        if (infos[i]) {
          return true;
        }
      }

      return false;
    } else {
      return infos.length > 0;
    }
  }

  for (var _i = 0; _i < infos.length; ++_i) {
    var info = infos[_i];

    if (info && info.callback === callback && info.target === target) {
      return true;
    }
  }

  return false;
};
/**
 * !#zh
 * 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
 *
 * !#en
 * Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
 * @method removeAll
 * @param {String|Object} keyOrTarget - The event key to be removed or the target to be removed
 */


proto.removeAll = function (keyOrTarget) {
  if (typeof keyOrTarget === 'string') {
    // remove by key
    var list = this._callbackTable[keyOrTarget];

    if (list) {
      if (list.isInvoking) {
        list.cancelAll();
      } else {
        list.clear();
        callbackListPool.put(list);
        delete this._callbackTable[keyOrTarget];
      }
    }
  } else if (keyOrTarget) {
    // remove by target
    for (var key in this._callbackTable) {
      var _list = this._callbackTable[key];

      if (_list.isInvoking) {
        var infos = _list.callbackInfos;

        for (var i = 0; i < infos.length; ++i) {
          var info = infos[i];

          if (info && info.target === keyOrTarget) {
            _list.cancel(i);
          }
        }
      } else {
        _list.removeByTarget(keyOrTarget);
      }
    }
  }
};
/**
 * !#zh
 * 删除之前与同类型，回调，目标注册的回调。
 *
 * @method off
 * @param {String} key
 * @param {Function} callback
 * @param {Object} [target]
 */


proto.off = function (key, callback, target) {
  var list = this._callbackTable[key];

  if (list) {
    var infos = list.callbackInfos;

    for (var i = 0; i < infos.length; ++i) {
      var info = infos[i];

      if (info && info.callback === callback && info.target === target) {
        if (list.isInvoking) {
          list.cancel(i);
        } else {
          fastRemoveAt(infos, i);
          callbackInfoPool.put(info);
        }

        break;
      }
    }
  }
};
/**
 * !#en
 * Trigger an event directly with the event name and necessary arguments.
 * !#zh
 * 通过事件名发送自定义事件
 *
 * @method emit
 * @param {String} key - event type
 * @param {*} [arg1] - First argument
 * @param {*} [arg2] - Second argument
 * @param {*} [arg3] - Third argument
 * @param {*} [arg4] - Fourth argument
 * @param {*} [arg5] - Fifth argument
 * @example
 *
 * eventTarget.emit('fire', event);
 * eventTarget.emit('fire', message, emitter);
 */


proto.emit = function (key, arg1, arg2, arg3, arg4, arg5) {
  var list = this._callbackTable[key];

  if (list) {
    var rootInvoker = !list.isInvoking;
    list.isInvoking = true;
    var infos = list.callbackInfos;

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];

      if (info) {
        var target = info.target;
        var callback = info.callback;

        if (info.once) {
          this.off(key, callback, target);
        }

        if (target) {
          callback.call(target, arg1, arg2, arg3, arg4, arg5);
        } else {
          callback(arg1, arg2, arg3, arg4, arg5);
        }
      }
    }

    if (rootInvoker) {
      list.isInvoking = false;

      if (list.containCanceled) {
        list.purgeCanceled();
      }
    }
  }
};

if (CC_TEST) {
  cc._Test.CallbacksInvoker = CallbacksInvoker;
}

module.exports = CallbacksInvoker;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxjYWxsYmFja3MtaW52b2tlci5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJmYXN0UmVtb3ZlQXQiLCJhcnJheSIsImVtcHR5IiwiQ2FsbGJhY2tJbmZvIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJ1bmRlZmluZWQiLCJvbmNlIiwicHJvdG90eXBlIiwic2V0IiwiY2FsbGJhY2tJbmZvUG9vbCIsIlBvb2wiLCJpbmZvIiwiZ2V0IiwiX2dldCIsIkNhbGxiYWNrTGlzdCIsImNhbGxiYWNrSW5mb3MiLCJpc0ludm9raW5nIiwiY29udGFpbkNhbmNlbGVkIiwicHJvdG8iLCJyZW1vdmVCeUNhbGxiYWNrIiwiY2IiLCJpIiwibGVuZ3RoIiwicHV0IiwicmVtb3ZlQnlUYXJnZXQiLCJjYW5jZWwiLCJpbmRleCIsImNhbmNlbEFsbCIsInB1cmdlQ2FuY2VsZWQiLCJjbGVhciIsIk1BWF9TSVpFIiwiY2FsbGJhY2tMaXN0UG9vbCIsIkNhbGxiYWNrc0ludm9rZXIiLCJfY2FsbGJhY2tUYWJsZSIsImNyZWF0ZU1hcCIsIm9uIiwia2V5IiwibGlzdCIsInB1c2giLCJoYXNFdmVudExpc3RlbmVyIiwiaW5mb3MiLCJyZW1vdmVBbGwiLCJrZXlPclRhcmdldCIsIm9mZiIsImVtaXQiLCJhcmcxIiwiYXJnMiIsImFyZzMiLCJhcmc0IiwiYXJnNSIsInJvb3RJbnZva2VyIiwibGVuIiwiY2FsbCIsIkNDX1RFU1QiLCJjYyIsIl9UZXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFB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QyxFQUE4Q0MsSUFBOUM7QUFDSCxTQUZELE1BR0s7QUFDRDlDLFVBQUFBLFFBQVEsQ0FBQzBDLElBQUQsRUFBT0MsSUFBUCxFQUFhQyxJQUFiLEVBQW1CQyxJQUFuQixFQUF5QkMsSUFBekIsQ0FBUjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxRQUFJQyxXQUFKLEVBQWlCO0FBQ2JiLE1BQUFBLElBQUksQ0FBQ3JCLFVBQUwsR0FBa0IsS0FBbEI7O0FBQ0EsVUFBSXFCLElBQUksQ0FBQ3BCLGVBQVQsRUFBMEI7QUFDdEJvQixRQUFBQSxJQUFJLENBQUNULGFBQUw7QUFDSDtBQUNKO0FBQ0o7QUFDSixDQWhDRDs7QUFrQ0EsSUFBSXlCLE9BQUosRUFBYTtBQUNUQyxFQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBU3ZCLGdCQUFULEdBQTRCQSxnQkFBNUI7QUFDSDs7QUFFRHdCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLGdCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi9qcycpO1xyXG5jb25zdCBmYXN0UmVtb3ZlQXQgPSBqcy5hcnJheS5mYXN0UmVtb3ZlQXQ7XHJcblxyXG5mdW5jdGlvbiBlbXB0eSAoKSB7fVxyXG5cclxuZnVuY3Rpb24gQ2FsbGJhY2tJbmZvICgpIHtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBlbXB0eTtcclxuICAgIHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5vbmNlID0gZmFsc2U7XHJcbn1cclxuXHJcbkNhbGxiYWNrSW5mby5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0YXJnZXQsIG9uY2UpIHtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgdGhpcy5vbmNlID0gISFvbmNlO1xyXG59O1xyXG5cclxubGV0IGNhbGxiYWNrSW5mb1Bvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAoaW5mbykge1xyXG4gICAgaW5mby5jYWxsYmFjayA9IGVtcHR5O1xyXG4gICAgaW5mby50YXJnZXQgPSB1bmRlZmluZWQ7XHJcbiAgICBpbmZvLm9uY2UgPSBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59LCAzMik7XHJcblxyXG5jYWxsYmFja0luZm9Qb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXQoKSB8fCBuZXcgQ2FsbGJhY2tJbmZvKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBDYWxsYmFja0xpc3QgKCkge1xyXG4gICAgdGhpcy5jYWxsYmFja0luZm9zID0gW107XHJcbiAgICB0aGlzLmlzSW52b2tpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XHJcbn1cclxuXHJcbmxldCBwcm90byA9IENhbGxiYWNrTGlzdC5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogISN6aFxyXG4gKiDku47liJfooajkuK3np7vpmaTkuI7mjIflrprnm67moIfnm7jlkIzlm57osIPlh73mlbDnmoTkuovku7bjgIJcclxuICogQHBhcmFtIGNiXHJcbiAqL1xyXG5wcm90by5yZW1vdmVCeUNhbGxiYWNrID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2ldO1xyXG4gICAgICAgIGlmIChpbmZvICYmIGluZm8uY2FsbGJhY2sgPT09IGNiKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xyXG4gICAgICAgICAgICBmYXN0UmVtb3ZlQXQodGhpcy5jYWxsYmFja0luZm9zLCBpKTtcclxuICAgICAgICAgICAgLS1pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIOS7juWIl+ihqOS4reenu+mZpOS4juaMh+Wumuebruagh+ebuOWQjOiwg+eUqOiAheeahOS6i+S7tuOAglxyXG4gKiBAcGFyYW0gdGFyZ2V0XHJcbiAqL1xyXG5wcm90by5yZW1vdmVCeVRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWxsYmFja0luZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpXTtcclxuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLnRhcmdldCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xyXG4gICAgICAgICAgICBmYXN0UmVtb3ZlQXQodGhpcy5jYWxsYmFja0luZm9zLCBpKTtcclxuICAgICAgICAgICAgLS1pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIOenu+mZpOaMh+Wumue8luWPt+S6i+S7tuOAglxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcbnByb3RvLmNhbmNlbCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpbmRleF07XHJcbiAgICBpZiAoaW5mbykge1xyXG4gICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tJbmZvc1tpbmRleF0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jb250YWluQ2FuY2VsZWQgPSB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjemhcclxuICog5rOo6ZSA5omA5pyJ5LqL5Lu244CCXHJcbiAqL1xyXG5wcm90by5jYW5jZWxBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmNhbGxiYWNrSW5mb3NbaV07XHJcbiAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tJbmZvc1tpXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5jb250YWluQ2FuY2VsZWQgPSB0cnVlO1xyXG59O1xyXG5cclxuLy8gZmlsdGVyIGFsbCByZW1vdmVkIGNhbGxiYWNrcyBhbmQgY29tcGFjdCBhcnJheVxyXG5wcm90by5wdXJnZUNhbmNlbGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmNhbGxiYWNrSW5mb3NbaV07XHJcbiAgICAgICAgaWYgKCFpbmZvKSB7XHJcbiAgICAgICAgICAgIGZhc3RSZW1vdmVBdCh0aGlzLmNhbGxiYWNrSW5mb3MsIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XHJcbn07XHJcblxyXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY2FuY2VsQWxsKCk7XHJcbiAgICB0aGlzLmNhbGxiYWNrSW5mb3MubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuaXNJbnZva2luZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb250YWluQ2FuY2VsZWQgPSBmYWxzZTtcclxufTtcclxuXHJcbmNvbnN0IE1BWF9TSVpFID0gMTY7XHJcbmxldCBjYWxsYmFja0xpc3RQb29sID0gbmV3IGpzLlBvb2woZnVuY3Rpb24gKGluZm8pIHtcclxuICAgIGluZm8uY2FsbGJhY2tJbmZvcyA9IFtdO1xyXG4gICAgaW5mby5pc0ludm9raW5nID0gZmFsc2U7XHJcbiAgICBpbmZvLmNvbnRhaW5DYW5jZWxlZCA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0sIE1BWF9TSVpFKTtcclxuXHJcbmNhbGxiYWNrTGlzdFBvb2wuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dldCgpIHx8IG5ldyBDYWxsYmFja0xpc3QoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBjYWxsYmFja3MgaW52b2tlciB0byBoYW5kbGUgYW5kIGludm9rZSBjYWxsYmFja3MgYnkga2V5LlxyXG4gKiAhI3poIENhbGxiYWNrc0ludm9rZXIg55So5p2l5qC55o2uIEtleSDnrqHnkIblubbosIPnlKjlm57osIPmlrnms5XjgIJcclxuICogQGNsYXNzIENhbGxiYWNrc0ludm9rZXJcclxuICovXHJcbmZ1bmN0aW9uIENhbGxiYWNrc0ludm9rZXIgKCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tUYWJsZSA9IGpzLmNyZWF0ZU1hcCh0cnVlKTtcclxufVxyXG5cclxucHJvdG8gPSBDYWxsYmFja3NJbnZva2VyLnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIOS6i+S7tua3u+WKoOeuoeeQhlxyXG4gKlxyXG4gKiBAcGFyYW0ga2V5XHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKiBAcGFyYW0gdGFyZ2V0XHJcbiAqIEBwYXJhbSBvbmNlXHJcbiAqL1xyXG5wcm90by5vbiA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrLCB0YXJnZXQsIG9uY2UpIHtcclxuICAgIGxldCBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVtrZXldO1xyXG4gICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XSA9IGNhbGxiYWNrTGlzdFBvb2wuZ2V0KCk7XHJcbiAgICB9XHJcbiAgICBsZXQgaW5mbyA9IGNhbGxiYWNrSW5mb1Bvb2wuZ2V0KCk7XHJcbiAgICBpbmZvLnNldChjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcclxuICAgIGxpc3QuY2FsbGJhY2tJbmZvcy5wdXNoKGluZm8pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqICEjemhcclxuICog5qOA5p+l5oyH5a6a5LqL5Lu25piv5ZCm5bey5rOo5YaM5Zue6LCD44CCXHJcbiAqXHJcbiAqICEjZW5cclxuICogQ2hlY2sgaWYgdGhlIHNwZWNpZmllZCBrZXkgaGFzIGFueSByZWdpc3RlcmVkIGNhbGxiYWNrLiBJZiBhIGNhbGxiYWNrIGlzIGFsc28gc3BlY2lmaWVkLFxyXG4gKiBpdCB3aWxsIG9ubHkgcmV0dXJuIHRydWUgaWYgdGhlIGNhbGxiYWNrIGlzIHJlZ2lzdGVyZWQuXHJcbiAqXHJcbiAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja11cclxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqL1xyXG5wcm90by5oYXNFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2ssIHRhcmdldCkge1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcclxuICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBhbnkgdmFsaWQgY2FsbGJhY2tcclxuICAgIGNvbnN0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xyXG4gICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBubyBjYW5jZWxsZWQgY2FsbGJhY2tzXHJcbiAgICAgICAgaWYgKGxpc3QuaXNJbnZva2luZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mb3NbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5mb3MubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcclxuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBpbmZvLnRhcmdldCA9PT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIOenu+mZpOWcqOeJueWumuS6i+S7tuexu+Wei+S4reazqOWGjOeahOaJgOacieWbnuiwg+aIluWcqOafkOS4quebruagh+S4reazqOWGjOeahOaJgOacieWbnuiwg+OAglxyXG4gKlxyXG4gKiAhI2VuXHJcbiAqIFJlbW92ZXMgYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIGEgY2VydGFpbiBldmVudCB0eXBlIG9yIGFsbCBjYWxsYmFja3MgcmVnaXN0ZXJlZCB3aXRoIGEgY2VydGFpbiB0YXJnZXRcclxuICogQG1ldGhvZCByZW1vdmVBbGxcclxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBrZXlPclRhcmdldCAtIFRoZSBldmVudCBrZXkgdG8gYmUgcmVtb3ZlZCBvciB0aGUgdGFyZ2V0IHRvIGJlIHJlbW92ZWRcclxuICovXHJcbnByb3RvLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChrZXlPclRhcmdldCkge1xyXG4gICAgaWYgKHR5cGVvZiBrZXlPclRhcmdldCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyByZW1vdmUgYnkga2V5XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5T3JUYXJnZXRdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmlzSW52b2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIGxpc3QuY2FuY2VsQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja0xpc3RQb29sLnB1dChsaXN0KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleU9yVGFyZ2V0XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGtleU9yVGFyZ2V0KSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGJ5IHRhcmdldFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2NhbGxiYWNrVGFibGUpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcclxuICAgICAgICAgICAgaWYgKGxpc3QuaXNJbnZva2luZykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8udGFyZ2V0ID09PSBrZXlPclRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmNhbmNlbChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUJ5VGFyZ2V0KGtleU9yVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI3poXHJcbiAqIOWIoOmZpOS5i+WJjeS4juWQjOexu+Wei++8jOWbnuiwg++8jOebruagh+azqOWGjOeahOWbnuiwg+OAglxyXG4gKlxyXG4gKiBAbWV0aG9kIG9mZlxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxyXG4gKi9cclxucHJvdG8ub2ZmID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2ssIHRhcmdldCkge1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcclxuICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XHJcbiAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8uY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGluZm8udGFyZ2V0ID09PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0LmlzSW52b2tpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LmNhbmNlbChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhc3RSZW1vdmVBdChpbmZvcywgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBUcmlnZ2VyIGFuIGV2ZW50IGRpcmVjdGx5IHdpdGggdGhlIGV2ZW50IG5hbWUgYW5kIG5lY2Vzc2FyeSBhcmd1bWVudHMuXHJcbiAqICEjemhcclxuICog6YCa6L+H5LqL5Lu25ZCN5Y+R6YCB6Ieq5a6a5LmJ5LqL5Lu2XHJcbiAqXHJcbiAqIEBtZXRob2QgZW1pdFxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gZXZlbnQgdHlwZVxyXG4gKiBAcGFyYW0geyp9IFthcmcxXSAtIEZpcnN0IGFyZ3VtZW50XHJcbiAqIEBwYXJhbSB7Kn0gW2FyZzJdIC0gU2Vjb25kIGFyZ3VtZW50XHJcbiAqIEBwYXJhbSB7Kn0gW2FyZzNdIC0gVGhpcmQgYXJndW1lbnRcclxuICogQHBhcmFtIHsqfSBbYXJnNF0gLSBGb3VydGggYXJndW1lbnRcclxuICogQHBhcmFtIHsqfSBbYXJnNV0gLSBGaWZ0aCBhcmd1bWVudFxyXG4gKiBAZXhhbXBsZVxyXG4gKlxyXG4gKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgZXZlbnQpO1xyXG4gKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgbWVzc2FnZSwgZW1pdHRlcik7XHJcbiAqL1xyXG5wcm90by5lbWl0ID0gZnVuY3Rpb24gKGtleSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcclxuICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgY29uc3Qgcm9vdEludm9rZXIgPSAhbGlzdC5pc0ludm9raW5nO1xyXG4gICAgICAgIGxpc3QuaXNJbnZva2luZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpbmZvcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XHJcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gaW5mby50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSBpbmZvLmNhbGxiYWNrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8ub25jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGtleSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocm9vdEludm9rZXIpIHtcclxuICAgICAgICAgICAgbGlzdC5pc0ludm9raW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmNvbnRhaW5DYW5jZWxlZCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXJnZUNhbmNlbGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAgY2MuX1Rlc3QuQ2FsbGJhY2tzSW52b2tlciA9IENhbGxiYWNrc0ludm9rZXI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FsbGJhY2tzSW52b2tlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=