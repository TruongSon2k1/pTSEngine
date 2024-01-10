
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/render-data.js';
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

var RenderData = /*#__PURE__*/function () {
  function RenderData() {
    this.vertices = [];
  }

  _createClass(RenderData, [{
    key: "dataLength",
    get: function get() {
      return this.vertices.length;
    },
    set: function set(v) {
      var old = this.vertices.length;
      this.vertices.length = v;

      for (var i = old; i < v; i++) {
        this.vertices[i] = {
          x: 0.0,
          y: 0.0,
          u: 0.0,
          v: 0.0
        };
      }
    }
  }]);

  return RenderData;
}();

exports["default"] = RenderData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xccmVuZGVyLWRhdGEuanMiXSwibmFtZXMiOlsiUmVuZGVyRGF0YSIsInZlcnRpY2VzIiwibGVuZ3RoIiwidiIsIm9sZCIsImkiLCJ4IiwieSIsInUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQTtBQUNuQix3QkFBZTtBQUNiLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7OztTQUVELGVBQWtCO0FBQ2QsYUFBTyxLQUFLQSxRQUFMLENBQWNDLE1BQXJCO0FBQ0g7U0FDRCxhQUFnQkMsQ0FBaEIsRUFBbUI7QUFDakIsVUFBSUMsR0FBRyxHQUFHLEtBQUtILFFBQUwsQ0FBY0MsTUFBeEI7QUFDQSxXQUFLRCxRQUFMLENBQWNDLE1BQWQsR0FBdUJDLENBQXZCOztBQUNBLFdBQUssSUFBSUUsQ0FBQyxHQUFHRCxHQUFiLEVBQWtCQyxDQUFDLEdBQUdGLENBQXRCLEVBQXlCRSxDQUFDLEVBQTFCLEVBQThCO0FBQzFCLGFBQUtKLFFBQUwsQ0FBY0ksQ0FBZCxJQUFtQjtBQUNmQyxVQUFBQSxDQUFDLEVBQUUsR0FEWTtBQUVmQyxVQUFBQSxDQUFDLEVBQUUsR0FGWTtBQUdmQyxVQUFBQSxDQUFDLEVBQUUsR0FIWTtBQUlmTCxVQUFBQSxDQUFDLEVBQUU7QUFKWSxTQUFuQjtBQU1IO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyRGF0YSB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy52ZXJ0aWNlcyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGFMZW5ndGggKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgfVxyXG4gIHNldCBkYXRhTGVuZ3RoICh2KSB7XHJcbiAgICBsZXQgb2xkID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XHJcbiAgICB0aGlzLnZlcnRpY2VzLmxlbmd0aCA9IHY7XHJcbiAgICBmb3IgKGxldCBpID0gb2xkOyBpIDwgdjsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlc1tpXSA9IHtcclxuICAgICAgICAgICAgeDogMC4wLFxyXG4gICAgICAgICAgICB5OiAwLjAsXHJcbiAgICAgICAgICAgIHU6IDAuMCxcclxuICAgICAgICAgICAgdjogMC4wLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9