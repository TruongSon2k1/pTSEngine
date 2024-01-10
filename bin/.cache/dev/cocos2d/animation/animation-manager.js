
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var js = cc.js;
var AnimationManager = cc.Class({
  ctor: function ctor() {
    this._anims = new js.array.MutableForwardIterator([]);
    this._delayEvents = [];
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
  },
  // for manager
  update: function update(dt) {
    var iterator = this._anims;
    var array = iterator.array;

    for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
      var anim = array[iterator.i];

      if (anim._isPlaying && !anim._isPaused) {
        anim.update(dt);
      }
    }

    var events = this._delayEvents;

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      event.target[event.func].apply(event.target, event.args);
    }

    events.length = 0;
  },
  destruct: function destruct() {},

  /**
   * @param {AnimationState} anim
   */
  addAnimation: function addAnimation(anim) {
    var index = this._anims.array.indexOf(anim);

    if (index === -1) {
      this._anims.push(anim);
    }
  },

  /**
   * @param {AnimationState} anim
   */
  removeAnimation: function removeAnimation(anim) {
    var index = this._anims.array.indexOf(anim);

    if (index >= 0) {
      this._anims.fastRemoveAt(index);
    } else {
      cc.errorID(3907);
    }
  },
  pushDelayEvent: function pushDelayEvent(target, func, args) {
    this._delayEvents.push({
      target: target,
      func: func,
      args: args
    });
  }
});
cc.AnimationManager = module.exports = AnimationManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcYW5pbWF0aW9uLW1hbmFnZXIuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIkFuaW1hdGlvbk1hbmFnZXIiLCJDbGFzcyIsImN0b3IiLCJfYW5pbXMiLCJhcnJheSIsIk11dGFibGVGb3J3YXJkSXRlcmF0b3IiLCJfZGVsYXlFdmVudHMiLCJkaXJlY3RvciIsIl9zY2hlZHVsZXIiLCJlbmFibGVGb3JUYXJnZXQiLCJ1cGRhdGUiLCJkdCIsIml0ZXJhdG9yIiwiaSIsImxlbmd0aCIsImFuaW0iLCJfaXNQbGF5aW5nIiwiX2lzUGF1c2VkIiwiZXZlbnRzIiwiZXZlbnQiLCJ0YXJnZXQiLCJmdW5jIiwiYXBwbHkiLCJhcmdzIiwiZGVzdHJ1Y3QiLCJhZGRBbmltYXRpb24iLCJpbmRleCIsImluZGV4T2YiLCJwdXNoIiwicmVtb3ZlQW5pbWF0aW9uIiwiZmFzdFJlbW92ZUF0IiwiZXJyb3JJRCIsInB1c2hEZWxheUV2ZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaO0FBRUEsSUFBSUUsZ0JBQWdCLEdBQUdELEVBQUUsQ0FBQ0UsS0FBSCxDQUFTO0FBQzVCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxNQUFMLEdBQWMsSUFBSUwsRUFBRSxDQUFDTSxLQUFILENBQVNDLHNCQUFiLENBQW9DLEVBQXBDLENBQWQ7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBRUFQLElBQUFBLEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxVQUFaLElBQTBCVCxFQUFFLENBQUNRLFFBQUgsQ0FBWUMsVUFBWixDQUF1QkMsZUFBdkIsQ0FBdUMsSUFBdkMsQ0FBMUI7QUFDSCxHQU4yQjtBQVE1QjtBQUVBQyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVDLEVBQVYsRUFBYztBQUNsQixRQUFJQyxRQUFRLEdBQUcsS0FBS1QsTUFBcEI7QUFDQSxRQUFJQyxLQUFLLEdBQUdRLFFBQVEsQ0FBQ1IsS0FBckI7O0FBQ0EsU0FBS1EsUUFBUSxDQUFDQyxDQUFULEdBQWEsQ0FBbEIsRUFBcUJELFFBQVEsQ0FBQ0MsQ0FBVCxHQUFhVCxLQUFLLENBQUNVLE1BQXhDLEVBQWdELEVBQUVGLFFBQVEsQ0FBQ0MsQ0FBM0QsRUFBOEQ7QUFDMUQsVUFBSUUsSUFBSSxHQUFHWCxLQUFLLENBQUNRLFFBQVEsQ0FBQ0MsQ0FBVixDQUFoQjs7QUFDQSxVQUFJRSxJQUFJLENBQUNDLFVBQUwsSUFBbUIsQ0FBQ0QsSUFBSSxDQUFDRSxTQUE3QixFQUF3QztBQUNwQ0YsUUFBQUEsSUFBSSxDQUFDTCxNQUFMLENBQVlDLEVBQVo7QUFDSDtBQUNKOztBQUVELFFBQUlPLE1BQU0sR0FBRyxLQUFLWixZQUFsQjs7QUFDQSxTQUFLLElBQUlPLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdLLE1BQU0sQ0FBQ0osTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDcEMsVUFBSU0sS0FBSyxHQUFHRCxNQUFNLENBQUNMLENBQUQsQ0FBbEI7QUFDQU0sTUFBQUEsS0FBSyxDQUFDQyxNQUFOLENBQWFELEtBQUssQ0FBQ0UsSUFBbkIsRUFBeUJDLEtBQXpCLENBQStCSCxLQUFLLENBQUNDLE1BQXJDLEVBQTZDRCxLQUFLLENBQUNJLElBQW5EO0FBQ0g7O0FBQ0RMLElBQUFBLE1BQU0sQ0FBQ0osTUFBUCxHQUFnQixDQUFoQjtBQUVILEdBM0IyQjtBQTZCNUJVLEVBQUFBLFFBQVEsRUFBRSxvQkFBWSxDQUFFLENBN0JJOztBQWdDNUI7QUFDSjtBQUNBO0FBQ0lDLEVBQUFBLFlBQVksRUFBRSxzQkFBVVYsSUFBVixFQUFnQjtBQUMxQixRQUFJVyxLQUFLLEdBQUcsS0FBS3ZCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQnVCLE9BQWxCLENBQTBCWixJQUExQixDQUFaOztBQUNBLFFBQUlXLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDZCxXQUFLdkIsTUFBTCxDQUFZeUIsSUFBWixDQUFpQmIsSUFBakI7QUFDSDtBQUNKLEdBeEMyQjs7QUEwQzVCO0FBQ0o7QUFDQTtBQUNJYyxFQUFBQSxlQUFlLEVBQUUseUJBQVVkLElBQVYsRUFBZ0I7QUFDN0IsUUFBSVcsS0FBSyxHQUFHLEtBQUt2QixNQUFMLENBQVlDLEtBQVosQ0FBa0J1QixPQUFsQixDQUEwQlosSUFBMUIsQ0FBWjs7QUFDQSxRQUFJVyxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaLFdBQUt2QixNQUFMLENBQVkyQixZQUFaLENBQXlCSixLQUF6QjtBQUNILEtBRkQsTUFHSztBQUNEM0IsTUFBQUEsRUFBRSxDQUFDZ0MsT0FBSCxDQUFXLElBQVg7QUFDSDtBQUNKLEdBckQyQjtBQXVENUJDLEVBQUFBLGNBQWMsRUFBRSx3QkFBVVosTUFBVixFQUFrQkMsSUFBbEIsRUFBd0JFLElBQXhCLEVBQThCO0FBQzFDLFNBQUtqQixZQUFMLENBQWtCc0IsSUFBbEIsQ0FBdUI7QUFDbkJSLE1BQUFBLE1BQU0sRUFBRUEsTUFEVztBQUVuQkMsTUFBQUEsSUFBSSxFQUFFQSxJQUZhO0FBR25CRSxNQUFBQSxJQUFJLEVBQUVBO0FBSGEsS0FBdkI7QUFLSDtBQTdEMkIsQ0FBVCxDQUF2QjtBQWlFQXhCLEVBQUUsQ0FBQ0MsZ0JBQUgsR0FBc0JpQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQyxnQkFBdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBqcyA9IGNjLmpzO1xyXG5cclxudmFyIEFuaW1hdGlvbk1hbmFnZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fYW5pbXMgPSBuZXcganMuYXJyYXkuTXV0YWJsZUZvcndhcmRJdGVyYXRvcihbXSk7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlFdmVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgY2MuZGlyZWN0b3IuX3NjaGVkdWxlciAmJiBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gZm9yIG1hbmFnZXJcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2FuaW1zO1xyXG4gICAgICAgIHZhciBhcnJheSA9IGl0ZXJhdG9yLmFycmF5O1xyXG4gICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xyXG4gICAgICAgICAgICB2YXIgYW5pbSA9IGFycmF5W2l0ZXJhdG9yLmldO1xyXG4gICAgICAgICAgICBpZiAoYW5pbS5faXNQbGF5aW5nICYmICFhbmltLl9pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgYW5pbS51cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZGVsYXlFdmVudHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBldmVudC50YXJnZXRbZXZlbnQuZnVuY10uYXBwbHkoZXZlbnQudGFyZ2V0LCBldmVudC5hcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXZlbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3RydWN0OiBmdW5jdGlvbiAoKSB7fSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0FuaW1hdGlvblN0YXRlfSBhbmltXHJcbiAgICAgKi9cclxuICAgIGFkZEFuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9hbmltcy5hcnJheS5pbmRleE9mKGFuaW0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbXMucHVzaChhbmltKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25TdGF0ZX0gYW5pbVxyXG4gICAgICovXHJcbiAgICByZW1vdmVBbmltYXRpb246IGZ1bmN0aW9uIChhbmltKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fYW5pbXMuYXJyYXkuaW5kZXhPZihhbmltKTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltcy5mYXN0UmVtb3ZlQXQoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgzOTA3KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHB1c2hEZWxheUV2ZW50OiBmdW5jdGlvbiAodGFyZ2V0LCBmdW5jLCBhcmdzKSB7XHJcbiAgICAgICAgdGhpcy5fZGVsYXlFdmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICAgICAgICBmdW5jOiBmdW5jLFxyXG4gICAgICAgICAgICBhcmdzOiBhcmdzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmNjLkFuaW1hdGlvbk1hbmFnZXIgPSBtb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbk1hbmFnZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9