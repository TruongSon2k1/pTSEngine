
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/camera.js';
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

var _geomUtils = require("../../core/geom-utils");

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _tmp_mat4 = new _valueTypes.Mat4();

var _matView = new _valueTypes.Mat4();

var _matViewInv = new _valueTypes.Mat4();

var _matProj = new _valueTypes.Mat4();

var _matViewProj = new _valueTypes.Mat4();

var _matInvViewProj = new _valueTypes.Mat4();

var _tmp_v3 = new _valueTypes.Vec3();

var _tmp2_v3 = new _valueTypes.Vec3();
/**
 * A representation of a camera instance
 */


var Camera = /*#__PURE__*/function () {
  function Camera() {
    this._poolID = -1;
    this._node = null;
    this._projection = _enums["default"].PROJ_PERSPECTIVE;
    this._priority = 0;
    this._color = new _valueTypes.Vec4(0.2, 0.3, 0.47, 1);
    this._depth = 1;
    this._stencil = 0;
    this._clearFlags = _enums["default"].CLEAR_COLOR | _enums["default"].CLEAR_DEPTH;
    this._clearModel = null;
    this._stages = [];
    this._framebuffer = null;
    this._near = 0.01;
    this._far = 1000.0;
    this._fov = Math.PI / 4.0;
    this._rect = {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    };
    this._orthoHeight = 10;
    this._cullingMask = 0xffffffff;
  }

  var _proto = Camera.prototype;

  _proto.setCullingMask = function setCullingMask(mask) {
    this._cullingMask = mask;
  }
  /**
   * Get the hosting node of this camera
   * @returns {Node} the hosting node
   */
  ;

  _proto.getNode = function getNode() {
    return this._node;
  }
  /**
   * Set the hosting node of this camera
   * @param {Node} node the hosting node
   */
  ;

  _proto.setNode = function setNode(node) {
    this._node = node;
  }
  /**
   * Get the projection type of the camera
   * @returns {number} camera projection type
   */
  ;

  _proto.getType = function getType() {
    return this._projection;
  }
  /**
   * Set the projection type of the camera
   * @param {number} type camera projection type
   */
  ;

  _proto.setType = function setType(type) {
    this._projection = type;
  }
  /**
   * Get the priority of the camera
   * @returns {number} camera priority
   */
  ;

  _proto.getPriority = function getPriority() {
    return this._priority;
  }
  /**
   * Set the priority of the camera
   * @param {number} priority camera priority
   */
  ;

  _proto.setPriority = function setPriority(priority) {
    this._priority = priority;
  }
  /**
   * Get the orthogonal height of the camera
   * @returns {number} camera height
   */
  ;

  _proto.getOrthoHeight = function getOrthoHeight() {
    return this._orthoHeight;
  }
  /**
   * Set the orthogonal height of the camera
   * @param {number} val camera height
   */
  ;

  _proto.setOrthoHeight = function setOrthoHeight(val) {
    this._orthoHeight = val;
  }
  /**
   * Get the field of view of the camera
   * @returns {number} camera field of view
   */
  ;

  _proto.getFov = function getFov() {
    return this._fov;
  }
  /**
   * Set the field of view of the camera
   * @param {number} fov camera field of view
   */
  ;

  _proto.setFov = function setFov(fov) {
    this._fov = fov;
  }
  /**
   * Get the near clipping distance of the camera
   * @returns {number} camera near clipping distance
   */
  ;

  _proto.getNear = function getNear() {
    return this._near;
  }
  /**
   * Set the near clipping distance of the camera
   * @param {number} near camera near clipping distance
   */
  ;

  _proto.setNear = function setNear(near) {
    this._near = near;
  }
  /**
   * Get the far clipping distance of the camera
   * @returns {number} camera far clipping distance
   */
  ;

  _proto.getFar = function getFar() {
    return this._far;
  }
  /**
   * Set the far clipping distance of the camera
   * @param {number} far camera far clipping distance
   */
  ;

  _proto.setFar = function setFar(far) {
    this._far = far;
  }
  /**
   * Get the clear color of the camera
   * @returns {Vec4} out the receiving color vector
   */
  ;

  _proto.getColor = function getColor(out) {
    return _valueTypes.Vec4.copy(out, this._color);
  }
  /**
   * Set the clear color of the camera
   * @param {number} r red channel of camera clear color
   * @param {number} g green channel of camera clear color
   * @param {number} b blue channel of camera clear color
   * @param {number} a alpha channel of camera clear color
   */
  ;

  _proto.setColor = function setColor(r, g, b, a) {
    _valueTypes.Vec4.set(this._color, r, g, b, a);
  }
  /**
   * Get the clear depth of the camera
   * @returns {number} camera clear depth
   */
  ;

  _proto.getDepth = function getDepth() {
    return this._depth;
  }
  /**
   * Set the clear depth of the camera
   * @param {number} depth camera clear depth
   */
  ;

  _proto.setDepth = function setDepth(depth) {
    this._depth = depth;
  }
  /**
   * Get the clearing stencil value of the camera
   * @returns {number} camera clearing stencil value
   */
  ;

  _proto.getStencil = function getStencil() {
    return this._stencil;
  }
  /**
   * Set the clearing stencil value of the camera
   * @param {number} stencil camera clearing stencil value
   */
  ;

  _proto.setStencil = function setStencil(stencil) {
    this._stencil = stencil;
  }
  /**
   * Get the clearing flags of the camera
   * @returns {number} camera clearing flags
   */
  ;

  _proto.getClearFlags = function getClearFlags() {
    return this._clearFlags;
  }
  /**
   * Set the clearing flags of the camera
   * @param {number} flags camera clearing flags
   */
  ;

  _proto.setClearFlags = function setClearFlags(flags) {
    this._clearFlags = flags;
  }
  /**
   * Get the rect of the camera
   * @param {Object} out the receiving object
   * @returns {Object} camera rect
   */
  ;

  _proto.getRect = function getRect(out) {
    out.x = this._rect.x;
    out.y = this._rect.y;
    out.w = this._rect.w;
    out.h = this._rect.h;
    return out;
  }
  /**
   * Set the rect of the camera
   * @param {Number} x - [0,1]
   * @param {Number} y - [0,1]
   * @param {Number} w - [0,1]
   * @param {Number} h - [0,1]
   */
  ;

  _proto.setRect = function setRect(x, y, w, h) {
    this._rect.x = x;
    this._rect.y = y;
    this._rect.w = w;
    this._rect.h = h;
  }
  /**
   * Get the stages of the camera
   * @returns {string[]} camera stages
   */
  ;

  _proto.getStages = function getStages() {
    return this._stages;
  }
  /**
   * Set the stages of the camera
   * @param {string[]} stages camera stages
   */
  ;

  _proto.setStages = function setStages(stages) {
    this._stages = stages;
  }
  /**
   * Get the framebuffer of the camera
   * @returns {FrameBuffer} camera framebuffer
   */
  ;

  _proto.getFramebuffer = function getFramebuffer() {
    return this._framebuffer;
  }
  /**
   * Set the framebuffer of the camera
   * @param {FrameBuffer} framebuffer camera framebuffer
   */
  ;

  _proto.setFrameBuffer = function setFrameBuffer(framebuffer) {
    this._framebuffer = framebuffer;
  };

  _proto._calcMatrices = function _calcMatrices(width, height) {
    // view matrix
    this._node.getWorldRT(_matViewInv);

    _valueTypes.Mat4.invert(_matView, _matViewInv); // projection matrix


    var aspect = width / height;

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      _valueTypes.Mat4.perspective(_matProj, this._fov, aspect, this._near, this._far);
    } else {
      var x = this._orthoHeight * aspect;
      var y = this._orthoHeight;

      _valueTypes.Mat4.ortho(_matProj, -x, x, -y, y, this._near, this._far);
    } // view-projection


    _valueTypes.Mat4.mul(_matViewProj, _matProj, _matView); // inv view-projection


    _valueTypes.Mat4.invert(_matInvViewProj, _matViewProj);
  }
  /**
   * extract a view of this camera
   * @param {View} out the receiving view
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   */
  ;

  _proto.extractView = function extractView(out, width, height) {
    if (this._framebuffer) {
      width = this._framebuffer._width;
      height = this._framebuffer._height;
    } // priority


    out._priority = this._priority; // rect

    out._rect.x = this._rect.x * width;
    out._rect.y = this._rect.y * height;
    out._rect.w = this._rect.w * width;
    out._rect.h = this._rect.h * height; // clear opts

    this.getColor(out._color);
    out._depth = this._depth;
    out._stencil = this._stencil;
    out._clearFlags = this._clearFlags;
    out._clearModel = this._clearModel; // stages & framebuffer

    out._stages = this._stages;
    out._framebuffer = this._framebuffer;

    this._calcMatrices(width, height);

    _valueTypes.Mat4.copy(out._matView, _matView);

    _valueTypes.Mat4.copy(out._matViewInv, _matViewInv);

    _valueTypes.Mat4.copy(out._matProj, _matProj);

    _valueTypes.Mat4.copy(out._matViewProj, _matViewProj);

    _valueTypes.Mat4.copy(out._matInvViewProj, _matInvViewProj);

    out._cullingMask = this._cullingMask;
  }
  /**
   * transform a screen position to a world space ray
   * @param {number} x the screen x position to be transformed
   * @param {number} y the screen y position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @param {Ray} out the resulting ray
   * @returns {Ray} the resulting ray
   */
  ;

  _proto.screenPointToRay = function screenPointToRay(x, y, width, height, out) {
    if (!cc.geomUtils) return out;
    out = out || new _geomUtils.Ray();

    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height; // far plane intersection

    _valueTypes.Vec3.set(_tmp2_v3, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, 1);

    _valueTypes.Vec3.transformMat4(_tmp2_v3, _tmp2_v3, _matInvViewProj);

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      // camera origin
      this._node.getWorldPosition(_tmp_v3);
    } else {
      // near plane intersection
      _valueTypes.Vec3.set(_tmp_v3, (x - cx) / cw * 2 - 1, (y - cy) / ch * 2 - 1, -1);

      _valueTypes.Vec3.transformMat4(_tmp_v3, _tmp_v3, _matInvViewProj);
    }

    return _geomUtils.Ray.fromPoints(out, _tmp_v3, _tmp2_v3);
  }
  /**
   * transform a screen position to world space
   * @param {Vec3} out the resulting vector
   * @param {Vec3} screenPos the screen position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Vec3} the resulting vector
   */
  ;

  _proto.screenToWorld = function screenToWorld(out, screenPos, width, height) {
    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height;

    if (this._projection === _enums["default"].PROJ_PERSPECTIVE) {
      // calculate screen pos in far clip plane
      _valueTypes.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, 0.9999); // transform to world


      _valueTypes.Vec3.transformMat4(out, out, _matInvViewProj); // lerp to depth z


      this._node.getWorldPosition(_tmp_v3);

      _valueTypes.Vec3.lerp(out, _tmp_v3, out, (0, _valueTypes.lerp)(this._near / this._far, 1, screenPos.z));
    } else {
      _valueTypes.Vec3.set(out, (screenPos.x - cx) / cw * 2 - 1, (screenPos.y - cy) / ch * 2 - 1, screenPos.z * 2 - 1); // transform to world


      _valueTypes.Vec3.transformMat4(out, out, _matInvViewProj);
    }

    return out;
  }
  /**
   * transform a world space position to screen space
   * @param {Vec3} out the resulting vector
   * @param {Vec3} worldPos the world space position to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Vec3} the resulting vector
   */
  ;

  _proto.worldToScreen = function worldToScreen(out, worldPos, width, height) {
    this._calcMatrices(width, height);

    var cx = this._rect.x * width;
    var cy = this._rect.y * height;
    var cw = this._rect.w * width;
    var ch = this._rect.h * height;

    _valueTypes.Vec3.transformMat4(out, worldPos, _matViewProj);

    out.x = cx + (out.x + 1) * 0.5 * cw;
    out.y = cy + (out.y + 1) * 0.5 * ch;
    out.z = out.z * 0.5 + 0.5;
    return out;
  }
  /**
   * transform a world space matrix to screen space
   * @param {Mat4} out the resulting vector
   * @param {Mat4} worldMatrix the world space matrix to be transformed
   * @param {number} width framebuffer width
   * @param {number} height framebuffer height
   * @returns {Mat4} the resulting vector
   */
  ;

  _proto.worldMatrixToScreen = function worldMatrixToScreen(out, worldMatrix, width, height) {
    this._calcMatrices(width, height);

    _valueTypes.Mat4.mul(out, _matViewProj, worldMatrix);

    var halfWidth = width / 2;
    var halfHeight = height / 2;

    _valueTypes.Mat4.identity(_tmp_mat4);

    _valueTypes.Mat4.transform(_tmp_mat4, _tmp_mat4, _valueTypes.Vec3.set(_tmp_v3, halfWidth, halfHeight, 0));

    _valueTypes.Mat4.scale(_tmp_mat4, _tmp_mat4, _valueTypes.Vec3.set(_tmp_v3, halfWidth, halfHeight, 1));

    _valueTypes.Mat4.mul(out, _tmp_mat4, out);

    return out;
  };

  _createClass(Camera, [{
    key: "cullingMask",
    get: // culling mask
    function get() {
      return this._cullingMask;
    },
    set: function set(mask) {
      this._cullingMask = mask;
    }
  }]);

  return Camera;
}();

exports["default"] = Camera;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxzY2VuZVxcY2FtZXJhLmpzIl0sIm5hbWVzIjpbIl90bXBfbWF0NCIsIk1hdDQiLCJfbWF0VmlldyIsIl9tYXRWaWV3SW52IiwiX21hdFByb2oiLCJfbWF0Vmlld1Byb2oiLCJfbWF0SW52Vmlld1Byb2oiLCJfdG1wX3YzIiwiVmVjMyIsIl90bXAyX3YzIiwiQ2FtZXJhIiwiX3Bvb2xJRCIsIl9ub2RlIiwiX3Byb2plY3Rpb24iLCJlbnVtcyIsIlBST0pfUEVSU1BFQ1RJVkUiLCJfcHJpb3JpdHkiLCJfY29sb3IiLCJWZWM0IiwiX2RlcHRoIiwiX3N0ZW5jaWwiLCJfY2xlYXJGbGFncyIsIkNMRUFSX0NPTE9SIiwiQ0xFQVJfREVQVEgiLCJfY2xlYXJNb2RlbCIsIl9zdGFnZXMiLCJfZnJhbWVidWZmZXIiLCJfbmVhciIsIl9mYXIiLCJfZm92IiwiTWF0aCIsIlBJIiwiX3JlY3QiLCJ4IiwieSIsInciLCJoIiwiX29ydGhvSGVpZ2h0IiwiX2N1bGxpbmdNYXNrIiwic2V0Q3VsbGluZ01hc2siLCJtYXNrIiwiZ2V0Tm9kZSIsInNldE5vZGUiLCJub2RlIiwiZ2V0VHlwZSIsInNldFR5cGUiLCJ0eXBlIiwiZ2V0UHJpb3JpdHkiLCJzZXRQcmlvcml0eSIsInByaW9yaXR5IiwiZ2V0T3J0aG9IZWlnaHQiLCJzZXRPcnRob0hlaWdodCIsInZhbCIsImdldEZvdiIsInNldEZvdiIsImZvdiIsImdldE5lYXIiLCJzZXROZWFyIiwibmVhciIsImdldEZhciIsInNldEZhciIsImZhciIsImdldENvbG9yIiwib3V0IiwiY29weSIsInNldENvbG9yIiwiciIsImciLCJiIiwiYSIsInNldCIsImdldERlcHRoIiwic2V0RGVwdGgiLCJkZXB0aCIsImdldFN0ZW5jaWwiLCJzZXRTdGVuY2lsIiwic3RlbmNpbCIsImdldENsZWFyRmxhZ3MiLCJzZXRDbGVhckZsYWdzIiwiZmxhZ3MiLCJnZXRSZWN0Iiwic2V0UmVjdCIsImdldFN0YWdlcyIsInNldFN0YWdlcyIsInN0YWdlcyIsImdldEZyYW1lYnVmZmVyIiwic2V0RnJhbWVCdWZmZXIiLCJmcmFtZWJ1ZmZlciIsIl9jYWxjTWF0cmljZXMiLCJ3aWR0aCIsImhlaWdodCIsImdldFdvcmxkUlQiLCJpbnZlcnQiLCJhc3BlY3QiLCJwZXJzcGVjdGl2ZSIsIm9ydGhvIiwibXVsIiwiZXh0cmFjdFZpZXciLCJfd2lkdGgiLCJfaGVpZ2h0Iiwic2NyZWVuUG9pbnRUb1JheSIsImNjIiwiZ2VvbVV0aWxzIiwiUmF5IiwiY3giLCJjeSIsImN3IiwiY2giLCJ0cmFuc2Zvcm1NYXQ0IiwiZ2V0V29ybGRQb3NpdGlvbiIsImZyb21Qb2ludHMiLCJzY3JlZW5Ub1dvcmxkIiwic2NyZWVuUG9zIiwibGVycCIsInoiLCJ3b3JsZFRvU2NyZWVuIiwid29ybGRQb3MiLCJ3b3JsZE1hdHJpeFRvU2NyZWVuIiwid29ybGRNYXRyaXgiLCJoYWxmV2lkdGgiLCJoYWxmSGVpZ2h0IiwiaWRlbnRpdHkiLCJ0cmFuc2Zvcm0iLCJzY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQUlBLFNBQVMsR0FBRyxJQUFJQyxnQkFBSixFQUFoQjs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsSUFBSUQsZ0JBQUosRUFBZjs7QUFDQSxJQUFJRSxXQUFXLEdBQUcsSUFBSUYsZ0JBQUosRUFBbEI7O0FBQ0EsSUFBSUcsUUFBUSxHQUFHLElBQUlILGdCQUFKLEVBQWY7O0FBQ0EsSUFBSUksWUFBWSxHQUFHLElBQUlKLGdCQUFKLEVBQW5COztBQUNBLElBQUlLLGVBQWUsR0FBRyxJQUFJTCxnQkFBSixFQUF0Qjs7QUFDQSxJQUFJTSxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosRUFBZDs7QUFDQSxJQUFJQyxRQUFRLEdBQUcsSUFBSUQsZ0JBQUosRUFBZjtBQUVBO0FBQ0E7QUFDQTs7O0lBQ3FCRTs7U0FDbkJDLFVBQVUsQ0FBQztTQUNYQyxRQUFRO1NBQ1JD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U0FBbEIsRUFBNkJDLFVBQTdCLEVBQXlDLENBQXpDLENBQWpDOztBQUVBdkgscUJBQUsrRixHQUFMLENBQVNqQyxHQUFULEVBQWMvRCxTQUFkLEVBQXlCK0QsR0FBekI7O0FBRUEsV0FBT0EsR0FBUDtBQUNEOzs7O1NBamNEO0FBQ0EsbUJBQW1CO0FBQ2pCLGFBQU8sS0FBS3pCLFlBQVo7QUFDRDtTQUVELGFBQWlCRSxJQUFqQixFQUF1QjtBQUNyQixXQUFLRixZQUFMLEdBQW9CRSxJQUFwQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG5pbXBvcnQgeyBWZWMzLCBNYXQ0LCBsZXJwLCBWZWM0IH0gZnJvbSAnLi4vLi4vY29yZS92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCB7IFJheSB9IGZyb20gJy4uLy4uL2NvcmUvZ2VvbS11dGlscyc7XHJcbmltcG9ydCBlbnVtcyBmcm9tICcuLi9lbnVtcyc7XHJcblxyXG5sZXQgX3RtcF9tYXQ0ID0gbmV3IE1hdDQoKTtcclxuXHJcbmxldCBfbWF0VmlldyA9IG5ldyBNYXQ0KCk7XHJcbmxldCBfbWF0Vmlld0ludiA9IG5ldyBNYXQ0KCk7XHJcbmxldCBfbWF0UHJvaiA9IG5ldyBNYXQ0KCk7XHJcbmxldCBfbWF0Vmlld1Byb2ogPSBuZXcgTWF0NCgpO1xyXG5sZXQgX21hdEludlZpZXdQcm9qID0gbmV3IE1hdDQoKTtcclxubGV0IF90bXBfdjMgPSBuZXcgVmVjMygpO1xyXG5sZXQgX3RtcDJfdjMgPSBuZXcgVmVjMygpO1xyXG5cclxuLyoqXHJcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBjYW1lcmEgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XHJcbiAgX3Bvb2xJRCA9IC0xO1xyXG4gIF9ub2RlID0gbnVsbDtcclxuICBfcHJvamVjdGlvbiA9IGVudW1zLlBST0pfUEVSU1BFQ1RJVkU7XHJcblxyXG4gIC8vIHByaW9yaXR5LiB0aGUgc21hbGxlciBvbmUgd2lsbCBiZSByZW5kZXJlZCBmaXJzdFxyXG4gIF9wcmlvcml0eSA9IDA7XHJcblxyXG4gIC8vIGNsZWFyIG9wdGlvbnNcclxuICBfY29sb3IgPSBuZXcgVmVjNCgwLjIsIDAuMywgMC40NywgMSk7XHJcbiAgX2RlcHRoID0gMTtcclxuICBfc3RlbmNpbCA9IDA7XHJcbiAgX2NsZWFyRmxhZ3MgPSBlbnVtcy5DTEVBUl9DT0xPUiB8IGVudW1zLkNMRUFSX0RFUFRIO1xyXG4gIF9jbGVhck1vZGVsID0gbnVsbDtcclxuXHJcbiAgLy8gc3RhZ2VzICYgZnJhbWVidWZmZXJcclxuICBfc3RhZ2VzID0gW107XHJcbiAgX2ZyYW1lYnVmZmVyID0gbnVsbDtcclxuXHJcbiAgLy8gcHJvamVjdGlvbiBwcm9wZXJ0aWVzXHJcbiAgX25lYXIgPSAwLjAxO1xyXG4gIF9mYXIgPSAxMDAwLjA7XHJcbiAgX2ZvdiA9IE1hdGguUEkgLyA0LjA7IC8vIHZlcnRpY2FsIGZvdlxyXG4gIF9yZWN0ID0ge1xyXG4gICAgeDogMCwgeTogMCwgdzogMSwgaDogMVxyXG4gIH07XHJcblxyXG4gIC8vIG9ydGhvIHByb3BlcnRpZXNcclxuICBfb3J0aG9IZWlnaHQgPSAxMDtcclxuXHJcbiAgX2N1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcclxuXHJcblxyXG4gIC8vIGN1bGxpbmcgbWFza1xyXG4gIGdldCBjdWxsaW5nTWFzayAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VsbGluZ01hc2s7XHJcbiAgfVxyXG5cclxuICBzZXQgY3VsbGluZ01hc2sgKG1hc2spIHtcclxuICAgIHRoaXMuX2N1bGxpbmdNYXNrID0gbWFzaztcclxuICB9XHJcblxyXG4gIHNldEN1bGxpbmdNYXNrIChtYXNrKSB7XHJcbiAgICB0aGlzLl9jdWxsaW5nTWFzayA9IG1hc2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGhvc3Rpbmcgbm9kZSBvZiB0aGlzIGNhbWVyYVxyXG4gICAqIEByZXR1cm5zIHtOb2RlfSB0aGUgaG9zdGluZyBub2RlXHJcbiAgICovXHJcbiAgZ2V0Tm9kZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgaG9zdGluZyBub2RlIG9mIHRoaXMgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIHRoZSBob3N0aW5nIG5vZGVcclxuICAgKi9cclxuICBzZXROb2RlIChub2RlKSB7XHJcbiAgICB0aGlzLl9ub2RlID0gbm9kZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgcHJvamVjdGlvbiB0eXBlIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgcHJvamVjdGlvbiB0eXBlXHJcbiAgICovXHJcbiAgZ2V0VHlwZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvamVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgcHJvamVjdGlvbiB0eXBlIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSBjYW1lcmEgcHJvamVjdGlvbiB0eXBlXHJcbiAgICovXHJcbiAgc2V0VHlwZSAodHlwZSkge1xyXG4gICAgdGhpcy5fcHJvamVjdGlvbiA9IHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHByaW9yaXR5IG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgcHJpb3JpdHlcclxuICAgKi9cclxuICBnZXRQcmlvcml0eSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHByaW9yaXR5IG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gcHJpb3JpdHkgY2FtZXJhIHByaW9yaXR5XHJcbiAgICovXHJcbiAgc2V0UHJpb3JpdHkgKHByaW9yaXR5KSB7XHJcbiAgICB0aGlzLl9wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBvcnRob2dvbmFsIGhlaWdodCBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHJldHVybnMge251bWJlcn0gY2FtZXJhIGhlaWdodFxyXG4gICAqL1xyXG4gIGdldE9ydGhvSGVpZ2h0ICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vcnRob0hlaWdodDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgb3J0aG9nb25hbCBoZWlnaHQgb2YgdGhlIGNhbWVyYVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgY2FtZXJhIGhlaWdodFxyXG4gICAqL1xyXG4gIHNldE9ydGhvSGVpZ2h0ICh2YWwpIHtcclxuICAgIHRoaXMuX29ydGhvSGVpZ2h0ID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgZmllbGQgb2Ygdmlld1xyXG4gICAqL1xyXG4gIGdldEZvdiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZm92O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZm92IGNhbWVyYSBmaWVsZCBvZiB2aWV3XHJcbiAgICovXHJcbiAgc2V0Rm92IChmb3YpIHtcclxuICAgIHRoaXMuX2ZvdiA9IGZvdjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbmVhciBjbGlwcGluZyBkaXN0YW5jZSBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHJldHVybnMge251bWJlcn0gY2FtZXJhIG5lYXIgY2xpcHBpbmcgZGlzdGFuY2VcclxuICAgKi9cclxuICBnZXROZWFyICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9uZWFyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBuZWFyIGNsaXBwaW5nIGRpc3RhbmNlIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbmVhciBjYW1lcmEgbmVhciBjbGlwcGluZyBkaXN0YW5jZVxyXG4gICAqL1xyXG4gIHNldE5lYXIgKG5lYXIpIHtcclxuICAgIHRoaXMuX25lYXIgPSBuZWFyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmYXIgY2xpcHBpbmcgZGlzdGFuY2Ugb2YgdGhlIGNhbWVyYVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGNhbWVyYSBmYXIgY2xpcHBpbmcgZGlzdGFuY2VcclxuICAgKi9cclxuICBnZXRGYXIgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZhcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgZmFyIGNsaXBwaW5nIGRpc3RhbmNlIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIGNhbWVyYSBmYXIgY2xpcHBpbmcgZGlzdGFuY2VcclxuICAgKi9cclxuICBzZXRGYXIgKGZhcikge1xyXG4gICAgdGhpcy5fZmFyID0gZmFyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjbGVhciBjb2xvciBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHJldHVybnMge1ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIGNvbG9yIHZlY3RvclxyXG4gICAqL1xyXG4gIGdldENvbG9yIChvdXQpIHtcclxuICAgIHJldHVybiBWZWM0LmNvcHkob3V0LCB0aGlzLl9jb2xvcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNsZWFyIGNvbG9yIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gciByZWQgY2hhbm5lbCBvZiBjYW1lcmEgY2xlYXIgY29sb3JcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZyBncmVlbiBjaGFubmVsIG9mIGNhbWVyYSBjbGVhciBjb2xvclxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBiIGJsdWUgY2hhbm5lbCBvZiBjYW1lcmEgY2xlYXIgY29sb3JcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYSBhbHBoYSBjaGFubmVsIG9mIGNhbWVyYSBjbGVhciBjb2xvclxyXG4gICAqL1xyXG4gIHNldENvbG9yIChyLCBnLCBiLCBhKSB7XHJcbiAgICBWZWM0LnNldCh0aGlzLl9jb2xvciwgciwgZywgYiwgYSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGNsZWFyIGRlcHRoIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgY2xlYXIgZGVwdGhcclxuICAgKi9cclxuICBnZXREZXB0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGVwdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNsZWFyIGRlcHRoIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVwdGggY2FtZXJhIGNsZWFyIGRlcHRoXHJcbiAgICovXHJcbiAgc2V0RGVwdGggKGRlcHRoKSB7XHJcbiAgICB0aGlzLl9kZXB0aCA9IGRlcHRoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjbGVhcmluZyBzdGVuY2lsIHZhbHVlIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgY2xlYXJpbmcgc3RlbmNpbCB2YWx1ZVxyXG4gICAqL1xyXG4gIGdldFN0ZW5jaWwgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0ZW5jaWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGNsZWFyaW5nIHN0ZW5jaWwgdmFsdWUgb2YgdGhlIGNhbWVyYVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGVuY2lsIGNhbWVyYSBjbGVhcmluZyBzdGVuY2lsIHZhbHVlXHJcbiAgICovXHJcbiAgc2V0U3RlbmNpbCAoc3RlbmNpbCkge1xyXG4gICAgdGhpcy5fc3RlbmNpbCA9IHN0ZW5jaWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGNsZWFyaW5nIGZsYWdzIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBjYW1lcmEgY2xlYXJpbmcgZmxhZ3NcclxuICAgKi9cclxuICBnZXRDbGVhckZsYWdzICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9jbGVhckZsYWdzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjbGVhcmluZyBmbGFncyBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGZsYWdzIGNhbWVyYSBjbGVhcmluZyBmbGFnc1xyXG4gICAqL1xyXG4gIHNldENsZWFyRmxhZ3MgKGZsYWdzKSB7XHJcbiAgICB0aGlzLl9jbGVhckZsYWdzID0gZmxhZ3M7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHJlY3Qgb2YgdGhlIGNhbWVyYVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvdXQgdGhlIHJlY2VpdmluZyBvYmplY3RcclxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBjYW1lcmEgcmVjdFxyXG4gICAqL1xyXG4gIGdldFJlY3QgKG91dCkge1xyXG4gICAgb3V0LnggPSB0aGlzLl9yZWN0Lng7XHJcbiAgICBvdXQueSA9IHRoaXMuX3JlY3QueTtcclxuICAgIG91dC53ID0gdGhpcy5fcmVjdC53O1xyXG4gICAgb3V0LmggPSB0aGlzLl9yZWN0Lmg7XHJcblxyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgcmVjdCBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggLSBbMCwxXVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gWzAsMV1cclxuICAgKiBAcGFyYW0ge051bWJlcn0gdyAtIFswLDFdXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGggLSBbMCwxXVxyXG4gICAqL1xyXG4gIHNldFJlY3QgKHgsIHksIHcsIGgpIHtcclxuICAgIHRoaXMuX3JlY3QueCA9IHg7XHJcbiAgICB0aGlzLl9yZWN0LnkgPSB5O1xyXG4gICAgdGhpcy5fcmVjdC53ID0gdztcclxuICAgIHRoaXMuX3JlY3QuaCA9IGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHN0YWdlcyBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHJldHVybnMge3N0cmluZ1tdfSBjYW1lcmEgc3RhZ2VzXHJcbiAgICovXHJcbiAgZ2V0U3RhZ2VzICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFnZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHN0YWdlcyBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3RhZ2VzIGNhbWVyYSBzdGFnZXNcclxuICAgKi9cclxuICBzZXRTdGFnZXMgKHN0YWdlcykge1xyXG4gICAgdGhpcy5fc3RhZ2VzID0gc3RhZ2VzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmcmFtZWJ1ZmZlciBvZiB0aGUgY2FtZXJhXHJcbiAgICogQHJldHVybnMge0ZyYW1lQnVmZmVyfSBjYW1lcmEgZnJhbWVidWZmZXJcclxuICAgKi9cclxuICBnZXRGcmFtZWJ1ZmZlciAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZnJhbWVidWZmZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGZyYW1lYnVmZmVyIG9mIHRoZSBjYW1lcmFcclxuICAgKiBAcGFyYW0ge0ZyYW1lQnVmZmVyfSBmcmFtZWJ1ZmZlciBjYW1lcmEgZnJhbWVidWZmZXJcclxuICAgKi9cclxuICBzZXRGcmFtZUJ1ZmZlciAoZnJhbWVidWZmZXIpIHtcclxuICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gZnJhbWVidWZmZXI7XHJcbiAgfVxyXG5cclxuICBfY2FsY01hdHJpY2VzICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAvLyB2aWV3IG1hdHJpeFxyXG4gICAgdGhpcy5fbm9kZS5nZXRXb3JsZFJUKF9tYXRWaWV3SW52KTtcclxuICAgIE1hdDQuaW52ZXJ0KF9tYXRWaWV3LCBfbWF0Vmlld0ludik7XHJcblxyXG4gICAgLy8gcHJvamVjdGlvbiBtYXRyaXhcclxuICAgIGxldCBhc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcclxuICAgIGlmICh0aGlzLl9wcm9qZWN0aW9uID09PSBlbnVtcy5QUk9KX1BFUlNQRUNUSVZFKSB7XHJcbiAgICAgIE1hdDQucGVyc3BlY3RpdmUoX21hdFByb2osXHJcbiAgICAgICAgdGhpcy5fZm92LFxyXG4gICAgICAgIGFzcGVjdCxcclxuICAgICAgICB0aGlzLl9uZWFyLFxyXG4gICAgICAgIHRoaXMuX2ZhclxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHggPSB0aGlzLl9vcnRob0hlaWdodCAqIGFzcGVjdDtcclxuICAgICAgbGV0IHkgPSB0aGlzLl9vcnRob0hlaWdodDtcclxuICAgICAgTWF0NC5vcnRobyhfbWF0UHJvaixcclxuICAgICAgICAteCwgeCwgLXksIHksIHRoaXMuX25lYXIsIHRoaXMuX2ZhclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZpZXctcHJvamVjdGlvblxyXG4gICAgTWF0NC5tdWwoX21hdFZpZXdQcm9qLCBfbWF0UHJvaiwgX21hdFZpZXcpO1xyXG4gICAgLy8gaW52IHZpZXctcHJvamVjdGlvblxyXG4gICAgTWF0NC5pbnZlcnQoX21hdEludlZpZXdQcm9qLCBfbWF0Vmlld1Byb2opO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZXh0cmFjdCBhIHZpZXcgb2YgdGhpcyBjYW1lcmFcclxuICAgKiBAcGFyYW0ge1ZpZXd9IG91dCB0aGUgcmVjZWl2aW5nIHZpZXdcclxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggZnJhbWVidWZmZXIgd2lkdGhcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IGZyYW1lYnVmZmVyIGhlaWdodFxyXG4gICAqL1xyXG4gIGV4dHJhY3RWaWV3IChvdXQsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlcikge1xyXG4gICAgICB3aWR0aCA9IHRoaXMuX2ZyYW1lYnVmZmVyLl93aWR0aDtcclxuICAgICAgaGVpZ2h0ID0gdGhpcy5fZnJhbWVidWZmZXIuX2hlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcmlvcml0eVxyXG4gICAgb3V0Ll9wcmlvcml0eSA9IHRoaXMuX3ByaW9yaXR5O1xyXG5cclxuICAgIC8vIHJlY3RcclxuICAgIG91dC5fcmVjdC54ID0gdGhpcy5fcmVjdC54ICogd2lkdGg7XHJcbiAgICBvdXQuX3JlY3QueSA9IHRoaXMuX3JlY3QueSAqIGhlaWdodDtcclxuICAgIG91dC5fcmVjdC53ID0gdGhpcy5fcmVjdC53ICogd2lkdGg7XHJcbiAgICBvdXQuX3JlY3QuaCA9IHRoaXMuX3JlY3QuaCAqIGhlaWdodDtcclxuXHJcbiAgICAvLyBjbGVhciBvcHRzXHJcbiAgICB0aGlzLmdldENvbG9yKG91dC5fY29sb3IpO1xyXG4gICAgb3V0Ll9kZXB0aCA9IHRoaXMuX2RlcHRoO1xyXG4gICAgb3V0Ll9zdGVuY2lsID0gdGhpcy5fc3RlbmNpbDtcclxuICAgIG91dC5fY2xlYXJGbGFncyA9IHRoaXMuX2NsZWFyRmxhZ3M7XHJcbiAgICBvdXQuX2NsZWFyTW9kZWwgPSB0aGlzLl9jbGVhck1vZGVsO1xyXG5cclxuICAgIC8vIHN0YWdlcyAmIGZyYW1lYnVmZmVyXHJcbiAgICBvdXQuX3N0YWdlcyA9IHRoaXMuX3N0YWdlcztcclxuICAgIG91dC5fZnJhbWVidWZmZXIgPSB0aGlzLl9mcmFtZWJ1ZmZlcjtcclxuXHJcbiAgICB0aGlzLl9jYWxjTWF0cmljZXMod2lkdGgsIGhlaWdodCk7XHJcbiAgICBNYXQ0LmNvcHkob3V0Ll9tYXRWaWV3LCBfbWF0Vmlldyk7XHJcbiAgICBNYXQ0LmNvcHkob3V0Ll9tYXRWaWV3SW52LCBfbWF0Vmlld0ludik7XHJcbiAgICBNYXQ0LmNvcHkob3V0Ll9tYXRQcm9qLCBfbWF0UHJvaik7XHJcbiAgICBNYXQ0LmNvcHkob3V0Ll9tYXRWaWV3UHJvaiwgX21hdFZpZXdQcm9qKTtcclxuICAgIE1hdDQuY29weShvdXQuX21hdEludlZpZXdQcm9qLCBfbWF0SW52Vmlld1Byb2opO1xyXG5cclxuICAgIG91dC5fY3VsbGluZ01hc2sgPSB0aGlzLl9jdWxsaW5nTWFzaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRyYW5zZm9ybSBhIHNjcmVlbiBwb3NpdGlvbiB0byBhIHdvcmxkIHNwYWNlIHJheVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IHRoZSBzY3JlZW4geCBwb3NpdGlvbiB0byBiZSB0cmFuc2Zvcm1lZFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IHRoZSBzY3JlZW4geSBwb3NpdGlvbiB0byBiZSB0cmFuc2Zvcm1lZFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBmcmFtZWJ1ZmZlciB3aWR0aFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgZnJhbWVidWZmZXIgaGVpZ2h0XHJcbiAgICogQHBhcmFtIHtSYXl9IG91dCB0aGUgcmVzdWx0aW5nIHJheVxyXG4gICAqIEByZXR1cm5zIHtSYXl9IHRoZSByZXN1bHRpbmcgcmF5XHJcbiAgICovXHJcbiAgc2NyZWVuUG9pbnRUb1JheSAoeCwgeSwgd2lkdGgsIGhlaWdodCwgb3V0KSB7XHJcbiAgICBpZiAoIWNjLmdlb21VdGlscykgcmV0dXJuIG91dDtcclxuXHJcbiAgICBvdXQgPSBvdXQgfHwgbmV3IFJheSgpO1xyXG4gICAgdGhpcy5fY2FsY01hdHJpY2VzKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIGxldCBjeCA9IHRoaXMuX3JlY3QueCAqIHdpZHRoO1xyXG4gICAgbGV0IGN5ID0gdGhpcy5fcmVjdC55ICogaGVpZ2h0O1xyXG4gICAgbGV0IGN3ID0gdGhpcy5fcmVjdC53ICogd2lkdGg7XHJcbiAgICBsZXQgY2ggPSB0aGlzLl9yZWN0LmggKiBoZWlnaHQ7XHJcblxyXG4gICAgLy8gZmFyIHBsYW5lIGludGVyc2VjdGlvblxyXG4gICAgVmVjMy5zZXQoX3RtcDJfdjMsICh4IC0gY3gpIC8gY3cgKiAyIC0gMSwgKHkgLSBjeSkgLyBjaCAqIDIgLSAxLCAxKTtcclxuICAgIFZlYzMudHJhbnNmb3JtTWF0NChfdG1wMl92MywgX3RtcDJfdjMsIF9tYXRJbnZWaWV3UHJvaik7XHJcblxyXG4gICAgaWYgKHRoaXMuX3Byb2plY3Rpb24gPT09IGVudW1zLlBST0pfUEVSU1BFQ1RJVkUpIHtcclxuICAgICAgLy8gY2FtZXJhIG9yaWdpblxyXG4gICAgICB0aGlzLl9ub2RlLmdldFdvcmxkUG9zaXRpb24oX3RtcF92Myk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBuZWFyIHBsYW5lIGludGVyc2VjdGlvblxyXG4gICAgICBWZWMzLnNldChfdG1wX3YzLCAoeCAtIGN4KSAvIGN3ICogMiAtIDEsICh5IC0gY3kpIC8gY2ggKiAyIC0gMSwgLTEpO1xyXG4gICAgICBWZWMzLnRyYW5zZm9ybU1hdDQoX3RtcF92MywgX3RtcF92MywgX21hdEludlZpZXdQcm9qKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUmF5LmZyb21Qb2ludHMob3V0LCBfdG1wX3YzLCBfdG1wMl92Myk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB0cmFuc2Zvcm0gYSBzY3JlZW4gcG9zaXRpb24gdG8gd29ybGQgc3BhY2VcclxuICAgKiBAcGFyYW0ge1ZlYzN9IG91dCB0aGUgcmVzdWx0aW5nIHZlY3RvclxyXG4gICAqIEBwYXJhbSB7VmVjM30gc2NyZWVuUG9zIHRoZSBzY3JlZW4gcG9zaXRpb24gdG8gYmUgdHJhbnNmb3JtZWRcclxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggZnJhbWVidWZmZXIgd2lkdGhcclxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IGZyYW1lYnVmZmVyIGhlaWdodFxyXG4gICAqIEByZXR1cm5zIHtWZWMzfSB0aGUgcmVzdWx0aW5nIHZlY3RvclxyXG4gICAqL1xyXG4gIHNjcmVlblRvV29ybGQgKG91dCwgc2NyZWVuUG9zLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLl9jYWxjTWF0cmljZXMod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgbGV0IGN4ID0gdGhpcy5fcmVjdC54ICogd2lkdGg7XHJcbiAgICBsZXQgY3kgPSB0aGlzLl9yZWN0LnkgKiBoZWlnaHQ7XHJcbiAgICBsZXQgY3cgPSB0aGlzLl9yZWN0LncgKiB3aWR0aDtcclxuICAgIGxldCBjaCA9IHRoaXMuX3JlY3QuaCAqIGhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy5fcHJvamVjdGlvbiA9PT0gZW51bXMuUFJPSl9QRVJTUEVDVElWRSkge1xyXG4gICAgICAvLyBjYWxjdWxhdGUgc2NyZWVuIHBvcyBpbiBmYXIgY2xpcCBwbGFuZVxyXG4gICAgICBWZWMzLnNldChvdXQsXHJcbiAgICAgICAgKHNjcmVlblBvcy54IC0gY3gpIC8gY3cgKiAyIC0gMSxcclxuICAgICAgICAoc2NyZWVuUG9zLnkgLSBjeSkgLyBjaCAqIDIgLSAxLFxyXG4gICAgICAgIDAuOTk5OVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gdHJhbnNmb3JtIHRvIHdvcmxkXHJcbiAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIG91dCwgX21hdEludlZpZXdQcm9qKTtcclxuXHJcbiAgICAgIC8vIGxlcnAgdG8gZGVwdGggelxyXG4gICAgICB0aGlzLl9ub2RlLmdldFdvcmxkUG9zaXRpb24oX3RtcF92Myk7XHJcblxyXG4gICAgICBWZWMzLmxlcnAob3V0LCBfdG1wX3YzLCBvdXQsIGxlcnAodGhpcy5fbmVhciAvIHRoaXMuX2ZhciwgMSwgc2NyZWVuUG9zLnopKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIFZlYzMuc2V0KG91dCxcclxuICAgICAgICAoc2NyZWVuUG9zLnggLSBjeCkgLyBjdyAqIDIgLSAxLFxyXG4gICAgICAgIChzY3JlZW5Qb3MueSAtIGN5KSAvIGNoICogMiAtIDEsXHJcbiAgICAgICAgc2NyZWVuUG9zLnogKiAyIC0gMVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gdHJhbnNmb3JtIHRvIHdvcmxkXHJcbiAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIG91dCwgX21hdEludlZpZXdQcm9qKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdHJhbnNmb3JtIGEgd29ybGQgc3BhY2UgcG9zaXRpb24gdG8gc2NyZWVuIHNwYWNlXHJcbiAgICogQHBhcmFtIHtWZWMzfSBvdXQgdGhlIHJlc3VsdGluZyB2ZWN0b3JcclxuICAgKiBAcGFyYW0ge1ZlYzN9IHdvcmxkUG9zIHRoZSB3b3JsZCBzcGFjZSBwb3NpdGlvbiB0byBiZSB0cmFuc2Zvcm1lZFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBmcmFtZWJ1ZmZlciB3aWR0aFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgZnJhbWVidWZmZXIgaGVpZ2h0XHJcbiAgICogQHJldHVybnMge1ZlYzN9IHRoZSByZXN1bHRpbmcgdmVjdG9yXHJcbiAgICovXHJcbiAgd29ybGRUb1NjcmVlbiAob3V0LCB3b3JsZFBvcywgd2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy5fY2FsY01hdHJpY2VzKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIGxldCBjeCA9IHRoaXMuX3JlY3QueCAqIHdpZHRoO1xyXG4gICAgbGV0IGN5ID0gdGhpcy5fcmVjdC55ICogaGVpZ2h0O1xyXG4gICAgbGV0IGN3ID0gdGhpcy5fcmVjdC53ICogd2lkdGg7XHJcbiAgICBsZXQgY2ggPSB0aGlzLl9yZWN0LmggKiBoZWlnaHQ7XHJcblxyXG4gICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgd29ybGRQb3MsIF9tYXRWaWV3UHJvaik7XHJcbiAgICBvdXQueCA9IGN4ICsgKG91dC54ICsgMSkgKiAwLjUgKiBjdztcclxuICAgIG91dC55ID0gY3kgKyAob3V0LnkgKyAxKSAqIDAuNSAqIGNoO1xyXG4gICAgb3V0LnogPSBvdXQueiAqIDAuNSArIDAuNTtcclxuXHJcbiAgICByZXR1cm4gb3V0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdHJhbnNmb3JtIGEgd29ybGQgc3BhY2UgbWF0cml4IHRvIHNjcmVlbiBzcGFjZVxyXG4gICAqIEBwYXJhbSB7TWF0NH0gb3V0IHRoZSByZXN1bHRpbmcgdmVjdG9yXHJcbiAgICogQHBhcmFtIHtNYXQ0fSB3b3JsZE1hdHJpeCB0aGUgd29ybGQgc3BhY2UgbWF0cml4IHRvIGJlIHRyYW5zZm9ybWVkXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIGZyYW1lYnVmZmVyIHdpZHRoXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBmcmFtZWJ1ZmZlciBoZWlnaHRcclxuICAgKiBAcmV0dXJucyB7TWF0NH0gdGhlIHJlc3VsdGluZyB2ZWN0b3JcclxuICAgKi9cclxuICB3b3JsZE1hdHJpeFRvU2NyZWVuIChvdXQsIHdvcmxkTWF0cml4LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLl9jYWxjTWF0cmljZXMod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgTWF0NC5tdWwob3V0LCBfbWF0Vmlld1Byb2osIHdvcmxkTWF0cml4KTtcclxuXHJcbiAgICBsZXQgaGFsZldpZHRoID0gd2lkdGggLyAyO1xyXG4gICAgbGV0IGhhbGZIZWlnaHQgPSBoZWlnaHQgLyAyO1xyXG4gICAgTWF0NC5pZGVudGl0eShfdG1wX21hdDQpO1xyXG4gICAgTWF0NC50cmFuc2Zvcm0oX3RtcF9tYXQ0LCBfdG1wX21hdDQsIFZlYzMuc2V0KF90bXBfdjMsIGhhbGZXaWR0aCwgaGFsZkhlaWdodCwgMCkpO1xyXG4gICAgTWF0NC5zY2FsZShfdG1wX21hdDQsIF90bXBfbWF0NCwgVmVjMy5zZXQoX3RtcF92MywgaGFsZldpZHRoLCBoYWxmSGVpZ2h0LCAxKSk7XHJcblxyXG4gICAgTWF0NC5tdWwob3V0LCBfdG1wX21hdDQsIG91dCk7XHJcblxyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=