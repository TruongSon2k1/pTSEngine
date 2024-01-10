
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCAnimation.js';
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
var AnimationAnimator = require('../../animation/animation-animator');

var AnimationClip = require('../../animation/animation-clip');

var EventTarget = require('../event/event-target');

var js = require('../platform/js');

var equalClips = CC_EDITOR ? function (clip1, clip2) {
  return clip1 === clip2 || clip1 && clip2 && (clip1.name === clip2.name || clip1._uuid === clip2._uuid);
} : function (clip1, clip2) {
  return clip1 === clip2;
};
/**
 * !#en The event type supported by Animation
 * !#zh Animation 支持的事件类型
 * @class Animation.EventType
 * @static
 * @namespace Animationd
 */

var EventType = cc.Enum({
  /**
   * !#en Emit when begin playing animation
   * !#zh 开始播放时触发
   * @property {String} PLAY
   * @static
   */
  PLAY: 'play',

  /**
   * !#en Emit when stop playing animation
   * !#zh 停止播放时触发
   * @property {String} STOP
   * @static
   */
  STOP: 'stop',

  /**
   * !#en Emit when pause animation
   * !#zh 暂停播放时触发
   * @property {String} PAUSE
   * @static
   */
  PAUSE: 'pause',

  /**
   * !#en Emit when resume animation
   * !#zh 恢复播放时触发
   * @property {String} RESUME
   * @static
   */
  RESUME: 'resume',

  /**
   * !#en If animation repeat count is larger than 1, emit when animation play to the last frame
   * !#zh 假如动画循环次数大于 1，当动画播放到最后一帧时触发
   * @property {String} LASTFRAME
   * @static
   */
  LASTFRAME: 'lastframe',

  /**
   * !#en Emit when finish playing animation
   * !#zh 动画播放完成时触发
   * @property {String} FINISHED
   * @static
   */
  FINISHED: 'finished'
});
/**
 * !#en The animation component is used to play back animations.
 *
 * Animation provide several events to register：
 *  - play : Emit when begin playing animation
 *  - stop : Emit when stop playing animation
 *  - pause : Emit when pause animation
 *  - resume : Emit when resume animation
 *  - lastframe : If animation repeat count is larger than 1, emit when animation play to the last frame
 *  - finished : Emit when finish playing animation
 *
 * !#zh Animation 组件用于播放动画。
 *
 * Animation 提供了一系列可注册的事件：
 *  - play : 开始播放时
 *  - stop : 停止播放时
 *  - pause : 暂停播放时
 *  - resume : 恢复播放时
 *  - lastframe : 假如动画循环次数大于 1，当动画播放到最后一帧时
 *  - finished : 动画播放完成时
 *
 * @class Animation
 * @extends Component
 * @uses EventTarget
 */

var Animation = cc.Class({
  name: 'cc.Animation',
  "extends": require('./CCComponent'),
  mixins: [EventTarget],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/Animation',
    help: 'i18n:COMPONENT.help_url.animation',
    executeInEditMode: true
  },
  statics: {
    EventType: EventType
  },
  ctor: function ctor() {
    cc.EventTarget.call(this); // The actual implement for Animation

    this._animator = null;
    this._nameToState = js.createMap(true);
    this._didInit = false;
    this._currentClip = null;
  },
  properties: {
    _defaultClip: {
      "default": null,
      type: AnimationClip
    },

    /**
     * !#en Animation will play the default clip when start game.
     * !#zh 在勾选自动播放或调用 play() 时默认播放的动画剪辑。
     * @property defaultClip
     * @type {AnimationClip}
     */
    defaultClip: {
      type: AnimationClip,
      get: function get() {
        return this._defaultClip;
      },
      set: function set(value) {
        if (!CC_EDITOR || cc.engine && cc.engine.isPlaying) {
          return;
        }

        this._defaultClip = value;

        if (!value) {
          return;
        }

        var contain = this._clips.findIndex(function (clip) {
          return equalClips(clip, value);
        }) >= 0;

        if (!contain) {
          this.addClip(value);
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.default_clip'
    },

    /**
     * !#en Current played clip.
     * !#zh 当前播放的动画剪辑。
     * @property currentClip
     * @type {AnimationClip}
     */
    currentClip: {
      get: function get() {
        return this._currentClip;
      },
      set: function set(value) {
        this._currentClip = value;
      },
      type: AnimationClip,
      visible: false
    },
    // This property is used to watch clip changes in editor.
    // Don't use in your game, use addClip/removeClip instead.
    _writableClips: {
      get: function get() {
        return this._clips;
      },
      set: function set(val) {
        this._didInit = false;
        this._clips = val;

        this._init();
      },
      type: [AnimationClip]
    },

    /**
     * !#en All the clips used in this animation.
     * !#zh 通过脚本可以访问并播放的 AnimationClip 列表。
     * @property _clips
     * @type {AnimationClip[]}
     * @private
     */
    _clips: {
      "default": [],
      type: [AnimationClip],
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.clips',
      visible: true
    },

    /**
     * !#en Whether the animation should auto play the default clip when start game.
     * !#zh 是否在运行游戏后自动播放默认动画剪辑。
     * @property playOnLoad
     * @type {Boolean}
     * @default true
     */
    playOnLoad: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.animation.play_on_load'
    }
  },
  start: function start() {
    if (!CC_EDITOR && this.playOnLoad && this._defaultClip) {
      var isPlaying = this._animator && this._animator.isPlaying;

      if (!isPlaying) {
        var state = this.getAnimationState(this._defaultClip.name);

        this._animator.playState(state);
      }
    }
  },
  onEnable: function onEnable() {
    if (this._animator) {
      this._animator.resume();
    }
  },
  onDisable: function onDisable() {
    if (this._animator) {
      this._animator.pause();
    }
  },
  onDestroy: function onDestroy() {
    this.stop();
  },
  ///////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * !#en Get all the clips used in this animation.
   * !#zh 获取动画组件上的所有动画剪辑。
   * @method getClips
   * @return {AnimationClip[]}
   */
  getClips: function getClips() {
    return this._clips;
  },

  /**
   * !#en Plays an animation and stop other animations.
   * !#zh 播放指定的动画，并且停止当前正在播放动画。如果没有指定动画，则播放默认动画。
   * @method play
   * @param {String} [name] - The name of animation to play. If no name is supplied then the default animation will be played.
   * @param {Number} [startTime] - play an animation from startTime
   * @return {AnimationState} - The AnimationState of playing animation. In cases where the animation can't be played (ie, there is no default animation or no animation with the specified name), the function will return null.
   * @example
   * var animCtrl = this.node.getComponent(cc.Animation);
   * animCtrl.play("linear");
   */
  play: function play(name, startTime) {
    var state = this.playAdditive(name, startTime);

    this._animator.stopStatesExcept(state);

    return state;
  },

  /**
   * !#en
   * Plays an additive animation, it will not stop other animations.
   * If there are other animations playing, then will play several animations at the same time.
   * !#zh 播放指定的动画（将不会停止当前播放的动画）。如果没有指定动画，则播放默认动画。
   * @method playAdditive
   * @param {String} [name] - The name of animation to play. If no name is supplied then the default animation will be played.
   * @param {Number} [startTime] - play an animation from startTime
   * @return {AnimationState} - The AnimationState of playing animation. In cases where the animation can't be played (ie, there is no default animation or no animation with the specified name), the function will return null.
   * @example
   * // linear_1 and linear_2 at the same time playing.
   * var animCtrl = this.node.getComponent(cc.Animation);
   * animCtrl.playAdditive("linear_1");
   * animCtrl.playAdditive("linear_2");
   */
  playAdditive: function playAdditive(name, startTime) {
    this._init();

    var state = this.getAnimationState(name || this._defaultClip && this._defaultClip.name);

    if (state) {
      this.enabled = true;
      var animator = this._animator;

      if (animator.isPlaying && state.isPlaying) {
        if (state.isPaused) {
          animator.resumeState(state);
        } else {
          animator.stopState(state);
          animator.playState(state, startTime);
        }
      } else {
        animator.playState(state, startTime);
      } // Animation cannot be played when the component is not enabledInHierarchy.
      // That would cause an error for the animation lost the reference after destroying the node.
      // If users play the animation when the component is not enabledInHierarchy,
      // we pause the animator here so that it will automatically resume the animation when users enable the component.


      if (!this.enabledInHierarchy) {
        animator.pause();
      }

      this.currentClip = state.clip;
    }

    return state;
  },

  /**
   * !#en Stops an animation named name. If no name is supplied then stops all playing animations that were started with this Animation. <br/>
   * Stopping an animation also Rewinds it to the Start.
   * !#zh 停止指定的动画。如果没有指定名字，则停止当前正在播放的动画。
   * @method stop
   * @param {String} [name] - The animation to stop, if not supplied then stops all playing animations.
   */
  stop: function stop(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.stopState(state);
      }
    } else {
      this._animator.stop();
    }
  },

  /**
   * !#en Pauses an animation named name. If no name is supplied then pauses all playing animations that were started with this Animation.
   * !#zh 暂停当前或者指定的动画。如果没有指定名字，则暂停当前正在播放的动画。
   * @method pause
   * @param {String} [name] - The animation to pauses, if not supplied then pauses all playing animations.
   */
  pause: function pause(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this._nameToState[name];

      if (state) {
        this._animator.pauseState(state);
      }
    } else {
      this.enabled = false;
    }
  },

  /**
   * !#en Resumes an animation named name. If no name is supplied then resumes all paused animations that were started with this Animation.
   * !#zh 重新播放指定的动画，如果没有指定名字，则重新播放当前正在播放的动画。
   * @method resume
   * @param {String} [name] - The animation to resumes, if not supplied then resumes all paused animations.
   */
  resume: function resume(name) {
    if (!this._didInit) {
      return;
    }

    if (name) {
      var state = this.getAnimationState(name);

      if (state) {
        this._animator.resumeState(state);
      }
    } else {
      this.enabled = true;
    }
  },

  /**
   * !#en Make an animation named name go to the specified time. If no name is supplied then make all animations go to the specified time.
   * !#zh 设置指定动画的播放时间。如果没有指定名字，则设置当前播放动画的播放时间。
   * @method setCurrentTime
   * @param {Number} [time] - The time to go to
   * @param {String} [name] - Specified animation name, if not supplied then make all animations go to the time.
   */
  setCurrentTime: function setCurrentTime(time, name) {
    this._init();

    if (name) {
      var state = this.getAnimationState(name);

      if (state) {
        this._animator.setStateTime(state, time);
      }
    } else {
      this._animator.setStateTime(time);
    }
  },

  /**
   * !#en Returns the animation state named name. If no animation with the specified name, the function will return null.
   * !#zh 获取当前或者指定的动画状态，如果未找到指定动画剪辑则返回 null。
   * @method getAnimationState
   * @param {String} name
   * @return {AnimationState}
   */
  getAnimationState: function getAnimationState(name) {
    this._init();

    var state = this._nameToState[name];

    if (CC_EDITOR && (!state || !cc.js.array.contains(this._clips, state.clip))) {
      this._didInit = false;

      if (this._animator) {
        this._animator.stop();
      }

      this._init();

      state = this._nameToState[name];
    }

    if (state && !state.curveLoaded) {
      this._animator._reloadClip(state);
    }

    return state || null;
  },

  /**
   * !#en Adds a clip to the animation with name newName. If a clip with that name already exists it will be replaced with the new clip.
   * !#zh 添加动画剪辑，并且可以重新设置该动画剪辑的名称。
   * @method addClip
   * @param {AnimationClip} clip - the clip to add
   * @param {String} [newName]
   * @return {AnimationState} - The AnimationState which gives full control over the animation clip.
   */
  addClip: function addClip(clip, newName) {
    if (!clip) {
      cc.warnID(3900);
      return;
    }

    this._init(); // add clip


    if (!cc.js.array.contains(this._clips, clip)) {
      this._clips.push(clip);
    } // replace same name clip


    newName = newName || clip.name;
    var oldState = this._nameToState[newName];

    if (oldState) {
      if (oldState.clip === clip) {
        return oldState;
      } else {
        var index = this._clips.indexOf(oldState.clip);

        if (index !== -1) {
          this._clips.splice(index, 1);
        }
      }
    } // replace state


    var newState = new cc.AnimationState(clip, newName);
    this._nameToState[newName] = newState;
    return newState;
  },

  /**
   * !#en
   * Remove clip from the animation list. This will remove the clip and any animation states based on it.
   * If there are animation states depand on the clip are playing or clip is defaultClip, it will not delete the clip.
   * But if force is true, then will always remove the clip and any animation states based on it. If clip is defaultClip, defaultClip will be reset to null
   * !#zh
   * 从动画列表中移除指定的动画剪辑，<br/>
   * 如果依赖于 clip 的 AnimationState 正在播放或者 clip 是 defaultClip 的话，默认是不会删除 clip 的。
   * 但是如果 force 参数为 true，则会强制停止该动画，然后移除该动画剪辑和相关的动画。这时候如果 clip 是 defaultClip，defaultClip 将会被重置为 null。
   * @method removeClip
   * @param {AnimationClip} clip
   * @param {Boolean} [force=false] - If force is true, then will always remove the clip and any animation states based on it.
   */
  removeClip: function removeClip(clip, force) {
    if (!clip) {
      cc.warnID(3901);
      return;
    }

    this._init();

    var state;

    for (var name in this._nameToState) {
      state = this._nameToState[name];

      if (equalClips(state.clip, clip)) {
        break;
      }
    }

    if (clip === this._defaultClip) {
      if (force) this._defaultClip = null;else {
        if (!CC_TEST) cc.warnID(3902);
        return;
      }
    }

    if (state && state.isPlaying) {
      if (force) this.stop(state.name);else {
        if (!CC_TEST) cc.warnID(3903);
        return;
      }
    }

    this._clips = this._clips.filter(function (item) {
      return !equalClips(item, clip);
    });

    if (state) {
      delete this._nameToState[state.name];
    }
  },

  /**
   * !#en
   * Samples animations at the current state.<br/>
   * This is useful when you explicitly want to set up some animation state, and sample it once.
   * !#zh 对指定或当前动画进行采样。你可以手动将动画设置到某一个状态，然后采样一次。
   * @method sample
   * @param {String} name
   */
  sample: function sample(name) {
    this._init();

    if (name) {
      var state = this.getAnimationState(name);

      if (state) {
        state.sample();
      }
    } else {
      this._animator.sample();
    }
  },

  /**
   * !#en
   * Register animation event callback.
   * The event arguments will provide the AnimationState which emit the event.
   * When play an animation, will auto register the event callback to the AnimationState, and unregister the event callback from the AnimationState when animation stopped.
   * !#zh
   * 注册动画事件回调。
   * 回调的事件里将会附上发送事件的 AnimationState。
   * 当播放一个动画时，会自动将事件注册到对应的 AnimationState 上，停止播放时会将事件从这个 AnimationState 上取消注册。
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {cc.AnimationState} state
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @param {Boolean} [useCapture=false] - When set to true, the capture argument prevents callback
   *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
   *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
   *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
   *
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on(type: string, callback: (event: Event.EventCustom) => void, target?: any, useCapture?: boolean): (event: Event.EventCustom) => void
   * on<T>(type: string, callback: (event: T) => void, target?: any, useCapture?: boolean): (event: T) => void
   * on(type: string, callback: (type: string, state: cc.AnimationState) => void, target?: any, useCapture?: boolean): (type: string, state: cc.AnimationState) => void
   * @example
   * onPlay: function (type, state) {
   *     // callback
   * }
   *
   * // register event to all animation
   * animation.on('play', this.onPlay, this);
   */
  on: function on(type, callback, target, useCapture) {
    this._init();

    var ret = this._EventTargetOn(type, callback, target, useCapture);

    if (type === 'lastframe') {
      var states = this._nameToState;

      for (var name in states) {
        states[name]._lastframeEventOn = true;
      }
    }

    return ret;
  },

  /**
   * !#en
   * Unregister animation event callback.
   * !#zh
   * 取消注册动画事件回调。
   * @method off
   * @param {String} type - A string representing the event type being removed.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
   * @param {Boolean} [useCapture=false] - Specifies whether the callback being removed was registered as a capturing callback or not.
   *                              If not specified, useCapture defaults to false. If a callback was registered twice,
   *                              one with capture and one without, each must be removed separately. Removal of a capturing callback
   *                              does not affect a non-capturing version of the same listener, and vice versa.
   *
   * @example
   * // unregister event to all animation
   * animation.off('play', this.onPlay, this);
   */
  off: function off(type, callback, target, useCapture) {
    this._init();

    if (type === 'lastframe') {
      var states = this._nameToState;

      for (var name in states) {
        states[name]._lastframeEventOn = false;
      }
    }

    this._EventTargetOff(type, callback, target, useCapture);
  },
  ///////////////////////////////////////////////////////////////////////////////
  // Internal Methods
  ///////////////////////////////////////////////////////////////////////////////
  // Dont forget to call _init before every actual process in public methods.
  // Just invoking _init by onLoad is not enough because onLoad is called only if the entity is active.
  _init: function _init() {
    if (this._didInit) {
      return;
    }

    this._didInit = true;
    this._animator = new AnimationAnimator(this.node, this);

    this._createStates();
  },
  _createStates: function _createStates() {
    this._nameToState = js.createMap(true); // create animation states

    var state = null;
    var defaultClipState = false;

    for (var i = 0; i < this._clips.length; ++i) {
      var clip = this._clips[i];

      if (clip) {
        state = new cc.AnimationState(clip);

        if (CC_EDITOR) {
          this._animator._reloadClip(state);
        }

        this._nameToState[state.name] = state;

        if (equalClips(this._defaultClip, clip)) {
          defaultClipState = state;
        }
      }
    }

    if (this._defaultClip && !defaultClipState) {
      state = new cc.AnimationState(this._defaultClip);

      if (CC_EDITOR) {
        this._animator._reloadClip(state);
      }

      this._nameToState[state.name] = state;
    }
  }
});
Animation.prototype._EventTargetOn = EventTarget.prototype.on;
Animation.prototype._EventTargetOff = EventTarget.prototype.off;
cc.Animation = module.exports = Animation;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQW5pbWF0aW9uLmpzIl0sIm5hbWVzIjpbIkFuaW1hdGlvbkFuaW1hdG9yIiwicmVxdWlyZSIsIkFuaW1hdGlvbkNsaXAiLCJFdmVudFRhcmdldCIsImpzIiwiZXF1YWxDbGlwcyIsIkNDX0VESVRPUiIsImNsaXAxIiwiY2xpcDIiLCJuYW1lIiwiX3V1aWQiLCJFdmVudFR5cGUiLCJjYyIsIkVudW0iLCJQTEFZIiwiU1RPUCIsIlBBVVNFIiwiUkVTVU1FIiwiTEFTVEZSQU1FIiwiRklOSVNIRUQiLCJBbmltYXRpb24iLCJDbGFzcyIsIm1peGlucyIsImVkaXRvciIsIm1lbnUiLCJoZWxwIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJzdGF0aWNzIiwiY3RvciIsImNhbGwiLCJfYW5pbWF0b3IiLCJfbmFtZVRvU3RhdGUiLCJjcmVhdGVNYXAiLCJfZGlkSW5pdCIsIl9jdXJyZW50Q2xpcCIsInByb3BlcnRpZXMiLCJfZGVmYXVsdENsaXAiLCJ0eXBlIiwiZGVmYXVsdENsaXAiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImVuZ2luZSIsImlzUGxheWluZyIsImNvbnRhaW4iLCJfY2xpcHMiLCJmaW5kSW5kZXgiLCJjbGlwIiwiYWRkQ2xpcCIsInRvb2x0aXAiLCJDQ19ERVYiLCJjdXJyZW50Q2xpcCIsInZpc2libGUiLCJfd3JpdGFibGVDbGlwcyIsInZhbCIsIl9pbml0IiwicGxheU9uTG9hZCIsInN0YXJ0Iiwic3RhdGUiLCJnZXRBbmltYXRpb25TdGF0ZSIsInBsYXlTdGF0ZSIsIm9uRW5hYmxlIiwicmVzdW1lIiwib25EaXNhYmxlIiwicGF1c2UiLCJvbkRlc3Ryb3kiLCJzdG9wIiwiZ2V0Q2xpcHMiLCJwbGF5Iiwic3RhcnRUaW1lIiwicGxheUFkZGl0aXZlIiwic3RvcFN0YXRlc0V4Y2VwdCIsImVuYWJsZWQiLCJhbmltYXRvciIsImlzUGF1c2VkIiwicmVzdW1lU3RhdGUiLCJzdG9wU3RhdGUiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJwYXVzZVN0YXRlIiwic2V0Q3VycmVudFRpbWUiLCJ0aW1lIiwic2V0U3RhdGVUaW1lIiwiYXJyYXkiLCJjb250YWlucyIsImN1cnZlTG9hZGVkIiwiX3JlbG9hZENsaXAiLCJuZXdOYW1lIiwid2FybklEIiwicHVzaCIsIm9sZFN0YXRlIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibmV3U3RhdGUiLCJBbmltYXRpb25TdGF0ZSIsInJlbW92ZUNsaXAiLCJmb3JjZSIsIkNDX1RFU1QiLCJmaWx0ZXIiLCJpdGVtIiwic2FtcGxlIiwib24iLCJjYWxsYmFjayIsInRhcmdldCIsInVzZUNhcHR1cmUiLCJyZXQiLCJfRXZlbnRUYXJnZXRPbiIsInN0YXRlcyIsIl9sYXN0ZnJhbWVFdmVudE9uIiwib2ZmIiwiX0V2ZW50VGFyZ2V0T2ZmIiwibm9kZSIsIl9jcmVhdGVTdGF0ZXMiLCJkZWZhdWx0Q2xpcFN0YXRlIiwiaSIsImxlbmd0aCIsInByb3RvdHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGlCQUFpQixHQUFHQyxPQUFPLENBQUMsb0NBQUQsQ0FBakM7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHRCxPQUFPLENBQUMsZ0NBQUQsQ0FBN0I7O0FBQ0EsSUFBTUUsV0FBVyxHQUFHRixPQUFPLENBQUMsdUJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUcsRUFBRSxHQUFHSCxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBRUEsSUFBSUksVUFBVSxHQUFHQyxTQUFTLEdBQUcsVUFBVUMsS0FBVixFQUFpQkMsS0FBakIsRUFBd0I7QUFDakQsU0FBT0QsS0FBSyxLQUFLQyxLQUFWLElBQW9C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QUEzQixDQUFSOztBQUVBLFVBQUk5QixTQUFKLEVBQWU7QUFDWCxhQUFLd0IsU0FBTCxDQUFldUQsV0FBZixDQUEyQjNCLEtBQTNCO0FBQ0g7O0FBRUQsV0FBSzNCLFlBQUwsQ0FBa0IyQixLQUFLLENBQUNqRCxJQUF4QixJQUFnQ2lELEtBQWhDO0FBQ0g7QUFDSjtBQXZrQm9CLENBQVQsQ0FBaEI7QUEwa0JBdEMsU0FBUyxDQUFDZ0csU0FBVixDQUFvQlYsY0FBcEIsR0FBcUN2RyxXQUFXLENBQUNpSCxTQUFaLENBQXNCZixFQUEzRDtBQUNBakYsU0FBUyxDQUFDZ0csU0FBVixDQUFvQk4sZUFBcEIsR0FBc0MzRyxXQUFXLENBQUNpSCxTQUFaLENBQXNCUCxHQUE1RDtBQUVBakcsRUFBRSxDQUFDUSxTQUFILEdBQWVpRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsRyxTQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IEFuaW1hdGlvbkFuaW1hdG9yID0gcmVxdWlyZSgnLi4vLi4vYW5pbWF0aW9uL2FuaW1hdGlvbi1hbmltYXRvcicpO1xyXG5jb25zdCBBbmltYXRpb25DbGlwID0gcmVxdWlyZSgnLi4vLi4vYW5pbWF0aW9uL2FuaW1hdGlvbi1jbGlwJyk7XHJcbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XHJcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcclxuXHJcbmxldCBlcXVhbENsaXBzID0gQ0NfRURJVE9SID8gZnVuY3Rpb24gKGNsaXAxLCBjbGlwMikge1xyXG4gICAgcmV0dXJuIGNsaXAxID09PSBjbGlwMiB8fCAoY2xpcDEgJiYgY2xpcDIgJiYgKGNsaXAxLm5hbWUgPT09IGNsaXAyLm5hbWUgfHwgY2xpcDEuX3V1aWQgPT09IGNsaXAyLl91dWlkKSk7XHJcbn0gOiBmdW5jdGlvbiAoY2xpcDEsIGNsaXAyKSB7XHJcbiAgICByZXR1cm4gY2xpcDEgPT09IGNsaXAyO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIGV2ZW50IHR5cGUgc3VwcG9ydGVkIGJ5IEFuaW1hdGlvblxyXG4gKiAhI3poIEFuaW1hdGlvbiDmlK/mjIHnmoTkuovku7bnsbvlnotcclxuICogQGNsYXNzIEFuaW1hdGlvbi5FdmVudFR5cGVcclxuICogQHN0YXRpY1xyXG4gKiBAbmFtZXNwYWNlIEFuaW1hdGlvbmRcclxuICovXHJcbmxldCBFdmVudFR5cGUgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFbWl0IHdoZW4gYmVnaW4gcGxheWluZyBhbmltYXRpb25cclxuICAgICAqICEjemgg5byA5aeL5pKt5pS+5pe26Kem5Y+RXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gUExBWVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBQTEFZOiAncGxheScsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW1pdCB3aGVuIHN0b3AgcGxheWluZyBhbmltYXRpb25cclxuICAgICAqICEjemgg5YGc5q2i5pKt5pS+5pe26Kem5Y+RXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gU1RPUFxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBTVE9QOiAnc3RvcCcsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRW1pdCB3aGVuIHBhdXNlIGFuaW1hdGlvblxyXG4gICAgICogISN6aCDmmoLlgZzmkq3mlL7ml7bop6blj5FcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBQQVVTRVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBQQVVTRTogJ3BhdXNlJyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBFbWl0IHdoZW4gcmVzdW1lIGFuaW1hdGlvblxyXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7ml7bop6blj5FcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBSRVNVTUVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgUkVTVU1FOiAncmVzdW1lJyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJZiBhbmltYXRpb24gcmVwZWF0IGNvdW50IGlzIGxhcmdlciB0aGFuIDEsIGVtaXQgd2hlbiBhbmltYXRpb24gcGxheSB0byB0aGUgbGFzdCBmcmFtZVxyXG4gICAgICogISN6aCDlgYflpoLliqjnlLvlvqrnjq/mrKHmlbDlpKfkuo4gMe+8jOW9k+WKqOeUu+aSreaUvuWIsOacgOWQjuS4gOW4p+aXtuinpuWPkVxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IExBU1RGUkFNRVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBMQVNURlJBTUU6ICdsYXN0ZnJhbWUnLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEVtaXQgd2hlbiBmaW5pc2ggcGxheWluZyBhbmltYXRpb25cclxuICAgICAqICEjemgg5Yqo55S75pKt5pS+5a6M5oiQ5pe26Kem5Y+RXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gRklOSVNIRURcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgRklOSVNIRUQ6ICdmaW5pc2hlZCdcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgYW5pbWF0aW9uIGNvbXBvbmVudCBpcyB1c2VkIHRvIHBsYXkgYmFjayBhbmltYXRpb25zLlxyXG4gKlxyXG4gKiBBbmltYXRpb24gcHJvdmlkZSBzZXZlcmFsIGV2ZW50cyB0byByZWdpc3Rlcu+8mlxyXG4gKiAgLSBwbGF5IDogRW1pdCB3aGVuIGJlZ2luIHBsYXlpbmcgYW5pbWF0aW9uXHJcbiAqICAtIHN0b3AgOiBFbWl0IHdoZW4gc3RvcCBwbGF5aW5nIGFuaW1hdGlvblxyXG4gKiAgLSBwYXVzZSA6IEVtaXQgd2hlbiBwYXVzZSBhbmltYXRpb25cclxuICogIC0gcmVzdW1lIDogRW1pdCB3aGVuIHJlc3VtZSBhbmltYXRpb25cclxuICogIC0gbGFzdGZyYW1lIDogSWYgYW5pbWF0aW9uIHJlcGVhdCBjb3VudCBpcyBsYXJnZXIgdGhhbiAxLCBlbWl0IHdoZW4gYW5pbWF0aW9uIHBsYXkgdG8gdGhlIGxhc3QgZnJhbWVcclxuICogIC0gZmluaXNoZWQgOiBFbWl0IHdoZW4gZmluaXNoIHBsYXlpbmcgYW5pbWF0aW9uXHJcbiAqXHJcbiAqICEjemggQW5pbWF0aW9uIOe7hOS7tueUqOS6juaSreaUvuWKqOeUu+OAglxyXG4gKlxyXG4gKiBBbmltYXRpb24g5o+Q5L6b5LqG5LiA57O75YiX5Y+v5rOo5YaM55qE5LqL5Lu277yaXHJcbiAqICAtIHBsYXkgOiDlvIDlp4vmkq3mlL7ml7ZcclxuICogIC0gc3RvcCA6IOWBnOatouaSreaUvuaXtlxyXG4gKiAgLSBwYXVzZSA6IOaaguWBnOaSreaUvuaXtlxyXG4gKiAgLSByZXN1bWUgOiDmgaLlpI3mkq3mlL7ml7ZcclxuICogIC0gbGFzdGZyYW1lIDog5YGH5aaC5Yqo55S75b6q546v5qyh5pWw5aSn5LqOIDHvvIzlvZPliqjnlLvmkq3mlL7liLDmnIDlkI7kuIDluKfml7ZcclxuICogIC0gZmluaXNoZWQgOiDliqjnlLvmkq3mlL7lrozmiJDml7ZcclxuICpcclxuICogQGNsYXNzIEFuaW1hdGlvblxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICogQHVzZXMgRXZlbnRUYXJnZXRcclxuICovXHJcbmxldCBBbmltYXRpb24gPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuQW5pbWF0aW9uJyxcclxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcclxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5vdGhlcnMvQW5pbWF0aW9uJyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuYW5pbWF0aW9uJyxcclxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEV2ZW50VHlwZVxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGFjdHVhbCBpbXBsZW1lbnQgZm9yIEFuaW1hdGlvblxyXG4gICAgICAgIHRoaXMuX2FuaW1hdG9yID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fbmFtZVRvU3RhdGUgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5fZGlkSW5pdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9jdXJyZW50Q2xpcCA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICAgICAgX2RlZmF1bHRDbGlwOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IEFuaW1hdGlvbkNsaXAsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBBbmltYXRpb24gd2lsbCBwbGF5IHRoZSBkZWZhdWx0IGNsaXAgd2hlbiBzdGFydCBnYW1lLlxyXG4gICAgICAgICAqICEjemgg5Zyo5Yu+6YCJ6Ieq5Yqo5pKt5pS+5oiW6LCD55SoIHBsYXkoKSDml7bpu5jorqTmkq3mlL7nmoTliqjnlLvliarovpHjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgZGVmYXVsdENsaXBcclxuICAgICAgICAgKiBAdHlwZSB7QW5pbWF0aW9uQ2xpcH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBkZWZhdWx0Q2xpcDoge1xyXG4gICAgICAgICAgICB0eXBlOiBBbmltYXRpb25DbGlwLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q2xpcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SIHx8IChjYy5lbmdpbmUgJiYgY2MuZW5naW5lLmlzUGxheWluZykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENsaXAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY29udGFpbiA9IHRoaXMuX2NsaXBzLmZpbmRJbmRleCgoY2xpcCkgPT4gZXF1YWxDbGlwcyhjbGlwLCB2YWx1ZSkpID49IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENsaXAodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmFuaW1hdGlvbi5kZWZhdWx0X2NsaXAnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBDdXJyZW50IHBsYXllZCBjbGlwLlxyXG4gICAgICAgICAqICEjemgg5b2T5YmN5pKt5pS+55qE5Yqo55S75Ymq6L6R44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGN1cnJlbnRDbGlwXHJcbiAgICAgICAgICogQHR5cGUge0FuaW1hdGlvbkNsaXB9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY3VycmVudENsaXA6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudENsaXA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Q2xpcCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBBbmltYXRpb25DbGlwLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCB0byB3YXRjaCBjbGlwIGNoYW5nZXMgaW4gZWRpdG9yLlxyXG4gICAgICAgIC8vIERvbid0IHVzZSBpbiB5b3VyIGdhbWUsIHVzZSBhZGRDbGlwL3JlbW92ZUNsaXAgaW5zdGVhZC5cclxuICAgICAgICBfd3JpdGFibGVDbGlwczoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXBzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlkSW5pdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2xpcHMgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IFtBbmltYXRpb25DbGlwXSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEFsbCB0aGUgY2xpcHMgdXNlZCBpbiB0aGlzIGFuaW1hdGlvbi5cclxuICAgICAgICAgKiAhI3poIOmAmui/h+iEmuacrOWPr+S7peiuv+mXruW5tuaSreaUvueahCBBbmltYXRpb25DbGlwIOWIl+ihqOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfY2xpcHNcclxuICAgICAgICAgKiBAdHlwZSB7QW5pbWF0aW9uQ2xpcFtdfVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2NsaXBzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbQW5pbWF0aW9uQ2xpcF0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYW5pbWF0aW9uLmNsaXBzJyxcclxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciB0aGUgYW5pbWF0aW9uIHNob3VsZCBhdXRvIHBsYXkgdGhlIGRlZmF1bHQgY2xpcCB3aGVuIHN0YXJ0IGdhbWUuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblnKjov5DooYzmuLjmiI/lkI7oh6rliqjmkq3mlL7pu5jorqTliqjnlLvliarovpHjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgcGxheU9uTG9hZFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwbGF5T25Mb2FkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmFuaW1hdGlvbi5wbGF5X29uX2xvYWQnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SICYmIHRoaXMucGxheU9uTG9hZCAmJiB0aGlzLl9kZWZhdWx0Q2xpcCkge1xyXG4gICAgICAgICAgICBsZXQgaXNQbGF5aW5nID0gdGhpcy5fYW5pbWF0b3IgJiYgdGhpcy5fYW5pbWF0b3IuaXNQbGF5aW5nO1xyXG4gICAgICAgICAgICBpZiAoIWlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRBbmltYXRpb25TdGF0ZSh0aGlzLl9kZWZhdWx0Q2xpcC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnBsYXlTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaW1hdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gUHVibGljIE1ldGhvZHNcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IGFsbCB0aGUgY2xpcHMgdXNlZCBpbiB0aGlzIGFuaW1hdGlvbi5cclxuICAgICAqICEjemgg6I635Y+W5Yqo55S757uE5Lu25LiK55qE5omA5pyJ5Yqo55S75Ymq6L6R44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldENsaXBzXHJcbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25DbGlwW119XHJcbiAgICAgKi9cclxuICAgIGdldENsaXBzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXBzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGxheXMgYW4gYW5pbWF0aW9uIGFuZCBzdG9wIG90aGVyIGFuaW1hdGlvbnMuXHJcbiAgICAgKiAhI3poIOaSreaUvuaMh+WumueahOWKqOeUu++8jOW5tuS4lOWBnOatouW9k+WJjeato+WcqOaSreaUvuWKqOeUu+OAguWmguaenOayoeacieaMh+WumuWKqOeUu++8jOWImeaSreaUvum7mOiupOWKqOeUu+OAglxyXG4gICAgICogQG1ldGhvZCBwbGF5XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gVGhlIG5hbWUgb2YgYW5pbWF0aW9uIHRvIHBsYXkuIElmIG5vIG5hbWUgaXMgc3VwcGxpZWQgdGhlbiB0aGUgZGVmYXVsdCBhbmltYXRpb24gd2lsbCBiZSBwbGF5ZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0VGltZV0gLSBwbGF5IGFuIGFuaW1hdGlvbiBmcm9tIHN0YXJ0VGltZVxyXG4gICAgICogQHJldHVybiB7QW5pbWF0aW9uU3RhdGV9IC0gVGhlIEFuaW1hdGlvblN0YXRlIG9mIHBsYXlpbmcgYW5pbWF0aW9uLiBJbiBjYXNlcyB3aGVyZSB0aGUgYW5pbWF0aW9uIGNhbid0IGJlIHBsYXllZCAoaWUsIHRoZXJlIGlzIG5vIGRlZmF1bHQgYW5pbWF0aW9uIG9yIG5vIGFuaW1hdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSksIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBudWxsLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBhbmltQ3RybCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAqIGFuaW1DdHJsLnBsYXkoXCJsaW5lYXJcIik7XHJcbiAgICAgKi9cclxuICAgIHBsYXk6IGZ1bmN0aW9uIChuYW1lLCBzdGFydFRpbWUpIHtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLnBsYXlBZGRpdGl2ZShuYW1lLCBzdGFydFRpbWUpO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdG9yLnN0b3BTdGF0ZXNFeGNlcHQoc3RhdGUpO1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBQbGF5cyBhbiBhZGRpdGl2ZSBhbmltYXRpb24sIGl0IHdpbGwgbm90IHN0b3Agb3RoZXIgYW5pbWF0aW9ucy5cclxuICAgICAqIElmIHRoZXJlIGFyZSBvdGhlciBhbmltYXRpb25zIHBsYXlpbmcsIHRoZW4gd2lsbCBwbGF5IHNldmVyYWwgYW5pbWF0aW9ucyBhdCB0aGUgc2FtZSB0aW1lLlxyXG4gICAgICogISN6aCDmkq3mlL7mjIflrprnmoTliqjnlLvvvIjlsIbkuI3kvJrlgZzmraLlvZPliY3mkq3mlL7nmoTliqjnlLvvvInjgILlpoLmnpzmsqHmnInmjIflrprliqjnlLvvvIzliJnmkq3mlL7pu5jorqTliqjnlLvjgIJcclxuICAgICAqIEBtZXRob2QgcGxheUFkZGl0aXZlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gVGhlIG5hbWUgb2YgYW5pbWF0aW9uIHRvIHBsYXkuIElmIG5vIG5hbWUgaXMgc3VwcGxpZWQgdGhlbiB0aGUgZGVmYXVsdCBhbmltYXRpb24gd2lsbCBiZSBwbGF5ZWQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0VGltZV0gLSBwbGF5IGFuIGFuaW1hdGlvbiBmcm9tIHN0YXJ0VGltZVxyXG4gICAgICogQHJldHVybiB7QW5pbWF0aW9uU3RhdGV9IC0gVGhlIEFuaW1hdGlvblN0YXRlIG9mIHBsYXlpbmcgYW5pbWF0aW9uLiBJbiBjYXNlcyB3aGVyZSB0aGUgYW5pbWF0aW9uIGNhbid0IGJlIHBsYXllZCAoaWUsIHRoZXJlIGlzIG5vIGRlZmF1bHQgYW5pbWF0aW9uIG9yIG5vIGFuaW1hdGlvbiB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSksIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBudWxsLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIGxpbmVhcl8xIGFuZCBsaW5lYXJfMiBhdCB0aGUgc2FtZSB0aW1lIHBsYXlpbmcuXHJcbiAgICAgKiB2YXIgYW5pbUN0cmwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgKiBhbmltQ3RybC5wbGF5QWRkaXRpdmUoXCJsaW5lYXJfMVwiKTtcclxuICAgICAqIGFuaW1DdHJsLnBsYXlBZGRpdGl2ZShcImxpbmVhcl8yXCIpO1xyXG4gICAgICovXHJcbiAgICBwbGF5QWRkaXRpdmU6IGZ1bmN0aW9uIChuYW1lLCBzdGFydFRpbWUpIHtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRBbmltYXRpb25TdGF0ZShuYW1lIHx8ICh0aGlzLl9kZWZhdWx0Q2xpcCAmJiB0aGlzLl9kZWZhdWx0Q2xpcC5uYW1lKSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFuaW1hdG9yID0gdGhpcy5fYW5pbWF0b3I7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRvci5pc1BsYXlpbmcgJiYgc3RhdGUuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRvci5yZXN1bWVTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRvci5zdG9wU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdG9yLnBsYXlTdGF0ZShzdGF0ZSwgc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdG9yLnBsYXlTdGF0ZShzdGF0ZSwgc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGNhbm5vdCBiZSBwbGF5ZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIG5vdCBlbmFibGVkSW5IaWVyYXJjaHkuXHJcbiAgICAgICAgICAgIC8vIFRoYXQgd291bGQgY2F1c2UgYW4gZXJyb3IgZm9yIHRoZSBhbmltYXRpb24gbG9zdCB0aGUgcmVmZXJlbmNlIGFmdGVyIGRlc3Ryb3lpbmcgdGhlIG5vZGUuXHJcbiAgICAgICAgICAgIC8vIElmIHVzZXJzIHBsYXkgdGhlIGFuaW1hdGlvbiB3aGVuIHRoZSBjb21wb25lbnQgaXMgbm90IGVuYWJsZWRJbkhpZXJhcmNoeSxcclxuICAgICAgICAgICAgLy8gd2UgcGF1c2UgdGhlIGFuaW1hdG9yIGhlcmUgc28gdGhhdCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgcmVzdW1lIHRoZSBhbmltYXRpb24gd2hlbiB1c2VycyBlbmFibGUgdGhlIGNvbXBvbmVudC5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0b3IucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2xpcCA9IHN0YXRlLmNsaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN0b3BzIGFuIGFuaW1hdGlvbiBuYW1lZCBuYW1lLiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gc3RvcHMgYWxsIHBsYXlpbmcgYW5pbWF0aW9ucyB0aGF0IHdlcmUgc3RhcnRlZCB3aXRoIHRoaXMgQW5pbWF0aW9uLiA8YnIvPlxyXG4gICAgICogU3RvcHBpbmcgYW4gYW5pbWF0aW9uIGFsc28gUmV3aW5kcyBpdCB0byB0aGUgU3RhcnQuXHJcbiAgICAgKiAhI3poIOWBnOatouaMh+WumueahOWKqOeUu+OAguWmguaenOayoeacieaMh+WumuWQjeWtl++8jOWImeWBnOatouW9k+WJjeato+WcqOaSreaUvueahOWKqOeUu+OAglxyXG4gICAgICogQG1ldGhvZCBzdG9wXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdIC0gVGhlIGFuaW1hdGlvbiB0byBzdG9wLCBpZiBub3Qgc3VwcGxpZWQgdGhlbiBzdG9wcyBhbGwgcGxheWluZyBhbmltYXRpb25zLlxyXG4gICAgICovXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGlkSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnN0b3BTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnN0b3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXVzZXMgYW4gYW5pbWF0aW9uIG5hbWVkIG5hbWUuIElmIG5vIG5hbWUgaXMgc3VwcGxpZWQgdGhlbiBwYXVzZXMgYWxsIHBsYXlpbmcgYW5pbWF0aW9ucyB0aGF0IHdlcmUgc3RhcnRlZCB3aXRoIHRoaXMgQW5pbWF0aW9uLlxyXG4gICAgICogISN6aCDmmoLlgZzlvZPliY3miJbogIXmjIflrprnmoTliqjnlLvjgILlpoLmnpzmsqHmnInmjIflrprlkI3lrZfvvIzliJnmmoLlgZzlvZPliY3mraPlnKjmkq3mlL7nmoTliqjnlLvjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV0gLSBUaGUgYW5pbWF0aW9uIHRvIHBhdXNlcywgaWYgbm90IHN1cHBsaWVkIHRoZW4gcGF1c2VzIGFsbCBwbGF5aW5nIGFuaW1hdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHBhdXNlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGlkSW5pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnBhdXNlU3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXN1bWVzIGFuIGFuaW1hdGlvbiBuYW1lZCBuYW1lLiBJZiBubyBuYW1lIGlzIHN1cHBsaWVkIHRoZW4gcmVzdW1lcyBhbGwgcGF1c2VkIGFuaW1hdGlvbnMgdGhhdCB3ZXJlIHN0YXJ0ZWQgd2l0aCB0aGlzIEFuaW1hdGlvbi5cclxuICAgICAqICEjemgg6YeN5paw5pKt5pS+5oyH5a6a55qE5Yqo55S777yM5aaC5p6c5rKh5pyJ5oyH5a6a5ZCN5a2X77yM5YiZ6YeN5paw5pKt5pS+5b2T5YmN5q2j5Zyo5pKt5pS+55qE5Yqo55S744CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIFRoZSBhbmltYXRpb24gdG8gcmVzdW1lcywgaWYgbm90IHN1cHBsaWVkIHRoZW4gcmVzdW1lcyBhbGwgcGF1c2VkIGFuaW1hdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIHJlc3VtZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2RpZEluaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldEFuaW1hdGlvblN0YXRlKG5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnJlc3VtZVN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNYWtlIGFuIGFuaW1hdGlvbiBuYW1lZCBuYW1lIGdvIHRvIHRoZSBzcGVjaWZpZWQgdGltZS4gSWYgbm8gbmFtZSBpcyBzdXBwbGllZCB0aGVuIG1ha2UgYWxsIGFuaW1hdGlvbnMgZ28gdG8gdGhlIHNwZWNpZmllZCB0aW1lLlxyXG4gICAgICogISN6aCDorr7nva7mjIflrprliqjnlLvnmoTmkq3mlL7ml7bpl7TjgILlpoLmnpzmsqHmnInmjIflrprlkI3lrZfvvIzliJnorr7nva7lvZPliY3mkq3mlL7liqjnlLvnmoTmkq3mlL7ml7bpl7TjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0Q3VycmVudFRpbWVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZV0gLSBUaGUgdGltZSB0byBnbyB0b1xyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIFNwZWNpZmllZCBhbmltYXRpb24gbmFtZSwgaWYgbm90IHN1cHBsaWVkIHRoZW4gbWFrZSBhbGwgYW5pbWF0aW9ucyBnbyB0byB0aGUgdGltZS5cclxuICAgICAqL1xyXG4gICAgc2V0Q3VycmVudFRpbWU6IGZ1bmN0aW9uICh0aW1lLCBuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0QW5pbWF0aW9uU3RhdGUobmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3Iuc2V0U3RhdGVUaW1lKHN0YXRlLCB0aW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3Iuc2V0U3RhdGVUaW1lKHRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGFuaW1hdGlvbiBzdGF0ZSBuYW1lZCBuYW1lLiBJZiBubyBhbmltYXRpb24gd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBudWxsLlxyXG4gICAgICogISN6aCDojrflj5blvZPliY3miJbogIXmjIflrprnmoTliqjnlLvnirbmgIHvvIzlpoLmnpzmnKrmib7liLDmjIflrprliqjnlLvliarovpHliJnov5Tlm54gbnVsbOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRBbmltYXRpb25TdGF0ZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm4ge0FuaW1hdGlvblN0YXRlfVxyXG4gICAgICovXHJcbiAgICBnZXRBbmltYXRpb25TdGF0ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fbmFtZVRvU3RhdGVbbmFtZV07XHJcblxyXG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgKCFzdGF0ZSB8fCAhY2MuanMuYXJyYXkuY29udGFpbnModGhpcy5fY2xpcHMsIHN0YXRlLmNsaXApKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaWRJbml0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdG9yLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlICYmICFzdGF0ZS5jdXJ2ZUxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRvci5fcmVsb2FkQ2xpcChzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RhdGUgfHwgbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFkZHMgYSBjbGlwIHRvIHRoZSBhbmltYXRpb24gd2l0aCBuYW1lIG5ld05hbWUuIElmIGEgY2xpcCB3aXRoIHRoYXQgbmFtZSBhbHJlYWR5IGV4aXN0cyBpdCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIG5ldyBjbGlwLlxyXG4gICAgICogISN6aCDmt7vliqDliqjnlLvliarovpHvvIzlubbkuJTlj6/ku6Xph43mlrDorr7nva7or6XliqjnlLvliarovpHnmoTlkI3np7DjgIJcclxuICAgICAqIEBtZXRob2QgYWRkQ2xpcFxyXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25DbGlwfSBjbGlwIC0gdGhlIGNsaXAgdG8gYWRkXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25ld05hbWVdXHJcbiAgICAgKiBAcmV0dXJuIHtBbmltYXRpb25TdGF0ZX0gLSBUaGUgQW5pbWF0aW9uU3RhdGUgd2hpY2ggZ2l2ZXMgZnVsbCBjb250cm9sIG92ZXIgdGhlIGFuaW1hdGlvbiBjbGlwLlxyXG4gICAgICovXHJcbiAgICBhZGRDbGlwOiBmdW5jdGlvbiAoY2xpcCwgbmV3TmFtZSkge1xyXG4gICAgICAgIGlmICghY2xpcCkge1xyXG4gICAgICAgICAgICBjYy53YXJuSUQoMzkwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICAvLyBhZGQgY2xpcFxyXG4gICAgICAgIGlmICghY2MuanMuYXJyYXkuY29udGFpbnModGhpcy5fY2xpcHMsIGNsaXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaXBzLnB1c2goY2xpcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXBsYWNlIHNhbWUgbmFtZSBjbGlwXHJcbiAgICAgICAgbmV3TmFtZSA9IG5ld05hbWUgfHwgY2xpcC5uYW1lO1xyXG4gICAgICAgIGxldCBvbGRTdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25ld05hbWVdO1xyXG4gICAgICAgIGlmIChvbGRTdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAob2xkU3RhdGUuY2xpcCA9PT0gY2xpcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZFN0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fY2xpcHMuaW5kZXhPZihvbGRTdGF0ZS5jbGlwKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGlwcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZXBsYWNlIHN0YXRlXHJcbiAgICAgICAgbGV0IG5ld1N0YXRlID0gbmV3IGNjLkFuaW1hdGlvblN0YXRlKGNsaXAsIG5ld05hbWUpO1xyXG4gICAgICAgIHRoaXMuX25hbWVUb1N0YXRlW25ld05hbWVdID0gbmV3U3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlbW92ZSBjbGlwIGZyb20gdGhlIGFuaW1hdGlvbiBsaXN0LiBUaGlzIHdpbGwgcmVtb3ZlIHRoZSBjbGlwIGFuZCBhbnkgYW5pbWF0aW9uIHN0YXRlcyBiYXNlZCBvbiBpdC5cclxuICAgICAqIElmIHRoZXJlIGFyZSBhbmltYXRpb24gc3RhdGVzIGRlcGFuZCBvbiB0aGUgY2xpcCBhcmUgcGxheWluZyBvciBjbGlwIGlzIGRlZmF1bHRDbGlwLCBpdCB3aWxsIG5vdCBkZWxldGUgdGhlIGNsaXAuXHJcbiAgICAgKiBCdXQgaWYgZm9yY2UgaXMgdHJ1ZSwgdGhlbiB3aWxsIGFsd2F5cyByZW1vdmUgdGhlIGNsaXAgYW5kIGFueSBhbmltYXRpb24gc3RhdGVzIGJhc2VkIG9uIGl0LiBJZiBjbGlwIGlzIGRlZmF1bHRDbGlwLCBkZWZhdWx0Q2xpcCB3aWxsIGJlIHJlc2V0IHRvIG51bGxcclxuICAgICAqICEjemhcclxuICAgICAqIOS7juWKqOeUu+WIl+ihqOS4reenu+mZpOaMh+WumueahOWKqOeUu+WJqui+ke+8jDxici8+XHJcbiAgICAgKiDlpoLmnpzkvp3otZbkuo4gY2xpcCDnmoQgQW5pbWF0aW9uU3RhdGUg5q2j5Zyo5pKt5pS+5oiW6ICFIGNsaXAg5pivIGRlZmF1bHRDbGlwIOeahOivne+8jOm7mOiupOaYr+S4jeS8muWIoOmZpCBjbGlwIOeahOOAglxyXG4gICAgICog5L2G5piv5aaC5p6cIGZvcmNlIOWPguaVsOS4uiB0cnVl77yM5YiZ5Lya5by65Yi25YGc5q2i6K+l5Yqo55S777yM54S25ZCO56e76Zmk6K+l5Yqo55S75Ymq6L6R5ZKM55u45YWz55qE5Yqo55S744CC6L+Z5pe25YCZ5aaC5p6cIGNsaXAg5pivIGRlZmF1bHRDbGlw77yMZGVmYXVsdENsaXAg5bCG5Lya6KKr6YeN572u5Li6IG51bGzjgIJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlQ2xpcFxyXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25DbGlwfSBjbGlwXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtmb3JjZT1mYWxzZV0gLSBJZiBmb3JjZSBpcyB0cnVlLCB0aGVuIHdpbGwgYWx3YXlzIHJlbW92ZSB0aGUgY2xpcCBhbmQgYW55IGFuaW1hdGlvbiBzdGF0ZXMgYmFzZWQgb24gaXQuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUNsaXA6IGZ1bmN0aW9uIChjbGlwLCBmb3JjZSkge1xyXG4gICAgICAgIGlmICghY2xpcCkge1xyXG4gICAgICAgICAgICBjYy53YXJuSUQoMzkwMSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICBsZXQgc3RhdGU7XHJcbiAgICAgICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzLl9uYW1lVG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuX25hbWVUb1N0YXRlW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXF1YWxDbGlwcyhzdGF0ZS5jbGlwLCBjbGlwKSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbGlwID09PSB0aGlzLl9kZWZhdWx0Q2xpcCkge1xyXG4gICAgICAgICAgICBpZiAoZm9yY2UpIHRoaXMuX2RlZmF1bHRDbGlwID0gbnVsbDtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUNDX1RFU1QpIGNjLndhcm5JRCgzOTAyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICBpZiAoZm9yY2UpIHRoaXMuc3RvcChzdGF0ZS5uYW1lKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUNDX1RFU1QpIGNjLndhcm5JRCgzOTAzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2xpcHMgPSB0aGlzLl9jbGlwcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuICFlcXVhbENsaXBzKGl0ZW0sIGNsaXApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25hbWVUb1N0YXRlW3N0YXRlLm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBTYW1wbGVzIGFuaW1hdGlvbnMgYXQgdGhlIGN1cnJlbnQgc3RhdGUuPGJyLz5cclxuICAgICAqIFRoaXMgaXMgdXNlZnVsIHdoZW4geW91IGV4cGxpY2l0bHkgd2FudCB0byBzZXQgdXAgc29tZSBhbmltYXRpb24gc3RhdGUsIGFuZCBzYW1wbGUgaXQgb25jZS5cclxuICAgICAqICEjemgg5a+55oyH5a6a5oiW5b2T5YmN5Yqo55S76L+b6KGM6YeH5qC344CC5L2g5Y+v5Lul5omL5Yqo5bCG5Yqo55S76K6+572u5Yiw5p+Q5LiA5Liq54q25oCB77yM54S25ZCO6YeH5qC35LiA5qyh44CCXHJcbiAgICAgKiBAbWV0aG9kIHNhbXBsZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqL1xyXG4gICAgc2FtcGxlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5nZXRBbmltYXRpb25TdGF0ZShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zYW1wbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3Iuc2FtcGxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBSZWdpc3RlciBhbmltYXRpb24gZXZlbnQgY2FsbGJhY2suXHJcbiAgICAgKiBUaGUgZXZlbnQgYXJndW1lbnRzIHdpbGwgcHJvdmlkZSB0aGUgQW5pbWF0aW9uU3RhdGUgd2hpY2ggZW1pdCB0aGUgZXZlbnQuXHJcbiAgICAgKiBXaGVuIHBsYXkgYW4gYW5pbWF0aW9uLCB3aWxsIGF1dG8gcmVnaXN0ZXIgdGhlIGV2ZW50IGNhbGxiYWNrIHRvIHRoZSBBbmltYXRpb25TdGF0ZSwgYW5kIHVucmVnaXN0ZXIgdGhlIGV2ZW50IGNhbGxiYWNrIGZyb20gdGhlIEFuaW1hdGlvblN0YXRlIHdoZW4gYW5pbWF0aW9uIHN0b3BwZWQuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDms6jlhozliqjnlLvkuovku7blm57osIPjgIJcclxuICAgICAqIOWbnuiwg+eahOS6i+S7tumHjOWwhuS8mumZhOS4iuWPkemAgeS6i+S7tueahCBBbmltYXRpb25TdGF0ZeOAglxyXG4gICAgICog5b2T5pKt5pS+5LiA5Liq5Yqo55S75pe277yM5Lya6Ieq5Yqo5bCG5LqL5Lu25rOo5YaM5Yiw5a+55bqU55qEIEFuaW1hdGlvblN0YXRlIOS4iu+8jOWBnOatouaSreaUvuaXtuS8muWwhuS6i+S7tuS7jui/meS4qiBBbmltYXRpb25TdGF0ZSDkuIrlj5bmtojms6jlhozjgIJcclxuICAgICAqIEBtZXRob2Qgb25cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cclxuICAgICAqIEBwYXJhbSB7Y2MuQW5pbWF0aW9uU3RhdGV9IHN0YXRlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIGNhcHR1cmUgYXJndW1lbnQgcHJldmVudHMgY2FsbGJhY2tcclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBiZWluZyBpbnZva2VkIHdoZW4gdGhlIGV2ZW50J3MgZXZlbnRQaGFzZSBhdHRyaWJ1dGUgdmFsdWUgaXMgQlVCQkxJTkdfUEhBU0UuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gZmFsc2UsIGNhbGxiYWNrIHdpbGwgTk9UIGJlIGludm9rZWQgd2hlbiBldmVudCdzIGV2ZW50UGhhc2UgYXR0cmlidXRlIHZhbHVlIGlzIENBUFRVUklOR19QSEFTRS5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWl0aGVyIHdheSwgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW4gZXZlbnQncyBldmVudFBoYXNlIGF0dHJpYnV0ZSB2YWx1ZSBpcyBBVF9UQVJHRVQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogb24odHlwZTogc3RyaW5nLCBjYWxsYmFjazogKGV2ZW50OiBFdmVudC5FdmVudEN1c3RvbSkgPT4gdm9pZCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IChldmVudDogRXZlbnQuRXZlbnRDdXN0b20pID0+IHZvaWRcclxuICAgICAqIG9uPFQ+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogVCkgPT4gdm9pZCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IChldmVudDogVCkgPT4gdm9pZFxyXG4gICAgICogb24odHlwZTogc3RyaW5nLCBjYWxsYmFjazogKHR5cGU6IHN0cmluZywgc3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogKHR5cGU6IHN0cmluZywgc3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKSA9PiB2b2lkXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogb25QbGF5OiBmdW5jdGlvbiAodHlwZSwgc3RhdGUpIHtcclxuICAgICAqICAgICAvLyBjYWxsYmFja1xyXG4gICAgICogfVxyXG4gICAgICpcclxuICAgICAqIC8vIHJlZ2lzdGVyIGV2ZW50IHRvIGFsbCBhbmltYXRpb25cclxuICAgICAqIGFuaW1hdGlvbi5vbigncGxheScsIHRoaXMub25QbGF5LCB0aGlzKTtcclxuICAgICAqL1xyXG4gICAgb246IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XHJcbiAgICAgICAgdGhpcy5faW5pdCgpO1xyXG5cclxuICAgICAgICBsZXQgcmV0ID0gdGhpcy5fRXZlbnRUYXJnZXRPbih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsYXN0ZnJhbWUnKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLl9uYW1lVG9TdGF0ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBzdGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlc1tuYW1lXS5fbGFzdGZyYW1lRXZlbnRPbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFVucmVnaXN0ZXIgYW5pbWF0aW9uIGV2ZW50IGNhbGxiYWNrLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5Y+W5raI5rOo5YaM5Yqo55S75LqL5Lu25Zue6LCD44CCXHJcbiAgICAgKiBAbWV0aG9kIG9mZlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgYmVpbmcgcmVtb3ZlZC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBUaGUgY2FsbGJhY2sgdG8gcmVtb3ZlLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZFxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZT1mYWxzZV0gLSBTcGVjaWZpZXMgd2hldGhlciB0aGUgY2FsbGJhY2sgYmVpbmcgcmVtb3ZlZCB3YXMgcmVnaXN0ZXJlZCBhcyBhIGNhcHR1cmluZyBjYWxsYmFjayBvciBub3QuXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElmIG5vdCBzcGVjaWZpZWQsIHVzZUNhcHR1cmUgZGVmYXVsdHMgdG8gZmFsc2UuIElmIGEgY2FsbGJhY2sgd2FzIHJlZ2lzdGVyZWQgdHdpY2UsXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uZSB3aXRoIGNhcHR1cmUgYW5kIG9uZSB3aXRob3V0LCBlYWNoIG11c3QgYmUgcmVtb3ZlZCBzZXBhcmF0ZWx5LiBSZW1vdmFsIG9mIGEgY2FwdHVyaW5nIGNhbGxiYWNrXHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXMgbm90IGFmZmVjdCBhIG5vbi1jYXB0dXJpbmcgdmVyc2lvbiBvZiB0aGUgc2FtZSBsaXN0ZW5lciwgYW5kIHZpY2UgdmVyc2EuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHVucmVnaXN0ZXIgZXZlbnQgdG8gYWxsIGFuaW1hdGlvblxyXG4gICAgICogYW5pbWF0aW9uLm9mZigncGxheScsIHRoaXMub25QbGF5LCB0aGlzKTtcclxuICAgICAqL1xyXG4gICAgb2ZmOiBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsYXN0ZnJhbWUnKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGF0ZXMgPSB0aGlzLl9uYW1lVG9TdGF0ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBzdGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlc1tuYW1lXS5fbGFzdGZyYW1lRXZlbnRPbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9FdmVudFRhcmdldE9mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gSW50ZXJuYWwgTWV0aG9kc1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgIC8vIERvbnQgZm9yZ2V0IHRvIGNhbGwgX2luaXQgYmVmb3JlIGV2ZXJ5IGFjdHVhbCBwcm9jZXNzIGluIHB1YmxpYyBtZXRob2RzLlxyXG4gICAgLy8gSnVzdCBpbnZva2luZyBfaW5pdCBieSBvbkxvYWQgaXMgbm90IGVub3VnaCBiZWNhdXNlIG9uTG9hZCBpcyBjYWxsZWQgb25seSBpZiB0aGUgZW50aXR5IGlzIGFjdGl2ZS5cclxuXHJcbiAgICBfaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9kaWRJbml0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGlkSW5pdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0b3IgPSBuZXcgQW5pbWF0aW9uQW5pbWF0b3IodGhpcy5ub2RlLCB0aGlzKTtcclxuICAgICAgICB0aGlzLl9jcmVhdGVTdGF0ZXMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NyZWF0ZVN0YXRlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZVRvU3RhdGUgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIGNyZWF0ZSBhbmltYXRpb24gc3RhdGVzXHJcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcclxuICAgICAgICBsZXQgZGVmYXVsdENsaXBTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2xpcHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IGNsaXAgPSB0aGlzLl9jbGlwc1tpXTtcclxuICAgICAgICAgICAgaWYgKGNsaXApIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IGNjLkFuaW1hdGlvblN0YXRlKGNsaXApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRvci5fcmVsb2FkQ2xpcChzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZVRvU3RhdGVbc3RhdGUubmFtZV0gPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcXVhbENsaXBzKHRoaXMuX2RlZmF1bHRDbGlwLCBjbGlwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDbGlwU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fZGVmYXVsdENsaXAgJiYgIWRlZmF1bHRDbGlwU3RhdGUpIHtcclxuICAgICAgICAgICAgc3RhdGUgPSBuZXcgY2MuQW5pbWF0aW9uU3RhdGUodGhpcy5fZGVmYXVsdENsaXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0b3IuX3JlbG9hZENsaXAoc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9uYW1lVG9TdGF0ZVtzdGF0ZS5uYW1lXSA9IHN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5BbmltYXRpb24ucHJvdG90eXBlLl9FdmVudFRhcmdldE9uID0gRXZlbnRUYXJnZXQucHJvdG90eXBlLm9uO1xyXG5BbmltYXRpb24ucHJvdG90eXBlLl9FdmVudFRhcmdldE9mZiA9IEV2ZW50VGFyZ2V0LnByb3RvdHlwZS5vZmY7XHJcblxyXG5jYy5BbmltYXRpb24gPSBtb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbjtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=