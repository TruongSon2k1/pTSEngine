
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/types.js';
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
var WrapModeMask = {
  Loop: 1 << 1,
  ShouldWrap: 1 << 2,
  // Reserved: 1 << 3,
  PingPong: 1 << 4 | 1 << 1 | 1 << 2,
  // Loop, ShouldWrap
  Reverse: 1 << 5 | 1 << 2 // ShouldWrap

};
/**
 * !#en Specifies how time is treated when it is outside of the keyframe range of an Animation.
 * !#zh 动画使用的循环模式。
 * @enum WrapMode
 * @memberof cc
 */

var WrapMode = cc.Enum({
  /**
   * !#en Reads the default wrap mode set higher up.
   * !#zh 向 Animation Component 或者 AnimationClip 查找 wrapMode
   * @property {Number} Default
   */
  Default: 0,

  /**
   * !#en All iterations are played as specified.
   * !#zh 动画只播放一遍
   * @property {Number} Normal
   */
  Normal: 1,

  /**
   * !#en All iterations are played in the reverse direction from the way they are specified.
   * !#zh 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
   * @property {Number} Reverse
   */
  Reverse: WrapModeMask.Reverse,

  /**
   * !#en When time reaches the end of the animation, time will continue at the beginning.
   * !#zh 循环播放
   * @property {Number} Loop
   */
  Loop: WrapModeMask.Loop,

  /**
   * !#en All iterations are played in the reverse direction from the way they are specified.
   * And when time reaches the start of the animation, time will continue at the ending.
   * !#zh 反向循环播放
   * @property {Number} LoopReverse
   */
  LoopReverse: WrapModeMask.Loop | WrapModeMask.Reverse,

  /**
   * !#en Even iterations are played as specified, odd iterations are played in the reverse direction from the way they
   * are specified.
   * !#zh 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧后再正向播放，如此循环
   * @property {Number} PingPong
   */
  PingPong: WrapModeMask.PingPong,

  /**
   * !#en Even iterations are played in the reverse direction from the way they are specified, odd iterations are played
   * as specified.
   * !#zh 从最后一帧开始反向播放，其他同 PingPong
   * @property {Number} PingPongReverse
   */
  PingPongReverse: WrapModeMask.PingPong | WrapModeMask.Reverse
});
cc.WrapMode = WrapMode; // For internal

function WrappedInfo(info) {
  if (info) {
    this.set(info);
    return;
  }

  this.ratio = 0;
  this.time = 0;
  this.direction = 1;
  this.stopped = true;
  this.iterations = 0;
  this.frameIndex = undefined;
}

WrappedInfo.prototype.set = function (info) {
  this.ratio = info.ratio;
  this.time = info.time;
  this.direction = info.direction;
  this.stopped = info.stopped;
  this.iterations = info.iterations;
  this.frameIndex = info.frameIndex;
};

module.exports = {
  WrapModeMask: WrapModeMask,
  WrapMode: WrapMode,
  WrappedInfo: WrappedInfo
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcdHlwZXMuanMiXSwibmFtZXMiOlsiV3JhcE1vZGVNYXNrIiwiTG9vcCIsIlNob3VsZFdyYXAiLCJQaW5nUG9uZyIsIlJldmVyc2UiLCJXcmFwTW9kZSIsImNjIiwiRW51bSIsIkRlZmF1bHQiLCJOb3JtYWwiLCJMb29wUmV2ZXJzZSIsIlBpbmdQb25nUmV2ZXJzZSIsIldyYXBwZWRJbmZvIiwiaW5mbyIsInNldCIsInJhdGlvIiwidGltZSIsImRpcmVjdGlvbiIsInN0b3BwZWQiLCJpdGVyYXRpb25zIiwiZnJhbWVJbmRleCIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxZQUFZLEdBQUc7QUFDZkMsRUFBQUEsSUFBSSxFQUFFLEtBQUssQ0FESTtBQUVmQyxFQUFBQSxVQUFVLEVBQUUsS0FBSyxDQUZGO0FBR2Y7QUFDQUMsRUFBQUEsUUFBUSxFQUFFLEtBQUssQ0FBTCxHQUFTLEtBQUssQ0FBZCxHQUFrQixLQUFLLENBSmxCO0FBSXNCO0FBQ3JDQyxFQUFBQSxPQUFPLEVBQUUsS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUxSLENBS2dCOztBQUxoQixDQUFuQjtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBRW5CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsT0FBTyxFQUFFLENBUFU7O0FBU25CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFLENBZFc7O0FBZ0JuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lMLEVBQUFBLE9BQU8sRUFBRUosWUFBWSxDQUFDSSxPQXJCSDs7QUF1Qm5CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUgsRUFBQUEsSUFBSSxFQUFFRCxZQUFZLENBQUNDLElBNUJBOztBQThCbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lTLEVBQUFBLFdBQVcsRUFBRVYsWUFBWSxDQUFDQyxJQUFiLEdBQW9CRCxZQUFZLENBQUNJLE9BcEMzQjs7QUFzQ25CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJRCxFQUFBQSxRQUFRLEVBQUVILFlBQVksQ0FBQ0csUUE1Q0o7O0FBOENuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSVEsRUFBQUEsZUFBZSxFQUFFWCxZQUFZLENBQUNHLFFBQWIsR0FBd0JILFlBQVksQ0FBQ0k7QUFwRG5DLENBQVIsQ0FBZjtBQXVEQUUsRUFBRSxDQUFDRCxRQUFILEdBQWNBLFFBQWQsRUFFQTs7QUFDQSxTQUFTTyxXQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUN4QixNQUFJQSxJQUFKLEVBQVU7QUFDTixTQUFLQyxHQUFMLENBQVNELElBQVQ7QUFDQTtBQUNIOztBQUVELE9BQUtFLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQkMsU0FBbEI7QUFDSDs7QUFFRFQsV0FBVyxDQUFDVSxTQUFaLENBQXNCUixHQUF0QixHQUE0QixVQUFVRCxJQUFWLEVBQWdCO0FBQ3hDLE9BQUtFLEtBQUwsR0FBYUYsSUFBSSxDQUFDRSxLQUFsQjtBQUNBLE9BQUtDLElBQUwsR0FBWUgsSUFBSSxDQUFDRyxJQUFqQjtBQUNBLE9BQUtDLFNBQUwsR0FBaUJKLElBQUksQ0FBQ0ksU0FBdEI7QUFDQSxPQUFLQyxPQUFMLEdBQWVMLElBQUksQ0FBQ0ssT0FBcEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCTixJQUFJLENBQUNNLFVBQXZCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQlAsSUFBSSxDQUFDTyxVQUF2QjtBQUNILENBUEQ7O0FBU0FHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNieEIsRUFBQUEsWUFBWSxFQUFaQSxZQURhO0FBRWJLLEVBQUFBLFFBQVEsRUFBUkEsUUFGYTtBQUdiTyxFQUFBQSxXQUFXLEVBQVhBO0FBSGEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBXcmFwTW9kZU1hc2sgPSB7XHJcbiAgICBMb29wOiAxIDw8IDEsXHJcbiAgICBTaG91bGRXcmFwOiAxIDw8IDIsXHJcbiAgICAvLyBSZXNlcnZlZDogMSA8PCAzLFxyXG4gICAgUGluZ1Bvbmc6IDEgPDwgNCB8IDEgPDwgMSB8IDEgPDwgMiwgIC8vIExvb3AsIFNob3VsZFdyYXBcclxuICAgIFJldmVyc2U6IDEgPDwgNSB8IDEgPDwgMiwgICAgICAvLyBTaG91bGRXcmFwXHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBTcGVjaWZpZXMgaG93IHRpbWUgaXMgdHJlYXRlZCB3aGVuIGl0IGlzIG91dHNpZGUgb2YgdGhlIGtleWZyYW1lIHJhbmdlIG9mIGFuIEFuaW1hdGlvbi5cclxuICogISN6aCDliqjnlLvkvb/nlKjnmoTlvqrnjq/mqKHlvI/jgIJcclxuICogQGVudW0gV3JhcE1vZGVcclxuICogQG1lbWJlcm9mIGNjXHJcbiAqL1xyXG52YXIgV3JhcE1vZGUgPSBjYy5FbnVtKHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVhZHMgdGhlIGRlZmF1bHQgd3JhcCBtb2RlIHNldCBoaWdoZXIgdXAuXHJcbiAgICAgKiAhI3poIOWQkSBBbmltYXRpb24gQ29tcG9uZW50IOaIluiAhSBBbmltYXRpb25DbGlwIOafpeaJviB3cmFwTW9kZVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERlZmF1bHRcclxuICAgICAqL1xyXG4gICAgRGVmYXVsdDogMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWxsIGl0ZXJhdGlvbnMgYXJlIHBsYXllZCBhcyBzcGVjaWZpZWQuXHJcbiAgICAgKiAhI3poIOWKqOeUu+WPquaSreaUvuS4gOmBjVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE5vcm1hbFxyXG4gICAgICovXHJcbiAgICBOb3JtYWw6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFsbCBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uIGZyb20gdGhlIHdheSB0aGV5IGFyZSBzcGVjaWZpZWQuXHJcbiAgICAgKiAhI3poIOS7juacgOWQjuS4gOW4p+aIlue7k+adn+S9jee9ruW8gOWni+WPjeWQkeaSreaUvu+8jOWIsOesrOS4gOW4p+aIluW8gOWni+S9jee9ruWBnOatolxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJldmVyc2VcclxuICAgICAqL1xyXG4gICAgUmV2ZXJzZTogV3JhcE1vZGVNYXNrLlJldmVyc2UsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFdoZW4gdGltZSByZWFjaGVzIHRoZSBlbmQgb2YgdGhlIGFuaW1hdGlvbiwgdGltZSB3aWxsIGNvbnRpbnVlIGF0IHRoZSBiZWdpbm5pbmcuXHJcbiAgICAgKiAhI3poIOW+queOr+aSreaUvlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IExvb3BcclxuICAgICAqL1xyXG4gICAgTG9vcDogV3JhcE1vZGVNYXNrLkxvb3AsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFsbCBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uIGZyb20gdGhlIHdheSB0aGV5IGFyZSBzcGVjaWZpZWQuXHJcbiAgICAgKiBBbmQgd2hlbiB0aW1lIHJlYWNoZXMgdGhlIHN0YXJ0IG9mIHRoZSBhbmltYXRpb24sIHRpbWUgd2lsbCBjb250aW51ZSBhdCB0aGUgZW5kaW5nLlxyXG4gICAgICogISN6aCDlj43lkJHlvqrnjq/mkq3mlL5cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMb29wUmV2ZXJzZVxyXG4gICAgICovXHJcbiAgICBMb29wUmV2ZXJzZTogV3JhcE1vZGVNYXNrLkxvb3AgfCBXcmFwTW9kZU1hc2suUmV2ZXJzZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRXZlbiBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgYXMgc3BlY2lmaWVkLCBvZGQgaXRlcmF0aW9ucyBhcmUgcGxheWVkIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbiBmcm9tIHRoZSB3YXkgdGhleVxyXG4gICAgICogYXJlIHNwZWNpZmllZC5cclxuICAgICAqICEjemgg5LuO56ys5LiA5bin5pKt5pS+5Yiw5pyA5ZCO5LiA5bin77yM54S25ZCO5Y+N5ZCR5pKt5pS+5Zue56ys5LiA5bin77yM5Yiw56ys5LiA5bin5ZCO5YaN5q2j5ZCR5pKt5pS+77yM5aaC5q2k5b6q546vXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUGluZ1BvbmdcclxuICAgICAqL1xyXG4gICAgUGluZ1Bvbmc6IFdyYXBNb2RlTWFzay5QaW5nUG9uZyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRXZlbiBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uIGZyb20gdGhlIHdheSB0aGV5IGFyZSBzcGVjaWZpZWQsIG9kZCBpdGVyYXRpb25zIGFyZSBwbGF5ZWRcclxuICAgICAqIGFzIHNwZWNpZmllZC5cclxuICAgICAqICEjemgg5LuO5pyA5ZCO5LiA5bin5byA5aeL5Y+N5ZCR5pKt5pS+77yM5YW25LuW5ZCMIFBpbmdQb25nXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUGluZ1BvbmdSZXZlcnNlXHJcbiAgICAgKi9cclxuICAgIFBpbmdQb25nUmV2ZXJzZTogV3JhcE1vZGVNYXNrLlBpbmdQb25nIHwgV3JhcE1vZGVNYXNrLlJldmVyc2VcclxufSk7XHJcblxyXG5jYy5XcmFwTW9kZSA9IFdyYXBNb2RlO1xyXG5cclxuLy8gRm9yIGludGVybmFsXHJcbmZ1bmN0aW9uIFdyYXBwZWRJbmZvIChpbmZvKSB7XHJcbiAgICBpZiAoaW5mbykge1xyXG4gICAgICAgIHRoaXMuc2V0KGluZm8pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJhdGlvID0gMDtcclxuICAgIHRoaXMudGltZSA9IDA7XHJcbiAgICB0aGlzLmRpcmVjdGlvbiA9IDE7XHJcbiAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pdGVyYXRpb25zID0gMDtcclxuICAgIHRoaXMuZnJhbWVJbmRleCA9IHVuZGVmaW5lZDtcclxufVxyXG5cclxuV3JhcHBlZEluZm8ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICB0aGlzLnJhdGlvID0gaW5mby5yYXRpbztcclxuICAgIHRoaXMudGltZSA9IGluZm8udGltZTtcclxuICAgIHRoaXMuZGlyZWN0aW9uID0gaW5mby5kaXJlY3Rpb247XHJcbiAgICB0aGlzLnN0b3BwZWQgPSBpbmZvLnN0b3BwZWQ7XHJcbiAgICB0aGlzLml0ZXJhdGlvbnMgPSBpbmZvLml0ZXJhdGlvbnM7XHJcbiAgICB0aGlzLmZyYW1lSW5kZXggPSBpbmZvLmZyYW1lSW5kZXg7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFdyYXBNb2RlTWFzayxcclxuICAgIFdyYXBNb2RlLFxyXG4gICAgV3JhcHBlZEluZm9cclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=