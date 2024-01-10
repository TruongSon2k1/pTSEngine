
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _pool3 = _interopRequireDefault(require("../utils/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _assemblerId = 0;

function getAssemblerId(assemblerCtor) {
  if (!Object.getOwnPropertyDescriptor(assemblerCtor, '__assemblerId__')) {
    assemblerCtor.__assemblerId__ = ++_assemblerId;
  }

  return assemblerCtor.__assemblerId__;
}
/**
 * {
 *   assembler_ctor_id: []
 * }
 */


var AssemblerPool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(AssemblerPool, _Pool);

  function AssemblerPool() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Pool.call.apply(_Pool, [this].concat(args)) || this;
    _this._pool = {};
    return _this;
  }

  var _proto = AssemblerPool.prototype;

  _proto.put = function put(assembler) {
    if (!assembler) return;

    if (!this.enabled) {
      if (CC_JSB && CC_NATIVERENDERER) {
        assembler.destroy && assembler.destroy();
      }

      return;
    }

    var id = getAssemblerId(assembler.constructor);
    var pool = this._pool;

    if (!pool[id]) {
      pool[id] = [];
    }

    if (this.count > this.maxSize) return;

    this._clean(assembler);

    pool[id].push(assembler);
    this.count++;
  };

  _proto.get = function get(assemblerCtor) {
    var assembler;

    if (this.enabled) {
      var _pool = this._pool;
      var id = getAssemblerId(assemblerCtor);
      assembler = _pool[id] && _pool[id].pop();
    }

    if (!assembler) {
      assembler = new assemblerCtor();
    } else {
      this.count--;
    }

    return assembler;
  };

  _proto.clear = function clear() {
    if (CC_JSB && CC_NATIVERENDERER) {
      var _pool2 = this._pool;

      for (var name in _pool2) {
        var assemblers = _pool2[name];
        if (!assemblers) continue;

        for (var i = 0; i < assemblers.length; i++) {
          assemblers[i].destroy && assemblers[i].destroy();
        }
      }
    }

    this._pool = {};
    this.count = 0;
  };

  _proto._clean = function _clean(assembler) {
    if (CC_JSB && CC_NATIVERENDERER) {
      assembler.reset();
    }

    assembler._renderComp = null;
  };

  return AssemblerPool;
}(_pool3["default"]);

var pool = new AssemblerPool();

_pool3["default"].register('assembler', pool);

var _default = pool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxhc3NlbWJsZXItcG9vbC5qcyJdLCJuYW1lcyI6WyJfYXNzZW1ibGVySWQiLCJnZXRBc3NlbWJsZXJJZCIsImFzc2VtYmxlckN0b3IiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJfX2Fzc2VtYmxlcklkX18iLCJBc3NlbWJsZXJQb29sIiwiX3Bvb2wiLCJwdXQiLCJhc3NlbWJsZXIiLCJlbmFibGVkIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJkZXN0cm95IiwiaWQiLCJjb25zdHJ1Y3RvciIsInBvb2wiLCJjb3VudCIsIm1heFNpemUiLCJfY2xlYW4iLCJwdXNoIiwiZ2V0IiwicG9wIiwiY2xlYXIiLCJuYW1lIiwiYXNzZW1ibGVycyIsImkiLCJsZW5ndGgiLCJyZXNldCIsIl9yZW5kZXJDb21wIiwiUG9vbCIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsWUFBWSxHQUFHLENBQW5COztBQUVBLFNBQVNDLGNBQVQsQ0FBeUJDLGFBQXpCLEVBQXdDO0FBQ3BDLE1BQUksQ0FBQ0MsTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ0YsYUFBaEMsRUFBK0MsaUJBQS9DLENBQUwsRUFBd0U7QUFDcEVBLElBQUFBLGFBQWEsQ0FBQ0csZUFBZCxHQUFnQyxFQUFFTCxZQUFsQztBQUNIOztBQUNELFNBQU9FLGFBQWEsQ0FBQ0csZUFBckI7QUFDSDtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztJQUNNQzs7Ozs7Ozs7Ozs7VUFDRkMsUUFBUTs7Ozs7O1NBRVJDLE1BQUEsYUFBS0MsU0FBTCxFQUFnQjtBQUNaLFFBQUksQ0FBQ0EsU0FBTCxFQUFnQjs7QUFDaEIsUUFBSSxDQUFDLEtBQUtDLE9BQVYsRUFBbUI7QUFDZixVQUFJQyxNQUFNLElBQUlDLGlCQUFkLEVBQWlDO0FBQzdCSCxRQUFBQSxTQUFTLENBQUNJLE9BQVYsSUFBcUJKLFNBQVMsQ0FBQ0ksT0FBVixFQUFyQjtBQUNIOztBQUNEO0FBQ0g7O0FBRUQsUUFBSUMsRUFBRSxHQUFHYixjQUFjLENBQUNRLFNBQVMsQ0FBQ00sV0FBWCxDQUF2QjtBQUNBLFFBQUlDLElBQUksR0FBRyxLQUFLVCxLQUFoQjs7QUFDQSxRQUFJLENBQUNTLElBQUksQ0FBQ0YsRUFBRCxDQUFULEVBQWU7QUFDWEUsTUFBQUEsSUFBSSxDQUFDRixFQUFELENBQUosR0FBVyxFQUFYO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLRyxLQUFMLEdBQWEsS0FBS0MsT0FBdEIsRUFBK0I7O0FBRS9CLFNBQUtDLE1BQUwsQ0FBWVYsU0FBWjs7QUFDQU8sSUFBQUEsSUFBSSxDQUFDRixFQUFELENBQUosQ0FBU00sSUFBVCxDQUFjWCxTQUFkO0FBQ0EsU0FBS1EsS0FBTDtBQUNIOztTQUVESSxNQUFBLGFBQUtuQixhQUFMLEVBQW9CO0FBQ2hCLFFBQUlPLFNBQUo7O0FBRUEsUUFBSSxLQUFLQyxPQUFULEVBQWtCO0FBQ2QsVUFBSU0sS0FBSSxHQUFHLEtBQUtULEtBQWhCO0FBQ0EsVUFBSU8sRUFBRSxHQUFHYixjQUFjLENBQUNDLGFBQUQsQ0FBdkI7QUFDQU8sTUFBQUEsU0FBUyxHQUFHTyxLQUFJLENBQUNGLEVBQUQsQ0FBSixJQUFZRSxLQUFJLENBQUNGLEVBQUQsQ0FBSixDQUFTUSxHQUFULEVBQXhCO0FBQ0g7O0FBRUQsUUFBSSxDQUFDYixTQUFMLEVBQWdCO0FBQ1pBLE1BQUFBLFNBQVMsR0FBRyxJQUFJUCxhQUFKLEVBQVo7QUFDSCxLQUZELE1BR0s7QUFDRCxXQUFLZSxLQUFMO0FBQ0g7O0FBQ0QsV0FBT1IsU0FBUDtBQUNIOztTQUVEYyxRQUFBLGlCQUFTO0FBQ0wsUUFBSVosTUFBTSxJQUFJQyxpQkFBZCxFQUFpQztBQUM3QixVQUFJSSxNQUFJLEdBQUcsS0FBS1QsS0FBaEI7O0FBQ0EsV0FBSyxJQUFJaUIsSUFBVCxJQUFpQlIsTUFBakIsRUFBdUI7QUFDbkIsWUFBSVMsVUFBVSxHQUFHVCxNQUFJLENBQUNRLElBQUQsQ0FBckI7QUFDQSxZQUFJLENBQUNDLFVBQUwsRUFBaUI7O0FBRWpCLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsVUFBVSxDQUFDRSxNQUEvQixFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUN4Q0QsVUFBQUEsVUFBVSxDQUFDQyxDQUFELENBQVYsQ0FBY2IsT0FBZCxJQUF5QlksVUFBVSxDQUFDQyxDQUFELENBQVYsQ0FBY2IsT0FBZCxFQUF6QjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxTQUFLTixLQUFMLEdBQWEsRUFBYjtBQUNBLFNBQUtVLEtBQUwsR0FBYSxDQUFiO0FBQ0g7O1NBRURFLFNBQUEsZ0JBQVFWLFNBQVIsRUFBbUI7QUFDZixRQUFJRSxNQUFNLElBQUlDLGlCQUFkLEVBQWlDO0FBQzdCSCxNQUFBQSxTQUFTLENBQUNtQixLQUFWO0FBQ0g7O0FBQ0RuQixJQUFBQSxTQUFTLENBQUNvQixXQUFWLEdBQXdCLElBQXhCO0FBQ0g7OztFQWhFdUJDOztBQW1FNUIsSUFBSWQsSUFBSSxHQUFHLElBQUlWLGFBQUosRUFBWDs7QUFDQXdCLGtCQUFLQyxRQUFMLENBQWMsV0FBZCxFQUEyQmYsSUFBM0I7O2VBQ2VBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvb2wgZnJvbSAnLi4vdXRpbHMvcG9vbCc7XHJcblxyXG5sZXQgX2Fzc2VtYmxlcklkID0gMDtcclxuXHJcbmZ1bmN0aW9uIGdldEFzc2VtYmxlcklkIChhc3NlbWJsZXJDdG9yKSB7XHJcbiAgICBpZiAoIU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXNzZW1ibGVyQ3RvciwgJ19fYXNzZW1ibGVySWRfXycpKSB7XHJcbiAgICAgICAgYXNzZW1ibGVyQ3Rvci5fX2Fzc2VtYmxlcklkX18gPSArK19hc3NlbWJsZXJJZDtcclxuICAgIH1cclxuICAgIHJldHVybiBhc3NlbWJsZXJDdG9yLl9fYXNzZW1ibGVySWRfXztcclxufVxyXG5cclxuLyoqXHJcbiAqIHtcclxuICogICBhc3NlbWJsZXJfY3Rvcl9pZDogW11cclxuICogfVxyXG4gKi9cclxuY2xhc3MgQXNzZW1ibGVyUG9vbCBleHRlbmRzIFBvb2wge1xyXG4gICAgX3Bvb2wgPSB7fTtcclxuXHJcbiAgICBwdXQgKGFzc2VtYmxlcikge1xyXG4gICAgICAgIGlmICghYXNzZW1ibGVyKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xyXG4gICAgICAgICAgICAgICAgYXNzZW1ibGVyLmRlc3Ryb3kgJiYgYXNzZW1ibGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaWQgPSBnZXRBc3NlbWJsZXJJZChhc3NlbWJsZXIuY29uc3RydWN0b3IpO1xyXG4gICAgICAgIGxldCBwb29sID0gdGhpcy5fcG9vbDtcclxuICAgICAgICBpZiAoIXBvb2xbaWRdKSB7XHJcbiAgICAgICAgICAgIHBvb2xbaWRdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNvdW50ID4gdGhpcy5tYXhTaXplKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFuKGFzc2VtYmxlcik7XHJcbiAgICAgICAgcG9vbFtpZF0ucHVzaChhc3NlbWJsZXIpO1xyXG4gICAgICAgIHRoaXMuY291bnQrKztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgKGFzc2VtYmxlckN0b3IpIHtcclxuICAgICAgICBsZXQgYXNzZW1ibGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgbGV0IHBvb2wgPSB0aGlzLl9wb29sO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBnZXRBc3NlbWJsZXJJZChhc3NlbWJsZXJDdG9yKTtcclxuICAgICAgICAgICAgYXNzZW1ibGVyID0gcG9vbFtpZF0gJiYgcG9vbFtpZF0ucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWFzc2VtYmxlcikge1xyXG4gICAgICAgICAgICBhc3NlbWJsZXIgPSBuZXcgYXNzZW1ibGVyQ3RvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXNzZW1ibGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyICgpIHtcclxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIGxldCBwb29sID0gdGhpcy5fcG9vbDtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBwb29sKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNzZW1ibGVycyA9IHBvb2xbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2VtYmxlcnMpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNzZW1ibGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2VtYmxlcnNbaV0uZGVzdHJveSAmJiBhc3NlbWJsZXJzW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9wb29sID0ge307XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgX2NsZWFuIChhc3NlbWJsZXIpIHtcclxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIGFzc2VtYmxlci5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhc3NlbWJsZXIuX3JlbmRlckNvbXAgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgcG9vbCA9IG5ldyBBc3NlbWJsZXJQb29sKCk7XHJcblBvb2wucmVnaXN0ZXIoJ2Fzc2VtYmxlcicsIHBvb2wpO1xyXG5leHBvcnQgZGVmYXVsdCBwb29sO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==