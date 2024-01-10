
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-box-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonBoxShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _cannonUtil = require("../cannon-util");

var _cannonShape = require("./cannon-shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Vec3 = cc.Vec3;
var v3_0 = new Vec3();

var CannonBoxShape = /*#__PURE__*/function (_CannonShape) {
  _inheritsLoose(CannonBoxShape, _CannonShape);

  function CannonBoxShape(size) {
    var _this;

    _this = _CannonShape.call(this) || this;
    _this.halfExtent = new _cannon["default"].Vec3();
    Vec3.multiplyScalar(_this.halfExtent, size, 0.5);
    _this._shape = new _cannon["default"].Box(_this.halfExtent.clone());
    return _this;
  }

  var _proto = CannonBoxShape.prototype;

  _proto.onLoad = function onLoad() {
    _CannonShape.prototype.onLoad.call(this);

    this.size = this.boxCollider.size;
  };

  _proto.setScale = function setScale(scale) {
    _CannonShape.prototype.setScale.call(this, scale);

    this.size = this.boxCollider.size;
  };

  _createClass(CannonBoxShape, [{
    key: "boxCollider",
    get: function get() {
      return this.collider;
    }
  }, {
    key: "box",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "size",
    set: function set(v) {
      this.collider.node.getWorldScale(v3_0);
      v3_0.x = Math.abs(v3_0.x);
      v3_0.y = Math.abs(v3_0.y);
      v3_0.z = Math.abs(v3_0.z);
      Vec3.multiplyScalar(this.halfExtent, v, 0.5);
      Vec3.multiply(this.box.halfExtents, this.halfExtent, v3_0);
      this.box.updateConvexPolyhedronRepresentation();

      if (this._index != -1) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }]);

  return CannonBoxShape;
}(_cannonShape.CannonShape);

exports.CannonBoxShape = CannonBoxShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXHNoYXBlc1xcY2Fubm9uLWJveC1zaGFwZS50cyJdLCJuYW1lcyI6WyJWZWMzIiwiY2MiLCJ2M18wIiwiQ2Fubm9uQm94U2hhcGUiLCJzaXplIiwiaGFsZkV4dGVudCIsIkNBTk5PTiIsIm11bHRpcGx5U2NhbGFyIiwiX3NoYXBlIiwiQm94IiwiY2xvbmUiLCJvbkxvYWQiLCJib3hDb2xsaWRlciIsInNldFNjYWxlIiwic2NhbGUiLCJjb2xsaWRlciIsInYiLCJub2RlIiwiZ2V0V29ybGRTY2FsZSIsIngiLCJNYXRoIiwiYWJzIiwieSIsInoiLCJtdWx0aXBseSIsImJveCIsImhhbGZFeHRlbnRzIiwidXBkYXRlQ29udmV4UG9seWhlZHJvblJlcHJlc2VudGF0aW9uIiwiX2luZGV4IiwiX2JvZHkiLCJDYW5ub25TaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBS0EsSUFBTUEsSUFBSSxHQUFHQyxFQUFFLENBQUNELElBQWhCO0FBQ0EsSUFBTUUsSUFBSSxHQUFHLElBQUlGLElBQUosRUFBYjs7SUFFYUc7OztBQVdULDBCQUFhQyxJQUFiLEVBQTRCO0FBQUE7O0FBQ3hCO0FBRHdCLFVBRG5CQyxVQUNtQixHQURPLElBQUlDLG1CQUFPTixJQUFYLEVBQ1A7QUFFeEJBLElBQUFBLElBQUksQ0FBQ08sY0FBTCxDQUFvQixNQUFLRixVQUF6QixFQUFxQ0QsSUFBckMsRUFBMkMsR0FBM0M7QUFDQSxVQUFLSSxNQUFMLEdBQWMsSUFBSUYsbUJBQU9HLEdBQVgsQ0FBZSxNQUFLSixVQUFMLENBQWdCSyxLQUFoQixFQUFmLENBQWQ7QUFId0I7QUFJM0I7Ozs7U0FlREMsU0FBQSxrQkFBVTtBQUNOLDJCQUFNQSxNQUFOOztBQUNBLFNBQUtQLElBQUwsR0FBWSxLQUFLUSxXQUFMLENBQWlCUixJQUE3QjtBQUNIOztTQUVEUyxXQUFBLGtCQUFVQyxLQUFWLEVBQWdDO0FBQzVCLDJCQUFNRCxRQUFOLFlBQWVDLEtBQWY7O0FBQ0EsU0FBS1YsSUFBTCxHQUFZLEtBQUtRLFdBQUwsQ0FBaUJSLElBQTdCO0FBQ0g7Ozs7U0FwQ0QsZUFBMEI7QUFDdEIsYUFBTyxLQUFLVyxRQUFaO0FBQ0g7OztTQUVELGVBQWtCO0FBQ2QsYUFBTyxLQUFLUCxNQUFaO0FBQ0g7OztTQVNELGFBQVVRLENBQVYsRUFBd0I7QUFDcEIsV0FBS0QsUUFBTCxDQUFjRSxJQUFkLENBQW1CQyxhQUFuQixDQUFpQ2hCLElBQWpDO0FBQ0FBLE1BQUFBLElBQUksQ0FBQ2lCLENBQUwsR0FBU0MsSUFBSSxDQUFDQyxHQUFMLENBQVNuQixJQUFJLENBQUNpQixDQUFkLENBQVQ7QUFDQWpCLE1BQUFBLElBQUksQ0FBQ29CLENBQUwsR0FBU0YsSUFBSSxDQUFDQyxHQUFMLENBQVNuQixJQUFJLENBQUNvQixDQUFkLENBQVQ7QUFDQXBCLE1BQUFBLElBQUksQ0FBQ3FCLENBQUwsR0FBU0gsSUFBSSxDQUFDQyxHQUFMLENBQVNuQixJQUFJLENBQUNxQixDQUFkLENBQVQ7QUFDQXZCLE1BQUFBLElBQUksQ0FBQ08sY0FBTCxDQUFvQixLQUFLRixVQUF6QixFQUFxQ1csQ0FBckMsRUFBd0MsR0FBeEM7QUFDQWhCLE1BQUFBLElBQUksQ0FBQ3dCLFFBQUwsQ0FBYyxLQUFLQyxHQUFMLENBQVNDLFdBQXZCLEVBQW9DLEtBQUtyQixVQUF6QyxFQUFxREgsSUFBckQ7QUFDQSxXQUFLdUIsR0FBTCxDQUFTRSxvQ0FBVDs7QUFDQSxVQUFJLEtBQUtDLE1BQUwsSUFBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLDRDQUFtQixLQUFLQyxLQUF4QjtBQUNIO0FBQ0o7Ozs7RUE1QitCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBDQU5OT04gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vZXh0ZXJuYWwvY2Fubm9uL2Nhbm5vbic7XHJcbmltcG9ydCB7IGNvbW1pdFNoYXBlVXBkYXRlcyB9IGZyb20gJy4uL2Nhbm5vbi11dGlsJztcclxuaW1wb3J0IHsgQ2Fubm9uU2hhcGUgfSBmcm9tICcuL2Nhbm5vbi1zaGFwZSc7XHJcbmltcG9ydCB7IElCb3hTaGFwZSB9IGZyb20gJy4uLy4uL3NwZWMvaS1waHlzaWNzLXNoYXBlJztcclxuaW1wb3J0IHsgSVZlYzNMaWtlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLWNvbW1vbic7XHJcbmltcG9ydCB7IEJveENvbGxpZGVyM0QgfSBmcm9tICcuLi8uLi9leHBvcnRzL3BoeXNpY3MtZnJhbWV3b3JrJztcclxuXHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5jb25zdCB2M18wID0gbmV3IFZlYzMoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYW5ub25Cb3hTaGFwZSBleHRlbmRzIENhbm5vblNoYXBlIGltcGxlbWVudHMgSUJveFNoYXBlIHtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGJveENvbGxpZGVyICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlciBhcyBCb3hDb2xsaWRlcjNEO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYm94ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgQ0FOTk9OLkJveDtcclxuICAgIH1cclxuXHJcbiAgICByZWFkb25seSBoYWxmRXh0ZW50OiBDQU5OT04uVmVjMyA9IG5ldyBDQU5OT04uVmVjMygpO1xyXG4gICAgY29uc3RydWN0b3IgKHNpemU6IGNjLlZlYzMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFZlYzMubXVsdGlwbHlTY2FsYXIodGhpcy5oYWxmRXh0ZW50LCBzaXplLCAwLjUpO1xyXG4gICAgICAgIHRoaXMuX3NoYXBlID0gbmV3IENBTk5PTi5Cb3godGhpcy5oYWxmRXh0ZW50LmNsb25lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzaXplICh2OiBJVmVjM0xpa2UpIHtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLm5vZGUuZ2V0V29ybGRTY2FsZSh2M18wKTtcclxuICAgICAgICB2M18wLnggPSBNYXRoLmFicyh2M18wLngpO1xyXG4gICAgICAgIHYzXzAueSA9IE1hdGguYWJzKHYzXzAueSk7XHJcbiAgICAgICAgdjNfMC56ID0gTWF0aC5hYnModjNfMC56KTtcclxuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHRoaXMuaGFsZkV4dGVudCwgdiwgMC41KTtcclxuICAgICAgICBWZWMzLm11bHRpcGx5KHRoaXMuYm94LmhhbGZFeHRlbnRzLCB0aGlzLmhhbGZFeHRlbnQsIHYzXzApO1xyXG4gICAgICAgIHRoaXMuYm94LnVwZGF0ZUNvbnZleFBvbHloZWRyb25SZXByZXNlbnRhdGlvbigpO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICBjb21taXRTaGFwZVVwZGF0ZXModGhpcy5fYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5zaXplID0gdGhpcy5ib3hDb2xsaWRlci5zaXplO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNjYWxlIChzY2FsZTogY2MuVmVjMyk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnNldFNjYWxlKHNjYWxlKTtcclxuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLmJveENvbGxpZGVyLnNpemU7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=