
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-box-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinBoxShape = void 0;

var _builtinShape = require("./builtin-shape");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Obb = cc.geomUtils.Obb;
var Vec3 = cc.Vec3;

var _worldScale = new Vec3();

var BuiltinBoxShape = /*#__PURE__*/function (_BuiltinShape) {
  _inheritsLoose(BuiltinBoxShape, _BuiltinShape);

  function BuiltinBoxShape(size) {
    var _this;

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new Obb();
    _this._worldShape = new Obb();
    Vec3.multiplyScalar(_this.localObb.halfExtents, size, 0.5);
    Vec3.copy(_this.worldObb.halfExtents, _this.localObb.halfExtents);
    return _this;
  }

  var _proto = BuiltinBoxShape.prototype;

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.size = this.boxCollider.size;
  };

  _createClass(BuiltinBoxShape, [{
    key: "localObb",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldObb",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "boxCollider",
    get: function get() {
      return this.collider;
    }
  }, {
    key: "size",
    set: function set(size) {
      Vec3.multiplyScalar(this.localObb.halfExtents, size, 0.5);
      this.collider.node.getWorldScale(_worldScale);
      _worldScale.x = Math.abs(_worldScale.x);
      _worldScale.y = Math.abs(_worldScale.y);
      _worldScale.z = Math.abs(_worldScale.z);
      Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, _worldScale);
    }
  }]);

  return BuiltinBoxShape;
}(_builtinShape.BuiltinShape);

exports.BuiltinBoxShape = BuiltinBoxShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjb2Nvc1xcc2hhcGVzXFxidWlsdGluLWJveC1zaGFwZS50cyJdLCJuYW1lcyI6WyJPYmIiLCJjYyIsImdlb21VdGlscyIsIlZlYzMiLCJfd29ybGRTY2FsZSIsIkJ1aWx0aW5Cb3hTaGFwZSIsInNpemUiLCJfbG9jYWxTaGFwZSIsIl93b3JsZFNoYXBlIiwibXVsdGlwbHlTY2FsYXIiLCJsb2NhbE9iYiIsImhhbGZFeHRlbnRzIiwiY29weSIsIndvcmxkT2JiIiwib25Mb2FkIiwiYm94Q29sbGlkZXIiLCJjb2xsaWRlciIsIm5vZGUiLCJnZXRXb3JsZFNjYWxlIiwieCIsIk1hdGgiLCJhYnMiLCJ5IiwieiIsIm11bHRpcGx5IiwiQnVpbHRpblNoYXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7Ozs7O0FBSUEsSUFBTUEsR0FBRyxHQUFHQyxFQUFFLENBQUNDLFNBQUgsQ0FBYUYsR0FBekI7QUFDQSxJQUFNRyxJQUFJLEdBQUdGLEVBQUUsQ0FBQ0UsSUFBaEI7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHLElBQUlELElBQUosRUFBbEI7O0lBRWFFOzs7QUFjVCwyQkFBYUMsSUFBYixFQUE0QjtBQUFBOztBQUN4QjtBQUNBLFVBQUtDLFdBQUwsR0FBbUIsSUFBSVAsR0FBSixFQUFuQjtBQUNBLFVBQUtRLFdBQUwsR0FBbUIsSUFBSVIsR0FBSixFQUFuQjtBQUNBRyxJQUFBQSxJQUFJLENBQUNNLGNBQUwsQ0FBb0IsTUFBS0MsUUFBTCxDQUFjQyxXQUFsQyxFQUErQ0wsSUFBL0MsRUFBcUQsR0FBckQ7QUFDQUgsSUFBQUEsSUFBSSxDQUFDUyxJQUFMLENBQVUsTUFBS0MsUUFBTCxDQUFjRixXQUF4QixFQUFxQyxNQUFLRCxRQUFMLENBQWNDLFdBQW5EO0FBTHdCO0FBTTNCOzs7O1NBV0RHLFNBQUEsa0JBQVU7QUFDTiw0QkFBTUEsTUFBTjs7QUFDQSxTQUFLUixJQUFMLEdBQVksS0FBS1MsV0FBTCxDQUFpQlQsSUFBN0I7QUFDSDs7OztTQWhDRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsV0FBWjtBQUNIOzs7U0FFRCxlQUFnQjtBQUNaLGFBQU8sS0FBS0MsV0FBWjtBQUNIOzs7U0FFRCxlQUEwQjtBQUN0QixhQUFPLEtBQUtRLFFBQVo7QUFDSDs7O1NBVUQsYUFBVVYsSUFBVixFQUF5QjtBQUNyQkgsTUFBQUEsSUFBSSxDQUFDTSxjQUFMLENBQW9CLEtBQUtDLFFBQUwsQ0FBY0MsV0FBbEMsRUFBK0NMLElBQS9DLEVBQXFELEdBQXJEO0FBQ0EsV0FBS1UsUUFBTCxDQUFjQyxJQUFkLENBQW1CQyxhQUFuQixDQUFpQ2QsV0FBakM7QUFDQUEsTUFBQUEsV0FBVyxDQUFDZSxDQUFaLEdBQWdCQyxJQUFJLENBQUNDLEdBQUwsQ0FBU2pCLFdBQVcsQ0FBQ2UsQ0FBckIsQ0FBaEI7QUFDQWYsTUFBQUEsV0FBVyxDQUFDa0IsQ0FBWixHQUFnQkYsSUFBSSxDQUFDQyxHQUFMLENBQVNqQixXQUFXLENBQUNrQixDQUFyQixDQUFoQjtBQUNBbEIsTUFBQUEsV0FBVyxDQUFDbUIsQ0FBWixHQUFnQkgsSUFBSSxDQUFDQyxHQUFMLENBQVNqQixXQUFXLENBQUNtQixDQUFyQixDQUFoQjtBQUNBcEIsTUFBQUEsSUFBSSxDQUFDcUIsUUFBTCxDQUFjLEtBQUtYLFFBQUwsQ0FBY0YsV0FBNUIsRUFBeUMsS0FBS0QsUUFBTCxDQUFjQyxXQUF2RCxFQUFvRVAsV0FBcEU7QUFDSDs7OztFQTdCZ0NxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCB7IEJ1aWx0aW5TaGFwZSB9IGZyb20gJy4vYnVpbHRpbi1zaGFwZSc7XHJcbmltcG9ydCB7IElCb3hTaGFwZSB9IGZyb20gJy4uLy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcclxuaW1wb3J0IHsgQm94Q29sbGlkZXIzRCB9IGZyb20gJy4uLy4uL2V4cG9ydHMvcGh5c2ljcy1mcmFtZXdvcmsnO1xyXG5cclxuY29uc3QgT2JiID0gY2MuZ2VvbVV0aWxzLk9iYjtcclxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XHJcbmxldCBfd29ybGRTY2FsZSA9IG5ldyBWZWMzKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVpbHRpbkJveFNoYXBlIGV4dGVuZHMgQnVpbHRpblNoYXBlIGltcGxlbWVudHMgSUJveFNoYXBlIHtcclxuXHJcbiAgICBnZXQgbG9jYWxPYmIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFNoYXBlIGFzIGNjLmdlb21VdGlscy5PYmI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHdvcmxkT2JiICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd29ybGRTaGFwZSBhcyBjYy5nZW9tVXRpbHMuT2JiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm94Q29sbGlkZXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyIGFzIEJveENvbGxpZGVyM0Q7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHNpemU6IGNjLlZlYzMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2xvY2FsU2hhcGUgPSBuZXcgT2JiKCk7XHJcbiAgICAgICAgdGhpcy5fd29ybGRTaGFwZSA9IG5ldyBPYmIoKTtcclxuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHRoaXMubG9jYWxPYmIuaGFsZkV4dGVudHMsIHNpemUsIDAuNSk7XHJcbiAgICAgICAgVmVjMy5jb3B5KHRoaXMud29ybGRPYmIuaGFsZkV4dGVudHMsIHRoaXMubG9jYWxPYmIuaGFsZkV4dGVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzaXplIChzaXplOiBjYy5WZWMzKSB7XHJcbiAgICAgICAgVmVjMy5tdWx0aXBseVNjYWxhcih0aGlzLmxvY2FsT2JiLmhhbGZFeHRlbnRzLCBzaXplLCAwLjUpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKF93b3JsZFNjYWxlKTtcclxuICAgICAgICBfd29ybGRTY2FsZS54ID0gTWF0aC5hYnMoX3dvcmxkU2NhbGUueCk7XHJcbiAgICAgICAgX3dvcmxkU2NhbGUueSA9IE1hdGguYWJzKF93b3JsZFNjYWxlLnkpO1xyXG4gICAgICAgIF93b3JsZFNjYWxlLnogPSBNYXRoLmFicyhfd29ybGRTY2FsZS56KTtcclxuICAgICAgICBWZWMzLm11bHRpcGx5KHRoaXMud29ybGRPYmIuaGFsZkV4dGVudHMsIHRoaXMubG9jYWxPYmIuaGFsZkV4dGVudHMsIF93b3JsZFNjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuYm94Q29sbGlkZXIuc2l6ZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=