
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/sliced.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vec = _interopRequireDefault(require("../../../../../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Assembler3D = require('../../../../assembler-3d');

var SlicedAssembler = require('../2d/sliced');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var SlicedAssembler3D = /*#__PURE__*/function (_SlicedAssembler) {
  _inheritsLoose(SlicedAssembler3D, _SlicedAssembler);

  function SlicedAssembler3D() {
    return _SlicedAssembler.apply(this, arguments) || this;
  }

  return SlicedAssembler3D;
}(SlicedAssembler);

exports["default"] = SlicedAssembler3D;
cc.js.mixin(SlicedAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var matrix = sprite.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var row = 0; row < 4; ++row) {
      var localRowY = local[row * 2 + 1];

      for (var col = 0; col < 4; ++col) {
        var localColX = local[col * 2];

        _vec["default"].set(vec3_temp_local, localColX, localRowY, 0);

        _vec["default"].transformMat4(vec3_temp_world, vec3_temp_local, matrix);

        var worldIndex = (row * 4 + col) * floatsPerVert;
        world[worldIndex] = vec3_temp_world.x;
        world[worldIndex + 1] = vec3_temp_world.y;
        world[worldIndex + 2] = vec3_temp_world.z;
      }
    }
  }
});
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFwzZFxcc2xpY2VkLmpzIl0sIm5hbWVzIjpbIkFzc2VtYmxlcjNEIiwicmVxdWlyZSIsIlNsaWNlZEFzc2VtYmxlciIsInZlYzNfdGVtcF9sb2NhbCIsIlZlYzMiLCJ2ZWMzX3RlbXBfd29ybGQiLCJTbGljZWRBc3NlbWJsZXIzRCIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsInVwZGF0ZVdvcmxkVmVydHMiLCJzcHJpdGUiLCJtYXRyaXgiLCJub2RlIiwiX3dvcmxkTWF0cml4IiwibG9jYWwiLCJfbG9jYWwiLCJ3b3JsZCIsIl9yZW5kZXJEYXRhIiwidkRhdGFzIiwiZmxvYXRzUGVyVmVydCIsInJvdyIsImxvY2FsUm93WSIsImNvbCIsImxvY2FsQ29sWCIsInNldCIsInRyYW5zZm9ybU1hdDQiLCJ3b3JsZEluZGV4IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1DLGVBQWUsR0FBR0QsT0FBTyxDQUFDLGNBQUQsQ0FBL0I7O0FBRUEsSUFBTUUsZUFBZSxHQUFHLElBQUlDLGVBQUosRUFBeEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBSUQsZUFBSixFQUF4Qjs7SUFFcUJFOzs7Ozs7OztFQUEwQko7OztBQUkvQ0ssRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUgsaUJBQWlCLENBQUNJLFNBQTlCLEVBQXlDVixXQUF6QyxFQUFzRDtBQUNsRFcsRUFBQUEsZ0JBRGtELDRCQUNoQ0MsTUFEZ0MsRUFDeEI7QUFDdEIsUUFBSUMsTUFBTSxHQUFHRCxNQUFNLENBQUNFLElBQVAsQ0FBWUMsWUFBekI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUVBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6Qjs7QUFDQSxTQUFLLElBQUlDLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsQ0FBeEIsRUFBMkIsRUFBRUEsR0FBN0IsRUFBa0M7QUFDOUIsVUFBSUMsU0FBUyxHQUFHUCxLQUFLLENBQUNNLEdBQUcsR0FBRyxDQUFOLEdBQVUsQ0FBWCxDQUFyQjs7QUFDQSxXQUFLLElBQUlFLEdBQUcsR0FBRyxDQUFmLEVBQWtCQSxHQUFHLEdBQUcsQ0FBeEIsRUFBMkIsRUFBRUEsR0FBN0IsRUFBa0M7QUFDOUIsWUFBSUMsU0FBUyxHQUFHVCxLQUFLLENBQUNRLEdBQUcsR0FBRyxDQUFQLENBQXJCOztBQUVBcEIsd0JBQUtzQixHQUFMLENBQVN2QixlQUFULEVBQTBCc0IsU0FBMUIsRUFBcUNGLFNBQXJDLEVBQWdELENBQWhEOztBQUNBbkIsd0JBQUt1QixhQUFMLENBQW1CdEIsZUFBbkIsRUFBb0NGLGVBQXBDLEVBQXFEVSxNQUFyRDs7QUFFQSxZQUFJZSxVQUFVLEdBQUcsQ0FBQ04sR0FBRyxHQUFHLENBQU4sR0FBVUUsR0FBWCxJQUFrQkgsYUFBbkM7QUFDQUgsUUFBQUEsS0FBSyxDQUFDVSxVQUFELENBQUwsR0FBb0J2QixlQUFlLENBQUN3QixDQUFwQztBQUNBWCxRQUFBQSxLQUFLLENBQUNVLFVBQVUsR0FBQyxDQUFaLENBQUwsR0FBc0J2QixlQUFlLENBQUN5QixDQUF0QztBQUNBWixRQUFBQSxLQUFLLENBQUNVLFVBQVUsR0FBQyxDQUFaLENBQUwsR0FBc0J2QixlQUFlLENBQUMwQixDQUF0QztBQUNIO0FBQ0o7QUFDSjtBQXJCaUQsQ0FBdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5cclxuY29uc3QgQXNzZW1ibGVyM0QgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hc3NlbWJsZXItM2QnKTtcclxuY29uc3QgU2xpY2VkQXNzZW1ibGVyID0gcmVxdWlyZSgnLi4vMmQvc2xpY2VkJyk7XHJcblxyXG5jb25zdCB2ZWMzX3RlbXBfbG9jYWwgPSBuZXcgVmVjMygpO1xyXG5jb25zdCB2ZWMzX3RlbXBfd29ybGQgPSBuZXcgVmVjMygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpY2VkQXNzZW1ibGVyM0QgZXh0ZW5kcyBTbGljZWRBc3NlbWJsZXIge1xyXG4gICAgXHJcbn1cclxuXHJcbmNjLmpzLm1peGluKFNsaWNlZEFzc2VtYmxlcjNELnByb3RvdHlwZSwgQXNzZW1ibGVyM0QsIHtcclxuICAgIHVwZGF0ZVdvcmxkVmVydHMgKHNwcml0ZSkge1xyXG4gICAgICAgIGxldCBtYXRyaXggPSBzcHJpdGUubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcblxyXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDQ7ICsrcm93KSB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbFJvd1kgPSBsb2NhbFtyb3cgKiAyICsgMV07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDQ7ICsrY29sKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxDb2xYID0gbG9jYWxbY29sICogMl07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcF9sb2NhbCwgbG9jYWxDb2xYLCBsb2NhbFJvd1ksIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KHZlYzNfdGVtcF93b3JsZCwgdmVjM190ZW1wX2xvY2FsLCBtYXRyaXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB3b3JsZEluZGV4ID0gKHJvdyAqIDQgKyBjb2wpICogZmxvYXRzUGVyVmVydDtcclxuICAgICAgICAgICAgICAgIHdvcmxkW3dvcmxkSW5kZXhdID0gdmVjM190ZW1wX3dvcmxkLng7XHJcbiAgICAgICAgICAgICAgICB3b3JsZFt3b3JsZEluZGV4KzFdID0gdmVjM190ZW1wX3dvcmxkLnk7XHJcbiAgICAgICAgICAgICAgICB3b3JsZFt3b3JsZEluZGV4KzJdID0gdmVjM190ZW1wX3dvcmxkLno7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==