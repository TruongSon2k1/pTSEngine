
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/sprite/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCSprite = require("../../../../components/CCSprite");

var _simple = _interopRequireDefault(require("./simple"));

var _sliced = _interopRequireDefault(require("./sliced"));

var _tiled = _interopRequireDefault(require("./tiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ctor = {
  getConstructor: function getConstructor(sprite) {
    var ctor = _simple["default"];

    switch (sprite.type) {
      case _CCSprite.Type.SLICED:
        ctor = _sliced["default"];
        break;

      case _CCSprite.Type.TILED:
        ctor = _tiled["default"];
        break;
    }

    return ctor;
  },
  Simple: _simple["default"],
  Sliced: _sliced["default"],
  Tiled: _tiled["default"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXHJlbmRlcmVyc1xcc3ByaXRlXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJjdG9yIiwiZ2V0Q29uc3RydWN0b3IiLCJzcHJpdGUiLCJTaW1wbGUiLCJ0eXBlIiwiVHlwZSIsIlNMSUNFRCIsIlNsaWNlZCIsIlRJTEVEIiwiVGlsZWQiLCJBc2VtYmxlciIsInJlZ2lzdGVyIiwiY2MiLCJTcHJpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLElBQUksR0FBRztBQUNQQyxFQUFBQSxjQURPLDBCQUNRQyxNQURSLEVBQ2dCO0FBQ25CLFFBQUlGLElBQUksR0FBR0csa0JBQVg7O0FBQ0EsWUFBUUQsTUFBTSxDQUFDRSxJQUFmO0FBQ0ksV0FBS0MsZUFBS0MsTUFBVjtBQUNJTixRQUFBQSxJQUFJLEdBQUdPLGtCQUFQO0FBQ0E7O0FBQ0osV0FBS0YsZUFBS0csS0FBVjtBQUNJUixRQUFBQSxJQUFJLEdBQUdTLGlCQUFQO0FBQ0E7QUFOUjs7QUFTQSxXQUFPVCxJQUFQO0FBQ0gsR0FiTTtBQWVQRyxFQUFBQSxNQUFNLEVBQU5BLGtCQWZPO0FBZ0JQSSxFQUFBQSxNQUFNLEVBQU5BLGtCQWhCTztBQWlCUEUsRUFBQUEsS0FBSyxFQUFMQTtBQWpCTyxDQUFYOztBQW9CQUMsc0JBQVNDLFFBQVQsQ0FBa0JDLEVBQUUsQ0FBQ0MsTUFBckIsRUFBNkJiLElBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL0NDU3ByaXRlJztcclxuXHJcbmltcG9ydCBTaW1wbGUgZnJvbSBcIi4vc2ltcGxlXCI7XHJcbmltcG9ydCBTbGljZWQgZnJvbSBcIi4vc2xpY2VkXCI7XHJcbmltcG9ydCBUaWxlZCBmcm9tIFwiLi90aWxlZFwiO1xyXG5cclxubGV0IGN0b3IgPSB7XHJcbiAgICBnZXRDb25zdHJ1Y3RvcihzcHJpdGUpIHtcclxuICAgICAgICBsZXQgY3RvciA9IFNpbXBsZTtcclxuICAgICAgICBzd2l0Y2ggKHNwcml0ZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS5TTElDRUQ6XHJcbiAgICAgICAgICAgICAgICBjdG9yID0gU2xpY2VkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS5USUxFRDpcclxuICAgICAgICAgICAgICAgIGN0b3IgPSBUaWxlZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGN0b3I7XHJcbiAgICB9LFxyXG5cclxuICAgIFNpbXBsZSxcclxuICAgIFNsaWNlZCxcclxuICAgIFRpbGVkXHJcbn07XHJcblxyXG5Bc2VtYmxlci5yZWdpc3RlcihjYy5TcHJpdGUsIGN0b3IpO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==