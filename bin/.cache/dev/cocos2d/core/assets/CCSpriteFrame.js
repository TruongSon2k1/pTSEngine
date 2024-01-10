
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSpriteFrame.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var EventTarget = require("../event/event-target");

var INSET_LEFT = 0;
var INSET_TOP = 1;
var INSET_RIGHT = 2;
var INSET_BOTTOM = 3;
var temp_uvs = [{
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}];
/**
 * !#en
 * A cc.SpriteFrame has:<br/>
 *  - texture: A cc.Texture2D that will be used by render components<br/>
 *  - rectangle: A rectangle of the texture
 *
 * !#zh
 * 一个 SpriteFrame 包含：<br/>
 *  - 纹理：会被渲染组件使用的 Texture2D 对象。<br/>
 *  - 矩形：在纹理中的矩形区域。
 *
 * @class SpriteFrame
 * @extends Asset
 * @uses EventTarget
 * @example
 * // load a cc.SpriteFrame with image path (Recommend)
 * var self = this;
 * var url = "test assets/PurpleMonster";
 * cc.resources.load(url, cc.SpriteFrame, null, function (err, spriteFrame) {
 *  var node = new cc.Node("New Sprite");
 *  var sprite = node.addComponent(cc.Sprite);
 *  sprite.spriteFrame = spriteFrame;
 *  node.parent = self.node
 * });
 */

var SpriteFrame = cc.Class(
/** @lends cc.SpriteFrame# */
{
  name: 'cc.SpriteFrame',
  "extends": require('../assets/CCAsset'),
  mixins: [EventTarget],
  properties: {
    // Use this property to set texture when loading dependency
    _textureSetter: {
      set: function set(texture) {
        if (texture) {
          if (CC_EDITOR && Editor.isBuilder) {
            // just building
            this._texture = texture;
            return;
          }

          if (this._texture !== texture) {
            this._refreshTexture(texture);
          }
        }
      }
    },

    /**
     * !#en Top border of the sprite
     * !#zh sprite 的顶部边框
     * @property insetTop
     * @type {Number}
     * @default 0
     */
    insetTop: {
      get: function get() {
        return this._capInsets[INSET_TOP];
      },
      set: function set(value) {
        this._capInsets[INSET_TOP] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Bottom border of the sprite
     * !#zh sprite 的底部边框
     * @property insetBottom
     * @type {Number}
     * @default 0
     */
    insetBottom: {
      get: function get() {
        return this._capInsets[INSET_BOTTOM];
      },
      set: function set(value) {
        this._capInsets[INSET_BOTTOM] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Left border of the sprite
     * !#zh sprite 的左边边框
     * @property insetLeft
     * @type {Number}
     * @default 0
     */
    insetLeft: {
      get: function get() {
        return this._capInsets[INSET_LEFT];
      },
      set: function set(value) {
        this._capInsets[INSET_LEFT] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Right border of the sprite
     * !#zh sprite 的左边边框
     * @property insetRight
     * @type {Number}
     * @default 0
     */
    insetRight: {
      get: function get() {
        return this._capInsets[INSET_RIGHT];
      },
      set: function set(value) {
        this._capInsets[INSET_RIGHT] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    }
  },

  /**
   * !#en
   * Constructor of SpriteFrame class.
   * !#zh
   * SpriteFrame 类的构造函数。
   * @method constructor
   * @param {String|Texture2D} [filename]
   * @param {Rect} [rect]
   * @param {Boolean} [rotated] - Whether the frame is rotated in the texture
   * @param {Vec2} [offset] - The offset of the frame in the texture
   * @param {Size} [originalSize] - The size of the frame in the texture
   */
  ctor: function ctor() {
    // Init EventTarget data
    EventTarget.call(this);
    var filename = arguments[0];
    var rect = arguments[1];
    var rotated = arguments[2];
    var offset = arguments[3];
    var originalSize = arguments[4]; // the location of the sprite on rendering texture

    this._rect = null; // uv data of frame

    this.uv = []; // texture of frame

    this._texture = null; // store original info before packed to dynamic atlas

    this._original = null; // for trimming

    this._offset = null; // for trimming

    this._originalSize = null;
    this._rotated = false;
    this._flipX = false;
    this._flipY = false;
    this.vertices = null;
    this._capInsets = [0, 0, 0, 0];
    this.uvSliced = [];

    if (CC_EDITOR) {
      // Atlas asset uuid
      this._atlasUuid = '';
    }

    if (filename !== undefined) {
      this.setTexture(filename, rect, rotated, offset, originalSize);
    } else {//todo log Error
    }
  },

  /**
   * !#en Returns whether the texture have been loaded
   * !#zh 返回是否已加载纹理
   * @method textureLoaded
   * @returns {boolean}
   */
  textureLoaded: function textureLoaded() {
    return this._texture && this._texture.loaded;
  },
  onTextureLoaded: function onTextureLoaded(callback, target) {
    if (this.textureLoaded()) {
      callback.call(target);
    } else {
      this.once('load', callback, target);
      this.ensureLoadTexture();
      return false;
    }

    return true;
  },

  /**
   * !#en Returns whether the sprite frame is rotated in the texture.
   * !#zh 获取 SpriteFrame 是否旋转
   * @method isRotated
   * @return {Boolean}
   */
  isRotated: function isRotated() {
    return this._rotated;
  },

  /**
   * !#en Set whether the sprite frame is rotated in the texture.
   * !#zh 设置 SpriteFrame 是否旋转
   * @method setRotated
   * @param {Boolean} bRotated
   */
  setRotated: function setRotated(bRotated) {
    this._rotated = bRotated;
    if (this._texture) this._calculateUV();
  },

  /**
   * !#en Returns whether the sprite frame is flip x axis in the texture.
   * !#zh 获取 SpriteFrame 是否反转 x 轴
   * @method isFlipX
   * @return {Boolean}
   */
  isFlipX: function isFlipX() {
    return this._flipX;
  },

  /**
   * !#en Returns whether the sprite frame is flip y axis in the texture.
   * !#zh 获取 SpriteFrame 是否反转 y 轴
   * @method isFlipY
   * @return {Boolean}
   */
  isFlipY: function isFlipY() {
    return this._flipY;
  },

  /**
   * !#en Set whether the sprite frame is flip x axis in the texture.
   * !#zh 设置 SpriteFrame 是否翻转 x 轴
   * @method setFlipX
   * @param {Boolean} flipX
   */
  setFlipX: function setFlipX(flipX) {
    this._flipX = flipX;

    if (this._texture) {
      this._calculateUV();
    }
  },

  /**
   * !#en Set whether the sprite frame is flip y axis in the texture.
   * !#zh 设置 SpriteFrame 是否翻转 y 轴
   * @method setFlipY
   * @param {Boolean} flipY
   */
  setFlipY: function setFlipY(flipY) {
    this._flipY = flipY;

    if (this._texture) {
      this._calculateUV();
    }
  },

  /**
   * !#en Returns the rect of the sprite frame in the texture.
   * !#zh 获取 SpriteFrame 的纹理矩形区域
   * @method getRect
   * @return {Rect}
   */
  getRect: function getRect() {
    return cc.rect(this._rect);
  },

  /**
   * !#en Sets the rect of the sprite frame in the texture.
   * !#zh 设置 SpriteFrame 的纹理矩形区域
   * @method setRect
   * @param {Rect} rect
   */
  setRect: function setRect(rect) {
    this._rect = rect;
    if (this._texture) this._calculateUV();
  },

  /**
   * !#en Returns the original size of the trimmed image.
   * !#zh 获取修剪前的原始大小
   * @method getOriginalSize
   * @return {Size}
   */
  getOriginalSize: function getOriginalSize() {
    return cc.size(this._originalSize);
  },

  /**
   * !#en Sets the original size of the trimmed image.
   * !#zh 设置修剪前的原始大小
   * @method setOriginalSize
   * @param {Size} size
   */
  setOriginalSize: function setOriginalSize(size) {
    if (!this._originalSize) {
      this._originalSize = cc.size(size);
    } else {
      this._originalSize.width = size.width;
      this._originalSize.height = size.height;
    }
  },

  /**
   * !#en Returns the texture of the frame.
   * !#zh 获取使用的纹理实例
   * @method getTexture
   * @return {Texture2D}
   */
  getTexture: function getTexture() {
    return this._texture;
  },
  _textureLoadedCallback: function _textureLoadedCallback() {
    var self = this;
    var texture = this._texture;

    if (!texture) {
      // clearTexture called while loading texture...
      return;
    }

    var w = texture.width,
        h = texture.height;

    if (self._rect) {
      self._checkRect(self._texture);
    } else {
      self._rect = cc.rect(0, 0, w, h);
    }

    if (!self._originalSize) {
      self.setOriginalSize(cc.size(w, h));
    }

    if (!self._offset) {
      self.setOffset(cc.v2(0, 0));
    }

    self._calculateUV(); // dispatch 'load' event of cc.SpriteFrame


    self.emit("load");
  },

  /*
   * !#en Sets the texture of the frame.
   * !#zh 设置使用的纹理实例。
   * @method _refreshTexture
   * @param {Texture2D} texture
   */
  _refreshTexture: function _refreshTexture(texture) {
    this._texture = texture;

    if (texture.loaded) {
      this._textureLoadedCallback();
    } else {
      texture.once('load', this._textureLoadedCallback, this);
    }
  },

  /**
   * !#en Returns the offset of the frame in the texture.
   * !#zh 获取偏移量
   * @method getOffset
   * @return {Vec2}
   */
  getOffset: function getOffset() {
    return cc.v2(this._offset);
  },

  /**
   * !#en Sets the offset of the frame in the texture.
   * !#zh 设置偏移量
   * @method setOffset
   * @param {Vec2} offsets
   */
  setOffset: function setOffset(offsets) {
    this._offset = cc.v2(offsets);
  },

  /**
   * !#en Clone the sprite frame.
   * !#zh 克隆 SpriteFrame
   * @method clone
   * @return {SpriteFrame}
   */
  clone: function clone() {
    return new SpriteFrame(this._texture, this.getRect(), this._rotated, this.getOffset(), this.getOriginalSize());
  },

  /**
   * !#en Set SpriteFrame with Texture, rect, rotated, offset and originalSize.<br/>
   * !#zh 通过 Texture，rect，rotated，offset 和 originalSize 设置 SpriteFrame。
   * @method setTexture
   * @param {Texture2D} texture
   * @param {Rect} [rect=null]
   * @param {Boolean} [rotated=false]
   * @param {Vec2} [offset=cc.v2(0,0)]
   * @param {Size} [originalSize=rect.size]
   * @return {Boolean}
   */
  setTexture: function setTexture(texture, rect, rotated, offset, originalSize) {
    if (arguments.length === 1 && texture === this._texture) return;

    if (rect) {
      this._rect = rect;
    } else {
      this._rect = null;
    }

    if (offset) {
      this.setOffset(offset);
    } else {
      this._offset = null;
    }

    if (originalSize) {
      this.setOriginalSize(originalSize);
    } else {
      this._originalSize = null;
    }

    this._rotated = rotated || false;

    if (typeof texture === 'string') {
      cc.errorID(3401);
      return;
    }

    if (texture instanceof cc.Texture2D) {
      this._refreshTexture(texture);
    }

    return true;
  },

  /**
   * !#en If a loading scene (or prefab) is marked as `asyncLoadAssets`, all the textures of the SpriteFrame which
   * associated by user's custom Components in the scene, will not preload automatically.
   * These textures will be load when Sprite component is going to render the SpriteFrames.
   * You can call this method if you want to load the texture early.
   * !#zh 当加载中的场景或 Prefab 被标记为 `asyncLoadAssets` 时，用户在场景中由自定义组件关联到的所有 SpriteFrame 的贴图都不会被提前加载。
   * 只有当 Sprite 组件要渲染这些 SpriteFrame 时，才会检查贴图是否加载。如果你希望加载过程提前，你可以手工调用这个方法。
   *
   * @method ensureLoadTexture
   * @example
   * if (spriteFrame.textureLoaded()) {
   *     this._onSpriteFrameLoaded();
   * }
   * else {
   *     spriteFrame.once('load', this._onSpriteFrameLoaded, this);
   *     spriteFrame.ensureLoadTexture();
   * }
   */
  ensureLoadTexture: function ensureLoadTexture() {
    if (this._texture) {
      if (!this._texture.loaded) {
        // load exists texture
        this._refreshTexture(this._texture);

        cc.assetManager.postLoadNative(this._texture);
      }
    }
  },

  /**
   * !#en
   * If you do not need to use the SpriteFrame temporarily, you can call this method so that its texture could be garbage collected. Then when you need to render the SpriteFrame, you should call `ensureLoadTexture` manually to reload texture.
   * !#zh
   * 当你暂时不再使用这个 SpriteFrame 时，可以调用这个方法来保证引用的贴图对象能被 GC。然后当你要渲染 SpriteFrame 时，你需要手动调用 `ensureLoadTexture` 来重新加载贴图。
   * @method clearTexture
   * @deprecated since 2.1
   */
  _checkRect: function _checkRect(texture) {
    var rect = this._rect;
    var maxX = rect.x,
        maxY = rect.y;

    if (this._rotated) {
      maxX += rect.height;
      maxY += rect.width;
    } else {
      maxX += rect.width;
      maxY += rect.height;
    }

    if (maxX > texture.width) {
      cc.errorID(3300, texture.nativeUrl + '/' + this.name, maxX, texture.width);
    }

    if (maxY > texture.height) {
      cc.errorID(3400, texture.nativeUrl + '/' + this.name, maxY, texture.height);
    }
  },
  _flipXY: function _flipXY(uvs) {
    if (this._flipX) {
      var tempVal = uvs[0];
      uvs[0] = uvs[1];
      uvs[1] = tempVal;
      tempVal = uvs[2];
      uvs[2] = uvs[3];
      uvs[3] = tempVal;
    }

    if (this._flipY) {
      var _tempVal = uvs[0];
      uvs[0] = uvs[2];
      uvs[2] = _tempVal;
      _tempVal = uvs[1];
      uvs[1] = uvs[3];
      uvs[3] = _tempVal;
    }
  },
  _calculateSlicedUV: function _calculateSlicedUV() {
    var rect = this._rect;
    var atlasWidth = this._texture.width;
    var atlasHeight = this._texture.height;
    var leftWidth = this._capInsets[INSET_LEFT];
    var rightWidth = this._capInsets[INSET_RIGHT];
    var centerWidth = rect.width - leftWidth - rightWidth;
    var topHeight = this._capInsets[INSET_TOP];
    var bottomHeight = this._capInsets[INSET_BOTTOM];
    var centerHeight = rect.height - topHeight - bottomHeight;
    var uvSliced = this.uvSliced;
    uvSliced.length = 0;

    if (this._rotated) {
      temp_uvs[0].u = rect.x / atlasWidth;
      temp_uvs[1].u = (rect.x + bottomHeight) / atlasWidth;
      temp_uvs[2].u = (rect.x + bottomHeight + centerHeight) / atlasWidth;
      temp_uvs[3].u = (rect.x + rect.height) / atlasWidth;
      temp_uvs[3].v = rect.y / atlasHeight;
      temp_uvs[2].v = (rect.y + leftWidth) / atlasHeight;
      temp_uvs[1].v = (rect.y + leftWidth + centerWidth) / atlasHeight;
      temp_uvs[0].v = (rect.y + rect.width) / atlasHeight;

      this._flipXY(temp_uvs);

      for (var row = 0; row < 4; ++row) {
        var rowD = temp_uvs[row];

        for (var col = 0; col < 4; ++col) {
          var colD = temp_uvs[3 - col];
          uvSliced.push({
            u: rowD.u,
            v: colD.v
          });
        }
      }
    } else {
      temp_uvs[0].u = rect.x / atlasWidth;
      temp_uvs[1].u = (rect.x + leftWidth) / atlasWidth;
      temp_uvs[2].u = (rect.x + leftWidth + centerWidth) / atlasWidth;
      temp_uvs[3].u = (rect.x + rect.width) / atlasWidth;
      temp_uvs[3].v = rect.y / atlasHeight;
      temp_uvs[2].v = (rect.y + topHeight) / atlasHeight;
      temp_uvs[1].v = (rect.y + topHeight + centerHeight) / atlasHeight;
      temp_uvs[0].v = (rect.y + rect.height) / atlasHeight;

      this._flipXY(temp_uvs);

      for (var _row = 0; _row < 4; ++_row) {
        var _rowD = temp_uvs[_row];

        for (var _col = 0; _col < 4; ++_col) {
          var _colD = temp_uvs[_col];
          uvSliced.push({
            u: _colD.u,
            v: _rowD.v
          });
        }
      }
    }
  },
  _setDynamicAtlasFrame: function _setDynamicAtlasFrame(frame) {
    if (!frame) return;
    this._original = {
      _texture: this._texture,
      _x: this._rect.x,
      _y: this._rect.y
    };
    this._texture = frame.texture;
    this._rect.x = frame.x;
    this._rect.y = frame.y;

    this._calculateUV();
  },
  _resetDynamicAtlasFrame: function _resetDynamicAtlasFrame() {
    if (!this._original) return;
    this._rect.x = this._original._x;
    this._rect.y = this._original._y;
    this._texture = this._original._texture;
    this._original = null;

    this._calculateUV();
  },
  _calculateUV: function _calculateUV() {
    var rect = this._rect,
        texture = this._texture,
        uv = this.uv,
        texw = texture.width,
        texh = texture.height;

    if (this._rotated) {
      var l = texw === 0 ? 0 : rect.x / texw;
      var r = texw === 0 ? 0 : (rect.x + rect.height) / texw;
      var b = texh === 0 ? 0 : (rect.y + rect.width) / texh;
      var t = texh === 0 ? 0 : rect.y / texh;
      uv[0] = l;
      uv[1] = t;
      uv[2] = l;
      uv[3] = b;
      uv[4] = r;
      uv[5] = t;
      uv[6] = r;
      uv[7] = b;
    } else {
      var _l = texw === 0 ? 0 : rect.x / texw;

      var _r = texw === 0 ? 0 : (rect.x + rect.width) / texw;

      var _b = texh === 0 ? 0 : (rect.y + rect.height) / texh;

      var _t = texh === 0 ? 0 : rect.y / texh;

      uv[0] = _l;
      uv[1] = _b;
      uv[2] = _r;
      uv[3] = _b;
      uv[4] = _l;
      uv[5] = _t;
      uv[6] = _r;
      uv[7] = _t;
    }

    if (this._flipX) {
      var tempVal = uv[0];
      uv[0] = uv[2];
      uv[2] = tempVal;
      tempVal = uv[1];
      uv[1] = uv[3];
      uv[3] = tempVal;
      tempVal = uv[4];
      uv[4] = uv[6];
      uv[6] = tempVal;
      tempVal = uv[5];
      uv[5] = uv[7];
      uv[7] = tempVal;
    }

    if (this._flipY) {
      var _tempVal2 = uv[0];
      uv[0] = uv[4];
      uv[4] = _tempVal2;
      _tempVal2 = uv[1];
      uv[1] = uv[5];
      uv[5] = _tempVal2;
      _tempVal2 = uv[2];
      uv[2] = uv[6];
      uv[6] = _tempVal2;
      _tempVal2 = uv[3];
      uv[3] = uv[7];
      uv[7] = _tempVal2;
    }

    var vertices = this.vertices;

    if (vertices) {
      vertices.nu.length = 0;
      vertices.nv.length = 0;

      for (var i = 0; i < vertices.u.length; i++) {
        vertices.nu[i] = vertices.u[i] / texw;
        vertices.nv[i] = vertices.v[i] / texh;
      }
    }

    this._calculateSlicedUV();
  },
  // SERIALIZATION
  _serialize: (CC_EDITOR || CC_TEST) && function (exporting, ctx) {
    var rect = this._rect;
    var offset = this._offset;
    var size = this._originalSize;
    var uuid;
    var texture = this._texture;

    if (texture) {
      uuid = texture._uuid;
    }

    if (!uuid) {
      var url = this._textureFilename;

      if (url) {
        uuid = Editor.Utils.UuidCache.urlToUuid(url);
      }
    }

    if (uuid && exporting) {
      uuid = Editor.Utils.UuidUtils.compressUuid(uuid, true);
      ctx.dependsOn('_textureSetter', uuid);
    }

    var vertices;

    if (this.vertices) {
      vertices = {
        triangles: this.vertices.triangles,
        x: this.vertices.x,
        y: this.vertices.y,
        u: this.vertices.u,
        v: this.vertices.v
      };
    }

    return {
      name: this._name,
      texture: !exporting && uuid || undefined,
      atlas: exporting ? undefined : this._atlasUuid,
      // strip from json if exporting
      rect: rect ? [rect.x, rect.y, rect.width, rect.height] : undefined,
      offset: offset ? [offset.x, offset.y] : undefined,
      originalSize: size ? [size.width, size.height] : undefined,
      rotated: this._rotated ? 1 : undefined,
      capInsets: this._capInsets,
      vertices: vertices
    };
  },
  _deserialize: function _deserialize(data, handle) {
    var rect = data.rect;

    if (rect) {
      this._rect = new cc.Rect(rect[0], rect[1], rect[2], rect[3]);
    }

    if (data.offset) {
      this.setOffset(new cc.Vec2(data.offset[0], data.offset[1]));
    }

    if (data.originalSize) {
      this.setOriginalSize(new cc.Size(data.originalSize[0], data.originalSize[1]));
    }

    this._rotated = data.rotated === 1;
    this._name = data.name;
    var capInsets = data.capInsets;

    if (capInsets) {
      this._capInsets[INSET_LEFT] = capInsets[INSET_LEFT];
      this._capInsets[INSET_TOP] = capInsets[INSET_TOP];
      this._capInsets[INSET_RIGHT] = capInsets[INSET_RIGHT];
      this._capInsets[INSET_BOTTOM] = capInsets[INSET_BOTTOM];
    }

    if (CC_EDITOR) {
      this._atlasUuid = data.atlas;
    }

    this.vertices = data.vertices;

    if (this.vertices) {
      // initialize normal uv arrays
      this.vertices.nu = [];
      this.vertices.nv = [];
    }

    if (!CC_BUILD) {
      // manually load texture via _textureSetter
      var textureUuid = data.texture;

      if (textureUuid) {
        handle.result.push(this, '_textureSetter', textureUuid);
      }
    }
  }
});
var proto = SpriteFrame.prototype;
proto.copyWithZone = proto.clone;
proto.copy = proto.clone;
proto.initWithTexture = proto.setTexture;
cc.SpriteFrame = SpriteFrame;
module.exports = SpriteFrame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcQ0NTcHJpdGVGcmFtZS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJJTlNFVF9MRUZUIiwiSU5TRVRfVE9QIiwiSU5TRVRfUklHSFQiLCJJTlNFVF9CT1RUT00iLCJ0ZW1wX3V2cyIsInUiLCJ2IiwiU3ByaXRlRnJhbWUiLCJjYyIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsInByb3BlcnRpZXMiLCJfdGV4dHVyZVNldHRlciIsInNldCIsInRleHR1cmUiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJpc0J1aWxkZXIiLCJfdGV4dHVyZSIsIl9yZWZyZXNoVGV4dHVyZSIsImluc2V0VG9wIiwiZ2V0IiwiX2NhcEluc2V0cyIsInZhbHVlIiwiX2NhbGN1bGF0ZVNsaWNlZFVWIiwiaW5zZXRCb3R0b20iLCJpbnNldExlZnQiLCJpbnNldFJpZ2h0IiwiY3RvciIsImNhbGwiLCJmaWxlbmFtZSIsImFyZ3VtZW50cyIsInJlY3QiLCJyb3RhdGVkIiwib2Zmc2V0Iiwib3JpZ2luYWxTaXplIiwiX3JlY3QiLCJ1diIsIl9vcmlnaW5hbCIsIl9vZmZzZXQiLCJfb3JpZ2luYWxTaXplIiwiX3JvdGF0ZWQiLCJfZmxpcFgiLCJfZmxpcFkiLCJ2ZXJ0aWNlcyIsInV2U2xpY2VkIiwiX2F0bGFzVXVpZCIsInVuZGVmaW5lZCIsInNldFRleHR1cmUiLCJ0ZXh0dXJlTG9hZGVkIiwibG9hZGVkIiwib25UZXh0dXJlTG9hZGVkIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwiZW5zdXJlTG9hZFRleHR1cmUiLCJpc1JvdGF0ZWQiLCJzZXRSb3RhdGVkIiwiYlJvdGF0ZWQiLCJfY2FsY3VsYXRlVVYiLCJpc0ZsaXBYIiwiaXNGbGlwWSIsInNldEZsaXBYIiwiZmxpcFgiLCJzZXRGbGlwWSIsImZsaXBZIiwiZ2V0UmVjdCIsInNldFJlY3QiLCJnZXRPcmlnaW5hbFNpemUiLCJzaXplIiwic2V0T3JpZ2luYWxTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJnZXRUZXh0dXJlIiwiX3RleHR1cmVMb2FkZWRDYWxsYmFjayIsInNlbGYiLCJ3IiwiaCIsIl9jaGVja1JlY3QiLCJzZXRPZmZzZXQiLCJ2MiIsImVtaXQiLCJnZXRPZmZzZXQiLCJvZmZzZXRzIiwiY2xvbmUiLCJsZW5ndGgiLCJlcnJvcklEIiwiVGV4dHVyZTJEIiwiYXNzZXRNYW5hZ2VyIiwicG9zdExvYWROYXRpdmUiLCJtYXhYIiwieCIsIm1heFkiLCJ5IiwibmF0aXZlVXJsIiwiX2ZsaXBYWSIsInV2cyIsInRlbXBWYWwiLCJhdGxhc1dpZHRoIiwiYXRsYXNIZWlnaHQiLCJsZWZ0V2lkdGgiLCJyaWdodFdpZHRoIiwiY2VudGVyV2lkdGgiLCJ0b3BIZWlnaHQiLCJib3R0b21IZWlnaHQiLCJjZW50ZXJIZWlnaHQiLCJyb3ciLCJyb3dEIiwiY29sIiwiY29sRCIsInB1c2giLCJfc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJmcmFtZSIsIl94IiwiX3kiLCJfcmVzZXREeW5hbWljQXRsYXNGcmFtZSIsInRleHciLCJ0ZXhoIiwibCIsInIiLCJiIiwidCIsIm51IiwibnYiLCJpIiwiX3NlcmlhbGl6ZSIsIkNDX1RFU1QiLCJleHBvcnRpbmciLCJjdHgiLCJ1dWlkIiwiX3V1aWQiLCJ1cmwiLCJfdGV4dHVyZUZpbGVuYW1lIiwiVXRpbHMiLCJVdWlkQ2FjaGUiLCJ1cmxUb1V1aWQiLCJVdWlkVXRpbHMiLCJjb21wcmVzc1V1aWQiLCJkZXBlbmRzT24iLCJ0cmlhbmdsZXMiLCJfbmFtZSIsImF0bGFzIiwiY2FwSW5zZXRzIiwiX2Rlc2VyaWFsaXplIiwiZGF0YSIsImhhbmRsZSIsIlJlY3QiLCJWZWMyIiwiU2l6ZSIsIkNDX0JVSUxEIiwidGV4dHVyZVV1aWQiLCJyZXN1bHQiLCJwcm90byIsInByb3RvdHlwZSIsImNvcHlXaXRoWm9uZSIsImNvcHkiLCJpbml0V2l0aFRleHR1cmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7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Y3pDLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUIsZ0JBQXpCLEVBQTJDd0MsV0FBM0M7QUFDSDtBQUNKO0FBQ0o7QUE3dkJtRCxDQUF0QyxDQUFsQjtBQWd3QkEsSUFBSUUsS0FBSyxHQUFHbEosV0FBVyxDQUFDbUosU0FBeEI7QUFFQUQsS0FBSyxDQUFDRSxZQUFOLEdBQXFCRixLQUFLLENBQUNwRSxLQUEzQjtBQUNBb0UsS0FBSyxDQUFDRyxJQUFOLEdBQWFILEtBQUssQ0FBQ3BFLEtBQW5CO0FBQ0FvRSxLQUFLLENBQUNJLGVBQU4sR0FBd0JKLEtBQUssQ0FBQ3hHLFVBQTlCO0FBRUF6QyxFQUFFLENBQUNELFdBQUgsR0FBaUJBLFdBQWpCO0FBRUF1SixNQUFNLENBQUNDLE9BQVAsR0FBaUJ4SixXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKFwiLi4vZXZlbnQvZXZlbnQtdGFyZ2V0XCIpO1xyXG5cclxuY29uc3QgSU5TRVRfTEVGVCA9IDA7XHJcbmNvbnN0IElOU0VUX1RPUCA9IDE7XHJcbmNvbnN0IElOU0VUX1JJR0hUID0gMjtcclxuY29uc3QgSU5TRVRfQk9UVE9NID0gMztcclxuXHJcbmxldCB0ZW1wX3V2cyA9IFt7dTogMCwgdjogMH0sIHt1OiAwLCB2OiAwfSwge3U6IDAsIHY6IDB9LCB7dTogMCwgdjogMH1dO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQSBjYy5TcHJpdGVGcmFtZSBoYXM6PGJyLz5cclxuICogIC0gdGV4dHVyZTogQSBjYy5UZXh0dXJlMkQgdGhhdCB3aWxsIGJlIHVzZWQgYnkgcmVuZGVyIGNvbXBvbmVudHM8YnIvPlxyXG4gKiAgLSByZWN0YW5nbGU6IEEgcmVjdGFuZ2xlIG9mIHRoZSB0ZXh0dXJlXHJcbiAqXHJcbiAqICEjemhcclxuICog5LiA5LiqIFNwcml0ZUZyYW1lIOWMheWQq++8mjxici8+XHJcbiAqICAtIOe6ueeQhu+8muS8muiiq+a4suafk+e7hOS7tuS9v+eUqOeahCBUZXh0dXJlMkQg5a+56LGh44CCPGJyLz5cclxuICogIC0g55+p5b2i77ya5Zyo57q555CG5Lit55qE55+p5b2i5Yy65Z+f44CCXHJcbiAqXHJcbiAqIEBjbGFzcyBTcHJpdGVGcmFtZVxyXG4gKiBAZXh0ZW5kcyBBc3NldFxyXG4gKiBAdXNlcyBFdmVudFRhcmdldFxyXG4gKiBAZXhhbXBsZVxyXG4gKiAvLyBsb2FkIGEgY2MuU3ByaXRlRnJhbWUgd2l0aCBpbWFnZSBwYXRoIChSZWNvbW1lbmQpXHJcbiAqIHZhciBzZWxmID0gdGhpcztcclxuICogdmFyIHVybCA9IFwidGVzdCBhc3NldHMvUHVycGxlTW9uc3RlclwiO1xyXG4gKiBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlNwcml0ZUZyYW1lLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xyXG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBTcHJpdGVcIik7XHJcbiAqICB2YXIgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICogIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gKiAgbm9kZS5wYXJlbnQgPSBzZWxmLm5vZGVcclxuICogfSk7XHJcbiAqL1xyXG5sZXQgU3ByaXRlRnJhbWUgPSBjYy5DbGFzcygvKiogQGxlbmRzIGNjLlNwcml0ZUZyYW1lIyAqL3tcclxuICAgIG5hbWU6ICdjYy5TcHJpdGVGcmFtZScsXHJcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuLi9hc3NldHMvQ0NBc3NldCcpLFxyXG4gICAgbWl4aW5zOiBbRXZlbnRUYXJnZXRdLFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBVc2UgdGhpcyBwcm9wZXJ0eSB0byBzZXQgdGV4dHVyZSB3aGVuIGxvYWRpbmcgZGVwZW5kZW5jeVxyXG4gICAgICAgIF90ZXh0dXJlU2V0dGVyOiB7XHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiBFZGl0b3IuaXNCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGp1c3QgYnVpbGRpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgIT09IHRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUb3AgYm9yZGVyIG9mIHRoZSBzcHJpdGVcclxuICAgICAgICAgKiAhI3poIHNwcml0ZSDnmoTpobbpg6jovrnmoYZcclxuICAgICAgICAgKiBAcHJvcGVydHkgaW5zZXRUb3BcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnNldFRvcDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYXBJbnNldHNbSU5TRVRfVE9QXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9UT1BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEJvdHRvbSBib3JkZXIgb2YgdGhlIHNwcml0ZVxyXG4gICAgICAgICAqICEjemggc3ByaXRlIOeahOW6lemDqOi+ueahhlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldEJvdHRvbVxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluc2V0Qm90dG9tOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9CT1RUT01dO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2xpY2VkVVYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gTGVmdCBib3JkZXIgb2YgdGhlIHNwcml0ZVxyXG4gICAgICAgICAqICEjemggc3ByaXRlIOeahOW3pui+uei+ueahhlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldExlZnRcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnNldExlZnQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFJpZ2h0IGJvcmRlciBvZiB0aGUgc3ByaXRlXHJcbiAgICAgICAgICogISN6aCBzcHJpdGUg55qE5bem6L656L655qGGXHJcbiAgICAgICAgICogQHByb3BlcnR5IGluc2V0UmlnaHRcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbnNldFJpZ2h0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9SSUdIVF07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfUklHSFRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENvbnN0cnVjdG9yIG9mIFNwcml0ZUZyYW1lIGNsYXNzLlxyXG4gICAgICogISN6aFxyXG4gICAgICogU3ByaXRlRnJhbWUg57G755qE5p6E6YCg5Ye95pWw44CCXHJcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xUZXh0dXJlMkR9IFtmaWxlbmFtZV1cclxuICAgICAqIEBwYXJhbSB7UmVjdH0gW3JlY3RdXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtyb3RhdGVkXSAtIFdoZXRoZXIgdGhlIGZyYW1lIGlzIHJvdGF0ZWQgaW4gdGhlIHRleHR1cmVcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW29mZnNldF0gLSBUaGUgb2Zmc2V0IG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZVxyXG4gICAgICogQHBhcmFtIHtTaXplfSBbb3JpZ2luYWxTaXplXSAtIFRoZSBzaXplIG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZVxyXG4gICAgICovXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gSW5pdCBFdmVudFRhcmdldCBkYXRhXHJcbiAgICAgICAgRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGxldCByZWN0ID0gYXJndW1lbnRzWzFdO1xyXG4gICAgICAgIGxldCByb3RhdGVkID0gYXJndW1lbnRzWzJdO1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSBhcmd1bWVudHNbM107XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsU2l6ZSA9IGFyZ3VtZW50c1s0XTtcclxuXHJcbiAgICAgICAgLy8gdGhlIGxvY2F0aW9uIG9mIHRoZSBzcHJpdGUgb24gcmVuZGVyaW5nIHRleHR1cmVcclxuICAgICAgICB0aGlzLl9yZWN0ID0gbnVsbDtcclxuICAgICAgICAvLyB1diBkYXRhIG9mIGZyYW1lXHJcbiAgICAgICAgdGhpcy51diA9IFtdO1xyXG4gICAgICAgIC8vIHRleHR1cmUgb2YgZnJhbWVcclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcclxuICAgICAgICAvLyBzdG9yZSBvcmlnaW5hbCBpbmZvIGJlZm9yZSBwYWNrZWQgdG8gZHluYW1pYyBhdGxhc1xyXG4gICAgICAgIHRoaXMuX29yaWdpbmFsID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZm9yIHRyaW1taW5nXHJcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZm9yIHRyaW1taW5nXHJcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fcm90YXRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9mbGlwWCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZsaXBZID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9jYXBJbnNldHMgPSBbMCwgMCwgMCwgMF07XHJcblxyXG4gICAgICAgIHRoaXMudXZTbGljZWQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAvLyBBdGxhcyBhc3NldCB1dWlkXHJcbiAgICAgICAgICAgIHRoaXMuX2F0bGFzVXVpZCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZpbGVuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKGZpbGVuYW1lLCByZWN0LCByb3RhdGVkLCBvZmZzZXQsIG9yaWdpbmFsU2l6ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy90b2RvIGxvZyBFcnJvclxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciB0aGUgdGV4dHVyZSBoYXZlIGJlZW4gbG9hZGVkXHJcbiAgICAgKiAhI3poIOi/lOWbnuaYr+WQpuW3suWKoOi9vee6ueeQhlxyXG4gICAgICogQG1ldGhvZCB0ZXh0dXJlTG9hZGVkXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgdGV4dHVyZUxvYWRlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlICYmIHRoaXMuX3RleHR1cmUubG9hZGVkO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblRleHR1cmVMb2FkZWQgKGNhbGxiYWNrLCB0YXJnZXQpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlTG9hZGVkKCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbmNlKCdsb2FkJywgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlTG9hZFRleHR1cmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyByb3RhdGVkIGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDojrflj5YgU3ByaXRlRnJhbWUg5piv5ZCm5peL6L2sXHJcbiAgICAgKiBAbWV0aG9kIGlzUm90YXRlZFxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNSb3RhdGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0ZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIHJvdGF0ZWQgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiuvue9riBTcHJpdGVGcmFtZSDmmK/lkKbml4vovaxcclxuICAgICAqIEBtZXRob2Qgc2V0Um90YXRlZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBiUm90YXRlZFxyXG4gICAgICovXHJcbiAgICBzZXRSb3RhdGVkOiBmdW5jdGlvbiAoYlJvdGF0ZWQpIHtcclxuICAgICAgICB0aGlzLl9yb3RhdGVkID0gYlJvdGF0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyBmbGlwIHggYXhpcyBpbiB0aGUgdGV4dHVyZS5cclxuICAgICAqICEjemgg6I635Y+WIFNwcml0ZUZyYW1lIOaYr+WQpuWPjei9rCB4IOi9tFxyXG4gICAgICogQG1ldGhvZCBpc0ZsaXBYXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0ZsaXBYOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZsaXBYO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB3aGV0aGVyIHRoZSBzcHJpdGUgZnJhbWUgaXMgZmxpcCB5IGF4aXMgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiOt+WPliBTcHJpdGVGcmFtZSDmmK/lkKblj43ovawgeSDovbRcclxuICAgICAqIEBtZXRob2QgaXNGbGlwWVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNGbGlwWTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mbGlwWTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB3aGV0aGVyIHRoZSBzcHJpdGUgZnJhbWUgaXMgZmxpcCB4IGF4aXMgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiuvue9riBTcHJpdGVGcmFtZSDmmK/lkKbnv7vovawgeCDovbRcclxuICAgICAqIEBtZXRob2Qgc2V0RmxpcFhcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFhcclxuICAgICAqL1xyXG4gICAgc2V0RmxpcFg6IGZ1bmN0aW9uIChmbGlwWCkge1xyXG4gICAgICAgIHRoaXMuX2ZsaXBYID0gZmxpcFg7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIGZsaXAgeSBheGlzIGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDorr7nva4gU3ByaXRlRnJhbWUg5piv5ZCm57+76L2sIHkg6L20XHJcbiAgICAgKiBAbWV0aG9kIHNldEZsaXBZXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZsaXBZXHJcbiAgICAgKi9cclxuICAgIHNldEZsaXBZOiBmdW5jdGlvbiAoZmxpcFkpIHtcclxuICAgICAgICB0aGlzLl9mbGlwWSA9IGZsaXBZO1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgcmVjdCBvZiB0aGUgc3ByaXRlIGZyYW1lIGluIHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDojrflj5YgU3ByaXRlRnJhbWUg55qE57q555CG55+p5b2i5Yy65Z+fXHJcbiAgICAgKiBAbWV0aG9kIGdldFJlY3RcclxuICAgICAqIEByZXR1cm4ge1JlY3R9XHJcbiAgICAgKi9cclxuICAgIGdldFJlY3Q6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gY2MucmVjdCh0aGlzLl9yZWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldHMgdGhlIHJlY3Qgb2YgdGhlIHNwcml0ZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cclxuICAgICAqICEjemgg6K6+572uIFNwcml0ZUZyYW1lIOeahOe6ueeQhuefqeW9ouWMuuWfn1xyXG4gICAgICogQG1ldGhvZCBzZXRSZWN0XHJcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RcclxuICAgICAqL1xyXG4gICAgc2V0UmVjdDogZnVuY3Rpb24gKHJlY3QpIHtcclxuICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcclxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSlcclxuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzaXplIG9mIHRoZSB0cmltbWVkIGltYWdlLlxyXG4gICAgICogISN6aCDojrflj5bkv67liarliY3nmoTljp/lp4vlpKflsI9cclxuICAgICAqIEBtZXRob2QgZ2V0T3JpZ2luYWxTaXplXHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBnZXRPcmlnaW5hbFNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9vcmlnaW5hbFNpemUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgb3JpZ2luYWwgc2l6ZSBvZiB0aGUgdHJpbW1lZCBpbWFnZS5cclxuICAgICAqICEjemgg6K6+572u5L+u5Ymq5YmN55qE5Y6f5aeL5aSn5bCPXHJcbiAgICAgKiBAbWV0aG9kIHNldE9yaWdpbmFsU2l6ZVxyXG4gICAgICogQHBhcmFtIHtTaXplfSBzaXplXHJcbiAgICAgKi9cclxuICAgIHNldE9yaWdpbmFsU2l6ZTogZnVuY3Rpb24gKHNpemUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFNpemUgPSBjYy5zaXplKHNpemUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsU2l6ZS53aWR0aCA9IHNpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsU2l6ZS5oZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSB0ZXh0dXJlIG9mIHRoZSBmcmFtZS5cclxuICAgICAqICEjemgg6I635Y+W5L2/55So55qE57q555CG5a6e5L6LXHJcbiAgICAgKiBAbWV0aG9kIGdldFRleHR1cmVcclxuICAgICAqIEByZXR1cm4ge1RleHR1cmUyRH1cclxuICAgICAqL1xyXG4gICAgZ2V0VGV4dHVyZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdGV4dHVyZUxvYWRlZENhbGxiYWNrICgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlO1xyXG4gICAgICAgIGlmICghdGV4dHVyZSkge1xyXG4gICAgICAgICAgICAvLyBjbGVhclRleHR1cmUgY2FsbGVkIHdoaWxlIGxvYWRpbmcgdGV4dHVyZS4uLlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3ID0gdGV4dHVyZS53aWR0aCwgaCA9IHRleHR1cmUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5fcmVjdCkge1xyXG4gICAgICAgICAgICBzZWxmLl9jaGVja1JlY3Qoc2VsZi5fdGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLl9yZWN0ID0gY2MucmVjdCgwLCAwLCB3LCBoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc2VsZi5fb3JpZ2luYWxTaXplKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0T3JpZ2luYWxTaXplKGNjLnNpemUodywgaCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzZWxmLl9vZmZzZXQpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXRPZmZzZXQoY2MudjIoMCwgMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5fY2FsY3VsYXRlVVYoKTtcclxuXHJcbiAgICAgICAgLy8gZGlzcGF0Y2ggJ2xvYWQnIGV2ZW50IG9mIGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgc2VsZi5lbWl0KFwibG9hZFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW4gU2V0cyB0aGUgdGV4dHVyZSBvZiB0aGUgZnJhbWUuXHJcbiAgICAgKiAhI3poIOiuvue9ruS9v+eUqOeahOe6ueeQhuWunuS+i+OAglxyXG4gICAgICogQG1ldGhvZCBfcmVmcmVzaFRleHR1cmVcclxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIF9yZWZyZXNoVGV4dHVyZTogZnVuY3Rpb24gKHRleHR1cmUpIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBpZiAodGV4dHVyZS5sb2FkZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZUxvYWRlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXh0dXJlLm9uY2UoJ2xvYWQnLCB0aGlzLl90ZXh0dXJlTG9hZGVkQ2FsbGJhY2ssIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIG9mZnNldCBvZiB0aGUgZnJhbWUgaW4gdGhlIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiOt+WPluWBj+enu+mHj1xyXG4gICAgICogQG1ldGhvZCBnZXRPZmZzZXRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XHJcbiAgICAgKi9cclxuICAgIGdldE9mZnNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9vZmZzZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyB0aGUgb2Zmc2V0IG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cclxuICAgICAqICEjemgg6K6+572u5YGP56e76YePXHJcbiAgICAgKiBAbWV0aG9kIHNldE9mZnNldFxyXG4gICAgICogQHBhcmFtIHtWZWMyfSBvZmZzZXRzXHJcbiAgICAgKi9cclxuICAgIHNldE9mZnNldDogZnVuY3Rpb24gKG9mZnNldHMpIHtcclxuICAgICAgICB0aGlzLl9vZmZzZXQgPSBjYy52MihvZmZzZXRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENsb25lIHRoZSBzcHJpdGUgZnJhbWUuXHJcbiAgICAgKiAhI3poIOWFi+mahiBTcHJpdGVGcmFtZVxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICogQHJldHVybiB7U3ByaXRlRnJhbWV9XHJcbiAgICAgKi9cclxuICAgIGNsb25lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNwcml0ZUZyYW1lKHRoaXMuX3RleHR1cmUsIHRoaXMuZ2V0UmVjdCgpLCB0aGlzLl9yb3RhdGVkLCB0aGlzLmdldE9mZnNldCgpLCB0aGlzLmdldE9yaWdpbmFsU2l6ZSgpKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCBTcHJpdGVGcmFtZSB3aXRoIFRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCBhbmQgb3JpZ2luYWxTaXplLjxici8+XHJcbiAgICAgKiAhI3poIOmAmui/hyBUZXh0dXJl77yMcmVjdO+8jHJvdGF0ZWTvvIxvZmZzZXQg5ZKMIG9yaWdpbmFsU2l6ZSDorr7nva4gU3ByaXRlRnJhbWXjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGV4dHVyZVxyXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVcclxuICAgICAqIEBwYXJhbSB7UmVjdH0gW3JlY3Q9bnVsbF1cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JvdGF0ZWQ9ZmFsc2VdXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvZmZzZXQ9Y2MudjIoMCwwKV1cclxuICAgICAqIEBwYXJhbSB7U2l6ZX0gW29yaWdpbmFsU2l6ZT1yZWN0LnNpemVdXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBzZXRUZXh0dXJlOiBmdW5jdGlvbiAodGV4dHVyZSwgcmVjdCwgcm90YXRlZCwgb2Zmc2V0LCBvcmlnaW5hbFNpemUpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0ZXh0dXJlID09PSB0aGlzLl90ZXh0dXJlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChyZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVjdCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T2Zmc2V0KG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vZmZzZXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9yaWdpbmFsU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbmFsU2l6ZShvcmlnaW5hbFNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JvdGF0ZWQgPSByb3RhdGVkIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRleHR1cmUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzQwMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIElmIGEgbG9hZGluZyBzY2VuZSAob3IgcHJlZmFiKSBpcyBtYXJrZWQgYXMgYGFzeW5jTG9hZEFzc2V0c2AsIGFsbCB0aGUgdGV4dHVyZXMgb2YgdGhlIFNwcml0ZUZyYW1lIHdoaWNoXHJcbiAgICAgKiBhc3NvY2lhdGVkIGJ5IHVzZXIncyBjdXN0b20gQ29tcG9uZW50cyBpbiB0aGUgc2NlbmUsIHdpbGwgbm90IHByZWxvYWQgYXV0b21hdGljYWxseS5cclxuICAgICAqIFRoZXNlIHRleHR1cmVzIHdpbGwgYmUgbG9hZCB3aGVuIFNwcml0ZSBjb21wb25lbnQgaXMgZ29pbmcgdG8gcmVuZGVyIHRoZSBTcHJpdGVGcmFtZXMuXHJcbiAgICAgKiBZb3UgY2FuIGNhbGwgdGhpcyBtZXRob2QgaWYgeW91IHdhbnQgdG8gbG9hZCB0aGUgdGV4dHVyZSBlYXJseS5cclxuICAgICAqICEjemgg5b2T5Yqg6L295Lit55qE5Zy65pmv5oiWIFByZWZhYiDooqvmoIforrDkuLogYGFzeW5jTG9hZEFzc2V0c2Ag5pe277yM55So5oi35Zyo5Zy65pmv5Lit55Sx6Ieq5a6a5LmJ57uE5Lu25YWz6IGU5Yiw55qE5omA5pyJIFNwcml0ZUZyYW1lIOeahOi0tOWbvumDveS4jeS8muiiq+aPkOWJjeWKoOi9veOAglxyXG4gICAgICog5Y+q5pyJ5b2TIFNwcml0ZSDnu4Tku7bopoHmuLLmn5Pov5nkupsgU3ByaXRlRnJhbWUg5pe277yM5omN5Lya5qOA5p+l6LS05Zu+5piv5ZCm5Yqg6L2944CC5aaC5p6c5L2g5biM5pyb5Yqg6L296L+H56iL5o+Q5YmN77yM5L2g5Y+v5Lul5omL5bel6LCD55So6L+Z5Liq5pa55rOV44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBlbnN1cmVMb2FkVGV4dHVyZVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGlmIChzcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkpIHtcclxuICAgICAqICAgICB0aGlzLl9vblNwcml0ZUZyYW1lTG9hZGVkKCk7XHJcbiAgICAgKiB9XHJcbiAgICAgKiBlbHNlIHtcclxuICAgICAqICAgICBzcHJpdGVGcmFtZS5vbmNlKCdsb2FkJywgdGhpcy5fb25TcHJpdGVGcmFtZUxvYWRlZCwgdGhpcyk7XHJcbiAgICAgKiAgICAgc3ByaXRlRnJhbWUuZW5zdXJlTG9hZFRleHR1cmUoKTtcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgZW5zdXJlTG9hZFRleHR1cmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RleHR1cmUubG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2FkIGV4aXN0cyB0ZXh0dXJlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoVGV4dHVyZSh0aGlzLl90ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZSh0aGlzLl90ZXh0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBJZiB5b3UgZG8gbm90IG5lZWQgdG8gdXNlIHRoZSBTcHJpdGVGcmFtZSB0ZW1wb3JhcmlseSwgeW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIHNvIHRoYXQgaXRzIHRleHR1cmUgY291bGQgYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuIFRoZW4gd2hlbiB5b3UgbmVlZCB0byByZW5kZXIgdGhlIFNwcml0ZUZyYW1lLCB5b3Ugc2hvdWxkIGNhbGwgYGVuc3VyZUxvYWRUZXh0dXJlYCBtYW51YWxseSB0byByZWxvYWQgdGV4dHVyZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOW9k+S9oOaaguaXtuS4jeWGjeS9v+eUqOi/meS4qiBTcHJpdGVGcmFtZSDml7bvvIzlj6/ku6XosIPnlKjov5nkuKrmlrnms5XmnaXkv53or4HlvJXnlKjnmoTotLTlm77lr7nosaHog73ooqsgR0PjgILnhLblkI7lvZPkvaDopoHmuLLmn5MgU3ByaXRlRnJhbWUg5pe277yM5L2g6ZyA6KaB5omL5Yqo6LCD55SoIGBlbnN1cmVMb2FkVGV4dHVyZWAg5p2l6YeN5paw5Yqg6L296LS05Zu+44CCXHJcbiAgICAgKiBAbWV0aG9kIGNsZWFyVGV4dHVyZVxyXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgMi4xXHJcbiAgICAgKi9cclxuXHJcbiAgICBfY2hlY2tSZWN0OiBmdW5jdGlvbiAodGV4dHVyZSkge1xyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5fcmVjdDtcclxuICAgICAgICBsZXQgbWF4WCA9IHJlY3QueCwgbWF4WSA9IHJlY3QueTtcclxuICAgICAgICBpZiAodGhpcy5fcm90YXRlZCkge1xyXG4gICAgICAgICAgICBtYXhYICs9IHJlY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICBtYXhZICs9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtYXhYICs9IHJlY3Qud2lkdGg7XHJcbiAgICAgICAgICAgIG1heFkgKz0gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXhYID4gdGV4dHVyZS53aWR0aCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDMzMDAsIHRleHR1cmUubmF0aXZlVXJsICsgJy8nICsgdGhpcy5uYW1lLCBtYXhYLCB0ZXh0dXJlLndpZHRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1heFkgPiB0ZXh0dXJlLmhlaWdodCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcklEKDM0MDAsIHRleHR1cmUubmF0aXZlVXJsICsgJy8nICsgdGhpcy5uYW1lLCBtYXhZLCB0ZXh0dXJlLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZmxpcFhZICh1dnMpIHtcclxuICAgICAgICBpZiAodGhpcy5fZmxpcFgpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBWYWwgPSB1dnNbMF07XHJcbiAgICAgICAgICAgIHV2c1swXSA9IHV2c1sxXTtcclxuICAgICAgICAgICAgdXZzWzFdID0gdGVtcFZhbDtcclxuXHJcbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dnNbMl07XHJcbiAgICAgICAgICAgIHV2c1syXSA9IHV2c1szXTtcclxuICAgICAgICAgICAgdXZzWzNdID0gdGVtcFZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mbGlwWSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcFZhbCA9IHV2c1swXTtcclxuICAgICAgICAgICAgdXZzWzBdID0gdXZzWzJdO1xyXG4gICAgICAgICAgICB1dnNbMl0gPSB0ZW1wVmFsO1xyXG5cclxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2c1sxXTtcclxuICAgICAgICAgICAgdXZzWzFdID0gdXZzWzNdO1xyXG4gICAgICAgICAgICB1dnNbM10gPSB0ZW1wVmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2NhbGN1bGF0ZVNsaWNlZFVWICgpIHtcclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX3JlY3Q7XHJcbiAgICAgICAgbGV0IGF0bGFzV2lkdGggPSB0aGlzLl90ZXh0dXJlLndpZHRoO1xyXG4gICAgICAgIGxldCBhdGxhc0hlaWdodCA9IHRoaXMuX3RleHR1cmUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCBsZWZ0V2lkdGggPSB0aGlzLl9jYXBJbnNldHNbSU5TRVRfTEVGVF07XHJcbiAgICAgICAgbGV0IHJpZ2h0V2lkdGggPSB0aGlzLl9jYXBJbnNldHNbSU5TRVRfUklHSFRdO1xyXG4gICAgICAgIGxldCBjZW50ZXJXaWR0aCA9IHJlY3Qud2lkdGggLSBsZWZ0V2lkdGggLSByaWdodFdpZHRoO1xyXG4gICAgICAgIGxldCB0b3BIZWlnaHQgPSB0aGlzLl9jYXBJbnNldHNbSU5TRVRfVE9QXTtcclxuICAgICAgICBsZXQgYm90dG9tSGVpZ2h0ID0gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV07XHJcbiAgICAgICAgbGV0IGNlbnRlckhlaWdodCA9IHJlY3QuaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gYm90dG9tSGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgdXZTbGljZWQgPSB0aGlzLnV2U2xpY2VkO1xyXG4gICAgICAgIHV2U2xpY2VkLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0ZWQpIHtcclxuICAgICAgICAgICAgdGVtcF91dnNbMF0udSA9IChyZWN0LngpIC8gYXRsYXNXaWR0aDtcclxuICAgICAgICAgICAgdGVtcF91dnNbMV0udSA9IChyZWN0LnggKyBib3R0b21IZWlnaHQpIC8gYXRsYXNXaWR0aDtcclxuICAgICAgICAgICAgdGVtcF91dnNbMl0udSA9IChyZWN0LnggKyBib3R0b21IZWlnaHQgKyBjZW50ZXJIZWlnaHQpIC8gYXRsYXNXaWR0aDtcclxuICAgICAgICAgICAgdGVtcF91dnNbM10udSA9IChyZWN0LnggKyByZWN0LmhlaWdodCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1szXS52ID0gKHJlY3QueSkgLyBhdGxhc0hlaWdodDtcclxuICAgICAgICAgICAgdGVtcF91dnNbMl0udiA9IChyZWN0LnkgKyBsZWZ0V2lkdGgpIC8gYXRsYXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRlbXBfdXZzWzFdLnYgPSAocmVjdC55ICsgbGVmdFdpZHRoICsgY2VudGVyV2lkdGgpIC8gYXRsYXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRlbXBfdXZzWzBdLnYgPSAocmVjdC55ICsgcmVjdC53aWR0aCkgLyBhdGxhc0hlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ZsaXBYWSh0ZW1wX3V2cyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA0OyArK3Jvdykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvd0QgPSB0ZW1wX3V2c1tyb3ddO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNDsgKytjb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sRCA9IHRlbXBfdXZzWzMgLSBjb2xdO1xyXG4gICAgICAgICAgICAgICAgICAgIHV2U2xpY2VkLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1OiByb3dELnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHY6IGNvbEQudlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1swXS51ID0gKHJlY3QueCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1sxXS51ID0gKHJlY3QueCArIGxlZnRXaWR0aCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1syXS51ID0gKHJlY3QueCArIGxlZnRXaWR0aCArIGNlbnRlcldpZHRoKSAvIGF0bGFzV2lkdGg7XHJcbiAgICAgICAgICAgIHRlbXBfdXZzWzNdLnUgPSAocmVjdC54ICsgcmVjdC53aWR0aCkgLyBhdGxhc1dpZHRoO1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1szXS52ID0gKHJlY3QueSkgLyBhdGxhc0hlaWdodDtcclxuICAgICAgICAgICAgdGVtcF91dnNbMl0udiA9IChyZWN0LnkgKyB0b3BIZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRlbXBfdXZzWzFdLnYgPSAocmVjdC55ICsgdG9wSGVpZ2h0ICsgY2VudGVySGVpZ2h0KSAvIGF0bGFzSGVpZ2h0O1xyXG4gICAgICAgICAgICB0ZW1wX3V2c1swXS52ID0gKHJlY3QueSArIHJlY3QuaGVpZ2h0KSAvIGF0bGFzSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmxpcFhZKHRlbXBfdXZzKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDQ7ICsrcm93KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm93RCA9IHRlbXBfdXZzW3Jvd107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCA0OyArK2NvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xEID0gdGVtcF91dnNbY29sXTtcclxuICAgICAgICAgICAgICAgICAgICB1dlNsaWNlZC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdTogY29sRC51LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiByb3dELnZcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3NldER5bmFtaWNBdGxhc0ZyYW1lIChmcmFtZSkge1xyXG4gICAgICAgIGlmICghZnJhbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwgPSB7XHJcbiAgICAgICAgICAgIF90ZXh0dXJlIDogdGhpcy5fdGV4dHVyZSxcclxuICAgICAgICAgICAgX3ggOiB0aGlzLl9yZWN0LngsXHJcbiAgICAgICAgICAgIF95IDogdGhpcy5fcmVjdC55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSBmcmFtZS50ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMuX3JlY3QueCA9IGZyYW1lLng7XHJcbiAgICAgICAgdGhpcy5fcmVjdC55ID0gZnJhbWUueTtcclxuICAgICAgICB0aGlzLl9jYWxjdWxhdGVVVigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcmVzZXREeW5hbWljQXRsYXNGcmFtZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3JlY3QueCA9IHRoaXMuX29yaWdpbmFsLl94O1xyXG4gICAgICAgIHRoaXMuX3JlY3QueSA9IHRoaXMuX29yaWdpbmFsLl95O1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0aGlzLl9vcmlnaW5hbC5fdGV4dHVyZTtcclxuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NhbGN1bGF0ZVVWICgpIHtcclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX3JlY3QsXHJcbiAgICAgICAgICAgIHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlLFxyXG4gICAgICAgICAgICB1diA9IHRoaXMudXYsXHJcbiAgICAgICAgICAgIHRleHcgPSB0ZXh0dXJlLndpZHRoLFxyXG4gICAgICAgICAgICB0ZXhoID0gdGV4dHVyZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBsID0gdGV4dyA9PT0gMCA/IDAgOiByZWN0LnggLyB0ZXh3O1xyXG4gICAgICAgICAgICBsZXQgciA9IHRleHcgPT09IDAgPyAwIDogKHJlY3QueCArIHJlY3QuaGVpZ2h0KSAvIHRleHc7XHJcbiAgICAgICAgICAgIGxldCBiID0gdGV4aCA9PT0gMCA/IDAgOiAocmVjdC55ICsgcmVjdC53aWR0aCkgLyB0ZXhoO1xyXG4gICAgICAgICAgICBsZXQgdCA9IHRleGggPT09IDAgPyAwIDogcmVjdC55IC8gdGV4aDtcclxuICAgICAgICAgICAgdXZbMF0gPSBsO1xyXG4gICAgICAgICAgICB1dlsxXSA9IHQ7XHJcbiAgICAgICAgICAgIHV2WzJdID0gbDtcclxuICAgICAgICAgICAgdXZbM10gPSBiO1xyXG4gICAgICAgICAgICB1dls0XSA9IHI7XHJcbiAgICAgICAgICAgIHV2WzVdID0gdDtcclxuICAgICAgICAgICAgdXZbNl0gPSByO1xyXG4gICAgICAgICAgICB1dls3XSA9IGI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbCA9IHRleHcgPT09IDAgPyAwIDogcmVjdC54IC8gdGV4dztcclxuICAgICAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LndpZHRoKSAvIHRleHc7XHJcbiAgICAgICAgICAgIGxldCBiID0gdGV4aCA9PT0gMCA/IDAgOiAocmVjdC55ICsgcmVjdC5oZWlnaHQpIC8gdGV4aDtcclxuICAgICAgICAgICAgbGV0IHQgPSB0ZXhoID09PSAwID8gMCA6IHJlY3QueSAvIHRleGg7XHJcbiAgICAgICAgICAgIHV2WzBdID0gbDtcclxuICAgICAgICAgICAgdXZbMV0gPSBiO1xyXG4gICAgICAgICAgICB1dlsyXSA9IHI7XHJcbiAgICAgICAgICAgIHV2WzNdID0gYjtcclxuICAgICAgICAgICAgdXZbNF0gPSBsO1xyXG4gICAgICAgICAgICB1dls1XSA9IHQ7XHJcbiAgICAgICAgICAgIHV2WzZdID0gcjtcclxuICAgICAgICAgICAgdXZbN10gPSB0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2ZsaXBYKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZbMF07XHJcbiAgICAgICAgICAgIHV2WzBdID0gdXZbMl07XHJcbiAgICAgICAgICAgIHV2WzJdID0gdGVtcFZhbDtcclxuXHJcbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dlsxXTtcclxuICAgICAgICAgICAgdXZbMV0gPSB1dlszXTtcclxuICAgICAgICAgICAgdXZbM10gPSB0ZW1wVmFsO1xyXG5cclxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2WzRdO1xyXG4gICAgICAgICAgICB1dls0XSA9IHV2WzZdO1xyXG4gICAgICAgICAgICB1dls2XSA9IHRlbXBWYWw7XHJcblxyXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbNV07XHJcbiAgICAgICAgICAgIHV2WzVdID0gdXZbN107XHJcbiAgICAgICAgICAgIHV2WzddID0gdGVtcFZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9mbGlwWSkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcFZhbCA9IHV2WzBdO1xyXG4gICAgICAgICAgICB1dlswXSA9IHV2WzRdO1xyXG4gICAgICAgICAgICB1dls0XSA9IHRlbXBWYWw7XHJcblxyXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbMV07XHJcbiAgICAgICAgICAgIHV2WzFdID0gdXZbNV07XHJcbiAgICAgICAgICAgIHV2WzVdID0gdGVtcFZhbDtcclxuXHJcbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dlsyXTtcclxuICAgICAgICAgICAgdXZbMl0gPSB1dls2XTtcclxuICAgICAgICAgICAgdXZbNl0gPSB0ZW1wVmFsO1xyXG5cclxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2WzNdO1xyXG4gICAgICAgICAgICB1dlszXSA9IHV2WzddO1xyXG4gICAgICAgICAgICB1dls3XSA9IHRlbXBWYWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmVydGljZXMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIGlmICh2ZXJ0aWNlcykge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5udS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcy5udi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRpY2VzLnUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZlcnRpY2VzLm51W2ldID0gdmVydGljZXMudVtpXS90ZXh3O1xyXG4gICAgICAgICAgICAgICAgdmVydGljZXMubnZbaV0gPSB2ZXJ0aWNlcy52W2ldL3RleGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFNFUklBTElaQVRJT05cclxuXHJcbiAgICBfc2VyaWFsaXplOiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpICYmIGZ1bmN0aW9uIChleHBvcnRpbmcsIGN0eCkge1xyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5fcmVjdDtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0O1xyXG4gICAgICAgIGxldCBzaXplID0gdGhpcy5fb3JpZ2luYWxTaXplO1xyXG4gICAgICAgIGxldCB1dWlkO1xyXG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZTtcclxuICAgICAgICBpZiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICB1dWlkID0gdGV4dHVyZS5fdXVpZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF1dWlkKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLl90ZXh0dXJlRmlsZW5hbWU7XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHV1aWQgPSBFZGl0b3IuVXRpbHMuVXVpZENhY2hlLnVybFRvVXVpZCh1cmwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1dWlkICYmIGV4cG9ydGluZykge1xyXG4gICAgICAgICAgICB1dWlkID0gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5jb21wcmVzc1V1aWQodXVpZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0eC5kZXBlbmRzT24oJ190ZXh0dXJlU2V0dGVyJywgdXVpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmVydGljZXM7XHJcbiAgICAgICAgaWYgKHRoaXMudmVydGljZXMpIHtcclxuICAgICAgICAgICAgdmVydGljZXMgPSB7XHJcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXM6IHRoaXMudmVydGljZXMudHJpYW5nbGVzLFxyXG4gICAgICAgICAgICAgICAgeDogdGhpcy52ZXJ0aWNlcy54LFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy52ZXJ0aWNlcy55LFxyXG4gICAgICAgICAgICAgICAgdTogdGhpcy52ZXJ0aWNlcy51LFxyXG4gICAgICAgICAgICAgICAgdjogdGhpcy52ZXJ0aWNlcy52XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl9uYW1lLFxyXG4gICAgICAgICAgICB0ZXh0dXJlOiAoIWV4cG9ydGluZyAmJiB1dWlkKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGF0bGFzOiBleHBvcnRpbmcgPyB1bmRlZmluZWQgOiB0aGlzLl9hdGxhc1V1aWQsICAvLyBzdHJpcCBmcm9tIGpzb24gaWYgZXhwb3J0aW5nXHJcbiAgICAgICAgICAgIHJlY3Q6IHJlY3QgPyBbcmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0XSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQgPyBbb2Zmc2V0LngsIG9mZnNldC55XSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzaXplID8gW3NpemUud2lkdGgsIHNpemUuaGVpZ2h0XSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcm90YXRlZDogdGhpcy5fcm90YXRlZCA/IDEgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGNhcEluc2V0czogdGhpcy5fY2FwSW5zZXRzLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXNcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICBfZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChkYXRhLCBoYW5kbGUpIHtcclxuICAgICAgICBsZXQgcmVjdCA9IGRhdGEucmVjdDtcclxuICAgICAgICBpZiAocmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWN0ID0gbmV3IGNjLlJlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLm9mZnNldCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE9mZnNldChuZXcgY2MuVmVjMihkYXRhLm9mZnNldFswXSwgZGF0YS5vZmZzZXRbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEub3JpZ2luYWxTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0T3JpZ2luYWxTaXplKG5ldyBjYy5TaXplKGRhdGEub3JpZ2luYWxTaXplWzBdLCBkYXRhLm9yaWdpbmFsU2l6ZVsxXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yb3RhdGVkID0gZGF0YS5yb3RhdGVkID09PSAxO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XHJcblxyXG4gICAgICAgIGxldCBjYXBJbnNldHMgPSBkYXRhLmNhcEluc2V0cztcclxuICAgICAgICBpZiAoY2FwSW5zZXRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9MRUZUXSA9IGNhcEluc2V0c1tJTlNFVF9MRUZUXTtcclxuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF0gPSBjYXBJbnNldHNbSU5TRVRfVE9QXTtcclxuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1JJR0hUXSA9IGNhcEluc2V0c1tJTlNFVF9SSUdIVF07XHJcbiAgICAgICAgICAgIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9CT1RUT01dID0gY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0bGFzVXVpZCA9IGRhdGEuYXRsYXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gZGF0YS52ZXJ0aWNlcztcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWNlcykge1xyXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplIG5vcm1hbCB1diBhcnJheXNcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5udSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLm52ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUNDX0JVSUxEKSB7XHJcbiAgICAgICAgICAgIC8vIG1hbnVhbGx5IGxvYWQgdGV4dHVyZSB2aWEgX3RleHR1cmVTZXR0ZXJcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVVdWlkID0gZGF0YS50ZXh0dXJlO1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZVV1aWQpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZS5yZXN1bHQucHVzaCh0aGlzLCAnX3RleHR1cmVTZXR0ZXInLCB0ZXh0dXJlVXVpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubGV0IHByb3RvID0gU3ByaXRlRnJhbWUucHJvdG90eXBlO1xyXG5cclxucHJvdG8uY29weVdpdGhab25lID0gcHJvdG8uY2xvbmU7XHJcbnByb3RvLmNvcHkgPSBwcm90by5jbG9uZTtcclxucHJvdG8uaW5pdFdpdGhUZXh0dXJlID0gcHJvdG8uc2V0VGV4dHVyZTtcclxuXHJcbmNjLlNwcml0ZUZyYW1lID0gU3ByaXRlRnJhbWU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZUZyYW1lO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==