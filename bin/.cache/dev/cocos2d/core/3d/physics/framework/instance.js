
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/instance.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.createPhysicsWorld = createPhysicsWorld;
exports.createRigidBody = createRigidBody;
exports.createBoxShape = createBoxShape;
exports.createSphereShape = createSphereShape;

var _physicsSelector = require("./physics-selector");

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
function createPhysicsWorld() {
  return new _physicsSelector.PhysicsWorld();
}

function createRigidBody() {
  return new _physicsSelector.RigidBody();
}

function createBoxShape(size) {
  return new _physicsSelector.BoxShape(size);
}

function createSphereShape(radius) {
  return new _physicsSelector.SphereShape(radius);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGluc3RhbmNlLnRzIl0sIm5hbWVzIjpbImNyZWF0ZVBoeXNpY3NXb3JsZCIsIlBoeXNpY3NXb3JsZCIsImNyZWF0ZVJpZ2lkQm9keSIsIlJpZ2lkQm9keSIsImNyZWF0ZUJveFNoYXBlIiwic2l6ZSIsIkJveFNoYXBlIiwiY3JlYXRlU3BoZXJlU2hhcGUiLCJyYWRpdXMiLCJTcGhlcmVTaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT08sU0FBU0Esa0JBQVQsR0FBOEM7QUFDakQsU0FBTyxJQUFJQyw2QkFBSixFQUFQO0FBQ0g7O0FBRU0sU0FBU0MsZUFBVCxHQUF3QztBQUMzQyxTQUFPLElBQUlDLDBCQUFKLEVBQVA7QUFDSDs7QUFFTSxTQUFTQyxjQUFULENBQXlCQyxJQUF6QixFQUFtRDtBQUN0RCxTQUFPLElBQUlDLHlCQUFKLENBQWFELElBQWIsQ0FBUDtBQUNIOztBQUVNLFNBQVNFLGlCQUFULENBQTRCQyxNQUE1QixFQUEwRDtBQUM3RCxTQUFPLElBQUlDLDRCQUFKLENBQWdCRCxNQUFoQixDQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBCb3hTaGFwZSwgUGh5c2ljc1dvcmxkLCBSaWdpZEJvZHksIFNwaGVyZVNoYXBlIH0gZnJvbSAnLi9waHlzaWNzLXNlbGVjdG9yJztcclxuaW1wb3J0IHsgSVJpZ2lkQm9keSB9IGZyb20gJy4uL3NwZWMvSS1yaWdpZC1ib2R5JztcclxuaW1wb3J0IHsgSUJveFNoYXBlLCBJU3BoZXJlU2hhcGUgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XHJcbmltcG9ydCB7IElQaHlzaWNzV29ybGQgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy13b3JsZCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGh5c2ljc1dvcmxkICgpOiBJUGh5c2ljc1dvcmxkIHtcclxuICAgIHJldHVybiBuZXcgUGh5c2ljc1dvcmxkKCkgYXMgSVBoeXNpY3NXb3JsZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJpZ2lkQm9keSAoKTogSVJpZ2lkQm9keSB7XHJcbiAgICByZXR1cm4gbmV3IFJpZ2lkQm9keSEoKSBhcyBJUmlnaWRCb2R5O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm94U2hhcGUgKHNpemU6IGNjLlZlYzMpOiBJQm94U2hhcGUge1xyXG4gICAgcmV0dXJuIG5ldyBCb3hTaGFwZShzaXplKSBhcyBJQm94U2hhcGU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTcGhlcmVTaGFwZSAocmFkaXVzOiBudW1iZXIpOiBJU3BoZXJlU2hhcGUge1xyXG4gICAgcmV0dXJuIG5ldyBTcGhlcmVTaGFwZShyYWRpdXMpIGFzIElTcGhlcmVTaGFwZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==