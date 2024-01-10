
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/renderer/particle-system-3d-renderer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../../value-types");

var _gfx = _interopRequireDefault(require("../../../../renderer/gfx"));

var _particleBatchModel = _interopRequireDefault(require("./particle-batch-model"));

var _materialVariant = _interopRequireDefault(require("../../../assets/material/material-variant"));

var _recyclePool = _interopRequireDefault(require("../../../../renderer/memop/recycle-pool"));

var _enum = require("../enum");

var _particle = _interopRequireDefault(require("../particle"));

var _assembler = _interopRequireDefault(require("../../../renderer/assembler"));

var _particleSystem3d = _interopRequireDefault(require("../particle-system-3d"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../../../platform/CCClassDecorator'),
    ccclass = _require.ccclass,
    property = _require.property; // tslint:disable: max-line-length


var _tempAttribUV = new _valueTypes.Vec3();

var _tempAttribUV0 = new _valueTypes.Vec2();

var _tempAttribColor = new _valueTypes.Vec4();

var _tempWorldTrans = new _valueTypes.Mat4();

var _uvs = [0, 0, // bottom-left
1, 0, // bottom-right
0, 1, // top-left
1, 1 // top-right
];
var CC_USE_WORLD_SPACE = 'CC_USE_WORLD_SPACE';
var CC_USE_BILLBOARD = 'CC_USE_BILLBOARD';
var CC_USE_STRETCHED_BILLBOARD = 'CC_USE_STRETCHED_BILLBOARD';
var CC_USE_HORIZONTAL_BILLBOARD = 'CC_USE_HORIZONTAL_BILLBOARD';
var CC_USE_VERTICAL_BILLBOARD = 'CC_USE_VERTICAL_BILLBOARD';
var CC_USE_MESH = 'CC_USE_MESH'; //const CC_DRAW_WIRE_FRAME = 'CC_DRAW_WIRE_FRAME'; // <wireframe debug>

var vfmtNormal = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}]);
vfmtNormal.name = 'vfmtNormal';
var vfmtStretch = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: _gfx["default"].ATTR_COLOR1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}]);
vfmtStretch.name = 'vfmtStretch';
var vfmtMesh = new _gfx["default"].VertexFormat([{
  name: _gfx["default"].ATTR_POSITION,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD1,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_TEX_COORD2,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}, {
  name: _gfx["default"].ATTR_TEX_COORD3,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_NORMAL,
  type: _gfx["default"].ATTR_TYPE_FLOAT32,
  num: 3
}, {
  name: _gfx["default"].ATTR_COLOR1,
  type: _gfx["default"].ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}]);
vfmtMesh.name = 'vfmtMesh';
var ParticleSystem3DAssembler = (_dec = ccclass('cc.ParticleSystem3DAssembler'), _dec(_class = (_temp = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(ParticleSystem3DAssembler, _Assembler);

  function ParticleSystem3DAssembler() {
    var _this;

    _this = _Assembler.call(this) || this;
    _this._defines = null;
    _this._trailDefines = null;
    _this._model = null;
    _this.frameTile_velLenScale = null;
    _this.attrs = [];
    _this._vertFormat = [];
    _this._particleSystem = null;
    _this._particles = null;
    _this._defaultMat = null;
    _this._isAssetReady = false;
    _this._defaultTrailMat = null;
    _this._customProperties = null;
    _this._node_scale = null;
    _this._model = null;
    _this.frameTile_velLenScale = cc.v4(1, 1, 0, 0);
    _this._node_scale = cc.v4();
    _this.attrs = new Array(5);
    _this._trailDefines = {
      CC_USE_WORLD_SPACE: true //CC_DRAW_WIRE_FRAME: true,   // <wireframe debug>

    };
    return _this;
  }

  var _proto = ParticleSystem3DAssembler.prototype;

  _proto.onInit = function onInit(ps) {
    var _this2 = this;

    this._particleSystem = ps;
    this._particles = new _recyclePool["default"](function () {
      return new _particle["default"](_this2);
    }, 16);

    this._setVertexAttrib();

    this.onEnable();

    this._updateModel();

    this._updateMaterialParams();

    this._updateTrailMaterial();
  };

  _proto.onEnable = function onEnable() {
    if (!this._particleSystem) {
      return;
    }

    if (this._model == null) {
      this._model = new _particleBatchModel["default"]();
    }

    if (!this._model.inited) {
      this._model.setCapacity(this._particleSystem.capacity);
    }

    this._model.enabled = this._particleSystem.enabledInHierarchy;
  };

  _proto.onDisable = function onDisable() {
    if (this._model) {
      this._model.enabled = this._particleSystem.enabledInHierarchy;
    }
  };

  _proto.onDestroy = function onDestroy() {
    this._model = null;
  };

  _proto.clear = function clear() {
    this._particles.reset();

    this.updateParticleBuffer();
  };

  _proto._getFreeParticle = function _getFreeParticle() {
    if (this._particles.length >= this._particleSystem.capacity) {
      return null;
    }

    return this._particles.add();
  };

  _proto._setNewParticle = function _setNewParticle(p) {};

  _proto._updateParticles = function _updateParticles(dt) {
    this._particleSystem.node.getWorldMatrix(_tempWorldTrans);

    switch (this._particleSystem.scaleSpace) {
      case _enum.Space.Local:
        this._particleSystem.node.getScale(this._node_scale);

        break;

      case _enum.Space.World:
        this._particleSystem.node.getWorldScale(this._node_scale);

        break;
    }

    var material = this._particleSystem.materials[0];
    var mat = material ? this._particleSystem.particleMaterial : this._defaultMat;
    mat.setProperty('scale', this._node_scale);

    if (this._particleSystem.velocityOvertimeModule.enable) {
      this._particleSystem.velocityOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
    }

    if (this._particleSystem.forceOvertimeModule.enable) {
      this._particleSystem.forceOvertimeModule.update(this._particleSystem._simulationSpace, _tempWorldTrans);
    }

    if (this._particleSystem.trailModule.enable) {
      this._particleSystem.trailModule.update();
    }

    for (var i = 0; i < this._particles.length; ++i) {
      var p = this._particles.data[i];
      p.remainingLifetime -= dt;

      _valueTypes.Vec3.set(p.animatedVelocity, 0, 0, 0);

      if (p.remainingLifetime < 0.0) {
        if (this._particleSystem.trailModule.enable) {
          this._particleSystem.trailModule.removeParticle(p);
        }

        this._particles.remove(i);

        --i;
        continue;
      }

      p.velocity.y -= this._particleSystem.gravityModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, p.randomSeed) * 9.8 * dt; // apply gravity.

      if (this._particleSystem.sizeOvertimeModule.enable) {
        this._particleSystem.sizeOvertimeModule.animate(p);
      }

      if (this._particleSystem.colorOverLifetimeModule.enable) {
        this._particleSystem.colorOverLifetimeModule.animate(p);
      }

      if (this._particleSystem.forceOvertimeModule.enable) {
        this._particleSystem.forceOvertimeModule.animate(p, dt);
      }

      if (this._particleSystem.velocityOvertimeModule.enable) {
        this._particleSystem.velocityOvertimeModule.animate(p);
      } else {
        _valueTypes.Vec3.copy(p.ultimateVelocity, p.velocity);
      }

      if (this._particleSystem.limitVelocityOvertimeModule.enable) {
        this._particleSystem.limitVelocityOvertimeModule.animate(p);
      }

      if (this._particleSystem.rotationOvertimeModule.enable) {
        this._particleSystem.rotationOvertimeModule.animate(p, dt);
      }

      if (this._particleSystem.textureAnimationModule.enable) {
        this._particleSystem.textureAnimationModule.animate(p);
      }

      _valueTypes.Vec3.scaleAndAdd(p.position, p.position, p.ultimateVelocity, dt); // apply velocity.


      if (this._particleSystem.trailModule.enable) {
        this._particleSystem.trailModule.animate(p, dt);
      }
    }

    return this._particles.length;
  } // internal function
  ;

  _proto.updateParticleBuffer = function updateParticleBuffer() {
    // update vertex buffer
    var idx = 0;
    var uploadVel = this._particleSystem.renderMode === _enum.RenderMode.StrecthedBillboard;

    for (var i = 0; i < this._particles.length; ++i) {
      var p = this._particles.data[i];
      var fi = 0;

      if (this._particleSystem.textureAnimationModule.enable) {
        fi = p.frameIndex;
      }

      idx = i * 4;
      var attrNum = 0;

      if (this._particleSystem.renderMode !== _enum.RenderMode.Mesh) {
        for (var j = 0; j < 4; ++j) {
          // four verts per particle.
          attrNum = 0;
          this.attrs[attrNum++] = p.position;
          _tempAttribUV.x = _uvs[2 * j];
          _tempAttribUV.y = _uvs[2 * j + 1];
          _tempAttribUV.z = fi;
          this.attrs[attrNum++] = _tempAttribUV;
          this.attrs[attrNum++] = p.size;
          this.attrs[attrNum++] = p.rotation;
          this.attrs[attrNum++] = p.color._val;

          if (uploadVel) {
            this.attrs[attrNum++] = p.ultimateVelocity;
          } else {
            this.attrs[attrNum++] = null;
          }

          this._model.addParticleVertexData(idx++, this.attrs);
        }
      } else {
        attrNum = 0;
        this.attrs[attrNum++] = p.position;
        _tempAttribUV.z = fi;
        this.attrs[attrNum++] = _tempAttribUV;
        this.attrs[attrNum++] = p.size;
        this.attrs[attrNum++] = p.rotation;
        this.attrs[attrNum++] = p.color._val;

        this._model.addParticleVertexData(i, this.attrs);
      }
    }

    this.updateIA(0, this._particles.length * this._model._indexCount, true);
  };

  _proto.updateShaderUniform = function updateShaderUniform() {};

  _proto.updateIA = function updateIA(index, count, vDirty, iDirty) {
    if (!this._model) return;

    this._model.updateIA(index, count, vDirty, iDirty);
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._particles.data.length;
  };

  _proto._onMaterialModified = function _onMaterialModified(index, material) {
    if (index === 0) {
      this._updateModel();

      this._updateMaterialParams();
    } else {
      this._updateTrailMaterial();
    }
  };

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
    if (this._model && index === 0) {
      this._model.setModelMaterial(material);
    }

    if (this._particleSystem.trailModule._trailModel && index === 1) {
      this._particleSystem.trailModule._trailModel.setModelMaterial(material);
    }
  };

  _proto._ensureLoadMesh = function _ensureLoadMesh() {
    if (this._particleSystem.mesh && !this._particleSystem.mesh.loaded) {
      cc.assetManager.postLoadNative(this._particleSystem.mesh);
    }
  };

  _proto.setCapacity = function setCapacity(capacity) {
    if (!this._model) return;

    this._model.setCapacity(capacity);
  };

  _proto._setVertexAttrib = function _setVertexAttrib() {
    switch (this._particleSystem.renderMode) {
      case _enum.RenderMode.StrecthedBillboard:
        this._vertFormat = vfmtStretch;
        break;

      case _enum.RenderMode.Mesh:
        this._vertFormat = vfmtMesh;
        break;

      default:
        this._vertFormat = vfmtNormal;
    }
  };

  _proto._updateMaterialParams = function _updateMaterialParams() {
    if (!this._particleSystem) {
      return;
    }

    var mat = this._particleSystem.materials[0];

    if (mat == null && this._defaultMat == null) {
      mat = this._defaultMat = _materialVariant["default"].createWithBuiltin('3d-particle', this);
    } else {
      mat = _materialVariant["default"].create(mat, this._particleSystem);
    }

    mat = mat || this._defaultMat;

    if (this._particleSystem._simulationSpace === _enum.Space.World) {
      mat.define(CC_USE_WORLD_SPACE, true);
    } else {
      mat.define(CC_USE_WORLD_SPACE, false);
    }

    if (this._particleSystem.renderMode === _enum.RenderMode.Billboard) {
      mat.define(CC_USE_BILLBOARD, true);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.StrecthedBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, true);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
      this.frameTile_velLenScale.z = this._particleSystem.velocityScale;
      this.frameTile_velLenScale.w = this._particleSystem.lengthScale;
    } else if (this._particleSystem.renderMode === _enum.RenderMode.HorizontalBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, true);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.VerticalBillboard) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, true);
      mat.define(CC_USE_MESH, false);
    } else if (this._particleSystem.renderMode === _enum.RenderMode.Mesh) {
      mat.define(CC_USE_BILLBOARD, false);
      mat.define(CC_USE_STRETCHED_BILLBOARD, false);
      mat.define(CC_USE_HORIZONTAL_BILLBOARD, false);
      mat.define(CC_USE_VERTICAL_BILLBOARD, false);
      mat.define(CC_USE_MESH, true);
    } else {
      console.warn("particle system renderMode " + this._particleSystem.renderMode + " not support.");
    }

    if (this._particleSystem.textureAnimationModule.enable) {
      _valueTypes.Vec2.set(this.frameTile_velLenScale, this._particleSystem.textureAnimationModule.numTilesX, this._particleSystem.textureAnimationModule.numTilesY);
    }

    mat.setProperty('frameTile_velLenScale', this.frameTile_velLenScale);

    this._particleSystem.setMaterial(0, mat);
  };

  _proto._updateTrailMaterial = function _updateTrailMaterial() {
    // Here need to create a material variant through the getter call.
    var mat = this._particleSystem.trailMaterial;

    if (this._particleSystem.trailModule.enable) {
      if (mat === null && this._defaultTrailMat === null) {
        this._defaultTrailMat = _materialVariant["default"].createWithBuiltin('3d-trail', this);
      }

      if (mat === null) {
        mat = this._defaultTrailMat;
        this._particleSystem.trailMaterial = mat;
      }

      if (this._particleSystem._simulationSpace === _enum.Space.World || this._particleSystem.trailModule.space === _enum.Space.World) {
        mat.define(CC_USE_WORLD_SPACE, true);
      } else {
        mat.define(CC_USE_WORLD_SPACE, false);
      } //mat.define(CC_DRAW_WIRE_FRAME, true); // <wireframe debug>


      this._particleSystem.trailModule._updateMaterial();
    }
  };

  _proto._updateTrailEnable = function _updateTrailEnable(enable) {
    if (!this._model) {
      return;
    }

    var subData = this._model._subDatas[1];

    if (subData) {
      subData.enable = enable;
    }
  };

  _proto._updateModel = function _updateModel() {
    if (!this._model) {
      return;
    }

    this._model.setVertexAttributes(this._particleSystem.renderMode === _enum.RenderMode.Mesh ? this._particleSystem.mesh : null, this._vertFormat);
  };

  _proto.setVertexAttributes = function setVertexAttributes(mesh, vfmt) {
    if (!this._model) {
      return;
    }

    this._model.setVertexAttributes(mesh, vfmt);
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (!this._model) return;

    this._model._uploadData();

    var submeshes = this._model._subMeshes;
    var subDatas = this._model._subDatas;
    var materials = comp.materials;

    renderer._flush();

    for (var i = 0, len = submeshes.length; i < len; i++) {
      var ia = submeshes[i];
      var meshData = subDatas[i];
      var material = materials[i];

      if (meshData.enable) {
        renderer.material = material;
        renderer.cullingMask = comp.node._cullingMask;
        renderer.node = comp.node;

        renderer._flushIA(ia);
      }
    }
  };

  return ParticleSystem3DAssembler;
}(_assembler["default"]), _temp)) || _class);
exports["default"] = ParticleSystem3DAssembler;
Object.assign(ParticleSystem3DAssembler, {
  uv: _uvs
});

_assembler["default"].register(_particleSystem3d["default"], ParticleSystem3DAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxccmVuZGVyZXJcXHBhcnRpY2xlLXN5c3RlbS0zZC1yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2NjbGFzcyIsInByb3BlcnR5IiwiX3RlbXBBdHRyaWJVViIsIlZlYzMiLCJfdGVtcEF0dHJpYlVWMCIsIlZlYzIiLCJfdGVtcEF0dHJpYkNvbG9yIiwiVmVjNCIsIl90ZW1wV29ybGRUcmFucyIsIk1hdDQiLCJfdXZzIiwiQ0NfVVNFX1dPUkxEX1NQQUNFIiwiQ0NfVVNFX0JJTExCT0FSRCIsIkNDX1VTRV9TVFJFVENIRURfQklMTEJPQVJEIiwiQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJEIiwiQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCIsIkNDX1VTRV9NRVNIIiwidmZtdE5vcm1hbCIsImdmeCIsIlZlcnRleEZvcm1hdCIsIm5hbWUiLCJBVFRSX1BPU0lUSU9OIiwidHlwZSIsIkFUVFJfVFlQRV9GTE9BVDMyIiwibnVtIiwiQVRUUl9URVhfQ09PUkQiLCJBVFRSX1RFWF9DT09SRDEiLCJBVFRSX1RFWF9DT09SRDIiLCJBVFRSX0NPTE9SIiwiQVRUUl9UWVBFX1VJTlQ4Iiwibm9ybWFsaXplIiwidmZtdFN0cmV0Y2giLCJBVFRSX0NPTE9SMSIsInZmbXRNZXNoIiwiQVRUUl9URVhfQ09PUkQzIiwiQVRUUl9OT1JNQUwiLCJQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyIiwiX2RlZmluZXMiLCJfdHJhaWxEZWZpbmVzIiwiX21vZGVsIiwiZnJhbWVUaWxlX3ZlbExlblNjYWxlIiwiYXR0cnMiLCJfdmVydEZvcm1hdCIsIl9wYXJ0aWNsZVN5c3RlbSIsIl9wYXJ0aWNsZXMiLCJfZGVmYXVsdE1hdCIsIl9pc0Fzc2V0UmVhZHkiLCJfZGVmYXVsdFRyYWlsTWF0IiwiX2N1c3RvbVByb3BlcnRpZXMiLCJfbm9kZV9zY2FsZSIsImNjIiwidjQiLCJBcnJheSIsIm9uSW5pdCIsInBzIiwiUmVjeWNsZVBvb2wiLCJQYXJ0aWNsZSIsIl9zZXRWZXJ0ZXhBdHRyaWIiLCJvbkVuYWJsZSIsIl91cGRhdGVNb2RlbCIsIl91cGRhdGVNYXRlcmlhbFBhcmFtcyIsIl91cGRhdGVUcmFpbE1hdGVyaWFsIiwiUGFydGljbGVCYXRjaE1vZGVsIiwiaW5pdGVkIiwic2V0Q2FwYWNpdHkiLCJjYXBhY2l0eSIsImVuYWJsZWQiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJvbkRpc2FibGUiLCJvbkRlc3Ryb3kiLCJjbGVhciIsInJlc2V0IiwidXBkYXRlUGFydGljbGVCdWZmZXIiLCJfZ2V0RnJlZVBhcnRpY2xlIiwibGVuZ3RoIiwiYWRkIiwiX3NldE5ld1BhcnRpY2xlIiwicCIsIl91cGRhdGVQYXJ0aWNsZXMiLCJkdCIsIm5vZGUiLCJnZXRXb3JsZE1hdHJpeCIsInNjYWxlU3BhY2UiLCJTcGFjZSIsIkxvY2FsIiwiZ2V0U2NhbGUiLCJXb3JsZCIsImdldFdvcmxkU2NhbGUiLCJtYXRlcmlhbCIsIm1hdGVyaWFscyIsIm1hdCIsInBhcnRpY2xlTWF0ZXJpYWwiLCJzZXRQcm9wZXJ0eSIsInZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUiLCJlbmFibGUiLCJ1cGRhdGUiLCJfc2ltdWxhdGlvblNwYWNlIiwiZm9yY2VPdmVydGltZU1vZHVsZSIsInRyYWlsTW9kdWxlIiwiaSIsImRhdGEiLCJyZW1haW5pbmdMaWZldGltZSIsInNldCIsImFuaW1hdGVkVmVsb2NpdHkiLCJyZW1vdmVQYXJ0aWNsZSIsInJlbW92ZSIsInZlbG9jaXR5IiwieSIsImdyYXZpdHlNb2RpZmllciIsImV2YWx1YXRlIiwic3RhcnRMaWZldGltZSIsInJhbmRvbVNlZWQiLCJzaXplT3ZlcnRpbWVNb2R1bGUiLCJhbmltYXRlIiwiY29sb3JPdmVyTGlmZXRpbWVNb2R1bGUiLCJjb3B5IiwidWx0aW1hdGVWZWxvY2l0eSIsImxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUiLCJ0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlIiwic2NhbGVBbmRBZGQiLCJwb3NpdGlvbiIsImlkeCIsInVwbG9hZFZlbCIsInJlbmRlck1vZGUiLCJSZW5kZXJNb2RlIiwiU3RyZWN0aGVkQmlsbGJvYXJkIiwiZmkiLCJmcmFtZUluZGV4IiwiYXR0ck51bSIsIk1lc2giLCJqIiwieCIsInoiLCJzaXplIiwicm90YXRpb24iLCJjb2xvciIsIl92YWwiLCJhZGRQYXJ0aWNsZVZlcnRleERhdGEiLCJ1cGRhdGVJQSIsIl9pbmRleENvdW50IiwidXBkYXRlU2hhZGVyVW5pZm9ybSIsImluZGV4IiwiY291bnQiLCJ2RGlydHkiLCJpRGlydHkiLCJnZXRQYXJ0aWNsZUNvdW50IiwiX29uTWF0ZXJpYWxNb2RpZmllZCIsIl9vblJlYnVpbGRQU08iLCJzZXRNb2RlbE1hdGVyaWFsIiwiX3RyYWlsTW9kZWwiLCJfZW5zdXJlTG9hZE1lc2giLCJtZXNoIiwibG9hZGVkIiwiYXNzZXRNYW5hZ2VyIiwicG9zdExvYWROYXRpdmUiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGVXaXRoQnVpbHRpbiIsImNyZWF0ZSIsImRlZmluZSIsIkJpbGxib2FyZCIsInZlbG9jaXR5U2NhbGUiLCJ3IiwibGVuZ3RoU2NhbGUiLCJIb3Jpem9udGFsQmlsbGJvYXJkIiwiVmVydGljYWxCaWxsYm9hcmQiLCJjb25zb2xlIiwid2FybiIsIm51bVRpbGVzWCIsIm51bVRpbGVzWSIsInNldE1hdGVyaWFsIiwidHJhaWxNYXRlcmlhbCIsInNwYWNlIiwiX3VwZGF0ZU1hdGVyaWFsIiwiX3VwZGF0ZVRyYWlsRW5hYmxlIiwic3ViRGF0YSIsIl9zdWJEYXRhcyIsInNldFZlcnRleEF0dHJpYnV0ZXMiLCJ2Zm10IiwiZmlsbEJ1ZmZlcnMiLCJjb21wIiwicmVuZGVyZXIiLCJfdXBsb2FkRGF0YSIsInN1Ym1lc2hlcyIsIl9zdWJNZXNoZXMiLCJzdWJEYXRhcyIsIl9mbHVzaCIsImxlbiIsImlhIiwibWVzaERhdGEiLCJjdWxsaW5nTWFzayIsIl9jdWxsaW5nTWFzayIsIl9mbHVzaElBIiwiQXNzZW1ibGVyIiwiT2JqZWN0IiwiYXNzaWduIiwidXYiLCJyZWdpc3RlciIsIlBhcnRpY2xlU3lzdGVtM0QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztlQUU4QkEsT0FBTyxDQUFDLG9DQUFEO0lBQTdCQyxtQkFBQUE7SUFBU0Msb0JBQUFBLFVBRWpCOzs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsSUFBSUMsZ0JBQUosRUFBdEI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLElBQUlDLGdCQUFKLEVBQXZCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLElBQUlDLGdCQUFKLEVBQXpCOztBQUNBLElBQU1DLGVBQWUsR0FBRyxJQUFJQyxnQkFBSixFQUF4Qjs7QUFFQSxJQUFNQyxJQUFJLEdBQUcsQ0FDVCxDQURTLEVBQ04sQ0FETSxFQUNIO0FBQ04sQ0FGUyxFQUVOLENBRk0sRUFFSDtBQUNOLENBSFMsRUFHTixDQUhNLEVBR0g7QUFDTixDQUpTLEVBSU4sQ0FKTSxDQUlIO0FBSkcsQ0FBYjtBQU9BLElBQU1DLGtCQUFrQixHQUFHLG9CQUEzQjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLGtCQUF6QjtBQUNBLElBQU1DLDBCQUEwQixHQUFHLDRCQUFuQztBQUNBLElBQU1DLDJCQUEyQixHQUFHLDZCQUFwQztBQUNBLElBQU1DLHlCQUF5QixHQUFHLDJCQUFsQztBQUNBLElBQU1DLFdBQVcsR0FBRyxhQUFwQixFQUNBOztBQUdBLElBQUlDLFVBQVUsR0FBRyxJQUFJQyxnQkFBSUMsWUFBUixDQUFxQixDQUNsQztBQUFFQyxFQUFBQSxJQUFJLEVBQUVGLGdCQUFJRyxhQUFaO0FBQTJCQyxFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBckM7QUFBd0RDLEVBQUFBLEdBQUcsRUFBRTtBQUE3RCxDQURrQyxFQUVsQztBQUFFSixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJTyxjQUFaO0FBQTRCSCxFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBdEM7QUFBeURDLEVBQUFBLEdBQUcsRUFBRTtBQUE5RCxDQUZrQyxFQUdsQztBQUFFSixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJUSxlQUFaO0FBQTZCSixFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBdkM7QUFBMERDLEVBQUFBLEdBQUcsRUFBRTtBQUEvRCxDQUhrQyxFQUlsQztBQUFFSixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJUyxlQUFaO0FBQTZCTCxFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBdkM7QUFBMERDLEVBQUFBLEdBQUcsRUFBRTtBQUEvRCxDQUprQyxFQUtsQztBQUFFSixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJVSxVQUFaO0FBQXdCTixFQUFBQSxJQUFJLEVBQUVKLGdCQUFJVyxlQUFsQztBQUFtREwsRUFBQUEsR0FBRyxFQUFFLENBQXhEO0FBQTJETSxFQUFBQSxTQUFTLEVBQUU7QUFBdEUsQ0FMa0MsQ0FBckIsQ0FBakI7QUFPQWIsVUFBVSxDQUFDRyxJQUFYLEdBQWtCLFlBQWxCO0FBRUEsSUFBSVcsV0FBVyxHQUFHLElBQUliLGdCQUFJQyxZQUFSLENBQXFCLENBQ25DO0FBQUVDLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlHLGFBQVo7QUFBMkJDLEVBQUFBLElBQUksRUFBRUosZ0JBQUlLLGlCQUFyQztBQUF3REMsRUFBQUEsR0FBRyxFQUFFO0FBQTdELENBRG1DLEVBRW5DO0FBQUVKLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlPLGNBQVo7QUFBNEJILEVBQUFBLElBQUksRUFBRUosZ0JBQUlLLGlCQUF0QztBQUF5REMsRUFBQUEsR0FBRyxFQUFFO0FBQTlELENBRm1DLEVBR25DO0FBQUVKLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlRLGVBQVo7QUFBNkJKLEVBQUFBLElBQUksRUFBRUosZ0JBQUlLLGlCQUF2QztBQUEwREMsRUFBQUEsR0FBRyxFQUFFO0FBQS9ELENBSG1DLEVBSW5DO0FBQUVKLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlTLGVBQVo7QUFBNkJMLEVBQUFBLElBQUksRUFBRUosZ0JBQUlLLGlCQUF2QztBQUEwREMsRUFBQUEsR0FBRyxFQUFFO0FBQS9ELENBSm1DLEVBS25DO0FBQUVKLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlVLFVBQVo7QUFBd0JOLEVBQUFBLElBQUksRUFBRUosZ0JBQUlXLGVBQWxDO0FBQW1ETCxFQUFBQSxHQUFHLEVBQUUsQ0FBeEQ7QUFBMkRNLEVBQUFBLFNBQVMsRUFBRTtBQUF0RSxDQUxtQyxFQU1uQztBQUFFVixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJYyxXQUFaO0FBQXlCVixFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBbkM7QUFBc0RDLEVBQUFBLEdBQUcsRUFBRTtBQUEzRCxDQU5tQyxDQUFyQixDQUFsQjtBQVFBTyxXQUFXLENBQUNYLElBQVosR0FBbUIsYUFBbkI7QUFFQSxJQUFJYSxRQUFRLEdBQUcsSUFBSWYsZ0JBQUlDLFlBQVIsQ0FBcUIsQ0FDaEM7QUFBRUMsRUFBQUEsSUFBSSxFQUFFRixnQkFBSUcsYUFBWjtBQUEyQkMsRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQXJDO0FBQXdEQyxFQUFBQSxHQUFHLEVBQUU7QUFBN0QsQ0FEZ0MsRUFFaEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSU8sY0FBWjtBQUE0QkgsRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQXRDO0FBQXlEQyxFQUFBQSxHQUFHLEVBQUU7QUFBOUQsQ0FGZ0MsRUFHaEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSVEsZUFBWjtBQUE2QkosRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQXZDO0FBQTBEQyxFQUFBQSxHQUFHLEVBQUU7QUFBL0QsQ0FIZ0MsRUFJaEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSVMsZUFBWjtBQUE2QkwsRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQXZDO0FBQTBEQyxFQUFBQSxHQUFHLEVBQUU7QUFBL0QsQ0FKZ0MsRUFLaEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSVUsVUFBWjtBQUF3Qk4sRUFBQUEsSUFBSSxFQUFFSixnQkFBSVcsZUFBbEM7QUFBbURMLEVBQUFBLEdBQUcsRUFBRSxDQUF4RDtBQUEyRE0sRUFBQUEsU0FBUyxFQUFFO0FBQXRFLENBTGdDLEVBTWhDO0FBQUVWLEVBQUFBLElBQUksRUFBRUYsZ0JBQUlnQixlQUFaO0FBQTZCWixFQUFBQSxJQUFJLEVBQUVKLGdCQUFJSyxpQkFBdkM7QUFBMERDLEVBQUFBLEdBQUcsRUFBRTtBQUEvRCxDQU5nQyxFQU9oQztBQUFFSixFQUFBQSxJQUFJLEVBQUVGLGdCQUFJaUIsV0FBWjtBQUF5QmIsRUFBQUEsSUFBSSxFQUFFSixnQkFBSUssaUJBQW5DO0FBQXNEQyxFQUFBQSxHQUFHLEVBQUU7QUFBM0QsQ0FQZ0MsRUFRaEM7QUFBRUosRUFBQUEsSUFBSSxFQUFFRixnQkFBSWMsV0FBWjtBQUF5QlYsRUFBQUEsSUFBSSxFQUFFSixnQkFBSVcsZUFBbkM7QUFBb0RMLEVBQUFBLEdBQUcsRUFBRSxDQUF6RDtBQUE0RE0sRUFBQUEsU0FBUyxFQUFFO0FBQXZFLENBUmdDLENBQXJCLENBQWY7QUFVQUcsUUFBUSxDQUFDYixJQUFULEdBQWdCLFVBQWhCO0lBR3FCZ0Isb0NBRHBCcEMsT0FBTyxDQUFDLDhCQUFEOzs7QUFnQkosdUNBQWU7QUFBQTs7QUFDWDtBQURXLFVBZGZxQyxRQWNlLEdBZEosSUFjSTtBQUFBLFVBYmZDLGFBYWUsR0FiQyxJQWFEO0FBQUEsVUFaZkMsTUFZZSxHQVpOLElBWU07QUFBQSxVQVhmQyxxQkFXZSxHQVhTLElBV1Q7QUFBQSxVQVZmQyxLQVVlLEdBVlAsRUFVTztBQUFBLFVBVGZDLFdBU2UsR0FURCxFQVNDO0FBQUEsVUFSZkMsZUFRZSxHQVJHLElBUUg7QUFBQSxVQVBmQyxVQU9lLEdBUEYsSUFPRTtBQUFBLFVBTmZDLFdBTWUsR0FORCxJQU1DO0FBQUEsVUFMZkMsYUFLZSxHQUxDLEtBS0Q7QUFBQSxVQUpmQyxnQkFJZSxHQUpJLElBSUo7QUFBQSxVQUhmQyxpQkFHZSxHQUhLLElBR0w7QUFBQSxVQUZmQyxXQUVlLEdBRkQsSUFFQztBQUVYLFVBQUtWLE1BQUwsR0FBYyxJQUFkO0FBRUEsVUFBS0MscUJBQUwsR0FBNkJVLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBN0I7QUFDQSxVQUFLRixXQUFMLEdBQW1CQyxFQUFFLENBQUNDLEVBQUgsRUFBbkI7QUFDQSxVQUFLVixLQUFMLEdBQWEsSUFBSVcsS0FBSixDQUFVLENBQVYsQ0FBYjtBQUVBLFVBQUtkLGFBQUwsR0FBcUI7QUFDakIzQixNQUFBQSxrQkFBa0IsRUFBRSxJQURILENBRWpCOztBQUZpQixLQUFyQjtBQVJXO0FBWWQ7Ozs7U0FFRDBDLFNBQUEsZ0JBQVFDLEVBQVIsRUFBWTtBQUFBOztBQUNSLFNBQUtYLGVBQUwsR0FBdUJXLEVBQXZCO0FBQ0EsU0FBS1YsVUFBTCxHQUFrQixJQUFJVyx1QkFBSixDQUFnQixZQUFNO0FBQ3BDLGFBQU8sSUFBSUMsb0JBQUosQ0FBYSxNQUFiLENBQVA7QUFDSCxLQUZpQixFQUVmLEVBRmUsQ0FBbEI7O0FBR0EsU0FBS0MsZ0JBQUw7O0FBQ0EsU0FBS0MsUUFBTDs7QUFDQSxTQUFLQyxZQUFMOztBQUNBLFNBQUtDLHFCQUFMOztBQUNBLFNBQUtDLG9CQUFMO0FBQ0g7O1NBRURILFdBQUEsb0JBQVk7QUFDUixRQUFJLENBQUMsS0FBS2YsZUFBVixFQUEyQjtBQUN2QjtBQUNIOztBQUVELFFBQUksS0FBS0osTUFBTCxJQUFlLElBQW5CLEVBQXlCO0FBQ3JCLFdBQUtBLE1BQUwsR0FBYyxJQUFJdUIsOEJBQUosRUFBZDtBQUNIOztBQUVELFFBQUksQ0FBQyxLQUFLdkIsTUFBTCxDQUFZd0IsTUFBakIsRUFBeUI7QUFDckIsV0FBS3hCLE1BQUwsQ0FBWXlCLFdBQVosQ0FBd0IsS0FBS3JCLGVBQUwsQ0FBcUJzQixRQUE3QztBQUNIOztBQUVELFNBQUsxQixNQUFMLENBQVkyQixPQUFaLEdBQXNCLEtBQUt2QixlQUFMLENBQXFCd0Isa0JBQTNDO0FBQ0g7O1NBRURDLFlBQUEscUJBQWE7QUFDVCxRQUFJLEtBQUs3QixNQUFULEVBQWlCO0FBQ2IsV0FBS0EsTUFBTCxDQUFZMkIsT0FBWixHQUFzQixLQUFLdkIsZUFBTCxDQUFxQndCLGtCQUEzQztBQUNIO0FBQ0o7O1NBRURFLFlBQUEscUJBQWE7QUFDVCxTQUFLOUIsTUFBTCxHQUFjLElBQWQ7QUFDSDs7U0FFRCtCLFFBQUEsaUJBQVM7QUFDTCxTQUFLMUIsVUFBTCxDQUFnQjJCLEtBQWhCOztBQUNBLFNBQUtDLG9CQUFMO0FBQ0g7O1NBRURDLG1CQUFBLDRCQUFvQjtBQUNoQixRQUFJLEtBQUs3QixVQUFMLENBQWdCOEIsTUFBaEIsSUFBMEIsS0FBSy9CLGVBQUwsQ0FBcUJzQixRQUFuRCxFQUE2RDtBQUN6RCxhQUFPLElBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQUtyQixVQUFMLENBQWdCK0IsR0FBaEIsRUFBUDtBQUNIOztTQUVEQyxrQkFBQSx5QkFBaUJDLENBQWpCLEVBQW9CLENBRW5COztTQUVEQyxtQkFBQSwwQkFBa0JDLEVBQWxCLEVBQXNCO0FBQ2xCLFNBQUtwQyxlQUFMLENBQXFCcUMsSUFBckIsQ0FBMEJDLGNBQTFCLENBQXlDekUsZUFBekM7O0FBRUEsWUFBUSxLQUFLbUMsZUFBTCxDQUFxQnVDLFVBQTdCO0FBQ0ksV0FBS0MsWUFBTUMsS0FBWDtBQUNJLGFBQUt6QyxlQUFMLENBQXFCcUMsSUFBckIsQ0FBMEJLLFFBQTFCLENBQW1DLEtBQUtwQyxXQUF4Qzs7QUFDQTs7QUFDSixXQUFLa0MsWUFBTUcsS0FBWDtBQUNJLGFBQUszQyxlQUFMLENBQXFCcUMsSUFBckIsQ0FBMEJPLGFBQTFCLENBQXdDLEtBQUt0QyxXQUE3Qzs7QUFDQTtBQU5SOztBQVNBLFFBQUl1QyxRQUFRLEdBQUcsS0FBSzdDLGVBQUwsQ0FBcUI4QyxTQUFyQixDQUErQixDQUEvQixDQUFmO0FBQ0EsUUFBSUMsR0FBRyxHQUFHRixRQUFRLEdBQUcsS0FBSzdDLGVBQUwsQ0FBcUJnRCxnQkFBeEIsR0FBMkMsS0FBSzlDLFdBQWxFO0FBQ0E2QyxJQUFBQSxHQUFHLENBQUNFLFdBQUosQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBSzNDLFdBQTlCOztBQUVBLFFBQUksS0FBS04sZUFBTCxDQUFxQmtELHNCQUFyQixDQUE0Q0MsTUFBaEQsRUFBd0Q7QUFDcEQsV0FBS25ELGVBQUwsQ0FBcUJrRCxzQkFBckIsQ0FBNENFLE1BQTVDLENBQW1ELEtBQUtwRCxlQUFMLENBQXFCcUQsZ0JBQXhFLEVBQTBGeEYsZUFBMUY7QUFDSDs7QUFDRCxRQUFJLEtBQUttQyxlQUFMLENBQXFCc0QsbUJBQXJCLENBQXlDSCxNQUE3QyxFQUFxRDtBQUNqRCxXQUFLbkQsZUFBTCxDQUFxQnNELG1CQUFyQixDQUF5Q0YsTUFBekMsQ0FBZ0QsS0FBS3BELGVBQUwsQ0FBcUJxRCxnQkFBckUsRUFBdUZ4RixlQUF2RjtBQUNIOztBQUNELFFBQUksS0FBS21DLGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ0osTUFBckMsRUFBNkM7QUFDekMsV0FBS25ELGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ0gsTUFBakM7QUFDSDs7QUFDRCxTQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3ZELFVBQUwsQ0FBZ0I4QixNQUFwQyxFQUE0QyxFQUFFeUIsQ0FBOUMsRUFBaUQ7QUFDN0MsVUFBTXRCLENBQUMsR0FBRyxLQUFLakMsVUFBTCxDQUFnQndELElBQWhCLENBQXFCRCxDQUFyQixDQUFWO0FBQ0F0QixNQUFBQSxDQUFDLENBQUN3QixpQkFBRixJQUF1QnRCLEVBQXZCOztBQUNBNUUsdUJBQUttRyxHQUFMLENBQVN6QixDQUFDLENBQUMwQixnQkFBWCxFQUE2QixDQUE3QixFQUFnQyxDQUFoQyxFQUFtQyxDQUFuQzs7QUFFQSxVQUFJMUIsQ0FBQyxDQUFDd0IsaUJBQUYsR0FBc0IsR0FBMUIsRUFBK0I7QUFDM0IsWUFBSSxLQUFLMUQsZUFBTCxDQUFxQnVELFdBQXJCLENBQWlDSixNQUFyQyxFQUE2QztBQUN6QyxlQUFLbkQsZUFBTCxDQUFxQnVELFdBQXJCLENBQWlDTSxjQUFqQyxDQUFnRDNCLENBQWhEO0FBQ0g7O0FBQ0QsYUFBS2pDLFVBQUwsQ0FBZ0I2RCxNQUFoQixDQUF1Qk4sQ0FBdkI7O0FBQ0EsVUFBRUEsQ0FBRjtBQUNBO0FBQ0g7O0FBRUR0QixNQUFBQSxDQUFDLENBQUM2QixRQUFGLENBQVdDLENBQVgsSUFBZ0IsS0FBS2hFLGVBQUwsQ0FBcUJpRSxlQUFyQixDQUFxQ0MsUUFBckMsQ0FBOEMsSUFBSWhDLENBQUMsQ0FBQ3dCLGlCQUFGLEdBQXNCeEIsQ0FBQyxDQUFDaUMsYUFBMUUsRUFBeUZqQyxDQUFDLENBQUNrQyxVQUEzRixJQUF5RyxHQUF6RyxHQUErR2hDLEVBQS9ILENBZDZDLENBY3NGOztBQUNuSSxVQUFJLEtBQUtwQyxlQUFMLENBQXFCcUUsa0JBQXJCLENBQXdDbEIsTUFBNUMsRUFBb0Q7QUFDaEQsYUFBS25ELGVBQUwsQ0FBcUJxRSxrQkFBckIsQ0FBd0NDLE9BQXhDLENBQWdEcEMsQ0FBaEQ7QUFDSDs7QUFDRCxVQUFJLEtBQUtsQyxlQUFMLENBQXFCdUUsdUJBQXJCLENBQTZDcEIsTUFBakQsRUFBeUQ7QUFDckQsYUFBS25ELGVBQUwsQ0FBcUJ1RSx1QkFBckIsQ0FBNkNELE9BQTdDLENBQXFEcEMsQ0FBckQ7QUFDSDs7QUFDRCxVQUFJLEtBQUtsQyxlQUFMLENBQXFCc0QsbUJBQXJCLENBQXlDSCxNQUE3QyxFQUFxRDtBQUNqRCxhQUFLbkQsZUFBTCxDQUFxQnNELG1CQUFyQixDQUF5Q2dCLE9BQXpDLENBQWlEcEMsQ0FBakQsRUFBb0RFLEVBQXBEO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLcEMsZUFBTCxDQUFxQmtELHNCQUFyQixDQUE0Q0MsTUFBaEQsRUFBd0Q7QUFDcEQsYUFBS25ELGVBQUwsQ0FBcUJrRCxzQkFBckIsQ0FBNENvQixPQUE1QyxDQUFvRHBDLENBQXBEO0FBQ0gsT0FGRCxNQUVPO0FBQ0gxRSx5QkFBS2dILElBQUwsQ0FBVXRDLENBQUMsQ0FBQ3VDLGdCQUFaLEVBQThCdkMsQ0FBQyxDQUFDNkIsUUFBaEM7QUFDSDs7QUFFRCxVQUFJLEtBQUsvRCxlQUFMLENBQXFCMEUsMkJBQXJCLENBQWlEdkIsTUFBckQsRUFBNkQ7QUFDekQsYUFBS25ELGVBQUwsQ0FBcUIwRSwyQkFBckIsQ0FBaURKLE9BQWpELENBQXlEcEMsQ0FBekQ7QUFDSDs7QUFDRCxVQUFJLEtBQUtsQyxlQUFMLENBQXFCMkUsc0JBQXJCLENBQTRDeEIsTUFBaEQsRUFBd0Q7QUFDcEQsYUFBS25ELGVBQUwsQ0FBcUIyRSxzQkFBckIsQ0FBNENMLE9BQTVDLENBQW9EcEMsQ0FBcEQsRUFBdURFLEVBQXZEO0FBQ0g7O0FBQ0QsVUFBSSxLQUFLcEMsZUFBTCxDQUFxQjRFLHNCQUFyQixDQUE0Q3pCLE1BQWhELEVBQXdEO0FBQ3BELGFBQUtuRCxlQUFMLENBQXFCNEUsc0JBQXJCLENBQTRDTixPQUE1QyxDQUFvRHBDLENBQXBEO0FBQ0g7O0FBQ0QxRSx1QkFBS3FILFdBQUwsQ0FBaUIzQyxDQUFDLENBQUM0QyxRQUFuQixFQUE2QjVDLENBQUMsQ0FBQzRDLFFBQS9CLEVBQXlDNUMsQ0FBQyxDQUFDdUMsZ0JBQTNDLEVBQTZEckMsRUFBN0QsRUF2QzZDLENBdUNxQjs7O0FBQ2xFLFVBQUksS0FBS3BDLGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ0osTUFBckMsRUFBNkM7QUFDekMsYUFBS25ELGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ2UsT0FBakMsQ0FBeUNwQyxDQUF6QyxFQUE0Q0UsRUFBNUM7QUFDSDtBQUNKOztBQUNELFdBQU8sS0FBS25DLFVBQUwsQ0FBZ0I4QixNQUF2QjtBQUNILElBRUQ7OztTQUNBRix1QkFBQSxnQ0FBd0I7QUFDcEI7QUFDQSxRQUFJa0QsR0FBRyxHQUFHLENBQVY7QUFDQSxRQUFNQyxTQUFTLEdBQUcsS0FBS2hGLGVBQUwsQ0FBcUJpRixVQUFyQixLQUFvQ0MsaUJBQVdDLGtCQUFqRTs7QUFDQSxTQUFLLElBQUkzQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt2RCxVQUFMLENBQWdCOEIsTUFBcEMsRUFBNEMsRUFBRXlCLENBQTlDLEVBQWlEO0FBQzdDLFVBQU10QixDQUFDLEdBQUcsS0FBS2pDLFVBQUwsQ0FBZ0J3RCxJQUFoQixDQUFxQkQsQ0FBckIsQ0FBVjtBQUNBLFVBQUk0QixFQUFFLEdBQUcsQ0FBVDs7QUFDQSxVQUFJLEtBQUtwRixlQUFMLENBQXFCNEUsc0JBQXJCLENBQTRDekIsTUFBaEQsRUFBd0Q7QUFDcERpQyxRQUFBQSxFQUFFLEdBQUdsRCxDQUFDLENBQUNtRCxVQUFQO0FBQ0g7O0FBQ0ROLE1BQUFBLEdBQUcsR0FBR3ZCLENBQUMsR0FBRyxDQUFWO0FBQ0EsVUFBSThCLE9BQU8sR0FBRyxDQUFkOztBQUNBLFVBQUksS0FBS3RGLGVBQUwsQ0FBcUJpRixVQUFyQixLQUFvQ0MsaUJBQVdLLElBQW5ELEVBQXlEO0FBQ3JELGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QixFQUFFQSxDQUF6QixFQUE0QjtBQUFFO0FBQzFCRixVQUFBQSxPQUFPLEdBQUcsQ0FBVjtBQUNBLGVBQUt4RixLQUFMLENBQVd3RixPQUFPLEVBQWxCLElBQXdCcEQsQ0FBQyxDQUFDNEMsUUFBMUI7QUFDQXZILFVBQUFBLGFBQWEsQ0FBQ2tJLENBQWQsR0FBa0IxSCxJQUFJLENBQUMsSUFBSXlILENBQUwsQ0FBdEI7QUFDQWpJLFVBQUFBLGFBQWEsQ0FBQ3lHLENBQWQsR0FBa0JqRyxJQUFJLENBQUMsSUFBSXlILENBQUosR0FBUSxDQUFULENBQXRCO0FBQ0FqSSxVQUFBQSxhQUFhLENBQUNtSSxDQUFkLEdBQWtCTixFQUFsQjtBQUNBLGVBQUt0RixLQUFMLENBQVd3RixPQUFPLEVBQWxCLElBQXdCL0gsYUFBeEI7QUFDQSxlQUFLdUMsS0FBTCxDQUFXd0YsT0FBTyxFQUFsQixJQUF3QnBELENBQUMsQ0FBQ3lELElBQTFCO0FBQ0EsZUFBSzdGLEtBQUwsQ0FBV3dGLE9BQU8sRUFBbEIsSUFBd0JwRCxDQUFDLENBQUMwRCxRQUExQjtBQUNBLGVBQUs5RixLQUFMLENBQVd3RixPQUFPLEVBQWxCLElBQXdCcEQsQ0FBQyxDQUFDMkQsS0FBRixDQUFRQyxJQUFoQzs7QUFFQSxjQUFJZCxTQUFKLEVBQWU7QUFDWCxpQkFBS2xGLEtBQUwsQ0FBV3dGLE9BQU8sRUFBbEIsSUFBd0JwRCxDQUFDLENBQUN1QyxnQkFBMUI7QUFDSCxXQUZELE1BRU87QUFDSCxpQkFBSzNFLEtBQUwsQ0FBV3dGLE9BQU8sRUFBbEIsSUFBd0IsSUFBeEI7QUFDSDs7QUFFRCxlQUFLMUYsTUFBTCxDQUFZbUcscUJBQVosQ0FBa0NoQixHQUFHLEVBQXJDLEVBQXlDLEtBQUtqRixLQUE5QztBQUNIO0FBQ0osT0FwQkQsTUFvQk87QUFDSHdGLFFBQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0EsYUFBS3hGLEtBQUwsQ0FBV3dGLE9BQU8sRUFBbEIsSUFBd0JwRCxDQUFDLENBQUM0QyxRQUExQjtBQUNBdkgsUUFBQUEsYUFBYSxDQUFDbUksQ0FBZCxHQUFrQk4sRUFBbEI7QUFDQSxhQUFLdEYsS0FBTCxDQUFXd0YsT0FBTyxFQUFsQixJQUF3Qi9ILGFBQXhCO0FBQ0EsYUFBS3VDLEtBQUwsQ0FBV3dGLE9BQU8sRUFBbEIsSUFBd0JwRCxDQUFDLENBQUN5RCxJQUExQjtBQUNBLGFBQUs3RixLQUFMLENBQVd3RixPQUFPLEVBQWxCLElBQXdCcEQsQ0FBQyxDQUFDMEQsUUFBMUI7QUFDQSxhQUFLOUYsS0FBTCxDQUFXd0YsT0FBTyxFQUFsQixJQUF3QnBELENBQUMsQ0FBQzJELEtBQUYsQ0FBUUMsSUFBaEM7O0FBQ0EsYUFBS2xHLE1BQUwsQ0FBWW1HLHFCQUFaLENBQWtDdkMsQ0FBbEMsRUFBcUMsS0FBSzFELEtBQTFDO0FBQ0g7QUFDSjs7QUFFRCxTQUFLa0csUUFBTCxDQUFjLENBQWQsRUFBaUIsS0FBSy9GLFVBQUwsQ0FBZ0I4QixNQUFoQixHQUF5QixLQUFLbkMsTUFBTCxDQUFZcUcsV0FBdEQsRUFBbUUsSUFBbkU7QUFDSDs7U0FFREMsc0JBQUEsK0JBQXVCLENBRXRCOztTQUVERixXQUFBLGtCQUFVRyxLQUFWLEVBQWlCQyxLQUFqQixFQUF3QkMsTUFBeEIsRUFBZ0NDLE1BQWhDLEVBQXdDO0FBQ3BDLFFBQUksQ0FBQyxLQUFLMUcsTUFBVixFQUFrQjs7QUFFbEIsU0FBS0EsTUFBTCxDQUFZb0csUUFBWixDQUFxQkcsS0FBckIsRUFBNEJDLEtBQTVCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsTUFBM0M7QUFDSDs7U0FFREMsbUJBQUEsNEJBQW9CO0FBQ2hCLFdBQU8sS0FBS3RHLFVBQUwsQ0FBZ0J3RCxJQUFoQixDQUFxQjFCLE1BQTVCO0FBQ0g7O1NBRUR5RSxzQkFBQSw2QkFBcUJMLEtBQXJCLEVBQTRCdEQsUUFBNUIsRUFBc0M7QUFDbEMsUUFBSXNELEtBQUssS0FBSyxDQUFkLEVBQWlCO0FBQ2IsV0FBS25GLFlBQUw7O0FBQ0EsV0FBS0MscUJBQUw7QUFDSCxLQUhELE1BR087QUFDSCxXQUFLQyxvQkFBTDtBQUNIO0FBQ0o7O1NBRUR1RixnQkFBQSx1QkFBZU4sS0FBZixFQUFzQnRELFFBQXRCLEVBQWdDO0FBQzVCLFFBQUksS0FBS2pELE1BQUwsSUFBZXVHLEtBQUssS0FBSyxDQUE3QixFQUFnQztBQUM1QixXQUFLdkcsTUFBTCxDQUFZOEcsZ0JBQVosQ0FBNkI3RCxRQUE3QjtBQUNIOztBQUNELFFBQUksS0FBSzdDLGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ29ELFdBQWpDLElBQWdEUixLQUFLLEtBQUssQ0FBOUQsRUFBaUU7QUFDN0QsV0FBS25HLGVBQUwsQ0FBcUJ1RCxXQUFyQixDQUFpQ29ELFdBQWpDLENBQTZDRCxnQkFBN0MsQ0FBOEQ3RCxRQUE5RDtBQUNIO0FBQ0o7O1NBRUQrRCxrQkFBQSwyQkFBbUI7QUFDZixRQUFJLEtBQUs1RyxlQUFMLENBQXFCNkcsSUFBckIsSUFBNkIsQ0FBQyxLQUFLN0csZUFBTCxDQUFxQjZHLElBQXJCLENBQTBCQyxNQUE1RCxFQUFvRTtBQUNoRXZHLE1BQUFBLEVBQUUsQ0FBQ3dHLFlBQUgsQ0FBZ0JDLGNBQWhCLENBQStCLEtBQUtoSCxlQUFMLENBQXFCNkcsSUFBcEQ7QUFDSDtBQUNKOztTQUVEeEYsY0FBQSxxQkFBYUMsUUFBYixFQUF1QjtBQUNuQixRQUFJLENBQUMsS0FBSzFCLE1BQVYsRUFBa0I7O0FBRWxCLFNBQUtBLE1BQUwsQ0FBWXlCLFdBQVosQ0FBd0JDLFFBQXhCO0FBQ0g7O1NBRURSLG1CQUFBLDRCQUFvQjtBQUNoQixZQUFRLEtBQUtkLGVBQUwsQ0FBcUJpRixVQUE3QjtBQUNJLFdBQUtDLGlCQUFXQyxrQkFBaEI7QUFDSSxhQUFLcEYsV0FBTCxHQUFtQlgsV0FBbkI7QUFDQTs7QUFDSixXQUFLOEYsaUJBQVdLLElBQWhCO0FBQ0ksYUFBS3hGLFdBQUwsR0FBbUJULFFBQW5CO0FBQ0E7O0FBQ0o7QUFDSSxhQUFLUyxXQUFMLEdBQW1CekIsVUFBbkI7QUFSUjtBQVVIOztTQUVEMkMsd0JBQUEsaUNBQXlCO0FBQ3JCLFFBQUksQ0FBQyxLQUFLakIsZUFBVixFQUEyQjtBQUN2QjtBQUNIOztBQUNELFFBQUkrQyxHQUFHLEdBQUcsS0FBSy9DLGVBQUwsQ0FBcUI4QyxTQUFyQixDQUErQixDQUEvQixDQUFWOztBQUNBLFFBQUlDLEdBQUcsSUFBSSxJQUFQLElBQWUsS0FBSzdDLFdBQUwsSUFBb0IsSUFBdkMsRUFBNkM7QUFDekM2QyxNQUFBQSxHQUFHLEdBQUcsS0FBSzdDLFdBQUwsR0FBbUIrRyw0QkFBZ0JDLGlCQUFoQixDQUFrQyxhQUFsQyxFQUFpRCxJQUFqRCxDQUF6QjtBQUNILEtBRkQsTUFFTztBQUNIbkUsTUFBQUEsR0FBRyxHQUFHa0UsNEJBQWdCRSxNQUFoQixDQUF1QnBFLEdBQXZCLEVBQTRCLEtBQUsvQyxlQUFqQyxDQUFOO0FBQ0g7O0FBRUQrQyxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxLQUFLN0MsV0FBbEI7O0FBRUEsUUFBSSxLQUFLRixlQUFMLENBQXFCcUQsZ0JBQXJCLEtBQTBDYixZQUFNRyxLQUFwRCxFQUEyRDtBQUN2REksTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXcEosa0JBQVgsRUFBK0IsSUFBL0I7QUFDSCxLQUZELE1BRU87QUFDSCtFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV3BKLGtCQUFYLEVBQStCLEtBQS9CO0FBQ0g7O0FBRUQsUUFBSSxLQUFLZ0MsZUFBTCxDQUFxQmlGLFVBQXJCLEtBQW9DQyxpQkFBV21DLFNBQW5ELEVBQThEO0FBQzFEdEUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXbkosZ0JBQVgsRUFBNkIsSUFBN0I7QUFDQThFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV2xKLDBCQUFYLEVBQXVDLEtBQXZDO0FBQ0E2RSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVdqSiwyQkFBWCxFQUF3QyxLQUF4QztBQUNBNEUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXaEoseUJBQVgsRUFBc0MsS0FBdEM7QUFDQTJFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBVy9JLFdBQVgsRUFBd0IsS0FBeEI7QUFDSCxLQU5ELE1BTU8sSUFBSSxLQUFLMkIsZUFBTCxDQUFxQmlGLFVBQXJCLEtBQW9DQyxpQkFBV0Msa0JBQW5ELEVBQXVFO0FBQzFFcEMsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXbkosZ0JBQVgsRUFBNkIsS0FBN0I7QUFDQThFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV2xKLDBCQUFYLEVBQXVDLElBQXZDO0FBQ0E2RSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVdqSiwyQkFBWCxFQUF3QyxLQUF4QztBQUNBNEUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXaEoseUJBQVgsRUFBc0MsS0FBdEM7QUFDQTJFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBVy9JLFdBQVgsRUFBd0IsS0FBeEI7QUFDQSxXQUFLd0IscUJBQUwsQ0FBMkI2RixDQUEzQixHQUErQixLQUFLMUYsZUFBTCxDQUFxQnNILGFBQXBEO0FBQ0EsV0FBS3pILHFCQUFMLENBQTJCMEgsQ0FBM0IsR0FBK0IsS0FBS3ZILGVBQUwsQ0FBcUJ3SCxXQUFwRDtBQUNILEtBUk0sTUFRQSxJQUFJLEtBQUt4SCxlQUFMLENBQXFCaUYsVUFBckIsS0FBb0NDLGlCQUFXdUMsbUJBQW5ELEVBQXdFO0FBQzNFMUUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXbkosZ0JBQVgsRUFBNkIsS0FBN0I7QUFDQThFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV2xKLDBCQUFYLEVBQXVDLEtBQXZDO0FBQ0E2RSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVdqSiwyQkFBWCxFQUF3QyxJQUF4QztBQUNBNEUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXaEoseUJBQVgsRUFBc0MsS0FBdEM7QUFDQTJFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBVy9JLFdBQVgsRUFBd0IsS0FBeEI7QUFDSCxLQU5NLE1BTUEsSUFBSSxLQUFLMkIsZUFBTCxDQUFxQmlGLFVBQXJCLEtBQW9DQyxpQkFBV3dDLGlCQUFuRCxFQUFzRTtBQUN6RTNFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV25KLGdCQUFYLEVBQTZCLEtBQTdCO0FBQ0E4RSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVdsSiwwQkFBWCxFQUF1QyxLQUF2QztBQUNBNkUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXakosMkJBQVgsRUFBd0MsS0FBeEM7QUFDQTRFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV2hKLHlCQUFYLEVBQXNDLElBQXRDO0FBQ0EyRSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVcvSSxXQUFYLEVBQXdCLEtBQXhCO0FBQ0gsS0FOTSxNQU1BLElBQUksS0FBSzJCLGVBQUwsQ0FBcUJpRixVQUFyQixLQUFvQ0MsaUJBQVdLLElBQW5ELEVBQXlEO0FBQzVEeEMsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXbkosZ0JBQVgsRUFBNkIsS0FBN0I7QUFDQThFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV2xKLDBCQUFYLEVBQXVDLEtBQXZDO0FBQ0E2RSxNQUFBQSxHQUFHLENBQUNxRSxNQUFKLENBQVdqSiwyQkFBWCxFQUF3QyxLQUF4QztBQUNBNEUsTUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXaEoseUJBQVgsRUFBc0MsS0FBdEM7QUFDQTJFLE1BQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBVy9JLFdBQVgsRUFBd0IsSUFBeEI7QUFDSCxLQU5NLE1BTUE7QUFDSHNKLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixpQ0FBMkMsS0FBSzVILGVBQUwsQ0FBcUJpRixVQUFoRTtBQUNIOztBQUVELFFBQUksS0FBS2pGLGVBQUwsQ0FBcUI0RSxzQkFBckIsQ0FBNEN6QixNQUFoRCxFQUF3RDtBQUNwRHpGLHVCQUFLaUcsR0FBTCxDQUFTLEtBQUs5RCxxQkFBZCxFQUFxQyxLQUFLRyxlQUFMLENBQXFCNEUsc0JBQXJCLENBQTRDaUQsU0FBakYsRUFBNEYsS0FBSzdILGVBQUwsQ0FBcUI0RSxzQkFBckIsQ0FBNENrRCxTQUF4STtBQUNIOztBQUVEL0UsSUFBQUEsR0FBRyxDQUFDRSxXQUFKLENBQWdCLHVCQUFoQixFQUF5QyxLQUFLcEQscUJBQTlDOztBQUVBLFNBQUtHLGVBQUwsQ0FBcUIrSCxXQUFyQixDQUFpQyxDQUFqQyxFQUFvQ2hGLEdBQXBDO0FBQ0g7O1NBRUQ3Qix1QkFBQSxnQ0FBd0I7QUFDcEI7QUFDQSxRQUFJNkIsR0FBRyxHQUFHLEtBQUsvQyxlQUFMLENBQXFCZ0ksYUFBL0I7O0FBQ0EsUUFBSSxLQUFLaEksZUFBTCxDQUFxQnVELFdBQXJCLENBQWlDSixNQUFyQyxFQUE2QztBQUN6QyxVQUFJSixHQUFHLEtBQUssSUFBUixJQUFnQixLQUFLM0MsZ0JBQUwsS0FBMEIsSUFBOUMsRUFBb0Q7QUFDaEQsYUFBS0EsZ0JBQUwsR0FBd0I2Ryw0QkFBZ0JDLGlCQUFoQixDQUFrQyxVQUFsQyxFQUE4QyxJQUE5QyxDQUF4QjtBQUNIOztBQUVELFVBQUluRSxHQUFHLEtBQUssSUFBWixFQUFrQjtBQUNkQSxRQUFBQSxHQUFHLEdBQUcsS0FBSzNDLGdCQUFYO0FBQ0EsYUFBS0osZUFBTCxDQUFxQmdJLGFBQXJCLEdBQXFDakYsR0FBckM7QUFDSDs7QUFFRCxVQUFJLEtBQUsvQyxlQUFMLENBQXFCcUQsZ0JBQXJCLEtBQTBDYixZQUFNRyxLQUFoRCxJQUF5RCxLQUFLM0MsZUFBTCxDQUFxQnVELFdBQXJCLENBQWlDMEUsS0FBakMsS0FBMkN6RixZQUFNRyxLQUE5RyxFQUFxSDtBQUNqSEksUUFBQUEsR0FBRyxDQUFDcUUsTUFBSixDQUFXcEosa0JBQVgsRUFBK0IsSUFBL0I7QUFDSCxPQUZELE1BRU87QUFDSCtFLFFBQUFBLEdBQUcsQ0FBQ3FFLE1BQUosQ0FBV3BKLGtCQUFYLEVBQStCLEtBQS9CO0FBQ0gsT0Fkd0MsQ0FnQnpDOzs7QUFDQSxXQUFLZ0MsZUFBTCxDQUFxQnVELFdBQXJCLENBQWlDMkUsZUFBakM7QUFDSDtBQUNKOztTQUVEQyxxQkFBQSw0QkFBb0JoRixNQUFwQixFQUE0QjtBQUN4QixRQUFJLENBQUMsS0FBS3ZELE1BQVYsRUFBa0I7QUFDZDtBQUNIOztBQUVELFFBQUl3SSxPQUFPLEdBQUcsS0FBS3hJLE1BQUwsQ0FBWXlJLFNBQVosQ0FBc0IsQ0FBdEIsQ0FBZDs7QUFDQSxRQUFJRCxPQUFKLEVBQWE7QUFDVEEsTUFBQUEsT0FBTyxDQUFDakYsTUFBUixHQUFpQkEsTUFBakI7QUFDSDtBQUNKOztTQUVEbkMsZUFBQSx3QkFBZ0I7QUFDWixRQUFJLENBQUMsS0FBS3BCLE1BQVYsRUFBa0I7QUFDZDtBQUNIOztBQUNELFNBQUtBLE1BQUwsQ0FBWTBJLG1CQUFaLENBQWdDLEtBQUt0SSxlQUFMLENBQXFCaUYsVUFBckIsS0FBb0NDLGlCQUFXSyxJQUEvQyxHQUFzRCxLQUFLdkYsZUFBTCxDQUFxQjZHLElBQTNFLEdBQWtGLElBQWxILEVBQXdILEtBQUs5RyxXQUE3SDtBQUNIOztTQUVEdUksc0JBQUEsNkJBQXFCekIsSUFBckIsRUFBMkIwQixJQUEzQixFQUFpQztBQUM3QixRQUFJLENBQUMsS0FBSzNJLE1BQVYsRUFBa0I7QUFDZDtBQUNIOztBQUNELFNBQUtBLE1BQUwsQ0FBWTBJLG1CQUFaLENBQWdDekIsSUFBaEMsRUFBc0MwQixJQUF0QztBQUNIOztTQUVEQyxjQUFBLHFCQUFhQyxJQUFiLEVBQW1CQyxRQUFuQixFQUE2QjtBQUN6QixRQUFJLENBQUMsS0FBSzlJLE1BQVYsRUFBa0I7O0FBRWxCLFNBQUtBLE1BQUwsQ0FBWStJLFdBQVo7O0FBRUEsUUFBSUMsU0FBUyxHQUFHLEtBQUtoSixNQUFMLENBQVlpSixVQUE1QjtBQUNBLFFBQUlDLFFBQVEsR0FBRyxLQUFLbEosTUFBTCxDQUFZeUksU0FBM0I7QUFDQSxRQUFJdkYsU0FBUyxHQUFHMkYsSUFBSSxDQUFDM0YsU0FBckI7O0FBQ0E0RixJQUFBQSxRQUFRLENBQUNLLE1BQVQ7O0FBQ0EsU0FBSyxJQUFJdkYsQ0FBQyxHQUFHLENBQVIsRUFBV3dGLEdBQUcsR0FBR0osU0FBUyxDQUFDN0csTUFBaEMsRUFBd0N5QixDQUFDLEdBQUd3RixHQUE1QyxFQUFpRHhGLENBQUMsRUFBbEQsRUFBc0Q7QUFDbEQsVUFBSXlGLEVBQUUsR0FBR0wsU0FBUyxDQUFDcEYsQ0FBRCxDQUFsQjtBQUNBLFVBQUkwRixRQUFRLEdBQUdKLFFBQVEsQ0FBQ3RGLENBQUQsQ0FBdkI7QUFDQSxVQUFJWCxRQUFRLEdBQUdDLFNBQVMsQ0FBQ1UsQ0FBRCxDQUF4Qjs7QUFFQSxVQUFJMEYsUUFBUSxDQUFDL0YsTUFBYixFQUFxQjtBQUNqQnVGLFFBQUFBLFFBQVEsQ0FBQzdGLFFBQVQsR0FBb0JBLFFBQXBCO0FBQ0E2RixRQUFBQSxRQUFRLENBQUNTLFdBQVQsR0FBdUJWLElBQUksQ0FBQ3BHLElBQUwsQ0FBVStHLFlBQWpDO0FBQ0FWLFFBQUFBLFFBQVEsQ0FBQ3JHLElBQVQsR0FBZ0JvRyxJQUFJLENBQUNwRyxJQUFyQjs7QUFFQXFHLFFBQUFBLFFBQVEsQ0FBQ1csUUFBVCxDQUFrQkosRUFBbEI7QUFDSDtBQUNKO0FBQ0o7OztFQTNZa0RLOztBQThZdkRDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjL0oseUJBQWQsRUFBeUM7QUFBRWdLLEVBQUFBLEVBQUUsRUFBRTFMO0FBQU4sQ0FBekM7O0FBRUF1TCxzQkFBVUksUUFBVixDQUFtQkMsNEJBQW5CLEVBQXFDbEsseUJBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0NCwgVmVjMiwgVmVjMywgVmVjNCB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi8uLi8uLi9yZW5kZXJlci9nZngnO1xyXG5pbXBvcnQgUGFydGljbGVCYXRjaE1vZGVsIGZyb20gJy4vcGFydGljbGUtYmF0Y2gtbW9kZWwnO1xyXG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uLy4uLy4uL2Fzc2V0cy9tYXRlcmlhbC9tYXRlcmlhbC12YXJpYW50JztcclxuaW1wb3J0IFJlY3ljbGVQb29sIGZyb20gJy4uLy4uLy4uLy4uL3JlbmRlcmVyL21lbW9wL3JlY3ljbGUtcG9vbCc7XHJcbmltcG9ydCB7IFJlbmRlck1vZGUsIFNwYWNlIH0gZnJvbSAnLi4vZW51bSc7XHJcbmltcG9ydCBQYXJ0aWNsZSBmcm9tICcuLi9wYXJ0aWNsZSc7XHJcbmltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vcmVuZGVyZXIvYXNzZW1ibGVyJztcclxuaW1wb3J0IFBhcnRpY2xlU3lzdGVtM0QgZnJvbSAnLi4vcGFydGljbGUtc3lzdGVtLTNkJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IHJlcXVpcmUoJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InKTtcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcclxuY29uc3QgX3RlbXBBdHRyaWJVViA9IG5ldyBWZWMzKCk7XHJcbmNvbnN0IF90ZW1wQXR0cmliVVYwID0gbmV3IFZlYzIoKTtcclxuY29uc3QgX3RlbXBBdHRyaWJDb2xvciA9IG5ldyBWZWM0KCk7XHJcbmNvbnN0IF90ZW1wV29ybGRUcmFucyA9IG5ldyBNYXQ0KCk7XHJcblxyXG5jb25zdCBfdXZzID0gW1xyXG4gICAgMCwgMCwgLy8gYm90dG9tLWxlZnRcclxuICAgIDEsIDAsIC8vIGJvdHRvbS1yaWdodFxyXG4gICAgMCwgMSwgLy8gdG9wLWxlZnRcclxuICAgIDEsIDEsIC8vIHRvcC1yaWdodFxyXG5dO1xyXG5cclxuY29uc3QgQ0NfVVNFX1dPUkxEX1NQQUNFID0gJ0NDX1VTRV9XT1JMRF9TUEFDRSc7XHJcbmNvbnN0IENDX1VTRV9CSUxMQk9BUkQgPSAnQ0NfVVNFX0JJTExCT0FSRCc7XHJcbmNvbnN0IENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJEID0gJ0NDX1VTRV9TVFJFVENIRURfQklMTEJPQVJEJztcclxuY29uc3QgQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJEID0gJ0NDX1VTRV9IT1JJWk9OVEFMX0JJTExCT0FSRCc7XHJcbmNvbnN0IENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQgPSAnQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCc7XHJcbmNvbnN0IENDX1VTRV9NRVNIID0gJ0NDX1VTRV9NRVNIJztcclxuLy9jb25zdCBDQ19EUkFXX1dJUkVfRlJBTUUgPSAnQ0NfRFJBV19XSVJFX0ZSQU1FJzsgLy8gPHdpcmVmcmFtZSBkZWJ1Zz5cclxuXHJcblxyXG52YXIgdmZtdE5vcm1hbCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KFtcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JELCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM30sXHJcbiAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRDEsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcclxuXSk7XHJcbnZmbXROb3JtYWwubmFtZSA9ICd2Zm10Tm9ybWFsJztcclxuXHJcbnZhciB2Zm10U3RyZXRjaCA9IG5ldyBnZnguVmVydGV4Rm9ybWF0KFtcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JELCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM30sXHJcbiAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRDEsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9DT0xPUiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IxLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM31cclxuXSk7XHJcbnZmbXRTdHJldGNoLm5hbWUgPSAndmZtdFN0cmV0Y2gnO1xyXG5cclxudmFyIHZmbXRNZXNoID0gbmV3IGdmeC5WZXJ0ZXhGb3JtYXQoW1xyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9QT1NJVElPTiwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9URVhfQ09PUkQsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcclxuICAgIHsgbmFtZTogZ2Z4LkFUVFJfVEVYX0NPT1JEMSwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDN9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9URVhfQ09PUkQyLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM30sXHJcbiAgICB7IG5hbWU6IGdmeC5BVFRSX0NPTE9SLCB0eXBlOiBnZnguQVRUUl9UWVBFX1VJTlQ4LCBudW06IDQsIG5vcm1hbGl6ZTogdHJ1ZSB9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9URVhfQ09PUkQzLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogMyB9LFxyXG4gICAgeyBuYW1lOiBnZnguQVRUUl9OT1JNQUwsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzIH0sXHJcbiAgICB7IG5hbWU6IGdmeC5BVFRSX0NPTE9SMSwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9VSU5UOCwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfVxyXG5dKTtcclxudmZtdE1lc2gubmFtZSA9ICd2Zm10TWVzaCc7XHJcblxyXG5AY2NjbGFzcygnY2MuUGFydGljbGVTeXN0ZW0zREFzc2VtYmxlcicpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnRpY2xlU3lzdGVtM0RBc3NlbWJsZXIgZXh0ZW5kcyBBc3NlbWJsZXIge1xyXG4gICAgX2RlZmluZXMgPSBudWxsO1xyXG4gICAgX3RyYWlsRGVmaW5lcyA9IG51bGw7XHJcbiAgICBfbW9kZWwgPSBudWxsO1xyXG4gICAgZnJhbWVUaWxlX3ZlbExlblNjYWxlID0gbnVsbDtcclxuICAgIGF0dHJzID0gW107XHJcbiAgICBfdmVydEZvcm1hdCA9IFtdO1xyXG4gICAgX3BhcnRpY2xlU3lzdGVtID0gbnVsbDtcclxuICAgIF9wYXJ0aWNsZXMgPSBudWxsO1xyXG4gICAgX2RlZmF1bHRNYXQgPSBudWxsO1xyXG4gICAgX2lzQXNzZXRSZWFkeSA9IGZhbHNlO1xyXG4gICAgX2RlZmF1bHRUcmFpbE1hdCA9IG51bGw7XHJcbiAgICBfY3VzdG9tUHJvcGVydGllcyA9IG51bGw7XHJcbiAgICBfbm9kZV9zY2FsZSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLmZyYW1lVGlsZV92ZWxMZW5TY2FsZSA9IGNjLnY0KDEsIDEsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX25vZGVfc2NhbGUgPSBjYy52NCgpO1xyXG4gICAgICAgIHRoaXMuYXR0cnMgPSBuZXcgQXJyYXkoNSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RyYWlsRGVmaW5lcyA9IHtcclxuICAgICAgICAgICAgQ0NfVVNFX1dPUkxEX1NQQUNFOiB0cnVlLFxyXG4gICAgICAgICAgICAvL0NDX0RSQVdfV0lSRV9GUkFNRTogdHJ1ZSwgICAvLyA8d2lyZWZyYW1lIGRlYnVnPlxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25Jbml0IChwcykge1xyXG4gICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtID0gcHM7XHJcbiAgICAgICAgdGhpcy5fcGFydGljbGVzID0gbmV3IFJlY3ljbGVQb29sKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQYXJ0aWNsZSh0aGlzKTtcclxuICAgICAgICB9LCAxNik7XHJcbiAgICAgICAgdGhpcy5fc2V0VmVydGV4QXR0cmliKCk7XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWxQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUcmFpbE1hdGVyaWFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGFydGljbGVTeXN0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kZWwgPSBuZXcgUGFydGljbGVCYXRjaE1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsLmluaXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5zZXRDYXBhY2l0eSh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5jYXBhY2l0eSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tb2RlbC5lbmFibGVkID0gdGhpcy5fcGFydGljbGVTeXN0ZW0uZW5hYmxlZEluSGllcmFyY2h5O1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLmVuYWJsZWQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5lbmFibGVkSW5IaWVyYXJjaHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl9wYXJ0aWNsZXMucmVzZXQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2xlQnVmZmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldEZyZWVQYXJ0aWNsZSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlcy5sZW5ndGggPj0gdGhpcy5fcGFydGljbGVTeXN0ZW0uY2FwYWNpdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJ0aWNsZXMuYWRkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldE5ld1BhcnRpY2xlIChwKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVQYXJ0aWNsZXMgKGR0KSB7XHJcbiAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubm9kZS5nZXRXb3JsZE1hdHJpeChfdGVtcFdvcmxkVHJhbnMpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnNjYWxlU3BhY2UpIHtcclxuICAgICAgICAgICAgY2FzZSBTcGFjZS5Mb2NhbDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLm5vZGUuZ2V0U2NhbGUodGhpcy5fbm9kZV9zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTcGFjZS5Xb3JsZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLm5vZGUuZ2V0V29ybGRTY2FsZSh0aGlzLl9ub2RlX3NjYWxlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5fcGFydGljbGVTeXN0ZW0ubWF0ZXJpYWxzWzBdO1xyXG4gICAgICAgIGxldCBtYXQgPSBtYXRlcmlhbCA/IHRoaXMuX3BhcnRpY2xlU3lzdGVtLnBhcnRpY2xlTWF0ZXJpYWwgOiB0aGlzLl9kZWZhdWx0TWF0O1xyXG4gICAgICAgIG1hdC5zZXRQcm9wZXJ0eSgnc2NhbGUnLCB0aGlzLl9ub2RlX3NjYWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUudXBkYXRlKHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9zaW11bGF0aW9uU3BhY2UsIF90ZW1wV29ybGRUcmFucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5mb3JjZU92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5mb3JjZU92ZXJ0aW1lTW9kdWxlLnVwZGF0ZSh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5fc2ltdWxhdGlvblNwYWNlLCBfdGVtcFdvcmxkVHJhbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3BhcnRpY2xlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gdGhpcy5fcGFydGljbGVzLmRhdGFbaV07XHJcbiAgICAgICAgICAgIHAucmVtYWluaW5nTGlmZXRpbWUgLT0gZHQ7XHJcbiAgICAgICAgICAgIFZlYzMuc2V0KHAuYW5pbWF0ZWRWZWxvY2l0eSwgMCwgMCwgMCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocC5yZW1haW5pbmdMaWZldGltZSA8IDAuMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLmVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLnJlbW92ZVBhcnRpY2xlKHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVzLnJlbW92ZShpKTtcclxuICAgICAgICAgICAgICAgIC0taTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwLnZlbG9jaXR5LnkgLT0gdGhpcy5fcGFydGljbGVTeXN0ZW0uZ3Jhdml0eU1vZGlmaWVyLmV2YWx1YXRlKDEgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lLCBwLnJhbmRvbVNlZWQpICogOS44ICogZHQ7IC8vIGFwcGx5IGdyYXZpdHkuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5zaXplT3ZlcnRpbWVNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5zaXplT3ZlcnRpbWVNb2R1bGUuYW5pbWF0ZShwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0uY29sb3JPdmVyTGlmZXRpbWVNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5jb2xvck92ZXJMaWZldGltZU1vZHVsZS5hbmltYXRlKHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5mb3JjZU92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0uZm9yY2VPdmVydGltZU1vZHVsZS5hbmltYXRlKHAsIGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udmVsb2NpdHlPdmVydGltZU1vZHVsZS5lbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuYW5pbWF0ZShwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIFZlYzMuY29weShwLnVsdGltYXRlVmVsb2NpdHksIHAudmVsb2NpdHkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0ubGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLmVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLmFuaW1hdGUocCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlLmFuaW1hdGUocCwgZHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLmVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5hbmltYXRlKHApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFZlYzMuc2NhbGVBbmRBZGQocC5wb3NpdGlvbiwgcC5wb3NpdGlvbiwgcC51bHRpbWF0ZVZlbG9jaXR5LCBkdCk7IC8vIGFwcGx5IHZlbG9jaXR5LlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5hbmltYXRlKHAsIGR0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFydGljbGVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbnRlcm5hbCBmdW5jdGlvblxyXG4gICAgdXBkYXRlUGFydGljbGVCdWZmZXIgKCkge1xyXG4gICAgICAgIC8vIHVwZGF0ZSB2ZXJ0ZXggYnVmZmVyXHJcbiAgICAgICAgbGV0IGlkeCA9IDA7XHJcbiAgICAgICAgY29uc3QgdXBsb2FkVmVsID0gdGhpcy5fcGFydGljbGVTeXN0ZW0ucmVuZGVyTW9kZSA9PT0gUmVuZGVyTW9kZS5TdHJlY3RoZWRCaWxsYm9hcmQ7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wYXJ0aWNsZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IHRoaXMuX3BhcnRpY2xlcy5kYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgZmkgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0udGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5lbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIGZpID0gcC5mcmFtZUluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlkeCA9IGkgKiA0O1xyXG4gICAgICAgICAgICBsZXQgYXR0ck51bSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlICE9PSBSZW5kZXJNb2RlLk1lc2gpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgKytqKSB7IC8vIGZvdXIgdmVydHMgcGVyIHBhcnRpY2xlLlxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBBdHRyaWJVVi54ID0gX3V2c1syICogal07XHJcbiAgICAgICAgICAgICAgICAgICAgX3RlbXBBdHRyaWJVVi55ID0gX3V2c1syICogaiArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZW1wQXR0cmliVVYueiA9IGZpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IF90ZW1wQXR0cmliVVY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5zaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAucm90YXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5jb2xvci5fdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXBsb2FkVmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAudWx0aW1hdGVWZWxvY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW9kZWwuYWRkUGFydGljbGVWZXJ0ZXhEYXRhKGlkeCsrLCB0aGlzLmF0dHJzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGF0dHJOdW0gPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gcC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIF90ZW1wQXR0cmliVVYueiA9IGZpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1thdHRyTnVtKytdID0gX3RlbXBBdHRyaWJVVjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cnNbYXR0ck51bSsrXSA9IHAucm90YXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2F0dHJOdW0rK10gPSBwLmNvbG9yLl92YWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RlbC5hZGRQYXJ0aWNsZVZlcnRleERhdGEoaSwgdGhpcy5hdHRycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlSUEoMCwgdGhpcy5fcGFydGljbGVzLmxlbmd0aCAqIHRoaXMuX21vZGVsLl9pbmRleENvdW50LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkZXJVbmlmb3JtICgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSUEgKGluZGV4LCBjb3VudCwgdkRpcnR5LCBpRGlydHkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLnVwZGF0ZUlBKGluZGV4LCBjb3VudCwgdkRpcnR5LCBpRGlydHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhcnRpY2xlQ291bnQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJ0aWNsZXMuZGF0YS5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgX29uTWF0ZXJpYWxNb2RpZmllZCAoaW5kZXgsIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsUGFyYW1zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVHJhaWxNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfb25SZWJ1aWxkUFNPIChpbmRleCwgbWF0ZXJpYWwpIHtcclxuICAgICAgICBpZiAodGhpcy5fbW9kZWwgJiYgaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbW9kZWwuc2V0TW9kZWxNYXRlcmlhbChtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5fdHJhaWxNb2RlbCAmJiBpbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5fdHJhaWxNb2RlbC5zZXRNb2RlbE1hdGVyaWFsKG1hdGVyaWFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2Vuc3VyZUxvYWRNZXNoICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0ubWVzaCAmJiAhdGhpcy5fcGFydGljbGVTeXN0ZW0ubWVzaC5sb2FkZWQpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHRoaXMuX3BhcnRpY2xlU3lzdGVtLm1lc2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDYXBhY2l0eSAoY2FwYWNpdHkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLnNldENhcGFjaXR5KGNhcGFjaXR5KTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0VmVydGV4QXR0cmliICgpIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBSZW5kZXJNb2RlLlN0cmVjdGhlZEJpbGxib2FyZDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRGb3JtYXQgPSB2Zm10U3RyZXRjaDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJlbmRlck1vZGUuTWVzaDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlcnRGb3JtYXQgPSB2Zm10TWVzaDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydEZvcm1hdCA9IHZmbXROb3JtYWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVNYXRlcmlhbFBhcmFtcyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wYXJ0aWNsZVN5c3RlbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5tYXRlcmlhbHNbMF07XHJcbiAgICAgICAgaWYgKG1hdCA9PSBudWxsICYmIHRoaXMuX2RlZmF1bHRNYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBtYXQgPSB0aGlzLl9kZWZhdWx0TWF0ID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCczZC1wYXJ0aWNsZScsIHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGUobWF0LCB0aGlzLl9wYXJ0aWNsZVN5c3RlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXQgPSBtYXQgfHwgdGhpcy5fZGVmYXVsdE1hdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9zaW11bGF0aW9uU3BhY2UgPT09IFNwYWNlLldvcmxkKSB7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1dPUkxEX1NQQUNFLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9XT1JMRF9TUEFDRSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuQmlsbGJvYXJkKSB7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0JJTExCT0FSRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1NUUkVUQ0hFRF9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfSE9SSVpPTlRBTF9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfVkVSVElDQUxfQklMTEJPQVJELCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuU3RyZWN0aGVkQmlsbGJvYXJkKSB7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJELCB0cnVlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfSE9SSVpPTlRBTF9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfVkVSVElDQUxfQklMTEJPQVJELCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbGVfdmVsTGVuU2NhbGUueiA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLnZlbG9jaXR5U2NhbGU7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaWxlX3ZlbExlblNjYWxlLncgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS5sZW5ndGhTY2FsZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuSG9yaXpvbnRhbEJpbGxib2FyZCkge1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfU1RSRVRDSEVEX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9IT1JJWk9OVEFMX0JJTExCT0FSRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9NRVNILCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS5yZW5kZXJNb2RlID09PSBSZW5kZXJNb2RlLlZlcnRpY2FsQmlsbGJvYXJkKSB7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9TVFJFVENIRURfQklMTEJPQVJELCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX0hPUklaT05UQUxfQklMTEJPQVJELCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX1ZFUlRJQ0FMX0JJTExCT0FSRCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hdC5kZWZpbmUoQ0NfVVNFX01FU0gsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGUgPT09IFJlbmRlck1vZGUuTWVzaCkge1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfU1RSRVRDSEVEX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9IT1JJWk9OVEFMX0JJTExCT0FSRCwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtYXQuZGVmaW5lKENDX1VTRV9WRVJUSUNBTF9CSUxMQk9BUkQsIGZhbHNlKTtcclxuICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfTUVTSCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGBwYXJ0aWNsZSBzeXN0ZW0gcmVuZGVyTW9kZSAke3RoaXMuX3BhcnRpY2xlU3lzdGVtLnJlbmRlck1vZGV9IG5vdCBzdXBwb3J0LmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRleHR1cmVBbmltYXRpb25Nb2R1bGUuZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIFZlYzIuc2V0KHRoaXMuZnJhbWVUaWxlX3ZlbExlblNjYWxlLCB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLm51bVRpbGVzWCwgdGhpcy5fcGFydGljbGVTeXN0ZW0udGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5udW1UaWxlc1kpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWF0LnNldFByb3BlcnR5KCdmcmFtZVRpbGVfdmVsTGVuU2NhbGUnLCB0aGlzLmZyYW1lVGlsZV92ZWxMZW5TY2FsZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnNldE1hdGVyaWFsKDAsIG1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3VwZGF0ZVRyYWlsTWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIC8vIEhlcmUgbmVlZCB0byBjcmVhdGUgYSBtYXRlcmlhbCB2YXJpYW50IHRocm91Z2ggdGhlIGdldHRlciBjYWxsLlxyXG4gICAgICAgIGxldCBtYXQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1hdGVyaWFsO1xyXG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1vZHVsZS5lbmFibGUpIHtcclxuICAgICAgICAgICAgaWYgKG1hdCA9PT0gbnVsbCAmJiB0aGlzLl9kZWZhdWx0VHJhaWxNYXQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRUcmFpbE1hdCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbignM2QtdHJhaWwnLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbWF0ID0gdGhpcy5fZGVmYXVsdFRyYWlsTWF0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0udHJhaWxNYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9zaW11bGF0aW9uU3BhY2UgPT09IFNwYWNlLldvcmxkIHx8IHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLnNwYWNlID09PSBTcGFjZS5Xb3JsZCkge1xyXG4gICAgICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfV09STERfU1BBQ0UsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWF0LmRlZmluZShDQ19VU0VfV09STERfU1BBQ0UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9tYXQuZGVmaW5lKENDX0RSQVdfV0lSRV9GUkFNRSwgdHJ1ZSk7IC8vIDx3aXJlZnJhbWUgZGVidWc+XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLnRyYWlsTW9kdWxlLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlVHJhaWxFbmFibGUgKGVuYWJsZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbW9kZWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN1YkRhdGEgPSB0aGlzLl9tb2RlbC5fc3ViRGF0YXNbMV07XHJcbiAgICAgICAgaWYgKHN1YkRhdGEpIHtcclxuICAgICAgICAgICAgc3ViRGF0YS5lbmFibGUgPSBlbmFibGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF91cGRhdGVNb2RlbCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb2RlbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21vZGVsLnNldFZlcnRleEF0dHJpYnV0ZXModGhpcy5fcGFydGljbGVTeXN0ZW0ucmVuZGVyTW9kZSA9PT0gUmVuZGVyTW9kZS5NZXNoID8gdGhpcy5fcGFydGljbGVTeXN0ZW0ubWVzaCA6IG51bGwsIHRoaXMuX3ZlcnRGb3JtYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFZlcnRleEF0dHJpYnV0ZXMgKG1lc2gsIHZmbXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbW9kZWwuc2V0VmVydGV4QXR0cmlidXRlcyhtZXNoLCB2Zm10KTtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsQnVmZmVycyAoY29tcCwgcmVuZGVyZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21vZGVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX21vZGVsLl91cGxvYWREYXRhKCk7XHJcblxyXG4gICAgICAgIGxldCBzdWJtZXNoZXMgPSB0aGlzLl9tb2RlbC5fc3ViTWVzaGVzO1xyXG4gICAgICAgIGxldCBzdWJEYXRhcyA9IHRoaXMuX21vZGVsLl9zdWJEYXRhcztcclxuICAgICAgICBsZXQgbWF0ZXJpYWxzID0gY29tcC5tYXRlcmlhbHM7XHJcbiAgICAgICAgcmVuZGVyZXIuX2ZsdXNoKClcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc3VibWVzaGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpYSA9IHN1Ym1lc2hlc1tpXTtcclxuICAgICAgICAgICAgbGV0IG1lc2hEYXRhID0gc3ViRGF0YXNbaV07XHJcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IG1hdGVyaWFsc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZXNoRGF0YS5lbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlci5jdWxsaW5nTWFzayA9IGNvbXAubm9kZS5fY3VsbGluZ01hc2s7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlci5ub2RlID0gY29tcC5ub2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLl9mbHVzaElBKGlhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuT2JqZWN0LmFzc2lnbihQYXJ0aWNsZVN5c3RlbTNEQXNzZW1ibGVyLCB7IHV2OiBfdXZzIH0pO1xyXG5cclxuQXNzZW1ibGVyLnJlZ2lzdGVyKFBhcnRpY2xlU3lzdGVtM0QsIFBhcnRpY2xlU3lzdGVtM0RBc3NlbWJsZXIpO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==