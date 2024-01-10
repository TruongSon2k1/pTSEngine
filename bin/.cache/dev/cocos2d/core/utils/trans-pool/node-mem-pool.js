
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/trans-pool/node-mem-pool.js';
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
var MemPool = require('./mem-pool');

var NodeMemPool = function NodeMemPool(unitClass) {
  MemPool.call(this, unitClass);
};

(function () {
  var Super = function Super() {};

  Super.prototype = MemPool.prototype;
  NodeMemPool.prototype = new Super();
})();

var proto = NodeMemPool.prototype;

proto._initNative = function () {
  this._nativeMemPool = new renderer.NodeMemPool();
};

proto._destroyUnit = function (unitID) {
  MemPool.prototype._destroyUnit.call(this, unitID);

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.removeNodeData(unitID);
  }
};

module.exports = NodeMemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFx0cmFucy1wb29sXFxub2RlLW1lbS1wb29sLmpzIl0sIm5hbWVzIjpbIk1lbVBvb2wiLCJyZXF1aXJlIiwiTm9kZU1lbVBvb2wiLCJ1bml0Q2xhc3MiLCJjYWxsIiwiU3VwZXIiLCJwcm90b3R5cGUiLCJwcm90byIsIl9pbml0TmF0aXZlIiwiX25hdGl2ZU1lbVBvb2wiLCJyZW5kZXJlciIsIl9kZXN0cm95VW5pdCIsInVuaXRJRCIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwicmVtb3ZlTm9kZURhdGEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFDQSxJQUFJQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVQyxTQUFWLEVBQXFCO0FBQ25DSCxFQUFBQSxPQUFPLENBQUNJLElBQVIsQ0FBYSxJQUFiLEVBQW1CRCxTQUFuQjtBQUNILENBRkQ7O0FBSUEsQ0FBQyxZQUFVO0FBQ1AsTUFBSUUsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBVSxDQUFFLENBQXhCOztBQUNBQSxFQUFBQSxLQUFLLENBQUNDLFNBQU4sR0FBa0JOLE9BQU8sQ0FBQ00sU0FBMUI7QUFDQUosRUFBQUEsV0FBVyxDQUFDSSxTQUFaLEdBQXdCLElBQUlELEtBQUosRUFBeEI7QUFDSCxDQUpEOztBQU1BLElBQUlFLEtBQUssR0FBR0wsV0FBVyxDQUFDSSxTQUF4Qjs7QUFDQUMsS0FBSyxDQUFDQyxXQUFOLEdBQW9CLFlBQVk7QUFDNUIsT0FBS0MsY0FBTCxHQUFzQixJQUFJQyxRQUFRLENBQUNSLFdBQWIsRUFBdEI7QUFDSCxDQUZEOztBQUlBSyxLQUFLLENBQUNJLFlBQU4sR0FBcUIsVUFBVUMsTUFBVixFQUFrQjtBQUNuQ1osRUFBQUEsT0FBTyxDQUFDTSxTQUFSLENBQWtCSyxZQUFsQixDQUErQlAsSUFBL0IsQ0FBb0MsSUFBcEMsRUFBMENRLE1BQTFDOztBQUNBLE1BQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0IsU0FBS0wsY0FBTCxDQUFvQk0sY0FBcEIsQ0FBbUNILE1BQW5DO0FBQ0g7QUFDSixDQUxEOztBQU9BSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJmLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxubGV0IE1lbVBvb2wgPSByZXF1aXJlKCcuL21lbS1wb29sJyk7XHJcbmxldCBOb2RlTWVtUG9vbCA9IGZ1bmN0aW9uICh1bml0Q2xhc3MpIHtcclxuICAgIE1lbVBvb2wuY2FsbCh0aGlzLCB1bml0Q2xhc3MpO1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgU3VwZXIgPSBmdW5jdGlvbigpe307XHJcbiAgICBTdXBlci5wcm90b3R5cGUgPSBNZW1Qb29sLnByb3RvdHlwZTtcclxuICAgIE5vZGVNZW1Qb29sLnByb3RvdHlwZSA9IG5ldyBTdXBlcigpO1xyXG59KSgpO1xyXG5cclxubGV0IHByb3RvID0gTm9kZU1lbVBvb2wucHJvdG90eXBlO1xyXG5wcm90by5faW5pdE5hdGl2ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX25hdGl2ZU1lbVBvb2wgPSBuZXcgcmVuZGVyZXIuTm9kZU1lbVBvb2woKTtcclxufTtcclxuXHJcbnByb3RvLl9kZXN0cm95VW5pdCA9IGZ1bmN0aW9uICh1bml0SUQpIHtcclxuICAgIE1lbVBvb2wucHJvdG90eXBlLl9kZXN0cm95VW5pdC5jYWxsKHRoaXMsIHVuaXRJRCk7XHJcbiAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlTWVtUG9vbC5yZW1vdmVOb2RlRGF0YSh1bml0SUQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBOb2RlTWVtUG9vbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==