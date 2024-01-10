
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/box.js';
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
var c0 = new _vec["default"]();
var c1 = new _vec["default"]();
var c2 = new _vec["default"]();
var c3 = new _vec["default"]();
var c4 = new _vec["default"]();
var c5 = new _vec["default"]();
var c6 = new _vec["default"]();
var c7 = new _vec["default"]();
/**
 * @param {Number} width
 * @param {Number} height
 * @param {Number} length
 * @param {Object} opts
 * @param {Number} opts.widthSegments
 * @param {Number} opts.heightSegments
 * @param {Number} opts.lengthSegments
 */

function _default(width, height, length, opts) {
  if (width === void 0) {
    width = 1;
  }

  if (height === void 0) {
    height = 1;
  }

  if (length === void 0) {
    length = 1;
  }

  if (opts === void 0) {
    opts = {
      widthSegments: 1,
      heightSegments: 1,
      lengthSegments: 1,
      invWinding: false
    };
  }

  var ws = opts.widthSegments;
  var hs = opts.heightSegments;
  var ls = opts.lengthSegments;
  var inv = opts.invWinding;
  var hw = width * 0.5;
  var hh = height * 0.5;
  var hl = length * 0.5;
  var corners = [_vec["default"].set(c0, -hw, -hh, hl), _vec["default"].set(c1, hw, -hh, hl), _vec["default"].set(c2, hw, hh, hl), _vec["default"].set(c3, -hw, hh, hl), _vec["default"].set(c4, hw, -hh, -hl), _vec["default"].set(c5, -hw, -hh, -hl), _vec["default"].set(c6, -hw, hh, -hl), _vec["default"].set(c7, hw, hh, -hl)];
  var faceAxes = [[2, 3, 1], // FRONT
  [4, 5, 7], // BACK
  [7, 6, 2], // TOP
  [1, 0, 4], // BOTTOM
  [1, 4, 2], // RIGHT
  [5, 0, 6] // LEFT
  ];
  var faceNormals = [[0, 0, 1], // FRONT
  [0, 0, -1], // BACK
  [0, 1, 0], // TOP
  [0, -1, 0], // BOTTOM
  [1, 0, 0], // RIGHT
  [-1, 0, 0] // LEFT
  ];
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _vec["default"](-hw, -hh, -hl);
  var maxPos = new _vec["default"](hw, hh, hl);
  var boundingRadius = Math.sqrt(hw * hw + hh * hh + hl * hl);

  function _buildPlane(side, uSegments, vSegments) {
    var u, v;
    var ix, iy;
    var offset = positions.length / 3;
    var faceAxe = faceAxes[side];
    var faceNormal = faceNormals[side];

    for (iy = 0; iy <= vSegments; iy++) {
      for (ix = 0; ix <= uSegments; ix++) {
        u = ix / uSegments;
        v = iy / vSegments;

        _vec["default"].lerp(temp1, corners[faceAxe[0]], corners[faceAxe[1]], u);

        _vec["default"].lerp(temp2, corners[faceAxe[0]], corners[faceAxe[2]], v);

        _vec["default"].subtract(temp3, temp2, corners[faceAxe[0]]);

        _vec["default"].add(r, temp1, temp3);

        positions.push(r.x, r.y, r.z);
        normals.push(faceNormal[0], faceNormal[1], faceNormal[2]);
        uvs.push(u, v);

        if (ix < uSegments && iy < vSegments) {
          var useg1 = uSegments + 1;
          var a = ix + iy * useg1;
          var b = ix + (iy + 1) * useg1;
          var c = ix + 1 + (iy + 1) * useg1;
          var d = ix + 1 + iy * useg1;

          if (inv) {
            indices.push(offset + a, offset + b, offset + d);
            indices.push(offset + d, offset + b, offset + c);
          } else {
            indices.push(offset + a, offset + d, offset + b);
            indices.push(offset + b, offset + d, offset + c);
          }
        }
      }
    }
  }

  _buildPlane(0, ws, hs); // FRONT


  _buildPlane(4, ls, hs); // RIGHT


  _buildPlane(1, ws, hs); // BACK


  _buildPlane(5, ls, hs); // LEFT


  _buildPlane(3, ws, ls); // BOTTOM


  _buildPlane(2, ws, ls); // TOP


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXGJveC50cyJdLCJuYW1lcyI6WyJ0ZW1wMSIsIlZlYzMiLCJ0ZW1wMiIsInRlbXAzIiwiciIsImMwIiwiYzEiLCJjMiIsImMzIiwiYzQiLCJjNSIsImM2IiwiYzciLCJ3aWR0aCIsImhlaWdodCIsImxlbmd0aCIsIm9wdHMiLCJ3aWR0aFNlZ21lbnRzIiwiaGVpZ2h0U2VnbWVudHMiLCJsZW5ndGhTZWdtZW50cyIsImludldpbmRpbmciLCJ3cyIsImhzIiwibHMiLCJpbnYiLCJodyIsImhoIiwiaGwiLCJjb3JuZXJzIiwic2V0IiwiZmFjZUF4ZXMiLCJmYWNlTm9ybWFscyIsInBvc2l0aW9ucyIsIm5vcm1hbHMiLCJ1dnMiLCJpbmRpY2VzIiwibWluUG9zIiwibWF4UG9zIiwiYm91bmRpbmdSYWRpdXMiLCJNYXRoIiwic3FydCIsIl9idWlsZFBsYW5lIiwic2lkZSIsInVTZWdtZW50cyIsInZTZWdtZW50cyIsInUiLCJ2IiwiaXgiLCJpeSIsIm9mZnNldCIsImZhY2VBeGUiLCJmYWNlTm9ybWFsIiwibGVycCIsInN1YnRyYWN0IiwiYWRkIiwicHVzaCIsIngiLCJ5IiwieiIsInVzZWcxIiwiYSIsImIiLCJjIiwiZCIsIlZlcnRleERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxLQUFLLEdBQUcsSUFBSUMsZUFBSixFQUFaO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLElBQUlELGVBQUosRUFBWjtBQUNBLElBQUlFLEtBQUssR0FBRyxJQUFJRixlQUFKLEVBQVo7QUFDQSxJQUFJRyxDQUFDLEdBQUcsSUFBSUgsZUFBSixFQUFSO0FBQ0EsSUFBSUksRUFBRSxHQUFHLElBQUlKLGVBQUosRUFBVDtBQUNBLElBQUlLLEVBQUUsR0FBRyxJQUFJTCxlQUFKLEVBQVQ7QUFDQSxJQUFJTSxFQUFFLEdBQUcsSUFBSU4sZUFBSixFQUFU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Q0FBYU4sTUFBTSxHQUFHWSxDQUF0QixFQUF5QlosTUFBTSxHQUFHYyxDQUFsQyxFQUFxQ2QsTUFBTSxHQUFHYSxDQUE5QztBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRURyQixFQUFBQSxXQUFXLENBQUMsQ0FBRCxFQUFJcEIsRUFBSixFQUFRQyxFQUFSLENBQVgsQ0F2RjhJLENBdUZ0SDs7O0FBQ3hCbUIsRUFBQUEsV0FBVyxDQUFDLENBQUQsRUFBSWxCLEVBQUosRUFBUUQsRUFBUixDQUFYLENBeEY4SSxDQXdGdEg7OztBQUN4Qm1CLEVBQUFBLFdBQVcsQ0FBQyxDQUFELEVBQUlwQixFQUFKLEVBQVFDLEVBQVIsQ0FBWCxDQXpGOEksQ0F5RnRIOzs7QUFDeEJtQixFQUFBQSxXQUFXLENBQUMsQ0FBRCxFQUFJbEIsRUFBSixFQUFRRCxFQUFSLENBQVgsQ0ExRjhJLENBMEZ0SDs7O0FBQ3hCbUIsRUFBQUEsV0FBVyxDQUFDLENBQUQsRUFBSXBCLEVBQUosRUFBUUUsRUFBUixDQUFYLENBM0Y4SSxDQTJGdEg7OztBQUN4QmtCLEVBQUFBLFdBQVcsQ0FBQyxDQUFELEVBQUlwQixFQUFKLEVBQVFFLEVBQVIsQ0FBWCxDQTVGOEksQ0E0RnRIOzs7QUFFeEIsU0FBTyxJQUFJeUMsc0JBQUosQ0FDTGhDLFNBREssRUFFTEMsT0FGSyxFQUdMQyxHQUhLLEVBSUxDLE9BSkssRUFLTEMsTUFMSyxFQU1MQyxNQU5LLEVBT0xDLGNBUEssQ0FBUDtBQVNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XHJcbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xyXG5cclxubGV0IHRlbXAxID0gbmV3IFZlYzMoKTtcclxubGV0IHRlbXAyID0gbmV3IFZlYzMoKTtcclxubGV0IHRlbXAzID0gbmV3IFZlYzMoKTtcclxubGV0IHIgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzAgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzEgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzIgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzMgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzQgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzUgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzYgPSBuZXcgVmVjMygpO1xyXG5sZXQgYzcgPSBuZXcgVmVjMygpO1xyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMud2lkdGhTZWdtZW50c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5oZWlnaHRTZWdtZW50c1xyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5sZW5ndGhTZWdtZW50c1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpZHRoID0gMSwgaGVpZ2h0ID0gMSwgbGVuZ3RoID0gMSwgb3B0cyA9IHt3aWR0aFNlZ21lbnRzOiAxLCBoZWlnaHRTZWdtZW50czogMSwgbGVuZ3RoU2VnbWVudHM6IDEsIGludldpbmRpbmc6IGZhbHNlfSkge1xyXG4gIGxldCB3cyA9IG9wdHMud2lkdGhTZWdtZW50cztcclxuICBsZXQgaHMgPSBvcHRzLmhlaWdodFNlZ21lbnRzO1xyXG4gIGxldCBscyA9IG9wdHMubGVuZ3RoU2VnbWVudHM7XHJcbiAgbGV0IGludiA9IG9wdHMuaW52V2luZGluZztcclxuXHJcbiAgbGV0IGh3ID0gd2lkdGggKiAwLjU7XHJcbiAgbGV0IGhoID0gaGVpZ2h0ICogMC41O1xyXG4gIGxldCBobCA9IGxlbmd0aCAqIDAuNTtcclxuXHJcbiAgbGV0IGNvcm5lcnMgPSBbXHJcbiAgICBWZWMzLnNldChjMCwgLWh3LCAtaGgsICBobCksXHJcbiAgICBWZWMzLnNldChjMSwgIGh3LCAtaGgsICBobCksXHJcbiAgICBWZWMzLnNldChjMiwgIGh3LCAgaGgsICBobCksXHJcbiAgICBWZWMzLnNldChjMywgLWh3LCAgaGgsICBobCksXHJcbiAgICBWZWMzLnNldChjNCwgIGh3LCAtaGgsIC1obCksXHJcbiAgICBWZWMzLnNldChjNSwgLWh3LCAtaGgsIC1obCksXHJcbiAgICBWZWMzLnNldChjNiwgLWh3LCAgaGgsIC1obCksXHJcbiAgICBWZWMzLnNldChjNywgIGh3LCAgaGgsIC1obCksXHJcbiAgXTtcclxuXHJcbiAgbGV0IGZhY2VBeGVzID0gW1xyXG4gICAgWyAyLCAzLCAxIF0sIC8vIEZST05UXHJcbiAgICBbIDQsIDUsIDcgXSwgLy8gQkFDS1xyXG4gICAgWyA3LCA2LCAyIF0sIC8vIFRPUFxyXG4gICAgWyAxLCAwLCA0IF0sIC8vIEJPVFRPTVxyXG4gICAgWyAxLCA0LCAyIF0sIC8vIFJJR0hUXHJcbiAgICBbIDUsIDAsIDYgXSAgLy8gTEVGVFxyXG4gIF07XHJcblxyXG4gIGxldCBmYWNlTm9ybWFscyA9IFtcclxuICAgIFsgIDAsICAwLCAgMSBdLCAvLyBGUk9OVFxyXG4gICAgWyAgMCwgIDAsIC0xIF0sIC8vIEJBQ0tcclxuICAgIFsgIDAsICAxLCAgMCBdLCAvLyBUT1BcclxuICAgIFsgIDAsIC0xLCAgMCBdLCAvLyBCT1RUT01cclxuICAgIFsgIDEsICAwLCAgMCBdLCAvLyBSSUdIVFxyXG4gICAgWyAtMSwgIDAsICAwIF0gIC8vIExFRlRcclxuICBdO1xyXG5cclxuICBsZXQgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCBub3JtYWxzOiBudW1iZXJbXSA9IFtdO1xyXG4gIGxldCB1dnM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IGluZGljZXM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IG1pblBvcyA9IG5ldyBWZWMzKC1odywgLWhoLCAtaGwpO1xyXG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhodywgaGgsIGhsKTtcclxuICBsZXQgYm91bmRpbmdSYWRpdXMgPSBNYXRoLnNxcnQoaHcgKiBodyArIGhoICogaGggKyBobCAqIGhsKTtcclxuXHJcbiAgZnVuY3Rpb24gX2J1aWxkUGxhbmUgKHNpZGUsIHVTZWdtZW50cywgdlNlZ21lbnRzKSB7XHJcbiAgICBsZXQgdSwgdjtcclxuICAgIGxldCBpeCwgaXk7XHJcbiAgICBsZXQgb2Zmc2V0ID0gcG9zaXRpb25zLmxlbmd0aCAvIDM7XHJcbiAgICBsZXQgZmFjZUF4ZSA9IGZhY2VBeGVzW3NpZGVdO1xyXG4gICAgbGV0IGZhY2VOb3JtYWwgPSBmYWNlTm9ybWFsc1tzaWRlXTtcclxuXHJcbiAgICBmb3IgKGl5ID0gMDsgaXkgPD0gdlNlZ21lbnRzOyBpeSsrKSB7XHJcbiAgICAgIGZvciAoaXggPSAwOyBpeCA8PSB1U2VnbWVudHM7IGl4KyspIHtcclxuICAgICAgICB1ID0gaXggLyB1U2VnbWVudHM7XHJcbiAgICAgICAgdiA9IGl5IC8gdlNlZ21lbnRzO1xyXG5cclxuICAgICAgICBWZWMzLmxlcnAodGVtcDEsIGNvcm5lcnNbZmFjZUF4ZVswXV0sIGNvcm5lcnNbZmFjZUF4ZVsxXV0sIHUpO1xyXG4gICAgICAgIFZlYzMubGVycCh0ZW1wMiwgY29ybmVyc1tmYWNlQXhlWzBdXSwgY29ybmVyc1tmYWNlQXhlWzJdXSwgdik7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdCh0ZW1wMywgdGVtcDIsIGNvcm5lcnNbZmFjZUF4ZVswXV0pO1xyXG4gICAgICAgIFZlYzMuYWRkKHIsIHRlbXAxLCB0ZW1wMyk7XHJcblxyXG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKHIueCwgci55LCByLnopO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaChmYWNlTm9ybWFsWzBdLCBmYWNlTm9ybWFsWzFdLCBmYWNlTm9ybWFsWzJdKTtcclxuICAgICAgICB1dnMucHVzaCh1LCB2KTtcclxuXHJcbiAgICAgICAgaWYgKChpeCA8IHVTZWdtZW50cykgJiYgKGl5IDwgdlNlZ21lbnRzKSkge1xyXG4gICAgICAgICAgbGV0IHVzZWcxID0gdVNlZ21lbnRzICsgMTtcclxuICAgICAgICAgIGxldCBhID0gaXggKyBpeSAqIHVzZWcxO1xyXG4gICAgICAgICAgbGV0IGIgPSBpeCArIChpeSArIDEpICogdXNlZzE7XHJcbiAgICAgICAgICBsZXQgYyA9IChpeCArIDEpICsgKGl5ICsgMSkgKiB1c2VnMTtcclxuICAgICAgICAgIGxldCBkID0gKGl4ICsgMSkgKyBpeSAqIHVzZWcxO1xyXG5cclxuICAgICAgICAgIGlmIChpbnYpIHtcclxuICAgICAgICAgICAgaW5kaWNlcy5wdXNoKG9mZnNldCArIGEsIG9mZnNldCArIGIsIG9mZnNldCArIGQpO1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgZCwgb2Zmc2V0ICsgYiwgb2Zmc2V0ICsgYyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRpY2VzLnB1c2gob2Zmc2V0ICsgYSwgb2Zmc2V0ICsgZCwgb2Zmc2V0ICsgYik7XHJcbiAgICAgICAgICAgIGluZGljZXMucHVzaChvZmZzZXQgKyBiLCBvZmZzZXQgKyBkLCBvZmZzZXQgKyBjKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9idWlsZFBsYW5lKDAsIHdzLCBocyk7IC8vIEZST05UXHJcbiAgX2J1aWxkUGxhbmUoNCwgbHMsIGhzKTsgLy8gUklHSFRcclxuICBfYnVpbGRQbGFuZSgxLCB3cywgaHMpOyAvLyBCQUNLXHJcbiAgX2J1aWxkUGxhbmUoNSwgbHMsIGhzKTsgLy8gTEVGVFxyXG4gIF9idWlsZFBsYW5lKDMsIHdzLCBscyk7IC8vIEJPVFRPTVxyXG4gIF9idWlsZFBsYW5lKDIsIHdzLCBscyk7IC8vIFRPUFxyXG5cclxuICByZXR1cm4gbmV3IFZlcnRleERhdGEoXHJcbiAgICBwb3NpdGlvbnMsXHJcbiAgICBub3JtYWxzLFxyXG4gICAgdXZzLFxyXG4gICAgaW5kaWNlcyxcclxuICAgIG1pblBvcyxcclxuICAgIG1heFBvcyxcclxuICAgIGJvdW5kaW5nUmFkaXVzXHJcbiAgKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==