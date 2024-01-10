
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-curves.js';
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
var bezierByTime = require('./bezier').bezierByTime;

var binarySearch = require('../core/utils/binary-search').binarySearchEpsilon;

var WrapModeMask = require('./types').WrapModeMask;

var WrappedInfo = require('./types').WrappedInfo;
/**
 * Compute a new ratio by curve type
 * @param {Number} ratio - The origin ratio
 * @param {Array|String} type - If it's Array, then ratio will be computed with bezierByTime. If it's string, then ratio will be computed with cc.easing function
 */


function computeRatioByType(ratio, type) {
  if (typeof type === 'string') {
    var func = cc.easing[type];

    if (func) {
      ratio = func(ratio);
    } else {
      cc.errorID(3906, type);
    }
  } else if (Array.isArray(type)) {
    // bezier curve
    ratio = bezierByTime(type, ratio);
  }

  return ratio;
} //
// 动画数据类，相当于 AnimationClip。
// 虽然叫做 AnimCurve，但除了曲线，可以保存任何类型的值。
//
// @class AnimCurve
//
//


var AnimCurve = cc.Class({
  name: 'cc.AnimCurve',
  //
  // @method sample
  // @param {number} time
  // @param {number} ratio - The normalized time specified as a number between 0.0 and 1.0 inclusive.
  // @param {AnimationState} state
  //
  sample: function sample(time, ratio, state) {},
  onTimeChangedManually: undefined
});
/**
 * 当每两帧之前的间隔都一样的时候可以使用此函数快速查找 index
 */

function quickFindIndex(ratios, ratio) {
  var length = ratios.length - 1;
  if (length === 0) return 0;
  var start = ratios[0];
  if (ratio < start) return 0;
  var end = ratios[length];
  if (ratio > end) return ~ratios.length;
  ratio = (ratio - start) / (end - start);
  var eachLength = 1 / length;
  var index = ratio / eachLength;
  var floorIndex = index | 0;
  var EPSILON = 1e-6;

  if (index - floorIndex < EPSILON) {
    return floorIndex;
  } else if (floorIndex + 1 - index < EPSILON) {
    return floorIndex + 1;
  }

  return ~(floorIndex + 1);
} //
//
// @class DynamicAnimCurve
//
// @extends AnimCurve
//


var DynamicAnimCurve = cc.Class({
  name: 'cc.DynamicAnimCurve',
  "extends": AnimCurve,
  ctor: function ctor() {
    // cache last frame index
    this._cachedIndex = 0;
  },
  properties: {
    // The object being animated.
    // @property target
    // @type {object}
    target: null,
    // The name of the property being animated.
    // @property prop
    // @type {string}
    prop: '',
    // The values of the keyframes. (y)
    // @property values
    // @type {any[]}
    values: [],
    // The keyframe ratio of the keyframe specified as a number between 0.0 and 1.0 inclusive. (x)
    // @property ratios
    // @type {number[]}
    ratios: [],
    // @property types
    // @param {object[]}
    // Each array item maybe type:
    // - [x, x, x, x]: Four control points for bezier
    // - null: linear
    types: []
  },
  _findFrameIndex: binarySearch,
  _lerp: undefined,
  _lerpNumber: function _lerpNumber(from, to, t) {
    return from + (to - from) * t;
  },
  _lerpObject: function _lerpObject(from, to, t) {
    return from.lerp(to, t);
  },
  _lerpQuat: function () {
    var out = cc.quat();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  _lerpVector2: function () {
    var out = cc.v2();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  _lerpVector3: function () {
    var out = cc.v3();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  sample: function sample(time, ratio, state) {
    var values = this.values;
    var ratios = this.ratios;
    var frameCount = ratios.length;

    if (frameCount === 0) {
      return;
    } // only need to refind frame index when ratio is out of range of last from ratio and to ratio.


    var shoudRefind = true;
    var cachedIndex = this._cachedIndex;

    if (cachedIndex < 0) {
      cachedIndex = ~cachedIndex;

      if (cachedIndex > 0 && cachedIndex < ratios.length) {
        var _fromRatio = ratios[cachedIndex - 1];
        var _toRatio = ratios[cachedIndex];

        if (ratio > _fromRatio && ratio < _toRatio) {
          shoudRefind = false;
        }
      }
    }

    if (shoudRefind) {
      this._cachedIndex = this._findFrameIndex(ratios, ratio);
    } // evaluate value


    var value;
    var index = this._cachedIndex;

    if (index < 0) {
      index = ~index;

      if (index <= 0) {
        value = values[0];
      } else if (index >= frameCount) {
        value = values[frameCount - 1];
      } else {
        var fromVal = values[index - 1];

        if (!this._lerp) {
          value = fromVal;
        } else {
          var fromRatio = ratios[index - 1];
          var toRatio = ratios[index];
          var type = this.types[index - 1];
          var ratioBetweenFrames = (ratio - fromRatio) / (toRatio - fromRatio);

          if (type) {
            ratioBetweenFrames = computeRatioByType(ratioBetweenFrames, type);
          } // calculate value


          var toVal = values[index];
          value = this._lerp(fromVal, toVal, ratioBetweenFrames);
        }
      }
    } else {
      value = values[index];
    }

    this.target[this.prop] = value;
  }
});
DynamicAnimCurve.Linear = null;

DynamicAnimCurve.Bezier = function (controlPoints) {
  return controlPoints;
};
/**
 * Event information,
 * @class EventInfo
 *
 */


var EventInfo = function EventInfo() {
  this.events = [];
};
/**
 * @param {Function} [func] event function
 * @param {Object[]} [params] event params
 */


EventInfo.prototype.add = function (func, params) {
  this.events.push({
    func: func || '',
    params: params || []
  });
};
/**
 *
 * @class EventAnimCurve
 *
 * @extends AnimCurve
 */


var EventAnimCurve = cc.Class({
  name: 'cc.EventAnimCurve',
  "extends": AnimCurve,
  properties: {
    /**
     * The object being animated.
     * @property target
     * @type {object}
     */
    target: null,

    /** The keyframe ratio of the keyframe specified as a number between 0.0 and 1.0 inclusive. (x)
     * @property ratios
     * @type {number[]}
     */
    ratios: [],

    /**
     * @property events
     * @type {EventInfo[]}
     */
    events: [],
    _wrappedInfo: {
      "default": function _default() {
        return new WrappedInfo();
      }
    },
    _lastWrappedInfo: null,
    _ignoreIndex: NaN
  },
  _wrapIterations: function _wrapIterations(iterations) {
    if (iterations - (iterations | 0) === 0) iterations -= 1;
    return iterations | 0;
  },
  sample: function sample(time, ratio, state) {
    var length = this.ratios.length;
    var currentWrappedInfo = state.getWrappedInfo(state.time, this._wrappedInfo);
    var direction = currentWrappedInfo.direction;
    var currentIndex = binarySearch(this.ratios, currentWrappedInfo.ratio);

    if (currentIndex < 0) {
      currentIndex = ~currentIndex - 1; // if direction is inverse, then increase index

      if (direction < 0) currentIndex += 1;
    }

    if (this._ignoreIndex !== currentIndex) {
      this._ignoreIndex = NaN;
    }

    currentWrappedInfo.frameIndex = currentIndex;

    if (!this._lastWrappedInfo) {
      this._fireEvent(currentIndex);

      this._lastWrappedInfo = new WrappedInfo(currentWrappedInfo);
      return;
    }

    var wrapMode = state.wrapMode;

    var currentIterations = this._wrapIterations(currentWrappedInfo.iterations);

    var lastWrappedInfo = this._lastWrappedInfo;

    var lastIterations = this._wrapIterations(lastWrappedInfo.iterations);

    var lastIndex = lastWrappedInfo.frameIndex;
    var lastDirection = lastWrappedInfo.direction;
    var interationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

    if (lastIndex === currentIndex && interationsChanged && length === 1) {
      this._fireEvent(0);
    } else if (lastIndex !== currentIndex || interationsChanged) {
      direction = lastDirection;

      do {
        if (lastIndex !== currentIndex) {
          if (direction === -1 && lastIndex === 0 && currentIndex > 0) {
            if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = length;
            }

            lastIterations++;
          } else if (direction === 1 && lastIndex === length - 1 && currentIndex < length - 1) {
            if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = -1;
            }

            lastIterations++;
          }

          if (lastIndex === currentIndex) break;
          if (lastIterations > currentIterations) break;
        }

        lastIndex += direction;
        cc.director.getAnimationManager().pushDelayEvent(this, '_fireEvent', [lastIndex]);
      } while (lastIndex !== currentIndex && lastIndex > -1 && lastIndex < length);
    }

    this._lastWrappedInfo.set(currentWrappedInfo);
  },
  _fireEvent: function _fireEvent(index) {
    if (index < 0 || index >= this.events.length || this._ignoreIndex === index) return;
    var eventInfo = this.events[index];
    var events = eventInfo.events;

    if (!this.target.isValid) {
      return;
    }

    var components = this.target._components;

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var funcName = event.func;

      for (var j = 0; j < components.length; j++) {
        var component = components[j];
        var func = component[funcName];
        if (func) func.apply(component, event.params);
      }
    }
  },
  onTimeChangedManually: function onTimeChangedManually(time, state) {
    this._lastWrappedInfo = null;
    this._ignoreIndex = NaN;
    var info = state.getWrappedInfo(time, this._wrappedInfo);
    var direction = info.direction;
    var frameIndex = binarySearch(this.ratios, info.ratio); // only ignore when time not on a frame index

    if (frameIndex < 0) {
      frameIndex = ~frameIndex - 1; // if direction is inverse, then increase index

      if (direction < 0) frameIndex += 1;
      this._ignoreIndex = frameIndex;
    }
  }
});

if (CC_TEST) {
  cc._Test.DynamicAnimCurve = DynamicAnimCurve;
  cc._Test.EventAnimCurve = EventAnimCurve;
  cc._Test.quickFindIndex = quickFindIndex;
}

module.exports = {
  AnimCurve: AnimCurve,
  DynamicAnimCurve: DynamicAnimCurve,
  EventAnimCurve: EventAnimCurve,
  EventInfo: EventInfo,
  computeRatioByType: computeRatioByType,
  quickFindIndex: quickFindIndex
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcYW5pbWF0aW9uLWN1cnZlcy5qcyJdLCJuYW1lcyI6WyJiZXppZXJCeVRpbWUiLCJyZXF1aXJlIiwiYmluYXJ5U2VhcmNoIiwiYmluYXJ5U2VhcmNoRXBzaWxvbiIsIldyYXBNb2RlTWFzayIsIldyYXBwZWRJbmZvIiwiY29tcHV0ZVJhdGlvQnlUeXBlIiwicmF0aW8iLCJ0eXBlIiwiZnVuYyIsImNjIiwiZWFzaW5nIiwiZXJyb3JJRCIsIkFycmF5IiwiaXNBcnJheSIsIkFuaW1DdXJ2ZSIsIkNsYXNzIiwibmFtZSIsInNhbXBsZSIsInRpbWUiLCJzdGF0ZSIsIm9uVGltZUNoYW5nZWRNYW51YWxseSIsInVuZGVmaW5lZCIsInF1aWNrRmluZEluZGV4IiwicmF0aW9zIiwibGVuZ3RoIiwic3RhcnQiLCJlbmQiLCJlYWNoTGVuZ3RoIiwiaW5kZXgiLCJmbG9vckluZGV4IiwiRVBTSUxPTiIsIkR5bmFtaWNBbmltQ3VydmUiLCJjdG9yIiwiX2NhY2hlZEluZGV4IiwicHJvcGVydGllcyIsInRhcmdldCIsInByb3AiLCJ2YWx1ZXMiLCJ0eXBlcyIsIl9maW5kRnJhbWVJbmRleCIsIl9sZXJwIiwiX2xlcnBOdW1iZXIiLCJmcm9tIiwidG8iLCJ0IiwiX2xlcnBPYmplY3QiLCJsZXJwIiwiX2xlcnBRdWF0Iiwib3V0IiwicXVhdCIsIl9sZXJwVmVjdG9yMiIsInYyIiwiX2xlcnBWZWN0b3IzIiwidjMiLCJmcmFtZUNvdW50Iiwic2hvdWRSZWZpbmQiLCJjYWNoZWRJbmRleCIsImZyb21SYXRpbyIsInRvUmF0aW8iLCJ2YWx1ZSIsImZyb21WYWwiLCJyYXRpb0JldHdlZW5GcmFtZXMiLCJ0b1ZhbCIsIkxpbmVhciIsIkJlemllciIsImNvbnRyb2xQb2ludHMiLCJFdmVudEluZm8iLCJldmVudHMiLCJwcm90b3R5cGUiLCJhZGQiLCJwYXJhbXMiLCJwdXNoIiwiRXZlbnRBbmltQ3VydmUiLCJfd3JhcHBlZEluZm8iLCJfbGFzdFdyYXBwZWRJbmZvIiwiX2lnbm9yZUluZGV4IiwiTmFOIiwiX3dyYXBJdGVyYXRpb25zIiwiaXRlcmF0aW9ucyIsImN1cnJlbnRXcmFwcGVkSW5mbyIsImdldFdyYXBwZWRJbmZvIiwiZGlyZWN0aW9uIiwiY3VycmVudEluZGV4IiwiZnJhbWVJbmRleCIsIl9maXJlRXZlbnQiLCJ3cmFwTW9kZSIsImN1cnJlbnRJdGVyYXRpb25zIiwibGFzdFdyYXBwZWRJbmZvIiwibGFzdEl0ZXJhdGlvbnMiLCJsYXN0SW5kZXgiLCJsYXN0RGlyZWN0aW9uIiwiaW50ZXJhdGlvbnNDaGFuZ2VkIiwiUGluZ1BvbmciLCJkaXJlY3RvciIsImdldEFuaW1hdGlvbk1hbmFnZXIiLCJwdXNoRGVsYXlFdmVudCIsInNldCIsImV2ZW50SW5mbyIsImlzVmFsaWQiLCJjb21wb25lbnRzIiwiX2NvbXBvbmVudHMiLCJpIiwiZXZlbnQiLCJmdW5jTmFtZSIsImoiLCJjb21wb25lbnQiLCJhcHBseSIsImluZm8iLCJDQ19URVNUIiwiX1Rlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsSUFBTUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFQLENBQW9CRCxZQUF6Qzs7QUFFQSxJQUFNRSxZQUFZLEdBQUdELE9BQU8sQ0FBQyw2QkFBRCxDQUFQLENBQXVDRSxtQkFBNUQ7O0FBQ0EsSUFBTUMsWUFBWSxHQUFHSCxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CRyxZQUF4Qzs7QUFDQSxJQUFNQyxXQUFXLEdBQUdKLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJJLFdBQXZDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsU0FBU0Msa0JB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OUQsSUFBckIsRUFBMkIsS0FBS3VELFlBQWhDLENBQVg7QUFDQSxRQUFJUSxTQUFTLEdBQUcwQixJQUFJLENBQUMxQixTQUFyQjtBQUNBLFFBQUlFLFVBQVUsR0FBR2xGLFlBQVksQ0FBQyxLQUFLc0IsTUFBTixFQUFjb0YsSUFBSSxDQUFDckcsS0FBbkIsQ0FBN0IsQ0FOMEMsQ0FRMUM7O0FBQ0EsUUFBSTZFLFVBQVUsR0FBRyxDQUFqQixFQUFvQjtBQUNoQkEsTUFBQUEsVUFBVSxHQUFHLENBQUNBLFVBQUQsR0FBYyxDQUEzQixDQURnQixDQUdoQjs7QUFDQSxVQUFJRixTQUFTLEdBQUcsQ0FBaEIsRUFBbUJFLFVBQVUsSUFBSSxDQUFkO0FBRW5CLFdBQUtSLFlBQUwsR0FBb0JRLFVBQXBCO0FBQ0g7QUFDSjtBQS9KeUIsQ0FBVCxDQUFyQjs7QUFtS0EsSUFBSXlCLE9BQUosRUFBYTtBQUNUbkcsRUFBQUEsRUFBRSxDQUFDb0csS0FBSCxDQUFTOUUsZ0JBQVQsR0FBNEJBLGdCQUE1QjtBQUNBdEIsRUFBQUEsRUFBRSxDQUFDb0csS0FBSCxDQUFTckMsY0FBVCxHQUEwQkEsY0FBMUI7QUFDQS9ELEVBQUFBLEVBQUUsQ0FBQ29HLEtBQUgsQ0FBU3ZGLGNBQVQsR0FBMEJBLGNBQTFCO0FBQ0g7O0FBRUR3RixNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYmpHLEVBQUFBLFNBQVMsRUFBRUEsU0FERTtBQUViaUIsRUFBQUEsZ0JBQWdCLEVBQUVBLGdCQUZMO0FBR2J5QyxFQUFBQSxjQUFjLEVBQUVBLGNBSEg7QUFJYk4sRUFBQUEsU0FBUyxFQUFFQSxTQUpFO0FBS2I3RCxFQUFBQSxrQkFBa0IsRUFBRUEsa0JBTFA7QUFNYmlCLEVBQUFBLGNBQWMsRUFBRUE7QUFOSCxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbmNvbnN0IGJlemllckJ5VGltZSA9IHJlcXVpcmUoJy4vYmV6aWVyJykuYmV6aWVyQnlUaW1lO1xyXG5cclxuY29uc3QgYmluYXJ5U2VhcmNoID0gcmVxdWlyZSgnLi4vY29yZS91dGlscy9iaW5hcnktc2VhcmNoJykuYmluYXJ5U2VhcmNoRXBzaWxvbjtcclxuY29uc3QgV3JhcE1vZGVNYXNrID0gcmVxdWlyZSgnLi90eXBlcycpLldyYXBNb2RlTWFzaztcclxuY29uc3QgV3JhcHBlZEluZm8gPSByZXF1aXJlKCcuL3R5cGVzJykuV3JhcHBlZEluZm87XHJcblxyXG4vKipcclxuICogQ29tcHV0ZSBhIG5ldyByYXRpbyBieSBjdXJ2ZSB0eXBlXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYXRpbyAtIFRoZSBvcmlnaW4gcmF0aW9cclxuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHR5cGUgLSBJZiBpdCdzIEFycmF5LCB0aGVuIHJhdGlvIHdpbGwgYmUgY29tcHV0ZWQgd2l0aCBiZXppZXJCeVRpbWUuIElmIGl0J3Mgc3RyaW5nLCB0aGVuIHJhdGlvIHdpbGwgYmUgY29tcHV0ZWQgd2l0aCBjYy5lYXNpbmcgZnVuY3Rpb25cclxuICovXHJcbmZ1bmN0aW9uIGNvbXB1dGVSYXRpb0J5VHlwZSAocmF0aW8sIHR5cGUpIHtcclxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICB2YXIgZnVuYyA9IGNjLmVhc2luZ1t0eXBlXTtcclxuICAgICAgICBpZiAoZnVuYykge1xyXG4gICAgICAgICAgICByYXRpbyA9IGZ1bmMocmF0aW8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgzOTA2LCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XHJcbiAgICAgICAgLy8gYmV6aWVyIGN1cnZlXHJcbiAgICAgICAgcmF0aW8gPSBiZXppZXJCeVRpbWUodHlwZSwgcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByYXRpbztcclxufVxyXG5cclxuLy9cclxuLy8g5Yqo55S75pWw5o2u57G777yM55u45b2T5LqOIEFuaW1hdGlvbkNsaXDjgIJcclxuLy8g6Jm954S25Y+r5YGaIEFuaW1DdXJ2Ze+8jOS9humZpOS6huabsue6v++8jOWPr+S7peS/neWtmOS7u+S9leexu+Wei+eahOWAvOOAglxyXG4vL1xyXG4vLyBAY2xhc3MgQW5pbUN1cnZlXHJcbi8vXHJcbi8vXHJcbnZhciBBbmltQ3VydmUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQW5pbUN1cnZlJyxcclxuXHJcbiAgICAvL1xyXG4gICAgLy8gQG1ldGhvZCBzYW1wbGVcclxuICAgIC8vIEBwYXJhbSB7bnVtYmVyfSB0aW1lXHJcbiAgICAvLyBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSBUaGUgbm9ybWFsaXplZCB0aW1lIHNwZWNpZmllZCBhcyBhIG51bWJlciBiZXR3ZWVuIDAuMCBhbmQgMS4wIGluY2x1c2l2ZS5cclxuICAgIC8vIEBwYXJhbSB7QW5pbWF0aW9uU3RhdGV9IHN0YXRlXHJcbiAgICAvL1xyXG4gICAgc2FtcGxlOiBmdW5jdGlvbiAodGltZSwgcmF0aW8sIHN0YXRlKSB7fSxcclxuXHJcbiAgICBvblRpbWVDaGFuZ2VkTWFudWFsbHk6IHVuZGVmaW5lZFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiDlvZPmr4/kuKTluKfkuYvliY3nmoTpl7TpmpTpg73kuIDmoLfnmoTml7blgJnlj6/ku6Xkvb/nlKjmraTlh73mlbDlv6vpgJ/mn6Xmib4gaW5kZXhcclxuICovXHJcbmZ1bmN0aW9uIHF1aWNrRmluZEluZGV4IChyYXRpb3MsIHJhdGlvKSB7XHJcbiAgICB2YXIgbGVuZ3RoID0gcmF0aW9zLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuIDA7XHJcblxyXG4gICAgdmFyIHN0YXJ0ID0gcmF0aW9zWzBdO1xyXG4gICAgaWYgKHJhdGlvIDwgc3RhcnQpIHJldHVybiAwO1xyXG5cclxuICAgIHZhciBlbmQgPSByYXRpb3NbbGVuZ3RoXTtcclxuICAgIGlmIChyYXRpbyA+IGVuZCkgcmV0dXJuIH5yYXRpb3MubGVuZ3RoO1xyXG5cclxuICAgIHJhdGlvID0gKHJhdGlvIC0gc3RhcnQpIC8gKGVuZCAtIHN0YXJ0KTtcclxuXHJcbiAgICB2YXIgZWFjaExlbmd0aCA9IDEgLyBsZW5ndGg7XHJcbiAgICB2YXIgaW5kZXggPSByYXRpbyAvIGVhY2hMZW5ndGg7XHJcbiAgICB2YXIgZmxvb3JJbmRleCA9IGluZGV4IHwgMDtcclxuICAgIHZhciBFUFNJTE9OID0gMWUtNjtcclxuXHJcbiAgICBpZiAoKGluZGV4IC0gZmxvb3JJbmRleCkgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIGZsb29ySW5kZXg7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgoZmxvb3JJbmRleCArIDEgLSBpbmRleCkgPCBFUFNJTE9OKSB7XHJcbiAgICAgICAgcmV0dXJuIGZsb29ySW5kZXggKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB+KGZsb29ySW5kZXggKyAxKTtcclxufVxyXG5cclxuLy9cclxuLy9cclxuLy8gQGNsYXNzIER5bmFtaWNBbmltQ3VydmVcclxuLy9cclxuLy8gQGV4dGVuZHMgQW5pbUN1cnZlXHJcbi8vXHJcbnZhciBEeW5hbWljQW5pbUN1cnZlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkR5bmFtaWNBbmltQ3VydmUnLFxyXG4gICAgZXh0ZW5kczogQW5pbUN1cnZlLFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIC8vIGNhY2hlIGxhc3QgZnJhbWUgaW5kZXhcclxuICAgICAgICB0aGlzLl9jYWNoZWRJbmRleCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICAgICAgLy8gVGhlIG9iamVjdCBiZWluZyBhbmltYXRlZC5cclxuICAgICAgICAvLyBAcHJvcGVydHkgdGFyZ2V0XHJcbiAgICAgICAgLy8gQHR5cGUge29iamVjdH1cclxuICAgICAgICB0YXJnZXQ6IG51bGwsXHJcblxyXG4gICAgICAgIC8vIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSBiZWluZyBhbmltYXRlZC5cclxuICAgICAgICAvLyBAcHJvcGVydHkgcHJvcFxyXG4gICAgICAgIC8vIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgcHJvcDogJycsXHJcblxyXG4gICAgICAgIC8vIFRoZSB2YWx1ZXMgb2YgdGhlIGtleWZyYW1lcy4gKHkpXHJcbiAgICAgICAgLy8gQHByb3BlcnR5IHZhbHVlc1xyXG4gICAgICAgIC8vIEB0eXBlIHthbnlbXX1cclxuICAgICAgICB2YWx1ZXM6IFtdLFxyXG5cclxuICAgICAgICAvLyBUaGUga2V5ZnJhbWUgcmF0aW8gb2YgdGhlIGtleWZyYW1lIHNwZWNpZmllZCBhcyBhIG51bWJlciBiZXR3ZWVuIDAuMCBhbmQgMS4wIGluY2x1c2l2ZS4gKHgpXHJcbiAgICAgICAgLy8gQHByb3BlcnR5IHJhdGlvc1xyXG4gICAgICAgIC8vIEB0eXBlIHtudW1iZXJbXX1cclxuICAgICAgICByYXRpb3M6IFtdLFxyXG5cclxuICAgICAgICAvLyBAcHJvcGVydHkgdHlwZXNcclxuICAgICAgICAvLyBAcGFyYW0ge29iamVjdFtdfVxyXG4gICAgICAgIC8vIEVhY2ggYXJyYXkgaXRlbSBtYXliZSB0eXBlOlxyXG4gICAgICAgIC8vIC0gW3gsIHgsIHgsIHhdOiBGb3VyIGNvbnRyb2wgcG9pbnRzIGZvciBiZXppZXJcclxuICAgICAgICAvLyAtIG51bGw6IGxpbmVhclxyXG4gICAgICAgIHR5cGVzOiBbXSxcclxuICAgIH0sXHJcblxyXG4gICAgX2ZpbmRGcmFtZUluZGV4OiBiaW5hcnlTZWFyY2gsXHJcbiAgICBfbGVycDogdW5kZWZpbmVkLFxyXG5cclxuICAgIF9sZXJwTnVtYmVyIChmcm9tLCB0bywgdCkge1xyXG4gICAgICAgIHJldHVybiBmcm9tICsgKHRvIC0gZnJvbSkgKiB0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfbGVycE9iamVjdCAoZnJvbSwgdG8sIHQpIHtcclxuICAgICAgICByZXR1cm4gZnJvbS5sZXJwKHRvLCB0KTtcclxuICAgIH0sXHJcblxyXG4gICAgX2xlcnBRdWF0OiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBvdXQgPSBjYy5xdWF0KCk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmcm9tLCB0bywgdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbS5sZXJwKHRvLCB0LCBvdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpLFxyXG5cclxuICAgIF9sZXJwVmVjdG9yMjogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgb3V0ID0gY2MudjIoKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZyb20sIHRvLCB0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmcm9tLmxlcnAodG8sIHQsIG91dCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pKCksXHJcblxyXG4gICAgX2xlcnBWZWN0b3IzOiAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBvdXQgPSBjYy52MygpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZyb20ubGVycCh0bywgdCwgb3V0KTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKSxcclxuXHJcbiAgICBzYW1wbGUgKHRpbWUsIHJhdGlvLCBzdGF0ZSkge1xyXG4gICAgICAgIGxldCB2YWx1ZXMgPSB0aGlzLnZhbHVlcztcclxuICAgICAgICBsZXQgcmF0aW9zID0gdGhpcy5yYXRpb3M7XHJcbiAgICAgICAgbGV0IGZyYW1lQ291bnQgPSByYXRpb3MubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAoZnJhbWVDb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbmx5IG5lZWQgdG8gcmVmaW5kIGZyYW1lIGluZGV4IHdoZW4gcmF0aW8gaXMgb3V0IG9mIHJhbmdlIG9mIGxhc3QgZnJvbSByYXRpbyBhbmQgdG8gcmF0aW8uXHJcbiAgICAgICAgbGV0IHNob3VkUmVmaW5kID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY2FjaGVkSW5kZXggPSB0aGlzLl9jYWNoZWRJbmRleDtcclxuICAgICAgICBpZiAoY2FjaGVkSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZEluZGV4ID0gfmNhY2hlZEluZGV4O1xyXG4gICAgICAgICAgICBpZiAoY2FjaGVkSW5kZXggPiAwICYmIGNhY2hlZEluZGV4IDwgcmF0aW9zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZyb21SYXRpbyA9IHJhdGlvc1tjYWNoZWRJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvUmF0aW8gPSByYXRpb3NbY2FjaGVkSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhdGlvID4gZnJvbVJhdGlvICYmIHJhdGlvIDwgdG9SYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VkUmVmaW5kID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaG91ZFJlZmluZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWNoZWRJbmRleCA9IHRoaXMuX2ZpbmRGcmFtZUluZGV4KHJhdGlvcywgcmF0aW8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXZhbHVhdGUgdmFsdWVcclxuICAgICAgICBsZXQgdmFsdWU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5fY2FjaGVkSW5kZXg7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IH5pbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1swXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpbmRleCA+PSBmcmFtZUNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tmcmFtZUNvdW50IC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJvbVZhbCA9IHZhbHVlc1tpbmRleCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbGVycCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZnJvbVZhbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9tUmF0aW8gPSByYXRpb3NbaW5kZXggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9SYXRpbyA9IHJhdGlvc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLnR5cGVzW2luZGV4IC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGlvQmV0d2VlbkZyYW1lcyA9IChyYXRpbyAtIGZyb21SYXRpbykgLyAodG9SYXRpbyAtIGZyb21SYXRpbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvQmV0d2VlbkZyYW1lcyA9IGNvbXB1dGVSYXRpb0J5VHlwZShyYXRpb0JldHdlZW5GcmFtZXMsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvVmFsID0gdmFsdWVzW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9sZXJwKGZyb21WYWwsIHRvVmFsLCByYXRpb0JldHdlZW5GcmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRhcmdldFt0aGlzLnByb3BdID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuRHluYW1pY0FuaW1DdXJ2ZS5MaW5lYXIgPSBudWxsO1xyXG5EeW5hbWljQW5pbUN1cnZlLkJlemllciA9IGZ1bmN0aW9uIChjb250cm9sUG9pbnRzKSB7XHJcbiAgICByZXR1cm4gY29udHJvbFBvaW50cztcclxufTtcclxuXHJcblxyXG4vKipcclxuICogRXZlbnQgaW5mb3JtYXRpb24sXHJcbiAqIEBjbGFzcyBFdmVudEluZm9cclxuICpcclxuICovXHJcbnZhciBFdmVudEluZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmV2ZW50cyA9IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmdW5jXSBldmVudCBmdW5jdGlvblxyXG4gKiBAcGFyYW0ge09iamVjdFtdfSBbcGFyYW1zXSBldmVudCBwYXJhbXNcclxuICovXHJcbkV2ZW50SW5mby5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGZ1bmMsIHBhcmFtcykge1xyXG4gICAgdGhpcy5ldmVudHMucHVzaCh7XHJcbiAgICAgICAgZnVuYzogZnVuYyB8fCAnJyxcclxuICAgICAgICBwYXJhbXM6IHBhcmFtcyB8fCBbXVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBjbGFzcyBFdmVudEFuaW1DdXJ2ZVxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBBbmltQ3VydmVcclxuICovXHJcbnZhciBFdmVudEFuaW1DdXJ2ZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5FdmVudEFuaW1DdXJ2ZScsXHJcbiAgICBleHRlbmRzOiBBbmltQ3VydmUsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBvYmplY3QgYmVpbmcgYW5pbWF0ZWQuXHJcbiAgICAgICAgICogQHByb3BlcnR5IHRhcmdldFxyXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGFyZ2V0OiBudWxsLFxyXG5cclxuICAgICAgICAvKiogVGhlIGtleWZyYW1lIHJhdGlvIG9mIHRoZSBrZXlmcmFtZSBzcGVjaWZpZWQgYXMgYSBudW1iZXIgYmV0d2VlbiAwLjAgYW5kIDEuMCBpbmNsdXNpdmUuICh4KVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSByYXRpb3NcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyW119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmF0aW9zOiBbXSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHByb3BlcnR5IGV2ZW50c1xyXG4gICAgICAgICAqIEB0eXBlIHtFdmVudEluZm9bXX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBldmVudHM6IFtdLFxyXG5cclxuICAgICAgICBfd3JhcHBlZEluZm86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBXcmFwcGVkSW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2xhc3RXcmFwcGVkSW5mbzogbnVsbCxcclxuXHJcbiAgICAgICAgX2lnbm9yZUluZGV4OiBOYU5cclxuICAgIH0sXHJcblxyXG4gICAgX3dyYXBJdGVyYXRpb25zOiBmdW5jdGlvbiAoaXRlcmF0aW9ucykge1xyXG4gICAgICAgIGlmIChpdGVyYXRpb25zIC0gKGl0ZXJhdGlvbnMgfCAwKSA9PT0gMCkgaXRlcmF0aW9ucyAtPSAxO1xyXG4gICAgICAgIHJldHVybiBpdGVyYXRpb25zIHwgMDtcclxuICAgIH0sXHJcblxyXG4gICAgc2FtcGxlOiBmdW5jdGlvbiAodGltZSwgcmF0aW8sIHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMucmF0aW9zLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRXcmFwcGVkSW5mbyA9IHN0YXRlLmdldFdyYXBwZWRJbmZvKHN0YXRlLnRpbWUsIHRoaXMuX3dyYXBwZWRJbmZvKTtcclxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gY3VycmVudFdyYXBwZWRJbmZvLmRpcmVjdGlvbjtcclxuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYmluYXJ5U2VhcmNoKHRoaXMucmF0aW9zLCBjdXJyZW50V3JhcHBlZEluZm8ucmF0aW8pO1xyXG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IH5jdXJyZW50SW5kZXggLSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgZGlyZWN0aW9uIGlzIGludmVyc2UsIHRoZW4gaW5jcmVhc2UgaW5kZXhcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA8IDApIGN1cnJlbnRJbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lnbm9yZUluZGV4ICE9PSBjdXJyZW50SW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5faWdub3JlSW5kZXggPSBOYU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50V3JhcHBlZEluZm8uZnJhbWVJbmRleCA9IGN1cnJlbnRJbmRleDtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0V3JhcHBlZEluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyZUV2ZW50KGN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RXcmFwcGVkSW5mbyA9IG5ldyBXcmFwcGVkSW5mbyhjdXJyZW50V3JhcHBlZEluZm8pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgd3JhcE1vZGUgPSBzdGF0ZS53cmFwTW9kZTtcclxuICAgICAgICB2YXIgY3VycmVudEl0ZXJhdGlvbnMgPSB0aGlzLl93cmFwSXRlcmF0aW9ucyhjdXJyZW50V3JhcHBlZEluZm8uaXRlcmF0aW9ucyk7XHJcblxyXG4gICAgICAgIHZhciBsYXN0V3JhcHBlZEluZm8gPSB0aGlzLl9sYXN0V3JhcHBlZEluZm87XHJcbiAgICAgICAgdmFyIGxhc3RJdGVyYXRpb25zID0gdGhpcy5fd3JhcEl0ZXJhdGlvbnMobGFzdFdyYXBwZWRJbmZvLml0ZXJhdGlvbnMpO1xyXG4gICAgICAgIHZhciBsYXN0SW5kZXggPSBsYXN0V3JhcHBlZEluZm8uZnJhbWVJbmRleDtcclxuICAgICAgICB2YXIgbGFzdERpcmVjdGlvbiA9IGxhc3RXcmFwcGVkSW5mby5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgIHZhciBpbnRlcmF0aW9uc0NoYW5nZWQgPSBsYXN0SXRlcmF0aW9ucyAhPT0gLTEgJiYgY3VycmVudEl0ZXJhdGlvbnMgIT09IGxhc3RJdGVyYXRpb25zO1xyXG5cclxuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBjdXJyZW50SW5kZXggJiYgaW50ZXJhdGlvbnNDaGFuZ2VkICYmIGxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJlRXZlbnQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGxhc3RJbmRleCAhPT0gY3VycmVudEluZGV4IHx8IGludGVyYXRpb25zQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBsYXN0RGlyZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RJbmRleCAhPT0gY3VycmVudEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gLTEgJiYgbGFzdEluZGV4ID09PSAwICYmIGN1cnJlbnRJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh3cmFwTW9kZSAmIFdyYXBNb2RlTWFzay5QaW5nUG9uZykgPT09IFdyYXBNb2RlTWFzay5QaW5nUG9uZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uICo9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SXRlcmF0aW9ucyArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAxICYmIGxhc3RJbmRleCA9PT0gbGVuZ3RoIC0gMSAmJiBjdXJyZW50SW5kZXggPCBsZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgod3JhcE1vZGUgJiBXcmFwTW9kZU1hc2suUGluZ1BvbmcpID09PSBXcmFwTW9kZU1hc2suUGluZ1BvbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SXRlcmF0aW9ucyArKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0SW5kZXggPT09IGN1cnJlbnRJbmRleCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RJdGVyYXRpb25zID4gY3VycmVudEl0ZXJhdGlvbnMpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxhc3RJbmRleCArPSBkaXJlY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QW5pbWF0aW9uTWFuYWdlcigpLnB1c2hEZWxheUV2ZW50KHRoaXMsICdfZmlyZUV2ZW50JywgW2xhc3RJbmRleF0pO1xyXG4gICAgICAgICAgICB9IHdoaWxlIChsYXN0SW5kZXggIT09IGN1cnJlbnRJbmRleCAmJiBsYXN0SW5kZXggPiAtMSAmJiBsYXN0SW5kZXggPCBsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbGFzdFdyYXBwZWRJbmZvLnNldChjdXJyZW50V3JhcHBlZEluZm8pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZmlyZUV2ZW50OiBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuZXZlbnRzLmxlbmd0aCB8fCB0aGlzLl9pZ25vcmVJbmRleCA9PT0gaW5kZXgpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50SW5mbyA9IHRoaXMuZXZlbnRzW2luZGV4XTtcclxuICAgICAgICB2YXIgZXZlbnRzID0gZXZlbnRJbmZvLmV2ZW50cztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoICF0aGlzLnRhcmdldC5pc1ZhbGlkICkgeyBcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNvbXBvbmVudHMgPSB0aGlzLnRhcmdldC5fY29tcG9uZW50cztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7ICBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgdmFyIGZ1bmNOYW1lID0gZXZlbnQuZnVuYztcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29tcG9uZW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IGNvbXBvbmVudHNbal07XHJcbiAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IGNvbXBvbmVudFtmdW5jTmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZ1bmMpIGZ1bmMuYXBwbHkoY29tcG9uZW50LCBldmVudC5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblRpbWVDaGFuZ2VkTWFudWFsbHk6IGZ1bmN0aW9uICh0aW1lLCBzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX2xhc3RXcmFwcGVkSW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5faWdub3JlSW5kZXggPSBOYU47XHJcblxyXG4gICAgICAgIHZhciBpbmZvID0gc3RhdGUuZ2V0V3JhcHBlZEluZm8odGltZSwgdGhpcy5fd3JhcHBlZEluZm8pO1xyXG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbmZvLmRpcmVjdGlvbjtcclxuICAgICAgICB2YXIgZnJhbWVJbmRleCA9IGJpbmFyeVNlYXJjaCh0aGlzLnJhdGlvcywgaW5mby5yYXRpbyk7XHJcblxyXG4gICAgICAgIC8vIG9ubHkgaWdub3JlIHdoZW4gdGltZSBub3Qgb24gYSBmcmFtZSBpbmRleFxyXG4gICAgICAgIGlmIChmcmFtZUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBmcmFtZUluZGV4ID0gfmZyYW1lSW5kZXggLSAxO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgZGlyZWN0aW9uIGlzIGludmVyc2UsIHRoZW4gaW5jcmVhc2UgaW5kZXhcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA8IDApIGZyYW1lSW5kZXggKz0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2lnbm9yZUluZGV4ID0gZnJhbWVJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmlmIChDQ19URVNUKSB7XHJcbiAgICBjYy5fVGVzdC5EeW5hbWljQW5pbUN1cnZlID0gRHluYW1pY0FuaW1DdXJ2ZTtcclxuICAgIGNjLl9UZXN0LkV2ZW50QW5pbUN1cnZlID0gRXZlbnRBbmltQ3VydmU7XHJcbiAgICBjYy5fVGVzdC5xdWlja0ZpbmRJbmRleCA9IHF1aWNrRmluZEluZGV4O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEFuaW1DdXJ2ZTogQW5pbUN1cnZlLFxyXG4gICAgRHluYW1pY0FuaW1DdXJ2ZTogRHluYW1pY0FuaW1DdXJ2ZSxcclxuICAgIEV2ZW50QW5pbUN1cnZlOiBFdmVudEFuaW1DdXJ2ZSxcclxuICAgIEV2ZW50SW5mbzogRXZlbnRJbmZvLFxyXG4gICAgY29tcHV0ZVJhdGlvQnlUeXBlOiBjb21wdXRlUmF0aW9CeVR5cGUsXHJcbiAgICBxdWlja0ZpbmRJbmRleDogcXVpY2tGaW5kSW5kZXhcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=