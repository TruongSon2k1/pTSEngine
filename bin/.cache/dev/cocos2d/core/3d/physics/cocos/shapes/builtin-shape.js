
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinShape = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var Vec3 = cc.Vec3;

var BuiltinShape = /*#__PURE__*/function () {
  function BuiltinShape() {
    this.id = BuiltinShape.idCounter++;
    this._sharedBody = void 0;
    this._collider = void 0;
    this._localShape = void 0;
    this._worldShape = void 0;
  }

  var _proto = BuiltinShape.prototype;

  _proto.__preload = function __preload(comp) {
    this._collider = comp;
    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  };

  _proto.onLoad = function onLoad() {
    this.center = this._collider.center;
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._collider = null;
    this._localShape = null;
    this._worldShape = null;
  };

  _proto.transform = function transform(m, pos, rot, scale) {
    this._localShape.transform(m, pos, rot, scale, this._worldShape);
  };

  _createClass(BuiltinShape, [{
    key: "material",
    set: function set(v) {}
  }, {
    key: "isTrigger",
    set: function set(v) {}
  }, {
    key: "attachedRigidBody",
    get: function get() {
      return null;
    }
  }, {
    key: "center",
    set: function set(v) {
      Vec3.copy(this._localShape.center, v);
    }
  }, {
    key: "localShape",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "worldShape",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
    /** id generator */

  }]);

  return BuiltinShape;
}();

exports.BuiltinShape = BuiltinShape;
BuiltinShape.idCounter = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjb2Nvc1xcc2hhcGVzXFxidWlsdGluLXNoYXBlLnRzIl0sIm5hbWVzIjpbIlZlYzMiLCJjYyIsIkJ1aWx0aW5TaGFwZSIsImlkIiwiaWRDb3VudGVyIiwiX3NoYXJlZEJvZHkiLCJfY29sbGlkZXIiLCJfbG9jYWxTaGFwZSIsIl93b3JsZFNoYXBlIiwiX19wcmVsb2FkIiwiY29tcCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsInBoeXNpY3NXb3JsZCIsImdldFNoYXJlZEJvZHkiLCJub2RlIiwicmVmZXJlbmNlIiwib25Mb2FkIiwiY2VudGVyIiwib25FbmFibGUiLCJhZGRTaGFwZSIsImVuYWJsZWQiLCJvbkRpc2FibGUiLCJyZW1vdmVTaGFwZSIsIm9uRGVzdHJveSIsInRyYW5zZm9ybSIsIm0iLCJwb3MiLCJyb3QiLCJzY2FsZSIsInYiLCJjb3B5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBLElBQU1BLElBQUksR0FBR0MsRUFBRSxDQUFDRCxJQUFoQjs7SUFFYUU7O1NBMkJBQyxLQUFhRCxZQUFZLENBQUNFLFNBQWI7U0FFWkM7U0FDQUM7U0FDQUM7U0FDQUM7Ozs7O1NBRVZDLFlBQUEsbUJBQVdDLElBQVgsRUFBNkI7QUFDekIsU0FBS0osU0FBTCxHQUFpQkksSUFBakI7QUFDQSxTQUFLTCxXQUFMLEdBQW9CSixFQUFFLENBQUNVLFFBQUgsQ0FBWUMsbUJBQVosR0FBa0NDLFlBQW5DLENBQWlFQyxhQUFqRSxDQUErRSxLQUFLUixTQUFMLENBQWVTLElBQTlGLENBQW5CO0FBQ0EsU0FBS1YsV0FBTCxDQUFpQlcsU0FBakIsR0FBNkIsSUFBN0I7QUFDSDs7U0FFREMsU0FBQSxrQkFBVTtBQUNOLFNBQUtDLE1BQUwsR0FBYyxLQUFLWixTQUFMLENBQWVZLE1BQTdCO0FBQ0g7O1NBRURDLFdBQUEsb0JBQVk7QUFDUixTQUFLZCxXQUFMLENBQWlCZSxRQUFqQixDQUEwQixJQUExQjs7QUFDQSxTQUFLZixXQUFMLENBQWlCZ0IsT0FBakIsR0FBMkIsSUFBM0I7QUFDSDs7U0FFREMsWUFBQSxxQkFBYTtBQUNULFNBQUtqQixXQUFMLENBQWlCa0IsV0FBakIsQ0FBNkIsSUFBN0I7O0FBQ0EsU0FBS2xCLFdBQUwsQ0FBaUJnQixPQUFqQixHQUEyQixLQUEzQjtBQUNIOztTQUVERyxZQUFBLHFCQUFhO0FBQ1QsU0FBS25CLFdBQUwsQ0FBaUJXLFNBQWpCLEdBQTZCLEtBQTdCO0FBQ0MsU0FBS1YsU0FBTixHQUEwQixJQUExQjtBQUNDLFNBQUtDLFdBQU4sR0FBNEIsSUFBNUI7QUFDQyxTQUFLQyxXQUFOLEdBQTRCLElBQTVCO0FBQ0g7O1NBRURpQixZQUFBLG1CQUFXQyxDQUFYLEVBQXVCQyxHQUF2QixFQUFxQ0MsR0FBckMsRUFBbURDLEtBQW5ELEVBQW1FO0FBQy9ELFNBQUt0QixXQUFMLENBQWlCa0IsU0FBakIsQ0FBMkJDLENBQTNCLEVBQThCQyxHQUE5QixFQUFtQ0MsR0FBbkMsRUFBd0NDLEtBQXhDLEVBQStDLEtBQUtyQixXQUFwRDtBQUNIOzs7O1NBOURELGFBQWNzQixDQUFkLEVBQWtDLENBQUc7OztTQUNyQyxhQUFlQSxDQUFmLEVBQTJCLENBQUc7OztTQUM5QixlQUE2QztBQUFFLGFBQU8sSUFBUDtBQUFjOzs7U0FFN0QsYUFBWUEsQ0FBWixFQUEwQjtBQUN0QjlCLE1BQUFBLElBQUksQ0FBQytCLElBQUwsQ0FBVSxLQUFLeEIsV0FBTCxDQUFpQlcsTUFBM0IsRUFBbUNZLENBQW5DO0FBQ0g7OztTQUVELGVBQWtCO0FBQ2QsYUFBTyxLQUFLdEIsV0FBWjtBQUNIOzs7U0FFRCxlQUFrQjtBQUNkLGFBQU8sS0FBS0EsV0FBWjtBQUNIOzs7U0FFRCxlQUFrQjtBQUNkLGFBQU8sS0FBS0gsV0FBWjtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBRUQ7Ozs7Ozs7O0FBekJTSixhQTBCTUUsWUFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBCdWlsdGluU2hhcmVkQm9keSB9IGZyb20gJy4uL2J1aWx0aW4tc2hhcmVkLWJvZHknO1xyXG5pbXBvcnQgeyBJQnVpbHRpblNoYXBlIH0gZnJvbSAnLi4vYnVpbHRpbi1pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb2xsaWRlcjNELCBQaHlzaWNzTWF0ZXJpYWwsIFJpZ2lkQm9keTNEIH0gZnJvbSAnLi4vLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XHJcbmltcG9ydCB7IElCYXNlU2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XHJcbmltcG9ydCB7IElWZWMzTGlrZSB9IGZyb20gJy4uLy4uL3NwZWMvaS1jb21tb24nO1xyXG5pbXBvcnQgeyBCdWlsdEluV29ybGQgfSBmcm9tICcuLi9idWlsdGluLXdvcmxkJztcclxuXHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJ1aWx0aW5TaGFwZSBpbXBsZW1lbnRzIElCYXNlU2hhcGUge1xyXG4gICAgc2V0IG1hdGVyaWFsICh2OiBQaHlzaWNzTWF0ZXJpYWwpIHsgfVxyXG4gICAgc2V0IGlzVHJpZ2dlciAodjogYm9vbGVhbikgeyB9XHJcbiAgICBnZXQgYXR0YWNoZWRSaWdpZEJvZHkgKCk6IFJpZ2lkQm9keTNEIHwgbnVsbCB7IHJldHVybiBudWxsOyB9XHJcblxyXG4gICAgc2V0IGNlbnRlciAodjogSVZlYzNMaWtlKSB7XHJcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMuX2xvY2FsU2hhcGUuY2VudGVyLCB2KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbG9jYWxTaGFwZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmxkU2hhcGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdvcmxkU2hhcGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZFNoYXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaGFyZWRCb2R5ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkQm9keTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29sbGlkZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsaWRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogaWQgZ2VuZXJhdG9yICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpZENvdW50ZXI6IG51bWJlciA9IDA7XHJcbiAgICByZWFkb25seSBpZDogbnVtYmVyID0gQnVpbHRpblNoYXBlLmlkQ291bnRlcisrOztcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3NoYXJlZEJvZHkhOiBCdWlsdGluU2hhcmVkQm9keTtcclxuICAgIHByb3RlY3RlZCBfY29sbGlkZXIhOiBDb2xsaWRlcjNEO1xyXG4gICAgcHJvdGVjdGVkIF9sb2NhbFNoYXBlITogSUJ1aWx0aW5TaGFwZTtcclxuICAgIHByb3RlY3RlZCBfd29ybGRTaGFwZSE6IElCdWlsdGluU2hhcGU7XHJcblxyXG4gICAgX19wcmVsb2FkIChjb21wOiBDb2xsaWRlcjNEKSB7XHJcbiAgICAgICAgdGhpcy5fY29sbGlkZXIgPSBjb21wO1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkgPSAoY2MuZGlyZWN0b3IuZ2V0UGh5c2ljczNETWFuYWdlcigpLnBoeXNpY3NXb3JsZCBhcyBCdWlsdEluV29ybGQpLmdldFNoYXJlZEJvZHkodGhpcy5fY29sbGlkZXIubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5yZWZlcmVuY2UgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLl9jb2xsaWRlci5jZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuYWRkU2hhcGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVtb3ZlU2hhcGUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fc2hhcmVkQm9keS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95ICgpIHtcclxuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LnJlZmVyZW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICh0aGlzLl9jb2xsaWRlciBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fbG9jYWxTaGFwZSBhcyBhbnkpID0gbnVsbDtcclxuICAgICAgICAodGhpcy5fd29ybGRTaGFwZSBhcyBhbnkpID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0gKG06IGNjLk1hdDQsIHBvczogY2MuVmVjMywgcm90OiBjYy5RdWF0LCBzY2FsZTogY2MuVmVjMykge1xyXG4gICAgICAgIHRoaXMuX2xvY2FsU2hhcGUudHJhbnNmb3JtKG0sIHBvcywgcm90LCBzY2FsZSwgdGhpcy5fd29ybGRTaGFwZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9