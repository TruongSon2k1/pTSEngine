
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsPolygonCollider.js';
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

var PolygonSeparator = require('../CCPolygonSeparator');
/**
 * @class PhysicsPolygonCollider
 * @extends PhysicsCollider
 * @uses Collider.Polygon
 */


var PhysicsPolygonCollider = cc.Class({
  name: 'cc.PhysicsPolygonCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Polygon],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Polygon',
    inspector: CC_EDITOR && 'packages://inspector/inspectors/comps/physics/points-base-collider.js',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var shapes = [];
    var points = this.points; // check if last point equal to first point

    if (points.length > 0 && points[0].equals(points[points.length - 1])) {
      points.length -= 1;
    }

    var polys = PolygonSeparator.ConvexPartition(points);
    var offset = this.offset;

    for (var i = 0; i < polys.length; i++) {
      var poly = polys[i];
      var shape = null,
          vertices = [];
      var firstVertice = null;

      for (var j = 0, l = poly.length; j < l; j++) {
        if (!shape) {
          shape = new b2.PolygonShape();
        }

        var p = poly[j];
        var x = (p.x + offset.x) / PTM_RATIO * scale.x;
        var y = (p.y + offset.y) / PTM_RATIO * scale.y;
        var v = new b2.Vec2(x, y);
        vertices.push(v);

        if (!firstVertice) {
          firstVertice = v;
        }

        if (vertices.length === b2.maxPolygonVertices) {
          shape.Set(vertices, vertices.length);
          shapes.push(shape);
          shape = null;

          if (j < l - 1) {
            vertices = [firstVertice, vertices[vertices.length - 1]];
          }
        }
      }

      if (shape) {
        shape.Set(vertices, vertices.length);
        shapes.push(shape);
      }
    }

    return shapes;
  }
});
cc.PhysicsPolygonCollider = module.exports = PhysicsPolygonCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXGNvbGxpZGVyXFxDQ1BoeXNpY3NQb2x5Z29uQ29sbGlkZXIuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIlBvbHlnb25TZXBhcmF0b3IiLCJQaHlzaWNzUG9seWdvbkNvbGxpZGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJQaHlzaWNzQ29sbGlkZXIiLCJtaXhpbnMiLCJDb2xsaWRlciIsIlBvbHlnb24iLCJlZGl0b3IiLCJtZW51IiwiQ0NfRURJVE9SIiwiaW5zcGVjdG9yIiwicmVxdWlyZUNvbXBvbmVudCIsIlJpZ2lkQm9keSIsIl9jcmVhdGVTaGFwZSIsInNjYWxlIiwic2hhcGVzIiwicG9pbnRzIiwibGVuZ3RoIiwiZXF1YWxzIiwicG9seXMiLCJDb252ZXhQYXJ0aXRpb24iLCJvZmZzZXQiLCJpIiwicG9seSIsInNoYXBlIiwidmVydGljZXMiLCJmaXJzdFZlcnRpY2UiLCJqIiwibCIsImIyIiwiUG9seWdvblNoYXBlIiwicCIsIngiLCJ5IiwidiIsIlZlYzIiLCJwdXNoIiwibWF4UG9seWdvblZlcnRpY2VzIiwiU2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7O0FBQ0EsSUFBSUUsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUE5QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlFLHNCQUFzQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQ0MsRUFBQUEsSUFB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QXZCLENBQVg7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsVUFBSU8sS0FBSixFQUFXO0FBQ1BBLFFBQUFBLEtBQUssQ0FBQ2MsR0FBTixDQUFVYixRQUFWLEVBQW9CQSxRQUFRLENBQUNSLE1BQTdCO0FBQ0FGLFFBQUFBLE1BQU0sQ0FBQ3FCLElBQVAsQ0FBWVosS0FBWjtBQUNIO0FBQ0o7O0FBRUQsV0FBT1QsTUFBUDtBQUNIO0FBL0RpQyxDQUFULENBQTdCO0FBa0VBZixFQUFFLENBQUNELHNCQUFILEdBQTRCd0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekMsc0JBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgUFRNX1JBVElPID0gcmVxdWlyZSgnLi4vQ0NQaHlzaWNzVHlwZXMnKS5QVE1fUkFUSU87XG52YXIgUG9seWdvblNlcGFyYXRvciA9IHJlcXVpcmUoJy4uL0NDUG9seWdvblNlcGFyYXRvcicpO1xuXG4vKipcbiAqIEBjbGFzcyBQaHlzaWNzUG9seWdvbkNvbGxpZGVyXG4gKiBAZXh0ZW5kcyBQaHlzaWNzQ29sbGlkZXJcbiAqIEB1c2VzIENvbGxpZGVyLlBvbHlnb25cbiAqL1xudmFyIFBoeXNpY3NQb2x5Z29uQ29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlBoeXNpY3NQb2x5Z29uQ29sbGlkZXInLFxuICAgIGV4dGVuZHM6IGNjLlBoeXNpY3NDb2xsaWRlcixcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5Qb2x5Z29uXSxcblxuICAgIGVkaXRvcjoge1xuICAgICAgICBtZW51OiBDQ19FRElUT1IgJiYgJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5waHlzaWNzL0NvbGxpZGVyL1BvbHlnb24nLFxuICAgICAgICBpbnNwZWN0b3I6IENDX0VESVRPUiAmJiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9waHlzaWNzL3BvaW50cy1iYXNlLWNvbGxpZGVyLmpzJyxcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuUmlnaWRCb2R5XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFwZTogZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgICAgIHZhciBzaGFwZXMgPSBbXTtcblxuICAgICAgICB2YXIgcG9pbnRzID0gdGhpcy5wb2ludHM7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgbGFzdCBwb2ludCBlcXVhbCB0byBmaXJzdCBwb2ludFxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA+IDAgJiYgcG9pbnRzWzBdLmVxdWFscyhwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdKSkge1xuICAgICAgICAgICAgcG9pbnRzLmxlbmd0aCAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvbHlzID0gUG9seWdvblNlcGFyYXRvci5Db252ZXhQYXJ0aXRpb24ocG9pbnRzKTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwb2x5ID0gcG9seXNbaV07XG5cbiAgICAgICAgICAgIHZhciBzaGFwZSA9IG51bGwsIHZlcnRpY2VzID0gW107XG4gICAgICAgICAgICB2YXIgZmlyc3RWZXJ0aWNlID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGwgPSBwb2x5Lmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICghc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSBuZXcgYjIuUG9seWdvblNoYXBlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBwID0gcG9seVtqXTtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IChwLnggKyBvZmZzZXQueCkvUFRNX1JBVElPKnNjYWxlLng7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSAocC55ICsgb2Zmc2V0LnkpL1BUTV9SQVRJTypzY2FsZS55O1xuICAgICAgICAgICAgICAgIHZhciB2ID0gbmV3IGIyLlZlYzIoeCwgeSk7XG4gICAgICAgICAgICAgICAgdmVydGljZXMucHVzaCggdiApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdFZlcnRpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RWZXJ0aWNlID0gdjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmVydGljZXMubGVuZ3RoID09PSBiMi5tYXhQb2x5Z29uVmVydGljZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuU2V0KHZlcnRpY2VzLCB2ZXJ0aWNlcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBzaGFwZXMucHVzaChzaGFwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2hhcGUgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChqIDwgbCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzID0gW2ZpcnN0VmVydGljZSwgdmVydGljZXNbdmVydGljZXMubGVuZ3RoIC0gMV1dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5TZXQodmVydGljZXMsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgc2hhcGVzLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNoYXBlcztcbiAgICB9XG59KTtcblxuY2MuUGh5c2ljc1BvbHlnb25Db2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc1BvbHlnb25Db2xsaWRlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9