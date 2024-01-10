
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/renderers/forward-renderer.js';
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

var _baseRenderer = _interopRequireDefault(require("../core/base-renderer"));

var _enums = _interopRequireDefault(require("../enums"));

var _memop = require("../memop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _a16_view = new Float32Array(16);

var _a16_view_inv = new Float32Array(16);

var _a16_proj = new Float32Array(16);

var _a16_viewProj = new Float32Array(16);

var _a4_camPos = new Float32Array(4);

var _a64_shadow_lightViewProj = new Float32Array(64);

var _a16_shadow_lightViewProjs = [];

var _a4_shadow_info = new Float32Array(4);

var _camPos = new _valueTypes.Vec4(0, 0, 0, 0);

var _camFwd = new _valueTypes.Vec3(0, 0, 0);

var _v3_tmp1 = new _valueTypes.Vec3(0, 0, 0);

var CC_MAX_LIGHTS = 4;
var CC_MAX_SHADOW_LIGHTS = 2;

var _float16_pool = new _memop.RecyclePool(function () {
  return new Float32Array(16);
}, 8);

function sortView(a, b) {
  return a._priority - b._priority;
}

var ForwardRenderer = /*#__PURE__*/function (_BaseRenderer) {
  _inheritsLoose(ForwardRenderer, _BaseRenderer);

  function ForwardRenderer(device, builtin) {
    var _this;

    _this = _BaseRenderer.call(this, device, builtin) || this;
    _this._time = new Float32Array(4);
    _this._lights = [];
    _this._shadowLights = [];
    _this._numLights = 0;
    _this._defines = {};

    _this._registerStage('shadowcast', _this._shadowStage.bind(_assertThisInitialized(_this)));

    _this._registerStage('opaque', _this._opaqueStage.bind(_assertThisInitialized(_this)));

    _this._registerStage('transparent', _this._transparentStage.bind(_assertThisInitialized(_this)));

    return _this;
  }

  var _proto = ForwardRenderer.prototype;

  _proto.reset = function reset() {
    _float16_pool.reset();

    _BaseRenderer.prototype.reset.call(this);
  };

  _proto.render = function render(scene, dt) {
    this.reset();

    if (!CC_EDITOR) {
      if (dt) {
        this._time[0] += dt;
        this._time[1] = dt;
        this._time[2]++;
      }

      this._device.setUniform('cc_time', this._time);
    }

    this._updateLights(scene);

    var canvas = this._device._gl.canvas;

    for (var i = 0; i < scene._cameras.length; ++i) {
      var view = this._requestView();

      var width = canvas.width;
      var height = canvas.height;
      var camera = scene._cameras.data[i];
      camera.extractView(view, width, height);
    } // render by cameras


    this._viewPools.sort(sortView);

    for (var _i = 0; _i < this._viewPools.length; ++_i) {
      var _view = this._viewPools.data[_i];

      this._render(_view, scene);
    }
  } // direct render a single camera
  ;

  _proto.renderCamera = function renderCamera(camera, scene) {
    this.reset();

    this._updateLights(scene);

    var canvas = this._device._gl.canvas;
    var width = canvas.width;
    var height = canvas.height;

    var view = this._requestView();

    camera.extractView(view, width, height); // render by cameras

    this._viewPools.sort(sortView);

    for (var i = 0; i < this._viewPools.length; ++i) {
      var _view2 = this._viewPools.data[i];

      this._render(_view2, scene);
    }
  };

  _proto._updateLights = function _updateLights(scene) {
    this._lights.length = 0;
    this._shadowLights.length = 0;
    var lights = scene._lights;

    for (var i = 0; i < lights.length; ++i) {
      var light = lights.data[i];
      light.update(this._device);

      if (light.shadowType !== _enums["default"].SHADOW_NONE) {
        if (this._shadowLights.length < CC_MAX_SHADOW_LIGHTS) {
          this._shadowLights.splice(0, 0, light);
        }

        var view = this._requestView();

        light.extractView(view, ['shadowcast']);

        this._lights.splice(0, 0, light);
      } else {
        this._lights.push(light);
      }
    }

    this._updateLightDefines();

    this._numLights = lights._count;
  };

  _proto._updateLightDefines = function _updateLightDefines() {
    var defines = this._defines;

    for (var i = 0; i < this._lights.length; ++i) {
      var light = this._lights[i];
      var lightKey = "CC_LIGHT_" + i + "_TYPE";
      var shadowKey = "CC_SHADOW_" + i + "_TYPE";

      if (defines[lightKey] !== light._type) {
        defines[lightKey] = light._type;
        this._definesChanged = true;
      }

      if (defines[shadowKey] !== light._shadowType) {
        defines[shadowKey] = light._shadowType;
        this._definesChanged = true;
      }
    }

    var newCount = Math.min(CC_MAX_LIGHTS, this._lights.length);

    if (defines.CC_NUM_LIGHTS !== newCount) {
      defines.CC_NUM_LIGHTS = newCount;
      this._definesChanged = true;
    }

    newCount = Math.min(CC_MAX_LIGHTS, this._shadowLights.length);

    if (defines.CC_NUM_SHADOW_LIGHTS !== newCount) {
      defines.CC_NUM_SHADOW_LIGHTS = newCount;
      this._definesChanged = true;
    }
  };

  _proto._submitLightsUniforms = function _submitLightsUniforms() {
    var device = this._device;

    if (this._lights.length > 0) {
      var positionAndRanges = _float16_pool.add();

      var directions = _float16_pool.add();

      var colors = _float16_pool.add();

      var lightNum = Math.min(CC_MAX_LIGHTS, this._lights.length);

      for (var i = 0; i < lightNum; ++i) {
        var light = this._lights[i];
        var index = i * 4;
        colors.set(light._colorUniform, index);
        directions.set(light._directionUniform, index);
        positionAndRanges.set(light._positionUniform, index);
        positionAndRanges[index + 3] = light._range;

        if (light._type === _enums["default"].LIGHT_SPOT) {
          directions[index + 3] = light._spotUniform[0];
          colors[index + 3] = light._spotUniform[1];
        } else {
          directions[index + 3] = 0;
          colors[index + 3] = 0;
        }
      }

      device.setUniform('cc_lightDirection', directions);
      device.setUniform('cc_lightColor', colors);
      device.setUniform('cc_lightPositionAndRange', positionAndRanges);
    }
  };

  _proto._submitShadowStageUniforms = function _submitShadowStageUniforms(view) {
    var light = view._shadowLight;
    var shadowInfo = _a4_shadow_info;
    shadowInfo[0] = light.shadowMinDepth;
    shadowInfo[1] = light.shadowMaxDepth;
    shadowInfo[2] = light.shadowDepthScale;
    shadowInfo[3] = light.shadowDarkness;

    this._device.setUniform('cc_shadow_map_lightViewProjMatrix', _valueTypes.Mat4.toArray(_a16_viewProj, view._matViewProj));

    this._device.setUniform('cc_shadow_map_info', shadowInfo);

    this._device.setUniform('cc_shadow_map_bias', light.shadowBias);

    this._defines.CC_SHADOW_TYPE = light._shadowType;
  };

  _proto._submitOtherStagesUniforms = function _submitOtherStagesUniforms() {
    var shadowInfo = _float16_pool.add();

    for (var i = 0; i < this._shadowLights.length; ++i) {
      var light = this._shadowLights[i];
      var view = _a16_shadow_lightViewProjs[i];

      if (!view) {
        view = _a16_shadow_lightViewProjs[i] = new Float32Array(_a64_shadow_lightViewProj.buffer, i * 64, 16);
      }

      _valueTypes.Mat4.toArray(view, light.viewProjMatrix);

      var index = i * 4;
      shadowInfo[index] = light.shadowMinDepth;
      shadowInfo[index + 1] = light.shadowMaxDepth;
      shadowInfo[index + 2] = light._shadowResolution;
      shadowInfo[index + 3] = light.shadowDarkness;
    }

    this._device.setUniform("cc_shadow_lightViewProjMatrix", _a64_shadow_lightViewProj);

    this._device.setUniform("cc_shadow_info", shadowInfo); // this._device.setUniform(`cc_frustumEdgeFalloff_${index}`, light.frustumEdgeFalloff);

  };

  _proto._sortItems = function _sortItems(items) {
    // sort items
    items.sort(function (a, b) {
      // if (a.layer !== b.layer) {
      //   return a.layer - b.layer;
      // }
      if (a.passes.length !== b.passes.length) {
        return a.passes.length - b.passes.length;
      }

      return a.sortKey - b.sortKey;
    });
  };

  _proto._shadowStage = function _shadowStage(view, items) {
    // update rendering
    this._submitShadowStageUniforms(view); // this._sortItems(items);
    // draw it


    for (var i = 0; i < items.length; ++i) {
      var item = items.data[i];

      if (item.effect.getDefine('CC_CASTING_SHADOW')) {
        this._draw(item);
      }
    }
  };

  _proto._drawItems = function _drawItems(view, items) {
    var shadowLights = this._shadowLights;

    if (shadowLights.length === 0 && this._numLights === 0) {
      for (var i = 0; i < items.length; ++i) {
        var item = items.data[i];

        this._draw(item);
      }
    } else {
      for (var _i2 = 0; _i2 < items.length; ++_i2) {
        var _item = items.data[_i2];

        for (var shadowIdx = 0; shadowIdx < shadowLights.length; ++shadowIdx) {
          this._device.setTexture('cc_shadow_map_' + shadowIdx, shadowLights[shadowIdx].shadowMap, this._allocTextureUnit());
        }

        this._draw(_item);
      }
    }
  };

  _proto._opaqueStage = function _opaqueStage(view, items) {
    view.getPosition(_camPos); // update uniforms

    this._device.setUniform('cc_matView', _valueTypes.Mat4.toArray(_a16_view, view._matView));

    this._device.setUniform('cc_matViewInv', _valueTypes.Mat4.toArray(_a16_view_inv, view._matViewInv));

    this._device.setUniform('cc_matProj', _valueTypes.Mat4.toArray(_a16_proj, view._matProj));

    this._device.setUniform('cc_matViewProj', _valueTypes.Mat4.toArray(_a16_viewProj, view._matViewProj));

    this._device.setUniform('cc_cameraPos', _valueTypes.Vec4.toArray(_a4_camPos, _camPos)); // update rendering


    this._submitLightsUniforms();

    this._submitOtherStagesUniforms();

    this._drawItems(view, items);
  };

  _proto._transparentStage = function _transparentStage(view, items) {
    view.getPosition(_camPos);
    view.getForward(_camFwd); // update uniforms

    this._device.setUniform('cc_matView', _valueTypes.Mat4.toArray(_a16_view, view._matView));

    this._device.setUniform('cc_matViewInv', _valueTypes.Mat4.toArray(_a16_view_inv, view._matViewInv));

    this._device.setUniform('cc_matProj', _valueTypes.Mat4.toArray(_a16_proj, view._matProj));

    this._device.setUniform('cc_matViewProj', _valueTypes.Mat4.toArray(_a16_viewProj, view._matViewProj));

    this._device.setUniform('cc_cameraPos', _valueTypes.Vec4.toArray(_a4_camPos, _camPos));

    this._submitLightsUniforms();

    this._submitOtherStagesUniforms(); // calculate zdist


    for (var i = 0; i < items.length; ++i) {
      var item = items.data[i]; // TODO: we should use mesh center instead!

      item.node.getWorldPosition(_v3_tmp1);

      _valueTypes.Vec3.sub(_v3_tmp1, _v3_tmp1, _camPos);

      item.sortKey = -_valueTypes.Vec3.dot(_v3_tmp1, _camFwd);
    }

    this._sortItems(items);

    this._drawItems(view, items);
  };

  return ForwardRenderer;
}(_baseRenderer["default"]);

exports["default"] = ForwardRenderer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxyZW5kZXJlcnNcXGZvcndhcmQtcmVuZGVyZXIuanMiXSwibmFtZXMiOlsiX2ExNl92aWV3IiwiRmxvYXQzMkFycmF5IiwiX2ExNl92aWV3X2ludiIsIl9hMTZfcHJvaiIsIl9hMTZfdmlld1Byb2oiLCJfYTRfY2FtUG9zIiwiX2E2NF9zaGFkb3dfbGlnaHRWaWV3UHJvaiIsIl9hMTZfc2hhZG93X2xpZ2h0Vmlld1Byb2pzIiwiX2E0X3NoYWRvd19pbmZvIiwiX2NhbVBvcyIsIlZlYzQiLCJfY2FtRndkIiwiVmVjMyIsIl92M190bXAxIiwiQ0NfTUFYX0xJR0hUUyIsIkNDX01BWF9TSEFET1dfTElHSFRTIiwiX2Zsb2F0MTZfcG9vbCIsIlJlY3ljbGVQb29sIiwic29ydFZpZXciLCJhIiwiYiIsIl9wcmlvcml0eSIsIkZvcndhcmRSZW5kZXJlciIsImRldmljZSIsImJ1aWx0aW4iLCJfdGltZSIsIl9saWdodHMiLCJfc2hhZG93TGlnaHRzIiwiX251bUxpZ2h0cyIsIl9kZWZpbmVzIiwiX3JlZ2lzdGVyU3RhZ2UiLCJfc2hhZG93U3RhZ2UiLCJiaW5kIiwiX29wYXF1ZVN0YWdlIiwiX3RyYW5zcGFyZW50U3RhZ2UiLCJyZXNldCIsInJlbmRlciIsInNjZW5lIiwiZHQiLCJDQ19FRElUT1IiLCJfZGV2aWNlIiwic2V0VW5pZm9ybSIsIl91cGRhdGVMaWdodHMiLCJjYW52YXMiLCJfZ2wiLCJpIiwiX2NhbWVyYXMiLCJsZW5ndGgiLCJ2aWV3IiwiX3JlcXVlc3RWaWV3Iiwid2lkdGgiLCJoZWlnaHQiLCJjYW1lcmEiLCJkYXRhIiwiZXh0cmFjdFZpZXciLCJfdmlld1Bvb2xzIiwic29ydCIsIl9yZW5kZXIiLCJyZW5kZXJDYW1lcmEiLCJsaWdodHMiLCJsaWdodCIsInVwZGF0ZSIsInNoYWRvd1R5cGUiLCJlbnVtcyIsIlNIQURPV19OT05FIiwic3BsaWNlIiwicHVzaCIsIl91cGRhdGVMaWdodERlZmluZXMiLCJfY291bnQiLCJkZWZpbmVzIiwibGlnaHRLZXkiLCJzaGFkb3dLZXkiLCJfdHlwZSIsIl9kZWZpbmVzQ2hhbmdlZCIsIl9zaGFkb3dUeXBlIiwibmV3Q291bnQiLCJNYXRoIiwibWluIiwiQ0NfTlVNX0xJR0hUUyIsIkNDX05VTV9TSEFET1dfTElHSFRTIiwiX3N1Ym1pdExpZ2h0c1VuaWZvcm1zIiwicG9zaXRpb25BbmRSYW5nZXMiLCJhZGQiLCJkaXJlY3Rpb25zIiwiY29sb3JzIiwibGlnaHROdW0iLCJpbmRleCIsInNldCIsIl9jb2xvclVuaWZvcm0iLCJfZGlyZWN0aW9uVW5pZm9ybSIsIl9wb3NpdGlvblVuaWZvcm0iLCJfcmFuZ2UiLCJMSUdIVF9TUE9UIiwiX3Nwb3RVbmlmb3JtIiwiX3N1Ym1pdFNoYWRvd1N0YWdlVW5pZm9ybXMiLCJfc2hhZG93TGlnaHQiLCJzaGFkb3dJbmZvIiwic2hhZG93TWluRGVwdGgiLCJzaGFkb3dNYXhEZXB0aCIsInNoYWRvd0RlcHRoU2NhbGUiLCJzaGFkb3dEYXJrbmVzcyIsIk1hdDQiLCJ0b0FycmF5IiwiX21hdFZpZXdQcm9qIiwic2hhZG93QmlhcyIsIkNDX1NIQURPV19UWVBFIiwiX3N1Ym1pdE90aGVyU3RhZ2VzVW5pZm9ybXMiLCJidWZmZXIiLCJ2aWV3UHJvak1hdHJpeCIsIl9zaGFkb3dSZXNvbHV0aW9uIiwiX3NvcnRJdGVtcyIsIml0ZW1zIiwicGFzc2VzIiwic29ydEtleSIsIml0ZW0iLCJlZmZlY3QiLCJnZXREZWZpbmUiLCJfZHJhdyIsIl9kcmF3SXRlbXMiLCJzaGFkb3dMaWdodHMiLCJzaGFkb3dJZHgiLCJzZXRUZXh0dXJlIiwic2hhZG93TWFwIiwiX2FsbG9jVGV4dHVyZVVuaXQiLCJnZXRQb3NpdGlvbiIsIl9tYXRWaWV3IiwiX21hdFZpZXdJbnYiLCJfbWF0UHJvaiIsImdldEZvcndhcmQiLCJub2RlIiwiZ2V0V29ybGRQb3NpdGlvbiIsInN1YiIsImRvdCIsIkJhc2VSZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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QUlxRSxJQUFJLEdBQUdILEtBQUssQ0FBQzFELElBQU4sQ0FBV1IsQ0FBWCxDQUFYLENBRHFDLENBR3JDOztBQUNBcUUsTUFBQUEsSUFBSSxDQUFDZSxJQUFMLENBQVVDLGdCQUFWLENBQTJCckgsUUFBM0I7O0FBRUFELHVCQUFLdUgsR0FBTCxDQUFTdEgsUUFBVCxFQUFtQkEsUUFBbkIsRUFBNkJKLE9BQTdCOztBQUNBeUcsTUFBQUEsSUFBSSxDQUFDRCxPQUFMLEdBQWUsQ0FBQ3JHLGlCQUFLd0gsR0FBTCxDQUFTdkgsUUFBVCxFQUFtQkYsT0FBbkIsQ0FBaEI7QUFDRDs7QUFFRCxTQUFLbUcsVUFBTCxDQUFnQkMsS0FBaEI7O0FBQ0EsU0FBS08sVUFBTCxDQUFnQnRFLElBQWhCLEVBQXNCK0QsS0FBdEI7QUFDRDs7O0VBOVMwQ3NCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG5pbXBvcnQgeyBWZWMzLCBWZWM0LCBNYXQ0IH0gZnJvbSAnLi4vLi4vY29yZS92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCBCYXNlUmVuZGVyZXIgZnJvbSAnLi4vY29yZS9iYXNlLXJlbmRlcmVyJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4uL2VudW1zJztcclxuaW1wb3J0IHsgUmVjeWNsZVBvb2wgfSBmcm9tICcuLi9tZW1vcCc7XHJcblxyXG5sZXQgX2ExNl92aWV3ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XHJcbmxldCBfYTE2X3ZpZXdfaW52ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XHJcbmxldCBfYTE2X3Byb2ogPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxubGV0IF9hMTZfdmlld1Byb2ogPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxubGV0IF9hNF9jYW1Qb3MgPSBuZXcgRmxvYXQzMkFycmF5KDQpO1xyXG5cclxubGV0IF9hNjRfc2hhZG93X2xpZ2h0Vmlld1Byb2ogPSBuZXcgRmxvYXQzMkFycmF5KDY0KTtcclxubGV0IF9hMTZfc2hhZG93X2xpZ2h0Vmlld1Byb2pzID0gW107XHJcbmxldCBfYTRfc2hhZG93X2luZm8gPSBuZXcgRmxvYXQzMkFycmF5KDQpO1xyXG5cclxubGV0IF9jYW1Qb3MgPSBuZXcgVmVjNCgwLCAwLCAwLCAwKTtcclxubGV0IF9jYW1Gd2QgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxubGV0IF92M190bXAxID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcblxyXG5jb25zdCBDQ19NQVhfTElHSFRTID0gNDtcclxuY29uc3QgQ0NfTUFYX1NIQURPV19MSUdIVFMgPSAyO1xyXG5cclxubGV0IF9mbG9hdDE2X3Bvb2wgPSBuZXcgUmVjeWNsZVBvb2woKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxufSwgOCk7XHJcblxyXG5mdW5jdGlvbiBzb3J0VmlldyAoYSwgYikge1xyXG4gIHJldHVybiAoYS5fcHJpb3JpdHkgLSBiLl9wcmlvcml0eSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcndhcmRSZW5kZXJlciBleHRlbmRzIEJhc2VSZW5kZXJlciB7XHJcbiAgY29uc3RydWN0b3IoZGV2aWNlLCBidWlsdGluKSB7XHJcbiAgICBzdXBlcihkZXZpY2UsIGJ1aWx0aW4pO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSBuZXcgRmxvYXQzMkFycmF5KDQpO1xyXG5cclxuICAgIHRoaXMuX2xpZ2h0cyA9IFtdO1xyXG4gICAgdGhpcy5fc2hhZG93TGlnaHRzID0gW107XHJcblxyXG4gICAgdGhpcy5fbnVtTGlnaHRzID0gMDtcclxuXHJcbiAgICB0aGlzLl9kZWZpbmVzID0ge1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9yZWdpc3RlclN0YWdlKCdzaGFkb3djYXN0JywgdGhpcy5fc2hhZG93U3RhZ2UuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLl9yZWdpc3RlclN0YWdlKCdvcGFxdWUnLCB0aGlzLl9vcGFxdWVTdGFnZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuX3JlZ2lzdGVyU3RhZ2UoJ3RyYW5zcGFyZW50JywgdGhpcy5fdHJhbnNwYXJlbnRTdGFnZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0ICgpIHtcclxuICAgIF9mbG9hdDE2X3Bvb2wucmVzZXQoKTtcclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIgKHNjZW5lLCBkdCkge1xyXG4gICAgdGhpcy5yZXNldCgpO1xyXG5cclxuICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgIGlmIChkdCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWVbMF0gKz0gZHQ7XHJcbiAgICAgICAgdGhpcy5fdGltZVsxXSA9IGR0O1xyXG4gICAgICAgIHRoaXMuX3RpbWVbMl0gKys7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZGV2aWNlLnNldFVuaWZvcm0oJ2NjX3RpbWUnLCB0aGlzLl90aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91cGRhdGVMaWdodHMoc2NlbmUpO1xyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2RldmljZS5fZ2wuY2FudmFzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2VuZS5fY2FtZXJhcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgdmlldyA9IHRoaXMuX3JlcXVlc3RWaWV3KCk7XHJcbiAgICAgIGxldCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgbGV0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgIGxldCBjYW1lcmEgPSBzY2VuZS5fY2FtZXJhcy5kYXRhW2ldO1xyXG4gICAgICBjYW1lcmEuZXh0cmFjdFZpZXcodmlldywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVuZGVyIGJ5IGNhbWVyYXNcclxuICAgIHRoaXMuX3ZpZXdQb29scy5zb3J0KHNvcnRWaWV3KTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3ZpZXdQb29scy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgdmlldyA9IHRoaXMuX3ZpZXdQb29scy5kYXRhW2ldO1xyXG4gICAgICB0aGlzLl9yZW5kZXIodmlldywgc2NlbmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gZGlyZWN0IHJlbmRlciBhIHNpbmdsZSBjYW1lcmFcclxuICByZW5kZXJDYW1lcmEgKGNhbWVyYSwgc2NlbmUpIHtcclxuICAgIHRoaXMucmVzZXQoKTtcclxuXHJcbiAgICB0aGlzLl91cGRhdGVMaWdodHMoc2NlbmUpO1xyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2RldmljZS5fZ2wuY2FudmFzO1xyXG4gICAgbGV0IHdpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgbGV0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcblxyXG4gICAgbGV0IHZpZXcgPSB0aGlzLl9yZXF1ZXN0VmlldygpO1xyXG4gICAgY2FtZXJhLmV4dHJhY3RWaWV3KHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vIHJlbmRlciBieSBjYW1lcmFzXHJcbiAgICB0aGlzLl92aWV3UG9vbHMuc29ydChzb3J0Vmlldyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl92aWV3UG9vbHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgbGV0IHZpZXcgPSB0aGlzLl92aWV3UG9vbHMuZGF0YVtpXTtcclxuICAgICAgdGhpcy5fcmVuZGVyKHZpZXcsIHNjZW5lKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF91cGRhdGVMaWdodHMgKHNjZW5lKSB7XHJcbiAgICB0aGlzLl9saWdodHMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuX3NoYWRvd0xpZ2h0cy5sZW5ndGggPSAwO1xyXG5cclxuICAgIGxldCBsaWdodHMgPSBzY2VuZS5fbGlnaHRzO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaWdodHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgbGV0IGxpZ2h0ID0gbGlnaHRzLmRhdGFbaV07XHJcbiAgICAgIGxpZ2h0LnVwZGF0ZSh0aGlzLl9kZXZpY2UpO1xyXG5cclxuICAgICAgaWYgKGxpZ2h0LnNoYWRvd1R5cGUgIT09IGVudW1zLlNIQURPV19OT05FKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NoYWRvd0xpZ2h0cy5sZW5ndGggPCBDQ19NQVhfU0hBRE9XX0xJR0hUUykge1xyXG4gICAgICAgICAgdGhpcy5fc2hhZG93TGlnaHRzLnNwbGljZSgwLCAwLCBsaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5fcmVxdWVzdFZpZXcoKTtcclxuICAgICAgICBsaWdodC5leHRyYWN0Vmlldyh2aWV3LCBbJ3NoYWRvd2Nhc3QnXSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xpZ2h0cy5zcGxpY2UoMCwgMCwgbGlnaHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX2xpZ2h0cy5wdXNoKGxpZ2h0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3VwZGF0ZUxpZ2h0RGVmaW5lcygpO1xyXG4gICAgdGhpcy5fbnVtTGlnaHRzID0gbGlnaHRzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIF91cGRhdGVMaWdodERlZmluZXMgKCkge1xyXG4gICAgbGV0IGRlZmluZXMgPSB0aGlzLl9kZWZpbmVzO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlnaHRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGxldCBsaWdodCA9IHRoaXMuX2xpZ2h0c1tpXTtcclxuICAgICAgbGV0IGxpZ2h0S2V5ID0gYENDX0xJR0hUXyR7aX1fVFlQRWA7XHJcbiAgICAgIGxldCBzaGFkb3dLZXkgPSBgQ0NfU0hBRE9XXyR7aX1fVFlQRWA7XHJcbiAgICAgIGlmIChkZWZpbmVzW2xpZ2h0S2V5XSAhPT0gbGlnaHQuX3R5cGUpe1xyXG4gICAgICAgIGRlZmluZXNbbGlnaHRLZXldID0gbGlnaHQuX3R5cGU7XHJcbiAgICAgICAgdGhpcy5fZGVmaW5lc0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZWZpbmVzW3NoYWRvd0tleV0gIT09IGxpZ2h0Ll9zaGFkb3dUeXBlKXtcclxuICAgICAgICBkZWZpbmVzW3NoYWRvd0tleV0gPSBsaWdodC5fc2hhZG93VHlwZTtcclxuICAgICAgICB0aGlzLl9kZWZpbmVzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3Q291bnQgPSBNYXRoLm1pbihDQ19NQVhfTElHSFRTLCB0aGlzLl9saWdodHMubGVuZ3RoKTtcclxuICAgIGlmIChkZWZpbmVzLkNDX05VTV9MSUdIVFMgIT09IG5ld0NvdW50KSB7XHJcbiAgICAgIGRlZmluZXMuQ0NfTlVNX0xJR0hUUyA9IG5ld0NvdW50O1xyXG4gICAgICB0aGlzLl9kZWZpbmVzQ2hhbmdlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBuZXdDb3VudCA9IE1hdGgubWluKENDX01BWF9MSUdIVFMsIHRoaXMuX3NoYWRvd0xpZ2h0cy5sZW5ndGgpO1xyXG4gICAgaWYgKGRlZmluZXMuQ0NfTlVNX1NIQURPV19MSUdIVFMgIT09IG5ld0NvdW50KSB7XHJcbiAgICAgIGRlZmluZXMuQ0NfTlVNX1NIQURPV19MSUdIVFMgPSBuZXdDb3VudDtcclxuICAgICAgdGhpcy5fZGVmaW5lc0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3N1Ym1pdExpZ2h0c1VuaWZvcm1zICgpIHtcclxuICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2U7XHJcblxyXG4gICAgaWYgKHRoaXMuX2xpZ2h0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBwb3NpdGlvbkFuZFJhbmdlcyA9IF9mbG9hdDE2X3Bvb2wuYWRkKCk7XHJcbiAgICAgIGxldCBkaXJlY3Rpb25zID0gX2Zsb2F0MTZfcG9vbC5hZGQoKTtcclxuICAgICAgbGV0IGNvbG9ycyA9IF9mbG9hdDE2X3Bvb2wuYWRkKCk7XHJcbiAgICAgIGxldCBsaWdodE51bSA9IE1hdGgubWluKENDX01BWF9MSUdIVFMsIHRoaXMuX2xpZ2h0cy5sZW5ndGgpO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpZ2h0TnVtOyArK2kpIHtcclxuICAgICAgICBsZXQgbGlnaHQgPSB0aGlzLl9saWdodHNbaV07XHJcbiAgICAgICAgbGV0IGluZGV4ID0gaSAqIDQ7XHJcblxyXG4gICAgICAgIGNvbG9ycy5zZXQobGlnaHQuX2NvbG9yVW5pZm9ybSwgaW5kZXgpO1xyXG4gICAgICAgIGRpcmVjdGlvbnMuc2V0KGxpZ2h0Ll9kaXJlY3Rpb25Vbmlmb3JtLCBpbmRleCk7XHJcbiAgICAgICAgcG9zaXRpb25BbmRSYW5nZXMuc2V0KGxpZ2h0Ll9wb3NpdGlvblVuaWZvcm0sIGluZGV4KTtcclxuICAgICAgICBwb3NpdGlvbkFuZFJhbmdlc1tpbmRleCszXSA9IGxpZ2h0Ll9yYW5nZTtcclxuXHJcbiAgICAgICAgaWYgKGxpZ2h0Ll90eXBlID09PSBlbnVtcy5MSUdIVF9TUE9UKSB7XHJcbiAgICAgICAgICBkaXJlY3Rpb25zW2luZGV4KzNdID0gbGlnaHQuX3Nwb3RVbmlmb3JtWzBdO1xyXG4gICAgICAgICAgY29sb3JzW2luZGV4KzNdID0gbGlnaHQuX3Nwb3RVbmlmb3JtWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGRpcmVjdGlvbnNbaW5kZXgrM10gPSAwO1xyXG4gICAgICAgICAgY29sb3JzW2luZGV4KzNdID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRldmljZS5zZXRVbmlmb3JtKCdjY19saWdodERpcmVjdGlvbicsIGRpcmVjdGlvbnMpO1xyXG4gICAgICBkZXZpY2Uuc2V0VW5pZm9ybSgnY2NfbGlnaHRDb2xvcicsIGNvbG9ycyk7XHJcbiAgICAgIGRldmljZS5zZXRVbmlmb3JtKCdjY19saWdodFBvc2l0aW9uQW5kUmFuZ2UnLCBwb3NpdGlvbkFuZFJhbmdlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc3VibWl0U2hhZG93U3RhZ2VVbmlmb3Jtcyh2aWV3KSB7XHJcblxyXG4gICAgbGV0IGxpZ2h0ID0gdmlldy5fc2hhZG93TGlnaHQ7XHJcblxyXG4gICAgbGV0IHNoYWRvd0luZm8gPSBfYTRfc2hhZG93X2luZm87XHJcbiAgICBzaGFkb3dJbmZvWzBdID0gbGlnaHQuc2hhZG93TWluRGVwdGg7XHJcbiAgICBzaGFkb3dJbmZvWzFdID0gbGlnaHQuc2hhZG93TWF4RGVwdGg7XHJcbiAgICBzaGFkb3dJbmZvWzJdID0gbGlnaHQuc2hhZG93RGVwdGhTY2FsZTtcclxuICAgIHNoYWRvd0luZm9bM10gPSBsaWdodC5zaGFkb3dEYXJrbmVzcztcclxuXHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2Nfc2hhZG93X21hcF9saWdodFZpZXdQcm9qTWF0cml4JywgTWF0NC50b0FycmF5KF9hMTZfdmlld1Byb2osIHZpZXcuX21hdFZpZXdQcm9qKSk7XHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2Nfc2hhZG93X21hcF9pbmZvJywgc2hhZG93SW5mbyk7XHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2Nfc2hhZG93X21hcF9iaWFzJywgbGlnaHQuc2hhZG93Qmlhcyk7XHJcblxyXG4gICAgdGhpcy5fZGVmaW5lcy5DQ19TSEFET1dfVFlQRSA9IGxpZ2h0Ll9zaGFkb3dUeXBlO1xyXG4gIH1cclxuXHJcbiAgX3N1Ym1pdE90aGVyU3RhZ2VzVW5pZm9ybXMoKSB7XHJcbiAgICBsZXQgc2hhZG93SW5mbyA9IF9mbG9hdDE2X3Bvb2wuYWRkKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zaGFkb3dMaWdodHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgbGV0IGxpZ2h0ID0gdGhpcy5fc2hhZG93TGlnaHRzW2ldO1xyXG4gICAgICBsZXQgdmlldyA9IF9hMTZfc2hhZG93X2xpZ2h0Vmlld1Byb2pzW2ldO1xyXG4gICAgICBpZiAoIXZpZXcpIHtcclxuICAgICAgICB2aWV3ID0gX2ExNl9zaGFkb3dfbGlnaHRWaWV3UHJvanNbaV0gPSBuZXcgRmxvYXQzMkFycmF5KF9hNjRfc2hhZG93X2xpZ2h0Vmlld1Byb2ouYnVmZmVyLCBpICogNjQsIDE2KTtcclxuICAgICAgfVxyXG4gICAgICBNYXQ0LnRvQXJyYXkodmlldywgbGlnaHQudmlld1Byb2pNYXRyaXgpO1xyXG5cclxuICAgICAgbGV0IGluZGV4ID0gaSo0O1xyXG4gICAgICBzaGFkb3dJbmZvW2luZGV4XSA9IGxpZ2h0LnNoYWRvd01pbkRlcHRoO1xyXG4gICAgICBzaGFkb3dJbmZvW2luZGV4KzFdID0gbGlnaHQuc2hhZG93TWF4RGVwdGg7XHJcbiAgICAgIHNoYWRvd0luZm9baW5kZXgrMl0gPSBsaWdodC5fc2hhZG93UmVzb2x1dGlvbjtcclxuICAgICAgc2hhZG93SW5mb1tpbmRleCszXSA9IGxpZ2h0LnNoYWRvd0RhcmtuZXNzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RldmljZS5zZXRVbmlmb3JtKGBjY19zaGFkb3dfbGlnaHRWaWV3UHJvak1hdHJpeGAsIF9hNjRfc2hhZG93X2xpZ2h0Vmlld1Byb2opO1xyXG4gICAgdGhpcy5fZGV2aWNlLnNldFVuaWZvcm0oYGNjX3NoYWRvd19pbmZvYCwgc2hhZG93SW5mbyk7XHJcbiAgICAvLyB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybShgY2NfZnJ1c3R1bUVkZ2VGYWxsb2ZmXyR7aW5kZXh9YCwgbGlnaHQuZnJ1c3R1bUVkZ2VGYWxsb2ZmKTtcclxuICB9XHJcblxyXG4gIF9zb3J0SXRlbXMgKGl0ZW1zKSB7XHJcbiAgICAvLyBzb3J0IGl0ZW1zXHJcbiAgICBpdGVtcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIC8vIGlmIChhLmxheWVyICE9PSBiLmxheWVyKSB7XHJcbiAgICAgIC8vICAgcmV0dXJuIGEubGF5ZXIgLSBiLmxheWVyO1xyXG4gICAgICAvLyB9XHJcblxyXG4gICAgICBpZiAoYS5wYXNzZXMubGVuZ3RoICE9PSBiLnBhc3Nlcy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gYS5wYXNzZXMubGVuZ3RoIC0gYi5wYXNzZXMubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYS5zb3J0S2V5IC0gYi5zb3J0S2V5O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBfc2hhZG93U3RhZ2UgKHZpZXcsIGl0ZW1zKSB7XHJcbiAgICAvLyB1cGRhdGUgcmVuZGVyaW5nXHJcbiAgICB0aGlzLl9zdWJtaXRTaGFkb3dTdGFnZVVuaWZvcm1zKHZpZXcpO1xyXG5cclxuICAgIC8vIHRoaXMuX3NvcnRJdGVtcyhpdGVtcyk7XHJcblxyXG4gICAgLy8gZHJhdyBpdFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgaXRlbSA9IGl0ZW1zLmRhdGFbaV07XHJcbiAgICAgIGlmIChpdGVtLmVmZmVjdC5nZXREZWZpbmUoJ0NDX0NBU1RJTkdfU0hBRE9XJykpIHtcclxuICAgICAgICB0aGlzLl9kcmF3KGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfZHJhd0l0ZW1zICh2aWV3LCBpdGVtcykge1xyXG4gICAgbGV0IHNoYWRvd0xpZ2h0cyA9IHRoaXMuX3NoYWRvd0xpZ2h0cztcclxuICAgIGlmIChzaGFkb3dMaWdodHMubGVuZ3RoID09PSAwICYmIHRoaXMuX251bUxpZ2h0cyA9PT0gMCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBpdGVtcy5kYXRhW2ldO1xyXG4gICAgICAgIHRoaXMuX2RyYXcoaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBpdGVtcy5kYXRhW2ldO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBzaGFkb3dJZHggPSAwOyBzaGFkb3dJZHggPCBzaGFkb3dMaWdodHMubGVuZ3RoOyArK3NoYWRvd0lkeCkge1xyXG4gICAgICAgICAgdGhpcy5fZGV2aWNlLnNldFRleHR1cmUoJ2NjX3NoYWRvd19tYXBfJytzaGFkb3dJZHgsIHNoYWRvd0xpZ2h0c1tzaGFkb3dJZHhdLnNoYWRvd01hcCwgdGhpcy5fYWxsb2NUZXh0dXJlVW5pdCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYXcoaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9vcGFxdWVTdGFnZSAodmlldywgaXRlbXMpIHtcclxuICAgIHZpZXcuZ2V0UG9zaXRpb24oX2NhbVBvcyk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHVuaWZvcm1zXHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2NfbWF0VmlldycsIE1hdDQudG9BcnJheShfYTE2X3ZpZXcsIHZpZXcuX21hdFZpZXcpKTtcclxuICAgIHRoaXMuX2RldmljZS5zZXRVbmlmb3JtKCdjY19tYXRWaWV3SW52JywgTWF0NC50b0FycmF5KF9hMTZfdmlld19pbnYsIHZpZXcuX21hdFZpZXdJbnYpKTtcclxuICAgIHRoaXMuX2RldmljZS5zZXRVbmlmb3JtKCdjY19tYXRQcm9qJywgTWF0NC50b0FycmF5KF9hMTZfcHJvaiwgdmlldy5fbWF0UHJvaikpO1xyXG4gICAgdGhpcy5fZGV2aWNlLnNldFVuaWZvcm0oJ2NjX21hdFZpZXdQcm9qJywgTWF0NC50b0FycmF5KF9hMTZfdmlld1Byb2osIHZpZXcuX21hdFZpZXdQcm9qKSk7XHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2NfY2FtZXJhUG9zJywgVmVjNC50b0FycmF5KF9hNF9jYW1Qb3MsIF9jYW1Qb3MpKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgcmVuZGVyaW5nXHJcbiAgICB0aGlzLl9zdWJtaXRMaWdodHNVbmlmb3JtcygpO1xyXG4gICAgdGhpcy5fc3VibWl0T3RoZXJTdGFnZXNVbmlmb3JtcygpO1xyXG5cclxuICAgIHRoaXMuX2RyYXdJdGVtcyh2aWV3LCBpdGVtcyk7XHJcbiAgfVxyXG5cclxuICBfdHJhbnNwYXJlbnRTdGFnZSAodmlldywgaXRlbXMpIHtcclxuICAgIHZpZXcuZ2V0UG9zaXRpb24oX2NhbVBvcyk7XHJcbiAgICB2aWV3LmdldEZvcndhcmQoX2NhbUZ3ZCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHVuaWZvcm1zXHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2NfbWF0VmlldycsIE1hdDQudG9BcnJheShfYTE2X3ZpZXcsIHZpZXcuX21hdFZpZXcpKTtcclxuICAgIHRoaXMuX2RldmljZS5zZXRVbmlmb3JtKCdjY19tYXRWaWV3SW52JywgTWF0NC50b0FycmF5KF9hMTZfdmlld19pbnYsIHZpZXcuX21hdFZpZXdJbnYpKTtcclxuICAgIHRoaXMuX2RldmljZS5zZXRVbmlmb3JtKCdjY19tYXRQcm9qJywgTWF0NC50b0FycmF5KF9hMTZfcHJvaiwgdmlldy5fbWF0UHJvaikpO1xyXG4gICAgdGhpcy5fZGV2aWNlLnNldFVuaWZvcm0oJ2NjX21hdFZpZXdQcm9qJywgTWF0NC50b0FycmF5KF9hMTZfdmlld1Byb2osIHZpZXcuX21hdFZpZXdQcm9qKSk7XHJcbiAgICB0aGlzLl9kZXZpY2Uuc2V0VW5pZm9ybSgnY2NfY2FtZXJhUG9zJywgVmVjNC50b0FycmF5KF9hNF9jYW1Qb3MsIF9jYW1Qb3MpKTtcclxuXHJcbiAgICB0aGlzLl9zdWJtaXRMaWdodHNVbmlmb3JtcygpO1xyXG4gICAgdGhpcy5fc3VibWl0T3RoZXJTdGFnZXNVbmlmb3JtcygpO1xyXG5cclxuICAgIC8vIGNhbGN1bGF0ZSB6ZGlzdFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgaXRlbSA9IGl0ZW1zLmRhdGFbaV07XHJcblxyXG4gICAgICAvLyBUT0RPOiB3ZSBzaG91bGQgdXNlIG1lc2ggY2VudGVyIGluc3RlYWQhXHJcbiAgICAgIGl0ZW0ubm9kZS5nZXRXb3JsZFBvc2l0aW9uKF92M190bXAxKTtcclxuXHJcbiAgICAgIFZlYzMuc3ViKF92M190bXAxLCBfdjNfdG1wMSwgX2NhbVBvcyk7XHJcbiAgICAgIGl0ZW0uc29ydEtleSA9IC1WZWMzLmRvdChfdjNfdG1wMSwgX2NhbUZ3ZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc29ydEl0ZW1zKGl0ZW1zKTtcclxuICAgIHRoaXMuX2RyYXdJdGVtcyh2aWV3LCBpdGVtcyk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9