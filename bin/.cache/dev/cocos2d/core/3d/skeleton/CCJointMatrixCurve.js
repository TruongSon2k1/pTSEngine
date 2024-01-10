
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCJointMatrixCurve.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _require = require('../../../animation/animation-curves'),
    DynamicAnimCurve = _require.DynamicAnimCurve,
    quickFindIndex = _require.quickFindIndex;

var JointMatrixCurve = cc.Class({
  name: 'cc.JointMatrixCurve',
  "extends": DynamicAnimCurve,
  _findFrameIndex: quickFindIndex,
  sample: function sample(time, ratio) {
    var ratios = this.ratios;

    var index = this._findFrameIndex(ratios, ratio);

    if (index < -1) {
      index = ~index - 1;
    }

    var pairs = this.pairs;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      pair.target._jointMatrix = pair.values[index];
    }
  }
});
module.exports = JointMatrixCurve;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxza2VsZXRvblxcQ0NKb2ludE1hdHJpeEN1cnZlLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJEeW5hbWljQW5pbUN1cnZlIiwicXVpY2tGaW5kSW5kZXgiLCJKb2ludE1hdHJpeEN1cnZlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJfZmluZEZyYW1lSW5kZXgiLCJzYW1wbGUiLCJ0aW1lIiwicmF0aW8iLCJyYXRpb3MiLCJpbmRleCIsInBhaXJzIiwiaSIsImxlbmd0aCIsInBhaXIiLCJ0YXJnZXQiLCJfam9pbnRNYXRyaXgiLCJ2YWx1ZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O2VBQTZDQSxPQUFPLENBQUMscUNBQUQ7SUFBNUNDLDRCQUFBQTtJQUFrQkMsMEJBQUFBOztBQUUxQixJQUFJQyxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSxxQkFEc0I7QUFFNUIsYUFBU0wsZ0JBRm1CO0FBSTVCTSxFQUFBQSxlQUFlLEVBQUVMLGNBSlc7QUFLNUJNLEVBQUFBLE1BTDRCLGtCQUtwQkMsSUFMb0IsRUFLZEMsS0FMYyxFQUtQO0FBQ2pCLFFBQUlDLE1BQU0sR0FBRyxLQUFLQSxNQUFsQjs7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0wsZUFBTCxDQUFxQkksTUFBckIsRUFBNkJELEtBQTdCLENBQVo7O0FBQ0EsUUFBSUUsS0FBSyxHQUFHLENBQUMsQ0FBYixFQUFnQjtBQUNaQSxNQUFBQSxLQUFLLEdBQUcsQ0FBQ0EsS0FBRCxHQUFTLENBQWpCO0FBQ0g7O0FBRUQsUUFBSUMsS0FBSyxHQUFHLEtBQUtBLEtBQWpCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxVQUFJRSxJQUFJLEdBQUdILEtBQUssQ0FBQ0MsQ0FBRCxDQUFoQjtBQUNBRSxNQUFBQSxJQUFJLENBQUNDLE1BQUwsQ0FBWUMsWUFBWixHQUEyQkYsSUFBSSxDQUFDRyxNQUFMLENBQVlQLEtBQVosQ0FBM0I7QUFDSDtBQUNKO0FBakIyQixDQUFULENBQXZCO0FBb0JBUSxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQixnQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IER5bmFtaWNBbmltQ3VydmUsIHF1aWNrRmluZEluZGV4IH0gPSByZXF1aXJlKCcuLi8uLi8uLi9hbmltYXRpb24vYW5pbWF0aW9uLWN1cnZlcycpO1xyXG5cclxubGV0IEpvaW50TWF0cml4Q3VydmUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuSm9pbnRNYXRyaXhDdXJ2ZScsXHJcbiAgICBleHRlbmRzOiBEeW5hbWljQW5pbUN1cnZlLFxyXG5cclxuICAgIF9maW5kRnJhbWVJbmRleDogcXVpY2tGaW5kSW5kZXgsXHJcbiAgICBzYW1wbGUgKHRpbWUsIHJhdGlvKSB7XHJcbiAgICAgICAgbGV0IHJhdGlvcyA9IHRoaXMucmF0aW9zO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2ZpbmRGcmFtZUluZGV4KHJhdGlvcywgcmF0aW8pO1xyXG4gICAgICAgIGlmIChpbmRleCA8IC0xKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gfmluZGV4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWlycyA9IHRoaXMucGFpcnM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGFpciA9IHBhaXJzW2ldO1xyXG4gICAgICAgICAgICBwYWlyLnRhcmdldC5fam9pbnRNYXRyaXggPSBwYWlyLnZhbHVlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSm9pbnRNYXRyaXhDdXJ2ZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=