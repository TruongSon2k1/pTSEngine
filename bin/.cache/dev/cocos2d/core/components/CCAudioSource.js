
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCAudioSource.js';
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
var misc = require('../utils/misc');

var Component = require('./CCComponent');

var AudioClip = require('../assets/CCAudioClip');
/**
 * !#en Audio Source.
 * !#zh 音频源组件，能对音频剪辑。
 * @class AudioSource
 * @extends Component
 */


var AudioSource = cc.Class({
  name: 'cc.AudioSource',
  "extends": Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.others/AudioSource',
    help: 'i18n:COMPONENT.help_url.audiosource'
  },
  ctor: function ctor() {
    // We can't require Audio here because jsb Audio is implemented outside the engine,
    // it can only take effect rely on overwriting cc._Audio
    this.audio = new cc._Audio();
  },
  properties: {
    _clip: {
      "default": null,
      type: AudioClip
    },
    _volume: 1,
    _mute: false,
    _loop: false,
    _pausedFlag: {
      "default": false,
      serializable: false
    },
    _firstlyEnabled: true,

    /**
     * !#en
     * Is the audio source playing (Read Only). <br/>
     * Note: isPlaying is not supported for Native platforms.
     * !#zh
     * 该音频剪辑是否正播放（只读）。<br/>
     * 注意：Native 平台暂时不支持 isPlaying。
     * @property isPlaying
     * @type {Boolean}
     * @readOnly
     * @default false
     */
    isPlaying: {
      get: function get() {
        var state = this.audio.getState();
        return state === cc._Audio.State.PLAYING;
      },
      visible: false
    },

    /**
     * !#en The clip of the audio source to play.
     * !#zh 要播放的音频剪辑。
     * @property clip
     * @type {AudioClip}
     * @default 1
     */
    clip: {
      get: function get() {
        return this._clip;
      },
      set: function set(value) {
        if (value === this._clip) {
          return;
        }

        if (!(value instanceof AudioClip)) {
          return cc.error('Wrong type of AudioClip.');
        }

        this._clip = value;
        this.audio.stop();
        this.audio.src = this._clip;

        if (this.preload) {
          this._clip._ensureLoaded();
        }
      },
      type: AudioClip,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.clip',
      animatable: false
    },

    /**
     * !#en The volume of the audio source.
     * !#zh 音频源的音量（0.0 ~ 1.0）。
     * @property volume
     * @type {Number}
     * @default 1
     */
    volume: {
      get: function get() {
        return this._volume;
      },
      set: function set(value) {
        value = misc.clamp01(value);
        this._volume = value;

        if (!this._mute) {
          this.audio.setVolume(value);
        }

        return value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.volume'
    },

    /**
     * !#en Is the audio source mute?
     * !#zh 是否静音音频源。Mute 是设置音量为 0，取消静音是恢复原来的音量。
     * @property mute
     * @type {Boolean}
     * @default false
     */
    mute: {
      get: function get() {
        return this._mute;
      },
      set: function set(value) {
        this._mute = value;
        this.audio.setVolume(value ? 0 : this._volume);
        return value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.mute'
    },

    /**
     * !#en Is the audio source looping?
     * !#zh 音频源是否循环播放？
     * @property loop
     * @type {Boolean}
     * @default false
     */
    loop: {
      get: function get() {
        return this._loop;
      },
      set: function set(value) {
        this._loop = value;
        this.audio.setLoop(value);
        return value;
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.loop'
    },

    /**
     * !#en If set to true, the audio source will automatically start playing on onEnable.
     * !#zh 如果设置为 true，音频源将在 onEnable 时自动播放。
     * @property playOnLoad
     * @type {Boolean}
     * @default true
     */
    playOnLoad: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.audio.play_on_load',
      animatable: false
    },

    /**
     * !#en If set to true and AudioClip is a deferred load resource, the component will preload AudioClip in the onLoad phase.
     * !#zh 如果设置为 true 且 AudioClip 为延迟加载资源，组件将在 onLoad 阶段预加载 AudioClip。
     * @property preload
     * @type {Boolean}
     * @default false
     */
    preload: {
      "default": false,
      animatable: false
    }
  },
  _pausedCallback: function _pausedCallback() {
    var state = this.audio.getState();

    if (state === cc._Audio.State.PLAYING) {
      this.audio.pause();
      this._pausedFlag = true;
    }
  },
  _restoreCallback: function _restoreCallback() {
    if (this._pausedFlag) {
      this.audio.resume();
    }

    this._pausedFlag = false;
  },
  onLoad: function onLoad() {
    // this.audio.src is undefined, when the clip property is deserialized from the scene
    if (!this.audio.src) {
      this.audio.src = this._clip;
    }

    if (this.preload) {
      this._clip._ensureLoaded();
    }
  },
  onEnable: function onEnable() {
    if (this.playOnLoad && this._firstlyEnabled) {
      this._firstlyEnabled = false;
      this.play();
    }

    cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
    cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
  },
  onDisable: function onDisable() {
    this.stop();
    cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
    cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
  },
  onDestroy: function onDestroy() {
    this.audio.destroy();
  },

  /**
   * !#en Plays the clip.
   * !#zh 播放音频剪辑。
   * @method play
   */
  play: function play() {
    if (CC_EDITOR || !this._clip) return;
    var audio = this.audio;
    audio.setVolume(this._mute ? 0 : this._volume);
    audio.setLoop(this._loop);
    audio.setCurrentTime(0);
    audio.play();
  },

  /**
   * !#en Stops the clip.
   * !#zh 停止当前音频剪辑。
   * @method stop
   */
  stop: function stop() {
    this.audio.stop();
  },

  /**
   * !#en Pause the clip.
   * !#zh 暂停当前音频剪辑。
   * @method pause
   */
  pause: function pause() {
    this.audio.pause();
  },

  /**
   * !#en Resume the clip.
   * !#zh 恢复播放。
   * @method resume
   */
  resume: function resume() {
    this.audio.resume();
  },

  /**
   * !#en Rewind playing music.
   * !#zh 从头开始播放。
   * @method rewind
   */
  rewind: function rewind() {
    this.audio.setCurrentTime(0);
  },

  /**
   * !#en Get current time
   * !#zh 获取当前的播放时间
   * @method getCurrentTime
   * @return {Number}
   */
  getCurrentTime: function getCurrentTime() {
    return this.audio.getCurrentTime();
  },

  /**
   * !#en Set current time
   * !#zh 设置当前的播放时间
   * @method setCurrentTime
   * @param {Number} time
   * @return {Number}
   */
  setCurrentTime: function setCurrentTime(time) {
    this.audio.setCurrentTime(time);
    return time;
  },

  /**
   * !#en Get audio duration
   * !#zh 获取当前音频的长度
   * @method getDuration
   * @return {Number}
   */
  getDuration: function getDuration() {
    return this.audio.getDuration();
  }
});
cc.AudioSource = module.exports = AudioSource;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQXVkaW9Tb3VyY2UuanMiXSwibmFtZXMiOlsibWlzYyIsInJlcXVpcmUiLCJDb21wb25lbnQiLCJBdWRpb0NsaXAiLCJBdWRpb1NvdXJjZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJjdG9yIiwiYXVkaW8iLCJfQXVkaW8iLCJwcm9wZXJ0aWVzIiwiX2NsaXAiLCJ0eXBlIiwiX3ZvbHVtZSIsIl9tdXRlIiwiX2xvb3AiLCJfcGF1c2VkRmxhZyIsInNlcmlhbGl6YWJsZSIsIl9maXJzdGx5RW5hYmxlZCIsImlzUGxheWluZyIsImdldCIsInN0YXRlIiwiZ2V0U3RhdGUiLCJTdGF0ZSIsIlBMQVlJTkciLCJ2aXNpYmxlIiwiY2xpcCIsInNldCIsInZhbHVlIiwiZXJyb3IiLCJzdG9wIiwic3JjIiwicHJlbG9hZCIsIl9lbnN1cmVMb2FkZWQiLCJ0b29sdGlwIiwiQ0NfREVWIiwiYW5pbWF0YWJsZSIsInZvbHVtZSIsImNsYW1wMDEiLCJzZXRWb2x1bWUiLCJtdXRlIiwibG9vcCIsInNldExvb3AiLCJwbGF5T25Mb2FkIiwiX3BhdXNlZENhbGxiYWNrIiwicGF1c2UiLCJfcmVzdG9yZUNhbGxiYWNrIiwicmVzdW1lIiwib25Mb2FkIiwib25FbmFibGUiLCJwbGF5IiwiZ2FtZSIsIm9uIiwiRVZFTlRfSElERSIsIkVWRU5UX1NIT1ciLCJvbkRpc2FibGUiLCJvZmYiLCJvbkRlc3Ryb3kiLCJkZXN0cm95Iiwic2V0Q3VycmVudFRpbWUiLCJyZXdpbmQiLCJnZXRDdXJyZW50VGltZSIsInRpbWUiLCJnZXREdXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RSxNQUFNLENBQUNDLE9BQVAsR0FBaUJsRSxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IG1pc2MgPSByZXF1aXJlKCcuLi91dGlscy9taXNjJyk7XHJcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKTtcclxuY29uc3QgQXVkaW9DbGlwID0gcmVxdWlyZSgnLi4vYXNzZXRzL0NDQXVkaW9DbGlwJyk7XHJcblxyXG4vKipcclxuICogISNlbiBBdWRpbyBTb3VyY2UuXHJcbiAqICEjemgg6Z+z6aKR5rqQ57uE5Lu277yM6IO95a+56Z+z6aKR5Ymq6L6R44CCXHJcbiAqIEBjbGFzcyBBdWRpb1NvdXJjZVxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbnZhciBBdWRpb1NvdXJjZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdjYy5BdWRpb1NvdXJjZScsXHJcbiAgICBleHRlbmRzOiBDb21wb25lbnQsXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQub3RoZXJzL0F1ZGlvU291cmNlJyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuYXVkaW9zb3VyY2UnLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gV2UgY2FuJ3QgcmVxdWlyZSBBdWRpbyBoZXJlIGJlY2F1c2UganNiIEF1ZGlvIGlzIGltcGxlbWVudGVkIG91dHNpZGUgdGhlIGVuZ2luZSxcclxuICAgICAgICAvLyBpdCBjYW4gb25seSB0YWtlIGVmZmVjdCByZWx5IG9uIG92ZXJ3cml0aW5nIGNjLl9BdWRpb1xyXG4gICAgICAgIHRoaXMuYXVkaW8gPSBuZXcgY2MuX0F1ZGlvKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBfY2xpcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBBdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgICAgIF92b2x1bWU6IDEsXHJcbiAgICAgICAgX211dGU6IGZhbHNlLFxyXG4gICAgICAgIF9sb29wOiBmYWxzZSxcclxuICAgICAgICBfcGF1c2VkRmxhZzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2ZpcnN0bHlFbmFibGVkOiB0cnVlLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogSXMgdGhlIGF1ZGlvIHNvdXJjZSBwbGF5aW5nIChSZWFkIE9ubHkpLiA8YnIvPlxyXG4gICAgICAgICAqIE5vdGU6IGlzUGxheWluZyBpcyBub3Qgc3VwcG9ydGVkIGZvciBOYXRpdmUgcGxhdGZvcm1zLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDor6Xpn7PpopHliarovpHmmK/lkKbmraPmkq3mlL7vvIjlj6ror7vvvInjgII8YnIvPlxyXG4gICAgICAgICAqIOazqOaEj++8mk5hdGl2ZSDlubPlj7DmmoLml7bkuI3mlK/mjIEgaXNQbGF5aW5n44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzUGxheWluZ1xyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEByZWFkT25seVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNQbGF5aW5nOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5hdWRpby5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlID09PSBjYy5fQXVkaW8uU3RhdGUuUExBWUlORztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBjbGlwIG9mIHRoZSBhdWRpbyBzb3VyY2UgdG8gcGxheS5cclxuICAgICAgICAgKiAhI3poIOimgeaSreaUvueahOmfs+mikeWJqui+keOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBjbGlwXHJcbiAgICAgICAgICogQHR5cGUge0F1ZGlvQ2xpcH1cclxuICAgICAgICAgKiBAZGVmYXVsdCAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xpcDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbGlwO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9jbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBBdWRpb0NsaXApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9yKCdXcm9uZyB0eXBlIG9mIEF1ZGlvQ2xpcC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsaXAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zcmMgPSB0aGlzLl9jbGlwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlbG9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsaXAuX2Vuc3VyZUxvYWRlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBBdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8uY2xpcCcsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgdm9sdW1lIG9mIHRoZSBhdWRpbyBzb3VyY2UuXHJcbiAgICAgICAgICogISN6aCDpn7PpopHmupDnmoTpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgdm9sdW1lXHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZGVmYXVsdCAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdm9sdW1lOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gbWlzYy5jbGFtcDAxKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZvbHVtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zZXRWb2x1bWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmF1ZGlvLnZvbHVtZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIElzIHRoZSBhdWRpbyBzb3VyY2UgbXV0ZT9cclxuICAgICAgICAgKiAhI3poIOaYr+WQpumdmemfs+mfs+mikea6kOOAgk11dGUg5piv6K6+572u6Z+z6YeP5Li6IDDvvIzlj5bmtojpnZnpn7PmmK/mgaLlpI3ljp/mnaXnmoTpn7Pph4/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgbXV0ZVxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbXV0ZToge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdXRlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXV0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zZXRWb2x1bWUodmFsdWUgPyAwIDogdGhpcy5fdm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8ubXV0ZScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJcyB0aGUgYXVkaW8gc291cmNlIGxvb3Bpbmc/XHJcbiAgICAgICAgICogISN6aCDpn7PpopHmupDmmK/lkKblvqrnjq/mkq3mlL7vvJ9cclxuICAgICAgICAgKiBAcHJvcGVydHkgbG9vcFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbG9vcDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb29wO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9vcCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdWRpby5zZXRMb29wKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYXVkaW8ubG9vcCdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIElmIHNldCB0byB0cnVlLCB0aGUgYXVkaW8gc291cmNlIHdpbGwgYXV0b21hdGljYWxseSBzdGFydCBwbGF5aW5nIG9uIG9uRW5hYmxlLlxyXG4gICAgICAgICAqICEjemgg5aaC5p6c6K6+572u5Li6IHRydWXvvIzpn7PpopHmupDlsIblnKggb25FbmFibGUg5pe26Ieq5Yqo5pKt5pS+44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHBsYXlPbkxvYWRcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGxheU9uTG9hZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5hdWRpby5wbGF5X29uX2xvYWQnLFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgc2V0IHRvIHRydWUgYW5kIEF1ZGlvQ2xpcCBpcyBhIGRlZmVycmVkIGxvYWQgcmVzb3VyY2UsIHRoZSBjb21wb25lbnQgd2lsbCBwcmVsb2FkIEF1ZGlvQ2xpcCBpbiB0aGUgb25Mb2FkIHBoYXNlLlxyXG4gICAgICAgICAqICEjemgg5aaC5p6c6K6+572u5Li6IHRydWUg5LiUIEF1ZGlvQ2xpcCDkuLrlu7bov5/liqDovb3otYTmupDvvIznu4Tku7blsIblnKggb25Mb2FkIOmYtuautemihOWKoOi9vSBBdWRpb0NsaXDjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgcHJlbG9hZFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJlbG9hZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9wYXVzZWRDYWxsYmFjazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuYXVkaW8uZ2V0U3RhdGUoKTtcclxuICAgICAgICBpZiAoc3RhdGUgPT09IGNjLl9BdWRpby5TdGF0ZS5QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fcGF1c2VkRmxhZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcmVzdG9yZUNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhdXNlZEZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpby5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGF1c2VkRmxhZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB0aGlzLmF1ZGlvLnNyYyBpcyB1bmRlZmluZWQsIHdoZW4gdGhlIGNsaXAgcHJvcGVydHkgaXMgZGVzZXJpYWxpemVkIGZyb20gdGhlIHNjZW5lXHJcbiAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLnNyYykge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IHRoaXMuX2NsaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByZWxvYWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xpcC5fZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlPbkxvYWQgJiYgdGhpcy5fZmlyc3RseUVuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3RseUVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLl9wYXVzZWRDYWxsYmFjaywgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuX3Jlc3RvcmVDYWxsYmFjaywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5fcGF1c2VkQ2FsbGJhY2ssIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub2ZmKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5fcmVzdG9yZUNhbGxiYWNrLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5kZXN0cm95KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQbGF5cyB0aGUgY2xpcC5cclxuICAgICAqICEjemgg5pKt5pS+6Z+z6aKR5Ymq6L6R44CCXHJcbiAgICAgKiBAbWV0aG9kIHBsYXlcclxuICAgICAqL1xyXG4gICAgcGxheTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICggQ0NfRURJVE9SIHx8ICF0aGlzLl9jbGlwICkgcmV0dXJuO1xyXG5cclxuICAgICAgICB2YXIgYXVkaW8gPSB0aGlzLmF1ZGlvO1xyXG4gICAgICAgIGF1ZGlvLnNldFZvbHVtZSh0aGlzLl9tdXRlID8gMCA6IHRoaXMuX3ZvbHVtZSk7XHJcbiAgICAgICAgYXVkaW8uc2V0TG9vcCh0aGlzLl9sb29wKTtcclxuICAgICAgICBhdWRpby5zZXRDdXJyZW50VGltZSgwKTtcclxuICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdG9wcyB0aGUgY2xpcC5cclxuICAgICAqICEjemgg5YGc5q2i5b2T5YmN6Z+z6aKR5Ymq6L6R44CCXHJcbiAgICAgKiBAbWV0aG9kIHN0b3BcclxuICAgICAqL1xyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGF1c2UgdGhlIGNsaXAuXHJcbiAgICAgKiAhI3poIOaaguWBnOW9k+WJjemfs+mikeWJqui+keOAglxyXG4gICAgICogQG1ldGhvZCBwYXVzZVxyXG4gICAgICovXHJcbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlc3VtZSB0aGUgY2xpcC5cclxuICAgICAqICEjemgg5oGi5aSN5pKt5pS+44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxyXG4gICAgICovXHJcbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmF1ZGlvLnJlc3VtZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmV3aW5kIHBsYXlpbmcgbXVzaWMuXHJcbiAgICAgKiAhI3poIOS7juWktOW8gOWni+aSreaUvuOAglxyXG4gICAgICogQG1ldGhvZCByZXdpbmRcclxuICAgICAqL1xyXG4gICAgcmV3aW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuYXVkaW8uc2V0Q3VycmVudFRpbWUoMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgY3VycmVudCB0aW1lXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeeahOaSreaUvuaXtumXtFxyXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50VGltZVxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1ZGlvLmdldEN1cnJlbnRUaW1lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgY3VycmVudCB0aW1lXHJcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeeahOaSreaUvuaXtumXtFxyXG4gICAgICogQG1ldGhvZCBzZXRDdXJyZW50VGltZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVcclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgc2V0Q3VycmVudFRpbWU6IGZ1bmN0aW9uICh0aW1lKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpby5zZXRDdXJyZW50VGltZSh0aW1lKTtcclxuICAgICAgICByZXR1cm4gdGltZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhdWRpbyBkdXJhdGlvblxyXG4gICAgICogISN6aCDojrflj5blvZPliY3pn7PpopHnmoTplb/luqZcclxuICAgICAqIEBtZXRob2QgZ2V0RHVyYXRpb25cclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0RHVyYXRpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdWRpby5nZXREdXJhdGlvbigpO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5jYy5BdWRpb1NvdXJjZSA9IG1vZHVsZS5leHBvcnRzID0gQXVkaW9Tb3VyY2U7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9