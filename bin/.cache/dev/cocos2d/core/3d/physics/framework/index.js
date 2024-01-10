
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;

var _physicsManager = require("./physics-manager");

exports.Physics3DManager = _physicsManager.Physics3DManager;

var _physicsRayResult = require("./physics-ray-result");

exports.PhysicsRayResult = _physicsRayResult.PhysicsRayResult;

var _boxColliderComponent = require("./components/collider/box-collider-component");

exports.BoxCollider3D = _boxColliderComponent.BoxCollider3D;

var _colliderComponent = require("./components/collider/collider-component");

exports.Collider3D = _colliderComponent.Collider3D;

var _sphereColliderComponent = require("./components/collider/sphere-collider-component");

exports.SphereCollider3D = _sphereColliderComponent.SphereCollider3D;

var _rigidBodyComponent = require("./components/rigid-body-component");

exports.RigidBody3D = _rigidBodyComponent.RigidBody3D;

var _constantForce = require("./components/constant-force");

var _physicsMaterial = require("./assets/physics-material");

exports.PhysicsMaterial = _physicsMaterial.PhysicsMaterial;

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
cc.Physics3DManager = _physicsManager.Physics3DManager;
cc.Collider3D = _colliderComponent.Collider3D;
cc.BoxCollider3D = _boxColliderComponent.BoxCollider3D;
cc.SphereCollider3D = _sphereColliderComponent.SphereCollider3D;
cc.RigidBody3D = _rigidBodyComponent.RigidBody3D;
cc.PhysicsRayResult = _physicsRayResult.PhysicsRayResult;
cc.ConstantForce = _constantForce.ConstantForce;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXGluZGV4LnRzIl0sIm5hbWVzIjpbImNjIiwiUGh5c2ljczNETWFuYWdlciIsIkNvbGxpZGVyM0QiLCJCb3hDb2xsaWRlcjNEIiwiU3BoZXJlQ29sbGlkZXIzRCIsIlJpZ2lkQm9keTNEIiwiUGh5c2ljc1JheVJlc3VsdCIsIkNvbnN0YW50Rm9yY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQWhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFzQkFBLEVBQUUsQ0FBQ0MsZ0JBQUgsR0FBc0JBLGdDQUF0QjtBQUNBRCxFQUFFLENBQUNFLFVBQUgsR0FBZ0JBLDZCQUFoQjtBQUNBRixFQUFFLENBQUNHLGFBQUgsR0FBbUJBLG1DQUFuQjtBQUNBSCxFQUFFLENBQUNJLGdCQUFILEdBQXNCQSx5Q0FBdEI7QUFDQUosRUFBRSxDQUFDSyxXQUFILEdBQWlCQSwrQkFBakI7QUFDQUwsRUFBRSxDQUFDTSxnQkFBSCxHQUFzQkEsa0NBQXRCO0FBQ0FOLEVBQUUsQ0FBQ08sYUFBSCxHQUFtQkEsNEJBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgUGh5c2ljczNETWFuYWdlciB9IGZyb20gJy4vcGh5c2ljcy1tYW5hZ2VyJztcclxuaW1wb3J0IHsgUGh5c2ljc1JheVJlc3VsdCB9IGZyb20gJy4vcGh5c2ljcy1yYXktcmVzdWx0JztcclxuaW1wb3J0IHsgQm94Q29sbGlkZXIzRCB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsaWRlci9ib3gtY29sbGlkZXItY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29sbGlkZXIzRCB9IGZyb20gJy4vY29tcG9uZW50cy9jb2xsaWRlci9jb2xsaWRlci1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTcGhlcmVDb2xsaWRlcjNEIH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxpZGVyL3NwaGVyZS1jb2xsaWRlci1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSaWdpZEJvZHkzRCB9IGZyb20gJy4vY29tcG9uZW50cy9yaWdpZC1ib2R5LWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnN0YW50Rm9yY2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY29uc3RhbnQtZm9yY2UnO1xyXG5pbXBvcnQgeyBQaHlzaWNzTWF0ZXJpYWwgfSBmcm9tICcuL2Fzc2V0cy9waHlzaWNzLW1hdGVyaWFsJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBQaHlzaWNzM0RNYW5hZ2VyLFxyXG4gICAgUGh5c2ljc1JheVJlc3VsdCxcclxuICAgIFBoeXNpY3NNYXRlcmlhbCxcclxuXHJcbiAgICBDb2xsaWRlcjNELFxyXG4gICAgQm94Q29sbGlkZXIzRCxcclxuICAgIFNwaGVyZUNvbGxpZGVyM0QsXHJcbiAgICBSaWdpZEJvZHkzRCxcclxufTtcclxuXHJcbmNjLlBoeXNpY3MzRE1hbmFnZXIgPSBQaHlzaWNzM0RNYW5hZ2VyO1xyXG5jYy5Db2xsaWRlcjNEID0gQ29sbGlkZXIzRDtcclxuY2MuQm94Q29sbGlkZXIzRCA9IEJveENvbGxpZGVyM0Q7XHJcbmNjLlNwaGVyZUNvbGxpZGVyM0QgPSBTcGhlcmVDb2xsaWRlcjNEO1xyXG5jYy5SaWdpZEJvZHkzRCA9IFJpZ2lkQm9keTNEO1xyXG5jYy5QaHlzaWNzUmF5UmVzdWx0ID0gUGh5c2ljc1JheVJlc3VsdDtcclxuY2MuQ29uc3RhbnRGb3JjZSA9IENvbnN0YW50Rm9yY2U7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9