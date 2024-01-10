
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/bezier.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
//var bezier = (function () {
//    function B1 (t) { return (t * t * t); }
//    function B2 (t) { return (3 * t * t * (1 - t)); }
//    function B3 (t) { return (3 * t * (1 - t) * (1 - t)); }
//    function B4 (t) { return ((1 - t) * (1 - t) * (1 - t)); }
//    function bezier (C1, C2, C3, C4, t) {
//        return C1 * B1(t) + C2 * B2(t) + C3 * B3(t) + C4 * B4(t);
//    }
//
//    //function bezier (C1, C2, C3, C4, t, out) {
//    //    out.x = C1.x * B1(t) + C2.x * B2(t) + C3.x * B3(t) + C4.x * B4(t);
//    //    out.y = C1.y * B1(t) + C2.y * B2(t) + C3.y * B3(t) + C4.y * B4(t);
//    //}
//
//    return bezier;
//})();
function bezier(C1, C2, C3, C4, t) {
  var t1 = 1 - t;
  return t1 * (t1 * (C1 + (C2 * 3 - C1) * t) + C3 * 3 * t * t) + C4 * t * t * t;
} //function bezier (c0, c1, c2, c3, t) {
//    var cy = 3.0 * (c1);
//    var by = 3.0 * (c3 - c1) - cy;
//    var ay = 1 - cy - by;
//    return (ay * t * t * t) + (by * t * t) + (cy * t);
//}
//var sin = Math.sin;


var cos = Math.cos,
    acos = Math.acos,
    max = Math.max,
    //atan2 = Math.atan2,
pi = Math.PI,
    tau = 2 * pi,
    sqrt = Math.sqrt;

function crt(v) {
  if (v < 0) {
    return -Math.pow(-v, 1 / 3);
  } else {
    return Math.pow(v, 1 / 3);
  }
} //function align (curve, line) {
//    var tx = line.p1.x,
//        ty = line.p1.y,
//        a = -atan2(line.p2.y-ty, line.p2.x-tx);
//    curve = [{x:0, y:1}, {x: curve[0], y: 1-curve[1]}, {x: curve[2], y: 1-curve[3]}, {x:1, y:0}];
//    return curve.map(function(v) {
//        return {
//            x: (v.x-tx)*cos(a) - (v.y-ty)*sin(a),
//            y: (v.x-tx)*sin(a) + (v.y-ty)*cos(a)
//        };
//    });
//}
// Modified from http://jsbin.com/yibipofeqi/1/edit, optimized for animations.
// The origin Cardano's algorithm is based on http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm


function cardano(curve, x) {
  // align curve with the intersecting line:
  //var line = {p1: {x: x, y: 0}, p2: {x: x, y: 1}};
  //var aligned = align(curve, line);
  //// and rewrite from [a(1-t)^3 + 3bt(1-t)^2 + 3c(1-t)t^2 + dt^3] form
  //    pa = aligned[0].y,
  //    pb = aligned[1].y,
  //    pc = aligned[2].y,
  //    pd = aligned[3].y;
  ////// curve = [{x:0, y:1}, {x: curve[0], y: 1-curve[1]}, {x: curve[2], y: 1-curve[3]}, {x:1, y:0}];
  var pa = x - 0;
  var pb = x - curve[0];
  var pc = x - curve[2];
  var pd = x - 1; // to [t^3 + at^2 + bt + c] form:

  var pa3 = pa * 3;
  var pb3 = pb * 3;
  var pc3 = pc * 3;
  var d = -pa + pb3 - pc3 + pd,
      rd = 1 / d,
      r3 = 1 / 3,
      a = (pa3 - 6 * pb + pc3) * rd,
      a3 = a * r3,
      b = (-pa3 + pb3) * rd,
      c = pa * rd,
      // then, determine p and q:
  p = (3 * b - a * a) * r3,
      p3 = p * r3,
      q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
      q2 = q / 2,
      // and determine the discriminant:
  discriminant = q2 * q2 + p3 * p3 * p3,
      // and some reserved variables
  u1,
      v1,
      x1,
      x2,
      x3; // If the discriminant is negative, use polar coordinates
  // to get around square roots of negative numbers

  if (discriminant < 0) {
    var mp3 = -p * r3,
        mp33 = mp3 * mp3 * mp3,
        r = sqrt(mp33),
        // compute cosphi corrected for IEEE float rounding:
    t = -q / (2 * r),
        cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
        phi = acos(cosphi),
        crtr = crt(r),
        t1 = 2 * crtr;
    x1 = t1 * cos(phi * r3) - a3;
    x2 = t1 * cos((phi + tau) * r3) - a3;
    x3 = t1 * cos((phi + 2 * tau) * r3) - a3; // choose best percentage

    if (0 <= x1 && x1 <= 1) {
      if (0 <= x2 && x2 <= 1) {
        if (0 <= x3 && x3 <= 1) {
          return max(x1, x2, x3);
        } else {
          return max(x1, x2);
        }
      } else if (0 <= x3 && x3 <= 1) {
        return max(x1, x3);
      } else {
        return x1;
      }
    } else {
      if (0 <= x2 && x2 <= 1) {
        if (0 <= x3 && x3 <= 1) {
          return max(x2, x3);
        } else {
          return x2;
        }
      } else {
        return x3;
      }
    }
  } else if (discriminant === 0) {
    u1 = q2 < 0 ? crt(-q2) : -crt(q2);
    x1 = 2 * u1 - a3;
    x2 = -u1 - a3; // choose best percentage

    if (0 <= x1 && x1 <= 1) {
      if (0 <= x2 && x2 <= 1) {
        return max(x1, x2);
      } else {
        return x1;
      }
    } else {
      return x2;
    }
  } // one real root, and two imaginary roots
  else {
      var sd = sqrt(discriminant);
      u1 = crt(-q2 + sd);
      v1 = crt(q2 + sd);
      x1 = u1 - v1 - a3;
      return x1;
    }
}

function bezierByTime(controlPoints, x) {
  var percent = cardano(controlPoints, x); // t

  var p1y = controlPoints[1]; // b

  var p2y = controlPoints[3]; // c
  // return bezier(0, p1y, p2y, 1, percent);

  return ((1 - percent) * (p1y + (p2y - p1y) * percent) * 3 + percent * percent) * percent;
}

if (CC_TEST) {
  cc._Test.bezier = bezier;
  cc._Test.bezierByTime = bezierByTime;
}

module.exports = {
  bezier: bezier,
  bezierByTime: bezierByTime
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGFuaW1hdGlvblxcYmV6aWVyLmpzIl0sIm5hbWVzIjpbImJlemllciIsIkMxIiwiQzIiLCJDMyIsIkM0IiwidCIsInQxIiwiY29zIiwiTWF0aCIsImFjb3MiLCJtYXgiLCJwaSIsIlBJIiwidGF1Iiwic3FydCIsImNydCIsInYiLCJwb3ciLCJjYXJkYW5vIiwiY3VydmUiLCJ4IiwicGEiLCJwYiIsInBjIiwicGQiLCJwYTMiLCJwYjMiLCJwYzMiLCJkIiwicmQiLCJyMyIsImEiLCJhMyIsImIiLCJjIiwicCIsInAzIiwicSIsInEyIiwiZGlzY3JpbWluYW50IiwidTEiLCJ2MSIsIngxIiwieDIiLCJ4MyIsIm1wMyIsIm1wMzMiLCJyIiwiY29zcGhpIiwicGhpIiwiY3J0ciIsInNkIiwiYmV6aWVyQnlUaW1lIiwiY29udHJvbFBvaW50cyIsInBlcmNlbnQiLCJwMXkiLCJwMnkiLCJDQ19URVNUIiwiY2MiLCJfVGVzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNBLE1BQVQsQ0FBaUJDLEVBQWpCLEVBQXFCQyxFQUFyQixFQUF5QkMsRUFBekIsRUFBNkJDLEVBQTdCLEVBQWlDQyxDQUFqQyxFQUFvQztBQUNoQyxNQUFJQyxFQUFFLEdBQUcsSUFBSUQsQ0FBYjtBQUNBLFNBQU9DLEVBQUUsSUFBSUEsRUFBRSxJQUFJTCxFQUFFLEdBQUcsQ0FBQ0MsRUFBRSxHQUFHLENBQUwsR0FBU0QsRUFBVixJQUFnQkksQ0FBekIsQ0FBRixHQUFnQ0YsRUFBRSxHQUFHLENBQUwsR0FBU0UsQ0FBVCxHQUFhQSxDQUFqRCxDQUFGLEdBQXdERCxFQUFFLEdBQUdDLENBQUwsR0FBU0EsQ0FBVCxHQUFhQSxDQUE1RTtBQUNILEVBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBLElBQUlFLEdBQUcsR0FBR0MsSUFBSSxDQUFDRCxHQUFmO0FBQUEsSUFDSUUsSUFBSSxHQUFHRCxJQUFJLENBQUNDLElBRGhCO0FBQUEsSUFFSUMsR0FBRyxHQUFHRixJQUFJLENBQUNFLEdBRmY7QUFBQSxJQUdJO0FBQ0FDLEVBQUUsR0FBR0gsSUFBSSxDQUFDSSxFQUpkO0FBQUEsSUFLSUMsR0FBRyxHQUFHLElBQUlGLEVBTGQ7QUFBQSxJQU1JRyxJQUFJLEdBQUdOLElBQUksQ0FBQ00sSUFOaEI7O0FBUUEsU0FBU0MsR0FBVCxDQUFjQyxDQUFkLEVBQWlCO0FBQ2IsTUFBSUEsQ0FBQyxHQUFHLENBQVIsRUFBVztBQUNQLFdBQU8sQ0FBQ1IsSUFBSSxDQUFDUyxHQUFMLENBQVMsQ0FBQ0QsQ0FBVixFQUFhLElBQUksQ0FBakIsQ0FBUjtBQUNILEdBRkQsTUFHSztBQUNELFdBQU9SLElBQUksQ0FBQ1MsR0FBTCxDQUFTRCxDQUFULEVBQVksSUFBSSxDQUFoQixDQUFQO0FBQ0g7QUFDSixFQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7OztBQUNBLFNBQVNFLE9BQVQsQ0FBa0JDLEtBQWxCLEVBQXlCQyxDQUF6QixFQUE0QjtBQUN4QjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSixNQUFJQyxFQUFFLEdBQUdELENBQUMsR0FBRyxDQUFiO0FBQ0EsTUFBSUUsRUFBRSxHQUFHRixDQUFDLEdBQUdELEtBQUssQ0FBQyxDQUFELENBQWxCO0FBQ0EsTUFBSUksRUFBRSxHQUFHSCxDQUFDLEdBQUdELEtBQUssQ0FBQyxDQUFELENBQWxCO0FBQ0EsTUFBSUssRUFBRSxHQUFHSixDQUFDLEdBQUcsQ0FBYixDQWJ3QixDQWV4Qjs7QUFDQSxNQUFJSyxHQUFHLEdBQUdKLEVBQUUsR0FBRyxDQUFmO0FBQ0EsTUFBSUssR0FBRyxHQUFHSixFQUFFLEdBQUcsQ0FBZjtBQUNBLE1BQUlLLEdBQUcsR0FBR0osRUFBRSxHQUFHLENBQWY7QUFDQSxNQUFJSyxDQUFDLEdBQUksQ0FBQ1AsRUFBRCxHQUFNSyxHQUFOLEdBQVlDLEdBQVosR0FBa0JILEVBQTNCO0FBQUEsTUFDSUssRUFBRSxHQUFHLElBQUlELENBRGI7QUFBQSxNQUVJRSxFQUFFLEdBQUcsSUFBSSxDQUZiO0FBQUEsTUFHSUMsQ0FBQyxHQUFHLENBQUNOLEdBQUcsR0FBRyxJQUFJSCxFQUFWLEdBQWVLLEdBQWhCLElBQXVCRSxFQUgvQjtBQUFBLE1BSUlHLEVBQUUsR0FBR0QsQ0FBQyxHQUFHRCxFQUpiO0FBQUEsTUFLSUcsQ0FBQyxHQUFHLENBQUMsQ0FBQ1IsR0FBRCxHQUFPQyxHQUFSLElBQWVHLEVBTHZCO0FBQUEsTUFNSUssQ0FBQyxHQUFHYixFQUFFLEdBQUdRLEVBTmI7QUFBQSxNQU9BO0FBQ0lNLEVBQUFBLENBQUMsR0FBRyxDQUFDLElBQUlGLENBQUosR0FBUUYsQ0FBQyxHQUFHQSxDQUFiLElBQWtCRCxFQVIxQjtBQUFBLE1BU0lNLEVBQUUsR0FBR0QsQ0FBQyxHQUFHTCxFQVRiO0FBQUEsTUFVSU8sQ0FBQyxHQUFHLENBQUMsSUFBSU4sQ0FBSixHQUFRQSxDQUFSLEdBQVlBLENBQVosR0FBZ0IsSUFBSUEsQ0FBSixHQUFRRSxDQUF4QixHQUE0QixLQUFLQyxDQUFsQyxJQUF1QyxFQVYvQztBQUFBLE1BV0lJLEVBQUUsR0FBR0QsQ0FBQyxHQUFHLENBWGI7QUFBQSxNQVlBO0FBQ0lFLEVBQUFBLFlBQVksR0FBR0QsRUFBRSxHQUFHQSxFQUFMLEdBQVVGLEVBQUUsR0FBR0EsRUFBTCxHQUFVQSxFQWJ2QztBQUFBLE1BY0E7QUFDSUksRUFBQUEsRUFmSjtBQUFBLE1BZVFDLEVBZlI7QUFBQSxNQWVZQyxFQWZaO0FBQUEsTUFlZ0JDLEVBZmhCO0FBQUEsTUFlb0JDLEVBZnBCLENBbkJ3QixDQW9DeEI7QUFDQTs7QUFDQSxNQUFJTCxZQUFZLEdBQUcsQ0FBbkIsRUFBc0I7QUFDbEIsUUFBSU0sR0FBRyxHQUFHLENBQUNWLENBQUQsR0FBS0wsRUFBZjtBQUFBLFFBQ0lnQixJQUFJLEdBQUdELEdBQUcsR0FBR0EsR0FBTixHQUFZQSxHQUR2QjtBQUFBLFFBRUlFLENBQUMsR0FBR2pDLElBQUksQ0FBQ2dDLElBQUQsQ0FGWjtBQUFBLFFBR0E7QUFDSXpDLElBQUFBLENBQUMsR0FBRyxDQUFDZ0MsQ0FBRCxJQUFNLElBQUlVLENBQVYsQ0FKUjtBQUFBLFFBS0lDLE1BQU0sR0FBRzNDLENBQUMsR0FBRyxDQUFDLENBQUwsR0FBUyxDQUFDLENBQVYsR0FBY0EsQ0FBQyxHQUFHLENBQUosR0FBUSxDQUFSLEdBQVlBLENBTHZDO0FBQUEsUUFNSTRDLEdBQUcsR0FBR3hDLElBQUksQ0FBQ3VDLE1BQUQsQ0FOZDtBQUFBLFFBT0lFLElBQUksR0FBR25DLEdBQUcsQ0FBQ2dDLENBQUQsQ0FQZDtBQUFBLFFBUUl6QyxFQUFFLEdBQUcsSUFBSTRDLElBUmI7QUFTQVIsSUFBQUEsRUFBRSxHQUFHcEMsRUFBRSxHQUFHQyxHQUFHLENBQUMwQyxHQUFHLEdBQUduQixFQUFQLENBQVIsR0FBcUJFLEVBQTFCO0FBQ0FXLElBQUFBLEVBQUUsR0FBR3JDLEVBQUUsR0FBR0MsR0FBRyxDQUFDLENBQUMwQyxHQUFHLEdBQUdwQyxHQUFQLElBQWNpQixFQUFmLENBQVIsR0FBNkJFLEVBQWxDO0FBQ0FZLElBQUFBLEVBQUUsR0FBR3RDLEVBQUUsR0FBR0MsR0FBRyxDQUFDLENBQUMwQyxHQUFHLEdBQUcsSUFBSXBDLEdBQVgsSUFBa0JpQixFQUFuQixDQUFSLEdBQWlDRSxFQUF0QyxDQVprQixDQWNsQjs7QUFDQSxRQUFJLEtBQUtVLEVBQUwsSUFBV0EsRUFBRSxJQUFJLENBQXJCLEVBQXdCO0FBQ3BCLFVBQUksS0FBS0MsRUFBTCxJQUFXQSxFQUFFLElBQUksQ0FBckIsRUFBd0I7QUFDcEIsWUFBSSxLQUFLQyxFQUFMLElBQVdBLEVBQUUsSUFBSSxDQUFyQixFQUF3QjtBQUNwQixpQkFBT2xDLEdBQUcsQ0FBQ2dDLEVBQUQsRUFBS0MsRUFBTCxFQUFTQyxFQUFULENBQVY7QUFDSCxTQUZELE1BR0s7QUFDRCxpQkFBT2xDLEdBQUcsQ0FBQ2dDLEVBQUQsRUFBS0MsRUFBTCxDQUFWO0FBQ0g7QUFDSixPQVBELE1BUUssSUFBSSxLQUFLQyxFQUFMLElBQVdBLEVBQUUsSUFBSSxDQUFyQixFQUF3QjtBQUN6QixlQUFPbEMsR0FBRyxDQUFDZ0MsRUFBRCxFQUFLRSxFQUFMLENBQVY7QUFDSCxPQUZJLE1BR0E7QUFDRCxlQUFPRixFQUFQO0FBQ0g7QUFDSixLQWZELE1BZ0JLO0FBQ0QsVUFBSSxLQUFLQyxFQUFMLElBQVdBLEVBQUUsSUFBSSxDQUFyQixFQUF3QjtBQUNwQixZQUFJLEtBQUtDLEVBQUwsSUFBV0EsRUFBRSxJQUFJLENBQXJCLEVBQXdCO0FBQ3BCLGlCQUFPbEMsR0FBRyxDQUFDaUMsRUFBRCxFQUFLQyxFQUFMLENBQVY7QUFDSCxTQUZELE1BR0s7QUFDRCxpQkFBT0QsRUFBUDtBQUNIO0FBQ0osT0FQRCxNQVFLO0FBQ0QsZUFBT0MsRUFBUDtBQUNIO0FBQ0o7QUFDSixHQTVDRCxNQTZDSyxJQUFJTCxZQUFZLEtBQUssQ0FBckIsRUFBd0I7QUFDekJDLElBQUFBLEVBQUUsR0FBR0YsRUFBRSxHQUFHLENBQUwsR0FBU3ZCLEdBQUcsQ0FBQyxDQUFDdUIsRUFBRixDQUFaLEdBQW9CLENBQUN2QixHQUFHLENBQUN1QixFQUFELENBQTdCO0FBQ0FJLElBQUFBLEVBQUUsR0FBRyxJQUFJRixFQUFKLEdBQVNSLEVBQWQ7QUFDQVcsSUFBQUEsRUFBRSxHQUFHLENBQUNILEVBQUQsR0FBTVIsRUFBWCxDQUh5QixDQUt6Qjs7QUFDQSxRQUFJLEtBQUtVLEVBQUwsSUFBV0EsRUFBRSxJQUFJLENBQXJCLEVBQXdCO0FBQ3BCLFVBQUksS0FBS0MsRUFBTCxJQUFXQSxFQUFFLElBQUksQ0FBckIsRUFBd0I7QUFDcEIsZUFBT2pDLEdBQUcsQ0FBQ2dDLEVBQUQsRUFBS0MsRUFBTCxDQUFWO0FBQ0gsT0FGRCxNQUdLO0FBQ0QsZUFBT0QsRUFBUDtBQUNIO0FBQ0osS0FQRCxNQVFLO0FBQ0QsYUFBT0MsRUFBUDtBQUNIO0FBQ0osR0FqQkksQ0FrQkw7QUFsQkssT0FtQkE7QUFDRCxVQUFJUSxFQUFFLEdBQUdyQyxJQUFJLENBQUN5QixZQUFELENBQWI7QUFDQUMsTUFBQUEsRUFBRSxHQUFHekIsR0FBRyxDQUFDLENBQUN1QixFQUFELEdBQU1hLEVBQVAsQ0FBUjtBQUNBVixNQUFBQSxFQUFFLEdBQUcxQixHQUFHLENBQUN1QixFQUFFLEdBQUdhLEVBQU4sQ0FBUjtBQUNBVCxNQUFBQSxFQUFFLEdBQUdGLEVBQUUsR0FBR0MsRUFBTCxHQUFVVCxFQUFmO0FBQ0EsYUFBT1UsRUFBUDtBQUNIO0FBQ0o7O0FBRUQsU0FBU1UsWUFBVCxDQUF1QkMsYUFBdkIsRUFBc0NqQyxDQUF0QyxFQUF5QztBQUNyQyxNQUFJa0MsT0FBTyxHQUFHcEMsT0FBTyxDQUFDbUMsYUFBRCxFQUFnQmpDLENBQWhCLENBQXJCLENBRHFDLENBQ087O0FBQzVDLE1BQUltQyxHQUFHLEdBQUdGLGFBQWEsQ0FBQyxDQUFELENBQXZCLENBRnFDLENBRVQ7O0FBQzVCLE1BQUlHLEdBQUcsR0FBR0gsYUFBYSxDQUFDLENBQUQsQ0FBdkIsQ0FIcUMsQ0FHVDtBQUM1Qjs7QUFDQSxTQUFPLENBQUMsQ0FBQyxJQUFJQyxPQUFMLEtBQWlCQyxHQUFHLEdBQUcsQ0FBQ0MsR0FBRyxHQUFHRCxHQUFQLElBQWNELE9BQXJDLElBQWdELENBQWhELEdBQW9EQSxPQUFPLEdBQUdBLE9BQS9ELElBQTBFQSxPQUFqRjtBQUNIOztBQUVELElBQUlHLE9BQUosRUFBYTtBQUNUQyxFQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUzNELE1BQVQsR0FBa0JBLE1BQWxCO0FBQ0EwRCxFQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBU1AsWUFBVCxHQUF3QkEsWUFBeEI7QUFDSDs7QUFFRFEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2I3RCxFQUFBQSxNQUFNLEVBQUVBLE1BREs7QUFFYm9ELEVBQUFBLFlBQVksRUFBRUE7QUFGRCxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vdmFyIGJlemllciA9IChmdW5jdGlvbiAoKSB7XG4vLyAgICBmdW5jdGlvbiBCMSAodCkgeyByZXR1cm4gKHQgKiB0ICogdCk7IH1cbi8vICAgIGZ1bmN0aW9uIEIyICh0KSB7IHJldHVybiAoMyAqIHQgKiB0ICogKDEgLSB0KSk7IH1cbi8vICAgIGZ1bmN0aW9uIEIzICh0KSB7IHJldHVybiAoMyAqIHQgKiAoMSAtIHQpICogKDEgLSB0KSk7IH1cbi8vICAgIGZ1bmN0aW9uIEI0ICh0KSB7IHJldHVybiAoKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpKTsgfVxuLy8gICAgZnVuY3Rpb24gYmV6aWVyIChDMSwgQzIsIEMzLCBDNCwgdCkge1xuLy8gICAgICAgIHJldHVybiBDMSAqIEIxKHQpICsgQzIgKiBCMih0KSArIEMzICogQjModCkgKyBDNCAqIEI0KHQpO1xuLy8gICAgfVxuLy9cbi8vICAgIC8vZnVuY3Rpb24gYmV6aWVyIChDMSwgQzIsIEMzLCBDNCwgdCwgb3V0KSB7XG4vLyAgICAvLyAgICBvdXQueCA9IEMxLnggKiBCMSh0KSArIEMyLnggKiBCMih0KSArIEMzLnggKiBCMyh0KSArIEM0LnggKiBCNCh0KTtcbi8vICAgIC8vICAgIG91dC55ID0gQzEueSAqIEIxKHQpICsgQzIueSAqIEIyKHQpICsgQzMueSAqIEIzKHQpICsgQzQueSAqIEI0KHQpO1xuLy8gICAgLy99XG4vL1xuLy8gICAgcmV0dXJuIGJlemllcjtcbi8vfSkoKTtcbmZ1bmN0aW9uIGJlemllciAoQzEsIEMyLCBDMywgQzQsIHQpIHtcbiAgICB2YXIgdDEgPSAxIC0gdDtcbiAgICByZXR1cm4gdDEgKiAodDEgKiAoQzEgKyAoQzIgKiAzIC0gQzEpICogdCkgKyBDMyAqIDMgKiB0ICogdCkgKyBDNCAqIHQgKiB0ICogdDtcbn1cbi8vZnVuY3Rpb24gYmV6aWVyIChjMCwgYzEsIGMyLCBjMywgdCkge1xuLy8gICAgdmFyIGN5ID0gMy4wICogKGMxKTtcbi8vICAgIHZhciBieSA9IDMuMCAqIChjMyAtIGMxKSAtIGN5O1xuLy8gICAgdmFyIGF5ID0gMSAtIGN5IC0gYnk7XG4vLyAgICByZXR1cm4gKGF5ICogdCAqIHQgKiB0KSArIChieSAqIHQgKiB0KSArIChjeSAqIHQpO1xuLy99XG5cbi8vdmFyIHNpbiA9IE1hdGguc2luO1xudmFyIGNvcyA9IE1hdGguY29zLFxuICAgIGFjb3MgPSBNYXRoLmFjb3MsXG4gICAgbWF4ID0gTWF0aC5tYXgsXG4gICAgLy9hdGFuMiA9IE1hdGguYXRhbjIsXG4gICAgcGkgPSBNYXRoLlBJLFxuICAgIHRhdSA9IDIgKiBwaSxcbiAgICBzcXJ0ID0gTWF0aC5zcXJ0O1xuXG5mdW5jdGlvbiBjcnQgKHYpIHtcbiAgICBpZiAodiA8IDApIHtcbiAgICAgICAgcmV0dXJuIC1NYXRoLnBvdygtdiwgMSAvIDMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucG93KHYsIDEgLyAzKTtcbiAgICB9XG59XG5cbi8vZnVuY3Rpb24gYWxpZ24gKGN1cnZlLCBsaW5lKSB7XG4vLyAgICB2YXIgdHggPSBsaW5lLnAxLngsXG4vLyAgICAgICAgdHkgPSBsaW5lLnAxLnksXG4vLyAgICAgICAgYSA9IC1hdGFuMihsaW5lLnAyLnktdHksIGxpbmUucDIueC10eCk7XG4vLyAgICBjdXJ2ZSA9IFt7eDowLCB5OjF9LCB7eDogY3VydmVbMF0sIHk6IDEtY3VydmVbMV19LCB7eDogY3VydmVbMl0sIHk6IDEtY3VydmVbM119LCB7eDoxLCB5OjB9XTtcbi8vICAgIHJldHVybiBjdXJ2ZS5tYXAoZnVuY3Rpb24odikge1xuLy8gICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgIHg6ICh2LngtdHgpKmNvcyhhKSAtICh2LnktdHkpKnNpbihhKSxcbi8vICAgICAgICAgICAgeTogKHYueC10eCkqc2luKGEpICsgKHYueS10eSkqY29zKGEpXG4vLyAgICAgICAgfTtcbi8vICAgIH0pO1xuLy99XG5cbi8vIE1vZGlmaWVkIGZyb20gaHR0cDovL2pzYmluLmNvbS95aWJpcG9mZXFpLzEvZWRpdCwgb3B0aW1pemVkIGZvciBhbmltYXRpb25zLlxuLy8gVGhlIG9yaWdpbiBDYXJkYW5vJ3MgYWxnb3JpdGhtIGlzIGJhc2VkIG9uIGh0dHA6Ly93d3cudHJhbnM0bWluZC5jb20vcGVyc29uYWxfZGV2ZWxvcG1lbnQvbWF0aGVtYXRpY3MvcG9seW5vbWlhbHMvY3ViaWNBbGdlYnJhLmh0bVxuZnVuY3Rpb24gY2FyZGFubyAoY3VydmUsIHgpIHtcbiAgICAvLyBhbGlnbiBjdXJ2ZSB3aXRoIHRoZSBpbnRlcnNlY3RpbmcgbGluZTpcbiAgICAgICAgLy92YXIgbGluZSA9IHtwMToge3g6IHgsIHk6IDB9LCBwMjoge3g6IHgsIHk6IDF9fTtcbiAgICAgICAgLy92YXIgYWxpZ25lZCA9IGFsaWduKGN1cnZlLCBsaW5lKTtcbiAgICAgICAgLy8vLyBhbmQgcmV3cml0ZSBmcm9tIFthKDEtdCleMyArIDNidCgxLXQpXjIgKyAzYygxLXQpdF4yICsgZHReM10gZm9ybVxuICAgICAgICAvLyAgICBwYSA9IGFsaWduZWRbMF0ueSxcbiAgICAgICAgLy8gICAgcGIgPSBhbGlnbmVkWzFdLnksXG4gICAgICAgIC8vICAgIHBjID0gYWxpZ25lZFsyXS55LFxuICAgICAgICAvLyAgICBwZCA9IGFsaWduZWRbM10ueTtcbiAgICAgICAgLy8vLy8vIGN1cnZlID0gW3t4OjAsIHk6MX0sIHt4OiBjdXJ2ZVswXSwgeTogMS1jdXJ2ZVsxXX0sIHt4OiBjdXJ2ZVsyXSwgeTogMS1jdXJ2ZVszXX0sIHt4OjEsIHk6MH1dO1xuICAgIHZhciBwYSA9IHggLSAwO1xuICAgIHZhciBwYiA9IHggLSBjdXJ2ZVswXTtcbiAgICB2YXIgcGMgPSB4IC0gY3VydmVbMl07XG4gICAgdmFyIHBkID0geCAtIDE7XG5cbiAgICAvLyB0byBbdF4zICsgYXReMiArIGJ0ICsgY10gZm9ybTpcbiAgICB2YXIgcGEzID0gcGEgKiAzO1xuICAgIHZhciBwYjMgPSBwYiAqIDM7XG4gICAgdmFyIHBjMyA9IHBjICogMztcbiAgICB2YXIgZCA9ICgtcGEgKyBwYjMgLSBwYzMgKyBwZCksXG4gICAgICAgIHJkID0gMSAvIGQsXG4gICAgICAgIHIzID0gMSAvIDMsXG4gICAgICAgIGEgPSAocGEzIC0gNiAqIHBiICsgcGMzKSAqIHJkLFxuICAgICAgICBhMyA9IGEgKiByMyxcbiAgICAgICAgYiA9ICgtcGEzICsgcGIzKSAqIHJkLFxuICAgICAgICBjID0gcGEgKiByZCxcbiAgICAvLyB0aGVuLCBkZXRlcm1pbmUgcCBhbmQgcTpcbiAgICAgICAgcCA9ICgzICogYiAtIGEgKiBhKSAqIHIzLFxuICAgICAgICBwMyA9IHAgKiByMyxcbiAgICAgICAgcSA9ICgyICogYSAqIGEgKiBhIC0gOSAqIGEgKiBiICsgMjcgKiBjKSAvIDI3LFxuICAgICAgICBxMiA9IHEgLyAyLFxuICAgIC8vIGFuZCBkZXRlcm1pbmUgdGhlIGRpc2NyaW1pbmFudDpcbiAgICAgICAgZGlzY3JpbWluYW50ID0gcTIgKiBxMiArIHAzICogcDMgKiBwMyxcbiAgICAvLyBhbmQgc29tZSByZXNlcnZlZCB2YXJpYWJsZXNcbiAgICAgICAgdTEsIHYxLCB4MSwgeDIsIHgzO1xuXG4gICAgLy8gSWYgdGhlIGRpc2NyaW1pbmFudCBpcyBuZWdhdGl2ZSwgdXNlIHBvbGFyIGNvb3JkaW5hdGVzXG4gICAgLy8gdG8gZ2V0IGFyb3VuZCBzcXVhcmUgcm9vdHMgb2YgbmVnYXRpdmUgbnVtYmVyc1xuICAgIGlmIChkaXNjcmltaW5hbnQgPCAwKSB7XG4gICAgICAgIHZhciBtcDMgPSAtcCAqIHIzLFxuICAgICAgICAgICAgbXAzMyA9IG1wMyAqIG1wMyAqIG1wMyxcbiAgICAgICAgICAgIHIgPSBzcXJ0KG1wMzMpLFxuICAgICAgICAvLyBjb21wdXRlIGNvc3BoaSBjb3JyZWN0ZWQgZm9yIElFRUUgZmxvYXQgcm91bmRpbmc6XG4gICAgICAgICAgICB0ID0gLXEgLyAoMiAqIHIpLFxuICAgICAgICAgICAgY29zcGhpID0gdCA8IC0xID8gLTEgOiB0ID4gMSA/IDEgOiB0LFxuICAgICAgICAgICAgcGhpID0gYWNvcyhjb3NwaGkpLFxuICAgICAgICAgICAgY3J0ciA9IGNydChyKSxcbiAgICAgICAgICAgIHQxID0gMiAqIGNydHI7XG4gICAgICAgIHgxID0gdDEgKiBjb3MocGhpICogcjMpIC0gYTM7XG4gICAgICAgIHgyID0gdDEgKiBjb3MoKHBoaSArIHRhdSkgKiByMykgLSBhMztcbiAgICAgICAgeDMgPSB0MSAqIGNvcygocGhpICsgMiAqIHRhdSkgKiByMykgLSBhMztcblxuICAgICAgICAvLyBjaG9vc2UgYmVzdCBwZXJjZW50YWdlXG4gICAgICAgIGlmICgwIDw9IHgxICYmIHgxIDw9IDEpIHtcbiAgICAgICAgICAgIGlmICgwIDw9IHgyICYmIHgyIDw9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoMCA8PSB4MyAmJiB4MyA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXgoeDEsIHgyLCB4Myk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF4KHgxLCB4Mik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoMCA8PSB4MyAmJiB4MyA8PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1heCh4MSwgeDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKDAgPD0geDIgJiYgeDIgPD0gMSkge1xuICAgICAgICAgICAgICAgIGlmICgwIDw9IHgzICYmIHgzIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1heCh4MiwgeDMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB4MztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkaXNjcmltaW5hbnQgPT09IDApIHtcbiAgICAgICAgdTEgPSBxMiA8IDAgPyBjcnQoLXEyKSA6IC1jcnQocTIpO1xuICAgICAgICB4MSA9IDIgKiB1MSAtIGEzO1xuICAgICAgICB4MiA9IC11MSAtIGEzO1xuXG4gICAgICAgIC8vIGNob29zZSBiZXN0IHBlcmNlbnRhZ2VcbiAgICAgICAgaWYgKDAgPD0geDEgJiYgeDEgPD0gMSkge1xuICAgICAgICAgICAgaWYgKDAgPD0geDIgJiYgeDIgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXgoeDEsIHgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB4MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB4MjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBvbmUgcmVhbCByb290LCBhbmQgdHdvIGltYWdpbmFyeSByb290c1xuICAgIGVsc2Uge1xuICAgICAgICB2YXIgc2QgPSBzcXJ0KGRpc2NyaW1pbmFudCk7XG4gICAgICAgIHUxID0gY3J0KC1xMiArIHNkKTtcbiAgICAgICAgdjEgPSBjcnQocTIgKyBzZCk7XG4gICAgICAgIHgxID0gdTEgLSB2MSAtIGEzO1xuICAgICAgICByZXR1cm4geDE7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBiZXppZXJCeVRpbWUgKGNvbnRyb2xQb2ludHMsIHgpIHtcbiAgICB2YXIgcGVyY2VudCA9IGNhcmRhbm8oY29udHJvbFBvaW50cywgeCk7ICAgIC8vIHRcbiAgICB2YXIgcDF5ID0gY29udHJvbFBvaW50c1sxXTsgLy8gYlxuICAgIHZhciBwMnkgPSBjb250cm9sUG9pbnRzWzNdOyAvLyBjXG4gICAgLy8gcmV0dXJuIGJlemllcigwLCBwMXksIHAyeSwgMSwgcGVyY2VudCk7XG4gICAgcmV0dXJuICgoMSAtIHBlcmNlbnQpICogKHAxeSArIChwMnkgLSBwMXkpICogcGVyY2VudCkgKiAzICsgcGVyY2VudCAqIHBlcmNlbnQpICogcGVyY2VudDtcbn1cblxuaWYgKENDX1RFU1QpIHtcbiAgICBjYy5fVGVzdC5iZXppZXIgPSBiZXppZXI7XG4gICAgY2MuX1Rlc3QuYmV6aWVyQnlUaW1lID0gYmV6aWVyQnlUaW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBiZXppZXI6IGJlemllcixcbiAgICBiZXppZXJCeVRpbWU6IGJlemllckJ5VGltZVxufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9