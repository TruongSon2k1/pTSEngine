
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/AttachUtil.js';
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
 * @module dragonBones
 */

/**
 * !#en Attach node tool
 * !#zh 挂点工具类
 * @class dragonBones.AttachUtil
 */


var AttachUtil = cc.Class({
  name: 'dragonBones.AttachUtil',
  ctor: function ctor() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
    this._attachedRootNode = null;
    this._attachedNodeArray = [];
    this._boneIndexToNode = {};
  },
  init: function init(armatureDisplay) {
    this._inited = true;
    this._armature = armatureDisplay._armature;
    this._armatureNode = armatureDisplay.node;
    this._armatureDisplay = armatureDisplay;
  },
  reset: function reset() {
    this._inited = false;
    this._armature = null;
    this._armatureNode = null;
    this._armatureDisplay = null;
  },
  _prepareAttachNode: function _prepareAttachNode() {
    var armature = this._armature;

    if (!armature) {
      return;
    }

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) {
      rootNode = new cc.Node(ATTACHED_ROOT_NAME);
      limitNode(rootNode);

      this._armatureNode.addChild(rootNode);
    }

    var isCached = this._armatureDisplay.isAnimationCached();

    if (isCached && this._armatureDisplay._frameCache) {
      this._armatureDisplay._frameCache.enableCacheAttachedInfo();
    }

    this._attachedRootNode = rootNode;
    return rootNode;
  },
  _buildBoneAttachedNode: function _buildBoneAttachedNode(bone, boneIndex) {
    var boneNodeName = ATTACHED_PRE_NAME + bone.name;
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
    var boneIndex = 0;
    var res = [];

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        bone = bones[i];
        bone._boneIndex = boneIndex++;

        if (boneName === bone.name) {
          res.push(bone);
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i = 0, _l = slots.length; _i < _l; _i++) {
        slot = slots[_i];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(this._armature);

    var buildBoneTree = function (bone) {
      if (!bone) return;

      var boneNode = this._getNodeByBoneIndex(bone._boneIndex);

      if (boneNode) return boneNode;
      boneNode = this._buildBoneAttachedNode(bone, bone._boneIndex);
      var subArmatureParentBone = null;

      if (bone.armature.parent) {
        var parentSlot = bone.armature.parent;
        subArmatureParentBone = parentSlot.parent;
      }

      var parentBoneNode = buildBoneTree(bone.parent || subArmatureParentBone) || rootNode;
      boneNode.parent = parentBoneNode;

      if (bone.parent) {
        boneNode._rootNode = parentBoneNode._rootNode;
      } else {
        boneNode._rootNode = parentBoneNode;
      }

      return boneNode;
    }.bind(this);

    for (var i = 0, n = res.length; i < n; i++) {
      var targetNode = buildBoneTree(res[i]);

      if (targetNode) {
        targetNodes.push(targetNode);
      }
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

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

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
    var boneIndex = 0;

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var subArmatureParentNode = rootNode;

      if (armature.parent) {
        var parentSlot = armature.parent;
        var parentBone = parentSlot.parent;
        subArmatureParentNode = parentBone._attachedNode;
      }

      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        var curBoneIndex = boneIndex++;
        bone = bones[i];
        bone._attachedNode = null;
        var parentNode = null;

        if (bone.parent) {
          parentNode = bone.parent._attachedNode;
        } else {
          parentNode = subArmatureParentNode;
        }

        if (parentNode) {
          var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + bone.name);

          if (!boneNode || !boneNode.isValid) {
            boneNode = this._buildBoneAttachedNode(bone, curBoneIndex);
            parentNode.addChild(boneNode);
          } else {
            this._buildBoneRelation(boneNode, bone, curBoneIndex);
          }

          boneNode._rootNode = subArmatureParentNode;
          bone._attachedNode = boneNode;
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i2 = 0, _l2 = slots.length; _i2 < _l2; _i2++) {
        slot = slots[_i2];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(this._armature);
    return rootNode;
  },
  _hasAttachedNode: function _hasAttachedNode() {
    if (!this._inited) return false;

    var attachedRootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    return !!attachedRootNode;
  },
  _associateAttachedNode: function _associateAttachedNode() {
    if (!this._inited) return;

    var rootNode = this._armatureNode.getChildByName(ATTACHED_ROOT_NAME);

    if (!rootNode || !rootNode.isValid) return;
    this._attachedRootNode = rootNode; // clear all records

    this._boneIndexToNode = {};
    var nodeArray = this._attachedNodeArray;
    nodeArray.length = 0;
    var armature = this._armature;

    if (!armature) {
      return;
    }

    limitNode(rootNode);

    if (!CC_NATIVERENDERER) {
      var isCached = this._armatureDisplay.isAnimationCached();

      if (isCached && this._armatureDisplay._frameCache) {
        this._armatureDisplay._frameCache.enableCacheAttachedInfo();
      }
    }

    var boneIndex = 0;

    var attachedTraverse = function (armature) {
      if (!armature) return;
      var subArmatureParentNode = rootNode;

      if (armature.parent) {
        var parentSlot = armature.parent;
        var parentBone = parentSlot.parent;
        subArmatureParentNode = parentBone._attachedNode;
      }

      var bones = armature.getBones(),
          bone;

      for (var i = 0, l = bones.length; i < l; i++) {
        var curBoneIndex = boneIndex++;
        bone = bones[i];
        bone._attachedNode = null;
        var parentNode = null;

        if (bone.parent) {
          parentNode = bone.parent._attachedNode;
        } else {
          parentNode = subArmatureParentNode;
        }

        if (parentNode) {
          var boneNode = parentNode.getChildByName(ATTACHED_PRE_NAME + bone.name);

          if (boneNode && boneNode.isValid) {
            this._buildBoneRelation(boneNode, bone, curBoneIndex);

            boneNode._rootNode = subArmatureParentNode;
            bone._attachedNode = boneNode;
          }
        }
      }

      var slots = armature.getSlots(),
          slot;

      for (var _i3 = 0, _l3 = slots.length; _i3 < _l3; _i3++) {
        slot = slots[_i3];

        if (slot.childArmature) {
          attachedTraverse(slot.childArmature);
        }
      }
    }.bind(this);

    attachedTraverse(armature);
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

    var rootMatrix = this._armatureNode._worldMatrix;

    _mat["default"].copy(rootNode._worldMatrix, rootMatrix);

    rootNode._renderFlag &= ~FLAG_TRANSFORM;
    var boneInfos = null;

    var isCached = this._armatureDisplay.isAnimationCached();

    if (isCached) {
      boneInfos = this._armatureDisplay._curFrame && this._armatureDisplay._curFrame.boneInfos;
      if (!boneInfos) return;
    }

    var mulMat = this._armatureNode._mulMat;

    var matrixHandle = function matrixHandle(nodeMat, parentMat, boneMat) {
      var tm = _tempMat4.m;
      tm[0] = boneMat.a;
      tm[1] = boneMat.b;
      tm[4] = -boneMat.c;
      tm[5] = -boneMat.d;
      tm[12] = boneMat.tx;
      tm[13] = boneMat.ty;
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

      var bone = isCached ? boneInfos[boneNode._boneIndex] : boneNode._bone; // Bone has been destroy

      if (!bone || bone._isInPool) {
        boneNode.removeFromParent(true);
        boneNode.destroy();
        nodeArray[i] = null;
        nodeArrayDirty = true;
        continue;
      }

      matrixHandle(boneNode._worldMatrix, boneNode._rootNode._worldMatrix, bone.globalTransformMatrix);
      boneNode._renderFlag &= ~FLAG_TRANSFORM;
    }

    if (nodeArrayDirty) {
      this._rebuildNodeArray();
    }
  }
});
module.exports = dragonBones.AttachUtil = AttachUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXGRyYWdvbmJvbmVzXFxBdHRhY2hVdGlsLmpzIl0sIm5hbWVzIjpbIlJlbmRlckZsb3ciLCJyZXF1aXJlIiwiRkxBR19UUkFOU0ZPUk0iLCJFbXB0eUhhbmRsZSIsIkFUVEFDSEVEX1JPT1RfTkFNRSIsIkFUVEFDSEVEX1BSRV9OQU1FIiwibGltaXROb2RlIiwibm9kZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfY2FsY3VsV29ybGRNYXRyaXgiLCJfbXVsTWF0IiwiX3RlbXBNYXQ0IiwiTWF0NCIsIkF0dGFjaFV0aWwiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfaW5pdGVkIiwiX2FybWF0dXJlIiwiX2FybWF0dXJlTm9kZSIsIl9hcm1hdHVyZURpc3BsYXkiLCJfYXR0YWNoZWRSb290Tm9kZSIsIl9hdHRhY2hlZE5vZGVBcnJheSIsIl9ib25lSW5kZXhUb05vZGUiLCJpbml0IiwiYXJtYXR1cmVEaXNwbGF5IiwicmVzZXQiLCJfcHJlcGFyZUF0dGFjaE5vZGUiLCJhcm1hdHVyZSIsInJvb3ROb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJpc1ZhbGlkIiwiTm9kZSIsImFkZENoaWxkIiwiaXNDYWNoZWQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9mcmFtZUNhY2hlIiwiZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8iLCJfYnVpbGRCb25lQXR0YWNoZWROb2RlIiwiYm9uZSIsImJvbmVJbmRleCIsImJvbmVOb2RlTmFtZSIsImJvbmVOb2RlIiwiX2J1aWxkQm9uZVJlbGF0aW9uIiwiX2JvbmUiLCJfYm9uZUluZGV4IiwicHVzaCIsImdldEF0dGFjaGVkUm9vdE5vZGUiLCJnZXRBdHRhY2hlZE5vZGVzIiwiYm9uZU5hbWUiLCJub2RlQXJyYXkiLCJyZXMiLCJpIiwibiIsImxlbmd0aCIsIl9yZWJ1aWxkTm9kZUFycmF5IiwiZmluZE1hcCIsIm9sZE5vZGVBcnJheSIsIl90b1JlbW92ZSIsIl9zb3J0Tm9kZUFycmF5Iiwic29ydCIsImEiLCJiIiwiX2dldE5vZGVCeUJvbmVJbmRleCIsImRlc3Ryb3lBdHRhY2hlZE5vZGVzIiwibWFya1RyZWUiLCJjaGlsZHJlbiIsImMiLCJkZWxOYW1lIiwic3BsaXQiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveSIsImdlbmVyYXRlQXR0YWNoZWROb2RlcyIsInRhcmdldE5vZGVzIiwiYXR0YWNoZWRUcmF2ZXJzZSIsImJvbmVzIiwiZ2V0Qm9uZXMiLCJsIiwic2xvdHMiLCJnZXRTbG90cyIsInNsb3QiLCJjaGlsZEFybWF0dXJlIiwiYmluZCIsImJ1aWxkQm9uZVRyZWUiLCJzdWJBcm1hdHVyZVBhcmVudEJvbmUiLCJwYXJlbnQiLCJwYXJlbnRTbG90IiwicGFyZW50Qm9uZU5vZGUiLCJfcm9vdE5vZGUiLCJ0YXJnZXROb2RlIiwiZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMiLCJnZW5lcmF0ZUFsbEF0dGFjaGVkTm9kZXMiLCJzdWJBcm1hdHVyZVBhcmVudE5vZGUiLCJwYXJlbnRCb25lIiwiX2F0dGFjaGVkTm9kZSIsImN1ckJvbmVJbmRleCIsInBhcmVudE5vZGUiLCJfaGFzQXR0YWNoZWROb2RlIiwiYXR0YWNoZWRSb290Tm9kZSIsIl9hc3NvY2lhdGVBdHRhY2hlZE5vZGUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9zeW5jQXR0YWNoZWROb2RlIiwicm9vdE1hdHJpeCIsIl93b3JsZE1hdHJpeCIsImNvcHkiLCJfcmVuZGVyRmxhZyIsImJvbmVJbmZvcyIsIl9jdXJGcmFtZSIsIm11bE1hdCIsIm1hdHJpeEhhbmRsZSIsIm5vZGVNYXQiLCJwYXJlbnRNYXQiLCJib25lTWF0IiwidG0iLCJtIiwiZCIsInR4IiwidHkiLCJub2RlQXJyYXlEaXJ0eSIsIl9pc0luUG9vbCIsImdsb2JhbFRyYW5zZm9ybU1hdHJpeCIsIm1vZHVsZSIsImV4cG9ydHMiLCJkcmFnb25Cb25lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7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QztBQUNoQ21CLFFBQUFBLFNBQVMsQ0FBQ0UsQ0FBRCxDQUFULEdBQWUsSUFBZjtBQUNBa0UsUUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0E7QUFDSDs7QUFDRCxVQUFJL0UsSUFBSSxHQUFHTCxRQUFRLEdBQUd3RSxTQUFTLENBQUNoRSxRQUFRLENBQUNHLFVBQVYsQ0FBWixHQUFvQ0gsUUFBUSxDQUFDRSxLQUFoRSxDQVI4QyxDQVM5Qzs7QUFDQSxVQUFJLENBQUNMLElBQUQsSUFBU0EsSUFBSSxDQUFDZ0YsU0FBbEIsRUFBNkI7QUFDekI3RSxRQUFBQSxRQUFRLENBQUM0QixnQkFBVCxDQUEwQixJQUExQjtBQUNBNUIsUUFBQUEsUUFBUSxDQUFDNkIsT0FBVDtBQUNBckIsUUFBQUEsU0FBUyxDQUFDRSxDQUFELENBQVQsR0FBZSxJQUFmO0FBQ0FrRSxRQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDQTtBQUNIOztBQUNEVCxNQUFBQSxZQUFZLENBQUNuRSxRQUFRLENBQUM2RCxZQUFWLEVBQXdCN0QsUUFBUSxDQUFDOEMsU0FBVCxDQUFtQmUsWUFBM0MsRUFBeURoRSxJQUFJLENBQUNpRixxQkFBOUQsQ0FBWjtBQUNBOUUsTUFBQUEsUUFBUSxDQUFDK0QsV0FBVCxJQUF3QixDQUFDNUcsY0FBekI7QUFDSDs7QUFDRCxRQUFJeUgsY0FBSixFQUFvQjtBQUNoQixXQUFLL0QsaUJBQUw7QUFDSDtBQUNKO0FBbGNxQixDQUFULENBQWpCO0FBcWNBa0UsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxXQUFXLENBQUMvRyxVQUFaLEdBQXlCQSxVQUExQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmltcG9ydCBNYXQ0IGZyb20gJy4uLy4uL2NvY29zMmQvY29yZS92YWx1ZS10eXBlcy9tYXQ0JztcclxuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uLy4uL2NvY29zMmQvY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xyXG5jb25zdCBGTEFHX1RSQU5TRk9STSA9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XHJcbmNvbnN0IEVtcHR5SGFuZGxlID0gZnVuY3Rpb24gKCkge31cclxuY29uc3QgQVRUQUNIRURfUk9PVF9OQU1FID0gJ0FUVEFDSEVEX05PREVfVFJFRSc7XHJcbmNvbnN0IEFUVEFDSEVEX1BSRV9OQU1FID0gJ0FUVEFDSEVEX05PREU6JztcclxuY29uc3QgbGltaXROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIC8vIGF0dGFjaGVkIG5vZGUncyB3b3JsZCBtYXRyaXggdXBkYXRlIHBlciBmcmFtZVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5vZGUsICdfd29ybGRNYXREaXJ0eScsIHtcclxuICAgICAgICBnZXQgKCkgeyByZXR1cm4gdHJ1ZTsgfSxcclxuICAgICAgICBzZXQgKHZhbHVlKSB7LyogZG8gbm90aGluZyAqL31cclxuICAgIH0pO1xyXG4gICAgLy8gc2hpZWxkIHdvcmxkIG1hdHJpeCBjYWxjdWxhdGUgaW50ZXJmYWNlXHJcbiAgICBub2RlLl9jYWxjdWxXb3JsZE1hdHJpeCA9IEVtcHR5SGFuZGxlO1xyXG4gICAgbm9kZS5fbXVsTWF0ID0gRW1wdHlIYW5kbGU7XHJcbn07XHJcbmxldCBfdGVtcE1hdDQgPSBuZXcgTWF0NCgpO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgZHJhZ29uQm9uZXNcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBBdHRhY2ggbm9kZSB0b29sXHJcbiAqICEjemgg5oyC54K55bel5YW357G7XHJcbiAqIEBjbGFzcyBkcmFnb25Cb25lcy5BdHRhY2hVdGlsXHJcbiAqL1xyXG5sZXQgQXR0YWNoVXRpbCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdkcmFnb25Cb25lcy5BdHRhY2hVdGlsJyxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVOb2RlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQgKGFybWF0dXJlRGlzcGxheSkge1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBhcm1hdHVyZURpc3BsYXkuX2FybWF0dXJlO1xyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlTm9kZSA9IGFybWF0dXJlRGlzcGxheS5ub2RlO1xyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IGFybWF0dXJlRGlzcGxheTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVzZXQgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9hcm1hdHVyZU5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wcmVwYXJlQXR0YWNoTm9kZSAoKSB7XHJcbiAgICAgICAgbGV0IGFybWF0dXJlID0gdGhpcy5fYXJtYXR1cmU7XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9hcm1hdHVyZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbmV3IGNjLk5vZGUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICAgICAgbGltaXROb2RlKHJvb3ROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVOb2RlLmFkZENoaWxkKHJvb3ROb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0NhY2hlZCA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5pc0FuaW1hdGlvbkNhY2hlZCgpO1xyXG4gICAgICAgIGlmIChpc0NhY2hlZCAmJiB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2ZyYW1lQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Ll9mcmFtZUNhY2hlLmVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gcm9vdE5vZGU7XHJcbiAgICAgICAgcmV0dXJuIHJvb3ROb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYnVpbGRCb25lQXR0YWNoZWROb2RlIChib25lLCBib25lSW5kZXgpIHtcclxuICAgICAgICBsZXQgYm9uZU5vZGVOYW1lID0gQVRUQUNIRURfUFJFX05BTUUgKyBib25lLm5hbWU7XHJcbiAgICAgICAgbGV0IGJvbmVOb2RlID0gbmV3IGNjLk5vZGUoYm9uZU5vZGVOYW1lKTtcclxuICAgICAgICB0aGlzLl9idWlsZEJvbmVSZWxhdGlvbihib25lTm9kZSwgYm9uZSwgYm9uZUluZGV4KTtcclxuICAgICAgICByZXR1cm4gYm9uZU5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9idWlsZEJvbmVSZWxhdGlvbiAoYm9uZU5vZGUsIGJvbmUsIGJvbmVJbmRleCkge1xyXG4gICAgICAgIGxpbWl0Tm9kZShib25lTm9kZSk7XHJcbiAgICAgICAgYm9uZU5vZGUuX2JvbmUgPSBib25lO1xyXG4gICAgICAgIGJvbmVOb2RlLl9ib25lSW5kZXggPSBib25lSW5kZXg7XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkucHVzaChib25lTm9kZSk7XHJcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlW2JvbmVJbmRleF0gPSBib25lTm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldHMgYXR0YWNoZWQgcm9vdCBub2RlLlxyXG4gICAgICogISN6aCDojrflj5bmjILmjqXoioLngrnmoJHnmoTmoLnoioLngrlcclxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNoZWRSb290Tm9kZVxyXG4gICAgICogQHJldHVybiB7Y2MuTm9kZX1cclxuICAgICAqL1xyXG4gICAgZ2V0QXR0YWNoZWRSb290Tm9kZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIGF0dGFjaGVkIG5vZGUgd2hpY2ggeW91IHdhbnQuXHJcbiAgICAgKiAhI3poIOiOt+W+l+WvueW6lOeahOaMgueCuVxyXG4gICAgICogQG1ldGhvZCBnZXRBdHRhY2hlZE5vZGVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9uZU5hbWVcclxuICAgICAqIEByZXR1cm4ge05vZGVbXX1cclxuICAgICAqL1xyXG4gICAgZ2V0QXR0YWNoZWROb2RlcyAoYm9uZU5hbWUpIHtcclxuICAgICAgICBsZXQgbm9kZUFycmF5ID0gdGhpcy5fYXR0YWNoZWROb2RlQXJyYXk7XHJcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm4gcmVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gbm9kZUFycmF5Lmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBub2RlQXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoYm9uZU5vZGUubmFtZSA9PT0gQVRUQUNIRURfUFJFX05BTUUgKyBib25lTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYm9uZU5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZWJ1aWxkTm9kZUFycmF5ICgpIHtcclxuICAgICAgICBsZXQgZmluZE1hcCA9IHRoaXMuX2JvbmVJbmRleFRvTm9kZSA9IHt9O1xyXG4gICAgICAgIGxldCBvbGROb2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBsZXQgbm9kZUFycmF5ID0gdGhpcy5fYXR0YWNoZWROb2RlQXJyYXkgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IG9sZE5vZGVBcnJheS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gb2xkTm9kZUFycmF5W2ldO1xyXG4gICAgICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkIHx8IGJvbmVOb2RlLl90b1JlbW92ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIG5vZGVBcnJheS5wdXNoKGJvbmVOb2RlKTtcclxuICAgICAgICAgICAgZmluZE1hcFtib25lTm9kZS5fYm9uZUluZGV4XSA9IGJvbmVOb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3NvcnROb2RlQXJyYXkgKCkge1xyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBub2RlQXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5fYm9uZUluZGV4IDwgYi5fYm9uZUluZGV4PyAtMSA6IDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXROb2RlQnlCb25lSW5kZXggKGJvbmVJbmRleCkge1xyXG4gICAgICAgIGxldCBmaW5kTWFwID0gdGhpcy5fYm9uZUluZGV4VG9Ob2RlO1xyXG4gICAgICAgIGxldCBib25lTm9kZSA9IGZpbmRNYXBbYm9uZUluZGV4XTtcclxuICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gYm9uZU5vZGU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXN0cm95IGF0dGFjaGVkIG5vZGUgd2hpY2ggeW91IHdhbnQuXHJcbiAgICAgKiAhI3poIOmUgOavgeWvueW6lOeahOaMgueCuVxyXG4gICAgICogQG1ldGhvZCBkZXN0cm95QXR0YWNoZWROb2Rlc1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJvbmVOYW1lXHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3lBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBsZXQgbWFya1RyZWUgPSBmdW5jdGlvbiAocm9vdE5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gcm9vdE5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYyA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGMpIG1hcmtUcmVlKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvb3ROb2RlLl90b1JlbW92ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IG5vZGVBcnJheS5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gbm9kZUFycmF5W2ldO1xyXG4gICAgICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkZWxOYW1lID0gYm9uZU5vZGUubmFtZS5zcGxpdChBVFRBQ0hFRF9QUkVfTkFNRSlbMV07XHJcbiAgICAgICAgICAgIGlmIChkZWxOYW1lID09PSBib25lTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgbWFya1RyZWUoYm9uZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGJvbmVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIG5vZGVBcnJheVtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3JlYnVpbGROb2RlQXJyYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSB0aGUgbWluaW11bSBub2RlIHRyZWUgY29udGFpbmluZyB0aGUgZ2l2ZW4gYm9uZSBuYW1lcywgTk9URSB0aGF0IG1ha2Ugc3VyZSB0aGUgc2tlbGV0b24gaGFzIGluaXRpYWxpemVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgaW50ZXJmYWNlLlxyXG4gICAgICogISN6aCDpgY3ljobmiYDmnInmj5Lmp73vvIznlJ/miJDljIXlkKvmiYDmnInnu5nlrprmj5Lmp73lkI3np7DnmoTmnIDlsI/oioLngrnmoJHvvIzms6jmhI/vvIzosIPnlKjor6XmjqXlj6PliY3or7fnoa7kv53pqqjpqrzliqjnlLvlt7Lnu4/liJ3lp4vljJblpb3jgIJcclxuICAgICAqIEBtZXRob2QgZ2VuZXJhdGVBdHRhY2hlZE5vZGVzXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYm9uZU5hbWVcclxuICAgICAqIEByZXR1cm4ge05vZGVbXX0gYXR0YWNoZWQgbm9kZSBhcnJheSBcclxuICAgICAqL1xyXG4gICAgZ2VuZXJhdGVBdHRhY2hlZE5vZGVzIChib25lTmFtZSkge1xyXG4gICAgICAgIGxldCB0YXJnZXROb2RlcyA9IFtdO1xyXG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSByZXR1cm4gdGFyZ2V0Tm9kZXM7XHJcblxyXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuX3ByZXBhcmVBdHRhY2hOb2RlKCk7XHJcbiAgICAgICAgaWYgKCFyb290Tm9kZSkgcmV0dXJuIHRhcmdldE5vZGVzO1xyXG5cclxuICAgICAgICBsZXQgYm9uZUluZGV4ID0gMDtcclxuICAgICAgICBsZXQgcmVzID0gW107XHJcbiAgICAgICAgbGV0IGF0dGFjaGVkVHJhdmVyc2UgPSBmdW5jdGlvbiAoYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJvbmVzID0gYXJtYXR1cmUuZ2V0Qm9uZXMoKSwgYm9uZTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCwgbCA9IGJvbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYm9uZSA9IGJvbmVzW2ldO1xyXG4gICAgICAgICAgICAgICAgYm9uZS5fYm9uZUluZGV4ID0gYm9uZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9uZU5hbWUgPT09IGJvbmUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGJvbmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc2xvdHMgPSBhcm1hdHVyZS5nZXRTbG90cygpLCBzbG90O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNsb3RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc2xvdCA9IHNsb3RzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3QuY2hpbGRBcm1hdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVHJhdmVyc2Uoc2xvdC5jaGlsZEFybWF0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICBhdHRhY2hlZFRyYXZlcnNlKHRoaXMuX2FybWF0dXJlKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1aWxkQm9uZVRyZWUgPSBmdW5jdGlvbiAoYm9uZSkge1xyXG4gICAgICAgICAgICBpZiAoIWJvbmUpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGJvbmVOb2RlID0gdGhpcy5fZ2V0Tm9kZUJ5Qm9uZUluZGV4KGJvbmUuX2JvbmVJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChib25lTm9kZSkgcmV0dXJuIGJvbmVOb2RlO1xyXG5cclxuICAgICAgICAgICAgYm9uZU5vZGUgPSB0aGlzLl9idWlsZEJvbmVBdHRhY2hlZE5vZGUoYm9uZSwgYm9uZS5fYm9uZUluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdWJBcm1hdHVyZVBhcmVudEJvbmUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoYm9uZS5hcm1hdHVyZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRTbG90ID0gYm9uZS5hcm1hdHVyZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBzdWJBcm1hdHVyZVBhcmVudEJvbmUgPSBwYXJlbnRTbG90LnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHBhcmVudEJvbmVOb2RlID0gYnVpbGRCb25lVHJlZShib25lLnBhcmVudCB8fCBzdWJBcm1hdHVyZVBhcmVudEJvbmUpIHx8IHJvb3ROb2RlO1xyXG4gICAgICAgICAgICBib25lTm9kZS5wYXJlbnQgPSBwYXJlbnRCb25lTm9kZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChib25lLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuX3Jvb3ROb2RlID0gcGFyZW50Qm9uZU5vZGUuX3Jvb3ROb2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuX3Jvb3ROb2RlID0gcGFyZW50Qm9uZU5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBib25lTm9kZTtcclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gcmVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9IGJ1aWxkQm9uZVRyZWUocmVzW2ldKTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldE5vZGVzLnB1c2godGFyZ2V0Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NvcnROb2RlQXJyYXkoKTtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0Tm9kZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEZXN0cm95IGFsbCBhdHRhY2hlZCBub2RlLlxyXG4gICAgICogISN6aCDplIDmr4HmiYDmnInmjILngrlcclxuICAgICAqIEBtZXRob2QgZGVzdHJveUFsbEF0dGFjaGVkTm9kZXNcclxuICAgICAqL1xyXG4gICAgZGVzdHJveUFsbEF0dGFjaGVkTm9kZXMgKCkge1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkUm9vdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2F0dGFjaGVkTm9kZUFycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm9uZUluZGV4VG9Ob2RlID0ge307XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHJvb3ROb2RlID0gdGhpcy5fYXJtYXR1cmVOb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1JPT1RfTkFNRSk7XHJcbiAgICAgICAgaWYgKHJvb3ROb2RlKSB7XHJcbiAgICAgICAgICAgIHJvb3ROb2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJvb3ROb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgcm9vdE5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRyYXZlcnNlIGFsbCBib25lcyB0byBnZW5lcmF0ZSBhIHRyZWUgY29udGFpbmluZyBhbGwgYm9uZXMgbm9kZXMsIE5PVEUgdGhhdCBtYWtlIHN1cmUgdGhlIHNrZWxldG9uIGhhcyBpbml0aWFsaXplZCBiZWZvcmUgY2FsbGluZyB0aGlzIGludGVyZmFjZS5cclxuICAgICAqICEjemgg6YGN5Y6G5omA5pyJ5o+S5qe977yM55Sf5oiQ5YyF5ZCr5omA5pyJ5o+S5qe955qE6IqC54K55qCR77yM5rOo5oSP77yM6LCD55So6K+l5o6l5Y+j5YmN6K+356Gu5L+d6aqo6aq85Yqo55S75bey57uP5Yid5aeL5YyW5aW944CCXHJcbiAgICAgKiBAbWV0aG9kIGdlbmVyYXRlQWxsQXR0YWNoZWROb2Rlc1xyXG4gICAgICogQHJldHVybiB7Y2MuTm9kZX0gcm9vdCBub2RlXHJcbiAgICAgKi9cclxuICAgIGdlbmVyYXRlQWxsQXR0YWNoZWROb2RlcyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gY2xlYXIgYWxsIHJlY29yZHNcclxuICAgICAgICB0aGlzLl9ib25lSW5kZXhUb05vZGUgPSB7fTtcclxuICAgICAgICB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheS5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9wcmVwYXJlQXR0YWNoTm9kZSgpO1xyXG4gICAgICAgIGlmICghcm9vdE5vZGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGJvbmVJbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IGF0dGFjaGVkVHJhdmVyc2UgPSBmdW5jdGlvbiAoYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1YkFybWF0dXJlUGFyZW50Tm9kZSA9IHJvb3ROb2RlO1xyXG4gICAgICAgICAgICBpZiAoYXJtYXR1cmUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50U2xvdCA9IGFybWF0dXJlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRCb25lID0gcGFyZW50U2xvdC5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBzdWJBcm1hdHVyZVBhcmVudE5vZGUgPSBwYXJlbnRCb25lLl9hdHRhY2hlZE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBib25lcyA9IGFybWF0dXJlLmdldEJvbmVzKCksIGJvbmU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBib25lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJCb25lSW5kZXggPSBib25lSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGJvbmUgPSBib25lc1tpXTtcclxuICAgICAgICAgICAgICAgIGJvbmUuX2F0dGFjaGVkTm9kZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvbmUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGJvbmUucGFyZW50Ll9hdHRhY2hlZE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBzdWJBcm1hdHVyZVBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1BSRV9OQU1FICsgYm9uZS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJvbmVOb2RlIHx8ICFib25lTm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbmVOb2RlID0gdGhpcy5fYnVpbGRCb25lQXR0YWNoZWROb2RlKGJvbmUsIGN1ckJvbmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuYWRkQ2hpbGQoYm9uZU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkQm9uZVJlbGF0aW9uKGJvbmVOb2RlLCBib25lLCBjdXJCb25lSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBib25lTm9kZS5fcm9vdE5vZGUgPSBzdWJBcm1hdHVyZVBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9uZS5fYXR0YWNoZWROb2RlID0gYm9uZU5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzbG90cyA9IGFybWF0dXJlLmdldFNsb3RzKCksIHNsb3Q7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc2xvdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzbG90ID0gc2xvdHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC5jaGlsZEFybWF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRUcmF2ZXJzZShzbG90LmNoaWxkQXJtYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGF0dGFjaGVkVHJhdmVyc2UodGhpcy5fYXJtYXR1cmUpO1xyXG4gICAgICAgIHJldHVybiByb290Tm9kZTtcclxuICAgIH0sXHJcblxyXG4gICAgX2hhc0F0dGFjaGVkTm9kZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGF0dGFjaGVkUm9vdE5vZGUgPSB0aGlzLl9hcm1hdHVyZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICByZXR1cm4gISFhdHRhY2hlZFJvb3ROb2RlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYXNzb2NpYXRlQXR0YWNoZWROb2RlICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLl9hcm1hdHVyZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoQVRUQUNIRURfUk9PVF9OQU1FKTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fYXR0YWNoZWRSb290Tm9kZSA9IHJvb3ROb2RlO1xyXG5cclxuICAgICAgICAvLyBjbGVhciBhbGwgcmVjb3Jkc1xyXG4gICAgICAgIHRoaXMuX2JvbmVJbmRleFRvTm9kZSA9IHt9O1xyXG4gICAgICAgIGxldCBub2RlQXJyYXkgPSB0aGlzLl9hdHRhY2hlZE5vZGVBcnJheTtcclxuICAgICAgICBub2RlQXJyYXkubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgbGV0IGFybWF0dXJlID0gdGhpcy5fYXJtYXR1cmU7XHJcbiAgICAgICAgaWYgKCFhcm1hdHVyZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsaW1pdE5vZGUocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICBpZiAoIUNDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0NhY2hlZCA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5pc0FuaW1hdGlvbkNhY2hlZCgpO1xyXG4gICAgICAgICAgICBpZiAoaXNDYWNoZWQgJiYgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Ll9mcmFtZUNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJvbmVJbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IGF0dGFjaGVkVHJhdmVyc2UgPSBmdW5jdGlvbiAoYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgaWYgKCFhcm1hdHVyZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN1YkFybWF0dXJlUGFyZW50Tm9kZSA9IHJvb3ROb2RlO1xyXG4gICAgICAgICAgICBpZiAoYXJtYXR1cmUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50U2xvdCA9IGFybWF0dXJlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJlbnRCb25lID0gcGFyZW50U2xvdC5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBzdWJBcm1hdHVyZVBhcmVudE5vZGUgPSBwYXJlbnRCb25lLl9hdHRhY2hlZE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBib25lcyA9IGFybWF0dXJlLmdldEJvbmVzKCksIGJvbmU7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAsIGwgPSBib25lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJCb25lSW5kZXggPSBib25lSW5kZXgrKztcclxuICAgICAgICAgICAgICAgIGJvbmUgPSBib25lc1tpXTtcclxuICAgICAgICAgICAgICAgIGJvbmUuX2F0dGFjaGVkTm9kZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvbmUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGJvbmUucGFyZW50Ll9hdHRhY2hlZE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBzdWJBcm1hdHVyZVBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9uZU5vZGUgPSBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKEFUVEFDSEVEX1BSRV9OQU1FICsgYm9uZS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9uZU5vZGUgJiYgYm9uZU5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWlsZEJvbmVSZWxhdGlvbihib25lTm9kZSwgYm9uZSwgY3VyQm9uZUluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9uZU5vZGUuX3Jvb3ROb2RlID0gc3ViQXJtYXR1cmVQYXJlbnROb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLl9hdHRhY2hlZE5vZGUgPSBib25lTm9kZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBzbG90cyA9IGFybWF0dXJlLmdldFNsb3RzKCksIHNsb3Q7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc2xvdHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzbG90ID0gc2xvdHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC5jaGlsZEFybWF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRUcmF2ZXJzZShzbG90LmNoaWxkQXJtYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGF0dGFjaGVkVHJhdmVyc2UoYXJtYXR1cmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3luY0F0dGFjaGVkTm9kZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHJvb3ROb2RlID0gdGhpcy5fYXR0YWNoZWRSb290Tm9kZTtcclxuICAgICAgICBsZXQgbm9kZUFycmF5ID0gdGhpcy5fYXR0YWNoZWROb2RlQXJyYXk7XHJcbiAgICAgICAgaWYgKCFyb290Tm9kZSB8fCAhcm9vdE5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hlZFJvb3ROb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZUFycmF5Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJvb3RNYXRyaXggPSB0aGlzLl9hcm1hdHVyZU5vZGUuX3dvcmxkTWF0cml4O1xyXG4gICAgICAgIE1hdDQuY29weShyb290Tm9kZS5fd29ybGRNYXRyaXgsIHJvb3RNYXRyaXgpO1xyXG4gICAgICAgIHJvb3ROb2RlLl9yZW5kZXJGbGFnICY9IH5GTEFHX1RSQU5TRk9STTtcclxuXHJcbiAgICAgICAgbGV0IGJvbmVJbmZvcyA9IG51bGw7XHJcbiAgICAgICAgbGV0IGlzQ2FjaGVkID0gdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmlzQW5pbWF0aW9uQ2FjaGVkKCk7XHJcbiAgICAgICAgaWYgKGlzQ2FjaGVkKSB7XHJcbiAgICAgICAgICAgIGJvbmVJbmZvcyA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5fY3VyRnJhbWUgJiYgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Ll9jdXJGcmFtZS5ib25lSW5mb3M7XHJcbiAgICAgICAgICAgIGlmICghYm9uZUluZm9zKSByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbXVsTWF0ID0gdGhpcy5fYXJtYXR1cmVOb2RlLl9tdWxNYXQ7XHJcbiAgICAgICAgbGV0IG1hdHJpeEhhbmRsZSA9IGZ1bmN0aW9uIChub2RlTWF0LCBwYXJlbnRNYXQsIGJvbmVNYXQpIHtcclxuICAgICAgICAgICAgbGV0IHRtID0gX3RlbXBNYXQ0Lm07XHJcbiAgICAgICAgICAgIHRtWzBdID0gYm9uZU1hdC5hO1xyXG4gICAgICAgICAgICB0bVsxXSA9IGJvbmVNYXQuYjtcclxuICAgICAgICAgICAgdG1bNF0gPSAtYm9uZU1hdC5jO1xyXG4gICAgICAgICAgICB0bVs1XSA9IC1ib25lTWF0LmQ7XHJcbiAgICAgICAgICAgIHRtWzEyXSA9IGJvbmVNYXQudHg7XHJcbiAgICAgICAgICAgIHRtWzEzXSA9IGJvbmVNYXQudHk7XHJcbiAgICAgICAgICAgIG11bE1hdChub2RlTWF0LCBwYXJlbnRNYXQsIF90ZW1wTWF0NCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IG5vZGVBcnJheURpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBub2RlQXJyYXkubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib25lTm9kZSA9IG5vZGVBcnJheVtpXTtcclxuICAgICAgICAgICAgLy8gTm9kZSBoYXMgYmVlbiBkZXN0cm95XHJcbiAgICAgICAgICAgIGlmICghYm9uZU5vZGUgfHwgIWJvbmVOb2RlLmlzVmFsaWQpIHsgXHJcbiAgICAgICAgICAgICAgICBub2RlQXJyYXlbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbm9kZUFycmF5RGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGJvbmUgPSBpc0NhY2hlZCA/IGJvbmVJbmZvc1tib25lTm9kZS5fYm9uZUluZGV4XSA6IGJvbmVOb2RlLl9ib25lO1xyXG4gICAgICAgICAgICAvLyBCb25lIGhhcyBiZWVuIGRlc3Ryb3lcclxuICAgICAgICAgICAgaWYgKCFib25lIHx8IGJvbmUuX2lzSW5Qb29sKSB7XHJcbiAgICAgICAgICAgICAgICBib25lTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYm9uZU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZUFycmF5W2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIG5vZGVBcnJheURpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1hdHJpeEhhbmRsZShib25lTm9kZS5fd29ybGRNYXRyaXgsIGJvbmVOb2RlLl9yb290Tm9kZS5fd29ybGRNYXRyaXgsIGJvbmUuZ2xvYmFsVHJhbnNmb3JtTWF0cml4KTtcclxuICAgICAgICAgICAgYm9uZU5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfVFJBTlNGT1JNO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZUFycmF5RGlydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVidWlsZE5vZGVBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkcmFnb25Cb25lcy5BdHRhY2hVdGlsID0gQXR0YWNoVXRpbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==