
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsContactListner.js';
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
function PhysicsContactListener() {
  this._contactFixtures = [];
}

PhysicsContactListener.prototype.setBeginContact = function (cb) {
  this._BeginContact = cb;
};

PhysicsContactListener.prototype.setEndContact = function (cb) {
  this._EndContact = cb;
};

PhysicsContactListener.prototype.setPreSolve = function (cb) {
  this._PreSolve = cb;
};

PhysicsContactListener.prototype.setPostSolve = function (cb) {
  this._PostSolve = cb;
};

PhysicsContactListener.prototype.BeginContact = function (contact) {
  if (!this._BeginContact) return;
  var fixtureA = contact.GetFixtureA();
  var fixtureB = contact.GetFixtureB();
  var fixtures = this._contactFixtures;
  contact._shouldReport = false;

  if (fixtures.indexOf(fixtureA) !== -1 || fixtures.indexOf(fixtureB) !== -1) {
    contact._shouldReport = true; // for quick check whether this contact should report

    this._BeginContact(contact);
  }
};

PhysicsContactListener.prototype.EndContact = function (contact) {
  if (this._EndContact && contact._shouldReport) {
    contact._shouldReport = false;

    this._EndContact(contact);
  }
};

PhysicsContactListener.prototype.PreSolve = function (contact, oldManifold) {
  if (this._PreSolve && contact._shouldReport) {
    this._PreSolve(contact, oldManifold);
  }
};

PhysicsContactListener.prototype.PostSolve = function (contact, impulse) {
  if (this._PostSolve && contact._shouldReport) {
    this._PostSolve(contact, impulse);
  }
};

PhysicsContactListener.prototype.registerContactFixture = function (fixture) {
  this._contactFixtures.push(fixture);
};

PhysicsContactListener.prototype.unregisterContactFixture = function (fixture) {
  cc.js.array.remove(this._contactFixtures, fixture);
};

cc.PhysicsContactListener = module.exports = PhysicsContactListener;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXHBsYXRmb3JtXFxDQ1BoeXNpY3NDb250YWN0TGlzdG5lci5qcyJdLCJuYW1lcyI6WyJQaHlzaWNzQ29udGFjdExpc3RlbmVyIiwiX2NvbnRhY3RGaXh0dXJlcyIsInByb3RvdHlwZSIsInNldEJlZ2luQ29udGFjdCIsImNiIiwiX0JlZ2luQ29udGFjdCIsInNldEVuZENvbnRhY3QiLCJfRW5kQ29udGFjdCIsInNldFByZVNvbHZlIiwiX1ByZVNvbHZlIiwic2V0UG9zdFNvbHZlIiwiX1Bvc3RTb2x2ZSIsIkJlZ2luQ29udGFjdCIsImNvbnRhY3QiLCJmaXh0dXJlQSIsIkdldEZpeHR1cmVBIiwiZml4dHVyZUIiLCJHZXRGaXh0dXJlQiIsImZpeHR1cmVzIiwiX3Nob3VsZFJlcG9ydCIsImluZGV4T2YiLCJFbmRDb250YWN0IiwiUHJlU29sdmUiLCJvbGRNYW5pZm9sZCIsIlBvc3RTb2x2ZSIsImltcHVsc2UiLCJyZWdpc3RlckNvbnRhY3RGaXh0dXJlIiwiZml4dHVyZSIsInB1c2giLCJ1bnJlZ2lzdGVyQ29udGFjdEZpeHR1cmUiLCJjYyIsImpzIiwiYXJyYXkiLCJyZW1vdmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsU0FBU0Esc0JBQVQsR0FBbUM7QUFDL0IsT0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7QUFDSDs7QUFFREQsc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDQyxlQUFqQyxHQUFtRCxVQUFVQyxFQUFWLEVBQWM7QUFDN0QsT0FBS0MsYUFBTCxHQUFxQkQsRUFBckI7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUNJLGFBQWpDLEdBQWlELFVBQVVGLEVBQVYsRUFBYztBQUMzRCxPQUFLRyxXQUFMLEdBQW1CSCxFQUFuQjtBQUNILENBRkQ7O0FBSUFKLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ00sV0FBakMsR0FBK0MsVUFBVUosRUFBVixFQUFjO0FBQ3pELE9BQUtLLFNBQUwsR0FBaUJMLEVBQWpCO0FBQ0gsQ0FGRDs7QUFJQUosc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDUSxZQUFqQyxHQUFnRCxVQUFVTixFQUFWLEVBQWM7QUFDMUQsT0FBS08sVUFBTCxHQUFrQlAsRUFBbEI7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUNVLFlBQWpDLEdBQWdELFVBQVVDLE9BQVYsRUFBbUI7QUFDL0QsTUFBSSxDQUFDLEtBQUtSLGFBQVYsRUFBeUI7QUFFekIsTUFBSVMsUUFBUSxHQUFHRCxPQUFPLENBQUNFLFdBQVIsRUFBZjtBQUNBLE1BQUlDLFFBQVEsR0FBR0gsT0FBTyxDQUFDSSxXQUFSLEVBQWY7QUFDQSxNQUFJQyxRQUFRLEdBQUcsS0FBS2pCLGdCQUFwQjtBQUVBWSxFQUFBQSxPQUFPLENBQUNNLGFBQVIsR0FBd0IsS0FBeEI7O0FBRUEsTUFBSUQsUUFBUSxDQUFDRSxPQUFULENBQWlCTixRQUFqQixNQUErQixDQUFDLENBQWhDLElBQXFDSSxRQUFRLENBQUNFLE9BQVQsQ0FBaUJKLFFBQWpCLE1BQStCLENBQUMsQ0FBekUsRUFBNEU7QUFDeEVILElBQUFBLE9BQU8sQ0FBQ00sYUFBUixHQUF3QixJQUF4QixDQUR3RSxDQUMxQzs7QUFDOUIsU0FBS2QsYUFBTCxDQUFtQlEsT0FBbkI7QUFDSDtBQUNKLENBYkQ7O0FBZUFiLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ21CLFVBQWpDLEdBQThDLFVBQVVSLE9BQVYsRUFBbUI7QUFDN0QsTUFBSSxLQUFLTixXQUFMLElBQW9CTSxPQUFPLENBQUNNLGFBQWhDLEVBQStDO0FBQzNDTixJQUFBQSxPQUFPLENBQUNNLGFBQVIsR0FBd0IsS0FBeEI7O0FBQ0EsU0FBS1osV0FBTCxDQUFpQk0sT0FBakI7QUFDSDtBQUNKLENBTEQ7O0FBT0FiLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ29CLFFBQWpDLEdBQTRDLFVBQVVULE9BQVYsRUFBbUJVLFdBQW5CLEVBQWdDO0FBQ3hFLE1BQUksS0FBS2QsU0FBTCxJQUFrQkksT0FBTyxDQUFDTSxhQUE5QixFQUE2QztBQUN6QyxTQUFLVixTQUFMLENBQWVJLE9BQWYsRUFBd0JVLFdBQXhCO0FBQ0g7QUFDSixDQUpEOztBQU1BdkIsc0JBQXNCLENBQUNFLFNBQXZCLENBQWlDc0IsU0FBakMsR0FBNkMsVUFBVVgsT0FBVixFQUFtQlksT0FBbkIsRUFBNEI7QUFDckUsTUFBSSxLQUFLZCxVQUFMLElBQW1CRSxPQUFPLENBQUNNLGFBQS9CLEVBQThDO0FBQzFDLFNBQUtSLFVBQUwsQ0FBZ0JFLE9BQWhCLEVBQXlCWSxPQUF6QjtBQUNIO0FBQ0osQ0FKRDs7QUFNQXpCLHNCQUFzQixDQUFDRSxTQUF2QixDQUFpQ3dCLHNCQUFqQyxHQUEwRCxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pFLE9BQUsxQixnQkFBTCxDQUFzQjJCLElBQXRCLENBQTJCRCxPQUEzQjtBQUNILENBRkQ7O0FBSUEzQixzQkFBc0IsQ0FBQ0UsU0FBdkIsQ0FBaUMyQix3QkFBakMsR0FBNEQsVUFBVUYsT0FBVixFQUFtQjtBQUMzRUcsRUFBQUEsRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUMsTUFBWixDQUFtQixLQUFLaEMsZ0JBQXhCLEVBQTBDMEIsT0FBMUM7QUFDSCxDQUZEOztBQUlBRyxFQUFFLENBQUM5QixzQkFBSCxHQUE0QmtDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5DLHNCQUE3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIFBoeXNpY3NDb250YWN0TGlzdGVuZXIgKCkge1xyXG4gICAgdGhpcy5fY29udGFjdEZpeHR1cmVzID0gW107XHJcbn1cclxuXHJcblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnNldEJlZ2luQ29udGFjdCA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgdGhpcy5fQmVnaW5Db250YWN0ID0gY2I7XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5zZXRFbmRDb250YWN0ID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICB0aGlzLl9FbmRDb250YWN0ID0gY2I7XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5zZXRQcmVTb2x2ZSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgdGhpcy5fUHJlU29sdmUgPSBjYjtcclxufTtcclxuXHJcblBoeXNpY3NDb250YWN0TGlzdGVuZXIucHJvdG90eXBlLnNldFBvc3RTb2x2ZSA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgdGhpcy5fUG9zdFNvbHZlID0gY2I7XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5CZWdpbkNvbnRhY3QgPSBmdW5jdGlvbiAoY29udGFjdCkge1xyXG4gICAgaWYgKCF0aGlzLl9CZWdpbkNvbnRhY3QpIHJldHVybjtcclxuXHJcbiAgICB2YXIgZml4dHVyZUEgPSBjb250YWN0LkdldEZpeHR1cmVBKCk7XHJcbiAgICB2YXIgZml4dHVyZUIgPSBjb250YWN0LkdldEZpeHR1cmVCKCk7XHJcbiAgICB2YXIgZml4dHVyZXMgPSB0aGlzLl9jb250YWN0Rml4dHVyZXM7XHJcbiAgICBcclxuICAgIGNvbnRhY3QuX3Nob3VsZFJlcG9ydCA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBpZiAoZml4dHVyZXMuaW5kZXhPZihmaXh0dXJlQSkgIT09IC0xIHx8IGZpeHR1cmVzLmluZGV4T2YoZml4dHVyZUIpICE9PSAtMSkge1xyXG4gICAgICAgIGNvbnRhY3QuX3Nob3VsZFJlcG9ydCA9IHRydWU7IC8vIGZvciBxdWljayBjaGVjayB3aGV0aGVyIHRoaXMgY29udGFjdCBzaG91bGQgcmVwb3J0XHJcbiAgICAgICAgdGhpcy5fQmVnaW5Db250YWN0KGNvbnRhY3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUuRW5kQ29udGFjdCA9IGZ1bmN0aW9uIChjb250YWN0KSB7XHJcbiAgICBpZiAodGhpcy5fRW5kQ29udGFjdCAmJiBjb250YWN0Ll9zaG91bGRSZXBvcnQpIHtcclxuICAgICAgICBjb250YWN0Ll9zaG91bGRSZXBvcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9FbmRDb250YWN0KGNvbnRhY3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUuUHJlU29sdmUgPSBmdW5jdGlvbiAoY29udGFjdCwgb2xkTWFuaWZvbGQpIHtcclxuICAgIGlmICh0aGlzLl9QcmVTb2x2ZSAmJiBjb250YWN0Ll9zaG91bGRSZXBvcnQpIHtcclxuICAgICAgICB0aGlzLl9QcmVTb2x2ZShjb250YWN0LCBvbGRNYW5pZm9sZCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5Qb3N0U29sdmUgPSBmdW5jdGlvbiAoY29udGFjdCwgaW1wdWxzZSkge1xyXG4gICAgaWYgKHRoaXMuX1Bvc3RTb2x2ZSAmJiBjb250YWN0Ll9zaG91bGRSZXBvcnQpIHtcclxuICAgICAgICB0aGlzLl9Qb3N0U29sdmUoY29udGFjdCwgaW1wdWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5QaHlzaWNzQ29udGFjdExpc3RlbmVyLnByb3RvdHlwZS5yZWdpc3RlckNvbnRhY3RGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUpIHtcclxuICAgIHRoaXMuX2NvbnRhY3RGaXh0dXJlcy5wdXNoKGZpeHR1cmUpO1xyXG59O1xyXG5cclxuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lci5wcm90b3R5cGUudW5yZWdpc3RlckNvbnRhY3RGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUpIHtcclxuICAgIGNjLmpzLmFycmF5LnJlbW92ZSh0aGlzLl9jb250YWN0Rml4dHVyZXMsIGZpeHR1cmUpO1xyXG59O1xyXG5cclxuY2MuUGh5c2ljc0NvbnRhY3RMaXN0ZW5lciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0NvbnRhY3RMaXN0ZW5lcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=