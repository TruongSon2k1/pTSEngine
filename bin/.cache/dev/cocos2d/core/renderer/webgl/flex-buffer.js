
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/flex-buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/****************************************************************************
 LICENSING AGREEMENT
 
 Xiamen Yaji Software Co., Ltd., (the “Licensor”) grants the user (the “Licensee”) non-exclusive and non-transferable rights to use the software according to the following conditions:
 a.  The Licensee shall pay royalties to the Licensor, and the amount of those royalties and the payment method are subject to separate negotiations between the parties.
 b.  The software is licensed for use rather than sold, and the Licensor reserves all rights over the software that are not expressly granted (whether by implication, reservation or prohibition).
 c.  The open source codes contained in the software are subject to the MIT Open Source Licensing Agreement (see the attached for the details);
 d.  The Licensee acknowledges and consents to the possibility that errors may occur during the operation of the software for one or more technical reasons, and the Licensee shall take precautions and prepare remedies for such events. In such circumstance, the Licensor shall provide software patches or updates according to the agreement between the two parties. The Licensor will not assume any liability beyond the explicit wording of this Licensing Agreement.
 e.  Where the Licensor must assume liability for the software according to relevant laws, the Licensor’s entire liability is limited to the annual royalty payable by the Licensee.
 f.  The Licensor owns the portions listed in the root directory and subdirectory (if any) in the software and enjoys the intellectual property rights over those portions. As for the portions owned by the Licensor, the Licensee shall not:
 - i. Bypass or avoid any relevant technical protection measures in the products or services;
 - ii. Release the source codes to any other parties;
 - iii. Disassemble, decompile, decipher, attack, emulate, exploit or reverse-engineer these portion of code;
 - iv. Apply it to any third-party products or services without Licensor’s permission;
 - v. Publish, copy, rent, lease, sell, export, import, distribute or lend any products containing these portions of code;
 - vi. Allow others to use any services relevant to the technology of these codes;
 - vii. Conduct any other act beyond the scope of this Licensing Agreement.
 g.  This Licensing Agreement terminates immediately if the Licensee breaches this Agreement. The Licensor may claim compensation from the Licensee where the Licensee’s breach causes any damage to the Licensor.
 h.  The laws of the People's Republic of China apply to this Licensing Agreement.
 i.  This Agreement is made in both Chinese and English, and the Chinese version shall prevail the event of conflict.
 ****************************************************************************/
var FlexBuffer = /*#__PURE__*/function () {
  function FlexBuffer(handler, index, verticesCount, indicesCount, vfmt) {
    this._handler = handler;
    this._index = index;
    this._vfmt = vfmt;
    this._verticesBytes = vfmt._bytes;
    this._initVerticesCount = verticesCount;
    this._initIndicesCount = indicesCount;
    this.reset();
  }

  var _proto = FlexBuffer.prototype;

  _proto._reallocVData = function _reallocVData(floatsCount, oldData) {
    this.vData = new Float32Array(floatsCount);
    this.uintVData = new Uint32Array(this.vData.buffer);

    if (oldData) {
      this.vData.set(oldData);
    }

    this._handler.updateMesh(this._index, this.vData, this.iData);
  };

  _proto._reallocIData = function _reallocIData(indicesCount, oldData) {
    this.iData = new Uint16Array(indicesCount);

    if (oldData) {
      this.iData.set(oldData);
    }

    this._handler.updateMesh(this._index, this.vData, this.iData);
  };

  _proto.reserve = function reserve(verticesCount, indicesCount) {
    var floatsCount = verticesCount * this._verticesBytes >> 2;
    var newFloatsCount = this.vData.length;
    var realloced = false;

    if (floatsCount > newFloatsCount) {
      while (newFloatsCount < floatsCount) {
        newFloatsCount *= 2;
      }

      this._reallocVData(newFloatsCount, this.vData);

      realloced = true;
    }

    var newIndicesCount = this.iData.length;

    if (indicesCount > newIndicesCount) {
      while (newIndicesCount < indicesCount) {
        newIndicesCount *= 2;
      }

      this._reallocIData(indicesCount, this.iData);

      realloced = true;
    }

    return realloced;
  };

  _proto.used = function used(verticesCount, indicesCount) {
    this.usedVertices = verticesCount;
    this.usedIndices = indicesCount;
    this.usedVerticesFloats = verticesCount * this._verticesBytes >> 2;

    this._handler.updateMeshRange(verticesCount, indicesCount);
  };

  _proto.reset = function reset() {
    var floatsCount = this._initVerticesCount * this._verticesBytes >> 2;

    this._reallocVData(floatsCount);

    this._reallocIData(this._initIndicesCount);

    this.usedVertices = 0;
    this.usedVerticesFloats = 0;
    this.usedIndices = 0;
  };

  return FlexBuffer;
}();

exports["default"] = FlexBuffer;
cc.FlexBuffer = FlexBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHJlbmRlcmVyXFx3ZWJnbFxcZmxleC1idWZmZXIuanMiXSwibmFtZXMiOlsiRmxleEJ1ZmZlciIsImhhbmRsZXIiLCJpbmRleCIsInZlcnRpY2VzQ291bnQiLCJpbmRpY2VzQ291bnQiLCJ2Zm10IiwiX2hhbmRsZXIiLCJfaW5kZXgiLCJfdmZtdCIsIl92ZXJ0aWNlc0J5dGVzIiwiX2J5dGVzIiwiX2luaXRWZXJ0aWNlc0NvdW50IiwiX2luaXRJbmRpY2VzQ291bnQiLCJyZXNldCIsIl9yZWFsbG9jVkRhdGEiLCJmbG9hdHNDb3VudCIsIm9sZERhdGEiLCJ2RGF0YSIsIkZsb2F0MzJBcnJheSIsInVpbnRWRGF0YSIsIlVpbnQzMkFycmF5IiwiYnVmZmVyIiwic2V0IiwidXBkYXRlTWVzaCIsImlEYXRhIiwiX3JlYWxsb2NJRGF0YSIsIlVpbnQxNkFycmF5IiwicmVzZXJ2ZSIsIm5ld0Zsb2F0c0NvdW50IiwibGVuZ3RoIiwicmVhbGxvY2VkIiwibmV3SW5kaWNlc0NvdW50IiwidXNlZCIsInVzZWRWZXJ0aWNlcyIsInVzZWRJbmRpY2VzIiwidXNlZFZlcnRpY2VzRmxvYXRzIiwidXBkYXRlTWVzaFJhbmdlIiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFFcUJBO0FBQ2pCLHNCQUFhQyxPQUFiLEVBQXNCQyxLQUF0QixFQUE2QkMsYUFBN0IsRUFBNENDLFlBQTVDLEVBQTBEQyxJQUExRCxFQUFnRTtBQUM1RCxTQUFLQyxRQUFMLEdBQWdCTCxPQUFoQjtBQUNBLFNBQUtNLE1BQUwsR0FBY0wsS0FBZDtBQUNBLFNBQUtNLEtBQUwsR0FBYUgsSUFBYjtBQUNBLFNBQUtJLGNBQUwsR0FBc0JKLElBQUksQ0FB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OlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIExJQ0VOU0lORyBBR1JFRU1FTlRcclxuIFxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuLCAodGhlIOKAnExpY2Vuc29y4oCdKSBncmFudHMgdGhlIHVzZXIgKHRoZSDigJxMaWNlbnNlZeKAnSkgbm9uLWV4Y2x1c2l2ZSBhbmQgbm9uLXRyYW5zZmVyYWJsZSByaWdodHMgdG8gdXNlIHRoZSBzb2Z0d2FyZSBhY2NvcmRpbmcgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gYS4gIFRoZSBMaWNlbnNlZSBzaGFsbCBwYXkgcm95YWx0aWVzIHRvIHRoZSBMaWNlbnNvciwgYW5kIHRoZSBhbW91bnQgb2YgdGhvc2Ugcm95YWx0aWVzIGFuZCB0aGUgcGF5bWVudCBtZXRob2QgYXJlIHN1YmplY3QgdG8gc2VwYXJhdGUgbmVnb3RpYXRpb25zIGJldHdlZW4gdGhlIHBhcnRpZXMuXHJcbiBiLiAgVGhlIHNvZnR3YXJlIGlzIGxpY2Vuc2VkIGZvciB1c2UgcmF0aGVyIHRoYW4gc29sZCwgYW5kIHRoZSBMaWNlbnNvciByZXNlcnZlcyBhbGwgcmlnaHRzIG92ZXIgdGhlIHNvZnR3YXJlIHRoYXQgYXJlIG5vdCBleHByZXNzbHkgZ3JhbnRlZCAod2hldGhlciBieSBpbXBsaWNhdGlvbiwgcmVzZXJ2YXRpb24gb3IgcHJvaGliaXRpb24pLlxyXG4gYy4gIFRoZSBvcGVuIHNvdXJjZSBjb2RlcyBjb250YWluZWQgaW4gdGhlIHNvZnR3YXJlIGFyZSBzdWJqZWN0IHRvIHRoZSBNSVQgT3BlbiBTb3VyY2UgTGljZW5zaW5nIEFncmVlbWVudCAoc2VlIHRoZSBhdHRhY2hlZCBmb3IgdGhlIGRldGFpbHMpO1xyXG4gZC4gIFRoZSBMaWNlbnNlZSBhY2tub3dsZWRnZXMgYW5kIGNvbnNlbnRzIHRvIHRoZSBwb3NzaWJpbGl0eSB0aGF0IGVycm9ycyBtYXkgb2NjdXIgZHVyaW5nIHRoZSBvcGVyYXRpb24gb2YgdGhlIHNvZnR3YXJlIGZvciBvbmUgb3IgbW9yZSB0ZWNobmljYWwgcmVhc29ucywgYW5kIHRoZSBMaWNlbnNlZSBzaGFsbCB0YWtlIHByZWNhdXRpb25zIGFuZCBwcmVwYXJlIHJlbWVkaWVzIGZvciBzdWNoIGV2ZW50cy4gSW4gc3VjaCBjaXJjdW1zdGFuY2UsIHRoZSBMaWNlbnNvciBzaGFsbCBwcm92aWRlIHNvZnR3YXJlIHBhdGNoZXMgb3IgdXBkYXRlcyBhY2NvcmRpbmcgdG8gdGhlIGFncmVlbWVudCBiZXR3ZWVuIHRoZSB0d28gcGFydGllcy4gVGhlIExpY2Vuc29yIHdpbGwgbm90IGFzc3VtZSBhbnkgbGlhYmlsaXR5IGJleW9uZCB0aGUgZXhwbGljaXQgd29yZGluZyBvZiB0aGlzIExpY2Vuc2luZyBBZ3JlZW1lbnQuXHJcbiBlLiAgV2hlcmUgdGhlIExpY2Vuc29yIG11c3QgYXNzdW1lIGxpYWJpbGl0eSBmb3IgdGhlIHNvZnR3YXJlIGFjY29yZGluZyB0byByZWxldmFudCBsYXdzLCB0aGUgTGljZW5zb3LigJlzIGVudGlyZSBsaWFiaWxpdHkgaXMgbGltaXRlZCB0byB0aGUgYW5udWFsIHJveWFsdHkgcGF5YWJsZSBieSB0aGUgTGljZW5zZWUuXHJcbiBmLiAgVGhlIExpY2Vuc29yIG93bnMgdGhlIHBvcnRpb25zIGxpc3RlZCBpbiB0aGUgcm9vdCBkaXJlY3RvcnkgYW5kIHN1YmRpcmVjdG9yeSAoaWYgYW55KSBpbiB0aGUgc29mdHdhcmUgYW5kIGVuam95cyB0aGUgaW50ZWxsZWN0dWFsIHByb3BlcnR5IHJpZ2h0cyBvdmVyIHRob3NlIHBvcnRpb25zLiBBcyBmb3IgdGhlIHBvcnRpb25zIG93bmVkIGJ5IHRoZSBMaWNlbnNvciwgdGhlIExpY2Vuc2VlIHNoYWxsIG5vdDpcclxuIC0gaS4gQnlwYXNzIG9yIGF2b2lkIGFueSByZWxldmFudCB0ZWNobmljYWwgcHJvdGVjdGlvbiBtZWFzdXJlcyBpbiB0aGUgcHJvZHVjdHMgb3Igc2VydmljZXM7XHJcbiAtIGlpLiBSZWxlYXNlIHRoZSBzb3VyY2UgY29kZXMgdG8gYW55IG90aGVyIHBhcnRpZXM7XHJcbiAtIGlpaS4gRGlzYXNzZW1ibGUsIGRlY29tcGlsZSwgZGVjaXBoZXIsIGF0dGFjaywgZW11bGF0ZSwgZXhwbG9pdCBvciByZXZlcnNlLWVuZ2luZWVyIHRoZXNlIHBvcnRpb24gb2YgY29kZTtcclxuIC0gaXYuIEFwcGx5IGl0IHRvIGFueSB0aGlyZC1wYXJ0eSBwcm9kdWN0cyBvciBzZXJ2aWNlcyB3aXRob3V0IExpY2Vuc29y4oCZcyBwZXJtaXNzaW9uO1xyXG4gLSB2LiBQdWJsaXNoLCBjb3B5LCByZW50LCBsZWFzZSwgc2VsbCwgZXhwb3J0LCBpbXBvcnQsIGRpc3RyaWJ1dGUgb3IgbGVuZCBhbnkgcHJvZHVjdHMgY29udGFpbmluZyB0aGVzZSBwb3J0aW9ucyBvZiBjb2RlO1xyXG4gLSB2aS4gQWxsb3cgb3RoZXJzIHRvIHVzZSBhbnkgc2VydmljZXMgcmVsZXZhbnQgdG8gdGhlIHRlY2hub2xvZ3kgb2YgdGhlc2UgY29kZXM7XHJcbiAtIHZpaS4gQ29uZHVjdCBhbnkgb3RoZXIgYWN0IGJleW9uZCB0aGUgc2NvcGUgb2YgdGhpcyBMaWNlbnNpbmcgQWdyZWVtZW50LlxyXG4gZy4gIFRoaXMgTGljZW5zaW5nIEFncmVlbWVudCB0ZXJtaW5hdGVzIGltbWVkaWF0ZWx5IGlmIHRoZSBMaWNlbnNlZSBicmVhY2hlcyB0aGlzIEFncmVlbWVudC4gVGhlIExpY2Vuc29yIG1heSBjbGFpbSBjb21wZW5zYXRpb24gZnJvbSB0aGUgTGljZW5zZWUgd2hlcmUgdGhlIExpY2Vuc2Vl4oCZcyBicmVhY2ggY2F1c2VzIGFueSBkYW1hZ2UgdG8gdGhlIExpY2Vuc29yLlxyXG4gaC4gIFRoZSBsYXdzIG9mIHRoZSBQZW9wbGUncyBSZXB1YmxpYyBvZiBDaGluYSBhcHBseSB0byB0aGlzIExpY2Vuc2luZyBBZ3JlZW1lbnQuXHJcbiBpLiAgVGhpcyBBZ3JlZW1lbnQgaXMgbWFkZSBpbiBib3RoIENoaW5lc2UgYW5kIEVuZ2xpc2gsIGFuZCB0aGUgQ2hpbmVzZSB2ZXJzaW9uIHNoYWxsIHByZXZhaWwgdGhlIGV2ZW50IG9mIGNvbmZsaWN0LlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsZXhCdWZmZXIge1xyXG4gICAgY29uc3RydWN0b3IgKGhhbmRsZXIsIGluZGV4LCB2ZXJ0aWNlc0NvdW50LCBpbmRpY2VzQ291bnQsIHZmbXQpIHtcclxuICAgICAgICB0aGlzLl9oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuX3ZmbXQgPSB2Zm10O1xyXG4gICAgICAgIHRoaXMuX3ZlcnRpY2VzQnl0ZXMgPSB2Zm10Ll9ieXRlcztcclxuXHJcbiAgICAgICAgdGhpcy5faW5pdFZlcnRpY2VzQ291bnQgPSB2ZXJ0aWNlc0NvdW50O1xyXG4gICAgICAgIHRoaXMuX2luaXRJbmRpY2VzQ291bnQgPSBpbmRpY2VzQ291bnQ7XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVhbGxvY1ZEYXRhIChmbG9hdHNDb3VudCwgb2xkRGF0YSkge1xyXG4gICAgICAgIHRoaXMudkRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KGZsb2F0c0NvdW50KTtcclxuICAgICAgICB0aGlzLnVpbnRWRGF0YSA9IG5ldyBVaW50MzJBcnJheSh0aGlzLnZEYXRhLmJ1ZmZlcik7XHJcblxyXG4gICAgICAgIGlmIChvbGREYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudkRhdGEuc2V0KG9sZERhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faGFuZGxlci51cGRhdGVNZXNoKHRoaXMuX2luZGV4LCB0aGlzLnZEYXRhLCB0aGlzLmlEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBfcmVhbGxvY0lEYXRhIChpbmRpY2VzQ291bnQsIG9sZERhdGEpIHtcclxuICAgICAgICB0aGlzLmlEYXRhID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXNDb3VudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG9sZERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5pRGF0YS5zZXQob2xkRGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9oYW5kbGVyLnVwZGF0ZU1lc2godGhpcy5faW5kZXgsIHRoaXMudkRhdGEsIHRoaXMuaURhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2VydmUgKHZlcnRpY2VzQ291bnQsIGluZGljZXNDb3VudCkge1xyXG4gICAgICAgIGxldCBmbG9hdHNDb3VudCA9IHZlcnRpY2VzQ291bnQgKiB0aGlzLl92ZXJ0aWNlc0J5dGVzID4+IDI7XHJcbiAgICAgICAgbGV0IG5ld0Zsb2F0c0NvdW50ID0gdGhpcy52RGF0YS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHJlYWxsb2NlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZmxvYXRzQ291bnQgPiBuZXdGbG9hdHNDb3VudCkge1xyXG4gICAgICAgICAgICB3aGlsZSAobmV3RmxvYXRzQ291bnQgPCBmbG9hdHNDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgbmV3RmxvYXRzQ291bnQgKj0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZWFsbG9jVkRhdGEobmV3RmxvYXRzQ291bnQsIHRoaXMudkRhdGEpO1xyXG4gICAgICAgICAgICByZWFsbG9jZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld0luZGljZXNDb3VudCA9IHRoaXMuaURhdGEubGVuZ3RoO1xyXG4gICAgICAgIGlmIChpbmRpY2VzQ291bnQgPiBuZXdJbmRpY2VzQ291bnQpIHtcclxuICAgICAgICAgICAgd2hpbGUgKG5ld0luZGljZXNDb3VudCA8IGluZGljZXNDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SW5kaWNlc0NvdW50ICo9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVhbGxvY0lEYXRhKGluZGljZXNDb3VudCwgdGhpcy5pRGF0YSk7XHJcbiAgICAgICAgICAgIHJlYWxsb2NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVhbGxvY2VkO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWQgKHZlcnRpY2VzQ291bnQsIGluZGljZXNDb3VudCkge1xyXG4gICAgICAgIHRoaXMudXNlZFZlcnRpY2VzID0gdmVydGljZXNDb3VudDtcclxuICAgICAgICB0aGlzLnVzZWRJbmRpY2VzID0gaW5kaWNlc0NvdW50O1xyXG4gICAgICAgIHRoaXMudXNlZFZlcnRpY2VzRmxvYXRzID0gdmVydGljZXNDb3VudCAqIHRoaXMuX3ZlcnRpY2VzQnl0ZXMgPj4gMjtcclxuXHJcbiAgICAgICAgdGhpcy5faGFuZGxlci51cGRhdGVNZXNoUmFuZ2UodmVydGljZXNDb3VudCwgaW5kaWNlc0NvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCAoKSB7XHJcbiAgICAgICAgbGV0IGZsb2F0c0NvdW50ID0gdGhpcy5faW5pdFZlcnRpY2VzQ291bnQgKiB0aGlzLl92ZXJ0aWNlc0J5dGVzID4+IDI7XHJcbiAgICAgICAgdGhpcy5fcmVhbGxvY1ZEYXRhKGZsb2F0c0NvdW50KTtcclxuICAgICAgICB0aGlzLl9yZWFsbG9jSURhdGEodGhpcy5faW5pdEluZGljZXNDb3VudCk7XHJcblxyXG4gICAgICAgIHRoaXMudXNlZFZlcnRpY2VzID0gMDtcclxuICAgICAgICB0aGlzLnVzZWRWZXJ0aWNlc0Zsb2F0cyA9IDA7XHJcbiAgICAgICAgdGhpcy51c2VkSW5kaWNlcyA9IDA7XHJcbiAgICB9XHJcbn0gXHJcblxyXG5jYy5GbGV4QnVmZmVyID0gRmxleEJ1ZmZlclxyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==