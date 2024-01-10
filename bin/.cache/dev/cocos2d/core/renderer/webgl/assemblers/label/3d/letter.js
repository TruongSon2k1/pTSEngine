
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/3d/letter.js';
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

var WebglLetterFontAssembler = require('../2d/letter');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var WebglLetterFontAssembler3D = /*#__PURE__*/function (_WebglLetterFontAssem) {
  _inheritsLoose(WebglLetterFontAssembler3D, _WebglLetterFontAssem);

  function WebglLetterFontAssembler3D() {
    return _WebglLetterFontAssem.apply(this, arguments) || this;
  }

  return WebglLetterFontAssembler3D;
}(WebglLetterFontAssembler);

exports["default"] = WebglLetterFontAssembler3D;
cc.js.mixin(WebglLetterFontAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var offset = 0; offset < world.length; offset += floatsPerVert) {
      _vec["default"].set(vec3_temp_local, local[offset], local[offset + 1], 0);

      _vec["default"].transformMat4(vec3_temp_world, vec3_temp_local, matrix);

      world[offset] = vec3_temp_world.x;
      world[offset + 1] = vec3_temp_world.y;
      world[offset + 2] = vec3_temp_world.z;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXDNkXFxsZXR0ZXIuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyM0QiLCJyZXF1aXJlIiwiV2ViZ2xMZXR0ZXJGb250QXNzZW1ibGVyIiwidmVjM190ZW1wX2xvY2FsIiwiVmVjMyIsInZlYzNfdGVtcF93b3JsZCIsIldlYmdsTGV0dGVyRm9udEFzc2VtYmxlcjNEIiwiY2MiLCJqcyIsIm1peGluIiwicHJvdG90eXBlIiwidXBkYXRlV29ybGRWZXJ0cyIsImNvbXAiLCJtYXRyaXgiLCJub2RlIiwiX3dvcmxkTWF0cml4IiwibG9jYWwiLCJfbG9jYWwiLCJ3b3JsZCIsIl9yZW5kZXJEYXRhIiwidkRhdGFzIiwiZmxvYXRzUGVyVmVydCIsIm9mZnNldCIsImxlbmd0aCIsInNldCIsInRyYW5zZm9ybU1hdDQiLCJ4IiwieSIsInoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7O0FBQ0EsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsd0JBQXdCLEdBQUdELE9BQU8sQ0FBQyxjQUFELENBQXhDOztBQUVBLElBQU1FLGVBQWUsR0FBRyxJQUFJQyxlQUFKLEVBQXhCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLElBQUlELGVBQUosRUFBeEI7O0lBRXFCRTs7Ozs7Ozs7RUFBbUNKOzs7QUFJeERLLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNQyxLQUFOLENBQVlILDBCQUEwQixDQUFDSSxTQUF2QyxFQUFrRFYsV0FBbEQsRUFBK0Q7QUFDM0RXLEVBQUFBLGdCQUQyRCw0QkFDekNDLElBRHlDLEVBQ25DO0FBQ3BCLFFBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxJQUFMLENBQVVDLFlBQXZCO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLE1BQWpCO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLENBQVo7QUFFQSxRQUFJQyxhQUFhLEdBQUcsS0FBS0EsYUFBekI7O0FBQ0EsU0FBSyxJQUFJQyxNQUFNLEdBQUcsQ0FBbEIsRUFBcUJBLE1BQU0sR0FBR0osS0FBSyxDQUFDSyxNQUFwQyxFQUE0Q0QsTUFBTSxJQUFJRCxhQUF0RCxFQUFxRTtBQUNqRWpCLHNCQUFLb0IsR0FBTCxDQUFTckIsZUFBVCxFQUEwQmEsS0FBSyxDQUFDTSxNQUFELENBQS9CLEVBQXlDTixLQUFLLENBQUNNLE1BQU0sR0FBQyxDQUFSLENBQTlDLEVBQTBELENBQTFEOztBQUNBbEIsc0JBQUtxQixhQUFMLENBQW1CcEIsZUFBbkIsRUFBb0NGLGVBQXBDLEVBQXFEVSxNQUFyRDs7QUFFQUssTUFBQUEsS0FBSyxDQUFDSSxNQUFELENBQUwsR0FBZ0JqQixlQUFlLENBQUNxQixDQUFoQztBQUNBUixNQUFBQSxLQUFLLENBQUNJLE1BQU0sR0FBQyxDQUFSLENBQUwsR0FBa0JqQixlQUFlLENBQUNzQixDQUFsQztBQUNBVCxNQUFBQSxLQUFLLENBQUNJLE1BQU0sR0FBQyxDQUFSLENBQUwsR0FBa0JqQixlQUFlLENBQUN1QixDQUFsQztBQUNIO0FBQ0o7QUFmMEQsQ0FBL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5jb25zdCBBc3NlbWJsZXIzRCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2Fzc2VtYmxlci0zZCcpO1xyXG5jb25zdCBXZWJnbExldHRlckZvbnRBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8yZC9sZXR0ZXInKTtcclxuXHJcbmNvbnN0IHZlYzNfdGVtcF9sb2NhbCA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IHZlYzNfdGVtcF93b3JsZCA9IG5ldyBWZWMzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJnbExldHRlckZvbnRBc3NlbWJsZXIzRCBleHRlbmRzIFdlYmdsTGV0dGVyRm9udEFzc2VtYmxlciB7XHJcblxyXG59XHJcblxyXG5jYy5qcy5taXhpbihXZWJnbExldHRlckZvbnRBc3NlbWJsZXIzRC5wcm90b3R5cGUsIEFzc2VtYmxlcjNELCB7XHJcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChjb21wKSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IGNvbXAubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcblxyXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IHdvcmxkLmxlbmd0aDsgb2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQpIHtcclxuICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wX2xvY2FsLCBsb2NhbFtvZmZzZXRdLCBsb2NhbFtvZmZzZXQrMV0sIDApO1xyXG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQodmVjM190ZW1wX3dvcmxkLCB2ZWMzX3RlbXBfbG9jYWwsIG1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZFtvZmZzZXRdID0gdmVjM190ZW1wX3dvcmxkLng7XHJcbiAgICAgICAgICAgIHdvcmxkW29mZnNldCsxXSA9IHZlYzNfdGVtcF93b3JsZC55O1xyXG4gICAgICAgICAgICB3b3JsZFtvZmZzZXQrMl0gPSB2ZWMzX3RlbXBfd29ybGQuejtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=