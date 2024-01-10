
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/mesh.js';
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

var MeshAssembler = require('../2d/mesh');

var vec3_temp = new _vec["default"]();

var MeshAssembler3D = /*#__PURE__*/function (_MeshAssembler) {
  _inheritsLoose(MeshAssembler3D, _MeshAssembler);

  function MeshAssembler3D() {
    return _MeshAssembler.apply(this, arguments) || this;
  }

  return MeshAssembler3D;
}(MeshAssembler);

exports["default"] = MeshAssembler3D;
cc.js.mixin(MeshAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var i = 0, l = local.length / 2; i < l; i++) {
      _vec["default"].set(vec3_temp, local[i * 2], local[i * 2 + 1], 0);

      _vec["default"].transformMat4(vec3_temp, vec3_temp, matrix);

      var dstOffset = floatsPerVert * i;
      world[dstOffset] = vec3_temp.x;
      world[dstOffset + 1] = vec3_temp.y;
      world[dstOffset + 2] = vec3_temp.z;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFwzZFxcbWVzaC5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIzRCIsInJlcXVpcmUiLCJNZXNoQXNzZW1ibGVyIiwidmVjM190ZW1wIiwiVmVjMyIsIk1lc2hBc3NlbWJsZXIzRCIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsInVwZGF0ZVdvcmxkVmVydHMiLCJjb21wIiwibWF0cml4Iiwibm9kZSIsIl93b3JsZE1hdHJpeCIsImxvY2FsIiwiX2xvY2FsIiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImZsb2F0c1BlclZlcnQiLCJpIiwibCIsImxlbmd0aCIsInNldCIsInRyYW5zZm9ybU1hdDQiLCJkc3RPZmZzZXQiLCJ4IiwieSIsInoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7O0FBQ0EsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHRCxPQUFPLENBQUMsWUFBRCxDQUE3Qjs7QUFFQSxJQUFJRSxTQUFTLEdBQUcsSUFBSUMsZUFBSixFQUFoQjs7SUFFcUJDOzs7Ozs7OztFQUF3Qkg7OztBQUk3Q0ksRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUgsZUFBZSxDQUFDSSxTQUE1QixFQUF1Q1QsV0FBdkMsRUFBb0Q7QUFDaERVLEVBQUFBLGdCQURnRCw0QkFDOUJDLElBRDhCLEVBQ3hCO0FBQ3BCLFFBQUlDLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxJQUFMLENBQVVDLFlBQXZCO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLE1BQWpCO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLENBQVo7QUFFQSxRQUFJQyxhQUFhLEdBQUcsS0FBS0EsYUFBekI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxDQUFDLEdBQUdQLEtBQUssQ0FBQ1EsTUFBTixHQUFhLENBQWpDLEVBQW9DRixDQUFDLEdBQUdDLENBQXhDLEVBQTJDRCxDQUFDLEVBQTVDLEVBQWdEO0FBQzVDakIsc0JBQUtvQixHQUFMLENBQVNyQixTQUFULEVBQW9CWSxLQUFLLENBQUNNLENBQUMsR0FBQyxDQUFILENBQXpCLEVBQWdDTixLQUFLLENBQUNNLENBQUMsR0FBQyxDQUFGLEdBQUksQ0FBTCxDQUFyQyxFQUE4QyxDQUE5Qzs7QUFDQWpCLHNCQUFLcUIsYUFBTCxDQUFtQnRCLFNBQW5CLEVBQThCQSxTQUE5QixFQUF5Q1MsTUFBekM7O0FBRUEsVUFBSWMsU0FBUyxHQUFHTixhQUFhLEdBQUdDLENBQWhDO0FBQ0FKLE1BQUFBLEtBQUssQ0FBQ1MsU0FBRCxDQUFMLEdBQW1CdkIsU0FBUyxDQUFDd0IsQ0FBN0I7QUFDQVYsTUFBQUEsS0FBSyxDQUFDUyxTQUFTLEdBQUMsQ0FBWCxDQUFMLEdBQXFCdkIsU0FBUyxDQUFDeUIsQ0FBL0I7QUFDQVgsTUFBQUEsS0FBSyxDQUFDUyxTQUFTLEdBQUMsQ0FBWCxDQUFMLEdBQXFCdkIsU0FBUyxDQUFDMEIsQ0FBL0I7QUFDSDtBQUNKO0FBaEIrQyxDQUFwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XHJcbmNvbnN0IEFzc2VtYmxlcjNEID0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vYXNzZW1ibGVyLTNkJyk7XHJcbmNvbnN0IE1lc2hBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8yZC9tZXNoJyk7XHJcblxyXG5sZXQgdmVjM190ZW1wID0gbmV3IFZlYzMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc2hBc3NlbWJsZXIzRCBleHRlbmRzIE1lc2hBc3NlbWJsZXIge1xyXG4gICAgXHJcbn1cclxuXHJcbmNjLmpzLm1peGluKE1lc2hBc3NlbWJsZXIzRC5wcm90b3R5cGUsIEFzc2VtYmxlcjNELCB7XHJcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChjb21wKSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IGNvbXAubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcbiAgICAgXHJcbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsb2NhbC5sZW5ndGgvMjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBWZWMzLnNldCh2ZWMzX3RlbXAsIGxvY2FsW2kqMl0sIGxvY2FsW2kqMisxXSwgMCk7XHJcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NCh2ZWMzX3RlbXAsIHZlYzNfdGVtcCwgbWF0cml4KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkc3RPZmZzZXQgPSBmbG9hdHNQZXJWZXJ0ICogaTtcclxuICAgICAgICAgICAgd29ybGRbZHN0T2Zmc2V0XSA9IHZlYzNfdGVtcC54O1xyXG4gICAgICAgICAgICB3b3JsZFtkc3RPZmZzZXQrMV0gPSB2ZWMzX3RlbXAueTtcclxuICAgICAgICAgICAgd29ybGRbZHN0T2Zmc2V0KzJdID0gdmVjM190ZW1wLno7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=