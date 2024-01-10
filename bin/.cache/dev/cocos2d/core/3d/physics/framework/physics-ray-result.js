
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-ray-result.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.PhysicsRayResult = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Vec3 = cc.Vec3;
/**
 * !#en
 * Used to store physical ray detection results
 * !#zh
 * 用于保存物理射线检测结果
 * @class PhysicsRayResult
 */

var PhysicsRayResult = /*#__PURE__*/function () {
  function PhysicsRayResult() {
    this._hitPoint = new Vec3();
    this._distance = 0;
    this._collidier = null;
  }

  var _proto = PhysicsRayResult.prototype;

  /**
   * !#en
   * Set up ray. This method is used internally by the engine. Do not call it from an external script
   * !#zh
   * 设置射线，此方法由引擎内部使用，请勿在外部脚本调用
   * @method _assign
   * @param {Vec3} hitPoint
   * @param {number} distance
   * @param {Collider3D} collider
   */
  _proto._assign = function _assign(hitPoint, distance, collider) {
    Vec3.copy(this._hitPoint, hitPoint);
    this._distance = distance;
    this._collidier = collider;
  }
  /**
   * !#en
   * Clone
   * !#zh
   * 克隆
   * @method clone
   */
  ;

  _proto.clone = function clone() {
    var c = new PhysicsRayResult();
    Vec3.copy(c._hitPoint, this._hitPoint);
    c._distance = this._distance;
    c._collidier = this._collidier;
    return c;
  };

  _createClass(PhysicsRayResult, [{
    key: "hitPoint",
    get:
    /**
     * !#en
     * Hit the point
     * !#zh
     * 击中点
     * @property {Vec3} hitPoint
     * @readonly
     */
    function get() {
      return this._hitPoint;
    }
    /**
     * !#en
     * Distance
     * !#zh
     * 距离
     * @property {number} distance
     * @readonly
     */

  }, {
    key: "distance",
    get: function get() {
      return this._distance;
    }
    /**
     * !#en
     * Hit the collision box
     * !#zh
     * 击中的碰撞盒
     * @property {Collider3D} collider
     * @readonly
     */

  }, {
    key: "collider",
    get: function get() {
      return this._collidier;
    }
  }]);

  return PhysicsRayResult;
}();

exports.PhysicsRayResult = PhysicsRayResult;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXDNkXFxwaHlzaWNzXFxmcmFtZXdvcmtcXHBoeXNpY3MtcmF5LXJlc3VsdC50cyJdLCJuYW1lcyI6WyJWZWMzIiwiY2MiLCJQaHlzaWNzUmF5UmVzdWx0IiwiX2hpdFBvaW50IiwiX2Rpc3RhbmNlIiwiX2NvbGxpZGllciIsIl9hc3NpZ24iLCJoaXRQb2ludCIsImRpc3RhbmNlIiwiY29sbGlkZXIiLCJjb3B5IiwiY2xvbmUiLCJjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLElBQU1BLElBQUksR0FBR0MsRUFBRSxDQUFDRCxJQUFoQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNhRTs7U0FzQ0RDLFlBQXFCLElBQUlILElBQUo7U0FDckJJLFlBQW9CO1NBQ3BCQyxhQUFnQzs7Ozs7QUFFeEM7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FDV0MsVUFBUCxpQkFBZ0JDLFFBQWhCLEVBQW1DQyxRQUFuQyxFQUFxREMsUUFBckQsRUFBMkU7QUFDdkVULElBQUFBLElBQUksQ0FBQ1UsSUFBTCxDQUFVLEtBQUtQLFNBQWYsRUFBMEJJLFFBQTFCO0FBQ0EsU0FBS0gsU0FBTCxHQUFpQkksUUFBakI7QUFDQSxTQUFLSCxVQUFMLEdBQWtCSSxRQUFsQjtBQUNIO0FBRUQ7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztTQUNXRSxRQUFQLGlCQUFnQjtBQUNaLFFBQU1DLENBQUMsR0FBRyxJQUFJVixnQkFBSixFQUFWO0FBQ0FGLElBQUFBLElBQUksQ0FBQ1UsSUFBTCxDQUFVRSxDQUFDLENBQUNULFNBQVosRUFBdUIsS0FBS0EsU0FBNUI7QUFDQVMsSUFBQUEsQ0FBQyxDQUFDUixTQUFGLEdBQWMsS0FBS0EsU0FBbkI7QUFDQVEsSUFBQUEsQ0FBQyxDQUFDUCxVQUFGLEdBQWUsS0FBS0EsVUFBcEI7QUFDQSxXQUFPTyxDQUFQO0FBQ0g7Ozs7O0FBckVEO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSSxtQkFBeUI7QUFDckIsYUFBTyxLQUFLVCxTQUFaO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBd0I7QUFDcEIsYUFBTyxLQUFLQyxTQUFaO0FBQ0g7QUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0ksZUFBNEI7QUFDeEIsYUFBTyxLQUFLQyxVQUFaO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5pbXBvcnQgeyBDb2xsaWRlcjNEIH0gZnJvbSAnLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XHJcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVXNlZCB0byBzdG9yZSBwaHlzaWNhbCByYXkgZGV0ZWN0aW9uIHJlc3VsdHNcclxuICogISN6aFxyXG4gKiDnlKjkuo7kv53lrZjniannkIblsITnur/mo4DmtYvnu5PmnpxcclxuICogQGNsYXNzIFBoeXNpY3NSYXlSZXN1bHRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQaHlzaWNzUmF5UmVzdWx0IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEhpdCB0aGUgcG9pbnRcclxuICAgICAqICEjemhcclxuICAgICAqIOWHu+S4reeCuVxyXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBoaXRQb2ludFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGdldCBoaXRQb2ludCAoKTogY2MuVmVjMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpdFBvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogRGlzdGFuY2VcclxuICAgICAqICEjemhcclxuICAgICAqIOi3neemu1xyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGRpc3RhbmNlXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZ2V0IGRpc3RhbmNlICgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEhpdCB0aGUgY29sbGlzaW9uIGJveFxyXG4gICAgICogISN6aFxyXG4gICAgICog5Ye75Lit55qE56Kw5pKe55uSXHJcbiAgICAgKiBAcHJvcGVydHkge0NvbGxpZGVyM0R9IGNvbGxpZGVyXHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZ2V0IGNvbGxpZGVyICgpOiBDb2xsaWRlcjNEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGlkaWVyITtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9oaXRQb2ludDogY2MuVmVjMyA9IG5ldyBWZWMzKCk7XHJcbiAgICBwcml2YXRlIF9kaXN0YW5jZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2NvbGxpZGllcjogQ29sbGlkZXIzRCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogU2V0IHVwIHJheS4gVGhpcyBtZXRob2QgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBlbmdpbmUuIERvIG5vdCBjYWxsIGl0IGZyb20gYW4gZXh0ZXJuYWwgc2NyaXB0XHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDorr7nva7lsITnur/vvIzmraTmlrnms5XnlLHlvJXmk47lhoXpg6jkvb/nlKjvvIzor7fli7/lnKjlpJbpg6johJrmnKzosIPnlKhcclxuICAgICAqIEBtZXRob2QgX2Fzc2lnblxyXG4gICAgICogQHBhcmFtIHtWZWMzfSBoaXRQb2ludFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRpc3RhbmNlXHJcbiAgICAgKiBAcGFyYW0ge0NvbGxpZGVyM0R9IGNvbGxpZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfYXNzaWduIChoaXRQb2ludDogY2MuVmVjMywgZGlzdGFuY2U6IG51bWJlciwgY29sbGlkZXI6IENvbGxpZGVyM0QpIHtcclxuICAgICAgICBWZWMzLmNvcHkodGhpcy5faGl0UG9pbnQsIGhpdFBvaW50KTtcclxuICAgICAgICB0aGlzLl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuX2NvbGxpZGllciA9IGNvbGxpZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogQ2xvbmVcclxuICAgICAqICEjemhcclxuICAgICAqIOWFi+mahlxyXG4gICAgICogQG1ldGhvZCBjbG9uZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmUgKCkge1xyXG4gICAgICAgIGNvbnN0IGMgPSBuZXcgUGh5c2ljc1JheVJlc3VsdCgpO1xyXG4gICAgICAgIFZlYzMuY29weShjLl9oaXRQb2ludCwgdGhpcy5faGl0UG9pbnQpO1xyXG4gICAgICAgIGMuX2Rpc3RhbmNlID0gdGhpcy5fZGlzdGFuY2U7XHJcbiAgICAgICAgYy5fY29sbGlkaWVyID0gdGhpcy5fY29sbGlkaWVyO1xyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9