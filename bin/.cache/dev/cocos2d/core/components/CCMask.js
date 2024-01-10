
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCMask.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _mat = _interopRequireDefault(require("../value-types/mat4"));

var _vec = _interopRequireDefault(require("../value-types/vec2"));

var _materialVariant = _interopRequireDefault(require("../assets/material/material-variant"));

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
var misc = require('../utils/misc');

var RenderComponent = require('./CCRenderComponent');

var RenderFlow = require('../renderer/render-flow');

var Graphics = require('../graphics/graphics');

var _vec2_temp = new _vec["default"]();

var _mat4_temp = new _mat["default"]();

var _circlepoints = [];

function _calculateCircle(center, radius, segements) {
  _circlepoints.length = 0;
  var anglePerStep = Math.PI * 2 / segements;

  for (var step = 0; step < segements; ++step) {
    _circlepoints.push(cc.v2(radius.x * Math.cos(anglePerStep * step) + center.x, radius.y * Math.sin(anglePerStep * step) + center.y));
  }

  return _circlepoints;
}
/**
 * !#en the type for mask.
 * !#zh 遮罩组件类型
 * @enum Mask.Type
 */


var MaskType = cc.Enum({
  /**
   * !#en Rect mask.
   * !#zh 使用矩形作为遮罩
   * @property {Number} RECT
   */
  RECT: 0,

  /**
   * !#en Ellipse Mask.
   * !#zh 使用椭圆作为遮罩
   * @property {Number} ELLIPSE
   */
  ELLIPSE: 1,

  /**
   * !#en Image Stencil Mask.
   * !#zh 使用图像模版作为遮罩
   * @property {Number} IMAGE_STENCIL
   */
  IMAGE_STENCIL: 2
});
var SEGEMENTS_MIN = 3;
var SEGEMENTS_MAX = 10000;
/**
 * !#en The Mask Component
 * !#zh 遮罩组件
 * @class Mask
 * @extends RenderComponent
 */

var Mask = cc.Class({
  name: 'cc.Mask',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Mask',
    help: 'i18n:COMPONENT.help_url.mask',
    inspector: 'packages://inspector/inspectors/comps/mask.js'
  },
  ctor: function ctor() {
    this._graphics = null;
    this._enableMaterial = null;
    this._exitMaterial = null;
    this._clearMaterial = null;
  },
  properties: {
    _spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },

    /**
     * !#en The mask type.
     * !#zh 遮罩类型
     * @property type
     * @type {Mask.Type}
     * @example
     * mask.type = cc.Mask.Type.RECT;
     */
    _type: MaskType.RECT,
    type: {
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        if (this._type !== value) {
          this._resetAssembler();
        }

        this._type = value;

        if (this._type !== MaskType.IMAGE_STENCIL) {
          this.spriteFrame = null;
          this.alphaThreshold = 0;

          this._updateGraphics();
        }

        this._activateMaterial();
      },
      type: MaskType,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.type'
    },

    /**
     * !#en The mask image
     * !#zh 遮罩所需要的贴图
     * @property spriteFrame
     * @type {SpriteFrame}
     * @default null
     * @example
     * mask.spriteFrame = newSpriteFrame;
     */
    spriteFrame: {
      type: cc.SpriteFrame,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.spriteFrame',
      get: function get() {
        return this._spriteFrame;
      },
      set: function set(value) {
        var lastSprite = this._spriteFrame;

        if (CC_EDITOR) {
          if ((lastSprite && lastSprite._uuid) === (value && value._uuid)) {
            return;
          }
        } else {
          if (lastSprite === value) {
            return;
          }
        }

        this._spriteFrame = value;
        this.setVertsDirty();

        this._updateMaterial();
      }
    },

    /**
     * !#en
     * The alpha threshold.(Not supported Canvas Mode) <br/>
     * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold. <br/>
     * Should be a float between 0 and 1. <br/>
     * This default to 0.1.
     * When it's set to 1, the stencil will discard all pixels, nothing will be shown.
     * !#zh
     * Alpha 阈值（不支持 Canvas 模式）<br/>
     * 只有当模板的像素的 alpha 大于等于 alphaThreshold 时，才会绘制内容。<br/>
     * 该数值 0 ~ 1 之间的浮点数，默认值为 0.1
     * 当被设置为 1 时，会丢弃所有蒙版像素，所以不会显示任何内容
     * @property alphaThreshold
     * @type {Number}
     * @default 0.1
     */
    alphaThreshold: {
      "default": 0.1,
      type: cc.Float,
      range: [0, 1, 0.1],
      slide: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.alphaThreshold',
      notify: function notify() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          cc.warnID(4201);
          return;
        }

        this._updateMaterial();
      }
    },

    /**
     * !#en Reverse mask (Not supported Canvas Mode)
     * !#zh 反向遮罩（不支持 Canvas 模式）
     * @property inverted
     * @type {Boolean}
     * @default false
     */
    inverted: {
      "default": false,
      type: cc.Boolean,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.inverted',
      notify: function notify() {
        if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
          cc.warnID(4202);
        }
      }
    },

    /**
     * TODO: remove segments, not supported by graphics
     * !#en The segements for ellipse mask.
     * !#zh 椭圆遮罩的曲线细分数
     * @property segements
     * @type {Number}
     * @default 64
     */
    _segments: 64,
    segements: {
      get: function get() {
        return this._segments;
      },
      set: function set(value) {
        this._segments = misc.clampf(value, SEGEMENTS_MIN, SEGEMENTS_MAX);

        this._updateGraphics();
      },
      type: cc.Integer,
      tooltip: CC_DEV && 'i18n:COMPONENT.mask.segements'
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    }
  },
  statics: {
    Type: MaskType
  },
  onRestore: function onRestore() {
    this._activateMaterial();
  },
  onEnable: function onEnable() {
    this._super();

    if (this._type !== MaskType.IMAGE_STENCIL) {
      this._updateGraphics();
    }

    this.node.on(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.POSITION_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.ROTATION_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.SCALE_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateGraphics, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this._updateGraphics, this);
    this.node._renderFlag &= ~RenderFlow.FLAG_POST_RENDER;
  },
  onDestroy: function onDestroy() {
    this._super();

    this._removeGraphics();
  },
  _resizeNodeToTargetNode: CC_EDITOR && function () {
    if (this.spriteFrame) {
      var rect = this.spriteFrame.getRect();
      this.node.setContentSize(rect.width, rect.height);
    }
  },
  _validateRender: function _validateRender() {
    if (this._type !== MaskType.IMAGE_STENCIL) return;
    var spriteFrame = this._spriteFrame;

    if (spriteFrame && spriteFrame.textureLoaded()) {
      return;
    }

    this.disableRender();
  },
  _activateMaterial: function _activateMaterial() {
    this._createGraphics(); // Init material


    var material = this._materials[0];

    if (!material) {
      material = _materialVariant["default"].createWithBuiltin('2d-sprite', this);
    } else {
      material = _materialVariant["default"].create(material, this);
    }

    material.define('USE_ALPHA_TEST', true); // Reset material

    if (this._type === MaskType.IMAGE_STENCIL) {
      material.define('CC_USE_MODEL', false);
      material.define('USE_TEXTURE', true);
    } else {
      material.define('CC_USE_MODEL', true);
      material.define('USE_TEXTURE', false);
    }

    if (!this._enableMaterial) {
      this._enableMaterial = _materialVariant["default"].createWithBuiltin('2d-sprite', this);
    }

    if (!this._exitMaterial) {
      this._exitMaterial = _materialVariant["default"].createWithBuiltin('2d-sprite', this);

      this._exitMaterial.setStencilEnabled(_gfx["default"].STENCIL_DISABLE);
    }

    if (!this._clearMaterial) {
      this._clearMaterial = _materialVariant["default"].createWithBuiltin('clear-stencil', this);
    }

    this.setMaterial(0, material);
    this._graphics._materials[0] = material;

    this._updateMaterial();
  },
  _updateMaterial: function _updateMaterial() {
    var material = this._materials[0];
    if (!material) return;

    if (this._type === MaskType.IMAGE_STENCIL && this.spriteFrame) {
      var texture = this.spriteFrame.getTexture();
      material.setProperty('texture', texture);
    }

    material.setProperty('alphaThreshold', this.alphaThreshold);
  },
  _createGraphics: function _createGraphics() {
    if (!this._graphics) {
      this._graphics = new Graphics();
      cc.Assembler.init(this._graphics);
      this._graphics.node = this.node;
      this._graphics.lineWidth = 0;
      this._graphics.strokeColor = cc.color(0, 0, 0, 0);
    }
  },
  _updateGraphics: function _updateGraphics() {
    if (!this.enabledInHierarchy) return;
    var node = this.node;
    var graphics = this._graphics; // Share render data with graphics content

    graphics.clear(false);
    var width = node._contentSize.width;
    var height = node._contentSize.height;
    var x = -width * node._anchorPoint.x;
    var y = -height * node._anchorPoint.y;

    if (this._type === MaskType.RECT) {
      graphics.rect(x, y, width, height);
    } else if (this._type === MaskType.ELLIPSE) {
      var center = cc.v2(x + width / 2, y + height / 2);
      var radius = {
        x: width / 2,
        y: height / 2
      };

      var points = _calculateCircle(center, radius, this._segments);

      for (var i = 0; i < points.length; ++i) {
        var point = points[i];

        if (i === 0) {
          graphics.moveTo(point.x, point.y);
        } else {
          graphics.lineTo(point.x, point.y);
        }
      }

      graphics.close();
    }

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
      graphics.stroke();
    } else {
      graphics.fill();
    }
  },
  _removeGraphics: function _removeGraphics() {
    if (this._graphics) {
      this._graphics.destroy();

      this._graphics._destroyImmediate(); // FIX: cocos-creator/2d-tasks#2511. TODO: cocos-creator/2d-tasks#2516


      this._graphics = null;
    }
  },
  _hitTest: function _hitTest(cameraPt) {
    var node = this.node;
    var size = node.getContentSize(),
        w = size.width,
        h = size.height,
        testPt = _vec2_temp;

    node._updateWorldMatrix(); // If scale is 0, it can't be hit.


    if (!_mat["default"].invert(_mat4_temp, node._worldMatrix)) {
      return false;
    }

    _vec["default"].transformMat4(testPt, cameraPt, _mat4_temp);

    testPt.x += node._anchorPoint.x * w;
    testPt.y += node._anchorPoint.y * h;
    var result = false;

    if (this.type === MaskType.RECT || this.type === MaskType.IMAGE_STENCIL) {
      result = testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h;
    } else if (this.type === MaskType.ELLIPSE) {
      var rx = w / 2,
          ry = h / 2;
      var px = testPt.x - 0.5 * w,
          py = testPt.y - 0.5 * h;
      result = px * px / (rx * rx) + py * py / (ry * ry) < 1;
    }

    if (this.inverted) {
      result = !result;
    }

    return result;
  },
  markForRender: function markForRender(enable) {
    var flag = RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA | RenderFlow.FLAG_POST_RENDER;

    if (enable) {
      this.node._renderFlag |= flag;
      this.markForValidate();
    } else if (!enable) {
      this.node._renderFlag &= ~flag;
    }
  },
  disableRender: function disableRender() {
    this.node._renderFlag &= ~(RenderFlow.FLAG_RENDER | RenderFlow.FLAG_UPDATE_RENDER_DATA | RenderFlow.FLAG_POST_RENDER);
  }
});
cc.Mask = module.exports = Mask;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTWFzay5qcyJdLCJuYW1lcyI6WyJtaXNjIiwicmVxdWlyZSIsIlJlbmRlckNvbXBvbmVudCIsIlJlbmRlckZsb3ciLCJHcmFwaGljcyIsIl92ZWMyX3RlbXAiLCJWZWMyIiwiX21hdDRfdGVtcCIsIk1hdDQiLCJfY2lyY2xlcG9pbnRzIiwiX2NhbGN1bGF0ZUNpcmNsZSIsImNlbnRlciIsInJhZGl1cyIsInNlZ2VtZW50cyIsImxlbmd0aCIsImFuZ2xlUGVyU3RlcCIsIk1hdGgiLCJQSSIsInN0ZXAiLCJwdXNoIiwiY2MiLCJ2MiIsIngiLCJjb3MiLCJ5Iiwic2luIiwiTWFza1R5cGUiLCJFbnVtIiwiUkVDVCIsIkVMTElQU0UiLCJJTUFHRV9TVEVOQ0lMIiwiU0VHRU1FTlRTX01JTiIsIlNFR0VNRU5UU19NQVgiLCJNYXNrIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJjdG9yIiwiX2dyYXBoaWNzIiwiX2VuYWJsZU1hdGVyaWFsIiwiX2V4aXRNYXRlcmlhbCIsIl9jbGVhck1hdGVyaWFsIiwicHJvcGVydGllcyIsIl9zcHJpdGVGcmFtZSIsInR5cGUiLCJTcHJpdGVGcmFtZSIsIl90eXBlIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfcmVzZXRBc3NlbWJsZXIiLCJzcHJpdGVGcmFtZSIsImFscGhhVGhyZXNob2xkIiwiX3VwZGF0ZUdyYXBoaWNzIiwiX2FjdGl2YXRlTWF0ZXJpYWwiLCJ0b29sdGlwIiwiQ0NfREVWIiwibGFzdFNwcml0ZSIsIl91dWlkIiwic2V0VmVydHNEaXJ0eSIsIl91cGRhdGVNYXRlcmlhbCIsIkZsb2F0IiwicmFuZ2UiLCJzbGlkZSIsIm5vdGlmeSIsImdhbWUiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwid2FybklEIiwiaW52ZXJ0ZWQiLCJCb29sZWFuIiwiX3NlZ21lbnRzIiwiY2xhbXBmIiwiSW50ZWdlciIsIl9yZXNpemVUb1RhcmdldCIsImFuaW1hdGFibGUiLCJfcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZSIsInN0YXRpY3MiLCJUeXBlIiwib25SZXN0b3JlIiwib25FbmFibGUiLCJfc3VwZXIiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiUE9TSVRJT05fQ0hBTkdFRCIsIlJPVEFUSU9OX0NIQU5HRUQiLCJTQ0FMRV9DSEFOR0VEIiwiU0laRV9DSEFOR0VEIiwiQU5DSE9SX0NIQU5HRUQiLCJvbkRpc2FibGUiLCJvZmYiLCJfcmVuZGVyRmxhZyIsIkZMQUdfUE9TVF9SRU5ERVIiLCJvbkRlc3Ryb3kiLCJfcmVtb3ZlR3JhcGhpY3MiLCJyZWN0IiwiZ2V0UmVjdCIsInNldENvbnRlbnRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJfdmFsaWRhdGVSZW5kZXIiLCJ0ZXh0dXJlTG9hZGVkIiwiZGlzYWJsZVJlbmRlciIsIl9jcmVhdGVHcmFwaGljcyIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsIk1hdGVyaWFsVmFyaWFudCIsImNyZWF0ZVdpdGhCdWlsdGluIiwiY3JlYXRlIiwiZGVmaW5lIiwic2V0U3RlbmNpbEVuYWJsZWQiLCJnZngiLCJTVEVOQ0lMX0RJU0FCTEUiLCJzZXRNYXRlcmlhbCIsInRleHR1cmUiLCJnZXRUZXh0dXJlIiwic2V0UHJvcGVydHkiLCJBc3NlbWJsZXIiLCJpbml0IiwibGluZVdpZHRoIiwic3Ryb2tlQ29sb3IiLCJjb2xvciIsImVuYWJsZWRJbkhpZXJhcmNoeSIsImdyYXBoaWNzIiwiY2xlYXIiLCJfY29udGVudFNpemUiLCJfYW5jaG9yUG9pbnQiLCJwb2ludHMiLCJpIiwicG9pbnQiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZSIsInN0cm9rZSIsImZpbGwiLCJkZXN0cm95IiwiX2Rlc3Ryb3lJbW1lZGlhdGUiLCJfaGl0VGVzdCIsImNhbWVyYVB0Iiwic2l6ZSIsImdldENvbnRlbnRTaXplIiwidyIsImgiLCJ0ZXN0UHQiLCJfdXBkYXRlV29ybGRNYXRyaXgiLCJpbnZlcnQiLCJfd29ybGRNYXRyaXgiLCJ0cmFuc2Zvcm1NYXQ0IiwicmVzdWx0IiwicngiLCJyeSIsInB4IiwicHkiLCJtYXJrRm9yUmVuZGVyIiwiZW5hYmxlIiwiZmxhZyIsIkZMQUdfUkVOREVSIiwiRkxBR19VUERBVEVfUkVOREVSX0RBVEEiLCJtYXJrRm9yVmFsaWRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBMEJBOztBQU9BOztBQUNBOztBQUNBOzs7O0FBbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUFwQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUEvQjs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyx5QkFBRCxDQUExQjs7QUFDQSxJQUFNRyxRQUFRLEdBQUdILE9BQU8sQ0FBQyxzQkFBRCxDQUF4Qjs7QUFNQSxJQUFJSSxVQUFVLEdBQUcsSUFBSUMsZUFBSixFQUFqQjs7QUFDQSxJQUFJQyxVQUFVLEdBQUcsSUFBSUMsZUFBSixFQUFqQjs7QUFFQSxJQUFJQyxhQUFhLEdBQUUsRUFBbkI7O0FBQ0EsU0FBU0MsZ0JBQVQsQ0FBMkJDLE1BQTNCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsU0FBM0MsRUFBc0Q7QUFDbERKLEVBQUFBLGFBQWEsQ0FBQ0ssTUFBZCxHQUF1QixDQUF2QjtBQUNBLE1BQUlDLFlBQVksR0FBR0MsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBVixHQUFjSixTQUFqQzs7QUFDQSxPQUFLLElBQUlLLElBQUksR0FBRyxDQUFoQixFQUFtQkEsSUFBSSxHQUFHTCxTQUExQixFQUFxQyxFQUFFSyxJQUF2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QUFDZ0ssdUJBQXBDLEdBQ0FoSyxVQUFVLENBQUMrRixnQkFEYixDQUF6QjtBQUVIO0FBL1hlLENBQVQsQ0FBWDtBQWtZQTlFLEVBQUUsQ0FBQ2EsSUFBSCxHQUFVb0ksTUFBTSxDQUFDQyxPQUFQLEdBQWlCckksSUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XHJcblxyXG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi4vdXRpbHMvbWlzYycpO1xyXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuL0NDUmVuZGVyQ29tcG9uZW50Jyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xyXG5jb25zdCBHcmFwaGljcyA9IHJlcXVpcmUoJy4uL2dyYXBoaWNzL2dyYXBoaWNzJyk7XHJcblxyXG5pbXBvcnQgTWF0NCBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXQ0JztcclxuaW1wb3J0IFZlYzIgZnJvbSAnLi4vdmFsdWUtdHlwZXMvdmVjMic7XHJcbmltcG9ydCBNYXRlcmlhbFZhcmlhbnQgZnJvbSAnLi4vYXNzZXRzL21hdGVyaWFsL21hdGVyaWFsLXZhcmlhbnQnO1xyXG5cclxubGV0IF92ZWMyX3RlbXAgPSBuZXcgVmVjMigpO1xyXG5sZXQgX21hdDRfdGVtcCA9IG5ldyBNYXQ0KCk7XHJcblxyXG5sZXQgX2NpcmNsZXBvaW50cyA9W107XHJcbmZ1bmN0aW9uIF9jYWxjdWxhdGVDaXJjbGUgKGNlbnRlciwgcmFkaXVzLCBzZWdlbWVudHMpIHtcclxuICAgIF9jaXJjbGVwb2ludHMubGVuZ3RoID0gMDtcclxuICAgIGxldCBhbmdsZVBlclN0ZXAgPSBNYXRoLlBJICogMiAvIHNlZ2VtZW50cztcclxuICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgc2VnZW1lbnRzOyArK3N0ZXApIHtcclxuICAgICAgICBfY2lyY2xlcG9pbnRzLnB1c2goY2MudjIocmFkaXVzLnggKiBNYXRoLmNvcyhhbmdsZVBlclN0ZXAgKiBzdGVwKSArIGNlbnRlci54LFxyXG4gICAgICAgICAgICByYWRpdXMueSAqIE1hdGguc2luKGFuZ2xlUGVyU3RlcCAqIHN0ZXApICsgY2VudGVyLnkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2NpcmNsZXBvaW50cztcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW4gdGhlIHR5cGUgZm9yIG1hc2suXHJcbiAqICEjemgg6YGu572p57uE5Lu257G75Z6LXHJcbiAqIEBlbnVtIE1hc2suVHlwZVxyXG4gKi9cclxubGV0IE1hc2tUeXBlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVjdCBtYXNrLlxyXG4gICAgICogISN6aCDkvb/nlKjnn6nlvaLkvZzkuLrpga7nvalcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSRUNUXHJcbiAgICAgKi9cclxuICAgIFJFQ1Q6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWxsaXBzZSBNYXNrLlxyXG4gICAgICogISN6aCDkvb/nlKjmpK3lnIbkvZzkuLrpga7nvalcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBFTExJUFNFXHJcbiAgICAgKi9cclxuICAgIEVMTElQU0U6IDEsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW1hZ2UgU3RlbmNpbCBNYXNrLlxyXG4gICAgICogISN6aCDkvb/nlKjlm77lg4/mqKHniYjkvZzkuLrpga7nvalcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBJTUFHRV9TVEVOQ0lMXHJcbiAgICAgKi9cclxuICAgIElNQUdFX1NURU5DSUw6IDIsXHJcbn0pO1xyXG5cclxuY29uc3QgU0VHRU1FTlRTX01JTiA9IDM7XHJcbmNvbnN0IFNFR0VNRU5UU19NQVggPSAxMDAwMDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFRoZSBNYXNrIENvbXBvbmVudFxyXG4gKiAhI3poIOmBrue9qee7hOS7tlxyXG4gKiBAY2xhc3MgTWFza1xyXG4gKiBAZXh0ZW5kcyBSZW5kZXJDb21wb25lbnRcclxuICovXHJcbmxldCBNYXNrID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLk1hc2snLFxyXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9NYXNrJyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwubWFzaycsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9tYXNrLmpzJ1xyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9ncmFwaGljcyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX2VuYWJsZU1hdGVyaWFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9leGl0TWF0ZXJpYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NsZWFyTWF0ZXJpYWwgPSBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX3Nwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgbWFzayB0eXBlLlxyXG4gICAgICAgICAqICEjemgg6YGu572p57G75Z6LXHJcbiAgICAgICAgICogQHByb3BlcnR5IHR5cGVcclxuICAgICAgICAgKiBAdHlwZSB7TWFzay5UeXBlfVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogbWFzay50eXBlID0gY2MuTWFzay5UeXBlLlJFQ1Q7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3R5cGU6IE1hc2tUeXBlLlJFQ1QsXHJcbiAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90eXBlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSAhPT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxwaGFUaHJlc2hvbGQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHlwZTogTWFza1R5cGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubWFzay50eXBlJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBtYXNrIGltYWdlXHJcbiAgICAgICAgICogISN6aCDpga7nvanmiYDpnIDopoHnmoTotLTlm75cclxuICAgICAgICAgKiBAcHJvcGVydHkgc3ByaXRlRnJhbWVcclxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlRnJhbWV9XHJcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogbWFzay5zcHJpdGVGcmFtZSA9IG5ld1Nwcml0ZUZyYW1lO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNwcml0ZUZyYW1lOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm1hc2suc3ByaXRlRnJhbWUnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0U3ByaXRlID0gdGhpcy5fc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChsYXN0U3ByaXRlICYmIGxhc3RTcHJpdGUuX3V1aWQpID09PSAodmFsdWUgJiYgdmFsdWUuX3V1aWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFNwcml0ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZUZyYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGFscGhhIHRocmVzaG9sZC4oTm90IHN1cHBvcnRlZCBDYW52YXMgTW9kZSkgPGJyLz5cclxuICAgICAgICAgKiBUaGUgY29udGVudCBpcyBkcmF3biBvbmx5IHdoZXJlIHRoZSBzdGVuY2lsIGhhdmUgcGl4ZWwgd2l0aCBhbHBoYSBncmVhdGVyIHRoYW4gdGhlIGFscGhhVGhyZXNob2xkLiA8YnIvPlxyXG4gICAgICAgICAqIFNob3VsZCBiZSBhIGZsb2F0IGJldHdlZW4gMCBhbmQgMS4gPGJyLz5cclxuICAgICAgICAgKiBUaGlzIGRlZmF1bHQgdG8gMC4xLlxyXG4gICAgICAgICAqIFdoZW4gaXQncyBzZXQgdG8gMSwgdGhlIHN0ZW5jaWwgd2lsbCBkaXNjYXJkIGFsbCBwaXhlbHMsIG5vdGhpbmcgd2lsbCBiZSBzaG93bi5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICogQWxwaGEg6ZiI5YC877yI5LiN5pSv5oyBIENhbnZhcyDmqKHlvI/vvIk8YnIvPlxyXG4gICAgICAgICAqIOWPquacieW9k+aooeadv+eahOWDj+e0oOeahCBhbHBoYSDlpKfkuo7nrYnkuo4gYWxwaGFUaHJlc2hvbGQg5pe277yM5omN5Lya57uY5Yi25YaF5a6544CCPGJyLz5cclxuICAgICAgICAgKiDor6XmlbDlgLwgMCB+IDEg5LmL6Ze055qE5rWu54K55pWw77yM6buY6K6k5YC85Li6IDAuMVxyXG4gICAgICAgICAqIOW9k+iiq+iuvue9ruS4uiAxIOaXtu+8jOS8muS4ouW8g+aJgOacieiSmeeJiOWDj+e0oO+8jOaJgOS7peS4jeS8muaYvuekuuS7u+S9leWGheWuuVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbHBoYVRocmVzaG9sZFxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGRlZmF1bHQgMC4xXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWxwaGFUaHJlc2hvbGQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMC4xLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcclxuICAgICAgICAgICAgcmFuZ2U6IFswLCAxLCAwLjFdLFxyXG4gICAgICAgICAgICBzbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5tYXNrLmFscGhhVGhyZXNob2xkJyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg0MjAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBSZXZlcnNlIG1hc2sgKE5vdCBzdXBwb3J0ZWQgQ2FudmFzIE1vZGUpXHJcbiAgICAgICAgICogISN6aCDlj43lkJHpga7nvanvvIjkuI3mlK/mjIEgQ2FudmFzIOaooeW8j++8iVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnZlcnRlZFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW52ZXJ0ZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubWFzay5pbnZlcnRlZCcsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoNDIwMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUT0RPOiByZW1vdmUgc2VnbWVudHMsIG5vdCBzdXBwb3J0ZWQgYnkgZ3JhcGhpY3NcclxuICAgICAgICAgKiAhI2VuIFRoZSBzZWdlbWVudHMgZm9yIGVsbGlwc2UgbWFzay5cclxuICAgICAgICAgKiAhI3poIOakreWchumBrue9qeeahOabsue6v+e7huWIhuaVsFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzZWdlbWVudHNcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDY0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX3NlZ21lbnRzOiA2NCxcclxuICAgICAgICBzZWdlbWVudHM6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2VnbWVudHM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWdtZW50cyA9IG1pc2MuY2xhbXBmKHZhbHVlLCBTRUdFTUVOVFNfTUlOLCBTRUdFTUVOVFNfTUFYKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubWFzay5zZWdlbWVudHMnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZXNpemVUb1RhcmdldDoge1xyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgVHlwZTogTWFza1R5cGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uUmVzdG9yZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVNYXRlcmlhbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5fdHlwZSAhPT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVHcmFwaGljcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUdyYXBoaWNzLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl91cGRhdGVHcmFwaGljcywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlR3JhcGhpY3MsIHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+UmVuZGVyRmxvdy5GTEFHX1BPU1RfUkVOREVSO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3kgKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlR3JhcGhpY3MoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3Jlc2l6ZU5vZGVUb1RhcmdldE5vZGU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuc3ByaXRlRnJhbWUuZ2V0UmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHlwZSAhPT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcclxuICAgICAgICBpZiAoc3ByaXRlRnJhbWUgJiYgXHJcbiAgICAgICAgICAgIHNwcml0ZUZyYW1lLnRleHR1cmVMb2FkZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FjdGl2YXRlTWF0ZXJpYWwgKCkge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUdyYXBoaWNzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW5pdCBtYXRlcmlhbFxyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcclxuICAgICAgICBpZiAoIW1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCcyZC1zcHJpdGUnLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZShtYXRlcmlhbCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9BTFBIQV9URVNUJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IG1hdGVyaWFsXHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IE1hc2tUeXBlLklNQUdFX1NURU5DSUwpIHtcclxuICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdDQ19VU0VfTU9ERUwnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnVVNFX1RFWFRVUkUnLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnVVNFX1RFWFRVUkUnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZU1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZU1hdGVyaWFsID0gTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluKCcyZC1zcHJpdGUnLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAoIXRoaXMuX2V4aXRNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9leGl0TWF0ZXJpYWwgPSBNYXRlcmlhbFZhcmlhbnQuY3JlYXRlV2l0aEJ1aWx0aW4oJzJkLXNwcml0ZScsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9leGl0TWF0ZXJpYWwuc2V0U3RlbmNpbEVuYWJsZWQoZ2Z4LlNURU5DSUxfRElTQUJMRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2NsZWFyTWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYXJNYXRlcmlhbCA9IE1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbignY2xlYXItc3RlbmNpbCcsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2dyYXBoaWNzLl9tYXRlcmlhbHNbMF0gPSBtYXRlcmlhbDtcclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTWF0ZXJpYWwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSB0aGlzLl9tYXRlcmlhbHNbMF07XHJcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCAmJiB0aGlzLnNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCd0ZXh0dXJlJywgdGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCdhbHBoYVRocmVzaG9sZCcsIHRoaXMuYWxwaGFUaHJlc2hvbGQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlR3JhcGhpY3MgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZ3JhcGhpY3MpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgY2MuQXNzZW1ibGVyLmluaXQodGhpcy5fZ3JhcGhpY3MpO1xyXG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcy5ub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcy5saW5lV2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUdyYXBoaWNzICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5fZ3JhcGhpY3M7XHJcbiAgICAgICAgLy8gU2hhcmUgcmVuZGVyIGRhdGEgd2l0aCBncmFwaGljcyBjb250ZW50XHJcbiAgICAgICAgZ3JhcGhpY3MuY2xlYXIoZmFsc2UpO1xyXG4gICAgICAgIGxldCB3aWR0aCA9IG5vZGUuX2NvbnRlbnRTaXplLndpZHRoO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBub2RlLl9jb250ZW50U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHggPSAtd2lkdGggKiBub2RlLl9hbmNob3JQb2ludC54O1xyXG4gICAgICAgIGxldCB5ID0gLWhlaWdodCAqIG5vZGUuX2FuY2hvclBvaW50Lnk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IE1hc2tUeXBlLlJFQ1QpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3MucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gTWFza1R5cGUuRUxMSVBTRSkge1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyID0gY2MudjIoeCArIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzID0ge1xyXG4gICAgICAgICAgICAgICAgeDogd2lkdGggLyAyLFxyXG4gICAgICAgICAgICAgICAgeTogaGVpZ2h0IC8gMlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgcG9pbnRzID0gX2NhbGN1bGF0ZUNpcmNsZShjZW50ZXIsIHJhZGl1cywgdGhpcy5fc2VnbWVudHMpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gcG9pbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5tb3ZlVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljcy5saW5lVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JhcGhpY3MuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLmdhbWUucmVuZGVyVHlwZSA9PT0gY2MuZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgZ3JhcGhpY3Muc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBncmFwaGljcy5maWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcmVtb3ZlR3JhcGhpY3MgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9ncmFwaGljcykge1xyXG4gICAgICAgICAgICB0aGlzLl9ncmFwaGljcy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyYXBoaWNzLl9kZXN0cm95SW1tZWRpYXRlKCk7IC8vIEZJWDogY29jb3MtY3JlYXRvci8yZC10YXNrcyMyNTExLiBUT0RPOiBjb2Nvcy1jcmVhdG9yLzJkLXRhc2tzIzI1MTZcclxuICAgICAgICAgICAgdGhpcy5fZ3JhcGhpY3MgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2hpdFRlc3QgKGNhbWVyYVB0KSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgbGV0IHNpemUgPSBub2RlLmdldENvbnRlbnRTaXplKCksXHJcbiAgICAgICAgICAgIHcgPSBzaXplLndpZHRoLFxyXG4gICAgICAgICAgICBoID0gc2l6ZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIHRlc3RQdCA9IF92ZWMyX3RlbXA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbm9kZS5fdXBkYXRlV29ybGRNYXRyaXgoKTtcclxuICAgICAgICAvLyBJZiBzY2FsZSBpcyAwLCBpdCBjYW4ndCBiZSBoaXQuXHJcbiAgICAgICAgaWYgKCFNYXQ0LmludmVydChfbWF0NF90ZW1wLCBub2RlLl93b3JsZE1hdHJpeCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQodGVzdFB0LCBjYW1lcmFQdCwgX21hdDRfdGVtcCk7XHJcbiAgICAgICAgdGVzdFB0LnggKz0gbm9kZS5fYW5jaG9yUG9pbnQueCAqIHc7XHJcbiAgICAgICAgdGVzdFB0LnkgKz0gbm9kZS5fYW5jaG9yUG9pbnQueSAqIGg7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBNYXNrVHlwZS5SRUNUIHx8IHRoaXMudHlwZSA9PT0gTWFza1R5cGUuSU1BR0VfU1RFTkNJTCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0ZXN0UHQueCA+PSAwICYmIHRlc3RQdC55ID49IDAgJiYgdGVzdFB0LnggPD0gdyAmJiB0ZXN0UHQueSA8PSBoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IE1hc2tUeXBlLkVMTElQU0UpIHtcclxuICAgICAgICAgICAgbGV0IHJ4ID0gdyAvIDIsIHJ5ID0gaCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBweCA9IHRlc3RQdC54IC0gMC41ICogdywgcHkgPSB0ZXN0UHQueSAtIDAuNSAqIGg7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHB4ICogcHggLyAocnggKiByeCkgKyBweSAqIHB5IC8gKHJ5ICogcnkpIDwgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWQpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gIXJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0sXHJcblxyXG4gICAgbWFya0ZvclJlbmRlciAoZW5hYmxlKSB7XHJcbiAgICAgICAgbGV0IGZsYWcgPSBSZW5kZXJGbG93LkZMQUdfUkVOREVSIHwgUmVuZGVyRmxvdy5GTEFHX1VQREFURV9SRU5ERVJfREFUQSB8IFJlbmRlckZsb3cuRkxBR19QT1NUX1JFTkRFUjtcclxuICAgICAgICBpZiAoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyB8PSBmbGFnO1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtGb3JWYWxpZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+ZmxhZztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc2FibGVSZW5kZXIgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+KFJlbmRlckZsb3cuRkxBR19SRU5ERVIgfCBSZW5kZXJGbG93LkZMQUdfVVBEQVRFX1JFTkRFUl9EQVRBIHwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVuZGVyRmxvdy5GTEFHX1BPU1RfUkVOREVSKTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuY2MuTWFzayA9IG1vZHVsZS5leHBvcnRzID0gTWFzaztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=