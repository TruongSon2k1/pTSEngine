
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/skeleton-cache.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var TrackEntryListeners = require('./track-entry-listeners');

var spine = require('./lib/spine'); // Permit max cache time, unit is second.


var MaxCacheTime = 30;
var FrameTime = 1 / 60;
var _vertices = [];
var _indices = [];
var _boneInfoOffset = 0;
var _vertexOffset = 0;
var _indexOffset = 0;
var _vfOffset = 0;
var _preTexUrl = null;
var _preBlendMode = null;
var _segVCount = 0;
var _segICount = 0;
var _segOffset = 0;
var _colorOffset = 0;
var _preFinalColor = null;
var _preDarkColor = null; // x y u v c1 c2

var _perVertexSize = 6; // x y u v r1 g1 b1 a1 r2 g2 b2 a2

var _perClipVertexSize = 12;
var _vfCount = 0,
    _indexCount = 0;

var _tempr, _tempg, _tempb, _tempa;

var _finalColor32, _darkColor32;

var _finalColor = new spine.Color(1, 1, 1, 1);

var _darkColor = new spine.Color(1, 1, 1, 1);

var _quadTriangles = [0, 1, 2, 2, 3, 0]; //Cache all frames in an animation

var AnimationCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._inited = false;
    this._invalid = true;
    this._enableCacheAttachedInfo = false;
    this.frames = [];
    this.totalTime = 0;
    this._frameIdx = -1;
    this.isCompleted = false;
    this._skeletonInfo = null;
    this._animationName = null;
    this._tempSegments = null;
    this._tempColors = null;
    this._tempBoneInfos = null;
  },
  init: function init(skeletonInfo, animationName) {
    this._inited = true;
    this._animationName = animationName;
    this._skeletonInfo = skeletonInfo;
  },
  // Clear texture quote.
  clear: function clear() {
    this._inited = false;

    for (var i = 0, n = this.frames.length; i < n; i++) {
      var frame = this.frames[i];
      frame.segments.length = 0;
    }

    this.invalidAllFrame();
  },
  bind: function bind(listener) {
    var completeHandle = function (entry) {
      if (entry && entry.animation.name === this._animationName) {
        this.isCompleted = true;
      }
    }.bind(this);

    listener.complete = completeHandle;
  },
  unbind: function unbind(listener) {
    listener.complete = null;
  },
  begin: function begin() {
    if (!this._invalid) return;
    var skeletonInfo = this._skeletonInfo;
    var preAnimationCache = skeletonInfo.curAnimationCache;

    if (preAnimationCache && preAnimationCache !== this) {
      if (this._privateMode) {
        // Private cache mode just invalid pre animation frame.
        preAnimationCache.invalidAllFrame();
      } else {
        // If pre animation not finished, play it to the end.
        preAnimationCache.updateToFrame();
      }
    }

    var skeleton = skeletonInfo.skeleton;
    var listener = skeletonInfo.listener;
    var state = skeletonInfo.state;
    var animation = skeleton.data.findAnimation(this._animationName);
    state.setAnimationWith(0, animation, false);
    this.bind(listener); // record cur animation cache

    skeletonInfo.curAnimationCache = this;
    this._frameIdx = -1;
    this.isCompleted = false;
    this.totalTime = 0;
    this._invalid = false;
  },
  end: function end() {
    if (!this._needToUpdate()) {
      // clear cur animation cache
      this._skeletonInfo.curAnimationCache = null;
      this.frames.length = this._frameIdx + 1;
      this.isCompleted = true;
      this.unbind(this._skeletonInfo.listener);
    }
  },
  _needToUpdate: function _needToUpdate(toFrameIdx) {
    return !this.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx == undefined || this._frameIdx < toFrameIdx);
  },
  updateToFrame: function updateToFrame(toFrameIdx) {
    if (!this._inited) return;
    this.begin();
    if (!this._needToUpdate(toFrameIdx)) return;
    var skeletonInfo = this._skeletonInfo;
    var skeleton = skeletonInfo.skeleton;
    var clipper = skeletonInfo.clipper;
    var state = skeletonInfo.state;

    do {
      // Solid update frame rate 1/60.
      skeleton.update(FrameTime);
      state.update(FrameTime);
      state.apply(skeleton);
      skeleton.updateWorldTransform();
      this._frameIdx++;

      this._updateFrame(skeleton, clipper, this._frameIdx);

      this.totalTime += FrameTime;
    } while (this._needToUpdate(toFrameIdx));

    this.end();
  },
  isInited: function isInited() {
    return this._inited;
  },
  isInvalid: function isInvalid() {
    return this._invalid;
  },
  invalidAllFrame: function invalidAllFrame() {
    this.isCompleted = false;
    this._invalid = true;
  },
  updateAllFrame: function updateAllFrame() {
    this.invalidAllFrame();
    this.updateToFrame();
  },
  enableCacheAttachedInfo: function enableCacheAttachedInfo() {
    if (!this._enableCacheAttachedInfo) {
      this._enableCacheAttachedInfo = true;
      this.invalidAllFrame();
    }
  },
  _updateFrame: function _updateFrame(skeleton, clipper, index) {
    _vfOffset = 0;
    _boneInfoOffset = 0;
    _indexOffset = 0;
    _vertexOffset = 0;
    _preTexUrl = null;
    _preBlendMode = null;
    _segVCount = 0;
    _segICount = 0;
    _segOffset = 0;
    _colorOffset = 0;
    _preFinalColor = null;
    _preDarkColor = null;
    this.frames[index] = this.frames[index] || {
      segments: [],
      colors: [],
      boneInfos: [],
      vertices: null,
      uintVert: null,
      indices: null
    };
    var frame = this.frames[index];
    var segments = this._tempSegments = frame.segments;
    var colors = this._tempColors = frame.colors;
    var boneInfos = this._tempBoneInfos = frame.boneInfos;

    this._traverseSkeleton(skeleton, clipper);

    if (_colorOffset > 0) {
      colors[_colorOffset - 1].vfOffset = _vfOffset;
    }

    colors.length = _colorOffset;
    boneInfos.length = _boneInfoOffset; // Handle pre segment.

    var preSegOffset = _segOffset - 1;

    if (preSegOffset >= 0) {
      // Judge segment vertex count is not empty.
      if (_segICount > 0) {
        var preSegInfo = segments[preSegOffset];
        preSegInfo.indexCount = _segICount;
        preSegInfo.vfCount = _segVCount * _perVertexSize;
        preSegInfo.vertexCount = _segVCount;
        segments.length = _segOffset;
      } else {
        // Discard pre segment.
        segments.length = _segOffset - 1;
      }
    } // Segments is empty,discard all segments.


    if (segments.length == 0) return; // Fill vertices

    var vertices = frame.vertices;
    var uintVert = frame.uintVert;

    if (!vertices || vertices.length < _vfOffset) {
      vertices = frame.vertices = new Float32Array(_vfOffset);
      uintVert = frame.uintVert = new Uint32Array(vertices.buffer);
    }

    for (var i = 0, j = 0; i < _vfOffset;) {
      vertices[i++] = _vertices[j++]; // x

      vertices[i++] = _vertices[j++]; // y

      vertices[i++] = _vertices[j++]; // u

      vertices[i++] = _vertices[j++]; // v

      uintVert[i++] = _vertices[j++]; // color1

      uintVert[i++] = _vertices[j++]; // color2
    } // Fill indices


    var indices = frame.indices;

    if (!indices || indices.length < _indexOffset) {
      indices = frame.indices = new Uint16Array(_indexOffset);
    }

    for (var _i = 0; _i < _indexOffset; _i++) {
      indices[_i] = _indices[_i];
    }

    frame.vertices = vertices;
    frame.uintVert = uintVert;
    frame.indices = indices;
  },
  fillVertices: function fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot) {
    _tempa = slotColor.a * attachmentColor.a * skeletonColor.a * 255;
    _tempr = attachmentColor.r * skeletonColor.r * 255;
    _tempg = attachmentColor.g * skeletonColor.g * 255;
    _tempb = attachmentColor.b * skeletonColor.b * 255;
    _finalColor.r = _tempr * slotColor.r;
    _finalColor.g = _tempg * slotColor.g;
    _finalColor.b = _tempb * slotColor.b;
    _finalColor.a = _tempa;

    if (slot.darkColor == null) {
      _darkColor.set(0.0, 0, 0, 1.0);
    } else {
      _darkColor.r = slot.darkColor.r * _tempr;
      _darkColor.g = slot.darkColor.g * _tempg;
      _darkColor.b = slot.darkColor.b * _tempb;
    }

    _darkColor.a = 0;
    _finalColor32 = (_finalColor.a << 24 >>> 0) + (_finalColor.b << 16) + (_finalColor.g << 8) + _finalColor.r;
    _darkColor32 = (_darkColor.a << 24 >>> 0) + (_darkColor.b << 16) + (_darkColor.g << 8) + _darkColor.r;

    if (_preFinalColor !== _finalColor32 || _preDarkColor !== _darkColor32) {
      var colors = this._tempColors;
      _preFinalColor = _finalColor32;
      _preDarkColor = _darkColor32;

      if (_colorOffset > 0) {
        colors[_colorOffset - 1].vfOffset = _vfOffset;
      }

      colors[_colorOffset++] = {
        fr: _finalColor.r,
        fg: _finalColor.g,
        fb: _finalColor.b,
        fa: _finalColor.a,
        dr: _darkColor.r,
        dg: _darkColor.g,
        db: _darkColor.b,
        da: _darkColor.a,
        vfOffset: 0
      };
    }

    if (!clipper.isClipping()) {
      for (var v = _vfOffset, n = _vfOffset + _vfCount; v < n; v += _perVertexSize) {
        _vertices[v + 4] = _finalColor32; // light color

        _vertices[v + 5] = _darkColor32; // dark color
      }
    } else {
      clipper.clipTriangles(_vertices, _vfCount, _indices, _indexCount, _vertices, _finalColor, _darkColor, true, _perVertexSize, _indexOffset, _vfOffset, _vfOffset + 2);
      var clippedVertices = clipper.clippedVertices;
      var clippedTriangles = clipper.clippedTriangles; // insure capacity

      _indexCount = clippedTriangles.length;
      _vfCount = clippedVertices.length / _perClipVertexSize * _perVertexSize; // fill indices

      for (var ii = 0, jj = _indexOffset, nn = clippedTriangles.length; ii < nn;) {
        _indices[jj++] = clippedTriangles[ii++];
      } // fill vertices contain x y u v light color dark color


      for (var _v = 0, _n = clippedVertices.length, offset = _vfOffset; _v < _n; _v += 12, offset += _perVertexSize) {
        _vertices[offset] = clippedVertices[_v]; // x

        _vertices[offset + 1] = clippedVertices[_v + 1]; // y

        _vertices[offset + 2] = clippedVertices[_v + 6]; // u

        _vertices[offset + 3] = clippedVertices[_v + 7]; // v

        _vertices[offset + 4] = _finalColor32;
        _vertices[offset + 5] = _darkColor32;
      }
    }
  },
  _traverseSkeleton: function _traverseSkeleton(skeleton, clipper) {
    var segments = this._tempSegments;
    var boneInfos = this._tempBoneInfos;
    var skeletonColor = skeleton.color;
    var attachment, attachmentColor, slotColor, uvs, triangles;
    var isRegion, isMesh, isClip;
    var texture;
    var preSegOffset, preSegInfo;
    var blendMode;
    var slot;
    var bones = skeleton.bones;

    if (this._enableCacheAttachedInfo) {
      for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
        var bone = bones[i];
        var boneInfo = boneInfos[_boneInfoOffset];

        if (!boneInfo) {
          boneInfo = boneInfos[_boneInfoOffset] = {};
        }

        boneInfo.a = bone.a;
        boneInfo.b = bone.b;
        boneInfo.c = bone.c;
        boneInfo.d = bone.d;
        boneInfo.worldX = bone.worldX;
        boneInfo.worldY = bone.worldY;
      }
    }

    for (var slotIdx = 0, slotCount = skeleton.drawOrder.length; slotIdx < slotCount; slotIdx++) {
      slot = skeleton.drawOrder[slotIdx];
      _vfCount = 0;
      _indexCount = 0;
      attachment = slot.getAttachment();

      if (!attachment) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      isRegion = attachment instanceof spine.RegionAttachment;
      isMesh = attachment instanceof spine.MeshAttachment;
      isClip = attachment instanceof spine.ClippingAttachment;

      if (isClip) {
        clipper.clipStart(slot, attachment);
        continue;
      }

      if (!isRegion && !isMesh) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      texture = attachment.region.texture._texture;

      if (!texture) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      blendMode = slot.data.blendMode;

      if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== blendMode) {
        _preTexUrl = texture.nativeUrl;
        _preBlendMode = blendMode; // Handle pre segment.

        preSegOffset = _segOffset - 1;

        if (preSegOffset >= 0) {
          if (_segICount > 0) {
            preSegInfo = segments[preSegOffset];
            preSegInfo.indexCount = _segICount;
            preSegInfo.vertexCount = _segVCount;
            preSegInfo.vfCount = _segVCount * _perVertexSize;
          } else {
            // Discard pre segment.
            _segOffset--;
          }
        } // Handle now segment.


        segments[_segOffset] = {
          tex: texture,
          blendMode: blendMode,
          indexCount: 0,
          vertexCount: 0,
          vfCount: 0
        };
        _segOffset++;
        _segICount = 0;
        _segVCount = 0;
      }

      if (isRegion) {
        triangles = _quadTriangles; // insure capacity

        _vfCount = 4 * _perVertexSize;
        _indexCount = 6; // compute vertex and fill x y

        attachment.computeWorldVertices(slot.bone, _vertices, _vfOffset, _perVertexSize);
      } else if (isMesh) {
        triangles = attachment.triangles; // insure capacity

        _vfCount = (attachment.worldVerticesLength >> 1) * _perVertexSize;
        _indexCount = triangles.length; // compute vertex and fill x y

        attachment.computeWorldVertices(slot, 0, attachment.worldVerticesLength, _vertices, _vfOffset, _perVertexSize);
      }

      if (_vfCount == 0 || _indexCount == 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      } // fill indices


      for (var ii = 0, jj = _indexOffset, nn = triangles.length; ii < nn;) {
        _indices[jj++] = triangles[ii++];
      } // fill u v


      uvs = attachment.uvs;

      for (var v = _vfOffset, n = _vfOffset + _vfCount, u = 0; v < n; v += _perVertexSize, u += 2) {
        _vertices[v + 2] = uvs[u]; // u

        _vertices[v + 3] = uvs[u + 1]; // v
      }

      attachmentColor = attachment.color;
      slotColor = slot.color;
      this.fillVertices(skeletonColor, attachmentColor, slotColor, clipper, slot);

      if (_indexCount > 0) {
        for (var _ii = _indexOffset, _nn = _indexOffset + _indexCount; _ii < _nn; _ii++) {
          _indices[_ii] += _segVCount;
        }

        _indexOffset += _indexCount;
        _vfOffset += _vfCount;
        _vertexOffset = _vfOffset / _perVertexSize;
        _segICount += _indexCount;
        _segVCount += _vfCount / _perVertexSize;
      }

      clipper.clipEndWithSlot(slot);
    }

    clipper.clipEnd();
  }
});
var SkeletonCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._animationPool = {};
    this._skeletonCache = {};
  },
  enablePrivateMode: function enablePrivateMode() {
    this._privateMode = true;
  },
  clear: function clear() {
    this._animationPool = {};
    this._skeletonCache = {};
  },
  removeSkeleton: function removeSkeleton(uuid) {
    var skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return;
    var animationsCache = skeletonInfo.animationsCache;

    for (var aniKey in animationsCache) {
      // Clear cache texture, and put cache into pool.
      // No need to create TypedArray next time.
      var animationCache = animationsCache[aniKey];
      if (!animationCache) continue;
      this._animationPool[uuid + "#" + aniKey] = animationCache;
      animationCache.clear();
    }

    delete this._skeletonCache[uuid];
  },
  getSkeletonCache: function getSkeletonCache(uuid, skeletonData) {
    var skeletonInfo = this._skeletonCache[uuid];

    if (!skeletonInfo) {
      var skeleton = new spine.Skeleton(skeletonData);
      var clipper = new spine.SkeletonClipping();
      var stateData = new spine.AnimationStateData(skeleton.data);
      var state = new spine.AnimationState(stateData);
      var listener = new TrackEntryListeners();
      state.addListener(listener);
      this._skeletonCache[uuid] = skeletonInfo = {
        skeleton: skeleton,
        clipper: clipper,
        state: state,
        listener: listener,
        // Cache all kinds of animation frame.
        // When skeleton is dispose, clear all animation cache.
        animationsCache: {},
        curAnimationCache: null
      };
    }

    return skeletonInfo;
  },
  getAnimationCache: function getAnimationCache(uuid, animationName) {
    var skeletonInfo = this._skeletonCache[uuid];
    if (!skeletonInfo) return null;
    var animationsCache = skeletonInfo.animationsCache;
    return animationsCache[animationName];
  },
  invalidAnimationCache: function invalidAnimationCache(uuid) {
    var skeletonInfo = this._skeletonCache[uuid];
    var skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return;
    var animationsCache = skeletonInfo.animationsCache;

    for (var aniKey in animationsCache) {
      var animationCache = animationsCache[aniKey];
      animationCache.invalidAllFrame();
    }
  },
  initAnimationCache: function initAnimationCache(uuid, animationName) {
    if (!animationName) return null;
    var skeletonInfo = this._skeletonCache[uuid];
    var skeleton = skeletonInfo && skeletonInfo.skeleton;
    if (!skeleton) return null;
    var animation = skeleton.data.findAnimation(animationName);

    if (!animation) {
      return null;
    }

    var animationsCache = skeletonInfo.animationsCache;
    var animationCache = animationsCache[animationName];

    if (!animationCache) {
      // If cache exist in pool, then just use it.
      var poolKey = uuid + "#" + animationName;
      animationCache = this._animationPool[poolKey];

      if (animationCache) {
        delete this._animationPool[poolKey];
      } else {
        animationCache = new AnimationCache();
        animationCache._privateMode = this._privateMode;
      }

      animationCache.init(skeletonInfo, animationName);
      animationsCache[animationName] = animationCache;
    }

    return animationCache;
  },
  updateAnimationCache: function updateAnimationCache(uuid, animationName) {
    if (animationName) {
      var animationCache = this.initAnimationCache(uuid, animationName);
      if (!animationCache) return null;
      animationCache.updateAllFrame();
    } else {
      var skeletonInfo = this._skeletonCache[uuid];
      var skeleton = skeletonInfo && skeletonInfo.skeleton;
      if (!skeleton) return;
      var animationsCache = skeletonInfo.animationsCache;

      for (var aniKey in animationsCache) {
        var _animationCache = animationsCache[aniKey];

        _animationCache.updateAllFrame();
      }
    }
  }
});
SkeletonCache.FrameTime = FrameTime;
SkeletonCache.sharedCache = new SkeletonCache();
module.exports = SkeletonCache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxza2VsZXRvbi1jYWNoZS5qcyJdLCJuYW1lcyI6WyJUcmFja0VudHJ5TGlzdGVuZXJzIiwicmVxdWlyZSIsInNwaW5lIiwiTWF4Q2FjaGVUaW1lIiwiRnJhbWVUaW1lIiwiX3ZlcnRpY2VzIiwiX2luZGljZXMiLCJfYm9uZUluZm9PZmZzZXQiLCJfdmVydGV4T2Zmc2V0IiwiX2luZGV4T2Zmc2V0IiwiX3ZmT2Zmc2V0IiwiX3ByZVRleFVybCIsIl9wcmVCbGVuZE1vZGUiLCJfc2VnVkNvdW50IiwiX3NlZ0lDb3VudCIsIl9zZWdPZmZzZXQiLCJfY29sb3JPZmZzZXQiLCJfcHJlRmluYWxDb2xvciIsIl9wcmVEYXJrQ29sb3IiLCJfcGVyVmVydGV4U2l6ZSIsIl9wZXJDbGlwVmVydGV4U2l6ZSIsIl92ZkNvdW50IiwiX2luZGV4Q291bnQiLCJfdGVtcHIiLCJfdGVtcGciLCJfdGVtcGIiLCJfdGVtcGEiLCJfZmluYWxDb2xvcjMyIiwiX2RhcmtDb2xvcjMyIiwiX2ZpbmFsQ29sb3IiLCJDb2xvciIsIl9kYXJrQ29sb3IiLCJfcXVhZFRyaWFuZ2xlcyIsIkFuaW1hdGlvbkNhY2hlIiwiY2MiLCJDbGFzcyIsImN0b3IiLCJfcHJpdmF0ZU1vZGUiLCJfaW5pdGVkIiwiX2ludmFsaWQiLCJfZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJmcmFtZXMiLCJ0b3RhbFRpbWUiLCJfZnJhbWVJZHgiLCJpc0NvbXBsZXRlZCIsIl9za2VsZXRvbkluZm8iLCJfYW5pbWF0aW9uTmFtZSIsIl90ZW1wU2VnbWVudHMiLCJfdGVtcENvbG9ycyIsIl90ZW1wQm9uZUluZm9zIiwiaW5pdCIsInNrZWxldG9uSW5mbyIsImFuaW1hdGlvbk5hbWUiLCJjbGVhciIsImkiLCJuIiwibGVuZ3RoIiwiZnJhbWUiLCJzZWdtZW50cyIsImludmFsaWRBbGxGcmFtZSIsImJpbmQiLCJsaXN0ZW5lciIsImNvbXBsZXRlSGFuZGxlIiwiZW50cnkiLCJhbmltYXRpb24iLCJuYW1lIiwiY29tcGxldGUiLCJ1bmJpbmQiLCJiZWdpbiIsInByZUFuaW1hdGlvbkNhY2hlIiwiY3VyQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVUb0ZyYW1lIiwic2tlbGV0b24iLCJzdGF0ZSIsImRhdGEiLCJmaW5kQW5pbWF0aW9uIiwic2V0QW5pbWF0aW9uV2l0aCIsImVuZCIsIl9uZWVkVG9VcGRhdGUiLCJ0b0ZyYW1lSWR4IiwidW5kZWZpbmVkIiwiY2xpcHBlciIsInVwZGF0ZSIsImFwcGx5IiwidXBkYXRlV29ybGRUcmFuc2Zvcm0iLCJfdXBkYXRlRnJhbWUiLCJpc0luaXRlZCIsImlzSW52YWxpZCIsInVwZGF0ZUFsbEZyYW1lIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJpbmRleCIsImNvbG9ycyIsImJvbmVJbmZvcyIsInZlcnRpY2VzIiwidWludFZlcnQiLCJpbmRpY2VzIiwiX3RyYXZlcnNlU2tlbGV0b24iLCJ2Zk9mZnNldCIsInByZVNlZ09mZnNldCIsInByZVNlZ0luZm8iLCJpbmRleENvdW50IiwidmZDb3VudCIsInZlcnRleENvdW50IiwiRmxvYXQzMkFycmF5IiwiVWludDMyQXJyYXkiLCJidWZmZXIiLCJqIiwiVWludDE2QXJyYXkiLCJmaWxsVmVydGljZXMiLCJza2VsZXRvbkNvbG9yIiwiYXR0YWNobWVudENvbG9yIiwic2xvdENvbG9yIiwic2xvdCIsImEiLCJyIiwiZyIsImIiLCJkYXJrQ29sb3IiLCJzZXQiLCJmciIsImZnIiwiZmIiLCJmYSIsImRyIiwiZGciLCJkYiIsImRhIiwiaXNDbGlwcGluZyIsInYiLCJjbGlwVHJpYW5nbGVzIiwiY2xpcHBlZFZlcnRpY2VzIiwiY2xpcHBlZFRyaWFuZ2xlcyIsImlpIiwiamoiLCJubiIsIm9mZnNldCIsImNvbG9yIiwiYXR0YWNobWVudCIsInV2cyIsInRyaWFuZ2xlcyIsImlzUmVnaW9uIiwiaXNNZXNoIiwiaXNDbGlwIiwidGV4dHVyZSIsImJsZW5kTW9kZSIsImJvbmVzIiwibCIsImJvbmUiLCJib25lSW5mbyIsImMiLCJkIiwid29ybGRYIiwid29ybGRZIiwic2xvdElkeCIsInNsb3RDb3VudCIsImRyYXdPcmRlciIsImdldEF0dGFjaG1lbnQiLCJjbGlwRW5kV2l0aFNsb3QiLCJSZWdpb25BdHRhY2htZW50IiwiTWVzaEF0dGFjaG1lbnQiLCJDbGlwcGluZ0F0dGFjaG1lbnQiLCJjbGlwU3RhcnQiLCJyZWdpb24iLCJfdGV4dHVyZSIsIm5hdGl2ZVVybCIsInRleCIsImNvbXB1dGVXb3JsZFZlcnRpY2VzIiwid29ybGRWZXJ0aWNlc0xlbmd0aCIsInUiLCJjbGlwRW5kIiwiU2tlbGV0b25DYWNoZSIsIl9hbmltYXRpb25Qb29sIiwiX3NrZWxldG9uQ2FjaGUiLCJlbmFibGVQcml2YXRlTW9kZSIsInJlbW92ZVNrZWxldG9uIiwidXVpZCIsImFuaW1hdGlvbnNDYWNoZSIsImFuaUtleSIsImFuaW1hdGlvbkNhY2hlIiwiZ2V0U2tlbGV0b25DYWNoZSIsInNrZWxldG9uRGF0YSIsIlNrZWxldG9uIiwiU2tlbGV0b25DbGlwcGluZyIsInN0YXRlRGF0YSIsIkFuaW1hdGlvblN0YXRlRGF0YSIsIkFuaW1hdGlvblN0YXRlIiwiYWRkTGlzdGVuZXIiLCJnZXRBbmltYXRpb25DYWNoZSIsImludmFsaWRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsInBvb2xLZXkiLCJ1cGRhdGVBbmltYXRpb25DYWNoZSIsInNoYXJlZENhY2hlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBbkM7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsYUFB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QWEsQ0FBQ3RLLFNBQWQsR0FBMEJBLFNBQTFCO0FBQ0FzSyxhQUFhLENBQUNzQixXQUFkLEdBQTRCLElBQUl0QixhQUFKLEVBQTVCO0FBQ0F1QixNQUFNLENBQUNDLE9BQVAsR0FBaUJ4QixhQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY29uc3QgVHJhY2tFbnRyeUxpc3RlbmVycyA9IHJlcXVpcmUoJy4vdHJhY2stZW50cnktbGlzdGVuZXJzJyk7XHJcbmNvbnN0IHNwaW5lID0gcmVxdWlyZSgnLi9saWIvc3BpbmUnKTtcclxuLy8gUGVybWl0IG1heCBjYWNoZSB0aW1lLCB1bml0IGlzIHNlY29uZC5cclxuY29uc3QgTWF4Q2FjaGVUaW1lID0gMzA7XHJcbmNvbnN0IEZyYW1lVGltZSA9IDEgLyA2MDtcclxuXHJcbmxldCBfdmVydGljZXMgPSBbXTtcclxubGV0IF9pbmRpY2VzID0gW107XHJcbmxldCBfYm9uZUluZm9PZmZzZXQgPSAwO1xyXG5sZXQgX3ZlcnRleE9mZnNldCA9IDA7XHJcbmxldCBfaW5kZXhPZmZzZXQgPSAwO1xyXG5sZXQgX3ZmT2Zmc2V0ID0gMDtcclxubGV0IF9wcmVUZXhVcmwgPSBudWxsO1xyXG5sZXQgX3ByZUJsZW5kTW9kZSA9IG51bGw7XHJcbmxldCBfc2VnVkNvdW50ID0gMDtcclxubGV0IF9zZWdJQ291bnQgPSAwO1xyXG5sZXQgX3NlZ09mZnNldCA9IDA7XHJcbmxldCBfY29sb3JPZmZzZXQgPSAwO1xyXG5sZXQgX3ByZUZpbmFsQ29sb3IgPSBudWxsO1xyXG5sZXQgX3ByZURhcmtDb2xvciA9IG51bGw7XHJcbi8vIHggeSB1IHYgYzEgYzJcclxubGV0IF9wZXJWZXJ0ZXhTaXplID0gNjtcclxuLy8geCB5IHUgdiByMSBnMSBiMSBhMSByMiBnMiBiMiBhMlxyXG5sZXQgX3BlckNsaXBWZXJ0ZXhTaXplID0gMTI7XHJcbmxldCBfdmZDb3VudCA9IDAsIF9pbmRleENvdW50ID0gMDtcclxubGV0IF90ZW1wciwgX3RlbXBnLCBfdGVtcGIsIF90ZW1wYTtcclxubGV0IF9maW5hbENvbG9yMzIsIF9kYXJrQ29sb3IzMjtcclxubGV0IF9maW5hbENvbG9yID0gbmV3IHNwaW5lLkNvbG9yKDEsIDEsIDEsIDEpO1xyXG5sZXQgX2RhcmtDb2xvciA9IG5ldyBzcGluZS5Db2xvcigxLCAxLCAxLCAxKTtcclxubGV0IF9xdWFkVHJpYW5nbGVzID0gWzAsIDEsIDIsIDIsIDMsIDBdO1xyXG5cclxuLy9DYWNoZSBhbGwgZnJhbWVzIGluIGFuIGFuaW1hdGlvblxyXG5sZXQgQW5pbWF0aW9uQ2FjaGUgPSBjYy5DbGFzcyh7XHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9wcml2YXRlTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ludmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVJZHggPSAtMTtcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uSW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdGVtcFNlZ21lbnRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90ZW1wQ29sb3JzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90ZW1wQm9uZUluZm9zID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCAoc2tlbGV0b25JbmZvLCBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25OYW1lID0gYW5pbWF0aW9uTmFtZTtcclxuICAgICAgICB0aGlzLl9za2VsZXRvbkluZm8gPSBza2VsZXRvbkluZm87XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENsZWFyIHRleHR1cmUgcXVvdGUuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmZyYW1lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbaV07XHJcbiAgICAgICAgICAgIGZyYW1lLnNlZ21lbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJpbmQgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgbGV0IGNvbXBsZXRlSGFuZGxlID0gZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeSAmJiBlbnRyeS5hbmltYXRpb24ubmFtZSA9PT0gdGhpcy5fYW5pbWF0aW9uTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGxpc3RlbmVyLmNvbXBsZXRlID0gY29tcGxldGVIYW5kbGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVuYmluZCAobGlzdGVuZXIpIHtcclxuICAgICAgICBsaXN0ZW5lci5jb21wbGV0ZSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGJlZ2luICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ludmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHNrZWxldG9uSW5mbyA9IHRoaXMuX3NrZWxldG9uSW5mbztcclxuICAgICAgICBsZXQgcHJlQW5pbWF0aW9uQ2FjaGUgPSBza2VsZXRvbkluZm8uY3VyQW5pbWF0aW9uQ2FjaGU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHByZUFuaW1hdGlvbkNhY2hlICYmIHByZUFuaW1hdGlvbkNhY2hlICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcml2YXRlTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUHJpdmF0ZSBjYWNoZSBtb2RlIGp1c3QgaW52YWxpZCBwcmUgYW5pbWF0aW9uIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgcHJlQW5pbWF0aW9uQ2FjaGUuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBwcmUgYW5pbWF0aW9uIG5vdCBmaW5pc2hlZCwgcGxheSBpdCB0byB0aGUgZW5kLlxyXG4gICAgICAgICAgICAgICAgcHJlQW5pbWF0aW9uQ2FjaGUudXBkYXRlVG9GcmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkluZm8uc2tlbGV0b247XHJcbiAgICAgICAgbGV0IGxpc3RlbmVyID0gc2tlbGV0b25JbmZvLmxpc3RlbmVyO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHNrZWxldG9uSW5mby5zdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHNrZWxldG9uLmRhdGEuZmluZEFuaW1hdGlvbih0aGlzLl9hbmltYXRpb25OYW1lKTtcclxuICAgICAgICBzdGF0ZS5zZXRBbmltYXRpb25XaXRoKDAsIGFuaW1hdGlvbiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuYmluZChsaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIC8vIHJlY29yZCBjdXIgYW5pbWF0aW9uIGNhY2hlXHJcbiAgICAgICAgc2tlbGV0b25JbmZvLmN1ckFuaW1hdGlvbkNhY2hlID0gdGhpcztcclxuICAgICAgICB0aGlzLl9mcmFtZUlkeCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5faW52YWxpZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmQgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmVlZFRvVXBkYXRlKCkpIHtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY3VyIGFuaW1hdGlvbiBjYWNoZVxyXG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbkluZm8uY3VyQW5pbWF0aW9uQ2FjaGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lcy5sZW5ndGggPSB0aGlzLl9mcmFtZUlkeCArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9za2VsZXRvbkluZm8ubGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX25lZWRUb1VwZGF0ZSAodG9GcmFtZUlkeCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc0NvbXBsZXRlZCAmJiBcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxUaW1lIDwgTWF4Q2FjaGVUaW1lICYmIFxyXG4gICAgICAgICAgICAgICAgKHRvRnJhbWVJZHggPT0gdW5kZWZpbmVkIHx8IHRoaXMuX2ZyYW1lSWR4IDwgdG9GcmFtZUlkeCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZVRvRnJhbWUgKHRvRnJhbWVJZHgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmJlZ2luKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fbmVlZFRvVXBkYXRlKHRvRnJhbWVJZHgpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkluZm87XHJcbiAgICAgICAgbGV0IHNrZWxldG9uID0gc2tlbGV0b25JbmZvLnNrZWxldG9uO1xyXG4gICAgICAgIGxldCBjbGlwcGVyID0gc2tlbGV0b25JbmZvLmNsaXBwZXI7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gc2tlbGV0b25JbmZvLnN0YXRlO1xyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIC8vIFNvbGlkIHVwZGF0ZSBmcmFtZSByYXRlIDEvNjAuXHJcbiAgICAgICAgICAgIHNrZWxldG9uLnVwZGF0ZShGcmFtZVRpbWUpO1xyXG4gICAgICAgICAgICBzdGF0ZS51cGRhdGUoRnJhbWVUaW1lKTtcclxuICAgICAgICAgICAgc3RhdGUuYXBwbHkoc2tlbGV0b24pO1xyXG4gICAgICAgICAgICBza2VsZXRvbi51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZUlkeCsrO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVGcmFtZShza2VsZXRvbiwgY2xpcHBlciwgdGhpcy5fZnJhbWVJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsVGltZSArPSBGcmFtZVRpbWU7XHJcbiAgICAgICAgfSB3aGlsZSAodGhpcy5fbmVlZFRvVXBkYXRlKHRvRnJhbWVJZHgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaXNJbml0ZWQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0ZWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGlzSW52YWxpZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludmFsaWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGludmFsaWRBbGxGcmFtZSAoKSB7XHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ludmFsaWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVBbGxGcmFtZSAoKSB7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkQWxsRnJhbWUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRvRnJhbWUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmludmFsaWRBbGxGcmFtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUZyYW1lIChza2VsZXRvbiwgY2xpcHBlciwgaW5kZXgpIHtcclxuICAgICAgICBfdmZPZmZzZXQgPSAwO1xyXG4gICAgICAgIF9ib25lSW5mb09mZnNldCA9IDA7XHJcbiAgICAgICAgX2luZGV4T2Zmc2V0ID0gMDtcclxuICAgICAgICBfdmVydGV4T2Zmc2V0ID0gMDtcclxuICAgICAgICBfcHJlVGV4VXJsID0gbnVsbDtcclxuICAgICAgICBfcHJlQmxlbmRNb2RlID0gbnVsbDtcclxuICAgICAgICBfc2VnVkNvdW50ID0gMDtcclxuICAgICAgICBfc2VnSUNvdW50ID0gMDtcclxuICAgICAgICBfc2VnT2Zmc2V0ID0gMDtcclxuICAgICAgICBfY29sb3JPZmZzZXQgPSAwO1xyXG4gICAgICAgIF9wcmVGaW5hbENvbG9yID0gbnVsbDtcclxuICAgICAgICBfcHJlRGFya0NvbG9yID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZXNbaW5kZXhdID0gdGhpcy5mcmFtZXNbaW5kZXhdIHx8IHtcclxuICAgICAgICAgICAgc2VnbWVudHMgOiBbXSxcclxuICAgICAgICAgICAgY29sb3JzIDogW10sXHJcbiAgICAgICAgICAgIGJvbmVJbmZvcyA6IFtdLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlcyA6IG51bGwsXHJcbiAgICAgICAgICAgIHVpbnRWZXJ0IDogbnVsbCxcclxuICAgICAgICAgICAgaW5kaWNlcyA6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcblxyXG4gICAgICAgIGxldCBzZWdtZW50cyA9IHRoaXMuX3RlbXBTZWdtZW50cyA9IGZyYW1lLnNlZ21lbnRzO1xyXG4gICAgICAgIGxldCBjb2xvcnMgPSB0aGlzLl90ZW1wQ29sb3JzID0gZnJhbWUuY29sb3JzO1xyXG4gICAgICAgIGxldCBib25lSW5mb3MgPSB0aGlzLl90ZW1wQm9uZUluZm9zID0gZnJhbWUuYm9uZUluZm9zO1xyXG4gICAgICAgIHRoaXMuX3RyYXZlcnNlU2tlbGV0b24oc2tlbGV0b24sIGNsaXBwZXIpO1xyXG4gICAgICAgIGlmIChfY29sb3JPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbG9yc1tfY29sb3JPZmZzZXQgLSAxXS52Zk9mZnNldCA9IF92Zk9mZnNldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29sb3JzLmxlbmd0aCA9IF9jb2xvck9mZnNldDtcclxuICAgICAgICBib25lSW5mb3MubGVuZ3RoID0gX2JvbmVJbmZvT2Zmc2V0O1xyXG4gICAgICAgIC8vIEhhbmRsZSBwcmUgc2VnbWVudC5cclxuICAgICAgICBsZXQgcHJlU2VnT2Zmc2V0ID0gX3NlZ09mZnNldCAtIDE7XHJcbiAgICAgICAgaWYgKHByZVNlZ09mZnNldCA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIEp1ZGdlIHNlZ21lbnQgdmVydGV4IGNvdW50IGlzIG5vdCBlbXB0eS5cclxuICAgICAgICAgICAgaWYgKF9zZWdJQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJlU2VnSW5mbyA9IHNlZ21lbnRzW3ByZVNlZ09mZnNldF07XHJcbiAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLmluZGV4Q291bnQgPSBfc2VnSUNvdW50O1xyXG4gICAgICAgICAgICAgICAgcHJlU2VnSW5mby52ZkNvdW50ID0gX3NlZ1ZDb3VudCAqIF9wZXJWZXJ0ZXhTaXplO1xyXG4gICAgICAgICAgICAgICAgcHJlU2VnSW5mby52ZXJ0ZXhDb3VudCA9IF9zZWdWQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5sZW5ndGggPSBfc2VnT2Zmc2V0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlzY2FyZCBwcmUgc2VnbWVudC5cclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzLmxlbmd0aCA9IF9zZWdPZmZzZXQgLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZWdtZW50cyBpcyBlbXB0eSxkaXNjYXJkIGFsbCBzZWdtZW50cy5cclxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gRmlsbCB2ZXJ0aWNlc1xyXG4gICAgICAgIGxldCB2ZXJ0aWNlcyA9IGZyYW1lLnZlcnRpY2VzO1xyXG4gICAgICAgIGxldCB1aW50VmVydCA9IGZyYW1lLnVpbnRWZXJ0O1xyXG4gICAgICAgIGlmICghdmVydGljZXMgfHwgdmVydGljZXMubGVuZ3RoIDwgX3ZmT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzID0gZnJhbWUudmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KF92Zk9mZnNldCk7XHJcbiAgICAgICAgICAgIHVpbnRWZXJ0ID0gZnJhbWUudWludFZlcnQgPSBuZXcgVWludDMyQXJyYXkodmVydGljZXMuYnVmZmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBpIDwgX3ZmT2Zmc2V0Oykge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIHhcclxuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB5XHJcbiAgICAgICAgICAgIHZlcnRpY2VzW2krK10gPSBfdmVydGljZXNbaisrXTsgLy8gdVxyXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIHZcclxuICAgICAgICAgICAgdWludFZlcnRbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyBjb2xvcjFcclxuICAgICAgICAgICAgdWludFZlcnRbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyBjb2xvcjJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbGwgaW5kaWNlc1xyXG4gICAgICAgIGxldCBpbmRpY2VzID0gZnJhbWUuaW5kaWNlcztcclxuICAgICAgICBpZiAoIWluZGljZXMgfHwgaW5kaWNlcy5sZW5ndGggPCBfaW5kZXhPZmZzZXQpIHtcclxuICAgICAgICAgICAgaW5kaWNlcyA9IGZyYW1lLmluZGljZXMgPSBuZXcgVWludDE2QXJyYXkoX2luZGV4T2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGV4T2Zmc2V0OyBpKyspIHtcclxuICAgICAgICAgICAgaW5kaWNlc1tpXSA9IF9pbmRpY2VzW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnJhbWUudmVydGljZXMgPSB2ZXJ0aWNlcztcclxuICAgICAgICBmcmFtZS51aW50VmVydCA9IHVpbnRWZXJ0O1xyXG4gICAgICAgIGZyYW1lLmluZGljZXMgPSBpbmRpY2VzO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaWxsVmVydGljZXMgKHNrZWxldG9uQ29sb3IsIGF0dGFjaG1lbnRDb2xvciwgc2xvdENvbG9yLCBjbGlwcGVyLCBzbG90KSB7XHJcblxyXG4gICAgICAgIF90ZW1wYSA9IHNsb3RDb2xvci5hICogYXR0YWNobWVudENvbG9yLmEgKiBza2VsZXRvbkNvbG9yLmEgKiAyNTU7XHJcbiAgICAgICAgX3RlbXByID0gYXR0YWNobWVudENvbG9yLnIgKiBza2VsZXRvbkNvbG9yLnIgKiAyNTU7XHJcbiAgICAgICAgX3RlbXBnID0gYXR0YWNobWVudENvbG9yLmcgKiBza2VsZXRvbkNvbG9yLmcgKiAyNTU7XHJcbiAgICAgICAgX3RlbXBiID0gYXR0YWNobWVudENvbG9yLmIgKiBza2VsZXRvbkNvbG9yLmIgKiAyNTU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgX2ZpbmFsQ29sb3IuciA9IF90ZW1wciAqIHNsb3RDb2xvci5yO1xyXG4gICAgICAgIF9maW5hbENvbG9yLmcgPSBfdGVtcGcgKiBzbG90Q29sb3IuZztcclxuICAgICAgICBfZmluYWxDb2xvci5iID0gX3RlbXBiICogc2xvdENvbG9yLmI7XHJcbiAgICAgICAgX2ZpbmFsQ29sb3IuYSA9IF90ZW1wYTtcclxuXHJcbiAgICAgICAgaWYgKHNsb3QuZGFya0NvbG9yID09IG51bGwpIHtcclxuICAgICAgICAgICAgX2RhcmtDb2xvci5zZXQoMC4wLCAwLCAwLCAxLjApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9kYXJrQ29sb3IuciA9IHNsb3QuZGFya0NvbG9yLnIgKiBfdGVtcHI7XHJcbiAgICAgICAgICAgIF9kYXJrQ29sb3IuZyA9IHNsb3QuZGFya0NvbG9yLmcgKiBfdGVtcGc7XHJcbiAgICAgICAgICAgIF9kYXJrQ29sb3IuYiA9IHNsb3QuZGFya0NvbG9yLmIgKiBfdGVtcGI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9kYXJrQ29sb3IuYSA9IDA7XHJcblxyXG4gICAgICAgIF9maW5hbENvbG9yMzIgPSAoKF9maW5hbENvbG9yLmE8PDI0KSA+Pj4gMCkgKyAoX2ZpbmFsQ29sb3IuYjw8MTYpICsgKF9maW5hbENvbG9yLmc8PDgpICsgX2ZpbmFsQ29sb3IucjtcclxuICAgICAgICBfZGFya0NvbG9yMzIgPSAoKF9kYXJrQ29sb3IuYTw8MjQpID4+PiAwKSArIChfZGFya0NvbG9yLmI8PDE2KSArIChfZGFya0NvbG9yLmc8PDgpICsgX2RhcmtDb2xvci5yO1xyXG5cclxuICAgICAgICBpZiAoX3ByZUZpbmFsQ29sb3IgIT09IF9maW5hbENvbG9yMzIgfHwgX3ByZURhcmtDb2xvciAhPT0gX2RhcmtDb2xvcjMyKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xvcnMgPSB0aGlzLl90ZW1wQ29sb3JzO1xyXG4gICAgICAgICAgICBfcHJlRmluYWxDb2xvciA9IF9maW5hbENvbG9yMzI7XHJcbiAgICAgICAgICAgIF9wcmVEYXJrQ29sb3IgPSBfZGFya0NvbG9yMzI7XHJcbiAgICAgICAgICAgIGlmIChfY29sb3JPZmZzZXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbX2NvbG9yT2Zmc2V0IC0gMV0udmZPZmZzZXQgPSBfdmZPZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29sb3JzW19jb2xvck9mZnNldCsrXSA9IHtcclxuICAgICAgICAgICAgICAgIGZyIDogX2ZpbmFsQ29sb3IucixcclxuICAgICAgICAgICAgICAgIGZnIDogX2ZpbmFsQ29sb3IuZyxcclxuICAgICAgICAgICAgICAgIGZiIDogX2ZpbmFsQ29sb3IuYixcclxuICAgICAgICAgICAgICAgIGZhIDogX2ZpbmFsQ29sb3IuYSxcclxuICAgICAgICAgICAgICAgIGRyIDogX2RhcmtDb2xvci5yLFxyXG4gICAgICAgICAgICAgICAgZGcgOiBfZGFya0NvbG9yLmcsXHJcbiAgICAgICAgICAgICAgICBkYiA6IF9kYXJrQ29sb3IuYixcclxuICAgICAgICAgICAgICAgIGRhIDogX2RhcmtDb2xvci5hLFxyXG4gICAgICAgICAgICAgICAgdmZPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY2xpcHBlci5pc0NsaXBwaW5nKCkpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgPSBfdmZPZmZzZXQsIG4gPSBfdmZPZmZzZXQgKyBfdmZDb3VudDsgdiA8IG47IHYgKz0gX3BlclZlcnRleFNpemUpIHtcclxuICAgICAgICAgICAgICAgIF92ZXJ0aWNlc1t2ICsgNF0gID0gX2ZpbmFsQ29sb3IzMjsgICAgIC8vIGxpZ2h0IGNvbG9yXHJcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbdiArIDVdICA9IF9kYXJrQ29sb3IzMjsgICAgICAvLyBkYXJrIGNvbG9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xpcHBlci5jbGlwVHJpYW5nbGVzKF92ZXJ0aWNlcywgX3ZmQ291bnQsIF9pbmRpY2VzLCBfaW5kZXhDb3VudCwgX3ZlcnRpY2VzLCBfZmluYWxDb2xvciwgX2RhcmtDb2xvciwgdHJ1ZSwgX3BlclZlcnRleFNpemUsIF9pbmRleE9mZnNldCwgX3ZmT2Zmc2V0LCBfdmZPZmZzZXQgKyAyKTtcclxuICAgICAgICAgICAgbGV0IGNsaXBwZWRWZXJ0aWNlcyA9IGNsaXBwZXIuY2xpcHBlZFZlcnRpY2VzO1xyXG4gICAgICAgICAgICBsZXQgY2xpcHBlZFRyaWFuZ2xlcyA9IGNsaXBwZXIuY2xpcHBlZFRyaWFuZ2xlcztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGluc3VyZSBjYXBhY2l0eVxyXG4gICAgICAgICAgICBfaW5kZXhDb3VudCA9IGNsaXBwZWRUcmlhbmdsZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBfdmZDb3VudCA9IGNsaXBwZWRWZXJ0aWNlcy5sZW5ndGggLyBfcGVyQ2xpcFZlcnRleFNpemUgKiBfcGVyVmVydGV4U2l6ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpbGwgaW5kaWNlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpaSA9IDAsIGpqID0gX2luZGV4T2Zmc2V0LCBubiA9IGNsaXBwZWRUcmlhbmdsZXMubGVuZ3RoOyBpaSA8IG5uOykge1xyXG4gICAgICAgICAgICAgICAgX2luZGljZXNbamorK10gPSBjbGlwcGVkVHJpYW5nbGVzW2lpKytdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmaWxsIHZlcnRpY2VzIGNvbnRhaW4geCB5IHUgdiBsaWdodCBjb2xvciBkYXJrIGNvbG9yXHJcbiAgICAgICAgICAgIGZvciAobGV0IHYgPSAwLCBuID0gY2xpcHBlZFZlcnRpY2VzLmxlbmd0aCwgb2Zmc2V0ID0gX3ZmT2Zmc2V0OyB2IDwgbjsgdiArPSAxMiwgb2Zmc2V0ICs9IF9wZXJWZXJ0ZXhTaXplKSB7XHJcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbb2Zmc2V0XSA9IGNsaXBwZWRWZXJ0aWNlc1t2XTsgICAgICAgICAgICAgICAgIC8vIHhcclxuICAgICAgICAgICAgICAgIF92ZXJ0aWNlc1tvZmZzZXQgKyAxXSA9IGNsaXBwZWRWZXJ0aWNlc1t2ICsgMV07ICAgICAgICAgLy8geVxyXG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldCArIDJdID0gY2xpcHBlZFZlcnRpY2VzW3YgKyA2XTsgICAgICAgICAvLyB1XHJcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbb2Zmc2V0ICsgM10gPSBjbGlwcGVkVmVydGljZXNbdiArIDddOyAgICAgICAgIC8vIHZcclxuXHJcbiAgICAgICAgICAgICAgICBfdmVydGljZXNbb2Zmc2V0ICsgNF0gPSBfZmluYWxDb2xvcjMyO1xyXG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW29mZnNldCArIDVdID0gX2RhcmtDb2xvcjMyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdHJhdmVyc2VTa2VsZXRvbiAoc2tlbGV0b24sIGNsaXBwZXIpIHtcclxuICAgICAgICBsZXQgc2VnbWVudHMgPSB0aGlzLl90ZW1wU2VnbWVudHM7XHJcbiAgICAgICAgbGV0IGJvbmVJbmZvcyA9IHRoaXMuX3RlbXBCb25lSW5mb3M7XHJcbiAgICAgICAgbGV0IHNrZWxldG9uQ29sb3IgPSBza2VsZXRvbi5jb2xvcjtcclxuICAgICAgICBsZXQgYXR0YWNobWVudCwgYXR0YWNobWVudENvbG9yLCBzbG90Q29sb3IsIHV2cywgdHJpYW5nbGVzO1xyXG4gICAgICAgIGxldCBpc1JlZ2lvbiwgaXNNZXNoLCBpc0NsaXA7XHJcbiAgICAgICAgbGV0IHRleHR1cmU7XHJcbiAgICAgICAgbGV0IHByZVNlZ09mZnNldCwgcHJlU2VnSW5mbztcclxuICAgICAgICBsZXQgYmxlbmRNb2RlO1xyXG4gICAgICAgIGxldCBzbG90O1xyXG5cclxuICAgICAgICBsZXQgYm9uZXMgPSBza2VsZXRvbi5ib25lcztcclxuICAgICAgICBpZiAodGhpcy5fZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBib25lcy5sZW5ndGg7IGkgPCBsOyBpKyssIF9ib25lSW5mb09mZnNldCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9uZSA9IGJvbmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvbmVJbmZvID0gYm9uZUluZm9zW19ib25lSW5mb09mZnNldF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWJvbmVJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9uZUluZm8gPSBib25lSW5mb3NbX2JvbmVJbmZvT2Zmc2V0XSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYm9uZUluZm8uYSA9IGJvbmUuYTtcclxuICAgICAgICAgICAgICAgIGJvbmVJbmZvLmIgPSBib25lLmI7XHJcbiAgICAgICAgICAgICAgICBib25lSW5mby5jID0gYm9uZS5jO1xyXG4gICAgICAgICAgICAgICAgYm9uZUluZm8uZCA9IGJvbmUuZDtcclxuICAgICAgICAgICAgICAgIGJvbmVJbmZvLndvcmxkWCA9IGJvbmUud29ybGRYO1xyXG4gICAgICAgICAgICAgICAgYm9uZUluZm8ud29ybGRZID0gYm9uZS53b3JsZFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHNsb3RJZHggPSAwLCBzbG90Q291bnQgPSBza2VsZXRvbi5kcmF3T3JkZXIubGVuZ3RoOyBzbG90SWR4IDwgc2xvdENvdW50OyBzbG90SWR4KyspIHtcclxuICAgICAgICAgICAgc2xvdCA9IHNrZWxldG9uLmRyYXdPcmRlcltzbG90SWR4XTtcclxuICAgIFxyXG4gICAgICAgICAgICBfdmZDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIF9pbmRleENvdW50ID0gMDtcclxuXHJcbiAgICAgICAgICAgIGF0dGFjaG1lbnQgPSBzbG90LmdldEF0dGFjaG1lbnQoKTtcclxuICAgICAgICAgICAgaWYgKCFhdHRhY2htZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc1JlZ2lvbiA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5SZWdpb25BdHRhY2htZW50O1xyXG4gICAgICAgICAgICBpc01lc2ggPSBhdHRhY2htZW50IGluc3RhbmNlb2Ygc3BpbmUuTWVzaEF0dGFjaG1lbnQ7XHJcbiAgICAgICAgICAgIGlzQ2xpcCA9IGF0dGFjaG1lbnQgaW5zdGFuY2VvZiBzcGluZS5DbGlwcGluZ0F0dGFjaG1lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNDbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBTdGFydChzbG90LCBhdHRhY2htZW50KTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzUmVnaW9uICYmICFpc01lc2gpIHtcclxuICAgICAgICAgICAgICAgIGNsaXBwZXIuY2xpcEVuZFdpdGhTbG90KHNsb3QpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBhdHRhY2htZW50LnJlZ2lvbi50ZXh0dXJlLl90ZXh0dXJlO1xyXG4gICAgICAgICAgICBpZiAoIXRleHR1cmUpIHtcclxuICAgICAgICAgICAgICAgIGNsaXBwZXIuY2xpcEVuZFdpdGhTbG90KHNsb3QpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBibGVuZE1vZGUgPSBzbG90LmRhdGEuYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICBpZiAoX3ByZVRleFVybCAhPT0gdGV4dHVyZS5uYXRpdmVVcmwgfHwgX3ByZUJsZW5kTW9kZSAhPT0gYmxlbmRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBfcHJlVGV4VXJsID0gdGV4dHVyZS5uYXRpdmVVcmw7XHJcbiAgICAgICAgICAgICAgICBfcHJlQmxlbmRNb2RlID0gYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHByZSBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgcHJlU2VnT2Zmc2V0ID0gX3NlZ09mZnNldCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlU2VnT2Zmc2V0ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlU2VnSW5mbyA9IHNlZ21lbnRzW3ByZVNlZ09mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8uaW5kZXhDb3VudCA9IF9zZWdJQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8udmVydGV4Q291bnQgPSBfc2VnVkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZmQ291bnQgPSBfc2VnVkNvdW50ICogX3BlclZlcnRleFNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGlzY2FyZCBwcmUgc2VnbWVudC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlZ09mZnNldC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBub3cgc2VnbWVudC5cclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzW19zZWdPZmZzZXRdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleCA6IHRleHR1cmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYmxlbmRNb2RlIDogYmxlbmRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Q291bnQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleENvdW50IDogMCxcclxuICAgICAgICAgICAgICAgICAgICB2ZkNvdW50IDogMFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIF9zZWdPZmZzZXQrKztcclxuICAgICAgICAgICAgICAgIF9zZWdJQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgX3NlZ1ZDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc1JlZ2lvbikge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXMgPSBfcXVhZFRyaWFuZ2xlcztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gaW5zdXJlIGNhcGFjaXR5XHJcbiAgICAgICAgICAgICAgICBfdmZDb3VudCA9IDQgKiBfcGVyVmVydGV4U2l6ZTtcclxuICAgICAgICAgICAgICAgIF9pbmRleENvdW50ID0gNjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gY29tcHV0ZSB2ZXJ0ZXggYW5kIGZpbGwgeCB5XHJcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LmNvbXB1dGVXb3JsZFZlcnRpY2VzKHNsb3QuYm9uZSwgX3ZlcnRpY2VzLCBfdmZPZmZzZXQsIF9wZXJWZXJ0ZXhTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpc01lc2gpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdHJpYW5nbGVzID0gYXR0YWNobWVudC50cmlhbmdsZXM7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIGluc3VyZSBjYXBhY2l0eVxyXG4gICAgICAgICAgICAgICAgX3ZmQ291bnQgPSAoYXR0YWNobWVudC53b3JsZFZlcnRpY2VzTGVuZ3RoID4+IDEpICogX3BlclZlcnRleFNpemU7XHJcbiAgICAgICAgICAgICAgICBfaW5kZXhDb3VudCA9IHRyaWFuZ2xlcy5sZW5ndGg7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbXB1dGUgdmVydGV4IGFuZCBmaWxsIHggeVxyXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudC5jb21wdXRlV29ybGRWZXJ0aWNlcyhzbG90LCAwLCBhdHRhY2htZW50LndvcmxkVmVydGljZXNMZW5ndGgsIF92ZXJ0aWNlcywgX3ZmT2Zmc2V0LCBfcGVyVmVydGV4U2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBpZiAoX3ZmQ291bnQgPT0gMCB8fCBfaW5kZXhDb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gZmlsbCBpbmRpY2VzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGlpID0gMCwgamogPSBfaW5kZXhPZmZzZXQsIG5uID0gdHJpYW5nbGVzLmxlbmd0aDsgaWkgPCBubjspIHtcclxuICAgICAgICAgICAgICAgIF9pbmRpY2VzW2pqKytdID0gdHJpYW5nbGVzW2lpKytdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmaWxsIHUgdlxyXG4gICAgICAgICAgICB1dnMgPSBhdHRhY2htZW50LnV2cztcclxuICAgICAgICAgICAgZm9yIChsZXQgdiA9IF92Zk9mZnNldCwgbiA9IF92Zk9mZnNldCArIF92ZkNvdW50LCB1ID0gMDsgdiA8IG47IHYgKz0gX3BlclZlcnRleFNpemUsIHUgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgX3ZlcnRpY2VzW3YgKyAyXSA9IHV2c1t1XTsgICAgICAgICAgIC8vIHVcclxuICAgICAgICAgICAgICAgIF92ZXJ0aWNlc1t2ICsgM10gPSB1dnNbdSArIDFdOyAgICAgICAvLyB2XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF0dGFjaG1lbnRDb2xvciA9IGF0dGFjaG1lbnQuY29sb3I7XHJcbiAgICAgICAgICAgIHNsb3RDb2xvciA9IHNsb3QuY29sb3I7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbGxWZXJ0aWNlcyhza2VsZXRvbkNvbG9yLCBhdHRhY2htZW50Q29sb3IsIHNsb3RDb2xvciwgY2xpcHBlciwgc2xvdCk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKF9pbmRleENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaWkgPSBfaW5kZXhPZmZzZXQsIG5uID0gX2luZGV4T2Zmc2V0ICsgX2luZGV4Q291bnQ7IGlpIDwgbm47IGlpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBfaW5kaWNlc1tpaV0gKz0gX3NlZ1ZDb3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9pbmRleE9mZnNldCArPSBfaW5kZXhDb3VudDtcclxuICAgICAgICAgICAgICAgIF92Zk9mZnNldCArPSBfdmZDb3VudDtcclxuICAgICAgICAgICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSBfdmZPZmZzZXQgLyBfcGVyVmVydGV4U2l6ZTtcclxuICAgICAgICAgICAgICAgIF9zZWdJQ291bnQgKz0gX2luZGV4Q291bnQ7XHJcbiAgICAgICAgICAgICAgICBfc2VnVkNvdW50ICs9IF92ZkNvdW50IC8gX3BlclZlcnRleFNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjbGlwcGVyLmNsaXBFbmRXaXRoU2xvdChzbG90KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjbGlwcGVyLmNsaXBFbmQoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgU2tlbGV0b25DYWNoZSA9IGNjLkNsYXNzKHtcclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX3ByaXZhdGVNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uUG9vbCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ2FjaGUgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlUHJpdmF0ZU1vZGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3ByaXZhdGVNb2RlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xlYXIgKCkge1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wgPSB7fTtcclxuICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZVNrZWxldG9uICh1dWlkKSB7XHJcbiAgICAgICAgdmFyIHNrZWxldG9uSW5mbyA9IHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF07XHJcbiAgICAgICAgaWYgKCFza2VsZXRvbkluZm8pIHJldHVybjtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICBmb3IgKHZhciBhbmlLZXkgaW4gYW5pbWF0aW9uc0NhY2hlKSB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIGNhY2hlIHRleHR1cmUsIGFuZCBwdXQgY2FjaGUgaW50byBwb29sLlxyXG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIGNyZWF0ZSBUeXBlZEFycmF5IG5leHQgdGltZS5cclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaUtleV07XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sW3V1aWQgKyBcIiNcIiArIGFuaUtleV0gPSBhbmltYXRpb25DYWNoZTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuY2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRTa2VsZXRvbkNhY2hlICh1dWlkLCBza2VsZXRvbkRhdGEpIHtcclxuICAgICAgICBsZXQgc2tlbGV0b25JbmZvID0gdGhpcy5fc2tlbGV0b25DYWNoZVt1dWlkXTtcclxuICAgICAgICBpZiAoIXNrZWxldG9uSW5mbykge1xyXG4gICAgICAgICAgICBsZXQgc2tlbGV0b24gPSBuZXcgc3BpbmUuU2tlbGV0b24oc2tlbGV0b25EYXRhKTtcclxuICAgICAgICAgICAgbGV0IGNsaXBwZXIgPSBuZXcgc3BpbmUuU2tlbGV0b25DbGlwcGluZygpO1xyXG4gICAgICAgICAgICBsZXQgc3RhdGVEYXRhID0gbmV3IHNwaW5lLkFuaW1hdGlvblN0YXRlRGF0YShza2VsZXRvbi5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gbmV3IHNwaW5lLkFuaW1hdGlvblN0YXRlKHN0YXRlRGF0YSk7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IG5ldyBUcmFja0VudHJ5TGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIHN0YXRlLmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF0gPSBza2VsZXRvbkluZm8gPSB7XHJcbiAgICAgICAgICAgICAgICBza2VsZXRvbiA6IHNrZWxldG9uLFxyXG4gICAgICAgICAgICAgICAgY2xpcHBlciA6IGNsaXBwZXIsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA6IHN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgOiBsaXN0ZW5lcixcclxuICAgICAgICAgICAgICAgIC8vIENhY2hlIGFsbCBraW5kcyBvZiBhbmltYXRpb24gZnJhbWUuXHJcbiAgICAgICAgICAgICAgICAvLyBXaGVuIHNrZWxldG9uIGlzIGRpc3Bvc2UsIGNsZWFyIGFsbCBhbmltYXRpb24gY2FjaGUuXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25zQ2FjaGUgOiB7fSxcclxuICAgICAgICAgICAgICAgIGN1ckFuaW1hdGlvbkNhY2hlOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBza2VsZXRvbkluZm87XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFuaW1hdGlvbkNhY2hlICh1dWlkLCBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgbGV0IHNrZWxldG9uSW5mbyA9IHRoaXMuX3NrZWxldG9uQ2FjaGVbdXVpZF07XHJcbiAgICAgICAgaWYgKCFza2VsZXRvbkluZm8pIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUgKHV1aWQpIHtcclxuICAgICAgICBsZXQgc2tlbGV0b25JbmZvID0gdGhpcy5fc2tlbGV0b25DYWNoZVt1dWlkXTtcclxuICAgICAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkluZm8gJiYgc2tlbGV0b25JbmZvLnNrZWxldG9uO1xyXG4gICAgICAgIGlmICghc2tlbGV0b24pIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IHNrZWxldG9uSW5mby5hbmltYXRpb25zQ2FjaGU7XHJcbiAgICAgICAgZm9yICh2YXIgYW5pS2V5IGluIGFuaW1hdGlvbnNDYWNoZSkge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pS2V5XTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0QW5pbWF0aW9uQ2FjaGUgKHV1aWQsIGFuaW1hdGlvbk5hbWUpIHtcclxuICAgICAgICBpZiAoIWFuaW1hdGlvbk5hbWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xyXG4gICAgICAgIGxldCBza2VsZXRvbiA9IHNrZWxldG9uSW5mbyAmJiBza2VsZXRvbkluZm8uc2tlbGV0b247XHJcbiAgICAgICAgaWYgKCFza2VsZXRvbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBhbmltYXRpb24gPSBza2VsZXRvbi5kYXRhLmZpbmRBbmltYXRpb24oYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pbWF0aW9uTmFtZV07XHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25DYWNoZSkge1xyXG4gICAgICAgICAgICAvLyBJZiBjYWNoZSBleGlzdCBpbiBwb29sLCB0aGVuIGp1c3QgdXNlIGl0LlxyXG4gICAgICAgICAgICBsZXQgcG9vbEtleSA9IHV1aWQgKyBcIiNcIiArIGFuaW1hdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gdGhpcy5fYW5pbWF0aW9uUG9vbFtwb29sS2V5XTtcclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYW5pbWF0aW9uUG9vbFtwb29sS2V5XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gbmV3IEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DYWNoZS5fcHJpdmF0ZU1vZGUgPSB0aGlzLl9wcml2YXRlTW9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS5pbml0KHNrZWxldG9uSW5mbywgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnNDYWNoZVthbmltYXRpb25OYW1lXSA9IGFuaW1hdGlvbkNhY2hlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uQ2FjaGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUFuaW1hdGlvbkNhY2hlICh1dWlkLCBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgaWYgKGFuaW1hdGlvbk5hbWUpIHtcclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gdGhpcy5pbml0QW5pbWF0aW9uQ2FjaGUodXVpZCwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS51cGRhdGVBbGxGcmFtZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlW3V1aWRdO1xyXG4gICAgICAgICAgICBsZXQgc2tlbGV0b24gPSBza2VsZXRvbkluZm8gJiYgc2tlbGV0b25JbmZvLnNrZWxldG9uO1xyXG4gICAgICAgICAgICBpZiAoIXNrZWxldG9uKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gc2tlbGV0b25JbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgYW5pS2V5IGluIGFuaW1hdGlvbnNDYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaUtleV07XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DYWNoZS51cGRhdGVBbGxGcmFtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcblNrZWxldG9uQ2FjaGUuRnJhbWVUaW1lID0gRnJhbWVUaW1lO1xyXG5Ta2VsZXRvbkNhY2hlLnNoYXJlZENhY2hlID0gbmV3IFNrZWxldG9uQ2FjaGUoKTtcclxubW9kdWxlLmV4cG9ydHMgPSBTa2VsZXRvbkNhY2hlOyJdLCJzb3VyY2VSb290IjoiLyJ9