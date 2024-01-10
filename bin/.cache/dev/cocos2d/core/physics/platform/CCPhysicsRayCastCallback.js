
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/platform/CCPhysicsRayCastCallback.js';
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
function PhysicsRayCastCallback() {
  this._type = 0;
  this._fixtures = [];
  this._points = [];
  this._normals = [];
  this._fractions = [];
}

PhysicsRayCastCallback.prototype.init = function (type) {
  this._type = type;
  this._fixtures.length = 0;
  this._points.length = 0;
  this._normals.length = 0;
  this._fractions.length = 0;
};

PhysicsRayCastCallback.prototype.ReportFixture = function (fixture, point, normal, fraction) {
  if (this._type === 0) {
    // closest
    this._fixtures[0] = fixture;
    this._points[0] = point;
    this._normals[0] = normal;
    this._fractions[0] = fraction;
    return fraction;
  }

  this._fixtures.push(fixture);

  this._points.push(cc.v2(point));

  this._normals.push(cc.v2(normal));

  this._fractions.push(fraction);

  if (this._type === 1) {
    // any
    return 0;
  } else if (this._type >= 2) {
    // all
    return 1;
  }

  return fraction;
};

PhysicsRayCastCallback.prototype.getFixtures = function () {
  return this._fixtures;
};

PhysicsRayCastCallback.prototype.getPoints = function () {
  return this._points;
};

PhysicsRayCastCallback.prototype.getNormals = function () {
  return this._normals;
};

PhysicsRayCastCallback.prototype.getFractions = function () {
  return this._fractions;
};

cc.PhysicsRayCastCallback = module.exports = PhysicsRayCastCallback;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBoeXNpY3NcXHBsYXRmb3JtXFxDQ1BoeXNpY3NSYXlDYXN0Q2FsbGJhY2suanMiXSwibmFtZXMiOlsiUGh5c2ljc1JheUNhc3RDYWxsYmFjayIsIl90eXBlIiwiX2ZpeHR1cmVzIiwiX3BvaW50cyIsIl9ub3JtYWxzIiwiX2ZyYWN0aW9ucyIsInByb3RvdHlwZSIsImluaXQiLCJ0eXBlIiwibGVuZ3RoIiwiUmVwb3J0Rml4dHVyZSIsImZpeHR1cmUiLCJwb2ludCIsIm5vcm1hbCIsImZyYWN0aW9uIiwicHVzaCIsImNjIiwidjIiLCJnZXRGaXh0dXJlcyIsImdldFBvaW50cyIsImdldE5vcm1hbHMiLCJnZXRGcmFjdGlvbnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsU0FBU0Esc0JBQVQsR0FBbUM7QUFDL0IsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNIOztBQUVETCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNDLElBQWpDLEdBQXdDLFVBQVVDLElBQVYsRUFBZ0I7QUFDcEQsT0FBS1AsS0FBTCxHQUFhTyxJQUFiO0FBQ0EsT0FBS04sU0FBTCxDQUFlTyxNQUFmLEdBQXdCLENBQXhCO0FBQ0EsT0FBS04sT0FBTCxDQUFhTSxNQUFiLEdBQXNCLENBQXRCO0FBQ0EsT0FBS0wsUUFBTCxDQUFjSyxNQUFkLEdBQXVCLENBQXZCO0FBQ0EsT0FBS0osVUFBTCxDQUFnQkksTUFBaEIsR0FBeUIsQ0FBekI7QUFDSCxDQU5EOztBQVFBVCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNJLGFBQWpDLEdBQWlELFVBQVVDLE9BQVYsRUFBbUJDLEtBQW5CLEVBQTBCQyxNQUExQixFQUFrQ0MsUUFBbEMsRUFBNEM7QUFDekYsTUFBSSxLQUFLYixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQixTQUFLQyxTQUFMLENBQWUsQ0FBZixJQUFvQlMsT0FBcEI7QUFDQSxTQUFLUixPQUFMLENBQWEsQ0FBYixJQUFrQlMsS0FBbEI7QUFDQSxTQUFLUixRQUFMLENBQWMsQ0FBZCxJQUFtQlMsTUFBbkI7QUFDQSxTQUFLUixVQUFMLENBQWdCLENBQWhCLElBQXFCUyxRQUFyQjtBQUNBLFdBQU9BLFFBQVA7QUFDSDs7QUFFRCxPQUFLWixTQUFMLENBQWVhLElBQWYsQ0FBb0JKLE9BQXBCOztBQUNBLE9BQUtSLE9BQUwsQ0FBYVksSUFBYixDQUFrQkMsRUFBRSxDQUFDQyxFQUFILENBQU1MLEtBQU4sQ0FBbEI7O0FBQ0EsT0FBS1IsUUFBTCxDQUFjVyxJQUFkLENBQW1CQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUosTUFBTixDQUFuQjs7QUFDQSxPQUFLUixVQUFMLENBQWdCVSxJQUFoQixDQUFxQkQsUUFBckI7O0FBRUEsTUFBSSxLQUFLYixLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQixXQUFPLENBQVA7QUFDSCxHQUZELE1BR0ssSUFBSSxLQUFLQSxLQUFMLElBQWMsQ0FBbEIsRUFBcUI7QUFBRTtBQUN4QixXQUFPLENBQVA7QUFDSDs7QUFFRCxTQUFPYSxRQUFQO0FBQ0gsQ0F0QkQ7O0FBeUJBZCxzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNZLFdBQWpDLEdBQStDLFlBQVk7QUFDdkQsU0FBTyxLQUFLaEIsU0FBWjtBQUNILENBRkQ7O0FBSUFGLHNCQUFzQixDQUFDTSxTQUF2QixDQUFpQ2EsU0FBakMsR0FBNkMsWUFBWTtBQUNyRCxTQUFPLEtBQUtoQixPQUFaO0FBQ0gsQ0FGRDs7QUFJQUgsc0JBQXNCLENBQUNNLFNBQXZCLENBQWlDYyxVQUFqQyxHQUE4QyxZQUFZO0FBQ3RELFNBQU8sS0FBS2hCLFFBQVo7QUFDSCxDQUZEOztBQUlBSixzQkFBc0IsQ0FBQ00sU0FBdkIsQ0FBaUNlLFlBQWpDLEdBQWdELFlBQVk7QUFDeEQsU0FBTyxLQUFLaEIsVUFBWjtBQUNILENBRkQ7O0FBSUFXLEVBQUUsQ0FBQ2hCLHNCQUFILEdBQTRCc0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkIsc0JBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxuZnVuY3Rpb24gUGh5c2ljc1JheUNhc3RDYWxsYmFjayAoKSB7XHJcbiAgICB0aGlzLl90eXBlID0gMDtcclxuICAgIHRoaXMuX2ZpeHR1cmVzID0gW107XHJcbiAgICB0aGlzLl9wb2ludHMgPSBbXTtcclxuICAgIHRoaXMuX25vcm1hbHMgPSBbXTtcclxuICAgIHRoaXMuX2ZyYWN0aW9ucyA9IFtdO1xyXG59XHJcblxyXG5QaHlzaWNzUmF5Q2FzdENhbGxiYWNrLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xyXG4gICAgdGhpcy5fZml4dHVyZXMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuX3BvaW50cy5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5fbm9ybWFscy5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5fZnJhY3Rpb25zLmxlbmd0aCA9IDA7XHJcbn07XHJcblxyXG5QaHlzaWNzUmF5Q2FzdENhbGxiYWNrLnByb3RvdHlwZS5SZXBvcnRGaXh0dXJlID0gZnVuY3Rpb24gKGZpeHR1cmUsIHBvaW50LCBub3JtYWwsIGZyYWN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gMCkgeyAvLyBjbG9zZXN0XHJcbiAgICAgICAgdGhpcy5fZml4dHVyZXNbMF0gPSBmaXh0dXJlO1xyXG4gICAgICAgIHRoaXMuX3BvaW50c1swXSA9IHBvaW50O1xyXG4gICAgICAgIHRoaXMuX25vcm1hbHNbMF0gPSBub3JtYWw7XHJcbiAgICAgICAgdGhpcy5fZnJhY3Rpb25zWzBdID0gZnJhY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIGZyYWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZpeHR1cmVzLnB1c2goZml4dHVyZSk7XHJcbiAgICB0aGlzLl9wb2ludHMucHVzaChjYy52Mihwb2ludCkpO1xyXG4gICAgdGhpcy5fbm9ybWFscy5wdXNoKGNjLnYyKG5vcm1hbCkpO1xyXG4gICAgdGhpcy5fZnJhY3Rpb25zLnB1c2goZnJhY3Rpb24pO1xyXG4gICAgXHJcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gMSkgeyAvLyBhbnlcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuX3R5cGUgPj0gMikgeyAvLyBhbGxcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnJhY3Rpb247XHJcbn07XHJcblxyXG5cclxuUGh5c2ljc1JheUNhc3RDYWxsYmFjay5wcm90b3R5cGUuZ2V0Rml4dHVyZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZml4dHVyZXM7XHJcbn07XHJcblxyXG5QaHlzaWNzUmF5Q2FzdENhbGxiYWNrLnByb3RvdHlwZS5nZXRQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9pbnRzO1xyXG59O1xyXG5cclxuUGh5c2ljc1JheUNhc3RDYWxsYmFjay5wcm90b3R5cGUuZ2V0Tm9ybWFscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9ub3JtYWxzO1xyXG59O1xyXG5cclxuUGh5c2ljc1JheUNhc3RDYWxsYmFjay5wcm90b3R5cGUuZ2V0RnJhY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZyYWN0aW9ucztcclxufTtcclxuXHJcbmNjLlBoeXNpY3NSYXlDYXN0Q2FsbGJhY2sgPSBtb2R1bGUuZXhwb3J0cyA9IFBoeXNpY3NSYXlDYXN0Q2FsbGJhY2s7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9