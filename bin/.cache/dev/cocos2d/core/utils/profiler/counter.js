
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/profiler/counter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var Counter = cc.Class({
  name: 'cc.Counter',
  ctor: function ctor(id, opts, now) {
    this._id = id;
    this._opts = opts || {};
    this._value = 0;
    this._total = 0;
    this._averageValue = 0;
    this._accumValue = 0;
    this._accumSamples = 0;
    this._accumStart = now;
  },
  properties: {
    value: {
      get: function get() {
        return this._value;
      },
      set: function set(v) {
        this._value = v;
      }
    }
  },
  _average: function _average(v, now) {
    if (this._opts.average) {
      this._accumValue += v;
      ++this._accumSamples;
      var t = now;

      if (t - this._accumStart >= this._opts.average) {
        this._averageValue = this._accumValue / this._accumSamples;
        this._accumValue = 0;
        this._accumStart = t;
        this._accumSamples = 0;
      }
    }
  },
  sample: function sample(now) {
    this._average(this._value, now);
  },
  human: function human() {
    var v = this._opts.average ? this._averageValue : this._value;
    return Math.round(v * 100) / 100;
  },
  alarm: function alarm() {
    return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over;
  }
});
module.exports = Counter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxwcm9maWxlclxcY291bnRlci5qcyJdLCJuYW1lcyI6WyJDb3VudGVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiaWQiLCJvcHRzIiwibm93IiwiX2lkIiwiX29wdHMiLCJfdmFsdWUiLCJfdG90YWwiLCJfYXZlcmFnZVZhbHVlIiwiX2FjY3VtVmFsdWUiLCJfYWNjdW1TYW1wbGVzIiwiX2FjY3VtU3RhcnQiLCJwcm9wZXJ0aWVzIiwidmFsdWUiLCJnZXQiLCJzZXQiLCJ2IiwiX2F2ZXJhZ2UiLCJhdmVyYWdlIiwidCIsInNhbXBsZSIsImh1bWFuIiwiTWF0aCIsInJvdW5kIiwiYWxhcm0iLCJiZWxvdyIsIm92ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNuQkMsRUFBQUEsSUFBSSxFQUFFLFlBRGE7QUFFbkJDLEVBQUFBLElBRm1CLGdCQUViQyxFQUZhLEVBRVRDLElBRlMsRUFFSEMsR0FGRyxFQUVFO0FBQ2pCLFNBQUtDLEdBQUwsR0FBV0gsRUFBWDtBQUNBLFNBQUtJLEtBQUwsR0FBYUgsSUFBSSxJQUFJLEVBQXJCO0FBRUEsU0FBS0ksTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsQ0FBckI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJSLEdBQW5CO0FBQ0gsR0Faa0I7QUFjbkJTLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUU7QUFDSEMsTUFBQUEsR0FERyxpQkFDSTtBQUNILGVBQU8sS0FBS1IsTUFBWjtBQUNILE9BSEU7QUFJSFMsTUFBQUEsR0FKRyxlQUlFQyxDQUpGLEVBSUs7QUFDSixhQUFLVixNQUFMLEdBQWNVLENBQWQ7QUFDSDtBQU5FO0FBREMsR0FkTztBQXlCbkJDLEVBQUFBLFFBekJtQixvQkF5QlRELENBekJTLEVBeUJOYixHQXpCTSxFQXlCRDtBQUNkLFFBQUksS0FBS0UsS0FBTCxDQUFXYSxPQUFmLEVBQXdCO0FBQ3BCLFdBQUtULFdBQUwsSUFBb0JPLENBQXBCO0FBQ0EsUUFBRSxLQUFLTixhQUFQO0FBRUEsVUFBSVMsQ0FBQyxHQUFHaEIsR0FBUjs7QUFDQSxVQUFJZ0IsQ0FBQyxHQUFHLEtBQUtSLFdBQVQsSUFBd0IsS0FBS04sS0FBTCxDQUFXYSxPQUF2QyxFQUFnRDtBQUM1QyxhQUFLVixhQUFMLEdBQXFCLEtBQUtDLFdBQUwsR0FBbUIsS0FBS0MsYUFBN0M7QUFDQSxhQUFLRCxXQUFMLEdBQW1CLENBQW5CO0FBQ0EsYUFBS0UsV0FBTCxHQUFtQlEsQ0FBbkI7QUFDQSxhQUFLVCxhQUFMLEdBQXFCLENBQXJCO0FBQ0g7QUFDSjtBQUNKLEdBdENrQjtBQXdDbkJVLEVBQUFBLE1BeENtQixrQkF3Q1hqQixHQXhDVyxFQXdDTjtBQUNULFNBQUtjLFFBQUwsQ0FBYyxLQUFLWCxNQUFuQixFQUEyQkgsR0FBM0I7QUFDSCxHQTFDa0I7QUE0Q25Ca0IsRUFBQUEsS0E1Q21CLG1CQTRDVjtBQUNMLFFBQUlMLENBQUMsR0FBRyxLQUFLWCxLQUFMLENBQVdhLE9BQVgsR0FBcUIsS0FBS1YsYUFBMUIsR0FBMEMsS0FBS0YsTUFBdkQ7QUFDQSxXQUFPZ0IsSUFBSSxDQUFDQyxLQUFMLENBQVdQLENBQUMsR0FBRyxHQUFmLElBQXNCLEdBQTdCO0FBQ0gsR0EvQ2tCO0FBaURuQlEsRUFBQUEsS0FqRG1CLG1CQWlEVjtBQUNMLFdBQ0ssS0FBS25CLEtBQUwsQ0FBV29CLEtBQVgsSUFBb0IsS0FBS25CLE1BQUwsR0FBYyxLQUFLRCxLQUFMLENBQVdvQixLQUE5QyxJQUNDLEtBQUtwQixLQUFMLENBQVdxQixJQUFYLElBQW1CLEtBQUtwQixNQUFMLEdBQWMsS0FBS0QsS0FBTCxDQUFXcUIsSUFGakQ7QUFJSDtBQXREa0IsQ0FBVCxDQUFkO0FBeURBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJoQyxPQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImxldCBDb3VudGVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkNvdW50ZXInLFxyXG4gICAgY3RvciAoaWQsIG9wdHMsIG5vdykge1xyXG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHMgfHwge307XHJcblxyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl90b3RhbCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYXZlcmFnZVZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9hY2N1bVZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9hY2N1bVNhbXBsZXMgPSAwO1xyXG4gICAgICAgIHRoaXMuX2FjY3VtU3RhcnQgPSBub3c7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2F2ZXJhZ2UgKHYsIG5vdykge1xyXG4gICAgICAgIGlmICh0aGlzLl9vcHRzLmF2ZXJhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWNjdW1WYWx1ZSArPSB2O1xyXG4gICAgICAgICAgICArK3RoaXMuX2FjY3VtU2FtcGxlcztcclxuXHJcbiAgICAgICAgICAgIGxldCB0ID0gbm93O1xyXG4gICAgICAgICAgICBpZiAodCAtIHRoaXMuX2FjY3VtU3RhcnQgPj0gdGhpcy5fb3B0cy5hdmVyYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdmVyYWdlVmFsdWUgPSB0aGlzLl9hY2N1bVZhbHVlIC8gdGhpcy5fYWNjdW1TYW1wbGVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjdW1WYWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2N1bVN0YXJ0ID0gdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtU2FtcGxlcyA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNhbXBsZSAobm93KSB7XHJcbiAgICAgICAgdGhpcy5fYXZlcmFnZSh0aGlzLl92YWx1ZSwgbm93KTtcclxuICAgIH0sXHJcblxyXG4gICAgaHVtYW4gKCkge1xyXG4gICAgICAgIGxldCB2ID0gdGhpcy5fb3B0cy5hdmVyYWdlID8gdGhpcy5fYXZlcmFnZVZhbHVlIDogdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodiAqIDEwMCkgLyAxMDA7XHJcbiAgICB9LFxyXG5cclxuICAgIGFsYXJtICgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAodGhpcy5fb3B0cy5iZWxvdyAmJiB0aGlzLl92YWx1ZSA8IHRoaXMuX29wdHMuYmVsb3cpIHx8XHJcbiAgICAgICAgICAgICh0aGlzLl9vcHRzLm92ZXIgJiYgdGhpcy5fdmFsdWUgPiB0aGlzLl9vcHRzLm92ZXIpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ291bnRlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=