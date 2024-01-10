
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/ArmatureCache.js';
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
var _preColor = null;

var _x, _y; //Cache all frames in an animation


var AnimationCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._inited = false;
    this._invalid = true;
    this._enableCacheAttachedInfo = false;
    this.frames = [];
    this.totalTime = 0;
    this.isCompleted = false;
    this._frameIdx = -1;
    this._armatureInfo = null;
    this._animationName = null;
    this._tempSegments = null;
    this._tempColors = null;
    this._tempBoneInfos = null;
  },
  init: function init(armatureInfo, animationName) {
    this._inited = true;
    this._armatureInfo = armatureInfo;
    this._animationName = animationName;
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
  begin: function begin() {
    if (!this._invalid) return;
    var armatureInfo = this._armatureInfo;
    var curAnimationCache = armatureInfo.curAnimationCache;

    if (curAnimationCache && curAnimationCache != this) {
      if (this._privateMode) {
        curAnimationCache.invalidAllFrame();
      } else {
        curAnimationCache.updateToFrame();
      }
    }

    var armature = armatureInfo.armature;
    var animation = armature.animation;
    animation.play(this._animationName, 1);
    armatureInfo.curAnimationCache = this;
    this._invalid = false;
    this._frameIdx = -1;
    this.totalTime = 0;
    this.isCompleted = false;
  },
  end: function end() {
    if (!this._needToUpdate()) {
      this._armatureInfo.curAnimationCache = null;
      this.frames.length = this._frameIdx + 1;
      this.isCompleted = true;
    }
  },
  _needToUpdate: function _needToUpdate(toFrameIdx) {
    var armatureInfo = this._armatureInfo;
    var armature = armatureInfo.armature;
    var animation = armature.animation;
    return !animation.isCompleted && this.totalTime < MaxCacheTime && (toFrameIdx == undefined || this._frameIdx < toFrameIdx);
  },
  updateToFrame: function updateToFrame(toFrameIdx) {
    if (!this._inited) return;
    this.begin();
    if (!this._needToUpdate(toFrameIdx)) return;
    var armatureInfo = this._armatureInfo;
    var armature = armatureInfo.armature;

    do {
      // Solid update frame rate 1/60.
      armature.advanceTime(FrameTime);
      this._frameIdx++;

      this._updateFrame(armature, this._frameIdx);

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
  _updateFrame: function _updateFrame(armature, index) {
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
    _preColor = null;
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

    this._traverseArmature(armature, 1.0); // At last must handle pre color and segment.
    // Because vertex count will right at the end.
    // Handle pre color.


    if (_colorOffset > 0) {
      colors[_colorOffset - 1].vfOffset = _vfOffset;
    }

    colors.length = _colorOffset;
    boneInfos.length = _boneInfoOffset; // Handle pre segment

    var preSegOffset = _segOffset - 1;

    if (preSegOffset >= 0) {
      if (_segICount > 0) {
        var preSegInfo = segments[preSegOffset];
        preSegInfo.indexCount = _segICount;
        preSegInfo.vfCount = _segVCount * 5;
        preSegInfo.vertexCount = _segVCount;
        segments.length = _segOffset;
      } else {
        segments.length = _segOffset - 1;
      }
    } // Discard all segments.


    if (segments.length === 0) return; // Fill vertices

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

      uintVert[i++] = _vertices[j++]; // color
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
  _traverseArmature: function _traverseArmature(armature, parentOpacity) {
    var colors = this._tempColors;
    var segments = this._tempSegments;
    var boneInfos = this._tempBoneInfos;
    var gVertices = _vertices;
    var gIndices = _indices;
    var slotVertices, slotIndices;
    var slots = armature._slots,
        slot,
        slotMatrix,
        slotMatrixm,
        slotColor,
        colorVal;
    var texture;
    var preSegOffset, preSegInfo;
    var bones = armature._bones;

    if (this._enableCacheAttachedInfo) {
      for (var i = 0, l = bones.length; i < l; i++, _boneInfoOffset++) {
        var bone = bones[i];
        var boneInfo = boneInfos[_boneInfoOffset];

        if (!boneInfo) {
          boneInfo = boneInfos[_boneInfoOffset] = {
            globalTransformMatrix: new dragonBones.Matrix()
          };
        }

        var boneMat = bone.globalTransformMatrix;
        var cacheBoneMat = boneInfo.globalTransformMatrix;
        cacheBoneMat.copyFrom(boneMat);
      }
    }

    for (var _i2 = 0, _l = slots.length; _i2 < _l; _i2++) {
      slot = slots[_i2];
      if (!slot._visible || !slot._displayData) continue;
      slot.updateWorldMatrix();
      slotColor = slot._color;

      if (slot.childArmature) {
        this._traverseArmature(slot.childArmature, parentOpacity * slotColor.a / 255);

        continue;
      }

      texture = slot.getTexture();
      if (!texture) continue;

      if (_preTexUrl !== texture.nativeUrl || _preBlendMode !== slot._blendMode) {
        _preTexUrl = texture.nativeUrl;
        _preBlendMode = slot._blendMode; // Handle pre segment.

        preSegOffset = _segOffset - 1;

        if (preSegOffset >= 0) {
          if (_segICount > 0) {
            preSegInfo = segments[preSegOffset];
            preSegInfo.indexCount = _segICount;
            preSegInfo.vertexCount = _segVCount;
            preSegInfo.vfCount = _segVCount * 5;
          } else {
            // Discard pre segment.
            _segOffset--;
          }
        } // Handle now segment.


        segments[_segOffset] = {
          tex: texture,
          blendMode: slot._blendMode,
          indexCount: 0,
          vertexCount: 0,
          vfCount: 0
        };
        _segOffset++;
        _segICount = 0;
        _segVCount = 0;
      }

      colorVal = (slotColor.a * parentOpacity << 24 >>> 0) + (slotColor.b << 16) + (slotColor.g << 8) + slotColor.r;

      if (_preColor !== colorVal) {
        _preColor = colorVal;

        if (_colorOffset > 0) {
          colors[_colorOffset - 1].vfOffset = _vfOffset;
        }

        colors[_colorOffset++] = {
          r: slotColor.r,
          g: slotColor.g,
          b: slotColor.b,
          a: slotColor.a * parentOpacity,
          vfOffset: 0
        };
      }

      slotVertices = slot._localVertices;
      slotIndices = slot._indices;
      slotMatrix = slot._worldMatrix;
      slotMatrixm = slotMatrix.m;

      for (var j = 0, vl = slotVertices.length; j < vl;) {
        _x = slotVertices[j++];
        _y = slotVertices[j++];
        gVertices[_vfOffset++] = _x * slotMatrixm[0] + _y * slotMatrixm[4] + slotMatrixm[12];
        gVertices[_vfOffset++] = _x * slotMatrixm[1] + _y * slotMatrixm[5] + slotMatrixm[13];
        gVertices[_vfOffset++] = slotVertices[j++];
        gVertices[_vfOffset++] = slotVertices[j++];
        gVertices[_vfOffset++] = colorVal;
      } // This place must use segment vertex count to calculate vertex offset.
      // Assembler will calculate vertex offset again for different segment.


      for (var ii = 0, il = slotIndices.length; ii < il; ii++) {
        gIndices[_indexOffset++] = _segVCount + slotIndices[ii];
      }

      _vertexOffset = _vfOffset / 5;
      _segICount += slotIndices.length;
      _segVCount += slotVertices.length / 4;
    }
  }
});
var ArmatureCache = cc.Class({
  ctor: function ctor() {
    this._privateMode = false;
    this._animationPool = {};
    this._armatureCache = {};
  },
  enablePrivateMode: function enablePrivateMode() {
    this._privateMode = true;
  },
  // If cache is private, cache will be destroy when dragonbones node destroy.
  dispose: function dispose() {
    for (var key in this._armatureCache) {
      var armatureInfo = this._armatureCache[key];

      if (armatureInfo) {
        var armature = armatureInfo.armature;
        armature && armature.dispose();
      }
    }

    this._armatureCache = null;
    this._animationPool = null;
  },
  _removeArmature: function _removeArmature(armatureKey) {
    var armatureInfo = this._armatureCache[armatureKey];
    var animationsCache = armatureInfo.animationsCache;

    for (var aniKey in animationsCache) {
      // Clear cache texture, and put cache into pool.
      // No need to create TypedArray next time.
      var animationCache = animationsCache[aniKey];
      if (!animationCache) continue;
      this._animationPool[armatureKey + "#" + aniKey] = animationCache;
      animationCache.clear();
    }

    var armature = armatureInfo.armature;
    armature && armature.dispose();
    delete this._armatureCache[armatureKey];
  },
  // When db assets be destroy, remove armature from db cache.
  resetArmature: function resetArmature(uuid) {
    for (var armatureKey in this._armatureCache) {
      if (armatureKey.indexOf(uuid) == -1) continue;

      this._removeArmature(armatureKey);
    }
  },
  getArmatureCache: function getArmatureCache(armatureName, armatureKey, atlasUUID) {
    var armatureInfo = this._armatureCache[armatureKey];
    var armature;

    if (!armatureInfo) {
      var factory = dragonBones.CCFactory.getInstance();
      var proxy = factory.buildArmatureDisplay(armatureName, armatureKey, "", atlasUUID);
      if (!proxy || !proxy._armature) return;
      armature = proxy._armature; // If armature has child armature, can not be cache, because it's
      // animation data can not be precompute.

      if (!ArmatureCache.canCache(armature)) {
        armature.dispose();
        return;
      }

      this._armatureCache[armatureKey] = {
        armature: armature,
        // Cache all kinds of animation frame.
        // When armature is dispose, clear all animation cache.
        animationsCache: {},
        curAnimationCache: null
      };
    } else {
      armature = armatureInfo.armature;
    }

    return armature;
  },
  getAnimationCache: function getAnimationCache(armatureKey, animationName) {
    var armatureInfo = this._armatureCache[armatureKey];
    if (!armatureInfo) return null;
    var animationsCache = armatureInfo.animationsCache;
    return animationsCache[animationName];
  },
  initAnimationCache: function initAnimationCache(armatureKey, animationName) {
    if (!animationName) return null;
    var armatureInfo = this._armatureCache[armatureKey];
    var armature = armatureInfo && armatureInfo.armature;
    if (!armature) return null;
    var animation = armature.animation;
    var hasAni = animation.hasAnimation(animationName);
    if (!hasAni) return null;
    var animationsCache = armatureInfo.animationsCache;
    var animationCache = animationsCache[animationName];

    if (!animationCache) {
      // If cache exist in pool, then just use it.
      var poolKey = armatureKey + "#" + animationName;
      animationCache = this._animationPool[poolKey];

      if (animationCache) {
        delete this._animationPool[poolKey];
      } else {
        animationCache = new AnimationCache();
        animationCache._privateMode = this._privateMode;
      }

      animationCache.init(armatureInfo, animationName);
      animationsCache[animationName] = animationCache;
    }

    return animationCache;
  },
  invalidAnimationCache: function invalidAnimationCache(armatureKey) {
    var armatureInfo = this._armatureCache[armatureKey];
    var armature = armatureInfo && armatureInfo.armature;
    if (!armature) return null;
    var animationsCache = armatureInfo.animationsCache;

    for (var aniKey in animationsCache) {
      var animationCache = animationsCache[aniKey];
      animationCache.invalidAllFrame();
    }
  },
  updateAnimationCache: function updateAnimationCache(armatureKey, animationName) {
    if (animationName) {
      var animationCache = this.initAnimationCache(armatureKey, animationName);
      if (!animationCache) return;
      animationCache.updateAllFrame();
    } else {
      var armatureInfo = this._armatureCache[armatureKey];
      var armature = armatureInfo && armatureInfo.armature;
      if (!armature) return null;
      var animationsCache = armatureInfo.animationsCache;

      for (var aniKey in animationsCache) {
        var _animationCache = animationsCache[aniKey];

        _animationCache.updateAllFrame();
      }
    }
  }
});
ArmatureCache.FrameTime = FrameTime;
ArmatureCache.sharedCache = new ArmatureCache();
ArmatureCache.canCache = function (armature) {
  var slots = armature._slots;

  for (var i = 0, l = slots.length; i < l; i++) {
    var slot = slots[i];

    if (slot.childArmature) {
      return false;
    }
  }

  return true;
}, module.exports = ArmatureCache;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxBcm1hdHVyZUNhY2hlLmpzIl0sIm5hbWVzIjpbIk1heENhY2hlVGltZSIsIkZyYW1lVGltZSIsIl92ZXJ0aWNlcyIsIl9pbmRpY2VzIiwiX2JvbmVJbmZvT2Zmc2V0IiwiX3ZlcnRleE9mZnNldCIsIl9pbmRleE9mZnNldCIsIl92Zk9mZnNldCIsIl9wcmVUZXhVcmwiLCJfcHJlQmxlbmRNb2RlIiwiX3NlZ1ZDb3VudCIsIl9zZWdJQ291bnQiLCJfc2VnT2Zmc2V0IiwiX2NvbG9yT2Zmc2V0IiwiX3ByZUNvbG9yIiwiX3giLCJfeSIsIkFuaW1hdGlvbkNhY2hlIiwiY2MiLCJDbGFzcyIsImN0b3IiLCJfcHJpdmF0ZU1vZGUiLCJfaW5pdGVkIiwiX2ludmFsaWQiLCJfZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJmcmFtZXMiLCJ0b3RhbFRpbWUiLCJpc0NvbXBsZXRlZCIsIl9mcmFtZUlkeCIsIl9hcm1hdHVyZUluZm8iLCJfYW5pbWF0aW9uTmFtZSIsIl90ZW1wU2VnbWVudHMiLCJfdGVtcENvbG9ycyIsIl90ZW1wQm9uZUluZm9zIiwiaW5pdCIsImFybWF0dXJlSW5mbyIsImFuaW1hdGlvbk5hbWUiLCJjbGVhciIsImkiLCJuIiwibGVuZ3RoIiwiZnJhbWUiLCJzZWdtZW50cyIsImludmFsaWRBbGxGcmFtZSIsImJlZ2luIiwiY3VyQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVUb0ZyYW1lIiwiYXJtYXR1cmUiLCJhbmltYXRpb24iLCJwbGF5IiwiZW5kIiwiX25lZWRUb1VwZGF0ZSIsInRvRnJhbWVJZHgiLCJ1bmRlZmluZWQiLCJhZHZhbmNlVGltZSIsIl91cGRhdGVGcmFtZSIsImlzSW5pdGVkIiwiaXNJbnZhbGlkIiwidXBkYXRlQWxsRnJhbWUiLCJlbmFibGVDYWNoZUF0dGFjaGVkSW5mbyIsImluZGV4IiwiY29sb3JzIiwiYm9uZUluZm9zIiwidmVydGljZXMiLCJ1aW50VmVydCIsImluZGljZXMiLCJfdHJhdmVyc2VBcm1hdHVyZSIsInZmT2Zmc2V0IiwicHJlU2VnT2Zmc2V0IiwicHJlU2VnSW5mbyIsImluZGV4Q291bnQiLCJ2ZkNvdW50IiwidmVydGV4Q291bnQiLCJGbG9hdDMyQXJyYXkiLCJVaW50MzJBcnJheSIsImJ1ZmZlciIsImoiLCJVaW50MTZBcnJheSIsInBhcmVudE9wYWNpdHkiLCJnVmVydGljZXMiLCJnSW5kaWNlcyIsInNsb3RWZXJ0aWNlcyIsInNsb3RJbmRpY2VzIiwic2xvdHMiLCJfc2xvdHMiLCJzbG90Iiwic2xvdE1hdHJpeCIsInNsb3RNYXRyaXhtIiwic2xvdENvbG9yIiwiY29sb3JWYWwiLCJ0ZXh0dXJlIiwiYm9uZXMiLCJfYm9uZXMiLCJsIiwiYm9uZSIsImJvbmVJbmZvIiwiZ2xvYmFsVHJhbnNmb3JtTWF0cml4IiwiZHJhZ29uQm9uZXMiLCJNYXRyaXgiLCJib25lTWF0IiwiY2FjaGVCb25lTWF0IiwiY29weUZyb20iLCJfdmlzaWJsZSIsIl9kaXNwbGF5RGF0YSIsInVwZGF0ZVdvcmxkTWF0cml4IiwiX2NvbG9yIiwiY2hpbGRBcm1hdHVyZSIsImEiLCJnZXRUZXh0dXJlIiwibmF0aXZlVXJsIiwiX2JsZW5kTW9kZSIsInRleCIsImJsZW5kTW9kZSIsImIiLCJnIiwiciIsIl9sb2NhbFZlcnRpY2VzIiwiX3dvcmxkTWF0cml4IiwibSIsInZsIiwiaWkiLCJpbCIsIkFybWF0dXJlQ2FjaGUiLCJfYW5pbWF0aW9uUG9vbCIsIl9hcm1hdHVyZUNhY2hlIiwiZW5hYmxlUHJpdmF0ZU1vZGUiLCJkaXNwb3NlIiwia2V5IiwiX3JlbW92ZUFybWF0dXJlIiwiYXJtYXR1cmVLZXkiLCJhbmltYXRpb25zQ2FjaGUiLCJhbmlLZXkiLCJhbmltYXRpb25DYWNoZSIsInJlc2V0QXJtYXR1cmUiLCJ1dWlkIiwiaW5kZXhPZiIsImdldEFybWF0dXJlQ2FjaGUiLCJhcm1hdHVyZU5hbWUiLCJhdGxhc1VVSUQiLCJmYWN0b3J5IiwiQ0NGYWN0b3J5IiwiZ2V0SW5zdGFuY2UiLCJwcm94eSIsImJ1aWxkQXJtYXR1cmVEaXNwbGF5IiwiX2FybWF0dXJlIiwiY2FuQ2FjaGUiLCJnZXRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsImhhc0FuaSIsImhhc0FuaW1hdGlvbiIsInBvb2xLZXkiLCJpbnZhbGlkQW5pbWF0aW9uQ2FjaGUiLCJ1cGRhdGVBbmltYXRpb25DYWNoZSIsInNoYXJlZENhY2hlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLFNBQVMsR0FBRyxJQUFJLEVBQXRCO0FBRUEsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQSxJQUFJQyxlQUFlLEdBQUcsQ0FBdEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FBcEI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsSUFBakI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7QUFDQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsQ0FBbkI7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEI7O0FBQ0EsSUFBSUMsRUFBSixFQUFRQyxFQUFSLEVBRUE7OztBQUNBLElBQUlDLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDMUJDLEVBQUFBLElBRDBCLGtCQUNsQjtBQUNKLFNBQUtDLFlBQUwsR0FBb0IsS0FB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Q0FBQyxFQUExQyxFQUE4QztBQUMxQyxRQUFJK0MsSUFBSSxHQUFHRixLQUFLLENBQUM3QyxDQUFELENBQWhCOztBQUNBLFFBQUkrQyxJQUFJLENBQUNxQixhQUFULEVBQXdCO0FBQ3BCLGFBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBQ0QsU0FBTyxJQUFQO0FBQ0gsQ0FURCxFQVdBZ0QsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakMsYUFYakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IE1heENhY2hlVGltZSA9IDMwO1xyXG5jb25zdCBGcmFtZVRpbWUgPSAxIC8gNjA7IFxyXG5cclxubGV0IF92ZXJ0aWNlcyA9IFtdO1xyXG5sZXQgX2luZGljZXMgPSBbXTtcclxubGV0IF9ib25lSW5mb09mZnNldCA9IDA7XHJcbmxldCBfdmVydGV4T2Zmc2V0ID0gMDtcclxubGV0IF9pbmRleE9mZnNldCA9IDA7XHJcbmxldCBfdmZPZmZzZXQgPSAwO1xyXG5sZXQgX3ByZVRleFVybCA9IG51bGw7XHJcbmxldCBfcHJlQmxlbmRNb2RlID0gbnVsbDtcclxubGV0IF9zZWdWQ291bnQgPSAwO1xyXG5sZXQgX3NlZ0lDb3VudCA9IDA7XHJcbmxldCBfc2VnT2Zmc2V0ID0gMDtcclxubGV0IF9jb2xvck9mZnNldCA9IDA7XHJcbmxldCBfcHJlQ29sb3IgPSBudWxsO1xyXG5sZXQgX3gsIF95O1xyXG5cclxuLy9DYWNoZSBhbGwgZnJhbWVzIGluIGFuIGFuaW1hdGlvblxyXG5sZXQgQW5pbWF0aW9uQ2FjaGUgPSBjYy5DbGFzcyh7XHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9wcml2YXRlTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ludmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcmFtZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lSWR4ID0gLTE7XHJcblxyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlSW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdGVtcFNlZ21lbnRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90ZW1wQ29sb3JzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl90ZW1wQm9uZUluZm9zID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCAoYXJtYXR1cmVJbmZvLCBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZUluZm8gPSBhcm1hdHVyZUluZm87XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IGFuaW1hdGlvbk5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIENsZWFyIHRleHR1cmUgcXVvdGUuXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmZyYW1lcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbaV07XHJcbiAgICAgICAgICAgIGZyYW1lLnNlZ21lbnRzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGJlZ2luICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ludmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlSW5mbztcclxuICAgICAgICBsZXQgY3VyQW5pbWF0aW9uQ2FjaGUgPSBhcm1hdHVyZUluZm8uY3VyQW5pbWF0aW9uQ2FjaGU7XHJcbiAgICAgICAgaWYgKGN1ckFuaW1hdGlvbkNhY2hlICYmIGN1ckFuaW1hdGlvbkNhY2hlICE9IHRoaXMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByaXZhdGVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJBbmltYXRpb25DYWNoZS5pbnZhbGlkQWxsRnJhbWUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1ckFuaW1hdGlvbkNhY2hlLnVwZGF0ZVRvRnJhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXJtYXR1cmUgPSBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGFybWF0dXJlLmFuaW1hdGlvbjtcclxuICAgICAgICBhbmltYXRpb24ucGxheSh0aGlzLl9hbmltYXRpb25OYW1lLCAxKTtcclxuXHJcbiAgICAgICAgYXJtYXR1cmVJbmZvLmN1ckFuaW1hdGlvbkNhY2hlID0gdGhpcztcclxuICAgICAgICB0aGlzLl9pbnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVJZHggPSAtMTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmQgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmVlZFRvVXBkYXRlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVJbmZvLmN1ckFuaW1hdGlvbkNhY2hlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZXMubGVuZ3RoID0gdGhpcy5fZnJhbWVJZHggKyAxO1xyXG4gICAgICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9uZWVkVG9VcGRhdGUgKHRvRnJhbWVJZHgpIHtcclxuICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVJbmZvO1xyXG4gICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mby5hcm1hdHVyZTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uID0gYXJtYXR1cmUuYW5pbWF0aW9uO1xyXG4gICAgICAgIHJldHVybiAhYW5pbWF0aW9uLmlzQ29tcGxldGVkICYmIFxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFRpbWUgPCBNYXhDYWNoZVRpbWUgJiYgXHJcbiAgICAgICAgICAgICAgICAodG9GcmFtZUlkeCA9PSB1bmRlZmluZWQgfHwgdGhpcy5fZnJhbWVJZHggPCB0b0ZyYW1lSWR4KTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlVG9GcmFtZSAodG9GcmFtZUlkeCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuYmVnaW4oKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9uZWVkVG9VcGRhdGUodG9GcmFtZUlkeCkpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlSW5mbztcclxuICAgICAgICBsZXQgYXJtYXR1cmUgPSBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgLy8gU29saWQgdXBkYXRlIGZyYW1lIHJhdGUgMS82MC5cclxuICAgICAgICAgICAgYXJtYXR1cmUuYWR2YW5jZVRpbWUoRnJhbWVUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWVJZHgrKztcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlRnJhbWUoYXJtYXR1cmUsIHRoaXMuX2ZyYW1lSWR4KTtcclxuICAgICAgICAgICAgdGhpcy50b3RhbFRpbWUgKz0gRnJhbWVUaW1lO1xyXG4gICAgICAgIH0gd2hpbGUgKHRoaXMuX25lZWRUb1VwZGF0ZSh0b0ZyYW1lSWR4KSk7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmVuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0luaXRlZCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRlZDtcclxuICAgIH0sXHJcblxyXG4gICAgaXNJbnZhbGlkICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZDtcclxuICAgIH0sXHJcblxyXG4gICAgaW52YWxpZEFsbEZyYW1lICgpIHtcclxuICAgICAgICB0aGlzLmlzQ29tcGxldGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faW52YWxpZCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUFsbEZyYW1lICgpIHtcclxuICAgICAgICB0aGlzLmludmFsaWRBbGxGcmFtZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVG9GcmFtZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBlbmFibGVDYWNoZUF0dGFjaGVkSW5mbyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9lbmFibGVDYWNoZUF0dGFjaGVkSW5mbykge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmFibGVDYWNoZUF0dGFjaGVkSW5mbyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlRnJhbWUgKGFybWF0dXJlLCBpbmRleCkge1xyXG4gICAgICAgIF92Zk9mZnNldCA9IDA7XHJcbiAgICAgICAgX2JvbmVJbmZvT2Zmc2V0ID0gMDtcclxuICAgICAgICBfaW5kZXhPZmZzZXQgPSAwO1xyXG4gICAgICAgIF92ZXJ0ZXhPZmZzZXQgPSAwO1xyXG4gICAgICAgIF9wcmVUZXhVcmwgPSBudWxsO1xyXG4gICAgICAgIF9wcmVCbGVuZE1vZGUgPSBudWxsO1xyXG4gICAgICAgIF9zZWdWQ291bnQgPSAwO1xyXG4gICAgICAgIF9zZWdJQ291bnQgPSAwO1xyXG4gICAgICAgIF9zZWdPZmZzZXQgPSAwO1xyXG4gICAgICAgIF9jb2xvck9mZnNldCA9IDA7XHJcbiAgICAgICAgX3ByZUNvbG9yID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5mcmFtZXNbaW5kZXhdID0gdGhpcy5mcmFtZXNbaW5kZXhdIHx8IHtcclxuICAgICAgICAgICAgc2VnbWVudHMgOiBbXSxcclxuICAgICAgICAgICAgY29sb3JzIDogW10sXHJcbiAgICAgICAgICAgIGJvbmVJbmZvcyA6IFtdLFxyXG4gICAgICAgICAgICB2ZXJ0aWNlcyA6IG51bGwsXHJcbiAgICAgICAgICAgIHVpbnRWZXJ0IDogbnVsbCxcclxuICAgICAgICAgICAgaW5kaWNlcyA6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XHJcblxyXG4gICAgICAgIGxldCBzZWdtZW50cyA9IHRoaXMuX3RlbXBTZWdtZW50cyA9IGZyYW1lLnNlZ21lbnRzO1xyXG4gICAgICAgIGxldCBjb2xvcnMgPSB0aGlzLl90ZW1wQ29sb3JzID0gZnJhbWUuY29sb3JzO1xyXG4gICAgICAgIGxldCBib25lSW5mb3MgPSB0aGlzLl90ZW1wQm9uZUluZm9zID0gZnJhbWUuYm9uZUluZm9zO1xyXG4gICAgICAgIHRoaXMuX3RyYXZlcnNlQXJtYXR1cmUoYXJtYXR1cmUsIDEuMCk7XHJcbiAgICAgICAgLy8gQXQgbGFzdCBtdXN0IGhhbmRsZSBwcmUgY29sb3IgYW5kIHNlZ21lbnQuXHJcbiAgICAgICAgLy8gQmVjYXVzZSB2ZXJ0ZXggY291bnQgd2lsbCByaWdodCBhdCB0aGUgZW5kLlxyXG4gICAgICAgIC8vIEhhbmRsZSBwcmUgY29sb3IuXHJcbiAgICAgICAgaWYgKF9jb2xvck9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgY29sb3JzW19jb2xvck9mZnNldCAtIDFdLnZmT2Zmc2V0ID0gX3ZmT2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb2xvcnMubGVuZ3RoID0gX2NvbG9yT2Zmc2V0O1xyXG4gICAgICAgIGJvbmVJbmZvcy5sZW5ndGggPSBfYm9uZUluZm9PZmZzZXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSGFuZGxlIHByZSBzZWdtZW50XHJcbiAgICAgICAgbGV0IHByZVNlZ09mZnNldCA9IF9zZWdPZmZzZXQgLSAxO1xyXG4gICAgICAgIGlmIChwcmVTZWdPZmZzZXQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCBwcmVTZWdJbmZvID0gc2VnbWVudHNbcHJlU2VnT2Zmc2V0XTtcclxuICAgICAgICAgICAgICAgIHByZVNlZ0luZm8uaW5kZXhDb3VudCA9IF9zZWdJQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZmQ291bnQgPSBfc2VnVkNvdW50ICogNTtcclxuICAgICAgICAgICAgICAgIHByZVNlZ0luZm8udmVydGV4Q291bnQgPSBfc2VnVkNvdW50O1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudHMubGVuZ3RoID0gX3NlZ09mZnNldDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnRzLmxlbmd0aCA9IF9zZWdPZmZzZXQgLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEaXNjYXJkIGFsbCBzZWdtZW50cy5cclxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEZpbGwgdmVydGljZXNcclxuICAgICAgICBsZXQgdmVydGljZXMgPSBmcmFtZS52ZXJ0aWNlcztcclxuICAgICAgICBsZXQgdWludFZlcnQgPSBmcmFtZS51aW50VmVydDtcclxuICAgICAgICBpZiAoIXZlcnRpY2VzIHx8IHZlcnRpY2VzLmxlbmd0aCA8IF92Zk9mZnNldCkge1xyXG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IGZyYW1lLnZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShfdmZPZmZzZXQpO1xyXG4gICAgICAgICAgICB1aW50VmVydCA9IGZyYW1lLnVpbnRWZXJ0ID0gbmV3IFVpbnQzMkFycmF5KHZlcnRpY2VzLmJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCBfdmZPZmZzZXQ7KSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2VzW2krK10gPSBfdmVydGljZXNbaisrXTsgLy8geFxyXG4gICAgICAgICAgICB2ZXJ0aWNlc1tpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIHlcclxuICAgICAgICAgICAgdmVydGljZXNbaSsrXSA9IF92ZXJ0aWNlc1tqKytdOyAvLyB1XHJcbiAgICAgICAgICAgIHZlcnRpY2VzW2krK10gPSBfdmVydGljZXNbaisrXTsgLy8gdlxyXG4gICAgICAgICAgICB1aW50VmVydFtpKytdID0gX3ZlcnRpY2VzW2orK107IC8vIGNvbG9yXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaWxsIGluZGljZXNcclxuICAgICAgICBsZXQgaW5kaWNlcyA9IGZyYW1lLmluZGljZXM7XHJcbiAgICAgICAgaWYgKCFpbmRpY2VzIHx8IGluZGljZXMubGVuZ3RoIDwgX2luZGV4T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIGluZGljZXMgPSBmcmFtZS5pbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KF9pbmRleE9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9pbmRleE9mZnNldDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGluZGljZXNbaV0gPSBfaW5kaWNlc1tpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZyYW1lLnZlcnRpY2VzID0gdmVydGljZXM7XHJcbiAgICAgICAgZnJhbWUudWludFZlcnQgPSB1aW50VmVydDtcclxuICAgICAgICBmcmFtZS5pbmRpY2VzID0gaW5kaWNlcztcclxuICAgIH0sXHJcblxyXG4gICAgX3RyYXZlcnNlQXJtYXR1cmUgKGFybWF0dXJlLCBwYXJlbnRPcGFjaXR5KSB7XHJcbiAgICAgICAgbGV0IGNvbG9ycyA9IHRoaXMuX3RlbXBDb2xvcnM7XHJcbiAgICAgICAgbGV0IHNlZ21lbnRzID0gdGhpcy5fdGVtcFNlZ21lbnRzO1xyXG4gICAgICAgIGxldCBib25lSW5mb3MgPSB0aGlzLl90ZW1wQm9uZUluZm9zO1xyXG4gICAgICAgIGxldCBnVmVydGljZXMgPSBfdmVydGljZXM7XHJcbiAgICAgICAgbGV0IGdJbmRpY2VzID0gX2luZGljZXM7XHJcbiAgICAgICAgbGV0IHNsb3RWZXJ0aWNlcywgc2xvdEluZGljZXM7XHJcbiAgICAgICAgbGV0IHNsb3RzID0gYXJtYXR1cmUuX3Nsb3RzLCBzbG90LCBzbG90TWF0cml4LCBzbG90TWF0cml4bSwgc2xvdENvbG9yLCBjb2xvclZhbDtcclxuICAgICAgICBsZXQgdGV4dHVyZTtcclxuICAgICAgICBsZXQgcHJlU2VnT2Zmc2V0LCBwcmVTZWdJbmZvO1xyXG4gICAgICAgIGxldCBib25lcyA9IGFybWF0dXJlLl9ib25lcztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYm9uZXMubGVuZ3RoOyBpIDwgbDsgaSsrLCBfYm9uZUluZm9PZmZzZXQrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvbmUgPSBib25lc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBib25lSW5mbyA9IGJvbmVJbmZvc1tfYm9uZUluZm9PZmZzZXRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFib25lSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvbmVJbmZvID0gYm9uZUluZm9zW19ib25lSW5mb09mZnNldF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbFRyYW5zZm9ybU1hdHJpeDogbmV3IGRyYWdvbkJvbmVzLk1hdHJpeCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9uZU1hdCA9IGJvbmUuZ2xvYmFsVHJhbnNmb3JtTWF0cml4O1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhY2hlQm9uZU1hdCA9IGJvbmVJbmZvLmdsb2JhbFRyYW5zZm9ybU1hdHJpeDtcclxuICAgICAgICAgICAgICAgIGNhY2hlQm9uZU1hdC5jb3B5RnJvbShib25lTWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzbG90cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgc2xvdCA9IHNsb3RzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXNsb3QuX3Zpc2libGUgfHwgIXNsb3QuX2Rpc3BsYXlEYXRhKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIHNsb3QudXBkYXRlV29ybGRNYXRyaXgoKTtcclxuICAgICAgICAgICAgc2xvdENvbG9yID0gc2xvdC5fY29sb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2xvdC5jaGlsZEFybWF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90cmF2ZXJzZUFybWF0dXJlKHNsb3QuY2hpbGRBcm1hdHVyZSwgcGFyZW50T3BhY2l0eSAqIHNsb3RDb2xvci5hIC8gMjU1KTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0ZXh0dXJlID0gc2xvdC5nZXRUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIGlmICghdGV4dHVyZSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoX3ByZVRleFVybCAhPT0gdGV4dHVyZS5uYXRpdmVVcmwgfHwgX3ByZUJsZW5kTW9kZSAhPT0gc2xvdC5fYmxlbmRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBfcHJlVGV4VXJsID0gdGV4dHVyZS5uYXRpdmVVcmw7XHJcbiAgICAgICAgICAgICAgICBfcHJlQmxlbmRNb2RlID0gc2xvdC5fYmxlbmRNb2RlO1xyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHByZSBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgcHJlU2VnT2Zmc2V0ID0gX3NlZ09mZnNldCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJlU2VnT2Zmc2V0ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3NlZ0lDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlU2VnSW5mbyA9IHNlZ21lbnRzW3ByZVNlZ09mZnNldF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8uaW5kZXhDb3VudCA9IF9zZWdJQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVNlZ0luZm8udmVydGV4Q291bnQgPSBfc2VnVkNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVTZWdJbmZvLnZmQ291bnQgPSBfc2VnVkNvdW50ICogNTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEaXNjYXJkIHByZSBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VnT2Zmc2V0LS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIG5vdyBzZWdtZW50LlxyXG4gICAgICAgICAgICAgICAgc2VnbWVudHNbX3NlZ09mZnNldF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4IDogdGV4dHVyZSxcclxuICAgICAgICAgICAgICAgICAgICBibGVuZE1vZGUgOiBzbG90Ll9ibGVuZE1vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhDb3VudCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4Q291bnQgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZmQ291bnQgOiAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgX3NlZ09mZnNldCsrO1xyXG4gICAgICAgICAgICAgICAgX3NlZ0lDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBfc2VnVkNvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29sb3JWYWwgPSAoKHNsb3RDb2xvci5hICogcGFyZW50T3BhY2l0eSA8PCAyNCkgPj4+IDApICsgKHNsb3RDb2xvci5iIDw8IDE2KSArIChzbG90Q29sb3IuZyA8PCA4KSArIHNsb3RDb2xvci5yO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9wcmVDb2xvciAhPT0gY29sb3JWYWwpIHtcclxuICAgICAgICAgICAgICAgIF9wcmVDb2xvciA9IGNvbG9yVmFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jb2xvck9mZnNldCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcnNbX2NvbG9yT2Zmc2V0IC0gMV0udmZPZmZzZXQgPSBfdmZPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb2xvcnNbX2NvbG9yT2Zmc2V0KytdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHIgOiBzbG90Q29sb3IucixcclxuICAgICAgICAgICAgICAgICAgICBnIDogc2xvdENvbG9yLmcsXHJcbiAgICAgICAgICAgICAgICAgICAgYiA6IHNsb3RDb2xvci5iLFxyXG4gICAgICAgICAgICAgICAgICAgIGEgOiBzbG90Q29sb3IuYSAqIHBhcmVudE9wYWNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgdmZPZmZzZXQgOiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsb3RWZXJ0aWNlcyA9IHNsb3QuX2xvY2FsVmVydGljZXM7XHJcbiAgICAgICAgICAgIHNsb3RJbmRpY2VzID0gc2xvdC5faW5kaWNlcztcclxuXHJcbiAgICAgICAgICAgIHNsb3RNYXRyaXggPSBzbG90Ll93b3JsZE1hdHJpeDtcclxuICAgICAgICAgICAgc2xvdE1hdHJpeG0gPSBzbG90TWF0cml4Lm07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgdmwgPSBzbG90VmVydGljZXMubGVuZ3RoOyBqIDwgdmw7KSB7XHJcbiAgICAgICAgICAgICAgICBfeCA9IHNsb3RWZXJ0aWNlc1tqKytdO1xyXG4gICAgICAgICAgICAgICAgX3kgPSBzbG90VmVydGljZXNbaisrXTtcclxuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBfeCAqIHNsb3RNYXRyaXhtWzBdICsgX3kgKiBzbG90TWF0cml4bVs0XSArIHNsb3RNYXRyaXhtWzEyXTtcclxuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBfeCAqIHNsb3RNYXRyaXhtWzFdICsgX3kgKiBzbG90TWF0cml4bVs1XSArIHNsb3RNYXRyaXhtWzEzXTtcclxuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBzbG90VmVydGljZXNbaisrXTtcclxuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBzbG90VmVydGljZXNbaisrXTtcclxuICAgICAgICAgICAgICAgIGdWZXJ0aWNlc1tfdmZPZmZzZXQrK10gPSBjb2xvclZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVGhpcyBwbGFjZSBtdXN0IHVzZSBzZWdtZW50IHZlcnRleCBjb3VudCB0byBjYWxjdWxhdGUgdmVydGV4IG9mZnNldC5cclxuICAgICAgICAgICAgLy8gQXNzZW1ibGVyIHdpbGwgY2FsY3VsYXRlIHZlcnRleCBvZmZzZXQgYWdhaW4gZm9yIGRpZmZlcmVudCBzZWdtZW50LlxyXG4gICAgICAgICAgICBmb3IgKGxldCBpaSA9IDAsIGlsID0gc2xvdEluZGljZXMubGVuZ3RoOyBpaSA8IGlsOyBpaSArKykge1xyXG4gICAgICAgICAgICAgICAgZ0luZGljZXNbX2luZGV4T2Zmc2V0KytdID0gX3NlZ1ZDb3VudCArIHNsb3RJbmRpY2VzW2lpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX3ZlcnRleE9mZnNldCA9IF92Zk9mZnNldCAvIDU7XHJcbiAgICAgICAgICAgIF9zZWdJQ291bnQgKz0gc2xvdEluZGljZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBfc2VnVkNvdW50ICs9IHNsb3RWZXJ0aWNlcy5sZW5ndGggLyA0O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxubGV0IEFybWF0dXJlQ2FjaGUgPSBjYy5DbGFzcyh7XHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9wcml2YXRlTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvblBvb2wgPSB7fTtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGVuYWJsZVByaXZhdGVNb2RlICgpIHtcclxuICAgICAgICB0aGlzLl9wcml2YXRlTW9kZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElmIGNhY2hlIGlzIHByaXZhdGUsIGNhY2hlIHdpbGwgYmUgZGVzdHJveSB3aGVuIGRyYWdvbmJvbmVzIG5vZGUgZGVzdHJveS5cclxuICAgIGRpc3Bvc2UgKCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9hcm1hdHVyZUNhY2hlKSB7XHJcbiAgICAgICAgICAgIHZhciBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhcm1hdHVyZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mby5hcm1hdHVyZTtcclxuICAgICAgICAgICAgICAgIGFybWF0dXJlICYmIGFybWF0dXJlLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZUFybWF0dXJlIChhcm1hdHVyZUtleSkge1xyXG4gICAgICAgIHZhciBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gYXJtYXR1cmVJbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICBmb3IgKHZhciBhbmlLZXkgaW4gYW5pbWF0aW9uc0NhY2hlKSB7XHJcbiAgICAgICAgICAgIC8vIENsZWFyIGNhY2hlIHRleHR1cmUsIGFuZCBwdXQgY2FjaGUgaW50byBwb29sLlxyXG4gICAgICAgICAgICAvLyBObyBuZWVkIHRvIGNyZWF0ZSBUeXBlZEFycmF5IG5leHQgdGltZS5cclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbkNhY2hlID0gYW5pbWF0aW9uc0NhY2hlW2FuaUtleV07XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25Qb29sW2FybWF0dXJlS2V5ICsgXCIjXCIgKyBhbmlLZXldID0gYW5pbWF0aW9uQ2FjaGU7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJtYXR1cmUgPSBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XHJcbiAgICAgICAgYXJtYXR1cmUgJiYgYXJtYXR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gV2hlbiBkYiBhc3NldHMgYmUgZGVzdHJveSwgcmVtb3ZlIGFybWF0dXJlIGZyb20gZGIgY2FjaGUuXHJcbiAgICByZXNldEFybWF0dXJlICh1dWlkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYXJtYXR1cmVLZXkgaW4gdGhpcy5fYXJtYXR1cmVDYWNoZSkge1xyXG4gICAgICAgICAgICBpZiAoYXJtYXR1cmVLZXkuaW5kZXhPZih1dWlkKSA9PSAtMSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUFybWF0dXJlKGFybWF0dXJlS2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFybWF0dXJlQ2FjaGUgKGFybWF0dXJlTmFtZSwgYXJtYXR1cmVLZXksIGF0bGFzVVVJRCkge1xyXG4gICAgICAgIGxldCBhcm1hdHVyZUluZm8gPSB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XTtcclxuICAgICAgICBsZXQgYXJtYXR1cmU7XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZUluZm8pIHtcclxuICAgICAgICAgICAgbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgbGV0IHByb3h5ID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShhcm1hdHVyZU5hbWUsIGFybWF0dXJlS2V5LCBcIlwiLCBhdGxhc1VVSUQpO1xyXG4gICAgICAgICAgICBpZiAoIXByb3h5IHx8ICFwcm94eS5fYXJtYXR1cmUpIHJldHVybjtcclxuICAgICAgICAgICAgYXJtYXR1cmUgPSBwcm94eS5fYXJtYXR1cmU7XHJcbiAgICAgICAgICAgIC8vIElmIGFybWF0dXJlIGhhcyBjaGlsZCBhcm1hdHVyZSwgY2FuIG5vdCBiZSBjYWNoZSwgYmVjYXVzZSBpdCdzXHJcbiAgICAgICAgICAgIC8vIGFuaW1hdGlvbiBkYXRhIGNhbiBub3QgYmUgcHJlY29tcHV0ZS5cclxuICAgICAgICAgICAgaWYgKCFBcm1hdHVyZUNhY2hlLmNhbkNhY2hlKGFybWF0dXJlKSkge1xyXG4gICAgICAgICAgICAgICAgYXJtYXR1cmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlW2FybWF0dXJlS2V5XSA9IHtcclxuICAgICAgICAgICAgICAgIGFybWF0dXJlIDogYXJtYXR1cmUsXHJcbiAgICAgICAgICAgICAgICAvLyBDYWNoZSBhbGwga2luZHMgb2YgYW5pbWF0aW9uIGZyYW1lLlxyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhcm1hdHVyZSBpcyBkaXNwb3NlLCBjbGVhciBhbGwgYW5pbWF0aW9uIGNhY2hlLlxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uc0NhY2hlIDoge30sXHJcbiAgICAgICAgICAgICAgICBjdXJBbmltYXRpb25DYWNoZTogbnVsbCxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcm1hdHVyZSA9IGFybWF0dXJlSW5mby5hcm1hdHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFybWF0dXJlO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRBbmltYXRpb25DYWNoZSAoYXJtYXR1cmVLZXksIGFuaW1hdGlvbk5hbWUpIHtcclxuICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVDYWNoZVthcm1hdHVyZUtleV07XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZUluZm8pIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgYW5pbWF0aW9uc0NhY2hlID0gYXJtYXR1cmVJbmZvLmFuaW1hdGlvbnNDYWNoZTtcclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uc0NhY2hlW2FuaW1hdGlvbk5hbWVdO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0QW5pbWF0aW9uQ2FjaGUgKGFybWF0dXJlS2V5LCBhbmltYXRpb25OYW1lKSB7XHJcbiAgICAgICAgaWYgKCFhbmltYXRpb25OYW1lKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGFybWF0dXJlSW5mbyA9IHRoaXMuX2FybWF0dXJlQ2FjaGVbYXJtYXR1cmVLZXldO1xyXG4gICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mbyAmJiBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGFybWF0dXJlLmFuaW1hdGlvbjtcclxuICAgICAgICBsZXQgaGFzQW5pID0gYW5pbWF0aW9uLmhhc0FuaW1hdGlvbihhbmltYXRpb25OYW1lKTtcclxuICAgICAgICBpZiAoIWhhc0FuaSkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBhbmltYXRpb25zQ2FjaGUgPSBhcm1hdHVyZUluZm8uYW5pbWF0aW9uc0NhY2hlO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25DYWNoZSA9IGFuaW1hdGlvbnNDYWNoZVthbmltYXRpb25OYW1lXTtcclxuICAgICAgICBpZiAoIWFuaW1hdGlvbkNhY2hlKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGNhY2hlIGV4aXN0IGluIHBvb2wsIHRoZW4ganVzdCB1c2UgaXQuXHJcbiAgICAgICAgICAgIGxldCBwb29sS2V5ID0gYXJtYXR1cmVLZXkgKyBcIiNcIiArIGFuaW1hdGlvbk5hbWU7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gdGhpcy5fYW5pbWF0aW9uUG9vbFtwb29sS2V5XTtcclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYW5pbWF0aW9uUG9vbFtwb29sS2V5XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkNhY2hlID0gbmV3IEFuaW1hdGlvbkNhY2hlKCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25DYWNoZS5fcHJpdmF0ZU1vZGUgPSB0aGlzLl9wcml2YXRlTW9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmltYXRpb25DYWNoZS5pbml0KGFybWF0dXJlSW5mbywgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbnNDYWNoZVthbmltYXRpb25OYW1lXSA9IGFuaW1hdGlvbkNhY2hlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5pbWF0aW9uQ2FjaGU7XHJcbiAgICB9LFxyXG5cclxuICAgIGludmFsaWRBbmltYXRpb25DYWNoZSAoYXJtYXR1cmVLZXkpIHtcclxuICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVDYWNoZVthcm1hdHVyZUtleV07XHJcbiAgICAgICAgbGV0IGFybWF0dXJlID0gYXJtYXR1cmVJbmZvICYmIGFybWF0dXJlSW5mby5hcm1hdHVyZTtcclxuICAgICAgICBpZiAoIWFybWF0dXJlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IGFybWF0dXJlSW5mby5hbmltYXRpb25zQ2FjaGU7XHJcbiAgICAgICAgZm9yICh2YXIgYW5pS2V5IGluIGFuaW1hdGlvbnNDYWNoZSkge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSBhbmltYXRpb25zQ2FjaGVbYW5pS2V5XTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUuaW52YWxpZEFsbEZyYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVBbmltYXRpb25DYWNoZSAoYXJtYXR1cmVLZXksIGFuaW1hdGlvbk5hbWUpIHtcclxuICAgICAgICBpZiAoYW5pbWF0aW9uTmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uQ2FjaGUgPSB0aGlzLmluaXRBbmltYXRpb25DYWNoZShhcm1hdHVyZUtleSwgYW5pbWF0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uQ2FjaGUpIHJldHVybjtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUudXBkYXRlQWxsRnJhbWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYXJtYXR1cmVJbmZvID0gdGhpcy5fYXJtYXR1cmVDYWNoZVthcm1hdHVyZUtleV07XHJcbiAgICAgICAgICAgIGxldCBhcm1hdHVyZSA9IGFybWF0dXJlSW5mbyAmJiBhcm1hdHVyZUluZm8uYXJtYXR1cmU7XHJcbiAgICAgICAgICAgIGlmICghYXJtYXR1cmUpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFuaW1hdGlvbnNDYWNoZSA9IGFybWF0dXJlSW5mby5hbmltYXRpb25zQ2FjaGU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFuaUtleSBpbiBhbmltYXRpb25zQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb25DYWNoZSA9IGFuaW1hdGlvbnNDYWNoZVthbmlLZXldO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uQ2FjaGUudXBkYXRlQWxsRnJhbWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuQXJtYXR1cmVDYWNoZS5GcmFtZVRpbWUgPSBGcmFtZVRpbWU7XHJcbkFybWF0dXJlQ2FjaGUuc2hhcmVkQ2FjaGUgPSBuZXcgQXJtYXR1cmVDYWNoZSgpO1xyXG5Bcm1hdHVyZUNhY2hlLmNhbkNhY2hlID0gZnVuY3Rpb24gKGFybWF0dXJlKSB7XHJcbiAgICBsZXQgc2xvdHMgPSBhcm1hdHVyZS5fc2xvdHM7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNsb3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGxldCBzbG90ID0gc2xvdHNbaV07XHJcbiAgICAgICAgaWYgKHNsb3QuY2hpbGRBcm1hdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0sXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFybWF0dXJlQ2FjaGU7Il0sInNvdXJjZVJvb3QiOiIvIn0=