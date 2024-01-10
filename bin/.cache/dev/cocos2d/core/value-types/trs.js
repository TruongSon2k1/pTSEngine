
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/trs.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _quat = _interopRequireDefault(require("./quat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tmp_quat = new _quat["default"]();

var Trs = /*#__PURE__*/function () {
  function Trs() {}

  Trs.toRotation = function toRotation(out, a) {
    out.x = a[3];
    out.y = a[4];
    out.z = a[5];
    out.w = a[6];
    return out;
  };

  Trs.fromRotation = function fromRotation(out, a) {
    out[3] = a.x;
    out[4] = a.y;
    out[5] = a.z;
    out[6] = a.w;
    return out;
  };

  Trs.toEuler = function toEuler(out, a) {
    Trs.toRotation(tmp_quat, a);

    _quat["default"].toEuler(out, tmp_quat);

    return out;
  };

  Trs.fromEuler = function fromEuler(out, a) {
    _quat["default"].fromEuler(tmp_quat, a.x, a.y, a.z);

    Trs.fromRotation(out, tmp_quat);
    return out;
  };

  Trs.fromEulerNumber = function fromEulerNumber(out, x, y, z) {
    _quat["default"].fromEuler(tmp_quat, x, y, z);

    Trs.fromRotation(out, tmp_quat);
    return out;
  };

  Trs.toScale = function toScale(out, a) {
    out.x = a[7];
    out.y = a[8];
    out.z = a[9];
    return out;
  };

  Trs.fromScale = function fromScale(out, a) {
    out[7] = a.x;
    out[8] = a.y;
    out[9] = a.z;
    return out;
  };

  Trs.toPosition = function toPosition(out, a) {
    out.x = a[0];
    out.y = a[1];
    out.z = a[2];
    return out;
  };

  Trs.fromPosition = function fromPosition(out, a) {
    out[0] = a.x;
    out[1] = a.y;
    out[2] = a.z;
    return out;
  };

  Trs.fromAngleZ = function fromAngleZ(out, a) {
    _quat["default"].fromAngleZ(tmp_quat, a);

    Trs.fromRotation(out, tmp_quat);
    return out;
  };

  Trs.toMat4 = function toMat4(out, trs) {
    var x = trs[3],
        y = trs[4],
        z = trs[5],
        w = trs[6];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = trs[7];
    var sy = trs[8];
    var sz = trs[9];
    var m = out.m;
    m[0] = (1 - (yy + zz)) * sx;
    m[1] = (xy + wz) * sx;
    m[2] = (xz - wy) * sx;
    m[3] = 0;
    m[4] = (xy - wz) * sy;
    m[5] = (1 - (xx + zz)) * sy;
    m[6] = (yz + wx) * sy;
    m[7] = 0;
    m[8] = (xz + wy) * sz;
    m[9] = (yz - wx) * sz;
    m[10] = (1 - (xx + yy)) * sz;
    m[11] = 0;
    m[12] = trs[0];
    m[13] = trs[1];
    m[14] = trs[2];
    m[15] = 1;
    return out;
  };

  return Trs;
}();

exports["default"] = Trs;
cc.Trs = Trs;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHZhbHVlLXR5cGVzXFx0cnMudHMiXSwibmFtZXMiOlsidG1wX3F1YXQiLCJRdWF0IiwiVHJzIiwidG9Sb3RhdGlvbiIsIm91dCIsImEiLCJ4IiwieSIsInoiLCJ3IiwiZnJvbVJvdGF0aW9uIiwidG9FdWxlciIsImZyb21FdWxlciIsImZyb21FdWxlck51bWJlciIsInRvU2NhbGUiLCJmcm9tU2NhbGUiLCJ0b1Bvc2l0aW9uIiwiZnJvbVBvc2l0aW9uIiwiZnJvbUFuZ2xlWiIsInRvTWF0NCIsInRycyIsIngyIiwieTIiLCJ6MiIsInh4IiwieHkiLCJ4eiIsInl5IiwieXoiLCJ6eiIsInd4Iiwid3kiLCJ3eiIsInN4Iiwic3kiLCJzeiIsIm0iLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBSUEsSUFBSUEsUUFBUSxHQUFHLElBQUlDLGdCQUFKLEVBQWY7O0lBRXFCQzs7O01BQ1ZDLGFBQVAsb0JBQW1CQyxHQUFuQixFQUE4QkMsQ0FBOUIsRUFBbUQ7QUFDL0NELElBQUFBLEdBQUcsQ0FBQ0UsQ0FBSixHQUFRRCxDQUFDLENBQUMsQ0FBRCxDQUFUO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0csQ0FBSixHQUFRRixDQUFDLENBQUMsQ0FBRCxDQUFUO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRSCxDQUFDLENBQUMsQ0FBRCxDQUFUO0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRSixDQUFDLENBQUMsQ0FBRCxDQUFUO0FBQ0EsV0FBT0QsR0FBUDtBQUNIOztNQUVNTSxlQUFQLHNCQUFxQk4sR0FBckIsRUFBc0NDLENBQXRDLEVBQTJEO0FBQ3ZERCxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNDLENBQUMsQ0FBQ0MsQ0FBWDtBQUNBRixJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNDLENBQUMsQ0FBQ0UsQ0FBWDtBQUNBSCxJQUFBQSxHQUFH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RCxDQUFELEdBQVFoQixHQUFHLENBQUMsQ0FBRCxDQUFYO0FBQ0FnQixJQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVEsQ0FBUjtBQUVBLFdBQU9oQyxHQUFQO0FBQ0g7Ozs7OztBQUdMaUMsRUFBRSxDQUFDbkMsR0FBSCxHQUFTQSxHQUFUIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBRdWF0IGZyb20gJy4vcXVhdCc7XHJcbmltcG9ydCBWZWMzIGZyb20gJy4vdmVjMyc7XHJcbmltcG9ydCBNYXQ0IGZyb20gJy4vTWF0NCc7XHJcblxyXG5sZXQgdG1wX3F1YXQgPSBuZXcgUXVhdCgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJzIHtcclxuICAgIHN0YXRpYyB0b1JvdGF0aW9uIChvdXQ6IFF1YXQsIGE6IEZsb2F0QXJyYXkpOiBRdWF0IHtcclxuICAgICAgICBvdXQueCA9IGFbM107XHJcbiAgICAgICAgb3V0LnkgPSBhWzRdO1xyXG4gICAgICAgIG91dC56ID0gYVs1XTtcclxuICAgICAgICBvdXQudyA9IGFbNl07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZnJvbVJvdGF0aW9uIChvdXQ6IEZsb2F0QXJyYXksIGE6IFF1YXQpOiBGbG9hdEFycmF5IHtcclxuICAgICAgICBvdXRbM10gPSBhLng7XHJcbiAgICAgICAgb3V0WzRdID0gYS55O1xyXG4gICAgICAgIG91dFs1XSA9IGEuejtcclxuICAgICAgICBvdXRbNl0gPSBhLnc7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdG9FdWxlciAob3V0OiBWZWMzLCBhOiBGbG9hdEFycmF5KTogVmVjMyB7XHJcbiAgICAgICAgVHJzLnRvUm90YXRpb24odG1wX3F1YXQsIGEpO1xyXG4gICAgICAgIFF1YXQudG9FdWxlcihvdXQsIHRtcF9xdWF0KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tRXVsZXIgKG91dDogRmxvYXRBcnJheSwgYTogVmVjMyk6IEZsb2F0QXJyYXkge1xyXG4gICAgICAgIFF1YXQuZnJvbUV1bGVyKHRtcF9xdWF0LCBhLngsIGEueSwgYS56KTtcclxuICAgICAgICBUcnMuZnJvbVJvdGF0aW9uKG91dCwgdG1wX3F1YXQpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21FdWxlck51bWJlciAob3V0OiBGbG9hdEFycmF5LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogRmxvYXRBcnJheSB7XHJcbiAgICAgICAgUXVhdC5mcm9tRXVsZXIodG1wX3F1YXQsIHgsIHksIHopO1xyXG4gICAgICAgIFRycy5mcm9tUm90YXRpb24ob3V0LCB0bXBfcXVhdCk7XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdG9TY2FsZSAob3V0OiBWZWMzLCBhOiBGbG9hdEFycmF5KTogVmVjMyB7XHJcbiAgICAgICAgb3V0LnggPSBhWzddO1xyXG4gICAgICAgIG91dC55ID0gYVs4XTtcclxuICAgICAgICBvdXQueiA9IGFbOV07XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZnJvbVNjYWxlIChvdXQ6IEZsb2F0QXJyYXksIGE6IFZlYzMpOiBGbG9hdEFycmF5IHtcclxuICAgICAgICBvdXRbN10gPSBhLng7XHJcbiAgICAgICAgb3V0WzhdID0gYS55O1xyXG4gICAgICAgIG91dFs5XSA9IGEuejtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB0b1Bvc2l0aW9uIChvdXQ6IFZlYzMsIGE6IEZsb2F0QXJyYXkpOiBWZWMzIHtcclxuICAgICAgICBvdXQueCA9IGFbMF07XHJcbiAgICAgICAgb3V0LnkgPSBhWzFdO1xyXG4gICAgICAgIG91dC56ID0gYVsyXTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmcm9tUG9zaXRpb24gKG91dDogRmxvYXRBcnJheSwgYTogVmVjMyk6IEZsb2F0QXJyYXkge1xyXG4gICAgICAgIG91dFswXSA9IGEueDtcclxuICAgICAgICBvdXRbMV0gPSBhLnk7XHJcbiAgICAgICAgb3V0WzJdID0gYS56O1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZyb21BbmdsZVogKG91dDogRmxvYXRBcnJheSwgYTogbnVtYmVyKTogRmxvYXRBcnJheSB7XHJcbiAgICAgICAgUXVhdC5mcm9tQW5nbGVaKHRtcF9xdWF0LCBhKTtcclxuICAgICAgICBUcnMuZnJvbVJvdGF0aW9uKG91dCwgdG1wX3F1YXQpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRvTWF0NCAob3V0OiBNYXQ0LCB0cnM6IEZsb2F0QXJyYXkpOiBNYXQ0IHtcclxuICAgICAgICBsZXQgeCA9IHRyc1szXSwgeSA9IHRyc1s0XSwgeiA9IHRyc1s1XSwgdyA9IHRyc1s2XTtcclxuICAgICAgICBsZXQgeDIgPSB4ICsgeDtcclxuICAgICAgICBsZXQgeTIgPSB5ICsgeTtcclxuICAgICAgICBsZXQgejIgPSB6ICsgejtcclxuXHJcbiAgICAgICAgbGV0IHh4ID0geCAqIHgyO1xyXG4gICAgICAgIGxldCB4eSA9IHggKiB5MjtcclxuICAgICAgICBsZXQgeHogPSB4ICogejI7XHJcbiAgICAgICAgbGV0IHl5ID0geSAqIHkyO1xyXG4gICAgICAgIGxldCB5eiA9IHkgKiB6MjtcclxuICAgICAgICBsZXQgenogPSB6ICogejI7XHJcbiAgICAgICAgbGV0IHd4ID0gdyAqIHgyO1xyXG4gICAgICAgIGxldCB3eSA9IHcgKiB5MjtcclxuICAgICAgICBsZXQgd3ogPSB3ICogejI7XHJcbiAgICAgICAgbGV0IHN4ID0gdHJzWzddO1xyXG4gICAgICAgIGxldCBzeSA9IHRyc1s4XTtcclxuICAgICAgICBsZXQgc3ogPSB0cnNbOV07XHJcblxyXG4gICAgICAgIGxldCBtID0gb3V0Lm07XHJcbiAgICAgICAgbVswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xyXG4gICAgICAgIG1bMV0gPSAoeHkgKyB3eikgKiBzeDtcclxuICAgICAgICBtWzJdID0gKHh6IC0gd3kpICogc3g7XHJcbiAgICAgICAgbVszXSA9IDA7XHJcbiAgICAgICAgbVs0XSA9ICh4eSAtIHd6KSAqIHN5O1xyXG4gICAgICAgIG1bNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcclxuICAgICAgICBtWzZdID0gKHl6ICsgd3gpICogc3k7XHJcbiAgICAgICAgbVs3XSA9IDA7XHJcbiAgICAgICAgbVs4XSA9ICh4eiArIHd5KSAqIHN6O1xyXG4gICAgICAgIG1bOV0gPSAoeXogLSB3eCkgKiBzejtcclxuICAgICAgICBtWzEwXSA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xyXG4gICAgICAgIG1bMTFdID0gMDtcclxuICAgICAgICBtWzEyXSA9IHRyc1swXTtcclxuICAgICAgICBtWzEzXSA9IHRyc1sxXTtcclxuICAgICAgICBtWzE0XSA9IHRyc1syXTtcclxuICAgICAgICBtWzE1XSA9IDE7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNjLlRycyA9IFRyczsiXSwic291cmNlUm9vdCI6Ii8ifQ==