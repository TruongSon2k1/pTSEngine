
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/sphere.js';
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

/**
 * @param {Number} radius
 * @param {Object} opts
 * @param {Number} opts.segments
 */
function _default(radius, opts) {
  if (radius === void 0) {
    radius = 0.5;
  }

  if (opts === void 0) {
    opts = {
      segments: 32
    };
  }

  var segments = opts.segments; // lat === latitude
  // lon === longitude

  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _valueTypes.Vec3(-radius, -radius, -radius);
  var maxPos = new _valueTypes.Vec3(radius, radius, radius);
  var boundingRadius = radius;

  for (var lat = 0; lat <= segments; ++lat) {
    var theta = lat * Math.PI / segments;
    var sinTheta = Math.sin(theta);
    var cosTheta = -Math.cos(theta);

    for (var lon = 0; lon <= segments; ++lon) {
      var phi = lon * 2 * Math.PI / segments - Math.PI / 2.0;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = sinPhi * sinTheta;
      var y = cosTheta;
      var z = cosPhi * sinTheta;
      var u = lon / segments;
      var v = lat / segments;
      positions.push(x * radius, y * radius, z * radius);
      normals.push(x, y, z);
      uvs.push(u, v);

      if (lat < segments && lon < segments) {
        var seg1 = segments + 1;
        var a = seg1 * lat + lon;
        var b = seg1 * (lat + 1) + lon;
        var c = seg1 * (lat + 1) + lon + 1;
        var d = seg1 * lat + lon + 1;
        indices.push(a, d, b);
        indices.push(d, c, b);
      }
    }
  }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXHNwaGVyZS50cyJdLCJuYW1lcyI6WyJyYWRpdXMiLCJvcHRzIiwic2VnbWVudHMiLCJwb3NpdGlvbnMiLCJub3JtYWxzIiwidXZzIiwiaW5kaWNlcyIsIm1pblBvcyIsIlZlYzMiLCJtYXhQb3MiLCJib3VuZGluZ1JhZGl1cyIsImxhdCIsInRoZXRhIiwiTWF0aCIsIlBJIiwic2luVGhldGEiLCJzaW4iLCJjb3NUaGV0YSIsImNvcyIsImxvbiIsInBoaSIsInNpblBoaSIsImNvc1BoaSIsIngiLCJ5IiwieiIsInUiLCJ2IiwicHVzaCIsInNlZzEiLCJhIiwiYiIsImMiLCJkIiwiVmVydGV4RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxrQkFBVUEsTUFBVixFQUF3QkMsSUFBeEIsRUFBK0M7QUFBQSxNQUFyQ0QsTUFBcUM7QUFBckNBLElBQUFBLE1BQXFDLEdBQTVCLEdBQTRCO0FBQUE7O0FBQUEsTUFBdkJDLElBQXVCO0FBQXZCQSxJQUFBQSxJQUF1QixHQUFoQjtBQUFDQyxNQUFBQSxRQUFRLEVBQUU7QUFBWCxLQUFnQjtBQUFBOztBQUM1RCxNQUFJQSxRQUFRLEdBQUdELElBQUksQ0FBQ0MsUUFBcEIsQ0FENEQsQ0FHNUQ7QUFDQTs7QUFFQSxNQUFJQyxTQUFtQixHQUFHLEVBQTFCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4QjtBQUNBLE1BQUlDLEdBQWEsR0FBRyxFQUFwQjtBQUNBLE1BQUlDLE9BQWlCLEdBQUcsRUFBeEI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsSUFBSUMsZ0JBQUosQ0FBUyxDQUFDUixNQUFWLEVBQWtCLENBQUNBLE1BQW5CLEVBQTJCLENBQUNBLE1BQTVCLENBQWI7QUFDQSxNQUFJUyxNQUFNLEdBQUcsSUFBSUQsZ0JBQUosQ0FBU1IsTUFBVCxFQUFpQkEsTUFBakIsRUFBeUJBLE1BQXpCLENBQWI7QUFDQSxNQUFJVSxjQUFjLEdBQUdWLE1BQXJCOztBQUVBLE9BQUssSUFBSVcsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsSUFBSVQsUUFBekIsRUFBbUMsRUFBRVMsR0FBckMsRUFBMEM7QUFDeEMsUUFBSUMsS0FBSyxHQUFHRCxHQUFHLEdBQUdFLElBQUksQ0FBQ0MsRUFBWCxHQUFnQlosUUFBNUI7QUFDQSxRQUFJYSxRQUFRLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxDQUFTSixLQUFULENBQWY7QUFDQSxRQUFJSyxRQUFRLEdBQUcsQ0FBQ0osSUFBSSxDQUFDSyxHQUFMLENBQVNOLEtBQVQsQ0FBaEI7O0FBRUEsU0FBSyxJQUFJTyxHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxJQUFJakIsUUFBekIsRUFBbUMsRUFBRWlCLEdBQXJDLEVBQTBDO0FBQ3hDLFVBQUlDLEdBQUcsR0FBR0QsR0FBRyxHQUFHLENBQU4sR0FBVU4sSUFBSSxDQUFDQyxFQUFmLEdBQW9CWixRQUFwQixHQUErQlcsSUFBSSxDQUFDQyxFQUFMLEdBQVUsR0FBbkQ7QUFDQSxVQUFJTyxNQUFNLEdBQUdSLElBQUksQ0FBQ0csR0FBTCxDQUFTSSxHQUFULENBQWI7QUFDQSxVQUFJRSxNQUFNLEdBQUdULElBQUksQ0FBQ0ssR0FBTCxDQUFTRSxHQUFULENBQWI7QUFFQSxVQUFJRyxDQUFDLEdBQUdGLE1BQU0sR0FBR04sUUFBakI7QUFDQSxVQUFJUyxDQUFDLEdBQUdQLFFBQVI7QUFDQSxVQUFJUSxDQUFDLEdBQUdILE1BQU0sR0FBR1AsUUFBakI7QUFDQSxVQUFJVyxDQUFDLEdBQUdQLEdBQUcsR0FBR2pCLFFBQWQ7QUFDQSxVQUFJeUIsQ0FBQyxHQUFHaEIsR0FBRyxHQUFHVCxRQUFkO0FBRUFDLE1BQUFBLFNBQVMsQ0FBQ3lCLElBQVYsQ0FBZUwsQ0FBQyxHQUFHdkIsTUFBbkIsRUFBMkJ3QixDQUFDLEdBQUd4QixNQUEvQixFQUF1Q3lCLENBQUMsR0FBR3pCLE1BQTNDO0FBQ0FJLE1BQUFBLE9BQU8sQ0FBQ3dCLElBQVIsQ0FBYUwsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CO0FBQ0FwQixNQUFBQSxHQUFHLENBQUN1QixJQUFKLENBQVNGLENBQVQsRUFBWUMsQ0FBWjs7QUFHQSxVQUFLaEIsR0FBRyxHQUFHVCxRQUFQLElBQXFCaUIsR0FBRyxHQUFHakIsUUFBL0IsRUFBMEM7QUFDeEMsWUFBSTJCLElBQUksR0FBRzNCLFFBQVEsR0FBRyxDQUF0QjtBQUNBLFlBQUk0QixDQUFDLEdBQUdELElBQUksR0FBR2xCLEdBQVAsR0FBYVEsR0FBckI7QUFDQSxZQUFJWSxDQUFDLEdBQUdGLElBQUksSUFBSWxCLEdBQUcsR0FBRyxDQUFWLENBQUosR0FBbUJRLEdBQTNCO0FBQ0EsWUFBSWEsQ0FBQyxHQUFHSCxJQUFJLElBQUlsQixHQUFHLEdBQUcsQ0FBVixDQUFKLEdBQW1CUSxHQUFuQixHQUF5QixDQUFqQztBQUNBLFlBQUljLENBQUMsR0FBR0osSUFBSSxHQUFHbEIsR0FBUCxHQUFhUSxHQUFiLEdBQW1CLENBQTNCO0FBRUFiLFFBQUFBLE9BQU8sQ0FBQ3NCLElBQVIsQ0FBYUUsQ0FBYixFQUFnQkcsQ0FBaEIsRUFBbUJGLENBQW5CO0FBQ0F6QixRQUFBQSxPQUFPLENBQUNzQixJQUFSLENBQWFLLENBQWIsRUFBZ0JELENBQWhCLEVBQW1CRCxDQUFuQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPLElBQUlHLHNCQUFKLENBQ0wvQixTQURLLEVBRUxDLE9BRkssRUFHTEMsR0FISyxFQUlMQyxPQUpLLEVBS0xDLE1BTEssRUFNTEUsTUFOSyxFQU9MQyxjQVBLLENBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xyXG5pbXBvcnQgeyBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuc2VnbWVudHNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyYWRpdXMgPSAwLjUsIG9wdHMgPSB7c2VnbWVudHM6IDMyfSkge1xyXG4gIGxldCBzZWdtZW50cyA9IG9wdHMuc2VnbWVudHM7XHJcblxyXG4gIC8vIGxhdCA9PT0gbGF0aXR1ZGVcclxuICAvLyBsb24gPT09IGxvbmdpdHVkZVxyXG5cclxuICBsZXQgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCBub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCB1dnM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IGluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IG1pblBvcyA9IG5ldyBWZWMzKC1yYWRpdXMsIC1yYWRpdXMsIC1yYWRpdXMpO1xyXG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhyYWRpdXMsIHJhZGl1cywgcmFkaXVzKTtcclxuICBsZXQgYm91bmRpbmdSYWRpdXMgPSByYWRpdXM7XHJcblxyXG4gIGZvciAobGV0IGxhdCA9IDA7IGxhdCA8PSBzZWdtZW50czsgKytsYXQpIHtcclxuICAgIGxldCB0aGV0YSA9IGxhdCAqIE1hdGguUEkgLyBzZWdtZW50cztcclxuICAgIGxldCBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgIGxldCBjb3NUaGV0YSA9IC1NYXRoLmNvcyh0aGV0YSk7XHJcblxyXG4gICAgZm9yIChsZXQgbG9uID0gMDsgbG9uIDw9IHNlZ21lbnRzOyArK2xvbikge1xyXG4gICAgICBsZXQgcGhpID0gbG9uICogMiAqIE1hdGguUEkgLyBzZWdtZW50cyAtIE1hdGguUEkgLyAyLjA7XHJcbiAgICAgIGxldCBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xyXG4gICAgICBsZXQgY29zUGhpID0gTWF0aC5jb3MocGhpKTtcclxuXHJcbiAgICAgIGxldCB4ID0gc2luUGhpICogc2luVGhldGE7XHJcbiAgICAgIGxldCB5ID0gY29zVGhldGE7XHJcbiAgICAgIGxldCB6ID0gY29zUGhpICogc2luVGhldGE7XHJcbiAgICAgIGxldCB1ID0gbG9uIC8gc2VnbWVudHM7XHJcbiAgICAgIGxldCB2ID0gbGF0IC8gc2VnbWVudHM7XHJcblxyXG4gICAgICBwb3NpdGlvbnMucHVzaCh4ICogcmFkaXVzLCB5ICogcmFkaXVzLCB6ICogcmFkaXVzKTtcclxuICAgICAgbm9ybWFscy5wdXNoKHgsIHksIHopO1xyXG4gICAgICB1dnMucHVzaCh1LCB2KTtcclxuXHJcblxyXG4gICAgICBpZiAoKGxhdCA8IHNlZ21lbnRzKSAmJiAobG9uIDwgc2VnbWVudHMpKSB7XHJcbiAgICAgICAgbGV0IHNlZzEgPSBzZWdtZW50cyArIDE7XHJcbiAgICAgICAgbGV0IGEgPSBzZWcxICogbGF0ICsgbG9uO1xyXG4gICAgICAgIGxldCBiID0gc2VnMSAqIChsYXQgKyAxKSArIGxvbjtcclxuICAgICAgICBsZXQgYyA9IHNlZzEgKiAobGF0ICsgMSkgKyBsb24gKyAxO1xyXG4gICAgICAgIGxldCBkID0gc2VnMSAqIGxhdCArIGxvbiArIDE7XHJcblxyXG4gICAgICAgIGluZGljZXMucHVzaChhLCBkLCBiKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2goZCwgYywgYik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgVmVydGV4RGF0YShcclxuICAgIHBvc2l0aW9ucyxcclxuICAgIG5vcm1hbHMsXHJcbiAgICB1dnMsXHJcbiAgICBpbmRpY2VzLFxyXG4gICAgbWluUG9zLFxyXG4gICAgbWF4UG9zLFxyXG4gICAgYm91bmRpbmdSYWRpdXNcclxuICApO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9