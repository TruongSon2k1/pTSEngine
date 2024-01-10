
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/device.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _state = _interopRequireDefault(require("./state"));

var _enums = require("./enums");

var _texture2d = _interopRequireDefault(require("./texture-2d"));

var _textureCube = _interopRequireDefault(require("./texture-cube"));

var _type2uniformCommit2, _type2uniformArrayCom;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GL_INT = 5124;
var GL_FLOAT = 5126;
var GL_FLOAT_VEC2 = 35664;
var GL_FLOAT_VEC3 = 35665;
var GL_FLOAT_VEC4 = 35666;
var GL_INT_VEC2 = 35667;
var GL_INT_VEC3 = 35668;
var GL_INT_VEC4 = 35669;
var GL_BOOL = 35670;
var GL_BOOL_VEC2 = 35671;
var GL_BOOL_VEC3 = 35672;
var GL_BOOL_VEC4 = 35673;
var GL_FLOAT_MAT2 = 35674;
var GL_FLOAT_MAT3 = 35675;
var GL_FLOAT_MAT4 = 35676;
var GL_SAMPLER_2D = 35678;
var GL_SAMPLER_CUBE = 35680;
/**
 * _type2uniformCommit
 */

var _type2uniformCommit = (_type2uniformCommit2 = {}, _type2uniformCommit2[GL_INT] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_FLOAT] = function (gl, id, value) {
  gl.uniform1f(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC2] = function (gl, id, value) {
  gl.uniform2fv(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC3] = function (gl, id, value) {
  gl.uniform3fv(id, value);
}, _type2uniformCommit2[GL_FLOAT_VEC4] = function (gl, id, value) {
  gl.uniform4fv(id, value);
}, _type2uniformCommit2[GL_INT_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformCommit2[GL_INT_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformCommit2[GL_INT_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformCommit2[GL_BOOL] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformCommit2[GL_BOOL_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformCommit2[GL_FLOAT_MAT2] = function (gl, id, value) {
  gl.uniformMatrix2fv(id, false, value);
}, _type2uniformCommit2[GL_FLOAT_MAT3] = function (gl, id, value) {
  gl.uniformMatrix3fv(id, false, value);
}, _type2uniformCommit2[GL_FLOAT_MAT4] = function (gl, id, value) {
  gl.uniformMatrix4fv(id, false, value);
}, _type2uniformCommit2[GL_SAMPLER_2D] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2[GL_SAMPLER_CUBE] = function (gl, id, value) {
  gl.uniform1i(id, value);
}, _type2uniformCommit2);
/**
 * _type2uniformArrayCommit
 */


var _type2uniformArrayCommit = (_type2uniformArrayCom = {}, _type2uniformArrayCom[GL_INT] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_FLOAT] = function (gl, id, value) {
  gl.uniform1fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC2] = function (gl, id, value) {
  gl.uniform2fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC3] = function (gl, id, value) {
  gl.uniform3fv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_VEC4] = function (gl, id, value) {
  gl.uniform4fv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformArrayCom[GL_INT_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformArrayCom[GL_BOOL] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC2] = function (gl, id, value) {
  gl.uniform2iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC3] = function (gl, id, value) {
  gl.uniform3iv(id, value);
}, _type2uniformArrayCom[GL_BOOL_VEC4] = function (gl, id, value) {
  gl.uniform4iv(id, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT2] = function (gl, id, value) {
  gl.uniformMatrix2fv(id, false, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT3] = function (gl, id, value) {
  gl.uniformMatrix3fv(id, false, value);
}, _type2uniformArrayCom[GL_FLOAT_MAT4] = function (gl, id, value) {
  gl.uniformMatrix4fv(id, false, value);
}, _type2uniformArrayCom[GL_SAMPLER_2D] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom[GL_SAMPLER_CUBE] = function (gl, id, value) {
  gl.uniform1iv(id, value);
}, _type2uniformArrayCom);
/**
 * _commitBlendStates
 */


function _commitBlendStates(gl, cur, next) {
  // enable/disable blend
  if (cur.blend !== next.blend) {
    if (!next.blend) {
      gl.disable(gl.BLEND);
      return;
    }

    gl.enable(gl.BLEND);

    if (next.blendSrc === _enums.enums.BLEND_CONSTANT_COLOR || next.blendSrc === _enums.enums.BLEND_ONE_MINUS_CONSTANT_COLOR || next.blendDst === _enums.enums.BLEND_CONSTANT_COLOR || next.blendDst === _enums.enums.BLEND_ONE_MINUS_CONSTANT_COLOR) {
      gl.blendColor((next.blendColor >> 24) / 255, (next.blendColor >> 16 & 0xff) / 255, (next.blendColor >> 8 & 0xff) / 255, (next.blendColor & 0xff) / 255);
    }

    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  } // nothing to update


  if (next.blend === false) {
    return;
  } // blend-color


  if (cur.blendColor !== next.blendColor) {
    gl.blendColor((next.blendColor >> 24) / 255, (next.blendColor >> 16 & 0xff) / 255, (next.blendColor >> 8 & 0xff) / 255, (next.blendColor & 0xff) / 255);
  } // separate diff, reset all


  if (cur.blendSep !== next.blendSep) {
    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  }

  if (next.blendSep) {
    // blend-func-separate
    if (cur.blendSrc !== next.blendSrc || cur.blendDst !== next.blendDst || cur.blendSrcAlpha !== next.blendSrcAlpha || cur.blendDstAlpha !== next.blendDstAlpha) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
    } // blend-equation-separate


    if (cur.blendEq !== next.blendEq || cur.blendAlphaEq !== next.blendAlphaEq) {
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    }
  } else {
    // blend-func
    if (cur.blendSrc !== next.blendSrc || cur.blendDst !== next.blendDst) {
      gl.blendFunc(next.blendSrc, next.blendDst);
    } // blend-equation


    if (cur.blendEq !== next.blendEq) {
      gl.blendEquation(next.blendEq);
    }
  }
}
/**
 * _commitDepthStates
 */


function _commitDepthStates(gl, cur, next) {
  // enable/disable depth-test
  if (cur.depthTest !== next.depthTest) {
    if (!next.depthTest) {
      gl.disable(gl.DEPTH_TEST);
      return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(next.depthFunc);
    gl.depthMask(next.depthWrite);
    return;
  } // commit depth-write


  if (cur.depthWrite !== next.depthWrite) {
    gl.depthMask(next.depthWrite);
  } // check if depth-write enabled


  if (next.depthTest === false) {
    if (next.depthWrite) {
      next.depthTest = true;
      next.depthFunc = _enums.enums.DS_FUNC_ALWAYS;
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(next.depthFunc);
    }

    return;
  } // depth-func


  if (cur.depthFunc !== next.depthFunc) {
    gl.depthFunc(next.depthFunc);
  }
}
/**
 * _commitStencilStates
 */


function _commitStencilStates(gl, cur, next) {
  // inherit stencil states
  if (next.stencilTest === _enums.enums.STENCIL_INHERIT) {
    return;
  }

  if (next.stencilTest !== cur.stencilTest) {
    if (next.stencilTest === _enums.enums.STENCIL_DISABLE) {
      gl.disable(gl.STENCIL_TEST);
      return;
    }

    gl.enable(gl.STENCIL_TEST);

    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    return;
  } // fast return


  if (next.stencilTest === _enums.enums.STENCIL_DISABLE) {
    return;
  }

  if (cur.stencilSep !== next.stencilSep) {
    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    return;
  }

  if (next.stencilSep) {
    // front
    if (cur.stencilFuncFront !== next.stencilFuncFront || cur.stencilRefFront !== next.stencilRefFront || cur.stencilMaskFront !== next.stencilMaskFront) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }

    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
    }

    if (cur.stencilFailOpFront !== next.stencilFailOpFront || cur.stencilZFailOpFront !== next.stencilZFailOpFront || cur.stencilZPassOpFront !== next.stencilZPassOpFront) {
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    } // back


    if (cur.stencilFuncBack !== next.stencilFuncBack || cur.stencilRefBack !== next.stencilRefBack || cur.stencilMaskBack !== next.stencilMaskBack) {
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
    }

    if (cur.stencilWriteMaskBack !== next.stencilWriteMaskBack) {
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
    }

    if (cur.stencilFailOpBack !== next.stencilFailOpBack || cur.stencilZFailOpBack !== next.stencilZFailOpBack || cur.stencilZPassOpBack !== next.stencilZPassOpBack) {
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    }
  } else {
    if (cur.stencilFuncFront !== next.stencilFuncFront || cur.stencilRefFront !== next.stencilRefFront || cur.stencilMaskFront !== next.stencilMaskFront) {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }

    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMask(next.stencilWriteMaskFront);
    }

    if (cur.stencilFailOpFront !== next.stencilFailOpFront || cur.stencilZFailOpFront !== next.stencilZFailOpFront || cur.stencilZPassOpFront !== next.stencilZPassOpFront) {
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }
  }
}
/**
 * _commitCullMode
 */


function _commitCullMode(gl, cur, next) {
  if (cur.cullMode === next.cullMode) {
    return;
  }

  if (next.cullMode === _enums.enums.CULL_NONE) {
    gl.disable(gl.CULL_FACE);
    return;
  }

  gl.enable(gl.CULL_FACE);
  gl.cullFace(next.cullMode);
}
/**
 * _commitVertexBuffers
 */


function _commitVertexBuffers(device, gl, cur, next) {
  var attrsDirty = false; // nothing changed for vertex buffer

  if (next.maxStream === -1) {
    return;
  }

  if (cur.maxStream !== next.maxStream) {
    attrsDirty = true;
  } else if (cur.program !== next.program) {
    attrsDirty = true;
  } else {
    for (var i = 0; i < next.maxStream + 1; ++i) {
      if (cur.vertexBuffers[i] !== next.vertexBuffers[i] || cur.vertexBufferOffsets[i] !== next.vertexBufferOffsets[i]) {
        attrsDirty = true;
        break;
      }
    }
  }

  if (attrsDirty) {
    for (var _i = 0; _i < device._caps.maxVertexAttribs; ++_i) {
      device._newAttributes[_i] = 0;
    }

    for (var _i2 = 0; _i2 < next.maxStream + 1; ++_i2) {
      var vb = next.vertexBuffers[_i2];
      var vbOffset = next.vertexBufferOffsets[_i2];

      if (!vb || vb._glID === -1) {
        continue;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vb._glID);

      for (var j = 0; j < next.program._attributes.length; ++j) {
        var attr = next.program._attributes[j];

        var el = vb._format.element(attr.name);

        if (!el) {
          console.warn("Can not find vertex attribute: " + attr.name);
          continue;
        }

        if (device._enabledAttributes[attr.location] === 0) {
          gl.enableVertexAttribArray(attr.location);
          device._enabledAttributes[attr.location] = 1;
        }

        device._newAttributes[attr.location] = 1;
        gl.vertexAttribPointer(attr.location, el.num, el.type, el.normalize, el.stride, el.offset + vbOffset * el.stride);
      }
    } // disable unused attributes


    for (var _i3 = 0; _i3 < device._caps.maxVertexAttribs; ++_i3) {
      if (device._enabledAttributes[_i3] !== device._newAttributes[_i3]) {
        gl.disableVertexAttribArray(_i3);
        device._enabledAttributes[_i3] = 0;
      }
    }
  }
}
/**
 * _commitTextures
 */


function _commitTextures(gl, cur, next) {
  for (var i = 0; i < next.maxTextureSlot + 1; ++i) {
    if (cur.textureUnits[i] !== next.textureUnits[i]) {
      var texture = next.textureUnits[i];

      if (texture && texture._glID !== -1) {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(texture._target, texture._glID);
      }
    }
  }
}
/**
 * _attach
 */


function _attach(gl, location, attachment, face) {
  if (face === void 0) {
    face = 0;
  }

  if (attachment instanceof _texture2d["default"]) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, location, gl.TEXTURE_2D, attachment._glID, 0);
  } else if (attachment instanceof _textureCube["default"]) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, location, gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, attachment._glID, 0);
  } else {
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, location, gl.RENDERBUFFER, attachment._glID);
  }
}

var Device = /*#__PURE__*/function () {
  /**
   * @param {HTMLElement} canvasEL
   * @param {object} opts
   */
  function Device(canvasEL, opts) {
    var gl; // default options

    opts = opts || {};

    if (opts.alpha === undefined) {
      opts.alpha = false;
    }

    if (opts.stencil === undefined) {
      opts.stencil = true;
    }

    if (opts.depth === undefined) {
      opts.depth = true;
    }

    if (opts.antialias === undefined) {
      opts.antialias = false;
    } // NOTE: it is said the performance improved in mobile device with this flag off.


    if (opts.preserveDrawingBuffer === undefined) {
      opts.preserveDrawingBuffer = false;
    }

    try {
      gl = canvasEL.getContext('webgl', opts) || canvasEL.getContext('experimental-webgl', opts) || canvasEL.getContext('webkit-3d', opts) || canvasEL.getContext('moz-webgl', opts);
    } catch (err) {
      console.error(err);
      return;
    } // No errors are thrown using try catch
    // Tested through ios baidu browser 4.14.1


    if (!gl) {
      console.error('This device does not support webgl');
    } // statics

    /**
     * @type {WebGLRenderingContext}
     */


    this._gl = gl;
    this._extensions = {};
    this._caps = {}; // capability

    this._stats = {
      texture: 0,
      vb: 0,
      ib: 0,
      drawcalls: 0
    }; // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Using_Extensions

    this._initExtensions(['EXT_texture_filter_anisotropic', 'EXT_shader_texture_lod', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_compressed_texture_atc', 'WEBGL_compressed_texture_etc', 'WEBGL_compressed_texture_etc1', 'WEBGL_compressed_texture_pvrtc', 'WEBGL_compressed_texture_s3tc', 'WEBGL_depth_texture', 'WEBGL_draw_buffers']);

    this._initCaps();

    this._initStates(); // runtime


    _state["default"].initDefault(this);

    this._current = new _state["default"](this);
    this._next = new _state["default"](this);
    this._uniforms = {}; // name: { value, num, dirty }

    this._vx = this._vy = this._vw = this._vh = 0;
    this._sx = this._sy = this._sw = this._sh = 0;
    this._framebuffer = null; //

    this._enabledAttributes = new Array(this._caps.maxVertexAttribs);
    this._newAttributes = new Array(this._caps.maxVertexAttribs);

    for (var i = 0; i < this._caps.maxVertexAttribs; ++i) {
      this._enabledAttributes[i] = 0;
      this._newAttributes[i] = 0;
    }
  }

  var _proto = Device.prototype;

  _proto._initExtensions = function _initExtensions(extensions) {
    var gl = this._gl;

    for (var i = 0; i < extensions.length; ++i) {
      var name = extensions[i];
      var vendorPrefixes = ["", "WEBKIT_", "MOZ_"];

      for (var j = 0; j < vendorPrefixes.length; j++) {
        try {
          var ext = gl.getExtension(vendorPrefixes[j] + name);

          if (ext) {
            this._extensions[name] = ext;
            break;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  _proto._initCaps = function _initCaps() {
    var gl = this._gl;
    var extDrawBuffers = this.ext('WEBGL_draw_buffers');
    this._caps.maxVertexStreams = 4;
    this._caps.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxFragUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    this._caps.maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
    this._caps.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    this._caps.maxDrawBuffers = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
    this._caps.maxColorAttachments = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL) : 1;
  };

  _proto._initStates = function _initStates() {
    var gl = this._gl; // gl.frontFace(gl.CCW);

    gl.disable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendColor(1, 1, 1, 1);
    gl.colorMask(true, true, true, true);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.disable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.depthMask(false);
    gl.disable(gl.POLYGON_OFFSET_FILL);
    gl.depthRange(0, 1);
    gl.disable(gl.STENCIL_TEST);
    gl.stencilFunc(gl.ALWAYS, 0, 0xFF);
    gl.stencilMask(0xFF);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP); // TODO:
    // this.setAlphaToCoverage(false);
    // this.setTransformFeedbackBuffer(null);
    // this.setRaster(true);
    // this.setDepthBias(false);

    gl.clearDepth(1);
    gl.clearColor(0, 0, 0, 0);
    gl.clearStencil(0);
    gl.disable(gl.SCISSOR_TEST);
  };

  _proto._restoreTexture = function _restoreTexture(unit) {
    var gl = this._gl;
    var texture = this._current.textureUnits[unit];

    if (texture && texture._glID !== -1) {
      gl.bindTexture(texture._target, texture._glID);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  };

  _proto._restoreIndexBuffer = function _restoreIndexBuffer() {
    var gl = this._gl;
    var ib = this._current.indexBuffer;

    if (ib && ib._glID !== -1) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib._glID);
    } else {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
  }
  /**
   * @method ext
   * @param {string} name
   */
  ;

  _proto.ext = function ext(name) {
    return this._extensions[name];
  };

  _proto.allowFloatTexture = function allowFloatTexture() {
    return this.ext("OES_texture_float") != null;
  } // ===============================
  // Immediate Settings
  // ===============================

  /**
   * @method setFrameBuffer
   * @param {FrameBuffer} fb - null means use the backbuffer
   */
  ;

  _proto.setFrameBuffer = function setFrameBuffer(fb) {
    if (this._framebuffer === fb) {
      return;
    }

    this._framebuffer = fb;
    var gl = this._gl;

    if (!fb) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb._glID);
    var numColors = fb._colors.length;

    for (var i = 0; i < numColors; ++i) {
      var colorBuffer = fb._colors[i];

      _attach(gl, gl.COLOR_ATTACHMENT0 + i, colorBuffer); // TODO: what about cubemap face??? should be the target parameter for colorBuffer

    }

    for (var _i4 = numColors; _i4 < this._caps.maxColorAttachments; ++_i4) {
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + _i4, gl.TEXTURE_2D, null, 0);
    }

    if (fb._depth) {
      _attach(gl, gl.DEPTH_ATTACHMENT, fb._depth);
    }

    if (fb._stencil) {
      _attach(gl, gl.STENCIL_ATTACHMENT, fb._stencil);
    }

    if (fb._depthStencil) {
      _attach(gl, gl.DEPTH_STENCIL_ATTACHMENT, fb._depthStencil);
    }
  }
  /**
   * @method setViewport
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  ;

  _proto.setViewport = function setViewport(x, y, w, h) {
    if (this._vx !== x || this._vy !== y || this._vw !== w || this._vh !== h) {
      this._gl.viewport(x, y, w, h);

      this._vx = x;
      this._vy = y;
      this._vw = w;
      this._vh = h;
    }
  }
  /**
   * @method setScissor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  ;

  _proto.setScissor = function setScissor(x, y, w, h) {
    if (this._sx !== x || this._sy !== y || this._sw !== w || this._sh !== h) {
      this._gl.scissor(x, y, w, h);

      this._sx = x;
      this._sy = y;
      this._sw = w;
      this._sh = h;
    }
  }
  /**
   * @method clear
   * @param {Object} opts
   * @param {Array} opts.color
   * @param {Number} opts.depth
   * @param {Number} opts.stencil
   */
  ;

  _proto.clear = function clear(opts) {
    if (opts.color === undefined && opts.depth === undefined && opts.stencil === undefined) {
      return;
    }

    var gl = this._gl;
    var flags = 0;

    if (opts.color !== undefined) {
      flags |= gl.COLOR_BUFFER_BIT;
      gl.clearColor(opts.color[0], opts.color[1], opts.color[2], opts.color[3]);
    }

    if (opts.depth !== undefined) {
      flags |= gl.DEPTH_BUFFER_BIT;
      gl.clearDepth(opts.depth);
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.depthFunc(gl.ALWAYS);
    }

    if (opts.stencil !== undefined) {
      flags |= gl.STENCIL_BUFFER_BIT;
      gl.clearStencil(opts.stencil);
    }

    gl.clear(flags); // restore depth-write

    if (opts.depth !== undefined) {
      if (this._current.depthTest === false) {
        gl.disable(gl.DEPTH_TEST);
      } else {
        if (this._current.depthWrite === false) {
          gl.depthMask(false);
        }

        if (this._current.depthFunc !== _enums.enums.DS_FUNC_ALWAYS) {
          gl.depthFunc(this._current.depthFunc);
        }
      }
    }
  } // ===============================
  // Deferred States
  // ===============================

  /**
   * @method enableBlend
   */
  ;

  _proto.enableBlend = function enableBlend() {
    this._next.blend = true;
  }
  /**
   * @method enableDepthTest
   */
  ;

  _proto.enableDepthTest = function enableDepthTest() {
    this._next.depthTest = true;
  }
  /**
   * @method enableDepthWrite
   */
  ;

  _proto.enableDepthWrite = function enableDepthWrite() {
    this._next.depthWrite = true;
  }
  /**
   * @method enableStencilTest
   * @param {Number} stencilTest
   */
  ;

  _proto.setStencilTest = function setStencilTest(stencilTest) {
    this._next.stencilTest = stencilTest;
  }
  /**
   * @method setStencilFunc
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFunc = function setStencilFunc(func, ref, mask) {
    this._next.stencilSep = false;
    this._next.stencilFuncFront = this._next.stencilFuncBack = func;
    this._next.stencilRefFront = this._next.stencilRefBack = ref;
    this._next.stencilMaskFront = this._next.stencilMaskBack = mask;
  }
  /**
   * @method setStencilFuncFront
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFuncFront = function setStencilFuncFront(func, ref, mask) {
    this._next.stencilSep = true;
    this._next.stencilFuncFront = func;
    this._next.stencilRefFront = ref;
    this._next.stencilMaskFront = mask;
  }
  /**
   * @method setStencilFuncBack
   * @param {DS_FUNC_*} func
   * @param {Number} ref
   * @param {Number} mask
   */
  ;

  _proto.setStencilFuncBack = function setStencilFuncBack(func, ref, mask) {
    this._next.stencilSep = true;
    this._next.stencilFuncBack = func;
    this._next.stencilRefBack = ref;
    this._next.stencilMaskBack = mask;
  }
  /**
   * @method setStencilOp
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOp = function setStencilOp(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilFailOpFront = this._next.stencilFailOpBack = failOp;
    this._next.stencilZFailOpFront = this._next.stencilZFailOpBack = zFailOp;
    this._next.stencilZPassOpFront = this._next.stencilZPassOpBack = zPassOp;
    this._next.stencilWriteMaskFront = this._next.stencilWriteMaskBack = writeMask;
  }
  /**
   * @method setStencilOpFront
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOpFront = function setStencilOpFront(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilSep = true;
    this._next.stencilFailOpFront = failOp;
    this._next.stencilZFailOpFront = zFailOp;
    this._next.stencilZPassOpFront = zPassOp;
    this._next.stencilWriteMaskFront = writeMask;
  }
  /**
   * @method setStencilOpBack
   * @param {STENCIL_OP_*} failOp
   * @param {STENCIL_OP_*} zFailOp
   * @param {STENCIL_OP_*} zPassOp
   * @param {Number} writeMask
   */
  ;

  _proto.setStencilOpBack = function setStencilOpBack(failOp, zFailOp, zPassOp, writeMask) {
    this._next.stencilSep = true;
    this._next.stencilFailOpBack = failOp;
    this._next.stencilZFailOpBack = zFailOp;
    this._next.stencilZPassOpBack = zPassOp;
    this._next.stencilWriteMaskBack = writeMask;
  }
  /**
   * @method setDepthFunc
   * @param {DS_FUNC_*} depthFunc
   */
  ;

  _proto.setDepthFunc = function setDepthFunc(depthFunc) {
    this._next.depthFunc = depthFunc;
  }
  /**
   * @method setBlendColor32
   * @param {Number} rgba
   */
  ;

  _proto.setBlendColor32 = function setBlendColor32(rgba) {
    this._next.blendColor = rgba;
  }
  /**
   * @method setBlendColor
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   */
  ;

  _proto.setBlendColor = function setBlendColor(r, g, b, a) {
    this._next.blendColor = (r * 255 << 24 | g * 255 << 16 | b * 255 << 8 | a * 255) >>> 0;
  }
  /**
   * @method setBlendFunc
   * @param {BELND_*} src
   * @param {BELND_*} dst
   */
  ;

  _proto.setBlendFunc = function setBlendFunc(src, dst) {
    this._next.blendSep = false;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
  }
  /**
   * @method setBlendFuncSep
   * @param {BELND_*} src
   * @param {BELND_*} dst
   * @param {BELND_*} srcAlpha
   * @param {BELND_*} dstAlpha
   */
  ;

  _proto.setBlendFuncSep = function setBlendFuncSep(src, dst, srcAlpha, dstAlpha) {
    this._next.blendSep = true;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
    this._next.blendSrcAlpha = srcAlpha;
    this._next.blendDstAlpha = dstAlpha;
  }
  /**
   * @method setBlendEq
   * @param {BELND_FUNC_*} eq
   */
  ;

  _proto.setBlendEq = function setBlendEq(eq) {
    this._next.blendSep = false;
    this._next.blendEq = eq;
  }
  /**
   * @method setBlendEqSep
   * @param {BELND_FUNC_*} eq
   * @param {BELND_FUNC_*} alphaEq
   */
  ;

  _proto.setBlendEqSep = function setBlendEqSep(eq, alphaEq) {
    this._next.blendSep = true;
    this._next.blendEq = eq;
    this._next.blendAlphaEq = alphaEq;
  }
  /**
   * @method setCullMode
   * @param {CULL_*} mode
   */
  ;

  _proto.setCullMode = function setCullMode(mode) {
    this._next.cullMode = mode;
  }
  /**
   * @method setVertexBuffer
   * @param {Number} stream
   * @param {VertexBuffer} buffer
   * @param {Number} start - start vertex
   */
  ;

  _proto.setVertexBuffer = function setVertexBuffer(stream, buffer, start) {
    if (start === void 0) {
      start = 0;
    }

    this._next.vertexBuffers[stream] = buffer;
    this._next.vertexBufferOffsets[stream] = start;

    if (this._next.maxStream < stream) {
      this._next.maxStream = stream;
    }
  }
  /**
   * @method setIndexBuffer
   * @param {IndexBuffer} buffer
   */
  ;

  _proto.setIndexBuffer = function setIndexBuffer(buffer) {
    this._next.indexBuffer = buffer;
  }
  /**
   * @method setProgram
   * @param {Program} program
   */
  ;

  _proto.setProgram = function setProgram(program) {
    this._next.program = program;
  }
  /**
   * @method setTexture
   * @param {String} name
   * @param {Texture} texture
   * @param {Number} slot
   */
  ;

  _proto.setTexture = function setTexture(name, texture, slot) {
    if (slot >= this._caps.maxTextureUnits) {
      console.warn("Can not set texture " + name + " at stage " + slot + ", max texture exceed: " + this._caps.maxTextureUnits);
      return;
    }

    this._next.textureUnits[slot] = texture;
    this.setUniform(name, slot);

    if (this._next.maxTextureSlot < slot) {
      this._next.maxTextureSlot = slot;
    }
  }
  /**
   * @method setTextureArray
   * @param {String} name
   * @param {Array} textures
   * @param {Int32Array} slots
   */
  ;

  _proto.setTextureArray = function setTextureArray(name, textures, slots) {
    var len = textures.length;

    if (len >= this._caps.maxTextureUnits) {
      console.warn("Can not set " + len + " textures for " + name + ", max texture exceed: " + this._caps.maxTextureUnits);
      return;
    }

    for (var i = 0; i < len; ++i) {
      var slot = slots[i];
      this._next.textureUnits[slot] = textures[i];

      if (this._next.maxTextureSlot < slot) {
        this._next.maxTextureSlot = slot;
      }
    }

    this.setUniform(name, slots);
  }
  /**
   * @method setUniform
   * @param {String} name
   * @param {*} value
   */
  ;

  _proto.setUniform = function setUniform(name, value) {
    var uniform = this._uniforms[name];
    var sameType = false;
    var isArray = false,
        isFloat32Array = false,
        isInt32Array = false;

    do {
      if (!uniform) {
        break;
      }

      isFloat32Array = Array.isArray(value) || value instanceof Float32Array;
      isInt32Array = value instanceof Int32Array;
      isArray = isFloat32Array || isInt32Array;

      if (uniform.isArray !== isArray) {
        break;
      }

      if (uniform.isArray && uniform.value.length !== value.length) {
        break;
      }

      sameType = true;
    } while (false);

    if (!sameType) {
      var newValue = value;

      if (isFloat32Array) {
        newValue = new Float32Array(value);
      } else if (isInt32Array) {
        newValue = new Int32Array(value);
      }

      uniform = {
        dirty: true,
        value: newValue,
        isArray: isArray
      };
    } else {
      var oldValue = uniform.value;
      var dirty = false;

      if (uniform.isArray) {
        for (var i = 0, l = oldValue.length; i < l; i++) {
          if (oldValue[i] !== value[i]) {
            dirty = true;
            oldValue[i] = value[i];
          }
        }
      } else {
        if (oldValue !== value) {
          dirty = true;
          uniform.value = value;
        }
      }

      if (dirty) {
        uniform.dirty = true;
      }
    }

    this._uniforms[name] = uniform;
  };

  _proto.setUniformDirectly = function setUniformDirectly(name, value) {
    var uniform = this._uniforms[name];

    if (!uniform) {
      this._uniforms[name] = uniform = {};
    }

    uniform.dirty = true;
    uniform.value = value;
  }
  /**
   * @method setPrimitiveType
   * @param {PT_*} type
   */
  ;

  _proto.setPrimitiveType = function setPrimitiveType(type) {
    this._next.primitiveType = type;
  }
  /**
   * @method resetDrawCalls
   */
  ;

  _proto.resetDrawCalls = function resetDrawCalls() {
    this._stats.drawcalls = 0;
  }
  /**
   * @method getDrawCalls
   */
  ;

  _proto.getDrawCalls = function getDrawCalls() {
    return this._stats.drawcalls;
  }
  /**
   * @method draw
   * @param {Number} base
   * @param {Number} count
   */
  ;

  _proto.draw = function draw(base, count) {
    var gl = this._gl;
    var cur = this._current;
    var next = this._next; // commit blend

    _commitBlendStates(gl, cur, next); // commit depth


    _commitDepthStates(gl, cur, next); // commit stencil


    _commitStencilStates(gl, cur, next); // commit cull


    _commitCullMode(gl, cur, next); // commit vertex-buffer


    _commitVertexBuffers(this, gl, cur, next); // commit index-buffer


    if (cur.indexBuffer !== next.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, next.indexBuffer && next.indexBuffer._glID !== -1 ? next.indexBuffer._glID : null);
    } // commit program


    var programDirty = false;

    if (cur.program !== next.program) {
      if (next.program._linked) {
        gl.useProgram(next.program._glID);
      } else {
        console.warn('Failed to use program: has not linked yet.');
      }

      programDirty = true;
    } // commit texture/sampler


    _commitTextures(gl, cur, next); // commit uniforms


    for (var i = 0; i < next.program._uniforms.length; ++i) {
      var uniformInfo = next.program._uniforms[i];
      var uniform = this._uniforms[uniformInfo.name];

      if (!uniform) {
        // console.warn(`Can not find uniform ${uniformInfo.name}`);
        continue;
      }

      if (!programDirty && !uniform.dirty) {
        continue;
      }

      uniform.dirty = false; // TODO: please consider array uniform: uniformInfo.size > 0

      var commitFunc = uniformInfo.size === undefined ? _type2uniformCommit[uniformInfo.type] : _type2uniformArrayCommit[uniformInfo.type];

      if (!commitFunc) {
        console.warn("Can not find commit function for uniform " + uniformInfo.name);
        continue;
      }

      commitFunc(gl, uniformInfo.location, uniform.value);
    }

    if (count) {
      // drawPrimitives
      if (next.indexBuffer) {
        gl.drawElements(this._next.primitiveType, count, next.indexBuffer._format, base * next.indexBuffer._bytesPerIndex);
      } else {
        gl.drawArrays(this._next.primitiveType, base, count);
      } // update stats


      this._stats.drawcalls++;
    } // TODO: autogen mipmap for color buffer
    // if (this._framebuffer && this._framebuffer.colors[0].mipmap) {
    //   gl.bindTexture(this._framebuffer.colors[i]._target, colors[i]._glID);
    //   gl.generateMipmap(this._framebuffer.colors[i]._target);
    // }
    // reset states


    cur.set(next);
    next.reset();
  };

  _createClass(Device, [{
    key: "caps",
    get:
    /**
     * @property caps
     */
    function get() {
      return this._caps;
    }
  }]);

  return Device;
}();

exports["default"] = Device;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXGRldmljZS5qcyJdLCJuYW1lcyI6WyJHTF9JTlQiLCJHTF9GTE9BVCIsIkdMX0ZMT0FUX1ZFQzIiLCJHTF9GTE9BVF9WRUMzIiwiR0xfRkxPQVRfVkVDNCIsIkdMX0lOVF9WRUMyIiwiR0xfSU5UX1ZFQzMiLCJHTF9JTlRfVkVDNCIsIkdMX0JPT0wiLCJHTF9CT09MX1ZFQzIiLCJHTF9CT09MX1ZFQzMiLCJHTF9CT09MX1ZFQzQiLCJHTF9GTE9BVF9NQVQyIiwiR0xfRkxPQVRfTUFUMyIsIkdMX0ZMT0FUX01BVDQiLCJHTF9TQU1QTEVSXzJEIiwiR0xfU0FNUExFUl9DVUJFIiwiX3R5cGUydW5pZm9ybUNvbW1pdCIsImdsIiwiaWQiLCJ2YWx1ZSIsInVuaWZvcm0xaSIsInVuaWZvcm0xZiIsInVuaWZvcm0yZnYiLCJ1bmlmb3JtM2Z2IiwidW5pZm9ybTRmdiIsInVuaWZvcm0yaXYiLCJ1bmlmb3JtM2l2IiwidW5pZm9ybTRpdiIsInVuaWZvcm1NYXRyaXgyZnYiLCJ1bmlmb3JtTWF0cml4M2Z2IiwidW5pZm9ybU1hdHJpeDRmdiIsIl90eXBlMnVuaWZvcm1BcnJheUNvbW1pdCIsInVuaWZvcm0xaXYiLCJ1bmlmb3JtMWZ2IiwiX2NvbW1pdEJsZW5kU3RhdGVzIiwiY3VyIiwibmV4dCIsImJsZW5kIiwiZGlzYWJsZSIsIkJMRU5EIiwiZW5hYmxlIiwiYmxlbmRTcmMiLCJlbnVtcyIsIkJMRU5EX0NPTlNUQU5UX0NPTE9SIiwiQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SIiwiYmxlbmREc3QiLCJibGVuZENvbG9yIiwiYmxlbmRTZXAiLCJibGVuZEZ1bmNTZXBhcmF0ZSIsImJsZW5kU3JjQWxwaGEiLCJibGVuZERzdEFscGhhIiwiYmxlbmRFcXVhdGlvblNlcGFyYXRlIiwiYmxlbmRFcSIsImJsZW5kQWxwaGFFcSIsImJsZW5kRnVuYyIsImJsZW5kRXF1YXRpb24iLCJfY29tbWl0RGVwdGhTdGF0ZXMiLCJkZXB0aFRlc3QiLCJERVBUSF9URVNUIiwiZGVwdGhGdW5jIiwiZGVwdGhNYXNrIiwiZGVwdGhXcml0ZSIsIkRTX0ZVTkNfQUxXQVlTIiwiX2NvbW1pdFN0ZW5jaWxTdGF0ZXMiLCJzdGVuY2lsVGVzdCIsIlNURU5DSUxfSU5IRVJJVCIsIlNURU5DSUxfRElTQUJMRSIsIlNURU5DSUxfVEVTVCIsInN0ZW5jaWxTZXAiLCJzdGVuY2lsRnVuY1NlcGFyYXRlIiwiRlJPTlQiLCJzdGVuY2lsRnVuY0Zyb250Iiwic3RlbmNpbFJlZkZyb250Iiwic3RlbmNpbE1hc2tGcm9udCIsInN0ZW5jaWxNYXNrU2VwYXJhdGUiLCJzdGVuY2lsV3JpdGVNYXNrRnJvbnQiLCJzdGVuY2lsT3BTZXBhcmF0ZSIsInN0ZW5jaWxGYWlsT3BGcm9udCIsInN0ZW5jaWxaRmFpbE9wRnJvbnQiLCJzdGVuY2lsWlBhc3NPcEZyb250IiwiQkFDSyIsInN0ZW5jaWxGdW5jQmFjayIsInN0ZW5jaWxSZWZCYWNrIiwic3RlbmNpbE1hc2tCYWNrIiwic3RlbmNpbFdyaXRlTWFza0JhY2siLCJzdGVuY2lsRmFpbE9wQmFjayIsInN0ZW5jaWxaRmFpbE9wQmFjayIsInN0ZW5jaWxaUGFzc09wQmFjayIsInN0ZW5jaWxGdW5jIiwic3RlbmNpbE1hc2siLCJzdGVuY2lsT3AiLCJfY29tbWl0Q3VsbE1vZGUiLCJjdWxsTW9kZSIsIkNVTExfTk9ORSIsIkNVTExfRkFDRSIsImN1bGxGYWNlIiwiX2NvbW1pdFZlcnRleEJ1ZmZlcnMiLCJkZXZpY2UiLCJhdHRyc0RpcnR5IiwibWF4U3RyZWFtIiwicHJvZ3JhbSIsImkiLCJ2ZXJ0ZXhCdWZmZXJzIiwidmVydGV4QnVmZmVyT2Zmc2V0cyIsIl9jYXBzIiwibWF4VmVydGV4QXR0cmlicyIsIl9uZXdBdHRyaWJ1dGVzIiwidmIiLCJ2Yk9mZnNldCIsIl9nbElEIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImoiLCJfYXR0cmlidXRlcyIsImxlbmd0aCIsImF0dHIiLCJlbCIsIl9mb3JtYXQiLCJlbGVtZW50IiwibmFtZSIsImNvbnNvbGUiLCJ3YXJuIiwiX2VuYWJsZWRBdHRyaWJ1dGVzIiwibG9jYXRpb24iLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJudW0iLCJ0eXBlIiwibm9ybWFsaXplIiwic3RyaWRlIiwib2Zmc2V0IiwiZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5IiwiX2NvbW1pdFRleHR1cmVzIiwibWF4VGV4dHVyZVNsb3QiLCJ0ZXh0dXJlVW5pdHMiLCJ0ZXh0dXJlIiwiYWN0aXZlVGV4dHVyZSIsIlRFWFRVUkUwIiwiYmluZFRleHR1cmUiLCJfdGFyZ2V0IiwiX2F0dGFjaCIsImF0dGFjaG1lbnQiLCJmYWNlIiwiVGV4dHVyZTJEIiwiZnJhbWVidWZmZXJUZXh0dXJlMkQiLCJGUkFNRUJVRkZFUiIsIlRFWFRVUkVfMkQiLCJUZXh0dXJlQ3ViZSIsIlRFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCIsImZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyIiwiUkVOREVSQlVGRkVSIiwiRGV2aWNlIiwiY2FudmFzRUwiLCJvcHRzIiwiYWxwaGEiLCJ1bmRlZmluZWQiLCJzdGVuY2lsIiwiZGVwdGgiLCJhbnRpYWxpYXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJnZXRDb250ZXh0IiwiZXJyIiwiZXJyb3IiLCJfZ2wiLCJfZXh0ZW5zaW9ucyIsIl9zdGF0cyIsImliIiwiZHJhd2NhbGxzIiwiX2luaXRFeHRlbnNpb25zIiwiX2luaXRDYXBzIiwiX2luaXRTdGF0ZXMiLCJTdGF0ZSIsImluaXREZWZhdWx0IiwiX2N1cnJlbnQiLCJfbmV4dCIsIl91bmlmb3JtcyIsIl92eCIsIl92eSIsIl92dyIsIl92aCIsIl9zeCIsIl9zeSIsIl9zdyIsIl9zaCIsIl9mcmFtZWJ1ZmZlciIsIkFycmF5IiwiZXh0ZW5zaW9ucyIsInZlbmRvclByZWZpeGVzIiwiZXh0IiwiZ2V0RXh0ZW5zaW9uIiwiZSIsImV4dERyYXdCdWZmZXJzIiwibWF4VmVydGV4U3RyZWFtcyIsIm1heFZlcnRleFRleHR1cmVzIiwiZ2V0UGFyYW1ldGVyIiwiTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwibWF4RnJhZ1VuaWZvcm1zIiwiTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUyIsIm1heFRleHR1cmVVbml0cyIsIk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTIiwiTUFYX1ZFUlRFWF9BVFRSSUJTIiwibWF4VGV4dHVyZVNpemUiLCJNQVhfVEVYVFVSRV9TSVpFIiwibWF4RHJhd0J1ZmZlcnMiLCJNQVhfRFJBV19CVUZGRVJTX1dFQkdMIiwibWF4Q29sb3JBdHRhY2htZW50cyIsIk1BWF9DT0xPUl9BVFRBQ0hNRU5UU19XRUJHTCIsIk9ORSIsIlpFUk8iLCJGVU5DX0FERCIsImNvbG9yTWFzayIsIkxFU1MiLCJQT0xZR09OX09GRlNFVF9GSUxMIiwiZGVwdGhSYW5nZSIsIkFMV0FZUyIsIktFRVAiLCJjbGVhckRlcHRoIiwiY2xlYXJDb2xvciIsImNsZWFyU3RlbmNpbCIsIlNDSVNTT1JfVEVTVCIsIl9yZXN0b3JlVGV4dHVyZSIsInVuaXQiLCJfcmVzdG9yZUluZGV4QnVmZmVyIiwiaW5kZXhCdWZmZXIiLCJFTEVNRU5UX0FSUkFZX0JVRkZFUiIsImFsbG93RmxvYXRUZXh0dXJlIiwic2V0RnJhbWVCdWZmZXIiLCJmYiIsImJpbmRGcmFtZWJ1ZmZlciIsIm51bUNvbG9ycyIsIl9jb2xvcnMiLCJjb2xvckJ1ZmZlciIsIkNPTE9SX0FUVEFDSE1FTlQwIiwiX2RlcHRoIiwiREVQVEhfQVRUQUNITUVOVCIsIl9zdGVuY2lsIiwiU1RFTkNJTF9BVFRBQ0hNRU5UIiwiX2RlcHRoU3RlbmNpbCIsIkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVCIsInNldFZpZXdwb3J0IiwieCIsInkiLCJ3IiwiaCIsInZpZXdwb3J0Iiwic2V0U2Npc3NvciIsInNjaXNzb3IiLCJjbGVhciIsImNvbG9yIiwiZmxhZ3MiLCJDT0xPUl9CVUZGRVJfQklUIiwiREVQVEhfQlVGRkVSX0JJVCIsIlNURU5DSUxfQlVGRkVSX0JJVCIsImVuYWJsZUJsZW5kIiwiZW5hYmxlRGVwdGhUZXN0IiwiZW5hYmxlRGVwdGhXcml0ZSIsInNldFN0ZW5jaWxUZXN0Iiwic2V0U3RlbmNpbEZ1bmMiLCJmdW5jIiwicmVmIiwibWFzayIsInNldFN0ZW5jaWxGdW5jRnJvbnQiLCJzZXRTdGVuY2lsRnVuY0JhY2siLCJzZXRTdGVuY2lsT3AiLCJmYWlsT3AiLCJ6RmFpbE9wIiwielBhc3NPcCIsIndyaXRlTWFzayIsInNldFN0ZW5jaWxPcEZyb250Iiwic2V0U3RlbmNpbE9wQmFjayIsInNldERlcHRoRnVuYyIsInNldEJsZW5kQ29sb3IzMiIsInJnYmEiLCJzZXRCbGVuZENvbG9yIiwiciIsImciLCJiIiwiYSIsInNldEJsZW5kRnVuYyIsInNyYyIsImRzdCIsInNldEJsZW5kRnVuY1NlcCIsInNyY0FscGhhIiwiZHN0QWxwaGEiLCJzZXRCbGVuZEVxIiwiZXEiLCJzZXRCbGVuZEVxU2VwIiwiYWxwaGFFcSIsInNldEN1bGxNb2RlIiwibW9kZSIsInNldFZlcnRleEJ1ZmZlciIsInN0cmVhbSIsImJ1ZmZlciIsInN0YXJ0Iiwic2V0SW5kZXhCdWZmZXIiLCJzZXRQcm9ncmFtIiwic2V0VGV4dHVyZSIsInNsb3QiLCJzZXRVbmlmb3JtIiwic2V0VGV4dHVyZUFycmF5IiwidGV4dHVyZXMiLCJzbG90cyIsImxlbiIsInVuaWZvcm0iLCJzYW1lVHlwZSIsImlzQXJyYXkiLCJpc0Zsb2F0MzJBcnJheSIsImlzSW50MzJBcnJheSIsIkZsb2F0MzJBcnJheSIsIkludDMyQXJyYXkiLCJuZXdWYWx1ZSIsImRpcnR5Iiwib2xkVmFsdWUiLCJsIiwic2V0VW5pZm9ybURpcmVjdGx5Iiwic2V0UHJpbWl0aXZlVHlwZSIsInByaW1pdGl2ZVR5cGUiLCJyZXNldERyYXdDYWxscyIsImdldERyYXdDYWxscyIsImRyYXciLCJiYXNlIiwiY291bnQiLCJwcm9ncmFtRGlydHkiLCJfbGlua2VkIiwidXNlUHJvZ3JhbSIsInVuaWZvcm1JbmZvIiwiY29tbWl0RnVuYyIsInNpemUiLCJkcmF3RWxlbWVudHMiLCJfYnl0ZXNQZXJJbmRleCIsImRyYXdBcnJheXMiLCJzZXQiLCJyZXNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHLElBQWY7QUFDQSxJQUFNQyxRQUFRLEdBQUcsSUFBakI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsS0FBcEI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsS0FBcEI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsS0FBcEI7QUFDQSxJQUFNQyxPQUFPLEdBQUcsS0FBaEI7QUFDQSxJQUFNQyxZQUFZLEdBQUcsS0FBckI7QUFDQSxJQUFNQyxZQUFZLEdBQUcsS0FBckI7QUFDQSxJQUFNQyxZQUFZLEdBQUcsS0FBckI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsS0FBdEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsS0FBeEI7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsbUJBQW1CLG9EQUNwQmpCLE1BRG9CLElBQ1gsVUFBVWtCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDakNGLEVBQUFBLEVBQUUsQ0FBQ0csU0FBSCxDQUFhRixFQUFiLEVBQWlCQyxLQUFqQjtBQUNELENBSG9CLHVCQUtwQm5CLFFBTG9CLElBS1QsVUFBVWlCLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsS0FBbEIsRUFBeUI7QUFDbkNGLEVBQUFBLEVBQUUsQ0FBQ0ksU0FBSCxDQUFhSCxFQUFiLEVBQWlCQyxLQUFqQjtBQUNELENBUG9CLHVCQVNw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bUJBQVc7QUFDVCxhQUFPLEtBQUtwTyxLQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XHJcbmltcG9ydCB7IGVudW1zIH0gZnJvbSAnLi9lbnVtcyc7XHJcblxyXG5pbXBvcnQgVGV4dHVyZTJEIGZyb20gJy4vdGV4dHVyZS0yZCc7XHJcbmltcG9ydCBUZXh0dXJlQ3ViZSBmcm9tICcuL3RleHR1cmUtY3ViZSc7XHJcblxyXG5jb25zdCBHTF9JTlQgPSA1MTI0O1xyXG5jb25zdCBHTF9GTE9BVCA9IDUxMjY7XHJcbmNvbnN0IEdMX0ZMT0FUX1ZFQzIgPSAzNTY2NDtcclxuY29uc3QgR0xfRkxPQVRfVkVDMyA9IDM1NjY1O1xyXG5jb25zdCBHTF9GTE9BVF9WRUM0ID0gMzU2NjY7XHJcbmNvbnN0IEdMX0lOVF9WRUMyID0gMzU2Njc7XHJcbmNvbnN0IEdMX0lOVF9WRUMzID0gMzU2Njg7XHJcbmNvbnN0IEdMX0lOVF9WRUM0ID0gMzU2Njk7XHJcbmNvbnN0IEdMX0JPT0wgPSAzNTY3MDtcclxuY29uc3QgR0xfQk9PTF9WRUMyID0gMzU2NzE7XHJcbmNvbnN0IEdMX0JPT0xfVkVDMyA9IDM1NjcyO1xyXG5jb25zdCBHTF9CT09MX1ZFQzQgPSAzNTY3MztcclxuY29uc3QgR0xfRkxPQVRfTUFUMiA9IDM1Njc0O1xyXG5jb25zdCBHTF9GTE9BVF9NQVQzID0gMzU2NzU7XHJcbmNvbnN0IEdMX0ZMT0FUX01BVDQgPSAzNTY3NjtcclxuY29uc3QgR0xfU0FNUExFUl8yRCA9IDM1Njc4O1xyXG5jb25zdCBHTF9TQU1QTEVSX0NVQkUgPSAzNTY4MDtcclxuXHJcbi8qKlxyXG4gKiBfdHlwZTJ1bmlmb3JtQ29tbWl0XHJcbiAqL1xyXG5sZXQgX3R5cGUydW5pZm9ybUNvbW1pdCA9IHtcclxuICBbR0xfSU5UXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0xaShpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtMWYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfRkxPQVRfVkVDMl06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtMmZ2KGlkLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0ZMT0FUX1ZFQzNdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTNmdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF9WRUM0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm00ZnYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfSU5UX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTJpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9JTlRfVkVDM106IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtM2l2KGlkLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0lOVF9WRUM0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm00aXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfQk9PTF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtMWkoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfQk9PTF9WRUMyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0yaXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfQk9PTF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0zaXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfQk9PTF9WRUM0XTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm00aXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfRkxPQVRfTUFUMl06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4MmZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF9NQVQzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXgzZnYoaWQsIGZhbHNlLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0ZMT0FUX01BVDRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihpZCwgZmFsc2UsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfU0FNUExFUl8yRF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtMWkoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfU0FNUExFUl9DVUJFXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0xaShpZCwgdmFsdWUpO1xyXG4gIH0sXHJcbn07XHJcblxyXG4vKipcclxuICogX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0XHJcbiAqL1xyXG5sZXQgX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0ID0ge1xyXG4gIFtHTF9JTlRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTFpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtMWZ2KGlkLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0ZMT0FUX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTJmdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF9WRUMzXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0zZnYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfRkxPQVRfVkVDNF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtNGZ2KGlkLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0lOVF9WRUMyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0yaXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfSU5UX1ZFQzNdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTNpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9JTlRfVkVDNF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtNGl2KGlkLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0JPT0xdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTFpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9CT09MX1ZFQzJdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTJpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9CT09MX1ZFQzNdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTNpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9CT09MX1ZFQzRdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybTRpdihpZCwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9GTE9BVF9NQVQyXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXgyZnYoaWQsIGZhbHNlLCB2YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgW0dMX0ZMT0FUX01BVDNdOiBmdW5jdGlvbiAoZ2wsIGlkLCB2YWx1ZSkge1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDNmdihpZCwgZmFsc2UsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfRkxPQVRfTUFUNF06IGZ1bmN0aW9uIChnbCwgaWQsIHZhbHVlKSB7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KGlkLCBmYWxzZSwgdmFsdWUpO1xyXG4gIH0sXHJcblxyXG4gIFtHTF9TQU1QTEVSXzJEXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0xaXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBbR0xfU0FNUExFUl9DVUJFXTogZnVuY3Rpb24gKGdsLCBpZCwgdmFsdWUpIHtcclxuICAgIGdsLnVuaWZvcm0xaXYoaWQsIHZhbHVlKTtcclxuICB9LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIF9jb21taXRCbGVuZFN0YXRlc1xyXG4gKi9cclxuZnVuY3Rpb24gX2NvbW1pdEJsZW5kU3RhdGVzKGdsLCBjdXIsIG5leHQpIHtcclxuICAvLyBlbmFibGUvZGlzYWJsZSBibGVuZFxyXG4gIGlmIChjdXIuYmxlbmQgIT09IG5leHQuYmxlbmQpIHtcclxuICAgIGlmICghbmV4dC5ibGVuZCkge1xyXG4gICAgICBnbC5kaXNhYmxlKGdsLkJMRU5EKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBuZXh0LmJsZW5kU3JjID09PSBlbnVtcy5CTEVORF9DT05TVEFOVF9DT0xPUiB8fFxyXG4gICAgICBuZXh0LmJsZW5kU3JjID09PSBlbnVtcy5CTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IgfHxcclxuICAgICAgbmV4dC5ibGVuZERzdCA9PT0gZW51bXMuQkxFTkRfQ09OU1RBTlRfQ09MT1IgfHxcclxuICAgICAgbmV4dC5ibGVuZERzdCA9PT0gZW51bXMuQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SXHJcbiAgICApIHtcclxuICAgICAgZ2wuYmxlbmRDb2xvcihcclxuICAgICAgICAobmV4dC5ibGVuZENvbG9yID4+IDI0KSAvIDI1NSxcclxuICAgICAgICAobmV4dC5ibGVuZENvbG9yID4+IDE2ICYgMHhmZikgLyAyNTUsXHJcbiAgICAgICAgKG5leHQuYmxlbmRDb2xvciA+PiA4ICYgMHhmZikgLyAyNTUsXHJcbiAgICAgICAgKG5leHQuYmxlbmRDb2xvciAmIDB4ZmYpIC8gMjU1XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5leHQuYmxlbmRTZXApIHtcclxuICAgICAgZ2wuYmxlbmRGdW5jU2VwYXJhdGUobmV4dC5ibGVuZFNyYywgbmV4dC5ibGVuZERzdCwgbmV4dC5ibGVuZFNyY0FscGhhLCBuZXh0LmJsZW5kRHN0QWxwaGEpO1xyXG4gICAgICBnbC5ibGVuZEVxdWF0aW9uU2VwYXJhdGUobmV4dC5ibGVuZEVxLCBuZXh0LmJsZW5kQWxwaGFFcSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnbC5ibGVuZEZ1bmMobmV4dC5ibGVuZFNyYywgbmV4dC5ibGVuZERzdCk7XHJcbiAgICAgIGdsLmJsZW5kRXF1YXRpb24obmV4dC5ibGVuZEVxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBub3RoaW5nIHRvIHVwZGF0ZVxyXG4gIGlmIChuZXh0LmJsZW5kID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gYmxlbmQtY29sb3JcclxuICBpZiAoY3VyLmJsZW5kQ29sb3IgIT09IG5leHQuYmxlbmRDb2xvcikge1xyXG4gICAgZ2wuYmxlbmRDb2xvcihcclxuICAgICAgKG5leHQuYmxlbmRDb2xvciA+PiAyNCkgLyAyNTUsXHJcbiAgICAgIChuZXh0LmJsZW5kQ29sb3IgPj4gMTYgJiAweGZmKSAvIDI1NSxcclxuICAgICAgKG5leHQuYmxlbmRDb2xvciA+PiA4ICYgMHhmZikgLyAyNTUsXHJcbiAgICAgIChuZXh0LmJsZW5kQ29sb3IgJiAweGZmKSAvIDI1NVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIHNlcGFyYXRlIGRpZmYsIHJlc2V0IGFsbFxyXG4gIGlmIChjdXIuYmxlbmRTZXAgIT09IG5leHQuYmxlbmRTZXApIHtcclxuICAgIGlmIChuZXh0LmJsZW5kU2VwKSB7XHJcbiAgICAgIGdsLmJsZW5kRnVuY1NlcGFyYXRlKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QsIG5leHQuYmxlbmRTcmNBbHBoYSwgbmV4dC5ibGVuZERzdEFscGhhKTtcclxuICAgICAgZ2wuYmxlbmRFcXVhdGlvblNlcGFyYXRlKG5leHQuYmxlbmRFcSwgbmV4dC5ibGVuZEFscGhhRXEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ2wuYmxlbmRGdW5jKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QpO1xyXG4gICAgICBnbC5ibGVuZEVxdWF0aW9uKG5leHQuYmxlbmRFcSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5leHQuYmxlbmRTZXApIHtcclxuICAgIC8vIGJsZW5kLWZ1bmMtc2VwYXJhdGVcclxuICAgIGlmIChcclxuICAgICAgY3VyLmJsZW5kU3JjICE9PSBuZXh0LmJsZW5kU3JjIHx8XHJcbiAgICAgIGN1ci5ibGVuZERzdCAhPT0gbmV4dC5ibGVuZERzdCB8fFxyXG4gICAgICBjdXIuYmxlbmRTcmNBbHBoYSAhPT0gbmV4dC5ibGVuZFNyY0FscGhhIHx8XHJcbiAgICAgIGN1ci5ibGVuZERzdEFscGhhICE9PSBuZXh0LmJsZW5kRHN0QWxwaGFcclxuICAgICkge1xyXG4gICAgICBnbC5ibGVuZEZ1bmNTZXBhcmF0ZShuZXh0LmJsZW5kU3JjLCBuZXh0LmJsZW5kRHN0LCBuZXh0LmJsZW5kU3JjQWxwaGEsIG5leHQuYmxlbmREc3RBbHBoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYmxlbmQtZXF1YXRpb24tc2VwYXJhdGVcclxuICAgIGlmIChcclxuICAgICAgY3VyLmJsZW5kRXEgIT09IG5leHQuYmxlbmRFcSB8fFxyXG4gICAgICBjdXIuYmxlbmRBbHBoYUVxICE9PSBuZXh0LmJsZW5kQWxwaGFFcVxyXG4gICAgKSB7XHJcbiAgICAgIGdsLmJsZW5kRXF1YXRpb25TZXBhcmF0ZShuZXh0LmJsZW5kRXEsIG5leHQuYmxlbmRBbHBoYUVxKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmxlbmQtZnVuY1xyXG4gICAgaWYgKFxyXG4gICAgICBjdXIuYmxlbmRTcmMgIT09IG5leHQuYmxlbmRTcmMgfHxcclxuICAgICAgY3VyLmJsZW5kRHN0ICE9PSBuZXh0LmJsZW5kRHN0XHJcbiAgICApIHtcclxuICAgICAgZ2wuYmxlbmRGdW5jKG5leHQuYmxlbmRTcmMsIG5leHQuYmxlbmREc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJsZW5kLWVxdWF0aW9uXHJcbiAgICBpZiAoY3VyLmJsZW5kRXEgIT09IG5leHQuYmxlbmRFcSkge1xyXG4gICAgICBnbC5ibGVuZEVxdWF0aW9uKG5leHQuYmxlbmRFcSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogX2NvbW1pdERlcHRoU3RhdGVzXHJcbiAqL1xyXG5mdW5jdGlvbiBfY29tbWl0RGVwdGhTdGF0ZXMoZ2wsIGN1ciwgbmV4dCkge1xyXG4gIC8vIGVuYWJsZS9kaXNhYmxlIGRlcHRoLXRlc3RcclxuICBpZiAoY3VyLmRlcHRoVGVzdCAhPT0gbmV4dC5kZXB0aFRlc3QpIHtcclxuICAgIGlmICghbmV4dC5kZXB0aFRlc3QpIHtcclxuICAgICAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcclxuICAgIGdsLmRlcHRoRnVuYyhuZXh0LmRlcHRoRnVuYyk7XHJcbiAgICBnbC5kZXB0aE1hc2sobmV4dC5kZXB0aFdyaXRlKTtcclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBjb21taXQgZGVwdGgtd3JpdGVcclxuICBpZiAoY3VyLmRlcHRoV3JpdGUgIT09IG5leHQuZGVwdGhXcml0ZSkge1xyXG4gICAgZ2wuZGVwdGhNYXNrKG5leHQuZGVwdGhXcml0ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBjaGVjayBpZiBkZXB0aC13cml0ZSBlbmFibGVkXHJcbiAgaWYgKG5leHQuZGVwdGhUZXN0ID09PSBmYWxzZSkge1xyXG4gICAgaWYgKG5leHQuZGVwdGhXcml0ZSkge1xyXG4gICAgICBuZXh0LmRlcHRoVGVzdCA9IHRydWU7XHJcbiAgICAgIG5leHQuZGVwdGhGdW5jID0gZW51bXMuRFNfRlVOQ19BTFdBWVM7XHJcblxyXG4gICAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgIGdsLmRlcHRoRnVuYyhuZXh0LmRlcHRoRnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gZGVwdGgtZnVuY1xyXG4gIGlmIChjdXIuZGVwdGhGdW5jICE9PSBuZXh0LmRlcHRoRnVuYykge1xyXG4gICAgZ2wuZGVwdGhGdW5jKG5leHQuZGVwdGhGdW5jKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBfY29tbWl0U3RlbmNpbFN0YXRlc1xyXG4gKi9cclxuZnVuY3Rpb24gX2NvbW1pdFN0ZW5jaWxTdGF0ZXMoZ2wsIGN1ciwgbmV4dCkge1xyXG4gIC8vIGluaGVyaXQgc3RlbmNpbCBzdGF0ZXNcclxuICBpZiAobmV4dC5zdGVuY2lsVGVzdCA9PT0gZW51bXMuU1RFTkNJTF9JTkhFUklUKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAobmV4dC5zdGVuY2lsVGVzdCAhPT0gY3VyLnN0ZW5jaWxUZXN0KSB7XHJcbiAgICBpZiAobmV4dC5zdGVuY2lsVGVzdCA9PT0gZW51bXMuU1RFTkNJTF9ESVNBQkxFKSB7XHJcbiAgICAgIGdsLmRpc2FibGUoZ2wuU1RFTkNJTF9URVNUKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmVuYWJsZShnbC5TVEVOQ0lMX1RFU1QpO1xyXG5cclxuICAgIGlmIChuZXh0LnN0ZW5jaWxTZXApIHtcclxuICAgICAgZ2wuc3RlbmNpbEZ1bmNTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsRnVuY0Zyb250LCBuZXh0LnN0ZW5jaWxSZWZGcm9udCwgbmV4dC5zdGVuY2lsTWFza0Zyb250KTtcclxuICAgICAgZ2wuc3RlbmNpbE1hc2tTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsV3JpdGVNYXNrRnJvbnQpO1xyXG4gICAgICBnbC5zdGVuY2lsT3BTZXBhcmF0ZShnbC5GUk9OVCwgbmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250KTtcclxuICAgICAgZ2wuc3RlbmNpbEZ1bmNTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxGdW5jQmFjaywgbmV4dC5zdGVuY2lsUmVmQmFjaywgbmV4dC5zdGVuY2lsTWFza0JhY2spO1xyXG4gICAgICBnbC5zdGVuY2lsTWFza1NlcGFyYXRlKGdsLkJBQ0ssIG5leHQuc3RlbmNpbFdyaXRlTWFza0JhY2spO1xyXG4gICAgICBnbC5zdGVuY2lsT3BTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxGYWlsT3BCYWNrLCBuZXh0LnN0ZW5jaWxaRmFpbE9wQmFjaywgbmV4dC5zdGVuY2lsWlBhc3NPcEJhY2spO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZ2wuc3RlbmNpbEZ1bmMobmV4dC5zdGVuY2lsRnVuY0Zyb250LCBuZXh0LnN0ZW5jaWxSZWZGcm9udCwgbmV4dC5zdGVuY2lsTWFza0Zyb250KTtcclxuICAgICAgZ2wuc3RlbmNpbE1hc2sobmV4dC5zdGVuY2lsV3JpdGVNYXNrRnJvbnQpO1xyXG4gICAgICBnbC5zdGVuY2lsT3AobmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBmYXN0IHJldHVyblxyXG4gIGlmIChuZXh0LnN0ZW5jaWxUZXN0ID09PSBlbnVtcy5TVEVOQ0lMX0RJU0FCTEUpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChjdXIuc3RlbmNpbFNlcCAhPT0gbmV4dC5zdGVuY2lsU2VwKSB7XHJcbiAgICBpZiAobmV4dC5zdGVuY2lsU2VwKSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxGdW5jU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZ1bmNGcm9udCwgbmV4dC5zdGVuY2lsUmVmRnJvbnQsIG5leHQuc3RlbmNpbE1hc2tGcm9udCk7XHJcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KTtcclxuICAgICAgZ2wuc3RlbmNpbE9wU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udCk7XHJcbiAgICAgIGdsLnN0ZW5jaWxGdW5jU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsRnVuY0JhY2ssIG5leHQuc3RlbmNpbFJlZkJhY2ssIG5leHQuc3RlbmNpbE1hc2tCYWNrKTtcclxuICAgICAgZ2wuc3RlbmNpbE1hc2tTZXBhcmF0ZShnbC5CQUNLLCBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tCYWNrKTtcclxuICAgICAgZ2wuc3RlbmNpbE9wU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsRmFpbE9wQmFjaywgbmV4dC5zdGVuY2lsWkZhaWxPcEJhY2ssIG5leHQuc3RlbmNpbFpQYXNzT3BCYWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxGdW5jKG5leHQuc3RlbmNpbEZ1bmNGcm9udCwgbmV4dC5zdGVuY2lsUmVmRnJvbnQsIG5leHQuc3RlbmNpbE1hc2tGcm9udCk7XHJcbiAgICAgIGdsLnN0ZW5jaWxNYXNrKG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KTtcclxuICAgICAgZ2wuc3RlbmNpbE9wKG5leHQuc3RlbmNpbEZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAobmV4dC5zdGVuY2lsU2VwKSB7XHJcbiAgICAvLyBmcm9udFxyXG4gICAgaWYgKFxyXG4gICAgICBjdXIuc3RlbmNpbEZ1bmNGcm9udCAhPT0gbmV4dC5zdGVuY2lsRnVuY0Zyb250IHx8XHJcbiAgICAgIGN1ci5zdGVuY2lsUmVmRnJvbnQgIT09IG5leHQuc3RlbmNpbFJlZkZyb250IHx8XHJcbiAgICAgIGN1ci5zdGVuY2lsTWFza0Zyb250ICE9PSBuZXh0LnN0ZW5jaWxNYXNrRnJvbnRcclxuICAgICkge1xyXG4gICAgICBnbC5zdGVuY2lsRnVuY1NlcGFyYXRlKGdsLkZST05ULCBuZXh0LnN0ZW5jaWxGdW5jRnJvbnQsIG5leHQuc3RlbmNpbFJlZkZyb250LCBuZXh0LnN0ZW5jaWxNYXNrRnJvbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1ci5zdGVuY2lsV3JpdGVNYXNrRnJvbnQgIT09IG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250KTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgY3VyLnN0ZW5jaWxGYWlsT3BGcm9udCAhPT0gbmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQgfHxcclxuICAgICAgY3VyLnN0ZW5jaWxaRmFpbE9wRnJvbnQgIT09IG5leHQuc3RlbmNpbFpGYWlsT3BGcm9udCB8fFxyXG4gICAgICBjdXIuc3RlbmNpbFpQYXNzT3BGcm9udCAhPT0gbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250XHJcbiAgICApIHtcclxuICAgICAgZ2wuc3RlbmNpbE9wU2VwYXJhdGUoZ2wuRlJPTlQsIG5leHQuc3RlbmNpbEZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQsIG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYmFja1xyXG4gICAgaWYgKFxyXG4gICAgICBjdXIuc3RlbmNpbEZ1bmNCYWNrICE9PSBuZXh0LnN0ZW5jaWxGdW5jQmFjayB8fFxyXG4gICAgICBjdXIuc3RlbmNpbFJlZkJhY2sgIT09IG5leHQuc3RlbmNpbFJlZkJhY2sgfHxcclxuICAgICAgY3VyLnN0ZW5jaWxNYXNrQmFjayAhPT0gbmV4dC5zdGVuY2lsTWFza0JhY2tcclxuICAgICkge1xyXG4gICAgICBnbC5zdGVuY2lsRnVuY1NlcGFyYXRlKGdsLkJBQ0ssIG5leHQuc3RlbmNpbEZ1bmNCYWNrLCBuZXh0LnN0ZW5jaWxSZWZCYWNrLCBuZXh0LnN0ZW5jaWxNYXNrQmFjayk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VyLnN0ZW5jaWxXcml0ZU1hc2tCYWNrICE9PSBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tCYWNrKSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxNYXNrU2VwYXJhdGUoZ2wuQkFDSywgbmV4dC5zdGVuY2lsV3JpdGVNYXNrQmFjayk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGN1ci5zdGVuY2lsRmFpbE9wQmFjayAhPT0gbmV4dC5zdGVuY2lsRmFpbE9wQmFjayB8fFxyXG4gICAgICBjdXIuc3RlbmNpbFpGYWlsT3BCYWNrICE9PSBuZXh0LnN0ZW5jaWxaRmFpbE9wQmFjayB8fFxyXG4gICAgICBjdXIuc3RlbmNpbFpQYXNzT3BCYWNrICE9PSBuZXh0LnN0ZW5jaWxaUGFzc09wQmFja1xyXG4gICAgKSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxPcFNlcGFyYXRlKGdsLkJBQ0ssIG5leHQuc3RlbmNpbEZhaWxPcEJhY2ssIG5leHQuc3RlbmNpbFpGYWlsT3BCYWNrLCBuZXh0LnN0ZW5jaWxaUGFzc09wQmFjayk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChcclxuICAgICAgY3VyLnN0ZW5jaWxGdW5jRnJvbnQgIT09IG5leHQuc3RlbmNpbEZ1bmNGcm9udCB8fFxyXG4gICAgICBjdXIuc3RlbmNpbFJlZkZyb250ICE9PSBuZXh0LnN0ZW5jaWxSZWZGcm9udCB8fFxyXG4gICAgICBjdXIuc3RlbmNpbE1hc2tGcm9udCAhPT0gbmV4dC5zdGVuY2lsTWFza0Zyb250XHJcbiAgICApIHtcclxuICAgICAgZ2wuc3RlbmNpbEZ1bmMobmV4dC5zdGVuY2lsRnVuY0Zyb250LCBuZXh0LnN0ZW5jaWxSZWZGcm9udCwgbmV4dC5zdGVuY2lsTWFza0Zyb250KTtcclxuICAgIH1cclxuICAgIGlmIChjdXIuc3RlbmNpbFdyaXRlTWFza0Zyb250ICE9PSBuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCkge1xyXG4gICAgICBnbC5zdGVuY2lsTWFzayhuZXh0LnN0ZW5jaWxXcml0ZU1hc2tGcm9udCk7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGN1ci5zdGVuY2lsRmFpbE9wRnJvbnQgIT09IG5leHQuc3RlbmNpbEZhaWxPcEZyb250IHx8XHJcbiAgICAgIGN1ci5zdGVuY2lsWkZhaWxPcEZyb250ICE9PSBuZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQgfHxcclxuICAgICAgY3VyLnN0ZW5jaWxaUGFzc09wRnJvbnQgIT09IG5leHQuc3RlbmNpbFpQYXNzT3BGcm9udFxyXG4gICAgKSB7XHJcbiAgICAgIGdsLnN0ZW5jaWxPcChuZXh0LnN0ZW5jaWxGYWlsT3BGcm9udCwgbmV4dC5zdGVuY2lsWkZhaWxPcEZyb250LCBuZXh0LnN0ZW5jaWxaUGFzc09wRnJvbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBfY29tbWl0Q3VsbE1vZGVcclxuICovXHJcbmZ1bmN0aW9uIF9jb21taXRDdWxsTW9kZShnbCwgY3VyLCBuZXh0KSB7XHJcbiAgaWYgKGN1ci5jdWxsTW9kZSA9PT0gbmV4dC5jdWxsTW9kZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKG5leHQuY3VsbE1vZGUgPT09IGVudW1zLkNVTExfTk9ORSkge1xyXG4gICAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZ2wuZW5hYmxlKGdsLkNVTExfRkFDRSk7XHJcbiAgZ2wuY3VsbEZhY2UobmV4dC5jdWxsTW9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBfY29tbWl0VmVydGV4QnVmZmVyc1xyXG4gKi9cclxuZnVuY3Rpb24gX2NvbW1pdFZlcnRleEJ1ZmZlcnMoZGV2aWNlLCBnbCwgY3VyLCBuZXh0KSB7XHJcbiAgbGV0IGF0dHJzRGlydHkgPSBmYWxzZTtcclxuXHJcbiAgLy8gbm90aGluZyBjaGFuZ2VkIGZvciB2ZXJ0ZXggYnVmZmVyXHJcbiAgaWYgKG5leHQubWF4U3RyZWFtID09PSAtMSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGN1ci5tYXhTdHJlYW0gIT09IG5leHQubWF4U3RyZWFtKSB7XHJcbiAgICBhdHRyc0RpcnR5ID0gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKGN1ci5wcm9ncmFtICE9PSBuZXh0LnByb2dyYW0pIHtcclxuICAgIGF0dHJzRGlydHkgPSB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQubWF4U3RyZWFtICsgMTsgKytpKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBjdXIudmVydGV4QnVmZmVyc1tpXSAhPT0gbmV4dC52ZXJ0ZXhCdWZmZXJzW2ldIHx8XHJcbiAgICAgICAgY3VyLnZlcnRleEJ1ZmZlck9mZnNldHNbaV0gIT09IG5leHQudmVydGV4QnVmZmVyT2Zmc2V0c1tpXVxyXG4gICAgICApIHtcclxuICAgICAgICBhdHRyc0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGF0dHJzRGlydHkpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGV2aWNlLl9jYXBzLm1heFZlcnRleEF0dHJpYnM7ICsraSkge1xyXG4gICAgICBkZXZpY2UuX25ld0F0dHJpYnV0ZXNbaV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV4dC5tYXhTdHJlYW0gKyAxOyArK2kpIHtcclxuICAgICAgbGV0IHZiID0gbmV4dC52ZXJ0ZXhCdWZmZXJzW2ldO1xyXG4gICAgICBsZXQgdmJPZmZzZXQgPSBuZXh0LnZlcnRleEJ1ZmZlck9mZnNldHNbaV07XHJcbiAgICAgIGlmICghdmIgfHwgdmIuX2dsSUQgPT09IC0xKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Yi5fZ2xJRCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5leHQucHJvZ3JhbS5fYXR0cmlidXRlcy5sZW5ndGg7ICsraikge1xyXG4gICAgICAgIGxldCBhdHRyID0gbmV4dC5wcm9ncmFtLl9hdHRyaWJ1dGVzW2pdO1xyXG5cclxuICAgICAgICBsZXQgZWwgPSB2Yi5fZm9ybWF0LmVsZW1lbnQoYXR0ci5uYW1lKTtcclxuICAgICAgICBpZiAoIWVsKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oYENhbiBub3QgZmluZCB2ZXJ0ZXggYXR0cmlidXRlOiAke2F0dHIubmFtZX1gKTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRldmljZS5fZW5hYmxlZEF0dHJpYnV0ZXNbYXR0ci5sb2NhdGlvbl0gPT09IDApIHtcclxuICAgICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHIubG9jYXRpb24pO1xyXG4gICAgICAgICAgZGV2aWNlLl9lbmFibGVkQXR0cmlidXRlc1thdHRyLmxvY2F0aW9uXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldmljZS5fbmV3QXR0cmlidXRlc1thdHRyLmxvY2F0aW9uXSA9IDE7XHJcblxyXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgICBhdHRyLmxvY2F0aW9uLFxyXG4gICAgICAgICAgZWwubnVtLFxyXG4gICAgICAgICAgZWwudHlwZSxcclxuICAgICAgICAgIGVsLm5vcm1hbGl6ZSxcclxuICAgICAgICAgIGVsLnN0cmlkZSxcclxuICAgICAgICAgIGVsLm9mZnNldCArIHZiT2Zmc2V0ICogZWwuc3RyaWRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRpc2FibGUgdW51c2VkIGF0dHJpYnV0ZXNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGV2aWNlLl9jYXBzLm1heFZlcnRleEF0dHJpYnM7ICsraSkge1xyXG4gICAgICBpZiAoZGV2aWNlLl9lbmFibGVkQXR0cmlidXRlc1tpXSAhPT0gZGV2aWNlLl9uZXdBdHRyaWJ1dGVzW2ldKSB7XHJcbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpO1xyXG4gICAgICAgIGRldmljZS5fZW5hYmxlZEF0dHJpYnV0ZXNbaV0gPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogX2NvbW1pdFRleHR1cmVzXHJcbiAqL1xyXG5mdW5jdGlvbiBfY29tbWl0VGV4dHVyZXMoZ2wsIGN1ciwgbmV4dCkge1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmV4dC5tYXhUZXh0dXJlU2xvdCArIDE7ICsraSkge1xyXG4gICAgaWYgKGN1ci50ZXh0dXJlVW5pdHNbaV0gIT09IG5leHQudGV4dHVyZVVuaXRzW2ldKSB7XHJcbiAgICAgIGxldCB0ZXh0dXJlID0gbmV4dC50ZXh0dXJlVW5pdHNbaV07XHJcbiAgICAgIGlmICh0ZXh0dXJlICYmIHRleHR1cmUuX2dsSUQgIT09IC0xKSB7XHJcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIGkpO1xyXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKHRleHR1cmUuX3RhcmdldCwgdGV4dHVyZS5fZ2xJRCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBfYXR0YWNoXHJcbiAqL1xyXG5mdW5jdGlvbiBfYXR0YWNoKGdsLCBsb2NhdGlvbiwgYXR0YWNobWVudCwgZmFjZSA9IDApIHtcclxuICBpZiAoYXR0YWNobWVudCBpbnN0YW5jZW9mIFRleHR1cmUyRCkge1xyXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXHJcbiAgICAgIGdsLkZSQU1FQlVGRkVSLFxyXG4gICAgICBsb2NhdGlvbixcclxuICAgICAgZ2wuVEVYVFVSRV8yRCxcclxuICAgICAgYXR0YWNobWVudC5fZ2xJRCxcclxuICAgICAgMFxyXG4gICAgKTtcclxuICB9IGVsc2UgaWYgKGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBUZXh0dXJlQ3ViZSkge1xyXG4gICAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoXHJcbiAgICAgIGdsLkZSQU1FQlVGRkVSLFxyXG4gICAgICBsb2NhdGlvbixcclxuICAgICAgZ2wuVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YICsgZmFjZSxcclxuICAgICAgYXR0YWNobWVudC5fZ2xJRCxcclxuICAgICAgMFxyXG4gICAgKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZ2wuZnJhbWVidWZmZXJSZW5kZXJidWZmZXIoXHJcbiAgICAgIGdsLkZSQU1FQlVGRkVSLFxyXG4gICAgICBsb2NhdGlvbixcclxuICAgICAgZ2wuUkVOREVSQlVGRkVSLFxyXG4gICAgICBhdHRhY2htZW50Ll9nbElEXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV2aWNlIHtcclxuICAvKipcclxuICAgKiBAcHJvcGVydHkgY2Fwc1xyXG4gICAqL1xyXG4gIGdldCBjYXBzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhcHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjYW52YXNFTFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY2FudmFzRUwsIG9wdHMpIHtcclxuICAgIGxldCBnbDtcclxuXHJcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnNcclxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xyXG4gICAgaWYgKG9wdHMuYWxwaGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRzLmFscGhhID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0cy5zdGVuY2lsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0cy5zdGVuY2lsID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvcHRzLmRlcHRoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgb3B0cy5kZXB0aCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0cy5hbnRpYWxpYXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRzLmFudGlhbGlhcyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gTk9URTogaXQgaXMgc2FpZCB0aGUgcGVyZm9ybWFuY2UgaW1wcm92ZWQgaW4gbW9iaWxlIGRldmljZSB3aXRoIHRoaXMgZmxhZyBvZmYuXHJcbiAgICBpZiAob3B0cy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXIgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBvcHRzLnByZXNlcnZlRHJhd2luZ0J1ZmZlciA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGdsID0gY2FudmFzRUwuZ2V0Q29udGV4dCgnd2ViZ2wnLCBvcHRzKVxyXG4gICAgICAgIHx8IGNhbnZhc0VMLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcsIG9wdHMpXHJcbiAgICAgICAgfHwgY2FudmFzRUwuZ2V0Q29udGV4dCgnd2Via2l0LTNkJywgb3B0cylcclxuICAgICAgICB8fCBjYW52YXNFTC5nZXRDb250ZXh0KCdtb3otd2ViZ2wnLCBvcHRzKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBObyBlcnJvcnMgYXJlIHRocm93biB1c2luZyB0cnkgY2F0Y2hcclxuICAgIC8vIFRlc3RlZCB0aHJvdWdoIGlvcyBiYWlkdSBicm93c2VyIDQuMTQuMVxyXG4gICAgaWYgKCFnbCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdUaGlzIGRldmljZSBkb2VzIG5vdCBzdXBwb3J0IHdlYmdsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhdGljc1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9nbCA9IGdsO1xyXG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IHt9O1xyXG4gICAgdGhpcy5fY2FwcyA9IHt9OyAvLyBjYXBhYmlsaXR5XHJcbiAgICB0aGlzLl9zdGF0cyA9IHtcclxuICAgICAgdGV4dHVyZTogMCxcclxuICAgICAgdmI6IDAsXHJcbiAgICAgIGliOiAwLFxyXG4gICAgICBkcmF3Y2FsbHM6IDAsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS9XZWJHTF9BUEkvVXNpbmdfRXh0ZW5zaW9uc1xyXG4gICAgdGhpcy5faW5pdEV4dGVuc2lvbnMoW1xyXG4gICAgICAnRVhUX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljJyxcclxuICAgICAgJ0VYVF9zaGFkZXJfdGV4dHVyZV9sb2QnLFxyXG4gICAgICAnT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJyxcclxuICAgICAgJ09FU190ZXh0dXJlX2Zsb2F0JyxcclxuICAgICAgJ09FU190ZXh0dXJlX2Zsb2F0X2xpbmVhcicsXHJcbiAgICAgICdPRVNfdGV4dHVyZV9oYWxmX2Zsb2F0JyxcclxuICAgICAgJ09FU190ZXh0dXJlX2hhbGZfZmxvYXRfbGluZWFyJyxcclxuICAgICAgJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JyxcclxuICAgICAgJ1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9hdGMnLFxyXG4gICAgICAnV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX2V0YycsXHJcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfZXRjMScsXHJcbiAgICAgICdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfcHZydGMnLFxyXG4gICAgICAnV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3MzdGMnLFxyXG4gICAgICAnV0VCR0xfZGVwdGhfdGV4dHVyZScsXHJcbiAgICAgICdXRUJHTF9kcmF3X2J1ZmZlcnMnLFxyXG4gICAgXSk7XHJcbiAgICB0aGlzLl9pbml0Q2FwcygpO1xyXG4gICAgdGhpcy5faW5pdFN0YXRlcygpO1xyXG5cclxuICAgIC8vIHJ1bnRpbWVcclxuICAgIFN0YXRlLmluaXREZWZhdWx0KHRoaXMpO1xyXG4gICAgdGhpcy5fY3VycmVudCA9IG5ldyBTdGF0ZSh0aGlzKTtcclxuICAgIHRoaXMuX25leHQgPSBuZXcgU3RhdGUodGhpcyk7XHJcbiAgICB0aGlzLl91bmlmb3JtcyA9IHt9OyAvLyBuYW1lOiB7IHZhbHVlLCBudW0sIGRpcnR5IH1cclxuICAgIHRoaXMuX3Z4ID0gdGhpcy5fdnkgPSB0aGlzLl92dyA9IHRoaXMuX3ZoID0gMDtcclxuICAgIHRoaXMuX3N4ID0gdGhpcy5fc3kgPSB0aGlzLl9zdyA9IHRoaXMuX3NoID0gMDtcclxuICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gbnVsbDtcclxuXHJcbiAgICAvL1xyXG4gICAgdGhpcy5fZW5hYmxlZEF0dHJpYnV0ZXMgPSBuZXcgQXJyYXkodGhpcy5fY2Fwcy5tYXhWZXJ0ZXhBdHRyaWJzKTtcclxuICAgIHRoaXMuX25ld0F0dHJpYnV0ZXMgPSBuZXcgQXJyYXkodGhpcy5fY2Fwcy5tYXhWZXJ0ZXhBdHRyaWJzKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NhcHMubWF4VmVydGV4QXR0cmliczsgKytpKSB7XHJcbiAgICAgIHRoaXMuX2VuYWJsZWRBdHRyaWJ1dGVzW2ldID0gMDtcclxuICAgICAgdGhpcy5fbmV3QXR0cmlidXRlc1tpXSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfaW5pdEV4dGVuc2lvbnMoZXh0ZW5zaW9ucykge1xyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuc2lvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgbGV0IG5hbWUgPSBleHRlbnNpb25zW2ldO1xyXG4gICAgICBsZXQgdmVuZG9yUHJlZml4ZXMgPSBbXCJcIiwgXCJXRUJLSVRfXCIsIFwiTU9aX1wiXTtcclxuXHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmVuZG9yUHJlZml4ZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IGV4dCA9IGdsLmdldEV4dGVuc2lvbih2ZW5kb3JQcmVmaXhlc1tqXSArIG5hbWUpO1xyXG4gICAgICAgICAgaWYgKGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLl9leHRlbnNpb25zW25hbWVdID0gZXh0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2luaXRDYXBzKCkge1xyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcclxuICAgIGNvbnN0IGV4dERyYXdCdWZmZXJzID0gdGhpcy5leHQoJ1dFQkdMX2RyYXdfYnVmZmVycycpO1xyXG5cclxuICAgIHRoaXMuX2NhcHMubWF4VmVydGV4U3RyZWFtcyA9IDQ7XHJcbiAgICB0aGlzLl9jYXBzLm1heFZlcnRleFRleHR1cmVzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUyk7XHJcbiAgICB0aGlzLl9jYXBzLm1heEZyYWdVbmlmb3JtcyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTKTtcclxuICAgIHRoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKTtcclxuICAgIHRoaXMuX2NhcHMubWF4VmVydGV4QXR0cmlicyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVkVSVEVYX0FUVFJJQlMpO1xyXG4gICAgdGhpcy5fY2Fwcy5tYXhUZXh0dXJlU2l6ZSA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVEVYVFVSRV9TSVpFKTtcclxuXHJcbiAgICB0aGlzLl9jYXBzLm1heERyYXdCdWZmZXJzID0gZXh0RHJhd0J1ZmZlcnMgPyBnbC5nZXRQYXJhbWV0ZXIoZXh0RHJhd0J1ZmZlcnMuTUFYX0RSQVdfQlVGRkVSU19XRUJHTCkgOiAxO1xyXG4gICAgdGhpcy5fY2Fwcy5tYXhDb2xvckF0dGFjaG1lbnRzID0gZXh0RHJhd0J1ZmZlcnMgPyBnbC5nZXRQYXJhbWV0ZXIoZXh0RHJhd0J1ZmZlcnMuTUFYX0NPTE9SX0FUVEFDSE1FTlRTX1dFQkdMKSA6IDE7XHJcbiAgfVxyXG5cclxuICBfaW5pdFN0YXRlcygpIHtcclxuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XHJcblxyXG4gICAgLy8gZ2wuZnJvbnRGYWNlKGdsLkNDVyk7XHJcbiAgICBnbC5kaXNhYmxlKGdsLkJMRU5EKTtcclxuICAgIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLlpFUk8pO1xyXG4gICAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERCk7XHJcbiAgICBnbC5ibGVuZENvbG9yKDEsMSwxLDEpO1xyXG5cclxuICAgIGdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKTtcclxuXHJcbiAgICBnbC5lbmFibGUoZ2wuQ1VMTF9GQUNFKTtcclxuICAgIGdsLmN1bGxGYWNlKGdsLkJBQ0spO1xyXG5cclxuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XHJcbiAgICBnbC5kZXB0aEZ1bmMoZ2wuTEVTUyk7XHJcbiAgICBnbC5kZXB0aE1hc2soZmFsc2UpO1xyXG4gICAgZ2wuZGlzYWJsZShnbC5QT0xZR09OX09GRlNFVF9GSUxMKTtcclxuICAgIGdsLmRlcHRoUmFuZ2UoMCwxKTtcclxuXHJcbiAgICBnbC5kaXNhYmxlKGdsLlNURU5DSUxfVEVTVCk7XHJcbiAgICBnbC5zdGVuY2lsRnVuYyhnbC5BTFdBWVMsIDAsIDB4RkYpO1xyXG4gICAgZ2wuc3RlbmNpbE1hc2soMHhGRik7XHJcbiAgICBnbC5zdGVuY2lsT3AoZ2wuS0VFUCwgZ2wuS0VFUCwgZ2wuS0VFUCk7XHJcblxyXG4gICAgLy8gVE9ETzpcclxuICAgIC8vIHRoaXMuc2V0QWxwaGFUb0NvdmVyYWdlKGZhbHNlKTtcclxuICAgIC8vIHRoaXMuc2V0VHJhbnNmb3JtRmVlZGJhY2tCdWZmZXIobnVsbCk7XHJcbiAgICAvLyB0aGlzLnNldFJhc3Rlcih0cnVlKTtcclxuICAgIC8vIHRoaXMuc2V0RGVwdGhCaWFzKGZhbHNlKTtcclxuXHJcbiAgICBnbC5jbGVhckRlcHRoKDEpO1xyXG4gICAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKTtcclxuICAgIGdsLmNsZWFyU3RlbmNpbCgwKTtcclxuXHJcbiAgICBnbC5kaXNhYmxlKGdsLlNDSVNTT1JfVEVTVCk7XHJcbiAgfVxyXG5cclxuICBfcmVzdG9yZVRleHR1cmUodW5pdCkge1xyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcclxuXHJcbiAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX2N1cnJlbnQudGV4dHVyZVVuaXRzW3VuaXRdO1xyXG4gICAgaWYgKHRleHR1cmUgJiYgdGV4dHVyZS5fZ2xJRCAhPT0gLTEpIHtcclxuICAgICAgZ2wuYmluZFRleHR1cmUodGV4dHVyZS5fdGFyZ2V0LCB0ZXh0dXJlLl9nbElEKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Jlc3RvcmVJbmRleEJ1ZmZlciAoKSB7XHJcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xyXG5cclxuICAgIGxldCBpYiA9IHRoaXMuX2N1cnJlbnQuaW5kZXhCdWZmZXI7XHJcbiAgICBpZiAoaWIgJiYgaWIuX2dsSUQgIT09IC0xKSB7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGliLl9nbElEKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZXh0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgKi9cclxuICBleHQobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbnNbbmFtZV07XHJcbiAgfVxyXG5cclxuICBhbGxvd0Zsb2F0VGV4dHVyZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmV4dChcIk9FU190ZXh0dXJlX2Zsb2F0XCIpICE9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gSW1tZWRpYXRlIFNldHRpbmdzXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEZyYW1lQnVmZmVyXHJcbiAgICogQHBhcmFtIHtGcmFtZUJ1ZmZlcn0gZmIgLSBudWxsIG1lYW5zIHVzZSB0aGUgYmFja2J1ZmZlclxyXG4gICAqL1xyXG4gIHNldEZyYW1lQnVmZmVyKGZiKSB7XHJcbiAgICBpZiAodGhpcy5fZnJhbWVidWZmZXIgPT09IGZiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IGZiO1xyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcclxuXHJcbiAgICBpZiAoIWZiKSB7XHJcbiAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGZiLl9nbElEKTtcclxuXHJcbiAgICBsZXQgbnVtQ29sb3JzID0gZmIuX2NvbG9ycy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNvbG9yczsgKytpKSB7XHJcbiAgICAgIGxldCBjb2xvckJ1ZmZlciA9IGZiLl9jb2xvcnNbaV07XHJcbiAgICAgIF9hdHRhY2goZ2wsIGdsLkNPTE9SX0FUVEFDSE1FTlQwICsgaSwgY29sb3JCdWZmZXIpO1xyXG5cclxuICAgICAgLy8gVE9ETzogd2hhdCBhYm91dCBjdWJlbWFwIGZhY2U/Pz8gc2hvdWxkIGJlIHRoZSB0YXJnZXQgcGFyYW1ldGVyIGZvciBjb2xvckJ1ZmZlclxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IG51bUNvbG9yczsgaSA8IHRoaXMuX2NhcHMubWF4Q29sb3JBdHRhY2htZW50czsgKytpKSB7XHJcbiAgICAgIGdsLmZyYW1lYnVmZmVyVGV4dHVyZTJEKFxyXG4gICAgICAgIGdsLkZSQU1FQlVGRkVSLFxyXG4gICAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwICsgaSxcclxuICAgICAgICBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgIG51bGwsXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmYi5fZGVwdGgpIHtcclxuICAgICAgX2F0dGFjaChnbCwgZ2wuREVQVEhfQVRUQUNITUVOVCwgZmIuX2RlcHRoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmIuX3N0ZW5jaWwpIHtcclxuICAgICAgX2F0dGFjaChnbCwgZ2wuU1RFTkNJTF9BVFRBQ0hNRU5ULCBmYi5fc3RlbmNpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZiLl9kZXB0aFN0ZW5jaWwpIHtcclxuICAgICAgX2F0dGFjaChnbCwgZ2wuREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5ULCBmYi5fZGVwdGhTdGVuY2lsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0Vmlld3BvcnRcclxuICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdcclxuICAgKiBAcGFyYW0ge051bWJlcn0gaFxyXG4gICAqL1xyXG4gIHNldFZpZXdwb3J0KHgsIHksIHcsIGgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5fdnggIT09IHggfHxcclxuICAgICAgdGhpcy5fdnkgIT09IHkgfHxcclxuICAgICAgdGhpcy5fdncgIT09IHcgfHxcclxuICAgICAgdGhpcy5fdmggIT09IGhcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9nbC52aWV3cG9ydCh4LCB5LCB3LCBoKTtcclxuICAgICAgdGhpcy5fdnggPSB4O1xyXG4gICAgICB0aGlzLl92eSA9IHk7XHJcbiAgICAgIHRoaXMuX3Z3ID0gdztcclxuICAgICAgdGhpcy5fdmggPSBoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRTY2lzc29yXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICAgKiBAcGFyYW0ge051bWJlcn0geVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGhcclxuICAgKi9cclxuICBzZXRTY2lzc29yKHgsIHksIHcsIGgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5fc3ggIT09IHggfHxcclxuICAgICAgdGhpcy5fc3kgIT09IHkgfHxcclxuICAgICAgdGhpcy5fc3cgIT09IHcgfHxcclxuICAgICAgdGhpcy5fc2ggIT09IGhcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9nbC5zY2lzc29yKHgsIHksIHcsIGgpO1xyXG4gICAgICB0aGlzLl9zeCA9IHg7XHJcbiAgICAgIHRoaXMuX3N5ID0geTtcclxuICAgICAgdGhpcy5fc3cgPSB3O1xyXG4gICAgICB0aGlzLl9zaCA9IGg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGNsZWFyXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRzLmNvbG9yXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuZGVwdGhcclxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zdGVuY2lsXHJcbiAgICovXHJcbiAgY2xlYXIob3B0cykge1xyXG4gICAgaWYgKG9wdHMuY29sb3IgPT09IHVuZGVmaW5lZCAmJiBvcHRzLmRlcHRoID09PSB1bmRlZmluZWQgJiYgb3B0cy5zdGVuY2lsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xyXG4gICAgbGV0IGZsYWdzID0gMDtcclxuXHJcbiAgICBpZiAob3B0cy5jb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZsYWdzIHw9IGdsLkNPTE9SX0JVRkZFUl9CSVQ7XHJcbiAgICAgIGdsLmNsZWFyQ29sb3Iob3B0cy5jb2xvclswXSwgb3B0cy5jb2xvclsxXSwgb3B0cy5jb2xvclsyXSwgb3B0cy5jb2xvclszXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wdHMuZGVwdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmbGFncyB8PSBnbC5ERVBUSF9CVUZGRVJfQklUO1xyXG4gICAgICBnbC5jbGVhckRlcHRoKG9wdHMuZGVwdGgpO1xyXG5cclxuICAgICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICBnbC5kZXB0aE1hc2sodHJ1ZSk7XHJcbiAgICAgIGdsLmRlcHRoRnVuYyhnbC5BTFdBWVMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRzLnN0ZW5jaWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmbGFncyB8PSBnbC5TVEVOQ0lMX0JVRkZFUl9CSVQ7XHJcbiAgICAgIGdsLmNsZWFyU3RlbmNpbChvcHRzLnN0ZW5jaWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGdsLmNsZWFyKGZsYWdzKTtcclxuXHJcbiAgICAvLyByZXN0b3JlIGRlcHRoLXdyaXRlXHJcbiAgICBpZiAob3B0cy5kZXB0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGlmICh0aGlzLl9jdXJyZW50LmRlcHRoVGVzdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50LmRlcHRoV3JpdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBnbC5kZXB0aE1hc2soZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudC5kZXB0aEZ1bmMgIT09IGVudW1zLkRTX0ZVTkNfQUxXQVlTKSB7XHJcbiAgICAgICAgICBnbC5kZXB0aEZ1bmModGhpcy5fY3VycmVudC5kZXB0aEZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIERlZmVycmVkIFN0YXRlc1xyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBlbmFibGVCbGVuZFxyXG4gICAqL1xyXG4gIGVuYWJsZUJsZW5kKCkge1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGVuYWJsZURlcHRoVGVzdFxyXG4gICAqL1xyXG4gIGVuYWJsZURlcHRoVGVzdCgpIHtcclxuICAgIHRoaXMuX25leHQuZGVwdGhUZXN0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZW5hYmxlRGVwdGhXcml0ZVxyXG4gICAqL1xyXG4gIGVuYWJsZURlcHRoV3JpdGUoKSB7XHJcbiAgICB0aGlzLl9uZXh0LmRlcHRoV3JpdGUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBlbmFibGVTdGVuY2lsVGVzdFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGVuY2lsVGVzdFxyXG4gICAqL1xyXG4gIHNldFN0ZW5jaWxUZXN0KHN0ZW5jaWxUZXN0KSB7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxUZXN0ID0gc3RlbmNpbFRlc3Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxGdW5jXHJcbiAgICogQHBhcmFtIHtEU19GVU5DXyp9IGZ1bmNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gcmVmXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1hc2tcclxuICAgKi9cclxuICBzZXRTdGVuY2lsRnVuYyhmdW5jLCByZWYsIG1hc2spIHtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbFNlcCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsRnVuY0Zyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsRnVuY0JhY2sgPSBmdW5jO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsUmVmRnJvbnQgPSB0aGlzLl9uZXh0LnN0ZW5jaWxSZWZCYWNrID0gcmVmO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsTWFza0Zyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsTWFza0JhY2sgPSBtYXNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRTdGVuY2lsRnVuY0Zyb250XHJcbiAgICogQHBhcmFtIHtEU19GVU5DXyp9IGZ1bmNcclxuICAgKiBAcGFyYW0ge051bWJlcn0gcmVmXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1hc2tcclxuICAgKi9cclxuICBzZXRTdGVuY2lsRnVuY0Zyb250KGZ1bmMsIHJlZiwgbWFzaykge1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsU2VwID0gdHJ1ZTtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbEZ1bmNGcm9udCA9IGZ1bmM7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxSZWZGcm9udCA9IHJlZjtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbE1hc2tGcm9udCA9IG1hc2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxGdW5jQmFja1xyXG4gICAqIEBwYXJhbSB7RFNfRlVOQ18qfSBmdW5jXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJlZlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXNrXHJcbiAgICovXHJcbiAgc2V0U3RlbmNpbEZ1bmNCYWNrKGZ1bmMsIHJlZiwgbWFzaykge1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsU2VwID0gdHJ1ZTtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbEZ1bmNCYWNrID0gZnVuYztcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbFJlZkJhY2sgPSByZWY7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxNYXNrQmFjayA9IG1hc2s7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldFN0ZW5jaWxPcFxyXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSBmYWlsT3BcclxuICAgKiBAcGFyYW0ge1NURU5DSUxfT1BfKn0gekZhaWxPcFxyXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSB6UGFzc09wXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdyaXRlTWFza1xyXG4gICAqL1xyXG4gIHNldFN0ZW5jaWxPcChmYWlsT3AsIHpGYWlsT3AsIHpQYXNzT3AsIHdyaXRlTWFzaykge1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQgPSB0aGlzLl9uZXh0LnN0ZW5jaWxGYWlsT3BCYWNrID0gZmFpbE9wO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsWkZhaWxPcEZyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsWkZhaWxPcEJhY2sgPSB6RmFpbE9wO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250ID0gdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEJhY2sgPSB6UGFzc09wO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsV3JpdGVNYXNrRnJvbnQgPSB0aGlzLl9uZXh0LnN0ZW5jaWxXcml0ZU1hc2tCYWNrID0gd3JpdGVNYXNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRTdGVuY2lsT3BGcm9udFxyXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSBmYWlsT3BcclxuICAgKiBAcGFyYW0ge1NURU5DSUxfT1BfKn0gekZhaWxPcFxyXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSB6UGFzc09wXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdyaXRlTWFza1xyXG4gICAqL1xyXG4gIHNldFN0ZW5jaWxPcEZyb250KGZhaWxPcCwgekZhaWxPcCwgelBhc3NPcCwgd3JpdGVNYXNrKSB7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxTZXAgPSB0cnVlO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsRmFpbE9wRnJvbnQgPSBmYWlsT3A7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxaRmFpbE9wRnJvbnQgPSB6RmFpbE9wO1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsWlBhc3NPcEZyb250ID0gelBhc3NPcDtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbFdyaXRlTWFza0Zyb250ID0gd3JpdGVNYXNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRTdGVuY2lsT3BCYWNrXHJcbiAgICogQHBhcmFtIHtTVEVOQ0lMX09QXyp9IGZhaWxPcFxyXG4gICAqIEBwYXJhbSB7U1RFTkNJTF9PUF8qfSB6RmFpbE9wXHJcbiAgICogQHBhcmFtIHtTVEVOQ0lMX09QXyp9IHpQYXNzT3BcclxuICAgKiBAcGFyYW0ge051bWJlcn0gd3JpdGVNYXNrXHJcbiAgICovXHJcbiAgc2V0U3RlbmNpbE9wQmFjayhmYWlsT3AsIHpGYWlsT3AsIHpQYXNzT3AsIHdyaXRlTWFzaykge1xyXG4gICAgdGhpcy5fbmV4dC5zdGVuY2lsU2VwID0gdHJ1ZTtcclxuICAgIHRoaXMuX25leHQuc3RlbmNpbEZhaWxPcEJhY2sgPSBmYWlsT3A7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxaRmFpbE9wQmFjayA9IHpGYWlsT3A7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxaUGFzc09wQmFjayA9IHpQYXNzT3A7XHJcbiAgICB0aGlzLl9uZXh0LnN0ZW5jaWxXcml0ZU1hc2tCYWNrID0gd3JpdGVNYXNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXREZXB0aEZ1bmNcclxuICAgKiBAcGFyYW0ge0RTX0ZVTkNfKn0gZGVwdGhGdW5jXHJcbiAgICovXHJcbiAgc2V0RGVwdGhGdW5jKGRlcHRoRnVuYykge1xyXG4gICAgdGhpcy5fbmV4dC5kZXB0aEZ1bmMgPSBkZXB0aEZ1bmM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEJsZW5kQ29sb3IzMlxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByZ2JhXHJcbiAgICovXHJcbiAgc2V0QmxlbmRDb2xvcjMyKHJnYmEpIHtcclxuICAgIHRoaXMuX25leHQuYmxlbmRDb2xvciA9IHJnYmE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEJsZW5kQ29sb3JcclxuICAgKiBAcGFyYW0ge051bWJlcn0gclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBnXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJcclxuICAgKiBAcGFyYW0ge051bWJlcn0gYVxyXG4gICAqL1xyXG4gIHNldEJsZW5kQ29sb3IociwgZywgYiwgYSkge1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZENvbG9yID0gKChyICogMjU1KSA8PCAyNCB8IChnICogMjU1KSA8PCAxNiB8IChiICogMjU1KSA8PCA4IHwgYSAqIDI1NSkgPj4+IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEJsZW5kRnVuY1xyXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gc3JjXHJcbiAgICogQHBhcmFtIHtCRUxORF8qfSBkc3RcclxuICAgKi9cclxuICBzZXRCbGVuZEZ1bmMoc3JjLCBkc3QpIHtcclxuICAgIHRoaXMuX25leHQuYmxlbmRTZXAgPSBmYWxzZTtcclxuICAgIHRoaXMuX25leHQuYmxlbmRTcmMgPSBzcmM7XHJcbiAgICB0aGlzLl9uZXh0LmJsZW5kRHN0ID0gZHN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRCbGVuZEZ1bmNTZXBcclxuICAgKiBAcGFyYW0ge0JFTE5EXyp9IHNyY1xyXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gZHN0XHJcbiAgICogQHBhcmFtIHtCRUxORF8qfSBzcmNBbHBoYVxyXG4gICAqIEBwYXJhbSB7QkVMTkRfKn0gZHN0QWxwaGFcclxuICAgKi9cclxuICBzZXRCbGVuZEZ1bmNTZXAoc3JjLCBkc3QsIHNyY0FscGhhLCBkc3RBbHBoYSkge1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZFNlcCA9IHRydWU7XHJcbiAgICB0aGlzLl9uZXh0LmJsZW5kU3JjID0gc3JjO1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZERzdCA9IGRzdDtcclxuICAgIHRoaXMuX25leHQuYmxlbmRTcmNBbHBoYSA9IHNyY0FscGhhO1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZERzdEFscGhhID0gZHN0QWxwaGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEJsZW5kRXFcclxuICAgKiBAcGFyYW0ge0JFTE5EX0ZVTkNfKn0gZXFcclxuICAgKi9cclxuICBzZXRCbGVuZEVxKGVxKSB7XHJcbiAgICB0aGlzLl9uZXh0LmJsZW5kU2VwID0gZmFsc2U7XHJcbiAgICB0aGlzLl9uZXh0LmJsZW5kRXEgPSBlcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0QmxlbmRFcVNlcFxyXG4gICAqIEBwYXJhbSB7QkVMTkRfRlVOQ18qfSBlcVxyXG4gICAqIEBwYXJhbSB7QkVMTkRfRlVOQ18qfSBhbHBoYUVxXHJcbiAgICovXHJcbiAgc2V0QmxlbmRFcVNlcChlcSwgYWxwaGFFcSkge1xyXG4gICAgdGhpcy5fbmV4dC5ibGVuZFNlcCA9IHRydWU7XHJcbiAgICB0aGlzLl9uZXh0LmJsZW5kRXEgPSBlcTtcclxuICAgIHRoaXMuX25leHQuYmxlbmRBbHBoYUVxID0gYWxwaGFFcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0Q3VsbE1vZGVcclxuICAgKiBAcGFyYW0ge0NVTExfKn0gbW9kZVxyXG4gICAqL1xyXG4gIHNldEN1bGxNb2RlKG1vZGUpIHtcclxuICAgIHRoaXMuX25leHQuY3VsbE1vZGUgPSBtb2RlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRWZXJ0ZXhCdWZmZXJcclxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RyZWFtXHJcbiAgICogQHBhcmFtIHtWZXJ0ZXhCdWZmZXJ9IGJ1ZmZlclxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCAtIHN0YXJ0IHZlcnRleFxyXG4gICAqL1xyXG4gIHNldFZlcnRleEJ1ZmZlcihzdHJlYW0sIGJ1ZmZlciwgc3RhcnQgPSAwKSB7XHJcbiAgICB0aGlzLl9uZXh0LnZlcnRleEJ1ZmZlcnNbc3RyZWFtXSA9IGJ1ZmZlcjtcclxuICAgIHRoaXMuX25leHQudmVydGV4QnVmZmVyT2Zmc2V0c1tzdHJlYW1dID0gc3RhcnQ7XHJcbiAgICBpZiAodGhpcy5fbmV4dC5tYXhTdHJlYW0gPCBzdHJlYW0pIHtcclxuICAgICAgdGhpcy5fbmV4dC5tYXhTdHJlYW0gPSBzdHJlYW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldEluZGV4QnVmZmVyXHJcbiAgICogQHBhcmFtIHtJbmRleEJ1ZmZlcn0gYnVmZmVyXHJcbiAgICovXHJcbiAgc2V0SW5kZXhCdWZmZXIoYnVmZmVyKSB7XHJcbiAgICB0aGlzLl9uZXh0LmluZGV4QnVmZmVyID0gYnVmZmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRQcm9ncmFtXHJcbiAgICogQHBhcmFtIHtQcm9ncmFtfSBwcm9ncmFtXHJcbiAgICovXHJcbiAgc2V0UHJvZ3JhbShwcm9ncmFtKSB7XHJcbiAgICB0aGlzLl9uZXh0LnByb2dyYW0gPSBwcm9ncmFtO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRUZXh0dXJlXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgKiBAcGFyYW0ge1RleHR1cmV9IHRleHR1cmVcclxuICAgKiBAcGFyYW0ge051bWJlcn0gc2xvdFxyXG4gICAqL1xyXG4gIHNldFRleHR1cmUobmFtZSwgdGV4dHVyZSwgc2xvdCkge1xyXG4gICAgaWYgKHNsb3QgPj0gdGhpcy5fY2Fwcy5tYXhUZXh0dXJlVW5pdHMpIHtcclxuICAgICAgY29uc29sZS53YXJuKGBDYW4gbm90IHNldCB0ZXh0dXJlICR7bmFtZX0gYXQgc3RhZ2UgJHtzbG90fSwgbWF4IHRleHR1cmUgZXhjZWVkOiAke3RoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzfWApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbmV4dC50ZXh0dXJlVW5pdHNbc2xvdF0gPSB0ZXh0dXJlO1xyXG4gICAgdGhpcy5zZXRVbmlmb3JtKG5hbWUsIHNsb3QpO1xyXG5cclxuICAgIGlmICh0aGlzLl9uZXh0Lm1heFRleHR1cmVTbG90IDwgc2xvdCkge1xyXG4gICAgICB0aGlzLl9uZXh0Lm1heFRleHR1cmVTbG90ID0gc2xvdDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0VGV4dHVyZUFycmF5XHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgKiBAcGFyYW0ge0FycmF5fSB0ZXh0dXJlc1xyXG4gICAqIEBwYXJhbSB7SW50MzJBcnJheX0gc2xvdHNcclxuICAgKi9cclxuICBzZXRUZXh0dXJlQXJyYXkobmFtZSwgdGV4dHVyZXMsIHNsb3RzKSB7XHJcbiAgICBsZXQgbGVuID0gdGV4dHVyZXMubGVuZ3RoO1xyXG4gICAgaWYgKGxlbiA+PSB0aGlzLl9jYXBzLm1heFRleHR1cmVVbml0cykge1xyXG4gICAgICBjb25zb2xlLndhcm4oYENhbiBub3Qgc2V0ICR7bGVufSB0ZXh0dXJlcyBmb3IgJHtuYW1lfSwgbWF4IHRleHR1cmUgZXhjZWVkOiAke3RoaXMuX2NhcHMubWF4VGV4dHVyZVVuaXRzfWApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGxldCBzbG90ID0gc2xvdHNbaV07XHJcbiAgICAgIHRoaXMuX25leHQudGV4dHVyZVVuaXRzW3Nsb3RdID0gdGV4dHVyZXNbaV07XHJcblxyXG4gICAgICBpZiAodGhpcy5fbmV4dC5tYXhUZXh0dXJlU2xvdCA8IHNsb3QpIHtcclxuICAgICAgICB0aGlzLl9uZXh0Lm1heFRleHR1cmVTbG90ID0gc2xvdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRVbmlmb3JtKG5hbWUsIHNsb3RzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0VW5pZm9ybVxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gICAqL1xyXG4gIHNldFVuaWZvcm0obmFtZSwgdmFsdWUpIHtcclxuICAgIGxldCB1bmlmb3JtID0gdGhpcy5fdW5pZm9ybXNbbmFtZV07XHJcblxyXG4gICAgbGV0IHNhbWVUeXBlID0gZmFsc2U7XHJcbiAgICBsZXQgaXNBcnJheSA9IGZhbHNlLCBpc0Zsb2F0MzJBcnJheSA9IGZhbHNlLCBpc0ludDMyQXJyYXkgPSBmYWxzZTtcclxuICAgIGRvIHtcclxuICAgICAgaWYgKCF1bmlmb3JtKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlzRmxvYXQzMkFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXk7XHJcbiAgICAgIGlzSW50MzJBcnJheSA9IHZhbHVlIGluc3RhbmNlb2YgSW50MzJBcnJheTtcclxuICAgICAgaXNBcnJheSA9IGlzRmxvYXQzMkFycmF5IHx8IGlzSW50MzJBcnJheTtcclxuICAgICAgaWYgKHVuaWZvcm0uaXNBcnJheSAhPT0gaXNBcnJheSkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodW5pZm9ybS5pc0FycmF5ICYmIHVuaWZvcm0udmFsdWUubGVuZ3RoICE9PSB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgc2FtZVR5cGUgPSB0cnVlO1xyXG4gICAgfSB3aGlsZSAoZmFsc2UpO1xyXG5cclxuICAgIGlmICghc2FtZVR5cGUpIHtcclxuICAgICAgbGV0IG5ld1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgIGlmIChpc0Zsb2F0MzJBcnJheSkge1xyXG4gICAgICAgIG5ld1ZhbHVlID0gbmV3IEZsb2F0MzJBcnJheSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoaXNJbnQzMkFycmF5KSB7XHJcbiAgICAgICAgbmV3VmFsdWUgPSBuZXcgSW50MzJBcnJheSh2YWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVuaWZvcm0gPSB7XHJcbiAgICAgICAgZGlydHk6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICAgIGlzQXJyYXk6IGlzQXJyYXlcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBvbGRWYWx1ZSA9IHVuaWZvcm0udmFsdWU7XHJcbiAgICAgIGxldCBkaXJ0eSA9IGZhbHNlO1xyXG4gICAgICBpZiAodW5pZm9ybS5pc0FycmF5KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvbGRWYWx1ZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgIGlmIChvbGRWYWx1ZVtpXSAhPT0gdmFsdWVbaV0pIHtcclxuICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBvbGRWYWx1ZVtpXSA9IHZhbHVlW2ldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICBkaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICB1bmlmb3JtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGlydHkpIHtcclxuICAgICAgICB1bmlmb3JtLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fdW5pZm9ybXNbbmFtZV0gPSB1bmlmb3JtO1xyXG4gIH1cclxuXHJcbiAgc2V0VW5pZm9ybURpcmVjdGx5KG5hbWUsIHZhbHVlKSB7XHJcbiAgICBsZXQgdW5pZm9ybSA9IHRoaXMuX3VuaWZvcm1zW25hbWVdO1xyXG4gICAgaWYgKCF1bmlmb3JtKSB7XHJcbiAgICAgIHRoaXMuX3VuaWZvcm1zW25hbWVdID0gdW5pZm9ybSA9IHt9O1xyXG4gICAgfVxyXG4gICAgdW5pZm9ybS5kaXJ0eSA9IHRydWU7XHJcbiAgICB1bmlmb3JtLnZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldFByaW1pdGl2ZVR5cGVcclxuICAgKiBAcGFyYW0ge1BUXyp9IHR5cGVcclxuICAgKi9cclxuICBzZXRQcmltaXRpdmVUeXBlKHR5cGUpIHtcclxuICAgIHRoaXMuX25leHQucHJpbWl0aXZlVHlwZSA9IHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHJlc2V0RHJhd0NhbGxzXHJcbiAgICovXHJcbiAgcmVzZXREcmF3Q2FsbHMgKCkge1xyXG4gICAgdGhpcy5fc3RhdHMuZHJhd2NhbGxzID0gMDtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBnZXREcmF3Q2FsbHNcclxuICAgKi9cclxuICBnZXREcmF3Q2FsbHMgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRzLmRyYXdjYWxscztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZHJhd1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiYXNlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XHJcbiAgICovXHJcbiAgZHJhdyhiYXNlLCBjb3VudCkge1xyXG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcclxuICAgIGxldCBjdXIgPSB0aGlzLl9jdXJyZW50O1xyXG4gICAgbGV0IG5leHQgPSB0aGlzLl9uZXh0O1xyXG5cclxuICAgIC8vIGNvbW1pdCBibGVuZFxyXG4gICAgX2NvbW1pdEJsZW5kU3RhdGVzKGdsLCBjdXIsIG5leHQpO1xyXG5cclxuICAgIC8vIGNvbW1pdCBkZXB0aFxyXG4gICAgX2NvbW1pdERlcHRoU3RhdGVzKGdsLCBjdXIsIG5leHQpO1xyXG5cclxuICAgIC8vIGNvbW1pdCBzdGVuY2lsXHJcbiAgICBfY29tbWl0U3RlbmNpbFN0YXRlcyhnbCwgY3VyLCBuZXh0KTtcclxuXHJcbiAgICAvLyBjb21taXQgY3VsbFxyXG4gICAgX2NvbW1pdEN1bGxNb2RlKGdsLCBjdXIsIG5leHQpO1xyXG5cclxuICAgIC8vIGNvbW1pdCB2ZXJ0ZXgtYnVmZmVyXHJcbiAgICBfY29tbWl0VmVydGV4QnVmZmVycyh0aGlzLCBnbCwgY3VyLCBuZXh0KTtcclxuXHJcbiAgICAvLyBjb21taXQgaW5kZXgtYnVmZmVyXHJcbiAgICBpZiAoY3VyLmluZGV4QnVmZmVyICE9PSBuZXh0LmluZGV4QnVmZmVyKSB7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5leHQuaW5kZXhCdWZmZXIgJiYgbmV4dC5pbmRleEJ1ZmZlci5fZ2xJRCAhPT0gLTEgPyBuZXh0LmluZGV4QnVmZmVyLl9nbElEIDogbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tbWl0IHByb2dyYW1cclxuICAgIGxldCBwcm9ncmFtRGlydHkgPSBmYWxzZTtcclxuICAgIGlmIChjdXIucHJvZ3JhbSAhPT0gbmV4dC5wcm9ncmFtKSB7XHJcbiAgICAgIGlmIChuZXh0LnByb2dyYW0uX2xpbmtlZCkge1xyXG4gICAgICAgIGdsLnVzZVByb2dyYW0obmV4dC5wcm9ncmFtLl9nbElEKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byB1c2UgcHJvZ3JhbTogaGFzIG5vdCBsaW5rZWQgeWV0LicpO1xyXG4gICAgICB9XHJcbiAgICAgIHByb2dyYW1EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29tbWl0IHRleHR1cmUvc2FtcGxlclxyXG4gICAgX2NvbW1pdFRleHR1cmVzKGdsLCBjdXIsIG5leHQpO1xyXG5cclxuICAgIC8vIGNvbW1pdCB1bmlmb3Jtc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0LnByb2dyYW0uX3VuaWZvcm1zLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGxldCB1bmlmb3JtSW5mbyA9IG5leHQucHJvZ3JhbS5fdW5pZm9ybXNbaV07XHJcbiAgICAgIGxldCB1bmlmb3JtID0gdGhpcy5fdW5pZm9ybXNbdW5pZm9ybUluZm8ubmFtZV07XHJcbiAgICAgIGlmICghdW5pZm9ybSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybihgQ2FuIG5vdCBmaW5kIHVuaWZvcm0gJHt1bmlmb3JtSW5mby5uYW1lfWApO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXByb2dyYW1EaXJ0eSAmJiAhdW5pZm9ybS5kaXJ0eSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB1bmlmb3JtLmRpcnR5ID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBUT0RPOiBwbGVhc2UgY29uc2lkZXIgYXJyYXkgdW5pZm9ybTogdW5pZm9ybUluZm8uc2l6ZSA+IDBcclxuXHJcbiAgICAgIGxldCBjb21taXRGdW5jID0gKHVuaWZvcm1JbmZvLnNpemUgPT09IHVuZGVmaW5lZCkgPyBfdHlwZTJ1bmlmb3JtQ29tbWl0W3VuaWZvcm1JbmZvLnR5cGVdIDogX3R5cGUydW5pZm9ybUFycmF5Q29tbWl0W3VuaWZvcm1JbmZvLnR5cGVdO1xyXG4gICAgICBpZiAoIWNvbW1pdEZ1bmMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYENhbiBub3QgZmluZCBjb21taXQgZnVuY3Rpb24gZm9yIHVuaWZvcm0gJHt1bmlmb3JtSW5mby5uYW1lfWApO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb21taXRGdW5jKGdsLCB1bmlmb3JtSW5mby5sb2NhdGlvbiwgdW5pZm9ybS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvdW50KSB7XHJcbiAgICAgIC8vIGRyYXdQcmltaXRpdmVzXHJcbiAgICAgIGlmIChuZXh0LmluZGV4QnVmZmVyKSB7XHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKFxyXG4gICAgICAgICAgdGhpcy5fbmV4dC5wcmltaXRpdmVUeXBlLFxyXG4gICAgICAgICAgY291bnQsXHJcbiAgICAgICAgICBuZXh0LmluZGV4QnVmZmVyLl9mb3JtYXQsXHJcbiAgICAgICAgICBiYXNlICogbmV4dC5pbmRleEJ1ZmZlci5fYnl0ZXNQZXJJbmRleFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhcclxuICAgICAgICAgIHRoaXMuX25leHQucHJpbWl0aXZlVHlwZSxcclxuICAgICAgICAgIGJhc2UsXHJcbiAgICAgICAgICBjb3VudFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwZGF0ZSBzdGF0c1xyXG4gICAgICB0aGlzLl9zdGF0cy5kcmF3Y2FsbHMrKztcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBhdXRvZ2VuIG1pcG1hcCBmb3IgY29sb3IgYnVmZmVyXHJcbiAgICAvLyBpZiAodGhpcy5fZnJhbWVidWZmZXIgJiYgdGhpcy5fZnJhbWVidWZmZXIuY29sb3JzWzBdLm1pcG1hcCkge1xyXG4gICAgLy8gICBnbC5iaW5kVGV4dHVyZSh0aGlzLl9mcmFtZWJ1ZmZlci5jb2xvcnNbaV0uX3RhcmdldCwgY29sb3JzW2ldLl9nbElEKTtcclxuICAgIC8vICAgZ2wuZ2VuZXJhdGVNaXBtYXAodGhpcy5fZnJhbWVidWZmZXIuY29sb3JzW2ldLl90YXJnZXQpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHJlc2V0IHN0YXRlc1xyXG4gICAgY3VyLnNldChuZXh0KTtcclxuICAgIG5leHQucmVzZXQoKTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==