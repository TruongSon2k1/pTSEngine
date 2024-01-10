
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/Device.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.  
var Device = function Device(canvasEL) {
  var ctx;

  try {
    ctx = canvasEL.getContext('2d');
  } catch (err) {
    console.error(err);
    return;
  } // statics


  this._canvas = canvasEL;
  this._ctx = ctx;
  this._caps = {}; // capability

  this._stats = {
    drawcalls: 0
  }; // runtime

  this._vx = this._vy = this._vw = this._vh = 0;
  this._sx = this._sy = this._sw = this._sh = 0;
};

Device.prototype._restoreTexture = function _restoreTexture(unit) {}; // ===============================
// Immediate Settings
// ===============================

/**
 * @method setViewport
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */


Device.prototype.setViewport = function setViewport(x, y, w, h) {
  if (this._vx !== x || this._vy !== y || this._vw !== w || this._vh !== h) {
    this._vx = x;
    this._vy = y;
    this._vw = w;
    this._vh = h;
  }
};
/**
 * @method setScissor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */


Device.prototype.setScissor = function setScissor(x, y, w, h) {
  if (this._sx !== x || this._sy !== y || this._sw !== w || this._sh !== h) {
    this._sx = x;
    this._sy = y;
    this._sw = w;
    this._sh = h;
  }
};

Device.prototype.clear = function clear(color) {
  var ctx = this._ctx;
  ctx.clearRect(this._vx, this._vy, this._vw, this._vh);

  if (color && (color[0] !== 0 || color[1] !== 0 || color[2] !== 0)) {
    ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    ctx.globalAlpha = color[3];
    ctx.fillRect(this._vx, this._vy, this._vw, this._vh);
  }
};

Device.prototype.resetDrawCalls = function () {
  this._stats.drawcalls = 0;
};

Device.prototype.getDrawCalls = function () {
  return this._stats.drawcalls;
};

module.exports = Device;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFxjYW52YXNcXERldmljZS5qcyJdLCJuYW1lcyI6WyJEZXZpY2UiLCJjYW52YXNFTCIsImN0eCIsImdldENvbnRleHQiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJfY2FudmFzIiwiX2N0eCIsIl9jYXBzIiwiX3N0YXRzIiwiZHJhd2NhbGxzIiwiX3Z4IiwiX3Z5IiwiX3Z3IiwiX3ZoIiwiX3N4IiwiX3N5IiwiX3N3IiwiX3NoIiwicHJvdG90eXBlIiwiX3Jlc3RvcmVUZXh0dXJlIiwidW5pdCIsInNldFZpZXdwb3J0IiwieCIsInkiLCJ3IiwiaCIsInNldFNjaXNzb3IiLCJjbGVhciIsImNvbG9yIiwiY2xlYXJSZWN0IiwiZmlsbFN0eWxlIiwiZ2xvYmFsQWxwaGEiLCJmaWxsUmVjdCIsInJlc2V0RHJhd0NhbGxzIiwiZ2V0RHJhd0NhbGxzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBO0FBRUEsSUFBSUEsTUFBTSxHQUFHLFNBQVNBLE1BQVQsQ0FBZ0JDLFFBQWhCLEVBQTBCO0FBQ3JDLE1BQUlDLEdBQUo7O0FBRUEsTUFBSTtBQUNGQSxJQUFBQSxHQUFHLEdBQUdELFFBQVEsQ0FBQ0UsVUFBVCxDQUFvQixJQUFwQixDQUFOO0FBQ0QsR0FGRCxDQUVFLE9BQU9DLEdBQVAsRUFBWTtBQUNaQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsR0FBZDtBQUNBO0FBQ0QsR0FSb0MsQ0FVckM7OztBQUNBLE9BQUtHLE9BQUwsR0FBZU4sUUFBZjtBQUNBLE9BQUtPLElBQUwsR0FBWU4sR0FBWjtBQUNBLE9BQUtPLEtBQUwsR0FBYSxFQUFiLENBYnFDLENBYXBCOztBQUNqQixPQUFLQyxNQUFMLEdBQWM7QUFDWkMsSUFBQUEsU0FBUyxFQUFFO0FBREMsR0FBZCxDQWRxQyxDQWtCckM7O0FBQ0EsT0FBS0MsR0FBTCxHQUFXLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxHQUFMLEdBQVcsS0FBS0MsR0FBTCxHQUFXLENBQTVDO0FBQ0EsT0FBS0MsR0FBTCxHQUFXLEtBQUtDLEdBQUwsR0FBVyxLQUFLQyxHQUFMLEdBQVcsS0FBS0MsR0FBTCxHQUFXLENBQTVDO0FBQ0QsQ0FyQkQ7O0FBdUJBbkIsTUFBTSxDQUFDb0IsU0FBUCxDQUFpQkMsZUFBakIsR0FBbUMsU0FBU0EsZUFBVCxDQUEwQkMsSUFBMUIsRUFBZ0MsQ0FDbEUsQ0FERCxFQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0F0QixNQUFNLENBQUNvQixTQUFQLENBQWlCRyxXQUFqQixHQUErQixTQUFTQSxXQUFULENBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsRUFBNEJDLENBQTVCLEVBQStCQyxDQUEvQixFQUFrQztBQUMvRCxNQUNFLEtBQUtmLEdBQUwsS0FBYVksQ0FBYixJQUNBLEtBQUtYLEdBQUwsS0FBYVksQ0FEYixJQUVBLEtBQUtYLEdBQUwsS0FBYVksQ0FGYixJQUdBLEtBQUtYLEdBQUwsS0FBYVksQ0FKZixFQUtFO0FBQ0EsU0FBS2YsR0FBTCxHQUFXWSxDQUFYO0FBQ0EsU0FBS1gsR0FBTCxHQUFXWSxDQUFYO0FBQ0EsU0FBS1gsR0FBTCxHQUFXWSxDQUFYO0FBQ0EsU0FBS1gsR0FBTCxHQUFXWSxDQUFYO0FBQ0Q7QUFDRixDQVpEO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBM0IsTUFBTSxDQUFDb0IsU0FBUCxDQUFpQlEsVUFBakIsR0FBOEIsU0FBU0EsVUFBVCxDQUFxQkosQ0FBckIsRUFBd0JDLENBQXhCLEVBQTJCQyxDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUM7QUFDN0QsTUFDRSxLQUFLWCxHQUFMLEtBQWFRLENBQWIsSUFDQSxLQUFLUCxHQUFMLEtBQWFRLENBRGIsSUFFQSxLQUFLUCxHQUFMLEtBQWFRLENBRmIsSUFHQSxLQUFLUCxHQUFMLEtBQWFRLENBSmYsRUFLRTtBQUNBLFNBQUtYLEdBQUwsR0FBV1EsQ0FBWDtBQUNBLFNBQUtQLEdBQUwsR0FBV1EsQ0FBWDtBQUNBLFNBQUtQLEdBQUwsR0FBV1EsQ0FBWDtBQUNBLFNBQUtQLEdBQUwsR0FBV1EsQ0FBWDtBQUNEO0FBQ0YsQ0FaRDs7QUFjQTNCLE1BQU0sQ0FBQ29CLFNBQVAsQ0FBaUJTLEtBQWpCLEdBQXlCLFNBQVNBLEtBQVQsQ0FBZ0JDLEtBQWhCLEVBQXVCO0FBQzlDLE1BQUk1QixHQUFHLEdBQUcsS0FBS00sSUFBZjtBQUNBTixFQUFBQSxHQUFHLENBQUM2QixTQUFKLENBQWMsS0FBS25CLEdBQW5CLEVBQXdCLEtBQUtDLEdBQTdCLEVBQWtDLEtBQUtDLEdBQXZDLEVBQTRDLEtBQUtDLEdBQWpEOztBQUNBLE1BQUllLEtBQUssS0FBS0EsS0FBSyxDQUFDLENBQUQsQ0FBTCxLQUFhLENBQWIsSUFBa0JBLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBYSxDQUEvQixJQUFvQ0EsS0FBSyxDQUFDLENBQUQsQ0FBTCxLQUFhLENBQXRELENBQVQsRUFBbUU7QUFDakU1QixJQUFBQSxHQUFHLENBQUM4QixTQUFKLEdBQWdCLFNBQVNGLEtBQUssQ0FBQyxDQUFELENBQWQsR0FBb0IsR0FBcEIsR0FBMEJBLEtBQUssQ0FBQyxDQUFELENBQS9CLEdBQXFDLEdBQXJDLEdBQTJDQSxLQUFLLENBQUMsQ0FBRCxDQUFoRCxHQUFxRCxHQUFyRTtBQUNBNUIsSUFBQUEsR0FBRyxDQUFDK0IsV0FBSixHQUFrQkgsS0FBSyxDQUFDLENBQUQsQ0FBdkI7QUFDQTVCLElBQUFBLEdBQUcsQ0FBQ2dDLFFBQUosQ0FBYSxLQUFLdEIsR0FBbEIsRUFBdUIsS0FBS0MsR0FBNUIsRUFBaUMsS0FBS0MsR0FBdEMsRUFBMkMsS0FBS0MsR0FBaEQ7QUFDRDtBQUNGLENBUkQ7O0FBVUFmLE1BQU0sQ0FBQ29CLFNBQVAsQ0FBaUJlLGNBQWpCLEdBQWtDLFlBQVk7QUFDNUMsT0FBS3pCLE1BQUwsQ0FBWUMsU0FBWixHQUF3QixDQUF4QjtBQUNELENBRkQ7O0FBSUFYLE1BQU0sQ0FBQ29CLFNBQVAsQ0FBaUJnQixZQUFqQixHQUFnQyxZQUFZO0FBQzFDLFNBQU8sS0FBSzFCLE1BQUwsQ0FBWUMsU0FBbkI7QUFDRCxDQUZEOztBQUlBMEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEMsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuICBcclxuIFxyXG52YXIgRGV2aWNlID0gZnVuY3Rpb24gRGV2aWNlKGNhbnZhc0VMKSB7XHJcbiAgdmFyIGN0eDtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGN0eCA9IGNhbnZhc0VMLmdldENvbnRleHQoJzJkJyk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBzdGF0aWNzXHJcbiAgdGhpcy5fY2FudmFzID0gY2FudmFzRUw7XHJcbiAgdGhpcy5fY3R4ID0gY3R4O1xyXG4gIHRoaXMuX2NhcHMgPSB7fTsgLy8gY2FwYWJpbGl0eVxyXG4gIHRoaXMuX3N0YXRzID0ge1xyXG4gICAgZHJhd2NhbGxzOiAwLFxyXG4gIH07XHJcblxyXG4gIC8vIHJ1bnRpbWVcclxuICB0aGlzLl92eCA9IHRoaXMuX3Z5ID0gdGhpcy5fdncgPSB0aGlzLl92aCA9IDA7XHJcbiAgdGhpcy5fc3ggPSB0aGlzLl9zeSA9IHRoaXMuX3N3ID0gdGhpcy5fc2ggPSAwO1xyXG59O1xyXG5cclxuRGV2aWNlLnByb3RvdHlwZS5fcmVzdG9yZVRleHR1cmUgPSBmdW5jdGlvbiBfcmVzdG9yZVRleHR1cmUgKHVuaXQpIHtcclxufTtcclxuXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gSW1tZWRpYXRlIFNldHRpbmdzXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8qKlxyXG4gKiBAbWV0aG9kIHNldFZpZXdwb3J0XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSB3XHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBoXHJcbiAqL1xyXG5EZXZpY2UucHJvdG90eXBlLnNldFZpZXdwb3J0ID0gZnVuY3Rpb24gc2V0Vmlld3BvcnQgKHgsIHksIHcsIGgpIHtcclxuICBpZiAoXHJcbiAgICB0aGlzLl92eCAhPT0geCB8fFxyXG4gICAgdGhpcy5fdnkgIT09IHkgfHxcclxuICAgIHRoaXMuX3Z3ICE9PSB3IHx8XHJcbiAgICB0aGlzLl92aCAhPT0gaFxyXG4gICkge1xyXG4gICAgdGhpcy5fdnggPSB4O1xyXG4gICAgdGhpcy5fdnkgPSB5O1xyXG4gICAgdGhpcy5fdncgPSB3O1xyXG4gICAgdGhpcy5fdmggPSBoO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAbWV0aG9kIHNldFNjaXNzb3JcclxuICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICogQHBhcmFtIHtOdW1iZXJ9IHdcclxuICogQHBhcmFtIHtOdW1iZXJ9IGhcclxuICovXHJcbkRldmljZS5wcm90b3R5cGUuc2V0U2Npc3NvciA9IGZ1bmN0aW9uIHNldFNjaXNzb3IgKHgsIHksIHcsIGgpIHtcclxuICBpZiAoXHJcbiAgICB0aGlzLl9zeCAhPT0geCB8fFxyXG4gICAgdGhpcy5fc3kgIT09IHkgfHxcclxuICAgIHRoaXMuX3N3ICE9PSB3IHx8XHJcbiAgICB0aGlzLl9zaCAhPT0gaFxyXG4gICkge1xyXG4gICAgdGhpcy5fc3ggPSB4O1xyXG4gICAgdGhpcy5fc3kgPSB5O1xyXG4gICAgdGhpcy5fc3cgPSB3O1xyXG4gICAgdGhpcy5fc2ggPSBoO1xyXG4gIH1cclxufTtcclxuXHJcbkRldmljZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoY29sb3IpIHtcclxuICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xyXG4gIGN0eC5jbGVhclJlY3QodGhpcy5fdngsIHRoaXMuX3Z5LCB0aGlzLl92dywgdGhpcy5fdmgpO1xyXG4gIGlmIChjb2xvciAmJiAoY29sb3JbMF0gIT09IDAgfHwgY29sb3JbMV0gIT09IDAgfHwgY29sb3JbMl0gIT09IDApKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYignICsgY29sb3JbMF0gKyAnLCcgKyBjb2xvclsxXSArICcsJyArIGNvbG9yWzJdICsnKSc7XHJcbiAgICBjdHguZ2xvYmFsQWxwaGEgPSBjb2xvclszXTtcclxuICAgIGN0eC5maWxsUmVjdCh0aGlzLl92eCwgdGhpcy5fdnksIHRoaXMuX3Z3LCB0aGlzLl92aCk7XHJcbiAgfVxyXG59O1xyXG5cclxuRGV2aWNlLnByb3RvdHlwZS5yZXNldERyYXdDYWxscyA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLl9zdGF0cy5kcmF3Y2FsbHMgPSAwO1xyXG59XHJcblxyXG5EZXZpY2UucHJvdG90eXBlLmdldERyYXdDYWxscyA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gdGhpcy5fc3RhdHMuZHJhd2NhbGxzO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERldmljZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=