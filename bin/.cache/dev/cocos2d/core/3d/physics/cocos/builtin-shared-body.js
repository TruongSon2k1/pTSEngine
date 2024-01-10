
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/builtin-shared-body.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinSharedBody = void 0;

var _util = require("../framework/util");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var intersect = cc.geomUtils.intersect;
var fastRemove = cc.js.array.fastRemove;
var v3_0 = new cc.Vec3();
var v3_1 = new cc.Vec3();
var quat_0 = new cc.Quat();
/**
 * Built-in static collider, no physical forces involved
 */

var BuiltinSharedBody = /*#__PURE__*/function () {
  BuiltinSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld) {
    var key = node._id;

    if (BuiltinSharedBody.sharedBodiesMap.has(key)) {
      return BuiltinSharedBody.sharedBodiesMap.get(key);
    } else {
      var newSB = new BuiltinSharedBody(node, wrappedWorld);
      BuiltinSharedBody.sharedBodiesMap.set(node._id, newSB);
      return newSB;
    }
  };

  function BuiltinSharedBody(node, world) {
    this._id = void 0;
    this.index = -1;
    this.ref = 0;
    this.node = void 0;
    this.world = void 0;
    this.shapes = [];
    this._id = BuiltinSharedBody.idCounter++;
    this.node = node;
    this.world = world;
  }

  var _proto = BuiltinSharedBody.prototype;

  _proto.intersects = function intersects(body) {
    for (var i = 0; i < this.shapes.length; i++) {
      var shapeA = this.shapes[i];

      for (var j = 0; j < body.shapes.length; j++) {
        var shapeB = body.shapes[j];

        if (intersect.resolve(shapeA.worldShape, shapeB.worldShape)) {
          this.world.shapeArr.push(shapeA);
          this.world.shapeArr.push(shapeB);
        }
      }
    }
  };

  _proto.addShape = function addShape(shape) {
    var i = this.shapes.indexOf(shape);

    if (i < 0) {
      this.shapes.push(shape);
    }
  };

  _proto.removeShape = function removeShape(shape) {
    fastRemove(this.shapes, shape);
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics(force) {
    if (force === void 0) {
      force = false;
    }

    var node = this.node;
    var needUpdateTransform = (0, _util.worldDirty)(node);
    if (!force && !needUpdateTransform) return;
    node.getWorldPosition(v3_0);
    node.getWorldRotation(quat_0);
    node.getWorldScale(v3_1);

    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].transform(node._worldMatrix, v3_0, quat_0, v3_1);
    }
  };

  _proto.destory = function destory() {
    BuiltinSharedBody.sharedBodiesMap["delete"](this.node._id);
    this.node = null;
    this.world = null;
    this.shapes = null;
  };

  _createClass(BuiltinSharedBody, [{
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * add or remove from world \
     * add, if enable \
     * remove, if disable & shapes.length == 0 & wrappedBody disable
     */

  }, {
    key: "enabled",
    set: function set(v) {
      if (v) {
        if (this.index < 0) {
          this.index = this.world.bodies.length;
          this.world.addSharedBody(this);
          this.syncSceneToPhysics(true);
        }
      } else {
        if (this.index >= 0) {
          var isRemove = this.shapes.length == 0;

          if (isRemove) {
            this.index = -1;
            this.world.removeSharedBody(this);
          }
        }
      }
    }
  }, {
    key: "reference",
    set: function set(v) {
      v ? this.ref++ : this.ref--;

      if (this.ref == 0) {
        this.destory();
      }
    }
    /** id generator */

  }]);

  return BuiltinSharedBody;
}();

exports.BuiltinSharedBody = BuiltinSharedBody;
BuiltinSharedBody.sharedBodiesMap = new Map();
BuiltinSharedBody.idCounter = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjb2Nvc1xcYnVpbHRpbi1zaGFyZWQtYm9keS50cyJdLCJuYW1lcyI6WyJpbnRlcnNlY3QiLCJjYyIsImdlb21VdGlscyIsImZhc3RSZW1vdmUiLCJqcyIsImFycmF5IiwidjNfMCIsIlZlYzMiLCJ2M18xIiwicXVhdF8wIiwiUXVhdCIsIkJ1aWx0aW5TaGFyZWRCb2R5IiwiZ2V0U2hhcmVkQm9keSIsIm5vZGUiLCJ3cmFwcGVkV29ybGQiLCJrZXkiLCJfaWQiLCJzaGFyZWRCb2RpZXNNYXAiLCJoYXMiLCJnZXQiLCJuZXdTQiIsInNldCIsIndvcmxkIiwiaW5kZXgiLCJyZWYiLCJzaGFwZXMiLCJpZENvdW50ZXIiLCJpbnRlcnNlY3RzIiwiYm9keSIsImkiLCJsZW5ndGgiLCJzaGFwZUEiLCJqIiwic2hhcGVCIiwicmVzb2x2ZSIsIndvcmxkU2hhcGUiLCJzaGFwZUFyciIsInB1c2giLCJhZGRTaGFwZSIsInNoYXBlIiwiaW5kZXhPZiIsInJlbW92ZVNoYXBlIiwic3luY1NjZW5lVG9QaHlzaWNzIiwiZm9yY2UiLCJuZWVkVXBkYXRlVHJhbnNmb3JtIiwiZ2V0V29ybGRQb3NpdGlvbiIsImdldFdvcmxkUm90YXRpb24iLCJnZXRXb3JsZFNjYWxlIiwidHJhbnNmb3JtIiwiX3dvcmxkTWF0cml4IiwiZGVzdG9yeSIsInYiLCJib2RpZXMiLCJhZGRTaGFyZWRCb2R5IiwiaXNSZW1vdmUiLCJyZW1vdmVTaGFyZWRCb2R5IiwiTWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhRixTQUEvQjtBQUNBLElBQU1HLFVBQVUsR0FBR0YsRUFBRSxDQUFDRyxFQUFILENBQU1DLEtBQU4sQ0FBWUYsVUFBL0I7QUFDQSxJQUFNRyxJQUFJLEdBQUcsSUFBSUwsRUFBRSxDQUFDTSxJQUFQLEVBQWI7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K0IsUUFBUSxHQUFJLEtBQUs3QixNQUFMLENBQVlLLE1BQVosSUFBc0IsQ0FBeEM7O0FBQ0EsY0FBSXdCLFFBQUosRUFBYztBQUNWLGlCQUFLL0IsS0FBTCxHQUFhLENBQUMsQ0FBZDtBQUNBLGlCQUFLRCxLQUFMLENBQVdpQyxnQkFBWCxDQUE0QixJQUE1QjtBQUNIO0FBQ0o7QUFDSjtBQUNKOzs7U0FFRCxhQUFlSixDQUFmLEVBQTJCO0FBQ3ZCQSxNQUFBQSxDQUFDLEdBQUcsS0FBSzNCLEdBQUwsRUFBSCxHQUFnQixLQUFLQSxHQUFMLEVBQWpCOztBQUNBLFVBQUksS0FBS0EsR0FBTCxJQUFZLENBQWhCLEVBQW1CO0FBQUUsYUFBSzBCLE9BQUw7QUFBaUI7QUFDekM7QUFFRDs7Ozs7Ozs7QUEvQ1N2QyxrQkFFZU0sa0JBQWtCLElBQUl1QyxHQUFKO0FBRmpDN0Msa0JBZ0RNZSxZQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuaW1wb3J0IHsgQnVpbHRJbldvcmxkIH0gZnJvbSAnLi9idWlsdGluLXdvcmxkJztcclxuaW1wb3J0IHsgQnVpbHRpblNoYXBlIH0gZnJvbSAnLi9zaGFwZXMvYnVpbHRpbi1zaGFwZSc7XHJcbmltcG9ydCB7IHdvcmxkRGlydHkgfSBmcm9tIFwiLi4vZnJhbWV3b3JrL3V0aWxcIlxyXG5cclxuY29uc3QgaW50ZXJzZWN0ID0gY2MuZ2VvbVV0aWxzLmludGVyc2VjdDtcclxuY29uc3QgZmFzdFJlbW92ZSA9IGNjLmpzLmFycmF5LmZhc3RSZW1vdmU7XHJcbmNvbnN0IHYzXzAgPSBuZXcgY2MuVmVjMygpO1xyXG5jb25zdCB2M18xID0gbmV3IGNjLlZlYzMoKTtcclxuY29uc3QgcXVhdF8wID0gbmV3IGNjLlF1YXQoKTtcclxuXHJcblxyXG4vKipcclxuICogQnVpbHQtaW4gc3RhdGljIGNvbGxpZGVyLCBubyBwaHlzaWNhbCBmb3JjZXMgaW52b2x2ZWRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBCdWlsdGluU2hhcmVkQm9keSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgc2hhcmVkQm9kaWVzTWFwID0gbmV3IE1hcDxzdHJpbmcsIEJ1aWx0aW5TaGFyZWRCb2R5PigpO1xyXG5cclxuICAgIHN0YXRpYyBnZXRTaGFyZWRCb2R5IChub2RlOiBjYy5Ob2RlLCB3cmFwcGVkV29ybGQ6IEJ1aWx0SW5Xb3JsZCkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IG5vZGUuX2lkO1xyXG4gICAgICAgIGlmIChCdWlsdGluU2hhcmVkQm9keS5zaGFyZWRCb2RpZXNNYXAuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1aWx0aW5TaGFyZWRCb2R5LnNoYXJlZEJvZGllc01hcC5nZXQoa2V5KSE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3U0IgPSBuZXcgQnVpbHRpblNoYXJlZEJvZHkobm9kZSwgd3JhcHBlZFdvcmxkKTtcclxuICAgICAgICAgICAgQnVpbHRpblNoYXJlZEJvZHkuc2hhcmVkQm9kaWVzTWFwLnNldChub2RlLl9pZCwgbmV3U0IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3U0I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkIG9yIHJlbW92ZSBmcm9tIHdvcmxkIFxcXHJcbiAgICAgKiBhZGQsIGlmIGVuYWJsZSBcXFxyXG4gICAgICogcmVtb3ZlLCBpZiBkaXNhYmxlICYgc2hhcGVzLmxlbmd0aCA9PSAwICYgd3JhcHBlZEJvZHkgZGlzYWJsZVxyXG4gICAgICovXHJcbiAgICBzZXQgZW5hYmxlZCAodjogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMud29ybGQuYm9kaWVzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGQuYWRkU2hhcmVkQm9keSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY1NjZW5lVG9QaHlzaWNzKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZW1vdmUgPSAodGhpcy5zaGFwZXMubGVuZ3RoID09IDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucmVtb3ZlU2hhcmVkQm9keSh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgcmVmZXJlbmNlICh2OiBib29sZWFuKSB7XHJcbiAgICAgICAgdiA/IHRoaXMucmVmKysgOiB0aGlzLnJlZi0tO1xyXG4gICAgICAgIGlmICh0aGlzLnJlZiA9PSAwKSB7IHRoaXMuZGVzdG9yeSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIGlkIGdlbmVyYXRvciAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgaWRDb3VudGVyOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSByZWY6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcmVhZG9ubHkgbm9kZTogY2MuTm9kZTtcclxuICAgIHJlYWRvbmx5IHdvcmxkOiBCdWlsdEluV29ybGQ7XHJcbiAgICByZWFkb25seSBzaGFwZXM6IEJ1aWx0aW5TaGFwZVtdID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAobm9kZTogY2MuTm9kZSwgd29ybGQ6IEJ1aWx0SW5Xb3JsZCkge1xyXG4gICAgICAgIHRoaXMuX2lkID0gQnVpbHRpblNoYXJlZEJvZHkuaWRDb3VudGVyKys7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJzZWN0cyAoYm9keTogQnVpbHRpblNoYXJlZEJvZHkpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hhcGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlQSA9IHRoaXMuc2hhcGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2R5LnNoYXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhcGVCID0gYm9keS5zaGFwZXNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGludGVyc2VjdC5yZXNvbHZlKHNoYXBlQS53b3JsZFNoYXBlLCBzaGFwZUIud29ybGRTaGFwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnNoYXBlQXJyLnB1c2goc2hhcGVBKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnNoYXBlQXJyLnB1c2goc2hhcGVCKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRTaGFwZSAoc2hhcGU6IEJ1aWx0aW5TaGFwZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLnNoYXBlcy5pbmRleE9mKHNoYXBlKTtcclxuICAgICAgICBpZiAoaSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZXMucHVzaChzaGFwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVNoYXBlIChzaGFwZTogQnVpbHRpblNoYXBlKTogdm9pZCB7XHJcbiAgICAgICAgZmFzdFJlbW92ZSh0aGlzLnNoYXBlcywgc2hhcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN5bmNTY2VuZVRvUGh5c2ljcyAoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGxldCBuZWVkVXBkYXRlVHJhbnNmb3JtID0gd29ybGREaXJ0eShub2RlKTtcclxuICAgICAgICBpZiAoIWZvcmNlICYmICFuZWVkVXBkYXRlVHJhbnNmb3JtKSByZXR1cm47XHJcblxyXG4gICAgICAgIG5vZGUuZ2V0V29ybGRQb3NpdGlvbih2M18wKTtcclxuICAgICAgICBub2RlLmdldFdvcmxkUm90YXRpb24ocXVhdF8wKVxyXG4gICAgICAgIG5vZGUuZ2V0V29ybGRTY2FsZSh2M18xKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hhcGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGVzW2ldLnRyYW5zZm9ybShub2RlLl93b3JsZE1hdHJpeCwgdjNfMCwgcXVhdF8wLCB2M18xKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZXN0b3J5ICgpIHtcclxuICAgICAgICBCdWlsdGluU2hhcmVkQm9keS5zaGFyZWRCb2RpZXNNYXAuZGVsZXRlKHRoaXMubm9kZS5faWQpO1xyXG4gICAgICAgICh0aGlzLm5vZGUgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMud29ybGQgYXMgYW55KSA9IG51bGw7XHJcbiAgICAgICAgKHRoaXMuc2hhcGVzIGFzIGFueSkgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9