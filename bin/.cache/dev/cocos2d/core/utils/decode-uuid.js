
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/decode-uuid.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var Base64Values = require('./misc').BASE64_VALUES;

var HexChars = '0123456789abcdef'.split('');
var _t = ['', '', '', ''];

var UuidTemplate = _t.concat(_t, '-', _t, '-', _t, '-', _t, '-', _t, _t, _t);

var Indices = UuidTemplate.map(function (x, i) {
  return x === '-' ? NaN : i;
}).filter(isFinite); // fcmR3XADNLgJ1ByKhqcC5Z -> fc991dd7-0033-4b80-9d41-c8a86a702e59

module.exports = function (base64) {
  if (base64.length !== 22) {
    return base64;
  }

  UuidTemplate[0] = base64[0];
  UuidTemplate[1] = base64[1];

  for (var i = 2, j = 2; i < 22; i += 2) {
    var lhs = Base64Values[base64.charCodeAt(i)];
    var rhs = Base64Values[base64.charCodeAt(i + 1)];
    UuidTemplate[Indices[j++]] = HexChars[lhs >> 2];
    UuidTemplate[Indices[j++]] = HexChars[(lhs & 3) << 2 | rhs >> 4];
    UuidTemplate[Indices[j++]] = HexChars[rhs & 0xF];
  }

  return UuidTemplate.join('');
};

if (CC_TEST) {
  cc._Test.decodeUuid = module.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxkZWNvZGUtdXVpZC5qcyJdLCJuYW1lcyI6WyJCYXNlNjRWYWx1ZXMiLCJyZXF1aXJlIiwiQkFTRTY0X1ZBTFVFUyIsIkhleENoYXJzIiwic3BsaXQiLCJfdCIsIlV1aWRUZW1wbGF0ZSIsImNvbmNhdCIsIkluZGljZXMiLCJtYXAiLCJ4IiwiaSIsIk5hTiIsImZpbHRlciIsImlzRmluaXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImJhc2U2NCIsImxlbmd0aCIsImoiLCJsaHMiLCJjaGFyQ29kZUF0IiwicmhzIiwiam9pbiIsIkNDX1RFU1QiLCJjYyIsIl9UZXN0IiwiZGVjb2RlVXVpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFQLENBQWtCQyxhQUFyQzs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsbUJBQW1CQyxLQUFuQixDQUF5QixFQUF6QixDQUFmO0FBRUEsSUFBSUMsRUFBRSxHQUFHLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUFUOztBQUNBLElBQUlDLFlBQVksR0FBR0QsRUFBRSxDQUFDRSxNQUFILENBQVVGLEVBQVYsRUFBYyxHQUFkLEVBQW1CQSxFQUFuQixFQUF1QixHQUF2QixFQUE0QkEsRUFBNUIsRUFBZ0MsR0FBaEMsRUFBcUNBLEVBQXJDLEVBQXlDLEdBQXpDLEVBQThDQSxFQUE5QyxFQUFrREEsRUFBbEQsRUFBc0RBLEVBQXRELENBQW5COztBQUNBLElBQUlHLE9BQU8sR0FBR0YsWUFBWSxDQUFDRyxHQUFiLENBQWlCLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUFFLFNBQU9ELENBQUMsS0FBSyxHQUFOLEdBQVlFLEdBQVosR0FBa0JELENBQXpCO0FBQTZCLENBQWhFLEVBQWtFRSxNQUFsRSxDQUF5RUMsUUFBekUsQ0FBZCxFQUVBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBVUMsTUFBVixFQUFrQjtBQUMvQixNQUFJQSxNQUFNLENBQUNDLE1BQVAsS0FBa0IsRUFBdEIsRUFBMEI7QUFDdEIsV0FBT0QsTUFBUDtBQUNIOztBQUNEWCxFQUFBQSxZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCVyxNQUFNLENBQUMsQ0FBRCxDQUF4QjtBQUNBWCxFQUFBQSxZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCVyxNQUFNLENBQUMsQ0FBRCxDQUF4Qjs7QUFDQSxPQUFLLElBQUlOLENBQUMsR0FBRyxDQUFSLEVBQVdRLENBQUMsR0FBRyxDQUFwQixFQUF1QlIsQ0FBQyxHQUFHLEVBQTNCLEVBQStCQSxDQUFDLElBQUksQ0FBcEMsRUFBdUM7QUFDbkMsUUFBSVMsR0FBRyxHQUFHcEIsWUFBWSxDQUFDaUIsTUFBTSxDQUFDSSxVQUFQLENBQWtCVixDQUFsQixDQUFELENBQXRCO0FBQ0EsUUFBSVcsR0FBRyxHQUFHdEIsWUFBWSxDQUFDaUIsTUFBTSxDQUFDSSxVQUFQLENBQWtCVixDQUFDLEdBQUcsQ0FBdEIsQ0FBRCxDQUF0QjtBQUNBTCxJQUFBQSxZQUFZLENBQUNFLE9BQU8sQ0FBQ1csQ0FBQyxFQUFGLENBQVIsQ0FBWixHQUE2QmhCLFFBQVEsQ0FBQ2lCLEdBQUcsSUFBSSxDQUFSLENBQXJDO0FBQ0FkLElBQUFBLFlBQVksQ0FBQ0UsT0FBTyxDQUFDVyxDQUFDLEVBQUYsQ0FBUixDQUFaLEdBQTZCaEIsUUFBUSxDQUFFLENBQUNpQixHQUFHLEdBQUcsQ0FBUCxLQUFhLENBQWQsR0FBbUJFLEdBQUcsSUFBSSxDQUEzQixDQUFyQztBQUNBaEIsSUFBQUEsWUFBWSxDQUFDRSxPQUFPLENBQUNXLENBQUMsRUFBRixDQUFSLENBQVosR0FBNkJoQixRQUFRLENBQUNtQixHQUFHLEdBQUcsR0FBUCxDQUFyQztBQUNIOztBQUNELFNBQU9oQixZQUFZLENBQUNpQixJQUFiLENBQWtCLEVBQWxCLENBQVA7QUFDSCxDQWREOztBQWdCQSxJQUFJQyxPQUFKLEVBQWE7QUFDVEMsRUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVNDLFVBQVQsR0FBc0JaLE1BQU0sQ0FBQ0MsT0FBN0I7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBCYXNlNjRWYWx1ZXMgPSByZXF1aXJlKCcuL21pc2MnKS5CQVNFNjRfVkFMVUVTO1xyXG5cclxudmFyIEhleENoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWYnLnNwbGl0KCcnKTtcclxuXHJcbnZhciBfdCA9IFsnJywgJycsICcnLCAnJ107XHJcbnZhciBVdWlkVGVtcGxhdGUgPSBfdC5jb25jYXQoX3QsICctJywgX3QsICctJywgX3QsICctJywgX3QsICctJywgX3QsIF90LCBfdCk7XHJcbnZhciBJbmRpY2VzID0gVXVpZFRlbXBsYXRlLm1hcChmdW5jdGlvbiAoeCwgaSkgeyByZXR1cm4geCA9PT0gJy0nID8gTmFOIDogaTsgfSkuZmlsdGVyKGlzRmluaXRlKTtcclxuXHJcbi8vIGZjbVIzWEFETkxnSjFCeUtocWNDNVogLT4gZmM5OTFkZDctMDAzMy00YjgwLTlkNDEtYzhhODZhNzAyZTU5XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJhc2U2NCkge1xyXG4gICAgaWYgKGJhc2U2NC5sZW5ndGggIT09IDIyKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhc2U2NDtcclxuICAgIH1cclxuICAgIFV1aWRUZW1wbGF0ZVswXSA9IGJhc2U2NFswXTtcclxuICAgIFV1aWRUZW1wbGF0ZVsxXSA9IGJhc2U2NFsxXTtcclxuICAgIGZvciAodmFyIGkgPSAyLCBqID0gMjsgaSA8IDIyOyBpICs9IDIpIHtcclxuICAgICAgICB2YXIgbGhzID0gQmFzZTY0VmFsdWVzW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcclxuICAgICAgICB2YXIgcmhzID0gQmFzZTY0VmFsdWVzW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XHJcbiAgICAgICAgVXVpZFRlbXBsYXRlW0luZGljZXNbaisrXV0gPSBIZXhDaGFyc1tsaHMgPj4gMl07XHJcbiAgICAgICAgVXVpZFRlbXBsYXRlW0luZGljZXNbaisrXV0gPSBIZXhDaGFyc1soKGxocyAmIDMpIDw8IDIpIHwgcmhzID4+IDRdO1xyXG4gICAgICAgIFV1aWRUZW1wbGF0ZVtJbmRpY2VzW2orK11dID0gSGV4Q2hhcnNbcmhzICYgMHhGXTtcclxuICAgIH1cclxuICAgIHJldHVybiBVdWlkVGVtcGxhdGUuam9pbignJyk7XHJcbn07XHJcblxyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAgY2MuX1Rlc3QuZGVjb2RlVXVpZCA9IG1vZHVsZS5leHBvcnRzO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9