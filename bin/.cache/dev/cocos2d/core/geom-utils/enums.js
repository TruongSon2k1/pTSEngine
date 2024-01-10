
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/enums.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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
 * !#en Shape type.
 * @enum geomUtils.enums
 */
var _default = {
  /**
   * !#en Ray.
   * !#zh 射线。
   * @property {Number} SHAPE_RAY
   * @default 1 << 0
   */
  SHAPE_RAY: 1 << 0,

  /**
   * !#en Line.
   * !#zh 直线。
   * @property {Number} SHAPE_LINE
   * @default 2
  */
  SHAPE_LINE: 1 << 1,

  /**
   * !#en Sphere.
   * !#zh 球。
   * @property {Number} SHAPE_SPHERE
   * @default 4
  */
  SHAPE_SPHERE: 1 << 2,

  /**
   * !#en Aabb.
   * !#zh 包围盒。
   * @property {Number} SHAPE_AABB
  */
  SHAPE_AABB: 1 << 3,

  /**
   * !#en Obb.
   * !#zh 有向包围盒。
   * @property {Number} SHAPE_OBB
  */
  SHAPE_OBB: 1 << 4,

  /**
   * !#en Plane.
   * !#zh 平面。
   * @property {Number} SHAPE_PLANE
  */
  SHAPE_PLANE: 1 << 5,

  /**
   * !#en Triangle.
   * !#zh 三角形。
   * @property {Number} SHAPE_TRIANGLE
  */
  SHAPE_TRIANGLE: 1 << 6,

  /**
   * !#en Frustum.
   * !#zh 平截头体。
   * @property {Number} SHAPE_FRUSTUM
  */
  SHAPE_FRUSTUM: 1 << 7,

  /**
   * !#en frustum accurate.
   * !#zh 平截头体。
   * @property {Number} SHAPE_FRUSTUM_ACCURATE
  */
  SHAPE_FRUSTUM_ACCURATE: 1 << 8
};
exports["default"] = _default;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdlb20tdXRpbHNcXGVudW1zLnRzIl0sIm5hbWVzIjpbIlNIQVBFX1JBWSIsIlNIQVBFX0xJTkUiLCJTSEFQRV9TUEhFUkUiLCJTSEFQRV9BQUJCIiwiU0hBUEVfT0JCIiwiU0hBUEVfUExBTkUiLCJTSEFQRV9UUklBTkdMRSIsIlNIQVBFX0ZSVVNUVU0iLCJTSEFQRV9GUlVTVFVNX0FDQ1VSQVRFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO2VBQ2U7QUFDWDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUEsRUFBQUEsU0FBUyxFQUFHLEtBQUssQ0FQTjs7QUFRWDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsVUFBVSxFQUFHLEtBQUssQ0FkUDs7QUFlWDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsWUFBWSxFQUFHLEtBQUssQ0FyQlQ7O0FBc0JYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsVUFBVSxFQUFHLEtBQUssQ0EzQlA7O0FBNEJYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsU0FBUyxFQUFHLEtBQUssQ0FqQ047O0FBa0NYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsV0FBVyxFQUFHLEtBQUssQ0F2Q1I7O0FBd0NYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsY0FBYyxFQUFHLEtBQUssQ0E3Q1g7O0FBOENYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsYUFBYSxFQUFHLEtBQUssQ0FuRFY7O0FBb0RYO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsc0JBQXNCLEVBQUcsS0FBSztBQXpEbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBTaGFwZSB0eXBlLlxyXG4gKiBAZW51bSBnZW9tVXRpbHMuZW51bXNcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSYXkuXHJcbiAgICAgKiAhI3poIOWwhOe6v+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNIQVBFX1JBWVxyXG4gICAgICogQGRlZmF1bHQgMSA8PCAwXHJcbiAgICAgKi9cclxuICAgIFNIQVBFX1JBWTogKDEgPDwgMCksXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gTGluZS5cclxuICAgICAqICEjemgg55u057q/44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfTElORVxyXG4gICAgICogQGRlZmF1bHQgMlxyXG4gICAgKi9cclxuICAgIFNIQVBFX0xJTkU6ICgxIDw8IDEpLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNwaGVyZS5cclxuICAgICAqICEjemgg55CD44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfU1BIRVJFXHJcbiAgICAgKiBAZGVmYXVsdCA0XHJcbiAgICAqL1xyXG4gICAgU0hBUEVfU1BIRVJFOiAoMSA8PCAyKSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBYWJiLlxyXG4gICAgICogISN6aCDljIXlm7Tnm5LjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9BQUJCXHJcbiAgICAqL1xyXG4gICAgU0hBUEVfQUFCQjogKDEgPDwgMyksXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gT2JiLlxyXG4gICAgICogISN6aCDmnInlkJHljIXlm7Tnm5LjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9PQkJcclxuICAgICovXHJcbiAgICBTSEFQRV9PQkI6ICgxIDw8IDQpLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFBsYW5lLlxyXG4gICAgICogISN6aCDlubPpnaLjgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9QTEFORVxyXG4gICAgKi9cclxuICAgIFNIQVBFX1BMQU5FOiAoMSA8PCA1KSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUcmlhbmdsZS5cclxuICAgICAqICEjemgg5LiJ6KeS5b2i44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfVFJJQU5HTEVcclxuICAgICovXHJcbiAgICBTSEFQRV9UUklBTkdMRTogKDEgPDwgNiksXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRnJ1c3R1bS5cclxuICAgICAqICEjemgg5bmz5oiq5aS05L2T44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfRlJVU1RVTVxyXG4gICAgKi9cclxuICAgIFNIQVBFX0ZSVVNUVU06ICgxIDw8IDcpLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIGZydXN0dW0gYWNjdXJhdGUuXHJcbiAgICAgKiAhI3poIOW5s+aIquWktOS9k+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNIQVBFX0ZSVVNUVU1fQUNDVVJBVEVcclxuICAgICovXHJcbiAgICBTSEFQRV9GUlVTVFVNX0FDQ1VSQVRFOiAoMSA8PCA4KSxcclxufTtcclxuICAiXSwic291cmNlUm9vdCI6Ii8ifQ==