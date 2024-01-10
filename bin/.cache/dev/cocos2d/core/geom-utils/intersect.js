
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/intersect.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _recyclePool = _interopRequireDefault(require("../../renderer/memop/recycle-pool"));

var _valueTypes = require("../value-types");

var _aabb = _interopRequireDefault(require("./aabb"));

var distance = _interopRequireWildcard(require("./distance"));

var _enums = _interopRequireDefault(require("./enums"));

var _ray = _interopRequireDefault(require("./ray"));

var _triangle = _interopRequireDefault(require("./triangle"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * @class geomUtils.intersect
 */
var ray_mesh = function () {
  var tri = _triangle["default"].create();

  var minDist = Infinity;

  function getVec3(out, data, idx, stride) {
    _valueTypes.Vec3.set(out, data[idx * stride], data[idx * stride + 1], data[idx * stride + 2]);
  }

  return function (ray, mesh) {
    minDist = Infinity;
    var subMeshes = mesh._subMeshes;

    for (var i = 0; i < subMeshes.length; i++) {
      if (subMeshes[i]._primitiveType !== _gfx["default"].PT_TRIANGLES) continue;
      var subData = mesh._subDatas[i] || mesh._subDatas[0];

      var posData = mesh._getAttrMeshData(i, _gfx["default"].ATTR_POSITION);

      var iData = subData.getIData(Uint16Array);
      var format = subData.vfm;
      var fmt = format.element(_gfx["default"].ATTR_POSITION);
      var num = fmt.num;

      for (var _i = 0; _i < iData.length; _i += 3) {
        getVec3(tri.a, posData, iData[_i], num);
        getVec3(tri.b, posData, iData[_i + 1], num);
        getVec3(tri.c, posData, iData[_i + 2], num);
        var dist = ray_triangle(ray, tri);

        if (dist > 0 && dist < minDist) {
          minDist = dist;
        }
      }
    }

    return minDist;
  };
}(); // adapt to old api


var rayMesh = ray_mesh;
/** 
 * !#en
 * Check whether ray intersect with nodes
 * !#zh
 * 检测射线是否与物体有交集
 * @static
 * @method ray_cast
 * @param {Node} root - If root is null, then traversal nodes from scene node
 * @param {geomUtils.Ray} worldRay
 * @param {Function} handler
 * @param {Function} filter
 * @return {[]} [{node, distance}]
*/

var ray_cast = function () {
  function traversal(node, cb) {
    var children = node.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      traversal(child, cb);
    }

    cb(node);
  }

  function cmp(a, b) {
    return a.distance - b.distance;
  }

  function transformMat4Normal(out, a, m) {
    var mm = m.m;
    var x = a.x,
        y = a.y,
        z = a.z,
        rhw = mm[3] * x + mm[7] * y + mm[11] * z;
    rhw = rhw ? 1 / rhw : 1;
    out.x = (mm[0] * x + mm[4] * y + mm[8] * z) * rhw;
    out.y = (mm[1] * x + mm[5] * y + mm[9] * z) * rhw;
    out.z = (mm[2] * x + mm[6] * y + mm[10] * z) * rhw;
    return out;
  }

  var resultsPool = new _recyclePool["default"](function () {
    return {
      distance: 0,
      node: null
    };
  }, 1);
  var results = []; // temp variable

  var nodeAabb = _aabb["default"].create();

  var minPos = new _valueTypes.Vec3();
  var maxPos = new _valueTypes.Vec3();
  var modelRay = new _ray["default"]();
  var m4_1 = cc.mat4();
  var m4_2 = cc.mat4();
  var d = new _valueTypes.Vec3();

  function distanceValid(distance) {
    return distance > 0 && distance < Infinity;
  }

  return function (root, worldRay, handler, filter) {
    resultsPool.reset();
    results.length = 0;
    root = root || cc.director.getScene();
    traversal(root, function (node) {
      if (filter && !filter(node)) return; // transform world ray to model ray

      _valueTypes.Mat4.invert(m4_2, node.getWorldMatrix(m4_1));

      _valueTypes.Vec3.transformMat4(modelRay.o, worldRay.o, m4_2);

      _valueTypes.Vec3.normalize(modelRay.d, transformMat4Normal(modelRay.d, worldRay.d, m4_2)); // raycast with bounding box


      var distance = Infinity;
      var component = node._renderComponent;

      if (component instanceof cc.MeshRenderer) {
        distance = ray_aabb(modelRay, component._boundingBox);
      } else if (node.width && node.height) {
        _valueTypes.Vec3.set(minPos, -node.width * node.anchorX, -node.height * node.anchorY, node.z);

        _valueTypes.Vec3.set(maxPos, node.width * (1 - node.anchorX), node.height * (1 - node.anchorY), node.z);

        _aabb["default"].fromPoints(nodeAabb, minPos, maxPos);

        distance = ray_aabb(modelRay, nodeAabb);
      }

      if (!distanceValid(distance)) return;

      if (handler) {
        distance = handler(modelRay, node, distance);
      }

      if (distanceValid(distance)) {
        _valueTypes.Vec3.scale(d, modelRay.d, distance);

        transformMat4Normal(d, d, m4_1);
        var res = resultsPool.add();
        res.node = node;
        res.distance = _valueTypes.Vec3.mag(d);
        results.push(res);
      }
    });
    results.sort(cmp);
    return results;
  };
}(); // adapt to old api


var raycast = ray_cast;
/**
 * !#en ray-plane intersect<br/>
 * !#zh 射线与平面的相交性检测。
 * @static
 * @method ray_plane
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */

var ray_plane = function () {
  var pt = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, plane) {
    var denom = _valueTypes.Vec3.dot(ray.d, plane.n);

    if (Math.abs(denom) < Number.EPSILON) {
      return 0;
    }

    _valueTypes.Vec3.multiplyScalar(pt, plane.n, plane.d);

    var t = _valueTypes.Vec3.dot(_valueTypes.Vec3.subtract(pt, pt, ray.o), plane.n) / denom;

    if (t < 0) {
      return 0;
    }

    return t;
  };
}();
/**
 * !#en line-plane intersect<br/>
 * !#zh 线段与平面的相交性检测。
 * @static
 * @method line_plane
 * @param {geomUtils.Line} line
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */


var line_plane = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  return function (line, plane) {
    _valueTypes.Vec3.subtract(ab, line.e, line.s);

    var t = (plane.d - _valueTypes.Vec3.dot(line.s, plane.n)) / _valueTypes.Vec3.dot(ab, plane.n);

    if (t < 0 || t > 1) {
      return 0;
    }

    return t;
  };
}(); // based on http://fileadmin.cs.lth.se/cs/Personal/Tomas_Akenine-Moller/raytri/

/**
 * !#en ray-triangle intersect<br/>
 * !#zh 射线与三角形的相交性检测。
 * @static
 * @method ray_triangle
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Triangle} triangle
 * @param {boolean} doubleSided
 * @return {number} 0 or not 0
 */


var ray_triangle = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  var ac = new _valueTypes.Vec3(0, 0, 0);
  var pvec = new _valueTypes.Vec3(0, 0, 0);
  var tvec = new _valueTypes.Vec3(0, 0, 0);
  var qvec = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, triangle, doubleSided) {
    _valueTypes.Vec3.subtract(ab, triangle.b, triangle.a);

    _valueTypes.Vec3.subtract(ac, triangle.c, triangle.a);

    _valueTypes.Vec3.cross(pvec, ray.d, ac);

    var det = _valueTypes.Vec3.dot(ab, pvec);

    if (det < Number.EPSILON && (!doubleSided || det > -Number.EPSILON)) {
      return 0;
    }

    var inv_det = 1 / det;

    _valueTypes.Vec3.subtract(tvec, ray.o, triangle.a);

    var u = _valueTypes.Vec3.dot(tvec, pvec) * inv_det;

    if (u < 0 || u > 1) {
      return 0;
    }

    _valueTypes.Vec3.cross(qvec, tvec, ab);

    var v = _valueTypes.Vec3.dot(ray.d, qvec) * inv_det;

    if (v < 0 || u + v > 1) {
      return 0;
    }

    var t = _valueTypes.Vec3.dot(ac, qvec) * inv_det;
    return t < 0 ? 0 : t;
  };
}(); // adapt to old api


var rayTriangle = ray_triangle;
/**
 * !#en line-triangle intersect<br/>
 * !#zh 线段与三角形的相交性检测。
 * @static
 * @method line_triangle
 * @param {geomUtils.Line} line
 * @param {geomUtils.Triangle} triangle
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */

var line_triangle = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  var ac = new _valueTypes.Vec3(0, 0, 0);
  var qp = new _valueTypes.Vec3(0, 0, 0);
  var ap = new _valueTypes.Vec3(0, 0, 0);
  var n = new _valueTypes.Vec3(0, 0, 0);
  var e = new _valueTypes.Vec3(0, 0, 0);
  return function (line, triangle, outPt) {
    _valueTypes.Vec3.subtract(ab, triangle.b, triangle.a);

    _valueTypes.Vec3.subtract(ac, triangle.c, triangle.a);

    _valueTypes.Vec3.subtract(qp, line.s, line.e);

    _valueTypes.Vec3.cross(n, ab, ac);

    var det = _valueTypes.Vec3.dot(qp, n);

    if (det <= 0.0) {
      return 0;
    }

    _valueTypes.Vec3.subtract(ap, line.s, triangle.a);

    var t = _valueTypes.Vec3.dot(ap, n);

    if (t < 0 || t > det) {
      return 0;
    }

    _valueTypes.Vec3.cross(e, qp, ap);

    var v = _valueTypes.Vec3.dot(ac, e);

    if (v < 0 || v > det) {
      return 0;
    }

    var w = -_valueTypes.Vec3.dot(ab, e);

    if (w < 0.0 || v + w > det) {
      return 0;
    }

    if (outPt) {
      var invDet = 1.0 / det;
      v *= invDet;
      w *= invDet;
      var u = 1.0 - v - w; // outPt = u*a + v*d + w*c;

      _valueTypes.Vec3.set(outPt, triangle.a.x * u + triangle.b.x * v + triangle.c.x * w, triangle.a.y * u + triangle.b.y * v + triangle.c.y * w, triangle.a.z * u + triangle.b.z * v + triangle.c.z * w);
    }

    return 1;
  };
}();
/**
 * !#en line-quad intersect<br/>
 * !#zh 线段与四边形的相交性检测。
 * @static
 * @method line_quad
 * @param {Vec3} p A point on a line segment
 * @param {Vec3} q Another point on the line segment
 * @param {Vec3} a Quadrilateral point a
 * @param {Vec3} b Quadrilateral point b
 * @param {Vec3} c Quadrilateral point c
 * @param {Vec3} d Quadrilateral point d
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */


var line_quad = function () {
  var pq = new _valueTypes.Vec3(0, 0, 0);
  var pa = new _valueTypes.Vec3(0, 0, 0);
  var pb = new _valueTypes.Vec3(0, 0, 0);
  var pc = new _valueTypes.Vec3(0, 0, 0);
  var pd = new _valueTypes.Vec3(0, 0, 0);
  var m = new _valueTypes.Vec3(0, 0, 0);
  var tmp = new _valueTypes.Vec3(0, 0, 0);
  return function (p, q, a, b, c, d, outPt) {
    _valueTypes.Vec3.subtract(pq, q, p);

    _valueTypes.Vec3.subtract(pa, a, p);

    _valueTypes.Vec3.subtract(pb, b, p);

    _valueTypes.Vec3.subtract(pc, c, p); // Determine which triangle to test against by testing against diagonal first


    _valueTypes.Vec3.cross(m, pc, pq);

    var v = _valueTypes.Vec3.dot(pa, m);

    if (v >= 0) {
      // Test intersection against triangle abc
      var u = -_valueTypes.Vec3.dot(pb, m);

      if (u < 0) {
        return 0;
      }

      var w = _valueTypes.Vec3.dot(_valueTypes.Vec3.cross(tmp, pq, pb), pa);

      if (w < 0) {
        return 0;
      } // outPt = u*a + v*b + w*c;


      if (outPt) {
        var denom = 1.0 / (u + v + w);
        u *= denom;
        v *= denom;
        w *= denom;

        _valueTypes.Vec3.set(outPt, a.x * u + b.x * v + c.x * w, a.y * u + b.y * v + c.y * w, a.z * u + b.z * v + c.z * w);
      }
    } else {
      // Test intersection against triangle dac
      _valueTypes.Vec3.subtract(pd, d, p);

      var _u = _valueTypes.Vec3.dot(pd, m);

      if (_u < 0) {
        return 0;
      }

      var _w = _valueTypes.Vec3.dot(_valueTypes.Vec3.cross(tmp, pq, pa), pd);

      if (_w < 0) {
        return 0;
      } // outPt = u*a + v*d + w*c;


      if (outPt) {
        v = -v;

        var _denom = 1.0 / (_u + v + _w);

        _u *= _denom;
        v *= _denom;
        _w *= _denom;

        _valueTypes.Vec3.set(outPt, a.x * _u + d.x * v + c.x * _w, a.y * _u + d.y * v + c.y * _w, a.z * _u + d.z * v + c.z * _w);
      }
    }

    return 1;
  };
}();
/**
 * !#en ray-sphere intersect<br/>
 * !#zh 射线和球的相交性检测。
 * @static
 * @method ray_sphere
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Sphere} sphere
 * @return {number} 0 or not 0
 */


var ray_sphere = function () {
  var e = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, sphere) {
    var r = sphere.radius;
    var c = sphere.center;
    var o = ray.o;
    var d = ray.d;
    var rSq = r * r;

    _valueTypes.Vec3.subtract(e, c, o);

    var eSq = e.lengthSqr();

    var aLength = _valueTypes.Vec3.dot(e, d); // assume ray direction already normalized


    var fSq = rSq - (eSq - aLength * aLength);

    if (fSq < 0) {
      return 0;
    }

    var f = Math.sqrt(fSq);
    var t = eSq < rSq ? aLength + f : aLength - f;

    if (t < 0) {
      return 0;
    }

    return t;
  };
}();
/**
 * !#en ray-aabb intersect<br/>
 * !#zh 射线和轴对齐包围盒的相交性检测。
 * @static
 * @method ray_aabb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @return {number} 0 or not 0
 */


var ray_aabb = function () {
  var min = new _valueTypes.Vec3();
  var max = new _valueTypes.Vec3();
  return function (ray, aabb) {
    var o = ray.o,
        d = ray.d;
    var ix = 1 / d.x,
        iy = 1 / d.y,
        iz = 1 / d.z;

    _valueTypes.Vec3.subtract(min, aabb.center, aabb.halfExtents);

    _valueTypes.Vec3.add(max, aabb.center, aabb.halfExtents);

    var t1 = (min.x - o.x) * ix;
    var t2 = (max.x - o.x) * ix;
    var t3 = (min.y - o.y) * iy;
    var t4 = (max.y - o.y) * iy;
    var t5 = (min.z - o.z) * iz;
    var t6 = (max.z - o.z) * iz;
    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

    if (tmax < 0 || tmin > tmax) {
      return 0;
    }

    ;
    return tmin;
  };
}(); // adapt to old api


var rayAabb = ray_aabb;
/**
 * !#en ray-obb intersect<br/>
 * !#zh 射线和方向包围盒的相交性检测。
 * @static
 * @method ray_obb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or or 0
 */

var ray_obb = function () {
  var center = new _valueTypes.Vec3();
  var o = new _valueTypes.Vec3();
  var d = new _valueTypes.Vec3();
  var X = new _valueTypes.Vec3();
  var Y = new _valueTypes.Vec3();
  var Z = new _valueTypes.Vec3();
  var p = new _valueTypes.Vec3();
  var size = new Array(3);
  var f = new Array(3);
  var e = new Array(3);
  var t = new Array(6);
  return function (ray, obb) {
    size[0] = obb.halfExtents.x;
    size[1] = obb.halfExtents.y;
    size[2] = obb.halfExtents.z;
    center = obb.center;
    o = ray.o;
    d = ray.d;
    var obbm = obb.orientation.m;

    _valueTypes.Vec3.set(X, obbm[0], obbm[1], obbm[2]);

    _valueTypes.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);

    _valueTypes.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);

    _valueTypes.Vec3.subtract(p, center, o); // The cos values of the ray on the X, Y, Z


    f[0] = _valueTypes.Vec3.dot(X, d);
    f[1] = _valueTypes.Vec3.dot(Y, d);
    f[2] = _valueTypes.Vec3.dot(Z, d); // The projection length of P on X, Y, Z

    e[0] = _valueTypes.Vec3.dot(X, p);
    e[1] = _valueTypes.Vec3.dot(Y, p);
    e[2] = _valueTypes.Vec3.dot(Z, p);

    for (var i = 0; i < 3; ++i) {
      if (f[i] === 0) {
        if (-e[i] - size[i] > 0 || -e[i] + size[i] < 0) {
          return 0;
        } // Avoid div by 0!


        f[i] = 0.0000001;
      } // min


      t[i * 2 + 0] = (e[i] + size[i]) / f[i]; // max

      t[i * 2 + 1] = (e[i] - size[i]) / f[i];
    }

    var tmin = Math.max(Math.max(Math.min(t[0], t[1]), Math.min(t[2], t[3])), Math.min(t[4], t[5]));
    var tmax = Math.min(Math.min(Math.max(t[0], t[1]), Math.max(t[2], t[3])), Math.max(t[4], t[5]));

    if (tmax < 0 || tmin > tmax || tmin < 0) {
      return 0;
    }

    return tmin;
  };
}();
/**
 * !#en aabb-aabb intersect<br/>
 * !#zh 轴对齐包围盒和轴对齐包围盒的相交性检测。
 * @static
 * @method aabb_aabb
 * @param {geomUtils.Aabb} aabb1 Axis alignment surrounds box 1
 * @param {geomUtils.Aabb} aabb2 Axis alignment surrounds box 2
 * @return {number} 0 or not 0
 */


var aabb_aabb = function () {
  var aMin = new _valueTypes.Vec3();
  var aMax = new _valueTypes.Vec3();
  var bMin = new _valueTypes.Vec3();
  var bMax = new _valueTypes.Vec3();
  return function (aabb1, aabb2) {
    _valueTypes.Vec3.subtract(aMin, aabb1.center, aabb1.halfExtents);

    _valueTypes.Vec3.add(aMax, aabb1.center, aabb1.halfExtents);

    _valueTypes.Vec3.subtract(bMin, aabb2.center, aabb2.halfExtents);

    _valueTypes.Vec3.add(bMax, aabb2.center, aabb2.halfExtents);

    return aMin.x <= bMax.x && aMax.x >= bMin.x && aMin.y <= bMax.y && aMax.y >= bMin.y && aMin.z <= bMax.z && aMax.z >= bMin.z;
  };
}();

function getAABBVertices(min, max, out) {
  _valueTypes.Vec3.set(out[0], min.x, max.y, max.z);

  _valueTypes.Vec3.set(out[1], min.x, max.y, min.z);

  _valueTypes.Vec3.set(out[2], min.x, min.y, max.z);

  _valueTypes.Vec3.set(out[3], min.x, min.y, min.z);

  _valueTypes.Vec3.set(out[4], max.x, max.y, max.z);

  _valueTypes.Vec3.set(out[5], max.x, max.y, min.z);

  _valueTypes.Vec3.set(out[6], max.x, min.y, max.z);

  _valueTypes.Vec3.set(out[7], max.x, min.y, min.z);
}

function getOBBVertices(c, e, a1, a2, a3, out) {
  _valueTypes.Vec3.set(out[0], c.x + a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[1], c.x - a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[2], c.x + a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[3], c.x + a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[4], c.x - a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[5], c.x + a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[6], c.x - a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[7], c.x - a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y + a3.z * e.z);
}

function getInterval(vertices, axis) {
  var min = _valueTypes.Vec3.dot(axis, vertices[0]),
      max = min;

  for (var i = 1; i < 8; ++i) {
    var projection = _valueTypes.Vec3.dot(axis, vertices[i]);

    min = projection < min ? projection : min;
    max = projection > max ? projection : max;
  }

  return [min, max];
}
/**
 * !#en aabb-obb intersect<br/>
 * !#zh 轴对齐包围盒和方向包围盒的相交性检测。
 * @static
 * @method aabb_obb
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or not 0
 */


var aabb_obb = function () {
  var test = new Array(15);

  for (var i = 0; i < 15; i++) {
    test[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var vertices = new Array(8);
  var vertices2 = new Array(8);

  for (var _i2 = 0; _i2 < 8; _i2++) {
    vertices[_i2] = new _valueTypes.Vec3(0, 0, 0);
    vertices2[_i2] = new _valueTypes.Vec3(0, 0, 0);
  }

  var min = new _valueTypes.Vec3();
  var max = new _valueTypes.Vec3();
  return function (aabb, obb) {
    var obbm = obb.orientation.m;

    _valueTypes.Vec3.set(test[0], 1, 0, 0);

    _valueTypes.Vec3.set(test[1], 0, 1, 0);

    _valueTypes.Vec3.set(test[2], 0, 0, 1);

    _valueTypes.Vec3.set(test[3], obbm[0], obbm[1], obbm[2]);

    _valueTypes.Vec3.set(test[4], obbm[3], obbm[4], obbm[5]);

    _valueTypes.Vec3.set(test[5], obbm[6], obbm[7], obbm[8]);

    for (var _i3 = 0; _i3 < 3; ++_i3) {
      // Fill out rest of axis
      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 0], test[_i3], test[0]);

      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 1], test[_i3], test[1]);

      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 1], test[_i3], test[2]);
    }

    _valueTypes.Vec3.subtract(min, aabb.center, aabb.halfExtents);

    _valueTypes.Vec3.add(max, aabb.center, aabb.halfExtents);

    getAABBVertices(min, max, vertices);
    getOBBVertices(obb.center, obb.halfExtents, test[3], test[4], test[5], vertices2);

    for (var j = 0; j < 15; ++j) {
      var a = getInterval(vertices, test[j]);
      var b = getInterval(vertices2, test[j]);

      if (b[0] > a[1] || a[0] > b[1]) {
        return 0; // Seperating axis found
      }
    }

    return 1;
  };
}();
/**
 * !#en aabb-plane intersect<br/>
 * !#zh 轴对齐包围盒和平面的相交性检测。
 * @static
 * @method aabb_plane
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var aabb_plane = function aabb_plane(aabb, plane) {
  var r = aabb.halfExtents.x * Math.abs(plane.n.x) + aabb.halfExtents.y * Math.abs(plane.n.y) + aabb.halfExtents.z * Math.abs(plane.n.z);

  var dot = _valueTypes.Vec3.dot(plane.n, aabb.center);

  if (dot + r < plane.d) {
    return -1;
  } else if (dot - r > plane.d) {
    return 0;
  }

  return 1;
};
/**
 * !#en aabb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method aabb_frustum
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var aabb_frustum = function aabb_frustum(aabb, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (aabb_plane(aabb, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

/**
 * !#en aabb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method aabb_frustum_accurate
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number}
 */


var aabb_frustum_accurate = function () {
  var tmp = new Array(8);
  var out1 = 0,
      out2 = 0;

  for (var i = 0; i < tmp.length; i++) {
    tmp[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  return function (aabb, frustum) {
    var result = 0,
        intersects = false; // 1. aabb inside/outside frustum test

    for (var _i4 = 0; _i4 < frustum.planes.length; _i4++) {
      result = aabb_plane(aabb, frustum.planes[_i4]); // frustum plane normal points to the inside

      if (result === -1) {
        return 0;
      } // completely outside
      else if (result === 1) {
          intersects = true;
        }
    }

    if (!intersects) {
      return 1;
    } // completely inside
    // in case of false positives
    // 2. frustum inside/outside aabb test


    for (var _i5 = 0; _i5 < frustum.vertices.length; _i5++) {
      _valueTypes.Vec3.subtract(tmp[_i5], frustum.vertices[_i5], aabb.center);
    }

    out1 = 0, out2 = 0;

    for (var _i6 = 0; _i6 < frustum.vertices.length; _i6++) {
      if (tmp[_i6].x > aabb.halfExtents.x) {
        out1++;
      } else if (tmp[_i6].x < -aabb.halfExtents.x) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i7 = 0; _i7 < frustum.vertices.length; _i7++) {
      if (tmp[_i7].y > aabb.halfExtents.y) {
        out1++;
      } else if (tmp[_i7].y < -aabb.halfExtents.y) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i8 = 0; _i8 < frustum.vertices.length; _i8++) {
      if (tmp[_i8].z > aabb.halfExtents.z) {
        out1++;
      } else if (tmp[_i8].z < -aabb.halfExtents.z) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-point intersect<br/>
 * !#zh 方向包围盒和点的相交性检测。
 * @static
 * @method obb_point
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Vec3} point
 * @return {boolean} true or false
 */


var obb_point = function () {
  var tmp = new _valueTypes.Vec3(0, 0, 0),
      m3 = new _valueTypes.Mat3();

  var lessThan = function lessThan(a, b) {
    return Math.abs(a.x) < b.x && Math.abs(a.y) < b.y && Math.abs(a.z) < b.z;
  };

  return function (obb, point) {
    _valueTypes.Vec3.subtract(tmp, point, obb.center);

    _valueTypes.Vec3.transformMat3(tmp, tmp, _valueTypes.Mat3.transpose(m3, obb.orientation));

    return lessThan(tmp, obb.halfExtents);
  };
}();
/**
 * !#en obb-plane intersect<br/>
 * !#zh 方向包围盒和平面的相交性检测。
 * @static
 * @method obb_plane
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var obb_plane = function () {
  var absDot = function absDot(n, x, y, z) {
    return Math.abs(n.x * x + n.y * y + n.z * z);
  };

  return function (obb, plane) {
    var obbm = obb.orientation.m; // Real-Time Collision Detection, Christer Ericson, p. 163.

    var r = obb.halfExtents.x * absDot(plane.n, obbm[0], obbm[1], obbm[2]) + obb.halfExtents.y * absDot(plane.n, obbm[3], obbm[4], obbm[5]) + obb.halfExtents.z * absDot(plane.n, obbm[6], obbm[7], obbm[8]);

    var dot = _valueTypes.Vec3.dot(plane.n, obb.center);

    if (dot + r < plane.d) {
      return -1;
    } else if (dot - r > plane.d) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 方向包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method obb_frustum
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var obb_frustum = function obb_frustum(obb, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (obb_plane(obb, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

/**
 * !#en obb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 方向包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method obb_frustum_accurate
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var obb_frustum_accurate = function () {
  var tmp = new Array(8);
  var dist = 0,
      out1 = 0,
      out2 = 0;

  for (var i = 0; i < tmp.length; i++) {
    tmp[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var dot = function dot(n, x, y, z) {
    return n.x * x + n.y * y + n.z * z;
  };

  return function (obb, frustum) {
    var result = 0,
        intersects = false; // 1. obb inside/outside frustum test

    for (var _i9 = 0; _i9 < frustum.planes.length; _i9++) {
      result = obb_plane(obb, frustum.planes[_i9]); // frustum plane normal points to the inside

      if (result === -1) {
        return 0;
      } // completely outside
      else if (result === 1) {
          intersects = true;
        }
    }

    if (!intersects) {
      return 1;
    } // completely inside
    // in case of false positives
    // 2. frustum inside/outside obb test


    for (var _i10 = 0; _i10 < frustum.vertices.length; _i10++) {
      _valueTypes.Vec3.subtract(tmp[_i10], frustum.vertices[_i10], obb.center);
    }

    out1 = 0, out2 = 0;
    var obbm = obb.orientation.m;

    for (var _i11 = 0; _i11 < frustum.vertices.length; _i11++) {
      dist = dot(tmp[_i11], obbm[0], obbm[1], obbm[2]);

      if (dist > obb.halfExtents.x) {
        out1++;
      } else if (dist < -obb.halfExtents.x) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i12 = 0; _i12 < frustum.vertices.length; _i12++) {
      dist = dot(tmp[_i12], obbm[3], obbm[4], obbm[5]);

      if (dist > obb.halfExtents.y) {
        out1++;
      } else if (dist < -obb.halfExtents.y) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i13 = 0; _i13 < frustum.vertices.length; _i13++) {
      dist = dot(tmp[_i13], obbm[6], obbm[7], obbm[8]);

      if (dist > obb.halfExtents.z) {
        out1++;
      } else if (dist < -obb.halfExtents.z) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-obb intersect<br/>
 * !#zh 方向包围盒和方向包围盒的相交性检测。
 * @static
 * @method obb_obb
 * @param {geomUtils.Obb} obb1 Direction box1
 * @param {geomUtils.Obb} obb2 Direction box2
 * @return {number} 0 or not 0
 */


var obb_obb = function () {
  var test = new Array(15);

  for (var i = 0; i < 15; i++) {
    test[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var vertices = new Array(8);
  var vertices2 = new Array(8);

  for (var _i14 = 0; _i14 < 8; _i14++) {
    vertices[_i14] = new _valueTypes.Vec3(0, 0, 0);
    vertices2[_i14] = new _valueTypes.Vec3(0, 0, 0);
  }

  return function (obb1, obb2) {
    var obb1m = obb1.orientation.m;
    var obb2m = obb2.orientation.m;

    _valueTypes.Vec3.set(test[0], obb1m[0], obb1m[1], obb1m[2]);

    _valueTypes.Vec3.set(test[1], obb1m[3], obb1m[4], obb1m[5]);

    _valueTypes.Vec3.set(test[2], obb1m[6], obb1m[7], obb1m[8]);

    _valueTypes.Vec3.set(test[3], obb2m[0], obb2m[1], obb2m[2]);

    _valueTypes.Vec3.set(test[4], obb2m[3], obb2m[4], obb2m[5]);

    _valueTypes.Vec3.set(test[5], obb2m[6], obb2m[7], obb2m[8]);

    for (var _i15 = 0; _i15 < 3; ++_i15) {
      // Fill out rest of axis
      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 0], test[_i15], test[0]);

      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 1], test[_i15], test[1]);

      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 1], test[_i15], test[2]);
    }

    getOBBVertices(obb1.center, obb1.halfExtents, test[0], test[1], test[2], vertices);
    getOBBVertices(obb2.center, obb2.halfExtents, test[3], test[4], test[5], vertices2);

    for (var _i16 = 0; _i16 < 15; ++_i16) {
      var a = getInterval(vertices, test[_i16]);
      var b = getInterval(vertices2, test[_i16]);

      if (b[0] > a[1] || a[0] > b[1]) {
        return 0; // Seperating axis found
      }
    }

    return 1;
  };
}();
/**
 * !#en phere-plane intersect, not necessarily faster than obb-plane<br/>
 * due to the length calculation of the plane normal to factor out<br/>
 * the unnomalized plane distance<br/>
 * !#zh 球与平面的相交性检测。
 * @static
 * @method sphere_plane
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var sphere_plane = function sphere_plane(sphere, plane) {
  var dot = _valueTypes.Vec3.dot(plane.n, sphere.center);

  var r = sphere.radius * plane.n.length();

  if (dot + r < plane.d) {
    return -1;
  } else if (dot - r > plane.d) {
    return 0;
  }

  return 1;
};
/**
 * !#en sphere-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 球和锥台的相交性检测，速度快，但有错误情况。
 * @static
 * @method sphere_frustum
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var sphere_frustum = function sphere_frustum(sphere, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (sphere_plane(sphere, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://stackoverflow.com/questions/20912692/view-frustum-culling-corner-cases

/**
 * !#en sphere-frustum intersect, handles the false positives correctly<br/>
 * !#zh 球和锥台的相交性检测，正确处理大多数错误情况。
 * @static
 * @method sphere_frustum_accurate
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var sphere_frustum_accurate = function () {
  var pt = new _valueTypes.Vec3(0, 0, 0),
      map = [1, -1, 1, -1, 1, -1];
  return function (sphere, frustum) {
    for (var i = 0; i < 6; i++) {
      var plane = frustum.planes[i];
      var r = sphere.radius,
          c = sphere.center;
      var n = plane.n,
          d = plane.d;

      var dot = _valueTypes.Vec3.dot(n, c); // frustum plane normal points to the inside


      if (dot + r < d) {
        return 0;
      } // completely outside
      else if (dot - r > d) {
          continue;
        } // in case of false positives
      // has false negatives, still working on it


      _valueTypes.Vec3.add(pt, c, _valueTypes.Vec3.multiplyScalar(pt, n, r));

      for (var j = 0; j < 6; j++) {
        if (j === i || j === i + map[i]) {
          continue;
        }

        var test = frustum.planes[j];

        if (_valueTypes.Vec3.dot(test.n, pt) < test.d) {
          return 0;
        }
      }
    }

    return 1;
  };
}();
/**
 * !#en sphere-sphere intersect<br/>
 * !#zh 球和球的相交性检测。
 * @static
 * @method sphere_sphere
 * @param {geomUtils.Sphere} sphere0
 * @param {geomUtils.Sphere} sphere1
 * @return {boolean} true or false
 */


var sphere_sphere = function sphere_sphere(sphere0, sphere1) {
  var r = sphere0.radius + sphere1.radius;
  return _valueTypes.Vec3.squaredDistance(sphere0.center, sphere1.center) < r * r;
};
/**
 * !#en sphere-aabb intersect<br/>
 * !#zh 球和轴对齐包围盒的相交性检测。
 * @static
 * @method sphere_aabb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Aabb} aabb
 * @return {boolean} true or false
 */


var sphere_aabb = function () {
  var pt = new _valueTypes.Vec3();
  return function (sphere, aabb) {
    distance.pt_point_aabb(pt, sphere.center, aabb);
    return _valueTypes.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
  };
}();
/**
 * !#en sphere-obb intersect<br/>
 * !#zh 球和方向包围盒的相交性检测。
 * @static
 * @method sphere_obb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Obb} obb
 * @return {boolean} true or false
 */


var sphere_obb = function () {
  var pt = new _valueTypes.Vec3();
  return function (sphere, obb) {
    distance.pt_point_obb(pt, sphere.center, obb);
    return _valueTypes.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
  };
}();

var intersect = {
  // old api
  rayAabb: rayAabb,
  rayMesh: rayMesh,
  raycast: raycast,
  rayTriangle: rayTriangle,
  ray_sphere: ray_sphere,
  ray_aabb: ray_aabb,
  ray_obb: ray_obb,
  ray_plane: ray_plane,
  ray_triangle: ray_triangle,
  line_plane: line_plane,
  line_triangle: line_triangle,
  line_quad: line_quad,
  sphere_sphere: sphere_sphere,
  sphere_aabb: sphere_aabb,
  sphere_obb: sphere_obb,
  sphere_plane: sphere_plane,
  sphere_frustum: sphere_frustum,
  sphere_frustum_accurate: sphere_frustum_accurate,
  aabb_aabb: aabb_aabb,
  aabb_obb: aabb_obb,
  aabb_plane: aabb_plane,
  aabb_frustum: aabb_frustum,
  aabb_frustum_accurate: aabb_frustum_accurate,
  obb_obb: obb_obb,
  obb_plane: obb_plane,
  obb_frustum: obb_frustum,
  obb_frustum_accurate: obb_frustum_accurate,
  obb_point: obb_point,

  /**
   * !#en
   * The intersection detection of g1 and g2 can fill in the shape in the basic geometry.
   * !#zh
   * g1 和 g2 的相交性检测，可填入基础几何中的形状。
   * @static
   * @method resolve
   * @param g1 Geometry 1
   * @param g2 Geometry 2
   * @param outPt optional, Intersection point. (note: only partial shape detection with this return value)
   */
  resolve: function resolve(g1, g2, outPt) {
    if (outPt === void 0) {
      outPt = null;
    }

    var type1 = g1._type,
        type2 = g2._type;
    var resolver = this[type1 | type2];

    if (type1 < type2) {
      return resolver(g1, g2, outPt);
    } else {
      return resolver(g2, g1, outPt);
    }
  }
};
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_SPHERE] = ray_sphere;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_AABB] = ray_aabb;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_OBB] = ray_obb;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_PLANE] = ray_plane;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_TRIANGLE] = ray_triangle;
intersect[_enums["default"].SHAPE_LINE | _enums["default"].SHAPE_PLANE] = line_plane;
intersect[_enums["default"].SHAPE_LINE | _enums["default"].SHAPE_TRIANGLE] = line_triangle;
intersect[_enums["default"].SHAPE_SPHERE] = sphere_sphere;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_AABB] = sphere_aabb;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_OBB] = sphere_obb;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_PLANE] = sphere_plane;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_FRUSTUM] = sphere_frustum;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = sphere_frustum_accurate;
intersect[_enums["default"].SHAPE_AABB] = aabb_aabb;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_OBB] = aabb_obb;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_PLANE] = aabb_plane;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_FRUSTUM] = aabb_frustum;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = aabb_frustum_accurate;
intersect[_enums["default"].SHAPE_OBB] = obb_obb;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_PLANE] = obb_plane;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_FRUSTUM] = obb_frustum;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = obb_frustum_accurate;
var _default = intersect;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXGludGVyc2VjdC50cyJdLCJuYW1lcyI6WyJyYXlfbWVzaCIsInRyaSIsInRyaWFuZ2xlIiwiY3JlYXRlIiwibWluRGlzdCIsIkluZmluaXR5IiwiZ2V0VmVjMyIsIm91dCIsImRhdGEiLCJpZHgiLCJzdHJpZGUiLCJWZWMzIiwic2V0IiwicmF5IiwibWVzaCIsInN1Yk1lc2hlcyIsIl9zdWJNZXNoZXMiLCJpIiwibGVuZ3RoIiwiX3ByaW1pdGl2ZVR5cGUiLCJnZngiLCJQVF9UUklBTkdMRVMiLCJzdWJEYXRhIiwiX3N1YkRhdGFzIiwicG9zRGF0YSIsIl9nZXRBdHRyTWVzaERhdGEiLCJBVFRSX1BPU0lUSU9OIiwiaURhdGEiLCJnZXRJRGF0YSIsIlVpbnQxNkFycmF5IiwiZm9ybWF0IiwidmZtIiwiZm10IiwiZWxlbWVudCIsIm51bSIsImEiLCJiIiwiYyIsImRpc3QiLCJyYXlfdHJpYW5nbGUiLCJyYXlNZXNoIiwicmF5X2Nhc3QiLCJ0cmF2ZXJzYWwiLCJub2RlIiwiY2IiLCJjaGlsZHJlbiIsImNoaWxkIiwiY21wIiwiZGlzdGFuY2UiLCJ0cmFuc2Zvcm1NYXQ0Tm9ybWFsIiwibSIsIm1tIiwieCIsInkiLCJ6Iiwicmh3IiwicmVzdWx0c1Bvb2wiLCJSZWN5Y2xlUG9vbCIsInJlc3VsdHMiLCJub2RlQWFiYiIsImFhYmIiLCJtaW5Qb3MiLCJtYXhQb3MiLCJtb2RlbFJheSIsIm00XzEiLCJjYyIsIm1hdDQiLCJtNF8yIiwiZCIsImRpc3RhbmNlVmFsaWQiLCJyb290Iiwid29ybGRSYXkiLCJoYW5kbGVyIiwiZmlsdGVyIiwicmVzZXQiLCJkaXJlY3RvciIsImdldFNjZW5lIiwiTWF0NCIsImludmVydCIsImdldFdvcmxkTWF0cml4IiwidHJhbnNmb3JtTWF0NCIsIm8iLCJub3JtYWxpemUiLCJjb21wb25lbnQiLCJfcmVuZGVyQ29tcG9uZW50IiwiTWVzaFJlbmRlcmVyIiwicmF5X2FhYmIiLCJfYm91bmRpbmdCb3giLCJ3aWR0aCIsImhlaWdodCIsImFuY2hvclgiLCJhbmNob3JZIiwiZnJvbVBvaW50cyIsInNjYWxlIiwicmVzIiwiYWRkIiwibWFnIiwicHVzaCIsInNvcnQiLCJyYXljYXN0IiwicmF5X3BsYW5lIiwicHQiLCJwbGFuZSIsImRlbm9tIiwiZG90IiwibiIsIk1hdGgiLCJhYnMiLCJOdW1iZXIiLCJFUFNJTE9OIiwibXVsdGlwbHlTY2FsYXIiLCJ0Iiwic3VidHJhY3QiLCJsaW5lX3BsYW5lIiwiYWIiLCJsaW5lIiwiZSIsInMiLCJhYyIsInB2ZWMiLCJ0dmVjIiwicXZlYyIsImRvdWJsZVNpZGVkIiwiY3Jvc3MiLCJkZXQiLCJpbnZfZGV0IiwidSIsInYiLCJyYXlUcmlhbmdsZSIsImxpbmVfdHJpYW5nbGUiLCJxcCIsImFwIiwib3V0UHQiLCJ3IiwiaW52RGV0IiwibGluZV9xdWFkIiwicHEiLCJwYSIsInBiIiwicGMiLCJwZCIsInRtcCIsInAiLCJxIiwicmF5X3NwaGVyZSIsInNwaGVyZSIsInIiLCJyYWRpdXMiLCJjZW50ZXIiLCJyU3EiLCJlU3EiLCJsZW5ndGhTcXIiLCJhTGVuZ3RoIiwiZlNxIiwiZiIsInNxcnQiLCJtaW4iLCJtYXgiLCJpeCIsIml5IiwiaXoiLCJoYWxmRXh0ZW50cyIsInQxIiwidDIiLCJ0MyIsInQ0IiwidDUiLCJ0NiIsInRtaW4iLCJ0bWF4IiwicmF5QWFiYiIsInJheV9vYmIiLCJYIiwiWSIsIloiLCJzaXplIiwiQXJyYXkiLCJvYmIiLCJvYmJtIiwib3JpZW50YXRpb24iLCJhYWJiX2FhYmIiLCJhTWluIiwiYU1heCIsImJNaW4iLCJiTWF4IiwiYWFiYjEiLCJhYWJiMiIsImdldEFBQkJWZXJ0aWNlcyIsImdldE9CQlZlcnRpY2VzIiwiYTEiLCJhMiIsImEzIiwiZ2V0SW50ZXJ2YWwiLCJ2ZXJ0aWNlcyIsImF4aXMiLCJwcm9qZWN0aW9uIiwiYWFiYl9vYmIiLCJ0ZXN0IiwidmVydGljZXMyIiwiaiIsImFhYmJfcGxhbmUiLCJhYWJiX2ZydXN0dW0iLCJmcnVzdHVtIiwicGxhbmVzIiwiYWFiYl9mcnVzdHVtX2FjY3VyYXRlIiwib3V0MSIsIm91dDIiLCJyZXN1bHQiLCJpbnRlcnNlY3RzIiwib2JiX3BvaW50IiwibTMiLCJNYXQzIiwibGVzc1RoYW4iLCJwb2ludCIsInRyYW5zZm9ybU1hdDMiLCJ0cmFuc3Bvc2UiLCJvYmJfcGxhbmUiLCJhYnNEb3QiLCJvYmJfZnJ1c3R1bSIsIm9iYl9mcnVzdHVtX2FjY3VyYXRlIiwib2JiX29iYiIsIm9iYjEiLCJvYmIyIiwib2JiMW0iLCJvYmIybSIsInNwaGVyZV9wbGFuZSIsInNwaGVyZV9mcnVzdHVtIiwic3BoZXJlX2ZydXN0dW1fYWNjdXJhdGUiLCJtYXAiLCJzcGhlcmVfc3BoZXJlIiwic3BoZXJlMCIsInNwaGVyZTEiLCJzcXVhcmVkRGlzdGFuY2UiLCJzcGhlcmVfYWFiYiIsInB0X3BvaW50X2FhYmIiLCJzcGhlcmVfb2JiIiwicHRfcG9pbnRfb2JiIiwiaW50ZXJzZWN0IiwicmVzb2x2ZSIsImcxIiwiZzIiLCJ0eXBlMSIsIl90eXBlIiwidHlwZTIiLCJyZXNvbHZlciIsImVudW1zIiwiU0hBUEVfUkFZIiwiU0hBUEVfU1BIRVJFIiwiU0hBUEVfQUFCQiIsIlNIQVBFX09CQiIsIlNIQVBFX1BMQU5FIiwiU0hBUEVfVFJJQU5HTEUiLCJTSEFQRV9MSU5FIiwiU0hBUEVfRlJVU1RVTSIsIlNIQVBFX0ZSVVNUVU1fQUNDVVJBVEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBS0E7O0FBRUE7Ozs7Ozs7O0FBdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFpQkE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsUUFBUSxHQUFJLFlBQVk7QUFD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Q1Esa0JBQU1FLFlBQU4sR0FBcUJGLGtCQUFNUyxzQkFBNUIsQ0FBVCxHQUErRDNCLHVCQUEvRDtBQUVBVSxTQUFTLENBQUNRLGtCQUFNRyxVQUFQLENBQVQsR0FBOEJwRSxTQUE5QjtBQUNBeUQsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1JLFNBQTFCLENBQVQsR0FBZ0RyRCxRQUFoRDtBQUNBeUMsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1LLFdBQTFCLENBQVQsR0FBa0RsRCxVQUFsRDtBQUNBcUMsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1RLGFBQTFCLENBQVQsR0FBb0RwRCxZQUFwRDtBQUNBb0MsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1TLHNCQUExQixDQUFULEdBQTZEbEQscUJBQTdEO0FBRUFpQyxTQUFTLENBQUNRLGtCQUFNSSxTQUFQLENBQVQsR0FBNkI3QixPQUE3QjtBQUNBaUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1LLFdBQXpCLENBQVQsR0FBaURsQyxTQUFqRDtBQUNBcUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1RLGFBQXpCLENBQVQsR0FBbURuQyxXQUFuRDtBQUNBbUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1TLHNCQUF6QixDQUFULEdBQTREbkMsb0JBQTVEO2VBRWVrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcclxuaW1wb3J0IFJlY3ljbGVQb29sIGZyb20gJy4uLy4uL3JlbmRlcmVyL21lbW9wL3JlY3ljbGUtcG9vbCc7XHJcblxyXG5pbXBvcnQgeyBNYXQzLCBWZWMzLCBNYXQ0IH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgYWFiYiBmcm9tICcuL2FhYmInO1xyXG5pbXBvcnQgKiBhcyBkaXN0YW5jZSBmcm9tICcuL2Rpc3RhbmNlJztcclxuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xyXG5pbXBvcnQgeyBmcnVzdHVtIH0gZnJvbSAnLi9mcnVzdHVtJztcclxuaW1wb3J0IGxpbmUgZnJvbSAnLi9saW5lJztcclxuaW1wb3J0IG9iYiBmcm9tICcuL29iYic7XHJcbmltcG9ydCBwbGFuZSBmcm9tICcuL3BsYW5lJztcclxuaW1wb3J0IHJheSBmcm9tICcuL3JheSc7XHJcbmltcG9ydCBzcGhlcmUgZnJvbSAnLi9zcGhlcmUnO1xyXG5pbXBvcnQgdHJpYW5nbGUgZnJvbSAnLi90cmlhbmdsZSc7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGdlb21VdGlscy5pbnRlcnNlY3RcclxuICovXHJcblxyXG5jb25zdCByYXlfbWVzaCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdHJpID0gdHJpYW5nbGUuY3JlYXRlKCk7XHJcbiAgICBsZXQgbWluRGlzdCA9IEluZmluaXR5O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFZlYzMgKG91dCwgZGF0YSwgaWR4LCBzdHJpZGUpIHtcclxuICAgICAgICBWZWMzLnNldChvdXQsIGRhdGFbaWR4KnN0cmlkZV0sIGRhdGFbaWR4KnN0cmlkZSArIDFdLCBkYXRhW2lkeCpzdHJpZGUgKyAyXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmF5LCBtZXNoKSB7XHJcbiAgICAgICAgbWluRGlzdCA9IEluZmluaXR5O1xyXG4gICAgICAgIGxldCBzdWJNZXNoZXMgPSBtZXNoLl9zdWJNZXNoZXM7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzdWJNZXNoZXNbaV0uX3ByaW1pdGl2ZVR5cGUgIT09IGdmeC5QVF9UUklBTkdMRVMpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1YkRhdGEgPSAobWVzaC5fc3ViRGF0YXNbaV0gfHwgbWVzaC5fc3ViRGF0YXNbMF0pO1xyXG4gICAgICAgICAgICBsZXQgcG9zRGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShpLCBnZnguQVRUUl9QT1NJVElPTik7XHJcbiAgICAgICAgICAgIGxldCBpRGF0YSA9IHN1YkRhdGEuZ2V0SURhdGEoVWludDE2QXJyYXkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZvcm1hdCA9IHN1YkRhdGEudmZtO1xyXG4gICAgICAgICAgICBsZXQgZm10ID0gZm9ybWF0LmVsZW1lbnQoZ2Z4LkFUVFJfUE9TSVRJT04pO1xyXG4gICAgICAgICAgICBsZXQgbnVtID0gZm10Lm51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpRGF0YS5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgICAgICAgICAgZ2V0VmVjMyh0cmkuYSwgcG9zRGF0YSwgaURhdGFbIGkgXSwgbnVtKTtcclxuICAgICAgICAgICAgICAgIGdldFZlYzModHJpLmIsIHBvc0RhdGEsIGlEYXRhW2krMV0sIG51bSk7XHJcbiAgICAgICAgICAgICAgICBnZXRWZWMzKHRyaS5jLCBwb3NEYXRhLCBpRGF0YVtpKzJdLCBudW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkaXN0ID0gcmF5X3RyaWFuZ2xlKHJheSwgdHJpKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0IDwgbWluRGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbkRpc3QgPSBkaXN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtaW5EaXN0O1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8vIGFkYXB0IHRvIG9sZCBhcGlcclxuY29uc3QgcmF5TWVzaCA9IHJheV9tZXNoO1xyXG5cclxuLyoqIFxyXG4gKiAhI2VuXHJcbiAqIENoZWNrIHdoZXRoZXIgcmF5IGludGVyc2VjdCB3aXRoIG5vZGVzXHJcbiAqICEjemhcclxuICog5qOA5rWL5bCE57q/5piv5ZCm5LiO54mp5L2T5pyJ5Lqk6ZuGXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCByYXlfY2FzdFxyXG4gKiBAcGFyYW0ge05vZGV9IHJvb3QgLSBJZiByb290IGlzIG51bGwsIHRoZW4gdHJhdmVyc2FsIG5vZGVzIGZyb20gc2NlbmUgbm9kZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5SYXl9IHdvcmxkUmF5XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyXHJcbiAqIEByZXR1cm4ge1tdfSBbe25vZGUsIGRpc3RhbmNlfV1cclxuKi9cclxuY29uc3QgcmF5X2Nhc3QgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gdHJhdmVyc2FsIChub2RlLCBjYikge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgdHJhdmVyc2FsKGNoaWxkLCBjYik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYihub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbXAgKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5kaXN0YW5jZSAtIGIuZGlzdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NE5vcm1hbCAob3V0LCBhLCBtKSB7XHJcbiAgICAgICAgbGV0IG1tID0gbS5tO1xyXG4gICAgICAgIGxldCB4ID0gYS54LCB5ID0gYS55LCB6ID0gYS56LFxyXG4gICAgICAgICAgICByaHcgPSBtbVszXSAqIHggKyBtbVs3XSAqIHkgKyBtbVsxMV0gKiB6O1xyXG4gICAgICAgIHJodyA9IHJodyA/IDEgLyByaHcgOiAxO1xyXG4gICAgICAgIG91dC54ID0gKG1tWzBdICogeCArIG1tWzRdICogeSArIG1tWzhdICogeikgKiByaHc7XHJcbiAgICAgICAgb3V0LnkgPSAobW1bMV0gKiB4ICsgbW1bNV0gKiB5ICsgbW1bOV0gKiB6KSAqIHJodztcclxuICAgICAgICBvdXQueiA9IChtbVsyXSAqIHggKyBtbVs2XSAqIHkgKyBtbVsxMF0gKiB6KSAqIHJodztcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHRzUG9vbCA9IG5ldyBSZWN5Y2xlUG9vbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzdGFuY2U6IDAsXHJcbiAgICAgICAgICAgIG5vZGU6IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9LCAxKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xyXG5cclxuICAgIC8vIHRlbXAgdmFyaWFibGVcclxuICAgIGxldCBub2RlQWFiYiA9IGFhYmIuY3JlYXRlKCk7XHJcbiAgICBsZXQgbWluUG9zID0gbmV3IFZlYzMoKTtcclxuICAgIGxldCBtYXhQb3MgPSBuZXcgVmVjMygpO1xyXG5cclxuICAgIGxldCBtb2RlbFJheSA9IG5ldyByYXkoKTtcclxuICAgIGxldCBtNF8xID0gY2MubWF0NCgpO1xyXG4gICAgbGV0IG00XzIgPSBjYy5tYXQ0KCk7XHJcbiAgICBsZXQgZCA9IG5ldyBWZWMzKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzdGFuY2VWYWxpZCAoZGlzdGFuY2UpIHtcclxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwICYmIGRpc3RhbmNlIDwgSW5maW5pdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyb290LCB3b3JsZFJheSwgaGFuZGxlciwgZmlsdGVyKSB7XHJcbiAgICAgICAgcmVzdWx0c1Bvb2wucmVzZXQoKTtcclxuICAgICAgICByZXN1bHRzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIHJvb3QgPSByb290IHx8IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgdHJhdmVyc2FsKHJvb3QsIGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlcihub2RlKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gdHJhbnNmb3JtIHdvcmxkIHJheSB0byBtb2RlbCByYXlcclxuICAgICAgICAgICAgTWF0NC5pbnZlcnQobTRfMiwgbm9kZS5nZXRXb3JsZE1hdHJpeChtNF8xKSk7XHJcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChtb2RlbFJheS5vLCB3b3JsZFJheS5vLCBtNF8yKTtcclxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUobW9kZWxSYXkuZCwgdHJhbnNmb3JtTWF0NE5vcm1hbChtb2RlbFJheS5kLCB3b3JsZFJheS5kLCBtNF8yKSk7XHJcblxyXG4gICAgICAgICAgICAvLyByYXljYXN0IHdpdGggYm91bmRpbmcgYm94XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IEluZmluaXR5O1xyXG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gbm9kZS5fcmVuZGVyQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgY2MuTWVzaFJlbmRlcmVyICkge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSByYXlfYWFiYihtb2RlbFJheSwgY29tcG9uZW50Ll9ib3VuZGluZ0JveCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobm9kZS53aWR0aCAmJiBub2RlLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQobWluUG9zLCAtbm9kZS53aWR0aCAqIG5vZGUuYW5jaG9yWCwgLW5vZGUuaGVpZ2h0ICogbm9kZS5hbmNob3JZLCBub2RlLnopO1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQobWF4UG9zLCBub2RlLndpZHRoICogKDEgLSBub2RlLmFuY2hvclgpLCBub2RlLmhlaWdodCAqICgxIC0gbm9kZS5hbmNob3JZKSwgbm9kZS56KTtcclxuICAgICAgICAgICAgICAgIGFhYmIuZnJvbVBvaW50cyhub2RlQWFiYiwgbWluUG9zLCBtYXhQb3MpO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSByYXlfYWFiYihtb2RlbFJheSwgbm9kZUFhYmIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRpc3RhbmNlVmFsaWQoZGlzdGFuY2UpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBoYW5kbGVyKG1vZGVsUmF5LCBub2RlLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZVZhbGlkKGRpc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgVmVjMy5zY2FsZShkLCBtb2RlbFJheS5kLCBkaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKGQsIGQsIG00XzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlc3VsdHNQb29sLmFkZCgpO1xyXG4gICAgICAgICAgICAgICAgcmVzLm5vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICAgICAgcmVzLmRpc3RhbmNlID0gVmVjMy5tYWcoZCk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXN1bHRzLnNvcnQoY21wKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxufSkoKTtcclxuXHJcbi8vIGFkYXB0IHRvIG9sZCBhcGlcclxuY29uc3QgcmF5Y2FzdCA9IHJheV9jYXN0O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gcmF5LXBsYW5lIGludGVyc2VjdDxici8+XHJcbiAqICEjemgg5bCE57q/5LiO5bmz6Z2i55qE55u45Lqk5oCn5qOA5rWL44CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCByYXlfcGxhbmVcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuUmF5fSByYXlcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuUGxhbmV9IHBsYW5lXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgcmF5X3BsYW5lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXk6IHJheSwgcGxhbmU6IHBsYW5lKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBkZW5vbSA9IFZlYzMuZG90KHJheS5kLCBwbGFuZS5uKTtcclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVub20pIDwgTnVtYmVyLkVQU0lMT04pIHsgcmV0dXJuIDA7IH1cclxuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHB0LCBwbGFuZS5uLCBwbGFuZS5kKTtcclxuICAgICAgICBjb25zdCB0ID0gVmVjMy5kb3QoVmVjMy5zdWJ0cmFjdChwdCwgcHQsIHJheS5vKSwgcGxhbmUubikgLyBkZW5vbTtcclxuICAgICAgICBpZiAodCA8IDApIHsgcmV0dXJuIDA7IH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogISNlbiBsaW5lLXBsYW5lIGludGVyc2VjdDxici8+XHJcbiAqICEjemgg57q/5q615LiO5bmz6Z2i55qE55u45Lqk5oCn5qOA5rWL44CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCBsaW5lX3BsYW5lXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkxpbmV9IGxpbmVcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuUGxhbmV9IHBsYW5lXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgbGluZV9wbGFuZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhYiA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbiAobGluZTogbGluZSwgcGxhbmU6IHBsYW5lKTogbnVtYmVyIHtcclxuICAgICAgICBWZWMzLnN1YnRyYWN0KGFiLCBsaW5lLmUsIGxpbmUucyk7XHJcbiAgICAgICAgY29uc3QgdCA9IChwbGFuZS5kIC0gVmVjMy5kb3QobGluZS5zLCBwbGFuZS5uKSkgLyBWZWMzLmRvdChhYiwgcGxhbmUubik7XHJcbiAgICAgICAgaWYgKHQgPCAwIHx8IHQgPiAxKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLy8gYmFzZWQgb24gaHR0cDovL2ZpbGVhZG1pbi5jcy5sdGguc2UvY3MvUGVyc29uYWwvVG9tYXNfQWtlbmluZS1Nb2xsZXIvcmF5dHJpL1xyXG4vKipcclxuICogISNlbiByYXktdHJpYW5nbGUgaW50ZXJzZWN0PGJyLz5cclxuICogISN6aCDlsITnur/kuI7kuInop5LlvaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIHJheV90cmlhbmdsZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5SYXl9IHJheVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gdHJpYW5nbGVcclxuICogQHBhcmFtIHtib29sZWFufSBkb3VibGVTaWRlZFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcclxuICovXHJcbmNvbnN0IHJheV90cmlhbmdsZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhYiA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgY29uc3QgYWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IHB2ZWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IHR2ZWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IHF2ZWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheTogcmF5LCB0cmlhbmdsZTogdHJpYW5nbGUsIGRvdWJsZVNpZGVkPzogYm9vbGVhbikge1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWIsIHRyaWFuZ2xlLmIsIHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWMsIHRyaWFuZ2xlLmMsIHRyaWFuZ2xlLmEpO1xyXG5cclxuICAgICAgICBWZWMzLmNyb3NzKHB2ZWMsIHJheS5kLCBhYyk7XHJcbiAgICAgICAgY29uc3QgZGV0ID0gVmVjMy5kb3QoYWIsIHB2ZWMpO1xyXG4gICAgICAgIGlmIChkZXQgPCBOdW1iZXIuRVBTSUxPTiAmJiAoIWRvdWJsZVNpZGVkIHx8IGRldCA+IC1OdW1iZXIuRVBTSUxPTikpIHsgcmV0dXJuIDA7IH1cclxuXHJcbiAgICAgICAgY29uc3QgaW52X2RldCA9IDEgLyBkZXQ7XHJcblxyXG4gICAgICAgIFZlYzMuc3VidHJhY3QodHZlYywgcmF5Lm8sIHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIGNvbnN0IHUgPSBWZWMzLmRvdCh0dmVjLCBwdmVjKSAqIGludl9kZXQ7XHJcbiAgICAgICAgaWYgKHUgPCAwIHx8IHUgPiAxKSB7IHJldHVybiAwOyB9XHJcblxyXG4gICAgICAgIFZlYzMuY3Jvc3MocXZlYywgdHZlYywgYWIpO1xyXG4gICAgICAgIGNvbnN0IHYgPSBWZWMzLmRvdChyYXkuZCwgcXZlYykgKiBpbnZfZGV0O1xyXG4gICAgICAgIGlmICh2IDwgMCB8fCB1ICsgdiA+IDEpIHsgcmV0dXJuIDA7IH1cclxuXHJcbiAgICAgICAgY29uc3QgdCA9IFZlYzMuZG90KGFjLCBxdmVjKSAqIGludl9kZXQ7XHJcbiAgICAgICAgcmV0dXJuIHQgPCAwID8gMCA6IHQ7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLy8gYWRhcHQgdG8gb2xkIGFwaVxyXG5jb25zdCByYXlUcmlhbmdsZSA9IHJheV90cmlhbmdsZTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIGxpbmUtdHJpYW5nbGUgaW50ZXJzZWN0PGJyLz5cclxuICogISN6aCDnur/mrrXkuI7kuInop5LlvaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGxpbmVfdHJpYW5nbGVcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuTGluZX0gbGluZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gdHJpYW5nbGVcclxuICogQHBhcmFtIHtWZWMzfSBvdXRQdCBvcHRpb25hbCwgVGhlIGludGVyc2VjdGlvbiBwb2ludFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcclxuICovXHJcbmNvbnN0IGxpbmVfdHJpYW5nbGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYWIgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IGFjID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICBjb25zdCBxcCA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgY29uc3QgYXAgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IG4gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IGUgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGxpbmU6IGxpbmUsIHRyaWFuZ2xlOiB0cmlhbmdsZSwgb3V0UHQ6IFZlYzMpOiBudW1iZXIge1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWIsIHRyaWFuZ2xlLmIsIHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWMsIHRyaWFuZ2xlLmMsIHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QocXAsIGxpbmUucywgbGluZS5lKTtcclxuXHJcbiAgICAgICAgVmVjMy5jcm9zcyhuLCBhYiwgYWMpO1xyXG4gICAgICAgIGNvbnN0IGRldCA9IFZlYzMuZG90KHFwLCBuKTtcclxuXHJcbiAgICAgICAgaWYgKGRldCA8PSAwLjApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBWZWMzLnN1YnRyYWN0KGFwLCBsaW5lLnMsIHRyaWFuZ2xlLmEpO1xyXG4gICAgICAgIGNvbnN0IHQgPSBWZWMzLmRvdChhcCwgbik7XHJcbiAgICAgICAgaWYgKHQgPCAwIHx8IHQgPiBkZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBWZWMzLmNyb3NzKGUsIHFwLCBhcCk7XHJcbiAgICAgICAgbGV0IHYgPSBWZWMzLmRvdChhYywgZSk7XHJcbiAgICAgICAgaWYgKHYgPCAwIHx8IHYgPiBkZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdyA9IC1WZWMzLmRvdChhYiwgZSk7XHJcbiAgICAgICAgaWYgKHcgPCAwLjAgfHwgdiArIHcgPiBkZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3V0UHQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW52RGV0ID0gMS4wIC8gZGV0O1xyXG4gICAgICAgICAgICB2ICo9IGludkRldDtcclxuICAgICAgICAgICAgdyAqPSBpbnZEZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHUgPSAxLjAgLSB2IC0gdztcclxuXHJcbiAgICAgICAgICAgIC8vIG91dFB0ID0gdSphICsgdipkICsgdypjO1xyXG4gICAgICAgICAgICBWZWMzLnNldChvdXRQdCxcclxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmEueCAqIHUgKyB0cmlhbmdsZS5iLnggKiB2ICsgdHJpYW5nbGUuYy54ICogdyxcclxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmEueSAqIHUgKyB0cmlhbmdsZS5iLnkgKiB2ICsgdHJpYW5nbGUuYy55ICogdyxcclxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmEueiAqIHUgKyB0cmlhbmdsZS5iLnogKiB2ICsgdHJpYW5nbGUuYy56ICogdyxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIGxpbmUtcXVhZCBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOe6v+auteS4juWbm+i+ueW9oueahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2QgbGluZV9xdWFkXHJcbiAqIEBwYXJhbSB7VmVjM30gcCBBIHBvaW50IG9uIGEgbGluZSBzZWdtZW50XHJcbiAqIEBwYXJhbSB7VmVjM30gcSBBbm90aGVyIHBvaW50IG9uIHRoZSBsaW5lIHNlZ21lbnRcclxuICogQHBhcmFtIHtWZWMzfSBhIFF1YWRyaWxhdGVyYWwgcG9pbnQgYVxyXG4gKiBAcGFyYW0ge1ZlYzN9IGIgUXVhZHJpbGF0ZXJhbCBwb2ludCBiXHJcbiAqIEBwYXJhbSB7VmVjM30gYyBRdWFkcmlsYXRlcmFsIHBvaW50IGNcclxuICogQHBhcmFtIHtWZWMzfSBkIFF1YWRyaWxhdGVyYWwgcG9pbnQgZFxyXG4gKiBAcGFyYW0ge1ZlYzN9IG91dFB0IG9wdGlvbmFsLCBUaGUgaW50ZXJzZWN0aW9uIHBvaW50XHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgbGluZV9xdWFkID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHBxID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICBjb25zdCBwYSA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgY29uc3QgcGIgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIGNvbnN0IHBjID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICBjb25zdCBwZCA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgY29uc3QgbSA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgY29uc3QgdG1wID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwOiBWZWMzLCBxOiBWZWMzLCBhOiBWZWMzLCBiOiBWZWMzLCBjOiBWZWMzLCBkOiBWZWMzLCBvdXRQdDogVmVjMyk6IG51bWJlciB7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwcSwgcSwgcCk7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwYSwgYSwgcCk7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwYiwgYiwgcCk7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwYywgYywgcCk7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB3aGljaCB0cmlhbmdsZSB0byB0ZXN0IGFnYWluc3QgYnkgdGVzdGluZyBhZ2FpbnN0IGRpYWdvbmFsIGZpcnN0XHJcbiAgICAgICAgVmVjMy5jcm9zcyhtLCBwYywgcHEpO1xyXG4gICAgICAgIGxldCB2ID0gVmVjMy5kb3QocGEsIG0pO1xyXG5cclxuICAgICAgICBpZiAodiA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIFRlc3QgaW50ZXJzZWN0aW9uIGFnYWluc3QgdHJpYW5nbGUgYWJjXHJcbiAgICAgICAgICAgIGxldCB1ID0gLVZlYzMuZG90KHBiLCBtKTtcclxuICAgICAgICAgICAgaWYgKHUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHcgPSBWZWMzLmRvdChWZWMzLmNyb3NzKHRtcCwgcHEsIHBiKSwgcGEpO1xyXG4gICAgICAgICAgICBpZiAodyA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBvdXRQdCA9IHUqYSArIHYqYiArIHcqYztcclxuICAgICAgICAgICAgaWYgKG91dFB0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZW5vbSA9IDEuMCAvICh1ICsgdiArIHcpO1xyXG4gICAgICAgICAgICAgICAgdSAqPSBkZW5vbTtcclxuICAgICAgICAgICAgICAgIHYgKj0gZGVub207XHJcbiAgICAgICAgICAgICAgICB3ICo9IGRlbm9tO1xyXG5cclxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KG91dFB0LFxyXG4gICAgICAgICAgICAgICAgICAgIGEueCAqIHUgKyBiLnggKiB2ICsgYy54ICogdyxcclxuICAgICAgICAgICAgICAgICAgICBhLnkgKiB1ICsgYi55ICogdiArIGMueSAqIHcsXHJcbiAgICAgICAgICAgICAgICAgICAgYS56ICogdSArIGIueiAqIHYgKyBjLnogKiB3LFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRlc3QgaW50ZXJzZWN0aW9uIGFnYWluc3QgdHJpYW5nbGUgZGFjXHJcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QocGQsIGQsIHApO1xyXG5cclxuICAgICAgICAgICAgbGV0IHUgPSBWZWMzLmRvdChwZCwgbSk7XHJcbiAgICAgICAgICAgIGlmICh1IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB3ID0gVmVjMy5kb3QoVmVjMy5jcm9zcyh0bXAsIHBxLCBwYSksIHBkKTtcclxuICAgICAgICAgICAgaWYgKHcgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gb3V0UHQgPSB1KmEgKyB2KmQgKyB3KmM7XHJcbiAgICAgICAgICAgIGlmIChvdXRQdCkge1xyXG4gICAgICAgICAgICAgICAgdiA9IC12O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbm9tID0gMS4wIC8gKHUgKyB2ICsgdyk7XHJcbiAgICAgICAgICAgICAgICB1ICo9IGRlbm9tO1xyXG4gICAgICAgICAgICAgICAgdiAqPSBkZW5vbTtcclxuICAgICAgICAgICAgICAgIHcgKj0gZGVub207XHJcblxyXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQob3V0UHQsXHJcbiAgICAgICAgICAgICAgICAgICAgYS54ICogdSArIGQueCAqIHYgKyBjLnggKiB3LFxyXG4gICAgICAgICAgICAgICAgICAgIGEueSAqIHUgKyBkLnkgKiB2ICsgYy55ICogdyxcclxuICAgICAgICAgICAgICAgICAgICBhLnogKiB1ICsgZC56ICogdiArIGMueiAqIHcsXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogISNlbiByYXktc3BoZXJlIGludGVyc2VjdDxici8+XHJcbiAqICEjemgg5bCE57q/5ZKM55CD55qE55u45Lqk5oCn5qOA5rWL44CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCByYXlfc3BoZXJlXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgcmF5X3NwaGVyZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBlID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheTogcmF5LCBzcGhlcmU6IHNwaGVyZSk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgciA9IHNwaGVyZS5yYWRpdXM7XHJcbiAgICAgICAgY29uc3QgYyA9IHNwaGVyZS5jZW50ZXI7XHJcbiAgICAgICAgY29uc3QgbyA9IHJheS5vO1xyXG4gICAgICAgIGNvbnN0IGQgPSByYXkuZDtcclxuICAgICAgICBjb25zdCByU3EgPSByICogcjtcclxuICAgICAgICBWZWMzLnN1YnRyYWN0KGUsIGMsIG8pO1xyXG4gICAgICAgIGNvbnN0IGVTcSA9IGUubGVuZ3RoU3FyKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGFMZW5ndGggPSBWZWMzLmRvdChlLCBkKTsgLy8gYXNzdW1lIHJheSBkaXJlY3Rpb24gYWxyZWFkeSBub3JtYWxpemVkXHJcbiAgICAgICAgY29uc3QgZlNxID0gclNxIC0gKGVTcSAtIGFMZW5ndGggKiBhTGVuZ3RoKTtcclxuICAgICAgICBpZiAoZlNxIDwgMCkgeyByZXR1cm4gMDsgfVxyXG5cclxuICAgICAgICBjb25zdCBmID0gTWF0aC5zcXJ0KGZTcSk7XHJcbiAgICAgICAgY29uc3QgdCA9IGVTcSA8IHJTcSA/IGFMZW5ndGggKyBmIDogYUxlbmd0aCAtIGY7XHJcbiAgICAgICAgaWYgKHQgPCAwKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gcmF5LWFhYmIgaW50ZXJzZWN0PGJyLz5cclxuICogISN6aCDlsITnur/lkozovbTlr7npvZDljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIHJheV9hYWJiXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IGFhYmIgQWxpZ24gdGhlIGF4aXMgYXJvdW5kIHRoZSBib3hcclxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG5vdCAwXHJcbiAqL1xyXG5jb25zdCByYXlfYWFiYiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBtaW4gPSBuZXcgVmVjMygpO1xyXG4gICAgY29uc3QgbWF4ID0gbmV3IFZlYzMoKTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAocmF5OiByYXksIGFhYmI6IGFhYmIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IG8gPSByYXkubywgZCA9IHJheS5kO1xyXG4gICAgICAgIGNvbnN0IGl4ID0gMSAvIGQueCwgaXkgPSAxIC8gZC55LCBpeiA9IDEgLyBkLno7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChtaW4sIGFhYmIuY2VudGVyLCBhYWJiLmhhbGZFeHRlbnRzKTtcclxuICAgICAgICBWZWMzLmFkZChtYXgsIGFhYmIuY2VudGVyLCBhYWJiLmhhbGZFeHRlbnRzKTtcclxuICAgICAgICBjb25zdCB0MSA9IChtaW4ueCAtIG8ueCkgKiBpeDtcclxuICAgICAgICBjb25zdCB0MiA9IChtYXgueCAtIG8ueCkgKiBpeDtcclxuICAgICAgICBjb25zdCB0MyA9IChtaW4ueSAtIG8ueSkgKiBpeTtcclxuICAgICAgICBjb25zdCB0NCA9IChtYXgueSAtIG8ueSkgKiBpeTtcclxuICAgICAgICBjb25zdCB0NSA9IChtaW4ueiAtIG8ueikgKiBpejtcclxuICAgICAgICBjb25zdCB0NiA9IChtYXgueiAtIG8ueikgKiBpejtcclxuICAgICAgICBjb25zdCB0bWluID0gTWF0aC5tYXgoTWF0aC5tYXgoTWF0aC5taW4odDEsIHQyKSwgTWF0aC5taW4odDMsIHQ0KSksIE1hdGgubWluKHQ1LCB0NikpO1xyXG4gICAgICAgIGNvbnN0IHRtYXggPSBNYXRoLm1pbihNYXRoLm1pbihNYXRoLm1heCh0MSwgdDIpLCBNYXRoLm1heCh0MywgdDQpKSwgTWF0aC5tYXgodDUsIHQ2KSk7XHJcbiAgICAgICAgaWYgKHRtYXggPCAwIHx8IHRtaW4gPiB0bWF4KSB7IHJldHVybiAwIH07XHJcbiAgICAgICAgcmV0dXJuIHRtaW47XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLy8gYWRhcHQgdG8gb2xkIGFwaVxyXG5jb25zdCByYXlBYWJiID0gcmF5X2FhYmI7XHJcblxyXG4vKipcclxuICogISNlbiByYXktb2JiIGludGVyc2VjdDxici8+XHJcbiAqICEjemgg5bCE57q/5ZKM5pa55ZCR5YyF5Zu055uS55qE55u45Lqk5oCn5qOA5rWL44CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCByYXlfb2JiXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcclxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG9yIDBcclxuICovXHJcbmNvbnN0IHJheV9vYmIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGNlbnRlciA9IG5ldyBWZWMzKCk7XHJcbiAgICBsZXQgbyA9IG5ldyBWZWMzKCk7XHJcbiAgICBsZXQgZCA9IG5ldyBWZWMzKCk7XHJcbiAgICBjb25zdCBYID0gbmV3IFZlYzMoKTtcclxuICAgIGNvbnN0IFkgPSBuZXcgVmVjMygpO1xyXG4gICAgY29uc3QgWiA9IG5ldyBWZWMzKCk7XHJcbiAgICBjb25zdCBwID0gbmV3IFZlYzMoKTtcclxuICAgIGNvbnN0IHNpemUgPSBuZXcgQXJyYXkoMyk7XHJcbiAgICBjb25zdCBmID0gbmV3IEFycmF5KDMpO1xyXG4gICAgY29uc3QgZSA9IG5ldyBBcnJheSgzKTtcclxuICAgIGNvbnN0IHQgPSBuZXcgQXJyYXkoNik7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyYXk6IHJheSwgb2JiOiBvYmIpOiBudW1iZXIge1xyXG4gICAgICAgIHNpemVbMF0gPSBvYmIuaGFsZkV4dGVudHMueDtcclxuICAgICAgICBzaXplWzFdID0gb2JiLmhhbGZFeHRlbnRzLnk7XHJcbiAgICAgICAgc2l6ZVsyXSA9IG9iYi5oYWxmRXh0ZW50cy56O1xyXG4gICAgICAgIGNlbnRlciA9IG9iYi5jZW50ZXI7XHJcbiAgICAgICAgbyA9IHJheS5vO1xyXG4gICAgICAgIGQgPSByYXkuZDtcclxuXHJcbiAgICAgICAgbGV0IG9iYm0gPSBvYmIub3JpZW50YXRpb24ubTtcclxuXHJcbiAgICAgICAgVmVjMy5zZXQoWCwgb2JibVswXSwgb2JibVsxXSwgb2JibVsyXSk7XHJcbiAgICAgICAgVmVjMy5zZXQoWSwgb2JibVszXSwgb2JibVs0XSwgb2JibVs1XSk7XHJcbiAgICAgICAgVmVjMy5zZXQoWiwgb2JibVs2XSwgb2JibVs3XSwgb2JibVs4XSk7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwLCBjZW50ZXIsIG8pO1xyXG5cclxuICAgICAgICAvLyBUaGUgY29zIHZhbHVlcyBvZiB0aGUgcmF5IG9uIHRoZSBYLCBZLCBaXHJcbiAgICAgICAgZlswXSA9IFZlYzMuZG90KFgsIGQpO1xyXG4gICAgICAgIGZbMV0gPSBWZWMzLmRvdChZLCBkKTtcclxuICAgICAgICBmWzJdID0gVmVjMy5kb3QoWiwgZCk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBwcm9qZWN0aW9uIGxlbmd0aCBvZiBQIG9uIFgsIFksIFpcclxuICAgICAgICBlWzBdID0gVmVjMy5kb3QoWCwgcCk7XHJcbiAgICAgICAgZVsxXSA9IFZlYzMuZG90KFksIHApO1xyXG4gICAgICAgIGVbMl0gPSBWZWMzLmRvdChaLCBwKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGZbaV0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICgtZVtpXSAtIHNpemVbaV0gPiAwIHx8IC1lW2ldICsgc2l6ZVtpXSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEF2b2lkIGRpdiBieSAwIVxyXG4gICAgICAgICAgICAgICAgZltpXSA9IDAuMDAwMDAwMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBtaW5cclxuICAgICAgICAgICAgdFtpICogMiArIDBdID0gKGVbaV0gKyBzaXplW2ldKSAvIGZbaV07XHJcbiAgICAgICAgICAgIC8vIG1heFxyXG4gICAgICAgICAgICB0W2kgKiAyICsgMV0gPSAoZVtpXSAtIHNpemVbaV0pIC8gZltpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdG1pbiA9IE1hdGgubWF4KFxyXG4gICAgICAgICAgICBNYXRoLm1heChcclxuICAgICAgICAgICAgICAgIE1hdGgubWluKHRbMF0sIHRbMV0pLFxyXG4gICAgICAgICAgICAgICAgTWF0aC5taW4odFsyXSwgdFszXSkpLFxyXG4gICAgICAgICAgICBNYXRoLm1pbih0WzRdLCB0WzVdKSxcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IHRtYXggPSBNYXRoLm1pbihcclxuICAgICAgICAgICAgTWF0aC5taW4oXHJcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0WzBdLCB0WzFdKSxcclxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHRbMl0sIHRbM10pKSxcclxuICAgICAgICAgICAgTWF0aC5tYXgodFs0XSwgdFs1XSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAodG1heCA8IDAgfHwgdG1pbiA+IHRtYXggfHwgdG1pbiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdG1pbjtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogISNlbiBhYWJiLWFhYmIgaW50ZXJzZWN0PGJyLz5cclxuICogISN6aCDovbTlr7npvZDljIXlm7Tnm5LlkozovbTlr7npvZDljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGFhYmJfYWFiYlxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiMSBBeGlzIGFsaWdubWVudCBzdXJyb3VuZHMgYm94IDFcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYjIgQXhpcyBhbGlnbm1lbnQgc3Vycm91bmRzIGJveCAyXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgYWFiYl9hYWJiID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFNaW4gPSBuZXcgVmVjMygpO1xyXG4gICAgY29uc3QgYU1heCA9IG5ldyBWZWMzKCk7XHJcbiAgICBjb25zdCBiTWluID0gbmV3IFZlYzMoKTtcclxuICAgIGNvbnN0IGJNYXggPSBuZXcgVmVjMygpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhYWJiMTogYWFiYiwgYWFiYjI6IGFhYmIpIHtcclxuICAgICAgICBWZWMzLnN1YnRyYWN0KGFNaW4sIGFhYmIxLmNlbnRlciwgYWFiYjEuaGFsZkV4dGVudHMpO1xyXG4gICAgICAgIFZlYzMuYWRkKGFNYXgsIGFhYmIxLmNlbnRlciwgYWFiYjEuaGFsZkV4dGVudHMpO1xyXG4gICAgICAgIFZlYzMuc3VidHJhY3QoYk1pbiwgYWFiYjIuY2VudGVyLCBhYWJiMi5oYWxmRXh0ZW50cyk7XHJcbiAgICAgICAgVmVjMy5hZGQoYk1heCwgYWFiYjIuY2VudGVyLCBhYWJiMi5oYWxmRXh0ZW50cyk7XHJcbiAgICAgICAgcmV0dXJuIChhTWluLnggPD0gYk1heC54ICYmIGFNYXgueCA+PSBiTWluLngpICYmXHJcbiAgICAgICAgICAgIChhTWluLnkgPD0gYk1heC55ICYmIGFNYXgueSA+PSBiTWluLnkpICYmXHJcbiAgICAgICAgICAgIChhTWluLnogPD0gYk1heC56ICYmIGFNYXgueiA+PSBiTWluLnopO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGdldEFBQkJWZXJ0aWNlcyAobWluOiBWZWMzLCBtYXg6IFZlYzMsIG91dDogVmVjM1tdKSB7XHJcbiAgICBWZWMzLnNldChvdXRbMF0sIG1pbi54LCBtYXgueSwgbWF4LnopO1xyXG4gICAgVmVjMy5zZXQob3V0WzFdLCBtaW4ueCwgbWF4LnksIG1pbi56KTtcclxuICAgIFZlYzMuc2V0KG91dFsyXSwgbWluLngsIG1pbi55LCBtYXgueik7XHJcbiAgICBWZWMzLnNldChvdXRbM10sIG1pbi54LCBtaW4ueSwgbWluLnopO1xyXG4gICAgVmVjMy5zZXQob3V0WzRdLCBtYXgueCwgbWF4LnksIG1heC56KTtcclxuICAgIFZlYzMuc2V0KG91dFs1XSwgbWF4LngsIG1heC55LCBtaW4ueik7XHJcbiAgICBWZWMzLnNldChvdXRbNl0sIG1heC54LCBtaW4ueSwgbWF4LnopO1xyXG4gICAgVmVjMy5zZXQob3V0WzddLCBtYXgueCwgbWluLnksIG1pbi56KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0T0JCVmVydGljZXMgKGM6IFZlYzMsIGU6IFZlYzMsIGExOiBWZWMzLCBhMjogVmVjMywgYTM6IFZlYzMsIG91dDogVmVjM1tdKSB7XHJcbiAgICBWZWMzLnNldChvdXRbMF0sXHJcbiAgICAgICAgYy54ICsgYTEueCAqIGUueCArIGEyLnggKiBlLnkgKyBhMy54ICogZS56LFxyXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggKyBhMi55ICogZS55ICsgYTMueSAqIGUueixcclxuICAgICAgICBjLnogKyBhMS56ICogZS54ICsgYTIueiAqIGUueSArIGEzLnogKiBlLnosXHJcbiAgICApO1xyXG4gICAgVmVjMy5zZXQob3V0WzFdLFxyXG4gICAgICAgIGMueCAtIGExLnggKiBlLnggKyBhMi54ICogZS55ICsgYTMueCAqIGUueixcclxuICAgICAgICBjLnkgLSBhMS55ICogZS54ICsgYTIueSAqIGUueSArIGEzLnkgKiBlLnosXHJcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCArIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxyXG4gICAgKTtcclxuICAgIFZlYzMuc2V0KG91dFsyXSxcclxuICAgICAgICBjLnggKyBhMS54ICogZS54IC0gYTIueCAqIGUueSArIGEzLnggKiBlLnosXHJcbiAgICAgICAgYy55ICsgYTEueSAqIGUueCAtIGEyLnkgKiBlLnkgKyBhMy55ICogZS56LFxyXG4gICAgICAgIGMueiArIGExLnogKiBlLnggLSBhMi56ICogZS55ICsgYTMueiAqIGUueixcclxuICAgICk7XHJcbiAgICBWZWMzLnNldChvdXRbM10sXHJcbiAgICAgICAgYy54ICsgYTEueCAqIGUueCArIGEyLnggKiBlLnkgLSBhMy54ICogZS56LFxyXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggKyBhMi55ICogZS55IC0gYTMueSAqIGUueixcclxuICAgICAgICBjLnogKyBhMS56ICogZS54ICsgYTIueiAqIGUueSAtIGEzLnogKiBlLnosXHJcbiAgICApO1xyXG4gICAgVmVjMy5zZXQob3V0WzRdLFxyXG4gICAgICAgIGMueCAtIGExLnggKiBlLnggLSBhMi54ICogZS55IC0gYTMueCAqIGUueixcclxuICAgICAgICBjLnkgLSBhMS55ICogZS54IC0gYTIueSAqIGUueSAtIGEzLnkgKiBlLnosXHJcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCAtIGEyLnogKiBlLnkgLSBhMy56ICogZS56LFxyXG4gICAgKTtcclxuICAgIFZlYzMuc2V0KG91dFs1XSxcclxuICAgICAgICBjLnggKyBhMS54ICogZS54IC0gYTIueCAqIGUueSAtIGEzLnggKiBlLnosXHJcbiAgICAgICAgYy55ICsgYTEueSAqIGUueCAtIGEyLnkgKiBlLnkgLSBhMy55ICogZS56LFxyXG4gICAgICAgIGMueiArIGExLnogKiBlLnggLSBhMi56ICogZS55IC0gYTMueiAqIGUueixcclxuICAgICk7XHJcbiAgICBWZWMzLnNldChvdXRbNl0sXHJcbiAgICAgICAgYy54IC0gYTEueCAqIGUueCArIGEyLnggKiBlLnkgLSBhMy54ICogZS56LFxyXG4gICAgICAgIGMueSAtIGExLnkgKiBlLnggKyBhMi55ICogZS55IC0gYTMueSAqIGUueixcclxuICAgICAgICBjLnogLSBhMS56ICogZS54ICsgYTIueiAqIGUueSAtIGEzLnogKiBlLnosXHJcbiAgICApO1xyXG4gICAgVmVjMy5zZXQob3V0WzddLFxyXG4gICAgICAgIGMueCAtIGExLnggKiBlLnggLSBhMi54ICogZS55ICsgYTMueCAqIGUueixcclxuICAgICAgICBjLnkgLSBhMS55ICogZS54IC0gYTIueSAqIGUueSArIGEzLnkgKiBlLnosXHJcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCAtIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SW50ZXJ2YWwgKHZlcnRpY2VzOiBhbnlbXSB8IFZlYzNbXSwgYXhpczogVmVjMykge1xyXG4gICAgbGV0IG1pbiA9IFZlYzMuZG90KGF4aXMsIHZlcnRpY2VzWzBdKSwgbWF4ID0gbWluO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA4OyArK2kpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0aW9uID0gVmVjMy5kb3QoYXhpcywgdmVydGljZXNbaV0pO1xyXG4gICAgICAgIG1pbiA9IChwcm9qZWN0aW9uIDwgbWluKSA/IHByb2plY3Rpb24gOiBtaW47XHJcbiAgICAgICAgbWF4ID0gKHByb2plY3Rpb24gPiBtYXgpID8gcHJvamVjdGlvbiA6IG1heDtcclxuICAgIH1cclxuICAgIHJldHVybiBbbWluLCBtYXhdO1xyXG59XHJcblxyXG4vKipcclxuICogISNlbiBhYWJiLW9iYiBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOi9tOWvuem9kOWMheWbtOebkuWSjOaWueWQkeWMheWbtOebkueahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2QgYWFiYl9vYmJcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYiBBbGlnbiB0aGUgYXhpcyBhcm91bmQgdGhlIGJveFxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5PYmJ9IG9iYiBEaXJlY3Rpb24gYm94XHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgYWFiYl9vYmIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgdGVzdCA9IG5ldyBBcnJheSgxNSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICB0ZXN0W2ldID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBBcnJheSg4KTtcclxuICAgIGNvbnN0IHZlcnRpY2VzMiA9IG5ldyBBcnJheSg4KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgdmVydGljZXNbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB2ZXJ0aWNlczJbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1pbiA9IG5ldyBWZWMzKCk7XHJcbiAgICBjb25zdCBtYXggPSBuZXcgVmVjMygpO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhYWJiOiBhYWJiLCBvYmI6IG9iYik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9iYm0gPSBvYmIub3JpZW50YXRpb24ubTtcclxuXHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFswXSwgMSwgMCwgMCk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFsxXSwgMCwgMSwgMCk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFsyXSwgMCwgMCwgMSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFszXSwgb2JibVswXSwgb2JibVsxXSwgb2JibVsyXSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFs0XSwgb2JibVszXSwgb2JibVs0XSwgb2JibVs1XSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFs1XSwgb2JibVs2XSwgb2JibVs3XSwgb2JibVs4XSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7IC8vIEZpbGwgb3V0IHJlc3Qgb2YgYXhpc1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMF0sIHRlc3RbaV0sIHRlc3RbMF0pO1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMV0pO1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChtaW4sIGFhYmIuY2VudGVyLCBhYWJiLmhhbGZFeHRlbnRzKTtcclxuICAgICAgICBWZWMzLmFkZChtYXgsIGFhYmIuY2VudGVyLCBhYWJiLmhhbGZFeHRlbnRzKTtcclxuICAgICAgICBnZXRBQUJCVmVydGljZXMobWluLCBtYXgsIHZlcnRpY2VzKTtcclxuICAgICAgICBnZXRPQkJWZXJ0aWNlcyhvYmIuY2VudGVyLCBvYmIuaGFsZkV4dGVudHMsIHRlc3RbM10sIHRlc3RbNF0sIHRlc3RbNV0sIHZlcnRpY2VzMik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTU7ICsraikge1xyXG4gICAgICAgICAgICBjb25zdCBhID0gZ2V0SW50ZXJ2YWwodmVydGljZXMsIHRlc3Rbal0pO1xyXG4gICAgICAgICAgICBjb25zdCBiID0gZ2V0SW50ZXJ2YWwodmVydGljZXMyLCB0ZXN0W2pdKTtcclxuICAgICAgICAgICAgaWYgKGJbMF0gPiBhWzFdIHx8IGFbMF0gPiBiWzFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDsgLy8gU2VwZXJhdGluZyBheGlzIGZvdW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIGFhYmItcGxhbmUgaW50ZXJzZWN0PGJyLz5cclxuICogISN6aCDovbTlr7npvZDljIXlm7Tnm5LlkozlubPpnaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGFhYmJfcGxhbmVcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYiBBbGlnbiB0aGUgYXhpcyBhcm91bmQgdGhlIGJveFxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcclxuICogQHJldHVybiB7bnVtYmVyfSBpbnNpZGUoYmFjaykgPSAtMSwgb3V0c2lkZShmcm9udCkgPSAwLCBpbnRlcnNlY3QgPSAxXHJcbiAqL1xyXG5jb25zdCBhYWJiX3BsYW5lID0gZnVuY3Rpb24gKGFhYmI6IGFhYmIsIHBsYW5lOiBwbGFuZSk6IG51bWJlciB7XHJcbiAgICBjb25zdCByID0gYWFiYi5oYWxmRXh0ZW50cy54ICogTWF0aC5hYnMocGxhbmUubi54KSArXHJcbiAgICAgICAgYWFiYi5oYWxmRXh0ZW50cy55ICogTWF0aC5hYnMocGxhbmUubi55KSArXHJcbiAgICAgICAgYWFiYi5oYWxmRXh0ZW50cy56ICogTWF0aC5hYnMocGxhbmUubi56KTtcclxuICAgIGNvbnN0IGRvdCA9IFZlYzMuZG90KHBsYW5lLm4sIGFhYmIuY2VudGVyKTtcclxuICAgIGlmIChkb3QgKyByIDwgcGxhbmUuZCkgeyByZXR1cm4gLTE7IH1cclxuICAgIGVsc2UgaWYgKGRvdCAtIHIgPiBwbGFuZS5kKSB7IHJldHVybiAwOyB9XHJcbiAgICByZXR1cm4gMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIGFhYmItZnJ1c3R1bSBpbnRlcnNlY3QsIGZhc3RlciBidXQgaGFzIGZhbHNlIHBvc2l0aXZlIGNvcm5lciBjYXNlczxici8+XHJcbiAqICEjemgg6L205a+56b2Q5YyF5Zu055uS5ZKM6ZSl5Y+w55u45Lqk5oCn5qOA5rWL77yM6YCf5bqm5b+r77yM5L2G5pyJ6ZSZ6K+v5oOF5Ya144CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCBhYWJiX2ZydXN0dW1cclxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYiBBbGlnbiB0aGUgYXhpcyBhcm91bmQgdGhlIGJveFxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5GcnVzdHVtfSBmcnVzdHVtXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3QgYWFiYl9mcnVzdHVtID0gZnVuY3Rpb24gKGFhYmI6IGFhYmIsIGZydXN0dW06IGZydXN0dW0pOiBudW1iZXIge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnBsYW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXHJcbiAgICAgICAgaWYgKGFhYmJfcGxhbmUoYWFiYiwgZnJ1c3R1bS5wbGFuZXNbaV0pID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGNvbXBsZXRlbHkgb3V0c2lkZVxyXG4gICAgcmV0dXJuIDE7XHJcbn07XHJcblxyXG4vLyBodHRwczovL2Nlc2l1bS5jb20vYmxvZy8yMDE3LzAyLzAyL3RpZ2h0ZXItZnJ1c3R1bS1jdWxsaW5nLWFuZC13aHkteW91LW1heS13YW50LXRvLWRpc3JlZ2FyZC1pdC9cclxuLyoqXHJcbiAqICEjZW4gYWFiYi1mcnVzdHVtIGludGVyc2VjdCwgaGFuZGxlcyBtb3N0IG9mIHRoZSBmYWxzZSBwb3NpdGl2ZXMgY29ycmVjdGx5PGJyLz5cclxuICogISN6aCDovbTlr7npvZDljIXlm7Tnm5LlkozplKXlj7Dnm7jkuqTmgKfmo4DmtYvvvIzmraPnoa7lpITnkIblpKflpJrmlbDplJnor6/mg4XlhrXjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGFhYmJfZnJ1c3R1bV9hY2N1cmF0ZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiIEFsaWduIHRoZSBheGlzIGFyb3VuZCB0aGUgYm94XHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cclxuICogQHJldHVybiB7bnVtYmVyfVxyXG4gKi9cclxuY29uc3QgYWFiYl9mcnVzdHVtX2FjY3VyYXRlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRtcCA9IG5ldyBBcnJheSg4KTtcclxuICAgIGxldCBvdXQxID0gMCwgb3V0MiA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRtcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRtcFtpXSA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhYWJiOiBhYWJiLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gMCwgaW50ZXJzZWN0cyA9IGZhbHNlO1xyXG4gICAgICAgIC8vIDEuIGFhYmIgaW5zaWRlL291dHNpZGUgZnJ1c3R1bSB0ZXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnBsYW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBhYWJiX3BsYW5lKGFhYmIsIGZydXN0dW0ucGxhbmVzW2ldKTtcclxuICAgICAgICAgICAgLy8gZnJ1c3R1bSBwbGFuZSBub3JtYWwgcG9pbnRzIHRvIHRoZSBpbnNpZGVcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gLTEpIHsgcmV0dXJuIDA7IH0gLy8gY29tcGxldGVseSBvdXRzaWRlXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gMSkgeyBpbnRlcnNlY3RzID0gdHJ1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIDE7IH0gLy8gY29tcGxldGVseSBpbnNpZGVcclxuICAgICAgICAvLyBpbiBjYXNlIG9mIGZhbHNlIHBvc2l0aXZlc1xyXG4gICAgICAgIC8vIDIuIGZydXN0dW0gaW5zaWRlL291dHNpZGUgYWFiYiB0ZXN0XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QodG1wW2ldLCBmcnVzdHVtLnZlcnRpY2VzW2ldLCBhYWJiLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dDEgPSAwLCBvdXQyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRtcFtpXS54ID4gYWFiYi5oYWxmRXh0ZW50cy54KSB7IG91dDErKzsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueCA8IC1hYWJiLmhhbGZFeHRlbnRzLngpIHsgb3V0MisrOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvdXQxID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCB8fCBvdXQyID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRtcFtpXS55ID4gYWFiYi5oYWxmRXh0ZW50cy55KSB7IG91dDErKzsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueSA8IC1hYWJiLmhhbGZFeHRlbnRzLnkpIHsgb3V0MisrOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvdXQxID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCB8fCBvdXQyID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRtcFtpXS56ID4gYWFiYi5oYWxmRXh0ZW50cy56KSB7IG91dDErKzsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueiA8IC1hYWJiLmhhbGZFeHRlbnRzLnopIHsgb3V0MisrOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvdXQxID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCB8fCBvdXQyID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIG9iYi1wb2ludCBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOaWueWQkeWMheWbtOebkuWSjOeCueeahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgb2JiX3BvaW50XHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuVmVjM30gcG9pbnRcclxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxyXG4gKi9cclxuY29uc3Qgb2JiX3BvaW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRtcCA9IG5ldyBWZWMzKDAsIDAsIDApLCBtMyA9IG5ldyBNYXQzKCk7XHJcbiAgICBjb25zdCBsZXNzVGhhbiA9IGZ1bmN0aW9uIChhOiBWZWMzLCBiOiBWZWMzKTogYm9vbGVhbiB7IHJldHVybiBNYXRoLmFicyhhLngpIDwgYi54ICYmIE1hdGguYWJzKGEueSkgPCBiLnkgJiYgTWF0aC5hYnMoYS56KSA8IGIuejsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAob2JiOiBvYmIsIHBvaW50OiBWZWMzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgVmVjMy5zdWJ0cmFjdCh0bXAsIHBvaW50LCBvYmIuY2VudGVyKTtcclxuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDModG1wLCB0bXAsIE1hdDMudHJhbnNwb3NlKG0zLCBvYmIub3JpZW50YXRpb24pKTtcclxuICAgICAgICByZXR1cm4gbGVzc1RoYW4odG1wLCBvYmIuaGFsZkV4dGVudHMpO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIG9iYi1wbGFuZSBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOaWueWQkeWMheWbtOebkuWSjOW5s+mdoueahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgb2JiX3BsYW5lXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuUGxhbmV9IHBsYW5lXHJcbiAqIEByZXR1cm4ge251bWJlcn0gaW5zaWRlKGJhY2spID0gLTEsIG91dHNpZGUoZnJvbnQpID0gMCwgaW50ZXJzZWN0ID0gMVxyXG4gKi9cclxuY29uc3Qgb2JiX3BsYW5lID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGFic0RvdCA9IGZ1bmN0aW9uIChuOiBWZWMzLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKG4ueCAqIHggKyBuLnkgKiB5ICsgbi56ICogeik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmI6IG9iYiwgcGxhbmU6IHBsYW5lKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgb2JibSA9IG9iYi5vcmllbnRhdGlvbi5tO1xyXG4gICAgICAgIC8vIFJlYWwtVGltZSBDb2xsaXNpb24gRGV0ZWN0aW9uLCBDaHJpc3RlciBFcmljc29uLCBwLiAxNjMuXHJcbiAgICAgICAgY29uc3QgciA9IG9iYi5oYWxmRXh0ZW50cy54ICogYWJzRG90KHBsYW5lLm4sIG9iYm1bMF0sIG9iYm1bMV0sIG9iYm1bMl0pICtcclxuICAgICAgICAgICAgb2JiLmhhbGZFeHRlbnRzLnkgKiBhYnNEb3QocGxhbmUubiwgb2JibVszXSwgb2JibVs0XSwgb2JibVs1XSkgK1xyXG4gICAgICAgICAgICBvYmIuaGFsZkV4dGVudHMueiAqIGFic0RvdChwbGFuZS5uLCBvYmJtWzZdLCBvYmJtWzddLCBvYmJtWzhdKTtcclxuXHJcbiAgICAgICAgY29uc3QgZG90ID0gVmVjMy5kb3QocGxhbmUubiwgb2JiLmNlbnRlcik7XHJcbiAgICAgICAgaWYgKGRvdCArIHIgPCBwbGFuZS5kKSB7IHJldHVybiAtMTsgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRvdCAtIHIgPiBwbGFuZS5kKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gb2JiLWZydXN0dW0gaW50ZXJzZWN0LCBmYXN0ZXIgYnV0IGhhcyBmYWxzZSBwb3NpdGl2ZSBjb3JuZXIgY2FzZXM8YnIvPlxyXG4gKiAhI3poIOaWueWQkeWMheWbtOebkuWSjOmUpeWPsOebuOS6pOaAp+ajgOa1i++8jOmAn+W6puW/q++8jOS9huaciemUmeivr+aDheWGteOAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgb2JiX2ZydXN0dW1cclxuICogQHBhcmFtIHtnZW9tVXRpbHMuT2JifSBvYmIgRGlyZWN0aW9uIGJveFxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5GcnVzdHVtfSBmcnVzdHVtXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3Qgb2JiX2ZydXN0dW0gPSBmdW5jdGlvbiAob2JiOiBvYmIsIGZydXN0dW06IGZydXN0dW0pOiBudW1iZXIge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnBsYW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXHJcbiAgICAgICAgaWYgKG9iYl9wbGFuZShvYmIsIGZydXN0dW0ucGxhbmVzW2ldKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSAvLyBjb21wbGV0ZWx5IG91dHNpZGVcclxuICAgIHJldHVybiAxO1xyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly9jZXNpdW0uY29tL2Jsb2cvMjAxNy8wMi8wMi90aWdodGVyLWZydXN0dW0tY3VsbGluZy1hbmQtd2h5LXlvdS1tYXktd2FudC10by1kaXNyZWdhcmQtaXQvXHJcbi8qKlxyXG4gKiAhI2VuIG9iYi1mcnVzdHVtIGludGVyc2VjdCwgaGFuZGxlcyBtb3N0IG9mIHRoZSBmYWxzZSBwb3NpdGl2ZXMgY29ycmVjdGx5PGJyLz5cclxuICogISN6aCDmlrnlkJHljIXlm7Tnm5LlkozplKXlj7Dnm7jkuqTmgKfmo4DmtYvvvIzmraPnoa7lpITnkIblpKflpJrmlbDplJnor6/mg4XlhrXjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIG9iYl9mcnVzdHVtX2FjY3VyYXRlXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuRnJ1c3R1bX0gZnJ1c3R1bVxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcclxuICovXHJcbmNvbnN0IG9iYl9mcnVzdHVtX2FjY3VyYXRlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHRtcCA9IG5ldyBBcnJheSg4KTtcclxuICAgIGxldCBkaXN0ID0gMCwgb3V0MSA9IDAsIG91dDIgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0bXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0bXBbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGRvdCA9IGZ1bmN0aW9uIChuOiBWZWMzLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gbi54ICogeCArIG4ueSAqIHkgKyBuLnogKiB6O1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAob2JiOiBvYmIsIGZydXN0dW06IGZydXN0dW0pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAwLCBpbnRlcnNlY3RzID0gZmFsc2U7XHJcbiAgICAgICAgLy8gMS4gb2JiIGluc2lkZS9vdXRzaWRlIGZydXN0dW0gdGVzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJ1c3R1bS5wbGFuZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gb2JiX3BsYW5lKG9iYiwgZnJ1c3R1bS5wbGFuZXNbaV0pO1xyXG4gICAgICAgICAgICAvLyBmcnVzdHVtIHBsYW5lIG5vcm1hbCBwb2ludHMgdG8gdGhlIGluc2lkZVxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSAtMSkgeyByZXR1cm4gMDsgfSAvLyBjb21wbGV0ZWx5IG91dHNpZGVcclxuICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0ID09PSAxKSB7IGludGVyc2VjdHMgPSB0cnVlOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW50ZXJzZWN0cykgeyByZXR1cm4gMTsgfSAvLyBjb21wbGV0ZWx5IGluc2lkZVxyXG4gICAgICAgIC8vIGluIGNhc2Ugb2YgZmFsc2UgcG9zaXRpdmVzXHJcbiAgICAgICAgLy8gMi4gZnJ1c3R1bSBpbnNpZGUvb3V0c2lkZSBvYmIgdGVzdFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBWZWMzLnN1YnRyYWN0KHRtcFtpXSwgZnJ1c3R1bS52ZXJ0aWNlc1tpXSwgb2JiLmNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG91dDEgPSAwLCBvdXQyID0gMDtcclxuICAgICAgICBsZXQgb2JibSA9IG9iYi5vcmllbnRhdGlvbi5tO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkaXN0ID0gZG90KHRtcFtpXSwgb2JibVswXSwgb2JibVsxXSwgb2JibVsyXSk7XHJcbiAgICAgICAgICAgIGlmIChkaXN0ID4gb2JiLmhhbGZFeHRlbnRzLngpIHsgb3V0MSsrOyB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpc3QgPCAtb2JiLmhhbGZFeHRlbnRzLngpIHsgb3V0MisrOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvdXQxID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCB8fCBvdXQyID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCkgeyByZXR1cm4gMDsgfVxyXG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGlzdCA9IGRvdCh0bXBbaV0sIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pO1xyXG4gICAgICAgICAgICBpZiAoZGlzdCA+IG9iYi5oYWxmRXh0ZW50cy55KSB7IG91dDErKzsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXN0IDwgLW9iYi5oYWxmRXh0ZW50cy55KSB7IG91dDIrKzsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3V0MSA9PT0gZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGggfHwgb3V0MiA9PT0gZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGgpIHsgcmV0dXJuIDA7IH1cclxuICAgICAgICBvdXQxID0gMDsgb3V0MiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRpc3QgPSBkb3QodG1wW2ldLCBvYmJtWzZdLCBvYmJtWzddLCBvYmJtWzhdKTtcclxuICAgICAgICAgICAgaWYgKGRpc3QgPiBvYmIuaGFsZkV4dGVudHMueikgeyBvdXQxKys7IH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdCA8IC1vYmIuaGFsZkV4dGVudHMueikgeyBvdXQyKys7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG91dDEgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoIHx8IG91dDIgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gb2JiLW9iYiBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOaWueWQkeWMheWbtOebkuWSjOaWueWQkeWMheWbtOebkueahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgb2JiX29iYlxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5PYmJ9IG9iYjEgRGlyZWN0aW9uIGJveDFcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuT2JifSBvYmIyIERpcmVjdGlvbiBib3gyXHJcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxyXG4gKi9cclxuY29uc3Qgb2JiX29iYiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCB0ZXN0ID0gbmV3IEFycmF5KDE1KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkrKykge1xyXG4gICAgICAgIHRlc3RbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBBcnJheSg4KTtcclxuICAgIGNvbnN0IHZlcnRpY2VzMiA9IG5ldyBBcnJheSg4KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgdmVydGljZXNbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB2ZXJ0aWNlczJbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iYjE6IG9iYiwgb2JiMjogb2JiKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IG9iYjFtID0gb2JiMS5vcmllbnRhdGlvbi5tO1xyXG4gICAgICAgIGxldCBvYmIybSA9IG9iYjIub3JpZW50YXRpb24ubTtcclxuXHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFswXSwgb2JiMW1bMF0sIG9iYjFtWzFdLCBvYmIxbVsyXSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFsxXSwgb2JiMW1bM10sIG9iYjFtWzRdLCBvYmIxbVs1XSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFsyXSwgb2JiMW1bNl0sIG9iYjFtWzddLCBvYmIxbVs4XSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFszXSwgb2JiMm1bMF0sIG9iYjJtWzFdLCBvYmIybVsyXSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFs0XSwgb2JiMm1bM10sIG9iYjJtWzRdLCBvYmIybVs1XSk7XHJcbiAgICAgICAgVmVjMy5zZXQodGVzdFs1XSwgb2JiMm1bNl0sIG9iYjJtWzddLCBvYmIybVs4XSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgKytpKSB7IC8vIEZpbGwgb3V0IHJlc3Qgb2YgYXhpc1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMF0sIHRlc3RbaV0sIHRlc3RbMF0pO1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMV0pO1xyXG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0T0JCVmVydGljZXMob2JiMS5jZW50ZXIsIG9iYjEuaGFsZkV4dGVudHMsIHRlc3RbMF0sIHRlc3RbMV0sIHRlc3RbMl0sIHZlcnRpY2VzKTtcclxuICAgICAgICBnZXRPQkJWZXJ0aWNlcyhvYmIyLmNlbnRlciwgb2JiMi5oYWxmRXh0ZW50cywgdGVzdFszXSwgdGVzdFs0XSwgdGVzdFs1XSwgdmVydGljZXMyKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgKytpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGEgPSBnZXRJbnRlcnZhbCh2ZXJ0aWNlcywgdGVzdFtpXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGIgPSBnZXRJbnRlcnZhbCh2ZXJ0aWNlczIsIHRlc3RbaV0pO1xyXG4gICAgICAgICAgICBpZiAoYlswXSA+IGFbMV0gfHwgYVswXSA+IGJbMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwOyAvLyBTZXBlcmF0aW5nIGF4aXMgZm91bmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gcGhlcmUtcGxhbmUgaW50ZXJzZWN0LCBub3QgbmVjZXNzYXJpbHkgZmFzdGVyIHRoYW4gb2JiLXBsYW5lPGJyLz5cclxuICogZHVlIHRvIHRoZSBsZW5ndGggY2FsY3VsYXRpb24gb2YgdGhlIHBsYW5lIG5vcm1hbCB0byBmYWN0b3Igb3V0PGJyLz5cclxuICogdGhlIHVubm9tYWxpemVkIHBsYW5lIGRpc3RhbmNlPGJyLz5cclxuICogISN6aCDnkIPkuI7lubPpnaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIHNwaGVyZV9wbGFuZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcclxuICogQHJldHVybiB7bnVtYmVyfSBpbnNpZGUoYmFjaykgPSAtMSwgb3V0c2lkZShmcm9udCkgPSAwLCBpbnRlcnNlY3QgPSAxXHJcbiAqL1xyXG5jb25zdCBzcGhlcmVfcGxhbmUgPSBmdW5jdGlvbiAoc3BoZXJlOiBzcGhlcmUsIHBsYW5lOiBwbGFuZSk6IG51bWJlciB7XHJcbiAgICBjb25zdCBkb3QgPSBWZWMzLmRvdChwbGFuZS5uLCBzcGhlcmUuY2VudGVyKTtcclxuICAgIGNvbnN0IHIgPSBzcGhlcmUucmFkaXVzICogcGxhbmUubi5sZW5ndGgoKTtcclxuICAgIGlmIChkb3QgKyByIDwgcGxhbmUuZCkgeyByZXR1cm4gLTE7IH1cclxuICAgIGVsc2UgaWYgKGRvdCAtIHIgPiBwbGFuZS5kKSB7IHJldHVybiAwOyB9XHJcbiAgICByZXR1cm4gMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIHNwaGVyZS1mcnVzdHVtIGludGVyc2VjdCwgZmFzdGVyIGJ1dCBoYXMgZmFsc2UgcG9zaXRpdmUgY29ybmVyIGNhc2VzPGJyLz5cclxuICogISN6aCDnkIPlkozplKXlj7DnmoTnm7jkuqTmgKfmo4DmtYvvvIzpgJ/luqblv6vvvIzkvYbmnInplJnor6/mg4XlhrXjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIHNwaGVyZV9mcnVzdHVtXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cclxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG5vdCAwXHJcbiAqL1xyXG5jb25zdCBzcGhlcmVfZnJ1c3R1bSA9IGZ1bmN0aW9uIChzcGhlcmU6IHNwaGVyZSwgZnJ1c3R1bTogZnJ1c3R1bSk6IG51bWJlciB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0ucGxhbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gZnJ1c3R1bSBwbGFuZSBub3JtYWwgcG9pbnRzIHRvIHRoZSBpbnNpZGVcclxuICAgICAgICBpZiAoc3BoZXJlX3BsYW5lKHNwaGVyZSwgZnJ1c3R1bS5wbGFuZXNbaV0pID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9IC8vIGNvbXBsZXRlbHkgb3V0c2lkZVxyXG4gICAgcmV0dXJuIDE7XHJcbn07XHJcblxyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDkxMjY5Mi92aWV3LWZydXN0dW0tY3VsbGluZy1jb3JuZXItY2FzZXNcclxuLyoqXHJcbiAqICEjZW4gc3BoZXJlLWZydXN0dW0gaW50ZXJzZWN0LCBoYW5kbGVzIHRoZSBmYWxzZSBwb3NpdGl2ZXMgY29ycmVjdGx5PGJyLz5cclxuICogISN6aCDnkIPlkozplKXlj7DnmoTnm7jkuqTmgKfmo4DmtYvvvIzmraPnoa7lpITnkIblpKflpJrmlbDplJnor6/mg4XlhrXjgIJcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIHNwaGVyZV9mcnVzdHVtX2FjY3VyYXRlXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXHJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cclxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG5vdCAwXHJcbiAqL1xyXG5jb25zdCBzcGhlcmVfZnJ1c3R1bV9hY2N1cmF0ZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBwdCA9IG5ldyBWZWMzKDAsIDAsIDApLCBtYXAgPSBbMSwgLTEsIDEsIC0xLCAxLCAtMV07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNwaGVyZTogc3BoZXJlLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFuZSA9IGZydXN0dW0ucGxhbmVzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCByID0gc3BoZXJlLnJhZGl1cywgYyA9IHNwaGVyZS5jZW50ZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IG4gPSBwbGFuZS5uLCBkID0gcGxhbmUuZDtcclxuICAgICAgICAgICAgY29uc3QgZG90ID0gVmVjMy5kb3QobiwgYyk7XHJcbiAgICAgICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXHJcbiAgICAgICAgICAgIGlmIChkb3QgKyByIDwgZCkgeyByZXR1cm4gMDsgfSAvLyBjb21wbGV0ZWx5IG91dHNpZGVcclxuICAgICAgICAgICAgZWxzZSBpZiAoZG90IC0gciA+IGQpIHsgY29udGludWU7IH1cclxuICAgICAgICAgICAgLy8gaW4gY2FzZSBvZiBmYWxzZSBwb3NpdGl2ZXNcclxuICAgICAgICAgICAgLy8gaGFzIGZhbHNlIG5lZ2F0aXZlcywgc3RpbGwgd29ya2luZyBvbiBpdFxyXG4gICAgICAgICAgICBWZWMzLmFkZChwdCwgYywgVmVjMy5tdWx0aXBseVNjYWxhcihwdCwgbiwgcikpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDY7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGogPT09IGkgfHwgaiA9PT0gaSArIG1hcFtpXSkgeyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVzdCA9IGZydXN0dW0ucGxhbmVzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKFZlYzMuZG90KHRlc3QubiwgcHQpIDwgdGVzdC5kKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gc3BoZXJlLXNwaGVyZSBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOeQg+WSjOeQg+eahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgc3BoZXJlX3NwaGVyZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZTBcclxuICogQHBhcmFtIHtnZW9tVXRpbHMuU3BoZXJlfSBzcGhlcmUxXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgb3IgZmFsc2VcclxuICovXHJcbmNvbnN0IHNwaGVyZV9zcGhlcmUgPSBmdW5jdGlvbiAoc3BoZXJlMDogc3BoZXJlLCBzcGhlcmUxOiBzcGhlcmUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHIgPSBzcGhlcmUwLnJhZGl1cyArIHNwaGVyZTEucmFkaXVzO1xyXG4gICAgcmV0dXJuIFZlYzMuc3F1YXJlZERpc3RhbmNlKHNwaGVyZTAuY2VudGVyLCBzcGhlcmUxLmNlbnRlcikgPCByICogcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIHNwaGVyZS1hYWJiIGludGVyc2VjdDxici8+XHJcbiAqICEjemgg55CD5ZKM6L205a+56b2Q5YyF5Zu055uS55qE55u45Lqk5oCn5qOA5rWL44CCXHJcbiAqIEBzdGF0aWNcclxuICogQG1ldGhvZCBzcGhlcmVfYWFiYlxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgb3IgZmFsc2VcclxuICovXHJcbmNvbnN0IHNwaGVyZV9hYWJiID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoKTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3BoZXJlOiBzcGhlcmUsIGFhYmI6IGFhYmIpOiBib29sZWFuIHtcclxuICAgICAgICBkaXN0YW5jZS5wdF9wb2ludF9hYWJiKHB0LCBzcGhlcmUuY2VudGVyLCBhYWJiKTtcclxuICAgICAgICByZXR1cm4gVmVjMy5zcXVhcmVkRGlzdGFuY2Uoc3BoZXJlLmNlbnRlciwgcHQpIDwgc3BoZXJlLnJhZGl1cyAqIHNwaGVyZS5yYWRpdXM7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gc3BoZXJlLW9iYiBpbnRlcnNlY3Q8YnIvPlxyXG4gKiAhI3poIOeQg+WSjOaWueWQkeWMheWbtOebkueahOebuOS6pOaAp+ajgOa1i+OAglxyXG4gKiBAc3RhdGljXHJcbiAqIEBtZXRob2Qgc3BoZXJlX29iYlxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZVxyXG4gKiBAcGFyYW0ge2dlb21VdGlscy5PYmJ9IG9iYlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG9yIGZhbHNlXHJcbiAqL1xyXG5jb25zdCBzcGhlcmVfb2JiID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoKTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoc3BoZXJlOiBzcGhlcmUsIG9iYjogb2JiKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZGlzdGFuY2UucHRfcG9pbnRfb2JiKHB0LCBzcGhlcmUuY2VudGVyLCBvYmIpO1xyXG4gICAgICAgIHJldHVybiBWZWMzLnNxdWFyZWREaXN0YW5jZShzcGhlcmUuY2VudGVyLCBwdCkgPCBzcGhlcmUucmFkaXVzICogc3BoZXJlLnJhZGl1cztcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBpbnRlcnNlY3QgPSB7XHJcbiAgICAvLyBvbGQgYXBpXHJcbiAgICByYXlBYWJiLFxyXG4gICAgcmF5TWVzaCxcclxuICAgIHJheWNhc3QsXHJcbiAgICByYXlUcmlhbmdsZSxcclxuXHJcbiAgICByYXlfc3BoZXJlLFxyXG4gICAgcmF5X2FhYmIsXHJcbiAgICByYXlfb2JiLFxyXG4gICAgcmF5X3BsYW5lLFxyXG4gICAgcmF5X3RyaWFuZ2xlLFxyXG4gICAgbGluZV9wbGFuZSxcclxuICAgIGxpbmVfdHJpYW5nbGUsXHJcbiAgICBsaW5lX3F1YWQsXHJcblxyXG4gICAgc3BoZXJlX3NwaGVyZSxcclxuICAgIHNwaGVyZV9hYWJiLFxyXG4gICAgc3BoZXJlX29iYixcclxuICAgIHNwaGVyZV9wbGFuZSxcclxuICAgIHNwaGVyZV9mcnVzdHVtLFxyXG4gICAgc3BoZXJlX2ZydXN0dW1fYWNjdXJhdGUsXHJcblxyXG4gICAgYWFiYl9hYWJiLFxyXG4gICAgYWFiYl9vYmIsXHJcbiAgICBhYWJiX3BsYW5lLFxyXG4gICAgYWFiYl9mcnVzdHVtLFxyXG4gICAgYWFiYl9mcnVzdHVtX2FjY3VyYXRlLFxyXG5cclxuICAgIG9iYl9vYmIsXHJcbiAgICBvYmJfcGxhbmUsXHJcbiAgICBvYmJfZnJ1c3R1bSxcclxuICAgIG9iYl9mcnVzdHVtX2FjY3VyYXRlLFxyXG4gICAgb2JiX3BvaW50LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGludGVyc2VjdGlvbiBkZXRlY3Rpb24gb2YgZzEgYW5kIGcyIGNhbiBmaWxsIGluIHRoZSBzaGFwZSBpbiB0aGUgYmFzaWMgZ2VvbWV0cnkuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiBnMSDlkowgZzIg55qE55u45Lqk5oCn5qOA5rWL77yM5Y+v5aGr5YWl5Z+656GA5Yeg5L2V5Lit55qE5b2i54q244CCXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWV0aG9kIHJlc29sdmVcclxuICAgICAqIEBwYXJhbSBnMSBHZW9tZXRyeSAxXHJcbiAgICAgKiBAcGFyYW0gZzIgR2VvbWV0cnkgMlxyXG4gICAgICogQHBhcmFtIG91dFB0IG9wdGlvbmFsLCBJbnRlcnNlY3Rpb24gcG9pbnQuIChub3RlOiBvbmx5IHBhcnRpYWwgc2hhcGUgZGV0ZWN0aW9uIHdpdGggdGhpcyByZXR1cm4gdmFsdWUpXHJcbiAgICAgKi9cclxuICAgIHJlc29sdmUgKGcxOiBhbnksIGcyOiBhbnksIG91dFB0ID0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHR5cGUxID0gZzEuX3R5cGUsIHR5cGUyID0gZzIuX3R5cGU7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSB0aGlzW3R5cGUxIHwgdHlwZTJdO1xyXG4gICAgICAgIGlmICh0eXBlMSA8IHR5cGUyKSB7IHJldHVybiByZXNvbHZlcihnMSwgZzIsIG91dFB0KTsgfVxyXG4gICAgICAgIGVsc2UgeyByZXR1cm4gcmVzb2x2ZXIoZzIsIGcxLCBvdXRQdCk7IH1cclxuICAgIH0sXHJcbn07XHJcblxyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfUkFZIHwgZW51bXMuU0hBUEVfU1BIRVJFXSA9IHJheV9zcGhlcmU7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9SQVkgfCBlbnVtcy5TSEFQRV9BQUJCXSA9IHJheV9hYWJiO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfUkFZIHwgZW51bXMuU0hBUEVfT0JCXSA9IHJheV9vYmI7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9SQVkgfCBlbnVtcy5TSEFQRV9QTEFORV0gPSByYXlfcGxhbmU7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9SQVkgfCBlbnVtcy5TSEFQRV9UUklBTkdMRV0gPSByYXlfdHJpYW5nbGU7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9MSU5FIHwgZW51bXMuU0hBUEVfUExBTkVdID0gbGluZV9wbGFuZTtcclxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX0xJTkUgfCBlbnVtcy5TSEFQRV9UUklBTkdMRV0gPSBsaW5lX3RyaWFuZ2xlO1xyXG5cclxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRV0gPSBzcGhlcmVfc3BoZXJlO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfQUFCQl0gPSBzcGhlcmVfYWFiYjtcclxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRSB8IGVudW1zLlNIQVBFX09CQl0gPSBzcGhlcmVfb2JiO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfUExBTkVdID0gc3BoZXJlX3BsYW5lO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfRlJVU1RVTV0gPSBzcGhlcmVfZnJ1c3R1bTtcclxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRSB8IGVudW1zLlNIQVBFX0ZSVVNUVU1fQUNDVVJBVEVdID0gc3BoZXJlX2ZydXN0dW1fYWNjdXJhdGU7XHJcblxyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfQUFCQl0gPSBhYWJiX2FhYmI7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9BQUJCIHwgZW51bXMuU0hBUEVfT0JCXSA9IGFhYmJfb2JiO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfQUFCQiB8IGVudW1zLlNIQVBFX1BMQU5FXSA9IGFhYmJfcGxhbmU7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9BQUJCIHwgZW51bXMuU0hBUEVfRlJVU1RVTV0gPSBhYWJiX2ZydXN0dW07XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9BQUJCIHwgZW51bXMuU0hBUEVfRlJVU1RVTV9BQ0NVUkFURV0gPSBhYWJiX2ZydXN0dW1fYWNjdXJhdGU7XHJcblxyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfT0JCXSA9IG9iYl9vYmI7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9PQkIgfCBlbnVtcy5TSEFQRV9QTEFORV0gPSBvYmJfcGxhbmU7XHJcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9PQkIgfCBlbnVtcy5TSEFQRV9GUlVTVFVNXSA9IG9iYl9mcnVzdHVtO1xyXG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfT0JCIHwgZW51bXMuU0hBUEVfRlJVU1RVTV9BQ0NVUkFURV0gPSBvYmJfZnJ1c3R1bV9hY2N1cmF0ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyc2VjdDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=