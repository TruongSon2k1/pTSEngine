
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/prefab-helper.js';
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
cc._PrefabInfo = cc.Class({
  name: 'cc.PrefabInfo',
  // extends: require('../platform/CCObject'),
  properties: {
    // the most top node of this prefab
    root: null,
    // 所属的 prefab 资源对象 (cc.Prefab)
    // In Editor, only asset._uuid is usable because asset will be changed.
    asset: null,
    // To identify the node in the prefab asset, so only needs to be unique.
    // Not available in the root node.
    fileId: '',
    // Indicates whether this node should always synchronize with the prefab asset, only available in the root node
    sync: false
  }
}); // prefab helper function

module.exports = {
  // update node to make it sync with prefab
  syncWithPrefab: function syncWithPrefab(node) {
    var _prefab = node._prefab;

    if (!_prefab.asset) {
      if (CC_EDITOR) {
        var NodeUtils = Editor.require('scene://utils/node');

        var PrefabUtils = Editor.require('scene://utils/prefab');

        cc.warn(Editor.T('MESSAGE.prefab.missing_prefab', {
          node: NodeUtils.getNodePath(node)
        }));
        node.name += PrefabUtils.MISSING_PREFAB_SUFFIX;
      } else {
        cc.errorID(3701, node.name);
      }

      node._prefab = null;
      return;
    } // save root's preserved props to avoid overwritten by prefab


    var _objFlags = node._objFlags;
    var _parent = node._parent;
    var _id = node._id;
    var _name = node._name;
    var _active = node._active;
    var eulerAnglesX = node._eulerAngles.x;
    var eulerAnglesY = node._eulerAngles.y;
    var eulerAnglesZ = node._eulerAngles.z;
    var _localZOrder = node._localZOrder;
    var trs = node._trs;
    var x = trs[0];
    var y = trs[1];
    var z = trs[2]; // instantiate prefab

    cc.game._isCloning = true;

    if (CC_SUPPORT_JIT) {
      _prefab.asset._doInstantiate(node);
    } else {
      // root in prefab asset is always synced
      var prefabRoot = _prefab.asset.data; // use node as the instantiated prefabRoot to make references to prefabRoot in prefab redirect to node

      prefabRoot._iN$t = node; // instantiate prefab and apply to node

      cc.instantiate._clone(prefabRoot, prefabRoot);
    }

    cc.game._isCloning = false; // restore preserved props

    node._objFlags = _objFlags;
    node._parent = _parent;
    node._id = _id;
    node._prefab = _prefab;
    node._name = _name;
    node._active = _active;
    node._localZOrder = _localZOrder;
    trs = node._trs;
    trs[0] = x;
    trs[1] = y;
    trs[2] = z;
    node._eulerAngles.x = eulerAnglesX;
    node._eulerAngles.y = eulerAnglesY;
    node._eulerAngles.z = eulerAnglesZ;
  }
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHV0aWxzXFxwcmVmYWItaGVscGVyLmpzIl0sIm5hbWVzIjpbImNjIiwiX1ByZWZhYkluZm8iLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwicm9vdCIsImFzc2V0IiwiZmlsZUlkIiwic3luYyIsIm1vZHVsZSIsImV4cG9ydHMiLCJzeW5jV2l0aFByZWZhYiIsIm5vZGUiLCJfcHJlZmFiIiwiQ0NfRURJVE9SIiwiTm9kZVV0aWxzIiwiRWRpdG9yIiwicmVxdWlyZSIsIlByZWZhYlV0aWxzIiwid2FybiIsIlQiLCJnZXROb2RlUGF0aCIsIk1JU1NJTkdfUFJFRkFCX1NVRkZJWCIsImVycm9ySUQiLCJfb2JqRmxhZ3MiLCJfcGFyZW50IiwiX2lkIiwiX25hbWUiLCJfYWN0aXZlIiwiZXVsZXJBbmdsZXNYIiwiX2V1bGVyQW5nbGVzIiwieCIsImV1bGVyQW5nbGVzWSIsInkiLCJldWxlckFuZ2xlc1oiLCJ6IiwiX2xvY2FsWk9yZGVyIiwidHJzIiwiX3RycyIsImdhbWUiLCJfaXNDbG9uaW5nIiwiQ0NfU1VQUE9SVF9KSVQiLCJfZG9JbnN0YW50aWF0ZSIsInByZWZhYlJvb3QiLCJkYXRhIiwiX2lOJHQiLCJpbnN0YW50aWF0ZSIsIl9jbG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsV0FBSCxHQUFpQkQsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDdEJDLEVBQUFBLElBQUksRUFBRSxlQURnQjtBQUV0QjtBQUNBQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBQyxJQUFBQSxJQUFJLEVBQUUsSUFGRTtBQUlSO0FBQ0E7QUFDQUMsSUFBQUEsS0FB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LElBQUFBLElBQUksQ0FBQ2MsR0FBTCxHQUFXQSxHQUFYO0FBQ0FkLElBQUFBLElBQUksQ0FBQ0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0FELElBQUFBLElBQUksQ0FBQ2UsS0FBTCxHQUFhQSxLQUFiO0FBQ0FmLElBQUFBLElBQUksQ0FBQ2dCLE9BQUwsR0FBZUEsT0FBZjtBQUNBaEIsSUFBQUEsSUFBSSxDQUFDd0IsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQUMsSUFBQUEsR0FBRyxHQUFHekIsSUFBSSxDQUFDMEIsSUFBWDtBQUNBRCxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVNOLENBQVQ7QUFDQU0sSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTSixDQUFUO0FBQ0FJLElBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBU0YsQ0FBVDtBQUNBdkIsSUFBQUEsSUFBSSxDQUFDa0IsWUFBTCxDQUFrQkMsQ0FBbEIsR0FBc0JGLFlBQXRCO0FBQ0FqQixJQUFBQSxJQUFJLENBQUNrQixZQUFMLENBQWtCRyxDQUFsQixHQUFzQkQsWUFBdEI7QUFDQXBCLElBQUFBLElBQUksQ0FBQ2tCLFlBQUwsQ0FBa0JLLENBQWxCLEdBQXNCRCxZQUF0QjtBQUNIO0FBbkVZLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY2MuX1ByZWZhYkluZm8gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuUHJlZmFiSW5mbycsXHJcbiAgICAvLyBleHRlbmRzOiByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ09iamVjdCcpLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIHRoZSBtb3N0IHRvcCBub2RlIG9mIHRoaXMgcHJlZmFiXHJcbiAgICAgICAgcm9vdDogbnVsbCxcclxuXHJcbiAgICAgICAgLy8g5omA5bGe55qEIHByZWZhYiDotYTmupDlr7nosaEgKGNjLlByZWZhYilcclxuICAgICAgICAvLyBJbiBFZGl0b3IsIG9ubHkgYXNzZXQuX3V1aWQgaXMgdXNhYmxlIGJlY2F1c2UgYXNzZXQgd2lsbCBiZSBjaGFuZ2VkLlxyXG4gICAgICAgIGFzc2V0OiBudWxsLFxyXG5cclxuICAgICAgICAvLyBUbyBpZGVudGlmeSB0aGUgbm9kZSBpbiB0aGUgcHJlZmFiIGFzc2V0LCBzbyBvbmx5IG5lZWRzIHRvIGJlIHVuaXF1ZS5cclxuICAgICAgICAvLyBOb3QgYXZhaWxhYmxlIGluIHRoZSByb290IG5vZGUuXHJcbiAgICAgICAgZmlsZUlkOiAnJyxcclxuXHJcbiAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBub2RlIHNob3VsZCBhbHdheXMgc3luY2hyb25pemUgd2l0aCB0aGUgcHJlZmFiIGFzc2V0LCBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgcm9vdCBub2RlXHJcbiAgICAgICAgc3luYzogZmFsc2UsXHJcbiAgICB9LFxyXG59KTtcclxuXHJcbi8vIHByZWZhYiBoZWxwZXIgZnVuY3Rpb25cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvLyB1cGRhdGUgbm9kZSB0byBtYWtlIGl0IHN5bmMgd2l0aCBwcmVmYWJcclxuICAgIHN5bmNXaXRoUHJlZmFiOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHZhciBfcHJlZmFiID0gbm9kZS5fcHJlZmFiO1xyXG5cclxuICAgICAgICBpZiAoIV9wcmVmYWIuYXNzZXQpIHtcclxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcclxuICAgICAgICAgICAgICAgIHZhciBQcmVmYWJVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL3ByZWZhYicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNjLndhcm4oRWRpdG9yLlQoJ01FU1NBR0UucHJlZmFiLm1pc3NpbmdfcHJlZmFiJywgeyBub2RlOiBOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgobm9kZSkgfSkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5uYW1lICs9IFByZWZhYlV0aWxzLk1JU1NJTkdfUFJFRkFCX1NVRkZJWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzcwMSwgbm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLl9wcmVmYWIgPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzYXZlIHJvb3QncyBwcmVzZXJ2ZWQgcHJvcHMgdG8gYXZvaWQgb3ZlcndyaXR0ZW4gYnkgcHJlZmFiXHJcbiAgICAgICAgdmFyIF9vYmpGbGFncyA9IG5vZGUuX29iakZsYWdzO1xyXG4gICAgICAgIHZhciBfcGFyZW50ID0gbm9kZS5fcGFyZW50O1xyXG4gICAgICAgIHZhciBfaWQgPSBub2RlLl9pZDtcclxuICAgICAgICB2YXIgX25hbWUgPSBub2RlLl9uYW1lO1xyXG4gICAgICAgIHZhciBfYWN0aXZlID0gbm9kZS5fYWN0aXZlO1xyXG4gICAgICAgIHZhciBldWxlckFuZ2xlc1ggPSBub2RlLl9ldWxlckFuZ2xlcy54O1xyXG4gICAgICAgIHZhciBldWxlckFuZ2xlc1kgPSBub2RlLl9ldWxlckFuZ2xlcy55O1xyXG4gICAgICAgIHZhciBldWxlckFuZ2xlc1ogPSBub2RlLl9ldWxlckFuZ2xlcy56O1xyXG4gICAgICAgIHZhciBfbG9jYWxaT3JkZXIgPSBub2RlLl9sb2NhbFpPcmRlcjtcclxuICAgICAgICB2YXIgdHJzID0gbm9kZS5fdHJzO1xyXG4gICAgICAgIHZhciB4ID0gdHJzWzBdO1xyXG4gICAgICAgIHZhciB5ID0gdHJzWzFdO1xyXG4gICAgICAgIHZhciB6ID0gdHJzWzJdO1xyXG5cclxuICAgICAgICAvLyBpbnN0YW50aWF0ZSBwcmVmYWJcclxuICAgICAgICBjYy5nYW1lLl9pc0Nsb25pbmcgPSB0cnVlO1xyXG4gICAgICAgIGlmIChDQ19TVVBQT1JUX0pJVCkge1xyXG4gICAgICAgICAgICBfcHJlZmFiLmFzc2V0Ll9kb0luc3RhbnRpYXRlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcm9vdCBpbiBwcmVmYWIgYXNzZXQgaXMgYWx3YXlzIHN5bmNlZFxyXG4gICAgICAgICAgICB2YXIgcHJlZmFiUm9vdCA9IF9wcmVmYWIuYXNzZXQuZGF0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVzZSBub2RlIGFzIHRoZSBpbnN0YW50aWF0ZWQgcHJlZmFiUm9vdCB0byBtYWtlIHJlZmVyZW5jZXMgdG8gcHJlZmFiUm9vdCBpbiBwcmVmYWIgcmVkaXJlY3QgdG8gbm9kZVxyXG4gICAgICAgICAgICBwcmVmYWJSb290Ll9pTiR0ID0gbm9kZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGluc3RhbnRpYXRlIHByZWZhYiBhbmQgYXBwbHkgdG8gbm9kZVxyXG4gICAgICAgICAgICBjYy5pbnN0YW50aWF0ZS5fY2xvbmUocHJlZmFiUm9vdCwgcHJlZmFiUm9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyByZXN0b3JlIHByZXNlcnZlZCBwcm9wc1xyXG4gICAgICAgIG5vZGUuX29iakZsYWdzID0gX29iakZsYWdzO1xyXG4gICAgICAgIG5vZGUuX3BhcmVudCA9IF9wYXJlbnQ7XHJcbiAgICAgICAgbm9kZS5faWQgPSBfaWQ7XHJcbiAgICAgICAgbm9kZS5fcHJlZmFiID0gX3ByZWZhYjtcclxuICAgICAgICBub2RlLl9uYW1lID0gX25hbWU7XHJcbiAgICAgICAgbm9kZS5fYWN0aXZlID0gX2FjdGl2ZTtcclxuICAgICAgICBub2RlLl9sb2NhbFpPcmRlciA9IF9sb2NhbFpPcmRlcjtcclxuICAgICAgICB0cnMgPSBub2RlLl90cnM7XHJcbiAgICAgICAgdHJzWzBdID0geDtcclxuICAgICAgICB0cnNbMV0gPSB5O1xyXG4gICAgICAgIHRyc1syXSA9IHo7XHJcbiAgICAgICAgbm9kZS5fZXVsZXJBbmdsZXMueCA9IGV1bGVyQW5nbGVzWDtcclxuICAgICAgICBub2RlLl9ldWxlckFuZ2xlcy55ID0gZXVsZXJBbmdsZXNZO1xyXG4gICAgICAgIG5vZGUuX2V1bGVyQW5nbGVzLnogPSBldWxlckFuZ2xlc1o7XHJcbiAgICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9