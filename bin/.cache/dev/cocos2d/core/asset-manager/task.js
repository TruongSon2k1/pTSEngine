
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/task.js';
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
var _taskId = 0;
var MAX_DEAD_NUM = 500;
var _deadPool = [];
/**
 * !#en
 * Task is used to run in the pipeline for some effect
 * 
 * !#zh
 * 任务用于在管线中运行以达成某种效果
 * 
 * @class Task
 */

function Task(options) {
  /**
   * !#en
   * The id of task
   * 
   * !#zh
   * 任务id
   * 
   * @property id
   * @type {Number}
   */
  this.id = _taskId++;
  this._isFinish = true;
  /**
   * !#en
   * The callback when task is completed
   * 
   * !#zh
   * 完成回调
   * 
   * @property onComplete
   * @type {Function}
   */

  this.onComplete = null;
  /**
   * !#en
   * The callback of progression
   * 
   * !#zh
   * 进度回调
   * 
   * @property onProgress
   * @type {Function}
   */

  this.onProgress = null;
  /**
   * !#en
   * The callback when something goes wrong
   * 
   * !#zh
   * 错误回调
   * 
   * @property onError
   * @type {Function}
   */

  this.onError = null;
  /**
   * !#en
   * The source of task
   * 
   * !#zh
   * 任务的源
   * 
   * @property source
   * @type {*}
   */

  this.source = null;
  /**
   * !#en
   * The output of task
   * 
   * !#zh
   * 任务的输出
   * 
   * @property output
   * @type {*}
   */

  this.output = null;
  /**
   * !#en
   * The input of task
   * 
   * !#zh
   * 任务的输入
   * 
   * @property input
   * @type {*}
   */

  this.input = null;
  /**
   * !#en
   * The progression of task
   * 
   * !#zh
   * 任务的进度
   * 
   * @property progress
   * @type {*}
   */

  this.progress = null;
  /**
   * !#en
   * Custom options
   * 
   * !#zh
   * 自定义参数
   * 
   * @property options
   * @type {Object}
   */

  this.options = null;
  this.set(options);
}

;
Task.prototype = {
  /**
   * !#en
   * Create a new Task
   * 
   * !#zh
   * 创建一个任务
   * 
   * @method constructor
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [options.onComplete] - Callback when the task is completed, if the pipeline is synchronous, onComplete is unnecessary.
   * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
   * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
   * @param {*} options.input - Something will be handled with pipeline
   * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
   * @param {Object} [options.options] - Custom parameters
   * 
   * @typescript
   * constructor(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>})
   */
  constructor: Task,

  /**
   * !#en
   * Set paramters of this task
   * 
   * !#zh
   * 设置任务的参数
   * 
   * @method set
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [options.onComplete] - Callback when the task complete, if the pipeline is synchronous, onComplete is unnecessary.
   * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
   * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
   * @param {*} options.input - Something will be handled with pipeline
   * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
   * @param {Object} [options.options] - Custom parameters
   * 
   * @example 
   * var task = new Task();
   * task.set({input: ['test'], onComplete: (err, result) => console.log(err), onProgress: (finish, total) => console.log(finish / total)});
   * 
   * @typescript
   * set(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>}): void
   */
  set: function set(options) {
    options = options || Object.create(null);
    this.onComplete = options.onComplete;
    this.onProgress = options.onProgress;
    this.onError = options.onError;
    this.source = this.input = options.input;
    this.output = null;
    this.progress = options.progress; // custom data

    this.options = options.options || Object.create(null);
  },

  /**
   * !#en
   * Dispatch event
   * 
   * !#zh
   * 发布事件
   * 
   * @method dispatch
   * @param {string} event - The event name
   * @param {*} param1 - Parameter 1
   * @param {*} param2 - Parameter 2
   * @param {*} param3 - Parameter 3
   * @param {*} param4 - Parameter 4
   * 
   * @example
   * var task = Task.create();
   * Task.onComplete = (msg) => console.log(msg);
   * Task.dispatch('complete', 'hello world');
   * 
   * @typescript
   * dispatch(event: string, param1?: any, param2?: any, param3?: any, param4?: any): void
   */
  dispatch: function dispatch(event, param1, param2, param3, param4) {
    switch (event) {
      case 'complete':
        this.onComplete && this.onComplete(param1, param2, param3, param4);
        break;

      case 'progress':
        this.onProgress && this.onProgress(param1, param2, param3, param4);
        break;

      case 'error':
        this.onError && this.onError(param1, param2, param3, param4);
        break;

      default:
        var str = 'on' + event[0].toUpperCase() + event.substr(1);

        if (typeof this[str] === 'function') {
          this[str](param1, param2, param3, param4);
        }

        break;
    }
  },

  /**
   * !#en
   * Recycle this for reuse
   * 
   * !#zh
   * 回收 task 用于复用
   * 
   * @method recycle
   * 
   * @typescript
   * recycle(): void
   */
  recycle: function recycle() {
    if (_deadPool.length === MAX_DEAD_NUM) return;
    this.onComplete = null;
    this.onProgress = null;
    this.onError = null;
    this.source = this.output = this.input = null;
    this.progress = null;
    this.options = null;

    _deadPool.push(this);
  },

  /**
   * !#en
   * Whether or not this task is completed
   * 
   * !#zh
   * 此任务是否已经完成
   * 
   * @property isFinish
   * @type {Boolean}
   */
  get isFinish() {
    return this._isFinish;
  }

};
/**
 * !#en
 * Create a new task from pool
 * 
 * !#zh
 * 从对象池中创建 task
 * 
 * @static
 * @method create
 * @param {Object} [options] - Some optional paramters
 * @param {Function} [options.onComplete] - Callback when the task complete, if the pipeline is synchronous, onComplete is unnecessary.
 * @param {Function} [options.onProgress] - Continuously callback when the task is runing, if the pipeline is synchronous, onProgress is unnecessary.
 * @param {Function} [options.onError] - Callback when something goes wrong, if the pipeline is synchronous, onError is unnecessary.
 * @param {*} options.input - Something will be handled with pipeline
 * @param {*} [options.progress] - Progress information, you may need to assign it manually when multiple pipeline share one progress
 * @param {Object} [options.options] - Custom parameters
 * @returns {Task} task
 * 
 * @typescript 
 * create(options?: {onComplete?: (err: Error, result: any) => void, onError?: () => void, onProgress?: Function, input: any, progress?: any, options?: Record<string, any>}): Task
 */

Task.create = function (options) {
  var out = null;

  if (_deadPool.length !== 0) {
    out = _deadPool.pop();
    out.set(options);
  } else {
    out = new Task(options);
  }

  return out;
};

module.exports = Task;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHRhc2suanMiXSwibmFtZXMiOlsiX3Rhc2tJZCIsIk1BWF9ERUFEX05VTSIsIl9kZWFkUG9vbCIsIlRhc2siLCJvcHRpb25zIiwiaWQiLCJfaXNGaW5pc2giLCJvbkNvbXBsZXRlIiwib25Qcm9ncmVzcyIsIm9uRXJyb3IiLCJzb3VyY2UiLCJvdXRwdXQiLCJpbnB1dCIsInByb2dyZXNzIiwic2V0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJjcmVhdGUiLCJkaXNwYXRjaCIsImV2ZW50IiwicGFyYW0xIiwicGFyYW0yIiwicGFyYW0zIiwicGFyYW00Iiwic3RyIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJyZWN5Y2xlIiwibGVuZ3RoIiwicHVzaCIsImlzRmluaXNoIiwib3V0IiwicG9wIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxPQUFPLEdBQUcsQ0FBZDtBQUNBLElBQUlDLFlBQVksR0FBRyxHQUFuQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTQyxJQUFULENBQWVDLE9BQWYsRUFBd0I7QUFDcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxPQUFLQyxFQUFMLEdBQVVMLE9BQU8sRUFBakI7QUFFQSxPQUFLTSxTQUFMLEdBQWlCLElBQWpCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQUgsSUFBSSxDQUFDZSxNQUFMLEdBQWMsVUFBVWQsT0FBVixFQUFtQjtBQUM3QixNQUFJNEIsR0FBRyxHQUFHLElBQVY7O0FBQ0EsTUFBSTlCLFNBQVMsQ0FBQzJCLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEJHLElBQUFBLEdBQUcsR0FBRzlCLFNBQVMsQ0FBQytCLEdBQVYsRUFBTjtBQUNBRCxJQUFBQSxHQUFHLENBQUNsQixHQUFKLENBQVFWLE9BQVI7QUFDSCxHQUhELE1BSUs7QUFDRDRCLElBQUFBLEdBQUcsR0FBRyxJQUFJN0IsSUFBSixDQUFTQyxPQUFULENBQU47QUFDSDs7QUFFRCxTQUFPNEIsR0FBUDtBQUNILENBWEQ7O0FBYUFFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhDLElBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxyXG4gKi9cclxuXHJcbnZhciBfdGFza0lkID0gMDtcclxudmFyIE1BWF9ERUFEX05VTSA9IDUwMDtcclxudmFyIF9kZWFkUG9vbCA9IFtdO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGFzayBpcyB1c2VkIHRvIHJ1biBpbiB0aGUgcGlwZWxpbmUgZm9yIHNvbWUgZWZmZWN0XHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOS7u+WKoeeUqOS6juWcqOeuoee6v+S4rei/kOihjOS7pei+vuaIkOafkOenjeaViOaenFxyXG4gKiBcclxuICogQGNsYXNzIFRhc2tcclxuICovXHJcbmZ1bmN0aW9uIFRhc2sgKG9wdGlvbnMpIHtcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGlkIG9mIHRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Lu75YqhaWRcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGlkXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlkID0gX3Rhc2tJZCsrO1xyXG5cclxuICAgIHRoaXMuX2lzRmluaXNoID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBjYWxsYmFjayB3aGVuIHRhc2sgaXMgY29tcGxldGVkXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWujOaIkOWbnuiwg1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgb25Db21wbGV0ZVxyXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGNhbGxiYWNrIG9mIHByb2dyZXNzaW9uXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOi/m+W6puWbnuiwg1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgb25Qcm9ncmVzc1xyXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICB0aGlzLm9uUHJvZ3Jlc3MgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGNhbGxiYWNrIHdoZW4gc29tZXRoaW5nIGdvZXMgd3JvbmdcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6ZSZ6K+v5Zue6LCDXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBvbkVycm9yXHJcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIHRoaXMub25FcnJvciA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgc291cmNlIG9mIHRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Lu75Yqh55qE5rqQXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBzb3VyY2VcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnNvdXJjZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgb3V0cHV0IG9mIHRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Lu75Yqh55qE6L6T5Ye6XHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBvdXRwdXRcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm91dHB1dCA9IG51bGxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBpbnB1dCBvZiB0YXNrXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOS7u+WKoeeahOi+k+WFpVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgaW5wdXRcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlucHV0ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBwcm9ncmVzc2lvbiBvZiB0YXNrXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOS7u+WKoeeahOi/m+W6plxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgcHJvZ3Jlc3NcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnByb2dyZXNzID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEN1c3RvbSBvcHRpb25zXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiHquWumuS5ieWPguaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5vcHRpb25zID0gbnVsbDtcclxuICAgIHRoaXMuc2V0KG9wdGlvbnMpO1xyXG59O1xyXG5cclxuVGFzay5wcm90b3R5cGUgPSB7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlIGEgbmV3IFRhc2tcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Yib5bu65LiA5Liq5Lu75YqhXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIHRoZSB0YXNrIGlzIGNvbXBsZXRlZCwgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvbkNvbXBsZXRlIGlzIHVubmVjZXNzYXJ5LlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Qcm9ncmVzc10gLSBDb250aW51b3VzbHkgY2FsbGJhY2sgd2hlbiB0aGUgdGFzayBpcyBydW5pbmcsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25Qcm9ncmVzcyBpcyB1bm5lY2Vzc2FyeS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRXJyb3JdIC0gQ2FsbGJhY2sgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZywgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvbkVycm9yIGlzIHVubmVjZXNzYXJ5LlxyXG4gICAgICogQHBhcmFtIHsqfSBvcHRpb25zLmlucHV0IC0gU29tZXRoaW5nIHdpbGwgYmUgaGFuZGxlZCB3aXRoIHBpcGVsaW5lXHJcbiAgICAgKiBAcGFyYW0geyp9IFtvcHRpb25zLnByb2dyZXNzXSAtIFByb2dyZXNzIGluZm9ybWF0aW9uLCB5b3UgbWF5IG5lZWQgdG8gYXNzaWduIGl0IG1hbnVhbGx5IHdoZW4gbXVsdGlwbGUgcGlwZWxpbmUgc2hhcmUgb25lIHByb2dyZXNzXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMub3B0aW9uc10gLSBDdXN0b20gcGFyYW1ldGVyc1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29uc3RydWN0b3Iob3B0aW9ucz86IHtvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIHJlc3VsdDogYW55KSA9PiB2b2lkLCBvbkVycm9yPzogKCkgPT4gdm9pZCwgb25Qcm9ncmVzcz86IEZ1bmN0aW9uLCBpbnB1dDogYW55LCBwcm9ncmVzcz86IGFueSwgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT59KVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcjogVGFzayxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldCBwYXJhbXRlcnMgb2YgdGhpcyB0YXNrXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiuvue9ruS7u+WKoeeahOWPguaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHNldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gdGhlIHRhc2sgY29tcGxldGUsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25Db21wbGV0ZSBpcyB1bm5lY2Vzc2FyeS5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uUHJvZ3Jlc3NdIC0gQ29udGludW91c2x5IGNhbGxiYWNrIHdoZW4gdGhlIHRhc2sgaXMgcnVuaW5nLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uUHJvZ3Jlc3MgaXMgdW5uZWNlc3NhcnkuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5vbkVycm9yXSAtIENhbGxiYWNrIHdoZW4gc29tZXRoaW5nIGdvZXMgd3JvbmcsIGlmIHRoZSBwaXBlbGluZSBpcyBzeW5jaHJvbm91cywgb25FcnJvciBpcyB1bm5lY2Vzc2FyeS5cclxuICAgICAqIEBwYXJhbSB7Kn0gb3B0aW9ucy5pbnB1dCAtIFNvbWV0aGluZyB3aWxsIGJlIGhhbmRsZWQgd2l0aCBwaXBlbGluZVxyXG4gICAgICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wcm9ncmVzc10gLSBQcm9ncmVzcyBpbmZvcm1hdGlvbiwgeW91IG1heSBuZWVkIHRvIGFzc2lnbiBpdCBtYW51YWxseSB3aGVuIG11bHRpcGxlIHBpcGVsaW5lIHNoYXJlIG9uZSBwcm9ncmVzc1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLm9wdGlvbnNdIC0gQ3VzdG9tIHBhcmFtZXRlcnNcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGUgXHJcbiAgICAgKiB2YXIgdGFzayA9IG5ldyBUYXNrKCk7XHJcbiAgICAgKiB0YXNrLnNldCh7aW5wdXQ6IFsndGVzdCddLCBvbkNvbXBsZXRlOiAoZXJyLCByZXN1bHQpID0+IGNvbnNvbGUubG9nKGVyciksIG9uUHJvZ3Jlc3M6IChmaW5pc2gsIHRvdGFsKSA9PiBjb25zb2xlLmxvZyhmaW5pc2ggLyB0b3RhbCl9KTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHNldChvcHRpb25zPzoge29uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzdWx0OiBhbnkpID0+IHZvaWQsIG9uRXJyb3I/OiAoKSA9PiB2b2lkLCBvblByb2dyZXNzPzogRnVuY3Rpb24sIGlucHV0OiBhbnksIHByb2dyZXNzPzogYW55LCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pn0pOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHNldCAob3B0aW9ucykge1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gb3B0aW9ucy5vbkNvbXBsZXRlO1xyXG4gICAgICAgIHRoaXMub25Qcm9ncmVzcyA9IG9wdGlvbnMub25Qcm9ncmVzcztcclxuICAgICAgICB0aGlzLm9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3I7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmlucHV0ID0gb3B0aW9ucy5pbnB1dDtcclxuICAgICAgICB0aGlzLm91dHB1dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IG9wdGlvbnMucHJvZ3Jlc3M7XHJcbiAgICAgICAgLy8gY3VzdG9tIGRhdGFcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEaXNwYXRjaCBldmVudFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlj5HluIPkuovku7ZcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IG5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW0xIC0gUGFyYW1ldGVyIDFcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW0yIC0gUGFyYW1ldGVyIDJcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW0zIC0gUGFyYW1ldGVyIDNcclxuICAgICAqIEBwYXJhbSB7Kn0gcGFyYW00IC0gUGFyYW1ldGVyIDRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB0YXNrID0gVGFzay5jcmVhdGUoKTtcclxuICAgICAqIFRhc2sub25Db21wbGV0ZSA9IChtc2cpID0+IGNvbnNvbGUubG9nKG1zZyk7XHJcbiAgICAgKiBUYXNrLmRpc3BhdGNoKCdjb21wbGV0ZScsICdoZWxsbyB3b3JsZCcpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGlzcGF0Y2goZXZlbnQ6IHN0cmluZywgcGFyYW0xPzogYW55LCBwYXJhbTI/OiBhbnksIHBhcmFtMz86IGFueSwgcGFyYW00PzogYW55KTogdm9pZFxyXG4gICAgICovXHJcbiAgICBkaXNwYXRjaCAoZXZlbnQsIHBhcmFtMSwgcGFyYW0yLCBwYXJhbTMsIHBhcmFtNCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcclxuICAgICAgICAgICAgY2FzZSAnY29tcGxldGUnIDpcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZSAmJiB0aGlzLm9uQ29tcGxldGUocGFyYW0xLCBwYXJhbTIsIHBhcmFtMywgcGFyYW00KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyBcclxuICAgICAgICAgICAgY2FzZSAncHJvZ3Jlc3MnOiBcclxuICAgICAgICAgICAgICAgIHRoaXMub25Qcm9ncmVzcyAmJiB0aGlzLm9uUHJvZ3Jlc3MocGFyYW0xLCBwYXJhbTIsIHBhcmFtMywgcGFyYW00KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlcnJvcic6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yICYmIHRoaXMub25FcnJvcihwYXJhbTEsIHBhcmFtMiwgcGFyYW0zLCBwYXJhbTQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gJ29uJyArIGV2ZW50WzBdLnRvVXBwZXJDYXNlKCkgKyBldmVudC5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXNbc3RyXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbc3RyXShwYXJhbTEsIHBhcmFtMiwgcGFyYW0zLCBwYXJhbTQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlY3ljbGUgdGhpcyBmb3IgcmV1c2VcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Zue5pS2IHRhc2sg55So5LqO5aSN55SoXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcmVjeWNsZVxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcmVjeWNsZSgpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHJlY3ljbGUgKCkge1xyXG4gICAgICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoID09PSBNQVhfREVBRF9OVU0pIHJldHVybjtcclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25Qcm9ncmVzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkVycm9yID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMub3V0cHV0ID0gdGhpcy5pbnB1dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbnVsbDtcclxuICAgICAgICBfZGVhZFBvb2wucHVzaCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHRhc2sgaXMgY29tcGxldGVkXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOatpOS7u+WKoeaYr+WQpuW3sue7j+WujOaIkFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgaXNGaW5pc2hcclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBnZXQgaXNGaW5pc2ggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0ZpbmlzaDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZSBhIG5ldyB0YXNrIGZyb20gcG9vbFxyXG4gKiBcclxuICogISN6aFxyXG4gKiDku47lr7nosaHmsaDkuK3liJvlu7ogdGFza1xyXG4gKiBcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGNyZWF0ZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMub25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIHRoZSB0YXNrIGNvbXBsZXRlLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uQ29tcGxldGUgaXMgdW5uZWNlc3NhcnkuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uUHJvZ3Jlc3NdIC0gQ29udGludW91c2x5IGNhbGxiYWNrIHdoZW4gdGhlIHRhc2sgaXMgcnVuaW5nLCBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIG9uUHJvZ3Jlc3MgaXMgdW5uZWNlc3NhcnkuXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRXJyb3JdIC0gQ2FsbGJhY2sgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZywgaWYgdGhlIHBpcGVsaW5lIGlzIHN5bmNocm9ub3VzLCBvbkVycm9yIGlzIHVubmVjZXNzYXJ5LlxyXG4gKiBAcGFyYW0geyp9IG9wdGlvbnMuaW5wdXQgLSBTb21ldGhpbmcgd2lsbCBiZSBoYW5kbGVkIHdpdGggcGlwZWxpbmVcclxuICogQHBhcmFtIHsqfSBbb3B0aW9ucy5wcm9ncmVzc10gLSBQcm9ncmVzcyBpbmZvcm1hdGlvbiwgeW91IG1heSBuZWVkIHRvIGFzc2lnbiBpdCBtYW51YWxseSB3aGVuIG11bHRpcGxlIHBpcGVsaW5lIHNoYXJlIG9uZSBwcm9ncmVzc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMub3B0aW9uc10gLSBDdXN0b20gcGFyYW1ldGVyc1xyXG4gKiBAcmV0dXJucyB7VGFza30gdGFza1xyXG4gKiBcclxuICogQHR5cGVzY3JpcHQgXHJcbiAqIGNyZWF0ZShvcHRpb25zPzoge29uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzdWx0OiBhbnkpID0+IHZvaWQsIG9uRXJyb3I/OiAoKSA9PiB2b2lkLCBvblByb2dyZXNzPzogRnVuY3Rpb24sIGlucHV0OiBhbnksIHByb2dyZXNzPzogYW55LCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pn0pOiBUYXNrXHJcbiAqL1xyXG5UYXNrLmNyZWF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICB2YXIgb3V0ID0gbnVsbDtcclxuICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgb3V0ID0gX2RlYWRQb29sLnBvcCgpO1xyXG4gICAgICAgIG91dC5zZXQob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBvdXQgPSBuZXcgVGFzayhvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYXNrOyJdLCJzb3VyY2VSb290IjoiLyJ9