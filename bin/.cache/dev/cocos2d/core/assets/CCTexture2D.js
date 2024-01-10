
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCTexture2D.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
var EventTarget = require('../event/event-target');

var renderer = require('../renderer');

require('../platform/CCClass');

var GL_NEAREST = 9728; // gl.NEAREST

var GL_LINEAR = 9729; // gl.LINEAR

var GL_REPEAT = 10497; // gl.REPEAT

var GL_CLAMP_TO_EDGE = 33071; // gl.CLAMP_TO_EDGE

var GL_MIRRORED_REPEAT = 33648; // gl.MIRRORED_REPEAT

var GL_RGBA = 6408; // gl.RGBA

var CHAR_CODE_0 = 48; // '0'

var CHAR_CODE_1 = 49; // '1'

var idGenerater = new (require('../platform/id-generater'))('Tex');
/**
 * <p>
 * This class allows to easily create OpenGL or Canvas 2D textures from images, text or raw data.                                    <br/>
 * The created cc.Texture2D object will always have power-of-two dimensions.                                                <br/>
 * Depending on how you create the cc.Texture2D object, the actual image area of the texture might be smaller than the texture dimensions <br/>
 *  i.e. "contentSize" != (pixelsWide, pixelsHigh) and (maxS, maxT) != (1.0, 1.0).                                           <br/>
 * Be aware that the content of the generated textures will be upside-down! </p>

 * @class Texture2D
 * @uses EventTarget
 * @extends Asset
 */
// define a specified number for the pixel format which gfx do not have a standard definition.

var CUSTOM_PIXEL_FORMAT = 1024;
/**
 * The texture pixel format, default value is RGBA8888, 
 * you should note that textures loaded by normal image files (png, jpg) can only support RGBA8888 format,
 * other formats are supported by compressed file types or raw data.
 * @enum Texture2D.PixelFormat
 */

var PixelFormat = cc.Enum({
  /**
   * 16-bit texture without Alpha channel
   * @property RGB565
   * @readonly
   * @type {Number}
   */
  RGB565: _gfx["default"].TEXTURE_FMT_R5_G6_B5,

  /**
   * 16-bit textures: RGB5A1
   * @property RGB5A1
   * @readonly
   * @type {Number}
   */
  RGB5A1: _gfx["default"].TEXTURE_FMT_R5_G5_B5_A1,

  /**
   * 16-bit textures: RGBA4444
   * @property RGBA4444
   * @readonly
   * @type {Number}
   */
  RGBA4444: _gfx["default"].TEXTURE_FMT_R4_G4_B4_A4,

  /**
   * 24-bit texture: RGB888
   * @property RGB888
   * @readonly
   * @type {Number}
   */
  RGB888: _gfx["default"].TEXTURE_FMT_RGB8,

  /**
   * 32-bit texture: RGBA8888
   * @property RGBA8888
   * @readonly
   * @type {Number}
   */
  RGBA8888: _gfx["default"].TEXTURE_FMT_RGBA8,

  /**
   * 32-bit float texture: RGBA32F
   * @property RGBA32F
   * @readonly
   * @type {Number}
   */
  RGBA32F: _gfx["default"].TEXTURE_FMT_RGBA32F,

  /**
   * 8-bit textures used as masks
   * @property A8
   * @readonly
   * @type {Number}
   */
  A8: _gfx["default"].TEXTURE_FMT_A8,

  /**
   * 8-bit intensity texture
   * @property I8
   * @readonly
   * @type {Number}
   */
  I8: _gfx["default"].TEXTURE_FMT_L8,

  /**
   * 16-bit textures used as masks
   * @property AI88
   * @readonly
   * @type {Number}
   */
  AI8: _gfx["default"].TEXTURE_FMT_L8_A8,

  /**
   * rgb 2 bpp pvrtc
   * @property RGB_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_PVRTC_2BPPV1: _gfx["default"].TEXTURE_FMT_RGB_PVRTC_2BPPV1,

  /**
   * rgba 2 bpp pvrtc
   * @property RGBA_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGBA_PVRTC_2BPPV1: _gfx["default"].TEXTURE_FMT_RGBA_PVRTC_2BPPV1,

  /**
   * rgb separate a 2 bpp pvrtc
   * RGB_A_PVRTC_2BPPV1 texture is a 2x height RGB_PVRTC_2BPPV1 format texture.
   * It separate the origin alpha channel to the bottom half atlas, the origin rgb channel to the top half atlas
   * @property RGB_A_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_A_PVRTC_2BPPV1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb 4 bpp pvrtc
   * @property RGB_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_PVRTC_4BPPV1: _gfx["default"].TEXTURE_FMT_RGB_PVRTC_4BPPV1,

  /**
   * rgba 4 bpp pvrtc
   * @property RGBA_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGBA_PVRTC_4BPPV1: _gfx["default"].TEXTURE_FMT_RGBA_PVRTC_4BPPV1,

  /**
   * rgb a 4 bpp pvrtc
   * RGB_A_PVRTC_4BPPV1 texture is a 2x height RGB_PVRTC_4BPPV1 format texture.
   * It separate the origin alpha channel to the bottom half atlas, the origin rgb channel to the top half atlas
   * @property RGB_A_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_A_PVRTC_4BPPV1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb etc1
   * @property RGB_ETC1
   * @readonly
   * @type {Number}
   */
  RGB_ETC1: _gfx["default"].TEXTURE_FMT_RGB_ETC1,

  /**
   * rgba etc1
   * @property RGBA_ETC1
   * @readonly
   * @type {Number}
   */
  RGBA_ETC1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb etc2
   * @property RGB_ETC2
   * @readonly
   * @type {Number}
   */
  RGB_ETC2: _gfx["default"].TEXTURE_FMT_RGB_ETC2,

  /**
   * rgba etc2
   * @property RGBA_ETC2
   * @readonly
   * @type {Number}
   */
  RGBA_ETC2: _gfx["default"].TEXTURE_FMT_RGBA_ETC2
});
/**
 * The texture wrap mode
 * @enum Texture2D.WrapMode
 */

var WrapMode = cc.Enum({
  /**
   * The constant variable equals gl.REPEAT for texture
   * @property REPEAT
   * @type {Number}
   * @readonly
   */
  REPEAT: GL_REPEAT,

  /**
   * The constant variable equals gl.CLAMP_TO_EDGE for texture
   * @property CLAMP_TO_EDGE
   * @type {Number}
   * @readonly
   */
  CLAMP_TO_EDGE: GL_CLAMP_TO_EDGE,

  /**
   * The constant variable equals gl.MIRRORED_REPEAT for texture
   * @property MIRRORED_REPEAT
   * @type {Number}
   * @readonly
   */
  MIRRORED_REPEAT: GL_MIRRORED_REPEAT
});
/**
 * The texture filter mode
 * @enum Texture2D.Filter
 */

var Filter = cc.Enum({
  /**
   * The constant variable equals gl.LINEAR for texture
   * @property LINEAR
   * @type {Number}
   * @readonly
   */
  LINEAR: GL_LINEAR,

  /**
   * The constant variable equals gl.NEAREST for texture
   * @property NEAREST
   * @type {Number}
   * @readonly
   */
  NEAREST: GL_NEAREST
});
var FilterIndex = {
  9728: 0,
  // GL_NEAREST
  9729: 1 // GL_LINEAR

};
var _images = [];
var _sharedOpts = {
  width: undefined,
  height: undefined,
  minFilter: undefined,
  magFilter: undefined,
  wrapS: undefined,
  wrapT: undefined,
  format: undefined,
  genMipmaps: undefined,
  images: undefined,
  image: undefined,
  flipY: undefined,
  premultiplyAlpha: undefined
};

function _getSharedOptions() {
  for (var key in _sharedOpts) {
    _sharedOpts[key] = undefined;
  }

  _images.length = 0;
  _sharedOpts.images = _images;
  return _sharedOpts;
}
/**
 * This class allows to easily create OpenGL or Canvas 2D textures from images or raw data.
 *
 * @class Texture2D
 * @uses EventTarget
 * @extends Asset
 */


var Texture2D = cc.Class({
  name: 'cc.Texture2D',
  "extends": require('../assets/CCAsset'),
  mixins: [EventTarget],
  properties: {
    _nativeAsset: {
      get: function get() {
        // maybe returned to pool in webgl
        return this._image;
      },
      set: function set(data) {
        if (data._compressed && data._data) {
          this.initWithData(data._data, this._format, data.width, data.height);
        } else {
          this.initWithElement(data);
        }
      },
      override: true
    },
    _format: PixelFormat.RGBA8888,
    _premultiplyAlpha: false,
    _flipY: false,
    _minFilter: Filter.LINEAR,
    _magFilter: Filter.LINEAR,
    _mipFilter: Filter.LINEAR,
    _wrapS: WrapMode.CLAMP_TO_EDGE,
    _wrapT: WrapMode.CLAMP_TO_EDGE,
    _isAlphaAtlas: false,
    _genMipmaps: false,

    /**
     * !#en Sets whether generate mipmaps for the texture
     * !#zh 是否为纹理设置生成 mipmaps。
     * @property {Boolean} genMipmaps
     * @default false
     */
    genMipmaps: {
      get: function get() {
        return this._genMipmaps;
      },
      set: function set(genMipmaps) {
        if (this._genMipmaps !== genMipmaps) {
          var opts = _getSharedOptions();

          opts.genMipmaps = genMipmaps;
          this.update(opts);
        }
      }
    },
    _packable: true,

    /**
     * !#en 
     * Sets whether texture can be packed into texture atlas.
     * If need use texture uv in custom Effect, please sets packable to false.
     * !#zh 
     * 设置纹理是否允许参与合图。
     * 如果需要在自定义 Effect 中使用纹理 UV，需要禁止该选项。
     * @property {Boolean} packable
     * @default true
     */
    packable: {
      get: function get() {
        return this._packable;
      },
      set: function set(val) {
        this._packable = val;
      }
    },
    _nativeDep: {
      get: function get() {
        return {
          __isNative__: true,
          uuid: this._uuid,
          ext: this._native,
          __flipY__: this._flipY,
          __premultiplyAlpha__: this._premultiplyAlpha
        };
      },
      override: true
    }
  },
  statics: {
    PixelFormat: PixelFormat,
    WrapMode: WrapMode,
    Filter: Filter,
    _FilterIndex: FilterIndex,
    // predefined most common extnames
    extnames: ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.pvr', '.pkm'],
    _parseExt: function _parseExt(extIdStr, defaultFormat) {
      var device = cc.renderer.device;
      var extIds = extIdStr.split('_');
      var defaultExt = '';
      var bestExt = '';
      var bestIndex = 999;
      var bestFormat = defaultFormat;
      var SupportTextureFormats = cc.macro.SUPPORT_TEXTURE_FORMATS;

      for (var i = 0; i < extIds.length; i++) {
        var extFormat = extIds[i].split('@');
        var tmpExt = extFormat[0];
        tmpExt = Texture2D.extnames[tmpExt.charCodeAt(0) - CHAR_CODE_0] || tmpExt;
        var index = SupportTextureFormats.indexOf(tmpExt);

        if (index !== -1 && index < bestIndex) {
          var tmpFormat = extFormat[1] ? parseInt(extFormat[1]) : defaultFormat; // check whether or not support compressed texture

          if (tmpExt === '.pvr' && !device.ext('WEBGL_compressed_texture_pvrtc')) {
            continue;
          } else if ((tmpFormat === PixelFormat.RGB_ETC1 || tmpFormat === PixelFormat.RGBA_ETC1) && !device.ext('WEBGL_compressed_texture_etc1')) {
            continue;
          } else if ((tmpFormat === PixelFormat.RGB_ETC2 || tmpFormat === PixelFormat.RGBA_ETC2) && !device.ext('WEBGL_compressed_texture_etc')) {
            continue;
          } else if (tmpExt === '.webp' && !cc.sys.capabilities.webp) {
            continue;
          }

          bestIndex = index;
          bestExt = tmpExt;
          bestFormat = tmpFormat;
        } else if (!defaultExt) {
          defaultExt = tmpExt;
        }
      }

      return {
        bestExt: bestExt,
        bestFormat: bestFormat,
        defaultExt: defaultExt
      };
    }
  },
  ctor: function ctor() {
    // Id for generate hash in material
    this._id = idGenerater.getNewId();
    /**
     * !#en
     * Whether the texture is loaded or not
     * !#zh
     * 贴图是否已经成功加载
     * @property loaded
     * @type {Boolean}
     */

    this.loaded = false;
    /**
     * !#en
     * Texture width in pixel
     * !#zh
     * 贴图像素宽度
     * @property width
     * @type {Number}
     */

    this.width = 0;
    /**
     * !#en
     * Texture height in pixel
     * !#zh
     * 贴图像素高度
     * @property height
     * @type {Number}
     */

    this.height = 0;
    this._hashDirty = true;
    this._hash = 0;
    this._texture = null;

    if (CC_EDITOR) {
      this._exportedExts = null;
    }
  },

  /**
   * !#en
   * Get renderer texture implementation object
   * extended from render.Texture2D
   * !#zh  返回渲染器内部贴图对象
   * @method getImpl
   */
  getImpl: function getImpl() {
    if (!this._texture) this._texture = new renderer.Texture2D(renderer.device, {});
    return this._texture;
  },
  getId: function getId() {
    return this._id;
  },
  toString: function toString() {
    return this.nativeUrl || '';
  },

  /**
   * Update texture options, not available in Canvas render mode.
   * image, format, premultiplyAlpha can not be updated in native.
   * @method update
   * @param {Object} options
   * @param {DOMImageElement} options.image
   * @param {Boolean} options.genMipmaps
   * @param {PixelFormat} options.format
   * @param {Filter} options.minFilter
   * @param {Filter} options.magFilter
   * @param {WrapMode} options.wrapS
   * @param {WrapMode} options.wrapT
   * @param {Boolean} options.premultiplyAlpha
   */
  update: function update(options) {
    if (options) {
      var updateImg = false;

      if (options.width !== undefined) {
        this.width = options.width;
      }

      if (options.height !== undefined) {
        this.height = options.height;
      }

      if (options.minFilter !== undefined) {
        this._minFilter = options.minFilter;
        options.minFilter = FilterIndex[options.minFilter];
      }

      if (options.magFilter !== undefined) {
        this._magFilter = options.magFilter;
        options.magFilter = FilterIndex[options.magFilter];
      }

      if (options.mipFilter !== undefined) {
        this._mipFilter = options.mipFilter;
        options.mipFilter = FilterIndex[options.mipFilter];
      }

      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }

      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }

      if (options.format !== undefined) {
        this._format = options.format;
      }

      if (options.flipY !== undefined) {
        this._flipY = options.flipY;
        updateImg = true;
      }

      if (options.premultiplyAlpha !== undefined) {
        this._premultiplyAlpha = options.premultiplyAlpha;
        updateImg = true;
      }

      if (options.genMipmaps !== undefined) {
        this._genMipmaps = options.genMipmaps;
      }

      if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
        this._checkImageBitmap(this._upload.bind(this, options, updateImg));
      } else {
        this._upload(options, updateImg);
      }
    }
  },
  _upload: function _upload(options, updateImg) {
    if (updateImg && this._image) {
      options.image = this._image;
    }

    if (options.images && options.images.length > 0) {
      this._image = options.images[0];
    } else if (options.image !== undefined) {
      this._image = options.image;

      if (!options.images) {
        _images.length = 0;
        options.images = _images;
      } // webgl texture 2d uses images


      options.images.push(options.image);
    }

    this._texture && this._texture.update(options);
    this._hashDirty = true;
  },

  /**
   * !#en
   * Init with HTML element.
   * !#zh 用 HTML Image 或 Canvas 对象初始化贴图。
   * @method initWithElement
   * @param {HTMLImageElement|HTMLCanvasElement} element
   * @example
   * var img = new Image();
   * img.src = dataURL;
   * texture.initWithElement(img);
   */
  initWithElement: function initWithElement(element) {
    if (!element) return;
    this._image = element;

    if (element.complete || element instanceof HTMLCanvasElement) {
      this.handleLoadedTexture();
    } else if (cc.sys.capabilities.imageBitmap && element instanceof ImageBitmap) {
      this._checkImageBitmap(this.handleLoadedTexture.bind(this));
    } else {
      var self = this;
      element.addEventListener('load', function () {
        self.handleLoadedTexture();
      });
      element.addEventListener('error', function (err) {
        cc.warnID(3119, err.message);
      });
    }
  },

  /**
   * !#en
   * Intializes with texture data in ArrayBufferView.
   * !#zh 使用一个存储在 ArrayBufferView 中的图像数据（raw data）初始化数据。
   * @method initWithData
   * @param {ArrayBufferView} data
   * @param {Number} pixelFormat
   * @param {Number} pixelsWidth
   * @param {Number} pixelsHeight
   * @return {Boolean}
   */
  initWithData: function initWithData(data, pixelFormat, pixelsWidth, pixelsHeight) {
    var opts = _getSharedOptions();

    opts.image = data; // webgl texture 2d uses images

    opts.images = [opts.image];
    opts.genMipmaps = this._genMipmaps;
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;
    opts.format = this._getGFXPixelFormat(pixelFormat);
    opts.width = pixelsWidth;
    opts.height = pixelsHeight;

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }

    this.width = pixelsWidth;
    this.height = pixelsHeight;

    this._updateFormat();

    this._checkPackable();

    this.loaded = true;
    this.emit("load");
    return true;
  },

  /**
   * !#en
   * HTMLElement Object getter, available only on web.<br/>
   * Note: texture is packed into texture atlas by default<br/>
   * you should set texture.packable as false before getting Html element object.
   * !#zh 获取当前贴图对应的 HTML Image 或 Canvas 对象，只在 Web 平台下有效。<br/>
   * 注意：<br/>
   * texture 默认参与动态合图，如果需要获取到正确的 Html 元素对象，需要先设置 texture.packable 为 false
   * @method getHtmlElementObj
   * @return {HTMLImageElement|HTMLCanvasElement}
   */
  getHtmlElementObj: function getHtmlElementObj() {
    return this._image;
  },

  /**
   * !#en
   * Destory this texture and immediately release its video memory. (Inherit from cc.Object.destroy)<br>
   * After destroy, this object is not usable anymore.
   * You can use cc.isValid(obj) to check whether the object is destroyed before accessing it.
   * !#zh
   * 销毁该贴图，并立即释放它对应的显存。（继承自 cc.Object.destroy）<br/>
   * 销毁后，该对象不再可用。您可以在访问对象之前使用 cc.isValid(obj) 来检查对象是否已被销毁。
   * @method destroy
   * @return {Boolean} inherit from the CCObject
   */
  destroy: function destroy() {
    if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
      this._image.close && this._image.close();
    }

    this._packable && cc.dynamicAtlasManager && cc.dynamicAtlasManager.deleteAtlasTexture(this);
    this._image = null;
    this._texture && this._texture.destroy();

    this._super();
  },

  /**
   * !#en
   * Pixel format of the texture.
   * !#zh 获取纹理的像素格式。
   * @method getPixelFormat
   * @return {Number}
   */
  getPixelFormat: function getPixelFormat() {
    //support only in WebGl rendering mode
    return this._format;
  },

  /**
   * !#en
   * Whether or not the texture has their Alpha premultiplied.
   * !#zh 检查纹理在上传 GPU 时预乘选项是否开启。
   * @method hasPremultipliedAlpha
   * @return {Boolean}
   */
  hasPremultipliedAlpha: function hasPremultipliedAlpha() {
    return this._premultiplyAlpha || false;
  },
  isAlphaAtlas: function isAlphaAtlas() {
    return this._isAlphaAtlas;
  },

  /**
   * !#en
   * Handler of texture loaded event.
   * Since v2.0, you don't need to invoke this function, it will be invoked automatically after texture loaded.
   * !#zh 贴图加载事件处理器。v2.0 之后你将不在需要手动执行这个函数，它会在贴图加载成功之后自动执行。
   * @method handleLoadedTexture
   * @param {Boolean} [premultiplied]
   */
  handleLoadedTexture: function handleLoadedTexture() {
    if (!this._image || !this._image.width || !this._image.height) return;
    this.width = this._image.width;
    this.height = this._image.height;

    var opts = _getSharedOptions();

    opts.image = this._image; // webgl texture 2d uses images

    opts.images = [opts.image];
    opts.width = this.width;
    opts.height = this.height;
    opts.genMipmaps = this._genMipmaps;
    opts.format = this._getGFXPixelFormat(this._format);
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }

    this._updateFormat();

    this._checkPackable(); //dispatch load event to listener.


    this.loaded = true;
    this.emit("load");

    if (cc.macro.CLEANUP_IMAGE_CACHE) {
      if (this._image instanceof HTMLImageElement) {
        this._clearImage();
      } else if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
        this._image.close && this._image.close();
      }
    }
  },

  /**
   * !#en
   * Description of cc.Texture2D.
   * !#zh cc.Texture2D 描述。
   * @method description
   * @returns {String}
   */
  description: function description() {
    return "<cc.Texture2D | Name = " + this.nativeUrl + " | Dimensions = " + this.width + " x " + this.height + ">";
  },

  /**
   * !#en
   * Release texture, please use destroy instead.
   * !#zh 释放纹理，请使用 destroy 替代。
   * @method releaseTexture
   * @deprecated since v2.0
   */
  releaseTexture: function releaseTexture() {
    this._image = null;
    this._texture && this._texture.destroy();
  },

  /**
   * !#en Sets the wrap s and wrap t options. <br/>
   * If the texture size is NPOT (non power of 2), then in can only use gl.CLAMP_TO_EDGE in gl.TEXTURE_WRAP_{S,T}.
   * !#zh 设置纹理包装模式。
   * 若纹理贴图尺寸是 NPOT（non power of 2），则只能使用 Texture2D.WrapMode.CLAMP_TO_EDGE。
   * @method setWrapMode
   * @param {Texture2D.WrapMode} wrapS
   * @param {Texture2D.WrapMode} wrapT
   */
  setWrapMode: function setWrapMode(wrapS, wrapT) {
    if (this._wrapS !== wrapS || this._wrapT !== wrapT) {
      var opts = _getSharedOptions();

      opts.wrapS = wrapS;
      opts.wrapT = wrapT;
      this.update(opts);
    }
  },

  /**
   * !#en Sets the minFilter and magFilter options
   * !#zh 设置纹理贴图缩小和放大过滤器算法选项。
   * @method setFilters
   * @param {Texture2D.Filter} minFilter
   * @param {Texture2D.Filter} magFilter
   */
  setFilters: function setFilters(minFilter, magFilter) {
    if (this._minFilter !== minFilter || this._magFilter !== magFilter) {
      var opts = _getSharedOptions();

      opts.minFilter = minFilter;
      opts.magFilter = magFilter;
      this.update(opts);
    }
  },

  /**
   * !#en
   * Sets the flipY options
   * !#zh 设置贴图的纵向翻转选项。
   * @method setFlipY
   * @param {Boolean} flipY
   */
  setFlipY: function setFlipY(flipY) {
    if (this._flipY !== flipY) {
      var opts = _getSharedOptions();

      opts.flipY = flipY;
      opts.premultiplyAlpha = this._premultiplyAlpha;
      this.update(opts);
    }
  },

  /**
   * !#en
   * Sets the premultiply alpha options
   * !#zh 设置贴图的预乘选项。
   * @method setPremultiplyAlpha
   * @param {Boolean} premultiply
   */
  setPremultiplyAlpha: function setPremultiplyAlpha(premultiply) {
    if (this._premultiplyAlpha !== premultiply) {
      var opts = _getSharedOptions();

      opts.flipY = this._flipY;
      opts.premultiplyAlpha = premultiply;
      this.update(opts);
    }
  },
  _updateFormat: function _updateFormat() {
    this._isAlphaAtlas = this._format === PixelFormat.RGBA_ETC1 || this._format === PixelFormat.RGB_A_PVRTC_4BPPV1 || this._format === PixelFormat.RGB_A_PVRTC_2BPPV1;

    if (CC_JSB) {
      this._texture.setAlphaAtlas(this._isAlphaAtlas);
    }
  },
  _checkPackable: function _checkPackable() {
    var dynamicAtlas = cc.dynamicAtlasManager;
    if (!dynamicAtlas) return;

    if (this._isCompressed()) {
      this._packable = false;
      return;
    }

    var w = this.width,
        h = this.height;

    if (!this._image || w > dynamicAtlas.maxFrameSize || h > dynamicAtlas.maxFrameSize || this._getHash() !== dynamicAtlas.Atlas.DEFAULT_HASH) {
      this._packable = false;
      return;
    }

    if (this._image && this._image instanceof HTMLCanvasElement) {
      this._packable = true;
    }
  },
  _getOpts: function _getOpts() {
    var opts = _getSharedOptions();

    opts.width = this.width;
    opts.height = this.height;
    opts.genMipmaps = this._genMipmaps;
    opts.format = this._format;
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.anisotropy = this._anisotropy;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.mipFilter = FilterIndex[this._mipFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;
    return opts;
  },
  _getGFXPixelFormat: function _getGFXPixelFormat(format) {
    if (format === PixelFormat.RGBA_ETC1) {
      format = PixelFormat.RGB_ETC1;
    } else if (format === PixelFormat.RGB_A_PVRTC_4BPPV1) {
      format = PixelFormat.RGB_PVRTC_4BPPV1;
    } else if (format === PixelFormat.RGB_A_PVRTC_2BPPV1) {
      format = PixelFormat.RGB_PVRTC_2BPPV1;
    }

    return format;
  },
  _resetUnderlyingMipmaps: function _resetUnderlyingMipmaps(mipmapSources) {
    var opts = this._getOpts();

    opts.images = mipmapSources || [null];

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }
  },
  // SERIALIZATION
  _serialize: (CC_EDITOR || CC_TEST) && function () {
    var extId = "";
    var exportedExts = this._exportedExts;

    if (!exportedExts && this._native) {
      exportedExts = [this._native];
    }

    if (exportedExts) {
      var exts = [];

      for (var i = 0; i < exportedExts.length; i++) {
        var _extId = "";
        var ext = exportedExts[i];

        if (ext) {
          // ext@format
          var extFormat = ext.split('@');
          _extId = Texture2D.extnames.indexOf(extFormat[0]);

          if (_extId < 0) {
            _extId = ext;
          }

          if (extFormat[1]) {
            _extId += '@' + extFormat[1];
          }
        }

        exts.push(_extId);
      }

      extId = exts.join('_');
    }

    var asset = extId + "," + this._minFilter + "," + this._magFilter + "," + this._wrapS + "," + this._wrapT + "," + ((this._premultiplyAlpha ? 1 : 0) + "," + (this._genMipmaps ? 1 : 0) + "," + (this._packable ? 1 : 0));
    return asset;
  },
  _deserialize: function _deserialize(data) {
    var fields = data.split(','); // decode extname

    var extIdStr = fields[0];

    if (extIdStr) {
      var result = Texture2D._parseExt(extIdStr, this._format);

      if (result.bestExt) {
        this._setRawAsset(result.bestExt);

        this._format = result.bestFormat;
      } else if (result.defaultExt) {
        this._setRawAsset(result.defaultExt);

        cc.warnID(3120, result.defaultExt, result.defaultExt);
      } else {
        throw new Error(cc.debug.getError(3121));
      }
    }

    if (fields.length === 8) {
      // decode filters
      this._minFilter = parseInt(fields[1]);
      this._magFilter = parseInt(fields[2]); // decode wraps

      this._wrapS = parseInt(fields[3]);
      this._wrapT = parseInt(fields[4]); // decode premultiply alpha

      this._premultiplyAlpha = fields[5].charCodeAt(0) === CHAR_CODE_1;
      this._genMipmaps = fields[6].charCodeAt(0) === CHAR_CODE_1;
      this._packable = fields[7].charCodeAt(0) === CHAR_CODE_1;
    }
  },
  _getHash: function _getHash() {
    if (!this._hashDirty) {
      return this._hash;
    }

    var genMipmaps = this._genMipmaps ? 1 : 0;
    var premultiplyAlpha = this._premultiplyAlpha ? 1 : 0;
    var flipY = this._flipY ? 1 : 0;
    var minFilter = this._minFilter === Filter.LINEAR ? 1 : 2;
    var magFilter = this._magFilter === Filter.LINEAR ? 1 : 2;
    var wrapS = this._wrapS === WrapMode.REPEAT ? 1 : this._wrapS === WrapMode.CLAMP_TO_EDGE ? 2 : 3;
    var wrapT = this._wrapT === WrapMode.REPEAT ? 1 : this._wrapT === WrapMode.CLAMP_TO_EDGE ? 2 : 3;
    var pixelFormat = this._format;
    var image = this._image;

    if (CC_JSB && image) {
      if (image._glFormat && image._glFormat !== GL_RGBA) pixelFormat = 0;
      premultiplyAlpha = image._premultiplyAlpha ? 1 : 0;
    }

    this._hash = Number("" + minFilter + magFilter + pixelFormat + wrapS + wrapT + genMipmaps + premultiplyAlpha + flipY);
    this._hashDirty = false;
    return this._hash;
  },
  _isCompressed: function _isCompressed() {
    return this._format < PixelFormat.A8 || this._format > PixelFormat.RGBA32F;
  },
  _clearImage: function _clearImage() {
    this._image.src = "";
  },
  _checkImageBitmap: function _checkImageBitmap(cb) {
    var _this = this;

    var image = this._image;
    var flipY = this._flipY;
    var premultiplyAlpha = this._premultiplyAlpha;

    if (this._flipY !== image.flipY || this._premultiplyAlpha !== image.premultiplyAlpha) {
      createImageBitmap(image, {
        imageOrientation: flipY !== image.flipY ? 'flipY' : 'none',
        premultiplyAlpha: premultiplyAlpha ? 'premultiply' : 'none'
      }).then(function (result) {
        image.close && image.close();
        result.flipY = flipY;
        result.premultiplyAlpha = premultiplyAlpha;
        _this._image = result;
        cb();
      }, function (err) {
        cc.error(err.message);
      });
    } else {
      cb();
    }
  }
});
/**
 * !#zh
 * 当该资源加载成功后触发该事件
 * !#en
 * This event is emitted when the asset is loaded
 *
 * @event load
 */

cc.Texture2D = module.exports = Texture2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NUZXh0dXJlMkQuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwicmVuZGVyZXIiLCJHTF9ORUFSRVNUIiwiR0xfTElORUFSIiwiR0xfUkVQRUFUIiwiR0xfQ0xBTVBfVE9fRURHRSIsIkdMX01JUlJPUkVEX1JFUEVBVCIsIkdMX1JHQkEiLCJDSEFSX0NPREVfMCIsIkNIQVJfQ09ERV8xIiwiaWRHZW5lcmF0ZXIiLCJDVVNUT01fUElYRUxfRk9STUFUIiwiUGl4ZWxGb3JtYXQiLCJjYyIsIkVudW0iLCJSR0I1NjUiLCJnZngiLCJURVhUVVJFX0ZNVF9SNV9HNl9CNSIsIlJHQjVBMSIsIlRFWFRVUkVfRk1UX1I1X0c1X0I1X0ExIiwiUkdCQTQ0NDQiLCJURVhUVVJFX0ZNVF9SNF9HNF9CNF9BNCIsIlJHQjg4OCIsIlRFWFRVUkVfRk1UX1JHQjgiLCJSR0JBODg4OCIsIlRFWFRVUkVfRk1UX1JHQkE4IiwiUkdCQTMyRiIsIlRFWFRVUkVfRk1UX1JHQkEzMkYiLCJBOCIsIlRFWFRVUkVfRk1UX0E4IiwiSTgiLCJURVhUVVJFX0ZNVF9MOCIsIkFJOCIsIlRFWFRVUkVfRk1UX0w4X0E4IiwiUkdCX1BWUlRDXzJCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQl9QVlJUQ18yQlBQVjEiLCJSR0JBX1BWUlRDXzJCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQkFfUFZSVENfMkJQUFYxIiwiUkdCX0FfUFZSVENfMkJQUFYxIiwiUkdCX1BWUlRDXzRCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQl9QVlJUQ180QlBQVjEiLCJSR0JBX1BWUlRDXzRCUFBWMSIsIlRFWFRVUkVfRk1UX1JHQkFfUFZSVENfNEJQUFYxIiwiUkdCX0FfUFZSVENfNEJQUFYxIiwiUkdCX0VUQzEiLCJURVhUVVJFX0ZNVF9SR0JfRVRDMSIsIlJHQkFfRVRDMSIsIlJHQl9FVEMyIiwiVEVYVFVSRV9GTVRfUkdCX0VUQzIiLCJSR0JBX0VUQzIiLCJURVhUVVJFX0ZNVF9SR0JBX0VUQzIiLCJXcmFwTW9kZSIsIlJFUEVBVCIsIkNMQU1QX1RPX0VER0UiLCJNSVJST1JFRF9SRVBFQVQiLCJGaWx0ZXIiLCJMSU5FQVIiLCJORUFSRVNUIiwiRmlsdGVySW5kZXgiLCJfaW1hZ2VzIiwiX3NoYXJlZE9wdHMiLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsIm1pbkZpbHRlciIsIm1hZ0ZpbHRlciIsIndyYXBTIiwid3JhcFQiLCJmb3JtYXQiLCJnZW5NaXBtYXBzIiwiaW1hZ2VzIiwiaW1hZ2UiLCJmbGlwWSIsInByZW11bHRpcGx5QWxwaGEiLCJfZ2V0U2hhcmVkT3B0aW9ucyIsImtleSIsImxlbmd0aCIsIlRleHR1cmUyRCIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsInByb3BlcnRpZXMiLCJfbmF0aXZlQXNzZXQiLCJnZXQiLCJfaW1hZ2UiLCJzZXQiLCJkYXRhIiwiX2NvbXByZXNzZWQiLCJfZGF0YSIsImluaXRXaXRoRGF0YSIsIl9mb3JtYXQiLCJpbml0V2l0aEVsZW1lbnQiLCJvdmVycmlkZSIsIl9wcmVtdWx0aXBseUFscGhhIiwiX2ZsaXBZIiwiX21pbkZpbHRlciIsIl9tYWdGaWx0ZXIiLCJfbWlwRmlsdGVyIiwiX3dyYXBTIiwiX3dyYXBUIiwiX2lzQWxwaGFBdGxhcyIsIl9nZW5NaXBtYXBzIiwib3B0cyIsInVwZGF0ZSIsIl9wYWNrYWJsZSIsInBhY2thYmxlIiwidmFsIiwiX25hdGl2ZURlcCIsIl9faXNOYXRpdmVfXyIsInV1aWQiLCJfdXVpZCIsImV4dCIsIl9uYXRpdmUiLCJfX2ZsaXBZX18iLCJfX3ByZW11bHRpcGx5QWxwaGFfXyIsInN0YXRpY3MiLCJfRmlsdGVySW5kZXgiLCJleHRuYW1lcyIsIl9wYXJzZUV4dCIsImV4dElkU3RyIiwiZGVmYXVsdEZvcm1hdCIsImRldmljZSIsImV4dElkcyIsInNwbGl0IiwiZGVmYXVsdEV4dCIsImJlc3RFeHQiLCJiZXN0SW5kZXgiLCJiZXN0Rm9ybWF0IiwiU3VwcG9ydFRleHR1cmVGb3JtYXRzIiwibWFjcm8iLCJTVVBQT1JUX1RFWFRVUkVfRk9STUFUUyIsImkiLCJleHRGb3JtYXQiLCJ0bXBFeHQiLCJjaGFyQ29kZUF0IiwiaW5kZXgiLCJpbmRleE9mIiwidG1wRm9ybWF0IiwicGFyc2VJbnQiLCJzeXMiLCJjYXBhYmlsaXRpZXMiLCJ3ZWJwIiwiY3RvciIsIl9pZCIsImdldE5ld0lkIiwibG9hZGVkIiwiX2hhc2hEaXJ0eSIsIl9oYXNoIiwiX3RleHR1cmUiLCJDQ19FRElUT1IiLCJfZXhwb3J0ZWRFeHRzIiwiZ2V0SW1wbCIsImdldElkIiwidG9TdHJpbmciLCJuYXRpdmVVcmwiLCJvcHRpb25zIiwidXBkYXRlSW1nIiwibWlwRmlsdGVyIiwiaW1hZ2VCaXRtYXAiLCJJbWFnZUJpdG1hcCIsIl9jaGVja0ltYWdlQml0bWFwIiwiX3VwbG9hZCIsImJpbmQiLCJwdXNoIiwiZWxlbWVudCIsImNvbXBsZXRlIiwiSFRNTENhbnZhc0VsZW1lbnQiLCJoYW5kbGVMb2FkZWRUZXh0dXJlIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnIiLCJ3YXJuSUQiLCJtZXNzYWdlIiwicGl4ZWxGb3JtYXQiLCJwaXhlbHNXaWR0aCIsInBpeGVsc0hlaWdodCIsIl9nZXRHRlhQaXhlbEZvcm1hdCIsIl91cGRhdGVGb3JtYXQiLCJfY2hlY2tQYWNrYWJsZSIsImVtaXQiLCJnZXRIdG1sRWxlbWVudE9iaiIsImRlc3Ryb3kiLCJjbG9zZSIsImR5bmFtaWNBdGxhc01hbmFnZXIiLCJkZWxldGVBdGxhc1RleHR1cmUiLCJfc3VwZXIiLCJnZXRQaXhlbEZvcm1hdCIsImhhc1ByZW11bHRpcGxpZWRBbHBoYSIsImlzQWxwaGFBdGxhcyIsIkNMRUFOVVBfSU1BR0VfQ0FDSEUiLCJIVE1MSW1hZ2VFbGVtZW50IiwiX2NsZWFySW1hZ2UiLCJkZXNjcmlwdGlvbiIsInJlbGVhc2VUZXh0dXJlIiwic2V0V3JhcE1vZGUiLCJzZXRGaWx0ZXJzIiwic2V0RmxpcFkiLCJzZXRQcmVtdWx0aXBseUFscGhhIiwicHJlbXVsdGlwbHkiLCJDQ19KU0IiLCJzZXRBbHBoYUF0bGFzIiwiZHluYW1pY0F0bGFzIiwiX2lzQ29tcHJlc3NlZCIsInciLCJoIiwibWF4RnJhbWVTaXplIiwiX2dldEhhc2giLCJBdGxhcyIsIkRFRkFVTFRfSEFTSCIsIl9nZXRPcHRzIiwiYW5pc290cm9weSIsIl9hbmlzb3Ryb3B5IiwiX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMiLCJtaXBtYXBTb3VyY2VzIiwiX3NlcmlhbGl6ZSIsIkNDX1RFU1QiLCJleHRJZCIsImV4cG9ydGVkRXh0cyIsImV4dHMiLCJqb2luIiwiYXNzZXQiLCJfZGVzZXJpYWxpemUiLCJmaWVsZHMiLCJyZXN1bHQiLCJfc2V0UmF3QXNzZXQiLCJFcnJvciIsImRlYnVnIiwiZ2V0RXJyb3IiLCJfZ2xGb3JtYXQiLCJOdW1iZXIiLCJzcmMiLCJjYiIsImNyZWF0ZUltYWdlQml0bWFwIiwiaW1hZ2VPcmllbnRhdGlvbiIsInRoZW4iLCJlcnJvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE4QkE7Ozs7QUE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUEzQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxhQUFELENBQXhCOztBQUNBQSxPQUFPLENBQUMscUJBQUQsQ0FBUDs7QUFJQSxJQUFNRSxVQUFVLEdBQUcsSUFBbkIsRUFBd0M7O0FBQ3hDLElBQU1DLFNBQVMsR0FBRyxJQUFsQixFQUF3Qzs7QUFDeEMsSUFBTUMsU0FBUyxHQUFHLEtBQWxCLEVBQXdDOztBQUN4QyxJQUFNQyxnQkFBZ0IsR0FBRyxLQUF6QixFQUF3Qzs7QUFDeEMsSUFBTUMsa0JBQWtCLEdBQUcsS0FBM0IsRUFBd0M7O0FBQ3hDLElBQU1DLE9BQU8sR0FBRyxJQUFoQixFQUF3Qzs7QUFFeEMsSUFBTUMsV0FBVyxHQUFHLEVBQXBCLEVBQTJCOztBQUMzQixJQUFNQyxXQUFXLEdBQUcsRUFBcEIsRUFBMkI7O0FBRTNCLElBQUlDLFdBQVcsR0FBRyxLQUFLVixPQUFPLENBQUMsMEJBQUQsQ0FBWixFQUEwQyxLQUExQyxDQUFsQjtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUNBLElBQUlXLG1CQUFtQixHQUFHLElBQTFCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE1BQU0sRUFBRUMsZ0JBQUlDLG9CQVBZOztBQVF4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFRixnQkFBSUcsdUJBZFk7O0FBZXhCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxRQUFRLEVBQUVKLGdCQUFJSyx1QkFyQlU7O0FBc0J4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsTUFBTSxFQUFFTixnQkFBSU8sZ0JBNUJZOztBQTZCeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFFBQVEsRUFBRVIsZ0JBQUlTLGlCQW5DVTs7QUFvQ3hCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxPQUFPLEVBQUVWLGdCQUFJVyxtQkExQ1c7O0FBMkN4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsRUFBRSxFQUFFWixnQkFBSWEsY0FqRGdCOztBQWtEeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEVBQUUsRUFBRWQsZ0JBQUllLGNBeERnQjs7QUF5RHhCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxHQUFHLEVBQUVoQixnQkFBSWlCLGlCQS9EZTs7QUFpRXhCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxnQkFBZ0IsRUFBRWxCLGdCQUFJbUIsNEJBdkVFOztBQXdFeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGlCQUFpQixFQUFFcEIsZ0JBQUlxQiw2QkE5RUM7O0FBK0V4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGtCQUFrQixFQUFFM0IsbUJBQW1CLEVBdkZmOztBQXdGeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k0QixFQUFBQSxnQkFBZ0IsRUFBRXZCLGdCQUFJd0IsNEJBOUZFOztBQStGeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGlCQUFpQixFQUFFekIsZ0JBQUkwQiw2QkFyR0M7O0FBc0d4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGtCQUFrQixFQUFFaEMsbUJBQW1CLEVBOUdmOztBQStHeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lpQyxFQUFBQSxRQUFRLEVBQUU1QixnQkFBSTZCLG9CQXJIVTs7QUFzSHhCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUVuQyxtQkFBbUIsRUE1SE47O0FBOEh4QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSW9DLEVBQUFBLFFBQVEsRUFBRS9CLGdCQUFJZ0Msb0JBcElVOztBQXFJeEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFNBQVMsRUFBRWpDLGdCQUFJa0M7QUEzSVMsQ0FBUixDQUFwQjtBQThJQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNQyxRQUFRLEdBQUd0QyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSXNDLEVBQUFBLE1BQU0sRUFBRWhELFNBUGE7O0FBUXJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJaUQsRUFBQUEsYUFBYSxFQUFFaEQsZ0JBZE07O0FBZXJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJaUQsRUFBQUEsZUFBZSxFQUFFaEQ7QUFyQkksQ0FBUixDQUFqQjtBQXdCQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNaUQsTUFBTSxHQUFHMUMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0kwQyxFQUFBQSxNQUFNLEVBQUVyRCxTQVBXOztBQVFuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSXNELEVBQUFBLE9BQU8sRUFBRXZEO0FBZFUsQ0FBUixDQUFmO0FBaUJBLElBQU13RCxXQUFXLEdBQUc7QUFDaEIsUUFBTSxDQURVO0FBQ1A7QUFDVCxRQUFNLENBRlUsQ0FFUDs7QUFGTyxDQUFwQjtBQUtBLElBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0EsSUFBSUMsV0FBVyxHQUFHO0FBQ2RDLEVBQUFBLEtBQUssRUFBRUMsU0FETztBQUVkQyxFQUFBQSxNQUFNLEVBQUVELFNBRk07QUFHZEUsRUFBQUEsU0FBUyxFQUFFRixTQUhHO0FBSWRHLEVBQUFBLFNBQVMsRUFBRUgsU0FKRztBQUtkSSxFQUFBQSxLQUFLLEVBQUVKLFNBTE87QUFNZEssRUFBQUEsS0FBSyxFQUFFTCxTQU5PO0FBT2RNLEVBQUFBLE1BQU0sRUFBRU4sU0FQTTtBQVFkTyxFQUFBQSxVQUFVLEVBQUVQLFNBUkU7QUFTZFEsRUFBQUEsTUFBTSxFQUFFUixTQVRNO0FBVWRTLEVBQUFBLEtBQUssRUFBRVQsU0FWTztBQVdkVSxFQUFBQSxLQUFLLEVBQUVWLFNBWE87QUFZZFcsRUFBQUEsZ0JBQWdCLEVBQUVYO0FBWkosQ0FBbEI7O0FBY0EsU0FBU1ksaUJBQVQsR0FBOEI7QUFDMUIsT0FBSyxJQUFJQyxHQUFULElBQWdCZixXQUFoQixFQUE2QjtBQUN6QkEsSUFBQUEsV0FBVyxDQUFDZSxHQUFELENBQVgsR0FBbUJiLFNBQW5CO0FBQ0g7O0FBQ0RILEVBQUFBLE9BQU8sQ0FBQ2lCLE1BQVIsR0FBaUIsQ0FBakI7QUFDQWhCLEVBQUFBLFdBQVcsQ0FBQ1UsTUFBWixHQUFxQlgsT0FBckI7QUFDQSxTQUFPQyxXQUFQO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSWlCLFNBQVMsR0FBR2hFLEVBQUUsQ0FBQ2lFLEtBQUgsQ0FBUztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFLGNBRGU7QUFFckIsYUFBUy9FLE9BQU8sQ0FBQyxtQkFBRCxDQUZLO0FBR3JCZ0YsRUFBQUEsTUFBTSxFQUFFLENBQUNqRixXQUFELENBSGE7QUFLckJrRixFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZDLE1BQUFBLEdBRFUsaUJBQ0g7QUFDSDtBQUNBLGVBQU8sS0FBS0MsTUFBWjtBQUNILE9BSlM7QUFLVkMsTUFBQUEsR0FMVSxlQUtMQyxJQUxLLEVBS0M7QUFDUCxZQUFJQSxJQUFJLENBQUNDLFdBQUwsSUFBb0JELElBQUksQ0FBQ0UsS0FBN0IsRUFBb0M7QUFDaEMsZUFBS0MsWUFBTCxDQUFrQkgsSUFBSSxDQUFDRSxLQUF2QixFQUE4QixLQUFLRSxPQUFuQyxFQUE0Q0osSUFBSSxDQUFDekIsS0FBakQsRUFBd0R5QixJQUFJLENBQUN2QixNQUE3RDtBQUNILFNBRkQsTUFHSztBQUNELGVBQUs0QixlQUFMLENBQXFCTCxJQUFyQjtBQUNIO0FBQ0osT0FaUztBQWFWTSxNQUFBQSxRQUFRLEVBQUU7QUFiQSxLQUROO0FBZ0JSRixJQUFBQSxPQUFPLEVBQUU5RSxXQUFXLENBQUNZLFFBaEJiO0FBaUJScUUsSUFBQUEsaUJBQWlCLEVBQUUsS0FqQlg7QUFrQlJDLElBQUFBLE1BQU0sRUFBRSxLQWxCQTtBQW1CUkMsSUFBQUEsVUFBVSxFQUFFeEMsTUFBTSxDQUFDQyxNQW5CWDtBQW9CUndDLElBQUFBLFVBQVUsRUFBRXpDLE1BQU0sQ0FBQ0MsTUFwQlg7QUFxQlJ5QyxJQUFBQSxVQUFVLEVBQUUxQyxNQUFNLENBQUNDLE1BckJYO0FBc0JSMEMsSUFBQUEsTUFBTSxFQUFFL0MsUUFBUSxDQUFDRSxhQXRCVDtBQXVCUjhDLElBQUFBLE1BQU0sRUFBRWhELFFBQVEsQ0FBQ0UsYUF2QlQ7QUF5QlIrQyxJQUFBQSxhQUFhLEVBQUUsS0F6QlA7QUEyQlJDLElBQUFBLFdBQVcsRUFBRSxLQTNCTDs7QUE0QlI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FoQyxJQUFBQSxVQUFVLEVBQUU7QUFDUmMsTUFBQUEsR0FEUSxpQkFDRDtBQUNILGVBQU8sS0FBS2tCLFdBQVo7QUFDSCxPQUhPO0FBSVJoQixNQUFBQSxHQUpRLGVBSUhoQixVQUpHLEVBSVM7QUFDYixZQUFJLEtBQUtnQyxXQUFMLEtBQXFCaEMsVUFBekIsRUFBcUM7QUFDakMsY0FBSWlDLElBQUksR0FBRzVCLGlCQUFpQixFQUE1Qjs7QUFDQTRCLFVBQUFBLElBQUksQ0FBQ2pDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsZUFBS2tDLE1BQUwsQ0FBWUQsSUFBWjtBQUNIO0FBQ0o7QUFWTyxLQWxDSjtBQStDUkUsSUFBQUEsU0FBUyxFQUFFLElBL0NIOztBQWdEUjtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxRQUFRLEVBQUU7QUFDTnRCLE1BQUFBLEdBRE0saUJBQ0M7QUFDSCxlQUFPLEtBQUtxQixTQUFaO0FBQ0gsT0FISztBQUlObkIsTUFBQUEsR0FKTSxlQUlEcUIsR0FKQyxFQUlJO0FBQ04sYUFBS0YsU0FBTCxHQUFpQkUsR0FBakI7QUFDSDtBQU5LLEtBMURGO0FBbUVSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUnhCLE1BQUFBLEdBRFEsaUJBQ0Q7QUFDSCxlQUFPO0FBQ0h5QixVQUFBQSxZQUFZLEVBQUUsSUFEWDtBQUVIQyxVQUFBQSxJQUFJLEVBQUUsS0FBS0MsS0FGUjtBQUdIQyxVQUFBQSxHQUFHLEVBQUUsS0FBS0MsT0FIUDtBQUlIQyxVQUFBQSxTQUFTLEVBQUUsS0FBS25CLE1BSmI7QUFLSG9CLFVBQUFBLG9CQUFvQixFQUFFLEtBQUtyQjtBQUx4QixTQUFQO0FBT0gsT0FUTztBQVVSRCxNQUFBQSxRQUFRLEVBQUU7QUFWRjtBQW5FSixHQUxTO0FBc0ZyQnVCLEVBQUFBLE9BQU8sRUFBRTtBQUNMdkcsSUFBQUEsV0FBVyxFQUFFQSxXQURSO0FBRUx1QyxJQUFBQSxRQUFRLEVBQUVBLFFBRkw7QUFHTEksSUFBQUEsTUFBTSxFQUFFQSxNQUhIO0FBSUw2RCxJQUFBQSxZQUFZLEVBQUUxRCxXQUpUO0FBS0w7QUFDQTJELElBQUFBLFFBQVEsRUFBRSxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE9BQWpCLEVBQTBCLE1BQTFCLEVBQWtDLE9BQWxDLEVBQTJDLE1BQTNDLEVBQW1ELE1BQW5ELENBTkw7QUFRTEMsSUFBQUEsU0FSSyxxQkFRTUMsUUFSTixFQVFnQkMsYUFSaEIsRUFRK0I7QUFDaEMsVUFBSUMsTUFBTSxHQUFHNUcsRUFBRSxDQUFDWixRQUFILENBQVl3SCxNQUF6QjtBQUNBLFVBQUlDLE1BQU0sR0FBR0gsUUFBUSxDQUFDSSxLQUFULENBQWUsR0FBZixDQUFiO0FBRUEsVUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0EsVUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxVQUFJQyxTQUFTLEdBQUcsR0FBaEI7QUFDQSxVQUFJQyxVQUFVLEdBQUdQLGFBQWpCO0FBQ0EsVUFBSVEscUJBQXFCLEdBQUduSCxFQUFFLENBQUNvSCxLQUFILENBQVNDLHVCQUFyQzs7QUFDQSxXQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdULE1BQU0sQ0FBQzlDLE1BQTNCLEVBQW1DdUQsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxZQUFJQyxTQUFTLEdBQUdWLE1BQU0sQ0FBQ1MsQ0FBRCxDQUFOLENBQVVSLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBaEI7QUFDQSxZQUFJVSxNQUFNLEdBQUdELFNBQVMsQ0FBQyxDQUFELENBQXRCO0FBQ0FDLFFBQUFBLE1BQU0sR0FBR3hELFNBQVMsQ0FBQ3dDLFFBQVYsQ0FBbUJnQixNQUFNLENBQUNDLFVBQVAsQ0FBa0IsQ0FBbEIsSUFBdUI5SCxXQUExQyxLQUEwRDZILE1BQW5FO0FBRUEsWUFBSUUsS0FBSyxHQUFHUCxxQkFBcUIsQ0FBQ1EsT0FBdEIsQ0FBOEJILE1BQTlCLENBQVo7O0FBQ0EsWUFBSUUsS0FBSyxLQUFLLENBQUMsQ0FBWCxJQUFnQkEsS0FBSyxHQUFHVCxTQUE1QixFQUF1QztBQUVuQyxjQUFJVyxTQUFTLEdBQUdMLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZU0sUUFBUSxDQUFDTixTQUFTLENBQUMsQ0FBRCxDQUFWLENBQXZCLEdBQXdDWixhQUF4RCxDQUZtQyxDQUluQzs7QUFDQSxjQUFLYSxNQUFNLEtBQUssTUFBWCxJQUFxQixDQUFDWixNQUFNLENBQUNWLEdBQVAsQ0FBVyxnQ0FBWCxDQUEzQixFQUF5RTtBQUNyRTtBQUNILFdBRkQsTUFHSyxJQUFJLENBQUMwQixTQUFTLEtBQUs3SCxXQUFXLENBQUNnQyxRQUExQixJQUFzQzZGLFNBQVMsS0FBSzdILFdBQVcsQ0FBQ2tDLFNBQWpFLEtBQStFLENBQUMyRSxNQUFNLENBQUNWLEdBQVAsQ0FBVywrQkFBWCxDQUFwRixFQUFpSTtBQUNsSTtBQUNILFdBRkksTUFHQSxJQUFJLENBQUMwQixTQUFTLEtBQUs3SCxXQUFXLENBQUNtQyxRQUExQixJQUFzQzBGLFNBQVMsS0FBSzdILFdBQVcsQ0FBQ3FDLFNBQWpFLEtBQStFLENBQUN3RSxNQUFNLENBQUNWLEdBQVAsQ0FBVyw4QkFBWCxDQUFwRixFQUFnSTtBQUNqSTtBQUNILFdBRkksTUFHQSxJQUFJc0IsTUFBTSxLQUFLLE9BQVgsSUFBc0IsQ0FBQ3hILEVBQUUsQ0FBQzhILEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsSUFBL0MsRUFBcUQ7QUFDdEQ7QUFDSDs7QUFFRGYsVUFBQUEsU0FBUyxHQUFHUyxLQUFaO0FBQ0FWLFVBQUFBLE9BQU8sR0FBR1EsTUFBVjtBQUNBTixVQUFBQSxVQUFVLEdBQUdVLFNBQWI7QUFDSCxTQXJCRCxNQXNCSyxJQUFJLENBQUNiLFVBQUwsRUFBaUI7QUFDbEJBLFVBQUFBLFVBQVUsR0FBR1MsTUFBYjtBQUNIO0FBQ0o7O0FBQ0QsYUFBTztBQUFFUixRQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0UsUUFBQUEsVUFBVSxFQUFWQSxVQUFYO0FBQXVCSCxRQUFBQSxVQUFVLEVBQVZBO0FBQXZCLE9BQVA7QUFDSDtBQWxESSxHQXRGWTtBQTJJckJrQixFQUFBQSxJQTNJcUIsa0JBMkliO0FBQ0o7QUFDQSxTQUFLQyxHQUFMLEdBQVdySSxXQUFXLENBQUNzSSxRQUFaLEVBQVg7QUFFQTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNRLFNBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDUSxTQUFLcEYsS0FBTCxHQUFhLENBQWI7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNRLFNBQUtFLE1BQUwsR0FBYyxDQUFkO0FBRUEsU0FBS21GLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7O0FBRUEsUUFBSUMsU0FBSixFQUFlO0FBQ1gsV0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNIO0FBQ0osR0FsTG9COztBQW9MckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsT0EzTHFCLHFCQTJMVjtBQUNQLFFBQUksQ0FBQyxLQUFLSCxRQUFWLEVBQW9CLEtBQUtBLFFBQUwsR0FBZ0IsSUFBSW5KLFFBQVEsQ0FBQzRFLFNBQWIsQ0FBdUI1RSxRQUFRLENBQUN3SCxNQUFoQyxFQUF3QyxFQUF4QyxDQUFoQjtBQUNwQixXQUFPLEtBQUsyQixRQUFaO0FBQ0gsR0E5TG9CO0FBZ01yQkksRUFBQUEsS0FoTXFCLG1CQWdNWjtBQUNMLFdBQU8sS0FBS1QsR0FBWjtBQUNILEdBbE1vQjtBQW9NckJVLEVBQUFBLFFBcE1xQixzQkFvTVQ7QUFDUixXQUFPLEtBQUtDLFNBQUwsSUFBa0IsRUFBekI7QUFDSCxHQXRNb0I7O0FBd01yQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0luRCxFQUFBQSxNQXROcUIsa0JBc05ib0QsT0F0TmEsRUFzTko7QUFDYixRQUFJQSxPQUFKLEVBQWE7QUFDVCxVQUFJQyxTQUFTLEdBQUcsS0FBaEI7O0FBQ0EsVUFBSUQsT0FBTyxDQUFDOUYsS0FBUixLQUFrQkMsU0FBdEIsRUFBaUM7QUFDN0IsYUFBS0QsS0FBTCxHQUFhOEYsT0FBTyxDQUFDOUYsS0FBckI7QUFDSDs7QUFDRCxVQUFJOEYsT0FBTyxDQUFDNUYsTUFBUixLQUFtQkQsU0FBdkIsRUFBa0M7QUFDOUIsYUFBS0MsTUFBTCxHQUFjNEYsT0FBTyxDQUFDNUYsTUFBdEI7QUFDSDs7QUFDRCxVQUFJNEYsT0FBTyxDQUFDM0YsU0FBUixLQUFzQkYsU0FBMUIsRUFBcUM7QUFDakMsYUFBS2lDLFVBQUwsR0FBa0I0RCxPQUFPLENBQUMzRixTQUExQjtBQUNBMkYsUUFBQUEsT0FBTyxDQUFDM0YsU0FBUixHQUFvQk4sV0FBVyxDQUFDaUcsT0FBTyxDQUFDM0YsU0FBVCxDQUEvQjtBQUNIOztBQUNELFVBQUkyRixPQUFPLENBQUMxRixTQUFSLEtBQXNCSCxTQUExQixFQUFxQztBQUNqQyxhQUFLa0MsVUFBTCxHQUFrQjJELE9BQU8sQ0FBQzFGLFNBQTFCO0FBQ0EwRixRQUFBQSxPQUFPLENBQUMxRixTQUFSLEdBQW9CUCxXQUFXLENBQUNpRyxPQUFPLENBQUMxRixTQUFULENBQS9CO0FBQ0g7O0FBQ0QsVUFBSTBGLE9BQU8sQ0FBQ0UsU0FBUixLQUFzQi9GLFNBQTFCLEVBQXFDO0FBQ2pDLGFBQUttQyxVQUFMLEdBQWtCMEQsT0FBTyxDQUFDRSxTQUExQjtBQUNBRixRQUFBQSxPQUFPLENBQUNFLFNBQVIsR0FBb0JuRyxXQUFXLENBQUNpRyxPQUFPLENBQUNFLFNBQVQsQ0FBL0I7QUFDSDs7QUFDRCxVQUFJRixPQUFPLENBQUN6RixLQUFSLEtBQWtCSixTQUF0QixFQUFpQztBQUM3QixhQUFLb0MsTUFBTCxHQUFjeUQsT0FBTyxDQUFDekYsS0FBdEI7QUFDSDs7QUFDRCxVQUFJeUYsT0FBTyxDQUFDeEYsS0FBUixLQUFrQkwsU0FBdEIsRUFBaUM7QUFDN0IsYUFBS3FDLE1BQUwsR0FBY3dELE9BQU8sQ0FBQ3hGLEtBQXRCO0FBQ0g7O0FBQ0QsVUFBSXdGLE9BQU8sQ0FBQ3ZGLE1BQVIsS0FBbUJOLFNBQXZCLEVBQWtDO0FBQzlCLGFBQUs0QixPQUFMLEdBQWVpRSxPQUFPLENBQUN2RixNQUF2QjtBQUNIOztBQUNELFVBQUl1RixPQUFPLENBQUNuRixLQUFSLEtBQWtCVixTQUF0QixFQUFpQztBQUM3QixhQUFLZ0MsTUFBTCxHQUFjNkQsT0FBTyxDQUFDbkYsS0FBdEI7QUFDQW9GLFFBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0g7O0FBQ0QsVUFBSUQsT0FBTyxDQUFDbEYsZ0JBQVIsS0FBNkJYLFNBQWpDLEVBQTRDO0FBQ3hDLGFBQUsrQixpQkFBTCxHQUF5QjhELE9BQU8sQ0FBQ2xGLGdCQUFqQztBQUNBbUYsUUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDSDs7QUFDRCxVQUFJRCxPQUFPLENBQUN0RixVQUFSLEtBQXVCUCxTQUEzQixFQUFzQztBQUNsQyxhQUFLdUMsV0FBTCxHQUFtQnNELE9BQU8sQ0FBQ3RGLFVBQTNCO0FBQ0g7O0FBRUQsVUFBSXhELEVBQUUsQ0FBQzhILEdBQUgsQ0FBT0MsWUFBUCxDQUFvQmtCLFdBQXBCLElBQW1DLEtBQUsxRSxNQUFMLFlBQXVCMkUsV0FBOUQsRUFBMkU7QUFDdkUsYUFBS0MsaUJBQUwsQ0FBdUIsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLEVBQXdCUCxPQUF4QixFQUFpQ0MsU0FBakMsQ0FBdkI7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLSyxPQUFMLENBQWFOLE9BQWIsRUFBc0JDLFNBQXRCO0FBQ0g7QUFFSjtBQUNKLEdBeFFvQjtBQTJRckJLLEVBQUFBLE9BM1FxQixtQkEyUVpOLE9BM1FZLEVBMlFIQyxTQTNRRyxFQTJRUTtBQUN6QixRQUFJQSxTQUFTLElBQUksS0FBS3hFLE1BQXRCLEVBQThCO0FBQzFCdUUsTUFBQUEsT0FBTyxDQUFDcEYsS0FBUixHQUFnQixLQUFLYSxNQUFyQjtBQUNIOztBQUNELFFBQUl1RSxPQUFPLENBQUNyRixNQUFSLElBQWtCcUYsT0FBTyxDQUFDckYsTUFBUixDQUFlTSxNQUFmLEdBQXdCLENBQTlDLEVBQWlEO0FBQzdDLFdBQUtRLE1BQUwsR0FBY3VFLE9BQU8sQ0FBQ3JGLE1BQVIsQ0FBZSxDQUFmLENBQWQ7QUFDSCxLQUZELE1BR0ssSUFBSXFGLE9BQU8sQ0FBQ3BGLEtBQVIsS0FBa0JULFNBQXRCLEVBQWlDO0FBQ2xDLFdBQUtzQixNQUFMLEdBQWN1RSxPQUFPLENBQUNwRixLQUF0Qjs7QUFDQSxVQUFJLENBQUNvRixPQUFPLENBQUNyRixNQUFiLEVBQXFCO0FBQ2pCWCxRQUFBQSxPQUFPLENBQUNpQixNQUFSLEdBQWlCLENBQWpCO0FBQ0ErRSxRQUFBQSxPQUFPLENBQUNyRixNQUFSLEdBQWlCWCxPQUFqQjtBQUNILE9BTGlDLENBTWxDOzs7QUFDQWdHLE1BQUFBLE9BQU8sQ0FBQ3JGLE1BQVIsQ0FBZTZGLElBQWYsQ0FBb0JSLE9BQU8sQ0FBQ3BGLEtBQTVCO0FBQ0g7O0FBRUQsU0FBSzZFLFFBQUwsSUFBaUIsS0FBS0EsUUFBTCxDQUFjN0MsTUFBZCxDQUFxQm9ELE9BQXJCLENBQWpCO0FBRUEsU0FBS1QsVUFBTCxHQUFrQixJQUFsQjtBQUNILEdBL1JvQjs7QUFpU3JCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSXZELEVBQUFBLGVBNVNxQiwyQkE0U0p5RSxPQTVTSSxFQTRTSztBQUN0QixRQUFJLENBQUNBLE9BQUwsRUFDSTtBQUNKLFNBQUtoRixNQUFMLEdBQWNnRixPQUFkOztBQUNBLFFBQUlBLE9BQU8sQ0FBQ0MsUUFBUixJQUFvQkQsT0FBTyxZQUFZRSxpQkFBM0MsRUFBOEQ7QUFDMUQsV0FBS0MsbUJBQUw7QUFDSCxLQUZELE1BR0ssSUFBSTFKLEVBQUUsQ0FBQzhILEdBQUgsQ0FBT0MsWUFBUCxDQUFvQmtCLFdBQXBCLElBQW1DTSxPQUFPLFlBQVlMLFdBQTFELEVBQXVFO0FBQ3hFLFdBQUtDLGlCQUFMLENBQXVCLEtBQUtPLG1CQUFMLENBQXlCTCxJQUF6QixDQUE4QixJQUE5QixDQUF2QjtBQUNILEtBRkksTUFHQTtBQUNELFVBQUlNLElBQUksR0FBRyxJQUFYO0FBQ0FKLE1BQUFBLE9BQU8sQ0FBQ0ssZ0JBQVIsQ0FBeUIsTUFBekIsRUFBaUMsWUFBWTtBQUN6Q0QsUUFBQUEsSUFBSSxDQUFDRCxtQkFBTDtBQUNILE9BRkQ7QUFHQUgsTUFBQUEsT0FBTyxDQUFDSyxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxVQUFVQyxHQUFWLEVBQWU7QUFDN0M3SixRQUFBQSxFQUFFLENBQUM4SixNQUFILENBQVUsSUFBVixFQUFnQkQsR0FBRyxDQUFDRSxPQUFwQjtBQUNILE9BRkQ7QUFHSDtBQUNKLEdBL1RvQjs7QUFpVXJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSW5GLEVBQUFBLFlBNVVxQix3QkE0VVBILElBNVVPLEVBNFVEdUYsV0E1VUMsRUE0VVlDLFdBNVVaLEVBNFV5QkMsWUE1VXpCLEVBNFV1QztBQUN4RCxRQUFJekUsSUFBSSxHQUFHNUIsaUJBQWlCLEVBQTVCOztBQUNBNEIsSUFBQUEsSUFBSSxDQUFDL0IsS0FBTCxHQUFhZSxJQUFiLENBRndELENBR3hEOztBQUNBZ0IsSUFBQUEsSUFBSSxDQUFDaEMsTUFBTCxHQUFjLENBQUNnQyxJQUFJLENBQUMvQixLQUFOLENBQWQ7QUFDQStCLElBQUFBLElBQUksQ0FBQ2pDLFVBQUwsR0FBa0IsS0FBS2dDLFdBQXZCO0FBQ0FDLElBQUFBLElBQUksQ0FBQzdCLGdCQUFMLEdBQXdCLEtBQUtvQixpQkFBN0I7QUFDQVMsSUFBQUEsSUFBSSxDQUFDOUIsS0FBTCxHQUFhLEtBQUtzQixNQUFsQjtBQUNBUSxJQUFBQSxJQUFJLENBQUN0QyxTQUFMLEdBQWlCTixXQUFXLENBQUMsS0FBS3FDLFVBQU4sQ0FBNUI7QUFDQU8sSUFBQUEsSUFBSSxDQUFDckMsU0FBTCxHQUFpQlAsV0FBVyxDQUFDLEtBQUtzQyxVQUFOLENBQTVCO0FBQ0FNLElBQUFBLElBQUksQ0FBQ3BDLEtBQUwsR0FBYSxLQUFLZ0MsTUFBbEI7QUFDQUksSUFBQUEsSUFBSSxDQUFDbkMsS0FBTCxHQUFhLEtBQUtnQyxNQUFsQjtBQUNBRyxJQUFBQSxJQUFJLENBQUNsQyxNQUFMLEdBQWMsS0FBSzRHLGtCQUFMLENBQXdCSCxXQUF4QixDQUFkO0FBQ0F2RSxJQUFBQSxJQUFJLENBQUN6QyxLQUFMLEdBQWFpSCxXQUFiO0FBQ0F4RSxJQUFBQSxJQUFJLENBQUN2QyxNQUFMLEdBQWNnSCxZQUFkOztBQUNBLFFBQUksQ0FBQyxLQUFLM0IsUUFBVixFQUFvQjtBQUNoQixXQUFLQSxRQUFMLEdBQWdCLElBQUluSixRQUFRLENBQUM0RSxTQUFiLENBQXVCNUUsUUFBUSxDQUFDd0gsTUFBaEMsRUFBd0NuQixJQUF4QyxDQUFoQjtBQUNILEtBRkQsTUFHSztBQUNELFdBQUs4QyxRQUFMLENBQWM3QyxNQUFkLENBQXFCRCxJQUFyQjtBQUNIOztBQUNELFNBQUt6QyxLQUFMLEdBQWFpSCxXQUFiO0FBQ0EsU0FBSy9HLE1BQUwsR0FBY2dILFlBQWQ7O0FBRUEsU0FBS0UsYUFBTDs7QUFDQSxTQUFLQyxjQUFMOztBQUVBLFNBQUtqQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtrQyxJQUFMLENBQVUsTUFBVjtBQUNBLFdBQU8sSUFBUDtBQUNILEdBMVdvQjs7QUE0V3JCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsaUJBdlhxQiwrQkF1WEE7QUFDakIsV0FBTyxLQUFLaEcsTUFBWjtBQUNILEdBelhvQjs7QUEyWHJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWlHLEVBQUFBLE9BdFlxQixxQkFzWVY7QUFDUCxRQUFJeEssRUFBRSxDQUFDOEgsR0FBSCxDQUFPQyxZQUFQLENBQW9Ca0IsV0FBcEIsSUFBbUMsS0FBSzFFLE1BQUwsWUFBdUIyRSxXQUE5RCxFQUEyRTtBQUN2RSxXQUFLM0UsTUFBTCxDQUFZa0csS0FBWixJQUFxQixLQUFLbEcsTUFBTCxDQUFZa0csS0FBWixFQUFyQjtBQUNIOztBQUNELFNBQUs5RSxTQUFMLElBQWtCM0YsRUFBRSxDQUFDMEssbUJBQXJCLElBQTRDMUssRUFBRSxDQUFDMEssbUJBQUgsQ0FBdUJDLGtCQUF2QixDQUEwQyxJQUExQyxDQUE1QztBQUVBLFNBQUtwRyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtnRSxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY2lDLE9BQWQsRUFBakI7O0FBQ0EsU0FBS0ksTUFBTDtBQUNILEdBL1lvQjs7QUFpWnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLGNBeFpxQiw0QkF3Wkg7QUFDZDtBQUNBLFdBQU8sS0FBS2hHLE9BQVo7QUFDSCxHQTNab0I7O0FBNlpyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJaUcsRUFBQUEscUJBcGFxQixtQ0FvYUk7QUFDckIsV0FBTyxLQUFLOUYsaUJBQUwsSUFBMEIsS0FBakM7QUFDSCxHQXRhb0I7QUF3YXJCK0YsRUFBQUEsWUF4YXFCLDBCQXdhTDtBQUNaLFdBQU8sS0FBS3hGLGFBQVo7QUFDSCxHQTFhb0I7O0FBNGFyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ltRSxFQUFBQSxtQkFwYnFCLGlDQW9iRTtBQUNuQixRQUFJLENBQUMsS0FBS25GLE1BQU4sSUFBZ0IsQ0FBQyxLQUFLQSxNQUFMLENBQVl2QixLQUE3QixJQUFzQyxDQUFDLEtBQUt1QixNQUFMLENBQVlyQixNQUF2RCxFQUNJO0FBRUosU0FBS0YsS0FBTCxHQUFhLEtBQUt1QixNQUFMLENBQVl2QixLQUF6QjtBQUNBLFNBQUtFLE1BQUwsR0FBYyxLQUFLcUIsTUFBTCxDQUFZckIsTUFBMUI7O0FBQ0EsUUFBSXVDLElBQUksR0FBRzVCLGlCQUFpQixFQUE1Qjs7QUFDQTRCLElBQUFBLElBQUksQ0FBQy9CLEtBQUwsR0FBYSxLQUFLYSxNQUFsQixDQVBtQixDQVFuQjs7QUFDQWtCLElBQUFBLElBQUksQ0FBQ2hDLE1BQUwsR0FBYyxDQUFDZ0MsSUFBSSxDQUFDL0IsS0FBTixDQUFkO0FBQ0ErQixJQUFBQSxJQUFJLENBQUN6QyxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQXlDLElBQUFBLElBQUksQ0FBQ3ZDLE1BQUwsR0FBYyxLQUFLQSxNQUFuQjtBQUNBdUMsSUFBQUEsSUFBSSxDQUFDakMsVUFBTCxHQUFrQixLQUFLZ0MsV0FBdkI7QUFDQUMsSUFBQUEsSUFBSSxDQUFDbEMsTUFBTCxHQUFjLEtBQUs0RyxrQkFBTCxDQUF3QixLQUFLdEYsT0FBN0IsQ0FBZDtBQUNBWSxJQUFBQSxJQUFJLENBQUM3QixnQkFBTCxHQUF3QixLQUFLb0IsaUJBQTdCO0FBQ0FTLElBQUFBLElBQUksQ0FBQzlCLEtBQUwsR0FBYSxLQUFLc0IsTUFBbEI7QUFDQVEsSUFBQUEsSUFBSSxDQUFDdEMsU0FBTCxHQUFpQk4sV0FBVyxDQUFDLEtBQUtxQyxVQUFOLENBQTVCO0FBQ0FPLElBQUFBLElBQUksQ0FBQ3JDLFNBQUwsR0FBaUJQLFdBQVcsQ0FBQyxLQUFLc0MsVUFBTixDQUE1QjtBQUNBTSxJQUFBQSxJQUFJLENBQUNwQyxLQUFMLEdBQWEsS0FBS2dDLE1BQWxCO0FBQ0FJLElBQUFBLElBQUksQ0FBQ25DLEtBQUwsR0FBYSxLQUFLZ0MsTUFBbEI7O0FBRUEsUUFBSSxDQUFDLEtBQUtpRCxRQUFWLEVBQW9CO0FBQ2hCLFdBQUtBLFFBQUwsR0FBZ0IsSUFBSW5KLFFBQVEsQ0FBQzRFLFNBQWIsQ0FBdUI1RSxRQUFRLENBQUN3SCxNQUFoQyxFQUF3Q25CLElBQXhDLENBQWhCO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsV0FBSzhDLFFBQUwsQ0FBYzdDLE1BQWQsQ0FBcUJELElBQXJCO0FBQ0g7O0FBRUQsU0FBSzJFLGFBQUw7O0FBQ0EsU0FBS0MsY0FBTCxHQTdCbUIsQ0ErQm5COzs7QUFDQSxTQUFLakMsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLa0MsSUFBTCxDQUFVLE1BQVY7O0FBRUEsUUFBSXRLLEVBQUUsQ0FBQ29ILEtBQUgsQ0FBUzRELG1CQUFiLEVBQWtDO0FBQzlCLFVBQUksS0FBS3pHLE1BQUwsWUFBdUIwRyxnQkFBM0IsRUFBNkM7QUFDekMsYUFBS0MsV0FBTDtBQUNILE9BRkQsTUFHSyxJQUFJbEwsRUFBRSxDQUFDOEgsR0FBSCxDQUFPQyxZQUFQLENBQW9Ca0IsV0FBcEIsSUFBbUMsS0FBSzFFLE1BQUwsWUFBdUIyRSxXQUE5RCxFQUEyRTtBQUM1RSxhQUFLM0UsTUFBTCxDQUFZa0csS0FBWixJQUFxQixLQUFLbEcsTUFBTCxDQUFZa0csS0FBWixFQUFyQjtBQUNIO0FBQ0o7QUFDSixHQS9kb0I7O0FBaWVyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJVSxFQUFBQSxXQXhlcUIseUJBd2VOO0FBQ1gsV0FBTyw0QkFBNEIsS0FBS3RDLFNBQWpDLEdBQTZDLGtCQUE3QyxHQUFrRSxLQUFLN0YsS0FBdkUsR0FBK0UsS0FBL0UsR0FBdUYsS0FBS0UsTUFBNUYsR0FBcUcsR0FBNUc7QUFDSCxHQTFlb0I7O0FBNGVyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJa0ksRUFBQUEsY0FuZnFCLDRCQW1mSDtBQUNkLFNBQUs3RyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtnRSxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY2lDLE9BQWQsRUFBakI7QUFDSCxHQXRmb0I7O0FBd2ZyQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWEsRUFBQUEsV0FqZ0JxQix1QkFpZ0JSaEksS0FqZ0JRLEVBaWdCREMsS0FqZ0JDLEVBaWdCTTtBQUN2QixRQUFJLEtBQUsrQixNQUFMLEtBQWdCaEMsS0FBaEIsSUFBeUIsS0FBS2lDLE1BQUwsS0FBZ0JoQyxLQUE3QyxFQUFvRDtBQUNoRCxVQUFJbUMsSUFBSSxHQUFHNUIsaUJBQWlCLEVBQTVCOztBQUNBNEIsTUFBQUEsSUFBSSxDQUFDcEMsS0FBTCxHQUFhQSxLQUFiO0FBQ0FvQyxNQUFBQSxJQUFJLENBQUNuQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxXQUFLb0MsTUFBTCxDQUFZRCxJQUFaO0FBQ0g7QUFDSixHQXhnQm9COztBQTBnQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k2RixFQUFBQSxVQWpoQnFCLHNCQWloQlRuSSxTQWpoQlMsRUFpaEJFQyxTQWpoQkYsRUFpaEJhO0FBQzlCLFFBQUksS0FBSzhCLFVBQUwsS0FBb0IvQixTQUFwQixJQUFpQyxLQUFLZ0MsVUFBTCxLQUFvQi9CLFNBQXpELEVBQW9FO0FBQ2hFLFVBQUlxQyxJQUFJLEdBQUc1QixpQkFBaUIsRUFBNUI7O0FBQ0E0QixNQUFBQSxJQUFJLENBQUN0QyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBc0MsTUFBQUEsSUFBSSxDQUFDckMsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxXQUFLc0MsTUFBTCxDQUFZRCxJQUFaO0FBQ0g7QUFDSixHQXhoQm9COztBQTBoQnJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k4RixFQUFBQSxRQWppQnFCLG9CQWlpQlg1SCxLQWppQlcsRUFpaUJKO0FBQ2IsUUFBSSxLQUFLc0IsTUFBTCxLQUFnQnRCLEtBQXBCLEVBQTJCO0FBQ3ZCLFVBQUk4QixJQUFJLEdBQUc1QixpQkFBaUIsRUFBNUI7O0FBQ0E0QixNQUFBQSxJQUFJLENBQUM5QixLQUFMLEdBQWFBLEtBQWI7QUFDQThCLE1BQUFBLElBQUksQ0FBQzdCLGdCQUFMLEdBQXdCLEtBQUtvQixpQkFBN0I7QUFDQSxXQUFLVSxNQUFMLENBQVlELElBQVo7QUFDSDtBQUNKLEdBeGlCb0I7O0FBMGlCckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSStGLEVBQUFBLG1CQWpqQnFCLCtCQWlqQkFDLFdBampCQSxFQWlqQmE7QUFDOUIsUUFBSSxLQUFLekcsaUJBQUwsS0FBMkJ5RyxXQUEvQixFQUE0QztBQUN4QyxVQUFJaEcsSUFBSSxHQUFHNUIsaUJBQWlCLEVBQTVCOztBQUNBNEIsTUFBQUEsSUFBSSxDQUFDOUIsS0FBTCxHQUFhLEtBQUtzQixNQUFsQjtBQUNBUSxNQUFBQSxJQUFJLENBQUM3QixnQkFBTCxHQUF3QjZILFdBQXhCO0FBQ0EsV0FBSy9GLE1BQUwsQ0FBWUQsSUFBWjtBQUNIO0FBQ0osR0F4akJvQjtBQTBqQnJCMkUsRUFBQUEsYUExakJxQiwyQkEwakJKO0FBQ2IsU0FBSzdFLGFBQUwsR0FBcUIsS0FBS1YsT0FBTCxLQUFpQjlFLFdBQVcsQ0FBQ2tDLFNBQTdCLElBQTBDLEtBQUs0QyxPQUFMLEtBQWlCOUUsV0FBVyxDQUFDK0Isa0JBQXZFLElBQTZGLEtBQUsrQyxPQUFMLEtBQWlCOUUsV0FBVyxDQUFDMEIsa0JBQS9JOztBQUNBLFFBQUlpSyxNQUFKLEVBQVk7QUFDUixXQUFLbkQsUUFBTCxDQUFjb0QsYUFBZCxDQUE0QixLQUFLcEcsYUFBakM7QUFDSDtBQUNKLEdBL2pCb0I7QUFpa0JyQjhFLEVBQUFBLGNBamtCcUIsNEJBaWtCSDtBQUNkLFFBQUl1QixZQUFZLEdBQUc1TCxFQUFFLENBQUMwSyxtQkFBdEI7QUFDQSxRQUFJLENBQUNrQixZQUFMLEVBQW1COztBQUVuQixRQUFJLEtBQUtDLGFBQUwsRUFBSixFQUEwQjtBQUN0QixXQUFLbEcsU0FBTCxHQUFpQixLQUFqQjtBQUNBO0FBQ0g7O0FBRUQsUUFBSW1HLENBQUMsR0FBRyxLQUFLOUksS0FBYjtBQUFBLFFBQW9CK0ksQ0FBQyxHQUFHLEtBQUs3SSxNQUE3Qjs7QUFDQSxRQUFJLENBQUMsS0FBS3FCLE1BQU4sSUFDQXVILENBQUMsR0FBR0YsWUFBWSxDQUFDSSxZQURqQixJQUNpQ0QsQ0FBQyxHQUFHSCxZQUFZLENBQUNJLFlBRGxELElBRUEsS0FBS0MsUUFBTCxPQUFvQkwsWUFBWSxDQUFDTSxLQUFiLENBQW1CQyxZQUYzQyxFQUV5RDtBQUNyRCxXQUFLeEcsU0FBTCxHQUFpQixLQUFqQjtBQUNBO0FBQ0g7O0FBRUQsUUFBSSxLQUFLcEIsTUFBTCxJQUFlLEtBQUtBLE1BQUwsWUFBdUJrRixpQkFBMUMsRUFBNkQ7QUFDekQsV0FBSzlELFNBQUwsR0FBaUIsSUFBakI7QUFDSDtBQUNKLEdBcmxCb0I7QUF1bEJyQnlHLEVBQUFBLFFBdmxCcUIsc0JBdWxCVjtBQUNQLFFBQUkzRyxJQUFJLEdBQUc1QixpQkFBaUIsRUFBNUI7O0FBQ0E0QixJQUFBQSxJQUFJLENBQUN6QyxLQUFMLEdBQWEsS0FBS0EsS0FBbEI7QUFDQXlDLElBQUFBLElBQUksQ0FBQ3ZDLE1BQUwsR0FBYyxLQUFLQSxNQUFuQjtBQUNBdUMsSUFBQUEsSUFBSSxDQUFDakMsVUFBTCxHQUFrQixLQUFLZ0MsV0FBdkI7QUFDQUMsSUFBQUEsSUFBSSxDQUFDbEMsTUFBTCxHQUFjLEtBQUtzQixPQUFuQjtBQUNBWSxJQUFBQSxJQUFJLENBQUM3QixnQkFBTCxHQUF3QixLQUFLb0IsaUJBQTdCO0FBQ0FTLElBQUFBLElBQUksQ0FBQzRHLFVBQUwsR0FBa0IsS0FBS0MsV0FBdkI7QUFDQTdHLElBQUFBLElBQUksQ0FBQzlCLEtBQUwsR0FBYSxLQUFLc0IsTUFBbEI7QUFDQVEsSUFBQUEsSUFBSSxDQUFDdEMsU0FBTCxHQUFpQk4sV0FBVyxDQUFDLEtBQUtxQyxVQUFOLENBQTVCO0FBQ0FPLElBQUFBLElBQUksQ0FBQ3JDLFNBQUwsR0FBaUJQLFdBQVcsQ0FBQyxLQUFLc0MsVUFBTixDQUE1QjtBQUNBTSxJQUFBQSxJQUFJLENBQUN1RCxTQUFMLEdBQWlCbkcsV0FBVyxDQUFDLEtBQUt1QyxVQUFOLENBQTVCO0FBQ0FLLElBQUFBLElBQUksQ0FBQ3BDLEtBQUwsR0FBYSxLQUFLZ0MsTUFBbEI7QUFDQUksSUFBQUEsSUFBSSxDQUFDbkMsS0FBTCxHQUFhLEtBQUtnQyxNQUFsQjtBQUNBLFdBQU9HLElBQVA7QUFDSCxHQXRtQm9CO0FBd21CckIwRSxFQUFBQSxrQkF4bUJxQiw4QkF3bUJENUcsTUF4bUJDLEVBd21CTztBQUN4QixRQUFJQSxNQUFNLEtBQUt4RCxXQUFXLENBQUNrQyxTQUEzQixFQUFzQztBQUNsQ3NCLE1BQUFBLE1BQU0sR0FBR3hELFdBQVcsQ0FBQ2dDLFFBQXJCO0FBQ0gsS0FGRCxNQUdLLElBQUl3QixNQUFNLEtBQUt4RCxXQUFXLENBQUMrQixrQkFBM0IsRUFBK0M7QUFDaER5QixNQUFBQSxNQUFNLEdBQUd4RCxXQUFXLENBQUMyQixnQkFBckI7QUFDSCxLQUZJLE1BR0EsSUFBSTZCLE1BQU0sS0FBS3hELFdBQVcsQ0FBQzBCLGtCQUEzQixFQUErQztBQUNoRDhCLE1BQUFBLE1BQU0sR0FBR3hELFdBQVcsQ0FBQ3NCLGdCQUFyQjtBQUNIOztBQUNELFdBQU9rQyxNQUFQO0FBQ0gsR0FubkJvQjtBQXFuQnJCZ0osRUFBQUEsdUJBcm5CcUIsbUNBcW5CR0MsYUFybkJILEVBcW5Ca0I7QUFDbkMsUUFBTS9HLElBQUksR0FBRyxLQUFLMkcsUUFBTCxFQUFiOztBQUNBM0csSUFBQUEsSUFBSSxDQUFDaEMsTUFBTCxHQUFjK0ksYUFBYSxJQUFJLENBQUMsSUFBRCxDQUEvQjs7QUFDQSxRQUFJLENBQUMsS0FBS2pFLFFBQVYsRUFBb0I7QUFDaEIsV0FBS0EsUUFBTCxHQUFnQixJQUFJbkosUUFBUSxDQUFDNEUsU0FBYixDQUF1QjVFLFFBQVEsQ0FBQ3dILE1BQWhDLEVBQXdDbkIsSUFBeEMsQ0FBaEI7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLOEMsUUFBTCxDQUFjN0MsTUFBZCxDQUFxQkQsSUFBckI7QUFDSDtBQUNKLEdBN25Cb0I7QUErbkJyQjtBQUVBZ0gsRUFBQUEsVUFBVSxFQUFFLENBQUNqRSxTQUFTLElBQUlrRSxPQUFkLEtBQTBCLFlBQVk7QUFDOUMsUUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxRQUFJQyxZQUFZLEdBQUcsS0FBS25FLGFBQXhCOztBQUNBLFFBQUksQ0FBQ21FLFlBQUQsSUFBaUIsS0FBS3pHLE9BQTFCLEVBQW1DO0FBQy9CeUcsTUFBQUEsWUFBWSxHQUFHLENBQUMsS0FBS3pHLE9BQU4sQ0FBZjtBQUNIOztBQUNELFFBQUl5RyxZQUFKLEVBQWtCO0FBQ2QsVUFBSUMsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsV0FBSyxJQUFJdkYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3NGLFlBQVksQ0FBQzdJLE1BQWpDLEVBQXlDdUQsQ0FBQyxFQUExQyxFQUE4QztBQUMxQyxZQUFJcUYsTUFBSyxHQUFHLEVBQVo7QUFDQSxZQUFJekcsR0FBRyxHQUFHMEcsWUFBWSxDQUFDdEYsQ0FBRCxDQUF0Qjs7QUFDQSxZQUFJcEIsR0FBSixFQUFTO0FBQ0w7QUFDQSxjQUFJcUIsU0FBUyxHQUFHckIsR0FBRyxDQUFDWSxLQUFKLENBQVUsR0FBVixDQUFoQjtBQUNBNkYsVUFBQUEsTUFBSyxHQUFHM0ksU0FBUyxDQUFDd0MsUUFBVixDQUFtQm1CLE9BQW5CLENBQTJCSixTQUFTLENBQUMsQ0FBRCxDQUFwQyxDQUFSOztBQUNBLGNBQUlvRixNQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1hBLFlBQUFBLE1BQUssR0FBR3pHLEdBQVI7QUFDSDs7QUFDRCxjQUFJcUIsU0FBUyxDQUFDLENBQUQsQ0FBYixFQUFrQjtBQUNkb0YsWUFBQUEsTUFBSyxJQUFJLE1BQU1wRixTQUFTLENBQUMsQ0FBRCxDQUF4QjtBQUNIO0FBQ0o7O0FBQ0RzRixRQUFBQSxJQUFJLENBQUN2RCxJQUFMLENBQVVxRCxNQUFWO0FBQ0g7O0FBQ0RBLE1BQUFBLEtBQUssR0FBR0UsSUFBSSxDQUFDQyxJQUFMLENBQVUsR0FBVixDQUFSO0FBQ0g7O0FBQ0QsUUFBSUMsS0FBSyxHQUFNSixLQUFILFNBQVksS0FBS3pILFVBQWpCLFNBQStCLEtBQUtDLFVBQXBDLFNBQWtELEtBQUtFLE1BQXZELFNBQWlFLEtBQUtDLE1BQXRFLFdBQ0csS0FBS04saUJBQUwsR0FBeUIsQ0FBekIsR0FBNkIsQ0FEaEMsV0FDcUMsS0FBS1EsV0FBTCxHQUFtQixDQUFuQixHQUF1QixDQUQ1RCxXQUNpRSxLQUFLRyxTQUFMLEdBQWlCLENBQWpCLEdBQXFCLENBRHRGLEVBQVo7QUFFQSxXQUFPb0gsS0FBUDtBQUNILEdBOXBCb0I7QUFncUJyQkMsRUFBQUEsWUFBWSxFQUFFLHNCQUFVdkksSUFBVixFQUFnQjtBQUMxQixRQUFJd0ksTUFBTSxHQUFHeEksSUFBSSxDQUFDcUMsS0FBTCxDQUFXLEdBQVgsQ0FBYixDQUQwQixDQUUxQjs7QUFDQSxRQUFJSixRQUFRLEdBQUd1RyxNQUFNLENBQUMsQ0FBRCxDQUFyQjs7QUFDQSxRQUFJdkcsUUFBSixFQUFjO0FBQ1YsVUFBSXdHLE1BQU0sR0FBR2xKLFNBQVMsQ0FBQ3lDLFNBQVYsQ0FBb0JDLFFBQXBCLEVBQThCLEtBQUs3QixPQUFuQyxDQUFiOztBQUVBLFVBQUlxSSxNQUFNLENBQUNsRyxPQUFYLEVBQW9CO0FBQ2hCLGFBQUttRyxZQUFMLENBQWtCRCxNQUFNLENBQUNsRyxPQUF6Qjs7QUFDQSxhQUFLbkMsT0FBTCxHQUFlcUksTUFBTSxDQUFDaEcsVUFBdEI7QUFDSCxPQUhELE1BSUssSUFBSWdHLE1BQU0sQ0FBQ25HLFVBQVgsRUFBdUI7QUFDeEIsYUFBS29HLFlBQUwsQ0FBa0JELE1BQU0sQ0FBQ25HLFVBQXpCOztBQUNBL0csUUFBQUEsRUFBRSxDQUFDOEosTUFBSCxDQUFVLElBQVYsRUFBZ0JvRCxNQUFNLENBQUNuRyxVQUF2QixFQUFtQ21HLE1BQU0sQ0FBQ25HLFVBQTFDO0FBQ0gsT0FISSxNQUlBO0FBQ0QsY0FBTSxJQUFJcUcsS0FBSixDQUFVcE4sRUFBRSxDQUFDcU4sS0FBSCxDQUFTQyxRQUFULENBQWtCLElBQWxCLENBQVYsQ0FBTjtBQUNIO0FBQ0o7O0FBQ0QsUUFBSUwsTUFBTSxDQUFDbEosTUFBUCxLQUFrQixDQUF0QixFQUF5QjtBQUNyQjtBQUNBLFdBQUttQixVQUFMLEdBQWtCMkMsUUFBUSxDQUFDb0YsTUFBTSxDQUFDLENBQUQsQ0FBUCxDQUExQjtBQUNBLFdBQUs5SCxVQUFMLEdBQWtCMEMsUUFBUSxDQUFDb0YsTUFBTSxDQUFDLENBQUQsQ0FBUCxDQUExQixDQUhxQixDQUlyQjs7QUFDQSxXQUFLNUgsTUFBTCxHQUFjd0MsUUFBUSxDQUFDb0YsTUFBTSxDQUFDLENBQUQsQ0FBUCxDQUF0QjtBQUNBLFdBQUszSCxNQUFMLEdBQWN1QyxRQUFRLENBQUNvRixNQUFNLENBQUMsQ0FBRCxDQUFQLENBQXRCLENBTnFCLENBT3JCOztBQUNBLFdBQUtqSSxpQkFBTCxHQUF5QmlJLE1BQU0sQ0FBQyxDQUFELENBQU4sQ0FBVXhGLFVBQVYsQ0FBcUIsQ0FBckIsTUFBNEI3SCxXQUFyRDtBQUNBLFdBQUs0RixXQUFMLEdBQW1CeUgsTUFBTSxDQUFDLENBQUQsQ0FBTixDQUFVeEYsVUFBVixDQUFxQixDQUFyQixNQUE0QjdILFdBQS9DO0FBQ0EsV0FBSytGLFNBQUwsR0FBaUJzSCxNQUFNLENBQUMsQ0FBRCxDQUFOLENBQVV4RixVQUFWLENBQXFCLENBQXJCLE1BQTRCN0gsV0FBN0M7QUFDSDtBQUNKLEdBL3JCb0I7QUFpc0JyQnFNLEVBQUFBLFFBanNCcUIsc0JBaXNCVDtBQUNSLFFBQUksQ0FBQyxLQUFLNUQsVUFBVixFQUFzQjtBQUNsQixhQUFPLEtBQUtDLEtBQVo7QUFDSDs7QUFDRCxRQUFJOUUsVUFBVSxHQUFHLEtBQUtnQyxXQUFMLEdBQW1CLENBQW5CLEdBQXVCLENBQXhDO0FBQ0EsUUFBSTVCLGdCQUFnQixHQUFHLEtBQUtvQixpQkFBTCxHQUF5QixDQUF6QixHQUE2QixDQUFwRDtBQUNBLFFBQUlyQixLQUFLLEdBQUcsS0FBS3NCLE1BQUwsR0FBYyxDQUFkLEdBQWtCLENBQTlCO0FBQ0EsUUFBSTlCLFNBQVMsR0FBRyxLQUFLK0IsVUFBTCxLQUFvQnhDLE1BQU0sQ0FBQ0MsTUFBM0IsR0FBb0MsQ0FBcEMsR0FBd0MsQ0FBeEQ7QUFDQSxRQUFJUyxTQUFTLEdBQUcsS0FBSytCLFVBQUwsS0FBb0J6QyxNQUFNLENBQUNDLE1BQTNCLEdBQW9DLENBQXBDLEdBQXdDLENBQXhEO0FBQ0EsUUFBSVUsS0FBSyxHQUFHLEtBQUtnQyxNQUFMLEtBQWdCL0MsUUFBUSxDQUFDQyxNQUF6QixHQUFrQyxDQUFsQyxHQUF1QyxLQUFLOEMsTUFBTCxLQUFnQi9DLFFBQVEsQ0FBQ0UsYUFBekIsR0FBeUMsQ0FBekMsR0FBNkMsQ0FBaEc7QUFDQSxRQUFJYyxLQUFLLEdBQUcsS0FBS2dDLE1BQUwsS0FBZ0JoRCxRQUFRLENBQUNDLE1BQXpCLEdBQWtDLENBQWxDLEdBQXVDLEtBQUsrQyxNQUFMLEtBQWdCaEQsUUFBUSxDQUFDRSxhQUF6QixHQUF5QyxDQUF6QyxHQUE2QyxDQUFoRztBQUNBLFFBQUl3SCxXQUFXLEdBQUcsS0FBS25GLE9BQXZCO0FBQ0EsUUFBSW5CLEtBQUssR0FBRyxLQUFLYSxNQUFqQjs7QUFDQSxRQUFJbUgsTUFBTSxJQUFJaEksS0FBZCxFQUFxQjtBQUNqQixVQUFJQSxLQUFLLENBQUM2SixTQUFOLElBQW1CN0osS0FBSyxDQUFDNkosU0FBTixLQUFvQjdOLE9BQTNDLEVBQ0lzSyxXQUFXLEdBQUcsQ0FBZDtBQUNKcEcsTUFBQUEsZ0JBQWdCLEdBQUdGLEtBQUssQ0FBQ3NCLGlCQUFOLEdBQTBCLENBQTFCLEdBQThCLENBQWpEO0FBQ0g7O0FBRUQsU0FBS3NELEtBQUwsR0FBYWtGLE1BQU0sTUFBSXJLLFNBQUosR0FBZ0JDLFNBQWhCLEdBQTRCNEcsV0FBNUIsR0FBMEMzRyxLQUExQyxHQUFrREMsS0FBbEQsR0FBMERFLFVBQTFELEdBQXVFSSxnQkFBdkUsR0FBMEZELEtBQTFGLENBQW5CO0FBQ0EsU0FBSzBFLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFPLEtBQUtDLEtBQVo7QUFDSCxHQXZ0Qm9CO0FBeXRCckJ1RCxFQUFBQSxhQXp0QnFCLDJCQXl0Qko7QUFDYixXQUFPLEtBQUtoSCxPQUFMLEdBQWU5RSxXQUFXLENBQUNnQixFQUEzQixJQUFpQyxLQUFLOEQsT0FBTCxHQUFlOUUsV0FBVyxDQUFDYyxPQUFuRTtBQUNILEdBM3RCb0I7QUE2dEJyQnFLLEVBQUFBLFdBN3RCcUIseUJBNnRCTjtBQUNYLFNBQUszRyxNQUFMLENBQVlrSixHQUFaLEdBQWtCLEVBQWxCO0FBQ0gsR0EvdEJvQjtBQWl1QnJCdEUsRUFBQUEsaUJBanVCcUIsNkJBaXVCRnVFLEVBanVCRSxFQWl1QkU7QUFBQTs7QUFDbkIsUUFBSWhLLEtBQUssR0FBRyxLQUFLYSxNQUFqQjtBQUNBLFFBQUlaLEtBQUssR0FBRyxLQUFLc0IsTUFBakI7QUFDQSxRQUFJckIsZ0JBQWdCLEdBQUcsS0FBS29CLGlCQUE1Qjs7QUFDQSxRQUFJLEtBQUtDLE1BQUwsS0FBZ0J2QixLQUFLLENBQUNDLEtBQXRCLElBQStCLEtBQUtxQixpQkFBTCxLQUEyQnRCLEtBQUssQ0FBQ0UsZ0JBQXBFLEVBQXNGO0FBQ2xGK0osTUFBQUEsaUJBQWlCLENBQUNqSyxLQUFELEVBQVE7QUFDckJrSyxRQUFBQSxnQkFBZ0IsRUFBRWpLLEtBQUssS0FBS0QsS0FBSyxDQUFDQyxLQUFoQixHQUF3QixPQUF4QixHQUFrQyxNQUQvQjtBQUVyQkMsUUFBQUEsZ0JBQWdCLEVBQUVBLGdCQUFnQixHQUFHLGFBQUgsR0FBbUI7QUFGaEMsT0FBUixDQUFqQixDQUdNaUssSUFITixDQUdXLFVBQUNYLE1BQUQsRUFBWTtBQUNmeEosUUFBQUEsS0FBSyxDQUFDK0csS0FBTixJQUFlL0csS0FBSyxDQUFDK0csS0FBTixFQUFmO0FBQ0F5QyxRQUFBQSxNQUFNLENBQUN2SixLQUFQLEdBQWVBLEtBQWY7QUFDQXVKLFFBQUFBLE1BQU0sQ0FBQ3RKLGdCQUFQLEdBQTBCQSxnQkFBMUI7QUFDQSxRQUFBLEtBQUksQ0FBQ1csTUFBTCxHQUFjMkksTUFBZDtBQUNBUSxRQUFBQSxFQUFFO0FBQ0wsT0FUTCxFQVNPLFVBQUM3RCxHQUFELEVBQVM7QUFDUjdKLFFBQUFBLEVBQUUsQ0FBQzhOLEtBQUgsQ0FBU2pFLEdBQUcsQ0FBQ0UsT0FBYjtBQUNILE9BWEw7QUFZSCxLQWJELE1BY0s7QUFDRDJELE1BQUFBLEVBQUU7QUFDTDtBQUNKO0FBdHZCb0IsQ0FBVCxDQUFoQjtBQXl2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTFOLEVBQUUsQ0FBQ2dFLFNBQUgsR0FBZStKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhLLFNBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9ldmVudC9ldmVudC10YXJnZXQnKTtcclxuY29uc3QgcmVuZGVyZXIgPSByZXF1aXJlKCcuLi9yZW5kZXJlcicpO1xyXG5yZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ0NsYXNzJyk7XHJcblxyXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XHJcblxyXG5jb25zdCBHTF9ORUFSRVNUID0gOTcyODsgICAgICAgICAgICAgICAgLy8gZ2wuTkVBUkVTVFxyXG5jb25zdCBHTF9MSU5FQVIgPSA5NzI5OyAgICAgICAgICAgICAgICAgLy8gZ2wuTElORUFSXHJcbmNvbnN0IEdMX1JFUEVBVCA9IDEwNDk3OyAgICAgICAgICAgICAgICAvLyBnbC5SRVBFQVRcclxuY29uc3QgR0xfQ0xBTVBfVE9fRURHRSA9IDMzMDcxOyAgICAgICAgIC8vIGdsLkNMQU1QX1RPX0VER0VcclxuY29uc3QgR0xfTUlSUk9SRURfUkVQRUFUID0gMzM2NDg7ICAgICAgIC8vIGdsLk1JUlJPUkVEX1JFUEVBVFxyXG5jb25zdCBHTF9SR0JBID0gNjQwODsgICAgICAgICAgICAgICAgICAgLy8gZ2wuUkdCQVxyXG5cclxuY29uc3QgQ0hBUl9DT0RFXzAgPSA0ODsgICAgLy8gJzAnXHJcbmNvbnN0IENIQVJfQ09ERV8xID0gNDk7ICAgIC8vICcxJ1xyXG5cclxudmFyIGlkR2VuZXJhdGVyID0gbmV3IChyZXF1aXJlKCcuLi9wbGF0Zm9ybS9pZC1nZW5lcmF0ZXInKSkoJ1RleCcpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiA8cD5cclxuICogVGhpcyBjbGFzcyBhbGxvd3MgdG8gZWFzaWx5IGNyZWF0ZSBPcGVuR0wgb3IgQ2FudmFzIDJEIHRleHR1cmVzIGZyb20gaW1hZ2VzLCB0ZXh0IG9yIHJhdyBkYXRhLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAqIFRoZSBjcmVhdGVkIGNjLlRleHR1cmUyRCBvYmplY3Qgd2lsbCBhbHdheXMgaGF2ZSBwb3dlci1vZi10d28gZGltZW5zaW9ucy4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gKiBEZXBlbmRpbmcgb24gaG93IHlvdSBjcmVhdGUgdGhlIGNjLlRleHR1cmUyRCBvYmplY3QsIHRoZSBhY3R1YWwgaW1hZ2UgYXJlYSBvZiB0aGUgdGV4dHVyZSBtaWdodCBiZSBzbWFsbGVyIHRoYW4gdGhlIHRleHR1cmUgZGltZW5zaW9ucyA8YnIvPlxyXG4gKiAgaS5lLiBcImNvbnRlbnRTaXplXCIgIT0gKHBpeGVsc1dpZGUsIHBpeGVsc0hpZ2gpIGFuZCAobWF4UywgbWF4VCkgIT0gKDEuMCwgMS4wKS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICogQmUgYXdhcmUgdGhhdCB0aGUgY29udGVudCBvZiB0aGUgZ2VuZXJhdGVkIHRleHR1cmVzIHdpbGwgYmUgdXBzaWRlLWRvd24hIDwvcD5cclxuXHJcbiAqIEBjbGFzcyBUZXh0dXJlMkRcclxuICogQHVzZXMgRXZlbnRUYXJnZXRcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcblxyXG4vLyBkZWZpbmUgYSBzcGVjaWZpZWQgbnVtYmVyIGZvciB0aGUgcGl4ZWwgZm9ybWF0IHdoaWNoIGdmeCBkbyBub3QgaGF2ZSBhIHN0YW5kYXJkIGRlZmluaXRpb24uXHJcbmxldCBDVVNUT01fUElYRUxfRk9STUFUID0gMTAyNDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdGV4dHVyZSBwaXhlbCBmb3JtYXQsIGRlZmF1bHQgdmFsdWUgaXMgUkdCQTg4ODgsIFxyXG4gKiB5b3Ugc2hvdWxkIG5vdGUgdGhhdCB0ZXh0dXJlcyBsb2FkZWQgYnkgbm9ybWFsIGltYWdlIGZpbGVzIChwbmcsIGpwZykgY2FuIG9ubHkgc3VwcG9ydCBSR0JBODg4OCBmb3JtYXQsXHJcbiAqIG90aGVyIGZvcm1hdHMgYXJlIHN1cHBvcnRlZCBieSBjb21wcmVzc2VkIGZpbGUgdHlwZXMgb3IgcmF3IGRhdGEuXHJcbiAqIEBlbnVtIFRleHR1cmUyRC5QaXhlbEZvcm1hdFxyXG4gKi9cclxuY29uc3QgUGl4ZWxGb3JtYXQgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogMTYtYml0IHRleHR1cmUgd2l0aG91dCBBbHBoYSBjaGFubmVsXHJcbiAgICAgKiBAcHJvcGVydHkgUkdCNTY1XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQjU2NTogZ2Z4LlRFWFRVUkVfRk1UX1I1X0c2X0I1LFxyXG4gICAgLyoqXHJcbiAgICAgKiAxNi1iaXQgdGV4dHVyZXM6IFJHQjVBMVxyXG4gICAgICogQHByb3BlcnR5IFJHQjVBMVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSR0I1QTE6IGdmeC5URVhUVVJFX0ZNVF9SNV9HNV9CNV9BMSxcclxuICAgIC8qKlxyXG4gICAgICogMTYtYml0IHRleHR1cmVzOiBSR0JBNDQ0NFxyXG4gICAgICogQHByb3BlcnR5IFJHQkE0NDQ0XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQkE0NDQ0OiBnZnguVEVYVFVSRV9GTVRfUjRfRzRfQjRfQTQsXHJcbiAgICAvKipcclxuICAgICAqIDI0LWJpdCB0ZXh0dXJlOiBSR0I4ODhcclxuICAgICAqIEBwcm9wZXJ0eSBSR0I4ODhcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCODg4OiBnZnguVEVYVFVSRV9GTVRfUkdCOCxcclxuICAgIC8qKlxyXG4gICAgICogMzItYml0IHRleHR1cmU6IFJHQkE4ODg4XHJcbiAgICAgKiBAcHJvcGVydHkgUkdCQTg4ODhcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCQTg4ODg6IGdmeC5URVhUVVJFX0ZNVF9SR0JBOCxcclxuICAgIC8qKlxyXG4gICAgICogMzItYml0IGZsb2F0IHRleHR1cmU6IFJHQkEzMkZcclxuICAgICAqIEBwcm9wZXJ0eSBSR0JBMzJGXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQkEzMkY6IGdmeC5URVhUVVJFX0ZNVF9SR0JBMzJGLFxyXG4gICAgLyoqXHJcbiAgICAgKiA4LWJpdCB0ZXh0dXJlcyB1c2VkIGFzIG1hc2tzXHJcbiAgICAgKiBAcHJvcGVydHkgQThcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQTg6IGdmeC5URVhUVVJFX0ZNVF9BOCxcclxuICAgIC8qKlxyXG4gICAgICogOC1iaXQgaW50ZW5zaXR5IHRleHR1cmVcclxuICAgICAqIEBwcm9wZXJ0eSBJOFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBJODogZ2Z4LlRFWFRVUkVfRk1UX0w4LFxyXG4gICAgLyoqXHJcbiAgICAgKiAxNi1iaXQgdGV4dHVyZXMgdXNlZCBhcyBtYXNrc1xyXG4gICAgICogQHByb3BlcnR5IEFJODhcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgQUk4OiBnZnguVEVYVFVSRV9GTVRfTDhfQTgsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZ2IgMiBicHAgcHZydGNcclxuICAgICAqIEBwcm9wZXJ0eSBSR0JfUFZSVENfMkJQUFYxXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQl9QVlJUQ18yQlBQVjE6IGdmeC5URVhUVVJFX0ZNVF9SR0JfUFZSVENfMkJQUFYxLFxyXG4gICAgLyoqXHJcbiAgICAgKiByZ2JhIDIgYnBwIHB2cnRjXHJcbiAgICAgKiBAcHJvcGVydHkgUkdCQV9QVlJUQ18yQlBQVjFcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCQV9QVlJUQ18yQlBQVjE6IGdmeC5URVhUVVJFX0ZNVF9SR0JBX1BWUlRDXzJCUFBWMSxcclxuICAgIC8qKlxyXG4gICAgICogcmdiIHNlcGFyYXRlIGEgMiBicHAgcHZydGNcclxuICAgICAqIFJHQl9BX1BWUlRDXzJCUFBWMSB0ZXh0dXJlIGlzIGEgMnggaGVpZ2h0IFJHQl9QVlJUQ18yQlBQVjEgZm9ybWF0IHRleHR1cmUuXHJcbiAgICAgKiBJdCBzZXBhcmF0ZSB0aGUgb3JpZ2luIGFscGhhIGNoYW5uZWwgdG8gdGhlIGJvdHRvbSBoYWxmIGF0bGFzLCB0aGUgb3JpZ2luIHJnYiBjaGFubmVsIHRvIHRoZSB0b3AgaGFsZiBhdGxhc1xyXG4gICAgICogQHByb3BlcnR5IFJHQl9BX1BWUlRDXzJCUFBWMVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSR0JfQV9QVlJUQ18yQlBQVjE6IENVU1RPTV9QSVhFTF9GT1JNQVQrKyxcclxuICAgIC8qKlxyXG4gICAgICogcmdiIDQgYnBwIHB2cnRjXHJcbiAgICAgKiBAcHJvcGVydHkgUkdCX1BWUlRDXzRCUFBWMVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSR0JfUFZSVENfNEJQUFYxOiBnZnguVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzRCUFBWMSxcclxuICAgIC8qKlxyXG4gICAgICogcmdiYSA0IGJwcCBwdnJ0Y1xyXG4gICAgICogQHByb3BlcnR5IFJHQkFfUFZSVENfNEJQUFYxXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQkFfUFZSVENfNEJQUFYxOiBnZnguVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjEsXHJcbiAgICAvKipcclxuICAgICAqIHJnYiBhIDQgYnBwIHB2cnRjXHJcbiAgICAgKiBSR0JfQV9QVlJUQ180QlBQVjEgdGV4dHVyZSBpcyBhIDJ4IGhlaWdodCBSR0JfUFZSVENfNEJQUFYxIGZvcm1hdCB0ZXh0dXJlLlxyXG4gICAgICogSXQgc2VwYXJhdGUgdGhlIG9yaWdpbiBhbHBoYSBjaGFubmVsIHRvIHRoZSBib3R0b20gaGFsZiBhdGxhcywgdGhlIG9yaWdpbiByZ2IgY2hhbm5lbCB0byB0aGUgdG9wIGhhbGYgYXRsYXNcclxuICAgICAqIEBwcm9wZXJ0eSBSR0JfQV9QVlJUQ180QlBQVjFcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCX0FfUFZSVENfNEJQUFYxOiBDVVNUT01fUElYRUxfRk9STUFUKyssXHJcbiAgICAvKipcclxuICAgICAqIHJnYiBldGMxXHJcbiAgICAgKiBAcHJvcGVydHkgUkdCX0VUQzFcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCX0VUQzE6IGdmeC5URVhUVVJFX0ZNVF9SR0JfRVRDMSxcclxuICAgIC8qKlxyXG4gICAgICogcmdiYSBldGMxXHJcbiAgICAgKiBAcHJvcGVydHkgUkdCQV9FVEMxXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJHQkFfRVRDMTogQ1VTVE9NX1BJWEVMX0ZPUk1BVCsrLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmdiIGV0YzJcclxuICAgICAqIEBwcm9wZXJ0eSBSR0JfRVRDMlxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSR0JfRVRDMjogZ2Z4LlRFWFRVUkVfRk1UX1JHQl9FVEMyLFxyXG4gICAgLyoqXHJcbiAgICAgKiByZ2JhIGV0YzJcclxuICAgICAqIEBwcm9wZXJ0eSBSR0JBX0VUQzJcclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkdCQV9FVEMyOiBnZnguVEVYVFVSRV9GTVRfUkdCQV9FVEMyLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdGV4dHVyZSB3cmFwIG1vZGVcclxuICogQGVudW0gVGV4dHVyZTJELldyYXBNb2RlXHJcbiAqL1xyXG5jb25zdCBXcmFwTW9kZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RhbnQgdmFyaWFibGUgZXF1YWxzIGdsLlJFUEVBVCBmb3IgdGV4dHVyZVxyXG4gICAgICogQHByb3BlcnR5IFJFUEVBVFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBSRVBFQVQ6IEdMX1JFUEVBVCxcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0YW50IHZhcmlhYmxlIGVxdWFscyBnbC5DTEFNUF9UT19FREdFIGZvciB0ZXh0dXJlXHJcbiAgICAgKiBAcHJvcGVydHkgQ0xBTVBfVE9fRURHRVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBDTEFNUF9UT19FREdFOiBHTF9DTEFNUF9UT19FREdFLFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29uc3RhbnQgdmFyaWFibGUgZXF1YWxzIGdsLk1JUlJPUkVEX1JFUEVBVCBmb3IgdGV4dHVyZVxyXG4gICAgICogQHByb3BlcnR5IE1JUlJPUkVEX1JFUEVBVFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBNSVJST1JFRF9SRVBFQVQ6IEdMX01JUlJPUkVEX1JFUEVBVFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdGV4dHVyZSBmaWx0ZXIgbW9kZVxyXG4gKiBAZW51bSBUZXh0dXJlMkQuRmlsdGVyXHJcbiAqL1xyXG5jb25zdCBGaWx0ZXIgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNvbnN0YW50IHZhcmlhYmxlIGVxdWFscyBnbC5MSU5FQVIgZm9yIHRleHR1cmVcclxuICAgICAqIEBwcm9wZXJ0eSBMSU5FQVJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgTElORUFSOiBHTF9MSU5FQVIsXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjb25zdGFudCB2YXJpYWJsZSBlcXVhbHMgZ2wuTkVBUkVTVCBmb3IgdGV4dHVyZVxyXG4gICAgICogQHByb3BlcnR5IE5FQVJFU1RcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgTkVBUkVTVDogR0xfTkVBUkVTVFxyXG59KTtcclxuXHJcbmNvbnN0IEZpbHRlckluZGV4ID0ge1xyXG4gICAgOTcyODogMCwgLy8gR0xfTkVBUkVTVFxyXG4gICAgOTcyOTogMSwgLy8gR0xfTElORUFSXHJcbn07XHJcblxyXG5sZXQgX2ltYWdlcyA9IFtdO1xyXG5sZXQgX3NoYXJlZE9wdHMgPSB7XHJcbiAgICB3aWR0aDogdW5kZWZpbmVkLFxyXG4gICAgaGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICBtaW5GaWx0ZXI6IHVuZGVmaW5lZCxcclxuICAgIG1hZ0ZpbHRlcjogdW5kZWZpbmVkLFxyXG4gICAgd3JhcFM6IHVuZGVmaW5lZCxcclxuICAgIHdyYXBUOiB1bmRlZmluZWQsXHJcbiAgICBmb3JtYXQ6IHVuZGVmaW5lZCxcclxuICAgIGdlbk1pcG1hcHM6IHVuZGVmaW5lZCxcclxuICAgIGltYWdlczogdW5kZWZpbmVkLFxyXG4gICAgaW1hZ2U6IHVuZGVmaW5lZCxcclxuICAgIGZsaXBZOiB1bmRlZmluZWQsXHJcbiAgICBwcmVtdWx0aXBseUFscGhhOiB1bmRlZmluZWRcclxufTtcclxuZnVuY3Rpb24gX2dldFNoYXJlZE9wdGlvbnMgKCkge1xyXG4gICAgZm9yICh2YXIga2V5IGluIF9zaGFyZWRPcHRzKSB7XHJcbiAgICAgICAgX3NoYXJlZE9wdHNba2V5XSA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIF9pbWFnZXMubGVuZ3RoID0gMDtcclxuICAgIF9zaGFyZWRPcHRzLmltYWdlcyA9IF9pbWFnZXM7XHJcbiAgICByZXR1cm4gX3NoYXJlZE9wdHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGFsbG93cyB0byBlYXNpbHkgY3JlYXRlIE9wZW5HTCBvciBDYW52YXMgMkQgdGV4dHVyZXMgZnJvbSBpbWFnZXMgb3IgcmF3IGRhdGEuXHJcbiAqXHJcbiAqIEBjbGFzcyBUZXh0dXJlMkRcclxuICogQHVzZXMgRXZlbnRUYXJnZXRcclxuICogQGV4dGVuZHMgQXNzZXRcclxuICovXHJcbnZhciBUZXh0dXJlMkQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVGV4dHVyZTJEJyxcclxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4uL2Fzc2V0cy9DQ0Fzc2V0JyksXHJcbiAgICBtaXhpbnM6IFtFdmVudFRhcmdldF0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gbWF5YmUgcmV0dXJuZWQgdG8gcG9vbCBpbiB3ZWJnbFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLl9jb21wcmVzc2VkICYmIGRhdGEuX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRXaXRoRGF0YShkYXRhLl9kYXRhLCB0aGlzLl9mb3JtYXQsIGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFdpdGhFbGVtZW50KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2Zvcm1hdDogUGl4ZWxGb3JtYXQuUkdCQTg4ODgsXHJcbiAgICAgICAgX3ByZW11bHRpcGx5QWxwaGE6IGZhbHNlLFxyXG4gICAgICAgIF9mbGlwWTogZmFsc2UsXHJcbiAgICAgICAgX21pbkZpbHRlcjogRmlsdGVyLkxJTkVBUixcclxuICAgICAgICBfbWFnRmlsdGVyOiBGaWx0ZXIuTElORUFSLFxyXG4gICAgICAgIF9taXBGaWx0ZXI6IEZpbHRlci5MSU5FQVIsXHJcbiAgICAgICAgX3dyYXBTOiBXcmFwTW9kZS5DTEFNUF9UT19FREdFLFxyXG4gICAgICAgIF93cmFwVDogV3JhcE1vZGUuQ0xBTVBfVE9fRURHRSxcclxuXHJcbiAgICAgICAgX2lzQWxwaGFBdGxhczogZmFsc2UsXHJcblxyXG4gICAgICAgIF9nZW5NaXBtYXBzOiBmYWxzZSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNldHMgd2hldGhlciBnZW5lcmF0ZSBtaXBtYXBzIGZvciB0aGUgdGV4dHVyZVxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5Li657q555CG6K6+572u55Sf5oiQIG1pcG1hcHPjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGdlbk1pcG1hcHNcclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdlbk1pcG1hcHM6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZW5NaXBtYXBzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKGdlbk1pcG1hcHMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9nZW5NaXBtYXBzICE9PSBnZW5NaXBtYXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9wdHMgPSBfZ2V0U2hhcmVkT3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZ2VuTWlwbWFwcyA9IGdlbk1pcG1hcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfcGFja2FibGU6IHRydWUsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBcclxuICAgICAgICAgKiBTZXRzIHdoZXRoZXIgdGV4dHVyZSBjYW4gYmUgcGFja2VkIGludG8gdGV4dHVyZSBhdGxhcy5cclxuICAgICAgICAgKiBJZiBuZWVkIHVzZSB0ZXh0dXJlIHV2IGluIGN1c3RvbSBFZmZlY3QsIHBsZWFzZSBzZXRzIHBhY2thYmxlIHRvIGZhbHNlLlxyXG4gICAgICAgICAqICEjemggXHJcbiAgICAgICAgICog6K6+572u57q555CG5piv5ZCm5YWB6K645Y+C5LiO5ZCI5Zu+44CCXHJcbiAgICAgICAgICog5aaC5p6c6ZyA6KaB5Zyo6Ieq5a6a5LmJIEVmZmVjdCDkuK3kvb/nlKjnurnnkIYgVVbvvIzpnIDopoHnpoHmraLor6XpgInpobnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHBhY2thYmxlXHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhY2thYmxlOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFja2FibGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgX25hdGl2ZURlcDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBfX2lzTmF0aXZlX186IHRydWUsIFxyXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHRoaXMuX3V1aWQsIFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dDogdGhpcy5fbmF0aXZlLCBcclxuICAgICAgICAgICAgICAgICAgICBfX2ZsaXBZX186IHRoaXMuX2ZsaXBZLFxyXG4gICAgICAgICAgICAgICAgICAgIF9fcHJlbXVsdGlwbHlBbHBoYV9fOiB0aGlzLl9wcmVtdWx0aXBseUFscGhhXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIFBpeGVsRm9ybWF0OiBQaXhlbEZvcm1hdCxcclxuICAgICAgICBXcmFwTW9kZTogV3JhcE1vZGUsXHJcbiAgICAgICAgRmlsdGVyOiBGaWx0ZXIsXHJcbiAgICAgICAgX0ZpbHRlckluZGV4OiBGaWx0ZXJJbmRleCxcclxuICAgICAgICAvLyBwcmVkZWZpbmVkIG1vc3QgY29tbW9uIGV4dG5hbWVzXHJcbiAgICAgICAgZXh0bmFtZXM6IFsnLnBuZycsICcuanBnJywgJy5qcGVnJywgJy5ibXAnLCAnLndlYnAnLCAnLnB2cicsICcucGttJ10sXHJcblxyXG4gICAgICAgIF9wYXJzZUV4dCAoZXh0SWRTdHIsIGRlZmF1bHRGb3JtYXQpIHtcclxuICAgICAgICAgICAgbGV0IGRldmljZSA9IGNjLnJlbmRlcmVyLmRldmljZTtcclxuICAgICAgICAgICAgbGV0IGV4dElkcyA9IGV4dElkU3RyLnNwbGl0KCdfJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdEV4dCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgYmVzdEV4dCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgYmVzdEluZGV4ID0gOTk5O1xyXG4gICAgICAgICAgICBsZXQgYmVzdEZvcm1hdCA9IGRlZmF1bHRGb3JtYXQ7XHJcbiAgICAgICAgICAgIGxldCBTdXBwb3J0VGV4dHVyZUZvcm1hdHMgPSBjYy5tYWNyby5TVVBQT1JUX1RFWFRVUkVfRk9STUFUUztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHRJZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBleHRGb3JtYXQgPSBleHRJZHNbaV0uc3BsaXQoJ0AnKTtcclxuICAgICAgICAgICAgICAgIGxldCB0bXBFeHQgPSBleHRGb3JtYXRbMF07XHJcbiAgICAgICAgICAgICAgICB0bXBFeHQgPSBUZXh0dXJlMkQuZXh0bmFtZXNbdG1wRXh0LmNoYXJDb2RlQXQoMCkgLSBDSEFSX0NPREVfMF0gfHwgdG1wRXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFN1cHBvcnRUZXh0dXJlRm9ybWF0cy5pbmRleE9mKHRtcEV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xICYmIGluZGV4IDwgYmVzdEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcEZvcm1hdCA9IGV4dEZvcm1hdFsxXSA/IHBhcnNlSW50KGV4dEZvcm1hdFsxXSkgOiBkZWZhdWx0Rm9ybWF0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBzdXBwb3J0IGNvbXByZXNzZWQgdGV4dHVyZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdG1wRXh0ID09PSAnLnB2cicgJiYgIWRldmljZS5leHQoJ1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9wdnJ0YycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgodG1wRm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JfRVRDMSB8fCB0bXBGb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQkFfRVRDMSkgJiYgIWRldmljZS5leHQoJ1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMxJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCh0bXBGb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQl9FVEMyIHx8IHRtcEZvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCQV9FVEMyKSAmJiAhZGV2aWNlLmV4dCgnV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX2V0YycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0bXBFeHQgPT09ICcud2VicCcgJiYgIWNjLnN5cy5jYXBhYmlsaXRpZXMud2VicCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJlc3RFeHQgPSB0bXBFeHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdEZvcm1hdCA9IHRtcEZvcm1hdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFkZWZhdWx0RXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEV4dCA9IHRtcEV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4geyBiZXN0RXh0LCBiZXN0Rm9ybWF0LCBkZWZhdWx0RXh0IH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICAvLyBJZCBmb3IgZ2VuZXJhdGUgaGFzaCBpbiBtYXRlcmlhbFxyXG4gICAgICAgIHRoaXMuX2lkID0gaWRHZW5lcmF0ZXIuZ2V0TmV3SWQoKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIHRleHR1cmUgaXMgbG9hZGVkIG9yIG5vdFxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDotLTlm77mmK/lkKblt7Lnu4/miJDlip/liqDovb1cclxuICAgICAgICAgKiBAcHJvcGVydHkgbG9hZGVkXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGV4dHVyZSB3aWR0aCBpbiBwaXhlbFxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDotLTlm77lg4/ntKDlrr3luqZcclxuICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUZXh0dXJlIGhlaWdodCBpbiBwaXhlbFxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDotLTlm77lg4/ntKDpq5jluqZcclxuICAgICAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2hhc2hEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5faGFzaCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLl9leHBvcnRlZEV4dHMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgcmVuZGVyZXIgdGV4dHVyZSBpbXBsZW1lbnRhdGlvbiBvYmplY3RcclxuICAgICAqIGV4dGVuZGVkIGZyb20gcmVuZGVyLlRleHR1cmUyRFxyXG4gICAgICogISN6aCAg6L+U5Zue5riy5p+T5Zmo5YaF6YOo6LS05Zu+5a+56LGhXHJcbiAgICAgKiBAbWV0aG9kIGdldEltcGxcclxuICAgICAqL1xyXG4gICAgZ2V0SW1wbCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB0aGlzLl90ZXh0dXJlID0gbmV3IHJlbmRlcmVyLlRleHR1cmUyRChyZW5kZXJlci5kZXZpY2UsIHt9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0SWQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH0sXHJcblxyXG4gICAgdG9TdHJpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVVybCB8fCAnJztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGV4dHVyZSBvcHRpb25zLCBub3QgYXZhaWxhYmxlIGluIENhbnZhcyByZW5kZXIgbW9kZS5cclxuICAgICAqIGltYWdlLCBmb3JtYXQsIHByZW11bHRpcGx5QWxwaGEgY2FuIG5vdCBiZSB1cGRhdGVkIGluIG5hdGl2ZS5cclxuICAgICAqIEBtZXRob2QgdXBkYXRlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHtET01JbWFnZUVsZW1lbnR9IG9wdGlvbnMuaW1hZ2VcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5nZW5NaXBtYXBzXHJcbiAgICAgKiBAcGFyYW0ge1BpeGVsRm9ybWF0fSBvcHRpb25zLmZvcm1hdFxyXG4gICAgICogQHBhcmFtIHtGaWx0ZXJ9IG9wdGlvbnMubWluRmlsdGVyXHJcbiAgICAgKiBAcGFyYW0ge0ZpbHRlcn0gb3B0aW9ucy5tYWdGaWx0ZXJcclxuICAgICAqIEBwYXJhbSB7V3JhcE1vZGV9IG9wdGlvbnMud3JhcFNcclxuICAgICAqIEBwYXJhbSB7V3JhcE1vZGV9IG9wdGlvbnMud3JhcFRcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5wcmVtdWx0aXBseUFscGhhXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZSAob3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxldCB1cGRhdGVJbWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMud2lkdGggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGVpZ2h0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWluRmlsdGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbkZpbHRlciA9IG9wdGlvbnMubWluRmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5taW5GaWx0ZXIgPSBGaWx0ZXJJbmRleFtvcHRpb25zLm1pbkZpbHRlcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWFnRmlsdGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hZ0ZpbHRlciA9IG9wdGlvbnMubWFnRmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5tYWdGaWx0ZXIgPSBGaWx0ZXJJbmRleFtvcHRpb25zLm1hZ0ZpbHRlcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWlwRmlsdGVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pcEZpbHRlciA9IG9wdGlvbnMubWlwRmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5taXBGaWx0ZXIgPSBGaWx0ZXJJbmRleFtvcHRpb25zLm1pcEZpbHRlcl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMud3JhcFMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcFMgPSBvcHRpb25zLndyYXBTO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLndyYXBUICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBUID0gb3B0aW9ucy53cmFwVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5mb3JtYXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmxpcFkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmxpcFkgPSBvcHRpb25zLmZsaXBZO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlSW1nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wcmVtdWx0aXBseUFscGhhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZW11bHRpcGx5QWxwaGEgPSBvcHRpb25zLnByZW11bHRpcGx5QWxwaGE7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVJbWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmdlbk1pcG1hcHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2VuTWlwbWFwcyA9IG9wdGlvbnMuZ2VuTWlwbWFwcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNjLnN5cy5jYXBhYmlsaXRpZXMuaW1hZ2VCaXRtYXAgJiYgdGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tJbWFnZUJpdG1hcCh0aGlzLl91cGxvYWQuYmluZCh0aGlzLCBvcHRpb25zLCB1cGRhdGVJbWcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZChvcHRpb25zLCB1cGRhdGVJbWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIF91cGxvYWQgKG9wdGlvbnMsIHVwZGF0ZUltZykge1xyXG4gICAgICAgIGlmICh1cGRhdGVJbWcgJiYgdGhpcy5faW1hZ2UpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5pbWFnZSA9IHRoaXMuX2ltYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5pbWFnZXMgJiYgb3B0aW9ucy5pbWFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG9wdGlvbnMuaW1hZ2VzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmltYWdlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBvcHRpb25zLmltYWdlO1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuaW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICBfaW1hZ2VzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmltYWdlcyA9IF9pbWFnZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gd2ViZ2wgdGV4dHVyZSAyZCB1c2VzIGltYWdlc1xyXG4gICAgICAgICAgICBvcHRpb25zLmltYWdlcy5wdXNoKG9wdGlvbnMuaW1hZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZSAmJiB0aGlzLl90ZXh0dXJlLnVwZGF0ZShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5faGFzaERpcnR5ID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbml0IHdpdGggSFRNTCBlbGVtZW50LlxyXG4gICAgICogISN6aCDnlKggSFRNTCBJbWFnZSDmiJYgQ2FudmFzIOWvueixoeWIneWni+WMlui0tOWbvuOAglxyXG4gICAgICogQG1ldGhvZCBpbml0V2l0aEVsZW1lbnRcclxuICAgICAqIEBwYXJhbSB7SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAqIGltZy5zcmMgPSBkYXRhVVJMO1xyXG4gICAgICogdGV4dHVyZS5pbml0V2l0aEVsZW1lbnQoaW1nKTtcclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhFbGVtZW50IChlbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5faW1hZ2UgPSBlbGVtZW50O1xyXG4gICAgICAgIGlmIChlbGVtZW50LmNvbXBsZXRlIHx8IGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY2Muc3lzLmNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiBlbGVtZW50IGluc3RhbmNlb2YgSW1hZ2VCaXRtYXApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2hlY2tJbWFnZUJpdG1hcCh0aGlzLmhhbmRsZUxvYWRlZFRleHR1cmUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuaGFuZGxlTG9hZGVkVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzMTE5LCBlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJbnRpYWxpemVzIHdpdGggdGV4dHVyZSBkYXRhIGluIEFycmF5QnVmZmVyVmlldy5cclxuICAgICAqICEjemgg5L2/55So5LiA5Liq5a2Y5YKo5ZyoIEFycmF5QnVmZmVyVmlldyDkuK3nmoTlm77lg4/mlbDmja7vvIhyYXcgZGF0Ye+8ieWIneWni+WMluaVsOaNruOAglxyXG4gICAgICogQG1ldGhvZCBpbml0V2l0aERhdGFcclxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcGl4ZWxGb3JtYXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwaXhlbHNXaWR0aFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBpeGVsc0hlaWdodFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhEYXRhIChkYXRhLCBwaXhlbEZvcm1hdCwgcGl4ZWxzV2lkdGgsIHBpeGVsc0hlaWdodCkge1xyXG4gICAgICAgIHZhciBvcHRzID0gX2dldFNoYXJlZE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRzLmltYWdlID0gZGF0YTtcclxuICAgICAgICAvLyB3ZWJnbCB0ZXh0dXJlIDJkIHVzZXMgaW1hZ2VzXHJcbiAgICAgICAgb3B0cy5pbWFnZXMgPSBbb3B0cy5pbWFnZV07XHJcbiAgICAgICAgb3B0cy5nZW5NaXBtYXBzID0gdGhpcy5fZ2VuTWlwbWFwcztcclxuICAgICAgICBvcHRzLnByZW11bHRpcGx5QWxwaGEgPSB0aGlzLl9wcmVtdWx0aXBseUFscGhhO1xyXG4gICAgICAgIG9wdHMuZmxpcFkgPSB0aGlzLl9mbGlwWTtcclxuICAgICAgICBvcHRzLm1pbkZpbHRlciA9IEZpbHRlckluZGV4W3RoaXMuX21pbkZpbHRlcl07XHJcbiAgICAgICAgb3B0cy5tYWdGaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9tYWdGaWx0ZXJdO1xyXG4gICAgICAgIG9wdHMud3JhcFMgPSB0aGlzLl93cmFwUztcclxuICAgICAgICBvcHRzLndyYXBUID0gdGhpcy5fd3JhcFQ7XHJcbiAgICAgICAgb3B0cy5mb3JtYXQgPSB0aGlzLl9nZXRHRlhQaXhlbEZvcm1hdChwaXhlbEZvcm1hdCk7XHJcbiAgICAgICAgb3B0cy53aWR0aCA9IHBpeGVsc1dpZHRoO1xyXG4gICAgICAgIG9wdHMuaGVpZ2h0ID0gcGl4ZWxzSGVpZ2h0O1xyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlID0gbmV3IHJlbmRlcmVyLlRleHR1cmUyRChyZW5kZXJlci5kZXZpY2UsIG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2lkdGggPSBwaXhlbHNXaWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHBpeGVsc0hlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlRm9ybWF0KCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tQYWNrYWJsZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwibG9hZFwiKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBIVE1MRWxlbWVudCBPYmplY3QgZ2V0dGVyLCBhdmFpbGFibGUgb25seSBvbiB3ZWIuPGJyLz5cclxuICAgICAqIE5vdGU6IHRleHR1cmUgaXMgcGFja2VkIGludG8gdGV4dHVyZSBhdGxhcyBieSBkZWZhdWx0PGJyLz5cclxuICAgICAqIHlvdSBzaG91bGQgc2V0IHRleHR1cmUucGFja2FibGUgYXMgZmFsc2UgYmVmb3JlIGdldHRpbmcgSHRtbCBlbGVtZW50IG9iamVjdC5cclxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6LS05Zu+5a+55bqU55qEIEhUTUwgSW1hZ2Ug5oiWIENhbnZhcyDlr7nosaHvvIzlj6rlnKggV2ViIOW5s+WPsOS4i+acieaViOOAgjxici8+XHJcbiAgICAgKiDms6jmhI/vvJo8YnIvPlxyXG4gICAgICogdGV4dHVyZSDpu5jorqTlj4LkuI7liqjmgIHlkIjlm77vvIzlpoLmnpzpnIDopoHojrflj5bliLDmraPnoa7nmoQgSHRtbCDlhYPntKDlr7nosaHvvIzpnIDopoHlhYjorr7nva4gdGV4dHVyZS5wYWNrYWJsZSDkuLogZmFsc2VcclxuICAgICAqIEBtZXRob2QgZ2V0SHRtbEVsZW1lbnRPYmpcclxuICAgICAqIEByZXR1cm4ge0hUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIGdldEh0bWxFbGVtZW50T2JqICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIERlc3RvcnkgdGhpcyB0ZXh0dXJlIGFuZCBpbW1lZGlhdGVseSByZWxlYXNlIGl0cyB2aWRlbyBtZW1vcnkuIChJbmhlcml0IGZyb20gY2MuT2JqZWN0LmRlc3Ryb3kpPGJyPlxyXG4gICAgICogQWZ0ZXIgZGVzdHJveSwgdGhpcyBvYmplY3QgaXMgbm90IHVzYWJsZSBhbnltb3JlLlxyXG4gICAgICogWW91IGNhbiB1c2UgY2MuaXNWYWxpZChvYmopIHRvIGNoZWNrIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBkZXN0cm95ZWQgYmVmb3JlIGFjY2Vzc2luZyBpdC5cclxuICAgICAqICEjemhcclxuICAgICAqIOmUgOavgeivpei0tOWbvu+8jOW5tueri+WNs+mHiuaUvuWug+WvueW6lOeahOaYvuWtmOOAgu+8iOe7p+aJv+iHqiBjYy5PYmplY3QuZGVzdHJvee+8iTxici8+XHJcbiAgICAgKiDplIDmr4HlkI7vvIzor6Xlr7nosaHkuI3lho3lj6/nlKjjgILmgqjlj6/ku6XlnKjorr/pl67lr7nosaHkuYvliY3kvb/nlKggY2MuaXNWYWxpZChvYmopIOadpeajgOafpeWvueixoeaYr+WQpuW3suiiq+mUgOavgeOAglxyXG4gICAgICogQG1ldGhvZCBkZXN0cm95XHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBpbmhlcml0IGZyb20gdGhlIENDT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3kgKCkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuY2FwYWJpbGl0aWVzLmltYWdlQml0bWFwICYmIHRoaXMuX2ltYWdlIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXApIHtcclxuICAgICAgICAgICAgdGhpcy5faW1hZ2UuY2xvc2UgJiYgdGhpcy5faW1hZ2UuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGFja2FibGUgJiYgY2MuZHluYW1pY0F0bGFzTWFuYWdlciAmJiBjYy5keW5hbWljQXRsYXNNYW5hZ2VyLmRlbGV0ZUF0bGFzVGV4dHVyZSh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5faW1hZ2UgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgJiYgdGhpcy5fdGV4dHVyZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBQaXhlbCBmb3JtYXQgb2YgdGhlIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiOt+WPlue6ueeQhueahOWDj+e0oOagvOW8j+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRQaXhlbEZvcm1hdFxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRQaXhlbEZvcm1hdCAoKSB7XHJcbiAgICAgICAgLy9zdXBwb3J0IG9ubHkgaW4gV2ViR2wgcmVuZGVyaW5nIG1vZGVcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSB0ZXh0dXJlIGhhcyB0aGVpciBBbHBoYSBwcmVtdWx0aXBsaWVkLlxyXG4gICAgICogISN6aCDmo4Dmn6XnurnnkIblnKjkuIrkvKAgR1BVIOaXtumihOS5mOmAiemhueaYr+WQpuW8gOWQr+OAglxyXG4gICAgICogQG1ldGhvZCBoYXNQcmVtdWx0aXBsaWVkQWxwaGFcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGhhc1ByZW11bHRpcGxpZWRBbHBoYSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByZW11bHRpcGx5QWxwaGEgfHwgZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGlzQWxwaGFBdGxhcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWxwaGFBdGxhcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBIYW5kbGVyIG9mIHRleHR1cmUgbG9hZGVkIGV2ZW50LlxyXG4gICAgICogU2luY2UgdjIuMCwgeW91IGRvbid0IG5lZWQgdG8gaW52b2tlIHRoaXMgZnVuY3Rpb24sIGl0IHdpbGwgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIHRleHR1cmUgbG9hZGVkLlxyXG4gICAgICogISN6aCDotLTlm77liqDovb3kuovku7blpITnkIblmajjgIJ2Mi4wIOS5i+WQjuS9oOWwhuS4jeWcqOmcgOimgeaJi+WKqOaJp+ihjOi/meS4quWHveaVsO+8jOWug+S8muWcqOi0tOWbvuWKoOi9veaIkOWKn+S5i+WQjuiHquWKqOaJp+ihjOOAglxyXG4gICAgICogQG1ldGhvZCBoYW5kbGVMb2FkZWRUZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwcmVtdWx0aXBsaWVkXVxyXG4gICAgICovXHJcbiAgICBoYW5kbGVMb2FkZWRUZXh0dXJlICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ltYWdlIHx8ICF0aGlzLl9pbWFnZS53aWR0aCB8fCAhdGhpcy5faW1hZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX2ltYWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5faW1hZ2UuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBvcHRzID0gX2dldFNoYXJlZE9wdGlvbnMoKTtcclxuICAgICAgICBvcHRzLmltYWdlID0gdGhpcy5faW1hZ2U7XHJcbiAgICAgICAgLy8gd2ViZ2wgdGV4dHVyZSAyZCB1c2VzIGltYWdlc1xyXG4gICAgICAgIG9wdHMuaW1hZ2VzID0gW29wdHMuaW1hZ2VdO1xyXG4gICAgICAgIG9wdHMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIG9wdHMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgb3B0cy5nZW5NaXBtYXBzID0gdGhpcy5fZ2VuTWlwbWFwcztcclxuICAgICAgICBvcHRzLmZvcm1hdCA9IHRoaXMuX2dldEdGWFBpeGVsRm9ybWF0KHRoaXMuX2Zvcm1hdCk7XHJcbiAgICAgICAgb3B0cy5wcmVtdWx0aXBseUFscGhhID0gdGhpcy5fcHJlbXVsdGlwbHlBbHBoYTtcclxuICAgICAgICBvcHRzLmZsaXBZID0gdGhpcy5fZmxpcFk7XHJcbiAgICAgICAgb3B0cy5taW5GaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9taW5GaWx0ZXJdO1xyXG4gICAgICAgIG9wdHMubWFnRmlsdGVyID0gRmlsdGVySW5kZXhbdGhpcy5fbWFnRmlsdGVyXTtcclxuICAgICAgICBvcHRzLndyYXBTID0gdGhpcy5fd3JhcFM7XHJcbiAgICAgICAgb3B0cy53cmFwVCA9IHRoaXMuX3dyYXBUO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlID0gbmV3IHJlbmRlcmVyLlRleHR1cmUyRChyZW5kZXJlci5kZXZpY2UsIG9wdHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl91cGRhdGVGb3JtYXQoKTtcclxuICAgICAgICB0aGlzLl9jaGVja1BhY2thYmxlKCk7XHJcblxyXG4gICAgICAgIC8vZGlzcGF0Y2ggbG9hZCBldmVudCB0byBsaXN0ZW5lci5cclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbWl0KFwibG9hZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKGNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ltYWdlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJJbWFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNjLnN5cy5jYXBhYmlsaXRpZXMuaW1hZ2VCaXRtYXAgJiYgdGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW1hZ2UuY2xvc2UgJiYgdGhpcy5faW1hZ2UuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEZXNjcmlwdGlvbiBvZiBjYy5UZXh0dXJlMkQuXHJcbiAgICAgKiAhI3poIGNjLlRleHR1cmUyRCDmj4/ov7DjgIJcclxuICAgICAqIEBtZXRob2QgZGVzY3JpcHRpb25cclxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIGRlc2NyaXB0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gXCI8Y2MuVGV4dHVyZTJEIHwgTmFtZSA9IFwiICsgdGhpcy5uYXRpdmVVcmwgKyBcIiB8IERpbWVuc2lvbnMgPSBcIiArIHRoaXMud2lkdGggKyBcIiB4IFwiICsgdGhpcy5oZWlnaHQgKyBcIj5cIjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZWxlYXNlIHRleHR1cmUsIHBsZWFzZSB1c2UgZGVzdHJveSBpbnN0ZWFkLlxyXG4gICAgICogISN6aCDph4rmlL7nurnnkIbvvIzor7fkvb/nlKggZGVzdHJveSDmm7/ku6PjgIJcclxuICAgICAqIEBtZXRob2QgcmVsZWFzZVRleHR1cmVcclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZVRleHR1cmUgKCkge1xyXG4gICAgICAgIHRoaXMuX2ltYWdlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlICYmIHRoaXMuX3RleHR1cmUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgd3JhcCBzIGFuZCB3cmFwIHQgb3B0aW9ucy4gPGJyLz5cclxuICAgICAqIElmIHRoZSB0ZXh0dXJlIHNpemUgaXMgTlBPVCAobm9uIHBvd2VyIG9mIDIpLCB0aGVuIGluIGNhbiBvbmx5IHVzZSBnbC5DTEFNUF9UT19FREdFIGluIGdsLlRFWFRVUkVfV1JBUF97UyxUfS5cclxuICAgICAqICEjemgg6K6+572u57q555CG5YyF6KOF5qih5byP44CCXHJcbiAgICAgKiDoi6XnurnnkIbotLTlm77lsLrlr7jmmK8gTlBPVO+8iG5vbiBwb3dlciBvZiAy77yJ77yM5YiZ5Y+q6IO95L2/55SoIFRleHR1cmUyRC5XcmFwTW9kZS5DTEFNUF9UT19FREdF44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFdyYXBNb2RlXHJcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRC5XcmFwTW9kZX0gd3JhcFNcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJELldyYXBNb2RlfSB3cmFwVFxyXG4gICAgICovXHJcbiAgICBzZXRXcmFwTW9kZSAod3JhcFMsIHdyYXBUKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dyYXBTICE9PSB3cmFwUyB8fCB0aGlzLl93cmFwVCAhPT0gd3JhcFQpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSBfZ2V0U2hhcmVkT3B0aW9ucygpO1xyXG4gICAgICAgICAgICBvcHRzLndyYXBTID0gd3JhcFM7XHJcbiAgICAgICAgICAgIG9wdHMud3JhcFQgPSB3cmFwVDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgbWluRmlsdGVyIGFuZCBtYWdGaWx0ZXIgb3B0aW9uc1xyXG4gICAgICogISN6aCDorr7nva7nurnnkIbotLTlm77nvKnlsI/lkozmlL7lpKfov4fmu6Tlmajnrpfms5XpgInpobnjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RmlsdGVyc1xyXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkQuRmlsdGVyfSBtaW5GaWx0ZXJcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJELkZpbHRlcn0gbWFnRmlsdGVyXHJcbiAgICAgKi9cclxuICAgIHNldEZpbHRlcnMgKG1pbkZpbHRlciwgbWFnRmlsdGVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21pbkZpbHRlciAhPT0gbWluRmlsdGVyIHx8IHRoaXMuX21hZ0ZpbHRlciAhPT0gbWFnRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gX2dldFNoYXJlZE9wdGlvbnMoKTtcclxuICAgICAgICAgICAgb3B0cy5taW5GaWx0ZXIgPSBtaW5GaWx0ZXI7XHJcbiAgICAgICAgICAgIG9wdHMubWFnRmlsdGVyID0gbWFnRmlsdGVyO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0cyB0aGUgZmxpcFkgb3B0aW9uc1xyXG4gICAgICogISN6aCDorr7nva7otLTlm77nmoTnurXlkJHnv7vovazpgInpobnjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RmxpcFlcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFlcclxuICAgICAqL1xyXG4gICAgc2V0RmxpcFkgKGZsaXBZKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZsaXBZICE9PSBmbGlwWSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XHJcbiAgICAgICAgICAgIG9wdHMuZmxpcFkgPSBmbGlwWTtcclxuICAgICAgICAgICAgb3B0cy5wcmVtdWx0aXBseUFscGhhID0gdGhpcy5fcHJlbXVsdGlwbHlBbHBoYTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldHMgdGhlIHByZW11bHRpcGx5IGFscGhhIG9wdGlvbnNcclxuICAgICAqICEjemgg6K6+572u6LS05Zu+55qE6aKE5LmY6YCJ6aG544CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFByZW11bHRpcGx5QWxwaGFcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlbXVsdGlwbHlcclxuICAgICAqL1xyXG4gICAgc2V0UHJlbXVsdGlwbHlBbHBoYSAocHJlbXVsdGlwbHkpIHtcclxuICAgICAgICBpZiAodGhpcy5fcHJlbXVsdGlwbHlBbHBoYSAhPT0gcHJlbXVsdGlwbHkpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSBfZ2V0U2hhcmVkT3B0aW9ucygpO1xyXG4gICAgICAgICAgICBvcHRzLmZsaXBZID0gdGhpcy5fZmxpcFk7XHJcbiAgICAgICAgICAgIG9wdHMucHJlbXVsdGlwbHlBbHBoYSA9IHByZW11bHRpcGx5O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShvcHRzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVGb3JtYXQgKCkge1xyXG4gICAgICAgIHRoaXMuX2lzQWxwaGFBdGxhcyA9IHRoaXMuX2Zvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCQV9FVEMxIHx8IHRoaXMuX2Zvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCX0FfUFZSVENfNEJQUFYxIHx8IHRoaXMuX2Zvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCX0FfUFZSVENfMkJQUFYxO1xyXG4gICAgICAgIGlmIChDQ19KU0IpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5zZXRBbHBoYUF0bGFzKHRoaXMuX2lzQWxwaGFBdGxhcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfY2hlY2tQYWNrYWJsZSAoKSB7XHJcbiAgICAgICAgbGV0IGR5bmFtaWNBdGxhcyA9IGNjLmR5bmFtaWNBdGxhc01hbmFnZXI7XHJcbiAgICAgICAgaWYgKCFkeW5hbWljQXRsYXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzQ29tcHJlc3NlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhY2thYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB3ID0gdGhpcy53aWR0aCwgaCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIGlmICghdGhpcy5faW1hZ2UgfHxcclxuICAgICAgICAgICAgdyA+IGR5bmFtaWNBdGxhcy5tYXhGcmFtZVNpemUgfHwgaCA+IGR5bmFtaWNBdGxhcy5tYXhGcmFtZVNpemUgfHwgXHJcbiAgICAgICAgICAgIHRoaXMuX2dldEhhc2goKSAhPT0gZHluYW1pY0F0bGFzLkF0bGFzLkRFRkFVTFRfSEFTSCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5faW1hZ2UgJiYgdGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0T3B0cygpIHtcclxuICAgICAgICBsZXQgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XHJcbiAgICAgICAgb3B0cy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgb3B0cy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICBvcHRzLmdlbk1pcG1hcHMgPSB0aGlzLl9nZW5NaXBtYXBzO1xyXG4gICAgICAgIG9wdHMuZm9ybWF0ID0gdGhpcy5fZm9ybWF0O1xyXG4gICAgICAgIG9wdHMucHJlbXVsdGlwbHlBbHBoYSA9IHRoaXMuX3ByZW11bHRpcGx5QWxwaGE7XHJcbiAgICAgICAgb3B0cy5hbmlzb3Ryb3B5ID0gdGhpcy5fYW5pc290cm9weTtcclxuICAgICAgICBvcHRzLmZsaXBZID0gdGhpcy5fZmxpcFk7XHJcbiAgICAgICAgb3B0cy5taW5GaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9taW5GaWx0ZXJdO1xyXG4gICAgICAgIG9wdHMubWFnRmlsdGVyID0gRmlsdGVySW5kZXhbdGhpcy5fbWFnRmlsdGVyXTtcclxuICAgICAgICBvcHRzLm1pcEZpbHRlciA9IEZpbHRlckluZGV4W3RoaXMuX21pcEZpbHRlcl07XHJcbiAgICAgICAgb3B0cy53cmFwUyA9IHRoaXMuX3dyYXBTO1xyXG4gICAgICAgIG9wdHMud3JhcFQgPSB0aGlzLl93cmFwVDtcclxuICAgICAgICByZXR1cm4gb3B0cztcclxuICAgIH0sXHJcblxyXG4gICAgX2dldEdGWFBpeGVsRm9ybWF0IChmb3JtYXQpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JBX0VUQzEpIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gUGl4ZWxGb3JtYXQuUkdCX0VUQzE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCX0FfUFZSVENfNEJQUFYxKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IFBpeGVsRm9ybWF0LlJHQl9QVlJUQ180QlBQVjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCX0FfUFZSVENfMkJQUFYxKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IFBpeGVsRm9ybWF0LlJHQl9QVlJUQ18yQlBQVjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZXNldFVuZGVybHlpbmdNaXBtYXBzKG1pcG1hcFNvdXJjZXMpIHtcclxuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0T3B0cygpO1xyXG4gICAgICAgIG9wdHMuaW1hZ2VzID0gbWlwbWFwU291cmNlcyB8fCBbbnVsbF07XHJcbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmUgPSBuZXcgcmVuZGVyZXIuVGV4dHVyZTJEKHJlbmRlcmVyLmRldmljZSwgb3B0cyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGUob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBTRVJJQUxJWkFUSU9OXHJcblxyXG4gICAgX3NlcmlhbGl6ZTogKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGV4dElkID0gXCJcIjtcclxuICAgICAgICBsZXQgZXhwb3J0ZWRFeHRzID0gdGhpcy5fZXhwb3J0ZWRFeHRzO1xyXG4gICAgICAgIGlmICghZXhwb3J0ZWRFeHRzICYmIHRoaXMuX25hdGl2ZSkge1xyXG4gICAgICAgICAgICBleHBvcnRlZEV4dHMgPSBbdGhpcy5fbmF0aXZlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4cG9ydGVkRXh0cykge1xyXG4gICAgICAgICAgICBsZXQgZXh0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4cG9ydGVkRXh0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4dElkID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCBleHQgPSBleHBvcnRlZEV4dHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0QGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBleHRGb3JtYXQgPSBleHQuc3BsaXQoJ0AnKTtcclxuICAgICAgICAgICAgICAgICAgICBleHRJZCA9IFRleHR1cmUyRC5leHRuYW1lcy5pbmRleE9mKGV4dEZvcm1hdFswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dElkIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRJZCA9IGV4dDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dEZvcm1hdFsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRJZCArPSAnQCcgKyBleHRGb3JtYXRbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXh0cy5wdXNoKGV4dElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBleHRJZCA9IGV4dHMuam9pbignXycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXNzZXQgPSBgJHtleHRJZH0sJHt0aGlzLl9taW5GaWx0ZXJ9LCR7dGhpcy5fbWFnRmlsdGVyfSwke3RoaXMuX3dyYXBTfSwke3RoaXMuX3dyYXBUfSxgICtcclxuICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLl9wcmVtdWx0aXBseUFscGhhID8gMSA6IDB9LCR7dGhpcy5fZ2VuTWlwbWFwcyA/IDEgOiAwfSwke3RoaXMuX3BhY2thYmxlID8gMSA6IDB9YDtcclxuICAgICAgICByZXR1cm4gYXNzZXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBsZXQgZmllbGRzID0gZGF0YS5zcGxpdCgnLCcpO1xyXG4gICAgICAgIC8vIGRlY29kZSBleHRuYW1lXHJcbiAgICAgICAgbGV0IGV4dElkU3RyID0gZmllbGRzWzBdO1xyXG4gICAgICAgIGlmIChleHRJZFN0cikge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gVGV4dHVyZTJELl9wYXJzZUV4dChleHRJZFN0ciwgdGhpcy5fZm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuYmVzdEV4dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0UmF3QXNzZXQocmVzdWx0LmJlc3RFeHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0ID0gcmVzdWx0LmJlc3RGb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0LmRlZmF1bHRFeHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldFJhd0Fzc2V0KHJlc3VsdC5kZWZhdWx0RXh0KTtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzMTIwLCByZXN1bHQuZGVmYXVsdEV4dCwgcmVzdWx0LmRlZmF1bHRFeHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGNjLmRlYnVnLmdldEVycm9yKDMxMjEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmllbGRzLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgICAgICAvLyBkZWNvZGUgZmlsdGVyc1xyXG4gICAgICAgICAgICB0aGlzLl9taW5GaWx0ZXIgPSBwYXJzZUludChmaWVsZHNbMV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9tYWdGaWx0ZXIgPSBwYXJzZUludChmaWVsZHNbMl0pO1xyXG4gICAgICAgICAgICAvLyBkZWNvZGUgd3JhcHNcclxuICAgICAgICAgICAgdGhpcy5fd3JhcFMgPSBwYXJzZUludChmaWVsZHNbM10pO1xyXG4gICAgICAgICAgICB0aGlzLl93cmFwVCA9IHBhcnNlSW50KGZpZWxkc1s0XSk7XHJcbiAgICAgICAgICAgIC8vIGRlY29kZSBwcmVtdWx0aXBseSBhbHBoYVxyXG4gICAgICAgICAgICB0aGlzLl9wcmVtdWx0aXBseUFscGhhID0gZmllbGRzWzVdLmNoYXJDb2RlQXQoMCkgPT09IENIQVJfQ09ERV8xO1xyXG4gICAgICAgICAgICB0aGlzLl9nZW5NaXBtYXBzID0gZmllbGRzWzZdLmNoYXJDb2RlQXQoMCkgPT09IENIQVJfQ09ERV8xO1xyXG4gICAgICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IGZpZWxkc1s3XS5jaGFyQ29kZUF0KDApID09PSBDSEFSX0NPREVfMTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRIYXNoICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2hhc2hEaXJ0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdlbk1pcG1hcHMgPSB0aGlzLl9nZW5NaXBtYXBzID8gMSA6IDA7XHJcbiAgICAgICAgbGV0IHByZW11bHRpcGx5QWxwaGEgPSB0aGlzLl9wcmVtdWx0aXBseUFscGhhID8gMSA6IDA7XHJcbiAgICAgICAgbGV0IGZsaXBZID0gdGhpcy5fZmxpcFkgPyAxIDogMDtcclxuICAgICAgICBsZXQgbWluRmlsdGVyID0gdGhpcy5fbWluRmlsdGVyID09PSBGaWx0ZXIuTElORUFSID8gMSA6IDI7XHJcbiAgICAgICAgbGV0IG1hZ0ZpbHRlciA9IHRoaXMuX21hZ0ZpbHRlciA9PT0gRmlsdGVyLkxJTkVBUiA/IDEgOiAyO1xyXG4gICAgICAgIGxldCB3cmFwUyA9IHRoaXMuX3dyYXBTID09PSBXcmFwTW9kZS5SRVBFQVQgPyAxIDogKHRoaXMuX3dyYXBTID09PSBXcmFwTW9kZS5DTEFNUF9UT19FREdFID8gMiA6IDMpO1xyXG4gICAgICAgIGxldCB3cmFwVCA9IHRoaXMuX3dyYXBUID09PSBXcmFwTW9kZS5SRVBFQVQgPyAxIDogKHRoaXMuX3dyYXBUID09PSBXcmFwTW9kZS5DTEFNUF9UT19FREdFID8gMiA6IDMpO1xyXG4gICAgICAgIGxldCBwaXhlbEZvcm1hdCA9IHRoaXMuX2Zvcm1hdDtcclxuICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLl9pbWFnZTtcclxuICAgICAgICBpZiAoQ0NfSlNCICYmIGltYWdlKSB7XHJcbiAgICAgICAgICAgIGlmIChpbWFnZS5fZ2xGb3JtYXQgJiYgaW1hZ2UuX2dsRm9ybWF0ICE9PSBHTF9SR0JBKVxyXG4gICAgICAgICAgICAgICAgcGl4ZWxGb3JtYXQgPSAwO1xyXG4gICAgICAgICAgICBwcmVtdWx0aXBseUFscGhhID0gaW1hZ2UuX3ByZW11bHRpcGx5QWxwaGEgPyAxIDogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2hhc2ggPSBOdW1iZXIoYCR7bWluRmlsdGVyfSR7bWFnRmlsdGVyfSR7cGl4ZWxGb3JtYXR9JHt3cmFwU30ke3dyYXBUfSR7Z2VuTWlwbWFwc30ke3ByZW11bHRpcGx5QWxwaGF9JHtmbGlwWX1gKTtcclxuICAgICAgICB0aGlzLl9oYXNoRGlydHkgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcclxuICAgIH0sXHJcblxyXG4gICAgX2lzQ29tcHJlc3NlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdCA8IFBpeGVsRm9ybWF0LkE4IHx8IHRoaXMuX2Zvcm1hdCA+IFBpeGVsRm9ybWF0LlJHQkEzMkY7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBfY2xlYXJJbWFnZSAoKSB7XHJcbiAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gXCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgX2NoZWNrSW1hZ2VCaXRtYXAgKGNiKSB7XHJcbiAgICAgICAgbGV0IGltYWdlID0gdGhpcy5faW1hZ2U7XHJcbiAgICAgICAgbGV0IGZsaXBZID0gdGhpcy5fZmxpcFk7XHJcbiAgICAgICAgbGV0IHByZW11bHRpcGx5QWxwaGEgPSB0aGlzLl9wcmVtdWx0aXBseUFscGhhO1xyXG4gICAgICAgIGlmICh0aGlzLl9mbGlwWSAhPT0gaW1hZ2UuZmxpcFkgfHwgdGhpcy5fcHJlbXVsdGlwbHlBbHBoYSAhPT0gaW1hZ2UucHJlbXVsdGlwbHlBbHBoYSkge1xyXG4gICAgICAgICAgICBjcmVhdGVJbWFnZUJpdG1hcChpbWFnZSwge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2VPcmllbnRhdGlvbjogZmxpcFkgIT09IGltYWdlLmZsaXBZID8gJ2ZsaXBZJyA6ICdub25lJyxcclxuICAgICAgICAgICAgICAgIHByZW11bHRpcGx5QWxwaGE6IHByZW11bHRpcGx5QWxwaGEgPyAncHJlbXVsdGlwbHknIDogJ25vbmUnfVxyXG4gICAgICAgICAgICAgICAgKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZS5jbG9zZSAmJiBpbWFnZS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mbGlwWSA9IGZsaXBZO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wcmVtdWx0aXBseUFscGhhID0gcHJlbXVsdGlwbHlBbHBoYTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbWFnZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjemhcclxuICog5b2T6K+l6LWE5rqQ5Yqg6L295oiQ5Yqf5ZCO6Kem5Y+R6K+l5LqL5Lu2XHJcbiAqICEjZW5cclxuICogVGhpcyBldmVudCBpcyBlbWl0dGVkIHdoZW4gdGhlIGFzc2V0IGlzIGxvYWRlZFxyXG4gKlxyXG4gKiBAZXZlbnQgbG9hZFxyXG4gKi9cclxuXHJcbmNjLlRleHR1cmUyRCA9IG1vZHVsZS5leHBvcnRzID0gVGV4dHVyZTJEO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==