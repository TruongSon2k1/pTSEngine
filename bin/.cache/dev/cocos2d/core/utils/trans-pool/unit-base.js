
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/trans-pool/unit-base.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
// Unit has many segment, layout such as :
// Head Free Pointer + Using Segment Num + Segment 1 + Segment 2 + Segment 3 ...
// sign data format
// Space : [If Free Flag]                          [Size:1 Uint16]
// Space : [Next Free Index]                       [Size:1 Uint16]
// invalid pointer value
var POINTER_INVALID_FLAG = 0xffff;
var SPACE_FREE_FLAG = 0x0;
var SPACE_USE_FLAG = 0x1;
var POS_NEXT_FREE = 0;
var POS_FREE_FLAG = 1;

var UnitBase = function UnitBase(unitID, memPool, contentNum) {
  contentNum = contentNum || 128; // set unit id

  this.unitID = unitID;
  this._memPool = memPool;
  this._data = new Uint16Array(2); // head of the free content index

  this._data[0] = 0; // using segment num

  this._data[1] = 0;
  this._contentNum = contentNum;
  this._signData = new Uint16Array(this._contentNum * 2);
  this._spacesData = [];

  for (var i = 0; i < contentNum; i++) {
    var signIndex = i * 2; // store content block index but not sign array index

    this._signData[signIndex + POS_NEXT_FREE] = i + 1;
    this._signData[signIndex + POS_FREE_FLAG] = SPACE_FREE_FLAG;
    this._spacesData[i] = {
      index: i,
      unitID: unitID
    };
  } // last one has no next space;


  this._signData[(contentNum - 1) * 2] = POINTER_INVALID_FLAG;
};

var UnitBaseProto = UnitBase.prototype;

UnitBaseProto.hasSpace = function () {
  return this._data[0] !== POINTER_INVALID_FLAG;
};

UnitBaseProto.isAllFree = function () {
  return this._data[1] == 0;
}; // pop space from unit


UnitBaseProto.pop = function () {
  var headFreeIndex = this._data[0];
  if (headFreeIndex === POINTER_INVALID_FLAG) return null;
  var index = headFreeIndex;
  var signIndex = index * 2;
  var space = this._spacesData[index]; // set use flag

  this._signData[signIndex + POS_FREE_FLAG] = SPACE_USE_FLAG; // store new next free space index

  this._data[0] = this._signData[signIndex + POS_NEXT_FREE]; // add using segment num

  this._data[1]++;
  return space;
}; // push back to unit


UnitBaseProto.push = function (index) {
  var signIndex = index * 2; // set free flag

  this._signData[signIndex + POS_FREE_FLAG] = SPACE_FREE_FLAG; // store head free index to the space

  this._signData[signIndex + POS_NEXT_FREE] = this._data[0]; // update head free index

  this._data[0] = index; // sub using segment num

  this._data[1]--;
}; // dump all space info


UnitBaseProto.dump = function () {
  var spaceNum = 0;
  var index = this._data[0];
  var freeStr = "";

  while (index != POINTER_INVALID_FLAG) {
    spaceNum++;
    freeStr += index + "->";
    index = this._signData[index * 2 + POS_NEXT_FREE];
  }

  var usingNum = 0;
  var usingStr = "";
  var contentNum = this._contentNum;

  for (var i = 0; i < contentNum; i++) {
    var freeFlag = this._signData[i * 2 + POS_FREE_FLAG];

    if (freeFlag == SPACE_USE_FLAG) {
      usingNum++;
      usingStr += i + "->";
    }
  }

  var totalNum = spaceNum + usingNum;
  console.log("unitID:", this.unitID, "spaceNum:", spaceNum, "calc using num:", usingNum, 'store using num:', this._data[1], 'calc total num:', totalNum, 'actually total num:', this._contentNum);
  console.log("free info:", freeStr);
  console.log("using info:", usingStr);

  if (usingNum != this._data[1]) {
    cc.error('using num error', "calc using num:", usingNum, 'store using num:', this._data[1]);
  }

  if (spaceNum + usingNum != this._contentNum) {
    cc.error('total num error', 'calc total num:', totalNum, 'actually total num:', this._contentNum);
  }
};

module.exports = UnitBase;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFx0cmFucy1wb29sXFx1bml0LWJhc2UuanMiXSwibmFtZXMiOlsiUE9JTlRFUl9JTlZBTElEX0ZMQUciLCJTUEFDRV9GUkVFX0ZMQUciLCJTUEFDRV9VU0VfRkxBRyIsIlBPU19ORVhUX0ZSRUUiLCJQT1NfRlJFRV9GTEFHIiwiVW5pdEJhc2UiLCJ1bml0SUQiLCJtZW1Qb29sIiwiY29udGVudE51bSIsIl9tZW1Qb29sIiwiX2RhdGEiLCJVaW50MTZBcnJheSIsIl9jb250ZW50TnVtIiwiX3NpZ25EYXRhIiwiX3NwYWNlc0RhdGEiLCJpIiwic2lnbkluZGV4IiwiaW5kZXgiLCJVbml0QmFzZVByb3RvIiwicHJvdG90eXBlIiwiaGFzU3BhY2UiLCJpc0FsbEZyZWUiLCJwb3AiLCJoZWFkRnJlZUluZGV4Iiwic3BhY2UiLCJwdXNoIiwiZHVtcCIsInNwYWNlTnVtIiwiZnJlZVN0ciIsInVzaW5nTnVtIiwidXNpbmdTdHIiLCJmcmVlRmxhZyIsInRvdGFsTnVtIiwiY29uc29sZSIsImxvZyIsImNjIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EsSUFBSUEsb0JBQW9CLEdBQUcsTUFBM0I7QUFDQSxJQUFJQyxlQUFlLEdBQUcsR0FBdEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsR0FBckI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FBcEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsQ0FBcEI7O0FBRUEsSUFBSUMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBVUMsTUFBVixFQUFrQkMsT0FB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SXdCLEtBQUtuQixLQUFMLENBQVcsQ0FBWCxDQUp4QixFQUtJLGlCQUxKLEVBS3VCc0IsUUFMdkIsRUFNSSxxQkFOSixFQU0yQixLQUFLcEIsV0FOaEM7QUFRQXFCLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEJOLE9BQTFCO0FBQ0FLLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkJKLFFBQTNCOztBQUVBLE1BQUlELFFBQVEsSUFBSSxLQUFLbkIsS0FBTCxDQUFXLENBQVgsQ0FBaEIsRUFBK0I7QUFDM0J5QixJQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FDSSxpQkFESixFQUVJLGlCQUZKLEVBRXVCUCxRQUZ2QixFQUdJLGtCQUhKLEVBR3dCLEtBQUtuQixLQUFMLENBQVcsQ0FBWCxDQUh4QjtBQUtIOztBQUVELE1BQUlpQixRQUFRLEdBQUdFLFFBQVgsSUFBdUIsS0FBS2pCLFdBQWhDLEVBQTZDO0FBQ3pDdUIsSUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQ0ksaUJBREosRUFFSSxpQkFGSixFQUV1QkosUUFGdkIsRUFHSSxxQkFISixFQUcyQixLQUFLcEIsV0FIaEM7QUFLSDtBQUNKLENBakREOztBQW1EQXlCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpDLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLy8gVW5pdCBoYXMgbWFueSBzZWdtZW50LCBsYXlvdXQgc3VjaCBhcyA6XHJcbi8vIEhlYWQgRnJlZSBQb2ludGVyICsgVXNpbmcgU2VnbWVudCBOdW0gKyBTZWdtZW50IDEgKyBTZWdtZW50IDIgKyBTZWdtZW50IDMgLi4uXHJcblxyXG4vLyBzaWduIGRhdGEgZm9ybWF0XHJcbi8vIFNwYWNlIDogW0lmIEZyZWUgRmxhZ10gICAgICAgICAgICAgICAgICAgICAgICAgIFtTaXplOjEgVWludDE2XVxyXG4vLyBTcGFjZSA6IFtOZXh0IEZyZWUgSW5kZXhdICAgICAgICAgICAgICAgICAgICAgICBbU2l6ZToxIFVpbnQxNl1cclxuXHJcbi8vIGludmFsaWQgcG9pbnRlciB2YWx1ZVxyXG5sZXQgUE9JTlRFUl9JTlZBTElEX0ZMQUcgPSAweGZmZmY7XHJcbmxldCBTUEFDRV9GUkVFX0ZMQUcgPSAweDA7XHJcbmxldCBTUEFDRV9VU0VfRkxBRyA9IDB4MTtcclxubGV0IFBPU19ORVhUX0ZSRUUgPSAwO1xyXG5sZXQgUE9TX0ZSRUVfRkxBRyA9IDE7XHJcblxyXG5sZXQgVW5pdEJhc2UgPSBmdW5jdGlvbiAodW5pdElELCBtZW1Qb29sLCBjb250ZW50TnVtKSB7XHJcbiAgICBjb250ZW50TnVtID0gY29udGVudE51bSB8fCAxMjg7XHJcblxyXG4gICAgLy8gc2V0IHVuaXQgaWRcclxuICAgIHRoaXMudW5pdElEID0gdW5pdElEO1xyXG4gICAgdGhpcy5fbWVtUG9vbCA9IG1lbVBvb2w7XHJcblxyXG4gICAgdGhpcy5fZGF0YSA9IG5ldyBVaW50MTZBcnJheSgyKTtcclxuICAgIC8vIGhlYWQgb2YgdGhlIGZyZWUgY29udGVudCBpbmRleFxyXG4gICAgdGhpcy5fZGF0YVswXSA9IDA7XHJcbiAgICAvLyB1c2luZyBzZWdtZW50IG51bVxyXG4gICAgdGhpcy5fZGF0YVsxXSA9IDA7XHJcblxyXG4gICAgdGhpcy5fY29udGVudE51bSA9IGNvbnRlbnROdW07XHJcbiAgICB0aGlzLl9zaWduRGF0YSA9IG5ldyBVaW50MTZBcnJheSh0aGlzLl9jb250ZW50TnVtICogMik7XHJcbiAgICB0aGlzLl9zcGFjZXNEYXRhID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50TnVtOyBpKyspIHtcclxuICAgICAgICBsZXQgc2lnbkluZGV4ID0gaSAqIDI7XHJcbiAgICAgICAgLy8gc3RvcmUgY29udGVudCBibG9jayBpbmRleCBidXQgbm90IHNpZ24gYXJyYXkgaW5kZXhcclxuICAgICAgICB0aGlzLl9zaWduRGF0YVtzaWduSW5kZXggKyBQT1NfTkVYVF9GUkVFXSA9IGkgKyAxO1xyXG4gICAgICAgIHRoaXMuX3NpZ25EYXRhW3NpZ25JbmRleCArIFBPU19GUkVFX0ZMQUddID0gU1BBQ0VfRlJFRV9GTEFHO1xyXG5cclxuICAgICAgICB0aGlzLl9zcGFjZXNEYXRhW2ldID0ge1xyXG4gICAgICAgICAgICBpbmRleDogaSxcclxuICAgICAgICAgICAgdW5pdElEOiB1bml0SUQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIGxhc3Qgb25lIGhhcyBubyBuZXh0IHNwYWNlO1xyXG4gICAgdGhpcy5fc2lnbkRhdGFbKGNvbnRlbnROdW0gLSAxKSAqIDJdID0gUE9JTlRFUl9JTlZBTElEX0ZMQUc7XHJcbn07XHJcblxyXG5sZXQgVW5pdEJhc2VQcm90byA9IFVuaXRCYXNlLnByb3RvdHlwZTtcclxuVW5pdEJhc2VQcm90by5oYXNTcGFjZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhWzBdICE9PSBQT0lOVEVSX0lOVkFMSURfRkxBRztcclxufTtcclxuXHJcblVuaXRCYXNlUHJvdG8uaXNBbGxGcmVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFbMV0gPT0gMDtcclxufTtcclxuXHJcbi8vIHBvcCBzcGFjZSBmcm9tIHVuaXRcclxuVW5pdEJhc2VQcm90by5wb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgaGVhZEZyZWVJbmRleCA9IHRoaXMuX2RhdGFbMF07XHJcbiAgICBpZiAoaGVhZEZyZWVJbmRleCA9PT0gUE9JTlRFUl9JTlZBTElEX0ZMQUcpIHJldHVybiBudWxsO1xyXG5cclxuICAgIGxldCBpbmRleCA9IGhlYWRGcmVlSW5kZXg7XHJcbiAgICBsZXQgc2lnbkluZGV4ID0gaW5kZXggKiAyO1xyXG4gICAgbGV0IHNwYWNlID0gdGhpcy5fc3BhY2VzRGF0YVtpbmRleF07XHJcblxyXG4gICAgLy8gc2V0IHVzZSBmbGFnXHJcbiAgICB0aGlzLl9zaWduRGF0YVtzaWduSW5kZXggKyBQT1NfRlJFRV9GTEFHXSA9IFNQQUNFX1VTRV9GTEFHO1xyXG5cclxuICAgIC8vIHN0b3JlIG5ldyBuZXh0IGZyZWUgc3BhY2UgaW5kZXhcclxuICAgIHRoaXMuX2RhdGFbMF0gPSB0aGlzLl9zaWduRGF0YVtzaWduSW5kZXggKyBQT1NfTkVYVF9GUkVFXTtcclxuICAgIC8vIGFkZCB1c2luZyBzZWdtZW50IG51bVxyXG4gICAgdGhpcy5fZGF0YVsxXSsrO1xyXG4gICAgcmV0dXJuIHNwYWNlO1xyXG59O1xyXG5cclxuLy8gcHVzaCBiYWNrIHRvIHVuaXRcclxuVW5pdEJhc2VQcm90by5wdXNoID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBsZXQgc2lnbkluZGV4ID0gaW5kZXggKiAyO1xyXG5cclxuICAgIC8vIHNldCBmcmVlIGZsYWdcclxuICAgIHRoaXMuX3NpZ25EYXRhW3NpZ25JbmRleCArIFBPU19GUkVFX0ZMQUddID0gU1BBQ0VfRlJFRV9GTEFHO1xyXG5cclxuICAgIC8vIHN0b3JlIGhlYWQgZnJlZSBpbmRleCB0byB0aGUgc3BhY2VcclxuICAgIHRoaXMuX3NpZ25EYXRhW3NpZ25JbmRleCArIFBPU19ORVhUX0ZSRUVdID0gdGhpcy5fZGF0YVswXTtcclxuICAgIC8vIHVwZGF0ZSBoZWFkIGZyZWUgaW5kZXhcclxuICAgIHRoaXMuX2RhdGFbMF0gPSBpbmRleDtcclxuICAgIC8vIHN1YiB1c2luZyBzZWdtZW50IG51bVxyXG4gICAgdGhpcy5fZGF0YVsxXS0tO1xyXG59O1xyXG5cclxuLy8gZHVtcCBhbGwgc3BhY2UgaW5mb1xyXG5Vbml0QmFzZVByb3RvLmR1bXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgc3BhY2VOdW0gPSAwO1xyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5fZGF0YVswXTtcclxuICAgIGxldCBmcmVlU3RyID0gXCJcIjtcclxuICAgIFxyXG4gICAgd2hpbGUgKGluZGV4ICE9IFBPSU5URVJfSU5WQUxJRF9GTEFHKSB7XHJcbiAgICAgICAgc3BhY2VOdW0gKys7XHJcbiAgICAgICAgZnJlZVN0ciArPSBpbmRleCArIFwiLT5cIjtcclxuICAgICAgICBpbmRleCA9IHRoaXMuX3NpZ25EYXRhW2luZGV4ICogMiArIFBPU19ORVhUX0ZSRUVdO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB1c2luZ051bSA9IDA7XHJcbiAgICBsZXQgdXNpbmdTdHIgPSBcIlwiO1xyXG4gICAgbGV0IGNvbnRlbnROdW0gPSB0aGlzLl9jb250ZW50TnVtO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50TnVtOyBpKyspIHtcclxuICAgICAgICBsZXQgZnJlZUZsYWcgPSB0aGlzLl9zaWduRGF0YVtpICogMiArIFBPU19GUkVFX0ZMQUddO1xyXG4gICAgICAgIGlmIChmcmVlRmxhZyA9PSBTUEFDRV9VU0VfRkxBRykge1xyXG4gICAgICAgICAgICB1c2luZ051bSArKztcclxuICAgICAgICAgICAgdXNpbmdTdHIgKz0gaSArIFwiLT5cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCB0b3RhbE51bSA9IHNwYWNlTnVtICsgdXNpbmdOdW07XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBcInVuaXRJRDpcIiwgdGhpcy51bml0SUQsIFxyXG4gICAgICAgIFwic3BhY2VOdW06XCIsIHNwYWNlTnVtLCBcclxuICAgICAgICBcImNhbGMgdXNpbmcgbnVtOlwiLCB1c2luZ051bSwgXHJcbiAgICAgICAgJ3N0b3JlIHVzaW5nIG51bTonLCB0aGlzLl9kYXRhWzFdLCBcclxuICAgICAgICAnY2FsYyB0b3RhbCBudW06JywgdG90YWxOdW0sIFxyXG4gICAgICAgICdhY3R1YWxseSB0b3RhbCBudW06JywgdGhpcy5fY29udGVudE51bVxyXG4gICAgKTtcclxuICAgIGNvbnNvbGUubG9nKFwiZnJlZSBpbmZvOlwiLCBmcmVlU3RyKTtcclxuICAgIGNvbnNvbGUubG9nKFwidXNpbmcgaW5mbzpcIiwgdXNpbmdTdHIpO1xyXG5cclxuICAgIGlmICh1c2luZ051bSAhPSB0aGlzLl9kYXRhWzFdKSB7XHJcbiAgICAgICAgY2MuZXJyb3IoXHJcbiAgICAgICAgICAgICd1c2luZyBudW0gZXJyb3InLCBcclxuICAgICAgICAgICAgXCJjYWxjIHVzaW5nIG51bTpcIiwgdXNpbmdOdW0sIFxyXG4gICAgICAgICAgICAnc3RvcmUgdXNpbmcgbnVtOicsIHRoaXMuX2RhdGFbMV1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzcGFjZU51bSArIHVzaW5nTnVtICE9IHRoaXMuX2NvbnRlbnROdW0pIHtcclxuICAgICAgICBjYy5lcnJvcihcclxuICAgICAgICAgICAgJ3RvdGFsIG51bSBlcnJvcicsIFxyXG4gICAgICAgICAgICAnY2FsYyB0b3RhbCBudW06JywgdG90YWxOdW0sIFxyXG4gICAgICAgICAgICAnYWN0dWFsbHkgdG90YWwgbnVtOicsIHRoaXMuX2NvbnRlbnROdW1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBVbml0QmFzZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==