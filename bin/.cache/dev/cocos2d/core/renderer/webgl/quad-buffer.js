
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/quad-buffer.js';
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
var MeshBuffer = require('./mesh-buffer');

var QuadBuffer = cc.Class({
  name: 'cc.QuadBuffer',
  "extends": MeshBuffer,
  _fillQuadBuffer: function _fillQuadBuffer() {
    var count = this._initIDataCount / 6;
    var buffer = this._iData;

    for (var i = 0, idx = 0; i < count; i++) {
      var vertextID = i * 4;
      buffer[idx++] = vertextID;
      buffer[idx++] = vertextID + 1;
      buffer[idx++] = vertextID + 2;
      buffer[idx++] = vertextID + 1;
      buffer[idx++] = vertextID + 3;
      buffer[idx++] = vertextID + 2;
    }

    var indicesData = new Uint16Array(this._iData.buffer, 0, count * 6);

    this._ib.update(0, indicesData);
  },
  uploadData: function uploadData() {
    if (this.byteOffset === 0 || !this._dirty) {
      return;
    } // update vertext data


    var vertexsData = new Float32Array(this._vData.buffer, 0, this.byteOffset >> 2);

    this._vb.update(0, vertexsData);

    this._dirty = false;
  },
  switchBuffer: function switchBuffer() {
    this._super(); // upload index buffer data


    var indicesData = new Uint16Array(this._iData.buffer, 0, this._initIDataCount);

    this._ib.update(0, indicesData);
  },
  _reallocBuffer: function _reallocBuffer() {
    this._reallocVData(true);

    this._reallocIData();

    this._fillQuadBuffer();
  }
});
cc.QuadBuffer = module.exports = QuadBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxccXVhZC1idWZmZXIuanMiXSwibmFtZXMiOlsiTWVzaEJ1ZmZlciIsInJlcXVpcmUiLCJRdWFkQnVmZmVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJfZmlsbFF1YWRCdWZmZXIiLCJjb3VudCIsIl9pbml0SURhdGFDb3VudCIsImJ1ZmZlciIsIl9pRGF0YSIsImkiLCJpZHgiLCJ2ZXJ0ZXh0SUQiLCJpbmRpY2VzRGF0YSIsIlVpbnQxNkFycmF5IiwiX2liIiwidXBkYXRlIiwidXBsb2FkRGF0YSIsImJ5dGVPZmZzZXQiLCJfZGlydHkiLCJ2ZXJ0ZXhzRGF0YSIsIkZsb2F0MzJBcnJheSIsIl92RGF0YSIsIl92YiIsInN3aXRjaEJ1ZmZlciIsIl9zdXBlciIsIl9yZWFsbG9jQnVmZmVyIiwiX3JlYWxsb2NWRGF0YSIsIl9yZWFsbG9jSURhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUExQjs7QUFFQSxJQUFJQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0wsVUFGYTtBQUl0Qk0sRUFBQUEsZUFKc0IsNkJBSUg7QUFDZixRQUFJQyxLQUFLLEdBQUcsS0FBS0MsZUFBTCxHQUF1QixDQUFuQztBQUNBLFFBQUlDLE1BQU0sR0FBRyxLQUFLQyxNQUFsQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBRyxDQUF0QixFQUF5QkQsQ0FBQyxHQUFHSixLQUE3QixFQUFvQ0ksQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxVQUFJRSxTQUFTLEdBQUdGLENBQUMsR0FBRyxDQUFwQjtBQUNBRixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFoQjtBQUNBSixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFTLEdBQUMsQ0FBMUI7QUFDQUosTUFBQUEsTUFBTSxDQUFDRyxHQUFHLEVBQUosQ0FBTixHQUFnQkMsU0FBUyxHQUFDLENBQTFCO0FBQ0FKLE1BQUFBLE1BQU0sQ0FBQ0csR0FBRyxFQUFKLENBQU4sR0FBZ0JDLFNBQVMsR0FBQyxDQUExQjtBQUNBSixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFTLEdBQUMsQ0FBMUI7QUFDQUosTUFBQUEsTUFBTSxDQUFDRyxHQUFHLEVBQUosQ0FBTixHQUFnQkMsU0FBUyxHQUFDLENBQTFCO0FBQ0g7O0FBRUQsUUFBSUMsV0FBVyxHQUFHLElBQUlDLFdBQUosQ0FBZ0IsS0FBS0wsTUFBTCxDQUFZRCxNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q0YsS0FBSyxHQUFHLENBQS9DLENBQWxCOztBQUNBLFNBQUtTLEdBQUwsQ0FBU0MsTUFBVCxDQUFnQixDQUFoQixFQUFtQkgsV0FBbkI7QUFDSCxHQW5CcUI7QUFxQnRCSSxFQUFBQSxVQXJCc0Isd0JBcUJSO0FBQ1YsUUFBSSxLQUFLQyxVQUFMLEtBQW9CLENBQXBCLElBQXlCLENBQUMsS0FBS0MsTUFBbkMsRUFBMkM7QUFDdkM7QUFDSCxLQUhTLENBS1Y7OztBQUNBLFFBQUlDLFdBQVcsR0FBRyxJQUFJQyxZQUFKLENBQWlCLEtBQUtDLE1BQUwsQ0FBWWQsTUFBN0IsRUFBcUMsQ0FBckMsRUFBd0MsS0FBS1UsVUFBTCxJQUFtQixDQUEzRCxDQUFsQjs7QUFDQSxTQUFLSyxHQUFMLENBQVNQLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJJLFdBQW5COztBQUVBLFNBQUtELE1BQUwsR0FBYyxLQUFkO0FBQ0gsR0EvQnFCO0FBaUN0QkssRUFBQUEsWUFqQ3NCLDBCQWlDTjtBQUNaLFNBQUtDLE1BQUwsR0FEWSxDQUVaOzs7QUFDQSxRQUFJWixXQUFXLEdBQUcsSUFBSUMsV0FBSixDQUFnQixLQUFLTCxNQUFMLENBQVlELE1BQTVCLEVBQW9DLENBQXBDLEVBQXVDLEtBQUtELGVBQTVDLENBQWxCOztBQUNBLFNBQUtRLEdBQUwsQ0FBU0MsTUFBVCxDQUFnQixDQUFoQixFQUFtQkgsV0FBbkI7QUFDSCxHQXRDcUI7QUF3Q3RCYSxFQUFBQSxjQXhDc0IsNEJBd0NKO0FBQ2QsU0FBS0MsYUFBTCxDQUFtQixJQUFuQjs7QUFDQSxTQUFLQyxhQUFMOztBQUNBLFNBQUt2QixlQUFMO0FBQ0g7QUE1Q3FCLENBQVQsQ0FBakI7QUErQ0FILEVBQUUsQ0FBQ0QsVUFBSCxHQUFnQjRCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLFVBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCBNZXNoQnVmZmVyID0gcmVxdWlyZSgnLi9tZXNoLWJ1ZmZlcicpO1xyXG5cclxubGV0IFF1YWRCdWZmZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUXVhZEJ1ZmZlcicsXHJcbiAgICBleHRlbmRzOiBNZXNoQnVmZmVyLFxyXG4gICAgXHJcbiAgICBfZmlsbFF1YWRCdWZmZXIgKCkge1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuX2luaXRJRGF0YUNvdW50IC8gNjtcclxuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5faURhdGE7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlkeCA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXh0SUQgPSBpICogNDtcclxuICAgICAgICAgICAgYnVmZmVyW2lkeCsrXSA9IHZlcnRleHRJRDtcclxuICAgICAgICAgICAgYnVmZmVyW2lkeCsrXSA9IHZlcnRleHRJRCsxO1xyXG4gICAgICAgICAgICBidWZmZXJbaWR4KytdID0gdmVydGV4dElEKzI7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMTtcclxuICAgICAgICAgICAgYnVmZmVyW2lkeCsrXSA9IHZlcnRleHRJRCszO1xyXG4gICAgICAgICAgICBidWZmZXJbaWR4KytdID0gdmVydGV4dElEKzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5kaWNlc0RhdGEgPSBuZXcgVWludDE2QXJyYXkodGhpcy5faURhdGEuYnVmZmVyLCAwLCBjb3VudCAqIDYpO1xyXG4gICAgICAgIHRoaXMuX2liLnVwZGF0ZSgwLCBpbmRpY2VzRGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwbG9hZERhdGEgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmJ5dGVPZmZzZXQgPT09IDAgfHwgIXRoaXMuX2RpcnR5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB2ZXJ0ZXh0IGRhdGFcclxuICAgICAgICBsZXQgdmVydGV4c0RhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuX3ZEYXRhLmJ1ZmZlciwgMCwgdGhpcy5ieXRlT2Zmc2V0ID4+IDIpO1xyXG4gICAgICAgIHRoaXMuX3ZiLnVwZGF0ZSgwLCB2ZXJ0ZXhzRGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHN3aXRjaEJ1ZmZlciAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICAvLyB1cGxvYWQgaW5kZXggYnVmZmVyIGRhdGFcclxuICAgICAgICBsZXQgaW5kaWNlc0RhdGEgPSBuZXcgVWludDE2QXJyYXkodGhpcy5faURhdGEuYnVmZmVyLCAwLCB0aGlzLl9pbml0SURhdGFDb3VudCk7XHJcbiAgICAgICAgdGhpcy5faWIudXBkYXRlKDAsIGluZGljZXNEYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlYWxsb2NCdWZmZXIgKCkge1xyXG4gICAgICAgIHRoaXMuX3JlYWxsb2NWRGF0YSh0cnVlKTtcclxuICAgICAgICB0aGlzLl9yZWFsbG9jSURhdGEoKTtcclxuICAgICAgICB0aGlzLl9maWxsUXVhZEJ1ZmZlcigpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlF1YWRCdWZmZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFF1YWRCdWZmZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9