
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
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

/**
 * !#en
 * The global main namespace of Spine, all classes, functions,
 * properties and constants of Spine are defined in this namespace
 * !#zh
 * Spine 的全局的命名空间，
 * 与 Spine 相关的所有的类，函数，属性，常量都在这个命名空间中定义。
 * @module sp
 * @main sp
 */

/*
 * Reference:
 * http://esotericsoftware.com/spine-runtime-terminology
 * http://esotericsoftware.com/files/runtime-diagram.png
 * http://en.esotericsoftware.com/spine-using-runtimes
 */
var _global = typeof window === 'undefined' ? global : window;

var _isUseSpine = true;

if (!CC_NATIVERENDERER) {
  _global.spine = require('./lib/spine');
} else if (!_global.spine) {
  _isUseSpine = false;
}

if (_isUseSpine) {
  _global.sp = {};
  /**
   * !#en
   * The global time scale of Spine.
   * !#zh
   * Spine 全局时间缩放率。
   * @example
   * sp.timeScale = 0.8;
   */

  sp._timeScale = 1.0;
  Object.defineProperty(sp, 'timeScale', {
    get: function get() {
      return this._timeScale;
    },
    set: function set(value) {
      this._timeScale = value;
    },
    configurable: true
  }); // The attachment type of spine. It contains three type: REGION(0), BOUNDING_BOX(1), MESH(2) and SKINNED_MESH.

  sp.ATTACHMENT_TYPE = {
    REGION: 0,
    BOUNDING_BOX: 1,
    MESH: 2,
    SKINNED_MESH: 3
  };
  /**
   * !#en The event type of spine skeleton animation.
   * !#zh 骨骼动画事件类型。
   * @enum AnimationEventType
   */

  sp.AnimationEventType = cc.Enum({
    /**
     * !#en The play spine skeleton animation start type.
     * !#zh 开始播放骨骼动画。
     * @property {Number} START
     */
    START: 0,

    /**
     * !#en Another entry has replaced this entry as the current entry. This entry may continue being applied for mixing.
     * !#zh 当前的 entry 被其他的 entry 替换。当使用 mixing 时，当前的 entry 会继续运行。
     */
    INTERRUPT: 1,

    /**
     * !#en The play spine skeleton animation finish type.
     * !#zh 播放骨骼动画结束。
     * @property {Number} END
     */
    END: 2,

    /**
     * !#en The entry will be disposed.
     * !#zh entry 将被销毁。
     */
    DISPOSE: 3,

    /**
     * !#en The play spine skeleton animation complete type.
     * !#zh 播放骨骼动画完成。
     * @property {Number} COMPLETE
     */
    COMPLETE: 4,

    /**
     * !#en The spine skeleton animation event type.
     * !#zh 骨骼动画事件。
     * @property {Number} EVENT
     */
    EVENT: 5
  });
  /**
   * @module sp
   */

  if (!CC_EDITOR || !Editor.isMainProcess) {
    sp.spine = _global.spine;

    if (!CC_NATIVERENDERER) {
      require('./skeleton-texture');
    }

    require('./skeleton-data');

    require('./vertex-effect-delegate');

    require('./Skeleton');

    require('./spine-assembler');
  } else {
    require('./skeleton-data');
  }
}
/**
 * !#en
 * `sp.spine` is the namespace for official Spine Runtime, which officially implemented and maintained by Spine.<br>
 * Please refer to the official documentation for its detailed usage: [http://en.esotericsoftware.com/spine-using-runtimes](http://en.esotericsoftware.com/spine-using-runtimes)
 * !#zh
 * sp.spine 模块是 Spine 官方运行库的 API 入口，由 Spine 官方统一实现和维护，具体用法请参考：[http://zh.esotericsoftware.com/spine-using-runtimes](http://zh.esotericsoftware.com/spine-using-runtimes)
 * @module sp.spine
 * @main sp.spine
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFxpbmRleC5qcyJdLCJuYW1lcyI6WyJfZ2xvYmFsIiwid2luZG93IiwiZ2xvYmFsIiwiX2lzVXNlU3BpbmUiLCJDQ19OQVRJVkVSRU5ERVJFUiIsInNwaW5lIiwicmVxdWlyZSIsInNwIiwiX3RpbWVTY2FsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJjb25maWd1cmFibGUiLCJBVFRBQ0hNRU5UX1RZUEUiLCJSRUdJT04iLCJCT1VORElOR19CT1giLCJNRVNIIiwiU0tJTk5FRF9NRVNIIiwiQW5pbWF0aW9uRXZlbnRUeXBlIiwiY2MiLCJFbnVtIiwiU1RBUlQiLCJJTlRFUlJVUFQiLCJFTkQiLCJESVNQT1NFIiwiQ09NUExFVEUiLCJFVkVOVCIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSUEsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUF2RDs7QUFDQSxJQUFJRSxXQUFXLEdBQUcsSUFBbEI7O0FBRUEsSUFBSSxDQUFDQyxpQkFBTCxFQUF3QjtBQUNwQkosRUFBQUEsT0FBTyxDQUFDSyxLQUFSLEdBQWdCQyxPQUFPLENBQUMsYUFBRCxDQUF2QjtBQUNILENBRkQsTUFFTyxJQUFJLENBQUNOLE9BQU8sQ0FBQ0ssS0FBYixFQUFvQjtBQUN2QkYsRUFBQUEsV0FBVyxHQUFHLEtBQWQ7QUFDSDs7QUFFRCxJQUFJQSxXQUFKLEVBQWlCO0FBQ2JILEVBQUFBLE9BQU8sQ0FBQ08sRUFBUixHQUFhLEVBQWI7QUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNJQSxFQUFBQSxFQUFFLENBQUNDLFVBQUgsR0FBZ0IsR0FBaEI7QUFDQUMsRUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCSCxFQUF0QixFQUEwQixXQUExQixFQUF1QztBQUNuQ0ksSUFBQUEsR0FEbUMsaUJBQzVCO0FBQ0gsYUFBTyxLQUFLSCxVQUFaO0FBQ0gsS0FIa0M7QUFJbkNJLElBQUFBLEdBSm1DLGVBSTlCQyxLQUo4QixFQUl2QjtBQUNSLFdBQUtMLFVBQUwsR0FBa0JLLEtBQWxCO0FBQ0gsS0FOa0M7QUFPbkNDLElBQUFBLFlBQVksRUFBRTtBQVBxQixHQUF2QyxFQVphLENBc0JiOztBQUNBUCxFQUFBQSxFQUFFLENBQUNRLGVBQUgsR0FBcUI7QUFDakJDLElBQUFBLE1BQU0sRUFBRSxDQURTO0FBRWpCQyxJQUFBQSxZQUFZLEVBQUUsQ0FGRztBQUdqQkMsSUFBQUEsSUFBSSxFQUFFLENBSFc7QUFJakJDLElBQUFBLFlBQVksRUFBQztBQUpJLEdBQXJCO0FBT0E7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFDSVosRUFBQUEsRUFBRSxDQUFDYSxrQkFBSCxHQUF3QkMsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDNUI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxLQUFLLEVBQUUsQ0FOcUI7O0FBTzVCO0FBQ1I7QUFDQTtBQUNBO0FBQ1FDLElBQUFBLFNBQVMsRUFBRSxDQVhpQjs7QUFZNUI7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNRQyxJQUFBQSxHQUFHLEVBQUUsQ0FqQnVCOztBQWtCNUI7QUFDUjtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsT0FBTyxFQUFFLENBdEJtQjs7QUF1QjVCO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsUUFBUSxFQUFFLENBNUJrQjs7QUE2QjVCO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDUUMsSUFBQUEsS0FBSyxFQUFFO0FBbENxQixHQUFSLENBQXhCO0FBcUNBO0FBQ0o7QUFDQTs7QUFDSSxNQUFJLENBQUNDLFNBQUQsSUFBYyxDQUFDQyxNQUFNLENBQUNDLGFBQTFCLEVBQXlDO0FBRXJDeEIsSUFBQUEsRUFBRSxDQUFDRixLQUFILEdBQVdMLE9BQU8sQ0FBQ0ssS0FBbkI7O0FBQ0EsUUFBSSxDQUFDRCxpQkFBTCxFQUF3QjtBQUNwQkUsTUFBQUEsT0FBTyxDQUFDLG9CQUFELENBQVA7QUFDSDs7QUFFREEsSUFBQUEsT0FBTyxDQUFDLGlCQUFELENBQVA7O0FBQ0FBLElBQUFBLE9BQU8sQ0FBQywwQkFBRCxDQUFQOztBQUNBQSxJQUFBQSxPQUFPLENBQUMsWUFBRCxDQUFQOztBQUNBQSxJQUFBQSxPQUFPLENBQUMsbUJBQUQsQ0FBUDtBQUNILEdBWEQsTUFZSztBQUNEQSxJQUFBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDtBQUNIO0FBQ0o7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGdsb2JhbCBtYWluIG5hbWVzcGFjZSBvZiBTcGluZSwgYWxsIGNsYXNzZXMsIGZ1bmN0aW9ucyxcclxuICogcHJvcGVydGllcyBhbmQgY29uc3RhbnRzIG9mIFNwaW5lIGFyZSBkZWZpbmVkIGluIHRoaXMgbmFtZXNwYWNlXHJcbiAqICEjemhcclxuICogU3BpbmUg55qE5YWo5bGA55qE5ZG95ZCN56m66Ze077yMXHJcbiAqIOS4jiBTcGluZSDnm7jlhbPnmoTmiYDmnInnmoTnsbvvvIzlh73mlbDvvIzlsZ7mgKfvvIzluLjph4/pg73lnKjov5nkuKrlkb3lkI3nqbrpl7TkuK3lrprkuYnjgIJcclxuICogQG1vZHVsZSBzcFxyXG4gKiBAbWFpbiBzcFxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIFJlZmVyZW5jZTpcclxuICogaHR0cDovL2Vzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXJ1bnRpbWUtdGVybWlub2xvZ3lcclxuICogaHR0cDovL2Vzb3Rlcmljc29mdHdhcmUuY29tL2ZpbGVzL3J1bnRpbWUtZGlhZ3JhbS5wbmdcclxuICogaHR0cDovL2VuLmVzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXVzaW5nLXJ1bnRpbWVzXHJcbiAqL1xyXG5cclxudmFyIF9nbG9iYWwgPSB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdztcclxudmFyIF9pc1VzZVNwaW5lID0gdHJ1ZTtcclxuXHJcbmlmICghQ0NfTkFUSVZFUkVOREVSRVIpIHtcclxuICAgIF9nbG9iYWwuc3BpbmUgPSByZXF1aXJlKCcuL2xpYi9zcGluZScpO1xyXG59IGVsc2UgaWYgKCFfZ2xvYmFsLnNwaW5lKSB7XHJcbiAgICBfaXNVc2VTcGluZSA9IGZhbHNlO1xyXG59XHJcblxyXG5pZiAoX2lzVXNlU3BpbmUpIHtcclxuICAgIF9nbG9iYWwuc3AgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFRoZSBnbG9iYWwgdGltZSBzY2FsZSBvZiBTcGluZS5cclxuICAgICAqICEjemhcclxuICAgICAqIFNwaW5lIOWFqOWxgOaXtumXtOe8qeaUvueOh+OAglxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHNwLnRpbWVTY2FsZSA9IDAuODtcclxuICAgICAqL1xyXG4gICAgc3AuX3RpbWVTY2FsZSA9IDEuMDtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzcCwgJ3RpbWVTY2FsZScsIHtcclxuICAgICAgICBnZXQgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZVNjYWxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0ICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSB2YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRoZSBhdHRhY2htZW50IHR5cGUgb2Ygc3BpbmUuIEl0IGNvbnRhaW5zIHRocmVlIHR5cGU6IFJFR0lPTigwKSwgQk9VTkRJTkdfQk9YKDEpLCBNRVNIKDIpIGFuZCBTS0lOTkVEX01FU0guXHJcbiAgICBzcC5BVFRBQ0hNRU5UX1RZUEUgPSB7XHJcbiAgICAgICAgUkVHSU9OOiAwLFxyXG4gICAgICAgIEJPVU5ESU5HX0JPWDogMSxcclxuICAgICAgICBNRVNIOiAyLFxyXG4gICAgICAgIFNLSU5ORURfTUVTSDozXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBvZiBzcGluZSBza2VsZXRvbiBhbmltYXRpb24uXHJcbiAgICAgKiAhI3poIOmqqOmqvOWKqOeUu+S6i+S7tuexu+Wei+OAglxyXG4gICAgICogQGVudW0gQW5pbWF0aW9uRXZlbnRUeXBlXHJcbiAgICAgKi9cclxuICAgIHNwLkFuaW1hdGlvbkV2ZW50VHlwZSA9IGNjLkVudW0oe1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHBsYXkgc3BpbmUgc2tlbGV0b24gYW5pbWF0aW9uIHN0YXJ0IHR5cGUuXHJcbiAgICAgICAgICogISN6aCDlvIDlp4vmkq3mlL7pqqjpqrzliqjnlLvjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1RBUlRcclxuICAgICAgICAgKi9cclxuICAgICAgICBTVEFSVDogMCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEFub3RoZXIgZW50cnkgaGFzIHJlcGxhY2VkIHRoaXMgZW50cnkgYXMgdGhlIGN1cnJlbnQgZW50cnkuIFRoaXMgZW50cnkgbWF5IGNvbnRpbnVlIGJlaW5nIGFwcGxpZWQgZm9yIG1peGluZy5cclxuICAgICAgICAgKiAhI3poIOW9k+WJjeeahCBlbnRyeSDooqvlhbbku5bnmoQgZW50cnkg5pu/5o2i44CC5b2T5L2/55SoIG1peGluZyDml7bvvIzlvZPliY3nmoQgZW50cnkg5Lya57un57ut6L+Q6KGM44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSU5URVJSVVBUOiAxLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHBsYXkgc3BpbmUgc2tlbGV0b24gYW5pbWF0aW9uIGZpbmlzaCB0eXBlLlxyXG4gICAgICAgICAqICEjemgg5pKt5pS+6aqo6aq85Yqo55S757uT5p2f44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVORFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEVORDogMixcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBlbnRyeSB3aWxsIGJlIGRpc3Bvc2VkLlxyXG4gICAgICAgICAqICEjemggZW50cnkg5bCG6KKr6ZSA5q+B44CCXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRElTUE9TRTogMyxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBwbGF5IHNwaW5lIHNrZWxldG9uIGFuaW1hdGlvbiBjb21wbGV0ZSB0eXBlLlxyXG4gICAgICAgICAqICEjemgg5pKt5pS+6aqo6aq85Yqo55S75a6M5oiQ44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENPTVBMRVRFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQ09NUExFVEU6IDQsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgc3BpbmUgc2tlbGV0b24gYW5pbWF0aW9uIGV2ZW50IHR5cGUuXHJcbiAgICAgICAgICogISN6aCDpqqjpqrzliqjnlLvkuovku7bjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRVZFTlRcclxuICAgICAgICAgKi9cclxuICAgICAgICBFVkVOVDogNVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAbW9kdWxlIHNwXHJcbiAgICAgKi9cclxuICAgIGlmICghQ0NfRURJVE9SIHx8ICFFZGl0b3IuaXNNYWluUHJvY2Vzcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNwLnNwaW5lID0gX2dsb2JhbC5zcGluZTtcclxuICAgICAgICBpZiAoIUNDX05BVElWRVJFTkRFUkVSKSB7XHJcbiAgICAgICAgICAgIHJlcXVpcmUoJy4vc2tlbGV0b24tdGV4dHVyZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWlyZSgnLi9za2VsZXRvbi1kYXRhJyk7XHJcbiAgICAgICAgcmVxdWlyZSgnLi92ZXJ0ZXgtZWZmZWN0LWRlbGVnYXRlJyk7XHJcbiAgICAgICAgcmVxdWlyZSgnLi9Ta2VsZXRvbicpO1xyXG4gICAgICAgIHJlcXVpcmUoJy4vc3BpbmUtYXNzZW1ibGVyJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXF1aXJlKCcuL3NrZWxldG9uLWRhdGEnKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogYHNwLnNwaW5lYCBpcyB0aGUgbmFtZXNwYWNlIGZvciBvZmZpY2lhbCBTcGluZSBSdW50aW1lLCB3aGljaCBvZmZpY2lhbGx5IGltcGxlbWVudGVkIGFuZCBtYWludGFpbmVkIGJ5IFNwaW5lLjxicj5cclxuICogUGxlYXNlIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBkb2N1bWVudGF0aW9uIGZvciBpdHMgZGV0YWlsZWQgdXNhZ2U6IFtodHRwOi8vZW4uZXNvdGVyaWNzb2Z0d2FyZS5jb20vc3BpbmUtdXNpbmctcnVudGltZXNdKGh0dHA6Ly9lbi5lc290ZXJpY3NvZnR3YXJlLmNvbS9zcGluZS11c2luZy1ydW50aW1lcylcclxuICogISN6aFxyXG4gKiBzcC5zcGluZSDmqKHlnZfmmK8gU3BpbmUg5a6Y5pa56L+Q6KGM5bqT55qEIEFQSSDlhaXlj6PvvIznlLEgU3BpbmUg5a6Y5pa557uf5LiA5a6e546w5ZKM57u05oqk77yM5YW35L2T55So5rOV6K+35Y+C6ICD77yaW2h0dHA6Ly96aC5lc290ZXJpY3NvZnR3YXJlLmNvbS9zcGluZS11c2luZy1ydW50aW1lc10oaHR0cDovL3poLmVzb3Rlcmljc29mdHdhcmUuY29tL3NwaW5lLXVzaW5nLXJ1bnRpbWVzKVxyXG4gKiBAbW9kdWxlIHNwLnNwaW5lXHJcbiAqIEBtYWluIHNwLnNwaW5lXHJcbiAqL1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==