
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/dynamic-atlas/atlas.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var RenderTexture = require('../../../assets/CCRenderTexture');

var space = 2;

function Atlas(width, height) {
  var texture = new RenderTexture();
  texture.initWithSize(width, height);
  texture.update();
  this._texture = texture;
  this._x = space;
  this._y = space;
  this._nexty = space;
  this._width = width;
  this._height = height;
  this._innerTextureInfos = {};
  this._innerSpriteFrames = [];
  this._count = 0;
}

Atlas.DEFAULT_HASH = new RenderTexture()._getHash();
cc.js.mixin(Atlas.prototype, {
  insertSpriteFrame: function insertSpriteFrame(spriteFrame) {
    var rect = spriteFrame._rect,
        texture = spriteFrame._texture,
        info = this._innerTextureInfos[texture._id];
    var sx = rect.x,
        sy = rect.y;

    if (info) {
      sx += info.x;
      sy += info.y;
    } else {
      var width = texture.width,
          height = texture.height;

      if (this._x + width + space > this._width) {
        this._x = space;
        this._y = this._nexty;
      }

      if (this._y + height + space > this._nexty) {
        this._nexty = this._y + height + space;
      }

      if (this._nexty > this._height) {
        return null;
      } // texture bleeding


      if (cc.dynamicAtlasManager.textureBleeding) {
        // Smaller frame is more likely to be affected by linear filter
        if (width <= 8 || height <= 8) {
          this._texture.drawTextureAt(texture, this._x - 1, this._y - 1);

          this._texture.drawTextureAt(texture, this._x - 1, this._y + 1);

          this._texture.drawTextureAt(texture, this._x + 1, this._y - 1);

          this._texture.drawTextureAt(texture, this._x + 1, this._y + 1);
        }

        this._texture.drawTextureAt(texture, this._x - 1, this._y);

        this._texture.drawTextureAt(texture, this._x + 1, this._y);

        this._texture.drawTextureAt(texture, this._x, this._y - 1);

        this._texture.drawTextureAt(texture, this._x, this._y + 1);
      }

      this._texture.drawTextureAt(texture, this._x, this._y);

      this._innerTextureInfos[texture._id] = {
        x: this._x,
        y: this._y,
        texture: texture
      };
      this._count++;
      sx += this._x;
      sy += this._y;
      this._x += width + space;
      this._dirty = true;
    }

    var frame = {
      x: sx,
      y: sy,
      texture: this._texture
    };

    this._innerSpriteFrames.push(spriteFrame);

    return frame;
  },
  update: function update() {
    if (!this._dirty) return;

    this._texture.update();

    this._dirty = false;
  },
  deleteInnerTexture: function deleteInnerTexture(texture) {
    if (texture && this._innerTextureInfos[texture._id]) {
      delete this._innerTextureInfos[texture._id];
      this._count--;
    }
  },
  isEmpty: function isEmpty() {
    return this._count <= 0;
  },
  reset: function reset() {
    this._x = space;
    this._y = space;
    this._nexty = space;
    var frames = this._innerSpriteFrames;

    for (var i = 0, l = frames.length; i < l; i++) {
      var frame = frames[i];

      if (!frame.isValid) {
        continue;
      }

      frame._resetDynamicAtlasFrame();
    }

    this._innerSpriteFrames.length = 0;
    this._innerTextureInfos = {};
  },
  destroy: function destroy() {
    this.reset();

    this._texture.destroy();
  }
});
module.exports = Atlas;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx1dGlsc1xcZHluYW1pYy1hdGxhc1xcYXRsYXMuanMiXSwibmFtZXMiOlsiUmVuZGVyVGV4dHVyZSIsInJlcXVpcmUiLCJzcGFjZSIsIkF0bGFzIiwid2lkdGgiLCJoZWlnaHQiLCJ0ZXh0dXJlIiwiaW5pdFdpdGhTaXplIiwidXBkYXRlIiwiX3RleHR1cmUiLCJfeCIsIl95IiwiX25leHR5IiwiX3dpZHRoIiwiX2hlaWdodCIsIl9pbm5lclRleHR1cmVJbmZvcyIsIl9pbm5lclNwcml0ZUZyYW1lcyIsIl9jb3VudCIsIkRFRkFVTFRfSEFTSCIsIl9nZXRIYXNoIiwiY2MiLCJqcyIsIm1peGluIiwicHJvdG90eXBlIiwiaW5zZXJ0U3ByaXRlRnJhbWUiLCJzcHJpdGVGcmFtZSIsInJlY3QiLCJfcmVjdCIsImluZm8iLCJfaWQiLCJzeCIsIngiLCJzeSIsInkiLCJkeW5hbWljQXRsYXNNYW5hZ2VyIiwidGV4dHVyZUJsZWVkaW5nIiwiZHJhd1RleHR1cmVBdCIsIl9kaXJ0eSIsImZyYW1lIiwicHVzaCIsImRlbGV0ZUlubmVyVGV4dHVyZSIsImlzRW1wdHkiLCJyZXNldCIsImZyYW1lcyIsImkiLCJsIiwibGVuZ3RoIiwiaXNWYWxpZCIsIl9yZXNldER5bmFtaWNBdGxhc0ZyYW1lIiwiZGVzdHJveSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxhQUFhLEdBQUdDLE9BQU8sQ0FBQyxpQ0FBRCxDQUE3Qjs7QUFFQSxJQUFNQyxLQUFLLEdBQUcsQ0FBZDs7QUFFQSxTQUFTQyxLQUFULENBQWdCQyxLQUFoQixFQUF1QkMsTUFBdkIsRUFBK0I7QUFDM0IsTUFBSUMsT0FBTyxHQUFHLElBQUlOLGFBQUosRUFBZDtBQUNBTSxFQUFBQSxPQUFPLENBQUNDLFlBQVIsQ0FBcUJILEtBQXJCLEVBQTRCQyxNQUE1QjtBQUNBQyxFQUFBQSxPQUFPLENB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d0MsT0FBZDtBQUNIO0FBOUd3QixDQUE3QjtBQWlIQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCaEQsS0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZW5kZXJUZXh0dXJlID0gcmVxdWlyZSgnLi4vLi4vLi4vYXNzZXRzL0NDUmVuZGVyVGV4dHVyZScpO1xyXG5cclxuY29uc3Qgc3BhY2UgPSAyO1xyXG5cclxuZnVuY3Rpb24gQXRsYXMgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIGxldCB0ZXh0dXJlID0gbmV3IFJlbmRlclRleHR1cmUoKTtcclxuICAgIHRleHR1cmUuaW5pdFdpdGhTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgdGV4dHVyZS51cGRhdGUoKTtcclxuICAgIFxyXG4gICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XHJcblxyXG4gICAgdGhpcy5feCA9IHNwYWNlO1xyXG4gICAgdGhpcy5feSA9IHNwYWNlO1xyXG4gICAgdGhpcy5fbmV4dHkgPSBzcGFjZTtcclxuXHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuX2lubmVyVGV4dHVyZUluZm9zID0ge307XHJcbiAgICB0aGlzLl9pbm5lclNwcml0ZUZyYW1lcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuX2NvdW50ID0gMDtcclxufVxyXG5cclxuQXRsYXMuREVGQVVMVF9IQVNIID0gKG5ldyBSZW5kZXJUZXh0dXJlKCkpLl9nZXRIYXNoKCk7XHJcblxyXG5jYy5qcy5taXhpbihBdGxhcy5wcm90b3R5cGUsIHtcclxuICAgIGluc2VydFNwcml0ZUZyYW1lIChzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgIGxldCByZWN0ID0gc3ByaXRlRnJhbWUuX3JlY3QsXHJcbiAgICAgICAgICAgIHRleHR1cmUgPSBzcHJpdGVGcmFtZS5fdGV4dHVyZSxcclxuICAgICAgICAgICAgaW5mbyA9IHRoaXMuX2lubmVyVGV4dHVyZUluZm9zW3RleHR1cmUuX2lkXTtcclxuXHJcbiAgICAgICAgbGV0IHN4ID0gcmVjdC54LCBzeSA9IHJlY3QueTtcclxuXHJcbiAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgc3ggKz0gaW5mby54O1xyXG4gICAgICAgICAgICBzeSArPSBpbmZvLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgd2lkdGggPSB0ZXh0dXJlLndpZHRoLCBoZWlnaHQgPSB0ZXh0dXJlLmhlaWdodDsgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLl94ICsgd2lkdGggKyBzcGFjZSkgPiB0aGlzLl93aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHNwYWNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX25leHR5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuX3kgKyBoZWlnaHQgKyBzcGFjZSkgPiB0aGlzLl9uZXh0eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dHkgPSB0aGlzLl95ICsgaGVpZ2h0ICsgc3BhY2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0eSA+IHRoaXMuX2hlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHRleHR1cmUgYmxlZWRpbmdcclxuICAgICAgICAgICAgaWYgKGNjLmR5bmFtaWNBdGxhc01hbmFnZXIudGV4dHVyZUJsZWVkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTbWFsbGVyIGZyYW1lIGlzIG1vcmUgbGlrZWx5IHRvIGJlIGFmZmVjdGVkIGJ5IGxpbmVhciBmaWx0ZXJcclxuICAgICAgICAgICAgICAgIGlmICh3aWR0aCA8PSA4IHx8IGhlaWdodCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5kcmF3VGV4dHVyZUF0KHRleHR1cmUsIHRoaXMuX3gtMSwgdGhpcy5feS0xKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0dXJlLmRyYXdUZXh0dXJlQXQodGV4dHVyZSwgdGhpcy5feC0xLCB0aGlzLl95KzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHR1cmUuZHJhd1RleHR1cmVBdCh0ZXh0dXJlLCB0aGlzLl94KzEsIHRoaXMuX3ktMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5kcmF3VGV4dHVyZUF0KHRleHR1cmUsIHRoaXMuX3grMSwgdGhpcy5feSsxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0dXJlLmRyYXdUZXh0dXJlQXQodGV4dHVyZSwgdGhpcy5feC0xLCB0aGlzLl95KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RleHR1cmUuZHJhd1RleHR1cmVBdCh0ZXh0dXJlLCB0aGlzLl94KzEsIHRoaXMuX3kpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5kcmF3VGV4dHVyZUF0KHRleHR1cmUsIHRoaXMuX3gsIHRoaXMuX3ktMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0dXJlLmRyYXdUZXh0dXJlQXQodGV4dHVyZSwgdGhpcy5feCwgdGhpcy5feSsxKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5kcmF3VGV4dHVyZUF0KHRleHR1cmUsIHRoaXMuX3gsIHRoaXMuX3kpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5uZXJUZXh0dXJlSW5mb3NbdGV4dHVyZS5faWRdID0ge1xyXG4gICAgICAgICAgICAgICAgeDogdGhpcy5feCxcclxuICAgICAgICAgICAgICAgIHk6IHRoaXMuX3ksXHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlOiB0ZXh0dXJlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgc3ggKz0gdGhpcy5feDtcclxuICAgICAgICAgICAgc3kgKz0gdGhpcy5feTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ggKz0gd2lkdGggKyBzcGFjZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcmFtZSA9IHtcclxuICAgICAgICAgICAgeDogc3gsXHJcbiAgICAgICAgICAgIHk6IHN5LFxyXG4gICAgICAgICAgICB0ZXh0dXJlOiB0aGlzLl90ZXh0dXJlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2lubmVyU3ByaXRlRnJhbWVzLnB1c2goc3ByaXRlRnJhbWUpO1xyXG5cclxuICAgICAgICByZXR1cm4gZnJhbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXJ0eSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUudXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVsZXRlSW5uZXJUZXh0dXJlICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgaWYgKHRleHR1cmUgJiYgdGhpcy5faW5uZXJUZXh0dXJlSW5mb3NbdGV4dHVyZS5faWRdKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9pbm5lclRleHR1cmVJbmZvc1t0ZXh0dXJlLl9pZF07XHJcbiAgICAgICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpc0VtcHR5ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnQgPD0gMDtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlc2V0ICgpIHtcclxuICAgICAgICB0aGlzLl94ID0gc3BhY2U7XHJcbiAgICAgICAgdGhpcy5feSA9IHNwYWNlO1xyXG4gICAgICAgIHRoaXMuX25leHR5ID0gc3BhY2U7XHJcblxyXG4gICAgICAgIGxldCBmcmFtZXMgPSB0aGlzLl9pbm5lclNwcml0ZUZyYW1lcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZyYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZyYW1lID0gZnJhbWVzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWZyYW1lLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZyYW1lLl9yZXNldER5bmFtaWNBdGxhc0ZyYW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2lubmVyU3ByaXRlRnJhbWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5faW5uZXJUZXh0dXJlSW5mb3MgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmUuZGVzdHJveSgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXRsYXM7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9