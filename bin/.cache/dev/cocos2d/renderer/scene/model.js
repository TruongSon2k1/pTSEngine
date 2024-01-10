
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/scene/model.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

/**
 * A representation of a model
 */
var Model = /*#__PURE__*/function () {
  /**
   * Setup a default empty model
   */
  function Model() {
    this._type = 'default';
    this._poolID = -1;
    this._node = null;
    this._inputAssembler = null;
    this._effect = null;
    this._viewID = -1;
    this._cameraID = -1;
    this._userKey = -1;
    this._castShadow = false;
    this._boundingShape = null;
  }
  /**
   * Set the hosting node of this model
   * @param {Node} node the hosting node
   */


  var _proto = Model.prototype;

  _proto.setNode = function setNode(node) {
    this._node = node;
  }
  /**
   * Set the input assembler
   * @param {InputAssembler} ia
   */
  ;

  _proto.setInputAssembler = function setInputAssembler(ia) {
    this._inputAssembler = ia;
  }
  /**
   * Set the model effect
   * @param {?Effect} effect the effect to use
   */
  ;

  _proto.setEffect = function setEffect(effect) {
    this._effect = effect;
  }
  /**
   * Set the user key
   * @param {number} key
   */
  ;

  _proto.setUserKey = function setUserKey(key) {
    this._userKey = key;
  }
  /**
   * Extract a drawing item
   * @param {Object} out the receiving item
   */
  ;

  _proto.extractDrawItem = function extractDrawItem(out) {
    out.model = this;
    out.node = this._node;
    out.ia = this._inputAssembler;
    out.effect = this._effect;
  };

  return Model;
}();

exports["default"] = Model;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxzY2VuZVxcbW9kZWwuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJfdHlwZSIsIl9wb29sSUQiLCJfbm9kZSIsIl9pbnB1dEFzc2VtYmxlciIsIl9lZmZlY3QiLCJfdmlld0lEIiwiX2NhbWVyYUlEIiwiX3VzZXJLZXkiLCJfY2FzdFNoYWRvdyIsIl9ib3VuZGluZ1NoYXBlIiwic2V0Tm9kZSIsIm5vZGUiLCJzZXRJbnB1dEFzc2VtYmxlciIsImlhIiwic2V0RWZmZWN0IiwiZWZmZWN0Iiwic2V0VXNlcktleSIsImtleSIsImV4dHJhY3REcmF3SXRlbSIsIm91dCIsIm1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0lBQ3FCQTtBQUNuQjtBQUNGO0FBQ0E7QUFDRSxtQkFBYztBQUNaLFNBQUtDLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLENBQUMsQ0FBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFDLENBQWhCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFDLENBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFDLENBQWpCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7OztTQUNFQyxVQUFBLGlCQUFRQyxJQUFSLEVBQWM7QUFDWixTQUFLVCxLQUFMLEdBQWFTLElBQWI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7U0FDRUMsb0JBQUEsMkJBQWtCQyxFQUFsQixFQUFzQjtBQUNwQixTQUFLVixlQUFMLEdBQXVCVSxFQUF2QjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztTQUNFQyxZQUFBLG1CQUFVQyxNQUFWLEVBQWtCO0FBQ2hCLFNBQUtYLE9BQUwsR0FBZVcsTUFBZjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7OztTQUNFQyxhQUFBLG9CQUFXQyxHQUFYLEVBQWdCO0FBQ2QsU0FBS1YsUUFBTCxHQUFnQlUsR0FBaEI7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7U0FDRUMsa0JBQUEseUJBQWdCQyxHQUFoQixFQUFxQjtBQUNuQkEsSUFBQUEsR0FBRyxDQUFDQyxLQUFKLEdBQVksSUFBWjtBQUNBRCxJQUFBQSxHQUFHLENBQUNSLElBQUosR0FBVyxLQUFLVCxLQUFoQjtBQUNBaUIsSUFBQUEsR0FBRyxDQUFDTixFQUFKLEdBQVMsS0FBS1YsZUFBZDtBQUNBZ0IsSUFBQUEsR0FBRyxDQUFDSixNQUFKLEdBQWEsS0FBS1gsT0FBbEI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuLyoqXHJcbiAqIEEgcmVwcmVzZW50YXRpb24gb2YgYSBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwge1xyXG4gIC8qKlxyXG4gICAqIFNldHVwIGEgZGVmYXVsdCBlbXB0eSBtb2RlbFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fdHlwZSA9ICdkZWZhdWx0JztcclxuICAgIHRoaXMuX3Bvb2xJRCA9IC0xO1xyXG4gICAgdGhpcy5fbm9kZSA9IG51bGw7XHJcbiAgICB0aGlzLl9pbnB1dEFzc2VtYmxlciA9IG51bGw7XHJcbiAgICB0aGlzLl9lZmZlY3QgPSBudWxsO1xyXG4gICAgdGhpcy5fdmlld0lEID0gLTE7XHJcbiAgICB0aGlzLl9jYW1lcmFJRCA9IC0xO1xyXG4gICAgdGhpcy5fdXNlcktleSA9IC0xO1xyXG4gICAgdGhpcy5fY2FzdFNoYWRvdyA9IGZhbHNlO1xyXG4gICAgdGhpcy5fYm91bmRpbmdTaGFwZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGhvc3Rpbmcgbm9kZSBvZiB0aGlzIG1vZGVsXHJcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIHRoZSBob3N0aW5nIG5vZGVcclxuICAgKi9cclxuICBzZXROb2RlKG5vZGUpIHtcclxuICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBpbnB1dCBhc3NlbWJsZXJcclxuICAgKiBAcGFyYW0ge0lucHV0QXNzZW1ibGVyfSBpYVxyXG4gICAqL1xyXG4gIHNldElucHV0QXNzZW1ibGVyKGlhKSB7XHJcbiAgICB0aGlzLl9pbnB1dEFzc2VtYmxlciA9IGlhO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBtb2RlbCBlZmZlY3RcclxuICAgKiBAcGFyYW0gez9FZmZlY3R9IGVmZmVjdCB0aGUgZWZmZWN0IHRvIHVzZVxyXG4gICAqL1xyXG4gIHNldEVmZmVjdChlZmZlY3QpIHtcclxuICAgIHRoaXMuX2VmZmVjdCA9IGVmZmVjdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgdXNlciBrZXlcclxuICAgKiBAcGFyYW0ge251bWJlcn0ga2V5XHJcbiAgICovXHJcbiAgc2V0VXNlcktleShrZXkpIHtcclxuICAgIHRoaXMuX3VzZXJLZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHRyYWN0IGEgZHJhd2luZyBpdGVtXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG91dCB0aGUgcmVjZWl2aW5nIGl0ZW1cclxuICAgKi9cclxuICBleHRyYWN0RHJhd0l0ZW0ob3V0KSB7XHJcbiAgICBvdXQubW9kZWwgPSB0aGlzO1xyXG4gICAgb3V0Lm5vZGUgPSB0aGlzLl9ub2RlO1xyXG4gICAgb3V0LmlhID0gdGhpcy5faW5wdXRBc3NlbWJsZXI7XHJcbiAgICBvdXQuZWZmZWN0ID0gdGhpcy5fZWZmZWN0O1xyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==