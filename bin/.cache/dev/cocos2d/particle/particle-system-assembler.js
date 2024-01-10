
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/particle-system-assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../core/renderer/assembler"));

var _inputAssembler = _interopRequireDefault(require("../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ParticleSystem = require('./CCParticleSystem');

var renderer = require('../core/renderer/');

var QuadBuffer = require('../core/renderer/webgl/quad-buffer');

var vfmtPosUvColor = require('../core/renderer/webgl/vertex-format').vfmtPosUvColor;

var ParticleAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(ParticleAssembler, _Assembler);

  function ParticleAssembler(comp) {
    var _this;

    _this = _Assembler.call(this, comp) || this;
    _this._buffer = null;
    _this._ia = null;
    _this._vfmt = vfmtPosUvColor;
    return _this;
  }

  var _proto = ParticleAssembler.prototype;

  _proto.getBuffer = function getBuffer() {
    if (!this._buffer) {
      // Create quad buffer for vertex and index
      this._buffer = new QuadBuffer(renderer._handle, vfmtPosUvColor);
      this._ia = new _inputAssembler["default"]();
      this._ia._vertexBuffer = this._buffer._vb;
      this._ia._indexBuffer = this._buffer._ib;
      this._ia._start = 0;
      this._ia._count = 0;
    }

    return this._buffer;
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (!this._ia) return;
    var PositionType = cc.ParticleSystem.PositionType;

    if (comp.positionType === PositionType.RELATIVE) {
      renderer.node = comp.node.parent;
    } else {
      renderer.node = comp.node;
    }

    renderer.material = comp._materials[0];

    renderer._flushIA(this._ia);
  };

  return ParticleAssembler;
}(_assembler["default"]);

_assembler["default"].register(ParticleSystem, ParticleAssembler);

module.exports = ParticleAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHBhcnRpY2xlXFxwYXJ0aWNsZS1zeXN0ZW0tYXNzZW1ibGVyLmpzIl0sIm5hbWVzIjpbIlBhcnRpY2xlU3lzdGVtIiwicmVxdWlyZSIsInJlbmRlcmVyIiwiUXVhZEJ1ZmZlciIsInZmbXRQb3NVdkNvbG9yIiwiUGFydGljbGVBc3NlbWJsZXIiLCJjb21wIiwiX2J1ZmZlciIsIl9pYSIsIl92Zm10IiwiZ2V0QnVmZmVyIiwiX2hhbmRsZSIsIklucHV0QXNzZW1ibGVyIiwiX3ZlcnRleEJ1ZmZlciIsIl92YiIsIl9pbmRleEJ1ZmZlciIsIl9pYiIsIl9zdGFydCIsIl9jb3VudCIsImZpbGxCdWZmZXJzIiwiUG9zaXRpb25UeXBlIiwiY2MiLCJwb3NpdGlvblR5cGUiLCJSRUxBVElWRSIsIm5vZGUiLCJwYXJlbnQiLCJtYXRlcmlhbCIsIl9tYXRlcmlhbHMiLCJfZmx1c2hJQSIsIkFzc2VtYmxlciIsInJlZ2lzdGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFPQTs7Ozs7Ozs7QUFMQSxJQUFNQSxjQUFjLEdBQUdDLE9BQU8sQ0FBQyxvQkFBRCxDQUE5Qjs7QUFDQSxJQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxtQkFBRCxDQUF4Qjs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyxvQ0FBRCxDQUExQjs7QUFDQSxJQUFNRyxjQUFjLEdBQUdILE9BQU8sQ0FBQyxzQ0FBRCxDQUFQLENBQWdERyxjQUF2RTs7SUFJTUM7OztBQUNGLDZCQUFhQyxJQUFiLEVBQW1CO0FBQUE7O0FBQ2Ysa0NBQU1BLElBQU47QUFFQSxVQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUtDLEdBQUwsR0FBVyxJQUFYO0FBRUEsVUFBS0MsS0FBTCxHQUFhTCxjQUFiO0FBTmU7QUFPbEI7Ozs7U0FFRE0sWUFBQSxxQkFBYTtBQUNULFFBQUksQ0FBQyxLQUFLSCxPQUFWLEVBQW1CO0FBQ2Y7QUFDQSxXQUFLQSxPQUFMLEdBQWUsSUFBSUosVUFBSixDQUFlRCxRQUFRLENBQUNTLE9BQXhCLEVBQWlDUCxjQUFqQyxDQUFmO0FBRUEsV0FBS0ksR0FBTCxHQUFXLElBQUlJLDBCQUFKLEVBQVg7QUFDQSxXQUFLSixHQUFMLENBQVNLLGFBQVQsR0FBeUIsS0FBS04sT0FBTCxDQUFhTyxHQUF0QztBQUNBLFdBQUtOLEdBQUwsQ0FBU08sWUFBVCxHQUF3QixLQUFLUixPQUFMLENBQWFTLEdBQXJDO0FBQ0EsV0FBS1IsR0FBTCxDQUFTUyxNQUFULEdBQWtCLENBQWxCO0FBQ0EsV0FBS1QsR0FBTCxDQUFTVSxNQUFULEdBQWtCLENBQWxCO0FBQ0g7O0FBQ0QsV0FBTyxLQUFLWCxPQUFaO0FBQ0g7O1NBRURZLGNBQUEscUJBQWFiLElBQWIsRUFBbUJKLFFBQW5CLEVBQTZCO0FBQ3pCLFFBQUksQ0FBQyxLQUFLTSxHQUFWLEVBQWU7QUFFZixRQUFNWSxZQUFZLEdBQUdDLEVBQUUsQ0FBQ3JCLGNBQUgsQ0FBa0JvQixZQUF2Qzs7QUFDQSxRQUFJZCxJQUFJLENBQUNnQixZQUFMLEtBQXNCRixZQUFZLENBQUNHLFFBQXZDLEVBQWlEO0FBQzdDckIsTUFBQUEsUUFBUSxDQUFDc0IsSUFBVCxHQUFnQmxCLElBQUksQ0FBQ2tCLElBQUwsQ0FBVUMsTUFBMUI7QUFDSCxLQUZELE1BRU87QUFDSHZCLE1BQUFBLFFBQVEsQ0FBQ3NCLElBQVQsR0FBZ0JsQixJQUFJLENBQUNrQixJQUFyQjtBQUNIOztBQUNEdEIsSUFBQUEsUUFBUSxDQUFDd0IsUUFBVCxHQUFvQnBCLElBQUksQ0FBQ3FCLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBcEI7O0FBQ0F6QixJQUFBQSxRQUFRLENBQUMwQixRQUFULENBQWtCLEtBQUtwQixHQUF2QjtBQUNIOzs7RUFuQzJCcUI7O0FBc0NoQ0Esc0JBQVVDLFFBQVYsQ0FBbUI5QixjQUFuQixFQUFtQ0ssaUJBQW5DOztBQUVBMEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0IsaUJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kICBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gQ2h1a29uZyBBaXB1IHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uL2NvcmUvcmVuZGVyZXIvYXNzZW1ibGVyJztcclxuIFxyXG5jb25zdCBQYXJ0aWNsZVN5c3RlbSA9IHJlcXVpcmUoJy4vQ0NQYXJ0aWNsZVN5c3RlbScpO1xyXG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvJyk7XHJcbmNvbnN0IFF1YWRCdWZmZXIgPSByZXF1aXJlKCcuLi9jb3JlL3JlbmRlcmVyL3dlYmdsL3F1YWQtYnVmZmVyJyk7XHJcbmNvbnN0IHZmbXRQb3NVdkNvbG9yID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci93ZWJnbC92ZXJ0ZXgtZm9ybWF0JykudmZtdFBvc1V2Q29sb3I7XHJcblxyXG5pbXBvcnQgSW5wdXRBc3NlbWJsZXIgZnJvbSAnLi4vcmVuZGVyZXIvY29yZS9pbnB1dC1hc3NlbWJsZXInO1xyXG5cclxuY2xhc3MgUGFydGljbGVBc3NlbWJsZXIgZXh0ZW5kcyBBc3NlbWJsZXIge1xyXG4gICAgY29uc3RydWN0b3IgKGNvbXApIHtcclxuICAgICAgICBzdXBlcihjb21wKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pYSA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX3ZmbXQgPSB2Zm10UG9zVXZDb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWZmZXIgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBxdWFkIGJ1ZmZlciBmb3IgdmVydGV4IGFuZCBpbmRleFxyXG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgUXVhZEJ1ZmZlcihyZW5kZXJlci5faGFuZGxlLCB2Zm10UG9zVXZDb2xvcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pYSA9IG5ldyBJbnB1dEFzc2VtYmxlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pYS5fdmVydGV4QnVmZmVyID0gdGhpcy5fYnVmZmVyLl92YjtcclxuICAgICAgICAgICAgdGhpcy5faWEuX2luZGV4QnVmZmVyID0gdGhpcy5fYnVmZmVyLl9pYjtcclxuICAgICAgICAgICAgdGhpcy5faWEuX3N0YXJ0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5faWEuX2NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZmlsbEJ1ZmZlcnMgKGNvbXAsIHJlbmRlcmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pYSkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IFBvc2l0aW9uVHlwZSA9IGNjLlBhcnRpY2xlU3lzdGVtLlBvc2l0aW9uVHlwZTtcclxuICAgICAgICBpZiAoY29tcC5wb3NpdGlvblR5cGUgPT09IFBvc2l0aW9uVHlwZS5SRUxBVElWRSkge1xyXG4gICAgICAgICAgICByZW5kZXJlci5ub2RlID0gY29tcC5ub2RlLnBhcmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZW5kZXJlci5ub2RlID0gY29tcC5ub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJlci5tYXRlcmlhbCA9IGNvbXAuX21hdGVyaWFsc1swXTtcclxuICAgICAgICByZW5kZXJlci5fZmx1c2hJQSh0aGlzLl9pYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkFzc2VtYmxlci5yZWdpc3RlcihQYXJ0aWNsZVN5c3RlbSwgUGFydGljbGVBc3NlbWJsZXIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZUFzc2VtYmxlcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==