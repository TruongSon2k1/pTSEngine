
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/view.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../core/value-types");

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var _m4_tmp = new _valueTypes.Mat4();

var _genID = 0;
/**
 * A representation of a single camera view
 */

var View = /*#__PURE__*/function () {
  /**
   * Setup a default view
   */
  function View() {
    this._id = _genID++; // priority. the smaller one will be rendered first

    this._priority = 0; // viewport

    this._rect = {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    }; // TODO:
    // this._scissor = {
    //   x: 0, y: 0, w: 1, h: 1
    // };
    // clear options

    this._color = new _valueTypes.Vec4(0.3, 0.3, 0.3, 1);
    this._depth = 1;
    this._stencil = 0;
    this._clearFlags = _enums["default"].CLEAR_COLOR | _enums["default"].CLEAR_DEPTH;
    this._clearModel = null; // matrix

    this._matView = cc.mat4();
    this._matViewInv = cc.mat4();
    this._matProj = cc.mat4();
    this._matViewProj = cc.mat4();
    this._matInvViewProj = cc.mat4(); // stages & framebuffer

    this._stages = [];
    this._cullingByID = false;
    this._framebuffer = null;
    this._shadowLight = null; // TODO: should not refer light in view.

    this._cullingMask = 0xffffffff;
  }
  /**
   * Get the view's forward direction
   * @param {Vec3} out the receiving vector
   * @returns {Vec3} the receiving vector
   */


  var _proto = View.prototype;

  _proto.getForward = function getForward(out) {
    var m = this._matView.m;
    return _valueTypes.Vec3.set(out, -m[2], -m[6], -m[10]);
  }
  /**
   * Get the view's observing location
   * @param {Vec3} out the receiving vector
   * @returns {Vec3} the receiving vector
   */
  ;

  _proto.getPosition = function getPosition(out) {
    _valueTypes.Mat4.invert(_m4_tmp, this._matView);

    return _valueTypes.Mat4.getTranslation(out, _m4_tmp);
  };

  return View;
}();

exports["default"] = View;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxjb3JlXFx2aWV3LmpzIl0sIm5hbWVzIjpbIl9tNF90bXAiLCJNYXQ0IiwiX2dlbklEIiwiVmlldyIsIl9pZCIsIl9wcmlvcml0eSIsIl9yZWN0IiwieCIsInkiLCJ3IiwiaCIsIl9jb2xvciIsIlZlYzQiLCJfZGVwdGgiLCJfc3RlbmNpbCIsIl9jbGVhckZsYWdzIiwiZW51bXMiLCJDTEVBUl9DT0xPUiIsIkNMRUFSX0RFUFRIIiwiX2NsZWFyTW9kZWwiLCJfbWF0VmlldyIsImNjIiwibWF0NCIsIl9tYXRWaWV3SW52IiwiX21hdFByb2oiLCJfbWF0Vmlld1Byb2oiLCJfbWF0SW52Vmlld1Byb2oiLCJfc3RhZ2VzIiwiX2N1bGxpbmdCeUlEIiwiX2ZyYW1lYnVmZmVyIiwiX3NoYWRvd0xpZ2h0IiwiX2N1bGxpbmdNYXNrIiwiZ2V0Rm9yd2FyZCIsIm91dCIsIm0iLCJWZWMzIiwic2V0IiwiZ2V0UG9zaXRpb24iLCJpbnZlcnQiLCJnZXRUcmFuc2xhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOzs7O0FBSEE7QUFLQSxJQUFJQSxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosRUFBZDs7QUFDQSxJQUFJQyxNQUFNLEdBQUcsQ0FBYjtBQUVBO0FBQ0E7QUFDQTs7SUFDcUJDO0FBQ25CO0FBQ0Y7QUFDQTtBQUNFLGtCQUFjO0FBQ1osU0FBS0MsR0FBTCxHQUFXRixNQUFNLEVBQWpCLENBRFksQ0FHWjs7QUFDQSxTQUFLRyxTQUFMLEdBQWlCLENBQWpCLENBSlksQ0FNWjs7QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFDWEMsTUFBQUEsQ0FBQyxFQUFFLENBRFE7QUFDTEMsTUFBQUEsQ0FBQyxFQUFFLENBREU7QUFDQ0MsTUFBQUEsQ0FBQyxFQUFFLENBREo7QUFDT0MsTUFBQUEsQ0FBQyxFQUFFO0FBRFYsS0FBYixDQVBZLENBV1o7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMsZ0JBQUosQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixDQUF4QixDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkMsa0JBQU1DLFdBQU4sR0FBb0JELGtCQUFNRSxXQUE3QztBQUNBLFNBQUtDLFdBQUwsR0FBbUIsSUFBbkIsQ0FyQlksQ0F1Qlo7O0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkMsRUFBRSxDQUFDQyxJQUFILEVBQWhCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkYsRUFBRSxDQUFDQyxJQUFILEVBQW5CO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQkgsRUFBRSxDQUFDQyxJQUFILEVBQWhCO0FBQ0EsU0FBS0csWUFBTCxHQUFvQkosRUFBRSxDQUFDQyxJQUFILEVBQXBCO0FBQ0EsU0FBS0ksZUFBTCxHQUF1QkwsRUFBRSxDQUFDQyxJQUFILEVBQXZCLENBNUJZLENBOEJaOztBQUNBLFNBQUtLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFFQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCLENBbkNZLENBbUNjOztBQUUxQixTQUFLQyxZQUFMLEdBQW9CLFVBQXBCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNFQyxhQUFBLG9CQUFXQyxHQUFYLEVBQWdCO0FBQ2QsUUFBSUMsQ0FBQyxHQUFHLEtBQUtkLFFBQUwsQ0FBY2MsQ0FBdEI7QUFDQSxXQUFPQyxpQkFBS0MsR0FBTCxDQUNMSCxHQURLLEVBRUwsQ0FBQ0MsQ0FBQyxDQUFDLENBQUQsQ0FGRyxFQUdMLENBQUNBLENBQUMsQ0FBQyxDQUFELENBSEcsRUFJTCxDQUFDQSxDQUFDLENBQUMsRUFBRCxDQUpHLENBQVA7QUFNRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7OztTQUNFRyxjQUFBLHFCQUFZSixHQUFaLEVBQWlCO0FBQ2ZoQyxxQkFBS3FDLE1BQUwsQ0FBWXRDLE9BQVosRUFBcUIsS0FBS29CLFFBQTFCOztBQUNBLFdBQU9uQixpQkFBS3NDLGNBQUwsQ0FBb0JOLEdBQXBCLEVBQXlCakMsT0FBekIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG5pbXBvcnQgeyBWZWMzLCBNYXQ0LCBWZWM0IH0gZnJvbSAnLi4vLi4vY29yZS92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCBlbnVtcyBmcm9tICcuLi9lbnVtcyc7XHJcblxyXG5sZXQgX200X3RtcCA9IG5ldyBNYXQ0KCk7XHJcbmxldCBfZ2VuSUQgPSAwO1xyXG5cclxuLyoqXHJcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgY2FtZXJhIHZpZXdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xyXG4gIC8qKlxyXG4gICAqIFNldHVwIGEgZGVmYXVsdCB2aWV3XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9pZCA9IF9nZW5JRCsrO1xyXG5cclxuICAgIC8vIHByaW9yaXR5LiB0aGUgc21hbGxlciBvbmUgd2lsbCBiZSByZW5kZXJlZCBmaXJzdFxyXG4gICAgdGhpcy5fcHJpb3JpdHkgPSAwO1xyXG5cclxuICAgIC8vIHZpZXdwb3J0XHJcbiAgICB0aGlzLl9yZWN0ID0ge1xyXG4gICAgICB4OiAwLCB5OiAwLCB3OiAxLCBoOiAxXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRPRE86XHJcbiAgICAvLyB0aGlzLl9zY2lzc29yID0ge1xyXG4gICAgLy8gICB4OiAwLCB5OiAwLCB3OiAxLCBoOiAxXHJcbiAgICAvLyB9O1xyXG5cclxuICAgIC8vIGNsZWFyIG9wdGlvbnNcclxuICAgIHRoaXMuX2NvbG9yID0gbmV3IFZlYzQoMC4zLCAwLjMsIDAuMywgMSk7XHJcbiAgICB0aGlzLl9kZXB0aCA9IDE7XHJcbiAgICB0aGlzLl9zdGVuY2lsID0gMDtcclxuICAgIHRoaXMuX2NsZWFyRmxhZ3MgPSBlbnVtcy5DTEVBUl9DT0xPUiB8IGVudW1zLkNMRUFSX0RFUFRIO1xyXG4gICAgdGhpcy5fY2xlYXJNb2RlbCA9IG51bGw7XHJcblxyXG4gICAgLy8gbWF0cml4XHJcbiAgICB0aGlzLl9tYXRWaWV3ID0gY2MubWF0NCgpO1xyXG4gICAgdGhpcy5fbWF0Vmlld0ludiA9IGNjLm1hdDQoKTtcclxuICAgIHRoaXMuX21hdFByb2ogPSBjYy5tYXQ0KCk7XHJcbiAgICB0aGlzLl9tYXRWaWV3UHJvaiA9IGNjLm1hdDQoKTtcclxuICAgIHRoaXMuX21hdEludlZpZXdQcm9qID0gY2MubWF0NCgpO1xyXG5cclxuICAgIC8vIHN0YWdlcyAmIGZyYW1lYnVmZmVyXHJcbiAgICB0aGlzLl9zdGFnZXMgPSBbXTtcclxuICAgIHRoaXMuX2N1bGxpbmdCeUlEID0gZmFsc2U7XHJcbiAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5fc2hhZG93TGlnaHQgPSBudWxsOyAvLyBUT0RPOiBzaG91bGQgbm90IHJlZmVyIGxpZ2h0IGluIHZpZXcuXHJcblxyXG4gICAgdGhpcy5fY3VsbGluZ01hc2sgPSAweGZmZmZmZmZmO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2aWV3J3MgZm9yd2FyZCBkaXJlY3Rpb25cclxuICAgKiBAcGFyYW0ge1ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gICAqIEByZXR1cm5zIHtWZWMzfSB0aGUgcmVjZWl2aW5nIHZlY3RvclxyXG4gICAqL1xyXG4gIGdldEZvcndhcmQob3V0KSB7XHJcbiAgICBsZXQgbSA9IHRoaXMuX21hdFZpZXcubTtcclxuICAgIHJldHVybiBWZWMzLnNldChcclxuICAgICAgb3V0LFxyXG4gICAgICAtbVsyXSxcclxuICAgICAgLW1bNl0sXHJcbiAgICAgIC1tWzEwXVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgdmlldydzIG9ic2VydmluZyBsb2NhdGlvblxyXG4gICAqIEBwYXJhbSB7VmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAgICogQHJldHVybnMge1ZlYzN9IHRoZSByZWNlaXZpbmcgdmVjdG9yXHJcbiAgICovXHJcbiAgZ2V0UG9zaXRpb24ob3V0KSB7XHJcbiAgICBNYXQ0LmludmVydChfbTRfdG1wLCB0aGlzLl9tYXRWaWV3KTtcclxuICAgIHJldHVybiBNYXQ0LmdldFRyYW5zbGF0aW9uKG91dCwgX200X3RtcCk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9