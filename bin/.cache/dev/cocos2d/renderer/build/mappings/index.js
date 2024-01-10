
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/build/mappings/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';
/**
 * enums
 */

var enums = {
  // buffer usage
  USAGE_STATIC: 35044,
  // gl.STATIC_DRAW
  USAGE_DYNAMIC: 35048,
  // gl.DYNAMIC_DRAW
  USAGE_STREAM: 35040,
  // gl.STREAM_DRAW
  // index buffer format
  INDEX_FMT_UINT8: 5121,
  // gl.UNSIGNED_BYTE
  INDEX_FMT_UINT16: 5123,
  // gl.UNSIGNED_SHORT
  INDEX_FMT_UINT32: 5125,
  // gl.UNSIGNED_INT (OES_element_index_uint)
  // vertex attribute semantic
  ATTR_POSITION: 'a_position',
  ATTR_NORMAL: 'a_normal',
  ATTR_TANGENT: 'a_tangent',
  ATTR_BITANGENT: 'a_bitangent',
  ATTR_WEIGHTS: 'a_weights',
  ATTR_JOINTS: 'a_joints',
  ATTR_COLOR: 'a_color',
  ATTR_COLOR0: 'a_color0',
  ATTR_COLOR1: 'a_color1',
  ATTR_UV: 'a_uv',
  ATTR_UV0: 'a_uv0',
  ATTR_UV1: 'a_uv1',
  ATTR_UV2: 'a_uv2',
  ATTR_UV3: 'a_uv3',
  ATTR_UV4: 'a_uv4',
  ATTR_UV5: 'a_uv5',
  ATTR_UV6: 'a_uv6',
  ATTR_UV7: 'a_uv7',
  // vertex attribute type
  ATTR_TYPE_INT8: 5120,
  // gl.BYTE
  ATTR_TYPE_UINT8: 5121,
  // gl.UNSIGNED_BYTE
  ATTR_TYPE_INT16: 5122,
  // gl.SHORT
  ATTR_TYPE_UINT16: 5123,
  // gl.UNSIGNED_SHORT
  ATTR_TYPE_INT32: 5124,
  // gl.INT
  ATTR_TYPE_UINT32: 5125,
  // gl.UNSIGNED_INT
  ATTR_TYPE_FLOAT32: 5126,
  // gl.FLOAT
  // texture filter
  FILTER_NEAREST: 0,
  FILTER_LINEAR: 1,
  // texture wrap mode
  WRAP_REPEAT: 10497,
  // gl.REPEAT
  WRAP_CLAMP: 33071,
  // gl.CLAMP_TO_EDGE
  WRAP_MIRROR: 33648,
  // gl.MIRRORED_REPEAT
  // texture format
  // compress formats
  TEXTURE_FMT_RGB_DXT1: 0,
  TEXTURE_FMT_RGBA_DXT1: 1,
  TEXTURE_FMT_RGBA_DXT3: 2,
  TEXTURE_FMT_RGBA_DXT5: 3,
  TEXTURE_FMT_RGB_ETC1: 4,
  TEXTURE_FMT_RGB_PVRTC_2BPPV1: 5,
  TEXTURE_FMT_RGBA_PVRTC_2BPPV1: 6,
  TEXTURE_FMT_RGB_PVRTC_4BPPV1: 7,
  TEXTURE_FMT_RGBA_PVRTC_4BPPV1: 8,
  // normal formats
  TEXTURE_FMT_A8: 9,
  TEXTURE_FMT_L8: 10,
  TEXTURE_FMT_L8_A8: 11,
  TEXTURE_FMT_R5_G6_B5: 12,
  TEXTURE_FMT_R5_G5_B5_A1: 13,
  TEXTURE_FMT_R4_G4_B4_A4: 14,
  TEXTURE_FMT_RGB8: 15,
  TEXTURE_FMT_RGBA8: 16,
  TEXTURE_FMT_RGB16F: 17,
  TEXTURE_FMT_RGBA16F: 18,
  TEXTURE_FMT_RGB32F: 19,
  TEXTURE_FMT_RGBA32F: 20,
  TEXTURE_FMT_R32F: 21,
  TEXTURE_FMT_111110F: 22,
  TEXTURE_FMT_SRGB: 23,
  TEXTURE_FMT_SRGBA: 24,
  // depth formats
  TEXTURE_FMT_D16: 25,
  TEXTURE_FMT_D32: 26,
  TEXTURE_FMT_D24S8: 27,
  // etc2 format
  TEXTURE_FMT_RGB_ETC2: 28,
  TEXTURE_FMT_RGBA_ETC2: 29,
  // depth and stencil function
  DS_FUNC_NEVER: 512,
  // gl.NEVER
  DS_FUNC_LESS: 513,
  // gl.LESS
  DS_FUNC_EQUAL: 514,
  // gl.EQUAL
  DS_FUNC_LEQUAL: 515,
  // gl.LEQUAL
  DS_FUNC_GREATER: 516,
  // gl.GREATER
  DS_FUNC_NOTEQUAL: 517,
  // gl.NOTEQUAL
  DS_FUNC_GEQUAL: 518,
  // gl.GEQUAL
  DS_FUNC_ALWAYS: 519,
  // gl.ALWAYS
  // render-buffer format
  RB_FMT_RGBA4: 32854,
  // gl.RGBA4
  RB_FMT_RGB5_A1: 32855,
  // gl.RGB5_A1
  RB_FMT_RGB565: 36194,
  // gl.RGB565
  RB_FMT_D16: 33189,
  // gl.DEPTH_COMPONENT16
  RB_FMT_S8: 36168,
  // gl.STENCIL_INDEX8
  RB_FMT_D24S8: 34041,
  // gl.DEPTH_STENCIL
  // blend-equation
  BLEND_FUNC_ADD: 32774,
  // gl.FUNC_ADD
  BLEND_FUNC_SUBTRACT: 32778,
  // gl.FUNC_SUBTRACT
  BLEND_FUNC_REVERSE_SUBTRACT: 32779,
  // gl.FUNC_REVERSE_SUBTRACT
  // blend
  BLEND_ZERO: 0,
  // gl.ZERO
  BLEND_ONE: 1,
  // gl.ONE
  BLEND_SRC_COLOR: 768,
  // gl.SRC_COLOR
  BLEND_ONE_MINUS_SRC_COLOR: 769,
  // gl.ONE_MINUS_SRC_COLOR
  BLEND_DST_COLOR: 774,
  // gl.DST_COLOR
  BLEND_ONE_MINUS_DST_COLOR: 775,
  // gl.ONE_MINUS_DST_COLOR
  BLEND_SRC_ALPHA: 770,
  // gl.SRC_ALPHA
  BLEND_ONE_MINUS_SRC_ALPHA: 771,
  // gl.ONE_MINUS_SRC_ALPHA
  BLEND_DST_ALPHA: 772,
  // gl.DST_ALPHA
  BLEND_ONE_MINUS_DST_ALPHA: 773,
  // gl.ONE_MINUS_DST_ALPHA
  BLEND_CONSTANT_COLOR: 32769,
  // gl.CONSTANT_COLOR
  BLEND_ONE_MINUS_CONSTANT_COLOR: 32770,
  // gl.ONE_MINUS_CONSTANT_COLOR
  BLEND_CONSTANT_ALPHA: 32771,
  // gl.CONSTANT_ALPHA
  BLEND_ONE_MINUS_CONSTANT_ALPHA: 32772,
  // gl.ONE_MINUS_CONSTANT_ALPHA
  BLEND_SRC_ALPHA_SATURATE: 776,
  // gl.SRC_ALPHA_SATURATE
  // stencil operation
  STENCIL_DISABLE: 0,
  // disable stencil
  STENCIL_ENABLE: 1,
  // enable stencil
  STENCIL_INHERIT: 2,
  // inherit stencil states
  STENCIL_OP_KEEP: 7680,
  // gl.KEEP
  STENCIL_OP_ZERO: 0,
  // gl.ZERO
  STENCIL_OP_REPLACE: 7681,
  // gl.REPLACE
  STENCIL_OP_INCR: 7682,
  // gl.INCR
  STENCIL_OP_INCR_WRAP: 34055,
  // gl.INCR_WRAP
  STENCIL_OP_DECR: 7683,
  // gl.DECR
  STENCIL_OP_DECR_WRAP: 34056,
  // gl.DECR_WRAP
  STENCIL_OP_INVERT: 5386,
  // gl.INVERT
  // cull
  CULL_NONE: 0,
  CULL_FRONT: 1028,
  CULL_BACK: 1029,
  CULL_FRONT_AND_BACK: 1032,
  // primitive type
  PT_POINTS: 0,
  // gl.POINTS
  PT_LINES: 1,
  // gl.LINES
  PT_LINE_LOOP: 2,
  // gl.LINE_LOOP
  PT_LINE_STRIP: 3,
  // gl.LINE_STRIP
  PT_TRIANGLES: 4,
  // gl.TRIANGLES
  PT_TRIANGLE_STRIP: 5,
  // gl.TRIANGLE_STRIP
  PT_TRIANGLE_FAN: 6 // gl.TRIANGLE_FAN

};
var RenderQueue = {
  OPAQUE: 0,
  TRANSPARENT: 1,
  OVERLAY: 2
};
/**
 * JS Implementation of MurmurHash2
 * 
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 * 
 * @param {string} str ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 */

function murmurhash2_32_gc(str, seed) {
  var l = str.length,
      h = seed ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return h >>> 0;
} // Extensions


var WebGLEXT;

(function (WebGLEXT) {
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
  WebGLEXT[WebGLEXT["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
})(WebGLEXT || (WebGLEXT = {}));

var GFXObjectType;

(function (GFXObjectType) {
  GFXObjectType[GFXObjectType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXObjectType[GFXObjectType["BUFFER"] = 1] = "BUFFER";
  GFXObjectType[GFXObjectType["TEXTURE"] = 2] = "TEXTURE";
  GFXObjectType[GFXObjectType["TEXTURE_VIEW"] = 3] = "TEXTURE_VIEW";
  GFXObjectType[GFXObjectType["RENDER_PASS"] = 4] = "RENDER_PASS";
  GFXObjectType[GFXObjectType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
  GFXObjectType[GFXObjectType["SAMPLER"] = 6] = "SAMPLER";
  GFXObjectType[GFXObjectType["SHADER"] = 7] = "SHADER";
  GFXObjectType[GFXObjectType["PIPELINE_LAYOUT"] = 8] = "PIPELINE_LAYOUT";
  GFXObjectType[GFXObjectType["PIPELINE_STATE"] = 9] = "PIPELINE_STATE";
  GFXObjectType[GFXObjectType["BINDING_LAYOUT"] = 10] = "BINDING_LAYOUT";
  GFXObjectType[GFXObjectType["INPUT_ASSEMBLER"] = 11] = "INPUT_ASSEMBLER";
  GFXObjectType[GFXObjectType["COMMAND_ALLOCATOR"] = 12] = "COMMAND_ALLOCATOR";
  GFXObjectType[GFXObjectType["COMMAND_BUFFER"] = 13] = "COMMAND_BUFFER";
  GFXObjectType[GFXObjectType["QUEUE"] = 14] = "QUEUE";
  GFXObjectType[GFXObjectType["WINDOW"] = 15] = "WINDOW";
})(GFXObjectType || (GFXObjectType = {}));

var GFXStatus;

(function (GFXStatus) {
  GFXStatus[GFXStatus["UNREADY"] = 0] = "UNREADY";
  GFXStatus[GFXStatus["FAILED"] = 1] = "FAILED";
  GFXStatus[GFXStatus["SUCCESS"] = 2] = "SUCCESS";
})(GFXStatus || (GFXStatus = {}));

var GFXObject =
/** @class */
function () {
  function GFXObject(gfxType) {
    this._gfxType = GFXObjectType.UNKNOWN;
    this._status = GFXStatus.UNREADY;
    this._gfxType = gfxType;
  }

  Object.defineProperty(GFXObject.prototype, "gfxType", {
    get: function get() {
      return this._gfxType;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(GFXObject.prototype, "status", {
    get: function get() {
      return this._status;
    },
    enumerable: true,
    configurable: true
  });
  return GFXObject;
}();

var GFXAttributeName;

(function (GFXAttributeName) {
  GFXAttributeName["ATTR_POSITION"] = "a_position";
  GFXAttributeName["ATTR_NORMAL"] = "a_normal";
  GFXAttributeName["ATTR_TANGENT"] = "a_tangent";
  GFXAttributeName["ATTR_BITANGENT"] = "a_bitangent";
  GFXAttributeName["ATTR_WEIGHTS"] = "a_weights";
  GFXAttributeName["ATTR_JOINTS"] = "a_joints";
  GFXAttributeName["ATTR_COLOR"] = "a_color";
  GFXAttributeName["ATTR_COLOR1"] = "a_color1";
  GFXAttributeName["ATTR_COLOR2"] = "a_color2";
  GFXAttributeName["ATTR_TEX_COORD"] = "a_texCoord";
  GFXAttributeName["ATTR_TEX_COORD1"] = "a_texCoord1";
  GFXAttributeName["ATTR_TEX_COORD2"] = "a_texCoord2";
  GFXAttributeName["ATTR_TEX_COORD3"] = "a_texCoord3";
  GFXAttributeName["ATTR_TEX_COORD4"] = "a_texCoord4";
  GFXAttributeName["ATTR_TEX_COORD5"] = "a_texCoord5";
  GFXAttributeName["ATTR_TEX_COORD6"] = "a_texCoord6";
  GFXAttributeName["ATTR_TEX_COORD7"] = "a_texCoord7";
  GFXAttributeName["ATTR_TEX_COORD8"] = "a_texCoord8";
})(GFXAttributeName || (GFXAttributeName = {}));

var GFXType;

(function (GFXType) {
  GFXType[GFXType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXType[GFXType["BOOL"] = 1] = "BOOL";
  GFXType[GFXType["BOOL2"] = 2] = "BOOL2";
  GFXType[GFXType["BOOL3"] = 3] = "BOOL3";
  GFXType[GFXType["BOOL4"] = 4] = "BOOL4";
  GFXType[GFXType["INT"] = 5] = "INT";
  GFXType[GFXType["INT2"] = 6] = "INT2";
  GFXType[GFXType["INT3"] = 7] = "INT3";
  GFXType[GFXType["INT4"] = 8] = "INT4";
  GFXType[GFXType["UINT"] = 9] = "UINT";
  GFXType[GFXType["UINT2"] = 10] = "UINT2";
  GFXType[GFXType["UINT3"] = 11] = "UINT3";
  GFXType[GFXType["UINT4"] = 12] = "UINT4";
  GFXType[GFXType["FLOAT"] = 13] = "FLOAT";
  GFXType[GFXType["FLOAT2"] = 14] = "FLOAT2";
  GFXType[GFXType["FLOAT3"] = 15] = "FLOAT3";
  GFXType[GFXType["FLOAT4"] = 16] = "FLOAT4";
  GFXType[GFXType["COLOR4"] = 17] = "COLOR4";
  GFXType[GFXType["MAT2"] = 18] = "MAT2";
  GFXType[GFXType["MAT2X3"] = 19] = "MAT2X3";
  GFXType[GFXType["MAT2X4"] = 20] = "MAT2X4";
  GFXType[GFXType["MAT3X2"] = 21] = "MAT3X2";
  GFXType[GFXType["MAT3"] = 22] = "MAT3";
  GFXType[GFXType["MAT3X4"] = 23] = "MAT3X4";
  GFXType[GFXType["MAT4X2"] = 24] = "MAT4X2";
  GFXType[GFXType["MAT4X3"] = 25] = "MAT4X3";
  GFXType[GFXType["MAT4"] = 26] = "MAT4";
  GFXType[GFXType["SAMPLER1D"] = 27] = "SAMPLER1D";
  GFXType[GFXType["SAMPLER1D_ARRAY"] = 28] = "SAMPLER1D_ARRAY";
  GFXType[GFXType["SAMPLER2D"] = 29] = "SAMPLER2D";
  GFXType[GFXType["SAMPLER2D_ARRAY"] = 30] = "SAMPLER2D_ARRAY";
  GFXType[GFXType["SAMPLER3D"] = 31] = "SAMPLER3D";
  GFXType[GFXType["SAMPLER_CUBE"] = 32] = "SAMPLER_CUBE";
  GFXType[GFXType["COUNT"] = 33] = "COUNT";
})(GFXType || (GFXType = {}));

var GFXFormat;

(function (GFXFormat) {
  GFXFormat[GFXFormat["UNKNOWN"] = 0] = "UNKNOWN";
  GFXFormat[GFXFormat["A8"] = 1] = "A8";
  GFXFormat[GFXFormat["L8"] = 2] = "L8";
  GFXFormat[GFXFormat["LA8"] = 3] = "LA8";
  GFXFormat[GFXFormat["R8"] = 4] = "R8";
  GFXFormat[GFXFormat["R8SN"] = 5] = "R8SN";
  GFXFormat[GFXFormat["R8UI"] = 6] = "R8UI";
  GFXFormat[GFXFormat["R8I"] = 7] = "R8I";
  GFXFormat[GFXFormat["R16F"] = 8] = "R16F";
  GFXFormat[GFXFormat["R16UI"] = 9] = "R16UI";
  GFXFormat[GFXFormat["R16I"] = 10] = "R16I";
  GFXFormat[GFXFormat["R32F"] = 11] = "R32F";
  GFXFormat[GFXFormat["R32UI"] = 12] = "R32UI";
  GFXFormat[GFXFormat["R32I"] = 13] = "R32I";
  GFXFormat[GFXFormat["RG8"] = 14] = "RG8";
  GFXFormat[GFXFormat["RG8SN"] = 15] = "RG8SN";
  GFXFormat[GFXFormat["RG8UI"] = 16] = "RG8UI";
  GFXFormat[GFXFormat["RG8I"] = 17] = "RG8I";
  GFXFormat[GFXFormat["RG16F"] = 18] = "RG16F";
  GFXFormat[GFXFormat["RG16UI"] = 19] = "RG16UI";
  GFXFormat[GFXFormat["RG16I"] = 20] = "RG16I";
  GFXFormat[GFXFormat["RG32F"] = 21] = "RG32F";
  GFXFormat[GFXFormat["RG32UI"] = 22] = "RG32UI";
  GFXFormat[GFXFormat["RG32I"] = 23] = "RG32I";
  GFXFormat[GFXFormat["RGB8"] = 24] = "RGB8";
  GFXFormat[GFXFormat["SRGB8"] = 25] = "SRGB8";
  GFXFormat[GFXFormat["RGB8SN"] = 26] = "RGB8SN";
  GFXFormat[GFXFormat["RGB8UI"] = 27] = "RGB8UI";
  GFXFormat[GFXFormat["RGB8I"] = 28] = "RGB8I";
  GFXFormat[GFXFormat["RGB16F"] = 29] = "RGB16F";
  GFXFormat[GFXFormat["RGB16UI"] = 30] = "RGB16UI";
  GFXFormat[GFXFormat["RGB16I"] = 31] = "RGB16I";
  GFXFormat[GFXFormat["RGB32F"] = 32] = "RGB32F";
  GFXFormat[GFXFormat["RGB32UI"] = 33] = "RGB32UI";
  GFXFormat[GFXFormat["RGB32I"] = 34] = "RGB32I";
  GFXFormat[GFXFormat["RGBA8"] = 35] = "RGBA8";
  GFXFormat[GFXFormat["SRGB8_A8"] = 36] = "SRGB8_A8";
  GFXFormat[GFXFormat["RGBA8SN"] = 37] = "RGBA8SN";
  GFXFormat[GFXFormat["RGBA8UI"] = 38] = "RGBA8UI";
  GFXFormat[GFXFormat["RGBA8I"] = 39] = "RGBA8I";
  GFXFormat[GFXFormat["RGBA16F"] = 40] = "RGBA16F";
  GFXFormat[GFXFormat["RGBA16UI"] = 41] = "RGBA16UI";
  GFXFormat[GFXFormat["RGBA16I"] = 42] = "RGBA16I";
  GFXFormat[GFXFormat["RGBA32F"] = 43] = "RGBA32F";
  GFXFormat[GFXFormat["RGBA32UI"] = 44] = "RGBA32UI";
  GFXFormat[GFXFormat["RGBA32I"] = 45] = "RGBA32I"; // Special Format

  GFXFormat[GFXFormat["R5G6B5"] = 46] = "R5G6B5";
  GFXFormat[GFXFormat["R11G11B10F"] = 47] = "R11G11B10F";
  GFXFormat[GFXFormat["RGB5A1"] = 48] = "RGB5A1";
  GFXFormat[GFXFormat["RGBA4"] = 49] = "RGBA4";
  GFXFormat[GFXFormat["RGB10A2"] = 50] = "RGB10A2";
  GFXFormat[GFXFormat["RGB10A2UI"] = 51] = "RGB10A2UI";
  GFXFormat[GFXFormat["RGB9E5"] = 52] = "RGB9E5"; // Depth-Stencil Format

  GFXFormat[GFXFormat["D16"] = 53] = "D16";
  GFXFormat[GFXFormat["D16S8"] = 54] = "D16S8";
  GFXFormat[GFXFormat["D24"] = 55] = "D24";
  GFXFormat[GFXFormat["D24S8"] = 56] = "D24S8";
  GFXFormat[GFXFormat["D32F"] = 57] = "D32F";
  GFXFormat[GFXFormat["D32F_S8"] = 58] = "D32F_S8"; // Compressed Format
  // Block Compression Format, DDS (DirectDraw Surface)
  // DXT1: 3 channels (5:6:5), 1/8 origianl size, with 0 or 1 bit of alpha

  GFXFormat[GFXFormat["BC1"] = 59] = "BC1";
  GFXFormat[GFXFormat["BC1_ALPHA"] = 60] = "BC1_ALPHA";
  GFXFormat[GFXFormat["BC1_SRGB"] = 61] = "BC1_SRGB";
  GFXFormat[GFXFormat["BC1_SRGB_ALPHA"] = 62] = "BC1_SRGB_ALPHA"; // DXT3: 4 channels (5:6:5), 1/4 origianl size, with 4 bits of alpha

  GFXFormat[GFXFormat["BC2"] = 63] = "BC2";
  GFXFormat[GFXFormat["BC2_SRGB"] = 64] = "BC2_SRGB"; // DXT5: 4 channels (5:6:5), 1/4 origianl size, with 8 bits of alpha

  GFXFormat[GFXFormat["BC3"] = 65] = "BC3";
  GFXFormat[GFXFormat["BC3_SRGB"] = 66] = "BC3_SRGB"; // 1 channel (8), 1/4 origianl size

  GFXFormat[GFXFormat["BC4"] = 67] = "BC4";
  GFXFormat[GFXFormat["BC4_SNORM"] = 68] = "BC4_SNORM"; // 2 channels (8:8), 1/2 origianl size

  GFXFormat[GFXFormat["BC5"] = 69] = "BC5";
  GFXFormat[GFXFormat["BC5_SNORM"] = 70] = "BC5_SNORM"; // 3 channels (16:16:16), half-floating point, 1/6 origianl size
  // UF16: unsigned float, 5 exponent bits + 11 mantissa bits
  // SF16: signed float, 1 signed bit + 5 exponent bits + 10 mantissa bits

  GFXFormat[GFXFormat["BC6H_UF16"] = 71] = "BC6H_UF16";
  GFXFormat[GFXFormat["BC6H_SF16"] = 72] = "BC6H_SF16"; // 4 channels (4~7 bits per channel) with 0 to 8 bits of alpha, 1/3 original size

  GFXFormat[GFXFormat["BC7"] = 73] = "BC7";
  GFXFormat[GFXFormat["BC7_SRGB"] = 74] = "BC7_SRGB"; // Ericsson Texture Compression Format

  GFXFormat[GFXFormat["ETC_RGB8"] = 75] = "ETC_RGB8";
  GFXFormat[GFXFormat["ETC2_RGB8"] = 76] = "ETC2_RGB8";
  GFXFormat[GFXFormat["ETC2_SRGB8"] = 77] = "ETC2_SRGB8";
  GFXFormat[GFXFormat["ETC2_RGB8_A1"] = 78] = "ETC2_RGB8_A1";
  GFXFormat[GFXFormat["ETC2_SRGB8_A1"] = 79] = "ETC2_SRGB8_A1";
  GFXFormat[GFXFormat["ETC2_RGBA8"] = 80] = "ETC2_RGBA8";
  GFXFormat[GFXFormat["ETC2_SRGB8_A8"] = 81] = "ETC2_SRGB8_A8";
  GFXFormat[GFXFormat["EAC_R11"] = 82] = "EAC_R11";
  GFXFormat[GFXFormat["EAC_R11SN"] = 83] = "EAC_R11SN";
  GFXFormat[GFXFormat["EAC_RG11"] = 84] = "EAC_RG11";
  GFXFormat[GFXFormat["EAC_RG11SN"] = 85] = "EAC_RG11SN"; // PVRTC (PowerVR)

  GFXFormat[GFXFormat["PVRTC_RGB2"] = 86] = "PVRTC_RGB2";
  GFXFormat[GFXFormat["PVRTC_RGBA2"] = 87] = "PVRTC_RGBA2";
  GFXFormat[GFXFormat["PVRTC_RGB4"] = 88] = "PVRTC_RGB4";
  GFXFormat[GFXFormat["PVRTC_RGBA4"] = 89] = "PVRTC_RGBA4";
  GFXFormat[GFXFormat["PVRTC2_2BPP"] = 90] = "PVRTC2_2BPP";
  GFXFormat[GFXFormat["PVRTC2_4BPP"] = 91] = "PVRTC2_4BPP";
})(GFXFormat || (GFXFormat = {}));

var GFXBufferUsageBit;

(function (GFXBufferUsageBit) {
  GFXBufferUsageBit[GFXBufferUsageBit["NONE"] = 0] = "NONE";
  GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  GFXBufferUsageBit[GFXBufferUsageBit["INDEX"] = 4] = "INDEX";
  GFXBufferUsageBit[GFXBufferUsageBit["VERTEX"] = 8] = "VERTEX";
  GFXBufferUsageBit[GFXBufferUsageBit["UNIFORM"] = 16] = "UNIFORM";
  GFXBufferUsageBit[GFXBufferUsageBit["STORAGE"] = 32] = "STORAGE";
  GFXBufferUsageBit[GFXBufferUsageBit["INDIRECT"] = 64] = "INDIRECT";
})(GFXBufferUsageBit || (GFXBufferUsageBit = {}));

var GFXMemoryUsageBit;

(function (GFXMemoryUsageBit) {
  GFXMemoryUsageBit[GFXMemoryUsageBit["NONE"] = 0] = "NONE";
  GFXMemoryUsageBit[GFXMemoryUsageBit["DEVICE"] = 1] = "DEVICE";
  GFXMemoryUsageBit[GFXMemoryUsageBit["HOST"] = 2] = "HOST";
})(GFXMemoryUsageBit || (GFXMemoryUsageBit = {}));

var GFXBufferAccessBit;

(function (GFXBufferAccessBit) {
  GFXBufferAccessBit[GFXBufferAccessBit["NONE"] = 0] = "NONE";
  GFXBufferAccessBit[GFXBufferAccessBit["READ"] = 1] = "READ";
  GFXBufferAccessBit[GFXBufferAccessBit["WRITE"] = 2] = "WRITE";
})(GFXBufferAccessBit || (GFXBufferAccessBit = {}));

var GFXPrimitiveMode;

(function (GFXPrimitiveMode) {
  GFXPrimitiveMode[GFXPrimitiveMode["POINT_LIST"] = 0] = "POINT_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST"] = 1] = "LINE_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP"] = 2] = "LINE_STRIP";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LOOP"] = 3] = "LINE_LOOP";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST_ADJACENCY"] = 4] = "LINE_LIST_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP_ADJACENCY"] = 5] = "LINE_STRIP_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["ISO_LINE_LIST"] = 6] = "ISO_LINE_LIST"; // raycast detectable:

  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST"] = 7] = "TRIANGLE_LIST";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP"] = 8] = "TRIANGLE_STRIP";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_FAN"] = 9] = "TRIANGLE_FAN";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST_ADJACENCY"] = 10] = "TRIANGLE_LIST_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP_ADJACENCY"] = 11] = "TRIANGLE_STRIP_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_PATCH_ADJACENCY"] = 12] = "TRIANGLE_PATCH_ADJACENCY";
  GFXPrimitiveMode[GFXPrimitiveMode["QUAD_PATCH_LIST"] = 13] = "QUAD_PATCH_LIST";
})(GFXPrimitiveMode || (GFXPrimitiveMode = {}));

var GFXPolygonMode;

(function (GFXPolygonMode) {
  GFXPolygonMode[GFXPolygonMode["FILL"] = 0] = "FILL";
  GFXPolygonMode[GFXPolygonMode["POINT"] = 1] = "POINT";
  GFXPolygonMode[GFXPolygonMode["LINE"] = 2] = "LINE";
})(GFXPolygonMode || (GFXPolygonMode = {}));

var GFXShadeModel;

(function (GFXShadeModel) {
  GFXShadeModel[GFXShadeModel["GOURAND"] = 0] = "GOURAND";
  GFXShadeModel[GFXShadeModel["FLAT"] = 1] = "FLAT";
})(GFXShadeModel || (GFXShadeModel = {}));

var GFXCullMode;

(function (GFXCullMode) {
  GFXCullMode[GFXCullMode["NONE"] = 0] = "NONE";
  GFXCullMode[GFXCullMode["FRONT"] = 1] = "FRONT";
  GFXCullMode[GFXCullMode["BACK"] = 2] = "BACK";
})(GFXCullMode || (GFXCullMode = {}));

var GFXComparisonFunc;

(function (GFXComparisonFunc) {
  GFXComparisonFunc[GFXComparisonFunc["NEVER"] = 0] = "NEVER";
  GFXComparisonFunc[GFXComparisonFunc["LESS"] = 1] = "LESS";
  GFXComparisonFunc[GFXComparisonFunc["EQUAL"] = 2] = "EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["LESS_EQUAL"] = 3] = "LESS_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["GREATER"] = 4] = "GREATER";
  GFXComparisonFunc[GFXComparisonFunc["NOT_EQUAL"] = 5] = "NOT_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["GREATER_EQUAL"] = 6] = "GREATER_EQUAL";
  GFXComparisonFunc[GFXComparisonFunc["ALWAYS"] = 7] = "ALWAYS";
})(GFXComparisonFunc || (GFXComparisonFunc = {}));

var GFXStencilOp;

(function (GFXStencilOp) {
  GFXStencilOp[GFXStencilOp["ZERO"] = 0] = "ZERO";
  GFXStencilOp[GFXStencilOp["KEEP"] = 1] = "KEEP";
  GFXStencilOp[GFXStencilOp["REPLACE"] = 2] = "REPLACE";
  GFXStencilOp[GFXStencilOp["INCR"] = 3] = "INCR";
  GFXStencilOp[GFXStencilOp["DECR"] = 4] = "DECR";
  GFXStencilOp[GFXStencilOp["INVERT"] = 5] = "INVERT";
  GFXStencilOp[GFXStencilOp["INCR_WRAP"] = 6] = "INCR_WRAP";
  GFXStencilOp[GFXStencilOp["DECR_WRAP"] = 7] = "DECR_WRAP";
})(GFXStencilOp || (GFXStencilOp = {}));

var GFXBlendOp;

(function (GFXBlendOp) {
  GFXBlendOp[GFXBlendOp["ADD"] = 0] = "ADD";
  GFXBlendOp[GFXBlendOp["SUB"] = 1] = "SUB";
  GFXBlendOp[GFXBlendOp["REV_SUB"] = 2] = "REV_SUB";
  GFXBlendOp[GFXBlendOp["MIN"] = 3] = "MIN";
  GFXBlendOp[GFXBlendOp["MAX"] = 4] = "MAX";
})(GFXBlendOp || (GFXBlendOp = {}));

var GFXBlendFactor;

(function (GFXBlendFactor) {
  GFXBlendFactor[GFXBlendFactor["ZERO"] = 0] = "ZERO";
  GFXBlendFactor[GFXBlendFactor["ONE"] = 1] = "ONE";
  GFXBlendFactor[GFXBlendFactor["SRC_ALPHA"] = 2] = "SRC_ALPHA";
  GFXBlendFactor[GFXBlendFactor["DST_ALPHA"] = 3] = "DST_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_ALPHA"] = 4] = "ONE_MINUS_SRC_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_ALPHA"] = 5] = "ONE_MINUS_DST_ALPHA";
  GFXBlendFactor[GFXBlendFactor["SRC_COLOR"] = 6] = "SRC_COLOR";
  GFXBlendFactor[GFXBlendFactor["DST_COLOR"] = 7] = "DST_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_COLOR"] = 8] = "ONE_MINUS_SRC_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_COLOR"] = 9] = "ONE_MINUS_DST_COLOR";
  GFXBlendFactor[GFXBlendFactor["SRC_ALPHA_SATURATE"] = 10] = "SRC_ALPHA_SATURATE";
  GFXBlendFactor[GFXBlendFactor["CONSTANT_COLOR"] = 11] = "CONSTANT_COLOR";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 12] = "ONE_MINUS_CONSTANT_COLOR";
  GFXBlendFactor[GFXBlendFactor["CONSTANT_ALPHA"] = 13] = "CONSTANT_ALPHA";
  GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(GFXBlendFactor || (GFXBlendFactor = {}));

var GFXColorMask;

(function (GFXColorMask) {
  GFXColorMask[GFXColorMask["NONE"] = 0] = "NONE";
  GFXColorMask[GFXColorMask["R"] = 1] = "R";
  GFXColorMask[GFXColorMask["G"] = 2] = "G";
  GFXColorMask[GFXColorMask["B"] = 4] = "B";
  GFXColorMask[GFXColorMask["A"] = 8] = "A";
  GFXColorMask[GFXColorMask["ALL"] = 15] = "ALL";
})(GFXColorMask || (GFXColorMask = {}));

var GFXFilter;

(function (GFXFilter) {
  GFXFilter[GFXFilter["NONE"] = 0] = "NONE";
  GFXFilter[GFXFilter["POINT"] = 1] = "POINT";
  GFXFilter[GFXFilter["LINEAR"] = 2] = "LINEAR";
  GFXFilter[GFXFilter["ANISOTROPIC"] = 3] = "ANISOTROPIC";
})(GFXFilter || (GFXFilter = {}));

var GFXAddress;

(function (GFXAddress) {
  GFXAddress[GFXAddress["WRAP"] = 0] = "WRAP";
  GFXAddress[GFXAddress["MIRROR"] = 1] = "MIRROR";
  GFXAddress[GFXAddress["CLAMP"] = 2] = "CLAMP";
  GFXAddress[GFXAddress["BORDER"] = 3] = "BORDER";
})(GFXAddress || (GFXAddress = {}));

var GFXTextureType;

(function (GFXTextureType) {
  GFXTextureType[GFXTextureType["TEX1D"] = 0] = "TEX1D";
  GFXTextureType[GFXTextureType["TEX2D"] = 1] = "TEX2D";
  GFXTextureType[GFXTextureType["TEX3D"] = 2] = "TEX3D";
})(GFXTextureType || (GFXTextureType = {}));

var GFXTextureUsageBit;

(function (GFXTextureUsageBit) {
  GFXTextureUsageBit[GFXTextureUsageBit["NONE"] = 0] = "NONE";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  GFXTextureUsageBit[GFXTextureUsageBit["SAMPLED"] = 4] = "SAMPLED";
  GFXTextureUsageBit[GFXTextureUsageBit["STORAGE"] = 8] = "STORAGE";
  GFXTextureUsageBit[GFXTextureUsageBit["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["TRANSIENT_ATTACHMENT"] = 64] = "TRANSIENT_ATTACHMENT";
  GFXTextureUsageBit[GFXTextureUsageBit["INPUT_ATTACHMENT"] = 128] = "INPUT_ATTACHMENT";
})(GFXTextureUsageBit || (GFXTextureUsageBit = {}));

var GFXSampleCount;

(function (GFXSampleCount) {
  GFXSampleCount[GFXSampleCount["X1"] = 0] = "X1";
  GFXSampleCount[GFXSampleCount["X2"] = 1] = "X2";
  GFXSampleCount[GFXSampleCount["X4"] = 2] = "X4";
  GFXSampleCount[GFXSampleCount["X8"] = 3] = "X8";
  GFXSampleCount[GFXSampleCount["X16"] = 4] = "X16";
  GFXSampleCount[GFXSampleCount["X32"] = 5] = "X32";
  GFXSampleCount[GFXSampleCount["X64"] = 6] = "X64";
})(GFXSampleCount || (GFXSampleCount = {}));

var GFXTextureFlagBit;

(function (GFXTextureFlagBit) {
  GFXTextureFlagBit[GFXTextureFlagBit["NONE"] = 0] = "NONE";
  GFXTextureFlagBit[GFXTextureFlagBit["GEN_MIPMAP"] = 1] = "GEN_MIPMAP";
  GFXTextureFlagBit[GFXTextureFlagBit["CUBEMAP"] = 2] = "CUBEMAP";
  GFXTextureFlagBit[GFXTextureFlagBit["BAKUP_BUFFER"] = 4] = "BAKUP_BUFFER";
})(GFXTextureFlagBit || (GFXTextureFlagBit = {}));

var GFXTextureViewType;

(function (GFXTextureViewType) {
  GFXTextureViewType[GFXTextureViewType["TV1D"] = 0] = "TV1D";
  GFXTextureViewType[GFXTextureViewType["TV2D"] = 1] = "TV2D";
  GFXTextureViewType[GFXTextureViewType["TV3D"] = 2] = "TV3D";
  GFXTextureViewType[GFXTextureViewType["CUBE"] = 3] = "CUBE";
  GFXTextureViewType[GFXTextureViewType["TV1D_ARRAY"] = 4] = "TV1D_ARRAY";
  GFXTextureViewType[GFXTextureViewType["TV2D_ARRAY"] = 5] = "TV2D_ARRAY";
})(GFXTextureViewType || (GFXTextureViewType = {}));

var GFXShaderType;

(function (GFXShaderType) {
  GFXShaderType[GFXShaderType["VERTEX"] = 0] = "VERTEX";
  GFXShaderType[GFXShaderType["HULL"] = 1] = "HULL";
  GFXShaderType[GFXShaderType["DOMAIN"] = 2] = "DOMAIN";
  GFXShaderType[GFXShaderType["GEOMETRY"] = 3] = "GEOMETRY";
  GFXShaderType[GFXShaderType["FRAGMENT"] = 4] = "FRAGMENT";
  GFXShaderType[GFXShaderType["COMPUTE"] = 5] = "COMPUTE";
  GFXShaderType[GFXShaderType["COUNT"] = 6] = "COUNT";
})(GFXShaderType || (GFXShaderType = {}));

var GFXBindingType;

(function (GFXBindingType) {
  GFXBindingType[GFXBindingType["UNKNOWN"] = 0] = "UNKNOWN";
  GFXBindingType[GFXBindingType["UNIFORM_BUFFER"] = 1] = "UNIFORM_BUFFER";
  GFXBindingType[GFXBindingType["SAMPLER"] = 2] = "SAMPLER";
  GFXBindingType[GFXBindingType["STORAGE_BUFFER"] = 3] = "STORAGE_BUFFER";
})(GFXBindingType || (GFXBindingType = {}));

var GFXCommandBufferType;

(function (GFXCommandBufferType) {
  GFXCommandBufferType[GFXCommandBufferType["PRIMARY"] = 0] = "PRIMARY";
  GFXCommandBufferType[GFXCommandBufferType["SECONDARY"] = 1] = "SECONDARY";
})(GFXCommandBufferType || (GFXCommandBufferType = {})); // Enumeration all possible values of operations to be performed on initially Loading a Framebuffer Object.


var GFXLoadOp;

(function (GFXLoadOp) {
  GFXLoadOp[GFXLoadOp["LOAD"] = 0] = "LOAD";
  GFXLoadOp[GFXLoadOp["CLEAR"] = 1] = "CLEAR";
  GFXLoadOp[GFXLoadOp["DISCARD"] = 2] = "DISCARD";
})(GFXLoadOp || (GFXLoadOp = {})); // Enumerates all possible values of operations to be performed when Storing to a Framebuffer Object.


var GFXStoreOp;

(function (GFXStoreOp) {
  GFXStoreOp[GFXStoreOp["STORE"] = 0] = "STORE";
  GFXStoreOp[GFXStoreOp["DISCARD"] = 1] = "DISCARD";
})(GFXStoreOp || (GFXStoreOp = {}));

var GFXTextureLayout;

(function (GFXTextureLayout) {
  GFXTextureLayout[GFXTextureLayout["UNDEFINED"] = 0] = "UNDEFINED";
  GFXTextureLayout[GFXTextureLayout["GENERAL"] = 1] = "GENERAL";
  GFXTextureLayout[GFXTextureLayout["COLOR_ATTACHMENT_OPTIMAL"] = 2] = "COLOR_ATTACHMENT_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_ATTACHMENT_OPTIMAL"] = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_READONLY_OPTIMAL"] = 4] = "DEPTH_STENCIL_READONLY_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["SHADER_READONLY_OPTIMAL"] = 5] = "SHADER_READONLY_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["TRANSFER_SRC_OPTIMAL"] = 6] = "TRANSFER_SRC_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["TRANSFER_DST_OPTIMAL"] = 7] = "TRANSFER_DST_OPTIMAL";
  GFXTextureLayout[GFXTextureLayout["PREINITIALIZED"] = 8] = "PREINITIALIZED";
  GFXTextureLayout[GFXTextureLayout["PRESENT_SRC"] = 9] = "PRESENT_SRC";
})(GFXTextureLayout || (GFXTextureLayout = {}));

var GFXPipelineBindPoint;

(function (GFXPipelineBindPoint) {
  GFXPipelineBindPoint[GFXPipelineBindPoint["GRAPHICS"] = 0] = "GRAPHICS";
  GFXPipelineBindPoint[GFXPipelineBindPoint["COMPUTE"] = 1] = "COMPUTE";
  GFXPipelineBindPoint[GFXPipelineBindPoint["RAY_TRACING"] = 2] = "RAY_TRACING";
})(GFXPipelineBindPoint || (GFXPipelineBindPoint = {}));

var GFXDynamicState;

(function (GFXDynamicState) {
  GFXDynamicState[GFXDynamicState["VIEWPORT"] = 0] = "VIEWPORT";
  GFXDynamicState[GFXDynamicState["SCISSOR"] = 1] = "SCISSOR";
  GFXDynamicState[GFXDynamicState["LINE_WIDTH"] = 2] = "LINE_WIDTH";
  GFXDynamicState[GFXDynamicState["DEPTH_BIAS"] = 3] = "DEPTH_BIAS";
  GFXDynamicState[GFXDynamicState["BLEND_CONSTANTS"] = 4] = "BLEND_CONSTANTS";
  GFXDynamicState[GFXDynamicState["DEPTH_BOUNDS"] = 5] = "DEPTH_BOUNDS";
  GFXDynamicState[GFXDynamicState["STENCIL_WRITE_MASK"] = 6] = "STENCIL_WRITE_MASK";
  GFXDynamicState[GFXDynamicState["STENCIL_COMPARE_MASK"] = 7] = "STENCIL_COMPARE_MASK";
})(GFXDynamicState || (GFXDynamicState = {}));

var GFXStencilFace;

(function (GFXStencilFace) {
  GFXStencilFace[GFXStencilFace["FRONT"] = 0] = "FRONT";
  GFXStencilFace[GFXStencilFace["BACK"] = 1] = "BACK";
  GFXStencilFace[GFXStencilFace["ALL"] = 2] = "ALL";
})(GFXStencilFace || (GFXStencilFace = {}));

var GFXQueueType;

(function (GFXQueueType) {
  GFXQueueType[GFXQueueType["GRAPHICS"] = 0] = "GRAPHICS";
  GFXQueueType[GFXQueueType["COMPUTE"] = 1] = "COMPUTE";
  GFXQueueType[GFXQueueType["TRANSFER"] = 2] = "TRANSFER";
})(GFXQueueType || (GFXQueueType = {}));

var GFXClearFlag;

(function (GFXClearFlag) {
  GFXClearFlag[GFXClearFlag["NONE"] = 0] = "NONE";
  GFXClearFlag[GFXClearFlag["COLOR"] = 1] = "COLOR";
  GFXClearFlag[GFXClearFlag["DEPTH"] = 2] = "DEPTH";
  GFXClearFlag[GFXClearFlag["STENCIL"] = 4] = "STENCIL";
  GFXClearFlag[GFXClearFlag["DEPTH_STENCIL"] = 6] = "DEPTH_STENCIL";
  GFXClearFlag[GFXClearFlag["ALL"] = 7] = "ALL";
})(GFXClearFlag || (GFXClearFlag = {}));

function GFXGetTypeSize(type) {
  switch (type) {
    case GFXType.BOOL:
    case GFXType.INT:
    case GFXType.UINT:
    case GFXType.FLOAT:
      return 4;

    case GFXType.BOOL2:
    case GFXType.INT2:
    case GFXType.UINT2:
    case GFXType.FLOAT2:
      return 8;

    case GFXType.BOOL3:
    case GFXType.INT3:
    case GFXType.UINT3:
    case GFXType.FLOAT3:
      return 12;

    case GFXType.BOOL4:
    case GFXType.INT4:
    case GFXType.UINT4:
    case GFXType.FLOAT4:
    case GFXType.MAT2:
      return 16;

    case GFXType.MAT2X3:
      return 24;

    case GFXType.MAT2X4:
      return 32;

    case GFXType.MAT3X2:
      return 24;

    case GFXType.MAT3:
      return 36;

    case GFXType.MAT3X4:
      return 48;

    case GFXType.MAT4X2:
      return 32;

    case GFXType.MAT4X2:
      return 32;

    case GFXType.MAT4:
      return 64;

    case GFXType.SAMPLER1D:
    case GFXType.SAMPLER1D_ARRAY:
    case GFXType.SAMPLER2D:
    case GFXType.SAMPLER2D_ARRAY:
    case GFXType.SAMPLER3D:
    case GFXType.SAMPLER_CUBE:
      return 4;

    default:
      {
        return 0;
      }
  }
} // import { GFXBuffer } from '../gfx/buffer';


var RenderPassStage;

(function (RenderPassStage) {
  RenderPassStage[RenderPassStage["DEFAULT"] = 100] = "DEFAULT";
})(RenderPassStage || (RenderPassStage = {}));

var RenderPriority;

(function (RenderPriority) {
  RenderPriority[RenderPriority["MIN"] = 0] = "MIN";
  RenderPriority[RenderPriority["MAX"] = 255] = "MAX";
  RenderPriority[RenderPriority["DEFAULT"] = 128] = "DEFAULT";
})(RenderPriority || (RenderPriority = {}));

var MAX_BINDING_SUPPORTED = 24; // from WebGL 2 spec

var UniformBinding;

(function (UniformBinding) {
  // UBOs
  UniformBinding[UniformBinding["UBO_GLOBAL"] = MAX_BINDING_SUPPORTED - 1] = "UBO_GLOBAL";
  UniformBinding[UniformBinding["UBO_SHADOW"] = MAX_BINDING_SUPPORTED - 2] = "UBO_SHADOW";
  UniformBinding[UniformBinding["UBO_LOCAL"] = MAX_BINDING_SUPPORTED - 3] = "UBO_LOCAL";
  UniformBinding[UniformBinding["UBO_FORWARD_LIGHTS"] = MAX_BINDING_SUPPORTED - 4] = "UBO_FORWARD_LIGHTS";
  UniformBinding[UniformBinding["UBO_SKINNING"] = MAX_BINDING_SUPPORTED - 5] = "UBO_SKINNING";
  UniformBinding[UniformBinding["UBO_SKINNING_TEXTURE"] = MAX_BINDING_SUPPORTED - 6] = "UBO_SKINNING_TEXTURE";
  UniformBinding[UniformBinding["UBO_UI"] = MAX_BINDING_SUPPORTED - 7] = "UBO_UI"; // samplers

  UniformBinding[UniformBinding["SAMPLER_JOINTS"] = MAX_BINDING_SUPPORTED + 1] = "SAMPLER_JOINTS";
  UniformBinding[UniformBinding["SAMPLER_ENVIRONMENT"] = MAX_BINDING_SUPPORTED + 2] = "SAMPLER_ENVIRONMENT"; // rooms left for custom bindings
  // effect importer prepares bindings according to this

  UniformBinding[UniformBinding["CUSTUM_UBO_BINDING_END_POINT"] = MAX_BINDING_SUPPORTED - 7] = "CUSTUM_UBO_BINDING_END_POINT";
  UniformBinding[UniformBinding["CUSTOM_SAMPLER_BINDING_START_POINT"] = MAX_BINDING_SUPPORTED + 6] = "CUSTOM_SAMPLER_BINDING_START_POINT";
})(UniformBinding || (UniformBinding = {})); // export class UBOGlobal {
//     public static TIME_OFFSET: number = 0;
//     public static SCREEN_SIZE_OFFSET: number = UBOGlobal.TIME_OFFSET + 4;
//     public static SCREEN_SCALE_OFFSET: number = UBOGlobal.SCREEN_SIZE_OFFSET + 4;
//     public static NATIVE_SIZE_OFFSET: number = UBOGlobal.SCREEN_SCALE_OFFSET + 4;
//     public static MAT_VIEW_OFFSET: number = UBOGlobal.NATIVE_SIZE_OFFSET + 4;
//     public static MAT_VIEW_INV_OFFSET: number = UBOGlobal.MAT_VIEW_OFFSET + 16;
//     public static MAT_PROJ_OFFSET: number = UBOGlobal.MAT_VIEW_INV_OFFSET + 16;
//     public static MAT_PROJ_INV_OFFSET: number = UBOGlobal.MAT_PROJ_OFFSET + 16;
//     public static MAT_VIEW_PROJ_OFFSET: number = UBOGlobal.MAT_PROJ_INV_OFFSET + 16;
//     public static MAT_VIEW_PROJ_INV_OFFSET: number = UBOGlobal.MAT_VIEW_PROJ_OFFSET + 16;
//     public static CAMERA_POS_OFFSET: number = UBOGlobal.MAT_VIEW_PROJ_INV_OFFSET + 16;
//     public static EXPOSURE_OFFSET: number = UBOGlobal.CAMERA_POS_OFFSET + 4;
//     public static MAIN_LIT_DIR_OFFSET: number = UBOGlobal.EXPOSURE_OFFSET + 4;
//     public static MAIN_LIT_COLOR_OFFSET: number = UBOGlobal.MAIN_LIT_DIR_OFFSET + 4;
//     public static AMBIENT_SKY_OFFSET: number = UBOGlobal.MAIN_LIT_COLOR_OFFSET + 4;
//     public static AMBIENT_GROUND_OFFSET: number = UBOGlobal.AMBIENT_SKY_OFFSET + 4;
//     public static COUNT: number = UBOGlobal.AMBIENT_GROUND_OFFSET + 4;
//     public static SIZE: number = UBOGlobal.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_GLOBAL, name: 'CCGlobal', members: [
//             { name: 'cc_time', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_screenSize', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_screenScale', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_nativeSize', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_matView', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matProjInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matViewProjInv', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_cameraPos', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_exposure', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_mainLitDir', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_mainLitColor', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_ambientSky', type: GFXType.FLOAT4, count: 1 },
//             { name: 'cc_ambientGround', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOGlobal.COUNT);
// }
// export class UBOShadow {
//     public static MAT_LIGHT_PLANE_PROJ_OFFSET: number = 0;
//     public static SHADOW_COLOR_OFFSET: number = UBOShadow.MAT_LIGHT_PLANE_PROJ_OFFSET + 16;
//     public static COUNT: number = UBOShadow.SHADOW_COLOR_OFFSET + 4;
//     public static SIZE: number = UBOShadow.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_SHADOW, name: 'CCShadow', members: [
//             { name: 'cc_matLightPlaneProj', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_shadowColor', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOShadow.COUNT);
// }
// export const localBindingsDesc: Map<string, IInternalBindingDesc> = new Map<string, IInternalBindingDesc>();
// export class UBOLocal {
//     public static MAT_WORLD_OFFSET: number = 0;
//     public static MAT_WORLD_IT_OFFSET: number = UBOLocal.MAT_WORLD_OFFSET + 16;
//     public static COUNT: number = UBOLocal.MAT_WORLD_IT_OFFSET + 16;
//     public static SIZE: number = UBOLocal.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_LOCAL, name: 'CCLocal', members: [
//             { name: 'cc_matWorld', type: GFXType.MAT4, count: 1 },
//             { name: 'cc_matWorldIT', type: GFXType.MAT4, count: 1 },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOLocal.COUNT);
// }
// localBindingsDesc.set(UBOLocal.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOLocal.BLOCK,
// });
// export class UBOForwardLight {
//     public static MAX_SPHERE_LIGHTS = 2;
//     public static MAX_SPOT_LIGHTS = 2;
//     public static SPHERE_LIGHT_POS_OFFSET: number = 0;
//     public static SPHERE_LIGHT_SIZE_RANGE_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_POS_OFFSET + UBOForwardLight.MAX_SPHERE_LIGHTS * 4;
//     public static SPHERE_LIGHT_COLOR_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_SIZE_RANGE_OFFSET + UBOForwardLight.MAX_SPHERE_LIGHTS * 4;
//     public static SPOT_LIGHT_POS_OFFSET: number = UBOForwardLight.SPHERE_LIGHT_COLOR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_SIZE_RANGE_ANGLE_OFFSET: number = UBOForwardLight.SPOT_LIGHT_POS_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_DIR_OFFSET: number = UBOForwardLight.SPOT_LIGHT_SIZE_RANGE_ANGLE_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SPOT_LIGHT_COLOR_OFFSET: number = UBOForwardLight.SPOT_LIGHT_DIR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static COUNT: number = UBOForwardLight.SPOT_LIGHT_COLOR_OFFSET + UBOForwardLight.MAX_SPOT_LIGHTS * 4;
//     public static SIZE: number = UBOForwardLight.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_FORWARD_LIGHTS, name: 'CCForwardLight', members: [
//             { name: 'cc_sphereLitPos', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_sphereLitSizeRange', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_sphereLitColor', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPHERE_LIGHTS },
//             { name: 'cc_spotLitPos', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitSizeRangeAngle', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitDir', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//             { name: 'cc_spotLitColor', type: GFXType.FLOAT4, count: UBOForwardLight.MAX_SPOT_LIGHTS },
//         ],
//     };
//     public view: Float32Array = new Float32Array(UBOForwardLight.COUNT);
// }
// localBindingsDesc.set(UBOForwardLight.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOForwardLight.BLOCK,
// });
// export class UBOSkinning {
//     public static MAT_JOINT_OFFSET: number = 0;
//     public static JOINTS_TEXTURE_SIZE_OFFSET: number = UBOSkinning.MAT_JOINT_OFFSET + 128 * 16;
//     public static COUNT: number = UBOSkinning.JOINTS_TEXTURE_SIZE_OFFSET + 4;
//     public static SIZE: number = UBOSkinning.COUNT * 4;
//     public static BLOCK: GFXUniformBlock = {
//         binding: UniformBinding.UBO_SKINNING, name: 'CCSkinning', members: [
//             { name: 'cc_matJoint', type: GFXType.MAT4, count: 128 },
//             { name: 'cc_jointsTextureSize', type: GFXType.FLOAT4, count: 1 },
//         ],
//     };
// }
// localBindingsDesc.set(UBOSkinning.BLOCK.name, {
//     type: GFXBindingType.UNIFORM_BUFFER,
//     blockInfo: UBOSkinning.BLOCK,
// });
// export const UNIFORM_JOINTS_TEXTURE: GFXUniformSampler = {
//     binding: UniformBinding.SAMPLER_JOINTS, name: 'cc_jointsTexture', type: GFXType.SAMPLER2D, count: 1,
// };
// localBindingsDesc.set(UNIFORM_JOINTS_TEXTURE.name, {
//     type: GFXBindingType.SAMPLER,
//     samplerInfo: UNIFORM_JOINTS_TEXTURE,
// });
// export interface IInternalBindingDesc {
//     type: GFXBindingType;
//     blockInfo?: GFXUniformBlock;
//     samplerInfo?: GFXUniformSampler;
// }
// export interface IInternalBindingInst extends IInternalBindingDesc {
//     buffer?: GFXBuffer;
//     sampler?: GFXSampler;
//     textureView?: GFXTextureView;
// }
// this file is used for offline effect building.


var _a, _b;

var SamplerInfoIndex;

(function (SamplerInfoIndex) {
  SamplerInfoIndex[SamplerInfoIndex["minFilter"] = 0] = "minFilter";
  SamplerInfoIndex[SamplerInfoIndex["magFilter"] = 1] = "magFilter";
  SamplerInfoIndex[SamplerInfoIndex["mipFilter"] = 2] = "mipFilter";
  SamplerInfoIndex[SamplerInfoIndex["addressU"] = 3] = "addressU";
  SamplerInfoIndex[SamplerInfoIndex["addressV"] = 4] = "addressV";
  SamplerInfoIndex[SamplerInfoIndex["addressW"] = 5] = "addressW";
  SamplerInfoIndex[SamplerInfoIndex["maxAnisotropy"] = 6] = "maxAnisotropy";
  SamplerInfoIndex[SamplerInfoIndex["cmpFunc"] = 7] = "cmpFunc";
  SamplerInfoIndex[SamplerInfoIndex["minLOD"] = 8] = "minLOD";
  SamplerInfoIndex[SamplerInfoIndex["maxLOD"] = 9] = "maxLOD";
  SamplerInfoIndex[SamplerInfoIndex["mipLODBias"] = 10] = "mipLODBias";
  SamplerInfoIndex[SamplerInfoIndex["borderColor"] = 11] = "borderColor";
  SamplerInfoIndex[SamplerInfoIndex["total"] = 15] = "total";
})(SamplerInfoIndex || (SamplerInfoIndex = {}));

var typeMap = {};
typeMap[typeMap['bool'] = GFXType.BOOL] = 'bool';
typeMap[typeMap['int'] = GFXType.INT] = 'int';
typeMap[typeMap['ivec2'] = GFXType.INT2] = 'ivec2invTypeParams';
typeMap[typeMap['ivec3'] = GFXType.INT3] = 'ivec3';
typeMap[typeMap['ivec4'] = GFXType.INT4] = 'ivec4';
typeMap[typeMap['float'] = GFXType.FLOAT] = 'float';
typeMap[typeMap['vec2'] = GFXType.FLOAT2] = 'vec2';
typeMap[typeMap['vec3'] = GFXType.FLOAT3] = 'vec3';
typeMap[typeMap['vec4'] = GFXType.FLOAT4] = 'vec4';
typeMap[typeMap['mat2'] = GFXType.MAT2] = 'mat2';
typeMap[typeMap['mat3'] = GFXType.MAT3] = 'mat3';
typeMap[typeMap['mat4'] = GFXType.MAT4] = 'mat4';
typeMap[typeMap['sampler2D'] = GFXType.SAMPLER2D] = 'sampler2D';
typeMap[typeMap['samplerCube'] = GFXType.SAMPLER_CUBE] = 'samplerCube';
var sizeMap = (_a = {}, _a[GFXType.BOOL] = 4, _a[GFXType.INT] = 4, _a[GFXType.INT2] = 8, _a[GFXType.INT3] = 12, _a[GFXType.INT4] = 16, _a[GFXType.FLOAT] = 4, _a[GFXType.FLOAT2] = 8, _a[GFXType.FLOAT3] = 12, _a[GFXType.FLOAT4] = 16, _a[GFXType.MAT2] = 16, _a[GFXType.MAT3] = 36, _a[GFXType.MAT4] = 64, _a[GFXType.SAMPLER2D] = 4, _a[GFXType.SAMPLER_CUBE] = 4, _a);
var formatMap = (_b = {}, _b[GFXType.BOOL] = GFXFormat.R32I, _b[GFXType.INT] = GFXFormat.R32I, _b[GFXType.INT2] = GFXFormat.RG32I, _b[GFXType.INT3] = GFXFormat.RGB32I, _b[GFXType.INT4] = GFXFormat.RGBA32I, _b[GFXType.FLOAT] = GFXFormat.R32F, _b[GFXType.FLOAT2] = GFXFormat.RG32F, _b[GFXType.FLOAT3] = GFXFormat.RGB32F, _b[GFXType.FLOAT4] = GFXFormat.RGBA32F, _b); // const passParams = {
//   // color mask
//   NONE: gfx.GFXColorMask.NONE,
//   R: gfx.GFXColorMask.R,
//   G: gfx.GFXColorMask.G,
//   B: gfx.GFXColorMask.B,
//   A: gfx.GFXColorMask.A,
//   RG: gfx.GFXColorMask.R | gfx.GFXColorMask.G,
//   RB: gfx.GFXColorMask.R | gfx.GFXColorMask.B,
//   RA: gfx.GFXColorMask.R | gfx.GFXColorMask.A,
//   GB: gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   GA: gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   BA: gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   RGB: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   RGA: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   RBA: gfx.GFXColorMask.R | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   GBA: gfx.GFXColorMask.G | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   ALL: gfx.GFXColorMask.ALL,
//   // blend operation
//   ADD: gfx.GFXBlendOp.ADD,
//   SUB: gfx.GFXBlendOp.SUB,
//   REV_SUB: gfx.GFXBlendOp.REV_SUB,
//   MIN: gfx.GFXBlendOp.MIN,
//   MAX: gfx.GFXBlendOp.MAX,
//   // blend factor
//   ZERO: gfx.GFXBlendFactor.ZERO,
//   ONE: gfx.GFXBlendFactor.ONE,
//   SRC_ALPHA: gfx.GFXBlendFactor.SRC_ALPHA,
//   DST_ALPHA: gfx.GFXBlendFactor.DST_ALPHA,
//   ONE_MINUS_SRC_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_SRC_ALPHA,
//   ONE_MINUS_DST_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_DST_ALPHA,
//   SRC_COLOR: gfx.GFXBlendFactor.SRC_COLOR,
//   DST_COLOR: gfx.GFXBlendFactor.DST_COLOR,
//   ONE_MINUS_SRC_COLOR: gfx.GFXBlendFactor.ONE_MINUS_SRC_COLOR,
//   ONE_MINUS_DST_COLOR: gfx.GFXBlendFactor.ONE_MINUS_DST_COLOR,
//   SRC_ALPHA_SATURATE: gfx.GFXBlendFactor.SRC_ALPHA_SATURATE,
//   CONSTANT_COLOR: gfx.GFXBlendFactor.CONSTANT_COLOR,
//   ONE_MINUS_CONSTANT_COLOR: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_COLOR,
//   CONSTANT_ALPHA: gfx.GFXBlendFactor.CONSTANT_ALPHA,
//   ONE_MINUS_CONSTANT_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_ALPHA,
//   // stencil operation
//   // ZERO: GFXStencilOp.ZERO, // duplicate, safely removed because enum value is(and always will be) the same
//   KEEP: gfx.GFXStencilOp.KEEP,
//   REPLACE: gfx.GFXStencilOp.REPLACE,
//   INCR: gfx.GFXStencilOp.INCR,
//   DECR: gfx.GFXStencilOp.DECR,
//   INVERT: gfx.GFXStencilOp.INVERT,
//   INCR_WRAP: gfx.GFXStencilOp.INCR_WRAP,
//   DECR_WRAP: gfx.GFXStencilOp.DECR_WRAP,
//     // comparison function
//   NEVER: gfx.GFXComparisonFunc.NEVER,
//   LESS: gfx.GFXComparisonFunc.LESS,
//   EQUAL: gfx.GFXComparisonFunc.EQUAL,
//   LESS_EQUAL: gfx.GFXComparisonFunc.LESS_EQUAL,
//   GREATER: gfx.GFXComparisonFunc.GREATER,
//   NOT_EQUAL: gfx.GFXComparisonFunc.NOT_EQUAL,
//   GREATER_EQUAL: gfx.GFXComparisonFunc.GREATER_EQUAL,
//   ALWAYS: gfx.GFXComparisonFunc.ALWAYS,
//   // cull mode
//   // NONE: GFXCullMode.NONE, // duplicate, safely removed because enum value is(and always will be) the same
//   FRONT: gfx.GFXCullMode.FRONT,
//   BACK: gfx.GFXCullMode.BACK,
//   // shade mode
//   GOURAND: gfx.GFXShadeModel.GOURAND,
//   FLAT: gfx.GFXShadeModel.FLAT,
//   // polygon mode
//   FILL: gfx.GFXPolygonMode.FILL,
//   LINE: gfx.GFXPolygonMode.LINE,
//   POINT: gfx.GFXPolygonMode.POINT,
//   // primitive mode
//   POINT_LIST: gfx.GFXPrimitiveMode.POINT_LIST,
//   LINE_LIST: gfx.GFXPrimitiveMode.LINE_LIST,
//   LINE_STRIP: gfx.GFXPrimitiveMode.LINE_STRIP,
//   LINE_LOOP: gfx.GFXPrimitiveMode.LINE_LOOP,
//   TRIANGLE_LIST: gfx.GFXPrimitiveMode.TRIANGLE_LIST,
//   TRIANGLE_STRIP: gfx.GFXPrimitiveMode.TRIANGLE_STRIP,
//   TRIANGLE_FAN: gfx.GFXPrimitiveMode.TRIANGLE_FAN,
//   LINE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.LINE_LIST_ADJACENCY,
//   LINE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.LINE_STRIP_ADJACENCY,
//   TRIANGLE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_LIST_ADJACENCY,
//   TRIANGLE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_STRIP_ADJACENCY,
//   TRIANGLE_PATCH_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_PATCH_ADJACENCY,
//   QUAD_PATCH_LIST: gfx.GFXPrimitiveMode.QUAD_PATCH_LIST,
//   ISO_LINE_LIST: gfx.GFXPrimitiveMode.ISO_LINE_LIST,
//   // POINT: gfx.GFXFilter.POINT, // duplicate, safely removed because enum value is(and always will be) the same
//   LINEAR: gfx.GFXFilter.LINEAR,
//   ANISOTROPIC: gfx.GFXFilter.ANISOTROPIC,
//   WRAP: gfx.GFXAddress.WRAP,
//   MIRROR: gfx.GFXAddress.MIRROR,
//   CLAMP: gfx.GFXAddress.CLAMP,
//   BORDER: gfx.GFXAddress.BORDER,
//   VIEWPORT: gfx.GFXDynamicState.VIEWPORT,
//   SCISSOR: gfx.GFXDynamicState.SCISSOR,
//   LINE_WIDTH: gfx.GFXDynamicState.LINE_WIDTH,
//   DEPTH_BIAS: gfx.GFXDynamicState.DEPTH_BIAS,
//   BLEND_CONSTANTS: gfx.GFXDynamicState.BLEND_CONSTANTS,
//   DEPTH_BOUNDS: gfx.GFXDynamicState.DEPTH_BOUNDS,
//   STENCIL_WRITE_MASK: gfx.GFXDynamicState.STENCIL_WRITE_MASK,
//   STENCIL_COMPARE_MASK: gfx.GFXDynamicState.STENCIL_COMPARE_MASK,
//   TRUE: true,
//   FALSE: false
// };

var passParams = {
  BACK: enums.CULL_BACK,
  FRONT: enums.CULL_FRONT,
  NONE: enums.CULL_NONE,
  ADD: enums.BLEND_FUNC_ADD,
  SUB: enums.BLEND_FUNC_SUBTRACT,
  REV_SUB: enums.BLEND_FUNC_REVERSE_SUBTRACT,
  ZERO: enums.BLEND_ZERO,
  ONE: enums.BLEND_ONE,
  SRC_COLOR: enums.BLEND_SRC_COLOR,
  ONE_MINUS_SRC_COLOR: enums.BLEND_ONE_MINUS_SRC_COLOR,
  DST_COLOR: enums.BLEND_DST_COLOR,
  ONE_MINUS_DST_COLOR: enums.BLEND_ONE_MINUS_DST_COLOR,
  SRC_ALPHA: enums.BLEND_SRC_ALPHA,
  ONE_MINUS_SRC_ALPHA: enums.BLEND_ONE_MINUS_SRC_ALPHA,
  DST_ALPHA: enums.BLEND_DST_ALPHA,
  ONE_MINUS_DST_ALPHA: enums.BLEND_ONE_MINUS_DST_ALPHA,
  CONSTANT_COLOR: enums.BLEND_CONSTANT_COLOR,
  ONE_MINUS_CONSTANT_COLOR: enums.BLEND_ONE_MINUS_CONSTANT_COLOR,
  CONSTANT_ALPHA: enums.BLEND_CONSTANT_ALPHA,
  ONE_MINUS_CONSTANT_ALPHA: enums.BLEND_ONE_MINUS_CONSTANT_ALPHA,
  SRC_ALPHA_SATURATE: enums.BLEND_SRC_ALPHA_SATURATE,
  NEVER: enums.DS_FUNC_NEVER,
  LESS: enums.DS_FUNC_LESS,
  EQUAL: enums.DS_FUNC_EQUAL,
  LEQUAL: enums.DS_FUNC_LEQUAL,
  GREATER: enums.DS_FUNC_GREATER,
  NOTEQUAL: enums.DS_FUNC_NOTEQUAL,
  GEQUAL: enums.DS_FUNC_GEQUAL,
  ALWAYS: enums.DS_FUNC_ALWAYS,
  KEEP: enums.STENCIL_OP_KEEP,
  REPLACE: enums.STENCIL_OP_REPLACE,
  INCR: enums.STENCIL_OP_INCR,
  INCR_WRAP: enums.STENCIL_OP_INCR_WRAP,
  DECR: enums.STENCIL_OP_DECR,
  DECR_WRAP: enums.STENCIL_OP_DECR_WRAP,
  INVERT: enums.STENCIL_OP_INVERT
};
Object.assign(passParams, RenderPassStage); // for structural type checking
// an 'any' key will check against all elements defined in that object
// a key start with '$' means its essential, and can't be undefined

var effectStructure = {
  $techniques: [{
    $passes: [{
      depthStencilState: {},
      rasterizerState: {},
      blendState: {
        targets: [{}]
      },
      properties: {
        any: {
          sampler: {},
          inspector: {}
        }
      }
    }]
  }]
};
var mappings = {
  murmurhash2_32_gc: murmurhash2_32_gc,
  SamplerInfoIndex: SamplerInfoIndex,
  effectStructure: effectStructure,
  typeMap: typeMap,
  sizeMap: sizeMap,
  formatMap: formatMap,
  passParams: passParams,
  RenderQueue: RenderQueue,
  RenderPriority: RenderPriority,
  GFXGetTypeSize: GFXGetTypeSize,
  UniformBinding: UniformBinding
};
module.exports = mappings;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxidWlsZFxcbWFwcGluZ3NcXGluZGV4LmpzIl0sIm5hbWVzIjpbImVudW1zIiwiVVNBR0VfU1RBVElDIiwiVVNBR0VfRFlOQU1JQyIsIlVTQUdFX1NUUkVBTSIsIklOREVYX0ZNVF9VSU5UOCIsIklOREVYX0ZNVF9VSU5UMTYiLCJJTkRFWF9GTVRfVUlOVDMyIiwiQVRUUl9QT1NJVElPTiIsIkFUVFJfTk9STUFMIiwiQVRUUl9UQU5HRU5UIiwiQVRUUl9CSVRBTkdFTlQiLCJBVFRSX1dFSUdIVFMiLCJBVFRSX0pPSU5UUyIsIkFUVFJfQ09MT1IiLCJBVFRSX0NPTE9SMCIsIkFUVFJfQ09MT1IxIiwiQVRUUl9VViIsIkFUVFJfVVYwIiwiQVRUUl9VVjEiLCJBVFRSX1VWMiIsIkFUVFJfVVYzIiwiQVRUUl9VVjQiLCJBVFRSX1VWNSIsIkFUVFJfVVY2IiwiQVRUUl9VVjciLCJBVFRSX1RZUEVfSU5UOCIsIkFUVFJfVFlQRV9VSU5UOCIsIkFUVFJfVFlQRV9JTlQxNiIsIkFUVFJfVFlQRV9VSU5UMTYiLCJBVFRSX1RZUEVfSU5UMzIiLCJBVFRSX1RZUEVfVUlOVDMyIiwiQVRUUl9UWVBFX0ZMT0FUMzIiLCJGSUxURVJfTkVBUkVTVCIsIkZJTFRFUl9MSU5FQVIiLCJXUkFQX1JFUEVBVCIsIldSQVBfQ0xBTVAiLCJXUkFQX01JUlJPUiIsIlRFWFRVUkVfRk1UX1JHQl9EWFQxIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQxIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQzIiwiVEVYVFVSRV9GTVRfUkdCQV9EWFQ1IiwiVEVYVFVSRV9GTVRfUkdCX0VUQzEiLCJURVhUVVJFX0ZNVF9SR0JfUFZSVENfMkJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ18yQlBQVjEiLCJURVhUVVJFX0ZNVF9SR0JfUFZSVENfNEJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjEiLCJURVhUVVJFX0ZNVF9BOCIsIlRFWFRVUkVfRk1UX0w4IiwiVEVYVFVSRV9GTVRfTDhfQTgiLCJURVhUVVJFX0ZNVF9SNV9HNl9CNSIsIlRFWFRVUkVfRk1UX1I1X0c1X0I1X0ExIiwiVEVYVFVSRV9GTVRfUjRfRzRfQjRfQTQiLCJURVhUVVJFX0ZNVF9SR0I4IiwiVEVYVFVSRV9GTVRfUkdCQTgiLCJURVhUVVJFX0ZNVF9SR0IxNkYiLCJURVhUVVJFX0ZNVF9SR0JBMTZGIiwiVEVYVFVSRV9GTVRfUkdCMzJGIiwiVEVYVFVSRV9GTVRfUkdCQTMyRiIsIlRFWFRVUkVfRk1UX1IzMkYiLCJURVhUVVJFX0ZNVF8xMTExMTBGIiwiVEVYVFVSRV9GTVRfU1JHQiIsIlRFWFRVUkVfRk1UX1NSR0JBIiwiVEVYVFVSRV9GTVRfRDE2IiwiVEVYVFVSRV9GTVRfRDMyIiwiVEVYVFVSRV9GTVRfRDI0UzgiLCJURVhUVVJFX0ZNVF9SR0JfRVRDMiIsIlRFWFRVUkVfRk1UX1JHQkFfRVRDMiIsIkRTX0ZVTkNfTkVWRVIiLCJEU19GVU5DX0xFU1MiLCJEU19GVU5DX0VRVUFMIiwiRFNfRlVOQ19MRVFVQUwiLCJEU19GVU5DX0dSRUFURVIiLCJEU19GVU5DX05PVEVRVUFMIiwiRFNfRlVOQ19HRVFVQUwiLCJEU19GVU5DX0FMV0FZUyIsIlJCX0ZNVF9SR0JBNCIsIlJCX0ZNVF9SR0I1X0ExIiwiUkJfRk1UX1JHQjU2NSIsIlJCX0ZNVF9EMTYiLCJSQl9GTVRfUzgiLCJSQl9GTVRfRDI0UzgiLCJCTEVORF9GVU5DX0FERCIsIkJMRU5EX0ZVTkNfU1VCVFJBQ1QiLCJCTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QiLCJCTEVORF9aRVJPIiwiQkxFTkRfT05FIiwiQkxFTkRfU1JDX0NPTE9SIiwiQkxFTkRfT05FX01JTlVTX1NSQ19DT0xPUiIsIkJMRU5EX0RTVF9DT0xPUiIsIkJMRU5EX09ORV9NSU5VU19EU1RfQ09MT1IiLCJCTEVORF9TUkNfQUxQSEEiLCJCTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBIiwiQkxFTkRfRFNUX0FMUEhBIiwiQkxFTkRfT05FX01JTlVTX0RTVF9BTFBIQSIsIkJMRU5EX0NPTlNUQU5UX0NPTE9SIiwiQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SIiwiQkxFTkRfQ09OU1RBTlRfQUxQSEEiLCJCTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEiLCJCTEVORF9TUkNfQUxQSEFfU0FUVVJBVEUiLCJTVEVOQ0lMX0RJU0FCTEUiLCJTVEVOQ0lMX0VOQUJMRSIsIlNURU5DSUxfSU5IRVJJVCIsIlNURU5DSUxfT1BfS0VFUCIsIlNURU5DSUxfT1BfWkVSTyIsIlNURU5DSUxfT1BfUkVQTEFDRSIsIlNURU5DSUxfT1BfSU5DUiIsIlNURU5DSUxfT1BfSU5DUl9XUkFQIiwiU1RFTkNJTF9PUF9ERUNSIiwiU1RFTkNJTF9PUF9ERUNSX1dSQVAiLCJTVEVOQ0lMX09QX0lOVkVSVCIsIkNVTExfTk9ORSIsIkNVTExfRlJPTlQiLCJDVUxMX0JBQ0siLCJDVUxMX0ZST05UX0FORF9CQUNLIiwiUFRfUE9JTlRTIiwiUFRfTElORVMiLCJQVF9MSU5FX0xPT1AiLCJQVF9MSU5FX1NUUklQIiwiUFRfVFJJQU5HTEVTIiwiUFRfVFJJQU5HTEVfU1RSSVAiLCJQVF9UUklBTkdMRV9GQU4iLCJSZW5kZXJRdWV1ZSIsIk9QQVFVRSIsIlRSQU5TUEFSRU5UIiwiT1ZFUkxBWSIsIm11cm11cmhhc2gyXzMyX2djIiwic3RyIiwic2VlZCIsImwiLCJsZW5ndGgiLCJoIiwiaSIsImsiLCJjaGFyQ29kZUF0IiwiV2ViR0xFWFQiLCJHRlhPYmplY3RUeXBlIiwiR0ZYU3RhdHVzIiwiR0ZYT2JqZWN0IiwiZ2Z4VHlwZSIsIl9nZnhUeXBlIiwiVU5LTk9XTiIsIl9zdGF0dXMiLCJVTlJFQURZIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJnZXQiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwiR0ZYQXR0cmlidXRlTmFtZSIsIkdGWFR5cGUiLCJHRlhGb3JtYXQiLCJHRlhCdWZmZXJVc2FnZUJpdCIsIkdGWE1lbW9yeVVzYWdlQml0IiwiR0ZYQnVmZmVyQWNjZXNzQml0IiwiR0ZYUHJpbWl0aXZlTW9kZSIsIkdGWFBvbHlnb25Nb2RlIiwiR0ZYU2hhZGVNb2RlbCIsIkdGWEN1bGxNb2RlIiwiR0ZYQ29tcGFyaXNvbkZ1bmMiLCJHRlhTdGVuY2lsT3AiLCJHRlhCbGVuZE9wIiwiR0ZYQmxlbmRGYWN0b3IiLCJHRlhDb2xvck1hc2siLCJHRlhGaWx0ZXIiLCJHRlhBZGRyZXNzIiwiR0ZYVGV4dHVyZVR5cGUiLCJHRlhUZXh0dXJlVXNhZ2VCaXQiLCJHRlhTYW1wbGVDb3VudCIsIkdGWFRleHR1cmVGbGFnQml0IiwiR0ZYVGV4dHVyZVZpZXdUeXBlIiwiR0ZYU2hhZGVyVHlwZSIsIkdGWEJpbmRpbmdUeXBlIiwiR0ZYQ29tbWFuZEJ1ZmZlclR5cGUiLCJHRlhMb2FkT3AiLCJHRlhTdG9yZU9wIiwiR0ZYVGV4dHVyZUxheW91dCIsIkdGWFBpcGVsaW5lQmluZFBvaW50IiwiR0ZYRHluYW1pY1N0YXRlIiwiR0ZYU3RlbmNpbEZhY2UiLCJHRlhRdWV1ZVR5cGUiLCJHRlhDbGVhckZsYWciLCJHRlhHZXRUeXBlU2l6ZSIsInR5cGUiLCJCT09MIiwiSU5UIiwiVUlOVCIsIkZMT0FUIiwiQk9PTDIiLCJJTlQyIiwiVUlOVDIiLCJGTE9BVDIiLCJCT09MMyIsIklOVDMiLCJVSU5UMyIsIkZMT0FUMyIsIkJPT0w0IiwiSU5UNCIsIlVJTlQ0IiwiRkxPQVQ0IiwiTUFUMiIsIk1BVDJYMyIsIk1BVDJYNCIsIk1BVDNYMiIsIk1BVDMiLCJNQVQzWDQiLCJNQVQ0WDIiLCJNQVQ0IiwiU0FNUExFUjFEIiwiU0FNUExFUjFEX0FSUkFZIiwiU0FNUExFUjJEIiwiU0FNUExFUjJEX0FSUkFZIiwiU0FNUExFUjNEIiwiU0FNUExFUl9DVUJFIiwiUmVuZGVyUGFzc1N0YWdlIiwiUmVuZGVyUHJpb3JpdHkiLCJNQVhfQklORElOR19TVVBQT1JURUQiLCJVbmlmb3JtQmluZGluZyIsIl9hIiwiX2IiLCJTYW1wbGVySW5mb0luZGV4IiwidHlwZU1hcCIsInNpemVNYXAiLCJmb3JtYXRNYXAiLCJSMzJJIiwiUkczMkkiLCJSR0IzMkkiLCJSR0JBMzJJIiwiUjMyRiIsIlJHMzJGIiwiUkdCMzJGIiwiUkdCQTMyRiIsInBhc3NQYXJhbXMiLCJCQUNLIiwiRlJPTlQiLCJOT05FIiwiQUREIiwiU1VCIiwiUkVWX1NVQiIsIlpFUk8iLCJPTkUiLCJTUkNfQ09MT1IiLCJPTkVfTUlOVVNfU1JDX0NPTE9SIiwiRFNUX0NPTE9SIiwiT05FX01JTlVTX0RTVF9DT0xPUiIsIlNSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQUxQSEEiLCJEU1RfQUxQSEEiLCJPTkVfTUlOVVNfRFNUX0FMUEhBIiwiQ09OU1RBTlRfQ09MT1IiLCJPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1IiLCJDT05TVEFOVF9BTFBIQSIsIk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSIsIlNSQ19BTFBIQV9TQVRVUkFURSIsIk5FVkVSIiwiTEVTUyIsIkVRVUFMIiwiTEVRVUFMIiwiR1JFQVRFUiIsIk5PVEVRVUFMIiwiR0VRVUFMIiwiQUxXQVlTIiwiS0VFUCIsIlJFUExBQ0UiLCJJTkNSIiwiSU5DUl9XUkFQIiwiREVDUiIsIkRFQ1JfV1JBUCIsIklOVkVSVCIsImFzc2lnbiIsImVmZmVjdFN0cnVjdHVyZSIsIiR0ZWNobmlxdWVzIiwiJHBhc3NlcyIsImRlcHRoU3RlbmNpbFN0YXRlIiwicmFzdGVyaXplclN0YXRlIiwiYmxlbmRTdGF0ZSIsInRhcmdldHMiLCJwcm9wZXJ0aWVzIiwiYW55Iiwic2FtcGxlciIsImluc3BlY3RvciIsIm1hcHBpbmdzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNQSxLQUFLLEdBQUc7QUFDWjtBQUNBQyxFQUFBQSxZQUFZLEVBQUUsS0FGRjtBQUVVO0FBQ3RCQyxFQUFBQSxhQUFhLEVBQUUsS0FISDtBQUdVO0FBQ3RCQyxFQUFBQSxZQUFZLEVBQUUsS0FKRjtBQUlVO0FBRXRCO0FB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QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsT0FBRCxDQUFQLEdBQW1CLEVBQXBCLENBQVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsT0FBRCxDQUFQLEdBQW1CLEVBQXBCLENBQVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsT0FBRCxDQUFQLEdBQW1CLEVBQXBCLENBQVAsR0FBaUMsT0FBakM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CLEVBQXJCLENBQVAsR0FBa0MsUUFBbEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsTUFBRCxDQUFQLEdBQWtCLEVBQW5CLENBQVAsR0FBZ0MsTUFBaEM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsV0FBRCxDQUFQLEdBQXVCLEVBQXhCLENBQVAsR0FBcUMsV0FBckM7QUFDQUEsRUFBQUEsT0FBTyxDQUFDQSxPQUFPLENBQUMsaUJBQUQsQ0FBUCxHQUE2QixFQUE5QixDQUFQLEdBQTJDLGlCQUEzQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxXQUFELENBQVAsR0FBdUIsRUFBeEIsQ0FBUCxHQUFxQyxXQUFyQztBQUNBQSxFQUFBQSxPQUFPLENBQUNBLE9BQU8sQ0FBQyxpQkFBRCxDQUFQLEdBQTZCLEVBQTlCLENBQVAsR0FBMkMsaUJBQTNDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLFdBQUQsQ0FBUCxHQUF1QixFQUF4QixDQUFQLEdBQXFDLFdBQXJDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLGNBQUQsQ0FBUCxHQUEwQixFQUEzQixDQUFQLEdBQXdDLGNBQXhDO0FBQ0FBLEVBQUFBLE9BQU8sQ0FBQ0EsT0FBTyxDQUFDLE9BQUQsQ0FBUCxHQUFtQixFQUFwQixDQUFQLEdBQWlDLE9BQWpDO0FBQ0gsQ0FuQ0QsRUFtQ0dBLE9BQU8sS0FBS0EsT0FBTyxHQUFHLEVBQWYsQ0FuQ1Y7O0FBb0NBLElBQUlDLFNBQUo7O0FBQ0EsQ0FBQyxVQUFVQSxTQUFWLEVBQXFCO0FBQ2xCQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsQ0FBeEIsQ0FBVCxHQUFzQyxTQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsQ0FBcEIsQ0FBVCxHQUFrQyxLQUFsQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxJQUFELENBQVQsR0FBa0IsQ0FBbkIsQ0FBVCxHQUFpQyxJQUFqQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsQ0FBcEIsQ0FBVCxHQUFrQyxLQUFsQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsQ0FBckIsQ0FBVCxHQUFtQyxNQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsQ0FBdEIsQ0FBVCxHQUFvQyxPQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxLQUFELENBQVQsR0FBbUIsRUFBcEIsQ0FBVCxHQUFtQyxLQUFuQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxNQUFELENBQVQsR0FBb0IsRUFBckIsQ0FBVCxHQUFvQyxNQUFwQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxVQUFELENBQVQsR0FBd0IsRUFBekIsQ0FBVCxHQUF3QyxVQUF4QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxTQUFELENBQVQsR0FBdUIsRUFBeEIsQ0FBVCxHQUF1QyxTQUF2QyxDQTlDa0IsQ0ErQ2xCOztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxZQUFELENBQVQsR0FBMEIsRUFBM0IsQ0FBVCxHQUEwQyxZQUExQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxRQUFELENBQVQsR0FBc0IsRUFBdkIsQ0FBVCxHQUFzQyxRQUF0QztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMsQ0FBQyxPQUFELENBQVQsR0FBcUIsRUFBdEIsQ0FBVCxHQUFxQyxPQUFyQztBQUNBQSxFQUFBQSxTQUFTLENBQUNBLFNBQVMs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QUMsS0FBRCxDQUFULEdBQW1CLEVBQXBCLENBQVQsR0FBbUMsS0FBbkM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEMsQ0F4RmtCLENBeUZsQjs7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsY0FBRCxDQUFULEdBQTRCLEVBQTdCLENBQVQsR0FBNEMsY0FBNUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsZUFBRCxDQUFULEdBQTZCLEVBQTlCLENBQVQsR0FBNkMsZUFBN0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVBQTNCLENBQVQsR0FBMEMsWUFBMUM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsZUFBRCxDQUFULEdBQTZCLEVBQTlCLENBQVQsR0FBNkMsZUFBN0M7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsU0FBRCxDQUFULEdBQXVCLEVBQXhCLENBQVQsR0FBdUMsU0FBdkM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsV0FBRCxDQUFULEdBQXlCLEVBQTFCLENBQVQsR0FBeUMsV0FBekM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsVUFBRCxDQUFULEdBQXdCLEVBQXpCLENBQVQsR0FBd0MsVUFBeEM7QUFDQUEsRUFBQUEsU0FBUyxDQUFDQSxTQUFTLENBQUMsWUFBRCxDQUFULEdBQTBCLEVB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L1xyXG5jb25zdCBlbnVtcyA9IHtcclxuICAvLyBidWZmZXIgdXNhZ2VcclxuICBVU0FHRV9TVEFUSUM6IDM1MDQ0LCAgLy8gZ2wuU1RBVElDX0RSQVdcclxuICBVU0FHRV9EWU5BTUlDOiAzNTA0OCwgLy8gZ2wuRFlOQU1JQ19EUkFXXHJcbiAgVVNBR0VfU1RSRUFNOiAzNTA0MCwgIC8vIGdsLlNUUkVBTV9EUkFXXHJcblxyXG4gIC8vIGluZGV4IGJ1ZmZlciBmb3JtYXRcclxuICBJTkRFWF9GTVRfVUlOVDg6IDUxMjEsICAvLyBnbC5VTlNJR05FRF9CWVRFXHJcbiAgSU5ERVhfRk1UX1VJTlQxNjogNTEyMywgLy8gZ2wuVU5TSUdORURfU0hPUlRcclxuICBJTkRFWF9GTVRfVUlOVDMyOiA1MTI1LCAvLyBnbC5VTlNJR05FRF9JTlQgKE9FU19lbGVtZW50X2luZGV4X3VpbnQpXHJcblxyXG4gIC8vIHZlcnRleCBhdHRyaWJ1dGUgc2VtYW50aWNcclxuICBBVFRSX1BPU0lUSU9OOiAnYV9wb3NpdGlvbicsXHJcbiAgQVRUUl9OT1JNQUw6ICdhX25vcm1hbCcsXHJcbiAgQVRUUl9UQU5HRU5UOiAnYV90YW5nZW50JyxcclxuICBBVFRSX0JJVEFOR0VOVDogJ2FfYml0YW5nZW50JyxcclxuICBBVFRSX1dFSUdIVFM6ICdhX3dlaWdodHMnLFxyXG4gIEFUVFJfSk9JTlRTOiAnYV9qb2ludHMnLFxyXG4gIEFUVFJfQ09MT1I6ICdhX2NvbG9yJyxcclxuICBBVFRSX0NPTE9SMDogJ2FfY29sb3IwJyxcclxuICBBVFRSX0NPTE9SMTogJ2FfY29sb3IxJyxcclxuICBBVFRSX1VWOiAnYV91dicsXHJcbiAgQVRUUl9VVjA6ICdhX3V2MCcsXHJcbiAgQVRUUl9VVjE6ICdhX3V2MScsXHJcbiAgQVRUUl9VVjI6ICdhX3V2MicsXHJcbiAgQVRUUl9VVjM6ICdhX3V2MycsXHJcbiAgQVRUUl9VVjQ6ICdhX3V2NCcsXHJcbiAgQVRUUl9VVjU6ICdhX3V2NScsXHJcbiAgQVRUUl9VVjY6ICdhX3V2NicsXHJcbiAgQVRUUl9VVjc6ICdhX3V2NycsXHJcblxyXG4gIC8vIHZlcnRleCBhdHRyaWJ1dGUgdHlwZVxyXG4gIEFUVFJfVFlQRV9JTlQ4OiA1MTIwLCAgICAvLyBnbC5CWVRFXHJcbiAgQVRUUl9UWVBFX1VJTlQ4OiA1MTIxLCAgIC8vIGdsLlVOU0lHTkVEX0JZVEVcclxuICBBVFRSX1RZUEVfSU5UMTY6IDUxMjIsICAgLy8gZ2wuU0hPUlRcclxuICBBVFRSX1RZUEVfVUlOVDE2OiA1MTIzLCAgLy8gZ2wuVU5TSUdORURfU0hPUlRcclxuICBBVFRSX1RZUEVfSU5UMzI6IDUxMjQsICAgLy8gZ2wuSU5UXHJcbiAgQVRUUl9UWVBFX1VJTlQzMjogNTEyNSwgIC8vIGdsLlVOU0lHTkVEX0lOVFxyXG4gIEFUVFJfVFlQRV9GTE9BVDMyOiA1MTI2LCAvLyBnbC5GTE9BVFxyXG5cclxuICAvLyB0ZXh0dXJlIGZpbHRlclxyXG4gIEZJTFRFUl9ORUFSRVNUOiAwLFxyXG4gIEZJTFRFUl9MSU5FQVI6IDEsXHJcblxyXG4gIC8vIHRleHR1cmUgd3JhcCBtb2RlXHJcbiAgV1JBUF9SRVBFQVQ6IDEwNDk3LCAvLyBnbC5SRVBFQVRcclxuICBXUkFQX0NMQU1QOiAzMzA3MSwgIC8vIGdsLkNMQU1QX1RPX0VER0VcclxuICBXUkFQX01JUlJPUjogMzM2NDgsIC8vIGdsLk1JUlJPUkVEX1JFUEVBVFxyXG5cclxuICAvLyB0ZXh0dXJlIGZvcm1hdFxyXG4gIC8vIGNvbXByZXNzIGZvcm1hdHNcclxuICBURVhUVVJFX0ZNVF9SR0JfRFhUMTogMCxcclxuICBURVhUVVJFX0ZNVF9SR0JBX0RYVDE6IDEsXHJcbiAgVEVYVFVSRV9GTVRfUkdCQV9EWFQzOiAyLFxyXG4gIFRFWFRVUkVfRk1UX1JHQkFfRFhUNTogMyxcclxuICBURVhUVVJFX0ZNVF9SR0JfRVRDMTogNCxcclxuICBURVhUVVJFX0ZNVF9SR0JfUFZSVENfMkJQUFYxOiA1LFxyXG4gIFRFWFRVUkVfRk1UX1JHQkFfUFZSVENfMkJQUFYxOiA2LFxyXG4gIFRFWFRVUkVfRk1UX1JHQl9QVlJUQ180QlBQVjE6IDcsXHJcbiAgVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjE6IDgsXHJcblxyXG4gIC8vIG5vcm1hbCBmb3JtYXRzXHJcbiAgVEVYVFVSRV9GTVRfQTg6IDksXHJcbiAgVEVYVFVSRV9GTVRfTDg6IDEwLFxyXG4gIFRFWFRVUkVfRk1UX0w4X0E4OiAxMSxcclxuICBURVhUVVJFX0ZNVF9SNV9HNl9CNTogMTIsXHJcbiAgVEVYVFVSRV9GTVRfUjVfRzVfQjVfQTE6IDEzLFxyXG4gIFRFWFRVUkVfRk1UX1I0X0c0X0I0X0E0OiAxNCxcclxuICBURVhUVVJFX0ZNVF9SR0I4OiAxNSxcclxuICBURVhUVVJFX0ZNVF9SR0JBODogMTYsXHJcbiAgVEVYVFVSRV9GTVRfUkdCMTZGOiAxNyxcclxuICBURVhUVVJFX0ZNVF9SR0JBMTZGOiAxOCxcclxuICBURVhUVVJFX0ZNVF9SR0IzMkY6IDE5LFxyXG4gIFRFWFRVUkVfRk1UX1JHQkEzMkY6IDIwLFxyXG4gIFRFWFRVUkVfRk1UX1IzMkY6IDIxLFxyXG4gIFRFWFRVUkVfRk1UXzExMTExMEY6IDIyLFxyXG4gIFRFWFRVUkVfRk1UX1NSR0I6IDIzLFxyXG4gIFRFWFRVUkVfRk1UX1NSR0JBOiAyNCxcclxuXHJcbiAgLy8gZGVwdGggZm9ybWF0c1xyXG4gIFRFWFRVUkVfRk1UX0QxNjogMjUsXHJcbiAgVEVYVFVSRV9GTVRfRDMyOiAyNixcclxuICBURVhUVVJFX0ZNVF9EMjRTODogMjcsXHJcblxyXG4gIC8vIGV0YzIgZm9ybWF0XHJcbiAgVEVYVFVSRV9GTVRfUkdCX0VUQzI6IDI4LFxyXG4gIFRFWFRVUkVfRk1UX1JHQkFfRVRDMjogMjksXHJcblxyXG4gIC8vIGRlcHRoIGFuZCBzdGVuY2lsIGZ1bmN0aW9uXHJcbiAgRFNfRlVOQ19ORVZFUjogNTEyLCAgICAvLyBnbC5ORVZFUlxyXG4gIERTX0ZVTkNfTEVTUzogNTEzLCAgICAgLy8gZ2wuTEVTU1xyXG4gIERTX0ZVTkNfRVFVQUw6IDUxNCwgICAgLy8gZ2wuRVFVQUxcclxuICBEU19GVU5DX0xFUVVBTDogNTE1LCAgIC8vIGdsLkxFUVVBTFxyXG4gIERTX0ZVTkNfR1JFQVRFUjogNTE2LCAgLy8gZ2wuR1JFQVRFUlxyXG4gIERTX0ZVTkNfTk9URVFVQUw6IDUxNywgLy8gZ2wuTk9URVFVQUxcclxuICBEU19GVU5DX0dFUVVBTDogNTE4LCAgIC8vIGdsLkdFUVVBTFxyXG4gIERTX0ZVTkNfQUxXQVlTOiA1MTksICAgLy8gZ2wuQUxXQVlTXHJcblxyXG4gIC8vIHJlbmRlci1idWZmZXIgZm9ybWF0XHJcbiAgUkJfRk1UX1JHQkE0OiAzMjg1NCwgICAgLy8gZ2wuUkdCQTRcclxuICBSQl9GTVRfUkdCNV9BMTogMzI4NTUsICAvLyBnbC5SR0I1X0ExXHJcbiAgUkJfRk1UX1JHQjU2NTogMzYxOTQsICAgLy8gZ2wuUkdCNTY1XHJcbiAgUkJfRk1UX0QxNjogMzMxODksICAgICAgLy8gZ2wuREVQVEhfQ09NUE9ORU5UMTZcclxuICBSQl9GTVRfUzg6IDM2MTY4LCAgICAgICAvLyBnbC5TVEVOQ0lMX0lOREVYOFxyXG4gIFJCX0ZNVF9EMjRTODogMzQwNDEsICAgIC8vIGdsLkRFUFRIX1NURU5DSUxcclxuXHJcbiAgLy8gYmxlbmQtZXF1YXRpb25cclxuICBCTEVORF9GVU5DX0FERDogMzI3NzQsICAgICAgICAgICAgICAvLyBnbC5GVU5DX0FERFxyXG4gIEJMRU5EX0ZVTkNfU1VCVFJBQ1Q6IDMyNzc4LCAgICAgICAgIC8vIGdsLkZVTkNfU1VCVFJBQ1RcclxuICBCTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1Q6IDMyNzc5LCAvLyBnbC5GVU5DX1JFVkVSU0VfU1VCVFJBQ1RcclxuXHJcbiAgLy8gYmxlbmRcclxuICBCTEVORF9aRVJPOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2wuWkVST1xyXG4gIEJMRU5EX09ORTogMSwgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnbC5PTkVcclxuICBCTEVORF9TUkNfQ09MT1I6IDc2OCwgICAgICAgICAgICAgICAgICAgLy8gZ2wuU1JDX0NPTE9SXHJcbiAgQkxFTkRfT05FX01JTlVTX1NSQ19DT0xPUjogNzY5LCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19TUkNfQ09MT1JcclxuICBCTEVORF9EU1RfQ09MT1I6IDc3NCwgICAgICAgICAgICAgICAgICAgLy8gZ2wuRFNUX0NPTE9SXHJcbiAgQkxFTkRfT05FX01JTlVTX0RTVF9DT0xPUjogNzc1LCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19EU1RfQ09MT1JcclxuICBCTEVORF9TUkNfQUxQSEE6IDc3MCwgICAgICAgICAgICAgICAgICAgLy8gZ2wuU1JDX0FMUEhBXHJcbiAgQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQTogNzcxLCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19TUkNfQUxQSEFcclxuICBCTEVORF9EU1RfQUxQSEE6IDc3MiwgICAgICAgICAgICAgICAgICAgLy8gZ2wuRFNUX0FMUEhBXHJcbiAgQkxFTkRfT05FX01JTlVTX0RTVF9BTFBIQTogNzczLCAgICAgICAgIC8vIGdsLk9ORV9NSU5VU19EU1RfQUxQSEFcclxuICBCTEVORF9DT05TVEFOVF9DT0xPUjogMzI3NjksICAgICAgICAgICAgLy8gZ2wuQ09OU1RBTlRfQ09MT1JcclxuICBCTEVORF9PTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IDMyNzcwLCAgLy8gZ2wuT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SXHJcbiAgQkxFTkRfQ09OU1RBTlRfQUxQSEE6IDMyNzcxLCAgICAgICAgICAgIC8vIGdsLkNPTlNUQU5UX0FMUEhBXHJcbiAgQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBOiAzMjc3MiwgIC8vIGdsLk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQVxyXG4gIEJMRU5EX1NSQ19BTFBIQV9TQVRVUkFURTogNzc2LCAgICAgICAgICAvLyBnbC5TUkNfQUxQSEFfU0FUVVJBVEVcclxuXHJcbiAgLy8gc3RlbmNpbCBvcGVyYXRpb25cclxuICBTVEVOQ0lMX0RJU0FCTEU6IDAsICAgICAgICAgICAgIC8vIGRpc2FibGUgc3RlbmNpbFxyXG4gIFNURU5DSUxfRU5BQkxFOiAxLCAgICAgICAgICAgICAgLy8gZW5hYmxlIHN0ZW5jaWxcclxuICBTVEVOQ0lMX0lOSEVSSVQ6IDIsICAgICAgICAgICAgIC8vIGluaGVyaXQgc3RlbmNpbCBzdGF0ZXNcclxuXHJcbiAgU1RFTkNJTF9PUF9LRUVQOiA3NjgwLCAgICAgICAgICAvLyBnbC5LRUVQXHJcbiAgU1RFTkNJTF9PUF9aRVJPOiAwLCAgICAgICAgICAgICAvLyBnbC5aRVJPXHJcbiAgU1RFTkNJTF9PUF9SRVBMQUNFOiA3NjgxLCAgICAgICAvLyBnbC5SRVBMQUNFXHJcbiAgU1RFTkNJTF9PUF9JTkNSOiA3NjgyLCAgICAgICAgICAvLyBnbC5JTkNSXHJcbiAgU1RFTkNJTF9PUF9JTkNSX1dSQVA6IDM0MDU1LCAgICAvLyBnbC5JTkNSX1dSQVBcclxuICBTVEVOQ0lMX09QX0RFQ1I6IDc2ODMsICAgICAgICAgIC8vIGdsLkRFQ1JcclxuICBTVEVOQ0lMX09QX0RFQ1JfV1JBUDogMzQwNTYsICAgIC8vIGdsLkRFQ1JfV1JBUFxyXG4gIFNURU5DSUxfT1BfSU5WRVJUOiA1Mzg2LCAgICAgICAgLy8gZ2wuSU5WRVJUXHJcblxyXG4gIC8vIGN1bGxcclxuICBDVUxMX05PTkU6IDAsXHJcbiAgQ1VMTF9GUk9OVDogMTAyOCxcclxuICBDVUxMX0JBQ0s6IDEwMjksXHJcbiAgQ1VMTF9GUk9OVF9BTkRfQkFDSzogMTAzMixcclxuXHJcbiAgLy8gcHJpbWl0aXZlIHR5cGVcclxuICBQVF9QT0lOVFM6IDAsICAgICAgICAgLy8gZ2wuUE9JTlRTXHJcbiAgUFRfTElORVM6IDEsICAgICAgICAgIC8vIGdsLkxJTkVTXHJcbiAgUFRfTElORV9MT09QOiAyLCAgICAgIC8vIGdsLkxJTkVfTE9PUFxyXG4gIFBUX0xJTkVfU1RSSVA6IDMsICAgICAvLyBnbC5MSU5FX1NUUklQXHJcbiAgUFRfVFJJQU5HTEVTOiA0LCAgICAgIC8vIGdsLlRSSUFOR0xFU1xyXG4gIFBUX1RSSUFOR0xFX1NUUklQOiA1LCAvLyBnbC5UUklBTkdMRV9TVFJJUFxyXG4gIFBUX1RSSUFOR0xFX0ZBTjogNiwgICAvLyBnbC5UUklBTkdMRV9GQU5cclxufTtcclxuXHJcbmxldCBSZW5kZXJRdWV1ZSA9IHtcclxuICAgIE9QQVFVRTogMCxcclxuICAgIFRSQU5TUEFSRU5UOiAxLFxyXG4gICAgT1ZFUkxBWTogMlxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEpTIEltcGxlbWVudGF0aW9uIG9mIE11cm11ckhhc2gyXHJcbiAqIFxyXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86Z2FyeS5jb3VydEBnbWFpbC5jb21cIj5HYXJ5IENvdXJ0PC9hPlxyXG4gKiBAc2VlIGh0dHA6Ly9naXRodWIuY29tL2dhcnljb3VydC9tdXJtdXJoYXNoLWpzXHJcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzphYXBwbGVieUBnbWFpbC5jb21cIj5BdXN0aW4gQXBwbGVieTwvYT5cclxuICogQHNlZSBodHRwOi8vc2l0ZXMuZ29vZ2xlLmNvbS9zaXRlL211cm11cmhhc2gvXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIEFTQ0lJIG9ubHlcclxuICogQHBhcmFtIHtudW1iZXJ9IHNlZWQgUG9zaXRpdmUgaW50ZWdlciBvbmx5XHJcbiAqIEByZXR1cm4ge251bWJlcn0gMzItYml0IHBvc2l0aXZlIGludGVnZXIgaGFzaFxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG11cm11cmhhc2gyXzMyX2djKHN0ciwgc2VlZCkge1xyXG4gIHZhclxyXG4gICAgbCA9IHN0ci5sZW5ndGgsXHJcbiAgICBoID0gc2VlZCBeIGwsXHJcbiAgICBpID0gMCxcclxuICAgIGs7XHJcbiAgXHJcbiAgd2hpbGUgKGwgPj0gNCkge1xyXG4gIFx0ayA9IFxyXG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikpIHxcclxuICBcdCAgKChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgOCkgfFxyXG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAxNikgfFxyXG4gIFx0ICAoKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAyNCk7XHJcbiAgICBcclxuICAgIGsgPSAoKChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xyXG4gICAgayBePSBrID4+PiAyNDtcclxuICAgIGsgPSAoKChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUpICsgKCgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUpICYgMHhmZmZmKSA8PCAxNikpO1xyXG5cclxuXHRoID0gKCgoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1KSArICgoKChoID4+PiAxNikgKiAweDViZDFlOTk1KSAmIDB4ZmZmZikgPDwgMTYpKSBeIGs7XHJcblxyXG4gICAgbCAtPSA0O1xyXG4gICAgKytpO1xyXG4gIH1cclxuICBcclxuICBzd2l0Y2ggKGwpIHtcclxuICBjYXNlIDM6IGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAyKSAmIDB4ZmYpIDw8IDE2O1xyXG4gIGNhc2UgMjogaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpICYgMHhmZikgPDwgODtcclxuICBjYXNlIDE6IGggXj0gKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZik7XHJcbiAgICAgICAgICBoID0gKCgoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1KSArICgoKChoID4+PiAxNikgKiAweDViZDFlOTk1KSAmIDB4ZmZmZikgPDwgMTYpKTtcclxuICB9XHJcblxyXG4gIGggXj0gaCA+Pj4gMTM7XHJcbiAgaCA9ICgoKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSkgKyAoKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSkgJiAweGZmZmYpIDw8IDE2KSk7XHJcbiAgaCBePSBoID4+PiAxNTtcclxuXHJcbiAgcmV0dXJuIGggPj4+IDA7XHJcbn1cclxuXHJcbi8vIEV4dGVuc2lvbnNcclxudmFyIFdlYkdMRVhUO1xyXG4oZnVuY3Rpb24gKFdlYkdMRVhUKSB7XHJcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFRcIl0gPSAzMzc3Nl0gPSBcIkNPTVBSRVNTRURfUkdCX1MzVENfRFhUMV9FWFRcIjtcclxuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUMV9FWFRcIl0gPSAzMzc3N10gPSBcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDFfRVhUXCI7XHJcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCQV9TM1RDX0RYVDNfRVhUXCJdID0gMzM3NzhdID0gXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQzX0VYVFwiO1xyXG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQkFfUzNUQ19EWFQ1X0VYVFwiXSA9IDMzNzc5XSA9IFwiQ09NUFJFU1NFRF9SR0JBX1MzVENfRFhUNV9FWFRcIjtcclxuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9TUkdCX1MzVENfRFhUMV9FWFRcIl0gPSAzNTkxNl0gPSBcIkNPTVBSRVNTRURfU1JHQl9TM1RDX0RYVDFfRVhUXCI7XHJcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDFfRVhUXCJdID0gMzU5MTddID0gXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQxX0VYVFwiO1xyXG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1NSR0JfQUxQSEFfUzNUQ19EWFQzX0VYVFwiXSA9IDM1OTE4XSA9IFwiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUM19FWFRcIjtcclxuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9TUkdCX0FMUEhBX1MzVENfRFhUNV9FWFRcIl0gPSAzNTkxOV0gPSBcIkNPTVBSRVNTRURfU1JHQl9BTFBIQV9TM1RDX0RYVDVfRVhUXCI7XHJcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUdcIl0gPSAzNTg0MF0gPSBcIkNPTVBSRVNTRURfUkdCX1BWUlRDXzRCUFBWMV9JTUdcIjtcclxuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JfUFZSVENfMkJQUFYxX0lNR1wiXSA9IDM1ODQxXSA9IFwiQ09NUFJFU1NFRF9SR0JfUFZSVENfMkJQUFYxX0lNR1wiO1xyXG4gICAgV2ViR0xFWFRbV2ViR0xFWFRbXCJDT01QUkVTU0VEX1JHQkFfUFZSVENfNEJQUFYxX0lNR1wiXSA9IDM1ODQyXSA9IFwiQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzRCUFBWMV9JTUdcIjtcclxuICAgIFdlYkdMRVhUW1dlYkdMRVhUW1wiQ09NUFJFU1NFRF9SR0JBX1BWUlRDXzJCUFBWMV9JTUdcIl0gPSAzNTg0M10gPSBcIkNPTVBSRVNTRURfUkdCQV9QVlJUQ18yQlBQVjFfSU1HXCI7XHJcbiAgICBXZWJHTEVYVFtXZWJHTEVYVFtcIkNPTVBSRVNTRURfUkdCX0VUQzFfV0VCR0xcIl0gPSAzNjE5Nl0gPSBcIkNPTVBSRVNTRURfUkdCX0VUQzFfV0VCR0xcIjtcclxufSkoV2ViR0xFWFQgfHwgKFdlYkdMRVhUID0ge30pKTtcclxudmFyIEdGWE9iamVjdFR5cGU7XHJcbihmdW5jdGlvbiAoR0ZYT2JqZWN0VHlwZSkge1xyXG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiVU5LTk9XTlwiXSA9IDBdID0gXCJVTktOT1dOXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJCVUZGRVJcIl0gPSAxXSA9IFwiQlVGRkVSXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJURVhUVVJFXCJdID0gMl0gPSBcIlRFWFRVUkVcIjtcclxuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlRFWFRVUkVfVklFV1wiXSA9IDNdID0gXCJURVhUVVJFX1ZJRVdcIjtcclxuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlJFTkRFUl9QQVNTXCJdID0gNF0gPSBcIlJFTkRFUl9QQVNTXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJGUkFNRUJVRkZFUlwiXSA9IDVdID0gXCJGUkFNRUJVRkZFUlwiO1xyXG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiU0FNUExFUlwiXSA9IDZdID0gXCJTQU1QTEVSXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJTSEFERVJcIl0gPSA3XSA9IFwiU0hBREVSXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJQSVBFTElORV9MQVlPVVRcIl0gPSA4XSA9IFwiUElQRUxJTkVfTEFZT1VUXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJQSVBFTElORV9TVEFURVwiXSA9IDldID0gXCJQSVBFTElORV9TVEFURVwiO1xyXG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiQklORElOR19MQVlPVVRcIl0gPSAxMF0gPSBcIkJJTkRJTkdfTEFZT1VUXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJJTlBVVF9BU1NFTUJMRVJcIl0gPSAxMV0gPSBcIklOUFVUX0FTU0VNQkxFUlwiO1xyXG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiQ09NTUFORF9BTExPQ0FUT1JcIl0gPSAxMl0gPSBcIkNPTU1BTkRfQUxMT0NBVE9SXCI7XHJcbiAgICBHRlhPYmplY3RUeXBlW0dGWE9iamVjdFR5cGVbXCJDT01NQU5EX0JVRkZFUlwiXSA9IDEzXSA9IFwiQ09NTUFORF9CVUZGRVJcIjtcclxuICAgIEdGWE9iamVjdFR5cGVbR0ZYT2JqZWN0VHlwZVtcIlFVRVVFXCJdID0gMTRdID0gXCJRVUVVRVwiO1xyXG4gICAgR0ZYT2JqZWN0VHlwZVtHRlhPYmplY3RUeXBlW1wiV0lORE9XXCJdID0gMTVdID0gXCJXSU5ET1dcIjtcclxufSkoR0ZYT2JqZWN0VHlwZSB8fCAoR0ZYT2JqZWN0VHlwZSA9IHt9KSk7XHJcbnZhciBHRlhTdGF0dXM7XHJcbihmdW5jdGlvbiAoR0ZYU3RhdHVzKSB7XHJcbiAgICBHRlhTdGF0dXNbR0ZYU3RhdHVzW1wiVU5SRUFEWVwiXSA9IDBdID0gXCJVTlJFQURZXCI7XHJcbiAgICBHRlhTdGF0dXNbR0ZYU3RhdHVzW1wiRkFJTEVEXCJdID0gMV0gPSBcIkZBSUxFRFwiO1xyXG4gICAgR0ZYU3RhdHVzW0dGWFN0YXR1c1tcIlNVQ0NFU1NcIl0gPSAyXSA9IFwiU1VDQ0VTU1wiO1xyXG59KShHRlhTdGF0dXMgfHwgKEdGWFN0YXR1cyA9IHt9KSk7XHJcbnZhciBHRlhPYmplY3QgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBHRlhPYmplY3QoZ2Z4VHlwZSkge1xyXG4gICAgICAgIHRoaXMuX2dmeFR5cGUgPSBHRlhPYmplY3RUeXBlLlVOS05PV047XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gR0ZYU3RhdHVzLlVOUkVBRFk7XHJcbiAgICAgICAgdGhpcy5fZ2Z4VHlwZSA9IGdmeFR5cGU7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0ZYT2JqZWN0LnByb3RvdHlwZSwgXCJnZnhUeXBlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dmeFR5cGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoR0ZYT2JqZWN0LnByb3RvdHlwZSwgXCJzdGF0dXNcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEdGWE9iamVjdDtcclxufSgpKTtcclxudmFyIEdGWEF0dHJpYnV0ZU5hbWU7XHJcbihmdW5jdGlvbiAoR0ZYQXR0cmlidXRlTmFtZSkge1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfUE9TSVRJT05cIl0gPSBcImFfcG9zaXRpb25cIjtcclxuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX05PUk1BTFwiXSA9IFwiYV9ub3JtYWxcIjtcclxuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RBTkdFTlRcIl0gPSBcImFfdGFuZ2VudFwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQklUQU5HRU5UXCJdID0gXCJhX2JpdGFuZ2VudFwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfV0VJR0hUU1wiXSA9IFwiYV93ZWlnaHRzXCI7XHJcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9KT0lOVFNcIl0gPSBcImFfam9pbnRzXCI7XHJcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9DT0xPUlwiXSA9IFwiYV9jb2xvclwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQ09MT1IxXCJdID0gXCJhX2NvbG9yMVwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfQ09MT1IyXCJdID0gXCJhX2NvbG9yMlwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEXCJdID0gXCJhX3RleENvb3JkXCI7XHJcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQxXCJdID0gXCJhX3RleENvb3JkMVwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEMlwiXSA9IFwiYV90ZXhDb29yZDJcIjtcclxuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDNcIl0gPSBcImFfdGV4Q29vcmQzXCI7XHJcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQ0XCJdID0gXCJhX3RleENvb3JkNFwiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JENVwiXSA9IFwiYV90ZXhDb29yZDVcIjtcclxuICAgIEdGWEF0dHJpYnV0ZU5hbWVbXCJBVFRSX1RFWF9DT09SRDZcIl0gPSBcImFfdGV4Q29vcmQ2XCI7XHJcbiAgICBHRlhBdHRyaWJ1dGVOYW1lW1wiQVRUUl9URVhfQ09PUkQ3XCJdID0gXCJhX3RleENvb3JkN1wiO1xyXG4gICAgR0ZYQXR0cmlidXRlTmFtZVtcIkFUVFJfVEVYX0NPT1JEOFwiXSA9IFwiYV90ZXhDb29yZDhcIjtcclxufSkoR0ZYQXR0cmlidXRlTmFtZSB8fCAoR0ZYQXR0cmlidXRlTmFtZSA9IHt9KSk7XHJcbnZhciBHRlhUeXBlO1xyXG4oZnVuY3Rpb24gKEdGWFR5cGUpIHtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVOS05PV05cIl0gPSAwXSA9IFwiVU5LTk9XTlwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQk9PTFwiXSA9IDFdID0gXCJCT09MXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJCT09MMlwiXSA9IDJdID0gXCJCT09MMlwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQk9PTDNcIl0gPSAzXSA9IFwiQk9PTDNcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkJPT0w0XCJdID0gNF0gPSBcIkJPT0w0XCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJJTlRcIl0gPSA1XSA9IFwiSU5UXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJJTlQyXCJdID0gNl0gPSBcIklOVDJcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIklOVDNcIl0gPSA3XSA9IFwiSU5UM1wiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiSU5UNFwiXSA9IDhdID0gXCJJTlQ0XCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJVSU5UXCJdID0gOV0gPSBcIlVJTlRcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlVJTlQyXCJdID0gMTBdID0gXCJVSU5UMlwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiVUlOVDNcIl0gPSAxMV0gPSBcIlVJTlQzXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJVSU5UNFwiXSA9IDEyXSA9IFwiVUlOVDRcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkZMT0FUXCJdID0gMTNdID0gXCJGTE9BVFwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiRkxPQVQyXCJdID0gMTRdID0gXCJGTE9BVDJcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkZMT0FUM1wiXSA9IDE1XSA9IFwiRkxPQVQzXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJGTE9BVDRcIl0gPSAxNl0gPSBcIkZMT0FUNFwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiQ09MT1I0XCJdID0gMTddID0gXCJDT0xPUjRcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDJcIl0gPSAxOF0gPSBcIk1BVDJcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDJYM1wiXSA9IDE5XSA9IFwiTUFUMlgzXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQyWDRcIl0gPSAyMF0gPSBcIk1BVDJYNFwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUM1gyXCJdID0gMjFdID0gXCJNQVQzWDJcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDNcIl0gPSAyMl0gPSBcIk1BVDNcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDNYNFwiXSA9IDIzXSA9IFwiTUFUM1g0XCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJNQVQ0WDJcIl0gPSAyNF0gPSBcIk1BVDRYMlwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiTUFUNFgzXCJdID0gMjVdID0gXCJNQVQ0WDNcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIk1BVDRcIl0gPSAyNl0gPSBcIk1BVDRcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVIxRFwiXSA9IDI3XSA9IFwiU0FNUExFUjFEXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSMURfQVJSQVlcIl0gPSAyOF0gPSBcIlNBTVBMRVIxRF9BUlJBWVwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUjJEXCJdID0gMjldID0gXCJTQU1QTEVSMkRcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIlNBTVBMRVIyRF9BUlJBWVwiXSA9IDMwXSA9IFwiU0FNUExFUjJEX0FSUkFZXCI7XHJcbiAgICBHRlhUeXBlW0dGWFR5cGVbXCJTQU1QTEVSM0RcIl0gPSAzMV0gPSBcIlNBTVBMRVIzRFwiO1xyXG4gICAgR0ZYVHlwZVtHRlhUeXBlW1wiU0FNUExFUl9DVUJFXCJdID0gMzJdID0gXCJTQU1QTEVSX0NVQkVcIjtcclxuICAgIEdGWFR5cGVbR0ZYVHlwZVtcIkNPVU5UXCJdID0gMzNdID0gXCJDT1VOVFwiO1xyXG59KShHRlhUeXBlIHx8IChHRlhUeXBlID0ge30pKTtcclxudmFyIEdGWEZvcm1hdDtcclxuKGZ1bmN0aW9uIChHRlhGb3JtYXQpIHtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJBOFwiXSA9IDFdID0gXCJBOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkw4XCJdID0gMl0gPSBcIkw4XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiTEE4XCJdID0gM10gPSBcIkxBOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlI4XCJdID0gNF0gPSBcIlI4XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjhTTlwiXSA9IDVdID0gXCJSOFNOXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjhVSVwiXSA9IDZdID0gXCJSOFVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjhJXCJdID0gN10gPSBcIlI4SVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIxNkZcIl0gPSA4XSA9IFwiUjE2RlwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIxNlVJXCJdID0gOV0gPSBcIlIxNlVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjE2SVwiXSA9IDEwXSA9IFwiUjE2SVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlIzMkZcIl0gPSAxMV0gPSBcIlIzMkZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMzJVSVwiXSA9IDEyXSA9IFwiUjMyVUlcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSMzJJXCJdID0gMTNdID0gXCJSMzJJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkc4XCJdID0gMTRdID0gXCJSRzhcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhTTlwiXSA9IDE1XSA9IFwiUkc4U05cIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhVSVwiXSA9IDE2XSA9IFwiUkc4VUlcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzhJXCJdID0gMTddID0gXCJSRzhJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkcxNkZcIl0gPSAxOF0gPSBcIlJHMTZGXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkcxNlVJXCJdID0gMTldID0gXCJSRzE2VUlcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzE2SVwiXSA9IDIwXSA9IFwiUkcxNklcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzMyRlwiXSA9IDIxXSA9IFwiUkczMkZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSRzMyVUlcIl0gPSAyMl0gPSBcIlJHMzJVSVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHMzJJXCJdID0gMjNdID0gXCJSRzMySVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhcIl0gPSAyNF0gPSBcIlJHQjhcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJTUkdCOFwiXSA9IDI1XSA9IFwiU1JHQjhcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0I4U05cIl0gPSAyNl0gPSBcIlJHQjhTTlwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjhVSVwiXSA9IDI3XSA9IFwiUkdCOFVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOElcIl0gPSAyOF0gPSBcIlJHQjhJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMTZGXCJdID0gMjldID0gXCJSR0IxNkZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IxNlVJXCJdID0gMzBdID0gXCJSR0IxNlVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMTZJXCJdID0gMzFdID0gXCJSR0IxNklcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IzMkZcIl0gPSAzMl0gPSBcIlJHQjMyRlwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjMyVUlcIl0gPSAzM10gPSBcIlJHQjMyVUlcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0IzMklcIl0gPSAzNF0gPSBcIlJHQjMySVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkE4XCJdID0gMzVdID0gXCJSR0JBOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlNSR0I4X0E4XCJdID0gMzZdID0gXCJTUkdCOF9BOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkE4U05cIl0gPSAzN10gPSBcIlJHQkE4U05cIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBOFVJXCJdID0gMzhdID0gXCJSR0JBOFVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQThJXCJdID0gMzldID0gXCJSR0JBOElcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMTZGXCJdID0gNDBdID0gXCJSR0JBMTZGXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTE2VUlcIl0gPSA0MV0gPSBcIlJHQkExNlVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTE2SVwiXSA9IDQyXSA9IFwiUkdCQTE2SVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQkEzMkZcIl0gPSA0M10gPSBcIlJHQkEzMkZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMzJVSVwiXSA9IDQ0XSA9IFwiUkdCQTMyVUlcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJSR0JBMzJJXCJdID0gNDVdID0gXCJSR0JBMzJJXCI7XHJcbiAgICAvLyBTcGVjaWFsIEZvcm1hdFxyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlI1RzZCNVwiXSA9IDQ2XSA9IFwiUjVHNkI1XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUjExRzExQjEwRlwiXSA9IDQ3XSA9IFwiUjExRzExQjEwRlwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjVBMVwiXSA9IDQ4XSA9IFwiUkdCNUExXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCQTRcIl0gPSA0OV0gPSBcIlJHQkE0XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCMTBBMlwiXSA9IDUwXSA9IFwiUkdCMTBBMlwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlJHQjEwQTJVSVwiXSA9IDUxXSA9IFwiUkdCMTBBMlVJXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUkdCOUU1XCJdID0gNTJdID0gXCJSR0I5RTVcIjtcclxuICAgIC8vIERlcHRoLVN0ZW5jaWwgRm9ybWF0XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRDE2XCJdID0gNTNdID0gXCJEMTZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMTZTOFwiXSA9IDU0XSA9IFwiRDE2UzhcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMjRcIl0gPSA1NV0gPSBcIkQyNFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQyNFM4XCJdID0gNTZdID0gXCJEMjRTOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkQzMkZcIl0gPSA1N10gPSBcIkQzMkZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJEMzJGX1M4XCJdID0gNThdID0gXCJEMzJGX1M4XCI7XHJcbiAgICAvLyBDb21wcmVzc2VkIEZvcm1hdFxyXG4gICAgLy8gQmxvY2sgQ29tcHJlc3Npb24gRm9ybWF0LCBERFMgKERpcmVjdERyYXcgU3VyZmFjZSlcclxuICAgIC8vIERYVDE6IDMgY2hhbm5lbHMgKDU6Njo1KSwgMS84IG9yaWdpYW5sIHNpemUsIHdpdGggMCBvciAxIGJpdCBvZiBhbHBoYVxyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDMVwiXSA9IDU5XSA9IFwiQkMxXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMxX0FMUEhBXCJdID0gNjBdID0gXCJCQzFfQUxQSEFcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFfU1JHQlwiXSA9IDYxXSA9IFwiQkMxX1NSR0JcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzFfU1JHQl9BTFBIQVwiXSA9IDYyXSA9IFwiQkMxX1NSR0JfQUxQSEFcIjtcclxuICAgIC8vIERYVDM6IDQgY2hhbm5lbHMgKDU6Njo1KSwgMS80IG9yaWdpYW5sIHNpemUsIHdpdGggNCBiaXRzIG9mIGFscGhhXHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMyXCJdID0gNjNdID0gXCJCQzJcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzJfU1JHQlwiXSA9IDY0XSA9IFwiQkMyX1NSR0JcIjtcclxuICAgIC8vIERYVDU6IDQgY2hhbm5lbHMgKDU6Njo1KSwgMS80IG9yaWdpYW5sIHNpemUsIHdpdGggOCBiaXRzIG9mIGFscGhhXHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkMzXCJdID0gNjVdID0gXCJCQzNcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzNfU1JHQlwiXSA9IDY2XSA9IFwiQkMzX1NSR0JcIjtcclxuICAgIC8vIDEgY2hhbm5lbCAoOCksIDEvNCBvcmlnaWFubCBzaXplXHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkM0XCJdID0gNjddID0gXCJCQzRcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzRfU05PUk1cIl0gPSA2OF0gPSBcIkJDNF9TTk9STVwiO1xyXG4gICAgLy8gMiBjaGFubmVscyAoODo4KSwgMS8yIG9yaWdpYW5sIHNpemVcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzVcIl0gPSA2OV0gPSBcIkJDNVwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkJDNV9TTk9STVwiXSA9IDcwXSA9IFwiQkM1X1NOT1JNXCI7XHJcbiAgICAvLyAzIGNoYW5uZWxzICgxNjoxNjoxNiksIGhhbGYtZmxvYXRpbmcgcG9pbnQsIDEvNiBvcmlnaWFubCBzaXplXHJcbiAgICAvLyBVRjE2OiB1bnNpZ25lZCBmbG9hdCwgNSBleHBvbmVudCBiaXRzICsgMTEgbWFudGlzc2EgYml0c1xyXG4gICAgLy8gU0YxNjogc2lnbmVkIGZsb2F0LCAxIHNpZ25lZCBiaXQgKyA1IGV4cG9uZW50IGJpdHMgKyAxMCBtYW50aXNzYSBiaXRzXHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkM2SF9VRjE2XCJdID0gNzFdID0gXCJCQzZIX1VGMTZcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzZIX1NGMTZcIl0gPSA3Ml0gPSBcIkJDNkhfU0YxNlwiO1xyXG4gICAgLy8gNCBjaGFubmVscyAoNH43IGJpdHMgcGVyIGNoYW5uZWwpIHdpdGggMCB0byA4IGJpdHMgb2YgYWxwaGEsIDEvMyBvcmlnaW5hbCBzaXplXHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiQkM3XCJdID0gNzNdID0gXCJCQzdcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJCQzdfU1JHQlwiXSA9IDc0XSA9IFwiQkM3X1NSR0JcIjtcclxuICAgIC8vIEVyaWNzc29uIFRleHR1cmUgQ29tcHJlc3Npb24gRm9ybWF0XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDX1JHQjhcIl0gPSA3NV0gPSBcIkVUQ19SR0I4XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9SR0I4XCJdID0gNzZdID0gXCJFVEMyX1JHQjhcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1NSR0I4XCJdID0gNzddID0gXCJFVEMyX1NSR0I4XCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9SR0I4X0ExXCJdID0gNzhdID0gXCJFVEMyX1JHQjhfQTFcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFVEMyX1NSR0I4X0ExXCJdID0gNzldID0gXCJFVEMyX1NSR0I4X0ExXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRVRDMl9SR0JBOFwiXSA9IDgwXSA9IFwiRVRDMl9SR0JBOFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIkVUQzJfU1JHQjhfQThcIl0gPSA4MV0gPSBcIkVUQzJfU1JHQjhfQThcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFQUNfUjExXCJdID0gODJdID0gXCJFQUNfUjExXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiRUFDX1IxMVNOXCJdID0gODNdID0gXCJFQUNfUjExU05cIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFQUNfUkcxMVwiXSA9IDg0XSA9IFwiRUFDX1JHMTFcIjtcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJFQUNfUkcxMVNOXCJdID0gODVdID0gXCJFQUNfUkcxMVNOXCI7XHJcbiAgICAvLyBQVlJUQyAoUG93ZXJWUilcclxuICAgIEdGWEZvcm1hdFtHRlhGb3JtYXRbXCJQVlJUQ19SR0IyXCJdID0gODZdID0gXCJQVlJUQ19SR0IyXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCQTJcIl0gPSA4N10gPSBcIlBWUlRDX1JHQkEyXCI7XHJcbiAgICBHRlhGb3JtYXRbR0ZYRm9ybWF0W1wiUFZSVENfUkdCNFwiXSA9IDg4XSA9IFwiUFZSVENfUkdCNFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDX1JHQkE0XCJdID0gODldID0gXCJQVlJUQ19SR0JBNFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDMl8yQlBQXCJdID0gOTBdID0gXCJQVlJUQzJfMkJQUFwiO1xyXG4gICAgR0ZYRm9ybWF0W0dGWEZvcm1hdFtcIlBWUlRDMl80QlBQXCJdID0gOTFdID0gXCJQVlJUQzJfNEJQUFwiO1xyXG59KShHRlhGb3JtYXQgfHwgKEdGWEZvcm1hdCA9IHt9KSk7XHJcbnZhciBHRlhCdWZmZXJVc2FnZUJpdDtcclxuKGZ1bmN0aW9uIChHRlhCdWZmZXJVc2FnZUJpdCkge1xyXG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcclxuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVFJBTlNGRVJfU1JDXCJdID0gMV0gPSBcIlRSQU5TRkVSX1NSQ1wiO1xyXG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJUUkFOU0ZFUl9EU1RcIl0gPSAyXSA9IFwiVFJBTlNGRVJfRFNUXCI7XHJcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIklOREVYXCJdID0gNF0gPSBcIklOREVYXCI7XHJcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIlZFUlRFWFwiXSA9IDhdID0gXCJWRVJURVhcIjtcclxuICAgIEdGWEJ1ZmZlclVzYWdlQml0W0dGWEJ1ZmZlclVzYWdlQml0W1wiVU5JRk9STVwiXSA9IDE2XSA9IFwiVU5JRk9STVwiO1xyXG4gICAgR0ZYQnVmZmVyVXNhZ2VCaXRbR0ZYQnVmZmVyVXNhZ2VCaXRbXCJTVE9SQUdFXCJdID0gMzJdID0gXCJTVE9SQUdFXCI7XHJcbiAgICBHRlhCdWZmZXJVc2FnZUJpdFtHRlhCdWZmZXJVc2FnZUJpdFtcIklORElSRUNUXCJdID0gNjRdID0gXCJJTkRJUkVDVFwiO1xyXG59KShHRlhCdWZmZXJVc2FnZUJpdCB8fCAoR0ZYQnVmZmVyVXNhZ2VCaXQgPSB7fSkpO1xyXG52YXIgR0ZYTWVtb3J5VXNhZ2VCaXQ7XHJcbihmdW5jdGlvbiAoR0ZYTWVtb3J5VXNhZ2VCaXQpIHtcclxuICAgIEdGWE1lbW9yeVVzYWdlQml0W0dGWE1lbW9yeVVzYWdlQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XHJcbiAgICBHRlhNZW1vcnlVc2FnZUJpdFtHRlhNZW1vcnlVc2FnZUJpdFtcIkRFVklDRVwiXSA9IDFdID0gXCJERVZJQ0VcIjtcclxuICAgIEdGWE1lbW9yeVVzYWdlQml0W0dGWE1lbW9yeVVzYWdlQml0W1wiSE9TVFwiXSA9IDJdID0gXCJIT1NUXCI7XHJcbn0pKEdGWE1lbW9yeVVzYWdlQml0IHx8IChHRlhNZW1vcnlVc2FnZUJpdCA9IHt9KSk7XHJcbnZhciBHRlhCdWZmZXJBY2Nlc3NCaXQ7XHJcbihmdW5jdGlvbiAoR0ZYQnVmZmVyQWNjZXNzQml0KSB7XHJcbiAgICBHRlhCdWZmZXJBY2Nlc3NCaXRbR0ZYQnVmZmVyQWNjZXNzQml0W1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XHJcbiAgICBHRlhCdWZmZXJBY2Nlc3NCaXRbR0ZYQnVmZmVyQWNjZXNzQml0W1wiUkVBRFwiXSA9IDFdID0gXCJSRUFEXCI7XHJcbiAgICBHRlhCdWZmZXJBY2Nlc3NCaXRbR0ZYQnVmZmVyQWNjZXNzQml0W1wiV1JJVEVcIl0gPSAyXSA9IFwiV1JJVEVcIjtcclxufSkoR0ZYQnVmZmVyQWNjZXNzQml0IHx8IChHRlhCdWZmZXJBY2Nlc3NCaXQgPSB7fSkpO1xyXG52YXIgR0ZYUHJpbWl0aXZlTW9kZTtcclxuKGZ1bmN0aW9uIChHRlhQcmltaXRpdmVNb2RlKSB7XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJQT0lOVF9MSVNUXCJdID0gMF0gPSBcIlBPSU5UX0xJU1RcIjtcclxuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfTElTVFwiXSA9IDFdID0gXCJMSU5FX0xJU1RcIjtcclxuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIkxJTkVfU1RSSVBcIl0gPSAyXSA9IFwiTElORV9TVFJJUFwiO1xyXG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiTElORV9MT09QXCJdID0gM10gPSBcIkxJTkVfTE9PUFwiO1xyXG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiTElORV9MSVNUX0FESkFDRU5DWVwiXSA9IDRdID0gXCJMSU5FX0xJU1RfQURKQUNFTkNZXCI7XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJMSU5FX1NUUklQX0FESkFDRU5DWVwiXSA9IDVdID0gXCJMSU5FX1NUUklQX0FESkFDRU5DWVwiO1xyXG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiSVNPX0xJTkVfTElTVFwiXSA9IDZdID0gXCJJU09fTElORV9MSVNUXCI7XHJcbiAgICAvLyByYXljYXN0IGRldGVjdGFibGU6XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9MSVNUXCJdID0gN10gPSBcIlRSSUFOR0xFX0xJU1RcIjtcclxuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX1NUUklQXCJdID0gOF0gPSBcIlRSSUFOR0xFX1NUUklQXCI7XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9GQU5cIl0gPSA5XSA9IFwiVFJJQU5HTEVfRkFOXCI7XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9MSVNUX0FESkFDRU5DWVwiXSA9IDEwXSA9IFwiVFJJQU5HTEVfTElTVF9BREpBQ0VOQ1lcIjtcclxuICAgIEdGWFByaW1pdGl2ZU1vZGVbR0ZYUHJpbWl0aXZlTW9kZVtcIlRSSUFOR0xFX1NUUklQX0FESkFDRU5DWVwiXSA9IDExXSA9IFwiVFJJQU5HTEVfU1RSSVBfQURKQUNFTkNZXCI7XHJcbiAgICBHRlhQcmltaXRpdmVNb2RlW0dGWFByaW1pdGl2ZU1vZGVbXCJUUklBTkdMRV9QQVRDSF9BREpBQ0VOQ1lcIl0gPSAxMl0gPSBcIlRSSUFOR0xFX1BBVENIX0FESkFDRU5DWVwiO1xyXG4gICAgR0ZYUHJpbWl0aXZlTW9kZVtHRlhQcmltaXRpdmVNb2RlW1wiUVVBRF9QQVRDSF9MSVNUXCJdID0gMTNdID0gXCJRVUFEX1BBVENIX0xJU1RcIjtcclxufSkoR0ZYUHJpbWl0aXZlTW9kZSB8fCAoR0ZYUHJpbWl0aXZlTW9kZSA9IHt9KSk7XHJcbnZhciBHRlhQb2x5Z29uTW9kZTtcclxuKGZ1bmN0aW9uIChHRlhQb2x5Z29uTW9kZSkge1xyXG4gICAgR0ZYUG9seWdvbk1vZGVbR0ZYUG9seWdvbk1vZGVbXCJGSUxMXCJdID0gMF0gPSBcIkZJTExcIjtcclxuICAgIEdGWFBvbHlnb25Nb2RlW0dGWFBvbHlnb25Nb2RlW1wiUE9JTlRcIl0gPSAxXSA9IFwiUE9JTlRcIjtcclxuICAgIEdGWFBvbHlnb25Nb2RlW0dGWFBvbHlnb25Nb2RlW1wiTElORVwiXSA9IDJdID0gXCJMSU5FXCI7XHJcbn0pKEdGWFBvbHlnb25Nb2RlIHx8IChHRlhQb2x5Z29uTW9kZSA9IHt9KSk7XHJcbnZhciBHRlhTaGFkZU1vZGVsO1xyXG4oZnVuY3Rpb24gKEdGWFNoYWRlTW9kZWwpIHtcclxuICAgIEdGWFNoYWRlTW9kZWxbR0ZYU2hhZGVNb2RlbFtcIkdPVVJBTkRcIl0gPSAwXSA9IFwiR09VUkFORFwiO1xyXG4gICAgR0ZYU2hhZGVNb2RlbFtHRlhTaGFkZU1vZGVsW1wiRkxBVFwiXSA9IDFdID0gXCJGTEFUXCI7XHJcbn0pKEdGWFNoYWRlTW9kZWwgfHwgKEdGWFNoYWRlTW9kZWwgPSB7fSkpO1xyXG52YXIgR0ZYQ3VsbE1vZGU7XHJcbihmdW5jdGlvbiAoR0ZYQ3VsbE1vZGUpIHtcclxuICAgIEdGWEN1bGxNb2RlW0dGWEN1bGxNb2RlW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XHJcbiAgICBHRlhDdWxsTW9kZVtHRlhDdWxsTW9kZVtcIkZST05UXCJdID0gMV0gPSBcIkZST05UXCI7XHJcbiAgICBHRlhDdWxsTW9kZVtHRlhDdWxsTW9kZVtcIkJBQ0tcIl0gPSAyXSA9IFwiQkFDS1wiO1xyXG59KShHRlhDdWxsTW9kZSB8fCAoR0ZYQ3VsbE1vZGUgPSB7fSkpO1xyXG52YXIgR0ZYQ29tcGFyaXNvbkZ1bmM7XHJcbihmdW5jdGlvbiAoR0ZYQ29tcGFyaXNvbkZ1bmMpIHtcclxuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTkVWRVJcIl0gPSAwXSA9IFwiTkVWRVJcIjtcclxuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTEVTU1wiXSA9IDFdID0gXCJMRVNTXCI7XHJcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkVRVUFMXCJdID0gMl0gPSBcIkVRVUFMXCI7XHJcbiAgICBHRlhDb21wYXJpc29uRnVuY1tHRlhDb21wYXJpc29uRnVuY1tcIkxFU1NfRVFVQUxcIl0gPSAzXSA9IFwiTEVTU19FUVVBTFwiO1xyXG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJHUkVBVEVSXCJdID0gNF0gPSBcIkdSRUFURVJcIjtcclxuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiTk9UX0VRVUFMXCJdID0gNV0gPSBcIk5PVF9FUVVBTFwiO1xyXG4gICAgR0ZYQ29tcGFyaXNvbkZ1bmNbR0ZYQ29tcGFyaXNvbkZ1bmNbXCJHUkVBVEVSX0VRVUFMXCJdID0gNl0gPSBcIkdSRUFURVJfRVFVQUxcIjtcclxuICAgIEdGWENvbXBhcmlzb25GdW5jW0dGWENvbXBhcmlzb25GdW5jW1wiQUxXQVlTXCJdID0gN10gPSBcIkFMV0FZU1wiO1xyXG59KShHRlhDb21wYXJpc29uRnVuYyB8fCAoR0ZYQ29tcGFyaXNvbkZ1bmMgPSB7fSkpO1xyXG52YXIgR0ZYU3RlbmNpbE9wO1xyXG4oZnVuY3Rpb24gKEdGWFN0ZW5jaWxPcCkge1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIlpFUk9cIl0gPSAwXSA9IFwiWkVST1wiO1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIktFRVBcIl0gPSAxXSA9IFwiS0VFUFwiO1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIlJFUExBQ0VcIl0gPSAyXSA9IFwiUkVQTEFDRVwiO1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIklOQ1JcIl0gPSAzXSA9IFwiSU5DUlwiO1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIkRFQ1JcIl0gPSA0XSA9IFwiREVDUlwiO1xyXG4gICAgR0ZYU3RlbmNpbE9wW0dGWFN0ZW5jaWxPcFtcIklOVkVSVFwiXSA9IDVdID0gXCJJTlZFUlRcIjtcclxuICAgIEdGWFN0ZW5jaWxPcFtHRlhTdGVuY2lsT3BbXCJJTkNSX1dSQVBcIl0gPSA2XSA9IFwiSU5DUl9XUkFQXCI7XHJcbiAgICBHRlhTdGVuY2lsT3BbR0ZYU3RlbmNpbE9wW1wiREVDUl9XUkFQXCJdID0gN10gPSBcIkRFQ1JfV1JBUFwiO1xyXG59KShHRlhTdGVuY2lsT3AgfHwgKEdGWFN0ZW5jaWxPcCA9IHt9KSk7XHJcbnZhciBHRlhCbGVuZE9wO1xyXG4oZnVuY3Rpb24gKEdGWEJsZW5kT3ApIHtcclxuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIkFERFwiXSA9IDBdID0gXCJBRERcIjtcclxuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIlNVQlwiXSA9IDFdID0gXCJTVUJcIjtcclxuICAgIEdGWEJsZW5kT3BbR0ZYQmxlbmRPcFtcIlJFVl9TVUJcIl0gPSAyXSA9IFwiUkVWX1NVQlwiO1xyXG4gICAgR0ZYQmxlbmRPcFtHRlhCbGVuZE9wW1wiTUlOXCJdID0gM10gPSBcIk1JTlwiO1xyXG4gICAgR0ZYQmxlbmRPcFtHRlhCbGVuZE9wW1wiTUFYXCJdID0gNF0gPSBcIk1BWFwiO1xyXG59KShHRlhCbGVuZE9wIHx8IChHRlhCbGVuZE9wID0ge30pKTtcclxudmFyIEdGWEJsZW5kRmFjdG9yO1xyXG4oZnVuY3Rpb24gKEdGWEJsZW5kRmFjdG9yKSB7XHJcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlpFUk9cIl0gPSAwXSA9IFwiWkVST1wiO1xyXG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVcIl0gPSAxXSA9IFwiT05FXCI7XHJcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlNSQ19BTFBIQVwiXSA9IDJdID0gXCJTUkNfQUxQSEFcIjtcclxuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiRFNUX0FMUEhBXCJdID0gM10gPSBcIkRTVF9BTFBIQVwiO1xyXG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfU1JDX0FMUEhBXCJdID0gNF0gPSBcIk9ORV9NSU5VU19TUkNfQUxQSEFcIjtcclxuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX0RTVF9BTFBIQVwiXSA9IDVdID0gXCJPTkVfTUlOVVNfRFNUX0FMUEhBXCI7XHJcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlNSQ19DT0xPUlwiXSA9IDZdID0gXCJTUkNfQ09MT1JcIjtcclxuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiRFNUX0NPTE9SXCJdID0gN10gPSBcIkRTVF9DT0xPUlwiO1xyXG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfU1JDX0NPTE9SXCJdID0gOF0gPSBcIk9ORV9NSU5VU19TUkNfQ09MT1JcIjtcclxuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX0RTVF9DT0xPUlwiXSA9IDldID0gXCJPTkVfTUlOVVNfRFNUX0NPTE9SXCI7XHJcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIlNSQ19BTFBIQV9TQVRVUkFURVwiXSA9IDEwXSA9IFwiU1JDX0FMUEhBX1NBVFVSQVRFXCI7XHJcbiAgICBHRlhCbGVuZEZhY3RvcltHRlhCbGVuZEZhY3RvcltcIkNPTlNUQU5UX0NPTE9SXCJdID0gMTFdID0gXCJDT05TVEFOVF9DT0xPUlwiO1xyXG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcIl0gPSAxMl0gPSBcIk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUlwiO1xyXG4gICAgR0ZYQmxlbmRGYWN0b3JbR0ZYQmxlbmRGYWN0b3JbXCJDT05TVEFOVF9BTFBIQVwiXSA9IDEzXSA9IFwiQ09OU1RBTlRfQUxQSEFcIjtcclxuICAgIEdGWEJsZW5kRmFjdG9yW0dGWEJsZW5kRmFjdG9yW1wiT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBXCJdID0gMTRdID0gXCJPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEFcIjtcclxufSkoR0ZYQmxlbmRGYWN0b3IgfHwgKEdGWEJsZW5kRmFjdG9yID0ge30pKTtcclxudmFyIEdGWENvbG9yTWFzaztcclxuKGZ1bmN0aW9uIChHRlhDb2xvck1hc2spIHtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJSXCJdID0gMV0gPSBcIlJcIjtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJHXCJdID0gMl0gPSBcIkdcIjtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJCXCJdID0gNF0gPSBcIkJcIjtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJBXCJdID0gOF0gPSBcIkFcIjtcclxuICAgIEdGWENvbG9yTWFza1tHRlhDb2xvck1hc2tbXCJBTExcIl0gPSAxNV0gPSBcIkFMTFwiO1xyXG59KShHRlhDb2xvck1hc2sgfHwgKEdGWENvbG9yTWFzayA9IHt9KSk7XHJcbnZhciBHRlhGaWx0ZXI7XHJcbihmdW5jdGlvbiAoR0ZYRmlsdGVyKSB7XHJcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XHJcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiUE9JTlRcIl0gPSAxXSA9IFwiUE9JTlRcIjtcclxuICAgIEdGWEZpbHRlcltHRlhGaWx0ZXJbXCJMSU5FQVJcIl0gPSAyXSA9IFwiTElORUFSXCI7XHJcbiAgICBHRlhGaWx0ZXJbR0ZYRmlsdGVyW1wiQU5JU09UUk9QSUNcIl0gPSAzXSA9IFwiQU5JU09UUk9QSUNcIjtcclxufSkoR0ZYRmlsdGVyIHx8IChHRlhGaWx0ZXIgPSB7fSkpO1xyXG52YXIgR0ZYQWRkcmVzcztcclxuKGZ1bmN0aW9uIChHRlhBZGRyZXNzKSB7XHJcbiAgICBHRlhBZGRyZXNzW0dGWEFkZHJlc3NbXCJXUkFQXCJdID0gMF0gPSBcIldSQVBcIjtcclxuICAgIEdGWEFkZHJlc3NbR0ZYQWRkcmVzc1tcIk1JUlJPUlwiXSA9IDFdID0gXCJNSVJST1JcIjtcclxuICAgIEdGWEFkZHJlc3NbR0ZYQWRkcmVzc1tcIkNMQU1QXCJdID0gMl0gPSBcIkNMQU1QXCI7XHJcbiAgICBHRlhBZGRyZXNzW0dGWEFkZHJlc3NbXCJCT1JERVJcIl0gPSAzXSA9IFwiQk9SREVSXCI7XHJcbn0pKEdGWEFkZHJlc3MgfHwgKEdGWEFkZHJlc3MgPSB7fSkpO1xyXG52YXIgR0ZYVGV4dHVyZVR5cGU7XHJcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZVR5cGUpIHtcclxuICAgIEdGWFRleHR1cmVUeXBlW0dGWFRleHR1cmVUeXBlW1wiVEVYMURcIl0gPSAwXSA9IFwiVEVYMURcIjtcclxuICAgIEdGWFRleHR1cmVUeXBlW0dGWFRleHR1cmVUeXBlW1wiVEVYMkRcIl0gPSAxXSA9IFwiVEVYMkRcIjtcclxuICAgIEdGWFRleHR1cmVUeXBlW0dGWFRleHR1cmVUeXBlW1wiVEVYM0RcIl0gPSAyXSA9IFwiVEVYM0RcIjtcclxufSkoR0ZYVGV4dHVyZVR5cGUgfHwgKEdGWFRleHR1cmVUeXBlID0ge30pKTtcclxudmFyIEdGWFRleHR1cmVVc2FnZUJpdDtcclxuKGZ1bmN0aW9uIChHRlhUZXh0dXJlVXNhZ2VCaXQpIHtcclxuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcclxuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJUUkFOU0ZFUl9TUkNcIl0gPSAxXSA9IFwiVFJBTlNGRVJfU1JDXCI7XHJcbiAgICBHRlhUZXh0dXJlVXNhZ2VCaXRbR0ZYVGV4dHVyZVVzYWdlQml0W1wiVFJBTlNGRVJfRFNUXCJdID0gMl0gPSBcIlRSQU5TRkVSX0RTVFwiO1xyXG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlNBTVBMRURcIl0gPSA0XSA9IFwiU0FNUExFRFwiO1xyXG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlNUT1JBR0VcIl0gPSA4XSA9IFwiU1RPUkFHRVwiO1xyXG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIkNPTE9SX0FUVEFDSE1FTlRcIl0gPSAxNl0gPSBcIkNPTE9SX0FUVEFDSE1FTlRcIjtcclxuICAgIEdGWFRleHR1cmVVc2FnZUJpdFtHRlhUZXh0dXJlVXNhZ2VCaXRbXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRcIl0gPSAzMl0gPSBcIkRFUFRIX1NURU5DSUxfQVRUQUNITUVOVFwiO1xyXG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIlRSQU5TSUVOVF9BVFRBQ0hNRU5UXCJdID0gNjRdID0gXCJUUkFOU0lFTlRfQVRUQUNITUVOVFwiO1xyXG4gICAgR0ZYVGV4dHVyZVVzYWdlQml0W0dGWFRleHR1cmVVc2FnZUJpdFtcIklOUFVUX0FUVEFDSE1FTlRcIl0gPSAxMjhdID0gXCJJTlBVVF9BVFRBQ0hNRU5UXCI7XHJcbn0pKEdGWFRleHR1cmVVc2FnZUJpdCB8fCAoR0ZYVGV4dHVyZVVzYWdlQml0ID0ge30pKTtcclxudmFyIEdGWFNhbXBsZUNvdW50O1xyXG4oZnVuY3Rpb24gKEdGWFNhbXBsZUNvdW50KSB7XHJcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgxXCJdID0gMF0gPSBcIlgxXCI7XHJcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgyXCJdID0gMV0gPSBcIlgyXCI7XHJcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlg0XCJdID0gMl0gPSBcIlg0XCI7XHJcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlg4XCJdID0gM10gPSBcIlg4XCI7XHJcbiAgICBHRlhTYW1wbGVDb3VudFtHRlhTYW1wbGVDb3VudFtcIlgxNlwiXSA9IDRdID0gXCJYMTZcIjtcclxuICAgIEdGWFNhbXBsZUNvdW50W0dGWFNhbXBsZUNvdW50W1wiWDMyXCJdID0gNV0gPSBcIlgzMlwiO1xyXG4gICAgR0ZYU2FtcGxlQ291bnRbR0ZYU2FtcGxlQ291bnRbXCJYNjRcIl0gPSA2XSA9IFwiWDY0XCI7XHJcbn0pKEdGWFNhbXBsZUNvdW50IHx8IChHRlhTYW1wbGVDb3VudCA9IHt9KSk7XHJcbnZhciBHRlhUZXh0dXJlRmxhZ0JpdDtcclxuKGZ1bmN0aW9uIChHRlhUZXh0dXJlRmxhZ0JpdCkge1xyXG4gICAgR0ZYVGV4dHVyZUZsYWdCaXRbR0ZYVGV4dHVyZUZsYWdCaXRbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcclxuICAgIEdGWFRleHR1cmVGbGFnQml0W0dGWFRleHR1cmVGbGFnQml0W1wiR0VOX01JUE1BUFwiXSA9IDFdID0gXCJHRU5fTUlQTUFQXCI7XHJcbiAgICBHRlhUZXh0dXJlRmxhZ0JpdFtHRlhUZXh0dXJlRmxhZ0JpdFtcIkNVQkVNQVBcIl0gPSAyXSA9IFwiQ1VCRU1BUFwiO1xyXG4gICAgR0ZYVGV4dHVyZUZsYWdCaXRbR0ZYVGV4dHVyZUZsYWdCaXRbXCJCQUtVUF9CVUZGRVJcIl0gPSA0XSA9IFwiQkFLVVBfQlVGRkVSXCI7XHJcbn0pKEdGWFRleHR1cmVGbGFnQml0IHx8IChHRlhUZXh0dXJlRmxhZ0JpdCA9IHt9KSk7XHJcbnZhciBHRlhUZXh0dXJlVmlld1R5cGU7XHJcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZVZpZXdUeXBlKSB7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYxRFwiXSA9IDBdID0gXCJUVjFEXCI7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYyRFwiXSA9IDFdID0gXCJUVjJEXCI7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYzRFwiXSA9IDJdID0gXCJUVjNEXCI7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiQ1VCRVwiXSA9IDNdID0gXCJDVUJFXCI7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYxRF9BUlJBWVwiXSA9IDRdID0gXCJUVjFEX0FSUkFZXCI7XHJcbiAgICBHRlhUZXh0dXJlVmlld1R5cGVbR0ZYVGV4dHVyZVZpZXdUeXBlW1wiVFYyRF9BUlJBWVwiXSA9IDVdID0gXCJUVjJEX0FSUkFZXCI7XHJcbn0pKEdGWFRleHR1cmVWaWV3VHlwZSB8fCAoR0ZYVGV4dHVyZVZpZXdUeXBlID0ge30pKTtcclxudmFyIEdGWFNoYWRlclR5cGU7XHJcbihmdW5jdGlvbiAoR0ZYU2hhZGVyVHlwZSkge1xyXG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiVkVSVEVYXCJdID0gMF0gPSBcIlZFUlRFWFwiO1xyXG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiSFVMTFwiXSA9IDFdID0gXCJIVUxMXCI7XHJcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJET01BSU5cIl0gPSAyXSA9IFwiRE9NQUlOXCI7XHJcbiAgICBHRlhTaGFkZXJUeXBlW0dGWFNoYWRlclR5cGVbXCJHRU9NRVRSWVwiXSA9IDNdID0gXCJHRU9NRVRSWVwiO1xyXG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiRlJBR01FTlRcIl0gPSA0XSA9IFwiRlJBR01FTlRcIjtcclxuICAgIEdGWFNoYWRlclR5cGVbR0ZYU2hhZGVyVHlwZVtcIkNPTVBVVEVcIl0gPSA1XSA9IFwiQ09NUFVURVwiO1xyXG4gICAgR0ZYU2hhZGVyVHlwZVtHRlhTaGFkZXJUeXBlW1wiQ09VTlRcIl0gPSA2XSA9IFwiQ09VTlRcIjtcclxufSkoR0ZYU2hhZGVyVHlwZSB8fCAoR0ZYU2hhZGVyVHlwZSA9IHt9KSk7XHJcbnZhciBHRlhCaW5kaW5nVHlwZTtcclxuKGZ1bmN0aW9uIChHRlhCaW5kaW5nVHlwZSkge1xyXG4gICAgR0ZYQmluZGluZ1R5cGVbR0ZYQmluZGluZ1R5cGVbXCJVTktOT1dOXCJdID0gMF0gPSBcIlVOS05PV05cIjtcclxuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiVU5JRk9STV9CVUZGRVJcIl0gPSAxXSA9IFwiVU5JRk9STV9CVUZGRVJcIjtcclxuICAgIEdGWEJpbmRpbmdUeXBlW0dGWEJpbmRpbmdUeXBlW1wiU0FNUExFUlwiXSA9IDJdID0gXCJTQU1QTEVSXCI7XHJcbiAgICBHRlhCaW5kaW5nVHlwZVtHRlhCaW5kaW5nVHlwZVtcIlNUT1JBR0VfQlVGRkVSXCJdID0gM10gPSBcIlNUT1JBR0VfQlVGRkVSXCI7XHJcbn0pKEdGWEJpbmRpbmdUeXBlIHx8IChHRlhCaW5kaW5nVHlwZSA9IHt9KSk7XHJcbnZhciBHRlhDb21tYW5kQnVmZmVyVHlwZTtcclxuKGZ1bmN0aW9uIChHRlhDb21tYW5kQnVmZmVyVHlwZSkge1xyXG4gICAgR0ZYQ29tbWFuZEJ1ZmZlclR5cGVbR0ZYQ29tbWFuZEJ1ZmZlclR5cGVbXCJQUklNQVJZXCJdID0gMF0gPSBcIlBSSU1BUllcIjtcclxuICAgIEdGWENvbW1hbmRCdWZmZXJUeXBlW0dGWENvbW1hbmRCdWZmZXJUeXBlW1wiU0VDT05EQVJZXCJdID0gMV0gPSBcIlNFQ09OREFSWVwiO1xyXG59KShHRlhDb21tYW5kQnVmZmVyVHlwZSB8fCAoR0ZYQ29tbWFuZEJ1ZmZlclR5cGUgPSB7fSkpO1xyXG4vLyBFbnVtZXJhdGlvbiBhbGwgcG9zc2libGUgdmFsdWVzIG9mIG9wZXJhdGlvbnMgdG8gYmUgcGVyZm9ybWVkIG9uIGluaXRpYWxseSBMb2FkaW5nIGEgRnJhbWVidWZmZXIgT2JqZWN0LlxyXG52YXIgR0ZYTG9hZE9wO1xyXG4oZnVuY3Rpb24gKEdGWExvYWRPcCkge1xyXG4gICAgR0ZYTG9hZE9wW0dGWExvYWRPcFtcIkxPQURcIl0gPSAwXSA9IFwiTE9BRFwiO1xyXG4gICAgR0ZYTG9hZE9wW0dGWExvYWRPcFtcIkNMRUFSXCJdID0gMV0gPSBcIkNMRUFSXCI7XHJcbiAgICBHRlhMb2FkT3BbR0ZYTG9hZE9wW1wiRElTQ0FSRFwiXSA9IDJdID0gXCJESVNDQVJEXCI7XHJcbn0pKEdGWExvYWRPcCB8fCAoR0ZYTG9hZE9wID0ge30pKTtcclxuLy8gRW51bWVyYXRlcyBhbGwgcG9zc2libGUgdmFsdWVzIG9mIG9wZXJhdGlvbnMgdG8gYmUgcGVyZm9ybWVkIHdoZW4gU3RvcmluZyB0byBhIEZyYW1lYnVmZmVyIE9iamVjdC5cclxudmFyIEdGWFN0b3JlT3A7XHJcbihmdW5jdGlvbiAoR0ZYU3RvcmVPcCkge1xyXG4gICAgR0ZYU3RvcmVPcFtHRlhTdG9yZU9wW1wiU1RPUkVcIl0gPSAwXSA9IFwiU1RPUkVcIjtcclxuICAgIEdGWFN0b3JlT3BbR0ZYU3RvcmVPcFtcIkRJU0NBUkRcIl0gPSAxXSA9IFwiRElTQ0FSRFwiO1xyXG59KShHRlhTdG9yZU9wIHx8IChHRlhTdG9yZU9wID0ge30pKTtcclxudmFyIEdGWFRleHR1cmVMYXlvdXQ7XHJcbihmdW5jdGlvbiAoR0ZYVGV4dHVyZUxheW91dCkge1xyXG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiVU5ERUZJTkVEXCJdID0gMF0gPSBcIlVOREVGSU5FRFwiO1xyXG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiR0VORVJBTFwiXSA9IDFdID0gXCJHRU5FUkFMXCI7XHJcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJDT0xPUl9BVFRBQ0hNRU5UX09QVElNQUxcIl0gPSAyXSA9IFwiQ09MT1JfQVRUQUNITUVOVF9PUFRJTUFMXCI7XHJcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRfT1BUSU1BTFwiXSA9IDNdID0gXCJERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlRfT1BUSU1BTFwiO1xyXG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiREVQVEhfU1RFTkNJTF9SRUFET05MWV9PUFRJTUFMXCJdID0gNF0gPSBcIkRFUFRIX1NURU5DSUxfUkVBRE9OTFlfT1BUSU1BTFwiO1xyXG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiU0hBREVSX1JFQURPTkxZX09QVElNQUxcIl0gPSA1XSA9IFwiU0hBREVSX1JFQURPTkxZX09QVElNQUxcIjtcclxuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlRSQU5TRkVSX1NSQ19PUFRJTUFMXCJdID0gNl0gPSBcIlRSQU5TRkVSX1NSQ19PUFRJTUFMXCI7XHJcbiAgICBHRlhUZXh0dXJlTGF5b3V0W0dGWFRleHR1cmVMYXlvdXRbXCJUUkFOU0ZFUl9EU1RfT1BUSU1BTFwiXSA9IDddID0gXCJUUkFOU0ZFUl9EU1RfT1BUSU1BTFwiO1xyXG4gICAgR0ZYVGV4dHVyZUxheW91dFtHRlhUZXh0dXJlTGF5b3V0W1wiUFJFSU5JVElBTElaRURcIl0gPSA4XSA9IFwiUFJFSU5JVElBTElaRURcIjtcclxuICAgIEdGWFRleHR1cmVMYXlvdXRbR0ZYVGV4dHVyZUxheW91dFtcIlBSRVNFTlRfU1JDXCJdID0gOV0gPSBcIlBSRVNFTlRfU1JDXCI7XHJcbn0pKEdGWFRleHR1cmVMYXlvdXQgfHwgKEdGWFRleHR1cmVMYXlvdXQgPSB7fSkpO1xyXG52YXIgR0ZYUGlwZWxpbmVCaW5kUG9pbnQ7XHJcbihmdW5jdGlvbiAoR0ZYUGlwZWxpbmVCaW5kUG9pbnQpIHtcclxuICAgIEdGWFBpcGVsaW5lQmluZFBvaW50W0dGWFBpcGVsaW5lQmluZFBvaW50W1wiR1JBUEhJQ1NcIl0gPSAwXSA9IFwiR1JBUEhJQ1NcIjtcclxuICAgIEdGWFBpcGVsaW5lQmluZFBvaW50W0dGWFBpcGVsaW5lQmluZFBvaW50W1wiQ09NUFVURVwiXSA9IDFdID0gXCJDT01QVVRFXCI7XHJcbiAgICBHRlhQaXBlbGluZUJpbmRQb2ludFtHRlhQaXBlbGluZUJpbmRQb2ludFtcIlJBWV9UUkFDSU5HXCJdID0gMl0gPSBcIlJBWV9UUkFDSU5HXCI7XHJcbn0pKEdGWFBpcGVsaW5lQmluZFBvaW50IHx8IChHRlhQaXBlbGluZUJpbmRQb2ludCA9IHt9KSk7XHJcbnZhciBHRlhEeW5hbWljU3RhdGU7XHJcbihmdW5jdGlvbiAoR0ZYRHluYW1pY1N0YXRlKSB7XHJcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiVklFV1BPUlRcIl0gPSAwXSA9IFwiVklFV1BPUlRcIjtcclxuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJTQ0lTU09SXCJdID0gMV0gPSBcIlNDSVNTT1JcIjtcclxuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJMSU5FX1dJRFRIXCJdID0gMl0gPSBcIkxJTkVfV0lEVEhcIjtcclxuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJERVBUSF9CSUFTXCJdID0gM10gPSBcIkRFUFRIX0JJQVNcIjtcclxuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJCTEVORF9DT05TVEFOVFNcIl0gPSA0XSA9IFwiQkxFTkRfQ09OU1RBTlRTXCI7XHJcbiAgICBHRlhEeW5hbWljU3RhdGVbR0ZYRHluYW1pY1N0YXRlW1wiREVQVEhfQk9VTkRTXCJdID0gNV0gPSBcIkRFUFRIX0JPVU5EU1wiO1xyXG4gICAgR0ZYRHluYW1pY1N0YXRlW0dGWER5bmFtaWNTdGF0ZVtcIlNURU5DSUxfV1JJVEVfTUFTS1wiXSA9IDZdID0gXCJTVEVOQ0lMX1dSSVRFX01BU0tcIjtcclxuICAgIEdGWER5bmFtaWNTdGF0ZVtHRlhEeW5hbWljU3RhdGVbXCJTVEVOQ0lMX0NPTVBBUkVfTUFTS1wiXSA9IDddID0gXCJTVEVOQ0lMX0NPTVBBUkVfTUFTS1wiO1xyXG59KShHRlhEeW5hbWljU3RhdGUgfHwgKEdGWER5bmFtaWNTdGF0ZSA9IHt9KSk7XHJcbnZhciBHRlhTdGVuY2lsRmFjZTtcclxuKGZ1bmN0aW9uIChHRlhTdGVuY2lsRmFjZSkge1xyXG4gICAgR0ZYU3RlbmNpbEZhY2VbR0ZYU3RlbmNpbEZhY2VbXCJGUk9OVFwiXSA9IDBdID0gXCJGUk9OVFwiO1xyXG4gICAgR0ZYU3RlbmNpbEZhY2VbR0ZYU3RlbmNpbEZhY2VbXCJCQUNLXCJdID0gMV0gPSBcIkJBQ0tcIjtcclxuICAgIEdGWFN0ZW5jaWxGYWNlW0dGWFN0ZW5jaWxGYWNlW1wiQUxMXCJdID0gMl0gPSBcIkFMTFwiO1xyXG59KShHRlhTdGVuY2lsRmFjZSB8fCAoR0ZYU3RlbmNpbEZhY2UgPSB7fSkpO1xyXG52YXIgR0ZYUXVldWVUeXBlO1xyXG4oZnVuY3Rpb24gKEdGWFF1ZXVlVHlwZSkge1xyXG4gICAgR0ZYUXVldWVUeXBlW0dGWFF1ZXVlVHlwZVtcIkdSQVBISUNTXCJdID0gMF0gPSBcIkdSQVBISUNTXCI7XHJcbiAgICBHRlhRdWV1ZVR5cGVbR0ZYUXVldWVUeXBlW1wiQ09NUFVURVwiXSA9IDFdID0gXCJDT01QVVRFXCI7XHJcbiAgICBHRlhRdWV1ZVR5cGVbR0ZYUXVldWVUeXBlW1wiVFJBTlNGRVJcIl0gPSAyXSA9IFwiVFJBTlNGRVJcIjtcclxufSkoR0ZYUXVldWVUeXBlIHx8IChHRlhRdWV1ZVR5cGUgPSB7fSkpO1xyXG52YXIgR0ZYQ2xlYXJGbGFnO1xyXG4oZnVuY3Rpb24gKEdGWENsZWFyRmxhZykge1xyXG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xyXG4gICAgR0ZYQ2xlYXJGbGFnW0dGWENsZWFyRmxhZ1tcIkNPTE9SXCJdID0gMV0gPSBcIkNPTE9SXCI7XHJcbiAgICBHRlhDbGVhckZsYWdbR0ZYQ2xlYXJGbGFnW1wiREVQVEhcIl0gPSAyXSA9IFwiREVQVEhcIjtcclxuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJTVEVOQ0lMXCJdID0gNF0gPSBcIlNURU5DSUxcIjtcclxuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJERVBUSF9TVEVOQ0lMXCJdID0gNl0gPSBcIkRFUFRIX1NURU5DSUxcIjtcclxuICAgIEdGWENsZWFyRmxhZ1tHRlhDbGVhckZsYWdbXCJBTExcIl0gPSA3XSA9IFwiQUxMXCI7XHJcbn0pKEdGWENsZWFyRmxhZyB8fCAoR0ZYQ2xlYXJGbGFnID0ge30pKTtcclxuZnVuY3Rpb24gR0ZYR2V0VHlwZVNpemUodHlwZSkge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLkJPT0w6XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLklOVDpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuVUlOVDpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuRkxPQVQ6IHJldHVybiA0O1xyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5CT09MMjpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuSU5UMjpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuVUlOVDI6XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLkZMT0FUMjogcmV0dXJuIDg7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLkJPT0wzOlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQzOlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5VSU5UMzpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuRkxPQVQzOiByZXR1cm4gMTI7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLkJPT0w0OlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5JTlQ0OlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5VSU5UNDpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuRkxPQVQ0OlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQyOiByZXR1cm4gMTY7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDJYMzogcmV0dXJuIDI0O1xyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQyWDQ6IHJldHVybiAzMjtcclxuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUM1gyOiByZXR1cm4gMjQ7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDM6IHJldHVybiAzNjtcclxuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUM1g0OiByZXR1cm4gNDg7XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLk1BVDRYMjogcmV0dXJuIDMyO1xyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5NQVQ0WDI6IHJldHVybiAzMjtcclxuICAgICAgICBjYXNlIEdGWFR5cGUuTUFUNDogcmV0dXJuIDY0O1xyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMUQ6XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLlNBTVBMRVIxRF9BUlJBWTpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUjJEOlxyXG4gICAgICAgIGNhc2UgR0ZYVHlwZS5TQU1QTEVSMkRfQVJSQVk6XHJcbiAgICAgICAgY2FzZSBHRlhUeXBlLlNBTVBMRVIzRDpcclxuICAgICAgICBjYXNlIEdGWFR5cGUuU0FNUExFUl9DVUJFOiByZXR1cm4gNDtcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gaW1wb3J0IHsgR0ZYQnVmZmVyIH0gZnJvbSAnLi4vZ2Z4L2J1ZmZlcic7XHJcbnZhciBSZW5kZXJQYXNzU3RhZ2U7XHJcbihmdW5jdGlvbiAoUmVuZGVyUGFzc1N0YWdlKSB7XHJcbiAgICBSZW5kZXJQYXNzU3RhZ2VbUmVuZGVyUGFzc1N0YWdlW1wiREVGQVVMVFwiXSA9IDEwMF0gPSBcIkRFRkFVTFRcIjtcclxufSkoUmVuZGVyUGFzc1N0YWdlIHx8IChSZW5kZXJQYXNzU3RhZ2UgPSB7fSkpO1xyXG52YXIgUmVuZGVyUHJpb3JpdHk7XHJcbihmdW5jdGlvbiAoUmVuZGVyUHJpb3JpdHkpIHtcclxuICAgIFJlbmRlclByaW9yaXR5W1JlbmRlclByaW9yaXR5W1wiTUlOXCJdID0gMF0gPSBcIk1JTlwiO1xyXG4gICAgUmVuZGVyUHJpb3JpdHlbUmVuZGVyUHJpb3JpdHlbXCJNQVhcIl0gPSAyNTVdID0gXCJNQVhcIjtcclxuICAgIFJlbmRlclByaW9yaXR5W1JlbmRlclByaW9yaXR5W1wiREVGQVVMVFwiXSA9IDEyOF0gPSBcIkRFRkFVTFRcIjtcclxufSkoUmVuZGVyUHJpb3JpdHkgfHwgKFJlbmRlclByaW9yaXR5ID0ge30pKTtcclxudmFyIE1BWF9CSU5ESU5HX1NVUFBPUlRFRCA9IDI0OyAvLyBmcm9tIFdlYkdMIDIgc3BlY1xyXG52YXIgVW5pZm9ybUJpbmRpbmc7XHJcbihmdW5jdGlvbiAoVW5pZm9ybUJpbmRpbmcpIHtcclxuICAgIC8vIFVCT3NcclxuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiVUJPX0dMT0JBTFwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDFdID0gXCJVQk9fR0xPQkFMXCI7XHJcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19TSEFET1dcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSAyXSA9IFwiVUJPX1NIQURPV1wiO1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fTE9DQUxcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSAzXSA9IFwiVUJPX0xPQ0FMXCI7XHJcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIlVCT19GT1JXQVJEX0xJR0hUU1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDRdID0gXCJVQk9fRk9SV0FSRF9MSUdIVFNcIjtcclxuICAgIFVuaWZvcm1CaW5kaW5nW1VuaWZvcm1CaW5kaW5nW1wiVUJPX1NLSU5OSU5HXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEIC0gNV0gPSBcIlVCT19TS0lOTklOR1wiO1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fU0tJTk5JTkdfVEVYVFVSRVwiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCAtIDZdID0gXCJVQk9fU0tJTk5JTkdfVEVYVFVSRVwiO1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJVQk9fVUlcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA3XSA9IFwiVUJPX1VJXCI7XHJcbiAgICAvLyBzYW1wbGVyc1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJTQU1QTEVSX0pPSU5UU1wiXSA9IE1BWF9CSU5ESU5HX1NVUFBPUlRFRCArIDFdID0gXCJTQU1QTEVSX0pPSU5UU1wiO1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJTQU1QTEVSX0VOVklST05NRU5UXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEICsgMl0gPSBcIlNBTVBMRVJfRU5WSVJPTk1FTlRcIjtcclxuICAgIC8vIHJvb21zIGxlZnQgZm9yIGN1c3RvbSBiaW5kaW5nc1xyXG4gICAgLy8gZWZmZWN0IGltcG9ydGVyIHByZXBhcmVzIGJpbmRpbmdzIGFjY29yZGluZyB0byB0aGlzXHJcbiAgICBVbmlmb3JtQmluZGluZ1tVbmlmb3JtQmluZGluZ1tcIkNVU1RVTV9VQk9fQklORElOR19FTkRfUE9JTlRcIl0gPSBNQVhfQklORElOR19TVVBQT1JURUQgLSA3XSA9IFwiQ1VTVFVNX1VCT19CSU5ESU5HX0VORF9QT0lOVFwiO1xyXG4gICAgVW5pZm9ybUJpbmRpbmdbVW5pZm9ybUJpbmRpbmdbXCJDVVNUT01fU0FNUExFUl9CSU5ESU5HX1NUQVJUX1BPSU5UXCJdID0gTUFYX0JJTkRJTkdfU1VQUE9SVEVEICsgNl0gPSBcIkNVU1RPTV9TQU1QTEVSX0JJTkRJTkdfU1RBUlRfUE9JTlRcIjtcclxufSkoVW5pZm9ybUJpbmRpbmcgfHwgKFVuaWZvcm1CaW5kaW5nID0ge30pKTtcclxuLy8gZXhwb3J0IGNsYXNzIFVCT0dsb2JhbCB7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFRJTUVfT0ZGU0VUOiBudW1iZXIgPSAwO1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBTQ1JFRU5fU0laRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5USU1FX09GRlNFVCArIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNDUkVFTl9TQ0FMRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5TQ1JFRU5fU0laRV9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBOQVRJVkVfU0laRV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5TQ1JFRU5fU0NBTEVfT0ZGU0VUICsgNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTkFUSVZFX1NJWkVfT0ZGU0VUICsgNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfSU5WX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BVF9WSUVXX09GRlNFVCArIDE2O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfUFJPSl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfVklFV19JTlZfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9QUk9KX0lOVl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfUFJPSl9PRkZTRVQgKyAxNjtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFUX1ZJRVdfUFJPSl9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQVRfUFJPSl9JTlZfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9WSUVXX1BST0pfSU5WX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BVF9WSUVXX1BST0pfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIENBTUVSQV9QT1NfT0ZGU0VUOiBudW1iZXIgPSBVQk9HbG9iYWwuTUFUX1ZJRVdfUFJPSl9JTlZfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIEVYUE9TVVJFX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLkNBTUVSQV9QT1NfT0ZGU0VUICsgNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFJTl9MSVRfRElSX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLkVYUE9TVVJFX09GRlNFVCArIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BSU5fTElUX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPR2xvYmFsLk1BSU5fTElUX0RJUl9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBBTUJJRU5UX1NLWV9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5NQUlOX0xJVF9DT0xPUl9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBBTUJJRU5UX0dST1VORF9PRkZTRVQ6IG51bWJlciA9IFVCT0dsb2JhbC5BTUJJRU5UX1NLWV9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPR2xvYmFsLkFNQklFTlRfR1JPVU5EX09GRlNFVCArIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNJWkU6IG51bWJlciA9IFVCT0dsb2JhbC5DT1VOVCAqIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIEJMT0NLOiBHRlhVbmlmb3JtQmxvY2sgPSB7XHJcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX0dMT0JBTCwgbmFtZTogJ0NDR2xvYmFsJywgbWVtYmVyczogW1xyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY190aW1lJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3NjcmVlblNpemUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc2NyZWVuU2NhbGUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbmF0aXZlU2l6ZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRWaWV3JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRWaWV3SW52JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRQcm9qJywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRQcm9qSW52JywgdHlwZTogR0ZYVHlwZS5NQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRWaWV3UHJvaicsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0Vmlld1Byb2pJbnYnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2NhbWVyYVBvcycsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19leHBvc3VyZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYWluTGl0RGlyJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX21haW5MaXRDb2xvcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogMSB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19hbWJpZW50U2t5JywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX2FtYmllbnRHcm91bmQnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICBdLFxyXG4vLyAgICAgfTtcclxuLy8gICAgIHB1YmxpYyB2aWV3OiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFVCT0dsb2JhbC5DT1VOVCk7XHJcbi8vIH1cclxuLy8gZXhwb3J0IGNsYXNzIFVCT1NoYWRvdyB7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BVF9MSUdIVF9QTEFORV9QUk9KX09GRlNFVDogbnVtYmVyID0gMDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0hBRE9XX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPU2hhZG93Lk1BVF9MSUdIVF9QTEFORV9QUk9KX09GRlNFVCArIDE2O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPU2hhZG93LlNIQURPV19DT0xPUl9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9TaGFkb3cuQ09VTlQgKiA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBCTE9DSzogR0ZYVW5pZm9ybUJsb2NrID0ge1xyXG4vLyAgICAgICAgIGJpbmRpbmc6IFVuaWZvcm1CaW5kaW5nLlVCT19TSEFET1csIG5hbWU6ICdDQ1NoYWRvdycsIG1lbWJlcnM6IFtcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0TGlnaHRQbGFuZVByb2onLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3NoYWRvd0NvbG9yJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiAxIH0sXHJcbi8vICAgICAgICAgXSxcclxuLy8gICAgIH07XHJcbi8vICAgICBwdWJsaWMgdmlldzogRmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShVQk9TaGFkb3cuQ09VTlQpO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCBjb25zdCBsb2NhbEJpbmRpbmdzRGVzYzogTWFwPHN0cmluZywgSUludGVybmFsQmluZGluZ0Rlc2M+ID0gbmV3IE1hcDxzdHJpbmcsIElJbnRlcm5hbEJpbmRpbmdEZXNjPigpO1xyXG4vLyBleHBvcnQgY2xhc3MgVUJPTG9jYWwge1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfV09STERfT0ZGU0VUOiBudW1iZXIgPSAwO1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfV09STERfSVRfT0ZGU0VUOiBudW1iZXIgPSBVQk9Mb2NhbC5NQVRfV09STERfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIENPVU5UOiBudW1iZXIgPSBVQk9Mb2NhbC5NQVRfV09STERfSVRfT0ZGU0VUICsgMTY7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNJWkU6IG51bWJlciA9IFVCT0xvY2FsLkNPVU5UICogNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcclxuLy8gICAgICAgICBiaW5kaW5nOiBVbmlmb3JtQmluZGluZy5VQk9fTE9DQUwsIG5hbWU6ICdDQ0xvY2FsJywgbWVtYmVyczogW1xyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19tYXRXb3JsZCcsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0V29ybGRJVCcsIHR5cGU6IEdGWFR5cGUuTUFUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICBdLFxyXG4vLyAgICAgfTtcclxuLy8gICAgIHB1YmxpYyB2aWV3OiBGbG9hdDMyQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KFVCT0xvY2FsLkNPVU5UKTtcclxuLy8gfVxyXG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVUJPTG9jYWwuQkxPQ0submFtZSwge1xyXG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuVU5JRk9STV9CVUZGRVIsXHJcbi8vICAgICBibG9ja0luZm86IFVCT0xvY2FsLkJMT0NLLFxyXG4vLyB9KTtcclxuLy8gZXhwb3J0IGNsYXNzIFVCT0ZvcndhcmRMaWdodCB7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIE1BWF9TUEhFUkVfTElHSFRTID0gMjtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgTUFYX1NQT1RfTElHSFRTID0gMjtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BIRVJFX0xJR0hUX1BPU19PRkZTRVQ6IG51bWJlciA9IDA7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQSEVSRV9MSUdIVF9TSVpFX1JBTkdFX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQSEVSRV9MSUdIVF9QT1NfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUEhFUkVfTElHSFRTICogNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BIRVJFX0xJR0hUX0NPTE9SX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQSEVSRV9MSUdIVF9TSVpFX1JBTkdFX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BIRVJFX0xJR0hUUyAqIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfUE9TX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQSEVSRV9MSUdIVF9DT0xPUl9PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTICogNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgU1BPVF9MSUdIVF9TSVpFX1JBTkdFX0FOR0xFX09GRlNFVDogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LlNQT1RfTElHSFRfUE9TX09GRlNFVCArIFVCT0ZvcndhcmRMaWdodC5NQVhfU1BPVF9MSUdIVFMgKiA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBTUE9UX0xJR0hUX0RJUl9PRkZTRVQ6IG51bWJlciA9IFVCT0ZvcndhcmRMaWdodC5TUE9UX0xJR0hUX1NJWkVfUkFOR0VfQU5HTEVfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIFNQT1RfTElHSFRfQ09MT1JfT0ZGU0VUOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BPVF9MSUdIVF9ESVJfT0ZGU0VUICsgVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyAqIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIENPVU5UOiBudW1iZXIgPSBVQk9Gb3J3YXJkTGlnaHQuU1BPVF9MSUdIVF9DT0xPUl9PRkZTRVQgKyBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTICogNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgU0laRTogbnVtYmVyID0gVUJPRm9yd2FyZExpZ2h0LkNPVU5UICogNDtcclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgQkxPQ0s6IEdGWFVuaWZvcm1CbG9jayA9IHtcclxuLy8gICAgICAgICBiaW5kaW5nOiBVbmlmb3JtQmluZGluZy5VQk9fRk9SV0FSRF9MSUdIVFMsIG5hbWU6ICdDQ0ZvcndhcmRMaWdodCcsIG1lbWJlcnM6IFtcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BoZXJlTGl0UG9zJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BoZXJlTGl0U2l6ZVJhbmdlJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQSEVSRV9MSUdIVFMgfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfc3BoZXJlTGl0Q29sb3InLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IFVCT0ZvcndhcmRMaWdodC5NQVhfU1BIRVJFX0xJR0hUUyB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcG90TGl0UG9zJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXRTaXplUmFuZ2VBbmdsZScsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyB9LFxyXG4vLyAgICAgICAgICAgICB7IG5hbWU6ICdjY19zcG90TGl0RGlyJywgdHlwZTogR0ZYVHlwZS5GTE9BVDQsIGNvdW50OiBVQk9Gb3J3YXJkTGlnaHQuTUFYX1NQT1RfTElHSFRTIH0sXHJcbi8vICAgICAgICAgICAgIHsgbmFtZTogJ2NjX3Nwb3RMaXRDb2xvcicsIHR5cGU6IEdGWFR5cGUuRkxPQVQ0LCBjb3VudDogVUJPRm9yd2FyZExpZ2h0Lk1BWF9TUE9UX0xJR0hUUyB9LFxyXG4vLyAgICAgICAgIF0sXHJcbi8vICAgICB9O1xyXG4vLyAgICAgcHVibGljIHZpZXc6IEZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoVUJPRm9yd2FyZExpZ2h0LkNPVU5UKTtcclxuLy8gfVxyXG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVUJPRm9yd2FyZExpZ2h0LkJMT0NLLm5hbWUsIHtcclxuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlLlVOSUZPUk1fQlVGRkVSLFxyXG4vLyAgICAgYmxvY2tJbmZvOiBVQk9Gb3J3YXJkTGlnaHQuQkxPQ0ssXHJcbi8vIH0pO1xyXG4vLyBleHBvcnQgY2xhc3MgVUJPU2tpbm5pbmcge1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBNQVRfSk9JTlRfT0ZGU0VUOiBudW1iZXIgPSAwO1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBKT0lOVFNfVEVYVFVSRV9TSVpFX09GRlNFVDogbnVtYmVyID0gVUJPU2tpbm5pbmcuTUFUX0pPSU5UX09GRlNFVCArIDEyOCAqIDE2O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBDT1VOVDogbnVtYmVyID0gVUJPU2tpbm5pbmcuSk9JTlRTX1RFWFRVUkVfU0laRV9PRkZTRVQgKyA0O1xyXG4vLyAgICAgcHVibGljIHN0YXRpYyBTSVpFOiBudW1iZXIgPSBVQk9Ta2lubmluZy5DT1VOVCAqIDQ7XHJcbi8vICAgICBwdWJsaWMgc3RhdGljIEJMT0NLOiBHRlhVbmlmb3JtQmxvY2sgPSB7XHJcbi8vICAgICAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuVUJPX1NLSU5OSU5HLCBuYW1lOiAnQ0NTa2lubmluZycsIG1lbWJlcnM6IFtcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2NfbWF0Sm9pbnQnLCB0eXBlOiBHRlhUeXBlLk1BVDQsIGNvdW50OiAxMjggfSxcclxuLy8gICAgICAgICAgICAgeyBuYW1lOiAnY2Nfam9pbnRzVGV4dHVyZVNpemUnLCB0eXBlOiBHRlhUeXBlLkZMT0FUNCwgY291bnQ6IDEgfSxcclxuLy8gICAgICAgICBdLFxyXG4vLyAgICAgfTtcclxuLy8gfVxyXG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVUJPU2tpbm5pbmcuQkxPQ0submFtZSwge1xyXG4vLyAgICAgdHlwZTogR0ZYQmluZGluZ1R5cGUuVU5JRk9STV9CVUZGRVIsXHJcbi8vICAgICBibG9ja0luZm86IFVCT1NraW5uaW5nLkJMT0NLLFxyXG4vLyB9KTtcclxuLy8gZXhwb3J0IGNvbnN0IFVOSUZPUk1fSk9JTlRTX1RFWFRVUkU6IEdGWFVuaWZvcm1TYW1wbGVyID0ge1xyXG4vLyAgICAgYmluZGluZzogVW5pZm9ybUJpbmRpbmcuU0FNUExFUl9KT0lOVFMsIG5hbWU6ICdjY19qb2ludHNUZXh0dXJlJywgdHlwZTogR0ZYVHlwZS5TQU1QTEVSMkQsIGNvdW50OiAxLFxyXG4vLyB9O1xyXG4vLyBsb2NhbEJpbmRpbmdzRGVzYy5zZXQoVU5JRk9STV9KT0lOVFNfVEVYVFVSRS5uYW1lLCB7XHJcbi8vICAgICB0eXBlOiBHRlhCaW5kaW5nVHlwZS5TQU1QTEVSLFxyXG4vLyAgICAgc2FtcGxlckluZm86IFVOSUZPUk1fSk9JTlRTX1RFWFRVUkUsXHJcbi8vIH0pO1xyXG4vLyBleHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbEJpbmRpbmdEZXNjIHtcclxuLy8gICAgIHR5cGU6IEdGWEJpbmRpbmdUeXBlO1xyXG4vLyAgICAgYmxvY2tJbmZvPzogR0ZYVW5pZm9ybUJsb2NrO1xyXG4vLyAgICAgc2FtcGxlckluZm8/OiBHRlhVbmlmb3JtU2FtcGxlcjtcclxuLy8gfVxyXG4vLyBleHBvcnQgaW50ZXJmYWNlIElJbnRlcm5hbEJpbmRpbmdJbnN0IGV4dGVuZHMgSUludGVybmFsQmluZGluZ0Rlc2Mge1xyXG4vLyAgICAgYnVmZmVyPzogR0ZYQnVmZmVyO1xyXG4vLyAgICAgc2FtcGxlcj86IEdGWFNhbXBsZXI7XHJcbi8vICAgICB0ZXh0dXJlVmlldz86IEdGWFRleHR1cmVWaWV3O1xyXG4vLyB9XHJcblxyXG4vLyB0aGlzIGZpbGUgaXMgdXNlZCBmb3Igb2ZmbGluZSBlZmZlY3QgYnVpbGRpbmcuXHJcbnZhciBfYSwgX2I7XHJcbnZhciBTYW1wbGVySW5mb0luZGV4O1xyXG4oZnVuY3Rpb24gKFNhbXBsZXJJbmZvSW5kZXgpIHtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1pbkZpbHRlclwiXSA9IDBdID0gXCJtaW5GaWx0ZXJcIjtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1hZ0ZpbHRlclwiXSA9IDFdID0gXCJtYWdGaWx0ZXJcIjtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1pcEZpbHRlclwiXSA9IDJdID0gXCJtaXBGaWx0ZXJcIjtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcImFkZHJlc3NVXCJdID0gM10gPSBcImFkZHJlc3NVXCI7XHJcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJhZGRyZXNzVlwiXSA9IDRdID0gXCJhZGRyZXNzVlwiO1xyXG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiYWRkcmVzc1dcIl0gPSA1XSA9IFwiYWRkcmVzc1dcIjtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcIm1heEFuaXNvdHJvcHlcIl0gPSA2XSA9IFwibWF4QW5pc290cm9weVwiO1xyXG4gICAgU2FtcGxlckluZm9JbmRleFtTYW1wbGVySW5mb0luZGV4W1wiY21wRnVuY1wiXSA9IDddID0gXCJjbXBGdW5jXCI7XHJcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaW5MT0RcIl0gPSA4XSA9IFwibWluTE9EXCI7XHJcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtYXhMT0RcIl0gPSA5XSA9IFwibWF4TE9EXCI7XHJcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJtaXBMT0RCaWFzXCJdID0gMTBdID0gXCJtaXBMT0RCaWFzXCI7XHJcbiAgICBTYW1wbGVySW5mb0luZGV4W1NhbXBsZXJJbmZvSW5kZXhbXCJib3JkZXJDb2xvclwiXSA9IDExXSA9IFwiYm9yZGVyQ29sb3JcIjtcclxuICAgIFNhbXBsZXJJbmZvSW5kZXhbU2FtcGxlckluZm9JbmRleFtcInRvdGFsXCJdID0gMTVdID0gXCJ0b3RhbFwiO1xyXG59KShTYW1wbGVySW5mb0luZGV4IHx8IChTYW1wbGVySW5mb0luZGV4ID0ge30pKTtcclxudmFyIHR5cGVNYXAgPSB7fTtcclxudHlwZU1hcFt0eXBlTWFwWydib29sJ10gPSBHRlhUeXBlLkJPT0xdID0gJ2Jvb2wnO1xyXG50eXBlTWFwW3R5cGVNYXBbJ2ludCddID0gR0ZYVHlwZS5JTlRdID0gJ2ludCc7XHJcbnR5cGVNYXBbdHlwZU1hcFsnaXZlYzInXSA9IEdGWFR5cGUuSU5UMl0gPSAnaXZlYzJpbnZUeXBlUGFyYW1zJztcclxudHlwZU1hcFt0eXBlTWFwWydpdmVjMyddID0gR0ZYVHlwZS5JTlQzXSA9ICdpdmVjMyc7XHJcbnR5cGVNYXBbdHlwZU1hcFsnaXZlYzQnXSA9IEdGWFR5cGUuSU5UNF0gPSAnaXZlYzQnO1xyXG50eXBlTWFwW3R5cGVNYXBbJ2Zsb2F0J10gPSBHRlhUeXBlLkZMT0FUXSA9ICdmbG9hdCc7XHJcbnR5cGVNYXBbdHlwZU1hcFsndmVjMiddID0gR0ZYVHlwZS5GTE9BVDJdID0gJ3ZlYzInO1xyXG50eXBlTWFwW3R5cGVNYXBbJ3ZlYzMnXSA9IEdGWFR5cGUuRkxPQVQzXSA9ICd2ZWMzJztcclxudHlwZU1hcFt0eXBlTWFwWyd2ZWM0J10gPSBHRlhUeXBlLkZMT0FUNF0gPSAndmVjNCc7XHJcbnR5cGVNYXBbdHlwZU1hcFsnbWF0MiddID0gR0ZYVHlwZS5NQVQyXSA9ICdtYXQyJztcclxudHlwZU1hcFt0eXBlTWFwWydtYXQzJ10gPSBHRlhUeXBlLk1BVDNdID0gJ21hdDMnO1xyXG50eXBlTWFwW3R5cGVNYXBbJ21hdDQnXSA9IEdGWFR5cGUuTUFUNF0gPSAnbWF0NCc7XHJcbnR5cGVNYXBbdHlwZU1hcFsnc2FtcGxlcjJEJ10gPSBHRlhUeXBlLlNBTVBMRVIyRF0gPSAnc2FtcGxlcjJEJztcclxudHlwZU1hcFt0eXBlTWFwWydzYW1wbGVyQ3ViZSddID0gR0ZYVHlwZS5TQU1QTEVSX0NVQkVdID0gJ3NhbXBsZXJDdWJlJztcclxudmFyIHNpemVNYXAgPSAoX2EgPSB7fSxcclxuICAgIF9hW0dGWFR5cGUuQk9PTF0gPSA0LFxyXG4gICAgX2FbR0ZYVHlwZS5JTlRdID0gNCxcclxuICAgIF9hW0dGWFR5cGUuSU5UMl0gPSA4LFxyXG4gICAgX2FbR0ZYVHlwZS5JTlQzXSA9IDEyLFxyXG4gICAgX2FbR0ZYVHlwZS5JTlQ0XSA9IDE2LFxyXG4gICAgX2FbR0ZYVHlwZS5GTE9BVF0gPSA0LFxyXG4gICAgX2FbR0ZYVHlwZS5GTE9BVDJdID0gOCxcclxuICAgIF9hW0dGWFR5cGUuRkxPQVQzXSA9IDEyLFxyXG4gICAgX2FbR0ZYVHlwZS5GTE9BVDRdID0gMTYsXHJcbiAgICBfYVtHRlhUeXBlLk1BVDJdID0gMTYsXHJcbiAgICBfYVtHRlhUeXBlLk1BVDNdID0gMzYsXHJcbiAgICBfYVtHRlhUeXBlLk1BVDRdID0gNjQsXHJcbiAgICBfYVtHRlhUeXBlLlNBTVBMRVIyRF0gPSA0LFxyXG4gICAgX2FbR0ZYVHlwZS5TQU1QTEVSX0NVQkVdID0gNCxcclxuICAgIF9hKTtcclxudmFyIGZvcm1hdE1hcCA9IChfYiA9IHt9LFxyXG4gICAgX2JbR0ZYVHlwZS5CT09MXSA9IEdGWEZvcm1hdC5SMzJJLFxyXG4gICAgX2JbR0ZYVHlwZS5JTlRdID0gR0ZYRm9ybWF0LlIzMkksXHJcbiAgICBfYltHRlhUeXBlLklOVDJdID0gR0ZYRm9ybWF0LlJHMzJJLFxyXG4gICAgX2JbR0ZYVHlwZS5JTlQzXSA9IEdGWEZvcm1hdC5SR0IzMkksXHJcbiAgICBfYltHRlhUeXBlLklOVDRdID0gR0ZYRm9ybWF0LlJHQkEzMkksXHJcbiAgICBfYltHRlhUeXBlLkZMT0FUXSA9IEdGWEZvcm1hdC5SMzJGLFxyXG4gICAgX2JbR0ZYVHlwZS5GTE9BVDJdID0gR0ZYRm9ybWF0LlJHMzJGLFxyXG4gICAgX2JbR0ZYVHlwZS5GTE9BVDNdID0gR0ZYRm9ybWF0LlJHQjMyRixcclxuICAgIF9iW0dGWFR5cGUuRkxPQVQ0XSA9IEdGWEZvcm1hdC5SR0JBMzJGLFxyXG4gICAgX2IpO1xyXG4vLyBjb25zdCBwYXNzUGFyYW1zID0ge1xyXG4vLyAgIC8vIGNvbG9yIG1hc2tcclxuLy8gICBOT05FOiBnZnguR0ZYQ29sb3JNYXNrLk5PTkUsXHJcbi8vICAgUjogZ2Z4LkdGWENvbG9yTWFzay5SLFxyXG4vLyAgIEc6IGdmeC5HRlhDb2xvck1hc2suRyxcclxuLy8gICBCOiBnZnguR0ZYQ29sb3JNYXNrLkIsXHJcbi8vICAgQTogZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIFJHOiBnZnguR0ZYQ29sb3JNYXNrLlIgfCBnZnguR0ZYQ29sb3JNYXNrLkcsXHJcbi8vICAgUkI6IGdmeC5HRlhDb2xvck1hc2suUiB8IGdmeC5HRlhDb2xvck1hc2suQixcclxuLy8gICBSQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIEdCOiBnZnguR0ZYQ29sb3JNYXNrLkcgfCBnZnguR0ZYQ29sb3JNYXNrLkIsXHJcbi8vICAgR0E6IGdmeC5HRlhDb2xvck1hc2suRyB8IGdmeC5HRlhDb2xvck1hc2suQSxcclxuLy8gICBCQTogZ2Z4LkdGWENvbG9yTWFzay5CIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIFJHQjogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5CLFxyXG4vLyAgIFJHQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIFJCQTogZ2Z4LkdGWENvbG9yTWFzay5SIHwgZ2Z4LkdGWENvbG9yTWFzay5CIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIEdCQTogZ2Z4LkdGWENvbG9yTWFzay5HIHwgZ2Z4LkdGWENvbG9yTWFzay5CIHwgZ2Z4LkdGWENvbG9yTWFzay5BLFxyXG4vLyAgIEFMTDogZ2Z4LkdGWENvbG9yTWFzay5BTEwsXHJcbi8vICAgLy8gYmxlbmQgb3BlcmF0aW9uXHJcbi8vICAgQUREOiBnZnguR0ZYQmxlbmRPcC5BREQsXHJcbi8vICAgU1VCOiBnZnguR0ZYQmxlbmRPcC5TVUIsXHJcbi8vICAgUkVWX1NVQjogZ2Z4LkdGWEJsZW5kT3AuUkVWX1NVQixcclxuLy8gICBNSU46IGdmeC5HRlhCbGVuZE9wLk1JTixcclxuLy8gICBNQVg6IGdmeC5HRlhCbGVuZE9wLk1BWCxcclxuLy8gICAvLyBibGVuZCBmYWN0b3JcclxuLy8gICBaRVJPOiBnZnguR0ZYQmxlbmRGYWN0b3IuWkVSTyxcclxuLy8gICBPTkU6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkUsXHJcbi8vICAgU1JDX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuU1JDX0FMUEhBLFxyXG4vLyAgIERTVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLkRTVF9BTFBIQSxcclxuLy8gICBPTkVfTUlOVVNfU1JDX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX1NSQ19BTFBIQSxcclxuLy8gICBPTkVfTUlOVVNfRFNUX0FMUEhBOiBnZnguR0ZYQmxlbmRGYWN0b3IuT05FX01JTlVTX0RTVF9BTFBIQSxcclxuLy8gICBTUkNfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5TUkNfQ09MT1IsXHJcbi8vICAgRFNUX0NPTE9SOiBnZnguR0ZYQmxlbmRGYWN0b3IuRFNUX0NPTE9SLFxyXG4vLyAgIE9ORV9NSU5VU19TUkNfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfU1JDX0NPTE9SLFxyXG4vLyAgIE9ORV9NSU5VU19EU1RfQ09MT1I6IGdmeC5HRlhCbGVuZEZhY3Rvci5PTkVfTUlOVVNfRFNUX0NPTE9SLFxyXG4vLyAgIFNSQ19BTFBIQV9TQVRVUkFURTogZ2Z4LkdGWEJsZW5kRmFjdG9yLlNSQ19BTFBIQV9TQVRVUkFURSxcclxuLy8gICBDT05TVEFOVF9DT0xPUjogZ2Z4LkdGWEJsZW5kRmFjdG9yLkNPTlNUQU5UX0NPTE9SLFxyXG4vLyAgIE9ORV9NSU5VU19DT05TVEFOVF9DT0xPUjogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUixcclxuLy8gICBDT05TVEFOVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLkNPTlNUQU5UX0FMUEhBLFxyXG4vLyAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogZ2Z4LkdGWEJsZW5kRmFjdG9yLk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSxcclxuLy8gICAvLyBzdGVuY2lsIG9wZXJhdGlvblxyXG4vLyAgIC8vIFpFUk86IEdGWFN0ZW5jaWxPcC5aRVJPLCAvLyBkdXBsaWNhdGUsIHNhZmVseSByZW1vdmVkIGJlY2F1c2UgZW51bSB2YWx1ZSBpcyhhbmQgYWx3YXlzIHdpbGwgYmUpIHRoZSBzYW1lXHJcbi8vICAgS0VFUDogZ2Z4LkdGWFN0ZW5jaWxPcC5LRUVQLFxyXG4vLyAgIFJFUExBQ0U6IGdmeC5HRlhTdGVuY2lsT3AuUkVQTEFDRSxcclxuLy8gICBJTkNSOiBnZnguR0ZYU3RlbmNpbE9wLklOQ1IsXHJcbi8vICAgREVDUjogZ2Z4LkdGWFN0ZW5jaWxPcC5ERUNSLFxyXG4vLyAgIElOVkVSVDogZ2Z4LkdGWFN0ZW5jaWxPcC5JTlZFUlQsXHJcbi8vICAgSU5DUl9XUkFQOiBnZnguR0ZYU3RlbmNpbE9wLklOQ1JfV1JBUCxcclxuLy8gICBERUNSX1dSQVA6IGdmeC5HRlhTdGVuY2lsT3AuREVDUl9XUkFQLFxyXG4vLyAgICAgLy8gY29tcGFyaXNvbiBmdW5jdGlvblxyXG4vLyAgIE5FVkVSOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuTkVWRVIsXHJcbi8vICAgTEVTUzogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkxFU1MsXHJcbi8vICAgRVFVQUw6IGdmeC5HRlhDb21wYXJpc29uRnVuYy5FUVVBTCxcclxuLy8gICBMRVNTX0VRVUFMOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuTEVTU19FUVVBTCxcclxuLy8gICBHUkVBVEVSOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuR1JFQVRFUixcclxuLy8gICBOT1RfRVFVQUw6IGdmeC5HRlhDb21wYXJpc29uRnVuYy5OT1RfRVFVQUwsXHJcbi8vICAgR1JFQVRFUl9FUVVBTDogZ2Z4LkdGWENvbXBhcmlzb25GdW5jLkdSRUFURVJfRVFVQUwsXHJcbi8vICAgQUxXQVlTOiBnZnguR0ZYQ29tcGFyaXNvbkZ1bmMuQUxXQVlTLFxyXG4vLyAgIC8vIGN1bGwgbW9kZVxyXG4vLyAgIC8vIE5PTkU6IEdGWEN1bGxNb2RlLk5PTkUsIC8vIGR1cGxpY2F0ZSwgc2FmZWx5IHJlbW92ZWQgYmVjYXVzZSBlbnVtIHZhbHVlIGlzKGFuZCBhbHdheXMgd2lsbCBiZSkgdGhlIHNhbWVcclxuLy8gICBGUk9OVDogZ2Z4LkdGWEN1bGxNb2RlLkZST05ULFxyXG4vLyAgIEJBQ0s6IGdmeC5HRlhDdWxsTW9kZS5CQUNLLFxyXG4vLyAgIC8vIHNoYWRlIG1vZGVcclxuLy8gICBHT1VSQU5EOiBnZnguR0ZYU2hhZGVNb2RlbC5HT1VSQU5ELFxyXG4vLyAgIEZMQVQ6IGdmeC5HRlhTaGFkZU1vZGVsLkZMQVQsXHJcbi8vICAgLy8gcG9seWdvbiBtb2RlXHJcbi8vICAgRklMTDogZ2Z4LkdGWFBvbHlnb25Nb2RlLkZJTEwsXHJcbi8vICAgTElORTogZ2Z4LkdGWFBvbHlnb25Nb2RlLkxJTkUsXHJcbi8vICAgUE9JTlQ6IGdmeC5HRlhQb2x5Z29uTW9kZS5QT0lOVCxcclxuLy8gICAvLyBwcmltaXRpdmUgbW9kZVxyXG4vLyAgIFBPSU5UX0xJU1Q6IGdmeC5HRlhQcmltaXRpdmVNb2RlLlBPSU5UX0xJU1QsXHJcbi8vICAgTElORV9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX0xJU1QsXHJcbi8vICAgTElORV9TVFJJUDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuTElORV9TVFJJUCxcclxuLy8gICBMSU5FX0xPT1A6IGdmeC5HRlhQcmltaXRpdmVNb2RlLkxJTkVfTE9PUCxcclxuLy8gICBUUklBTkdMRV9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9MSVNULFxyXG4vLyAgIFRSSUFOR0xFX1NUUklQOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9TVFJJUCxcclxuLy8gICBUUklBTkdMRV9GQU46IGdmeC5HRlhQcmltaXRpdmVNb2RlLlRSSUFOR0xFX0ZBTixcclxuLy8gICBMSU5FX0xJU1RfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX0xJU1RfQURKQUNFTkNZLFxyXG4vLyAgIExJTkVfU1RSSVBfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5MSU5FX1NUUklQX0FESkFDRU5DWSxcclxuLy8gICBUUklBTkdMRV9MSVNUX0FESkFDRU5DWTogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuVFJJQU5HTEVfTElTVF9BREpBQ0VOQ1ksXHJcbi8vICAgVFJJQU5HTEVfU1RSSVBfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9TVFJJUF9BREpBQ0VOQ1ksXHJcbi8vICAgVFJJQU5HTEVfUEFUQ0hfQURKQUNFTkNZOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5UUklBTkdMRV9QQVRDSF9BREpBQ0VOQ1ksXHJcbi8vICAgUVVBRF9QQVRDSF9MSVNUOiBnZnguR0ZYUHJpbWl0aXZlTW9kZS5RVUFEX1BBVENIX0xJU1QsXHJcbi8vICAgSVNPX0xJTkVfTElTVDogZ2Z4LkdGWFByaW1pdGl2ZU1vZGUuSVNPX0xJTkVfTElTVCxcclxuLy8gICAvLyBQT0lOVDogZ2Z4LkdGWEZpbHRlci5QT0lOVCwgLy8gZHVwbGljYXRlLCBzYWZlbHkgcmVtb3ZlZCBiZWNhdXNlIGVudW0gdmFsdWUgaXMoYW5kIGFsd2F5cyB3aWxsIGJlKSB0aGUgc2FtZVxyXG4vLyAgIExJTkVBUjogZ2Z4LkdGWEZpbHRlci5MSU5FQVIsXHJcbi8vICAgQU5JU09UUk9QSUM6IGdmeC5HRlhGaWx0ZXIuQU5JU09UUk9QSUMsXHJcbi8vICAgV1JBUDogZ2Z4LkdGWEFkZHJlc3MuV1JBUCxcclxuLy8gICBNSVJST1I6IGdmeC5HRlhBZGRyZXNzLk1JUlJPUixcclxuLy8gICBDTEFNUDogZ2Z4LkdGWEFkZHJlc3MuQ0xBTVAsXHJcbi8vICAgQk9SREVSOiBnZnguR0ZYQWRkcmVzcy5CT1JERVIsXHJcbi8vICAgVklFV1BPUlQ6IGdmeC5HRlhEeW5hbWljU3RhdGUuVklFV1BPUlQsXHJcbi8vICAgU0NJU1NPUjogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5TQ0lTU09SLFxyXG4vLyAgIExJTkVfV0lEVEg6IGdmeC5HRlhEeW5hbWljU3RhdGUuTElORV9XSURUSCxcclxuLy8gICBERVBUSF9CSUFTOiBnZnguR0ZYRHluYW1pY1N0YXRlLkRFUFRIX0JJQVMsXHJcbi8vICAgQkxFTkRfQ09OU1RBTlRTOiBnZnguR0ZYRHluYW1pY1N0YXRlLkJMRU5EX0NPTlNUQU5UUyxcclxuLy8gICBERVBUSF9CT1VORFM6IGdmeC5HRlhEeW5hbWljU3RhdGUuREVQVEhfQk9VTkRTLFxyXG4vLyAgIFNURU5DSUxfV1JJVEVfTUFTSzogZ2Z4LkdGWER5bmFtaWNTdGF0ZS5TVEVOQ0lMX1dSSVRFX01BU0ssXHJcbi8vICAgU1RFTkNJTF9DT01QQVJFX01BU0s6IGdmeC5HRlhEeW5hbWljU3RhdGUuU1RFTkNJTF9DT01QQVJFX01BU0ssXHJcbi8vICAgVFJVRTogdHJ1ZSxcclxuLy8gICBGQUxTRTogZmFsc2VcclxuLy8gfTtcclxudmFyIHBhc3NQYXJhbXMgPSB7XHJcbiAgICBCQUNLOiBlbnVtcy5DVUxMX0JBQ0ssXHJcbiAgICBGUk9OVDogZW51bXMuQ1VMTF9GUk9OVCxcclxuICAgIE5PTkU6IGVudW1zLkNVTExfTk9ORSxcclxuICAgIEFERDogZW51bXMuQkxFTkRfRlVOQ19BREQsXHJcbiAgICBTVUI6IGVudW1zLkJMRU5EX0ZVTkNfU1VCVFJBQ1QsXHJcbiAgICBSRVZfU1VCOiBlbnVtcy5CTEVORF9GVU5DX1JFVkVSU0VfU1VCVFJBQ1QsXHJcbiAgICBaRVJPOiBlbnVtcy5CTEVORF9aRVJPLFxyXG4gICAgT05FOiBlbnVtcy5CTEVORF9PTkUsXHJcbiAgICBTUkNfQ09MT1I6IGVudW1zLkJMRU5EX1NSQ19DT0xPUixcclxuICAgIE9ORV9NSU5VU19TUkNfQ09MT1I6IGVudW1zLkJMRU5EX09ORV9NSU5VU19TUkNfQ09MT1IsXHJcbiAgICBEU1RfQ09MT1I6IGVudW1zLkJMRU5EX0RTVF9DT0xPUixcclxuICAgIE9ORV9NSU5VU19EU1RfQ09MT1I6IGVudW1zLkJMRU5EX09ORV9NSU5VU19EU1RfQ09MT1IsXHJcbiAgICBTUkNfQUxQSEE6IGVudW1zLkJMRU5EX1NSQ19BTFBIQSxcclxuICAgIE9ORV9NSU5VU19TUkNfQUxQSEE6IGVudW1zLkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEsXHJcbiAgICBEU1RfQUxQSEE6IGVudW1zLkJMRU5EX0RTVF9BTFBIQSxcclxuICAgIE9ORV9NSU5VU19EU1RfQUxQSEE6IGVudW1zLkJMRU5EX09ORV9NSU5VU19EU1RfQUxQSEEsXHJcbiAgICBDT05TVEFOVF9DT0xPUjogZW51bXMuQkxFTkRfQ09OU1RBTlRfQ09MT1IsXHJcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1I6IGVudW1zLkJMRU5EX09ORV9NSU5VU19DT05TVEFOVF9DT0xPUixcclxuICAgIENPTlNUQU5UX0FMUEhBOiBlbnVtcy5CTEVORF9DT05TVEFOVF9BTFBIQSxcclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9BTFBIQTogZW51bXMuQkxFTkRfT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBLFxyXG4gICAgU1JDX0FMUEhBX1NBVFVSQVRFOiBlbnVtcy5CTEVORF9TUkNfQUxQSEFfU0FUVVJBVEUsXHJcbiAgICBORVZFUjogZW51bXMuRFNfRlVOQ19ORVZFUixcclxuICAgIExFU1M6IGVudW1zLkRTX0ZVTkNfTEVTUyxcclxuICAgIEVRVUFMOiBlbnVtcy5EU19GVU5DX0VRVUFMLFxyXG4gICAgTEVRVUFMOiBlbnVtcy5EU19GVU5DX0xFUVVBTCxcclxuICAgIEdSRUFURVI6IGVudW1zLkRTX0ZVTkNfR1JFQVRFUixcclxuICAgIE5PVEVRVUFMOiBlbnVtcy5EU19GVU5DX05PVEVRVUFMLFxyXG4gICAgR0VRVUFMOiBlbnVtcy5EU19GVU5DX0dFUVVBTCxcclxuICAgIEFMV0FZUzogZW51bXMuRFNfRlVOQ19BTFdBWVMsXHJcbiAgICBLRUVQOiBlbnVtcy5TVEVOQ0lMX09QX0tFRVAsXHJcbiAgICBSRVBMQUNFOiBlbnVtcy5TVEVOQ0lMX09QX1JFUExBQ0UsXHJcbiAgICBJTkNSOiBlbnVtcy5TVEVOQ0lMX09QX0lOQ1IsXHJcbiAgICBJTkNSX1dSQVA6IGVudW1zLlNURU5DSUxfT1BfSU5DUl9XUkFQLFxyXG4gICAgREVDUjogZW51bXMuU1RFTkNJTF9PUF9ERUNSLFxyXG4gICAgREVDUl9XUkFQOiBlbnVtcy5TVEVOQ0lMX09QX0RFQ1JfV1JBUCxcclxuICAgIElOVkVSVDogZW51bXMuU1RFTkNJTF9PUF9JTlZFUlRcclxufTtcclxuT2JqZWN0LmFzc2lnbihwYXNzUGFyYW1zLCBSZW5kZXJQYXNzU3RhZ2UpO1xyXG4vLyBmb3Igc3RydWN0dXJhbCB0eXBlIGNoZWNraW5nXHJcbi8vIGFuICdhbnknIGtleSB3aWxsIGNoZWNrIGFnYWluc3QgYWxsIGVsZW1lbnRzIGRlZmluZWQgaW4gdGhhdCBvYmplY3RcclxuLy8gYSBrZXkgc3RhcnQgd2l0aCAnJCcgbWVhbnMgaXRzIGVzc2VudGlhbCwgYW5kIGNhbid0IGJlIHVuZGVmaW5lZFxyXG52YXIgZWZmZWN0U3RydWN0dXJlID0ge1xyXG4gICAgJHRlY2huaXF1ZXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICRwYXNzZXM6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXB0aFN0ZW5jaWxTdGF0ZToge30sXHJcbiAgICAgICAgICAgICAgICAgICAgcmFzdGVyaXplclN0YXRlOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBibGVuZFN0YXRlOiB7IHRhcmdldHM6IFt7fV0gfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7IGFueTogeyBzYW1wbGVyOiB7fSwgaW5zcGVjdG9yOiB7fSB9IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF1cclxufTtcclxudmFyIG1hcHBpbmdzID0ge1xyXG4gICAgbXVybXVyaGFzaDJfMzJfZ2M6IG11cm11cmhhc2gyXzMyX2djLFxyXG4gICAgU2FtcGxlckluZm9JbmRleDogU2FtcGxlckluZm9JbmRleCxcclxuICAgIGVmZmVjdFN0cnVjdHVyZTogZWZmZWN0U3RydWN0dXJlLFxyXG4gICAgdHlwZU1hcDogdHlwZU1hcCxcclxuICAgIHNpemVNYXA6IHNpemVNYXAsXHJcbiAgICBmb3JtYXRNYXA6IGZvcm1hdE1hcCxcclxuICAgIHBhc3NQYXJhbXM6IHBhc3NQYXJhbXMsXHJcbiAgICBSZW5kZXJRdWV1ZTogUmVuZGVyUXVldWUsXHJcbiAgICBSZW5kZXJQcmlvcml0eTogUmVuZGVyUHJpb3JpdHksXHJcbiAgICBHRlhHZXRUeXBlU2l6ZTogR0ZYR2V0VHlwZVNpemUsXHJcbiAgICBVbmlmb3JtQmluZGluZzogVW5pZm9ybUJpbmRpbmdcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWFwcGluZ3M7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9