
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/parser.js';
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
var plistParser = require('../platform/CCSAXParser').plistParser;

var js = require('../platform/js');

var deserialize = require('./deserialize');

var Cache = require('./cache');

var _require = require('./helper'),
    isScene = _require.isScene;

var _require2 = require('./shared'),
    parsed = _require2.parsed,
    files = _require2.files;

var _require3 = require('../platform/CCSys'),
    __audioSupport = _require3.__audioSupport,
    capabilities = _require3.capabilities;

var _parsing = new Cache();
/**
 * !#en
 * Parse the downloaded file, it's a singleton, all member can be accessed with `cc.assetManager.parser`
 * 
 * !#zh
 * 解析已下载的文件，parser 是一个单例, 所有成员能通过 `cc.assetManaager.parser` 访问
 * 
 * @class Parser
 */


var parser = {
  /*
   * !#en
   * Parse image file
   * 
   * !#zh
   * 解析图片文件
   * 
   * @method parseImage
   * @param {Blob} file - The downloaded file
   * @param {Object} options - Some optional paramters 
   * @param {Function} [onComplete] - callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {ImageBitmap|HTMLImageElement} onComplete.img - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.jpg', {responseType: 'blob'}, null, (err, file) => {
   *      parser.parseImage(file, null, (err, img) => console.log(err));
   * });
   * 
   * @typescript
   * parseImage(file: Blob, options: Record<string, any>, onComplete?: (err: Error, img: ImageBitmap|HTMLImageElement) => void): void
   */
  parseImage: function parseImage(file, options, onComplete) {
    if (capabilities.imageBitmap && file instanceof Blob) {
      var imageOptions = {};
      imageOptions.imageOrientation = options.__flipY__ ? 'flipY' : 'none';
      imageOptions.premultiplyAlpha = options.__premultiplyAlpha__ ? 'premultiply' : 'none';
      createImageBitmap(file, imageOptions).then(function (result) {
        result.flipY = !!options.__flipY__;
        result.premultiplyAlpha = !!options.__premultiplyAlpha__;
        onComplete && onComplete(null, result);
      }, function (err) {
        onComplete && onComplete(err, null);
      });
    } else {
      onComplete && onComplete(null, file);
    }
  },

  /*
   * !#en
   * Parse audio file
   * 
   * !#zh
   * 解析音频文件
   * 
   * @method parseAudio
   * @param {ArrayBuffer|HTMLAudioElement} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {AudioBuffer|HTMLAudioElement} onComplete.audio - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.mp3', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parseAudio(file, null, (err, audio) => console.log(err));
   * });
   * 
   * @typescript
   * parseAudio(file: ArrayBuffer|HTMLAudioElement, options: Record<string, any>, onComplete?: (err: Error, audio: AudioBuffer|HTMLAudioElement) => void): void
   */
  parseAudio: function parseAudio(file, options, onComplete) {
    if (file instanceof ArrayBuffer) {
      __audioSupport.context.decodeAudioData(file, function (buffer) {
        onComplete && onComplete(null, buffer);
      }, function (e) {
        onComplete && onComplete(e, null);
      });
    } else {
      onComplete && onComplete(null, file);
    }
  },

  /*
   * !#en
   * Parse pvr file 
   * 
   * !#zh
   * 解析压缩纹理格式 pvr 文件
   * 
   * @method parsePVRTex
   * @param {ArrayBuffer|ArrayBufferView} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.pvrAsset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.pvr', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parsePVRTex(file, null, (err, pvrAsset) => console.log(err));
   * });
   * 
   * @typescript
   * parsePVRTex(file: ArrayBuffer|ArrayBufferView, options: Record<string, any>, onComplete: (err: Error, pvrAsset: {_data: Uint8Array, _compressed: boolean, width: number, height: number}) => void): void
   */
  parsePVRTex: function () {
    //===============//
    // PVR constants //
    //===============//
    // https://github.com/toji/texture-tester/blob/master/js/webgl-texture-util.js#L424
    var PVR_HEADER_LENGTH = 13; // The header length in 32 bit ints.

    var PVR_MAGIC = 0x03525650; //0x50565203;
    // Offsets into the header array.

    var PVR_HEADER_MAGIC = 0;
    var PVR_HEADER_FORMAT = 2;
    var PVR_HEADER_HEIGHT = 6;
    var PVR_HEADER_WIDTH = 7;
    var PVR_HEADER_MIPMAPCOUNT = 11;
    var PVR_HEADER_METADATA = 12;
    return function (file, options, onComplete) {
      var err = null,
          out = null;

      try {
        var buffer = file instanceof ArrayBuffer ? file : file.buffer; // Get a view of the arrayBuffer that represents the DDS header.

        var header = new Int32Array(buffer, 0, PVR_HEADER_LENGTH); // Do some sanity checks to make sure this is a valid DDS file.

        if (header[PVR_HEADER_MAGIC] != PVR_MAGIC) {
          throw new Error("Invalid magic number in PVR header");
        } // Gather other basic metrics and a view of the raw the DXT data.


        var width = header[PVR_HEADER_WIDTH];
        var height = header[PVR_HEADER_HEIGHT];
        var dataOffset = header[PVR_HEADER_METADATA] + 52;
        var pvrtcData = new Uint8Array(buffer, dataOffset);
        out = {
          _data: pvrtcData,
          _compressed: true,
          width: width,
          height: height
        };
      } catch (e) {
        err = e;
      }

      onComplete && onComplete(err, out);
    };
  }(),

  /*
   * !#en
   * Parse pkm file
   * 
   * !#zh
   * 解析压缩纹理格式 pkm 文件
   * 
   * @method parsePKMTex
   * @param {ArrayBuffer|ArrayBufferView} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing.
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Object} onComplete.etcAsset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.pkm', {responseType: 'arraybuffer'}, null, (err, file) => {
   *      parser.parsePKMTex(file, null, (err, etcAsset) => console.log(err));
   * });
   * 
   * @typescript
   * parsePKMTex(file: ArrayBuffer|ArrayBufferView, options: Record<string, any>, onComplete: (err: Error, etcAsset: {_data: Uint8Array, _compressed: boolean, width: number, height: number}) => void): void
   */
  parsePKMTex: function () {
    //===============//
    // ETC constants //
    //===============//
    var ETC_PKM_HEADER_SIZE = 16;
    var ETC_PKM_FORMAT_OFFSET = 6;
    var ETC_PKM_ENCODED_WIDTH_OFFSET = 8;
    var ETC_PKM_ENCODED_HEIGHT_OFFSET = 10;
    var ETC_PKM_WIDTH_OFFSET = 12;
    var ETC_PKM_HEIGHT_OFFSET = 14;
    var ETC1_RGB_NO_MIPMAPS = 0;
    var ETC2_RGB_NO_MIPMAPS = 1;
    var ETC2_RGBA_NO_MIPMAPS = 3;

    function readBEUint16(header, offset) {
      return header[offset] << 8 | header[offset + 1];
    }

    return function (file, options, onComplete) {
      var err = null,
          out = null;

      try {
        var buffer = file instanceof ArrayBuffer ? file : file.buffer;
        var header = new Uint8Array(buffer);
        var format = readBEUint16(header, ETC_PKM_FORMAT_OFFSET);

        if (format !== ETC1_RGB_NO_MIPMAPS && format !== ETC2_RGB_NO_MIPMAPS && format !== ETC2_RGBA_NO_MIPMAPS) {
          return new Error("Invalid magic number in ETC header");
        }

        var width = readBEUint16(header, ETC_PKM_WIDTH_OFFSET);
        var height = readBEUint16(header, ETC_PKM_HEIGHT_OFFSET);
        var encodedWidth = readBEUint16(header, ETC_PKM_ENCODED_WIDTH_OFFSET);
        var encodedHeight = readBEUint16(header, ETC_PKM_ENCODED_HEIGHT_OFFSET);
        var etcData = new Uint8Array(buffer, ETC_PKM_HEADER_SIZE);
        out = {
          _data: etcData,
          _compressed: true,
          width: width,
          height: height
        };
      } catch (e) {
        err = e;
      }

      onComplete && onComplete(err, out);
    };
  }(),

  /*
   * !#en
   * Parse plist file
   * 
   * !#zh
   * 解析 plist 文件
   * 
   * @method parsePlist
   * @param {string} file - The downloaded file
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.data - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.plist', {responseType: 'text'}, null, (err, file) => {
   *      parser.parsePlist(file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * parsePlist(file: string, options: Record<string, any>, onComplete?: (err: Error, data: any) => void): void
   */
  parsePlist: function parsePlist(file, options, onComplete) {
    var err = null;
    var result = plistParser.parse(file);
    if (!result) err = new Error('parse failed');
    onComplete && onComplete(err, result);
  },

  /*
   * !#en
   * Deserialize asset file
   * 
   * !#zh
   * 反序列化资源文件
   * 
   * @method parseImport
   * @param {Object} file - The serialized json
   * @param {Object} options - Some optional paramters
   * @param {Function} onComplete - Callback when finish parsing
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {Asset} onComplete.asset - The parsed content
   * 
   * @example
   * downloader.downloadFile('test.json', {responseType: 'json'}, null, (err, file) => {
   *      parser.parseImport(file, null, (err, data) => console.log(err));
   * });
   * 
   * @typescript
   * parseImport (file: any, options: Record<string, any>, onComplete?: (err: Error, asset: cc.Asset) => void): void
   */
  parseImport: function parseImport(file, options, onComplete) {
    if (!file) return onComplete && onComplete(new Error('Json is empty'));
    var result,
        err = null;

    try {
      result = deserialize(file, options);
    } catch (e) {
      err = e;
    }

    onComplete && onComplete(err, result);
  },
  init: function init() {
    _parsing.clear();
  },

  /**
   * !#en
   * Register custom handler if you want to change default behavior or extend parser to parse other format file
   * 
   * !#zh
   * 当你想修改默认行为或者拓展 parser 来解析其他格式文件时可以注册自定义的handler
   * 
   * @method register
   * @param {string|Object} type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
   * @param {Function} [handler] - The corresponding handler
   * @param {*} handler.file - File
   * @param {Object} handler.options - Some optional paramter
   * @param {Function} handler.onComplete - callback when finishing parsing
   * 
   * @example
   * parser.register('.tga', (file, options, onComplete) => onComplete(null, null));
   * parser.register({'.tga': (file, options, onComplete) => onComplete(null, null), '.ext': (file, options, onComplete) => onComplete(null, null)});
   * 
   * @typescript
   * register(type: string, handler: (file: any, options: Record<string, any>, onComplete: (err: Error, data: any) => void) => void): void
   * register(map: Record<string, (file: any, options: Record<string, any>, onComplete: (err: Error, data: any) => void) => void>): void
   */
  register: function register(type, handler) {
    if (typeof type === 'object') {
      js.mixin(parsers, type);
    } else {
      parsers[type] = handler;
    }
  },

  /**
   * !#en
   * Use corresponding handler to parse file 
   * 
   * !#zh
   * 使用对应的handler来解析文件
   * 
   * @method parse
   * @param {string} id - The id of file
   * @param {*} file - File
   * @param {string} type - The corresponding type of file, likes '.jpg'.
   * @param {Object} options - Some optional paramters will be transferred to the corresponding handler.
   * @param {Function} onComplete - callback when finishing downloading
   * @param {Error} onComplete.err - The occurred error, null indicetes success
   * @param {*} onComplete.contetnt - The parsed file
   * 
   * @example
   * downloader.downloadFile('test.jpg', {responseType: 'blob'}, null, (err, file) => {
   *      parser.parse('test.jpg', file, '.jpg', null, (err, img) => console.log(err));
   * });
   * 
   * @typescript
   * parse(id: string, file: any, type: string, options: Record<string, any>, onComplete: (err: Error, content: any) => void): void
   */
  parse: function parse(id, file, type, options, onComplete) {
    var parsedAsset, parsing, parseHandler;

    if (parsedAsset = parsed.get(id)) {
      onComplete(null, parsedAsset);
    } else if (parsing = _parsing.get(id)) {
      parsing.push(onComplete);
    } else if (parseHandler = parsers[type]) {
      _parsing.add(id, [onComplete]);

      parseHandler(file, options, function (err, data) {
        if (err) {
          files.remove(id);
        } else if (!isScene(data)) {
          parsed.add(id, data);
        }

        var callbacks = _parsing.remove(id);

        for (var i = 0, l = callbacks.length; i < l; i++) {
          callbacks[i](err, data);
        }
      });
    } else {
      onComplete(null, file);
    }
  }
};
var parsers = {
  '.png': parser.parseImage,
  '.jpg': parser.parseImage,
  '.bmp': parser.parseImage,
  '.jpeg': parser.parseImage,
  '.gif': parser.parseImage,
  '.ico': parser.parseImage,
  '.tiff': parser.parseImage,
  '.webp': parser.parseImage,
  '.image': parser.parseImage,
  '.pvr': parser.parsePVRTex,
  '.pkm': parser.parsePKMTex,
  // Audio
  '.mp3': parser.parseAudio,
  '.ogg': parser.parseAudio,
  '.wav': parser.parseAudio,
  '.m4a': parser.parseAudio,
  // plist
  '.plist': parser.parsePlist,
  'import': parser.parseImport
};
module.exports = parser;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHBhcnNlci5qcyJdLCJuYW1lcyI6WyJwbGlzdFBhcnNlciIsInJlcXVpcmUiLCJqcyIsImRlc2VyaWFsaXplIiwiQ2FjaGUiLCJpc1NjZW5lIiwicGFyc2VkIiwiZmlsZXMiLCJfX2F1ZGlvU3VwcG9ydCIsImNhcGFiaWxpdGllcyIsIl9wYXJzaW5nIiwicGFyc2VyIiwicGFyc2VJbWFnZSIsImZpbGUiLCJvcHRpb25zIiwib25Db21wbGV0ZSIsImltYWdlQml0bWFwIiwiQmxvYiIsImltYWdlT3B0aW9ucyIsImltYWdlT3JpZW50YXRpb24iLCJfX2ZsaXBZX18iLCJwcmVtdWx0aXBseUFscGhhIiwiX19wcmVtdWx0aXBseUFscGhhX18iLCJjcmVhdGVJbWFnZUJpdG1hcCIsInRoZW4iLCJyZXN1bHQiLCJmbGlwWSIsImVyciIsInBhcnNlQXVkaW8iLCJBcnJheUJ1ZmZlciIsImNvbnRleHQiLCJkZWNvZGVBdWRpb0RhdGEiLCJidWZmZXIiLCJlIiwicGFyc2VQVlJUZXgiLCJQVlJfSEVBREVSX0xFTkdUSCIsIlBWUl9NQUdJQyIsIlBWUl9IRUFERVJfTUFHSUMiLCJQVlJfSEVBREVSX0ZPUk1BVCIsIlBWUl9IRUFERVJfSEVJR0hUIiwiUFZSX0hFQURFUl9XSURUSCIsIlBWUl9IRUFERVJfTUlQTUFQQ09VTlQiLCJQVlJfSEVBREVSX01FVEFEQVRBIiwib3V0IiwiaGVhZGVyIiwiSW50MzJBcnJheSIsIkVycm9yIiwid2lkdGgiLCJoZWlnaHQiLCJkYXRhT2Zmc2V0IiwicHZydGNEYXRhIiwiVWludDhBcnJheSIsIl9kYXRhIiwiX2NvbXByZXNzZWQiLCJwYXJzZVBLTVRleCIsIkVUQ19QS01fSEVBREVSX1NJWkUiLCJFVENfUEtNX0ZPUk1BVF9PRkZTRVQiLCJFVENfUEtNX0VOQ09ERURfV0lEVEhfT0ZGU0VUIiwiRVRDX1BLTV9FTkNPREVEX0hFSUdIVF9PRkZTRVQiLCJFVENfUEtNX1dJRFRIX09GRlNFVCIsIkVUQ19QS01fSEVJR0hUX09GRlNFVCIsIkVUQzFfUkdCX05PX01JUE1BUFMiLCJFVEMyX1JHQl9OT19NSVBNQVBTIiwiRVRDMl9SR0JBX05PX01JUE1BUFMiLCJyZWFkQkVVaW50MTYiLCJvZmZzZXQiLCJmb3JtYXQiLCJlbmNvZGVkV2lkdGgiLCJlbmNvZGVkSGVpZ2h0IiwiZXRjRGF0YSIsInBhcnNlUGxpc3QiLCJwYXJzZSIsInBhcnNlSW1wb3J0IiwiaW5pdCIsImNsZWFyIiwicmVnaXN0ZXIiLCJ0eXBlIiwiaGFuZGxlciIsIm1peGluIiwicGFyc2VycyIsImlkIiwicGFyc2VkQXNzZXQiLCJwYXJzaW5nIiwicGFyc2VIYW5kbGVyIiwiZ2V0IiwicHVzaCIsImFkZCIsImRhdGEiLCJyZW1vdmUiLCJjYWxsYmFja3MiLCJpIiwibCIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBUCxDQUFtQ0QsV0FBdkQ7O0FBQ0EsSUFBTUUsRUFBRSxHQUFHRCxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0EsSUFBTUUsV0FBVyxHQUFHRixPQUFPLENBQUMsZUFBRCxDQUEzQjs7QUFDQSxJQUFNRyxLQUFLLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQXJCOztlQUNvQkEsT0FBTyxDQUFDLFVBQUQ7SUFBbkJJLG1CQUFBQTs7Z0JBQ2tCSixPQUFPLENBQUMsVUFBRDtJQUF6QkssbUJBQUFBO0lBQVFDLGtCQUFBQTs7Z0JBQ3lCTixPQUFPLENBQUMsbUJBQUQ7SUFBeENPLDJCQUFBQTtJQUFnQkMseUJBQUFBOztB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QUFDQyxVQVRSO0FBVVYsVUFBU0QsTUFBTSxDQUFDdUIsV0FWTjtBQVdWLFVBQVN2QixNQUFNLENBQUMyQyxXQVhOO0FBWVY7QUFDQSxVQUFTM0MsTUFBTSxDQUFDaUIsVUFiTjtBQWNWLFVBQVNqQixNQUFNLENBQUNpQixVQWROO0FBZVYsVUFBU2pCLE1BQU0sQ0FBQ2lCLFVBZk47QUFnQlYsVUFBU2pCLE1BQU0sQ0FBQ2lCLFVBaEJOO0FBa0JWO0FBQ0EsWUFBV2pCLE1BQU0sQ0FBQzJELFVBbkJSO0FBb0JWLFlBQVczRCxNQUFNLENBQUM2RDtBQXBCUixDQUFkO0FBdUJBcUIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkYsTUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqL1xyXG5cclxuY29uc3QgcGxpc3RQYXJzZXIgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ1NBWFBhcnNlcicpLnBsaXN0UGFyc2VyO1xyXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XHJcbmNvbnN0IGRlc2VyaWFsaXplID0gcmVxdWlyZSgnLi9kZXNlcmlhbGl6ZScpO1xyXG5jb25zdCBDYWNoZSA9IHJlcXVpcmUoJy4vY2FjaGUnKTtcclxuY29uc3QgeyBpc1NjZW5lIH0gPSByZXF1aXJlKCcuL2hlbHBlcicpO1xyXG5jb25zdCB7IHBhcnNlZCwgZmlsZXMgfSA9IHJlcXVpcmUoJy4vc2hhcmVkJyk7XHJcbmNvbnN0IHsgX19hdWRpb1N1cHBvcnQsIGNhcGFiaWxpdGllcyB9ID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NTeXMnKTtcclxuXHJcbnZhciBfcGFyc2luZyA9IG5ldyBDYWNoZSgpO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogUGFyc2UgdGhlIGRvd25sb2FkZWQgZmlsZSwgaXQncyBhIHNpbmdsZXRvbiwgYWxsIG1lbWJlciBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuYXNzZXRNYW5hZ2VyLnBhcnNlcmBcclxuICogXHJcbiAqICEjemhcclxuICog6Kej5p6Q5bey5LiL6L2955qE5paH5Lu277yMcGFyc2VyIOaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFhZ2VyLnBhcnNlcmAg6K6/6ZeuXHJcbiAqIFxyXG4gKiBAY2xhc3MgUGFyc2VyXHJcbiAqL1xyXG52YXIgcGFyc2VyID0ge1xyXG4gICAgLypcclxuICAgICAqICEjZW5cclxuICAgICAqIFBhcnNlIGltYWdlIGZpbGVcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6Kej5p6Q5Zu+54mH5paH5Lu2XHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcGFyc2VJbWFnZVxyXG4gICAgICogQHBhcmFtIHtCbG9ifSBmaWxlIC0gVGhlIGRvd25sb2FkZWQgZmlsZVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVycyBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvbkNvbXBsZXRlXSAtIGNhbGxiYWNrIHdoZW4gZmluaXNoIHBhcnNpbmcuXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHtJbWFnZUJpdG1hcHxIVE1MSW1hZ2VFbGVtZW50fSBvbkNvbXBsZXRlLmltZyAtIFRoZSBwYXJzZWQgY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QuanBnJywge3Jlc3BvbnNlVHlwZTogJ2Jsb2InfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xyXG4gICAgICogICAgICBwYXJzZXIucGFyc2VJbWFnZShmaWxlLCBudWxsLCAoZXJyLCBpbWcpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwYXJzZUltYWdlKGZpbGU6IEJsb2IsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgaW1nOiBJbWFnZUJpdG1hcHxIVE1MSW1hZ2VFbGVtZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBwYXJzZUltYWdlIChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgaWYgKGNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiBmaWxlIGluc3RhbmNlb2YgQmxvYikge1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VPcHRpb25zID0ge307XHJcbiAgICAgICAgICAgIGltYWdlT3B0aW9ucy5pbWFnZU9yaWVudGF0aW9uID0gb3B0aW9ucy5fX2ZsaXBZX18gPyAnZmxpcFknIDogJ25vbmUnO1xyXG4gICAgICAgICAgICBpbWFnZU9wdGlvbnMucHJlbXVsdGlwbHlBbHBoYSA9IG9wdGlvbnMuX19wcmVtdWx0aXBseUFscGhhX18gPyAncHJlbXVsdGlwbHknIDogJ25vbmUnO1xyXG4gICAgICAgICAgICBjcmVhdGVJbWFnZUJpdG1hcChmaWxlLCBpbWFnZU9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmZsaXBZID0gISFvcHRpb25zLl9fZmxpcFlfXztcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wcmVtdWx0aXBseUFscGhhID0gISFvcHRpb25zLl9fcHJlbXVsdGlwbHlBbHBoYV9fO1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShudWxsLCBmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBQYXJzZSBhdWRpbyBmaWxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOino+aekOmfs+mikeaWh+S7tlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHBhcnNlQXVkaW9cclxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ8SFRNTEF1ZGlvRWxlbWVudH0gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBwYXJzaW5nLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSB7QXVkaW9CdWZmZXJ8SFRNTEF1ZGlvRWxlbWVudH0gb25Db21wbGV0ZS5hdWRpbyAtIFRoZSBwYXJzZWQgY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QubXAzJywge3Jlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcclxuICAgICAqICAgICAgcGFyc2VyLnBhcnNlQXVkaW8oZmlsZSwgbnVsbCwgKGVyciwgYXVkaW8pID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwYXJzZUF1ZGlvKGZpbGU6IEFycmF5QnVmZmVyfEhUTUxBdWRpb0VsZW1lbnQsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgYXVkaW86IEF1ZGlvQnVmZmVyfEhUTUxBdWRpb0VsZW1lbnQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHBhcnNlQXVkaW8gKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7IFxyXG4gICAgICAgICAgICBfX2F1ZGlvU3VwcG9ydC5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShmaWxlLCBmdW5jdGlvbiAoYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCwgYnVmZmVyKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIGZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLypcclxuICAgICAqICEjZW5cclxuICAgICAqIFBhcnNlIHB2ciBmaWxlIFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDop6PmnpDljovnvKnnurnnkIbmoLzlvI8gcHZyIOaWh+S7tlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHBhcnNlUFZSVGV4XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfEFycmF5QnVmZmVyVmlld30gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBwYXJzaW5nLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbkNvbXBsZXRlLnB2ckFzc2V0IC0gVGhlIHBhcnNlZCBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkb3dubG9hZGVyLmRvd25sb2FkRmlsZSgndGVzdC5wdnInLCB7cmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xyXG4gICAgICogICAgICBwYXJzZXIucGFyc2VQVlJUZXgoZmlsZSwgbnVsbCwgKGVyciwgcHZyQXNzZXQpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwYXJzZVBWUlRleChmaWxlOiBBcnJheUJ1ZmZlcnxBcnJheUJ1ZmZlclZpZXcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBwdnJBc3NldDoge19kYXRhOiBVaW50OEFycmF5LCBfY29tcHJlc3NlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBwYXJzZVBWUlRleCA6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy89PT09PT09PT09PT09PT0vL1xyXG4gICAgICAgIC8vIFBWUiBjb25zdGFudHMgLy9cclxuICAgICAgICAvLz09PT09PT09PT09PT09PS8vXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RvamkvdGV4dHVyZS10ZXN0ZXIvYmxvYi9tYXN0ZXIvanMvd2ViZ2wtdGV4dHVyZS11dGlsLmpzI0w0MjRcclxuICAgICAgICBjb25zdCBQVlJfSEVBREVSX0xFTkdUSCA9IDEzOyAvLyBUaGUgaGVhZGVyIGxlbmd0aCBpbiAzMiBiaXQgaW50cy5cclxuICAgICAgICBjb25zdCBQVlJfTUFHSUMgPSAweDAzNTI1NjUwOyAvLzB4NTA1NjUyMDM7XHJcbiAgICBcclxuICAgICAgICAvLyBPZmZzZXRzIGludG8gdGhlIGhlYWRlciBhcnJheS5cclxuICAgICAgICBjb25zdCBQVlJfSEVBREVSX01BR0lDID0gMDtcclxuICAgICAgICBjb25zdCBQVlJfSEVBREVSX0ZPUk1BVCA9IDI7XHJcbiAgICAgICAgY29uc3QgUFZSX0hFQURFUl9IRUlHSFQgPSA2O1xyXG4gICAgICAgIGNvbnN0IFBWUl9IRUFERVJfV0lEVEggPSA3O1xyXG4gICAgICAgIGNvbnN0IFBWUl9IRUFERVJfTUlQTUFQQ09VTlQgPSAxMTtcclxuICAgICAgICBjb25zdCBQVlJfSEVBREVSX01FVEFEQVRBID0gMTI7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgbGV0IGVyciA9IG51bGwsIG91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZmlsZSA6IGZpbGUuYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGEgdmlldyBvZiB0aGUgYXJyYXlCdWZmZXIgdGhhdCByZXByZXNlbnRzIHRoZSBERFMgaGVhZGVyLlxyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9IG5ldyBJbnQzMkFycmF5KGJ1ZmZlciwgMCwgUFZSX0hFQURFUl9MRU5HVEgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBEbyBzb21lIHNhbml0eSBjaGVja3MgdG8gbWFrZSBzdXJlIHRoaXMgaXMgYSB2YWxpZCBERFMgZmlsZS5cclxuICAgICAgICAgICAgICAgIGlmKGhlYWRlcltQVlJfSEVBREVSX01BR0lDXSAhPSBQVlJfTUFHSUMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG1hZ2ljIG51bWJlciBpbiBQVlIgaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBHYXRoZXIgb3RoZXIgYmFzaWMgbWV0cmljcyBhbmQgYSB2aWV3IG9mIHRoZSByYXcgdGhlIERYVCBkYXRhLlxyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gaGVhZGVyW1BWUl9IRUFERVJfV0lEVEhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlaWdodCA9IGhlYWRlcltQVlJfSEVBREVSX0hFSUdIVF07XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YU9mZnNldCA9IGhlYWRlcltQVlJfSEVBREVSX01FVEFEQVRBXSArIDUyO1xyXG4gICAgICAgICAgICAgICAgbGV0IHB2cnRjRGF0YSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgZGF0YU9mZnNldCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIG91dCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YTogcHZydGNEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIF9jb21wcmVzc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyID0gZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUoZXJyLCBvdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KSgpLFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBQYXJzZSBwa20gZmlsZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDop6PmnpDljovnvKnnurnnkIbmoLzlvI8gcGttIOaWh+S7tlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHBhcnNlUEtNVGV4XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfEFycmF5QnVmZmVyVmlld30gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBwYXJzaW5nLlxyXG4gICAgICogQHBhcmFtIHtFcnJvcn0gb25Db21wbGV0ZS5lcnIgLSBUaGUgb2NjdXJyZWQgZXJyb3IsIG51bGwgaW5kaWNldGVzIHN1Y2Nlc3NcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvbkNvbXBsZXRlLmV0Y0Fzc2V0IC0gVGhlIHBhcnNlZCBjb250ZW50XHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBkb3dubG9hZGVyLmRvd25sb2FkRmlsZSgndGVzdC5wa20nLCB7cmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xyXG4gICAgICogICAgICBwYXJzZXIucGFyc2VQS01UZXgoZmlsZSwgbnVsbCwgKGVyciwgZXRjQXNzZXQpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwYXJzZVBLTVRleChmaWxlOiBBcnJheUJ1ZmZlcnxBcnJheUJ1ZmZlclZpZXcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBldGNBc3NldDoge19kYXRhOiBVaW50OEFycmF5LCBfY29tcHJlc3NlZDogYm9vbGVhbiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBwYXJzZVBLTVRleDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLz09PT09PT09PT09PT09PS8vXHJcbiAgICAgICAgLy8gRVRDIGNvbnN0YW50cyAvL1xyXG4gICAgICAgIC8vPT09PT09PT09PT09PT09Ly9cclxuICAgICAgICBjb25zdCBFVENfUEtNX0hFQURFUl9TSVpFID0gMTY7XHJcblxyXG4gICAgICAgIGNvbnN0IEVUQ19QS01fRk9STUFUX09GRlNFVCA9IDY7XHJcbiAgICAgICAgY29uc3QgRVRDX1BLTV9FTkNPREVEX1dJRFRIX09GRlNFVCA9IDg7XHJcbiAgICAgICAgY29uc3QgRVRDX1BLTV9FTkNPREVEX0hFSUdIVF9PRkZTRVQgPSAxMDtcclxuICAgICAgICBjb25zdCBFVENfUEtNX1dJRFRIX09GRlNFVCA9IDEyO1xyXG4gICAgICAgIGNvbnN0IEVUQ19QS01fSEVJR0hUX09GRlNFVCA9IDE0O1xyXG5cclxuICAgICAgICBjb25zdCBFVEMxX1JHQl9OT19NSVBNQVBTICAgPSAwO1xyXG4gICAgICAgIGNvbnN0IEVUQzJfUkdCX05PX01JUE1BUFMgICA9IDE7XHJcbiAgICAgICAgY29uc3QgRVRDMl9SR0JBX05PX01JUE1BUFMgID0gMztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZEJFVWludDE2KGhlYWRlciwgb2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoaGVhZGVyW29mZnNldF0gPDwgOCkgfCBoZWFkZXJbb2Zmc2V0KzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgbGV0IGVyciA9IG51bGwsIG91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gZmlsZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZmlsZSA6IGZpbGUuYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9ybWF0ID0gcmVhZEJFVWludDE2KGhlYWRlciwgRVRDX1BLTV9GT1JNQVRfT0ZGU0VUKTtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JtYXQgIT09IEVUQzFfUkdCX05PX01JUE1BUFMgJiYgZm9ybWF0ICE9PSBFVEMyX1JHQl9OT19NSVBNQVBTICYmIGZvcm1hdCAhPT0gRVRDMl9SR0JBX05PX01JUE1BUFMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFwiSW52YWxpZCBtYWdpYyBudW1iZXIgaW4gRVRDIGhlYWRlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IHJlYWRCRVVpbnQxNihoZWFkZXIsIEVUQ19QS01fV0lEVEhfT0ZGU0VUKTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSByZWFkQkVVaW50MTYoaGVhZGVyLCBFVENfUEtNX0hFSUdIVF9PRkZTRVQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuY29kZWRXaWR0aCA9IHJlYWRCRVVpbnQxNihoZWFkZXIsIEVUQ19QS01fRU5DT0RFRF9XSURUSF9PRkZTRVQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuY29kZWRIZWlnaHQgPSByZWFkQkVVaW50MTYoaGVhZGVyLCBFVENfUEtNX0VOQ09ERURfSEVJR0hUX09GRlNFVCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXRjRGF0YSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgRVRDX1BLTV9IRUFERVJfU0laRSk7XHJcbiAgICAgICAgICAgICAgICBvdXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGE6IGV0Y0RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbXByZXNzZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGVyciA9IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKGVyciwgb3V0KTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpLFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBQYXJzZSBwbGlzdCBmaWxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOino+aekCBwbGlzdCDmlofku7ZcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBwYXJzZVBsaXN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZSAtIFRoZSBkb3dubG9hZGVkIGZpbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBwYXJzaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHsqfSBvbkNvbXBsZXRlLmRhdGEgLSBUaGUgcGFyc2VkIGNvbnRlbnRcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCd0ZXN0LnBsaXN0Jywge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSwgbnVsbCwgKGVyciwgZmlsZSkgPT4ge1xyXG4gICAgICogICAgICBwYXJzZXIucGFyc2VQbGlzdChmaWxlLCBudWxsLCAoZXJyLCBkYXRhKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcGFyc2VQbGlzdChmaWxlOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU/OiAoZXJyOiBFcnJvciwgZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgICovXHJcbiAgICBwYXJzZVBsaXN0IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgdmFyIGVyciA9IG51bGw7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHBsaXN0UGFyc2VyLnBhcnNlKGZpbGUpO1xyXG4gICAgICAgIGlmICghcmVzdWx0KSBlcnIgPSBuZXcgRXJyb3IoJ3BhcnNlIGZhaWxlZCcpO1xyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIHJlc3VsdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBEZXNlcmlhbGl6ZSBhc3NldCBmaWxlXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWPjeW6j+WIl+WMlui1hOa6kOaWh+S7tlxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIHBhcnNlSW1wb3J0XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZmlsZSAtIFRoZSBzZXJpYWxpemVkIGpzb25cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlcnNcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGUgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBwYXJzaW5nXHJcbiAgICAgKiBAcGFyYW0ge0Vycm9yfSBvbkNvbXBsZXRlLmVyciAtIFRoZSBvY2N1cnJlZCBlcnJvciwgbnVsbCBpbmRpY2V0ZXMgc3VjY2Vzc1xyXG4gICAgICogQHBhcmFtIHtBc3NldH0gb25Db21wbGV0ZS5hc3NldCAtIFRoZSBwYXJzZWQgY29udGVudFxyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogZG93bmxvYWRlci5kb3dubG9hZEZpbGUoJ3Rlc3QuanNvbicsIHtyZXNwb25zZVR5cGU6ICdqc29uJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcclxuICAgICAqICAgICAgcGFyc2VyLnBhcnNlSW1wb3J0KGZpbGUsIG51bGwsIChlcnIsIGRhdGEpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiBwYXJzZUltcG9ydCAoZmlsZTogYW55LCBvcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LCBvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGFzc2V0OiBjYy5Bc3NldCkgPT4gdm9pZCk6IHZvaWRcclxuICAgICAqL1xyXG4gICAgcGFyc2VJbXBvcnQgKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcclxuICAgICAgICBpZiAoIWZpbGUpIHJldHVybiBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKCdKc29uIGlzIGVtcHR5JykpO1xyXG4gICAgICAgIHZhciByZXN1bHQsIGVyciA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gZGVzZXJpYWxpemUoZmlsZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGVyciA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShlcnIsIHJlc3VsdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQgKCkge1xyXG4gICAgICAgIF9wYXJzaW5nLmNsZWFyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVnaXN0ZXIgY3VzdG9tIGhhbmRsZXIgaWYgeW91IHdhbnQgdG8gY2hhbmdlIGRlZmF1bHQgYmVoYXZpb3Igb3IgZXh0ZW5kIHBhcnNlciB0byBwYXJzZSBvdGhlciBmb3JtYXQgZmlsZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlvZPkvaDmg7Pkv67mlLnpu5jorqTooYzkuLrmiJbogIXmi5PlsZUgcGFyc2VyIOadpeino+aekOWFtuS7luagvOW8j+aWh+S7tuaXtuWPr+S7peazqOWGjOiHquWumuS5ieeahGhhbmRsZXJcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCByZWdpc3RlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSB0eXBlIC0gRXh0ZW5zaW9uIGxpa2VzICcuanBnJyBvciBtYXAgbGlrZXMgeycuanBnJzoganBnSGFuZGxlciwgJy5wbmcnOiBwbmdIYW5kbGVyfVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2hhbmRsZXJdIC0gVGhlIGNvcnJlc3BvbmRpbmcgaGFuZGxlclxyXG4gICAgICogQHBhcmFtIHsqfSBoYW5kbGVyLmZpbGUgLSBGaWxlXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlci5vcHRpb25zIC0gU29tZSBvcHRpb25hbCBwYXJhbXRlclxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlci5vbkNvbXBsZXRlIC0gY2FsbGJhY2sgd2hlbiBmaW5pc2hpbmcgcGFyc2luZ1xyXG4gICAgICogXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcGFyc2VyLnJlZ2lzdGVyKCcudGdhJywgKGZpbGUsIG9wdGlvbnMsIG9uQ29tcGxldGUpID0+IG9uQ29tcGxldGUobnVsbCwgbnVsbCkpO1xyXG4gICAgICogcGFyc2VyLnJlZ2lzdGVyKHsnLnRnYSc6IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpLCAnLmV4dCc6IChmaWxlLCBvcHRpb25zLCBvbkNvbXBsZXRlKSA9PiBvbkNvbXBsZXRlKG51bGwsIG51bGwpfSk7XHJcbiAgICAgKiBcclxuICAgICAqIEB0eXBlc2NyaXB0XHJcbiAgICAgKiByZWdpc3Rlcih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IChmaWxlOiBhbnksIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKiByZWdpc3RlcihtYXA6IFJlY29yZDxzdHJpbmcsIChmaWxlOiBhbnksIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHZvaWQpID0+IHZvaWQ+KTogdm9pZFxyXG4gICAgICovXHJcbiAgICByZWdpc3RlciAodHlwZSwgaGFuZGxlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAganMubWl4aW4ocGFyc2VycywgdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJzZXJzW3R5cGVdID0gaGFuZGxlcjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVXNlIGNvcnJlc3BvbmRpbmcgaGFuZGxlciB0byBwYXJzZSBmaWxlIFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDkvb/nlKjlr7nlupTnmoRoYW5kbGVy5p2l6Kej5p6Q5paH5Lu2XHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcGFyc2VcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpZCBvZiBmaWxlXHJcbiAgICAgKiBAcGFyYW0geyp9IGZpbGUgLSBGaWxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBjb3JyZXNwb25kaW5nIHR5cGUgb2YgZmlsZSwgbGlrZXMgJy5qcGcnLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBTb21lIG9wdGlvbmFsIHBhcmFtdGVycyB3aWxsIGJlIHRyYW5zZmVycmVkIHRvIHRoZSBjb3JyZXNwb25kaW5nIGhhbmRsZXIuXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlIC0gY2FsbGJhY2sgd2hlbiBmaW5pc2hpbmcgZG93bmxvYWRpbmdcclxuICAgICAqIEBwYXJhbSB7RXJyb3J9IG9uQ29tcGxldGUuZXJyIC0gVGhlIG9jY3VycmVkIGVycm9yLCBudWxsIGluZGljZXRlcyBzdWNjZXNzXHJcbiAgICAgKiBAcGFyYW0geyp9IG9uQ29tcGxldGUuY29udGV0bnQgLSBUaGUgcGFyc2VkIGZpbGVcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGRvd25sb2FkZXIuZG93bmxvYWRGaWxlKCd0ZXN0LmpwZycsIHtyZXNwb25zZVR5cGU6ICdibG9iJ30sIG51bGwsIChlcnIsIGZpbGUpID0+IHtcclxuICAgICAqICAgICAgcGFyc2VyLnBhcnNlKCd0ZXN0LmpwZycsIGZpbGUsICcuanBnJywgbnVsbCwgKGVyciwgaW1nKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAqIH0pO1xyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcGFyc2UoaWQ6IHN0cmluZywgZmlsZTogYW55LCB0eXBlOiBzdHJpbmcsIG9wdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4sIG9uQ29tcGxldGU6IChlcnI6IEVycm9yLCBjb250ZW50OiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHBhcnNlIChpZCwgZmlsZSwgdHlwZSwgb3B0aW9ucywgb25Db21wbGV0ZSkge1xyXG4gICAgICAgIGxldCBwYXJzZWRBc3NldCwgcGFyc2luZywgcGFyc2VIYW5kbGVyO1xyXG4gICAgICAgIGlmIChwYXJzZWRBc3NldCA9IHBhcnNlZC5nZXQoaWQpKSB7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUobnVsbCwgcGFyc2VkQXNzZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwYXJzaW5nID0gX3BhcnNpbmcuZ2V0KGlkKSl7XHJcbiAgICAgICAgICAgIHBhcnNpbmcucHVzaChvbkNvbXBsZXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocGFyc2VIYW5kbGVyID0gcGFyc2Vyc1t0eXBlXSl7XHJcbiAgICAgICAgICAgIF9wYXJzaW5nLmFkZChpZCwgW29uQ29tcGxldGVdKTtcclxuICAgICAgICAgICAgcGFyc2VIYW5kbGVyKGZpbGUsIG9wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlcy5yZW1vdmUoaWQpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFpc1NjZW5lKGRhdGEpKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZWQuYWRkKGlkLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSBfcGFyc2luZy5yZW1vdmUoaWQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldKGVyciwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZShudWxsLCBmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgcGFyc2VycyA9IHtcclxuICAgICcucG5nJyA6IHBhcnNlci5wYXJzZUltYWdlLFxyXG4gICAgJy5qcGcnIDogcGFyc2VyLnBhcnNlSW1hZ2UsXHJcbiAgICAnLmJtcCcgOiBwYXJzZXIucGFyc2VJbWFnZSxcclxuICAgICcuanBlZycgOiBwYXJzZXIucGFyc2VJbWFnZSxcclxuICAgICcuZ2lmJyA6IHBhcnNlci5wYXJzZUltYWdlLFxyXG4gICAgJy5pY28nIDogcGFyc2VyLnBhcnNlSW1hZ2UsXHJcbiAgICAnLnRpZmYnIDogcGFyc2VyLnBhcnNlSW1hZ2UsXHJcbiAgICAnLndlYnAnIDogcGFyc2VyLnBhcnNlSW1hZ2UsXHJcbiAgICAnLmltYWdlJyA6IHBhcnNlci5wYXJzZUltYWdlLFxyXG4gICAgJy5wdnInIDogcGFyc2VyLnBhcnNlUFZSVGV4LFxyXG4gICAgJy5wa20nIDogcGFyc2VyLnBhcnNlUEtNVGV4LFxyXG4gICAgLy8gQXVkaW9cclxuICAgICcubXAzJyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxyXG4gICAgJy5vZ2cnIDogcGFyc2VyLnBhcnNlQXVkaW8sXHJcbiAgICAnLndhdicgOiBwYXJzZXIucGFyc2VBdWRpbyxcclxuICAgICcubTRhJyA6IHBhcnNlci5wYXJzZUF1ZGlvLFxyXG5cclxuICAgIC8vIHBsaXN0XHJcbiAgICAnLnBsaXN0JyA6IHBhcnNlci5wYXJzZVBsaXN0LFxyXG4gICAgJ2ltcG9ydCcgOiBwYXJzZXIucGFyc2VJbXBvcnRcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcGFyc2VyOyJdLCJzb3VyY2VSb290IjoiLyJ9