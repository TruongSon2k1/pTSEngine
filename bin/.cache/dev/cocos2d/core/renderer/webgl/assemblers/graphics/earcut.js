
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/graphics/earcut.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
'use strict';

cc.Graphics.earcut = module.exports = earcut;

function earcut(data, holeIndices, dim) {
  dim = dim || 2;
  var hasHoles = holeIndices && holeIndices.length,
      outerLen = hasHoles ? holeIndices[0] * dim : data.length,
      outerNode = linkedList(data, 0, outerLen, dim, true),
      triangles = [];
  if (!outerNode) return triangles;
  var minX, minY, maxX, maxY, x, y, size;
  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim); // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

  if (data.length > 80 * dim) {
    minX = maxX = data[0];
    minY = maxY = data[1];

    for (var i = dim; i < outerLen; i += dim) {
      x = data[i];
      y = data[i + 1];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    } // minX, minY and size are later used to transform coords into integers for z-order calculation


    size = Math.max(maxX - minX, maxY - minY);
  }

  earcutLinked(outerNode, triangles, dim, minX, minY, size);
  return triangles;
} // create a circular doubly linked list from polygon points in the specified winding order


function linkedList(data, start, end, dim, clockwise) {
  var i, last;

  if (clockwise === signedArea(data, start, end, dim) > 0) {
    for (i = start; i < end; i += dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  } else {
    for (i = end - dim; i >= start; i -= dim) {
      last = insertNode(i, data[i], data[i + 1], last);
    }
  }

  if (last && equals(last, last.next)) {
    removeNode(last);
    last = last.next;
  }

  return last;
} // eliminate colinear or duplicate points


function filterPoints(start, end) {
  if (!start) return start;
  if (!end) end = start;
  var p = start,
      again;

  do {
    again = false;

    if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
      removeNode(p);
      p = end = p.prev;
      if (p === p.next) return null;
      again = true;
    } else {
      p = p.next;
    }
  } while (again || p !== end);

  return end;
} // main ear slicing loop which triangulates a polygon (given as a linked list)


function earcutLinked(ear, triangles, dim, minX, minY, size, pass) {
  if (!ear) return; // interlink polygon nodes in z-order

  if (!pass && size) indexCurve(ear, minX, minY, size);
  var stop = ear,
      prev,
      next; // iterate through ears, slicing them one by one

  while (ear.prev !== ear.next) {
    prev = ear.prev;
    next = ear.next;

    if (size ? isEarHashed(ear, minX, minY, size) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim);
      triangles.push(ear.i / dim);
      triangles.push(next.i / dim);
      removeNode(ear); // skipping the next vertice leads to less sliver triangles

      ear = next.next;
      stop = next.next;
      continue;
    }

    ear = next; // if we looped through the whole remaining polygon and can't find any more ears

    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, size, 1); // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(ear, triangles, dim);
        earcutLinked(ear, triangles, dim, minX, minY, size, 2); // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, size);
      }

      break;
    }
  }
} // check whether a polygon node forms a valid ear with adjacent nodes


function isEar(ear) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // now make sure we don't have other points inside the potential ear

  var p = ear.next.next;

  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.next;
  }

  return true;
}

function isEarHashed(ear, minX, minY, size) {
  var a = ear.prev,
      b = ear,
      c = ear.next;
  if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
  // triangle bbox; min & max are calculated like this for speed

  var minTX = a.x < b.x ? a.x < c.x ? a.x : c.x : b.x < c.x ? b.x : c.x,
      minTY = a.y < b.y ? a.y < c.y ? a.y : c.y : b.y < c.y ? b.y : c.y,
      maxTX = a.x > b.x ? a.x > c.x ? a.x : c.x : b.x > c.x ? b.x : c.x,
      maxTY = a.y > b.y ? a.y > c.y ? a.y : c.y : b.y > c.y ? b.y : c.y; // z-order range for the current triangle bbox;

  var minZ = zOrder(minTX, minTY, minX, minY, size),
      maxZ = zOrder(maxTX, maxTY, minX, minY, size); // first look for points inside the triangle in increasing z-order

  var p = ear.nextZ;

  while (p && p.z <= maxZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.nextZ;
  } // then look for points in decreasing z-order


  p = ear.prevZ;

  while (p && p.z >= minZ) {
    if (p !== ear.prev && p !== ear.next && pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
    p = p.prevZ;
  }

  return true;
} // go through all polygon nodes and cure small local self-intersections


function cureLocalIntersections(start, triangles, dim) {
  var p = start;

  do {
    var a = p.prev,
        b = p.next.next;

    if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
      triangles.push(a.i / dim);
      triangles.push(p.i / dim);
      triangles.push(b.i / dim); // remove two nodes involved

      removeNode(p);
      removeNode(p.next);
      p = start = b;
    }

    p = p.next;
  } while (p !== start);

  return p;
} // try splitting polygon into two and triangulate them independently


function splitEarcut(start, triangles, dim, minX, minY, size) {
  // look for a valid diagonal that divides the polygon into two
  var a = start;

  do {
    var b = a.next.next;

    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        var c = splitPolygon(a, b); // filter colinear points around the cuts

        a = filterPoints(a, a.next);
        c = filterPoints(c, c.next); // run earcut on each half

        earcutLinked(a, triangles, dim, minX, minY, size);
        earcutLinked(c, triangles, dim, minX, minY, size);
        return;
      }

      b = b.next;
    }

    a = a.next;
  } while (a !== start);
} // link every hole into the outer loop, producing a single-ring polygon without holes


function eliminateHoles(data, holeIndices, outerNode, dim) {
  var queue = [],
      i,
      len,
      start,
      end,
      list;

  for (i = 0, len = holeIndices.length; i < len; i++) {
    start = holeIndices[i] * dim;
    end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
    list = linkedList(data, start, end, dim, false);
    if (list === list.next) list.steiner = true;
    queue.push(getLeftmost(list));
  }

  queue.sort(compareX); // process holes from left to right

  for (i = 0; i < queue.length; i++) {
    eliminateHole(queue[i], outerNode);
    outerNode = filterPoints(outerNode, outerNode.next);
  }

  return outerNode;
}

function compareX(a, b) {
  return a.x - b.x;
} // find a bridge between vertices that connects hole with an outer ring and and link it


function eliminateHole(hole, outerNode) {
  outerNode = findHoleBridge(hole, outerNode);

  if (outerNode) {
    var b = splitPolygon(outerNode, hole);
    filterPoints(b, b.next);
  }
} // David Eberly's algorithm for finding a bridge between hole and outer polygon


function findHoleBridge(hole, outerNode) {
  var p = outerNode,
      hx = hole.x,
      hy = hole.y,
      qx = -Infinity,
      m; // find a segment intersected by a ray from the hole's leftmost point to the left;
  // segment's endpoint with lesser x will be potential connection point

  do {
    if (hy <= p.y && hy >= p.next.y) {
      var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

      if (x <= hx && x > qx) {
        qx = x;

        if (x === hx) {
          if (hy === p.y) return p;
          if (hy === p.next.y) return p.next;
        }

        m = p.x < p.next.x ? p : p.next;
      }
    }

    p = p.next;
  } while (p !== outerNode);

  if (!m) return null;
  if (hx === qx) return m.prev; // hole touches outer segment; pick lower endpoint
  // look for points inside the triangle of hole point, segment intersection and endpoint;
  // if there are no points found, we have a valid connection;
  // otherwise choose the point of the minimum angle with the ray as connection point

  var stop = m,
      mx = m.x,
      my = m.y,
      tanMin = Infinity,
      tan;
  p = m.next;

  while (p !== stop) {
    if (hx >= p.x && p.x >= mx && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

      if ((tan < tanMin || tan === tanMin && p.x > m.x) && locallyInside(p, hole)) {
        m = p;
        tanMin = tan;
      }
    }

    p = p.next;
  }

  return m;
} // interlink polygon nodes in z-order


function indexCurve(start, minX, minY, size) {
  var p = start;

  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, size);
    p.prevZ = p.prev;
    p.nextZ = p.next;
    p = p.next;
  } while (p !== start);

  p.prevZ.nextZ = null;
  p.prevZ = null;
  sortLinked(p);
} // Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html


function sortLinked(list) {
  var i,
      p,
      q,
      e,
      tail,
      numMerges,
      pSize,
      qSize,
      inSize = 1;

  do {
    p = list;
    list = null;
    tail = null;
    numMerges = 0;

    while (p) {
      numMerges++;
      q = p;
      pSize = 0;

      for (i = 0; i < inSize; i++) {
        pSize++;
        q = q.nextZ;
        if (!q) break;
      }

      qSize = inSize;

      while (pSize > 0 || qSize > 0 && q) {
        if (pSize === 0) {
          e = q;
          q = q.nextZ;
          qSize--;
        } else if (qSize === 0 || !q) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else if (p.z <= q.z) {
          e = p;
          p = p.nextZ;
          pSize--;
        } else {
          e = q;
          q = q.nextZ;
          qSize--;
        }

        if (tail) tail.nextZ = e;else list = e;
        e.prevZ = tail;
        tail = e;
      }

      p = q;
    }

    tail.nextZ = null;
    inSize *= 2;
  } while (numMerges > 1);

  return list;
} // z-order of a point given coords and size of the data bounding box


function zOrder(x, y, minX, minY, size) {
  // coords are transformed into non-negative 15-bit integer range
  x = 32767 * (x - minX) / size;
  y = 32767 * (y - minY) / size;
  x = (x | x << 8) & 0x00FF00FF;
  x = (x | x << 4) & 0x0F0F0F0F;
  x = (x | x << 2) & 0x33333333;
  x = (x | x << 1) & 0x55555555;
  y = (y | y << 8) & 0x00FF00FF;
  y = (y | y << 4) & 0x0F0F0F0F;
  y = (y | y << 2) & 0x33333333;
  y = (y | y << 1) & 0x55555555;
  return x | y << 1;
} // find the leftmost node of a polygon ring


function getLeftmost(start) {
  var p = start,
      leftmost = start;

  do {
    if (p.x < leftmost.x) leftmost = p;
    p = p.next;
  } while (p !== start);

  return leftmost;
} // check if a point lies within a convex triangle


function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 && (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 && (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
} // check if a diagonal between two polygon nodes is valid (lies in polygon interior)


function isValidDiagonal(a, b) {
  return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b);
} // signed area of a triangle


function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
} // check if two points are equal


function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
} // check if two segments intersect


function intersects(p1, q1, p2, q2) {
  if (equals(p1, q1) && equals(p2, q2) || equals(p1, q2) && equals(p2, q1)) return true;
  return area(p1, q1, p2) > 0 !== area(p1, q1, q2) > 0 && area(p2, q2, p1) > 0 !== area(p2, q2, q1) > 0;
} // check if a polygon diagonal intersects any polygon segments


function intersectsPolygon(a, b) {
  var p = a;

  do {
    if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
    p = p.next;
  } while (p !== a);

  return false;
} // check if a polygon diagonal is locally inside the polygon


function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
} // check if the middle point of a polygon diagonal is inside the polygon


function middleInside(a, b) {
  var p = a,
      inside = false,
      px = (a.x + b.x) / 2,
      py = (a.y + b.y) / 2;

  do {
    if (p.y > py !== p.next.y > py && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
    p = p.next;
  } while (p !== a);

  return inside;
} // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring


function splitPolygon(a, b) {
  var a2 = new Node(a.i, a.x, a.y),
      b2 = new Node(b.i, b.x, b.y),
      an = a.next,
      bp = b.prev;
  a.next = b;
  b.prev = a;
  a2.next = an;
  an.prev = a2;
  b2.next = a2;
  a2.prev = b2;
  bp.next = b2;
  b2.prev = bp;
  return b2;
} // create a node and optionally link it with previous one (in a circular doubly linked list)


function insertNode(i, x, y, last) {
  var p = new Node(i, x, y);

  if (!last) {
    p.prev = p;
    p.next = p;
  } else {
    p.next = last.next;
    p.prev = last;
    last.next.prev = p;
    last.next = p;
  }

  return p;
}

function removeNode(p) {
  p.next.prev = p.prev;
  p.prev.next = p.next;
  if (p.prevZ) p.prevZ.nextZ = p.nextZ;
  if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
  // vertice index in coordinates array
  this.i = i; // vertex coordinates

  this.x = x;
  this.y = y; // previous and next vertice nodes in a polygon ring

  this.prev = null;
  this.next = null; // z-order curve value

  this.z = null; // previous and next nodes in z-order

  this.prevZ = null;
  this.nextZ = null; // indicates whether this is a steiner point

  this.steiner = false;
} // return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation


earcut.deviation = function (data, holeIndices, dim, triangles) {
  var hasHoles = holeIndices && holeIndices.length;
  var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
  var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));

  if (hasHoles) {
    for (var i = 0, len = holeIndices.length; i < len; i++) {
      var start = holeIndices[i] * dim;
      var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
      polygonArea -= Math.abs(signedArea(data, start, end, dim));
    }
  }

  var trianglesArea = 0;

  for (i = 0; i < triangles.length; i += 3) {
    var a = triangles[i] * dim;
    var b = triangles[i + 1] * dim;
    var c = triangles[i + 2] * dim;
    trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
  }

  return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
  var sum = 0;

  for (var i = start, j = end - dim; i < end; i += dim) {
    sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
    j = i;
  }

  return sum;
} // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts


earcut.flatten = function (data) {
  var dim = data[0][0].length,
      result = {
    vertices: [],
    holes: [],
    dimensions: dim
  },
      holeIndex = 0;

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      for (var d = 0; d < dim; d++) {
        result.vertices.push(data[i][j][d]);
      }
    }

    if (i > 0) {
      holeIndex += data[i - 1].length;
      result.holes.push(holeIndex);
    }
  }

  return result;
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcYXNzZW1ibGVyc1xcZ3JhcGhpY3NcXGVhcmN1dC5qcyJdLCJuYW1lcyI6WyJjYyIsIkdyYXBoaWNzIiwiZWFyY3V0IiwibW9kdWxlIiwiZXhwb3J0cyIsImRhdGEiLCJob2xlSW5kaWNlcyIsImRpbSIsImhhc0hvbGVzIiwibGVuZ3RoIiwib3V0ZXJMZW4iLCJvdXRlck5vZGUiLCJsaW5rZWRMaXN0IiwidHJpYW5nbGVzIiwibWluWCIsIm1pblkiLCJtYXhYIiwibWF4WSIsIngiLCJ5Iiwic2l6ZSIsImVsaW1pbmF0ZUhvbGVzIiwiaSIsIk1hdGgiLCJtYXgiLCJlYXJjdXRMaW5rZWQiLCJzdGFydCIsImVuZCIsImNsb2Nrd2lzZSIsImxhc3QiLCJzaWduZWRBcmVhIiwiaW5zZXJ0Tm9kZSIsImVxdWFscyIsIm5leHQiLCJyZW1vdmVOb2RlIiwiZmlsdGVyUG9pbnRzIiwicCIsImFnYWluIiwic3RlaW5lciIsImFyZWEiLCJwcmV2IiwiZWFyIiwicGFzcyIsImluZGV4Q3VydmUiLCJzdG9wIiwiaXNFYXJIYXNoZWQiLCJpc0VhciIsInB1c2giLCJjdXJlTG9jYWxJbnRlcnNlY3Rpb25zIiwic3BsaXRFYXJjdXQiLCJhIiwiYiIsImMiLCJwb2ludEluVHJpYW5nbGUiLCJtaW5UWCIsIm1pblRZIiwibWF4VFgiLCJtYXhUWSIsIm1pbloiLCJ6T3JkZXIiLCJtYXhaIiwibmV4dFoiLCJ6IiwicHJldloiLCJpbnRlcnNlY3RzIiwibG9jYWxseUluc2lkZSIsImlzVmFsaWREaWFnb25hbCIsInNwbGl0UG9seWdvbiIsInF1ZXVlIiwibGVuIiwibGlzdCIsImdldExlZnRtb3N0Iiwic29ydCIsImNvbXBhcmVYIiwiZWxpbWluYXRlSG9sZSIsImhvbGUiLCJmaW5kSG9sZUJyaWRnZSIsImh4IiwiaHkiLCJxeCIsIkluZmluaXR5IiwibSIsIm14IiwibXkiLCJ0YW5NaW4iLCJ0YW4iLCJhYnMiLCJzb3J0TGlua2VkIiwicSIsImUiLCJ0YWlsIiwibnVtTWVyZ2VzIiwicFNpemUiLCJxU2l6ZSIsImluU2l6ZSIsImxlZnRtb3N0IiwiYXgiLCJheSIsImJ4IiwiYnkiLCJjeCIsImN5IiwicHgiLCJweSIsImludGVyc2VjdHNQb2x5Z29uIiwibWlkZGxlSW5zaWRlIiwiciIsInAxIiwicDIiLCJxMSIsInEyIiwiaW5zaWRlIiwiYTIiLCJOb2RlIiwiYjIiLCJhbiIsImJwIiwiZGV2aWF0aW9uIiwicG9seWdvbkFyZWEiLCJ0cmlhbmdsZXNBcmVhIiwic3VtIiwiaiIsImZsYXR0ZW4iLCJyZXN1bHQiLCJ2ZXJ0aWNlcyIsImhvbGVzIiwiZGltZW5zaW9ucyIsImhvbGVJbmRleCIsImQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUFBLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxNQUFaLEdBQXFCQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJGLE1BQXRDOztBQUVBLFNBQVNBLE1BQVQsQ0FBZ0JHLElBQWhCLEVBQXNCQyxXQUF0QixFQUFtQ0MsR0FBbkMsRUFBd0M7QUFFcENBLEVBQUFBLEdBQUcsR0FBR0EsR0FBRyxJQUFJLENBQWI7QUFFQSxNQUFJQyxRQUFRLEdBQUdGLFdBQVcsSUFBSUEsV0FBVyxDQUFDRyxNQUExQztBQUFBLE1BQ0lDLFFBQVEsR0FBR0YsUUFBUSxHQUFHRixXQUFXLENBQUMsQ0FBRCxDQUFYLEdBQWlCQyxHQUFwQixHQUEwQkYsSUFBSSxDQUFDSSxNQUR0RDtBQUFBLE1BRUlFLFNBQVMsR0FBR0MsVUFBVSxDQUFDUCxJQUFELEVBQU8sQ0FBUCxFQUFVSyxRQUFWLEVBQW9CSCxHQUFwQixFQUF5QixJQUF6QixDQUYxQjtBQUFBLE1BR0lNLFNBQVMs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dXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY2MuR3JhcGhpY3MuZWFyY3V0ID0gbW9kdWxlLmV4cG9ydHMgPSBlYXJjdXQ7XHJcblxyXG5mdW5jdGlvbiBlYXJjdXQoZGF0YSwgaG9sZUluZGljZXMsIGRpbSkge1xyXG5cclxuICAgIGRpbSA9IGRpbSB8fCAyO1xyXG5cclxuICAgIHZhciBoYXNIb2xlcyA9IGhvbGVJbmRpY2VzICYmIGhvbGVJbmRpY2VzLmxlbmd0aCxcclxuICAgICAgICBvdXRlckxlbiA9IGhhc0hvbGVzID8gaG9sZUluZGljZXNbMF0gKiBkaW0gOiBkYXRhLmxlbmd0aCxcclxuICAgICAgICBvdXRlck5vZGUgPSBsaW5rZWRMaXN0KGRhdGEsIDAsIG91dGVyTGVuLCBkaW0sIHRydWUpLFxyXG4gICAgICAgIHRyaWFuZ2xlcyA9IFtdO1xyXG5cclxuICAgIGlmICghb3V0ZXJOb2RlKSByZXR1cm4gdHJpYW5nbGVzO1xyXG5cclxuICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZLCB4LCB5LCBzaXplO1xyXG5cclxuICAgIGlmIChoYXNIb2xlcykgb3V0ZXJOb2RlID0gZWxpbWluYXRlSG9sZXMoZGF0YSwgaG9sZUluZGljZXMsIG91dGVyTm9kZSwgZGltKTtcclxuXHJcbiAgICAvLyBpZiB0aGUgc2hhcGUgaXMgbm90IHRvbyBzaW1wbGUsIHdlJ2xsIHVzZSB6LW9yZGVyIGN1cnZlIGhhc2ggbGF0ZXI7IGNhbGN1bGF0ZSBwb2x5Z29uIGJib3hcclxuICAgIGlmIChkYXRhLmxlbmd0aCA+IDgwICogZGltKSB7XHJcbiAgICAgICAgbWluWCA9IG1heFggPSBkYXRhWzBdO1xyXG4gICAgICAgIG1pblkgPSBtYXhZID0gZGF0YVsxXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGRpbTsgaSA8IG91dGVyTGVuOyBpICs9IGRpbSkge1xyXG4gICAgICAgICAgICB4ID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgeSA9IGRhdGFbaSArIDFdO1xyXG4gICAgICAgICAgICBpZiAoeCA8IG1pblgpIG1pblggPSB4O1xyXG4gICAgICAgICAgICBpZiAoeSA8IG1pblkpIG1pblkgPSB5O1xyXG4gICAgICAgICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xyXG4gICAgICAgICAgICBpZiAoeSA+IG1heFkpIG1heFkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbWluWCwgbWluWSBhbmQgc2l6ZSBhcmUgbGF0ZXIgdXNlZCB0byB0cmFuc2Zvcm0gY29vcmRzIGludG8gaW50ZWdlcnMgZm9yIHotb3JkZXIgY2FsY3VsYXRpb25cclxuICAgICAgICBzaXplID0gTWF0aC5tYXgobWF4WCAtIG1pblgsIG1heFkgLSBtaW5ZKTtcclxuICAgIH1cclxuXHJcbiAgICBlYXJjdXRMaW5rZWQob3V0ZXJOb2RlLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcclxufVxyXG5cclxuLy8gY3JlYXRlIGEgY2lyY3VsYXIgZG91Ymx5IGxpbmtlZCBsaXN0IGZyb20gcG9seWdvbiBwb2ludHMgaW4gdGhlIHNwZWNpZmllZCB3aW5kaW5nIG9yZGVyXHJcbmZ1bmN0aW9uIGxpbmtlZExpc3QoZGF0YSwgc3RhcnQsIGVuZCwgZGltLCBjbG9ja3dpc2UpIHtcclxuICAgIHZhciBpLCBsYXN0O1xyXG5cclxuICAgIGlmIChjbG9ja3dpc2UgPT09IChzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkgPiAwKSkge1xyXG4gICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IGRpbSkgbGFzdCA9IGluc2VydE5vZGUoaSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIGxhc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGkgPSBlbmQgLSBkaW07IGkgPj0gc3RhcnQ7IGkgLT0gZGltKSBsYXN0ID0gaW5zZXJ0Tm9kZShpLCBkYXRhW2ldLCBkYXRhW2kgKyAxXSwgbGFzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3QgJiYgZXF1YWxzKGxhc3QsIGxhc3QubmV4dCkpIHtcclxuICAgICAgICByZW1vdmVOb2RlKGxhc3QpO1xyXG4gICAgICAgIGxhc3QgPSBsYXN0Lm5leHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhc3Q7XHJcbn1cclxuXHJcbi8vIGVsaW1pbmF0ZSBjb2xpbmVhciBvciBkdXBsaWNhdGUgcG9pbnRzXHJcbmZ1bmN0aW9uIGZpbHRlclBvaW50cyhzdGFydCwgZW5kKSB7XHJcbiAgICBpZiAoIXN0YXJ0KSByZXR1cm4gc3RhcnQ7XHJcbiAgICBpZiAoIWVuZCkgZW5kID0gc3RhcnQ7XHJcblxyXG4gICAgdmFyIHAgPSBzdGFydCxcclxuICAgICAgICBhZ2FpbjtcclxuICAgIGRvIHtcclxuICAgICAgICBhZ2FpbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIXAuc3RlaW5lciAmJiAoZXF1YWxzKHAsIHAubmV4dCkgfHwgYXJlYShwLnByZXYsIHAsIHAubmV4dCkgPT09IDApKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocCk7XHJcbiAgICAgICAgICAgIHAgPSBlbmQgPSBwLnByZXY7XHJcbiAgICAgICAgICAgIGlmIChwID09PSBwLm5leHQpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICBhZ2FpbiA9IHRydWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSB3aGlsZSAoYWdhaW4gfHwgcCAhPT0gZW5kKTtcclxuXHJcbiAgICByZXR1cm4gZW5kO1xyXG59XHJcblxyXG4vLyBtYWluIGVhciBzbGljaW5nIGxvb3Agd2hpY2ggdHJpYW5ndWxhdGVzIGEgcG9seWdvbiAoZ2l2ZW4gYXMgYSBsaW5rZWQgbGlzdClcclxuZnVuY3Rpb24gZWFyY3V0TGlua2VkKGVhciwgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUsIHBhc3MpIHtcclxuICAgIGlmICghZWFyKSByZXR1cm47XHJcblxyXG4gICAgLy8gaW50ZXJsaW5rIHBvbHlnb24gbm9kZXMgaW4gei1vcmRlclxyXG4gICAgaWYgKCFwYXNzICYmIHNpemUpIGluZGV4Q3VydmUoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKTtcclxuXHJcbiAgICB2YXIgc3RvcCA9IGVhcixcclxuICAgICAgICBwcmV2LCBuZXh0O1xyXG5cclxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBlYXJzLCBzbGljaW5nIHRoZW0gb25lIGJ5IG9uZVxyXG4gICAgd2hpbGUgKGVhci5wcmV2ICE9PSBlYXIubmV4dCkge1xyXG4gICAgICAgIHByZXYgPSBlYXIucHJldjtcclxuICAgICAgICBuZXh0ID0gZWFyLm5leHQ7XHJcblxyXG4gICAgICAgIGlmIChzaXplID8gaXNFYXJIYXNoZWQoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKSA6IGlzRWFyKGVhcikpIHtcclxuICAgICAgICAgICAgLy8gY3V0IG9mZiB0aGUgdHJpYW5nbGVcclxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2gocHJldi5pIC8gZGltKTtcclxuICAgICAgICAgICAgdHJpYW5nbGVzLnB1c2goZWFyLmkgLyBkaW0pO1xyXG4gICAgICAgICAgICB0cmlhbmdsZXMucHVzaChuZXh0LmkgLyBkaW0pO1xyXG5cclxuICAgICAgICAgICAgcmVtb3ZlTm9kZShlYXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2tpcHBpbmcgdGhlIG5leHQgdmVydGljZSBsZWFkcyB0byBsZXNzIHNsaXZlciB0cmlhbmdsZXNcclxuICAgICAgICAgICAgZWFyID0gbmV4dC5uZXh0O1xyXG4gICAgICAgICAgICBzdG9wID0gbmV4dC5uZXh0O1xyXG5cclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlYXIgPSBuZXh0O1xyXG5cclxuICAgICAgICAvLyBpZiB3ZSBsb29wZWQgdGhyb3VnaCB0aGUgd2hvbGUgcmVtYWluaW5nIHBvbHlnb24gYW5kIGNhbid0IGZpbmQgYW55IG1vcmUgZWFyc1xyXG4gICAgICAgIGlmIChlYXIgPT09IHN0b3ApIHtcclxuICAgICAgICAgICAgLy8gdHJ5IGZpbHRlcmluZyBwb2ludHMgYW5kIHNsaWNpbmcgYWdhaW5cclxuICAgICAgICAgICAgaWYgKCFwYXNzKSB7XHJcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoZmlsdGVyUG9pbnRzKGVhciksIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplLCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZGlkbid0IHdvcmssIHRyeSBjdXJpbmcgYWxsIHNtYWxsIHNlbGYtaW50ZXJzZWN0aW9ucyBsb2NhbGx5XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZWFyID0gY3VyZUxvY2FsSW50ZXJzZWN0aW9ucyhlYXIsIHRyaWFuZ2xlcywgZGltKTtcclxuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChlYXIsIHRyaWFuZ2xlcywgZGltLCBtaW5YLCBtaW5ZLCBzaXplLCAyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFzIGEgbGFzdCByZXNvcnQsIHRyeSBzcGxpdHRpbmcgdGhlIHJlbWFpbmluZyBwb2x5Z29uIGludG8gdHdvXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFzcyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgc3BsaXRFYXJjdXQoZWFyLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gY2hlY2sgd2hldGhlciBhIHBvbHlnb24gbm9kZSBmb3JtcyBhIHZhbGlkIGVhciB3aXRoIGFkamFjZW50IG5vZGVzXHJcbmZ1bmN0aW9uIGlzRWFyKGVhcikge1xyXG4gICAgdmFyIGEgPSBlYXIucHJldixcclxuICAgICAgICBiID0gZWFyLFxyXG4gICAgICAgIGMgPSBlYXIubmV4dDtcclxuXHJcbiAgICBpZiAoYXJlYShhLCBiLCBjKSA+PSAwKSByZXR1cm4gZmFsc2U7IC8vIHJlZmxleCwgY2FuJ3QgYmUgYW4gZWFyXHJcblxyXG4gICAgLy8gbm93IG1ha2Ugc3VyZSB3ZSBkb24ndCBoYXZlIG90aGVyIHBvaW50cyBpbnNpZGUgdGhlIHBvdGVudGlhbCBlYXJcclxuICAgIHZhciBwID0gZWFyLm5leHQubmV4dDtcclxuXHJcbiAgICB3aGlsZSAocCAhPT0gZWFyLnByZXYpIHtcclxuICAgICAgICBpZiAocG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxyXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcCA9IHAubmV4dDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNFYXJIYXNoZWQoZWFyLCBtaW5YLCBtaW5ZLCBzaXplKSB7XHJcbiAgICB2YXIgYSA9IGVhci5wcmV2LFxyXG4gICAgICAgIGIgPSBlYXIsXHJcbiAgICAgICAgYyA9IGVhci5uZXh0O1xyXG5cclxuICAgIGlmIChhcmVhKGEsIGIsIGMpID49IDApIHJldHVybiBmYWxzZTsgLy8gcmVmbGV4LCBjYW4ndCBiZSBhbiBlYXJcclxuXHJcbiAgICAvLyB0cmlhbmdsZSBiYm94OyBtaW4gJiBtYXggYXJlIGNhbGN1bGF0ZWQgbGlrZSB0aGlzIGZvciBzcGVlZFxyXG4gICAgdmFyIG1pblRYID0gYS54IDwgYi54ID8gKGEueCA8IGMueCA/IGEueCA6IGMueCkgOiAoYi54IDwgYy54ID8gYi54IDogYy54KSxcclxuICAgICAgICBtaW5UWSA9IGEueSA8IGIueSA/IChhLnkgPCBjLnkgPyBhLnkgOiBjLnkpIDogKGIueSA8IGMueSA/IGIueSA6IGMueSksXHJcbiAgICAgICAgbWF4VFggPSBhLnggPiBiLnggPyAoYS54ID4gYy54ID8gYS54IDogYy54KSA6IChiLnggPiBjLnggPyBiLnggOiBjLngpLFxyXG4gICAgICAgIG1heFRZID0gYS55ID4gYi55ID8gKGEueSA+IGMueSA/IGEueSA6IGMueSkgOiAoYi55ID4gYy55ID8gYi55IDogYy55KTtcclxuXHJcbiAgICAvLyB6LW9yZGVyIHJhbmdlIGZvciB0aGUgY3VycmVudCB0cmlhbmdsZSBiYm94O1xyXG4gICAgdmFyIG1pblogPSB6T3JkZXIobWluVFgsIG1pblRZLCBtaW5YLCBtaW5ZLCBzaXplKSxcclxuICAgICAgICBtYXhaID0gek9yZGVyKG1heFRYLCBtYXhUWSwgbWluWCwgbWluWSwgc2l6ZSk7XHJcblxyXG4gICAgLy8gZmlyc3QgbG9vayBmb3IgcG9pbnRzIGluc2lkZSB0aGUgdHJpYW5nbGUgaW4gaW5jcmVhc2luZyB6LW9yZGVyXHJcbiAgICB2YXIgcCA9IGVhci5uZXh0WjtcclxuXHJcbiAgICB3aGlsZSAocCAmJiBwLnogPD0gbWF4Wikge1xyXG4gICAgICAgIGlmIChwICE9PSBlYXIucHJldiAmJiBwICE9PSBlYXIubmV4dCAmJlxyXG4gICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoYS54LCBhLnksIGIueCwgYi55LCBjLngsIGMueSwgcC54LCBwLnkpICYmXHJcbiAgICAgICAgICAgIGFyZWEocC5wcmV2LCBwLCBwLm5leHQpID49IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICBwID0gcC5uZXh0WjtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGVuIGxvb2sgZm9yIHBvaW50cyBpbiBkZWNyZWFzaW5nIHotb3JkZXJcclxuICAgIHAgPSBlYXIucHJldlo7XHJcblxyXG4gICAgd2hpbGUgKHAgJiYgcC56ID49IG1pblopIHtcclxuICAgICAgICBpZiAocCAhPT0gZWFyLnByZXYgJiYgcCAhPT0gZWFyLm5leHQgJiZcclxuICAgICAgICAgICAgcG9pbnRJblRyaWFuZ2xlKGEueCwgYS55LCBiLngsIGIueSwgYy54LCBjLnksIHAueCwgcC55KSAmJlxyXG4gICAgICAgICAgICBhcmVhKHAucHJldiwgcCwgcC5uZXh0KSA+PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcCA9IHAucHJldlo7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8vIGdvIHRocm91Z2ggYWxsIHBvbHlnb24gbm9kZXMgYW5kIGN1cmUgc21hbGwgbG9jYWwgc2VsZi1pbnRlcnNlY3Rpb25zXHJcbmZ1bmN0aW9uIGN1cmVMb2NhbEludGVyc2VjdGlvbnMoc3RhcnQsIHRyaWFuZ2xlcywgZGltKSB7XHJcbiAgICB2YXIgcCA9IHN0YXJ0O1xyXG4gICAgZG8ge1xyXG4gICAgICAgIHZhciBhID0gcC5wcmV2LFxyXG4gICAgICAgICAgICBiID0gcC5uZXh0Lm5leHQ7XHJcblxyXG4gICAgICAgIGlmICghZXF1YWxzKGEsIGIpICYmIGludGVyc2VjdHMoYSwgcCwgcC5uZXh0LCBiKSAmJiBsb2NhbGx5SW5zaWRlKGEsIGIpICYmIGxvY2FsbHlJbnNpZGUoYiwgYSkpIHtcclxuXHJcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGEuaSAvIGRpbSk7XHJcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHAuaSAvIGRpbSk7XHJcbiAgICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKGIuaSAvIGRpbSk7XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmUgdHdvIG5vZGVzIGludm9sdmVkXHJcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocCk7XHJcbiAgICAgICAgICAgIHJlbW92ZU5vZGUocC5uZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHAgPSBzdGFydCA9IGI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICB9IHdoaWxlIChwICE9PSBzdGFydCk7XHJcblxyXG4gICAgcmV0dXJuIHA7XHJcbn1cclxuXHJcbi8vIHRyeSBzcGxpdHRpbmcgcG9seWdvbiBpbnRvIHR3byBhbmQgdHJpYW5ndWxhdGUgdGhlbSBpbmRlcGVuZGVudGx5XHJcbmZ1bmN0aW9uIHNwbGl0RWFyY3V0KHN0YXJ0LCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSkge1xyXG4gICAgLy8gbG9vayBmb3IgYSB2YWxpZCBkaWFnb25hbCB0aGF0IGRpdmlkZXMgdGhlIHBvbHlnb24gaW50byB0d29cclxuICAgIHZhciBhID0gc3RhcnQ7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgdmFyIGIgPSBhLm5leHQubmV4dDtcclxuICAgICAgICB3aGlsZSAoYiAhPT0gYS5wcmV2KSB7XHJcbiAgICAgICAgICAgIGlmIChhLmkgIT09IGIuaSAmJiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNwbGl0IHRoZSBwb2x5Z29uIGluIHR3byBieSB0aGUgZGlhZ29uYWxcclxuICAgICAgICAgICAgICAgIHZhciBjID0gc3BsaXRQb2x5Z29uKGEsIGIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpbHRlciBjb2xpbmVhciBwb2ludHMgYXJvdW5kIHRoZSBjdXRzXHJcbiAgICAgICAgICAgICAgICBhID0gZmlsdGVyUG9pbnRzKGEsIGEubmV4dCk7XHJcbiAgICAgICAgICAgICAgICBjID0gZmlsdGVyUG9pbnRzKGMsIGMubmV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcnVuIGVhcmN1dCBvbiBlYWNoIGhhbGZcclxuICAgICAgICAgICAgICAgIGVhcmN1dExpbmtlZChhLCB0cmlhbmdsZXMsIGRpbSwgbWluWCwgbWluWSwgc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBlYXJjdXRMaW5rZWQoYywgdHJpYW5nbGVzLCBkaW0sIG1pblgsIG1pblksIHNpemUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGIgPSBiLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGEgPSBhLm5leHQ7XHJcbiAgICB9IHdoaWxlIChhICE9PSBzdGFydCk7XHJcbn1cclxuXHJcbi8vIGxpbmsgZXZlcnkgaG9sZSBpbnRvIHRoZSBvdXRlciBsb29wLCBwcm9kdWNpbmcgYSBzaW5nbGUtcmluZyBwb2x5Z29uIHdpdGhvdXQgaG9sZXNcclxuZnVuY3Rpb24gZWxpbWluYXRlSG9sZXMoZGF0YSwgaG9sZUluZGljZXMsIG91dGVyTm9kZSwgZGltKSB7XHJcbiAgICB2YXIgcXVldWUgPSBbXSxcclxuICAgICAgICBpLCBsZW4sIHN0YXJ0LCBlbmQsIGxpc3Q7XHJcblxyXG4gICAgZm9yIChpID0gMCwgbGVuID0gaG9sZUluZGljZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBzdGFydCA9IGhvbGVJbmRpY2VzW2ldICogZGltO1xyXG4gICAgICAgIGVuZCA9IGkgPCBsZW4gLSAxID8gaG9sZUluZGljZXNbaSArIDFdICogZGltIDogZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgbGlzdCA9IGxpbmtlZExpc3QoZGF0YSwgc3RhcnQsIGVuZCwgZGltLCBmYWxzZSk7XHJcbiAgICAgICAgaWYgKGxpc3QgPT09IGxpc3QubmV4dCkgbGlzdC5zdGVpbmVyID0gdHJ1ZTtcclxuICAgICAgICBxdWV1ZS5wdXNoKGdldExlZnRtb3N0KGxpc3QpKTtcclxuICAgIH1cclxuXHJcbiAgICBxdWV1ZS5zb3J0KGNvbXBhcmVYKTtcclxuXHJcbiAgICAvLyBwcm9jZXNzIGhvbGVzIGZyb20gbGVmdCB0byByaWdodFxyXG4gICAgZm9yIChpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZWxpbWluYXRlSG9sZShxdWV1ZVtpXSwgb3V0ZXJOb2RlKTtcclxuICAgICAgICBvdXRlck5vZGUgPSBmaWx0ZXJQb2ludHMob3V0ZXJOb2RlLCBvdXRlck5vZGUubmV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dGVyTm9kZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcGFyZVgoYSwgYikge1xyXG4gICAgcmV0dXJuIGEueCAtIGIueDtcclxufVxyXG5cclxuLy8gZmluZCBhIGJyaWRnZSBiZXR3ZWVuIHZlcnRpY2VzIHRoYXQgY29ubmVjdHMgaG9sZSB3aXRoIGFuIG91dGVyIHJpbmcgYW5kIGFuZCBsaW5rIGl0XHJcbmZ1bmN0aW9uIGVsaW1pbmF0ZUhvbGUoaG9sZSwgb3V0ZXJOb2RlKSB7XHJcbiAgICBvdXRlck5vZGUgPSBmaW5kSG9sZUJyaWRnZShob2xlLCBvdXRlck5vZGUpO1xyXG4gICAgaWYgKG91dGVyTm9kZSkge1xyXG4gICAgICAgIHZhciBiID0gc3BsaXRQb2x5Z29uKG91dGVyTm9kZSwgaG9sZSk7XHJcbiAgICAgICAgZmlsdGVyUG9pbnRzKGIsIGIubmV4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIERhdmlkIEViZXJseSdzIGFsZ29yaXRobSBmb3IgZmluZGluZyBhIGJyaWRnZSBiZXR3ZWVuIGhvbGUgYW5kIG91dGVyIHBvbHlnb25cclxuZnVuY3Rpb24gZmluZEhvbGVCcmlkZ2UoaG9sZSwgb3V0ZXJOb2RlKSB7XHJcbiAgICB2YXIgcCA9IG91dGVyTm9kZSxcclxuICAgICAgICBoeCA9IGhvbGUueCxcclxuICAgICAgICBoeSA9IGhvbGUueSxcclxuICAgICAgICBxeCA9IC1JbmZpbml0eSxcclxuICAgICAgICBtO1xyXG5cclxuICAgIC8vIGZpbmQgYSBzZWdtZW50IGludGVyc2VjdGVkIGJ5IGEgcmF5IGZyb20gdGhlIGhvbGUncyBsZWZ0bW9zdCBwb2ludCB0byB0aGUgbGVmdDtcclxuICAgIC8vIHNlZ21lbnQncyBlbmRwb2ludCB3aXRoIGxlc3NlciB4IHdpbGwgYmUgcG90ZW50aWFsIGNvbm5lY3Rpb24gcG9pbnRcclxuICAgIGRvIHtcclxuICAgICAgICBpZiAoaHkgPD0gcC55ICYmIGh5ID49IHAubmV4dC55KSB7XHJcbiAgICAgICAgICAgIHZhciB4ID0gcC54ICsgKGh5IC0gcC55KSAqIChwLm5leHQueCAtIHAueCkgLyAocC5uZXh0LnkgLSBwLnkpO1xyXG4gICAgICAgICAgICBpZiAoeCA8PSBoeCAmJiB4ID4gcXgpIHtcclxuICAgICAgICAgICAgICAgIHF4ID0geDtcclxuICAgICAgICAgICAgICAgIGlmICh4ID09PSBoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoeSA9PT0gcC55KSByZXR1cm4gcDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaHkgPT09IHAubmV4dC55KSByZXR1cm4gcC5uZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbSA9IHAueCA8IHAubmV4dC54ID8gcCA6IHAubmV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgfSB3aGlsZSAocCAhPT0gb3V0ZXJOb2RlKTtcclxuXHJcbiAgICBpZiAoIW0pIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmIChoeCA9PT0gcXgpIHJldHVybiBtLnByZXY7IC8vIGhvbGUgdG91Y2hlcyBvdXRlciBzZWdtZW50OyBwaWNrIGxvd2VyIGVuZHBvaW50XHJcblxyXG4gICAgLy8gbG9vayBmb3IgcG9pbnRzIGluc2lkZSB0aGUgdHJpYW5nbGUgb2YgaG9sZSBwb2ludCwgc2VnbWVudCBpbnRlcnNlY3Rpb24gYW5kIGVuZHBvaW50O1xyXG4gICAgLy8gaWYgdGhlcmUgYXJlIG5vIHBvaW50cyBmb3VuZCwgd2UgaGF2ZSBhIHZhbGlkIGNvbm5lY3Rpb247XHJcbiAgICAvLyBvdGhlcndpc2UgY2hvb3NlIHRoZSBwb2ludCBvZiB0aGUgbWluaW11bSBhbmdsZSB3aXRoIHRoZSByYXkgYXMgY29ubmVjdGlvbiBwb2ludFxyXG5cclxuICAgIHZhciBzdG9wID0gbSxcclxuICAgICAgICBteCA9IG0ueCxcclxuICAgICAgICBteSA9IG0ueSxcclxuICAgICAgICB0YW5NaW4gPSBJbmZpbml0eSxcclxuICAgICAgICB0YW47XHJcblxyXG4gICAgcCA9IG0ubmV4dDtcclxuXHJcbiAgICB3aGlsZSAocCAhPT0gc3RvcCkge1xyXG4gICAgICAgIGlmIChoeCA+PSBwLnggJiYgcC54ID49IG14ICYmXHJcbiAgICAgICAgICAgICAgICBwb2ludEluVHJpYW5nbGUoaHkgPCBteSA/IGh4IDogcXgsIGh5LCBteCwgbXksIGh5IDwgbXkgPyBxeCA6IGh4LCBoeSwgcC54LCBwLnkpKSB7XHJcblxyXG4gICAgICAgICAgICB0YW4gPSBNYXRoLmFicyhoeSAtIHAueSkgLyAoaHggLSBwLngpOyAvLyB0YW5nZW50aWFsXHJcblxyXG4gICAgICAgICAgICBpZiAoKHRhbiA8IHRhbk1pbiB8fCAodGFuID09PSB0YW5NaW4gJiYgcC54ID4gbS54KSkgJiYgbG9jYWxseUluc2lkZShwLCBob2xlKSkge1xyXG4gICAgICAgICAgICAgICAgbSA9IHA7XHJcbiAgICAgICAgICAgICAgICB0YW5NaW4gPSB0YW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG07XHJcbn1cclxuXHJcbi8vIGludGVybGluayBwb2x5Z29uIG5vZGVzIGluIHotb3JkZXJcclxuZnVuY3Rpb24gaW5kZXhDdXJ2ZShzdGFydCwgbWluWCwgbWluWSwgc2l6ZSkge1xyXG4gICAgdmFyIHAgPSBzdGFydDtcclxuICAgIGRvIHtcclxuICAgICAgICBpZiAocC56ID09PSBudWxsKSBwLnogPSB6T3JkZXIocC54LCBwLnksIG1pblgsIG1pblksIHNpemUpO1xyXG4gICAgICAgIHAucHJldlogPSBwLnByZXY7XHJcbiAgICAgICAgcC5uZXh0WiA9IHAubmV4dDtcclxuICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgfSB3aGlsZSAocCAhPT0gc3RhcnQpO1xyXG5cclxuICAgIHAucHJldloubmV4dFogPSBudWxsO1xyXG4gICAgcC5wcmV2WiA9IG51bGw7XHJcblxyXG4gICAgc29ydExpbmtlZChwKTtcclxufVxyXG5cclxuLy8gU2ltb24gVGF0aGFtJ3MgbGlua2VkIGxpc3QgbWVyZ2Ugc29ydCBhbGdvcml0aG1cclxuLy8gaHR0cDovL3d3dy5jaGlhcmsuZ3JlZW5lbmQub3JnLnVrL35zZ3RhdGhhbS9hbGdvcml0aG1zL2xpc3Rzb3J0Lmh0bWxcclxuZnVuY3Rpb24gc29ydExpbmtlZChsaXN0KSB7XHJcbiAgICB2YXIgaSwgcCwgcSwgZSwgdGFpbCwgbnVtTWVyZ2VzLCBwU2l6ZSwgcVNpemUsXHJcbiAgICAgICAgaW5TaXplID0gMTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgcCA9IGxpc3Q7XHJcbiAgICAgICAgbGlzdCA9IG51bGw7XHJcbiAgICAgICAgdGFpbCA9IG51bGw7XHJcbiAgICAgICAgbnVtTWVyZ2VzID0gMDtcclxuXHJcbiAgICAgICAgd2hpbGUgKHApIHtcclxuICAgICAgICAgICAgbnVtTWVyZ2VzKys7XHJcbiAgICAgICAgICAgIHEgPSBwO1xyXG4gICAgICAgICAgICBwU2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpblNpemU7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcFNpemUrKztcclxuICAgICAgICAgICAgICAgIHEgPSBxLm5leHRaO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFxKSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcVNpemUgPSBpblNpemU7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAocFNpemUgPiAwIHx8IChxU2l6ZSA+IDAgJiYgcSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocFNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBlID0gcTtcclxuICAgICAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcclxuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxU2l6ZSA9PT0gMCB8fCAhcSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUgPSBwO1xyXG4gICAgICAgICAgICAgICAgICAgIHAgPSBwLm5leHRaO1xyXG4gICAgICAgICAgICAgICAgICAgIHBTaXplLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHAueiA8PSBxLnopIHtcclxuICAgICAgICAgICAgICAgICAgICBlID0gcDtcclxuICAgICAgICAgICAgICAgICAgICBwID0gcC5uZXh0WjtcclxuICAgICAgICAgICAgICAgICAgICBwU2l6ZS0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlID0gcTtcclxuICAgICAgICAgICAgICAgICAgICBxID0gcS5uZXh0WjtcclxuICAgICAgICAgICAgICAgICAgICBxU2l6ZS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0YWlsKSB0YWlsLm5leHRaID0gZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgbGlzdCA9IGU7XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2WiA9IHRhaWw7XHJcbiAgICAgICAgICAgICAgICB0YWlsID0gZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcCA9IHE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YWlsLm5leHRaID0gbnVsbDtcclxuICAgICAgICBpblNpemUgKj0gMjtcclxuXHJcbiAgICB9IHdoaWxlIChudW1NZXJnZXMgPiAxKTtcclxuXHJcbiAgICByZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy8gei1vcmRlciBvZiBhIHBvaW50IGdpdmVuIGNvb3JkcyBhbmQgc2l6ZSBvZiB0aGUgZGF0YSBib3VuZGluZyBib3hcclxuZnVuY3Rpb24gek9yZGVyKHgsIHksIG1pblgsIG1pblksIHNpemUpIHtcclxuICAgIC8vIGNvb3JkcyBhcmUgdHJhbnNmb3JtZWQgaW50byBub24tbmVnYXRpdmUgMTUtYml0IGludGVnZXIgcmFuZ2VcclxuICAgIHggPSAzMjc2NyAqICh4IC0gbWluWCkgLyBzaXplO1xyXG4gICAgeSA9IDMyNzY3ICogKHkgLSBtaW5ZKSAvIHNpemU7XHJcblxyXG4gICAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcclxuICAgIHggPSAoeCB8ICh4IDw8IDQpKSAmIDB4MEYwRjBGMEY7XHJcbiAgICB4ID0gKHggfCAoeCA8PCAyKSkgJiAweDMzMzMzMzMzO1xyXG4gICAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcclxuXHJcbiAgICB5ID0gKHkgfCAoeSA8PCA4KSkgJiAweDAwRkYwMEZGO1xyXG4gICAgeSA9ICh5IHwgKHkgPDwgNCkpICYgMHgwRjBGMEYwRjtcclxuICAgIHkgPSAoeSB8ICh5IDw8IDIpKSAmIDB4MzMzMzMzMzM7XHJcbiAgICB5ID0gKHkgfCAoeSA8PCAxKSkgJiAweDU1NTU1NTU1O1xyXG5cclxuICAgIHJldHVybiB4IHwgKHkgPDwgMSk7XHJcbn1cclxuXHJcbi8vIGZpbmQgdGhlIGxlZnRtb3N0IG5vZGUgb2YgYSBwb2x5Z29uIHJpbmdcclxuZnVuY3Rpb24gZ2V0TGVmdG1vc3Qoc3RhcnQpIHtcclxuICAgIHZhciBwID0gc3RhcnQsXHJcbiAgICAgICAgbGVmdG1vc3QgPSBzdGFydDtcclxuICAgIGRvIHtcclxuICAgICAgICBpZiAocC54IDwgbGVmdG1vc3QueCkgbGVmdG1vc3QgPSBwO1xyXG4gICAgICAgIHAgPSBwLm5leHQ7XHJcbiAgICB9IHdoaWxlIChwICE9PSBzdGFydCk7XHJcblxyXG4gICAgcmV0dXJuIGxlZnRtb3N0O1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhIHBvaW50IGxpZXMgd2l0aGluIGEgY29udmV4IHRyaWFuZ2xlXHJcbmZ1bmN0aW9uIHBvaW50SW5UcmlhbmdsZShheCwgYXksIGJ4LCBieSwgY3gsIGN5LCBweCwgcHkpIHtcclxuICAgIHJldHVybiAoY3ggLSBweCkgKiAoYXkgLSBweSkgLSAoYXggLSBweCkgKiAoY3kgLSBweSkgPj0gMCAmJlxyXG4gICAgICAgICAgIChheCAtIHB4KSAqIChieSAtIHB5KSAtIChieCAtIHB4KSAqIChheSAtIHB5KSA+PSAwICYmXHJcbiAgICAgICAgICAgKGJ4IC0gcHgpICogKGN5IC0gcHkpIC0gKGN4IC0gcHgpICogKGJ5IC0gcHkpID49IDA7XHJcbn1cclxuXHJcbi8vIGNoZWNrIGlmIGEgZGlhZ29uYWwgYmV0d2VlbiB0d28gcG9seWdvbiBub2RlcyBpcyB2YWxpZCAobGllcyBpbiBwb2x5Z29uIGludGVyaW9yKVxyXG5mdW5jdGlvbiBpc1ZhbGlkRGlhZ29uYWwoYSwgYikge1xyXG4gICAgcmV0dXJuIGEubmV4dC5pICE9PSBiLmkgJiYgYS5wcmV2LmkgIT09IGIuaSAmJiAhaW50ZXJzZWN0c1BvbHlnb24oYSwgYikgJiZcclxuICAgICAgICAgICBsb2NhbGx5SW5zaWRlKGEsIGIpICYmIGxvY2FsbHlJbnNpZGUoYiwgYSkgJiYgbWlkZGxlSW5zaWRlKGEsIGIpO1xyXG59XHJcblxyXG4vLyBzaWduZWQgYXJlYSBvZiBhIHRyaWFuZ2xlXHJcbmZ1bmN0aW9uIGFyZWEocCwgcSwgcikge1xyXG4gICAgcmV0dXJuIChxLnkgLSBwLnkpICogKHIueCAtIHEueCkgLSAocS54IC0gcC54KSAqIChyLnkgLSBxLnkpO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiB0d28gcG9pbnRzIGFyZSBlcXVhbFxyXG5mdW5jdGlvbiBlcXVhbHMocDEsIHAyKSB7XHJcbiAgICByZXR1cm4gcDEueCA9PT0gcDIueCAmJiBwMS55ID09PSBwMi55O1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiB0d28gc2VnbWVudHMgaW50ZXJzZWN0XHJcbmZ1bmN0aW9uIGludGVyc2VjdHMocDEsIHExLCBwMiwgcTIpIHtcclxuICAgIGlmICgoZXF1YWxzKHAxLCBxMSkgJiYgZXF1YWxzKHAyLCBxMikpIHx8XHJcbiAgICAgICAgKGVxdWFscyhwMSwgcTIpICYmIGVxdWFscyhwMiwgcTEpKSkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gYXJlYShwMSwgcTEsIHAyKSA+IDAgIT09IGFyZWEocDEsIHExLCBxMikgPiAwICYmXHJcbiAgICAgICAgICAgYXJlYShwMiwgcTIsIHAxKSA+IDAgIT09IGFyZWEocDIsIHEyLCBxMSkgPiAwO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhIHBvbHlnb24gZGlhZ29uYWwgaW50ZXJzZWN0cyBhbnkgcG9seWdvbiBzZWdtZW50c1xyXG5mdW5jdGlvbiBpbnRlcnNlY3RzUG9seWdvbihhLCBiKSB7XHJcbiAgICB2YXIgcCA9IGE7XHJcbiAgICBkbyB7XHJcbiAgICAgICAgaWYgKHAuaSAhPT0gYS5pICYmIHAubmV4dC5pICE9PSBhLmkgJiYgcC5pICE9PSBiLmkgJiYgcC5uZXh0LmkgIT09IGIuaSAmJlxyXG4gICAgICAgICAgICAgICAgaW50ZXJzZWN0cyhwLCBwLm5leHQsIGEsIGIpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgfSB3aGlsZSAocCAhPT0gYSk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiBhIHBvbHlnb24gZGlhZ29uYWwgaXMgbG9jYWxseSBpbnNpZGUgdGhlIHBvbHlnb25cclxuZnVuY3Rpb24gbG9jYWxseUluc2lkZShhLCBiKSB7XHJcbiAgICByZXR1cm4gYXJlYShhLnByZXYsIGEsIGEubmV4dCkgPCAwID9cclxuICAgICAgICBhcmVhKGEsIGIsIGEubmV4dCkgPj0gMCAmJiBhcmVhKGEsIGEucHJldiwgYikgPj0gMCA6XHJcbiAgICAgICAgYXJlYShhLCBiLCBhLnByZXYpIDwgMCB8fCBhcmVhKGEsIGEubmV4dCwgYikgPCAwO1xyXG59XHJcblxyXG4vLyBjaGVjayBpZiB0aGUgbWlkZGxlIHBvaW50IG9mIGEgcG9seWdvbiBkaWFnb25hbCBpcyBpbnNpZGUgdGhlIHBvbHlnb25cclxuZnVuY3Rpb24gbWlkZGxlSW5zaWRlKGEsIGIpIHtcclxuICAgIHZhciBwID0gYSxcclxuICAgICAgICBpbnNpZGUgPSBmYWxzZSxcclxuICAgICAgICBweCA9IChhLnggKyBiLngpIC8gMixcclxuICAgICAgICBweSA9IChhLnkgKyBiLnkpIC8gMjtcclxuICAgIGRvIHtcclxuICAgICAgICBpZiAoKChwLnkgPiBweSkgIT09IChwLm5leHQueSA+IHB5KSkgJiYgKHB4IDwgKHAubmV4dC54IC0gcC54KSAqIChweSAtIHAueSkgLyAocC5uZXh0LnkgLSBwLnkpICsgcC54KSlcclxuICAgICAgICAgICAgaW5zaWRlID0gIWluc2lkZTtcclxuICAgICAgICBwID0gcC5uZXh0O1xyXG4gICAgfSB3aGlsZSAocCAhPT0gYSk7XHJcblxyXG4gICAgcmV0dXJuIGluc2lkZTtcclxufVxyXG5cclxuLy8gbGluayB0d28gcG9seWdvbiB2ZXJ0aWNlcyB3aXRoIGEgYnJpZGdlOyBpZiB0aGUgdmVydGljZXMgYmVsb25nIHRvIHRoZSBzYW1lIHJpbmcsIGl0IHNwbGl0cyBwb2x5Z29uIGludG8gdHdvO1xyXG4vLyBpZiBvbmUgYmVsb25ncyB0byB0aGUgb3V0ZXIgcmluZyBhbmQgYW5vdGhlciB0byBhIGhvbGUsIGl0IG1lcmdlcyBpdCBpbnRvIGEgc2luZ2xlIHJpbmdcclxuZnVuY3Rpb24gc3BsaXRQb2x5Z29uKGEsIGIpIHtcclxuICAgIHZhciBhMiA9IG5ldyBOb2RlKGEuaSwgYS54LCBhLnkpLFxyXG4gICAgICAgIGIyID0gbmV3IE5vZGUoYi5pLCBiLngsIGIueSksXHJcbiAgICAgICAgYW4gPSBhLm5leHQsXHJcbiAgICAgICAgYnAgPSBiLnByZXY7XHJcblxyXG4gICAgYS5uZXh0ID0gYjtcclxuICAgIGIucHJldiA9IGE7XHJcblxyXG4gICAgYTIubmV4dCA9IGFuO1xyXG4gICAgYW4ucHJldiA9IGEyO1xyXG5cclxuICAgIGIyLm5leHQgPSBhMjtcclxuICAgIGEyLnByZXYgPSBiMjtcclxuXHJcbiAgICBicC5uZXh0ID0gYjI7XHJcbiAgICBiMi5wcmV2ID0gYnA7XHJcblxyXG4gICAgcmV0dXJuIGIyO1xyXG59XHJcblxyXG4vLyBjcmVhdGUgYSBub2RlIGFuZCBvcHRpb25hbGx5IGxpbmsgaXQgd2l0aCBwcmV2aW91cyBvbmUgKGluIGEgY2lyY3VsYXIgZG91Ymx5IGxpbmtlZCBsaXN0KVxyXG5mdW5jdGlvbiBpbnNlcnROb2RlKGksIHgsIHksIGxhc3QpIHtcclxuICAgIHZhciBwID0gbmV3IE5vZGUoaSwgeCwgeSk7XHJcblxyXG4gICAgaWYgKCFsYXN0KSB7XHJcbiAgICAgICAgcC5wcmV2ID0gcDtcclxuICAgICAgICBwLm5leHQgPSBwO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcC5uZXh0ID0gbGFzdC5uZXh0O1xyXG4gICAgICAgIHAucHJldiA9IGxhc3Q7XHJcbiAgICAgICAgbGFzdC5uZXh0LnByZXYgPSBwO1xyXG4gICAgICAgIGxhc3QubmV4dCA9IHA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlTm9kZShwKSB7XHJcbiAgICBwLm5leHQucHJldiA9IHAucHJldjtcclxuICAgIHAucHJldi5uZXh0ID0gcC5uZXh0O1xyXG5cclxuICAgIGlmIChwLnByZXZaKSBwLnByZXZaLm5leHRaID0gcC5uZXh0WjtcclxuICAgIGlmIChwLm5leHRaKSBwLm5leHRaLnByZXZaID0gcC5wcmV2WjtcclxufVxyXG5cclxuZnVuY3Rpb24gTm9kZShpLCB4LCB5KSB7XHJcbiAgICAvLyB2ZXJ0aWNlIGluZGV4IGluIGNvb3JkaW5hdGVzIGFycmF5XHJcbiAgICB0aGlzLmkgPSBpO1xyXG5cclxuICAgIC8vIHZlcnRleCBjb29yZGluYXRlc1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgLy8gcHJldmlvdXMgYW5kIG5leHQgdmVydGljZSBub2RlcyBpbiBhIHBvbHlnb24gcmluZ1xyXG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcclxuICAgIHRoaXMubmV4dCA9IG51bGw7XHJcblxyXG4gICAgLy8gei1vcmRlciBjdXJ2ZSB2YWx1ZVxyXG4gICAgdGhpcy56ID0gbnVsbDtcclxuXHJcbiAgICAvLyBwcmV2aW91cyBhbmQgbmV4dCBub2RlcyBpbiB6LW9yZGVyXHJcbiAgICB0aGlzLnByZXZaID0gbnVsbDtcclxuICAgIHRoaXMubmV4dFogPSBudWxsO1xyXG5cclxuICAgIC8vIGluZGljYXRlcyB3aGV0aGVyIHRoaXMgaXMgYSBzdGVpbmVyIHBvaW50XHJcbiAgICB0aGlzLnN0ZWluZXIgPSBmYWxzZTtcclxufVxyXG5cclxuLy8gcmV0dXJuIGEgcGVyY2VudGFnZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHBvbHlnb24gYXJlYSBhbmQgaXRzIHRyaWFuZ3VsYXRpb24gYXJlYTtcclxuLy8gdXNlZCB0byB2ZXJpZnkgY29ycmVjdG5lc3Mgb2YgdHJpYW5ndWxhdGlvblxyXG5lYXJjdXQuZGV2aWF0aW9uID0gZnVuY3Rpb24gKGRhdGEsIGhvbGVJbmRpY2VzLCBkaW0sIHRyaWFuZ2xlcykge1xyXG4gICAgdmFyIGhhc0hvbGVzID0gaG9sZUluZGljZXMgJiYgaG9sZUluZGljZXMubGVuZ3RoO1xyXG4gICAgdmFyIG91dGVyTGVuID0gaGFzSG9sZXMgPyBob2xlSW5kaWNlc1swXSAqIGRpbSA6IGRhdGEubGVuZ3RoO1xyXG5cclxuICAgIHZhciBwb2x5Z29uQXJlYSA9IE1hdGguYWJzKHNpZ25lZEFyZWEoZGF0YSwgMCwgb3V0ZXJMZW4sIGRpbSkpO1xyXG4gICAgaWYgKGhhc0hvbGVzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGhvbGVJbmRpY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGhvbGVJbmRpY2VzW2ldICogZGltO1xyXG4gICAgICAgICAgICB2YXIgZW5kID0gaSA8IGxlbiAtIDEgPyBob2xlSW5kaWNlc1tpICsgMV0gKiBkaW0gOiBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgcG9seWdvbkFyZWEgLT0gTWF0aC5hYnMoc2lnbmVkQXJlYShkYXRhLCBzdGFydCwgZW5kLCBkaW0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyaWFuZ2xlc0FyZWEgPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IHRyaWFuZ2xlcy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIHZhciBhID0gdHJpYW5nbGVzW2ldICogZGltO1xyXG4gICAgICAgIHZhciBiID0gdHJpYW5nbGVzW2kgKyAxXSAqIGRpbTtcclxuICAgICAgICB2YXIgYyA9IHRyaWFuZ2xlc1tpICsgMl0gKiBkaW07XHJcbiAgICAgICAgdHJpYW5nbGVzQXJlYSArPSBNYXRoLmFicyhcclxuICAgICAgICAgICAgKGRhdGFbYV0gLSBkYXRhW2NdKSAqIChkYXRhW2IgKyAxXSAtIGRhdGFbYSArIDFdKSAtXHJcbiAgICAgICAgICAgIChkYXRhW2FdIC0gZGF0YVtiXSkgKiAoZGF0YVtjICsgMV0gLSBkYXRhW2EgKyAxXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb2x5Z29uQXJlYSA9PT0gMCAmJiB0cmlhbmdsZXNBcmVhID09PSAwID8gMCA6XHJcbiAgICAgICAgTWF0aC5hYnMoKHRyaWFuZ2xlc0FyZWEgLSBwb2x5Z29uQXJlYSkgLyBwb2x5Z29uQXJlYSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzaWduZWRBcmVhKGRhdGEsIHN0YXJ0LCBlbmQsIGRpbSkge1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gc3RhcnQsIGogPSBlbmQgLSBkaW07IGkgPCBlbmQ7IGkgKz0gZGltKSB7XHJcbiAgICAgICAgc3VtICs9IChkYXRhW2pdIC0gZGF0YVtpXSkgKiAoZGF0YVtpICsgMV0gKyBkYXRhW2ogKyAxXSk7XHJcbiAgICAgICAgaiA9IGk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtO1xyXG59XHJcblxyXG4vLyB0dXJuIGEgcG9seWdvbiBpbiBhIG11bHRpLWRpbWVuc2lvbmFsIGFycmF5IGZvcm0gKGUuZy4gYXMgaW4gR2VvSlNPTikgaW50byBhIGZvcm0gRWFyY3V0IGFjY2VwdHNcclxuZWFyY3V0LmZsYXR0ZW4gPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgdmFyIGRpbSA9IGRhdGFbMF1bMF0ubGVuZ3RoLFxyXG4gICAgICAgIHJlc3VsdCA9IHt2ZXJ0aWNlczogW10sIGhvbGVzOiBbXSwgZGltZW5zaW9uczogZGltfSxcclxuICAgICAgICBob2xlSW5kZXggPSAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IGRpbTsgZCsrKSByZXN1bHQudmVydGljZXMucHVzaChkYXRhW2ldW2pdW2RdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgIGhvbGVJbmRleCArPSBkYXRhW2kgLSAxXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5ob2xlcy5wdXNoKGhvbGVJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTsiXSwic291cmNlUm9vdCI6Ii8ifQ==