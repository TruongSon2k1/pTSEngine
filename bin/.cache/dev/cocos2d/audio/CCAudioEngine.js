
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/audio/CCAudioEngine.js';
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
var Audio = require('./CCAudio');

var AudioClip = require('../core/assets/CCAudioClip');

var js = cc.js;
var _instanceId = 0;

var _id2audio = js.createMap(true);

var _url2id = {};
var _audioPool = [];

var recycleAudio = function recycleAudio(audio) {
  // In case repeatly recycle audio when users call audio.stop when audio finish playing
  if (!audio._shouldRecycleOnEnded) {
    return;
  }

  audio._finishCallback = null;
  audio.off('ended');
  audio.off('stop');
  audio.src = null; // In case repeatly recycle audio

  if (!_audioPool.includes(audio)) {
    if (_audioPool.length < 32) {
      _audioPool.push(audio);
    } else {
      audio.destroy();
    }
  }

  audio._shouldRecycleOnEnded = false;
};

var getAudioFromPath = function getAudioFromPath(path) {
  var id = _instanceId++;
  var list = _url2id[path];

  if (!list) {
    list = _url2id[path] = [];
  }

  if (audioEngine._maxAudioInstance <= list.length) {
    var oldId = list.shift();
    var oldAudio = getAudioFromId(oldId); // Stop will recycle audio automatically by event callback

    oldAudio.stop();
  }

  var audio = _audioPool.pop() || new Audio();

  var callback = function callback() {
    var audioInList = getAudioFromId(this.id);

    if (audioInList) {
      delete _id2audio[this.id];
      var index = list.indexOf(this.id);
      cc.js.array.fastRemoveAt(list, index);
    }

    recycleAudio(this);
  };

  audio.on('ended', function () {
    if (this._finishCallback) {
      this._finishCallback();
    }

    if (!this.getLoop()) {
      callback.call(this);
    }
  }, audio);
  audio.on('stop', callback, audio);
  audio.id = id;
  _id2audio[id] = audio;
  list.push(id);
  return audio;
};

var getAudioFromId = function getAudioFromId(id) {
  return _id2audio[id];
};

var handleVolume = function handleVolume(volume) {
  if (volume === undefined) {
    // set default volume as 1
    volume = 1;
  } else if (typeof volume === 'string') {
    volume = Number.parseFloat(volume);
  }

  return volume;
};
/**
 * !#en `cc.audioEngine` is the singleton object, it provide simple audio APIs.
 * !#zh
 * cc.audioengine是单例对象。<br/>
 * 主要用来播放音频，播放的时候会返回一个 audioID，之后都可以通过这个 audioID 来操作这个音频对象。<br/>
 * 不使用的时候，请使用 `cc.audioEngine.uncache(filePath);` 进行资源释放 <br/>
 * 注意：<br/>
 * 在 Android 系统浏览器上，不同浏览器，不同版本的效果不尽相同。<br/>
 * 比如说：大多数浏览器都需要用户物理交互才可以开始播放音效，有一些不支持 WebAudio，有一些不支持多音轨播放。总之如果对音乐依赖比较强，请做尽可能多的测试。
 * @class audioEngine
 * @static
 */


var audioEngine = {
  AudioState: Audio.State,
  _maxAudioInstance: 24,
  _id2audio: _id2audio,

  /**
   * !#en Play audio.
   * !#zh 播放音频
   * @method play
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @param {Number} volume - Volume size.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.play(clip, false, 0.5);
   * });
   */
  play: function play(clip, loop, volume) {
    if (CC_EDITOR) {
      return;
    }

    if (!(clip instanceof AudioClip)) {
      return cc.error('Wrong type of AudioClip.');
    }

    var path = clip.nativeUrl;
    var audio = getAudioFromPath(path);
    audio.src = clip;

    clip._ensureLoaded();

    audio._shouldRecycleOnEnded = true;
    audio.setLoop(loop || false);
    volume = handleVolume(volume);
    audio.setVolume(volume);
    audio.play();
    return audio.id;
  },

  /**
   * !#en Set audio loop.
   * !#zh 设置音频是否循环。
   * @method setLoop
   * @param {Number} audioID - audio id.
   * @param {Boolean} loop - Whether cycle.
   * @example
   * cc.audioEngine.setLoop(id, true);
   */
  setLoop: function setLoop(audioID, loop) {
    var audio = getAudioFromId(audioID);
    if (!audio || !audio.setLoop) return;
    audio.setLoop(loop);
  },

  /**
   * !#en Get audio cycle state.
   * !#zh 获取音频的循环状态。
   * @method isLoop
   * @param {Number} audioID - audio id.
   * @return {Boolean} Whether cycle.
   * @example
   * cc.audioEngine.isLoop(id);
   */
  isLoop: function isLoop(audioID) {
    var audio = getAudioFromId(audioID);
    if (!audio || !audio.getLoop) return false;
    return audio.getLoop();
  },

  /**
   * !#en Set the volume of audio.
   * !#zh 设置音量（0.0 ~ 1.0）。
   * @method setVolume
   * @param {Number} audioID - audio id.
   * @param {Number} volume - Volume must be in 0.0~1.0 .
   * @example
   * cc.audioEngine.setVolume(id, 0.5);
   */
  setVolume: function setVolume(audioID, volume) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.setVolume(volume);
    }
  },

  /**
   * !#en The volume of the music max value is 1.0,the min value is 0.0 .
   * !#zh 获取音量（0.0 ~ 1.0）。
   * @method getVolume
   * @param {Number} audioID - audio id.
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getVolume(id);
   */
  getVolume: function getVolume(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getVolume() : 1;
  },

  /**
   * !#en Set current time
   * !#zh 设置当前的音频时间。
   * @method setCurrentTime
   * @param {Number} audioID - audio id.
   * @param {Number} sec - current time.
   * @return {Boolean}
   * @example
   * cc.audioEngine.setCurrentTime(id, 2);
   */
  setCurrentTime: function setCurrentTime(audioID, sec) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.setCurrentTime(sec);
      return true;
    } else {
      return false;
    }
  },

  /**
   * !#en Get current time
   * !#zh 获取当前的音频播放时间。
   * @method getCurrentTime
   * @param {Number} audioID - audio id.
   * @return {Number} audio current time.
   * @example
   * var time = cc.audioEngine.getCurrentTime(id);
   */
  getCurrentTime: function getCurrentTime(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getCurrentTime() : 0;
  },

  /**
   * !#en Get audio duration
   * !#zh 获取音频总时长。
   * @method getDuration
   * @param {Number} audioID - audio id.
   * @return {Number} audio duration.
   * @example
   * var time = cc.audioEngine.getDuration(id);
   */
  getDuration: function getDuration(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getDuration() : 0;
  },

  /**
   * !#en Get audio state
   * !#zh 获取音频状态。
   * @method getState
   * @param {Number} audioID - audio id.
   * @return {audioEngine.AudioState} audio duration.
   * @example
   * var state = cc.audioEngine.getState(id);
   */
  getState: function getState(audioID) {
    var audio = getAudioFromId(audioID);
    return audio ? audio.getState() : this.AudioState.ERROR;
  },

  /**
   * !#en Set Audio finish callback
   * !#zh 设置一个音频结束后的回调
   * @method setFinishCallback
   * @param {Number} audioID - audio id.
   * @param {Function} callback - loaded callback.
   * @example
   * cc.audioEngine.setFinishCallback(id, function () {});
   */
  setFinishCallback: function setFinishCallback(audioID, callback) {
    var audio = getAudioFromId(audioID);
    if (!audio) return;
    audio._finishCallback = callback;
  },

  /**
   * !#en Pause playing audio.
   * !#zh 暂停正在播放音频。
   * @method pause
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.pause(audioID);
   */
  pause: function pause(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.pause();
      return true;
    } else {
      return false;
    }
  },
  _pauseIDCache: [],

  /**
   * !#en Pause all playing audio
   * !#zh 暂停现在正在播放的所有音频。
   * @method pauseAll
   * @example
   * cc.audioEngine.pauseAll();
   */
  pauseAll: function pauseAll() {
    for (var id in _id2audio) {
      var audio = _id2audio[id];
      var state = audio.getState();

      if (state === Audio.State.PLAYING) {
        this._pauseIDCache.push(id);

        audio.pause();
      }
    }
  },

  /**
   * !#en Resume playing audio.
   * !#zh 恢复播放指定的音频。
   * @method resume
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.resume(audioID);
   */
  resume: function resume(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      audio.resume();
    }
  },

  /**
   * !#en Resume all playing audio.
   * !#zh 恢复播放所有之前暂停的所有音频。
   * @method resumeAll
   * @example
   * cc.audioEngine.resumeAll();
   */
  resumeAll: function resumeAll() {
    for (var i = 0; i < this._pauseIDCache.length; ++i) {
      var id = this._pauseIDCache[i];
      var audio = getAudioFromId(id);
      if (audio) audio.resume();
    }

    this._pauseIDCache.length = 0;
  },

  /**
   * !#en Stop playing audio.
   * !#zh 停止播放指定音频。
   * @method stop
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.stop(audioID);
   */
  stop: function stop(audioID) {
    var audio = getAudioFromId(audioID);

    if (audio) {
      // Stop will recycle audio automatically by event callback
      audio.stop();
      return true;
    } else {
      return false;
    }
  },

  /**
   * !#en Stop all playing audio.
   * !#zh 停止正在播放的所有音频。
   * @method stopAll
   * @example
   * cc.audioEngine.stopAll();
   */
  stopAll: function stopAll() {
    for (var id in _id2audio) {
      var audio = _id2audio[id];

      if (audio) {
        // Stop will recycle audio automatically by event callback
        audio.stop();
      }
    }
  },

  /**
   * !#en Set up an audio can generate a few examples.
   * !#zh 设置一个音频可以设置几个实例
   * @method setMaxAudioInstance
   * @param {Number} num - a number of instances to be created from within an audio
   * @example
   * cc.audioEngine.setMaxAudioInstance(20);
   * @deprecated since v2.4.0
   */
  setMaxAudioInstance: function setMaxAudioInstance(num) {
    if (CC_DEBUG) {
      cc.warn('Since v2.4.0, maxAudioInstance has become a read only property.\n' + 'audioEngine.setMaxAudioInstance() method will be removed in the future');
    }
  },

  /**
   * !#en Getting audio can produce several examples.
   * !#zh 获取一个音频可以设置几个实例
   * @method getMaxAudioInstance
   * @return {Number} max number of instances to be created from within an audio
   * @example
   * cc.audioEngine.getMaxAudioInstance();
   */
  getMaxAudioInstance: function getMaxAudioInstance() {
    return this._maxAudioInstance;
  },

  /**
   * !#en Unload the preloaded audio from internal buffer.
   * !#zh 卸载预加载的音频。
   * @method uncache
   * @param {AudioClip} clip
   * @example
   * cc.audioEngine.uncache(filePath);
   */
  uncache: function uncache(clip) {
    var filePath = clip;

    if (typeof clip === 'string') {
      // backward compatibility since 1.10
      cc.warnID(8401, 'cc.audioEngine', 'cc.AudioClip', 'AudioClip', 'cc.AudioClip', 'audio');
      filePath = clip;
    } else {
      if (!clip) {
        return;
      }

      filePath = clip.nativeUrl;
    }

    var list = _url2id[filePath];
    if (!list) return;

    while (list.length > 0) {
      var id = list.pop();
      var audio = _id2audio[id];

      if (audio) {
        // Stop will recycle audio automatically by event callback
        audio.stop();
        delete _id2audio[id];
      }
    }
  },

  /**
   * !#en Unload all audio from internal buffer.
   * !#zh 卸载所有音频。
   * @method uncacheAll
   * @example
   * cc.audioEngine.uncacheAll();
   */
  uncacheAll: function uncacheAll() {
    this.stopAll();
    var audio;

    for (var id in _id2audio) {
      audio = _id2audio[id];

      if (audio) {
        audio.destroy();
      }
    }

    while (audio = _audioPool.pop()) {
      audio.destroy();
    }

    _id2audio = js.createMap(true);
    _url2id = {};
  },
  _breakCache: null,
  _break: function _break() {
    this._breakCache = [];

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      var state = audio.getState();

      if (state === Audio.State.PLAYING) {
        this._breakCache.push(id);

        audio.pause();
      }
    }
  },
  _restore: function _restore() {
    if (!this._breakCache) return;

    while (this._breakCache.length > 0) {
      var id = this._breakCache.pop();

      var audio = getAudioFromId(id);
      if (audio && audio.resume) audio.resume();
    }

    this._breakCache = null;
  },
  ///////////////////////////////
  // Classification of interface
  _music: {
    id: -1,
    loop: false,
    volume: 1
  },
  _effect: {
    volume: 1,
    pauseCache: []
  },

  /**
   * !#en Play background music
   * !#zh 播放背景音乐
   * @method playMusic
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.playMusic(clip, false);
   * });
   */
  playMusic: function playMusic(clip, loop) {
    var music = this._music;
    this.stop(music.id);
    music.id = this.play(clip, loop, music.volume);
    music.loop = loop;
    return music.id;
  },

  /**
   * !#en Stop background music.
   * !#zh 停止播放背景音乐。
   * @method stopMusic
   * @example
   * cc.audioEngine.stopMusic();
   */
  stopMusic: function stopMusic() {
    this.stop(this._music.id);
  },

  /**
   * !#en Pause the background music.
   * !#zh 暂停播放背景音乐。
   * @method pauseMusic
   * @example
   * cc.audioEngine.pauseMusic();
   */
  pauseMusic: function pauseMusic() {
    this.pause(this._music.id);
    return this._music.id;
  },

  /**
   * !#en Resume playing background music.
   * !#zh 恢复播放背景音乐。
   * @method resumeMusic
   * @example
   * cc.audioEngine.resumeMusic();
   */
  resumeMusic: function resumeMusic() {
    this.resume(this._music.id);
    return this._music.id;
  },

  /**
   * !#en Get the volume(0.0 ~ 1.0).
   * !#zh 获取音量（0.0 ~ 1.0）。
   * @method getMusicVolume
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getMusicVolume();
   */
  getMusicVolume: function getMusicVolume() {
    return this._music.volume;
  },

  /**
   * !#en Set the background music volume.
   * !#zh 设置背景音乐音量（0.0 ~ 1.0）。
   * @method setMusicVolume
   * @param {Number} volume - Volume must be in 0.0~1.0.
   * @example
   * cc.audioEngine.setMusicVolume(0.5);
   */
  setMusicVolume: function setMusicVolume(volume) {
    volume = handleVolume(volume);
    var music = this._music;
    music.volume = volume;
    this.setVolume(music.id, music.volume);
    return music.volume;
  },

  /**
   * !#en Background music playing state
   * !#zh 背景音乐是否正在播放
   * @method isMusicPlaying
   * @return {Boolean}
   * @example
   * cc.audioEngine.isMusicPlaying();
   */
  isMusicPlaying: function isMusicPlaying() {
    return this.getState(this._music.id) === this.AudioState.PLAYING;
  },

  /**
   * !#en Play effect audio.
   * !#zh 播放音效
   * @method playEffect
   * @param {AudioClip} clip - The audio clip to play.
   * @param {Boolean} loop - Whether the music loop or not.
   * @return {Number} audioId
   * @example
   * cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
   *     var audioID = cc.audioEngine.playEffect(clip, false);
   * });
   */
  playEffect: function playEffect(clip, loop) {
    return this.play(clip, loop || false, this._effect.volume);
  },

  /**
   * !#en Set the volume of effect audio.
   * !#zh 设置音效音量（0.0 ~ 1.0）。
   * @method setEffectsVolume
   * @param {Number} volume - Volume must be in 0.0~1.0.
   * @example
   * cc.audioEngine.setEffectsVolume(0.5);
   */
  setEffectsVolume: function setEffectsVolume(volume) {
    volume = handleVolume(volume);
    var musicId = this._music.id;
    this._effect.volume = volume;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      audioEngine.setVolume(id, volume);
    }
  },

  /**
   * !#en The volume of the effect audio max value is 1.0,the min value is 0.0 .
   * !#zh 获取音效音量（0.0 ~ 1.0）。
   * @method getEffectsVolume
   * @return {Number}
   * @example
   * var volume = cc.audioEngine.getEffectsVolume();
   */
  getEffectsVolume: function getEffectsVolume() {
    return this._effect.volume;
  },

  /**
   * !#en Pause effect audio.
   * !#zh 暂停播放音效。
   * @method pauseEffect
   * @param {Number} audioID - audio id.
   * @example
   * cc.audioEngine.pauseEffect(audioID);
   */
  pauseEffect: function pauseEffect(audioID) {
    return this.pause(audioID);
  },

  /**
   * !#en Stop playing all the sound effects.
   * !#zh 暂停播放所有音效。
   * @method pauseAllEffects
   * @example
   * cc.audioEngine.pauseAllEffects();
   */
  pauseAllEffects: function pauseAllEffects() {
    var musicId = this._music.id;
    var effect = this._effect;
    effect.pauseCache.length = 0;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      var state = audio.getState();

      if (state === this.AudioState.PLAYING) {
        effect.pauseCache.push(id);
        audio.pause();
      }
    }
  },

  /**
   * !#en Resume effect audio.
   * !#zh 恢复播放音效音频。
   * @method resumeEffect
   * @param {Number} audioID - The return value of function play.
   * @example
   * cc.audioEngine.resumeEffect(audioID);
   */
  resumeEffect: function resumeEffect(id) {
    this.resume(id);
  },

  /**
   * !#en Resume all effect audio.
   * !#zh 恢复播放所有之前暂停的音效。
   * @method resumeAllEffects
   * @example
   * cc.audioEngine.resumeAllEffects();
   */
  resumeAllEffects: function resumeAllEffects() {
    var pauseIDCache = this._effect.pauseCache;

    for (var i = 0; i < pauseIDCache.length; ++i) {
      var id = pauseIDCache[i];
      var audio = _id2audio[id];
      if (audio) audio.resume();
    }
  },

  /**
   * !#en Stop playing the effect audio.
   * !#zh 停止播放音效。
   * @method stopEffect
   * @param {Number} audioID - audio id.
   * @example
   * cc.audioEngine.stopEffect(id);
   */
  stopEffect: function stopEffect(audioID) {
    return this.stop(audioID);
  },

  /**
   * !#en Stop playing all the effects.
   * !#zh 停止播放所有音效。
   * @method stopAllEffects
   * @example
   * cc.audioEngine.stopAllEffects();
   */
  stopAllEffects: function stopAllEffects() {
    var musicId = this._music.id;

    for (var id in _id2audio) {
      var audio = _id2audio[id];
      if (!audio || audio.id === musicId) continue;
      var state = audio.getState();

      if (state === audioEngine.AudioState.PLAYING) {
        audio.stop();
      }
    }
  }
};
module.exports = cc.audioEngine = audioEngine;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGF1ZGlvXFxDQ0F1ZGlvRW5naW5lLmpzIl0sIm5hbWVzIjpbIkF1ZGlvIiwicmVxdWlyZSIsIkF1ZGlvQ2xpcCIsImpzIiwiY2MiLCJfaW5zdGFuY2VJZCIsIl9pZDJhdWRpbyIsImNyZWF0ZU1hcCIsIl91cmwyaWQiLCJfYXVkaW9Qb29sIiwicmVjeWNsZUF1ZGlvIiwiYXVkaW8iLCJfc2hvdWxkUmVjeWNsZU9uRW5kZWQiLCJfZmluaXNoQ2FsbGJhY2siLCJvZmYiLCJzcmMiLCJpbmNsdWRlcyIsImxlbmd0aCIsInB1c2giLCJkZXN0cm95IiwiZ2V0QXVkaW9Gcm9tUGF0aCIsInBhdGgiLCJpZCIsImxpc3QiLCJhdWRpb0VuZ2luZSIsIl9tYXhBdWRpb0luc3RhbmNlIiwib2xkSWQiLCJzaGlmdCIsIm9sZEF1ZGlvIiwiZ2V0QXVkaW9Gcm9tSWQiLCJzdG9wIiwicG9wIiwiY2FsbGJhY2siLCJhdWRpb0luTGlzdCIsImluZGV4IiwiaW5kZXhPZiIsImFycmF5IiwiZmFzdFJlbW92ZUF0Iiwib24iLCJnZXRMb29wIiwiY2FsbCIsImhhbmRsZVZvbHVtZSIsInZvbHVtZSIsInVuZGVmaW5lZCIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJBdWRpb1N0YXRlIiwiU3RhdGUiLCJwbGF5IiwiY2xpcCIsImxvb3AiLCJDQ19FRElUT1IiLCJlcnJvciIsIm5hdGl2ZVVybCIsIl9lbnN1cmVMb2FkZWQiLCJzZXRMb29wIiwic2V0Vm9sdW1lIiwiYXVkaW9JRCIsImlzTG9vcCIsImdldFZvbHVtZSIsInNldEN1cnJlbnRUaW1lIiwic2VjIiwiZ2V0Q3VycmVudFRpbWUiLCJnZXREdXJhdGlvbiIsImdldFN0YXRlIiwiRVJST1IiLCJzZXRGaW5pc2hDYWxsYmFjayIsInBhdXNlIiwiX3BhdXNlSURDYWNoZSIsInBhdXNlQWxsIiwic3RhdGUiLCJQTEFZSU5HIiwicmVzdW1lIiwicmVzdW1lQWxsIiwiaSIsInN0b3BBbGwiLCJzZXRNYXhBdWRpb0luc3RhbmNlIiwibnVtIiwiQ0NfREVCVUciLCJ3YXJuIiwiZ2V0TWF4QXVkaW9JbnN0YW5jZSIsInVuY2FjaGUiLCJmaWxlUGF0aCIsIndhcm5JRCIsInVuY2FjaGVBbGwiLCJfYnJlYWtDYWNoZSIsIl9icmVhayIsIl9yZXN0b3JlIiwiX211c2ljIiwiX2VmZmVjdCIsInBhdXNlQ2FjaGUiLCJwbGF5TXVzaWMiLCJtdXNpYyIsInN0b3BNdXNpYyIsInBhdXNlTXVzaWMiLCJyZXN1bWVNdXNpYyIsImdldE11c2ljVm9sdW1lIiwic2V0TXVzaWNWb2x1bWUiLCJpc011c2ljUGxheWluZyIsInBsYXlFZmZlY3QiLCJzZXRFZmZlY3RzVm9sdW1lIiwibXVzaWNJZCIsImdldEVmZmVjdHNWb2x1bWUiLCJwYXVzZUVmZmVjdCIsInBhdXNlQWxsRWZmZWN0cyIsImVmZmVjdCIsInJlc3VtZUVmZmVjdCIsInJlc3VtZUFsbEVmZmVjdHMiLCJwYXVzZUlEQ2FjaGUiLCJzdG9wRWZmZWN0Iiwic3RvcEFsbEVmZmVjdHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsNEJBQUQsQ0FBekI7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHQyxFQUFFLENBQUNELEVBQWQ7QUFFQSxJQUFJRSxXQUFXLEdBQUcsQ0FBbEI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHSCxFQUFFLENBQUNJLFNBQUgsQ0FBYSxJQUFiLENBQWhCOztBQUNBLElBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLEVBQWpC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QUNBO0FBQ0E7QUFDQTtBQUNJcUQsRUFBQUEsY0FBYyxFQUFFLDBCQUFZO0FBQ3hCLFFBQUlULE9BQU8sR0FBRyxLQUFLYixNQUFMLENBQVlsRSxFQUExQjs7QUFDQSxTQUFLLElBQUlBLEVBQVQsSUFBZWhCLFNBQWYsRUFBMEI7QUFDdEIsVUFBSUssS0FBSyxHQUFHTCxTQUFTLENBQUNnQixFQUFELENBQXJCO0FBQ0EsVUFBSSxDQUFDWCxLQUFELElBQVVBLEtBQUssQ0FBQ1csRUFBTixLQUFhK0UsT0FBM0IsRUFBb0M7QUFDcEMsVUFBSS9CLEtBQUssR0FBRzNELEtBQUssQ0FBQ3FELFFBQU4sRUFBWjs7QUFDQSxVQUFJTSxLQUFLLEtBQUs5QyxXQUFXLENBQUNzQixVQUFaLENBQXVCeUIsT0FBckMsRUFBOEM7QUFDMUM1RCxRQUFBQSxLQUFLLENBQUNtQixJQUFOO0FBQ0g7QUFDSjtBQUNKO0FBeG9CYSxDQUFsQjtBQTJvQkFpRixNQUFNLENBQUNDLE9BQVAsR0FBaUI1RyxFQUFFLENBQUNvQixXQUFILEdBQWlCQSxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcclxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgQXVkaW8gPSByZXF1aXJlKCcuL0NDQXVkaW8nKTtcclxuY29uc3QgQXVkaW9DbGlwID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvQ0NBdWRpb0NsaXAnKTtcclxuY29uc3QganMgPSBjYy5qcztcclxuXHJcbmxldCBfaW5zdGFuY2VJZCA9IDA7XHJcbmxldCBfaWQyYXVkaW8gPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XHJcbmxldCBfdXJsMmlkID0ge307XHJcbmxldCBfYXVkaW9Qb29sID0gW107XHJcblxyXG5sZXQgcmVjeWNsZUF1ZGlvID0gZnVuY3Rpb24gKGF1ZGlvKSB7XHJcbiAgICAvLyBJbiBjYXNlIHJlcGVhdGx5IHJlY3ljbGUgYXVkaW8gd2hlbiB1c2VycyBjYWxsIGF1ZGlvLnN0b3Agd2hlbiBhdWRpbyBmaW5pc2ggcGxheWluZ1xyXG4gICAgaWYgKCFhdWRpby5fc2hvdWxkUmVjeWNsZU9uRW5kZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBhdWRpby5fZmluaXNoQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgYXVkaW8ub2ZmKCdlbmRlZCcpO1xyXG4gICAgYXVkaW8ub2ZmKCdzdG9wJyk7XHJcbiAgICBhdWRpby5zcmMgPSBudWxsO1xyXG4gICAgLy8gSW4gY2FzZSByZXBlYXRseSByZWN5Y2xlIGF1ZGlvXHJcbiAgICBpZiAoIV9hdWRpb1Bvb2wuaW5jbHVkZXMoYXVkaW8pKSB7XHJcbiAgICAgICAgaWYgKF9hdWRpb1Bvb2wubGVuZ3RoIDwgMzIpIHtcclxuICAgICAgICAgICAgX2F1ZGlvUG9vbC5wdXNoKGF1ZGlvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhdWRpby5fc2hvdWxkUmVjeWNsZU9uRW5kZWQgPSBmYWxzZTtcclxufTtcclxuXHJcbmxldCBnZXRBdWRpb0Zyb21QYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcclxuICAgIHZhciBpZCA9IF9pbnN0YW5jZUlkKys7XHJcbiAgICB2YXIgbGlzdCA9IF91cmwyaWRbcGF0aF07XHJcbiAgICBpZiAoIWxpc3QpIHtcclxuICAgICAgICBsaXN0ID0gX3VybDJpZFtwYXRoXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKGF1ZGlvRW5naW5lLl9tYXhBdWRpb0luc3RhbmNlIDw9IGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIG9sZElkID0gbGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIHZhciBvbGRBdWRpbyA9IGdldEF1ZGlvRnJvbUlkKG9sZElkKTtcclxuICAgICAgICAvLyBTdG9wIHdpbGwgcmVjeWNsZSBhdWRpbyBhdXRvbWF0aWNhbGx5IGJ5IGV2ZW50IGNhbGxiYWNrXHJcbiAgICAgICAgb2xkQXVkaW8uc3RvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhdWRpbyA9IF9hdWRpb1Bvb2wucG9wKCkgfHwgbmV3IEF1ZGlvKCk7XHJcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvSW5MaXN0ID0gZ2V0QXVkaW9Gcm9tSWQodGhpcy5pZCk7XHJcbiAgICAgICAgaWYgKGF1ZGlvSW5MaXN0KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBfaWQyYXVkaW9bdGhpcy5pZF07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpc3QuaW5kZXhPZih0aGlzLmlkKTtcclxuICAgICAgICAgICAgY2MuanMuYXJyYXkuZmFzdFJlbW92ZUF0KGxpc3QsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVjeWNsZUF1ZGlvKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhdWRpby5vbignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpbmlzaENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpbmlzaENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLmdldExvb3AoKSl7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgYXVkaW8pO1xyXG5cclxuICAgIGF1ZGlvLm9uKCdzdG9wJywgY2FsbGJhY2ssIGF1ZGlvKTtcclxuICAgIGF1ZGlvLmlkID0gaWQ7XHJcbiAgICBfaWQyYXVkaW9baWRdID0gYXVkaW87XHJcbiAgICBsaXN0LnB1c2goaWQpO1xyXG5cclxuICAgIHJldHVybiBhdWRpbztcclxufTtcclxuXHJcbmxldCBnZXRBdWRpb0Zyb21JZCA9IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgcmV0dXJuIF9pZDJhdWRpb1tpZF07XHJcbn07XHJcblxyXG5sZXQgaGFuZGxlVm9sdW1lICA9IGZ1bmN0aW9uICh2b2x1bWUpIHtcclxuICAgIGlmICh2b2x1bWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIHNldCBkZWZhdWx0IHZvbHVtZSBhcyAxXHJcbiAgICAgICAgdm9sdW1lID0gMTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2b2x1bWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdm9sdW1lID0gTnVtYmVyLnBhcnNlRmxvYXQodm9sdW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2b2x1bWU7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBgY2MuYXVkaW9FbmdpbmVgIGlzIHRoZSBzaW5nbGV0b24gb2JqZWN0LCBpdCBwcm92aWRlIHNpbXBsZSBhdWRpbyBBUElzLlxyXG4gKiAhI3poXHJcbiAqIGNjLmF1ZGlvZW5naW5l5piv5Y2V5L6L5a+56LGh44CCPGJyLz5cclxuICog5Li76KaB55So5p2l5pKt5pS+6Z+z6aKR77yM5pKt5pS+55qE5pe25YCZ5Lya6L+U5Zue5LiA5LiqIGF1ZGlvSUTvvIzkuYvlkI7pg73lj6/ku6XpgJrov4fov5nkuKogYXVkaW9JRCDmnaXmk43kvZzov5nkuKrpn7PpopHlr7nosaHjgII8YnIvPlxyXG4gKiDkuI3kvb/nlKjnmoTml7blgJnvvIzor7fkvb/nlKggYGNjLmF1ZGlvRW5naW5lLnVuY2FjaGUoZmlsZVBhdGgpO2Ag6L+b6KGM6LWE5rqQ6YeK5pS+IDxici8+XHJcbiAqIOazqOaEj++8mjxici8+XHJcbiAqIOWcqCBBbmRyb2lkIOezu+e7n+a1j+iniOWZqOS4iu+8jOS4jeWQjOa1j+iniOWZqO+8jOS4jeWQjOeJiOacrOeahOaViOaenOS4jeWwveebuOWQjOOAgjxici8+XHJcbiAqIOavlOWmguivtO+8muWkp+WkmuaVsOa1j+iniOWZqOmDvemcgOimgeeUqOaIt+eJqeeQhuS6pOS6kuaJjeWPr+S7peW8gOWni+aSreaUvumfs+aViO+8jOacieS4gOS6m+S4jeaUr+aMgSBXZWJBdWRpb++8jOacieS4gOS6m+S4jeaUr+aMgeWkmumfs+i9qOaSreaUvuOAguaAu+S5i+WmguaenOWvuemfs+S5kOS+nei1luavlOi+g+W8uu+8jOivt+WBmuWwveWPr+iDveWkmueahOa1i+ivleOAglxyXG4gKiBAY2xhc3MgYXVkaW9FbmdpbmVcclxuICogQHN0YXRpY1xyXG4gKi9cclxudmFyIGF1ZGlvRW5naW5lID0ge1xyXG5cclxuICAgIEF1ZGlvU3RhdGU6IEF1ZGlvLlN0YXRlLFxyXG5cclxuICAgIF9tYXhBdWRpb0luc3RhbmNlOiAyNCxcclxuXHJcbiAgICBfaWQyYXVkaW86IF9pZDJhdWRpbyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGxheSBhdWRpby5cclxuICAgICAqICEjemgg5pKt5pS+6Z+z6aKRXHJcbiAgICAgKiBAbWV0aG9kIHBsYXlcclxuICAgICAqIEBwYXJhbSB7QXVkaW9DbGlwfSBjbGlwIC0gVGhlIGF1ZGlvIGNsaXAgdG8gcGxheS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAtIFdoZXRoZXIgdGhlIG11c2ljIGxvb3Agb3Igbm90LlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZvbHVtZSAtIFZvbHVtZSBzaXplLlxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhdWRpb0lkXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MucmVzb3VyY2VzLmxvYWQocGF0aCwgY2MuQXVkaW9DbGlwLCBudWxsLCBmdW5jdGlvbiAoZXJyLCBjbGlwKSB7XHJcbiAgICAgKiAgICAgdmFyIGF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5KGNsaXAsIGZhbHNlLCAwLjUpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKi9cclxuICAgIHBsYXk6IGZ1bmN0aW9uIChjbGlwLCBsb29wLCB2b2x1bWUpIHtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoY2xpcCBpbnN0YW5jZW9mIEF1ZGlvQ2xpcCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9yKCdXcm9uZyB0eXBlIG9mIEF1ZGlvQ2xpcC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhdGggPSBjbGlwLm5hdGl2ZVVybDtcclxuICAgICAgICBsZXQgYXVkaW8gPSBnZXRBdWRpb0Zyb21QYXRoKHBhdGgpO1xyXG4gICAgICAgIGF1ZGlvLnNyYyA9IGNsaXA7XHJcbiAgICAgICAgY2xpcC5fZW5zdXJlTG9hZGVkKCk7XHJcbiAgICAgICAgYXVkaW8uX3Nob3VsZFJlY3ljbGVPbkVuZGVkID0gdHJ1ZTtcclxuICAgICAgICBhdWRpby5zZXRMb29wKGxvb3AgfHwgZmFsc2UpO1xyXG4gICAgICAgIHZvbHVtZSA9IGhhbmRsZVZvbHVtZSh2b2x1bWUpO1xyXG4gICAgICAgIGF1ZGlvLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICByZXR1cm4gYXVkaW8uaWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgYXVkaW8gbG9vcC5cclxuICAgICAqICEjemgg6K6+572u6Z+z6aKR5piv5ZCm5b6q546v44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldExvb3BcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgLSBXaGV0aGVyIGN5Y2xlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldExvb3AoaWQsIHRydWUpO1xyXG4gICAgICovXHJcbiAgICBzZXRMb29wOiBmdW5jdGlvbiAoYXVkaW9JRCwgbG9vcCkge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xyXG4gICAgICAgIGlmICghYXVkaW8gfHwgIWF1ZGlvLnNldExvb3ApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBhdWRpby5zZXRMb29wKGxvb3ApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0IGF1ZGlvIGN5Y2xlIHN0YXRlLlxyXG4gICAgICogISN6aCDojrflj5bpn7PpopHnmoTlvqrnjq/nirbmgIHjgIJcclxuICAgICAqIEBtZXRob2QgaXNMb29wXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBjeWNsZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5pc0xvb3AoaWQpO1xyXG4gICAgICovXHJcbiAgICBpc0xvb3A6IGZ1bmN0aW9uIChhdWRpb0lEKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XHJcbiAgICAgICAgaWYgKCFhdWRpbyB8fCAhYXVkaW8uZ2V0TG9vcClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBhdWRpby5nZXRMb29wKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIHZvbHVtZSBvZiBhdWRpby5cclxuICAgICAqICEjemgg6K6+572u6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldFZvbHVtZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgbXVzdCBiZSBpbiAwLjB+MS4wIC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoaWQsIDAuNSk7XHJcbiAgICAgKi9cclxuICAgIHNldFZvbHVtZTogZnVuY3Rpb24gKGF1ZGlvSUQsIHZvbHVtZSkge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xyXG4gICAgICAgIGlmIChhdWRpbykge1xyXG4gICAgICAgICAgICBhdWRpby5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdm9sdW1lIG9mIHRoZSBtdXNpYyBtYXggdmFsdWUgaXMgMS4wLHRoZSBtaW4gdmFsdWUgaXMgMC4wIC5cclxuICAgICAqICEjemgg6I635Y+W6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXHJcbiAgICAgKiBAbWV0aG9kIGdldFZvbHVtZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdm9sdW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0Vm9sdW1lKGlkKTtcclxuICAgICAqL1xyXG4gICAgZ2V0Vm9sdW1lOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xyXG4gICAgICAgIHJldHVybiBhdWRpbyA/IGF1ZGlvLmdldFZvbHVtZSgpIDogMTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCBjdXJyZW50IHRpbWVcclxuICAgICAqICEjemgg6K6+572u5b2T5YmN55qE6Z+z6aKR5pe26Ze044CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEN1cnJlbnRUaW1lXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNlYyAtIGN1cnJlbnQgdGltZS5cclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc2V0Q3VycmVudFRpbWUoaWQsIDIpO1xyXG4gICAgICovXHJcbiAgICBzZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKGF1ZGlvSUQsIHNlYykge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xyXG4gICAgICAgIGlmIChhdWRpbykge1xyXG4gICAgICAgICAgICBhdWRpby5zZXRDdXJyZW50VGltZShzZWMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgY3VycmVudCB0aW1lXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeeahOmfs+mikeaSreaUvuaXtumXtOOAglxyXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50VGltZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cclxuICAgICAqIEByZXR1cm4ge051bWJlcn0gYXVkaW8gY3VycmVudCB0aW1lLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB0aW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0Q3VycmVudFRpbWUoaWQpO1xyXG4gICAgICovXHJcbiAgICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcclxuICAgICAgICByZXR1cm4gYXVkaW8gPyBhdWRpby5nZXRDdXJyZW50VGltZSgpIDogMDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhdWRpbyBkdXJhdGlvblxyXG4gICAgICogISN6aCDojrflj5bpn7PpopHmgLvml7bplb/jgIJcclxuICAgICAqIEBtZXRob2QgZ2V0RHVyYXRpb25cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvIGR1cmF0aW9uLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB0aW1lID0gY2MuYXVkaW9FbmdpbmUuZ2V0RHVyYXRpb24oaWQpO1xyXG4gICAgICovXHJcbiAgICBnZXREdXJhdGlvbjogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcclxuICAgICAgICByZXR1cm4gYXVkaW8gPyBhdWRpby5nZXREdXJhdGlvbigpIDogMDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCBhdWRpbyBzdGF0ZVxyXG4gICAgICogISN6aCDojrflj5bpn7PpopHnirbmgIHjgIJcclxuICAgICAqIEBtZXRob2QgZ2V0U3RhdGVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXHJcbiAgICAgKiBAcmV0dXJuIHthdWRpb0VuZ2luZS5BdWRpb1N0YXRlfSBhdWRpbyBkdXJhdGlvbi5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgc3RhdGUgPSBjYy5hdWRpb0VuZ2luZS5nZXRTdGF0ZShpZCk7XHJcbiAgICAgKi9cclxuICAgIGdldFN0YXRlOiBmdW5jdGlvbiAoYXVkaW9JRCkge1xyXG4gICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGF1ZGlvSUQpO1xyXG4gICAgICAgIHJldHVybiBhdWRpbyA/IGF1ZGlvLmdldFN0YXRlKCkgOiB0aGlzLkF1ZGlvU3RhdGUuRVJST1I7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgQXVkaW8gZmluaXNoIGNhbGxiYWNrXHJcbiAgICAgKiAhI3poIOiuvue9ruS4gOS4qumfs+mikee7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICogQG1ldGhvZCBzZXRGaW5pc2hDYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBhdWRpbyBpZC5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gbG9hZGVkIGNhbGxiYWNrLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGlkLCBmdW5jdGlvbiAoKSB7fSk7XHJcbiAgICAgKi9cclxuICAgIHNldEZpbmlzaENhbGxiYWNrOiBmdW5jdGlvbiAoYXVkaW9JRCwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcclxuICAgICAgICBpZiAoIWF1ZGlvKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgYXVkaW8uX2ZpbmlzaENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXVzZSBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICogISN6aCDmmoLlgZzmraPlnKjmkq3mlL7pn7PpopHjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gVGhlIHJldHVybiB2YWx1ZSBvZiBmdW5jdGlvbiBwbGF5LlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnBhdXNlKGF1ZGlvSUQpO1xyXG4gICAgICovXHJcbiAgICBwYXVzZTogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcclxuICAgICAgICBpZiAoYXVkaW8pIHtcclxuICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfcGF1c2VJRENhY2hlOiBbXSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQYXVzZSBhbGwgcGxheWluZyBhdWRpb1xyXG4gICAgICogISN6aCDmmoLlgZznjrDlnKjmraPlnKjmkq3mlL7nmoTmiYDmnInpn7PpopHjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VBbGxcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xyXG4gICAgICovXHJcbiAgICBwYXVzZUFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGlkIGluIF9pZDJhdWRpbykge1xyXG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBfaWQyYXVkaW9baWRdO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IEF1ZGlvLlN0YXRlLlBMQVlJTkcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhdXNlSURDYWNoZS5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXN1bWUgcGxheWluZyBhdWRpby5cclxuICAgICAqICEjemgg5oGi5aSN5pKt5pS+5oyH5a6a55qE6Z+z6aKR44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBUaGUgcmV0dXJuIHZhbHVlIG9mIGZ1bmN0aW9uIHBsYXkuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lKGF1ZGlvSUQpO1xyXG4gICAgICovXHJcbiAgICByZXN1bWU6IGZ1bmN0aW9uIChhdWRpb0lEKSB7XHJcbiAgICAgICAgdmFyIGF1ZGlvID0gZ2V0QXVkaW9Gcm9tSWQoYXVkaW9JRCk7XHJcbiAgICAgICAgaWYgKGF1ZGlvKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlc3VtZSBhbGwgcGxheWluZyBhdWRpby5cclxuICAgICAqICEjemgg5oGi5aSN5pKt5pS+5omA5pyJ5LmL5YmN5pqC5YGc55qE5omA5pyJ6Z+z6aKR44CCXHJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZUFsbFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbCgpO1xyXG4gICAgICovXHJcbiAgICByZXN1bWVBbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3BhdXNlSURDYWNoZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLl9wYXVzZUlEQ2FjaGVbaV07XHJcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IGdldEF1ZGlvRnJvbUlkKGlkKTtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvKVxyXG4gICAgICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhdXNlSURDYWNoZS5sZW5ndGggPSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICogISN6aCDlgZzmraLmkq3mlL7mjIflrprpn7PpopHjgIJcclxuICAgICAqIEBtZXRob2Qgc3RvcFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGF1ZGlvSUQgLSBUaGUgcmV0dXJuIHZhbHVlIG9mIGZ1bmN0aW9uIHBsYXkuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc3RvcChhdWRpb0lEKTtcclxuICAgICAqL1xyXG4gICAgc3RvcDogZnVuY3Rpb24gKGF1ZGlvSUQpIHtcclxuICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChhdWRpb0lEKTtcclxuICAgICAgICBpZiAoYXVkaW8pIHtcclxuICAgICAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xyXG4gICAgICAgICAgICBhdWRpby5zdG9wKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFN0b3AgYWxsIHBsYXlpbmcgYXVkaW8uXHJcbiAgICAgKiAhI3poIOWBnOatouato+WcqOaSreaUvueahOaJgOaciemfs+mikeOAglxyXG4gICAgICogQG1ldGhvZCBzdG9wQWxsXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUuc3RvcEFsbCgpO1xyXG4gICAgICovXHJcbiAgICBzdG9wQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XHJcbiAgICAgICAgICAgIGlmIChhdWRpbykge1xyXG4gICAgICAgICAgICAgICAgLy8gU3RvcCB3aWxsIHJlY3ljbGUgYXVkaW8gYXV0b21hdGljYWxseSBieSBldmVudCBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IHVwIGFuIGF1ZGlvIGNhbiBnZW5lcmF0ZSBhIGZldyBleGFtcGxlcy5cclxuICAgICAqICEjemgg6K6+572u5LiA5Liq6Z+z6aKR5Y+v5Lul6K6+572u5Yeg5Liq5a6e5L6LXHJcbiAgICAgKiBAbWV0aG9kIHNldE1heEF1ZGlvSW5zdGFuY2VcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW0gLSBhIG51bWJlciBvZiBpbnN0YW5jZXMgdG8gYmUgY3JlYXRlZCBmcm9tIHdpdGhpbiBhbiBhdWRpb1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldE1heEF1ZGlvSW5zdGFuY2UoMjApO1xyXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuNC4wXHJcbiAgICAgKi9cclxuICAgIHNldE1heEF1ZGlvSW5zdGFuY2U6IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHtcclxuICAgICAgICAgICAgY2Mud2FybignU2luY2UgdjIuNC4wLCBtYXhBdWRpb0luc3RhbmNlIGhhcyBiZWNvbWUgYSByZWFkIG9ubHkgcHJvcGVydHkuXFxuJ1xyXG4gICAgICAgICAgICArICdhdWRpb0VuZ2luZS5zZXRNYXhBdWRpb0luc3RhbmNlKCkgbWV0aG9kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgZnV0dXJlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0dGluZyBhdWRpbyBjYW4gcHJvZHVjZSBzZXZlcmFsIGV4YW1wbGVzLlxyXG4gICAgICogISN6aCDojrflj5bkuIDkuKrpn7PpopHlj6/ku6Xorr7nva7lh6DkuKrlrp7kvotcclxuICAgICAqIEBtZXRob2QgZ2V0TWF4QXVkaW9JbnN0YW5jZVxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBtYXggbnVtYmVyIG9mIGluc3RhbmNlcyB0byBiZSBjcmVhdGVkIGZyb20gd2l0aGluIGFuIGF1ZGlvXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUuZ2V0TWF4QXVkaW9JbnN0YW5jZSgpO1xyXG4gICAgICovXHJcbiAgICBnZXRNYXhBdWRpb0luc3RhbmNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heEF1ZGlvSW5zdGFuY2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBVbmxvYWQgdGhlIHByZWxvYWRlZCBhdWRpbyBmcm9tIGludGVybmFsIGJ1ZmZlci5cclxuICAgICAqICEjemgg5Y246L296aKE5Yqg6L2955qE6Z+z6aKR44CCXHJcbiAgICAgKiBAbWV0aG9kIHVuY2FjaGVcclxuICAgICAqIEBwYXJhbSB7QXVkaW9DbGlwfSBjbGlwXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUudW5jYWNoZShmaWxlUGF0aCk7XHJcbiAgICAgKi9cclxuICAgIHVuY2FjaGU6IGZ1bmN0aW9uIChjbGlwKSB7XHJcbiAgICAgICAgdmFyIGZpbGVQYXRoID0gY2xpcDtcclxuICAgICAgICBpZiAodHlwZW9mIGNsaXAgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgc2luY2UgMS4xMFxyXG4gICAgICAgICAgICBjYy53YXJuSUQoODQwMSwgJ2NjLmF1ZGlvRW5naW5lJywgJ2NjLkF1ZGlvQ2xpcCcsICdBdWRpb0NsaXAnLCAnY2MuQXVkaW9DbGlwJywgJ2F1ZGlvJyk7XHJcbiAgICAgICAgICAgIGZpbGVQYXRoID0gY2xpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghY2xpcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbGVQYXRoID0gY2xpcC5uYXRpdmVVcmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbGlzdCA9IF91cmwyaWRbZmlsZVBhdGhdO1xyXG4gICAgICAgIGlmICghbGlzdCkgcmV0dXJuO1xyXG4gICAgICAgIHdoaWxlIChsaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gbGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdG9wIHdpbGwgcmVjeWNsZSBhdWRpbyBhdXRvbWF0aWNhbGx5IGJ5IGV2ZW50IGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICBhdWRpby5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgX2lkMmF1ZGlvW2lkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFVubG9hZCBhbGwgYXVkaW8gZnJvbSBpbnRlcm5hbCBidWZmZXIuXHJcbiAgICAgKiAhI3poIOWNuOi9veaJgOaciemfs+mikeOAglxyXG4gICAgICogQG1ldGhvZCB1bmNhY2hlQWxsXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUudW5jYWNoZUFsbCgpO1xyXG4gICAgICovXHJcbiAgICB1bmNhY2hlQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxsKCk7XHJcbiAgICAgICAgbGV0IGF1ZGlvO1xyXG4gICAgICAgIGZvciAobGV0IGlkIGluIF9pZDJhdWRpbykge1xyXG4gICAgICAgICAgICBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XHJcbiAgICAgICAgICAgIGlmIChhdWRpbykge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdoaWxlIChhdWRpbyA9IF9hdWRpb1Bvb2wucG9wKCkpIHtcclxuICAgICAgICAgICAgYXVkaW8uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfaWQyYXVkaW8gPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XHJcbiAgICAgICAgX3VybDJpZCA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBfYnJlYWtDYWNoZTogbnVsbCxcclxuICAgIF9icmVhazogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2JyZWFrQ2FjaGUgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBfaWQyYXVkaW8pIHtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0gYXVkaW8uZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBBdWRpby5TdGF0ZS5QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9icmVha0NhY2hlLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3Jlc3RvcmU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2JyZWFrQ2FjaGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2JyZWFrQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgaWQgPSB0aGlzLl9icmVha0NhY2hlLnBvcCgpO1xyXG4gICAgICAgICAgICB2YXIgYXVkaW8gPSBnZXRBdWRpb0Zyb21JZChpZCk7XHJcbiAgICAgICAgICAgIGlmIChhdWRpbyAmJiBhdWRpby5yZXN1bWUpXHJcbiAgICAgICAgICAgICAgICBhdWRpby5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYnJlYWtDYWNoZSA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIENsYXNzaWZpY2F0aW9uIG9mIGludGVyZmFjZVxyXG5cclxuICAgIF9tdXNpYzoge1xyXG4gICAgICAgIGlkOiAtMSxcclxuICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICB2b2x1bWU6IDEsXHJcbiAgICB9LFxyXG5cclxuICAgIF9lZmZlY3Q6IHtcclxuICAgICAgICB2b2x1bWU6IDEsXHJcbiAgICAgICAgcGF1c2VDYWNoZTogW10sXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBQbGF5IGJhY2tncm91bmQgbXVzaWNcclxuICAgICAqICEjemgg5pKt5pS+6IOM5pmv6Z+z5LmQXHJcbiAgICAgKiBAbWV0aG9kIHBsYXlNdXNpY1xyXG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXB9IGNsaXAgLSBUaGUgYXVkaW8gY2xpcCB0byBwbGF5LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wIC0gV2hldGhlciB0aGUgbXVzaWMgbG9vcCBvciBub3QuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvSWRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZChwYXRoLCBjYy5BdWRpb0NsaXAsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcclxuICAgICAqICAgICB2YXIgYXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhjbGlwLCBmYWxzZSk7XHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG4gICAgcGxheU11c2ljOiBmdW5jdGlvbiAoY2xpcCwgbG9vcCkge1xyXG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMuX211c2ljO1xyXG4gICAgICAgIHRoaXMuc3RvcChtdXNpYy5pZCk7XHJcbiAgICAgICAgbXVzaWMuaWQgPSB0aGlzLnBsYXkoY2xpcCwgbG9vcCwgbXVzaWMudm9sdW1lKTtcclxuICAgICAgICBtdXNpYy5sb29wID0gbG9vcDtcclxuICAgICAgICByZXR1cm4gbXVzaWMuaWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdG9wIGJhY2tncm91bmQgbXVzaWMuXHJcbiAgICAgKiAhI3poIOWBnOatouaSreaUvuiDjOaZr+mfs+S5kOOAglxyXG4gICAgICogQG1ldGhvZCBzdG9wTXVzaWNcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcclxuICAgICAqL1xyXG4gICAgc3RvcE11c2ljOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKHRoaXMuX211c2ljLmlkKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBhdXNlIHRoZSBiYWNrZ3JvdW5kIG11c2ljLlxyXG4gICAgICogISN6aCDmmoLlgZzmkq3mlL7og4zmma/pn7PkuZDjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VNdXNpY1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcclxuICAgICAqL1xyXG4gICAgcGF1c2VNdXNpYzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucGF1c2UodGhpcy5fbXVzaWMuaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy5pZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlc3VtZSBwbGF5aW5nIGJhY2tncm91bmQgbXVzaWMuXHJcbiAgICAgKiAhI3poIOaBouWkjeaSreaUvuiDjOaZr+mfs+S5kOOAglxyXG4gICAgICogQG1ldGhvZCByZXN1bWVNdXNpY1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnJlc3VtZU11c2ljKCk7XHJcbiAgICAgKi9cclxuICAgIHJlc3VtZU11c2ljOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bWUodGhpcy5fbXVzaWMuaWQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy5pZDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdldCB0aGUgdm9sdW1lKDAuMCB+IDEuMCkuXHJcbiAgICAgKiAhI3poIOiOt+WPlumfs+mHj++8iDAuMCB+IDEuMO+8ieOAglxyXG4gICAgICogQG1ldGhvZCBnZXRNdXNpY1ZvbHVtZVxyXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB2b2x1bWUgPSBjYy5hdWRpb0VuZ2luZS5nZXRNdXNpY1ZvbHVtZSgpO1xyXG4gICAgICovXHJcbiAgICBnZXRNdXNpY1ZvbHVtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tdXNpYy52b2x1bWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTZXQgdGhlIGJhY2tncm91bmQgbXVzaWMgdm9sdW1lLlxyXG4gICAgICogISN6aCDorr7nva7og4zmma/pn7PkuZDpn7Pph4/vvIgwLjAgfiAxLjDvvInjgIJcclxuICAgICAqIEBtZXRob2Qgc2V0TXVzaWNWb2x1bWVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgbXVzdCBiZSBpbiAwLjB+MS4wLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKDAuNSk7XHJcbiAgICAgKi9cclxuICAgIHNldE11c2ljVm9sdW1lOiBmdW5jdGlvbiAodm9sdW1lKSB7XHJcbiAgICAgICAgdm9sdW1lID0gaGFuZGxlVm9sdW1lKHZvbHVtZSk7XHJcbiAgICAgICAgdmFyIG11c2ljID0gdGhpcy5fbXVzaWM7XHJcbiAgICAgICAgbXVzaWMudm9sdW1lID0gdm9sdW1lO1xyXG4gICAgICAgIHRoaXMuc2V0Vm9sdW1lKG11c2ljLmlkLCBtdXNpYy52b2x1bWUpO1xyXG4gICAgICAgIHJldHVybiBtdXNpYy52b2x1bWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBCYWNrZ3JvdW5kIG11c2ljIHBsYXlpbmcgc3RhdGVcclxuICAgICAqICEjemgg6IOM5pmv6Z+z5LmQ5piv5ZCm5q2j5Zyo5pKt5pS+XHJcbiAgICAgKiBAbWV0aG9kIGlzTXVzaWNQbGF5aW5nXHJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCk7XHJcbiAgICAgKi9cclxuICAgIGlzTXVzaWNQbGF5aW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGUodGhpcy5fbXVzaWMuaWQpID09PSB0aGlzLkF1ZGlvU3RhdGUuUExBWUlORztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBsYXkgZWZmZWN0IGF1ZGlvLlxyXG4gICAgICogISN6aCDmkq3mlL7pn7PmlYhcclxuICAgICAqIEBtZXRob2QgcGxheUVmZmVjdFxyXG4gICAgICogQHBhcmFtIHtBdWRpb0NsaXB9IGNsaXAgLSBUaGUgYXVkaW8gY2xpcCB0byBwbGF5LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wIC0gV2hldGhlciB0aGUgbXVzaWMgbG9vcCBvciBub3QuXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGF1ZGlvSWRcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5yZXNvdXJjZXMubG9hZChwYXRoLCBjYy5BdWRpb0NsaXAsIG51bGwsIGZ1bmN0aW9uIChlcnIsIGNsaXApIHtcclxuICAgICAqICAgICB2YXIgYXVkaW9JRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCwgZmFsc2UpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKi9cclxuICAgIHBsYXlFZmZlY3Q6IGZ1bmN0aW9uIChjbGlwLCBsb29wKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheShjbGlwLCBsb29wIHx8IGZhbHNlLCB0aGlzLl9lZmZlY3Qudm9sdW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNldCB0aGUgdm9sdW1lIG9mIGVmZmVjdCBhdWRpby5cclxuICAgICAqICEjemgg6K6+572u6Z+z5pWI6Z+z6YeP77yIMC4wIH4gMS4w77yJ44CCXHJcbiAgICAgKiBAbWV0aG9kIHNldEVmZmVjdHNWb2x1bWVcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2b2x1bWUgLSBWb2x1bWUgbXVzdCBiZSBpbiAwLjB+MS4wLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnNldEVmZmVjdHNWb2x1bWUoMC41KTtcclxuICAgICAqL1xyXG4gICAgc2V0RWZmZWN0c1ZvbHVtZTogZnVuY3Rpb24gKHZvbHVtZSkge1xyXG4gICAgICAgIHZvbHVtZSA9IGhhbmRsZVZvbHVtZSh2b2x1bWUpO1xyXG4gICAgICAgIHZhciBtdXNpY0lkID0gdGhpcy5fbXVzaWMuaWQ7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICBmb3IgKHZhciBpZCBpbiBfaWQyYXVkaW8pIHtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcclxuICAgICAgICAgICAgaWYgKCFhdWRpbyB8fCBhdWRpby5pZCA9PT0gbXVzaWNJZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGF1ZGlvRW5naW5lLnNldFZvbHVtZShpZCwgdm9sdW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdm9sdW1lIG9mIHRoZSBlZmZlY3QgYXVkaW8gbWF4IHZhbHVlIGlzIDEuMCx0aGUgbWluIHZhbHVlIGlzIDAuMCAuXHJcbiAgICAgKiAhI3poIOiOt+WPlumfs+aViOmfs+mHj++8iDAuMCB+IDEuMO+8ieOAglxyXG4gICAgICogQG1ldGhvZCBnZXRFZmZlY3RzVm9sdW1lXHJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHZvbHVtZSA9IGNjLmF1ZGlvRW5naW5lLmdldEVmZmVjdHNWb2x1bWUoKTtcclxuICAgICAqL1xyXG4gICAgZ2V0RWZmZWN0c1ZvbHVtZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lZmZlY3Qudm9sdW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGF1c2UgZWZmZWN0IGF1ZGlvLlxyXG4gICAgICogISN6aCDmmoLlgZzmkq3mlL7pn7PmlYjjgIJcclxuICAgICAqIEBtZXRob2QgcGF1c2VFZmZlY3RcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhdWRpb0lEIC0gYXVkaW8gaWQuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUucGF1c2VFZmZlY3QoYXVkaW9JRCk7XHJcbiAgICAgKi9cclxuICAgIHBhdXNlRWZmZWN0OiBmdW5jdGlvbiAoYXVkaW9JRCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhdXNlKGF1ZGlvSUQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIGFsbCB0aGUgc291bmQgZWZmZWN0cy5cclxuICAgICAqICEjemgg5pqC5YGc5pKt5pS+5omA5pyJ6Z+z5pWI44CCXHJcbiAgICAgKiBAbWV0aG9kIHBhdXNlQWxsRWZmZWN0c1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnBhdXNlQWxsRWZmZWN0cygpO1xyXG4gICAgICovXHJcbiAgICBwYXVzZUFsbEVmZmVjdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbXVzaWNJZCA9IHRoaXMuX211c2ljLmlkO1xyXG4gICAgICAgIHZhciBlZmZlY3QgPSB0aGlzLl9lZmZlY3Q7XHJcbiAgICAgICAgZWZmZWN0LnBhdXNlQ2FjaGUubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XHJcbiAgICAgICAgICAgIGlmICghYXVkaW8gfHwgYXVkaW8uaWQgPT09IG11c2ljSWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMuQXVkaW9TdGF0ZS5QTEFZSU5HKSB7XHJcbiAgICAgICAgICAgICAgICBlZmZlY3QucGF1c2VDYWNoZS5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXN1bWUgZWZmZWN0IGF1ZGlvLlxyXG4gICAgICogISN6aCDmgaLlpI3mkq3mlL7pn7PmlYjpn7PpopHjgIJcclxuICAgICAqIEBtZXRob2QgcmVzdW1lRWZmZWN0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIFRoZSByZXR1cm4gdmFsdWUgb2YgZnVuY3Rpb24gcGxheS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5yZXN1bWVFZmZlY3QoYXVkaW9JRCk7XHJcbiAgICAgKi9cclxuICAgIHJlc3VtZUVmZmVjdDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bWUoaWQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUmVzdW1lIGFsbCBlZmZlY3QgYXVkaW8uXHJcbiAgICAgKiAhI3poIOaBouWkjeaSreaUvuaJgOacieS5i+WJjeaaguWBnOeahOmfs+aViOOAglxyXG4gICAgICogQG1ldGhvZCByZXN1bWVBbGxFZmZlY3RzXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsRWZmZWN0cygpO1xyXG4gICAgICovXHJcbiAgICByZXN1bWVBbGxFZmZlY3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBhdXNlSURDYWNoZSA9IHRoaXMuX2VmZmVjdC5wYXVzZUNhY2hlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF1c2VJRENhY2hlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IHBhdXNlSURDYWNoZVtpXTtcclxuICAgICAgICAgICAgdmFyIGF1ZGlvID0gX2lkMmF1ZGlvW2lkXTtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvKVxyXG4gICAgICAgICAgICAgICAgYXVkaW8ucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU3RvcCBwbGF5aW5nIHRoZSBlZmZlY3QgYXVkaW8uXHJcbiAgICAgKiAhI3poIOWBnOatouaSreaUvumfs+aViOOAglxyXG4gICAgICogQG1ldGhvZCBzdG9wRWZmZWN0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXVkaW9JRCAtIGF1ZGlvIGlkLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGNjLmF1ZGlvRW5naW5lLnN0b3BFZmZlY3QoaWQpO1xyXG4gICAgICovXHJcbiAgICBzdG9wRWZmZWN0OiBmdW5jdGlvbiAoYXVkaW9JRCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3AoYXVkaW9JRCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTdG9wIHBsYXlpbmcgYWxsIHRoZSBlZmZlY3RzLlxyXG4gICAgICogISN6aCDlgZzmraLmkq3mlL7miYDmnInpn7PmlYjjgIJcclxuICAgICAqIEBtZXRob2Qgc3RvcEFsbEVmZmVjdHNcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsRWZmZWN0cygpO1xyXG4gICAgICovXHJcbiAgICBzdG9wQWxsRWZmZWN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBtdXNpY0lkID0gdGhpcy5fbXVzaWMuaWQ7XHJcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gX2lkMmF1ZGlvKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWRpbyA9IF9pZDJhdWRpb1tpZF07XHJcbiAgICAgICAgICAgIGlmICghYXVkaW8gfHwgYXVkaW8uaWQgPT09IG11c2ljSWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBhdWRpby5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IGF1ZGlvRW5naW5lLkF1ZGlvU3RhdGUuUExBWUlORykge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5hdWRpb0VuZ2luZSA9IGF1ZGlvRW5naW5lO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==