
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCContact.js';
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
var Intersection = require('./CCIntersection');

var CollisionType = cc.Enum({
  None: 0,
  CollisionEnter: 1,
  CollisionStay: 2,
  CollisionExit: 3
});

function Contact(collider1, collider2) {
  this.collider1 = collider1;
  this.collider2 = collider2;
  this.touching = false;
  var isCollider1Polygon = collider1 instanceof cc.BoxCollider || collider1 instanceof cc.PolygonCollider;
  var isCollider2Polygon = collider2 instanceof cc.BoxCollider || collider2 instanceof cc.PolygonCollider;
  var isCollider1Circle = collider1 instanceof cc.CircleCollider;
  var isCollider2Circle = collider2 instanceof cc.CircleCollider;

  if (isCollider1Polygon && isCollider2Polygon) {
    this.testFunc = Intersection.polygonPolygon;
  } else if (isCollider1Circle && isCollider2Circle) {
    this.testFunc = Intersection.circleCircle;
  } else if (isCollider1Polygon && isCollider2Circle) {
    this.testFunc = Intersection.polygonCircle;
  } else if (isCollider1Circle && isCollider2Polygon) {
    this.testFunc = Intersection.polygonCircle;
    this.collider1 = collider2;
    this.collider2 = collider1;
  } else {
    cc.errorID(6601, cc.js.getClassName(collider1), cc.js.getClassName(collider2));
  }
}

Contact.prototype.test = function () {
  var world1 = this.collider1.world;
  var world2 = this.collider2.world;

  if (!world1.aabb.intersects(world2.aabb)) {
    return false;
  }

  if (this.testFunc === Intersection.polygonPolygon) {
    return this.testFunc(world1.points, world2.points);
  } else if (this.testFunc === Intersection.circleCircle) {
    return this.testFunc(world1, world2);
  } else if (this.testFunc === Intersection.polygonCircle) {
    return this.testFunc(world1.points, world2);
  }

  return false;
};

Contact.prototype.updateState = function () {
  var result = this.test();
  var type = CollisionType.None;

  if (result && !this.touching) {
    this.touching = true;
    type = CollisionType.CollisionEnter;
  } else if (result && this.touching) {
    type = CollisionType.CollisionStay;
  } else if (!result && this.touching) {
    this.touching = false;
    type = CollisionType.CollisionExit;
  }

  return type;
};

Contact.CollisionType = CollisionType;
module.exports = Contact;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbGxpZGVyXFxDQ0NvbnRhY3QuanMiXSwibmFtZXMiOlsiSW50ZXJzZWN0aW9uIiwicmVxdWlyZSIsIkNvbGxpc2lvblR5cGUiLCJjYyIsIkVudW0iLCJOb25lIiwiQ29sbGlzaW9uRW50ZXIiLCJDb2xsaXNpb25TdGF5IiwiQ29sbGlzaW9uRXhpdCIsIkNvbnRhY3QiLCJjb2xsaWRlcjEiLCJjb2xsaWRlcjIiLCJ0b3VjaGluZyIsImlzQ29sbGlkZXIxUG9seWdvbiIsIkJveENvbGxpZGVyIiwiUG9seWdvbkNvbGxpZGVyIiwiaXNDb2xsaWRlcjJQb2x5Z29uIiwiaXNDb2xsaWRlcjFDaXJjbGUiLCJDaXJjbGVDb2xsaWRlciIsImlzQ29sbGlkZXIyQ2lyY2xlIiwidGVzdEZ1bmMiLCJwb2x5Z29uUG9seWdvbiIsImNpcmNsZUNpcmNsZSIsInBvbHlnb25DaXJjbGUiLCJlcnJvcklEIiwianMiLCJnZXRDbGFzc05hbWUiLCJwcm90b3R5cGUiLCJ0ZXN0Iiwid29ybGQxIiwid29ybGQiLCJ3b3JsZDIiLCJhYWJiIiwiaW50ZXJzZWN0cyIsInBvaW50cyIsInVwZGF0ZVN0YXRlIiwicmVzdWx0IiwidHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxZQUFZLEdBQUdDLE9BQU8sQ0FBQyxrQkFBRCxDQUExQjs7QUFFQSxJQUFJQyxhQUFhLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsQ0FEa0I7QUFFeEJDLEVBQUFBLGNBQWMsRUFBRSxDQUZRO0FBR3hCQyxFQUFBQSxhQUFhLEVBQUUsQ0FI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LElBQXpCOztBQUNBLE1BQUkrQixNQUFNLElBQUksQ0FBQyxLQUFLeEIsUUFBcEIsRUFBOEI7QUFDMUIsU0FBS0EsUUFBTCxHQUFnQixJQUFoQjtBQUNBeUIsSUFBQUEsSUFBSSxHQUFHbkMsYUFBYSxDQUFDSSxjQUFyQjtBQUNILEdBSEQsTUFJSyxJQUFJOEIsTUFBTSxJQUFJLEtBQUt4QixRQUFuQixFQUE2QjtBQUM5QnlCLElBQUFBLElBQUksR0FBR25DLGFBQWEsQ0FBQ0ssYUFBckI7QUFDSCxHQUZJLE1BR0EsSUFBSSxDQUFDNkIsTUFBRCxJQUFXLEtBQUt4QixRQUFwQixFQUE4QjtBQUMvQixTQUFLQSxRQUFMLEdBQWdCLEtBQWhCO0FBQ0F5QixJQUFBQSxJQUFJLEdBQUduQyxhQUFhLENBQUNNLGFBQXJCO0FBQ0g7O0FBRUQsU0FBTzZCLElBQVA7QUFDSCxDQWpCRDs7QUFvQkE1QixPQUFPLENBQUNQLGFBQVIsR0FBd0JBLGFBQXhCO0FBRUFvQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixPQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbnZhciBJbnRlcnNlY3Rpb24gPSByZXF1aXJlKCcuL0NDSW50ZXJzZWN0aW9uJyk7XHJcblxyXG52YXIgQ29sbGlzaW9uVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTogMCxcclxuICAgIENvbGxpc2lvbkVudGVyOiAxLFxyXG4gICAgQ29sbGlzaW9uU3RheTogMixcclxuICAgIENvbGxpc2lvbkV4aXQ6IDNcclxufSk7XHJcblxyXG5mdW5jdGlvbiBDb250YWN0IChjb2xsaWRlcjEsIGNvbGxpZGVyMikge1xyXG4gICAgdGhpcy5jb2xsaWRlcjEgPSBjb2xsaWRlcjE7XHJcbiAgICB0aGlzLmNvbGxpZGVyMiA9IGNvbGxpZGVyMjtcclxuXHJcbiAgICB0aGlzLnRvdWNoaW5nID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGlzQ29sbGlkZXIxUG9seWdvbiA9IChjb2xsaWRlcjEgaW5zdGFuY2VvZiBjYy5Cb3hDb2xsaWRlcikgfHwgKGNvbGxpZGVyMSBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICB2YXIgaXNDb2xsaWRlcjJQb2x5Z29uID0gKGNvbGxpZGVyMiBpbnN0YW5jZW9mIGNjLkJveENvbGxpZGVyKSB8fCAoY29sbGlkZXIyIGluc3RhbmNlb2YgY2MuUG9seWdvbkNvbGxpZGVyKTtcclxuICAgIHZhciBpc0NvbGxpZGVyMUNpcmNsZSA9IGNvbGxpZGVyMSBpbnN0YW5jZW9mIGNjLkNpcmNsZUNvbGxpZGVyO1xyXG4gICAgdmFyIGlzQ29sbGlkZXIyQ2lyY2xlID0gY29sbGlkZXIyIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXI7XHJcblxyXG4gICAgaWYgKGlzQ29sbGlkZXIxUG9seWdvbiAmJiBpc0NvbGxpZGVyMlBvbHlnb24pIHtcclxuICAgICAgICB0aGlzLnRlc3RGdW5jID0gSW50ZXJzZWN0aW9uLnBvbHlnb25Qb2x5Z29uO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNDb2xsaWRlcjFDaXJjbGUgJiYgaXNDb2xsaWRlcjJDaXJjbGUpIHtcclxuICAgICAgICB0aGlzLnRlc3RGdW5jID0gSW50ZXJzZWN0aW9uLmNpcmNsZUNpcmNsZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzQ29sbGlkZXIxUG9seWdvbiAmJiBpc0NvbGxpZGVyMkNpcmNsZSkge1xyXG4gICAgICAgIHRoaXMudGVzdEZ1bmMgPSBJbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzQ29sbGlkZXIxQ2lyY2xlICYmIGlzQ29sbGlkZXIyUG9seWdvbikge1xyXG4gICAgICAgIHRoaXMudGVzdEZ1bmMgPSBJbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyMSA9IGNvbGxpZGVyMjtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyMiA9IGNvbGxpZGVyMTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNjLmVycm9ySUQoNjYwMSwgY2MuanMuZ2V0Q2xhc3NOYW1lKGNvbGxpZGVyMSksIGNjLmpzLmdldENsYXNzTmFtZShjb2xsaWRlcjIpKTtcclxuICAgIH1cclxufVxyXG5cclxuQ29udGFjdC5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB3b3JsZDEgPSB0aGlzLmNvbGxpZGVyMS53b3JsZDtcclxuICAgIHZhciB3b3JsZDIgPSB0aGlzLmNvbGxpZGVyMi53b3JsZDtcclxuXHJcbiAgICBpZiAoIXdvcmxkMS5hYWJiLmludGVyc2VjdHMod29ybGQyLmFhYmIpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRlc3RGdW5jID09PSBJbnRlcnNlY3Rpb24ucG9seWdvblBvbHlnb24pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXN0RnVuYyh3b3JsZDEucG9pbnRzLCB3b3JsZDIucG9pbnRzKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMudGVzdEZ1bmMgPT09IEludGVyc2VjdGlvbi5jaXJjbGVDaXJjbGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXN0RnVuYyh3b3JsZDEsIHdvcmxkMik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLnRlc3RGdW5jID09PSBJbnRlcnNlY3Rpb24ucG9seWdvbkNpcmNsZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RGdW5jKHdvcmxkMS5wb2ludHMsIHdvcmxkMik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuQ29udGFjdC5wcm90b3R5cGUudXBkYXRlU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy50ZXN0KCk7XHJcblxyXG4gICAgdmFyIHR5cGUgPSBDb2xsaXNpb25UeXBlLk5vbmU7XHJcbiAgICBpZiAocmVzdWx0ICYmICF0aGlzLnRvdWNoaW5nKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaGluZyA9IHRydWU7XHJcbiAgICAgICAgdHlwZSA9IENvbGxpc2lvblR5cGUuQ29sbGlzaW9uRW50ZXI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZXN1bHQgJiYgdGhpcy50b3VjaGluZykge1xyXG4gICAgICAgIHR5cGUgPSBDb2xsaXNpb25UeXBlLkNvbGxpc2lvblN0YXk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghcmVzdWx0ICYmIHRoaXMudG91Y2hpbmcpIHtcclxuICAgICAgICB0aGlzLnRvdWNoaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdHlwZSA9IENvbGxpc2lvblR5cGUuQ29sbGlzaW9uRXhpdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHlwZTtcclxufTtcclxuXHJcblxyXG5Db250YWN0LkNvbGxpc2lvblR5cGUgPSBDb2xsaXNpb25UeXBlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==