
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCScene.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2015-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var NIL = function NIL() {};
/**
 * !#en
 * cc.Scene is a subclass of cc.Node that is used only as an abstract concept.<br/>
 * cc.Scene and cc.Node are almost identical with the difference that users can not modify cc.Scene manually.
 * !#zh
 * cc.Scene 是 cc.Node 的子类，仅作为一个抽象的概念。<br/>
 * cc.Scene 和 cc.Node 有点不同，用户不应直接修改 cc.Scene。
 * @class Scene
 * @extends Node
 */


cc.Scene = cc.Class({
  name: 'cc.Scene',
  "extends": require('./CCNode'),
  properties: {
    _is3DNode: {
      "default": true,
      override: true
    },

    /**
     * !#en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
     * !#zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
     * @property {Boolean} autoReleaseAssets
     * @default false
     */
    autoReleaseAssets: false
  },
  ctor: function ctor() {
    this._anchorPoint.x = 0.0;
    this._anchorPoint.y = 0.0;
    this._activeInHierarchy = false;
    this._inited = !cc.game._isCloning;

    if (CC_EDITOR) {
      this._prefabSyncedInLiveReload = false;
    } // cache all depend assets for auto release


    this.dependAssets = null;
  },
  destroy: function destroy() {
    if (cc.Object.prototype.destroy.call(this)) {
      var children = this._children;

      for (var i = 0; i < children.length; ++i) {
        children[i].active = false;
      }
    }

    this._active = false;
    this._activeInHierarchy = false;
  },
  _onHierarchyChanged: NIL,
  _instantiate: null,
  _load: function _load() {
    if (!this._inited) {
      if (CC_TEST) {
        cc.assert(!this._activeInHierarchy, 'Should deactivate ActionManager and EventManager by default');
      }

      this._onBatchCreated(CC_EDITOR && this._prefabSyncedInLiveReload);

      this._inited = true;
    }
  },
  _activate: function _activate(active) {
    active = active !== false;

    if (CC_EDITOR || CC_TEST) {
      // register all nodes to editor
      this._registerIfAttached(active);
    }

    cc.director._nodeActivator.activateNode(this, active);
  }
});
module.exports = cc.Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDU2NlbmUuanMiXSwibmFtZXMiOlsiTklMIiwiY2MiLCJTY2VuZSIsIkNsYXNzIiwibmFtZSIsInJlcXVpcmUiLCJwcm9wZXJ0aWVzIiwiX2lzM0ROb2RlIiwib3ZlcnJpZGUiLCJhdXRvUmVsZWFzZUFzc2V0cyIsImN0b3IiLCJfYW5jaG9yUG9pbnQiLCJ4IiwieSIsIl9hY3RpdmVJbkhpZXJhcmNoeSIsIl9pbml0ZWQiLCJnYW1lIiwiX2lzQ2xvbmluZyIsIkNDX0VESVRPUiIsIl9wcmVmYWJTeW5jZWRJbkxpdmVSZWxvYWQiLCJkZXBlbmRBc3NldHMiLCJkZXN0cm95IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsImNoaWxkcmVuIiwiX2NoaWxkcmVuIiwiaSIsImxlbmd0aCIsImFjdGl2ZSIsIl9hY3RpdmUiLCJfb25IaWVyYXJjaHlDaGFuZ2VkIiwiX2luc3RhbnRpYXRlIiwiX2xvYWQiLCJDQ19URVNUIiwiYXNzZXJ0IiwiX29uQmF0Y2hDcmVhdGVkIiwiX2FjdGl2YXRlIiwiX3JlZ2lzdGVySWZBdHRhY2hlZCIsImRpcmVjdG9yIiwiX25vZGVBY3RpdmF0b3IiLCJhY3RpdmF0ZU5vZGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBWSxDQUFFLENBQXhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBQyxFQUFFLENBQUNDLEtBQUgsR0FBV0QsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDaEJDLEVBQUFBLElBQUksRUFBRSxVQURVO0FBRWhCLGFBQVNDLE9BQU8sQ0FBQyxVQUFELENBRkE7QUFJaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLFFBQVEsRUFBRTtBQUZILEtBREg7O0FBTVI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLGlCQUFpQixFQUFFO0FBWlgsR0FKSTtBQW1CaEJDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtDLFlBQUwsQ0FBa0JDLENBQWxCLEdBQXNCLEdBQXRCO0FBQ0EsU0FBS0QsWUFBTCxDQUFrQkUsQ0FBbEIsR0FBc0IsR0FBdEI7QUFFQSxTQUFLQyxrQkFBTCxHQUEwQixLQUExQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFDZCxFQUFFLENBQUNlLElBQUgsQ0FBUUMsVUFBeEI7O0FBRUEsUUFBSUMsU0FBSixFQUFlO0FBQ1gsV0FBS0MseUJBQUwsR0FBaUMsS0FBakM7QUFDSCxLQVRhLENBV2Q7OztBQUNBLFNBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDSCxHQWhDZTtBQWtDaEJDLEVBQUFBLE9BQU8sRUFBRSxtQkFBWTtBQUNqQixRQUFJcEIsRUFBRSxDQUFDcUIsTUFBSCxDQUFVQyxTQUFWLENBQW9CRixPQUFwQixDQUE0QkcsSUFBNUIsQ0FBaUMsSUFBakMsQ0FBSixFQUE0QztBQUN4QyxVQUFJQyxRQUFRLEdBQUcsS0FBS0MsU0FBcEI7O0FBQ0EsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixRQUFRLENBQUNHLE1BQTdCLEVBQXFDLEVBQUVELENBQXZDLEVBQTBDO0FBQ3RDRixRQUFBQSxRQUFRLENBQUNFLENBQUQsQ0FBUixDQUFZRSxNQUFaLEdBQXFCLEtBQXJCO0FBQ0g7QUFDSjs7QUFDRCxTQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUtoQixrQkFBTCxHQUEwQixLQUExQjtBQUNILEdBM0NlO0FBNkNoQmlCLEVBQUFBLG1CQUFtQixFQUFFL0IsR0E3Q0w7QUE4Q2hCZ0MsRUFBQUEsWUFBWSxFQUFHLElBOUNDO0FBZ0RoQkMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsUUFBSSxDQUFDLEtBQUtsQixPQUFWLEVBQW1CO0FBQ2YsVUFBSW1CLE9BQUosRUFBYTtBQUNUakMsUUFBQUEsRUFBRSxDQUFDa0MsTUFBSCxDQUFVLENBQUMsS0FBS3JCLGtCQUFoQixFQUFvQyw2REFBcEM7QUFDSDs7QUFDRCxXQUFLc0IsZUFBTCxDQUFxQmxCLFNBQVMsSUFBSSxLQUFLQyx5QkFBdkM7O0FBQ0EsV0FBS0osT0FBTCxHQUFlLElBQWY7QUFDSDtBQUNKLEdBeERlO0FBMERoQnNCLEVBQUFBLFNBQVMsRUFBRSxtQkFBVVIsTUFBVixFQUFrQjtBQUN6QkEsSUFBQUEsTUFBTSxHQUFJQSxNQUFNLEtBQUssS0FBckI7O0FBQ0EsUUFBSVgsU0FBUyxJQUFJZ0IsT0FBakIsRUFBMEI7QUFDdEI7QUFDQSxXQUFLSSxtQkFBTCxDQUF5QlQsTUFBekI7QUFDSDs7QUFDRDVCLElBQUFBLEVBQUUsQ0FBQ3NDLFFBQUgsQ0FBWUMsY0FBWixDQUEyQkMsWUFBM0IsQ0FBd0MsSUFBeEMsRUFBOENaLE1BQTlDO0FBQ0g7QUFqRWUsQ0FBVCxDQUFYO0FBb0VBYSxNQUFNLENBQUNDLE9BQVAsR0FBaUIxQyxFQUFFLENBQUNDLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNS0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIE5JTCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogY2MuU2NlbmUgaXMgYSBzdWJjbGFzcyBvZiBjYy5Ob2RlIHRoYXQgaXMgdXNlZCBvbmx5IGFzIGFuIGFic3RyYWN0IGNvbmNlcHQuPGJyLz5cclxuICogY2MuU2NlbmUgYW5kIGNjLk5vZGUgYXJlIGFsbW9zdCBpZGVudGljYWwgd2l0aCB0aGUgZGlmZmVyZW5jZSB0aGF0IHVzZXJzIGNhbiBub3QgbW9kaWZ5IGNjLlNjZW5lIG1hbnVhbGx5LlxyXG4gKiAhI3poXHJcbiAqIGNjLlNjZW5lIOaYryBjYy5Ob2RlIOeahOWtkOexu++8jOS7heS9nOS4uuS4gOS4quaKveixoeeahOamguW/teOAgjxici8+XHJcbiAqIGNjLlNjZW5lIOWSjCBjYy5Ob2RlIOacieeCueS4jeWQjO+8jOeUqOaIt+S4jeW6lOebtOaOpeS/ruaUuSBjYy5TY2VuZeOAglxyXG4gKiBAY2xhc3MgU2NlbmVcclxuICogQGV4dGVuZHMgTm9kZVxyXG4gKi9cclxuY2MuU2NlbmUgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2NlbmUnLFxyXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ05vZGUnKSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2lzM0ROb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBhbGwgKGRpcmVjdGx5IG9yIGluZGlyZWN0bHkpIHN0YXRpYyByZWZlcmVuY2VkIGFzc2V0cyBvZiB0aGlzIHNjZW5lIGFyZSByZWxlYXNhYmxlIGJ5IGRlZmF1bHQgYWZ0ZXIgc2NlbmUgdW5sb2FkaW5nLlxyXG4gICAgICAgICAqICEjemgg5oyH56S66K+l5Zy65pmv5Lit55u05o6l5oiW6Ze05o6l6Z2Z5oCB5byV55So5Yiw55qE5omA5pyJ6LWE5rqQ5piv5ZCm6buY6K6k5Zyo5Zy65pmv5YiH5o2i5ZCO6Ieq5Yqo6YeK5pS+44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhdXRvUmVsZWFzZUFzc2V0c1xyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXV0b1JlbGVhc2VBc3NldHM6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fYW5jaG9yUG9pbnQueCA9IDAuMDtcclxuICAgICAgICB0aGlzLl9hbmNob3JQb2ludC55ID0gMC4wO1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9ICFjYy5nYW1lLl9pc0Nsb25pbmc7XHJcblxyXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJlZmFiU3luY2VkSW5MaXZlUmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYWNoZSBhbGwgZGVwZW5kIGFzc2V0cyBmb3IgYXV0byByZWxlYXNlXHJcbiAgICAgICAgdGhpcy5kZXBlbmRBc3NldHMgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNjLk9iamVjdC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25IaWVyYXJjaHlDaGFuZ2VkOiBOSUwsXHJcbiAgICBfaW5zdGFudGlhdGUgOiBudWxsLFxyXG5cclxuICAgIF9sb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHtcclxuICAgICAgICAgICAgaWYgKENDX1RFU1QpIHtcclxuICAgICAgICAgICAgICAgIGNjLmFzc2VydCghdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHksICdTaG91bGQgZGVhY3RpdmF0ZSBBY3Rpb25NYW5hZ2VyIGFuZCBFdmVudE1hbmFnZXIgYnkgZGVmYXVsdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX29uQmF0Y2hDcmVhdGVkKENDX0VESVRPUiAmJiB0aGlzLl9wcmVmYWJTeW5jZWRJbkxpdmVSZWxvYWQpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2FjdGl2YXRlOiBmdW5jdGlvbiAoYWN0aXZlKSB7XHJcbiAgICAgICAgYWN0aXZlID0gKGFjdGl2ZSAhPT0gZmFsc2UpO1xyXG4gICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xyXG4gICAgICAgICAgICAvLyByZWdpc3RlciBhbGwgbm9kZXMgdG8gZWRpdG9yXHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVySWZBdHRhY2hlZChhY3RpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5kaXJlY3Rvci5fbm9kZUFjdGl2YXRvci5hY3RpdmF0ZU5vZGUodGhpcywgYWN0aXZlKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLlNjZW5lO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==