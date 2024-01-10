
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCScheduler.js';
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
 * @module cc
 */
var js = require('./platform/js');

var IdGenerater = require('./platform/id-generater');

var MAX_POOL_SIZE = 20;
var idGenerater = new IdGenerater('Scheduler'); //data structures

/*
 * A list double-linked list used for "updates with priority"
 * @class ListEntry
 * @param {Object} target not retained (retained by hashUpdateEntry)
 * @param {Number} priority
 * @param {Boolean} paused
 * @param {Boolean} markedForDeletion selector will no longer be called and entry will be removed at end of the next tick
 */

var ListEntry = function ListEntry(target, priority, paused, markedForDeletion) {
  this.target = target;
  this.priority = priority;
  this.paused = paused;
  this.markedForDeletion = markedForDeletion;
};

var _listEntries = [];

ListEntry.get = function (target, priority, paused, markedForDeletion) {
  var result = _listEntries.pop();

  if (result) {
    result.target = target;
    result.priority = priority;
    result.paused = paused;
    result.markedForDeletion = markedForDeletion;
  } else {
    result = new ListEntry(target, priority, paused, markedForDeletion);
  }

  return result;
};

ListEntry.put = function (entry) {
  if (_listEntries.length < MAX_POOL_SIZE) {
    entry.target = null;

    _listEntries.push(entry);
  }
};
/*
 * A update entry list
 * @class HashUpdateEntry
 * @param {Array} list Which list does it belong to ?
 * @param {ListEntry} entry entry in the list
 * @param {Object} target hash key (retained)
 * @param {function} callback
 */


var HashUpdateEntry = function HashUpdateEntry(list, entry, target, callback) {
  this.list = list;
  this.entry = entry;
  this.target = target;
  this.callback = callback;
};

var _hashUpdateEntries = [];

HashUpdateEntry.get = function (list, entry, target, callback) {
  var result = _hashUpdateEntries.pop();

  if (result) {
    result.list = list;
    result.entry = entry;
    result.target = target;
    result.callback = callback;
  } else {
    result = new HashUpdateEntry(list, entry, target, callback);
  }

  return result;
};

HashUpdateEntry.put = function (entry) {
  if (_hashUpdateEntries.length < MAX_POOL_SIZE) {
    entry.list = entry.entry = entry.target = entry.callback = null;

    _hashUpdateEntries.push(entry);
  }
}; //

/*
 * Hash Element used for "selectors with interval"
 * @class HashTimerEntry
 * @param {Array} timers
 * @param {Object} target  hash key (retained)
 * @param {Number} timerIndex
 * @param {Timer} currentTimer
 * @param {Boolean} currentTimerSalvaged
 * @param {Boolean} paused
 */


var HashTimerEntry = function HashTimerEntry(timers, target, timerIndex, currentTimer, currentTimerSalvaged, paused) {
  var _t = this;

  _t.timers = timers;
  _t.target = target;
  _t.timerIndex = timerIndex;
  _t.currentTimer = currentTimer;
  _t.currentTimerSalvaged = currentTimerSalvaged;
  _t.paused = paused;
};

var _hashTimerEntries = [];

HashTimerEntry.get = function (timers, target, timerIndex, currentTimer, currentTimerSalvaged, paused) {
  var result = _hashTimerEntries.pop();

  if (result) {
    result.timers = timers;
    result.target = target;
    result.timerIndex = timerIndex;
    result.currentTimer = currentTimer;
    result.currentTimerSalvaged = currentTimerSalvaged;
    result.paused = paused;
  } else {
    result = new HashTimerEntry(timers, target, timerIndex, currentTimer, currentTimerSalvaged, paused);
  }

  return result;
};

HashTimerEntry.put = function (entry) {
  if (_hashTimerEntries.length < MAX_POOL_SIZE) {
    entry.timers = entry.target = entry.currentTimer = null;

    _hashTimerEntries.push(entry);
  }
};
/*
 * Light weight timer
 * @extends cc.Class
 */


function CallbackTimer() {
  this._lock = false;
  this._scheduler = null;
  this._elapsed = -1;
  this._runForever = false;
  this._useDelay = false;
  this._timesExecuted = 0;
  this._repeat = 0;
  this._delay = 0;
  this._interval = 0;
  this._target = null;
  this._callback = null;
}

var proto = CallbackTimer.prototype;

proto.initWithCallback = function (scheduler, callback, target, seconds, repeat, delay) {
  this._lock = false;
  this._scheduler = scheduler;
  this._target = target;
  this._callback = callback;
  this._elapsed = -1;
  this._interval = seconds;
  this._delay = delay;
  this._useDelay = this._delay > 0;
  this._repeat = repeat;
  this._runForever = this._repeat === cc.macro.REPEAT_FOREVER;
  return true;
};
/**
 * @return {Number} returns interval of timer
 */


proto.getInterval = function () {
  return this._interval;
};
/**
 * @param {Number} interval set interval in seconds
 */


proto.setInterval = function (interval) {
  this._interval = interval;
};
/**
 * triggers the timer
 * @param {Number} dt delta time
 */


proto.update = function (dt) {
  if (this._elapsed === -1) {
    this._elapsed = 0;
    this._timesExecuted = 0;
  } else {
    this._elapsed += dt;

    if (this._runForever && !this._useDelay) {
      //standard timer usage
      if (this._elapsed >= this._interval) {
        this.trigger();
        this._elapsed = 0;
      }
    } else {
      //advanced usage
      if (this._useDelay) {
        if (this._elapsed >= this._delay) {
          this.trigger();
          this._elapsed -= this._delay;
          this._timesExecuted += 1;
          this._useDelay = false;
        }
      } else {
        if (this._elapsed >= this._interval) {
          this.trigger();
          this._elapsed = 0;
          this._timesExecuted += 1;
        }
      }

      if (this._callback && !this._runForever && this._timesExecuted > this._repeat) this.cancel();
    }
  }
};

proto.getCallback = function () {
  return this._callback;
};

proto.trigger = function () {
  if (this._target && this._callback) {
    this._lock = true;

    this._callback.call(this._target, this._elapsed);

    this._lock = false;
  }
};

proto.cancel = function () {
  //override
  this._scheduler.unschedule(this._callback, this._target);
};

var _timers = [];

CallbackTimer.get = function () {
  return _timers.pop() || new CallbackTimer();
};

CallbackTimer.put = function (timer) {
  if (_timers.length < MAX_POOL_SIZE && !timer._lock) {
    timer._scheduler = timer._target = timer._callback = null;

    _timers.push(timer);
  }
};
/**
 * !#en
 * Scheduler is responsible of triggering the scheduled callbacks.<br/>
 * You should not use NSTimer. Instead use this class.<br/>
 * <br/>
 * There are 2 different types of callbacks (selectors):<br/>
 *     - update callback: the 'update' callback will be called every frame. You can customize the priority.<br/>
 *     - custom callback: A custom callback will be called every frame, or with a custom interval of time<br/>
 * <br/>
 * The 'custom selectors' should be avoided when possible. It is faster,
 * and consumes less memory to use the 'update callback'. *
 * !#zh
 * Scheduler 是负责触发回调函数的类。<br/>
 * 通常情况下，建议使用 cc.director.getScheduler() 来获取系统定时器。<br/>
 * 有两种不同类型的定时器：<br/>
 *     - update 定时器：每一帧都会触发。您可以自定义优先级。<br/>
 *     - 自定义定时器：自定义定时器可以每一帧或者自定义的时间间隔触发。<br/>
 * 如果希望每帧都触发，应该使用 update 定时器，使用 update 定时器更快，而且消耗更少的内存。
 *
 * @class Scheduler
 */


cc.Scheduler = function () {
  this._timeScale = 1.0;
  this._updatesNegList = []; // list of priority < 0

  this._updates0List = []; // list of priority == 0

  this._updatesPosList = []; // list of priority > 0

  this._hashForUpdates = js.createMap(true); // hash used to fetch quickly the list entries for pause, delete, etc

  this._hashForTimers = js.createMap(true); // Used for "selectors with interval"

  this._currentTarget = null;
  this._currentTargetSalvaged = false;
  this._updateHashLocked = false; // If true unschedule will not remove anything from a hash. Elements will only be marked for deletion.

  this._arrayForTimers = []; // Speed up indexing
  //this._arrayForUpdates = [];   // Speed up indexing
};

cc.Scheduler.prototype = {
  constructor: cc.Scheduler,
  //-----------------------private method----------------------
  _removeHashElement: function _removeHashElement(element) {
    delete this._hashForTimers[element.target._id];
    var arr = this._arrayForTimers;

    for (var i = 0, l = arr.length; i < l; i++) {
      if (arr[i] === element) {
        arr.splice(i, 1);
        break;
      }
    }

    HashTimerEntry.put(element);
  },
  _removeUpdateFromHash: function _removeUpdateFromHash(entry) {
    var targetId = entry.target._id;
    var self = this,
        element = self._hashForUpdates[targetId];

    if (element) {
      // Remove list entry from list
      var list = element.list,
          listEntry = element.entry;

      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i] === listEntry) {
          list.splice(i, 1);
          break;
        }
      }

      delete self._hashForUpdates[targetId];
      ListEntry.put(listEntry);
      HashUpdateEntry.put(element);
    }
  },
  _priorityIn: function _priorityIn(ppList, listElement, priority) {
    for (var i = 0; i < ppList.length; i++) {
      if (priority < ppList[i].priority) {
        ppList.splice(i, 0, listElement);
        return;
      }
    }

    ppList.push(listElement);
  },
  _appendIn: function _appendIn(ppList, listElement) {
    ppList.push(listElement);
  },
  //-----------------------public method-------------------------

  /**
   * !#en This method should be called for any target which needs to schedule tasks, and this method should be called before any scheduler API usage.
   * This method will add a `_id` property if it doesn't exist.
   * !#zh 任何需要用 Scheduler 管理任务的对象主体都应该调用这个方法，并且应该在调用任何 Scheduler API 之前调用这个方法。
   * 这个方法会给对象添加一个 `_id` 属性，如果这个属性不存在的话。
   * @method enableForTarget
   * @param {Object} target
   */
  enableForTarget: function enableForTarget(target) {
    if (!target._id) {
      if (target.__instanceId) {
        cc.warnID(1513);
      } else {
        target._id = idGenerater.getNewId();
      }
    }
  },

  /**
   * !#en
   * Modifies the time of all scheduled callbacks.<br/>
   * You can use this property to create a 'slow motion' or 'fast forward' effect.<br/>
   * Default is 1.0. To create a 'slow motion' effect, use values below 1.0.<br/>
   * To create a 'fast forward' effect, use values higher than 1.0.<br/>
   * Note：It will affect EVERY scheduled selector / action.
   * !#zh
   * 设置时间间隔的缩放比例。<br/>
   * 您可以使用这个方法来创建一个 “slow motion（慢动作）” 或 “fast forward（快进）” 的效果。<br/>
   * 默认是 1.0。要创建一个 “slow motion（慢动作）” 效果,使用值低于 1.0。<br/>
   * 要使用 “fast forward（快进）” 效果，使用值大于 1.0。<br/>
   * 注意：它影响该 Scheduler 下管理的所有定时器。
   * @method setTimeScale
   * @param {Number} timeScale
   */
  setTimeScale: function setTimeScale(timeScale) {
    this._timeScale = timeScale;
  },

  /**
   * !#en Returns time scale of scheduler.
   * !#zh 获取时间间隔的缩放比例。
   * @method getTimeScale
   * @return {Number}
   */
  getTimeScale: function getTimeScale() {
    return this._timeScale;
  },

  /**
   * !#en 'update' the scheduler. (You should NEVER call this method, unless you know what you are doing.)
   * !#zh update 调度函数。(不应该直接调用这个方法，除非完全了解这么做的结果)
   * @method update
   * @param {Number} dt delta time
   */
  update: function update(dt) {
    this._updateHashLocked = true;
    if (this._timeScale !== 1) dt *= this._timeScale;
    var i, list, len, entry;

    for (i = 0, list = this._updatesNegList, len = list.length; i < len; i++) {
      entry = list[i];
      if (!entry.paused && !entry.markedForDeletion) entry.target.update(dt);
    }

    for (i = 0, list = this._updates0List, len = list.length; i < len; i++) {
      entry = list[i];
      if (!entry.paused && !entry.markedForDeletion) entry.target.update(dt);
    }

    for (i = 0, list = this._updatesPosList, len = list.length; i < len; i++) {
      entry = list[i];
      if (!entry.paused && !entry.markedForDeletion) entry.target.update(dt);
    } // Iterate over all the custom selectors


    var elt,
        arr = this._arrayForTimers;

    for (i = 0; i < arr.length; i++) {
      elt = arr[i];
      this._currentTarget = elt;
      this._currentTargetSalvaged = false;

      if (!elt.paused) {
        // The 'timers' array may change while inside this loop
        for (elt.timerIndex = 0; elt.timerIndex < elt.timers.length; ++elt.timerIndex) {
          elt.currentTimer = elt.timers[elt.timerIndex];
          elt.currentTimerSalvaged = false;
          elt.currentTimer.update(dt);
          elt.currentTimer = null;
        }
      } // only delete currentTarget if no actions were scheduled during the cycle (issue #481)


      if (this._currentTargetSalvaged && this._currentTarget.timers.length === 0) {
        this._removeHashElement(this._currentTarget);

        --i;
      }
    } // delete all updates that are marked for deletion
    // updates with priority < 0


    for (i = 0, list = this._updatesNegList; i < list.length;) {
      entry = list[i];
      if (entry.markedForDeletion) this._removeUpdateFromHash(entry);else i++;
    }

    for (i = 0, list = this._updates0List; i < list.length;) {
      entry = list[i];
      if (entry.markedForDeletion) this._removeUpdateFromHash(entry);else i++;
    }

    for (i = 0, list = this._updatesPosList; i < list.length;) {
      entry = list[i];
      if (entry.markedForDeletion) this._removeUpdateFromHash(entry);else i++;
    }

    this._updateHashLocked = false;
    this._currentTarget = null;
  },

  /**
   * !#en
   * <p>
   *   The scheduled method will be called every 'interval' seconds.<br/>
   *   If paused is YES, then it won't be called until it is resumed.<br/>
   *   If 'interval' is 0, it will be called every frame, but if so, it recommended to use 'scheduleUpdateForTarget:' instead.<br/>
   *   If the callback function is already scheduled, then only the interval parameter will be updated without re-scheduling it again.<br/>
   *   repeat let the action be repeated repeat + 1 times, use cc.macro.REPEAT_FOREVER to let the action run continuously<br/>
   *   delay is the amount of time the action will wait before it'll start<br/>
   * </p>
   * !#zh
   * 指定回调函数，调用对象等信息来添加一个新的定时器。<br/>
   * 如果 paused 值为 true，那么直到 resume 被调用才开始计时。<br/>
   * 当时间间隔达到指定值时，设置的回调函数将会被调用。<br/>
   * 如果 interval 值为 0，那么回调函数每一帧都会被调用，但如果是这样，
   * 建议使用 scheduleUpdateForTarget 代替。<br/>
   * 如果回调函数已经被定时器使用，那么只会更新之前定时器的时间间隔参数，不会设置新的定时器。<br/>
   * repeat 值可以让定时器触发 repeat + 1 次，使用 cc.macro.REPEAT_FOREVER
   * 可以让定时器一直循环触发。<br/>
   * delay 值指定延迟时间，定时器会在延迟指定的时间之后开始计时。
   * @method schedule
   * @param {Function} callback
   * @param {Object} target
   * @param {Number} interval
   * @param {Number} [repeat=cc.macro.REPEAT_FOREVER]
   * @param {Number} [delay=0]
   * @param {Boolean} paused
   * @example {@link cocos2d/core/CCScheduler/schedule.js}
   * @typescript
   * schedule(callback: Function, target: any, interval: number, repeat: number, delay: number, paused?: boolean): void
   * schedule(callback: Function, target: any, interval: number, paused?: boolean): void
   */
  schedule: function schedule(callback, target, interval, repeat, delay, paused) {
    'use strict';

    if (typeof callback !== 'function') {
      var tmp = callback;
      callback = target;
      target = tmp;
    } //selector, target, interval, repeat, delay, paused
    //selector, target, interval, paused


    if (arguments.length === 4 || arguments.length === 5) {
      paused = !!repeat;
      repeat = cc.macro.REPEAT_FOREVER;
      delay = 0;
    }

    cc.assertID(target, 1502);
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    }

    var element = this._hashForTimers[targetId];

    if (!element) {
      // Is this the 1st element ? Then set the pause level to all the callback_fns of this target
      element = HashTimerEntry.get(null, target, 0, null, null, paused);

      this._arrayForTimers.push(element);

      this._hashForTimers[targetId] = element;
    } else if (element.paused !== paused) {
      cc.warnID(1511);
    }

    var timer, i;

    if (element.timers == null) {
      element.timers = [];
    } else {
      for (i = 0; i < element.timers.length; ++i) {
        timer = element.timers[i];

        if (timer && callback === timer._callback) {
          cc.logID(1507, timer.getInterval(), interval);
          timer._interval = interval;
          return;
        }
      }
    }

    timer = CallbackTimer.get();
    timer.initWithCallback(this, callback, target, interval, repeat, delay);
    element.timers.push(timer);

    if (this._currentTarget === element && this._currentTargetSalvaged) {
      this._currentTargetSalvaged = false;
    }
  },

  /**
   * !#en
   * Schedules the update callback for a given target,
   * During every frame after schedule started, the "update" function of target will be invoked.
   * !#zh
   * 使用指定的优先级为指定的对象设置 update 定时器。
   * update 定时器每一帧都会被触发，触发时自动调用指定对象的 "update" 函数。
   * 优先级的值越低，定时器被触发的越早。
   * @method scheduleUpdate
   * @param {Object} target
   * @param {Number} priority
   * @param {Boolean} paused
   */
  scheduleUpdate: function scheduleUpdate(target, priority, paused) {
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    }

    var hashElement = this._hashForUpdates[targetId];

    if (hashElement && hashElement.entry) {
      // check if priority has changed
      if (hashElement.entry.priority !== priority) {
        if (this._updateHashLocked) {
          cc.logID(1506);
          hashElement.entry.markedForDeletion = false;
          hashElement.entry.paused = paused;
          return;
        } else {
          // will be added again outside if (hashElement).
          this.unscheduleUpdate(target);
        }
      } else {
        hashElement.entry.markedForDeletion = false;
        hashElement.entry.paused = paused;
        return;
      }
    }

    var listElement = ListEntry.get(target, priority, paused, false);
    var ppList; // most of the updates are going to be 0, that's way there
    // is an special list for updates with priority 0

    if (priority === 0) {
      ppList = this._updates0List;

      this._appendIn(ppList, listElement);
    } else {
      ppList = priority < 0 ? this._updatesNegList : this._updatesPosList;

      this._priorityIn(ppList, listElement, priority);
    } //update hash entry for quick access


    this._hashForUpdates[targetId] = HashUpdateEntry.get(ppList, listElement, target, null);
  },

  /**
   * !#en
   * Unschedules a callback for a callback and a given target.
   * If you want to unschedule the "update", use `unscheduleUpdate()`
   * !#zh
   * 取消指定对象定时器。
   * 如果需要取消 update 定时器，请使用 unscheduleUpdate()。
   * @method unschedule
   * @param {Function} callback The callback to be unscheduled
   * @param {Object} target The target bound to the callback.
   */
  unschedule: function unschedule(callback, target) {
    //callback, target
    // explicity handle nil arguments when removing an object
    if (!target || !callback) return;
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    }

    var self = this,
        element = self._hashForTimers[targetId];

    if (element) {
      var timers = element.timers;

      for (var i = 0, li = timers.length; i < li; i++) {
        var timer = timers[i];

        if (callback === timer._callback) {
          if (timer === element.currentTimer && !element.currentTimerSalvaged) {
            element.currentTimerSalvaged = true;
          }

          timers.splice(i, 1);
          CallbackTimer.put(timer); //update timerIndex in case we are in tick;, looping over the actions

          if (element.timerIndex >= i) {
            element.timerIndex--;
          }

          if (timers.length === 0) {
            if (self._currentTarget === element) {
              self._currentTargetSalvaged = true;
            } else {
              self._removeHashElement(element);
            }
          }

          return;
        }
      }
    }
  },

  /**
   * !#en Unschedules the update callback for a given target.
   * !#zh 取消指定对象的 update 定时器。
   * @method unscheduleUpdate
   * @param {Object} target The target to be unscheduled.
   */
  unscheduleUpdate: function unscheduleUpdate(target) {
    if (!target) return;
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    }

    var element = this._hashForUpdates[targetId];

    if (element) {
      if (this._updateHashLocked) {
        element.entry.markedForDeletion = true;
      } else {
        this._removeUpdateFromHash(element.entry);
      }
    }
  },

  /**
   * !#en
   * Unschedules all scheduled callbacks for a given target.
   * This also includes the "update" callback.
   * !#zh 取消指定对象的所有定时器，包括 update 定时器。
   * @method unscheduleAllForTarget
   * @param {Object} target The target to be unscheduled.
   */
  unscheduleAllForTarget: function unscheduleAllForTarget(target) {
    // explicit nullptr handling
    if (!target) {
      return;
    }

    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    } // Custom Selectors


    var element = this._hashForTimers[targetId];

    if (element) {
      var timers = element.timers;

      if (timers.indexOf(element.currentTimer) > -1 && !element.currentTimerSalvaged) {
        element.currentTimerSalvaged = true;
      }

      for (var i = 0, l = timers.length; i < l; i++) {
        CallbackTimer.put(timers[i]);
      }

      timers.length = 0;

      if (this._currentTarget === element) {
        this._currentTargetSalvaged = true;
      } else {
        this._removeHashElement(element);
      }
    } // update selector


    this.unscheduleUpdate(target);
  },

  /**
   * !#en
   * Unschedules all scheduled callbacks from all targets including the system callbacks.<br/>
   * You should NEVER call this method, unless you know what you are doing.
   * !#zh
   * 取消所有对象的所有定时器，包括系统定时器。<br/>
   * 不要调用此函数，除非你确定你在做什么。
   * @method unscheduleAll
   */
  unscheduleAll: function unscheduleAll() {
    this.unscheduleAllWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
  },

  /**
   * !#en
   * Unschedules all callbacks from all targets with a minimum priority.<br/>
   * You should only call this with `PRIORITY_NON_SYSTEM_MIN` or higher.
   * !#zh
   * 取消所有优先级的值大于指定优先级的定时器。<br/>
   * 你应该只取消优先级的值大于 PRIORITY_NON_SYSTEM_MIN 的定时器。
   * @method unscheduleAllWithMinPriority
   * @param {Number} minPriority The minimum priority of selector to be unscheduled. Which means, all selectors which
   *        priority is higher than minPriority will be unscheduled.
   */
  unscheduleAllWithMinPriority: function unscheduleAllWithMinPriority(minPriority) {
    // Custom Selectors
    var i,
        element,
        arr = this._arrayForTimers;

    for (i = arr.length - 1; i >= 0; i--) {
      element = arr[i];
      this.unscheduleAllForTarget(element.target);
    } // Updates selectors


    var entry;
    var temp_length = 0;

    if (minPriority < 0) {
      for (i = 0; i < this._updatesNegList.length;) {
        temp_length = this._updatesNegList.length;
        entry = this._updatesNegList[i];
        if (entry && entry.priority >= minPriority) this.unscheduleUpdate(entry.target);
        if (temp_length == this._updatesNegList.length) i++;
      }
    }

    if (minPriority <= 0) {
      for (i = 0; i < this._updates0List.length;) {
        temp_length = this._updates0List.length;
        entry = this._updates0List[i];
        if (entry) this.unscheduleUpdate(entry.target);
        if (temp_length == this._updates0List.length) i++;
      }
    }

    for (i = 0; i < this._updatesPosList.length;) {
      temp_length = this._updatesPosList.length;
      entry = this._updatesPosList[i];
      if (entry && entry.priority >= minPriority) this.unscheduleUpdate(entry.target);
      if (temp_length == this._updatesPosList.length) i++;
    }
  },

  /**
   * !#en Checks whether a callback for a given target is scheduled.
   * !#zh 检查指定的回调函数和回调对象组合是否存在定时器。
   * @method isScheduled
   * @param {Function} callback The callback to check.
   * @param {Object} target The target of the callback.
   * @return {Boolean} True if the specified callback is invoked, false if not.
   */
  isScheduled: function isScheduled(callback, target) {
    //key, target
    //selector, target
    cc.assertID(callback, 1508);
    cc.assertID(target, 1509);
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    }

    var element = this._hashForTimers[targetId];

    if (!element) {
      return false;
    }

    if (element.timers == null) {
      return false;
    } else {
      var timers = element.timers;

      for (var i = 0; i < timers.length; ++i) {
        var timer = timers[i];

        if (callback === timer._callback) {
          return true;
        }
      }

      return false;
    }
  },

  /**
   * !#en
   * Pause all selectors from all targets.<br/>
   * You should NEVER call this method, unless you know what you are doing.
   * !#zh
   * 暂停所有对象的所有定时器。<br/>
   * 不要调用这个方法，除非你知道你正在做什么。
   * @method pauseAllTargets
   */
  pauseAllTargets: function pauseAllTargets() {
    return this.pauseAllTargetsWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM);
  },

  /**
   * !#en
   * Pause all selectors from all targets with a minimum priority. <br/>
   * You should only call this with kCCPriorityNonSystemMin or higher.
   * !#zh
   * 暂停所有优先级的值大于指定优先级的定时器。<br/>
   * 你应该只暂停优先级的值大于 PRIORITY_NON_SYSTEM_MIN 的定时器。
   * @method pauseAllTargetsWithMinPriority
   * @param {Number} minPriority
   */
  pauseAllTargetsWithMinPriority: function pauseAllTargetsWithMinPriority(minPriority) {
    var idsWithSelectors = [];
    var self = this,
        element,
        locArrayForTimers = self._arrayForTimers;
    var i, li; // Custom Selectors

    for (i = 0, li = locArrayForTimers.length; i < li; i++) {
      element = locArrayForTimers[i];

      if (element) {
        element.paused = true;
        idsWithSelectors.push(element.target);
      }
    }

    var entry;

    if (minPriority < 0) {
      for (i = 0; i < this._updatesNegList.length; i++) {
        entry = this._updatesNegList[i];

        if (entry) {
          if (entry.priority >= minPriority) {
            entry.paused = true;
            idsWithSelectors.push(entry.target);
          }
        }
      }
    }

    if (minPriority <= 0) {
      for (i = 0; i < this._updates0List.length; i++) {
        entry = this._updates0List[i];

        if (entry) {
          entry.paused = true;
          idsWithSelectors.push(entry.target);
        }
      }
    }

    for (i = 0; i < this._updatesPosList.length; i++) {
      entry = this._updatesPosList[i];

      if (entry) {
        if (entry.priority >= minPriority) {
          entry.paused = true;
          idsWithSelectors.push(entry.target);
        }
      }
    }

    return idsWithSelectors;
  },

  /**
   * !#en
   * Resume selectors on a set of targets.<br/>
   * This can be useful for undoing a call to pauseAllCallbacks.
   * !#zh
   * 恢复指定数组中所有对象的定时器。<br/>
   * 这个函数是 pauseAllCallbacks 的逆操作。
   * @method resumeTargets
   * @param {Array} targetsToResume
   */
  resumeTargets: function resumeTargets(targetsToResume) {
    if (!targetsToResume) return;

    for (var i = 0; i < targetsToResume.length; i++) {
      this.resumeTarget(targetsToResume[i]);
    }
  },

  /**
   * !#en
   * Pauses the target.<br/>
   * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.<br/>
   * If the target is not present, nothing happens.
   * !#zh
   * 暂停指定对象的定时器。<br/>
   * 指定对象的所有定时器都会被暂停。<br/>
   * 如果指定的对象没有定时器，什么也不会发生。
   * @method pauseTarget
   * @param {Object} target
   */
  pauseTarget: function pauseTarget(target) {
    cc.assertID(target, 1503);
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    } //customer selectors


    var self = this,
        element = self._hashForTimers[targetId];

    if (element) {
      element.paused = true;
    } //update callback


    var elementUpdate = self._hashForUpdates[targetId];

    if (elementUpdate) {
      elementUpdate.entry.paused = true;
    }
  },

  /**
   * !#en
   * Resumes the target.<br/>
   * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.<br/>
   * If the target is not present, nothing happens.
   * !#zh
   * 恢复指定对象的所有定时器。<br/>
   * 指定对象的所有定时器将继续工作。<br/>
   * 如果指定的对象没有定时器，什么也不会发生。
   * @method resumeTarget
   * @param {Object} target
   */
  resumeTarget: function resumeTarget(target) {
    cc.assertID(target, 1504);
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    } // custom selectors


    var self = this,
        element = self._hashForTimers[targetId];

    if (element) {
      element.paused = false;
    } //update callback


    var elementUpdate = self._hashForUpdates[targetId];

    if (elementUpdate) {
      elementUpdate.entry.paused = false;
    }
  },

  /**
   * !#en Returns whether or not the target is paused.
   * !#zh 返回指定对象的定时器是否暂停了。
   * @method isTargetPaused
   * @param {Object} target
   * @return {Boolean}
   */
  isTargetPaused: function isTargetPaused(target) {
    cc.assertID(target, 1505);
    var targetId = target._id;

    if (!targetId) {
      if (target.__instanceId) {
        cc.warnID(1513);
        targetId = target._id = target.__instanceId;
      } else {
        cc.errorID(1510);
      }
    } // Custom selectors


    var element = this._hashForTimers[targetId];

    if (element) {
      return element.paused;
    }

    var elementUpdate = this._hashForUpdates[targetId];

    if (elementUpdate) {
      return elementUpdate.entry.paused;
    }

    return false;
  }
};
/**
 * !#en Priority level reserved for system services.
 * !#zh 系统服务的优先级。
 * @property PRIORITY_SYSTEM
 * @type {Number}
 * @static
 */

cc.Scheduler.PRIORITY_SYSTEM = 1 << 31;
/**
 * !#en Minimum priority level for user scheduling.
 * !#zh 用户调度最低优先级。
 * @property PRIORITY_NON_SYSTEM
 * @type {Number}
 * @static
 */

cc.Scheduler.PRIORITY_NON_SYSTEM = cc.Scheduler.PRIORITY_SYSTEM + 1;
module.exports = cc.Scheduler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDU2NoZWR1bGVyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIklkR2VuZXJhdGVyIiwiTUFYX1BPT0xfU0laRSIsImlkR2VuZXJhdGVyIiwiTGlzdEVudHJ5IiwidGFyZ2V0IiwicHJpb3JpdHkiLCJwYXVzZWQiLCJtYXJrZWRGb3JEZWxldGlvbiIsIl9saXN0RW50cmllcyIsImdldCIsInJlc3VsdCIsInBvcCIsInB1dCIsImVudHJ5IiwibGVuZ3RoIiwicHVzaCIsIkhhc2hVcGRhdGVFbnRyeSIsImxpc3QiLCJjYWxsYmFjayIsIl9oYXNoVXBkYXRlRW50cmllcyIsIkhhc2hUaW1lckVudHJ5IiwidGltZXJzIiwidGltZXJJbmRleCIsImN1cnJlbnRUaW1lciIsImN1cnJlbnRUaW1lclNhbHZhZ2VkIiwiX3QiLCJfaGFzaFRpbWVyRW50cmllcyIsIkNhbGxiYWNrVGltZXIiLCJfbG9jayIsIl9zY2hlZHVsZXIiLCJfZWxhcHNlZCIsIl9ydW5Gb3JldmVyIiwiX3VzZURlbGF5IiwiX3RpbWVzRXhlY3V0ZWQiLCJfcmVwZWF0IiwiX2RlbGF5IiwiX2ludGVydmFsIiwiX3RhcmdldCIsIl9jYWxsYmFjayIsInByb3RvIiwicHJvdG90eXBlIiwiaW5pdFdpdGhDYWxsYmFjayIsInNjaGVkdWxlciIsInNlY29uZHMiLCJyZXBlYXQiLCJkZWxheSIsImNjIiwibWFjcm8iLCJSRVBFQVRfRk9SRVZFUiIsImdldEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJpbnRlcnZhbCIsInVwZGF0ZSIsImR0IiwidHJpZ2dlciIsImNhbmNlbCIsImdldENhbGxiYWNrIiwiY2FsbCIsInVuc2NoZWR1bGUiLCJfdGltZXJzIiwidGltZXIiLCJTY2hlZHVsZXIiLCJfdGltZVNjYWxlIiwiX3VwZGF0ZXNOZWdMaXN0IiwiX3VwZGF0ZXMwTGlzdCIsIl91cGRhdGVzUG9zTGlzdCIsIl9oYXNoRm9yVXBkYXRlcyIsImNyZWF0ZU1hcCIsIl9oYXNoRm9yVGltZXJzIiwiX2N1cnJlbnRUYXJnZXQiLCJfY3VycmVudFRhcmdldFNhbHZhZ2VkIiwiX3VwZGF0ZUhhc2hMb2NrZWQiLCJfYXJyYXlGb3JUaW1lcnMiLCJjb25zdHJ1Y3RvciIsIl9yZW1vdmVIYXNoRWxlbWVudCIsImVsZW1lbnQiLCJfaWQiLCJhcnIiLCJpIiwibCIsInNwbGljZSIsIl9yZW1vdmVVcGRhdGVGcm9tSGFzaCIsInRhcmdldElkIiwic2VsZiIsImxpc3RFbnRyeSIsIl9wcmlvcml0eUluIiwicHBMaXN0IiwibGlzdEVsZW1lbnQiLCJfYXBwZW5kSW4iLCJlbmFibGVGb3JUYXJnZXQiLCJfX2luc3RhbmNlSWQiLCJ3YXJuSUQiLCJnZXROZXdJZCIsInNldFRpbWVTY2FsZSIsInRpbWVTY2FsZSIsImdldFRpbWVTY2FsZSIsImxlbiIsImVsdCIsInNjaGVkdWxlIiwidG1wIiwiYXJndW1lbnRzIiwiYXNzZXJ0SUQiLCJlcnJvcklEIiwibG9nSUQiLCJzY2hlZHVsZVVwZGF0ZSIsImhhc2hFbGVtZW50IiwidW5zY2hlZHVsZVVwZGF0ZSIsImxpIiwidW5zY2hlZHVsZUFsbEZvclRhcmdldCIsImluZGV4T2YiLCJ1bnNjaGVkdWxlQWxsIiwidW5zY2hlZHVsZUFsbFdpdGhNaW5Qcmlvcml0eSIsIlBSSU9SSVRZX1NZU1RFTSIsIm1pblByaW9yaXR5IiwidGVtcF9sZW5ndGgiLCJpc1NjaGVkdWxlZCIsInBhdXNlQWxsVGFyZ2V0cyIsInBhdXNlQWxsVGFyZ2V0c1dpdGhNaW5Qcmlvcml0eSIsImlkc1dpdGhTZWxlY3RvcnMiLCJsb2NBcnJheUZvclRpbWVycyIsInJlc3VtZVRhcmdldHMiLCJ0YXJnZXRzVG9SZXN1bWUiLCJyZXN1bWVUYXJnZXQiLCJwYXVzZVRhcmdldCIsImVsZW1lbnRVcGRhdGUiLCJpc1RhcmdldFBhdXNlZCIsIlBSSU9SSVRZX05PTl9TWVNURU0iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7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RDVDLFFBQUFBLEVBQUUsQ0FBQ3dELE9BQUgsQ0FBVyxJQUFYO0FBQ0g7QUFDSixLQVg2QixDQWE5Qjs7O0FBQ0EsUUFBSTNCLE9BQU8sR0FBRyxLQUFLUCxjQUFMLENBQW9CYyxRQUFwQixDQUFkOztBQUNBLFFBQUlQLE9BQUosRUFBYTtBQUNULGFBQU9BLE9BQU8sQ0FBQ3JFLE1BQWY7QUFDSDs7QUFDRCxRQUFJc0gsYUFBYSxHQUFHLEtBQUsxRCxlQUFMLENBQXFCZ0IsUUFBckIsQ0FBcEI7O0FBQ0EsUUFBSTBDLGFBQUosRUFBbUI7QUFDZixhQUFPQSxhQUFhLENBQUMvRyxLQUFkLENBQW9CUCxNQUEzQjtBQUNIOztBQUNELFdBQU8sS0FBUDtBQUNIO0FBcHhCb0IsQ0FBekI7QUF1eEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBd0MsRUFBRSxDQUFDZSxTQUFILENBQWFtRCxlQUFiLEdBQStCLEtBQUssRUFBcEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQWxFLEVBQUUsQ0FBQ2UsU0FBSCxDQUFhaUUsbUJBQWIsR0FBbUNoRixFQUFFLENBQUNlLFNBQUgsQ0FBYW1ELGVBQWIsR0FBK0IsQ0FBbEU7QUFFQWUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEYsRUFBRSxDQUFDZSxTQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cbmNvbnN0IGpzID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9qcycpO1xuY29uc3QgSWRHZW5lcmF0ZXIgPSByZXF1aXJlKCcuL3BsYXRmb3JtL2lkLWdlbmVyYXRlcicpO1xuY29uc3QgTUFYX1BPT0xfU0laRSA9IDIwO1xuXG52YXIgaWRHZW5lcmF0ZXIgPSBuZXcgSWRHZW5lcmF0ZXIoJ1NjaGVkdWxlcicpO1xuXG4vL2RhdGEgc3RydWN0dXJlc1xuLypcbiAqIEEgbGlzdCBkb3VibGUtbGlua2VkIGxpc3QgdXNlZCBmb3IgXCJ1cGRhdGVzIHdpdGggcHJpb3JpdHlcIlxuICogQGNsYXNzIExpc3RFbnRyeVxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBub3QgcmV0YWluZWQgKHJldGFpbmVkIGJ5IGhhc2hVcGRhdGVFbnRyeSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBwcmlvcml0eVxuICogQHBhcmFtIHtCb29sZWFufSBwYXVzZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gbWFya2VkRm9yRGVsZXRpb24gc2VsZWN0b3Igd2lsbCBubyBsb25nZXIgYmUgY2FsbGVkIGFuZCBlbnRyeSB3aWxsIGJlIHJlbW92ZWQgYXQgZW5kIG9mIHRoZSBuZXh0IHRpY2tcbiAqL1xudmFyIExpc3RFbnRyeSA9IGZ1bmN0aW9uICh0YXJnZXQsIHByaW9yaXR5LCBwYXVzZWQsIG1hcmtlZEZvckRlbGV0aW9uKSB7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucGF1c2VkID0gcGF1c2VkO1xuICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSBtYXJrZWRGb3JEZWxldGlvbjtcbn07XG5cbnZhciBfbGlzdEVudHJpZXMgPSBbXTtcbkxpc3RFbnRyeS5nZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCBwcmlvcml0eSwgcGF1c2VkLCBtYXJrZWRGb3JEZWxldGlvbikge1xuICAgIHZhciByZXN1bHQgPSBfbGlzdEVudHJpZXMucG9wKCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICByZXN1bHQucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgcmVzdWx0LnBhdXNlZCA9IHBhdXNlZDtcbiAgICAgICAgcmVzdWx0Lm1hcmtlZEZvckRlbGV0aW9uID0gbWFya2VkRm9yRGVsZXRpb247XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBuZXcgTGlzdEVudHJ5KHRhcmdldCwgcHJpb3JpdHksIHBhdXNlZCwgbWFya2VkRm9yRGVsZXRpb24pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbkxpc3RFbnRyeS5wdXQgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICBpZiAoX2xpc3RFbnRyaWVzLmxlbmd0aCA8IE1BWF9QT09MX1NJWkUpIHtcbiAgICAgICAgZW50cnkudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgX2xpc3RFbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbn07XG5cbi8qXG4gKiBBIHVwZGF0ZSBlbnRyeSBsaXN0XG4gKiBAY2xhc3MgSGFzaFVwZGF0ZUVudHJ5XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFdoaWNoIGxpc3QgZG9lcyBpdCBiZWxvbmcgdG8gP1xuICogQHBhcmFtIHtMaXN0RW50cnl9IGVudHJ5IGVudHJ5IGluIHRoZSBsaXN0XG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IGhhc2gga2V5IChyZXRhaW5lZClcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbnZhciBIYXNoVXBkYXRlRW50cnkgPSBmdW5jdGlvbiAobGlzdCwgZW50cnksIHRhcmdldCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmxpc3QgPSBsaXN0O1xuICAgIHRoaXMuZW50cnkgPSBlbnRyeTtcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG59O1xudmFyIF9oYXNoVXBkYXRlRW50cmllcyA9IFtdO1xuSGFzaFVwZGF0ZUVudHJ5LmdldCA9IGZ1bmN0aW9uIChsaXN0LCBlbnRyeSwgdGFyZ2V0LCBjYWxsYmFjaykge1xuICAgIHZhciByZXN1bHQgPSBfaGFzaFVwZGF0ZUVudHJpZXMucG9wKCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQubGlzdCA9IGxpc3Q7XG4gICAgICAgIHJlc3VsdC5lbnRyeSA9IGVudHJ5O1xuICAgICAgICByZXN1bHQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICByZXN1bHQuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBIYXNoVXBkYXRlRW50cnkobGlzdCwgZW50cnksIHRhcmdldCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbkhhc2hVcGRhdGVFbnRyeS5wdXQgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICBpZiAoX2hhc2hVcGRhdGVFbnRyaWVzLmxlbmd0aCA8IE1BWF9QT09MX1NJWkUpIHtcbiAgICAgICAgZW50cnkubGlzdCA9IGVudHJ5LmVudHJ5ID0gZW50cnkudGFyZ2V0ID0gZW50cnkuY2FsbGJhY2sgPSBudWxsO1xuICAgICAgICBfaGFzaFVwZGF0ZUVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgfVxufTtcblxuLy9cbi8qXG4gKiBIYXNoIEVsZW1lbnQgdXNlZCBmb3IgXCJzZWxlY3RvcnMgd2l0aCBpbnRlcnZhbFwiXG4gKiBAY2xhc3MgSGFzaFRpbWVyRW50cnlcbiAqIEBwYXJhbSB7QXJyYXl9IHRpbWVyc1xuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAgaGFzaCBrZXkgKHJldGFpbmVkKVxuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVySW5kZXhcbiAqIEBwYXJhbSB7VGltZXJ9IGN1cnJlbnRUaW1lclxuICogQHBhcmFtIHtCb29sZWFufSBjdXJyZW50VGltZXJTYWx2YWdlZFxuICogQHBhcmFtIHtCb29sZWFufSBwYXVzZWRcbiAqL1xudmFyIEhhc2hUaW1lckVudHJ5ID0gZnVuY3Rpb24gKHRpbWVycywgdGFyZ2V0LCB0aW1lckluZGV4LCBjdXJyZW50VGltZXIsIGN1cnJlbnRUaW1lclNhbHZhZ2VkLCBwYXVzZWQpIHtcbiAgICB2YXIgX3QgPSB0aGlzO1xuICAgIF90LnRpbWVycyA9IHRpbWVycztcbiAgICBfdC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgX3QudGltZXJJbmRleCA9IHRpbWVySW5kZXg7XG4gICAgX3QuY3VycmVudFRpbWVyID0gY3VycmVudFRpbWVyO1xuICAgIF90LmN1cnJlbnRUaW1lclNhbHZhZ2VkID0gY3VycmVudFRpbWVyU2FsdmFnZWQ7XG4gICAgX3QucGF1c2VkID0gcGF1c2VkO1xufTtcbnZhciBfaGFzaFRpbWVyRW50cmllcyA9IFtdO1xuSGFzaFRpbWVyRW50cnkuZ2V0ID0gZnVuY3Rpb24gKHRpbWVycywgdGFyZ2V0LCB0aW1lckluZGV4LCBjdXJyZW50VGltZXIsIGN1cnJlbnRUaW1lclNhbHZhZ2VkLCBwYXVzZWQpIHtcbiAgICB2YXIgcmVzdWx0ID0gX2hhc2hUaW1lckVudHJpZXMucG9wKCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXN1bHQudGltZXJzID0gdGltZXJzO1xuICAgICAgICByZXN1bHQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICByZXN1bHQudGltZXJJbmRleCA9IHRpbWVySW5kZXg7XG4gICAgICAgIHJlc3VsdC5jdXJyZW50VGltZXIgPSBjdXJyZW50VGltZXI7XG4gICAgICAgIHJlc3VsdC5jdXJyZW50VGltZXJTYWx2YWdlZCA9IGN1cnJlbnRUaW1lclNhbHZhZ2VkO1xuICAgICAgICByZXN1bHQucGF1c2VkID0gcGF1c2VkO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEhhc2hUaW1lckVudHJ5KHRpbWVycywgdGFyZ2V0LCB0aW1lckluZGV4LCBjdXJyZW50VGltZXIsIGN1cnJlbnRUaW1lclNhbHZhZ2VkLCBwYXVzZWQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbkhhc2hUaW1lckVudHJ5LnB1dCA9IGZ1bmN0aW9uIChlbnRyeSkge1xuICAgIGlmIChfaGFzaFRpbWVyRW50cmllcy5sZW5ndGggPCBNQVhfUE9PTF9TSVpFKSB7XG4gICAgICAgIGVudHJ5LnRpbWVycyA9IGVudHJ5LnRhcmdldCA9IGVudHJ5LmN1cnJlbnRUaW1lciA9IG51bGw7XG4gICAgICAgIF9oYXNoVGltZXJFbnRyaWVzLnB1c2goZW50cnkpO1xuICAgIH1cbn07XG5cbi8qXG4gKiBMaWdodCB3ZWlnaHQgdGltZXJcbiAqIEBleHRlbmRzIGNjLkNsYXNzXG4gKi9cbmZ1bmN0aW9uIENhbGxiYWNrVGltZXIgKCkge1xuICAgIHRoaXMuX2xvY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9zY2hlZHVsZXIgPSBudWxsO1xuICAgIHRoaXMuX2VsYXBzZWQgPSAtMTtcbiAgICB0aGlzLl9ydW5Gb3JldmVyID0gZmFsc2U7XG4gICAgdGhpcy5fdXNlRGVsYXkgPSBmYWxzZTtcbiAgICB0aGlzLl90aW1lc0V4ZWN1dGVkID0gMDtcbiAgICB0aGlzLl9yZXBlYXQgPSAwO1xuICAgIHRoaXMuX2RlbGF5ID0gMDtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IDA7XG5cbiAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gQ2FsbGJhY2tUaW1lci5wcm90b3R5cGU7XG5cbnByb3RvLmluaXRXaXRoQ2FsbGJhY2sgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBjYWxsYmFjaywgdGFyZ2V0LCBzZWNvbmRzLCByZXBlYXQsIGRlbGF5KSB7XG4gICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgIHRoaXMuX3NjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIHRoaXMuX2VsYXBzZWQgPSAtMTtcbiAgICB0aGlzLl9pbnRlcnZhbCA9IHNlY29uZHM7XG4gICAgdGhpcy5fZGVsYXkgPSBkZWxheTtcbiAgICB0aGlzLl91c2VEZWxheSA9ICh0aGlzLl9kZWxheSA+IDApO1xuICAgIHRoaXMuX3JlcGVhdCA9IHJlcGVhdDtcbiAgICB0aGlzLl9ydW5Gb3JldmVyID0gKHRoaXMuX3JlcGVhdCA9PT0gY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogQHJldHVybiB7TnVtYmVyfSByZXR1cm5zIGludGVydmFsIG9mIHRpbWVyXG4gKi9cbnByb3RvLmdldEludGVydmFsID0gZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faW50ZXJ2YWw7fTtcbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIHNldCBpbnRlcnZhbCBpbiBzZWNvbmRzXG4gKi9cbnByb3RvLnNldEludGVydmFsID0gZnVuY3Rpb24oaW50ZXJ2YWwpe3RoaXMuX2ludGVydmFsID0gaW50ZXJ2YWw7fTtcblxuLyoqXG4gKiB0cmlnZ2VycyB0aGUgdGltZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdCBkZWx0YSB0aW1lXG4gKi9cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIChkdCkge1xuICAgIGlmICh0aGlzLl9lbGFwc2VkID09PSAtMSkge1xuICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5fdGltZXNFeGVjdXRlZCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZWxhcHNlZCArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMuX3J1bkZvcmV2ZXIgJiYgIXRoaXMuX3VzZURlbGF5KSB7Ly9zdGFuZGFyZCB0aW1lciB1c2FnZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2VsYXBzZWQgPj0gdGhpcy5faW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsvL2FkdmFuY2VkIHVzYWdlXG4gICAgICAgICAgICBpZiAodGhpcy5fdXNlRGVsYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxhcHNlZCA+PSB0aGlzLl9kZWxheSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGFwc2VkIC09IHRoaXMuX2RlbGF5O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90aW1lc0V4ZWN1dGVkICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZURlbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZWxhcHNlZCA+PSB0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGltZXNFeGVjdXRlZCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrICYmICF0aGlzLl9ydW5Gb3JldmVyICYmIHRoaXMuX3RpbWVzRXhlY3V0ZWQgPiB0aGlzLl9yZXBlYXQpXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnByb3RvLmdldENhbGxiYWNrID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2s7XG59O1xuXG5wcm90by50cmlnZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl90YXJnZXQgJiYgdGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fbG9jayA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrLmNhbGwodGhpcy5fdGFyZ2V0LCB0aGlzLl9lbGFwc2VkKTtcbiAgICAgICAgdGhpcy5fbG9jayA9IGZhbHNlO1xuICAgIH1cbn07XG5cbnByb3RvLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvL292ZXJyaWRlXG4gICAgdGhpcy5fc2NoZWR1bGVyLnVuc2NoZWR1bGUodGhpcy5fY2FsbGJhY2ssIHRoaXMuX3RhcmdldCk7XG59O1xuXG52YXIgX3RpbWVycyA9IFtdO1xuQ2FsbGJhY2tUaW1lci5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90aW1lcnMucG9wKCkgfHwgbmV3IENhbGxiYWNrVGltZXIoKTtcbn07XG5DYWxsYmFja1RpbWVyLnB1dCA9IGZ1bmN0aW9uICh0aW1lcikge1xuICAgIGlmIChfdGltZXJzLmxlbmd0aCA8IE1BWF9QT09MX1NJWkUgJiYgIXRpbWVyLl9sb2NrKSB7XG4gICAgICAgIHRpbWVyLl9zY2hlZHVsZXIgPSB0aW1lci5fdGFyZ2V0ID0gdGltZXIuX2NhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgX3RpbWVycy5wdXNoKHRpbWVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFNjaGVkdWxlciBpcyByZXNwb25zaWJsZSBvZiB0cmlnZ2VyaW5nIHRoZSBzY2hlZHVsZWQgY2FsbGJhY2tzLjxici8+XG4gKiBZb3Ugc2hvdWxkIG5vdCB1c2UgTlNUaW1lci4gSW5zdGVhZCB1c2UgdGhpcyBjbGFzcy48YnIvPlxuICogPGJyLz5cbiAqIFRoZXJlIGFyZSAyIGRpZmZlcmVudCB0eXBlcyBvZiBjYWxsYmFja3MgKHNlbGVjdG9ycyk6PGJyLz5cbiAqICAgICAtIHVwZGF0ZSBjYWxsYmFjazogdGhlICd1cGRhdGUnIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IGZyYW1lLiBZb3UgY2FuIGN1c3RvbWl6ZSB0aGUgcHJpb3JpdHkuPGJyLz5cbiAqICAgICAtIGN1c3RvbSBjYWxsYmFjazogQSBjdXN0b20gY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgZXZlcnkgZnJhbWUsIG9yIHdpdGggYSBjdXN0b20gaW50ZXJ2YWwgb2YgdGltZTxici8+XG4gKiA8YnIvPlxuICogVGhlICdjdXN0b20gc2VsZWN0b3JzJyBzaG91bGQgYmUgYXZvaWRlZCB3aGVuIHBvc3NpYmxlLiBJdCBpcyBmYXN0ZXIsXG4gKiBhbmQgY29uc3VtZXMgbGVzcyBtZW1vcnkgdG8gdXNlIHRoZSAndXBkYXRlIGNhbGxiYWNrJy4gKlxuICogISN6aFxuICogU2NoZWR1bGVyIOaYr+i0n+i0o+inpuWPkeWbnuiwg+WHveaVsOeahOexu+OAgjxici8+XG4gKiDpgJrluLjmg4XlhrXkuIvvvIzlu7rorq7kvb/nlKggY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkg5p2l6I635Y+W57O757uf5a6a5pe25Zmo44CCPGJyLz5cbiAqIOacieS4pOenjeS4jeWQjOexu+Wei+eahOWumuaXtuWZqO+8mjxici8+XG4gKiAgICAgLSB1cGRhdGUg5a6a5pe25Zmo77ya5q+P5LiA5bin6YO95Lya6Kem5Y+R44CC5oKo5Y+v5Lul6Ieq5a6a5LmJ5LyY5YWI57qn44CCPGJyLz5cbiAqICAgICAtIOiHquWumuS5ieWumuaXtuWZqO+8muiHquWumuS5ieWumuaXtuWZqOWPr+S7peavj+S4gOW4p+aIluiAheiHquWumuS5ieeahOaXtumXtOmXtOmalOinpuWPkeOAgjxici8+XG4gKiDlpoLmnpzluIzmnJvmr4/luKfpg73op6blj5HvvIzlupTor6Xkvb/nlKggdXBkYXRlIOWumuaXtuWZqO+8jOS9v+eUqCB1cGRhdGUg5a6a5pe25Zmo5pu05b+r77yM6ICM5LiU5raI6ICX5pu05bCR55qE5YaF5a2Y44CCXG4gKlxuICogQGNsYXNzIFNjaGVkdWxlclxuICovXG5jYy5TY2hlZHVsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdGltZVNjYWxlID0gMS4wO1xuICAgIHRoaXMuX3VwZGF0ZXNOZWdMaXN0ID0gW107ICAvLyBsaXN0IG9mIHByaW9yaXR5IDwgMFxuICAgIHRoaXMuX3VwZGF0ZXMwTGlzdCA9IFtdOyAgICAvLyBsaXN0IG9mIHByaW9yaXR5ID09IDBcbiAgICB0aGlzLl91cGRhdGVzUG9zTGlzdCA9IFtdOyAgLy8gbGlzdCBvZiBwcmlvcml0eSA+IDBcbiAgICB0aGlzLl9oYXNoRm9yVXBkYXRlcyA9IGpzLmNyZWF0ZU1hcCh0cnVlKTsgIC8vIGhhc2ggdXNlZCB0byBmZXRjaCBxdWlja2x5IHRoZSBsaXN0IGVudHJpZXMgZm9yIHBhdXNlLCBkZWxldGUsIGV0Y1xuICAgIHRoaXMuX2hhc2hGb3JUaW1lcnMgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7ICAgLy8gVXNlZCBmb3IgXCJzZWxlY3RvcnMgd2l0aCBpbnRlcnZhbFwiXG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldFNhbHZhZ2VkID0gZmFsc2U7XG4gICAgdGhpcy5fdXBkYXRlSGFzaExvY2tlZCA9IGZhbHNlOyAvLyBJZiB0cnVlIHVuc2NoZWR1bGUgd2lsbCBub3QgcmVtb3ZlIGFueXRoaW5nIGZyb20gYSBoYXNoLiBFbGVtZW50cyB3aWxsIG9ubHkgYmUgbWFya2VkIGZvciBkZWxldGlvbi5cblxuICAgIHRoaXMuX2FycmF5Rm9yVGltZXJzID0gW107ICAvLyBTcGVlZCB1cCBpbmRleGluZ1xuICAgIC8vdGhpcy5fYXJyYXlGb3JVcGRhdGVzID0gW107ICAgLy8gU3BlZWQgdXAgaW5kZXhpbmdcbn07XG5cbmNjLlNjaGVkdWxlci5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLlNjaGVkdWxlcixcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHJpdmF0ZSBtZXRob2QtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBfcmVtb3ZlSGFzaEVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9oYXNoRm9yVGltZXJzW2VsZW1lbnQudGFyZ2V0Ll9pZF07XG4gICAgICAgIHZhciBhcnIgPSB0aGlzLl9hcnJheUZvclRpbWVycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBIYXNoVGltZXJFbnRyeS5wdXQoZWxlbWVudCk7XG4gICAgfSxcblxuICAgIF9yZW1vdmVVcGRhdGVGcm9tSGFzaDogZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9IGVudHJ5LnRhcmdldC5faWQ7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgZWxlbWVudCA9IHNlbGYuX2hhc2hGb3JVcGRhdGVzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBsaXN0IGVudHJ5IGZyb20gbGlzdFxuICAgICAgICAgICAgdmFyIGxpc3QgPSBlbGVtZW50Lmxpc3QsIGxpc3RFbnRyeSA9IGVsZW1lbnQuZW50cnk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgc2VsZi5faGFzaEZvclVwZGF0ZXNbdGFyZ2V0SWRdO1xuICAgICAgICAgICAgTGlzdEVudHJ5LnB1dChsaXN0RW50cnkpO1xuICAgICAgICAgICAgSGFzaFVwZGF0ZUVudHJ5LnB1dChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcHJpb3JpdHlJbjogZnVuY3Rpb24gKHBwTGlzdCwgbGlzdEVsZW1lbnQsIHByaW9yaXR5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHBMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA8IHBwTGlzdFtpXS5wcmlvcml0eSkge1xuICAgICAgICAgICAgICAgIHBwTGlzdC5zcGxpY2UoaSwgMCwgbGlzdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcExpc3QucHVzaChsaXN0RWxlbWVudCk7XG4gICAgfSxcblxuICAgIF9hcHBlbmRJbjogZnVuY3Rpb24gKHBwTGlzdCwgbGlzdEVsZW1lbnQpIHtcbiAgICAgICAgcHBMaXN0LnB1c2gobGlzdEVsZW1lbnQpO1xuICAgIH0sXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tcHVibGljIG1ldGhvZC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgZm9yIGFueSB0YXJnZXQgd2hpY2ggbmVlZHMgdG8gc2NoZWR1bGUgdGFza3MsIGFuZCB0aGlzIG1ldGhvZCBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhbnkgc2NoZWR1bGVyIEFQSSB1c2FnZS5cbiAgICAgKiBUaGlzIG1ldGhvZCB3aWxsIGFkZCBhIGBfaWRgIHByb3BlcnR5IGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICogISN6aCDku7vkvZXpnIDopoHnlKggU2NoZWR1bGVyIOeuoeeQhuS7u+WKoeeahOWvueixoeS4u+S9k+mDveW6lOivpeiwg+eUqOi/meS4quaWueazle+8jOW5tuS4lOW6lOivpeWcqOiwg+eUqOS7u+S9lSBTY2hlZHVsZXIgQVBJIOS5i+WJjeiwg+eUqOi/meS4quaWueazleOAglxuICAgICAqIOi/meS4quaWueazleS8mue7meWvueixoea3u+WKoOS4gOS4qiBgX2lkYCDlsZ7mgKfvvIzlpoLmnpzov5nkuKrlsZ7mgKfkuI3lrZjlnKjnmoTor53jgIJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZUZvclRhcmdldFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICAgKi9cbiAgICBlbmFibGVGb3JUYXJnZXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQuX2lkKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Ll9faW5zdGFuY2VJZCkge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNTEzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC5faWQgPSBpZEdlbmVyYXRlci5nZXROZXdJZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBNb2RpZmllcyB0aGUgdGltZSBvZiBhbGwgc2NoZWR1bGVkIGNhbGxiYWNrcy48YnIvPlxuICAgICAqIFlvdSBjYW4gdXNlIHRoaXMgcHJvcGVydHkgdG8gY3JlYXRlIGEgJ3Nsb3cgbW90aW9uJyBvciAnZmFzdCBmb3J3YXJkJyBlZmZlY3QuPGJyLz5cbiAgICAgKiBEZWZhdWx0IGlzIDEuMC4gVG8gY3JlYXRlIGEgJ3Nsb3cgbW90aW9uJyBlZmZlY3QsIHVzZSB2YWx1ZXMgYmVsb3cgMS4wLjxici8+XG4gICAgICogVG8gY3JlYXRlIGEgJ2Zhc3QgZm9yd2FyZCcgZWZmZWN0LCB1c2UgdmFsdWVzIGhpZ2hlciB0aGFuIDEuMC48YnIvPlxuICAgICAqIE5vdGXvvJpJdCB3aWxsIGFmZmVjdCBFVkVSWSBzY2hlZHVsZWQgc2VsZWN0b3IgLyBhY3Rpb24uXG4gICAgICogISN6aFxuICAgICAqIOiuvue9ruaXtumXtOmXtOmalOeahOe8qeaUvuavlOS+i+OAgjxici8+XG4gICAgICog5oKo5Y+v5Lul5L2/55So6L+Z5Liq5pa55rOV5p2l5Yib5bu65LiA5LiqIOKAnHNsb3cgbW90aW9u77yI5oWi5Yqo5L2c77yJ4oCdIOaIliDigJxmYXN0IGZvcndhcmTvvIjlv6vov5vvvInigJ0g55qE5pWI5p6c44CCPGJyLz5cbiAgICAgKiDpu5jorqTmmK8gMS4w44CC6KaB5Yib5bu65LiA5LiqIOKAnHNsb3cgbW90aW9u77yI5oWi5Yqo5L2c77yJ4oCdIOaViOaenCzkvb/nlKjlgLzkvY7kuo4gMS4w44CCPGJyLz5cbiAgICAgKiDopoHkvb/nlKgg4oCcZmFzdCBmb3J3YXJk77yI5b+r6L+b77yJ4oCdIOaViOaenO+8jOS9v+eUqOWAvOWkp+S6jiAxLjDjgII8YnIvPlxuICAgICAqIOazqOaEj++8muWug+W9seWTjeivpSBTY2hlZHVsZXIg5LiL566h55CG55qE5omA5pyJ5a6a5pe25Zmo44CCXG4gICAgICogQG1ldGhvZCBzZXRUaW1lU2NhbGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZVNjYWxlXG4gICAgICovXG4gICAgc2V0VGltZVNjYWxlOiBmdW5jdGlvbiAodGltZVNjYWxlKSB7XG4gICAgICAgIHRoaXMuX3RpbWVTY2FsZSA9IHRpbWVTY2FsZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRpbWUgc2NhbGUgb2Ygc2NoZWR1bGVyLlxuICAgICAqICEjemgg6I635Y+W5pe26Ze06Ze06ZqU55qE57yp5pS+5q+U5L6L44CCXG4gICAgICogQG1ldGhvZCBnZXRUaW1lU2NhbGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VGltZVNjYWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lU2NhbGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gJ3VwZGF0ZScgdGhlIHNjaGVkdWxlci4gKFlvdSBzaG91bGQgTkVWRVIgY2FsbCB0aGlzIG1ldGhvZCwgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4pXG4gICAgICogISN6aCB1cGRhdGUg6LCD5bqm5Ye95pWw44CCKOS4jeW6lOivpeebtOaOpeiwg+eUqOi/meS4quaWueazle+8jOmZpOmdnuWujOWFqOS6huino+i/meS5iOWBmueahOe7k+aenClcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkdCBkZWx0YSB0aW1lXG4gICAgICovXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlSGFzaExvY2tlZCA9IHRydWU7XG4gICAgICAgIGlmKHRoaXMuX3RpbWVTY2FsZSAhPT0gMSlcbiAgICAgICAgICAgIGR0ICo9IHRoaXMuX3RpbWVTY2FsZTtcblxuICAgICAgICB2YXIgaSwgbGlzdCwgbGVuLCBlbnRyeTtcblxuICAgICAgICBmb3IoaT0wLGxpc3Q9dGhpcy5fdXBkYXRlc05lZ0xpc3QsIGxlbiA9IGxpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgICAgIGVudHJ5ID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmICghZW50cnkucGF1c2VkICYmICFlbnRyeS5tYXJrZWRGb3JEZWxldGlvbilcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQudXBkYXRlKGR0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpPTAsIGxpc3Q9dGhpcy5fdXBkYXRlczBMaXN0LCBsZW49bGlzdC5sZW5ndGg7IGk8bGVuOyBpKyspe1xuICAgICAgICAgICAgZW50cnkgPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKCFlbnRyeS5wYXVzZWQgJiYgIWVudHJ5Lm1hcmtlZEZvckRlbGV0aW9uKVxuICAgICAgICAgICAgICAgIGVudHJ5LnRhcmdldC51cGRhdGUoZHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGk9MCwgbGlzdD10aGlzLl91cGRhdGVzUG9zTGlzdCwgbGVuPWxpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgICAgIGVudHJ5ID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmICghZW50cnkucGF1c2VkICYmICFlbnRyeS5tYXJrZWRGb3JEZWxldGlvbilcbiAgICAgICAgICAgICAgICBlbnRyeS50YXJnZXQudXBkYXRlKGR0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIGN1c3RvbSBzZWxlY3RvcnNcbiAgICAgICAgdmFyIGVsdCwgYXJyID0gdGhpcy5fYXJyYXlGb3JUaW1lcnM7XG4gICAgICAgIGZvcihpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGVsdCA9IGFycltpXTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBlbHQ7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0U2FsdmFnZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCFlbHQucGF1c2VkKXtcbiAgICAgICAgICAgICAgICAvLyBUaGUgJ3RpbWVycycgYXJyYXkgbWF5IGNoYW5nZSB3aGlsZSBpbnNpZGUgdGhpcyBsb29wXG4gICAgICAgICAgICAgICAgZm9yIChlbHQudGltZXJJbmRleCA9IDA7IGVsdC50aW1lckluZGV4IDwgZWx0LnRpbWVycy5sZW5ndGg7ICsrKGVsdC50aW1lckluZGV4KSl7XG4gICAgICAgICAgICAgICAgICAgIGVsdC5jdXJyZW50VGltZXIgPSBlbHQudGltZXJzW2VsdC50aW1lckluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgZWx0LmN1cnJlbnRUaW1lclNhbHZhZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgZWx0LmN1cnJlbnRUaW1lci51cGRhdGUoZHQpO1xuICAgICAgICAgICAgICAgICAgICBlbHQuY3VycmVudFRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgZGVsZXRlIGN1cnJlbnRUYXJnZXQgaWYgbm8gYWN0aW9ucyB3ZXJlIHNjaGVkdWxlZCBkdXJpbmcgdGhlIGN5Y2xlIChpc3N1ZSAjNDgxKVxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXRTYWx2YWdlZCAmJiB0aGlzLl9jdXJyZW50VGFyZ2V0LnRpbWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVIYXNoRWxlbWVudCh0aGlzLl9jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWxldGUgYWxsIHVwZGF0ZXMgdGhhdCBhcmUgbWFya2VkIGZvciBkZWxldGlvblxuICAgICAgICAvLyB1cGRhdGVzIHdpdGggcHJpb3JpdHkgPCAwXG4gICAgICAgIGZvcihpPTAsbGlzdD10aGlzLl91cGRhdGVzTmVnTGlzdDsgaTxsaXN0Lmxlbmd0aDsgKXtcbiAgICAgICAgICAgIGVudHJ5ID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmKGVudHJ5Lm1hcmtlZEZvckRlbGV0aW9uKVxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVVwZGF0ZUZyb21IYXNoKGVudHJ5KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaT0wLCBsaXN0PXRoaXMuX3VwZGF0ZXMwTGlzdDsgaTxsaXN0Lmxlbmd0aDsgKXtcbiAgICAgICAgICAgIGVudHJ5ID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChlbnRyeS5tYXJrZWRGb3JEZWxldGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVVcGRhdGVGcm9tSGFzaChlbnRyeSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGk9MCwgbGlzdD10aGlzLl91cGRhdGVzUG9zTGlzdDsgaTxsaXN0Lmxlbmd0aDsgKXtcbiAgICAgICAgICAgIGVudHJ5ID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChlbnRyeS5tYXJrZWRGb3JEZWxldGlvbilcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVVcGRhdGVGcm9tSGFzaChlbnRyeSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlSGFzaExvY2tlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIDxwPlxuICAgICAqICAgVGhlIHNjaGVkdWxlZCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgZXZlcnkgJ2ludGVydmFsJyBzZWNvbmRzLjxici8+XG4gICAgICogICBJZiBwYXVzZWQgaXMgWUVTLCB0aGVuIGl0IHdvbid0IGJlIGNhbGxlZCB1bnRpbCBpdCBpcyByZXN1bWVkLjxici8+XG4gICAgICogICBJZiAnaW50ZXJ2YWwnIGlzIDAsIGl0IHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IGZyYW1lLCBidXQgaWYgc28sIGl0IHJlY29tbWVuZGVkIHRvIHVzZSAnc2NoZWR1bGVVcGRhdGVGb3JUYXJnZXQ6JyBpbnN0ZWFkLjxici8+XG4gICAgICogICBJZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaXMgYWxyZWFkeSBzY2hlZHVsZWQsIHRoZW4gb25seSB0aGUgaW50ZXJ2YWwgcGFyYW1ldGVyIHdpbGwgYmUgdXBkYXRlZCB3aXRob3V0IHJlLXNjaGVkdWxpbmcgaXQgYWdhaW4uPGJyLz5cbiAgICAgKiAgIHJlcGVhdCBsZXQgdGhlIGFjdGlvbiBiZSByZXBlYXRlZCByZXBlYXQgKyAxIHRpbWVzLCB1c2UgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIgdG8gbGV0IHRoZSBhY3Rpb24gcnVuIGNvbnRpbnVvdXNseTxici8+XG4gICAgICogICBkZWxheSBpcyB0aGUgYW1vdW50IG9mIHRpbWUgdGhlIGFjdGlvbiB3aWxsIHdhaXQgYmVmb3JlIGl0J2xsIHN0YXJ0PGJyLz5cbiAgICAgKiA8L3A+XG4gICAgICogISN6aFxuICAgICAqIOaMh+WumuWbnuiwg+WHveaVsO+8jOiwg+eUqOWvueixoeetieS/oeaBr+adpea3u+WKoOS4gOS4quaWsOeahOWumuaXtuWZqOOAgjxici8+XG4gICAgICog5aaC5p6cIHBhdXNlZCDlgLzkuLogdHJ1Ze+8jOmCo+S5iOebtOWIsCByZXN1bWUg6KKr6LCD55So5omN5byA5aeL6K6h5pe244CCPGJyLz5cbiAgICAgKiDlvZPml7bpl7Tpl7TpmpTovr7liLDmjIflrprlgLzml7bvvIzorr7nva7nmoTlm57osIPlh73mlbDlsIbkvJrooqvosIPnlKjjgII8YnIvPlxuICAgICAqIOWmguaenCBpbnRlcnZhbCDlgLzkuLogMO+8jOmCo+S5iOWbnuiwg+WHveaVsOavj+S4gOW4p+mDveS8muiiq+iwg+eUqO+8jOS9huWmguaenOaYr+i/meagt++8jFxuICAgICAqIOW7uuiuruS9v+eUqCBzY2hlZHVsZVVwZGF0ZUZvclRhcmdldCDku6Pmm7/jgII8YnIvPlxuICAgICAqIOWmguaenOWbnuiwg+WHveaVsOW3sue7j+iiq+WumuaXtuWZqOS9v+eUqO+8jOmCo+S5iOWPquS8muabtOaWsOS5i+WJjeWumuaXtuWZqOeahOaXtumXtOmXtOmalOWPguaVsO+8jOS4jeS8muiuvue9ruaWsOeahOWumuaXtuWZqOOAgjxici8+XG4gICAgICogcmVwZWF0IOWAvOWPr+S7peiuqeWumuaXtuWZqOinpuWPkSByZXBlYXQgKyAxIOasoe+8jOS9v+eUqCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUlxuICAgICAqIOWPr+S7peiuqeWumuaXtuWZqOS4gOebtOW+queOr+inpuWPkeOAgjxici8+XG4gICAgICogZGVsYXkg5YC85oyH5a6a5bu26L+f5pe26Ze077yM5a6a5pe25Zmo5Lya5Zyo5bu26L+f5oyH5a6a55qE5pe26Ze05LmL5ZCO5byA5aeL6K6h5pe244CCXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbcmVwZWF0PWNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsYXk9MF1cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBhdXNlZFxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvQ0NTY2hlZHVsZXIvc2NoZWR1bGUuanN9XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzY2hlZHVsZShjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55LCBpbnRlcnZhbDogbnVtYmVyLCByZXBlYXQ6IG51bWJlciwgZGVsYXk6IG51bWJlciwgcGF1c2VkPzogYm9vbGVhbik6IHZvaWRcbiAgICAgKiBzY2hlZHVsZShjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55LCBpbnRlcnZhbDogbnVtYmVyLCBwYXVzZWQ/OiBib29sZWFuKTogdm9pZFxuICAgICAqL1xuICAgIHNjaGVkdWxlOiBmdW5jdGlvbiAoY2FsbGJhY2ssIHRhcmdldCwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXksIHBhdXNlZCkge1xuICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGFyZ2V0ID0gdG1wO1xuICAgICAgICB9XG4gICAgICAgIC8vc2VsZWN0b3IsIHRhcmdldCwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXksIHBhdXNlZFxuICAgICAgICAvL3NlbGVjdG9yLCB0YXJnZXQsIGludGVydmFsLCBwYXVzZWRcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgcGF1c2VkID0gISFyZXBlYXQ7XG4gICAgICAgICAgICByZXBlYXQgPSBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUjtcbiAgICAgICAgICAgIGRlbGF5ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmFzc2VydElEKHRhcmdldCwgMTUwMik7XG5cbiAgICAgICAgdmFyIHRhcmdldElkID0gdGFyZ2V0Ll9pZDtcbiAgICAgICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5fX2luc3RhbmNlSWQpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTUxMyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQuX2lkID0gdGFyZ2V0Ll9faW5zdGFuY2VJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTUxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoRm9yVGltZXJzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBJcyB0aGlzIHRoZSAxc3QgZWxlbWVudCA/IFRoZW4gc2V0IHRoZSBwYXVzZSBsZXZlbCB0byBhbGwgdGhlIGNhbGxiYWNrX2ZucyBvZiB0aGlzIHRhcmdldFxuICAgICAgICAgICAgZWxlbWVudCA9IEhhc2hUaW1lckVudHJ5LmdldChudWxsLCB0YXJnZXQsIDAsIG51bGwsIG51bGwsIHBhdXNlZCk7XG4gICAgICAgICAgICB0aGlzLl9hcnJheUZvclRpbWVycy5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5faGFzaEZvclRpbWVyc1t0YXJnZXRJZF0gPSBlbGVtZW50O1xuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQucGF1c2VkICE9PSBwYXVzZWQpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNTExKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aW1lciwgaTtcbiAgICAgICAgaWYgKGVsZW1lbnQudGltZXJzID09IG51bGwpIHtcbiAgICAgICAgICAgIGVsZW1lbnQudGltZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbWVudC50aW1lcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aW1lciA9IGVsZW1lbnQudGltZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lciAmJiBjYWxsYmFjayA9PT0gdGltZXIuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDE1MDcsIHRpbWVyLmdldEludGVydmFsKCksIGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZXIuX2ludGVydmFsID0gaW50ZXJ2YWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IENhbGxiYWNrVGltZXIuZ2V0KCk7XG4gICAgICAgIHRpbWVyLmluaXRXaXRoQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssIHRhcmdldCwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXkpO1xuICAgICAgICBlbGVtZW50LnRpbWVycy5wdXNoKHRpbWVyKTtcblxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFRhcmdldCA9PT0gZWxlbWVudCAmJiB0aGlzLl9jdXJyZW50VGFyZ2V0U2FsdmFnZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXRTYWx2YWdlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTY2hlZHVsZXMgdGhlIHVwZGF0ZSBjYWxsYmFjayBmb3IgYSBnaXZlbiB0YXJnZXQsXG4gICAgICogRHVyaW5nIGV2ZXJ5IGZyYW1lIGFmdGVyIHNjaGVkdWxlIHN0YXJ0ZWQsIHRoZSBcInVwZGF0ZVwiIGZ1bmN0aW9uIG9mIHRhcmdldCB3aWxsIGJlIGludm9rZWQuXG4gICAgICogISN6aFxuICAgICAqIOS9v+eUqOaMh+WumueahOS8mOWFiOe6p+S4uuaMh+WumueahOWvueixoeiuvue9riB1cGRhdGUg5a6a5pe25Zmo44CCXG4gICAgICogdXBkYXRlIOWumuaXtuWZqOavj+S4gOW4p+mDveS8muiiq+inpuWPke+8jOinpuWPkeaXtuiHquWKqOiwg+eUqOaMh+WumuWvueixoeeahCBcInVwZGF0ZVwiIOWHveaVsOOAglxuICAgICAqIOS8mOWFiOe6p+eahOWAvOi2iuS9ju+8jOWumuaXtuWZqOiiq+inpuWPkeeahOi2iuaXqeOAglxuICAgICAqIEBtZXRob2Qgc2NoZWR1bGVVcGRhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHByaW9yaXR5XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBwYXVzZWRcbiAgICAgKi9cbiAgICBzY2hlZHVsZVVwZGF0ZTogZnVuY3Rpb24odGFyZ2V0LCBwcmlvcml0eSwgcGF1c2VkKSB7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9IHRhcmdldC5faWQ7XG4gICAgICAgIGlmICghdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuX19pbnN0YW5jZUlkKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDE1MTMpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0Ll9pZCA9IHRhcmdldC5fX2luc3RhbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE1MTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNoRWxlbWVudCA9IHRoaXMuX2hhc2hGb3JVcGRhdGVzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKGhhc2hFbGVtZW50ICYmIGhhc2hFbGVtZW50LmVudHJ5KXtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHByaW9yaXR5IGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAoaGFzaEVsZW1lbnQuZW50cnkucHJpb3JpdHkgIT09IHByaW9yaXR5KXtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdXBkYXRlSGFzaExvY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDE1MDYpO1xuICAgICAgICAgICAgICAgICAgICBoYXNoRWxlbWVudC5lbnRyeS5tYXJrZWRGb3JEZWxldGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBoYXNoRWxlbWVudC5lbnRyeS5wYXVzZWQgPSBwYXVzZWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBhZGRlZCBhZ2FpbiBvdXRzaWRlIGlmIChoYXNoRWxlbWVudCkuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZVVwZGF0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGhhc2hFbGVtZW50LmVudHJ5Lm1hcmtlZEZvckRlbGV0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaGFzaEVsZW1lbnQuZW50cnkucGF1c2VkID0gcGF1c2VkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0RWxlbWVudCA9IExpc3RFbnRyeS5nZXQodGFyZ2V0LCBwcmlvcml0eSwgcGF1c2VkLCBmYWxzZSk7XG4gICAgICAgIHZhciBwcExpc3Q7XG5cbiAgICAgICAgLy8gbW9zdCBvZiB0aGUgdXBkYXRlcyBhcmUgZ29pbmcgdG8gYmUgMCwgdGhhdCdzIHdheSB0aGVyZVxuICAgICAgICAvLyBpcyBhbiBzcGVjaWFsIGxpc3QgZm9yIHVwZGF0ZXMgd2l0aCBwcmlvcml0eSAwXG4gICAgICAgIGlmIChwcmlvcml0eSA9PT0gMCkge1xuICAgICAgICAgICAgcHBMaXN0ID0gdGhpcy5fdXBkYXRlczBMaXN0O1xuICAgICAgICAgICAgdGhpcy5fYXBwZW5kSW4ocHBMaXN0LCBsaXN0RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcExpc3QgPSBwcmlvcml0eSA8IDAgPyB0aGlzLl91cGRhdGVzTmVnTGlzdCA6IHRoaXMuX3VwZGF0ZXNQb3NMaXN0O1xuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdHlJbihwcExpc3QsIGxpc3RFbGVtZW50LCBwcmlvcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3VwZGF0ZSBoYXNoIGVudHJ5IGZvciBxdWljayBhY2Nlc3NcbiAgICAgICAgdGhpcy5faGFzaEZvclVwZGF0ZXNbdGFyZ2V0SWRdID0gSGFzaFVwZGF0ZUVudHJ5LmdldChwcExpc3QsIGxpc3RFbGVtZW50LCB0YXJnZXQsIG51bGwpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVW5zY2hlZHVsZXMgYSBjYWxsYmFjayBmb3IgYSBjYWxsYmFjayBhbmQgYSBnaXZlbiB0YXJnZXQuXG4gICAgICogSWYgeW91IHdhbnQgdG8gdW5zY2hlZHVsZSB0aGUgXCJ1cGRhdGVcIiwgdXNlIGB1bnNjaGVkdWxlVXBkYXRlKClgXG4gICAgICogISN6aFxuICAgICAqIOWPlua2iOaMh+WumuWvueixoeWumuaXtuWZqOOAglxuICAgICAqIOWmguaenOmcgOimgeWPlua2iCB1cGRhdGUg5a6a5pe25Zmo77yM6K+35L2/55SoIHVuc2NoZWR1bGVVcGRhdGUoKeOAglxuICAgICAqIEBtZXRob2QgdW5zY2hlZHVsZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byBiZSB1bnNjaGVkdWxlZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGhlIHRhcmdldCBib3VuZCB0byB0aGUgY2FsbGJhY2suXG4gICAgICovXG4gICAgdW5zY2hlZHVsZTogZnVuY3Rpb24gKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgICAgLy9jYWxsYmFjaywgdGFyZ2V0XG5cbiAgICAgICAgLy8gZXhwbGljaXR5IGhhbmRsZSBuaWwgYXJndW1lbnRzIHdoZW4gcmVtb3ZpbmcgYW4gb2JqZWN0XG4gICAgICAgIGlmICghdGFyZ2V0IHx8ICFjYWxsYmFjaylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHRhcmdldElkID0gdGFyZ2V0Ll9pZDtcbiAgICAgICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5fX2luc3RhbmNlSWQpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTUxMyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQuX2lkID0gdGFyZ2V0Ll9faW5zdGFuY2VJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTUxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIGVsZW1lbnQgPSBzZWxmLl9oYXNoRm9yVGltZXJzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciB0aW1lcnMgPSBlbGVtZW50LnRpbWVycztcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDAsIGxpID0gdGltZXJzLmxlbmd0aDsgaSA8IGxpOyBpKyspe1xuICAgICAgICAgICAgICAgIHZhciB0aW1lciA9IHRpbWVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgPT09IHRpbWVyLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRpbWVyID09PSBlbGVtZW50LmN1cnJlbnRUaW1lcikgJiYgKCFlbGVtZW50LmN1cnJlbnRUaW1lclNhbHZhZ2VkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jdXJyZW50VGltZXJTYWx2YWdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGltZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgQ2FsbGJhY2tUaW1lci5wdXQodGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSB0aW1lckluZGV4IGluIGNhc2Ugd2UgYXJlIGluIHRpY2s7LCBsb29waW5nIG92ZXIgdGhlIGFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQudGltZXJJbmRleCA+PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnRpbWVySW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aW1lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5fY3VycmVudFRhcmdldCA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2N1cnJlbnRUYXJnZXRTYWx2YWdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlbW92ZUhhc2hFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBVbnNjaGVkdWxlcyB0aGUgdXBkYXRlIGNhbGxiYWNrIGZvciBhIGdpdmVuIHRhcmdldC5cbiAgICAgKiAhI3poIOWPlua2iOaMh+WumuWvueixoeeahCB1cGRhdGUg5a6a5pe25Zmo44CCXG4gICAgICogQG1ldGhvZCB1bnNjaGVkdWxlVXBkYXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUaGUgdGFyZ2V0IHRvIGJlIHVuc2NoZWR1bGVkLlxuICAgICAqL1xuICAgIHVuc2NoZWR1bGVVcGRhdGU6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB0YXJnZXRJZCA9IHRhcmdldC5faWQ7XG4gICAgICAgIGlmICghdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuX19pbnN0YW5jZUlkKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDE1MTMpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0Ll9pZCA9IHRhcmdldC5fX2luc3RhbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE1MTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoRm9yVXBkYXRlc1t0YXJnZXRJZF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdXBkYXRlSGFzaExvY2tlZCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZW50cnkubWFya2VkRm9yRGVsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVVcGRhdGVGcm9tSGFzaChlbGVtZW50LmVudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVW5zY2hlZHVsZXMgYWxsIHNjaGVkdWxlZCBjYWxsYmFja3MgZm9yIGEgZ2l2ZW4gdGFyZ2V0LlxuICAgICAqIFRoaXMgYWxzbyBpbmNsdWRlcyB0aGUgXCJ1cGRhdGVcIiBjYWxsYmFjay5cbiAgICAgKiAhI3poIOWPlua2iOaMh+WumuWvueixoeeahOaJgOacieWumuaXtuWZqO+8jOWMheaLrCB1cGRhdGUg5a6a5pe25Zmo44CCXG4gICAgICogQG1ldGhvZCB1bnNjaGVkdWxlQWxsRm9yVGFyZ2V0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBUaGUgdGFyZ2V0IHRvIGJlIHVuc2NoZWR1bGVkLlxuICAgICAqL1xuICAgIHVuc2NoZWR1bGVBbGxGb3JUYXJnZXQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgLy8gZXhwbGljaXQgbnVsbHB0ciBoYW5kbGluZ1xuICAgICAgICBpZiAoIXRhcmdldCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhcmdldElkID0gdGFyZ2V0Ll9pZDtcbiAgICAgICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5fX2luc3RhbmNlSWQpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTUxMyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQuX2lkID0gdGFyZ2V0Ll9faW5zdGFuY2VJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTUxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDdXN0b20gU2VsZWN0b3JzXG4gICAgICAgIHZhciBlbGVtZW50ID0gdGhpcy5faGFzaEZvclRpbWVyc1t0YXJnZXRJZF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgdGltZXJzID0gZWxlbWVudC50aW1lcnM7XG4gICAgICAgICAgICBpZiAodGltZXJzLmluZGV4T2YoZWxlbWVudC5jdXJyZW50VGltZXIpID4gLTEgJiZcbiAgICAgICAgICAgICAgICAoIWVsZW1lbnQuY3VycmVudFRpbWVyU2FsdmFnZWQpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jdXJyZW50VGltZXJTYWx2YWdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRpbWVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBDYWxsYmFja1RpbWVyLnB1dCh0aW1lcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGltZXJzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50VGFyZ2V0ID09PSBlbGVtZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0U2FsdmFnZWQgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlSGFzaEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgc2VsZWN0b3JcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlVXBkYXRlKHRhcmdldCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVbnNjaGVkdWxlcyBhbGwgc2NoZWR1bGVkIGNhbGxiYWNrcyBmcm9tIGFsbCB0YXJnZXRzIGluY2x1ZGluZyB0aGUgc3lzdGVtIGNhbGxiYWNrcy48YnIvPlxuICAgICAqIFlvdSBzaG91bGQgTkVWRVIgY2FsbCB0aGlzIG1ldGhvZCwgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy5cbiAgICAgKiAhI3poXG4gICAgICog5Y+W5raI5omA5pyJ5a+56LGh55qE5omA5pyJ5a6a5pe25Zmo77yM5YyF5ous57O757uf5a6a5pe25Zmo44CCPGJyLz5cbiAgICAgKiDkuI3opoHosIPnlKjmraTlh73mlbDvvIzpmaTpnZ7kvaDnoa7lrprkvaDlnKjlgZrku4DkuYjjgIJcbiAgICAgKiBAbWV0aG9kIHVuc2NoZWR1bGVBbGxcbiAgICAgKi9cbiAgICB1bnNjaGVkdWxlQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxXaXRoTWluUHJpb3JpdHkoY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVbnNjaGVkdWxlcyBhbGwgY2FsbGJhY2tzIGZyb20gYWxsIHRhcmdldHMgd2l0aCBhIG1pbmltdW0gcHJpb3JpdHkuPGJyLz5cbiAgICAgKiBZb3Ugc2hvdWxkIG9ubHkgY2FsbCB0aGlzIHdpdGggYFBSSU9SSVRZX05PTl9TWVNURU1fTUlOYCBvciBoaWdoZXIuXG4gICAgICogISN6aFxuICAgICAqIOWPlua2iOaJgOacieS8mOWFiOe6p+eahOWAvOWkp+S6juaMh+WumuS8mOWFiOe6p+eahOWumuaXtuWZqOOAgjxici8+XG4gICAgICog5L2g5bqU6K+l5Y+q5Y+W5raI5LyY5YWI57qn55qE5YC85aSn5LqOIFBSSU9SSVRZX05PTl9TWVNURU1fTUlOIOeahOWumuaXtuWZqOOAglxuICAgICAqIEBtZXRob2QgdW5zY2hlZHVsZUFsbFdpdGhNaW5Qcmlvcml0eVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtaW5Qcmlvcml0eSBUaGUgbWluaW11bSBwcmlvcml0eSBvZiBzZWxlY3RvciB0byBiZSB1bnNjaGVkdWxlZC4gV2hpY2ggbWVhbnMsIGFsbCBzZWxlY3RvcnMgd2hpY2hcbiAgICAgKiAgICAgICAgcHJpb3JpdHkgaXMgaGlnaGVyIHRoYW4gbWluUHJpb3JpdHkgd2lsbCBiZSB1bnNjaGVkdWxlZC5cbiAgICAgKi9cbiAgICB1bnNjaGVkdWxlQWxsV2l0aE1pblByaW9yaXR5OiBmdW5jdGlvbihtaW5Qcmlvcml0eSl7XG4gICAgICAgIC8vIEN1c3RvbSBTZWxlY3RvcnNcbiAgICAgICAgdmFyIGksIGVsZW1lbnQsIGFyciA9IHRoaXMuX2FycmF5Rm9yVGltZXJzO1xuICAgICAgICBmb3IoaT1hcnIubGVuZ3RoLTE7IGk+PTA7IGktLSl7XG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyW2ldO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsRm9yVGFyZ2V0KGVsZW1lbnQudGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZXMgc2VsZWN0b3JzXG4gICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgdmFyIHRlbXBfbGVuZ3RoID0gMDtcbiAgICAgICAgaWYobWluUHJpb3JpdHkgPCAwKXtcbiAgICAgICAgICAgIGZvcihpPTA7IGk8dGhpcy5fdXBkYXRlc05lZ0xpc3QubGVuZ3RoOyApe1xuICAgICAgICAgICAgICAgIHRlbXBfbGVuZ3RoID0gdGhpcy5fdXBkYXRlc05lZ0xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gdGhpcy5fdXBkYXRlc05lZ0xpc3RbaV07XG4gICAgICAgICAgICAgICAgaWYoZW50cnkgJiYgZW50cnkucHJpb3JpdHkgPj0gbWluUHJpb3JpdHkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZVVwZGF0ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wX2xlbmd0aCA9PSB0aGlzLl91cGRhdGVzTmVnTGlzdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1pblByaW9yaXR5IDw9IDApe1xuICAgICAgICAgICAgZm9yKGk9MDsgaTx0aGlzLl91cGRhdGVzMExpc3QubGVuZ3RoOyApe1xuICAgICAgICAgICAgICAgIHRlbXBfbGVuZ3RoID0gdGhpcy5fdXBkYXRlczBMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IHRoaXMuX3VwZGF0ZXMwTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZVVwZGF0ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wX2xlbmd0aCA9PSB0aGlzLl91cGRhdGVzMExpc3QubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaT0wOyBpPHRoaXMuX3VwZGF0ZXNQb3NMaXN0Lmxlbmd0aDsgKXtcbiAgICAgICAgICAgIHRlbXBfbGVuZ3RoID0gdGhpcy5fdXBkYXRlc1Bvc0xpc3QubGVuZ3RoO1xuICAgICAgICAgICAgZW50cnkgPSB0aGlzLl91cGRhdGVzUG9zTGlzdFtpXTtcbiAgICAgICAgICAgIGlmKGVudHJ5ICYmIGVudHJ5LnByaW9yaXR5ID49IG1pblByaW9yaXR5KVxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZVVwZGF0ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKHRlbXBfbGVuZ3RoID09IHRoaXMuX3VwZGF0ZXNQb3NMaXN0Lmxlbmd0aClcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciBhIGNhbGxiYWNrIGZvciBhIGdpdmVuIHRhcmdldCBpcyBzY2hlZHVsZWQuXG4gICAgICogISN6aCDmo4Dmn6XmjIflrprnmoTlm57osIPlh73mlbDlkozlm57osIPlr7nosaHnu4TlkIjmmK/lkKblrZjlnKjlrprml7blmajjgIJcbiAgICAgKiBAbWV0aG9kIGlzU2NoZWR1bGVkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGNoZWNrLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgVGhlIHRhcmdldCBvZiB0aGUgY2FsbGJhY2suXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIGlzIGludm9rZWQsIGZhbHNlIGlmIG5vdC5cbiAgICAgKi9cbiAgICBpc1NjaGVkdWxlZDogZnVuY3Rpb24oY2FsbGJhY2ssIHRhcmdldCl7XG4gICAgICAgIC8va2V5LCB0YXJnZXRcbiAgICAgICAgLy9zZWxlY3RvciwgdGFyZ2V0XG4gICAgICAgIGNjLmFzc2VydElEKGNhbGxiYWNrLCAxNTA4KTtcbiAgICAgICAgY2MuYXNzZXJ0SUQodGFyZ2V0LCAxNTA5KTtcbiAgICAgICAgdmFyIHRhcmdldElkID0gdGFyZ2V0Ll9pZDtcbiAgICAgICAgaWYgKCF0YXJnZXRJZCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC5fX2luc3RhbmNlSWQpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTUxMyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0SWQgPSB0YXJnZXQuX2lkID0gdGFyZ2V0Ll9faW5zdGFuY2VJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTUxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMuX2hhc2hGb3JUaW1lcnNbdGFyZ2V0SWRdO1xuXG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnQudGltZXJzID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRpbWVycyA9IGVsZW1lbnQudGltZXJzO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lcnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGltZXIgPSAgdGltZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrID09PSB0aW1lci5fY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFBhdXNlIGFsbCBzZWxlY3RvcnMgZnJvbSBhbGwgdGFyZ2V0cy48YnIvPlxuICAgICAqIFlvdSBzaG91bGQgTkVWRVIgY2FsbCB0aGlzIG1ldGhvZCwgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy5cbiAgICAgKiAhI3poXG4gICAgICog5pqC5YGc5omA5pyJ5a+56LGh55qE5omA5pyJ5a6a5pe25Zmo44CCPGJyLz5cbiAgICAgKiDkuI3opoHosIPnlKjov5nkuKrmlrnms5XvvIzpmaTpnZ7kvaDnn6XpgZPkvaDmraPlnKjlgZrku4DkuYjjgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlQWxsVGFyZ2V0c1xuICAgICAqL1xuICAgIHBhdXNlQWxsVGFyZ2V0czogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXVzZUFsbFRhcmdldHNXaXRoTWluUHJpb3JpdHkoY2MuU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBQYXVzZSBhbGwgc2VsZWN0b3JzIGZyb20gYWxsIHRhcmdldHMgd2l0aCBhIG1pbmltdW0gcHJpb3JpdHkuIDxici8+XG4gICAgICogWW91IHNob3VsZCBvbmx5IGNhbGwgdGhpcyB3aXRoIGtDQ1ByaW9yaXR5Tm9uU3lzdGVtTWluIG9yIGhpZ2hlci5cbiAgICAgKiAhI3poXG4gICAgICog5pqC5YGc5omA5pyJ5LyY5YWI57qn55qE5YC85aSn5LqO5oyH5a6a5LyY5YWI57qn55qE5a6a5pe25Zmo44CCPGJyLz5cbiAgICAgKiDkvaDlupTor6Xlj6rmmoLlgZzkvJjlhYjnuqfnmoTlgLzlpKfkuo4gUFJJT1JJVFlfTk9OX1NZU1RFTV9NSU4g55qE5a6a5pe25Zmo44CCXG4gICAgICogQG1ldGhvZCBwYXVzZUFsbFRhcmdldHNXaXRoTWluUHJpb3JpdHlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWluUHJpb3JpdHlcbiAgICAgKi9cbiAgICBwYXVzZUFsbFRhcmdldHNXaXRoTWluUHJpb3JpdHk6IGZ1bmN0aW9uIChtaW5Qcmlvcml0eSkge1xuICAgICAgICB2YXIgaWRzV2l0aFNlbGVjdG9ycyA9IFtdO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgZWxlbWVudCwgbG9jQXJyYXlGb3JUaW1lcnMgPSBzZWxmLl9hcnJheUZvclRpbWVycztcbiAgICAgICAgdmFyIGksIGxpO1xuICAgICAgICAvLyBDdXN0b20gU2VsZWN0b3JzXG4gICAgICAgIGZvcihpID0gMCwgbGkgPSBsb2NBcnJheUZvclRpbWVycy5sZW5ndGg7IGkgPCBsaTsgaSsrKXtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBsb2NBcnJheUZvclRpbWVyc1tpXTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlkc1dpdGhTZWxlY3RvcnMucHVzaChlbGVtZW50LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW50cnk7XG4gICAgICAgIGlmKG1pblByaW9yaXR5IDwgMCl7XG4gICAgICAgICAgICBmb3IoaT0wOyBpPHRoaXMuX3VwZGF0ZXNOZWdMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IHRoaXMuX3VwZGF0ZXNOZWdMaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICBpZihlbnRyeS5wcmlvcml0eSA+PSBtaW5Qcmlvcml0eSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzV2l0aFNlbGVjdG9ycy5wdXNoKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW5Qcmlvcml0eSA8PSAwKXtcbiAgICAgICAgICAgIGZvcihpPTA7IGk8dGhpcy5fdXBkYXRlczBMaXN0Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IHRoaXMuX3VwZGF0ZXMwTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWRzV2l0aFNlbGVjdG9ycy5wdXNoKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGk9MDsgaTx0aGlzLl91cGRhdGVzUG9zTGlzdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBlbnRyeSA9IHRoaXMuX3VwZGF0ZXNQb3NMaXN0W2ldO1xuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYoZW50cnkucHJpb3JpdHkgPj0gbWluUHJpb3JpdHkpe1xuICAgICAgICAgICAgICAgICAgICBlbnRyeS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZHNXaXRoU2VsZWN0b3JzLnB1c2goZW50cnkudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWRzV2l0aFNlbGVjdG9ycztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlc3VtZSBzZWxlY3RvcnMgb24gYSBzZXQgb2YgdGFyZ2V0cy48YnIvPlxuICAgICAqIFRoaXMgY2FuIGJlIHVzZWZ1bCBmb3IgdW5kb2luZyBhIGNhbGwgdG8gcGF1c2VBbGxDYWxsYmFja3MuXG4gICAgICogISN6aFxuICAgICAqIOaBouWkjeaMh+WumuaVsOe7hOS4reaJgOacieWvueixoeeahOWumuaXtuWZqOOAgjxici8+XG4gICAgICog6L+Z5Liq5Ye95pWw5pivIHBhdXNlQWxsQ2FsbGJhY2tzIOeahOmAhuaTjeS9nOOAglxuICAgICAqIEBtZXRob2QgcmVzdW1lVGFyZ2V0c1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRhcmdldHNUb1Jlc3VtZVxuICAgICAqL1xuICAgIHJlc3VtZVRhcmdldHM6IGZ1bmN0aW9uICh0YXJnZXRzVG9SZXN1bWUpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRzVG9SZXN1bWUpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzVG9SZXN1bWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucmVzdW1lVGFyZ2V0KHRhcmdldHNUb1Jlc3VtZVtpXSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFBhdXNlcyB0aGUgdGFyZ2V0Ljxici8+XG4gICAgICogQWxsIHNjaGVkdWxlZCBzZWxlY3RvcnMvdXBkYXRlIGZvciBhIGdpdmVuIHRhcmdldCB3b24ndCBiZSAndGlja2VkJyB1bnRpbCB0aGUgdGFyZ2V0IGlzIHJlc3VtZWQuPGJyLz5cbiAgICAgKiBJZiB0aGUgdGFyZ2V0IGlzIG5vdCBwcmVzZW50LCBub3RoaW5nIGhhcHBlbnMuXG4gICAgICogISN6aFxuICAgICAqIOaaguWBnOaMh+WumuWvueixoeeahOWumuaXtuWZqOOAgjxici8+XG4gICAgICog5oyH5a6a5a+56LGh55qE5omA5pyJ5a6a5pe25Zmo6YO95Lya6KKr5pqC5YGc44CCPGJyLz5cbiAgICAgKiDlpoLmnpzmjIflrprnmoTlr7nosaHmsqHmnInlrprml7blmajvvIzku4DkuYjkuZ/kuI3kvJrlj5HnlJ/jgIJcbiAgICAgKiBAbWV0aG9kIHBhdXNlVGFyZ2V0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgICAqL1xuICAgIHBhdXNlVGFyZ2V0OiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLmFzc2VydElEKHRhcmdldCwgMTUwMyk7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9IHRhcmdldC5faWQ7XG4gICAgICAgIGlmICghdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuX19pbnN0YW5jZUlkKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDE1MTMpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0Ll9pZCA9IHRhcmdldC5fX2luc3RhbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE1MTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9jdXN0b21lciBzZWxlY3RvcnNcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZWxlbWVudCA9IHNlbGYuX2hhc2hGb3JUaW1lcnNbdGFyZ2V0SWRdO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgZWxlbWVudC5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgY2FsbGJhY2tcbiAgICAgICAgdmFyIGVsZW1lbnRVcGRhdGUgPSBzZWxmLl9oYXNoRm9yVXBkYXRlc1t0YXJnZXRJZF07XG4gICAgICAgIGlmIChlbGVtZW50VXBkYXRlKSB7XG4gICAgICAgICAgICBlbGVtZW50VXBkYXRlLmVudHJ5LnBhdXNlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlc3VtZXMgdGhlIHRhcmdldC48YnIvPlxuICAgICAqIFRoZSAndGFyZ2V0JyB3aWxsIGJlIHVucGF1c2VkLCBzbyBhbGwgc2NoZWR1bGUgc2VsZWN0b3JzL3VwZGF0ZSB3aWxsIGJlICd0aWNrZWQnIGFnYWluLjxici8+XG4gICAgICogSWYgdGhlIHRhcmdldCBpcyBub3QgcHJlc2VudCwgbm90aGluZyBoYXBwZW5zLlxuICAgICAqICEjemhcbiAgICAgKiDmgaLlpI3mjIflrprlr7nosaHnmoTmiYDmnInlrprml7blmajjgII8YnIvPlxuICAgICAqIOaMh+WumuWvueixoeeahOaJgOacieWumuaXtuWZqOWwhue7p+e7reW3peS9nOOAgjxici8+XG4gICAgICog5aaC5p6c5oyH5a6a55qE5a+56LGh5rKh5pyJ5a6a5pe25Zmo77yM5LuA5LmI5Lmf5LiN5Lya5Y+R55Sf44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVUYXJnZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAgICovXG4gICAgcmVzdW1lVGFyZ2V0OiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGNjLmFzc2VydElEKHRhcmdldCwgMTUwNCk7XG4gICAgICAgIHZhciB0YXJnZXRJZCA9IHRhcmdldC5faWQ7XG4gICAgICAgIGlmICghdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuX19pbnN0YW5jZUlkKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDE1MTMpO1xuICAgICAgICAgICAgICAgIHRhcmdldElkID0gdGFyZ2V0Ll9pZCA9IHRhcmdldC5fX2luc3RhbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE1MTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3VzdG9tIHNlbGVjdG9yc1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBlbGVtZW50ID0gc2VsZi5faGFzaEZvclRpbWVyc1t0YXJnZXRJZF07XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy91cGRhdGUgY2FsbGJhY2tcbiAgICAgICAgdmFyIGVsZW1lbnRVcGRhdGUgPSBzZWxmLl9oYXNoRm9yVXBkYXRlc1t0YXJnZXRJZF07XG4gICAgICAgIGlmIChlbGVtZW50VXBkYXRlKSB7XG4gICAgICAgICAgICBlbGVtZW50VXBkYXRlLmVudHJ5LnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdGFyZ2V0IGlzIHBhdXNlZC5cbiAgICAgKiAhI3poIOi/lOWbnuaMh+WumuWvueixoeeahOWumuaXtuWZqOaYr+WQpuaaguWBnOS6huOAglxuICAgICAqIEBtZXRob2QgaXNUYXJnZXRQYXVzZWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1RhcmdldFBhdXNlZDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBjYy5hc3NlcnRJRCh0YXJnZXQsIDE1MDUpO1xuICAgICAgICB2YXIgdGFyZ2V0SWQgPSB0YXJnZXQuX2lkO1xuICAgICAgICBpZiAoIXRhcmdldElkKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Ll9faW5zdGFuY2VJZCkge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNTEzKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRJZCA9IHRhcmdldC5faWQgPSB0YXJnZXQuX19pbnN0YW5jZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgxNTEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEN1c3RvbSBzZWxlY3RvcnNcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLl9oYXNoRm9yVGltZXJzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnBhdXNlZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudFVwZGF0ZSA9IHRoaXMuX2hhc2hGb3JVcGRhdGVzW3RhcmdldElkXTtcbiAgICAgICAgaWYgKGVsZW1lbnRVcGRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50VXBkYXRlLmVudHJ5LnBhdXNlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbn07XG5cbi8qKlxuICogISNlbiBQcmlvcml0eSBsZXZlbCByZXNlcnZlZCBmb3Igc3lzdGVtIHNlcnZpY2VzLlxuICogISN6aCDns7vnu5/mnI3liqHnmoTkvJjlhYjnuqfjgIJcbiAqIEBwcm9wZXJ0eSBQUklPUklUWV9TWVNURU1cbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAc3RhdGljXG4gKi9cbmNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0gPSAxIDw8IDMxO1xuXG4vKipcbiAqICEjZW4gTWluaW11bSBwcmlvcml0eSBsZXZlbCBmb3IgdXNlciBzY2hlZHVsaW5nLlxuICogISN6aCDnlKjmiLfosIPluqbmnIDkvY7kvJjlhYjnuqfjgIJcbiAqIEBwcm9wZXJ0eSBQUklPUklUWV9OT05fU1lTVEVNXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQHN0YXRpY1xuICovXG5jYy5TY2hlZHVsZXIuUFJJT1JJVFlfTk9OX1NZU1RFTSA9IGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0gKyAxO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLlNjaGVkdWxlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9