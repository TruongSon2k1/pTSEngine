
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/vertex-effect-delegate.js';
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
var spine = require('./lib/spine');
/**
 * @module sp
 */

/**
 * !#en
 * The delegate of spine vertex effect
 * !#zh
 * Spine 顶点动画代理
 * @class VertexEffectDelegate
 */


sp.VertexEffectDelegate = cc.Class({
  name: 'sp.VertexEffectDelegate',
  ctor: function ctor() {
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  },

  /**
   * !#en Clears vertex effect.
   * !#zh 清空顶点效果
   * @method clear
   */
  clear: function clear() {
    this._vertexEffect = null;
    this._interpolation = null;
    this._effectType = 'none';
  },

  /**
   * !#en Inits delegate with jitter effect
   * !#zh 设置顶点抖动效果
   * @method initJitter
   * @param {Number} jitterX
   * @param {Number} jitterY
   */
  initJitter: function initJitter(jitterX, jitterY) {
    this._effectType = 'jitter';
    this._vertexEffect = new spine.JitterEffect(jitterX, jitterY);
    return this._vertexEffect;
  },

  /**
   * !#en Inits delegate with swirl effect
   * !#zh 设置顶点漩涡效果
   * @method initSwirlWithPow
   * @param {Number} radius 
   * @param {Number} power
   * @return {sp.spine.JitterEffect}
   */
  initSwirlWithPow: function initSwirlWithPow(radius, power) {
    this._interpolation = new spine.Pow(power);
    this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  },

  /**
   * !#en Inits delegate with swirl effect
   * !#zh 设置顶点漩涡效果
   * @method initSwirlWithPowOut
   * @param {Number} radius 
   * @param {Number} power
   * @return {sp.spine.SwirlEffect}
   */
  initSwirlWithPowOut: function initSwirlWithPowOut(radius, power) {
    this._interpolation = new spine.PowOut(power);
    this._vertexEffect = new spine.SwirlEffect(radius, this._interpolation);
    return this._vertexEffect;
  },

  /**
   * !#en Gets jitter vertex effect
   * !#zh 获取顶点抖动效果
   * @method getJitterVertexEffect
   * @return {sp.spine.JitterEffect}
   */
  getJitterVertexEffect: function getJitterVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets swirl vertex effect
   * !#zh 获取顶点漩涡效果
   * @method getSwirlVertexEffect
   * @return {sp.spine.SwirlEffect}
   */
  getSwirlVertexEffect: function getSwirlVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets vertex effect
   * !#zh 获取顶点效果
   * @method getVertexEffect
   * @return {sp.spine.JitterEffect|sp.spine.SwirlEffect}
   */
  getVertexEffect: function getVertexEffect() {
    return this._vertexEffect;
  },

  /**
   * !#en Gets effect type
   * !#zh 获取效果类型
   * @method getEffectType
   * @return {String}
   */
  getEffectType: function getEffectType() {
    return this._effectType;
  }
});
module.exports = sp.VertexEffectDelegate;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGV4dGVuc2lvbnNcXHNwaW5lXFx2ZXJ0ZXgtZWZmZWN0LWRlbGVnYXRlLmpzIl0sIm5hbWVzIjpbInNwaW5lIiwicmVxdWlyZSIsInNwIiwiVmVydGV4RWZmZWN0RGVsZWdhdGUiLCJjYyIsIkNsYXNzIiwibmFtZSIsImN0b3IiLCJfdmVydGV4RWZmZWN0IiwiX2ludGVycG9sYXRpb24iLCJfZWZmZWN0VHlwZSIsImNsZWFyIiwiaW5pdEppdHRlciIsImppdHRlclgiLCJqaXR0ZXJZIiwiSml0dGVyRWZmZWN0IiwiaW5pdFN3aXJsV2l0aFBvdyIsInJhZGl1cyIsInBvd2VyIiwiUG93IiwiU3dpcmxFZmZlY3QiLCJpbml0U3dpcmxXaXRoUG93T3V0IiwiUG93T3V0IiwiZ2V0Sml0dGVyVmVydGV4RWZmZWN0IiwiZ2V0U3dpcmxWZXJ0ZXhFZmZlY3QiLCJnZXRWZXJ0ZXhFZmZlY3QiLCJnZXRFZmZlY3RUeXBlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLGFBQUQsQ0FBckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBQyxFQUFFLENBQUNDLG9CQUFILEdBQTBCQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMvQkMsRUFBQUEsSUFBSSxFQUFFLHlCQUR5QjtBQUcvQkMsRUFBQUEsSUFIK0Isa0JBR3ZCO0FBQ0osU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0gsR0FQOEI7O0FBUy9CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsS0FkK0IsbUJBY3RCO0FBQ0wsU0FBS0gsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsSUFBdEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLE1BQW5CO0FBQ0gsR0FsQjhCOztBQW9CL0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUUsRUFBQUEsVUEzQitCLHNCQTJCbkJDLE9BM0JtQixFQTJCVkMsT0EzQlUsRUEyQkQ7QUFDMUIsU0FBS0osV0FBTCxHQUFtQixRQUFuQjtBQUNBLFNBQUtGLGFBQUwsR0FBcUIsSUFBSVIsS0FBSyxDQUFDZSxZQUFWLENBQXVCRixPQUF2QixFQUFnQ0MsT0FBaEMsQ0FBckI7QUFDQSxXQUFPLEtBQUtOLGFBQVo7QUFDSCxHQS9COEI7O0FBaUMvQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lRLEVBQUFBLGdCQXpDK0IsNEJBeUNkQyxNQXpDYyxFQXlDTkMsS0F6Q00sRUF5Q0M7QUFDNUIsU0FBS1QsY0FBTCxHQUFzQixJQUFJVCxLQUFLLENBQUNtQixHQUFWLENBQWNELEtBQWQsQ0FBdEI7QUFDQSxTQUFLVixhQUFMLEdBQXFCLElBQUlSLEtBQUssQ0FBQ29CLFdBQVYsQ0FBc0JILE1BQXRCLEVBQThCLEtBQUtSLGNBQW5DLENBQXJCO0FBQ0EsV0FBTyxLQUFLRCxhQUFaO0FBQ0gsR0E3QzhCOztBQStDL0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJYSxFQUFBQSxtQkF2RCtCLCtCQXVEWEosTUF2RFcsRUF1REhDLEtBdkRHLEVBdURJO0FBQy9CLFNBQUtULGNBQUwsR0FBc0IsSUFBSVQsS0FBSyxDQUFDc0IsTUFBVixDQUFpQkosS0FBakIsQ0FBdEI7QUFDQSxTQUFLVixhQUFMLEdBQXFCLElBQUlSLEtBQUssQ0FBQ29CLFdBQVYsQ0FBc0JILE1BQXRCLEVBQThCLEtBQUtSLGNBQW5DLENBQXJCO0FBQ0EsV0FBTyxLQUFLRCxhQUFaO0FBQ0gsR0EzRDhCOztBQTZEL0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0llLEVBQUFBLHFCQW5FK0IsbUNBbUVOO0FBQ3JCLFdBQU8sS0FBS2YsYUFBWjtBQUNILEdBckU4Qjs7QUF1RS9CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJZ0IsRUFBQUEsb0JBN0UrQixrQ0E2RVA7QUFDcEIsV0FBTyxLQUFLaEIsYUFBWjtBQUNILEdBL0U4Qjs7QUFpRi9CO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJaUIsRUFBQUEsZUF2RitCLDZCQXVGWjtBQUNmLFdBQU8sS0FBS2pCLGFBQVo7QUFDSCxHQXpGOEI7O0FBMkYvQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSWtCLEVBQUFBLGFBakcrQiwyQkFpR2Q7QUFDYixXQUFPLEtBQUtoQixXQUFaO0FBQ0g7QUFuRzhCLENBQVQsQ0FBMUI7QUFxR0FpQixNQUFNLENBQUNDLE9BQVAsR0FBaUIxQixFQUFFLENBQUNDLG9CQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jb25zdCBzcGluZSA9IHJlcXVpcmUoJy4vbGliL3NwaW5lJyk7XHJcbi8qKlxyXG4gKiBAbW9kdWxlIHNwXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGRlbGVnYXRlIG9mIHNwaW5lIHZlcnRleCBlZmZlY3RcclxuICogISN6aFxyXG4gKiBTcGluZSDpobbngrnliqjnlLvku6PnkIZcclxuICogQGNsYXNzIFZlcnRleEVmZmVjdERlbGVnYXRlXHJcbiAqL1xyXG5zcC5WZXJ0ZXhFZmZlY3REZWxlZ2F0ZSA9IGNjLkNsYXNzKHtcclxuICAgIG5hbWU6ICdzcC5WZXJ0ZXhFZmZlY3REZWxlZ2F0ZScsXHJcblxyXG4gICAgY3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5fdmVydGV4RWZmZWN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9lZmZlY3RUeXBlID0gJ25vbmUnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQ2xlYXJzIHZlcnRleCBlZmZlY3QuXHJcbiAgICAgKiAhI3poIOa4heepuumhtueCueaViOaenFxyXG4gICAgICogQG1ldGhvZCBjbGVhclxyXG4gICAgICovXHJcbiAgICBjbGVhciAoKSB7XHJcbiAgICAgICAgdGhpcy5fdmVydGV4RWZmZWN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9lZmZlY3RUeXBlID0gJ25vbmUnO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW5pdHMgZGVsZWdhdGUgd2l0aCBqaXR0ZXIgZWZmZWN0XHJcbiAgICAgKiAhI3poIOiuvue9rumhtueCueaKluWKqOaViOaenFxyXG4gICAgICogQG1ldGhvZCBpbml0Sml0dGVyXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaml0dGVyWFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGppdHRlcllcclxuICAgICAqL1xyXG4gICAgaW5pdEppdHRlciAoaml0dGVyWCwgaml0dGVyWSkge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdFR5cGUgPSAnaml0dGVyJztcclxuICAgICAgICB0aGlzLl92ZXJ0ZXhFZmZlY3QgPSBuZXcgc3BpbmUuSml0dGVyRWZmZWN0KGppdHRlclgsIGppdHRlclkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0ZXhFZmZlY3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJbml0cyBkZWxlZ2F0ZSB3aXRoIHN3aXJsIGVmZmVjdFxyXG4gICAgICogISN6aCDorr7nva7pobbngrnmvKnmtqHmlYjmnpxcclxuICAgICAqIEBtZXRob2QgaW5pdFN3aXJsV2l0aFBvd1xyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZGl1cyBcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwb3dlclxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuSml0dGVyRWZmZWN0fVxyXG4gICAgICovXHJcbiAgICBpbml0U3dpcmxXaXRoUG93KHJhZGl1cywgcG93ZXIpIHtcclxuICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uID0gbmV3IHNwaW5lLlBvdyhwb3dlcik7XHJcbiAgICAgICAgdGhpcy5fdmVydGV4RWZmZWN0ID0gbmV3IHNwaW5lLlN3aXJsRWZmZWN0KHJhZGl1cywgdGhpcy5faW50ZXJwb2xhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRleEVmZmVjdDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEluaXRzIGRlbGVnYXRlIHdpdGggc3dpcmwgZWZmZWN0XHJcbiAgICAgKiAhI3poIOiuvue9rumhtueCuea8qea2oeaViOaenFxyXG4gICAgICogQG1ldGhvZCBpbml0U3dpcmxXaXRoUG93T3V0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzIFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBvd2VyXHJcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5Td2lybEVmZmVjdH1cclxuICAgICAqL1xyXG4gICAgaW5pdFN3aXJsV2l0aFBvd091dChyYWRpdXMsIHBvd2VyKSB7XHJcbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbiA9IG5ldyBzcGluZS5Qb3dPdXQocG93ZXIpO1xyXG4gICAgICAgIHRoaXMuX3ZlcnRleEVmZmVjdCA9IG5ldyBzcGluZS5Td2lybEVmZmVjdChyYWRpdXMsIHRoaXMuX2ludGVycG9sYXRpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJ0ZXhFZmZlY3Q7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXRzIGppdHRlciB2ZXJ0ZXggZWZmZWN0XHJcbiAgICAgKiAhI3poIOiOt+WPlumhtueCueaKluWKqOaViOaenFxyXG4gICAgICogQG1ldGhvZCBnZXRKaXR0ZXJWZXJ0ZXhFZmZlY3RcclxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkppdHRlckVmZmVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0Sml0dGVyVmVydGV4RWZmZWN0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGV4RWZmZWN0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBzd2lybCB2ZXJ0ZXggZWZmZWN0XHJcbiAgICAgKiAhI3poIOiOt+WPlumhtueCuea8qea2oeaViOaenFxyXG4gICAgICogQG1ldGhvZCBnZXRTd2lybFZlcnRleEVmZmVjdFxyXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuU3dpcmxFZmZlY3R9XHJcbiAgICAgKi9cclxuICAgIGdldFN3aXJsVmVydGV4RWZmZWN0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGV4RWZmZWN0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyB2ZXJ0ZXggZWZmZWN0XHJcbiAgICAgKiAhI3poIOiOt+WPlumhtueCueaViOaenFxyXG4gICAgICogQG1ldGhvZCBnZXRWZXJ0ZXhFZmZlY3RcclxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkppdHRlckVmZmVjdHxzcC5zcGluZS5Td2lybEVmZmVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0VmVydGV4RWZmZWN0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVydGV4RWZmZWN0O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gR2V0cyBlZmZlY3QgdHlwZVxyXG4gICAgICogISN6aCDojrflj5bmlYjmnpznsbvlnotcclxuICAgICAqIEBtZXRob2QgZ2V0RWZmZWN0VHlwZVxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBnZXRFZmZlY3RUeXBlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWZmZWN0VHlwZTtcclxuICAgIH1cclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gc3AuVmVydGV4RWZmZWN0RGVsZWdhdGU7Il0sInNvdXJjZVJvb3QiOiIvIn0=