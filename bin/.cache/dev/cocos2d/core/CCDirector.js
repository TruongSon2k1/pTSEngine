
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCDirector.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var EventTarget = require('./event/event-target');

var ComponentScheduler = require('./component-scheduler');

var NodeActivator = require('./node-activator');

var Obj = require('./platform/CCObject');

var game = require('./CCGame');

var renderer = require('./renderer');

var eventManager = require('./event-manager');

var Scheduler = require('./CCScheduler'); //----------------------------------------------------------------------------------------------------------------------

/**
 * !#en
 * <p>
 *    ATTENTION: USE cc.director INSTEAD OF cc.Director.<br/>
 *    cc.director is a singleton object which manage your game's logic flow.<br/>
 *    Since the cc.director is a singleton, you don't need to call any constructor or create functions,<br/>
 *    the standard way to use it is by calling:<br/>
 *      - cc.director.methodName(); <br/>
 *
 *    It creates and handle the main Window and manages how and when to execute the Scenes.<br/>
 *    <br/>
 *    The cc.director is also responsible for:<br/>
 *      - initializing the OpenGL context<br/>
 *      - setting the OpenGL pixel format (default on is RGB565)<br/>
 *      - setting the OpenGL buffer depth (default on is 0-bit)<br/>
 *      - setting the color for clear screen (default one is BLACK)<br/>
 *      - setting the projection (default one is 3D)<br/>
 *      - setting the orientation (default one is Portrait)<br/>
 *      <br/>
 *    <br/>
 *    The cc.director also sets the default OpenGL context:<br/>
 *      - GL_TEXTURE_2D is enabled<br/>
 *      - GL_VERTEX_ARRAY is enabled<br/>
 *      - GL_COLOR_ARRAY is enabled<br/>
 *      - GL_TEXTURE_COORD_ARRAY is enabled<br/>
 * </p>
 * <p>
 *   cc.director also synchronizes timers with the refresh rate of the display.<br/>
 *   Features and Limitations:<br/>
 *      - Scheduled timers & drawing are synchronizes with the refresh rate of the display<br/>
 *      - Only supports animation intervals of 1/60 1/30 & 1/15<br/>
 * </p>
 *
 * !#zh
 * <p>
 *     注意：用 cc.director 代替 cc.Director。<br/>
 *     cc.director 一个管理你的游戏的逻辑流程的单例对象。<br/>
 *     由于 cc.director 是一个单例，你不需要调用任何构造函数或创建函数，<br/>
 *     使用它的标准方法是通过调用：<br/>
 *       - cc.director.methodName();
 *     <br/>
 *     它创建和处理主窗口并且管理什么时候执行场景。<br/>
 *     <br/>
 *     cc.director 还负责：<br/>
 *      - 初始化 OpenGL 环境。<br/>
 *      - 设置OpenGL像素格式。(默认是 RGB565)<br/>
 *      - 设置OpenGL缓冲区深度 (默认是 0-bit)<br/>
 *      - 设置空白场景的颜色 (默认是 黑色)<br/>
 *      - 设置投影 (默认是 3D)<br/>
 *      - 设置方向 (默认是 Portrait)<br/>
 *    <br/>
 *    cc.director 设置了 OpenGL 默认环境 <br/>
 *      - GL_TEXTURE_2D   启用。<br/>
 *      - GL_VERTEX_ARRAY 启用。<br/>
 *      - GL_COLOR_ARRAY  启用。<br/>
 *      - GL_TEXTURE_COORD_ARRAY 启用。<br/>
 * </p>
 * <p>
 *   cc.director 也同步定时器与显示器的刷新速率。
 *   <br/>
 *   特点和局限性: <br/>
 *      - 将计时器 & 渲染与显示器的刷新频率同步。<br/>
 *      - 只支持动画的间隔 1/60 1/30 & 1/15。<br/>
 * </p>
 *
 * @class Director
 * @extends EventTarget
 */


cc.Director = function () {
  EventTarget.call(this); // paused?

  this._paused = false; // purge?

  this._purgeDirectorInNextLoop = false;
  this._winSizeInPoints = null; // scenes

  this._scene = null;
  this._loadingScene = ''; // FPS

  this._totalFrames = 0;
  this._lastUpdate = 0;
  this._deltaTime = 0.0;
  this._startTime = 0.0; // ParticleSystem max step delta time

  this._maxParticleDeltaTime = 0.0; // Scheduler for user registration update

  this._scheduler = null; // Scheduler for life-cycle methods in component

  this._compScheduler = null; // Node activator

  this._nodeActivator = null; // Action manager

  this._actionManager = null; // Time Scale

  this._timeScale = 1;
  var self = this;
  game.on(game.EVENT_SHOW, function () {
    self._lastUpdate = performance.now();
  });
  game.once(game.EVENT_ENGINE_INITED, this.init, this);
};

cc.Director.prototype = {
  constructor: cc.Director,
  init: function init() {
    this._totalFrames = 0;
    this._lastUpdate = performance.now();
    this._startTime = this._lastUpdate;
    this._paused = false;
    this._purgeDirectorInNextLoop = false;
    this._winSizeInPoints = cc.size(0, 0);
    this._scheduler = new Scheduler();

    if (cc.ActionManager) {
      this._actionManager = new cc.ActionManager();

      this._scheduler.scheduleUpdate(this._actionManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._actionManager = null;
    }

    this.sharedInit();
    return true;
  },

  /*
   * Manage all init process shared between the web engine and jsb engine.
   * All platform independent init process should be occupied here.
   */
  sharedInit: function sharedInit() {
    this._compScheduler = new ComponentScheduler();
    this._nodeActivator = new NodeActivator(); // Event manager

    if (eventManager) {
      eventManager.setEnabled(true);
    } // Animation manager


    if (cc.AnimationManager) {
      this._animationManager = new cc.AnimationManager();

      this._scheduler.scheduleUpdate(this._animationManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._animationManager = null;
    } // collision manager


    if (cc.CollisionManager) {
      this._collisionManager = new cc.CollisionManager();

      this._scheduler.scheduleUpdate(this._collisionManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._collisionManager = null;
    } // physics manager


    if (cc.PhysicsManager) {
      this._physicsManager = new cc.PhysicsManager();

      this._scheduler.scheduleUpdate(this._physicsManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._physicsManager = null;
    } // physics 3d manager


    if (cc.Physics3DManager && (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON)) {
      this._physics3DManager = new cc.Physics3DManager();

      this._scheduler.scheduleUpdate(this._physics3DManager, Scheduler.PRIORITY_SYSTEM, false);
    } else {
      this._physics3DManager = null;
    } // WidgetManager


    if (cc._widgetManager) {
      cc._widgetManager.init(this);
    }
  },

  /**
   * calculates delta time since last time it was called
   */
  calculateDeltaTime: function calculateDeltaTime(now) {
    if (!now) now = performance.now(); // avoid delta time from being negative
    // negative deltaTime would be caused by the precision of now's value, for details please see: https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame

    this._deltaTime = now > this._lastUpdate ? (now - this._lastUpdate) / 1000 : 0;
    if (CC_DEBUG && this._deltaTime > 1) this._deltaTime = 1 / 60.0;
    this._lastUpdate = now;
    this._deltaTime *= this._timeScale;
  },
  setTimeScale: function setTimeScale(value) {
    if (value > 0) this._timeScale = value;else console.warn("The time-scale can not be <= 0.");
  },
  getTimeScale: function getTimeScale() {
    return this._timeScale;
  },

  /**
   * !#en
   * Converts a view coordinate to an WebGL coordinate<br/>
   * Useful to convert (multi) touches coordinates to the current layout (portrait or landscape)<br/>
   * Implementation can be found in CCDirectorWebGL.
   * !#zh 将触摸点的屏幕坐标转换为 WebGL View 下的坐标。
   * @method convertToGL
   * @param {Vec2} uiPoint
   * @return {Vec2}
   * @deprecated since v2.0
   */
  convertToGL: function convertToGL(uiPoint) {
    var container = game.container;
    var view = cc.view;
    var box = container.getBoundingClientRect();
    var left = box.left + window.pageXOffset - container.clientLeft;
    var top = box.top + window.pageYOffset - container.clientTop;
    var x = view._devicePixelRatio * (uiPoint.x - left);
    var y = view._devicePixelRatio * (top + box.height - uiPoint.y);
    return view._isRotated ? cc.v2(view._viewportRect.width - y, x) : cc.v2(x, y);
  },

  /**
   * !#en
   * Converts an OpenGL coordinate to a view coordinate<br/>
   * Useful to convert node points to window points for calls such as glScissor<br/>
   * Implementation can be found in CCDirectorWebGL.
   * !#zh 将触摸点的 WebGL View 坐标转换为屏幕坐标。
   * @method convertToUI
   * @param {Vec2} glPoint
   * @return {Vec2}
   * @deprecated since v2.0
   */
  convertToUI: function convertToUI(glPoint) {
    var container = game.container;
    var view = cc.view;
    var box = container.getBoundingClientRect();
    var left = box.left + window.pageXOffset - container.clientLeft;
    var top = box.top + window.pageYOffset - container.clientTop;
    var uiPoint = cc.v2(0, 0);

    if (view._isRotated) {
      uiPoint.x = left + glPoint.y / view._devicePixelRatio;
      uiPoint.y = top + box.height - (view._viewportRect.width - glPoint.x) / view._devicePixelRatio;
    } else {
      uiPoint.x = left + glPoint.x * view._devicePixelRatio;
      uiPoint.y = top + box.height - glPoint.y * view._devicePixelRatio;
    }

    return uiPoint;
  },

  /**
   * End the life of director in the next frame
   * @method end
   */
  end: function end() {
    this._purgeDirectorInNextLoop = true;
  },

  /**
   * !#en
   * Returns the size of the WebGL view in points.<br/>
   * It takes into account any possible rotation (device orientation) of the window.
   * !#zh 获取视图的大小，以点为单位。
   * @method getWinSize
   * @return {Size}
   * @deprecated since v2.0
   */
  getWinSize: function getWinSize() {
    return cc.size(cc.winSize);
  },

  /**
   * !#en
   * Returns the size of the OpenGL view in pixels.<br/>
   * It takes into account any possible rotation (device orientation) of the window.<br/>
   * On Mac winSize and winSizeInPixels return the same value.
   * (The pixel here refers to the resource resolution. If you want to get the physics resolution of device, you need to use cc.view.getFrameSize())
   * !#zh
   * 获取视图大小，以像素为单位（这里的像素指的是资源分辨率。
   * 如果要获取屏幕物理分辨率，需要用 cc.view.getFrameSize()）
   * @method getWinSizeInPixels
   * @return {Size}
   * @deprecated since v2.0
   */
  getWinSizeInPixels: function getWinSizeInPixels() {
    return cc.size(cc.winSize);
  },

  /**
   * !#en Pause the director's ticker, only involve the game logic execution.
   * It won't pause the rendering process nor the event manager.
   * If you want to pause the entier game including rendering, audio and event,
   * please use {{#crossLink "Game.pause"}}cc.game.pause{{/crossLink}}
   * !#zh 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。
   * 如果想要更彻底得暂停游戏，包含渲染，音频和事件，请使用 {{#crossLink "Game.pause"}}cc.game.pause{{/crossLink}}。
   * @method pause
   */
  pause: function pause() {
    if (this._paused) return;
    this._paused = true;
  },

  /**
   * Removes cached all cocos2d cached data.
   * @deprecated since v2.0
   */
  purgeCachedData: function purgeCachedData() {
    cc.assetManager.releaseAll();
  },

  /**
   * Purge the cc.director itself, including unschedule all schedule, remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
   */
  purgeDirector: function purgeDirector() {
    //cleanup scheduler
    this._scheduler.unscheduleAll();

    this._compScheduler.unscheduleAll();

    this._nodeActivator.reset(); // Disable event dispatching


    if (eventManager) eventManager.setEnabled(false);

    if (!CC_EDITOR) {
      if (cc.isValid(this._scene)) {
        this._scene.destroy();
      }

      this._scene = null;
      cc.renderer.clear();
      cc.assetManager.builtins.clear();
    }

    cc.game.pause(); // Clear all caches

    cc.assetManager.releaseAll();
  },

  /**
   * Reset the cc.director, can be used to restart the director after purge
   */
  reset: function reset() {
    this.purgeDirector();
    if (eventManager) eventManager.setEnabled(true); // Action manager

    if (this._actionManager) {
      this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Animation manager


    if (this._animationManager) {
      this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Collider manager


    if (this._collisionManager) {
      this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    } // Physics manager


    if (this._physicsManager) {
      this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    }

    cc.game.resume();
  },

  /**
   * !#en
   * Run a scene. Replaces the running scene with a new one or enter the first scene.<br/>
   * The new scene will be launched immediately.
   * !#zh 立刻切换指定场景。
   * @method runSceneImmediate
   * @param {Scene|SceneAsset} scene - The need run scene.
   * @param {Function} [onBeforeLoadScene] - The function invoked at the scene before loading.
   * @param {Function} [onLaunched] - The function invoked at the scene after launch.
   */
  runSceneImmediate: function runSceneImmediate(scene, onBeforeLoadScene, onLaunched) {
    cc.assertID(scene instanceof cc.Scene || scene instanceof cc.SceneAsset, 1216);
    if (scene instanceof cc.SceneAsset) scene = scene.scene;
    CC_BUILD && CC_DEBUG && console.time('InitScene');

    scene._load(); // ensure scene initialized


    CC_BUILD && CC_DEBUG && console.timeEnd('InitScene'); // Re-attach or replace persist nodes

    CC_BUILD && CC_DEBUG && console.time('AttachPersist');
    var persistNodeList = Object.keys(game._persistRootNodes).map(function (x) {
      return game._persistRootNodes[x];
    });

    for (var i = 0; i < persistNodeList.length; i++) {
      var node = persistNodeList[i];
      var existNode = scene.getChildByUuid(node.uuid);

      if (existNode) {
        // scene also contains the persist node, select the old one
        var index = existNode.getSiblingIndex();

        existNode._destroyImmediate();

        scene.insertChild(node, index);
      } else {
        node.parent = scene;
      }
    }

    CC_BUILD && CC_DEBUG && console.timeEnd('AttachPersist');
    var oldScene = this._scene;

    if (!CC_EDITOR) {
      // auto release assets
      CC_BUILD && CC_DEBUG && console.time('AutoRelease');

      cc.assetManager._releaseManager._autoRelease(oldScene, scene, game._persistRootNodes);

      CC_BUILD && CC_DEBUG && console.timeEnd('AutoRelease');
    } // unload scene


    CC_BUILD && CC_DEBUG && console.time('Destroy');

    if (cc.isValid(oldScene)) {
      oldScene.destroy();
    }

    this._scene = null; // purge destroyed nodes belongs to old scene

    Obj._deferredDestroy();

    CC_BUILD && CC_DEBUG && console.timeEnd('Destroy');

    if (onBeforeLoadScene) {
      onBeforeLoadScene();
    }

    this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, scene); // Run an Entity Scene

    this._scene = scene;
    CC_BUILD && CC_DEBUG && console.time('Activate');

    scene._activate();

    CC_BUILD && CC_DEBUG && console.timeEnd('Activate'); //start scene

    cc.game.resume();

    if (onLaunched) {
      onLaunched(null, scene);
    }

    this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, scene);
  },

  /**
   * !#en
   * Run a scene. Replaces the running scene with a new one or enter the first scene.
   * The new scene will be launched at the end of the current frame.
   * !#zh 运行指定场景。
   * @method runScene
   * @param {Scene|SceneAsset} scene - The need run scene.
   * @param {Function} [onBeforeLoadScene] - The function invoked at the scene before loading.
   * @param {Function} [onLaunched] - The function invoked at the scene after launch.
   */
  runScene: function runScene(scene, onBeforeLoadScene, onLaunched) {
    cc.assertID(scene, 1205);
    cc.assertID(scene instanceof cc.Scene || scene instanceof cc.SceneAsset, 1216);
    if (scene instanceof cc.SceneAsset) scene = scene.scene; // ensure scene initialized

    scene._load(); // Delay run / replace scene to the end of the frame


    this.once(cc.Director.EVENT_AFTER_DRAW, function () {
      this.runSceneImmediate(scene, onBeforeLoadScene, onLaunched);
    }, this);
  },

  /**
   * !#en Loads the scene by its name.
   * !#zh 通过场景名称进行加载场景。
   *
   * @method loadScene
   * @param {String} sceneName - The name of the scene to load.
   * @param {Function} [onLaunched] - callback, will be called after scene launched.
   * @return {Boolean} if error, return false
   */
  loadScene: function loadScene(sceneName, onLaunched, _onUnloaded) {
    if (this._loadingScene) {
      cc.warnID(1208, sceneName, this._loadingScene);
      return false;
    }

    var bundle = cc.assetManager.bundles.find(function (bundle) {
      return bundle.getSceneInfo(sceneName);
    });

    if (bundle) {
      this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
      this._loadingScene = sceneName;
      var self = this;
      console.time('LoadScene ' + sceneName);
      bundle.loadScene(sceneName, function (err, scene) {
        console.timeEnd('LoadScene ' + sceneName);
        self._loadingScene = '';

        if (err) {
          err = 'Failed to load scene: ' + err;
          cc.error(err);
          onLaunched && onLaunched(err);
        } else {
          self.runSceneImmediate(scene, _onUnloaded, onLaunched);
        }
      });
      return true;
    } else {
      cc.errorID(1209, sceneName);
      return false;
    }
  },

  /**
  * !#en
  * Preloads the scene to reduces loading time. You can call this method at any time you want.
  * After calling this method, you still need to launch the scene by `cc.director.loadScene`.
  * It will be totally fine to call `cc.director.loadScene` at any time even if the preloading is not
  * yet finished, the scene will be launched after loaded automatically.
  * !#zh 预加载场景，你可以在任何时候调用这个方法。
  * 调用完后，你仍然需要通过 `cc.director.loadScene` 来启动场景，因为这个方法不会执行场景加载操作。
  * 就算预加载还没完成，你也可以直接调用 `cc.director.loadScene`，加载完成后场景就会启动。
  *
  * @method preloadScene
  * @param {String} sceneName - The name of the scene to preload.
  * @param {Function} [onProgress] - callback, will be called when the load progression change.
  * @param {Number} onProgress.completedCount - The number of the items that are already completed
  * @param {Number} onProgress.totalCount - The total number of the items
  * @param {Object} onProgress.item - The latest item which flow out the pipeline
  * @param {Function} [onLoaded] - callback, will be called after scene loaded.
  * @param {Error} onLoaded.error - null or the error object.
  */
  preloadScene: function preloadScene(sceneName, onProgress, onLoaded) {
    var bundle = cc.assetManager.bundles.find(function (bundle) {
      return bundle.getSceneInfo(sceneName);
    });

    if (bundle) {
      bundle.preloadScene(sceneName, null, onProgress, onLoaded);
    } else {
      cc.errorID(1209, sceneName);
      return null;
    }
  },

  /**
   * !#en Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
   * !#zh 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生。
   * @method resume
   */
  resume: function resume() {
    if (!this._paused) {
      return;
    }

    this._lastUpdate = performance.now();

    if (!this._lastUpdate) {
      cc.logID(1200);
    }

    this._paused = false;
    this._deltaTime = 0;
  },

  /**
   * !#en
   * Enables or disables WebGL depth test.<br/>
   * Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js
   * !#zh 启用/禁用深度测试（在 Canvas 渲染模式下不会生效）。
   * @method setDepthTest
   * @param {Boolean} on
   * @deprecated since v2.0
   */
  setDepthTest: function setDepthTest(value) {
    if (!cc.Camera.main) {
      return;
    }

    cc.Camera.main.depth = !!value;
  },

  /**
   * !#en
   * Set color for clear screen.<br/>
   * (Implementation can be found in CCDirectorCanvas.js/CCDirectorWebGL.js)
   * !#zh
   * 设置场景的默认擦除颜色。<br/>
   * 支持全透明，但不支持透明度为中间值。要支持全透明需手工开启 cc.macro.ENABLE_TRANSPARENT_CANVAS。
   * @method setClearColor
   * @param {Color} clearColor
   * @deprecated since v2.0
   */
  setClearColor: function setClearColor(clearColor) {
    if (!cc.Camera.main) {
      return;
    }

    cc.Camera.main.backgroundColor = clearColor;
  },

  /**
   * !#en Returns current logic Scene.
   * !#zh 获取当前逻辑场景。
   * @method getRunningScene
   * @private
   * @return {Scene}
   * @deprecated since v2.0
   */
  getRunningScene: function getRunningScene() {
    return this._scene;
  },

  /**
   * !#en Returns current logic Scene.
   * !#zh 获取当前逻辑场景。
   * @method getScene
   * @return {Scene}
   * @example
   *  // This will help you to get the Canvas node in scene
   *  cc.director.getScene().getChildByName('Canvas');
   */
  getScene: function getScene() {
    return this._scene;
  },

  /**
   * !#en Returns the FPS value. Please use {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}} to control animation interval.
   * !#zh 获取单位帧执行时间。请使用 {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}} 来控制游戏帧率。
   * @method getAnimationInterval
   * @deprecated since v2.0
   * @return {Number}
   */
  getAnimationInterval: function getAnimationInterval() {
    return 1000 / game.getFrameRate();
  },

  /**
   * Sets animation interval, this doesn't control the main loop.
   * To control the game's frame rate overall, please use {{#crossLink "Game.setFrameRate"}}cc.game.setFrameRate{{/crossLink}}
   * @method setAnimationInterval
   * @deprecated since v2.0
   * @param {Number} value - The animation interval desired.
   */
  setAnimationInterval: function setAnimationInterval(value) {
    game.setFrameRate(Math.round(1000 / value));
  },

  /**
   * !#en Returns the delta time since last frame.
   * !#zh 获取上一帧的增量时间。
   * @method getDeltaTime
   * @return {Number}
   */
  getDeltaTime: function getDeltaTime() {
    return this._deltaTime;
  },

  /**
   * !#en Returns the total passed time since game start, unit: ms
   * !#zh 获取从游戏开始到现在总共经过的时间，单位为 ms
   * @method getTotalTime
   * @return {Number}
   */
  getTotalTime: function getTotalTime() {
    return performance.now() - this._startTime;
  },

  /**
   * !#en Returns how many frames were called since the director started.
   * !#zh 获取 director 启动以来游戏运行的总帧数。
   * @method getTotalFrames
   * @return {Number}
   */
  getTotalFrames: function getTotalFrames() {
    return this._totalFrames;
  },

  /**
   * !#en Returns whether or not the Director is paused.
   * !#zh 是否处于暂停状态。
   * @method isPaused
   * @return {Boolean}
   */
  isPaused: function isPaused() {
    return this._paused;
  },

  /**
   * !#en Returns the cc.Scheduler associated with this director.
   * !#zh 获取和 director 相关联的 cc.Scheduler。
   * @method getScheduler
   * @return {Scheduler}
   */
  getScheduler: function getScheduler() {
    return this._scheduler;
  },

  /**
   * !#en Sets the cc.Scheduler associated with this director.
   * !#zh 设置和 director 相关联的 cc.Scheduler。
   * @method setScheduler
   * @param {Scheduler} scheduler
   */
  setScheduler: function setScheduler(scheduler) {
    if (this._scheduler !== scheduler) {
      this._scheduler = scheduler;
    }
  },

  /**
   * !#en Returns the cc.ActionManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.ActionManager（动作管理器）。
   * @method getActionManager
   * @return {ActionManager}
   */
  getActionManager: function getActionManager() {
    return this._actionManager;
  },

  /**
   * !#en Sets the cc.ActionManager associated with this director.
   * !#zh 设置和 director 相关联的 cc.ActionManager（动作管理器）。
   * @method setActionManager
   * @param {ActionManager} actionManager
   */
  setActionManager: function setActionManager(actionManager) {
    if (this._actionManager !== actionManager) {
      if (this._actionManager) {
        this._scheduler.unscheduleUpdate(this._actionManager);
      }

      this._actionManager = actionManager;

      this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, false);
    }
  },

  /*
   * !#en Returns the cc.AnimationManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.AnimationManager（动画管理器）。
   * @method getAnimationManager
   * @return {AnimationManager}
   */
  getAnimationManager: function getAnimationManager() {
    return this._animationManager;
  },

  /**
   * !#en Returns the cc.CollisionManager associated with this director.
   * !#zh 获取和 director 相关联的 cc.CollisionManager （碰撞管理器）。
   * @method getCollisionManager
   * @return {CollisionManager}
   */
  getCollisionManager: function getCollisionManager() {
    return this._collisionManager;
  },

  /**
   * !#en Returns the cc.PhysicsManager associated with this director.
   * !#zh 返回与 director 相关联的 cc.PhysicsManager （物理管理器）。
   * @method getPhysicsManager
   * @return {PhysicsManager}
   */
  getPhysicsManager: function getPhysicsManager() {
    return this._physicsManager;
  },

  /**
   * !#en Returns the cc.Physics3DManager associated with this director.
   * !#zh 返回与 director 相关联的 cc.Physics3DManager （物理管理器）。
   * @method getPhysics3DManager
   * @return {Physics3DManager}
   */
  getPhysics3DManager: function getPhysics3DManager() {
    return this._physics3DManager;
  },
  // Loop management

  /*
   * Starts Animation
   * @deprecated since v2.1.2
   */
  startAnimation: function startAnimation() {
    cc.game.resume();
  },

  /*
   * Stops animation
   * @deprecated since v2.1.2
   */
  stopAnimation: function stopAnimation() {
    cc.game.pause();
  },
  _resetDeltaTime: function _resetDeltaTime() {
    this._lastUpdate = performance.now();
    this._deltaTime = 0;
  },

  /*
   * Run main loop of director
   */
  mainLoop: CC_EDITOR ? function (deltaTime, updateAnimate) {
    this._deltaTime = deltaTime; // Update

    if (!this._paused) {
      this.emit(cc.Director.EVENT_BEFORE_UPDATE);

      this._compScheduler.startPhase();

      this._compScheduler.updatePhase(deltaTime);

      if (updateAnimate) {
        this._scheduler.update(deltaTime);
      }

      this._compScheduler.lateUpdatePhase(deltaTime);

      this.emit(cc.Director.EVENT_AFTER_UPDATE);
    } // Render


    this.emit(cc.Director.EVENT_BEFORE_DRAW);
    renderer.render(this._scene, deltaTime); // After draw

    this.emit(cc.Director.EVENT_AFTER_DRAW);
    this._totalFrames++;
  } : function (now) {
    if (this._purgeDirectorInNextLoop) {
      this._purgeDirectorInNextLoop = false;
      this.purgeDirector();
    } else {
      // calculate "global" dt
      this.calculateDeltaTime(now); // Update

      if (!this._paused) {
        // before update
        this.emit(cc.Director.EVENT_BEFORE_UPDATE); // Call start for new added components

        this._compScheduler.startPhase(); // Update for components


        this._compScheduler.updatePhase(this._deltaTime); // Engine update with scheduler


        this._scheduler.update(this._deltaTime); // Late update for components


        this._compScheduler.lateUpdatePhase(this._deltaTime); // User can use this event to do things after update


        this.emit(cc.Director.EVENT_AFTER_UPDATE); // Destroy entities that have been removed recently

        Obj._deferredDestroy();
      } // Render


      this.emit(cc.Director.EVENT_BEFORE_DRAW);
      renderer.render(this._scene, this._deltaTime); // After draw

      this.emit(cc.Director.EVENT_AFTER_DRAW);
      eventManager.frameUpdateListeners();
      this._totalFrames++;
    }
  },
  __fastOn: function __fastOn(type, callback, target) {
    this.on(type, callback, target);
  },
  __fastOff: function __fastOff(type, callback, target) {
    this.off(type, callback, target);
  }
}; // Event target

cc.js.addon(cc.Director.prototype, EventTarget.prototype);
/**
 * !#en The event projection changed of cc.Director. This event will not get triggered since v2.0
 * !#zh cc.Director 投影变化的事件。从 v2.0 开始这个事件不会再被触发
 * @property {String} EVENT_PROJECTION_CHANGED
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
/**
 * !#en The event which will be triggered before loading a new scene.
 * !#zh 加载新场景之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_SCENE_LOADING
 * @param {String} sceneName - The loading scene name
 */

/**
 * !#en The event which will be triggered before loading a new scene.
 * !#zh 加载新场景之前所触发的事件。
 * @property {String} EVENT_BEFORE_SCENE_LOADING
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
/*
 * !#en The event which will be triggered before launching a new scene.
 * !#zh 运行新场景之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_SCENE_LAUNCH
 * @param {String} sceneName - New scene which will be launched
 */

/**
 * !#en The event which will be triggered before launching a new scene.
 * !#zh 运行新场景之前所触发的事件。
 * @property {String} EVENT_BEFORE_SCENE_LAUNCH
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
/**
 * !#en The event which will be triggered after launching a new scene.
 * !#zh 运行新场景之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_SCENE_LAUNCH
 * @param {String} sceneName - New scene which is launched
 */

/**
 * !#en The event which will be triggered after launching a new scene.
 * !#zh 运行新场景之后所触发的事件。
 * @property {String} EVENT_AFTER_SCENE_LAUNCH
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
/**
 * !#en The event which will be triggered at the beginning of every frame.
 * !#zh 每个帧的开始时所触发的事件。
 * @event cc.Director.EVENT_BEFORE_UPDATE
 */

/**
 * !#en The event which will be triggered at the beginning of every frame.
 * !#zh 每个帧的开始时所触发的事件。
 * @property {String} EVENT_BEFORE_UPDATE
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
/**
 * !#en The event which will be triggered after engine and components update logic.
 * !#zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_UPDATE
 */

/**
 * !#en The event which will be triggered after engine and components update logic.
 * !#zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
 * @property {String} EVENT_AFTER_UPDATE
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
/**
 * !#en The event is deprecated since v2.0, please use cc.Director.EVENT_BEFORE_DRAW instead
 * !#zh 这个事件从 v2.0 开始被废弃，请直接使用 cc.Director.EVENT_BEFORE_DRAW
 * @property {String} EVENT_BEFORE_VISIT
 * @readonly
 * @deprecated since v2.0
 * @static
 */

cc.Director.EVENT_BEFORE_VISIT = "director_before_draw";
/**
 * !#en The event is deprecated since v2.0, please use cc.Director.EVENT_BEFORE_DRAW instead
 * !#zh 这个事件从 v2.0 开始被废弃，请直接使用 cc.Director.EVENT_BEFORE_DRAW
 * @property {String} EVENT_AFTER_VISIT
 * @readonly
 * @deprecated since v2.0
 * @static
 */

cc.Director.EVENT_AFTER_VISIT = "director_before_draw";
/**
 * !#en The event which will be triggered before the rendering process.
 * !#zh 渲染过程之前所触发的事件。
 * @event cc.Director.EVENT_BEFORE_DRAW
 */

/**
 * !#en The event which will be triggered before the rendering process.
 * !#zh 渲染过程之前所触发的事件。
 * @property {String} EVENT_BEFORE_DRAW
 * @readonly
 * @static
 */

cc.Director.EVENT_BEFORE_DRAW = "director_before_draw";
/**
 * !#en The event which will be triggered after the rendering process.
 * !#zh 渲染过程之后所触发的事件。
 * @event cc.Director.EVENT_AFTER_DRAW
 */

/**
 * !#en The event which will be triggered after the rendering process.
 * !#zh 渲染过程之后所触发的事件。
 * @property {String} EVENT_AFTER_DRAW
 * @readonly
 * @static
 */

cc.Director.EVENT_AFTER_DRAW = "director_after_draw"; //Possible OpenGL projections used by director

/**
 * Constant for 2D projection (orthogonal projection)
 * @property {Number} PROJECTION_2D
 * @default 0
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_2D = 0;
/**
 * Constant for 3D projection with a fovy=60, znear=0.5f and zfar=1500.
 * @property {Number} PROJECTION_3D
 * @default 1
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_3D = 1;
/**
 * Constant for custom projection, if cc.Director's projection set to it, it calls "updateProjection" on the projection delegate.
 * @property {Number} PROJECTION_CUSTOM
 * @default 3
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_CUSTOM = 3;
/**
 * Constant for default projection of cc.Director, default projection is 2D projection
 * @property {Number} PROJECTION_DEFAULT
 * @default cc.Director.PROJECTION_2D
 * @readonly
 * @static
 * @deprecated since v2.0
 */

cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_2D;
/**
 * The event which will be triggered before the physics process.<br/>
 * 物理过程之前所触发的事件。
 * @event Director.EVENT_BEFORE_PHYSICS
 * @readonly
 */

cc.Director.EVENT_BEFORE_PHYSICS = 'director_before_physics';
/**
 * The event which will be triggered after the physics process.<br/>
 * 物理过程之后所触发的事件。
 * @event Director.EVENT_AFTER_PHYSICS
 * @readonly
 */

cc.Director.EVENT_AFTER_PHYSICS = 'director_after_physics';
/**
 * @module cc
 */

/**
 * !#en Director
 * !#zh 导演类。
 * @property director
 * @type {Director}
 */

cc.director = new cc.Director();
module.exports = cc.director;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDRGlyZWN0b3IuanMiXSwibmFtZXMiOlsiRXZlbnRUYXJnZXQiLCJyZXF1aXJlIiwiQ29tcG9uZW50U2NoZWR1bGVyIiwiTm9kZUFjdGl2YXRvciIsIk9iaiIsImdhbWUiLCJyZW5kZXJlciIsImV2ZW50TWFuYWdlciIsIlNjaGVkdWxlciIsImNjIiwiRGlyZWN0b3IiLCJjYWxsIiwiX3BhdXNlZCIsIl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCIsIl93aW5TaXplSW5Qb2ludHMiLCJfc2NlbmUiLCJfbG9hZGluZ1NjZW5lIiwiX3RvdGFsRnJhbWVzIiwiX2xhc3RVcGRhdGUiLCJfZGVsdGFUaW1lIiwiX3N0YXJ0VGltZSIsIl9tYXhQYXJ0aWNsZURlbHRhVGltZSIsIl9zY2hlZHVsZXIiLCJfY29tcFNjaGVkdWxlciIsIl9ub2RlQWN0aXZhdG9yIiwiX2FjdGlvbk1hbmFnZXIiLCJfdGltZVNjYWxlIiwic2VsZiIsIm9uIiwiRVZFTlRfU0hPVyIsInBlcmZvcm1hbmNlIiwibm93Iiwib25jZSIsIkVWRU5UX0VOR0lORV9JTklURUQiLCJpbml0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJzaXplIiwiQWN0aW9uTWFuYWdlciIsInNjaGVkdWxlVXBkYXRlIiwiUFJJT1JJVFlfU1lTVEVNIiwic2hhcmVkSW5pdCIsInNldEVuYWJsZWQiLCJBbmltYXRpb25NYW5hZ2VyIiwiX2FuaW1hdGlvbk1hbmFnZXIiLCJDb2xsaXNpb25NYW5hZ2VyIiwiX2NvbGxpc2lvbk1hbmFnZXIiLCJQaHlzaWNzTWFuYWdlciIsIl9waHlzaWNzTWFuYWdlciIsIlBoeXNpY3MzRE1hbmFnZXIiLCJDQ19QSFlTSUNTX0JVSUxUSU4iLCJDQ19QSFlTSUNTX0NBTk5PTiIsIl9waHlzaWNzM0RNYW5hZ2VyIiwiX3dpZGdldE1hbmFnZXIiLCJjYWxjdWxhdGVEZWx0YVRpbWUiLCJDQ19ERUJVRyIsInNldFRpbWVTY2FsZSIsInZhbHVlIiwiY29uc29sZSIsIndhcm4iLCJnZXRUaW1lU2NhbGUiLCJjb252ZXJ0VG9HTCIsInVpUG9pbnQiLCJjb250YWluZXIiLCJ2aWV3IiwiYm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsIndpbmRvdyIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsInRvcCIsInBhZ2VZT2Zmc2V0IiwiY2xpZW50VG9wIiwieCIsIl9kZXZpY2VQaXhlbFJhdGlvIiwieSIsImhlaWdodCIsIl9pc1JvdGF0ZWQiLCJ2MiIsIl92aWV3cG9ydFJlY3QiLCJ3aWR0aCIsImNvbnZlcnRUb1VJIiwiZ2xQb2ludCIsImVuZCIsImdldFdpblNpemUiLCJ3aW5TaXplIiwiZ2V0V2luU2l6ZUluUGl4ZWxzIiwicGF1c2UiLCJwdXJnZUNhY2hlZERhdGEiLCJhc3NldE1hbmFnZXIiLCJyZWxlYXNlQWxsIiwicHVyZ2VEaXJlY3RvciIsInVuc2NoZWR1bGVBbGwiLCJyZXNldCIsIkNDX0VESVRPUiIsImlzVmFsaWQiLCJkZXN0cm95IiwiY2xlYXIiLCJidWlsdGlucyIsInJlc3VtZSIsInJ1blNjZW5lSW1tZWRpYXRlIiwic2NlbmUiLCJvbkJlZm9yZUxvYWRTY2VuZSIsIm9uTGF1bmNoZWQiLCJhc3NlcnRJRCIsIlNjZW5lIiwiU2NlbmVBc3NldCIsIkNDX0JVSUxEIiwidGltZSIsIl9sb2FkIiwidGltZUVuZCIsInBlcnNpc3ROb2RlTGlzdCIsIk9iamVjdCIsImtleXMiLCJfcGVyc2lzdFJvb3ROb2RlcyIsIm1hcCIsImkiLCJsZW5ndGgiLCJub2RlIiwiZXhpc3ROb2RlIiwiZ2V0Q2hpbGRCeVV1aWQiLCJ1dWlkIiwiaW5kZXgiLCJnZXRTaWJsaW5nSW5kZXgiLCJfZGVzdHJveUltbWVkaWF0ZSIsImluc2VydENoaWxkIiwicGFyZW50Iiwib2xkU2NlbmUiLCJfcmVsZWFzZU1hbmFnZXIiLCJfYXV0b1JlbGVhc2UiLCJfZGVmZXJyZWREZXN0cm95IiwiZW1pdCIsIkVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0giLCJfYWN0aXZhdGUiLCJFVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0giLCJydW5TY2VuZSIsIkVWRU5UX0FGVEVSX0RSQVciLCJsb2FkU2NlbmUiLCJzY2VuZU5hbWUiLCJfb25VbmxvYWRlZCIsIndhcm5JRCIsImJ1bmRsZSIsImJ1bmRsZXMiLCJmaW5kIiwiZ2V0U2NlbmVJbmZvIiwiRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkciLCJlcnIiLCJlcnJvciIsImVycm9ySUQiLCJwcmVsb2FkU2NlbmUiLCJvblByb2dyZXNzIiwib25Mb2FkZWQiLCJsb2dJRCIsInNldERlcHRoVGVzdCIsIkNhbWVyYSIsIm1haW4iLCJkZXB0aCIsInNldENsZWFyQ29sb3IiLCJjbGVhckNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZ2V0UnVubmluZ1NjZW5lIiwiZ2V0U2NlbmUiLCJnZXRBbmltYXRpb25JbnRlcnZhbCIsImdldEZyYW1lUmF0ZSIsInNldEFuaW1hdGlvbkludGVydmFsIiwic2V0RnJhbWVSYXRlIiwiTWF0aCIsInJvdW5kIiwiZ2V0RGVsdGFUaW1lIiwiZ2V0VG90YWxUaW1lIiwiZ2V0VG90YWxGcmFtZXMiLCJpc1BhdXNlZCIsImdldFNjaGVkdWxlciIsInNldFNjaGVkdWxlciIsInNjaGVkdWxlciIsImdldEFjdGlvbk1hbmFnZXIiLCJzZXRBY3Rpb25NYW5hZ2VyIiwiYWN0aW9uTWFuYWdlciIsInVuc2NoZWR1bGVVcGRhdGUiLCJnZXRBbmltYXRpb25NYW5hZ2VyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZ2V0UGh5c2ljczNETWFuYWdlciIsInN0YXJ0QW5pbWF0aW9uIiwic3RvcEFuaW1hdGlvbiIsIl9yZXNldERlbHRhVGltZSIsIm1haW5Mb29wIiwiZGVsdGFUaW1lIiwidXBkYXRlQW5pbWF0ZSIsIkVWRU5UX0JFRk9SRV9VUERBVEUiLCJzdGFydFBoYXNlIiwidXBkYXRlUGhhc2UiLCJ1cGRhdGUiLCJsYXRlVXBkYXRlUGhhc2UiLCJFVkVOVF9BRlRFUl9VUERBVEUiLCJFVkVOVF9CRUZPUkVfRFJBVyIsInJlbmRlciIsImZyYW1lVXBkYXRlTGlzdGVuZXJzIiwiX19mYXN0T24iLCJ0eXBlIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJfX2Zhc3RPZmYiLCJvZmYiLCJqcyIsImFkZG9uIiwiRVZFTlRfUFJPSkVDVElPTl9DSEFOR0VEIiwiRVZFTlRfQkVGT1JFX1ZJU0lUIiwiRVZFTlRfQUZURVJfVklTSVQiLCJQUk9KRUNUSU9OXzJEIiwiUFJPSkVDVElPTl8zRCIsIlBST0pFQ1RJT05fQ1VTVE9NIiwiUFJPSkVDVElPTl9ERUZBVUxUIiwiRVZFTlRfQkVGT1JFX1BIWVNJQ1MiLCJFVkVOVF9BRlRFUl9QSFlTSUNTIiwiZGlyZWN0b3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLHNCQUFELENBQTNCOztBQUNBLElBQU1DLGtCQUFrQixHQUFHRCxPQUFPLENBQUMsdUJBQUQsQ0FBbEM7O0FBQ0EsSUFBTUUsYUFBYSxHQUFHRixPQUFPLENBQUMsa0JBQUQsQ0FBN0I7O0FBQ0EsSUFBTUcsR0FBRyxHQUFHSCxPQUFPLENBQUMscUJBQUQsQ0FBbkI7O0FBQ0EsSUFBTUksSUFBSSxHQUFHSixPQUFPLENBQUMsVUFBRCxDQUFwQjs7QUFDQSxJQUFNSyxRQUFRLEdBQUdMLE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUNBLElBQU1NLFlBQVksR0FBR04sT0FBTyxDQUFDLGlCQUFELENBQTVCOztBQUNBLElBQU1PLFNBQVMsR0FBR1AsT0FBTyxDQUFDLGVBQUQsQ0FBekIsRUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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d0JBQWxDO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTlNLEVBQUUsQ0FBQytNLFFBQUgsR0FBYyxJQUFJL00sRUFBRSxDQUFDQyxRQUFQLEVBQWQ7QUFFQStNLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpOLEVBQUUsQ0FBQytNLFFBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCBDb21wb25lbnRTY2hlZHVsZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudC1zY2hlZHVsZXInKTtcbmNvbnN0IE5vZGVBY3RpdmF0b3IgPSByZXF1aXJlKCcuL25vZGUtYWN0aXZhdG9yJyk7XG5jb25zdCBPYmogPSByZXF1aXJlKCcuL3BsYXRmb3JtL0NDT2JqZWN0Jyk7XG5jb25zdCBnYW1lID0gcmVxdWlyZSgnLi9DQ0dhbWUnKTtcbmNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXJlcicpO1xuY29uc3QgZXZlbnRNYW5hZ2VyID0gcmVxdWlyZSgnLi9ldmVudC1tYW5hZ2VyJyk7XG5jb25zdCBTY2hlZHVsZXIgPSByZXF1aXJlKCcuL0NDU2NoZWR1bGVyJyk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKipcbiAqICEjZW5cbiAqIDxwPlxuICogICAgQVRURU5USU9OOiBVU0UgY2MuZGlyZWN0b3IgSU5TVEVBRCBPRiBjYy5EaXJlY3Rvci48YnIvPlxuICogICAgY2MuZGlyZWN0b3IgaXMgYSBzaW5nbGV0b24gb2JqZWN0IHdoaWNoIG1hbmFnZSB5b3VyIGdhbWUncyBsb2dpYyBmbG93Ljxici8+XG4gKiAgICBTaW5jZSB0aGUgY2MuZGlyZWN0b3IgaXMgYSBzaW5nbGV0b24sIHlvdSBkb24ndCBuZWVkIHRvIGNhbGwgYW55IGNvbnN0cnVjdG9yIG9yIGNyZWF0ZSBmdW5jdGlvbnMsPGJyLz5cbiAqICAgIHRoZSBzdGFuZGFyZCB3YXkgdG8gdXNlIGl0IGlzIGJ5IGNhbGxpbmc6PGJyLz5cbiAqICAgICAgLSBjYy5kaXJlY3Rvci5tZXRob2ROYW1lKCk7IDxici8+XG4gKlxuICogICAgSXQgY3JlYXRlcyBhbmQgaGFuZGxlIHRoZSBtYWluIFdpbmRvdyBhbmQgbWFuYWdlcyBob3cgYW5kIHdoZW4gdG8gZXhlY3V0ZSB0aGUgU2NlbmVzLjxici8+XG4gKiAgICA8YnIvPlxuICogICAgVGhlIGNjLmRpcmVjdG9yIGlzIGFsc28gcmVzcG9uc2libGUgZm9yOjxici8+XG4gKiAgICAgIC0gaW5pdGlhbGl6aW5nIHRoZSBPcGVuR0wgY29udGV4dDxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgT3BlbkdMIHBpeGVsIGZvcm1hdCAoZGVmYXVsdCBvbiBpcyBSR0I1NjUpPGJyLz5cbiAqICAgICAgLSBzZXR0aW5nIHRoZSBPcGVuR0wgYnVmZmVyIGRlcHRoIChkZWZhdWx0IG9uIGlzIDAtYml0KTxici8+XG4gKiAgICAgIC0gc2V0dGluZyB0aGUgY29sb3IgZm9yIGNsZWFyIHNjcmVlbiAoZGVmYXVsdCBvbmUgaXMgQkxBQ0spPGJyLz5cbiAqICAgICAgLSBzZXR0aW5nIHRoZSBwcm9qZWN0aW9uIChkZWZhdWx0IG9uZSBpcyAzRCk8YnIvPlxuICogICAgICAtIHNldHRpbmcgdGhlIG9yaWVudGF0aW9uIChkZWZhdWx0IG9uZSBpcyBQb3J0cmFpdCk8YnIvPlxuICogICAgICA8YnIvPlxuICogICAgPGJyLz5cbiAqICAgIFRoZSBjYy5kaXJlY3RvciBhbHNvIHNldHMgdGhlIGRlZmF1bHQgT3BlbkdMIGNvbnRleHQ6PGJyLz5cbiAqICAgICAgLSBHTF9URVhUVVJFXzJEIGlzIGVuYWJsZWQ8YnIvPlxuICogICAgICAtIEdMX1ZFUlRFWF9BUlJBWSBpcyBlbmFibGVkPGJyLz5cbiAqICAgICAgLSBHTF9DT0xPUl9BUlJBWSBpcyBlbmFibGVkPGJyLz5cbiAqICAgICAgLSBHTF9URVhUVVJFX0NPT1JEX0FSUkFZIGlzIGVuYWJsZWQ8YnIvPlxuICogPC9wPlxuICogPHA+XG4gKiAgIGNjLmRpcmVjdG9yIGFsc28gc3luY2hyb25pemVzIHRpbWVycyB3aXRoIHRoZSByZWZyZXNoIHJhdGUgb2YgdGhlIGRpc3BsYXkuPGJyLz5cbiAqICAgRmVhdHVyZXMgYW5kIExpbWl0YXRpb25zOjxici8+XG4gKiAgICAgIC0gU2NoZWR1bGVkIHRpbWVycyAmIGRyYXdpbmcgYXJlIHN5bmNocm9uaXplcyB3aXRoIHRoZSByZWZyZXNoIHJhdGUgb2YgdGhlIGRpc3BsYXk8YnIvPlxuICogICAgICAtIE9ubHkgc3VwcG9ydHMgYW5pbWF0aW9uIGludGVydmFscyBvZiAxLzYwIDEvMzAgJiAxLzE1PGJyLz5cbiAqIDwvcD5cbiAqXG4gKiAhI3poXG4gKiA8cD5cbiAqICAgICDms6jmhI/vvJrnlKggY2MuZGlyZWN0b3Ig5Luj5pu/IGNjLkRpcmVjdG9y44CCPGJyLz5cbiAqICAgICBjYy5kaXJlY3RvciDkuIDkuKrnrqHnkIbkvaDnmoTmuLjmiI/nmoTpgLvovpHmtYHnqIvnmoTljZXkvovlr7nosaHjgII8YnIvPlxuICogICAgIOeUseS6jiBjYy5kaXJlY3RvciDmmK/kuIDkuKrljZXkvovvvIzkvaDkuI3pnIDopoHosIPnlKjku7vkvZXmnoTpgKDlh73mlbDmiJbliJvlu7rlh73mlbDvvIw8YnIvPlxuICogICAgIOS9v+eUqOWug+eahOagh+WHhuaWueazleaYr+mAmui/h+iwg+eUqO+8mjxici8+XG4gKiAgICAgICAtIGNjLmRpcmVjdG9yLm1ldGhvZE5hbWUoKTtcbiAqICAgICA8YnIvPlxuICogICAgIOWug+WIm+W7uuWSjOWkhOeQhuS4u+eql+WPo+W5tuS4lOeuoeeQhuS7gOS5iOaXtuWAmeaJp+ihjOWcuuaZr+OAgjxici8+XG4gKiAgICAgPGJyLz5cbiAqICAgICBjYy5kaXJlY3RvciDov5jotJ/otKPvvJo8YnIvPlxuICogICAgICAtIOWIneWni+WMliBPcGVuR0wg546v5aKD44CCPGJyLz5cbiAqICAgICAgLSDorr7nva5PcGVuR0zlg4/ntKDmoLzlvI/jgIIo6buY6K6k5pivIFJHQjU2NSk8YnIvPlxuICogICAgICAtIOiuvue9rk9wZW5HTOe8k+WGsuWMuua3seW6piAo6buY6K6k5pivIDAtYml0KTxici8+XG4gKiAgICAgIC0g6K6+572u56m655m95Zy65pmv55qE6aKc6ImyICjpu5jorqTmmK8g6buR6ImyKTxici8+XG4gKiAgICAgIC0g6K6+572u5oqV5b2xICjpu5jorqTmmK8gM0QpPGJyLz5cbiAqICAgICAgLSDorr7nva7mlrnlkJEgKOm7mOiupOaYryBQb3J0cmFpdCk8YnIvPlxuICogICAgPGJyLz5cbiAqICAgIGNjLmRpcmVjdG9yIOiuvue9ruS6hiBPcGVuR0wg6buY6K6k546v5aKDIDxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV8yRCAgIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfVkVSVEVYX0FSUkFZIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfQ09MT1JfQVJSQVkgIOWQr+eUqOOAgjxici8+XG4gKiAgICAgIC0gR0xfVEVYVFVSRV9DT09SRF9BUlJBWSDlkK/nlKjjgII8YnIvPlxuICogPC9wPlxuICogPHA+XG4gKiAgIGNjLmRpcmVjdG9yIOS5n+WQjOatpeWumuaXtuWZqOS4juaYvuekuuWZqOeahOWIt+aWsOmAn+eOh+OAglxuICogICA8YnIvPlxuICogICDnibnngrnlkozlsYDpmZDmgKc6IDxici8+XG4gKiAgICAgIC0g5bCG6K6h5pe25ZmoICYg5riy5p+T5LiO5pi+56S65Zmo55qE5Yi35paw6aKR546H5ZCM5q2l44CCPGJyLz5cbiAqICAgICAgLSDlj6rmlK/mjIHliqjnlLvnmoTpl7TpmpQgMS82MCAxLzMwICYgMS8xNeOAgjxici8+XG4gKiA8L3A+XG4gKlxuICogQGNsYXNzIERpcmVjdG9yXG4gKiBAZXh0ZW5kcyBFdmVudFRhcmdldFxuICovXG5jYy5EaXJlY3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gICAgLy8gcGF1c2VkP1xuICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgIC8vIHB1cmdlP1xuICAgIHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wID0gZmFsc2U7XG5cbiAgICB0aGlzLl93aW5TaXplSW5Qb2ludHMgPSBudWxsO1xuXG4gICAgLy8gc2NlbmVzXG4gICAgdGhpcy5fc2NlbmUgPSBudWxsO1xuICAgIHRoaXMuX2xvYWRpbmdTY2VuZSA9ICcnO1xuXG4gICAgLy8gRlBTXG4gICAgdGhpcy5fdG90YWxGcmFtZXMgPSAwO1xuICAgIHRoaXMuX2xhc3RVcGRhdGUgPSAwO1xuICAgIHRoaXMuX2RlbHRhVGltZSA9IDAuMDtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwLjA7XG5cbiAgICAvLyBQYXJ0aWNsZVN5c3RlbSBtYXggc3RlcCBkZWx0YSB0aW1lXG4gICAgdGhpcy5fbWF4UGFydGljbGVEZWx0YVRpbWUgPSAwLjA7XG5cbiAgICAvLyBTY2hlZHVsZXIgZm9yIHVzZXIgcmVnaXN0cmF0aW9uIHVwZGF0ZVxuICAgIHRoaXMuX3NjaGVkdWxlciA9IG51bGw7XG4gICAgLy8gU2NoZWR1bGVyIGZvciBsaWZlLWN5Y2xlIG1ldGhvZHMgaW4gY29tcG9uZW50XG4gICAgdGhpcy5fY29tcFNjaGVkdWxlciA9IG51bGw7XG4gICAgLy8gTm9kZSBhY3RpdmF0b3JcbiAgICB0aGlzLl9ub2RlQWN0aXZhdG9yID0gbnVsbDtcbiAgICAvLyBBY3Rpb24gbWFuYWdlclxuICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIgPSBudWxsO1xuXG4gICAgLy8gVGltZSBTY2FsZVxuICAgIHRoaXMuX3RpbWVTY2FsZSA9IDE7XG5cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBnYW1lLm9uKGdhbWUuRVZFTlRfU0hPVywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9sYXN0VXBkYXRlID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfSk7XG5cbiAgICBnYW1lLm9uY2UoZ2FtZS5FVkVOVF9FTkdJTkVfSU5JVEVELCB0aGlzLmluaXQsIHRoaXMpO1xufTtcblxuY2MuRGlyZWN0b3IucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBjYy5EaXJlY3RvcixcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsRnJhbWVzID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdFVwZGF0ZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9sYXN0VXBkYXRlO1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHVyZ2VEaXJlY3RvckluTmV4dExvb3AgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fd2luU2l6ZUluUG9pbnRzID0gY2Muc2l6ZSgwLCAwKTtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVyID0gbmV3IFNjaGVkdWxlcigpO1xuXG4gICAgICAgIGlmIChjYy5BY3Rpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gbmV3IGNjLkFjdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hY3Rpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hhcmVkSW5pdCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBNYW5hZ2UgYWxsIGluaXQgcHJvY2VzcyBzaGFyZWQgYmV0d2VlbiB0aGUgd2ViIGVuZ2luZSBhbmQganNiIGVuZ2luZS5cbiAgICAgKiBBbGwgcGxhdGZvcm0gaW5kZXBlbmRlbnQgaW5pdCBwcm9jZXNzIHNob3VsZCBiZSBvY2N1cGllZCBoZXJlLlxuICAgICAqL1xuICAgIHNoYXJlZEluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlciA9IG5ldyBDb21wb25lbnRTY2hlZHVsZXIoKTtcbiAgICAgICAgdGhpcy5fbm9kZUFjdGl2YXRvciA9IG5ldyBOb2RlQWN0aXZhdG9yKCk7XG5cbiAgICAgICAgLy8gRXZlbnQgbWFuYWdlclxuICAgICAgICBpZiAoZXZlbnRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuc2V0RW5hYmxlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5BbmltYXRpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25NYW5hZ2VyID0gbmV3IGNjLkFuaW1hdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hbmltYXRpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbGxpc2lvbiBtYW5hZ2VyXG4gICAgICAgIGlmIChjYy5Db2xsaXNpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25NYW5hZ2VyID0gbmV3IGNjLkNvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9jb2xsaXNpb25NYW5hZ2VyLCBTY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsaXNpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBoeXNpY3MgbWFuYWdlclxuICAgICAgICBpZiAoY2MuUGh5c2ljc01hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BoeXNpY3NNYW5hZ2VyID0gbmV3IGNjLlBoeXNpY3NNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fcGh5c2ljc01hbmFnZXIsIFNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BoeXNpY3NNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBoeXNpY3MgM2QgbWFuYWdlclxuICAgICAgICBpZiAoY2MuUGh5c2ljczNETWFuYWdlciAmJiAoQ0NfUEhZU0lDU19CVUlMVElOIHx8IENDX1BIWVNJQ1NfQ0FOTk9OKSkge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljczNETWFuYWdlciA9IG5ldyBjYy5QaHlzaWNzM0RNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fcGh5c2ljczNETWFuYWdlciwgU2NoZWR1bGVyLlBSSU9SSVRZX1NZU1RFTSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGh5c2ljczNETWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaWRnZXRNYW5hZ2VyXG4gICAgICAgIGlmIChjYy5fd2lkZ2V0TWFuYWdlcikge1xuICAgICAgICAgICAgY2MuX3dpZGdldE1hbmFnZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBjYWxjdWxhdGVzIGRlbHRhIHRpbWUgc2luY2UgbGFzdCB0aW1lIGl0IHdhcyBjYWxsZWRcbiAgICAgKi9cbiAgICBjYWxjdWxhdGVEZWx0YVRpbWU6IGZ1bmN0aW9uIChub3cpIHtcbiAgICAgICAgaWYgKCFub3cpIG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgICAgIC8vIGF2b2lkIGRlbHRhIHRpbWUgZnJvbSBiZWluZyBuZWdhdGl2ZVxuICAgICAgICAvLyBuZWdhdGl2ZSBkZWx0YVRpbWUgd291bGQgYmUgY2F1c2VkIGJ5IHRoZSBwcmVjaXNpb24gb2Ygbm93J3MgdmFsdWUsIGZvciBkZXRhaWxzIHBsZWFzZSBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL3poLUNOL2RvY3MvV2ViL0FQSS93aW5kb3cvcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgIHRoaXMuX2RlbHRhVGltZSA9IG5vdyA+IHRoaXMuX2xhc3RVcGRhdGUgPyAobm93IC0gdGhpcy5fbGFzdFVwZGF0ZSkgLyAxMDAwIDogMDtcbiAgICAgICAgaWYgKENDX0RFQlVHICYmICh0aGlzLl9kZWx0YVRpbWUgPiAxKSlcbiAgICAgICAgICAgIHRoaXMuX2RlbHRhVGltZSA9IDEgLyA2MC4wO1xuXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBub3c7XG5cbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lICo9IHRoaXMuX3RpbWVTY2FsZTtcbiAgICB9LFxuXG4gICAgc2V0VGltZVNjYWxlOiBmdW5jdGlvbih2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmKHZhbHVlID4gMCkgdGhpcy5fdGltZVNjYWxlID0gdmFsdWU7XG4gICAgICAgIGVsc2UgY29uc29sZS53YXJuKFwiVGhlIHRpbWUtc2NhbGUgY2FuIG5vdCBiZSA8PSAwLlwiKVxuICAgIH0sXG5cbiAgICBnZXRUaW1lU2NhbGU6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fdGltZVNjYWxlIH0sXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlcnRzIGEgdmlldyBjb29yZGluYXRlIHRvIGFuIFdlYkdMIGNvb3JkaW5hdGU8YnIvPlxuICAgICAqIFVzZWZ1bCB0byBjb252ZXJ0IChtdWx0aSkgdG91Y2hlcyBjb29yZGluYXRlcyB0byB0aGUgY3VycmVudCBsYXlvdXQgKHBvcnRyYWl0IG9yIGxhbmRzY2FwZSk8YnIvPlxuICAgICAqIEltcGxlbWVudGF0aW9uIGNhbiBiZSBmb3VuZCBpbiBDQ0RpcmVjdG9yV2ViR0wuXG4gICAgICogISN6aCDlsIbop6bmkbjngrnnmoTlsY/luZXlnZDmoIfovazmjaLkuLogV2ViR0wgVmlldyDkuIvnmoTlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb0dMXG4gICAgICogQHBhcmFtIHtWZWMyfSB1aVBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgY29udmVydFRvR0w6IGZ1bmN0aW9uICh1aVBvaW50KSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnYW1lLmNvbnRhaW5lcjtcbiAgICAgICAgdmFyIHZpZXcgPSBjYy52aWV3O1xuICAgICAgICB2YXIgYm94ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgbGVmdCA9IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0IC0gY29udGFpbmVyLmNsaWVudExlZnQ7XG4gICAgICAgIHZhciB0b3AgPSBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gY29udGFpbmVyLmNsaWVudFRvcDtcbiAgICAgICAgdmFyIHggPSB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvICogKHVpUG9pbnQueCAtIGxlZnQpO1xuICAgICAgICB2YXIgeSA9IHZpZXcuX2RldmljZVBpeGVsUmF0aW8gKiAodG9wICsgYm94LmhlaWdodCAtIHVpUG9pbnQueSk7XG4gICAgICAgIHJldHVybiB2aWV3Ll9pc1JvdGF0ZWQgPyBjYy52Mih2aWV3Ll92aWV3cG9ydFJlY3Qud2lkdGggLSB5LCB4KSA6IGNjLnYyKHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29udmVydHMgYW4gT3BlbkdMIGNvb3JkaW5hdGUgdG8gYSB2aWV3IGNvb3JkaW5hdGU8YnIvPlxuICAgICAqIFVzZWZ1bCB0byBjb252ZXJ0IG5vZGUgcG9pbnRzIHRvIHdpbmRvdyBwb2ludHMgZm9yIGNhbGxzIHN1Y2ggYXMgZ2xTY2lzc29yPGJyLz5cbiAgICAgKiBJbXBsZW1lbnRhdGlvbiBjYW4gYmUgZm91bmQgaW4gQ0NEaXJlY3RvcldlYkdMLlxuICAgICAqICEjemgg5bCG6Kem5pG454K555qEIFdlYkdMIFZpZXcg5Z2Q5qCH6L2s5o2i5Li65bGP5bmV5Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9VSVxuICAgICAqIEBwYXJhbSB7VmVjMn0gZ2xQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqL1xuICAgIGNvbnZlcnRUb1VJOiBmdW5jdGlvbiAoZ2xQb2ludCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2FtZS5jb250YWluZXI7XG4gICAgICAgIHZhciB2aWV3ID0gY2MudmlldztcbiAgICAgICAgdmFyIGJveCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIGxlZnQgPSBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRMZWZ0O1xuICAgICAgICB2YXIgdG9wID0gYm94LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIGNvbnRhaW5lci5jbGllbnRUb3A7XG4gICAgICAgIHZhciB1aVBvaW50ID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGlmICh2aWV3Ll9pc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgIHVpUG9pbnQueCA9IGxlZnQgKyBnbFBvaW50LnkgLyB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdWlQb2ludC55ID0gdG9wICsgYm94LmhlaWdodCAtICh2aWV3Ll92aWV3cG9ydFJlY3Qud2lkdGggLSBnbFBvaW50LngpIC8gdmlldy5fZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHVpUG9pbnQueCA9IGxlZnQgKyBnbFBvaW50LnggKiB2aWV3Ll9kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdWlQb2ludC55ID0gdG9wICsgYm94LmhlaWdodCAtIGdsUG9pbnQueSAqIHZpZXcuX2RldmljZVBpeGVsUmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVpUG9pbnQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuZCB0aGUgbGlmZSBvZiBkaXJlY3RvciBpbiB0aGUgbmV4dCBmcmFtZVxuICAgICAqIEBtZXRob2QgZW5kXG4gICAgICovXG4gICAgZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIFdlYkdMIHZpZXcgaW4gcG9pbnRzLjxici8+XG4gICAgICogSXQgdGFrZXMgaW50byBhY2NvdW50IGFueSBwb3NzaWJsZSByb3RhdGlvbiAoZGV2aWNlIG9yaWVudGF0aW9uKSBvZiB0aGUgd2luZG93LlxuICAgICAqICEjemgg6I635Y+W6KeG5Zu+55qE5aSn5bCP77yM5Lul54K55Li65Y2V5L2N44CCXG4gICAgICogQG1ldGhvZCBnZXRXaW5TaXplXG4gICAgICogQHJldHVybiB7U2l6ZX1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgZ2V0V2luU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZShjYy53aW5TaXplKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHNpemUgb2YgdGhlIE9wZW5HTCB2aWV3IGluIHBpeGVscy48YnIvPlxuICAgICAqIEl0IHRha2VzIGludG8gYWNjb3VudCBhbnkgcG9zc2libGUgcm90YXRpb24gKGRldmljZSBvcmllbnRhdGlvbikgb2YgdGhlIHdpbmRvdy48YnIvPlxuICAgICAqIE9uIE1hYyB3aW5TaXplIGFuZCB3aW5TaXplSW5QaXhlbHMgcmV0dXJuIHRoZSBzYW1lIHZhbHVlLlxuICAgICAqIChUaGUgcGl4ZWwgaGVyZSByZWZlcnMgdG8gdGhlIHJlc291cmNlIHJlc29sdXRpb24uIElmIHlvdSB3YW50IHRvIGdldCB0aGUgcGh5c2ljcyByZXNvbHV0aW9uIG9mIGRldmljZSwgeW91IG5lZWQgdG8gdXNlIGNjLnZpZXcuZ2V0RnJhbWVTaXplKCkpXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluinhuWbvuWkp+Wwj++8jOS7peWDj+e0oOS4uuWNleS9je+8iOi/memHjOeahOWDj+e0oOaMh+eahOaYr+i1hOa6kOWIhui+qOeOh+OAglxuICAgICAqIOWmguaenOimgeiOt+WPluWxj+W5leeJqeeQhuWIhui+qOeOh++8jOmcgOimgeeUqCBjYy52aWV3LmdldEZyYW1lU2l6ZSgp77yJXG4gICAgICogQG1ldGhvZCBnZXRXaW5TaXplSW5QaXhlbHNcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBnZXRXaW5TaXplSW5QaXhlbHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUoY2Mud2luU2l6ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgdGhlIGRpcmVjdG9yJ3MgdGlja2VyLCBvbmx5IGludm9sdmUgdGhlIGdhbWUgbG9naWMgZXhlY3V0aW9uLlxuICAgICAqIEl0IHdvbid0IHBhdXNlIHRoZSByZW5kZXJpbmcgcHJvY2VzcyBub3IgdGhlIGV2ZW50IG1hbmFnZXIuXG4gICAgICogSWYgeW91IHdhbnQgdG8gcGF1c2UgdGhlIGVudGllciBnYW1lIGluY2x1ZGluZyByZW5kZXJpbmcsIGF1ZGlvIGFuZCBldmVudCxcbiAgICAgKiBwbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkdhbWUucGF1c2VcIn19Y2MuZ2FtZS5wYXVzZXt7L2Nyb3NzTGlua319XG4gICAgICogISN6aCDmmoLlgZzmraPlnKjov5DooYznmoTlnLrmma/vvIzor6XmmoLlgZzlj6rkvJrlgZzmraLmuLjmiI/pgLvovpHmiafooYzvvIzkvYbmmK/kuI3kvJrlgZzmraLmuLLmn5PlkowgVUkg5ZON5bqU44CCXG4gICAgICog5aaC5p6c5oOz6KaB5pu05b275bqV5b6X5pqC5YGc5ri45oiP77yM5YyF5ZCr5riy5p+T77yM6Z+z6aKR5ZKM5LqL5Lu277yM6K+35L2/55SoIHt7I2Nyb3NzTGluayBcIkdhbWUucGF1c2VcIn19Y2MuZ2FtZS5wYXVzZXt7L2Nyb3NzTGlua31944CCXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXVzZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY2FjaGVkIGFsbCBjb2NvczJkIGNhY2hlZCBkYXRhLlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBwdXJnZUNhY2hlZERhdGE6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBbGwoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHVyZ2UgdGhlIGNjLmRpcmVjdG9yIGl0c2VsZiwgaW5jbHVkaW5nIHVuc2NoZWR1bGUgYWxsIHNjaGVkdWxlLCByZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVycywgY2xlYW4gdXAgYW5kIGV4aXQgdGhlIHJ1bm5pbmcgc2NlbmUsIHN0b3BzIGFsbCBhbmltYXRpb25zLCBjbGVhciBjYWNoZWQgZGF0YS5cbiAgICAgKi9cbiAgICBwdXJnZURpcmVjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vY2xlYW51cCBzY2hlZHVsZXJcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnVuc2NoZWR1bGVBbGwoKTtcbiAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci51bnNjaGVkdWxlQWxsKCk7XG5cbiAgICAgICAgdGhpcy5fbm9kZUFjdGl2YXRvci5yZXNldCgpO1xuXG4gICAgICAgIC8vIERpc2FibGUgZXZlbnQgZGlzcGF0Y2hpbmdcbiAgICAgICAgaWYgKGV2ZW50TWFuYWdlcilcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5zZXRFbmFibGVkKGZhbHNlKTtcblxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5fc2NlbmUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NlbmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2NlbmUgPSBudWxsO1xuXG4gICAgICAgICAgICBjYy5yZW5kZXJlci5jbGVhcigpO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmJ1aWx0aW5zLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG5cbiAgICAgICAgLy8gQ2xlYXIgYWxsIGNhY2hlc1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFsbCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgY2MuZGlyZWN0b3IsIGNhbiBiZSB1c2VkIHRvIHJlc3RhcnQgdGhlIGRpcmVjdG9yIGFmdGVyIHB1cmdlXG4gICAgICovXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wdXJnZURpcmVjdG9yKCk7XG5cbiAgICAgICAgaWYgKGV2ZW50TWFuYWdlcilcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5zZXRFbmFibGVkKHRydWUpO1xuXG4gICAgICAgIC8vIEFjdGlvbiBtYW5hZ2VyXG4gICAgICAgIGlmICh0aGlzLl9hY3Rpb25NYW5hZ2VyKXtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hY3Rpb25NYW5hZ2VyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBbmltYXRpb24gbWFuYWdlclxuICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uTWFuYWdlcikge1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlVXBkYXRlKHRoaXMuX2FuaW1hdGlvbk1hbmFnZXIsIGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbGxpZGVyIG1hbmFnZXJcbiAgICAgICAgaWYgKHRoaXMuX2NvbGxpc2lvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9jb2xsaXNpb25NYW5hZ2VyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQaHlzaWNzIG1hbmFnZXJcbiAgICAgICAgaWYgKHRoaXMuX3BoeXNpY3NNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGVVcGRhdGUodGhpcy5fcGh5c2ljc01hbmFnZXIsIGNjLlNjaGVkdWxlci5QUklPUklUWV9TWVNURU0sIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSdW4gYSBzY2VuZS4gUmVwbGFjZXMgdGhlIHJ1bm5pbmcgc2NlbmUgd2l0aCBhIG5ldyBvbmUgb3IgZW50ZXIgdGhlIGZpcnN0IHNjZW5lLjxici8+XG4gICAgICogVGhlIG5ldyBzY2VuZSB3aWxsIGJlIGxhdW5jaGVkIGltbWVkaWF0ZWx5LlxuICAgICAqICEjemgg56uL5Yi75YiH5o2i5oyH5a6a5Zy65pmv44CCXG4gICAgICogQG1ldGhvZCBydW5TY2VuZUltbWVkaWF0ZVxuICAgICAqIEBwYXJhbSB7U2NlbmV8U2NlbmVBc3NldH0gc2NlbmUgLSBUaGUgbmVlZCBydW4gc2NlbmUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQmVmb3JlTG9hZFNjZW5lXSAtIFRoZSBmdW5jdGlvbiBpbnZva2VkIGF0IHRoZSBzY2VuZSBiZWZvcmUgbG9hZGluZy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25MYXVuY2hlZF0gLSBUaGUgZnVuY3Rpb24gaW52b2tlZCBhdCB0aGUgc2NlbmUgYWZ0ZXIgbGF1bmNoLlxuICAgICAqL1xuICAgIHJ1blNjZW5lSW1tZWRpYXRlOiBmdW5jdGlvbiAoc2NlbmUsIG9uQmVmb3JlTG9hZFNjZW5lLCBvbkxhdW5jaGVkKSB7XG4gICAgICAgIGNjLmFzc2VydElEKHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmUgfHwgc2NlbmUgaW5zdGFuY2VvZiBjYy5TY2VuZUFzc2V0LCAxMjE2KTtcblxuICAgICAgICBpZiAoc2NlbmUgaW5zdGFuY2VvZiBjYy5TY2VuZUFzc2V0KSBzY2VuZSA9IHNjZW5lLnNjZW5lO1xuXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnSW5pdFNjZW5lJyk7XG4gICAgICAgIHNjZW5lLl9sb2FkKCk7ICAvLyBlbnN1cmUgc2NlbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdJbml0U2NlbmUnKTtcblxuICAgICAgICAvLyBSZS1hdHRhY2ggb3IgcmVwbGFjZSBwZXJzaXN0IG5vZGVzXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnQXR0YWNoUGVyc2lzdCcpO1xuICAgICAgICB2YXIgcGVyc2lzdE5vZGVMaXN0ID0gT2JqZWN0LmtleXMoZ2FtZS5fcGVyc2lzdFJvb3ROb2RlcykubWFwKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZS5fcGVyc2lzdFJvb3ROb2Rlc1t4XTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGVyc2lzdE5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHBlcnNpc3ROb2RlTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBleGlzdE5vZGUgPSBzY2VuZS5nZXRDaGlsZEJ5VXVpZChub2RlLnV1aWQpO1xuICAgICAgICAgICAgaWYgKGV4aXN0Tm9kZSkge1xuICAgICAgICAgICAgICAgIC8vIHNjZW5lIGFsc28gY29udGFpbnMgdGhlIHBlcnNpc3Qgbm9kZSwgc2VsZWN0IHRoZSBvbGQgb25lXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXhpc3ROb2RlLmdldFNpYmxpbmdJbmRleCgpO1xuICAgICAgICAgICAgICAgIGV4aXN0Tm9kZS5fZGVzdHJveUltbWVkaWF0ZSgpO1xuICAgICAgICAgICAgICAgIHNjZW5lLmluc2VydENoaWxkKG5vZGUsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gc2NlbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdBdHRhY2hQZXJzaXN0Jyk7XG5cbiAgICAgICAgdmFyIG9sZFNjZW5lID0gdGhpcy5fc2NlbmU7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAvLyBhdXRvIHJlbGVhc2UgYXNzZXRzXG4gICAgICAgICAgICBDQ19CVUlMRCAmJiBDQ19ERUJVRyAmJiBjb25zb2xlLnRpbWUoJ0F1dG9SZWxlYXNlJyk7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuX3JlbGVhc2VNYW5hZ2VyLl9hdXRvUmVsZWFzZShvbGRTY2VuZSwgc2NlbmUsIGdhbWUuX3BlcnNpc3RSb290Tm9kZXMpO1xuICAgICAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdBdXRvUmVsZWFzZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5sb2FkIHNjZW5lXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnRGVzdHJveScpO1xuICAgICAgICBpZiAoY2MuaXNWYWxpZChvbGRTY2VuZSkpIHtcbiAgICAgICAgICAgIG9sZFNjZW5lLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NjZW5lID0gbnVsbDtcblxuICAgICAgICAvLyBwdXJnZSBkZXN0cm95ZWQgbm9kZXMgYmVsb25ncyB0byBvbGQgc2NlbmVcbiAgICAgICAgT2JqLl9kZWZlcnJlZERlc3Ryb3koKTtcbiAgICAgICAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcgJiYgY29uc29sZS50aW1lRW5kKCdEZXN0cm95Jyk7XG5cbiAgICAgICAgaWYgKG9uQmVmb3JlTG9hZFNjZW5lKSB7XG4gICAgICAgICAgICBvbkJlZm9yZUxvYWRTY2VuZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNILCBzY2VuZSk7XG5cbiAgICAgICAgLy8gUnVuIGFuIEVudGl0eSBTY2VuZVxuICAgICAgICB0aGlzLl9zY2VuZSA9IHNjZW5lO1xuXG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZSgnQWN0aXZhdGUnKTtcbiAgICAgICAgc2NlbmUuX2FjdGl2YXRlKCk7XG4gICAgICAgIENDX0JVSUxEICYmIENDX0RFQlVHICYmIGNvbnNvbGUudGltZUVuZCgnQWN0aXZhdGUnKTtcblxuICAgICAgICAvL3N0YXJ0IHNjZW5lXG4gICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG5cbiAgICAgICAgaWYgKG9uTGF1bmNoZWQpIHtcbiAgICAgICAgICAgIG9uTGF1bmNoZWQobnVsbCwgc2NlbmUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0gsIHNjZW5lKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJ1biBhIHNjZW5lLiBSZXBsYWNlcyB0aGUgcnVubmluZyBzY2VuZSB3aXRoIGEgbmV3IG9uZSBvciBlbnRlciB0aGUgZmlyc3Qgc2NlbmUuXG4gICAgICogVGhlIG5ldyBzY2VuZSB3aWxsIGJlIGxhdW5jaGVkIGF0IHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgZnJhbWUuXG4gICAgICogISN6aCDov5DooYzmjIflrprlnLrmma/jgIJcbiAgICAgKiBAbWV0aG9kIHJ1blNjZW5lXG4gICAgICogQHBhcmFtIHtTY2VuZXxTY2VuZUFzc2V0fSBzY2VuZSAtIFRoZSBuZWVkIHJ1biBzY2VuZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25CZWZvcmVMb2FkU2NlbmVdIC0gVGhlIGZ1bmN0aW9uIGludm9rZWQgYXQgdGhlIHNjZW5lIGJlZm9yZSBsb2FkaW5nLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxhdW5jaGVkXSAtIFRoZSBmdW5jdGlvbiBpbnZva2VkIGF0IHRoZSBzY2VuZSBhZnRlciBsYXVuY2guXG4gICAgICovXG4gICAgcnVuU2NlbmU6IGZ1bmN0aW9uIChzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUsIG9uTGF1bmNoZWQpIHtcbiAgICAgICAgY2MuYXNzZXJ0SUQoc2NlbmUsIDEyMDUpO1xuICAgICAgICBjYy5hc3NlcnRJRChzY2VuZSBpbnN0YW5jZW9mIGNjLlNjZW5lIHx8IHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCwgMTIxNik7XG5cbiAgICAgICAgaWYgKHNjZW5lIGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkgc2NlbmUgPSBzY2VuZS5zY2VuZTtcbiAgICAgICAgLy8gZW5zdXJlIHNjZW5lIGluaXRpYWxpemVkXG4gICAgICAgIHNjZW5lLl9sb2FkKCk7XG5cbiAgICAgICAgLy8gRGVsYXkgcnVuIC8gcmVwbGFjZSBzY2VuZSB0byB0aGUgZW5kIG9mIHRoZSBmcmFtZVxuICAgICAgICB0aGlzLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ydW5TY2VuZUltbWVkaWF0ZShzY2VuZSwgb25CZWZvcmVMb2FkU2NlbmUsIG9uTGF1bmNoZWQpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBMb2FkcyB0aGUgc2NlbmUgYnkgaXRzIG5hbWUuXG4gICAgICogISN6aCDpgJrov4flnLrmma/lkI3np7Dov5vooYzliqDovb3lnLrmma/jgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgbG9hZFNjZW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBsb2FkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkxhdW5jaGVkXSAtIGNhbGxiYWNrLCB3aWxsIGJlIGNhbGxlZCBhZnRlciBzY2VuZSBsYXVuY2hlZC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBpZiBlcnJvciwgcmV0dXJuIGZhbHNlXG4gICAgICovXG4gICAgbG9hZFNjZW5lOiBmdW5jdGlvbiAoc2NlbmVOYW1lLCBvbkxhdW5jaGVkLCBfb25VbmxvYWRlZCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ1NjZW5lKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoMTIwOCwgc2NlbmVOYW1lLCB0aGlzLl9sb2FkaW5nU2NlbmUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBidW5kbGUuZ2V0U2NlbmVJbmZvKHNjZW5lTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYnVuZGxlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkcsIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9sb2FkaW5nU2NlbmUgPSBzY2VuZU5hbWU7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zb2xlLnRpbWUoJ0xvYWRTY2VuZSAnICsgc2NlbmVOYW1lKTtcbiAgICAgICAgICAgIGJ1bmRsZS5sb2FkU2NlbmUoc2NlbmVOYW1lLCBmdW5jdGlvbiAoZXJyLCBzY2VuZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUudGltZUVuZCgnTG9hZFNjZW5lICcgKyBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRpbmdTY2VuZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyID0gJ0ZhaWxlZCB0byBsb2FkIHNjZW5lOiAnICsgZXJyO1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBvbkxhdW5jaGVkICYmIG9uTGF1bmNoZWQoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucnVuU2NlbmVJbW1lZGlhdGUoc2NlbmUsIF9vblVubG9hZGVkLCBvbkxhdW5jaGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxMjA5LCBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJlbG9hZHMgdGhlIHNjZW5lIHRvIHJlZHVjZXMgbG9hZGluZyB0aW1lLiBZb3UgY2FuIGNhbGwgdGhpcyBtZXRob2QgYXQgYW55IHRpbWUgeW91IHdhbnQuXG4gICAgICogQWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCwgeW91IHN0aWxsIG5lZWQgdG8gbGF1bmNoIHRoZSBzY2VuZSBieSBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYC5cbiAgICAgKiBJdCB3aWxsIGJlIHRvdGFsbHkgZmluZSB0byBjYWxsIGBjYy5kaXJlY3Rvci5sb2FkU2NlbmVgIGF0IGFueSB0aW1lIGV2ZW4gaWYgdGhlIHByZWxvYWRpbmcgaXMgbm90XG4gICAgICogeWV0IGZpbmlzaGVkLCB0aGUgc2NlbmUgd2lsbCBiZSBsYXVuY2hlZCBhZnRlciBsb2FkZWQgYXV0b21hdGljYWxseS5cbiAgICAgKiAhI3poIOmihOWKoOi9veWcuuaZr++8jOS9oOWPr+S7peWcqOS7u+S9leaXtuWAmeiwg+eUqOi/meS4quaWueazleOAglxuICAgICAqIOiwg+eUqOWujOWQju+8jOS9oOS7jeeEtumcgOimgemAmui/hyBgY2MuZGlyZWN0b3IubG9hZFNjZW5lYCDmnaXlkK/liqjlnLrmma/vvIzlm6DkuLrov5nkuKrmlrnms5XkuI3kvJrmiafooYzlnLrmma/liqDovb3mk43kvZzjgIJcbiAgICAgKiDlsLHnrpfpooTliqDovb3ov5jmsqHlrozmiJDvvIzkvaDkuZ/lj6/ku6Xnm7TmjqXosIPnlKggYGNjLmRpcmVjdG9yLmxvYWRTY2VuZWDvvIzliqDovb3lrozmiJDlkI7lnLrmma/lsLHkvJrlkK/liqjjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgcHJlbG9hZFNjZW5lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzY2VuZSB0byBwcmVsb2FkLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvblByb2dyZXNzXSAtIGNhbGxiYWNrLCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBsb2FkIHByb2dyZXNzaW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25Qcm9ncmVzcy5jb21wbGV0ZWRDb3VudCAtIFRoZSBudW1iZXIgb2YgdGhlIGl0ZW1zIHRoYXQgYXJlIGFscmVhZHkgY29tcGxldGVkXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9uUHJvZ3Jlc3MudG90YWxDb3VudCAtIFRoZSB0b3RhbCBudW1iZXIgb2YgdGhlIGl0ZW1zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9uUHJvZ3Jlc3MuaXRlbSAtIFRoZSBsYXRlc3QgaXRlbSB3aGljaCBmbG93IG91dCB0aGUgcGlwZWxpbmVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Mb2FkZWRdIC0gY2FsbGJhY2ssIHdpbGwgYmUgY2FsbGVkIGFmdGVyIHNjZW5lIGxvYWRlZC5cbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkxvYWRlZC5lcnJvciAtIG51bGwgb3IgdGhlIGVycm9yIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcmVsb2FkU2NlbmUgKHNjZW5lTmFtZSwgb25Qcm9ncmVzcywgb25Mb2FkZWQpIHtcbiAgICAgICAgdmFyIGJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5idW5kbGVzLmZpbmQoZnVuY3Rpb24gKGJ1bmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZS5nZXRTY2VuZUluZm8oc2NlbmVOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChidW5kbGUpIHtcbiAgICAgICAgICAgIGJ1bmRsZS5wcmVsb2FkU2NlbmUoc2NlbmVOYW1lLCBudWxsLCBvblByb2dyZXNzLCBvbkxvYWRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDEyMDksIHNjZW5lTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIGdhbWUgbG9naWMgZXhlY3V0aW9uIGFmdGVyIHBhdXNlLCBpZiB0aGUgY3VycmVudCBzY2VuZSBpcyBub3QgcGF1c2VkLCBub3RoaW5nIHdpbGwgaGFwcGVuLlxuICAgICAqICEjemgg5oGi5aSN5pqC5YGc5Zy65pmv55qE5ri45oiP6YC76L6R77yM5aaC5p6c5b2T5YmN5Zy65pmv5rKh5pyJ5pqC5YGc5bCG5rKh5Lu75L2V5LqL5oOF5Y+R55Sf44CCXG4gICAgICogQG1ldGhvZCByZXN1bWVcbiAgICAgKi9cbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0VXBkYXRlKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCgxMjAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kZWx0YVRpbWUgPSAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRW5hYmxlcyBvciBkaXNhYmxlcyBXZWJHTCBkZXB0aCB0ZXN0Ljxici8+XG4gICAgICogSW1wbGVtZW50YXRpb24gY2FuIGJlIGZvdW5kIGluIENDRGlyZWN0b3JDYW52YXMuanMvQ0NEaXJlY3RvcldlYkdMLmpzXG4gICAgICogISN6aCDlkK/nlKgv56aB55So5rex5bqm5rWL6K+V77yI5ZyoIENhbnZhcyDmuLLmn5PmqKHlvI/kuIvkuI3kvJrnlJ/mlYjvvInjgIJcbiAgICAgKiBAbWV0aG9kIHNldERlcHRoVGVzdFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb25cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgc2V0RGVwdGhUZXN0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCFjYy5DYW1lcmEubWFpbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLkNhbWVyYS5tYWluLmRlcHRoID0gISF2YWx1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCBjb2xvciBmb3IgY2xlYXIgc2NyZWVuLjxici8+XG4gICAgICogKEltcGxlbWVudGF0aW9uIGNhbiBiZSBmb3VuZCBpbiBDQ0RpcmVjdG9yQ2FudmFzLmpzL0NDRGlyZWN0b3JXZWJHTC5qcylcbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5Zy65pmv55qE6buY6K6k5pOm6Zmk6aKc6Imy44CCPGJyLz5cbiAgICAgKiDmlK/mjIHlhajpgI/mmI7vvIzkvYbkuI3mlK/mjIHpgI/mmI7luqbkuLrkuK3pl7TlgLzjgILopoHmlK/mjIHlhajpgI/mmI7pnIDmiYvlt6XlvIDlkK8gY2MubWFjcm8uRU5BQkxFX1RSQU5TUEFSRU5UX0NBTlZBU+OAglxuICAgICAqIEBtZXRob2Qgc2V0Q2xlYXJDb2xvclxuICAgICAqIEBwYXJhbSB7Q29sb3J9IGNsZWFyQ29sb3JcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICovXG4gICAgc2V0Q2xlYXJDb2xvcjogZnVuY3Rpb24gKGNsZWFyQ29sb3IpIHtcbiAgICAgICAgaWYgKCFjYy5DYW1lcmEubWFpbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLkNhbWVyYS5tYWluLmJhY2tncm91bmRDb2xvciA9IGNsZWFyQ29sb3I7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBjdXJyZW50IGxvZ2ljIFNjZW5lLlxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6YC76L6R5Zy65pmv44CCXG4gICAgICogQG1ldGhvZCBnZXRSdW5uaW5nU2NlbmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEByZXR1cm4ge1NjZW5lfVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICBnZXRSdW5uaW5nU2NlbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjZW5lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgY3VycmVudCBsb2dpYyBTY2VuZS5cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjemAu+i+keWcuuaZr+OAglxuICAgICAqIEBtZXRob2QgZ2V0U2NlbmVcbiAgICAgKiBAcmV0dXJuIHtTY2VuZX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAvLyBUaGlzIHdpbGwgaGVscCB5b3UgdG8gZ2V0IHRoZSBDYW52YXMgbm9kZSBpbiBzY2VuZVxuICAgICAqICBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICAgKi9cbiAgICBnZXRTY2VuZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NlbmU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgRlBTIHZhbHVlLiBQbGVhc2UgdXNlIHt7I2Nyb3NzTGluayBcIkdhbWUuc2V0RnJhbWVSYXRlXCJ9fWNjLmdhbWUuc2V0RnJhbWVSYXRle3svY3Jvc3NMaW5rfX0gdG8gY29udHJvbCBhbmltYXRpb24gaW50ZXJ2YWwuXG4gICAgICogISN6aCDojrflj5bljZXkvY3luKfmiafooYzml7bpl7TjgILor7fkvb/nlKgge3sjY3Jvc3NMaW5rIFwiR2FtZS5zZXRGcmFtZVJhdGVcIn19Y2MuZ2FtZS5zZXRGcmFtZVJhdGV7ey9jcm9zc0xpbmt9fSDmnaXmjqfliLbmuLjmiI/luKfnjofjgIJcbiAgICAgKiBAbWV0aG9kIGdldEFuaW1hdGlvbkludGVydmFsXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRBbmltYXRpb25JbnRlcnZhbDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gMTAwMCAvIGdhbWUuZ2V0RnJhbWVSYXRlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYW5pbWF0aW9uIGludGVydmFsLCB0aGlzIGRvZXNuJ3QgY29udHJvbCB0aGUgbWFpbiBsb29wLlxuICAgICAqIFRvIGNvbnRyb2wgdGhlIGdhbWUncyBmcmFtZSByYXRlIG92ZXJhbGwsIHBsZWFzZSB1c2Uge3sjY3Jvc3NMaW5rIFwiR2FtZS5zZXRGcmFtZVJhdGVcIn19Y2MuZ2FtZS5zZXRGcmFtZVJhdGV7ey9jcm9zc0xpbmt9fVxuICAgICAqIEBtZXRob2Qgc2V0QW5pbWF0aW9uSW50ZXJ2YWxcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVGhlIGFuaW1hdGlvbiBpbnRlcnZhbCBkZXNpcmVkLlxuICAgICAqL1xuICAgIHNldEFuaW1hdGlvbkludGVydmFsOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgZ2FtZS5zZXRGcmFtZVJhdGUoTWF0aC5yb3VuZCgxMDAwIC8gdmFsdWUpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBkZWx0YSB0aW1lIHNpbmNlIGxhc3QgZnJhbWUuXG4gICAgICogISN6aCDojrflj5bkuIrkuIDluKfnmoTlop7ph4/ml7bpl7TjgIJcbiAgICAgKiBAbWV0aG9kIGdldERlbHRhVGltZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXREZWx0YVRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlbHRhVGltZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSB0b3RhbCBwYXNzZWQgdGltZSBzaW5jZSBnYW1lIHN0YXJ0LCB1bml0OiBtc1xuICAgICAqICEjemgg6I635Y+W5LuO5ri45oiP5byA5aeL5Yiw546w5Zyo5oC75YWx57uP6L+H55qE5pe26Ze077yM5Y2V5L2N5Li6IG1zXG4gICAgICogQG1ldGhvZCBnZXRUb3RhbFRpbWVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VG90YWxUaW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGhvdyBtYW55IGZyYW1lcyB3ZXJlIGNhbGxlZCBzaW5jZSB0aGUgZGlyZWN0b3Igc3RhcnRlZC5cbiAgICAgKiAhI3poIOiOt+WPliBkaXJlY3RvciDlkK/liqjku6XmnaXmuLjmiI/ov5DooYznmoTmgLvluKfmlbDjgIJcbiAgICAgKiBAbWV0aG9kIGdldFRvdGFsRnJhbWVzXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRvdGFsRnJhbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbEZyYW1lcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBEaXJlY3RvciBpcyBwYXVzZWQuXG4gICAgICogISN6aCDmmK/lkKblpITkuo7mmoLlgZznirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIGlzUGF1c2VkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1BhdXNlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF1c2VkO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGNjLlNjaGVkdWxlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiOt+WPluWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuU2NoZWR1bGVy44CCXG4gICAgICogQG1ldGhvZCBnZXRTY2hlZHVsZXJcbiAgICAgKiBAcmV0dXJuIHtTY2hlZHVsZXJ9XG4gICAgICovXG4gICAgZ2V0U2NoZWR1bGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2hlZHVsZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgY2MuU2NoZWR1bGVyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6K6+572u5ZKMIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5TY2hlZHVsZXLjgIJcbiAgICAgKiBAbWV0aG9kIHNldFNjaGVkdWxlclxuICAgICAqIEBwYXJhbSB7U2NoZWR1bGVyfSBzY2hlZHVsZXJcbiAgICAgKi9cbiAgICBzZXRTY2hlZHVsZXI6IGZ1bmN0aW9uIChzY2hlZHVsZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NjaGVkdWxlciAhPT0gc2NoZWR1bGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjYy5BY3Rpb25NYW5hZ2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6I635Y+W5ZKMIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5BY3Rpb25NYW5hZ2Vy77yI5Yqo5L2c566h55CG5Zmo77yJ44CCXG4gICAgICogQG1ldGhvZCBnZXRBY3Rpb25NYW5hZ2VyXG4gICAgICogQHJldHVybiB7QWN0aW9uTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXRBY3Rpb25NYW5hZ2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25NYW5hZ2VyO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSBjYy5BY3Rpb25NYW5hZ2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpcmVjdG9yLlxuICAgICAqICEjemgg6K6+572u5ZKMIGRpcmVjdG9yIOebuOWFs+iBlOeahCBjYy5BY3Rpb25NYW5hZ2Vy77yI5Yqo5L2c566h55CG5Zmo77yJ44CCXG4gICAgICogQG1ldGhvZCBzZXRBY3Rpb25NYW5hZ2VyXG4gICAgICogQHBhcmFtIHtBY3Rpb25NYW5hZ2VyfSBhY3Rpb25NYW5hZ2VyXG4gICAgICovXG4gICAgc2V0QWN0aW9uTWFuYWdlcjogZnVuY3Rpb24gKGFjdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbk1hbmFnZXIgIT09IGFjdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3Rpb25NYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyLnVuc2NoZWR1bGVVcGRhdGUodGhpcy5fYWN0aW9uTWFuYWdlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25NYW5hZ2VyID0gYWN0aW9uTWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5zY2hlZHVsZVVwZGF0ZSh0aGlzLl9hY3Rpb25NYW5hZ2VyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGNjLkFuaW1hdGlvbk1hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDojrflj5blkowgZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLkFuaW1hdGlvbk1hbmFnZXLvvIjliqjnlLvnrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldEFuaW1hdGlvbk1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldEFuaW1hdGlvbk1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbk1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuQ29sbGlzaW9uTWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOiOt+WPluWSjCBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuQ29sbGlzaW9uTWFuYWdlciDvvIjnorDmkp7nrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldENvbGxpc2lvbk1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtDb2xsaXNpb25NYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldENvbGxpc2lvbk1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxpc2lvbk1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuUGh5c2ljc01hbmFnZXIgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlyZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57kuI4gZGlyZWN0b3Ig55u45YWz6IGU55qEIGNjLlBoeXNpY3NNYW5hZ2VyIO+8iOeJqeeQhueuoeeQhuWZqO+8ieOAglxuICAgICAqIEBtZXRob2QgZ2V0UGh5c2ljc01hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtQaHlzaWNzTWFuYWdlcn1cbiAgICAgKi9cbiAgICBnZXRQaHlzaWNzTWFuYWdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGh5c2ljc01hbmFnZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgY2MuUGh5c2ljczNETWFuYWdlciBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaXJlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuS4jiBkaXJlY3RvciDnm7jlhbPogZTnmoQgY2MuUGh5c2ljczNETWFuYWdlciDvvIjniannkIbnrqHnkIblmajvvInjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBoeXNpY3MzRE1hbmFnZXJcbiAgICAgKiBAcmV0dXJuIHtQaHlzaWNzM0RNYW5hZ2VyfVxuICAgICAqL1xuICAgIGdldFBoeXNpY3MzRE1hbmFnZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BoeXNpY3MzRE1hbmFnZXI7XG4gICAgfSxcblxuICAgIC8vIExvb3AgbWFuYWdlbWVudFxuICAgIC8qXG4gICAgICogU3RhcnRzIEFuaW1hdGlvblxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMlxuICAgICAqL1xuICAgIHN0YXJ0QW5pbWF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmdhbWUucmVzdW1lKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU3RvcHMgYW5pbWF0aW9uXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4yXG4gICAgICovXG4gICAgc3RvcEFuaW1hdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5nYW1lLnBhdXNlKCk7XG4gICAgfSxcblxuICAgIF9yZXNldERlbHRhVGltZSAoKSB7XG4gICAgICAgIHRoaXMuX2xhc3RVcGRhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gMDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBSdW4gbWFpbiBsb29wIG9mIGRpcmVjdG9yXG4gICAgICovXG4gICAgbWFpbkxvb3A6IENDX0VESVRPUiA/IGZ1bmN0aW9uIChkZWx0YVRpbWUsIHVwZGF0ZUFuaW1hdGUpIHtcbiAgICAgICAgdGhpcy5fZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuXG4gICAgICAgIC8vIFVwZGF0ZVxuICAgICAgICBpZiAoIXRoaXMuX3BhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEUpO1xuXG4gICAgICAgICAgICB0aGlzLl9jb21wU2NoZWR1bGVyLnN0YXJ0UGhhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIudXBkYXRlUGhhc2UoZGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgaWYgKHVwZGF0ZUFuaW1hdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIubGF0ZVVwZGF0ZVBoYXNlKGRlbHRhVGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyXG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyk7XG4gICAgICAgIHJlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSwgZGVsdGFUaW1lKTtcblxuICAgICAgICAvLyBBZnRlciBkcmF3XG4gICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXKTtcblxuICAgICAgICB0aGlzLl90b3RhbEZyYW1lcysrO1xuXG4gICAgfSA6IGZ1bmN0aW9uIChub3cpIHtcbiAgICAgICAgaWYgKHRoaXMuX3B1cmdlRGlyZWN0b3JJbk5leHRMb29wKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXJnZURpcmVjdG9ySW5OZXh0TG9vcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wdXJnZURpcmVjdG9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgXCJnbG9iYWxcIiBkdFxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVEZWx0YVRpbWUobm93KTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3BhdXNlZCkge1xuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSB1cGRhdGVcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1VQREFURSk7XG5cbiAgICAgICAgICAgICAgICAvLyBDYWxsIHN0YXJ0IGZvciBuZXcgYWRkZWQgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIuc3RhcnRQaGFzZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGZvciBjb21wb25lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcFNjaGVkdWxlci51cGRhdGVQaGFzZSh0aGlzLl9kZWx0YVRpbWUpO1xuICAgICAgICAgICAgICAgIC8vIEVuZ2luZSB1cGRhdGUgd2l0aCBzY2hlZHVsZXJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIudXBkYXRlKHRoaXMuX2RlbHRhVGltZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBMYXRlIHVwZGF0ZSBmb3IgY29tcG9uZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbXBTY2hlZHVsZXIubGF0ZVVwZGF0ZVBoYXNlKHRoaXMuX2RlbHRhVGltZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBVc2VyIGNhbiB1c2UgdGhpcyBldmVudCB0byBkbyB0aGluZ3MgYWZ0ZXIgdXBkYXRlXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSk7XG5cbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IGVudGl0aWVzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQgcmVjZW50bHlcbiAgICAgICAgICAgICAgICBPYmouX2RlZmVycmVkRGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSZW5kZXJcbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5fc2NlbmUsIHRoaXMuX2RlbHRhVGltZSk7XG5cbiAgICAgICAgICAgIC8vIEFmdGVyIGRyYXdcbiAgICAgICAgICAgIHRoaXMuZW1pdChjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXKTtcblxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmZyYW1lVXBkYXRlTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLl90b3RhbEZyYW1lcysrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9fZmFzdE9uOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgICAgICB0aGlzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICBfX2Zhc3RPZmY6IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMub2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH0sXG5cblxufTtcblxuLy8gRXZlbnQgdGFyZ2V0XG5jYy5qcy5hZGRvbihjYy5EaXJlY3Rvci5wcm90b3R5cGUsIEV2ZW50VGFyZ2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgcHJvamVjdGlvbiBjaGFuZ2VkIG9mIGNjLkRpcmVjdG9yLiBUaGlzIGV2ZW50IHdpbGwgbm90IGdldCB0cmlnZ2VyZWQgc2luY2UgdjIuMFxuICogISN6aCBjYy5EaXJlY3RvciDmipXlvbHlj5jljJbnmoTkuovku7bjgILku44gdjIuMCDlvIDlp4vov5nkuKrkuovku7bkuI3kvJrlho3ooqvop6blj5FcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9QUk9KRUNUSU9OX0NIQU5HRURcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9QUk9KRUNUSU9OX0NIQU5HRUQgPSBcImRpcmVjdG9yX3Byb2plY3Rpb25fY2hhbmdlZFwiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSBsb2FkaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDliqDovb3mlrDlnLrmma/kuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTE9BRElOR1xuICogQHBhcmFtIHtTdHJpbmd9IHNjZW5lTmFtZSAtIFRoZSBsb2FkaW5nIHNjZW5lIG5hbWVcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgbG9hZGluZyBhIG5ldyBzY2VuZS5cbiAqICEjemgg5Yqg6L295paw5Zy65pmv5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQkVGT1JFX1NDRU5FX0xPQURJTkdcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTE9BRElORyA9IFwiZGlyZWN0b3JfYmVmb3JlX3NjZW5lX2xvYWRpbmdcIjtcblxuLypcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSBsYXVuY2hpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOi/kOihjOaWsOWcuuaZr+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0hcbiAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBOZXcgc2NlbmUgd2hpY2ggd2lsbCBiZSBsYXVuY2hlZFxuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGJlZm9yZSBsYXVuY2hpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOi/kOihjOaWsOWcuuaZr+S5i+WJjeaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0JFRk9SRV9TQ0VORV9MQVVOQ0hcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfU0NFTkVfTEFVTkNIID0gXCJkaXJlY3Rvcl9iZWZvcmVfc2NlbmVfbGF1bmNoXCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgbGF1bmNoaW5nIGEgbmV3IHNjZW5lLlxuICogISN6aCDov5DooYzmlrDlnLrmma/kuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9TQ0VORV9MQVVOQ0hcbiAqIEBwYXJhbSB7U3RyaW5nfSBzY2VuZU5hbWUgLSBOZXcgc2NlbmUgd2hpY2ggaXMgbGF1bmNoZWRcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBsYXVuY2hpbmcgYSBuZXcgc2NlbmUuXG4gKiAhI3poIOi/kOihjOaWsOWcuuaZr+S5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0FGVEVSX1NDRU5FX0xBVU5DSFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1NDRU5FX0xBVU5DSCA9IFwiZGlyZWN0b3JfYWZ0ZXJfc2NlbmVfbGF1bmNoXCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBldmVyeSBmcmFtZS5cbiAqICEjemgg5q+P5Liq5bin55qE5byA5aeL5pe25omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1VQREFURVxuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgZXZlcnkgZnJhbWUuXG4gKiAhI3poIOavj+S4quW4p+eahOW8gOWni+aXtuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0JFRk9SRV9VUERBVEVcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfVVBEQVRFID0gXCJkaXJlY3Rvcl9iZWZvcmVfdXBkYXRlXCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgZW5naW5lIGFuZCBjb21wb25lbnRzIHVwZGF0ZSBsb2dpYy5cbiAqICEjemgg5bCG5Zyo5byV5pOO5ZKM57uE5Lu2IOKAnHVwZGF0ZeKAnSDpgLvovpHkuYvlkI7miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBldmVudCBjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEVcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBlbmdpbmUgYW5kIGNvbXBvbmVudHMgdXBkYXRlIGxvZ2ljLlxuICogISN6aCDlsIblnKjlvJXmk47lkoznu4Tku7Yg4oCcdXBkYXRl4oCdIOmAu+i+keS5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0FGVEVSX1VQREFURVxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSA9IFwiZGlyZWN0b3JfYWZ0ZXJfdXBkYXRlXCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4wLCBwbGVhc2UgdXNlIGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXIGluc3RlYWRcbiAqICEjemgg6L+Z5Liq5LqL5Lu25LuOIHYyLjAg5byA5aeL6KKr5bqf5byD77yM6K+355u05o6l5L2/55SoIGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQkVGT1JFX1ZJU0lUXG4gKiBAcmVhZG9ubHlcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1ZJU0lUID0gXCJkaXJlY3Rvcl9iZWZvcmVfZHJhd1wiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMCwgcGxlYXNlIHVzZSBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVyBpbnN0ZWFkXG4gKiAhI3poIOi/meS4quS6i+S7tuS7jiB2Mi4wIOW8gOWni+iiq+W6n+W8g++8jOivt+ebtOaOpeS9v+eUqCBjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBV1xuICogQHByb3BlcnR5IHtTdHJpbmd9IEVWRU5UX0FGVEVSX1ZJU0lUXG4gKiBAcmVhZG9ubHlcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEBzdGF0aWNcbiAqL1xuY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVklTSVQgPSBcImRpcmVjdG9yX2JlZm9yZV9kcmF3XCI7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgd2hpY2ggd2lsbCBiZSB0cmlnZ2VyZWQgYmVmb3JlIHRoZSByZW5kZXJpbmcgcHJvY2Vzcy5cbiAqICEjemgg5riy5p+T6L+H56iL5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVdcbiAqL1xuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgdGhlIHJlbmRlcmluZyBwcm9jZXNzLlxuICogISN6aCDmuLLmn5Pov4fnqIvkuYvliY3miYDop6blj5HnmoTkuovku7bjgIJcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFVkVOVF9CRUZPUkVfRFJBV1xuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9EUkFXID0gXCJkaXJlY3Rvcl9iZWZvcmVfZHJhd1wiO1xuXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIHRoZSByZW5kZXJpbmcgcHJvY2Vzcy5cbiAqICEjemgg5riy5p+T6L+H56iL5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBV1xuICovXG4vKipcbiAqICEjZW4gVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIHRoZSByZW5kZXJpbmcgcHJvY2Vzcy5cbiAqICEjemgg5riy5p+T6L+H56iL5LmL5ZCO5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAcHJvcGVydHkge1N0cmluZ30gRVZFTlRfQUZURVJfRFJBV1xuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKi9cbmNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX0RSQVcgPSBcImRpcmVjdG9yX2FmdGVyX2RyYXdcIjtcblxuLy9Qb3NzaWJsZSBPcGVuR0wgcHJvamVjdGlvbnMgdXNlZCBieSBkaXJlY3RvclxuXG4vKipcbiAqIENvbnN0YW50IGZvciAyRCBwcm9qZWN0aW9uIChvcnRob2dvbmFsIHByb2plY3Rpb24pXG4gKiBAcHJvcGVydHkge051bWJlcn0gUFJPSkVDVElPTl8yRFxuICogQGRlZmF1bHQgMFxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKi9cbmNjLkRpcmVjdG9yLlBST0pFQ1RJT05fMkQgPSAwO1xuXG4vKipcbiAqIENvbnN0YW50IGZvciAzRCBwcm9qZWN0aW9uIHdpdGggYSBmb3Z5PTYwLCB6bmVhcj0wLjVmIGFuZCB6ZmFyPTE1MDAuXG4gKiBAcHJvcGVydHkge051bWJlcn0gUFJPSkVDVElPTl8zRFxuICogQGRlZmF1bHQgMVxuICogQHJlYWRvbmx5XG4gKiBAc3RhdGljXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKi9cbmNjLkRpcmVjdG9yLlBST0pFQ1RJT05fM0QgPSAxO1xuXG4vKipcbiAqIENvbnN0YW50IGZvciBjdXN0b20gcHJvamVjdGlvbiwgaWYgY2MuRGlyZWN0b3IncyBwcm9qZWN0aW9uIHNldCB0byBpdCwgaXQgY2FsbHMgXCJ1cGRhdGVQcm9qZWN0aW9uXCIgb24gdGhlIHByb2plY3Rpb24gZGVsZWdhdGUuXG4gKiBAcHJvcGVydHkge051bWJlcn0gUFJPSkVDVElPTl9DVVNUT01cbiAqIEBkZWZhdWx0IDNcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICovXG5jYy5EaXJlY3Rvci5QUk9KRUNUSU9OX0NVU1RPTSA9IDM7XG5cbi8qKlxuICogQ29uc3RhbnQgZm9yIGRlZmF1bHQgcHJvamVjdGlvbiBvZiBjYy5EaXJlY3RvciwgZGVmYXVsdCBwcm9qZWN0aW9uIGlzIDJEIHByb2plY3Rpb25cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUk9KRUNUSU9OX0RFRkFVTFRcbiAqIEBkZWZhdWx0IGNjLkRpcmVjdG9yLlBST0pFQ1RJT05fMkRcbiAqIEByZWFkb25seVxuICogQHN0YXRpY1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICovXG5jYy5EaXJlY3Rvci5QUk9KRUNUSU9OX0RFRkFVTFQgPSBjYy5EaXJlY3Rvci5QUk9KRUNUSU9OXzJEO1xuXG4vKipcbiAqIFRoZSBldmVudCB3aGljaCB3aWxsIGJlIHRyaWdnZXJlZCBiZWZvcmUgdGhlIHBoeXNpY3MgcHJvY2Vzcy48YnIvPlxuICog54mp55CG6L+H56iL5LmL5YmN5omA6Kem5Y+R55qE5LqL5Lu244CCXG4gKiBAZXZlbnQgRGlyZWN0b3IuRVZFTlRfQkVGT1JFX1BIWVNJQ1NcbiAqIEByZWFkb25seVxuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfUEhZU0lDUyA9ICdkaXJlY3Rvcl9iZWZvcmVfcGh5c2ljcyc7XG5cbi8qKlxuICogVGhlIGV2ZW50IHdoaWNoIHdpbGwgYmUgdHJpZ2dlcmVkIGFmdGVyIHRoZSBwaHlzaWNzIHByb2Nlc3MuPGJyLz5cbiAqIOeJqeeQhui/h+eoi+S5i+WQjuaJgOinpuWPkeeahOS6i+S7tuOAglxuICogQGV2ZW50IERpcmVjdG9yLkVWRU5UX0FGVEVSX1BIWVNJQ1NcbiAqIEByZWFkb25seVxuICovXG5jYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9QSFlTSUNTID0gJ2RpcmVjdG9yX2FmdGVyX3BoeXNpY3MnO1xuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gRGlyZWN0b3JcbiAqICEjemgg5a+85ryU57G744CCXG4gKiBAcHJvcGVydHkgZGlyZWN0b3JcbiAqIEB0eXBlIHtEaXJlY3Rvcn1cbiAqL1xuY2MuZGlyZWN0b3IgPSBuZXcgY2MuRGlyZWN0b3IoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy5kaXJlY3RvcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9