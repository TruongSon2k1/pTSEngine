
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle-general-function.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.calculateTransform = calculateTransform;
exports.fixedAngleUnitVector2 = fixedAngleUnitVector2;
exports.randomUnitVector2 = randomUnitVector2;
exports.randomUnitVector = randomUnitVector;
exports.randomPointInUnitSphere = randomPointInUnitSphere;
exports.randomPointBetweenSphere = randomPointBetweenSphere;
exports.randomPointInUnitCircle = randomPointInUnitCircle;
exports.randomPointBetweenCircle = randomPointBetweenCircle;
exports.randomPointBetweenCircleAtFixedAngle = randomPointBetweenCircleAtFixedAngle;
exports.randomPointInCube = randomPointInCube;
exports.randomPointBetweenCube = randomPointBetweenCube;
exports.randomSortArray = randomSortArray;
exports.randomSign = randomSign;
exports.particleEmitZAxis = void 0;

var _valueTypes = require("../../value-types");

var _utils = require("../../value-types/utils");

var _enum = require("./enum");

var particleEmitZAxis = new _valueTypes.Vec3(0, 0, -1);
exports.particleEmitZAxis = particleEmitZAxis;

function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
  if (moduleSpace !== systemSpace) {
    if (systemSpace === _enum.Space.World) {
      _valueTypes.Mat4.getRotation(outQuat, worldTransform);
    } else {
      _valueTypes.Mat4.invert(worldTransform, worldTransform);

      _valueTypes.Mat4.getRotation(outQuat, worldTransform);
    }

    return true;
  } else {
    _valueTypes.Quat.set(outQuat, 0, 0, 0, 1);

    return false;
  }
}

function fixedAngleUnitVector2(out, theta) {
  _valueTypes.Vec2.set(out, Math.cos(theta), Math.sin(theta));
}

function randomUnitVector2(out) {
  var a = (0, _valueTypes.randomRange)(0, 2 * Math.PI);
  var x = Math.cos(a);
  var y = Math.sin(a);

  _valueTypes.Vec2.set(out, x, y);
}

function randomUnitVector(out) {
  var z = (0, _valueTypes.randomRange)(-1, 1);
  var a = (0, _valueTypes.randomRange)(0, 2 * Math.PI);
  var r = Math.sqrt(1 - z * z);
  var x = r * Math.cos(a);
  var y = r * Math.sin(a);

  _valueTypes.Vec3.set(out, x, y, z);
}

function randomPointInUnitSphere(out) {
  randomUnitVector(out);

  _valueTypes.Vec3.scale(out, out, (0, _valueTypes.random)());
}

function randomPointBetweenSphere(out, minRadius, maxRadius) {
  randomUnitVector(out);

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointInUnitCircle(out) {
  randomUnitVector2(out);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, (0, _valueTypes.random)());
}

function randomPointBetweenCircle(out, minRadius, maxRadius) {
  randomUnitVector2(out);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
  fixedAngleUnitVector2(out, theta);
  out.z = 0;

  _valueTypes.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, _valueTypes.random)());
}

function randomPointInCube(out, extents) {
  _valueTypes.Vec3.set(out, (0, _valueTypes.randomRange)(-extents.x, extents.x), (0, _valueTypes.randomRange)(-extents.y, extents.y), (0, _valueTypes.randomRange)(-extents.z, extents.z));
}

function randomPointBetweenCube(out, minBox, maxBox) {
  var subscript = ['x', 'y', 'z'];
  var edge = (0, _valueTypes.randomRangeInt)(0, 3);

  for (var i = 0; i < 3; i++) {
    if (i === edge) {
      out[subscript[i]] = (0, _valueTypes.randomRange)(-maxBox[subscript[i]], maxBox[subscript[i]]);
      continue;
    }

    var x = (0, _valueTypes.random)() * 2 - 1;

    if (x < 0) {
      out[subscript[i]] = -minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    } else {
      out[subscript[i]] = minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
    }
  }
} // Fisher–Yates shuffle


function randomSortArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    var transpose = i + (0, _valueTypes.randomRangeInt)(0, arr.length - i);
    var val = arr[transpose];
    arr[transpose] = arr[i];
    arr[i] = val;
  }
}

function randomSign() {
  var sgn = (0, _valueTypes.randomRange)(-1, 1);
  sgn === 0 ? sgn++ : sgn;
  return (0, _utils.sign)(sgn);
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxccGFydGljbGUtZ2VuZXJhbC1mdW5jdGlvbi50cyJdLCJuYW1lcyI6WyJwYXJ0aWNsZUVtaXRaQXhpcyIsIlZlYzMiLCJjYWxjdWxhdGVUcmFuc2Zvcm0iLCJzeXN0ZW1TcGFjZSIsIm1vZHVsZVNwYWNlIiwid29ybGRUcmFuc2Zvcm0iLCJvdXRRdWF0IiwiU3BhY2UiLCJXb3JsZCIsIk1hdDQiLCJnZXRSb3RhdGlvbiIsImludmVydCIsIlF1YXQiLCJzZXQiLCJmaXhlZEFuZ2xlVW5pdFZlY3RvcjIiLCJvdXQiLCJ0aGV0YSIsIlZlYzIiLCJNYXRoIiwiY29zIiwic2luIiwicmFuZG9tVW5pdFZlY3RvcjIiLCJhIiwiUEkiLCJ4IiwieSIsInJhbmRvbVVuaXRWZWN0b3IiLCJ6IiwiciIsInNxcnQiLCJyYW5kb21Qb2ludEluVW5pdFNwaGVyZSIsInNjYWxlIiwicmFuZG9tUG9pbnRCZXR3ZWVuU3BoZXJlIiwibWluUmFkaXVzIiwibWF4UmFkaXVzIiwicmFuZG9tUG9pbnRJblVuaXRDaXJjbGUiLCJyYW5kb21Qb2ludEJldHdlZW5DaXJjbGUiLCJyYW5kb21Qb2ludEJldHdlZW5DaXJjbGVBdEZpeGVkQW5nbGUiLCJyYW5kb21Qb2ludEluQ3ViZSIsImV4dGVudHMiLCJyYW5kb21Qb2ludEJldHdlZW5DdWJlIiwibWluQm94IiwibWF4Qm94Iiwic3Vic2NyaXB0IiwiZWRnZSIsImkiLCJyYW5kb21Tb3J0QXJyYXkiLCJhcnIiLCJsZW5ndGgiLCJ0cmFuc3Bvc2UiLCJ2YWwiLCJyYW5kb21TaWduIiwic2duIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVPLElBQU1BLGlCQUFpQixHQUFHLElBQUlDLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFDLENBQWhCLENBQTFCOzs7QUFFQSxTQUFTQyxrQkFBVCxDQUE2QkMsV0FBN0IsRUFBMENDLFdBQTFDLEVBQXVEQyxjQUF2RCxFQUF1RUMsT0FBdkUsRUFBZ0Y7QUFDbkYsTUFBSUYsV0FBVyxLQUFLRCxXQUFwQixFQUFpQztBQUM3QixRQUFJQSxXQUFXLEtBQUtJLFlBQU1DLEtBQTFCLEVBQWlDO0FBQzdCQyx1QkFBS0MsV0FBTCxDQUFpQkosT0FBakIsRUFBMEJELGNBQTFCO0FBQ0gsS0FGRCxNQUdLO0FBQ0RJLHVCQUFLRSxNQUFMLENBQVlOLGNBQVosRUFBNEJBLGNBQTVCOztBQUNBSSx1QkFBS0MsV0FBTCxDQUFpQkosT0FBakIsRUFBMEJELGNBQTFCO0FBQ0g7O0FBQ0QsV0FBTyxJQUFQO0FBQ0gsR0FURCxNQVVLO0FBQ0RPLHFCQUFLQyxHQUFMLENBQVNQLE9BQVQsRUFBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0I7O0FBQ0EsV0FBTyxLQUFQO0FBQ0g7QUFDSjs7QUFFTSxTQUFTUSxxQkFBVCxDQUFnQ0MsR0FBaEMsRUFBcUNDLEtBQXJDLEVBQTRDO0FBQy9DQyxtQkFBS0osR0FBTCxDQUFTRSxHQUFULEVBQWNHLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxLQUFULENBQWQsRUFBK0JFLElBQUksQ0FBQ0UsR0FBTCxDQUFTSixLQUFULENBQS9CO0FBQ0g7O0FBRU0sU0FBU0ssaUJBQVQsQ0FBNEJOLEdBQTVCLEVBQWlDO0FBQ3BDLE1BQU1PLENBQUMsR0FBRyw2QkFBWSxDQUFaLEVBQWUsSUFBSUosSUFBSSxDQUFDSyxFQUF4QixDQUFWO0FBQ0EsTUFBTUMsQ0FBQyxHQUFHTixJQUFJLENBQUNDLEdBQUwsQ0FBU0csQ0FBVCxDQUFWO0FBQ0EsTUFBTUcsQ0FBQyxHQUFHUCxJQUFJLENBQUNFLEdBQUwsQ0FBU0UsQ0FBVCxDQUFWOztBQUNBTCxtQkFBS0osR0FBTCxDQUFTRSxHQUFULEVBQWNTLENBQWQsRUFBaUJDLENBQWpCO0FBQ0g7O0FBRU0sU0FBU0MsZ0JBQVQsQ0FBMkJYLEdBQTNCLEVBQWdDO0FBQ25DLE1BQU1ZLENBQUMsR0FBRyw2QkFBWSxDQUFDLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBVjtBQUNBLE1BQU1MLENBQUMsR0FBRyw2QkFBWSxDQUFaLEVBQWUsSUFBSUosSUFBSSxDQUFDSyxFQUF4QixDQUFWO0FBQ0EsTUFBTUssQ0FBQyxHQUFHVixJQUFJLENBQUNXLElBQUwsQ0FBVSxJQUFJRixDQUFDLEdBQUdBLENBQWxCLENBQVY7QUFDQSxNQUFNSCxDQUFDLEdBQUdJLENBQUMsR0FBR1YsSUFBSSxDQUFDQyxHQUFMLENBQVNHLENBQVQsQ0FBZDtBQUNBLE1BQU1HLENBQUMsR0FBR0csQ0FBQyxHQUFHVixJQUFJLENBQUNFLEdBQUwsQ0FBU0UsQ0FBVCxDQUFkOztBQUNBckIsbUJBQUtZLEdBQUwsQ0FBU0UsR0FBVCxFQUFjUyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQkUsQ0FBcEI7QUFDSDs7QUFFTSxTQUFTRyx1QkFBVCxDQUFrQ2YsR0FBbEMsRUFBdUM7QUFDMUNXLEVBQUFBLGdCQUFnQixDQUFDWCxHQUFELENBQWhCOztBQUNBZCxtQkFBSzhCLEtBQUwsQ0FBV2hCLEdBQVgsRUFBZ0JBLEdBQWhCLEVBQXFCLHlCQUFyQjtBQUNIOztBQUVNLFNBQVNpQix3QkFBVCxDQUFtQ2pCLEdBQW5DLEVBQXdDa0IsU0FBeEMsRUFBbURDLFNBQW5ELEVBQThEO0FBQ2pFUixFQUFBQSxnQkFBZ0IsQ0FBQ1gsR0FBRCxDQUFoQjs7QUFDQWQsbUJBQUs4QixLQUFMLENBQVdoQixHQUFYLEVBQWdCQSxHQUFoQixFQUFxQmtCLFNBQVMsR0FBRyxDQUFDQyxTQUFTLEdBQUdELFNBQWIsSUFBMEIseUJBQTNEO0FBQ0g7O0FBRU0sU0FBU0UsdUJBQVQsQ0FBa0NwQixHQUFsQyxFQUF1QztBQUMxQ00sRUFBQUEsaUJBQWlCLENBQUNOLEdBQUQsQ0FBakI7QUFDQUEsRUFBQUEsR0FBRyxDQUFDWSxDQUFKLEdBQVEsQ0FBUjs7QUFDQTFCLG1CQUFLOEIsS0FBTCxDQUFXaEIsR0FBWCxFQUFnQkEsR0FBaEIsRUFBcUIseUJBQXJCO0FBQ0g7O0FBRU0sU0FBU3FCLHdCQUFULENBQW1DckIsR0FBbkMsRUFBd0NrQixTQUF4QyxFQUFtREMsU0FBbkQsRUFBOEQ7QUFDakViLEVBQUFBLGlCQUFpQixDQUFDTixHQUFELENBQWpCO0FBQ0FBLEVBQUFBLEdBQUcsQ0FBQ1ksQ0FBSixHQUFRLENBQVI7O0FBQ0ExQixtQkFBSzhCLEtBQUwsQ0FBV2hCLEdBQVgsRUFBZ0JBLEdBQWhCLEVBQXFCa0IsU0FBUyxHQUFHLENBQUNDLFNBQVMsR0FBR0QsU0FBYixJQUEwQix5QkFBM0Q7QUFDSDs7QUFFTSxTQUFTSSxvQ0FBVCxDQUErQ3RCLEdBQS9DLEVBQW9Ea0IsU0FBcEQsRUFBK0RDLFNBQS9ELEVBQTBFbEIsS0FBMUUsRUFBaUY7QUFDcEZGLEVBQUFBLHFCQUFxQixDQUFDQyxHQUFELEVBQU1DLEtBQU4sQ0FBckI7QUFDQUQsRUFBQUEsR0FBRyxDQUFDWSxDQUFKLEdBQVEsQ0FBUjs7QUFDQTFCLG1CQUFLOEIsS0FBTCxDQUFXaEIsR0FBWCxFQUFnQkEsR0FBaEIsRUFBcUJrQixTQUFTLEdBQUcsQ0FBQ0MsU0FBUyxHQUFHRCxTQUFiLElBQTBCLHlCQUEzRDtBQUNIOztBQUVNLFNBQVNLLGlCQUFULENBQTRCdkIsR0FBNUIsRUFBaUN3QixPQUFqQyxFQUEwQztBQUM3Q3RDLG1CQUFLWSxHQUFMLENBQVNFLEdBQVQsRUFDSSw2QkFBWSxDQUFDd0IsT0FBTyxDQUFDZixDQUFyQixFQUF3QmUsT0FBTyxDQUFDZixDQUFoQyxDQURKLEVBRUksNkJBQVksQ0FBQ2UsT0FBTyxDQUFDZCxDQUFyQixFQUF3QmMsT0FBTyxDQUFDZCxDQUFoQyxDQUZKLEVBR0ksNkJBQVksQ0FBQ2MsT0FBTyxDQUFDWixDQUFyQixFQUF3QlksT0FBTyxDQUFDWixDQUFoQyxDQUhKO0FBSUg7O0FBRU0sU0FBU2Esc0JBQVQsQ0FBaUN6QixHQUFqQyxFQUFzQzBCLE1BQXRDLEVBQThDQyxNQUE5QyxFQUFzRDtBQUN6RCxNQUFNQyxTQUFTLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBbEI7QUFDQSxNQUFNQyxJQUFJLEdBQUcsZ0NBQWUsQ0FBZixFQUFrQixDQUFsQixDQUFiOztBQUNBLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QixRQUFJQSxDQUFDLEtBQUtELElBQVYsRUFBZ0I7QUFDWjdCLE1BQUFBLEdBQUcsQ0FBQzRCLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFWLENBQUgsR0FBb0IsNkJBQVksQ0FBQ0gsTUFBTSxDQUFDQyxTQUFTLENBQUNFLENBQUQsQ0FBVixDQUFuQixFQUFtQ0gsTUFBTSxDQUFDQyxTQUFTLENBQUNFLENBQUQsQ0FBVixDQUF6QyxDQUFwQjtBQUNBO0FBQ0g7O0FBQ0QsUUFBTXJCLENBQUMsR0FBRyw0QkFBVyxDQUFYLEdBQWUsQ0FBekI7O0FBQ0EsUUFBSUEsQ0FBQyxHQUFHLENBQVIsRUFBVztBQUNQVCxNQUFBQSxHQUFHLENBQUM0QixTQUFTLENBQUNFLENBQUQsQ0FBVixDQUFILEdBQW9CLENBQUNKLE1BQU0sQ0FBQ0UsU0FBUyxDQUFDRSxDQUFELENBQVYsQ0FBUCxHQUF3QnJCLENBQUMsSUFBSWtCLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDRSxDQUFELENBQVYsQ0FBTixHQUF1QkosTUFBTSxDQUFDRSxTQUFTLENBQUNFLENBQUQsQ0FBVixDQUFqQyxDQUE3QztBQUNILEtBRkQsTUFHSztBQUNEOUIsTUFBQUEsR0FBRyxDQUFDNEIsU0FBUyxDQUFDRSxDQUFELENBQVYsQ0FBSCxHQUFvQkosTUFBTSxDQUFDRSxTQUFTLENBQUNFLENBQUQsQ0FBVixDQUFOLEdBQXVCckIsQ0FBQyxJQUFJa0IsTUFBTSxDQUFDQyxTQUFTLENBQUNFLENBQUQsQ0FBVixDQUFOLEdBQXVCSixNQUFNLENBQUNFLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFWLENBQWpDLENBQTVDO0FBQ0g7QUFDSjtBQUNKLEVBRUQ7OztBQUNPLFNBQVNDLGVBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQ2xDLE9BQUssSUFBSUYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0UsR0FBRyxDQUFDQyxNQUF4QixFQUFnQ0gsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxRQUFNSSxTQUFTLEdBQUdKLENBQUMsR0FBRyxnQ0FBZSxDQUFmLEVBQWtCRSxHQUFHLENBQUNDLE1BQUosR0FBYUgsQ0FBL0IsQ0FBdEI7QUFDQSxRQUFNSyxHQUFHLEdBQUdILEdBQUcsQ0FBQ0UsU0FBRCxDQUFmO0FBQ0FGLElBQUFBLEdBQUcsQ0FBQ0UsU0FBRCxDQUFILEdBQWlCRixHQUFHLENBQUNGLENBQUQsQ0FBcEI7QUFDQUUsSUFBQUEsR0FBRyxDQUFDRixDQUFELENBQUgsR0FBU0ssR0FBVDtBQUNIO0FBQ0o7O0FBRU0sU0FBU0MsVUFBVCxHQUF1QjtBQUMxQixNQUFJQyxHQUFHLEdBQUcsNkJBQVksQ0FBQyxDQUFiLEVBQWdCLENBQWhCLENBQVY7QUFDQUEsRUFBQUEsR0FBRyxLQUFLLENBQVIsR0FBWUEsR0FBRyxFQUFmLEdBQW9CQSxHQUFwQjtBQUNBLFNBQU8saUJBQUtBLEdBQUwsQ0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWF0NCwgUXVhdCwgcmFuZG9tLCByYW5kb21SYW5nZSwgcmFuZG9tUmFuZ2VJbnQsIFZlYzIsIFZlYzMgfSBmcm9tICcuLi8uLi92YWx1ZS10eXBlcyc7XHJcbmltcG9ydCB7IHNpZ24gfSBmcm9tICcuLi8uLi92YWx1ZS10eXBlcy91dGlscyc7XHJcbmltcG9ydCB7IFNwYWNlIH0gZnJvbSAnLi9lbnVtJztcclxuXHJcbmV4cG9ydCBjb25zdCBwYXJ0aWNsZUVtaXRaQXhpcyA9IG5ldyBWZWMzKDAsIDAsIC0xKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUcmFuc2Zvcm0gKHN5c3RlbVNwYWNlLCBtb2R1bGVTcGFjZSwgd29ybGRUcmFuc2Zvcm0sIG91dFF1YXQpIHtcclxuICAgIGlmIChtb2R1bGVTcGFjZSAhPT0gc3lzdGVtU3BhY2UpIHtcclxuICAgICAgICBpZiAoc3lzdGVtU3BhY2UgPT09IFNwYWNlLldvcmxkKSB7XHJcbiAgICAgICAgICAgIE1hdDQuZ2V0Um90YXRpb24ob3V0UXVhdCwgd29ybGRUcmFuc2Zvcm0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTWF0NC5pbnZlcnQod29ybGRUcmFuc2Zvcm0sIHdvcmxkVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgTWF0NC5nZXRSb3RhdGlvbihvdXRRdWF0LCB3b3JsZFRyYW5zZm9ybSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgUXVhdC5zZXQob3V0UXVhdCwgMCwgMCwgMCwgMSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZml4ZWRBbmdsZVVuaXRWZWN0b3IyIChvdXQsIHRoZXRhKSB7XHJcbiAgICBWZWMyLnNldChvdXQsIE1hdGguY29zKHRoZXRhKSwgTWF0aC5zaW4odGhldGEpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVVuaXRWZWN0b3IyIChvdXQpIHtcclxuICAgIGNvbnN0IGEgPSByYW5kb21SYW5nZSgwLCAyICogTWF0aC5QSSk7XHJcbiAgICBjb25zdCB4ID0gTWF0aC5jb3MoYSk7XHJcbiAgICBjb25zdCB5ID0gTWF0aC5zaW4oYSk7XHJcbiAgICBWZWMyLnNldChvdXQsIHgsIHkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tVW5pdFZlY3RvciAob3V0KSB7XHJcbiAgICBjb25zdCB6ID0gcmFuZG9tUmFuZ2UoLTEsIDEpO1xyXG4gICAgY29uc3QgYSA9IHJhbmRvbVJhbmdlKDAsIDIgKiBNYXRoLlBJKTtcclxuICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoMSAtIHogKiB6KTtcclxuICAgIGNvbnN0IHggPSByICogTWF0aC5jb3MoYSk7XHJcbiAgICBjb25zdCB5ID0gciAqIE1hdGguc2luKGEpO1xyXG4gICAgVmVjMy5zZXQob3V0LCB4LCB5LCB6KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVBvaW50SW5Vbml0U3BoZXJlIChvdXQpIHtcclxuICAgIHJhbmRvbVVuaXRWZWN0b3Iob3V0KTtcclxuICAgIFZlYzMuc2NhbGUob3V0LCBvdXQsIHJhbmRvbSgpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVBvaW50QmV0d2VlblNwaGVyZSAob3V0LCBtaW5SYWRpdXMsIG1heFJhZGl1cykge1xyXG4gICAgcmFuZG9tVW5pdFZlY3RvcihvdXQpO1xyXG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgbWluUmFkaXVzICsgKG1heFJhZGl1cyAtIG1pblJhZGl1cykgKiByYW5kb20oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEluVW5pdENpcmNsZSAob3V0KSB7XHJcbiAgICByYW5kb21Vbml0VmVjdG9yMihvdXQpO1xyXG4gICAgb3V0LnogPSAwO1xyXG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgcmFuZG9tKCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlIChvdXQsIG1pblJhZGl1cywgbWF4UmFkaXVzKSB7XHJcbiAgICByYW5kb21Vbml0VmVjdG9yMihvdXQpO1xyXG4gICAgb3V0LnogPSAwO1xyXG4gICAgVmVjMy5zY2FsZShvdXQsIG91dCwgbWluUmFkaXVzICsgKG1heFJhZGl1cyAtIG1pblJhZGl1cykgKiByYW5kb20oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEJldHdlZW5DaXJjbGVBdEZpeGVkQW5nbGUgKG91dCwgbWluUmFkaXVzLCBtYXhSYWRpdXMsIHRoZXRhKSB7XHJcbiAgICBmaXhlZEFuZ2xlVW5pdFZlY3RvcjIob3V0LCB0aGV0YSk7XHJcbiAgICBvdXQueiA9IDA7XHJcbiAgICBWZWMzLnNjYWxlKG91dCwgb3V0LCBtaW5SYWRpdXMgKyAobWF4UmFkaXVzIC0gbWluUmFkaXVzKSAqIHJhbmRvbSgpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVBvaW50SW5DdWJlIChvdXQsIGV4dGVudHMpIHtcclxuICAgIFZlYzMuc2V0KG91dCxcclxuICAgICAgICByYW5kb21SYW5nZSgtZXh0ZW50cy54LCBleHRlbnRzLngpLFxyXG4gICAgICAgIHJhbmRvbVJhbmdlKC1leHRlbnRzLnksIGV4dGVudHMueSksXHJcbiAgICAgICAgcmFuZG9tUmFuZ2UoLWV4dGVudHMueiwgZXh0ZW50cy56KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Qb2ludEJldHdlZW5DdWJlIChvdXQsIG1pbkJveCwgbWF4Qm94KSB7XHJcbiAgICBjb25zdCBzdWJzY3JpcHQgPSBbJ3gnLCAneScsICd6J107XHJcbiAgICBjb25zdCBlZGdlID0gcmFuZG9tUmFuZ2VJbnQoMCwgMyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgIGlmIChpID09PSBlZGdlKSB7XHJcbiAgICAgICAgICAgIG91dFtzdWJzY3JpcHRbaV1dID0gcmFuZG9tUmFuZ2UoLW1heEJveFtzdWJzY3JpcHRbaV1dLCBtYXhCb3hbc3Vic2NyaXB0W2ldXSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB4ID0gcmFuZG9tKCkgKiAyIC0gMTtcclxuICAgICAgICBpZiAoeCA8IDApIHtcclxuICAgICAgICAgICAgb3V0W3N1YnNjcmlwdFtpXV0gPSAtbWluQm94W3N1YnNjcmlwdFtpXV0gKyB4ICogKG1heEJveFtzdWJzY3JpcHRbaV1dIC0gbWluQm94W3N1YnNjcmlwdFtpXV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb3V0W3N1YnNjcmlwdFtpXV0gPSBtaW5Cb3hbc3Vic2NyaXB0W2ldXSArIHggKiAobWF4Qm94W3N1YnNjcmlwdFtpXV0gLSBtaW5Cb3hbc3Vic2NyaXB0W2ldXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBGaXNoZXLigJNZYXRlcyBzaHVmZmxlXHJcbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Tb3J0QXJyYXkgKGFycikge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB0cmFuc3Bvc2UgPSBpICsgcmFuZG9tUmFuZ2VJbnQoMCwgYXJyLmxlbmd0aCAtIGkpO1xyXG4gICAgICAgIGNvbnN0IHZhbCA9IGFyclt0cmFuc3Bvc2VdO1xyXG4gICAgICAgIGFyclt0cmFuc3Bvc2VdID0gYXJyW2ldO1xyXG4gICAgICAgIGFycltpXSA9IHZhbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVNpZ24gKCkge1xyXG4gICAgbGV0IHNnbiA9IHJhbmRvbVJhbmdlKC0xLCAxKTtcclxuICAgIHNnbiA9PT0gMCA/IHNnbisrIDogc2duO1xyXG4gICAgcmV0dXJuIHNpZ24oc2duKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==