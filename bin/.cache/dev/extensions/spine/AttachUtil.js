
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/AttachUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _mat = _interopRequireDefault(require("../../cocos2d/core/value-types/mat4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_TRANSFORM = RenderFlow.FLAG_TRANSFORM;

var EmptyHandle = function EmptyHandle() {};

var ATTACHED_ROOT_NAME = 'ATTACHED_NODE_TREE';
var ATTACHED_PRE_NAME = 'ATTACHED_NODE:';

var limitNode = function limitNode(node) {
  // attached node's world matrix update per frame
  Object.defineProperty(node, '_worldMatDirty', {
    get: function get() {
      return true;
    },
    set: function set(value) {
      /* do nothing */
    }
  }); // shield world matrix calculate interface

  node._calculWorldMatrix = EmptyHandle;
  node._mulMat = EmptyHandle;
};

var _tempMat4 = new _mat["default"]();
/**
 * @module sp
 */

/**
 * !#en Attach node tool
 * !#zh 挂点工具类
 * @class sp.AttachUtil
 */


var AttachUtil = cc.Class({
  name: 'sp.AttachUtil',
  ctor: function ctor() {
    this._inited = false;
    this._skeleton = null;
    this._skeletonNode = null;
    this._skeletonComp = null;
    this._attachedRootNode = null;
    this._attachedNodeArray = [];
    this._boneIndexToNode = {};
  },
  init: function init(skeletonComp) {
    this._inited = true;
    this._skeleton = skeletonComp._skeleton;
    this._skeletonNode = skeletonComp.node;
    this._skeletonComp = skeletonComp;
  },
  reset: function reset() {
    this._inited = false;
    this._skeleton = null;
    this._skeletonNode = null;
    this._skeletonComp = null;
  },
  _prepareAttachNode: function _prepareAttachNode() {
    var armature = this._skeleton;

    if (!armature) {
      return;
    }

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) {
      rootNode = new cc.Node(ATTACHED_ROOT_NAME);
      limitNode(rootNode);

      this._skeletonNode.addChild(rootNode);
    }

    var isCached = this._skeletonComp.isAnimationCached();

    if (isCached && this._skeletonComp._frameCache) {
      this._skeletonComp._frameCache.enableCacheAttachedInfo();
    }

    this._attachedRootNode = rootNode;
    return rootNode;
  },
  _buildBoneAttachedNode: function _buildBoneAttachedNode(bone, boneIndex) {
    var boneNodeName = ATTACHED_PRE_NAME + bone.data.name;
    var boneNode = new cc.Node(boneNodeName);

    this._buildBoneRelation(boneNode, bone, boneIndex);

    return boneNode;
  },
  _buildBoneRelation: function _buildBoneRelation(boneNode, bone, boneIndex) {
    limitNode(boneNode);
    boneNode._bone = bone;
    boneNode._boneIndex = boneIndex;

    this._attachedNodeArray.push(boneNode);

    this._boneIndexToNode[boneIndex] = boneNode;
  },

  /**
   * !#en Gets attached root node.
   * !#zh 获取挂接节点树的根节点
   * @method getAttachedRootNode
   * @return {cc.Node}
   */
  getAttachedRootNode: function getAttachedRootNode() {
    return this._attachedRootNode;
  },

  /**
   * !#en Gets attached node which you want.
   * !#zh 获得对应的挂点
   * @method getAttachedNodes
   * @param {String} boneName
   * @return {Node[]}
   */
  getAttachedNodes: function getAttachedNodes(boneName) {
    var nodeArray = this._attachedNodeArray;
    var res = [];
    if (!this._inited) return res;

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i];
      if (!boneNode || !boneNode.isValid) continue;

      if (boneNode.name === ATTACHED_PRE_NAME + boneName) {
        res.push(boneNode);
      }
    }

    return res;
  },
  _rebuildNodeArray: function _rebuildNodeArray() {
    var findMap = this._boneIndexToNode = {};
    var oldNodeArray = this._attachedNodeArray;
    var nodeArray = this._attachedNodeArray = [];

    for (var i = 0, n = oldNodeArray.length; i < n; i++) {
      var boneNode = oldNodeArray[i];
      if (!boneNode || !boneNode.isValid || boneNode._toRemove) continue;
      nodeArray.push(boneNode);
      findMap[boneNode._boneIndex] = boneNode;
    }
  },
  _sortNodeArray: function _sortNodeArray() {
    var nodeArray = this._attachedNodeArray;
    nodeArray.sort(function (a, b) {
      return a._boneIndex < b._boneIndex ? -1 : 1;
    });
  },
  _getNodeByBoneIndex: function _getNodeByBoneIndex(boneIndex) {
    var findMap = this._boneIndexToNode;
    var boneNode = findMap[boneIndex];
    if (!boneNode || !boneNode.isValid) return null;
    return boneNode;
  },

  /**
   * !#en Destroy attached node which you want.
   * !#zh 销毁对应的挂点
   * @method destroyAttachedNodes
   * @param {String} boneName
   */
  destroyAttachedNodes: function destroyAttachedNodes(boneName) {
    if (!this._inited) return;
    var nodeArray = this._attachedNodeArray;

    var markTree = function markTree(rootNode) {
      var children = rootNode.children;

      for (var i = 0, n = children.length; i < n; i++) {
        var c = children[i];
        if (c) markTree(c);
      }

      rootNode._toRemove = true;
    };

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i];
      if (!boneNode || !boneNode.isValid) continue;
      var delName = boneNode.name.split(ATTACHED_PRE_NAME)[1];

      if (delName === boneName) {
        markTree(boneNode);
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
      }
    }

    this._rebuildNodeArray();
  },

  /**
   * !#en Traverse all bones to generate the minimum node tree containing the given bone names, NOTE that make sure the skeleton has initialized before calling this interface.
   * !#zh 遍历所有插槽，生成包含所有给定插槽名称的最小节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
   * @method generateAttachedNodes
   * @param {String} boneName
   * @return {Node[]} attached node array
   */
  generateAttachedNodes: function generateAttachedNodes(boneName) {
    var targetNodes = [];
    if (!this._inited) return targetNodes;

    var rootNode = this._prepareAttachNode();

    if (!rootNode) return targetNodes;
    var res = [];
    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;

      if (boneData.name == boneName) {
        res.push(bone);
      }
    }

    var buildBoneTree = function (bone) {
      if (!bone) return;
      var boneData = bone.data;

      var boneNode = this._getNodeByBoneIndex(boneData.index);

      if (boneNode) return boneNode;
      boneNode = this._buildBoneAttachedNode(bone, boneData.index);
      var parentBoneNode = buildBoneTree(bone.parent) || rootNode;
      boneNode.parent = parentBoneNode;
      return boneNode;
    }.bind(this);

    for (var _i = 0, _n = res.length; _i < _n; _i++) {
      var targetNode = buildBoneTree(res[_i]);
      targetNodes.push(targetNode);
    }

    this._sortNodeArray();

    return targetNodes;
  },

  /**
   * !#en Destroy all attached node.
   * !#zh 销毁所有挂点
   * @method destroyAllAttachedNodes
   */
  destroyAllAttachedNodes: function destroyAllAttachedNodes() {
    this._attachedRootNode = null;
    this._attachedNodeArray.length = 0;
    this._boneIndexToNode = {};
    if (!this._inited) return;

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    if (rootNode) {
      rootNode.removeFromParent(true);
      rootNode.destroy();
      rootNode = null;
    }
  },

  /**
   * !#en Traverse all bones to generate a tree containing all bones nodes, NOTE that make sure the skeleton has initialized before calling this interface.
   * !#zh 遍历所有插槽，生成包含所有插槽的节点树，注意，调用该接口前请确保骨骼动画已经初始化好。
   * @method generateAllAttachedNodes
   * @return {cc.Node} root node
   */
  generateAllAttachedNodes: function generateAllAttachedNodes() {
    if (!this._inited) return; // clear all records

    this._boneIndexToNode = {};
    this._attachedNodeArray.length = 0;

    var rootNode = this._prepareAttachNode();

    if (!rootNode) return;
    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;
      var parentNode = null;

      if (bone.parent) {
        var parentIndex = bone.parent.data.index;
        parentNode = this._boneIndexToNode[parentIndex];
      } else {
        parentNode = rootNode;
      }

      if (parentNode) {
        var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);

        if (!boneNode || !boneNode.isValid) {
          boneNode = this._buildBoneAttachedNode(bone, boneData.index);
          parentNode.addChild(boneNode);
        } else {
          this._buildBoneRelation(boneNode, bone, boneData.index);
        }
      }
    }

    return rootNode;
  },
  _hasAttachedNode: function _hasAttachedNode() {
    if (!this._inited) return false;

    var attachedRootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    return !!attachedRootNode;
  },
  _associateAttachedNode: function _associateAttachedNode() {
    if (!this._inited) return;

    var rootNode = this._skeletonNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) return;
    this._attachedRootNode = rootNode; // clear all records

    this._boneIndexToNode = {};
    var nodeArray = this._attachedNodeArray;
    nodeArray.length = 0;
    limitNode(rootNode);

    if (!CC_NATIVERENDERER) {
      var isCached = this._skeletonComp.isAnimationCached();

      if (isCached && this._skeletonComp._frameCache) {
        this._skeletonComp._frameCache.enableCacheAttachedInfo();
      }
    }

    var bones = this._skeleton.bones;

    for (var i = 0, n = bones.length; i < n; i++) {
      var bone = bones[i];
      var boneData = bone.data;
      var parentNode = null;

      if (bone.parent) {
        var parentIndex = bone.parent.data.index;
        parentNode = this._boneIndexToNode[parentIndex];
      } else {
        parentNode = rootNode;
      }

      if (parentNode) {
        var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + boneData.name);

        if (boneNode && boneNode.isValid) {
          this._buildBoneRelation(boneNode, bone, boneData.index);
        }
      }
    }
  },
  _syncAttachedNode: function _syncAttachedNode() {
    if (!this._inited) return;
    var rootNode = this._attachedRootNode;
    var nodeArray = this._attachedNodeArray;

    if (!rootNode || !rootNode.isValid) {
      this._attachedRootNode = null;
      nodeArray.length = 0;
      return;
    }

    var rootMatrix = this._skeletonNode._worldMatrix;

    _mat["default"].copy(rootNode._worldMatrix, rootMatrix);

    rootNode._renderFlag &= ~FLAG_TRANSFORM;
    var boneInfos = null;

    var isCached = this._skeletonComp.isAnimationCached();

    if (isCached) {
      boneInfos = this._skeletonComp._curFrame && this._skeletonComp._curFrame.boneInfos;
    } else {
      boneInfos = this._skeleton.bones;
    }

    if (!boneInfos) return;
    var mulMat = this._skeletonNode._mulMat;

    var matrixHandle = function matrixHandle(nodeMat, parentMat, bone) {
      var tm = _tempMat4.m;
      tm[0] = bone.a;
      tm[1] = bone.c;
      tm[4] = bone.b;
      tm[5] = bone.d;
      tm[12] = bone.worldX;
      tm[13] = bone.worldY;
      mulMat(nodeMat, parentMat, _tempMat4);
    };

    var nodeArrayDirty = false;

    for (var i = 0, n = nodeArray.length; i < n; i++) {
      var boneNode = nodeArray[i]; // Node has been destroy

      if (!boneNode || !boneNode.isValid) {
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      var bone = boneInfos[boneNode._boneIndex]; // Bone has been destroy

      if (!bone) {
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      matrixHandle(boneNode._worldMatrix, rootNode._worldMatrix, bone);
      boneNode._renderFlag &= ~FLAG_TRANSFORM;
    }

    if (nodeArrayDirty) {
      this._rebuildNodeArray();
    }
  }
});
module.exports = sp.AttachUtil = AttachUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxBdHRhY2hVdGlsLmpzIl0sIm5hbWVzIjpbIlJlbmRlckZsb3ciLCJyZXF1aXJlIiwiRkxBR19UUkFOU0ZPUk0iLCJFbXB0eUhhbmRsZSIsIkFUVEFDSEVEX1JPT1RfTkFNRSIsIkFUVEFDSEVEX1BSRV9OQU1FIiwibGltaXROb2RlIiwibm9kZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfY2FsY3VsV29ybGRNYXRyaXgiLCJfbXVsTWF0IiwiX3RlbXBNYXQ0IiwiTWF0NCIsIkF0dGFjaFV0aWwiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfaW5pdGVkIiwiX3NrZWxldG9uIiwiX3NrZWxldG9uTm9kZSIsIl9za2VsZXRvbkNvbXAiLCJfYXR0YWNoZWRSb290Tm9kZSIsIl9hdHRhY2hlZE5vZGVBcnJheSIsIl9ib25lSW5kZXhUb05vZGUiLCJpbml0Iiwic2tlbGV0b25Db21wIiwicmVzZXQiLCJfcHJlcGFyZUF0dGFjaE5vZGUiLCJhcm1hdHVyZSIsInJvb3ROb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJpc1ZhbGlkIiwiTm9kZSIsImFkZENoaWxkIiwiaXNDYWNoZWQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9mcmFtZUNhY2hlIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJfYnVpbGRCb25lQXR0YWNoZWROb2RlIiwiYm9uZSIsImJvbmVJbmRleCIsImJvbmVOb2RlTmFtZSIsImRhdGEiLCJib25lTm9kZSIsIl9idWlsZEJvbmVSZWxhdGlvbiIsIl9ib25lIiwiX2JvbmVJbmRleCIsInB1c2giLCJnZXRBdHRhY2hlZFJvb3ROb2RlIiwiZ2V0QXR0YWNoZWROb2RlcyIsImJvbmVOYW1lIiwibm9kZUFycmF5IiwicmVzIiwiaSIsIm4iLCJsZW5ndGgiLCJfcmVidWlsZE5vZGVBcnJheSIsImZpbmRNYXAiLCJvbGROb2RlQXJyYXkiLCJfdG9SZW1vdmUiLCJfc29ydE5vZGVBcnJheSIsInNvcnQiLCJhIiwiYiIsIl9nZXROb2RlQnlCb25lSW5kZXgiLCJkZXN0cm95QXR0YWNoZWROb2RlcyIsIm1hcmtUcmVlIiwiY2hpbGRyZW4iLCJjIiwiZGVsTmFtZSIsInNwbGl0IiwicmVtb3ZlRnJvbVBhcmVudCIsImRlc3Ryb3kiLCJnZW5lcmF0ZUF0dGFjaGVkTm9kZXMiLCJ0YXJnZXROb2RlcyIsImJvbmVzIiwiYm9uZURhdGEiLCJidWlsZEJvbmVUcmVlIiwiaW5kZXgiLCJwYXJlbnRCb25lTm9kZSIsInBhcmVudCIsImJpbmQiLCJ0YXJnZXROb2RlIiwiZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMiLCJnZW5lcmF0ZUFsbEF0dGFjaGVkTm9kZXMiLCJwYXJlbnROb2RlIiwicGFyZW50SW5kZXgiLCJfaGFzQXR0YWNoZWROb2RlIiwiYXR0YWNoZWRSb290Tm9kZSIsIl9hc3NvY2lhdGVBdHRhY2hlZE5vZGUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9zeW5jQXR0YWNoZWROb2RlIiwicm9vdE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsImNvcHkiLCJfcmVuZGVyRmxhZyIsImJvbmVJbmZvcyIsIl9jdXJGcmFtZSIsIm11bE1hdCIsIm1hdHJpeEhhbmRsZSIsIm5vZGVNYXQiLCJwYXJlbnRNYXQiLCJ0bSIsIm0iLCJkIiwid29ybGRYIiwid29ybGRZIiwibm9kZUFycmF5RGlydHkiLCJtb2R1bGUiLCJleHBvcnRzIiwic3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7QUF6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0EsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMseUNBQUQsQ0FBMUI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHRixVQUFVLENBQUNFLGNBQWxDOztBQUNB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QUF4QixDQUQ4QyxDQUU5Qzs7QUFDQSxVQUFJLENBQUNWLFFBQUQsSUFBYSxDQUFDQSxRQUFRLENBQUNaLE9BQTNCLEVBQW9DO0FBQ2hDb0IsUUFBQUEsU0FBUyxDQUFDRSxDQUFELENBQVQsR0FBZSxJQUFmO0FBQ0FzRCxRQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDQTtBQUNIOztBQUNELFVBQUlwRSxJQUFJLEdBQUd5RCxTQUFTLENBQUNyRCxRQUFRLENBQUNHLFVBQVYsQ0FBcEIsQ0FSOEMsQ0FTOUM7O0FBQ0EsVUFBSSxDQUFDUCxJQUFMLEVBQVc7QUFDUEksUUFBQUEsUUFBUSxDQUFDNEIsZ0JBQVQsQ0FBMEIsSUFBMUI7QUFDQTVCLFFBQUFBLFFBQVEsQ0FBQzZCLE9BQVQ7QUFDQXJCLFFBQUFBLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFULEdBQWUsSUFBZjtBQUNBc0QsUUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0E7QUFDSDs7QUFDRFIsTUFBQUEsWUFBWSxDQUFDeEQsUUFBUSxDQUFDa0QsWUFBVixFQUF3QmhFLFFBQVEsQ0FBQ2dFLFlBQWpDLEVBQStDdEQsSUFBL0MsQ0FBWjtBQUNBSSxNQUFBQSxRQUFRLENBQUNvRCxXQUFULElBQXdCLENBQUNsRyxjQUF6QjtBQUNIOztBQUNELFFBQUk4RyxjQUFKLEVBQW9CO0FBQ2hCLFdBQUtuRCxpQkFBTDtBQUNIO0FBQ0o7QUFyWHFCLENBQVQsQ0FBakI7QUF3WEFvRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJDLEVBQUUsQ0FBQ2xHLFVBQUgsR0FBZ0JBLFVBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IE1hdDQgZnJvbSAnLi4vLi4vY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL21hdDQnO1xyXG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XHJcbmNvbnN0IEZMQUdfVFJBTlNGT1JNID0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STTtcclxuY29uc3QgRW1wdHlIYW5kbGUgPSBmdW5jdGlvbiAoKSB7fVxyXG5jb25zdCBBVFRBQ0hFRF9ST09UX05BTUUgPSAnQVRUQUNIRURfTk9ERV9UUkVFJztcclxuY29uc3QgQVRUQUNIRURfUFJFX05BTUUgPSAnQVRUQUNIRURfTk9ERTonO1xyXG5jb25zdCBsaW1pdE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgLy8gYXR0YWNoZWQgbm9kZSdzIHdvcmxkIG1hdHJpeCB1cGRhdGUgcGVyIGZyYW1lXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobm9kZSwgJ193b3JsZE1hdERpcnR5Jywge1xyXG4gICAgICAgIGdldCAoKSB7IHJldHVybiB0cnVlOyB9LFxyXG4gICAgICAgIHNldCAodmFsdWUpIHsvKiBkbyBub3RoaW5nICovfVxyXG4gICAgfSk7XHJcbiAgICAvLyBzaGllbGQgd29ybGQgbWF0cml4IGNhbGN1bGF0ZSBpbnRlcmZhY2VcclxuICAgIG5vZGUuX2NhbGN1bFdvcmxkTWF0cml4ID0gRW1wdHlIYW5kbGU7XHJcbiAgICBub2RlLl9tdWxNYXQgPSBFbXB0eUhhbmRsZTtcclxufTtcclxubGV0IF90ZW1wTWF0NCA9IG5ldyBNYXQ0KCk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBzcFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIEF0dGFjaCBub2RlIHRvb2xcclxuICogISN6aCDmjILngrnlt6XlhbfnsbtcclxuICogQGNsYXNzIHNwLkF0dGFjaFV0aWxcclxuICovXHJcbmxldCBBdHRhY2hVdGlsID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ3NwLkF0dGFjaFV0aWwnLFxyXG5cclxuICAgIGN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9za2VsZXRvbk5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQgKHNrZWxldG9uQ29tcCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2tlbGV0b24gPSBza2VsZXRvbkNvbXAuX3NrZWxldG9uO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uTm9kZSA9IHNrZWxldG9uQ29tcC5ub2RlO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcCA9IHNrZWxldG9uQ29tcDtcclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXQgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9za2VsZXRvbk5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wcmVwYXJlQXR0YWNoTm9kZSAoKSB7XHJcbiAgICAgICAgbGV0IGFybWF0dXJlID0gdGhpcy5fc2tlbGV0b247XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9za2VsZXRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbmV3IGNjLk5vZGUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICAgICAgbGltaXROb2RlKHJvb3ROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25Ob2RlLmFkZENoaWxkKHJvb3ROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0NhY2hlZCA9IHRoaXMuX3NrZWxldG9uQ29tcC5pc0FuaW1hdGlvbkNhY2hlZCgpO1xyXG4gICAgICAgIGlmIChpc0NhY2hlZCAmJiB0aGlzLl9za2VsZXRvbkNvbXAuX2ZyYW1lQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25Db21wLl9mcmFtZUNhY2hlLmVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gcm9vdE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYnVpbGRCb25lQXR0YWNoZWROb2RlIChib25lLCBib25lSW5kZXgpIHtcclxuICAgICAgICBsZXQgYm9uZU5vZGVOYW1lID0gQVRUQUNIRURfUFJFX05BTUUgKyBib25lLmRhdGEubmFtZTtcclxuICAgICAgICBsZXQgYm9uZU5vZGUgPSBuZXcgY2MuTm9kZShib25lTm9kZU5hbWUpO1xyXG4gICAgICAgIHRoaXMuX2J1aWxkQm9uZVJlbGF0aW9uKGJvbmVOb2RlLCBib25lLCBib25lSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBib25lTm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgX2J1aWxkQm9uZVJlbGF0aW9uIChib25lTm9kZSwgYm9uZSwgYm9uZUluZGV4KSB7XHJcbiAgICAgICAgbGltaXROb2RlKGJvbmVOb2RlKTtcclxuICAgICAgICBib25lTm9kZS5fYm9uZSA9IGJvbmU7XHJcbiAgICAgICAgYm9uZU5vZGUuX2JvbmVJbmRleCA9IGJvbmVJbmRleDtcclxuICAgICAgICB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheS5wdXNoKGJvbmVOb2RlKTtcclxuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGVbYm9uZUluZGV4XSA9IGJvbmVOb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBhdHRhY2hlZCByb290IG5vZGUuXHJcbiAgICAgKiAhI3poIOiOt+WPluaMguaOpeiKgueCueagkeeahOagueiKgueCuVxyXG4gICAgICogQG1ldGhvZCBnZXRBdHRhY2hlZFJvb3ROb2RlXHJcbiAgICAgKiBAcmV0dXJuIHtjYy5Ob2RlfVxyXG4gICAgICovXHJcbiAgICBnZXRBdHRhY2hlZFJvb3ROb2RlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXR0YWNoZWRSb290Tm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldHMgYXR0YWNoZWQgbm9kZSB3aGljaCB5b3Ugd2FudC5cclxuICAgICAqICEjemgg6I635b6X5a+55bqU55qE5oyC54K5XHJcbiAgICAgKiBAbWV0aG9kIGdldEF0dGFjaGVkTm9kZXNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxyXG4gICAgICogQHJldHVybiB7Tm9kZVtdfVxyXG4gICAgICovXHJcbiAgICBnZXRBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBsZXQgcmVzID0gW107XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybiByZXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib25lTm9kZSA9IG5vZGVBcnJheVtpXTtcclxuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChib25lTm9kZS5uYW1lID09PSBBVFRBQ0hFRF9QUkVfTkFNRSArIGJvbmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXMucHVzaChib25lTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH0sXHJcblxyXG4gICAgX3JlYnVpbGROb2RlQXJyYXkgKCkge1xyXG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XHJcbiAgICAgICAgbGV0IG9sZE5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gb2xkTm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBvbGROb2RlQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQgfHwgYm9uZU5vZGUuX3RvUmVtb3ZlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbm9kZUFycmF5LnB1c2goYm9uZU5vZGUpO1xyXG4gICAgICAgICAgICBmaW5kTWFwW2JvbmVOb2RlLl9ib25lSW5kZXhdID0gYm9uZU5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfc29ydE5vZGVBcnJheSAoKSB7XHJcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xyXG4gICAgICAgIG5vZGVBcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLl9ib25lSW5kZXggPCBiLl9ib25lSW5kZXg/IC0xIDogMTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldE5vZGVCeUJvbmVJbmRleCAoYm9uZUluZGV4KSB7XHJcbiAgICAgICAgbGV0IGZpbmRNYXAgPSB0aGlzLl9ib25lSW5kZXhUb05vZGU7XHJcbiAgICAgICAgbGV0IGJvbmVOb2RlID0gZmluZE1hcFtib25lSW5kZXhdO1xyXG4gICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBib25lTm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERlc3Ryb3kgYXR0YWNoZWQgbm9kZSB3aGljaCB5b3Ugd2FudC5cclxuICAgICAqICEjemgg6ZSA5q+B5a+55bqU55qE5oyC54K5XHJcbiAgICAgKiBAbWV0aG9kIGRlc3Ryb3lBdHRhY2hlZE5vZGVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9uZU5hbWVcclxuICAgICAqL1xyXG4gICAgZGVzdHJveUF0dGFjaGVkTm9kZXMgKGJvbmVOYW1lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xyXG4gICAgICAgIGxldCBtYXJrVHJlZSA9IGZ1bmN0aW9uIChyb290Tm9kZSkge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSByb290Tm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYykgbWFya1RyZWUoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm9vdE5vZGUuX3RvUmVtb3ZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gbm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlbE5hbWUgPSBib25lTm9kZS5uYW1lLnNwbGl0KEFUVEFDSEVEX1BSRV9OQU1FKVsxXTtcclxuICAgICAgICAgICAgaWYgKGRlbE5hbWUgPT09IGJvbmVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrVHJlZShib25lTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBib25lTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZUFycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVHJhdmVyc2UgYWxsIGJvbmVzIHRvIGdlbmVyYXRlIHRoZSBtaW5pbXVtIG5vZGUgdHJlZSBjb250YWluaW5nIHRoZSBnaXZlbiBib25lIG5hbWVzLCBOT1RFIHRoYXQgbWFrZSBzdXJlIHRoZSBza2VsZXRvbiBoYXMgaW5pdGlhbGl6ZWQgYmVmb3JlIGNhbGxpbmcgdGhpcyBpbnRlcmZhY2UuXHJcbiAgICAgKiAhI3poIOmBjeWOhuaJgOacieaPkuanve+8jOeUn+aIkOWMheWQq+aJgOaciee7meWumuaPkuanveWQjeensOeahOacgOWwj+iKgueCueagke+8jOazqOaEj++8jOiwg+eUqOivpeaOpeWPo+WJjeivt+ehruS/nemqqOmqvOWKqOeUu+W3sue7j+WIneWni+WMluWlveOAglxyXG4gICAgICogQG1ldGhvZCBnZW5lcmF0ZUF0dGFjaGVkTm9kZXNcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBib25lTmFtZVxyXG4gICAgICogQHJldHVybiB7Tm9kZVtdfSBhdHRhY2hlZCBub2RlIGFycmF5XHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlQXR0YWNoZWROb2RlcyAoYm9uZU5hbWUpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0Tm9kZXMgPSBbXTtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuIHRhcmdldE5vZGVzO1xyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9wcmVwYXJlQXR0YWNoTm9kZSgpO1xyXG4gICAgICAgIGlmICghcm9vdE5vZGUpIHJldHVybiB0YXJnZXROb2RlcztcclxuXHJcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgICAgIGxldCBib25lcyA9IHRoaXMuX3NrZWxldG9uLmJvbmVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gYm9uZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib25lID0gYm9uZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBib25lRGF0YSA9IGJvbmUuZGF0YTtcclxuICAgICAgICAgICAgaWYgKGJvbmVEYXRhLm5hbWUgPT0gYm9uZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGJvbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnVpbGRCb25lVHJlZSA9IGZ1bmN0aW9uIChib25lKSB7XHJcbiAgICAgICAgICAgIGlmICghYm9uZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgYm9uZURhdGEgPSBib25lLmRhdGE7XHJcbiAgICAgICAgICAgIGxldCBib25lTm9kZSA9IHRoaXMuX2dldE5vZGVCeUJvbmVJbmRleChib25lRGF0YS5pbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChib25lTm9kZSkgcmV0dXJuIGJvbmVOb2RlO1xyXG5cclxuICAgICAgICAgICAgYm9uZU5vZGUgPSB0aGlzLl9idWlsZEJvbmVBdHRhY2hlZE5vZGUoYm9uZSwgYm9uZURhdGEuaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmVudEJvbmVOb2RlID0gYnVpbGRCb25lVHJlZShib25lLnBhcmVudCkgfHwgcm9vdE5vZGU7XHJcbiAgICAgICAgICAgIGJvbmVOb2RlLnBhcmVudCA9IHBhcmVudEJvbmVOb2RlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJvbmVOb2RlO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSByZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXROb2RlID0gYnVpbGRCb25lVHJlZShyZXNbaV0pO1xyXG4gICAgICAgICAgICB0YXJnZXROb2Rlcy5wdXNoKHRhcmdldE5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc29ydE5vZGVBcnJheSgpO1xyXG4gICAgICAgIHJldHVybiB0YXJnZXROb2RlcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERlc3Ryb3kgYWxsIGF0dGFjaGVkIG5vZGUuXHJcbiAgICAgKiAhI3poIOmUgOavgeaJgOacieaMgueCuVxyXG4gICAgICogQG1ldGhvZCBkZXN0cm95QWxsQXR0YWNoZWROb2Rlc1xyXG4gICAgICovXHJcbiAgICBkZXN0cm95QWxsQXR0YWNoZWROb2RlcyAoKSB7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoZWRSb290Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9za2VsZXRvbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICBpZiAocm9vdE5vZGUpIHtcclxuICAgICAgICAgICAgcm9vdE5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICAgICAgcm9vdE5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICByb290Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVHJhdmVyc2UgYWxsIGJvbmVzIHRvIGdlbmVyYXRlIGEgdHJlZSBjb250YWluaW5nIGFsbCBib25lcyBub2RlcywgTk9URSB0aGF0IG1ha2Ugc3VyZSB0aGUgc2tlbGV0b24gaGFzIGluaXRpYWxpemVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgaW50ZXJmYWNlLlxyXG4gICAgICogISN6aCDpgY3ljobmiYDmnInmj5Lmp73vvIznlJ/miJDljIXlkKvmiYDmnInmj5Lmp73nmoToioLngrnmoJHvvIzms6jmhI/vvIzosIPnlKjor6XmjqXlj6PliY3or7fnoa7kv53pqqjpqrzliqjnlLvlt7Lnu4/liJ3lp4vljJblpb3jgIJcclxuICAgICAqIEBtZXRob2QgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzXHJcbiAgICAgKiBAcmV0dXJuIHtjYy5Ob2RlfSByb290IG5vZGVcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVBbGxBdHRhY2hlZE5vZGVzICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xyXG4gICAgICAgIHRoaXMuX2JvbmVJbmRleFRvTm9kZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJvb3ROb2RlID0gdGhpcy5fcHJlcGFyZUF0dGFjaE5vZGUoKTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBib25lcyA9IHRoaXMuX3NrZWxldG9uLmJvbmVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gYm9uZXMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib25lID0gYm9uZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBib25lRGF0YSA9IGJvbmUuZGF0YTtcclxuICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoYm9uZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRJbmRleCA9IGJvbmUucGFyZW50LmRhdGEuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlW3BhcmVudEluZGV4XTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSByb290Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBib25lTm9kZSA9IHBhcmVudE5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUFJFX05BTUUgKyBib25lRGF0YS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBib25lTm9kZSA9IHRoaXMuX2J1aWxkQm9uZUF0dGFjaGVkTm9kZShib25lLCBib25lRGF0YS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5hZGRDaGlsZChib25lTm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkQm9uZVJlbGF0aW9uKGJvbmVOb2RlLCBib25lLCBib25lRGF0YS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaGFzQXR0YWNoZWROb2RlICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgYXR0YWNoZWRSb290Tm9kZSA9IHRoaXMuX3NrZWxldG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9ST09UX05BTUUpO1xyXG4gICAgICAgIHJldHVybiAhIWF0dGFjaGVkUm9vdE5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hc3NvY2lhdGVBdHRhY2hlZE5vZGUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX3NrZWxldG9uTm9kZS5nZXRDaGlsZEJ5TmFtZShBVFRBQ0hFRF9ST09UX05BTUUpO1xyXG4gICAgICAgIGlmICghcm9vdE5vZGUgfHwgIXJvb3ROb2RlLmlzVmFsaWQpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gcm9vdE5vZGU7XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIGFsbCByZWNvcmRzXHJcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XHJcbiAgICAgICAgbGV0IG5vZGVBcnJheSA9IHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5O1xyXG4gICAgICAgIG5vZGVBcnJheS5sZW5ndGggPSAwO1xyXG4gICAgICAgIGxpbWl0Tm9kZShyb290Tm9kZSk7XHJcblxyXG4gICAgICAgIGlmICghQ0NfTkFUSVZFUkVOREVSRVIpIHtcclxuICAgICAgICAgICAgbGV0IGlzQ2FjaGVkID0gdGhpcy5fc2tlbGV0b25Db21wLmlzQW5pbWF0aW9uQ2FjaGVkKCk7XHJcbiAgICAgICAgICAgIGlmIChpc0NhY2hlZCAmJiB0aGlzLl9za2VsZXRvbkNvbXAuX2ZyYW1lQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uQ29tcC5fZnJhbWVDYWNoZS5lbmFibGVDYWNoZUF0dGFjaGVkSW5mbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYm9uZXMgPSB0aGlzLl9za2VsZXRvbi5ib25lcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGJvbmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9uZSA9IGJvbmVzW2ldO1xyXG4gICAgICAgICAgICBsZXQgYm9uZURhdGEgPSBib25lLmRhdGE7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnROb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJvbmUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50SW5kZXggPSBib25lLnBhcmVudC5kYXRhLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuX2JvbmVJbmRleFRvTm9kZVtwYXJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcm9vdE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1BSRV9OQU1FICsgYm9uZURhdGEubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9uZU5vZGUgJiYgYm9uZU5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkQm9uZVJlbGF0aW9uKGJvbmVOb2RlLCBib25lLCBib25lRGF0YS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9zeW5jQXR0YWNoZWROb2RlICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlO1xyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgcm9vdE1hdHJpeCA9IHRoaXMuX3NrZWxldG9uTm9kZS5fd29ybGRNYXRyaXg7XHJcbiAgICAgICAgTWF0NC5jb3B5KHJvb3ROb2RlLl93b3JsZE1hdHJpeCwgcm9vdE1hdHJpeCk7XHJcbiAgICAgICAgcm9vdE5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xyXG5cclxuICAgICAgICBsZXQgYm9uZUluZm9zID0gbnVsbDtcclxuICAgICAgICBsZXQgaXNDYWNoZWQgPSB0aGlzLl9za2VsZXRvbkNvbXAuaXNBbmltYXRpb25DYWNoZWQoKTtcclxuICAgICAgICBpZiAoaXNDYWNoZWQpIHtcclxuICAgICAgICAgICAgYm9uZUluZm9zID0gdGhpcy5fc2tlbGV0b25Db21wLl9jdXJGcmFtZSAmJiB0aGlzLl9za2VsZXRvbkNvbXAuX2N1ckZyYW1lLmJvbmVJbmZvcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib25lSW5mb3MgPSB0aGlzLl9za2VsZXRvbi5ib25lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghYm9uZUluZm9zKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBtdWxNYXQgPSB0aGlzLl9za2VsZXRvbk5vZGUuX211bE1hdDtcclxuICAgICAgICBsZXQgbWF0cml4SGFuZGxlID0gZnVuY3Rpb24gKG5vZGVNYXQsIHBhcmVudE1hdCwgYm9uZSkge1xyXG4gICAgICAgICAgICBsZXQgdG0gPSBfdGVtcE1hdDQubTtcclxuICAgICAgICAgICAgdG1bMF0gPSBib25lLmE7XHJcbiAgICAgICAgICAgIHRtWzFdID0gYm9uZS5jO1xyXG4gICAgICAgICAgICB0bVs0XSA9IGJvbmUuYjtcclxuICAgICAgICAgICAgdG1bNV0gPSBib25lLmQ7XHJcbiAgICAgICAgICAgIHRtWzEyXSA9IGJvbmUud29ybGRYO1xyXG4gICAgICAgICAgICB0bVsxM10gPSBib25lLndvcmxkWTtcclxuICAgICAgICAgICAgbXVsTWF0KG5vZGVNYXQsIHBhcmVudE1hdCwgX3RlbXBNYXQ0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgbm9kZUFycmF5RGlydHkgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IG5vZGVBcnJheS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gbm9kZUFycmF5W2ldO1xyXG4gICAgICAgICAgICAvLyBOb2RlIGhhcyBiZWVuIGRlc3Ryb3lcclxuICAgICAgICAgICAgaWYgKCFib25lTm9kZSB8fCAhYm9uZU5vZGUuaXNWYWxpZCkgeyBcclxuICAgICAgICAgICAgICAgIG5vZGVBcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYm9uZSA9IGJvbmVJbmZvc1tib25lTm9kZS5fYm9uZUluZGV4XTtcclxuICAgICAgICAgICAgLy8gQm9uZSBoYXMgYmVlbiBkZXN0cm95XHJcbiAgICAgICAgICAgIGlmICghYm9uZSkge1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGJvbmVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIG5vZGVBcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXRyaXhIYW5kbGUoYm9uZU5vZGUuX3dvcmxkTWF0cml4LCByb290Tm9kZS5fd29ybGRNYXRyaXgsIGJvbmUpO1xyXG4gICAgICAgICAgICBib25lTm9kZS5fcmVuZGVyRmxhZyAmPSB+RkxBR19UUkFOU0ZPUk07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlQXJyYXlEaXJ0eSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWJ1aWxkTm9kZUFycmF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNwLkF0dGFjaFV0aWwgPSBBdHRhY2hVdGlsOyJdLCJzb3VyY2VSb290IjoiLyJ9