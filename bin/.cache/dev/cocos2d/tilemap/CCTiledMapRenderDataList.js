
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMapRenderDataList.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _inputAssembler = _interopRequireDefault(require("../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var TiledMapRenderDataList = cc.Class({
  name: 'cc.TiledMapRenderDataList',
  ctor: function ctor() {
    this._dataList = [];
    this._offset = 0;
  },
  _pushRenderData: function _pushRenderData() {
    var renderData = {};
    renderData.ia = new _inputAssembler["default"]();
    renderData.nodesRenderList = [];

    this._dataList.push(renderData);
  },
  popRenderData: function popRenderData(buffer) {
    if (this._offset >= this._dataList.length) {
      this._pushRenderData();
    }

    var renderData = this._dataList[this._offset];
    renderData.nodesRenderList.length = 0;
    var ia = renderData.ia;
    ia._vertexBuffer = buffer._vb;
    ia._indexBuffer = buffer._ib;
    ia._start = buffer.indiceOffset;
    ia._count = 0;
    this._offset++;
    return renderData;
  },
  pushNodesList: function pushNodesList(renderData, nodesList) {
    renderData.nodesRenderList.push(nodesList);
  },
  reset: function reset() {
    this._offset = 0;
  }
});
cc.TiledMapRenderDataList = module.exports = TiledMapRenderDataList;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVGlsZWRNYXBSZW5kZXJEYXRhTGlzdC5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcFJlbmRlckRhdGFMaXN0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiX2RhdGFMaXN0IiwiX29mZnNldCIsIl9wdXNoUmVuZGVyRGF0YSIsInJlbmRlckRhdGEiLCJpYSIsIklucHV0QXNzZW1ibGVyIiwibm9kZXNSZW5kZXJMaXN0IiwicHVzaCIsInBvcFJlbmRlckRhdGEiLCJidWZmZXIiLCJsZW5ndGgiLCJfdmVydGV4QnVmZmVyIiwiX3ZiIiwiX2luZGV4QnVmZmVyIiwiX2liIiwiX3N0YXJ0IiwiaW5kaWNlT2Zmc2V0IiwiX2NvdW50IiwicHVzaE5vZGVzTGlzdCIsIm5vZGVzTGlzdCIsInJlc2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXdCQTs7OztBQXhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFJQSxzQkFBc0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbENDLEVBQUFBLElBQUksRUFBRSwyQkFENEI7QUFHbENDLEVBQUFBLElBSGtDLGtCQUcxQjtBQUNKLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNILEdBTmlDO0FBUWxDQyxFQUFBQSxlQVJrQyw2QkFRZjtBQUNmLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBQSxJQUFBQSxVQUFVLENBQUNDLEVBQVgsR0FBZ0IsSUFBSUMsMEJBQUosRUFBaEI7QUFDQUYsSUFBQUEsVUFBVSxDQUFDRyxlQUFYLEdBQTZCLEVBQTdCOztBQUNBLFNBQUtOLFNBQUwsQ0FBZU8sSUFBZixDQUFvQkosVUFBcEI7QUFDSCxHQWJpQztBQWVsQ0ssRUFBQUEsYUFma0MseUJBZW5CQyxNQWZtQixFQWVYO0FBQ25CLFFBQUksS0FBS1IsT0FBTCxJQUFnQixLQUFLRCxTQUFMLENBQWVVLE1BQW5DLEVBQTJDO0FBQ3ZDLFdBQUtSLGVBQUw7QUFDSDs7QUFDRCxRQUFJQyxVQUFVLEdBQUcsS0FBS0gsU0FBTCxDQUFlLEtBQUtDLE9BQXBCLENBQWpCO0FBQ0FFLElBQUFBLFVBQVUsQ0FBQ0csZUFBWCxDQUEyQkksTUFBM0IsR0FBb0MsQ0FBcEM7QUFDQSxRQUFJTixFQUFFLEdBQUdELFVBQVUsQ0FBQ0MsRUFBcEI7QUFDQUEsSUFBQUEsRUFBRSxDQUFDTyxhQUFILEdBQW1CRixNQUFNLENBQUNHLEdBQTFCO0FBQ0FSLElBQUFBLEVBQUUsQ0FBQ1MsWUFBSCxHQUFrQkosTUFBTSxDQUFDSyxHQUF6QjtBQUNBVixJQUFBQSxFQUFFLENBQUNXLE1BQUgsR0FBWU4sTUFBTSxDQUFDTyxZQUFuQjtBQUNBWixJQUFBQSxFQUFFLENBQUNhLE1BQUgsR0FBWSxDQUFaO0FBQ0EsU0FBS2hCLE9BQUw7QUFDQSxXQUFPRSxVQUFQO0FBQ0gsR0E1QmlDO0FBOEJsQ2UsRUFBQUEsYUE5QmtDLHlCQThCbkJmLFVBOUJtQixFQThCUGdCLFNBOUJPLEVBOEJJO0FBQ2xDaEIsSUFBQUEsVUFBVSxDQUFDRyxlQUFYLENBQTJCQyxJQUEzQixDQUFnQ1ksU0FBaEM7QUFDSCxHQWhDaUM7QUFrQ2xDQyxFQUFBQSxLQWxDa0MsbUJBa0N6QjtBQUNMLFNBQUtuQixPQUFMLEdBQWUsQ0FBZjtBQUNIO0FBcENpQyxDQUFULENBQTdCO0FBdUNBTCxFQUFFLENBQUNELHNCQUFILEdBQTRCMEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0Isc0JBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmltcG9ydCBJbnB1dEFzc2VtYmxlciBmcm9tICcuLi9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlcic7XHJcblxyXG5sZXQgVGlsZWRNYXBSZW5kZXJEYXRhTGlzdCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5UaWxlZE1hcFJlbmRlckRhdGFMaXN0JyxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9kYXRhTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX29mZnNldCA9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wdXNoUmVuZGVyRGF0YSAoKSB7XHJcbiAgICAgICAgbGV0IHJlbmRlckRhdGEgPSB7fTtcclxuICAgICAgICByZW5kZXJEYXRhLmlhID0gbmV3IElucHV0QXNzZW1ibGVyKCk7XHJcbiAgICAgICAgcmVuZGVyRGF0YS5ub2Rlc1JlbmRlckxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLl9kYXRhTGlzdC5wdXNoKHJlbmRlckRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwb3BSZW5kZXJEYXRhIChidWZmZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fb2Zmc2V0ID49IHRoaXMuX2RhdGFMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wdXNoUmVuZGVyRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVuZGVyRGF0YSA9IHRoaXMuX2RhdGFMaXN0W3RoaXMuX29mZnNldF07XHJcbiAgICAgICAgcmVuZGVyRGF0YS5ub2Rlc1JlbmRlckxpc3QubGVuZ3RoID0gMDtcclxuICAgICAgICBsZXQgaWEgPSByZW5kZXJEYXRhLmlhO1xyXG4gICAgICAgIGlhLl92ZXJ0ZXhCdWZmZXIgPSBidWZmZXIuX3ZiO1xyXG4gICAgICAgIGlhLl9pbmRleEJ1ZmZlciA9IGJ1ZmZlci5faWI7XHJcbiAgICAgICAgaWEuX3N0YXJ0ID0gYnVmZmVyLmluZGljZU9mZnNldDtcclxuICAgICAgICBpYS5fY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX29mZnNldCsrO1xyXG4gICAgICAgIHJldHVybiByZW5kZXJEYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICBwdXNoTm9kZXNMaXN0IChyZW5kZXJEYXRhLCBub2Rlc0xpc3QpIHtcclxuICAgICAgICByZW5kZXJEYXRhLm5vZGVzUmVuZGVyTGlzdC5wdXNoKG5vZGVzTGlzdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc2V0ICgpIHtcclxuICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlRpbGVkTWFwUmVuZGVyRGF0YUxpc3QgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkTWFwUmVuZGVyRGF0YUxpc3Q7Il0sInNvdXJjZVJvb3QiOiIvIn0=