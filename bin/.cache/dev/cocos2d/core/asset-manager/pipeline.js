
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/pipeline.js';
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
var Task = require('./task');

var _pipelineId = 0;
/**
 * !#en
 * Pipeline can execute the task for some effect.
 * 
 * !#zh
 * 管线能执行任务达到某个效果
 * 
 * @class Pipeline
 */

function Pipeline(name, funcs) {
  if (!Array.isArray(funcs)) {
    cc.warn('funcs must be an array');
    return;
  }
  /**
   * !#en
   * The id of pipeline
   * 
   * !#zh
   * 管线的 id
   * 
   * @property id
   * @type {Number}
   */


  this.id = _pipelineId++;
  /**
   * !#en
   * The name of pipeline
   * 
   * !#zh
   * 管线的名字
   * 
   * @property name
   * @type {String}
   */

  this.name = name;
  /**
   * !#en
   * All pipes of pipeline
   * 
   * !#zh
   * 所有的管道
   * 
   * @property pipes
   * @type {Function[]}
   */

  this.pipes = [];

  for (var i = 0, l = funcs.length; i < l; i++) {
    if (typeof funcs[i] === 'function') {
      this.pipes.push(funcs[i]);
    }
  }
}

Pipeline.prototype = {
  /**
   * !#en
   * Create a new pipeline
   * 
   * !#zh
   * 创建一个管线
   * 
   * @method constructor
   * @param {string} name - The name of pipeline
   * @param {Function[]} funcs - The array of pipe, every pipe must be function which take two parameters, the first is a `Task` flowed in pipeline, the second is complete callback
   * 
   * @example
   * var pipeline = new Pipeline('download', [
   * (task, done) => {
   *      var url = task.input;
   *      cc.assetManager.downloader.downloadFile(url, null, null, (err, result) => {
   *          task.output = result;
   *          done(err);
   *      });
   * },
   * (task, done) => {
   *      var text = task.input;
   *      var json = JSON.stringify(text);
   *      task.output = json;
   *      done();
   * }
   * ]);
   * 
   * @typescript
   * constructor(name: string, funcs: Array<(task: Task, done?: (err: Error) => void) => void>)
   */
  constructor: Pipeline,

  /**
   * !#en
   * At specific point insert a new pipe to pipeline
   * 
   * !#zh
   * 在某个特定的点为管线插入一个新的 pipe
   * 
   * @method insert
   * @param {Function} func - The new pipe
   * @param {Task} func.task - The task handled with pipeline will be transferred to this function
   * @param {Function} [func.callback] - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
   * @param {number} index - The specific point you want to insert at.
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', []);
   * pipeline.insert((task, done) => {
   *      // do something
   *      done();
   * }, 0);
   * 
   * @typescript
   * insert(func: (task: Task, callback?: (err: Error) => void) => void, index: number): Pipeline
   */
  insert: function insert(func, index) {
    if (typeof func !== 'function' || index > this.pipes.length) {
      cc.warnID(4921);
      return;
    }

    this.pipes.splice(index, 0, func);
    return this;
  },

  /**
   * !#en
   * Append a new pipe to the pipeline
   * 
   * !#zh
   * 添加一个管道到管线中
   * 
   * @method append
   * @param {Function} func - The new pipe
   * @param {Task} func.task - The task handled with pipeline will be transferred to this function
   * @param {Function} [func.callback] - Callback you need to invoke manually when this pipe is finished. if the pipeline is synchronous, callback is unnecessary.
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', []);
   * pipeline.append((task, done) => {
   *      // do something
   *      done();
   * });
   * 
   * @typescript
   * append(func: (task: Task, callback?: (err: Error) => void) => void): Pipeline
   */
  append: function append(func) {
    if (typeof func !== 'function') {
      return;
    }

    this.pipes.push(func);
    return this;
  },

  /**
   * !#en
   * Remove pipe which at specific point
   * 
   * !#zh
   * 移除特定位置的管道
   * 
   * @method remove
   * @param {number} index - The specific point
   * @return {Pipeline} pipeline
   * 
   * @example
   * var pipeline = new Pipeline('test', (task, done) => {
   *      // do something
   *      done();  
   * });
   * pipeline.remove(0);
   * 
   * @typescript
   * remove(index: number): Pipeline
   */
  remove: function remove(index) {
    if (typeof index !== 'number') {
      return;
    }

    this.pipes.splice(index, 1);
    return this;
  },

  /**
   * !#en
   * Execute task synchronously
   * 
   * !#zh
   * 同步执行任务
   * 
   * @method sync
   * @param {Task} task - The task will be executed
   * @returns {*} result
   * 
   * @example
   * var pipeline = new Pipeline('sync', [(task) => {
   *      let input = task.input;
   *      task.output = doSomething(task.input);
   * }]);
   * 
   * var task = new Task({input: 'test'});
   * console.log(pipeline.sync(task));
   * 
   * @typescript
   * sync(task: Task): any 
   */
  sync: function sync(task) {
    var pipes = this.pipes;
    if (!(task instanceof Task) || pipes.length === 0) return;

    if (task.output != null) {
      task.input = task.output;
      task.output = null;
    }

    task._isFinish = false;

    for (var i = 0, l = pipes.length; i < l;) {
      var pipe = pipes[i];
      var result = pipe(task);

      if (result) {
        task._isFinish = true;
        return result;
      }

      i++;

      if (i !== l) {
        task.input = task.output;
        task.output = null;
      }
    }

    task._isFinish = true;
    return task.output;
  },

  /**
   * !#en
   * Execute task asynchronously
   * 
   * !#zh
   * 异步执行任务
   * 
   * @method async
   * @param {Task} task - The task will be executed
   * 
   * @example
   * var pipeline = new Pipeline('sync', [(task, done) => {
   *      let input = task.input;
   *      task.output = doSomething(task.input);
   *      done();
   * }]);
   * var task = new Task({input: 'test', onComplete: (err, result) => console.log(result)});
   * pipeline.async(task);
   *  
   * @typescript
   * async(task: Task): void
   */
  async: function async(task) {
    var pipes = this.pipes;
    if (!(task instanceof Task) || pipes.length === 0) return;

    if (task.output != null) {
      task.input = task.output;
      task.output = null;
    }

    task._isFinish = false;

    this._flow(0, task);
  },
  _flow: function _flow(index, task) {
    var self = this;
    var pipe = this.pipes[index];
    pipe(task, function (result) {
      if (result) {
        task._isFinish = true;
        task.onComplete && task.onComplete(result);
      } else {
        index++;

        if (index < self.pipes.length) {
          // move output to input
          task.input = task.output;
          task.output = null;

          self._flow(index, task);
        } else {
          task._isFinish = true;
          task.onComplete && task.onComplete(result, task.output);
        }
      }
    });
  }
};
module.exports = Pipeline;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHBpcGVsaW5lLmpzIl0sIm5hbWVzIjpbIlRhc2siLCJyZXF1aXJlIiwiX3BpcGVsaW5lSWQiLCJQaXBlbGluZSIsIm5hbWUiLCJmdW5jcyIsIkFycmF5IiwiaXNBcnJheSIsImNjIiwid2FybiIsImlkIiwicGlwZXMiLCJpIiwibCIsImxlbmd0aCIsInB1c2giLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImluc2VydCIsImZ1bmMiLCJpbmRleCIsIndhcm5JRCIsInNwbGljZSIsImFwcGVuZCIsInJlbW92ZSIsInN5bmMiLCJ0YXNrIiwib3V0cHV0IiwiaW5wdXQiLCJfaXNGaW5pc2giLCJwaXBlIiwicmVzdWx0IiwiYXN5bmMiLCJfZmxvdyIsInNlbGYiLCJvbkNvbXBsZXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUVBLElBQUlDLFdBQVcsR0FBRyxDQUFsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTQyxRQUFULENBQW1CQyxJQUFuQixFQUF5QkMsS0FBekIsRUFBZ0M7QUFDNUIsTUFBSSxDQUFDQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBZCxDQUFMLEVBQTJCO0FBQ3ZCRyxJQUFBQSxFQUFFLENBQUNDLElBQUgsQ0FBUSx3QkFBUjtBQUNBO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0ksT0FBS0MsRUFBTCxHQUFVUixXQUFXLEVBQXJCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0UsSUFBTCxHQUFZQSxJQUFaO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS08sS0FBTCxHQUFhLEVBQWI7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdSLEtBQUssQ0FBQ1MsTUFBMUIsRUFBa0NGLENBQUMsR0FBR0MsQ0FBdEMsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDMUMsUUFBSSxPQUFPUCxLQUFLLENBQUNPLENBQUQsQ0FBWixLQUFvQixVQUF4QixFQUFvQztBQUNoQyxXQUFLRCxLQUFMLENBQVdJLElBQVgsQ0FBZ0JWLEtBQUssQ0FBQ08sQ0FBRCxDQUFyQjtBQUNIO0FBQ0o7QUFFSjs7QUFFRFQsUUFBUSxDQUFDYSxTQUFULEdBQXFCO0FBR2pCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFdBQVcsRUFBRWQsUUFsQ0k7O0FBb0NqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWUsRUFBQUEsTUE1RGlCLGtCQTREVEMsSUE1RFMsRUE0REhDLEtBNURHLEVBNERJO0FBQ2pCLFFBQUksT0FBT0QsSUFBUCxLQUFnQixVQUFoQixJQUE4QkMsS0FBSyxHQUFHLEtBQUtULEtBQUwsQ0FBV0csTUFBckQsRUFBNkQ7QUFDekROLE1BQUFBLEVBQUUsQ0FBQ2EsTUFBSCxDQUFVLElBQVY7QUFDQTtBQUNIOztBQUVELFNBQUtWLEtBQUwsQ0FBV1csTUFBWCxDQUFrQkYsS0FBbEIsRUFBeUIsQ0FBekIsRUFBNEJELElBQTVCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsR0FwRWdCOztBQXVFakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSSxFQUFBQSxNQTlGaUIsa0JBOEZUSixJQTlGUyxFQThGSDtBQUNWLFFBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QjtBQUNIOztBQUVELFNBQUtSLEtBQUwsQ0FBV0ksSUFBWCxDQUFnQkksSUFBaEI7QUFDQSxXQUFPLElBQVA7QUFDSCxHQXJHZ0I7O0FBdUdqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUssRUFBQUEsTUE1SGlCLGtCQTRIVEosS0E1SFMsRUE0SEY7QUFDWCxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDM0I7QUFDSDs7QUFFRCxTQUFLVCxLQUFMLENBQVdXLE1BQVgsQ0FBa0JGLEtBQWxCLEVBQXlCLENBQXpCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsR0FuSWdCOztBQXFJakI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSyxFQUFBQSxJQTVKaUIsZ0JBNEpYQyxJQTVKVyxFQTRKTDtBQUNSLFFBQUlmLEtBQUssR0FBRyxLQUFLQSxLQUFqQjtBQUNBLFFBQUksRUFBRWUsSUFBSSxZQUFZMUIsSUFBbEIsS0FBMkJXLEtBQUssQ0FBQ0csTUFBTixLQUFpQixDQUFoRCxFQUFtRDs7QUFDbkQsUUFBSVksSUFBSSxDQUFDQyxNQUFMLElBQWUsSUFBbkIsRUFBeUI7QUFDckJELE1BQUFBLElBQUksQ0FBQ0UsS0FBTCxHQUFhRixJQUFJLENBQUNDLE1BQWxCO0FBQ0FELE1BQUFBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLElBQWQ7QUFDSDs7QUFDREQsSUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCLEtBQWpCOztBQUNBLFNBQUssSUFBSWpCLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR0YsS0FBSyxDQUFDRyxNQUExQixFQUFrQ0YsQ0FBQyxHQUFHQyxDQUF0QyxHQUEwQztBQUN0QyxVQUFJaUIsSUFBSSxHQUFHbkIsS0FBSyxDQUFDQyxDQUFELENBQWhCO0FBQ0EsVUFBSW1CLE1BQU0sR0FBR0QsSUFBSSxDQUFDSixJQUFELENBQWpCOztBQUNBLFVBQUlLLE1BQUosRUFBWTtBQUNSTCxRQUFBQSxJQUFJLENBQUNHLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxlQUFPRSxNQUFQO0FBQ0g7O0FBQ0RuQixNQUFBQSxDQUFDOztBQUNELFVBQUlBLENBQUMsS0FBS0MsQ0FBVixFQUFhO0FBQ1RhLFFBQUFBLElBQUksQ0FBQ0UsS0FBTCxHQUFhRixJQUFJLENBQUNDLE1BQWxCO0FBQ0FELFFBQUFBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLElBQWQ7QUFDSDtBQUNKOztBQUNERCxJQUFBQSxJQUFJLENBQUNHLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxXQUFPSCxJQUFJLENBQUNDLE1BQVo7QUFDSCxHQW5MZ0I7O0FBcUxqQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJSyxFQUFBQSxLQTNNaUIsaUJBMk1WTixJQTNNVSxFQTJNSjtBQUNULFFBQUlmLEtBQUssR0FBRyxLQUFLQSxLQUFqQjtBQUNBLFFBQUksRUFBRWUsSUFBSSxZQUFZMUIsSUFBbEIsS0FBMkJXLEtBQUssQ0FBQ0csTUFBTixLQUFpQixDQUFoRCxFQUFtRDs7QUFDbkQsUUFBSVksSUFBSSxDQUFDQyxNQUFMLElBQWUsSUFBbkIsRUFBeUI7QUFDckJELE1BQUFBLElBQUksQ0FBQ0UsS0FBTCxHQUFhRixJQUFJLENBQUNDLE1BQWxCO0FBQ0FELE1BQUFBLElBQUksQ0FBQ0MsTUFBTCxHQUFjLElBQWQ7QUFDSDs7QUFDREQsSUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCLEtBQWpCOztBQUNBLFNBQUtJLEtBQUwsQ0FBVyxDQUFYLEVBQWNQLElBQWQ7QUFDSCxHQXBOZ0I7QUFzTmpCTyxFQUFBQSxLQXROaUIsaUJBc05WYixLQXROVSxFQXNOSE0sSUF0TkcsRUFzTkc7QUFDaEIsUUFBSVEsSUFBSSxHQUFHLElBQVg7QUFDQSxRQUFJSixJQUFJLEdBQUcsS0FBS25CLEtBQUwsQ0FBV1MsS0FBWCxDQUFYO0FBQ0FVLElBQUFBLElBQUksQ0FBQ0osSUFBRCxFQUFPLFVBQVVLLE1BQVYsRUFBa0I7QUFDekIsVUFBSUEsTUFBSixFQUFZO0FBQ1JMLFFBQUFBLElBQUksQ0FBQ0csU0FBTCxHQUFpQixJQUFqQjtBQUNBSCxRQUFBQSxJQUFJLENBQUNTLFVBQUwsSUFBbUJULElBQUksQ0FBQ1MsVUFBTCxDQUFnQkosTUFBaEIsQ0FBbkI7QUFDSCxPQUhELE1BSUs7QUFDRFgsUUFBQUEsS0FBSzs7QUFDTCxZQUFJQSxLQUFLLEdBQUdjLElBQUksQ0FBQ3ZCLEtBQUwsQ0FBV0csTUFBdkIsRUFBK0I7QUFDM0I7QUFDQVksVUFBQUEsSUFBSSxDQUFDRSxLQUFMLEdBQWFGLElBQUksQ0FBQ0MsTUFBbEI7QUFDQUQsVUFBQUEsSUFBSSxDQUFDQyxNQUFMLEdBQWMsSUFBZDs7QUFDQU8sVUFBQUEsSUFBSSxDQUFDRCxLQUFMLENBQVdiLEtBQVgsRUFBa0JNLElBQWxCO0FBQ0gsU0FMRCxNQU1LO0FBQ0RBLFVBQUFBLElBQUksQ0FBQ0csU0FBTCxHQUFpQixJQUFqQjtBQUNBSCxVQUFBQSxJQUFJLENBQUNTLFVBQUwsSUFBbUJULElBQUksQ0FBQ1MsVUFBTCxDQUFnQkosTUFBaEIsRUFBd0JMLElBQUksQ0FBQ0MsTUFBN0IsQ0FBbkI7QUFDSDtBQUNKO0FBQ0osS0FsQkcsQ0FBSjtBQW1CSDtBQTVPZ0IsQ0FBckI7QUErT0FTLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxDLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqL1xyXG5cclxuY29uc3QgVGFzayA9IHJlcXVpcmUoJy4vdGFzaycpO1xyXG5cclxudmFyIF9waXBlbGluZUlkID0gMDtcclxuLyoqXHJcbiAqICEjZW5cclxuICogUGlwZWxpbmUgY2FuIGV4ZWN1dGUgdGhlIHRhc2sgZm9yIHNvbWUgZWZmZWN0LlxyXG4gKiBcclxuICogISN6aFxyXG4gKiDnrqHnur/og73miafooYzku7vliqHovr7liLDmn5DkuKrmlYjmnpxcclxuICogXHJcbiAqIEBjbGFzcyBQaXBlbGluZVxyXG4gKi9cclxuZnVuY3Rpb24gUGlwZWxpbmUgKG5hbWUsIGZ1bmNzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZnVuY3MpKSB7XHJcbiAgICAgICAgY2Mud2FybignZnVuY3MgbXVzdCBiZSBhbiBhcnJheScpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGlkIG9mIHBpcGVsaW5lXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOeuoee6v+eahCBpZFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgaWRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWQgPSBfcGlwZWxpbmVJZCsrO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIG5hbWUgb2YgcGlwZWxpbmVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog566h57q/55qE5ZCN5a2XXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBuYW1lXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQWxsIHBpcGVzIG9mIHBpcGVsaW5lXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOaJgOacieeahOeuoemBk1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgcGlwZXNcclxuICAgICAqIEB0eXBlIHtGdW5jdGlvbltdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnBpcGVzID0gW107XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBmdW5jcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZ1bmNzW2ldID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlwZXMucHVzaChmdW5jc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuUGlwZWxpbmUucHJvdG90eXBlID0ge1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENyZWF0ZSBhIG5ldyBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDliJvlu7rkuIDkuKrnrqHnur9cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiBwaXBlbGluZVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBmdW5jcyAtIFRoZSBhcnJheSBvZiBwaXBlLCBldmVyeSBwaXBlIG11c3QgYmUgZnVuY3Rpb24gd2hpY2ggdGFrZSB0d28gcGFyYW1ldGVycywgdGhlIGZpcnN0IGlzIGEgYFRhc2tgIGZsb3dlZCBpbiBwaXBlbGluZSwgdGhlIHNlY29uZCBpcyBjb21wbGV0ZSBjYWxsYmFja1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCdkb3dubG9hZCcsIFtcclxuICAgICAqICh0YXNrLCBkb25lKSA9PiB7XHJcbiAgICAgKiAgICAgIHZhciB1cmwgPSB0YXNrLmlucHV0O1xyXG4gICAgICogICAgICBjYy5hc3NldE1hbmFnZXIuZG93bmxvYWRlci5kb3dubG9hZEZpbGUodXJsLCBudWxsLCBudWxsLCAoZXJyLCByZXN1bHQpID0+IHtcclxuICAgICAqICAgICAgICAgIHRhc2sub3V0cHV0ID0gcmVzdWx0O1xyXG4gICAgICogICAgICAgICAgZG9uZShlcnIpO1xyXG4gICAgICogICAgICB9KTtcclxuICAgICAqIH0sXHJcbiAgICAgKiAodGFzaywgZG9uZSkgPT4ge1xyXG4gICAgICogICAgICB2YXIgdGV4dCA9IHRhc2suaW5wdXQ7XHJcbiAgICAgKiAgICAgIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkodGV4dCk7XHJcbiAgICAgKiAgICAgIHRhc2sub3V0cHV0ID0ganNvbjtcclxuICAgICAqICAgICAgZG9uZSgpO1xyXG4gICAgICogfVxyXG4gICAgICogXSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGZ1bmNzOiBBcnJheTwodGFzazogVGFzaywgZG9uZT86IChlcnI6IEVycm9yKSA9PiB2b2lkKSA9PiB2b2lkPilcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3I6IFBpcGVsaW5lLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQXQgc3BlY2lmaWMgcG9pbnQgaW5zZXJ0IGEgbmV3IHBpcGUgdG8gcGlwZWxpbmVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Zyo5p+Q5Liq54m55a6a55qE54K55Li6566h57q/5o+S5YWl5LiA5Liq5paw55qEIHBpcGVcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBpbnNlcnRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgbmV3IHBpcGVcclxuICAgICAqIEBwYXJhbSB7VGFza30gZnVuYy50YXNrIC0gVGhlIHRhc2sgaGFuZGxlZCB3aXRoIHBpcGVsaW5lIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gdGhpcyBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2Z1bmMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgeW91IG5lZWQgdG8gaW52b2tlIG1hbnVhbGx5IHdoZW4gdGhpcyBwaXBlIGlzIGZpbmlzaGVkLiBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIGNhbGxiYWNrIGlzIHVubmVjZXNzYXJ5LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIHNwZWNpZmljIHBvaW50IHlvdSB3YW50IHRvIGluc2VydCBhdC5cclxuICAgICAqIEByZXR1cm4ge1BpcGVsaW5lfSBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCd0ZXN0JywgW10pO1xyXG4gICAgICogcGlwZWxpbmUuaW5zZXJ0KCh0YXNrLCBkb25lKSA9PiB7XHJcbiAgICAgKiAgICAgIC8vIGRvIHNvbWV0aGluZ1xyXG4gICAgICogICAgICBkb25lKCk7XHJcbiAgICAgKiB9LCAwKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGluc2VydChmdW5jOiAodGFzazogVGFzaywgY2FsbGJhY2s/OiAoZXJyOiBFcnJvcikgPT4gdm9pZCkgPT4gdm9pZCwgaW5kZXg6IG51bWJlcik6IFBpcGVsaW5lXHJcbiAgICAgKi9cclxuICAgIGluc2VydCAoZnVuYywgaW5kZXgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicgfHwgaW5kZXggPiB0aGlzLnBpcGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYy53YXJuSUQoNDkyMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLnBpcGVzLnNwbGljZShpbmRleCwgMCwgZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEFwcGVuZCBhIG5ldyBwaXBlIHRvIHRoZSBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmt7vliqDkuIDkuKrnrqHpgZPliLDnrqHnur/kuK1cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBhcHBlbmRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgbmV3IHBpcGVcclxuICAgICAqIEBwYXJhbSB7VGFza30gZnVuYy50YXNrIC0gVGhlIHRhc2sgaGFuZGxlZCB3aXRoIHBpcGVsaW5lIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gdGhpcyBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2Z1bmMuY2FsbGJhY2tdIC0gQ2FsbGJhY2sgeW91IG5lZWQgdG8gaW52b2tlIG1hbnVhbGx5IHdoZW4gdGhpcyBwaXBlIGlzIGZpbmlzaGVkLiBpZiB0aGUgcGlwZWxpbmUgaXMgc3luY2hyb25vdXMsIGNhbGxiYWNrIGlzIHVubmVjZXNzYXJ5LlxyXG4gICAgICogQHJldHVybiB7UGlwZWxpbmV9IHBpcGVsaW5lXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgcGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ3Rlc3QnLCBbXSk7XHJcbiAgICAgKiBwaXBlbGluZS5hcHBlbmQoKHRhc2ssIGRvbmUpID0+IHtcclxuICAgICAqICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgKiAgICAgIGRvbmUoKTtcclxuICAgICAqIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogYXBwZW5kKGZ1bmM6ICh0YXNrOiBUYXNrLCBjYWxsYmFjaz86IChlcnI6IEVycm9yKSA9PiB2b2lkKSA9PiB2b2lkKTogUGlwZWxpbmVcclxuICAgICAqL1xyXG4gICAgYXBwZW5kIChmdW5jKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB0aGlzLnBpcGVzLnB1c2goZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVtb3ZlIHBpcGUgd2hpY2ggYXQgc3BlY2lmaWMgcG9pbnRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog56e76Zmk54m55a6a5L2N572u55qE566h6YGTXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBUaGUgc3BlY2lmaWMgcG9pbnRcclxuICAgICAqIEByZXR1cm4ge1BpcGVsaW5lfSBwaXBlbGluZVxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCd0ZXN0JywgKHRhc2ssIGRvbmUpID0+IHtcclxuICAgICAqICAgICAgLy8gZG8gc29tZXRoaW5nXHJcbiAgICAgKiAgICAgIGRvbmUoKTsgIFxyXG4gICAgICogfSk7XHJcbiAgICAgKiBwaXBlbGluZS5yZW1vdmUoMCk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZW1vdmUoaW5kZXg6IG51bWJlcik6IFBpcGVsaW5lXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZSAoaW5kZXgpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdGhpcy5waXBlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEV4ZWN1dGUgdGFzayBzeW5jaHJvbm91c2x5XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWQjOatpeaJp+ihjOS7u+WKoVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHN5bmNcclxuICAgICAqIEBwYXJhbSB7VGFza30gdGFzayAtIFRoZSB0YXNrIHdpbGwgYmUgZXhlY3V0ZWRcclxuICAgICAqIEByZXR1cm5zIHsqfSByZXN1bHRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBwaXBlbGluZSA9IG5ldyBQaXBlbGluZSgnc3luYycsIFsodGFzaykgPT4ge1xyXG4gICAgICogICAgICBsZXQgaW5wdXQgPSB0YXNrLmlucHV0O1xyXG4gICAgICogICAgICB0YXNrLm91dHB1dCA9IGRvU29tZXRoaW5nKHRhc2suaW5wdXQpO1xyXG4gICAgICogfV0pO1xyXG4gICAgICogXHJcbiAgICAgKiB2YXIgdGFzayA9IG5ldyBUYXNrKHtpbnB1dDogJ3Rlc3QnfSk7XHJcbiAgICAgKiBjb25zb2xlLmxvZyhwaXBlbGluZS5zeW5jKHRhc2spKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHN5bmModGFzazogVGFzayk6IGFueSBcclxuICAgICAqL1xyXG4gICAgc3luYyAodGFzaykge1xyXG4gICAgICAgIHZhciBwaXBlcyA9IHRoaXMucGlwZXM7XHJcbiAgICAgICAgaWYgKCEodGFzayBpbnN0YW5jZW9mIFRhc2spIHx8IHBpcGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0YXNrLm91dHB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRhc2suaW5wdXQgPSB0YXNrLm91dHB1dDtcclxuICAgICAgICAgICAgdGFzay5vdXRwdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGlwZXMubGVuZ3RoOyBpIDwgbDspIHtcclxuICAgICAgICAgICAgdmFyIHBpcGUgPSBwaXBlc1tpXTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHBpcGUodGFzayk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRhc2suX2lzRmluaXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICBpZiAoaSAhPT0gbCkge1xyXG4gICAgICAgICAgICAgICAgdGFzay5pbnB1dCA9IHRhc2sub3V0cHV0O1xyXG4gICAgICAgICAgICAgICAgdGFzay5vdXRwdXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhc2suX2lzRmluaXNoID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGFzay5vdXRwdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRXhlY3V0ZSB0YXNrIGFzeW5jaHJvbm91c2x5XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOW8guatpeaJp+ihjOS7u+WKoVxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGFzeW5jXHJcbiAgICAgKiBAcGFyYW0ge1Rhc2t9IHRhc2sgLSBUaGUgdGFzayB3aWxsIGJlIGV4ZWN1dGVkXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgcGlwZWxpbmUgPSBuZXcgUGlwZWxpbmUoJ3N5bmMnLCBbKHRhc2ssIGRvbmUpID0+IHtcclxuICAgICAqICAgICAgbGV0IGlucHV0ID0gdGFzay5pbnB1dDtcclxuICAgICAqICAgICAgdGFzay5vdXRwdXQgPSBkb1NvbWV0aGluZyh0YXNrLmlucHV0KTtcclxuICAgICAqICAgICAgZG9uZSgpO1xyXG4gICAgICogfV0pO1xyXG4gICAgICogdmFyIHRhc2sgPSBuZXcgVGFzayh7aW5wdXQ6ICd0ZXN0Jywgb25Db21wbGV0ZTogKGVyciwgcmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHQpfSk7XHJcbiAgICAgKiBwaXBlbGluZS5hc3luYyh0YXNrKTtcclxuICAgICAqICBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBhc3luYyh0YXNrOiBUYXNrKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBhc3luYyAodGFzaykge1xyXG4gICAgICAgIHZhciBwaXBlcyA9IHRoaXMucGlwZXM7XHJcbiAgICAgICAgaWYgKCEodGFzayBpbnN0YW5jZW9mIFRhc2spIHx8IHBpcGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0YXNrLm91dHB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRhc2suaW5wdXQgPSB0YXNrLm91dHB1dDtcclxuICAgICAgICAgICAgdGFzay5vdXRwdXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2Zsb3coMCwgdGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9mbG93IChpbmRleCwgdGFzaykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgcGlwZSA9IHRoaXMucGlwZXNbaW5kZXhdO1xyXG4gICAgICAgIHBpcGUodGFzaywgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YXNrLm9uQ29tcGxldGUgJiYgdGFzay5vbkNvbXBsZXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgc2VsZi5waXBlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIG91dHB1dCB0byBpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2suaW5wdXQgPSB0YXNrLm91dHB1dDtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrLm91dHB1dCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fZmxvdyhpbmRleCwgdGFzayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrLl9pc0ZpbmlzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzay5vbkNvbXBsZXRlICYmIHRhc2sub25Db21wbGV0ZShyZXN1bHQsIHRhc2sub3V0cHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQaXBlbGluZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=