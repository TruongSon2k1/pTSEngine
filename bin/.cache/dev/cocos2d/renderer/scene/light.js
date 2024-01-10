
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/light.js';
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

var _gfx = _interopRequireDefault(require("../gfx"));

var _enums = _interopRequireDefault(require("../enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _forward = cc.v3(0, 0, -1);

var _m4_tmp = cc.mat4();

var _m3_tmp = _valueTypes.Mat3.create();

var _transformedLightDirection = cc.v3(0, 0, 0); // compute light viewProjMat for shadow.


function _computeSpotLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // proj matrix


  _valueTypes.Mat4.perspective(outProj, light._spotAngle * light._spotAngleScale, 1, light._shadowMinDepth, light._shadowMaxDepth);
}

function _computeDirectionalLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // TODO: should compute directional light frustum based on rendered meshes in scene.
  // proj matrix


  var halfSize = light._shadowFrustumSize / 2;

  _valueTypes.Mat4.ortho(outProj, -halfSize, halfSize, -halfSize, halfSize, light._shadowMinDepth, light._shadowMaxDepth);
}

function _computePointLightViewProjMatrix(light, outView, outProj) {
  // view matrix
  light._node.getWorldRT(outView);

  _valueTypes.Mat4.invert(outView, outView); // The transformation from Cartesian to polar coordinates is not a linear function,
  // so it cannot be achieved by means of a fixed matrix multiplication.
  // Here we just use a nearly 180 degree perspective matrix instead.


  _valueTypes.Mat4.perspective(outProj, (0, _valueTypes.toRadian)(179), 1, light._shadowMinDepth, light._shadowMaxDepth);
}
/**
 * A representation of a light source.
 * Could be a point light, a spot light or a directional light.
 */


var Light = /*#__PURE__*/function () {
  /**
   * Setup a default directional light with no shadows
   */
  function Light() {
    this._poolID = -1;
    this._node = null;
    this._type = _enums["default"].LIGHT_DIRECTIONAL;
    this._color = new _valueTypes.Vec3(1, 1, 1);
    this._intensity = 1; // used for spot and point light

    this._range = 1; // used for spot light, default to 60 degrees

    this._spotAngle = (0, _valueTypes.toRadian)(60);
    this._spotExp = 1; // cached for uniform

    this._directionUniform = new Float32Array(3);
    this._positionUniform = new Float32Array(3);
    this._colorUniform = new Float32Array([this._color.x * this._intensity, this._color.y * this._intensity, this._color.z * this._intensity]);
    this._spotUniform = new Float32Array([Math.cos(this._spotAngle * 0.5), this._spotExp]); // shadow params

    this._shadowType = _enums["default"].SHADOW_NONE;
    this._shadowFrameBuffer = null;
    this._shadowMap = null;
    this._shadowMapDirty = false;
    this._shadowDepthBuffer = null;
    this._shadowResolution = 1024;
    this._shadowBias = 0.0005;
    this._shadowDarkness = 1;
    this._shadowMinDepth = 1;
    this._shadowMaxDepth = 1000;
    this._frustumEdgeFalloff = 0; // used by directional and spot light.

    this._viewProjMatrix = cc.mat4();
    this._spotAngleScale = 1; // used for spot light.

    this._shadowFrustumSize = 50; // used for directional light.
  }
  /**
   * Get the hosting node of this camera
   * @returns {Node} the hosting node
   */


  var _proto = Light.prototype;

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
   * set the color of the light source
   * @param {number} r red channel of the light color
   * @param {number} g green channel of the light color
   * @param {number} b blue channel of the light color
   */
  ;

  _proto.setColor = function setColor(r, g, b) {
    _valueTypes.Vec3.set(this._color, r, g, b);

    this._colorUniform[0] = r * this._intensity;
    this._colorUniform[1] = g * this._intensity;
    this._colorUniform[2] = b * this._intensity;
  }
  /**
   * get the color of the light source
   * @returns {Vec3} the light color
   */
  ;

  /**
   * set the intensity of the light source
   * @param {number} val the light intensity
   */
  _proto.setIntensity = function setIntensity(val) {
    this._intensity = val;
    this._colorUniform[0] = val * this._color.x;
    this._colorUniform[1] = val * this._color.y;
    this._colorUniform[2] = val * this._color.z;
  }
  /**
   * get the intensity of the light source
   * @returns {number} the light intensity
   */
  ;

  /**
   * set the type of the light source
   * @param {number} type light source type
   */
  _proto.setType = function setType(type) {
    this._type = type;
  }
  /**
   * get the type of the light source
   * @returns {number} light source type
   */
  ;

  /**
   * set the spot light angle
   * @param {number} val spot light angle
   */
  _proto.setSpotAngle = function setSpotAngle(val) {
    this._spotAngle = val;
    this._spotUniform[0] = Math.cos(this._spotAngle * 0.5);
  }
  /**
   * get the spot light angle
   * @returns {number} spot light angle
   */
  ;

  /**
   * set the spot light exponential
   * @param {number} val spot light exponential
   */
  _proto.setSpotExp = function setSpotExp(val) {
    this._spotExp = val;
    this._spotUniform[1] = val;
  }
  /**
   * get the spot light exponential
   * @returns {number} spot light exponential
   */
  ;

  /**
   * set the range of the light source
   * @param {number} val light source range
   */
  _proto.setRange = function setRange(val) {
    this._range = val;
  }
  /**
   * get the range of the light source
   * @returns {number} range of the light source
   */
  ;

  /**
   * set the shadow type of the light source
   * @param {number} type light source shadow type
   */
  _proto.setShadowType = function setShadowType(type) {
    if (this._shadowType === _enums["default"].SHADOW_NONE && type !== _enums["default"].SHADOW_NONE) {
      this._shadowMapDirty = true;
    }

    this._shadowType = type;
  }
  /**
   * get the shadow type of the light source
   * @returns {number} light source shadow type
   */
  ;

  /**
   * set the shadow resolution of the light source
   * @param {number} val light source shadow resolution
   */
  _proto.setShadowResolution = function setShadowResolution(val) {
    if (this._shadowResolution !== val) {
      this._shadowMapDirty = true;
    }

    this._shadowResolution = val;
  }
  /**
   * get the shadow resolution of the light source
   * @returns {number} light source shadow resolution
   */
  ;

  /**
   * set the shadow bias of the light source
   * @param {number} val light source shadow bias
   */
  _proto.setShadowBias = function setShadowBias(val) {
    this._shadowBias = val;
  }
  /**
   * get the shadow bias of the light source
   * @returns {number} light source shadow bias
   */
  ;

  /**
   * set the shadow darkness of the light source
   * @param {number} val light source shadow darkness
   */
  _proto.setShadowDarkness = function setShadowDarkness(val) {
    this._shadowDarkness = val;
  }
  /**
   * get the shadow darkness of the light source
   * @returns {number} light source shadow darkness
   */
  ;

  /**
   * set the shadow min depth of the light source
   * @param {number} val light source shadow min depth
   */
  _proto.setShadowMinDepth = function setShadowMinDepth(val) {
    this._shadowMinDepth = val;
  }
  /**
   * get the shadow min depth of the light source
   * @returns {number} light source shadow min depth
   */
  ;

  /**
   * set the shadow max depth of the light source
   * @param {number} val light source shadow max depth
   */
  _proto.setShadowMaxDepth = function setShadowMaxDepth(val) {
    this._shadowMaxDepth = val;
  }
  /**
   * get the shadow max depth of the light source
   * @returns {number} light source shadow max depth
   */
  ;

  /**
   * set the frustum edge falloff of the light source
   * @param {number} val light source frustum edge falloff
   */
  _proto.setFrustumEdgeFalloff = function setFrustumEdgeFalloff(val) {
    this._frustumEdgeFalloff = val;
  }
  /**
   * get the frustum edge falloff of the light source
   * @returns {number} light source frustum edge falloff
   */
  ;

  /**
   * set the shadow frustum size of the light source
   * @param {number} val light source shadow frustum size
   */
  _proto.setShadowFrustumSize = function setShadowFrustumSize(val) {
    this._shadowFrustumSize = val;
  }
  /**
   * get the shadow frustum size of the light source
   * @returns {number} light source shadow frustum size
   */
  ;

  /**
   * extract a view of this light source
   * @param {View} out the receiving view
   * @param {string[]} stages the stages using the view
   */
  _proto.extractView = function extractView(out, stages) {
    // TODO: view should not handle light.
    out._shadowLight = this; // priority. TODO: use varying value for shadow view?

    out._priority = -1; // rect

    out._rect.x = 0;
    out._rect.y = 0;
    out._rect.w = this._shadowResolution;
    out._rect.h = this._shadowResolution; // clear opts

    _valueTypes.Vec3.set(out._color, 1, 1, 1);

    out._depth = 1;
    out._stencil = 1;
    out._clearFlags = _enums["default"].CLEAR_COLOR | _enums["default"].CLEAR_DEPTH; // stages & framebuffer

    out._stages = stages;
    out._framebuffer = this._shadowFrameBuffer; // view projection matrix

    switch (this._type) {
      case _enums["default"].LIGHT_SPOT:
        _computeSpotLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_DIRECTIONAL:
        _computeDirectionalLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_POINT:
        _computePointLightViewProjMatrix(this, out._matView, out._matProj);

        break;

      case _enums["default"].LIGHT_AMBIENT:
        break;

      default:
        console.warn('shadow of this light type is not supported');
    } // view-projection


    _valueTypes.Mat4.mul(out._matViewProj, out._matProj, out._matView);

    this._viewProjMatrix = out._matViewProj;

    _valueTypes.Mat4.invert(out._matInvViewProj, out._matViewProj); // update view's frustum
    // out._frustum.update(out._matViewProj, out._matInvViewProj);


    out._cullingMask = 0xffffffff;
  };

  _proto._updateLightPositionAndDirection = function _updateLightPositionAndDirection() {
    this._node.getWorldMatrix(_m4_tmp);

    _valueTypes.Mat3.fromMat4(_m3_tmp, _m4_tmp);

    _valueTypes.Vec3.transformMat3(_transformedLightDirection, _forward, _m3_tmp);

    _valueTypes.Vec3.toArray(this._directionUniform, _transformedLightDirection);

    var pos = this._positionUniform;
    var m = _m4_tmp.m;
    pos[0] = m[12];
    pos[1] = m[13];
    pos[2] = m[14];
  };

  _proto._generateShadowMap = function _generateShadowMap(device) {
    this._shadowMap = new _gfx["default"].Texture2D(device, {
      width: this._shadowResolution,
      height: this._shadowResolution,
      format: _gfx["default"].TEXTURE_FMT_RGBA8,
      wrapS: _gfx["default"].WRAP_CLAMP,
      wrapT: _gfx["default"].WRAP_CLAMP
    });
    this._shadowDepthBuffer = new _gfx["default"].RenderBuffer(device, _gfx["default"].RB_FMT_D16, this._shadowResolution, this._shadowResolution);
    this._shadowFrameBuffer = new _gfx["default"].FrameBuffer(device, this._shadowResolution, this._shadowResolution, {
      colors: [this._shadowMap],
      depth: this._shadowDepthBuffer
    });
  };

  _proto._destroyShadowMap = function _destroyShadowMap() {
    if (this._shadowMap) {
      this._shadowMap.destroy();

      this._shadowDepthBuffer.destroy();

      this._shadowFrameBuffer.destroy();

      this._shadowMap = null;
      this._shadowDepthBuffer = null;
      this._shadowFrameBuffer = null;
    }
  }
  /**
   * update the light source
   * @param {Device} device the rendering device
   */
  ;

  _proto.update = function update(device) {
    this._updateLightPositionAndDirection();

    if (this._shadowType === _enums["default"].SHADOW_NONE) {
      this._destroyShadowMap();
    } else if (this._shadowMapDirty) {
      this._destroyShadowMap();

      this._generateShadowMap(device);

      this._shadowMapDirty = false;
    }
  };

  _createClass(Light, [{
    key: "color",
    get: function get() {
      return this._color;
    }
  }, {
    key: "intensity",
    get: function get() {
      return this._intensity;
    }
  }, {
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "spotAngle",
    get: function get() {
      return this._spotAngle;
    }
  }, {
    key: "spotExp",
    get: function get() {
      return this._spotExp;
    }
  }, {
    key: "range",
    get: function get() {
      return this._range;
    }
  }, {
    key: "shadowType",
    get: function get() {
      return this._shadowType;
    }
    /**
     * get the shadowmap of the light source
     * @returns {Texture2D} light source shadowmap
     */

  }, {
    key: "shadowMap",
    get: function get() {
      return this._shadowMap;
    }
    /**
     * get the view-projection matrix of the light source
     * @returns {Mat4} light source view-projection matrix
     */

  }, {
    key: "viewProjMatrix",
    get: function get() {
      return this._viewProjMatrix;
    }
  }, {
    key: "shadowResolution",
    get: function get() {
      return this._shadowResolution;
    }
  }, {
    key: "shadowBias",
    get: function get() {
      return this._shadowBias;
    }
  }, {
    key: "shadowDarkness",
    get: function get() {
      return this._shadowDarkness;
    }
  }, {
    key: "shadowMinDepth",
    get: function get() {
      if (this._type === _enums["default"].LIGHT_DIRECTIONAL) {
        return 1.0;
      }

      return this._shadowMinDepth;
    }
  }, {
    key: "shadowMaxDepth",
    get: function get() {
      if (this._type === _enums["default"].LIGHT_DIRECTIONAL) {
        return 1.0;
      }

      return this._shadowMaxDepth;
    }
  }, {
    key: "frustumEdgeFalloff",
    get: function get() {
      return this._frustumEdgeFalloff;
    }
  }, {
    key: "shadowFrustumSize",
    get: function get() {
      return this._shadowFrustumSize;
    }
  }]);

  return Light;
}();

exports["default"] = Light;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxzY2VuZVxcbGlnaHQuanMiXSwibmFtZXMiOlsiX2ZvcndhcmQiLCJjYyIsInYzIiwiX200X3RtcCIsIm1hdDQiLCJfbTNfdG1wIiwiTWF0MyIsImNyZWF0ZSIsIl90cmFuc2Zvcm1lZExpZ2h0RGlyZWN0aW9uIiwiX2NvbXB1dGVTcG90TGlnaHRWaWV3UHJvak1hdHJpeCIsImxpZ2h0Iiwib3V0VmlldyIsIm91dFByb2oiLCJfbm9kZSIsImdldFdvcmxkUlQiLCJNYXQ0IiwiaW52ZXJ0IiwicGVyc3BlY3RpdmUiLCJfc3BvdEFuZ2xlIiwiX3Nwb3RBbmdsZVNjYWxlIiwiX3NoYWRvd01pbkRlcHRoIiwiX3NoYWRvd01heERlcHRoIiwiX2NvbXB1dGVEaXJlY3Rpb25hbExpZ2h0Vmlld1Byb2pNYXRyaXgiLCJoYWxmU2l6ZSIsIl9zaGFkb3dGcnVzdHVtU2l6ZSIsIm9ydGhvIiwiX2NvbXB1dGVQb2ludExpZ2h0Vmlld1Byb2pNYXRyaXgiLCJMaWdodCIsIl9wb29sSUQiLCJfdHlwZSIsImVudW1zIiwiTElHSFRfRElSRUNUSU9OQUwiLCJfY29sb3IiLCJWZWMzIiwiX2ludGVuc2l0eSIsIl9yYW5nZSIsIl9zcG90RXhwIiwiX2RpcmVjdGlvblVuaWZvcm0iLCJGbG9hdDMyQXJyYXkiLCJfcG9zaXRpb25Vbmlmb3JtIiwiX2NvbG9yVW5pZm9ybSIsIngiLCJ5IiwieiIsIl9zcG90VW5pZm9ybSIsIk1hdGgiLCJjb3MiLCJfc2hhZG93VHlwZSIsIlNIQURPV19OT05FIiwiX3NoYWRvd0ZyYW1lQnVmZmVyIiwiX3NoYWRvd01hcCIsIl9zaGFkb3dNYXBEaXJ0eSIsIl9zaGFkb3dEZXB0aEJ1ZmZlciIsIl9zaGFkb3dSZXNvbHV0aW9uIiwiX3NoYWRvd0JpYXMiLCJfc2hhZG93RGFya25lc3MiLCJfZnJ1c3R1bUVkZ2VGYWxsb2ZmIiwiX3ZpZXdQcm9qTWF0cml4IiwiZ2V0Tm9kZSIsInNldE5vZGUiLCJub2RlIiwic2V0Q29sb3IiLCJyIiwiZyIsImIiLCJzZXQiLCJzZXRJbnRlbnNpdHkiLCJ2YWwiLCJzZXRUeXBlIiwidHlwZSIsInNldFNwb3RBbmdsZSIsInNldFNwb3RFeHAiLCJzZXRSYW5nZSIsInNldFNoYWRvd1R5cGUiLCJzZXRTaGFkb3dSZXNvbHV0aW9uIiwic2V0U2hhZG93QmlhcyIsInNldFNoYWRvd0RhcmtuZXNzIiwic2V0U2hhZG93TWluRGVwdGgiLCJzZXRTaGFkb3dNYXhEZXB0aCIsInNldEZydXN0dW1FZGdlRmFsbG9mZiIsInNldFNoYWRvd0ZydXN0dW1TaXplIiwiZXh0cmFjdFZpZXciLCJvdXQiLCJzdGFnZXMiLCJfc2hhZG93TGlnaHQiLCJfcHJpb3JpdHkiLCJfcmVjdCIsInciLCJoIiwiX2RlcHRoIiwiX3N0ZW5jaWwiLCJfY2xlYXJGbGFncyIsIkNMRUFSX0NPTE9SIiwiQ0xFQVJfREVQVEgiLCJfc3RhZ2VzIiwiX2ZyYW1lYnVmZmVyIiwiTElHSFRfU1BPVCIsIl9tYXRWaWV3IiwiX21hdFByb2oiLCJMSUdIVF9QT0lOVCIsIkxJR0hUX0FNQklFTlQiLCJjb25zb2xlIiwid2FybiIsIm11bCIsIl9tYXRWaWV3UHJvaiIsIl9tYXRJbnZWaWV3UHJvaiIsIl9jdWxsaW5nTWFzayIsIl91cGRhdGVMaWdodFBvc2l0aW9uQW5kRGlyZWN0aW9uIiwiZ2V0V29ybGRNYXRyaXgiLCJmcm9tTWF0NCIsInRyYW5zZm9ybU1hdDMiLCJ0b0FycmF5IiwicG9zIiwibSIsIl9nZW5lcmF0ZVNoYWRvd01hcCIsImRldmljZSIsImdmeCIsIlRleHR1cmUyRCIsIndpZHRoIiwiaGVpZ2h0IiwiZm9ybWF0IiwiVEVYVFVSRV9GTVRfUkdCQTgiLCJ3cmFwUyIsIldSQVBfQ0xBTVAiLCJ3cmFwVCIsIlJlbmRlckJ1ZmZlciIsIlJCX0ZNVF9EMTYiLCJGcmFtZUJ1ZmZlciIsImNvbG9ycyIsImRlcHRoIiwiX2Rlc3Ryb3lTaGFkb3dNYXAiLCJkZXN0cm95IiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQUMsQ0FBYixDQUFqQjs7QUFFQSxJQUFJQyxPQUFPLEdBQUdGLEVBQUUsQ0FBQ0csSUFBSCxFQUFkOztBQUNBLElBQUlDLE9BQU8sR0FBR0MsaUJBQUtDLE1BQUwsRUFBZDs7QUFDQSxJQUFJQywwQkFBMEIsR0FBR1AsRUFBRSxDQUFDQyxFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsRUFBWSxDQUFaLENBQWpDLEVBRUE7OztBQUNBLFNBQVNPLCtCQUFULENBQXlDQyxLQUF6QyxFQUFnREMsT0FBaEQsRUFBeURDLE9BQXpELEVBQWtFO0FBQ2hFO0FBQ0FGLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZQyxVQUFaLENBQXVCSCxPQUF2Qjs7QUFDQUksbUJBQUtDLE1BQUwsQ0FBWUwsT0FBWixFQUFxQkEsT0FBckIsRUFIZ0UsQ0FLaEU7OztBQUNBSSxtQkFBS0UsV0FBTCxDQUFpQkwsT0FBakIsRUFBMEJGLEtBQUssQ0FBQ1EsVUFBTixHQUFtQlIsS0FBSyxDQUFDUyxlQUFuRCxFQUFvRSxDQUFwRSxFQUF1RVQsS0FBSyxDQUFDVSxlQUE3RSxFQUE4RlYsS0FBSyxDQUFDVyxlQUFwRztBQUNEOztBQUVELFNBQVNDLHNDQUFULENBQWdEWixLQUFoRCxFQUF1REMsT0FBdkQsRUFBZ0VDLE9BQWhFLEVBQXlFO0FBQ3ZFO0FBQ0FGLEVBQUFBLEtBQUssQ0FBQ0csS0FBTixDQUFZQyxVQUFaLENBQXVCSCxPQUF2Qjs7QUFDQUksbUJBQUtDLE1BQUwsQ0FBWUwsT0FBWixFQUFxQkEsT0FBckIsRUFIdUUsQ0FLdkU7QUFDQTs7O0FBQ0EsTUFBSVksUUFBUSxHQUFHYixLQUFLLENBQUNjLGtCQUFOLEdBQTJCLENBQTFDOztBQUNBVCxtQkFBS1UsS0FBTCxDQUFXYixPQUFYLEVBQW9CLENBQUNXLFFBQXJCLEVBQStCQSxRQUEvQixFQUF5QyxDQUFDQSxRQUExQyxFQUFvREEsUUFBcEQsRUFBOERiLEtBQUssQ0FBQ1UsZUFBcEUsRUFBcUZWLEtBQUssQ0FBQ1csZUFBM0Y7QUFDRDs7QUFFRCxTQUFTSyxnQ0FBVCxDQUEwQ2hCLEtBQTFDLEVBQWlEQyxPQUFqRCxFQUEwREMsT0FBMUQsRUFBbUU7QUFDakU7QUFDQUYsRUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVlDLFVBQVosQ0FBdUJILE9BQXZCOztBQUNBSSxtQkFBS0MsTUFBTCxDQUFZTCxPQUFaLEVBQXFCQSxPQUFyQixFQUhpRSxDQUtqRTtBQUNBO0FBQ0E7OztBQUNBSSxtQkFBS0UsV0FBTCxDQUFpQkwsT0FBakIsRUFBMEIsMEJBQVMsR0FBVCxDQUExQixFQUF5QyxDQUF6QyxFQUE0Q0YsS0FBSyxDQUFDVSxlQUFsRCxFQUFtRVYsS0FBSyxDQUFDVyxlQUF6RTtBQUNEO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7OztJQUNxQk07QUFDbkI7QUFDRjtBQUNBO0FBQ0UsbUJBQWM7QUFDWixTQUFLQyxPQUFMLEdBQWUsQ0FBQyxDQUFoQjtBQUNBLFNBQUtmLEtBQUwsR0FBYSxJQUFiO0FBRUEsU0FBS2dCLEtBQUwsR0FBYUMsa0JBQU1DLGlCQUFuQjtBQUVBLFNBQUtDLE1BQUwsR0FBYyxJQUFJQyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFkO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixDQUFsQixDQVBZLENBU1o7O0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQsQ0FWWSxDQVdaOztBQUNBLFNBQUtqQixVQUFMLEdBQWtCLDBCQUFTLEVBQVQsQ0FBbEI7QUFDQSxTQUFLa0IsUUFBTCxHQUFnQixDQUFoQixDQWJZLENBY1o7O0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsSUFBSUMsWUFBSixDQUFpQixDQUFqQixDQUF6QjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElBQUlELFlBQUosQ0FBaUIsQ0FBakIsQ0FBeEI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCLElBQUlGLFlBQUosQ0FBaUIsQ0FBQyxLQUFLTixNQUFMLENBQVlTLENBQVosR0FBZ0IsS0FBS1AsVUFBdEIsRUFBa0MsS0FBS0YsTUFBTCxDQUFZVSxDQUFaLEdBQWdCLEtBQUtSLFVBQXZELEVBQW1FLEtBQUtGLE1BQUwsQ0FBWVcsQ0FBWixHQUFnQixLQUFLVCxVQUF4RixDQUFqQixDQUFyQjtBQUNBLFNBQUtVLFlBQUwsR0FBb0IsSUFBSU4sWUFBSixDQUFpQixDQUFDTyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLNUIsVUFBTCxHQUFrQixHQUEzQixDQUFELEVBQWtDLEtBQUtrQixRQUF2QyxDQUFqQixDQUFwQixDQWxCWSxDQW9CWjs7QUFDQSxTQUFLVyxXQUFMLEdBQW1CakIsa0JBQU1rQixXQUF6QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixNQUFuQjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLbkMsZUFBTCxHQUF1QixDQUF2QjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxTQUFLbUMsbUJBQUwsR0FBMkIsQ0FBM0IsQ0EvQlksQ0ErQmtCOztBQUM5QixTQUFLQyxlQUFMLEdBQXVCeEQsRUFBRSxDQUFDRyxJQUFILEVBQXZCO0FBQ0EsU0FBS2UsZUFBTCxHQUF1QixDQUF2QixDQWpDWSxDQWlDYzs7QUFDMUIsU0FBS0ssa0JBQUwsR0FBMEIsRUFBMUIsQ0FsQ1ksQ0FrQ2tCO0FBQy9CO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7O1NBQ0VrQyxVQUFBLG1CQUFVO0FBQ1IsV0FBTyxLQUFLN0MsS0FBWjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztTQUNFOEMsVUFBQSxpQkFBUUMsSUFBUixFQUFjO0FBQ1osU0FBSy9DLEtBQUwsR0FBYStDLElBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O1NBQ0VDLFdBQUEsa0JBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQ2hCL0IscUJBQUtnQyxHQUFMLENBQVMsS0FBS2pDLE1BQWQsRUFBc0I4QixDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJDLENBQTVCOztBQUNBLFNBQUt4QixhQUFMLENBQW1CLENBQW5CLElBQXdCc0IsQ0FBQyxHQUFHLEtBQUs1QixVQUFqQztBQUNBLFNBQUtNLGFBQUwsQ0FBbUIsQ0FBbkIsSUFBd0J1QixDQUFDLEdBQUcsS0FBSzdCLFVBQWpDO0FBQ0EsU0FBS00sYUFBTCxDQUFtQixDQUFuQixJQUF3QndCLENBQUMsR0FBRyxLQUFLOUIsVUFBakM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFLRTtBQUNGO0FBQ0E7QUFDQTtTQUNFZ0MsZUFBQSxzQkFBYUMsR0FBYixFQUFrQjtBQUNoQixTQUFLakMsVUFBTCxHQUFrQmlDLEdBQWxCO0FBQ0EsU0FBSzNCLGFBQUwsQ0FBbUIsQ0FBbkIsSUFBd0IyQixHQUFHLEdBQUcsS0FBS25DLE1BQUwsQ0FBWVMsQ0FBMUM7QUFDQSxTQUFLRCxhQUFMLENBQW1CLENBQW5CLElBQXdCMkIsR0FBRyxHQUFHLEtBQUtuQyxNQUFMLENBQVlVLENBQTFDO0FBQ0EsU0FBS0YsYUFBTCxDQUFtQixDQUFuQixJQUF3QjJCLEdBQUcsR0FBRyxLQUFLbkMsTUFBTCxDQUFZVyxDQUExQztBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0V5QixVQUFBLGlCQUFRQyxJQUFSLEVBQWM7QUFDWixTQUFLeEMsS0FBTCxHQUFhd0MsSUFBYjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VDLGVBQUEsc0JBQWFILEdBQWIsRUFBa0I7QUFDaEIsU0FBS2pELFVBQUwsR0FBa0JpRCxHQUFsQjtBQUNBLFNBQUt2QixZQUFMLENBQWtCLENBQWxCLElBQXVCQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLNUIsVUFBTCxHQUFrQixHQUEzQixDQUF2QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VxRCxhQUFBLG9CQUFXSixHQUFYLEVBQWdCO0FBQ2QsU0FBSy9CLFFBQUwsR0FBZ0IrQixHQUFoQjtBQUNBLFNBQUt2QixZQUFMLENBQWtCLENBQWxCLElBQXVCdUIsR0FBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFLRTtBQUNGO0FBQ0E7QUFDQTtTQUNFSyxXQUFBLGtCQUFTTCxHQUFULEVBQWM7QUFDWixTQUFLaEMsTUFBTCxHQUFjZ0MsR0FBZDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VNLGdCQUFBLHVCQUFjSixJQUFkLEVBQW9CO0FBQ2xCLFFBQUksS0FBS3RCLFdBQUwsS0FBcUJqQixrQkFBTWtCLFdBQTNCLElBQTBDcUIsSUFBSSxLQUFLdkMsa0JBQU1rQixXQUE3RCxFQUEwRTtBQUN4RSxXQUFLRyxlQUFMLEdBQXVCLElBQXZCO0FBQ0Q7O0FBQ0QsU0FBS0osV0FBTCxHQUFtQnNCLElBQW5CO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7O0FBcUJFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VLLHNCQUFBLDZCQUFvQlAsR0FBcEIsRUFBeUI7QUFDdkIsUUFBSSxLQUFLZCxpQkFBTCxLQUEyQmMsR0FBL0IsRUFBb0M7QUFDbEMsV0FBS2hCLGVBQUwsR0FBdUIsSUFBdkI7QUFDRDs7QUFDRCxTQUFLRSxpQkFBTCxHQUF5QmMsR0FBekI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFLRTtBQUNGO0FBQ0E7QUFDQTtTQUNFUSxnQkFBQSx1QkFBY1IsR0FBZCxFQUFtQjtBQUNqQixTQUFLYixXQUFMLEdBQW1CYSxHQUFuQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VTLG9CQUFBLDJCQUFrQlQsR0FBbEIsRUFBdUI7QUFDckIsU0FBS1osZUFBTCxHQUF1QlksR0FBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFLRTtBQUNGO0FBQ0E7QUFDQTtTQUNFVSxvQkFBQSwyQkFBa0JWLEdBQWxCLEVBQXVCO0FBQ3JCLFNBQUsvQyxlQUFMLEdBQXVCK0MsR0FBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFRRTtBQUNGO0FBQ0E7QUFDQTtTQUNFVyxvQkFBQSwyQkFBa0JYLEdBQWxCLEVBQXVCO0FBQ3JCLFNBQUs5QyxlQUFMLEdBQXVCOEMsR0FBdkI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFRRTtBQUNGO0FBQ0E7QUFDQTtTQUNFWSx3QkFBQSwrQkFBc0JaLEdBQXRCLEVBQTJCO0FBQ3pCLFNBQUtYLG1CQUFMLEdBQTJCVyxHQUEzQjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztBQUtFO0FBQ0Y7QUFDQTtBQUNBO1NBQ0VhLHVCQUFBLDhCQUFxQmIsR0FBckIsRUFBMEI7QUFDeEIsU0FBSzNDLGtCQUFMLEdBQTBCMkMsR0FBMUI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFLRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO1NBQ0VjLGNBQUEscUJBQVlDLEdBQVosRUFBaUJDLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0UsWUFBSixHQUFtQixJQUFuQixDQUZ1QixDQUl2Qjs7QUFDQUYsSUFBQUEsR0FBRyxDQUFDRyxTQUFKLEdBQWdCLENBQUMsQ0FBakIsQ0FMdUIsQ0FPdkI7O0FBQ0FILElBQUFBLEdBQUcsQ0FBQ0ksS0FBSixDQUFVN0MsQ0FBVixHQUFjLENBQWQ7QUFDQXlDLElBQUFBLEdBQUcsQ0FBQ0ksS0FBSixDQUFVNUMsQ0FBVixHQUFjLENBQWQ7QUFDQXdDLElBQUFBLEdBQUcsQ0FBQ0ksS0FBSixDQUFVQyxDQUFWLEdBQWMsS0FBS2xDLGlCQUFuQjtBQUNBNkIsSUFBQUEsR0FBRyxDQUFDSSxLQUFKLENBQVVFLENBQVYsR0FBYyxLQUFLbkMsaUJBQW5CLENBWHVCLENBYXZCOztBQUNBcEIscUJBQUtnQyxHQUFMLENBQVNpQixHQUFHLENBQUNsRCxNQUFiLEVBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCOztBQUNBa0QsSUFBQUEsR0FBRyxDQUFDTyxNQUFKLEdBQWEsQ0FBYjtBQUNBUCxJQUFBQSxHQUFHLENBQUNRLFFBQUosR0FBZSxDQUFmO0FBQ0FSLElBQUFBLEdBQUcsQ0FBQ1MsV0FBSixHQUFrQjdELGtCQUFNOEQsV0FBTixHQUFvQjlELGtCQUFNK0QsV0FBNUMsQ0FqQnVCLENBbUJ2Qjs7QUFDQVgsSUFBQUEsR0FBRyxDQUFDWSxPQUFKLEdBQWNYLE1BQWQ7QUFDQUQsSUFBQUEsR0FBRyxDQUFDYSxZQUFKLEdBQW1CLEtBQUs5QyxrQkFBeEIsQ0FyQnVCLENBdUJ2Qjs7QUFDQSxZQUFPLEtBQUtwQixLQUFaO0FBQ0UsV0FBS0Msa0JBQU1rRSxVQUFYO0FBQ0V2RixRQUFBQSwrQkFBK0IsQ0FBQyxJQUFELEVBQU95RSxHQUFHLENBQUNlLFFBQVgsRUFBcUJmLEdBQUcsQ0FBQ2dCLFFBQXpCLENBQS9COztBQUNBOztBQUVGLFdBQUtwRSxrQkFBTUMsaUJBQVg7QUFDRVQsUUFBQUEsc0NBQXNDLENBQUMsSUFBRCxFQUFPNEQsR0FBRyxDQUFDZSxRQUFYLEVBQXFCZixHQUFHLENBQUNnQixRQUF6QixDQUF0Qzs7QUFDQTs7QUFFRixXQUFLcEUsa0JBQU1xRSxXQUFYO0FBQ0V6RSxRQUFBQSxnQ0FBZ0MsQ0FBQyxJQUFELEVBQU93RCxHQUFHLENBQUNlLFFBQVgsRUFBcUJmLEdBQUcsQ0FBQ2dCLFFBQXpCLENBQWhDOztBQUNBOztBQUNGLFdBQUtwRSxrQkFBTXNFLGFBQVg7QUFDRTs7QUFDRjtBQUNFQyxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSw0Q0FBYjtBQWZKLEtBeEJ1QixDQTBDdkI7OztBQUNBdkYscUJBQUt3RixHQUFMLENBQVNyQixHQUFHLENBQUNzQixZQUFiLEVBQTJCdEIsR0FBRyxDQUFDZ0IsUUFBL0IsRUFBeUNoQixHQUFHLENBQUNlLFFBQTdDOztBQUNBLFNBQUt4QyxlQUFMLEdBQXVCeUIsR0FBRyxDQUFDc0IsWUFBM0I7O0FBQ0F6RixxQkFBS0MsTUFBTCxDQUFZa0UsR0FBRyxDQUFDdUIsZUFBaEIsRUFBaUN2QixHQUFHLENBQUNzQixZQUFyQyxFQTdDdUIsQ0ErQ3ZCO0FBQ0E7OztBQUVBdEIsSUFBQUEsR0FBRyxDQUFDd0IsWUFBSixHQUFtQixVQUFuQjtBQUNEOztTQUVEQyxtQ0FBQSw0Q0FBbUM7QUFDakMsU0FBSzlGLEtBQUwsQ0FBVytGLGNBQVgsQ0FBMEJ6RyxPQUExQjs7QUFDQUcscUJBQUt1RyxRQUFMLENBQWN4RyxPQUFkLEVBQXVCRixPQUF2Qjs7QUFDQThCLHFCQUFLNkUsYUFBTCxDQUFtQnRHLDBCQUFuQixFQUErQ1IsUUFBL0MsRUFBeURLLE9BQXpEOztBQUNBNEIscUJBQUs4RSxPQUFMLENBQWEsS0FBSzFFLGlCQUFsQixFQUFxQzdCLDBCQUFyQzs7QUFDQSxRQUFJd0csR0FBRyxHQUFHLEtBQUt6RSxnQkFBZjtBQUNBLFFBQUkwRSxDQUFDLEdBQUc5RyxPQUFPLENBQUM4RyxDQUFoQjtBQUNBRCxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNDLENBQUMsQ0FBQyxFQUFELENBQVY7QUFDQUQsSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTQyxDQUFDLENBQUMsRUFBRCxDQUFWO0FBQ0FELElBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0MsQ0FBQyxDQUFDLEVBQUQsQ0FBVjtBQUNEOztTQUVEQyxxQkFBQSw0QkFBbUJDLE1BQW5CLEVBQTJCO0FBQ3pCLFNBQUtqRSxVQUFMLEdBQWtCLElBQUlrRSxnQkFBSUMsU0FBUixDQUFrQkYsTUFBbEIsRUFBMEI7QUFDMUNHLE1BQUFBLEtBQUssRUFBRSxLQUFLakUsaUJBRDhCO0FBRTFDa0UsTUFBQUEsTUFBTSxFQUFFLEtBQUtsRSxpQkFGNkI7QUFHMUNtRSxNQUFBQSxNQUFNLEVBQUVKLGdCQUFJSyxpQkFIOEI7QUFJMUNDLE1BQUFBLEtBQUssRUFBRU4sZ0JBQUlPLFVBSitCO0FBSzFDQyxNQUFBQSxLQUFLLEVBQUVSLGdCQUFJTztBQUwrQixLQUExQixDQUFsQjtBQU9BLFNBQUt2RSxrQkFBTCxHQUEwQixJQUFJZ0UsZ0JBQUlTLFlBQVIsQ0FBcUJWLE1BQXJCLEVBQ3hCQyxnQkFBSVUsVUFEb0IsRUFFeEIsS0FBS3pFLGlCQUZtQixFQUd4QixLQUFLQSxpQkFIbUIsQ0FBMUI7QUFLQSxTQUFLSixrQkFBTCxHQUEwQixJQUFJbUUsZ0JBQUlXLFdBQVIsQ0FBb0JaLE1BQXBCLEVBQTRCLEtBQUs5RCxpQkFBakMsRUFBb0QsS0FBS0EsaUJBQXpELEVBQTRFO0FBQ3BHMkUsTUFBQUEsTUFBTSxFQUFFLENBQUMsS0FBSzlFLFVBQU4sQ0FENEY7QUFFcEcrRSxNQUFBQSxLQUFLLEVBQUUsS0FBSzdFO0FBRndGLEtBQTVFLENBQTFCO0FBSUQ7O1NBRUQ4RSxvQkFBQSw2QkFBb0I7QUFDbEIsUUFBSSxLQUFLaEYsVUFBVCxFQUFxQjtBQUNuQixXQUFLQSxVQUFMLENBQWdCaUYsT0FBaEI7O0FBQ0EsV0FBSy9FLGtCQUFMLENBQXdCK0UsT0FBeEI7O0FBQ0EsV0FBS2xGLGtCQUFMLENBQXdCa0YsT0FBeEI7O0FBQ0EsV0FBS2pGLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxXQUFLRSxrQkFBTCxHQUEwQixJQUExQjtBQUNBLFdBQUtILGtCQUFMLEdBQTBCLElBQTFCO0FBQ0Q7QUFDRjtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7U0FDRW1GLFNBQUEsZ0JBQU9qQixNQUFQLEVBQWU7QUFDYixTQUFLUixnQ0FBTDs7QUFFQSxRQUFJLEtBQUs1RCxXQUFMLEtBQXFCakIsa0JBQU1rQixXQUEvQixFQUE0QztBQUMxQyxXQUFLa0YsaUJBQUw7QUFDRCxLQUZELE1BRU8sSUFBSSxLQUFLL0UsZUFBVCxFQUEwQjtBQUMvQixXQUFLK0UsaUJBQUw7O0FBQ0EsV0FBS2hCLGtCQUFMLENBQXdCQyxNQUF4Qjs7QUFDQSxXQUFLaEUsZUFBTCxHQUF1QixLQUF2QjtBQUNEO0FBRUY7Ozs7U0F4V0QsZUFBWTtBQUNWLGFBQU8sS0FBS25CLE1BQVo7QUFDRDs7O1NBaUJELGVBQWdCO0FBQ2QsYUFBTyxLQUFLRSxVQUFaO0FBQ0Q7OztTQWNELGVBQVc7QUFDVCxhQUFPLEtBQUtMLEtBQVo7QUFDRDs7O1NBZUQsZUFBZ0I7QUFDZCxhQUFPLEtBQUtYLFVBQVo7QUFDRDs7O1NBZUQsZUFBYztBQUNaLGFBQU8sS0FBS2tCLFFBQVo7QUFDRDs7O1NBY0QsZUFBWTtBQUNWLGFBQU8sS0FBS0QsTUFBWjtBQUNEOzs7U0FpQkQsZUFBaUI7QUFDZixhQUFPLEtBQUtZLFdBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O1NBQ0UsZUFBZ0I7QUFDZCxhQUFPLEtBQUtHLFVBQVo7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O1NBQ0UsZUFBcUI7QUFDbkIsYUFBTyxLQUFLTyxlQUFaO0FBQ0Q7OztTQWlCRCxlQUF1QjtBQUNyQixhQUFPLEtBQUtKLGlCQUFaO0FBQ0Q7OztTQWNELGVBQWlCO0FBQ2YsYUFBTyxLQUFLQyxXQUFaO0FBQ0Q7OztTQWNELGVBQXFCO0FBQ25CLGFBQU8sS0FBS0MsZUFBWjtBQUNEOzs7U0FjRCxlQUFxQjtBQUNuQixVQUFJLEtBQUsxQixLQUFMLEtBQWVDLGtCQUFNQyxpQkFBekIsRUFBNEM7QUFDMUMsZUFBTyxHQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFLWCxlQUFaO0FBQ0Q7OztTQWNELGVBQXFCO0FBQ25CLFVBQUksS0FBS1MsS0FBTCxLQUFlQyxrQkFBTUMsaUJBQXpCLEVBQTRDO0FBQzFDLGVBQU8sR0FBUDtBQUNEOztBQUNELGFBQU8sS0FBS1YsZUFBWjtBQUNEOzs7U0FjRCxlQUF5QjtBQUN2QixhQUFPLEtBQUttQyxtQkFBWjtBQUNEOzs7U0FjRCxlQUF3QjtBQUN0QixhQUFPLEtBQUtoQyxrQkFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG5pbXBvcnQgeyBNYXQ0LCBNYXQzLCBWZWMzLCB0b1JhZGlhbiB9IGZyb20gJy4uLy4uL2NvcmUvdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgZ2Z4IGZyb20gJy4uL2dmeCc7XHJcblxyXG5pbXBvcnQgZW51bXMgZnJvbSAnLi4vZW51bXMnO1xyXG5cclxuY29uc3QgX2ZvcndhcmQgPSBjYy52MygwLCAwLCAtMSk7XHJcblxyXG5sZXQgX200X3RtcCA9IGNjLm1hdDQoKTtcclxubGV0IF9tM190bXAgPSBNYXQzLmNyZWF0ZSgpO1xyXG5sZXQgX3RyYW5zZm9ybWVkTGlnaHREaXJlY3Rpb24gPSBjYy52MygwLCAwLCAwKTtcclxuXHJcbi8vIGNvbXB1dGUgbGlnaHQgdmlld1Byb2pNYXQgZm9yIHNoYWRvdy5cclxuZnVuY3Rpb24gX2NvbXB1dGVTcG90TGlnaHRWaWV3UHJvak1hdHJpeChsaWdodCwgb3V0Vmlldywgb3V0UHJvaikge1xyXG4gIC8vIHZpZXcgbWF0cml4XHJcbiAgbGlnaHQuX25vZGUuZ2V0V29ybGRSVChvdXRWaWV3KTtcclxuICBNYXQ0LmludmVydChvdXRWaWV3LCBvdXRWaWV3KTtcclxuXHJcbiAgLy8gcHJvaiBtYXRyaXhcclxuICBNYXQ0LnBlcnNwZWN0aXZlKG91dFByb2osIGxpZ2h0Ll9zcG90QW5nbGUgKiBsaWdodC5fc3BvdEFuZ2xlU2NhbGUsIDEsIGxpZ2h0Ll9zaGFkb3dNaW5EZXB0aCwgbGlnaHQuX3NoYWRvd01heERlcHRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX2NvbXB1dGVEaXJlY3Rpb25hbExpZ2h0Vmlld1Byb2pNYXRyaXgobGlnaHQsIG91dFZpZXcsIG91dFByb2opIHtcclxuICAvLyB2aWV3IG1hdHJpeFxyXG4gIGxpZ2h0Ll9ub2RlLmdldFdvcmxkUlQob3V0Vmlldyk7XHJcbiAgTWF0NC5pbnZlcnQob3V0Vmlldywgb3V0Vmlldyk7XHJcblxyXG4gIC8vIFRPRE86IHNob3VsZCBjb21wdXRlIGRpcmVjdGlvbmFsIGxpZ2h0IGZydXN0dW0gYmFzZWQgb24gcmVuZGVyZWQgbWVzaGVzIGluIHNjZW5lLlxyXG4gIC8vIHByb2ogbWF0cml4XHJcbiAgbGV0IGhhbGZTaXplID0gbGlnaHQuX3NoYWRvd0ZydXN0dW1TaXplIC8gMjtcclxuICBNYXQ0Lm9ydGhvKG91dFByb2osIC1oYWxmU2l6ZSwgaGFsZlNpemUsIC1oYWxmU2l6ZSwgaGFsZlNpemUsIGxpZ2h0Ll9zaGFkb3dNaW5EZXB0aCwgbGlnaHQuX3NoYWRvd01heERlcHRoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX2NvbXB1dGVQb2ludExpZ2h0Vmlld1Byb2pNYXRyaXgobGlnaHQsIG91dFZpZXcsIG91dFByb2opIHtcclxuICAvLyB2aWV3IG1hdHJpeFxyXG4gIGxpZ2h0Ll9ub2RlLmdldFdvcmxkUlQob3V0Vmlldyk7XHJcbiAgTWF0NC5pbnZlcnQob3V0Vmlldywgb3V0Vmlldyk7XHJcblxyXG4gIC8vIFRoZSB0cmFuc2Zvcm1hdGlvbiBmcm9tIENhcnRlc2lhbiB0byBwb2xhciBjb29yZGluYXRlcyBpcyBub3QgYSBsaW5lYXIgZnVuY3Rpb24sXHJcbiAgLy8gc28gaXQgY2Fubm90IGJlIGFjaGlldmVkIGJ5IG1lYW5zIG9mIGEgZml4ZWQgbWF0cml4IG11bHRpcGxpY2F0aW9uLlxyXG4gIC8vIEhlcmUgd2UganVzdCB1c2UgYSBuZWFybHkgMTgwIGRlZ3JlZSBwZXJzcGVjdGl2ZSBtYXRyaXggaW5zdGVhZC5cclxuICBNYXQ0LnBlcnNwZWN0aXZlKG91dFByb2osIHRvUmFkaWFuKDE3OSksIDEsIGxpZ2h0Ll9zaGFkb3dNaW5EZXB0aCwgbGlnaHQuX3NoYWRvd01heERlcHRoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBsaWdodCBzb3VyY2UuXHJcbiAqIENvdWxkIGJlIGEgcG9pbnQgbGlnaHQsIGEgc3BvdCBsaWdodCBvciBhIGRpcmVjdGlvbmFsIGxpZ2h0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlnaHQge1xyXG4gIC8qKlxyXG4gICAqIFNldHVwIGEgZGVmYXVsdCBkaXJlY3Rpb25hbCBsaWdodCB3aXRoIG5vIHNoYWRvd3NcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3Bvb2xJRCA9IC0xO1xyXG4gICAgdGhpcy5fbm9kZSA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5fdHlwZSA9IGVudW1zLkxJR0hUX0RJUkVDVElPTkFMO1xyXG5cclxuICAgIHRoaXMuX2NvbG9yID0gbmV3IFZlYzMoMSwgMSwgMSk7XHJcbiAgICB0aGlzLl9pbnRlbnNpdHkgPSAxO1xyXG5cclxuICAgIC8vIHVzZWQgZm9yIHNwb3QgYW5kIHBvaW50IGxpZ2h0XHJcbiAgICB0aGlzLl9yYW5nZSA9IDE7XHJcbiAgICAvLyB1c2VkIGZvciBzcG90IGxpZ2h0LCBkZWZhdWx0IHRvIDYwIGRlZ3JlZXNcclxuICAgIHRoaXMuX3Nwb3RBbmdsZSA9IHRvUmFkaWFuKDYwKTtcclxuICAgIHRoaXMuX3Nwb3RFeHAgPSAxO1xyXG4gICAgLy8gY2FjaGVkIGZvciB1bmlmb3JtXHJcbiAgICB0aGlzLl9kaXJlY3Rpb25Vbmlmb3JtID0gbmV3IEZsb2F0MzJBcnJheSgzKTtcclxuICAgIHRoaXMuX3Bvc2l0aW9uVW5pZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoMyk7XHJcbiAgICB0aGlzLl9jb2xvclVuaWZvcm0gPSBuZXcgRmxvYXQzMkFycmF5KFt0aGlzLl9jb2xvci54ICogdGhpcy5faW50ZW5zaXR5LCB0aGlzLl9jb2xvci55ICogdGhpcy5faW50ZW5zaXR5LCB0aGlzLl9jb2xvci56ICogdGhpcy5faW50ZW5zaXR5XSk7XHJcbiAgICB0aGlzLl9zcG90VW5pZm9ybSA9IG5ldyBGbG9hdDMyQXJyYXkoW01hdGguY29zKHRoaXMuX3Nwb3RBbmdsZSAqIDAuNSksIHRoaXMuX3Nwb3RFeHBdKTtcclxuXHJcbiAgICAvLyBzaGFkb3cgcGFyYW1zXHJcbiAgICB0aGlzLl9zaGFkb3dUeXBlID0gZW51bXMuU0hBRE9XX05PTkU7XHJcbiAgICB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlciA9IG51bGw7XHJcbiAgICB0aGlzLl9zaGFkb3dNYXAgPSBudWxsO1xyXG4gICAgdGhpcy5fc2hhZG93TWFwRGlydHkgPSBmYWxzZTtcclxuICAgIHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyID0gbnVsbDtcclxuICAgIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24gPSAxMDI0O1xyXG4gICAgdGhpcy5fc2hhZG93QmlhcyA9IDAuMDAwNTtcclxuICAgIHRoaXMuX3NoYWRvd0RhcmtuZXNzID0gMTtcclxuICAgIHRoaXMuX3NoYWRvd01pbkRlcHRoID0gMTtcclxuICAgIHRoaXMuX3NoYWRvd01heERlcHRoID0gMTAwMDtcclxuICAgIHRoaXMuX2ZydXN0dW1FZGdlRmFsbG9mZiA9IDA7IC8vIHVzZWQgYnkgZGlyZWN0aW9uYWwgYW5kIHNwb3QgbGlnaHQuXHJcbiAgICB0aGlzLl92aWV3UHJvak1hdHJpeCA9IGNjLm1hdDQoKTtcclxuICAgIHRoaXMuX3Nwb3RBbmdsZVNjYWxlID0gMTsgLy8gdXNlZCBmb3Igc3BvdCBsaWdodC5cclxuICAgIHRoaXMuX3NoYWRvd0ZydXN0dW1TaXplID0gNTA7IC8vIHVzZWQgZm9yIGRpcmVjdGlvbmFsIGxpZ2h0LlxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBob3N0aW5nIG5vZGUgb2YgdGhpcyBjYW1lcmFcclxuICAgKiBAcmV0dXJucyB7Tm9kZX0gdGhlIGhvc3Rpbmcgbm9kZVxyXG4gICAqL1xyXG4gIGdldE5vZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbm9kZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgaG9zdGluZyBub2RlIG9mIHRoaXMgY2FtZXJhXHJcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIHRoZSBob3N0aW5nIG5vZGVcclxuICAgKi9cclxuICBzZXROb2RlKG5vZGUpIHtcclxuICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSBjb2xvciBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHIgcmVkIGNoYW5uZWwgb2YgdGhlIGxpZ2h0IGNvbG9yXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGcgZ3JlZW4gY2hhbm5lbCBvZiB0aGUgbGlnaHQgY29sb3JcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYiBibHVlIGNoYW5uZWwgb2YgdGhlIGxpZ2h0IGNvbG9yXHJcbiAgICovXHJcbiAgc2V0Q29sb3IociwgZywgYikge1xyXG4gICAgVmVjMy5zZXQodGhpcy5fY29sb3IsIHIsIGcsIGIpO1xyXG4gICAgdGhpcy5fY29sb3JVbmlmb3JtWzBdID0gciAqIHRoaXMuX2ludGVuc2l0eTtcclxuICAgIHRoaXMuX2NvbG9yVW5pZm9ybVsxXSA9IGcgKiB0aGlzLl9pbnRlbnNpdHk7XHJcbiAgICB0aGlzLl9jb2xvclVuaWZvcm1bMl0gPSBiICogdGhpcy5faW50ZW5zaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRoZSBjb2xvciBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHJldHVybnMge1ZlYzN9IHRoZSBsaWdodCBjb2xvclxyXG4gICAqL1xyXG4gIGdldCBjb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgaW50ZW5zaXR5IG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIHRoZSBsaWdodCBpbnRlbnNpdHlcclxuICAgKi9cclxuICBzZXRJbnRlbnNpdHkodmFsKSB7XHJcbiAgICB0aGlzLl9pbnRlbnNpdHkgPSB2YWw7XHJcbiAgICB0aGlzLl9jb2xvclVuaWZvcm1bMF0gPSB2YWwgKiB0aGlzLl9jb2xvci54O1xyXG4gICAgdGhpcy5fY29sb3JVbmlmb3JtWzFdID0gdmFsICogdGhpcy5fY29sb3IueTtcclxuICAgIHRoaXMuX2NvbG9yVW5pZm9ybVsyXSA9IHZhbCAqIHRoaXMuX2NvbG9yLno7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIGludGVuc2l0eSBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHJldHVybnMge251bWJlcn0gdGhlIGxpZ2h0IGludGVuc2l0eVxyXG4gICAqL1xyXG4gIGdldCBpbnRlbnNpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW50ZW5zaXR5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSB0eXBlIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSBsaWdodCBzb3VyY2UgdHlwZVxyXG4gICAqL1xyXG4gIHNldFR5cGUodHlwZSkge1xyXG4gICAgdGhpcy5fdHlwZSA9IHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIHR5cGUgb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSB0eXBlXHJcbiAgICovXHJcbiAgZ2V0IHR5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgc3BvdCBsaWdodCBhbmdsZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgc3BvdCBsaWdodCBhbmdsZVxyXG4gICAqL1xyXG4gIHNldFNwb3RBbmdsZSh2YWwpIHtcclxuICAgIHRoaXMuX3Nwb3RBbmdsZSA9IHZhbDtcclxuICAgIHRoaXMuX3Nwb3RVbmlmb3JtWzBdID0gTWF0aC5jb3ModGhpcy5fc3BvdEFuZ2xlICogMC41KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc3BvdCBsaWdodCBhbmdsZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHNwb3QgbGlnaHQgYW5nbGVcclxuICAgKi9cclxuICBnZXQgc3BvdEFuZ2xlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nwb3RBbmdsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgc3BvdCBsaWdodCBleHBvbmVudGlhbFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgc3BvdCBsaWdodCBleHBvbmVudGlhbFxyXG4gICAqL1xyXG4gIHNldFNwb3RFeHAodmFsKSB7XHJcbiAgICB0aGlzLl9zcG90RXhwID0gdmFsO1xyXG4gICAgdGhpcy5fc3BvdFVuaWZvcm1bMV0gPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIHNwb3QgbGlnaHQgZXhwb25lbnRpYWxcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBzcG90IGxpZ2h0IGV4cG9uZW50aWFsXHJcbiAgICovXHJcbiAgZ2V0IHNwb3RFeHAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3BvdEV4cDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgcmFuZ2Ugb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB2YWwgbGlnaHQgc291cmNlIHJhbmdlXHJcbiAgICovXHJcbiAgc2V0UmFuZ2UodmFsKSB7XHJcbiAgICB0aGlzLl9yYW5nZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgcmFuZ2Ugb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IHJhbmdlIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKi9cclxuICBnZXQgcmFuZ2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgdGhlIHNoYWRvdyB0eXBlIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSBsaWdodCBzb3VyY2Ugc2hhZG93IHR5cGVcclxuICAgKi9cclxuICBzZXRTaGFkb3dUeXBlKHR5cGUpIHtcclxuICAgIGlmICh0aGlzLl9zaGFkb3dUeXBlID09PSBlbnVtcy5TSEFET1dfTk9ORSAmJiB0eXBlICE9PSBlbnVtcy5TSEFET1dfTk9ORSkge1xyXG4gICAgICB0aGlzLl9zaGFkb3dNYXBEaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zaGFkb3dUeXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc2hhZG93IHR5cGUgb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgdHlwZVxyXG4gICAqL1xyXG4gIGdldCBzaGFkb3dUeXBlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd1R5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIHNoYWRvd21hcCBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHJldHVybnMge1RleHR1cmUyRH0gbGlnaHQgc291cmNlIHNoYWRvd21hcFxyXG4gICAqL1xyXG4gIGdldCBzaGFkb3dNYXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hhZG93TWFwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZ2V0IHRoZSB2aWV3LXByb2plY3Rpb24gbWF0cml4IG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyB7TWF0NH0gbGlnaHQgc291cmNlIHZpZXctcHJvamVjdGlvbiBtYXRyaXhcclxuICAgKi9cclxuICBnZXQgdmlld1Byb2pNYXRyaXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlld1Byb2pNYXRyaXg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgdGhlIHNoYWRvdyByZXNvbHV0aW9uIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIHNldFNoYWRvd1Jlc29sdXRpb24odmFsKSB7XHJcbiAgICBpZiAodGhpcy5fc2hhZG93UmVzb2x1dGlvbiAhPT0gdmFsKSB7XHJcbiAgICAgIHRoaXMuX3NoYWRvd01hcERpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24gPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIHNoYWRvdyByZXNvbHV0aW9uIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBsaWdodCBzb3VyY2Ugc2hhZG93IHJlc29sdXRpb25cclxuICAgKi9cclxuICBnZXQgc2hhZG93UmVzb2x1dGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSBzaGFkb3cgYmlhcyBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBsaWdodCBzb3VyY2Ugc2hhZG93IGJpYXNcclxuICAgKi9cclxuICBzZXRTaGFkb3dCaWFzKHZhbCkge1xyXG4gICAgdGhpcy5fc2hhZG93QmlhcyA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc2hhZG93IGJpYXMgb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgYmlhc1xyXG4gICAqL1xyXG4gIGdldCBzaGFkb3dCaWFzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd0JpYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgdGhlIHNoYWRvdyBkYXJrbmVzcyBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBsaWdodCBzb3VyY2Ugc2hhZG93IGRhcmtuZXNzXHJcbiAgICovXHJcbiAgc2V0U2hhZG93RGFya25lc3ModmFsKSB7XHJcbiAgICB0aGlzLl9zaGFkb3dEYXJrbmVzcyA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc2hhZG93IGRhcmtuZXNzIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBsaWdodCBzb3VyY2Ugc2hhZG93IGRhcmtuZXNzXHJcbiAgICovXHJcbiAgZ2V0IHNoYWRvd0RhcmtuZXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoYWRvd0RhcmtuZXNzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSBzaGFkb3cgbWluIGRlcHRoIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgbWluIGRlcHRoXHJcbiAgICovXHJcbiAgc2V0U2hhZG93TWluRGVwdGgodmFsKSB7XHJcbiAgICB0aGlzLl9zaGFkb3dNaW5EZXB0aCA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc2hhZG93IG1pbiBkZXB0aCBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHJldHVybnMge251bWJlcn0gbGlnaHQgc291cmNlIHNoYWRvdyBtaW4gZGVwdGhcclxuICAgKi9cclxuICBnZXQgc2hhZG93TWluRGVwdGgoKSB7XHJcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gZW51bXMuTElHSFRfRElSRUNUSU9OQUwpIHtcclxuICAgICAgcmV0dXJuIDEuMDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9zaGFkb3dNaW5EZXB0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCB0aGUgc2hhZG93IG1heCBkZXB0aCBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHZhbCBsaWdodCBzb3VyY2Ugc2hhZG93IG1heCBkZXB0aFxyXG4gICAqL1xyXG4gIHNldFNoYWRvd01heERlcHRoKHZhbCkge1xyXG4gICAgdGhpcy5fc2hhZG93TWF4RGVwdGggPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBnZXQgdGhlIHNoYWRvdyBtYXggZGVwdGggb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBzaGFkb3cgbWF4IGRlcHRoXHJcbiAgICovXHJcbiAgZ2V0IHNoYWRvd01heERlcHRoKCkge1xyXG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IGVudW1zLkxJR0hUX0RJUkVDVElPTkFMKSB7XHJcbiAgICAgIHJldHVybiAxLjA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fc2hhZG93TWF4RGVwdGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXQgdGhlIGZydXN0dW0gZWRnZSBmYWxsb2ZmIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBmcnVzdHVtIGVkZ2UgZmFsbG9mZlxyXG4gICAqL1xyXG4gIHNldEZydXN0dW1FZGdlRmFsbG9mZih2YWwpIHtcclxuICAgIHRoaXMuX2ZydXN0dW1FZGdlRmFsbG9mZiA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgZnJ1c3R1bSBlZGdlIGZhbGxvZmYgb2YgdGhlIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IGxpZ2h0IHNvdXJjZSBmcnVzdHVtIGVkZ2UgZmFsbG9mZlxyXG4gICAqL1xyXG4gIGdldCBmcnVzdHVtRWRnZUZhbGxvZmYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZnJ1c3R1bUVkZ2VGYWxsb2ZmO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSBzaGFkb3cgZnJ1c3R1bSBzaXplIG9mIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdmFsIGxpZ2h0IHNvdXJjZSBzaGFkb3cgZnJ1c3R1bSBzaXplXHJcbiAgICovXHJcbiAgc2V0U2hhZG93RnJ1c3R1bVNpemUodmFsKSB7XHJcbiAgICB0aGlzLl9zaGFkb3dGcnVzdHVtU2l6ZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGdldCB0aGUgc2hhZG93IGZydXN0dW0gc2l6ZSBvZiB0aGUgbGlnaHQgc291cmNlXHJcbiAgICogQHJldHVybnMge251bWJlcn0gbGlnaHQgc291cmNlIHNoYWRvdyBmcnVzdHVtIHNpemVcclxuICAgKi9cclxuICBnZXQgc2hhZG93RnJ1c3R1bVNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hhZG93RnJ1c3R1bVNpemU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBleHRyYWN0IGEgdmlldyBvZiB0aGlzIGxpZ2h0IHNvdXJjZVxyXG4gICAqIEBwYXJhbSB7Vmlld30gb3V0IHRoZSByZWNlaXZpbmcgdmlld1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHN0YWdlcyB0aGUgc3RhZ2VzIHVzaW5nIHRoZSB2aWV3XHJcbiAgICovXHJcbiAgZXh0cmFjdFZpZXcob3V0LCBzdGFnZXMpIHtcclxuICAgIC8vIFRPRE86IHZpZXcgc2hvdWxkIG5vdCBoYW5kbGUgbGlnaHQuXHJcbiAgICBvdXQuX3NoYWRvd0xpZ2h0ID0gdGhpcztcclxuXHJcbiAgICAvLyBwcmlvcml0eS4gVE9ETzogdXNlIHZhcnlpbmcgdmFsdWUgZm9yIHNoYWRvdyB2aWV3P1xyXG4gICAgb3V0Ll9wcmlvcml0eSA9IC0xO1xyXG5cclxuICAgIC8vIHJlY3RcclxuICAgIG91dC5fcmVjdC54ID0gMDtcclxuICAgIG91dC5fcmVjdC55ID0gMDtcclxuICAgIG91dC5fcmVjdC53ID0gdGhpcy5fc2hhZG93UmVzb2x1dGlvbjtcclxuICAgIG91dC5fcmVjdC5oID0gdGhpcy5fc2hhZG93UmVzb2x1dGlvbjtcclxuXHJcbiAgICAvLyBjbGVhciBvcHRzXHJcbiAgICBWZWMzLnNldChvdXQuX2NvbG9yLCAxLCAxLCAxKTtcclxuICAgIG91dC5fZGVwdGggPSAxO1xyXG4gICAgb3V0Ll9zdGVuY2lsID0gMTtcclxuICAgIG91dC5fY2xlYXJGbGFncyA9IGVudW1zLkNMRUFSX0NPTE9SIHwgZW51bXMuQ0xFQVJfREVQVEg7XHJcblxyXG4gICAgLy8gc3RhZ2VzICYgZnJhbWVidWZmZXJcclxuICAgIG91dC5fc3RhZ2VzID0gc3RhZ2VzO1xyXG4gICAgb3V0Ll9mcmFtZWJ1ZmZlciA9IHRoaXMuX3NoYWRvd0ZyYW1lQnVmZmVyO1xyXG5cclxuICAgIC8vIHZpZXcgcHJvamVjdGlvbiBtYXRyaXhcclxuICAgIHN3aXRjaCh0aGlzLl90eXBlKSB7XHJcbiAgICAgIGNhc2UgZW51bXMuTElHSFRfU1BPVDpcclxuICAgICAgICBfY29tcHV0ZVNwb3RMaWdodFZpZXdQcm9qTWF0cml4KHRoaXMsIG91dC5fbWF0Vmlldywgb3V0Ll9tYXRQcm9qKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgZW51bXMuTElHSFRfRElSRUNUSU9OQUw6XHJcbiAgICAgICAgX2NvbXB1dGVEaXJlY3Rpb25hbExpZ2h0Vmlld1Byb2pNYXRyaXgodGhpcywgb3V0Ll9tYXRWaWV3LCBvdXQuX21hdFByb2opO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSBlbnVtcy5MSUdIVF9QT0lOVDpcclxuICAgICAgICBfY29tcHV0ZVBvaW50TGlnaHRWaWV3UHJvak1hdHJpeCh0aGlzLCBvdXQuX21hdFZpZXcsIG91dC5fbWF0UHJvaik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgZW51bXMuTElHSFRfQU1CSUVOVDpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLndhcm4oJ3NoYWRvdyBvZiB0aGlzIGxpZ2h0IHR5cGUgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZpZXctcHJvamVjdGlvblxyXG4gICAgTWF0NC5tdWwob3V0Ll9tYXRWaWV3UHJvaiwgb3V0Ll9tYXRQcm9qLCBvdXQuX21hdFZpZXcpO1xyXG4gICAgdGhpcy5fdmlld1Byb2pNYXRyaXggPSBvdXQuX21hdFZpZXdQcm9qO1xyXG4gICAgTWF0NC5pbnZlcnQob3V0Ll9tYXRJbnZWaWV3UHJvaiwgb3V0Ll9tYXRWaWV3UHJvaik7XHJcblxyXG4gICAgLy8gdXBkYXRlIHZpZXcncyBmcnVzdHVtXHJcbiAgICAvLyBvdXQuX2ZydXN0dW0udXBkYXRlKG91dC5fbWF0Vmlld1Byb2osIG91dC5fbWF0SW52Vmlld1Byb2opO1xyXG5cclxuICAgIG91dC5fY3VsbGluZ01hc2sgPSAweGZmZmZmZmZmO1xyXG4gIH1cclxuXHJcbiAgX3VwZGF0ZUxpZ2h0UG9zaXRpb25BbmREaXJlY3Rpb24oKSB7XHJcbiAgICB0aGlzLl9ub2RlLmdldFdvcmxkTWF0cml4KF9tNF90bXApO1xyXG4gICAgTWF0My5mcm9tTWF0NChfbTNfdG1wLCBfbTRfdG1wKTtcclxuICAgIFZlYzMudHJhbnNmb3JtTWF0MyhfdHJhbnNmb3JtZWRMaWdodERpcmVjdGlvbiwgX2ZvcndhcmQsIF9tM190bXApO1xyXG4gICAgVmVjMy50b0FycmF5KHRoaXMuX2RpcmVjdGlvblVuaWZvcm0sIF90cmFuc2Zvcm1lZExpZ2h0RGlyZWN0aW9uKTtcclxuICAgIGxldCBwb3MgPSB0aGlzLl9wb3NpdGlvblVuaWZvcm07XHJcbiAgICBsZXQgbSA9IF9tNF90bXAubTtcclxuICAgIHBvc1swXSA9IG1bMTJdO1xyXG4gICAgcG9zWzFdID0gbVsxM107XHJcbiAgICBwb3NbMl0gPSBtWzE0XTtcclxuICB9XHJcblxyXG4gIF9nZW5lcmF0ZVNoYWRvd01hcChkZXZpY2UpIHtcclxuICAgIHRoaXMuX3NoYWRvd01hcCA9IG5ldyBnZnguVGV4dHVyZTJEKGRldmljZSwge1xyXG4gICAgICB3aWR0aDogdGhpcy5fc2hhZG93UmVzb2x1dGlvbixcclxuICAgICAgaGVpZ2h0OiB0aGlzLl9zaGFkb3dSZXNvbHV0aW9uLFxyXG4gICAgICBmb3JtYXQ6IGdmeC5URVhUVVJFX0ZNVF9SR0JBOCxcclxuICAgICAgd3JhcFM6IGdmeC5XUkFQX0NMQU1QLFxyXG4gICAgICB3cmFwVDogZ2Z4LldSQVBfQ0xBTVAsXHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyID0gbmV3IGdmeC5SZW5kZXJCdWZmZXIoZGV2aWNlLFxyXG4gICAgICBnZnguUkJfRk1UX0QxNixcclxuICAgICAgdGhpcy5fc2hhZG93UmVzb2x1dGlvbixcclxuICAgICAgdGhpcy5fc2hhZG93UmVzb2x1dGlvblxyXG4gICAgKTtcclxuICAgIHRoaXMuX3NoYWRvd0ZyYW1lQnVmZmVyID0gbmV3IGdmeC5GcmFtZUJ1ZmZlcihkZXZpY2UsIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24sIHRoaXMuX3NoYWRvd1Jlc29sdXRpb24sIHtcclxuICAgICAgY29sb3JzOiBbdGhpcy5fc2hhZG93TWFwXSxcclxuICAgICAgZGVwdGg6IHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfZGVzdHJveVNoYWRvd01hcCgpIHtcclxuICAgIGlmICh0aGlzLl9zaGFkb3dNYXApIHtcclxuICAgICAgdGhpcy5fc2hhZG93TWFwLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fc2hhZG93RGVwdGhCdWZmZXIuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9zaGFkb3dGcmFtZUJ1ZmZlci5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX3NoYWRvd01hcCA9IG51bGw7XHJcbiAgICAgIHRoaXMuX3NoYWRvd0RlcHRoQnVmZmVyID0gbnVsbDtcclxuICAgICAgdGhpcy5fc2hhZG93RnJhbWVCdWZmZXIgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXBkYXRlIHRoZSBsaWdodCBzb3VyY2VcclxuICAgKiBAcGFyYW0ge0RldmljZX0gZGV2aWNlIHRoZSByZW5kZXJpbmcgZGV2aWNlXHJcbiAgICovXHJcbiAgdXBkYXRlKGRldmljZSkge1xyXG4gICAgdGhpcy5fdXBkYXRlTGlnaHRQb3NpdGlvbkFuZERpcmVjdGlvbigpO1xyXG5cclxuICAgIGlmICh0aGlzLl9zaGFkb3dUeXBlID09PSBlbnVtcy5TSEFET1dfTk9ORSkge1xyXG4gICAgICB0aGlzLl9kZXN0cm95U2hhZG93TWFwKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NoYWRvd01hcERpcnR5KSB7XHJcbiAgICAgIHRoaXMuX2Rlc3Ryb3lTaGFkb3dNYXAoKTtcclxuICAgICAgdGhpcy5fZ2VuZXJhdGVTaGFkb3dNYXAoZGV2aWNlKTtcclxuICAgICAgdGhpcy5fc2hhZG93TWFwRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9