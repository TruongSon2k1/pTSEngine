
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/radial-filled.js';
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

var RadialFilledAssembler = require('../2d/radial-filled');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var RadialFilledAssembler3D = /*#__PURE__*/function (_RadialFilledAssemble) {
  _inheritsLoose(RadialFilledAssembler3D, _RadialFilledAssemble);

  function RadialFilledAssembler3D() {
    return _RadialFilledAssemble.apply(this, arguments) || this;
  }

  return RadialFilledAssembler3D;
}(RadialFilledAssembler);

exports["default"] = RadialFilledAssembler3D;
cc.js.mixin(RadialFilledAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var matrix = sprite.node._worldMatrix;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFwzZFxccmFkaWFsLWZpbGxlZC5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIzRCIsInJlcXVpcmUiLCJSYWRpYWxGaWxsZWRBc3NlbWJsZXIiLCJ2ZWMzX3RlbXBfbG9jYWwiLCJWZWMzIiwidmVjM190ZW1wX3dvcmxkIiwiUmFkaWFsRmlsbGVkQXNzZW1ibGVyM0QiLCJjYyIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiLCJ1cGRhdGVXb3JsZFZlcnRzIiwic3ByaXRlIiwibWF0cml4Iiwibm9kZSIsIl93b3JsZE1hdHJpeCIsImxvY2FsIiwiX2xvY2FsIiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImZsb2F0c1BlclZlcnQiLCJvZmZzZXQiLCJsZW5ndGgiLCJzZXQiLCJ0cmFuc2Zvcm1NYXQ0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7OztBQUNBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1DLHFCQUFxQixHQUFHRCxPQUFPLENBQUMscUJBQUQsQ0FBckM7O0FBRUEsSUFBTUUsZUFBZSxHQUFHLElBQUlDLGVBQUosRUFBeEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBSUQsZUFBSixFQUF4Qjs7SUFFcUJFOzs7Ozs7OztFQUFnQ0o7OztBQUlyREssRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUgsdUJBQXVCLENBQUNJLFNBQXBDLEVBQStDVixXQUEvQyxFQUE0RDtBQUN4RFcsRUFBQUEsZ0JBRHdELDRCQUN0Q0MsTUFEc0MsRUFDOUI7QUFDdEIsUUFBSUMsTUFBTSxHQUFHRCxNQUFNLENBQUNFLElBQVAsQ0FBWUMsWUFBekI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUVBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6Qjs7QUFDQSxTQUFLLElBQUlDLE1BQU0sR0FBRyxDQUFsQixFQUFxQkEsTUFBTSxHQUFHSixLQUFLLENBQUNLLE1BQXBDLEVBQTRDRCxNQUFNLElBQUlELGFBQXRELEVBQXFFO0FBQ2pFakIsc0JBQUtvQixHQUFMLENBQVNyQixlQUFULEVBQTBCYSxLQUFLLENBQUNNLE1BQUQsQ0FBL0IsRUFBeUNOLEtBQUssQ0FBQ00sTUFBTSxHQUFDLENBQVIsQ0FBOUMsRUFBMEQsQ0FBMUQ7O0FBQ0FsQixzQkFBS3FCLGFBQUwsQ0FBbUJwQixlQUFuQixFQUFvQ0YsZUFBcEMsRUFBcURVLE1BQXJEOztBQUVBSyxNQUFBQSxLQUFLLENBQUNJLE1BQUQsQ0FBTCxHQUFnQmpCLGVBQWUsQ0FBQ3FCLENBQWhDO0FBQ0FSLE1BQUFBLEtBQUssQ0FBQ0ksTUFBTSxHQUFDLENBQVIsQ0FBTCxHQUFrQmpCLGVBQWUsQ0FBQ3NCLENBQWxDO0FBQ0FULE1BQUFBLEtBQUssQ0FBQ0ksTUFBTSxHQUFDLENBQVIsQ0FBTCxHQUFrQmpCLGVBQWUsQ0FBQ3VCLENBQWxDO0FBQ0g7QUFDSjtBQWZ1RCxDQUE1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XHJcbmNvbnN0IEFzc2VtYmxlcjNEID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXNzZW1ibGVyLTNkJyk7XHJcbmNvbnN0IFJhZGlhbEZpbGxlZEFzc2VtYmxlciA9IHJlcXVpcmUoJy4uLzJkL3JhZGlhbC1maWxsZWQnKTtcclxuXHJcbmNvbnN0IHZlYzNfdGVtcF9sb2NhbCA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IHZlYzNfdGVtcF93b3JsZCA9IG5ldyBWZWMzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYWRpYWxGaWxsZWRBc3NlbWJsZXIzRCBleHRlbmRzIFJhZGlhbEZpbGxlZEFzc2VtYmxlciB7XHJcbiAgICBcclxufVxyXG5cclxuY2MuanMubWl4aW4oUmFkaWFsRmlsbGVkQXNzZW1ibGVyM0QucHJvdG90eXBlLCBBc3NlbWJsZXIzRCwge1xyXG4gICAgdXBkYXRlV29ybGRWZXJ0cyAoc3ByaXRlKSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IHNwcml0ZS5ub2RlLl93b3JsZE1hdHJpeDtcclxuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcclxuICAgICAgICBsZXQgd29ybGQgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcclxuXHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgd29ybGQubGVuZ3RoOyBvZmZzZXQgKz0gZmxvYXRzUGVyVmVydCkge1xyXG4gICAgICAgICAgICBWZWMzLnNldCh2ZWMzX3RlbXBfbG9jYWwsIGxvY2FsW29mZnNldF0sIGxvY2FsW29mZnNldCsxXSwgMCk7XHJcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NCh2ZWMzX3RlbXBfd29ybGQsIHZlYzNfdGVtcF9sb2NhbCwgbWF0cml4KTtcclxuXHJcbiAgICAgICAgICAgIHdvcmxkW29mZnNldF0gPSB2ZWMzX3RlbXBfd29ybGQueDtcclxuICAgICAgICAgICAgd29ybGRbb2Zmc2V0KzFdID0gdmVjM190ZW1wX3dvcmxkLnk7XHJcbiAgICAgICAgICAgIHdvcmxkW29mZnNldCsyXSA9IHZlYzNfdGVtcF93b3JsZC56O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9