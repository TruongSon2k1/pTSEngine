
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/audio/CCAudio.js';
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
var EventTarget = require('../core/event/event-target');

var sys = require('../core/platform/CCSys');

var LoadMode = require('../core/assets/CCAudioClip').LoadMode;

var touchBinded = false;
var touchPlayList = [//{ instance: Audio, offset: 0, audio: audio }
];

var Audio = function Audio(src) {
  EventTarget.call(this);
  this._shouldRecycleOnEnded = false;
  this._src = src;
  this._element = null;
  this.id = 0;
  this._state = Audio.State.INITIALZING;
  var self = this;

  this._onended = function () {
    self._state = Audio.State.STOPPED;
    self.emit('ended');
  };

  this._onendedSecond = function () {
    self._unbindEnded(self._onendedSecond);

    self._bindEnded();
  };
};

cc.js.extend(Audio, EventTarget);
/**
 * !#en Audio state.
 * !#zh 声音播放状态
 * @enum audioEngine.AudioState
 * @memberof cc
 */
// TODO - At present, the state is mixed with two states of users and systems, and it is best to split into two types. A "loading" should also be added to the system state.

Audio.State = {
  /**
   * @property {Number} ERROR
   */
  ERROR: -1,

  /**
   * @property {Number} INITIALZING
   */
  INITIALZING: 0,

  /**
   * @property {Number} PLAYING
   */
  PLAYING: 1,

  /**
   * @property {Number} PAUSED
   */
  PAUSED: 2,

  /**
   * @property {Number} STOPPED
   */
  STOPPED: 3
};

(function (proto) {
  proto._bindEnded = function (callback) {
    callback = callback || this._onended;

    if (callback._binded) {
      return;
    }

    callback._binded = true;
    var elem = this._element;

    if (this._src && elem instanceof HTMLAudioElement) {
      elem.addEventListener('ended', callback);
    } else {
      elem.onended = callback;
    }
  };

  proto._unbindEnded = function (callback) {
    callback = callback || this._onended;

    if (!callback._binded) {
      return;
    }

    callback._binded = false;
    var elem = this._element;

    if (elem instanceof HTMLAudioElement) {
      elem.removeEventListener('ended', callback);
    } else if (elem) {
      elem.onended = null;
    }
  };

  proto._onLoaded = function () {
    this._createElement();

    this._state = Audio.State.INITIALZING;
    this.setVolume(1);
    this.setLoop(false);
  };

  proto._createElement = function () {
    var elem = this._src._nativeAsset;

    if (elem instanceof HTMLAudioElement) {
      // Reuse dom audio element
      if (!this._element) {
        this._element = document.createElement('audio');
      }

      this._element.src = elem.src;
    } else {
      this._element = new WebAudioElement(elem, this);
    }
  };

  proto.play = function () {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // marked as playing so it will playOnLoad
      self._state = Audio.State.PLAYING; // TODO: move to audio event listeners

      self._bindEnded();

      var playPromise = self._element.play(); // dom audio throws an error if pause audio immediately after playing


      if (window.Promise && playPromise instanceof Promise) {
        playPromise["catch"](function (err) {// do nothing
        });
      }

      self._touchToPlay();
    });
  };

  proto._touchToPlay = function () {
    if (this._src && this._src.loadMode === LoadMode.DOM_AUDIO && this._element.paused) {
      touchPlayList.push({
        instance: this,
        offset: 0,
        audio: this._element
      });
    }

    if (touchBinded) return;
    touchBinded = true;
    var touchEventName = 'ontouchend' in window ? 'touchend' : 'mousedown'; // Listen to the touchstart body event and play the audio when necessary.

    cc.game.canvas.addEventListener(touchEventName, function () {
      var item;

      while (item = touchPlayList.pop()) {
        item.audio.play(item.offset);
      }
    });
  };

  proto.destroy = function () {
    this._element = null;
  };

  proto.pause = function () {
    if (this.getState() !== Audio.State.PLAYING) {
      return;
    }

    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // pause operation may fire 'ended' event
      self._unbindEnded();

      self._element.pause();

      self._state = Audio.State.PAUSED;
    });
  };

  proto.resume = function () {
    if (this.getState() !== Audio.State.PAUSED) {
      return;
    }

    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._bindEnded();

      self._element.play();

      self._state = Audio.State.PLAYING;
    });
  };

  proto.stop = function () {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.pause();

      self._element.currentTime = 0; // remove touchPlayList

      for (var i = 0; i < touchPlayList.length; i++) {
        if (touchPlayList[i].instance === self) {
          touchPlayList.splice(i, 1);
          break;
        }
      }

      self._unbindEnded();

      self.emit('stop');
      self._state = Audio.State.STOPPED;
    });
  };

  proto.setLoop = function (loop) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.loop = loop;
    });
  };

  proto.getLoop = function () {
    return this._element ? this._element.loop : false;
  };

  proto.setVolume = function (num) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      self._element.volume = num;
    });
  };

  proto.getVolume = function () {
    return this._element ? this._element.volume : 1;
  };

  proto.setCurrentTime = function (num) {
    var self = this;
    this._src && this._src._ensureLoaded(function () {
      // setCurrentTime would fire 'ended' event
      // so we need to change the callback to rebind ended callback after setCurrentTime
      self._unbindEnded();

      self._bindEnded(self._onendedSecond);

      self._element.currentTime = num;
    });
  };

  proto.getCurrentTime = function () {
    return this._element ? this._element.currentTime : 0;
  };

  proto.getDuration = function () {
    return this._src ? this._src.duration : 0;
  };

  proto.getState = function (forceUpdating) {
    if (forceUpdating === void 0) {
      forceUpdating = true;
    }

    // HACK: in some browser, audio may not fire 'ended' event
    // so we need to force updating the Audio state
    if (forceUpdating) {
      this._forceUpdatingState();
    }

    return this._state;
  };

  proto._forceUpdatingState = function () {
    var elem = this._element;

    if (elem) {
      if (Audio.State.PLAYING === this._state && elem.paused) {
        this._state = Audio.State.STOPPED;
      } else if (Audio.State.STOPPED === this._state && !elem.paused) {
        this._state = Audio.State.PLAYING;
      }
    }
  };

  Object.defineProperty(proto, 'src', {
    get: function get() {
      return this._src;
    },
    set: function set(clip) {
      this._unbindEnded();

      if (clip) {
        if (clip !== this._src) {
          this._src = clip;

          if (!clip.loaded) {
            var self = this; // need to call clip._ensureLoaded mannually to start loading

            clip.once('load', function () {
              // In case set a new src when the old one hasn't finished loading
              if (clip === self._src) {
                self._onLoaded();
              }
            });
          } else {
            this._onLoaded();
          }
        }
      } else {
        this._src = null;

        if (this._element instanceof WebAudioElement) {
          this._element = null;
        } else if (this._element) {
          this._element.src = '';
        }

        this._state = Audio.State.INITIALZING;
      }

      return clip;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'paused', {
    get: function get() {
      return this._element ? this._element.paused : true;
    },
    enumerable: true,
    configurable: true
  }); // setFinishCallback
})(Audio.prototype); // TIME_CONSTANT is used as an argument of setTargetAtTime interface
// TIME_CONSTANT need to be a positive number on Edge and Baidu browser
// TIME_CONSTANT need to be 0 by default, or may fail to set volume at the very beginning of playing audio


var TIME_CONSTANT;

if (cc.sys.browserType === cc.sys.BROWSER_TYPE_EDGE || cc.sys.browserType === cc.sys.BROWSER_TYPE_BAIDU || cc.sys.browserType === cc.sys.BROWSER_TYPE_UC) {
  TIME_CONSTANT = 0.01;
} else {
  TIME_CONSTANT = 0;
} // Encapsulated WebAudio interface


var WebAudioElement = function WebAudioElement(buffer, audio) {
  this._audio = audio;
  this._context = sys.__audioSupport.context;
  this._buffer = buffer;
  this._gainObj = this._context['createGain']();
  this.volume = 1;

  this._gainObj['connect'](this._context['destination']);

  this._loop = false; // The time stamp on the audio time axis when the recording begins to play.

  this._startTime = -1; // Record the currently playing 'Source'

  this._currentSource = null; // Record the time has been played

  this.playedLength = 0;
  this._currentTimer = null;

  this._endCallback = function () {
    if (this.onended) {
      this.onended(this);
    }
  }.bind(this);
};

(function (proto) {
  proto.play = function (offset) {
    // If repeat play, you need to stop before an audio
    if (this._currentSource && !this.paused) {
      this._currentSource.onended = null;

      this._currentSource.stop(0);

      this.playedLength = 0;
    }

    var audio = this._context["createBufferSource"]();

    audio.buffer = this._buffer;
    audio["connect"](this._gainObj);
    audio.loop = this._loop;
    this._startTime = this._context.currentTime;
    offset = offset || this.playedLength;

    if (offset) {
      this._startTime -= offset;
    }

    var duration = this._buffer.duration;
    var startTime = offset;
    var endTime;

    if (this._loop) {
      if (audio.start) audio.start(0, startTime);else if (audio["notoGrainOn"]) audio["noteGrainOn"](0, startTime);else audio["noteOn"](0, startTime);
    } else {
      endTime = duration - offset;
      if (audio.start) audio.start(0, startTime, endTime);else if (audio["noteGrainOn"]) audio["noteGrainOn"](0, startTime, endTime);else audio["noteOn"](0, startTime, endTime);
    }

    this._currentSource = audio;
    audio.onended = this._endCallback; // If the current audio context time stamp is 0 and audio context state is suspended
    // There may be a need to touch events before you can actually start playing audio

    if ((!audio.context.state || audio.context.state === "suspended") && this._context.currentTime === 0) {
      var self = this;
      clearTimeout(this._currentTimer);
      this._currentTimer = setTimeout(function () {
        if (self._context.currentTime === 0) {
          touchPlayList.push({
            instance: self._audio,
            offset: offset,
            audio: self
          });
        }
      }, 10);
    }

    var sys = cc.sys;

    if (sys.os === sys.OS_IOS && sys.isBrowser && sys.isMobile) {
      // Audio context is suspended when you unplug the earphones,
      // and is interrupted when the app enters background.
      // Both make the audioBufferSource unplayable.
      if (audio.context.state === "suspended" && this._context.currentTime !== 0 || audio.context.state === 'interrupted') {
        // reference: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume
        audio.context.resume();
      }
    }
  };

  proto.pause = function () {
    clearTimeout(this._currentTimer);
    if (this.paused) return; // Record the time the current has been played

    this.playedLength = this._context.currentTime - this._startTime; // If more than the duration of the audio, Need to take the remainder

    this.playedLength %= this._buffer.duration;
    var audio = this._currentSource;

    if (audio) {
      if (audio.onended) {
        audio.onended._binded = false;
        audio.onended = null;
      }

      audio.stop(0);
    }

    this._currentSource = null;
    this._startTime = -1;
  };

  Object.defineProperty(proto, 'paused', {
    get: function get() {
      // If the current audio is a loop, paused is false
      if (this._currentSource && this._currentSource.loop) return false; // startTime default is -1

      if (this._startTime === -1) return true; // Current time -  Start playing time > Audio duration

      return this._context.currentTime - this._startTime > this._buffer.duration;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'loop', {
    get: function get() {
      return this._loop;
    },
    set: function set(bool) {
      if (this._currentSource) this._currentSource.loop = bool;
      return this._loop = bool;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'volume', {
    get: function get() {
      return this._volume;
    },
    set: function set(num) {
      this._volume = num; // https://www.chromestatus.com/features/5287995770929152

      if (this._gainObj.gain.setTargetAtTime) {
        try {
          this._gainObj.gain.setTargetAtTime(num, this._context.currentTime, TIME_CONSTANT);
        } catch (e) {
          // Some other unknown browsers may crash if TIME_CONSTANT is 0
          this._gainObj.gain.setTargetAtTime(num, this._context.currentTime, 0.01);
        }
      } else {
        this._gainObj.gain.value = num;
      }

      if (sys.os === sys.OS_IOS && !this.paused && this._currentSource) {
        // IOS must be stop webAudio
        this._currentSource.onended = null;
        this.pause();
        this.play();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'currentTime', {
    get: function get() {
      if (this.paused) {
        return this.playedLength;
      } // Record the time the current has been played


      this.playedLength = this._context.currentTime - this._startTime; // If more than the duration of the audio, Need to take the remainder

      this.playedLength %= this._buffer.duration;
      return this.playedLength;
    },
    set: function set(num) {
      if (!this.paused) {
        this.pause();
        this.playedLength = num;
        this.play();
      } else {
        this.playedLength = num;
      }

      return num;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'duration', {
    get: function get() {
      return this._buffer.duration;
    },
    enumerable: true,
    configurable: true
  });
})(WebAudioElement.prototype);

module.exports = cc._Audio = Audio;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGF1ZGlvXFxDQ0F1ZGlvLmpzIl0sIm5hbWVzIjpbIkV2ZW50VGFyZ2V0IiwicmVxdWlyZSIsInN5cyIsIkxvYWRNb2RlIiwidG91Y2hCaW5kZWQiLCJ0b3VjaFBsYXlMaXN0IiwiQXVkaW8iLCJzcmMiLCJjYWxsIiwiX3Nob3VsZFJlY3ljbGVPbkVuZGVkIiwiX3NyYyIsIl9lbGVtZW50IiwiaWQiLCJfc3RhdGUiLCJTdGF0ZSIsIklOSVRJQUxaSU5HIiwic2VsZiIsIl9vbmVuZGVkIiwiU1RPUFBFRCIsImVtaXQiLCJfb25lbmRlZFNlY29uZCIsIl91bmJpbmRFbmRlZCIsIl9iaW5kRW5kZWQiLCJjYyIsImpzIiwiZXh0ZW5kIiwiRVJST1IiLCJQTEFZSU5HIiwiUEFVU0VEIiwicHJvdG8iLCJjYWxsYmFjayIsIl9iaW5kZWQiLCJlbGVtIiwiSFRNTEF1ZGlvRWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmVuZGVkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9vbkxvYWRlZCIsIl9jcmVhdGVFbGVtZW50Iiwic2V0Vm9sdW1lIiwic2V0TG9vcCIsIl9uYXRpdmVBc3NldCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIldlYkF1ZGlvRWxlbWVudCIsInBsYXkiLCJfZW5zdXJlTG9hZGVkIiwicGxheVByb21pc2UiLCJ3aW5kb3ciLCJQcm9taXNlIiwiZXJyIiwiX3RvdWNoVG9QbGF5IiwibG9hZE1vZGUiLCJET01fQVVESU8iLCJwYXVzZWQiLCJwdXNoIiwiaW5zdGFuY2UiLCJvZmZzZXQiLCJhdWRpbyIsInRvdWNoRXZlbnROYW1lIiwiZ2FtZSIsImNhbnZhcyIsIml0ZW0iLCJwb3AiLCJkZXN0cm95IiwicGF1c2UiLCJnZXRTdGF0ZSIsInJlc3VtZSIsInN0b3AiLCJjdXJyZW50VGltZSIsImkiLCJsZW5ndGgiLCJzcGxpY2UiLCJsb29wIiwiZ2V0TG9vcCIsIm51bSIsInZvbHVtZSIsImdldFZvbHVtZSIsInNldEN1cnJlbnRUaW1lIiwiZ2V0Q3VycmVudFRpbWUiLCJnZXREdXJhdGlvbiIsImR1cmF0aW9uIiwiZm9yY2VVcGRhdGluZyIsIl9mb3JjZVVwZGF0aW5nU3RhdGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldCIsImNsaXAiLCJsb2FkZWQiLCJvbmNlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInByb3RvdHlwZSIsIlRJTUVfQ09OU1RBTlQiLCJicm93c2VyVHlwZSIsIkJST1dTRVJfVFlQRV9FREdFIiwiQlJPV1NFUl9UWVBFX0JBSURVIiwiQlJPV1NFUl9UWVBFX1VDIiwiYnVmZmVyIiwiX2F1ZGlvIiwiX2NvbnRleHQiLCJfX2F1ZGlvU3VwcG9ydCIsImNvbnRleHQiLCJfYnVmZmVyIiwiX2dhaW5PYmoiLCJfbG9vcCIsIl9zdGFydFRpbWUiLCJfY3VycmVudFNvdXJjZSIsInBsYXllZExlbmd0aCIsIl9jdXJyZW50VGltZXIiLCJfZW5kQ2FsbGJhY2siLCJiaW5kIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInN0YXJ0Iiwic3RhdGUiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwib3MiLCJPU19JT1MiLCJpc0Jyb3dzZXIiLCJpc01vYmlsZSIsImJvb2wiLCJfdm9sdW1lIiwiZ2FpbiIsInNldFRhcmdldEF0VGltZSIsImUiLCJ2YWx1ZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJfQXVkaW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsNEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsd0JBQUQsQ0FBbkI7O0FBQ0EsSUFBTUUs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V0FBS0EsWUFBTCxHQUFvQixLQUFLUixRQUFMLENBQWNoQyxXQUFkLEdBQTRCLEtBQUtzQyxVQUFyRCxDQUxhLENBTWI7O0FBQ0EsV0FBS0UsWUFBTCxJQUFxQixLQUFLTCxPQUFMLENBQWF2QixRQUFsQztBQUNBLGFBQU8sS0FBSzRCLFlBQVo7QUFDSCxLQVZ1QztBQVd4Q3RCLElBQUFBLEdBQUcsRUFBRSxhQUFVWixHQUFWLEVBQWU7QUFDaEIsVUFBSSxDQUFDLEtBQUtyQixNQUFWLEVBQWtCO0FBQ2QsYUFBS1csS0FBTDtBQUNBLGFBQUs0QyxZQUFMLEdBQW9CbEMsR0FBcEI7QUFDQSxhQUFLOUIsSUFBTDtBQUNILE9BSkQsTUFJTztBQUNILGFBQUtnRSxZQUFMLEdBQW9CbEMsR0FBcEI7QUFDSDs7QUFDRCxhQUFPQSxHQUFQO0FBQ0gsS0FwQnVDO0FBcUJ4Q2dCLElBQUFBLFVBQVUsRUFBRSxJQXJCNEI7QUFzQnhDQyxJQUFBQSxZQUFZLEVBQUU7QUF0QjBCLEdBQTVDO0FBeUJBUixFQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0J4RCxLQUF0QixFQUE2QixVQUE3QixFQUF5QztBQUNyQ3lELElBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsYUFBTyxLQUFLa0IsT0FBTCxDQUFhdkIsUUFBcEI7QUFDSCxLQUhvQztBQUlyQ1UsSUFBQUEsVUFBVSxFQUFFLElBSnlCO0FBS3JDQyxJQUFBQSxZQUFZLEVBQUU7QUFMdUIsR0FBekM7QUFRSCxDQTVMRCxFQTRMR2hELGVBQWUsQ0FBQ2lELFNBNUxuQjs7QUE4TEFvQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzRyxFQUFFLENBQUM0RyxNQUFILEdBQVk3SCxLQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuLi9jb3JlL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xyXG5jb25zdCBzeXMgPSByZXF1aXJlKCcuLi9jb3JlL3BsYXRmb3JtL0NDU3lzJyk7XHJcbmNvbnN0IExvYWRNb2RlID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvQ0NBdWRpb0NsaXAnKS5Mb2FkTW9kZTtcclxuXHJcbmxldCB0b3VjaEJpbmRlZCA9IGZhbHNlO1xyXG5sZXQgdG91Y2hQbGF5TGlzdCA9IFtcclxuICAgIC8veyBpbnN0YW5jZTogQXVkaW8sIG9mZnNldDogMCwgYXVkaW86IGF1ZGlvIH1cclxuXTtcclxuXHJcbmxldCBBdWRpbyA9IGZ1bmN0aW9uIChzcmMpIHtcclxuICAgIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLl9zaG91bGRSZWN5Y2xlT25FbmRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fc3JjID0gc3JjO1xyXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmlkID0gMDtcclxuICAgIHRoaXMuX3N0YXRlID0gQXVkaW8uU3RhdGUuSU5JVElBTFpJTkc7XHJcblxyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLl9vbmVuZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX3N0YXRlID0gQXVkaW8uU3RhdGUuU1RPUFBFRDtcclxuICAgICAgICBzZWxmLmVtaXQoJ2VuZGVkJyk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fb25lbmRlZFNlY29uZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl91bmJpbmRFbmRlZChzZWxmLl9vbmVuZGVkU2Vjb25kKTtcclxuICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5jYy5qcy5leHRlbmQoQXVkaW8sIEV2ZW50VGFyZ2V0KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEF1ZGlvIHN0YXRlLlxyXG4gKiAhI3poIOWjsOmfs+aSreaUvueKtuaAgVxyXG4gKiBAZW51bSBhdWRpb0VuZ2luZS5BdWRpb1N0YXRlXHJcbiAqIEBtZW1iZXJvZiBjY1xyXG4gKi9cclxuLy8gVE9ETyAtIEF0IHByZXNlbnQsIHRoZSBzdGF0ZSBpcyBtaXhlZCB3aXRoIHR3byBzdGF0ZXMgb2YgdXNlcnMgYW5kIHN5c3RlbXMsIGFuZCBpdCBpcyBiZXN0IHRvIHNwbGl0IGludG8gdHdvIHR5cGVzLiBBIFwibG9hZGluZ1wiIHNob3VsZCBhbHNvIGJlIGFkZGVkIHRvIHRoZSBzeXN0ZW0gc3RhdGUuXHJcbkF1ZGlvLlN0YXRlID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRVJST1JcclxuICAgICAqL1xyXG4gICAgRVJST1I6IC0xLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSU5JVElBTFpJTkdcclxuICAgICAqL1xyXG4gICAgSU5JVElBTFpJTkc6IDAsXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQTEFZSU5HXHJcbiAgICAgKi9cclxuICAgIFBMQVlJTkc6IDEsXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQQVVTRURcclxuICAgICAqL1xyXG4gICAgUEFVU0VEOiAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1RPUFBFRFxyXG4gICAgICovXHJcbiAgICBTVE9QUEVEOiAzLFxyXG59O1xyXG5cclxuKGZ1bmN0aW9uIChwcm90bykge1xyXG5cclxuICAgIHByb3RvLl9iaW5kRW5kZWQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IHRoaXMuX29uZW5kZWQ7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrLl9iaW5kZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjay5fYmluZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50O1xyXG4gICAgICAgIGlmICh0aGlzLl9zcmMgJiYgKGVsZW0gaW5zdGFuY2VvZiBIVE1MQXVkaW9FbGVtZW50KSkge1xyXG4gICAgICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgY2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW0ub25lbmRlZCA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uX3VuYmluZEVuZGVkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCB0aGlzLl9vbmVuZGVkO1xyXG4gICAgICAgIGlmICghY2FsbGJhY2suX2JpbmRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxiYWNrLl9iaW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50O1xyXG4gICAgICAgIGlmIChlbGVtIGluc3RhbmNlb2YgSFRNTEF1ZGlvRWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgY2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbSkge1xyXG4gICAgICAgICAgICBlbGVtLm9uZW5kZWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uX29uTG9hZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2NyZWF0ZUVsZW1lbnQoKTtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLklOSVRJQUxaSU5HO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKDEpO1xyXG4gICAgICAgIHRoaXMuc2V0TG9vcChmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLl9jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBlbGVtID0gdGhpcy5fc3JjLl9uYXRpdmVBc3NldDtcclxuICAgICAgICBpZiAoZWxlbSBpbnN0YW5jZW9mIEhUTUxBdWRpb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgLy8gUmV1c2UgZG9tIGF1ZGlvIGVsZW1lbnRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNyYyA9IGVsZW0uc3JjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IG5ldyBXZWJBdWRpb0VsZW1lbnQoZWxlbSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5wbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBtYXJrZWQgYXMgcGxheWluZyBzbyBpdCB3aWxsIHBsYXlPbkxvYWRcclxuICAgICAgICAgICAgc2VsZi5fc3RhdGUgPSBBdWRpby5TdGF0ZS5QTEFZSU5HO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBtb3ZlIHRvIGF1ZGlvIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcclxuICAgICAgICAgICAgbGV0IHBsYXlQcm9taXNlID0gc2VsZi5fZWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgICAgIC8vIGRvbSBhdWRpbyB0aHJvd3MgYW4gZXJyb3IgaWYgcGF1c2UgYXVkaW8gaW1tZWRpYXRlbHkgYWZ0ZXIgcGxheWluZ1xyXG4gICAgICAgICAgICBpZiAod2luZG93LlByb21pc2UgJiYgcGxheVByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5UHJvbWlzZS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5fdG91Y2hUb1BsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uX3RvdWNoVG9QbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLmxvYWRNb2RlID09PSBMb2FkTW9kZS5ET01fQVVESU8gJiZcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5wYXVzZWQpIHtcclxuICAgICAgICAgICAgdG91Y2hQbGF5TGlzdC5wdXNoKHsgaW5zdGFuY2U6IHRoaXMsIG9mZnNldDogMCwgYXVkaW86IHRoaXMuX2VsZW1lbnQgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG91Y2hCaW5kZWQpIHJldHVybjtcclxuICAgICAgICB0b3VjaEJpbmRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIGxldCB0b3VjaEV2ZW50TmFtZSA9ICgnb250b3VjaGVuZCcgaW4gd2luZG93KSA/ICd0b3VjaGVuZCcgOiAnbW91c2Vkb3duJztcclxuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIHRvdWNoc3RhcnQgYm9keSBldmVudCBhbmQgcGxheSB0aGUgYXVkaW8gd2hlbiBuZWNlc3NhcnkuXHJcbiAgICAgICAgY2MuZ2FtZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50TmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbTtcclxuICAgICAgICAgICAgd2hpbGUgKGl0ZW0gPSB0b3VjaFBsYXlMaXN0LnBvcCgpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmF1ZGlvLnBsYXkoaXRlbS5vZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09IEF1ZGlvLlN0YXRlLlBMQVlJTkcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gcGF1c2Ugb3BlcmF0aW9uIG1heSBmaXJlICdlbmRlZCcgZXZlbnRcclxuICAgICAgICAgICAgc2VsZi5fdW5iaW5kRW5kZWQoKTtcclxuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlBBVVNFRDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8ucmVzdW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0YXRlKCkgIT09IEF1ZGlvLlN0YXRlLlBBVVNFRCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoKTtcclxuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gQXVkaW8uU3RhdGUuUExBWUlORztcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fc3JjICYmIHRoaXMuX3NyYy5fZW5zdXJlTG9hZGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5fZWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRvdWNoUGxheUxpc3RcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3VjaFBsYXlMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG91Y2hQbGF5TGlzdFtpXS5pbnN0YW5jZSA9PT0gc2VsZikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoUGxheUxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuX3VuYmluZEVuZGVkKCk7XHJcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnc3RvcCcpO1xyXG4gICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IEF1ZGlvLlN0YXRlLlNUT1BQRUQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnNldExvb3AgPSBmdW5jdGlvbiAobG9vcCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50Lmxvb3AgPSBsb29wO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHByb3RvLmdldExvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50Lmxvb3AgOiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG8uc2V0Vm9sdW1lID0gZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLl9lbGVtZW50LnZvbHVtZSA9IG51bTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBwcm90by5nZXRWb2x1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQgPyB0aGlzLl9lbGVtZW50LnZvbHVtZSA6IDE7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zcmMgJiYgdGhpcy5fc3JjLl9lbnN1cmVMb2FkZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBzZXRDdXJyZW50VGltZSB3b3VsZCBmaXJlICdlbmRlZCcgZXZlbnRcclxuICAgICAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGNhbGxiYWNrIHRvIHJlYmluZCBlbmRlZCBjYWxsYmFjayBhZnRlciBzZXRDdXJyZW50VGltZVxyXG4gICAgICAgICAgICBzZWxmLl91bmJpbmRFbmRlZCgpO1xyXG4gICAgICAgICAgICBzZWxmLl9iaW5kRW5kZWQoc2VsZi5fb25lbmRlZFNlY29uZCk7XHJcbiAgICAgICAgICAgIHNlbGYuX2VsZW1lbnQuY3VycmVudFRpbWUgPSBudW07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50ID8gdGhpcy5fZWxlbWVudC5jdXJyZW50VGltZSA6IDA7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLmdldER1cmF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcmMgPyB0aGlzLl9zcmMuZHVyYXRpb24gOiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChmb3JjZVVwZGF0aW5nID0gdHJ1ZSkge1xyXG4gICAgICAgIC8vIEhBQ0s6IGluIHNvbWUgYnJvd3NlciwgYXVkaW8gbWF5IG5vdCBmaXJlICdlbmRlZCcgZXZlbnRcclxuICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIGZvcmNlIHVwZGF0aW5nIHRoZSBBdWRpbyBzdGF0ZVxyXG4gICAgICAgIGlmIChmb3JjZVVwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRpbmdTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvLl9mb3JjZVVwZGF0aW5nU3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGVsZW0gPSB0aGlzLl9lbGVtZW50O1xyXG4gICAgICAgIGlmIChlbGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChBdWRpby5TdGF0ZS5QTEFZSU5HID09PSB0aGlzLl9zdGF0ZSAmJiBlbGVtLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5TVE9QUEVEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKEF1ZGlvLlN0YXRlLlNUT1BQRUQgPT09IHRoaXMuX3N0YXRlICYmICFlbGVtLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5QTEFZSU5HO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdzcmMnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChjbGlwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VuYmluZEVuZGVkKCk7XHJcbiAgICAgICAgICAgIGlmIChjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpcCAhPT0gdGhpcy5fc3JjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3JjID0gY2xpcDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNsaXAubG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVlZCB0byBjYWxsIGNsaXAuX2Vuc3VyZUxvYWRlZCBtYW5udWFsbHkgdG8gc3RhcnQgbG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGlwLm9uY2UoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIHNldCBhIG5ldyBzcmMgd2hlbiB0aGUgb2xkIG9uZSBoYXNuJ3QgZmluaXNoZWQgbG9hZGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXAgPT09IHNlbGYuX3NyYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX29uTG9hZGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Mb2FkZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VsZW1lbnQgaW5zdGFuY2VvZiBXZWJBdWRpb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2VsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50LnNyYyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBdWRpby5TdGF0ZS5JTklUSUFMWklORztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2xpcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50ID8gdGhpcy5fZWxlbWVudC5wYXVzZWQgOiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHNldEZpbmlzaENhbGxiYWNrXHJcblxyXG59KShBdWRpby5wcm90b3R5cGUpO1xyXG5cclxuXHJcbi8vIFRJTUVfQ09OU1RBTlQgaXMgdXNlZCBhcyBhbiBhcmd1bWVudCBvZiBzZXRUYXJnZXRBdFRpbWUgaW50ZXJmYWNlXHJcbi8vIFRJTUVfQ09OU1RBTlQgbmVlZCB0byBiZSBhIHBvc2l0aXZlIG51bWJlciBvbiBFZGdlIGFuZCBCYWlkdSBicm93c2VyXHJcbi8vIFRJTUVfQ09OU1RBTlQgbmVlZCB0byBiZSAwIGJ5IGRlZmF1bHQsIG9yIG1heSBmYWlsIHRvIHNldCB2b2x1bWUgYXQgdGhlIHZlcnkgYmVnaW5uaW5nIG9mIHBsYXlpbmcgYXVkaW9cclxubGV0IFRJTUVfQ09OU1RBTlQ7XHJcbmlmIChjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfRURHRSB8fFxyXG4gICAgY2Muc3lzLmJyb3dzZXJUeXBlID09PSBjYy5zeXMuQlJPV1NFUl9UWVBFX0JBSURVIHx8XHJcbiAgICBjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfVUMpIHtcclxuICAgIFRJTUVfQ09OU1RBTlQgPSAwLjAxO1xyXG59XHJcbmVsc2Uge1xyXG4gICAgVElNRV9DT05TVEFOVCA9IDA7XHJcbn1cclxuXHJcbi8vIEVuY2Fwc3VsYXRlZCBXZWJBdWRpbyBpbnRlcmZhY2VcclxubGV0IFdlYkF1ZGlvRWxlbWVudCA9IGZ1bmN0aW9uIChidWZmZXIsIGF1ZGlvKSB7XHJcbiAgICB0aGlzLl9hdWRpbyA9IGF1ZGlvO1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHN5cy5fX2F1ZGlvU3VwcG9ydC5jb250ZXh0O1xyXG4gICAgdGhpcy5fYnVmZmVyID0gYnVmZmVyO1xyXG5cclxuICAgIHRoaXMuX2dhaW5PYmogPSB0aGlzLl9jb250ZXh0WydjcmVhdGVHYWluJ10oKTtcclxuICAgIHRoaXMudm9sdW1lID0gMTtcclxuXHJcbiAgICB0aGlzLl9nYWluT2JqWydjb25uZWN0J10odGhpcy5fY29udGV4dFsnZGVzdGluYXRpb24nXSk7XHJcbiAgICB0aGlzLl9sb29wID0gZmFsc2U7XHJcbiAgICAvLyBUaGUgdGltZSBzdGFtcCBvbiB0aGUgYXVkaW8gdGltZSBheGlzIHdoZW4gdGhlIHJlY29yZGluZyBiZWdpbnMgdG8gcGxheS5cclxuICAgIHRoaXMuX3N0YXJ0VGltZSA9IC0xO1xyXG4gICAgLy8gUmVjb3JkIHRoZSBjdXJyZW50bHkgcGxheWluZyAnU291cmNlJ1xyXG4gICAgdGhpcy5fY3VycmVudFNvdXJjZSA9IG51bGw7XHJcbiAgICAvLyBSZWNvcmQgdGhlIHRpbWUgaGFzIGJlZW4gcGxheWVkXHJcbiAgICB0aGlzLnBsYXllZExlbmd0aCA9IDA7XHJcblxyXG4gICAgdGhpcy5fY3VycmVudFRpbWVyID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLl9lbmRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5vbmVuZGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25lbmRlZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LmJpbmQodGhpcyk7XHJcbn07XHJcblxyXG4oZnVuY3Rpb24gKHByb3RvKSB7XHJcbiAgICBwcm90by5wbGF5ID0gZnVuY3Rpb24gKG9mZnNldCkge1xyXG4gICAgICAgIC8vIElmIHJlcGVhdCBwbGF5LCB5b3UgbmVlZCB0byBzdG9wIGJlZm9yZSBhbiBhdWRpb1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmICF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLm9uZW5kZWQgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U291cmNlLnN0b3AoMCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMuX2NvbnRleHRbXCJjcmVhdGVCdWZmZXJTb3VyY2VcIl0oKTtcclxuICAgICAgICBhdWRpby5idWZmZXIgPSB0aGlzLl9idWZmZXI7XHJcbiAgICAgICAgYXVkaW9bXCJjb25uZWN0XCJdKHRoaXMuX2dhaW5PYmopO1xyXG4gICAgICAgIGF1ZGlvLmxvb3AgPSB0aGlzLl9sb29wO1xyXG5cclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIG9mZnNldCA9IG9mZnNldCB8fCB0aGlzLnBsYXllZExlbmd0aDtcclxuICAgICAgICBpZiAob2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VGltZSAtPSBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG9mZnNldDtcclxuICAgICAgICBsZXQgZW5kVGltZTtcclxuICAgICAgICBpZiAodGhpcy5fbG9vcCkge1xyXG4gICAgICAgICAgICBpZiAoYXVkaW8uc3RhcnQpXHJcbiAgICAgICAgICAgICAgICBhdWRpby5zdGFydCgwLCBzdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChhdWRpb1tcIm5vdG9HcmFpbk9uXCJdKVxyXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlR3JhaW5PblwiXSgwLCBzdGFydFRpbWUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhdWRpb1tcIm5vdGVPblwiXSgwLCBzdGFydFRpbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVuZFRpbWUgPSBkdXJhdGlvbiAtIG9mZnNldDtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvLnN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RhcnQoMCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoYXVkaW9bXCJub3RlR3JhaW5PblwiXSlcclxuICAgICAgICAgICAgICAgIGF1ZGlvW1wibm90ZUdyYWluT25cIl0oMCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgYXVkaW9bXCJub3RlT25cIl0oMCwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTb3VyY2UgPSBhdWRpbztcclxuXHJcbiAgICAgICAgYXVkaW8ub25lbmRlZCA9IHRoaXMuX2VuZENhbGxiYWNrO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY3VycmVudCBhdWRpbyBjb250ZXh0IHRpbWUgc3RhbXAgaXMgMCBhbmQgYXVkaW8gY29udGV4dCBzdGF0ZSBpcyBzdXNwZW5kZWRcclxuICAgICAgICAvLyBUaGVyZSBtYXkgYmUgYSBuZWVkIHRvIHRvdWNoIGV2ZW50cyBiZWZvcmUgeW91IGNhbiBhY3R1YWxseSBzdGFydCBwbGF5aW5nIGF1ZGlvXHJcbiAgICAgICAgaWYgKCghYXVkaW8uY29udGV4dC5zdGF0ZSB8fCBhdWRpby5jb250ZXh0LnN0YXRlID09PSBcInN1c3BlbmRlZFwiKSAmJiB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2N1cnJlbnRUaW1lcik7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2NvbnRleHQuY3VycmVudFRpbWUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaFBsYXlMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogc2VsZi5fYXVkaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogc2VsZlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc3lzID0gY2Muc3lzO1xyXG4gICAgICAgIGlmIChzeXMub3MgPT09IHN5cy5PU19JT1MgJiYgc3lzLmlzQnJvd3NlciAmJiBzeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgLy8gQXVkaW8gY29udGV4dCBpcyBzdXNwZW5kZWQgd2hlbiB5b3UgdW5wbHVnIHRoZSBlYXJwaG9uZXMsXHJcbiAgICAgICAgICAgIC8vIGFuZCBpcyBpbnRlcnJ1cHRlZCB3aGVuIHRoZSBhcHAgZW50ZXJzIGJhY2tncm91bmQuXHJcbiAgICAgICAgICAgIC8vIEJvdGggbWFrZSB0aGUgYXVkaW9CdWZmZXJTb3VyY2UgdW5wbGF5YWJsZS5cclxuICAgICAgICAgICAgaWYgKChhdWRpby5jb250ZXh0LnN0YXRlID09PSBcInN1c3BlbmRlZFwiICYmIHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUgIT09IDApXHJcbiAgICAgICAgICAgICAgICB8fCBhdWRpby5jb250ZXh0LnN0YXRlID09PSAnaW50ZXJydXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BdWRpb0NvbnRleHQvcmVzdW1lXHJcbiAgICAgICAgICAgICAgICBhdWRpby5jb250ZXh0LnJlc3VtZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBwcm90by5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fY3VycmVudFRpbWVyKTtcclxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcclxuICAgICAgICAvLyBSZWNvcmQgdGhlIHRpbWUgdGhlIGN1cnJlbnQgaGFzIGJlZW4gcGxheWVkXHJcbiAgICAgICAgdGhpcy5wbGF5ZWRMZW5ndGggPSB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lIC0gdGhpcy5fc3RhcnRUaW1lO1xyXG4gICAgICAgIC8vIElmIG1vcmUgdGhhbiB0aGUgZHVyYXRpb24gb2YgdGhlIGF1ZGlvLCBOZWVkIHRvIHRha2UgdGhlIHJlbWFpbmRlclxyXG4gICAgICAgIHRoaXMucGxheWVkTGVuZ3RoICU9IHRoaXMuX2J1ZmZlci5kdXJhdGlvbjtcclxuICAgICAgICBsZXQgYXVkaW8gPSB0aGlzLl9jdXJyZW50U291cmNlO1xyXG4gICAgICAgIGlmIChhdWRpbykge1xyXG4gICAgICAgICAgICBpZihhdWRpby5vbmVuZGVkKXtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLm9uZW5kZWQuX2JpbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ub25lbmRlZCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXVkaW8uc3RvcCgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gLTE7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdwYXVzZWQnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjdXJyZW50IGF1ZGlvIGlzIGEgbG9vcCwgcGF1c2VkIGlzIGZhbHNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlICYmIHRoaXMuX2N1cnJlbnRTb3VyY2UubG9vcClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIHN0YXJ0VGltZSBkZWZhdWx0IGlzIC0xXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydFRpbWUgPT09IC0xKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBDdXJyZW50IHRpbWUgLSAgU3RhcnQgcGxheWluZyB0aW1lID4gQXVkaW8gZHVyYXRpb25cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUgLSB0aGlzLl9zdGFydFRpbWUgPiB0aGlzLl9idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbG9vcCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvb3A7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50U291cmNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZS5sb29wID0gYm9vbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb29wID0gYm9vbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICd2b2x1bWUnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gbnVtO1xyXG4gICAgICAgICAgICAvLyBodHRwczovL3d3dy5jaHJvbWVzdGF0dXMuY29tL2ZlYXR1cmVzLzUyODc5OTU3NzA5MjkxNTJcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dhaW5PYmouZ2Fpbi5zZXRUYXJnZXRBdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2Fpbk9iai5nYWluLnNldFRhcmdldEF0VGltZShudW0sIHRoaXMuX2NvbnRleHQuY3VycmVudFRpbWUsIFRJTUVfQ09OU1RBTlQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTb21lIG90aGVyIHVua25vd24gYnJvd3NlcnMgbWF5IGNyYXNoIGlmIFRJTUVfQ09OU1RBTlQgaXMgMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi5zZXRUYXJnZXRBdFRpbWUobnVtLCB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lLCAwLjAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dhaW5PYmouZ2Fpbi52YWx1ZSA9IG51bTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN5cy5vcyA9PT0gc3lzLk9TX0lPUyAmJiAhdGhpcy5wYXVzZWQgJiYgdGhpcy5fY3VycmVudFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSU9TIG11c3QgYmUgc3RvcCB3ZWJBdWRpb1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudFNvdXJjZS5vbmVuZGVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnY3VycmVudFRpbWUnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVkTGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlY29yZCB0aGUgdGltZSB0aGUgY3VycmVudCBoYXMgYmVlbiBwbGF5ZWRcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZWRMZW5ndGggPSB0aGlzLl9jb250ZXh0LmN1cnJlbnRUaW1lIC0gdGhpcy5fc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAvLyBJZiBtb3JlIHRoYW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBhdWRpbywgTmVlZCB0byB0YWtlIHRoZSByZW1haW5kZXJcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZWRMZW5ndGggJT0gdGhpcy5fYnVmZmVyLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZWRMZW5ndGg7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZWRMZW5ndGggPSBudW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVkTGVuZ3RoID0gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnZHVyYXRpb24nLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWZmZXIuZHVyYXRpb247XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG59KShXZWJBdWRpb0VsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuX0F1ZGlvID0gQXVkaW87XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9