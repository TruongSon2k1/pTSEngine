
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/torus.js';
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
 * @param {Number} tube
 * @param {Object} opts
 * @param {Number} opts.radialSegments
 * @param {Number} opts.tubularSegments
 * @param {Number} opts.arc
 */
function _default(radius, tube, opts) {
  if (radius === void 0) {
    radius = 0.4;
  }

  if (tube === void 0) {
    tube = 0.1;
  }

  if (opts === void 0) {
    opts = {
      radialSegments: 32,
      tubularSegments: 32,
      arc: 2.0 * Math.PI
    };
  }

  var radialSegments = opts.radialSegments;
  var tubularSegments = opts.tubularSegments;
  var arc = opts.arc;
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _valueTypes.Vec3(-radius - tube, -tube, -radius - tube);
  var maxPos = new _valueTypes.Vec3(radius + tube, tube, radius + tube);
  var boundingRadius = radius + tube;

  for (var j = 0; j <= radialSegments; j++) {
    for (var i = 0; i <= tubularSegments; i++) {
      var u = i / tubularSegments;
      var v = j / radialSegments;
      var u1 = u * arc;
      var v1 = v * Math.PI * 2; // vertex

      var x = (radius + tube * Math.cos(v1)) * Math.sin(u1);
      var y = tube * Math.sin(v1);
      var z = (radius + tube * Math.cos(v1)) * Math.cos(u1); // this vector is used to calculate the normal

      var nx = Math.sin(u1) * Math.cos(v1);
      var ny = Math.sin(v1);
      var nz = Math.cos(u1) * Math.cos(v1);
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      uvs.push(u, v);

      if (i < tubularSegments && j < radialSegments) {
        var seg1 = tubularSegments + 1;
        var a = seg1 * j + i;
        var b = seg1 * (j + 1) + i;
        var c = seg1 * (j + 1) + i + 1;
        var d = seg1 * j + i + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXHRvcnVzLnRzIl0sIm5hbWVzIjpbInJhZGl1cyIsInR1YmUiLCJvcHRzIiwicmFkaWFsU2VnbWVudHMiLCJ0dWJ1bGFyU2VnbWVudHMiLCJhcmMiLCJNYXRoIiwiUEkiLCJwb3NpdGlvbnMiLCJub3JtYWxzIiwidXZzIiwiaW5kaWNlcyIsIm1pblBvcyIsIlZlYzMiLCJtYXhQb3MiLCJib3VuZGluZ1JhZGl1cyIsImoiLCJpIiwidSIsInYiLCJ1MSIsInYxIiwieCIsImNvcyIsInNpbiIsInkiLCJ6IiwibngiLCJueSIsIm56IiwicHVzaCIsInNlZzEiLCJhIiwiYiIsImMiLCJkIiwiVmVydGV4RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZSxrQkFBVUEsTUFBVixFQUF3QkMsSUFBeEIsRUFBb0NDLElBQXBDLEVBQTBHO0FBQUEsTUFBaEdGLE1BQWdHO0FBQWhHQSxJQUFBQSxNQUFnRyxHQUF2RixHQUF1RjtBQUFBOztBQUFBLE1BQWxGQyxJQUFrRjtBQUFsRkEsSUFBQUEsSUFBa0YsR0FBM0UsR0FBMkU7QUFBQTs7QUFBQSxNQUF0RUMsSUFBc0U7QUFBdEVBLElBQUFBLElBQXNFLEdBQS9EO0FBQUNDLE1BQUFBLGNBQWMsRUFBRSxFQUFqQjtBQUFxQkMsTUFBQUEsZUFBZSxFQUFFLEVBQXRDO0FBQTBDQyxNQUFBQSxHQUFHLEVBQUUsTUFBTUMsSUFBSSxDQUFDQztBQUExRCxLQUErRDtBQUFBOztBQUN2SCxNQUFJSixjQUFjLEdBQUdELElBQUksQ0FBQ0MsY0FBMUI7QUFDQSxNQUFJQyxlQUFlLEdBQUdGLElBQUksQ0FBQ0UsZUFBM0I7QUFDQSxNQUFJQyxHQUFHLEdBQUdILElBQUksQ0FBQ0csR0FBZjtBQUVBLE1BQUlHLFNBQW1CLEdBQUcsRUFBMUI7QUFDQSxNQUFJQyxPQUFpQixHQUFHLEVBQXhCO0FBQ0EsTUFBSUMsR0FBYSxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4QjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQUNiLE1BQUQsR0FBVUMsSUFBbkIsRUFBeUIsQ0FBQ0EsSUFBMUIsRUFBZ0MsQ0FBQ0QsTUFBRCxHQUFVQyxJQUExQyxDQUFiO0FBQ0EsTUFBSWEsTUFBTSxHQUFHLElBQUlELGdCQUFKLENBQVNiLE1BQU0sR0FBR0MsSUFBbEIsRUFBd0JBLElBQXhCLEVBQThCRCxNQUFNLEdBQUdDLElBQXZDLENBQWI7QUFDQSxNQUFJYyxjQUFjLEdBQUdmLE1BQU0sR0FBR0MsSUFBOUI7O0FBRUEsT0FBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJYixjQUFyQixFQUFxQ2EsQ0FBQyxFQUF0QyxFQUEwQztBQUN4QyxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUliLGVBQXJCLEVBQXNDYSxDQUFDLEVBQXZDLEVBQTJDO0FBQ3pDLFVBQUlDLENBQUMsR0FBR0QsQ0FBQyxHQUFHYixlQUFaO0FBQ0EsVUFBSWUsQ0FBQyxHQUFHSCxDQUFDLEdBQUdiLGNBQVo7QUFFQSxVQUFJaUIsRUFBRSxHQUFHRixDQUFDLEdBQUdiLEdBQWI7QUFDQSxVQUFJZ0IsRUFBRSxHQUFHRixDQUFDLEdBQUdiLElBQUksQ0FBQ0MsRUFBVCxHQUFjLENBQXZCLENBTHlDLENBT3pDOztBQUNBLFVBQUllLENBQUMsR0FBRyxDQUFDdEIsTUFBTSxHQUFHQyxJQUFJLEdBQUdLLElBQUksQ0FBQ2lCLEdBQUwsQ0FBU0YsRUFBVCxDQUFqQixJQUFpQ2YsSUFBSSxDQUFDa0IsR0FBTCxDQUFTSixFQUFULENBQXpDO0FBQ0EsVUFBSUssQ0FBQyxHQUFHeEIsSUFBSSxHQUFHSyxJQUFJLENBQUNrQixHQUFMLENBQVNILEVBQVQsQ0FBZjtBQUNBLFVBQUlLLENBQUMsR0FBRyxDQUFDMUIsTUFBTSxHQUFHQyxJQUFJLEdBQUdLLElBQUksQ0FBQ2lCLEdBQUwsQ0FBU0YsRUFBVCxDQUFqQixJQUFpQ2YsSUFBSSxDQUFDaUIsR0FBTCxDQUFTSCxFQUFULENBQXpDLENBVnlDLENBWXpDOztBQUNBLFVBQUlPLEVBQUUsR0FBR3JCLElBQUksQ0FBQ2tCLEdBQUwsQ0FBU0osRUFBVCxJQUFlZCxJQUFJLENBQUNpQixHQUFMLENBQVNGLEVBQVQsQ0FBeEI7QUFDQSxVQUFJTyxFQUFFLEdBQUd0QixJQUFJLENBQUNrQixHQUFMLENBQVNILEVBQVQsQ0FBVDtBQUNBLFVBQUlRLEVBQUUsR0FBR3ZCLElBQUksQ0FBQ2lCLEdBQUwsQ0FBU0gsRUFBVCxJQUFlZCxJQUFJLENBQUNpQixHQUFMLENBQVNGLEVBQVQsQ0FBeEI7QUFFQWIsTUFBQUEsU0FBUyxDQUFDc0IsSUFBVixDQUFlUixDQUFmLEVBQWtCRyxDQUFsQixFQUFxQkMsQ0FBckI7QUFDQWpCLE1BQUFBLE9BQU8sQ0FBQ3FCLElBQVIsQ0FBYUgsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCO0FBQ0FuQixNQUFBQSxHQUFHLENBQUNvQixJQUFKLENBQVNaLENBQVQsRUFBWUMsQ0FBWjs7QUFFQSxVQUFLRixDQUFDLEdBQUdiLGVBQUwsSUFBMEJZLENBQUMsR0FBR2IsY0FBbEMsRUFBbUQ7QUFDakQsWUFBSTRCLElBQUksR0FBRzNCLGVBQWUsR0FBRyxDQUE3QjtBQUNBLFlBQUk0QixDQUFDLEdBQUdELElBQUksR0FBR2YsQ0FBUCxHQUFXQyxDQUFuQjtBQUNBLFlBQUlnQixDQUFDLEdBQUdGLElBQUksSUFBSWYsQ0FBQyxHQUFHLENBQVIsQ0FBSixHQUFpQkMsQ0FBekI7QUFDQSxZQUFJaUIsQ0FBQyxHQUFHSCxJQUFJLElBQUlmLENBQUMsR0FBRyxDQUFSLENBQUosR0FBaUJDLENBQWpCLEdBQXFCLENBQTdCO0FBQ0EsWUFBSWtCLENBQUMsR0FBR0osSUFBSSxHQUFHZixDQUFQLEdBQVdDLENBQVgsR0FBZSxDQUF2QjtBQUVBTixRQUFBQSxPQUFPLENBQUNtQixJQUFSLENBQWFFLENBQWIsRUFBZ0JHLENBQWhCLEVBQW1CRixDQUFuQjtBQUNBdEIsUUFBQUEsT0FBTyxDQUFDbUIsSUFBUixDQUFhSyxDQUFiLEVBQWdCRCxDQUFoQixFQUFtQkQsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBTyxJQUFJRyxzQkFBSixDQUNMNUIsU0FESyxFQUVMQyxPQUZLLEVBR0xDLEdBSEssRUFJTEMsT0FKSyxFQUtMQyxNQUxLLEVBTUxFLE1BTkssRUFPTEMsY0FQSyxDQUFQO0FBU0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgVmVydGV4RGF0YSBmcm9tICcuL3ZlcnRleC1kYXRhJztcclxuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB0dWJlXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnJhZGlhbFNlZ21lbnRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnR1YnVsYXJTZWdtZW50c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyYWRpdXMgPSAwLjQsIHR1YmUgPSAwLjEsIG9wdHMgPSB7cmFkaWFsU2VnbWVudHM6IDMyLCB0dWJ1bGFyU2VnbWVudHM6IDMyLCBhcmM6IDIuMCAqIE1hdGguUEl9KSB7XHJcbiAgbGV0IHJhZGlhbFNlZ21lbnRzID0gb3B0cy5yYWRpYWxTZWdtZW50cztcclxuICBsZXQgdHVidWxhclNlZ21lbnRzID0gb3B0cy50dWJ1bGFyU2VnbWVudHM7XHJcbiAgbGV0IGFyYyA9IG9wdHMuYXJjO1xyXG5cclxuICBsZXQgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCBub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCB1dnM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IGluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IG1pblBvcyA9IG5ldyBWZWMzKC1yYWRpdXMgLSB0dWJlLCAtdHViZSwgLXJhZGl1cyAtIHR1YmUpO1xyXG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhyYWRpdXMgKyB0dWJlLCB0dWJlLCByYWRpdXMgKyB0dWJlKTtcclxuICBsZXQgYm91bmRpbmdSYWRpdXMgPSByYWRpdXMgKyB0dWJlO1xyXG5cclxuICBmb3IgKGxldCBqID0gMDsgaiA8PSByYWRpYWxTZWdtZW50czsgaisrKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0dWJ1bGFyU2VnbWVudHM7IGkrKykge1xyXG4gICAgICBsZXQgdSA9IGkgLyB0dWJ1bGFyU2VnbWVudHM7XHJcbiAgICAgIGxldCB2ID0gaiAvIHJhZGlhbFNlZ21lbnRzO1xyXG5cclxuICAgICAgbGV0IHUxID0gdSAqIGFyYztcclxuICAgICAgbGV0IHYxID0gdiAqIE1hdGguUEkgKiAyO1xyXG5cclxuICAgICAgLy8gdmVydGV4XHJcbiAgICAgIGxldCB4ID0gKHJhZGl1cyArIHR1YmUgKiBNYXRoLmNvcyh2MSkpICogTWF0aC5zaW4odTEpO1xyXG4gICAgICBsZXQgeSA9IHR1YmUgKiBNYXRoLnNpbih2MSk7XHJcbiAgICAgIGxldCB6ID0gKHJhZGl1cyArIHR1YmUgKiBNYXRoLmNvcyh2MSkpICogTWF0aC5jb3ModTEpO1xyXG5cclxuICAgICAgLy8gdGhpcyB2ZWN0b3IgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5vcm1hbFxyXG4gICAgICBsZXQgbnggPSBNYXRoLnNpbih1MSkgKiBNYXRoLmNvcyh2MSk7XHJcbiAgICAgIGxldCBueSA9IE1hdGguc2luKHYxKTtcclxuICAgICAgbGV0IG56ID0gTWF0aC5jb3ModTEpICogTWF0aC5jb3ModjEpO1xyXG5cclxuICAgICAgcG9zaXRpb25zLnB1c2goeCwgeSwgeik7XHJcbiAgICAgIG5vcm1hbHMucHVzaChueCwgbnksIG56KTtcclxuICAgICAgdXZzLnB1c2godSwgdik7XHJcblxyXG4gICAgICBpZiAoKGkgPCB0dWJ1bGFyU2VnbWVudHMpICYmIChqIDwgcmFkaWFsU2VnbWVudHMpKSB7XHJcbiAgICAgICAgbGV0IHNlZzEgPSB0dWJ1bGFyU2VnbWVudHMgKyAxO1xyXG4gICAgICAgIGxldCBhID0gc2VnMSAqIGogKyBpO1xyXG4gICAgICAgIGxldCBiID0gc2VnMSAqIChqICsgMSkgKyBpO1xyXG4gICAgICAgIGxldCBjID0gc2VnMSAqIChqICsgMSkgKyBpICsgMTtcclxuICAgICAgICBsZXQgZCA9IHNlZzEgKiBqICsgaSArIDE7XHJcblxyXG4gICAgICAgIGluZGljZXMucHVzaChhLCBkLCBiKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2goZCwgYywgYik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgVmVydGV4RGF0YShcclxuICAgIHBvc2l0aW9ucyxcclxuICAgIG5vcm1hbHMsXHJcbiAgICB1dnMsXHJcbiAgICBpbmRpY2VzLFxyXG4gICAgbWluUG9zLFxyXG4gICAgbWF4UG9zLFxyXG4gICAgYm91bmRpbmdSYWRpdXNcclxuICApO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9