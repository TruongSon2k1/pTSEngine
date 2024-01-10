
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/index.js';
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
require('./box2d-adapter');

require('./CCPhysicsManager');

require('./CCRigidBody');

require('./CCPhysicsContact');

require('./collider/CCPhysicsCollider');

require('./collider/CCPhysicsChainCollider');

require('./collider/CCPhysicsCircleCollider');

require('./collider/CCPhysicsBoxCollider');

require('./collider/CCPhysicsPolygonCollider');

require('./joint/CCJoint');

require('./joint/CCDistanceJoint');

require('./joint/CCRevoluteJoint');

require('./joint/CCMouseJoint');

require('./joint/CCMotorJoint');

require('./joint/CCPrismaticJoint');

require('./joint/CCWeldJoint');

require('./joint/CCWheelJoint');

require('./joint/CCRopeJoint');

require('./platform/CCPhysicsContactListner');

require('./platform/CCPhysicsAABBQueryCallback');

require('./platform/CCPhysicsRayCastCallback');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGluZGV4LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxvQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsZUFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsb0JBQUQsQ0FBUDs7QUFFQUEsT0FBTyxDQUFDLDhCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxtQ0FBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsb0NBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGlDQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxxQ0FBRCxDQUFQOztBQUVBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHlCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyx5QkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsc0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHNCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMscUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHNCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxxQkFBRCxDQUFQOztBQUVBQSxPQUFPLENBQUMsb0NBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLHVDQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxxQ0FBRCxDQUFQIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxucmVxdWlyZSgnLi9ib3gyZC1hZGFwdGVyJyk7XG5yZXF1aXJlKCcuL0NDUGh5c2ljc01hbmFnZXInKTtcbnJlcXVpcmUoJy4vQ0NSaWdpZEJvZHknKTtcbnJlcXVpcmUoJy4vQ0NQaHlzaWNzQ29udGFjdCcpO1xuXG5yZXF1aXJlKCcuL2NvbGxpZGVyL0NDUGh5c2ljc0NvbGxpZGVyJyk7XG5yZXF1aXJlKCcuL2NvbGxpZGVyL0NDUGh5c2ljc0NoYWluQ29sbGlkZXInKTtcbnJlcXVpcmUoJy4vY29sbGlkZXIvQ0NQaHlzaWNzQ2lyY2xlQ29sbGlkZXInKTtcbnJlcXVpcmUoJy4vY29sbGlkZXIvQ0NQaHlzaWNzQm94Q29sbGlkZXInKTtcbnJlcXVpcmUoJy4vY29sbGlkZXIvQ0NQaHlzaWNzUG9seWdvbkNvbGxpZGVyJyk7XG5cbnJlcXVpcmUoJy4vam9pbnQvQ0NKb2ludCcpO1xucmVxdWlyZSgnLi9qb2ludC9DQ0Rpc3RhbmNlSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NSZXZvbHV0ZUpvaW50Jyk7XG5yZXF1aXJlKCcuL2pvaW50L0NDTW91c2VKb2ludCcpO1xucmVxdWlyZSgnLi9qb2ludC9DQ01vdG9ySm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NQcmlzbWF0aWNKb2ludCcpO1xucmVxdWlyZSgnLi9qb2ludC9DQ1dlbGRKb2ludCcpO1xucmVxdWlyZSgnLi9qb2ludC9DQ1doZWVsSm9pbnQnKTtcbnJlcXVpcmUoJy4vam9pbnQvQ0NSb3BlSm9pbnQnKTtcblxucmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ1BoeXNpY3NDb250YWN0TGlzdG5lcicpO1xucmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ1BoeXNpY3NBQUJCUXVlcnlDYWxsYmFjaycpO1xucmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ1BoeXNpY3NSYXlDYXN0Q2FsbGJhY2snKTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9