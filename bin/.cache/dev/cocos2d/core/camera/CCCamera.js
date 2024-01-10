
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/camera/CCCamera.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _valueTypes = require("../value-types");

var _geomUtils = require("../geom-utils");

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
var AffineTrans = require('../utils/affine-transform');

var renderer = require('../renderer/index');

var RenderFlow = require('../renderer/render-flow');

var game = require('../CCGame');

var RendererCamera = null;

if (CC_JSB && CC_NATIVERENDERER) {
  RendererCamera = window.renderer.Camera;
} else {
  RendererCamera = require('../../renderer/scene/camera');
}

var _mat4_temp_1 = cc.mat4();

var _mat4_temp_2 = cc.mat4();

var _v3_temp_1 = cc.v3();

var _v3_temp_2 = cc.v3();

var _v3_temp_3 = cc.v3();

var _cameras = []; // unstable array

function updateMainCamera() {
  for (var i = 0, minDepth = Number.MAX_VALUE; i < _cameras.length; i++) {
    var camera = _cameras[i];

    if (camera._depth < minDepth) {
      Camera.main = camera;
      minDepth = camera._depth;
    }
  }
}

var _debugCamera = null;

function repositionDebugCamera() {
  if (!_debugCamera) return;

  var node = _debugCamera.getNode();

  var canvas = cc.game.canvas;
  node.z = canvas.height / 1.1566;
  node.x = canvas.width / 2;
  node.y = canvas.height / 2;
}
/**
 * !#en Values for Camera.clearFlags, determining what to clear when rendering a Camera.
 * !#zh 摄像机清除标记位，决定摄像机渲染时会清除哪些状态
 * @enum Camera.ClearFlags
 */


var ClearFlags = cc.Enum({
  /**
   * !#en
   * Clear the background color.
   * !#zh
   * 清除背景颜色
   * @property COLOR
   */
  COLOR: 1,

  /**
   * !#en
   * Clear the depth buffer.
   * !#zh
   * 清除深度缓冲区
   * @property DEPTH
   */
  DEPTH: 2,

  /**
   * !#en
   * Clear the stencil.
   * !#zh
   * 清除模板缓冲区
   * @property STENCIL
   */
  STENCIL: 4
});
var StageFlags = cc.Enum({
  OPAQUE: 1,
  TRANSPARENT: 2
});
/**
 * !#en
 * Camera is usefull when making reel game or other games which need scroll screen.
 * Using camera will be more efficient than moving node to scroll screen.
 * Camera 
 * !#zh
 * 摄像机在制作卷轴或是其他需要移动屏幕的游戏时比较有用，使用摄像机将会比移动节点来移动屏幕更加高效。
 * @class Camera
 * @extends Component
 */

var Camera = cc.Class({
  name: 'cc.Camera',
  "extends": cc.Component,
  ctor: function ctor() {
    if (game.renderType !== game.RENDER_TYPE_CANVAS) {
      var camera = new RendererCamera();
      camera.setStages(['opaque']);
      camera.dirty = true;
      this._inited = false;
      this._camera = camera;
    } else {
      this._inited = true;
    }
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/Camera',
    inspector: 'packages://inspector/inspectors/comps/camera.js',
    executeInEditMode: true
  },
  properties: {
    _cullingMask: 0xffffffff,
    _clearFlags: ClearFlags.DEPTH | ClearFlags.STENCIL,
    _backgroundColor: cc.color(0, 0, 0, 255),
    _depth: 0,
    _zoomRatio: 1,
    _targetTexture: null,
    _fov: 60,
    _orthoSize: 10,
    _nearClip: 1,
    _farClip: 4096,
    _ortho: true,
    _rect: cc.rect(0, 0, 1, 1),
    _renderStages: 1,
    _alignWithScreen: true,

    /**
     * !#en
     * The camera zoom ratio, only support 2D camera.
     * !#zh
     * 摄像机缩放比率, 只支持 2D camera。
     * @property {Number} zoomRatio
     */
    zoomRatio: {
      get: function get() {
        return this._zoomRatio;
      },
      set: function set(value) {
        this._zoomRatio = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.zoomRatio'
    },

    /**
     * !#en
     * Field of view. The width of the Camera’s view angle, measured in degrees along the local Y axis.
     * !#zh
     * 决定摄像机视角的宽度，当摄像机处于透视投影模式下这个属性才会生效。
     * @property {Number} fov
     * @default 60
     */
    fov: {
      get: function get() {
        return this._fov;
      },
      set: function set(v) {
        this._fov = v;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.fov'
    },

    /**
     * !#en
     * The viewport size of the Camera when set to orthographic projection.
     * !#zh
     * 摄像机在正交投影模式下的视窗大小。
     * @property {Number} orthoSize
     * @default 10
     */
    orthoSize: {
      get: function get() {
        return this._orthoSize;
      },
      set: function set(v) {
        this._orthoSize = v;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.orthoSize'
    },

    /**
     * !#en
     * The near clipping plane.
     * !#zh
     * 摄像机的近剪裁面。
     * @property {Number} nearClip
     * @default 0.1
     */
    nearClip: {
      get: function get() {
        return this._nearClip;
      },
      set: function set(v) {
        this._nearClip = v;

        this._updateClippingpPlanes();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.nearClip'
    },

    /**
     * !#en
     * The far clipping plane.
     * !#zh
     * 摄像机的远剪裁面。
     * @property {Number} farClip
     * @default 4096
     */
    farClip: {
      get: function get() {
        return this._farClip;
      },
      set: function set(v) {
        this._farClip = v;

        this._updateClippingpPlanes();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.farClip'
    },

    /**
     * !#en
     * Is the camera orthographic (true) or perspective (false)?
     * !#zh
     * 设置摄像机的投影模式是正交还是透视模式。
     * @property {Boolean} ortho
     * @default false
     */
    ortho: {
      get: function get() {
        return this._ortho;
      },
      set: function set(v) {
        this._ortho = v;

        this._updateProjection();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.ortho'
    },

    /**
     * !#en
     * Four values (0 ~ 1) that indicate where on the screen this camera view will be drawn.
     * !#zh
     * 决定摄像机绘制在屏幕上哪个位置，值为（0 ~ 1）。
     * @property {Rect} rect
     * @default cc.rect(0,0,1,1)
     */
    rect: {
      get: function get() {
        return this._rect;
      },
      set: function set(v) {
        this._rect = v;

        this._updateRect();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.rect'
    },

    /**
     * !#en
     * This is used to render parts of the scene selectively.
     * !#zh
     * 决定摄像机会渲染场景的哪一部分。
     * @property {Number} cullingMask
     */
    cullingMask: {
      get: function get() {
        return this._cullingMask;
      },
      set: function set(value) {
        this._cullingMask = value;

        this._updateCameraMask();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.cullingMask'
    },

    /**
     * !#en
     * Determining what to clear when camera rendering.
     * !#zh
     * 决定摄像机渲染时会清除哪些状态。
     * @property {Camera.ClearFlags} clearFlags
     */
    clearFlags: {
      get: function get() {
        return this._clearFlags;
      },
      set: function set(value) {
        this._clearFlags = value;

        if (this._camera) {
          this._camera.setClearFlags(value);
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.clearFlags'
    },

    /**
     * !#en
     * The color with which the screen will be cleared.
     * !#zh
     * 摄像机用于清除屏幕的背景色。
     * @property {Color} backgroundColor
     */
    backgroundColor: {
      get: function get() {
        return this._backgroundColor;
      },
      set: function set(value) {
        if (!this._backgroundColor.equals(value)) {
          this._backgroundColor.set(value);

          this._updateBackgroundColor();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.backgroundColor'
    },

    /**
     * !#en
     * Camera's depth in the camera rendering order. Cameras with higher depth are rendered after cameras with lower depth.
     * !#zh
     * 摄像机深度。用于决定摄像机的渲染顺序，值越大渲染在越上层。
     * @property {Number} depth
     */
    depth: {
      get: function get() {
        return this._depth;
      },
      set: function set(value) {
        if (Camera.main === this) {
          if (this._depth < value) {
            updateMainCamera();
          }
        } else if (Camera.main && value < Camera.main._depth && _cameras.includes(this)) {
          Camera.main = this;
        }

        this._depth = value;

        if (this._camera) {
          this._camera.setPriority(value);
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.depth'
    },

    /**
     * !#en
     * Destination render texture.
     * Usually cameras render directly to screen, but for some effects it is useful to make a camera render into a texture.
     * !#zh
     * 摄像机渲染的目标 RenderTexture。
     * 一般摄像机会直接渲染到屏幕上，但是有一些效果可以使用摄像机渲染到 RenderTexture 上再对 RenderTexture 进行处理来实现。
     * @property {RenderTexture} targetTexture
     */
    targetTexture: {
      get: function get() {
        return this._targetTexture;
      },
      set: function set(value) {
        this._targetTexture = value;

        this._updateTargetTexture();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.targetTexture'
    },

    /**
     * !#en
     * Sets the camera's render stages.
     * !#zh
     * 设置摄像机渲染的阶段
     * @property {Number} renderStages
     */
    renderStages: {
      get: function get() {
        return this._renderStages;
      },
      set: function set(val) {
        this._renderStages = val;

        this._updateStages();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.camera.renderStages'
    },

    /**
     * !#en Whether auto align camera viewport to screen
     * !#zh 是否自动将摄像机的视口对准屏幕
     * @property {Boolean} alignWithScreen
     */
    alignWithScreen: {
      get: function get() {
        return this._alignWithScreen;
      },
      set: function set(v) {
        this._alignWithScreen = v;
      }
    },
    _is3D: {
      get: function get() {
        return this.node && this.node._is3DNode;
      }
    }
  },
  statics: {
    /**
     * !#en
     * The primary camera in the scene. Returns the rear most rendered camera, which is the camera with the lowest depth.
     * !#zh
     * 当前场景中激活的主摄像机。将会返回渲染在屏幕最底层，也就是 depth 最小的摄像机。
     * @property {Camera} main
     * @static
     */
    main: null,

    /**
     * !#en
     * All enabled cameras.
     * !#zh
     * 当前激活的所有摄像机。
     * @property {[Camera]} cameras
     * @static
     */
    cameras: _cameras,
    ClearFlags: ClearFlags,

    /**
     * !#en
     * Get the first camera which the node belong to.
     * !#zh
     * 获取节点所在的第一个摄像机。
     * @method findCamera
     * @param {Node} node 
     * @return {Camera}
     * @static
     */
    findCamera: function findCamera(node) {
      for (var i = 0, l = _cameras.length; i < l; i++) {
        var camera = _cameras[i];

        if (camera.containsNode(node)) {
          return camera;
        }
      }

      return null;
    },
    _findRendererCamera: function _findRendererCamera(node) {
      var cameras = renderer.scene._cameras;

      for (var i = 0; i < cameras._count; i++) {
        if (cameras._data[i]._cullingMask & node._cullingMask) {
          return cameras._data[i];
        }
      }

      return null;
    },
    _setupDebugCamera: function _setupDebugCamera() {
      if (_debugCamera) return;
      if (game.renderType === game.RENDER_TYPE_CANVAS) return;
      var camera = new RendererCamera();
      _debugCamera = camera;
      camera.setStages(['opaque']);
      camera.setFov(Math.PI * 60 / 180);
      camera.setNear(0.1);
      camera.setFar(4096);
      camera.dirty = true;
      camera.cullingMask = 1 << cc.Node.BuiltinGroupIndex.DEBUG;
      camera.setPriority(cc.macro.MAX_ZINDEX);
      camera.setClearFlags(0);
      camera.setColor(0, 0, 0, 0);
      var node = new cc.Node();
      camera.setNode(node);
      repositionDebugCamera();
      cc.view.on('design-resolution-changed', repositionDebugCamera);
      renderer.scene.addCamera(camera);
    }
  },
  _updateCameraMask: function _updateCameraMask() {
    if (this._camera) {
      var mask = this._cullingMask & ~(1 << cc.Node.BuiltinGroupIndex.DEBUG);
      this._camera.cullingMask = mask;
    }
  },
  _updateBackgroundColor: function _updateBackgroundColor() {
    if (!this._camera) return;
    var color = this._backgroundColor;

    this._camera.setColor(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
  },
  _updateTargetTexture: function _updateTargetTexture() {
    if (!this._camera) return;
    var texture = this._targetTexture;

    this._camera.setFrameBuffer(texture ? texture._framebuffer : null);
  },
  _updateClippingpPlanes: function _updateClippingpPlanes() {
    if (!this._camera) return;

    this._camera.setNear(this._nearClip);

    this._camera.setFar(this._farClip);
  },
  _updateProjection: function _updateProjection() {
    if (!this._camera) return;
    var type = this._ortho ? 1 : 0;

    this._camera.setType(type);
  },
  _updateRect: function _updateRect() {
    if (!this._camera) return;
    var rect = this._rect;

    this._camera.setRect(rect.x, rect.y, rect.width, rect.height);
  },
  _updateStages: function _updateStages() {
    var flags = this._renderStages;
    var stages = [];

    if (flags & StageFlags.OPAQUE) {
      stages.push('opaque');
    }

    if (flags & StageFlags.TRANSPARENT) {
      stages.push('transparent');
    }

    this._camera.setStages(stages);
  },
  _init: function _init() {
    if (this._inited) return;
    this._inited = true;
    var camera = this._camera;
    if (!camera) return;
    camera.setNode(this.node);
    camera.setClearFlags(this._clearFlags);
    camera.setPriority(this._depth);

    this._updateBackgroundColor();

    this._updateCameraMask();

    this._updateTargetTexture();

    this._updateClippingpPlanes();

    this._updateProjection();

    this._updateStages();

    this._updateRect();

    if (!CC_EDITOR) {
      this.beforeDraw();
    }
  },
  __preload: function __preload() {
    this._init();
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR && game.renderType !== game.RENDER_TYPE_CANVAS) {
      cc.director.on(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
      renderer.scene.addCamera(this._camera);
    }

    _cameras.push(this);

    if (!Camera.main || this._depth < Camera.main._depth) {
      Camera.main = this;
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR && game.renderType !== game.RENDER_TYPE_CANVAS) {
      cc.director.off(cc.Director.EVENT_BEFORE_DRAW, this.beforeDraw, this);
      renderer.scene.removeCamera(this._camera);
    }

    cc.js.array.fastRemove(_cameras, this);

    if (Camera.main === this) {
      Camera.main = null;
      updateMainCamera();
    }
  },

  /**
   * !#en
   * Get the screen to world matrix, only support 2D camera which alignWithScreen is true.
   * !#zh
   * 获取屏幕坐标系到世界坐标系的矩阵，只适用于 alignWithScreen 为 true 的 2D 摄像机。
   * @method getScreenToWorldMatrix2D
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getScreenToWorldMatrix2D: function getScreenToWorldMatrix2D(out) {
    this.getWorldToScreenMatrix2D(out);

    _valueTypes.Mat4.invert(out, out);

    return out;
  },

  /**
   * !#en
   * Get the world to camera matrix, only support 2D camera which alignWithScreen is true.
   * !#zh
   * 获取世界坐标系到摄像机坐标系的矩阵，只适用于 alignWithScreen 为 true 的 2D 摄像机。
   * @method getWorldToScreenMatrix2D
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getWorldToScreenMatrix2D: function getWorldToScreenMatrix2D(out) {
    this.node.getWorldRT(_mat4_temp_1);
    var zoomRatio = this.zoomRatio;
    var _mat4_temp_1m = _mat4_temp_1.m;
    _mat4_temp_1m[0] *= zoomRatio;
    _mat4_temp_1m[1] *= zoomRatio;
    _mat4_temp_1m[4] *= zoomRatio;
    _mat4_temp_1m[5] *= zoomRatio;
    var m12 = _mat4_temp_1m[12];
    var m13 = _mat4_temp_1m[13];
    var center = cc.visibleRect.center;
    _mat4_temp_1m[12] = center.x - (_mat4_temp_1m[0] * m12 + _mat4_temp_1m[4] * m13);
    _mat4_temp_1m[13] = center.y - (_mat4_temp_1m[1] * m12 + _mat4_temp_1m[5] * m13);

    if (out !== _mat4_temp_1) {
      _valueTypes.Mat4.copy(out, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Convert point from screen to world.
   * !#zh
   * 将坐标从屏幕坐标系转换到世界坐标系。
   * @method getScreenToWorldPoint
   * @param {Vec3|Vec2} screenPosition 
   * @param {Vec3|Vec2} [out] 
   * @return {Vec3|Vec2} out
   */
  getScreenToWorldPoint: function getScreenToWorldPoint(screenPosition, out) {
    if (this.node.is3DNode) {
      out = out || new cc.Vec3();

      this._camera.screenToWorld(out, screenPosition, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      out = out || new cc.Vec2();
      this.getScreenToWorldMatrix2D(_mat4_temp_1);

      _valueTypes.Vec2.transformMat4(out, screenPosition, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Convert point from world to screen.
   * !#zh
   * 将坐标从世界坐标系转化到屏幕坐标系。
   * @method getWorldToScreenPoint
   * @param {Vec3|Vec2} worldPosition 
   * @param {Vec3|Vec2} [out] 
   * @return {Vec3|Vec2} out
   */
  getWorldToScreenPoint: function getWorldToScreenPoint(worldPosition, out) {
    if (this.node.is3DNode) {
      out = out || new cc.Vec3();

      this._camera.worldToScreen(out, worldPosition, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      out = out || new cc.Vec2();
      this.getWorldToScreenMatrix2D(_mat4_temp_1);

      _valueTypes.Vec2.transformMat4(out, worldPosition, _mat4_temp_1);
    }

    return out;
  },

  /**
   * !#en
   * Get a ray from screen position
   * !#zh
   * 从屏幕坐标获取一条射线
   * @method getRay
   * @param {Vec2} screenPos
   * @return {Ray}
   */
  getRay: function getRay(screenPos) {
    if (!cc.geomUtils) return screenPos;

    _valueTypes.Vec3.set(_v3_temp_3, screenPos.x, screenPos.y, 1);

    this._camera.screenToWorld(_v3_temp_2, _v3_temp_3, cc.visibleRect.width, cc.visibleRect.height);

    if (this.ortho) {
      _valueTypes.Vec3.set(_v3_temp_3, screenPos.x, screenPos.y, -1);

      this._camera.screenToWorld(_v3_temp_1, _v3_temp_3, cc.visibleRect.width, cc.visibleRect.height);
    } else {
      this.node.getWorldPosition(_v3_temp_1);
    }

    return _geomUtils.Ray.fromPoints(new _geomUtils.Ray(), _v3_temp_1, _v3_temp_2);
  },

  /**
   * !#en
   * Check whether the node is in the camera.
   * !#zh
   * 检测节点是否被此摄像机影响
   * @method containsNode
   * @param {Node} node - the node which need to check
   * @return {Boolean}
   */
  containsNode: function containsNode(node) {
    return (node._cullingMask & this.cullingMask) > 0;
  },

  /**
   * !#en
   * Render the camera manually.
   * !#zh
   * 手动渲染摄像机。
   * @method render
   * @param {Node} [rootNode] 
   */
  render: function render(rootNode) {
    rootNode = rootNode || cc.director.getScene();
    if (!rootNode) return null; // force update node world matrix

    this.node.getWorldMatrix(_mat4_temp_1);
    this.beforeDraw();
    RenderFlow.renderCamera(this._camera, rootNode);
  },
  _onAlignWithScreen: function _onAlignWithScreen() {
    var height = cc.game.canvas.height / cc.view._scaleY;
    var targetTexture = this._targetTexture;

    if (targetTexture) {
      if (CC_EDITOR) {
        height = cc.engine.getDesignResolutionSize().height;
      } else {
        height = cc.visibleRect.height;
      }
    }

    var fov = this._fov * cc.macro.RAD;
    this.node.z = height / (Math.tan(fov / 2) * 2);
    fov = Math.atan(Math.tan(fov / 2) / this.zoomRatio) * 2;

    this._camera.setFov(fov);

    this._camera.setOrthoHeight(height / 2 / this.zoomRatio);

    this.node.setRotation(0, 0, 0, 1);
  },
  beforeDraw: function beforeDraw() {
    if (!this._camera) return;

    if (this._alignWithScreen) {
      this._onAlignWithScreen();
    } else {
      var fov = this._fov * cc.macro.RAD;
      fov = Math.atan(Math.tan(fov / 2) / this.zoomRatio) * 2;

      this._camera.setFov(fov);

      this._camera.setOrthoHeight(this._orthoSize / this.zoomRatio);
    }

    this._camera.dirty = true;
  }
}); // deprecated

cc.js.mixin(Camera.prototype, {
  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the camera's space coordinates.
   * !#zh
   * 返回一个将节点坐标系转换到摄像机坐标系下的矩阵
   * @method getNodeToCameraTransform
   * @deprecated since v2.0.0
   * @param {Node} node - the node which should transform
   * @return {AffineTransform}
   */
  getNodeToCameraTransform: function getNodeToCameraTransform(node) {
    var out = AffineTrans.identity();
    node.getWorldMatrix(_mat4_temp_2);

    if (this.containsNode(node)) {
      this.getWorldToCameraMatrix(_mat4_temp_1);

      _valueTypes.Mat4.mul(_mat4_temp_2, _mat4_temp_2, _mat4_temp_1);
    }

    AffineTrans.fromMat4(out, _mat4_temp_2);
    return out;
  },

  /**
   * !#en
   * Conver a camera coordinates point to world coordinates.
   * !#zh
   * 将一个摄像机坐标系下的点转换到世界坐标系下。
   * @method getCameraToWorldPoint
   * @deprecated since v2.1.3
   * @param {Vec2} point - the point which should transform
   * @param {Vec2} [out] - the point to receive the result
   * @return {Vec2} out
   */
  getCameraToWorldPoint: function getCameraToWorldPoint(point, out) {
    return this.getScreenToWorldPoint(point, out);
  },

  /**
   * !#en
   * Conver a world coordinates point to camera coordinates.
   * !#zh
   * 将一个世界坐标系下的点转换到摄像机坐标系下。
   * @method getWorldToCameraPoint
   * @deprecated since v2.1.3
   * @param {Vec2} point 
   * @param {Vec2} [out] - the point to receive the result
   * @return {Vec2} out
   */
  getWorldToCameraPoint: function getWorldToCameraPoint(point, out) {
    return this.getWorldToScreenPoint(point, out);
  },

  /**
   * !#en
   * Get the camera to world matrix
   * !#zh
   * 获取摄像机坐标系到世界坐标系的矩阵
   * @method getCameraToWorldMatrix
   * @deprecated since v2.1.3
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getCameraToWorldMatrix: function getCameraToWorldMatrix(out) {
    return this.getScreenToWorldMatrix2D(out);
  },

  /**
   * !#en
   * Get the world to camera matrix
   * !#zh
   * 获取世界坐标系到摄像机坐标系的矩阵
   * @method getWorldToCameraMatrix
   * @deprecated since v2.1.3
   * @param {Mat4} out - the matrix to receive the result
   * @return {Mat4} out
   */
  getWorldToCameraMatrix: function getWorldToCameraMatrix(out) {
    return this.getWorldToScreenMatrix2D(out);
  }
});
module.exports = cc.Camera = Camera;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNhbWVyYVxcQ0NDYW1lcmEuanMiXSwibmFtZXMiOlsiQWZmaW5lVHJhbnMiLCJyZXF1aXJlIiwicmVuZGVyZXIiLCJSZW5kZXJGbG93IiwiZ2FtZSIsIlJlbmRlcmVyQ2FtZXJhIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJ3aW5kb3ciLCJDYW1lcmEiLCJfbWF0NF90ZW1wXzEiLCJjYyIsIm1hdDQiLCJfbWF0NF90ZW1wXzIiLCJfdjNfdGVtcF8xIiwidjMiLCJfdjNfdGVtcF8yIiwiX3YzX3RlbXBfMyIsIl9jYW1lcmFzIiwidXBkYXRlTWFpbkNhbWVyYSIsImkiLCJtaW5EZXB0aCIsIk51bWJlciIsIk1BWF9WQUxVRSIsImxlbmd0aCIsImNhbWVyYSIsIl9kZXB0aCIsIm1haW4iLCJfZGVidWdDYW1lcmEiLCJyZXBvc2l0aW9uRGVidWdDYW1lcmEiLCJub2RlIiwiZ2V0Tm9kZSIsImNhbnZhcyIsInoiLCJoZWlnaHQiLCJ4Iiwid2lkdGgiLCJ5IiwiQ2xlYXJGbGFncyIsIkVudW0iLCJDT0xPUiIsIkRFUFRIIiwiU1RFTkNJTCIsIlN0YWdlRmxhZ3MiLCJPUEFRVUUiLCJUUkFOU1BBUkVOVCIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsImN0b3IiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwic2V0U3RhZ2VzIiwiZGlydHkiLCJfaW5pdGVkIiwiX2NhbWVyYSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsInByb3BlcnRpZXMiLCJfY3VsbGluZ01hc2siLCJfY2xlYXJGbGFncyIsIl9iYWNrZ3JvdW5kQ29sb3IiLCJjb2xvciIsIl96b29tUmF0aW8iLCJfdGFyZ2V0VGV4dHVyZSIsIl9mb3YiLCJfb3J0aG9TaXplIiwiX25lYXJDbGlwIiwiX2ZhckNsaXAiLCJfb3J0aG8iLCJfcmVjdCIsInJlY3QiLCJfcmVuZGVyU3RhZ2VzIiwiX2FsaWduV2l0aFNjcmVlbiIsInpvb21SYXRpbyIsImdldCIsInNldCIsInZhbHVlIiwidG9vbHRpcCIsIkNDX0RFViIsImZvdiIsInYiLCJvcnRob1NpemUiLCJuZWFyQ2xpcCIsIl91cGRhdGVDbGlwcGluZ3BQbGFuZXMiLCJmYXJDbGlwIiwib3J0aG8iLCJfdXBkYXRlUHJvamVjdGlvbiIsIl91cGRhdGVSZWN0IiwiY3VsbGluZ01hc2siLCJfdXBkYXRlQ2FtZXJhTWFzayIsImNsZWFyRmxhZ3MiLCJzZXRDbGVhckZsYWdzIiwiYmFja2dyb3VuZENvbG9yIiwiZXF1YWxzIiwiX3VwZGF0ZUJhY2tncm91bmRDb2xvciIsImRlcHRoIiwiaW5jbHVkZXMiLCJzZXRQcmlvcml0eSIsInRhcmdldFRleHR1cmUiLCJfdXBkYXRlVGFyZ2V0VGV4dHVyZSIsInJlbmRlclN0YWdlcyIsInZhbCIsIl91cGRhdGVTdGFnZXMiLCJhbGlnbldpdGhTY3JlZW4iLCJfaXMzRCIsIl9pczNETm9kZSIsInN0YXRpY3MiLCJjYW1lcmFzIiwiZmluZENhbWVyYSIsImwiLCJjb250YWluc05vZGUiLCJfZmluZFJlbmRlcmVyQ2FtZXJhIiwic2NlbmUiLCJfY291bnQiLCJfZGF0YSIsIl9zZXR1cERlYnVnQ2FtZXJhIiwic2V0Rm92IiwiTWF0aCIsIlBJIiwic2V0TmVhciIsInNldEZhciIsIk5vZGUiLCJCdWlsdGluR3JvdXBJbmRleCIsIkRFQlVHIiwibWFjcm8iLCJNQVhfWklOREVYIiwic2V0Q29sb3IiLCJzZXROb2RlIiwidmlldyIsIm9uIiwiYWRkQ2FtZXJhIiwibWFzayIsInIiLCJnIiwiYiIsImEiLCJ0ZXh0dXJlIiwic2V0RnJhbWVCdWZmZXIiLCJfZnJhbWVidWZmZXIiLCJ0eXBlIiwic2V0VHlwZSIsInNldFJlY3QiLCJmbGFncyIsInN0YWdlcyIsInB1c2giLCJfaW5pdCIsImJlZm9yZURyYXciLCJfX3ByZWxvYWQiLCJvbkVuYWJsZSIsImRpcmVjdG9yIiwiRGlyZWN0b3IiLCJFVkVOVF9CRUZPUkVfRFJBVyIsIm9uRGlzYWJsZSIsIm9mZiIsInJlbW92ZUNhbWVyYSIsImpzIiwiYXJyYXkiLCJmYXN0UmVtb3ZlIiwiZ2V0U2NyZWVuVG9Xb3JsZE1hdHJpeDJEIiwib3V0IiwiZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEIiwiTWF0NCIsImludmVydCIsImdldFdvcmxkUlQiLCJfbWF0NF90ZW1wXzFtIiwibSIsIm0xMiIsIm0xMyIsImNlbnRlciIsInZpc2libGVSZWN0IiwiY29weSIsImdldFNjcmVlblRvV29ybGRQb2ludCIsInNjcmVlblBvc2l0aW9uIiwiaXMzRE5vZGUiLCJWZWMzIiwic2NyZWVuVG9Xb3JsZCIsIlZlYzIiLCJ0cmFuc2Zvcm1NYXQ0IiwiZ2V0V29ybGRUb1NjcmVlblBvaW50Iiwid29ybGRQb3NpdGlvbiIsIndvcmxkVG9TY3JlZW4iLCJnZXRSYXkiLCJzY3JlZW5Qb3MiLCJnZW9tVXRpbHMiLCJnZXRXb3JsZFBvc2l0aW9uIiwiUmF5IiwiZnJvbVBvaW50cyIsInJlbmRlciIsInJvb3ROb2RlIiwiZ2V0U2NlbmUiLCJnZXRXb3JsZE1hdHJpeCIsInJlbmRlckNhbWVyYSIsIl9vbkFsaWduV2l0aFNjcmVlbiIsIl9zY2FsZVkiLCJlbmdpbmUiLCJnZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSIsIlJBRCIsInRhbiIsImF0YW4iLCJzZXRPcnRob0hlaWdodCIsInNldFJvdGF0aW9uIiwibWl4aW4iLCJwcm90b3R5cGUiLCJnZXROb2RlVG9DYW1lcmFUcmFuc2Zvcm0iLCJpZGVudGl0eSIsImdldFdvcmxkVG9DYW1lcmFNYXRyaXgiLCJtdWwiLCJmcm9tTWF0NCIsImdldENhbWVyYVRvV29ybGRQb2ludCIsInBvaW50IiwiZ2V0V29ybGRUb0NhbWVyYVBvaW50IiwiZ2V0Q2FtZXJhVG9Xb3JsZE1hdHJpeCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUEwQkE7O0FBQ0E7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEVBNkVHO0FBQ3pCLFdBQU8sS0FBS0Msd0JBQUwsQ0FBOEJELEdBQTlCLENBQVA7QUFDSDtBQS9FeUIsQ0FBOUI7QUFrRkFxRCxNQUFNLENBQUNDLE9BQVAsR0FBaUI5TSxFQUFFLENBQUNGLE1BQUgsR0FBWUEsTUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBNYXQ0LCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vdmFsdWUtdHlwZXMnO1xyXG5pbXBvcnQgeyBSYXkgfSBmcm9tICcuLi9nZW9tLXV0aWxzJztcclxuXHJcbmNvbnN0IEFmZmluZVRyYW5zID0gcmVxdWlyZSgnLi4vdXRpbHMvYWZmaW5lLXRyYW5zZm9ybScpO1xyXG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL2luZGV4Jyk7XHJcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xyXG5jb25zdCBnYW1lID0gcmVxdWlyZSgnLi4vQ0NHYW1lJyk7XHJcblxyXG5sZXQgUmVuZGVyZXJDYW1lcmEgPSBudWxsO1xyXG5pZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICBSZW5kZXJlckNhbWVyYSA9IHdpbmRvdy5yZW5kZXJlci5DYW1lcmE7XHJcbn0gZWxzZSB7XHJcbiAgICBSZW5kZXJlckNhbWVyYSA9IHJlcXVpcmUoJy4uLy4uL3JlbmRlcmVyL3NjZW5lL2NhbWVyYScpO1xyXG59XHJcblxyXG5sZXQgX21hdDRfdGVtcF8xID0gY2MubWF0NCgpO1xyXG5sZXQgX21hdDRfdGVtcF8yID0gY2MubWF0NCgpO1xyXG5cclxubGV0IF92M190ZW1wXzEgPSBjYy52MygpO1xyXG5sZXQgX3YzX3RlbXBfMiA9IGNjLnYzKCk7XHJcbmxldCBfdjNfdGVtcF8zID0gY2MudjMoKTtcclxuXHJcbmxldCBfY2FtZXJhcyA9IFtdOyAgLy8gdW5zdGFibGUgYXJyYXlcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1haW5DYW1lcmEgKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1pbkRlcHRoID0gTnVtYmVyLk1BWF9WQUxVRTsgaSA8IF9jYW1lcmFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNhbWVyYSA9IF9jYW1lcmFzW2ldO1xyXG4gICAgICAgIGlmIChjYW1lcmEuX2RlcHRoIDwgbWluRGVwdGgpIHtcclxuICAgICAgICAgICAgQ2FtZXJhLm1haW4gPSBjYW1lcmE7XHJcbiAgICAgICAgICAgIG1pbkRlcHRoID0gY2FtZXJhLl9kZXB0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfZGVidWdDYW1lcmEgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gcmVwb3NpdGlvbkRlYnVnQ2FtZXJhICgpIHtcclxuICAgIGlmICghX2RlYnVnQ2FtZXJhKSByZXR1cm47XHJcblxyXG4gICAgbGV0IG5vZGUgPSBfZGVidWdDYW1lcmEuZ2V0Tm9kZSgpO1xyXG4gICAgbGV0IGNhbnZhcyA9IGNjLmdhbWUuY2FudmFzO1xyXG4gICAgbm9kZS56ID0gY2FudmFzLmhlaWdodCAvIDEuMTU2NjtcclxuICAgIG5vZGUueCA9IGNhbnZhcy53aWR0aCAvIDI7XHJcbiAgICBub2RlLnkgPSBjYW52YXMuaGVpZ2h0IC8gMjtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW4gVmFsdWVzIGZvciBDYW1lcmEuY2xlYXJGbGFncywgZGV0ZXJtaW5pbmcgd2hhdCB0byBjbGVhciB3aGVuIHJlbmRlcmluZyBhIENhbWVyYS5cclxuICogISN6aCDmkYTlg4/mnLrmuIXpmaTmoIforrDkvY3vvIzlhrPlrprmkYTlg4/mnLrmuLLmn5Pml7bkvJrmuIXpmaTlk6rkupvnirbmgIFcclxuICogQGVudW0gQ2FtZXJhLkNsZWFyRmxhZ3NcclxuICovXHJcbmxldCBDbGVhckZsYWdzID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENsZWFyIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5riF6Zmk6IOM5pmv6aKc6ImyXHJcbiAgICAgKiBAcHJvcGVydHkgQ09MT1JcclxuICAgICAqL1xyXG4gICAgQ09MT1I6IDEsXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENsZWFyIHRoZSBkZXB0aCBidWZmZXIuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmuIXpmaTmt7HluqbnvJPlhrLljLpcclxuICAgICAqIEBwcm9wZXJ0eSBERVBUSFxyXG4gICAgICovXHJcbiAgICBERVBUSDogMixcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ2xlYXIgdGhlIHN0ZW5jaWwuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmuIXpmaTmqKHmnb/nvJPlhrLljLpcclxuICAgICAqIEBwcm9wZXJ0eSBTVEVOQ0lMXHJcbiAgICAgKi9cclxuICAgIFNURU5DSUw6IDQsXHJcbn0pO1xyXG5cclxubGV0IFN0YWdlRmxhZ3MgPSBjYy5FbnVtKHtcclxuICAgIE9QQVFVRTogMSxcclxuICAgIFRSQU5TUEFSRU5UOiAyXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ2FtZXJhIGlzIHVzZWZ1bGwgd2hlbiBtYWtpbmcgcmVlbCBnYW1lIG9yIG90aGVyIGdhbWVzIHdoaWNoIG5lZWQgc2Nyb2xsIHNjcmVlbi5cclxuICogVXNpbmcgY2FtZXJhIHdpbGwgYmUgbW9yZSBlZmZpY2llbnQgdGhhbiBtb3Zpbmcgbm9kZSB0byBzY3JvbGwgc2NyZWVuLlxyXG4gKiBDYW1lcmEgXHJcbiAqICEjemhcclxuICog5pGE5YOP5py65Zyo5Yi25L2c5Y236L205oiW5piv5YW25LuW6ZyA6KaB56e75Yqo5bGP5bmV55qE5ri45oiP5pe25q+U6L6D5pyJ55So77yM5L2/55So5pGE5YOP5py65bCG5Lya5q+U56e75Yqo6IqC54K55p2l56e75Yqo5bGP5bmV5pu05Yqg6auY5pWI44CCXHJcbiAqIEBjbGFzcyBDYW1lcmFcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5sZXQgQ2FtZXJhID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLkNhbWVyYScsXHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgaWYgKGdhbWUucmVuZGVyVHlwZSAhPT0gZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYSA9IG5ldyBSZW5kZXJlckNhbWVyYSgpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLnNldFN0YWdlcyhbXHJcbiAgICAgICAgICAgICAgICAnb3BhcXVlJyxcclxuICAgICAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICAgICBjYW1lcmEuZGlydHkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5pdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5vdGhlcnMvQ2FtZXJhJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2NhbWVyYS5qcycsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIF9jdWxsaW5nTWFzazogMHhmZmZmZmZmZixcclxuICAgICAgICBfY2xlYXJGbGFnczogQ2xlYXJGbGFncy5ERVBUSCB8IENsZWFyRmxhZ3MuU1RFTkNJTCxcclxuICAgICAgICBfYmFja2dyb3VuZENvbG9yOiBjYy5jb2xvcigwLCAwLCAwLCAyNTUpLFxyXG4gICAgICAgIF9kZXB0aDogMCxcclxuICAgICAgICBfem9vbVJhdGlvOiAxLFxyXG4gICAgICAgIF90YXJnZXRUZXh0dXJlOiBudWxsLFxyXG4gICAgICAgIF9mb3Y6IDYwLFxyXG4gICAgICAgIF9vcnRob1NpemU6IDEwLFxyXG4gICAgICAgIF9uZWFyQ2xpcDogMSxcclxuICAgICAgICBfZmFyQ2xpcDogNDA5NixcclxuICAgICAgICBfb3J0aG86IHRydWUsXHJcbiAgICAgICAgX3JlY3Q6IGNjLnJlY3QoMCwgMCwgMSwgMSksXHJcbiAgICAgICAgX3JlbmRlclN0YWdlczogMSxcclxuICAgICAgICBfYWxpZ25XaXRoU2NyZWVuOiB0cnVlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGNhbWVyYSB6b29tIHJhdGlvLCBvbmx5IHN1cHBvcnQgMkQgY2FtZXJhLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmkYTlg4/mnLrnvKnmlL7mr5TnjocsIOWPquaUr+aMgSAyRCBjYW1lcmHjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gem9vbVJhdGlvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgem9vbVJhdGlvOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fem9vbVJhdGlvO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl96b29tUmF0aW8gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEuem9vbVJhdGlvJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogRmllbGQgb2Ygdmlldy4gVGhlIHdpZHRoIG9mIHRoZSBDYW1lcmHigJlzIHZpZXcgYW5nbGUsIG1lYXN1cmVkIGluIGRlZ3JlZXMgYWxvbmcgdGhlIGxvY2FsIFkgYXhpcy5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py66KeG6KeS55qE5a695bqm77yM5b2T5pGE5YOP5py65aSE5LqO6YCP6KeG5oqV5b2x5qih5byP5LiL6L+Z5Liq5bGe5oCn5omN5Lya55Sf5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGZvdlxyXG4gICAgICAgICAqIEBkZWZhdWx0IDYwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm92OiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm92O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZvdiA9IHY7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLmZvdicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSB2aWV3cG9ydCBzaXplIG9mIHRoZSBDYW1lcmEgd2hlbiBzZXQgdG8gb3J0aG9ncmFwaGljIHByb2plY3Rpb24uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaRhOWDj+acuuWcqOato+S6pOaKleW9seaooeW8j+S4i+eahOinhueql+Wkp+Wwj+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBvcnRob1NpemVcclxuICAgICAgICAgKiBAZGVmYXVsdCAxMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9ydGhvU2l6ZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29ydGhvU2l6ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcnRob1NpemUgPSB2O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5vcnRob1NpemUnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgbmVhciBjbGlwcGluZyBwbGFuZS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5pGE5YOP5py655qE6L+R5Ymq6KOB6Z2i44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG5lYXJDbGlwXHJcbiAgICAgICAgICogQGRlZmF1bHQgMC4xXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbmVhckNsaXA6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZWFyQ2xpcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZWFyQ2xpcCA9IHY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDbGlwcGluZ3BQbGFuZXMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEubmVhckNsaXAnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgZmFyIGNsaXBwaW5nIHBsYW5lLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmkYTlg4/mnLrnmoTov5zliaroo4HpnaLjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZmFyQ2xpcFxyXG4gICAgICAgICAqIEBkZWZhdWx0IDQwOTZcclxuICAgICAgICAgKi9cclxuICAgICAgICBmYXJDbGlwOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFyQ2xpcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mYXJDbGlwID0gdjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNsaXBwaW5ncFBsYW5lcygpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5mYXJDbGlwJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogSXMgdGhlIGNhbWVyYSBvcnRob2dyYXBoaWMgKHRydWUpIG9yIHBlcnNwZWN0aXZlIChmYWxzZSk/XHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOiuvue9ruaRhOWDj+acuueahOaKleW9seaooeW8j+aYr+ato+S6pOi/mOaYr+mAj+inhuaooeW8j+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gb3J0aG9cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9ydGhvOiB7XHJcbiAgICAgICAgICAgIGdldCAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3J0aG87XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3J0aG8gPSB2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUHJvamVjdGlvbigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5vcnRobycsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEZvdXIgdmFsdWVzICgwIH4gMSkgdGhhdCBpbmRpY2F0ZSB3aGVyZSBvbiB0aGUgc2NyZWVuIHRoaXMgY2FtZXJhIHZpZXcgd2lsbCBiZSBkcmF3bi5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py657uY5Yi25Zyo5bGP5bmV5LiK5ZOq5Liq5L2N572u77yM5YC85Li677yIMCB+IDHvvInjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1JlY3R9IHJlY3RcclxuICAgICAgICAgKiBAZGVmYXVsdCBjYy5yZWN0KDAsMCwxLDEpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmVjdDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Q7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjdCA9IHY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZWN0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuY2FtZXJhLnJlY3QnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGlzIGlzIHVzZWQgdG8gcmVuZGVyIHBhcnRzIG9mIHRoZSBzY2VuZSBzZWxlY3RpdmVseS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py65Lya5riy5p+T5Zy65pmv55qE5ZOq5LiA6YOo5YiG44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGN1bGxpbmdNYXNrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3VsbGluZ01hc2s6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdWxsaW5nTWFzaztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VsbGluZ01hc2sgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYU1hc2soKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEuY3VsbGluZ01hc2snLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBEZXRlcm1pbmluZyB3aGF0IHRvIGNsZWFyIHdoZW4gY2FtZXJhIHJlbmRlcmluZy5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5Yaz5a6a5pGE5YOP5py65riy5p+T5pe25Lya5riF6Zmk5ZOq5Lqb54q25oCB44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtDYW1lcmEuQ2xlYXJGbGFnc30gY2xlYXJGbGFnc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNsZWFyRmxhZ3M6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbGVhckZsYWdzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhckZsYWdzID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FtZXJhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnNldENsZWFyRmxhZ3ModmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5jbGVhckZsYWdzJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIGNvbG9yIHdpdGggd2hpY2ggdGhlIHNjcmVlbiB3aWxsIGJlIGNsZWFyZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaRhOWDj+acuueUqOS6jua4hemZpOWxj+W5leeahOiDjOaZr+iJsuOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGJhY2tncm91bmRDb2xvclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9iYWNrZ3JvdW5kQ29sb3IuZXF1YWxzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvci5zZXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5iYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBDYW1lcmEncyBkZXB0aCBpbiB0aGUgY2FtZXJhIHJlbmRlcmluZyBvcmRlci4gQ2FtZXJhcyB3aXRoIGhpZ2hlciBkZXB0aCBhcmUgcmVuZGVyZWQgYWZ0ZXIgY2FtZXJhcyB3aXRoIGxvd2VyIGRlcHRoLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmkYTlg4/mnLrmt7HluqbjgILnlKjkuo7lhrPlrprmkYTlg4/mnLrnmoTmuLLmn5Ppobrluo/vvIzlgLzotorlpKfmuLLmn5PlnKjotorkuIrlsYLjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGVwdGhcclxuICAgICAgICAgKi9cclxuICAgICAgICBkZXB0aDoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlcHRoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FtZXJhLm1haW4gPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVwdGggPCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVNYWluQ2FtZXJhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQ2FtZXJhLm1haW4gJiYgdmFsdWUgPCBDYW1lcmEubWFpbi5fZGVwdGggJiYgX2NhbWVyYXMuaW5jbHVkZXModGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBDYW1lcmEubWFpbiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVwdGggPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYW1lcmEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2V0UHJpb3JpdHkodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmNhbWVyYS5kZXB0aCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIERlc3RpbmF0aW9uIHJlbmRlciB0ZXh0dXJlLlxyXG4gICAgICAgICAqIFVzdWFsbHkgY2FtZXJhcyByZW5kZXIgZGlyZWN0bHkgdG8gc2NyZWVuLCBidXQgZm9yIHNvbWUgZWZmZWN0cyBpdCBpcyB1c2VmdWwgdG8gbWFrZSBhIGNhbWVyYSByZW5kZXIgaW50byBhIHRleHR1cmUuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaRhOWDj+acuua4suafk+eahOebruaghyBSZW5kZXJUZXh0dXJl44CCXHJcbiAgICAgICAgICog5LiA6Iis5pGE5YOP5py65Lya55u05o6l5riy5p+T5Yiw5bGP5bmV5LiK77yM5L2G5piv5pyJ5LiA5Lqb5pWI5p6c5Y+v5Lul5L2/55So5pGE5YOP5py65riy5p+T5YiwIFJlbmRlclRleHR1cmUg5LiK5YaN5a+5IFJlbmRlclRleHR1cmUg6L+b6KGM5aSE55CG5p2l5a6e546w44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtSZW5kZXJUZXh0dXJlfSB0YXJnZXRUZXh0dXJlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGFyZ2V0VGV4dHVyZToge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldFRleHR1cmU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldFRleHR1cmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRhcmdldFRleHR1cmUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEudGFyZ2V0VGV4dHVyZScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFNldHMgdGhlIGNhbWVyYSdzIHJlbmRlciBzdGFnZXMuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOiuvue9ruaRhOWDj+acuua4suafk+eahOmYtuautVxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByZW5kZXJTdGFnZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZW5kZXJTdGFnZXM6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTdGFnZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJTdGFnZXMgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGFnZXMoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jYW1lcmEucmVuZGVyU3RhZ2VzJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgYXV0byBhbGlnbiBjYW1lcmEgdmlld3BvcnQgdG8gc2NyZWVuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKboh6rliqjlsIbmkYTlg4/mnLrnmoTop4blj6Plr7nlh4blsY/luZVcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFsaWduV2l0aFNjcmVlblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFsaWduV2l0aFNjcmVlbjoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsaWduV2l0aFNjcmVlbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0ICh2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGlnbldpdGhTY3JlZW4gPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgX2lzM0Q6IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLl9pczNETm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgcHJpbWFyeSBjYW1lcmEgaW4gdGhlIHNjZW5lLiBSZXR1cm5zIHRoZSByZWFyIG1vc3QgcmVuZGVyZWQgY2FtZXJhLCB3aGljaCBpcyB0aGUgY2FtZXJhIHdpdGggdGhlIGxvd2VzdCBkZXB0aC5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5b2T5YmN5Zy65pmv5Lit5r+A5rS755qE5Li75pGE5YOP5py644CC5bCG5Lya6L+U5Zue5riy5p+T5Zyo5bGP5bmV5pyA5bqV5bGC77yM5Lmf5bCx5pivIGRlcHRoIOacgOWwj+eahOaRhOWDj+acuuOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q2FtZXJhfSBtYWluXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG1haW46IG51bGwsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBBbGwgZW5hYmxlZCBjYW1lcmFzLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlvZPliY3mv4DmtLvnmoTmiYDmnInmkYTlg4/mnLrjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1tDYW1lcmFdfSBjYW1lcmFzXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNhbWVyYXM6IF9jYW1lcmFzLFxyXG5cclxuICAgICAgICBDbGVhckZsYWdzOiBDbGVhckZsYWdzLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogR2V0IHRoZSBmaXJzdCBjYW1lcmEgd2hpY2ggdGhlIG5vZGUgYmVsb25nIHRvLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDojrflj5boioLngrnmiYDlnKjnmoTnrKzkuIDkuKrmkYTlg4/mnLrjgIJcclxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRDYW1lcmFcclxuICAgICAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGUgXHJcbiAgICAgICAgICogQHJldHVybiB7Q2FtZXJhfVxyXG4gICAgICAgICAqIEBzdGF0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBmaW5kQ2FtZXJhIChub2RlKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gX2NhbWVyYXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FtZXJhID0gX2NhbWVyYXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FtZXJhLmNvbnRhaW5zTm9kZShub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1lcmE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9maW5kUmVuZGVyZXJDYW1lcmEgKG5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYXMgPSByZW5kZXJlci5zY2VuZS5fY2FtZXJhcztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW1lcmFzLl9jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FtZXJhcy5fZGF0YVtpXS5fY3VsbGluZ01hc2sgJiBub2RlLl9jdWxsaW5nTWFzaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYW1lcmFzLl9kYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9zZXR1cERlYnVnQ2FtZXJhICgpIHtcclxuICAgICAgICAgICAgaWYgKF9kZWJ1Z0NhbWVyYSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZS5yZW5kZXJUeXBlID09PSBnYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhID0gbmV3IFJlbmRlcmVyQ2FtZXJhKCk7XHJcbiAgICAgICAgICAgIF9kZWJ1Z0NhbWVyYSA9IGNhbWVyYTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5zZXRTdGFnZXMoW1xyXG4gICAgICAgICAgICAgICAgJ29wYXF1ZScsXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FtZXJhLnNldEZvdihNYXRoLlBJICogNjAgLyAxODApO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0TmVhcigwLjEpO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0RmFyKDQwOTYpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmRpcnR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5jdWxsaW5nTWFzayA9IDEgPDwgY2MuTm9kZS5CdWlsdGluR3JvdXBJbmRleC5ERUJVRztcclxuICAgICAgICAgICAgY2FtZXJhLnNldFByaW9yaXR5KGNjLm1hY3JvLk1BWF9aSU5ERVgpO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0Q2xlYXJGbGFncygwKTtcclxuICAgICAgICAgICAgY2FtZXJhLnNldENvbG9yKDAsIDAsIDAsIDApO1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBjYW1lcmEuc2V0Tm9kZShub2RlKTtcclxuXHJcbiAgICAgICAgICAgIHJlcG9zaXRpb25EZWJ1Z0NhbWVyYSgpO1xyXG4gICAgICAgICAgICBjYy52aWV3Lm9uKCdkZXNpZ24tcmVzb2x1dGlvbi1jaGFuZ2VkJywgcmVwb3NpdGlvbkRlYnVnQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNjZW5lLmFkZENhbWVyYShjYW1lcmEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUNhbWVyYU1hc2sgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW1lcmEpIHtcclxuICAgICAgICAgICAgbGV0IG1hc2sgPSB0aGlzLl9jdWxsaW5nTWFzayAmICh+KDEgPDwgY2MuTm9kZS5CdWlsdGluR3JvdXBJbmRleC5ERUJVRykpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuY3VsbGluZ01hc2sgPSBtYXNrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUJhY2tncm91bmRDb2xvciAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRDb2xvcihcclxuICAgICAgICAgICAgY29sb3IuciAvIDI1NSxcclxuICAgICAgICAgICAgY29sb3IuZyAvIDI1NSxcclxuICAgICAgICAgICAgY29sb3IuYiAvIDI1NSxcclxuICAgICAgICAgICAgY29sb3IuYSAvIDI1NSxcclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVGFyZ2V0VGV4dHVyZSAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl90YXJnZXRUZXh0dXJlO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRGcmFtZUJ1ZmZlcih0ZXh0dXJlID8gdGV4dHVyZS5fZnJhbWVidWZmZXIgOiBudWxsKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZUNsaXBwaW5ncFBsYW5lcyAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0TmVhcih0aGlzLl9uZWFyQ2xpcCk7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhLnNldEZhcih0aGlzLl9mYXJDbGlwKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVByb2plY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2FtZXJhKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLl9vcnRobyA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRUeXBlKHR5cGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlUmVjdCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jYW1lcmEpIHJldHVybjtcclxuICAgICAgICBsZXQgcmVjdCA9IHRoaXMuX3JlY3Q7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhLnNldFJlY3QocmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVN0YWdlcyAoKSB7XHJcbiAgICAgICAgbGV0IGZsYWdzID0gdGhpcy5fcmVuZGVyU3RhZ2VzO1xyXG4gICAgICAgIGxldCBzdGFnZXMgPSBbXTtcclxuICAgICAgICBpZiAoZmxhZ3MgJiBTdGFnZUZsYWdzLk9QQVFVRSkge1xyXG4gICAgICAgICAgICBzdGFnZXMucHVzaCgnb3BhcXVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmbGFncyAmIFN0YWdlRmxhZ3MuVFJBTlNQQVJFTlQpIHtcclxuICAgICAgICAgICAgc3RhZ2VzLnB1c2goJ3RyYW5zcGFyZW50Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NhbWVyYS5zZXRTdGFnZXMoc3RhZ2VzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2luaXQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbml0ZWQpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgY2FtZXJhID0gdGhpcy5fY2FtZXJhO1xyXG4gICAgICAgIGlmICghY2FtZXJhKSByZXR1cm47XHJcbiAgICAgICAgY2FtZXJhLnNldE5vZGUodGhpcy5ub2RlKTtcclxuICAgICAgICBjYW1lcmEuc2V0Q2xlYXJGbGFncyh0aGlzLl9jbGVhckZsYWdzKTtcclxuICAgICAgICBjYW1lcmEuc2V0UHJpb3JpdHkodGhpcy5fZGVwdGgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUJhY2tncm91bmRDb2xvcigpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNhbWVyYU1hc2soKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVUYXJnZXRUZXh0dXJlKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xpcHBpbmdwUGxhbmVzKCk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvamVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YWdlcygpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlY3QoKTtcclxuXHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWZvcmVEcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfX3ByZWxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmIGdhbWUucmVuZGVyVHlwZSAhPT0gZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcsIHRoaXMuYmVmb3JlRHJhdywgdGhpcyk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLnNjZW5lLmFkZENhbWVyYSh0aGlzLl9jYW1lcmEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfY2FtZXJhcy5wdXNoKHRoaXMpO1xyXG4gICAgICAgIGlmICghQ2FtZXJhLm1haW4gfHwgKHRoaXMuX2RlcHRoIDwgQ2FtZXJhLm1haW4uX2RlcHRoKSkge1xyXG4gICAgICAgICAgICBDYW1lcmEubWFpbiA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGUgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmIGdhbWUucmVuZGVyVHlwZSAhPT0gZ2FtZS5SRU5ERVJfVFlQRV9DQU5WQVMpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXLCB0aGlzLmJlZm9yZURyYXcsIHRoaXMpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zY2VuZS5yZW1vdmVDYW1lcmEodGhpcy5fY2FtZXJhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuanMuYXJyYXkuZmFzdFJlbW92ZShfY2FtZXJhcywgdGhpcyk7XHJcbiAgICAgICAgaWYgKENhbWVyYS5tYWluID09PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIENhbWVyYS5tYWluID0gbnVsbDtcclxuICAgICAgICAgICAgdXBkYXRlTWFpbkNhbWVyYSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIHNjcmVlbiB0byB3b3JsZCBtYXRyaXgsIG9ubHkgc3VwcG9ydCAyRCBjYW1lcmEgd2hpY2ggYWxpZ25XaXRoU2NyZWVuIGlzIHRydWUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDojrflj5blsY/luZXlnZDmoIfns7vliLDkuJbnlYzlnZDmoIfns7vnmoTnn6npmLXvvIzlj6rpgILnlKjkuo4gYWxpZ25XaXRoU2NyZWVuIOS4uiB0cnVlIOeahCAyRCDmkYTlg4/mnLrjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0U2NyZWVuVG9Xb3JsZE1hdHJpeDJEXHJcbiAgICAgKiBAcGFyYW0ge01hdDR9IG91dCAtIHRoZSBtYXRyaXggdG8gcmVjZWl2ZSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSBvdXRcclxuICAgICAqL1xyXG4gICAgZ2V0U2NyZWVuVG9Xb3JsZE1hdHJpeDJEIChvdXQpIHtcclxuICAgICAgICB0aGlzLmdldFdvcmxkVG9TY3JlZW5NYXRyaXgyRChvdXQpO1xyXG4gICAgICAgIE1hdDQuaW52ZXJ0KG91dCwgb3V0KTtcclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgd29ybGQgdG8gY2FtZXJhIG1hdHJpeCwgb25seSBzdXBwb3J0IDJEIGNhbWVyYSB3aGljaCBhbGlnbldpdGhTY3JlZW4gaXMgdHJ1ZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluS4lueVjOWdkOagh+ezu+WIsOaRhOWDj+acuuWdkOagh+ezu+eahOefqemYte+8jOWPqumAgueUqOS6jiBhbGlnbldpdGhTY3JlZW4g5Li6IHRydWUg55qEIDJEIOaRhOWDj+acuuOAglxyXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkRcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IC0gdGhlIG1hdHJpeCB0byByZWNlaXZlIHRoZSByZXN1bHRcclxuICAgICAqIEByZXR1cm4ge01hdDR9IG91dFxyXG4gICAgICovXHJcbiAgICBnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQgKG91dCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZFJUKF9tYXQ0X3RlbXBfMSk7XHJcblxyXG4gICAgICAgIGxldCB6b29tUmF0aW8gPSB0aGlzLnpvb21SYXRpbztcclxuICAgICAgICBsZXQgX21hdDRfdGVtcF8xbSA9IF9tYXQ0X3RlbXBfMS5tO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMF0gKj0gem9vbVJhdGlvO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMV0gKj0gem9vbVJhdGlvO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bNF0gKj0gem9vbVJhdGlvO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bNV0gKj0gem9vbVJhdGlvO1xyXG5cclxuICAgICAgICBsZXQgbTEyID0gX21hdDRfdGVtcF8xbVsxMl07XHJcbiAgICAgICAgbGV0IG0xMyA9IF9tYXQ0X3RlbXBfMW1bMTNdO1xyXG5cclxuICAgICAgICBsZXQgY2VudGVyID0gY2MudmlzaWJsZVJlY3QuY2VudGVyO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMTJdID0gY2VudGVyLnggLSAoX21hdDRfdGVtcF8xbVswXSAqIG0xMiArIF9tYXQ0X3RlbXBfMW1bNF0gKiBtMTMpO1xyXG4gICAgICAgIF9tYXQ0X3RlbXBfMW1bMTNdID0gY2VudGVyLnkgLSAoX21hdDRfdGVtcF8xbVsxXSAqIG0xMiArIF9tYXQ0X3RlbXBfMW1bNV0gKiBtMTMpO1xyXG5cclxuICAgICAgICBpZiAob3V0ICE9PSBfbWF0NF90ZW1wXzEpIHtcclxuICAgICAgICAgICAgTWF0NC5jb3B5KG91dCwgX21hdDRfdGVtcF8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG91dDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDb252ZXJ0IHBvaW50IGZyb20gc2NyZWVuIHRvIHdvcmxkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5bCG5Z2Q5qCH5LuO5bGP5bmV5Z2Q5qCH57O76L2s5o2i5Yiw5LiW55WM5Z2Q5qCH57O744CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFNjcmVlblRvV29ybGRQb2ludFxyXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IHNjcmVlblBvc2l0aW9uIFxyXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IFtvdXRdIFxyXG4gICAgICogQHJldHVybiB7VmVjM3xWZWMyfSBvdXRcclxuICAgICAqL1xyXG4gICAgZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IChzY3JlZW5Qb3NpdGlvbiwgb3V0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5pczNETm9kZSkge1xyXG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzMoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FtZXJhLnNjcmVlblRvV29ybGQob3V0LCBzY3JlZW5Qb3NpdGlvbiwgY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzIoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkQoX21hdDRfdGVtcF8xKTtcclxuICAgICAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgc2NyZWVuUG9zaXRpb24sIF9tYXQ0X3RlbXBfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29udmVydCBwb2ludCBmcm9tIHdvcmxkIHRvIHNjcmVlbi5cclxuICAgICAqICEjemhcclxuICAgICAqIOWwhuWdkOagh+S7juS4lueVjOWdkOagh+ezu+i9rOWMluWIsOWxj+W5leWdkOagh+ezu+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvU2NyZWVuUG9pbnRcclxuICAgICAqIEBwYXJhbSB7VmVjM3xWZWMyfSB3b3JsZFBvc2l0aW9uIFxyXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IFtvdXRdIFxyXG4gICAgICogQHJldHVybiB7VmVjM3xWZWMyfSBvdXRcclxuICAgICAqL1xyXG4gICAgZ2V0V29ybGRUb1NjcmVlblBvaW50ICh3b3JsZFBvc2l0aW9uLCBvdXQpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmlzM0ROb2RlKSB7XHJcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMygpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEud29ybGRUb1NjcmVlbihvdXQsIHdvcmxkUG9zaXRpb24sIGNjLnZpc2libGVSZWN0LndpZHRoLCBjYy52aXNpYmxlUmVjdC5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBjYy5WZWMyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V29ybGRUb1NjcmVlbk1hdHJpeDJEKF9tYXQ0X3RlbXBfMSk7XHJcbiAgICAgICAgICAgIFZlYzIudHJhbnNmb3JtTWF0NChvdXQsIHdvcmxkUG9zaXRpb24sIF9tYXQ0X3RlbXBfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogR2V0IGEgcmF5IGZyb20gc2NyZWVuIHBvc2l0aW9uXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDku47lsY/luZXlnZDmoIfojrflj5bkuIDmnaHlsITnur9cclxuICAgICAqIEBtZXRob2QgZ2V0UmF5XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHNjcmVlblBvc1xyXG4gICAgICogQHJldHVybiB7UmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRSYXkgKHNjcmVlblBvcykge1xyXG4gICAgICAgIGlmICghY2MuZ2VvbVV0aWxzKSByZXR1cm4gc2NyZWVuUG9zO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFZlYzMuc2V0KF92M190ZW1wXzMsIHNjcmVlblBvcy54LCBzY3JlZW5Qb3MueSwgMSk7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhLnNjcmVlblRvV29ybGQoX3YzX3RlbXBfMiwgX3YzX3RlbXBfMywgY2MudmlzaWJsZVJlY3Qud2lkdGgsIGNjLnZpc2libGVSZWN0LmhlaWdodCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9ydGhvKSB7XHJcbiAgICAgICAgICAgIFZlYzMuc2V0KF92M190ZW1wXzMsIHNjcmVlblBvcy54LCBzY3JlZW5Qb3MueSwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2NyZWVuVG9Xb3JsZChfdjNfdGVtcF8xLCBfdjNfdGVtcF8zLCBjYy52aXNpYmxlUmVjdC53aWR0aCwgY2MudmlzaWJsZVJlY3QuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZFBvc2l0aW9uKF92M190ZW1wXzEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFJheS5mcm9tUG9pbnRzKG5ldyBSYXkoKSwgX3YzX3RlbXBfMSwgX3YzX3RlbXBfMik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ2hlY2sgd2hldGhlciB0aGUgbm9kZSBpcyBpbiB0aGUgY2FtZXJhLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5qOA5rWL6IqC54K55piv5ZCm6KKr5q2k5pGE5YOP5py65b2x5ZONXHJcbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zTm9kZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIG5vZGUgd2hpY2ggbmVlZCB0byBjaGVja1xyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgY29udGFpbnNOb2RlIChub2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIChub2RlLl9jdWxsaW5nTWFzayAmIHRoaXMuY3VsbGluZ01hc2spID4gMDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNhbWVyYSBtYW51YWxseS5cclxuICAgICAqICEjemhcclxuICAgICAqIOaJi+WKqOa4suafk+aRhOWDj+acuuOAglxyXG4gICAgICogQG1ldGhvZCByZW5kZXJcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gW3Jvb3ROb2RlXSBcclxuICAgICAqL1xyXG4gICAgcmVuZGVyIChyb290Tm9kZSkge1xyXG4gICAgICAgIHJvb3ROb2RlID0gcm9vdE5vZGUgfHwgY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKTtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZm9yY2UgdXBkYXRlIG5vZGUgd29ybGQgbWF0cml4XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldFdvcmxkTWF0cml4KF9tYXQ0X3RlbXBfMSk7XHJcbiAgICAgICAgdGhpcy5iZWZvcmVEcmF3KCk7XHJcblxyXG4gICAgICAgIFJlbmRlckZsb3cucmVuZGVyQ2FtZXJhKHRoaXMuX2NhbWVyYSwgcm9vdE5vZGUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25BbGlnbldpdGhTY3JlZW4gKCkge1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSBjYy5nYW1lLmNhbnZhcy5oZWlnaHQgLyBjYy52aWV3Ll9zY2FsZVk7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXRUZXh0dXJlID0gdGhpcy5fdGFyZ2V0VGV4dHVyZTtcclxuICAgICAgICBpZiAodGFyZ2V0VGV4dHVyZSkge1xyXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBjYy5lbmdpbmUuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBjYy52aXNpYmxlUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmb3YgPSB0aGlzLl9mb3YgKiBjYy5tYWNyby5SQUQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLnogPSBoZWlnaHQgLyAoTWF0aC50YW4oZm92IC8gMikgKiAyKTtcclxuXHJcbiAgICAgICAgZm92ID0gTWF0aC5hdGFuKE1hdGgudGFuKGZvdiAvIDIpIC8gdGhpcy56b29tUmF0aW8pICogMjtcclxuICAgICAgICB0aGlzLl9jYW1lcmEuc2V0Rm92KGZvdik7XHJcbiAgICAgICAgdGhpcy5fY2FtZXJhLnNldE9ydGhvSGVpZ2h0KGhlaWdodCAvIDIgLyB0aGlzLnpvb21SYXRpbyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFJvdGF0aW9uKDAsIDAsIDAsIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBiZWZvcmVEcmF3ICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NhbWVyYSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWxpZ25XaXRoU2NyZWVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uQWxpZ25XaXRoU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZm92ID0gdGhpcy5fZm92ICogY2MubWFjcm8uUkFEO1xyXG4gICAgICAgICAgICBmb3YgPSBNYXRoLmF0YW4oTWF0aC50YW4oZm92IC8gMikgLyB0aGlzLnpvb21SYXRpbykgKiAyO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2V0Rm92KGZvdik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYW1lcmEuc2V0T3J0aG9IZWlnaHQodGhpcy5fb3J0aG9TaXplIC8gdGhpcy56b29tUmF0aW8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2FtZXJhLmRpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBkZXByZWNhdGVkXHJcbmNjLmpzLm1peGluKENhbWVyYS5wcm90b3R5cGUsIHtcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmV0dXJucyB0aGUgbWF0cml4IHRoYXQgdHJhbnNmb3JtIHRoZSBub2RlJ3MgKGxvY2FsKSBzcGFjZSBjb29yZGluYXRlcyBpbnRvIHRoZSBjYW1lcmEncyBzcGFjZSBjb29yZGluYXRlcy5cclxuICAgICAqICEjemhcclxuICAgICAqIOi/lOWbnuS4gOS4quWwhuiKgueCueWdkOagh+ezu+i9rOaNouWIsOaRhOWDj+acuuWdkOagh+ezu+S4i+eahOefqemYtVxyXG4gICAgICogQG1ldGhvZCBnZXROb2RlVG9DYW1lcmFUcmFuc2Zvcm1cclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjAuMFxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gdGhlIG5vZGUgd2hpY2ggc2hvdWxkIHRyYW5zZm9ybVxyXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfVxyXG4gICAgICovXHJcbiAgICBnZXROb2RlVG9DYW1lcmFUcmFuc2Zvcm0gKG5vZGUpIHtcclxuICAgICAgICBsZXQgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcclxuICAgICAgICBub2RlLmdldFdvcmxkTWF0cml4KF9tYXQ0X3RlbXBfMik7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbnNOb2RlKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V29ybGRUb0NhbWVyYU1hdHJpeChfbWF0NF90ZW1wXzEpO1xyXG4gICAgICAgICAgICBNYXQ0Lm11bChfbWF0NF90ZW1wXzIsIF9tYXQ0X3RlbXBfMiwgX21hdDRfdGVtcF8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wXzIpO1xyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ29udmVyIGEgY2FtZXJhIGNvb3JkaW5hdGVzIHBvaW50IHRvIHdvcmxkIGNvb3JkaW5hdGVzLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5bCG5LiA5Liq5pGE5YOP5py65Z2Q5qCH57O75LiL55qE54K56L2s5o2i5Yiw5LiW55WM5Z2Q5qCH57O75LiL44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldENhbWVyYVRvV29ybGRQb2ludFxyXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4zXHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHBvaW50IC0gdGhlIHBvaW50IHdoaWNoIHNob3VsZCB0cmFuc2Zvcm1cclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSB0aGUgcG9pbnQgdG8gcmVjZWl2ZSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSBvdXRcclxuICAgICAqL1xyXG4gICAgZ2V0Q2FtZXJhVG9Xb3JsZFBvaW50IChwb2ludCwgb3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KHBvaW50LCBvdXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIENvbnZlciBhIHdvcmxkIGNvb3JkaW5hdGVzIHBvaW50IHRvIGNhbWVyYSBjb29yZGluYXRlcy5cclxuICAgICAqICEjemhcclxuICAgICAqIOWwhuS4gOS4quS4lueVjOWdkOagh+ezu+S4i+eahOeCuei9rOaNouWIsOaRhOWDj+acuuWdkOagh+ezu+S4i+OAglxyXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvQ2FtZXJhUG9pbnRcclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuM1xyXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludCBcclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSB0aGUgcG9pbnQgdG8gcmVjZWl2ZSB0aGUgcmVzdWx0XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSBvdXRcclxuICAgICAqL1xyXG4gICAgZ2V0V29ybGRUb0NhbWVyYVBvaW50IChwb2ludCwgb3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V29ybGRUb1NjcmVlblBvaW50KHBvaW50LCBvdXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEdldCB0aGUgY2FtZXJhIHRvIHdvcmxkIG1hdHJpeFxyXG4gICAgICogISN6aFxyXG4gICAgICog6I635Y+W5pGE5YOP5py65Z2Q5qCH57O75Yiw5LiW55WM5Z2Q5qCH57O755qE55+p6Zi1XHJcbiAgICAgKiBAbWV0aG9kIGdldENhbWVyYVRvV29ybGRNYXRyaXhcclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuM1xyXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdXQgLSB0aGUgbWF0cml4IHRvIHJlY2VpdmUgdGhlIHJlc3VsdFxyXG4gICAgICogQHJldHVybiB7TWF0NH0gb3V0XHJcbiAgICAgKi9cclxuICAgIGdldENhbWVyYVRvV29ybGRNYXRyaXggKG91dCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFNjcmVlblRvV29ybGRNYXRyaXgyRChvdXQpO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBHZXQgdGhlIHdvcmxkIHRvIGNhbWVyYSBtYXRyaXhcclxuICAgICAqICEjemhcclxuICAgICAqIOiOt+WPluS4lueVjOWdkOagh+ezu+WIsOaRhOWDj+acuuWdkOagh+ezu+eahOefqemYtVxyXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvQ2FtZXJhTWF0cml4XHJcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjNcclxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IC0gdGhlIG1hdHJpeCB0byByZWNlaXZlIHRoZSByZXN1bHRcclxuICAgICAqIEByZXR1cm4ge01hdDR9IG91dFxyXG4gICAgICovXHJcbiAgICBnZXRXb3JsZFRvQ2FtZXJhTWF0cml4IChvdXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQob3V0KTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5DYW1lcmEgPSBDYW1lcmE7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9