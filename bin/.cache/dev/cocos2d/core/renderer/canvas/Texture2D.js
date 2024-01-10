
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/Texture2D.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
var Texture2D = function Texture2D(device, options) {
  this._device = device;
  this._width = 4;
  this._height = 4;
  this._image = null;

  if (options) {
    if (options.width !== undefined) {
      this._width = options.width;
    }

    if (options.height !== undefined) {
      this._height = options.height;
    }

    this.updateImage(options);
  }
};

Texture2D.prototype.update = function update(options) {
  this.updateImage(options);
};

Texture2D.prototype.updateImage = function updateImage(options) {
  if (options.images && options.images[0]) {
    var image = options.images[0];

    if (image && image !== this._image) {
      this._image = image;
    }
  }
};

Texture2D.prototype.destroy = function destroy() {
  this._image = null;
};

module.exports = Texture2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXFRleHR1cmUyRC5qcyJdLCJuYW1lcyI6WyJUZXh0dXJlMkQiLCJkZXZpY2UiLCJvcHRpb25zIiwiX2RldmljZSIsIl93aWR0aCIsIl9oZWlnaHQiLCJfaW1hZ2UiLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsInVwZGF0ZUltYWdlIiwicHJvdG90eXBlIiwidXBkYXRlIiwiaW1hZ2VzIiwiaW1hZ2UiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBO0FBRUEsSUFBSUEsU0FBUyxHQUFHLFNBQVNBLFNBQVQsQ0FBbUJDLE1BQW5CLEVBQTJCQyxPQUEzQixFQUFvQztBQUNsRCxPQUFLQyxPQUFMLEdBQWVGLE1BQWY7QUFFQSxPQUFLRyxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLE9BQUwsR0FBZSxDQUFmO0FBRUEsT0FBS0MsTUFBTCxHQUFjLElBQWQ7O0FBRUEsTUFBSUosT0FBSixFQUFhO0FBQ1gsUUFBSUEsT0FBTyxDQUFDSyxLQUFSLEtBQWtCQyxTQUF0QixFQUFpQztBQUMvQixXQUFLSixNQUFMLEdBQWNGLE9BQU8sQ0FBQ0ssS0FBdEI7QUFDRDs7QUFDRCxRQUFJTCxPQUFPLENBQUNPLE1BQVIsS0FBbUJELFNBQXZCLEVBQWtDO0FBQ2hDLFdBQUtILE9BQUwsR0FBZUgsT0FBTyxDQUFDTyxNQUF2QjtBQUNEOztBQUVELFNBQUtDLFdBQUwsQ0FBaUJSLE9BQWpCO0FBQ0Q7QUFDRixDQWxCRDs7QUFvQkFGLFNBQVMsQ0FBQ1csU0FBVixDQUFvQkMsTUFBcEIsR0FBNkIsU0FBU0EsTUFBVCxDQUFpQlYsT0FBakIsRUFBMEI7QUFDckQsT0FBS1EsV0FBTCxDQUFpQlIsT0FBakI7QUFDRCxDQUZEOztBQUlBRixTQUFTLENBQUNXLFNBQVYsQ0FBb0JELFdBQXBCLEdBQWtDLFNBQVNBLFdBQVQsQ0FBc0JSLE9BQXRCLEVBQStCO0FBQy9ELE1BQUlBLE9BQU8sQ0FBQ1csTUFBUixJQUFrQlgsT0FBTyxDQUFDVyxNQUFSLENBQWUsQ0FBZixDQUF0QixFQUF5QztBQUN2QyxRQUFJQyxLQUFLLEdBQUdaLE9BQU8sQ0FBQ1csTUFBUixDQUFlLENBQWYsQ0FBWjs7QUFDQSxRQUFJQyxLQUFLLElBQUlBLEtBQUssS0FBSyxLQUFLUixNQUE1QixFQUFvQztBQUNsQyxXQUFLQSxNQUFMLEdBQWNRLEtBQWQ7QUFDRDtBQUNGO0FBQ0YsQ0FQRDs7QUFTQWQsU0FBUyxDQUFDVyxTQUFWLENBQW9CSSxPQUFwQixHQUE4QixTQUFTQSxPQUFULEdBQW9CO0FBQ2hELE9BQUtULE1BQUwsR0FBYyxJQUFkO0FBQ0QsQ0FGRDs7QUFJQVUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakIsU0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuICBcclxuIFxyXG52YXIgVGV4dHVyZTJEID0gZnVuY3Rpb24gVGV4dHVyZTJEKGRldmljZSwgb3B0aW9ucykge1xyXG4gIHRoaXMuX2RldmljZSA9IGRldmljZTtcclxuICAgIFxyXG4gIHRoaXMuX3dpZHRoID0gNDtcclxuICB0aGlzLl9oZWlnaHQgPSA0O1xyXG5cclxuICB0aGlzLl9pbWFnZSA9IG51bGw7XHJcblxyXG4gIGlmIChvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX3dpZHRoID0gb3B0aW9ucy53aWR0aDtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmhlaWdodCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuX2hlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlSW1hZ2Uob3B0aW9ucyk7XHJcbiAgfVxyXG59O1xyXG5cclxuVGV4dHVyZTJELnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG9wdGlvbnMpIHtcclxuICB0aGlzLnVwZGF0ZUltYWdlKG9wdGlvbnMpO1xyXG59O1xyXG5cclxuVGV4dHVyZTJELnByb3RvdHlwZS51cGRhdGVJbWFnZSA9IGZ1bmN0aW9uIHVwZGF0ZUltYWdlIChvcHRpb25zKSB7XHJcbiAgaWYgKG9wdGlvbnMuaW1hZ2VzICYmIG9wdGlvbnMuaW1hZ2VzWzBdKSB7XHJcbiAgICB2YXIgaW1hZ2UgPSBvcHRpb25zLmltYWdlc1swXTtcclxuICAgIGlmIChpbWFnZSAmJiBpbWFnZSAhPT0gdGhpcy5faW1hZ2UpIHtcclxuICAgICAgdGhpcy5faW1hZ2UgPSBpbWFnZTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5UZXh0dXJlMkQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcclxuICB0aGlzLl9pbWFnZSA9IG51bGw7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRleHR1cmUyRDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=