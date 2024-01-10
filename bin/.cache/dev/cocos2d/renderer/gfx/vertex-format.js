
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/vertex-format.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _enums = require("./enums");

var _murmurhash2_gc = _interopRequireDefault(require("../murmurhash2_gc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// ====================
// exports
// ====================
var VertexFormat = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {Array} infos
   *
   * @example
   * let vertexFmt = new VertexFormat([
   *   { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
   *   { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
   *   { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_FLOAT32, num: 4, normalize: true },
   * ])
   */
  function VertexFormat(infos) {
    this._attr2el = {};
    this._elements = [];
    this._bytes = 0;
    var hash = "";

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];
      var el = {
        name: info.name,
        offset: this._bytes,
        stride: 0,
        stream: -1,
        type: info.type,
        num: info.num,
        normalize: info.normalize === undefined ? false : info.normalize,
        bytes: info.num * (0, _enums.attrTypeBytes)(info.type)
      };
      this._attr2el[el.name] = el;

      this._elements.push(el);

      this._bytes += el.bytes;
      hash += el.name + ":" + el.num + ":" + el.type + ":" + el.normalize;
    }

    for (var _i = 0, _len = this._elements.length; _i < _len; ++_i) {
      var _el = this._elements[_i];
      _el.stride = this._bytes;
    }

    this._hash = (0, _murmurhash2_gc["default"])(hash, 666);
  }
  /**
   * @method element
   * @param {string} attrName
   */


  var _proto = VertexFormat.prototype;

  _proto.element = function element(attrName) {
    return this._attr2el[attrName];
  }
  /**
   * @method getHash
   */
  ;

  _proto.getHash = function getHash() {
    return this._hash;
  };

  return VertexFormat;
}();

exports["default"] = VertexFormat;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxnZnhcXHZlcnRleC1mb3JtYXQuanMiXSwibmFtZXMiOlsiVmVydGV4Rm9ybWF0IiwiaW5mb3MiLCJfYXR0cjJlbCIsIl9lbGVtZW50cyIsIl9ieXRlcyIsImhhc2giLCJpIiwibGVuIiwibGVuZ3RoIiwiaW5mbyIsImVsIiwibmFtZSIsIm9mZnNldCIsInN0cmlkZSIsInN0cmVhbSIsInR5cGUiLCJudW0iLCJub3JtYWxpemUiLCJ1bmRlZmluZWQiLCJieXRlcyIsInB1c2giLCJfaGFzaCIsImVsZW1lbnQiLCJhdHRyTmFtZSIsImdldEhhc2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtJQUVxQkE7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHdCQUFZQyxLQUFaLEVBQW1CO0FBQ2pCLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFFQSxRQUFJQyxJQUFJLEdBQUcsRUFBWDs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBR04sS0FBSyxDQUFDTyxNQUE1QixFQUFvQ0YsQ0FBQyxHQUFHQyxHQUF4QyxFQUE2QyxFQUFFRCxDQUEvQyxFQUFrRDtBQUNoRCxVQUFJRyxJQUFJLEdBQUdSLEtBQUssQ0FBQ0ssQ0FBRCxDQUFoQjtBQUNBLFVBQUlJLEVBQUUsR0FBRztBQUNQQyxRQUFBQSxJQUFJLEVBQUVGLElBQUksQ0FBQ0UsSUFESjtBQUVQQyxRQUFBQSxNQUFNLEVBQUUsS0FBS1IsTUFGTjtBQUdQUyxRQUFBQSxNQUFNLEVBQUUsQ0FIRDtBQUlQQyxRQUFBQSxNQUFNLEVBQUUsQ0FBQyxDQUpGO0FBS1BDLFFBQUFBLElBQUksRUFBRU4sSUFBSSxDQUFDTSxJQUxKO0FBTVBDLFFBQUFBLEdBQUcsRUFBRVAsSUFBSSxDQUFDTyxHQU5IO0FBT1BDLFFBQUFBLFNBQVMsRUFBR1IsSUFBSSxDQUFDUSxTQUFMLEtBQW1CQyxTQUFwQixHQUFpQyxLQUFqQyxHQUF5Q1QsSUFBSSxDQUFDUSxTQVBsRDtBQVFQRSxRQUFBQSxLQUFLLEVBQUVWLElBQUksQ0FBQ08sR0FBTCxHQUFXLDBCQUFjUCxJQUFJLENBQUNNLElBQW5CO0FBUlgsT0FBVDtBQVdBLFdBQUtiLFFBQUwsQ0FBY1EsRUFBRSxDQUFDQyxJQUFqQixJQUF5QkQsRUFBekI7O0FBQ0EsV0FBS1AsU0FBTCxDQUFlaUIsSUFBZixDQUFvQlYsRUFBcEI7O0FBRUEsV0FBS04sTUFBTCxJQUFlTSxFQUFFLENBQUNTLEtBQWxCO0FBRUFkLE1BQUFBLElBQUksSUFBT0ssRUFBRSxDQUFDQyxJQUFWLFNBQWtCRCxFQUFFLENBQUNNLEdBQXJCLFNBQTRCTixFQUFFLENBQUNLLElBQS9CLFNBQXVDTCxFQUFFLENBQUNPLFNBQTlDO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJWCxFQUFDLEdBQUcsQ0FBUixFQUFXQyxJQUFHLEdBQUcsS0FBS0osU0FBTCxDQUFlSyxNQUFyQyxFQUE2Q0YsRUFBQyxHQUFHQyxJQUFqRCxFQUFzRCxFQUFFRCxFQUF4RCxFQUEyRDtBQUN6RCxVQUFJSSxHQUFFLEdBQUcsS0FBS1AsU0FBTCxDQUFlRyxFQUFmLENBQVQ7QUFDQUksTUFBQUEsR0FBRSxDQUFDRyxNQUFILEdBQVksS0FBS1QsTUFBakI7QUFDRDs7QUFFRCxTQUFLaUIsS0FBTCxHQUFhLGdDQUFZaEIsSUFBWixFQUFrQixHQUFsQixDQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7U0FDRWlCLFVBQUEsaUJBQVFDLFFBQVIsRUFBa0I7QUFDaEIsV0FBTyxLQUFLckIsUUFBTCxDQUFjcUIsUUFBZCxDQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7OztTQUNFQyxVQUFBLG1CQUFXO0FBQ1QsV0FBTyxLQUFLSCxLQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdHRyVHlwZUJ5dGVzIH0gZnJvbSAnLi9lbnVtcyc7XHJcbmltcG9ydCBtdXJtdXJoYXNoMiBmcm9tICcuLi9tdXJtdXJoYXNoMl9nYyc7XHJcblxyXG4vLyA9PT09PT09PT09PT09PT09PT09PVxyXG4vLyBleHBvcnRzXHJcbi8vID09PT09PT09PT09PT09PT09PT09XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0ZXhGb3JtYXQge1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGluZm9zXHJcbiAgICpcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIGxldCB2ZXJ0ZXhGbXQgPSBuZXcgVmVydGV4Rm9ybWF0KFtcclxuICAgKiAgIHsgbmFtZTogZ2Z4LkFUVFJfUE9TSVRJT04sIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzIH0sXHJcbiAgICogICB7IG5hbWU6IGdmeC5BVFRSX1VWMCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDIgfSxcclxuICAgKiAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiA0LCBub3JtYWxpemU6IHRydWUgfSxcclxuICAgKiBdKVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGluZm9zKSB7XHJcbiAgICB0aGlzLl9hdHRyMmVsID0ge307XHJcbiAgICB0aGlzLl9lbGVtZW50cyA9IFtdO1xyXG4gICAgdGhpcy5fYnl0ZXMgPSAwO1xyXG5cclxuICAgIGxldCBoYXNoID0gXCJcIjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5mb3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgbGV0IGluZm8gPSBpbmZvc1tpXTtcclxuICAgICAgbGV0IGVsID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICBvZmZzZXQ6IHRoaXMuX2J5dGVzLFxyXG4gICAgICAgIHN0cmlkZTogMCxcclxuICAgICAgICBzdHJlYW06IC0xLFxyXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcclxuICAgICAgICBudW06IGluZm8ubnVtLFxyXG4gICAgICAgIG5vcm1hbGl6ZTogKGluZm8ubm9ybWFsaXplID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiBpbmZvLm5vcm1hbGl6ZSxcclxuICAgICAgICBieXRlczogaW5mby5udW0gKiBhdHRyVHlwZUJ5dGVzKGluZm8udHlwZSksXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLl9hdHRyMmVsW2VsLm5hbWVdID0gZWw7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRzLnB1c2goZWwpO1xyXG5cclxuICAgICAgdGhpcy5fYnl0ZXMgKz0gZWwuYnl0ZXM7XHJcblxyXG4gICAgICBoYXNoICs9IGAke2VsLm5hbWV9OiR7ZWwubnVtfToke2VsLnR5cGV9OiR7ZWwubm9ybWFsaXplfWA7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuX2VsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGxldCBlbCA9IHRoaXMuX2VsZW1lbnRzW2ldO1xyXG4gICAgICBlbC5zdHJpZGUgPSB0aGlzLl9ieXRlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9oYXNoID0gbXVybXVyaGFzaDIoaGFzaCwgNjY2KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyTmFtZVxyXG4gICAqL1xyXG4gIGVsZW1lbnQoYXR0ck5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLl9hdHRyMmVsW2F0dHJOYW1lXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZ2V0SGFzaFxyXG4gICAqL1xyXG4gIGdldEhhc2ggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhc2g7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=