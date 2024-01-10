
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/technique.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var Technique = /*#__PURE__*/function () {
  function Technique(name, passes) {
    this._name = name;
    this._passes = passes;
  }

  var _proto = Technique.prototype;

  _proto.clone = function clone() {
    var passes = [];

    for (var i = 0; i < this._passes.length; i++) {
      passes.push(this._passes[i].clone());
    }

    return new Technique(this._name, passes);
  };

  _createClass(Technique, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "passes",
    get: function get() {
      return this._passes;
    }
  }]);

  return Technique;
}();

exports["default"] = Technique;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxjb3JlXFx0ZWNobmlxdWUuanMiXSwibmFtZXMiOlsiVGVjaG5pcXVlIiwibmFtZSIsInBhc3NlcyIsIl9uYW1lIiwiX3Bhc3NlcyIsImNsb25lIiwiaSIsImxlbmd0aCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFcUJBO0FBQ25CLHFCQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixFQUEwQjtBQUN4QixTQUFLQyxLQUFMLEdBQWFGLElBQWI7QUFDQSxTQUFLRyxPQUFMLEdBQWVGLE1BQWY7QUFDRDs7OztTQVVERyxRQUFBLGlCQUFTO0FBQ1AsUUFBSUgsTUFBTSxHQUFHLEVBQWI7O0FBQ0EsU0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtGLE9BQUwsQ0FBYUcsTUFBakMsRUFBeUNELENBQUMsRUFBMUMsRUFBOEM7QUFDNUNKLE1BQUFBLE1BQU0sQ0FBQ00sSUFBUCxDQUFZLEtBQUtKLE9BQUwsQ0FBYUUsQ0FBYixFQUFnQkQsS0FBaEIsRUFBWjtBQUNEOztBQUNELFdBQU8sSUFBSUwsU0FBSixDQUFjLEtBQUtHLEtBQW5CLEVBQTBCRCxNQUExQixDQUFQO0FBQ0Q7Ozs7U0FkRCxlQUFZO0FBQ1YsYUFBTyxLQUFLQyxLQUFaO0FBQ0Q7OztTQUVELGVBQWE7QUFDWCxhQUFPLEtBQUtDLE9BQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVjaG5pcXVlIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBwYXNzZXMpIHtcclxuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5fcGFzc2VzID0gcGFzc2VzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFzc2VzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Bhc3NlcztcclxuICB9XHJcblxyXG4gIGNsb25lICgpIHtcclxuICAgIGxldCBwYXNzZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBhc3Nlcy5wdXNoKHRoaXMuX3Bhc3Nlc1tpXS5jbG9uZSgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgVGVjaG5pcXVlKHRoaXMuX25hbWUsIHBhc3Nlcyk7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=