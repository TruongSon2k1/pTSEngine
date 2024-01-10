
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-util.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.groupIndexToBitMask = groupIndexToBitMask;
exports.toCannonRaycastOptions = toCannonRaycastOptions;
exports.fillRaycastResult = fillRaycastResult;
exports.commitShapeUpdates = commitShapeUpdates;
exports.deprecatedEventMap = void 0;

var _util = require("../framework/util");

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
var Vec3 = cc.Vec3;

function groupIndexToBitMask(groupIndex, out) {
  var categoryBits = 1 << groupIndex;
  var maskBits = 0;
  var bits = cc.game.collisionMatrix[groupIndex];

  if (!bits) {
    cc.error("cannon-utils: group is not exist", groupIndex);
    return;
  }

  for (var i = 0; i < bits.length; i++) {
    if (!bits[i]) continue;
    maskBits |= 1 << i;
  }

  out.collisionFilterGroup = categoryBits;
  out.collisionFilterMask = maskBits;
}

function toCannonRaycastOptions(out, options) {
  out.checkCollisionResponse = !options.queryTrigger;
  groupIndexToBitMask(options.groupIndex, out);
  out.skipBackFaces = false;
}

function fillRaycastResult(result, cannonResult) {
  result._assign(Vec3.copy(new Vec3(), cannonResult.hitPointWorld), cannonResult.distance, (0, _util.getWrap)(cannonResult.shape).collider);
}

function commitShapeUpdates(body) {
  body.aabbNeedsUpdate = true;
  body.updateMassProperties();
  body.updateBoundingRadius();
}

var deprecatedEventMap = {
  'onCollisionEnter': 'collision-enter',
  'onCollisionStay': 'collision-stay',
  'onCollisionExit': 'collision-exit',
  'onTriggerEnter': 'trigger-enter',
  'onTriggerStay': 'trigger-stay',
  'onTriggerExit': 'trigger-exit'
};
exports.deprecatedEventMap = deprecatedEventMap;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXGNhbm5vbi11dGlsLnRzIl0sIm5hbWVzIjpbIlZlYzMiLCJjYyIsImdyb3VwSW5kZXhUb0JpdE1hc2siLCJncm91cEluZGV4Iiwib3V0IiwiY2F0ZWdvcnlCaXRzIiwibWFza0JpdHMiLCJiaXRzIiwiZ2FtZSIsImNvbGxpc2lvbk1hdHJpeCIsImVycm9yIiwiaSIsImxlbmd0aCIsImNvbGxpc2lvbkZpbHRlckdyb3VwIiwiY29sbGlzaW9uRmlsdGVyTWFzayIsInRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMiLCJvcHRpb25zIiwiY2hlY2tDb2xsaXNpb25SZXNwb25zZSIsInF1ZXJ5VHJpZ2dlciIsInNraXBCYWNrRmFjZXMiLCJmaWxsUmF5Y2FzdFJlc3VsdCIsInJlc3VsdCIsImNhbm5vblJlc3VsdCIsIl9hc3NpZ24iLCJjb3B5IiwiaGl0UG9pbnRXb3JsZCIsImRpc3RhbmNlIiwic2hhcGUiLCJjb2xsaWRlciIsImNvbW1pdFNoYXBlVXBkYXRlcyIsImJvZHkiLCJhYWJiTmVlZHNVcGRhdGUiLCJ1cGRhdGVNYXNzUHJvcGVydGllcyIsInVwZGF0ZUJvdW5kaW5nUmFkaXVzIiwiZGVwcmVjYXRlZEV2ZW50TWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7QUExQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUUEsSUFBTUEsSUFBSSxHQUFHQyxFQUFFLENBQUNELElBQWhCOztBQUVPLFNBQVNFLG1CQUFULENBQThCQyxVQUE5QixFQUFrREMsR0FBbEQsRUFBdUg7QUFDMUgsTUFBSUMsWUFBWSxHQUFHLEtBQUtGLFVBQXhCO0FBQ0EsTUFBSUcsUUFBUSxHQUFHLENBQWY7QUFDQSxNQUFJQyxJQUFJLEdBQUdOLEVBQUUsQ0FBQ08sSUFBSCxDQUFRQyxlQUFSLENBQXdCTixVQUF4QixDQUFYOztBQUNBLE1BQUksQ0FBQ0ksSUFBTCxFQUFXO0FBQ1BOLElBQUFBLEVBQUUsQ0FBQ1MsS0FBSCxDQUFTLGtDQUFULEVBQTZDUCxVQUE3QztBQUNBO0FBQ0g7O0FBQ0QsT0FBSyxJQUFJUSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixJQUFJLENBQUNLLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXNDO0FBQ2xDLFFBQUksQ0FBQ0osSUFBSSxDQUFDSSxDQUFELENBQVQsRUFBYztBQUNkTCxJQUFBQSxRQUFRLElBQUksS0FBS0ssQ0FBakI7QUFDSDs7QUFDRFAsRUFBQUEsR0FBRyxDQUFDUyxvQkFBSixHQUEyQlIsWUFBM0I7QUFDQUQsRUFBQUEsR0FBRyxDQUFDVSxtQkFBSixHQUEwQlIsUUFBMUI7QUFDSDs7QUFFTSxTQUFTUyxzQkFBVCxDQUFpQ1gsR0FBakMsRUFBOERZLE9BQTlELEVBQXdGO0FBQzNGWixFQUFBQSxHQUFHLENBQUNhLHNCQUFKLEdBQTZCLENBQUNELE9BQU8sQ0FBQ0UsWUFBdEM7QUFDQWhCLEVBQUFBLG1CQUFtQixDQUFDYyxPQUFPLENBQUNiLFVBQVQsRUFBcUJDLEdBQXJCLENBQW5CO0FBQ0FBLEVBQUFBLEdBQUcsQ0FBQ2UsYUFBSixHQUFvQixLQUFwQjtBQUNIOztBQUVNLFNBQVNDLGlCQUFULENBQTRCQyxNQUE1QixFQUFzREMsWUFBdEQsRUFBMEY7QUFDN0ZELEVBQUFBLE1BQU0sQ0FBQ0UsT0FBUCxDQUNJdkIsSUFBSSxDQUFDd0IsSUFBTCxDQUFVLElBQUl4QixJQUFKLEVBQVYsRUFBc0JzQixZQUFZLENBQUNHLGFBQW5DLENBREosRUFFSUgsWUFBWSxDQUFDSSxRQUZqQixFQUdJLG1CQUFvQkosWUFBWSxDQUFDSyxLQUFqQyxFQUF3Q0MsUUFINUM7QUFLSDs7QUFFTSxTQUFTQyxrQkFBVCxDQUE2QkMsSUFBN0IsRUFBZ0Q7QUFDbkRBLEVBQUFBLElBQUksQ0FBQ0MsZUFBTCxHQUF1QixJQUF2QjtBQUNBRCxFQUFBQSxJQUFJLENBQUNFLG9CQUFMO0FBQ0FGLEVBQUFBLElBQUksQ0FBQ0csb0JBQUw7QUFDSDs7QUFFTSxJQUFNQyxrQkFBa0IsR0FBRztBQUM5QixzQkFBb0IsaUJBRFU7QUFFOUIscUJBQW1CLGdCQUZXO0FBRzlCLHFCQUFtQixnQkFIVztBQUk5QixvQkFBa0IsZUFKWTtBQUs5QixtQkFBaUIsY0FMYTtBQU05QixtQkFBaUI7QUFOYSxDQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBDQU5OT04gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvY2Fubm9uL2Nhbm5vbic7XHJcbmltcG9ydCB7IGdldFdyYXAgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbCc7XHJcbmltcG9ydCB7IElCYXNlU2hhcGUgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XHJcbmltcG9ydCB7IFBoeXNpY3NSYXlSZXN1bHQgfSBmcm9tICcuLi9mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBJUmF5Y2FzdE9wdGlvbnMgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy13b3JsZCc7XHJcblxyXG5jb25zdCBWZWMzID0gY2MuVmVjMztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBncm91cEluZGV4VG9CaXRNYXNrIChncm91cEluZGV4OiBudW1iZXIsIG91dDogeyBjb2xsaXNpb25GaWx0ZXJHcm91cDogbnVtYmVyOyBjb2xsaXNpb25GaWx0ZXJNYXNrOiBudW1iZXI7IH0pIHtcclxuICAgIGxldCBjYXRlZ29yeUJpdHMgPSAxIDw8IGdyb3VwSW5kZXg7XHJcbiAgICBsZXQgbWFza0JpdHMgPSAwO1xyXG4gICAgbGV0IGJpdHMgPSBjYy5nYW1lLmNvbGxpc2lvbk1hdHJpeFtncm91cEluZGV4XTtcclxuICAgIGlmICghYml0cykge1xyXG4gICAgICAgIGNjLmVycm9yKFwiY2Fubm9uLXV0aWxzOiBncm91cCBpcyBub3QgZXhpc3RcIiwgZ3JvdXBJbmRleCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFiaXRzW2ldKSBjb250aW51ZTtcclxuICAgICAgICBtYXNrQml0cyB8PSAxIDw8IGk7XHJcbiAgICB9XHJcbiAgICBvdXQuY29sbGlzaW9uRmlsdGVyR3JvdXAgPSBjYXRlZ29yeUJpdHM7XHJcbiAgICBvdXQuY29sbGlzaW9uRmlsdGVyTWFzayA9IG1hc2tCaXRzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9DYW5ub25SYXljYXN0T3B0aW9ucyAob3V0OiBDQU5OT04uSVJheWNhc3RPcHRpb25zLCBvcHRpb25zOiBJUmF5Y2FzdE9wdGlvbnMpIHtcclxuICAgIG91dC5jaGVja0NvbGxpc2lvblJlc3BvbnNlID0gIW9wdGlvbnMucXVlcnlUcmlnZ2VyO1xyXG4gICAgZ3JvdXBJbmRleFRvQml0TWFzayhvcHRpb25zLmdyb3VwSW5kZXgsIG91dCk7XHJcbiAgICBvdXQuc2tpcEJhY2tGYWNlcyA9IGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbFJheWNhc3RSZXN1bHQgKHJlc3VsdDogUGh5c2ljc1JheVJlc3VsdCwgY2Fubm9uUmVzdWx0OiBDQU5OT04uUmF5Y2FzdFJlc3VsdCkge1xyXG4gICAgcmVzdWx0Ll9hc3NpZ24oXHJcbiAgICAgICAgVmVjMy5jb3B5KG5ldyBWZWMzKCksIGNhbm5vblJlc3VsdC5oaXRQb2ludFdvcmxkKSxcclxuICAgICAgICBjYW5ub25SZXN1bHQuZGlzdGFuY2UsXHJcbiAgICAgICAgZ2V0V3JhcDxJQmFzZVNoYXBlPihjYW5ub25SZXN1bHQuc2hhcGUpLmNvbGxpZGVyXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0U2hhcGVVcGRhdGVzIChib2R5OiBDQU5OT04uQm9keSkge1xyXG4gICAgYm9keS5hYWJiTmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgYm9keS51cGRhdGVNYXNzUHJvcGVydGllcygpO1xyXG4gICAgYm9keS51cGRhdGVCb3VuZGluZ1JhZGl1cygpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVwcmVjYXRlZEV2ZW50TWFwID0ge1xyXG4gICAgJ29uQ29sbGlzaW9uRW50ZXInOiAnY29sbGlzaW9uLWVudGVyJyxcclxuICAgICdvbkNvbGxpc2lvblN0YXknOiAnY29sbGlzaW9uLXN0YXknLFxyXG4gICAgJ29uQ29sbGlzaW9uRXhpdCc6ICdjb2xsaXNpb24tZXhpdCcsXHJcbiAgICAnb25UcmlnZ2VyRW50ZXInOiAndHJpZ2dlci1lbnRlcicsXHJcbiAgICAnb25UcmlnZ2VyU3RheSc6ICd0cmlnZ2VyLXN0YXknLFxyXG4gICAgJ29uVHJpZ2dlckV4aXQnOiAndHJpZ2dlci1leGl0JyxcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=