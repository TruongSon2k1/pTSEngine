
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMap.js';
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
require('./CCTMXXMLParser');

require('./CCTiledMapAsset');

require('./CCTiledLayer');

require('./CCTiledTile');

require('./CCTiledObjectGroup');
/**
 * !#en The orientation of tiled map.
 * !#zh Tiled Map 地图方向。
 * @enum TiledMap.Orientation
 * @static
 */


var Orientation = cc.Enum({
  /**
   * !#en Orthogonal orientation.
   * !#zh 直角鸟瞰地图（90°地图）。
   * @property ORTHO
   * @type {Number}
   * @static
   */
  ORTHO: 0,

  /**
   * !#en Hexagonal orientation.
   * !#zh 六边形地图
   * @property HEX
   * @type {Number}
   * @static
   */
  HEX: 1,

  /**
   * Isometric orientation.
   * 等距斜视地图（斜45°地图）。
   * @property ISO
   * @type {Number}
   * @static
   */
  ISO: 2
});
/**
 * The property type of tiled map.
 * @enum TiledMap.Property
 * @static
 */

var Property = cc.Enum({
  /**
   * @property NONE
   * @type {Number}
   * @static
   */
  NONE: 0,

  /**
   * @property MAP
   * @type {Number}
   * @static
   */
  MAP: 1,

  /**
   * @property LAYER
   * @type {Number}
   * @static
   */
  LAYER: 2,

  /**
   * @property OBJECTGROUP
   * @type {Number}
   * @static
   */
  OBJECTGROUP: 3,

  /**
   * @property OBJECT
   * @type {Number}
   * @static
   */
  OBJECT: 4,

  /**
   * @property TILE
   * @type {Number}
   * @static
   */
  TILE: 5
});
/**
 * The tile flags of tiled map.
 * @enum TiledMap.TileFlag
 * @static
 */

var TileFlag = cc.Enum({
  /**
   * @property HORIZONTAL
   * @type {Number}
   * @static
   */
  HORIZONTAL: 0x80000000,

  /**
   * @property VERTICAL
   * @type {Number}
   * @static
   */
  VERTICAL: 0x40000000,

  /**
   * @property DIAGONAL
   * @type {Number}
   * @static
   */
  DIAGONAL: 0x20000000,

  /**
   * @property FLIPPED_ALL
   * @type {Number}
   * @static
   */
  FLIPPED_ALL: (0x80000000 | 0x40000000 | 0x20000000 | 0x10000000) >>> 0,

  /**
   * @property FLIPPED_MASK
   * @type {Number}
   * @static
   */
  FLIPPED_MASK: ~(0x80000000 | 0x40000000 | 0x20000000 | 0x10000000) >>> 0
});
/**
 * !#en The stagger axis of Hex tiled map.
 * !#zh 六边形地图的 stagger axis 值
 * @enum TiledMap.StaggerAxis
 * @static
 */

var StaggerAxis = cc.Enum({
  /**
   * @property STAGGERAXIS_X
   * @type {Number}
   * @static
   */
  STAGGERAXIS_X: 0,

  /**
   * @property STAGGERAXIS_Y
   * @type {Number}
   * @static
   */
  STAGGERAXIS_Y: 1
});
/**
 * !#en The stagger index of Hex tiled map.
 * !#zh 六边形地图的 stagger index 值
 * @enum TiledMap.RenderOrder
 * @static
 */

var StaggerIndex = cc.Enum({
  /**
   * @property STAGGERINDEX_ODD
   * @type {Number}
   * @static
   */
  STAGGERINDEX_ODD: 0,

  /**
   * @property STAGGERINDEX_EVEN
   * @type {Number}
   * @static
   */
  STAGGERINDEX_EVEN: 1
});
/**
 * !#en The render order of tiled map.
 * !#zh 地图的渲染顺序
 * @enum TiledMap.RenderOrder
 * @static
 */

var RenderOrder = cc.Enum({
  /**
   * @property RightDown
   * @type {Number}
   * @static
   */
  RightDown: 0,

  /**
   * @property RightUp
   * @type {Number}
   * @static
   */
  RightUp: 1,

  /**
   * @property LeftDown
   * @type {Number}
   * @static
   */
  LeftDown: 2,

  /**
   * @property LeftUp
   * @type {Number}
   * @static
   */
  LeftUp: 3
});
/**
 * !#en TiledMap Object Type
 * !#zh 地图物体类型
 * @enum TiledMap.TMXObjectType
 * @static
 */

var TMXObjectType = cc.Enum({
  /**
   * @property RECT
   * @type {Number}
   * @static
   */
  RECT: 0,

  /**
   * @property ELLIPSE
   * @type {Number}
   * @static
   */
  ELLIPSE: 1,

  /**
   * @property POLYGON
   * @type {Number}
   * @static
   */
  POLYGON: 2,

  /**
   * @property POLYLINE
   * @type {Number}
   * @static
   */
  POLYLINE: 3,

  /**
   * @property IMAGE
   * @type {Number}
   * @static
   */
  IMAGE: 4,

  /**
   * @property TEXT
   * @type {Number}
   * @static
   */
  TEXT: 5
});
/**
 * !#en Renders a TMX Tile Map in the scene.
 * !#zh 在场景中渲染一个 tmx 格式的 Tile Map。
 * @class TiledMap
 * @extends Component
 */

var TiledMap = cc.Class({
  name: 'cc.TiledMap',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    executeInEditMode: true,
    menu: 'i18n:MAIN_MENU.component.renderers/TiledMap'
  },
  ctor: function ctor() {
    // store all layer gid corresponding texture info, index is gid, format likes '[gid0]=tex-info,[gid1]=tex-info, ...'
    this._texGrids = []; // store all tileset texture, index is tileset index, format likes '[0]=texture0, [1]=texture1, ...'

    this._textures = [];
    this._tilesets = [];
    this._animations = [];
    this._imageLayers = [];
    this._layers = [];
    this._groups = [];
    this._images = [];
    this._properties = [];
    this._tileProperties = [];
    this._mapSize = cc.size(0, 0);
    this._tileSize = cc.size(0, 0);
  },
  statics: {
    Orientation: Orientation,
    Property: Property,
    TileFlag: TileFlag,
    StaggerAxis: StaggerAxis,
    StaggerIndex: StaggerIndex,
    TMXObjectType: TMXObjectType,
    RenderOrder: RenderOrder
  },
  properties: {
    _tmxFile: {
      "default": null,
      type: cc.TiledMapAsset
    },

    /**
     * !#en The TiledMap Asset.
     * !#zh TiledMap 资源。
     * @property {TiledMapAsset} tmxAsset
     * @default ""
     */
    tmxAsset: {
      get: function get() {
        return this._tmxFile;
      },
      set: function set(value, force) {
        if (this._tmxFile !== value || CC_EDITOR && force) {
          this._tmxFile = value;

          this._applyFile();
        }
      },
      type: cc.TiledMapAsset
    }
  },

  /**
   * !#en Gets the map size.
   * !#zh 获取地图大小。
   * @method getMapSize
   * @return {Size}
   * @example
   * let mapSize = tiledMap.getMapSize();
   * cc.log("Map Size: " + mapSize);
   */
  getMapSize: function getMapSize() {
    return this._mapSize;
  },

  /**
   * !#en Gets the tile size.
   * !#zh 获取地图背景中 tile 元素的大小。
   * @method getTileSize
   * @return {Size}
   * @example
   * let tileSize = tiledMap.getTileSize();
   * cc.log("Tile Size: " + tileSize);
   */
  getTileSize: function getTileSize() {
    return this._tileSize;
  },

  /**
   * !#en map orientation.
   * !#zh 获取地图方向。
   * @method getMapOrientation
   * @return {Number}
   * @example
   * let mapOrientation = tiledMap.getMapOrientation();
   * cc.log("Map Orientation: " + mapOrientation);
   */
  getMapOrientation: function getMapOrientation() {
    return this._mapOrientation;
  },

  /**
   * !#en object groups.
   * !#zh 获取所有的对象层。
   * @method getObjectGroups
   * @return {TiledObjectGroup[]}
   * @example
   * let objGroups = titledMap.getObjectGroups();
   * for (let i = 0; i < objGroups.length; ++i) {
   *     cc.log("obj: " + objGroups[i]);
   * }
   */
  getObjectGroups: function getObjectGroups() {
    return this._groups;
  },

  /**
   * !#en Return the TMXObjectGroup for the specific group.
   * !#zh 获取指定的 TMXObjectGroup。
   * @method getObjectGroup
   * @param {String} groupName
   * @return {TiledObjectGroup}
   * @example
   * let group = titledMap.getObjectGroup("Players");
   * cc.log("ObjectGroup: " + group);
   */
  getObjectGroup: function getObjectGroup(groupName) {
    var groups = this._groups;

    for (var i = 0, l = groups.length; i < l; i++) {
      var group = groups[i];

      if (group && group.getGroupName() === groupName) {
        return group;
      }
    }

    return null;
  },

  /**
   * !#en enable or disable culling
   * !#zh 开启或关闭裁剪。
   * @method enableCulling
   * @param value
   */
  enableCulling: function enableCulling(value) {
    var layers = this._layers;

    for (var i = 0; i < layers.length; ++i) {
      layers[i].enableCulling(value);
    }
  },

  /**
   * !#en Gets the map properties.
   * !#zh 获取地图的属性。
   * @method getProperties
   * @return {Object[]}
   * @example
   * let properties = titledMap.getProperties();
   * for (let i = 0; i < properties.length; ++i) {
   *     cc.log("Properties: " + properties[i]);
   * }
   */
  getProperties: function getProperties() {
    return this._properties;
  },

  /**
   * !#en Return All layers array.
   * !#zh 返回包含所有 layer 的数组。
   * @method getLayers
   * @returns {TiledLayer[]}
   * @example
   * let layers = titledMap.getLayers();
   * for (let i = 0; i < layers.length; ++i) {
   *     cc.log("Layers: " + layers[i]);
   * }
   */
  getLayers: function getLayers() {
    return this._layers;
  },

  /**
   * !#en return the cc.TiledLayer for the specific layer.
   * !#zh 获取指定名称的 layer。
   * @method getLayer
   * @param {String} layerName
   * @return {TiledLayer}
   * @example
   * let layer = titledMap.getLayer("Player");
   * cc.log(layer);
   */
  getLayer: function getLayer(layerName) {
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      var layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        return layer;
      }
    }

    return null;
  },
  _changeLayer: function _changeLayer(layerName, replaceLayer) {
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      var layer = layers[i];

      if (layer && layer.getLayerName() === layerName) {
        layers[i] = replaceLayer;
        return;
      }
    }
  },

  /**
   * !#en Return the value for the specific property name.
   * !#zh 通过属性名称，获取指定的属性。
   * @method getProperty
   * @param {String} propertyName
   * @return {String}
   * @example
   * let property = titledMap.getProperty("info");
   * cc.log("Property: " + property);
   */
  getProperty: function getProperty(propertyName) {
    return this._properties[propertyName.toString()];
  },

  /**
   * !#en Return properties dictionary for tile GID.
   * !#zh 通过 GID ，获取指定的属性。
   * @method getPropertiesForGID
   * @param {Number} GID
   * @return {Object}
   * @example
   * let properties = titledMap.getPropertiesForGID(GID);
   * cc.log("Properties: " + properties);
   */
  getPropertiesForGID: function getPropertiesForGID(GID) {
    return this._tileProperties[GID];
  },
  __preload: function __preload() {
    if (this._tmxFile) {
      // refresh layer entities
      this._applyFile();
    }
  },
  onEnable: function onEnable() {
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  onDisable: function onDisable() {
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
  },
  _applyFile: function _applyFile() {
    var file = this._tmxFile;

    if (file) {
      var texValues = file.textures;
      var texKeys = file.textureNames;
      var texSizes = file.textureSizes;
      var textures = {};
      var textureSizes = {};

      for (var i = 0; i < texValues.length; ++i) {
        var texName = texKeys[i];
        textures[texName] = texValues[i];
        textureSizes[texName] = texSizes[i];
      }

      var imageLayerTextures = {};
      texValues = file.imageLayerTextures;
      texKeys = file.imageLayerTextureNames;

      for (var _i = 0; _i < texValues.length; ++_i) {
        imageLayerTextures[texKeys[_i]] = texValues[_i];
      }

      var tsxFileNames = file.tsxFileNames;
      var tsxFiles = file.tsxFiles;
      var tsxMap = {};

      for (var _i2 = 0; _i2 < tsxFileNames.length; ++_i2) {
        if (tsxFileNames[_i2].length > 0) {
          tsxMap[tsxFileNames[_i2]] = tsxFiles[_i2].text;
        }
      }

      var mapInfo = new cc.TMXMapInfo(file.tmxXmlStr, tsxMap, textures, textureSizes, imageLayerTextures);
      var tilesets = mapInfo.getTilesets();
      if (!tilesets || tilesets.length === 0) cc.logID(7241);

      this._buildWithMapInfo(mapInfo);
    } else {
      this._releaseMapInfo();
    }
  },
  _releaseMapInfo: function _releaseMapInfo() {
    // remove the layers & object groups added before
    var layers = this._layers;

    for (var i = 0, l = layers.length; i < l; i++) {
      layers[i].node.removeFromParent(true);
      layers[i].node.destroy();
    }

    layers.length = 0;
    var groups = this._groups;

    for (var _i3 = 0, _l = groups.length; _i3 < _l; _i3++) {
      groups[_i3].node.removeFromParent(true);

      groups[_i3].node.destroy();
    }

    groups.length = 0;
    var images = this._images;

    for (var _i4 = 0, _l2 = images.length; _i4 < _l2; _i4++) {
      images[_i4].removeFromParent(true);

      images[_i4].destroy();
    }

    images.length = 0;
  },
  _syncAnchorPoint: function _syncAnchorPoint() {
    var anchor = this.node.getAnchorPoint();
    var leftTopX = this.node.width * anchor.x;
    var leftTopY = this.node.height * (1 - anchor.y);
    var i, l;

    for (i = 0, l = this._layers.length; i < l; i++) {
      var layerInfo = this._layers[i];
      var layerNode = layerInfo.node; // Tiled layer sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existed logic.

      layerNode.setAnchorPoint(anchor);
    }

    for (i = 0, l = this._groups.length; i < l; i++) {
      var groupInfo = this._groups[i];
      var groupNode = groupInfo.node; // Group layer not sync anchor to map because it's old behavior,
      // do not change the behavior avoid influence user's existing logic.

      groupNode.anchorX = 0.5;
      groupNode.anchorY = 0.5;
      groupNode.x = groupInfo._offset.x - leftTopX + groupNode.width * groupNode.anchorX;
      groupNode.y = groupInfo._offset.y + leftTopY - groupNode.height * groupNode.anchorY;
    }

    for (i = 0, l = this._images.length; i < l; i++) {
      var image = this._images[i];
      image.anchorX = 0.5;
      image.anchorY = 0.5;
      image.x = image._offset.x - leftTopX + image.width * image.anchorX;
      image.y = image._offset.y + leftTopY - image.height * image.anchorY;
    }
  },
  _fillAniGrids: function _fillAniGrids(texGrids, animations) {
    for (var i in animations) {
      var animation = animations[i];
      if (!animation) continue;
      var frames = animation.frames;

      for (var j = 0; j < frames.length; j++) {
        var frame = frames[j];
        frame.grid = texGrids[frame.tileid];
      }
    }
  },
  _buildLayerAndGroup: function _buildLayerAndGroup() {
    var tilesets = this._tilesets;
    var texGrids = this._texGrids;
    var animations = this._animations;
    texGrids.length = 0;

    for (var i = 0, l = tilesets.length; i < l; ++i) {
      var tilesetInfo = tilesets[i];
      if (!tilesetInfo) continue;
      cc.TiledMap.fillTextureGrids(tilesetInfo, texGrids, i);
    }

    this._fillAniGrids(texGrids, animations);

    var layers = this._layers;
    var groups = this._groups;
    var images = this._images;
    var oldNodeNames = {};

    for (var _i5 = 0, n = layers.length; _i5 < n; _i5++) {
      oldNodeNames[layers[_i5].node._name] = true;
    }

    for (var _i6 = 0, _n = groups.length; _i6 < _n; _i6++) {
      oldNodeNames[groups[_i6].node._name] = true;
    }

    for (var _i7 = 0, _n2 = images.length; _i7 < _n2; _i7++) {
      oldNodeNames[images[_i7]._name] = true;
    }

    layers = this._layers = [];
    groups = this._groups = [];
    images = this._images = [];
    var mapInfo = this._mapInfo;
    var node = this.node;
    var layerInfos = mapInfo.getAllChildren();
    var textures = this._textures;
    var maxWidth = 0;
    var maxHeight = 0;

    if (layerInfos && layerInfos.length > 0) {
      for (var _i8 = 0, len = layerInfos.length; _i8 < len; _i8++) {
        var layerInfo = layerInfos[_i8];
        var name = layerInfo.name;
        var child = this.node.getChildByName(name);
        oldNodeNames[name] = false;

        if (!child) {
          child = new cc.Node();
          child.name = name;
          node.addChild(child);
        }

        child.setSiblingIndex(_i8);
        child.active = layerInfo.visible;

        if (layerInfo instanceof cc.TMXLayerInfo) {
          var layer = child.getComponent(cc.TiledLayer);

          if (!layer) {
            layer = child.addComponent(cc.TiledLayer);
          }

          layer._init(layerInfo, mapInfo, tilesets, textures, texGrids); // tell the layerinfo to release the ownership of the tiles map.


          layerInfo.ownTiles = false;
          layers.push(layer);
        } else if (layerInfo instanceof cc.TMXObjectGroupInfo) {
          var group = child.getComponent(cc.TiledObjectGroup);

          if (!group) {
            group = child.addComponent(cc.TiledObjectGroup);
          }

          group._init(layerInfo, mapInfo, texGrids);

          groups.push(group);
        } else if (layerInfo instanceof cc.TMXImageLayerInfo) {
          var texture = layerInfo.sourceImage;
          child.opacity = layerInfo.opacity;
          child.layerInfo = layerInfo;
          child._offset = cc.v2(layerInfo.offset.x, -layerInfo.offset.y);
          var image = child.getComponent(cc.Sprite);

          if (!image) {
            image = child.addComponent(cc.Sprite);
          }

          var spf = image.spriteFrame || new cc.SpriteFrame();
          spf.setTexture(texture);
          image.spriteFrame = spf;
          child.width = texture.width;
          child.height = texture.height;
          images.push(child);
        }

        maxWidth = Math.max(maxWidth, child.width);
        maxHeight = Math.max(maxHeight, child.height);
      }
    }

    var children = node.children;

    for (var _i9 = 0, _n3 = children.length; _i9 < _n3; _i9++) {
      var c = children[_i9];

      if (oldNodeNames[c._name]) {
        c.destroy();
      }
    }

    this.node.width = maxWidth;
    this.node.height = maxHeight;

    this._syncAnchorPoint();
  },
  _buildWithMapInfo: function _buildWithMapInfo(mapInfo) {
    this._mapInfo = mapInfo;
    this._mapSize = mapInfo.getMapSize();
    this._tileSize = mapInfo.getTileSize();
    this._mapOrientation = mapInfo.orientation;
    this._properties = mapInfo.properties;
    this._tileProperties = mapInfo.getTileProperties();
    this._imageLayers = mapInfo.getImageLayers();
    this._animations = mapInfo.getTileAnimations();
    this._tilesets = mapInfo.getTilesets();
    var tilesets = this._tilesets;
    this._textures.length = 0;
    var totalTextures = [];

    for (var i = 0, l = tilesets.length; i < l; ++i) {
      var tilesetInfo = tilesets[i];
      if (!tilesetInfo || !tilesetInfo.sourceImage) continue;
      this._textures[i] = tilesetInfo.sourceImage;
      totalTextures.push(tilesetInfo.sourceImage);
    }

    for (var _i10 = 0; _i10 < this._imageLayers.length; _i10++) {
      var imageLayer = this._imageLayers[_i10];
      if (!imageLayer || !imageLayer.sourceImage) continue;
      totalTextures.push(imageLayer.sourceImage);
    }

    cc.TiledMap.loadAllTextures(totalTextures, function () {
      this._buildLayerAndGroup();
    }.bind(this));
  },
  update: function update(dt) {
    var animations = this._animations;
    var texGrids = this._texGrids;

    for (var aniGID in animations) {
      var animation = animations[aniGID];
      var frames = animation.frames;
      var frame = frames[animation.frameIdx];
      animation.dt += dt;

      if (frame.duration < animation.dt) {
        animation.dt = 0;
        animation.frameIdx++;

        if (animation.frameIdx >= frames.length) {
          animation.frameIdx = 0;
        }

        frame = frames[animation.frameIdx];
      }

      texGrids[aniGID] = frame.grid;
    }
  }
});
cc.TiledMap = module.exports = TiledMap;

cc.TiledMap.loadAllTextures = function (textures, loadedCallback) {
  var totalNum = textures.length;

  if (totalNum === 0) {
    loadedCallback();
    return;
  }

  var curNum = 0;

  var itemCallback = function itemCallback() {
    curNum++;

    if (curNum >= totalNum) {
      loadedCallback();
    }
  };

  for (var i = 0; i < totalNum; i++) {
    var tex = textures[i];

    if (!tex.loaded) {
      tex.once('load', function () {
        itemCallback();
      });
    } else {
      itemCallback();
    }
  }
};

cc.TiledMap.fillTextureGrids = function (tileset, texGrids, texId) {
  var tex = tileset.sourceImage;

  if (!tileset.imageSize.width || !tileset.imageSize.height) {
    tileset.imageSize.width = tex.width;
    tileset.imageSize.height = tex.height;
  }

  var tw = tileset._tileSize.width,
      th = tileset._tileSize.height,
      imageW = tex.width,
      imageH = tex.height,
      spacing = tileset.spacing,
      margin = tileset.margin,
      cols = Math.floor((imageW - margin * 2 + spacing) / (tw + spacing)),
      rows = Math.floor((imageH - margin * 2 + spacing) / (th + spacing)),
      count = rows * cols,
      gid = tileset.firstGid,
      grid = null,
      override = texGrids[gid] ? true : false,
      texelCorrect = cc.macro.FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX ? 0.5 : 0; // Tiledmap may not be partitioned into blocks, resulting in a count value of 0

  if (count <= 0) {
    count = 1;
  }

  var maxGid = tileset.firstGid + count;

  for (; gid < maxGid; ++gid) {
    // Avoid overlapping
    if (override && !texGrids[gid]) {
      override = false;
    }

    if (!override && texGrids[gid]) {
      break;
    }

    grid = {
      // record texture id
      texId: texId,
      // record belong to which tileset
      tileset: tileset,
      x: 0,
      y: 0,
      width: tw,
      height: th,
      t: 0,
      l: 0,
      r: 0,
      b: 0,
      gid: gid
    };
    tileset.rectForGID(gid, grid);
    grid.x += texelCorrect;
    grid.y += texelCorrect;
    grid.width -= texelCorrect * 2;
    grid.height -= texelCorrect * 2;
    grid.t = grid.y / imageH;
    grid.l = grid.x / imageW;
    grid.r = (grid.x + grid.width) / imageW;
    grid.b = (grid.y + grid.height) / imageH;
    texGrids[gid] = grid;
  }
};

cc.js.obsolete(cc.TiledMap.prototype, 'cc.TiledMap.tmxFile', 'tmxAsset', true);
cc.js.get(cc.TiledMap.prototype, 'mapLoaded', function () {
  cc.errorID(7203);
  return [];
}, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVGlsZWRNYXAuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIk9yaWVudGF0aW9uIiwiY2MiLCJFbnVtIiwiT1JUSE8iLCJIRVgiLCJJU08iLCJQcm9wZXJ0eSIsIk5PTkUiLCJNQVAiLCJMQVlFUiIsIk9CSkVDVEdST1VQIiwiT0JKRUNUIiwiVElMRSIsIlRpbGVGbGFnIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiRElBR09OQUwiLCJGTElQUEVEX0FMTCIsIkZMSVBQRURfTUFTSyIsIlN0YWdnZXJBeGlzIiwiU1RBR0dFUkFYSVNfWCIsIlNUQUdHRVJBWElTX1kiLCJTdGFnZ2VySW5kZXgiLCJTVEFHR0VSSU5ERVhfT0REIiwiU1RBR0dFUklOREVYX0VWRU4iLCJSZW5kZXJPcmRlciIsIlJpZ2h0RG93biIsIlJpZ2h0VXAiLCJMZWZ0RG93biIsIkxlZnRVcCIsIlRNWE9iamVjdFR5cGUiLCJSRUNUIiwiRUxMSVBTRSIsIlBPTFlHT04iLCJQT0xZTElORSIsIklNQUdFIiwiVEVYVCIsIlRpbGVkTWFwIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJtZW51IiwiY3RvciIsIl90ZXhHcmlkcyIsIl90ZXh0dXJlcyIsIl90aWxlc2V0cyIsIl9hbmltYXRpb25zIiwiX2ltYWdlTGF5ZXJzIiwiX2xheWVycyIsIl9ncm91cHMiLCJfaW1hZ2VzIiwiX3Byb3BlcnRpZXMiLCJfdGlsZVByb3BlcnRpZXMiLCJfbWFwU2l6ZSIsInNpemUiLCJfdGlsZVNpemUiLCJzdGF0aWNzIiwicHJvcGVydGllcyIsIl90bXhGaWxlIiwidHlwZSIsIlRpbGVkTWFwQXNzZXQiLCJ0bXhBc3NldCIsImdldCIsInNldCIsInZhbHVlIiwiZm9yY2UiLCJfYXBwbHlGaWxlIiwiZ2V0TWFwU2l6ZSIsImdldFRpbGVTaXplIiwiZ2V0TWFwT3JpZW50YXRpb24iLCJfbWFwT3JpZW50YXRpb24iLCJnZXRPYmplY3RHcm91cHMiLCJnZXRPYmplY3RHcm91cCIsImdyb3VwTmFtZSIsImdyb3VwcyIsImkiLCJsIiwibGVuZ3RoIiwiZ3JvdXAiLCJnZXRHcm91cE5hbWUiLCJlbmFibGVDdWxsaW5nIiwibGF5ZXJzIiwiZ2V0UHJvcGVydGllcyIsImdldExheWVycyIsImdldExheWVyIiwibGF5ZXJOYW1lIiwibGF5ZXIiLCJnZXRMYXllck5hbWUiLCJfY2hhbmdlTGF5ZXIiLCJyZXBsYWNlTGF5ZXIiLCJnZXRQcm9wZXJ0eSIsInByb3BlcnR5TmFtZSIsInRvU3RyaW5nIiwiZ2V0UHJvcGVydGllc0ZvckdJRCIsIkdJRCIsIl9fcHJlbG9hZCIsIm9uRW5hYmxlIiwibm9kZSIsIm9uIiwiTm9kZSIsIkV2ZW50VHlwZSIsIkFOQ0hPUl9DSEFOR0VEIiwiX3N5bmNBbmNob3JQb2ludCIsIm9uRGlzYWJsZSIsIm9mZiIsImZpbGUiLCJ0ZXhWYWx1ZXMiLCJ0ZXh0dXJlcyIsInRleEtleXMiLCJ0ZXh0dXJlTmFtZXMiLCJ0ZXhTaXplcyIsInRleHR1cmVTaXplcyIsInRleE5hbWUiLCJpbWFnZUxheWVyVGV4dHVyZXMiLCJpbWFnZUxheWVyVGV4dHVyZU5hbWVzIiwidHN4RmlsZU5hbWVzIiwidHN4RmlsZXMiLCJ0c3hNYXAiLCJ0ZXh0IiwibWFwSW5mbyIsIlRNWE1hcEluZm8iLCJ0bXhYbWxTdHIiLCJ0aWxlc2V0cyIsImdldFRpbGVzZXRzIiwibG9nSUQiLCJfYnVpbGRXaXRoTWFwSW5mbyIsIl9yZWxlYXNlTWFwSW5mbyIsInJlbW92ZUZyb21QYXJlbnQiLCJkZXN0cm95IiwiaW1hZ2VzIiwiYW5jaG9yIiwiZ2V0QW5jaG9yUG9pbnQiLCJsZWZ0VG9wWCIsIndpZHRoIiwieCIsImxlZnRUb3BZIiwiaGVpZ2h0IiwieSIsImxheWVySW5mbyIsImxheWVyTm9kZSIsInNldEFuY2hvclBvaW50IiwiZ3JvdXBJbmZvIiwiZ3JvdXBOb2RlIiwiYW5jaG9yWCIsImFuY2hvclkiLCJfb2Zmc2V0IiwiaW1hZ2UiLCJfZmlsbEFuaUdyaWRzIiwidGV4R3JpZHMiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uIiwiZnJhbWVzIiwiaiIsImZyYW1lIiwiZ3JpZCIsInRpbGVpZCIsIl9idWlsZExheWVyQW5kR3JvdXAiLCJ0aWxlc2V0SW5mbyIsImZpbGxUZXh0dXJlR3JpZHMiLCJvbGROb2RlTmFtZXMiLCJuIiwiX25hbWUiLCJfbWFwSW5mbyIsImxheWVySW5mb3MiLCJnZXRBbGxDaGlsZHJlbiIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwibGVuIiwiY2hpbGQiLCJnZXRDaGlsZEJ5TmFtZSIsImFkZENoaWxkIiwic2V0U2libGluZ0luZGV4IiwiYWN0aXZlIiwidmlzaWJsZSIsIlRNWExheWVySW5mbyIsImdldENvbXBvbmVudCIsIlRpbGVkTGF5ZXIiLCJhZGRDb21wb25lbnQiLCJfaW5pdCIsIm93blRpbGVzIiwicHVzaCIsIlRNWE9iamVjdEdyb3VwSW5mbyIsIlRpbGVkT2JqZWN0R3JvdXAiLCJUTVhJbWFnZUxheWVySW5mbyIsInRleHR1cmUiLCJzb3VyY2VJbWFnZSIsIm9wYWNpdHkiLCJ2MiIsIm9mZnNldCIsIlNwcml0ZSIsInNwZiIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJzZXRUZXh0dXJlIiwiTWF0aCIsIm1heCIsImNoaWxkcmVuIiwiYyIsIm9yaWVudGF0aW9uIiwiZ2V0VGlsZVByb3BlcnRpZXMiLCJnZXRJbWFnZUxheWVycyIsImdldFRpbGVBbmltYXRpb25zIiwidG90YWxUZXh0dXJlcyIsImltYWdlTGF5ZXIiLCJsb2FkQWxsVGV4dHVyZXMiLCJiaW5kIiwidXBkYXRlIiwiZHQiLCJhbmlHSUQiLCJmcmFtZUlkeCIsImR1cmF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRlZENhbGxiYWNrIiwidG90YWxOdW0iLCJjdXJOdW0iLCJpdGVtQ2FsbGJhY2siLCJ0ZXgiLCJsb2FkZWQiLCJvbmNlIiwidGlsZXNldCIsInRleElkIiwiaW1hZ2VTaXplIiwidHciLCJ0aCIsImltYWdlVyIsImltYWdlSCIsInNwYWNpbmciLCJtYXJnaW4iLCJjb2xzIiwiZmxvb3IiLCJyb3dzIiwiY291bnQiLCJnaWQiLCJmaXJzdEdpZCIsIm92ZXJyaWRlIiwidGV4ZWxDb3JyZWN0IiwibWFjcm8iLCJGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTF9UTVgiLCJtYXhHaWQiLCJ0IiwiciIsImIiLCJyZWN0Rm9yR0lEIiwianMiLCJvYnNvbGV0ZSIsInByb3RvdHlwZSIsImVycm9ySUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxPQUFPLENBQUMsa0JBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxnQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsZUFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsc0JBQUQsQ0FBUDtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUMsV0FBVyxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN0QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUUsQ0FSZTs7QUFVdEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsR0FBRyxFQUFFLENBakJpQjs7QUFtQnRCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEdBQUcsRUFBRTtBQTFCaUIsQ0FBUixDQUFsQjtBQTZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLFFBQVEsR0FBR0wsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbkI7QUFDSjtBQUNB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QVY7QUFDQWxGLElBQUFBLElBQUksQ0FBQ2pCLENBQUwsSUFBVW1HLFlBQVY7QUFDQWxGLElBQUFBLElBQUksQ0FBQ3JCLEtBQUwsSUFBY3VHLFlBQVksR0FBQyxDQUEzQjtBQUNBbEYsSUFBQUEsSUFBSSxDQUFDbEIsTUFBTCxJQUFlb0csWUFBWSxHQUFDLENBQTVCO0FBQ0FsRixJQUFBQSxJQUFJLENBQUNzRixDQUFMLEdBQVV0RixJQUFJLENBQUNqQixDQUFOLEdBQVd5RixNQUFwQjtBQUNBeEUsSUFBQUEsSUFBSSxDQUFDOUUsQ0FBTCxHQUFVOEUsSUFBSSxDQUFDcEIsQ0FBTixHQUFXMkYsTUFBcEI7QUFDQXZFLElBQUFBLElBQUksQ0FBQ3VGLENBQUwsR0FBUyxDQUFDdkYsSUFBSSxDQUFDcEIsQ0FBTCxHQUFTb0IsSUFBSSxDQUFDckIsS0FBZixJQUF3QjRGLE1BQWpDO0FBQ0F2RSxJQUFBQSxJQUFJLENBQUN3RixDQUFMLEdBQVMsQ0FBQ3hGLElBQUksQ0FBQ2pCLENBQUwsR0FBU2lCLElBQUksQ0FBQ2xCLE1BQWYsSUFBeUIwRixNQUFsQztBQUNBOUUsSUFBQUEsUUFBUSxDQUFDcUYsR0FBRCxDQUFSLEdBQWdCL0UsSUFBaEI7QUFDSDtBQUNKLENBM0REOztBQTZEQTVKLEVBQUUsQ0FBQ3NQLEVBQUgsQ0FBTUMsUUFBTixDQUFldlAsRUFBRSxDQUFDb0MsUUFBSCxDQUFZb04sU0FBM0IsRUFBc0MscUJBQXRDLEVBQTZELFVBQTdELEVBQXlFLElBQXpFO0FBQ0F4UCxFQUFFLENBQUNzUCxFQUFILENBQU10TCxHQUFOLENBQVVoRSxFQUFFLENBQUNvQyxRQUFILENBQVlvTixTQUF0QixFQUFpQyxXQUFqQyxFQUE4QyxZQUFZO0FBQ3REeFAsRUFBQUEsRUFBRSxDQUFDeVAsT0FBSCxDQUFXLElBQVg7QUFDQSxTQUFPLEVBQVA7QUFDSCxDQUhELEVBR0csS0FISCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnJlcXVpcmUoJy4vQ0NUTVhYTUxQYXJzZXInKTtcclxucmVxdWlyZSgnLi9DQ1RpbGVkTWFwQXNzZXQnKTtcclxucmVxdWlyZSgnLi9DQ1RpbGVkTGF5ZXInKTtcclxucmVxdWlyZSgnLi9DQ1RpbGVkVGlsZScpO1xyXG5yZXF1aXJlKCcuL0NDVGlsZWRPYmplY3RHcm91cCcpO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIG9yaWVudGF0aW9uIG9mIHRpbGVkIG1hcC5cclxuICogISN6aCBUaWxlZCBNYXAg5Zyw5Zu+5pa55ZCR44CCXHJcbiAqIEBlbnVtIFRpbGVkTWFwLk9yaWVudGF0aW9uXHJcbiAqIEBzdGF0aWNcclxuICovXHJcbmxldCBPcmllbnRhdGlvbiA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE9ydGhvZ29uYWwgb3JpZW50YXRpb24uXHJcbiAgICAgKiAhI3poIOebtOinkum4n+eesOWcsOWbvu+8iDkwwrDlnLDlm77vvInjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBPUlRIT1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgT1JUSE86IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEhleGFnb25hbCBvcmllbnRhdGlvbi5cclxuICAgICAqICEjemgg5YWt6L655b2i5Zyw5Zu+XHJcbiAgICAgKiBAcHJvcGVydHkgSEVYXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBIRVg6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJc29tZXRyaWMgb3JpZW50YXRpb24uXHJcbiAgICAgKiDnrYnot53mlpzop4blnLDlm77vvIjmlpw0NcKw5Zyw5Zu+77yJ44CCXHJcbiAgICAgKiBAcHJvcGVydHkgSVNPXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBJU086IDJcclxufSk7XHJcblxyXG4vKipcclxuICogVGhlIHByb3BlcnR5IHR5cGUgb2YgdGlsZWQgbWFwLlxyXG4gKiBAZW51bSBUaWxlZE1hcC5Qcm9wZXJ0eVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5sZXQgUHJvcGVydHkgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IE5PTkVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIE5PTkU6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgTUFQXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBNQVA6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgTEFZRVJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIExBWUVSOiAyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IE9CSkVDVEdST1VQXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBPQkpFQ1RHUk9VUDogMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPQkpFQ1RcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIE9CSkVDVDogNCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBUSUxFXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBUSUxFOiA1XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRoZSB0aWxlIGZsYWdzIG9mIHRpbGVkIG1hcC5cclxuICogQGVudW0gVGlsZWRNYXAuVGlsZUZsYWdcclxuICogQHN0YXRpY1xyXG4gKi9cclxubGV0IFRpbGVGbGFnID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBIT1JJWk9OVEFMXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBIT1JJWk9OVEFMOiAweDgwMDAwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFZFUlRJQ0FMXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBWRVJUSUNBTDogMHg0MDAwMDAwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBESUFHT05BTFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgRElBR09OQUw6IDB4MjAwMDAwMDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgRkxJUFBFRF9BTExcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIEZMSVBQRURfQUxMOiAoMHg4MDAwMDAwMCB8IDB4NDAwMDAwMDAgfCAweDIwMDAwMDAwIHwgMHgxMDAwMDAwMCkgPj4+IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgRkxJUFBFRF9NQVNLXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBGTElQUEVEX01BU0s6ICh+KDB4ODAwMDAwMDAgfCAweDQwMDAwMDAwIHwgMHgyMDAwMDAwMCB8IDB4MTAwMDAwMDApKSA+Pj4gMFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBzdGFnZ2VyIGF4aXMgb2YgSGV4IHRpbGVkIG1hcC5cclxuICogISN6aCDlha3ovrnlvaLlnLDlm77nmoQgc3RhZ2dlciBheGlzIOWAvFxyXG4gKiBAZW51bSBUaWxlZE1hcC5TdGFnZ2VyQXhpc1xyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5sZXQgU3RhZ2dlckF4aXMgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFNUQUdHRVJBWElTX1hcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIFNUQUdHRVJBWElTX1ggOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFNUQUdHRVJBWElTX1lcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIFNUQUdHRVJBWElTX1kgOiAxXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIHN0YWdnZXIgaW5kZXggb2YgSGV4IHRpbGVkIG1hcC5cclxuICogISN6aCDlha3ovrnlvaLlnLDlm77nmoQgc3RhZ2dlciBpbmRleCDlgLxcclxuICogQGVudW0gVGlsZWRNYXAuUmVuZGVyT3JkZXJcclxuICogQHN0YXRpY1xyXG4gKi9cclxubGV0IFN0YWdnZXJJbmRleCA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgU1RBR0dFUklOREVYX09ERFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgU1RBR0dFUklOREVYX09ERCA6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgU1RBR0dFUklOREVYX0VWRU5cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIFNUQUdHRVJJTkRFWF9FVkVOIDogMVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSByZW5kZXIgb3JkZXIgb2YgdGlsZWQgbWFwLlxyXG4gKiAhI3poIOWcsOWbvueahOa4suafk+mhuuW6j1xyXG4gKiBAZW51bSBUaWxlZE1hcC5SZW5kZXJPcmRlclxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5sZXQgUmVuZGVyT3JkZXIgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFJpZ2h0RG93blxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgUmlnaHREb3duIDogMCxcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFJpZ2h0VXBcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIFJpZ2h0VXAgOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgTGVmdERvd25cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIExlZnREb3duOiAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgTGVmdFVwXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBMZWZ0VXA6IDMsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGlsZWRNYXAgT2JqZWN0IFR5cGVcclxuICogISN6aCDlnLDlm77niankvZPnsbvlnotcclxuICogQGVudW0gVGlsZWRNYXAuVE1YT2JqZWN0VHlwZVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5sZXQgVE1YT2JqZWN0VHlwZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgUkVDVFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgUkVDVCA6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgRUxMSVBTRVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgRUxMSVBTRSA6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgUE9MWUdPTlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgUE9MWUdPTiA6IDIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgUE9MWUxJTkVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIFBPTFlMSU5FIDogMyxcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgSU1BR0VcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIElNQUdFIDogNCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBURVhUXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBURVhUOiA1LFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFJlbmRlcnMgYSBUTVggVGlsZSBNYXAgaW4gdGhlIHNjZW5lLlxyXG4gKiAhI3poIOWcqOWcuuaZr+S4rea4suafk+S4gOS4qiB0bXgg5qC85byP55qEIFRpbGUgTWFw44CCXHJcbiAqIEBjbGFzcyBUaWxlZE1hcFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmxldCBUaWxlZE1hcCA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5UaWxlZE1hcCcsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucmVuZGVyZXJzL1RpbGVkTWFwJyxcclxuICAgIH0sXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgLy8gc3RvcmUgYWxsIGxheWVyIGdpZCBjb3JyZXNwb25kaW5nIHRleHR1cmUgaW5mbywgaW5kZXggaXMgZ2lkLCBmb3JtYXQgbGlrZXMgJ1tnaWQwXT10ZXgtaW5mbyxbZ2lkMV09dGV4LWluZm8sIC4uLidcclxuICAgICAgICB0aGlzLl90ZXhHcmlkcyA9IFtdO1xyXG4gICAgICAgIC8vIHN0b3JlIGFsbCB0aWxlc2V0IHRleHR1cmUsIGluZGV4IGlzIHRpbGVzZXQgaW5kZXgsIGZvcm1hdCBsaWtlcyAnWzBdPXRleHR1cmUwLCBbMV09dGV4dHVyZTEsIC4uLidcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gW107XHJcblxyXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbnMgPSBbXTtcclxuICAgICAgICB0aGlzLl9pbWFnZUxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2xheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2dyb3VwcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl90aWxlUHJvcGVydGllcyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9tYXBTaXplID0gY2Muc2l6ZSgwLCAwKTtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IGNjLnNpemUoMCwgMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBPcmllbnRhdGlvbjogT3JpZW50YXRpb24sXHJcbiAgICAgICAgUHJvcGVydHk6IFByb3BlcnR5LFxyXG4gICAgICAgIFRpbGVGbGFnOiBUaWxlRmxhZyxcclxuICAgICAgICBTdGFnZ2VyQXhpczogU3RhZ2dlckF4aXMsXHJcbiAgICAgICAgU3RhZ2dlckluZGV4OiBTdGFnZ2VySW5kZXgsXHJcbiAgICAgICAgVE1YT2JqZWN0VHlwZTogVE1YT2JqZWN0VHlwZSxcclxuICAgICAgICBSZW5kZXJPcmRlcjogUmVuZGVyT3JkZXJcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF90bXhGaWxlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlRpbGVkTWFwQXNzZXRcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIFRpbGVkTWFwIEFzc2V0LlxyXG4gICAgICAgICAqICEjemggVGlsZWRNYXAg6LWE5rqQ44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtUaWxlZE1hcEFzc2V0fSB0bXhBc3NldFxyXG4gICAgICAgICAqIEBkZWZhdWx0IFwiXCJcclxuICAgICAgICAgKi9cclxuICAgICAgICB0bXhBc3NldCA6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90bXhGaWxlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlLCBmb3JjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RteEZpbGUgIT09IHZhbHVlIHx8IChDQ19FRElUT1IgJiYgZm9yY2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG14RmlsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5UaWxlZE1hcEFzc2V0XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyB0aGUgbWFwIHNpemUuXHJcbiAgICAgKiAhI3poIOiOt+WPluWcsOWbvuWkp+Wwj+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRNYXBTaXplXHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBtYXBTaXplID0gdGlsZWRNYXAuZ2V0TWFwU2l6ZSgpO1xyXG4gICAgICogY2MubG9nKFwiTWFwIFNpemU6IFwiICsgbWFwU2l6ZSk7XHJcbiAgICAgKi9cclxuICAgIGdldE1hcFNpemUgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBTaXplO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyB0aGUgdGlsZSBzaXplLlxyXG4gICAgICogISN6aCDojrflj5blnLDlm77og4zmma/kuK0gdGlsZSDlhYPntKDnmoTlpKflsI/jgIJcclxuICAgICAqIEBtZXRob2QgZ2V0VGlsZVNpemVcclxuICAgICAqIEByZXR1cm4ge1NpemV9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHRpbGVTaXplID0gdGlsZWRNYXAuZ2V0VGlsZVNpemUoKTtcclxuICAgICAqIGNjLmxvZyhcIlRpbGUgU2l6ZTogXCIgKyB0aWxlU2l6ZSk7XHJcbiAgICAgKi9cclxuICAgIGdldFRpbGVTaXplICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVNpemU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBtYXAgb3JpZW50YXRpb24uXHJcbiAgICAgKiAhI3poIOiOt+WPluWcsOWbvuaWueWQkeOAglxyXG4gICAgICogQG1ldGhvZCBnZXRNYXBPcmllbnRhdGlvblxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBtYXBPcmllbnRhdGlvbiA9IHRpbGVkTWFwLmdldE1hcE9yaWVudGF0aW9uKCk7XHJcbiAgICAgKiBjYy5sb2coXCJNYXAgT3JpZW50YXRpb246IFwiICsgbWFwT3JpZW50YXRpb24pO1xyXG4gICAgICovXHJcbiAgICBnZXRNYXBPcmllbnRhdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcE9yaWVudGF0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gb2JqZWN0IGdyb3Vwcy5cclxuICAgICAqICEjemgg6I635Y+W5omA5pyJ55qE5a+56LGh5bGC44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldE9iamVjdEdyb3Vwc1xyXG4gICAgICogQHJldHVybiB7VGlsZWRPYmplY3RHcm91cFtdfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGxldCBvYmpHcm91cHMgPSB0aXRsZWRNYXAuZ2V0T2JqZWN0R3JvdXBzKCk7XHJcbiAgICAgKiBmb3IgKGxldCBpID0gMDsgaSA8IG9iakdyb3Vwcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICogICAgIGNjLmxvZyhcIm9iajogXCIgKyBvYmpHcm91cHNbaV0pO1xyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICBnZXRPYmplY3RHcm91cHMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ncm91cHM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm4gdGhlIFRNWE9iamVjdEdyb3VwIGZvciB0aGUgc3BlY2lmaWMgZ3JvdXAuXHJcbiAgICAgKiAhI3poIOiOt+WPluaMh+WumueahCBUTVhPYmplY3RHcm91cOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRPYmplY3RHcm91cFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGdyb3VwTmFtZVxyXG4gICAgICogQHJldHVybiB7VGlsZWRPYmplY3RHcm91cH1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsZXQgZ3JvdXAgPSB0aXRsZWRNYXAuZ2V0T2JqZWN0R3JvdXAoXCJQbGF5ZXJzXCIpO1xyXG4gICAgICogY2MubG9nKFwiT2JqZWN0R3JvdXA6IFwiICsgZ3JvdXApO1xyXG4gICAgICovXHJcbiAgICBnZXRPYmplY3RHcm91cCAoZ3JvdXBOYW1lKSB7XHJcbiAgICAgICAgbGV0IGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGdyb3Vwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyb3VwID0gZ3JvdXBzW2ldO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXAgJiYgZ3JvdXAuZ2V0R3JvdXBOYW1lKCkgPT09IGdyb3VwTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGVuYWJsZSBvciBkaXNhYmxlIGN1bGxpbmdcclxuICAgICAqICEjemgg5byA5ZCv5oiW5YWz6Zet6KOB5Ymq44CCXHJcbiAgICAgKiBAbWV0aG9kIGVuYWJsZUN1bGxpbmdcclxuICAgICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBlbmFibGVDdWxsaW5nICh2YWx1ZSkge1xyXG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGF5ZXJzW2ldLmVuYWJsZUN1bGxpbmcodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldHMgdGhlIG1hcCBwcm9wZXJ0aWVzLlxyXG4gICAgICogISN6aCDojrflj5blnLDlm77nmoTlsZ7mgKfjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydGllc1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0W119XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IHByb3BlcnRpZXMgPSB0aXRsZWRNYXAuZ2V0UHJvcGVydGllcygpO1xyXG4gICAgICogZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgKiAgICAgY2MubG9nKFwiUHJvcGVydGllczogXCIgKyBwcm9wZXJ0aWVzW2ldKTtcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJvcGVydGllcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm4gQWxsIGxheWVycyBhcnJheS5cclxuICAgICAqICEjemgg6L+U5Zue5YyF5ZCr5omA5pyJIGxheWVyIOeahOaVsOe7hOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRMYXllcnNcclxuICAgICAqIEByZXR1cm5zIHtUaWxlZExheWVyW119XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IGxheWVycyA9IHRpdGxlZE1hcC5nZXRMYXllcnMoKTtcclxuICAgICAqIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgKiAgICAgY2MubG9nKFwiTGF5ZXJzOiBcIiArIGxheWVyc1tpXSk7XHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIGdldExheWVycyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xheWVycztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIHJldHVybiB0aGUgY2MuVGlsZWRMYXllciBmb3IgdGhlIHNwZWNpZmljIGxheWVyLlxyXG4gICAgICogISN6aCDojrflj5bmjIflrprlkI3np7DnmoQgbGF5ZXLjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0TGF5ZXJcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBsYXllck5hbWVcclxuICAgICAqIEByZXR1cm4ge1RpbGVkTGF5ZXJ9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogbGV0IGxheWVyID0gdGl0bGVkTWFwLmdldExheWVyKFwiUGxheWVyXCIpO1xyXG4gICAgICogY2MubG9nKGxheWVyKTtcclxuICAgICAqL1xyXG4gICAgZ2V0TGF5ZXIgKGxheWVyTmFtZSkge1xyXG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsYXllcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXllciA9IGxheWVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldExheWVyTmFtZSgpID09PSBsYXllck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYXllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgX2NoYW5nZUxheWVyIChsYXllck5hbWUsIHJlcGxhY2VMYXllcikge1xyXG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsYXllcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXllciA9IGxheWVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmdldExheWVyTmFtZSgpID09PSBsYXllck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxheWVyc1tpXSA9IHJlcGxhY2VMYXllcjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybiB0aGUgdmFsdWUgZm9yIHRoZSBzcGVjaWZpYyBwcm9wZXJ0eSBuYW1lLlxyXG4gICAgICogISN6aCDpgJrov4flsZ7mgKflkI3np7DvvIzojrflj5bmjIflrprnmoTlsZ7mgKfjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0UHJvcGVydHlcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eU5hbWVcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsZXQgcHJvcGVydHkgPSB0aXRsZWRNYXAuZ2V0UHJvcGVydHkoXCJpbmZvXCIpO1xyXG4gICAgICogY2MubG9nKFwiUHJvcGVydHk6IFwiICsgcHJvcGVydHkpO1xyXG4gICAgICovXHJcbiAgICBnZXRQcm9wZXJ0eSAocHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lLnRvU3RyaW5nKCldO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV0dXJuIHByb3BlcnRpZXMgZGljdGlvbmFyeSBmb3IgdGlsZSBHSUQuXHJcbiAgICAgKiAhI3poIOmAmui/hyBHSUQg77yM6I635Y+W5oyH5a6a55qE5bGe5oCn44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnRpZXNGb3JHSURcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBHSURcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsZXQgcHJvcGVydGllcyA9IHRpdGxlZE1hcC5nZXRQcm9wZXJ0aWVzRm9yR0lEKEdJRCk7XHJcbiAgICAgKiBjYy5sb2coXCJQcm9wZXJ0aWVzOiBcIiArIHByb3BlcnRpZXMpO1xyXG4gICAgICovXHJcbiAgICBnZXRQcm9wZXJ0aWVzRm9yR0lEIChHSUQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGlsZVByb3BlcnRpZXNbR0lEXTtcclxuICAgIH0sXHJcblxyXG4gICAgX19wcmVsb2FkICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdG14RmlsZSkge1xyXG4gICAgICAgICAgICAvLyByZWZyZXNoIGxheWVyIGVudGl0aWVzXHJcbiAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fc3luY0FuY2hvclBvaW50LCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9zeW5jQW5jaG9yUG9pbnQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYXBwbHlGaWxlICgpIHtcclxuICAgICAgICBsZXQgZmlsZSA9IHRoaXMuX3RteEZpbGU7XHJcbiAgICAgICAgaWYgKGZpbGUpIHtcclxuICAgICAgICAgICAgbGV0IHRleFZhbHVlcyA9IGZpbGUudGV4dHVyZXM7XHJcbiAgICAgICAgICAgIGxldCB0ZXhLZXlzID0gZmlsZS50ZXh0dXJlTmFtZXM7XHJcbiAgICAgICAgICAgIGxldCB0ZXhTaXplcyA9IGZpbGUudGV4dHVyZVNpemVzO1xyXG4gICAgICAgICAgICBsZXQgdGV4dHVyZXMgPSB7fTtcclxuICAgICAgICAgICAgbGV0IHRleHR1cmVTaXplcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleFZhbHVlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRleE5hbWUgPSB0ZXhLZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZXNbdGV4TmFtZV0gPSB0ZXhWYWx1ZXNbaV07XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlU2l6ZXNbdGV4TmFtZV0gPSB0ZXhTaXplc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGltYWdlTGF5ZXJUZXh0dXJlcyA9IHt9O1xyXG4gICAgICAgICAgICB0ZXhWYWx1ZXMgPSBmaWxlLmltYWdlTGF5ZXJUZXh0dXJlcztcclxuICAgICAgICAgICAgdGV4S2V5cyA9IGZpbGUuaW1hZ2VMYXllclRleHR1cmVOYW1lcztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXhWYWx1ZXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlTGF5ZXJUZXh0dXJlc1t0ZXhLZXlzW2ldXSA9IHRleFZhbHVlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRzeEZpbGVOYW1lcyA9IGZpbGUudHN4RmlsZU5hbWVzO1xyXG4gICAgICAgICAgICBsZXQgdHN4RmlsZXMgPSBmaWxlLnRzeEZpbGVzO1xyXG4gICAgICAgICAgICBsZXQgdHN4TWFwID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHN4RmlsZU5hbWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHN4RmlsZU5hbWVzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0c3hNYXBbdHN4RmlsZU5hbWVzW2ldXSA9IHRzeEZpbGVzW2ldLnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtYXBJbmZvID0gbmV3IGNjLlRNWE1hcEluZm8oZmlsZS50bXhYbWxTdHIsIHRzeE1hcCwgdGV4dHVyZXMsIHRleHR1cmVTaXplcywgaW1hZ2VMYXllclRleHR1cmVzKTtcclxuICAgICAgICAgICAgbGV0IHRpbGVzZXRzID0gbWFwSW5mby5nZXRUaWxlc2V0cygpO1xyXG4gICAgICAgICAgICBpZighdGlsZXNldHMgfHwgdGlsZXNldHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgY2MubG9nSUQoNzI0MSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9idWlsZFdpdGhNYXBJbmZvKG1hcEluZm8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVsZWFzZU1hcEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZWxlYXNlTWFwSW5mbyAoKSB7XHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBsYXllcnMgJiBvYmplY3QgZ3JvdXBzIGFkZGVkIGJlZm9yZVxyXG4gICAgICAgIGxldCBsYXllcnMgPSB0aGlzLl9sYXllcnM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsYXllcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxheWVyc1tpXS5ub2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGxheWVyc1tpXS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGF5ZXJzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxldCBncm91cHMgPSB0aGlzLl9ncm91cHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBncm91cHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdyb3Vwc1tpXS5ub2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGdyb3Vwc1tpXS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JvdXBzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZXMgPSB0aGlzLl9pbWFnZXM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpbWFnZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGltYWdlc1tpXS5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xyXG4gICAgICAgICAgICBpbWFnZXNbaV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbWFnZXMubGVuZ3RoID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgX3N5bmNBbmNob3JQb2ludCAoKSB7XHJcbiAgICAgICAgbGV0IGFuY2hvciA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xyXG4gICAgICAgIGxldCBsZWZ0VG9wWCA9IHRoaXMubm9kZS53aWR0aCAqIGFuY2hvci54O1xyXG4gICAgICAgIGxldCBsZWZ0VG9wWSA9IHRoaXMubm9kZS5oZWlnaHQgKiAoMSAtIGFuY2hvci55KTtcclxuICAgICAgICBsZXQgaSwgbDtcclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5fbGF5ZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXJJbmZvID0gdGhpcy5fbGF5ZXJzW2ldO1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXJOb2RlID0gbGF5ZXJJbmZvLm5vZGU7XHJcbiAgICAgICAgICAgIC8vIFRpbGVkIGxheWVyIHN5bmMgYW5jaG9yIHRvIG1hcCBiZWNhdXNlIGl0J3Mgb2xkIGJlaGF2aW9yLFxyXG4gICAgICAgICAgICAvLyBkbyBub3QgY2hhbmdlIHRoZSBiZWhhdmlvciBhdm9pZCBpbmZsdWVuY2UgdXNlcidzIGV4aXN0ZWQgbG9naWMuXHJcbiAgICAgICAgICAgIGxheWVyTm9kZS5zZXRBbmNob3JQb2ludChhbmNob3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHRoaXMuX2dyb3Vwcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGdyb3VwSW5mbyA9IHRoaXMuX2dyb3Vwc1tpXTtcclxuICAgICAgICAgICAgbGV0IGdyb3VwTm9kZSA9IGdyb3VwSW5mby5ub2RlO1xyXG4gICAgICAgICAgICAvLyBHcm91cCBsYXllciBub3Qgc3luYyBhbmNob3IgdG8gbWFwIGJlY2F1c2UgaXQncyBvbGQgYmVoYXZpb3IsXHJcbiAgICAgICAgICAgIC8vIGRvIG5vdCBjaGFuZ2UgdGhlIGJlaGF2aW9yIGF2b2lkIGluZmx1ZW5jZSB1c2VyJ3MgZXhpc3RpbmcgbG9naWMuXHJcbiAgICAgICAgICAgIGdyb3VwTm9kZS5hbmNob3JYID0gMC41O1xyXG4gICAgICAgICAgICBncm91cE5vZGUuYW5jaG9yWSA9IDAuNTtcclxuICAgICAgICAgICAgZ3JvdXBOb2RlLnggPSBncm91cEluZm8uX29mZnNldC54IC0gbGVmdFRvcFggKyBncm91cE5vZGUud2lkdGggKiBncm91cE5vZGUuYW5jaG9yWDtcclxuICAgICAgICAgICAgZ3JvdXBOb2RlLnkgPSBncm91cEluZm8uX29mZnNldC55ICsgbGVmdFRvcFkgLSBncm91cE5vZGUuaGVpZ2h0ICogZ3JvdXBOb2RlLmFuY2hvclk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5faW1hZ2VzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLl9pbWFnZXNbaV07XHJcbiAgICAgICAgICAgIGltYWdlLmFuY2hvclggPSAwLjU7XHJcbiAgICAgICAgICAgIGltYWdlLmFuY2hvclkgPSAwLjU7XHJcbiAgICAgICAgICAgIGltYWdlLnggPSBpbWFnZS5fb2Zmc2V0LnggLSBsZWZ0VG9wWCArIGltYWdlLndpZHRoICogaW1hZ2UuYW5jaG9yWDtcclxuICAgICAgICAgICAgaW1hZ2UueSA9IGltYWdlLl9vZmZzZXQueSArIGxlZnRUb3BZIC0gaW1hZ2UuaGVpZ2h0ICogaW1hZ2UuYW5jaG9yWTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9maWxsQW5pR3JpZHMgKHRleEdyaWRzLCBhbmltYXRpb25zKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBhbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBhbmltYXRpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbikgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCBmcmFtZXMgPSBhbmltYXRpb24uZnJhbWVzO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZyYW1lcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZyYW1lID0gZnJhbWVzW2pdO1xyXG4gICAgICAgICAgICAgICAgZnJhbWUuZ3JpZCA9IHRleEdyaWRzW2ZyYW1lLnRpbGVpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9idWlsZExheWVyQW5kR3JvdXAgKCkge1xyXG4gICAgICAgIGxldCB0aWxlc2V0cyA9IHRoaXMuX3RpbGVzZXRzO1xyXG4gICAgICAgIGxldCB0ZXhHcmlkcyA9IHRoaXMuX3RleEdyaWRzO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25zID0gdGhpcy5fYW5pbWF0aW9ucztcclxuICAgICAgICB0ZXhHcmlkcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGlsZXNldHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlc2V0SW5mbyA9IHRpbGVzZXRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXRpbGVzZXRJbmZvKSBjb250aW51ZTtcclxuICAgICAgICAgICAgY2MuVGlsZWRNYXAuZmlsbFRleHR1cmVHcmlkcyh0aWxlc2V0SW5mbywgdGV4R3JpZHMsIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9maWxsQW5pR3JpZHModGV4R3JpZHMsIGFuaW1hdGlvbnMpO1xyXG5cclxuICAgICAgICBsZXQgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xyXG4gICAgICAgIGxldCBncm91cHMgPSB0aGlzLl9ncm91cHM7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IHRoaXMuX2ltYWdlcztcclxuICAgICAgICBsZXQgb2xkTm9kZU5hbWVzID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9sZE5vZGVOYW1lc1tsYXllcnNbaV0ubm9kZS5fbmFtZV0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGdyb3Vwcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgb2xkTm9kZU5hbWVzW2dyb3Vwc1tpXS5ub2RlLl9uYW1lXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gaW1hZ2VzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBvbGROb2RlTmFtZXNbaW1hZ2VzW2ldLl9uYW1lXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsYXllcnMgPSB0aGlzLl9sYXllcnMgPSBbXTtcclxuICAgICAgICBncm91cHMgPSB0aGlzLl9ncm91cHMgPSBbXTtcclxuICAgICAgICBpbWFnZXMgPSB0aGlzLl9pbWFnZXMgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IG1hcEluZm8gPSB0aGlzLl9tYXBJbmZvO1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGxldCBsYXllckluZm9zID0gbWFwSW5mby5nZXRBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCB0ZXh0dXJlcyA9IHRoaXMuX3RleHR1cmVzO1xyXG4gICAgICAgIGxldCBtYXhXaWR0aCA9IDA7XHJcbiAgICAgICAgbGV0IG1heEhlaWdodCA9IDA7XHJcblxyXG4gICAgICAgIGlmIChsYXllckluZm9zICYmIGxheWVySW5mb3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGF5ZXJJbmZvcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxheWVySW5mbyA9IGxheWVySW5mb3NbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IGxheWVySW5mby5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIG9sZE5vZGVOYW1lc1tuYW1lXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2hpbGQuc2V0U2libGluZ0luZGV4KGkpO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuYWN0aXZlID0gbGF5ZXJJbmZvLnZpc2libGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxheWVySW5mbyBpbnN0YW5jZW9mIGNjLlRNWExheWVySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXllciA9IGNoaWxkLmdldENvbXBvbmVudChjYy5UaWxlZExheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyID0gY2hpbGQuYWRkQ29tcG9uZW50KGNjLlRpbGVkTGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsYXllci5faW5pdChsYXllckluZm8sIG1hcEluZm8sIHRpbGVzZXRzLCB0ZXh0dXJlcywgdGV4R3JpZHMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0ZWxsIHRoZSBsYXllcmluZm8gdG8gcmVsZWFzZSB0aGUgb3duZXJzaGlwIG9mIHRoZSB0aWxlcyBtYXAuXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJJbmZvLm93blRpbGVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGF5ZXJJbmZvIGluc3RhbmNlb2YgY2MuVE1YT2JqZWN0R3JvdXBJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlRpbGVkT2JqZWN0R3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXAgPSBjaGlsZC5hZGRDb21wb25lbnQoY2MuVGlsZWRPYmplY3RHcm91cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLl9pbml0KGxheWVySW5mbywgbWFwSW5mbywgdGV4R3JpZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxheWVySW5mbyBpbnN0YW5jZW9mIGNjLlRNWEltYWdlTGF5ZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHR1cmUgPSBsYXllckluZm8uc291cmNlSW1hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQub3BhY2l0eSA9IGxheWVySW5mby5vcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmxheWVySW5mbyA9IGxheWVySW5mbztcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5fb2Zmc2V0ID0gY2MudjIobGF5ZXJJbmZvLm9mZnNldC54LCAtbGF5ZXJJbmZvLm9mZnNldC55KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdlID0gY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IGNoaWxkLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BmID0gaW1hZ2Uuc3ByaXRlRnJhbWUgfHwgbmV3IGNjLlNwcml0ZUZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3BmLnNldFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3ByaXRlRnJhbWUgPSBzcGY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLndpZHRoID0gdGV4dHVyZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5oZWlnaHQgPSB0ZXh0dXJlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZXMucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSBNYXRoLm1heChtYXhXaWR0aCwgY2hpbGQud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgbWF4SGVpZ2h0ID0gTWF0aC5tYXgobWF4SGVpZ2h0LCBjaGlsZC5oZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChvbGROb2RlTmFtZXNbYy5fbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBtYXhXaWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX3N5bmNBbmNob3JQb2ludCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYnVpbGRXaXRoTWFwSW5mbyAobWFwSW5mbykge1xyXG4gICAgICAgIHRoaXMuX21hcEluZm8gPSBtYXBJbmZvO1xyXG4gICAgICAgIHRoaXMuX21hcFNpemUgPSBtYXBJbmZvLmdldE1hcFNpemUoKTtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZSA9IG1hcEluZm8uZ2V0VGlsZVNpemUoKTtcclxuICAgICAgICB0aGlzLl9tYXBPcmllbnRhdGlvbiA9IG1hcEluZm8ub3JpZW50YXRpb247XHJcbiAgICAgICAgdGhpcy5fcHJvcGVydGllcyA9IG1hcEluZm8ucHJvcGVydGllcztcclxuICAgICAgICB0aGlzLl90aWxlUHJvcGVydGllcyA9IG1hcEluZm8uZ2V0VGlsZVByb3BlcnRpZXMoKTtcclxuICAgICAgICB0aGlzLl9pbWFnZUxheWVycyA9IG1hcEluZm8uZ2V0SW1hZ2VMYXllcnMoKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRpb25zID0gbWFwSW5mby5nZXRUaWxlQW5pbWF0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuX3RpbGVzZXRzID0gbWFwSW5mby5nZXRUaWxlc2V0cygpO1xyXG5cclxuICAgICAgICBsZXQgdGlsZXNldHMgPSB0aGlzLl90aWxlc2V0cztcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxUZXh0dXJlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGlsZXNldHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XHJcbiAgICAgICAgICAgIGxldCB0aWxlc2V0SW5mbyA9IHRpbGVzZXRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXRpbGVzZXRJbmZvIHx8ICF0aWxlc2V0SW5mby5zb3VyY2VJbWFnZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVzW2ldID0gdGlsZXNldEluZm8uc291cmNlSW1hZ2U7XHJcbiAgICAgICAgICAgIHRvdGFsVGV4dHVyZXMucHVzaCh0aWxlc2V0SW5mby5zb3VyY2VJbWFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2ltYWdlTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZUxheWVyID0gdGhpcy5faW1hZ2VMYXllcnNbaV07XHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VMYXllciB8fCAhaW1hZ2VMYXllci5zb3VyY2VJbWFnZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRvdGFsVGV4dHVyZXMucHVzaChpbWFnZUxheWVyLnNvdXJjZUltYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNjLlRpbGVkTWFwLmxvYWRBbGxUZXh0dXJlcyAodG90YWxUZXh0dXJlcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9idWlsZExheWVyQW5kR3JvdXAoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbnMgPSB0aGlzLl9hbmltYXRpb25zO1xyXG4gICAgICAgIGxldCB0ZXhHcmlkcyA9IHRoaXMuX3RleEdyaWRzO1xyXG4gICAgICAgIGZvciAobGV0IGFuaUdJRCBpbiBhbmltYXRpb25zKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBhbmltYXRpb25zW2FuaUdJRF07XHJcbiAgICAgICAgICAgIGxldCBmcmFtZXMgPSBhbmltYXRpb24uZnJhbWVzO1xyXG4gICAgICAgICAgICBsZXQgZnJhbWUgPSBmcmFtZXNbYW5pbWF0aW9uLmZyYW1lSWR4XTtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLmR0ICs9IGR0O1xyXG4gICAgICAgICAgICBpZiAoZnJhbWUuZHVyYXRpb24gPCBhbmltYXRpb24uZHQpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5kdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb24uZnJhbWVJZHgrKztcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24uZnJhbWVJZHggPj0gZnJhbWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5mcmFtZUlkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGZyYW1lc1thbmltYXRpb24uZnJhbWVJZHhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRleEdyaWRzW2FuaUdJRF0gPSBmcmFtZS5ncmlkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuVGlsZWRNYXAgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkTWFwO1xyXG5cclxuY2MuVGlsZWRNYXAubG9hZEFsbFRleHR1cmVzID0gZnVuY3Rpb24gKHRleHR1cmVzLCBsb2FkZWRDYWxsYmFjaykge1xyXG4gICAgbGV0IHRvdGFsTnVtID0gdGV4dHVyZXMubGVuZ3RoO1xyXG4gICAgaWYgKHRvdGFsTnVtID09PSAwKSB7XHJcbiAgICAgICAgbG9hZGVkQ2FsbGJhY2soKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGN1ck51bSA9IDA7XHJcbiAgICBsZXQgaXRlbUNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGN1ck51bSArKztcclxuICAgICAgICBpZiAoY3VyTnVtID49IHRvdGFsTnVtKSB7XHJcbiAgICAgICAgICAgIGxvYWRlZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsTnVtOyBpKyspIHtcclxuICAgICAgICBsZXQgdGV4ID0gdGV4dHVyZXNbaV07XHJcbiAgICAgICAgaWYgKCF0ZXgubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIHRleC5vbmNlKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbUNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGl0ZW1DYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNjLlRpbGVkTWFwLmZpbGxUZXh0dXJlR3JpZHMgPSBmdW5jdGlvbiAodGlsZXNldCwgdGV4R3JpZHMsIHRleElkKSB7XHJcbiAgICBsZXQgdGV4ID0gdGlsZXNldC5zb3VyY2VJbWFnZTtcclxuXHJcbiAgICBpZiAoIXRpbGVzZXQuaW1hZ2VTaXplLndpZHRoIHx8ICF0aWxlc2V0LmltYWdlU2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICB0aWxlc2V0LmltYWdlU2l6ZS53aWR0aCA9IHRleC53aWR0aDtcclxuICAgICAgICB0aWxlc2V0LmltYWdlU2l6ZS5oZWlnaHQgPSB0ZXguaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0dyA9IHRpbGVzZXQuX3RpbGVTaXplLndpZHRoLFxyXG4gICAgICAgIHRoID0gdGlsZXNldC5fdGlsZVNpemUuaGVpZ2h0LFxyXG4gICAgICAgIGltYWdlVyA9IHRleC53aWR0aCxcclxuICAgICAgICBpbWFnZUggPSB0ZXguaGVpZ2h0LFxyXG4gICAgICAgIHNwYWNpbmcgPSB0aWxlc2V0LnNwYWNpbmcsXHJcbiAgICAgICAgbWFyZ2luID0gdGlsZXNldC5tYXJnaW4sXHJcblxyXG4gICAgICAgIGNvbHMgPSBNYXRoLmZsb29yKChpbWFnZVcgLSBtYXJnaW4qMiArIHNwYWNpbmcpIC8gKHR3ICsgc3BhY2luZykpLFxyXG4gICAgICAgIHJvd3MgPSBNYXRoLmZsb29yKChpbWFnZUggLSBtYXJnaW4qMiArIHNwYWNpbmcpIC8gKHRoICsgc3BhY2luZykpLFxyXG4gICAgICAgIGNvdW50ID0gcm93cyAqIGNvbHMsXHJcblxyXG4gICAgICAgIGdpZCA9IHRpbGVzZXQuZmlyc3RHaWQsXHJcbiAgICAgICAgZ3JpZCA9IG51bGwsXHJcbiAgICAgICAgb3ZlcnJpZGUgPSB0ZXhHcmlkc1tnaWRdID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICAgIHRleGVsQ29ycmVjdCA9IGNjLm1hY3JvLkZJWF9BUlRJRkFDVFNfQllfU1RSRUNISU5HX1RFWEVMX1RNWCA/IDAuNSA6IDA7XHJcblxyXG4gICAgLy8gVGlsZWRtYXAgbWF5IG5vdCBiZSBwYXJ0aXRpb25lZCBpbnRvIGJsb2NrcywgcmVzdWx0aW5nIGluIGEgY291bnQgdmFsdWUgb2YgMFxyXG4gICAgaWYgKGNvdW50IDw9IDApIHtcclxuICAgICAgICBjb3VudCA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1heEdpZCA9IHRpbGVzZXQuZmlyc3RHaWQgKyBjb3VudDtcclxuICAgIGZvciAoOyBnaWQgPCBtYXhHaWQ7ICsrZ2lkKSB7XHJcbiAgICAgICAgLy8gQXZvaWQgb3ZlcmxhcHBpbmdcclxuICAgICAgICBpZiAob3ZlcnJpZGUgJiYgIXRleEdyaWRzW2dpZF0pIHtcclxuICAgICAgICAgICAgb3ZlcnJpZGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFvdmVycmlkZSAmJiB0ZXhHcmlkc1tnaWRdKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ3JpZCA9IHtcclxuICAgICAgICAgICAgLy8gcmVjb3JkIHRleHR1cmUgaWRcclxuICAgICAgICAgICAgdGV4SWQ6IHRleElkLCBcclxuICAgICAgICAgICAgLy8gcmVjb3JkIGJlbG9uZyB0byB3aGljaCB0aWxlc2V0XHJcbiAgICAgICAgICAgIHRpbGVzZXQ6IHRpbGVzZXQsXHJcbiAgICAgICAgICAgIHg6IDAsIHk6IDAsIHdpZHRoOiB0dywgaGVpZ2h0OiB0aCxcclxuICAgICAgICAgICAgdDogMCwgbDogMCwgcjogMCwgYjogMCxcclxuICAgICAgICAgICAgZ2lkOiBnaWQsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aWxlc2V0LnJlY3RGb3JHSUQoZ2lkLCBncmlkKTtcclxuICAgICAgICBncmlkLnggKz0gdGV4ZWxDb3JyZWN0O1xyXG4gICAgICAgIGdyaWQueSArPSB0ZXhlbENvcnJlY3Q7XHJcbiAgICAgICAgZ3JpZC53aWR0aCAtPSB0ZXhlbENvcnJlY3QqMjtcclxuICAgICAgICBncmlkLmhlaWdodCAtPSB0ZXhlbENvcnJlY3QqMjtcclxuICAgICAgICBncmlkLnQgPSAoZ3JpZC55KSAvIGltYWdlSDtcclxuICAgICAgICBncmlkLmwgPSAoZ3JpZC54KSAvIGltYWdlVztcclxuICAgICAgICBncmlkLnIgPSAoZ3JpZC54ICsgZ3JpZC53aWR0aCkgLyBpbWFnZVc7XHJcbiAgICAgICAgZ3JpZC5iID0gKGdyaWQueSArIGdyaWQuaGVpZ2h0KSAvIGltYWdlSDtcclxuICAgICAgICB0ZXhHcmlkc1tnaWRdID0gZ3JpZDtcclxuICAgIH1cclxufTtcclxuXHJcbmNjLmpzLm9ic29sZXRlKGNjLlRpbGVkTWFwLnByb3RvdHlwZSwgJ2NjLlRpbGVkTWFwLnRteEZpbGUnLCAndG14QXNzZXQnLCB0cnVlKTtcclxuY2MuanMuZ2V0KGNjLlRpbGVkTWFwLnByb3RvdHlwZSwgJ21hcExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLmVycm9ySUQoNzIwMyk7XHJcbiAgICByZXR1cm4gW107XHJcbn0sIGZhbHNlKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=