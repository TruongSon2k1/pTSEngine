
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTMXXMLParser.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
'use strict';

var codec = require('../compression/ZipUtils');

var zlib = require('../compression/zlib.min');

var js = require('../core/platform/js');

require('../core/platform/CCSAXParser');

function uint8ArrayToUint32Array(uint8Arr) {
  if (uint8Arr.length % 4 !== 0) return null;
  var arrLen = uint8Arr.length / 4;
  var retArr = window.Uint32Array ? new Uint32Array(arrLen) : [];

  for (var i = 0; i < arrLen; i++) {
    var offset = i * 4;
    retArr[i] = uint8Arr[offset] + uint8Arr[offset + 1] * (1 << 8) + uint8Arr[offset + 2] * (1 << 16) + uint8Arr[offset + 3] * (1 << 24);
  }

  return retArr;
} // Bits on the far end of the 32-bit global tile ID (GID's) are used for tile flags

/**
 * cc.TMXLayerInfo contains the information about the layers like:
 * - Layer name
 * - Layer size
 * - Layer opacity at creation time (it can be modified at runtime)
 * - Whether the layer is visible (if it's not visible, then the CocosNode won't be created)
 * This information is obtained from the TMX file.
 * @class TMXLayerInfo
 */

/**
 * Properties of the layer info.
 * @property {Object} properties 
 */


cc.TMXLayerInfo = function () {
  this.properties = {};
  this.name = "";
  this._layerSize = null;
  this._tiles = [];
  this.visible = true;
  this._opacity = 0;
  this.ownTiles = true;
  this._minGID = 100000;
  this._maxGID = 0;
  this.offset = cc.v2(0, 0);
};

cc.TMXLayerInfo.prototype = {
  constructor: cc.TMXLayerInfo,

  /**
   * Gets the Properties.
   * @return {Object}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Set the Properties.
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  }
};
/**
 * cc.TMXImageLayerInfo contains the information about the image layers.
 * This information is obtained from the TMX file.
 * @class TMXImageLayerInfo
 */

cc.TMXImageLayerInfo = function () {
  this.name = "";
  this.visible = true;
  this.width = 0;
  this.height = 0;
  this.offset = cc.v2(0, 0);
  this._opacity = 0;
  this._trans = new cc.Color(255, 255, 255, 255);
  this.sourceImage = null;
};
/**
 * <p>cc.TMXObjectGroupInfo contains the information about the object group like:
 * - group name
 * - group size
 * - group opacity at creation time (it can be modified at runtime)
 * - Whether the group is visible
 *
 * This information is obtained from the TMX file.</p>
 * @class TMXObjectGroupInfo
 */

/**
 * Properties of the ObjectGroup info.
 * @property {Array} properties
 */


cc.TMXObjectGroupInfo = function () {
  this.properties = {};
  this.name = "";
  this._objects = [];
  this.visible = true;
  this._opacity = 0;
  this._color = new cc.Color(255, 255, 255, 255);
  this.offset = cc.v2(0, 0);
  this._draworder = 'topdown';
};

cc.TMXObjectGroupInfo.prototype = {
  constructor: cc.TMXObjectGroupInfo,

  /**
   * Gets the Properties.
   * @return {Array}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Set the Properties.
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  }
};
/**
 * <p>cc.TMXTilesetInfo contains the information about the tilesets like: <br />
 * - Tileset name<br />
 * - Tileset spacing<br />
 * - Tileset margin<br />
 * - size of the tiles<br />
 * - Image used for the tiles<br />
 * - Image size<br />
 *
 * This information is obtained from the TMX file. </p>
 * @class TMXTilesetInfo
 */

/**
 * Tileset name
 * @property {string} name
 */

/**
 * First grid
 * @property {number} firstGid 
 */

/**
 * Spacing
 * @property {number} spacing
 */

/**
 * Margin
 * @property {number} margin 
 */

/**
 * Texture containing the tiles (should be sprite sheet / texture atlas)
 * @property {any} sourceImage
 */

/**
 * Size in pixels of the image
 * @property {cc.Size} imageSize
 */

cc.TMXTilesetInfo = function () {
  // Tileset name
  this.name = ""; // First grid

  this.firstGid = 0; // Spacing

  this.spacing = 0; // Margin

  this.margin = 0; // Texture containing the tiles (should be sprite sheet / texture atlas)

  this.sourceImage = null; // Size in pixels of the image

  this.imageSize = cc.size(0, 0);
  this.tileOffset = cc.v2(0, 0);
  this._tileSize = cc.size(0, 0);
};

cc.TMXTilesetInfo.prototype = {
  constructor: cc.TMXTilesetInfo,

  /**
   * Return rect
   * @param {Number} gid
   * @return {Rect}
   */
  rectForGID: function rectForGID(gid, result) {
    var rect = result || cc.rect(0, 0, 0, 0);
    rect.width = this._tileSize.width;
    rect.height = this._tileSize.height;
    gid &= cc.TiledMap.TileFlag.FLIPPED_MASK;
    gid = gid - parseInt(this.firstGid, 10);
    var max_x = parseInt((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing), 10);
    rect.x = parseInt(gid % max_x * (this._tileSize.width + this.spacing) + this.margin, 10);
    rect.y = parseInt(parseInt(gid / max_x, 10) * (this._tileSize.height + this.spacing) + this.margin, 10);
    return rect;
  }
};

function strToHAlign(value) {
  var hAlign = cc.Label.HorizontalAlign;

  switch (value) {
    case 'center':
      return hAlign.CENTER;

    case 'right':
      return hAlign.RIGHT;

    default:
      return hAlign.LEFT;
  }
}

function strToVAlign(value) {
  var vAlign = cc.Label.VerticalAlign;

  switch (value) {
    case 'center':
      return vAlign.CENTER;

    case 'bottom':
      return vAlign.BOTTOM;

    default:
      return vAlign.TOP;
  }
}

function strToColor(value) {
  if (!value) {
    return cc.color(0, 0, 0, 255);
  }

  value = value.indexOf('#') !== -1 ? value.substring(1) : value;

  if (value.length === 8) {
    var a = parseInt(value.substr(0, 2), 16) || 255;
    var r = parseInt(value.substr(2, 2), 16) || 0;
    var g = parseInt(value.substr(4, 2), 16) || 0;
    var b = parseInt(value.substr(6, 2), 16) || 0;
    return cc.color(r, g, b, a);
  } else {
    var _r = parseInt(value.substr(0, 2), 16) || 0;

    var _g = parseInt(value.substr(2, 2), 16) || 0;

    var _b = parseInt(value.substr(4, 2), 16) || 0;

    return cc.color(_r, _g, _b, 255);
  }
}

function getPropertyList(node, map) {
  var res = [];
  var properties = node.getElementsByTagName("properties");

  for (var i = 0; i < properties.length; ++i) {
    var property = properties[i].getElementsByTagName("property");

    for (var j = 0; j < property.length; ++j) {
      res.push(property[j]);
    }
  }

  map = map || {};

  for (var _i = 0; _i < res.length; _i++) {
    var element = res[_i];
    var name = element.getAttribute('name');
    var type = element.getAttribute('type') || 'string';
    var value = element.getAttribute('value');

    if (type === 'int') {
      value = parseInt(value);
    } else if (type === 'float') {
      value = parseFloat(value);
    } else if (type === 'bool') {
      value = value === 'true';
    } else if (type === 'color') {
      value = strToColor(value);
    }

    map[name] = value;
  }

  return map;
}
/**
 * <p>cc.TMXMapInfo contains the information about the map like: <br/>
 *- Map orientation (hexagonal, isometric or orthogonal)<br/>
 *- Tile size<br/>
 *- Map size</p>
 *
 * <p>And it also contains: <br/>
 * - Layers (an array of TMXLayerInfo objects)<br/>
 * - Tilesets (an array of TMXTilesetInfo objects) <br/>
 * - ObjectGroups (an array of TMXObjectGroupInfo objects) </p>
 *
 * <p>This information is obtained from the TMX file. </p>
 * @class TMXMapInfo
 */

/**
 * Properties of the map info.
 * @property {Array}    properties          
 */

/**
 * Map orientation.
 * @property {Number}   orientation         
 */

/**
 * Parent element.
 * @property {Object}   parentElement       
 */

/**
 * Parent GID.
 * @property {Number}   parentGID           
 */

/**
 * Layer attributes.
 * @property {Object}   layerAttrs        
 */

/**
 * Is reading storing characters stream.
 * @property {Boolean}  storingCharacters   
 */

/**
 * Current string stored from characters stream.
 * @property {String}   currentString       
 */

/**
 * Width of the map
 * @property {Number}   mapWidth            
 */

/**
 * Height of the map
 * @property {Number}   mapHeight           
 */

/**
 * Width of a tile
 * @property {Number}   tileWidth           
 */

/** 
 * Height of a tile
 * @property {Number}   tileHeight          
 */

/**
 * @example
 * 1.
 * //create a TMXMapInfo with file name
 * let tmxMapInfo = new cc.TMXMapInfo("res/orthogonal-test1.tmx");
 * 2.
 * //create a TMXMapInfo with content string and resource path
 * let resources = "res/TileMaps";
 * let filePath = "res/TileMaps/orthogonal-test1.tmx";
 * let xmlStr = cc.resources.get(filePath);
 * let tmxMapInfo = new cc.TMXMapInfo(xmlStr, resources);
 */

/**
 * Creates a TMX Format with a tmx file or content string
 */


cc.TMXMapInfo = function (tmxFile, tsxMap, textures, textureSizes, imageLayerTextures) {
  this.properties = [];
  this.orientation = null;
  this.parentElement = null;
  this.parentGID = null;
  this.layerAttrs = 0;
  this.storingCharacters = false;
  this.currentString = null;
  this.renderOrder = cc.TiledMap.RenderOrder.RightDown;
  this._supportVersion = [1, 2, 0];
  this._parser = new cc.SAXParser();
  this._objectGroups = [];
  this._allChildren = [];
  this._mapSize = cc.size(0, 0);
  this._tileSize = cc.size(0, 0);
  this._layers = [];
  this._tilesets = [];
  this._imageLayers = [];
  this._tileProperties = {};
  this._tileAnimations = {};
  this._tsxMap = null; // map of textures indexed by name

  this._textures = null; // hex map values

  this._staggerAxis = null;
  this._staggerIndex = null;
  this._hexSideLength = 0;
  this._imageLayerTextures = null;
  this.initWithXML(tmxFile, tsxMap, textures, textureSizes, imageLayerTextures);
};

cc.TMXMapInfo.prototype = {
  constructor: cc.TMXMapInfo,

  /**
   * Gets Map orientation.
   * @return {Number}
   */
  getOrientation: function getOrientation() {
    return this.orientation;
  },

  /**
   * Set the Map orientation.
   * @param {Number} value
   */
  setOrientation: function setOrientation(value) {
    this.orientation = value;
  },

  /**
   * Gets the staggerAxis of map.
   * @return {cc.TiledMap.StaggerAxis}
   */
  getStaggerAxis: function getStaggerAxis() {
    return this._staggerAxis;
  },

  /**
   * Set the staggerAxis of map.
   * @param {cc.TiledMap.StaggerAxis} value
   */
  setStaggerAxis: function setStaggerAxis(value) {
    this._staggerAxis = value;
  },

  /**
   * Gets stagger index
   * @return {cc.TiledMap.StaggerIndex}
   */
  getStaggerIndex: function getStaggerIndex() {
    return this._staggerIndex;
  },

  /**
   * Set the stagger index.
   * @param {cc.TiledMap.StaggerIndex} value
   */
  setStaggerIndex: function setStaggerIndex(value) {
    this._staggerIndex = value;
  },

  /**
   * Gets Hex side length.
   * @return {Number}
   */
  getHexSideLength: function getHexSideLength() {
    return this._hexSideLength;
  },

  /**
   * Set the Hex side length.
   * @param {Number} value
   */
  setHexSideLength: function setHexSideLength(value) {
    this._hexSideLength = value;
  },

  /**
   * Map width & height
   * @return {Size}
   */
  getMapSize: function getMapSize() {
    return cc.size(this._mapSize.width, this._mapSize.height);
  },

  /**
   * Map width & height
   * @param {Size} value
   */
  setMapSize: function setMapSize(value) {
    this._mapSize.width = value.width;
    this._mapSize.height = value.height;
  },
  _getMapWidth: function _getMapWidth() {
    return this._mapSize.width;
  },
  _setMapWidth: function _setMapWidth(width) {
    this._mapSize.width = width;
  },
  _getMapHeight: function _getMapHeight() {
    return this._mapSize.height;
  },
  _setMapHeight: function _setMapHeight(height) {
    this._mapSize.height = height;
  },

  /**
   * Tiles width & height
   * @return {Size}
   */
  getTileSize: function getTileSize() {
    return cc.size(this._tileSize.width, this._tileSize.height);
  },

  /**
   * Tiles width & height
   * @param {Size} value
   */
  setTileSize: function setTileSize(value) {
    this._tileSize.width = value.width;
    this._tileSize.height = value.height;
  },
  _getTileWidth: function _getTileWidth() {
    return this._tileSize.width;
  },
  _setTileWidth: function _setTileWidth(width) {
    this._tileSize.width = width;
  },
  _getTileHeight: function _getTileHeight() {
    return this._tileSize.height;
  },
  _setTileHeight: function _setTileHeight(height) {
    this._tileSize.height = height;
  },

  /**
   * Layers
   * @return {Array}
   */
  getLayers: function getLayers() {
    return this._layers;
  },

  /**
   * Layers
   * @param {cc.TMXLayerInfo} value
   */
  setLayers: function setLayers(value) {
    this._allChildren.push(value);

    this._layers.push(value);
  },

  /**
   * ImageLayers
   * @return {Array}
   */
  getImageLayers: function getImageLayers() {
    return this._imageLayers;
  },

  /**
   * ImageLayers
   * @param {cc.TMXImageLayerInfo} value
   */
  setImageLayers: function setImageLayers(value) {
    this._allChildren.push(value);

    this._imageLayers.push(value);
  },

  /**
   * tilesets
   * @return {Array}
   */
  getTilesets: function getTilesets() {
    return this._tilesets;
  },

  /**
   * tilesets
   * @param {cc.TMXTilesetInfo} value
   */
  setTilesets: function setTilesets(value) {
    this._tilesets.push(value);
  },

  /**
   * ObjectGroups
   * @return {Array}
   */
  getObjectGroups: function getObjectGroups() {
    return this._objectGroups;
  },

  /**
   * ObjectGroups
   * @param {cc.TMXObjectGroup} value
   */
  setObjectGroups: function setObjectGroups(value) {
    this._allChildren.push(value);

    this._objectGroups.push(value);
  },
  getAllChildren: function getAllChildren() {
    return this._allChildren;
  },

  /**
   * parent element
   * @return {Object}
   */
  getParentElement: function getParentElement() {
    return this.parentElement;
  },

  /**
   * parent element
   * @param {Object} value
   */
  setParentElement: function setParentElement(value) {
    this.parentElement = value;
  },

  /**
   * parent GID
   * @return {Number}
   */
  getParentGID: function getParentGID() {
    return this.parentGID;
  },

  /**
   * parent GID
   * @param {Number} value
   */
  setParentGID: function setParentGID(value) {
    this.parentGID = value;
  },

  /**
   * Layer attribute
   * @return {Object}
   */
  getLayerAttribs: function getLayerAttribs() {
    return this.layerAttrs;
  },

  /**
   * Layer attribute
   * @param {Object} value
   */
  setLayerAttribs: function setLayerAttribs(value) {
    this.layerAttrs = value;
  },

  /**
   * Is reading storing characters stream
   * @return {Boolean}
   */
  getStoringCharacters: function getStoringCharacters() {
    return this.storingCharacters;
  },

  /**
   * Is reading storing characters stream
   * @param {Boolean} value
   */
  setStoringCharacters: function setStoringCharacters(value) {
    this.storingCharacters = value;
  },

  /**
   * Properties
   * @return {Array}
   */
  getProperties: function getProperties() {
    return this.properties;
  },

  /**
   * Properties
   * @param {object} value
   */
  setProperties: function setProperties(value) {
    this.properties = value;
  },

  /**
   * initializes a TMX format with an XML string and a TMX resource path
   * @param {String} tmxString
   * @param {Object} tsxMap
   * @param {Object} textures
   * @return {Boolean}
   */
  initWithXML: function initWithXML(tmxString, tsxMap, textures, textureSizes, imageLayerTextures) {
    this._tilesets.length = 0;
    this._layers.length = 0;
    this._imageLayers.length = 0;
    this._tsxMap = tsxMap;
    this._textures = textures;
    this._imageLayerTextures = imageLayerTextures;
    this._textureSizes = textureSizes;
    this._objectGroups.length = 0;
    this._allChildren.length = 0;
    this.properties.length = 0;
    this._tileProperties = {};
    this._tileAnimations = {}; // tmp vars

    this.currentString = "";
    this.storingCharacters = false;
    this.layerAttrs = cc.TMXLayerInfo.ATTRIB_NONE;
    this.parentElement = cc.TiledMap.NONE;
    return this.parseXMLString(tmxString);
  },

  /**
   * Initializes parsing of an XML string, either a tmx (Map) string or tsx (Tileset) string
   * @param {String} xmlString
   * @param {Number} tilesetFirstGid
   * @return {Element}
   */
  parseXMLString: function parseXMLString(xmlStr, tilesetFirstGid) {
    var mapXML = this._parser._parseXML(xmlStr);

    var i; // PARSE <map>

    var map = mapXML.documentElement;
    var orientationStr = map.getAttribute('orientation');
    var staggerAxisStr = map.getAttribute('staggeraxis');
    var staggerIndexStr = map.getAttribute('staggerindex');
    var hexSideLengthStr = map.getAttribute('hexsidelength');
    var renderorderStr = map.getAttribute('renderorder');
    var version = map.getAttribute('version') || '1.0.0';

    if (map.nodeName === "map") {
      var versionArr = version.split('.');
      var supportVersion = this._supportVersion;

      for (var _i2 = 0; _i2 < supportVersion.length; _i2++) {
        var v = parseInt(versionArr[_i2]) || 0;
        var sv = supportVersion[_i2];

        if (sv < v) {
          cc.logID(7216, version);
          break;
        }
      }

      if (orientationStr === "orthogonal") this.orientation = cc.TiledMap.Orientation.ORTHO;else if (orientationStr === "isometric") this.orientation = cc.TiledMap.Orientation.ISO;else if (orientationStr === "hexagonal") this.orientation = cc.TiledMap.Orientation.HEX;else if (orientationStr !== null) cc.logID(7217, orientationStr);

      if (renderorderStr === 'right-up') {
        this.renderOrder = cc.TiledMap.RenderOrder.RightUp;
      } else if (renderorderStr === 'left-up') {
        this.renderOrder = cc.TiledMap.RenderOrder.LeftUp;
      } else if (renderorderStr === 'left-down') {
        this.renderOrder = cc.TiledMap.RenderOrder.LeftDown;
      } else {
        this.renderOrder = cc.TiledMap.RenderOrder.RightDown;
      }

      if (staggerAxisStr === 'x') {
        this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_X);
      } else if (staggerAxisStr === 'y') {
        this.setStaggerAxis(cc.TiledMap.StaggerAxis.STAGGERAXIS_Y);
      }

      if (staggerIndexStr === 'odd') {
        this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_ODD);
      } else if (staggerIndexStr === 'even') {
        this.setStaggerIndex(cc.TiledMap.StaggerIndex.STAGGERINDEX_EVEN);
      }

      if (hexSideLengthStr) {
        this.setHexSideLength(parseFloat(hexSideLengthStr));
      }

      var mapSize = cc.size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('width'));
      mapSize.height = parseFloat(map.getAttribute('height'));
      this.setMapSize(mapSize);
      mapSize = cc.size(0, 0);
      mapSize.width = parseFloat(map.getAttribute('tilewidth'));
      mapSize.height = parseFloat(map.getAttribute('tileheight'));
      this.setTileSize(mapSize); // The parent element is the map

      this.properties = getPropertyList(map);
    } // PARSE <tileset>


    var tilesets = map.getElementsByTagName('tileset');

    if (map.nodeName !== "map") {
      tilesets = [];
      tilesets.push(map);
    }

    for (i = 0; i < tilesets.length; i++) {
      var selTileset = tilesets[i]; // If this is an external tileset then start parsing that

      var tsxName = selTileset.getAttribute('source');

      if (tsxName) {
        var currentFirstGID = parseInt(selTileset.getAttribute('firstgid'));
        var tsxXmlString = this._tsxMap[tsxName];

        if (tsxXmlString) {
          this.parseXMLString(tsxXmlString, currentFirstGID);
        }
      } else {
        var images = selTileset.getElementsByTagName('image');
        var multiTextures = images.length > 1;
        var image = images[0];
        var firstImageName = image.getAttribute('source');
        firstImageName = firstImageName.replace(/\\/g, '\/');
        var tiles = selTileset.getElementsByTagName('tile');
        var tileCount = tiles && tiles.length || 1;
        var tile = null;
        var tilesetName = selTileset.getAttribute('name') || "";
        var tilesetSpacing = parseInt(selTileset.getAttribute('spacing')) || 0;
        var tilesetMargin = parseInt(selTileset.getAttribute('margin')) || 0;
        var fgid = parseInt(tilesetFirstGid);

        if (!fgid) {
          fgid = parseInt(selTileset.getAttribute('firstgid')) || 0;
        }

        var tilesetSize = cc.size(0, 0);
        tilesetSize.width = parseFloat(selTileset.getAttribute('tilewidth'));
        tilesetSize.height = parseFloat(selTileset.getAttribute('tileheight')); // parse tile offset

        var offset = selTileset.getElementsByTagName('tileoffset')[0];
        var tileOffset = cc.v2(0, 0);

        if (offset) {
          tileOffset.x = parseFloat(offset.getAttribute('x'));
          tileOffset.y = parseFloat(offset.getAttribute('y'));
        }

        var tileset = null;

        for (var tileIdx = 0; tileIdx < tileCount; tileIdx++) {
          if (!tileset || multiTextures) {
            tileset = new cc.TMXTilesetInfo();
            tileset.name = tilesetName;
            tileset.firstGid = fgid;
            tileset.spacing = tilesetSpacing;
            tileset.margin = tilesetMargin;
            tileset._tileSize = tilesetSize;
            tileset.tileOffset = tileOffset;
            tileset.sourceImage = this._textures[firstImageName];
            tileset.imageSize = this._textureSizes[firstImageName] || tileset.imageSize;

            if (!tileset.sourceImage) {
              cc.errorID(7221, firstImageName);
            }

            this.setTilesets(tileset);
          }

          tile = tiles && tiles[tileIdx];
          if (!tile) continue;
          this.parentGID = parseInt(fgid) + parseInt(tile.getAttribute('id') || 0);
          var tileImages = tile.getElementsByTagName('image');

          if (tileImages && tileImages.length > 0) {
            image = tileImages[0];
            var imageName = image.getAttribute('source');
            imageName = imageName.replace(/\\/g, '\/');
            tileset.sourceImage = this._textures[imageName];

            if (!tileset.sourceImage) {
              cc.errorID(7221, imageName);
            }

            var tileSize = cc.size(0, 0);
            tileSize.width = parseFloat(image.getAttribute('width'));
            tileSize.height = parseFloat(image.getAttribute('height'));
            tileset._tileSize = tileSize;
            tileset.firstGid = this.parentGID;
          }

          this._tileProperties[this.parentGID] = getPropertyList(tile);
          var animations = tile.getElementsByTagName('animation');

          if (animations && animations.length > 0) {
            var animation = animations[0];
            var framesData = animation.getElementsByTagName('frame');
            var animationProp = {
              frames: [],
              dt: 0,
              frameIdx: 0
            };
            this._tileAnimations[this.parentGID] = animationProp;
            var frames = animationProp.frames;

            for (var frameIdx = 0; frameIdx < framesData.length; frameIdx++) {
              var frame = framesData[frameIdx];
              var tileid = parseInt(fgid) + parseInt(frame.getAttribute('tileid'));
              var duration = parseFloat(frame.getAttribute('duration'));
              frames.push({
                tileid: tileid,
                duration: duration / 1000,
                grid: null
              });
            }
          }
        }
      }
    } // PARSE <layer> & <objectgroup> in order


    var childNodes = map.childNodes;

    for (i = 0; i < childNodes.length; i++) {
      var childNode = childNodes[i];

      if (this._shouldIgnoreNode(childNode)) {
        continue;
      }

      if (childNode.nodeName === 'imagelayer') {
        var imageLayer = this._parseImageLayer(childNode);

        if (imageLayer) {
          this.setImageLayers(imageLayer);
        }
      }

      if (childNode.nodeName === 'layer') {
        var layer = this._parseLayer(childNode);

        this.setLayers(layer);
      }

      if (childNode.nodeName === 'objectgroup') {
        var objectGroup = this._parseObjectGroup(childNode);

        this.setObjectGroups(objectGroup);
      }
    }

    return map;
  },
  _shouldIgnoreNode: function _shouldIgnoreNode(node) {
    return node.nodeType === 3 // text
    || node.nodeType === 8 // comment
    || node.nodeType === 4; // cdata
  },
  _parseImageLayer: function _parseImageLayer(selLayer) {
    var datas = selLayer.getElementsByTagName('image');
    if (!datas || datas.length == 0) return null;
    var imageLayer = new cc.TMXImageLayerInfo();
    imageLayer.name = selLayer.getAttribute('name');
    imageLayer.offset.x = parseFloat(selLayer.getAttribute('offsetx')) || 0;
    imageLayer.offset.y = parseFloat(selLayer.getAttribute('offsety')) || 0;
    var visible = selLayer.getAttribute('visible');
    imageLayer.visible = !(visible === "0");
    var opacity = selLayer.getAttribute('opacity') || 1;
    imageLayer.opacity = parseInt(255 * parseFloat(opacity)) || 255;
    var data = datas[0];
    var source = data.getAttribute('source');
    imageLayer.sourceImage = this._imageLayerTextures[source];
    imageLayer.width = parseInt(data.getAttribute('width')) || 0;
    imageLayer.height = parseInt(data.getAttribute('height')) || 0;
    imageLayer.trans = strToColor(data.getAttribute('trans'));

    if (!imageLayer.sourceImage) {
      cc.errorID(7221, source);
      return null;
    }

    return imageLayer;
  },
  _parseLayer: function _parseLayer(selLayer) {
    var data = selLayer.getElementsByTagName('data')[0];
    var layer = new cc.TMXLayerInfo();
    layer.name = selLayer.getAttribute('name');
    var layerSize = cc.size(0, 0);
    layerSize.width = parseFloat(selLayer.getAttribute('width'));
    layerSize.height = parseFloat(selLayer.getAttribute('height'));
    layer._layerSize = layerSize;
    var visible = selLayer.getAttribute('visible');
    layer.visible = !(visible === "0");
    var opacity = selLayer.getAttribute('opacity') || 1;
    if (opacity) layer._opacity = parseInt(255 * parseFloat(opacity));else layer._opacity = 255;
    layer.offset = cc.v2(parseFloat(selLayer.getAttribute('offsetx')) || 0, parseFloat(selLayer.getAttribute('offsety')) || 0);
    var nodeValue = '';

    for (var j = 0; j < data.childNodes.length; j++) {
      nodeValue += data.childNodes[j].nodeValue;
    }

    nodeValue = nodeValue.trim(); // Unpack the tilemap data

    var compression = data.getAttribute('compression');
    var encoding = data.getAttribute('encoding');

    if (compression && compression !== "gzip" && compression !== "zlib") {
      cc.logID(7218);
      return null;
    }

    var tiles;

    switch (compression) {
      case 'gzip':
        tiles = codec.unzipBase64AsArray(nodeValue, 4);
        break;

      case 'zlib':
        var inflator = new zlib.Inflate(codec.Base64.decodeAsArray(nodeValue, 1));
        tiles = uint8ArrayToUint32Array(inflator.decompress());
        break;

      case null:
      case '':
        // Uncompressed
        if (encoding === "base64") tiles = codec.Base64.decodeAsArray(nodeValue, 4);else if (encoding === "csv") {
          tiles = [];
          var csvTiles = nodeValue.split(',');

          for (var csvIdx = 0; csvIdx < csvTiles.length; csvIdx++) {
            tiles.push(parseInt(csvTiles[csvIdx]));
          }
        } else {
          //XML format
          var selDataTiles = data.getElementsByTagName("tile");
          tiles = [];

          for (var xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++) {
            tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute("gid")));
          }
        }
        break;

      default:
        if (this.layerAttrs === cc.TMXLayerInfo.ATTRIB_NONE) cc.logID(7219);
        break;
    }

    if (tiles) {
      layer._tiles = new Uint32Array(tiles);
    } // The parent element is the last layer


    layer.properties = getPropertyList(selLayer);
    return layer;
  },
  _parseObjectGroup: function _parseObjectGroup(selGroup) {
    var objectGroup = new cc.TMXObjectGroupInfo();
    objectGroup.name = selGroup.getAttribute('name') || '';
    objectGroup.offset = cc.v2(parseFloat(selGroup.getAttribute('offsetx')), parseFloat(selGroup.getAttribute('offsety')));
    var opacity = selGroup.getAttribute('opacity') || 1;
    if (opacity) objectGroup._opacity = parseInt(255 * parseFloat(opacity));else objectGroup._opacity = 255;
    var visible = selGroup.getAttribute('visible');
    if (visible && parseInt(visible) === 0) objectGroup.visible = false;
    var color = selGroup.getAttribute('color');
    if (color) objectGroup._color.fromHEX(color);
    var draworder = selGroup.getAttribute('draworder');
    if (draworder) objectGroup._draworder = draworder; // set the properties to the group

    objectGroup.setProperties(getPropertyList(selGroup));
    var objects = selGroup.getElementsByTagName('object');

    if (objects) {
      for (var j = 0; j < objects.length; j++) {
        var selObj = objects[j]; // The value for "type" was blank or not a valid class name
        // Create an instance of TMXObjectInfo to store the object and its properties

        var objectProp = {}; // Set the id of the object

        objectProp['id'] = selObj.getAttribute('id') || j; // Set the name of the object to the value for "name"

        objectProp["name"] = selObj.getAttribute('name') || ""; // Assign all the attributes as key/name pairs in the properties dictionary

        objectProp["width"] = parseFloat(selObj.getAttribute('width')) || 0;
        objectProp["height"] = parseFloat(selObj.getAttribute('height')) || 0;
        objectProp["x"] = parseFloat(selObj.getAttribute('x')) || 0;
        objectProp["y"] = parseFloat(selObj.getAttribute('y')) || 0;
        objectProp["rotation"] = parseFloat(selObj.getAttribute('rotation')) || 0;
        getPropertyList(selObj, objectProp); // visible

        var visibleAttr = selObj.getAttribute('visible');
        objectProp['visible'] = !(visibleAttr && parseInt(visibleAttr) === 0); // text

        var texts = selObj.getElementsByTagName('text');

        if (texts && texts.length > 0) {
          var text = texts[0];
          objectProp['type'] = cc.TiledMap.TMXObjectType.TEXT;
          objectProp['wrap'] = text.getAttribute('wrap') == '1';
          objectProp['color'] = strToColor(text.getAttribute('color'));
          objectProp['halign'] = strToHAlign(text.getAttribute('halign'));
          objectProp['valign'] = strToVAlign(text.getAttribute('valign'));
          objectProp['pixelsize'] = parseInt(text.getAttribute('pixelsize')) || 16;
          objectProp['text'] = text.childNodes[0].nodeValue;
        } // image


        var gid = selObj.getAttribute('gid');

        if (gid) {
          objectProp['gid'] = parseInt(gid);
          objectProp['type'] = cc.TiledMap.TMXObjectType.IMAGE;
        } // ellipse


        var ellipse = selObj.getElementsByTagName('ellipse');

        if (ellipse && ellipse.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.ELLIPSE;
        } //polygon


        var polygonProps = selObj.getElementsByTagName("polygon");

        if (polygonProps && polygonProps.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.POLYGON;
          var selPgPointStr = polygonProps[0].getAttribute('points');
          if (selPgPointStr) objectProp["points"] = this._parsePointsString(selPgPointStr);
        } //polyline


        var polylineProps = selObj.getElementsByTagName("polyline");

        if (polylineProps && polylineProps.length > 0) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.POLYLINE;
          var selPlPointStr = polylineProps[0].getAttribute('points');
          if (selPlPointStr) objectProp["polylinePoints"] = this._parsePointsString(selPlPointStr);
        }

        if (!objectProp['type']) {
          objectProp['type'] = cc.TiledMap.TMXObjectType.RECT;
        } // Add the object to the objectGroup


        objectGroup._objects.push(objectProp);
      }

      if (draworder !== 'index') {
        objectGroup._objects.sort(function (a, b) {
          return a.y - b.y;
        });
      }
    }

    return objectGroup;
  },
  _parsePointsString: function _parsePointsString(pointsString) {
    if (!pointsString) return null;
    var points = [];
    var pointsStr = pointsString.split(' ');

    for (var i = 0; i < pointsStr.length; i++) {
      var selPointStr = pointsStr[i].split(',');
      points.push({
        'x': parseFloat(selPointStr[0]),
        'y': parseFloat(selPointStr[1])
      });
    }

    return points;
  },

  /**
   * Sets the tile animations.
   * @return {Object}
   */
  setTileAnimations: function setTileAnimations(animations) {
    this._tileAnimations = animations;
  },

  /**
   * Gets the tile animations.
   * @return {Object}
   */
  getTileAnimations: function getTileAnimations() {
    return this._tileAnimations;
  },

  /**
   * Gets the tile properties.
   * @return {Object}
   */
  getTileProperties: function getTileProperties() {
    return this._tileProperties;
  },

  /**
   * Set the tile properties.
   * @param {Object} tileProperties
   */
  setTileProperties: function setTileProperties(tileProperties) {
    this._tileProperties = tileProperties;
  },

  /**
   * Gets the currentString
   * @return {String}
   */
  getCurrentString: function getCurrentString() {
    return this.currentString;
  },

  /**
   * Set the currentString
   * @param {String} currentString
   */
  setCurrentString: function setCurrentString(currentString) {
    this.currentString = currentString;
  }
};
var _p = cc.TMXMapInfo.prototype; // Extended properties

js.getset(_p, "mapWidth", _p._getMapWidth, _p._setMapWidth);
js.getset(_p, "mapHeight", _p._getMapHeight, _p._setMapHeight);
js.getset(_p, "tileWidth", _p._getTileWidth, _p._setTileWidth);
js.getset(_p, "tileHeight", _p._getTileHeight, _p._setTileHeight);
/**
 * @property ATTRIB_NONE
 * @constant
 * @static
 * @type {Number}
 * @default 1
 */

cc.TMXLayerInfo.ATTRIB_NONE = 1 << 0;
/**
 * @property ATTRIB_BASE64
 * @constant
 * @static
 * @type {Number}
 * @default 2
 */

cc.TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
/**
 * @property ATTRIB_GZIP
 * @constant
 * @static
 * @type {Number}
 * @default 4
 */

cc.TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
/**
 * @property ATTRIB_ZLIB
 * @constant
 * @static
 * @type {Number}
 * @default 8
 */

cc.TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHRpbGVtYXBcXENDVE1YWE1MUGFyc2VyLmpzIl0sIm5hbWVzIjpbImNvZGVjIiwicmVxdWlyZSIsInpsaWIiLCJqcyIsInVpbnQ4QXJyYXlUb1VpbnQzMkFycmF5IiwidWludDhBcnIiLCJsZW5ndGgiLCJhcnJMZW4iLCJyZXRBcnIiLCJ3aW5kb3ciLCJVaW50MzJBcnJheSIsImkiLCJvZmZzZXQiLCJjYyIsIlRNWExheWVySW5mbyIsInByb3BlcnRpZXMiLCJuYW1lIiwiX2xheWVyU2l6ZSIsIl90aWxlcyIsInZpc2libGUiLCJfb3BhY2l0eSIsIm93blRpbGVzIiwiX21pbkdJRCIsIl9tYXhHSUQiLCJ2MiIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwiZ2V0UHJvcGVydGllcyIsInNldFByb3BlcnRpZXMiLCJ2YWx1ZSIsIlRNWEltYWdlTGF5ZXJJbmZvIiwid2lkdGgiLCJoZWlnaHQiLCJfdHJhbnMiLCJDb2xvciIsInNvdXJjZUltYWdlIiwiVE1YT2JqZWN0R3JvdXBJbmZvIiwiX29iamVjdHMiLCJfY29sb3IiLCJfZHJhd29yZGVyIiwiVE1YVGlsZXNldEluZm8iLCJmaXJzdEdpZCIsInNwYWNpbmciLCJtYXJnaW4iLCJpbWFnZVNpemUiLCJzaXplIiwidGlsZU9mZnNldCIsIl90aWxlU2l6ZSIsInJlY3RGb3JHSUQiLCJnaWQiLCJyZXN1bHQiLCJyZWN0IiwiVGlsZWRNYXAiLCJUaWxlRmxhZyIsIkZMSVBQRURfTUFTSyIsInBhcnNlSW50IiwibWF4X3giLCJ4IiwieSIsInN0clRvSEFsaWduIiwiaEFsaWduIiwiTGFiZWwiLCJIb3Jpem9udGFsQWxpZ24iLCJDRU5URVIiLCJSSUdIVCIsIkxFRlQiLCJzdHJUb1ZBbGlnbiIsInZBbGlnbiIsIlZlcnRpY2FsQWxpZ24iLCJCT1RUT00iLCJUT1AiLCJzdHJUb0NvbG9yIiwiY29sb3IiLCJpbmRleE9mIiwic3Vic3RyaW5nIiwiYSIsInN1YnN0ciIsInIiLCJnIiwiYiIsImdldFByb3BlcnR5TGlzdCIsIm5vZGUiLCJtYXAiLCJyZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInByb3BlcnR5IiwiaiIsInB1c2giLCJlbGVtZW50IiwiZ2V0QXR0cmlidXRlIiwidHlwZSIsInBhcnNlRmxvYXQiLCJUTVhNYXBJbmZvIiwidG14RmlsZSIsInRzeE1hcCIsInRleHR1cmVzIiwidGV4dHVyZVNpemVzIiwiaW1hZ2VMYXllclRleHR1cmVzIiwib3JpZW50YXRpb24iLCJwYXJlbnRFbGVtZW50IiwicGFyZW50R0lEIiwibGF5ZXJBdHRycyIsInN0b3JpbmdDaGFyYWN0ZXJzIiwiY3VycmVudFN0cmluZyIsInJlbmRlck9yZGVyIiwiUmVuZGVyT3JkZXIiLCJSaWdodERvd24iLCJfc3VwcG9ydFZlcnNpb24iLCJfcGFyc2VyIiwiU0FYUGFyc2VyIiwiX29iamVjdEdyb3VwcyIsIl9hbGxDaGlsZHJlbiIsIl9tYXBTaXplIiwiX2xheWVycyIsIl90aWxlc2V0cyIsIl9pbWFnZUxheWVycyIsIl90aWxlUHJvcGVydGllcyIsIl90aWxlQW5pbWF0aW9ucyIsIl90c3hNYXAiLCJfdGV4dHVyZXMiLCJfc3RhZ2dlckF4aXMiLCJfc3RhZ2dlckluZGV4IiwiX2hleFNpZGVMZW5ndGgiLCJfaW1hZ2VMYXllclRleHR1cmVzIiwiaW5pdFdpdGhYTUwiLCJnZXRPcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiZ2V0U3RhZ2dlckF4aXMiLCJzZXRTdGFnZ2VyQXhpcyIsImdldFN0YWdnZXJJbmRleCIsInNldFN0YWdnZXJJbmRleCIsImdldEhleFNpZGVMZW5ndGgiLCJzZXRIZXhTaWRlTGVuZ3RoIiwiZ2V0TWFwU2l6ZSIsInNldE1hcFNpemUiLCJfZ2V0TWFwV2lkdGgiLCJfc2V0TWFwV2lkdGgiLCJfZ2V0TWFwSGVpZ2h0IiwiX3NldE1hcEhlaWdodCIsImdldFRpbGVTaXplIiwic2V0VGlsZVNpemUiLCJfZ2V0VGlsZVdpZHRoIiwiX3NldFRpbGVXaWR0aCIsIl9nZXRUaWxlSGVpZ2h0IiwiX3NldFRpbGVIZWlnaHQiLCJnZXRMYXllcnMiLCJzZXRMYXllcnMiLCJnZXRJbWFnZUxheWVycyIsInNldEltYWdlTGF5ZXJzIiwiZ2V0VGlsZXNldHMiLCJzZXRUaWxlc2V0cyIsImdldE9iamVjdEdyb3VwcyIsInNldE9iamVjdEdyb3VwcyIsImdldEFsbENoaWxkcmVuIiwiZ2V0UGFyZW50RWxlbWVudCIsInNldFBhcmVudEVsZW1lbnQiLCJnZXRQYXJlbnRHSUQiLCJzZXRQYXJlbnRHSUQiLCJnZXRMYXllckF0dHJpYnMiLCJzZXRMYXllckF0dHJpYnMiLCJnZXRTdG9yaW5nQ2hhcmFjdGVycyIsInNldFN0b3JpbmdDaGFyYWN0ZXJzIiwidG14U3RyaW5nIiwiX3RleHR1cmVTaXplcyIsIkFUVFJJQl9OT05FIiwiTk9ORSIsInBhcnNlWE1MU3RyaW5nIiwieG1sU3RyIiwidGlsZXNldEZpcnN0R2lkIiwibWFwWE1MIiwiX3BhcnNlWE1MIiwiZG9jdW1lbnRFbGVtZW50Iiwib3JpZW50YXRpb25TdHIiLCJzdGFnZ2VyQXhpc1N0ciIsInN0YWdnZXJJbmRleFN0ciIsImhleFNpZGVMZW5ndGhTdHIiLCJyZW5kZXJvcmRlclN0ciIsInZlcnNpb24iLCJub2RlTmFtZSIsInZlcnNpb25BcnIiLCJzcGxpdCIsInN1cHBvcnRWZXJzaW9uIiwidiIsInN2IiwibG9nSUQiLCJPcmllbnRhdGlvbiIsIk9SVEhPIiwiSVNPIiwiSEVYIiwiUmlnaHRVcCIsIkxlZnRVcCIsIkxlZnREb3duIiwiU3RhZ2dlckF4aXMiLCJTVEFHR0VSQVhJU19YIiwiU1RBR0dFUkFYSVNfWSIsIlN0YWdnZXJJbmRleCIsIlNUQUdHRVJJTkRFWF9PREQiLCJTVEFHR0VSSU5ERVhfRVZFTiIsIm1hcFNpemUiLCJ0aWxlc2V0cyIsInNlbFRpbGVzZXQiLCJ0c3hOYW1lIiwiY3VycmVudEZpcnN0R0lEIiwidHN4WG1sU3RyaW5nIiwiaW1hZ2VzIiwibXVsdGlUZXh0dXJlcyIsImltYWdlIiwiZmlyc3RJbWFnZU5hbWUiLCJyZXBsYWNlIiwidGlsZXMiLCJ0aWxlQ291bnQiLCJ0aWxlIiwidGlsZXNldE5hbWUiLCJ0aWxlc2V0U3BhY2luZyIsInRpbGVzZXRNYXJnaW4iLCJmZ2lkIiwidGlsZXNldFNpemUiLCJ0aWxlc2V0IiwidGlsZUlkeCIsImVycm9ySUQiLCJ0aWxlSW1hZ2VzIiwiaW1hZ2VOYW1lIiwidGlsZVNpemUiLCJhbmltYXRpb25zIiwiYW5pbWF0aW9uIiwiZnJhbWVzRGF0YSIsImFuaW1hdGlvblByb3AiLCJmcmFtZXMiLCJkdCIsImZyYW1lSWR4IiwiZnJhbWUiLCJ0aWxlaWQiLCJkdXJhdGlvbiIsImdyaWQiLCJjaGlsZE5vZGVzIiwiY2hpbGROb2RlIiwiX3Nob3VsZElnbm9yZU5vZGUiLCJpbWFnZUxheWVyIiwiX3BhcnNlSW1hZ2VMYXllciIsImxheWVyIiwiX3BhcnNlTGF5ZXIiLCJvYmplY3RHcm91cCIsIl9wYXJzZU9iamVjdEdyb3VwIiwibm9kZVR5cGUiLCJzZWxMYXllciIsImRhdGFzIiwib3BhY2l0eSIsImRhdGEiLCJzb3VyY2UiLCJ0cmFucyIsImxheWVyU2l6ZSIsIm5vZGVWYWx1ZSIsInRyaW0iLCJjb21wcmVzc2lvbiIsImVuY29kaW5nIiwidW56aXBCYXNlNjRBc0FycmF5IiwiaW5mbGF0b3IiLCJJbmZsYXRlIiwiQmFzZTY0IiwiZGVjb2RlQXNBcnJheSIsImRlY29tcHJlc3MiLCJjc3ZUaWxlcyIsImNzdklkeCIsInNlbERhdGFUaWxlcyIsInhtbElkeCIsInNlbEdyb3VwIiwiZnJvbUhFWCIsImRyYXdvcmRlciIsIm9iamVjdHMiLCJzZWxPYmoiLCJvYmplY3RQcm9wIiwidmlzaWJsZUF0dHIiLCJ0ZXh0cyIsInRleHQiLCJUTVhPYmplY3RUeXBlIiwiVEVYVCIsIklNQUdFIiwiZWxsaXBzZSIsIkVMTElQU0UiLCJwb2x5Z29uUHJvcHMiLCJQT0xZR09OIiwic2VsUGdQb2ludFN0ciIsIl9wYXJzZVBvaW50c1N0cmluZyIsInBvbHlsaW5lUHJvcHMiLCJQT0xZTElORSIsInNlbFBsUG9pbnRTdHIiLCJSRUNUIiwic29ydCIsInBvaW50c1N0cmluZyIsInBvaW50cyIsInBvaW50c1N0ciIsInNlbFBvaW50U3RyIiwic2V0VGlsZUFuaW1hdGlvbnMiLCJnZXRUaWxlQW5pbWF0aW9ucyIsImdldFRpbGVQcm9wZXJ0aWVzIiwic2V0VGlsZVByb3BlcnRpZXMiLCJ0aWxlUHJvcGVydGllcyIsImdldEN1cnJlbnRTdHJpbmciLCJzZXRDdXJyZW50U3RyaW5nIiwiX3AiLCJnZXRzZXQiLCJBVFRSSUJfQkFTRTY0IiwiQVRUUklCX0daSVAiLCJBVFRSSUJfWkxJQiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUMseUJBQUQsQ0FBcEI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRixPQUFPLENBQUMscUJBQUQsQ0FBbEI7O0FBQ0FBLE9BQU8sQ0FBQyw4QkFBRCxDQUFQOztBQUVBLFNBQVNHLHVCQUFULENBQWtDQyxRQUFsQyxFQUE0QztBQUN4QyxNQUFHQSxRQUFRLENBQUNDLE1BQVQsR0FBa0IsQ0FBbEIsS0FBd0IsQ0FBM0IsRUFDSSxPQUFPLElBQVA7QUFFSixNQUFJQyxNQUFNLEdBQUdGLFFBQVEsQ0FBQ0MsTUFBVCxHQUFpQixDQUE5QjtBQUNBLE1BQUlFLE1BQU0sR0FBR0MsTUFBTSxDQUFDQyxXQUFQLEdBQW9CLElBQUlBLFdBQUosQ0FBZ0JILE1BQWhCLENBQXBCLEdBQThDLEVBQTNEOztBQUNBLE9BQUksSUFBSUksQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHSixNQUFuQixFQUEyQkksQ0FB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QUFILENBQVVELEVBQVYsRUFBYyxXQUFkLEVBQTJCQSxFQUFFLENBQUM5SixhQUE5QixFQUE2QzhKLEVBQUUsQ0FBQzdKLGFBQWhEO0FBQ0EzSSxFQUFFLENBQUN5UyxNQUFILENBQVVELEVBQVYsRUFBYyxZQUFkLEVBQTRCQSxFQUFFLENBQUM1SixjQUEvQixFQUErQzRKLEVBQUUsQ0FBQzNKLGNBQWxEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FuSSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0JzSixXQUFoQixHQUE4QixLQUFLLENBQW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F2SixFQUFFLENBQUNDLFlBQUgsQ0FBZ0IrUixhQUFoQixHQUFnQyxLQUFLLENBQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FoUyxFQUFFLENBQUNDLFlBQUgsQ0FBZ0JnUyxXQUFoQixHQUE4QixLQUFLLENBQW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FqUyxFQUFFLENBQUNDLFlBQUgsQ0FBZ0JpUyxXQUFoQixHQUE4QixLQUFLLENBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxyXG4gQ29weXJpZ2h0IChjKSAyMDExLTIwMTIgY29jb3MyZC14Lm9yZ1xyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjb2RlYyA9IHJlcXVpcmUoJy4uL2NvbXByZXNzaW9uL1ppcFV0aWxzJyk7XHJcbmNvbnN0IHpsaWIgPSByZXF1aXJlKCcuLi9jb21wcmVzc2lvbi96bGliLm1pbicpO1xyXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vanMnKTtcclxucmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ1NBWFBhcnNlcicpO1xyXG5cclxuZnVuY3Rpb24gdWludDhBcnJheVRvVWludDMyQXJyYXkgKHVpbnQ4QXJyKSB7XHJcbiAgICBpZih1aW50OEFyci5sZW5ndGggJSA0ICE9PSAwKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGxldCBhcnJMZW4gPSB1aW50OEFyci5sZW5ndGggLzQ7XHJcbiAgICBsZXQgcmV0QXJyID0gd2luZG93LlVpbnQzMkFycmF5PyBuZXcgVWludDMyQXJyYXkoYXJyTGVuKSA6IFtdO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyckxlbjsgaSsrKXtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gaSAqIDQ7XHJcbiAgICAgICAgcmV0QXJyW2ldID0gdWludDhBcnJbb2Zmc2V0XSAgKyB1aW50OEFycltvZmZzZXQgKyAxXSAqICgxIDw8IDgpICsgdWludDhBcnJbb2Zmc2V0ICsgMl0gKiAoMSA8PCAxNikgKyB1aW50OEFycltvZmZzZXQgKyAzXSAqICgxPDwyNCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0QXJyO1xyXG59XHJcblxyXG4vLyBCaXRzIG9uIHRoZSBmYXIgZW5kIG9mIHRoZSAzMi1iaXQgZ2xvYmFsIHRpbGUgSUQgKEdJRCdzKSBhcmUgdXNlZCBmb3IgdGlsZSBmbGFnc1xyXG5cclxuLyoqXHJcbiAqIGNjLlRNWExheWVySW5mbyBjb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxheWVycyBsaWtlOlxyXG4gKiAtIExheWVyIG5hbWVcclxuICogLSBMYXllciBzaXplXHJcbiAqIC0gTGF5ZXIgb3BhY2l0eSBhdCBjcmVhdGlvbiB0aW1lIChpdCBjYW4gYmUgbW9kaWZpZWQgYXQgcnVudGltZSlcclxuICogLSBXaGV0aGVyIHRoZSBsYXllciBpcyB2aXNpYmxlIChpZiBpdCdzIG5vdCB2aXNpYmxlLCB0aGVuIHRoZSBDb2Nvc05vZGUgd29uJ3QgYmUgY3JlYXRlZClcclxuICogVGhpcyBpbmZvcm1hdGlvbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBUTVggZmlsZS5cclxuICogQGNsYXNzIFRNWExheWVySW5mb1xyXG4gKi9cclxuLyoqXHJcbiAqIFByb3BlcnRpZXMgb2YgdGhlIGxheWVyIGluZm8uXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFxyXG4gKi9cclxuY2MuVE1YTGF5ZXJJbmZvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XHJcbiAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgdGhpcy5fbGF5ZXJTaXplID0gbnVsbDtcclxuICAgIHRoaXMuX3RpbGVzID0gW107XHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy5fb3BhY2l0eSA9IDA7XHJcbiAgICB0aGlzLm93blRpbGVzID0gdHJ1ZTtcclxuICAgIHRoaXMuX21pbkdJRCA9IDEwMDAwMDtcclxuICAgIHRoaXMuX21heEdJRCA9IDA7XHJcbiAgICB0aGlzLm9mZnNldCA9IGNjLnYyKDAsMCk7XHJcbn07XHJcblxyXG5jYy5UTVhMYXllckluZm8ucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IGNjLlRNWExheWVySW5mbyxcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgUHJvcGVydGllcy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJvcGVydGllcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIFByb3BlcnRpZXMuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0UHJvcGVydGllcyAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBjYy5UTVhJbWFnZUxheWVySW5mbyBjb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGltYWdlIGxheWVycy5cclxuICogVGhpcyBpbmZvcm1hdGlvbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBUTVggZmlsZS5cclxuICogQGNsYXNzIFRNWEltYWdlTGF5ZXJJbmZvXHJcbiAqL1xyXG5jYy5UTVhJbWFnZUxheWVySW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubmFtZT0gXCJcIjtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgIHRoaXMub2Zmc2V0ID0gY2MudjIoMCwwKTtcclxuICAgIHRoaXMuX29wYWNpdHkgPSAwO1xyXG4gICAgdGhpcy5fdHJhbnMgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgIHRoaXMuc291cmNlSW1hZ2UgPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIDxwPmNjLlRNWE9iamVjdEdyb3VwSW5mbyBjb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9iamVjdCBncm91cCBsaWtlOlxyXG4gKiAtIGdyb3VwIG5hbWVcclxuICogLSBncm91cCBzaXplXHJcbiAqIC0gZ3JvdXAgb3BhY2l0eSBhdCBjcmVhdGlvbiB0aW1lIChpdCBjYW4gYmUgbW9kaWZpZWQgYXQgcnVudGltZSlcclxuICogLSBXaGV0aGVyIHRoZSBncm91cCBpcyB2aXNpYmxlXHJcbiAqXHJcbiAqIFRoaXMgaW5mb3JtYXRpb24gaXMgb2J0YWluZWQgZnJvbSB0aGUgVE1YIGZpbGUuPC9wPlxyXG4gKiBAY2xhc3MgVE1YT2JqZWN0R3JvdXBJbmZvXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFByb3BlcnRpZXMgb2YgdGhlIE9iamVjdEdyb3VwIGluZm8uXHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHByb3BlcnRpZXNcclxuICovXHJcbmNjLlRNWE9iamVjdEdyb3VwSW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMucHJvcGVydGllcyA9IHt9O1xyXG4gICAgdGhpcy5uYW1lID0gXCJcIjtcclxuICAgIHRoaXMuX29iamVjdHMgPSBbXTtcclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLl9vcGFjaXR5ID0gMDtcclxuICAgIHRoaXMuX2NvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XHJcbiAgICB0aGlzLm9mZnNldCA9IGNjLnYyKDAsMCk7XHJcbiAgICB0aGlzLl9kcmF3b3JkZXIgPSAndG9wZG93bic7XHJcbn07XHJcblxyXG5jYy5UTVhPYmplY3RHcm91cEluZm8ucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IGNjLlRNWE9iamVjdEdyb3VwSW5mbyxcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgUHJvcGVydGllcy5cclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRQcm9wZXJ0aWVzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgUHJvcGVydGllcy5cclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRQcm9wZXJ0aWVzICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIDxwPmNjLlRNWFRpbGVzZXRJbmZvIGNvbnRhaW5zIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdGlsZXNldHMgbGlrZTogPGJyIC8+XHJcbiAqIC0gVGlsZXNldCBuYW1lPGJyIC8+XHJcbiAqIC0gVGlsZXNldCBzcGFjaW5nPGJyIC8+XHJcbiAqIC0gVGlsZXNldCBtYXJnaW48YnIgLz5cclxuICogLSBzaXplIG9mIHRoZSB0aWxlczxiciAvPlxyXG4gKiAtIEltYWdlIHVzZWQgZm9yIHRoZSB0aWxlczxiciAvPlxyXG4gKiAtIEltYWdlIHNpemU8YnIgLz5cclxuICpcclxuICogVGhpcyBpbmZvcm1hdGlvbiBpcyBvYnRhaW5lZCBmcm9tIHRoZSBUTVggZmlsZS4gPC9wPlxyXG4gKiBAY2xhc3MgVE1YVGlsZXNldEluZm9cclxuICovXHJcblxyXG4vKipcclxuICogVGlsZXNldCBuYW1lXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZpcnN0IGdyaWRcclxuICogQHByb3BlcnR5IHtudW1iZXJ9IGZpcnN0R2lkIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTcGFjaW5nXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzcGFjaW5nXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE1hcmdpblxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWFyZ2luIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUZXh0dXJlIGNvbnRhaW5pbmcgdGhlIHRpbGVzIChzaG91bGQgYmUgc3ByaXRlIHNoZWV0IC8gdGV4dHVyZSBhdGxhcylcclxuICogQHByb3BlcnR5IHthbnl9IHNvdXJjZUltYWdlXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFNpemUgaW4gcGl4ZWxzIG9mIHRoZSBpbWFnZVxyXG4gKiBAcHJvcGVydHkge2NjLlNpemV9IGltYWdlU2l6ZVxyXG4gKi9cclxuY2MuVE1YVGlsZXNldEluZm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyBUaWxlc2V0IG5hbWVcclxuICAgIHRoaXMubmFtZSA9IFwiXCI7XHJcbiAgICAvLyBGaXJzdCBncmlkXHJcbiAgICB0aGlzLmZpcnN0R2lkID0gMDtcclxuICAgIC8vIFNwYWNpbmdcclxuICAgIHRoaXMuc3BhY2luZyA9IDA7XHJcbiAgICAvLyBNYXJnaW5cclxuICAgIHRoaXMubWFyZ2luID0gMDtcclxuICAgIC8vIFRleHR1cmUgY29udGFpbmluZyB0aGUgdGlsZXMgKHNob3VsZCBiZSBzcHJpdGUgc2hlZXQgLyB0ZXh0dXJlIGF0bGFzKVxyXG4gICAgdGhpcy5zb3VyY2VJbWFnZSA9IG51bGw7XHJcbiAgICAvLyBTaXplIGluIHBpeGVscyBvZiB0aGUgaW1hZ2VcclxuICAgIHRoaXMuaW1hZ2VTaXplID0gY2Muc2l6ZSgwLCAwKTtcclxuXHJcbiAgICB0aGlzLnRpbGVPZmZzZXQgPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICB0aGlzLl90aWxlU2l6ZSA9IGNjLnNpemUoMCwgMCk7XHJcbn07XHJcblxyXG5jYy5UTVhUaWxlc2V0SW5mby5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogY2MuVE1YVGlsZXNldEluZm8sXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiByZWN0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZ2lkXHJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxyXG4gICAgICovXHJcbiAgICByZWN0Rm9yR0lEIChnaWQsIHJlc3VsdCkge1xyXG4gICAgICAgIGxldCByZWN0ID0gcmVzdWx0IHx8IGNjLnJlY3QoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgcmVjdC53aWR0aCA9IHRoaXMuX3RpbGVTaXplLndpZHRoO1xyXG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gdGhpcy5fdGlsZVNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGdpZCAmPSBjYy5UaWxlZE1hcC5UaWxlRmxhZy5GTElQUEVEX01BU0s7XHJcbiAgICAgICAgZ2lkID0gZ2lkIC0gcGFyc2VJbnQodGhpcy5maXJzdEdpZCwgMTApO1xyXG4gICAgICAgIGxldCBtYXhfeCA9IHBhcnNlSW50KCh0aGlzLmltYWdlU2l6ZS53aWR0aCAtIHRoaXMubWFyZ2luICogMiArIHRoaXMuc3BhY2luZykgLyAodGhpcy5fdGlsZVNpemUud2lkdGggKyB0aGlzLnNwYWNpbmcpLCAxMCk7XHJcbiAgICAgICAgcmVjdC54ID0gcGFyc2VJbnQoKGdpZCAlIG1heF94KSAqICh0aGlzLl90aWxlU2l6ZS53aWR0aCArIHRoaXMuc3BhY2luZykgKyB0aGlzLm1hcmdpbiwgMTApO1xyXG4gICAgICAgIHJlY3QueSA9IHBhcnNlSW50KHBhcnNlSW50KGdpZCAvIG1heF94LCAxMCkgKiAodGhpcy5fdGlsZVNpemUuaGVpZ2h0ICsgdGhpcy5zcGFjaW5nKSArIHRoaXMubWFyZ2luLCAxMCk7XHJcbiAgICAgICAgcmV0dXJuIHJlY3Q7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzdHJUb0hBbGlnbiAodmFsdWUpIHtcclxuICAgIGNvbnN0IGhBbGlnbiA9IGNjLkxhYmVsLkhvcml6b250YWxBbGlnbjtcclxuICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICBjYXNlICdjZW50ZXInOlxyXG4gICAgICAgICAgICByZXR1cm4gaEFsaWduLkNFTlRFUjtcclxuICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgIHJldHVybiBoQWxpZ24uUklHSFQ7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGhBbGlnbi5MRUZUO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdHJUb1ZBbGlnbiAodmFsdWUpIHtcclxuICAgIGNvbnN0IHZBbGlnbiA9IGNjLkxhYmVsLlZlcnRpY2FsQWxpZ247XHJcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgY2FzZSAnY2VudGVyJzpcclxuICAgICAgICAgICAgcmV0dXJuIHZBbGlnbi5DRU5URVI7XHJcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgcmV0dXJuIHZBbGlnbi5CT1RUT007XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHZBbGlnbi5UT1A7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0clRvQ29sb3IgKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDAsIDAsIDAsIDI1NSk7XHJcbiAgICB9XHJcbiAgICB2YWx1ZSA9ICh2YWx1ZS5pbmRleE9mKCcjJykgIT09IC0xKSA/IHZhbHVlLnN1YnN0cmluZygxKSA6IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgIGxldCBhID0gcGFyc2VJbnQodmFsdWUuc3Vic3RyKDAsIDIpLCAxNikgfHwgMjU1O1xyXG4gICAgICAgIGxldCByID0gcGFyc2VJbnQodmFsdWUuc3Vic3RyKDIsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBsZXQgZyA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgbGV0IGIgPSBwYXJzZUludCh2YWx1ZS5zdWJzdHIoNiwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcihyLCBnLCBiLCBhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHIgPSBwYXJzZUludCh2YWx1ZS5zdWJzdHIoMCwgMiksIDE2KSB8fCAwO1xyXG4gICAgICAgIGxldCBnID0gcGFyc2VJbnQodmFsdWUuc3Vic3RyKDIsIDIpLCAxNikgfHwgMDtcclxuICAgICAgICBsZXQgYiA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cig0LCAyKSwgMTYpIHx8IDA7XHJcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKHIsIGcsIGIsIDI1NSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByb3BlcnR5TGlzdCAobm9kZSwgbWFwKSB7XHJcbiAgICBsZXQgcmVzID0gW107XHJcbiAgICBsZXQgcHJvcGVydGllcyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwcm9wZXJ0aWVzXCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gcHJvcGVydGllc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInByb3BlcnR5XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcHJvcGVydHkubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgcmVzLnB1c2gocHJvcGVydHlbal0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXAgPSBtYXAgfHwge307XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gcmVzW2ldO1xyXG4gICAgICAgIGxldCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICBsZXQgdHlwZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgJ3N0cmluZyc7XHJcblxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAnaW50Jykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2Zsb2F0Jykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnYm9vbCcpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gJ3RydWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAnY29sb3InKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gc3RyVG9Db2xvcih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXBbbmFtZV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwO1xyXG59XHJcblxyXG4vKipcclxuICogPHA+Y2MuVE1YTWFwSW5mbyBjb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG1hcCBsaWtlOiA8YnIvPlxyXG4gKi0gTWFwIG9yaWVudGF0aW9uIChoZXhhZ29uYWwsIGlzb21ldHJpYyBvciBvcnRob2dvbmFsKTxici8+XHJcbiAqLSBUaWxlIHNpemU8YnIvPlxyXG4gKi0gTWFwIHNpemU8L3A+XHJcbiAqXHJcbiAqIDxwPkFuZCBpdCBhbHNvIGNvbnRhaW5zOiA8YnIvPlxyXG4gKiAtIExheWVycyAoYW4gYXJyYXkgb2YgVE1YTGF5ZXJJbmZvIG9iamVjdHMpPGJyLz5cclxuICogLSBUaWxlc2V0cyAoYW4gYXJyYXkgb2YgVE1YVGlsZXNldEluZm8gb2JqZWN0cykgPGJyLz5cclxuICogLSBPYmplY3RHcm91cHMgKGFuIGFycmF5IG9mIFRNWE9iamVjdEdyb3VwSW5mbyBvYmplY3RzKSA8L3A+XHJcbiAqXHJcbiAqIDxwPlRoaXMgaW5mb3JtYXRpb24gaXMgb2J0YWluZWQgZnJvbSB0aGUgVE1YIGZpbGUuIDwvcD5cclxuICogQGNsYXNzIFRNWE1hcEluZm9cclxuICovXHJcblxyXG4vKipcclxuICogUHJvcGVydGllcyBvZiB0aGUgbWFwIGluZm8uXHJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9ICAgIHByb3BlcnRpZXMgICAgICAgICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE1hcCBvcmllbnRhdGlvbi5cclxuICogQHByb3BlcnR5IHtOdW1iZXJ9ICAgb3JpZW50YXRpb24gICAgICAgICBcclxuICovXHJcblxyXG4vKipcclxuICogUGFyZW50IGVsZW1lbnQuXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSAgIHBhcmVudEVsZW1lbnQgICAgICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFBhcmVudCBHSUQuXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgIHBhcmVudEdJRCAgICAgICAgICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIExheWVyIGF0dHJpYnV0ZXMuXHJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSAgIGxheWVyQXR0cnMgICAgICAgIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBJcyByZWFkaW5nIHN0b3JpbmcgY2hhcmFjdGVycyBzdHJlYW0uXHJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gIHN0b3JpbmdDaGFyYWN0ZXJzICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEN1cnJlbnQgc3RyaW5nIHN0b3JlZCBmcm9tIGNoYXJhY3RlcnMgc3RyZWFtLlxyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gICBjdXJyZW50U3RyaW5nICAgICAgIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBXaWR0aCBvZiB0aGUgbWFwXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgIG1hcFdpZHRoICAgICAgICAgICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEhlaWdodCBvZiB0aGUgbWFwXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSAgIG1hcEhlaWdodCAgICAgICAgICAgXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFdpZHRoIG9mIGEgdGlsZVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gICB0aWxlV2lkdGggICAgICAgICAgIFxyXG4gKi9cclxuXHJcbi8qKiBcclxuICogSGVpZ2h0IG9mIGEgdGlsZVxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gICB0aWxlSGVpZ2h0ICAgICAgICAgIFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiAxLlxyXG4gKiAvL2NyZWF0ZSBhIFRNWE1hcEluZm8gd2l0aCBmaWxlIG5hbWVcclxuICogbGV0IHRteE1hcEluZm8gPSBuZXcgY2MuVE1YTWFwSW5mbyhcInJlcy9vcnRob2dvbmFsLXRlc3QxLnRteFwiKTtcclxuICogMi5cclxuICogLy9jcmVhdGUgYSBUTVhNYXBJbmZvIHdpdGggY29udGVudCBzdHJpbmcgYW5kIHJlc291cmNlIHBhdGhcclxuICogbGV0IHJlc291cmNlcyA9IFwicmVzL1RpbGVNYXBzXCI7XHJcbiAqIGxldCBmaWxlUGF0aCA9IFwicmVzL1RpbGVNYXBzL29ydGhvZ29uYWwtdGVzdDEudG14XCI7XHJcbiAqIGxldCB4bWxTdHIgPSBjYy5yZXNvdXJjZXMuZ2V0KGZpbGVQYXRoKTtcclxuICogbGV0IHRteE1hcEluZm8gPSBuZXcgY2MuVE1YTWFwSW5mbyh4bWxTdHIsIHJlc291cmNlcyk7XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBUTVggRm9ybWF0IHdpdGggYSB0bXggZmlsZSBvciBjb250ZW50IHN0cmluZ1xyXG4gKi9cclxuY2MuVE1YTWFwSW5mbyA9IGZ1bmN0aW9uICh0bXhGaWxlLCB0c3hNYXAsIHRleHR1cmVzLCB0ZXh0dXJlU2l6ZXMsIGltYWdlTGF5ZXJUZXh0dXJlcykge1xyXG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gbnVsbDtcclxuICAgIHRoaXMucGFyZW50RWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLnBhcmVudEdJRCA9IG51bGw7XHJcbiAgICB0aGlzLmxheWVyQXR0cnMgPSAwO1xyXG4gICAgdGhpcy5zdG9yaW5nQ2hhcmFjdGVycyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jdXJyZW50U3RyaW5nID0gbnVsbDtcclxuICAgIHRoaXMucmVuZGVyT3JkZXIgPSBjYy5UaWxlZE1hcC5SZW5kZXJPcmRlci5SaWdodERvd247XHJcblxyXG4gICAgdGhpcy5fc3VwcG9ydFZlcnNpb24gPSBbMSwgMiwgMF07XHJcbiAgICB0aGlzLl9wYXJzZXIgPSBuZXcgY2MuU0FYUGFyc2VyKCk7XHJcbiAgICB0aGlzLl9vYmplY3RHcm91cHMgPSBbXTtcclxuICAgIHRoaXMuX2FsbENoaWxkcmVuID0gW107XHJcbiAgICB0aGlzLl9tYXBTaXplID0gY2Muc2l6ZSgwLCAwKTtcclxuICAgIHRoaXMuX3RpbGVTaXplID0gY2Muc2l6ZSgwLCAwKTtcclxuICAgIHRoaXMuX2xheWVycyA9IFtdO1xyXG4gICAgdGhpcy5fdGlsZXNldHMgPSBbXTtcclxuICAgIHRoaXMuX2ltYWdlTGF5ZXJzID0gW107XHJcbiAgICB0aGlzLl90aWxlUHJvcGVydGllcyA9IHt9O1xyXG4gICAgdGhpcy5fdGlsZUFuaW1hdGlvbnMgPSB7fTtcclxuICAgIHRoaXMuX3RzeE1hcCA9IG51bGw7XHJcblxyXG4gICAgLy8gbWFwIG9mIHRleHR1cmVzIGluZGV4ZWQgYnkgbmFtZVxyXG4gICAgdGhpcy5fdGV4dHVyZXMgPSBudWxsO1xyXG5cclxuICAgIC8vIGhleCBtYXAgdmFsdWVzXHJcbiAgICB0aGlzLl9zdGFnZ2VyQXhpcyA9IG51bGw7XHJcbiAgICB0aGlzLl9zdGFnZ2VySW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5faGV4U2lkZUxlbmd0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5faW1hZ2VMYXllclRleHR1cmVzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmluaXRXaXRoWE1MKHRteEZpbGUsIHRzeE1hcCwgdGV4dHVyZXMsIHRleHR1cmVTaXplcywgaW1hZ2VMYXllclRleHR1cmVzKTtcclxufTtcclxuY2MuVE1YTWFwSW5mby5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogY2MuVE1YTWFwSW5mbyxcclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBNYXAgb3JpZW50YXRpb24uXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldE9yaWVudGF0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIE1hcCBvcmllbnRhdGlvbi5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRPcmllbnRhdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgc3RhZ2dlckF4aXMgb2YgbWFwLlxyXG4gICAgICogQHJldHVybiB7Y2MuVGlsZWRNYXAuU3RhZ2dlckF4aXN9XHJcbiAgICAgKi9cclxuICAgIGdldFN0YWdnZXJBeGlzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhZ2dlckF4aXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzdGFnZ2VyQXhpcyBvZiBtYXAuXHJcbiAgICAgKiBAcGFyYW0ge2NjLlRpbGVkTWFwLlN0YWdnZXJBeGlzfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRTdGFnZ2VyQXhpcyAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zdGFnZ2VyQXhpcyA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgc3RhZ2dlciBpbmRleFxyXG4gICAgICogQHJldHVybiB7Y2MuVGlsZWRNYXAuU3RhZ2dlckluZGV4fVxyXG4gICAgICovXHJcbiAgICBnZXRTdGFnZ2VySW5kZXggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFnZ2VySW5kZXg7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzdGFnZ2VyIGluZGV4LlxyXG4gICAgICogQHBhcmFtIHtjYy5UaWxlZE1hcC5TdGFnZ2VySW5kZXh9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldFN0YWdnZXJJbmRleCAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zdGFnZ2VySW5kZXggPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIEhleCBzaWRlIGxlbmd0aC5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0SGV4U2lkZUxlbmd0aCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hleFNpZGVMZW5ndGg7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBIZXggc2lkZSBsZW5ndGguXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0SGV4U2lkZUxlbmd0aCAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9oZXhTaWRlTGVuZ3RoID0gdmFsdWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBnZXRNYXBTaXplICgpIHtcclxuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9tYXBTaXplLndpZHRoLCB0aGlzLl9tYXBTaXplLmhlaWdodCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge1NpemV9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldE1hcFNpemUgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fbWFwU2l6ZS53aWR0aCA9IHZhbHVlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX21hcFNpemUuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0TWFwV2lkdGggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXBTaXplLndpZHRoO1xyXG4gICAgfSxcclxuICAgIF9zZXRNYXBXaWR0aCAod2lkdGgpIHtcclxuICAgICAgICB0aGlzLl9tYXBTaXplLndpZHRoID0gd2lkdGg7XHJcbiAgICB9LFxyXG4gICAgX2dldE1hcEhlaWdodCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcFNpemUuaGVpZ2h0O1xyXG4gICAgfSxcclxuICAgIF9zZXRNYXBIZWlnaHQgKGhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuX21hcFNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRpbGVzIHdpZHRoICYgaGVpZ2h0XHJcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxyXG4gICAgICovXHJcbiAgICBnZXRUaWxlU2l6ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnNpemUodGhpcy5fdGlsZVNpemUud2lkdGgsIHRoaXMuX3RpbGVTaXplLmhlaWdodCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGlsZXMgd2lkdGggJiBoZWlnaHRcclxuICAgICAqIEBwYXJhbSB7U2l6ZX0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VGlsZVNpemUgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fdGlsZVNpemUud2lkdGggPSB2YWx1ZS53aWR0aDtcclxuICAgICAgICB0aGlzLl90aWxlU2l6ZS5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRUaWxlV2lkdGggKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZS53aWR0aDtcclxuICAgIH0sXHJcbiAgICBfc2V0VGlsZVdpZHRoICh3aWR0aCkge1xyXG4gICAgICAgIHRoaXMuX3RpbGVTaXplLndpZHRoID0gd2lkdGg7XHJcbiAgICB9LFxyXG4gICAgX2dldFRpbGVIZWlnaHQgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlU2l6ZS5oZWlnaHQ7XHJcbiAgICB9LFxyXG4gICAgX3NldFRpbGVIZWlnaHQgKGhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuX3RpbGVTaXplLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMYXllcnNcclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRMYXllcnMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGF5ZXJzXHJcbiAgICAgKiBAcGFyYW0ge2NjLlRNWExheWVySW5mb30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0TGF5ZXJzICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLnB1c2godmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5wdXNoKHZhbHVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbWFnZUxheWVyc1xyXG4gICAgICogQHJldHVybiB7QXJyYXl9XHJcbiAgICAgKi9cclxuICAgIGdldEltYWdlTGF5ZXJzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2VMYXllcnM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2VMYXllcnNcclxuICAgICAqIEBwYXJhbSB7Y2MuVE1YSW1hZ2VMYXllckluZm99IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldEltYWdlTGF5ZXJzICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLnB1c2godmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTGF5ZXJzLnB1c2godmFsdWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRpbGVzZXRzXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgZ2V0VGlsZXNldHMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlc2V0cztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aWxlc2V0c1xyXG4gICAgICogQHBhcmFtIHtjYy5UTVhUaWxlc2V0SW5mb30gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0VGlsZXNldHMgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fdGlsZXNldHMucHVzaCh2YWx1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT2JqZWN0R3JvdXBzXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgICAqL1xyXG4gICAgZ2V0T2JqZWN0R3JvdXBzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0R3JvdXBzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9iamVjdEdyb3Vwc1xyXG4gICAgICogQHBhcmFtIHtjYy5UTVhPYmplY3RHcm91cH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0T2JqZWN0R3JvdXBzICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLnB1c2godmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX29iamVjdEdyb3Vwcy5wdXNoKHZhbHVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QWxsQ2hpbGRyZW4gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hbGxDaGlsZHJlbjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwYXJlbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRQYXJlbnRFbGVtZW50ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRFbGVtZW50O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHBhcmVudCBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0UGFyZW50RWxlbWVudCAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwYXJlbnQgR0lEXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGdldFBhcmVudEdJRCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50R0lEO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHBhcmVudCBHSURcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRQYXJlbnRHSUQgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnRHSUQgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMYXllciBhdHRyaWJ1dGVcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0TGF5ZXJBdHRyaWJzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllckF0dHJzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIExheWVyIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHNldExheWVyQXR0cmlicyAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmxheWVyQXR0cnMgPSB2YWx1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyByZWFkaW5nIHN0b3JpbmcgY2hhcmFjdGVycyBzdHJlYW1cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGdldFN0b3JpbmdDaGFyYWN0ZXJzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yaW5nQ2hhcmFjdGVycztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyByZWFkaW5nIHN0b3JpbmcgY2hhcmFjdGVycyBzdHJlYW1cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdmFsdWVcclxuICAgICAqL1xyXG4gICAgc2V0U3RvcmluZ0NoYXJhY3RlcnMgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zdG9yaW5nQ2hhcmFjdGVycyA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXNcclxuICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRQcm9wZXJ0aWVzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBzZXRQcm9wZXJ0aWVzICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHZhbHVlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGluaXRpYWxpemVzIGEgVE1YIGZvcm1hdCB3aXRoIGFuIFhNTCBzdHJpbmcgYW5kIGEgVE1YIHJlc291cmNlIHBhdGhcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0bXhTdHJpbmdcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0c3hNYXBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0ZXh0dXJlc1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaW5pdFdpdGhYTUwgKHRteFN0cmluZywgdHN4TWFwLCB0ZXh0dXJlcywgdGV4dHVyZVNpemVzLCBpbWFnZUxheWVyVGV4dHVyZXMpIHtcclxuICAgICAgICB0aGlzLl90aWxlc2V0cy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xheWVycy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTGF5ZXJzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3RzeE1hcCA9IHRzeE1hcDtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlcyA9IHRleHR1cmVzO1xyXG4gICAgICAgIHRoaXMuX2ltYWdlTGF5ZXJUZXh0dXJlcyA9IGltYWdlTGF5ZXJUZXh0dXJlcztcclxuICAgICAgICB0aGlzLl90ZXh0dXJlU2l6ZXMgPSB0ZXh0dXJlU2l6ZXM7XHJcblxyXG4gICAgICAgIHRoaXMuX29iamVjdEdyb3Vwcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2FsbENoaWxkcmVuLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGlsZVByb3BlcnRpZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl90aWxlQW5pbWF0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICAvLyB0bXAgdmFyc1xyXG4gICAgICAgIHRoaXMuY3VycmVudFN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zdG9yaW5nQ2hhcmFjdGVycyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGF5ZXJBdHRycyA9IGNjLlRNWExheWVySW5mby5BVFRSSUJfTk9ORTtcclxuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSBjYy5UaWxlZE1hcC5OT05FO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVhNTFN0cmluZyh0bXhTdHJpbmcpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIHBhcnNpbmcgb2YgYW4gWE1MIHN0cmluZywgZWl0aGVyIGEgdG14IChNYXApIHN0cmluZyBvciB0c3ggKFRpbGVzZXQpIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHhtbFN0cmluZ1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbGVzZXRGaXJzdEdpZFxyXG4gICAgICogQHJldHVybiB7RWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgcGFyc2VYTUxTdHJpbmcgKHhtbFN0ciwgdGlsZXNldEZpcnN0R2lkKSB7XHJcbiAgICAgICAgbGV0IG1hcFhNTCA9IHRoaXMuX3BhcnNlci5fcGFyc2VYTUwoeG1sU3RyKTtcclxuICAgICAgICBsZXQgaTtcclxuXHJcbiAgICAgICAgLy8gUEFSU0UgPG1hcD5cclxuICAgICAgICBsZXQgbWFwID0gbWFwWE1MLmRvY3VtZW50RWxlbWVudDtcclxuXHJcbiAgICAgICAgbGV0IG9yaWVudGF0aW9uU3RyID0gbWFwLmdldEF0dHJpYnV0ZSgnb3JpZW50YXRpb24nKTtcclxuICAgICAgICBsZXQgc3RhZ2dlckF4aXNTdHIgPSBtYXAuZ2V0QXR0cmlidXRlKCdzdGFnZ2VyYXhpcycpO1xyXG4gICAgICAgIGxldCBzdGFnZ2VySW5kZXhTdHIgPSBtYXAuZ2V0QXR0cmlidXRlKCdzdGFnZ2VyaW5kZXgnKTtcclxuICAgICAgICBsZXQgaGV4U2lkZUxlbmd0aFN0ciA9IG1hcC5nZXRBdHRyaWJ1dGUoJ2hleHNpZGVsZW5ndGgnKTtcclxuICAgICAgICBsZXQgcmVuZGVyb3JkZXJTdHIgPSBtYXAuZ2V0QXR0cmlidXRlKCdyZW5kZXJvcmRlcicpO1xyXG4gICAgICAgIGxldCB2ZXJzaW9uID0gbWFwLmdldEF0dHJpYnV0ZSgndmVyc2lvbicpIHx8ICcxLjAuMCc7XHJcblxyXG4gICAgICAgIGlmIChtYXAubm9kZU5hbWUgPT09IFwibWFwXCIpIHtcclxuICAgICAgICAgICAgbGV0IHZlcnNpb25BcnIgPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIGxldCBzdXBwb3J0VmVyc2lvbiA9IHRoaXMuX3N1cHBvcnRWZXJzaW9uO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1cHBvcnRWZXJzaW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHBhcnNlSW50KHZlcnNpb25BcnJbaV0pIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3YgPSBzdXBwb3J0VmVyc2lvbltpXTtcclxuICAgICAgICAgICAgICAgIGlmIChzdiA8IHYpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg3MjE2LCB2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uU3RyID09PSBcIm9ydGhvZ29uYWxcIilcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5PUlRITztcclxuICAgICAgICAgICAgZWxzZSBpZiAob3JpZW50YXRpb25TdHIgPT09IFwiaXNvbWV0cmljXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gY2MuVGlsZWRNYXAuT3JpZW50YXRpb24uSVNPO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChvcmllbnRhdGlvblN0ciA9PT0gXCJoZXhhZ29uYWxcIilcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBjYy5UaWxlZE1hcC5PcmllbnRhdGlvbi5IRVg7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9yaWVudGF0aW9uU3RyICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgY2MubG9nSUQoNzIxNywgb3JpZW50YXRpb25TdHIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlbmRlcm9yZGVyU3RyID09PSAncmlnaHQtdXAnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9yZGVyID0gY2MuVGlsZWRNYXAuUmVuZGVyT3JkZXIuUmlnaHRVcDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW5kZXJvcmRlclN0ciA9PT0gJ2xlZnQtdXAnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9yZGVyID0gY2MuVGlsZWRNYXAuUmVuZGVyT3JkZXIuTGVmdFVwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbmRlcm9yZGVyU3RyID09PSAnbGVmdC1kb3duJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IGNjLlRpbGVkTWFwLlJlbmRlck9yZGVyLkxlZnREb3duO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJPcmRlciA9IGNjLlRpbGVkTWFwLlJlbmRlck9yZGVyLlJpZ2h0RG93bjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YWdnZXJBeGlzU3RyID09PSAneCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhZ2dlckF4aXMoY2MuVGlsZWRNYXAuU3RhZ2dlckF4aXMuU1RBR0dFUkFYSVNfWCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhZ2dlckF4aXNTdHIgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFnZ2VyQXhpcyhjYy5UaWxlZE1hcC5TdGFnZ2VyQXhpcy5TVEFHR0VSQVhJU19ZKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YWdnZXJJbmRleFN0ciA9PT0gJ29kZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhZ2dlckluZGV4KGNjLlRpbGVkTWFwLlN0YWdnZXJJbmRleC5TVEFHR0VSSU5ERVhfT0REKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChzdGFnZ2VySW5kZXhTdHIgPT09ICdldmVuJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFnZ2VySW5kZXgoY2MuVGlsZWRNYXAuU3RhZ2dlckluZGV4LlNUQUdHRVJJTkRFWF9FVkVOKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhleFNpZGVMZW5ndGhTdHIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGV4U2lkZUxlbmd0aChwYXJzZUZsb2F0KGhleFNpZGVMZW5ndGhTdHIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1hcFNpemUgPSBjYy5zaXplKDAsIDApO1xyXG4gICAgICAgICAgICBtYXBTaXplLndpZHRoID0gcGFyc2VGbG9hdChtYXAuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTtcclxuICAgICAgICAgICAgbWFwU2l6ZS5oZWlnaHQgPSBwYXJzZUZsb2F0KG1hcC5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRNYXBTaXplKG1hcFNpemUpO1xyXG5cclxuICAgICAgICAgICAgbWFwU2l6ZSA9IGNjLnNpemUoMCwgMCk7XHJcbiAgICAgICAgICAgIG1hcFNpemUud2lkdGggPSBwYXJzZUZsb2F0KG1hcC5nZXRBdHRyaWJ1dGUoJ3RpbGV3aWR0aCcpKTtcclxuICAgICAgICAgICAgbWFwU2l6ZS5oZWlnaHQgPSBwYXJzZUZsb2F0KG1hcC5nZXRBdHRyaWJ1dGUoJ3RpbGVoZWlnaHQnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGlsZVNpemUobWFwU2l6ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUaGUgcGFyZW50IGVsZW1lbnQgaXMgdGhlIG1hcFxyXG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0eUxpc3QobWFwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBBUlNFIDx0aWxlc2V0PlxyXG4gICAgICAgIGxldCB0aWxlc2V0cyA9IG1hcC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGlsZXNldCcpO1xyXG4gICAgICAgIGlmIChtYXAubm9kZU5hbWUgIT09IFwibWFwXCIpIHtcclxuICAgICAgICAgICAgdGlsZXNldHMgPSBbXTtcclxuICAgICAgICAgICAgdGlsZXNldHMucHVzaChtYXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRpbGVzZXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxUaWxlc2V0ID0gdGlsZXNldHNbaV07XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYW4gZXh0ZXJuYWwgdGlsZXNldCB0aGVuIHN0YXJ0IHBhcnNpbmcgdGhhdFxyXG4gICAgICAgICAgICBsZXQgdHN4TmFtZSA9IHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKTtcclxuICAgICAgICAgICAgaWYgKHRzeE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Rmlyc3RHSUQgPSBwYXJzZUludChzZWxUaWxlc2V0LmdldEF0dHJpYnV0ZSgnZmlyc3RnaWQnKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHN4WG1sU3RyaW5nID0gdGhpcy5fdHN4TWFwW3RzeE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRzeFhtbFN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyc2VYTUxTdHJpbmcodHN4WG1sU3RyaW5nLCBjdXJyZW50Rmlyc3RHSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlcyA9IHNlbFRpbGVzZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXVsdGlUZXh0dXJlcyA9IGltYWdlcy5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltYWdlID0gaW1hZ2VzWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0SW1hZ2VOYW1lID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzb3VyY2UnKTtcclxuICAgICAgICAgICAgICAgIGZpcnN0SW1hZ2VOYW1lID0gZmlyc3RJbWFnZU5hbWUucmVwbGFjZSgvXFxcXC9nLCAnXFwvJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGVzID0gc2VsVGlsZXNldC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGlsZScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGVDb3VudCA9IHRpbGVzICYmIHRpbGVzLmxlbmd0aCB8fCAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0TmFtZSA9IHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0U3BhY2luZyA9IHBhcnNlSW50KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdzcGFjaW5nJykpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZXNldE1hcmdpbiA9IHBhcnNlSW50KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCdtYXJnaW4nKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgIGxldCBmZ2lkID0gcGFyc2VJbnQodGlsZXNldEZpcnN0R2lkKTtcclxuICAgICAgICAgICAgICAgIGlmICghZmdpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZnaWQgPSBwYXJzZUludChzZWxUaWxlc2V0LmdldEF0dHJpYnV0ZSgnZmlyc3RnaWQnKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGlsZXNldFNpemUgPSBjYy5zaXplKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgdGlsZXNldFNpemUud2lkdGggPSBwYXJzZUZsb2F0KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCd0aWxld2lkdGgnKSk7XHJcbiAgICAgICAgICAgICAgICB0aWxlc2V0U2l6ZS5oZWlnaHQgPSBwYXJzZUZsb2F0KHNlbFRpbGVzZXQuZ2V0QXR0cmlidXRlKCd0aWxlaGVpZ2h0JykpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBhcnNlIHRpbGUgb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gc2VsVGlsZXNldC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGlsZW9mZnNldCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbGVPZmZzZXQgPSBjYy52MigwLCAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlT2Zmc2V0LnggPSBwYXJzZUZsb2F0KG9mZnNldC5nZXRBdHRyaWJ1dGUoJ3gnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZU9mZnNldC55ID0gcGFyc2VGbG9hdChvZmZzZXQuZ2V0QXR0cmlidXRlKCd5JykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0aWxlc2V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHRpbGVJZHggPSAwOyB0aWxlSWR4IDwgdGlsZUNvdW50OyB0aWxlSWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbGVzZXQgfHwgbXVsdGlUZXh0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0ID0gbmV3IGNjLlRNWFRpbGVzZXRJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQubmFtZSA9IHRpbGVzZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0LmZpcnN0R2lkID0gZmdpZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuc3BhY2luZyA9IHRpbGVzZXRTcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc2V0Lm1hcmdpbiA9IHRpbGVzZXRNYXJnaW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuX3RpbGVTaXplID0gdGlsZXNldFNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQudGlsZU9mZnNldCA9IHRpbGVPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuc291cmNlSW1hZ2UgPSB0aGlzLl90ZXh0dXJlc1tmaXJzdEltYWdlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVzZXQuaW1hZ2VTaXplID0gdGhpcy5fdGV4dHVyZVNpemVzW2ZpcnN0SW1hZ2VOYW1lXSB8fCB0aWxlc2V0LmltYWdlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aWxlc2V0LnNvdXJjZUltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDcyMjEsIGZpcnN0SW1hZ2VOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbGVzZXRzKHRpbGVzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGlsZSA9IHRpbGVzICYmIHRpbGVzW3RpbGVJZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGlsZSkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50R0lEID0gcGFyc2VJbnQoZmdpZCkgKyBwYXJzZUludCh0aWxlLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZUltYWdlcyA9IHRpbGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbGVJbWFnZXMgJiYgdGlsZUltYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlID0gdGlsZUltYWdlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdlTmFtZSA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc291cmNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlTmFtZSA9IGltYWdlTmFtZS5yZXBsYWNlKC9cXFxcL2csICdcXC8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5zb3VyY2VJbWFnZSA9IHRoaXMuX3RleHR1cmVzW2ltYWdlTmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGlsZXNldC5zb3VyY2VJbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3MjIxLCBpbWFnZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZVNpemUgPSBjYy5zaXplKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlU2l6ZS53aWR0aCA9IHBhcnNlRmxvYXQoaW1hZ2UuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZVNpemUuaGVpZ2h0ID0gcGFyc2VGbG9hdChpbWFnZS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5fdGlsZVNpemUgPSB0aWxlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXNldC5maXJzdEdpZCA9IHRoaXMucGFyZW50R0lEO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGlsZVByb3BlcnRpZXNbdGhpcy5wYXJlbnRHSURdID0gZ2V0UHJvcGVydHlMaXN0KHRpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb25zID0gdGlsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnMgJiYgYW5pbWF0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBhbmltYXRpb25zWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVzRGF0YSA9IGFuaW1hdGlvbi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZnJhbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvblByb3AgPSB7ZnJhbWVzOltdLCBkdDowLCBmcmFtZUlkeDowfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGlsZUFuaW1hdGlvbnNbdGhpcy5wYXJlbnRHSURdID0gYW5pbWF0aW9uUHJvcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZyYW1lcyA9IGFuaW1hdGlvblByb3AuZnJhbWVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBmcmFtZUlkeCA9IDA7IGZyYW1lSWR4IDwgZnJhbWVzRGF0YS5sZW5ndGg7IGZyYW1lSWR4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZSA9IGZyYW1lc0RhdGFbZnJhbWVJZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbGVpZCA9IHBhcnNlSW50KGZnaWQpICsgcGFyc2VJbnQoZnJhbWUuZ2V0QXR0cmlidXRlKCd0aWxlaWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBwYXJzZUZsb2F0KGZyYW1lLmdldEF0dHJpYnV0ZSgnZHVyYXRpb24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZXMucHVzaCh7dGlsZWlkIDogdGlsZWlkLCBkdXJhdGlvbiA6IGR1cmF0aW9uIC8gMTAwMCwgZ3JpZDogbnVsbH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQQVJTRSA8bGF5ZXI+ICYgPG9iamVjdGdyb3VwPiBpbiBvcmRlclxyXG4gICAgICAgIGxldCBjaGlsZE5vZGVzID0gbWFwLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkTm9kZSA9IGNoaWxkTm9kZXNbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG91bGRJZ25vcmVOb2RlKGNoaWxkTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hpbGROb2RlLm5vZGVOYW1lID09PSAnaW1hZ2VsYXllcicpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZUxheWVyID0gdGhpcy5fcGFyc2VJbWFnZUxheWVyKGNoaWxkTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VMYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2VMYXllcnMoaW1hZ2VMYXllcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGlsZE5vZGUubm9kZU5hbWUgPT09ICdsYXllcicpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXllciA9IHRoaXMuX3BhcnNlTGF5ZXIoY2hpbGROb2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5ZXJzKGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5ub2RlTmFtZSA9PT0gJ29iamVjdGdyb3VwJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iamVjdEdyb3VwID0gdGhpcy5fcGFyc2VPYmplY3RHcm91cChjaGlsZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRPYmplY3RHcm91cHMob2JqZWN0R3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc2hvdWxkSWdub3JlTm9kZSAobm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzIC8vIHRleHRcclxuICAgICAgICAgICAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gOCAgIC8vIGNvbW1lbnRcclxuICAgICAgICAgICAgfHwgbm9kZS5ub2RlVHlwZSA9PT0gNDsgIC8vIGNkYXRhXHJcbiAgICB9LFxyXG5cclxuICAgIF9wYXJzZUltYWdlTGF5ZXIgKHNlbExheWVyKSB7XHJcbiAgICAgICAgbGV0IGRhdGFzID0gc2VsTGF5ZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltYWdlJyk7XHJcbiAgICAgICAgaWYgKCFkYXRhcyB8fCBkYXRhcy5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZUxheWVyID0gbmV3IGNjLlRNWEltYWdlTGF5ZXJJbmZvKCk7XHJcbiAgICAgICAgaW1hZ2VMYXllci5uYW1lID0gc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcbiAgICAgICAgaW1hZ2VMYXllci5vZmZzZXQueCA9IHBhcnNlRmxvYXQoc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCdvZmZzZXR4JykpIHx8IDA7XHJcbiAgICAgICAgaW1hZ2VMYXllci5vZmZzZXQueSA9IHBhcnNlRmxvYXQoc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCdvZmZzZXR5JykpIHx8IDA7XHJcbiAgICAgICAgbGV0IHZpc2libGUgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ3Zpc2libGUnKTtcclxuICAgICAgICBpbWFnZUxheWVyLnZpc2libGUgPSAhKHZpc2libGUgPT09IFwiMFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9wYWNpdHkgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29wYWNpdHknKSB8fCAxO1xyXG4gICAgICAgIGltYWdlTGF5ZXIub3BhY2l0eSA9IHBhcnNlSW50KDI1NSAqIHBhcnNlRmxvYXQob3BhY2l0eSkpIHx8IDI1NTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBkYXRhc1swXTtcclxuICAgICAgICBsZXQgc291cmNlID0gZGF0YS5nZXRBdHRyaWJ1dGUoJ3NvdXJjZScpO1xyXG4gICAgICAgIGltYWdlTGF5ZXIuc291cmNlSW1hZ2UgPSB0aGlzLl9pbWFnZUxheWVyVGV4dHVyZXNbc291cmNlXTtcclxuICAgICAgICBpbWFnZUxheWVyLndpZHRoID0gcGFyc2VJbnQoZGF0YS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpIHx8IDA7XHJcbiAgICAgICAgaW1hZ2VMYXllci5oZWlnaHQgPSBwYXJzZUludChkYXRhLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDA7XHJcbiAgICAgICAgaW1hZ2VMYXllci50cmFucyA9IHN0clRvQ29sb3IoZGF0YS5nZXRBdHRyaWJ1dGUoJ3RyYW5zJykpO1xyXG5cclxuICAgICAgICBpZiAoIWltYWdlTGF5ZXIuc291cmNlSW1hZ2UpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCg3MjIxLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltYWdlTGF5ZXI7XHJcbiAgICB9LFxyXG4gXHJcbiAgICBfcGFyc2VMYXllciAoc2VsTGF5ZXIpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHNlbExheWVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkYXRhJylbMF07XHJcblxyXG4gICAgICAgIGxldCBsYXllciA9IG5ldyBjYy5UTVhMYXllckluZm8oKTtcclxuICAgICAgICBsYXllci5uYW1lID0gc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCduYW1lJyk7XHJcblxyXG4gICAgICAgIGxldCBsYXllclNpemUgPSBjYy5zaXplKDAsIDApO1xyXG4gICAgICAgIGxheWVyU2l6ZS53aWR0aCA9IHBhcnNlRmxvYXQoc2VsTGF5ZXIuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKTtcclxuICAgICAgICBsYXllclNpemUuaGVpZ2h0ID0gcGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKTtcclxuICAgICAgICBsYXllci5fbGF5ZXJTaXplID0gbGF5ZXJTaXplO1xyXG5cclxuICAgICAgICBsZXQgdmlzaWJsZSA9IHNlbExheWVyLmdldEF0dHJpYnV0ZSgndmlzaWJsZScpO1xyXG4gICAgICAgIGxheWVyLnZpc2libGUgPSAhKHZpc2libGUgPT09IFwiMFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9wYWNpdHkgPSBzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29wYWNpdHknKSB8fCAxO1xyXG4gICAgICAgIGlmIChvcGFjaXR5KVxyXG4gICAgICAgICAgICBsYXllci5fb3BhY2l0eSA9IHBhcnNlSW50KDI1NSAqIHBhcnNlRmxvYXQob3BhY2l0eSkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbGF5ZXIuX29wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgbGF5ZXIub2Zmc2V0ID0gY2MudjIocGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29mZnNldHgnKSkgfHwgMCwgcGFyc2VGbG9hdChzZWxMYXllci5nZXRBdHRyaWJ1dGUoJ29mZnNldHknKSkgfHwgMCk7XHJcblxyXG4gICAgICAgIGxldCBub2RlVmFsdWUgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRhdGEuY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBub2RlVmFsdWUgKz0gZGF0YS5jaGlsZE5vZGVzW2pdLm5vZGVWYWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlVmFsdWUgPSBub2RlVmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAvLyBVbnBhY2sgdGhlIHRpbGVtYXAgZGF0YVxyXG4gICAgICAgIGxldCBjb21wcmVzc2lvbiA9IGRhdGEuZ2V0QXR0cmlidXRlKCdjb21wcmVzc2lvbicpO1xyXG4gICAgICAgIGxldCBlbmNvZGluZyA9IGRhdGEuZ2V0QXR0cmlidXRlKCdlbmNvZGluZycpO1xyXG4gICAgICAgIGlmIChjb21wcmVzc2lvbiAmJiBjb21wcmVzc2lvbiAhPT0gXCJnemlwXCIgJiYgY29tcHJlc3Npb24gIT09IFwiemxpYlwiKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDcyMTgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpbGVzO1xyXG4gICAgICAgIHN3aXRjaCAoY29tcHJlc3Npb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnZ3ppcCc6XHJcbiAgICAgICAgICAgICAgICB0aWxlcyA9IGNvZGVjLnVuemlwQmFzZTY0QXNBcnJheShub2RlVmFsdWUsIDQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3psaWInOlxyXG4gICAgICAgICAgICAgICAgbGV0IGluZmxhdG9yID0gbmV3IHpsaWIuSW5mbGF0ZShjb2RlYy5CYXNlNjQuZGVjb2RlQXNBcnJheShub2RlVmFsdWUsIDEpKTtcclxuICAgICAgICAgICAgICAgIHRpbGVzID0gdWludDhBcnJheVRvVWludDMyQXJyYXkoaW5mbGF0b3IuZGVjb21wcmVzcygpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG51bGw6XHJcbiAgICAgICAgICAgIGNhc2UgJyc6XHJcbiAgICAgICAgICAgICAgICAvLyBVbmNvbXByZXNzZWRcclxuICAgICAgICAgICAgICAgIGlmIChlbmNvZGluZyA9PT0gXCJiYXNlNjRcIilcclxuICAgICAgICAgICAgICAgICAgICB0aWxlcyA9IGNvZGVjLkJhc2U2NC5kZWNvZGVBc0FycmF5KG5vZGVWYWx1ZSwgNCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlbmNvZGluZyA9PT0gXCJjc3ZcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbGVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNzdlRpbGVzID0gbm9kZVZhbHVlLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY3N2SWR4ID0gMDsgY3N2SWR4IDwgY3N2VGlsZXMubGVuZ3RoOyBjc3ZJZHgrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZXMucHVzaChwYXJzZUludChjc3ZUaWxlc1tjc3ZJZHhdKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vWE1MIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxEYXRhVGlsZXMgPSBkYXRhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGlsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWxlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHhtbElkeCA9IDA7IHhtbElkeCA8IHNlbERhdGFUaWxlcy5sZW5ndGg7IHhtbElkeCsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlcy5wdXNoKHBhcnNlSW50KHNlbERhdGFUaWxlc1t4bWxJZHhdLmdldEF0dHJpYnV0ZShcImdpZFwiKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXllckF0dHJzID09PSBjYy5UTVhMYXllckluZm8uQVRUUklCX05PTkUpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nSUQoNzIxOSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRpbGVzKSB7XHJcbiAgICAgICAgICAgIGxheWVyLl90aWxlcyA9IG5ldyBVaW50MzJBcnJheSh0aWxlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgcGFyZW50IGVsZW1lbnQgaXMgdGhlIGxhc3QgbGF5ZXJcclxuICAgICAgICBsYXllci5wcm9wZXJ0aWVzID0gZ2V0UHJvcGVydHlMaXN0KHNlbExheWVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxheWVyO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcGFyc2VPYmplY3RHcm91cCAoc2VsR3JvdXApIHtcclxuICAgICAgICBsZXQgb2JqZWN0R3JvdXAgPSBuZXcgY2MuVE1YT2JqZWN0R3JvdXBJbmZvKCk7XHJcbiAgICAgICAgb2JqZWN0R3JvdXAubmFtZSA9IHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8ICcnO1xyXG4gICAgICAgIG9iamVjdEdyb3VwLm9mZnNldCA9IGNjLnYyKHBhcnNlRmxvYXQoc2VsR3JvdXAuZ2V0QXR0cmlidXRlKCdvZmZzZXR4JykpLCBwYXJzZUZsb2F0KHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnb2Zmc2V0eScpKSk7XHJcblxyXG4gICAgICAgIGxldCBvcGFjaXR5ID0gc2VsR3JvdXAuZ2V0QXR0cmlidXRlKCdvcGFjaXR5JykgfHwgMTtcclxuICAgICAgICBpZiAob3BhY2l0eSlcclxuICAgICAgICAgICAgb2JqZWN0R3JvdXAuX29wYWNpdHkgPSBwYXJzZUludCgyNTUgKiBwYXJzZUZsb2F0KG9wYWNpdHkpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIG9iamVjdEdyb3VwLl9vcGFjaXR5ID0gMjU1O1xyXG5cclxuICAgICAgICBsZXQgdmlzaWJsZSA9IHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgndmlzaWJsZScpO1xyXG4gICAgICAgIGlmICh2aXNpYmxlICYmIHBhcnNlSW50KHZpc2libGUpID09PSAwKVxyXG4gICAgICAgICAgICBvYmplY3RHcm91cC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBjb2xvciA9IHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnY29sb3InKTtcclxuICAgICAgICBpZiAoY29sb3IpXHJcbiAgICAgICAgICAgIG9iamVjdEdyb3VwLl9jb2xvci5mcm9tSEVYKGNvbG9yKTtcclxuXHJcbiAgICAgICAgbGV0IGRyYXdvcmRlciA9IHNlbEdyb3VwLmdldEF0dHJpYnV0ZSgnZHJhd29yZGVyJyk7XHJcbiAgICAgICAgaWYgKGRyYXdvcmRlcilcclxuICAgICAgICAgICAgb2JqZWN0R3JvdXAuX2RyYXdvcmRlciA9IGRyYXdvcmRlcjtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBwcm9wZXJ0aWVzIHRvIHRoZSBncm91cFxyXG4gICAgICAgIG9iamVjdEdyb3VwLnNldFByb3BlcnRpZXMoZ2V0UHJvcGVydHlMaXN0KHNlbEdyb3VwKSk7XHJcblxyXG4gICAgICAgIGxldCBvYmplY3RzID0gc2VsR3JvdXAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29iamVjdCcpO1xyXG4gICAgICAgIGlmIChvYmplY3RzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgb2JqZWN0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbE9iaiA9IG9iamVjdHNbal07XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgdmFsdWUgZm9yIFwidHlwZVwiIHdhcyBibGFuayBvciBub3QgYSB2YWxpZCBjbGFzcyBuYW1lXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgVE1YT2JqZWN0SW5mbyB0byBzdG9yZSB0aGUgb2JqZWN0IGFuZCBpdHMgcHJvcGVydGllc1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iamVjdFByb3AgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGlkIG9mIHRoZSBvYmplY3RcclxuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ2lkJ10gPSBzZWxPYmouZ2V0QXR0cmlidXRlKCdpZCcpIHx8IGo7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBuYW1lIG9mIHRoZSBvYmplY3QgdG8gdGhlIHZhbHVlIGZvciBcIm5hbWVcIlxyXG4gICAgICAgICAgICAgICAgb2JqZWN0UHJvcFtcIm5hbWVcIl0gPSBzZWxPYmouZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gYWxsIHRoZSBhdHRyaWJ1dGVzIGFzIGtleS9uYW1lIHBhaXJzIGluIHRoZSBwcm9wZXJ0aWVzIGRpY3Rpb25hcnlcclxuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJ3aWR0aFwiXSA9IHBhcnNlRmxvYXQoc2VsT2JqLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSkgfHwgMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJoZWlnaHRcIl0gPSBwYXJzZUZsb2F0KHNlbE9iai5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJ4XCJdID0gcGFyc2VGbG9hdChzZWxPYmouZ2V0QXR0cmlidXRlKCd4JykpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RQcm9wW1wieVwiXSA9IHBhcnNlRmxvYXQoc2VsT2JqLmdldEF0dHJpYnV0ZSgneScpKSB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJyb3RhdGlvblwiXSA9IHBhcnNlRmxvYXQoc2VsT2JqLmdldEF0dHJpYnV0ZSgncm90YXRpb24nKSkgfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0eUxpc3Qoc2VsT2JqLCBvYmplY3RQcm9wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2aXNpYmxlXHJcbiAgICAgICAgICAgICAgICBsZXQgdmlzaWJsZUF0dHIgPSBzZWxPYmouZ2V0QXR0cmlidXRlKCd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBvYmplY3RQcm9wWyd2aXNpYmxlJ10gPSAhKHZpc2libGVBdHRyICYmIHBhcnNlSW50KHZpc2libGVBdHRyKSA9PT0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGV4dFxyXG4gICAgICAgICAgICAgICAgbGV0IHRleHRzID0gc2VsT2JqLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dHMgJiYgdGV4dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gdGV4dHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsndHlwZSddID0gY2MuVGlsZWRNYXAuVE1YT2JqZWN0VHlwZS5URVhUO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3dyYXAnXSA9IHRleHQuZ2V0QXR0cmlidXRlKCd3cmFwJykgPT0gJzEnO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ2NvbG9yJ10gPSBzdHJUb0NvbG9yKHRleHQuZ2V0QXR0cmlidXRlKCdjb2xvcicpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWydoYWxpZ24nXSA9IHN0clRvSEFsaWduKHRleHQuZ2V0QXR0cmlidXRlKCdoYWxpZ24nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsndmFsaWduJ10gPSBzdHJUb1ZBbGlnbih0ZXh0LmdldEF0dHJpYnV0ZSgndmFsaWduJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3BpeGVsc2l6ZSddID0gcGFyc2VJbnQodGV4dC5nZXRBdHRyaWJ1dGUoJ3BpeGVsc2l6ZScpKSB8fCAxNjtcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wWyd0ZXh0J10gPSB0ZXh0LmNoaWxkTm9kZXNbMF0ubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGltYWdlXHJcbiAgICAgICAgICAgICAgICBsZXQgZ2lkID0gc2VsT2JqLmdldEF0dHJpYnV0ZSgnZ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsnZ2lkJ10gPSBwYXJzZUludChnaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuSU1BR0U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZWxsaXBzZVxyXG4gICAgICAgICAgICAgICAgbGV0IGVsbGlwc2UgPSBzZWxPYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2VsbGlwc2UnKTtcclxuICAgICAgICAgICAgICAgIGlmIChlbGxpcHNlICYmIGVsbGlwc2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuRUxMSVBTRTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3BvbHlnb25cclxuICAgICAgICAgICAgICAgIGxldCBwb2x5Z29uUHJvcHMgPSBzZWxPYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwb2x5Z29uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvbHlnb25Qcm9wcyAmJiBwb2x5Z29uUHJvcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuUE9MWUdPTjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsUGdQb2ludFN0ciA9IHBvbHlnb25Qcm9wc1swXS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxQZ1BvaW50U3RyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RQcm9wW1wicG9pbnRzXCJdID0gdGhpcy5fcGFyc2VQb2ludHNTdHJpbmcoc2VsUGdQb2ludFN0cik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9wb2x5bGluZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBvbHlsaW5lUHJvcHMgPSBzZWxPYmouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwb2x5bGluZVwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwb2x5bGluZVByb3BzICYmIHBvbHlsaW5lUHJvcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbJ3R5cGUnXSA9IGNjLlRpbGVkTWFwLlRNWE9iamVjdFR5cGUuUE9MWUxJTkU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbFBsUG9pbnRTdHIgPSBwb2x5bGluZVByb3BzWzBdLmdldEF0dHJpYnV0ZSgncG9pbnRzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbFBsUG9pbnRTdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdFByb3BbXCJwb2x5bGluZVBvaW50c1wiXSA9IHRoaXMuX3BhcnNlUG9pbnRzU3RyaW5nKHNlbFBsUG9pbnRTdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb2JqZWN0UHJvcFsndHlwZSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0UHJvcFsndHlwZSddID0gY2MuVGlsZWRNYXAuVE1YT2JqZWN0VHlwZS5SRUNUO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBvYmplY3RHcm91cFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0R3JvdXAuX29iamVjdHMucHVzaChvYmplY3RQcm9wKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRyYXdvcmRlciAhPT0gJ2luZGV4Jykge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0R3JvdXAuX29iamVjdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnkgLSBiLnk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqZWN0R3JvdXA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wYXJzZVBvaW50c1N0cmluZyAocG9pbnRzU3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCFwb2ludHNTdHJpbmcpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBsZXQgcG9pbnRzID0gW107XHJcbiAgICAgICAgbGV0IHBvaW50c1N0ciA9IHBvaW50c1N0cmluZy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzU3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxQb2ludFN0ciA9IHBvaW50c1N0cltpXS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7J3gnOiBwYXJzZUZsb2F0KHNlbFBvaW50U3RyWzBdKSwgJ3knOiBwYXJzZUZsb2F0KHNlbFBvaW50U3RyWzFdKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9pbnRzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIHRpbGUgYW5pbWF0aW9ucy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgc2V0VGlsZUFuaW1hdGlvbnMgKGFuaW1hdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl90aWxlQW5pbWF0aW9ucyA9IGFuaW1hdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdGlsZSBhbmltYXRpb25zLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRUaWxlQW5pbWF0aW9ucyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbGVBbmltYXRpb25zO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRpbGUgcHJvcGVydGllcy5cclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0VGlsZVByb3BlcnRpZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90aWxlUHJvcGVydGllcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRpbGUgcHJvcGVydGllcy5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0aWxlUHJvcGVydGllc1xyXG4gICAgICovXHJcbiAgICBzZXRUaWxlUHJvcGVydGllcyAodGlsZVByb3BlcnRpZXMpIHtcclxuICAgICAgICB0aGlzLl90aWxlUHJvcGVydGllcyA9IHRpbGVQcm9wZXJ0aWVzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnRTdHJpbmdcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VycmVudFN0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFN0cmluZztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnRTdHJpbmdcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXJyZW50U3RyaW5nXHJcbiAgICAgKi9cclxuICAgIHNldEN1cnJlbnRTdHJpbmcgKGN1cnJlbnRTdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdHJpbmcgPSBjdXJyZW50U3RyaW5nO1xyXG4gICAgfVxyXG59O1xyXG5cclxubGV0IF9wID0gY2MuVE1YTWFwSW5mby5wcm90b3R5cGU7XHJcblxyXG4vLyBFeHRlbmRlZCBwcm9wZXJ0aWVzXHJcbmpzLmdldHNldChfcCwgXCJtYXBXaWR0aFwiLCBfcC5fZ2V0TWFwV2lkdGgsIF9wLl9zZXRNYXBXaWR0aCk7XHJcbmpzLmdldHNldChfcCwgXCJtYXBIZWlnaHRcIiwgX3AuX2dldE1hcEhlaWdodCwgX3AuX3NldE1hcEhlaWdodCk7XHJcbmpzLmdldHNldChfcCwgXCJ0aWxlV2lkdGhcIiwgX3AuX2dldFRpbGVXaWR0aCwgX3AuX3NldFRpbGVXaWR0aCk7XHJcbmpzLmdldHNldChfcCwgXCJ0aWxlSGVpZ2h0XCIsIF9wLl9nZXRUaWxlSGVpZ2h0LCBfcC5fc2V0VGlsZUhlaWdodCk7XHJcblxyXG4vKipcclxuICogQHByb3BlcnR5IEFUVFJJQl9OT05FXHJcbiAqIEBjb25zdGFudFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBkZWZhdWx0IDFcclxuICovXHJcbmNjLlRNWExheWVySW5mby5BVFRSSUJfTk9ORSA9IDEgPDwgMDtcclxuLyoqXHJcbiAqIEBwcm9wZXJ0eSBBVFRSSUJfQkFTRTY0XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBkZWZhdWx0IDJcclxuICovXHJcbmNjLlRNWExheWVySW5mby5BVFRSSUJfQkFTRTY0ID0gMSA8PCAxO1xyXG4vKipcclxuICogQHByb3BlcnR5IEFUVFJJQl9HWklQXHJcbiAqIEBjb25zdGFudFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBkZWZhdWx0IDRcclxuICovXHJcbmNjLlRNWExheWVySW5mby5BVFRSSUJfR1pJUCA9IDEgPDwgMjtcclxuLyoqXHJcbiAqIEBwcm9wZXJ0eSBBVFRSSUJfWkxJQlxyXG4gKiBAY29uc3RhbnRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAZGVmYXVsdCA4XHJcbiAqL1xyXG5jYy5UTVhMYXllckluZm8uQVRUUklCX1pMSUIgPSAxIDw8IDM7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9