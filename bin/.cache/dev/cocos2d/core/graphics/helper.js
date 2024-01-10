
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/graphics/helper.js';
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
var PointFlags = require('./types').PointFlags;

var PI = Math.PI;
var min = Math.min;
var max = Math.max;
var cos = Math.cos;
var sin = Math.sin;
var abs = Math.abs;
var sign = Math.sign;
var KAPPA90 = 0.5522847493;

function arc(ctx, cx, cy, r, startAngle, endAngle, counterclockwise) {
  counterclockwise = counterclockwise || false;
  var a = 0,
      da = 0,
      hda = 0,
      kappa = 0;
  var dx = 0,
      dy = 0,
      x = 0,
      y = 0,
      tanx = 0,
      tany = 0;
  var px = 0,
      py = 0,
      ptanx = 0,
      ptany = 0;
  var i, ndivs; // Clamp angles

  da = endAngle - startAngle;

  if (counterclockwise) {
    if (abs(da) >= PI * 2) {
      da = PI * 2;
    } else {
      while (da < 0) {
        da += PI * 2;
      }
    }
  } else {
    if (abs(da) >= PI * 2) {
      da = -PI * 2;
    } else {
      while (da > 0) {
        da -= PI * 2;
      }
    }
  } // Split arc into max 90 degree segments.


  ndivs = max(1, min(abs(da) / (PI * 0.5) + 0.5, 5)) | 0;
  hda = da / ndivs / 2.0;
  kappa = abs(4.0 / 3.0 * (1 - cos(hda)) / sin(hda));
  if (!counterclockwise) kappa = -kappa;

  for (i = 0; i <= ndivs; i++) {
    a = startAngle + da * (i / ndivs);
    dx = cos(a);
    dy = sin(a);
    x = cx + dx * r;
    y = cy + dy * r;
    tanx = -dy * r * kappa;
    tany = dx * r * kappa;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.bezierCurveTo(px + ptanx, py + ptany, x - tanx, y - tany, x, y);
    }

    px = x;
    py = y;
    ptanx = tanx;
    ptany = tany;
  }
}

function ellipse(ctx, cx, cy, rx, ry) {
  ctx.moveTo(cx - rx, cy);
  ctx.bezierCurveTo(cx - rx, cy + ry * KAPPA90, cx - rx * KAPPA90, cy + ry, cx, cy + ry);
  ctx.bezierCurveTo(cx + rx * KAPPA90, cy + ry, cx + rx, cy + ry * KAPPA90, cx + rx, cy);
  ctx.bezierCurveTo(cx + rx, cy - ry * KAPPA90, cx + rx * KAPPA90, cy - ry, cx, cy - ry);
  ctx.bezierCurveTo(cx - rx * KAPPA90, cy - ry, cx - rx, cy - ry * KAPPA90, cx - rx, cy);
  ctx.close();
}

function roundRect(ctx, x, y, w, h, r) {
  if (r < 0.1) {
    ctx.rect(x, y, w, h);
    return;
  } else {
    var rx = min(r, abs(w) * 0.5) * sign(w),
        ry = min(r, abs(h) * 0.5) * sign(h);
    ctx.moveTo(x, y + ry);
    ctx.lineTo(x, y + h - ry);
    ctx.bezierCurveTo(x, y + h - ry * (1 - KAPPA90), x + rx * (1 - KAPPA90), y + h, x + rx, y + h);
    ctx.lineTo(x + w - rx, y + h);
    ctx.bezierCurveTo(x + w - rx * (1 - KAPPA90), y + h, x + w, y + h - ry * (1 - KAPPA90), x + w, y + h - ry);
    ctx.lineTo(x + w, y + ry);
    ctx.bezierCurveTo(x + w, y + ry * (1 - KAPPA90), x + w - rx * (1 - KAPPA90), y, x + w - rx, y);
    ctx.lineTo(x + rx, y);
    ctx.bezierCurveTo(x + rx * (1 - KAPPA90), y, x, y + ry * (1 - KAPPA90), x, y + ry);
    ctx.close();
  }
}

function tesselateBezier(ctx, x1, y1, x2, y2, x3, y3, x4, y4, level, type) {
  var x12, y12, x23, y23, x34, y34, x123, y123, x234, y234, x1234, y1234;
  var dx, dy, d2, d3;
  if (level > 10) return;
  x12 = (x1 + x2) * 0.5;
  y12 = (y1 + y2) * 0.5;
  x23 = (x2 + x3) * 0.5;
  y23 = (y2 + y3) * 0.5;
  x34 = (x3 + x4) * 0.5;
  y34 = (y3 + y4) * 0.5;
  x123 = (x12 + x23) * 0.5;
  y123 = (y12 + y23) * 0.5;
  dx = x4 - x1;
  dy = y4 - y1;
  d2 = abs((x2 - x4) * dy - (y2 - y4) * dx);
  d3 = abs((x3 - x4) * dy - (y3 - y4) * dx);

  if ((d2 + d3) * (d2 + d3) < ctx._tessTol * (dx * dx + dy * dy)) {
    ctx._addPoint(x4, y4, type === 0 ? type | PointFlags.PT_BEVEL : type);

    return;
  }

  x234 = (x23 + x34) * 0.5;
  y234 = (y23 + y34) * 0.5;
  x1234 = (x123 + x234) * 0.5;
  y1234 = (y123 + y234) * 0.5;
  tesselateBezier(ctx, x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1, 0);
  tesselateBezier(ctx, x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1, type);
}

module.exports = {
  arc: arc,
  ellipse: ellipse,
  roundRect: roundRect,
  tesselateBezier: tesselateBezier
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdyYXBoaWNzXFxoZWxwZXIuanMiXSwibmFtZXMiOlsiUG9pbnRGbGFncyIsInJlcXVpcmUiLCJQSSIsIk1hdGgiLCJtaW4iLCJtYXgiLCJjb3MiLCJzaW4iLCJhYnMiLCJzaWduIiwiS0FQUEE5MCIsImFyYyIsImN0eCIsImN4IiwiY3kiLCJyIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiY291bnRlcmNsb2Nrd2lzZSIsImEiLCJkYSIsImhkYSIsImthcHBhIiwiZHgiLCJkeSIsIngiLCJ5IiwidGFueCIsInRhbnkiLCJweCIsInB5IiwicHRhbngiLCJwdGFueSIsImkiLCJuZGl2cyIsIm1vdmVUbyIsImJlemllckN1cnZlVG8iLCJlbGxpcHNlIiwicngiLCJyeSIsImNsb3NlIiwicm91bmRSZWN0IiwidyIsImgiLCJyZWN0IiwibGluZVRvIiwidGVzc2VsYXRlQmV6aWVyIiwieDEiLCJ5MSIsIngyIiwieTIiLCJ4MyIsInkzIiwieDQiLCJ5NCIsImxldmVsIiwidHlwZSIsIngxMiIsInkxMiIsIngyMyIsInkyMyIsIngzNCIsInkzNCIsIngxMjMiLCJ5MTIzIiwieDIzNCIsInkyMzQiLCJ4MTIzNCIsInkxMjM0IiwiZDIiLCJkMyIsIl90ZXNzVG9sIiwiX2FkZFBvaW50IiwiUFRfQkVWRUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CRCxVQUF0Qzs7QUFFQSxJQUFJRSxFQUFFLEdBQVFDLElBQUksQ0FBQ0QsRUFBbkI7QUFDQSxJQUFJRSxHQUFHLEdBQU9ELElBQUks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LEdBQUcsQ0FBMUQsRUFBNkRDLElBQTdELENBQWY7QUFDSDs7QUFFRGtCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFrQjtBQUNkaEUsRUFBQUEsR0FBRyxFQUFFQSxHQURTO0FBRWQwQixFQUFBQSxPQUFPLEVBQUVBLE9BRks7QUFHZEksRUFBQUEsU0FBUyxFQUFFQSxTQUhHO0FBSWRLLEVBQUFBLGVBQWUsRUFBRUE7QUFKSCxDQUFsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgUG9pbnRGbGFncyA9IHJlcXVpcmUoJy4vdHlwZXMnKS5Qb2ludEZsYWdzO1xyXG5cclxudmFyIFBJICAgICAgPSBNYXRoLlBJO1xyXG52YXIgbWluICAgICA9IE1hdGgubWluO1xyXG52YXIgbWF4ICAgICA9IE1hdGgubWF4O1xyXG52YXIgY29zICAgICA9IE1hdGguY29zO1xyXG52YXIgc2luICAgICA9IE1hdGguc2luO1xyXG52YXIgYWJzICAgICA9IE1hdGguYWJzO1xyXG52YXIgc2lnbiAgICA9IE1hdGguc2lnbjtcclxuXHJcbnZhciBLQVBQQTkwID0gMC41NTIyODQ3NDkzO1xyXG5cclxuZnVuY3Rpb24gYXJjIChjdHgsIGN4LCBjeSwgciwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGNvdW50ZXJjbG9ja3dpc2UpIHtcclxuICAgIGNvdW50ZXJjbG9ja3dpc2UgPSBjb3VudGVyY2xvY2t3aXNlIHx8IGZhbHNlO1xyXG5cclxuICAgIHZhciBhID0gMCwgZGEgPSAwLCBoZGEgPSAwLCBrYXBwYSA9IDA7XHJcbiAgICB2YXIgZHggPSAwLCBkeSA9IDAsIHggPSAwLCB5ID0gMCwgdGFueCA9IDAsIHRhbnkgPSAwO1xyXG4gICAgdmFyIHB4ID0gMCwgcHkgPSAwLCBwdGFueCA9IDAsIHB0YW55ID0gMDtcclxuICAgIHZhciBpLCBuZGl2cztcclxuXHJcbiAgICAvLyBDbGFtcCBhbmdsZXNcclxuICAgIGRhID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlO1xyXG4gICAgaWYgKGNvdW50ZXJjbG9ja3dpc2UpIHtcclxuICAgICAgICBpZiAoYWJzKGRhKSA+PSBQSSAqIDIpIHtcclxuICAgICAgICAgICAgZGEgPSBQSSAqIDI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKGRhIDwgMCkgZGEgKz0gUEkgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGFicyhkYSkgPj0gUEkgKiAyKSB7XHJcbiAgICAgICAgICAgIGRhID0gLVBJICogMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAoZGEgPiAwKSBkYSAtPSBQSSAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNwbGl0IGFyYyBpbnRvIG1heCA5MCBkZWdyZWUgc2VnbWVudHMuXHJcbiAgICBuZGl2cyA9IG1heCgxLCBtaW4oYWJzKGRhKSAvIChQSSAqIDAuNSkgKyAwLjUsIDUpKSB8IDA7XHJcbiAgICBoZGEgPSBkYSAvIG5kaXZzIC8gMi4wO1xyXG4gICAga2FwcGEgPSBhYnMoNC4wIC8gMy4wICogKDEgLSBjb3MoaGRhKSkgLyBzaW4oaGRhKSk7XHJcblxyXG4gICAgaWYgKCFjb3VudGVyY2xvY2t3aXNlKSBrYXBwYSA9IC1rYXBwYTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDw9IG5kaXZzOyBpKyspIHtcclxuICAgICAgICBhID0gc3RhcnRBbmdsZSArIGRhICogKGkgLyBuZGl2cyk7XHJcbiAgICAgICAgZHggPSBjb3MoYSk7XHJcbiAgICAgICAgZHkgPSBzaW4oYSk7XHJcbiAgICAgICAgeCA9IGN4ICsgZHggKiByO1xyXG4gICAgICAgIHkgPSBjeSArIGR5ICogcjtcclxuICAgICAgICB0YW54ID0gLWR5ICogciAqIGthcHBhO1xyXG4gICAgICAgIHRhbnkgPSBkeCAqIHIgKiBrYXBwYTtcclxuXHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyhweCArIHB0YW54LCBweSArIHB0YW55LCB4IC0gdGFueCwgeSAtIHRhbnksIHgsIHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBweCA9IHg7XHJcbiAgICAgICAgcHkgPSB5O1xyXG4gICAgICAgIHB0YW54ID0gdGFueDtcclxuICAgICAgICBwdGFueSA9IHRhbnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVsbGlwc2UgKGN0eCwgY3gsIGN5LCByeCwgcnkpIHtcclxuICAgIGN0eC5tb3ZlVG8oY3ggLSByeCwgY3kpO1xyXG4gICAgY3R4LmJlemllckN1cnZlVG8oY3ggLSByeCwgY3kgKyByeSAqIEtBUFBBOTAsIGN4IC0gcnggKiBLQVBQQTkwLCBjeSArIHJ5LCBjeCwgY3kgKyByeSk7XHJcbiAgICBjdHguYmV6aWVyQ3VydmVUbyhjeCArIHJ4ICogS0FQUEE5MCwgY3kgKyByeSwgY3ggKyByeCwgY3kgKyByeSAqIEtBUFBBOTAsIGN4ICsgcngsIGN5KTtcclxuICAgIGN0eC5iZXppZXJDdXJ2ZVRvKGN4ICsgcngsIGN5IC0gcnkgKiBLQVBQQTkwLCBjeCArIHJ4ICogS0FQUEE5MCwgY3kgLSByeSwgY3gsIGN5IC0gcnkpO1xyXG4gICAgY3R4LmJlemllckN1cnZlVG8oY3ggLSByeCAqIEtBUFBBOTAsIGN5IC0gcnksIGN4IC0gcngsIGN5IC0gcnkgKiBLQVBQQTkwLCBjeCAtIHJ4LCBjeSk7XHJcbiAgICBjdHguY2xvc2UoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm91bmRSZWN0IChjdHgsIHgsIHksIHcsIGgsIHIpIHtcclxuICAgIGlmIChyIDwgMC4xKSB7XHJcbiAgICAgICAgY3R4LnJlY3QoeCwgeSwgdywgaCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcnggPSBtaW4ociwgYWJzKHcpICogMC41KSAqIHNpZ24odyksXHJcbiAgICAgICAgICAgIHJ5ID0gbWluKHIsIGFicyhoKSAqIDAuNSkgKiBzaWduKGgpO1xyXG5cclxuICAgICAgICBjdHgubW92ZVRvKHgsIHkgKyByeSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4LCB5ICsgaCAtIHJ5KTtcclxuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4LCB5ICsgaCAtIHJ5ICogKDEgLSBLQVBQQTkwKSwgeCArIHJ4ICogKDEgLSBLQVBQQTkwKSwgeSArIGgsIHggKyByeCwgeSArIGgpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeCArIHcgLSByeCwgeSArIGgpO1xyXG4gICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHggKyB3IC0gcnggKiAoMSAtIEtBUFBBOTApLCB5ICsgaCwgeCArIHcsIHkgKyBoIC0gcnkgKiAoMSAtIEtBUFBBOTApLCB4ICsgdywgeSArIGggLSByeSk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgdywgeSArIHJ5KTtcclxuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgdywgeSArIHJ5ICogKDEgLSBLQVBQQTkwKSwgeCArIHcgLSByeCAqICgxIC0gS0FQUEE5MCksIHksIHggKyB3IC0gcngsIHkpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oeCArIHJ4LCB5KTtcclxuICAgICAgICBjdHguYmV6aWVyQ3VydmVUbyh4ICsgcnggKiAoMSAtIEtBUFBBOTApLCB5LCB4LCB5ICsgcnkgKiAoMSAtIEtBUFBBOTApLCB4LCB5ICsgcnkpO1xyXG4gICAgICAgIGN0eC5jbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXNzZWxhdGVCZXppZXIgKGN0eCwgeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0LCBsZXZlbCwgdHlwZSkge1xyXG4gICAgdmFyIHgxMiwgeTEyLCB4MjMsIHkyMywgeDM0LCB5MzQsIHgxMjMsIHkxMjMsIHgyMzQsIHkyMzQsIHgxMjM0LCB5MTIzNDtcclxuICAgIHZhciBkeCwgZHksIGQyLCBkMztcclxuXHJcbiAgICBpZiAobGV2ZWwgPiAxMCkgcmV0dXJuO1xyXG5cclxuICAgIHgxMiA9ICh4MSArIHgyKSAqIDAuNTtcclxuICAgIHkxMiA9ICh5MSArIHkyKSAqIDAuNTtcclxuICAgIHgyMyA9ICh4MiArIHgzKSAqIDAuNTtcclxuICAgIHkyMyA9ICh5MiArIHkzKSAqIDAuNTtcclxuICAgIHgzNCA9ICh4MyArIHg0KSAqIDAuNTtcclxuICAgIHkzNCA9ICh5MyArIHk0KSAqIDAuNTtcclxuICAgIHgxMjMgPSAoeDEyICsgeDIzKSAqIDAuNTtcclxuICAgIHkxMjMgPSAoeTEyICsgeTIzKSAqIDAuNTtcclxuXHJcbiAgICBkeCA9IHg0IC0geDE7XHJcbiAgICBkeSA9IHk0IC0geTE7XHJcbiAgICBkMiA9IGFicygoeDIgLSB4NCkgKiBkeSAtICh5MiAtIHk0KSAqIGR4KTtcclxuICAgIGQzID0gYWJzKCh4MyAtIHg0KSAqIGR5IC0gKHkzIC0geTQpICogZHgpO1xyXG5cclxuICAgIGlmICgoZDIgKyBkMykgKiAoZDIgKyBkMykgPCBjdHguX3Rlc3NUb2wgKiAoZHggKiBkeCArIGR5ICogZHkpKSB7XHJcbiAgICAgICAgY3R4Ll9hZGRQb2ludCh4NCwgeTQsIHR5cGUgPT09IDAgPyB0eXBlIHwgUG9pbnRGbGFncy5QVF9CRVZFTCA6IHR5cGUpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB4MjM0ID0gKHgyMyArIHgzNCkgKiAwLjU7XHJcbiAgICB5MjM0ID0gKHkyMyArIHkzNCkgKiAwLjU7XHJcbiAgICB4MTIzNCA9ICh4MTIzICsgeDIzNCkgKiAwLjU7XHJcbiAgICB5MTIzNCA9ICh5MTIzICsgeTIzNCkgKiAwLjU7XHJcblxyXG4gICAgdGVzc2VsYXRlQmV6aWVyKGN0eCwgeDEsIHkxLCB4MTIsIHkxMiwgeDEyMywgeTEyMywgeDEyMzQsIHkxMjM0LCBsZXZlbCArIDEsIDApO1xyXG4gICAgdGVzc2VsYXRlQmV6aWVyKGN0eCwgeDEyMzQsIHkxMjM0LCB4MjM0LCB5MjM0LCB4MzQsIHkzNCwgeDQsIHk0LCBsZXZlbCArIDEsIHR5cGUpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICB7XHJcbiAgICBhcmM6IGFyYyxcclxuICAgIGVsbGlwc2U6IGVsbGlwc2UsXHJcbiAgICByb3VuZFJlY3Q6IHJvdW5kUmVjdCxcclxuICAgIHRlc3NlbGF0ZUJlemllcjogdGVzc2VsYXRlQmV6aWVyXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9