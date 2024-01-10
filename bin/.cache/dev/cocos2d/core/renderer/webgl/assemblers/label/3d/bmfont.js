
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/3d/bmfont.js';
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

var WebglBmfontAssembler = require('../2d/bmfont');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var WebglBmfontAssembler3D = /*#__PURE__*/function (_WebglBmfontAssembler) {
  _inheritsLoose(WebglBmfontAssembler3D, _WebglBmfontAssembler);

  function WebglBmfontAssembler3D() {
    return _WebglBmfontAssembler.apply(this, arguments) || this;
  }

  return WebglBmfontAssembler3D;
}(WebglBmfontAssembler);

exports["default"] = WebglBmfontAssembler3D;
cc.js.mixin(WebglBmfontAssembler3D.prototype, Assembler3D, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcbGFiZWxcXDNkXFxibWZvbnQuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyM0QiLCJyZXF1aXJlIiwiV2ViZ2xCbWZvbnRBc3NlbWJsZXIiLCJ2ZWMzX3RlbXBfbG9jYWwiLCJWZWMzIiwidmVjM190ZW1wX3dvcmxkIiwiV2ViZ2xCbWZvbnRBc3NlbWJsZXIzRCIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsInVwZGF0ZVdvcmxkVmVydHMiLCJjb21wIiwibWF0cml4Iiwibm9kZSIsIl93b3JsZE1hdHJpeCIsImxvY2FsIiwiX2xvY2FsIiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImZsb2F0c1BlclZlcnQiLCJvZmZzZXQiLCJsZW5ndGgiLCJzZXQiLCJ0cmFuc2Zvcm1NYXQ0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7OztBQUNBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1DLG9CQUFvQixHQUFHRCxPQUFPLENBQUMsY0FBRCxDQUFwQzs7QUFFQSxJQUFNRSxlQUFlLEdBQUcsSUFBSUMsZUFBSixFQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxJQUFJRCxlQUFKLEVBQXhCOztJQUVxQkU7Ozs7Ozs7O0VBQStCSjs7O0FBSXBESyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsS0FBTixDQUFZSCxzQkFBc0IsQ0FBQ0ksU0FBbkMsRUFBOENWLFdBQTlDLEVBQTJEO0FBQ3ZEVyxFQUFBQSxnQkFEdUQsNEJBQ3JDQyxJQURxQyxFQUMvQjtBQUNwQixRQUFJQyxNQUFNLEdBQUdELElBQUksQ0FBQ0UsSUFBTCxDQUFVQyxZQUF2QjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxNQUFqQjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaO0FBRUEsUUFBSUMsYUFBYSxHQUFHLEtBQUtBLGFBQXpCOztBQUNBLFNBQUssSUFBSUMsTUFBTSxHQUFHLENBQWxCLEVBQXFCQSxNQUFNLEdBQUdKLEtBQUssQ0FBQ0ssTUFBcEMsRUFBNENELE1BQU0sSUFBSUQsYUFBdEQsRUFBcUU7QUFDakVqQixzQkFBS29CLEdBQUwsQ0FBU3JCLGVBQVQsRUFBMEJhLEtBQUssQ0FBQ00sTUFBRCxDQUEvQixFQUF5Q04sS0FBSyxDQUFDTSxNQUFNLEdBQUMsQ0FBUixDQUE5QyxFQUEwRCxDQUExRDs7QUFDQWxCLHNCQUFLcUIsYUFBTCxDQUFtQnBCLGVBQW5CLEVBQW9DRixlQUFwQyxFQUFxRFUsTUFBckQ7O0FBRUFLLE1BQUFBLEtBQUssQ0FBQ0ksTUFBRCxDQUFMLEdBQWdCakIsZUFBZSxDQUFDcUIsQ0FBaEM7QUFDQVIsTUFBQUEsS0FBSyxDQUFDSSxNQUFNLEdBQUMsQ0FBUixDQUFMLEdBQWtCakIsZUFBZSxDQUFDc0IsQ0FBbEM7QUFDQVQsTUFBQUEsS0FBSyxDQUFDSSxNQUFNLEdBQUMsQ0FBUixDQUFMLEdBQWtCakIsZUFBZSxDQUFDdUIsQ0FBbEM7QUFDSDtBQUNKO0FBZnNELENBQTNEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgVmVjMyBmcm9tICcuLi8uLi8uLi8uLi8uLi92YWx1ZS10eXBlcy92ZWMzJztcclxuY29uc3QgQXNzZW1ibGVyM0QgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hc3NlbWJsZXItM2QnKTtcclxuY29uc3QgV2ViZ2xCbWZvbnRBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8yZC9ibWZvbnQnKTtcclxuXHJcbmNvbnN0IHZlYzNfdGVtcF9sb2NhbCA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IHZlYzNfdGVtcF93b3JsZCA9IG5ldyBWZWMzKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJnbEJtZm9udEFzc2VtYmxlcjNEIGV4dGVuZHMgV2ViZ2xCbWZvbnRBc3NlbWJsZXIge1xyXG5cclxufVxyXG5cclxuY2MuanMubWl4aW4oV2ViZ2xCbWZvbnRBc3NlbWJsZXIzRC5wcm90b3R5cGUsIEFzc2VtYmxlcjNELCB7XHJcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChjb21wKSB7XHJcbiAgICAgICAgbGV0IG1hdHJpeCA9IGNvbXAubm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XHJcbiAgICAgICAgbGV0IHdvcmxkID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XHJcblxyXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xyXG4gICAgICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IHdvcmxkLmxlbmd0aDsgb2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQpIHtcclxuICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wX2xvY2FsLCBsb2NhbFtvZmZzZXRdLCBsb2NhbFtvZmZzZXQrMV0sIDApO1xyXG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQodmVjM190ZW1wX3dvcmxkLCB2ZWMzX3RlbXBfbG9jYWwsIG1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICB3b3JsZFtvZmZzZXRdID0gdmVjM190ZW1wX3dvcmxkLng7XHJcbiAgICAgICAgICAgIHdvcmxkW29mZnNldCsxXSA9IHZlYzNfdGVtcF93b3JsZC55O1xyXG4gICAgICAgICAgICB3b3JsZFtvZmZzZXQrMl0gPSB2ZWMzX3RlbXBfd29ybGQuejtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==