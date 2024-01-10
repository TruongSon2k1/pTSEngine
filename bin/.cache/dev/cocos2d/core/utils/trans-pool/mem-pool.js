
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/trans-pool/mem-pool.js';
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
var MemPool = function MemPool(unitClass) {
  this._unitClass = unitClass;
  this._pool = [];
  this._findOrder = [];

  if (CC_JSB && CC_NATIVERENDERER) {
    this._initNative();
  }
};

var proto = MemPool.prototype;

proto._initNative = function () {
  this._nativeMemPool = new renderer.MemPool();
};

proto._buildUnit = function (unitID) {
  var unit = new this._unitClass(unitID, this);

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.updateCommonData(unitID, unit._data, unit._signData);
  }

  return unit;
};

proto._destroyUnit = function (unitID) {
  this._pool[unitID] = null;

  for (var idx = 0, n = this._findOrder.length; idx < n; idx++) {
    var unit = this._findOrder[idx];

    if (unit && unit.unitID == unitID) {
      this._findOrder.splice(idx, 1);

      break;
    }
  }

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.removeCommonData(unitID);
  }
};

proto._findUnitID = function () {
  var unitID = 0;
  var pool = this._pool;

  while (pool[unitID]) {
    unitID++;
  }

  return unitID;
};

proto.pop = function () {
  var findUnit = null;
  var idx = 0;
  var findOrder = this._findOrder;
  var pool = this._pool;

  for (var n = findOrder.length; idx < n; idx++) {
    var unit = findOrder[idx];

    if (unit && unit.hasSpace()) {
      findUnit = unit;
      break;
    }
  }

  if (!findUnit) {
    var unitID = this._findUnitID();

    findUnit = this._buildUnit(unitID);
    pool[unitID] = findUnit;
    findOrder.push(findUnit);
    idx = findOrder.length - 1;
  } // swap has space unit to first position, so next find will fast


  var firstUnit = findOrder[0];

  if (firstUnit !== findUnit) {
    findOrder[0] = findUnit;
    findOrder[idx] = firstUnit;
  }

  return findUnit.pop();
};

proto.push = function (info) {
  var unit = this._pool[info.unitID];
  unit.push(info.index);

  if (this._findOrder.length > 1 && unit.isAllFree()) {
    this._destroyUnit(info.unitID);
  }

  return unit;
};

module.exports = MemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFx0cmFucy1wb29sXFxtZW0tcG9vbC5qcyJdLCJuYW1lcyI6WyJNZW1Qb29sIiwidW5pdENsYXNzIiwiX3VuaXRDbGFzcyIsIl9wb29sIiwiX2ZpbmRPcmRlciIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiX2luaXROYXRpdmUiLCJwcm90byIsInByb3RvdHlwZSIsIl9uYXRpdmVNZW1Qb29sIiwicmVuZGVyZXIiLCJfYnVpbGRVbml0IiwidW5pdElEIiwidW5pdCIsInVwZGF0ZUNvbW1vbkRhdGEiLCJfZGF0YSIsIl9zaWduRGF0YSIsIl9kZXN0cm95VW5pdCIsImlkeCIsIm4iLCJsZW5ndGgiLCJzcGxpY2UiLCJyZW1vdmVDb21tb25EYXRhIiwiX2ZpbmRVbml0SUQiLCJwb29sIiwicG9wIiwiZmluZFVuaXQiLCJmaW5kT3JkZXIiLCJoYXNTcGFjZSIsInB1c2giLCJmaXJzdFVuaXQiLCJpbmZvIiwiaW5kZXgiLCJpc0FsbEZyZWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBVUMsU0FBVixFQUFxQjtBQUMvQixPQUFLQyxVQUFMLEdBQWtCRCxTQUFsQjtBQUNBLE9BQUtFLEtBQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxNQUFJQyxNQUFNLElBQUlDLGlCQUFkLEVBQWlDO0FBQzdCLFNBQUtDLFdBQUw7QUFDSDtBQUNKLENBUkQ7O0FBVUEsSUFBSUMsS0FBSyxHQUFHUixPQUFPLENBQUNTLFNBQXBCOztBQUNBRCxLQUFLLENBQUNE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QyxJQUFBQSxTQUFTLENBQUNULEdBQUQsQ0FBVCxHQUFpQlksU0FBakI7QUFDSDs7QUFFRCxTQUFPSixRQUFRLENBQUNELEdBQVQsRUFBUDtBQUNILENBN0JEOztBQStCQWxCLEtBQUssQ0FBQ3NCLElBQU4sR0FBYSxVQUFVRSxJQUFWLEVBQWdCO0FBQ3pCLE1BQUlsQixJQUFJLEdBQUcsS0FBS1gsS0FBTCxDQUFXNkIsSUFBSSxDQUFDbkIsTUFBaEIsQ0FBWDtBQUNBQyxFQUFBQSxJQUFJLENBQUNnQixJQUFMLENBQVVFLElBQUksQ0FBQ0MsS0FBZjs7QUFDQSxNQUFJLEtBQUs3QixVQUFMLENBQWdCaUIsTUFBaEIsR0FBeUIsQ0FBekIsSUFBOEJQLElBQUksQ0FBQ29CLFNBQUwsRUFBbEMsRUFBb0Q7QUFDaEQsU0FBS2hCLFlBQUwsQ0FBa0JjLElBQUksQ0FBQ25CLE1BQXZCO0FBQ0g7O0FBQ0QsU0FBT0MsSUFBUDtBQUNILENBUEQ7O0FBUUFxQixNQUFNLENBQUNDLE9BQVAsR0FBaUJwQyxPQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmxldCBNZW1Qb29sID0gZnVuY3Rpb24gKHVuaXRDbGFzcykge1xyXG4gICAgdGhpcy5fdW5pdENsYXNzID0gdW5pdENsYXNzO1xyXG4gICAgdGhpcy5fcG9vbCA9IFtdO1xyXG4gICAgdGhpcy5fZmluZE9yZGVyID0gW107XHJcblxyXG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgIHRoaXMuX2luaXROYXRpdmUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmxldCBwcm90byA9IE1lbVBvb2wucHJvdG90eXBlO1xyXG5wcm90by5faW5pdE5hdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX25hdGl2ZU1lbVBvb2wgPSBuZXcgcmVuZGVyZXIuTWVtUG9vbCgpO1xyXG59O1xyXG5cclxucHJvdG8uX2J1aWxkVW5pdCA9IGZ1bmN0aW9uICh1bml0SUQpIHtcclxuICAgIGxldCB1bml0ID0gbmV3IHRoaXMuX3VuaXRDbGFzcyh1bml0SUQsIHRoaXMpO1xyXG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZU1lbVBvb2wudXBkYXRlQ29tbW9uRGF0YSh1bml0SUQsIHVuaXQuX2RhdGEsIHVuaXQuX3NpZ25EYXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bml0O1xyXG59O1xyXG5cclxucHJvdG8uX2Rlc3Ryb3lVbml0ID0gZnVuY3Rpb24gKHVuaXRJRCkge1xyXG4gICAgdGhpcy5fcG9vbFt1bml0SURdID0gbnVsbDtcclxuICAgIGZvciAobGV0IGlkeCA9IDAsIG4gPSB0aGlzLl9maW5kT3JkZXIubGVuZ3RoOyBpZHggPCBuOyBpZHgrKykge1xyXG4gICAgICAgIGxldCB1bml0ID0gdGhpcy5fZmluZE9yZGVyW2lkeF07XHJcbiAgICAgICAgaWYgKHVuaXQgJiYgdW5pdC51bml0SUQgPT0gdW5pdElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpbmRPcmRlci5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgIHRoaXMuX25hdGl2ZU1lbVBvb2wucmVtb3ZlQ29tbW9uRGF0YSh1bml0SUQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxucHJvdG8uX2ZpbmRVbml0SUQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdW5pdElEID0gMDtcclxuICAgIGxldCBwb29sID0gdGhpcy5fcG9vbDtcclxuICAgIHdoaWxlIChwb29sW3VuaXRJRF0pIHVuaXRJRCsrO1xyXG4gICAgcmV0dXJuIHVuaXRJRDtcclxufTtcclxuXHJcbnByb3RvLnBvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBmaW5kVW5pdCA9IG51bGw7XHJcbiAgICBsZXQgaWR4ID0gMDtcclxuICAgIGxldCBmaW5kT3JkZXIgPSB0aGlzLl9maW5kT3JkZXI7XHJcbiAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XHJcbiAgICBmb3IgKGxldCBuID0gZmluZE9yZGVyLmxlbmd0aDsgaWR4IDwgbjsgaWR4KyspIHtcclxuICAgICAgICBsZXQgdW5pdCA9IGZpbmRPcmRlcltpZHhdO1xyXG4gICAgICAgIGlmICh1bml0ICYmIHVuaXQuaGFzU3BhY2UoKSkge1xyXG4gICAgICAgICAgICBmaW5kVW5pdCA9IHVuaXQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWZpbmRVbml0KSB7XHJcbiAgICAgICAgbGV0IHVuaXRJRCA9IHRoaXMuX2ZpbmRVbml0SUQoKTtcclxuICAgICAgICBmaW5kVW5pdCA9IHRoaXMuX2J1aWxkVW5pdCh1bml0SUQpO1xyXG4gICAgICAgIHBvb2xbdW5pdElEXSA9IGZpbmRVbml0O1xyXG4gICAgICAgIGZpbmRPcmRlci5wdXNoKGZpbmRVbml0KTtcclxuICAgICAgICBpZHggPSBmaW5kT3JkZXIubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzd2FwIGhhcyBzcGFjZSB1bml0IHRvIGZpcnN0IHBvc2l0aW9uLCBzbyBuZXh0IGZpbmQgd2lsbCBmYXN0XHJcbiAgICBsZXQgZmlyc3RVbml0ID0gZmluZE9yZGVyWzBdO1xyXG4gICAgaWYgKGZpcnN0VW5pdCAhPT0gZmluZFVuaXQpIHtcclxuICAgICAgICBmaW5kT3JkZXJbMF0gPSBmaW5kVW5pdDtcclxuICAgICAgICBmaW5kT3JkZXJbaWR4XSA9IGZpcnN0VW5pdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmluZFVuaXQucG9wKCk7XHJcbn07XHJcblxyXG5wcm90by5wdXNoID0gZnVuY3Rpb24gKGluZm8pIHtcclxuICAgIGxldCB1bml0ID0gdGhpcy5fcG9vbFtpbmZvLnVuaXRJRF07XHJcbiAgICB1bml0LnB1c2goaW5mby5pbmRleCk7XHJcbiAgICBpZiAodGhpcy5fZmluZE9yZGVyLmxlbmd0aCA+IDEgJiYgdW5pdC5pc0FsbEZyZWUoKSkge1xyXG4gICAgICAgIHRoaXMuX2Rlc3Ryb3lVbml0KGluZm8udW5pdElEKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bml0O1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IE1lbVBvb2w7Il0sInNvdXJjZVJvb3QiOiIvIn0=