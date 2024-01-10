
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-selector.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.instantiate = instantiate;
exports.PhysicsWorld = exports.RigidBody = exports.SphereShape = exports.BoxShape = void 0;

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
// Cannon
// built-in
var BoxShape;
exports.BoxShape = BoxShape;
var SphereShape;
exports.SphereShape = SphereShape;
var RigidBody;
exports.RigidBody = RigidBody;
var PhysicsWorld;
exports.PhysicsWorld = PhysicsWorld;

function instantiate(boxShape, sphereShape, body, world) {
  exports.BoxShape = BoxShape = boxShape;
  exports.SphereShape = SphereShape = sphereShape;
  exports.RigidBody = RigidBody = body;
  exports.PhysicsWorld = PhysicsWorld = world;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXHBoeXNpY3Mtc2VsZWN0b3IudHMiXSwibmFtZXMiOlsiQm94U2hhcGUiLCJTcGhlcmVTaGFwZSIsIlJpZ2lkQm9keSIsIlBoeXNpY3NXb3JsZCIsImluc3RhbnRpYXRlIiwiYm94U2hhcGUiLCJzcGhlcmVTaGFwZSIsImJvZHkiLCJ3b3JsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQztBQU1EO0FBS08sSUFBSUEsUUFBSjs7QUFDQSxJQUFJQyxXQUFKOztBQUNBLElBQUlDLFNBQUo7O0FBQ0EsSUFBSUMsWUFBSjs7O0FBRUEsU0FBU0MsV0FBVCxDQUNIQyxRQURHLEVBRUhDLFdBRkcsRUFHSEMsSUFIRyxFQUlIQyxLQUpHLEVBSXlCO0FBQzVCLHFCQUFBUixRQUFRLEdBQUdLLFFBQVg7QUFDQSx3QkFBQUosV0FBVyxHQUFHSyxXQUFkO0FBQ0Esc0JBQUFKLFNBQVMsR0FBR0ssSUFBWjtBQUNBLHlCQUFBSixZQUFZLEdBQUdLLEtBQWY7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbiAvLyBDYW5ub25cclxuaW1wb3J0IHsgQ2Fubm9uUmlnaWRCb2R5IH0gZnJvbSAnLi4vY2Fubm9uL2Nhbm5vbi1yaWdpZC1ib2R5JztcclxuaW1wb3J0IHsgQ2Fubm9uV29ybGQgfSBmcm9tICcuLi9jYW5ub24vY2Fubm9uLXdvcmxkJztcclxuaW1wb3J0IHsgQ2Fubm9uQm94U2hhcGUgfSBmcm9tICcuLi9jYW5ub24vc2hhcGVzL2Nhbm5vbi1ib3gtc2hhcGUnO1xyXG5pbXBvcnQgeyBDYW5ub25TcGhlcmVTaGFwZSB9IGZyb20gJy4uL2Nhbm5vbi9zaGFwZXMvY2Fubm9uLXNwaGVyZS1zaGFwZSc7XHJcblxyXG4vLyBidWlsdC1pblxyXG5pbXBvcnQgeyBCdWlsdEluV29ybGQgfSBmcm9tICcuLi9jb2Nvcy9idWlsdGluLXdvcmxkJztcclxuaW1wb3J0IHsgQnVpbHRpbkJveFNoYXBlIH0gZnJvbSAnLi4vY29jb3Mvc2hhcGVzL2J1aWx0aW4tYm94LXNoYXBlJztcclxuaW1wb3J0IHsgQnVpbHRpblNwaGVyZVNoYXBlIH0gZnJvbSAnLi4vY29jb3Mvc2hhcGVzL2J1aWx0aW4tc3BoZXJlLXNoYXBlJztcclxuXHJcbmV4cG9ydCBsZXQgQm94U2hhcGU6IHR5cGVvZiBDYW5ub25Cb3hTaGFwZSB8IHR5cGVvZiBCdWlsdGluQm94U2hhcGU7XHJcbmV4cG9ydCBsZXQgU3BoZXJlU2hhcGU6IHR5cGVvZiBDYW5ub25TcGhlcmVTaGFwZSB8IHR5cGVvZiBCdWlsdGluU3BoZXJlU2hhcGU7XHJcbmV4cG9ydCBsZXQgUmlnaWRCb2R5OiB0eXBlb2YgQ2Fubm9uUmlnaWRCb2R5IHwgbnVsbDtcclxuZXhwb3J0IGxldCBQaHlzaWNzV29ybGQ6IHR5cGVvZiBDYW5ub25Xb3JsZCB8IHR5cGVvZiBCdWlsdEluV29ybGQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGUgKFxyXG4gICAgYm94U2hhcGU6IHR5cGVvZiBCb3hTaGFwZSxcclxuICAgIHNwaGVyZVNoYXBlOiB0eXBlb2YgU3BoZXJlU2hhcGUsXHJcbiAgICBib2R5OiB0eXBlb2YgUmlnaWRCb2R5LFxyXG4gICAgd29ybGQ6IHR5cGVvZiBQaHlzaWNzV29ybGQpIHtcclxuICAgIEJveFNoYXBlID0gYm94U2hhcGU7XHJcbiAgICBTcGhlcmVTaGFwZSA9IHNwaGVyZVNoYXBlO1xyXG4gICAgUmlnaWRCb2R5ID0gYm9keTtcclxuICAgIFBoeXNpY3NXb3JsZCA9IHdvcmxkO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9