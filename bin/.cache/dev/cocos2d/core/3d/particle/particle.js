
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../value-types");

var Particle = // uint
function Particle(particleSystem) {
  this.particleSystem = null;
  this.position = null;
  this.velocity = null;
  this.animatedVelocity = null;
  this.ultimateVelocity = null;
  this.angularVelocity = null;
  this.axisOfRotation = null;
  this.rotation = null;
  this.startSize = null;
  this.size = null;
  this.startColor = null;
  this.color = cc.Color.WHITE;
  this.randomSeed = null;
  this.remainingLifetime = null;
  this.startLifetime = null;
  this.emitAccumulator0 = null;
  this.emitAccumulator1 = null;
  this.frameIndex = null;
  this.particleSystem = particleSystem;
  this.position = new _valueTypes.Vec3(0, 0, 0);
  this.velocity = new _valueTypes.Vec3(0, 0, 0);
  this.animatedVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.ultimateVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.angularVelocity = new _valueTypes.Vec3(0, 0, 0);
  this.axisOfRotation = new _valueTypes.Vec3(0, 0, 0);
  this.rotation = new _valueTypes.Vec3(0, 0, 0);
  this.startSize = new _valueTypes.Vec3(0, 0, 0);
  this.size = new _valueTypes.Vec3(0, 0, 0);
  this.startColor = cc.Color.WHITE.clone();
  this.color = cc.Color.WHITE.clone();
  this.randomSeed = 0; // uint

  this.remainingLifetime = 0.0;
  this.startLifetime = 0.0;
  this.emitAccumulator0 = 0.0;
  this.emitAccumulator1 = 0.0;
  this.frameIndex = 0.0;
};

exports["default"] = Particle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwYXJ0aWNsZVxccGFydGljbGUudHMiXSwibmFtZXMiOlsiUGFydGljbGUiLCJwYXJ0aWNsZVN5c3RlbSIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJhbmltYXRlZFZlbG9jaXR5IiwidWx0aW1hdGVWZWxvY2l0eSIsImFuZ3VsYXJWZWxvY2l0eSIsImF4aXNPZlJvdGF0aW9uIiwicm90YXRpb24iLCJzdGFydFNpemUiLCJzaXplIiwic3RhcnRDb2xvciIsImNvbG9yIiwiY2MiLCJDb2xvciIsIldISVRFIiwicmFuZG9tU2VlZCIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsImVtaXRBY2N1bXVsYXRvcjAiLCJlbWl0QWNjdW11bGF0b3IxIiwiZnJhbWVJbmRleCIsIlZlYzMiLCJjbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsV0FhRTtBQU9uQixrQkFBYUMsY0FBYixFQUE2QjtBQUFBLE9BbkI3QkEsY0FtQjZCLEdBbkJaLElBbUJZO0FBQUEsT0FsQjdCQyxRQWtCNkIsR0FsQmxCLElBa0JrQjtBQUFBLE9BakI3QkMsUUFpQjZCLEdBakJsQixJQWlCa0I7QUFBQSxPQWhCN0JDLGdCQWdCNkIsR0FoQlYsSUFnQlU7QUFBQSxPQWY3QkMsZ0JBZTZCLEdBZlYsSUFlVTtBQUFBLE9BZDdCQyxlQWM2QixHQWRYLElBY1c7QUFBQSxPQWI3QkMsY0FhNkIsR0FiWixJQWFZO0FBQUEsT0FaN0JDLFFBWTZCLEdBWmxCLElBWWtCO0FBQUEsT0FYN0JDLFNBVzZCLEdBWGpCLElBV2lCO0FBQUEsT0FWN0JDLElBVTZCLEdBVnRCLElBVXNCO0FBQUEsT0FUN0JDLFVBUzZCLEdBVGhCLElBU2dCO0FBQUEsT0FSN0JDLEtBUTZCLEdBUnJCQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0MsS0FRWTtBQUFBLE9BUDdCQyxVQU82QixHQVBoQixJQU9nQjtBQUFBLE9BTjdCQyxpQkFNNkIsR0FOVCxJQU1TO0FBQUEsT0FMN0JDLGFBSzZCLEdBTGIsSUFLYTtBQUFBLE9BSjdCQyxnQkFJNkIsR0FKVixJQUlVO0FBQUEsT0FIN0JDLGdCQUc2QixHQUhWLElBR1U7QUFBQSxPQUY3QkMsVUFFNkIsR0FGaEIsSUFFZ0I7QUFDekIsT0FBS3BCLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsT0FBS0MsUUFBTCxHQUFnQixJQUFJb0IsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBaEI7QUFDQSxPQUFLbkIsUUFBTCxHQUFnQixJQUFJbUIsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBaEI7QUFDQSxPQUFLbEIsZ0JBQUwsR0FBd0IsSUFBSWtCLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQXhCO0FBQ0EsT0FBS2pCLGdCQUFMLEdBQXdCLElBQUlpQixnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF4QjtBQUNBLE9BQUtoQixlQUFMLEdBQXVCLElBQUlnQixnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF2QjtBQUNBLE9BQUtmLGNBQUwsR0FBc0IsSUFBSWUsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWYsQ0FBdEI7QUFDQSxPQUFLZCxRQUFMLEdBQWdCLElBQUljLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQWhCO0FBQ0EsT0FBS2IsU0FBTCxHQUFpQixJQUFJYSxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFqQjtBQUNBLE9BQUtaLElBQUwsR0FBWSxJQUFJWSxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFaO0FBQ0EsT0FBS1gsVUFBTCxHQUFrQkUsRUFBRSxDQUFDQyxLQUFILENBQVNDLEtBQVQsQ0FBZVEsS0FBZixFQUFsQjtBQUNBLE9BQUtYLEtBQUwsR0FBYUMsRUFBRSxDQUFDQyxLQUFILENBQVNDLEtBQVQsQ0FBZVEsS0FBZixFQUFiO0FBQ0EsT0FBS1AsVUFBTCxHQUFrQixDQUFsQixDQWJ5QixDQWFKOztBQUNyQixPQUFLQyxpQkFBTCxHQUF5QixHQUF6QjtBQUNBLE9BQUtDLGFBQUwsR0FBcUIsR0FBckI7QUFDQSxPQUFLQyxnQkFBTCxHQUF3QixHQUF4QjtBQUNBLE9BQUtDLGdCQUFMLEdBQXdCLEdBQXhCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixHQUFsQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjMywgQ29sb3IgfSBmcm9tICcuLi8uLi92YWx1ZS10eXBlcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0aWNsZSB7XHJcbiAgICBwYXJ0aWNsZVN5c3RlbSA9IG51bGw7XHJcbiAgICBwb3NpdGlvbiA9IG51bGw7XHJcbiAgICB2ZWxvY2l0eSA9IG51bGw7XHJcbiAgICBhbmltYXRlZFZlbG9jaXR5ID0gbnVsbDtcclxuICAgIHVsdGltYXRlVmVsb2NpdHkgPSBudWxsO1xyXG4gICAgYW5ndWxhclZlbG9jaXR5ID0gbnVsbDtcclxuICAgIGF4aXNPZlJvdGF0aW9uID0gbnVsbDtcclxuICAgIHJvdGF0aW9uID0gbnVsbDtcclxuICAgIHN0YXJ0U2l6ZSA9IG51bGw7XHJcbiAgICBzaXplID0gbnVsbDtcclxuICAgIHN0YXJ0Q29sb3IgPSBudWxsO1xyXG4gICAgY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgIHJhbmRvbVNlZWQgPSBudWxsOyAvLyB1aW50XHJcbiAgICByZW1haW5pbmdMaWZldGltZSA9IG51bGw7XHJcbiAgICBzdGFydExpZmV0aW1lID0gbnVsbDtcclxuICAgIGVtaXRBY2N1bXVsYXRvcjAgPSBudWxsO1xyXG4gICAgZW1pdEFjY3VtdWxhdG9yMSA9IG51bGw7XHJcbiAgICBmcmFtZUluZGV4ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciAocGFydGljbGVTeXN0ZW0pIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gcGFydGljbGVTeXN0ZW07XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGVkVmVsb2NpdHkgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnVsdGltYXRlVmVsb2NpdHkgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmFuZ3VsYXJWZWxvY2l0eSA9IG5ldyBWZWMzKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuYXhpc09mUm90YXRpb24gPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gbmV3IFZlYzMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFNpemUgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnNpemUgPSBuZXcgVmVjMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnN0YXJ0Q29sb3IgPSBjYy5Db2xvci5XSElURS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSBjYy5Db2xvci5XSElURS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMucmFuZG9tU2VlZCA9IDA7IC8vIHVpbnRcclxuICAgICAgICB0aGlzLnJlbWFpbmluZ0xpZmV0aW1lID0gMC4wO1xyXG4gICAgICAgIHRoaXMuc3RhcnRMaWZldGltZSA9IDAuMDtcclxuICAgICAgICB0aGlzLmVtaXRBY2N1bXVsYXRvcjAgPSAwLjA7XHJcbiAgICAgICAgdGhpcy5lbWl0QWNjdW11bGF0b3IxID0gMC4wO1xyXG4gICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IDAuMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==