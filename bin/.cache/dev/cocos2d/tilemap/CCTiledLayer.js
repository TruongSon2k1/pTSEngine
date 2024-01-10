
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledLayer.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _valueTypes = require("../core/value-types");

var _materialVariant = _interopRequireDefault(require("../core/assets/material/material-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var RenderComponent = require('../core/components/CCRenderComponent');

var Material = require('../core/assets/material/CCMaterial');

var RenderFlow = require('../core/renderer/render-flow');

var _mat4_temp = cc.mat4();

var _vec2_temp = cc.v2();

var _vec2_temp2 = cc.v2();

var _vec2_temp3 = cc.v2();

var _tempRowCol = {
  row: 0,
  col: 0
};
var TiledUserNodeData = cc.Class({
  name: 'cc.TiledUserNodeData',
  "extends": cc.Component,
  ctor: function ctor() {
    this._index = -1;
    this._row = -1;
    this._col = -1;
    this._tiledLayer = null;
  }
});
/**
 * !#en Render the TMX layer.
 * !#zh 渲染 TMX layer。
 * @class TiledLayer
 * @extends Component
 */

var TiledLayer = cc.Class({
  name: 'cc.TiledLayer',
  // Inherits from the abstract class directly,
  // because TiledLayer not create or maintains the sgNode by itself.
  "extends": RenderComponent,
  editor: {
    inspector: 'packages://inspector/inspectors/comps/tiled-layer.js'
  },
  ctor: function ctor() {
    this._userNodeGrid = {}; // [row][col] = {count: 0, nodesList: []};

    this._userNodeMap = {}; // [id] = node;

    this._userNodeDirty = false; // store the layer tiles node, index is caculated by 'x + width * y', format likes '[0]=tileNode0,[1]=tileNode1, ...'

    this._tiledTiles = []; // store the layer tilesets index array

    this._tilesetIndexArr = []; // tileset index to array index

    this._tilesetIndexToArrIndex = {}; // texture id to material index

    this._texIdToMatIndex = {};
    this._viewPort = {
      x: -1,
      y: -1,
      width: -1,
      height: -1
    };
    this._cullingRect = {
      leftDown: {
        row: -1,
        col: -1
      },
      rightTop: {
        row: -1,
        col: -1
      }
    };
    this._cullingDirty = true;
    this._rightTop = {
      row: -1,
      col: -1
    };
    this._layerInfo = null;
    this._mapInfo = null; // record max or min tile texture offset, 
    // it will make culling rect more large, which insure culling rect correct.

    this._topOffset = 0;
    this._downOffset = 0;
    this._leftOffset = 0;
    this._rightOffset = 0; // store the layer tiles, index is caculated by 'x + width * y', format likes '[0]=gid0,[1]=gid1, ...'

    this._tiles = []; // vertex array

    this._vertices = []; // vertices dirty

    this._verticesDirty = true;
    this._layerName = '';
    this._layerOrientation = null; // store all layer gid corresponding texture info, index is gid, format likes '[gid0]=tex-info,[gid1]=tex-info, ...'

    this._texGrids = null; // store all tileset texture, index is tileset index, format likes '[0]=texture0, [1]=texture1, ...'

    this._textures = null;
    this._tilesets = null;
    this._leftDownToCenterX = 0;
    this._leftDownToCenterY = 0;
    this._hasTiledNodeGrid = false;
    this._hasAniGrid = false;
    this._animations = null; // switch of culling

    this._enableCulling = cc.macro.ENABLE_TILEDMAP_CULLING;
  },
  _hasTiledNode: function _hasTiledNode() {
    return this._hasTiledNodeGrid;
  },
  _hasAnimation: function _hasAnimation() {
    return this._hasAniGrid;
  },

  /**
   * !#en enable or disable culling
   * !#zh 开启或关闭裁剪。
   * @method enableCulling
   * @param value
   */
  enableCulling: function enableCulling(value) {
    if (this._enableCulling != value) {
      this._enableCulling = value;
      this._cullingDirty = true;
    }
  },

  /**
   * !#en Adds user's node into layer.
   * !#zh 添加用户节点。
   * @method addUserNode
   * @param {cc.Node} node
   * @return {Boolean}
   */
  addUserNode: function addUserNode(node) {
    var dataComp = node.getComponent(TiledUserNodeData);

    if (dataComp) {
      cc.warn("CCTiledLayer:addUserNode node has been added");
      return false;
    }

    dataComp = node.addComponent(TiledUserNodeData);
    node.parent = this.node;
    node._renderFlag |= RenderFlow.FLAG_BREAK_FLOW;
    this._userNodeMap[node._id] = dataComp;
    dataComp._row = -1;
    dataComp._col = -1;
    dataComp._tiledLayer = this;

    this._nodeLocalPosToLayerPos(node, _vec2_temp);

    this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

    this._addUserNodeToGrid(dataComp, _tempRowCol);

    this._updateCullingOffsetByUserNode(node);

    node.on(cc.Node.EventType.POSITION_CHANGED, this._userNodePosChange, dataComp);
    node.on(cc.Node.EventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);
    return true;
  },

  /**
   * !#en Removes user's node.
   * !#zh 移除用户节点。
   * @method removeUserNode
   * @param {cc.Node} node
   * @return {Boolean}
   */
  removeUserNode: function removeUserNode(node) {
    var dataComp = node.getComponent(TiledUserNodeData);

    if (!dataComp) {
      cc.warn("CCTiledLayer:removeUserNode node is not exist");
      return false;
    }

    node.off(cc.Node.EventType.POSITION_CHANGED, this._userNodePosChange, dataComp);
    node.off(cc.Node.EventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);

    this._removeUserNodeFromGrid(dataComp);

    delete this._userNodeMap[node._id];

    node._removeComponent(dataComp);

    dataComp.destroy();
    node.removeFromParent(true);
    node._renderFlag &= ~RenderFlow.FLAG_BREAK_FLOW;
    return true;
  },

  /**
   * !#en Destroy user's node.
   * !#zh 销毁用户节点。
   * @method destroyUserNode
   * @param {cc.Node} node
   */
  destroyUserNode: function destroyUserNode(node) {
    this.removeUserNode(node);
    node.destroy();
  },
  // acording layer anchor point to calculate node layer pos
  _nodeLocalPosToLayerPos: function _nodeLocalPosToLayerPos(nodePos, out) {
    out.x = nodePos.x + this._leftDownToCenterX;
    out.y = nodePos.y + this._leftDownToCenterY;
  },
  _getNodesByRowCol: function _getNodesByRowCol(row, col) {
    var rowData = this._userNodeGrid[row];
    if (!rowData) return null;
    return rowData[col];
  },
  _getNodesCountByRow: function _getNodesCountByRow(row) {
    var rowData = this._userNodeGrid[row];
    if (!rowData) return 0;
    return rowData.count;
  },
  _updateAllUserNode: function _updateAllUserNode() {
    this._userNodeGrid = {};

    for (var dataId in this._userNodeMap) {
      var dataComp = this._userNodeMap[dataId];

      this._nodeLocalPosToLayerPos(dataComp.node, _vec2_temp);

      this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

      this._addUserNodeToGrid(dataComp, _tempRowCol);

      this._updateCullingOffsetByUserNode(dataComp.node);
    }
  },
  _updateCullingOffsetByUserNode: function _updateCullingOffsetByUserNode(node) {
    if (this._topOffset < node.height) {
      this._topOffset = node.height;
    }

    if (this._downOffset < node.height) {
      this._downOffset = node.height;
    }

    if (this._leftOffset < node.width) {
      this._leftOffset = node.width;
    }

    if (this._rightOffset < node.width) {
      this._rightOffset = node.width;
    }
  },
  _userNodeSizeChange: function _userNodeSizeChange() {
    var dataComp = this;
    var node = dataComp.node;
    var self = dataComp._tiledLayer;

    self._updateCullingOffsetByUserNode(node);
  },
  _userNodePosChange: function _userNodePosChange() {
    var dataComp = this;
    var node = dataComp.node;
    var self = dataComp._tiledLayer;

    self._nodeLocalPosToLayerPos(node, _vec2_temp);

    self._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

    self._limitInLayer(_tempRowCol); // users pos not change


    if (_tempRowCol.row === dataComp._row && _tempRowCol.col === dataComp._col) return;

    self._removeUserNodeFromGrid(dataComp);

    self._addUserNodeToGrid(dataComp, _tempRowCol);
  },
  _removeUserNodeFromGrid: function _removeUserNodeFromGrid(dataComp) {
    var row = dataComp._row;
    var col = dataComp._col;
    var index = dataComp._index;
    var rowData = this._userNodeGrid[row];
    var colData = rowData && rowData[col];

    if (colData) {
      rowData.count--;
      colData.count--;
      colData.list[index] = null;

      if (colData.count <= 0) {
        colData.list.length = 0;
        colData.count = 0;
      }
    }

    dataComp._row = -1;
    dataComp._col = -1;
    dataComp._index = -1;
    this._userNodeDirty = true;
  },
  _limitInLayer: function _limitInLayer(rowCol) {
    var row = rowCol.row;
    var col = rowCol.col;
    if (row < 0) rowCol.row = 0;
    if (row > this._rightTop.row) rowCol.row = this._rightTop.row;
    if (col < 0) rowCol.col = 0;
    if (col > this._rightTop.col) rowCol.col = this._rightTop.col;
  },
  _addUserNodeToGrid: function _addUserNodeToGrid(dataComp, tempRowCol) {
    var row = tempRowCol.row;
    var col = tempRowCol.col;
    var rowData = this._userNodeGrid[row] = this._userNodeGrid[row] || {
      count: 0
    };
    var colData = rowData[col] = rowData[col] || {
      count: 0,
      list: []
    };
    dataComp._row = row;
    dataComp._col = col;
    dataComp._index = colData.list.length;
    rowData.count++;
    colData.count++;
    colData.list.push(dataComp);
    this._userNodeDirty = true;
  },
  _isUserNodeDirty: function _isUserNodeDirty() {
    return this._userNodeDirty;
  },
  _setUserNodeDirty: function _setUserNodeDirty(value) {
    this._userNodeDirty = value;
  },
  onEnable: function onEnable() {
    this._super();

    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);

    this._activateMaterial();
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  _syncAnchorPoint: function _syncAnchorPoint() {
    var node = this.node;
    this._leftDownToCenterX = node.width * node.anchorX * node.scaleX;
    this._leftDownToCenterY = node.height * node.anchorY * node.scaleY;
    this._cullingDirty = true;
  },
  onDestroy: function onDestroy() {
    this._super();

    if (this._buffer) {
      this._buffer.destroy();

      this._buffer = null;
    }

    this._renderDataList = null;
  },

  /**
   * !#en Gets the layer name.
   * !#zh 获取层的名称。
   * @method getLayerName
   * @return {String}
   * @example
   * let layerName = tiledLayer.getLayerName();
   * cc.log(layerName);
   */
  getLayerName: function getLayerName() {
    return this._layerName;
  },

  /**
   * !#en Set the layer name.
   * !#zh 设置层的名称
   * @method SetLayerName
   * @param {String} layerName
   * @example
   * tiledLayer.setLayerName("New Layer");
   */
  setLayerName: function setLayerName(layerName) {
    this._layerName = layerName;
  },

  /**
   * !#en Return the value for the specific property name.
   * !#zh 获取指定属性名的值。
   * @method getProperty
   * @param {String} propertyName
   * @return {*}
   * @example
   * let property = tiledLayer.getProperty("info");
   * cc.log(property);
   */
  getProperty: function getProperty(propertyName) {
    return this._properties[propertyName];
  },

  /**
   * !#en Returns the position in pixels of a given tile coordinate.
   * !#zh 获取指定 tile 的像素坐标。
   * @method getPositionAt
   * @param {Vec2|Number} pos position or x
   * @param {Number} [y]
   * @return {Vec2}
   * @example
   * let pos = tiledLayer.getPositionAt(cc.v2(0, 0));
   * cc.log("Pos: " + pos);
   * let pos = tiledLayer.getPositionAt(0, 0);
   * cc.log("Pos: " + pos);
   */
  getPositionAt: function getPositionAt(pos, y) {
    var x;

    if (y !== undefined) {
      x = Math.floor(pos);
      y = Math.floor(y);
    } else {
      x = Math.floor(pos.x);
      y = Math.floor(pos.y);
    }

    var ret;

    switch (this._layerOrientation) {
      case cc.TiledMap.Orientation.ORTHO:
        ret = this._positionForOrthoAt(x, y);
        break;

      case cc.TiledMap.Orientation.ISO:
        ret = this._positionForIsoAt(x, y);
        break;

      case cc.TiledMap.Orientation.HEX:
        ret = this._positionForHexAt(x, y);
        break;
    }

    return ret;
  },
  _isInvalidPosition: function _isInvalidPosition(x, y) {
    if (x && typeof x === 'object') {
      var pos = x;
      y = pos.y;
      x = pos.x;
    }

    return x >= this._layerSize.width || y >= this._layerSize.height || x < 0 || y < 0;
  },
  _positionForIsoAt: function _positionForIsoAt(x, y) {
    var offsetX = 0,
        offsetY = 0;

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var gidAndFlags = this._tiles[index];

    if (gidAndFlags) {
      var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
      var tileset = this._texGrids[gid].tileset;
      var offset = tileset.tileOffset;
      offsetX = offset.x;
      offsetY = offset.y;
    }

    return cc.v2(this._mapTileSize.width * 0.5 * (this._layerSize.height + x - y - 1) + offsetX, this._mapTileSize.height * 0.5 * (this._layerSize.width - x + this._layerSize.height - y - 2) - offsetY);
  },
  _positionForOrthoAt: function _positionForOrthoAt(x, y) {
    var offsetX = 0,
        offsetY = 0;

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var gidAndFlags = this._tiles[index];

    if (gidAndFlags) {
      var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
      var tileset = this._texGrids[gid].tileset;
      var offset = tileset.tileOffset;
      offsetX = offset.x;
      offsetY = offset.y;
    }

    return cc.v2(x * this._mapTileSize.width + offsetX, (this._layerSize.height - y - 1) * this._mapTileSize.height - offsetY);
  },
  _positionForHexAt: function _positionForHexAt(col, row) {
    var tileWidth = this._mapTileSize.width;
    var tileHeight = this._mapTileSize.height;
    var rows = this._layerSize.height;

    var index = Math.floor(col) + Math.floor(row) * this._layerSize.width;

    var gid = this._tiles[index];
    var offset;

    if (this._texGrids[gid]) {
      offset = this._texGrids[gid].tileset.tileOffset;
    } else {
      offset = {
        x: 0,
        y: 0
      };
    }

    var odd_even = this._staggerIndex === cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;
    var x = 0,
        y = 0;
    var diffX = 0;
    var diffY = 0;

    switch (this._staggerAxis) {
      case cc.TiledMap.StaggerAxis.STAGGERAXIS_Y:
        diffX = 0;

        if (row % 2 === 1) {
          diffX = tileWidth / 2 * odd_even;
        }

        x = col * tileWidth + diffX + offset.x;
        y = (rows - row - 1) * (tileHeight - (tileHeight - this._hexSideLength) / 2) - offset.y;
        break;

      case cc.TiledMap.StaggerAxis.STAGGERAXIS_X:
        diffY = 0;

        if (col % 2 === 1) {
          diffY = tileHeight / 2 * -odd_even;
        }

        x = col * (tileWidth - (tileWidth - this._hexSideLength) / 2) + offset.x;
        y = (rows - row - 1) * tileHeight + diffY - offset.y;
        break;
    }

    return cc.v2(x, y);
  },

  /**
   * !#en
   * Sets the tiles gid (gid = tile global id) at a given tiles rect.
   * !#zh
   * 设置给定区域的 tile 的 gid (gid = tile 全局 id)，
   * @method setTilesGIDAt
   * @param {Array} gids an array contains gid
   * @param {Number} beginCol begin col number
   * @param {Number} beginRow begin row number
   * @param {Number} totalCols count of column
   * @example
   * tiledLayer.setTilesGIDAt([1, 1, 1, 1], 10, 10, 2)
   */
  setTilesGIDAt: function setTilesGIDAt(gids, beginCol, beginRow, totalCols) {
    if (!gids || gids.length === 0 || totalCols <= 0) return;
    if (beginRow < 0) beginRow = 0;
    if (beginCol < 0) beginCol = 0;
    var gidsIdx = 0;
    var endCol = beginCol + totalCols;

    for (var row = beginRow;; row++) {
      for (var col = beginCol; col < endCol; col++) {
        if (gidsIdx >= gids.length) return;

        this._updateTileForGID(gids[gidsIdx], col, row);

        gidsIdx++;
      }
    }
  },

  /**
   * !#en
   * Sets the tile gid (gid = tile global id) at a given tile coordinate.<br />
   * The Tile GID can be obtained by using the method "tileGIDAt" or by using the TMX editor . Tileset Mgr +1.<br />
   * If a tile is already placed at that position, then it will be removed.
   * !#zh
   * 设置给定坐标的 tile 的 gid (gid = tile 全局 id)，
   * tile 的 GID 可以使用方法 “tileGIDAt” 来获得。<br />
   * 如果一个 tile 已经放在那个位置，那么它将被删除。
   * @method setTileGIDAt
   * @param {Number} gid
   * @param {Vec2|Number} posOrX position or x
   * @param {Number} flagsOrY flags or y
   * @param {Number} [flags]
   * @example
   * tiledLayer.setTileGIDAt(1001, 10, 10, 1)
   */
  setTileGIDAt: function setTileGIDAt(gid, posOrX, flagsOrY, flags) {
    if (posOrX === undefined) {
      throw new Error("cc.TiledLayer.setTileGIDAt(): pos should be non-null");
    }

    var pos;

    if (flags !== undefined || !(posOrX instanceof cc.Vec2)) {
      // four parameters or posOrX is not a Vec2 object
      _vec2_temp3.x = posOrX;
      _vec2_temp3.y = flagsOrY;
      pos = _vec2_temp3;
    } else {
      pos = posOrX;
      flags = flagsOrY;
    }

    var ugid = gid & cc.TiledMap.TileFlag.FLIPPED_MASK;
    pos.x = Math.floor(pos.x);
    pos.y = Math.floor(pos.y);

    if (this._isInvalidPosition(pos)) {
      throw new Error("cc.TiledLayer.setTileGIDAt(): invalid position");
    }

    if (!this._tiles || !this._tilesets || this._tilesets.length == 0) {
      cc.logID(7238);
      return;
    }

    if (ugid !== 0 && ugid < this._tilesets[0].firstGid) {
      cc.logID(7239, gid);
      return;
    }

    flags = flags || 0;

    this._updateTileForGID((gid | flags) >>> 0, pos.x, pos.y);
  },
  _updateTileForGID: function _updateTileForGID(gidAndFlags, x, y) {
    var idx = 0 | x + y * this._layerSize.width;
    if (idx >= this._tiles.length) return;
    var oldGIDAndFlags = this._tiles[idx];
    if (gidAndFlags === oldGIDAndFlags) return;
    var gid = (gidAndFlags & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
    var grid = this._texGrids[gid];
    var tilesetIdx = grid && grid.texId;

    if (grid) {
      this._tiles[idx] = gidAndFlags;

      this._updateVertex(x, y);

      this._buildMaterial(tilesetIdx);
    } else {
      this._tiles[idx] = 0;
    }

    this._cullingDirty = true;
  },

  /**
   * !#en
   * Returns the tiles data.An array fill with GIDs. <br />
   * !#zh
   * 返回 tiles 数据. 由GID构成的一个数组. <br />
   * @method getTiles
   * @return {Number[]}
   */
  getTiles: function getTiles() {
    return this._tiles;
  },

  /**
   * !#en
   * Returns the tile gid at a given tile coordinate. <br />
   * if it returns 0, it means that the tile is empty. <br />
   * !#zh
   * 通过给定的 tile 坐标、flags（可选）返回 tile 的 GID. <br />
   * 如果它返回 0，则表示该 tile 为空。<br />
   * @method getTileGIDAt
   * @param {Vec2|Number} pos or x
   * @param {Number} [y]
   * @return {Number}
   * @example
   * let tileGid = tiledLayer.getTileGIDAt(0, 0);
   */
  getTileGIDAt: function getTileGIDAt(pos, y) {
    if (pos === undefined) {
      throw new Error("cc.TiledLayer.getTileGIDAt(): pos should be non-null");
    }

    var x = pos;

    if (y === undefined) {
      x = pos.x;
      y = pos.y;
    }

    if (this._isInvalidPosition(x, y)) {
      throw new Error("cc.TiledLayer.getTileGIDAt(): invalid position");
    }

    if (!this._tiles) {
      cc.logID(7237);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width; // Bits on the far end of the 32-bit global tile ID are used for tile flags


    var tile = this._tiles[index];
    return (tile & cc.TiledMap.TileFlag.FLIPPED_MASK) >>> 0;
  },
  getTileFlagsAt: function getTileFlagsAt(pos, y) {
    if (!pos) {
      throw new Error("TiledLayer.getTileFlagsAt: pos should be non-null");
    }

    if (y !== undefined) {
      pos = cc.v2(pos, y);
    }

    if (this._isInvalidPosition(pos)) {
      throw new Error("TiledLayer.getTileFlagsAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7240);
      return null;
    }

    var idx = Math.floor(pos.x) + Math.floor(pos.y) * this._layerSize.width; // Bits on the far end of the 32-bit global tile ID are used for tile flags


    var tile = this._tiles[idx];
    return (tile & cc.TiledMap.TileFlag.FLIPPED_ALL) >>> 0;
  },
  _setCullingDirty: function _setCullingDirty(value) {
    this._cullingDirty = value;
  },
  _isCullingDirty: function _isCullingDirty() {
    return this._cullingDirty;
  },
  // 'x, y' is the position of viewPort, which's anchor point is at the center of rect.
  // 'width, height' is the size of viewPort.
  _updateViewPort: function _updateViewPort(x, y, width, height) {
    if (this._viewPort.width === width && this._viewPort.height === height && this._viewPort.x === x && this._viewPort.y === y) {
      return;
    }

    this._viewPort.x = x;
    this._viewPort.y = y;
    this._viewPort.width = width;
    this._viewPort.height = height; // if map's type is iso, reserve bottom line is 2 to avoid show empty grid because of iso grid arithmetic

    var reserveLine = 1;

    if (this._layerOrientation === cc.TiledMap.Orientation.ISO) {
      reserveLine = 2;
    }

    var vpx = this._viewPort.x - this._offset.x + this._leftDownToCenterX;
    var vpy = this._viewPort.y - this._offset.y + this._leftDownToCenterY;
    var leftDownX = vpx - this._leftOffset;
    var leftDownY = vpy - this._downOffset;
    var rightTopX = vpx + width + this._rightOffset;
    var rightTopY = vpy + height + this._topOffset;
    var leftDown = this._cullingRect.leftDown;
    var rightTop = this._cullingRect.rightTop;
    if (leftDownX < 0) leftDownX = 0;
    if (leftDownY < 0) leftDownY = 0; // calc left down

    this._positionToRowCol(leftDownX, leftDownY, _tempRowCol); // make range large


    _tempRowCol.row -= reserveLine;
    _tempRowCol.col -= reserveLine; // insure left down row col greater than 0

    _tempRowCol.row = _tempRowCol.row > 0 ? _tempRowCol.row : 0;
    _tempRowCol.col = _tempRowCol.col > 0 ? _tempRowCol.col : 0;

    if (_tempRowCol.row !== leftDown.row || _tempRowCol.col !== leftDown.col) {
      leftDown.row = _tempRowCol.row;
      leftDown.col = _tempRowCol.col;
      this._cullingDirty = true;
    } // show nothing


    if (rightTopX < 0 || rightTopY < 0) {
      _tempRowCol.row = -1;
      _tempRowCol.col = -1;
    } else {
      // calc right top
      this._positionToRowCol(rightTopX, rightTopY, _tempRowCol); // make range large


      _tempRowCol.row++;
      _tempRowCol.col++;
    } // avoid range out of max rect


    if (_tempRowCol.row > this._rightTop.row) _tempRowCol.row = this._rightTop.row;
    if (_tempRowCol.col > this._rightTop.col) _tempRowCol.col = this._rightTop.col;

    if (_tempRowCol.row !== rightTop.row || _tempRowCol.col !== rightTop.col) {
      rightTop.row = _tempRowCol.row;
      rightTop.col = _tempRowCol.col;
      this._cullingDirty = true;
    }
  },
  // the result may not precise, but it dose't matter, it just uses to be got range
  _positionToRowCol: function _positionToRowCol(x, y, result) {
    var TiledMap = cc.TiledMap;
    var Orientation = TiledMap.Orientation;
    var StaggerAxis = TiledMap.StaggerAxis;
    var maptw = this._mapTileSize.width,
        mapth = this._mapTileSize.height,
        maptw2 = maptw * 0.5,
        mapth2 = mapth * 0.5;
    var row = 0,
        col = 0,
        diffX2 = 0,
        diffY2 = 0,
        axis = this._staggerAxis;
    var cols = this._layerSize.width;

    switch (this._layerOrientation) {
      // left top to right dowm
      case Orientation.ORTHO:
        col = Math.floor(x / maptw);
        row = Math.floor(y / mapth);
        break;
      // right top to left down
      // iso can be treat as special hex whose hex side length is 0

      case Orientation.ISO:
        col = Math.floor(x / maptw2);
        row = Math.floor(y / mapth2);
        break;
      // left top to right dowm

      case Orientation.HEX:
        if (axis === StaggerAxis.STAGGERAXIS_Y) {
          row = Math.floor(y / (mapth - this._diffY1));
          diffX2 = row % 2 === 1 ? maptw2 * this._odd_even : 0;
          col = Math.floor((x - diffX2) / maptw);
        } else {
          col = Math.floor(x / (maptw - this._diffX1));
          diffY2 = col % 2 === 1 ? mapth2 * -this._odd_even : 0;
          row = Math.floor((y - diffY2) / mapth);
        }

        break;
    }

    result.row = row;
    result.col = col;
    return result;
  },
  _updateCulling: function _updateCulling() {
    if (CC_EDITOR) {
      this.enableCulling(false);
    } else if (this._enableCulling) {
      this.node._updateWorldMatrix();

      _valueTypes.Mat4.invert(_mat4_temp, this.node._worldMatrix);

      var rect = cc.visibleRect;
      var camera = cc.Camera.findCamera(this.node);

      if (camera) {
        _vec2_temp.x = 0;
        _vec2_temp.y = 0;
        _vec2_temp2.x = _vec2_temp.x + rect.width;
        _vec2_temp2.y = _vec2_temp.y + rect.height;
        camera.getScreenToWorldPoint(_vec2_temp, _vec2_temp);
        camera.getScreenToWorldPoint(_vec2_temp2, _vec2_temp2);

        _valueTypes.Vec2.transformMat4(_vec2_temp, _vec2_temp, _mat4_temp);

        _valueTypes.Vec2.transformMat4(_vec2_temp2, _vec2_temp2, _mat4_temp);

        this._updateViewPort(_vec2_temp.x, _vec2_temp.y, _vec2_temp2.x - _vec2_temp.x, _vec2_temp2.y - _vec2_temp.y);
      }
    }
  },

  /**
   * !#en Layer orientation, which is the same as the map orientation.
   * !#zh 获取 Layer 方向(同地图方向)。
   * @method getLayerOrientation
   * @return {Number}
   * @example
   * let orientation = tiledLayer.getLayerOrientation();
   * cc.log("Layer Orientation: " + orientation);
   */
  getLayerOrientation: function getLayerOrientation() {
    return this._layerOrientation;
  },

  /**
   * !#en properties from the layer. They can be added using Tiled.
   * !#zh 获取 layer 的属性，可以使用 Tiled 编辑器添加属性。
   * @method getProperties
   * @return {Object}
   * @example
   * let properties = tiledLayer.getProperties();
   * cc.log("Properties: " + properties);
   */
  getProperties: function getProperties() {
    return this._properties;
  },
  _updateVertex: function _updateVertex(col, row) {
    var TiledMap = cc.TiledMap;
    var TileFlag = TiledMap.TileFlag;
    var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
    var StaggerAxis = TiledMap.StaggerAxis;
    var Orientation = TiledMap.Orientation;
    var vertices = this._vertices;
    var layerOrientation = this._layerOrientation,
        tiles = this._tiles;

    if (!tiles) {
      return;
    }

    var rightTop = this._rightTop;
    var maptw = this._mapTileSize.width,
        mapth = this._mapTileSize.height,
        maptw2 = maptw * 0.5,
        mapth2 = mapth * 0.5,
        rows = this._layerSize.height,
        cols = this._layerSize.width,
        grids = this._texGrids;
    var gid, grid, left, bottom, axis, diffX1, diffY1, odd_even, diffX2, diffY2;

    if (layerOrientation === Orientation.HEX) {
      axis = this._staggerAxis;
      diffX1 = this._diffX1;
      diffY1 = this._diffY1;
      odd_even = this._odd_even;
    }

    var cullingCol = 0,
        cullingRow = 0;
    var tileOffset = null,
        gridGID = 0; // grid border

    var topBorder = 0,
        downBorder = 0,
        leftBorder = 0,
        rightBorder = 0;
    var index = row * cols + col;
    gid = tiles[index];
    gridGID = (gid & FLIPPED_MASK) >>> 0;
    grid = grids[gridGID];

    if (!grid) {
      return;
    } // if has animation, grid must be updated per frame


    if (this._animations[gridGID]) {
      this._hasAniGrid = this._hasAniGrid || true;
    }

    switch (layerOrientation) {
      // left top to right dowm
      case Orientation.ORTHO:
        cullingCol = col;
        cullingRow = rows - row - 1;
        left = cullingCol * maptw;
        bottom = cullingRow * mapth;
        break;
      // right top to left down

      case Orientation.ISO:
        // if not consider about col, then left is 'w/2 * (rows - row - 1)'
        // if consider about col then left must add 'w/2 * col'
        // so left is 'w/2 * (rows - row - 1) + w/2 * col'
        // combine expression is 'w/2 * (rows - row + col -1)'
        cullingCol = rows + col - row - 1; // if not consider about row, then bottom is 'h/2 * (cols - col -1)'
        // if consider about row then bottom must add 'h/2 * (rows - row - 1)'
        // so bottom is 'h/2 * (cols - col -1) + h/2 * (rows - row - 1)'
        // combine expressionn is 'h/2 * (rows + cols - col - row - 2)'

        cullingRow = rows + cols - col - row - 2;
        left = maptw2 * cullingCol;
        bottom = mapth2 * cullingRow;
        break;
      // left top to right dowm

      case Orientation.HEX:
        diffX2 = axis === StaggerAxis.STAGGERAXIS_Y && row % 2 === 1 ? maptw2 * odd_even : 0;
        diffY2 = axis === StaggerAxis.STAGGERAXIS_X && col % 2 === 1 ? mapth2 * -odd_even : 0;
        left = col * (maptw - diffX1) + diffX2;
        bottom = (rows - row - 1) * (mapth - diffY1) + diffY2;
        cullingCol = col;
        cullingRow = rows - row - 1;
        break;
    }

    var rowData = vertices[cullingRow] = vertices[cullingRow] || {
      minCol: 0,
      maxCol: 0
    };
    var colData = rowData[cullingCol] = rowData[cullingCol] || {}; // record each row range, it will faster when culling grid

    if (rowData.minCol > cullingCol) {
      rowData.minCol = cullingCol;
    }

    if (rowData.maxCol < cullingCol) {
      rowData.maxCol = cullingCol;
    } // record max rect, when viewPort is bigger than layer, can make it smaller


    if (rightTop.row < cullingRow) {
      rightTop.row = cullingRow;
    }

    if (rightTop.col < cullingCol) {
      rightTop.col = cullingCol;
    } // _offset is whole layer offset
    // tileOffset is tileset offset which is related to each grid
    // tileOffset coordinate system's y axis is opposite with engine's y axis.


    tileOffset = grid.tileset.tileOffset;
    left += this._offset.x + tileOffset.x;
    bottom += this._offset.y - tileOffset.y;
    topBorder = -tileOffset.y + grid.tileset._tileSize.height - mapth;
    topBorder = topBorder < 0 ? 0 : topBorder;
    downBorder = tileOffset.y < 0 ? 0 : tileOffset.y;
    leftBorder = -tileOffset.x < 0 ? 0 : -tileOffset.x;
    rightBorder = tileOffset.x + grid.tileset._tileSize.width - maptw;
    rightBorder = rightBorder < 0 ? 0 : rightBorder;

    if (this._rightOffset < leftBorder) {
      this._rightOffset = leftBorder;
    }

    if (this._leftOffset < rightBorder) {
      this._leftOffset = rightBorder;
    }

    if (this._topOffset < downBorder) {
      this._topOffset = downBorder;
    }

    if (this._downOffset < topBorder) {
      this._downOffset = topBorder;
    }

    colData.left = left;
    colData.bottom = bottom; // this index is tiledmap grid index

    colData.index = index;
    this._cullingDirty = true;
  },
  _updateVertices: function _updateVertices() {
    var vertices = this._vertices;
    vertices.length = 0;
    var tiles = this._tiles;

    if (!tiles) {
      return;
    }

    var rightTop = this._rightTop;
    rightTop.row = -1;
    rightTop.col = -1;
    var rows = this._layerSize.height,
        cols = this._layerSize.width;
    this._topOffset = 0;
    this._downOffset = 0;
    this._leftOffset = 0;
    this._rightOffset = 0;
    this._hasAniGrid = false;

    for (var row = 0; row < rows; ++row) {
      for (var col = 0; col < cols; ++col) {
        this._updateVertex(col, row);
      }
    }

    this._verticesDirty = false;
  },

  /**
   * !#en
   * Get the TiledTile with the tile coordinate.<br/>
   * If there is no tile in the specified coordinate and forceCreate parameter is true, <br/>
   * then will create a new TiledTile at the coordinate.
   * The renderer will render the tile with the rotation, scale, position and color property of the TiledTile.
   * !#zh
   * 通过指定的 tile 坐标获取对应的 TiledTile。 <br/>
   * 如果指定的坐标没有 tile，并且设置了 forceCreate 那么将会在指定的坐标创建一个新的 TiledTile 。<br/>
   * 在渲染这个 tile 的时候，将会使用 TiledTile 的节点的旋转、缩放、位移、颜色属性。<br/>
   * @method getTiledTileAt
   * @param {Integer} x
   * @param {Integer} y
   * @param {Boolean} forceCreate
   * @return {cc.TiledTile}
   * @example
   * let tile = tiledLayer.getTiledTileAt(100, 100, true);
   * cc.log(tile);
   */
  getTiledTileAt: function getTiledTileAt(x, y, forceCreate) {
    if (this._isInvalidPosition(x, y)) {
      throw new Error("TiledLayer.getTiledTileAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7236);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    var tile = this._tiledTiles[index];

    if (!tile && forceCreate) {
      var node = new cc.Node();
      tile = node.addComponent(cc.TiledTile);
      tile._x = x;
      tile._y = y;
      tile._layer = this;

      tile._updateInfo();

      node.parent = this.node;
      return tile;
    }

    return tile;
  },

  /** 
   * !#en
   * Change tile to TiledTile at the specified coordinate.
   * !#zh
   * 将指定的 tile 坐标替换为指定的 TiledTile。
   * @method setTiledTileAt
   * @param {Integer} x
   * @param {Integer} y
   * @param {cc.TiledTile} tiledTile
   * @return {cc.TiledTile}
   */
  setTiledTileAt: function setTiledTileAt(x, y, tiledTile) {
    if (this._isInvalidPosition(x, y)) {
      throw new Error("TiledLayer.setTiledTileAt: invalid position");
    }

    if (!this._tiles) {
      cc.logID(7236);
      return null;
    }

    var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

    this._tiledTiles[index] = tiledTile;
    this._cullingDirty = true;

    if (tiledTile) {
      this._hasTiledNodeGrid = true;
    } else {
      this._hasTiledNodeGrid = this._tiledTiles.some(function (tiledNode, index) {
        return !!tiledNode;
      });
    }

    return tiledTile;
  },

  /**
   * !#en Return texture.
   * !#zh 获取纹理。
   * @method getTexture
   * @param index The index of textures
   * @return {Texture2D}
   */
  getTexture: function getTexture(index) {
    index = index || 0;

    if (this._textures && index >= 0 && this._textures.length > index) {
      return this._textures[index];
    }

    return null;
  },

  /**
   * !#en Return texture.
   * !#zh 获取纹理。
   * @method getTextures
   * @return {Texture2D}
   */
  getTextures: function getTextures() {
    return this._textures;
  },

  /**
   * !#en Set the texture.
   * !#zh 设置纹理。
   * @method setTexture
   * @param {Texture2D} texture
   */
  setTexture: function setTexture(texture) {
    this.setTextures([texture]);
  },

  /**
   * !#en Set the texture.
   * !#zh 设置纹理。
   * @method setTexture
   * @param {Texture2D} textures
   */
  setTextures: function setTextures(textures) {
    this._textures = textures;

    this._activateMaterial();
  },

  /**
   * !#en Gets layer size.
   * !#zh 获得层大小。
   * @method getLayerSize
   * @return {Size}
   * @example
   * let size = tiledLayer.getLayerSize();
   * cc.log("layer size: " + size);
   */
  getLayerSize: function getLayerSize() {
    return this._layerSize;
  },

  /**
   * !#en Size of the map's tile (could be different from the tile's size).
   * !#zh 获取 tile 的大小( tile 的大小可能会有所不同)。
   * @method getMapTileSize
   * @return {Size}
   * @example
   * let mapTileSize = tiledLayer.getMapTileSize();
   * cc.log("MapTile size: " + mapTileSize);
   */
  getMapTileSize: function getMapTileSize() {
    return this._mapTileSize;
  },

  /**
   * !#en Gets Tile set first information for the layer.
   * !#zh 获取 layer 索引位置为0的 Tileset 信息。
   * @method getTileSet
   * @param index The index of tilesets
   * @return {TMXTilesetInfo}
   */
  getTileSet: function getTileSet(index) {
    index = index || 0;

    if (this._tilesets && index >= 0 && this._tilesets.length > index) {
      return this._tilesets[index];
    }

    return null;
  },

  /**
   * !#en Gets tile set all information for the layer.
   * !#zh 获取 layer 所有的 Tileset 信息。
   * @method getTileSet
   * @return {TMXTilesetInfo}
   */
  getTileSets: function getTileSets() {
    return this._tilesets;
  },

  /**
   * !#en Sets tile set information for the layer.
   * !#zh 设置 layer 的 tileset 信息。
   * @method setTileSet
   * @param {TMXTilesetInfo} tileset
   */
  setTileSet: function setTileSet(tileset) {
    this.setTileSets([tileset]);
  },

  /**
   * !#en Sets Tile set information for the layer.
   * !#zh 设置 layer 的 Tileset 信息。
   * @method setTileSets
   * @param {TMXTilesetInfo} tilesets
   */
  setTileSets: function setTileSets(tilesets) {
    this._tilesets = tilesets;
    var textures = this._textures = [];
    var texGrids = this._texGrids = [];

    for (var i = 0; i < tilesets.length; i++) {
      var tileset = tilesets[i];

      if (tileset) {
        textures[i] = tileset.sourceImage;
      }
    }

    cc.TiledMap.loadAllTextures(textures, function () {
      for (var _i = 0, l = tilesets.length; _i < l; ++_i) {
        var tilesetInfo = tilesets[_i];
        if (!tilesetInfo) continue;
        cc.TiledMap.fillTextureGrids(tilesetInfo, texGrids, _i);
      }

      this._prepareToRender();
    }.bind(this));
  },
  _traverseAllGrid: function _traverseAllGrid() {
    var tiles = this._tiles;
    var texGrids = this._texGrids;
    var tilesetIndexArr = this._tilesetIndexArr;
    var tilesetIndexToArrIndex = this._tilesetIndexToArrIndex = {};
    var TiledMap = cc.TiledMap;
    var TileFlag = TiledMap.TileFlag;
    var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
    tilesetIndexArr.length = 0;

    for (var i = 0; i < tiles.length; i++) {
      var gid = tiles[i];
      if (gid === 0) continue;
      gid = (gid & FLIPPED_MASK) >>> 0;
      var grid = texGrids[gid];

      if (!grid) {
        cc.error("CCTiledLayer:_traverseAllGrid grid is null, gid is:", gid);
        continue;
      }

      var tilesetIdx = grid.texId;
      if (tilesetIndexToArrIndex[tilesetIdx] !== undefined) continue;
      tilesetIndexToArrIndex[tilesetIdx] = tilesetIndexArr.length;
      tilesetIndexArr.push(tilesetIdx);
    }
  },
  _init: function _init(layerInfo, mapInfo, tilesets, textures, texGrids) {
    this._cullingDirty = true;
    this._layerInfo = layerInfo;
    this._mapInfo = mapInfo;
    var size = layerInfo._layerSize; // layerInfo

    this._layerName = layerInfo.name;
    this._tiles = layerInfo._tiles;
    this._properties = layerInfo.properties;
    this._layerSize = size;
    this._minGID = layerInfo._minGID;
    this._maxGID = layerInfo._maxGID;
    this._opacity = layerInfo._opacity;
    this._renderOrder = mapInfo.renderOrder;
    this._staggerAxis = mapInfo.getStaggerAxis();
    this._staggerIndex = mapInfo.getStaggerIndex();
    this._hexSideLength = mapInfo.getHexSideLength();
    this._animations = mapInfo.getTileAnimations(); // tilesets

    this._tilesets = tilesets; // textures

    this._textures = textures; // grid texture

    this._texGrids = texGrids; // mapInfo

    this._layerOrientation = mapInfo.orientation;
    this._mapTileSize = mapInfo.getTileSize();
    var maptw = this._mapTileSize.width;
    var mapth = this._mapTileSize.height;
    var layerW = this._layerSize.width;
    var layerH = this._layerSize.height;

    if (this._layerOrientation === cc.TiledMap.Orientation.HEX) {
      // handle hex map
      var TiledMap = cc.TiledMap;
      var StaggerAxis = TiledMap.StaggerAxis;
      var StaggerIndex = TiledMap.StaggerIndex;
      var width = 0,
          height = 0;
      this._odd_even = this._staggerIndex === StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;

      if (this._staggerAxis === StaggerAxis.STAGGERAXIS_X) {
        this._diffX1 = (maptw - this._hexSideLength) / 2;
        this._diffY1 = 0;
        height = mapth * (layerH + 0.5);
        width = (maptw + this._hexSideLength) * Math.floor(layerW / 2) + maptw * (layerW % 2);
      } else {
        this._diffX1 = 0;
        this._diffY1 = (mapth - this._hexSideLength) / 2;
        width = maptw * (layerW + 0.5);
        height = (mapth + this._hexSideLength) * Math.floor(layerH / 2) + mapth * (layerH % 2);
      }

      this.node.setContentSize(width, height);
    } else if (this._layerOrientation === cc.TiledMap.Orientation.ISO) {
      var wh = layerW + layerH;
      this.node.setContentSize(maptw * 0.5 * wh, mapth * 0.5 * wh);
    } else {
      this.node.setContentSize(layerW * maptw, layerH * mapth);
    } // offset (after layer orientation is set);


    this._offset = cc.v2(layerInfo.offset.x, -layerInfo.offset.y);
    this._useAutomaticVertexZ = false;
    this._vertexZvalue = 0;

    this._syncAnchorPoint();

    this._prepareToRender();
  },
  _prepareToRender: function _prepareToRender() {
    this._updateVertices();

    this._traverseAllGrid();

    this._updateAllUserNode();

    this._activateMaterial();
  },
  _buildMaterial: function _buildMaterial(tilesetIdx) {
    var texIdMatIdx = this._texIdToMatIndex;

    if (texIdMatIdx[tilesetIdx] !== undefined) {
      return null;
    }

    var tilesetIndexArr = this._tilesetIndexArr;
    var tilesetIndexToArrIndex = this._tilesetIndexToArrIndex;
    var index = tilesetIndexToArrIndex[tilesetIdx];

    if (index === undefined) {
      tilesetIndexToArrIndex[tilesetIdx] = index = tilesetIndexArr.length;
      tilesetIndexArr.push(tilesetIdx);
    }

    var texture = this._textures[tilesetIdx];
    var material = this._materials[index];

    if (!material) {
      material = Material.getBuiltinMaterial('2d-sprite');
    }

    material = _materialVariant["default"].create(material, this);
    material.define('CC_USE_MODEL', true);
    material.setProperty('texture', texture);
    this._materials[index] = material;
    texIdMatIdx[tilesetIdx] = index;
    return material;
  },
  _activateMaterial: function _activateMaterial() {
    var tilesetIndexArr = this._tilesetIndexArr;

    if (tilesetIndexArr.length === 0) {
      this.disableRender();
      return;
    }

    var matLen = tilesetIndexArr.length;

    for (var i = 0; i < matLen; i++) {
      this._buildMaterial(tilesetIndexArr[i]);
    }

    this._materials.length = matLen;
    this.markForRender(true);
  }
});
cc.TiledLayer = module.exports = TiledLayer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVGlsZWRMYXllci5qcyJdLCJuYW1lcyI6WyJSZW5kZXJDb21wb25lbnQiLCJyZXF1aXJlIiwiTWF0ZXJpYWwiLCJSZW5kZXJGbG93IiwiX21hdDRfdGVtcCIsImNjIiwibWF0NCIsIl92ZWMyX3RlbXAiLCJ2MiIsIl92ZWMyX3RlbXAyIiwiX3ZlYzJfdGVtcDMiLCJfdGVtcFJvd0NvbCIsInJvdyIsImNvbCIsIlRpbGVkVXNlck5vZGVEYXRhIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiY3RvciIsIl9pbmRleCIsIl9yb3ciLCJfY29sIiwiX3RpbGVkTGF5ZXIiLCJUaWxlZExheWVyIiwiZWRpdG9yIiwiaW5zcGVjdG9yIiwiX3VzZXJOb2RlR3JpZCIsIl91c2VyTm9kZU1hcCIsIl91c2VyTm9kZURpcnR5IiwiX3RpbGVkVGlsZXMiLCJfdGlsZXNldEluZGV4QXJyIiwiX3RpbGVzZXRJbmRleFRvQXJySW5kZXgiLCJfdGV4SWRUb01hdEluZGV4IiwiX3ZpZXdQb3J0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIl9jdWxsaW5nUmVjdCIsImxlZnREb3duIiwicmlnaHRUb3AiLCJfY3VsbGluZ0RpcnR5IiwiX3JpZ2h0VG9wIiwiX2xheWVySW5mbyIsIl9tYXBJbmZvIiwiX3RvcE9mZnNldCIsIl9kb3duT2Zmc2V0IiwiX2xlZnRPZmZzZXQiLCJfcmlnaHRPZmZzZXQiLCJfdGlsZXMiLCJfdmVydGljZXMiLCJfdmVydGljZXNEaXJ0eSIsIl9sYXllck5hbWUiLCJfbGF5ZXJPcmllbnRhdGlvbiIsIl90ZXhHcmlkcyIsIl90ZXh0dXJlcyIsIl90aWxlc2V0cyIsIl9sZWZ0RG93blRvQ2VudGVyWCIsIl9sZWZ0RG93blRvQ2VudGVyWSIsIl9oYXNUaWxlZE5vZGVHcmlkIiwiX2hhc0FuaUdyaWQiLCJfYW5pbWF0aW9ucyIsIl9lbmFibGVDdWxsaW5nIiwibWFjcm8iLCJFTkFCTEVfVElMRURNQVBfQ1VMTElORyIsIl9oYXNUaWxlZE5vZGUiLCJfaGFzQW5pbWF0aW9uIiwiZW5hYmxlQ3VsbGluZyIsInZhbHVlIiwiYWRkVXNlck5vZGUiLCJub2RlIiwiZGF0YUNvbXAiLCJnZXRDb21wb25lbnQiLCJ3YXJuIiwiYWRkQ29tcG9uZW50IiwicGFyZW50IiwiX3JlbmRlckZsYWciLCJGTEFHX0JSRUFLX0ZMT1ciLCJfaWQiLCJfbm9kZUxvY2FsUG9zVG9MYXllclBvcyIsIl9wb3NpdGlvblRvUm93Q29sIiwiX2FkZFVzZXJOb2RlVG9HcmlkIiwiX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiUE9TSVRJT05fQ0hBTkdFRCIsIl91c2VyTm9kZVBvc0NoYW5nZSIsIlNJWkVfQ0hBTkdFRCIsIl91c2VyTm9kZVNpemVDaGFuZ2UiLCJyZW1vdmVVc2VyTm9kZSIsIm9mZiIsIl9yZW1vdmVVc2VyTm9kZUZyb21HcmlkIiwiX3JlbW92ZUNvbXBvbmVudCIsImRlc3Ryb3kiLCJyZW1vdmVGcm9tUGFyZW50IiwiZGVzdHJveVVzZXJOb2RlIiwibm9kZVBvcyIsIm91dCIsIl9nZXROb2Rlc0J5Um93Q29sIiwicm93RGF0YSIsIl9nZXROb2Rlc0NvdW50QnlSb3ciLCJjb3VudCIsIl91cGRhdGVBbGxVc2VyTm9kZSIsImRhdGFJZCIsInNlbGYiLCJfbGltaXRJbkxheWVyIiwiaW5kZXgiLCJjb2xEYXRhIiwibGlzdCIsImxlbmd0aCIsInJvd0NvbCIsInRlbXBSb3dDb2wiLCJwdXNoIiwiX2lzVXNlck5vZGVEaXJ0eSIsIl9zZXRVc2VyTm9kZURpcnR5Iiwib25FbmFibGUiLCJfc3VwZXIiLCJBTkNIT1JfQ0hBTkdFRCIsIl9zeW5jQW5jaG9yUG9pbnQiLCJfYWN0aXZhdGVNYXRlcmlhbCIsIm9uRGlzYWJsZSIsImFuY2hvclgiLCJzY2FsZVgiLCJhbmNob3JZIiwic2NhbGVZIiwib25EZXN0cm95IiwiX2J1ZmZlciIsIl9yZW5kZXJEYXRhTGlzdCIsImdldExheWVyTmFtZSIsInNldExheWVyTmFtZSIsImxheWVyTmFtZSIsImdldFByb3BlcnR5IiwicHJvcGVydHlOYW1lIiwiX3Byb3BlcnRpZXMiLCJnZXRQb3NpdGlvbkF0IiwicG9zIiwidW5kZWZpbmVkIiwiTWF0aCIsImZsb29yIiwicmV0IiwiVGlsZWRNYXAiLCJPcmllbnRhdGlvbiIsIk9SVEhPIiwiX3Bvc2l0aW9uRm9yT3J0aG9BdCIsIklTTyIsIl9wb3NpdGlvbkZvcklzb0F0IiwiSEVYIiwiX3Bvc2l0aW9uRm9ySGV4QXQiLCJfaXNJbnZhbGlkUG9zaXRpb24iLCJfbGF5ZXJTaXplIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJnaWRBbmRGbGFncyIsImdpZCIsIlRpbGVGbGFnIiwiRkxJUFBFRF9NQVNLIiwidGlsZXNldCIsIm9mZnNldCIsInRpbGVPZmZzZXQiLCJfbWFwVGlsZVNpemUiLCJ0aWxlV2lkdGgiLCJ0aWxlSGVpZ2h0Iiwicm93cyIsIm9kZF9ldmVuIiwiX3N0YWdnZXJJbmRleCIsIlN0YWdnZXJJbmRleCIsIlNUQUdHRVJJTkRFWF9PREQiLCJkaWZmWCIsImRpZmZZIiwiX3N0YWdnZXJBeGlzIiwiU3RhZ2dlckF4aXMiLCJTVEFHR0VSQVhJU19ZIiwiX2hleFNpZGVMZW5ndGgiLCJTVEFHR0VSQVhJU19YIiwic2V0VGlsZXNHSURBdCIsImdpZHMiLCJiZWdpbkNvbCIsImJlZ2luUm93IiwidG90YWxDb2xzIiwiZ2lkc0lkeCIsImVuZENvbCIsIl91cGRhdGVUaWxlRm9yR0lEIiwic2V0VGlsZUdJREF0IiwicG9zT3JYIiwiZmxhZ3NPclkiLCJmbGFncyIsIkVycm9yIiwiVmVjMiIsInVnaWQiLCJsb2dJRCIsImZpcnN0R2lkIiwiaWR4Iiwib2xkR0lEQW5kRmxhZ3MiLCJncmlkIiwidGlsZXNldElkeCIsInRleElkIiwiX3VwZGF0ZVZlcnRleCIsIl9idWlsZE1hdGVyaWFsIiwiZ2V0VGlsZXMiLCJnZXRUaWxlR0lEQXQiLCJ0aWxlIiwiZ2V0VGlsZUZsYWdzQXQiLCJGTElQUEVEX0FMTCIsIl9zZXRDdWxsaW5nRGlydHkiLCJfaXNDdWxsaW5nRGlydHkiLCJfdXBkYXRlVmlld1BvcnQiLCJyZXNlcnZlTGluZSIsInZweCIsIl9vZmZzZXQiLCJ2cHkiLCJsZWZ0RG93blgiLCJsZWZ0RG93blkiLCJyaWdodFRvcFgiLCJyaWdodFRvcFkiLCJyZXN1bHQiLCJtYXB0dyIsIm1hcHRoIiwibWFwdHcyIiwibWFwdGgyIiwiZGlmZlgyIiwiZGlmZlkyIiwiYXhpcyIsImNvbHMiLCJfZGlmZlkxIiwiX29kZF9ldmVuIiwiX2RpZmZYMSIsIl91cGRhdGVDdWxsaW5nIiwiQ0NfRURJVE9SIiwiX3VwZGF0ZVdvcmxkTWF0cml4IiwiTWF0NCIsImludmVydCIsIl93b3JsZE1hdHJpeCIsInJlY3QiLCJ2aXNpYmxlUmVjdCIsImNhbWVyYSIsIkNhbWVyYSIsImZpbmRDYW1lcmEiLCJnZXRTY3JlZW5Ub1dvcmxkUG9pbnQiLCJ0cmFuc2Zvcm1NYXQ0IiwiZ2V0TGF5ZXJPcmllbnRhdGlvbiIsImdldFByb3BlcnRpZXMiLCJ2ZXJ0aWNlcyIsImxheWVyT3JpZW50YXRpb24iLCJ0aWxlcyIsImdyaWRzIiwibGVmdCIsImJvdHRvbSIsImRpZmZYMSIsImRpZmZZMSIsImN1bGxpbmdDb2wiLCJjdWxsaW5nUm93IiwiZ3JpZEdJRCIsInRvcEJvcmRlciIsImRvd25Cb3JkZXIiLCJsZWZ0Qm9yZGVyIiwicmlnaHRCb3JkZXIiLCJtaW5Db2wiLCJtYXhDb2wiLCJfdGlsZVNpemUiLCJfdXBkYXRlVmVydGljZXMiLCJnZXRUaWxlZFRpbGVBdCIsImZvcmNlQ3JlYXRlIiwiVGlsZWRUaWxlIiwiX3giLCJfeSIsIl9sYXllciIsIl91cGRhdGVJbmZvIiwic2V0VGlsZWRUaWxlQXQiLCJ0aWxlZFRpbGUiLCJzb21lIiwidGlsZWROb2RlIiwiZ2V0VGV4dHVyZSIsImdldFRleHR1cmVzIiwic2V0VGV4dHVyZSIsInRleHR1cmUiLCJzZXRUZXh0dXJlcyIsInRleHR1cmVzIiwiZ2V0TGF5ZXJTaXplIiwiZ2V0TWFwVGlsZVNpemUiLCJnZXRUaWxlU2V0IiwiZ2V0VGlsZVNldHMiLCJzZXRUaWxlU2V0Iiwic2V0VGlsZVNldHMiLCJ0aWxlc2V0cyIsInRleEdyaWRzIiwiaSIsInNvdXJjZUltYWdlIiwibG9hZEFsbFRleHR1cmVzIiwibCIsInRpbGVzZXRJbmZvIiwiZmlsbFRleHR1cmVHcmlkcyIsIl9wcmVwYXJlVG9SZW5kZXIiLCJiaW5kIiwiX3RyYXZlcnNlQWxsR3JpZCIsInRpbGVzZXRJbmRleEFyciIsInRpbGVzZXRJbmRleFRvQXJySW5kZXgiLCJlcnJvciIsIl9pbml0IiwibGF5ZXJJbmZvIiwibWFwSW5mbyIsInNpemUiLCJwcm9wZXJ0aWVzIiwiX21pbkdJRCIsIl9tYXhHSUQiLCJfb3BhY2l0eSIsIl9yZW5kZXJPcmRlciIsInJlbmRlck9yZGVyIiwiZ2V0U3RhZ2dlckF4aXMiLCJnZXRTdGFnZ2VySW5kZXgiLCJnZXRIZXhTaWRlTGVuZ3RoIiwiZ2V0VGlsZUFuaW1hdGlvbnMiLCJvcmllbnRhdGlvbiIsImdldFRpbGVTaXplIiwibGF5ZXJXIiwibGF5ZXJIIiwic2V0Q29udGVudFNpemUiLCJ3aCIsIl91c2VBdXRvbWF0aWNWZXJ0ZXhaIiwiX3ZlcnRleFp2YWx1ZSIsInRleElkTWF0SWR4IiwibWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiZ2V0QnVpbHRpbk1hdGVyaWFsIiwiTWF0ZXJpYWxWYXJpYW50IiwiY3JlYXRlIiwiZGVmaW5lIiwic2V0UHJvcGVydHkiLCJkaXNhYmxlUmVuZGVyIiwibWF0TGVuIiwibWFya0ZvclJlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE2QkE7O0FBQ0E7Ozs7QUE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxlQUFlLEdB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QUNBLFNBQUssSUFBSWdMLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcyQyxNQUFwQixFQUE0QjNDLENBQUMsRUFBN0IsRUFBaUM7QUFDN0IsV0FBS3hGLGNBQUwsQ0FBb0JpRyxlQUFlLENBQUNULENBQUQsQ0FBbkM7QUFDSDs7QUFDRCxTQUFLb0MsVUFBTCxDQUFnQnBOLE1BQWhCLEdBQXlCMk4sTUFBekI7QUFDQSxTQUFLQyxhQUFMLENBQW1CLElBQW5CO0FBQ0g7QUFyMENxQixDQUFULENBQWpCO0FBdzBDQXJVLEVBQUUsQ0FBQ2tCLFVBQUgsR0FBZ0JvVCxNQUFNLENBQUNDLE9BQVAsR0FBaUJyVCxVQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vY29yZS9jb21wb25lbnRzL0NDUmVuZGVyQ29tcG9uZW50Jyk7XHJcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xyXG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xyXG5cclxuaW1wb3J0IHsgTWF0NCwgVmVjMiB9IGZyb20gJy4uL2NvcmUvdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgTWF0ZXJpYWxWYXJpYW50IGZyb20gJy4uL2NvcmUvYXNzZXRzL21hdGVyaWFsL21hdGVyaWFsLXZhcmlhbnQnO1xyXG5sZXQgX21hdDRfdGVtcCA9IGNjLm1hdDQoKTtcclxubGV0IF92ZWMyX3RlbXAgPSBjYy52MigpO1xyXG5sZXQgX3ZlYzJfdGVtcDIgPSBjYy52MigpO1xyXG5sZXQgX3ZlYzJfdGVtcDMgPSBjYy52MigpO1xyXG5sZXQgX3RlbXBSb3dDb2wgPSB7cm93OjAsIGNvbDowfTtcclxuXHJcbmxldCBUaWxlZFVzZXJOb2RlRGF0YSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5UaWxlZFVzZXJOb2RlRGF0YScsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLl9yb3cgPSAtMTtcclxuICAgICAgICB0aGlzLl9jb2wgPSAtMTtcclxuICAgICAgICB0aGlzLl90aWxlZExheWVyID0gbnVsbDtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmVuZGVyIHRoZSBUTVggbGF5ZXIuXHJcbiAqICEjemgg5riy5p+TIFRNWCBsYXllcuOAglxyXG4gKiBAY2xhc3MgVGlsZWRMYXllclxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmxldCBUaWxlZExheWVyID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlRpbGVkTGF5ZXInLFxyXG5cclxuICAgIC8vIEluaGVyaXRzIGZyb20gdGhlIGFic3RyYWN0IGNsYXNzIGRpcmVjdGx5LFxyXG4gICAgLy8gYmVjYXVzZSBUaWxlZExheWVyIG5vdCBjcmVhdGUgb3IgbWFpbnRhaW5zIHRoZSBzZ05vZGUgYnkgaXRzZWxmLlxyXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxyXG5cclxuICAgIGVkaXRvcjoge1xyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvdGlsZWQtbGF5ZXIuanMnLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl91c2VyTm9kZUdyaWQgPSB7fTsvLyBbcm93XVtjb2xdID0ge2NvdW50OiAwLCBub2Rlc0xpc3Q6IFtdfTtcclxuICAgICAgICB0aGlzLl91c2VyTm9kZU1hcCA9IHt9Oy8vIFtpZF0gPSBub2RlO1xyXG4gICAgICAgIHRoaXMuX3VzZXJOb2RlRGlydHkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIGxheWVyIHRpbGVzIG5vZGUsIGluZGV4IGlzIGNhY3VsYXRlZCBieSAneCArIHdpZHRoICogeScsIGZvcm1hdCBsaWtlcyAnWzBdPXRpbGVOb2RlMCxbMV09dGlsZU5vZGUxLCAuLi4nXHJcbiAgICAgICAgdGhpcy5fdGlsZWRUaWxlcyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBzdG9yZSB0aGUgbGF5ZXIgdGlsZXNldHMgaW5kZXggYXJyYXlcclxuICAgICAgICB0aGlzLl90aWxlc2V0SW5kZXhBcnIgPSBbXTtcclxuICAgICAgICAvLyB0aWxlc2V0IGluZGV4IHRvIGFycmF5IGluZGV4XHJcbiAgICAgICAgdGhpcy5fdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHt9O1xyXG4gICAgICAgIC8vIHRleHR1cmUgaWQgdG8gbWF0ZXJpYWwgaW5kZXhcclxuICAgICAgICB0aGlzLl90ZXhJZFRvTWF0SW5kZXggPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5fdmlld1BvcnQgPSB7eDotMSwgeTotMSwgd2lkdGg6LTEsIGhlaWdodDotMX07XHJcbiAgICAgICAgdGhpcy5fY3VsbGluZ1JlY3QgPSB7XHJcbiAgICAgICAgICAgIGxlZnREb3duOntyb3c6LTEsIGNvbDotMX0sXHJcbiAgICAgICAgICAgIHJpZ2h0VG9wOntyb3c6LTEsIGNvbDotMX1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcmlnaHRUb3AgPSB7cm93Oi0xLCBjb2w6LTF9O1xyXG5cclxuICAgICAgICB0aGlzLl9sYXllckluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX21hcEluZm8gPSBudWxsO1xyXG5cclxuICAgICAgICAvLyByZWNvcmQgbWF4IG9yIG1pbiB0aWxlIHRleHR1cmUgb2Zmc2V0LCBcclxuICAgICAgICAvLyBpdCB3aWxsIG1ha2UgY3VsbGluZyByZWN0IG1vcmUgbGFyZ2UsIHdoaWNoIGluc3VyZSBjdWxsaW5nIHJlY3QgY29ycmVjdC5cclxuICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xlZnRPZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gMDtcclxuXHJcbiAgICAgICAgLy8gc3RvcmUgdGhlIGxheWVyIHRpbGVzLCBpbmRleCBpcyBjYWN1bGF0ZWQgYnkgJ3ggKyB3aWR0aCAqIHknLCBmb3JtYXQgbGlrZXMgJ1swXT1naWQwLFsxXT1naWQxLCAuLi4nXHJcbiAgICAgICAgdGhpcy5fdGlsZXMgPSBbXTtcclxuICAgICAgICAvLyB2ZXJ0ZXggYXJyYXlcclxuICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IFtdO1xyXG4gICAgICAgIC8vIHZlcnRpY2VzIGRpcnR5XHJcbiAgICAgICAgdGhpcy5fdmVydGljZXNEaXJ0eSA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuX2xheWVyTmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMuX2xheWVyT3JpZW50YXRpb24gPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBzdG9yZSBhbGwgbGF5ZXIgZ2lkIGNvcnJlc3BvbmRpbmcgdGV4dHVyZSBpbmZvLCBpbmRleCBpcyBnaWQsIGZvcm1hdCBsaWtlcyAnW2dpZDBdPXRleC1pbmZvLFtnaWQxXT10ZXgtaW5mbywgLi4uJ1xyXG4gICAgICAgIHRoaXMuX3RleEdyaWRzID0gbnVsbDtcclxuICAgICAgICAvLyBzdG9yZSBhbGwgdGlsZXNldCB0ZXh0dXJlLCBpbmRleCBpcyB0aWxlc2V0IGluZGV4LCBmb3JtYXQgbGlrZXMgJ1swXT10ZXh0dXJlMCwgWzFdPXRleHR1cmUxLCAuLi4nXHJcbiAgICAgICAgdGhpcy5fdGV4dHVyZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5faGFzVGlsZWROb2RlR3JpZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2hhc0FuaUdyaWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25zID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gc3dpdGNoIG9mIGN1bGxpbmdcclxuICAgICAgICB0aGlzLl9lbmFibGVDdWxsaW5nID0gY2MubWFjcm8uRU5BQkxFX1RJTEVETUFQX0NVTExJTkc7XHJcbiAgICB9LFxyXG5cclxuICAgIF9oYXNUaWxlZE5vZGUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNUaWxlZE5vZGVHcmlkO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaGFzQW5pbWF0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faGFzQW5pR3JpZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGVuYWJsZSBvciBkaXNhYmxlIGN1bGxpbmdcclxuICAgICAqICEjemgg5byA5ZCv5oiW5YWz6Zet6KOB5Ymq44CCXHJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZUN1bGxpbmdcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBlbmFibGVDdWxsaW5nICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9lbmFibGVDdWxsaW5nICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZUN1bGxpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBZGRzIHVzZXIncyBub2RlIGludG8gbGF5ZXIuXHJcbiAgICAgKiAhI3poIOa3u+WKoOeUqOaIt+iKgueCueOAglxyXG4gICAgICogQG1ldGhvZCBhZGRVc2VyTm9kZVxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBhZGRVc2VyTm9kZSAobm9kZSkge1xyXG4gICAgICAgIGxldCBkYXRhQ29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KFRpbGVkVXNlck5vZGVEYXRhKTtcclxuICAgICAgICBpZiAoZGF0YUNvbXApIHtcclxuICAgICAgICAgICAgY2Mud2FybihcIkNDVGlsZWRMYXllcjphZGRVc2VyTm9kZSBub2RlIGhhcyBiZWVuIGFkZGVkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhQ29tcCA9IG5vZGUuYWRkQ29tcG9uZW50KFRpbGVkVXNlck5vZGVEYXRhKTtcclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICBub2RlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19CUkVBS19GTE9XO1xyXG4gICAgICAgIHRoaXMuX3VzZXJOb2RlTWFwW25vZGUuX2lkXSA9IGRhdGFDb21wO1xyXG5cclxuICAgICAgICBkYXRhQ29tcC5fcm93ID0gLTE7XHJcbiAgICAgICAgZGF0YUNvbXAuX2NvbCA9IC0xO1xyXG4gICAgICAgIGRhdGFDb21wLl90aWxlZExheWVyID0gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKG5vZGUsIF92ZWMyX3RlbXApO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uVG9Sb3dDb2woX3ZlYzJfdGVtcC54LCBfdmVjMl90ZW1wLnksIF90ZW1wUm93Q29sKTtcclxuICAgICAgICB0aGlzLl9hZGRVc2VyTm9kZVRvR3JpZChkYXRhQ29tcCwgX3RlbXBSb3dDb2wpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlKG5vZGUpO1xyXG4gICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fdXNlck5vZGVQb3NDaGFuZ2UsIGRhdGFDb21wKTtcclxuICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fdXNlck5vZGVTaXplQ2hhbmdlLCBkYXRhQ29tcCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIHVzZXIncyBub2RlLlxyXG4gICAgICogISN6aCDnp7vpmaTnlKjmiLfoioLngrnjgIJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlVXNlck5vZGVcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gbm9kZVxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVXNlck5vZGUgKG5vZGUpIHtcclxuICAgICAgICBsZXQgZGF0YUNvbXAgPSBub2RlLmdldENvbXBvbmVudChUaWxlZFVzZXJOb2RlRGF0YSk7XHJcbiAgICAgICAgaWYgKCFkYXRhQ29tcCkge1xyXG4gICAgICAgICAgICBjYy53YXJuKFwiQ0NUaWxlZExheWVyOnJlbW92ZVVzZXJOb2RlIG5vZGUgaXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX3VzZXJOb2RlUG9zQ2hhbmdlLCBkYXRhQ29tcCk7XHJcbiAgICAgICAgbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl91c2VyTm9kZVNpemVDaGFuZ2UsIGRhdGFDb21wKTtcclxuICAgICAgICB0aGlzLl9yZW1vdmVVc2VyTm9kZUZyb21HcmlkKGRhdGFDb21wKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fdXNlck5vZGVNYXBbbm9kZS5faWRdO1xyXG4gICAgICAgIG5vZGUuX3JlbW92ZUNvbXBvbmVudChkYXRhQ29tcCk7XHJcbiAgICAgICAgZGF0YUNvbXAuZGVzdHJveSgpO1xyXG4gICAgICAgIG5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICBub2RlLl9yZW5kZXJGbGFnICY9IH5SZW5kZXJGbG93LkZMQUdfQlJFQUtfRkxPVztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERlc3Ryb3kgdXNlcidzIG5vZGUuXHJcbiAgICAgKiAhI3poIOmUgOavgeeUqOaIt+iKgueCueOAglxyXG4gICAgICogQG1ldGhvZCBkZXN0cm95VXNlck5vZGVcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gbm9kZVxyXG4gICAgICovXHJcbiAgICBkZXN0cm95VXNlck5vZGUgKG5vZGUpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVVzZXJOb2RlKG5vZGUpO1xyXG4gICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBhY29yZGluZyBsYXllciBhbmNob3IgcG9pbnQgdG8gY2FsY3VsYXRlIG5vZGUgbGF5ZXIgcG9zXHJcbiAgICBfbm9kZUxvY2FsUG9zVG9MYXllclBvcyAobm9kZVBvcywgb3V0KSB7XHJcbiAgICAgICAgb3V0LnggPSBub2RlUG9zLnggKyB0aGlzLl9sZWZ0RG93blRvQ2VudGVyWDtcclxuICAgICAgICBvdXQueSA9IG5vZGVQb3MueSArIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0Tm9kZXNCeVJvd0NvbCAocm93LCBjb2wpIHtcclxuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddO1xyXG4gICAgICAgIGlmICghcm93RGF0YSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHJvd0RhdGFbY29sXTtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldE5vZGVzQ291bnRCeVJvdyAocm93KSB7XHJcbiAgICAgICAgbGV0IHJvd0RhdGEgPSB0aGlzLl91c2VyTm9kZUdyaWRbcm93XTtcclxuICAgICAgICBpZiAoIXJvd0RhdGEpIHJldHVybiAwO1xyXG4gICAgICAgIHJldHVybiByb3dEYXRhLmNvdW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlQWxsVXNlck5vZGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3VzZXJOb2RlR3JpZCA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGRhdGFJZCBpbiB0aGlzLl91c2VyTm9kZU1hcCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNvbXAgPSB0aGlzLl91c2VyTm9kZU1hcFtkYXRhSWRdO1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKGRhdGFDb21wLm5vZGUsIF92ZWMyX3RlbXApO1xyXG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvblRvUm93Q29sKF92ZWMyX3RlbXAueCwgX3ZlYzJfdGVtcC55LCBfdGVtcFJvd0NvbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZFVzZXJOb2RlVG9HcmlkKGRhdGFDb21wLCBfdGVtcFJvd0NvbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlKGRhdGFDb21wLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUN1bGxpbmdPZmZzZXRCeVVzZXJOb2RlIChub2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RvcE9mZnNldCA8IG5vZGUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IG5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZG93bk9mZnNldCA8IG5vZGUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rvd25PZmZzZXQgPSBub2RlLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xlZnRPZmZzZXQgPCBub2RlLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xlZnRPZmZzZXQgPSBub2RlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmlnaHRPZmZzZXQgPCBub2RlLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gbm9kZS53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF91c2VyTm9kZVNpemVDaGFuZ2UgKCkge1xyXG4gICAgICAgIGxldCBkYXRhQ29tcCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBkYXRhQ29tcC5ub2RlO1xyXG4gICAgICAgIGxldCBzZWxmID0gZGF0YUNvbXAuX3RpbGVkTGF5ZXI7XHJcbiAgICAgICAgc2VsZi5fdXBkYXRlQ3VsbGluZ09mZnNldEJ5VXNlck5vZGUobm9kZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91c2VyTm9kZVBvc0NoYW5nZSAoKSB7XHJcbiAgICAgICAgbGV0IGRhdGFDb21wID0gdGhpcztcclxuICAgICAgICBsZXQgbm9kZSA9IGRhdGFDb21wLm5vZGU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSBkYXRhQ29tcC5fdGlsZWRMYXllcjtcclxuICAgICAgICBzZWxmLl9ub2RlTG9jYWxQb3NUb0xheWVyUG9zKG5vZGUsIF92ZWMyX3RlbXApO1xyXG4gICAgICAgIHNlbGYuX3Bvc2l0aW9uVG9Sb3dDb2woX3ZlYzJfdGVtcC54LCBfdmVjMl90ZW1wLnksIF90ZW1wUm93Q29sKTtcclxuICAgICAgICBzZWxmLl9saW1pdEluTGF5ZXIoX3RlbXBSb3dDb2wpO1xyXG4gICAgICAgIC8vIHVzZXJzIHBvcyBub3QgY2hhbmdlXHJcbiAgICAgICAgaWYgKF90ZW1wUm93Q29sLnJvdyA9PT0gZGF0YUNvbXAuX3JvdyAmJiBfdGVtcFJvd0NvbC5jb2wgPT09IGRhdGFDb21wLl9jb2wpIHJldHVybjtcclxuXHJcbiAgICAgICAgc2VsZi5fcmVtb3ZlVXNlck5vZGVGcm9tR3JpZChkYXRhQ29tcCk7XHJcbiAgICAgICAgc2VsZi5fYWRkVXNlck5vZGVUb0dyaWQoZGF0YUNvbXAsIF90ZW1wUm93Q29sKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZVVzZXJOb2RlRnJvbUdyaWQgKGRhdGFDb21wKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRhdGFDb21wLl9yb3c7XHJcbiAgICAgICAgbGV0IGNvbCA9IGRhdGFDb21wLl9jb2w7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gZGF0YUNvbXAuX2luZGV4O1xyXG5cclxuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddO1xyXG4gICAgICAgIGxldCBjb2xEYXRhID0gcm93RGF0YSAmJiByb3dEYXRhW2NvbF07XHJcbiAgICAgICAgaWYgKGNvbERhdGEpIHtcclxuICAgICAgICAgICAgcm93RGF0YS5jb3VudCAtLTtcclxuICAgICAgICAgICAgY29sRGF0YS5jb3VudCAtLTtcclxuICAgICAgICAgICAgY29sRGF0YS5saXN0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChjb2xEYXRhLmNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbERhdGEubGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgY29sRGF0YS5jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGFDb21wLl9yb3cgPSAtMTtcclxuICAgICAgICBkYXRhQ29tcC5fY29sID0gLTE7XHJcbiAgICAgICAgZGF0YUNvbXAuX2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5fdXNlck5vZGVEaXJ0eSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9saW1pdEluTGF5ZXIgKHJvd0NvbCkge1xyXG4gICAgICAgIGxldCByb3cgPSByb3dDb2wucm93O1xyXG4gICAgICAgIGxldCBjb2wgPSByb3dDb2wuY29sO1xyXG4gICAgICAgIGlmIChyb3cgPCAwKSByb3dDb2wucm93ID0gMDtcclxuICAgICAgICBpZiAocm93ID4gdGhpcy5fcmlnaHRUb3Aucm93KSByb3dDb2wucm93ID0gdGhpcy5fcmlnaHRUb3Aucm93O1xyXG4gICAgICAgIGlmIChjb2wgPCAwKSByb3dDb2wuY29sID0gMDtcclxuICAgICAgICBpZiAoY29sID4gdGhpcy5fcmlnaHRUb3AuY29sKSByb3dDb2wuY29sID0gdGhpcy5fcmlnaHRUb3AuY29sO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYWRkVXNlck5vZGVUb0dyaWQgKGRhdGFDb21wLCB0ZW1wUm93Q29sKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IHRlbXBSb3dDb2wucm93O1xyXG4gICAgICAgIGxldCBjb2wgPSB0ZW1wUm93Q29sLmNvbDtcclxuICAgICAgICBsZXQgcm93RGF0YSA9IHRoaXMuX3VzZXJOb2RlR3JpZFtyb3ddID0gdGhpcy5fdXNlck5vZGVHcmlkW3Jvd10gfHwge2NvdW50IDogMH07XHJcbiAgICAgICAgbGV0IGNvbERhdGEgPSByb3dEYXRhW2NvbF0gPSByb3dEYXRhW2NvbF0gfHwge2NvdW50IDogMCwgbGlzdDogW119O1xyXG4gICAgICAgIGRhdGFDb21wLl9yb3cgPSByb3c7XHJcbiAgICAgICAgZGF0YUNvbXAuX2NvbCA9IGNvbDtcclxuICAgICAgICBkYXRhQ29tcC5faW5kZXggPSBjb2xEYXRhLmxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHJvd0RhdGEuY291bnQrKztcclxuICAgICAgICBjb2xEYXRhLmNvdW50Kys7XHJcbiAgICAgICAgY29sRGF0YS5saXN0LnB1c2goZGF0YUNvbXApO1xyXG4gICAgICAgIHRoaXMuX3VzZXJOb2RlRGlydHkgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaXNVc2VyTm9kZURpcnR5ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXNlck5vZGVEaXJ0eTtcclxuICAgIH0sXHJcblxyXG4gICAgX3NldFVzZXJOb2RlRGlydHkgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fdXNlck5vZGVEaXJ0eSA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3N5bmNBbmNob3JQb2ludCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fc3luY0FuY2hvclBvaW50LCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3N5bmNBbmNob3JQb2ludCAoKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclggPSBub2RlLndpZHRoICogbm9kZS5hbmNob3JYICogbm9kZS5zY2FsZVg7XHJcbiAgICAgICAgdGhpcy5fbGVmdERvd25Ub0NlbnRlclkgPSBub2RlLmhlaWdodCAqIG5vZGUuYW5jaG9yWSAqIG5vZGUuc2NhbGVZO1xyXG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fYnVmZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3JlbmRlckRhdGFMaXN0ID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldHMgdGhlIGxheWVyIG5hbWUuXHJcbiAgICAgKiAhI3poIOiOt+WPluWxgueahOWQjeensOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRMYXllck5hbWVcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsZXQgbGF5ZXJOYW1lID0gdGlsZWRMYXllci5nZXRMYXllck5hbWUoKTtcclxuICAgICAqIGNjLmxvZyhsYXllck5hbWUpO1xyXG4gICAgICovXHJcbiAgICBnZXRMYXllck5hbWUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllck5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGxheWVyIG5hbWUuXHJcbiAgICAgKiAhI3poIOiuvue9ruWxgueahOWQjeensFxyXG4gICAgICogQG1ldGhvZCBTZXRMYXllck5hbWVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYXllck5hbWVcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aWxlZExheWVyLnNldExheWVyTmFtZShcIk5ldyBMYXllclwiKTtcclxuICAgICAqL1xyXG4gICAgc2V0TGF5ZXJOYW1lIChsYXllck5hbWUpIHtcclxuICAgICAgICB0aGlzLl9sYXllck5hbWUgPSBsYXllck5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm4gdGhlIHZhbHVlIGZvciB0aGUgc3BlY2lmaWMgcHJvcGVydHkgbmFtZS5cclxuICAgICAqICEjemgg6I635Y+W5oyH5a6a5bGe5oCn5ZCN55qE5YC844CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHsqfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBwcm9wZXJ0eSA9IHRpbGVkTGF5ZXIuZ2V0UHJvcGVydHkoXCJpbmZvXCIpO1xyXG4gICAgICogY2MubG9nKHByb3BlcnR5KTtcclxuICAgICAqL1xyXG4gICAgZ2V0UHJvcGVydHkgKHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBpbiBwaXhlbHMgb2YgYSBnaXZlbiB0aWxlIGNvb3JkaW5hdGUuXHJcbiAgICAgKiAhI3poIOiOt+WPluaMh+WumiB0aWxlIOeahOWDj+e0oOWdkOagh+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRQb3NpdGlvbkF0XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb3MgcG9zaXRpb24gb3IgeFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XVxyXG4gICAgICogQHJldHVybiB7VmVjMn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsZXQgcG9zID0gdGlsZWRMYXllci5nZXRQb3NpdGlvbkF0KGNjLnYyKDAsIDApKTtcclxuICAgICAqIGNjLmxvZyhcIlBvczogXCIgKyBwb3MpO1xyXG4gICAgICogbGV0IHBvcyA9IHRpbGVkTGF5ZXIuZ2V0UG9zaXRpb25BdCgwLCAwKTtcclxuICAgICAqIGNjLmxvZyhcIlBvczogXCIgKyBwb3MpO1xyXG4gICAgICovXHJcbiAgICBnZXRQb3NpdGlvbkF0IChwb3MsIHkpIHtcclxuICAgICAgICBsZXQgeDtcclxuICAgICAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHggPSBNYXRoLmZsb29yKHBvcyk7XHJcbiAgICAgICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgeCA9IE1hdGguZmxvb3IocG9zLngpO1xyXG4gICAgICAgICAgICB5ID0gTWF0aC5mbG9vcihwb3MueSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZXQ7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9sYXllck9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uT1JUSE86XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLl9wb3NpdGlvbkZvck9ydGhvQXQoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5JU086XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0aGlzLl9wb3NpdGlvbkZvcklzb0F0KHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSEVYOlxyXG4gICAgICAgICAgICAgICAgcmV0ID0gdGhpcy5fcG9zaXRpb25Gb3JIZXhBdCh4LCB5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfaXNJbnZhbGlkUG9zaXRpb24gKHgsIHkpIHtcclxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IHg7XHJcbiAgICAgICAgICAgIHkgPSBwb3MueTtcclxuICAgICAgICAgICAgeCA9IHBvcy54O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geCA+PSB0aGlzLl9sYXllclNpemUud2lkdGggfHwgeSA+PSB0aGlzLl9sYXllclNpemUuaGVpZ2h0IHx8IHggPCAwIHx8IHkgPCAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcG9zaXRpb25Gb3JJc29BdCAoeCwgeSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcbiAgICAgICAgbGV0IGdpZEFuZEZsYWdzID0gdGhpcy5fdGlsZXNbaW5kZXhdO1xyXG4gICAgICAgIGlmIChnaWRBbmRGbGFncykge1xyXG4gICAgICAgICAgICBsZXQgZ2lkID0gKChnaWRBbmRGbGFncyAmIGNjLlRpbGVkTWFwLlRpbGVGbGFnLkZMSVBQRURfTUFTSykgPj4+IDApO1xyXG4gICAgICAgICAgICBsZXQgdGlsZXNldCA9IHRoaXMuX3RleEdyaWRzW2dpZF0udGlsZXNldDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRpbGVzZXQudGlsZU9mZnNldDtcclxuICAgICAgICAgICAgb2Zmc2V0WCA9IG9mZnNldC54O1xyXG4gICAgICAgICAgICBvZmZzZXRZID0gb2Zmc2V0Lnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY2MudjIoXHJcbiAgICAgICAgICAgIHRoaXMuX21hcFRpbGVTaXplLndpZHRoICogMC41ICogKHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQgKyB4IC0geSAtIDEpICsgb2Zmc2V0WCxcclxuICAgICAgICAgICAgdGhpcy5fbWFwVGlsZVNpemUuaGVpZ2h0ICogMC41ICogKHRoaXMuX2xheWVyU2l6ZS53aWR0aCAtIHggKyB0aGlzLl9sYXllclNpemUuaGVpZ2h0IC0geSAtIDIpIC0gb2Zmc2V0WVxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wb3NpdGlvbkZvck9ydGhvQXQgKHgsIHkpIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xyXG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoeCkgKyBNYXRoLmZsb29yKHkpICogdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xyXG4gICAgICAgIGxldCBnaWRBbmRGbGFncyA9IHRoaXMuX3RpbGVzW2luZGV4XTtcclxuICAgICAgICBpZiAoZ2lkQW5kRmxhZ3MpIHtcclxuICAgICAgICAgICAgbGV0IGdpZCA9ICgoZ2lkQW5kRmxhZ3MgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwKTtcclxuICAgICAgICAgICAgbGV0IHRpbGVzZXQgPSB0aGlzLl90ZXhHcmlkc1tnaWRdLnRpbGVzZXQ7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aWxlc2V0LnRpbGVPZmZzZXQ7XHJcbiAgICAgICAgICAgIG9mZnNldFggPSBvZmZzZXQueDtcclxuICAgICAgICAgICAgb2Zmc2V0WSA9IG9mZnNldC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKFxyXG4gICAgICAgICAgICB4ICogdGhpcy5fbWFwVGlsZVNpemUud2lkdGggKyBvZmZzZXRYLFxyXG4gICAgICAgICAgICAodGhpcy5fbGF5ZXJTaXplLmhlaWdodCAtIHkgLSAxKSAqIHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCAtIG9mZnNldFlcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcG9zaXRpb25Gb3JIZXhBdCAoY29sLCByb3cpIHtcclxuICAgICAgICBsZXQgdGlsZVdpZHRoID0gdGhpcy5fbWFwVGlsZVNpemUud2lkdGg7XHJcbiAgICAgICAgbGV0IHRpbGVIZWlnaHQgPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHJvd3MgPSB0aGlzLl9sYXllclNpemUuaGVpZ2h0O1xyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKGNvbCkgKyBNYXRoLmZsb29yKHJvdykgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcbiAgICAgICAgbGV0IGdpZCA9IHRoaXMuX3RpbGVzW2luZGV4XTtcclxuICAgICAgICBsZXQgb2Zmc2V0O1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXhHcmlkc1tnaWRdKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHRoaXMuX3RleEdyaWRzW2dpZF0udGlsZXNldC50aWxlT2Zmc2V0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHsgeDogMCwgeTogMCB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2RkX2V2ZW4gPSAodGhpcy5fc3RhZ2dlckluZGV4ID09PSBjYy5UaWxlZE1hcC5TdGFnZ2VySW5kZXguU1RBR0dFUklOREVYX09ERCkgPyAxIDogLTE7XHJcbiAgICAgICAgbGV0IHggPSAwLCB5ID0gMDtcclxuICAgICAgICBsZXQgZGlmZlggPSAwO1xyXG4gICAgICAgIGxldCBkaWZmWSA9IDA7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFnZ2VyQXhpcykge1xyXG4gICAgICAgICAgICBjYXNlIGNjLlRpbGVkTWFwLlN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1k6XHJcbiAgICAgICAgICAgICAgICBkaWZmWCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAocm93ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZYID0gdGlsZVdpZHRoIC8gMiAqIG9kZF9ldmVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeCA9IGNvbCAqIHRpbGVXaWR0aCArIGRpZmZYICsgb2Zmc2V0Lng7XHJcbiAgICAgICAgICAgICAgICB5ID0gKHJvd3MgLSByb3cgLSAxKSAqICh0aWxlSGVpZ2h0IC0gKHRpbGVIZWlnaHQgLSB0aGlzLl9oZXhTaWRlTGVuZ3RoKSAvIDIpIC0gb2Zmc2V0Lnk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19YOlxyXG4gICAgICAgICAgICAgICAgZGlmZlkgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbCAlIDIgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaWZmWSA9IHRpbGVIZWlnaHQgLyAyICogLW9kZF9ldmVuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeCA9IGNvbCAqICh0aWxlV2lkdGggLSAodGlsZVdpZHRoIC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyKSArIG9mZnNldC54O1xyXG4gICAgICAgICAgICAgICAgeSA9IChyb3dzIC0gcm93IC0gMSkgKiB0aWxlSGVpZ2h0ICsgZGlmZlkgLSBvZmZzZXQueTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0cyB0aGUgdGlsZXMgZ2lkIChnaWQgPSB0aWxlIGdsb2JhbCBpZCkgYXQgYSBnaXZlbiB0aWxlcyByZWN0LlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6+572u57uZ5a6a5Yy65Z+f55qEIHRpbGUg55qEIGdpZCAoZ2lkID0gdGlsZSDlhajlsYAgaWQp77yMXHJcbiAgICAgKiBAbWV0aG9kIHNldFRpbGVzR0lEQXRcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGdpZHMgYW4gYXJyYXkgY29udGFpbnMgZ2lkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYmVnaW5Db2wgYmVnaW4gY29sIG51bWJlclxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJlZ2luUm93IGJlZ2luIHJvdyBudW1iZXJcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0b3RhbENvbHMgY291bnQgb2YgY29sdW1uXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdGlsZWRMYXllci5zZXRUaWxlc0dJREF0KFsxLCAxLCAxLCAxXSwgMTAsIDEwLCAyKVxyXG4gICAgICovXHJcbiAgICBzZXRUaWxlc0dJREF0IChnaWRzLCBiZWdpbkNvbCwgYmVnaW5Sb3csIHRvdGFsQ29scykge1xyXG4gICAgICAgIGlmICghZ2lkcyB8fCBnaWRzLmxlbmd0aCA9PT0gMCB8fCB0b3RhbENvbHMgPD0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChiZWdpblJvdyA8IDApIGJlZ2luUm93ID0gMDtcclxuICAgICAgICBpZiAoYmVnaW5Db2wgPCAwKSBiZWdpbkNvbCA9IDA7XHJcbiAgICAgICAgbGV0IGdpZHNJZHggPSAwO1xyXG4gICAgICAgIGxldCBlbmRDb2wgPSBiZWdpbkNvbCArIHRvdGFsQ29scztcclxuICAgICAgICBmb3IgKGxldCByb3cgPSBiZWdpblJvdzsgOyByb3crKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSBiZWdpbkNvbDsgY29sIDwgZW5kQ29sOyBjb2wrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdpZHNJZHggPj0gZ2lkcy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRpbGVGb3JHSUQoZ2lkc1tnaWRzSWR4XSwgY29sLCByb3cpO1xyXG4gICAgICAgICAgICAgICAgZ2lkc0lkeCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFNldHMgdGhlIHRpbGUgZ2lkIChnaWQgPSB0aWxlIGdsb2JhbCBpZCkgYXQgYSBnaXZlbiB0aWxlIGNvb3JkaW5hdGUuPGJyIC8+XHJcbiAgICAgKiBUaGUgVGlsZSBHSUQgY2FuIGJlIG9idGFpbmVkIGJ5IHVzaW5nIHRoZSBtZXRob2QgXCJ0aWxlR0lEQXRcIiBvciBieSB1c2luZyB0aGUgVE1YIGVkaXRvciAuIFRpbGVzZXQgTWdyICsxLjxiciAvPlxyXG4gICAgICogSWYgYSB0aWxlIGlzIGFscmVhZHkgcGxhY2VkIGF0IHRoYXQgcG9zaXRpb24sIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog6K6+572u57uZ5a6a5Z2Q5qCH55qEIHRpbGUg55qEIGdpZCAoZ2lkID0gdGlsZSDlhajlsYAgaWQp77yMXHJcbiAgICAgKiB0aWxlIOeahCBHSUQg5Y+v5Lul5L2/55So5pa55rOVIOKAnHRpbGVHSURBdOKAnSDmnaXojrflvpfjgII8YnIgLz5cclxuICAgICAqIOWmguaenOS4gOS4qiB0aWxlIOW3sue7j+aUvuWcqOmCo+S4quS9jee9ru+8jOmCo+S5iOWug+Wwhuiiq+WIoOmZpOOAglxyXG4gICAgICogQG1ldGhvZCBzZXRUaWxlR0lEQXRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBnaWRcclxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvc09yWCBwb3NpdGlvbiBvciB4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZmxhZ3NPclkgZmxhZ3Mgb3IgeVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtmbGFnc11cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB0aWxlZExheWVyLnNldFRpbGVHSURBdCgxMDAxLCAxMCwgMTAsIDEpXHJcbiAgICAgKi9cclxuICAgIHNldFRpbGVHSURBdCAoZ2lkLCBwb3NPclgsIGZsYWdzT3JZLCBmbGFncykge1xyXG4gICAgICAgIGlmIChwb3NPclggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYy5UaWxlZExheWVyLnNldFRpbGVHSURBdCgpOiBwb3Mgc2hvdWxkIGJlIG5vbi1udWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9zO1xyXG4gICAgICAgIGlmIChmbGFncyAhPT0gdW5kZWZpbmVkIHx8ICEocG9zT3JYIGluc3RhbmNlb2YgY2MuVmVjMikpIHtcclxuICAgICAgICAgICAgLy8gZm91ciBwYXJhbWV0ZXJzIG9yIHBvc09yWCBpcyBub3QgYSBWZWMyIG9iamVjdFxyXG4gICAgICAgICAgICBfdmVjMl90ZW1wMy54ID0gcG9zT3JYO1xyXG4gICAgICAgICAgICBfdmVjMl90ZW1wMy55ID0gZmxhZ3NPclk7XHJcbiAgICAgICAgICAgIHBvcyA9IF92ZWMyX3RlbXAzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcyA9IHBvc09yWDtcclxuICAgICAgICAgICAgZmxhZ3MgPSBmbGFnc09yWTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVnaWQgPSBnaWQgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0s7XHJcblxyXG4gICAgICAgIHBvcy54ID0gTWF0aC5mbG9vcihwb3MueCk7XHJcbiAgICAgICAgcG9zLnkgPSBNYXRoLmZsb29yKHBvcy55KTtcclxuICAgICAgICBpZiAodGhpcy5faXNJbnZhbGlkUG9zaXRpb24ocG9zKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYy5UaWxlZExheWVyLnNldFRpbGVHSURBdCgpOiBpbnZhbGlkIHBvc2l0aW9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX3RpbGVzIHx8ICF0aGlzLl90aWxlc2V0cyB8fCB0aGlzLl90aWxlc2V0cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBjYy5sb2dJRCg3MjM4KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodWdpZCAhPT0gMCAmJiB1Z2lkIDwgdGhpcy5fdGlsZXNldHNbMF0uZmlyc3RHaWQpIHtcclxuICAgICAgICAgICAgY2MubG9nSUQoNzIzOSwgZ2lkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmxhZ3MgPSBmbGFncyB8fCAwO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbGVGb3JHSUQoIChnaWQgfCBmbGFncykgPj4+IDAsIHBvcy54LCBwb3MueSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91cGRhdGVUaWxlRm9yR0lEIChnaWRBbmRGbGFncywgeCwgeSkge1xyXG4gICAgICAgIGxldCBpZHggPSAwIHwgKHggKyB5ICogdGhpcy5fbGF5ZXJTaXplLndpZHRoKTtcclxuICAgICAgICBpZiAoaWR4ID49IHRoaXMuX3RpbGVzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgb2xkR0lEQW5kRmxhZ3MgPSB0aGlzLl90aWxlc1tpZHhdO1xyXG4gICAgICAgIGlmIChnaWRBbmRGbGFncyA9PT0gb2xkR0lEQW5kRmxhZ3MpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGdpZCA9ICgoZ2lkQW5kRmxhZ3MgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0spID4+PiAwKTtcclxuICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuX3RleEdyaWRzW2dpZF07XHJcbiAgICAgICAgbGV0IHRpbGVzZXRJZHggPSBncmlkICYmIGdyaWQudGV4SWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGdyaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlsZXNbaWR4XSA9IGdpZEFuZEZsYWdzO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWZXJ0ZXgoeCwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTWF0ZXJpYWwodGlsZXNldElkeCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlsZXNbaWR4XSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2N1bGxpbmdEaXJ0eSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgdGlsZXMgZGF0YS5BbiBhcnJheSBmaWxsIHdpdGggR0lEcy4gPGJyIC8+XHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDov5Tlm54gdGlsZXMg5pWw5o2uLiDnlLFHSUTmnoTmiJDnmoTkuIDkuKrmlbDnu4QuIDxiciAvPlxyXG4gICAgICogQG1ldGhvZCBnZXRUaWxlc1xyXG4gICAgICogQHJldHVybiB7TnVtYmVyW119XHJcbiAgICAgKi9cclxuICAgIGdldFRpbGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlcztcclxuICAgIH0sXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgdGlsZSBnaWQgYXQgYSBnaXZlbiB0aWxlIGNvb3JkaW5hdGUuIDxiciAvPlxyXG4gICAgICogaWYgaXQgcmV0dXJucyAwLCBpdCBtZWFucyB0aGF0IHRoZSB0aWxlIGlzIGVtcHR5LiA8YnIgLz5cclxuICAgICAqICEjemhcclxuICAgICAqIOmAmui/h+e7meWumueahCB0aWxlIOWdkOagh+OAgWZsYWdz77yI5Y+v6YCJ77yJ6L+U5ZueIHRpbGUg55qEIEdJRC4gPGJyIC8+XHJcbiAgICAgKiDlpoLmnpzlroPov5Tlm54gMO+8jOWImeihqOekuuivpSB0aWxlIOS4uuepuuOAgjxiciAvPlxyXG4gICAgICogQG1ldGhvZCBnZXRUaWxlR0lEQXRcclxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvcyBvciB4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHRpbGVHaWQgPSB0aWxlZExheWVyLmdldFRpbGVHSURBdCgwLCAwKTtcclxuICAgICAqL1xyXG4gICAgZ2V0VGlsZUdJREF0IChwb3MsIHkpIHtcclxuICAgICAgICBpZiAocG9zID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2MuVGlsZWRMYXllci5nZXRUaWxlR0lEQXQoKTogcG9zIHNob3VsZCBiZSBub24tbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHggPSBwb3M7XHJcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB4ID0gcG9zLng7XHJcbiAgICAgICAgICAgIHkgPSBwb3MueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzSW52YWxpZFBvc2l0aW9uKHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNjLlRpbGVkTGF5ZXIuZ2V0VGlsZUdJREF0KCk6IGludmFsaWQgcG9zaXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMpIHtcclxuICAgICAgICAgICAgY2MubG9nSUQoNzIzNyk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcbiAgICAgICAgLy8gQml0cyBvbiB0aGUgZmFyIGVuZCBvZiB0aGUgMzItYml0IGdsb2JhbCB0aWxlIElEIGFyZSB1c2VkIGZvciB0aWxlIGZsYWdzXHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl90aWxlc1tpbmRleF07XHJcblxyXG4gICAgICAgIHJldHVybiAodGlsZSAmIGNjLlRpbGVkTWFwLlRpbGVGbGFnLkZMSVBQRURfTUFTSykgPj4+IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFRpbGVGbGFnc0F0IChwb3MsIHkpIHtcclxuICAgICAgICBpZiAoIXBvcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaWxlZExheWVyLmdldFRpbGVGbGFnc0F0OiBwb3Mgc2hvdWxkIGJlIG5vbi1udWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBvcyA9IGNjLnYyKHBvcywgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9pc0ludmFsaWRQb3NpdGlvbihwb3MpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGVkTGF5ZXIuZ2V0VGlsZUZsYWdzQXQ6IGludmFsaWQgcG9zaXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMpIHtcclxuICAgICAgICAgICAgY2MubG9nSUQoNzI0MCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlkeCA9IE1hdGguZmxvb3IocG9zLngpICsgTWF0aC5mbG9vcihwb3MueSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcbiAgICAgICAgLy8gQml0cyBvbiB0aGUgZmFyIGVuZCBvZiB0aGUgMzItYml0IGdsb2JhbCB0aWxlIElEIGFyZSB1c2VkIGZvciB0aWxlIGZsYWdzXHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl90aWxlc1tpZHhdO1xyXG5cclxuICAgICAgICByZXR1cm4gKHRpbGUgJiBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX0FMTCkgPj4+IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9zZXRDdWxsaW5nRGlydHkgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9pc0N1bGxpbmdEaXJ0eSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1bGxpbmdEaXJ0eTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gJ3gsIHknIGlzIHRoZSBwb3NpdGlvbiBvZiB2aWV3UG9ydCwgd2hpY2gncyBhbmNob3IgcG9pbnQgaXMgYXQgdGhlIGNlbnRlciBvZiByZWN0LlxyXG4gICAgLy8gJ3dpZHRoLCBoZWlnaHQnIGlzIHRoZSBzaXplIG9mIHZpZXdQb3J0LlxyXG4gICAgX3VwZGF0ZVZpZXdQb3J0ICh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdQb3J0LndpZHRoID09PSB3aWR0aCAmJiBcclxuICAgICAgICAgICAgdGhpcy5fdmlld1BvcnQuaGVpZ2h0ID09PSBoZWlnaHQgJiZcclxuICAgICAgICAgICAgdGhpcy5fdmlld1BvcnQueCA9PT0geCAmJlxyXG4gICAgICAgICAgICB0aGlzLl92aWV3UG9ydC55ID09PSB5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdmlld1BvcnQueCA9IHg7XHJcbiAgICAgICAgdGhpcy5fdmlld1BvcnQueSA9IHk7XHJcbiAgICAgICAgdGhpcy5fdmlld1BvcnQud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLl92aWV3UG9ydC5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgICAgIC8vIGlmIG1hcCdzIHR5cGUgaXMgaXNvLCByZXNlcnZlIGJvdHRvbSBsaW5lIGlzIDIgdG8gYXZvaWQgc2hvdyBlbXB0eSBncmlkIGJlY2F1c2Ugb2YgaXNvIGdyaWQgYXJpdGhtZXRpY1xyXG4gICAgICAgIGxldCByZXNlcnZlTGluZSA9IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyT3JpZW50YXRpb24gPT09IGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLklTTykge1xyXG4gICAgICAgICAgICByZXNlcnZlTGluZSA9IDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdnB4ID0gdGhpcy5fdmlld1BvcnQueCAtIHRoaXMuX29mZnNldC54ICsgdGhpcy5fbGVmdERvd25Ub0NlbnRlclg7XHJcbiAgICAgICAgbGV0IHZweSA9IHRoaXMuX3ZpZXdQb3J0LnkgLSB0aGlzLl9vZmZzZXQueSArIHRoaXMuX2xlZnREb3duVG9DZW50ZXJZO1xyXG5cclxuICAgICAgICBsZXQgbGVmdERvd25YID0gdnB4IC0gdGhpcy5fbGVmdE9mZnNldDtcclxuICAgICAgICBsZXQgbGVmdERvd25ZID0gdnB5IC0gdGhpcy5fZG93bk9mZnNldDtcclxuICAgICAgICBsZXQgcmlnaHRUb3BYID0gdnB4ICsgd2lkdGggKyB0aGlzLl9yaWdodE9mZnNldDtcclxuICAgICAgICBsZXQgcmlnaHRUb3BZID0gdnB5ICsgaGVpZ2h0ICsgdGhpcy5fdG9wT2Zmc2V0O1xyXG5cclxuICAgICAgICBsZXQgbGVmdERvd24gPSB0aGlzLl9jdWxsaW5nUmVjdC5sZWZ0RG93bjtcclxuICAgICAgICBsZXQgcmlnaHRUb3AgPSB0aGlzLl9jdWxsaW5nUmVjdC5yaWdodFRvcDtcclxuXHJcbiAgICAgICAgaWYgKGxlZnREb3duWCA8IDApIGxlZnREb3duWCA9IDA7XHJcbiAgICAgICAgaWYgKGxlZnREb3duWSA8IDApIGxlZnREb3duWSA9IDA7XHJcblxyXG4gICAgICAgIC8vIGNhbGMgbGVmdCBkb3duXHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChsZWZ0RG93blgsIGxlZnREb3duWSwgX3RlbXBSb3dDb2wpO1xyXG4gICAgICAgIC8vIG1ha2UgcmFuZ2UgbGFyZ2VcclxuICAgICAgICBfdGVtcFJvd0NvbC5yb3ctPXJlc2VydmVMaW5lO1xyXG4gICAgICAgIF90ZW1wUm93Q29sLmNvbC09cmVzZXJ2ZUxpbmU7XHJcbiAgICAgICAgLy8gaW5zdXJlIGxlZnQgZG93biByb3cgY29sIGdyZWF0ZXIgdGhhbiAwXHJcbiAgICAgICAgX3RlbXBSb3dDb2wucm93ID0gX3RlbXBSb3dDb2wucm93ID4gMCA/IF90ZW1wUm93Q29sLnJvdyA6IDA7XHJcbiAgICAgICAgX3RlbXBSb3dDb2wuY29sID0gX3RlbXBSb3dDb2wuY29sID4gMCA/IF90ZW1wUm93Q29sLmNvbCA6IDA7ICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKF90ZW1wUm93Q29sLnJvdyAhPT0gbGVmdERvd24ucm93IHx8IF90ZW1wUm93Q29sLmNvbCAhPT0gbGVmdERvd24uY29sKSB7XHJcbiAgICAgICAgICAgIGxlZnREb3duLnJvdyA9IF90ZW1wUm93Q29sLnJvdztcclxuICAgICAgICAgICAgbGVmdERvd24uY29sID0gX3RlbXBSb3dDb2wuY29sO1xyXG4gICAgICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2hvdyBub3RoaW5nXHJcbiAgICAgICAgaWYgKHJpZ2h0VG9wWCA8IDAgfHwgcmlnaHRUb3BZIDwgMCkge1xyXG4gICAgICAgICAgICBfdGVtcFJvd0NvbC5yb3cgPSAtMTtcclxuICAgICAgICAgICAgX3RlbXBSb3dDb2wuY29sID0gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY2FsYyByaWdodCB0b3BcclxuICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25Ub1Jvd0NvbChyaWdodFRvcFgsIHJpZ2h0VG9wWSwgX3RlbXBSb3dDb2wpO1xyXG4gICAgICAgICAgICAvLyBtYWtlIHJhbmdlIGxhcmdlXHJcbiAgICAgICAgICAgIF90ZW1wUm93Q29sLnJvdysrO1xyXG4gICAgICAgICAgICBfdGVtcFJvd0NvbC5jb2wrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGF2b2lkIHJhbmdlIG91dCBvZiBtYXggcmVjdFxyXG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5yb3cgPiB0aGlzLl9yaWdodFRvcC5yb3cpIF90ZW1wUm93Q29sLnJvdyA9IHRoaXMuX3JpZ2h0VG9wLnJvdztcclxuICAgICAgICBpZiAoX3RlbXBSb3dDb2wuY29sID4gdGhpcy5fcmlnaHRUb3AuY29sKSBfdGVtcFJvd0NvbC5jb2wgPSB0aGlzLl9yaWdodFRvcC5jb2w7XHJcblxyXG4gICAgICAgIGlmIChfdGVtcFJvd0NvbC5yb3cgIT09IHJpZ2h0VG9wLnJvdyB8fCBfdGVtcFJvd0NvbC5jb2wgIT09IHJpZ2h0VG9wLmNvbCkge1xyXG4gICAgICAgICAgICByaWdodFRvcC5yb3cgPSBfdGVtcFJvd0NvbC5yb3c7XHJcbiAgICAgICAgICAgIHJpZ2h0VG9wLmNvbCA9IF90ZW1wUm93Q29sLmNvbDtcclxuICAgICAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHRoZSByZXN1bHQgbWF5IG5vdCBwcmVjaXNlLCBidXQgaXQgZG9zZSd0IG1hdHRlciwgaXQganVzdCB1c2VzIHRvIGJlIGdvdCByYW5nZVxyXG4gICAgX3Bvc2l0aW9uVG9Sb3dDb2wgKHgsIHksIHJlc3VsdCkge1xyXG4gICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XHJcbiAgICAgICAgY29uc3QgT3JpZW50YXRpb24gPSBUaWxlZE1hcC5PcmllbnRhdGlvbjtcclxuICAgICAgICBjb25zdCBTdGFnZ2VyQXhpcyA9IFRpbGVkTWFwLlN0YWdnZXJBeGlzO1xyXG5cclxuICAgICAgICBsZXQgbWFwdHcgPSB0aGlzLl9tYXBUaWxlU2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgbWFwdGggPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIG1hcHR3MiA9IG1hcHR3ICogMC41LFxyXG4gICAgICAgICAgICBtYXB0aDIgPSBtYXB0aCAqIDAuNTtcclxuICAgICAgICBsZXQgcm93ID0gMCwgY29sID0gMCwgZGlmZlgyID0gMCwgZGlmZlkyID0gMCwgYXhpcyA9IHRoaXMuX3N0YWdnZXJBeGlzO1xyXG4gICAgICAgIGxldCBjb2xzID0gdGhpcy5fbGF5ZXJTaXplLndpZHRoO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2xheWVyT3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgLy8gbGVmdCB0b3AgdG8gcmlnaHQgZG93bVxyXG4gICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uLk9SVEhPOlxyXG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5mbG9vcih4IC8gbWFwdHcpO1xyXG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcih5IC8gbWFwdGgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIHJpZ2h0IHRvcCB0byBsZWZ0IGRvd25cclxuICAgICAgICAgICAgLy8gaXNvIGNhbiBiZSB0cmVhdCBhcyBzcGVjaWFsIGhleCB3aG9zZSBoZXggc2lkZSBsZW5ndGggaXMgMFxyXG4gICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uLklTTzpcclxuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoeCAvIG1hcHR3Mik7XHJcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKHkgLyBtYXB0aDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wIHRvIHJpZ2h0IGRvd21cclxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5IRVg6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXhpcyA9PT0gU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoeSAvIChtYXB0aCAtIHRoaXMuX2RpZmZZMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZYMiA9IHJvdyAlIDIgPT09IDEgPyBtYXB0dzIgKiB0aGlzLl9vZGRfZXZlbiA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sID0gTWF0aC5mbG9vcigoeCAtIGRpZmZYMikgLyBtYXB0dyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguZmxvb3IoeCAvIChtYXB0dyAtIHRoaXMuX2RpZmZYMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZmZZMiA9IGNvbCAlIDIgPT09IDEgPyBtYXB0aDIgKiAtdGhpcy5fb2RkX2V2ZW4gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoKHkgLSBkaWZmWTIpIC8gbWFwdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5yb3cgPSByb3c7XHJcbiAgICAgICAgcmVzdWx0LmNvbCA9IGNvbDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlQ3VsbGluZyAoKSB7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUN1bGxpbmcoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZW5hYmxlQ3VsbGluZykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XHJcbiAgICAgICAgICAgIE1hdDQuaW52ZXJ0KF9tYXQ0X3RlbXAsIHRoaXMubm9kZS5fd29ybGRNYXRyaXgpO1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGNjLnZpc2libGVSZWN0O1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhID0gY2MuQ2FtZXJhLmZpbmRDYW1lcmEodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgaWYgKGNhbWVyYSkge1xyXG4gICAgICAgICAgICAgICAgX3ZlYzJfdGVtcC54ID0gMDtcclxuICAgICAgICAgICAgICAgIF92ZWMyX3RlbXAueSA9IDA7XHJcbiAgICAgICAgICAgICAgICBfdmVjMl90ZW1wMi54ID0gX3ZlYzJfdGVtcC54ICsgcmVjdC53aWR0aDtcclxuICAgICAgICAgICAgICAgIF92ZWMyX3RlbXAyLnkgPSBfdmVjMl90ZW1wLnkgKyByZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQoX3ZlYzJfdGVtcCwgX3ZlYzJfdGVtcCk7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEuZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KF92ZWMyX3RlbXAyLCBfdmVjMl90ZW1wMik7XHJcbiAgICAgICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQoX3ZlYzJfdGVtcCwgX3ZlYzJfdGVtcCwgX21hdDRfdGVtcCk7XHJcbiAgICAgICAgICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQoX3ZlYzJfdGVtcDIsIF92ZWMyX3RlbXAyLCBfbWF0NF90ZW1wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZXdQb3J0KF92ZWMyX3RlbXAueCwgX3ZlYzJfdGVtcC55LCBfdmVjMl90ZW1wMi54IC0gX3ZlYzJfdGVtcC54LCBfdmVjMl90ZW1wMi55IC0gX3ZlYzJfdGVtcC55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIExheWVyIG9yaWVudGF0aW9uLCB3aGljaCBpcyB0aGUgc2FtZSBhcyB0aGUgbWFwIG9yaWVudGF0aW9uLlxyXG4gICAgICogISN6aCDojrflj5YgTGF5ZXIg5pa55ZCRKOWQjOWcsOWbvuaWueWQkSnjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJPcmllbnRhdGlvblxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBvcmllbnRhdGlvbiA9IHRpbGVkTGF5ZXIuZ2V0TGF5ZXJPcmllbnRhdGlvbigpO1xyXG4gICAgICogY2MubG9nKFwiTGF5ZXIgT3JpZW50YXRpb246IFwiICsgb3JpZW50YXRpb24pO1xyXG4gICAgICovXHJcbiAgICBnZXRMYXllck9yaWVudGF0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJPcmllbnRhdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHByb3BlcnRpZXMgZnJvbSB0aGUgbGF5ZXIuIFRoZXkgY2FuIGJlIGFkZGVkIHVzaW5nIFRpbGVkLlxyXG4gICAgICogISN6aCDojrflj5YgbGF5ZXIg55qE5bGe5oCn77yM5Y+v5Lul5L2/55SoIFRpbGVkIOe8lui+keWZqOa3u+WKoOWxnuaAp+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRQcm9wZXJ0aWVzXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHByb3BlcnRpZXMgPSB0aWxlZExheWVyLmdldFByb3BlcnRpZXMoKTtcclxuICAgICAqIGNjLmxvZyhcIlByb3BlcnRpZXM6IFwiICsgcHJvcGVydGllcyk7XHJcbiAgICAgKi9cclxuICAgIGdldFByb3BlcnRpZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVmVydGV4IChjb2wsIHJvdykge1xyXG4gICAgICAgIGNvbnN0IFRpbGVkTWFwID0gY2MuVGlsZWRNYXA7XHJcbiAgICAgICAgY29uc3QgVGlsZUZsYWcgPSBUaWxlZE1hcC5UaWxlRmxhZztcclxuICAgICAgICBjb25zdCBGTElQUEVEX01BU0sgPSBUaWxlRmxhZy5GTElQUEVEX01BU0s7XHJcbiAgICAgICAgY29uc3QgU3RhZ2dlckF4aXMgPSBUaWxlZE1hcC5TdGFnZ2VyQXhpcztcclxuICAgICAgICBjb25zdCBPcmllbnRhdGlvbiA9IFRpbGVkTWFwLk9yaWVudGF0aW9uO1xyXG5cclxuICAgICAgICBsZXQgdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcztcclxuXHJcbiAgICAgICAgbGV0IGxheWVyT3JpZW50YXRpb24gPSB0aGlzLl9sYXllck9yaWVudGF0aW9uLFxyXG4gICAgICAgICAgICB0aWxlcyA9IHRoaXMuX3RpbGVzO1xyXG5cclxuICAgICAgICBpZiAoIXRpbGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByaWdodFRvcCA9IHRoaXMuX3JpZ2h0VG9wO1xyXG4gICAgICAgIGxldCBtYXB0dyA9IHRoaXMuX21hcFRpbGVTaXplLndpZHRoLFxyXG4gICAgICAgICAgICBtYXB0aCA9IHRoaXMuX21hcFRpbGVTaXplLmhlaWdodCxcclxuICAgICAgICAgICAgbWFwdHcyID0gbWFwdHcgKiAwLjUsXHJcbiAgICAgICAgICAgIG1hcHRoMiA9IG1hcHRoICogMC41LFxyXG4gICAgICAgICAgICByb3dzID0gdGhpcy5fbGF5ZXJTaXplLmhlaWdodCxcclxuICAgICAgICAgICAgY29scyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aCxcclxuICAgICAgICAgICAgZ3JpZHMgPSB0aGlzLl90ZXhHcmlkcztcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZ2lkLCBncmlkLCBsZWZ0LCBib3R0b20sXHJcbiAgICAgICAgICAgIGF4aXMsIGRpZmZYMSwgZGlmZlkxLCBvZGRfZXZlbiwgZGlmZlgyLCBkaWZmWTI7XHJcblxyXG4gICAgICAgIGlmIChsYXllck9yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5IRVgpIHtcclxuICAgICAgICAgICAgYXhpcyA9IHRoaXMuX3N0YWdnZXJBeGlzO1xyXG4gICAgICAgICAgICBkaWZmWDEgPSB0aGlzLl9kaWZmWDE7XHJcbiAgICAgICAgICAgIGRpZmZZMSA9IHRoaXMuX2RpZmZZMTtcclxuICAgICAgICAgICAgb2RkX2V2ZW4gPSB0aGlzLl9vZGRfZXZlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdWxsaW5nQ29sID0gMCwgY3VsbGluZ1JvdyA9IDA7XHJcbiAgICAgICAgbGV0IHRpbGVPZmZzZXQgPSBudWxsLCBncmlkR0lEID0gMDtcclxuXHJcbiAgICAgICAgLy8gZ3JpZCBib3JkZXJcclxuICAgICAgICBsZXQgdG9wQm9yZGVyID0gMCwgZG93bkJvcmRlciA9IDAsIGxlZnRCb3JkZXIgPSAwLCByaWdodEJvcmRlciA9IDA7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gcm93ICogY29scyArIGNvbDtcclxuICAgICAgICBnaWQgPSB0aWxlc1tpbmRleF07XHJcbiAgICAgICAgZ3JpZEdJRCA9ICgoZ2lkICYgRkxJUFBFRF9NQVNLKSA+Pj4gMCk7XHJcbiAgICAgICAgZ3JpZCA9IGdyaWRzW2dyaWRHSURdO1xyXG4gICAgICAgIGlmICghZ3JpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiBoYXMgYW5pbWF0aW9uLCBncmlkIG11c3QgYmUgdXBkYXRlZCBwZXIgZnJhbWVcclxuICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uc1tncmlkR0lEXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNBbmlHcmlkID0gdGhpcy5faGFzQW5pR3JpZCB8fCB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChsYXllck9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZnQgdG9wIHRvIHJpZ2h0IGRvd21cclxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5PUlRITzpcclxuICAgICAgICAgICAgICAgIGN1bGxpbmdDb2wgPSBjb2w7XHJcbiAgICAgICAgICAgICAgICBjdWxsaW5nUm93ID0gcm93cyAtIHJvdyAtIDE7XHJcbiAgICAgICAgICAgICAgICBsZWZ0ID0gY3VsbGluZ0NvbCAqIG1hcHR3O1xyXG4gICAgICAgICAgICAgICAgYm90dG9tID0gY3VsbGluZ1JvdyAqIG1hcHRoO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIHJpZ2h0IHRvcCB0byBsZWZ0IGRvd25cclxuICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvbi5JU086XHJcbiAgICAgICAgICAgIFx0Ly8gaWYgbm90IGNvbnNpZGVyIGFib3V0IGNvbCwgdGhlbiBsZWZ0IGlzICd3LzIgKiAocm93cyAtIHJvdyAtIDEpJ1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgY29uc2lkZXIgYWJvdXQgY29sIHRoZW4gbGVmdCBtdXN0IGFkZCAndy8yICogY29sJ1xyXG4gICAgICAgICAgICAgICAgLy8gc28gbGVmdCBpcyAndy8yICogKHJvd3MgLSByb3cgLSAxKSArIHcvMiAqIGNvbCdcclxuICAgICAgICAgICAgICAgIC8vIGNvbWJpbmUgZXhwcmVzc2lvbiBpcyAndy8yICogKHJvd3MgLSByb3cgKyBjb2wgLTEpJ1xyXG4gICAgICAgICAgICAgICAgY3VsbGluZ0NvbCA9IHJvd3MgKyBjb2wgLSByb3cgLSAxO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgbm90IGNvbnNpZGVyIGFib3V0IHJvdywgdGhlbiBib3R0b20gaXMgJ2gvMiAqIChjb2xzIC0gY29sIC0xKSdcclxuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnNpZGVyIGFib3V0IHJvdyB0aGVuIGJvdHRvbSBtdXN0IGFkZCAnaC8yICogKHJvd3MgLSByb3cgLSAxKSdcclxuICAgICAgICAgICAgICAgIC8vIHNvIGJvdHRvbSBpcyAnaC8yICogKGNvbHMgLSBjb2wgLTEpICsgaC8yICogKHJvd3MgLSByb3cgLSAxKSdcclxuICAgICAgICAgICAgICAgIC8vIGNvbWJpbmUgZXhwcmVzc2lvbm4gaXMgJ2gvMiAqIChyb3dzICsgY29scyAtIGNvbCAtIHJvdyAtIDIpJ1xyXG4gICAgICAgICAgICAgICAgY3VsbGluZ1JvdyA9IHJvd3MgKyBjb2xzIC0gY29sIC0gcm93IC0gMjtcclxuICAgICAgICAgICAgICAgIGxlZnQgPSBtYXB0dzIgKiBjdWxsaW5nQ29sO1xyXG4gICAgICAgICAgICAgICAgYm90dG9tID0gbWFwdGgyICogY3VsbGluZ1JvdztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBsZWZ0IHRvcCB0byByaWdodCBkb3dtXHJcbiAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb24uSEVYOlxyXG4gICAgICAgICAgICAgICAgZGlmZlgyID0gKGF4aXMgPT09IFN0YWdnZXJBeGlzLlNUQUdHRVJBWElTX1kgJiYgcm93ICUgMiA9PT0gMSkgPyBtYXB0dzIgKiBvZGRfZXZlbiA6IDA7XHJcbiAgICAgICAgICAgICAgICBkaWZmWTIgPSAoYXhpcyA9PT0gU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWCAmJiBjb2wgJSAyID09PSAxKSA/IG1hcHRoMiAqIC1vZGRfZXZlbiA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGVmdCA9IGNvbCAqIChtYXB0dyAtIGRpZmZYMSkgKyBkaWZmWDI7XHJcbiAgICAgICAgICAgICAgICBib3R0b20gPSAocm93cyAtIHJvdyAtIDEpICogKG1hcHRoIC0gZGlmZlkxKSArIGRpZmZZMjtcclxuICAgICAgICAgICAgICAgIGN1bGxpbmdDb2wgPSBjb2w7XHJcbiAgICAgICAgICAgICAgICBjdWxsaW5nUm93ID0gcm93cyAtIHJvdyAtIDE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb3dEYXRhID0gdmVydGljZXNbY3VsbGluZ1Jvd10gPSB2ZXJ0aWNlc1tjdWxsaW5nUm93XSB8fCB7bWluQ29sOjAsIG1heENvbDowfTtcclxuICAgICAgICBsZXQgY29sRGF0YSA9IHJvd0RhdGFbY3VsbGluZ0NvbF0gPSByb3dEYXRhW2N1bGxpbmdDb2xdIHx8IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHJlY29yZCBlYWNoIHJvdyByYW5nZSwgaXQgd2lsbCBmYXN0ZXIgd2hlbiBjdWxsaW5nIGdyaWRcclxuICAgICAgICBpZiAocm93RGF0YS5taW5Db2wgPiBjdWxsaW5nQ29sKSB7XHJcbiAgICAgICAgICAgIHJvd0RhdGEubWluQ29sID0gY3VsbGluZ0NvbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyb3dEYXRhLm1heENvbCA8IGN1bGxpbmdDb2wpIHtcclxuICAgICAgICAgICAgcm93RGF0YS5tYXhDb2wgPSBjdWxsaW5nQ29sO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVjb3JkIG1heCByZWN0LCB3aGVuIHZpZXdQb3J0IGlzIGJpZ2dlciB0aGFuIGxheWVyLCBjYW4gbWFrZSBpdCBzbWFsbGVyXHJcbiAgICAgICAgaWYgKHJpZ2h0VG9wLnJvdyA8IGN1bGxpbmdSb3cpIHtcclxuICAgICAgICAgICAgcmlnaHRUb3Aucm93ID0gY3VsbGluZ1JvdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyaWdodFRvcC5jb2wgPCBjdWxsaW5nQ29sKSB7XHJcbiAgICAgICAgICAgIHJpZ2h0VG9wLmNvbCA9IGN1bGxpbmdDb2w7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBfb2Zmc2V0IGlzIHdob2xlIGxheWVyIG9mZnNldFxyXG4gICAgICAgIC8vIHRpbGVPZmZzZXQgaXMgdGlsZXNldCBvZmZzZXQgd2hpY2ggaXMgcmVsYXRlZCB0byBlYWNoIGdyaWRcclxuICAgICAgICAvLyB0aWxlT2Zmc2V0IGNvb3JkaW5hdGUgc3lzdGVtJ3MgeSBheGlzIGlzIG9wcG9zaXRlIHdpdGggZW5naW5lJ3MgeSBheGlzLlxyXG4gICAgICAgIHRpbGVPZmZzZXQgPSBncmlkLnRpbGVzZXQudGlsZU9mZnNldDtcclxuICAgICAgICBsZWZ0ICs9IHRoaXMuX29mZnNldC54ICsgdGlsZU9mZnNldC54O1xyXG4gICAgICAgIGJvdHRvbSArPSB0aGlzLl9vZmZzZXQueSAtIHRpbGVPZmZzZXQueTtcclxuICAgICAgICBcclxuICAgICAgICB0b3BCb3JkZXIgPSAtdGlsZU9mZnNldC55ICsgZ3JpZC50aWxlc2V0Ll90aWxlU2l6ZS5oZWlnaHQgLSBtYXB0aDtcclxuICAgICAgICB0b3BCb3JkZXIgPSB0b3BCb3JkZXIgPCAwID8gMCA6IHRvcEJvcmRlcjtcclxuICAgICAgICBkb3duQm9yZGVyID0gdGlsZU9mZnNldC55IDwgMCA/IDAgOiB0aWxlT2Zmc2V0Lnk7XHJcbiAgICAgICAgbGVmdEJvcmRlciA9IC10aWxlT2Zmc2V0LnggPCAwID8gMCA6IC10aWxlT2Zmc2V0Lng7XHJcbiAgICAgICAgcmlnaHRCb3JkZXIgPSB0aWxlT2Zmc2V0LnggKyBncmlkLnRpbGVzZXQuX3RpbGVTaXplLndpZHRoIC0gbWFwdHc7XHJcbiAgICAgICAgcmlnaHRCb3JkZXIgPSByaWdodEJvcmRlciA8IDAgPyAwIDogcmlnaHRCb3JkZXI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9yaWdodE9mZnNldCA8IGxlZnRCb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmlnaHRPZmZzZXQgPSBsZWZ0Qm9yZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xlZnRPZmZzZXQgPCByaWdodEJvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9sZWZ0T2Zmc2V0ID0gcmlnaHRCb3JkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fdG9wT2Zmc2V0IDwgZG93bkJvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLl90b3BPZmZzZXQgPSBkb3duQm9yZGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2Rvd25PZmZzZXQgPCB0b3BCb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fZG93bk9mZnNldCA9IHRvcEJvcmRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbERhdGEubGVmdCA9IGxlZnQ7XHJcbiAgICAgICAgY29sRGF0YS5ib3R0b20gPSBib3R0b207XHJcbiAgICAgICAgLy8gdGhpcyBpbmRleCBpcyB0aWxlZG1hcCBncmlkIGluZGV4XHJcbiAgICAgICAgY29sRGF0YS5pbmRleCA9IGluZGV4OyBcclxuXHJcbiAgICAgICAgdGhpcy5fY3VsbGluZ0RpcnR5ID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVZlcnRpY2VzICgpIHtcclxuICAgICAgICBsZXQgdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0aWNlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZXQgdGlsZXMgPSB0aGlzLl90aWxlcztcclxuICAgICAgICBpZiAoIXRpbGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByaWdodFRvcCA9IHRoaXMuX3JpZ2h0VG9wO1xyXG4gICAgICAgIHJpZ2h0VG9wLnJvdyA9IC0xO1xyXG4gICAgICAgIHJpZ2h0VG9wLmNvbCA9IC0xO1xyXG5cclxuICAgICAgICBsZXQgcm93cyA9IHRoaXMuX2xheWVyU2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIGNvbHMgPSB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMuX3RvcE9mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZG93bk9mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGVmdE9mZnNldCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcmlnaHRPZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuX2hhc0FuaUdyaWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgKytyb3cpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgY29sczsgKytjb2wpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZlcnRleChjb2wsIHJvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdmVydGljZXNEaXJ0eSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgVGlsZWRUaWxlIHdpdGggdGhlIHRpbGUgY29vcmRpbmF0ZS48YnIvPlxyXG4gICAgICogSWYgdGhlcmUgaXMgbm8gdGlsZSBpbiB0aGUgc3BlY2lmaWVkIGNvb3JkaW5hdGUgYW5kIGZvcmNlQ3JlYXRlIHBhcmFtZXRlciBpcyB0cnVlLCA8YnIvPlxyXG4gICAgICogdGhlbiB3aWxsIGNyZWF0ZSBhIG5ldyBUaWxlZFRpbGUgYXQgdGhlIGNvb3JkaW5hdGUuXHJcbiAgICAgKiBUaGUgcmVuZGVyZXIgd2lsbCByZW5kZXIgdGhlIHRpbGUgd2l0aCB0aGUgcm90YXRpb24sIHNjYWxlLCBwb3NpdGlvbiBhbmQgY29sb3IgcHJvcGVydHkgb2YgdGhlIFRpbGVkVGlsZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOmAmui/h+aMh+WumueahCB0aWxlIOWdkOagh+iOt+WPluWvueW6lOeahCBUaWxlZFRpbGXjgIIgPGJyLz5cclxuICAgICAqIOWmguaenOaMh+WumueahOWdkOagh+ayoeaciSB0aWxl77yM5bm25LiU6K6+572u5LqGIGZvcmNlQ3JlYXRlIOmCo+S5iOWwhuS8muWcqOaMh+WumueahOWdkOagh+WIm+W7uuS4gOS4quaWsOeahCBUaWxlZFRpbGUg44CCPGJyLz5cclxuICAgICAqIOWcqOa4suafk+i/meS4qiB0aWxlIOeahOaXtuWAme+8jOWwhuS8muS9v+eUqCBUaWxlZFRpbGUg55qE6IqC54K555qE5peL6L2s44CB57yp5pS+44CB5L2N56e744CB6aKc6Imy5bGe5oCn44CCPGJyLz5cclxuICAgICAqIEBtZXRob2QgZ2V0VGlsZWRUaWxlQXRcclxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geFxyXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB5XHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlQ3JlYXRlXHJcbiAgICAgKiBAcmV0dXJuIHtjYy5UaWxlZFRpbGV9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHRpbGUgPSB0aWxlZExheWVyLmdldFRpbGVkVGlsZUF0KDEwMCwgMTAwLCB0cnVlKTtcclxuICAgICAqIGNjLmxvZyh0aWxlKTtcclxuICAgICAqL1xyXG4gICAgZ2V0VGlsZWRUaWxlQXQgKHgsIHksIGZvcmNlQ3JlYXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzSW52YWxpZFBvc2l0aW9uKHgsIHkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRpbGVkTGF5ZXIuZ2V0VGlsZWRUaWxlQXQ6IGludmFsaWQgcG9zaXRpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fdGlsZXMpIHtcclxuICAgICAgICAgICAgY2MubG9nSUQoNzIzNik7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcih4KSArIE1hdGguZmxvb3IoeSkgKiB0aGlzLl9sYXllclNpemUud2lkdGg7XHJcbiAgICAgICAgbGV0IHRpbGUgPSB0aGlzLl90aWxlZFRpbGVzW2luZGV4XTtcclxuICAgICAgICBpZiAoIXRpbGUgJiYgZm9yY2VDcmVhdGUpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICB0aWxlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuVGlsZWRUaWxlKTtcclxuICAgICAgICAgICAgdGlsZS5feCA9IHg7XHJcbiAgICAgICAgICAgIHRpbGUuX3kgPSB5O1xyXG4gICAgICAgICAgICB0aWxlLl9sYXllciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRpbGUuX3VwZGF0ZUluZm8oKTtcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGlsZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqIFxyXG4gICAgICogISNlblxyXG4gICAgICogQ2hhbmdlIHRpbGUgdG8gVGlsZWRUaWxlIGF0IHRoZSBzcGVjaWZpZWQgY29vcmRpbmF0ZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWwhuaMh+WumueahCB0aWxlIOWdkOagh+abv+aNouS4uuaMh+WumueahCBUaWxlZFRpbGXjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGlsZWRUaWxlQXRcclxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0geFxyXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSB5XHJcbiAgICAgKiBAcGFyYW0ge2NjLlRpbGVkVGlsZX0gdGlsZWRUaWxlXHJcbiAgICAgKiBAcmV0dXJuIHtjYy5UaWxlZFRpbGV9XHJcbiAgICAgKi9cclxuICAgIHNldFRpbGVkVGlsZUF0ICh4LCB5LCB0aWxlZFRpbGUpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbnZhbGlkUG9zaXRpb24oeCwgeSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGlsZWRMYXllci5zZXRUaWxlZFRpbGVBdDogaW52YWxpZCBwb3NpdGlvblwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl90aWxlcykge1xyXG4gICAgICAgICAgICBjYy5sb2dJRCg3MjM2KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHgpICsgTWF0aC5mbG9vcih5KSAqIHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcclxuICAgICAgICB0aGlzLl90aWxlZFRpbGVzW2luZGV4XSA9IHRpbGVkVGlsZTtcclxuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodGlsZWRUaWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhc1RpbGVkTm9kZUdyaWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhc1RpbGVkTm9kZUdyaWQgPSB0aGlzLl90aWxlZFRpbGVzLnNvbWUoZnVuY3Rpb24gKHRpbGVkTm9kZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXRpbGVkTm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGlsZWRUaWxlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJuIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiOt+WPlue6ueeQhuOAglxyXG4gICAgICogQG1ldGhvZCBnZXRUZXh0dXJlXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRleHR1cmVzXHJcbiAgICAgKiBAcmV0dXJuIHtUZXh0dXJlMkR9XHJcbiAgICAgKi9cclxuICAgIGdldFRleHR1cmUgKGluZGV4KSB7XHJcbiAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlcyAmJiBpbmRleCA+PSAwICYmIHRoaXMuX3RleHR1cmVzLmxlbmd0aCA+IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlc1tpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJuIHRleHR1cmUuXHJcbiAgICAgKiAhI3poIOiOt+WPlue6ueeQhuOAglxyXG4gICAgICogQG1ldGhvZCBnZXRUZXh0dXJlc1xyXG4gICAgICogQHJldHVybiB7VGV4dHVyZTJEfVxyXG4gICAgICovXHJcbiAgICBnZXRUZXh0dXJlcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmVzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDorr7nva7nurnnkIbjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGV4dHVyZVxyXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVcclxuICAgICAqL1xyXG4gICAgc2V0VGV4dHVyZSAodGV4dHVyZSl7XHJcbiAgICAgICAgdGhpcy5zZXRUZXh0dXJlcyhbdGV4dHVyZV0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHRoZSB0ZXh0dXJlLlxyXG4gICAgICogISN6aCDorr7nva7nurnnkIbjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGV4dHVyZVxyXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVzXHJcbiAgICAgKi9cclxuICAgIHNldFRleHR1cmVzICh0ZXh0dXJlcykge1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmVzID0gdGV4dHVyZXM7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBsYXllciBzaXplLlxyXG4gICAgICogISN6aCDojrflvpflsYLlpKflsI/jgIJcclxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJTaXplXHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBzaXplID0gdGlsZWRMYXllci5nZXRMYXllclNpemUoKTtcclxuICAgICAqIGNjLmxvZyhcImxheWVyIHNpemU6IFwiICsgc2l6ZSk7XHJcbiAgICAgKi9cclxuICAgIGdldExheWVyU2l6ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVyU2l6ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNpemUgb2YgdGhlIG1hcCdzIHRpbGUgKGNvdWxkIGJlIGRpZmZlcmVudCBmcm9tIHRoZSB0aWxlJ3Mgc2l6ZSkuXHJcbiAgICAgKiAhI3poIOiOt+WPliB0aWxlIOeahOWkp+WwjyggdGlsZSDnmoTlpKflsI/lj6/og73kvJrmnInmiYDkuI3lkIwp44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldE1hcFRpbGVTaXplXHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBtYXBUaWxlU2l6ZSA9IHRpbGVkTGF5ZXIuZ2V0TWFwVGlsZVNpemUoKTtcclxuICAgICAqIGNjLmxvZyhcIk1hcFRpbGUgc2l6ZTogXCIgKyBtYXBUaWxlU2l6ZSk7XHJcbiAgICAgKi9cclxuICAgIGdldE1hcFRpbGVTaXplICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwVGlsZVNpemU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIFRpbGUgc2V0IGZpcnN0IGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKiAhI3poIOiOt+WPliBsYXllciDntKLlvJXkvY3nva7kuLow55qEIFRpbGVzZXQg5L+h5oGv44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFRpbGVTZXRcclxuICAgICAqIEBwYXJhbSBpbmRleCBUaGUgaW5kZXggb2YgdGlsZXNldHNcclxuICAgICAqIEByZXR1cm4ge1RNWFRpbGVzZXRJbmZvfVxyXG4gICAgICovXHJcbiAgICBnZXRUaWxlU2V0IChpbmRleCkge1xyXG4gICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcclxuICAgICAgICBpZiAodGhpcy5fdGlsZXNldHMgJiYgaW5kZXggPj0gMCAmJiB0aGlzLl90aWxlc2V0cy5sZW5ndGggPiBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGlsZXNldHNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldHMgdGlsZSBzZXQgYWxsIGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKiAhI3poIOiOt+WPliBsYXllciDmiYDmnInnmoQgVGlsZXNldCDkv6Hmga/jgIJcclxuICAgICAqIEBtZXRob2QgZ2V0VGlsZVNldFxyXG4gICAgICogQHJldHVybiB7VE1YVGlsZXNldEluZm99XHJcbiAgICAgKi9cclxuICAgIGdldFRpbGVTZXRzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZXNldHM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXRzIHRpbGUgc2V0IGluZm9ybWF0aW9uIGZvciB0aGUgbGF5ZXIuXHJcbiAgICAgKiAhI3poIOiuvue9riBsYXllciDnmoQgdGlsZXNldCDkv6Hmga/jgIJcclxuICAgICAqIEBtZXRob2Qgc2V0VGlsZVNldFxyXG4gICAgICogQHBhcmFtIHtUTVhUaWxlc2V0SW5mb30gdGlsZXNldFxyXG4gICAgICovXHJcbiAgICBzZXRUaWxlU2V0ICh0aWxlc2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRUaWxlU2V0cyhbdGlsZXNldF0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0cyBUaWxlIHNldCBpbmZvcm1hdGlvbiBmb3IgdGhlIGxheWVyLlxyXG4gICAgICogISN6aCDorr7nva4gbGF5ZXIg55qEIFRpbGVzZXQg5L+h5oGv44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFRpbGVTZXRzXHJcbiAgICAgKiBAcGFyYW0ge1RNWFRpbGVzZXRJbmZvfSB0aWxlc2V0c1xyXG4gICAgICovXHJcbiAgICBzZXRUaWxlU2V0cyAodGlsZXNldHMpIHtcclxuICAgICAgICB0aGlzLl90aWxlc2V0cyA9IHRpbGVzZXRzO1xyXG4gICAgICAgIGxldCB0ZXh0dXJlcyA9IHRoaXMuX3RleHR1cmVzID0gW107XHJcbiAgICAgICAgbGV0IHRleEdyaWRzID0gdGhpcy5fdGV4R3JpZHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbGVzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gdGlsZXNldHNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aWxlc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlc1tpXSA9IHRpbGVzZXQuc291cmNlSW1hZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLlRpbGVkTWFwLmxvYWRBbGxUZXh0dXJlcyAodGV4dHVyZXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aWxlc2V0cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0SW5mbyA9IHRpbGVzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aWxlc2V0SW5mbykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYy5UaWxlZE1hcC5maWxsVGV4dHVyZUdyaWRzKHRpbGVzZXRJbmZvLCB0ZXhHcmlkcywgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcHJlcGFyZVRvUmVuZGVyKCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3RyYXZlcnNlQWxsR3JpZCAoKSB7XHJcbiAgICAgICAgbGV0IHRpbGVzID0gdGhpcy5fdGlsZXM7XHJcbiAgICAgICAgbGV0IHRleEdyaWRzID0gdGhpcy5fdGV4R3JpZHM7XHJcbiAgICAgICAgbGV0IHRpbGVzZXRJbmRleEFyciA9IHRoaXMuX3RpbGVzZXRJbmRleEFycjtcclxuICAgICAgICBsZXQgdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHRoaXMuX3RpbGVzZXRJbmRleFRvQXJySW5kZXggPSB7fTtcclxuXHJcbiAgICAgICAgY29uc3QgVGlsZWRNYXAgPSBjYy5UaWxlZE1hcDtcclxuICAgICAgICBjb25zdCBUaWxlRmxhZyA9IFRpbGVkTWFwLlRpbGVGbGFnO1xyXG4gICAgICAgIGNvbnN0IEZMSVBQRURfTUFTSyA9IFRpbGVGbGFnLkZMSVBQRURfTUFTSztcclxuXHJcbiAgICAgICAgdGlsZXNldEluZGV4QXJyLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZ2lkID0gdGlsZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChnaWQgPT09IDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBnaWQgPSAoKGdpZCAmIEZMSVBQRURfTUFTSykgPj4+IDApO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRleEdyaWRzW2dpZF07XHJcbiAgICAgICAgICAgIGlmICghZ3JpZCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCJDQ1RpbGVkTGF5ZXI6X3RyYXZlcnNlQWxsR3JpZCBncmlkIGlzIG51bGwsIGdpZCBpczpcIiwgZ2lkKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0aWxlc2V0SWR4ID0gZ3JpZC50ZXhJZDtcclxuICAgICAgICAgICAgaWYgKHRpbGVzZXRJbmRleFRvQXJySW5kZXhbdGlsZXNldElkeF0gIT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRpbGVzZXRJbmRleFRvQXJySW5kZXhbdGlsZXNldElkeF0gPSB0aWxlc2V0SW5kZXhBcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aWxlc2V0SW5kZXhBcnIucHVzaCh0aWxlc2V0SWR4KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0IChsYXllckluZm8sIG1hcEluZm8sIHRpbGVzZXRzLCB0ZXh0dXJlcywgdGV4R3JpZHMpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jdWxsaW5nRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2xheWVySW5mbyA9IGxheWVySW5mbztcclxuICAgICAgICB0aGlzLl9tYXBJbmZvID0gbWFwSW5mbztcclxuXHJcbiAgICAgICAgbGV0IHNpemUgPSBsYXllckluZm8uX2xheWVyU2l6ZTtcclxuXHJcbiAgICAgICAgLy8gbGF5ZXJJbmZvXHJcbiAgICAgICAgdGhpcy5fbGF5ZXJOYW1lID0gbGF5ZXJJbmZvLm5hbWU7XHJcbiAgICAgICAgdGhpcy5fdGlsZXMgPSBsYXllckluZm8uX3RpbGVzO1xyXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBsYXllckluZm8ucHJvcGVydGllcztcclxuICAgICAgICB0aGlzLl9sYXllclNpemUgPSBzaXplO1xyXG4gICAgICAgIHRoaXMuX21pbkdJRCA9IGxheWVySW5mby5fbWluR0lEO1xyXG4gICAgICAgIHRoaXMuX21heEdJRCA9IGxheWVySW5mby5fbWF4R0lEO1xyXG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSBsYXllckluZm8uX29wYWNpdHk7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyT3JkZXIgPSBtYXBJbmZvLnJlbmRlck9yZGVyO1xyXG4gICAgICAgIHRoaXMuX3N0YWdnZXJBeGlzID0gbWFwSW5mby5nZXRTdGFnZ2VyQXhpcygpO1xyXG4gICAgICAgIHRoaXMuX3N0YWdnZXJJbmRleCA9IG1hcEluZm8uZ2V0U3RhZ2dlckluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5faGV4U2lkZUxlbmd0aCA9IG1hcEluZm8uZ2V0SGV4U2lkZUxlbmd0aCgpO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnMgPSBtYXBJbmZvLmdldFRpbGVBbmltYXRpb25zKCk7XHJcblxyXG4gICAgICAgIC8vIHRpbGVzZXRzXHJcbiAgICAgICAgdGhpcy5fdGlsZXNldHMgPSB0aWxlc2V0cztcclxuICAgICAgICAvLyB0ZXh0dXJlc1xyXG4gICAgICAgIHRoaXMuX3RleHR1cmVzID0gdGV4dHVyZXM7XHJcbiAgICAgICAgLy8gZ3JpZCB0ZXh0dXJlXHJcbiAgICAgICAgdGhpcy5fdGV4R3JpZHMgPSB0ZXhHcmlkcztcclxuXHJcbiAgICAgICAgLy8gbWFwSW5mb1xyXG4gICAgICAgIHRoaXMuX2xheWVyT3JpZW50YXRpb24gPSBtYXBJbmZvLm9yaWVudGF0aW9uO1xyXG4gICAgICAgIHRoaXMuX21hcFRpbGVTaXplID0gbWFwSW5mby5nZXRUaWxlU2l6ZSgpO1xyXG5cclxuICAgICAgICBsZXQgbWFwdHcgPSB0aGlzLl9tYXBUaWxlU2l6ZS53aWR0aDtcclxuICAgICAgICBsZXQgbWFwdGggPSB0aGlzLl9tYXBUaWxlU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IGxheWVyVyA9IHRoaXMuX2xheWVyU2l6ZS53aWR0aDtcclxuICAgICAgICBsZXQgbGF5ZXJIID0gdGhpcy5fbGF5ZXJTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2xheWVyT3JpZW50YXRpb24gPT09IGNjLlRpbGVkTWFwLk9yaWVudGF0aW9uLkhFWCkge1xyXG4gICAgICAgICAgICAvLyBoYW5kbGUgaGV4IG1hcFxyXG4gICAgICAgICAgICBjb25zdCBUaWxlZE1hcCA9IGNjLlRpbGVkTWFwO1xyXG4gICAgICAgICAgICBjb25zdCBTdGFnZ2VyQXhpcyA9IFRpbGVkTWFwLlN0YWdnZXJBeGlzO1xyXG4gICAgICAgICAgICBjb25zdCBTdGFnZ2VySW5kZXggPSBUaWxlZE1hcC5TdGFnZ2VySW5kZXg7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCB3aWR0aCA9IDAsIGhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9vZGRfZXZlbiA9ICh0aGlzLl9zdGFnZ2VySW5kZXggPT09IFN0YWdnZXJJbmRleC5TVEFHR0VSSU5ERVhfT0REKSA/IDEgOiAtMTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YWdnZXJBeGlzID09PSBTdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19YKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmWDEgPSAobWFwdHcgLSB0aGlzLl9oZXhTaWRlTGVuZ3RoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmWTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gbWFwdGggKiAobGF5ZXJIICsgMC41KTtcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gKG1hcHR3ICsgdGhpcy5faGV4U2lkZUxlbmd0aCkgKiBNYXRoLmZsb29yKGxheWVyVyAvIDIpICsgbWFwdHcgKiAobGF5ZXJXICUgMik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWZmWDEgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlmZlkxID0gKG1hcHRoIC0gdGhpcy5faGV4U2lkZUxlbmd0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBtYXB0dyAqIChsYXllclcgKyAwLjUpO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gKG1hcHRoICsgdGhpcy5faGV4U2lkZUxlbmd0aCkgKiBNYXRoLmZsb29yKGxheWVySCAvIDIpICsgbWFwdGggKiAobGF5ZXJIICUgMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGF5ZXJPcmllbnRhdGlvbiA9PT0gY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSVNPKSB7XHJcbiAgICAgICAgICAgIGxldCB3aCA9IGxheWVyVyArIGxheWVySDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKG1hcHR3ICogMC41ICogd2gsIG1hcHRoICogMC41ICogd2gpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShsYXllclcgKiBtYXB0dywgbGF5ZXJIICogbWFwdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb2Zmc2V0IChhZnRlciBsYXllciBvcmllbnRhdGlvbiBpcyBzZXQpO1xyXG4gICAgICAgIHRoaXMuX29mZnNldCA9IGNjLnYyKGxheWVySW5mby5vZmZzZXQueCwgLWxheWVySW5mby5vZmZzZXQueSk7XHJcbiAgICAgICAgdGhpcy5fdXNlQXV0b21hdGljVmVydGV4WiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3ZlcnRleFp2YWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3luY0FuY2hvclBvaW50KCk7XHJcbiAgICAgICAgdGhpcy5fcHJlcGFyZVRvUmVuZGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wcmVwYXJlVG9SZW5kZXIgKCkge1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVZlcnRpY2VzKCk7XHJcbiAgICAgICAgdGhpcy5fdHJhdmVyc2VBbGxHcmlkKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQWxsVXNlck5vZGUoKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9idWlsZE1hdGVyaWFsICh0aWxlc2V0SWR4KSB7XHJcbiAgICAgICAgbGV0IHRleElkTWF0SWR4ID0gdGhpcy5fdGV4SWRUb01hdEluZGV4O1xyXG4gICAgICAgIGlmICh0ZXhJZE1hdElkeFt0aWxlc2V0SWR4XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpbGVzZXRJbmRleEFyciA9IHRoaXMuX3RpbGVzZXRJbmRleEFycjtcclxuICAgICAgICBsZXQgdGlsZXNldEluZGV4VG9BcnJJbmRleCA9IHRoaXMuX3RpbGVzZXRJbmRleFRvQXJySW5kZXg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGlsZXNldEluZGV4VG9BcnJJbmRleFt0aWxlc2V0SWR4XTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aWxlc2V0SW5kZXhUb0FyckluZGV4W3RpbGVzZXRJZHhdID0gaW5kZXggPSB0aWxlc2V0SW5kZXhBcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aWxlc2V0SW5kZXhBcnIucHVzaCh0aWxlc2V0SWR4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZXNbdGlsZXNldElkeF07XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsID0gdGhpcy5fbWF0ZXJpYWxzW2luZGV4XTtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlKG1hdGVyaWFsLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCB0cnVlKTtcclxuICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRleHR1cmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXRlcmlhbHNbaW5kZXhdID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgdGV4SWRNYXRJZHhbdGlsZXNldElkeF0gPSBpbmRleDtcclxuICAgICAgICByZXR1cm4gbWF0ZXJpYWw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9hY3RpdmF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBsZXQgdGlsZXNldEluZGV4QXJyID0gdGhpcy5fdGlsZXNldEluZGV4QXJyO1xyXG4gICAgICAgIGlmICh0aWxlc2V0SW5kZXhBcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbWF0TGVuID0gdGlsZXNldEluZGV4QXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdExlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkTWF0ZXJpYWwodGlsZXNldEluZGV4QXJyW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxzLmxlbmd0aCA9IG1hdExlbjtcclxuICAgICAgICB0aGlzLm1hcmtGb3JSZW5kZXIodHJ1ZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuVGlsZWRMYXllciA9IG1vZHVsZS5leHBvcnRzID0gVGlsZWRMYXllcjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=