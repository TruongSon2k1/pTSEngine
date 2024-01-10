
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCGame.js';
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
var EventTarget = require('./event/event-target');

require('../audio/CCAudioEngine');

var debug = require('./CCDebug');

var renderer = require('./renderer/index.js');

var dynamicAtlasManager = require('../core/renderer/utils/dynamic-atlas/manager');
/**
 * @module cc
 */

/**
 * !#en An object to boot the game.
 * !#zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 * @class Game
 * @extends EventTarget
 */


var game = {
  /**
   * !#en Event triggered when game hide to background.
   * Please note that this event is not 100% guaranteed to be fired on Web platform,
   * on native platforms, it corresponds to enter background event, os status bar or notification center may not trigger this event.
   * !#zh 游戏进入后台时触发的事件。
   * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。
   * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为。
   * @property EVENT_HIDE
   * @type {String}
   * @example
   * cc.game.on(cc.game.EVENT_HIDE, function () {
   *     cc.audioEngine.pauseMusic();
   *     cc.audioEngine.pauseAllEffects();
   * });
   */
  EVENT_HIDE: "game_on_hide",

  /**
   * !#en Event triggered when game back to foreground
   * Please note that this event is not 100% guaranteed to be fired on Web platform,
   * on native platforms, it corresponds to enter foreground event.
   * !#zh 游戏进入前台运行时触发的事件。
   * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。
   * 在原生平台，它对应的是应用被切换到前台事件。
   * @property EVENT_SHOW
   * @constant
   * @type {String}
   */
  EVENT_SHOW: "game_on_show",

  /**
   * !#en Event triggered when game restart
   * !#zh 调用restart后，触发事件。
   * @property EVENT_RESTART
   * @constant
   * @type {String}
   */
  EVENT_RESTART: "game_on_restart",

  /**
   * Event triggered after game inited, at this point all engine objects and game scripts are loaded
   * @property EVENT_GAME_INITED
   * @constant
   * @type {String}
   */
  EVENT_GAME_INITED: "game_inited",

  /**
   * Event triggered after engine inited, at this point you will be able to use all engine classes.
   * It was defined as EVENT_RENDERER_INITED in cocos creator v1.x and renamed in v2.0
   * @property EVENT_ENGINE_INITED
   * @constant
   * @type {String}
   */
  EVENT_ENGINE_INITED: "engine_inited",
  // deprecated
  EVENT_RENDERER_INITED: "engine_inited",

  /**
   * Web Canvas 2d API as renderer backend
   * @property RENDER_TYPE_CANVAS
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_CANVAS: 0,

  /**
   * WebGL API as renderer backend
   * @property RENDER_TYPE_WEBGL
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_WEBGL: 1,

  /**
   * OpenGL API as renderer backend
   * @property RENDER_TYPE_OPENGL
   * @constant
   * @type {Number}
   */
  RENDER_TYPE_OPENGL: 2,
  _persistRootNodes: {},
  // states
  _paused: true,
  //whether the game is paused
  _configLoaded: false,
  //whether config loaded
  _isCloning: false,
  // deserializing or instantiating
  _prepared: false,
  //whether the engine has prepared
  _rendererInitialized: false,
  _renderContext: null,
  _intervalId: null,
  //interval target of main
  _lastTime: null,
  _frameTime: null,

  /**
   * !#en The outer frame of the game canvas, parent of game container.
   * !#zh 游戏画布的外框，container 的父容器。
   * @property frame
   * @type {Object}
   */
  frame: null,

  /**
   * !#en The container of game canvas.
   * !#zh 游戏画布的容器。
   * @property container
   * @type {HTMLDivElement}
   */
  container: null,

  /**
   * !#en The canvas of the game.
   * !#zh 游戏的画布。
   * @property canvas
   * @type {HTMLCanvasElement}
   */
  canvas: null,

  /**
   * !#en The renderer backend of the game.
   * !#zh 游戏的渲染器类型。
   * @property renderType
   * @type {Number}
   */
  renderType: -1,

  /**
   * !#en
   * The current game configuration, including:<br/>
   * 1. debugMode<br/>
   *      "debugMode" possible values :<br/>
   *      0 - No message will be printed.                                                      <br/>
   *      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.                      <br/>
   *      2 - cc.error, cc.assert, cc.warn will print in console.                              <br/>
   *      3 - cc.error, cc.assert will print in console.                                       <br/>
   *      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.<br/>
   *      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.        <br/>
   *      6 - cc.error, cc.assert will print on canvas, available only on web.                 <br/>
   * 2. showFPS<br/>
   *      Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.<br/>
   * 3. exposeClassName<br/>
   *      Expose class name to chrome debug tools, the class intantiate performance is a little bit slower when exposed.<br/>
   * 4. frameRate<br/>
   *      "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.<br/>
   * 5. id<br/>
   *      "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.<br/>
   * 6. renderMode<br/>
   *      "renderMode" sets the renderer type, only useful on web :<br/>
   *      0 - Automatically chosen by engine<br/>
   *      1 - Forced to use canvas renderer<br/>
   *      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers<br/>
   *<br/>
   * Please DO NOT modify this object directly, it won't have any effect.<br/>
   * !#zh
   * 当前的游戏配置，包括：                                                                  <br/>
   * 1. debugMode（debug 模式，但是在浏览器中这个选项会被忽略）                                <br/>
   *      "debugMode" 各种设置选项的意义。                                                   <br/>
   *          0 - 没有消息被打印出来。                                                       <br/>
   *          1 - cc.error，cc.assert，cc.warn，cc.log 将打印在 console 中。                  <br/>
   *          2 - cc.error，cc.assert，cc.warn 将打印在 console 中。                          <br/>
   *          3 - cc.error，cc.assert 将打印在 console 中。                                   <br/>
   *          4 - cc.error，cc.assert，cc.warn，cc.log 将打印在 canvas 中（仅适用于 web 端）。 <br/>
   *          5 - cc.error，cc.assert，cc.warn 将打印在 canvas 中（仅适用于 web 端）。         <br/>
   *          6 - cc.error，cc.assert 将打印在 canvas 中（仅适用于 web 端）。                  <br/>
   * 2. showFPS（显示 FPS）                                                            <br/>
   *      当 showFPS 为 true 的时候界面的左下角将显示 fps 的信息，否则被隐藏。              <br/>
   * 3. exposeClassName                                                           <br/>
   *      暴露类名让 Chrome DevTools 可以识别，如果开启会稍稍降低类的创建过程的性能，但对对象构造没有影响。 <br/>
   * 4. frameRate (帧率)                                                              <br/>
   *      “frameRate” 设置想要的帧率你的游戏，但真正的FPS取决于你的游戏实现和运行环境。      <br/>
   * 5. id                                                                            <br/>
   *      "gameCanvas" Web 页面上的 Canvas Element ID，仅适用于 web 端。                         <br/>
   * 6. renderMode（渲染模式）                                                         <br/>
   *      “renderMode” 设置渲染器类型，仅适用于 web 端：                              <br/>
   *          0 - 通过引擎自动选择。                                                     <br/>
   *          1 - 强制使用 canvas 渲染。
   *          2 - 强制使用 WebGL 渲染，但是在部分 Android 浏览器中这个选项会被忽略。     <br/>
   * <br/>
   * 注意：请不要直接修改这个对象，它不会有任何效果。
   * @property config
   * @type {Object}
   */
  config: null,

  /**
   * !#en Callback when the scripts of engine have been load.
   * !#zh 当引擎完成启动后的回调函数。
   * @method onStart
   * @type {Function}
   */
  onStart: null,
  //@Public Methods
  //  @Game play control

  /**
   * !#en Set frame rate of game.
   * !#zh 设置游戏帧率。
   * @method setFrameRate
   * @param {Number} frameRate
   */
  setFrameRate: function setFrameRate(frameRate) {
    var config = this.config;
    config.frameRate = frameRate;
    if (this._intervalId) window.cancelAnimFrame(this._intervalId);
    this._intervalId = 0;
    this._paused = true;

    this._setAnimFrame();

    this._runMainLoop();
  },

  /**
   * !#en Get frame rate set for the game, it doesn't represent the real frame rate.
   * !#zh 获取设置的游戏帧率（不等同于实际帧率）。
   * @method getFrameRate
   * @return {Number} frame rate
   */
  getFrameRate: function getFrameRate() {
    return this.config.frameRate;
  },

  /**
   * !#en Run the game frame by frame.
   * !#zh 执行一帧游戏循环。
   * @method step
   */
  step: function step() {
    cc.director.mainLoop();
  },

  /**
   * !#en Pause the game main loop. This will pause:
   * game logic execution, rendering process, event manager, background music and all audio effects.
   * This is different with cc.director.pause which only pause the game logic execution.
   * !#zh 暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。这点和只暂停游戏逻辑的 cc.director.pause 不同。
   * @method pause
   */
  pause: function pause() {
    if (this._paused) return;
    this._paused = true; // Pause audio engine

    if (cc.audioEngine) {
      cc.audioEngine._break();
    } // Pause main loop


    if (this._intervalId) window.cancelAnimFrame(this._intervalId);
    this._intervalId = 0;
  },

  /**
   * !#en Resume the game from pause. This will resume:
   * game logic execution, rendering process, event manager, background music and all audio effects.
   * !#zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
   * @method resume
   */
  resume: function resume() {
    if (!this._paused) return;
    this._paused = false; // Resume audio engine

    if (cc.audioEngine) {
      cc.audioEngine._restore();
    }

    cc.director._resetDeltaTime(); // Resume main loop


    this._runMainLoop();
  },

  /**
   * !#en Check whether the game is paused.
   * !#zh 判断游戏是否暂停。
   * @method isPaused
   * @return {Boolean}
   */
  isPaused: function isPaused() {
    return this._paused;
  },

  /**
   * !#en Restart game.
   * !#zh 重新开始游戏
   * @method restart
   */
  restart: function restart() {
    cc.director.once(cc.Director.EVENT_AFTER_DRAW, function () {
      for (var id in game._persistRootNodes) {
        game.removePersistRootNode(game._persistRootNodes[id]);
      } // Clear scene


      cc.director.getScene().destroy();

      cc.Object._deferredDestroy(); // Clean up audio


      if (cc.audioEngine) {
        cc.audioEngine.uncacheAll();
      }

      cc.director.reset();
      game.pause();
      cc.assetManager.builtins.init(function () {
        game.onStart();
        game.emit(game.EVENT_RESTART);
      });
    });
  },

  /**
   * !#en End game, it will close the game window
   * !#zh 退出游戏
   * @method end
   */
  end: function end() {
    close();
  },
  //  @Game loading
  _initEngine: function _initEngine() {
    if (this._rendererInitialized) {
      return;
    }

    this._initRenderer();

    if (!CC_EDITOR) {
      this._initEvents();
    }

    this.emit(this.EVENT_ENGINE_INITED);
  },
  _loadPreviewScript: function _loadPreviewScript(cb) {
    if (CC_PREVIEW && window.__quick_compile_project__) {
      window.__quick_compile_project__.load(cb);
    } else {
      cb();
    }
  },
  _prepareFinished: function _prepareFinished(cb) {
    var _this = this;

    // Init engine
    this._initEngine();

    this._setAnimFrame();

    cc.assetManager.builtins.init(function () {
      // Log engine version
      console.log('Cocos Creator v' + cc.ENGINE_VERSION);
      _this._prepared = true;

      _this._runMainLoop();

      _this.emit(_this.EVENT_GAME_INITED);

      if (cb) cb();
    });
  },
  eventTargetOn: EventTarget.prototype.on,
  eventTargetOnce: EventTarget.prototype.once,

  /**
   * !#en
   * Register an callback of a specific event type on the game object.
   * This type of event should be triggered via `emit`.
   * !#zh
   * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
   *
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {any} [callback.arg1] arg1
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   */
  on: function on(type, callback, target, once) {
    // Make sure EVENT_ENGINE_INITED and EVENT_GAME_INITED callbacks to be invoked
    if (this._prepared && type === this.EVENT_ENGINE_INITED || !this._paused && type === this.EVENT_GAME_INITED) {
      callback.call(target);
    } else {
      this.eventTargetOn(type, callback, target, once);
    }
  },

  /**
   * !#en
   * Register an callback of a specific event type on the game object,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {any} [callback.arg1] arg1
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  once: function once(type, callback, target) {
    // Make sure EVENT_ENGINE_INITED and EVENT_GAME_INITED callbacks to be invoked
    if (this._prepared && type === this.EVENT_ENGINE_INITED || !this._paused && type === this.EVENT_GAME_INITED) {
      callback.call(target);
    } else {
      this.eventTargetOnce(type, callback, target);
    }
  },

  /**
   * !#en Prepare game.
   * !#zh 准备引擎，请不要直接调用这个函数。
   * @param {Function} cb
   * @method prepare
   */
  prepare: function prepare(cb) {
    var _this2 = this;

    // Already prepared
    if (this._prepared) {
      if (cb) cb();
      return;
    }

    this._loadPreviewScript(function () {
      _this2._prepareFinished(cb);
    });
  },

  /**
   * !#en Run game with configuration object and onStart function.
   * !#zh 运行游戏，并且指定引擎配置和 onStart 的回调。
   * @method run
   * @param {Object} config - Pass configuration object or onStart function
   * @param {Function} onStart - function to be executed after game initialized
   */
  run: function run(config, onStart) {
    this._initConfig(config);

    this.onStart = onStart;
    this.prepare(game.onStart && game.onStart.bind(game));
  },
  //  @ Persist root node section

  /**
   * !#en
   * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br/>
   * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
   * !#zh
   * 声明常驻根节点，该节点不会被在场景切换中被销毁。<br/>
   * 目标节点必须位于为层级的根节点，否则无效。
   * @method addPersistRootNode
   * @param {Node} node - The node to be made persistent
   */
  addPersistRootNode: function addPersistRootNode(node) {
    if (!cc.Node.isNode(node) || !node.uuid) {
      cc.warnID(3800);
      return;
    }

    var id = node.uuid;

    if (!this._persistRootNodes[id]) {
      var scene = cc.director._scene;

      if (cc.isValid(scene)) {
        if (!node.parent) {
          node.parent = scene;
        } else if (!(node.parent instanceof cc.Scene)) {
          cc.warnID(3801);
          return;
        } else if (node.parent !== scene) {
          cc.warnID(3802);
          return;
        }
      }

      this._persistRootNodes[id] = node;
      node._persistNode = true;

      cc.assetManager._releaseManager._addPersistNodeRef(node);
    }
  },

  /**
   * !#en Remove a persistent root node.
   * !#zh 取消常驻根节点。
   * @method removePersistRootNode
   * @param {Node} node - The node to be removed from persistent node list
   */
  removePersistRootNode: function removePersistRootNode(node) {
    var id = node.uuid || '';

    if (node === this._persistRootNodes[id]) {
      delete this._persistRootNodes[id];
      node._persistNode = false;

      cc.assetManager._releaseManager._removePersistNodeRef(node);
    }
  },

  /**
   * !#en Check whether the node is a persistent root node.
   * !#zh 检查节点是否是常驻根节点。
   * @method isPersistRootNode
   * @param {Node} node - The node to be checked
   * @return {Boolean}
   */
  isPersistRootNode: function isPersistRootNode(node) {
    return node._persistNode;
  },
  //@Private Methods
  //  @Time ticker section
  _setAnimFrame: function _setAnimFrame() {
    this._lastTime = performance.now();
    var frameRate = game.config.frameRate;
    this._frameTime = 1000 / frameRate;
    cc.director._maxParticleDeltaTime = this._frameTime / 1000 * 2;

    if (CC_JSB || CC_RUNTIME) {
      jsb.setPreferredFramesPerSecond(frameRate);
      window.requestAnimFrame = window.requestAnimationFrame;
      window.cancelAnimFrame = window.cancelAnimationFrame;
    } else {
      var rAF = window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

      if (frameRate !== 60 && frameRate !== 30) {
        window.requestAnimFrame = rAF ? this._stTimeWithRAF : this._stTime;
        window.cancelAnimFrame = this._ctTime;
      } else {
        window.requestAnimFrame = rAF || this._stTime;
        window.cancelAnimFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || this._ctTime;
      }
    }
  },
  _stTimeWithRAF: function _stTimeWithRAF(callback) {
    var currTime = performance.now();
    var timeToCall = Math.max(0, game._frameTime - (currTime - game._lastTime));
    var id = window.setTimeout(function () {
      window.requestAnimationFrame(callback);
    }, timeToCall);
    game._lastTime = currTime + timeToCall;
    return id;
  },
  _stTime: function _stTime(callback) {
    var currTime = performance.now();
    var timeToCall = Math.max(0, game._frameTime - (currTime - game._lastTime));
    var id = window.setTimeout(function () {
      callback();
    }, timeToCall);
    game._lastTime = currTime + timeToCall;
    return id;
  },
  _ctTime: function _ctTime(id) {
    window.clearTimeout(id);
  },
  //Run game.
  _runMainLoop: function _runMainLoop() {
    if (CC_EDITOR) {
      return;
    }

    if (!this._prepared) return;

    var self = this,
        _callback,
        config = self.config,
        director = cc.director,
        skip = true,
        frameRate = config.frameRate;

    debug.setDisplayStats(config.showFPS);

    _callback = function callback(now) {
      if (!self._paused) {
        self._intervalId = window.requestAnimFrame(_callback);

        if (!CC_JSB && !CC_RUNTIME && frameRate === 30) {
          if (skip = !skip) {
            return;
          }
        }

        director.mainLoop(now);
      }
    };

    self._intervalId = window.requestAnimFrame(_callback);
    self._paused = false;
  },
  //  @Game loading section
  _initConfig: function _initConfig(config) {
    // Configs adjustment
    if (typeof config.debugMode !== 'number') {
      config.debugMode = 0;
    }

    config.exposeClassName = !!config.exposeClassName;

    if (typeof config.frameRate !== 'number') {
      config.frameRate = 60;
    }

    var renderMode = config.renderMode;

    if (typeof renderMode !== 'number' || renderMode > 2 || renderMode < 0) {
      config.renderMode = 0;
    }

    if (typeof config.registerSystemEvent !== 'boolean') {
      config.registerSystemEvent = true;
    }

    if (renderMode === 1) {
      config.showFPS = false;
    } else {
      config.showFPS = !!config.showFPS;
    } // Collide Map and Group List


    this.collisionMatrix = config.collisionMatrix || [];
    this.groupList = config.groupList || [];

    debug._resetDebugSetting(config.debugMode);

    this.config = config;
    this._configLoaded = true;
  },
  _determineRenderType: function _determineRenderType() {
    var config = this.config,
        userRenderMode = parseInt(config.renderMode) || 0; // Determine RenderType

    this.renderType = this.RENDER_TYPE_CANVAS;
    var supportRender = false;

    if (userRenderMode === 0) {
      if (cc.sys.capabilities['opengl']) {
        this.renderType = this.RENDER_TYPE_WEBGL;
        supportRender = true;
      } else if (cc.sys.capabilities['canvas']) {
        this.renderType = this.RENDER_TYPE_CANVAS;
        supportRender = true;
      }
    } else if (userRenderMode === 1 && cc.sys.capabilities['canvas']) {
      this.renderType = this.RENDER_TYPE_CANVAS;
      supportRender = true;
    } else if (userRenderMode === 2 && cc.sys.capabilities['opengl']) {
      this.renderType = this.RENDER_TYPE_WEBGL;
      supportRender = true;
    }

    if (!supportRender) {
      throw new Error(debug.getError(3820, userRenderMode));
    }
  },
  _initRenderer: function _initRenderer() {
    // Avoid setup to be called twice.
    if (this._rendererInitialized) return;
    var el = this.config.id,
        width,
        height,
        localCanvas,
        localContainer;

    if (CC_JSB || CC_RUNTIME) {
      this.container = localContainer = document.createElement("DIV");
      this.frame = localContainer.parentNode === document.body ? document.documentElement : localContainer.parentNode;
      localCanvas = window.__canvas;
      this.canvas = localCanvas;
    } else {
      var addClass = function addClass(element, name) {
        var hasClass = (' ' + element.className + ' ').indexOf(' ' + name + ' ') > -1;

        if (!hasClass) {
          if (element.className) {
            element.className += " ";
          }

          element.className += name;
        }
      };

      var element = el instanceof HTMLElement ? el : document.querySelector(el) || document.querySelector('#' + el);

      if (element.tagName === "CANVAS") {
        width = element.width;
        height = element.height; //it is already a canvas, we wrap it around with a div

        this.canvas = localCanvas = element;
        this.container = localContainer = document.createElement("DIV");
        if (localCanvas.parentNode) localCanvas.parentNode.insertBefore(localContainer, localCanvas);
      } else {
        //we must make a new canvas and place into this element
        if (element.tagName !== "DIV") {
          cc.warnID(3819);
        }

        width = element.clientWidth;
        height = element.clientHeight;
        this.canvas = localCanvas = document.createElement("CANVAS");
        this.container = localContainer = document.createElement("DIV");
        element.appendChild(localContainer);
      }

      localContainer.setAttribute('id', 'Cocos2dGameContainer');
      localContainer.appendChild(localCanvas);
      this.frame = localContainer.parentNode === document.body ? document.documentElement : localContainer.parentNode;
      addClass(localCanvas, "gameCanvas");
      localCanvas.setAttribute("width", width || 480);
      localCanvas.setAttribute("height", height || 320);
      localCanvas.setAttribute("tabindex", 99);
    }

    this._determineRenderType(); // WebGL context created successfully


    if (this.renderType === this.RENDER_TYPE_WEBGL) {
      var opts = {
        'stencil': true,
        // MSAA is causing serious performance dropdown on some browsers.
        'antialias': cc.macro.ENABLE_WEBGL_ANTIALIAS,
        'alpha': cc.macro.ENABLE_TRANSPARENT_CANVAS
      };
      renderer.initWebGL(localCanvas, opts);
      this._renderContext = renderer.device._gl; // Enable dynamic atlas manager by default

      if (!cc.macro.CLEANUP_IMAGE_CACHE && dynamicAtlasManager) {
        dynamicAtlasManager.enabled = true;
      }
    }

    if (!this._renderContext) {
      this.renderType = this.RENDER_TYPE_CANVAS; // Could be ignored by module settings

      renderer.initCanvas(localCanvas);
      this._renderContext = renderer.device._ctx;
    }

    this.canvas.oncontextmenu = function () {
      if (!cc._isContextMenuEnable) return false;
    };

    this._rendererInitialized = true;
  },
  _initEvents: function _initEvents() {
    var win = window,
        hiddenPropName; // register system events

    if (this.config.registerSystemEvent) cc.internal.inputManager.registerSystemEvent(this.canvas);

    if (typeof document.hidden !== 'undefined') {
      hiddenPropName = "hidden";
    } else if (typeof document.mozHidden !== 'undefined') {
      hiddenPropName = "mozHidden";
    } else if (typeof document.msHidden !== 'undefined') {
      hiddenPropName = "msHidden";
    } else if (typeof document.webkitHidden !== 'undefined') {
      hiddenPropName = "webkitHidden";
    }

    var hidden = false;

    function onHidden() {
      if (!hidden) {
        hidden = true;
        game.emit(game.EVENT_HIDE);
      }
    } // In order to adapt the most of platforms the onshow API.


    function onShown(arg0, arg1, arg2, arg3, arg4) {
      if (hidden) {
        hidden = false;
        game.emit(game.EVENT_SHOW, arg0, arg1, arg2, arg3, arg4);
      }
    }

    if (hiddenPropName) {
      var changeList = ["visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange"];

      for (var i = 0; i < changeList.length; i++) {
        document.addEventListener(changeList[i], function (event) {
          var visible = document[hiddenPropName]; // QQ App

          visible = visible || event["hidden"];
          if (visible) onHidden();else onShown();
        });
      }
    } else {
      win.addEventListener("blur", onHidden);
      win.addEventListener("focus", onShown);
    }

    if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
      win.onfocus = onShown;
    }

    if ("onpageshow" in window && "onpagehide" in window) {
      win.addEventListener("pagehide", onHidden);
      win.addEventListener("pageshow", onShown); // Taobao UIWebKit

      document.addEventListener("pagehide", onHidden);
      document.addEventListener("pageshow", onShown);
    }

    this.on(game.EVENT_HIDE, function () {
      game.pause();
    });
    this.on(game.EVENT_SHOW, function () {
      game.resume();
    });
  }
};
EventTarget.call(game);
cc.js.addon(game, EventTarget.prototype);
/**
 * @module cc
 */

/**
 * !#en This is a Game instance.
 * !#zh 这是一个 Game 类的实例，包含游戏主体信息并负责驱动游戏的游戏对象。。
 * @property game
 * @type Game
 */

cc.game = module.exports = game;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXENDR2FtZS5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJkZWJ1ZyIsInJlbmRlcmVyIiwiZHluYW1pY0F0bGFzTWFuYWdlciIsImdhbWUiLCJFVkVOVF9ISURFIiwiRVZFTlRfU0hPVyIsIkVWRU5UX1JFU1RBUlQiLCJFVkVOVF9HQU1FX0lOSVRFRCIsIkVWRU5UX0VOR0lORV9JTklURUQiLCJFVkVOVF9SRU5ERVJFUl9JTklURUQiLCJSRU5ERVJfVFlQRV9DQU5WQVMiLCJSRU5ERVJfVFlQRV9XRUJHTCIsIlJFTkRFUl9UWVBFX09QRU5HTCIsIl9wZXJzaXN0Um9vdE5vZGVzIiwiX3BhdXNlZCIsIl9jb25maWdMb2FkZWQiLCJfaXNDbG9uaW5nIiwiX3ByZXBhcmVkIiwiX3JlbmRlcmVySW5pdGlhbGl6ZWQiLCJfcmVuZGVyQ29udGV4dCIsIl9pbnRlcnZhbElkIiwiX2xhc3RUaW1lIiwiX2ZyYW1lVGltZSIsImZyYW1lIiwiY29udGFpbmVyIiwiY2FudmFzIiwicmVuZGVyVHlwZSIsImNvbmZpZyIsIm9uU3RhcnQiLCJzZXRGcmFtZVJhdGUiLCJmcmFtZVJhdGUiLCJ3aW5kb3ciLCJjYW5jZWxBbmltRnJhbWUiLCJfc2V0QW5pbUZyYW1lIiwiX3J1bk1haW5Mb29wIiwiZ2V0RnJhbWVSYXRlIiwic3RlcCIsImNjIiwiZGlyZWN0b3IiLCJtYWluTG9vcCIsInBhdXNlIiwiYXVkaW9FbmdpbmUiLCJfYnJlYWsiLCJyZXN1bWUiLCJfcmVzdG9yZSIsIl9yZXNldERlbHRhVGltZSIsImlzUGF1c2VkIiwicmVzdGFydCIsIm9uY2UiLCJEaXJlY3RvciIsIkVWRU5UX0FGVEVSX0RSQVciLCJpZCIsInJlbW92ZVBlcnNpc3RSb290Tm9kZSIsImdldFNjZW5lIiwiZGVzdHJveSIsIk9iamVjdCIsIl9kZWZlcnJlZERlc3Ryb3kiLCJ1bmNhY2hlQWxsIiwicmVzZXQiLCJhc3NldE1hbmFnZXIiLCJidWlsdGlucyIsImluaXQiLCJlbWl0IiwiZW5kIiwiY2xvc2UiLCJfaW5pdEVuZ2luZSIsIl9pbml0UmVuZGVyZXIiLCJDQ19FRElUT1IiLCJfaW5pdEV2ZW50cyIsIl9sb2FkUHJldmlld1NjcmlwdCIsImNiIiwiQ0NfUFJFVklFVyIsIl9fcXVpY2tfY29tcGlsZV9wcm9qZWN0X18iLCJsb2FkIiwiX3ByZXBhcmVGaW5pc2hlZCIsImNvbnNvbGUiLCJsb2ciLCJFTkdJTkVfVkVSU0lPTiIsImV2ZW50VGFyZ2V0T24iLCJwcm90b3R5cGUiLCJvbiIsImV2ZW50VGFyZ2V0T25jZSIsInR5cGUiLCJjYWxsYmFjayIsInRhcmdldCIsImNhbGwiLCJwcmVwYXJlIiwicnVuIiwiX2luaXRDb25maWciLCJiaW5kIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwibm9kZSIsIk5vZGUiLCJpc05vZGUiLCJ1dWlkIiwid2FybklEIiwic2NlbmUiLCJfc2NlbmUiLCJpc1ZhbGlkIiwicGFyZW50IiwiU2NlbmUiLCJfcGVyc2lzdE5vZGUiLCJfcmVsZWFzZU1hbmFnZXIiLCJfYWRkUGVyc2lzdE5vZGVSZWYiLCJfcmVtb3ZlUGVyc2lzdE5vZGVSZWYiLCJpc1BlcnNpc3RSb290Tm9kZSIsInBlcmZvcm1hbmNlIiwibm93IiwiX21heFBhcnRpY2xlRGVsdGFUaW1lIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImpzYiIsInNldFByZWZlcnJlZEZyYW1lc1BlclNlY29uZCIsInJlcXVlc3RBbmltRnJhbWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInJBRiIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIl9zdFRpbWVXaXRoUkFGIiwiX3N0VGltZSIsIl9jdFRpbWUiLCJjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc0NhbmNlbEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsIm9DYW5jZWxBbmltYXRpb25GcmFtZSIsImN1cnJUaW1lIiwidGltZVRvQ2FsbCIsIk1hdGgiLCJtYXgiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZiIsInNraXAiLCJzZXREaXNwbGF5U3RhdHMiLCJzaG93RlBTIiwiZGVidWdNb2RlIiwiZXhwb3NlQ2xhc3NOYW1lIiwicmVuZGVyTW9kZSIsInJlZ2lzdGVyU3lzdGVtRXZlbnQiLCJjb2xsaXNpb25NYXRyaXgiLCJncm91cExpc3QiLCJfcmVzZXREZWJ1Z1NldHRpbmciLCJfZGV0ZXJtaW5lUmVuZGVyVHlwZSIsInVzZXJSZW5kZXJNb2RlIiwicGFyc2VJbnQiLCJzdXBwb3J0UmVuZGVyIiwic3lzIiwiY2FwYWJpbGl0aWVzIiwiRXJyb3IiLCJnZXRFcnJvciIsImVsIiwid2lkdGgiLCJoZWlnaHQiLCJsb2NhbENhbnZhcyIsImxvY2FsQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicGFyZW50Tm9kZSIsImJvZHkiLCJkb2N1bWVudEVsZW1lbnQiLCJfX2NhbnZhcyIsImFkZENsYXNzIiwiZWxlbWVudCIsIm5hbWUiLCJoYXNDbGFzcyIsImNsYXNzTmFtZSIsImluZGV4T2YiLCJIVE1MRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiaW5zZXJ0QmVmb3JlIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhcHBlbmRDaGlsZCIsInNldEF0dHJpYnV0ZSIsIm9wdHMiLCJtYWNybyIsIkVOQUJMRV9XRUJHTF9BTlRJQUxJQVMiLCJFTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFTIiwiaW5pdFdlYkdMIiwiZGV2aWNlIiwiX2dsIiwiQ0xFQU5VUF9JTUFHRV9DQUNIRSIsImVuYWJsZWQiLCJpbml0Q2FudmFzIiwiX2N0eCIsIm9uY29udGV4dG1lbnUiLCJfaXNDb250ZXh0TWVudUVuYWJsZSIsIndpbiIsImhpZGRlblByb3BOYW1lIiwiaW50ZXJuYWwiLCJpbnB1dE1hbmFnZXIiLCJoaWRkZW4iLCJtb3pIaWRkZW4iLCJtc0hpZGRlbiIsIndlYmtpdEhpZGRlbiIsIm9uSGlkZGVuIiwib25TaG93biIsImFyZzAiLCJhcmcxIiwiYXJnMiIsImFyZzMiLCJhcmc0IiwiY2hhbmdlTGlzdCIsImkiLCJsZW5ndGgiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ2aXNpYmxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib25mb2N1cyIsImpzIiwiYWRkb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFJQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUF6Qjs7QUFDQUEsT0FBTyxDQUFDLHdCQUFELENBQVA7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFNRSxRQUFRLEdBQUdGLE9BQU8sQ0FBQyxxQkFBRCxDQUF4Qjs7QUFDQSxJQUFNRyxtQkFBbUIsR0FBR0gsT0FBTyxDQUFDLDhDQUFELENBQW5DO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsSUFBSUksSUFBSSxHQUFHO0FBQ1A7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTBCLFVBQTFCLEVBQXNDVCxPQUF0QztBQUNIOztBQUVELFNBQUs3SCxFQUFMLENBQVE3RSxJQUFJLENBQUNDLFVBQWIsRUFBeUIsWUFBWTtBQUNqQ0QsTUFBQUEsSUFBSSxDQUFDcUMsS0FBTDtBQUNILEtBRkQ7QUFHQSxTQUFLd0MsRUFBTCxDQUFRN0UsSUFBSSxDQUFDRSxVQUFiLEVBQXlCLFlBQVk7QUFDakNGLE1BQUFBLElBQUksQ0FBQ3dDLE1BQUw7QUFDSCxLQUZEO0FBR0g7QUF0MEJNLENBQVg7QUF5MEJBN0MsV0FBVyxDQUFDdUYsSUFBWixDQUFpQmxGLElBQWpCO0FBQ0FrQyxFQUFFLENBQUN1TCxFQUFILENBQU1DLEtBQU4sQ0FBWTFOLElBQVosRUFBa0JMLFdBQVcsQ0FBQ2lGLFNBQTlCO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTFDLEVBQUUsQ0FBQ2xDLElBQUgsR0FBVTJOLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVOLElBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxudmFyIEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudC10YXJnZXQnKTtcclxucmVxdWlyZSgnLi4vYXVkaW8vQ0NBdWRpb0VuZ2luZScpO1xyXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4vQ0NEZWJ1ZycpO1xyXG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvaW5kZXguanMnKTtcclxuY29uc3QgZHluYW1pY0F0bGFzTWFuYWdlciA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvdXRpbHMvZHluYW1pYy1hdGxhcy9tYW5hZ2VyJyk7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuIEFuIG9iamVjdCB0byBib290IHRoZSBnYW1lLlxyXG4gKiAhI3poIOWMheWQq+a4uOaIj+S4u+S9k+S/oeaBr+W5tui0n+i0o+mpseWKqOa4uOaIj+eahOa4uOaIj+WvueixoeOAglxyXG4gKiBAY2xhc3MgR2FtZVxyXG4gKiBAZXh0ZW5kcyBFdmVudFRhcmdldFxyXG4gKi9cclxudmFyIGdhbWUgPSB7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRXZlbnQgdHJpZ2dlcmVkIHdoZW4gZ2FtZSBoaWRlIHRvIGJhY2tncm91bmQuXHJcbiAgICAgKiBQbGVhc2Ugbm90ZSB0aGF0IHRoaXMgZXZlbnQgaXMgbm90IDEwMCUgZ3VhcmFudGVlZCB0byBiZSBmaXJlZCBvbiBXZWIgcGxhdGZvcm0sXHJcbiAgICAgKiBvbiBuYXRpdmUgcGxhdGZvcm1zLCBpdCBjb3JyZXNwb25kcyB0byBlbnRlciBiYWNrZ3JvdW5kIGV2ZW50LCBvcyBzdGF0dXMgYmFyIG9yIG5vdGlmaWNhdGlvbiBjZW50ZXIgbWF5IG5vdCB0cmlnZ2VyIHRoaXMgZXZlbnQuXHJcbiAgICAgKiAhI3poIOa4uOaIj+i/m+WFpeWQjuWPsOaXtuinpuWPkeeahOS6i+S7tuOAglxyXG4gICAgICog6K+35rOo5oSP77yM5ZyoIFdFQiDlubPlj7DvvIzov5nkuKrkuovku7bkuI3kuIDlrprkvJogMTAwJSDop6blj5HvvIzov5nlrozlhajlj5blhrPkuo7mtY/op4jlmajnmoTlm57osIPooYzkuLrjgIJcclxuICAgICAqIOWcqOWOn+eUn+W5s+WPsO+8jOWug+WvueW6lOeahOaYr+W6lOeUqOiiq+WIh+aNouWIsOWQjuWPsOS6i+S7tu+8jOS4i+aLieiPnOWNleWSjOS4iuaLieeKtuaAgeagj+etieS4jeS4gOWumuS8muinpuWPkei/meS4quS6i+S7tu+8jOi/meWPluWGs+S6juezu+e7n+ihjOS4uuOAglxyXG4gICAgICogQHByb3BlcnR5IEVWRU5UX0hJREVcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAqICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZU11c2ljKCk7XHJcbiAgICAgKiAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2VBbGxFZmZlY3RzKCk7XHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG4gICAgRVZFTlRfSElERTogXCJnYW1lX29uX2hpZGVcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRXZlbnQgdHJpZ2dlcmVkIHdoZW4gZ2FtZSBiYWNrIHRvIGZvcmVncm91bmRcclxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBldmVudCBpcyBub3QgMTAwJSBndWFyYW50ZWVkIHRvIGJlIGZpcmVkIG9uIFdlYiBwbGF0Zm9ybSxcclxuICAgICAqIG9uIG5hdGl2ZSBwbGF0Zm9ybXMsIGl0IGNvcnJlc3BvbmRzIHRvIGVudGVyIGZvcmVncm91bmQgZXZlbnQuXHJcbiAgICAgKiAhI3poIOa4uOaIj+i/m+WFpeWJjeWPsOi/kOihjOaXtuinpuWPkeeahOS6i+S7tuOAglxyXG4gICAgICog6K+35rOo5oSP77yM5ZyoIFdFQiDlubPlj7DvvIzov5nkuKrkuovku7bkuI3kuIDlrprkvJogMTAwJSDop6blj5HvvIzov5nlrozlhajlj5blhrPkuo7mtY/op4jlmajnmoTlm57osIPooYzkuLrjgIJcclxuICAgICAqIOWcqOWOn+eUn+W5s+WPsO+8jOWug+WvueW6lOeahOaYr+W6lOeUqOiiq+WIh+aNouWIsOWJjeWPsOS6i+S7tuOAglxyXG4gICAgICogQHByb3BlcnR5IEVWRU5UX1NIT1dcclxuICAgICAqIEBjb25zdGFudFxyXG4gICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAqL1xyXG4gICAgRVZFTlRfU0hPVzogXCJnYW1lX29uX3Nob3dcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRXZlbnQgdHJpZ2dlcmVkIHdoZW4gZ2FtZSByZXN0YXJ0XHJcbiAgICAgKiAhI3poIOiwg+eUqHJlc3RhcnTlkI7vvIzop6blj5Hkuovku7bjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBFVkVOVF9SRVNUQVJUXHJcbiAgICAgKiBAY29uc3RhbnRcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEVWRU5UX1JFU1RBUlQ6IFwiZ2FtZV9vbl9yZXN0YXJ0XCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCB0cmlnZ2VyZWQgYWZ0ZXIgZ2FtZSBpbml0ZWQsIGF0IHRoaXMgcG9pbnQgYWxsIGVuZ2luZSBvYmplY3RzIGFuZCBnYW1lIHNjcmlwdHMgYXJlIGxvYWRlZFxyXG4gICAgICogQHByb3BlcnR5IEVWRU5UX0dBTUVfSU5JVEVEXHJcbiAgICAgKiBAY29uc3RhbnRcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEVWRU5UX0dBTUVfSU5JVEVEOiBcImdhbWVfaW5pdGVkXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCB0cmlnZ2VyZWQgYWZ0ZXIgZW5naW5lIGluaXRlZCwgYXQgdGhpcyBwb2ludCB5b3Ugd2lsbCBiZSBhYmxlIHRvIHVzZSBhbGwgZW5naW5lIGNsYXNzZXMuXHJcbiAgICAgKiBJdCB3YXMgZGVmaW5lZCBhcyBFVkVOVF9SRU5ERVJFUl9JTklURUQgaW4gY29jb3MgY3JlYXRvciB2MS54IGFuZCByZW5hbWVkIGluIHYyLjBcclxuICAgICAqIEBwcm9wZXJ0eSBFVkVOVF9FTkdJTkVfSU5JVEVEXHJcbiAgICAgKiBAY29uc3RhbnRcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIEVWRU5UX0VOR0lORV9JTklURUQ6IFwiZW5naW5lX2luaXRlZFwiLFxyXG4gICAgLy8gZGVwcmVjYXRlZFxyXG4gICAgRVZFTlRfUkVOREVSRVJfSU5JVEVEOiBcImVuZ2luZV9pbml0ZWRcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdlYiBDYW52YXMgMmQgQVBJIGFzIHJlbmRlcmVyIGJhY2tlbmRcclxuICAgICAqIEBwcm9wZXJ0eSBSRU5ERVJfVFlQRV9DQU5WQVNcclxuICAgICAqIEBjb25zdGFudFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkVOREVSX1RZUEVfQ0FOVkFTOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiBXZWJHTCBBUEkgYXMgcmVuZGVyZXIgYmFja2VuZFxyXG4gICAgICogQHByb3BlcnR5IFJFTkRFUl9UWVBFX1dFQkdMXHJcbiAgICAgKiBAY29uc3RhbnRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJFTkRFUl9UWVBFX1dFQkdMOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVuR0wgQVBJIGFzIHJlbmRlcmVyIGJhY2tlbmRcclxuICAgICAqIEBwcm9wZXJ0eSBSRU5ERVJfVFlQRV9PUEVOR0xcclxuICAgICAqIEBjb25zdGFudFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkVOREVSX1RZUEVfT1BFTkdMOiAyLFxyXG5cclxuICAgIF9wZXJzaXN0Um9vdE5vZGVzOiB7fSxcclxuXHJcbiAgICAvLyBzdGF0ZXNcclxuICAgIF9wYXVzZWQ6IHRydWUsLy93aGV0aGVyIHRoZSBnYW1lIGlzIHBhdXNlZFxyXG4gICAgX2NvbmZpZ0xvYWRlZDogZmFsc2UsLy93aGV0aGVyIGNvbmZpZyBsb2FkZWRcclxuICAgIF9pc0Nsb25pbmc6IGZhbHNlLCAgICAvLyBkZXNlcmlhbGl6aW5nIG9yIGluc3RhbnRpYXRpbmdcclxuICAgIF9wcmVwYXJlZDogZmFsc2UsIC8vd2hldGhlciB0aGUgZW5naW5lIGhhcyBwcmVwYXJlZFxyXG4gICAgX3JlbmRlcmVySW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG5cclxuICAgIF9yZW5kZXJDb250ZXh0OiBudWxsLFxyXG5cclxuICAgIF9pbnRlcnZhbElkOiBudWxsLC8vaW50ZXJ2YWwgdGFyZ2V0IG9mIG1haW5cclxuXHJcbiAgICBfbGFzdFRpbWU6IG51bGwsXHJcbiAgICBfZnJhbWVUaW1lOiBudWxsLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgb3V0ZXIgZnJhbWUgb2YgdGhlIGdhbWUgY2FudmFzLCBwYXJlbnQgb2YgZ2FtZSBjb250YWluZXIuXHJcbiAgICAgKiAhI3poIOa4uOaIj+eUu+W4g+eahOWkluahhu+8jGNvbnRhaW5lciDnmoTniLblrrnlmajjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBmcmFtZVxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZnJhbWU6IG51bGwsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGNvbnRhaW5lciBvZiBnYW1lIGNhbnZhcy5cclxuICAgICAqICEjemgg5ri45oiP55S75biD55qE5a655Zmo44CCXHJcbiAgICAgKiBAcHJvcGVydHkgY29udGFpbmVyXHJcbiAgICAgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcbiAgICAgKi9cclxuICAgIGNvbnRhaW5lcjogbnVsbCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgY2FudmFzIG9mIHRoZSBnYW1lLlxyXG4gICAgICogISN6aCDmuLjmiI/nmoTnlLvluIPjgIJcclxuICAgICAqIEBwcm9wZXJ0eSBjYW52YXNcclxuICAgICAqIEB0eXBlIHtIVE1MQ2FudmFzRWxlbWVudH1cclxuICAgICAqL1xyXG4gICAgY2FudmFzOiBudWxsLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcmVuZGVyZXIgYmFja2VuZCBvZiB0aGUgZ2FtZS5cclxuICAgICAqICEjemgg5ri45oiP55qE5riy5p+T5Zmo57G75Z6L44CCXHJcbiAgICAgKiBAcHJvcGVydHkgcmVuZGVyVHlwZVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgcmVuZGVyVHlwZTogLTEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgY3VycmVudCBnYW1lIGNvbmZpZ3VyYXRpb24sIGluY2x1ZGluZzo8YnIvPlxyXG4gICAgICogMS4gZGVidWdNb2RlPGJyLz5cclxuICAgICAqICAgICAgXCJkZWJ1Z01vZGVcIiBwb3NzaWJsZSB2YWx1ZXMgOjxici8+XHJcbiAgICAgKiAgICAgIDAgLSBObyBtZXNzYWdlIHdpbGwgYmUgcHJpbnRlZC4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICAxIC0gY2MuZXJyb3IsIGNjLmFzc2VydCwgY2Mud2FybiwgY2MubG9nIHdpbGwgcHJpbnQgaW4gY29uc29sZS4gICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICAgICAgMiAtIGNjLmVycm9yLCBjYy5hc3NlcnQsIGNjLndhcm4gd2lsbCBwcmludCBpbiBjb25zb2xlLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgIDMgLSBjYy5lcnJvciwgY2MuYXNzZXJ0IHdpbGwgcHJpbnQgaW4gY29uc29sZS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICA0IC0gY2MuZXJyb3IsIGNjLmFzc2VydCwgY2Mud2FybiwgY2MubG9nIHdpbGwgcHJpbnQgb24gY2FudmFzLCBhdmFpbGFibGUgb25seSBvbiB3ZWIuPGJyLz5cclxuICAgICAqICAgICAgNSAtIGNjLmVycm9yLCBjYy5hc3NlcnQsIGNjLndhcm4gd2lsbCBwcmludCBvbiBjYW52YXMsIGF2YWlsYWJsZSBvbmx5IG9uIHdlYi4gICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgIDYgLSBjYy5lcnJvciwgY2MuYXNzZXJ0IHdpbGwgcHJpbnQgb24gY2FudmFzLCBhdmFpbGFibGUgb25seSBvbiB3ZWIuICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogMi4gc2hvd0ZQUzxici8+XHJcbiAgICAgKiAgICAgIExlZnQgYm90dG9tIGNvcm5lciBmcHMgaW5mb3JtYXRpb24gd2lsbCBzaG93IHdoZW4gXCJzaG93RlBTXCIgZXF1YWxzIHRydWUsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGhpZGUuPGJyLz5cclxuICAgICAqIDMuIGV4cG9zZUNsYXNzTmFtZTxici8+XHJcbiAgICAgKiAgICAgIEV4cG9zZSBjbGFzcyBuYW1lIHRvIGNocm9tZSBkZWJ1ZyB0b29scywgdGhlIGNsYXNzIGludGFudGlhdGUgcGVyZm9ybWFuY2UgaXMgYSBsaXR0bGUgYml0IHNsb3dlciB3aGVuIGV4cG9zZWQuPGJyLz5cclxuICAgICAqIDQuIGZyYW1lUmF0ZTxici8+XHJcbiAgICAgKiAgICAgIFwiZnJhbWVSYXRlXCIgc2V0IHRoZSB3YW50ZWQgZnJhbWUgcmF0ZSBmb3IgeW91ciBnYW1lLCBidXQgdGhlIHJlYWwgZnBzIGRlcGVuZHMgb24geW91ciBnYW1lIGltcGxlbWVudGF0aW9uIGFuZCB0aGUgcnVubmluZyBlbnZpcm9ubWVudC48YnIvPlxyXG4gICAgICogNS4gaWQ8YnIvPlxyXG4gICAgICogICAgICBcImdhbWVDYW52YXNcIiBzZXRzIHRoZSBpZCBvZiB5b3VyIGNhbnZhcyBlbGVtZW50IG9uIHRoZSB3ZWIgcGFnZSwgaXQncyB1c2VmdWwgb25seSBvbiB3ZWIuPGJyLz5cclxuICAgICAqIDYuIHJlbmRlck1vZGU8YnIvPlxyXG4gICAgICogICAgICBcInJlbmRlck1vZGVcIiBzZXRzIHRoZSByZW5kZXJlciB0eXBlLCBvbmx5IHVzZWZ1bCBvbiB3ZWIgOjxici8+XHJcbiAgICAgKiAgICAgIDAgLSBBdXRvbWF0aWNhbGx5IGNob3NlbiBieSBlbmdpbmU8YnIvPlxyXG4gICAgICogICAgICAxIC0gRm9yY2VkIHRvIHVzZSBjYW52YXMgcmVuZGVyZXI8YnIvPlxyXG4gICAgICogICAgICAyIC0gRm9yY2VkIHRvIHVzZSBXZWJHTCByZW5kZXJlciwgYnV0IHRoaXMgd2lsbCBiZSBpZ25vcmVkIG9uIG1vYmlsZSBicm93c2Vyczxici8+XHJcbiAgICAgKjxici8+XHJcbiAgICAgKiBQbGVhc2UgRE8gTk9UIG1vZGlmeSB0aGlzIG9iamVjdCBkaXJlY3RseSwgaXQgd29uJ3QgaGF2ZSBhbnkgZWZmZWN0Ljxici8+XHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlvZPliY3nmoTmuLjmiI/phY3nva7vvIzljIXmi6zvvJogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogMS4gZGVidWdNb2Rl77yIZGVidWcg5qih5byP77yM5L2G5piv5Zyo5rWP6KeI5Zmo5Lit6L+Z5Liq6YCJ6aG55Lya6KKr5b+955Wl77yJICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICBcImRlYnVnTW9kZVwiIOWQhOenjeiuvue9rumAiemhueeahOaEj+S5ieOAgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICAwIC0g5rKh5pyJ5raI5oGv6KKr5omT5Y2w5Ye65p2l44CCICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICAxIC0gY2MuZXJyb3LvvIxjYy5hc3NlcnTvvIxjYy53YXJu77yMY2MubG9nIOWwhuaJk+WNsOWcqCBjb25zb2xlIOS4reOAgiAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICAyIC0gY2MuZXJyb3LvvIxjYy5hc3NlcnTvvIxjYy53YXJuIOWwhuaJk+WNsOWcqCBjb25zb2xlIOS4reOAgiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICAgICAgICAgIDMgLSBjYy5lcnJvcu+8jGNjLmFzc2VydCDlsIbmiZPljbDlnKggY29uc29sZSDkuK3jgIIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICA0IC0gY2MuZXJyb3LvvIxjYy5hc3NlcnTvvIxjYy53YXJu77yMY2MubG9nIOWwhuaJk+WNsOWcqCBjYW52YXMg5Lit77yI5LuF6YCC55So5LqOIHdlYiDnq6/vvInjgIIgPGJyLz5cclxuICAgICAqICAgICAgICAgIDUgLSBjYy5lcnJvcu+8jGNjLmFzc2VydO+8jGNjLndhcm4g5bCG5omT5Y2w5ZyoIGNhbnZhcyDkuK3vvIjku4XpgILnlKjkuo4gd2ViIOerr++8ieOAgiAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICA2IC0gY2MuZXJyb3LvvIxjYy5hc3NlcnQg5bCG5omT5Y2w5ZyoIGNhbnZhcyDkuK3vvIjku4XpgILnlKjkuo4gd2ViIOerr++8ieOAgiAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAyLiBzaG93RlBT77yI5pi+56S6IEZQU++8iSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgIOW9kyBzaG93RlBTIOS4uiB0cnVlIOeahOaXtuWAmeeVjOmdoueahOW3puS4i+inkuWwhuaYvuekuiBmcHMg55qE5L+h5oGv77yM5ZCm5YiZ6KKr6ZqQ6JeP44CCICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogMy4gZXhwb3NlQ2xhc3NOYW1lICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICDmmrTpnLLnsbvlkI3orqkgQ2hyb21lIERldlRvb2xzIOWPr+S7peivhuWIq++8jOWmguaenOW8gOWQr+S8mueojeeojemZjeS9juexu+eahOWIm+W7uui/h+eoi+eahOaAp+iDve+8jOS9huWvueWvueixoeaehOmAoOayoeacieW9seWTjeOAgiA8YnIvPlxyXG4gICAgICogNC4gZnJhbWVSYXRlICjluKfnjocpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICDigJxmcmFtZVJhdGXigJ0g6K6+572u5oOz6KaB55qE5bin546H5L2g55qE5ri45oiP77yM5L2G55yf5q2j55qERlBT5Y+W5Yaz5LqO5L2g55qE5ri45oiP5a6e546w5ZKM6L+Q6KGM546v5aKD44CCICAgICAgPGJyLz5cclxuICAgICAqIDUuIGlkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgIFwiZ2FtZUNhbnZhc1wiIFdlYiDpobXpnaLkuIrnmoQgQ2FudmFzIEVsZW1lbnQgSUTvvIzku4XpgILnlKjkuo4gd2ViIOerr+OAgiAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogNi4gcmVuZGVyTW9kZe+8iOa4suafk+aooeW8j++8iSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgIOKAnHJlbmRlck1vZGXigJ0g6K6+572u5riy5p+T5Zmo57G75Z6L77yM5LuF6YCC55So5LqOIHdlYiDnq6/vvJogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICAgICAgMCAtIOmAmui/h+W8leaTjuiHquWKqOmAieaLqeOAgiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICAgICAgICAgIDEgLSDlvLrliLbkvb/nlKggY2FudmFzIOa4suafk+OAglxyXG4gICAgICogICAgICAgICAgMiAtIOW8uuWItuS9v+eUqCBXZWJHTCDmuLLmn5PvvIzkvYbmmK/lnKjpg6jliIYgQW5kcm9pZCDmtY/op4jlmajkuK3ov5nkuKrpgInpobnkvJrooqvlv73nlaXjgIIgICAgIDxici8+XHJcbiAgICAgKiA8YnIvPlxyXG4gICAgICog5rOo5oSP77ya6K+35LiN6KaB55u05o6l5L+u5pS56L+Z5Liq5a+56LGh77yM5a6D5LiN5Lya5pyJ5Lu75L2V5pWI5p6c44CCXHJcbiAgICAgKiBAcHJvcGVydHkgY29uZmlnXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBjb25maWc6IG51bGwsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENhbGxiYWNrIHdoZW4gdGhlIHNjcmlwdHMgb2YgZW5naW5lIGhhdmUgYmVlbiBsb2FkLlxyXG4gICAgICogISN6aCDlvZPlvJXmk47lrozmiJDlkK/liqjlkI7nmoTlm57osIPlh73mlbDjgIJcclxuICAgICAqIEBtZXRob2Qgb25TdGFydFxyXG4gICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBvblN0YXJ0OiBudWxsLFxyXG5cclxuLy9AUHVibGljIE1ldGhvZHNcclxuXHJcbi8vICBAR2FtZSBwbGF5IGNvbnRyb2xcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgZnJhbWUgcmF0ZSBvZiBnYW1lLlxyXG4gICAgICogISN6aCDorr7nva7muLjmiI/luKfnjofjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0RnJhbWVSYXRlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJhbWVSYXRlXHJcbiAgICAgKi9cclxuICAgIHNldEZyYW1lUmF0ZTogZnVuY3Rpb24gKGZyYW1lUmF0ZSkge1xyXG4gICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcclxuICAgICAgICBjb25maWcuZnJhbWVSYXRlID0gZnJhbWVSYXRlO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbElkKVxyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2ludGVydmFsSWQpO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc2V0QW5pbUZyYW1lKCk7XHJcbiAgICAgICAgdGhpcy5fcnVuTWFpbkxvb3AoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBmcmFtZSByYXRlIHNldCBmb3IgdGhlIGdhbWUsIGl0IGRvZXNuJ3QgcmVwcmVzZW50IHRoZSByZWFsIGZyYW1lIHJhdGUuXHJcbiAgICAgKiAhI3poIOiOt+WPluiuvue9rueahOa4uOaIj+W4p+eOh++8iOS4jeetieWQjOS6juWunumZheW4p+eOh++8ieOAglxyXG4gICAgICogQG1ldGhvZCBnZXRGcmFtZVJhdGVcclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gZnJhbWUgcmF0ZVxyXG4gICAgICovXHJcbiAgICBnZXRGcmFtZVJhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZnJhbWVSYXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUnVuIHRoZSBnYW1lIGZyYW1lIGJ5IGZyYW1lLlxyXG4gICAgICogISN6aCDmiafooYzkuIDluKfmuLjmiI/lvqrnjq/jgIJcclxuICAgICAqIEBtZXRob2Qgc3RlcFxyXG4gICAgICovXHJcbiAgICBzdGVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IubWFpbkxvb3AoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBnYW1lIG1haW4gbG9vcC4gVGhpcyB3aWxsIHBhdXNlOlxyXG4gICAgICogZ2FtZSBsb2dpYyBleGVjdXRpb24sIHJlbmRlcmluZyBwcm9jZXNzLCBldmVudCBtYW5hZ2VyLCBiYWNrZ3JvdW5kIG11c2ljIGFuZCBhbGwgYXVkaW8gZWZmZWN0cy5cclxuICAgICAqIFRoaXMgaXMgZGlmZmVyZW50IHdpdGggY2MuZGlyZWN0b3IucGF1c2Ugd2hpY2ggb25seSBwYXVzZSB0aGUgZ2FtZSBsb2dpYyBleGVjdXRpb24uXHJcbiAgICAgKiAhI3poIOaaguWBnOa4uOaIj+S4u+W+queOr+OAguWMheWQq++8mua4uOaIj+mAu+i+ke+8jOa4suafk++8jOS6i+S7tuWkhOeQhu+8jOiDjOaZr+mfs+S5kOWSjOaJgOaciemfs+aViOOAgui/meeCueWSjOWPquaaguWBnOa4uOaIj+mAu+i+keeahCBjYy5kaXJlY3Rvci5wYXVzZSDkuI3lkIzjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VcclxuICAgICAqL1xyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcGF1c2VkKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICAvLyBQYXVzZSBhdWRpbyBlbmdpbmVcclxuICAgICAgICBpZiAoY2MuYXVkaW9FbmdpbmUpIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuX2JyZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFBhdXNlIG1haW4gbG9vcFxyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcnZhbElkKVxyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2ludGVydmFsSWQpO1xyXG4gICAgICAgIHRoaXMuX2ludGVydmFsSWQgPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVzdW1lIHRoZSBnYW1lIGZyb20gcGF1c2UuIFRoaXMgd2lsbCByZXN1bWU6XHJcbiAgICAgKiBnYW1lIGxvZ2ljIGV4ZWN1dGlvbiwgcmVuZGVyaW5nIHByb2Nlc3MsIGV2ZW50IG1hbmFnZXIsIGJhY2tncm91bmQgbXVzaWMgYW5kIGFsbCBhdWRpbyBlZmZlY3RzLlxyXG4gICAgICogISN6aCDmgaLlpI3muLjmiI/kuLvlvqrnjq/jgILljIXlkKvvvJrmuLjmiI/pgLvovpHvvIzmuLLmn5PvvIzkuovku7blpITnkIbvvIzog4zmma/pn7PkuZDlkozmiYDmnInpn7PmlYjjgIJcclxuICAgICAqIEBtZXRob2QgcmVzdW1lXHJcbiAgICAgKi9cclxuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VkKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgLy8gUmVzdW1lIGF1ZGlvIGVuZ2luZVxyXG4gICAgICAgIGlmIChjYy5hdWRpb0VuZ2luZSkge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5fcmVzdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5kaXJlY3Rvci5fcmVzZXREZWx0YVRpbWUoKTtcclxuICAgICAgICAvLyBSZXN1bWUgbWFpbiBsb29wXHJcbiAgICAgICAgdGhpcy5fcnVuTWFpbkxvb3AoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdGhlIGdhbWUgaXMgcGF1c2VkLlxyXG4gICAgICogISN6aCDliKTmlq3muLjmiI/mmK/lkKbmmoLlgZzjgIJcclxuICAgICAqIEBtZXRob2QgaXNQYXVzZWRcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzUGF1c2VkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlc3RhcnQgZ2FtZS5cclxuICAgICAqICEjemgg6YeN5paw5byA5aeL5ri45oiPXHJcbiAgICAgKiBAbWV0aG9kIHJlc3RhcnRcclxuICAgICAqL1xyXG4gICAgcmVzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpZCBpbiBnYW1lLl9wZXJzaXN0Um9vdE5vZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnJlbW92ZVBlcnNpc3RSb290Tm9kZShnYW1lLl9wZXJzaXN0Um9vdE5vZGVzW2lkXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIHNjZW5lXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjYy5PYmplY3QuX2RlZmVycmVkRGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgYXVkaW9cclxuICAgICAgICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJlc2V0KCk7XHJcblxyXG4gICAgICAgICAgICBnYW1lLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5idWlsdGlucy5pbml0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdhbWUub25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5lbWl0KGdhbWUuRVZFTlRfUkVTVEFSVCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW5kIGdhbWUsIGl0IHdpbGwgY2xvc2UgdGhlIGdhbWUgd2luZG93XHJcbiAgICAgKiAhI3poIOmAgOWHuua4uOaIj1xyXG4gICAgICogQG1ldGhvZCBlbmRcclxuICAgICAqL1xyXG4gICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2xvc2UoKTtcclxuICAgIH0sXHJcblxyXG4vLyAgQEdhbWUgbG9hZGluZ1xyXG5cclxuICAgIF9pbml0RW5naW5lICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fcmVuZGVyZXJJbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbml0UmVuZGVyZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5pdEV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbWl0KHRoaXMuRVZFTlRfRU5HSU5FX0lOSVRFRCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9sb2FkUHJldmlld1NjcmlwdCAoY2IpIHtcclxuICAgICAgICBpZiAoQ0NfUFJFVklFVyAmJiB3aW5kb3cuX19xdWlja19jb21waWxlX3Byb2plY3RfXykge1xyXG4gICAgICAgICAgICB3aW5kb3cuX19xdWlja19jb21waWxlX3Byb2plY3RfXy5sb2FkKGNiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcHJlcGFyZUZpbmlzaGVkIChjYikge1xyXG4gICAgICAgIC8vIEluaXQgZW5naW5lXHJcbiAgICAgICAgdGhpcy5faW5pdEVuZ2luZSgpO1xyXG4gICAgICAgIHRoaXMuX3NldEFuaW1GcmFtZSgpO1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5idWlsdGlucy5pbml0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gTG9nIGVuZ2luZSB2ZXJzaW9uXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb2NvcyBDcmVhdG9yIHYnICsgY2MuRU5HSU5FX1ZFUlNJT04pO1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVwYXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3J1bk1haW5Mb29wKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVtaXQodGhpcy5FVkVOVF9HQU1FX0lOSVRFRCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2IpIGNiKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGV2ZW50VGFyZ2V0T246IEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5vbixcclxuICAgIGV2ZW50VGFyZ2V0T25jZTogRXZlbnRUYXJnZXQucHJvdG90eXBlLm9uY2UsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIGdhbWUgb2JqZWN0LlxyXG4gICAgICogVGhpcyB0eXBlIG9mIGV2ZW50IHNob3VsZCBiZSB0cmlnZ2VyZWQgdmlhIGBlbWl0YC5cclxuICAgICAqICEjemhcclxuICAgICAqIOazqOWGjCBnYW1lIOeahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg+OAgui/meenjeexu+Wei+eahOS6i+S7tuW6lOivpeiiqyBgZW1pdGAg6Kem5Y+R44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBvblxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcxXSBhcmcxXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcclxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnM10gYXJnM1xyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogb248VCBleHRlbmRzIEZ1bmN0aW9uPih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBULCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVFxyXG4gICAgICovXHJcbiAgICBvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSkge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBFVkVOVF9FTkdJTkVfSU5JVEVEIGFuZCBFVkVOVF9HQU1FX0lOSVRFRCBjYWxsYmFja3MgdG8gYmUgaW52b2tlZFxyXG4gICAgICAgIGlmICgodGhpcy5fcHJlcGFyZWQgJiYgdHlwZSA9PT0gdGhpcy5FVkVOVF9FTkdJTkVfSU5JVEVEKSB8fFxyXG4gICAgICAgICAgICAoIXRoaXMuX3BhdXNlZCAmJiB0eXBlID09PSB0aGlzLkVWRU5UX0dBTUVfSU5JVEVEKSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VGFyZ2V0T24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBnYW1lIG9iamVjdCxcclxuICAgICAqIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgdHJpZ2dlcmVkLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5rOo5YaMIGdhbWUg55qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD77yM5Zue6LCD5Lya5Zyo56ys5LiA5pe26Ze06KKr6Kem5Y+R5ZCO5Yig6Zmk6Ieq6Lqr44CCXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBvbmNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzFdIGFyZzFcclxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMl0gYXJnMlxyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcclxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNV0gYXJnNVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXHJcbiAgICAgKi9cclxuICAgIG9uY2UgKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcclxuICAgICAgICAvLyBNYWtlIHN1cmUgRVZFTlRfRU5HSU5FX0lOSVRFRCBhbmQgRVZFTlRfR0FNRV9JTklURUQgY2FsbGJhY2tzIHRvIGJlIGludm9rZWRcclxuICAgICAgICBpZiAoKHRoaXMuX3ByZXBhcmVkICYmIHR5cGUgPT09IHRoaXMuRVZFTlRfRU5HSU5FX0lOSVRFRCkgfHxcclxuICAgICAgICAgICAgKCF0aGlzLl9wYXVzZWQgJiYgdHlwZSA9PT0gdGhpcy5FVkVOVF9HQU1FX0lOSVRFRCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFRhcmdldE9uY2UodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUHJlcGFyZSBnYW1lLlxyXG4gICAgICogISN6aCDlh4blpIflvJXmk47vvIzor7fkuI3opoHnm7TmjqXosIPnlKjov5nkuKrlh73mlbDjgIJcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXHJcbiAgICAgKiBAbWV0aG9kIHByZXBhcmVcclxuICAgICAqL1xyXG4gICAgcHJlcGFyZSAoY2IpIHtcclxuICAgICAgICAvLyBBbHJlYWR5IHByZXBhcmVkXHJcbiAgICAgICAgaWYgKHRoaXMuX3ByZXBhcmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjYikgY2IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbG9hZFByZXZpZXdTY3JpcHQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVwYXJlRmluaXNoZWQoY2IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUnVuIGdhbWUgd2l0aCBjb25maWd1cmF0aW9uIG9iamVjdCBhbmQgb25TdGFydCBmdW5jdGlvbi5cclxuICAgICAqICEjemgg6L+Q6KGM5ri45oiP77yM5bm25LiU5oyH5a6a5byV5pOO6YWN572u5ZKMIG9uU3RhcnQg55qE5Zue6LCD44CCXHJcbiAgICAgKiBAbWV0aG9kIHJ1blxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIFBhc3MgY29uZmlndXJhdGlvbiBvYmplY3Qgb3Igb25TdGFydCBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25TdGFydCAtIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGdhbWUgaW5pdGlhbGl6ZWRcclxuICAgICAqL1xyXG4gICAgcnVuOiBmdW5jdGlvbiAoY29uZmlnLCBvblN0YXJ0KSB7XHJcbiAgICAgICAgdGhpcy5faW5pdENvbmZpZyhjb25maWcpO1xyXG4gICAgICAgIHRoaXMub25TdGFydCA9IG9uU3RhcnQ7XHJcbiAgICAgICAgdGhpcy5wcmVwYXJlKGdhbWUub25TdGFydCAmJiBnYW1lLm9uU3RhcnQuYmluZChnYW1lKSk7XHJcbiAgICB9LFxyXG5cclxuLy8gIEAgUGVyc2lzdCByb290IG5vZGUgc2VjdGlvblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBBZGQgYSBwZXJzaXN0ZW50IHJvb3Qgbm9kZSB0byB0aGUgZ2FtZSwgdGhlIHBlcnNpc3RlbnQgbm9kZSB3b24ndCBiZSBkZXN0cm95ZWQgZHVyaW5nIHNjZW5lIHRyYW5zaXRpb24uPGJyLz5cclxuICAgICAqIFRoZSB0YXJnZXQgbm9kZSBtdXN0IGJlIHBsYWNlZCBpbiB0aGUgcm9vdCBsZXZlbCBvZiBoaWVyYXJjaHksIG90aGVyd2lzZSB0aGlzIEFQSSB3b24ndCBoYXZlIGFueSBlZmZlY3QuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlo7DmmI7luLjpqbvmoLnoioLngrnvvIzor6XoioLngrnkuI3kvJrooqvlnKjlnLrmma/liIfmjaLkuK3ooqvplIDmr4HjgII8YnIvPlxyXG4gICAgICog55uu5qCH6IqC54K55b+F6aG75L2N5LqO5Li65bGC57qn55qE5qC56IqC54K577yM5ZCm5YiZ5peg5pWI44CCXHJcbiAgICAgKiBAbWV0aG9kIGFkZFBlcnNpc3RSb290Tm9kZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIG5vZGUgdG8gYmUgbWFkZSBwZXJzaXN0ZW50XHJcbiAgICAgKi9cclxuICAgIGFkZFBlcnNpc3RSb290Tm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICBpZiAoIWNjLk5vZGUuaXNOb2RlKG5vZGUpIHx8ICFub2RlLnV1aWQpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDM4MDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpZCA9IG5vZGUudXVpZDtcclxuICAgICAgICBpZiAoIXRoaXMuX3BlcnNpc3RSb290Tm9kZXNbaWRdKSB7XHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLl9zY2VuZTtcclxuICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoc2NlbmUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBzY2VuZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAhKG5vZGUucGFyZW50IGluc3RhbmNlb2YgY2MuU2NlbmUpICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgzODAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChub2RlLnBhcmVudCAhPT0gc2NlbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzgwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3BlcnNpc3RSb290Tm9kZXNbaWRdID0gbm9kZTtcclxuICAgICAgICAgICAgbm9kZS5fcGVyc2lzdE5vZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIuX3JlbGVhc2VNYW5hZ2VyLl9hZGRQZXJzaXN0Tm9kZVJlZihub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmUgYSBwZXJzaXN0ZW50IHJvb3Qgbm9kZS5cclxuICAgICAqICEjemgg5Y+W5raI5bi46am75qC56IqC54K544CCXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVBlcnNpc3RSb290Tm9kZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIG5vZGUgdG8gYmUgcmVtb3ZlZCBmcm9tIHBlcnNpc3RlbnQgbm9kZSBsaXN0XHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVBlcnNpc3RSb290Tm9kZTogZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgICAgICB2YXIgaWQgPSBub2RlLnV1aWQgfHwgJyc7XHJcbiAgICAgICAgaWYgKG5vZGUgPT09IHRoaXMuX3BlcnNpc3RSb290Tm9kZXNbaWRdKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wZXJzaXN0Um9vdE5vZGVzW2lkXTtcclxuICAgICAgICAgICAgbm9kZS5fcGVyc2lzdE5vZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLl9yZWxlYXNlTWFuYWdlci5fcmVtb3ZlUGVyc2lzdE5vZGVSZWYobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0aGUgbm9kZSBpcyBhIHBlcnNpc3RlbnQgcm9vdCBub2RlLlxyXG4gICAgICogISN6aCDmo4Dmn6XoioLngrnmmK/lkKbmmK/luLjpqbvmoLnoioLngrnjgIJcclxuICAgICAqIEBtZXRob2QgaXNQZXJzaXN0Um9vdE5vZGVcclxuICAgICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBub2RlIHRvIGJlIGNoZWNrZWRcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzUGVyc2lzdFJvb3ROb2RlOiBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHJldHVybiBub2RlLl9wZXJzaXN0Tm9kZTtcclxuICAgIH0sXHJcblxyXG4vL0BQcml2YXRlIE1ldGhvZHNcclxuXHJcbi8vICBAVGltZSB0aWNrZXIgc2VjdGlvblxyXG4gICAgX3NldEFuaW1GcmFtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2xhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdmFyIGZyYW1lUmF0ZSA9IGdhbWUuY29uZmlnLmZyYW1lUmF0ZTtcclxuICAgICAgICB0aGlzLl9mcmFtZVRpbWUgPSAxMDAwIC8gZnJhbWVSYXRlO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLl9tYXhQYXJ0aWNsZURlbHRhVGltZSA9IHRoaXMuX2ZyYW1lVGltZSAvIDEwMDAgKiAyO1xyXG4gICAgICAgIGlmIChDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xyXG4gICAgICAgICAgICBqc2Iuc2V0UHJlZmVycmVkRnJhbWVzUGVyU2Vjb25kKGZyYW1lUmF0ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByQUYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSAhPT0gNjAgJiYgZnJhbWVSYXRlICE9PSAzMCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSByQUYgPyB0aGlzLl9zdFRpbWVXaXRoUkFGIDogdGhpcy5fc3RUaW1lO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1GcmFtZSA9IHRoaXMuX2N0VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gckFGIHx8IHRoaXMuX3N0VGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbUZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubXNDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAgICAgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N0VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3N0VGltZVdpdGhSQUY6IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuICAgICAgICB2YXIgY3VyclRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIGdhbWUuX2ZyYW1lVGltZSAtIChjdXJyVGltZSAtIGdhbWUuX2xhc3RUaW1lKSk7XHJcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfSwgdGltZVRvQ2FsbCk7XHJcbiAgICAgICAgZ2FtZS5fbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3RUaW1lOiBmdW5jdGlvbihjYWxsYmFjayl7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCBnYW1lLl9mcmFtZVRpbWUgLSAoY3VyclRpbWUgLSBnYW1lLl9sYXN0VGltZSkpO1xyXG4gICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjaygpOyB9LFxyXG4gICAgICAgICAgICB0aW1lVG9DYWxsKTtcclxuICAgICAgICBnYW1lLl9sYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9LFxyXG4gICAgX2N0VGltZTogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaWQpO1xyXG4gICAgfSxcclxuICAgIC8vUnVuIGdhbWUuXHJcbiAgICBfcnVuTWFpbkxvb3A6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wcmVwYXJlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsIGNhbGxiYWNrLCBjb25maWcgPSBzZWxmLmNvbmZpZyxcclxuICAgICAgICAgICAgZGlyZWN0b3IgPSBjYy5kaXJlY3RvcixcclxuICAgICAgICAgICAgc2tpcCA9IHRydWUsIGZyYW1lUmF0ZSA9IGNvbmZpZy5mcmFtZVJhdGU7XHJcblxyXG4gICAgICAgIGRlYnVnLnNldERpc3BsYXlTdGF0cyhjb25maWcuc2hvd0ZQUyk7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKG5vdykge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuX3BhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5faW50ZXJ2YWxJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgIGlmICghQ0NfSlNCICYmICFDQ19SVU5USU1FICYmIGZyYW1lUmF0ZSA9PT0gMzApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpcCA9ICFza2lwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rvci5tYWluTG9vcChub3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2VsZi5faW50ZXJ2YWxJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKTtcclxuICAgICAgICBzZWxmLl9wYXVzZWQgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4vLyAgQEdhbWUgbG9hZGluZyBzZWN0aW9uXHJcbiAgICBfaW5pdENvbmZpZyAoY29uZmlnKSB7XHJcbiAgICAgICAgLy8gQ29uZmlncyBhZGp1c3RtZW50XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZGVidWdNb2RlICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBjb25maWcuZGVidWdNb2RlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLmV4cG9zZUNsYXNzTmFtZSA9ICEhY29uZmlnLmV4cG9zZUNsYXNzTmFtZTtcclxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy5mcmFtZVJhdGUgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5mcmFtZVJhdGUgPSA2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlbmRlck1vZGUgPSBjb25maWcucmVuZGVyTW9kZTtcclxuICAgICAgICBpZiAodHlwZW9mIHJlbmRlck1vZGUgIT09ICdudW1iZXInIHx8IHJlbmRlck1vZGUgPiAyIHx8IHJlbmRlck1vZGUgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5yZW5kZXJNb2RlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcucmVnaXN0ZXJTeXN0ZW1FdmVudCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5yZWdpc3RlclN5c3RlbUV2ZW50ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbmRlck1vZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgY29uZmlnLnNob3dGUFMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5zaG93RlBTID0gISFjb25maWcuc2hvd0ZQUztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbGxpZGUgTWFwIGFuZCBHcm91cCBMaXN0XHJcbiAgICAgICAgdGhpcy5jb2xsaXNpb25NYXRyaXggPSBjb25maWcuY29sbGlzaW9uTWF0cml4IHx8IFtdO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gY29uZmlnLmdyb3VwTGlzdCB8fCBbXTtcclxuXHJcbiAgICAgICAgZGVidWcuX3Jlc2V0RGVidWdTZXR0aW5nKGNvbmZpZy5kZWJ1Z01vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICB0aGlzLl9jb25maWdMb2FkZWQgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZGV0ZXJtaW5lUmVuZGVyVHlwZSAoKSB7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICB1c2VyUmVuZGVyTW9kZSA9IHBhcnNlSW50KGNvbmZpZy5yZW5kZXJNb2RlKSB8fCAwO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgUmVuZGVyVHlwZVxyXG4gICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHRoaXMuUkVOREVSX1RZUEVfQ0FOVkFTO1xyXG4gICAgICAgIGxldCBzdXBwb3J0UmVuZGVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh1c2VyUmVuZGVyTW9kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmNhcGFiaWxpdGllc1snb3BlbmdsJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHRoaXMuUkVOREVSX1RZUEVfV0VCR0w7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0UmVuZGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjYy5zeXMuY2FwYWJpbGl0aWVzWydjYW52YXMnXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gdGhpcy5SRU5ERVJfVFlQRV9DQU5WQVM7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0UmVuZGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh1c2VyUmVuZGVyTW9kZSA9PT0gMSAmJiBjYy5zeXMuY2FwYWJpbGl0aWVzWydjYW52YXMnXSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclR5cGUgPSB0aGlzLlJFTkRFUl9UWVBFX0NBTlZBUztcclxuICAgICAgICAgICAgc3VwcG9ydFJlbmRlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJSZW5kZXJNb2RlID09PSAyICYmIGNjLnN5cy5jYXBhYmlsaXRpZXNbJ29wZW5nbCddKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHRoaXMuUkVOREVSX1RZUEVfV0VCR0w7XHJcbiAgICAgICAgICAgIHN1cHBvcnRSZW5kZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzdXBwb3J0UmVuZGVyKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkZWJ1Zy5nZXRFcnJvcigzODIwLCB1c2VyUmVuZGVyTW9kZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2luaXRSZW5kZXJlciAoKSB7XHJcbiAgICAgICAgLy8gQXZvaWQgc2V0dXAgdG8gYmUgY2FsbGVkIHR3aWNlLlxyXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJlckluaXRpYWxpemVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBlbCA9IHRoaXMuY29uZmlnLmlkLFxyXG4gICAgICAgICAgICB3aWR0aCwgaGVpZ2h0LFxyXG4gICAgICAgICAgICBsb2NhbENhbnZhcywgbG9jYWxDb250YWluZXI7XHJcblxyXG4gICAgICAgIGlmIChDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGxvY2FsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IGxvY2FsQ29udGFpbmVyLnBhcmVudE5vZGUgPT09IGRvY3VtZW50LmJvZHkgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBsb2NhbENvbnRhaW5lci5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICBsb2NhbENhbnZhcyA9IHdpbmRvdy5fX2NhbnZhcztcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBsb2NhbENhbnZhcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gKGVsIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpID8gZWwgOiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBlbCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PT0gXCJDQU5WQVNcIikge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSBlbGVtZW50LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbWVudC5oZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pdCBpcyBhbHJlYWR5IGEgY2FudmFzLCB3ZSB3cmFwIGl0IGFyb3VuZCB3aXRoIGEgZGl2XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGxvY2FsQ2FudmFzID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gbG9jYWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsQ2FudmFzLnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxDYW52YXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobG9jYWxDb250YWluZXIsIGxvY2FsQ2FudmFzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vd2UgbXVzdCBtYWtlIGEgbmV3IGNhbnZhcyBhbmQgcGxhY2UgaW50byB0aGlzIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgIT09IFwiRElWXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzgxOSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gbG9jYWxDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQ0FOVkFTXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBsb2NhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxvY2FsQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ0NvY29zMmRHYW1lQ29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGxvY2FsQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvY2FsQ2FudmFzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IChsb2NhbENvbnRhaW5lci5wYXJlbnROb2RlID09PSBkb2N1bWVudC5ib2R5KSA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IGxvY2FsQ29udGFpbmVyLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGRDbGFzcyAoZWxlbWVudCwgbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc0NsYXNzID0gKCcgJyArIGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnKS5pbmRleE9mKCcgJyArIG5hbWUgKyAnICcpID4gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0NsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZENsYXNzKGxvY2FsQ2FudmFzLCBcImdhbWVDYW52YXNcIik7XHJcbiAgICAgICAgICAgIGxvY2FsQ2FudmFzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoIHx8IDQ4MCk7XHJcbiAgICAgICAgICAgIGxvY2FsQ2FudmFzLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBoZWlnaHQgfHwgMzIwKTtcclxuICAgICAgICAgICAgbG9jYWxDYW52YXMuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgOTkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZGV0ZXJtaW5lUmVuZGVyVHlwZSgpO1xyXG4gICAgICAgIC8vIFdlYkdMIGNvbnRleHQgY3JlYXRlZCBzdWNjZXNzZnVsbHlcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJUeXBlID09PSB0aGlzLlJFTkRFUl9UWVBFX1dFQkdMKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0ge1xyXG4gICAgICAgICAgICAgICAgJ3N0ZW5jaWwnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gTVNBQSBpcyBjYXVzaW5nIHNlcmlvdXMgcGVyZm9ybWFuY2UgZHJvcGRvd24gb24gc29tZSBicm93c2Vycy5cclxuICAgICAgICAgICAgICAgICdhbnRpYWxpYXMnOiBjYy5tYWNyby5FTkFCTEVfV0VCR0xfQU5USUFMSUFTLFxyXG4gICAgICAgICAgICAgICAgJ2FscGhhJzogY2MubWFjcm8uRU5BQkxFX1RSQU5TUEFSRU5UX0NBTlZBU1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZW5kZXJlci5pbml0V2ViR0wobG9jYWxDYW52YXMsIG9wdHMpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJDb250ZXh0ID0gcmVuZGVyZXIuZGV2aWNlLl9nbDtcclxuXHJcbiAgICAgICAgICAgIC8vIEVuYWJsZSBkeW5hbWljIGF0bGFzIG1hbmFnZXIgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICBpZiAoIWNjLm1hY3JvLkNMRUFOVVBfSU1BR0VfQ0FDSEUgJiYgZHluYW1pY0F0bGFzTWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX3JlbmRlckNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gdGhpcy5SRU5ERVJfVFlQRV9DQU5WQVM7XHJcbiAgICAgICAgICAgIC8vIENvdWxkIGJlIGlnbm9yZWQgYnkgbW9kdWxlIHNldHRpbmdzXHJcbiAgICAgICAgICAgIHJlbmRlcmVyLmluaXRDYW52YXMobG9jYWxDYW52YXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJDb250ZXh0ID0gcmVuZGVyZXIuZGV2aWNlLl9jdHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcy5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWNjLl9pc0NvbnRleHRNZW51RW5hYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXJJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbml0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHdpbiA9IHdpbmRvdywgaGlkZGVuUHJvcE5hbWU7XHJcblxyXG4gICAgICAgIC8vIHJlZ2lzdGVyIHN5c3RlbSBldmVudHNcclxuICAgICAgICBpZiAodGhpcy5jb25maWcucmVnaXN0ZXJTeXN0ZW1FdmVudClcclxuICAgICAgICAgICAgY2MuaW50ZXJuYWwuaW5wdXRNYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtRXZlbnQodGhpcy5jYW52YXMpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaGlkZGVuUHJvcE5hbWUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaGlkZGVuUHJvcE5hbWUgPSBcIm1vekhpZGRlblwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBoaWRkZW5Qcm9wTmFtZSA9IFwibXNIaWRkZW5cIjtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGhpZGRlblByb3BOYW1lID0gXCJ3ZWJraXRIaWRkZW5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBoaWRkZW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25IaWRkZW4gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWhpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdhbWUuZW1pdChnYW1lLkVWRU5UX0hJREUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEluIG9yZGVyIHRvIGFkYXB0IHRoZSBtb3N0IG9mIHBsYXRmb3JtcyB0aGUgb25zaG93IEFQSS5cclxuICAgICAgICBmdW5jdGlvbiBvblNob3duIChhcmcwLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0KSB7XHJcbiAgICAgICAgICAgIGlmIChoaWRkZW4pIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5lbWl0KGdhbWUuRVZFTlRfU0hPVywgYXJnMCwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoaWRkZW5Qcm9wTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlTGlzdCA9IFtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eWNoYW5nZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJtb3p2aXNpYmlsaXR5Y2hhbmdlXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlXCIsXHJcbiAgICAgICAgICAgICAgICBcInFicm93c2VyVmlzaWJpbGl0eUNoYW5nZVwiXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbmdlTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjaGFuZ2VMaXN0W2ldLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlzaWJsZSA9IGRvY3VtZW50W2hpZGRlblByb3BOYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBRUSBBcHBcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlID0gdmlzaWJsZSB8fCBldmVudFtcImhpZGRlblwiXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25IaWRkZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2hvd24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIG9uSGlkZGVuKTtcclxuICAgICAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBvblNob3duKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNaWNyb01lc3NlbmdlclwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHdpbi5vbmZvY3VzID0gb25TaG93bjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChcIm9ucGFnZXNob3dcIiBpbiB3aW5kb3cgJiYgXCJvbnBhZ2VoaWRlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgb25IaWRkZW4pO1xyXG4gICAgICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uU2hvd24pO1xyXG4gICAgICAgICAgICAvLyBUYW9iYW8gVUlXZWJLaXRcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIG9uSGlkZGVuKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uU2hvd24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbihnYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub24oZ2FtZS5FVkVOVF9TSE9XLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGdhbWUucmVzdW1lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5FdmVudFRhcmdldC5jYWxsKGdhbWUpO1xyXG5jYy5qcy5hZGRvbihnYW1lLCBFdmVudFRhcmdldC5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBUaGlzIGlzIGEgR2FtZSBpbnN0YW5jZS5cclxuICogISN6aCDov5nmmK/kuIDkuKogR2FtZSDnsbvnmoTlrp7kvovvvIzljIXlkKvmuLjmiI/kuLvkvZPkv6Hmga/lubbotJ/otKPpqbHliqjmuLjmiI/nmoTmuLjmiI/lr7nosaHjgILjgIJcclxuICogQHByb3BlcnR5IGdhbWVcclxuICogQHR5cGUgR2FtZVxyXG4gKi9cclxuY2MuZ2FtZSA9IG1vZHVsZS5leHBvcnRzID0gZ2FtZTtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=