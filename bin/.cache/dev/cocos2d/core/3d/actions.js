
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/actions.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _quat = _interopRequireDefault(require("../value-types/quat"));

var _vec = _interopRequireDefault(require("../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _quat_tmp = cc.quat();

var _vec3_tmp = cc.v3();
/*
 * Rotates a Node object to a certain angle by modifying its quaternion property. <br/>
 * The direction will be decided by the shortest angle.
 * @class Rotate3DTo
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} dstAngleX dstAngleX in degrees.
 * @param {Number} [dstAngleY] dstAngleY in degrees.
 * @param {Number} [dstAngleZ] dstAngleZ in degrees.
 * @example
 * var rotate3DTo = new cc.Rotate3DTo(2, cc.v3(0, 180, 0));
 */


cc.Rotate3DTo = cc.Class({
  name: 'cc.Rotate3DTo',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, dstAngleX, dstAngleY, dstAngleZ) {
    this._startQuat = cc.quat();
    this._dstQuat = cc.quat();
    dstAngleX !== undefined && this.initWithDuration(duration, dstAngleX, dstAngleY, dstAngleZ);
  },

  /*
   * Initializes the action.
   * @param {Number} duration
   * @param {Number|Vec3|Quat} dstAngleX
   * @param {Number} dstAngleY
   * @param {Number} dstAngleZ
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, dstAngleX, dstAngleY, dstAngleZ) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      var dstQuat = this._dstQuat;

      if (dstAngleX instanceof cc.Quat) {
        dstQuat.set(dstAngleX);
      } else {
        if (dstAngleX instanceof cc.Vec3) {
          dstAngleY = dstAngleX.y;
          dstAngleZ = dstAngleX.z;
          dstAngleX = dstAngleX.x;
        } else {
          dstAngleY = dstAngleY || 0;
          dstAngleZ = dstAngleZ || 0;
        }

        _quat["default"].fromEuler(dstQuat, dstAngleX, dstAngleY, dstAngleZ);
      }

      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Rotate3DTo();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._dstQuat);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);

    this._startQuat.set(target.quat);
  },
  reverse: function reverse() {
    cc.logID(1016);
  },
  update: function update(dt) {
    dt = this._computeEaseTime(dt);

    if (this.target) {
      _quat["default"].slerp(_quat_tmp, this._startQuat, this._dstQuat, dt);

      this.target.setRotation(_quat_tmp);
    }
  }
});
/**
 * !#en
 * Rotates a Node object to a certain angle by modifying its quternion property. <br/>
 * The direction will be decided by the shortest angle.
 * !#zh 旋转到目标角度，通过逐帧修改它的 quternion 属性，旋转方向将由最短的角度决定。
 * @method rotate3DTo
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3|Quat} dstAngleX dstAngleX in degrees.
 * @param {Number} [dstAngleY] dstAngleY in degrees.
 * @param {Number} [dstAngleZ] dstAngleZ in degrees.
 * @return {ActionInterval}
 * @example
 * // example
 * var rotate3DTo = cc.rotate3DTo(2, cc.v3(0, 180, 0));
 */

cc.rotate3DTo = function (duration, dstAngleX, dstAngleY, dstAngleZ) {
  return new cc.Rotate3DTo(duration, dstAngleX, dstAngleY, dstAngleZ);
};
/*
 * Rotates a Node object counter clockwise a number of degrees by modifying its quaternion property.
 * Relative to its properties to modify.
 * @class Rotate3DBy
 * @extends ActionInterval
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
 * @param {Number} [deltaAngleY] deltaAngleY in degrees
 * @param {Number} [deltaAngleZ] deltaAngleZ in degrees
 * @example
 * var actionBy = new cc.Rotate3DBy(2, cc.v3(0, 360, 0));
 */


cc.Rotate3DBy = cc.Class({
  name: 'cc.Rotate3DBy',
  "extends": cc.ActionInterval,
  ctor: function ctor(duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
    this._startQuat = cc.quat();
    this._dstQuat = cc.quat();
    this._deltaAngle = cc.v3();
    deltaAngleX !== undefined && this.initWithDuration(duration, deltaAngleX, deltaAngleY, deltaAngleZ);
  },

  /*
   * Initializes the action.
   * @param {Number} duration duration in seconds
   * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
   * @param {Number} [deltaAngleY=] deltaAngleY in degrees
   * @param {Number} [deltaAngleZ=] deltaAngleZ in degrees
   * @return {Boolean}
   */
  initWithDuration: function initWithDuration(duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
    if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
      if (deltaAngleX instanceof cc.Vec3) {
        deltaAngleY = deltaAngleX.y;
        deltaAngleZ = deltaAngleX.z;
        deltaAngleX = deltaAngleX.x;
      } else {
        deltaAngleY = deltaAngleY || 0;
        deltaAngleZ = deltaAngleZ || 0;
      }

      _vec["default"].set(this._deltaAngle, deltaAngleX, deltaAngleY, deltaAngleZ);

      return true;
    }

    return false;
  },
  clone: function clone() {
    var action = new cc.Rotate3DBy();

    this._cloneDecoration(action);

    action.initWithDuration(this._duration, this._angle);
    return action;
  },
  startWithTarget: function startWithTarget(target) {
    cc.ActionInterval.prototype.startWithTarget.call(this, target);
    var startAngle = target.eulerAngles;
    var deltaAngle = this._deltaAngle;

    _quat["default"].fromEuler(this._dstQuat, startAngle.x + deltaAngle.x, startAngle.y + deltaAngle.y, startAngle.z + deltaAngle.z);

    this._startQuat.set(target.quat);
  },
  update: function () {
    var RAD = Math.PI / 180;
    return function (dt) {
      dt = this._computeEaseTime(dt);

      if (this.target) {
        _quat["default"].slerp(_quat_tmp, this._startQuat, this._dstQuat, dt);

        this.target.setRotation(_quat_tmp);
      }
    };
  }(),
  reverse: function reverse() {
    var angle = this._angle;
    _vec3_tmp.x = -angle.x;
    _vec3_tmp.y = -angle.y;
    _vec3_tmp.z = -angle.z;
    var action = new cc.Rotate3DBy(this._duration, _vec3_tmp);

    this._cloneDecoration(action);

    this._reverseEaseList(action);

    return action;
  }
});
/**
 * !#en
 * Rotates a Node object counter clockwise a number of degrees by modifying its quaternion property.
 * Relative to its properties to modify.
 * !#zh 旋转指定的 3D 角度。
 * @method rotate3DBy
 * @param {Number} duration duration in seconds
 * @param {Number|Vec3} deltaAngleX deltaAngleX in degrees
 * @param {Number} [deltaAngleY] deltaAngleY in degrees
 * @param {Number} [deltaAngleZ] deltaAngleZ in degrees
 * @return {ActionInterval}
 * @example
 * // example
 * var actionBy = cc.rotate3DBy(2, cc.v3(0, 360, 0));
 */

cc.rotate3DBy = function (duration, deltaAngleX, deltaAngleY, deltaAngleZ) {
  return new cc.Rotate3DBy(duration, deltaAngleX, deltaAngleY, deltaAngleZ);
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxhY3Rpb25zLmpzIl0sIm5hbWVzIjpbIl9xdWF0X3RtcCIsImNjIiwicXVhdCIsIl92ZWMzX3RtcCIsInYzIiwiUm90YXRlM0RUbyIsIkNsYXNzIiwibmFtZSIsIkFjdGlvbkludGVydmFsIiwiY3RvciIsImR1cmF0aW9uIiwiZHN0QW5nbGVYIiwiZHN0QW5nbGVZIiwiZHN0QW5nbGVaIiwiX3N0YXJ0UXVhdCIsIl9kc3RRdWF0IiwidW5kZWZpbmVkIiwiaW5pdFdpdGhEdXJhdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJkc3RRdWF0IiwiUXVhdCIsInNldCIsIlZlYzMiLCJ5IiwieiIsIngiLCJmcm9tRXVsZXIiLCJjbG9uZSIsImFjdGlvbiIsIl9jbG9uZURlY29yYXRpb24iLCJfZHVyYXRpb24iLCJzdGFydFdpdGhUYXJnZXQiLCJ0YXJnZXQiLCJyZXZlcnNlIiwibG9nSUQiLCJ1cGRhdGUiLCJkdCIsIl9jb21wdXRlRWFzZVRpbWUiLCJzbGVycCIsInNldFJvdGF0aW9uIiwicm90YXRlM0RUbyIsIlJvdGF0ZTNEQnkiLCJkZWx0YUFuZ2xlWCIsImRlbHRhQW5nbGVZIiwiZGVsdGFBbmdsZVoiLCJfZGVsdGFBbmdsZSIsIl9hbmdsZSIsInN0YXJ0QW5nbGUiLCJldWxlckFuZ2xlcyIsImRlbHRhQW5nbGUiLCJSQUQiLCJNYXRoIiwiUEkiLCJhbmdsZSIsIl9yZXZlcnNlRWFzZUxpc3QiLCJyb3RhdGUzREJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxFQUFoQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdGLEVBQUUsQ0FBQ0csRUFBSCxFQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FILEVBQUUsQ0FBQ0ksVUFBSCxHQUFn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Q0FBQ3NCLENBQVYsR0FBYyxDQUFDNkIsS0FBSyxDQUFDN0IsQ0FBckI7QUFDQSxRQUFJSSxNQUFNLEdBQUcsSUFBSTVCLEVBQUUsQ0FBQ3lDLFVBQVAsQ0FBa0IsS0FBS1gsU0FBdkIsRUFBa0M1QixTQUFsQyxDQUFiOztBQUNBLFNBQUsyQixnQkFBTCxDQUFzQkQsTUFBdEI7O0FBQ0EsU0FBSzBCLGdCQUFMLENBQXNCMUIsTUFBdEI7O0FBQ0EsV0FBT0EsTUFBUDtBQUNIO0FBMUVvQixDQUFULENBQWhCO0FBNkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTVCLEVBQUUsQ0FBQ3VELFVBQUgsR0FBZ0IsVUFBVTlDLFFBQVYsRUFBb0JpQyxXQUFwQixFQUFpQ0MsV0FBakMsRUFBOENDLFdBQTlDLEVBQTJEO0FBQ3ZFLFNBQU8sSUFBSTVDLEVBQUUsQ0FBQ3lDLFVBQVAsQ0FBa0JoQyxRQUFsQixFQUE0QmlDLFdBQTVCLEVBQXlDQyxXQUF6QyxFQUFzREMsV0FBdEQsQ0FBUDtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFF1YXQgZnJvbSAnLi4vdmFsdWUtdHlwZXMvcXVhdCc7XHJcbmltcG9ydCBWZWMzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5cclxubGV0IF9xdWF0X3RtcCA9IGNjLnF1YXQoKTtcclxubGV0IF92ZWMzX3RtcCA9IGNjLnYzKCk7XHJcblxyXG4vKlxyXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgdG8gYSBjZXJ0YWluIGFuZ2xlIGJ5IG1vZGlmeWluZyBpdHMgcXVhdGVybmlvbiBwcm9wZXJ0eS4gPGJyLz5cclxuICogVGhlIGRpcmVjdGlvbiB3aWxsIGJlIGRlY2lkZWQgYnkgdGhlIHNob3J0ZXN0IGFuZ2xlLlxyXG4gKiBAY2xhc3MgUm90YXRlM0RUb1xyXG4gKiBAZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbFxyXG4gKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb24gZHVyYXRpb24gaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0ge051bWJlcnxWZWMzfSBkc3RBbmdsZVggZHN0QW5nbGVYIGluIGRlZ3JlZXMuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVZXSBkc3RBbmdsZVkgaW4gZGVncmVlcy5cclxuICogQHBhcmFtIHtOdW1iZXJ9IFtkc3RBbmdsZVpdIGRzdEFuZ2xlWiBpbiBkZWdyZWVzLlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcm90YXRlM0RUbyA9IG5ldyBjYy5Sb3RhdGUzRFRvKDIsIGNjLnYzKDAsIDE4MCwgMCkpO1xyXG4gKi9cclxuY2MuUm90YXRlM0RUbyA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5Sb3RhdGUzRFRvJyxcclxuICAgIGV4dGVuZHM6IGNjLkFjdGlvbkludGVydmFsLFxyXG5cclxuICAgIGN0b3I6ZnVuY3Rpb24gKGR1cmF0aW9uLCBkc3RBbmdsZVgsIGRzdEFuZ2xlWSwgZHN0QW5nbGVaKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRRdWF0ID0gY2MucXVhdCgpO1xyXG4gICAgICAgIHRoaXMuX2RzdFF1YXQgPSBjYy5xdWF0KCk7XHJcblxyXG5cdFx0ZHN0QW5nbGVYICE9PSB1bmRlZmluZWQgJiYgdGhpcy5pbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uLCBkc3RBbmdsZVgsIGRzdEFuZ2xlWSwgZHN0QW5nbGVaKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqIEluaXRpYWxpemVzIHRoZSBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFZlYzN8UXVhdH0gZHN0QW5nbGVYXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHN0QW5nbGVZXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHN0QW5nbGVaXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpbml0V2l0aER1cmF0aW9uOmZ1bmN0aW9uIChkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWikge1xyXG4gICAgICAgIGlmIChjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuaW5pdFdpdGhEdXJhdGlvbi5jYWxsKHRoaXMsIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICBsZXQgZHN0UXVhdCA9IHRoaXMuX2RzdFF1YXQ7XHJcbiAgICAgICAgICAgIGlmIChkc3RBbmdsZVggaW5zdGFuY2VvZiBjYy5RdWF0KSB7XHJcbiAgICAgICAgICAgICAgICBkc3RRdWF0LnNldChkc3RBbmdsZVgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRzdEFuZ2xlWCBpbnN0YW5jZW9mIGNjLlZlYzMpIHtcclxuICAgICAgICAgICAgICAgICAgICBkc3RBbmdsZVkgPSBkc3RBbmdsZVgueTtcclxuICAgICAgICAgICAgICAgICAgICBkc3RBbmdsZVogPSBkc3RBbmdsZVguejtcclxuICAgICAgICAgICAgICAgICAgICBkc3RBbmdsZVggPSBkc3RBbmdsZVgueDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRzdEFuZ2xlWSA9IGRzdEFuZ2xlWSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRzdEFuZ2xlWiA9IGRzdEFuZ2xlWiB8fCAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgUXVhdC5mcm9tRXVsZXIoZHN0UXVhdCwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlM0RUbygpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9kc3RRdWF0KTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydFdpdGhUYXJnZXQ6ZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgICAgIGNjLkFjdGlvbkludGVydmFsLnByb3RvdHlwZS5zdGFydFdpdGhUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0UXVhdC5zZXQodGFyZ2V0LnF1YXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXZlcnNlOmZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5sb2dJRCgxMDE2KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uIChkdCkge1xyXG4gICAgICAgIGR0ID0gdGhpcy5fY29tcHV0ZUVhc2VUaW1lKGR0KTtcclxuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgUXVhdC5zbGVycChfcXVhdF90bXAsIHRoaXMuX3N0YXJ0UXVhdCwgdGhpcy5fZHN0UXVhdCwgZHQpO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zZXRSb3RhdGlvbihfcXVhdF90bXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgdG8gYSBjZXJ0YWluIGFuZ2xlIGJ5IG1vZGlmeWluZyBpdHMgcXV0ZXJuaW9uIHByb3BlcnR5LiA8YnIvPlxyXG4gKiBUaGUgZGlyZWN0aW9uIHdpbGwgYmUgZGVjaWRlZCBieSB0aGUgc2hvcnRlc3QgYW5nbGUuXHJcbiAqICEjemgg5peL6L2s5Yiw55uu5qCH6KeS5bqm77yM6YCa6L+H6YCQ5bin5L+u5pS55a6D55qEIHF1dGVybmlvbiDlsZ7mgKfvvIzml4vovazmlrnlkJHlsIbnlLHmnIDnn63nmoTop5LluqblhrPlrprjgIJcclxuICogQG1ldGhvZCByb3RhdGUzRFRvXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfFZlYzN8UXVhdH0gZHN0QW5nbGVYIGRzdEFuZ2xlWCBpbiBkZWdyZWVzLlxyXG4gKiBAcGFyYW0ge051bWJlcn0gW2RzdEFuZ2xlWV0gZHN0QW5nbGVZIGluIGRlZ3JlZXMuXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbZHN0QW5nbGVaXSBkc3RBbmdsZVogaW4gZGVncmVlcy5cclxuICogQHJldHVybiB7QWN0aW9uSW50ZXJ2YWx9XHJcbiAqIEBleGFtcGxlXHJcbiAqIC8vIGV4YW1wbGVcclxuICogdmFyIHJvdGF0ZTNEVG8gPSBjYy5yb3RhdGUzRFRvKDIsIGNjLnYzKDAsIDE4MCwgMCkpO1xyXG4gKi9cclxuY2Mucm90YXRlM0RUbyA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgZHN0QW5nbGVYLCBkc3RBbmdsZVksIGRzdEFuZ2xlWikge1xyXG4gICAgcmV0dXJuIG5ldyBjYy5Sb3RhdGUzRFRvKGR1cmF0aW9uLCBkc3RBbmdsZVgsIGRzdEFuZ2xlWSwgZHN0QW5nbGVaKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBSb3RhdGVzIGEgTm9kZSBvYmplY3QgY291bnRlciBjbG9ja3dpc2UgYSBudW1iZXIgb2YgZGVncmVlcyBieSBtb2RpZnlpbmcgaXRzIHF1YXRlcm5pb24gcHJvcGVydHkuXHJcbiAqIFJlbGF0aXZlIHRvIGl0cyBwcm9wZXJ0aWVzIHRvIG1vZGlmeS5cclxuICogQGNsYXNzIFJvdGF0ZTNEQnlcclxuICogQGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWxcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICogQHBhcmFtIHtOdW1iZXJ8VmVjM30gZGVsdGFBbmdsZVggZGVsdGFBbmdsZVggaW4gZGVncmVlc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVZXSBkZWx0YUFuZ2xlWSBpbiBkZWdyZWVzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFBbmdsZVpdIGRlbHRhQW5nbGVaIGluIGRlZ3JlZXNcclxuICogQGV4YW1wbGVcclxuICogdmFyIGFjdGlvbkJ5ID0gbmV3IGNjLlJvdGF0ZTNEQnkoMiwgY2MudjMoMCwgMzYwLCAwKSk7XHJcbiAqL1xyXG5jYy5Sb3RhdGUzREJ5ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlJvdGF0ZTNEQnknLFxyXG4gICAgZXh0ZW5kczogY2MuQWN0aW9uSW50ZXJ2YWwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YUFuZ2xlWCwgZGVsdGFBbmdsZVksIGRlbHRhQW5nbGVaKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRRdWF0ID0gY2MucXVhdCgpO1xyXG4gICAgICAgIHRoaXMuX2RzdFF1YXQgPSBjYy5xdWF0KCk7XHJcbiAgICAgICAgdGhpcy5fZGVsdGFBbmdsZSA9IGNjLnYzKCk7XHJcblx0XHRkZWx0YUFuZ2xlWCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaW5pdFdpdGhEdXJhdGlvbihkdXJhdGlvbiwgZGVsdGFBbmdsZVgsIGRlbHRhQW5nbGVZLCBkZWx0YUFuZ2xlWik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBJbml0aWFsaXplcyB0aGUgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uIGR1cmF0aW9uIGluIHNlY29uZHNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFZlYzN9IGRlbHRhQW5nbGVYIGRlbHRhQW5nbGVYIGluIGRlZ3JlZXNcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVsdGFBbmdsZVk9XSBkZWx0YUFuZ2xlWSBpbiBkZWdyZWVzXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVaPV0gZGVsdGFBbmdsZVogaW4gZGVncmVlc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEdXJhdGlvbjpmdW5jdGlvbiAoZHVyYXRpb24sIGRlbHRhQW5nbGVYLCBkZWx0YUFuZ2xlWSwgZGVsdGFBbmdsZVopIHtcclxuICAgICAgICBpZiAoY2MuQWN0aW9uSW50ZXJ2YWwucHJvdG90eXBlLmluaXRXaXRoRHVyYXRpb24uY2FsbCh0aGlzLCBkdXJhdGlvbikpIHtcclxuICAgICAgICAgICAgaWYgKGRlbHRhQW5nbGVYIGluc3RhbmNlb2YgY2MuVmVjMykge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVkgPSBkZWx0YUFuZ2xlWC55O1xyXG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVogPSBkZWx0YUFuZ2xlWC56O1xyXG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVggPSBkZWx0YUFuZ2xlWC54O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVkgPSBkZWx0YUFuZ2xlWSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgZGVsdGFBbmdsZVogPSBkZWx0YUFuZ2xlWiB8fCAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBWZWMzLnNldCh0aGlzLl9kZWx0YUFuZ2xlLCBkZWx0YUFuZ2xlWCwgZGVsdGFBbmdsZVksIGRlbHRhQW5nbGVaKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvbmU6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlM0RCeSgpO1xyXG4gICAgICAgIHRoaXMuX2Nsb25lRGVjb3JhdGlvbihhY3Rpb24pO1xyXG4gICAgICAgIGFjdGlvbi5pbml0V2l0aER1cmF0aW9uKHRoaXMuX2R1cmF0aW9uLCB0aGlzLl9hbmdsZSk7XHJcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0OmZ1bmN0aW9uICh0YXJnZXQpIHtcclxuICAgICAgICBjYy5BY3Rpb25JbnRlcnZhbC5wcm90b3R5cGUuc3RhcnRXaXRoVGFyZ2V0LmNhbGwodGhpcywgdGFyZ2V0KTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3RhcnRBbmdsZSA9IHRhcmdldC5ldWxlckFuZ2xlcztcclxuICAgICAgICBsZXQgZGVsdGFBbmdsZSA9IHRoaXMuX2RlbHRhQW5nbGU7XHJcbiAgICAgICAgUXVhdC5mcm9tRXVsZXIodGhpcy5fZHN0UXVhdCwgc3RhcnRBbmdsZS54ICsgZGVsdGFBbmdsZS54LCBzdGFydEFuZ2xlLnkgKyBkZWx0YUFuZ2xlLnksIHN0YXJ0QW5nbGUueiArIGRlbHRhQW5nbGUueik7XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXJ0UXVhdC5zZXQodGFyZ2V0LnF1YXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBSQUQgPSBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgICAgICAgZHQgPSB0aGlzLl9jb21wdXRlRWFzZVRpbWUoZHQpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIFF1YXQuc2xlcnAoX3F1YXRfdG1wLCB0aGlzLl9zdGFydFF1YXQsIHRoaXMuX2RzdFF1YXQsIGR0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNldFJvdGF0aW9uKF9xdWF0X3RtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpLFxyXG5cclxuICAgIHJldmVyc2U6ZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuX2FuZ2xlO1xyXG4gICAgICAgIF92ZWMzX3RtcC54ID0gLWFuZ2xlLng7XHJcbiAgICAgICAgX3ZlYzNfdG1wLnkgPSAtYW5nbGUueTtcclxuICAgICAgICBfdmVjM190bXAueiA9IC1hbmdsZS56O1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBuZXcgY2MuUm90YXRlM0RCeSh0aGlzLl9kdXJhdGlvbiwgX3ZlYzNfdG1wKTtcclxuICAgICAgICB0aGlzLl9jbG9uZURlY29yYXRpb24oYWN0aW9uKTtcclxuICAgICAgICB0aGlzLl9yZXZlcnNlRWFzZUxpc3QoYWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gYWN0aW9uO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFJvdGF0ZXMgYSBOb2RlIG9iamVjdCBjb3VudGVyIGNsb2Nrd2lzZSBhIG51bWJlciBvZiBkZWdyZWVzIGJ5IG1vZGlmeWluZyBpdHMgcXVhdGVybmlvbiBwcm9wZXJ0eS5cclxuICogUmVsYXRpdmUgdG8gaXRzIHByb3BlcnRpZXMgdG8gbW9kaWZ5LlxyXG4gKiAhI3poIOaXi+i9rOaMh+WumueahCAzRCDop5LluqbjgIJcclxuICogQG1ldGhvZCByb3RhdGUzREJ5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBkdXJhdGlvbiBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfFZlYzN9IGRlbHRhQW5nbGVYIGRlbHRhQW5nbGVYIGluIGRlZ3JlZXNcclxuICogQHBhcmFtIHtOdW1iZXJ9IFtkZWx0YUFuZ2xlWV0gZGVsdGFBbmdsZVkgaW4gZGVncmVlc1xyXG4gKiBAcGFyYW0ge051bWJlcn0gW2RlbHRhQW5nbGVaXSBkZWx0YUFuZ2xlWiBpbiBkZWdyZWVzXHJcbiAqIEByZXR1cm4ge0FjdGlvbkludGVydmFsfVxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBleGFtcGxlXHJcbiAqIHZhciBhY3Rpb25CeSA9IGNjLnJvdGF0ZTNEQnkoMiwgY2MudjMoMCwgMzYwLCAwKSk7XHJcbiAqL1xyXG5jYy5yb3RhdGUzREJ5ID0gZnVuY3Rpb24gKGR1cmF0aW9uLCBkZWx0YUFuZ2xlWCwgZGVsdGFBbmdsZVksIGRlbHRhQW5nbGVaKSB7XHJcbiAgICByZXR1cm4gbmV3IGNjLlJvdGF0ZTNEQnkoZHVyYXRpb24sIGRlbHRhQW5nbGVYLCBkZWx0YUFuZ2xlWSwgZGVsdGFBbmdsZVopO1xyXG59O1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=