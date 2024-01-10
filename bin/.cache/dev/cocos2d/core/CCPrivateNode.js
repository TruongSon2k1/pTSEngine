
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCPrivateNode.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
'use strict';

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Node = require('./CCNode');

var RenderFlow = require('./renderer/render-flow');

var HideInHierarchy = cc.Object.Flags.HideInHierarchy;
var LocalDirtyFlag = Node._LocalDirtyFlag;
var POSITION_ON = 1 << 0;
/**
 * !#en
 * Class of private entities in Cocos Creator scenes.<br/>
 * The PrivateNode is hidden in editor, and completely transparent to users.<br/>
 * It's normally used as Node's private content created by components in parent node.<br/>
 * So in theory private nodes are not children, they are part of the parent node.<br/>
 * Private node have two important characteristics:<br/>
 * 1. It has the minimum z index and cannot be modified, because they can't be displayed over real children.<br/>
 * 2. The positioning of private nodes is also special, they will consider the left bottom corner of the parent node's bounding box as the origin of local coordinates.<br/>
 *    In this way, they can be easily kept inside the bounding box.<br/>
 * Currently, it's used by RichText component and TileMap component.
 * !#zh
 * Cocos Creator 场景中的私有节点类。<br/>
 * 私有节点在编辑器中不可见，对用户透明。<br/>
 * 通常私有节点是被一些特殊的组件创建出来作为父节点的一部分而存在的，理论上来说，它们不是子节点，而是父节点的组成部分。<br/>
 * 私有节点有两个非常重要的特性：<br/>
 * 1. 它有着最小的渲染排序的 Z 轴深度，并且无法被更改，因为它们不能被显示在其他正常子节点之上。<br/>
 * 2. 它的定位也是特殊的，对于私有节点来说，父节点包围盒的左下角是它的局部坐标系原点，这个原点相当于父节点的位置减去它锚点的偏移。这样私有节点可以比较容易被控制在包围盒之中。<br/>
 * 目前在引擎中，RichText 和 TileMap 都有可能生成私有节点。
 * @class PrivateNode
 * @constructor
 * @param {String} name
 * @extends Node
 */

var PrivateNode = cc.Class({
  name: 'cc.PrivateNode',
  "extends": Node,
  properties: {
    x: {
      get: function get() {
        return this._originPos.x;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.x) {
          localPosition.x = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    y: {
      get: function get() {
        return this._originPos.y;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.y) {
          localPosition.y = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    zIndex: {
      get: function get() {
        return cc.macro.MIN_ZINDEX;
      },
      set: function set() {},
      override: true
    },
    showInEditor: {
      "default": false,
      editorOnly: true,
      override: true
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor(name) {
    this._localZOrder = cc.macro.MIN_ZINDEX << 16;
    this._originPos = cc.v2();

    if (CC_EDITOR) {
      this._objFlags |= HideInHierarchy;
    }
  },
  _posDirty: function _posDirty(sendEvent) {
    this.setLocalDirty(LocalDirtyFlag.POSITION);
    !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

    if (sendEvent === true && this._eventMask & POSITION_ON) {
      this.emit(Node.EventType.POSITION_CHANGED);
    }
  },
  _updateLocalMatrix: function _updateLocalMatrix() {
    if (!this._localMatDirty) return;
    var parent = this.parent;

    if (parent) {
      // Position correction for transform calculation
      this._trs[0] = this._originPos.x - (parent._anchorPoint.x - 0.5) * parent._contentSize.width;
      this._trs[1] = this._originPos.y - (parent._anchorPoint.y - 0.5) * parent._contentSize.height;
    }

    this._super();
  },
  getPosition: function getPosition() {
    return new cc.Vec2(this._originPos);
  },
  setPosition: function setPosition(x, y) {
    if (y === undefined) {
      x = x.x;
      y = x.y;
    }

    var pos = this._originPos;

    if (pos.x === x && pos.y === y) {
      return;
    }

    pos.x = x;
    pos.y = y;

    this._posDirty(true);
  },
  setParent: function setParent(value) {
    var oldParent = this._parent;

    this._super(value);

    if (oldParent !== value) {
      if (oldParent) {
        oldParent.off(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }

      if (value) {
        value.on(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }
    }
  },
  // do not update order of arrival
  _updateOrderOfArrival: function _updateOrderOfArrival() {}
});
var proto = PrivateNode.prototype;
cc.js.getset(proto, "parent", proto.getParent, proto.setParent);
cc.js.getset(proto, "position", proto.getPosition, proto.setPosition);

if (CC_EDITOR) {
  // check components to avoid missing node reference serialied in previous version
  proto._onBatchCreated = function (dontSyncChildPrefab) {
    for (var _iterator = _createForOfIteratorHelperLoose(this._components), _step; !(_step = _iterator()).done;) {
      var comp = _step.value;
      comp.node = this;
    }

    Node.prototype._onBatchCreated.call(this, dontSyncChildPrefab);
  };
}

cc.PrivateNode = module.exports = PrivateNode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDUHJpdmF0ZU5vZGUuanMiXSwibmFtZXMiOlsiTm9kZSIsInJlcXVpcmUiLCJSZW5kZXJGbG93IiwiSGlkZUluSGllcmFyY2h5IiwiY2MiLCJPYmplY3QiLCJGbGFncyIsIkxvY2FsRGlydHlGbGFnIiwiX0xvY2FsRGlydHlGbGFnIiwiUE9TSVRJT05fT04iLCJQcml2YXRlTm9kZSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJ4IiwiZ2V0IiwiX29yaWdpblBvcyIsInNldCIsInZhbHVlIiwibG9jYWxQb3NpdGlvbiIsIl9wb3NEaXJ0eSIsIm92ZXJyaWRlIiwieSIsInpJbmRleCIsIm1hY3JvIiwiTUlOX1pJTkRFWCIsInNob3dJbkVkaXRvciIsImVkaXRvck9ubHkiLCJjdG9yIiwiX2xvY2FsWk9yZGVyIiwidjIiLCJDQ19FRElUT1IiLCJfb2JqRmxhZ3MiLCJzZW5kRXZlbnQiLCJzZXRMb2NhbERpcnR5IiwiUE9TSVRJT04iLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9yZW5kZXJGbGFnIiwiRkxBR19UUkFOU0ZPUk0iLCJfZXZlbnRNYXNrIiwiZW1pdCIsIkV2ZW50VHlwZSIsIlBPU0lUSU9OX0NIQU5HRUQiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJfbG9jYWxNYXREaXJ0eSIsInBhcmVudCIsIl90cnMiLCJfYW5jaG9yUG9pbnQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIl9zdXBlciIsImdldFBvc2l0aW9uIiwiVmVjMiIsInNldFBvc2l0aW9uIiwidW5kZWZpbmVkIiwicG9zIiwic2V0UGFyZW50Iiwib2xkUGFyZW50IiwiX3BhcmVudCIsIm9mZiIsIkFOQ0hPUl9DSEFOR0VEIiwib24iLCJfdXBkYXRlT3JkZXJPZkFycml2YWwiLCJwcm90byIsInByb3RvdHlwZSIsImpzIiwiZ2V0c2V0IiwiZ2V0UGFyZW50IiwiX29uQmF0Y2hDcmVhdGVkIiwiZG9udFN5bmNDaGlsZFBy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RUFBSCxDQUFNQyxNQUFOLENBQWFILEtBQWIsRUFBb0IsUUFBcEIsRUFBOEJBLEtBQUssQ0FBQ0ksU0FBcEMsRUFBK0NKLEtBQUssQ0FBQ1AsU0FBckQ7QUFDQXJELEVBQUUsQ0FBQzhELEVBQUgsQ0FBTUMsTUFBTixDQUFhSCxLQUFiLEVBQW9CLFVBQXBCLEVBQWdDQSxLQUFLLENBQUNaLFdBQXRDLEVBQW1EWSxLQUFLLENBQUNWLFdBQXpEOztBQUVBLElBQUl2QixTQUFKLEVBQWU7QUFDWDtBQUNBaUMsRUFBQUEsS0FBSyxDQUFDSyxlQUFOLEdBQXdCLFVBQVVDLG1CQUFWLEVBQStCO0FBQ25ELHlEQUFpQixLQUFLQyxXQUF0Qix3Q0FBbUM7QUFBQSxVQUExQkMsSUFBMEI7QUFDL0JBLE1BQUFBLElBQUksQ0FBQ0MsSUFBTCxHQUFZLElBQVo7QUFDSDs7QUFFRHpFLElBQUFBLElBQUksQ0FBQ2lFLFNBQUwsQ0FBZUksZUFBZixDQUErQkssSUFBL0IsQ0FBb0MsSUFBcEMsRUFBMENKLG1CQUExQztBQUNILEdBTkQ7QUFPSDs7QUFFRGxFLEVBQUUsQ0FBQ00sV0FBSCxHQUFpQmlFLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxFLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgTm9kZSA9IHJlcXVpcmUoJy4vQ0NOb2RlJyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XHJcblxyXG5jb25zdCBIaWRlSW5IaWVyYXJjaHkgPSBjYy5PYmplY3QuRmxhZ3MuSGlkZUluSGllcmFyY2h5O1xyXG5jb25zdCBMb2NhbERpcnR5RmxhZyA9IE5vZGUuX0xvY2FsRGlydHlGbGFnO1xyXG5jb25zdCBQT1NJVElPTl9PTiA9IDEgPDwgMDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENsYXNzIG9mIHByaXZhdGUgZW50aXRpZXMgaW4gQ29jb3MgQ3JlYXRvciBzY2VuZXMuPGJyLz5cclxuICogVGhlIFByaXZhdGVOb2RlIGlzIGhpZGRlbiBpbiBlZGl0b3IsIGFuZCBjb21wbGV0ZWx5IHRyYW5zcGFyZW50IHRvIHVzZXJzLjxici8+XHJcbiAqIEl0J3Mgbm9ybWFsbHkgdXNlZCBhcyBOb2RlJ3MgcHJpdmF0ZSBjb250ZW50IGNyZWF0ZWQgYnkgY29tcG9uZW50cyBpbiBwYXJlbnQgbm9kZS48YnIvPlxyXG4gKiBTbyBpbiB0aGVvcnkgcHJpdmF0ZSBub2RlcyBhcmUgbm90IGNoaWxkcmVuLCB0aGV5IGFyZSBwYXJ0IG9mIHRoZSBwYXJlbnQgbm9kZS48YnIvPlxyXG4gKiBQcml2YXRlIG5vZGUgaGF2ZSB0d28gaW1wb3J0YW50IGNoYXJhY3RlcmlzdGljczo8YnIvPlxyXG4gKiAxLiBJdCBoYXMgdGhlIG1pbmltdW0geiBpbmRleCBhbmQgY2Fubm90IGJlIG1vZGlmaWVkLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgZGlzcGxheWVkIG92ZXIgcmVhbCBjaGlsZHJlbi48YnIvPlxyXG4gKiAyLiBUaGUgcG9zaXRpb25pbmcgb2YgcHJpdmF0ZSBub2RlcyBpcyBhbHNvIHNwZWNpYWwsIHRoZXkgd2lsbCBjb25zaWRlciB0aGUgbGVmdCBib3R0b20gY29ybmVyIG9mIHRoZSBwYXJlbnQgbm9kZSdzIGJvdW5kaW5nIGJveCBhcyB0aGUgb3JpZ2luIG9mIGxvY2FsIGNvb3JkaW5hdGVzLjxici8+XHJcbiAqICAgIEluIHRoaXMgd2F5LCB0aGV5IGNhbiBiZSBlYXNpbHkga2VwdCBpbnNpZGUgdGhlIGJvdW5kaW5nIGJveC48YnIvPlxyXG4gKiBDdXJyZW50bHksIGl0J3MgdXNlZCBieSBSaWNoVGV4dCBjb21wb25lbnQgYW5kIFRpbGVNYXAgY29tcG9uZW50LlxyXG4gKiAhI3poXHJcbiAqIENvY29zIENyZWF0b3Ig5Zy65pmv5Lit55qE56eB5pyJ6IqC54K557G744CCPGJyLz5cclxuICog56eB5pyJ6IqC54K55Zyo57yW6L6R5Zmo5Lit5LiN5Y+v6KeB77yM5a+555So5oi36YCP5piO44CCPGJyLz5cclxuICog6YCa5bi456eB5pyJ6IqC54K55piv6KKr5LiA5Lqb54m55q6K55qE57uE5Lu25Yib5bu65Ye65p2l5L2c5Li654i26IqC54K555qE5LiA6YOo5YiG6ICM5a2Y5Zyo55qE77yM55CG6K665LiK5p2l6K+077yM5a6D5Lus5LiN5piv5a2Q6IqC54K577yM6ICM5piv54i26IqC54K555qE57uE5oiQ6YOo5YiG44CCPGJyLz5cclxuICog56eB5pyJ6IqC54K55pyJ5Lik5Liq6Z2e5bi46YeN6KaB55qE54m55oCn77yaPGJyLz5cclxuICogMS4g5a6D5pyJ552A5pyA5bCP55qE5riy5p+T5o6S5bqP55qEIFog6L205rex5bqm77yM5bm25LiU5peg5rOV6KKr5pu05pS577yM5Zug5Li65a6D5Lus5LiN6IO96KKr5pi+56S65Zyo5YW25LuW5q2j5bi45a2Q6IqC54K55LmL5LiK44CCPGJyLz5cclxuICogMi4g5a6D55qE5a6a5L2N5Lmf5piv54m55q6K55qE77yM5a+55LqO56eB5pyJ6IqC54K55p2l6K+077yM54i26IqC54K55YyF5Zu055uS55qE5bem5LiL6KeS5piv5a6D55qE5bGA6YOo5Z2Q5qCH57O75Y6f54K577yM6L+Z5Liq5Y6f54K555u45b2T5LqO54i26IqC54K555qE5L2N572u5YeP5Y675a6D6ZSa54K555qE5YGP56e744CC6L+Z5qC356eB5pyJ6IqC54K55Y+v5Lul5q+U6L6D5a655piT6KKr5o6n5Yi25Zyo5YyF5Zu055uS5LmL5Lit44CCPGJyLz5cclxuICog55uu5YmN5Zyo5byV5pOO5Lit77yMUmljaFRleHQg5ZKMIFRpbGVNYXAg6YO95pyJ5Y+v6IO955Sf5oiQ56eB5pyJ6IqC54K544CCXHJcbiAqIEBjbGFzcyBQcml2YXRlTm9kZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICogQGV4dGVuZHMgTm9kZVxyXG4gKi9cclxubGV0IFByaXZhdGVOb2RlID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlByaXZhdGVOb2RlJyxcclxuICAgIGV4dGVuZHM6IE5vZGUsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHg6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5Qb3MueDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsUG9zaXRpb24gPSB0aGlzLl9vcmlnaW5Qb3M7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IGxvY2FsUG9zaXRpb24ueCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsUG9zaXRpb24ueCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc0RpcnR5KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpblBvcy55O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxQb3NpdGlvbiA9IHRoaXMuX29yaWdpblBvcztcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbG9jYWxQb3NpdGlvbi55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi55ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zRGlydHkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB6SW5kZXg6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5tYWNyby5NSU5fWklOREVYO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKCkge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2hvd0luRWRpdG9yOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXHJcbiAgICAgKi9cclxuICAgIGN0b3IgKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9IGNjLm1hY3JvLk1JTl9aSU5ERVggPDwgMTY7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luUG9zID0gY2MudjIoKTtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29iakZsYWdzIHw9IEhpZGVJbkhpZXJhcmNoeTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9wb3NEaXJ0eSAoc2VuZEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLlBPU0lUSU9OKTtcclxuICAgICAgICAhQ0NfTkFUSVZFUkVOREVSRVIgJiYgKHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSk7XHJcbiAgICAgICAgaWYgKHNlbmRFdmVudCA9PT0gdHJ1ZSAmJiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChOb2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVMb2NhbE1hdHJpeCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsTWF0RGlydHkpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgLy8gUG9zaXRpb24gY29ycmVjdGlvbiBmb3IgdHJhbnNmb3JtIGNhbGN1bGF0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX3Ryc1swXSA9IHRoaXMuX29yaWdpblBvcy54IC0gKHBhcmVudC5fYW5jaG9yUG9pbnQueCAtIDAuNSkgKiBwYXJlbnQuX2NvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl90cnNbMV0gPSB0aGlzLl9vcmlnaW5Qb3MueSAtIChwYXJlbnQuX2FuY2hvclBvaW50LnkgLSAwLjUpICogcGFyZW50Ll9jb250ZW50U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQb3NpdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMyKHRoaXMuX29yaWdpblBvcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFBvc2l0aW9uICh4LCB5KSB7XHJcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB4ID0geC54O1xyXG4gICAgICAgICAgICB5ID0geC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuX29yaWdpblBvcztcclxuICAgICAgICBpZiAocG9zLnggPT09IHggJiYgcG9zLnkgPT09IHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3MueCA9IHg7XHJcbiAgICAgICAgcG9zLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuX3Bvc0RpcnR5KHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRQYXJlbnQodmFsdWUpIHtcclxuICAgICAgICBsZXQgb2xkUGFyZW50ID0gdGhpcy5fcGFyZW50O1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKHZhbHVlKTtcclxuICAgICAgICBpZiAob2xkUGFyZW50ICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAob2xkUGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQub2ZmKE5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9wb3NEaXJ0eSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5vbihOb2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fcG9zRGlydHksIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBkbyBub3QgdXBkYXRlIG9yZGVyIG9mIGFycml2YWxcclxuICAgIF91cGRhdGVPcmRlck9mQXJyaXZhbCgpIHt9LFxyXG59KTtcclxuXHJcbmxldCBwcm90byA9IFByaXZhdGVOb2RlLnByb3RvdHlwZTtcclxuY2MuanMuZ2V0c2V0KHByb3RvLCBcInBhcmVudFwiLCBwcm90by5nZXRQYXJlbnQsIHByb3RvLnNldFBhcmVudCk7XHJcbmNjLmpzLmdldHNldChwcm90bywgXCJwb3NpdGlvblwiLCBwcm90by5nZXRQb3NpdGlvbiwgcHJvdG8uc2V0UG9zaXRpb24pO1xyXG5cclxuaWYgKENDX0VESVRPUikge1xyXG4gICAgLy8gY2hlY2sgY29tcG9uZW50cyB0byBhdm9pZCBtaXNzaW5nIG5vZGUgcmVmZXJlbmNlIHNlcmlhbGllZCBpbiBwcmV2aW91cyB2ZXJzaW9uXHJcbiAgICBwcm90by5fb25CYXRjaENyZWF0ZWQgPSBmdW5jdGlvbiAoZG9udFN5bmNDaGlsZFByZWZhYikge1xyXG4gICAgICAgIGZvciAobGV0IGNvbXAgb2YgdGhpcy5fY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBjb21wLm5vZGUgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTm9kZS5wcm90b3R5cGUuX29uQmF0Y2hDcmVhdGVkLmNhbGwodGhpcywgZG9udFN5bmNDaGlsZFByZWZhYik7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jYy5Qcml2YXRlTm9kZSA9IG1vZHVsZS5leHBvcnRzID0gUHJpdmF0ZU5vZGU7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9