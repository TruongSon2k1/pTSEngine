
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsCircleCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;
/**
 * @class PhysicsCircleCollider
 * @extends PhysicsCollider
 * @uses Collider.Circle
 */


var PhysicsCircleCollider = cc.Class({
  name: 'cc.PhysicsCircleCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Circle],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Circle',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var scaleX = Math.abs(scale.x);
    var scaleY = Math.abs(scale.y);
    var offsetX = this.offset.x / PTM_RATIO * scaleX;
    var offsetY = this.offset.y / PTM_RATIO * scaleY;
    var shape = new b2.CircleShape();
    shape.m_radius = this.radius / PTM_RATIO * scaleX;
    shape.m_p = new b2.Vec2(offsetX, offsetY);
    return shape;
  }
});
cc.PhysicsCircleCollider = module.exports = PhysicsCircleCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGNvbGxpZGVyXFxDQ1BoeXNpY3NDaXJjbGVDb2xsaWRlci5qcyJdLCJuYW1lcyI6WyJQVE1fUkFUSU8iLCJyZXF1aXJlIiwiUGh5c2ljc0NpcmNsZUNvbGxpZGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJQaHlzaWNzQ29sbGlkZXIiLCJtaXhpbnMiLCJDb2xsaWRlciIsIkNpcmNsZSIsImVkaXRvciIsIm1lbnUiLCJDQ19FRElUT1IiLCJyZXF1aXJlQ29tcG9uZW50IiwiUmlnaWRCb2R5IiwiX2NyZWF0ZVNoYXBlIiwic2NhbGUiLCJzY2FsZVgiLCJNYXRoIiwiYWJzIiwieCIsInNjYWxlWSIsInkiLCJvZmZzZXRYIiwib2Zmc2V0Iiwib2Zmc2V0WSIsInNoYXBlIiwiYjIiLCJDaXJjbGVTaGFwZSIsIm1fcmFkaXVzIiwicmFkaXVzIiwibV9wIiwiVmVjMiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUUscUJBQXFCLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2pDQyxFQUFBQSxJQUFJLEVBQUUsMEJBRDJCO0FBRWpDLGFBQVNGLEVBQUUsQ0FBQ0csZUFGcUI7QUFHakNDLEVBQUFBLE1BQU0sRUFBRSxDQUFDSixFQUFFLENBQUNLLFFBQUgsQ0FBWUMsTUFBYixDQUh5QjtBQUtqQ0MsRUFBQUEsTUFBTSxFQUFFO0FBQ0pDLElBQUFBLElBQUksRUFBRUMsU0FBUyxJQUFJLGtEQURmO0FBRUpDLElBQUFBLGdCQUFnQixFQUFFVixFQUFFLENBQUNXO0FBRmpCLEdBTHlCO0FBVWpDQyxFQUFBQSxZQUFZLEVBQUUsc0JBQVVDLEtBQVYsRUFBaUI7QUFDM0IsUUFBSUMsTUFBTSxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsS0FBSyxDQUFDSSxDQUFmLENBQWI7QUFDQSxRQUFJQyxNQUFNLEdBQUdILElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxLQUFLLENBQUNNLENBQWYsQ0FBYjtBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFLQyxNQUFMLENBQVlKLENBQVosR0FBY3BCLFNBQWQsR0FBMEJpQixNQUF4QztBQUNBLFFBQUlRLE9BQU8sR0FBRyxLQUFLRCxNQUFMLENBQVlGLENBQVosR0FBY3RCLFNBQWQsR0FBMEJxQixNQUF4QztBQUVBLFFBQUlLLEtBQUssR0FBRyxJQUFJQyxFQUFFLENBQUNDLFdBQVAsRUFBWjtBQUNBRixJQUFBQSxLQUFLLENBQUNHLFFBQU4sR0FBaUIsS0FBS0MsTUFBTCxHQUFjOUIsU0FBZCxHQUEwQmlCLE1BQTNDO0FBQ0FTLElBQUFBLEtBQUssQ0FBQ0ssR0FBTixHQUFZLElBQUlKLEVBQUUsQ0FBQ0ssSUFBUCxDQUFZVCxPQUFaLEVBQXFCRSxPQUFyQixDQUFaO0FBRUEsV0FBT0MsS0FBUDtBQUNIO0FBckJnQyxDQUFULENBQTVCO0FBd0JBdkIsRUFBRSxDQUFDRCxxQkFBSCxHQUEyQitCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhDLHFCQUE1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUGh5c2ljc0NpcmNsZUNvbGxpZGVyXHJcbiAqIEBleHRlbmRzIFBoeXNpY3NDb2xsaWRlclxyXG4gKiBAdXNlcyBDb2xsaWRlci5DaXJjbGVcclxuICovXHJcbnZhciBQaHlzaWNzQ2lyY2xlQ29sbGlkZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUGh5c2ljc0NpcmNsZUNvbGxpZGVyJyxcclxuICAgIGV4dGVuZHM6IGNjLlBoeXNpY3NDb2xsaWRlcixcclxuICAgIG1peGluczogW2NjLkNvbGxpZGVyLkNpcmNsZV0sXHJcblxyXG4gICAgZWRpdG9yOiB7XHJcbiAgICAgICAgbWVudTogQ0NfRURJVE9SICYmICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Db2xsaWRlci9DaXJjbGUnLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLlJpZ2lkQm9keVxyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlU2hhcGU6IGZ1bmN0aW9uIChzY2FsZSkge1xyXG4gICAgICAgIHZhciBzY2FsZVggPSBNYXRoLmFicyhzY2FsZS54KTtcclxuICAgICAgICB2YXIgc2NhbGVZID0gTWF0aC5hYnMoc2NhbGUueSk7XHJcbiAgICAgICAgdmFyIG9mZnNldFggPSB0aGlzLm9mZnNldC54L1BUTV9SQVRJTyAqIHNjYWxlWDtcclxuICAgICAgICB2YXIgb2Zmc2V0WSA9IHRoaXMub2Zmc2V0LnkvUFRNX1JBVElPICogc2NhbGVZO1xyXG5cclxuICAgICAgICB2YXIgc2hhcGUgPSBuZXcgYjIuQ2lyY2xlU2hhcGUoKTtcclxuICAgICAgICBzaGFwZS5tX3JhZGl1cyA9IHRoaXMucmFkaXVzIC8gUFRNX1JBVElPICogc2NhbGVYO1xyXG4gICAgICAgIHNoYXBlLm1fcCA9IG5ldyBiMi5WZWMyKG9mZnNldFgsIG9mZnNldFkpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2hhcGU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuUGh5c2ljc0NpcmNsZUNvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQ2lyY2xlQ29sbGlkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9