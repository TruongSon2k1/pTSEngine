
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/plane.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _vec = _interopRequireDefault(require("../../value-types/vec3"));

var _vertexData = _interopRequireDefault(require("./vertex-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var temp1 = new _vec["default"]();
var temp2 = new _vec["default"]();
var temp3 = new _vec["default"]();
var r = new _vec["default"]();
var c00 = new _vec["default"]();
var c10 = new _vec["default"]();
var c01 = new _vec["default"]();
/**
 * @param {Number} width
 * @param {Number} length
 * @param {Object} opts
 * @param {Number} opts.widthSegments
 * @param {Number} opts.lengthSegments
 */

function _default(width, length, opts) {
  if (width === void 0) {
    width = 10;
  }

  if (length === void 0) {
    length = 10;
  }

  if (opts === void 0) {
    opts = {
      widthSegments: 10,
      lengthSegments: 10
    };
  }

  var uSegments = opts.widthSegments;
  var vSegments = opts.lengthSegments;
  var hw = width * 0.5;
  var hl = length * 0.5;
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _vec["default"](-hw, 0, -hl);
  var maxPos = new _vec["default"](hw, 0, hl);
  var boundingRadius = Math.sqrt(width * width + length * length);

  _vec["default"].set(c00, -hw, 0, hl);

  _vec["default"].set(c10, hw, 0, hl);

  _vec["default"].set(c01, -hw, 0, -hl);

  for (var y = 0; y <= vSegments; y++) {
    for (var x = 0; x <= uSegments; x++) {
      var u = x / uSegments;
      var v = y / vSegments;

      _vec["default"].lerp(temp1, c00, c10, u);

      _vec["default"].lerp(temp2, c00, c01, v);

      _vec["default"].sub(temp3, temp2, c00);

      _vec["default"].add(r, temp1, temp3);

      positions.push(r.x, r.y, r.z);
      normals.push(0, 1, 0);
      uvs.push(u, v);

      if (x < uSegments && y < vSegments) {
        var useg1 = uSegments + 1;
        var a = x + y * useg1;
        var b = x + (y + 1) * useg1;
        var c = x + 1 + (y + 1) * useg1;
        var d = x + 1 + y * useg1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXHBsYW5lLnRzIl0sIm5hbWVzIjpbInRlbXAxIiwiVmVjMyIsInRlbXAyIiwidGVtcDMiLCJyIiwiYzAwIiwiYzEwIiwiYzAxIiwid2lkdGgiLCJsZW5ndGgiLCJvcHRzIiwid2lkdGhTZWdtZW50cyIsImxlbmd0aFNlZ21lbnRzIiwidVNlZ21lbnRzIiwidlNlZ21lbnRzIiwiaHciLCJobCIsInBvc2l0aW9ucyIsIm5vcm1hbHMiLCJ1dnMiLCJpbmRpY2VzIiwibWluUG9zIiwibWF4UG9zIiwiYm91bmRpbmdSYWRpdXMiLCJNYXRoIiwic3FydCIsInNldCIsInkiLCJ4IiwidSIsInYiLCJsZXJwIiwic3ViIiwiYWRkIiwicHVzaCIsInoiLCJ1c2VnMSIsImEiLCJiIiwiYyIsImQiLCJWZXJ0ZXhEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7OztBQUVBOztBQUNBOzs7O0FBRUEsSUFBSUEsS0FBSyxHQUFHLElBQUlDLGVBQUosRUFBWjtBQUNBLElBQUlDLEtBQUssR0FBRyxJQUFJRCxlQUFKLEVBQVo7QUFDQSxJQUFJRSxLQUFLLEdBQUcsSUFBSUYsZUFBSixFQUFaO0FBQ0EsSUFBSUcsQ0FBQyxHQUFHLElBQUlILGVBQUosRUFBUjtBQUNBLElBQUlJLEdBQUcsR0FBRyxJQUFJSixlQUFKLEVBQVY7QUFDQSxJQUFJSyxHQUFHLEdBQUcsSUFBSUwsZUFBSixFQUFWO0FBQ0EsSUFBSU0sR0FBRyxHQUFHLElBQUlOLGVBQUosRUFBVjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNlLGtCQUFVTyxLQUFWLEVBQXNCQyxNQUF0QixFQUFtQ0MsSUFBbkMsRUFBbUY7QUFBQSxNQUF6RUYsS0FBeUU7QUFBekVBLElBQUFBLEtBQXlFLEdBQWpFLEVBQWlFO0FBQUE7O0FBQUEsTUFBN0RDLE1BQTZEO0FBQTdEQSxJQUFBQSxNQUE2RCxHQUFwRCxFQUFvRDtBQUFBOztBQUFBLE1BQWhEQyxJQUFnRDtBQUFoREEsSUFBQUEsSUFBZ0QsR0FBekM7QUFBQ0MsTUFBQUEsYUFBYSxFQUFFLEVBQWhCO0FBQW9CQyxNQUFBQSxjQUFjLEVBQUU7QUFBcEMsS0FBeUM7QUFBQTs7QUFDaEcsTUFBSUMsU0FBUyxHQUFHSCxJQUFJLENBQUNDLGFBQXJCO0FBQ0EsTUFBSUcsU0FBUyxHQUFHSixJQUFJLENBQUNFLGNBQXJCO0FBRUEsTUFBSUcsRUFBRSxHQUFHUCxLQUFLLEdBQUcsR0FBakI7QUFDQSxNQUFJUSxFQUFFLEdBQUdQLE1BQU0sR0FBRyxHQUFsQjtBQUVBLE1BQUlRLFNBQW1CLEdBQUcsRUFBMUI7QUFDQSxNQUFJQyxPQUFpQixHQUFHLEVBQXhCO0FBQ0EsTUFBSUMsR0FBYSxHQUFHLEVBQXBCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4QjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxJQUFJcEIsZUFBSixDQUFTLENBQUNjLEVBQVYsRUFBYyxDQUFkLEVBQWlCLENBQUNDLEVBQWxCLENBQWI7QUFDQSxNQUFJTSxNQUFNLEdBQUcsSUFBSXJCLGVBQUosQ0FBU2MsRUFBVCxFQUFhLENBQWIsRUFBZ0JDLEVBQWhCLENBQWI7QUFDQSxNQUFJTyxjQUFjLEdBQUdDLElBQUksQ0FBQ0MsSUFBTCxDQUFVakIsS0FBSyxHQUFHQSxLQUFSLEdBQWdCQyxNQUFNLEdBQUdBLE1BQW5DLENBQXJCOztBQUVBUixrQkFBS3lCLEdBQUwsQ0FBU3JCLEdBQVQsRUFBYyxDQUFDVSxFQUFmLEVBQW1CLENBQW5CLEVBQXVCQyxFQUF2Qjs7QUFDQWYsa0JBQUt5QixHQUFMLENBQVNwQixHQUFULEVBQWVTLEVBQWYsRUFBbUIsQ0FBbkIsRUFBdUJDLEVBQXZCOztBQUNBZixrQkFBS3lCLEdBQUwsQ0FBU25CLEdBQVQsRUFBYyxDQUFDUSxFQUFmLEVBQW1CLENBQW5CLEVBQXNCLENBQUNDLEVBQXZCOztBQUVBLE9BQUssSUFBSVcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsSUFBSWIsU0FBckIsRUFBZ0NhLENBQUMsRUFBakMsRUFBcUM7QUFDbkMsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJZixTQUFyQixFQUFnQ2UsQ0FBQyxFQUFqQyxFQUFxQztBQUNuQyxVQUFJQyxDQUFDLEdBQUdELENBQUMsR0FBR2YsU0FBWjtBQUNBLFVBQUlpQixDQUFDLEdBQUdILENBQUMsR0FBR2IsU0FBWjs7QUFFQWIsc0JBQUs4QixJQUFMLENBQVUvQixLQUFWLEVBQWlCSyxHQUFqQixFQUFzQkMsR0FBdEIsRUFBMkJ1QixDQUEzQjs7QUFDQTVCLHNCQUFLOEIsSUFBTCxDQUFVN0IsS0FBVixFQUFpQkcsR0FBakIsRUFBc0JFLEdBQXRCLEVBQTJCdUIsQ0FBM0I7O0FBQ0E3QixzQkFBSytCLEdBQUwsQ0FBUzdCLEtBQVQsRUFBZ0JELEtBQWhCLEVBQXVCRyxHQUF2Qjs7QUFDQUosc0JBQUtnQyxHQUFMLENBQVM3QixDQUFULEVBQVlKLEtBQVosRUFBbUJHLEtBQW5COztBQUVBYyxNQUFBQSxTQUFTLENBQUNpQixJQUFWLENBQWU5QixDQUFDLENBQUN3QixDQUFqQixFQUFvQnhCLENBQUMsQ0FBQ3VCLENBQXRCLEVBQXlCdkIsQ0FBQyxDQUFDK0IsQ0FBM0I7QUFDQWpCLE1BQUFBLE9BQU8sQ0FBQ2dCLElBQVIsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CO0FBQ0FmLE1BQUFBLEdBQUcsQ0FBQ2UsSUFBSixDQUFTTCxDQUFULEVBQVlDLENBQVo7O0FBRUEsVUFBS0YsQ0FBQyxHQUFHZixTQUFMLElBQW9CYyxDQUFDLEdBQUdiLFNBQTVCLEVBQXdDO0FBQ3RDLFlBQUlzQixLQUFLLEdBQUd2QixTQUFTLEdBQUcsQ0FBeEI7QUFDQSxZQUFJd0IsQ0FBQyxHQUFHVCxDQUFDLEdBQUdELENBQUMsR0FBR1MsS0FBaEI7QUFDQSxZQUFJRSxDQUFDLEdBQUdWLENBQUMsR0FBRyxDQUFDRCxDQUFDLEdBQUcsQ0FBTCxJQUFVUyxLQUF0QjtBQUNBLFlBQUlHLENBQUMsR0FBSVgsQ0FBQyxHQUFHLENBQUwsR0FBVSxDQUFDRCxDQUFDLEdBQUcsQ0FBTCxJQUFVUyxLQUE1QjtBQUNBLFlBQUlJLENBQUMsR0FBSVosQ0FBQyxHQUFHLENBQUwsR0FBVUQsQ0FBQyxHQUFHUyxLQUF0QjtBQUVBaEIsUUFBQUEsT0FBTyxDQUFDYyxJQUFSLENBQWFHLENBQWIsRUFBZ0JHLENBQWhCLEVBQW1CRixDQUFuQjtBQUNBbEIsUUFBQUEsT0FBTyxDQUFDYyxJQUFSLENBQWFNLENBQWIsRUFBZ0JELENBQWhCLEVBQW1CRCxDQUFuQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPLElBQUlHLHNCQUFKLENBQ0x4QixTQURLLEVBRUxDLE9BRkssRUFHTEMsR0FISyxFQUlMQyxPQUpLLEVBS0xDLE1BTEssRUFNTEMsTUFOSyxFQU9MQyxjQVBLLENBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xyXG5pbXBvcnQgVmVydGV4RGF0YSBmcm9tICcuL3ZlcnRleC1kYXRhJztcclxuXHJcbmxldCB0ZW1wMSA9IG5ldyBWZWMzKCk7XHJcbmxldCB0ZW1wMiA9IG5ldyBWZWMzKCk7XHJcbmxldCB0ZW1wMyA9IG5ldyBWZWMzKCk7XHJcbmxldCByID0gbmV3IFZlYzMoKTtcclxubGV0IGMwMCA9IG5ldyBWZWMzKCk7XHJcbmxldCBjMTAgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzAxID0gbmV3IFZlYzMoKTtcclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy53aWR0aFNlZ21lbnRzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmxlbmd0aFNlZ21lbnRzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2lkdGggPSAxMCwgbGVuZ3RoID0gMTAsIG9wdHMgPSB7d2lkdGhTZWdtZW50czogMTAsIGxlbmd0aFNlZ21lbnRzOiAxMH0pIHtcclxuICBsZXQgdVNlZ21lbnRzID0gb3B0cy53aWR0aFNlZ21lbnRzO1xyXG4gIGxldCB2U2VnbWVudHMgPSBvcHRzLmxlbmd0aFNlZ21lbnRzO1xyXG5cclxuICBsZXQgaHcgPSB3aWR0aCAqIDAuNTtcclxuICBsZXQgaGwgPSBsZW5ndGggKiAwLjU7XHJcblxyXG4gIGxldCBwb3NpdGlvbnM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IG5vcm1hbHM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IHV2czogbnVtYmVyW10gPSBbXTtcclxuICBsZXQgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICBsZXQgbWluUG9zID0gbmV3IFZlYzMoLWh3LCAwLCAtaGwpO1xyXG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhodywgMCwgaGwpO1xyXG4gIGxldCBib3VuZGluZ1JhZGl1cyA9IE1hdGguc3FydCh3aWR0aCAqIHdpZHRoICsgbGVuZ3RoICogbGVuZ3RoKTtcclxuXHJcbiAgVmVjMy5zZXQoYzAwLCAtaHcsIDAsICBobCk7XHJcbiAgVmVjMy5zZXQoYzEwLCAgaHcsIDAsICBobCk7XHJcbiAgVmVjMy5zZXQoYzAxLCAtaHcsIDAsIC1obCk7XHJcblxyXG4gIGZvciAobGV0IHkgPSAwOyB5IDw9IHZTZWdtZW50czsgeSsrKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSB1U2VnbWVudHM7IHgrKykge1xyXG4gICAgICBsZXQgdSA9IHggLyB1U2VnbWVudHM7XHJcbiAgICAgIGxldCB2ID0geSAvIHZTZWdtZW50cztcclxuXHJcbiAgICAgIFZlYzMubGVycCh0ZW1wMSwgYzAwLCBjMTAsIHUpO1xyXG4gICAgICBWZWMzLmxlcnAodGVtcDIsIGMwMCwgYzAxLCB2KTtcclxuICAgICAgVmVjMy5zdWIodGVtcDMsIHRlbXAyLCBjMDApO1xyXG4gICAgICBWZWMzLmFkZChyLCB0ZW1wMSwgdGVtcDMpO1xyXG5cclxuICAgICAgcG9zaXRpb25zLnB1c2goci54LCByLnksIHIueik7XHJcbiAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcclxuICAgICAgdXZzLnB1c2godSwgdik7XHJcblxyXG4gICAgICBpZiAoKHggPCB1U2VnbWVudHMpICYmICh5IDwgdlNlZ21lbnRzKSkge1xyXG4gICAgICAgIGxldCB1c2VnMSA9IHVTZWdtZW50cyArIDE7XHJcbiAgICAgICAgbGV0IGEgPSB4ICsgeSAqIHVzZWcxO1xyXG4gICAgICAgIGxldCBiID0geCArICh5ICsgMSkgKiB1c2VnMTtcclxuICAgICAgICBsZXQgYyA9ICh4ICsgMSkgKyAoeSArIDEpICogdXNlZzE7XHJcbiAgICAgICAgbGV0IGQgPSAoeCArIDEpICsgeSAqIHVzZWcxO1xyXG5cclxuICAgICAgICBpbmRpY2VzLnB1c2goYSwgZCwgYik7XHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKGQsIGMsIGIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IFZlcnRleERhdGEoXHJcbiAgICBwb3NpdGlvbnMsXHJcbiAgICBub3JtYWxzLFxyXG4gICAgdXZzLFxyXG4gICAgaW5kaWNlcyxcclxuICAgIG1pblBvcyxcclxuICAgIG1heFBvcyxcclxuICAgIGJvdW5kaW5nUmFkaXVzXHJcbiAgKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==