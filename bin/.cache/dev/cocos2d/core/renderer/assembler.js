
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vertexFormat = require("./webgl/vertex-format");

var _assemblerPool = _interopRequireDefault(require("./assembler-pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Assembler = /*#__PURE__*/function () {
  function Assembler() {
    this._extendNative && this._extendNative();
  }

  var _proto = Assembler.prototype;

  _proto.init = function init(renderComp) {
    this._renderComp = renderComp;
  };

  _proto.updateRenderData = function updateRenderData(comp) {};

  _proto.fillBuffers = function fillBuffers(comp, renderer) {};

  _proto.getVfmt = function getVfmt() {
    return _vertexFormat.vfmtPosUvColor;
  };

  return Assembler;
}();

exports["default"] = Assembler;

Assembler.register = function (renderCompCtor, assembler) {
  renderCompCtor.__assembler__ = assembler;
};

Assembler.init = function (renderComp) {
  var renderCompCtor = renderComp.constructor;
  var assemblerCtor = renderCompCtor.__assembler__;

  while (!assemblerCtor) {
    renderCompCtor = renderCompCtor.$super;

    if (!renderCompCtor) {
      cc.warn("Can not find assembler for render component : [" + cc.js.getClassName(renderComp) + "]");
      return;
    }

    assemblerCtor = renderCompCtor.__assembler__;
  }

  if (assemblerCtor.getConstructor) {
    assemblerCtor = assemblerCtor.getConstructor(renderComp);
  }

  if (!renderComp._assembler || renderComp._assembler.constructor !== assemblerCtor) {
    var assembler = _assemblerPool["default"].get(assemblerCtor);

    assembler.init(renderComp);
    renderComp._assembler = assembler;
  }
};

cc.Assembler = Assembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxhc3NlbWJsZXIuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyIiwiX2V4dGVuZE5hdGl2ZSIsImluaXQiLCJyZW5kZXJDb21wIiwiX3JlbmRlckNvbXAiLCJ1cGRhdGVSZW5kZXJEYXRhIiwiY29tcCIsImZpbGxCdWZmZXJzIiwicmVuZGVyZXIiLCJnZXRWZm10IiwidmZtdFBvc1V2Q29sb3IiLCJyZWdpc3RlciIsInJlbmRlckNvbXBDdG9yIiwiYXNzZW1ibGVyIiwiX19hc3NlbWJsZXJfXyIsImNvbnN0cnVjdG9yIiwiYXNzZW1ibGVyQ3RvciIsIiRzdXBlciIsImNjIiwid2FybiIsImpzIiwiZ2V0Q2xhc3NOYW1lIiwiZ2V0Q29uc3RydWN0b3IiLCJfYXNzZW1ibGVyIiwiYXNzZW1ibGVyUG9vbCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0lBRXFCQTtBQUNqQix1QkFBZTtBQUNYLFNBQUtDLGFBQUwsSUFBc0IsS0FBS0EsYUFBTCxFQUF0QjtBQUNIOzs7O1NBQ0RDLE9BQUEsY0FBTUMsVUFBTixFQUFrQjtBQUNkLFNBQUtDLFdBQUwsR0FBbUJELFVBQW5CO0FBQ0g7O1NBRURFLG1CQUFBLDBCQUFrQkMsSUFBbEIsRUFBd0IsQ0FDdkI7O1NBRURDLGNBQUEscUJBQWFELElBQWIsRUFBbUJFLFFBQW5CLEVBQTZCLENBQzVCOztTQUVEQyxVQUFBLG1CQUFXO0FBQ1AsV0FBT0MsNEJBQVA7QUFDSDs7Ozs7OztBQUlMVixTQUFTLENBQUNXLFFBQVYsR0FBcUIsVUFBVUMsY0FBVixFQUEwQkMsU0FBMUIsRUFBcUM7QUFDdERELEVBQUFBLGNBQWMsQ0FBQ0UsYUFBZixHQUErQkQsU0FBL0I7QUFDSCxDQUZEOztBQUlBYixTQUFTLENBQUNFLElBQVYsR0FBaUIsVUFBVUMsVUFBVixFQUFzQjtBQUNuQyxNQUFJUyxjQUFjLEdBQUdULFVBQVUsQ0FBQ1ksV0FBaEM7QUFDQSxNQUFJQyxhQUFhLEdBQUlKLGNBQWMsQ0FBQ0UsYUFBcEM7O0FBQ0EsU0FBTyxDQUFDRSxhQUFSLEVBQXVCO0FBQ25CSixJQUFBQSxjQUFjLEdBQUdBLGNBQWMsQ0FBQ0ssTUFBaEM7O0FBQ0EsUUFBSSxDQUFDTCxjQUFMLEVBQXFCO0FBQ2pCTSxNQUFBQSxFQUFFLENBQUNDLElBQUgscURBQTBERCxFQUFFLENBQUNFLEVBQUgsQ0FBTUMsWUFBTixDQUFtQmxCLFVBQW5CLENBQTFEO0FBQ0E7QUFDSDs7QUFDRGEsSUFBQUEsYUFBYSxHQUFJSixjQUFjLENBQUNFLGFBQWhDO0FBQ0g7O0FBQ0QsTUFBSUUsYUFBYSxDQUFDTSxjQUFsQixFQUFrQztBQUM5Qk4sSUFBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUNNLGNBQWQsQ0FBNkJuQixVQUE3QixDQUFoQjtBQUNIOztBQUVELE1BQUksQ0FBQ0EsVUFBVSxDQUFDb0IsVUFBWixJQUEwQnBCLFVBQVUsQ0FBQ29CLFVBQVgsQ0FBc0JSLFdBQXRCLEtBQXNDQyxhQUFwRSxFQUFtRjtBQUMvRSxRQUFJSCxTQUFTLEdBQUdXLDBCQUFjQyxHQUFkLENBQWtCVCxhQUFsQixDQUFoQjs7QUFDQUgsSUFBQUEsU0FBUyxDQUFDWCxJQUFWLENBQWVDLFVBQWY7QUFDQUEsSUFBQUEsVUFBVSxDQUFDb0IsVUFBWCxHQUF3QlYsU0FBeEI7QUFDSDtBQUNKLENBcEJEOztBQXNCQUssRUFBRSxDQUFDbEIsU0FBSCxHQUFlQSxTQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmZtdFBvc1V2Q29sb3IgfSBmcm9tICcuL3dlYmdsL3ZlcnRleC1mb3JtYXQnO1xyXG5pbXBvcnQgYXNzZW1ibGVyUG9vbCBmcm9tICcuL2Fzc2VtYmxlci1wb29sJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2VtYmxlciB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fZXh0ZW5kTmF0aXZlICYmIHRoaXMuX2V4dGVuZE5hdGl2ZSgpO1xyXG4gICAgfVxyXG4gICAgaW5pdCAocmVuZGVyQ29tcCkge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNvbXAgPSByZW5kZXJDb21wO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVSZW5kZXJEYXRhIChjb21wKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldFZmbXQgKCkge1xyXG4gICAgICAgIHJldHVybiB2Zm10UG9zVXZDb2xvcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbkFzc2VtYmxlci5yZWdpc3RlciA9IGZ1bmN0aW9uIChyZW5kZXJDb21wQ3RvciwgYXNzZW1ibGVyKSB7XHJcbiAgICByZW5kZXJDb21wQ3Rvci5fX2Fzc2VtYmxlcl9fID0gYXNzZW1ibGVyO1xyXG59O1xyXG5cclxuQXNzZW1ibGVyLmluaXQgPSBmdW5jdGlvbiAocmVuZGVyQ29tcCkge1xyXG4gICAgbGV0IHJlbmRlckNvbXBDdG9yID0gcmVuZGVyQ29tcC5jb25zdHJ1Y3RvcjtcclxuICAgIGxldCBhc3NlbWJsZXJDdG9yID0gIHJlbmRlckNvbXBDdG9yLl9fYXNzZW1ibGVyX187XHJcbiAgICB3aGlsZSAoIWFzc2VtYmxlckN0b3IpIHtcclxuICAgICAgICByZW5kZXJDb21wQ3RvciA9IHJlbmRlckNvbXBDdG9yLiRzdXBlcjtcclxuICAgICAgICBpZiAoIXJlbmRlckNvbXBDdG9yKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oYENhbiBub3QgZmluZCBhc3NlbWJsZXIgZm9yIHJlbmRlciBjb21wb25lbnQgOiBbJHtjYy5qcy5nZXRDbGFzc05hbWUocmVuZGVyQ29tcCl9XWApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzc2VtYmxlckN0b3IgPSAgcmVuZGVyQ29tcEN0b3IuX19hc3NlbWJsZXJfXztcclxuICAgIH1cclxuICAgIGlmIChhc3NlbWJsZXJDdG9yLmdldENvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgYXNzZW1ibGVyQ3RvciA9IGFzc2VtYmxlckN0b3IuZ2V0Q29uc3RydWN0b3IocmVuZGVyQ29tcCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICghcmVuZGVyQ29tcC5fYXNzZW1ibGVyIHx8IHJlbmRlckNvbXAuX2Fzc2VtYmxlci5jb25zdHJ1Y3RvciAhPT0gYXNzZW1ibGVyQ3Rvcikge1xyXG4gICAgICAgIGxldCBhc3NlbWJsZXIgPSBhc3NlbWJsZXJQb29sLmdldChhc3NlbWJsZXJDdG9yKTtcclxuICAgICAgICBhc3NlbWJsZXIuaW5pdChyZW5kZXJDb21wKTtcclxuICAgICAgICByZW5kZXJDb21wLl9hc3NlbWJsZXIgPSBhc3NlbWJsZXI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jYy5Bc3NlbWJsZXIgPSBBc3NlbWJsZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9