
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/profiler/perf-counter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var Counter = require('./counter');

var PerfCounter = cc.Class({
  name: 'cc.PerfCounter',
  "extends": Counter,
  ctor: function ctor(id, opts, now) {
    // DISABLE
    // this._idstart = `${id}_start`;
    // this._idend = `${id}_end`;
    this._time = now;
  },
  start: function start(now) {
    this._time = now; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idstart);
  },
  end: function end(now) {
    this._value = now - this._time; // DISABLE: long time running will cause performance drop down
    // window.performance.mark(this._idend);
    // window.performance.measure(this._id, this._idstart, this._idend);

    this._average(this._value);
  },
  tick: function tick() {
    this.end();
    this.start();
  },
  frame: function frame(now) {
    var t = now;
    var e = t - this._time;
    this._total++;
    var avg = this._opts.average || 1000;

    if (e > avg) {
      this._value = this._total * 1000 / e;
      this._total = 0;
      this._time = t;

      this._average(this._value);
    }
  }
});
module.exports = PerfCounter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxwcm9maWxlclxccGVyZi1jb3VudGVyLmpzIl0sIm5hbWVzIjpbIkNvdW50ZXIiLCJyZXF1aXJlIiwiUGVyZkNvdW50ZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJpZCIsIm9wdHMiLCJub3ciLCJfdGltZSIsInN0YXJ0IiwiZW5kIiwiX3ZhbHVlIiwiX2F2ZXJhZ2UiLCJ0aWNrIiwiZnJhbWUiLCJ0IiwiZSIsIl90b3RhbCIsImF2ZyIsIl9vcHRzIiwiYXZlcmFnZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxXQUFELENBQXZCOztBQUVBLElBQUlDLFdBQVcsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDekJDLEVBQUFBLElBQUksRUFBRSxnQkFEbUI7QUFFekIsYUFBU0wsT0FGZ0I7QUFJekJNLEVBQUFBLElBSnlCLGdCQUluQkMsRUFKbUIsRUFJZkMsSUFKZSxFQUlUQyxHQUpTLEVBSUo7QUFDbkI7QUFDQTtBQUNBO0FBRUEsU0FBS0MsS0FBTCxHQUFhRCxHQUFiO0FBQ0QsR0FWd0I7QUFZekJFLEVBQUFBLEtBWnlCLGlCQVluQkYsR0FabUIsRUFZZDtBQUNULFNBQUtDLEtBQUwsR0FBYUQsR0FBYixDQURTLENBR1Q7QUFDQTtBQUNELEdBakJ3QjtBQW1CekJHLEVBQUFBLEdBbkJ5QixlQW1CckJILEdBbkJxQixFQW1CaEI7QUFDUCxTQUFLSSxNQUFMLEdBQWNKLEdBQUcsR0FBRyxLQUFLQyxLQUF6QixDQURPLENBR1A7QUFDQTtBQUNBOztBQUVBLFNBQUtJLFFBQUwsQ0FBYyxLQUFLRCxNQUFuQjtBQUNELEdBM0J3QjtBQTZCekJFLEVBQUFBLElBN0J5QixrQkE2QmxCO0FBQ0wsU0FBS0gsR0FBTDtBQUNBLFNBQUtELEtBQUw7QUFDRCxHQWhDd0I7QUFrQ3pCSyxFQUFBQSxLQWxDeUIsaUJBa0NuQlAsR0FsQ21CLEVBa0NkO0FBQ1QsUUFBSVEsQ0FBQyxHQUFHUixHQUFSO0FBQ0EsUUFBSVMsQ0FBQyxHQUFHRCxDQUFDLEdBQUcsS0FBS1AsS0FBakI7QUFDQSxTQUFLUyxNQUFMO0FBQ0EsUUFBSUMsR0FBRyxHQUFHLEtBQUtDLEtBQUwsQ0FBV0MsT0FBWCxJQUFzQixJQUFoQzs7QUFFQSxRQUFJSixDQUFDLEdBQUdFLEdBQVIsRUFBYTtBQUNYLFdBQUtQLE1BQUwsR0FBYyxLQUFLTSxNQUFMLEdBQWMsSUFBZCxHQUFxQkQsQ0FBbkM7QUFDQSxXQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFdBQUtULEtBQUwsR0FBYU8sQ0FBYjs7QUFDQSxXQUFLSCxRQUFMLENBQWMsS0FBS0QsTUFBbkI7QUFDRDtBQUNGO0FBOUN3QixDQUFULENBQWxCO0FBaURBVSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QixXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENvdW50ZXIgPSByZXF1aXJlKCcuL2NvdW50ZXInKTtcclxuXHJcbmxldCBQZXJmQ291bnRlciA9IGNjLkNsYXNzKHtcclxuICBuYW1lOiAnY2MuUGVyZkNvdW50ZXInLFxyXG4gIGV4dGVuZHM6IENvdW50ZXIsXHJcbiAgXHJcbiAgY3RvciAoaWQsIG9wdHMsIG5vdykge1xyXG4gICAgLy8gRElTQUJMRVxyXG4gICAgLy8gdGhpcy5faWRzdGFydCA9IGAke2lkfV9zdGFydGA7XHJcbiAgICAvLyB0aGlzLl9pZGVuZCA9IGAke2lkfV9lbmRgO1xyXG5cclxuICAgIHRoaXMuX3RpbWUgPSBub3c7XHJcbiAgfSxcclxuXHJcbiAgc3RhcnQobm93KSB7XHJcbiAgICB0aGlzLl90aW1lID0gbm93O1xyXG5cclxuICAgIC8vIERJU0FCTEU6IGxvbmcgdGltZSBydW5uaW5nIHdpbGwgY2F1c2UgcGVyZm9ybWFuY2UgZHJvcCBkb3duXHJcbiAgICAvLyB3aW5kb3cucGVyZm9ybWFuY2UubWFyayh0aGlzLl9pZHN0YXJ0KTtcclxuICB9LFxyXG5cclxuICBlbmQobm93KSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IG5vdyAtIHRoaXMuX3RpbWU7XHJcblxyXG4gICAgLy8gRElTQUJMRTogbG9uZyB0aW1lIHJ1bm5pbmcgd2lsbCBjYXVzZSBwZXJmb3JtYW5jZSBkcm9wIGRvd25cclxuICAgIC8vIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKHRoaXMuX2lkZW5kKTtcclxuICAgIC8vIHdpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKHRoaXMuX2lkLCB0aGlzLl9pZHN0YXJ0LCB0aGlzLl9pZGVuZCk7XHJcblxyXG4gICAgdGhpcy5fYXZlcmFnZSh0aGlzLl92YWx1ZSk7XHJcbiAgfSxcclxuXHJcbiAgdGljaygpIHtcclxuICAgIHRoaXMuZW5kKCk7XHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgfSxcclxuXHJcbiAgZnJhbWUobm93KSB7XHJcbiAgICBsZXQgdCA9IG5vdztcclxuICAgIGxldCBlID0gdCAtIHRoaXMuX3RpbWU7XHJcbiAgICB0aGlzLl90b3RhbCsrO1xyXG4gICAgbGV0IGF2ZyA9IHRoaXMuX29wdHMuYXZlcmFnZSB8fCAxMDAwO1xyXG5cclxuICAgIGlmIChlID4gYXZnKSB7XHJcbiAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5fdG90YWwgKiAxMDAwIC8gZTtcclxuICAgICAgdGhpcy5fdG90YWwgPSAwO1xyXG4gICAgICB0aGlzLl90aW1lID0gdDtcclxuICAgICAgdGhpcy5fYXZlcmFnZSh0aGlzLl92YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUGVyZkNvdW50ZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9