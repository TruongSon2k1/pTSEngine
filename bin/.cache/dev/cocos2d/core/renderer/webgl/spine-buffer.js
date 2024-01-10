
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/spine-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var SpineBuffer = cc.Class({
  name: 'cc.SpineBuffer',
  "extends": require('./mesh-buffer'),
  requestStatic: function requestStatic(vertexCount, indiceCount) {
    this.checkAndSwitchBuffer(vertexCount);
    var byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    var indiceOffset = this.indiceOffset + indiceCount;
    var byteLength = this._vData.byteLength;
    var indiceLength = this._iData.length;

    if (byteOffset > byteLength || indiceOffset > indiceLength) {
      while (byteLength < byteOffset || indiceLength < indiceOffset) {
        this._initVDataCount *= 2;
        this._initIDataCount *= 2;
        byteLength = this._initVDataCount * 4;
        indiceLength = this._initIDataCount;
      }

      this._reallocBuffer();
    }

    var offsetInfo = this._offsetInfo;
    offsetInfo.vertexOffset = this.vertexOffset;
    offsetInfo.indiceOffset = this.indiceOffset;
    offsetInfo.byteOffset = this.byteOffset;
  },
  adjust: function adjust(vertexCount, indiceCount) {
    this.vertexOffset += vertexCount;
    this.indiceOffset += indiceCount;
    this.byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    this._dirty = true;
  }
});
cc.SpineBuffer = module.exports = SpineBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcc3BpbmUtYnVmZmVyLmpzIl0sIm5hbWVzIjpbIlNwaW5lQnVmZmVyIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJyZXF1aXJlIiwicmVxdWVzdFN0YXRpYyIsInZlcnRleENvdW50IiwiaW5kaWNlQ291bnQiLCJjaGVja0FuZFN3aXRjaEJ1ZmZlciIsImJ5dGVPZmZzZXQiLCJfdmVydGV4Qnl0ZXMiLCJpbmRpY2VPZmZzZXQiLCJieXRlTGVuZ3RoIiwiX3ZEYXRhIiwiaW5kaWNlTGVuZ3RoIiwiX2lEYXRhIiwibGVuZ3RoIiwiX2luaXRWRGF0YUNvdW50IiwiX2luaXRJRGF0YUNvdW50IiwiX3JlYWxsb2NCdWZmZXIiLCJvZmZzZXRJbmZvIiwiX29mZnNldEluZm8iLCJ2ZXJ0ZXhPZmZzZXQiLCJhZGp1c3QiLCJfZGlydHkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTQyxPQUFPLENBQUMsZUFBRCxDQUZPO0FBSXZCQyxFQUFBQSxhQUp1Qix5QkFJUkMsV0FKUSxFQUlLQyxXQUpMLEVBSWtCO0FBRXJDLFNBQUtDLG9CQUFMLENBQTBCRixXQUExQjtBQUVBLFFBQUlHLFVBQVUsR0FBRyxLQUFLQSxVQUFMLEdBQWtCSCxXQUFXLEdBQUcsS0FBS0ksWUFBdEQ7QUFDQSxRQUFJQyxZQUFZLEdBQUcsS0FBS0EsWUFBTCxHQUFvQkosV0FBdkM7QUFFQSxRQUFJSyxVQUFVLEdBQUcsS0FBS0MsTUFBTCxDQUFZRCxVQUE3QjtBQUNBLFFBQUlFLFlBQVksR0FBRyxLQUFLQyxNQUFMLENBQVlDLE1BQS9COztBQUNBLFFBQUlQLFVBQVUsR0FBR0csVUFBYixJQUEyQkQsWUFBWSxHQUFHRyxZQUE5QyxFQUE0RDtBQUN4RCxhQUFPRixVQUFVLEdBQUdILFVBQWIsSUFBMkJLLFlBQVksR0FBR0gsWUFBakQsRUFBK0Q7QUFDM0QsYUFBS00sZUFBTCxJQUF3QixDQUF4QjtBQUNBLGFBQUtDLGVBQUwsSUFBd0IsQ0FBeEI7QUFFQU4sUUFBQUEsVUFBVSxHQUFHLEtBQUtLLGVBQUwsR0FBdUIsQ0FBcEM7QUFDQUgsUUFBQUEsWUFBWSxHQUFHLEtBQUtJLGVBQXBCO0FBQ0g7O0FBRUQsV0FBS0MsY0FBTDtBQUNIOztBQUVELFFBQUlDLFVBQVUsR0FBRyxLQUFLQyxXQUF0QjtBQUNBRCxJQUFBQSxVQUFVLENBQUNFLFlBQVgsR0FBMEIsS0FBS0EsWUFBL0I7QUFDQUYsSUFBQUEsVUFBVSxDQUFDVCxZQUFYLEdBQTBCLEtBQUtBLFlBQS9CO0FBQ0FTLElBQUFBLFVBQVUsQ0FBQ1gsVUFBWCxHQUF3QixLQUFLQSxVQUE3QjtBQUNILEdBN0JzQjtBQStCdkJjLEVBQUFBLE1BL0J1QixrQkErQmZqQixXQS9CZSxFQStCRkMsV0EvQkUsRUErQlc7QUFDOUIsU0FBS2UsWUFBTCxJQUFxQmhCLFdBQXJCO0FBQ0EsU0FBS0ssWUFBTCxJQUFxQkosV0FBckI7QUFFQSxTQUFLRSxVQUFMLEdBQWtCLEtBQUtBLFVBQUwsR0FBa0JILFdBQVcsR0FBRyxLQUFLSSxZQUF2RDtBQUVBLFNBQUtjLE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUF0Q3NCLENBQVQsQ0FBbEI7QUF5Q0F2QixFQUFFLENBQUNELFdBQUgsR0FBaUJ5QixNQUFNLENBQUNDLE9BQVAsR0FBaUIxQixXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbInZhciBTcGluZUJ1ZmZlciA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5TcGluZUJ1ZmZlcicsXHJcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL21lc2gtYnVmZmVyJyksXHJcblxyXG4gICAgcmVxdWVzdFN0YXRpYyAodmVydGV4Q291bnQsIGluZGljZUNvdW50KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGVja0FuZFN3aXRjaEJ1ZmZlcih2ZXJ0ZXhDb3VudCk7XHJcblxyXG4gICAgICAgIGxldCBieXRlT2Zmc2V0ID0gdGhpcy5ieXRlT2Zmc2V0ICsgdmVydGV4Q291bnQgKiB0aGlzLl92ZXJ0ZXhCeXRlcztcclxuICAgICAgICBsZXQgaW5kaWNlT2Zmc2V0ID0gdGhpcy5pbmRpY2VPZmZzZXQgKyBpbmRpY2VDb3VudDtcclxuXHJcbiAgICAgICAgbGV0IGJ5dGVMZW5ndGggPSB0aGlzLl92RGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIGxldCBpbmRpY2VMZW5ndGggPSB0aGlzLl9pRGF0YS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPiBieXRlTGVuZ3RoIHx8IGluZGljZU9mZnNldCA+IGluZGljZUxlbmd0aCkge1xyXG4gICAgICAgICAgICB3aGlsZSAoYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgfHwgaW5kaWNlTGVuZ3RoIDwgaW5kaWNlT2Zmc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0VkRhdGFDb3VudCAqPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdElEYXRhQ291bnQgKj0gMjtcclxuXHJcbiAgICAgICAgICAgICAgICBieXRlTGVuZ3RoID0gdGhpcy5faW5pdFZEYXRhQ291bnQgKiA0O1xyXG4gICAgICAgICAgICAgICAgaW5kaWNlTGVuZ3RoID0gdGhpcy5faW5pdElEYXRhQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JlYWxsb2NCdWZmZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXRJbmZvID0gdGhpcy5fb2Zmc2V0SW5mbztcclxuICAgICAgICBvZmZzZXRJbmZvLnZlcnRleE9mZnNldCA9IHRoaXMudmVydGV4T2Zmc2V0O1xyXG4gICAgICAgIG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0ID0gdGhpcy5pbmRpY2VPZmZzZXQ7XHJcbiAgICAgICAgb2Zmc2V0SW5mby5ieXRlT2Zmc2V0ID0gdGhpcy5ieXRlT2Zmc2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGp1c3QgKHZlcnRleENvdW50LCBpbmRpY2VDb3VudCkge1xyXG4gICAgICAgIHRoaXMudmVydGV4T2Zmc2V0ICs9IHZlcnRleENvdW50O1xyXG4gICAgICAgIHRoaXMuaW5kaWNlT2Zmc2V0ICs9IGluZGljZUNvdW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIHZlcnRleENvdW50ICogdGhpcy5fdmVydGV4Qnl0ZXM7XHJcblxyXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5TcGluZUJ1ZmZlciA9IG1vZHVsZS5leHBvcnRzID0gU3BpbmVCdWZmZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=