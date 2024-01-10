
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsAABBQueryCallback.js';
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
var BodyType = require('../CCPhysicsTypes').BodyType;

function PhysicsAABBQueryCallback() {
  this._point = new b2.Vec2();
  this._isPoint = false;
  this._fixtures = [];
}

PhysicsAABBQueryCallback.prototype.init = function (point) {
  if (point) {
    this._isPoint = true;
    this._point.x = point.x;
    this._point.y = point.y;
  } else {
    this._isPoint = false;
  }

  this._fixtures.length = 0;
};

PhysicsAABBQueryCallback.prototype.ReportFixture = function (fixture) {
  var body = fixture.GetBody();

  if (body.GetType() === BodyType.Dynamic) {
    if (this._isPoint) {
      if (fixture.TestPoint(this._point)) {
        this._fixtures.push(fixture); // We are done, terminate the query.


        return false;
      }
    } else {
      this._fixtures.push(fixture);
    }
  } // True to continue the query, false to terminate the query.


  return true;
};

PhysicsAABBQueryCallback.prototype.getFixture = function () {
  return this._fixtures[0];
};

PhysicsAABBQueryCallback.prototype.getFixtures = function () {
  return this._fixtures;
};

cc.PhysicsAABBQueryCallback = module.exports = PhysicsAABBQueryCallback;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXHBsYXRmb3JtXFxDQ1BoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5qcyJdLCJuYW1lcyI6WyJCb2R5VHlwZSIsInJlcXVpcmUiLCJQaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2siLCJfcG9pbnQiLCJiMiIsIlZlYzIiLCJfaXNQb2ludCIsIl9maXh0dXJlcyIsInByb3RvdHlwZSIsImluaXQiLCJwb2ludCIsIngiLCJ5IiwibGVuZ3RoIiwiUmVwb3J0Rml4dHVyZSIsImZpeHR1cmUiLCJib2R5IiwiR2V0Qm9keSIsIkdldFR5cGUiLCJEeW5hbWljIiwiVGVzdFBvaW50IiwicHVzaCIsImdldEZpeHR1cmUiLCJnZXRGaXh0dXJlcyIsImNjIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFFBQVEsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFFBQTlDOztBQUVBLFNBQVNFLHdCQUFULEdBQXFDO0FBQ2pDLE9BQUtDLE1BQUwsR0FBYyxJQUFJQyxFQUFFLENBQUNDLElBQVAsRUFBZDtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0g7O0FBRURMLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ0MsSUFBbkMsR0FBMEMsVUFBVUMsS0FBVixFQUFpQjtBQUN2RCxNQUFJQSxLQUFKLEVBQVc7QUFDUCxTQUFLSixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBS0gsTUFBTCxDQUFZUSxDQUFaLEdBQWdCRCxLQUFLLENBQUNDLENBQXRCO0FBQ0EsU0FBS1IsTUFBTCxDQUFZUyxDQUFaLEdBQWdCRixLQUFLLENBQUNFLENBQXRCO0FBQ0gsR0FKRCxNQUtLO0FBQ0QsU0FBS04sUUFBTCxHQUFnQixLQUFoQjtBQUNIOztBQUVELE9BQUtDLFNBQUwsQ0FBZU0sTUFBZixHQUF3QixDQUF4QjtBQUNILENBWEQ7O0FBYUFYLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ00sYUFBbkMsR0FBbUQsVUFBVUMsT0FBVixFQUFtQjtBQUNsRSxNQUFJQyxJQUFJLEdBQUdELE9BQU8sQ0FBQ0UsT0FBUixFQUFYOztBQUNBLE1BQUlELElBQUksQ0FBQ0UsT0FBTCxPQUFtQmxCLFFBQVEsQ0FBQ21CLE9BQWhDLEVBQXlDO0FBQ3JDLFFBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUNmLFVBQUlTLE9BQU8sQ0FBQ0ssU0FBUixDQUFrQixLQUFLakIsTUFBdkIsQ0FBSixFQUFvQztBQUNoQyxhQUFLSSxTQUFMLENBQWVjLElBQWYsQ0FBb0JOLE9BQXBCLEVBRGdDLENBRWhDOzs7QUFDQSxlQUFPLEtBQVA7QUFDSDtBQUNKLEtBTkQsTUFPSztBQUNELFdBQUtSLFNBQUwsQ0FBZWMsSUFBZixDQUFvQk4sT0FBcEI7QUFDSDtBQUNKLEdBYmlFLENBZWxFOzs7QUFDQSxTQUFPLElBQVA7QUFDSCxDQWpCRDs7QUFtQkFiLHdCQUF3QixDQUFDTSxTQUF6QixDQUFtQ2MsVUFBbkMsR0FBZ0QsWUFBWTtBQUN4RCxTQUFPLEtBQUtmLFNBQUwsQ0FBZSxDQUFmLENBQVA7QUFDSCxDQUZEOztBQUlBTCx3QkFBd0IsQ0FBQ00sU0FBekIsQ0FBbUNlLFdBQW5DLEdBQWlELFlBQVk7QUFDekQsU0FBTyxLQUFLaEIsU0FBWjtBQUNILENBRkQ7O0FBSUFpQixFQUFFLENBQUN0Qix3QkFBSCxHQUE4QnVCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhCLHdCQUEvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQm9keVR5cGUgPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLkJvZHlUeXBlO1xyXG5cclxuZnVuY3Rpb24gUGh5c2ljc0FBQkJRdWVyeUNhbGxiYWNrICgpIHtcclxuICAgIHRoaXMuX3BvaW50ID0gbmV3IGIyLlZlYzIoKTtcclxuICAgIHRoaXMuX2lzUG9pbnQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZpeHR1cmVzID0gW107XHJcbn1cclxuXHJcblBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgaWYgKHBvaW50KSB7XHJcbiAgICAgICAgdGhpcy5faXNQb2ludCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcG9pbnQueCA9IHBvaW50Lng7XHJcbiAgICAgICAgdGhpcy5fcG9pbnQueSA9IHBvaW50Lnk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLl9pc1BvaW50ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuX2ZpeHR1cmVzLmxlbmd0aCA9IDA7XHJcbn07XHJcblxyXG5QaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2sucHJvdG90eXBlLlJlcG9ydEZpeHR1cmUgPSBmdW5jdGlvbiAoZml4dHVyZSkge1xyXG4gICAgdmFyIGJvZHkgPSBmaXh0dXJlLkdldEJvZHkoKTtcclxuICAgIGlmIChib2R5LkdldFR5cGUoKSA9PT0gQm9keVR5cGUuRHluYW1pYykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc1BvaW50KSB7XHJcbiAgICAgICAgICAgIGlmIChmaXh0dXJlLlRlc3RQb2ludCh0aGlzLl9wb2ludCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpeHR1cmVzLnB1c2goZml4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBhcmUgZG9uZSwgdGVybWluYXRlIHRoZSBxdWVyeS5cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZml4dHVyZXMucHVzaChmaXh0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJ1ZSB0byBjb250aW51ZSB0aGUgcXVlcnksIGZhbHNlIHRvIHRlcm1pbmF0ZSB0aGUgcXVlcnkuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcblBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5wcm90b3R5cGUuZ2V0Rml4dHVyZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9maXh0dXJlc1swXTtcclxufTtcclxuXHJcblBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjay5wcm90b3R5cGUuZ2V0Rml4dHVyZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZml4dHVyZXM7XHJcbn07XHJcblxyXG5jYy5QaHlzaWNzQUFCQlF1ZXJ5Q2FsbGJhY2sgPSBtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NBQUJCUXVlcnlDYWxsYmFjaztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=