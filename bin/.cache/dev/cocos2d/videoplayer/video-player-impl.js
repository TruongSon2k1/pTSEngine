
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/videoplayer/video-player-impl.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var utils = require('../core/platform/utils');

var sys = require('../core/platform/CCSys');

var macro = require('../core/platform/CCMacro');

var READY_STATE = {
  HAVE_NOTHING: 0,
  HAVE_METADATA: 1,
  HAVE_CURRENT_DATA: 2,
  HAVE_FUTURE_DATA: 3,
  HAVE_ENOUGH_DATA: 4
};

var _mat4_temp = cc.mat4();

var VideoPlayerImpl = cc.Class({
  name: 'VideoPlayerImpl',
  ctor: function ctor() {
    // 播放结束等事件处理的队列
    this._EventList = {};
    this._video = null;
    this._url = '';
    this._waitingFullscreen = false;
    this._fullScreenEnabled = false;
    this._stayOnBottom = false;
    this._loadedmeta = false;
    this._loaded = false;
    this._visible = false;
    this._playing = false;
    this._ignorePause = false;
    this._forceUpdate = false; // update matrix cache

    this._m00 = 0;
    this._m01 = 0;
    this._m04 = 0;
    this._m05 = 0;
    this._m12 = 0;
    this._m13 = 0;
    this._w = 0;
    this._h = 0; //

    this.__eventListeners = {};
  },
  _bindEvent: function _bindEvent() {
    var video = this._video,
        self = this; //binding event

    var cbs = this.__eventListeners;

    cbs.loadedmetadata = function () {
      self._loadedmeta = true;
      self._forceUpdate = true;

      if (self._waitingFullscreen) {
        self._waitingFullscreen = false;

        self._toggleFullscreen(true);
      }

      self._dispatchEvent(VideoPlayerImpl.EventType.META_LOADED);
    };

    cbs.ended = function () {
      if (self._video !== video) return;
      self._playing = false;

      self._dispatchEvent(VideoPlayerImpl.EventType.COMPLETED);
    };

    cbs.play = function () {
      if (self._video !== video) return;
      self._playing = true;

      self._updateVisibility();

      self._dispatchEvent(VideoPlayerImpl.EventType.PLAYING);
    }; // pause and stop callback


    cbs.pause = function () {
      if (self._video !== video) {
        return;
      }

      self._playing = false;

      if (!self._ignorePause) {
        self._dispatchEvent(VideoPlayerImpl.EventType.PAUSED);
      }
    };

    cbs.click = function () {
      self._dispatchEvent(VideoPlayerImpl.EventType.CLICKED);
    };

    video.addEventListener("loadedmetadata", cbs.loadedmetadata);
    video.addEventListener("ended", cbs.ended);
    video.addEventListener("play", cbs.play);
    video.addEventListener("pause", cbs.pause);
    video.addEventListener("click", cbs.click);

    function onCanPlay() {
      if (self._loaded || self._playing) return;
      var video = self._video;

      if (video.readyState === READY_STATE.HAVE_ENOUGH_DATA || video.readyState === READY_STATE.HAVE_METADATA) {
        video.currentTime = 0;
        self._loaded = true;
        self._forceUpdate = true;

        self._dispatchEvent(VideoPlayerImpl.EventType.READY_TO_PLAY);

        self._updateVisibility();
      }
    }

    cbs.onCanPlay = onCanPlay;
    video.addEventListener('canplay', cbs.onCanPlay);
    video.addEventListener('canplaythrough', cbs.onCanPlay);
    video.addEventListener('suspend', cbs.onCanPlay);
  },
  _updateVisibility: function _updateVisibility() {
    var video = this._video;
    if (!video) return;

    if (this._visible) {
      video.style.visibility = 'visible';
    } else {
      video.style.visibility = 'hidden';
      video.pause();
      this._playing = false;
    }
  },
  _updateSize: function _updateSize(width, height) {
    var video = this._video;
    if (!video) return;
    video.style.width = width + 'px';
    video.style.height = height + 'px';
  },
  _createDom: function _createDom(muted) {
    var video = document.createElement('video');
    video.style.position = "absolute";
    video.style.bottom = "0px";
    video.style.left = "0px";
    video.style['z-index'] = this._stayOnBottom ? macro.MIN_ZINDEX : 0;
    video.className = "cocosVideo";
    video.setAttribute('preload', 'auto');
    video.setAttribute('webkit-playsinline', ''); // This x5-playsinline tag must be added, otherwise the play, pause events will only fire once, in the qq browser.

    video.setAttribute("x5-playsinline", '');
    video.setAttribute('playsinline', '');

    if (muted) {
      video.setAttribute('muted', '');
    }

    this._video = video;
    cc.game.container.appendChild(video);
  },
  createDomElementIfNeeded: function createDomElementIfNeeded(muted) {
    if (!this._video) {
      this._createDom(muted);
    }
  },
  removeDom: function removeDom() {
    var video = this._video;

    if (video) {
      var hasChild = utils.contains(cc.game.container, video);
      if (hasChild) cc.game.container.removeChild(video);
      var cbs = this.__eventListeners;
      video.removeEventListener("loadedmetadata", cbs.loadedmetadata);
      video.removeEventListener("ended", cbs.ended);
      video.removeEventListener("play", cbs.play);
      video.removeEventListener("pause", cbs.pause);
      video.removeEventListener("click", cbs.click);
      video.removeEventListener("canplay", cbs.onCanPlay);
      video.removeEventListener("canplaythrough", cbs.onCanPlay);
      video.removeEventListener("suspend", cbs.onCanPlay);
      cbs.loadedmetadata = null;
      cbs.ended = null;
      cbs.play = null;
      cbs.pause = null;
      cbs.click = null;
      cbs.onCanPlay = null;
    }

    this._video = null;
    this._url = "";
  },
  setURL: function setURL(path, muted) {
    var source, extname;

    if (this._url === path) {
      return;
    }

    this.removeDom();
    this._url = path;
    this.createDomElementIfNeeded(muted);

    this._bindEvent();

    var video = this._video;
    video.style["visibility"] = "hidden";
    this._loaded = false;
    this._playing = false;
    this._loadedmeta = false;
    source = document.createElement("source");
    source.src = path;
    video.appendChild(source);
    extname = cc.path.extname(path);
    var polyfill = VideoPlayerImpl._polyfill;

    for (var i = 0; i < polyfill.canPlayType.length; i++) {
      if (extname !== polyfill.canPlayType[i]) {
        source = document.createElement("source");
        source.src = path.replace(extname, polyfill.canPlayType[i]);
        video.appendChild(source);
      }
    }
  },
  getURL: function getURL() {
    return this._url;
  },
  play: function play() {
    var video = this._video;
    if (!video || !this._visible || this._playing) return;
    video.play();
  },
  pause: function pause() {
    var video = this._video;
    if (!this._playing || !video) return;
    video.pause();
  },
  resume: function resume() {
    this.play();
  },
  stop: function stop() {
    var video = this._video;
    if (!video || !this._visible) return;
    this._ignorePause = true;
    video.currentTime = 0;
    video.pause();
    setTimeout(function () {
      this._dispatchEvent(VideoPlayerImpl.EventType.STOPPED);

      this._ignorePause = false;
    }.bind(this), 0);
  },
  setVolume: function setVolume(volume) {
    var video = this._video;

    if (video) {
      video.volume = volume;
    }
  },
  seekTo: function seekTo(time) {
    var video = this._video;
    if (!video) return;

    if (this._loaded) {
      video.currentTime = time;
    } else {
      var cb = function cb() {
        video.currentTime = time;
        video.removeEventListener(VideoPlayerImpl._polyfill.event, cb);
      };

      video.addEventListener(VideoPlayerImpl._polyfill.event, cb);
    }
  },
  isPlaying: function isPlaying() {
    return this._playing;
  },
  duration: function duration() {
    var video = this._video;
    var duration = -1;
    if (!video) return duration;
    duration = video.duration;

    if (duration <= 0) {
      cc.logID(7702);
    }

    return duration;
  },
  currentTime: function currentTime() {
    var video = this._video;
    if (!video) return -1;
    return video.currentTime;
  },
  setKeepAspectRatioEnabled: function setKeepAspectRatioEnabled() {
    if (CC_EDITOR) {
      return;
    }

    cc.logID(7700);
  },
  isKeepAspectRatioEnabled: function isKeepAspectRatioEnabled() {
    return true;
  },
  _toggleFullscreen: function _toggleFullscreen(enable) {
    var self = this,
        video = this._video;

    if (!video) {
      return;
    } // Monitor video entry and exit full-screen events


    function handleFullscreenChange(event) {
      var fullscreenElement = sys.browserType === sys.BROWSER_TYPE_IE ? document.msFullscreenElement : document.fullscreenElement;
      self._fullScreenEnabled = fullscreenElement === video;
    }

    function handleFullScreenError(event) {
      self._fullScreenEnabled = false;
    }

    if (enable) {
      if (sys.browserType === sys.BROWSER_TYPE_IE) {
        // fix IE full screen content is not centered
        video.style['transform'] = '';
      }

      cc.screen.requestFullScreen(video, handleFullscreenChange, handleFullScreenError);
    } else if (cc.screen.fullScreen()) {
      cc.screen.exitFullScreen(video);
    }
  },
  setStayOnBottom: function setStayOnBottom(enabled) {
    this._stayOnBottom = enabled;
    if (!this._video) return;
    this._video.style['z-index'] = enabled ? macro.MIN_ZINDEX : 0;
  },
  setFullScreenEnabled: function setFullScreenEnabled(enable) {
    if (!this._loadedmeta && enable) {
      this._waitingFullscreen = true;
    } else {
      this._toggleFullscreen(enable);
    }
  },
  isFullScreenEnabled: function isFullScreenEnabled() {
    return this._fullScreenEnabled;
  },
  setEventListener: function setEventListener(event, callback) {
    this._EventList[event] = callback;
  },
  removeEventListener: function removeEventListener(event) {
    this._EventList[event] = null;
  },
  _dispatchEvent: function _dispatchEvent(event) {
    var callback = this._EventList[event];
    if (callback) callback.call(this, this, this._video.src);
  },
  onPlayEvent: function onPlayEvent() {
    var callback = this._EventList[VideoPlayerImpl.EventType.PLAYING];
    callback.call(this, this, this._video.src);
  },
  enable: function enable() {
    var list = VideoPlayerImpl.elements;
    if (list.indexOf(this) === -1) list.push(this);
    this.setVisible(true);
  },
  disable: function disable() {
    var list = VideoPlayerImpl.elements;
    var index = list.indexOf(this);
    if (index !== -1) list.splice(index, 1);
    this.setVisible(false);
  },
  destroy: function destroy() {
    this.disable();
    this.removeDom();
  },
  setVisible: function setVisible(visible) {
    if (this._visible !== visible) {
      this._visible = !!visible;

      this._updateVisibility();
    }
  },
  updateMatrix: function updateMatrix(node) {
    if (!this._video || !this._visible || this._fullScreenEnabled) return;
    node.getWorldMatrix(_mat4_temp);

    var renderCamera = cc.Camera._findRendererCamera(node);

    if (renderCamera) {
      renderCamera.worldMatrixToScreen(_mat4_temp, _mat4_temp, cc.game.canvas.width, cc.game.canvas.height);
    }

    var _mat4_tempm = _mat4_temp.m;

    if (!this._forceUpdate && this._m00 === _mat4_tempm[0] && this._m01 === _mat4_tempm[1] && this._m04 === _mat4_tempm[4] && this._m05 === _mat4_tempm[5] && this._m12 === _mat4_tempm[12] && this._m13 === _mat4_tempm[13] && this._w === node._contentSize.width && this._h === node._contentSize.height) {
      return;
    } // update matrix cache


    this._m00 = _mat4_tempm[0];
    this._m01 = _mat4_tempm[1];
    this._m04 = _mat4_tempm[4];
    this._m05 = _mat4_tempm[5];
    this._m12 = _mat4_tempm[12];
    this._m13 = _mat4_tempm[13];
    this._w = node._contentSize.width;
    this._h = node._contentSize.height;
    var dpr = cc.view._devicePixelRatio;
    var scaleX = 1 / dpr;
    var scaleY = 1 / dpr;
    var container = cc.game.container;
    var a = _mat4_tempm[0] * scaleX,
        b = _mat4_tempm[1],
        c = _mat4_tempm[4],
        d = _mat4_tempm[5] * scaleY;
    var offsetX = container && container.style.paddingLeft ? parseInt(container.style.paddingLeft) : 0;
    var offsetY = container && container.style.paddingBottom ? parseInt(container.style.paddingBottom) : 0;
    var w, h;

    if (VideoPlayerImpl._polyfill.zoomInvalid) {
      this._updateSize(this._w * a, this._h * d);

      a = 1;
      d = 1;
      w = this._w * scaleX;
      h = this._h * scaleY;
    } else {
      w = this._w * scaleX;
      h = this._h * scaleY;

      this._updateSize(this._w, this._h);
    }

    var appx = w * _mat4_tempm[0] * node._anchorPoint.x;
    var appy = h * _mat4_tempm[5] * node._anchorPoint.y;
    var tx = _mat4_tempm[12] * scaleX - appx + offsetX,
        ty = _mat4_tempm[13] * scaleY - appy + offsetY;
    var matrix = "matrix(" + a + "," + -b + "," + -c + "," + d + "," + tx + "," + -ty + ")";
    this._video.style['transform'] = matrix;
    this._video.style['-webkit-transform'] = matrix;
    this._video.style['transform-origin'] = '0px 100% 0px';
    this._video.style['-webkit-transform-origin'] = '0px 100% 0px'; // TODO: move into web adapter
    // video style would change when enter fullscreen on IE
    // there is no way to add fullscreenchange event listeners on IE so that we can restore the cached video style

    if (sys.browserType !== sys.BROWSER_TYPE_IE) {
      this._forceUpdate = false;
    }
  }
});
VideoPlayerImpl.EventType = {
  NONE: -1,
  PLAYING: 0,
  PAUSED: 1,
  STOPPED: 2,
  COMPLETED: 3,
  META_LOADED: 4,
  CLICKED: 5,
  READY_TO_PLAY: 6
}; // video 队列，所有 vidoe 在 onEnter 的时候都会插入这个队列

VideoPlayerImpl.elements = []; // video 在 game_hide 事件中被自动暂停的队列，用于回复的时候重新开始播放

VideoPlayerImpl.pauseElements = [];
cc.game.on(cc.game.EVENT_HIDE, function () {
  var list = VideoPlayerImpl.elements;

  for (var element, i = 0; i < list.length; i++) {
    element = list[i];

    if (element.isPlaying()) {
      element.pause();
      VideoPlayerImpl.pauseElements.push(element);
    }
  }
});
cc.game.on(cc.game.EVENT_SHOW, function () {
  var list = VideoPlayerImpl.pauseElements;
  var element = list.pop();

  while (element) {
    element.play();
    element = list.pop();
  }
});
/**
 * Adapter various machines
 * @devicePixelRatio Whether you need to consider devicePixelRatio calculated position
 * @event To get the data using events
 */

VideoPlayerImpl._polyfill = {
  devicePixelRatio: false,
  event: "canplay",
  canPlayType: []
};
/**
 * Some old browser only supports Theora encode video
 * But native does not support this encode,
 * so it is best to provide mp4 and webm or ogv file
 */
// TODO: adapt wx video player
// issue: https://github.com/cocos-creator/2d-tasks/issues/1364

var dom = document.createElement("video");

if (dom.canPlayType) {
  if (dom.canPlayType("video/ogg")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".ogg");

    VideoPlayerImpl._polyfill.canPlayType.push(".ogv");
  }

  if (dom.canPlayType("video/mp4")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".mp4");
  }

  if (dom.canPlayType("video/webm")) {
    VideoPlayerImpl._polyfill.canPlayType.push(".webm");
  }
}

if (sys.OS_ANDROID === sys.os && (sys.browserType === sys.BROWSER_TYPE_SOUGOU || sys.browserType === sys.BROWSER_TYPE_360)) {
  VideoPlayerImpl._polyfill.zoomInvalid = true;
}

var style = document.createElement("style");
style.innerHTML = ".cocosVideo:-moz-full-screen{transform:matrix(1,0,0,1,0,0) !important;}" + ".cocosVideo:full-screen{transform:matrix(1,0,0,1,0,0) !important;}" + ".cocosVideo:-webkit-full-screen{transform:matrix(1,0,0,1,0,0) !important;}";
document.head.appendChild(style);
module.exports = VideoPlayerImpl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXHZpZGVvcGxheWVyXFx2aWRlby1wbGF5ZXItaW1wbC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJzeXMiLCJtYWNybyIsIlJFQURZX1NUQVRFIiwiSEFWRV9OT1RISU5HIiwiSEFWRV9NRVRBREFUQSIsIkhBVkVfQ1VSUkVOVF9EQVRBIiwiSEFWRV9GVVRVUkVfREFUQSIsIkhBVkVfRU5PVUdIX0RBVEEiLCJfbWF0NF90ZW1wIiwiY2MiLCJtYXQ0IiwiVmlkZW9QbGF5ZXJJbXBsIiwiQ2xhc3MiLCJuYW1lIiwiY3RvciIsIl9FdmVudExpc3QiLCJfdmlkZW8iLCJfdXJsIiwiX3dhaXRpbmdGdWxsc2NyZWVuIiwiX2Z1bGxTY3JlZW5FbmFibGVkIiwiX3N0YXlPbkJvdHRvbSIsIl9sb2FkZWRtZXRhIiwiX2xvYWRlZCIsIl92aXNpYmxlIiwiX3BsYXlpbmciLCJfaWdub3JlUGF1c2UiLCJfZm9yY2VVcGRhdGUiLCJfbTAwIiwiX20wMSIsIl9tMDQiLCJfbTA1IiwiX20xMiIsIl9tMTMiLCJfdyIsIl9oIiwiX19ldmVudExpc3RlbmVycyIsIl9iaW5kRXZlbnQiLCJ2aWRlbyIsInNlbGYiLCJjYnMiLCJsb2FkZWRtZXRhZGF0YSIsIl90b2dnbGVGdWxsc2NyZWVuIiwiX2Rpc3BhdGNoRXZlbnQiLCJFdmVudFR5cGUiLCJNRVRBX0xPQURFRCIsImVuZGVkIiwiQ09NUExFVEVEIiwicGxheSIsIl91cGRhdGVWaXNpYmlsaXR5IiwiUExBWUlORyIsInBhdXNlIiwiUEFVU0VEIiwiY2xpY2siLCJDTElDS0VEIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2FuUGxheSIsInJlYWR5U3RhdGUiLCJjdXJyZW50VGltZSIsIlJFQURZX1RPX1BMQVkiLCJzdHlsZSIsInZpc2liaWxpdHkiLCJfdXBkYXRlU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiX2NyZWF0ZURvbSIsIm11dGVkIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicG9zaXRpb24iLCJib3R0b20iLCJsZWZ0IiwiTUlOX1pJTkRFWCIsImNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsImdhbWUiLCJjb250YWluZXIiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZCIsInJlbW92ZURvbSIsImhhc0NoaWxkIiwiY29udGFpbnMiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRVUkwiLCJwYXRoIiwic291cmNlIiwiZXh0bmFtZSIsInNyYyIsInBvbHlmaWxsIiwiX3BvbHlmaWxsIiwiaSIsImNhblBsYXlUeXBlIiwibGVuZ3RoIiwicmVwbGFjZSIsImdldFVSTCIsInJlc3VtZSIsInN0b3AiLCJzZXRUaW1lb3V0IiwiU1RPUFBFRCIsImJpbmQiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZWVrVG8iLCJ0aW1lIiwiY2IiLCJldmVudCIsImlzUGxheWluZyIsImR1cmF0aW9uIiwibG9nSUQiLCJzZXRLZWVwQXNwZWN0UmF0aW9FbmFibGVkIiwiQ0NfRURJVE9SIiwiaXNLZWVwQXNwZWN0UmF0aW9FbmFibGVkIiwiZW5hYmxlIiwiaGFuZGxlRnVsbHNjcmVlbkNoYW5nZSIsImZ1bGxzY3JlZW5FbGVtZW50IiwiYnJvd3NlclR5cGUiLCJCUk9XU0VSX1RZUEVfSUUiLCJtc0Z1bGxzY3JlZW5FbGVtZW50IiwiaGFuZGxlRnVsbFNjcmVlbkVycm9yIiwic2NyZWVuIiwicmVxdWVzdEZ1bGxTY3JlZW4iLCJmdWxsU2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJzZXRTdGF5T25Cb3R0b20iLCJlbmFibGVkIiwic2V0RnVsbFNjcmVlbkVuYWJsZWQiLCJpc0Z1bGxTY3JlZW5FbmFibGVkIiwic2V0RXZlbnRMaXN0ZW5lciIsImNhbGxiYWNrIiwiY2FsbCIsIm9uUGxheUV2ZW50IiwibGlzdCIsImVsZW1lbnRzIiwiaW5kZXhPZiIsInB1c2giLCJzZXRWaXNpYmxlIiwiZGlzYWJsZSIsImluZGV4Iiwic3BsaWNlIiwiZGVzdHJveSIsInZpc2libGUiLCJ1cGRhdGVNYXRyaXgiLCJub2RlIiwiZ2V0V29ybGRNYXRyaXgiLCJyZW5kZXJDYW1lcmEiLCJDYW1lcmEiLCJfZmluZFJlbmRlcmVyQ2FtZXJhIiwid29ybGRNYXRyaXhUb1NjcmVlbiIsImNhbnZhcyIsIl9tYXQ0X3RlbXBtIiwibSIsIl9jb250ZW50U2l6ZSIsImRwciIsInZpZXciLCJfZGV2aWNlUGl4ZWxSYXRpbyIsInNjYWxlWCIsInNjYWxlWSIsImEiLCJiIiwiYyIsImQiLCJvZmZzZXRYIiwicGFkZGluZ0xlZnQiLCJwYXJzZUludCIsIm9mZnNldFkiLCJwYWRkaW5nQm90dG9tIiwidyIsImgiLCJ6b29tSW52YWxpZCIsImFwcHgiLCJfYW5jaG9yUG9pbnQiLCJ4IiwiYXBweSIsInkiLCJ0eCIsInR5IiwibWF0cml4IiwiTk9ORSIsInBhdXNlRWxlbWVudHMiLCJvbiIsIkVWRU5UX0hJREUiLCJlbGVtZW50IiwiRVZFTlRfU0hPVyIsInBvcCIsImRldmljZVBpeGVsUmF0aW8iLCJkb20iLCJPU19BTkRST0lEIiwib3MiLCJCUk9XU0VSX1RZUEVfU09VR09VIiwiQlJPV1NFUl9UWVBFXzM2MCIsImlubmVySFRNTCIsImhlYWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsd0JBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FBbkI7O0FBQ0EsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsMEJBQUQsQ0FBckI7O0FBRUEsSUFBTUcsV0FBVyxHQUFHO0FBQ2hCQyxFQUFBQSxZQUFZLEVBQUUsQ0FERTtBQUVoQkMs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QXZCLENBQVo7QUFDQVIsS0FBSyxDQUFDbUksU0FBTixHQUFrQiw0RUFDZCxvRUFEYyxHQUVkLDRFQUZKO0FBR0E1SCxRQUFRLENBQUM2SCxJQUFULENBQWNuSCxXQUFkLENBQTBCakIsS0FBMUI7QUFFQXFJLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRMLGVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vdXRpbHMnKTtcclxuY29uc3Qgc3lzID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ1N5cycpO1xyXG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vQ0NNYWNybycpO1xyXG5cclxuY29uc3QgUkVBRFlfU1RBVEUgPSB7XHJcbiAgICBIQVZFX05PVEhJTkc6IDAsXHJcbiAgICBIQVZFX01FVEFEQVRBOiAxLFxyXG4gICAgSEFWRV9DVVJSRU5UX0RBVEE6IDIsXHJcbiAgICBIQVZFX0ZVVFVSRV9EQVRBOiAzLFxyXG4gICAgSEFWRV9FTk9VR0hfREFUQTogNFxyXG59O1xyXG5cclxubGV0IF9tYXQ0X3RlbXAgPSBjYy5tYXQ0KCk7XHJcblxyXG5sZXQgVmlkZW9QbGF5ZXJJbXBsID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ1ZpZGVvUGxheWVySW1wbCcsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgLy8g5pKt5pS+57uT5p2f562J5LqL5Lu25aSE55CG55qE6Zif5YiXXHJcbiAgICAgICAgdGhpcy5fRXZlbnRMaXN0ID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuX3ZpZGVvID0gbnVsbDtcclxuICAgICAgICB0aGlzLl91cmwgPSAnJztcclxuXHJcbiAgICAgICAgdGhpcy5fd2FpdGluZ0Z1bGxzY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9mdWxsU2NyZWVuRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3N0YXlPbkJvdHRvbSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9sb2FkZWRtZXRhID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9pZ25vcmVQYXVzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBtYXRyaXggY2FjaGVcclxuICAgICAgICB0aGlzLl9tMDAgPSAwO1xyXG4gICAgICAgIHRoaXMuX20wMSA9IDA7XHJcbiAgICAgICAgdGhpcy5fbTA0ID0gMDtcclxuICAgICAgICB0aGlzLl9tMDUgPSAwO1xyXG4gICAgICAgIHRoaXMuX20xMiA9IDA7XHJcbiAgICAgICAgdGhpcy5fbTEzID0gMDtcclxuICAgICAgICB0aGlzLl93ID0gMDtcclxuICAgICAgICB0aGlzLl9oID0gMDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMuX19ldmVudExpc3RlbmVycyA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBfYmluZEV2ZW50ICgpIHtcclxuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbywgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy9iaW5kaW5nIGV2ZW50XHJcbiAgICAgICAgbGV0IGNicyA9IHRoaXMuX19ldmVudExpc3RlbmVycztcclxuICAgICAgICBjYnMubG9hZGVkbWV0YWRhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2xvYWRlZG1ldGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLl9mb3JjZVVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl93YWl0aW5nRnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fd2FpdGluZ0Z1bGxzY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3RvZ2dsZUZ1bGxzY3JlZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5fZGlzcGF0Y2hFdmVudChWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLk1FVEFfTE9BREVEKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNicy5lbmRlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuX3ZpZGVvICE9PSB2aWRlbykgcmV0dXJuO1xyXG4gICAgICAgICAgICBzZWxmLl9wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5DT01QTEVURUQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY2JzLnBsYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl92aWRlbyAhPT0gdmlkZW8pIHJldHVybjtcclxuICAgICAgICAgICAgc2VsZi5fcGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuX3VwZGF0ZVZpc2liaWxpdHkoKTtcclxuICAgICAgICAgICAgc2VsZi5fZGlzcGF0Y2hFdmVudChWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLlBMQVlJTkcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gcGF1c2UgYW5kIHN0b3AgY2FsbGJhY2tcclxuICAgICAgICBjYnMucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl92aWRlbyAhPT0gdmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLl9wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5faWdub3JlUGF1c2UpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5QQVVTRUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYnMuY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5DTElDS0VEKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgY2JzLmxvYWRlZG1ldGFkYXRhKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgY2JzLmVuZGVkKTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwicGxheVwiLCBjYnMucGxheSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIGNicy5wYXVzZSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNicy5jbGljayk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ2FuUGxheSAoKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLl9sb2FkZWQgfHwgc2VsZi5fcGxheWluZylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHZpZGVvID0gc2VsZi5fdmlkZW87XHJcbiAgICAgICAgICAgIGlmICh2aWRlby5yZWFkeVN0YXRlID09PSBSRUFEWV9TVEFURS5IQVZFX0VOT1VHSF9EQVRBIHx8XHJcbiAgICAgICAgICAgICAgICB2aWRlby5yZWFkeVN0YXRlID09PSBSRUFEWV9TVEFURS5IQVZFX01FVEFEQVRBKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZm9yY2VVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGlzcGF0Y2hFdmVudChWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLlJFQURZX1RPX1BMQVkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fdXBkYXRlVmlzaWJpbGl0eSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYnMub25DYW5QbGF5ID0gb25DYW5QbGF5O1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCBjYnMub25DYW5QbGF5KTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNicy5vbkNhblBsYXkpO1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3N1c3BlbmQnLCBjYnMub25DYW5QbGF5KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVZpc2liaWxpdHkgKCkge1xyXG4gICAgICAgIGxldCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xyXG4gICAgICAgIGlmICghdmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpIHtcclxuICAgICAgICAgICAgdmlkZW8uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVNpemUgKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcclxuICAgICAgICBpZiAoIXZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICAgIHZpZGVvLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVEb20gKG11dGVkKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICB2aWRlby5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgICAgICB2aWRlby5zdHlsZS5ib3R0b20gPSBcIjBweFwiO1xyXG4gICAgICAgIHZpZGVvLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICAgIHZpZGVvLnN0eWxlWyd6LWluZGV4J10gPSB0aGlzLl9zdGF5T25Cb3R0b20gPyBtYWNyby5NSU5fWklOREVYIDogMDtcclxuICAgICAgICB2aWRlby5jbGFzc05hbWUgPSBcImNvY29zVmlkZW9cIjtcclxuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnLCAnYXV0bycpO1xyXG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgIC8vIFRoaXMgeDUtcGxheXNpbmxpbmUgdGFnIG11c3QgYmUgYWRkZWQsIG90aGVyd2lzZSB0aGUgcGxheSwgcGF1c2UgZXZlbnRzIHdpbGwgb25seSBmaXJlIG9uY2UsIGluIHRoZSBxcSBicm93c2VyLlxyXG4gICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZShcIng1LXBsYXlzaW5saW5lXCIsICcnKTtcclxuICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xyXG4gICAgICAgIGlmIChtdXRlZCkge1xyXG4gICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmlkZW8gPSB2aWRlbztcclxuICAgICAgICBjYy5nYW1lLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh2aWRlbyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZURvbUVsZW1lbnRJZk5lZWRlZDogZnVuY3Rpb24gKG11dGVkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlbykge1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVEb20obXV0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlRG9tICgpIHtcclxuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcclxuICAgICAgICBpZiAodmlkZW8pIHtcclxuICAgICAgICAgICAgbGV0IGhhc0NoaWxkID0gdXRpbHMuY29udGFpbnMoY2MuZ2FtZS5jb250YWluZXIsIHZpZGVvKTtcclxuICAgICAgICAgICAgaWYgKGhhc0NoaWxkKVxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5jb250YWluZXIucmVtb3ZlQ2hpbGQodmlkZW8pO1xyXG4gICAgICAgICAgICBsZXQgY2JzID0gdGhpcy5fX2V2ZW50TGlzdGVuZXJzO1xyXG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgY2JzLmxvYWRlZG1ldGFkYXRhKTtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGNicy5lbmRlZCk7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsIGNicy5wbGF5KTtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIGNicy5wYXVzZSk7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYnMuY2xpY2spO1xyXG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBjYnMub25DYW5QbGF5KTtcclxuICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsIGNicy5vbkNhblBsYXkpO1xyXG4gICAgICAgICAgICB2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VzcGVuZFwiLCBjYnMub25DYW5QbGF5KTtcclxuXHJcbiAgICAgICAgICAgIGNicy5sb2FkZWRtZXRhZGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIGNicy5lbmRlZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGNicy5wbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgY2JzLnBhdXNlID0gbnVsbDtcclxuICAgICAgICAgICAgY2JzLmNsaWNrID0gbnVsbDtcclxuICAgICAgICAgICAgY2JzLm9uQ2FuUGxheSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92aWRlbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdXJsID0gXCJcIjtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VVJMIChwYXRoLCBtdXRlZCkge1xyXG4gICAgICAgIGxldCBzb3VyY2UsIGV4dG5hbWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl91cmwgPT09IHBhdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVEb20oKTtcclxuICAgICAgICB0aGlzLl91cmwgPSBwYXRoO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRG9tRWxlbWVudElmTmVlZGVkKG11dGVkKTtcclxuICAgICAgICB0aGlzLl9iaW5kRXZlbnQoKTtcclxuXHJcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XHJcbiAgICAgICAgdmlkZW8uc3R5bGVbXCJ2aXNpYmlsaXR5XCJdID0gXCJoaWRkZW5cIjtcclxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbG9hZGVkbWV0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzb3VyY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic291cmNlXCIpO1xyXG4gICAgICAgIHNvdXJjZS5zcmMgPSBwYXRoO1xyXG4gICAgICAgIHZpZGVvLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcblxyXG4gICAgICAgIGV4dG5hbWUgPSBjYy5wYXRoLmV4dG5hbWUocGF0aCk7XHJcbiAgICAgICAgbGV0IHBvbHlmaWxsID0gVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvbHlmaWxsLmNhblBsYXlUeXBlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChleHRuYW1lICE9PSBwb2x5ZmlsbC5jYW5QbGF5VHlwZVtpXSkge1xyXG4gICAgICAgICAgICAgICAgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNvdXJjZVwiKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBwYXRoLnJlcGxhY2UoZXh0bmFtZSwgcG9seWZpbGwuY2FuUGxheVR5cGVbaV0pO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8uYXBwZW5kQ2hpbGQoc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ2V0VVJMOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhdGhpcy5fdmlzaWJsZSB8fCB0aGlzLl9wbGF5aW5nKSByZXR1cm47XHJcbiAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwYXVzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xyXG4gICAgICAgIGlmICghdGhpcy5fcGxheWluZyB8fCAhdmlkZW8pIHJldHVybjtcclxuICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZXN1bWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCB2aWRlbyA9IHRoaXMuX3ZpZGVvO1xyXG4gICAgICAgIGlmICghdmlkZW8gfHwgIXRoaXMuX3Zpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pZ25vcmVQYXVzZSA9IHRydWU7XHJcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZS5TVE9QUEVEKTtcclxuICAgICAgICAgICAgdGhpcy5faWdub3JlUGF1c2UgPSBmYWxzZTtcclxuICAgICAgICB9LmJpbmQodGhpcyksIDApO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2V0Vm9sdW1lOiBmdW5jdGlvbiAodm9sdW1lKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XHJcbiAgICAgICAgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNlZWtUbzogZnVuY3Rpb24gKHRpbWUpIHtcclxuICAgICAgICBsZXQgdmlkZW8gPSB0aGlzLl92aWRlbztcclxuICAgICAgICBpZiAoIXZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9sb2FkZWQpIHtcclxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNiID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmV2ZW50LCBjYik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5ldmVudCwgY2IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlpbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIGR1cmF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gLTE7XHJcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuIGR1cmF0aW9uO1xyXG5cclxuICAgICAgICBkdXJhdGlvbiA9IHZpZGVvLmR1cmF0aW9uO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZ0lEKDc3MDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGR1cmF0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICBjdXJyZW50VGltZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IHZpZGVvID0gdGhpcy5fdmlkZW87XHJcbiAgICAgICAgaWYgKCF2aWRlbykgcmV0dXJuIC0xO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldEtlZXBBc3BlY3RSYXRpb0VuYWJsZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nSUQoNzcwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGlzS2VlcEFzcGVjdFJhdGlvRW5hYmxlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdG9nZ2xlRnVsbHNjcmVlbjogZnVuY3Rpb24gKGVuYWJsZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcywgdmlkZW8gPSB0aGlzLl92aWRlbztcclxuICAgICAgICBpZiAoIXZpZGVvKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1vbml0b3IgdmlkZW8gZW50cnkgYW5kIGV4aXQgZnVsbC1zY3JlZW4gZXZlbnRzXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRnVsbHNjcmVlbkNoYW5nZSAoZXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IGZ1bGxzY3JlZW5FbGVtZW50ID0gc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX0lFID8gZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCA6IGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50O1xyXG4gICAgICAgICAgICBzZWxmLl9mdWxsU2NyZWVuRW5hYmxlZCA9ICAoZnVsbHNjcmVlbkVsZW1lbnQgPT09IHZpZGVvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRnVsbFNjcmVlbkVycm9yIChldmVudCkge1xyXG4gICAgICAgICAgICBzZWxmLl9mdWxsU2NyZWVuRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGVuYWJsZSkge1xyXG4gICAgICAgICAgICBpZiAoc3lzLmJyb3dzZXJUeXBlID09PSBzeXMuQlJPV1NFUl9UWVBFX0lFKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBmaXggSUUgZnVsbCBzY3JlZW4gY29udGVudCBpcyBub3QgY2VudGVyZWRcclxuICAgICAgICAgICAgICAgIHZpZGVvLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNjLnNjcmVlbi5yZXF1ZXN0RnVsbFNjcmVlbih2aWRlbywgaGFuZGxlRnVsbHNjcmVlbkNoYW5nZSwgaGFuZGxlRnVsbFNjcmVlbkVycm9yKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNjLnNjcmVlbi5mdWxsU2NyZWVuKCkpIHtcclxuICAgICAgICAgICAgY2Muc2NyZWVuLmV4aXRGdWxsU2NyZWVuKHZpZGVvKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFN0YXlPbkJvdHRvbTogZnVuY3Rpb24gKGVuYWJsZWQpIHtcclxuICAgICAgICB0aGlzLl9zdGF5T25Cb3R0b20gPSBlbmFibGVkO1xyXG4gICAgICAgIGlmICghdGhpcy5fdmlkZW8pIHJldHVybjtcclxuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsnei1pbmRleCddID0gZW5hYmxlZCA/IG1hY3JvLk1JTl9aSU5ERVggOiAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRGdWxsU2NyZWVuRW5hYmxlZDogZnVuY3Rpb24gKGVuYWJsZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbG9hZGVkbWV0YSAmJiBlbmFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0Z1bGxzY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlRnVsbHNjcmVlbihlbmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNGdWxsU2NyZWVuRW5hYmxlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxsU2NyZWVuRW5hYmxlZDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0RXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX0V2ZW50TGlzdFtldmVudF0gPSBjYWxsYmFjaztcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fRXZlbnRMaXN0W2V2ZW50XSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kaXNwYXRjaEV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLl9FdmVudExpc3RbZXZlbnRdO1xyXG4gICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLCB0aGlzLl92aWRlby5zcmMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvblBsYXlFdmVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBjYWxsYmFjayA9IHRoaXMuX0V2ZW50TGlzdFtWaWRlb1BsYXllckltcGwuRXZlbnRUeXBlLlBMQVlJTkddO1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcywgdGhpcy5fdmlkZW8uc3JjKTtcclxuICAgIH0sXHJcblxyXG4gICAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSBWaWRlb1BsYXllckltcGwuZWxlbWVudHM7XHJcbiAgICAgICAgaWYgKGxpc3QuaW5kZXhPZih0aGlzKSA9PT0gLTEpXHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzKTtcclxuICAgICAgICB0aGlzLnNldFZpc2libGUodHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IFZpZGVvUGxheWVySW1wbC5lbGVtZW50cztcclxuICAgICAgICBsZXQgaW5kZXggPSBsaXN0LmluZGV4T2YodGhpcyk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcclxuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHRoaXMuc2V0VmlzaWJsZShmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZURvbSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRWaXNpYmxlOiBmdW5jdGlvbiAodmlzaWJsZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICE9PSB2aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Zpc2libGUgPSAhIXZpc2libGU7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZpc2liaWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZU1hdHJpeCAobm9kZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdmlkZW8gfHwgIXRoaXMuX3Zpc2libGUgfHwgdGhpcy5fZnVsbFNjcmVlbkVuYWJsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbm9kZS5nZXRXb3JsZE1hdHJpeChfbWF0NF90ZW1wKTtcclxuXHJcbiAgICAgICAgbGV0IHJlbmRlckNhbWVyYSA9IGNjLkNhbWVyYS5fZmluZFJlbmRlcmVyQ2FtZXJhKG5vZGUpO1xyXG4gICAgICAgIGlmIChyZW5kZXJDYW1lcmEpIHtcclxuICAgICAgICAgICAgcmVuZGVyQ2FtZXJhLndvcmxkTWF0cml4VG9TY3JlZW4oX21hdDRfdGVtcCwgX21hdDRfdGVtcCwgY2MuZ2FtZS5jYW52YXMud2lkdGgsIGNjLmdhbWUuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX21hdDRfdGVtcG0gPSBfbWF0NF90ZW1wLm07XHJcbiAgICAgICAgaWYgKCF0aGlzLl9mb3JjZVVwZGF0ZSAmJlxyXG4gICAgICAgICAgICB0aGlzLl9tMDAgPT09IF9tYXQ0X3RlbXBtWzBdICYmIHRoaXMuX20wMSA9PT0gX21hdDRfdGVtcG1bMV0gJiZcclxuICAgICAgICAgICAgdGhpcy5fbTA0ID09PSBfbWF0NF90ZW1wbVs0XSAmJiB0aGlzLl9tMDUgPT09IF9tYXQ0X3RlbXBtWzVdICYmXHJcbiAgICAgICAgICAgIHRoaXMuX20xMiA9PT0gX21hdDRfdGVtcG1bMTJdICYmIHRoaXMuX20xMyA9PT0gX21hdDRfdGVtcG1bMTNdICYmXHJcbiAgICAgICAgICAgIHRoaXMuX3cgPT09IG5vZGUuX2NvbnRlbnRTaXplLndpZHRoICYmIHRoaXMuX2ggPT09IG5vZGUuX2NvbnRlbnRTaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgbWF0cml4IGNhY2hlXHJcbiAgICAgICAgdGhpcy5fbTAwID0gX21hdDRfdGVtcG1bMF07XHJcbiAgICAgICAgdGhpcy5fbTAxID0gX21hdDRfdGVtcG1bMV07XHJcbiAgICAgICAgdGhpcy5fbTA0ID0gX21hdDRfdGVtcG1bNF07XHJcbiAgICAgICAgdGhpcy5fbTA1ID0gX21hdDRfdGVtcG1bNV07XHJcbiAgICAgICAgdGhpcy5fbTEyID0gX21hdDRfdGVtcG1bMTJdO1xyXG4gICAgICAgIHRoaXMuX20xMyA9IF9tYXQ0X3RlbXBtWzEzXTtcclxuICAgICAgICB0aGlzLl93ID0gbm9kZS5fY29udGVudFNpemUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5faCA9IG5vZGUuX2NvbnRlbnRTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgbGV0IGRwciA9IGNjLnZpZXcuX2RldmljZVBpeGVsUmF0aW87XHJcbiAgICAgICAgbGV0IHNjYWxlWCA9IDEgLyBkcHI7XHJcbiAgICAgICAgbGV0IHNjYWxlWSA9IDEgLyBkcHI7XHJcblxyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBjYy5nYW1lLmNvbnRhaW5lcjtcclxuICAgICAgICBsZXQgYSA9IF9tYXQ0X3RlbXBtWzBdICogc2NhbGVYLCBiID0gX21hdDRfdGVtcG1bMV0sIGMgPSBfbWF0NF90ZW1wbVs0XSwgZCA9IF9tYXQ0X3RlbXBtWzVdICogc2NhbGVZO1xyXG5cclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPyBwYXJzZUludChjb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQpIDogMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IGNvbnRhaW5lciAmJiBjb250YWluZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA/IHBhcnNlSW50KGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tKSA6IDA7XHJcbiAgICAgICAgbGV0IHcsIGg7XHJcbiAgICAgICAgaWYgKFZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwuem9vbUludmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSh0aGlzLl93ICogYSwgdGhpcy5faCAqIGQpO1xyXG4gICAgICAgICAgICBhID0gMTtcclxuICAgICAgICAgICAgZCA9IDE7XHJcbiAgICAgICAgICAgIHcgPSB0aGlzLl93ICogc2NhbGVYO1xyXG4gICAgICAgICAgICBoID0gdGhpcy5faCAqIHNjYWxlWTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHcgPSB0aGlzLl93ICogc2NhbGVYO1xyXG4gICAgICAgICAgICBoID0gdGhpcy5faCAqIHNjYWxlWTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2l6ZSh0aGlzLl93LCB0aGlzLl9oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcHB4ID0gKHcgKiBfbWF0NF90ZW1wbVswXSkgKiBub2RlLl9hbmNob3JQb2ludC54O1xyXG4gICAgICAgIGxldCBhcHB5ID0gKGggKiBfbWF0NF90ZW1wbVs1XSkgKiBub2RlLl9hbmNob3JQb2ludC55O1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHR4ID0gX21hdDRfdGVtcG1bMTJdICogc2NhbGVYIC0gYXBweCArIG9mZnNldFgsIHR5ID0gX21hdDRfdGVtcG1bMTNdICogc2NhbGVZIC0gYXBweSArIG9mZnNldFk7XHJcblxyXG4gICAgICAgIGxldCBtYXRyaXggPSBcIm1hdHJpeChcIiArIGEgKyBcIixcIiArIC1iICsgXCIsXCIgKyAtYyArIFwiLFwiICsgZCArIFwiLFwiICsgdHggKyBcIixcIiArIC10eSArIFwiKVwiO1xyXG4gICAgICAgIHRoaXMuX3ZpZGVvLnN0eWxlWyd0cmFuc2Zvcm0nXSA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsnLXdlYmtpdC10cmFuc2Zvcm0nXSA9IG1hdHJpeDtcclxuICAgICAgICB0aGlzLl92aWRlby5zdHlsZVsndHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XHJcbiAgICAgICAgdGhpcy5fdmlkZW8uc3R5bGVbJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbiddID0gJzBweCAxMDAlIDBweCc7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IG1vdmUgaW50byB3ZWIgYWRhcHRlclxyXG4gICAgICAgIC8vIHZpZGVvIHN0eWxlIHdvdWxkIGNoYW5nZSB3aGVuIGVudGVyIGZ1bGxzY3JlZW4gb24gSUVcclxuICAgICAgICAvLyB0aGVyZSBpcyBubyB3YXkgdG8gYWRkIGZ1bGxzY3JlZW5jaGFuZ2UgZXZlbnQgbGlzdGVuZXJzIG9uIElFIHNvIHRoYXQgd2UgY2FuIHJlc3RvcmUgdGhlIGNhY2hlZCB2aWRlbyBzdHlsZVxyXG4gICAgICAgIGlmIChzeXMuYnJvd3NlclR5cGUgIT09IHN5cy5CUk9XU0VSX1RZUEVfSUUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9yY2VVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVmlkZW9QbGF5ZXJJbXBsLkV2ZW50VHlwZSA9IHtcclxuICAgIE5PTkU6IC0xLFxyXG4gICAgUExBWUlORzogMCxcclxuICAgIFBBVVNFRDogMSxcclxuICAgIFNUT1BQRUQ6IDIsXHJcbiAgICBDT01QTEVURUQ6IDMsXHJcbiAgICBNRVRBX0xPQURFRDogNCxcclxuICAgIENMSUNLRUQ6IDUsXHJcbiAgICBSRUFEWV9UT19QTEFZOiA2XHJcbn07XHJcblxyXG4vLyB2aWRlbyDpmJ/liJfvvIzmiYDmnIkgdmlkb2Ug5ZyoIG9uRW50ZXIg55qE5pe25YCZ6YO95Lya5o+S5YWl6L+Z5Liq6Zif5YiXXHJcblZpZGVvUGxheWVySW1wbC5lbGVtZW50cyA9IFtdO1xyXG4vLyB2aWRlbyDlnKggZ2FtZV9oaWRlIOS6i+S7tuS4reiiq+iHquWKqOaaguWBnOeahOmYn+WIl++8jOeUqOS6juWbnuWkjeeahOaXtuWAmemHjeaWsOW8gOWni+aSreaUvlxyXG5WaWRlb1BsYXllckltcGwucGF1c2VFbGVtZW50cyA9IFtdO1xyXG5cclxuY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBsaXN0ID0gVmlkZW9QbGF5ZXJJbXBsLmVsZW1lbnRzO1xyXG4gICAgZm9yIChsZXQgZWxlbWVudCwgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZWxlbWVudCA9IGxpc3RbaV07XHJcbiAgICAgICAgaWYgKGVsZW1lbnQuaXNQbGF5aW5nKCkpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICAgICAgICBWaWRlb1BsYXllckltcGwucGF1c2VFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5jYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGxpc3QgPSBWaWRlb1BsYXllckltcGwucGF1c2VFbGVtZW50cztcclxuICAgIGxldCBlbGVtZW50ID0gbGlzdC5wb3AoKTtcclxuICAgIHdoaWxlIChlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgZWxlbWVudCA9IGxpc3QucG9wKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBZGFwdGVyIHZhcmlvdXMgbWFjaGluZXNcclxuICogQGRldmljZVBpeGVsUmF0aW8gV2hldGhlciB5b3UgbmVlZCB0byBjb25zaWRlciBkZXZpY2VQaXhlbFJhdGlvIGNhbGN1bGF0ZWQgcG9zaXRpb25cclxuICogQGV2ZW50IFRvIGdldCB0aGUgZGF0YSB1c2luZyBldmVudHNcclxuICovXHJcblZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwgPSB7XHJcbiAgICBkZXZpY2VQaXhlbFJhdGlvOiBmYWxzZSxcclxuICAgIGV2ZW50OiBcImNhbnBsYXlcIixcclxuICAgIGNhblBsYXlUeXBlOiBbXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNvbWUgb2xkIGJyb3dzZXIgb25seSBzdXBwb3J0cyBUaGVvcmEgZW5jb2RlIHZpZGVvXHJcbiAqIEJ1dCBuYXRpdmUgZG9lcyBub3Qgc3VwcG9ydCB0aGlzIGVuY29kZSxcclxuICogc28gaXQgaXMgYmVzdCB0byBwcm92aWRlIG1wNCBhbmQgd2VibSBvciBvZ3YgZmlsZVxyXG4gKi9cclxuXHJcbi8vIFRPRE86IGFkYXB0IHd4IHZpZGVvIHBsYXllclxyXG4vLyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvMmQtdGFza3MvaXNzdWVzLzEzNjRcclxubGV0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ2aWRlb1wiKTtcclxuaWYgKGRvbS5jYW5QbGF5VHlwZSkge1xyXG4gICAgaWYgKGRvbS5jYW5QbGF5VHlwZShcInZpZGVvL29nZ1wiKSkge1xyXG4gICAgICAgIFZpZGVvUGxheWVySW1wbC5fcG9seWZpbGwuY2FuUGxheVR5cGUucHVzaChcIi5vZ2dcIik7XHJcbiAgICAgICAgVmlkZW9QbGF5ZXJJbXBsLl9wb2x5ZmlsbC5jYW5QbGF5VHlwZS5wdXNoKFwiLm9ndlwiKTtcclxuICAgIH1cclxuICAgIGlmIChkb20uY2FuUGxheVR5cGUoXCJ2aWRlby9tcDRcIikpIHtcclxuICAgICAgICBWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmNhblBsYXlUeXBlLnB1c2goXCIubXA0XCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvbS5jYW5QbGF5VHlwZShcInZpZGVvL3dlYm1cIikpIHtcclxuICAgICAgICBWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLmNhblBsYXlUeXBlLnB1c2goXCIud2VibVwiKTtcclxuICAgIH1cclxufVxyXG5cclxuaWYgKFxyXG4gICAgc3lzLk9TX0FORFJPSUQgPT09IHN5cy5vcyAmJiAoXHJcbiAgICBzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfU09VR09VIHx8XHJcbiAgICBzeXMuYnJvd3NlclR5cGUgPT09IHN5cy5CUk9XU0VSX1RZUEVfMzYwXHJcbilcclxuKSB7XHJcbiAgICBWaWRlb1BsYXllckltcGwuX3BvbHlmaWxsLnpvb21JbnZhbGlkID0gdHJ1ZTtcclxufVxyXG5cclxubGV0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5zdHlsZS5pbm5lckhUTUwgPSBcIi5jb2Nvc1ZpZGVvOi1tb3otZnVsbC1zY3JlZW57dHJhbnNmb3JtOm1hdHJpeCgxLDAsMCwxLDAsMCkgIWltcG9ydGFudDt9XCIgK1xyXG4gICAgXCIuY29jb3NWaWRlbzpmdWxsLXNjcmVlbnt0cmFuc2Zvcm06bWF0cml4KDEsMCwwLDEsMCwwKSAhaW1wb3J0YW50O31cIiArXHJcbiAgICBcIi5jb2Nvc1ZpZGVvOi13ZWJraXQtZnVsbC1zY3JlZW57dHJhbnNmb3JtOm1hdHJpeCgxLDAsMCwxLDAsMCkgIWltcG9ydGFudDt9XCI7XHJcbmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWaWRlb1BsYXllckltcGw7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9