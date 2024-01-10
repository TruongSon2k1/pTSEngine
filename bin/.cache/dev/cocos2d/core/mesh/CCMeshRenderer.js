
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/mesh/CCMeshRenderer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _inputAssembler = _interopRequireDefault(require("../../renderer/core/input-assembler"));

var _aabb = _interopRequireDefault(require("../geom-utils/aabb"));

var _vec = _interopRequireDefault(require("../value-types/vec3"));

var _mat = _interopRequireDefault(require("../value-types/mat4"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var RenderComponent = require('../components/CCRenderComponent');

var Mesh = require('./CCMesh');

var RenderFlow = require('../renderer/render-flow');

var Renderer = require('../renderer');

var Material = require('../assets/material/CCMaterial');
/**
 * !#en Shadow projection mode
 *
 * !#ch 阴影投射方式
 * @static
 * @enum MeshRenderer.ShadowCastingMode
 */


var ShadowCastingMode = cc.Enum({
  /**
   * !#en
   *
   * !#ch 关闭阴影投射
   * @property OFF
   * @readonly
   * @type {Number}
   */
  OFF: 0,

  /**
   * !#en
   *
   * !#ch 开启阴影投射，当阴影光产生的时候
   * @property ON
   * @readonly
   * @type {Number}
   */
  ON: 1 // /**
  //  * !#en
  //  *
  //  * !#ch 可以从网格的任意一遍投射出阴影
  //  * @property TWO_SIDED
  //  * @readonly
  //  * @type {Number}
  //  */
  // TWO_SIDED: 2,
  // /**
  //  * !#en
  //  *
  //  * !#ch 只显示阴影
  //  * @property SHADOWS_ONLY
  //  * @readonly
  //  * @type {Number}
  //  */
  // SHADOWS_ONLY: 3,

});
/**
 * !#en
 * Mesh Renderer Component
 * !#zh
 * 网格渲染组件
 * @class MeshRenderer
 * @extends RenderComponent
 */

var MeshRenderer = cc.Class({
  name: 'cc.MeshRenderer',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.mesh/MeshRenderer'
  },
  properties: {
    _mesh: {
      "default": null,
      type: Mesh
    },
    _receiveShadows: false,
    _shadowCastingMode: ShadowCastingMode.OFF,
    _enableAutoBatch: false,

    /**
     * !#en
     * The mesh which the renderer uses.
     * !#zh
     * 设置使用的网格
     * @property {Mesh} mesh
     */
    mesh: {
      get: function get() {
        return this._mesh;
      },
      set: function set(v) {
        if (this._mesh === v) return;

        this._setMesh(v);

        if (!v) {
          this.disableRender();
          return;
        }

        this.markForRender(true);
        this.node._renderFlag |= RenderFlow.FLAG_TRANSFORM;
      },
      type: Mesh,
      animatable: false
    },
    textures: {
      "default": [],
      type: cc.Texture2D,
      visible: false
    },

    /**
     * !#en
     * Whether the mesh should receive shadows.
     * !#zh
     * 网格是否接受光源投射的阴影
     * @property {Boolean} receiveShadows
     */
    receiveShadows: {
      get: function get() {
        return this._receiveShadows;
      },
      set: function set(val) {
        this._receiveShadows = val;

        this._updateReceiveShadow();
      },
      animatable: false
    },

    /**
     * !#en
     * Shadow Casting Mode
     * !#zh
     * 网格投射阴影的模式
     * @property {ShadowCastingMode} shadowCastingMode
     */
    shadowCastingMode: {
      get: function get() {
        return this._shadowCastingMode;
      },
      set: function set(val) {
        this._shadowCastingMode = val;

        this._updateCastShadow();
      },
      type: ShadowCastingMode,
      animatable: false
    },

    /**
     * !#en
     * Enable auto merge mesh, only support when mesh's VertexFormat, PrimitiveType, materials are all the same
     * !#zh 
     * 开启自动合并 mesh 功能，只有在网格的 顶点格式，PrimitiveType, 使用的材质 都一致的情况下才会有效
     * @property {Boolean} enableAutoBatch
     */
    enableAutoBatch: {
      get: function get() {
        return this._enableAutoBatch;
      },
      set: function set(val) {
        this._enableAutoBatch = val;
      }
    }
  },
  statics: {
    ShadowCastingMode: ShadowCastingMode
  },
  ctor: function ctor() {
    this._boundingBox = cc.geomUtils && new _aabb["default"]();

    if (CC_DEBUG) {
      this._debugDatas = {
        wireFrame: [],
        normal: []
      };
    }
  },
  onEnable: function onEnable() {
    var _this = this;

    this._super();

    if (this._mesh && !this._mesh.loaded) {
      this.disableRender();

      this._mesh.once('load', function () {
        if (!_this.isValid) return;

        _this._setMesh(_this._mesh);

        _this.markForRender(true);
      });

      cc.assetManager.postLoadNative(this._mesh);
    } else {
      this._setMesh(this._mesh);
    }

    this._updateRenderNode();

    this._updateMaterial();
  },
  onDestroy: function onDestroy() {
    this._setMesh(null);

    cc.pool.assembler.put(this._assembler);
  },
  _updateRenderNode: function _updateRenderNode() {
    this._assembler.setRenderNode(this.node);
  },
  _setMesh: function _setMesh(mesh) {
    if (cc.geomUtils && mesh) {
      _aabb["default"].fromPoints(this._boundingBox, mesh._minPos, mesh._maxPos);
    }

    if (this._mesh) {
      this._mesh.off('init-format', this._updateMeshAttribute, this);
    }

    if (mesh) {
      mesh.on('init-format', this._updateMeshAttribute, this);
    }

    this._mesh = mesh;
    this._assembler && (this._assembler._worldDatas = {});

    this._updateMeshAttribute();
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('unlit');
  },
  _validateRender: function _validateRender() {
    var mesh = this._mesh;

    if (mesh && mesh._subDatas.length > 0) {
      return;
    }

    this.disableRender();
  },
  _updateMaterial: function _updateMaterial() {
    // TODO: used to upgrade from 2.1, should be removed
    var textures = this.textures;

    if (textures && textures.length > 0) {
      var defaultMaterial = this._getDefaultMaterial();

      for (var i = 0; i < textures.length; i++) {
        var material = this._materials[i];
        if (material && material._uuid !== defaultMaterial._uuid) continue;

        if (!material) {
          material = _materialVariant["default"].create(defaultMaterial, this);
          this.setMaterial(i, material);
        }

        material.setProperty('diffuseTexture', textures[i]);
      }
    }

    this._updateReceiveShadow();

    this._updateCastShadow();

    this._updateMeshAttribute();
  },
  _updateReceiveShadow: function _updateReceiveShadow() {
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      materials[i].define('CC_USE_SHADOW_MAP', this._receiveShadows, undefined, true);
    }
  },
  _updateCastShadow: function _updateCastShadow() {
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      materials[i].define('CC_CASTING_SHADOW', this._shadowCastingMode === ShadowCastingMode.ON, undefined, true);
    }
  },
  _updateMeshAttribute: function _updateMeshAttribute() {
    var subDatas = this._mesh && this._mesh.subDatas;
    if (!subDatas) return;
    var materials = this.getMaterials();

    for (var i = 0; i < materials.length; i++) {
      if (!subDatas[i]) break;
      var vfm = subDatas[i].vfm;
      var material = materials[i];
      material.define('CC_USE_ATTRIBUTE_COLOR', !!vfm.element(_gfx["default"].ATTR_COLOR), undefined, true);
      material.define('CC_USE_ATTRIBUTE_UV0', !!vfm.element(_gfx["default"].ATTR_UV0), undefined, true);
      material.define('CC_USE_ATTRIBUTE_NORMAL', !!vfm.element(_gfx["default"].ATTR_NORMAL), undefined, true);
      material.define('CC_USE_ATTRIBUTE_TANGENT', !!vfm.element(_gfx["default"].ATTR_TANGENT), undefined, true);
    }

    if (CC_DEBUG) {
      for (var name in this._debugDatas) {
        this._debugDatas[name].length = 0;
      }
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._assembler.updateMeshData(this);
    }
  },
  _checkBacth: function _checkBacth() {}
});

if (CC_DEBUG) {
  var BLACK_COLOR = cc.Color.BLACK;
  var RED_COLOR = cc.Color.RED;
  var v3_tmp = [cc.v3(), cc.v3()];
  var mat4_tmp = cc.mat4();
  var createDebugDataFns = {
    normal: function normal(comp, ia, subData, subIndex) {
      var oldVfm = subData.vfm;
      var normalEle = oldVfm.element(_gfx["default"].ATTR_NORMAL);
      var posEle = oldVfm.element(_gfx["default"].ATTR_POSITION);
      var jointEle = oldVfm.element(_gfx["default"].ATTR_JOINTS);
      var weightEle = oldVfm.element(_gfx["default"].ATTR_WEIGHTS);

      if (!normalEle || !posEle) {
        return;
      }

      var indices = [];
      var vbData = [];
      var lineLength = 100;

      _vec["default"].set(v3_tmp[0], 5, 0, 0);

      _mat["default"].invert(mat4_tmp, comp.node._worldMatrix);

      _vec["default"].transformMat4Normal(v3_tmp[0], v3_tmp[0], mat4_tmp);

      lineLength = v3_tmp[0].mag();
      var mesh = comp.mesh;

      var posData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_POSITION);

      var normalData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_NORMAL);

      var jointData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_JOINTS);

      var weightData = mesh._getAttrMeshData(subIndex, _gfx["default"].ATTR_WEIGHTS);

      var vertexCount = posData.length / posEle.num;

      for (var i = 0; i < vertexCount; i++) {
        var normalIndex = i * normalEle.num;
        var posIndex = i * posEle.num;

        _vec["default"].set(v3_tmp[0], normalData[normalIndex], normalData[normalIndex + 1], normalData[normalIndex + 2]);

        _vec["default"].set(v3_tmp[1], posData[posIndex], posData[posIndex + 1], posData[posIndex + 2]);

        _vec["default"].scaleAndAdd(v3_tmp[0], v3_tmp[1], v3_tmp[0], lineLength);

        for (var lineIndex = 0; lineIndex < 2; lineIndex++) {
          vbData.push(v3_tmp[lineIndex].x, v3_tmp[lineIndex].y, v3_tmp[lineIndex].z);

          if (jointEle) {
            var jointIndex = i * jointEle.num;

            for (var j = 0; j < jointEle.num; j++) {
              vbData.push(jointData[jointIndex + j]);
            }
          }

          if (weightEle) {
            var weightIndex = i * weightEle.num;

            for (var _j = 0; _j < weightEle.num; _j++) {
              vbData.push(weightData[weightIndex + _j]);
            }
          }
        }

        indices.push(i * 2, i * 2 + 1);
      }

      var formatOpts = [{
        name: _gfx["default"].ATTR_POSITION,
        type: _gfx["default"].ATTR_TYPE_FLOAT32,
        num: 3
      }];

      if (jointEle) {
        formatOpts.push({
          name: _gfx["default"].ATTR_JOINTS,
          type: _gfx["default"].ATTR_TYPE_FLOAT32,
          num: jointEle.num
        });
      }

      if (weightEle) {
        formatOpts.push({
          name: _gfx["default"].ATTR_WEIGHTS,
          type: _gfx["default"].ATTR_TYPE_FLOAT32,
          num: weightEle.num
        });
      }

      var gfxVFmt = new _gfx["default"].VertexFormat(formatOpts);
      var vb = new _gfx["default"].VertexBuffer(Renderer.device, gfxVFmt, _gfx["default"].USAGE_STATIC, new Float32Array(vbData));
      var ibData = new Uint16Array(indices);
      var ib = new _gfx["default"].IndexBuffer(Renderer.device, _gfx["default"].INDEX_FMT_UINT16, _gfx["default"].USAGE_STATIC, ibData, ibData.length);

      var m = _materialVariant["default"].createWithBuiltin('unlit');

      m.setProperty('diffuseColor', RED_COLOR);
      return {
        material: m,
        ia: new _inputAssembler["default"](vb, ib, _gfx["default"].PT_LINES)
      };
    },
    wireFrame: function wireFrame(comp, ia, subData) {
      var oldIbData = subData.getIData(Uint16Array);

      var m = _materialVariant["default"].createWithBuiltin('unlit');

      m.setProperty('diffuseColor', BLACK_COLOR);
      var indices = [];

      for (var i = 0; i < oldIbData.length; i += 3) {
        var a = oldIbData[i + 0];
        var b = oldIbData[i + 1];
        var c = oldIbData[i + 2];
        indices.push(a, b, b, c, c, a);
      }

      var ibData = new Uint16Array(indices);
      var ib = new _gfx["default"].IndexBuffer(Renderer.device, _gfx["default"].INDEX_FMT_UINT16, _gfx["default"].USAGE_STATIC, ibData, ibData.length);
      return {
        material: m,
        ia: new _inputAssembler["default"](ia._vertexBuffer, ib, _gfx["default"].PT_LINES)
      };
    }
  };
  var _proto = MeshRenderer.prototype;

  _proto._updateDebugDatas = function () {
    var debugDatas = this._debugDatas;
    var subMeshes = this._mesh.subMeshes;
    var subDatas = this._mesh._subDatas;

    for (var name in debugDatas) {
      var debugData = debugDatas[name];
      if (debugData.length === subMeshes.length) continue;
      if (!cc.macro['SHOW_MESH_' + name.toUpperCase()]) continue;
      debugData.length = subMeshes.length;

      for (var i = 0; i < subMeshes.length; i++) {
        debugData[i] = createDebugDataFns[name](this, subMeshes[i], subDatas[i], i);
      }
    }
  };
}

cc.MeshRenderer = module.exports = MeshRenderer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXG1lc2hcXENDTWVzaFJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbIlJlbmRlckNvbXBvbmVudCIsInJlcXVpcmUiLCJNZXNoIiwiUmVuZGVyRmxvdyIsIlJlbmRlcmVyIiwiTWF0ZXJpYWwiLCJTaGFkb3dDYXN0aW5nTW9kZSIsImNjIiwiRW51bSIsIk9GRiIsIk9OIiwiTWVzaFJlbmRlcmVyIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsInByb3BlcnRpZXMiLCJfbWVzaCIsInR5cGUiLCJfcmVjZWl2ZVNoYWRvd3MiLCJfc2hhZG93Q2FzdGluZ01vZGUiLCJfZW5hYmxlQXV0b0JhdGNoIiwibWVzaCIsImdldCIsInNldCIsInYiLCJfc2V0TWVzaCIsImRpc2FibGVSZW5kZXIiLCJtYXJrRm9yUmVuZGVyIiwibm9kZSIsIl9yZW5kZXJGbGFnIiwiRkxBR19UUkFOU0ZPUk0iLCJhbmltYXRhYmxlIiwidGV4dHVyZXMiLCJUZXh0dXJlMkQiLCJ2aXNpYmxlIiwicmVjZWl2ZVNoYWRvd3MiLCJ2YWwiLCJfdXBkYXRlUmVjZWl2ZVNoYWRvdyIsInNoYWRvd0Nhc3RpbmdNb2RlIiwiX3VwZGF0ZUNhc3RTaGFkb3ciLCJlbmFibGVBdXRvQmF0Y2giLCJzdGF0aWNzIiwiY3RvciIsIl9ib3VuZGluZ0JveCIsImdlb21VdGlscyIsIkFhYmIiLCJDQ19ERUJVRyIsIl9kZWJ1Z0RhdGFzIiwid2lyZUZyYW1lIiwibm9ybWFsIiwib25FbmFibGUiLCJfc3VwZXIiLCJsb2FkZWQiLCJvbmNlIiwiaXNWYWxpZCIsImFzc2V0TWFuYWdlciIsInBvc3RMb2FkTmF0aXZlIiwiX3VwZGF0ZVJlbmRlck5vZGUiLCJfdXBkYXRlTWF0ZXJpYWwiLCJvbkRlc3Ryb3kiLCJwb29sIiwiYXNzZW1ibGVyIiwicHV0IiwiX2Fzc2VtYmxlciIsInNldFJlbmRlck5vZGUiLCJmcm9tUG9pbnRzIiwiX21pblBvcyIsIl9tYXhQb3MiLCJvZmYiLCJfdXBkYXRlTWVzaEF0dHJpYnV0ZSIsIm9uIiwiX3dvcmxkRGF0YXMiLCJfZ2V0RGVmYXVsdE1hdGVyaWFsIiwiZ2V0QnVpbHRpbk1hdGVyaWFsIiwiX3ZhbGlkYXRlUmVuZGVyIiwiX3N1YkRhdGFzIiwibGVuZ3RoIiwiZGVmYXVsdE1hdGVyaWFsIiwiaSIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsIl91dWlkIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlIiwic2V0TWF0ZXJpYWwiLCJzZXRQcm9wZXJ0eSIsIm1hdGVyaWFscyIsImdldE1hdGVyaWFscyIsImRlZmluZSIsInVuZGVmaW5lZCIsInN1YkRhdGFzIiwidmZtIiwiZWxlbWVudCIsImdmeCIsIkFUVFJfQ09MT1IiLCJBVFRSX1VWMCIsIkFUVFJfTk9STUFMIiwiQVRUUl9UQU5HRU5UIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJ1cGRhdGVNZXNoRGF0YSIsIl9jaGVja0JhY3RoIiwiQkxBQ0tfQ09MT1IiLCJDb2xvciIsIkJMQUNLIiwiUkVEX0NPTE9SIiwiUkVEIiwidjNfdG1wIiwidjMiLCJtYXQ0X3RtcCIsIm1hdDQiLCJjcmVhdGVEZWJ1Z0RhdGFGbnMiLCJjb21wIiwiaWEiLCJzdWJEYXRhIiwic3ViSW5kZXgiLCJvbGRWZm0iLCJub3JtYWxFbGUiLCJwb3NFbGUiLCJBVFRSX1BPU0lUSU9OIiwiam9pbnRFbGUiLCJBVFRSX0pPSU5UUyIsIndlaWdodEVsZSIsIkFUVFJfV0VJR0hUUyIsImluZGljZXMiLCJ2YkRhdGEiLCJsaW5lTGVuZ3RoIiwiVmVjMyIsIk1hdDQiLCJpbnZlcnQiLCJfd29ybGRNYXRyaXgiLCJ0cmFuc2Zvcm1NYXQ0Tm9ybWFsIiwibWFnIiwicG9zRGF0YSIsIl9nZXRBdHRyTWVzaERhdGEiLCJub3JtYWxEYXRhIiwiam9pbnREYXRhIiwid2VpZ2h0RGF0YSIsInZlcnRleENvdW50IiwibnVtIiwibm9ybWFsSW5kZXgiLCJwb3NJbmRleCIsInNjYWxlQW5kQWRkIiwibGluZUluZGV4IiwicHVzaCIsIngiLCJ5IiwieiIsImpvaW50SW5kZXgiLCJqIiwid2VpZ2h0SW5kZXgiLCJmb3JtYXRPcHRzIiwiQVRUUl9UWVBFX0ZMT0FUMzIiLCJnZnhWRm10IiwiVmVydGV4Rm9ybWF0IiwidmIiLCJWZXJ0ZXhCdWZmZXIiLCJkZXZpY2UiLCJVU0FHRV9TVEFUSUMiLCJGbG9hdDMyQXJyYXkiLCJpYkRhdGEiLCJVaW50MTZBcnJheSIsImliIiwiSW5kZXhCdWZmZXIiLCJJTkRFWF9GTVRfVUlOVDE2IiwibSIsImNyZWF0ZVdpdGhCdWlsdGluIiwiSW5wdXRBc3NlbWJsZXIiLCJQVF9MSU5FUyIsIm9sZEliRGF0YSIsImdldElEYXRhIiwiYSIsImIiLCJjIiwiX3ZlcnRleEJ1ZmZlciIsIl9wcm90byIsInByb3RvdHlwZSIsIl91cGRhdGVEZWJ1Z0RhdGFzIiwiZGVidWdEYXRhcyIsInN1Yk1lc2hlcyIsImRlYnVnRGF0YSIsIm1hY3JvIiwidG9VcHBlckNhc2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLGlDQUFELENBQS9COztBQUNBLElBQU1DLElBQUksR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBcEI7O0FBQ0EsSUFBTUUsVUFBVSxHQUFHRixPQUFPLENBQUMseUJBQUQsQ0FBMUI7O0FBQ0EsSUFBTUcsUUFBUSxHQUFHSCxPQUFPLENBQUMsYUFBRCxDQUF4Qjs7QUFDQSxJQUFNSSxRQUFRLEdBQUdKLE9BQU8sQ0FBQywrQkFBRCxDQUF4QjtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUksQ0FBQ3ZFLEVBQUUsQ0FBQ2dMLEtBQUgsQ0FBUyxlQUFlMUssSUFBSSxDQUFDMkssV0FBTCxFQUF4QixDQUFMLEVBQWtEO0FBRWxERixNQUFBQSxTQUFTLENBQUN4RyxNQUFWLEdBQW1CdUcsU0FBUyxDQUFDdkcsTUFBN0I7O0FBQ0EsV0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcUcsU0FBUyxDQUFDdkcsTUFBOUIsRUFBc0NFLENBQUMsRUFBdkMsRUFBMkM7QUFDdkNzRyxRQUFBQSxTQUFTLENBQUN0RyxDQUFELENBQVQsR0FBZWlDLGtCQUFrQixDQUFDcEcsSUFBRCxDQUFsQixDQUF5QixJQUF6QixFQUErQndLLFNBQVMsQ0FBQ3JHLENBQUQsQ0FBeEMsRUFBNkNZLFFBQVEsQ0FBQ1osQ0FBRCxDQUFyRCxFQUEwREEsQ0FBMUQsQ0FBZjtBQUNIO0FBQ0o7QUFDSixHQWREO0FBZUg7O0FBRUR6RSxFQUFFLENBQUNJLFlBQUgsR0FBa0I4SyxNQUFNLENBQUNDLE9BQVAsR0FBaUIvSyxZQUFuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zLmNvbVxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XHJcbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi8uLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XHJcbmltcG9ydCBBYWJiIGZyb20gJy4uL2dlb20tdXRpbHMvYWFiYic7XHJcbmltcG9ydCBWZWMzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5pbXBvcnQgTWF0NCBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXQ0JztcclxuaW1wb3J0IE1hdGVyaWFsVmFyaWFudCBmcm9tICcuLi9hc3NldHMvbWF0ZXJpYWwvbWF0ZXJpYWwtdmFyaWFudCc7XHJcblxyXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0NDUmVuZGVyQ29tcG9uZW50Jyk7XHJcbmNvbnN0IE1lc2ggPSByZXF1aXJlKCcuL0NDTWVzaCcpO1xyXG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcclxuY29uc3QgUmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlcicpO1xyXG5jb25zdCBNYXRlcmlhbCA9IHJlcXVpcmUoJy4uL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gU2hhZG93IHByb2plY3Rpb24gbW9kZVxyXG4gKlxyXG4gKiAhI2NoIOmYtOW9seaKleWwhOaWueW8j1xyXG4gKiBAc3RhdGljXHJcbiAqIEBlbnVtIE1lc2hSZW5kZXJlci5TaGFkb3dDYXN0aW5nTW9kZVxyXG4gKi9cclxubGV0IFNoYWRvd0Nhc3RpbmdNb2RlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqXHJcbiAgICAgKiAhI2NoIOWFs+mXremYtOW9seaKleWwhFxyXG4gICAgICogQHByb3BlcnR5IE9GRlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPRkY6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqXHJcbiAgICAgKiAhI2NoIOW8gOWQr+mYtOW9seaKleWwhO+8jOW9k+mYtOW9seWFieS6p+eUn+eahOaXtuWAmVxyXG4gICAgICogQHByb3BlcnR5IE9OXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE9OOiAxLFxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiAhI2VuXHJcbiAgICAvLyAgKlxyXG4gICAgLy8gICogISNjaCDlj6/ku6Xku47nvZHmoLznmoTku7vmhI/kuIDpgY3mipXlsITlh7rpmLTlvbFcclxuICAgIC8vICAqIEBwcm9wZXJ0eSBUV09fU0lERURcclxuICAgIC8vICAqIEByZWFkb25seVxyXG4gICAgLy8gICogQHR5cGUge051bWJlcn1cclxuICAgIC8vICAqL1xyXG4gICAgLy8gVFdPX1NJREVEOiAyLFxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiAhI2VuXHJcbiAgICAvLyAgKlxyXG4gICAgLy8gICogISNjaCDlj6rmmL7npLrpmLTlvbFcclxuICAgIC8vICAqIEBwcm9wZXJ0eSBTSEFET1dTX09OTFlcclxuICAgIC8vICAqIEByZWFkb25seVxyXG4gICAgLy8gICogQHR5cGUge051bWJlcn1cclxuICAgIC8vICAqL1xyXG4gICAgLy8gU0hBRE9XU19PTkxZOiAzLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE1lc2ggUmVuZGVyZXIgQ29tcG9uZW50XHJcbiAqICEjemhcclxuICog572R5qC85riy5p+T57uE5Lu2XHJcbiAqIEBjbGFzcyBNZXNoUmVuZGVyZXJcclxuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XHJcbiAqL1xyXG5sZXQgTWVzaFJlbmRlcmVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLk1lc2hSZW5kZXJlcicsXHJcbiAgICBleHRlbmRzOiBSZW5kZXJDb21wb25lbnQsXHJcbiAgICBcclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50Lm1lc2gvTWVzaFJlbmRlcmVyJyxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9tZXNoOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IE1lc2hcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcmVjZWl2ZVNoYWRvd3M6IGZhbHNlLFxyXG4gICAgICAgIF9zaGFkb3dDYXN0aW5nTW9kZTogU2hhZG93Q2FzdGluZ01vZGUuT0ZGLFxyXG5cclxuICAgICAgICBfZW5hYmxlQXV0b0JhdGNoOiBmYWxzZSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtZXNoIHdoaWNoIHRoZSByZW5kZXJlciB1c2VzLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDorr7nva7kvb/nlKjnmoTnvZHmoLxcclxuICAgICAgICAgKiBAcHJvcGVydHkge01lc2h9IG1lc2hcclxuICAgICAgICAgKi9cclxuICAgICAgICBtZXNoOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWVzaDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWVzaCA9PT0gdikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0TWVzaCh2KTtcclxuICAgICAgICAgICAgICAgIGlmICghdikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBNZXNoLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRleHR1cmVzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UZXh0dXJlMkQsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIG1lc2ggc2hvdWxkIHJlY2VpdmUgc2hhZG93cy5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog572R5qC85piv5ZCm5o6l5Y+X5YWJ5rqQ5oqV5bCE55qE6Zi05b2xXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSByZWNlaXZlU2hhZG93c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlY2VpdmVTaGFkb3dzOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjZWl2ZVNoYWRvd3M7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNlaXZlU2hhZG93cyA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJlY2VpdmVTaGFkb3coKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogU2hhZG93IENhc3RpbmcgTW9kZVxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDnvZHmoLzmipXlsITpmLTlvbHnmoTmqKHlvI9cclxuICAgICAgICAgKiBAcHJvcGVydHkge1NoYWRvd0Nhc3RpbmdNb2RlfSBzaGFkb3dDYXN0aW5nTW9kZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNoYWRvd0Nhc3RpbmdNb2RlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93Q2FzdGluZ01vZGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGFkb3dDYXN0aW5nTW9kZSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhc3RTaGFkb3coKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogU2hhZG93Q2FzdGluZ01vZGUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEVuYWJsZSBhdXRvIG1lcmdlIG1lc2gsIG9ubHkgc3VwcG9ydCB3aGVuIG1lc2gncyBWZXJ0ZXhGb3JtYXQsIFByaW1pdGl2ZVR5cGUsIG1hdGVyaWFscyBhcmUgYWxsIHRoZSBzYW1lXHJcbiAgICAgICAgICogISN6aCBcclxuICAgICAgICAgKiDlvIDlkK/oh6rliqjlkIjlubYgbWVzaCDlip/og73vvIzlj6rmnInlnKjnvZHmoLznmoQg6aG254K55qC85byP77yMUHJpbWl0aXZlVHlwZSwg5L2/55So55qE5p2Q6LSoIOmDveS4gOiHtOeahOaDheWGteS4i+aJjeS8muacieaViFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlQXV0b0JhdGNoXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZW5hYmxlQXV0b0JhdGNoOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlQXV0b0JhdGNoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlQXV0b0JhdGNoID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFNoYWRvd0Nhc3RpbmdNb2RlOiBTaGFkb3dDYXN0aW5nTW9kZVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9ib3VuZGluZ0JveCA9IGNjLmdlb21VdGlscyAmJiBuZXcgQWFiYigpO1xyXG5cclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWdEYXRhcyA9IHtcclxuICAgICAgICAgICAgICAgIHdpcmVGcmFtZTogW10sXHJcbiAgICAgICAgICAgICAgICBub3JtYWw6IFtdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fbWVzaCAmJiAhdGhpcy5fbWVzaC5sb2FkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc2gub25jZSgnbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRNZXNoKHRoaXMuX21lc2gpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHRoaXMuX21lc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0TWVzaCh0aGlzLl9tZXNoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlck5vZGUoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3kgKCkge1xyXG4gICAgICAgIHRoaXMuX3NldE1lc2gobnVsbCk7XHJcbiAgICAgICAgY2MucG9vbC5hc3NlbWJsZXIucHV0KHRoaXMuX2Fzc2VtYmxlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVSZW5kZXJOb2RlICgpIHtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuc2V0UmVuZGVyTm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc2V0TWVzaCAobWVzaCkge1xyXG4gICAgICAgIGlmIChjYy5nZW9tVXRpbHMgJiYgbWVzaCkge1xyXG4gICAgICAgICAgICBBYWJiLmZyb21Qb2ludHModGhpcy5fYm91bmRpbmdCb3gsIG1lc2guX21pblBvcywgbWVzaC5fbWF4UG9zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc2gub2ZmKCdpbml0LWZvcm1hdCcsIHRoaXMuX3VwZGF0ZU1lc2hBdHRyaWJ1dGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWVzaCkge1xyXG4gICAgICAgICAgICBtZXNoLm9uKCdpbml0LWZvcm1hdCcsIHRoaXMuX3VwZGF0ZU1lc2hBdHRyaWJ1dGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tZXNoID0gbWVzaDtcclxuICAgICAgICB0aGlzLl9hc3NlbWJsZXIgJiYgKHRoaXMuX2Fzc2VtYmxlci5fd29ybGREYXRhcyA9IHt9KTtcclxuICAgICAgICB0aGlzLl91cGRhdGVNZXNoQXR0cmlidXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXREZWZhdWx0TWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJ3VubGl0Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF92YWxpZGF0ZVJlbmRlciAoKSB7XHJcbiAgICAgICAgbGV0IG1lc2ggPSB0aGlzLl9tZXNoO1xyXG4gICAgICAgIGlmIChtZXNoICYmIG1lc2guX3N1YkRhdGFzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XHJcbiAgICAgICAgLy8gVE9ETzogdXNlZCB0byB1cGdyYWRlIGZyb20gMi4xLCBzaG91bGQgYmUgcmVtb3ZlZFxyXG4gICAgICAgIGxldCB0ZXh0dXJlcyA9IHRoaXMudGV4dHVyZXM7XHJcbiAgICAgICAgaWYgKHRleHR1cmVzICYmIHRleHR1cmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRNYXRlcmlhbCA9IHRoaXMuX2dldERlZmF1bHRNYXRlcmlhbCgpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHR1cmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwgJiYgbWF0ZXJpYWwuX3V1aWQgIT09IGRlZmF1bHRNYXRlcmlhbC5fdXVpZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKGRlZmF1bHRNYXRlcmlhbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNYXRlcmlhbChpLCBtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgnZGlmZnVzZVRleHR1cmUnLCB0ZXh0dXJlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlY2VpdmVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVDYXN0U2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTWVzaEF0dHJpYnV0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlUmVjZWl2ZVNoYWRvdyAoKSB7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFscyA9IHRoaXMuZ2V0TWF0ZXJpYWxzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRlcmlhbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWxzW2ldLmRlZmluZSgnQ0NfVVNFX1NIQURPV19NQVAnLCB0aGlzLl9yZWNlaXZlU2hhZG93cywgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVDYXN0U2hhZG93ICgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5nZXRNYXRlcmlhbHMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtYXRlcmlhbHNbaV0uZGVmaW5lKCdDQ19DQVNUSU5HX1NIQURPVycsIHRoaXMuX3NoYWRvd0Nhc3RpbmdNb2RlID09PSBTaGFkb3dDYXN0aW5nTW9kZS5PTiwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVNZXNoQXR0cmlidXRlICgpIHtcclxuICAgICAgICBsZXQgc3ViRGF0YXMgPSB0aGlzLl9tZXNoICYmIHRoaXMuX21lc2guc3ViRGF0YXM7XHJcbiAgICAgICAgaWYgKCFzdWJEYXRhcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gdGhpcy5nZXRNYXRlcmlhbHMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGVyaWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXN1YkRhdGFzW2ldKSBicmVhaztcclxuICAgICAgICAgICAgbGV0IHZmbSA9IHN1YkRhdGFzW2ldLnZmbTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbWF0ZXJpYWxzW2ldO1xyXG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9BVFRSSUJVVEVfQ09MT1InLCAhIXZmbS5lbGVtZW50KGdmeC5BVFRSX0NPTE9SKSwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfQVRUUklCVVRFX1VWMCcsICEhdmZtLmVsZW1lbnQoZ2Z4LkFUVFJfVVYwKSwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfQVRUUklCVVRFX05PUk1BTCcsICEhdmZtLmVsZW1lbnQoZ2Z4LkFUVFJfTk9STUFMKSwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfQVRUUklCVVRFX1RBTkdFTlQnLCAhIXZmbS5lbGVtZW50KGdmeC5BVFRSX1RBTkdFTlQpLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5hbWUgaW4gdGhpcy5fZGVidWdEYXRhcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWdEYXRhc1tuYW1lXS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci51cGRhdGVNZXNoRGF0YSh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jaGVja0JhY3RoICgpIHtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuaWYgKENDX0RFQlVHKSB7XHJcbiAgICBjb25zdCBCTEFDS19DT0xPUiA9IGNjLkNvbG9yLkJMQUNLO1xyXG4gICAgY29uc3QgUkVEX0NPTE9SID0gY2MuQ29sb3IuUkVEO1xyXG5cclxuICAgIGxldCB2M190bXAgPSBbY2MudjMoKSwgY2MudjMoKV07XHJcbiAgICBsZXQgbWF0NF90bXAgPSBjYy5tYXQ0KCk7XHJcblxyXG4gICAgbGV0IGNyZWF0ZURlYnVnRGF0YUZucyA9IHtcclxuICAgICAgICBub3JtYWwgKGNvbXAsIGlhLCBzdWJEYXRhLCBzdWJJbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgb2xkVmZtID0gc3ViRGF0YS52Zm07XHJcblxyXG4gICAgICAgICAgICBsZXQgbm9ybWFsRWxlID0gb2xkVmZtLmVsZW1lbnQoZ2Z4LkFUVFJfTk9STUFMKTtcclxuICAgICAgICAgICAgbGV0IHBvc0VsZSA9IG9sZFZmbS5lbGVtZW50KGdmeC5BVFRSX1BPU0lUSU9OKTtcclxuICAgICAgICAgICAgbGV0IGpvaW50RWxlID0gb2xkVmZtLmVsZW1lbnQoZ2Z4LkFUVFJfSk9JTlRTKTtcclxuICAgICAgICAgICAgbGV0IHdlaWdodEVsZSA9IG9sZFZmbS5lbGVtZW50KGdmeC5BVFRSX1dFSUdIVFMpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFub3JtYWxFbGUgfHwgIXBvc0VsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kaWNlcyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdmJEYXRhID0gW107XHJcblxyXG4gICAgICAgICAgICBsZXQgbGluZUxlbmd0aCA9IDEwMDtcclxuICAgICAgICAgICAgVmVjMy5zZXQodjNfdG1wWzBdLCA1LCAwLCAwKTtcclxuICAgICAgICAgICAgTWF0NC5pbnZlcnQobWF0NF90bXAsIGNvbXAubm9kZS5fd29ybGRNYXRyaXgpO1xyXG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDROb3JtYWwodjNfdG1wWzBdLCB2M190bXBbMF0sIG1hdDRfdG1wKTtcclxuICAgICAgICAgICAgbGluZUxlbmd0aCA9IHYzX3RtcFswXS5tYWcoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtZXNoID0gY29tcC5tZXNoO1xyXG4gICAgICAgICAgICBsZXQgcG9zRGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShzdWJJbmRleCwgZ2Z4LkFUVFJfUE9TSVRJT04pO1xyXG4gICAgICAgICAgICBsZXQgbm9ybWFsRGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShzdWJJbmRleCwgZ2Z4LkFUVFJfTk9STUFMKTtcclxuICAgICAgICAgICAgbGV0IGpvaW50RGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShzdWJJbmRleCwgZ2Z4LkFUVFJfSk9JTlRTKTtcclxuICAgICAgICAgICAgbGV0IHdlaWdodERhdGEgPSBtZXNoLl9nZXRBdHRyTWVzaERhdGEoc3ViSW5kZXgsIGdmeC5BVFRSX1dFSUdIVFMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZlcnRleENvdW50ID0gcG9zRGF0YS5sZW5ndGggLyBwb3NFbGUubnVtO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsSW5kZXggPSBpICogbm9ybWFsRWxlLm51bTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3NJbmRleCA9IGkgKiBwb3NFbGUubnVtO1xyXG5cclxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHYzX3RtcFswXSwgbm9ybWFsRGF0YVtub3JtYWxJbmRleF0sIG5vcm1hbERhdGFbbm9ybWFsSW5kZXgrMV0sIG5vcm1hbERhdGFbbm9ybWFsSW5kZXgrMl0pO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodjNfdG1wWzFdLCBwb3NEYXRhW3Bvc0luZGV4XSwgcG9zRGF0YVtwb3NJbmRleCsxXSwgcG9zRGF0YVtwb3NJbmRleCsyXSk7XHJcbiAgICAgICAgICAgICAgICBWZWMzLnNjYWxlQW5kQWRkKHYzX3RtcFswXSwgdjNfdG1wWzFdLCB2M190bXBbMF0sIGxpbmVMZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGxpbmVJbmRleCA9IDA7IGxpbmVJbmRleCA8IDI7IGxpbmVJbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmJEYXRhLnB1c2godjNfdG1wW2xpbmVJbmRleF0ueCwgdjNfdG1wW2xpbmVJbmRleF0ueSwgdjNfdG1wW2xpbmVJbmRleF0ueik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpvaW50RWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqb2ludEluZGV4ID0gaSAqIGpvaW50RWxlLm51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBqb2ludEVsZS5udW07IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmJEYXRhLnB1c2goam9pbnREYXRhW2pvaW50SW5kZXggKyBqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlaWdodEVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2VpZ2h0SW5kZXggPSBpICogd2VpZ2h0RWxlLm51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB3ZWlnaHRFbGUubnVtOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZiRGF0YS5wdXNoKHdlaWdodERhdGFbd2VpZ2h0SW5kZXggKyBqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGkqMiwgaSoyKzEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybWF0T3B0cyA9IFtcclxuICAgICAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmIChqb2ludEVsZSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0cy5wdXNoKHsgbmFtZTogZ2Z4LkFUVFJfSk9JTlRTLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogam9pbnRFbGUubnVtIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHdlaWdodEVsZSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0T3B0cy5wdXNoKHsgbmFtZTogZ2Z4LkFUVFJfV0VJR0hUUywgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IHdlaWdodEVsZS5udW0gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZ2Z4VkZtdCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KGZvcm1hdE9wdHMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZiID0gbmV3IGdmeC5WZXJ0ZXhCdWZmZXIoXHJcbiAgICAgICAgICAgICAgICBSZW5kZXJlci5kZXZpY2UsXHJcbiAgICAgICAgICAgICAgICBnZnhWRm10LFxyXG4gICAgICAgICAgICAgICAgZ2Z4LlVTQUdFX1NUQVRJQyxcclxuICAgICAgICAgICAgICAgIG5ldyBGbG9hdDMyQXJyYXkodmJEYXRhKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgbGV0IGliRGF0YSA9IG5ldyBVaW50MTZBcnJheShpbmRpY2VzKTtcclxuICAgICAgICAgICAgbGV0IGliID0gbmV3IGdmeC5JbmRleEJ1ZmZlcihcclxuICAgICAgICAgICAgICAgIFJlbmRlcmVyLmRldmljZSxcclxuICAgICAgICAgICAgICAgIGdmeC5JTkRFWF9GTVRfVUlOVDE2LFxyXG4gICAgICAgICAgICAgICAgZ2Z4LlVTQUdFX1NUQVRJQyxcclxuICAgICAgICAgICAgICAgIGliRGF0YSxcclxuICAgICAgICAgICAgICAgIGliRGF0YS5sZW5ndGhcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCd1bmxpdCcpO1xyXG4gICAgICAgICAgICBtLnNldFByb3BlcnR5KCdkaWZmdXNlQ29sb3InLCBSRURfQ09MT1IpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBtLFxyXG4gICAgICAgICAgICAgICAgaWE6IG5ldyBJbnB1dEFzc2VtYmxlcih2YiwgaWIsIGdmeC5QVF9MSU5FUylcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3aXJlRnJhbWUgKGNvbXAsIGlhLCBzdWJEYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBvbGRJYkRhdGEgPSBzdWJEYXRhLmdldElEYXRhKFVpbnQxNkFycmF5KTtcclxuICAgICAgICAgICAgbGV0IG0gPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlV2l0aEJ1aWx0aW4oJ3VubGl0Jyk7XHJcbiAgICAgICAgICAgIG0uc2V0UHJvcGVydHkoJ2RpZmZ1c2VDb2xvcicsIEJMQUNLX0NPTE9SKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRpY2VzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkSWJEYXRhLmxlbmd0aDsgaSs9Mykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBvbGRJYkRhdGFbIGkgKyAwIF07XHJcbiAgICAgICAgICAgICAgICBsZXQgYiA9IG9sZEliRGF0YVsgaSArIDEgXTtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gb2xkSWJEYXRhWyBpICsgMiBdO1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGEsIGIsIGIsIGMsIGMsIGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaWJEYXRhID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXMpO1xyXG4gICAgICAgICAgICBsZXQgaWIgPSBuZXcgZ2Z4LkluZGV4QnVmZmVyKFxyXG4gICAgICAgICAgICAgICAgUmVuZGVyZXIuZGV2aWNlLFxyXG4gICAgICAgICAgICAgICAgZ2Z4LklOREVYX0ZNVF9VSU5UMTYsXHJcbiAgICAgICAgICAgICAgICBnZnguVVNBR0VfU1RBVElDLFxyXG4gICAgICAgICAgICAgICAgaWJEYXRhLFxyXG4gICAgICAgICAgICAgICAgaWJEYXRhLmxlbmd0aFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsOiBtLFxyXG4gICAgICAgICAgICAgICAgaWE6IG5ldyBJbnB1dEFzc2VtYmxlcihpYS5fdmVydGV4QnVmZmVyLCBpYiwgZ2Z4LlBUX0xJTkVTKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IF9wcm90byA9IE1lc2hSZW5kZXJlci5wcm90b3R5cGU7XHJcbiAgICBfcHJvdG8uX3VwZGF0ZURlYnVnRGF0YXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGRlYnVnRGF0YXMgPSB0aGlzLl9kZWJ1Z0RhdGFzO1xyXG4gICAgICAgIGxldCBzdWJNZXNoZXMgPSB0aGlzLl9tZXNoLnN1Yk1lc2hlcztcclxuICAgICAgICBsZXQgc3ViRGF0YXMgPSB0aGlzLl9tZXNoLl9zdWJEYXRhcztcclxuICAgICAgICBmb3IgKGxldCBuYW1lIGluIGRlYnVnRGF0YXMpIHtcclxuICAgICAgICAgICAgbGV0IGRlYnVnRGF0YSA9IGRlYnVnRGF0YXNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChkZWJ1Z0RhdGEubGVuZ3RoID09PSBzdWJNZXNoZXMubGVuZ3RoKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCFjYy5tYWNyb1snU0hPV19NRVNIXycgKyBuYW1lLnRvVXBwZXJDYXNlKCldKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIGRlYnVnRGF0YS5sZW5ndGggPSBzdWJNZXNoZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Yk1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZGVidWdEYXRhW2ldID0gY3JlYXRlRGVidWdEYXRhRm5zW25hbWVdKHRoaXMsIHN1Yk1lc2hlc1tpXSwgc3ViRGF0YXNbaV0sIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuY2MuTWVzaFJlbmRlcmVyID0gbW9kdWxlLmV4cG9ydHMgPSBNZXNoUmVuZGVyZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9