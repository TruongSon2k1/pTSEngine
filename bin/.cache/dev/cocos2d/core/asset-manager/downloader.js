
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/downloader.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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

/**
 * @module cc.AssetManager
 */
var js = require('../platform/js');

var debug = require('../CCDebug');

var _require = require('./font-loader'),
    loadFont = _require.loadFont;

var callInNextTick = require('../platform/utils').callInNextTick;

var downloadDomImage = require('./download-dom-image');

var downloadDomAudio = require('./download-dom-audio');

var downloadFile = require('./download-file');

var downloadScript = require('./download-script.js');

var Cache = require('./cache');

var _require2 = require('./shared'),
    files = _require2.files;

var _require3 = require('../platform/CCSys'),
    __audioSupport = _require3.__audioSupport,
    capabilities = _require3.capabilities;

var _require4 = require('./utilities'),
    urlAppendTimestamp = _require4.urlAppendTimestamp,
    retry = _require4.retry;

var REGEX = /^(?:\w+:\/\/|\.+\/).+/;
var formatSupport = __audioSupport.format || [];

var unsupported = function unsupported(url, options, onComplete) {
  onComplete(new Error(debug.getError(4927)));
};

var downloadAudio = function downloadAudio(url, options, onComplete) {
  // web audio need to download file as arrayBuffer
  if (options.audioLoadMode !== cc.AudioClip.LoadMode.DOM_AUDIO) {
    downloadArrayBuffer(url, options, onComplete);
  } else {
    downloadDomAudio(url, options, onComplete);
  }
};

var downloadAudio = !CC_EDITOR || !Editor.isMainProcess ? formatSupport.length === 0 ? unsupported : __audioSupport.WEB_AUDIO ? downloadAudio : downloadDomAudio : null;

var downloadImage = function downloadImage(url, options, onComplete) {
  // if createImageBitmap is valid, we can transform blob to ImageBitmap. Otherwise, just use HTMLImageElement to load
  var func = capabilities.imageBitmap && cc.macro.ALLOW_IMAGE_BITMAP ? downloadBlob : downloadDomImage;
  func.apply(this, arguments);
};

var downloadBlob = function downloadBlob(url, options, onComplete) {
  options.responseType = "blob";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadJson = function downloadJson(url, options, onComplete) {
  options.responseType = "json";
  downloadFile(url, options, options.onFileProgress, function (err, data) {
    if (!err && typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        err = e;
      }
    }

    onComplete && onComplete(err, data);
  });
};

var downloadArrayBuffer = function downloadArrayBuffer(url, options, onComplete) {
  options.responseType = "arraybuffer";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadText = function downloadText(url, options, onComplete) {
  options.responseType = "text";
  downloadFile(url, options, options.onFileProgress, onComplete);
};

var downloadVideo = function downloadVideo(url, options, onComplete) {
  onComplete(null, url);
};

var downloadBundle = function downloadBundle(nameOrUrl, options, onComplete) {
  var bundleName = cc.path.basename(nameOrUrl);
  var url = nameOrUrl;
  if (!REGEX.test(url)) url = 'assets/' + bundleName;
  var version = options.version || downloader.bundleVers[bundleName];
  var count = 0;
  var config = url + "/config." + (version ? version + '.' : '') + "json";
  var out = null,
      error = null;
  downloadJson(config, options, function (err, response) {
    if (err) {
      error = err;
    }

    out = response;
    out && (out.base = url + '/');
    count++;

    if (count === 2) {
      onComplete(error, out);
    }
  });
  var js = url + "/index." + (version ? version + '.' : '') + "js";
  downloadScript(js, options, function (err) {
    if (err) {
      error = err;
    }

    count++;

    if (count === 2) {
      onComplete(error, out);
    }
  });
};

var _downloading = new Cache();

var _queue = [];
var _queueDirty = false; // the number of loading thread

var _totalNum = 0; // the number of request that launched in this period

var _totalNumThisPeriod = 0; // last time, if now - lastTime > period, refresh _totalNumThisPeriod.

var _lastDate = -1; // if _totalNumThisPeriod equals max, move request to next period using setTimeOut.


var _checkNextPeriod = false;

var updateTime = function updateTime() {
  var now = Date.now(); // use deltaTime as interval

  var interval = cc.director._deltaTime > downloader._maxInterval ? downloader._maxInterval : cc.director._deltaTime;

  if (now - _lastDate > interval * 1000) {
    _totalNumThisPeriod = 0;
    _lastDate = now;
  }
}; // handle the rest request in next period


var handleQueue = function handleQueue(maxConcurrency, maxRequestsPerFrame) {
  _checkNextPeriod = false;
  updateTime();

  while (_queue.length > 0 && _totalNum < maxConcurrency && _totalNumThisPeriod < maxRequestsPerFrame) {
    if (_queueDirty) {
      _queue.sort(function (a, b) {
        return a.priority - b.priority;
      });

      _queueDirty = false;
    }

    var nextOne = _queue.pop();

    if (!nextOne) {
      break;
    }

    _totalNum++;
    _totalNumThisPeriod++;
    nextOne.invoke();
  }

  if (_queue.length > 0 && _totalNum < maxConcurrency) {
    callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
    _checkNextPeriod = true;
  }
};
/**
 * !#en
 * Control all download process, it is a singleton. All member can be accessed with `cc.assetManager.downloader` , it can download several types of files:
 * 1. Text
 * 2. Image
 * 3. Audio
 * 4. Assets
 * 5. Scripts
 * 
 * !#zh
 * 管理所有下载过程，downloader 是个单例，所有成员能通过 `cc.assetManager.downloader` 访问，它能下载以下几种类型的文件：
 * 1. 文本
 * 2. 图片
 * 3. 音频
 * 4. 资源
 * 5. 脚本
 * 
 * @class Downloader
 */


var downloader = {
  _remoteServerAddress: '',
  _maxInterval: 1 / 30,

  /**
   * !#en 
   * The address of remote server
   * 
   * !#zh
   * 远程服务器地址
   * 
   * @property remoteServerAddress
   * @type {string}
   * @default ''
   */
  get remoteServerAddress() {
    return this._remoteServerAddress;
  },

  /**
   * !#en 
   * The maximum number of concurrent when downloading
   * 
   * !#zh
   * 下载时的最大并发数
   * 
   * @property maxConcurrency
   * @type {number}
   * @default 6
   */
  maxConcurrency: 6,

  /**
   * !#en 
   * The maximum number of request can be launched per frame when downloading
   * 
   * !#zh
   * 下载时每帧可以启动的最大请求数
   * 
   * @property maxRequestsPerFrame
   * @type {number}
   * @default 6
   */
  maxRequestsPerFrame: 6,

  /**
   * !#en
   * The max number of retries when fail
   *  
   * !#zh
   * 失败重试次数
   * 
   * @property maxRetryCount
   * @type {Number}
   */
  maxRetryCount: 3,
  appendTimeStamp: false,
  limited: true,

  /**
   * !#en
   * Wait for while before another retry, unit: ms
   * 
   * !#zh
   * 重试的间隔时间
   * 
   * @property retryInterval
   * @type {Number}
   */
  retryInterval: 2000,
  bundleVers: null,

  /*
   * !#en
   * Use Image element to download image
   *  
   * !#zh
   * 使用 Image 元素来下载图片
   * 
   * @method downloadDomImage
   * @param {string} url - Url of the image
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [onComplete] - Callback when image loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {HTMLImageElement} onComplete.img - The loaded Image element, null if error occurred
   * @returns {HTMLImageElement} The image element
   * 
   * @example
   * downloadDomImage('http://example.com/test.jpg', null, (err, img) => console.log(err));
   * 
   * @typescript
   * downloadDomImage(url: string, options?: Record<string, any> , onComplete?: (err: Error, img: HTMLImageElement) => void): HTMLImageElement
   * downloadDomImage(url: string, onComplete?: (err: Error, img: HTMLImageElement) => void): HTMLImageElement
   */
  downloadDomImage: downloadDomImage,

  /*
   * !#en
   * Use audio element to download audio
   * 
   * !#zh
   * 使用 Audio 元素来下载音频 
   * 
   * @method downloadDomAudio
   * @param {string} url - Url of the audio
   * @param {Object} [options] - Some optional paramters
   * @param {Function} [onComplete] - Callback invoked when audio loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {HTMLAudioElement} onComplete.audio - The loaded audio element, null if error occurred
   * @returns {HTMLAudioElement} The audio element
   * 
   * @example
   * downloadDomAudio('http://example.com/test.mp3', null, (err, audio) => console.log(err));
   * 
   * @typescript
   * downloadDomAudio(url: string, options?: Record<string, any>, onComplete?: (err: Error, audio: HTMLAudioElement) => void): HTMLAudioElement
   * downloadDomAudio(url: string, onComplete?: (err: Error, audio: HTMLAudioElement) => void): HTMLAudioElement
   */
  downloadDomAudio: downloadDomAudio,

  /*
   * !#en
   * Use XMLHttpRequest to download file
   * 
   * !#zh
   * 使用 XMLHttpRequest 来下载文件
   * 
   * @method downloadFile
   * @param {string} url - Url of the file
   * @param {Object} [options] - Some optional paramters
   * @param {string} [options.responseType] - Indicate which type of content should be returned
   * @param {boolean} [options.withCredentials] - Indicate whether or not cross-site Access-Contorl requests should be made using credentials
   * @param {string} [options.mimeType] - Indicate which type of content should be returned. In some browsers, responseType does't work, you can use mimeType instead
   * @param {Number} [options.timeout] - Represent the number of ms a request can take before being terminated.
   * @param {Object} [options.header] - The header should be tranferred to server
   * @param {Function} [onFileProgress] - Callback continuously during download is processing
   * @param {Number} onFileProgress.loaded - Size of downloaded content.
   * @param {Number} onFileProgress.total - Total size of content.
   * @param {Function} [onComplete] - Callback when file loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.response - The loaded content, null if error occurred, type of content can be indicated by options.responseType
   * @returns {XMLHttpRequest} The xhr to be send
   * 
   * @example
   * downloadFile('http://example.com/test.bin', {responseType: 'arraybuffer'}, null, (err, arrayBuffer) => console.log(err));
   * 
   * @typescript
   * downloadFile(url: string, options?: Record<string, any>, onFileProgress?: (loaded: Number, total: Number) => void, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, onFileProgress?: (loaded: Number, total: Number) => void, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, options?: Record<string, any>, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   * downloadFile(url: string, onComplete?: (err: Error, response: any) => void): XMLHttpRequest
   */
  downloadFile: downloadFile,

  /*
   * !#en
   * Load script 
   * 
   * !#zh
   * 加载脚本
   * 
   * @method downloadScript
   * @param {string} url - Url of the script
   * @param {Object} [options] - Some optional paramters
   * @param {boolean} [options.isAsync] - Indicate whether or not loading process should be async
   * @param {Function} [onComplete] - Callback when script loaded or failed
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * 
   * @example
   * downloadScript('http://localhost:8080/index.js', null, (err) => console.log(err));
   * 
   * @typescript
   * downloadScript(url: string, options?: Record<string, any>, onComplete?: (err: Error) => void): void
   * downloadScript(url: string, onComplete?: (err: Error) => void): void
   */
  downloadScript: downloadScript,
  init: function init(bundleVers, remoteServerAddress) {
    _downloading.clear();

    _queue.length = 0;
    this._remoteServerAddress = remoteServerAddress || '';
    this.bundleVers = bundleVers || Object.create(null);
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend downloader to download other format file
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 downloader 来下载其他格式文件时可以注册自定义的 handler 
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
   * @param {Function} [handler] - handler
   * @param {string} handler.url - url
   * @param {Object} handler.options - some optional paramters will be transferred to handler.
   * @param {Function} handler.onComplete - callback when finishing downloading
   * 
   * @example
   * downloader.register('.tga', (url, options, onComplete) => onComplete(null, null));
   * downloader.register({'.tga': (url, options, onComplete) => onComplete(null, null), '.ext': (url, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (url: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void): void
   * register(map: Record<string, (url: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(downloaders, type);
    } else {
      downloaders[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to download file under limitation 
   * 
   * !#zh
   * 在限制下使用对应的 handler 来下载文件
   * 
   * @method download
   * @param {string} url - The url should be downloaded
   * @param {string} type - The type indicates that which handler should be used to download, such as '.jpg'
   * @param {Object} options - some optional paramters will be transferred to the corresponding handler.
   * @param {Function} [options.onFileProgress] - progressive callback will be transferred to handler.
   * @param {Number} [options.maxRetryCount] - How many times should retry when download failed
   * @param {Number} [options.maxConcurrency] - The maximum number of concurrent when downloading
   * @param {Number} [options.maxRequestsPerFrame] - The maximum number of request can be launched per frame when downloading
   * @param {Number} [options.priority] - The priority of this url, default is 0, the greater number is higher priority.
   * @param {Function} onComplete - callback when finishing downloading
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.contetnt - The downloaded file
   * 
   * @example
   * download('http://example.com/test.tga', '.tga', {onFileProgress: (loaded, total) => console.lgo(loaded/total)}, onComplete: (err) => console.log(err));
   * 
   * @typescript
   * download(id: string, url: string, type: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void): void
   */
  download: function download(id, url, type, options, onComplete) {
    var func = downloaders[type] || downloaders['default'];
    var self = this; // if it is downloaded, don't download again

    var file, downloadCallbacks;

    if (file = files.get(id)) {
      onComplete(null, file);
    } else if (downloadCallbacks = _downloading.get(id)) {
      downloadCallbacks.push(onComplete);

      for (var i = 0, l = _queue.length; i < l; i++) {
        var item = _queue[i];

        if (item.id === id) {
          var priority = options.priority || 0;

          if (item.priority < priority) {
            item.priority = priority;
            _queueDirty = true;
          }

          return;
        }
      }
    } else {
      var process = function process(index, callback) {
        if (index === 0) {
          _downloading.add(id, [onComplete]);
        }

        if (!self.limited) return func(urlAppendTimestamp(url), options, callback); // refresh

        updateTime();

        function invoke() {
          func(urlAppendTimestamp(url), options, function () {
            // when finish downloading, update _totalNum
            _totalNum--;

            if (!_checkNextPeriod && _queue.length > 0) {
              callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
              _checkNextPeriod = true;
            }

            callback.apply(this, arguments);
          });
        }

        if (_totalNum < maxConcurrency && _totalNumThisPeriod < maxRequestsPerFrame) {
          invoke();
          _totalNum++;
          _totalNumThisPeriod++;
        } else {
          // when number of request up to limitation, cache the rest
          _queue.push({
            id: id,
            priority: options.priority || 0,
            invoke: invoke
          });

          _queueDirty = true;

          if (!_checkNextPeriod && _totalNum < maxConcurrency) {
            callInNextTick(handleQueue, maxConcurrency, maxRequestsPerFrame);
            _checkNextPeriod = true;
          }
        }
      }; // when retry finished, invoke callbacks


      var finale = function finale(err, result) {
        if (!err) files.add(id, result);

        var callbacks = _downloading.remove(id);

        for (var _i = 0, _l = callbacks.length; _i < _l; _i++) {
          callbacks[_i](err, result);
        }
      };

      // if download fail, should retry
      var maxRetryCount = typeof options.maxRetryCount !== 'undefined' ? options.maxRetryCount : this.maxRetryCount;
      var maxConcurrency = typeof options.maxConcurrency !== 'undefined' ? options.maxConcurrency : this.maxConcurrency;
      var maxRequestsPerFrame = typeof options.maxRequestsPerFrame !== 'undefined' ? options.maxRequestsPerFrame : this.maxRequestsPerFrame;
      retry(process, maxRetryCount, this.retryInterval, finale);
    }
  }
}; // dafault handler map

var downloaders = {
  // Images
  '.png': downloadImage,
  '.jpg': downloadImage,
  '.bmp': downloadImage,
  '.jpeg': downloadImage,
  '.gif': downloadImage,
  '.ico': downloadImage,
  '.tiff': downloadImage,
  '.webp': downloadImage,
  '.image': downloadImage,
  '.pvr': downloadArrayBuffer,
  '.pkm': downloadArrayBuffer,
  // Audio
  '.mp3': downloadAudio,
  '.ogg': downloadAudio,
  '.wav': downloadAudio,
  '.m4a': downloadAudio,
  // Txt
  '.txt': downloadText,
  '.xml': downloadText,
  '.vsh': downloadText,
  '.fsh': downloadText,
  '.atlas': downloadText,
  '.tmx': downloadText,
  '.tsx': downloadText,
  '.json': downloadJson,
  '.ExportJson': downloadJson,
  '.plist': downloadText,
  '.fnt': downloadText,
  // font
  '.font': loadFont,
  '.eot': loadFont,
  '.ttf': loadFont,
  '.woff': loadFont,
  '.svg': loadFont,
  '.ttc': loadFont,
  // Video
  '.mp4': downloadVideo,
  '.avi': downloadVideo,
  '.mov': downloadVideo,
  '.mpg': downloadVideo,
  '.mpeg': downloadVideo,
  '.rm': downloadVideo,
  '.rmvb': downloadVideo,
  // Binary
  '.binary': downloadArrayBuffer,
  '.bin': downloadArrayBuffer,
  '.dbbin': downloadArrayBuffer,
  '.skel': downloadArrayBuffer,
  '.js': downloadScript,
  'bundle': downloadBundle,
  'default': downloadText
};
downloader._downloaders = downloaders;
module.exports = downloader;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGRvd25sb2FkZXIuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiZGVidWciLCJsb2FkRm9udCIsImNhbGxJbk5leHRUaWNrIiwiZG93bmxvYWREb21JbWFnZSIsImRvd25sb2FkRG9tQXVkaW8iLCJkb3dubG9hZEZpbGUiLCJkb3dubG9hZFNjcmlwdCIsIkNhY2hlIiwiZmlsZXMiLCJfX2F1ZGlvU3VwcG9ydCIsImNhcGFiaWxpdGllcyIsInVybEFwcGVuZFRpbWVzdGFtcCIsInJldHJ5IiwiUkVHRVgiLCJmb3JtYXRTdXBwb3J0IiwiZm9ybWF0IiwidW5zdXBwb3J0ZWQiLCJ1cmwiLCJvcHRpb25zIiwib25Db21wbGV0ZSIsIkVycm9yIiwiZ2V0RXJyb3IiLCJkb3dubG9hZEF1ZGlvIiwiYXVkaW9Mb2FkTW9kZSIsImNjIiwiQXVkaW9DbGlwIiwiTG9hZE1vZGUiLCJET01fQVVESU8iLCJkb3dubG9hZEFycmF5QnVmZmVyIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsImxlbmd0aCIsIldFQl9BVURJTyIsImRvd25sb2FkSW1hZ2UiLCJmdW5jIiwiaW1hZ2VCaXRtYXAiLCJtYWNybyIsIkFMTE9XX0lNQUdFX0JJVE1BUCIsImRvd25sb2FkQmxvYiIsImFwcGx5IiwiYXJndW1lbnRzIiwicmVzcG9uc2VUeXBlIiwib25GaWxlUHJvZ3Jlc3MiLCJkb3dubG9hZEpzb24iLCJlcnIiLCJkYXRhIiwiSlNPTiIsInBhcnNlIiwiZSIsImRvd25sb2FkVGV4dCIsImRvd25sb2FkVmlkZW8iLCJkb3dubG9hZEJ1bmRsZSIsIm5hbWVPclVybCIsImJ1bmRsZU5hbWUiLCJwYXRoIiwiYmFzZW5hbWUiLCJ0ZXN0IiwidmVyc2lvbiIsImRvd25sb2FkZXIiLCJidW5kbGVWZXJzIiwiY291bnQiLCJjb25maWciLCJvdXQiLCJlcnJvciIsInJlc3BvbnNlIiwiYmFzZSIsIl9kb3dubG9hZGluZyIsIl9xdWV1ZSIsIl9xdWV1ZURpcnR5IiwiX3RvdGFsTnVtIiwiX3RvdGFsTnVtVGhpc1BlcmlvZCIsIl9sYXN0RGF0ZSIsIl9jaGVja05leHRQZXJpb2QiLCJ1cGRhdGVUaW1lIiwibm93IiwiRGF0ZSIsImludGVydmFsIiwiZGlyZWN0b3IiLCJfZGVsdGFUaW1lIiwiX21heEludGVydmFsIiwiaGFuZGxlUXVldWUiLCJtYXhDb25jdXJyZW5jeSIsIm1heFJlcXVlc3RzUGVyRnJhbWUiLCJzb3J0IiwiYSIsImIiLCJwcmlvcml0eSIsIm5leHRPbmUiLCJwb3AiLCJpbnZva2UiLCJfcmVtb3RlU2VydmVyQWRkcmVzcyIsInJlbW90ZVNlcnZlckFkZHJlc3MiLCJtYXhSZXRyeUNvdW50IiwiYXBwZW5kVGltZVN0YW1wIiwibGltaXRlZCIsInJldHJ5SW50ZXJ2YWwiLCJpbml0IiwiY2xlYXIiLCJPYmplY3QiLCJjcmVhdGUiLCJyZWdpc3RlciIsInR5cGUiLCJoYW5kbGVyIiwibWl4aW4iLCJkb3dubG9hZGVycyIsImRvd25sb2FkIiwiaWQiLCJzZWxmIiwiZmlsZSIsImRvd25sb2FkQ2FsbGJhY2tzIiwiZ2V0IiwicHVzaCIsImkiLCJsIiwiaXRlbSIsInByb2Nlc3MiLCJpbmRleCIsImNhbGxiYWNrIiwiYWRkIiwiZmluYWxlIiwicmVzdWx0IiwiY2FsbGJhY2tzIiwicmVtb3ZlIiwiX2Rvd25sb2FkZXJzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFDQSxJQUFNQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxZQUFE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QS9DTTtBQWdEZCxVQUFRQSxhQWhETTtBQWlEZCxXQUFTQSxhQWpESztBQWtEZCxTQUFPQSxhQWxETztBQW1EZCxXQUFTQSxhQW5ESztBQXFEZDtBQUNBLGFBQVl2QixtQkF0REU7QUF1RGQsVUFBUUEsbUJBdkRNO0FBd0RkLFlBQVVBLG1CQXhESTtBQXlEZCxXQUFTQSxtQkF6REs7QUEyRGQsU0FBT3RCLGNBM0RPO0FBNkRkLFlBQVU4QyxjQTdESTtBQStEZCxhQUFXRjtBQS9ERyxDQUFsQjtBQW1FQVMsVUFBVSxDQUFDaUUsWUFBWCxHQUEwQm5CLFdBQTFCO0FBQ0FvQixNQUFNLENBQUNDLE9BQVAsR0FBaUJuRSxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbi8qKlxyXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxyXG4gKi9cclxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xyXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL0NDRGVidWcnKTtcclxuY29uc3QgeyBsb2FkRm9udCB9ID0gcmVxdWlyZSgnLi9mb250LWxvYWRlcicpO1xyXG5jb25zdCBjYWxsSW5OZXh0VGljayA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL3V0aWxzJykuY2FsbEluTmV4dFRpY2s7XHJcbmNvbnN0IGRvd25sb2FkRG9tSW1hZ2UgPSByZXF1aXJlKCcuL2Rvd25sb2FkLWRvbS1pbWFnZScpO1xyXG5jb25zdCBkb3dubG9hZERvbUF1ZGlvID0gcmVxdWlyZSgnLi9kb3dubG9hZC1kb20tYXVkaW8nKTtcclxuY29uc3QgZG93bmxvYWRGaWxlID0gcmVxdWlyZSgnLi9kb3dubG9hZC1maWxlJyk7XHJcbmNvbnN0IGRvd25sb2FkU2NyaXB0ID0gcmVxdWlyZSgnLi9kb3dubG9hZC1zY3JpcHQuanMnKTtcclxuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XHJcbmNvbnN0IHsgZmlsZXMgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XHJcbmNvbnN0IHsgX19hdWRpb1N1cHBvcnQsIGNhcGFiaWxpdGllcyB9ID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NTeXMnKTtcclxuY29uc3QgeyB1cmxBcHBlbmRUaW1lc3RhbXAsIHJldHJ5IH0gPSByZXF1aXJlKCcuL3V0aWxpdGllcycpO1xyXG5cclxuY29uc3QgUkVHRVggPSAvXig/Olxcdys6XFwvXFwvfFxcLitcXC8pLisvO1xyXG5cclxuXHJcbnZhciBmb3JtYXRTdXBwb3J0ID0gX19hdWRpb1N1cHBvcnQuZm9ybWF0IHx8IFtdO1xyXG5cclxudmFyIHVuc3VwcG9ydGVkID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgb25Db21wbGV0ZShuZXcgRXJyb3IoZGVidWcuZ2V0RXJyb3IoNDkyNykpKTtcclxufVxyXG5cclxudmFyIGRvd25sb2FkQXVkaW8gPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAvLyB3ZWIgYXVkaW8gbmVlZCB0byBkb3dubG9hZCBmaWxlIGFzIGFycmF5QnVmZmVyXHJcbiAgICBpZiAob3B0aW9ucy5hdWRpb0xvYWRNb2RlICE9PSBjYy5BdWRpb0NsaXAuTG9hZE1vZGUuRE9NX0FVRElPKSB7XHJcbiAgICAgICAgZG93bmxvYWRBcnJheUJ1ZmZlcih1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZG93bmxvYWREb21BdWRpbyh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGRvd25sb2FkQXVkaW8gPSAoIUNDX0VESVRPUiB8fCAhRWRpdG9yLmlzTWFpblByb2Nlc3MpID8gKGZvcm1hdFN1cHBvcnQubGVuZ3RoID09PSAwID8gdW5zdXBwb3J0ZWQgOiAoX19hdWRpb1N1cHBvcnQuV0VCX0FVRElPID8gZG93bmxvYWRBdWRpbyA6IGRvd25sb2FkRG9tQXVkaW8pKSA6IG51bGw7XHJcblxyXG52YXIgZG93bmxvYWRJbWFnZSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIC8vIGlmIGNyZWF0ZUltYWdlQml0bWFwIGlzIHZhbGlkLCB3ZSBjYW4gdHJhbnNmb3JtIGJsb2IgdG8gSW1hZ2VCaXRtYXAuIE90aGVyd2lzZSwganVzdCB1c2UgSFRNTEltYWdlRWxlbWVudCB0byBsb2FkXHJcbiAgICB2YXIgZnVuYyA9IGNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiBjYy5tYWNyby5BTExPV19JTUFHRV9CSVRNQVAgPyBkb3dubG9hZEJsb2IgOiBkb3dubG9hZERvbUltYWdlO1xyXG4gICAgZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxudmFyIGRvd25sb2FkQmxvYiA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID0gXCJibG9iXCI7XHJcbiAgICBkb3dubG9hZEZpbGUodXJsLCBvcHRpb25zLCBvcHRpb25zLm9uRmlsZVByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxufTtcclxuXHJcbnZhciBkb3dubG9hZEpzb24gPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xyXG4gICAgZG93bmxvYWRGaWxlKHVybCwgb3B0aW9ucywgb3B0aW9ucy5vbkZpbGVQcm9ncmVzcywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgIGlmICghZXJyICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGVyciA9IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgZGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBkb3dubG9hZEFycmF5QnVmZmVyID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICBkb3dubG9hZEZpbGUodXJsLCBvcHRpb25zLCBvcHRpb25zLm9uRmlsZVByb2dyZXNzLCBvbkNvbXBsZXRlKTtcclxufTtcclxuXHJcbnZhciBkb3dubG9hZFRleHQgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9IFwidGV4dFwiO1xyXG4gICAgZG93bmxvYWRGaWxlKHVybCwgb3B0aW9ucywgb3B0aW9ucy5vbkZpbGVQcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbn07XHJcblxyXG52YXIgZG93bmxvYWRWaWRlbyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIG9uQ29tcGxldGUobnVsbCwgdXJsKTtcclxufTtcclxuXHJcbnZhciBkb3dubG9hZEJ1bmRsZSA9IGZ1bmN0aW9uIChuYW1lT3JVcmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgIGxldCBidW5kbGVOYW1lID0gY2MucGF0aC5iYXNlbmFtZShuYW1lT3JVcmwpO1xyXG4gICAgbGV0IHVybCA9IG5hbWVPclVybDtcclxuICAgIGlmICghUkVHRVgudGVzdCh1cmwpKSB1cmwgPSAnYXNzZXRzLycgKyBidW5kbGVOYW1lO1xyXG4gICAgdmFyIHZlcnNpb24gPSBvcHRpb25zLnZlcnNpb24gfHwgZG93bmxvYWRlci5idW5kbGVWZXJzW2J1bmRsZU5hbWVdO1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIHZhciBjb25maWcgPSBgJHt1cmx9L2NvbmZpZy4ke3ZlcnNpb24gPyB2ZXJzaW9uICsgJy4nIDogJyd9anNvbmA7XHJcbiAgICBsZXQgb3V0ID0gbnVsbCwgZXJyb3IgPSBudWxsO1xyXG4gICAgZG93bmxvYWRKc29uKGNvbmZpZywgb3B0aW9ucywgZnVuY3Rpb24gKGVyciwgcmVzcG9uc2UpIHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gZXJyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXQgPSByZXNwb25zZTtcclxuICAgICAgICBvdXQgJiYgKG91dC5iYXNlID0gdXJsICsgJy8nKTtcclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIGlmIChjb3VudCA9PT0gMikge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLCBvdXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBqcyA9IGAke3VybH0vaW5kZXguJHt2ZXJzaW9uID8gdmVyc2lvbiArICcuJyA6ICcnfWpzYDtcclxuICAgIGRvd25sb2FkU2NyaXB0KGpzLCBvcHRpb25zLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBlcnJvciA9IGVycjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY291bnQrKztcclxuICAgICAgICBpZiAoY291bnQgPT09IDIpIHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvciwgb3V0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBfZG93bmxvYWRpbmcgPSBuZXcgQ2FjaGUoKTtcclxudmFyIF9xdWV1ZSA9IFtdO1xyXG52YXIgX3F1ZXVlRGlydHkgPSBmYWxzZTtcclxuXHJcbi8vIHRoZSBudW1iZXIgb2YgbG9hZGluZyB0aHJlYWRcclxudmFyIF90b3RhbE51bSA9IDA7XHJcblxyXG4vLyB0aGUgbnVtYmVyIG9mIHJlcXVlc3QgdGhhdCBsYXVuY2hlZCBpbiB0aGlzIHBlcmlvZFxyXG52YXIgX3RvdGFsTnVtVGhpc1BlcmlvZCA9IDA7XHJcblxyXG4vLyBsYXN0IHRpbWUsIGlmIG5vdyAtIGxhc3RUaW1lID4gcGVyaW9kLCByZWZyZXNoIF90b3RhbE51bVRoaXNQZXJpb2QuXHJcbnZhciBfbGFzdERhdGUgPSAtMTtcclxuXHJcbi8vIGlmIF90b3RhbE51bVRoaXNQZXJpb2QgZXF1YWxzIG1heCwgbW92ZSByZXF1ZXN0IHRvIG5leHQgcGVyaW9kIHVzaW5nIHNldFRpbWVPdXQuXHJcbnZhciBfY2hlY2tOZXh0UGVyaW9kID0gZmFsc2U7XHJcblxyXG52YXIgdXBkYXRlVGltZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgLy8gdXNlIGRlbHRhVGltZSBhcyBpbnRlcnZhbFxyXG4gICAgbGV0IGludGVydmFsID0gY2MuZGlyZWN0b3IuX2RlbHRhVGltZSA+IGRvd25sb2FkZXIuX21heEludGVydmFsID8gZG93bmxvYWRlci5fbWF4SW50ZXJ2YWwgOiBjYy5kaXJlY3Rvci5fZGVsdGFUaW1lO1xyXG4gICAgaWYgKG5vdyAtIF9sYXN0RGF0ZSA+IGludGVydmFsICogMTAwMCkge1xyXG4gICAgICAgIF90b3RhbE51bVRoaXNQZXJpb2QgPSAwO1xyXG4gICAgICAgIF9sYXN0RGF0ZSA9IG5vdztcclxuICAgIH1cclxufTtcclxuXHJcbi8vIGhhbmRsZSB0aGUgcmVzdCByZXF1ZXN0IGluIG5leHQgcGVyaW9kXHJcbnZhciBoYW5kbGVRdWV1ZSA9IGZ1bmN0aW9uIChtYXhDb25jdXJyZW5jeSwgbWF4UmVxdWVzdHNQZXJGcmFtZSkge1xyXG4gICAgX2NoZWNrTmV4dFBlcmlvZCA9IGZhbHNlO1xyXG4gICAgdXBkYXRlVGltZSgpO1xyXG4gICAgd2hpbGUgKF9xdWV1ZS5sZW5ndGggPiAwICYmIF90b3RhbE51bSA8IG1heENvbmN1cnJlbmN5ICYmIF90b3RhbE51bVRoaXNQZXJpb2QgPCBtYXhSZXF1ZXN0c1BlckZyYW1lKSB7XHJcbiAgICAgICAgaWYgKF9xdWV1ZURpcnR5KSB7XHJcbiAgICAgICAgICAgIF9xdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfcXVldWVEaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV4dE9uZSA9IF9xdWV1ZS5wb3AoKTtcclxuICAgICAgICBpZiAoIW5leHRPbmUpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF90b3RhbE51bSsrO1xyXG4gICAgICAgIF90b3RhbE51bVRoaXNQZXJpb2QrKztcclxuICAgICAgICBuZXh0T25lLmludm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChfcXVldWUubGVuZ3RoID4gMCAmJiBfdG90YWxOdW0gPCBtYXhDb25jdXJyZW5jeSkge1xyXG4gICAgICAgIGNhbGxJbk5leHRUaWNrKGhhbmRsZVF1ZXVlLCBtYXhDb25jdXJyZW5jeSwgbWF4UmVxdWVzdHNQZXJGcmFtZSk7XHJcbiAgICAgICAgX2NoZWNrTmV4dFBlcmlvZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDb250cm9sIGFsbCBkb3dubG9hZCBwcm9jZXNzLCBpdCBpcyBhIHNpbmdsZXRvbi4gQWxsIG1lbWJlciBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuYXNzZXRNYW5hZ2VyLmRvd25sb2FkZXJgICwgaXQgY2FuIGRvd25sb2FkIHNldmVyYWwgdHlwZXMgb2YgZmlsZXM6XHJcbiAqIDEuIFRleHRcclxuICogMi4gSW1hZ2VcclxuICogMy4gQXVkaW9cclxuICogNC4gQXNzZXRzXHJcbiAqIDUuIFNjcmlwdHNcclxuICogXHJcbiAqICEjemhcclxuICog566h55CG5omA5pyJ5LiL6L296L+H56iL77yMZG93bmxvYWRlciDmmK/kuKrljZXkvovvvIzmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWdlci5kb3dubG9hZGVyYCDorr/pl67vvIzlroPog73kuIvovb3ku6XkuIvlh6Dnp43nsbvlnovnmoTmlofku7bvvJpcclxuICogMS4g5paH5pysXHJcbiAqIDIuIOWbvueJh1xyXG4gKiAzLiDpn7PpopFcclxuICogNC4g6LWE5rqQXHJcbiAqIDUuIOiEmuacrFxyXG4gKiBcclxuICogQGNsYXNzIERvd25sb2FkZXJcclxuICovXHJcbnZhciBkb3dubG9hZGVyID0ge1xyXG5cclxuICAgIF9yZW1vdGVTZXJ2ZXJBZGRyZXNzOiAnJyxcclxuICAgIF9tYXhJbnRlcnZhbDogMSAvIDMwLFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgYWRkcmVzcyBvZiByZW1vdGUgc2VydmVyXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOi/nOeoi+acjeWKoeWZqOWcsOWdgFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgcmVtb3RlU2VydmVyQWRkcmVzc1xyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqIEBkZWZhdWx0ICcnXHJcbiAgICAgKi9cclxuICAgIGdldCByZW1vdGVTZXJ2ZXJBZGRyZXNzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU2VydmVyQWRkcmVzcztcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbmN1cnJlbnQgd2hlbiBkb3dubG9hZGluZ1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkuIvovb3ml7bnmoTmnIDlpKflubblj5HmlbBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IG1heENvbmN1cnJlbmN5XHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQGRlZmF1bHQgNlxyXG4gICAgICovXHJcbiAgICBtYXhDb25jdXJyZW5jeTogNixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVxdWVzdCBjYW4gYmUgbGF1bmNoZWQgcGVyIGZyYW1lIHdoZW4gZG93bmxvYWRpbmdcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5LiL6L295pe25q+P5bin5Y+v5Lul5ZCv5Yqo55qE5pyA5aSn6K+35rGC5pWwXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBtYXhSZXF1ZXN0c1BlckZyYW1lXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICogQGRlZmF1bHQgNlxyXG4gICAgICovXHJcbiAgICBtYXhSZXF1ZXN0c1BlckZyYW1lOiA2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIG1heCBudW1iZXIgb2YgcmV0cmllcyB3aGVuIGZhaWxcclxuICAgICAqICBcclxuICAgICAqICEjemhcclxuICAgICAqIOWksei0pemHjeivleasoeaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgbWF4UmV0cnlDb3VudFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgbWF4UmV0cnlDb3VudDogMyxcclxuXHJcbiAgICBhcHBlbmRUaW1lU3RhbXA6IGZhbHNlLFxyXG5cclxuICAgIGxpbWl0ZWQ6IHRydWUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBXYWl0IGZvciB3aGlsZSBiZWZvcmUgYW5vdGhlciByZXRyeSwgdW5pdDogbXNcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6YeN6K+V55qE6Ze06ZqU5pe26Ze0XHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSByZXRyeUludGVydmFsXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICByZXRyeUludGVydmFsOiAyMDAwLFxyXG5cclxuICAgIGJ1bmRsZVZlcnM6IG51bGwsXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW5cclxuICAgICAqIFVzZSBJbWFnZSBlbGVtZW50IHRvIGRvd25sb2FkIGltYWdlXHJcbiAgICAgKiAgXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvb/nlKggSW1hZ2Ug5YWD57Sg5p2l5LiL6L295Zu+54mHXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZG93bmxvYWREb21JbWFnZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIFVybCBvZiB0aGUgaW1hZ2VcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVyc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29uQ29tcGxldGVdIC0gQ2FsbGJhY2sgd2hlbiBpbWFnZSBsb2FkZWQgb3IgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHtIVE1MSW1hZ2VFbGVtZW50fSBvbkNvbXBsZXRlLmltZyAtIFRoZSBsb2FkZWQgSW1hZ2UgZWxlbWVudCwgbnVsbCBpZiBlcnJvciBvY2N1cnJlZFxyXG4gICAgICogQHJldHVybnMge0hUTUxJbWFnZUVsZW1lbnR9IFRoZSBpbWFnZSBlbGVtZW50XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkb3dubG9hZERvbUltYWdlKCdodHRwOi8vZXhhbXBsZS5jb20vdGVzdC5qcGcnLCBudWxsLCAoZXJyLCBpbWcpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZG93bmxvYWREb21JbWFnZSh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4gLCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGltZzogSFRNTEltYWdlRWxlbWVudCkgPT4gdm9pZCk6IEhUTUxJbWFnZUVsZW1lbnRcclxuICAgICAqIGRvd25sb2FkRG9tSW1hZ2UodXJsOiBzdHJpbmcsIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgaW1nOiBIVE1MSW1hZ2VFbGVtZW50KSA9PiB2b2lkKTogSFRNTEltYWdlRWxlbWVudFxyXG4gICAgICovXHJcbiAgICBkb3dubG9hZERvbUltYWdlOiBkb3dubG9hZERvbUltYWdlLFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBVc2UgYXVkaW8gZWxlbWVudCB0byBkb3dubG9hZCBhdWRpb1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvb/nlKggQXVkaW8g5YWD57Sg5p2l5LiL6L296Z+z6aKRIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkRG9tQXVkaW9cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVcmwgb2YgdGhlIGF1ZGlvXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIGludm9rZWQgd2hlbiBhdWRpbyBsb2FkZWQgb3IgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHtIVE1MQXVkaW9FbGVtZW50fSBvbkNvbXBsZXRlLmF1ZGlvIC0gVGhlIGxvYWRlZCBhdWRpbyBlbGVtZW50LCBudWxsIGlmIGVycm9yIG9jY3VycmVkXHJcbiAgICAgKiBAcmV0dXJucyB7SFRNTEF1ZGlvRWxlbWVudH0gVGhlIGF1ZGlvIGVsZW1lbnRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGRvd25sb2FkRG9tQXVkaW8oJ2h0dHA6Ly9leGFtcGxlLmNvbS90ZXN0Lm1wMycsIG51bGwsIChlcnIsIGF1ZGlvKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGRvd25sb2FkRG9tQXVkaW8odXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGF1ZGlvOiBIVE1MQXVkaW9FbGVtZW50KSA9PiB2b2lkKTogSFRNTEF1ZGlvRWxlbWVudFxyXG4gICAgICogZG93bmxvYWREb21BdWRpbyh1cmw6IHN0cmluZywgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBhdWRpbzogSFRNTEF1ZGlvRWxlbWVudCkgPT4gdm9pZCk6IEhUTUxBdWRpb0VsZW1lbnRcclxuICAgICAqL1xyXG4gICAgZG93bmxvYWREb21BdWRpbzogZG93bmxvYWREb21BdWRpbyxcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqICEjZW5cclxuICAgICAqIFVzZSBYTUxIdHRwUmVxdWVzdCB0byBkb3dubG9hZCBmaWxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOS9v+eUqCBYTUxIdHRwUmVxdWVzdCDmnaXkuIvovb3mlofku7ZcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBkb3dubG9hZEZpbGVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVcmwgb2YgdGhlIGZpbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVyc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnJlc3BvbnNlVHlwZV0gLSBJbmRpY2F0ZSB3aGljaCB0eXBlIG9mIGNvbnRlbnQgc2hvdWxkIGJlIHJldHVybmVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLndpdGhDcmVkZW50aWFsc10gLSBJbmRpY2F0ZSB3aGV0aGVyIG9yIG5vdCBjcm9zcy1zaXRlIEFjY2Vzcy1Db250b3JsIHJlcXVlc3RzIHNob3VsZCBiZSBtYWRlIHVzaW5nIGNyZWRlbnRpYWxzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubWltZVR5cGVdIC0gSW5kaWNhdGUgd2hpY2ggdHlwZSBvZiBjb250ZW50IHNob3VsZCBiZSByZXR1cm5lZC4gSW4gc29tZSBicm93c2VycywgcmVzcG9uc2VUeXBlIGRvZXMndCB3b3JrLCB5b3UgY2FuIHVzZSBtaW1lVHlwZSBpbnN0ZWFkXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMudGltZW91dF0gLSBSZXByZXNlbnQgdGhlIG51bWJlciBvZiBtcyBhIHJlcXVlc3QgY2FuIHRha2UgYmVmb3JlIGJlaW5nIHRlcm1pbmF0ZWQuXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuaGVhZGVyXSAtIFRoZSBoZWFkZXIgc2hvdWxkIGJlIHRyYW5mZXJyZWQgdG8gc2VydmVyXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25GaWxlUHJvZ3Jlc3NdIC0gQ2FsbGJhY2sgY29udGludW91c2x5IGR1cmluZyBkb3dubG9hZCBpcyBwcm9jZXNzaW5nXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25GaWxlUHJvZ3Jlc3MubG9hZGVkIC0gU2l6ZSBvZiBkb3dubG9hZGVkIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gb25GaWxlUHJvZ3Jlc3MudG90YWwgLSBUb3RhbCBzaXplIG9mIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb25Db21wbGV0ZV0gLSBDYWxsYmFjayB3aGVuIGZpbGUgbG9hZGVkIG9yIGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSB7Kn0gb25Db21wbGV0ZS5yZXNwb25zZSAtIFRoZSBsb2FkZWQgY29udGVudCwgbnVsbCBpZiBlcnJvciBvY2N1cnJlZCwgdHlwZSBvZiBjb250ZW50IGNhbiBiZSBpbmRpY2F0ZWQgYnkgb3B0aW9ucy5yZXNwb25zZVR5cGVcclxuICAgICAqIEByZXR1cm5zIHtYTUxIdHRwUmVxdWVzdH0gVGhlIHhociB0byBiZSBzZW5kXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkb3dubG9hZEZpbGUoJ2h0dHA6Ly9leGFtcGxlLmNvbS90ZXN0LmJpbicsIHtyZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcid9LCBudWxsLCAoZXJyLCBhcnJheUJ1ZmZlcikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkZpbGVQcm9ncmVzcz86IChsb2FkZWQ6IE51bWJlciwgdG90YWw6IE51bWJlcikgPT4gdm9pZCwgb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCByZXNwb25zZTogYW55KSA9PiB2b2lkKTogWE1MSHR0cFJlcXVlc3RcclxuICAgICAqIGRvd25sb2FkRmlsZSh1cmw6IHN0cmluZywgb25GaWxlUHJvZ3Jlc3M/OiAobG9hZGVkOiBOdW1iZXIsIHRvdGFsOiBOdW1iZXIpID0+IHZvaWQsIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCk6IFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgKiBkb3dubG9hZEZpbGUodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpOiBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICogZG93bmxvYWRGaWxlKHVybDogc3RyaW5nLCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpOiBYTUxIdHRwUmVxdWVzdFxyXG4gICAgICovXHJcbiAgICBkb3dubG9hZEZpbGU6IGRvd25sb2FkRmlsZSxcclxuXHJcbiAgICAvKlxyXG4gICAgICogISNlblxyXG4gICAgICogTG9hZCBzY3JpcHQgXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWKoOi9veiEmuacrFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGRvd25sb2FkU2NyaXB0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gVXJsIG9mIHRoZSBzY3JpcHRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVyc1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pc0FzeW5jXSAtIEluZGljYXRlIHdoZXRoZXIgb3Igbm90IGxvYWRpbmcgcHJvY2VzcyBzaG91bGQgYmUgYXN5bmNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIENhbGxiYWNrIHdoZW4gc2NyaXB0IGxvYWRlZCBvciBmYWlsZWRcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkb3dubG9hZFNjcmlwdCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2luZGV4LmpzJywgbnVsbCwgKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBkb3dubG9hZFNjcmlwdCh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvcikgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqIGRvd25sb2FkU2NyaXB0KHVybDogc3RyaW5nLCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkU2NyaXB0OiBkb3dubG9hZFNjcmlwdCxcclxuXHJcbiAgICBpbml0IChidW5kbGVWZXJzLCByZW1vdGVTZXJ2ZXJBZGRyZXNzKSB7XHJcbiAgICAgICAgX2Rvd25sb2FkaW5nLmNsZWFyKCk7XHJcbiAgICAgICAgX3F1ZXVlLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fcmVtb3RlU2VydmVyQWRkcmVzcyA9IHJlbW90ZVNlcnZlckFkZHJlc3MgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5idW5kbGVWZXJzID0gYnVuZGxlVmVycyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFJlZ2lzdGVyIGN1c3RvbSBoYW5kbGVyIGlmIHlvdSB3YW50IHRvIGNoYW5nZSBkZWZhdWx0IGJlaGF2aW9yIG9yIGV4dGVuZCBkb3dubG9hZGVyIHRvIGRvd25sb2FkIG90aGVyIGZvcm1hdCBmaWxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOW9k+S9oOaDs+S/ruaUuem7mOiupOihjOS4uuaIluiAheaLk+WxlSBkb3dubG9hZGVyIOadpeS4i+i9veWFtuS7luagvOW8j+aWh+S7tuaXtuWPr+S7peazqOWGjOiHquWumuS5ieeahCBoYW5kbGVyIFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IHR5cGUgLSBFeHRlbnNpb24gbGlrZXMgJy5qcGcnIG9yIG1hcCBsaWtlcyB7Jy5qcGcnOiBqcGdIYW5kbGVyLCAnLnBuZyc6IHBuZ0hhbmRsZXJ9XHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaGFuZGxlcl0gLSBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaGFuZGxlci51cmwgLSB1cmxcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyLm9wdGlvbnMgLSBzb21lIG9wdGlvbmFsIHBhcmFtdGVycyB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIGhhbmRsZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyLm9uQ29tcGxldGUgLSBjYWxsYmFjayB3aGVuIGZpbmlzaGluZyBkb3dubG9hZGluZ1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5yZWdpc3RlcignLnRnYScsICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpID0+IG9uQ29tcGxldGUobnVsbCwgbnVsbCkpO1xyXG4gICAgICogZG93bmxvYWRlci5yZWdpc3Rlcih7Jy50Z2EnOiAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpLCAnLmV4dCc6ICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpID0+IG9uQ29tcGxldGUobnVsbCwgbnVsbCl9KTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIHJlZ2lzdGVyKHR5cGU6IHN0cmluZywgaGFuZGxlcjogKHVybDogc3RyaW5nLCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlOiAoZXJyOiBFcnJvciwgY29udGVudDogYW55KSA9PiB2b2lkKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICogcmVnaXN0ZXIobWFwOiBSZWNvcmQ8c3RyaW5nLCAodXJsOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBjb250ZW50OiBhbnkpID0+IHZvaWQpID0+IHZvaWQ+KTogdm9pZFxyXG4gICAgICovXHJcbiAgICByZWdpc3RlciAodHlwZSwgaGFuZGxlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAganMubWl4aW4oZG93bmxvYWRlcnMsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG93bmxvYWRlcnNbdHlwZV0gPSBoYW5kbGVyO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBVc2UgY29ycmVzcG9uZGluZyBoYW5kbGVyIHRvIGRvd25sb2FkIGZpbGUgdW5kZXIgbGltaXRhdGlvbiBcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Zyo6ZmQ5Yi25LiL5L2/55So5a+55bqU55qEIGhhbmRsZXIg5p2l5LiL6L295paH5Lu2XHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgZG93bmxvYWRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBUaGUgdXJsIHNob3VsZCBiZSBkb3dubG9hZGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIGluZGljYXRlcyB0aGF0IHdoaWNoIGhhbmRsZXIgc2hvdWxkIGJlIHVzZWQgdG8gZG93bmxvYWQsIHN1Y2ggYXMgJy5qcGcnXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIHNvbWUgb3B0aW9uYWwgcGFyYW10ZXJzIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gdGhlIGNvcnJlc3BvbmRpbmcgaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLm9uRmlsZVByb2dyZXNzXSAtIHByb2dyZXNzaXZlIGNhbGxiYWNrIHdpbGwgYmUgdHJhbnNmZXJyZWQgdG8gaGFuZGxlci5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSZXRyeUNvdW50XSAtIEhvdyBtYW55IHRpbWVzIHNob3VsZCByZXRyeSB3aGVuIGRvd25sb2FkIGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heENvbmN1cnJlbmN5XSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBjb25jdXJyZW50IHdoZW4gZG93bmxvYWRpbmdcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhSZXF1ZXN0c1BlckZyYW1lXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByZXF1ZXN0IGNhbiBiZSBsYXVuY2hlZCBwZXIgZnJhbWUgd2hlbiBkb3dubG9hZGluZ1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnByaW9yaXR5XSAtIFRoZSBwcmlvcml0eSBvZiB0aGlzIHVybCwgZGVmYXVsdCBpcyAwLCB0aGUgZ3JlYXRlciBudW1iZXIgaXMgaGlnaGVyIHByaW9yaXR5LlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoaW5nIGRvd25sb2FkaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmNvbnRldG50IC0gVGhlIGRvd25sb2FkZWQgZmlsZVxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWQoJ2h0dHA6Ly9leGFtcGxlLmNvbS90ZXN0LnRnYScsICcudGdhJywge29uRmlsZVByb2dyZXNzOiAobG9hZGVkLCB0b3RhbCkgPT4gY29uc29sZS5sZ28obG9hZGVkL3RvdGFsKX0sIG9uQ29tcGxldGU6IChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZG93bmxvYWQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Piwgb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGNvbnRlbnQ6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgZG93bmxvYWQgKGlkLCB1cmwsIHR5cGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICBsZXQgZnVuYyA9IGRvd25sb2FkZXJzW3R5cGVdIHx8IGRvd25sb2FkZXJzWydkZWZhdWx0J107XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIGlmIGl0IGlzIGRvd25sb2FkZWQsIGRvbid0IGRvd25sb2FkIGFnYWluXHJcbiAgICAgICAgbGV0IGZpbGUsIGRvd25sb2FkQ2FsbGJhY2tzO1xyXG4gICAgICAgIGlmIChmaWxlID0gZmlsZXMuZ2V0KGlkKSkge1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlKG51bGwsIGZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkb3dubG9hZENhbGxiYWNrcyA9IF9kb3dubG9hZGluZy5nZXQoaWQpKSB7XHJcbiAgICAgICAgICAgIGRvd25sb2FkQ2FsbGJhY2tzLnB1c2gob25Db21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gX3F1ZXVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBfcXVldWVbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJpb3JpdHkgPSBvcHRpb25zLnByaW9yaXR5IHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJpb3JpdHkgPCBwcmlvcml0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9xdWV1ZURpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGRvd25sb2FkIGZhaWwsIHNob3VsZCByZXRyeVxyXG4gICAgICAgICAgICB2YXIgbWF4UmV0cnlDb3VudCA9IHR5cGVvZiBvcHRpb25zLm1heFJldHJ5Q291bnQgIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucy5tYXhSZXRyeUNvdW50IDogdGhpcy5tYXhSZXRyeUNvdW50O1xyXG4gICAgICAgICAgICB2YXIgbWF4Q29uY3VycmVuY3kgPSB0eXBlb2Ygb3B0aW9ucy5tYXhDb25jdXJyZW5jeSAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLm1heENvbmN1cnJlbmN5IDogdGhpcy5tYXhDb25jdXJyZW5jeTtcclxuICAgICAgICAgICAgdmFyIG1heFJlcXVlc3RzUGVyRnJhbWUgPSB0eXBlb2Ygb3B0aW9ucy5tYXhSZXF1ZXN0c1BlckZyYW1lICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMubWF4UmVxdWVzdHNQZXJGcmFtZSA6IHRoaXMubWF4UmVxdWVzdHNQZXJGcmFtZTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByb2Nlc3MgKGluZGV4LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Rvd25sb2FkaW5nLmFkZChpZCwgW29uQ29tcGxldGVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmxpbWl0ZWQpIHJldHVybiBmdW5jKHVybEFwcGVuZFRpbWVzdGFtcCh1cmwpLCBvcHRpb25zLCBjYWxsYmFjayk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVmcmVzaFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlVGltZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGludm9rZSAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYyh1cmxBcHBlbmRUaW1lc3RhbXAodXJsKSwgb3B0aW9ucywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIGZpbmlzaCBkb3dubG9hZGluZywgdXBkYXRlIF90b3RhbE51bVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdG90YWxOdW0tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfY2hlY2tOZXh0UGVyaW9kICYmIF9xdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsSW5OZXh0VGljayhoYW5kbGVRdWV1ZSwgbWF4Q29uY3VycmVuY3ksIG1heFJlcXVlc3RzUGVyRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NoZWNrTmV4dFBlcmlvZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoX3RvdGFsTnVtIDwgbWF4Q29uY3VycmVuY3kgJiYgX3RvdGFsTnVtVGhpc1BlcmlvZCA8IG1heFJlcXVlc3RzUGVyRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnZva2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBfdG90YWxOdW0rKztcclxuICAgICAgICAgICAgICAgICAgICBfdG90YWxOdW1UaGlzUGVyaW9kKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIG51bWJlciBvZiByZXF1ZXN0IHVwIHRvIGxpbWl0YXRpb24sIGNhY2hlIHRoZSByZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgX3F1ZXVlLnB1c2goeyBpZCwgcHJpb3JpdHk6IG9wdGlvbnMucHJpb3JpdHkgfHwgMCwgaW52b2tlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF9xdWV1ZURpcnR5ID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX2NoZWNrTmV4dFBlcmlvZCAmJiBfdG90YWxOdW0gPCBtYXhDb25jdXJyZW5jeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsSW5OZXh0VGljayhoYW5kbGVRdWV1ZSwgbWF4Q29uY3VycmVuY3ksIG1heFJlcXVlc3RzUGVyRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY2hlY2tOZXh0UGVyaW9kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHdoZW4gcmV0cnkgZmluaXNoZWQsIGludm9rZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgZnVuY3Rpb24gZmluYWxlIChlcnIsIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIGZpbGVzLmFkZChpZCwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHZhciBjYWxsYmFja3MgPSBfZG93bmxvYWRpbmcucmVtb3ZlKGlkKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXShlcnIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICByZXRyeShwcm9jZXNzLCBtYXhSZXRyeUNvdW50LCB0aGlzLnJldHJ5SW50ZXJ2YWwsIGZpbmFsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gZGFmYXVsdCBoYW5kbGVyIG1hcFxyXG52YXIgZG93bmxvYWRlcnMgPSB7XHJcbiAgICAvLyBJbWFnZXNcclxuICAgICcucG5nJyA6IGRvd25sb2FkSW1hZ2UsXHJcbiAgICAnLmpwZycgOiBkb3dubG9hZEltYWdlLFxyXG4gICAgJy5ibXAnIDogZG93bmxvYWRJbWFnZSxcclxuICAgICcuanBlZycgOiBkb3dubG9hZEltYWdlLFxyXG4gICAgJy5naWYnIDogZG93bmxvYWRJbWFnZSxcclxuICAgICcuaWNvJyA6IGRvd25sb2FkSW1hZ2UsXHJcbiAgICAnLnRpZmYnIDogZG93bmxvYWRJbWFnZSxcclxuICAgICcud2VicCcgOiBkb3dubG9hZEltYWdlLFxyXG4gICAgJy5pbWFnZScgOiBkb3dubG9hZEltYWdlLFxyXG4gICAgJy5wdnInOiBkb3dubG9hZEFycmF5QnVmZmVyLFxyXG4gICAgJy5wa20nOiBkb3dubG9hZEFycmF5QnVmZmVyLFxyXG5cclxuICAgIC8vIEF1ZGlvXHJcbiAgICAnLm1wMycgOiBkb3dubG9hZEF1ZGlvLFxyXG4gICAgJy5vZ2cnIDogZG93bmxvYWRBdWRpbyxcclxuICAgICcud2F2JyA6IGRvd25sb2FkQXVkaW8sXHJcbiAgICAnLm00YScgOiBkb3dubG9hZEF1ZGlvLFxyXG5cclxuICAgIC8vIFR4dFxyXG4gICAgJy50eHQnIDogZG93bmxvYWRUZXh0LFxyXG4gICAgJy54bWwnIDogZG93bmxvYWRUZXh0LFxyXG4gICAgJy52c2gnIDogZG93bmxvYWRUZXh0LFxyXG4gICAgJy5mc2gnIDogZG93bmxvYWRUZXh0LFxyXG4gICAgJy5hdGxhcycgOiBkb3dubG9hZFRleHQsXHJcblxyXG4gICAgJy50bXgnIDogZG93bmxvYWRUZXh0LFxyXG4gICAgJy50c3gnIDogZG93bmxvYWRUZXh0LFxyXG5cclxuICAgICcuanNvbicgOiBkb3dubG9hZEpzb24sXHJcbiAgICAnLkV4cG9ydEpzb24nIDogZG93bmxvYWRKc29uLFxyXG4gICAgJy5wbGlzdCcgOiBkb3dubG9hZFRleHQsXHJcblxyXG4gICAgJy5mbnQnIDogZG93bmxvYWRUZXh0LFxyXG5cclxuICAgIC8vIGZvbnRcclxuICAgICcuZm9udCcgOiBsb2FkRm9udCxcclxuICAgICcuZW90JyA6IGxvYWRGb250LFxyXG4gICAgJy50dGYnIDogbG9hZEZvbnQsXHJcbiAgICAnLndvZmYnIDogbG9hZEZvbnQsXHJcbiAgICAnLnN2ZycgOiBsb2FkRm9udCxcclxuICAgICcudHRjJyA6IGxvYWRGb250LFxyXG5cclxuICAgIC8vIFZpZGVvXHJcbiAgICAnLm1wNCc6IGRvd25sb2FkVmlkZW8sXHJcbiAgICAnLmF2aSc6IGRvd25sb2FkVmlkZW8sXHJcbiAgICAnLm1vdic6IGRvd25sb2FkVmlkZW8sXHJcbiAgICAnLm1wZyc6IGRvd25sb2FkVmlkZW8sXHJcbiAgICAnLm1wZWcnOiBkb3dubG9hZFZpZGVvLFxyXG4gICAgJy5ybSc6IGRvd25sb2FkVmlkZW8sXHJcbiAgICAnLnJtdmInOiBkb3dubG9hZFZpZGVvLFxyXG5cclxuICAgIC8vIEJpbmFyeVxyXG4gICAgJy5iaW5hcnknIDogZG93bmxvYWRBcnJheUJ1ZmZlcixcclxuICAgICcuYmluJzogZG93bmxvYWRBcnJheUJ1ZmZlcixcclxuICAgICcuZGJiaW4nOiBkb3dubG9hZEFycmF5QnVmZmVyLFxyXG4gICAgJy5za2VsJzogZG93bmxvYWRBcnJheUJ1ZmZlcixcclxuXHJcbiAgICAnLmpzJzogZG93bmxvYWRTY3JpcHQsXHJcblxyXG4gICAgJ2J1bmRsZSc6IGRvd25sb2FkQnVuZGxlLFxyXG5cclxuICAgICdkZWZhdWx0JzogZG93bmxvYWRUZXh0XHJcblxyXG59O1xyXG5cclxuZG93bmxvYWRlci5fZG93bmxvYWRlcnMgPSBkb3dubG9hZGVycztcclxubW9kdWxlLmV4cG9ydHMgPSBkb3dubG9hZGVyO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==