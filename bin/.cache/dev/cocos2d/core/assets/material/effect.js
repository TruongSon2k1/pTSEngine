
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/material/effect.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _effectBase = _interopRequireDefault(require("./effect-base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Effect = /*#__PURE__*/function (_EffectBase) {
  _inheritsLoose(Effect, _EffectBase);

  /**
   * @param {Array} techniques
   */
  function Effect(name, techniques, techniqueIndex, asset) {
    var _this;

    _this = _EffectBase.call(this) || this;
    _this._techniques = [];
    _this._asset = null;

    _this.init(name, techniques, techniqueIndex, asset, true);

    return _this;
  }

  var _proto = Effect.prototype;

  _proto.init = function init(name, techniques, techniqueIndex, asset, createNative) {
    this._name = name;
    this._techniques = techniques;
    this._technique = techniques[techniqueIndex];
    this._asset = asset;
  };

  _proto.switchTechnique = function switchTechnique(index) {
    if (index >= this._techniques.length) {
      cc.warn("Can not switch to technique with index [" + index + "]");
      return;
    }

    this._technique = this._techniques[index];
  };

  _proto.clear = function clear() {
    this._techniques = [];
  };

  _proto.clone = function clone() {
    var techniques = [];

    for (var i = 0; i < this._techniques.length; i++) {
      techniques.push(this._techniques[i].clone());
    }

    var techniqueIndex = this._techniques.indexOf(this._technique);

    return new Effect(this._name, techniques, techniqueIndex, this._asset);
  };

  _createClass(Effect, [{
    key: "technique",
    get: function get() {
      return this._technique;
    }
  }, {
    key: "passes",
    get: function get() {
      return this._technique.passes;
    }
  }]);

  return Effect;
}(_effectBase["default"]);

exports["default"] = Effect;
cc.Effect = Effect;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0c1xcbWF0ZXJpYWxcXGVmZmVjdC50cyJdLCJuYW1lcyI6WyJFZmZlY3QiLCJuYW1lIiwidGVjaG5pcXVlcyIsInRlY2huaXF1ZUluZGV4IiwiYXNzZXQiLCJfdGVjaG5pcXVlcyIsIl9hc3NldCIsImluaXQiLCJjcmVhdGVOYXRpdmUiLCJfbmFtZSIsIl90ZWNobmlxdWUiLCJzd2l0Y2hUZWNobmlxdWUiLCJpbmRleCIsImxlbmd0aCIsImNjIiwid2FybiIsImNsZWFyIiwiY2xvbmUiLCJpIiwicHVzaCIsImluZGV4T2YiLCJwYXNzZXMiLCJFZmZlY3RCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7OztJQUVxQkE7OztBQWFqQjtBQUNKO0FBQ0E7QUFDSSxrQkFBYUMsSUFBYixFQUFtQkMsVUFBbkIsRUFBK0JDLGNBQS9CLEVBQStDQyxLQUEvQyxFQUFzRDtBQUFBOztBQUNsRDtBQURrRCxVQWR0REMsV0Fjc0QsR0FkM0IsRUFjMkI7QUFBQSxVQWJ0REMsTUFhc0QsR0FiN0MsSUFhNkM7O0FBRWxELFVBQUtDLElBQUwsQ0FBVU4sSUFBVixFQUFnQkMsVUFBaEIsRUFBNEJDLGNBQTVCLEVBQTRDQyxLQUE1QyxFQUFtRCxJQUFuRDs7QUFGa0Q7QUFHckQ7Ozs7U0FFREcsT0FBQSxjQUFNTixJQUFOLEVBQVlDLFVBQVosRUFBd0JDLGNBQXhCLEVBQXdDQyxLQUF4QyxFQUErQ0ksWUFBL0MsRUFBNkQ7QUFDekQsU0FBS0MsS0FBTCxHQUFhUixJQUFiO0FBQ0EsU0FBS0ksV0FBTCxHQUFtQkgsVUFBbkI7QUFDQSxTQUFLUSxVQUFMLEdBQWtCUixVQUFVLENBQUNDLGNBQUQsQ0FBNUI7QUFDQSxTQUFLRyxNQUFMLEdBQWNGLEtBQWQ7QUFDSDs7U0FFRE8sa0JBQUEseUJBQWlCQyxLQUFqQixFQUF3QjtBQUNwQixRQUFJQSxLQUFLLElBQUksS0FBS1AsV0FBTCxDQUFpQlEsTUFBOUIsRUFBc0M7QUFDbENDLE1BQUFBLEVBQUUsQ0FBQ0MsSUFBSCw4Q0FBbURILEtBQW5EO0FBQ0E7QUFDSDs7QUFFRCxTQUFLRixVQUFMLEdBQWtCLEtBQUtMLFdBQUwsQ0FBaUJPLEtBQWpCLENBQWxCO0FBQ0g7O1NBRURJLFFBQUEsaUJBQVM7QUFDTCxTQUFLWCxXQUFMLEdBQW1CLEVBQW5CO0FBQ0g7O1NBRURZLFFBQUEsaUJBQVM7QUFDTCxRQUFJZixVQUFVLEdBQUcsRUFBakI7O0FBQ0EsU0FBSyxJQUFJZ0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLYixXQUFMLENBQWlCUSxNQUFyQyxFQUE2Q0ssQ0FBQyxFQUE5QyxFQUFrRDtBQUM5Q2hCLE1BQUFBLFVBQVUsQ0FBQ2lCLElBQVgsQ0FBZ0IsS0FBS2QsV0FBTCxDQUFpQmEsQ0FBakIsRUFBb0JELEtBQXBCLEVBQWhCO0FBQ0g7O0FBRUQsUUFBSWQsY0FBYyxHQUFHLEtBQUtFLFdBQUwsQ0FBaUJlLE9BQWpCLENBQXlCLEtBQUtWLFVBQTlCLENBQXJCOztBQUNBLFdBQU8sSUFBSVYsTUFBSixDQUFXLEtBQUtTLEtBQWhCLEVBQXVCUCxVQUF2QixFQUFtQ0MsY0FBbkMsRUFBbUQsS0FBS0csTUFBeEQsQ0FBUDtBQUNIOzs7O1NBNUNELGVBQWlCO0FBQ2IsYUFBTyxLQUFLSSxVQUFaO0FBQ0g7OztTQUVELGVBQWM7QUFDVixhQUFPLEtBQUtBLFVBQUwsQ0FBZ0JXLE1BQXZCO0FBQ0g7Ozs7RUFYK0JDOzs7QUFvRHBDUixFQUFFLENBQUNkLE1BQUgsR0FBWUEsTUFBWiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuaW1wb3J0IFRlY2huaXF1ZSBmcm9tICcuLi8uLi8uLi9yZW5kZXJlci9jb3JlL3RlY2huaXF1ZSc7XHJcbmltcG9ydCBFZmZlY3RCYXNlIGZyb20gJy4vZWZmZWN0LWJhc2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWZmZWN0IGV4dGVuZHMgRWZmZWN0QmFzZSB7XHJcblxyXG4gICAgX3RlY2huaXF1ZXM6IFRlY2huaXF1ZVtdID0gW107XHJcbiAgICBfYXNzZXQgPSBudWxsO1xyXG4gICAgXHJcbiAgICBnZXQgdGVjaG5pcXVlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVjaG5pcXVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwYXNzZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZWNobmlxdWUucGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gdGVjaG5pcXVlc1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZSwgdGVjaG5pcXVlcywgdGVjaG5pcXVlSW5kZXgsIGFzc2V0KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmluaXQobmFtZSwgdGVjaG5pcXVlcywgdGVjaG5pcXVlSW5kZXgsIGFzc2V0LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0IChuYW1lLCB0ZWNobmlxdWVzLCB0ZWNobmlxdWVJbmRleCwgYXNzZXQsIGNyZWF0ZU5hdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZXMgPSB0ZWNobmlxdWVzO1xyXG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZSA9IHRlY2huaXF1ZXNbdGVjaG5pcXVlSW5kZXhdO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0ID0gYXNzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoVGVjaG5pcXVlIChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLl90ZWNobmlxdWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKGBDYW4gbm90IHN3aXRjaCB0byB0ZWNobmlxdWUgd2l0aCBpbmRleCBbJHtpbmRleH1dYCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3RlY2huaXF1ZSA9IHRoaXMuX3RlY2huaXF1ZXNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICB0aGlzLl90ZWNobmlxdWVzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgY2xvbmUgKCkge1xyXG4gICAgICAgIGxldCB0ZWNobmlxdWVzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl90ZWNobmlxdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRlY2huaXF1ZXMucHVzaCh0aGlzLl90ZWNobmlxdWVzW2ldLmNsb25lKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRlY2huaXF1ZUluZGV4ID0gdGhpcy5fdGVjaG5pcXVlcy5pbmRleE9mKHRoaXMuX3RlY2huaXF1ZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFZmZlY3QodGhpcy5fbmFtZSwgdGVjaG5pcXVlcywgdGVjaG5pcXVlSW5kZXgsIHRoaXMuX2Fzc2V0KTtcclxuICAgIH1cclxufVxyXG5cclxuY2MuRWZmZWN0ID0gRWZmZWN0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==