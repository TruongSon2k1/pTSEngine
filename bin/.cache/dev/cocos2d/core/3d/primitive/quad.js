
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/quad.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _vertexData = _interopRequireDefault(require("./vertex-data"));

var _valueTypes = require("../../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var positions = [-0.5, -0.5, 0, // bottom-left
-0.5, 0.5, 0, // top-left
0.5, 0.5, 0, // top-right
0.5, -0.5, 0 // bottom-right
];
var normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
var uvs = [0, 0, 0, 1, 1, 1, 1, 0];
var indices = [0, 3, 1, 3, 2, 1]; // TODO: ?

var minPos = new _valueTypes.Vec3(-0.5, -0.5, 0);
var maxPos = new _valueTypes.Vec3(0.5, 0.5, 0);
var boundingRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);

function _default() {
  return new _vertexData["default"](positions, normals, uvs, indices, minPos, maxPos, boundingRadius);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXHF1YWQudHMiXSwibmFtZXMiOlsicG9zaXRpb25zIiwibm9ybWFscyIsInV2cyIsImluZGljZXMiLCJtaW5Qb3MiLCJWZWMzIiwibWF4UG9zIiwiYm91bmRpbmdSYWRpdXMiLCJNYXRoIiwic3FydCIsIlZlcnRleERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxTQUFTLEdBQUcsQ0FDZCxDQUFDLEdBRGEsRUFDUixDQUFDLEdBRE8sRUFDRixDQURFLEVBQ0M7QUFDZixDQUFDLEdBRmEsRUFFUCxHQUZPLEVBRUYsQ0FGRSxFQUVDO0FBQ2QsR0FIYSxFQUdQLEdBSE8sRUFHRixDQUhFLEVBR0M7QUFDZCxHQUphLEVBSVIsQ0FBQyxHQUpPLEVBSUYsQ0FKRSxDQUlDO0FBSkQsQ0FBaEI7QUFPQSxJQUFJQyxPQUFPLEdBQUcsQ0FDWixDQURZLEVBQ1QsQ0FEUyxFQUNOLENBRE0sRUFFWixDQUZZLEVBRVQsQ0FGUyxFQUVOLENBRk0sRUFHWixDQUhZLEVBR1QsQ0FIUyxFQUdOLENBSE0sRUFJWixDQUpZLEVBSVQsQ0FKUyxFQUlOLENBSk0sQ0FBZDtBQU9BLElBQUlDLEdBQUcsR0FBRyxDQUNSLENBRFEsRUFDTCxDQURLLEVBRVIsQ0FGUSxFQUVMLENBRkssRUFHUixDQUhRLEVBR0wsQ0FISyxFQUlSLENBSlEsRUFJTCxDQUpLLENBQVY7QUFPQSxJQUFJQyxPQUFPLEdBQUcsQ0FDWixDQURZLEVBQ1QsQ0FEUyxFQUNOLENBRE0sRUFFWixDQUZZLEVBRVQsQ0FGUyxFQUVOLENBRk0sQ0FBZCxFQUtBOztBQUNBLElBQUlDLE1BQU0sR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQUMsR0FBVixFQUFlLENBQUMsR0FBaEIsRUFBcUIsQ0FBckIsQ0FBYjtBQUNBLElBQUlDLE1BQU0sR0FBRyxJQUFJRCxnQkFBSixDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLENBQW5CLENBQWI7QUFDQSxJQUFJRSxjQUFjLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVLE1BQU0sR0FBTixHQUFZLE1BQU0sR0FBNUIsQ0FBckI7O0FBRWUsb0JBQVk7QUFDekIsU0FBTyxJQUFJQyxzQkFBSixDQUNMVixTQURLLEVBRUxDLE9BRkssRUFHTEMsR0FISyxFQUlMQyxPQUpLLEVBS0xDLE1BTEssRUFNTEUsTUFOSyxFQU9MQyxjQVBLLENBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xyXG5pbXBvcnQgeyBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5cclxubGV0IHBvc2l0aW9ucyA9IFtcclxuICAtMC41LCAtMC41LCAwLCAvLyBib3R0b20tbGVmdFxyXG4gIC0wLjUsICAwLjUsIDAsIC8vIHRvcC1sZWZ0XHJcbiAgIDAuNSwgIDAuNSwgMCwgLy8gdG9wLXJpZ2h0XHJcbiAgIDAuNSwgLTAuNSwgMCwgLy8gYm90dG9tLXJpZ2h0XHJcbl07XHJcblxyXG5sZXQgbm9ybWFscyA9IFtcclxuICAwLCAwLCAxLFxyXG4gIDAsIDAsIDEsXHJcbiAgMCwgMCwgMSxcclxuICAwLCAwLCAxLFxyXG5dO1xyXG5cclxubGV0IHV2cyA9IFtcclxuICAwLCAwLFxyXG4gIDAsIDEsXHJcbiAgMSwgMSxcclxuICAxLCAwLFxyXG5dO1xyXG5cclxubGV0IGluZGljZXMgPSBbXHJcbiAgMCwgMywgMSxcclxuICAzLCAyLCAxXHJcbl07XHJcblxyXG4vLyBUT0RPOiA/XHJcbmxldCBtaW5Qb3MgPSBuZXcgVmVjMygtMC41LCAtMC41LCAwKTtcclxubGV0IG1heFBvcyA9IG5ldyBWZWMzKDAuNSwgMC41LCAwKTtcclxubGV0IGJvdW5kaW5nUmFkaXVzID0gTWF0aC5zcXJ0KDAuNSAqIDAuNSArIDAuNSAqIDAuNSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIG5ldyBWZXJ0ZXhEYXRhKFxyXG4gICAgcG9zaXRpb25zLFxyXG4gICAgbm9ybWFscyxcclxuICAgIHV2cyxcclxuICAgIGluZGljZXMsXHJcbiAgICBtaW5Qb3MsXHJcbiAgICBtYXhQb3MsXHJcbiAgICBib3VuZGluZ1JhZGl1c1xyXG4gICk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=