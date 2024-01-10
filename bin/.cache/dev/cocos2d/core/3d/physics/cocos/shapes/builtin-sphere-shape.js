
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-sphere-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinSphereShape = void 0;

var _builtinShape = require("./builtin-shape");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sphere = cc.geomUtils.Sphere;

var _worldScale = new cc.Vec3();

var BuiltinSphereShape = /*#__PURE__*/function (_BuiltinShape) {
  _inheritsLoose(BuiltinSphereShape, _BuiltinShape);

  function BuiltinSphereShape(radius) {
    var _this;

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new Sphere(0, 0, 0, radius);
    _this._worldShape = new Sphere(0, 0, 0, radius);
    return _this;
  }

  var _proto = BuiltinSphereShape.prototype;

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.radius = this.sphereCollider.radius;
  };

  _createClass(BuiltinSphereShape, [{
    key: "radius",
    set: function set(radius) {
      this.localSphere.radius = radius;
      this.collider.node.getWorldScale(_worldScale);

      var s = _worldScale.maxAxis();

      this.worldSphere.radius = this.localSphere.radius * s;
    }
  }, {
    key: "localSphere",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldSphere",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "sphereCollider",
    get: function get() {
      return this.collider;
    }
  }]);

  return BuiltinSphereShape;
}(_builtinShape.BuiltinShape);

exports.BuiltinSphereShape = BuiltinSphereShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjb2Nvc1xcc2hhcGVzXFxidWlsdGluLXNwaGVyZS1zaGFwZS50cyJdLCJuYW1lcyI6WyJTcGhlcmUiLCJjYyIsImdlb21VdGlscyIsIl93b3JsZFNjYWxlIiwiVmVjMyIsIkJ1aWx0aW5TcGhlcmVTaGFwZSIsInJhZGl1cyIsIl9sb2NhbFNoYXBlIiwiX3dvcmxkU2hhcGUiLCJvbkxvYWQiLCJzcGhlcmVDb2xsaWRlciIsImxvY2FsU3BoZXJlIiwiY29sbGlkZXIiLCJub2RlIiwiZ2V0V29ybGRTY2FsZSIsInMiLCJtYXhBeGlzIiwid29ybGRTcGhlcmUiLCJCdWlsdGluU2hhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7Ozs7Ozs7QUFJQSxJQUFNQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhRixNQUE1Qjs7QUFDQSxJQUFJRyxXQUFXLEdBQUcsSUFBSUYsRUFBRSxDQUFDRyxJQUFQLEVBQWxCOztJQUVhQzs7O0FBcUJULDhCQUFhQyxNQUFiLEVBQTZCO0FBQUE7O0FBQ3pCO0FBQ0EsVUFBS0MsV0FBTCxHQUFtQixJQUFJUCxNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JNLE1BQXBCLENBQW5CO0FBQ0EsVUFBS0UsV0FBTCxHQUFtQixJQUFJUixNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JNLE1BQXBCLENBQW5CO0FBSHlCO0FBSTVCOzs7O1NBRURHLFNBQUEsa0JBQVU7QUFDTiw0QkFBTUEsTUFBTjs7QUFDQSxTQUFLSCxNQUFMLEdBQWMsS0FBS0ksY0FBTCxDQUFvQkosTUFBbEM7QUFDSDs7OztTQTVCRCxhQUFZQSxNQUFaLEVBQTRCO0FBQ3hCLFdBQUtLLFdBQUwsQ0FBaUJMLE1BQWpCLEdBQTBCQSxNQUExQjtBQUNBLFdBQUtNLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQkMsYUFBbkIsQ0FBaUNYLFdBQWpDOztBQUNBLFVBQU1ZLENBQUMsR0FBR1osV0FBVyxDQUFDYSxPQUFaLEVBQVY7O0FBQ0EsV0FBS0MsV0FBTCxDQUFpQlgsTUFBakIsR0FBMEIsS0FBS0ssV0FBTCxDQUFpQkwsTUFBakIsR0FBMEJTLENBQXBEO0FBQ0g7OztTQUVELGVBQW1CO0FBQ2YsYUFBTyxLQUFLUixXQUFaO0FBQ0g7OztTQUVELGVBQW1CO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0g7OztTQUVELGVBQXNCO0FBQ2xCLGFBQU8sS0FBS0ksUUFBWjtBQUNIOzs7O0VBbkJtQ00iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBCdWlsdGluU2hhcGUgfSBmcm9tICcuL2J1aWx0aW4tc2hhcGUnO1xyXG5pbXBvcnQgeyBJU3BoZXJlU2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XHJcbmltcG9ydCB7IFNwaGVyZUNvbGxpZGVyM0QgfSBmcm9tICcuLi8uLi9leHBvcnRzL3BoeXNpY3MtZnJhbWV3b3JrJztcclxuXHJcbmNvbnN0IFNwaGVyZSA9IGNjLmdlb21VdGlscy5TcGhlcmU7XHJcbmxldCBfd29ybGRTY2FsZSA9IG5ldyBjYy5WZWMzKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVpbHRpblNwaGVyZVNoYXBlIGV4dGVuZHMgQnVpbHRpblNoYXBlIGltcGxlbWVudHMgSVNwaGVyZVNoYXBlIHtcclxuXHJcbiAgICBzZXQgcmFkaXVzIChyYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubG9jYWxTcGhlcmUucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKF93b3JsZFNjYWxlKTtcclxuICAgICAgICBjb25zdCBzID0gX3dvcmxkU2NhbGUubWF4QXhpcygpO1xyXG4gICAgICAgIHRoaXMud29ybGRTcGhlcmUucmFkaXVzID0gdGhpcy5sb2NhbFNwaGVyZS5yYWRpdXMgKiBzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBsb2NhbFNwaGVyZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsU2hhcGUgYXMgY2MuZ2VvbVV0aWxzLlNwaGVyZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgd29ybGRTcGhlcmUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZFNoYXBlIGFzIGNjLmdlb21VdGlscy5TcGhlcmU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNwaGVyZUNvbGxpZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlciBhcyBTcGhlcmVDb2xsaWRlcjNEO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yIChyYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbG9jYWxTaGFwZSA9IG5ldyBTcGhlcmUoMCwgMCwgMCwgcmFkaXVzKTtcclxuICAgICAgICB0aGlzLl93b3JsZFNoYXBlID0gbmV3IFNwaGVyZSgwLCAwLCAwLCByYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnNwaGVyZUNvbGxpZGVyLnJhZGl1cztcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=