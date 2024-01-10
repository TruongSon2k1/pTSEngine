
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/capsule.js';
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

var temp1 = cc.v3(0, 0, 0);
var temp2 = cc.v3(0, 0, 0);
/**
 * @param {Number} radiusTop
 * @param {Number} radiusBottom
 * @param {Number} height
 * @param {Object} opts
 * @param {Number} opts.sides
 * @param {Number} opts.heightSegments
 * @param {Boolean} opts.capped
 * @param {Number} opts.arc
 */

function _default(radiusTop, radiusBottom, height, opts) {
  if (radiusTop === void 0) {
    radiusTop = 0.5;
  }

  if (radiusBottom === void 0) {
    radiusBottom = 0.5;
  }

  if (height === void 0) {
    height = 2;
  }

  if (opts === void 0) {
    opts = {
      sides: 32,
      heightSegments: 32,
      arc: 2.0 * Math.PI
    };
  }

  var torsoHeight = height - radiusTop - radiusBottom;
  var sides = opts.sides;
  var heightSegments = opts.heightSegments;
  var bottomProp = radiusBottom / height;
  var torProp = torsoHeight / height;
  var topProp = radiusTop / height;
  var bottomSegments = Math.floor(heightSegments * bottomProp);
  var topSegments = Math.floor(heightSegments * topProp);
  var torSegments = Math.floor(heightSegments * torProp);
  var topOffset = torsoHeight + radiusBottom - height / 2;
  var torOffset = radiusBottom - height / 2;
  var bottomOffset = radiusBottom - height / 2;
  var arc = opts.arc; // calculate vertex count

  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var maxRadius = Math.max(radiusTop, radiusBottom);
  var minPos = cc.v3(-maxRadius, -height / 2, -maxRadius);
  var maxPos = cc.v3(maxRadius, height / 2, maxRadius);
  var boundingRadius = height / 2;
  var index = 0;
  var indexArray = [];
  generateBottom();
  generateTorso();
  generateTop();
  return new _vertexData["default"](positions, normals, uvs, indices, minPos, maxPos, boundingRadius); // =======================
  // internal fucntions
  // =======================

  function generateTorso() {
    // this will be used to calculate the normal
    var slope = (radiusTop - radiusBottom) / torsoHeight; // generate positions, normals and uvs

    for (var y = 0; y <= torSegments; y++) {
      var indexRow = [];
      var lat = y / torSegments;
      var radius = lat * (radiusTop - radiusBottom) + radiusBottom;

      for (var x = 0; x <= sides; ++x) {
        var u = x / sides;
        var v = lat * torProp + bottomProp;
        var theta = u * arc - arc / 4;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta); // vertex

        positions.push(radius * sinTheta);
        positions.push(lat * torsoHeight + torOffset);
        positions.push(radius * cosTheta); // normal

        _vec["default"].normalize(temp1, _vec["default"].set(temp2, sinTheta, -slope, cosTheta));

        normals.push(temp1.x);
        normals.push(temp1.y);
        normals.push(temp1.z); // uv

        uvs.push(u, v); // save index of vertex in respective row

        indexRow.push(index); // increase index

        ++index;
      } // now save positions of the row in our index array


      indexArray.push(indexRow);
    } // generate indices


    for (var _y = 0; _y < torSegments; ++_y) {
      for (var _x = 0; _x < sides; ++_x) {
        // we use the index array to access the correct indices
        var i1 = indexArray[_y][_x];
        var i2 = indexArray[_y + 1][_x];
        var i3 = indexArray[_y + 1][_x + 1];
        var i4 = indexArray[_y][_x + 1]; // face one

        indices.push(i1);
        indices.push(i4);
        indices.push(i2); // face two

        indices.push(i4);
        indices.push(i3);
        indices.push(i2);
      }
    }
  }

  function generateBottom() {
    for (var lat = 0; lat <= bottomSegments; ++lat) {
      var theta = lat * Math.PI / bottomSegments / 2;
      var sinTheta = Math.sin(theta);
      var cosTheta = -Math.cos(theta);

      for (var lon = 0; lon <= sides; ++lon) {
        var phi = lon * 2 * Math.PI / sides - Math.PI / 2.0;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);
        var x = sinPhi * sinTheta;
        var y = cosTheta;
        var z = cosPhi * sinTheta;
        var u = lon / sides;
        var v = lat / heightSegments;
        positions.push(x * radiusBottom, y * radiusBottom + bottomOffset, z * radiusBottom);
        normals.push(x, y, z);
        uvs.push(u, v);

        if (lat < bottomSegments && lon < sides) {
          var seg1 = sides + 1;
          var a = seg1 * lat + lon;
          var b = seg1 * (lat + 1) + lon;
          var c = seg1 * (lat + 1) + lon + 1;
          var d = seg1 * lat + lon + 1;
          indices.push(a, d, b);
          indices.push(d, c, b);
        }

        ++index;
      }
    }
  }

  function generateTop() {
    for (var lat = 0; lat <= topSegments; ++lat) {
      var theta = lat * Math.PI / topSegments / 2 + Math.PI / 2;
      var sinTheta = Math.sin(theta);
      var cosTheta = -Math.cos(theta);

      for (var lon = 0; lon <= sides; ++lon) {
        var phi = lon * 2 * Math.PI / sides - Math.PI / 2.0;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);
        var x = sinPhi * sinTheta;
        var y = cosTheta;
        var z = cosPhi * sinTheta;
        var u = lon / sides;
        var v = lat / heightSegments + (1 - topProp);
        positions.push(x * radiusTop, y * radiusTop + topOffset, z * radiusTop);
        normals.push(x, y, z);
        uvs.push(u, v);

        if (lat < topSegments && lon < sides) {
          var seg1 = sides + 1;
          var a = seg1 * lat + lon + indexArray[torSegments][sides] + 1;
          var b = seg1 * (lat + 1) + lon + indexArray[torSegments][sides] + 1;
          var c = seg1 * (lat + 1) + lon + 1 + indexArray[torSegments][sides] + 1;
          var d = seg1 * lat + lon + 1 + indexArray[torSegments][sides] + 1;
          indices.push(a, d, b);
          indices.push(d, c, b);
        }
      }
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwcmltaXRpdmVcXGNhcHN1bGUudHMiXSwibmFtZXMiOlsidGVtcDEiLCJjYyIsInYzIiwidGVtcDIiLCJyYWRpdXNUb3AiLCJyYWRpdXNCb3R0b20iLCJoZWlnaHQiLCJvcHRzIiwic2lkZXMiLCJoZWlnaHRTZWdtZW50cyIsImFyYyIsIk1hdGgiLCJQSSIsInRvcnNvSGVpZ2h0IiwiYm90dG9tUHJvcCIsInRvclByb3AiLCJ0b3BQcm9wIiwiYm90dG9tU2VnbWVudHMiLCJmbG9vciIsInRvcFNlZ21lbnRzIiwidG9yU2VnbWVudHMiLCJ0b3BPZmZzZXQiLCJ0b3JPZmZzZXQiLCJib3R0b21PZmZzZXQiLCJwb3NpdGlvbnMiLCJub3JtYWxzIiwidXZzIiwiaW5kaWNlcyIsIm1heFJhZGl1cyIsIm1heCIsIm1pblBvcyIsIm1heFBvcyIsImJvdW5kaW5nUmFkaXVzIiwiaW5kZXgiLCJpbmRleEFycmF5IiwiZ2VuZXJhdGVCb3R0b20iLCJnZW5lcmF0ZVRvcnNvIiwiZ2VuZXJhdGVUb3AiLCJWZXJ0ZXhEYXRhIiwic2xvcGUiLCJ5IiwiaW5kZXhSb3ciLCJsYXQiLCJyYWRpdXMiLCJ4IiwidSIsInYiLCJ0aGV0YSIsInNpblRoZXRhIiwic2luIiwiY29zVGhldGEiLCJjb3MiLCJwdXNoIiwiVmVjMyIsIm5vcm1hbGl6ZSIsInNldCIsInoiLCJpMSIsImkyIiwiaTMiLCJpNCIsImxvbiIsInBoaSIsInNpblBoaSIsImNvc1BoaSIsInNlZzEiLCJhIiwiYiIsImMiLCJkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7OztBQUVBOztBQUNBOzs7O0FBRUEsSUFBSUEsS0FBSyxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZLENBQVosQ0FBWjtBQUNBLElBQUlDLEtBQUssR0FBR0YsRUFBRSxDQUFDQyxFQUFILENBQU0sQ0FBTixFQUFTLENBQVQsRUFBWSxDQUFa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QixFQUFtQkYsQ0FBbkI7QUFDQXhDLFVBQUFBLE9BQU8sQ0FBQ3lCLElBQVIsQ0FBYWlCLENBQWIsRUFBZ0JELENBQWhCLEVBQW1CRCxDQUFuQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcblxyXG5pbXBvcnQgVmVjMyBmcm9tICcuLi8uLi92YWx1ZS10eXBlcy92ZWMzJztcclxuaW1wb3J0IFZlcnRleERhdGEgZnJvbSAnLi92ZXJ0ZXgtZGF0YSc7XHJcblxyXG5sZXQgdGVtcDEgPSBjYy52MygwLCAwLCAwKTtcclxubGV0IHRlbXAyID0gY2MudjMoMCwgMCwgMCk7XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1c1RvcFxyXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzQm90dG9tXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuc2lkZXNcclxuICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMuaGVpZ2h0U2VnbWVudHNcclxuICogQHBhcmFtIHtCb29sZWFufSBvcHRzLmNhcHBlZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChyYWRpdXNUb3AgPSAwLjUsIHJhZGl1c0JvdHRvbSA9IDAuNSwgaGVpZ2h0ID0gMiwgb3B0cyA9IHtzaWRlczogMzIsIGhlaWdodFNlZ21lbnRzOiAzMiwgYXJjOiAyLjAgKiBNYXRoLlBJfSkge1xyXG4gIGxldCB0b3Jzb0hlaWdodCA9IGhlaWdodCAtIHJhZGl1c1RvcCAtIHJhZGl1c0JvdHRvbTtcclxuICBsZXQgc2lkZXMgPSBvcHRzLnNpZGVzO1xyXG4gIGxldCBoZWlnaHRTZWdtZW50cyA9IG9wdHMuaGVpZ2h0U2VnbWVudHM7XHJcbiAgbGV0IGJvdHRvbVByb3AgPSByYWRpdXNCb3R0b20gLyBoZWlnaHQ7XHJcbiAgbGV0IHRvclByb3AgPSB0b3Jzb0hlaWdodCAvIGhlaWdodDtcclxuICBsZXQgdG9wUHJvcCA9IHJhZGl1c1RvcCAvIGhlaWdodDtcclxuICBsZXQgYm90dG9tU2VnbWVudHMgPSBNYXRoLmZsb29yKGhlaWdodFNlZ21lbnRzICogYm90dG9tUHJvcCk7XHJcbiAgbGV0IHRvcFNlZ21lbnRzID0gTWF0aC5mbG9vcihoZWlnaHRTZWdtZW50cyAqIHRvcFByb3ApO1xyXG4gIGxldCB0b3JTZWdtZW50cyA9IE1hdGguZmxvb3IoaGVpZ2h0U2VnbWVudHMgKiB0b3JQcm9wKTtcclxuICBsZXQgdG9wT2Zmc2V0ID0gdG9yc29IZWlnaHQgKyByYWRpdXNCb3R0b20gLSBoZWlnaHQgLyAyO1xyXG4gIGxldCB0b3JPZmZzZXQgPSByYWRpdXNCb3R0b20gLSBoZWlnaHQgLyAyO1xyXG4gIGxldCBib3R0b21PZmZzZXQgPSByYWRpdXNCb3R0b20gLSBoZWlnaHQgLyAyO1xyXG4gIGxldCBhcmMgPSBvcHRzLmFyYztcclxuXHJcbiAgLy8gY2FsY3VsYXRlIHZlcnRleCBjb3VudFxyXG4gIGxldCBwb3NpdGlvbnM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IG5vcm1hbHM6IG51bWJlcltdID0gW107XHJcbiAgbGV0IHV2czogbnVtYmVyW10gPSBbXTtcclxuICBsZXQgaW5kaWNlczogbnVtYmVyW10gPSBbXTtcclxuICBsZXQgbWF4UmFkaXVzID0gTWF0aC5tYXgocmFkaXVzVG9wLCByYWRpdXNCb3R0b20pO1xyXG4gIGxldCBtaW5Qb3MgPSBjYy52MygtbWF4UmFkaXVzLCAtaGVpZ2h0IC8gMiwgLW1heFJhZGl1cyk7XHJcbiAgbGV0IG1heFBvcyA9IGNjLnYzKG1heFJhZGl1cywgaGVpZ2h0IC8gMiwgbWF4UmFkaXVzKTtcclxuICBsZXQgYm91bmRpbmdSYWRpdXMgPSBoZWlnaHQgLyAyO1xyXG5cclxuICBsZXQgaW5kZXggPSAwO1xyXG4gIGxldCBpbmRleEFycmF5OiBudW1iZXJbXVtdID0gW107XHJcblxyXG4gIGdlbmVyYXRlQm90dG9tKCk7XHJcblxyXG4gIGdlbmVyYXRlVG9yc28oKTtcclxuXHJcbiAgZ2VuZXJhdGVUb3AoKTtcclxuXHJcbiAgcmV0dXJuIG5ldyBWZXJ0ZXhEYXRhKFxyXG4gICAgcG9zaXRpb25zLFxyXG4gICAgbm9ybWFscyxcclxuICAgIHV2cyxcclxuICAgIGluZGljZXMsXHJcbiAgICBtaW5Qb3MsXHJcbiAgICBtYXhQb3MsXHJcbiAgICBib3VuZGluZ1JhZGl1c1xyXG4gICk7XHJcblxyXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgLy8gaW50ZXJuYWwgZnVjbnRpb25zXHJcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgZnVuY3Rpb24gZ2VuZXJhdGVUb3JzbygpIHtcclxuICAgIC8vIHRoaXMgd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgbm9ybWFsXHJcbiAgICBsZXQgc2xvcGUgPSAocmFkaXVzVG9wIC0gcmFkaXVzQm90dG9tKSAvIHRvcnNvSGVpZ2h0O1xyXG5cclxuICAgIC8vIGdlbmVyYXRlIHBvc2l0aW9ucywgbm9ybWFscyBhbmQgdXZzXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSB0b3JTZWdtZW50czsgeSsrKSB7XHJcblxyXG4gICAgICBsZXQgaW5kZXhSb3c6IG51bWJlcltdID0gW107XHJcbiAgICAgIGxldCBsYXQgPSB5IC8gdG9yU2VnbWVudHM7XHJcbiAgICAgIGxldCByYWRpdXMgPSBsYXQgKiAocmFkaXVzVG9wIC0gcmFkaXVzQm90dG9tKSArIHJhZGl1c0JvdHRvbTtcclxuXHJcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHNpZGVzOyArK3gpIHtcclxuICAgICAgICBsZXQgdSA9IHggLyBzaWRlcztcclxuICAgICAgICBsZXQgdiA9IGxhdCAqIHRvclByb3AgKyBib3R0b21Qcm9wO1xyXG4gICAgICAgIGxldCB0aGV0YSA9IHUgKiBhcmMgLSAoYXJjIC8gNCk7XHJcblxyXG4gICAgICAgIGxldCBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcclxuICAgICAgICBsZXQgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XHJcblxyXG4gICAgICAgIC8vIHZlcnRleFxyXG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKHJhZGl1cyAqIHNpblRoZXRhKTtcclxuICAgICAgICBwb3NpdGlvbnMucHVzaChsYXQgKiB0b3Jzb0hlaWdodCArIHRvck9mZnNldCk7XHJcbiAgICAgICAgcG9zaXRpb25zLnB1c2gocmFkaXVzICogY29zVGhldGEpO1xyXG5cclxuICAgICAgICAvLyBub3JtYWxcclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZSh0ZW1wMSwgVmVjMy5zZXQodGVtcDIsIHNpblRoZXRhLCAtc2xvcGUsIGNvc1RoZXRhKSk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKHRlbXAxLngpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaCh0ZW1wMS55KTtcclxuICAgICAgICBub3JtYWxzLnB1c2godGVtcDEueik7XHJcblxyXG4gICAgICAgIC8vIHV2XHJcbiAgICAgICAgdXZzLnB1c2godSx2KTtcclxuICAgICAgICAvLyBzYXZlIGluZGV4IG9mIHZlcnRleCBpbiByZXNwZWN0aXZlIHJvd1xyXG4gICAgICAgIGluZGV4Um93LnB1c2goaW5kZXgpO1xyXG5cclxuICAgICAgICAvLyBpbmNyZWFzZSBpbmRleFxyXG4gICAgICAgICsraW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vdyBzYXZlIHBvc2l0aW9ucyBvZiB0aGUgcm93IGluIG91ciBpbmRleCBhcnJheVxyXG4gICAgICBpbmRleEFycmF5LnB1c2goaW5kZXhSb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdlbmVyYXRlIGluZGljZXNcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdG9yU2VnbWVudHM7ICsreSkge1xyXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpZGVzOyArK3gpIHtcclxuICAgICAgICAvLyB3ZSB1c2UgdGhlIGluZGV4IGFycmF5IHRvIGFjY2VzcyB0aGUgY29ycmVjdCBpbmRpY2VzXHJcbiAgICAgICAgbGV0IGkxID0gaW5kZXhBcnJheVt5XVt4XTtcclxuICAgICAgICBsZXQgaTIgPSBpbmRleEFycmF5W3kgKyAxXVt4XTtcclxuICAgICAgICBsZXQgaTMgPSBpbmRleEFycmF5W3kgKyAxXVt4ICsgMV07XHJcbiAgICAgICAgbGV0IGk0ID0gaW5kZXhBcnJheVt5XVt4ICsgMV07XHJcblxyXG4gICAgICAgIC8vIGZhY2Ugb25lXHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKGkxKTtcclxuICAgICAgICBpbmRpY2VzLnB1c2goaTQpO1xyXG4gICAgICAgIGluZGljZXMucHVzaChpMik7XHJcblxyXG4gICAgICAgIC8vIGZhY2UgdHdvXHJcbiAgICAgICAgaW5kaWNlcy5wdXNoKGk0KTtcclxuICAgICAgICBpbmRpY2VzLnB1c2goaTMpO1xyXG4gICAgICAgIGluZGljZXMucHVzaChpMik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQm90dG9tKCkge1xyXG4gICAgZm9yIChsZXQgbGF0ID0gMDsgbGF0IDw9IGJvdHRvbVNlZ21lbnRzOyArK2xhdCkge1xyXG4gICAgICBsZXQgdGhldGEgPSBsYXQgKiBNYXRoLlBJIC8gYm90dG9tU2VnbWVudHMgLyAyO1xyXG4gICAgICBsZXQgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICAgIGxldCBjb3NUaGV0YSA9IC1NYXRoLmNvcyh0aGV0YSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBsb24gPSAwOyBsb24gPD0gc2lkZXM7ICsrbG9uKSB7XHJcbiAgICAgICAgbGV0IHBoaSA9IGxvbiAqIDIgKiBNYXRoLlBJIC8gc2lkZXMgLSBNYXRoLlBJIC8gMi4wO1xyXG4gICAgICAgIGxldCBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xyXG4gICAgICAgIGxldCBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xyXG5cclxuICAgICAgICBsZXQgeCA9IHNpblBoaSAqIHNpblRoZXRhO1xyXG4gICAgICAgIGxldCB5ID0gY29zVGhldGE7XHJcbiAgICAgICAgbGV0IHogPSBjb3NQaGkgKiBzaW5UaGV0YTtcclxuICAgICAgICBsZXQgdSA9IGxvbiAvIHNpZGVzO1xyXG4gICAgICAgIGxldCB2ID0gbGF0IC8gaGVpZ2h0U2VnbWVudHM7XHJcblxyXG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKHggKiByYWRpdXNCb3R0b20sIHkgKiByYWRpdXNCb3R0b20gKyBib3R0b21PZmZzZXQsIHogKiByYWRpdXNCb3R0b20pO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaCh4LCB5LCB6KTtcclxuICAgICAgICB1dnMucHVzaCh1LCB2KTtcclxuXHJcbiAgICAgICAgaWYgKChsYXQgPCBib3R0b21TZWdtZW50cykgJiYgKGxvbiA8IHNpZGVzKSkge1xyXG4gICAgICAgICAgbGV0IHNlZzEgPSBzaWRlcyArIDE7XHJcbiAgICAgICAgICBsZXQgYSA9IHNlZzEgKiBsYXQgKyBsb247XHJcbiAgICAgICAgICBsZXQgYiA9IHNlZzEgKiAobGF0ICsgMSkgKyBsb247XHJcbiAgICAgICAgICBsZXQgYyA9IHNlZzEgKiAobGF0ICsgMSkgKyBsb24gKyAxO1xyXG4gICAgICAgICAgbGV0IGQgPSBzZWcxICogbGF0ICsgbG9uICsgMTtcclxuXHJcbiAgICAgICAgICBpbmRpY2VzLnB1c2goYSwgZCwgYik7XHJcbiAgICAgICAgICBpbmRpY2VzLnB1c2goZCwgYywgYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICArK2luZGV4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZW5lcmF0ZVRvcCgpIHtcclxuICAgIGZvciAobGV0IGxhdCA9IDA7IGxhdCA8PSB0b3BTZWdtZW50czsgKytsYXQpIHtcclxuICAgICAgbGV0IHRoZXRhID0gbGF0ICogTWF0aC5QSSAvIHRvcFNlZ21lbnRzIC8gMiArIE1hdGguUEkgLyAyO1xyXG4gICAgICBsZXQgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XHJcbiAgICAgIGxldCBjb3NUaGV0YSA9IC1NYXRoLmNvcyh0aGV0YSk7XHJcblxyXG4gICAgICBmb3IgKGxldCBsb24gPSAwOyBsb24gPD0gc2lkZXM7ICsrbG9uKSB7XHJcbiAgICAgICAgbGV0IHBoaSA9IGxvbiAqIDIgKiBNYXRoLlBJIC8gc2lkZXMgLSBNYXRoLlBJIC8gMi4wO1xyXG4gICAgICAgIGxldCBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xyXG4gICAgICAgIGxldCBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xyXG5cclxuICAgICAgICBsZXQgeCA9IHNpblBoaSAqIHNpblRoZXRhO1xyXG4gICAgICAgIGxldCB5ID0gY29zVGhldGE7XHJcbiAgICAgICAgbGV0IHogPSBjb3NQaGkgKiBzaW5UaGV0YTtcclxuICAgICAgICBsZXQgdSA9IGxvbiAvIHNpZGVzO1xyXG4gICAgICAgIGxldCB2ID0gbGF0IC8gaGVpZ2h0U2VnbWVudHMgKyAoMS10b3BQcm9wKTtcclxuXHJcbiAgICAgICAgcG9zaXRpb25zLnB1c2goeCAqIHJhZGl1c1RvcCwgeSAqIHJhZGl1c1RvcCArIHRvcE9mZnNldCwgeiAqIHJhZGl1c1RvcCk7XHJcbiAgICAgICAgbm9ybWFscy5wdXNoKHgsIHksIHopO1xyXG4gICAgICAgIHV2cy5wdXNoKHUsIHYpO1xyXG5cclxuICAgICAgICBpZiAoKGxhdCA8IHRvcFNlZ21lbnRzKSAmJiAobG9uIDwgc2lkZXMpKSB7XHJcbiAgICAgICAgICBsZXQgc2VnMSA9IHNpZGVzICsgMTtcclxuICAgICAgICAgIGxldCBhID0gc2VnMSAqIGxhdCArIGxvbiArIGluZGV4QXJyYXlbdG9yU2VnbWVudHNdW3NpZGVzXSArIDE7XHJcbiAgICAgICAgICBsZXQgYiA9IHNlZzEgKiAobGF0ICsgMSkgKyBsb24gKyBpbmRleEFycmF5W3RvclNlZ21lbnRzXVtzaWRlc10gKyAxO1xyXG4gICAgICAgICAgbGV0IGMgPSBzZWcxICogKGxhdCArIDEpICsgbG9uICsgMSArIGluZGV4QXJyYXlbdG9yU2VnbWVudHNdW3NpZGVzXSArIDE7XHJcbiAgICAgICAgICBsZXQgZCA9IHNlZzEgKiBsYXQgKyBsb24gKyAxICsgaW5kZXhBcnJheVt0b3JTZWdtZW50c11bc2lkZXNdICsgMTtcclxuXHJcbiAgICAgICAgICBpbmRpY2VzLnB1c2goYSwgZCwgYik7XHJcbiAgICAgICAgICBpbmRpY2VzLnB1c2goZCwgYywgYik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9