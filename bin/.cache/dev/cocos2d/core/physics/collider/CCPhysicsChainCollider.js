
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsChainCollider.js';
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
 * @class PhysicsChainCollider
 * @extends PolygonCollider
 */


var PhysicsChainCollider = cc.Class({
  name: 'cc.PhysicsChainCollider',
  "extends": cc.PhysicsCollider,
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Chain',
    inspector: CC_EDITOR && 'packages://inspector/inspectors/comps/physics/points-base-collider.js',
    requireComponent: cc.RigidBody
  },
  properties: {
    /**
     * !#en Whether the chain is loop
     * !#zh 链条是否首尾相连
     * @property loop
     * @type {Boolean}
     */
    loop: false,

    /**
     * !#en Chain points
     * !#zh 链条顶点数组
     * @property points
     * @type {Vec2[]}
     */
    points: {
      "default": function _default() {
        return [cc.v2(-50, 0), cc.v2(50, 0)];
      },
      type: [cc.Vec2]
    },
    threshold: {
      "default": 1,
      serializable: false,
      visible: false
    }
  },
  _createShape: function _createShape(scale) {
    var shape = new b2.ChainShape();
    var points = this.points;
    var vertices = [];

    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      vertices.push(new b2.Vec2(p.x / PTM_RATIO * scale.x, p.y / PTM_RATIO * scale.y));
    }

    if (this.loop) {
      shape.CreateLoop(vertices, vertices.length);
    } else {
      shape.CreateChain(vertices, vertices.length);
    }

    return shape;
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      this.resetPointsByContour();
    }
  },
  resetPointsByContour: CC_EDITOR && function () {
    var PhysicsUtils = Editor.require('scene://utils/physics');

    PhysicsUtils.resetPoints(this, {
      threshold: this.threshold,
      loop: this.loop
    });
  }
});
cc.PhysicsChainCollider = module.exports = PhysicsChainCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGNvbGxpZGVyXFxDQ1BoeXNpY3NDaGFpbkNvbGxpZGVyLmpzIl0sIm5hbWVzIjpbIlBUTV9SQVRJTyIsInJlcXVpcmUiLCJQaHlzaWNzQ2hhaW5Db2xsaWRlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiUGh5c2ljc0NvbGxpZGVyIiwiZWRpdG9yIiwibWVudSIsIkNDX0VESVRPUiIsImluc3BlY3RvciIsInJlcXVpcmVDb21wb25lbnQiLCJSaWdpZEJvZHkiLCJwcm9wZXJ0aWVzIiwibG9vcCIsInBvaW50cyIsInYyIiwidHlwZSIsIlZlYzIiLCJ0aHJlc2hvbGQiLCJzZXJpYWxpemFibGUiLCJ2aXNpYmxlIiwiX2NyZWF0ZVNoYXBlIiwic2NhbGUiLCJzaGFwZSIsImIyIiwiQ2hhaW5TaGFwZSIsInZlcnRpY2VzIiwiaSIsImxlbmd0aCIsInAiLCJwdXNoIiwieCIsInkiLCJDcmVhdGVMb29wIiwiQ3JlYXRlQ2hhaW4iLCJyZXNldEluRWRpdG9yIiwiZGlkUmVzZXRUb0RlZmF1bHQiLCJyZXNldFBvaW50c0J5Q29udG91ciIsIlBoeXNpY3NVdGlscyIsIkVkaXRvciIsInJlc2V0UG9pbnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUUsb0JBQW9CLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2hDQyxFQUFBQSxJQUFJLEVBQUUseUJBRDBCO0FBRWhDLGFBQVNGLEVBQUUsQ0FBQ0csZUFGb0I7QUFJaENDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUVDLFNBQVMsSUFBSSxpREFEZjtBQUVKQyxJQUFBQSxTQUFTLEVBQUVELFNBQVMsSUFBSSx1RUFGcEI7QUFHSkUsSUFBQUEsZ0JBQWdCLEVBQUVSLEVBQUUsQ0FBQ1M7QUFIakIsR0FKd0I7QUFVaENDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxJQUFJLEVBQUUsS0FQRTs7QUFTUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0osaUJBQVMsb0JBQVk7QUFDaEIsZUFBTyxDQUFDWixFQUFFLENBQUNhLEVBQUgsQ0FBTSxDQUFDLEVBQVAsRUFBVyxDQUFYLENBQUQsRUFBZ0JiLEVBQUUsQ0FBQ2EsRUFBSCxDQUFNLEVBQU4sRUFBVSxDQUFWLENBQWhCLENBQVA7QUFDSixPQUhHO0FBSUpDLE1BQUFBLElBQUksRUFBRSxDQUFDZCxFQUFFLENBQUNlLElBQUo7QUFKRixLQWZBO0FBc0JSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxDQURGO0FBRVBDLE1BQUFBLFlBQVksRUFBRSxLQUZQO0FBR1BDLE1BQUFBLE9BQU8sRUFBRTtBQUhGO0FBdEJILEdBVm9CO0FBdUNoQ0MsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxLQUFWLEVBQWlCO0FBQzNCLFFBQUlDLEtBQUssR0FBRyxJQUFJQyxFQUFFLENBQUNDLFVBQVAsRUFBWjtBQUVBLFFBQUlYLE1BQU0sR0FBRyxLQUFLQSxNQUFsQjtBQUNBLFFBQUlZLFFBQVEsR0FBRyxFQUFmOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsTUFBTSxDQUFDYyxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxVQUFJRSxDQUFDLEdBQUdmLE1BQU0sQ0FBQ2EsQ0FBRCxDQUFkO0FBQ0FELE1BQUFBLFFBQVEsQ0FBQ0ksSUFBVCxDQUFlLElBQUlOLEVBQUUsQ0FBQ1AsSUFBUCxDQUFZWSxDQUFDLENBQUNFLENBQUYsR0FBSWhDLFNBQUosR0FBY3VCLEtBQUssQ0FBQ1MsQ0FBaEMsRUFBbUNGLENBQUMsQ0FBQ0csQ0FBRixHQUFJakMsU0FBSixHQUFjdUIsS0FBSyxDQUFDVSxDQUF2RCxDQUFmO0FBQ0g7O0FBRUQsUUFBSSxLQUFLbkIsSUFBVCxFQUFlO0FBQ1hVLE1BQUFBLEtBQUssQ0FBQ1UsVUFBTixDQUFpQlAsUUFBakIsRUFBMkJBLFFBQVEsQ0FBQ0UsTUFBcEM7QUFDSCxLQUZELE1BR0s7QUFDREwsTUFBQUEsS0FBSyxDQUFDVyxXQUFOLENBQWtCUixRQUFsQixFQUE0QkEsUUFBUSxDQUFDRSxNQUFyQztBQUNIOztBQUNELFdBQU9MLEtBQVA7QUFDSCxHQXhEK0I7QUEwRGhDWSxFQUFBQSxhQUFhLEVBQUUzQixTQUFTLElBQUksVUFBVTRCLGlCQUFWLEVBQTZCO0FBQ3JELFFBQUlBLGlCQUFKLEVBQXVCO0FBQ25CLFdBQUtDLG9CQUFMO0FBQ0g7QUFDSixHQTlEK0I7QUFnRWhDQSxFQUFBQSxvQkFBb0IsRUFBRTdCLFNBQVMsSUFBSSxZQUFZO0FBQzNDLFFBQUk4QixZQUFZLEdBQUdDLE1BQU0sQ0FBQ3ZDLE9BQVAsQ0FBZSx1QkFBZixDQUFuQjs7QUFDQXNDLElBQUFBLFlBQVksQ0FBQ0UsV0FBYixDQUF5QixJQUF6QixFQUErQjtBQUFDdEIsTUFBQUEsU0FBUyxFQUFFLEtBQUtBLFNBQWpCO0FBQTRCTCxNQUFBQSxJQUFJLEVBQUUsS0FBS0E7QUFBdkMsS0FBL0I7QUFDSDtBQW5FK0IsQ0FBVCxDQUEzQjtBQXNFQVgsRUFBRSxDQUFDRCxvQkFBSCxHQUEwQndDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpDLG9CQUEzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgUGh5c2ljc0NoYWluQ29sbGlkZXJcclxuICogQGV4dGVuZHMgUG9seWdvbkNvbGxpZGVyXHJcbiAqL1xyXG52YXIgUGh5c2ljc0NoYWluQ29sbGlkZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUGh5c2ljc0NoYWluQ29sbGlkZXInLFxyXG4gICAgZXh0ZW5kczogY2MuUGh5c2ljc0NvbGxpZGVyLFxyXG5cclxuICAgIGVkaXRvcjoge1xyXG4gICAgICAgIG1lbnU6IENDX0VESVRPUiAmJiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvQ2hhaW4nLFxyXG4gICAgICAgIGluc3BlY3RvcjogQ0NfRURJVE9SICYmICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3BoeXNpY3MvcG9pbnRzLWJhc2UtY29sbGlkZXIuanMnLFxyXG4gICAgICAgIHJlcXVpcmVDb21wb25lbnQ6IGNjLlJpZ2lkQm9keVxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHRoZSBjaGFpbiBpcyBsb29wXHJcbiAgICAgICAgICogISN6aCDpk77mnaHmmK/lkKbpppblsL7nm7jov55cclxuICAgICAgICAgKiBAcHJvcGVydHkgbG9vcFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxvb3A6IGZhbHNlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIENoYWluIHBvaW50c1xyXG4gICAgICAgICAqICEjemgg6ZO+5p2h6aG254K55pWw57uEXHJcbiAgICAgICAgICogQHByb3BlcnR5IHBvaW50c1xyXG4gICAgICAgICAqIEB0eXBlIHtWZWMyW119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcG9pbnRzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICByZXR1cm4gW2NjLnYyKC01MCwgMCksIGNjLnYyKDUwLCAwKV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5WZWMyXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRocmVzaG9sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVTaGFwZTogZnVuY3Rpb24gKHNjYWxlKSB7XHJcbiAgICAgICAgdmFyIHNoYXBlID0gbmV3IGIyLkNoYWluU2hhcGUoKTtcclxuXHJcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzO1xyXG4gICAgICAgIHZhciB2ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwID0gcG9pbnRzW2ldO1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKCBuZXcgYjIuVmVjMihwLngvUFRNX1JBVElPKnNjYWxlLngsIHAueS9QVE1fUkFUSU8qc2NhbGUueSkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvb3ApIHtcclxuICAgICAgICAgICAgc2hhcGUuQ3JlYXRlTG9vcCh2ZXJ0aWNlcywgdmVydGljZXMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNoYXBlLkNyZWF0ZUNoYWluKHZlcnRpY2VzLCB2ZXJ0aWNlcy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2hhcGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0SW5FZGl0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoZGlkUmVzZXRUb0RlZmF1bHQpIHtcclxuICAgICAgICBpZiAoZGlkUmVzZXRUb0RlZmF1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFBvaW50c0J5Q29udG91cigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXRQb2ludHNCeUNvbnRvdXI6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIFBoeXNpY3NVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL3BoeXNpY3MnKTtcclxuICAgICAgICBQaHlzaWNzVXRpbHMucmVzZXRQb2ludHModGhpcywge3RocmVzaG9sZDogdGhpcy50aHJlc2hvbGQsIGxvb3A6IHRoaXMubG9vcH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlBoeXNpY3NDaGFpbkNvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzQ2hhaW5Db2xsaWRlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=