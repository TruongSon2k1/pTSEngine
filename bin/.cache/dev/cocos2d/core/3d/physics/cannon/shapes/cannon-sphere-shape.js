
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-sphere-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonSphereShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _cannonUtil = require("../cannon-util");

var _cannonShape = require("./cannon-shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var v3_0 = new cc.Vec3();

var CannonSphereShape = /*#__PURE__*/function (_CannonShape) {
  _inheritsLoose(CannonSphereShape, _CannonShape);

  function CannonSphereShape(radius) {
    var _this;

    _this = _CannonShape.call(this) || this;
    _this._radius = void 0;
    _this._radius = radius;
    _this._shape = new _cannon["default"].Sphere(_this._radius);
    return _this;
  }

  var _proto = CannonSphereShape.prototype;

  _proto.onLoad = function onLoad() {
    _CannonShape.prototype.onLoad.call(this);

    this.radius = this.sphereCollider.radius;
  };

  _proto.setScale = function setScale(scale) {
    _CannonShape.prototype.setScale.call(this, scale);

    this.radius = this.sphereCollider.radius;
  };

  _createClass(CannonSphereShape, [{
    key: "sphereCollider",
    get: function get() {
      return this.collider;
    }
  }, {
    key: "sphere",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(v) {
      this.collider.node.getWorldScale(v3_0);
      var max = v3_0.maxAxis();
      this.sphere.radius = v * Math.abs(max);
      this.sphere.updateBoundingSphereRadius();

      if (this._index != -1) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }]);

  return CannonSphereShape;
}(_cannonShape.CannonShape);

exports.CannonSphereShape = CannonSphereShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxjYW5ub25cXHNoYXBlc1xcY2Fubm9uLXNwaGVyZS1zaGFwZS50cyJdLCJuYW1lcyI6WyJ2M18wIiwiY2MiLCJWZWMzIiwiQ2Fubm9uU3BoZXJlU2hhcGUiLCJyYWRpdXMiLCJfcmFkaXVzIiwiX3NoYXBlIiwiQ0FOTk9OIiwiU3BoZXJlIiwib25Mb2FkIiwic3BoZXJlQ29sbGlkZXIiLCJzZXRTY2FsZSIsInNjYWxlIiwiY29sbGlkZXIiLCJ2Iiwibm9kZSIsImdldFdvcmxkU2NhbGUiLCJtYXgiLCJtYXhBeGlzIiwic3BoZXJlIiwiTWF0aCIsImFicyIsInVwZGF0ZUJvdW5kaW5nU3BoZXJlUmFkaXVzIiwiX2luZGV4IiwiX2JvZHkiLCJDYW5ub25TaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBSUEsSUFBTUEsSUFBSSxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsSUFBUCxFQUFiOztJQUNhQzs7O0FBMEJULDZCQUFhQyxNQUFiLEVBQTZCO0FBQUE7O0FBQ3pCO0FBRHlCLFVBRnJCQyxPQUVxQjtBQUV6QixVQUFLQSxPQUFMLEdBQWVELE1BQWY7QUFDQSxVQUFLRSxNQUFMLEdBQWMsSUFBSUMsbUJBQU9DLE1BQVgsQ0FBa0IsTUFBS0gsT0FBdkIsQ0FBZDtBQUh5QjtBQUk1Qjs7OztTQUVESSxTQUFBLGtCQUFVO0FBQ04sMkJBQU1BLE1BQU47O0FBQ0EsU0FBS0wsTUFBTCxHQUFjLEtBQUtNLGNBQUwsQ0FBb0JOLE1BQWxDO0FBQ0g7O1NBRURPLFdBQUEsa0JBQVVDLEtBQVYsRUFBZ0M7QUFDNUIsMkJBQU1ELFFBQU4sWUFBZUMsS0FBZjs7QUFDQSxTQUFLUixNQUFMLEdBQWMsS0FBS00sY0FBTCxDQUFvQk4sTUFBbEM7QUFDSDs7OztTQXRDRCxlQUFzQjtBQUNsQixhQUFPLEtBQUtTLFFBQVo7QUFDSDs7O1NBRUQsZUFBYztBQUNWLGFBQU8sS0FBS1AsTUFBWjtBQUNIOzs7U0FFRCxlQUFjO0FBQ1YsYUFBTyxLQUFLRCxPQUFaO0FBQ0g7U0FFRCxhQUFZUyxDQUFaLEVBQXVCO0FBQ25CLFdBQUtELFFBQUwsQ0FBY0UsSUFBZCxDQUFtQkMsYUFBbkIsQ0FBaUNoQixJQUFqQztBQUNBLFVBQU1pQixHQUFHLEdBQUdqQixJQUFJLENBQUNrQixPQUFMLEVBQVo7QUFDQSxXQUFLQyxNQUFMLENBQVlmLE1BQVosR0FBcUJVLENBQUMsR0FBR00sSUFBSSxDQUFDQyxHQUFMLENBQVNKLEdBQVQsQ0FBekI7QUFDQSxXQUFLRSxNQUFMLENBQVlHLDBCQUFaOztBQUNBLFVBQUksS0FBS0MsTUFBTCxJQUFlLENBQUMsQ0FBcEIsRUFBdUI7QUFDbkIsNENBQW1CLEtBQUtDLEtBQXhCO0FBQ0g7QUFDSjs7OztFQXRCa0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IENBTk5PTiBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9jYW5ub24vY2Fubm9uJztcclxuaW1wb3J0IHsgY29tbWl0U2hhcGVVcGRhdGVzIH0gZnJvbSAnLi4vY2Fubm9uLXV0aWwnO1xyXG5pbXBvcnQgeyBDYW5ub25TaGFwZSB9IGZyb20gJy4vY2Fubm9uLXNoYXBlJztcclxuaW1wb3J0IHsgSVNwaGVyZVNoYXBlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLXBoeXNpY3Mtc2hhcGUnO1xyXG5pbXBvcnQgeyBTcGhlcmVDb2xsaWRlcjNEIH0gZnJvbSAnLi4vLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XHJcblxyXG5jb25zdCB2M18wID0gbmV3IGNjLlZlYzMoKTtcclxuZXhwb3J0IGNsYXNzIENhbm5vblNwaGVyZVNoYXBlIGV4dGVuZHMgQ2Fubm9uU2hhcGUgaW1wbGVtZW50cyBJU3BoZXJlU2hhcGUge1xyXG5cclxuICAgIGdldCBzcGhlcmVDb2xsaWRlciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXIgYXMgU3BoZXJlQ29sbGlkZXIzRDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc3BoZXJlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgQ0FOTk9OLlNwaGVyZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmFkaXVzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmFkaXVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCByYWRpdXMgKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKHYzXzApO1xyXG4gICAgICAgIGNvbnN0IG1heCA9IHYzXzAubWF4QXhpcygpO1xyXG4gICAgICAgIHRoaXMuc3BoZXJlLnJhZGl1cyA9IHYgKiBNYXRoLmFicyhtYXgpO1xyXG4gICAgICAgIHRoaXMuc3BoZXJlLnVwZGF0ZUJvdW5kaW5nU3BoZXJlUmFkaXVzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbW1pdFNoYXBlVXBkYXRlcyh0aGlzLl9ib2R5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmFkaXVzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XHJcbiAgICAgICAgdGhpcy5fc2hhcGUgPSBuZXcgQ0FOTk9OLlNwaGVyZSh0aGlzLl9yYWRpdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnNwaGVyZUNvbGxpZGVyLnJhZGl1cztcclxuICAgIH1cclxuXHJcbiAgICBzZXRTY2FsZSAoc2NhbGU6IGNjLlZlYzMpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5zZXRTY2FsZShzY2FsZSk7XHJcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnNwaGVyZUNvbGxpZGVyLnJhZGl1cztcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=