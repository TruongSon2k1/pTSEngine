
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/tiled.js';
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

var TiledAssembler = require('../2d/tiled');

var vec3_temps = [];

for (var i = 0; i < 4; i++) {
  vec3_temps.push(new _vec["default"]());
}

var TiledAssembler3D = /*#__PURE__*/function (_TiledAssembler) {
  _inheritsLoose(TiledAssembler3D, _TiledAssembler);

  function TiledAssembler3D() {
    return _TiledAssembler.apply(this, arguments) || this;
  }

  return TiledAssembler3D;
}(TiledAssembler);

exports["default"] = TiledAssembler3D;
cc.js.mixin(TiledAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var local = this._local;
    var localX = local.x,
        localY = local.y;
    var world = this._renderData.vDatas[0];
    var row = this.row,
        col = this.col;
    var matrix = sprite.node._worldMatrix;
    var x, x1, y, y1;
    var vertexOffset = 0;

    for (var yindex = 0, ylength = row; yindex < ylength; ++yindex) {
      y = localY[yindex];
      y1 = localY[yindex + 1];

      for (var xindex = 0, xlength = col; xindex < xlength; ++xindex) {
        x = localX[xindex];
        x1 = localX[xindex + 1];

        _vec["default"].set(vec3_temps[0], x, y, 0);

        _vec["default"].set(vec3_temps[1], x1, y, 0);

        _vec["default"].set(vec3_temps[2], x, y1, 0);

        _vec["default"].set(vec3_temps[3], x1, y1, 0);

        for (var _i = 0; _i < 4; _i++) {
          var vec3_temp = vec3_temps[_i];

          _vec["default"].transformMat4(vec3_temp, vec3_temp, matrix);

          var offset = _i * 6;
          world[vertexOffset + offset] = vec3_temp.x;
          world[vertexOffset + offset + 1] = vec3_temp.y;
          world[vertexOffset + offset + 2] = vec3_temp.z;
        }

        vertexOffset += 24;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFwzZFxcdGlsZWQuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyM0QiLCJyZXF1aXJlIiwiVGlsZWRBc3NlbWJsZXIiLCJ2ZWMzX3RlbXBzIiwiaSIsInB1c2giLCJWZWMzIiwiVGlsZWRBc3NlbWJsZXIzRCIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsInVwZGF0ZVdvcmxkVmVydHMiLCJzcHJpdGUiLCJsb2NhbCIsIl9sb2NhbCIsImxvY2FsWCIsIngiLCJsb2NhbFkiLCJ5Iiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsInJvdyIsImNvbCIsIm1hdHJpeCIsIm5vZGUiLCJfd29ybGRNYXRyaXgiLCJ4MSIsInkxIiwidmVydGV4T2Zmc2V0IiwieWluZGV4IiwieWxlbmd0aCIsInhpbmRleCIsInhsZW5ndGgiLCJzZXQiLCJ2ZWMzX3RlbXAiLCJ0cmFuc2Zvcm1NYXQ0Iiwib2Zmc2V0IiwieiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQywwQkFBRCxDQUEzQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQTlCOztBQUVBLElBQUlFLFVBQVUsR0FBRyxFQUFqQjs7QUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEJELEVBQUFBLFVBQVUsQ0FBQ0UsSUFBWCxDQUFnQixJQUFJQyxlQUFKLEVBQWhCO0FBQ0g7O0lBRW9CQzs7Ozs7Ozs7RUFBeUJMOzs7QUFJOUNNLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNQyxLQUFOLENBQVlILGdCQUFnQixDQUFDSSxTQUE3QixFQUF3Q1gsV0FBeEMsRUFBcUQ7QUFDakRZLEVBQUFBLGdCQURpRCw0QkFDL0JDLE1BRCtCLEVBQ3ZCO0FBQ3RCLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxNQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBR0YsS0FBSyxDQUFDRyxDQUFuQjtBQUFBLFFBQXNCQyxNQUFNLEdBQUdKLEtBQUssQ0FBQ0ssQ0FBckM7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUhzQixRQUloQkMsR0FKZ0IsR0FJSCxJQUpHLENBSWhCQSxHQUpnQjtBQUFBLFFBSVhDLEdBSlcsR0FJSCxJQUpHLENBSVhBLEdBSlc7QUFLdEIsUUFBSUMsTUFBTSxHQUFHWixNQUFNLENBQUNhLElBQVAsQ0FBWUMsWUFBekI7QUFDQSxRQUFJVixDQUFKLEVBQU9XLEVBQVAsRUFBV1QsQ0FBWCxFQUFjVSxFQUFkO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLENBQW5COztBQUNBLFNBQUssSUFBSUMsTUFBTSxHQUFHLENBQWIsRUFBZ0JDLE9BQU8sR0FBR1QsR0FBL0IsRUFBb0NRLE1BQU0sR0FBR0MsT0FBN0MsRUFBc0QsRUFBRUQsTUFBeEQsRUFBZ0U7QUFDNURaLE1BQUFBLENBQUMsR0FBR0QsTUFBTSxDQUFDYSxNQUFELENBQVY7QUFDQUYsTUFBQUEsRUFBRSxHQUFHWCxNQUFNLENBQUNhLE1BQU0sR0FBRyxDQUFWLENBQVg7O0FBQ0EsV0FBSyxJQUFJRSxNQUFNLEdBQUcsQ0FBYixFQUFnQkMsT0FBTyxHQUFHVixHQUEvQixFQUFvQ1MsTUFBTSxHQUFHQyxPQUE3QyxFQUFzRCxFQUFFRCxNQUF4RCxFQUFnRTtBQUM1RGhCLFFBQUFBLENBQUMsR0FBR0QsTUFBTSxDQUFDaUIsTUFBRCxDQUFWO0FBQ0FMLFFBQUFBLEVBQUUsR0FBR1osTUFBTSxDQUFDaUIsTUFBTSxHQUFHLENBQVYsQ0FBWDs7QUFFQTNCLHdCQUFLNkIsR0FBTCxDQUFTaEMsVUFBVSxDQUFDLENBQUQsQ0FBbkIsRUFBd0JjLENBQXhCLEVBQTJCRSxDQUEzQixFQUE4QixDQUE5Qjs7QUFDQWIsd0JBQUs2QixHQUFMLENBQVNoQyxVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3QnlCLEVBQXhCLEVBQTRCVCxDQUE1QixFQUErQixDQUEvQjs7QUFDQWIsd0JBQUs2QixHQUFMLENBQVNoQyxVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3QmMsQ0FBeEIsRUFBMkJZLEVBQTNCLEVBQStCLENBQS9COztBQUNBdkIsd0JBQUs2QixHQUFMLENBQVNoQyxVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3QnlCLEVBQXhCLEVBQTRCQyxFQUE1QixFQUFnQyxDQUFoQzs7QUFFQSxhQUFLLElBQUl6QixFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLENBQXBCLEVBQXVCQSxFQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLGNBQUlnQyxTQUFTLEdBQUdqQyxVQUFVLENBQUNDLEVBQUQsQ0FBMUI7O0FBQ0FFLDBCQUFLK0IsYUFBTCxDQUFtQkQsU0FBbkIsRUFBOEJBLFNBQTlCLEVBQXlDWCxNQUF6Qzs7QUFDQSxjQUFJYSxNQUFNLEdBQUdsQyxFQUFDLEdBQUcsQ0FBakI7QUFDQWdCLFVBQUFBLEtBQUssQ0FBQ1UsWUFBWSxHQUFHUSxNQUFoQixDQUFMLEdBQStCRixTQUFTLENBQUNuQixDQUF6QztBQUNBRyxVQUFBQSxLQUFLLENBQUNVLFlBQVksR0FBR1EsTUFBZixHQUF3QixDQUF6QixDQUFMLEdBQW1DRixTQUFTLENBQUNqQixDQUE3QztBQUNBQyxVQUFBQSxLQUFLLENBQUNVLFlBQVksR0FBR1EsTUFBZixHQUF3QixDQUF6QixDQUFMLEdBQW1DRixTQUFTLENBQUNHLENBQTdDO0FBQ0g7O0FBRURULFFBQUFBLFlBQVksSUFBSSxFQUFoQjtBQUNIO0FBQ0o7QUFDSjtBQWpDZ0QsQ0FBckQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5cclxuY29uc3QgQXNzZW1ibGVyM0QgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hc3NlbWJsZXItM2QnKTtcclxuY29uc3QgVGlsZWRBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8yZC90aWxlZCcpO1xyXG5cclxubGV0IHZlYzNfdGVtcHMgPSBbXTtcclxuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgIHZlYzNfdGVtcHMucHVzaChuZXcgVmVjMyk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbGVkQXNzZW1ibGVyM0QgZXh0ZW5kcyBUaWxlZEFzc2VtYmxlciB7XHJcbiAgICBcclxufVxyXG5cclxuY2MuanMubWl4aW4oVGlsZWRBc3NlbWJsZXIzRC5wcm90b3R5cGUsIEFzc2VtYmxlcjNELCB7XHJcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChzcHJpdGUpIHtcclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsZXQgbG9jYWxYID0gbG9jYWwueCwgbG9jYWxZID0gbG9jYWwueTtcclxuICAgICAgICBsZXQgd29ybGQgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuICAgICAgICBsZXQgeyByb3csIGNvbCB9ID0gdGhpcztcclxuICAgICAgICBsZXQgbWF0cml4ID0gc3ByaXRlLm5vZGUuX3dvcmxkTWF0cml4O1xyXG4gICAgICAgIGxldCB4LCB4MSwgeSwgeTE7XHJcbiAgICAgICAgbGV0IHZlcnRleE9mZnNldCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgeWluZGV4ID0gMCwgeWxlbmd0aCA9IHJvdzsgeWluZGV4IDwgeWxlbmd0aDsgKyt5aW5kZXgpIHtcclxuICAgICAgICAgICAgeSA9IGxvY2FsWVt5aW5kZXhdO1xyXG4gICAgICAgICAgICB5MSA9IGxvY2FsWVt5aW5kZXggKyAxXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgeGluZGV4ID0gMCwgeGxlbmd0aCA9IGNvbDsgeGluZGV4IDwgeGxlbmd0aDsgKyt4aW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHggPSBsb2NhbFhbeGluZGV4XTtcclxuICAgICAgICAgICAgICAgIHgxID0gbG9jYWxYW3hpbmRleCArIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcHNbMF0sIHgsIHksIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1sxXSwgeDEsIHksIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1syXSwgeCwgeTEsIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1szXSwgeDEsIHkxLCAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZWMzX3RlbXAgPSB2ZWMzX3RlbXBzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NCh2ZWMzX3RlbXAsIHZlYzNfdGVtcCwgbWF0cml4KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gaSAqIDY7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0ICsgb2Zmc2V0XSA9IHZlYzNfdGVtcC54O1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkW3ZlcnRleE9mZnNldCArIG9mZnNldCArIDFdID0gdmVjM190ZW1wLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0ICsgb2Zmc2V0ICsgMl0gPSB2ZWMzX3RlbXAuejtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhPZmZzZXQgKz0gMjQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==