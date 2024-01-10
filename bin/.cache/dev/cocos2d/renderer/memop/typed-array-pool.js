
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/typed-array-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _bufferPools = Array(8);

for (var i = 0; i < 8; ++i) {
  _bufferPools[i] = [];
}

function _nextPow16(v) {
  for (var _i = 16; _i <= 1 << 28; _i *= 16) {
    if (v <= _i) {
      return _i;
    }
  }

  return 0;
}

function _log2(v) {
  var r, shift;
  r = (v > 0xFFFF) << 4;
  v >>>= r;
  shift = (v > 0xFF) << 3;
  v >>>= shift;
  r |= shift;
  shift = (v > 0xF) << 2;
  v >>>= shift;
  r |= shift;
  shift = (v > 0x3) << 1;
  v >>>= shift;
  r |= shift;
  return r | v >> 1;
}

function _alloc(n) {
  var sz = _nextPow16(n);

  var bin = _bufferPools[_log2(sz) >> 2];

  if (bin.length > 0) {
    return bin.pop();
  }

  return new ArrayBuffer(sz);
}

function _free(buf) {
  _bufferPools[_log2(buf.byteLength) >> 2].push(buf);
}

var _default = {
  alloc_int8: function alloc_int8(n) {
    var result = new Int8Array(_alloc(n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_uint8: function alloc_uint8(n) {
    var result = new Uint8Array(_alloc(n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_int16: function alloc_int16(n) {
    var result = new Int16Array(_alloc(2 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_uint16: function alloc_uint16(n) {
    var result = new Uint16Array(_alloc(2 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_int32: function alloc_int32(n) {
    var result = new Int32Array(_alloc(4 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_uint32: function alloc_uint32(n) {
    var result = new Uint32Array(_alloc(4 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_float32: function alloc_float32(n) {
    var result = new Float32Array(_alloc(4 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_float64: function alloc_float64(n) {
    var result = new Float64Array(_alloc(8 * n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  alloc_dataview: function alloc_dataview(n) {
    var result = new DataView(_alloc(n), 0, n);

    if (result.length !== n) {
      return result.subarray(0, n);
    }

    return result;
  },
  free: function free(array) {
    _free(array.buffer);
  },
  reset: function reset() {
    var _bufferPools = Array(8);

    for (var _i2 = 0; _i2 < 8; ++_i2) {
      _bufferPools[_i2] = [];
    }
  }
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHJlbmRlcmVyXFxtZW1vcFxcdHlwZWQtYXJyYXktcG9vbC5qcyJdLCJuYW1lcyI6WyJfYnVmZmVyUG9vbHMiLCJBcnJheSIsImkiLCJfbmV4dFBvdzE2IiwidiIsIl9sb2cyIiwiciIsInNoaWZ0IiwiX2FsbG9jIiwibiIsInN6IiwiYmluIiwibGVuZ3RoIiwicG9wIiwiQXJyYXlCdWZmZXIiLCJfZnJlZSIsImJ1ZiIsImJ5dGVMZW5ndGgiLCJwdXNoIiwiYWxsb2NfaW50OCIsInJlc3VsdCIsIkludDhBcnJheSIsInN1YmFycmF5IiwiYWxsb2NfdWludDgiLCJVaW50OEFycmF5IiwiYWxsb2NfaW50MTYiLCJJbnQxNkFycmF5IiwiYWxsb2NfdWludDE2IiwiVWludDE2QXJyYXkiLCJhbGxvY19pbnQzMiIsIkludDMyQXJyYXkiLCJhbGxvY191aW50MzIiLCJVaW50MzJBcnJheSIsImFsbG9jX2Zsb2F0MzIiLCJGbG9hdDMyQXJyYXkiLCJhbGxvY19mbG9hdDY0IiwiRmxvYXQ2NEFycmF5IiwiYWxsb2NfZGF0YXZpZXciLCJEYXRhVmlldyIsImZyZWUiLCJhcnJheSIsImJ1ZmZlciIsInJlc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsWUFBWSxHQUFHQyxLQUFLLENBQUMsQ0FBRCxDQUF4Qjs7QUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUIsRUFBRUEsQ0FBekIsRUFBNEI7QUFDMUJGLEVBQUFBLFlBQVksQ0FBQ0UsQ0FBRCxDQUFaLEdBQWtCLEVBQWxCO0FBQ0Q7O0FBRUQsU0FBU0MsVUFBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7QUFDckIsT0FBSyxJQUFJRixFQUFDLEdBQUcsRUFBYixFQUFpQkEsRUFBQyxJQUFLLEtBQUssRUFBNUIsRUFBaUNBLEVBQUMsSUFBSSxFQUF0QyxFQUEwQztBQUN4QyxRQUFJRSxDQUFDLElBQUlG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S0FBSyxDQUFDLENBQUQsQ0FBeEI7O0FBQ0EsU0FBSyxJQUFJQyxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLENBQXBCLEVBQXVCLEVBQUVBLEdBQXpCLEVBQTRCO0FBQzFCRixNQUFBQSxZQUFZLENBQUNFLEdBQUQsQ0FBWixHQUFrQixFQUFsQjtBQUNEO0FBQ0Y7QUEzRlkiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgX2J1ZmZlclBvb2xzID0gQXJyYXkoOCk7XHJcbmZvciAobGV0IGkgPSAwOyBpIDwgODsgKytpKSB7XHJcbiAgX2J1ZmZlclBvb2xzW2ldID0gW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9uZXh0UG93MTYodikge1xyXG4gIGZvciAobGV0IGkgPSAxNjsgaSA8PSAoMSA8PCAyOCk7IGkgKj0gMTYpIHtcclxuICAgIGlmICh2IDw9IGkpIHtcclxuICAgICAgcmV0dXJuIGk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfbG9nMih2KSB7XHJcbiAgbGV0IHIsIHNoaWZ0O1xyXG4gIHIgPSAodiA+IDB4RkZGRikgPDwgNDsgdiA+Pj49IHI7XHJcbiAgc2hpZnQgPSAodiA+IDB4RkYpIDw8IDM7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcclxuICBzaGlmdCA9ICh2ID4gMHhGKSA8PCAyOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XHJcbiAgc2hpZnQgPSAodiA+IDB4MykgPDwgMTsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xyXG4gIHJldHVybiByIHwgKHYgPj4gMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9hbGxvYyhuKSB7XHJcbiAgbGV0IHN6ID0gX25leHRQb3cxNihuKTtcclxuICBsZXQgYmluID0gX2J1ZmZlclBvb2xzW19sb2cyKHN6KSA+PiAyXTtcclxuICBpZiAoYmluLmxlbmd0aCA+IDApIHtcclxuICAgIHJldHVybiBiaW4ucG9wKCk7XHJcbiAgfVxyXG4gIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoc3opO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfZnJlZShidWYpIHtcclxuICBfYnVmZmVyUG9vbHNbX2xvZzIoYnVmLmJ5dGVMZW5ndGgpID4+IDJdLnB1c2goYnVmKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGFsbG9jX2ludDgobikge1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBJbnQ4QXJyYXkoX2FsbG9jKG4pLCAwLCBuKTtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBuKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQuc3ViYXJyYXkoMCwgbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG5cclxuICBhbGxvY191aW50OChuKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoX2FsbG9jKG4pLCAwLCBuKTtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBuKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQuc3ViYXJyYXkoMCwgbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG5cclxuICBhbGxvY19pbnQxNihuKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEludDE2QXJyYXkoX2FsbG9jKDIgKiBuKSwgMCwgbik7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbikge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnN1YmFycmF5KDAsIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgYWxsb2NfdWludDE2KG4pIHtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgVWludDE2QXJyYXkoX2FsbG9jKDIgKiBuKSwgMCwgbik7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbikge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnN1YmFycmF5KDAsIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgYWxsb2NfaW50MzIobikge1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBJbnQzMkFycmF5KF9hbGxvYyg0ICogbiksIDAsIG4pO1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IG4pIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdC5zdWJhcnJheSgwLCBuKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0sXHJcblxyXG4gIGFsbG9jX3VpbnQzMihuKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IFVpbnQzMkFycmF5KF9hbGxvYyg0ICogbiksIDAsIG4pO1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggIT09IG4pIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdC5zdWJhcnJheSgwLCBuKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH0sXHJcblxyXG4gIGFsbG9jX2Zsb2F0MzIobikge1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBGbG9hdDMyQXJyYXkoX2FsbG9jKDQgKiBuKSwgMCwgbik7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbikge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnN1YmFycmF5KDAsIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgYWxsb2NfZmxvYXQ2NChuKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEZsb2F0NjRBcnJheShfYWxsb2MoOCAqIG4pLCAwLCBuKTtcclxuICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBuKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQuc3ViYXJyYXkoMCwgbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9LFxyXG5cclxuICBhbGxvY19kYXRhdmlldyhuKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IERhdGFWaWV3KF9hbGxvYyhuKSwgMCwgbik7XHJcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbikge1xyXG4gICAgICByZXR1cm4gcmVzdWx0LnN1YmFycmF5KDAsIG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSxcclxuXHJcbiAgZnJlZShhcnJheSkge1xyXG4gICAgX2ZyZWUoYXJyYXkuYnVmZmVyKTtcclxuICB9LFxyXG5cclxuICByZXNldCgpIHtcclxuICAgIGxldCBfYnVmZmVyUG9vbHMgPSBBcnJheSg4KTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgKytpKSB7XHJcbiAgICAgIF9idWZmZXJQb29sc1tpXSA9IFtdO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07Il0sInNvdXJjZVJvb3QiOiIvIn0=