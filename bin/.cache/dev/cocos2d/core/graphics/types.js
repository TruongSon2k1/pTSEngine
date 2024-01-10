
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/graphics/types.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
'use strict';
/**
 * !#en Enum for LineCap.
 * !#zh 线段末端属性
 * @enum Graphics.LineCap
 */

var LineCap = cc.Enum({
  /**
   * !#en The ends of lines are squared off at the endpoints.
   * !#zh 线段末端以方形结束。
   * @property {Number} BUTT
   */
  BUTT: 0,

  /**
   * !#en The ends of lines are rounded.
   * !#zh 线段末端以圆形结束。
   * @property {Number} ROUND
   */
  ROUND: 1,

  /**
   * !#en The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.
   * !#zh 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
   * @property {Number} SQUARE
   */
  SQUARE: 2
});
/**
 * !#en Enum for LineJoin.
 * !#zh 线段拐角属性
 * @enum Graphics.LineJoin
 */

var LineJoin = cc.Enum({
  /**
   * !#en Fills an additional triangular area between the common endpoint of connected segments, and the separate outside rectangular corners of each segment.
   * !#zh 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
   * @property {Number} BEVEL
   */
  BEVEL: 0,

  /**
   * !#en Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint of connected segments. The radius for these rounded corners is equal to the line width.
   * !#zh 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
   * @property {Number} ROUND
   */
  ROUND: 1,

  /**
   * !#en Connected segments are joined by extending their outside edges to connect at a single point, with the effect of filling an additional lozenge-shaped area.
   * !#zh 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。
   * @property {Number} MITER
   */
  MITER: 2
}); // PointFlags

var PointFlags = cc.Enum({
  PT_CORNER: 0x01,
  PT_LEFT: 0x02,
  PT_BEVEL: 0x04,
  PT_INNERBEVEL: 0x08
});
module.exports = {
  LineCap: LineCap,
  LineJoin: LineJoin,
  PointFlags: PointFlags
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdyYXBoaWNzXFx0eXBlcy5qcyJdLCJuYW1lcyI6WyJMaW5lQ2FwIiwiY2MiLCJFbnVtIiwiQlVUVCIsIlJPVU5EIiwiU1FVQVJFIiwiTGluZUpvaW4iLCJCRVZFTCIsIk1JVEVSIiwiUG9pbnRGbGFncyIsIlBUX0NPUk5FUiIsIlBUX0xFRlQiLCJQVF9CRVZFTCIsIlBUX0lOTkVSQkVWRUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlBLE9BQU8sR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDbEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUUsQ0FOWTs7QUFRbEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxLQUFLLEVBQUUsQ0FiVzs7QUFlbEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxNQUFNLEVBQUU7QUFwQlUsQ0FBUixDQUFkO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHTCxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lLLEVBQUFBLEtBQUssRUFBRSxDQU5ZOztBQVFuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lILEVBQUFBLEtBQUssRUFBRSxDQWJZOztBQWVuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lJLEVBQUFBLEtBQUssRUFBRTtBQXBCWSxDQUFSLENBQWYsRUF3QkE7O0FBQ0EsSUFBSUMsVUFBVSxHQUFJUixFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN0QlEsRUFBQUEsU0FBUyxFQUFFLElBRFc7QUFFdEJDLEVBQUFBLE9BQU8sRUFBRSxJQUZhO0FBR3RCQyxFQUFBQSxRQUFRLEVBQUUsSUFIWTtBQUl0QkMsRUFBQUEsYUFBYSxFQUFFO0FBSk8sQ0FBUixDQUFsQjtBQU9BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYmYsRUFBQUEsT0FBTyxFQUFLQSxPQURDO0FBRWJNLEVBQUFBLFFBQVEsRUFBSUEsUUFGQztBQUdiRyxFQUFBQSxVQUFVLEVBQUVBO0FBSEMsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiBcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgTGluZUNhcC5cclxuICogISN6aCDnur/mrrXmnKvnq6/lsZ7mgKdcclxuICogQGVudW0gR3JhcGhpY3MuTGluZUNhcFxyXG4gKi9cclxudmFyIExpbmVDYXAgPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZW5kcyBvZiBsaW5lcyBhcmUgc3F1YXJlZCBvZmYgYXQgdGhlIGVuZHBvaW50cy5cclxuICAgICAqICEjemgg57q/5q615pyr56uv5Lul5pa55b2i57uT5p2f44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQlVUVFxyXG4gICAgICovXHJcbiAgICBCVVRUOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZW5kcyBvZiBsaW5lcyBhcmUgcm91bmRlZC5cclxuICAgICAqICEjemgg57q/5q615pyr56uv5Lul5ZyG5b2i57uT5p2f44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUk9VTkRcclxuICAgICAqL1xyXG4gICAgUk9VTkQ6IDEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbmRzIG9mIGxpbmVzIGFyZSBzcXVhcmVkIG9mZiBieSBhZGRpbmcgYSBib3ggd2l0aCBhbiBlcXVhbCB3aWR0aCBhbmQgaGFsZiB0aGUgaGVpZ2h0IG9mIHRoZSBsaW5lJ3MgdGhpY2tuZXNzLlxyXG4gICAgICogISN6aCDnur/mrrXmnKvnq6/ku6XmlrnlvaLnu5PmnZ/vvIzkvYbmmK/lop7liqDkuobkuIDkuKrlrr3luqblkoznur/mrrXnm7jlkIzvvIzpq5jluqbmmK/nur/mrrXljprluqbkuIDljYrnmoTnn6nlvaLljLrln5/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTUVVBUkVcclxuICAgICAqL1xyXG4gICAgU1FVQVJFOiAyLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEVudW0gZm9yIExpbmVKb2luLlxyXG4gKiAhI3poIOe6v+auteaLkOinkuWxnuaAp1xyXG4gKiBAZW51bSBHcmFwaGljcy5MaW5lSm9pblxyXG4gKi9cclxudmFyIExpbmVKb2luID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRmlsbHMgYW4gYWRkaXRpb25hbCB0cmlhbmd1bGFyIGFyZWEgYmV0d2VlbiB0aGUgY29tbW9uIGVuZHBvaW50IG9mIGNvbm5lY3RlZCBzZWdtZW50cywgYW5kIHRoZSBzZXBhcmF0ZSBvdXRzaWRlIHJlY3Rhbmd1bGFyIGNvcm5lcnMgb2YgZWFjaCBzZWdtZW50LlxyXG4gICAgICogISN6aCDlnKjnm7jov57pg6jliIbnmoTmnKvnq6/loavlhYXkuIDkuKrpop3lpJbnmoTku6XkuInop5LlvaLkuLrlupXnmoTljLrln5/vvIwg5q+P5Liq6YOo5YiG6YO95pyJ5ZCE6Ieq54us56uL55qE55+p5b2i5ouQ6KeS44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQkVWRUxcclxuICAgICAqL1xyXG4gICAgQkVWRUw6IDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJvdW5kcyBvZmYgdGhlIGNvcm5lcnMgb2YgYSBzaGFwZSBieSBmaWxsaW5nIGFuIGFkZGl0aW9uYWwgc2VjdG9yIG9mIGRpc2MgY2VudGVyZWQgYXQgdGhlIGNvbW1vbiBlbmRwb2ludCBvZiBjb25uZWN0ZWQgc2VnbWVudHMuIFRoZSByYWRpdXMgZm9yIHRoZXNlIHJvdW5kZWQgY29ybmVycyBpcyBlcXVhbCB0byB0aGUgbGluZSB3aWR0aC5cclxuICAgICAqICEjemgg6YCa6L+H5aGr5YWF5LiA5Liq6aKd5aSW55qE77yM5ZyG5b+D5Zyo55u46L+e6YOo5YiG5pyr56uv55qE5omH5b2i77yM57uY5Yi25ouQ6KeS55qE5b2i54q244CCIOWchuinkueahOWNiuW+hOaYr+e6v+auteeahOWuveW6puOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJPVU5EXHJcbiAgICAgKi9cclxuICAgIFJPVU5EOiAxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBDb25uZWN0ZWQgc2VnbWVudHMgYXJlIGpvaW5lZCBieSBleHRlbmRpbmcgdGhlaXIgb3V0c2lkZSBlZGdlcyB0byBjb25uZWN0IGF0IGEgc2luZ2xlIHBvaW50LCB3aXRoIHRoZSBlZmZlY3Qgb2YgZmlsbGluZyBhbiBhZGRpdGlvbmFsIGxvemVuZ2Utc2hhcGVkIGFyZWEuXHJcbiAgICAgKiAhI3poIOmAmui/h+W7tuS8uOebuOi/numDqOWIhueahOWklui+uee8mO+8jOS9v+WFtuebuOS6pOS6juS4gOeCue+8jOW9ouaIkOS4gOS4qumineWklueahOiPseW9ouWMuuWfn+OAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1JVEVSXHJcbiAgICAgKi9cclxuICAgIE1JVEVSOiAyXHJcbn0pO1xyXG5cclxuXHJcbi8vIFBvaW50RmxhZ3NcclxudmFyIFBvaW50RmxhZ3MgPSAgY2MuRW51bSh7XHJcbiAgICBQVF9DT1JORVI6IDB4MDEsXHJcbiAgICBQVF9MRUZUOiAweDAyLFxyXG4gICAgUFRfQkVWRUw6IDB4MDQsXHJcbiAgICBQVF9JTk5FUkJFVkVMOiAweDA4LFxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgTGluZUNhcDogICAgTGluZUNhcCxcclxuICAgIExpbmVKb2luOiAgIExpbmVKb2luLFxyXG4gICAgUG9pbnRGbGFnczogUG9pbnRGbGFnc1xyXG59O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==