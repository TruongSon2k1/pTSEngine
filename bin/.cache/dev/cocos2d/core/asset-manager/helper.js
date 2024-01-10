
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/helper.js';
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
var _require = require('./shared'),
    bundles = _require.bundles;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * Provide some helpful function, it is a singleton. All member can be accessed with `cc.assetManager.utils`
 * 
 * !#zh
 * 提供一些辅助方法，helper 是一个单例, 所有成员能通过 `cc.assetManager.utils` 访问
 * 
 * @class Helper
 */


var helper = {
  /**
   * !#en
   * Decode uuid, returns the original uuid
   * 
   * !#zh
   * 解码 uuid，返回原始 uuid
   * 
   * @method decodeUuid
   * @param {String} base64 - the encoded uuid
   * @returns {String} the original uuid 
   * 
   * @example
   * var uuid = 'fcmR3XADNLgJ1ByKhqcC5Z';
   * var originalUuid = decodeUuid(uuid); // fc991dd7-0033-4b80-9d41-c8a86a702e59
   * 
   * @typescript
   * decodeUuid(base64: string): string
   */
  decodeUuid: require('../utils/decode-uuid'),

  /**
   * !#en
   * Extract uuid from url
   * 
   * !#zh
   * 从 url 中提取 uuid
   * 
   * @method getUuidFromURL
   * @param {String} url - url
   * @returns {String} the uuid parsed from url
   * 
   * @example
   * var url = 'assets/main/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
   * var uuid = getUuidFromURL(url); // fc991dd7-0033-4b80-9d41-c8a86a702e59
   * 
   * @typescript
   * getUuidFromURL(url: string): string
   */
  getUuidFromURL: function () {
    var _uuidRegex = /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/;
    return function (url) {
      var matches = url.match(_uuidRegex);

      if (matches) {
        return matches[1];
      }

      return '';
    };
  }(),

  /**
   * !#en
   * Transform uuid to url
   * 
   * !#zh
   * 转换 uuid 为 url
   * 
   * @method getUrlWithUuid
   * @param {string} uuid - The uuid of asset
   * @param {Object} [options] - Some optional parameters
   * @param {Boolean} [options.isNative] - Indicates whether the path you want is a native resource path
   * @param {string} [options.nativeExt] - Extension of the native resource path, it is required when isNative is true
   * @returns {string} url
   * 
   * @example
   * // json path, 'assets/main/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
   * var url = getUrlWithUuid('fcmR3XADNLgJ1ByKhqcC5Z', {isNative: false});
   * 
   * // png path, 'assets/main/native/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.png';
   * var url = getUrlWithUuid('fcmR3XADNLgJ1ByKhqcC5Z', {isNative: true, nativeExt: '.png'});
   * 
   * @typescript
   * getUrlWithUuid(uuid: string, options?: Record<string, any>): string
   */
  getUrlWithUuid: function getUrlWithUuid(uuid, options) {
    options = options || Object.create(null);
    options.__isNative__ = options.isNative;
    options.ext = options.nativeExt;
    var bundle = bundles.find(function (bundle) {
      return bundle.getAssetInfo(uuid);
    });

    if (bundle) {
      options.bundle = bundle.name;
    }

    return cc.assetManager._transform(uuid, options);
  },

  /**
   * !#en
   * Check if the type of asset is scene
   * 
   * !#zh
   * 检查资源类型是否是场景
   * 
   * @method isScene
   * @param {*} asset - asset
   * @returns {boolean} - whether or not type is cc.SceneAsset
   * 
   * @typescript
   * isScene(asset: any): boolean
   */
  isScene: function isScene(asset) {
    return asset && (asset.constructor === cc.SceneAsset || asset instanceof cc.Scene);
  },

  /**
   * !#en
   * Normalize url, strip './' and '/'
   * 
   * !#zh
   * 标准化 url ，去除 './' 和 '/' 
   * 
   * @method normalize
   * @param {string} url - url
   * @returns {string} - The normalized url
   * 
   * @typescript
   * normalize(url: string): string
   */
  normalize: function normalize(url) {
    if (url) {
      if (url.charCodeAt(0) === 46 && url.charCodeAt(1) === 47) {
        // strip './'
        url = url.slice(2);
      } else if (url.charCodeAt(0) === 47) {
        // strip '/'
        url = url.slice(1);
      }
    }

    return url;
  }
};
module.exports = helper;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXGhlbHBlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiYnVuZGxlcyIsImhlbHBlciIsImRlY29kZVV1aWQiLCJnZXRVdWlkRnJvbVVSTCIsIl91dWlkUmVnZXgiLCJ1cmwiLCJtYXRjaGVzIiwibWF0Y2giLCJnZXRVcmxXaXRoVXVpZCIsInV1aWQiLCJvcHRpb25zIiwiT2JqZWN0IiwiY3JlYXRlIiwiX19pc05hdGl2ZV9fIiwiaXNOYXRpdmUiLCJleHQiLCJuYXRpdmVFeHQiLCJidW5kbGUiLCJmaW5kIiwiZ2V0QXNzZXRJbmZvIiwibmFtZSIsImNjIiwiYXNzZXRNYW5hZ2VyIiwiX3RyYW5zZm9ybSIsImlzU2NlbmUiLCJhc3NldCIsImNvbnN0cnVjdG9yIiwiU2NlbmVBc3NldCIsIlNjZW5lIiwibm9ybWFsaXplIiwiY2hhckNvZGVBdCIsInNsaWNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtlQUNvQkEsT0FBTyxDQUFDLFVBQUQ7SUFBbkJDLG1CQUFBQTtBQUNSO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlDLE1BQU0sR0FBRztBQUNUO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxVQUFVLEVBQUVILE9BQU8sQ0FBQyxzQkFBRCxDQW5CVjs7QUFxQlQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lJLEVBQUFBLGNBQWMsRUFBRyxZQUFZO0FBQ3pCLFFBQUlDLFVBQVUsR0FBRyw4Q0FBakI7QUFDQSxXQUFPLFVBQVVDLEdBQVYsRUFBZTtBQUNsQixVQUFJQyxPQUFPLEdBQUdELEdBQUcsQ0FBQ0UsS0FBSixDQUFVSCxVQUFWLENBQWQ7O0FBQ0EsVUFBSUUsT0FBSixFQUFhO0FBQ1QsZUFBT0EsT0FBTyxDQUFDLENBQUQsQ0FBZDtBQUNIOztBQUNELGFBQU8sRUFBUDtBQUNILEtBTkQ7QUFPSCxHQVRlLEVBdkNQOztBQWtEVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUUsRUFBQUEsY0FBYyxFQUFFLHdCQUFVQyxJQUFWLEVBQWdCQyxPQUFoQixFQUF5QjtBQUNyQ0EsSUFBQUEsT0FBTyxHQUFHQSxPQUFPLElBQUlDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBckI7QUFDQUYsSUFBQUEsT0FBTyxDQUFDRyxZQUFSLEdBQXVCSCxPQUFPLENBQUNJLFFBQS9CO0FBQ0FKLElBQUFBLE9BQU8sQ0FBQ0ssR0FBUixHQUFjTCxPQUFPLENBQUNNLFNBQXRCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHakIsT0FBTyxDQUFDa0IsSUFBUixDQUFhLFVBQVVELE1BQVYsRUFBa0I7QUFDeEMsYUFBT0EsTUFBTSxDQUFDRSxZQUFQLENBQW9CVixJQUFwQixDQUFQO0FBQ0gsS0FGWSxDQUFiOztBQUlBLFFBQUlRLE1BQUosRUFBWTtBQUNSUCxNQUFBQSxPQUFPLENBQUNPLE1BQVIsR0FBaUJBLE1BQU0sQ0FBQ0csSUFBeEI7QUFDSDs7QUFFRCxXQUFPQyxFQUFFLENBQUNDLFlBQUgsQ0FBZ0JDLFVBQWhCLENBQTJCZCxJQUEzQixFQUFpQ0MsT0FBakMsQ0FBUDtBQUNILEdBdkZROztBQXlGVDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0ljLEVBQUFBLE9BQU8sRUFBRSxpQkFBVUMsS0FBVixFQUFpQjtBQUN0QixXQUFPQSxLQUFLLEtBQUtBLEtBQUssQ0FBQ0MsV0FBTixLQUFzQkwsRUFBRSxDQUFDTSxVQUF6QixJQUF1Q0YsS0FBSyxZQUFZSixFQUFFLENBQUNPLEtBQWhFLENBQVo7QUFDSCxHQXpHUTs7QUEyR1Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxTQUFTLEVBQUUsbUJBQVV4QixHQUFWLEVBQWU7QUFDdEIsUUFBSUEsR0FBSixFQUFTO0FBQ0wsVUFBSUEsR0FBRyxDQUFDeUIsVUFBSixDQUFlLENBQWYsTUFBc0IsRUFBdEIsSUFBNEJ6QixHQUFHLENBQUN5QixVQUFKLENBQWUsQ0FBZixNQUFzQixFQUF0RCxFQUEwRDtBQUN0RDtBQUNBekIsUUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUMwQixLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0gsT0FIRCxNQUlLLElBQUkxQixHQUFHLENBQUN5QixVQUFKLENBQWUsQ0FBZixNQUFzQixFQUExQixFQUE4QjtBQUMvQjtBQUNBekIsUUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUMwQixLQUFKLENBQVUsQ0FBVixDQUFOO0FBQ0g7QUFDSjs7QUFDRCxXQUFPMUIsR0FBUDtBQUNIO0FBcklRLENBQWI7QUF3SUEyQixNQUFNLENBQUNDLE9BQVAsR0FBaUJoQyxNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbmNvbnN0IHsgYnVuZGxlcyB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcclxuLyoqXHJcbiAqIEBtb2R1bGUgY2MuQXNzZXRNYW5hZ2VyXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBQcm92aWRlIHNvbWUgaGVscGZ1bCBmdW5jdGlvbiwgaXQgaXMgYSBzaW5nbGV0b24uIEFsbCBtZW1iZXIgY2FuIGJlIGFjY2Vzc2VkIHdpdGggYGNjLmFzc2V0TWFuYWdlci51dGlsc2BcclxuICogXHJcbiAqICEjemhcclxuICog5o+Q5L6b5LiA5Lqb6L6F5Yqp5pa55rOV77yMaGVscGVyIOaYr+S4gOS4quWNleS+iywg5omA5pyJ5oiQ5ZGY6IO96YCa6L+HIGBjYy5hc3NldE1hbmFnZXIudXRpbHNgIOiuv+mXrlxyXG4gKiBcclxuICogQGNsYXNzIEhlbHBlclxyXG4gKi9cclxudmFyIGhlbHBlciA9IHtcclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRGVjb2RlIHV1aWQsIHJldHVybnMgdGhlIG9yaWdpbmFsIHV1aWRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6Kej56CBIHV1aWTvvIzov5Tlm57ljp/lp4sgdXVpZFxyXG4gICAgICogXHJcbiAgICAgKiBAbWV0aG9kIGRlY29kZVV1aWRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgLSB0aGUgZW5jb2RlZCB1dWlkXHJcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgb3JpZ2luYWwgdXVpZCBcclxuICAgICAqIFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciB1dWlkID0gJ2ZjbVIzWEFETkxnSjFCeUtocWNDNVonO1xyXG4gICAgICogdmFyIG9yaWdpbmFsVXVpZCA9IGRlY29kZVV1aWQodXVpZCk7IC8vIGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZGVjb2RlVXVpZChiYXNlNjQ6IHN0cmluZyk6IHN0cmluZ1xyXG4gICAgICovXHJcbiAgICBkZWNvZGVVdWlkOiByZXF1aXJlKCcuLi91dGlscy9kZWNvZGUtdXVpZCcpLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRXh0cmFjdCB1dWlkIGZyb20gdXJsXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOS7jiB1cmwg5Lit5o+Q5Y+WIHV1aWRcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBnZXRVdWlkRnJvbVVSTFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCAtIHVybFxyXG4gICAgICogQHJldHVybnMge1N0cmluZ30gdGhlIHV1aWQgcGFyc2VkIGZyb20gdXJsXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiB2YXIgdXJsID0gJ2Fzc2V0cy9tYWluL2ltcG9ydC9mYy9mYzk5MWRkNy0wMDMzLTRiODAtOWQ0MS1jOGE4NmE3MDJlNTkuanNvbic7XHJcbiAgICAgKiB2YXIgdXVpZCA9IGdldFV1aWRGcm9tVVJMKHVybCk7IC8vIGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogZ2V0VXVpZEZyb21VUkwodXJsOiBzdHJpbmcpOiBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgZ2V0VXVpZEZyb21VUkw6IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF91dWlkUmVnZXggPSAvLipbL1xcXFxdWzAtOWEtZkEtRl17Mn1bL1xcXFxdKFswLTlhLWZBLUYtXXs4LH0pLztcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHVybC5tYXRjaChfdXVpZFJlZ2V4KTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9KSgpLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVHJhbnNmb3JtIHV1aWQgdG8gdXJsXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOi9rOaNoiB1dWlkIOS4uiB1cmxcclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBnZXRVcmxXaXRoVXVpZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCBvZiBhc3NldFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIFNvbWUgb3B0aW9uYWwgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5pc05hdGl2ZV0gLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcGF0aCB5b3Ugd2FudCBpcyBhIG5hdGl2ZSByZXNvdXJjZSBwYXRoXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMubmF0aXZlRXh0XSAtIEV4dGVuc2lvbiBvZiB0aGUgbmF0aXZlIHJlc291cmNlIHBhdGgsIGl0IGlzIHJlcXVpcmVkIHdoZW4gaXNOYXRpdmUgaXMgdHJ1ZVxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gdXJsXHJcbiAgICAgKiBcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBqc29uIHBhdGgsICdhc3NldHMvbWFpbi9pbXBvcnQvZmMvZmM5OTFkZDctMDAzMy00YjgwLTlkNDEtYzhhODZhNzAyZTU5Lmpzb24nO1xyXG4gICAgICogdmFyIHVybCA9IGdldFVybFdpdGhVdWlkKCdmY21SM1hBRE5MZ0oxQnlLaHFjQzVaJywge2lzTmF0aXZlOiBmYWxzZX0pO1xyXG4gICAgICogXHJcbiAgICAgKiAvLyBwbmcgcGF0aCwgJ2Fzc2V0cy9tYWluL25hdGl2ZS9mYy9mYzk5MWRkNy0wMDMzLTRiODAtOWQ0MS1jOGE4NmE3MDJlNTkucG5nJztcclxuICAgICAqIHZhciB1cmwgPSBnZXRVcmxXaXRoVXVpZCgnZmNtUjNYQUROTGdKMUJ5S2hxY0M1WicsIHtpc05hdGl2ZTogdHJ1ZSwgbmF0aXZlRXh0OiAnLnBuZyd9KTtcclxuICAgICAqIFxyXG4gICAgICogQHR5cGVzY3JpcHRcclxuICAgICAqIGdldFVybFdpdGhVdWlkKHV1aWQ6IHN0cmluZywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4pOiBzdHJpbmdcclxuICAgICAqL1xyXG4gICAgZ2V0VXJsV2l0aFV1aWQ6IGZ1bmN0aW9uICh1dWlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICBvcHRpb25zLl9faXNOYXRpdmVfXyA9IG9wdGlvbnMuaXNOYXRpdmU7XHJcbiAgICAgICAgb3B0aW9ucy5leHQgPSBvcHRpb25zLm5hdGl2ZUV4dDtcclxuICAgICAgICB2YXIgYnVuZGxlID0gYnVuZGxlcy5maW5kKGZ1bmN0aW9uIChidW5kbGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZS5nZXRBc3NldEluZm8odXVpZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChidW5kbGUpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5idW5kbGUgPSBidW5kbGUubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjYy5hc3NldE1hbmFnZXIuX3RyYW5zZm9ybSh1dWlkLCBvcHRpb25zKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgdHlwZSBvZiBhc3NldCBpcyBzY2VuZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmo4Dmn6XotYTmupDnsbvlnovmmK/lkKbmmK/lnLrmma9cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBpc1NjZW5lXHJcbiAgICAgKiBAcGFyYW0geyp9IGFzc2V0IC0gYXNzZXRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSAtIHdoZXRoZXIgb3Igbm90IHR5cGUgaXMgY2MuU2NlbmVBc3NldFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogaXNTY2VuZShhc3NldDogYW55KTogYm9vbGVhblxyXG4gICAgICovXHJcbiAgICBpc1NjZW5lOiBmdW5jdGlvbiAoYXNzZXQpIHtcclxuICAgICAgICByZXR1cm4gYXNzZXQgJiYgKGFzc2V0LmNvbnN0cnVjdG9yID09PSBjYy5TY2VuZUFzc2V0IHx8IGFzc2V0IGluc3RhbmNlb2YgY2MuU2NlbmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIE5vcm1hbGl6ZSB1cmwsIHN0cmlwICcuLycgYW5kICcvJ1xyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmoIflh4bljJYgdXJsIO+8jOWOu+mZpCAnLi8nIOWSjCAnLycgXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdXJsXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBub3JtYWxpemVkIHVybFxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogbm9ybWFsaXplKHVybDogc3RyaW5nKTogc3RyaW5nXHJcbiAgICAgKi9cclxuICAgIG5vcm1hbGl6ZTogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgaWYgKHVybC5jaGFyQ29kZUF0KDApID09PSA0NiAmJiB1cmwuY2hhckNvZGVBdCgxKSA9PT0gNDcpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmlwICcuLydcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zbGljZSgyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh1cmwuY2hhckNvZGVBdCgwKSA9PT0gNDcpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0cmlwICcvJ1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==