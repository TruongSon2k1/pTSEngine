
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/request-item.js';
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
var MAX_DEAD_NUM = 500;
var _deadPool = [];
/**
 * !#en
 * A collection of information about a request
 * 
 * !#zh
 * 请求的相关信息集合
 * 
 * @class RequestItem
 */

function RequestItem() {
  this._id = '';
  /**
   * !#en 
   * The uuid of request
   * 
   * !#zh 
   * 请求资源的uuid
   * 
   * @property uuid
   * @type {String}
   */

  this.uuid = '';
  /**
   * !#en 
   * The final url of request
   * 
   * !#zh
   * 请求的最终url
   * 
   * @property url
   * @type {String}
   */

  this.url = '';
  /**
   * !#en
   * The extension name of asset
   * 
   * !#zh
   * 资源的扩展名
   * 
   * @property ext
   * @type {String}
   */

  this.ext = '.json';
  /**
   * !#en
   * The content of asset
   * 
   * !#zh
   * 资源的内容
   * 
   * @property content
   * @type {*}
   */

  this.content = null;
  /**
   * !#en
   * The file of asset
   * 
   * !#zh
   * 资源的文件
   * 
   * @property file
   * @type {*}
   */

  this.file = null;
  /**
   * !#en
   * The information of asset
   * 
   * !#zh
   * 资源的相关信息
   * 
   * @property info
   * @type {Object}
   */

  this.info = null;
  this.config = null;
  /**
   * !#en
   * Whether or not it is native asset
   * 
   * !#zh
   * 资源是否是原生资源
   * 
   * @property isNative
   * @type {Boolean}
   */

  this.isNative = false;
  /**
   * !#en
   * Custom options
   * 
   * !#zh
   * 自定义参数
   * 
   * @property options
   * @type {Object}
   */

  this.options = Object.create(null);
}

RequestItem.prototype = {
  /**
   * !#en
   * Create a request item
   * 
   * !#zh
   * 创建一个 request item
   * 
   * @method constructor
   * 
   * @typescript
   * constructor()
   */
  constructor: RequestItem,

  /**
   * !#en
   * The id of request, combined from uuid and isNative
   * 
   * !#zh
   * 请求的 id, 由 uuid 和 isNative 组合而成
   * 
   * @property id
   * @type {String}
   */
  get id() {
    if (!this._id) {
      this._id = this.uuid + '@' + (this.isNative ? 'native' : 'import');
    }

    return this._id;
  },

  /**
   * !#en
   * Recycle this for reuse
   * 
   * !#zh
   * 回收 requestItem 用于复用
   * 
   * @method recycle
   * 
   * @typescript
   * recycle(): void
   */
  recycle: function recycle() {
    if (_deadPool.length === MAX_DEAD_NUM) return;
    this._id = '';
    this.uuid = '';
    this.url = '';
    this.ext = '.json';
    this.content = null;
    this.file = null;
    this.info = null;
    this.config = null;
    this.isNative = false;
    this.options = Object.create(null);

    _deadPool.push(this);
  }
};
/**
 * !#en
 * Create a new request item from pool
 * 
 * !#zh
 * 从对象池中创建 requestItem
 * 
 * @static
 * @method create
 * @returns {RequestItem} requestItem
 * 
 * @typescript 
 * create(): RequestItem
 */

RequestItem.create = function () {
  var out = null;

  if (_deadPool.length !== 0) {
    out = _deadPool.pop();
  } else {
    out = new RequestItem();
  }

  return out;
};

module.exports = RequestItem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGFzc2V0LW1hbmFnZXJcXHJlcXVlc3QtaXRlbS5qcyJdLCJuYW1lcyI6WyJNQVhfREVBRF9OVU0iLCJfZGVhZFBvb2wiLCJSZXF1ZXN0SXRlbSIsIl9pZCIsInV1aWQiLCJ1cmwiLCJleHQiLCJjb250ZW50IiwiZmlsZSIsImluZm8iLCJjb25maWciLCJpc05hdGl2ZSIsIm9wdGlvbnMiLCJPYmplY3QiLCJjcmVhdGUiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImlkIiwicmVjeWNsZSIsImxlbmd0aCIsInB1c2giLCJvdXQiLCJwb3AiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLFlBQVksR0FBRyxHQUFuQjtBQUNBLElBQUlDLFNBQVMsR0FBRyxFQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxTQUFTQyxXQUFULEdBQXdCO0FBRXBCLE9BQUtDLEdBQUwsR0FBVyxFQUFYO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSSxPQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtDLEdBQUwsR0FBVyxPQUFYO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsT0FBTCxHQUFlLElBQWY7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSSxPQUFLQyxJQUFMLEdBQVksSUFBWjtBQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJLE9BQUtDLElBQUwsR0FBWSxJQUFaO0FBRUEsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDSSxPQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0ksT0FBS0MsT0FBTCxHQUFlQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDSDs7QUFFRFosV0FBVyxDQUFDYSxTQUFaLEdBQXdCO0FBRXBCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxXQUFXLEVBQUVkLFdBZE87O0FBZ0JwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJLE1BQUllLEVBQUosR0FBVTtBQUNOLFFBQUksQ0FBQyxLQUFLZCxHQUFWLEVBQWU7QUFDWCxXQUFLQSxHQUFMLEdBQVcsS0FBS0MsSUFBTCxHQUFZLEdBQVosSUFBbUIsS0FBS08sUUFBTCxHQUFnQixRQUFoQixHQUEyQixRQUE5QyxDQUFYO0FBQ0g7O0FBQ0QsV0FBTyxLQUFLUixHQUFaO0FBQ0gsR0EvQm1COztBQWlDcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0llLEVBQUFBLE9BN0NvQixxQkE2Q1Q7QUFDUCxRQUFJakIsU0FBUyxDQUFDa0IsTUFBVixLQUFxQm5CLFlBQXpCLEVBQXVDO0FBQ3ZDLFNBQUtHLEdBQUwsR0FBVyxFQUFYO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxPQUFYO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQWY7O0FBQ0FiLElBQUFBLFNBQVMsQ0FBQ21CLElBQVYsQ0FBZSxJQUFmO0FBQ0g7QUExRG1CLENBQXhCO0FBNkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0FsQixXQUFXLENBQUNZLE1BQVosR0FBcUIsWUFBWTtBQUM3QixNQUFJTyxHQUFHLEdBQUcsSUFBVjs7QUFDQSxNQUFJcEIsU0FBUyxDQUFDa0IsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QkUsSUFBQUEsR0FBRyxHQUFHcEIsU0FBUyxDQUFDcUIsR0FBVixFQUFOO0FBQ0gsR0FGRCxNQUdLO0FBQ0RELElBQUFBLEdBQUcsR0FBRyxJQUFJbkIsV0FBSixFQUFOO0FBQ0g7O0FBRUQsU0FBT21CLEdBQVA7QUFDSCxDQVZEOztBQVlBRSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QixXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjYy5Bc3NldE1hbmFnZXJcclxuICovXHJcblxyXG52YXIgTUFYX0RFQURfTlVNID0gNTAwO1xyXG52YXIgX2RlYWRQb29sID0gW107XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBIGNvbGxlY3Rpb24gb2YgaW5mb3JtYXRpb24gYWJvdXQgYSByZXF1ZXN0XHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOivt+axgueahOebuOWFs+S/oeaBr+mbhuWQiFxyXG4gKiBcclxuICogQGNsYXNzIFJlcXVlc3RJdGVtXHJcbiAqL1xyXG5mdW5jdGlvbiBSZXF1ZXN0SXRlbSAoKSB7XHJcblxyXG4gICAgdGhpcy5faWQgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgdXVpZCBvZiByZXF1ZXN0XHJcbiAgICAgKiBcclxuICAgICAqICEjemggXHJcbiAgICAgKiDor7fmsYLotYTmupDnmoR1dWlkXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB1dWlkXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnV1aWQgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBUaGUgZmluYWwgdXJsIG9mIHJlcXVlc3RcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6K+35rGC55qE5pyA57uIdXJsXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB1cmxcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudXJsID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgZXh0ZW5zaW9uIG5hbWUgb2YgYXNzZXRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6LWE5rqQ55qE5omp5bGV5ZCNXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBleHRcclxuICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXh0ID0gJy5qc29uJztcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBjb250ZW50IG9mIGFzc2V0XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOi1hOa6kOeahOWGheWuuVxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgY29udGVudFxyXG4gICAgICogQHR5cGUgeyp9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29udGVudCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgZmlsZSBvZiBhc3NldFxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDotYTmupDnmoTmlofku7ZcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGZpbGVcclxuICAgICAqIEB0eXBlIHsqfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpbGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogVGhlIGluZm9ybWF0aW9uIG9mIGFzc2V0XHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOi1hOa6kOeahOebuOWFs+S/oeaBr1xyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgaW5mb1xyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pbmZvID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmNvbmZpZyA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCBpdCBpcyBuYXRpdmUgYXNzZXRcclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog6LWE5rqQ5piv5ZCm5piv5Y6f55Sf6LWE5rqQXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBpc05hdGl2ZVxyXG4gICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaXNOYXRpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEN1c3RvbSBvcHRpb25zXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOiHquWumuS5ieWPguaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkgb3B0aW9uc1xyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxufVxyXG5cclxuUmVxdWVzdEl0ZW0ucHJvdG90eXBlID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ3JlYXRlIGEgcmVxdWVzdCBpdGVtXHJcbiAgICAgKiBcclxuICAgICAqICEjemhcclxuICAgICAqIOWIm+W7uuS4gOS4qiByZXF1ZXN0IGl0ZW1cclxuICAgICAqIFxyXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogY29uc3RydWN0b3IoKVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcjogUmVxdWVzdEl0ZW0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgaWQgb2YgcmVxdWVzdCwgY29tYmluZWQgZnJvbSB1dWlkIGFuZCBpc05hdGl2ZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDor7fmsYLnmoQgaWQsIOeUsSB1dWlkIOWSjCBpc05hdGl2ZSDnu4TlkIjogIzmiJBcclxuICAgICAqIFxyXG4gICAgICogQHByb3BlcnR5IGlkXHJcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXQgaWQgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5faWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faWQgPSB0aGlzLnV1aWQgKyAnQCcgKyAodGhpcy5pc05hdGl2ZSA/ICduYXRpdmUnIDogJ2ltcG9ydCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogUmVjeWNsZSB0aGlzIGZvciByZXVzZVxyXG4gICAgICogXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDlm57mlLYgcmVxdWVzdEl0ZW0g55So5LqO5aSN55SoXHJcbiAgICAgKiBcclxuICAgICAqIEBtZXRob2QgcmVjeWNsZVxyXG4gICAgICogXHJcbiAgICAgKiBAdHlwZXNjcmlwdFxyXG4gICAgICogcmVjeWNsZSgpOiB2b2lkXHJcbiAgICAgKi9cclxuICAgIHJlY3ljbGUgKCkge1xyXG4gICAgICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoID09PSBNQVhfREVBRF9OVU0pIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pZCA9ICcnO1xyXG4gICAgICAgIHRoaXMudXVpZCA9ICcnO1xyXG4gICAgICAgIHRoaXMudXJsID0gJyc7XHJcbiAgICAgICAgdGhpcy5leHQgPSAnLmpzb24nO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluZm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29uZmlnID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlzTmF0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICBfZGVhZFBvb2wucHVzaCh0aGlzKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENyZWF0ZSBhIG5ldyByZXF1ZXN0IGl0ZW0gZnJvbSBwb29sXHJcbiAqIFxyXG4gKiAhI3poXHJcbiAqIOS7juWvueixoeaxoOS4reWIm+W7uiByZXF1ZXN0SXRlbVxyXG4gKiBcclxuICogQHN0YXRpY1xyXG4gKiBAbWV0aG9kIGNyZWF0ZVxyXG4gKiBAcmV0dXJucyB7UmVxdWVzdEl0ZW19IHJlcXVlc3RJdGVtXHJcbiAqIFxyXG4gKiBAdHlwZXNjcmlwdCBcclxuICogY3JlYXRlKCk6IFJlcXVlc3RJdGVtXHJcbiAqL1xyXG5SZXF1ZXN0SXRlbS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgb3V0ID0gbnVsbDtcclxuICAgIGlmIChfZGVhZFBvb2wubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgb3V0ID0gX2RlYWRQb29sLnBvcCgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgb3V0ID0gbmV3IFJlcXVlc3RJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dDtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEl0ZW07Il0sInNvdXJjZVJvb3QiOiIvIn0=