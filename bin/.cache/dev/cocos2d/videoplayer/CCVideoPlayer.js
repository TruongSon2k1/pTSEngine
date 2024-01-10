
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/videoplayer/CCVideoPlayer.js';
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
var VideoPlayerImpl = require('./video-player-impl');
/**
 * !#en Video event type
 * !#zh 视频事件类型
 * @enum VideoPlayer.EventType
 */

/**
 * !#en play
 * !#zh 播放
 * @property {Number} PLAYING
 */

/**
 * !#en pause
 * !#zh 暂停
 * @property {Number} PAUSED
 */

/**
 * !#en stop
 * !#zh 停止
 * @property {Number} STOPPED
 */

/**
 * !#en play end
 * !#zh 播放结束
 * @property {Number} COMPLETED
 */

/**
 * !#en meta data is loaded
 * !#zh 视频的元信息已加载完成，你可以调用 getDuration 来获取视频总时长
 * @property {Number} META_LOADED
 */

/**
 * !#en clicked by the user
 * !#zh 视频被用户点击了
 * @property {Number} CLICKED
 */

/**
 * !#en ready to play, this event is not guaranteed to be triggered on all platform or browser, please don't rely on it to play your video.<br/>
 * !#zh 视频准备好了，这个事件并不保障会在所有平台或浏览器中被触发，它依赖于平台实现，请不要依赖于这个事件做视频播放的控制。
 * @property {Number} READY_TO_PLAY
 */


var EventType = VideoPlayerImpl.EventType;
/**
 * !#en Enum for video resouce type type.
 * !#zh 视频来源
 * @enum VideoPlayer.ResourceType
 */

var ResourceType = cc.Enum({
  /**
   * !#en The remote resource type.
   * !#zh 远程视频
   * @property {Number} REMOTE
   */
  REMOTE: 0,

  /**
   * !#en The local resouce type.
   * !#zh 本地视频
   * @property {Number} LOCAL
   */
  LOCAL: 1
});
/**
 * !#en cc.VideoPlayer is a component for playing videos, you can use it for showing videos in your game. Because different platforms have different authorization, API and control methods for VideoPlayer component. And have not yet formed a unified standard, only Web, iOS, and Android platforms are currently supported.
 * !#zh Video 组件，用于在游戏中播放视频。由于不同平台对于 VideoPlayer 组件的授权、API、控制方式都不同，还没有形成统一的标准，所以目前只支持 Web、iOS 和 Android 平台。
 * @class VideoPlayer
 * @extends Component
 */

var VideoPlayer = cc.Class({
  name: 'cc.VideoPlayer',
  "extends": cc.Component,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/VideoPlayer',
    inspector: 'packages://inspector/inspectors/comps/videoplayer.js',
    help: 'i18n:COMPONENT.help_url.videoplayer',
    executeInEditMode: true
  },
  properties: {
    _resourceType: ResourceType.REMOTE,

    /**
     * !#en The resource type of videoplayer, REMOTE for remote url and LOCAL for local file path.
     * !#zh 视频来源：REMOTE 表示远程视频 URL，LOCAL 表示本地视频地址。
     * @property {VideoPlayer.ResourceType} resourceType
     */
    resourceType: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.resourceType',
      type: ResourceType,
      set: function set(value) {
        this._resourceType = value;

        this._updateVideoSource();
      },
      get: function get() {
        return this._resourceType;
      }
    },
    _remoteURL: '',

    /**
     * !#en The remote URL of video.
     * !#zh 远程视频的 URL
     * @property {String} remoteURL
     */
    remoteURL: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.url',
      type: cc.String,
      set: function set(url) {
        this._remoteURL = url;

        this._updateVideoSource();
      },
      get: function get() {
        return this._remoteURL;
      }
    },
    _clip: {
      "default": null,
      type: cc.Asset
    },

    /**
     * !#en The local video full path.
     * !#zh 本地视频的 URL
     * @property {String} clip
     */
    clip: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.video',
      get: function get() {
        return this._clip;
      },
      set: function set(value) {
        this._clip = value;

        this._updateVideoSource();
      },
      type: cc.Asset
    },

    /**
     * !#en The current playback time of the now playing item in seconds, you could also change the start playback time.
     * !#zh 指定视频从什么时间点开始播放，单位是秒，也可以用来获取当前视频播放的时间进度。
     * @property {Number} currentTime
     */
    currentTime: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.currentTime',
      type: cc.Float,
      set: function set(time) {
        if (this._impl) {
          this._impl.seekTo(time);
        }
      },
      get: function get() {
        if (this._impl) {
          // for used to make the current time of each platform consistent
          if (this._currentStatus === EventType.NONE || this._currentStatus === EventType.STOPPED || this._currentStatus === EventType.META_LOADED || this._currentStatus === EventType.READY_TO_PLAY) {
            return 0;
          } else if (this._currentStatus === EventType.COMPLETED) {
            return this._impl.duration();
          }

          return this._impl.currentTime();
        }

        return -1;
      }
    },
    _volume: 1,

    /**
     * !#en The volume of the video.
     * !#zh 视频的音量（0.0 ~ 1.0）
     * @property volume
     * @type {Number}
     * @default 1
     */
    volume: {
      get: function get() {
        return this._volume;
      },
      set: function set(value) {
        this._volume = value;

        if (this.isPlaying() && !this._mute) {
          this._syncVolume();
        }
      },
      range: [0, 1],
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.volume'
    },
    _mute: false,

    /**
     * !#en Mutes the VideoPlayer. Mute sets the volume=0, Un-Mute restore the original volume.
     * !#zh 是否静音视频。静音时设置音量为 0，取消静音是恢复原来的音量。
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

        this._syncVolume();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.mute'
    },

    /**
     * !#en Whether keep the aspect ration of the original video.
     * !#zh 是否保持视频原来的宽高比
     * @property {Boolean} keepAspectRatio
     * @type {Boolean}
     * @default true
     */
    keepAspectRatio: {
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.keepAspectRatio',
      "default": true,
      type: cc.Boolean,
      notify: function notify() {
        this._impl && this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
      }
    },

    /**
     * !#en Whether play video in fullscreen mode.
     * !#zh 是否全屏播放视频
     * @property {Boolean} isFullscreen
     * @type {Boolean}
     * @default false
     */
    _isFullscreen: {
      "default": false,
      formerlySerializedAs: '_N$isFullscreen'
    },
    isFullscreen: {
      get: function get() {
        if (!CC_EDITOR) {
          this._isFullscreen = this._impl && this._impl.isFullScreenEnabled();
        }

        return this._isFullscreen;
      },
      set: function set(enable) {
        this._isFullscreen = enable;

        if (!CC_EDITOR) {
          this._impl && this._impl.setFullScreenEnabled(enable);
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.isFullscreen'
    },

    /**
     * !#en Always below the game view (only useful on Web. Note: The specific effects are not guaranteed to be consistent, depending on whether each browser supports or restricts).
     * !#zh 永远在游戏视图最底层（这个属性只有在 Web 平台上有效果。注意：具体效果无法保证一致，跟各个浏览器是否支持与限制有关）
     * @property {Boolean} stayOnBottom
     */
    _stayOnBottom: false,
    stayOnBottom: {
      get: function get() {
        return this._stayOnBottom;
      },
      set: function set(enable) {
        this._stayOnBottom = enable;

        if (this._impl) {
          this._impl.setStayOnBottom(enable);
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.videoplayer.stayOnBottom'
    },

    /**
     * !#en the video player's callback, it will be triggered when certain event occurs, like: playing, paused, stopped and completed.
     * !#zh 视频播放回调函数，该回调函数会在特定情况被触发，比如播放中，暂时，停止和完成播放。
     * @property {Component.EventHandler[]} videoPlayerEvent
     */
    videoPlayerEvent: {
      "default": [],
      type: cc.Component.EventHandler
    }
  },
  statics: {
    EventType: EventType,
    ResourceType: ResourceType,
    Impl: VideoPlayerImpl
  },
  ctor: function ctor() {
    this._impl = new VideoPlayerImpl();
    this._currentStatus = EventType.NONE;
  },
  _syncVolume: function _syncVolume() {
    var impl = this._impl;

    if (impl) {
      var volume = this._mute ? 0 : this._volume;
      impl.setVolume(volume);
    }
  },
  _updateVideoSource: function _updateVideoSource() {
    var url = '';

    if (this.resourceType === ResourceType.REMOTE) {
      url = this.remoteURL;
    } else if (this._clip) {
      url = this._clip.nativeUrl;
    }

    this._impl.setURL(url, this._mute || this._volume === 0);

    this._impl.setKeepAspectRatioEnabled(this.keepAspectRatio);
  },
  onLoad: function onLoad() {
    var impl = this._impl;

    if (impl) {
      impl.createDomElementIfNeeded(this._mute || this._volume === 0);
      impl.setStayOnBottom(this._stayOnBottom);

      this._updateVideoSource();

      if (!CC_EDITOR) {
        impl.seekTo(this.currentTime);
        impl.setFullScreenEnabled(this._isFullscreen);
        this.pause();
        impl.setEventListener(EventType.PLAYING, this.onPlaying.bind(this));
        impl.setEventListener(EventType.PAUSED, this.onPasued.bind(this));
        impl.setEventListener(EventType.STOPPED, this.onStopped.bind(this));
        impl.setEventListener(EventType.COMPLETED, this.onCompleted.bind(this));
        impl.setEventListener(EventType.META_LOADED, this.onMetaLoaded.bind(this));
        impl.setEventListener(EventType.CLICKED, this.onClicked.bind(this));
        impl.setEventListener(EventType.READY_TO_PLAY, this.onReadyToPlay.bind(this));
      }
    }
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new VideoPlayerImpl();
    }
  },
  onEnable: function onEnable() {
    if (this._impl) {
      this._impl.enable();
    }
  },
  onDisable: function onDisable() {
    if (this._impl) {
      this._impl.disable();
    }
  },
  onDestroy: function onDestroy() {
    if (this._impl) {
      this._impl.destroy();

      this._impl = null;
    }
  },
  update: function update(dt) {
    if (this._impl) {
      this._impl.updateMatrix(this.node);
    }
  },
  onReadyToPlay: function onReadyToPlay() {
    this._currentStatus = EventType.READY_TO_PLAY;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.READY_TO_PLAY);
    this.node.emit('ready-to-play', this);
  },
  onMetaLoaded: function onMetaLoaded() {
    this._currentStatus = EventType.META_LOADED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.META_LOADED);
    this.node.emit('meta-loaded', this);
  },
  onClicked: function onClicked() {
    this._currentStatus = EventType.CLICKED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.CLICKED);
    this.node.emit('clicked', this);
  },
  onPlaying: function onPlaying() {
    this._currentStatus = EventType.PLAYING;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PLAYING);
    this.node.emit('playing', this);
  },
  onPasued: function onPasued() {
    this._currentStatus = EventType.PAUSED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.PAUSED);
    this.node.emit('paused', this);
  },
  onStopped: function onStopped() {
    this._currentStatus = EventType.STOPPED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.STOPPED);
    this.node.emit('stopped', this);
  },
  onCompleted: function onCompleted() {
    this._currentStatus = EventType.COMPLETED;
    cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, EventType.COMPLETED);
    this.node.emit('completed', this);
  },

  /**
   * !#en If a video is paused, call this method could resume playing. If a video is stopped, call this method to play from scratch.
   * !#zh 如果视频被暂停播放了，调用这个接口可以继续播放。如果视频被停止播放了，调用这个接口可以从头开始播放。
   * @method play
   */
  play: function play() {
    if (this._impl) {
      this._syncVolume();

      this._impl.play();
    }
  },

  /**
   * !#en If a video is paused, call this method to resume playing.
   * !#zh 如果一个视频播放被暂停播放了，调用这个接口可以继续播放。
   * @method resume
   */
  resume: function resume() {
    if (this._impl) {
      this._syncVolume();

      this._impl.resume();
    }
  },

  /**
   * !#en If a video is playing, call this method to pause playing.
   * !#zh 如果一个视频正在播放，调用这个接口可以暂停播放。
   * @method pause
   */
  pause: function pause() {
    if (this._impl) {
      this._impl.pause();
    }
  },

  /**
   * !#en If a video is playing, call this method to stop playing immediately.
   * !#zh 如果一个视频正在播放，调用这个接口可以立马停止播放。
   * @method stop
   */
  stop: function stop() {
    if (this._impl) {
      this._impl.stop();
    }
  },

  /**
   * !#en Gets the duration of the video
   * !#zh 获取视频文件的播放总时长
   * @method getDuration
   * @returns {Number}
   */
  getDuration: function getDuration() {
    if (this._impl) {
      return this._impl.duration();
    }

    return -1;
  },

  /**
   * !#en Determine whether video is playing or not.
   * !#zh 判断当前视频是否处于播放状态
   * @method isPlaying
   * @returns {Boolean}
   */
  isPlaying: function isPlaying() {
    if (this._impl) {
      return this._impl.isPlaying();
    }

    return false;
  }
  /**
   * !#en if you don't need the VideoPlayer and it isn't in any running Scene, you should
   * call the destroy method on this component or the associated node explicitly.
   * Otherwise, the created DOM element won't be removed from web page.
   * !#zh
   * 如果你不再使用 VideoPlayer，并且组件未添加到场景中，那么你必须手动对组件或所在节点调用 destroy。
   * 这样才能移除网页上的 DOM 节点，避免 Web 平台内存泄露。
   * @example
   * videoplayer.node.parent = null;  // or  videoplayer.node.removeFromParent(false);
   * // when you don't need videoplayer anymore
   * videoplayer.node.destroy();
   * @method destroy
   * @return {Boolean} whether it is the first time the destroy being called
   */

});
cc.VideoPlayer = module.exports = VideoPlayer;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event ready-to-play
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event meta-loaded
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event clicked
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event playing
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event paused
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event stopped
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event completed
 * @param {Event.EventCustom} event
 * @param {VideoPlayer} videoPlayer - The VideoPlayer component.
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHZpZGVvcGxheWVyXFxDQ1ZpZGVvUGxheWVyLmpzIl0sIm5hbWVzIjpbIlZpZGVvUGxheWVySW1wbCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJSZXNvdXJjZVR5cGUiLCJjYyIsIkVudW0iLCJSRU1PVEUiLCJMT0NBTCIsIlZpZGVvUGxheWVyIiwiQ2xhc3MiLCJuYW1lIiwiQ29tcG9uZW50IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImluc3BlY3RvciIsImhlbHAiLCJleGVjdXRlSW5FZGl0TW9kZSIsInByb3BlcnRpZXMiLCJfcmVzb3VyY2VUeXBlIiwicmVzb3VyY2VUeXBlIiwidG9vbHRpcCIsIkNDX0RFViIsInR5cGUiLCJzZXQiLCJ2YWx1ZSIsIl91cGRhdGVWaWRlb1NvdXJjZSIsImdldCIsIl9yZW1vdGVVUkwiLCJyZW1vdGVVUkwiLCJTdHJpbmciLCJ1cmwiLCJfY2xpcCIsIkFzc2V0IiwiY2xpcCIsImN1cnJlbnRUaW1lIiwiRmxvYXQiLCJ0aW1lIiwiX2ltcGwiLCJzZWVrVG8iLCJfY3VycmVudFN0YXR1cyIsIk5PTkUiLCJTVE9QUEVEIiwiTUVUQV9MT0FERUQiLCJSRUFEWV9UT19QTEFZIiwiQ09NUExFVEVEIiwiZHVyYXRpb24iLCJfdm9sdW1lIiwidm9sdW1lIiwiaXNQbGF5aW5nIiwiX211dGUiLCJfc3luY1ZvbHVtZSIsInJhbmdlIiwibXV0ZSIsImtlZXBBc3BlY3RSYXRpbyIsIkJvb2xlYW4iLCJub3RpZnkiLCJzZXRLZWVwQXNwZWN0UmF0aW9FbmFibGVkIiwiX2lzRnVsbHNjcmVlbiIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwiaXNGdWxsc2NyZWVuIiwiaXNGdWxsU2NyZWVuRW5hYmxlZCIsImVuYWJsZSIsInNldEZ1bGxTY3JlZW5FbmFibGVkIiwiYW5pbWF0YWJsZSIsIl9zdGF5T25Cb3R0b20iLCJzdGF5T25Cb3R0b20iLCJzZXRTdGF5T25Cb3R0b20iLCJ2aWRlb1BsYXllckV2ZW50IiwiRXZlbnRIYW5kbGVyIiwic3RhdGljcyIsIkltcGwiLCJjdG9yIiwiaW1wbCIsInNldFZvbHVtZSIsIm5hdGl2ZVVybCIsInNldFVSTCIsIm9uTG9hZCIsImNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCIsInBhdXNlIiwic2V0RXZlbnRMaXN0ZW5lciIsIlBMQVlJTkciLCJvblBsYXlpbmciLCJiaW5kIiwiUEFVU0VEIiwib25QYXN1ZWQiLCJvblN0b3BwZWQiLCJvbkNvbXBsZXRlZCIsIm9uTWV0YUxvYWRlZCIsIkNMSUNLRUQiLCJvbkNsaWNrZWQiLCJvblJlYWR5VG9QbGF5Iiwib25SZXN0b3JlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJkaXNhYmxlIiwib25EZXN0cm95IiwiZGVzdHJveSIsInVwZGF0ZSIsImR0IiwidXBkYXRlTWF0cml4Iiwibm9kZSIsImVtaXRFdmVudHMiLCJlbWl0IiwicGxheSIsInJlc3VtZSIsInN0b3AiLCJnZXREdXJhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLHFCQUFELENBQS9CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFNQyxTQUFTLEdBQUdGLGVBQWUsQ0FBQ0UsU0FBbEM7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Q0g7QUFDSixHQXJZc0I7O0FBdVl2QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsV0E3WXVCLHlCQTZZUjtBQUNYLFFBQUksS0FBS3JFLEtBQVQsRUFBZ0I7QUFDWixhQUFPLEtBQUtBLEtBQUwsQ0FBV1EsUUFBWCxFQUFQO0FBQ0g7O0FBQ0QsV0FBTyxDQUFDLENBQVI7QUFDSCxHQWxac0I7O0FBb1p2QjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUcsRUFBQUEsU0ExWnVCLHVCQTBaVjtBQUNULFFBQUksS0FBS1gsS0FBVCxFQUFnQjtBQUNaLGFBQU8sS0FBS0EsS0FBTCxDQUFXVyxTQUFYLEVBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQVA7QUFDSDtBQUVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBOWEyQixDQUFULENBQWxCO0FBaWJBN0MsRUFBRSxDQUFDSSxXQUFILEdBQWlCb0csTUFBTSxDQUFDQyxPQUFQLEdBQWlCckcsV0FBbEM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IFZpZGVvUGxheWVySW1wbCA9IHJlcXVpcmUoJy4vdmlkZW8tcGxheWVyLWltcGwnKTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIFZpZGVvIGV2ZW50IHR5cGVcclxuICogISN6aCDop4bpopHkuovku7bnsbvlnotcclxuICogQGVudW0gVmlkZW9QbGF5ZXIuRXZlbnRUeXBlXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBwbGF5XHJcbiAqICEjemgg5pKt5pS+XHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQTEFZSU5HXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBwYXVzZVxyXG4gKiAhI3poIOaaguWBnFxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gUEFVU0VEXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBzdG9wXHJcbiAqICEjemgg5YGc5q2iXHJcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTVE9QUEVEXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBwbGF5IGVuZFxyXG4gKiAhI3poIOaSreaUvue7k+adn1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gQ09NUExFVEVEXHJcbiAqL1xyXG4vKipcclxuICogISNlbiBtZXRhIGRhdGEgaXMgbG9hZGVkXHJcbiAqICEjemgg6KeG6aKR55qE5YWD5L+h5oGv5bey5Yqg6L295a6M5oiQ77yM5L2g5Y+v5Lul6LCD55SoIGdldER1cmF0aW9uIOadpeiOt+WPluinhumikeaAu+aXtumVv1xyXG4gKiBAcHJvcGVydHkge051bWJlcn0gTUVUQV9MT0FERURcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIGNsaWNrZWQgYnkgdGhlIHVzZXJcclxuICogISN6aCDop4bpopHooqvnlKjmiLfngrnlh7vkuoZcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IENMSUNLRURcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIHJlYWR5IHRvIHBsYXksIHRoaXMgZXZlbnQgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgdHJpZ2dlcmVkIG9uIGFsbCBwbGF0Zm9ybSBvciBicm93c2VyLCBwbGVhc2UgZG9uJ3QgcmVseSBvbiBpdCB0byBwbGF5IHlvdXIgdmlkZW8uPGJyLz5cclxuICogISN6aCDop4bpopHlh4blpIflpb3kuobvvIzov5nkuKrkuovku7blubbkuI3kv53pmpzkvJrlnKjmiYDmnInlubPlj7DmiJbmtY/op4jlmajkuK3ooqvop6blj5HvvIzlroPkvp3otZbkuo7lubPlj7Dlrp7njrDvvIzor7fkuI3opoHkvp3otZbkuo7ov5nkuKrkuovku7blgZrop4bpopHmkq3mlL7nmoTmjqfliLbjgIJcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFQURZX1RPX1BMQVlcclxuICovXHJcbmNvbnN0IEV2ZW50VHlwZSA9IFZpZGVvUGxheWVySW1wbC5FdmVudFR5cGU7XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgdmlkZW8gcmVzb3VjZSB0eXBlIHR5cGUuXHJcbiAqICEjemgg6KeG6aKR5p2l5rqQXHJcbiAqIEBlbnVtIFZpZGVvUGxheWVyLlJlc291cmNlVHlwZVxyXG4gKi9cclxuY29uc3QgUmVzb3VyY2VUeXBlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHJlbW90ZSByZXNvdXJjZSB0eXBlLlxyXG4gICAgICogISN6aCDov5znqIvop4bpopFcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSRU1PVEVcclxuICAgICAqL1xyXG4gICAgUkVNT1RFOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBsb2NhbCByZXNvdWNlIHR5cGUuXHJcbiAgICAgKiAhI3poIOacrOWcsOinhumikVxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IExPQ0FMXHJcbiAgICAgKi9cclxuICAgIExPQ0FMOiAxXHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiAhI2VuIGNjLlZpZGVvUGxheWVyIGlzIGEgY29tcG9uZW50IGZvciBwbGF5aW5nIHZpZGVvcywgeW91IGNhbiB1c2UgaXQgZm9yIHNob3dpbmcgdmlkZW9zIGluIHlvdXIgZ2FtZS4gQmVjYXVzZSBkaWZmZXJlbnQgcGxhdGZvcm1zIGhhdmUgZGlmZmVyZW50IGF1dGhvcml6YXRpb24sIEFQSSBhbmQgY29udHJvbCBtZXRob2RzIGZvciBWaWRlb1BsYXllciBjb21wb25lbnQuIEFuZCBoYXZlIG5vdCB5ZXQgZm9ybWVkIGEgdW5pZmllZCBzdGFuZGFyZCwgb25seSBXZWIsIGlPUywgYW5kIEFuZHJvaWQgcGxhdGZvcm1zIGFyZSBjdXJyZW50bHkgc3VwcG9ydGVkLlxyXG4gKiAhI3poIFZpZGVvIOe7hOS7tu+8jOeUqOS6juWcqOa4uOaIj+S4reaSreaUvuinhumikeOAgueUseS6juS4jeWQjOW5s+WPsOWvueS6jiBWaWRlb1BsYXllciDnu4Tku7bnmoTmjojmnYPjgIFBUEnjgIHmjqfliLbmlrnlvI/pg73kuI3lkIzvvIzov5jmsqHmnInlvaLmiJDnu5/kuIDnmoTmoIflh4bvvIzmiYDku6Xnm67liY3lj6rmlK/mjIEgV2Vi44CBaU9TIOWSjCBBbmRyb2lkIOW5s+WPsOOAglxyXG4gKiBAY2xhc3MgVmlkZW9QbGF5ZXJcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5sZXQgVmlkZW9QbGF5ZXIgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuVmlkZW9QbGF5ZXInLFxyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1ZpZGVvUGxheWVyJyxcclxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3ZpZGVvcGxheWVyLmpzJyxcclxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwudmlkZW9wbGF5ZXInLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuXHJcbiAgICAgICAgX3Jlc291cmNlVHlwZTogUmVzb3VyY2VUeXBlLlJFTU9URSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSByZXNvdXJjZSB0eXBlIG9mIHZpZGVvcGxheWVyLCBSRU1PVEUgZm9yIHJlbW90ZSB1cmwgYW5kIExPQ0FMIGZvciBsb2NhbCBmaWxlIHBhdGguXHJcbiAgICAgICAgICogISN6aCDop4bpopHmnaXmupDvvJpSRU1PVEUg6KGo56S66L+c56iL6KeG6aKRIFVSTO+8jExPQ0FMIOihqOekuuacrOWcsOinhumikeWcsOWdgOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7VmlkZW9QbGF5ZXIuUmVzb3VyY2VUeXBlfSByZXNvdXJjZVR5cGVcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXNvdXJjZVR5cGU6IHtcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC52aWRlb3BsYXllci5yZXNvdXJjZVR5cGUnLFxyXG4gICAgICAgICAgICB0eXBlOiBSZXNvdXJjZVR5cGUsXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZVR5cGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZGVvU291cmNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc291cmNlVHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZW1vdGVVUkw6ICcnLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHJlbW90ZSBVUkwgb2YgdmlkZW8uXHJcbiAgICAgICAgICogISN6aCDov5znqIvop4bpopHnmoQgVVJMXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IHJlbW90ZVVSTFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlbW90ZVVSTDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnVybCcsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLlN0cmluZyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodXJsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdGVVUkwgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWaWRlb1NvdXJjZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVVUkw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfY2xpcDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Bc3NldFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgbG9jYWwgdmlkZW8gZnVsbCBwYXRoLlxyXG4gICAgICAgICAqICEjemgg5pys5Zyw6KeG6aKR55qEIFVSTFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBjbGlwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xpcDoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnZpZGVvJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2xpcDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NsaXAgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpZGVvU291cmNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFzc2V0XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgY3VycmVudCBwbGF5YmFjayB0aW1lIG9mIHRoZSBub3cgcGxheWluZyBpdGVtIGluIHNlY29uZHMsIHlvdSBjb3VsZCBhbHNvIGNoYW5nZSB0aGUgc3RhcnQgcGxheWJhY2sgdGltZS5cclxuICAgICAgICAgKiAhI3poIOaMh+WumuinhumikeS7juS7gOS5iOaXtumXtOeCueW8gOWni+aSreaUvu+8jOWNleS9jeaYr+enku+8jOS5n+WPr+S7peeUqOadpeiOt+WPluW9k+WJjeinhumikeaSreaUvueahOaXtumXtOi/m+W6puOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjdXJyZW50VGltZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudmlkZW9wbGF5ZXIuY3VycmVudFRpbWUnLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLnNlZWtUbyh0aW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciB1c2VkIHRvIG1ha2UgdGhlIGN1cnJlbnQgdGltZSBvZiBlYWNoIHBsYXRmb3JtIGNvbnNpc3RlbnRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VycmVudFN0YXR1cyA9PT0gRXZlbnRUeXBlLk5PTkUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9PT0gRXZlbnRUeXBlLlNUT1BQRUQgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9PT0gRXZlbnRUeXBlLk1FVEFfTE9BREVEIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPT09IEV2ZW50VHlwZS5SRUFEWV9UT19QTEFZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9jdXJyZW50U3RhdHVzID09PSBFdmVudFR5cGUuQ09NUExFVEVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmR1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmN1cnJlbnRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfdm9sdW1lOiAxLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHZvbHVtZSBvZiB0aGUgdmlkZW8uXHJcbiAgICAgICAgICogISN6aCDop4bpopHnmoTpn7Pph4/vvIgwLjAgfiAxLjDvvIlcclxuICAgICAgICAgKiBAcHJvcGVydHkgdm9sdW1lXHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZGVmYXVsdCAxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdm9sdW1lOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZvbHVtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKCkgJiYgIXRoaXMuX211dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zeW5jVm9sdW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMV0sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLnZvbHVtZSdcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBNdXRlcyB0aGUgVmlkZW9QbGF5ZXIuIE11dGUgc2V0cyB0aGUgdm9sdW1lPTAsIFVuLU11dGUgcmVzdG9yZSB0aGUgb3JpZ2luYWwgdm9sdW1lLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm6Z2Z6Z+z6KeG6aKR44CC6Z2Z6Z+z5pe26K6+572u6Z+z6YeP5Li6IDDvvIzlj5bmtojpnZnpn7PmmK/mgaLlpI3ljp/mnaXnmoTpn7Pph4/jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgbXV0ZVxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbXV0ZToge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tdXRlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXV0ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3luY1ZvbHVtZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLm11dGUnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciBrZWVwIHRoZSBhc3BlY3QgcmF0aW9uIG9mIHRoZSBvcmlnaW5hbCB2aWRlby5cclxuICAgICAgICAgKiAhI3poIOaYr+WQpuS/neaMgeinhumikeWOn+adpeeahOWuvemrmOavlFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0ga2VlcEFzcGVjdFJhdGlvXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGtlZXBBc3BlY3RSYXRpbzoge1xyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLmtlZXBBc3BlY3RSYXRpbycsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkJvb2xlYW4sXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbCAmJiB0aGlzLl9pbXBsLnNldEtlZXBBc3BlY3RSYXRpb0VuYWJsZWQodGhpcy5rZWVwQXNwZWN0UmF0aW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHBsYXkgdmlkZW8gaW4gZnVsbHNjcmVlbiBtb2RlLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5YWo5bGP5pKt5pS+6KeG6aKRXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBpc0Z1bGxzY3JlZW5cclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9pc0Z1bGxzY3JlZW46IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAnX04kaXNGdWxsc2NyZWVuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzRnVsbHNjcmVlbjoge1xyXG4gICAgICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0Z1bGxzY3JlZW4gPSB0aGlzLl9pbXBsICYmIHRoaXMuX2ltcGwuaXNGdWxsU2NyZWVuRW5hYmxlZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzRnVsbHNjcmVlbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IChlbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzRnVsbHNjcmVlbiA9IGVuYWJsZTtcclxuICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1wbCAmJiB0aGlzLl9pbXBsLnNldEZ1bGxTY3JlZW5FbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnZpZGVvcGxheWVyLmlzRnVsbHNjcmVlbidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEFsd2F5cyBiZWxvdyB0aGUgZ2FtZSB2aWV3IChvbmx5IHVzZWZ1bCBvbiBXZWIuIE5vdGU6IFRoZSBzcGVjaWZpYyBlZmZlY3RzIGFyZSBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50LCBkZXBlbmRpbmcgb24gd2hldGhlciBlYWNoIGJyb3dzZXIgc3VwcG9ydHMgb3IgcmVzdHJpY3RzKS5cclxuICAgICAgICAgKiAhI3poIOawuOi/nOWcqOa4uOaIj+inhuWbvuacgOW6leWxgu+8iOi/meS4quWxnuaAp+WPquacieWcqCBXZWIg5bmz5Y+w5LiK5pyJ5pWI5p6c44CC5rOo5oSP77ya5YW35L2T5pWI5p6c5peg5rOV5L+d6K+B5LiA6Ie077yM6Lef5ZCE5Liq5rWP6KeI5Zmo5piv5ZCm5pSv5oyB5LiO6ZmQ5Yi25pyJ5YWz77yJXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBzdGF5T25Cb3R0b21cclxuICAgICAgICAgKi9cclxuICAgICAgICBfc3RheU9uQm90dG9tOiBmYWxzZSxcclxuICAgICAgICBzdGF5T25Cb3R0b206IHtcclxuICAgICAgICAgICAgZ2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF5T25Cb3R0b21cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IChlbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXlPbkJvdHRvbSA9IGVuYWJsZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW1wbC5zZXRTdGF5T25Cb3R0b20oZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQudmlkZW9wbGF5ZXIuc3RheU9uQm90dG9tJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIHRoZSB2aWRlbyBwbGF5ZXIncyBjYWxsYmFjaywgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgd2hlbiBjZXJ0YWluIGV2ZW50IG9jY3VycywgbGlrZTogcGxheWluZywgcGF1c2VkLCBzdG9wcGVkIGFuZCBjb21wbGV0ZWQuXHJcbiAgICAgICAgICogISN6aCDop4bpopHmkq3mlL7lm57osIPlh73mlbDvvIzor6Xlm57osIPlh73mlbDkvJrlnKjnibnlrprmg4XlhrXooqvop6blj5HvvIzmr5TlpoLmkq3mlL7kuK3vvIzmmoLml7bvvIzlgZzmraLlkozlrozmiJDmkq3mlL7jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gdmlkZW9QbGF5ZXJFdmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZpZGVvUGxheWVyRXZlbnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgc3RhdGljczoge1xyXG4gICAgICAgIEV2ZW50VHlwZTogRXZlbnRUeXBlLFxyXG4gICAgICAgIFJlc291cmNlVHlwZTogUmVzb3VyY2VUeXBlLFxyXG4gICAgICAgIEltcGw6IFZpZGVvUGxheWVySW1wbFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl9pbXBsID0gbmV3IFZpZGVvUGxheWVySW1wbCgpO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSBFdmVudFR5cGUuTk9ORTtcclxuICAgIH0sXHJcblxyXG4gICAgX3N5bmNWb2x1bWUgKCkge1xyXG4gICAgICAgIGxldCBpbXBsID0gdGhpcy5faW1wbDtcclxuICAgICAgICBpZiAoaW1wbCkge1xyXG4gICAgICAgICAgICBsZXQgdm9sdW1lID0gdGhpcy5fbXV0ZSA/IDAgOiB0aGlzLl92b2x1bWU7XHJcbiAgICAgICAgICAgIGltcGwuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVmlkZW9Tb3VyY2UgKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSAnJztcclxuICAgICAgICBpZiAodGhpcy5yZXNvdXJjZVR5cGUgPT09IFJlc291cmNlVHlwZS5SRU1PVEUpIHtcclxuICAgICAgICAgICAgdXJsID0gdGhpcy5yZW1vdGVVUkw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2NsaXApIHtcclxuICAgICAgICAgICAgdXJsID0gdGhpcy5fY2xpcC5uYXRpdmVVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2ltcGwuc2V0VVJMKHVybCwgdGhpcy5fbXV0ZSB8fCB0aGlzLl92b2x1bWUgPT09IDApO1xyXG4gICAgICAgIHRoaXMuX2ltcGwuc2V0S2VlcEFzcGVjdFJhdGlvRW5hYmxlZCh0aGlzLmtlZXBBc3BlY3RSYXRpbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IGltcGwgPSB0aGlzLl9pbXBsO1xyXG4gICAgICAgIGlmIChpbXBsKSB7XHJcbiAgICAgICAgICAgIGltcGwuY3JlYXRlRG9tRWxlbWVudElmTmVlZGVkKHRoaXMuX211dGUgfHwgdGhpcy5fdm9sdW1lID09PSAwKTtcclxuICAgICAgICAgICAgaW1wbC5zZXRTdGF5T25Cb3R0b20odGhpcy5fc3RheU9uQm90dG9tKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlkZW9Tb3VyY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgICAgICBpbXBsLnNlZWtUbyh0aGlzLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIGltcGwuc2V0RnVsbFNjcmVlbkVuYWJsZWQodGhpcy5faXNGdWxsc2NyZWVuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlBMQVlJTkcsIHRoaXMub25QbGF5aW5nLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5QQVVTRUQsIHRoaXMub25QYXN1ZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNUT1BQRUQsIHRoaXMub25TdG9wcGVkLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgaW1wbC5zZXRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5DT01QTEVURUQsIHRoaXMub25Db21wbGV0ZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLk1FVEFfTE9BREVELCB0aGlzLm9uTWV0YUxvYWRlZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIGltcGwuc2V0RXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ0xJQ0tFRCwgdGhpcy5vbkNsaWNrZWQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICBpbXBsLnNldEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlJFQURZX1RPX1BMQVksIHRoaXMub25SZWFkeVRvUGxheS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25SZXN0b3JlICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbCA9IG5ldyBWaWRlb1BsYXllckltcGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLmVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLmRpc2FibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltcGwudXBkYXRlTWF0cml4KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblJlYWR5VG9QbGF5ICgpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLlJFQURZX1RPX1BMQVk7XHJcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLlJFQURZX1RPX1BMQVkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdyZWFkeS10by1wbGF5JywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTWV0YUxvYWRlZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IEV2ZW50VHlwZS5NRVRBX0xPQURFRDtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuTUVUQV9MT0FERUQpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdtZXRhLWxvYWRlZCcsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNsaWNrZWQgKCkge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0dXMgPSBFdmVudFR5cGUuQ0xJQ0tFRDtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuQ0xJQ0tFRCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2NsaWNrZWQnLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25QbGF5aW5nICgpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLlBMQVlJTkc7XHJcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLlBMQVlJTkcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdwbGF5aW5nJywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uUGFzdWVkICgpIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50U3RhdHVzID0gRXZlbnRUeXBlLlBBVVNFRDtcclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy52aWRlb1BsYXllckV2ZW50LCB0aGlzLCBFdmVudFR5cGUuUEFVU0VEKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgncGF1c2VkJywgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uU3RvcHBlZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IEV2ZW50VHlwZS5TVE9QUEVEO1xyXG4gICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLnZpZGVvUGxheWVyRXZlbnQsIHRoaXMsIEV2ZW50VHlwZS5TVE9QUEVEKTtcclxuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnc3RvcHBlZCcsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkNvbXBsZXRlZCAoKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXR1cyA9IEV2ZW50VHlwZS5DT01QTEVURUQ7XHJcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMudmlkZW9QbGF5ZXJFdmVudCwgdGhpcywgRXZlbnRUeXBlLkNPTVBMRVRFRCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2NvbXBsZXRlZCcsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSWYgYSB2aWRlbyBpcyBwYXVzZWQsIGNhbGwgdGhpcyBtZXRob2QgY291bGQgcmVzdW1lIHBsYXlpbmcuIElmIGEgdmlkZW8gaXMgc3RvcHBlZCwgY2FsbCB0aGlzIG1ldGhvZCB0byBwbGF5IGZyb20gc2NyYXRjaC5cclxuICAgICAqICEjemgg5aaC5p6c6KeG6aKR6KKr5pqC5YGc5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul57un57ut5pKt5pS+44CC5aaC5p6c6KeG6aKR6KKr5YGc5q2i5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul5LuO5aS05byA5aeL5pKt5pS+44CCXHJcbiAgICAgKiBAbWV0aG9kIHBsYXlcclxuICAgICAqL1xyXG4gICAgcGxheSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3luY1ZvbHVtZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJZiBhIHZpZGVvIGlzIHBhdXNlZCwgY2FsbCB0aGlzIG1ldGhvZCB0byByZXN1bWUgcGxheWluZy5cclxuICAgICAqICEjemgg5aaC5p6c5LiA5Liq6KeG6aKR5pKt5pS+6KKr5pqC5YGc5pKt5pS+5LqG77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul57un57ut5pKt5pS+44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxyXG4gICAgICovXHJcbiAgICByZXN1bWUgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N5bmNWb2x1bWUoKTtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJZiBhIHZpZGVvIGlzIHBsYXlpbmcsIGNhbGwgdGhpcyBtZXRob2QgdG8gcGF1c2UgcGxheWluZy5cclxuICAgICAqICEjemgg5aaC5p6c5LiA5Liq6KeG6aKR5q2j5Zyo5pKt5pS+77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul5pqC5YGc5pKt5pS+44CCXHJcbiAgICAgKiBAbWV0aG9kIHBhdXNlXHJcbiAgICAgKi9cclxuICAgIHBhdXNlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbXBsLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSWYgYSB2aWRlbyBpcyBwbGF5aW5nLCBjYWxsIHRoaXMgbWV0aG9kIHRvIHN0b3AgcGxheWluZyBpbW1lZGlhdGVseS5cclxuICAgICAqICEjemgg5aaC5p6c5LiA5Liq6KeG6aKR5q2j5Zyo5pKt5pS+77yM6LCD55So6L+Z5Liq5o6l5Y+j5Y+v5Lul56uL6ams5YGc5q2i5pKt5pS+44CCXHJcbiAgICAgKiBAbWV0aG9kIHN0b3BcclxuICAgICAqL1xyXG4gICAgc3RvcCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ltcGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW1wbC5zdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyB0aGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvXHJcbiAgICAgKiAhI3poIOiOt+WPluinhumikeaWh+S7tueahOaSreaUvuaAu+aXtumVv1xyXG4gICAgICogQG1ldGhvZCBnZXREdXJhdGlvblxyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0RHVyYXRpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbXBsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbXBsLmR1cmF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIERldGVybWluZSB3aGV0aGVyIHZpZGVvIGlzIHBsYXlpbmcgb3Igbm90LlxyXG4gICAgICogISN6aCDliKTmlq3lvZPliY3op4bpopHmmK/lkKblpITkuo7mkq3mlL7nirbmgIFcclxuICAgICAqIEBtZXRob2QgaXNQbGF5aW5nXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNQbGF5aW5nICgpIHtcclxuICAgICAgICBpZiAodGhpcy5faW1wbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW1wbC5pc1BsYXlpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBpZiB5b3UgZG9uJ3QgbmVlZCB0aGUgVmlkZW9QbGF5ZXIgYW5kIGl0IGlzbid0IGluIGFueSBydW5uaW5nIFNjZW5lLCB5b3Ugc2hvdWxkXHJcbiAgICAgKiBjYWxsIHRoZSBkZXN0cm95IG1ldGhvZCBvbiB0aGlzIGNvbXBvbmVudCBvciB0aGUgYXNzb2NpYXRlZCBub2RlIGV4cGxpY2l0bHkuXHJcbiAgICAgKiBPdGhlcndpc2UsIHRoZSBjcmVhdGVkIERPTSBlbGVtZW50IHdvbid0IGJlIHJlbW92ZWQgZnJvbSB3ZWIgcGFnZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOWmguaenOS9oOS4jeWGjeS9v+eUqCBWaWRlb1BsYXllcu+8jOW5tuS4lOe7hOS7tuacqua3u+WKoOWIsOWcuuaZr+S4re+8jOmCo+S5iOS9oOW/hemhu+aJi+WKqOWvuee7hOS7tuaIluaJgOWcqOiKgueCueiwg+eUqCBkZXN0cm9544CCXHJcbiAgICAgKiDov5nmoLfmiY3og73np7vpmaTnvZHpobXkuIrnmoQgRE9NIOiKgueCue+8jOmBv+WFjSBXZWIg5bmz5Y+w5YaF5a2Y5rOE6Zyy44CCXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmlkZW9wbGF5ZXIubm9kZS5wYXJlbnQgPSBudWxsOyAgLy8gb3IgIHZpZGVvcGxheWVyLm5vZGUucmVtb3ZlRnJvbVBhcmVudChmYWxzZSk7XHJcbiAgICAgKiAvLyB3aGVuIHlvdSBkb24ndCBuZWVkIHZpZGVvcGxheWVyIGFueW1vcmVcclxuICAgICAqIHZpZGVvcGxheWVyLm5vZGUuZGVzdHJveSgpO1xyXG4gICAgICogQG1ldGhvZCBkZXN0cm95XHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIGl0IGlzIHRoZSBmaXJzdCB0aW1lIHRoZSBkZXN0cm95IGJlaW5nIGNhbGxlZFxyXG4gICAgICovXHJcbn0pO1xyXG5cclxuY2MuVmlkZW9QbGF5ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFZpZGVvUGxheWVyO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgcmVhZHktdG8tcGxheVxyXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxyXG4gKiBAcGFyYW0ge1ZpZGVvUGxheWVyfSB2aWRlb1BsYXllciAtIFRoZSBWaWRlb1BsYXllciBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgbWV0YS1sb2FkZWRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtWaWRlb1BsYXllcn0gdmlkZW9QbGF5ZXIgLSBUaGUgVmlkZW9QbGF5ZXIgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGNsaWNrZWRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtWaWRlb1BsYXllcn0gdmlkZW9QbGF5ZXIgLSBUaGUgVmlkZW9QbGF5ZXIgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBwbGF5aW5nXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7VmlkZW9QbGF5ZXJ9IHZpZGVvUGxheWVyIC0gVGhlIFZpZGVvUGxheWVyIGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBwYXVzZWRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtWaWRlb1BsYXllcn0gdmlkZW9QbGF5ZXIgLSBUaGUgVmlkZW9QbGF5ZXIgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IHN0b3BwZWRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtWaWRlb1BsYXllcn0gdmlkZW9QbGF5ZXIgLSBUaGUgVmlkZW9QbGF5ZXIgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGNvbXBsZXRlZFxyXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxyXG4gKiBAcGFyYW0ge1ZpZGVvUGxheWVyfSB2aWRlb1BsYXllciAtIFRoZSBWaWRlb1BsYXllciBjb21wb25lbnQuXHJcbiAqL1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==