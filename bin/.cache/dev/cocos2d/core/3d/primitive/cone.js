
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/cone.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _cylinder = _interopRequireDefault(require("./cylinder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {Number} radius
 * @param {Number} height
 * @param {Object} opts
 * @param {Number} opts.radialSegments
 * @param {Number} opts.heightSegments
 * @param {Boolean} opts.capped
 * @param {Number} opts.arc
 */
function _default(radius, height, opts) {
  if (radius === void 0) {
    radius = 0.5;
  }

  if (height === void 0) {
    height = 1;
  }

  if (opts === void 0) {
    opts = {
      radialSegments: 32,
      heightSegments: 1,
      capped: true,
      arc: 2.0 * Math.PI
    };
  }

  return (0, _cylinder["default"])(0, radius, height, opts);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXGNvbmUudHMiXSwibmFtZXMiOlsicmFkaXVzIiwiaGVpZ2h0Iiwib3B0cyIsInJhZGlhbFNlZ21lbnRzIiwiaGVpZ2h0U2VnbWVudHMiLCJjYXBwZWQiLCJhcmMiLCJNYXRoIiwiUEkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUE7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxrQkFBVUEsTUFBVixFQUF3QkMsTUFBeEIsRUFBb0NDLElBQXBDLEVBQXNIO0FBQUEsTUFBNUdGLE1BQTRHO0FBQTVHQSxJQUFBQSxNQUE0RyxHQUFuRyxHQUFtRztBQUFBOztBQUFBLE1BQTlGQyxNQUE4RjtBQUE5RkEsSUFBQUEsTUFBOEYsR0FBckYsQ0FBcUY7QUFBQTs7QUFBQSxNQUFsRkMsSUFBa0Y7QUFBbEZBLElBQUFBLElBQWtGLEdBQTNFO0FBQUNDLE1BQUFBLGNBQWMsRUFBRSxFQUFqQjtBQUFxQkMsTUFBQUEsY0FBYyxFQUFFLENBQXJDO0FBQXdDQyxNQUFBQSxNQUFNLEVBQUUsSUFBaEQ7QUFBc0RDLE1BQUFBLEdBQUcsRUFBRSxNQUFNQyxJQUFJLENBQUNDO0FBQXRFLEtBQTJFO0FBQUE7O0FBQ25JLFNBQU8sMEJBQVMsQ0FBVCxFQUFZUixNQUFaLEVBQW9CQyxNQUFwQixFQUE0QkMsSUFBNUIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IGN5bGluZGVyIGZyb20gJy4vY3lsaW5kZXInO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcclxuICogQHBhcmFtIHtOdW1iZXJ9IGhlaWdodFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5yYWRpYWxTZWdtZW50c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5oZWlnaHRTZWdtZW50c1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuY2FwcGVkXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmFyY1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJhZGl1cyA9IDAuNSwgaGVpZ2h0ID0gMSwgb3B0cyA9IHtyYWRpYWxTZWdtZW50czogMzIsIGhlaWdodFNlZ21lbnRzOiAxLCBjYXBwZWQ6IHRydWUsIGFyYzogMi4wICogTWF0aC5QSX0pIHtcclxuICByZXR1cm4gY3lsaW5kZXIoMCwgcmFkaXVzLCBoZWlnaHQsIG9wdHMpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9