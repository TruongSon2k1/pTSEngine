
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCSprite = require("../../../../components/CCSprite");

var _simple = _interopRequireDefault(require("./2d/simple"));

var _sliced = _interopRequireDefault(require("./2d/sliced"));

var _tiled = _interopRequireDefault(require("./2d/tiled"));

var _radialFilled = _interopRequireDefault(require("./2d/radial-filled"));

var _barFilled = _interopRequireDefault(require("./2d/bar-filled"));

var _mesh = _interopRequireDefault(require("./2d/mesh"));

var _simple2 = _interopRequireDefault(require("./3d/simple"));

var _sliced2 = _interopRequireDefault(require("./3d/sliced"));

var _tiled2 = _interopRequireDefault(require("./3d/tiled"));

var _radialFilled2 = _interopRequireDefault(require("./3d/radial-filled"));

var _barFilled2 = _interopRequireDefault(require("./3d/bar-filled"));

var _mesh2 = _interopRequireDefault(require("./3d/mesh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ctor = {
  getConstructor: function getConstructor(sprite) {
    var is3DNode = sprite.node.is3DNode;
    var ctor = is3DNode ? _simple2["default"] : _simple["default"];

    switch (sprite.type) {
      case _CCSprite.Type.SLICED:
        ctor = is3DNode ? _sliced2["default"] : _sliced["default"];
        break;

      case _CCSprite.Type.TILED:
        ctor = is3DNode ? _tiled2["default"] : _tiled["default"];
        break;

      case _CCSprite.Type.FILLED:
        if (sprite._fillType === _CCSprite.FillType.RADIAL) {
          ctor = is3DNode ? _radialFilled2["default"] : _radialFilled["default"];
        } else {
          ctor = is3DNode ? _barFilled2["default"] : _barFilled["default"];
        }

        break;

      case _CCSprite.Type.MESH:
        ctor = is3DNode ? _mesh2["default"] : _mesh["default"];
        break;
    }

    return ctor;
  },
  Simple: _simple["default"],
  Sliced: _sliced["default"],
  Tiled: _tiled["default"],
  RadialFilled: _radialFilled["default"],
  BarFilled: _barFilled["default"],
  Mesh: _mesh["default"],
  Simple3D: _simple2["default"],
  Sliced3D: _sliced2["default"],
  Tiled3D: _tiled2["default"],
  RadialFilled3D: _radialFilled2["default"],
  BarFilled3D: _barFilled2["default"],
  Mesh3D: _mesh2["default"]
};

_assembler["default"].register(cc.Sprite, ctor);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcc3ByaXRlXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJjdG9yIiwiZ2V0Q29uc3RydWN0b3IiLCJzcHJpdGUiLCJpczNETm9kZSIsIm5vZGUiLCJTaW1wbGUzRCIsIlNpbXBsZSIsInR5cGUiLCJUeXBlIiwiU0xJQ0VEIiwiU2xpY2VkM0QiLCJTbGljZWQiLCJUSUxFRCIsIlRpbGVkM0QiLCJUaWxlZCIsIkZJTExFRCIsIl9maWxsVHlwZSIsIkZpbGxUeXBlIiwiUkFESUFMIiwiUmFkaWFsRmlsbGVkM0QiLCJSYWRpYWxGaWxsZWQiLCJCYXJGaWxsZWQzRCIsIkJhckZpbGxlZCIsIk1FU0giLCJNZXNoM0QiLCJNZXNoIiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiLCJjYyIsIlNwcml0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBSUEsSUFBSSxHQUFHO0FBQ1BDLEVBQUFBLGNBRE8sMEJBQ1FDLE1BRFIsRUFDZ0I7QUFDbkIsUUFBSUMsUUFBUSxHQUFHRCxNQUFNLENBQUNFLElBQVAsQ0FBWUQsUUFBM0I7QUFFQSxRQUFJSCxJQUFJLEdBQUdHLFFBQVEsR0FBR0UsbUJBQUgsR0FBY0Msa0JBQWpDOztBQUNBLFlBQVFKLE1BQU0sQ0FBQ0ssSUFBZjtBQUNJLFdBQUtDLGVBQUtDLE1BQVY7QUFDSVQsUUFBQUEsSUFBSSxHQUFHRyxRQUFRLEdBQUdPLG1CQUFILEdBQWNDLGtCQUE3QjtBQUNBOztBQUNKLFdBQUtILGVBQUtJLEtBQVY7QUFDSVosUUFBQUEsSUFBSSxHQUFHRyxRQUFRLEdBQUdVLGtCQUFILEdBQWFDLGlCQUE1QjtBQUNBOztBQUNKLFdBQUtOLGVBQUtPLE1BQVY7QUFDSSxZQUFJYixNQUFNLENBQUNjLFNBQVAsS0FBcUJDLG1CQUFTQyxNQUFsQyxFQUEwQztBQUN0Q2xCLFVBQUFBLElBQUksR0FBR0csUUFBUSxHQUFHZ0IseUJBQUgsR0FBb0JDLHdCQUFuQztBQUNILFNBRkQsTUFFTztBQUNIcEIsVUFBQUEsSUFBSSxHQUFHRyxRQUFRLEdBQUdrQixzQkFBSCxHQUFpQkMscUJBQWhDO0FBQ0g7O0FBQ0Q7O0FBQ0osV0FBS2QsZUFBS2UsSUFBVjtBQUNJdkIsUUFBQUEsSUFBSSxHQUFHRyxRQUFRLEdBQUdxQixpQkFBSCxHQUFZQyxnQkFBM0I7QUFDQTtBQWhCUjs7QUFtQkEsV0FBT3pCLElBQVA7QUFDSCxHQXpCTTtBQTJCUE0sRUFBQUEsTUFBTSxFQUFOQSxrQkEzQk87QUE0QlBLLEVBQUFBLE1BQU0sRUFBTkEsa0JBNUJPO0FBNkJQRyxFQUFBQSxLQUFLLEVBQUxBLGlCQTdCTztBQThCUE0sRUFBQUEsWUFBWSxFQUFaQSx3QkE5Qk87QUErQlBFLEVBQUFBLFNBQVMsRUFBVEEscUJBL0JPO0FBZ0NQRyxFQUFBQSxJQUFJLEVBQUpBLGdCQWhDTztBQWtDUHBCLEVBQUFBLFFBQVEsRUFBUkEsbUJBbENPO0FBbUNQSyxFQUFBQSxRQUFRLEVBQVJBLG1CQW5DTztBQW9DUEcsRUFBQUEsT0FBTyxFQUFQQSxrQkFwQ087QUFxQ1BNLEVBQUFBLGNBQWMsRUFBZEEseUJBckNPO0FBc0NQRSxFQUFBQSxXQUFXLEVBQVhBLHNCQXRDTztBQXVDUEcsRUFBQUEsTUFBTSxFQUFOQTtBQXZDTyxDQUFYOztBQTBDQUUsc0JBQVVDLFFBQVYsQ0FBbUJDLEVBQUUsQ0FBQ0MsTUFBdEIsRUFBOEI3QixJQUE5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vLi4vLi4vYXNzZW1ibGVyJztcclxuaW1wb3J0IHsgVHlwZSwgRmlsbFR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL0NDU3ByaXRlJztcclxuXHJcbmltcG9ydCBTaW1wbGUgZnJvbSBcIi4vMmQvc2ltcGxlXCI7XHJcbmltcG9ydCBTbGljZWQgZnJvbSBcIi4vMmQvc2xpY2VkXCI7XHJcbmltcG9ydCBUaWxlZCBmcm9tIFwiLi8yZC90aWxlZFwiO1xyXG5pbXBvcnQgUmFkaWFsRmlsbGVkIGZyb20gXCIuLzJkL3JhZGlhbC1maWxsZWRcIjtcclxuaW1wb3J0IEJhckZpbGxlZCBmcm9tIFwiLi8yZC9iYXItZmlsbGVkXCI7XHJcbmltcG9ydCBNZXNoIGZyb20gJy4vMmQvbWVzaCc7XHJcblxyXG5pbXBvcnQgU2ltcGxlM0QgZnJvbSBcIi4vM2Qvc2ltcGxlXCI7XHJcbmltcG9ydCBTbGljZWQzRCBmcm9tIFwiLi8zZC9zbGljZWRcIjtcclxuaW1wb3J0IFRpbGVkM0QgZnJvbSBcIi4vM2QvdGlsZWRcIjtcclxuaW1wb3J0IFJhZGlhbEZpbGxlZDNEIGZyb20gXCIuLzNkL3JhZGlhbC1maWxsZWRcIjtcclxuaW1wb3J0IEJhckZpbGxlZDNEIGZyb20gXCIuLzNkL2Jhci1maWxsZWRcIjtcclxuaW1wb3J0IE1lc2gzRCBmcm9tICcuLzNkL21lc2gnO1xyXG5cclxubGV0IGN0b3IgPSB7XHJcbiAgICBnZXRDb25zdHJ1Y3RvcihzcHJpdGUpIHtcclxuICAgICAgICBsZXQgaXMzRE5vZGUgPSBzcHJpdGUubm9kZS5pczNETm9kZTtcclxuXHJcbiAgICAgICAgbGV0IGN0b3IgPSBpczNETm9kZSA/IFNpbXBsZTNEIDogU2ltcGxlO1xyXG4gICAgICAgIHN3aXRjaCAoc3ByaXRlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBUeXBlLlNMSUNFRDpcclxuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IFNsaWNlZDNEIDogU2xpY2VkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS5USUxFRDpcclxuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IFRpbGVkM0QgOiBUaWxlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFR5cGUuRklMTEVEOlxyXG4gICAgICAgICAgICAgICAgaWYgKHNwcml0ZS5fZmlsbFR5cGUgPT09IEZpbGxUeXBlLlJBRElBTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IFJhZGlhbEZpbGxlZDNEIDogUmFkaWFsRmlsbGVkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdG9yID0gaXMzRE5vZGUgPyBCYXJGaWxsZWQzRCA6IEJhckZpbGxlZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFR5cGUuTUVTSDpcclxuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IE1lc2gzRCA6IE1lc2g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjdG9yO1xyXG4gICAgfSxcclxuXHJcbiAgICBTaW1wbGUsXHJcbiAgICBTbGljZWQsXHJcbiAgICBUaWxlZCxcclxuICAgIFJhZGlhbEZpbGxlZCxcclxuICAgIEJhckZpbGxlZCxcclxuICAgIE1lc2gsXHJcblxyXG4gICAgU2ltcGxlM0QsXHJcbiAgICBTbGljZWQzRCxcclxuICAgIFRpbGVkM0QsXHJcbiAgICBSYWRpYWxGaWxsZWQzRCxcclxuICAgIEJhckZpbGxlZDNELFxyXG4gICAgTWVzaDNELFxyXG59O1xyXG5cclxuQXNzZW1ibGVyLnJlZ2lzdGVyKGNjLlNwcml0ZSwgY3Rvcik7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9