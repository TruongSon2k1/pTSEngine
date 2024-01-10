
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/graphics/graphics.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var RenderComponent = require('../components/CCRenderComponent');

var Material = require('../assets/material/CCMaterial');

var Types = require('./types');

var LineCap = Types.LineCap;
var LineJoin = Types.LineJoin;
/**
 * @class Graphics
 * @extends RenderComponent
 */

var Graphics = cc.Class({
  name: 'cc.Graphics',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Graphics'
  },
  ctor: function ctor() {
    this._impl = new Graphics._Impl(this);
  },
  properties: {
    _lineWidth: 2,
    _strokeColor: cc.Color.BLACK,
    _lineJoin: LineJoin.MITER,
    _lineCap: LineCap.BUTT,
    _fillColor: cc.Color.WHITE,
    _miterLimit: 10,

    /**
     * !#en
     * Current line width.
     * !#zh
     * 当前线条宽度
     * @property {Number} lineWidth
     * @default 1
     */
    lineWidth: {
      get: function get() {
        return this._lineWidth;
      },
      set: function set(value) {
        this._lineWidth = value;
        this._impl.lineWidth = value;

        this._executeOnChange();
      }
    },

    /**
     * !#en
     * lineJoin determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together.
     * !#zh
     * lineJoin 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性。
     * @property {Graphics.LineJoin} lineJoin
     * @default LineJoin.MITER
     */
    lineJoin: {
      get: function get() {
        return this._lineJoin;
      },
      set: function set(value) {
        this._lineJoin = value;
        this._impl.lineJoin = value;

        this._executeOnChange();
      },
      type: LineJoin
    },

    /**
     * !#en
     * lineCap determines how the end points of every line are drawn.
     * !#zh
     * lineCap 指定如何绘制每一条线段末端。
     * @property {Graphics.LineCap} lineCap
     * @default LineCap.BUTT
     */
    lineCap: {
      get: function get() {
        return this._lineCap;
      },
      set: function set(value) {
        this._lineCap = value;
        this._impl.lineCap = value;

        this._executeOnChange();
      },
      type: LineCap
    },

    /**
     * !#en
     * stroke color
     * !#zh
     * 线段颜色
     * @property {Color} strokeColor
     * @default Color.BLACK
     */
    strokeColor: {
      get: function get() {
        return this._strokeColor;
      },
      set: function set(value) {
        this._impl.strokeColor = this._strokeColor = cc.color(value);

        this._executeOnChange();
      }
    },

    /**
     * !#en
     * fill color
     * !#zh
     * 填充颜色
     * @property {Color} fillColor
     * @default Color.WHITE
     */
    fillColor: {
      get: function get() {
        return this._fillColor;
      },
      set: function set(value) {
        this._impl.fillColor = this._fillColor = cc.color(value);

        this._executeOnChange();
      }
    },

    /**
     * !#en
     * Sets the miter limit ratio
     * !#zh
     * 设置斜接面限制比例
     * @property {Number} miterLimit
     * @default 10
     */
    miterLimit: {
      get: function get() {
        return this._miterLimit;
      },
      set: function set(value) {
        this._miterLimit = value;
        this._impl.miterLimit = value;

        this._executeOnChange();
      }
    }
  },
  statics: {
    LineJoin: LineJoin,
    LineCap: LineCap
  },
  onRestore: function onRestore() {
    if (!this._impl) {
      this._impl = new Graphics._Impl(this);
    }
  },
  onDestroy: function onDestroy() {
    this.clear(true);

    this._super();

    this._impl = null;
  },
  _getDefaultMaterial: function _getDefaultMaterial() {
    return Material.getBuiltinMaterial('2d-graphics');
  },
  _updateMaterial: function _updateMaterial() {
    var material = this._materials[0];
    if (!material) return;

    if (material.getDefine('CC_USE_MODEL') !== undefined) {
      material.define('CC_USE_MODEL', true);
    }

    if (material.getDefine('CC_SUPPORT_standard_derivatives') !== undefined && cc.sys.glExtension('OES_standard_derivatives')) {
      material.define('CC_SUPPORT_standard_derivatives', true);
    }
  },

  /**
   * !#en Move path start point to (x,y).
   * !#zh 移动路径起点到坐标(x, y)
   * @method moveTo
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  moveTo: function moveTo(x, y) {
    if (CC_DEBUG && x instanceof cc.Vec2) {
      cc.warn('[moveTo] : Can not pass Vec2 as [x, y] value, please check it.');
      return;
    }

    this._impl.moveTo(x, y);
  },

  /**
   * !#en Adds a straight line to the path
   * !#zh 绘制直线路径
   * @method lineTo
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  lineTo: function lineTo(x, y) {
    if (CC_DEBUG && x instanceof cc.Vec2) {
      cc.warn('[moveTo] : Can not pass Vec2 as [x, y] value, please check it.');
      return;
    }

    this._impl.lineTo(x, y);
  },

  /**
   * !#en Adds a cubic Bézier curve to the path
   * !#zh 绘制三次贝赛尔曲线路径
   * @method bezierCurveTo
   * @param {Number} [c1x] The x axis of the coordinate for the first control point.
   * @param {Number} [c1y] The y axis of the coordinate for first control point.
   * @param {Number} [c2x] The x axis of the coordinate for the second control point.
   * @param {Number} [c2y] The y axis of the coordinate for the second control point.
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  bezierCurveTo: function bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
    this._impl.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
  },

  /**
   * !#en Adds a quadratic Bézier curve to the path
   * !#zh 绘制二次贝赛尔曲线路径
   * @method quadraticCurveTo
   * @param {Number} [cx] The x axis of the coordinate for the control point.
   * @param {Number} [cy] The y axis of the coordinate for the control point.
   * @param {Number} [x] The x axis of the coordinate for the end point.
   * @param {Number} [y] The y axis of the coordinate for the end point.
   */
  quadraticCurveTo: function quadraticCurveTo(cx, cy, x, y) {
    this._impl.quadraticCurveTo(cx, cy, x, y);
  },

  /**
   * !#en Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
   * !#zh 绘制圆弧路径。圆弧路径的圆心在 (cx, cy) 位置，半径为 r ，根据 counterclockwise （默认为false）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
   * @method arc
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [r] The arc's radius.
   * @param {Number} [startAngle] The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
   * @param {Number} [endAngle] The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
   * @param {Boolean} [counterclockwise] An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
   */
  arc: function arc(cx, cy, r, startAngle, endAngle, counterclockwise) {
    this._impl.arc(cx, cy, r, startAngle, endAngle, counterclockwise);
  },

  /**
   * !#en Adds an ellipse to the path.
   * !#zh 绘制椭圆路径。
   * @method ellipse
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [rx] The ellipse's x-axis radius.
   * @param {Number} [ry] The ellipse's y-axis radius.
   */
  ellipse: function ellipse(cx, cy, rx, ry) {
    this._impl.ellipse(cx, cy, rx, ry);
  },

  /**
   * !#en Adds an circle to the path.
   * !#zh 绘制圆形路径。
   * @method circle
   * @param {Number} [cx] The x axis of the coordinate for the center point.
   * @param {Number} [cy] The y axis of the coordinate for the center point.
   * @param {Number} [r] The circle's radius.
   */
  circle: function circle(cx, cy, r) {
    this._impl.circle(cx, cy, r);
  },

  /**
   * !#en Adds an rectangle to the path.
   * !#zh 绘制矩形路径。
   * @method rect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangle's width.
   * @param {Number} [h] The rectangle's height.
   */
  rect: function rect(x, y, w, h) {
    this._impl.rect(x, y, w, h);
  },

  /**
   * !#en Adds an round corner rectangle to the path.
   * !#zh 绘制圆角矩形路径。
   * @method roundRect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangles width.
   * @param {Number} [h] The rectangle's height.
   * @param {Number} [r] The radius of the rectangle.
   */
  roundRect: function roundRect(x, y, w, h, r) {
    this._impl.roundRect(x, y, w, h, r);
  },

  /**
   * !#en Draws a filled rectangle.
   * !#zh 绘制填充矩形。
   * @method fillRect
   * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
   * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
   * @param {Number} [w] The rectangle's width.
   * @param {Number} [h] The rectangle's height.
   */
  fillRect: function fillRect(x, y, w, h) {
    this.rect(x, y, w, h);
    this.fill();
  },

  /**
   * !#en Erasing any previously drawn content.
   * !#zh 擦除之前绘制的所有内容的方法。
   * @method clear
   * @param {Boolean} [clean] Whether to clean the graphics inner cache.
   */
  clear: function clear(clean) {
    this._impl.clear(clean);

    if (this._assembler) {
      this._assembler.clear(clean);
    }
  },

  /**
   * !#en Causes the point of the pen to move back to the start of the current path. It tries to add a straight line from the current point to the start.
   * !#zh 将笔点返回到当前路径起始点的。它尝试从当前点到起始点绘制一条直线。
   * @method close
   */
  close: function close() {
    this._impl.close();
  },

  /**
   * !#en Strokes the current or given path with the current stroke style.
   * !#zh 根据当前的画线样式，绘制当前或已经存在的路径。
   * @method stroke
   */
  stroke: function stroke() {
    if (!this._assembler) {
      this._resetAssembler();
    }

    this._assembler.stroke(this);
  },

  /**
   * !#en Fills the current or given path with the current fill style.
   * !#zh 根据当前的画线样式，填充当前或已经存在的路径。
   * @method fill
   */
  fill: function fill() {
    if (!this._assembler) {
      this._resetAssembler();
    }

    this._assembler.fill(this);
  }
});
cc.Graphics = module.exports = Graphics;
cc.Graphics.Types = Types;
cc.Graphics.Helper = require('./helper');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGdyYXBoaWNzXFxncmFwaGljcy5qcyJdLCJuYW1lcyI6WyJSZW5kZXJDb21wb25lbnQiLCJyZXF1aXJlIiwiTWF0ZXJpYWwiLCJUeXBlcyIsIkxpbmVDYXAiLCJMaW5lSm9pbiIsIkdyYXBoaWNzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiY3RvciIsIl9pbXBsIiwiX0ltcGwiLCJwcm9wZXJ0aWVzIiwiX2xpbmVXaWR0aCIsIl9zdHJva2VDb2xvciIsIkNvbG9yIiwiQkxBQ0siLCJfbGluZUpvaW4iLCJNSVRFUiIsIl9saW5lQ2FwIiwiQlVUVCIsIl9maWxsQ29sb3IiLCJXSElURSIsIl9taXRlckxpbWl0IiwibGluZVdpZHRoIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJfZXhlY3V0ZU9uQ2hhbmdlIiwibGluZUpvaW4iLCJ0eXBlIiwibGluZUNhcCIsInN0cm9rZUNvbG9yIiwiY29sb3IiLCJmaWxsQ29sb3IiLCJtaXRlckxpbWl0Iiwic3RhdGljcyIsIm9uUmVzdG9yZSIsIm9uRGVzdHJveSIsImNsZWFyIiwiX3N1cGVyIiwiX2dldERlZmF1bHRNYXRlcmlhbCIsImdldEJ1aWx0aW5NYXRlcmlhbCIsIl91cGRhdGVNYXRlcmlhbCIsIm1hdGVyaWFsIiwiX21hdGVyaWFscyIsImdldERlZmluZSIsInVuZGVmaW5lZCIsImRlZmluZSIsInN5cyIsImdsRXh0ZW5zaW9uIiwibW92ZVRvIiwieCIsInkiLCJDQ19ERUJVRyIsIlZlYzIiLCJ3YXJuIiwibGluZVRvIiwiYmV6aWVyQ3VydmVUbyIsImMxeCIsImMxeSIsImMyeCIsImMyeSIsInF1YWRyYXRpY0N1cnZlVG8iLCJjeCIsImN5IiwiYXJjIiwiciIsInN0YXJ0QW5nbGUiLCJlbmRBbmdsZSIsImNvdW50ZXJjbG9ja3dpc2UiLCJlbGxpcHNlIiwicngiLCJyeSIsImNpcmNsZSIsInJlY3QiLCJ3IiwiaCIsInJvdW5kUmVjdCIsImZpbGxSZWN0IiwiZmlsbCIsImNsZWFuIiwiX2Fzc2VtYmxlciIsImNsb3NlIiwic3Ryb2tlIiwiX3Jlc2V0QXNzZW1ibGVyIiwibW9kdWxlIiwiZXhwb3J0cyIsIkhlbHBlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZUFBZSxHQUFHQyxPQUFPLENBQUMsaUNBQUQsQ0FBL0I7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsK0JBQUQsQ0FBeEI7O0FBRUEsSUFBTUUsS0FBSyxHQUFHRixPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNRyxPQUFPLEdBQUdELEtBQUssQ0FBQ0MsT0FBdEI7QUFDQSxJQUFNQyxRQUFRLEdBQUdGLEtBQUssQ0FBQ0UsUUFBdkI7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BCQyxFQUFBQSxJQUFJLEVBQUUsYUFEYztBQUVwQixhQUFTVCxlQUZXO0FBSXBCVSxFQUFBQSxNQUFNLEVBQUVDLFNBQVMsSUFBSTtBQUNqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRFcsR0FKRDtBQVFwQkMsRUFBQUEsSUFSb0Isa0JBUVo7QUFDSixTQUFLQyxLQUFMLEdBQWEsSUFBSVIsUUFBUSxDQUFDUyxLQUFiLENBQW1CLElBQW5CLENBQWI7QUFDSCxHQVZtQjtBQVlwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFVBQVUsRUFBRSxDQURKO0FBRVJDLElBQUFBLFlBQVksRUFBRVgsRUFBRSxDQUFDWSxLQUFILENBQVNDLEtBRmY7QUFHUkMsSUFBQUEsU0FBUyxFQUFFaEIsUUFBUSxDQUFDaUIsS0FIWjtBQUlSQyxJQUFBQSxR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bEIsV0FBS0csZUFBTDtBQUNIOztBQUNELFNBQUtILFVBQUwsQ0FBZ0JFLE1BQWhCLENBQXVCLElBQXZCO0FBQ0gsR0FyVm1COztBQXVWcEI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJSixFQUFBQSxJQTVWb0Isa0JBNFZaO0FBQ0osUUFBSSxDQUFDLEtBQUtFLFVBQVYsRUFBc0I7QUFDbEIsV0FBS0csZUFBTDtBQUNIOztBQUNELFNBQUtILFVBQUwsQ0FBZ0JGLElBQWhCLENBQXFCLElBQXJCO0FBQ0g7QUFqV21CLENBQVQsQ0FBZjtBQW9XQTdFLEVBQUUsQ0FBQ0QsUUFBSCxHQUFjb0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckYsUUFBL0I7QUFDQUMsRUFBRSxDQUFDRCxRQUFILENBQVlILEtBQVosR0FBb0JBLEtBQXBCO0FBQ0FJLEVBQUUsQ0FBQ0QsUUFBSCxDQUFZc0YsTUFBWixHQUFxQjNGLE9BQU8sQ0FBQyxVQUFELENBQTVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0NDUmVuZGVyQ29tcG9uZW50Jyk7XG5jb25zdCBNYXRlcmlhbCA9IHJlcXVpcmUoJy4uL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XG5cbmNvbnN0IFR5cGVzID0gcmVxdWlyZSgnLi90eXBlcycpO1xuY29uc3QgTGluZUNhcCA9IFR5cGVzLkxpbmVDYXA7XG5jb25zdCBMaW5lSm9pbiA9IFR5cGVzLkxpbmVKb2luO1xuXG4vKipcbiAqIEBjbGFzcyBHcmFwaGljc1xuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XG4gKi9cbmxldCBHcmFwaGljcyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuR3JhcGhpY3MnLFxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvR3JhcGhpY3MnLFxuICAgIH0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5faW1wbCA9IG5ldyBHcmFwaGljcy5fSW1wbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbGluZVdpZHRoOiAyLFxuICAgICAgICBfc3Ryb2tlQ29sb3I6IGNjLkNvbG9yLkJMQUNLLFxuICAgICAgICBfbGluZUpvaW46IExpbmVKb2luLk1JVEVSLFxuICAgICAgICBfbGluZUNhcDogTGluZUNhcC5CVVRULFxuICAgICAgICBfZmlsbENvbG9yOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgX21pdGVyTGltaXQ6IDEwLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogQ3VycmVudCBsaW5lIHdpZHRoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW9k+WJjee6v+adoeWuveW6plxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGluZVdpZHRoXG4gICAgICAgICAqIEBkZWZhdWx0IDFcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVXaWR0aDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGluZVdpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saW5lV2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLmxpbmVXaWR0aCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVPbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIGxpbmVKb2luIGRldGVybWluZXMgaG93IHR3byBjb25uZWN0aW5nIHNlZ21lbnRzIChvZiBsaW5lcywgYXJjcyBvciBjdXJ2ZXMpIHdpdGggbm9uLXplcm8gbGVuZ3RocyBpbiBhIHNoYXBlIGFyZSBqb2luZWQgdG9nZXRoZXIuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICogbGluZUpvaW4g55So5p2l6K6+572uMuS4qumVv+W6puS4jeS4ujDnmoTnm7jov57pg6jliIbvvIjnur/mrrXvvIzlnIblvKfvvIzmm7Lnur/vvInlpoLkvZXov57mjqXlnKjkuIDotbfnmoTlsZ7mgKfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtHcmFwaGljcy5MaW5lSm9pbn0gbGluZUpvaW5cbiAgICAgICAgICogQGRlZmF1bHQgTGluZUpvaW4uTUlURVJcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVKb2luOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW5lSm9pbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGluZUpvaW4gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLmxpbmVKb2luID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZU9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogTGluZUpvaW5cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBsaW5lQ2FwIGRldGVybWluZXMgaG93IHRoZSBlbmQgcG9pbnRzIG9mIGV2ZXJ5IGxpbmUgYXJlIGRyYXduLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIGxpbmVDYXAg5oyH5a6a5aaC5L2V57uY5Yi25q+P5LiA5p2h57q/5q615pyr56uv44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7R3JhcGhpY3MuTGluZUNhcH0gbGluZUNhcFxuICAgICAgICAgKiBAZGVmYXVsdCBMaW5lQ2FwLkJVVFRcbiAgICAgICAgICovXG4gICAgICAgIGxpbmVDYXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVDYXA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpbmVDYXAgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbXBsLmxpbmVDYXAgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjdXRlT25DaGFuZ2UoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBMaW5lQ2FwXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogc3Ryb2tlIGNvbG9yXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog57q/5q616aKc6ImyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IHN0cm9rZUNvbG9yXG4gICAgICAgICAqIEBkZWZhdWx0IENvbG9yLkJMQUNLXG4gICAgICAgICAqL1xuICAgICAgICBzdHJva2VDb2xvcjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwuc3Ryb2tlQ29sb3IgPSB0aGlzLl9zdHJva2VDb2xvciA9IGNjLmNvbG9yKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjdXRlT25DaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBmaWxsIGNvbG9yXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aGr5YWF6aKc6ImyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGZpbGxDb2xvclxuICAgICAgICAgKiBAZGVmYXVsdCBDb2xvci5XSElURVxuICAgICAgICAgKi9cbiAgICAgICAgZmlsbENvbG9yOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ltcGwuZmlsbENvbG9yID0gdGhpcy5fZmlsbENvbG9yID0gY2MuY29sb3IodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGVPbkNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFNldHMgdGhlIG1pdGVyIGxpbWl0IHJhdGlvXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K6+572u5pac5o6l6Z2i6ZmQ5Yi25q+U5L6LXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBtaXRlckxpbWl0XG4gICAgICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICAgICAqL1xuICAgICAgICBtaXRlckxpbWl0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9taXRlckxpbWl0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9taXRlckxpbWl0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1wbC5taXRlckxpbWl0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZU9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG5cblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgTGluZUpvaW46IExpbmVKb2luLFxuICAgICAgICBMaW5lQ2FwOiBMaW5lQ2FwXG4gICAgfSxcblxuICAgIG9uUmVzdG9yZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW1wbCkge1xuICAgICAgICAgICAgdGhpcy5faW1wbCA9IG5ldyBHcmFwaGljcy5fSW1wbCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLmNsZWFyKHRydWUpO1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLl9pbXBsID0gbnVsbDtcbiAgICB9LFxuXG4gICAgX2dldERlZmF1bHRNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXBoaWNzJyk7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuX21hdGVyaWFsc1swXTtcbiAgICAgICAgaWYgKCFtYXRlcmlhbCkgcmV0dXJuO1xuICAgICAgICBpZiAobWF0ZXJpYWwuZ2V0RGVmaW5lKCdDQ19VU0VfTU9ERUwnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRlcmlhbC5nZXREZWZpbmUoJ0NDX1NVUFBPUlRfc3RhbmRhcmRfZGVyaXZhdGl2ZXMnKSAhPT0gdW5kZWZpbmVkICYmIGNjLnN5cy5nbEV4dGVuc2lvbignT0VTX3N0YW5kYXJkX2Rlcml2YXRpdmVzJykpIHtcbiAgICAgICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfU1VQUE9SVF9zdGFuZGFyZF9kZXJpdmF0aXZlcycsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gTW92ZSBwYXRoIHN0YXJ0IHBvaW50IHRvICh4LHkpLlxuICAgICAqICEjemgg56e75Yqo6Lev5b6E6LW354K55Yiw5Z2Q5qCHKHgsIHkpXG4gICAgICogQG1ldGhvZCBtb3ZlVG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBlbmQgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqL1xuICAgIG1vdmVUbyAoeCwgeSkge1xuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgeCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcbiAgICAgICAgICAgIGNjLndhcm4oJ1ttb3ZlVG9dIDogQ2FuIG5vdCBwYXNzIFZlYzIgYXMgW3gsIHldIHZhbHVlLCBwbGVhc2UgY2hlY2sgaXQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW1wbC5tb3ZlVG8oeCwgeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhIHN0cmFpZ2h0IGxpbmUgdG8gdGhlIHBhdGhcbiAgICAgKiAhI3poIOe7mOWItuebtOe6v+i3r+W+hFxuICAgICAqIEBtZXRob2QgbGluZVRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKi9cbiAgICBsaW5lVG8gKHgsIHkpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHICYmIHggaW5zdGFuY2VvZiBjYy5WZWMyKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdbbW92ZVRvXSA6IENhbiBub3QgcGFzcyBWZWMyIGFzIFt4LCB5XSB2YWx1ZSwgcGxlYXNlIGNoZWNrIGl0LicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ltcGwubGluZVRvKHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYSBjdWJpYyBCw6l6aWVyIGN1cnZlIHRvIHRoZSBwYXRoXG4gICAgICogISN6aCDnu5jliLbkuInmrKHotJ3otZvlsJTmm7Lnur/ot6/lvoRcbiAgICAgKiBAbWV0aG9kIGJlemllckN1cnZlVG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2MxeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGZpcnN0IGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjMXldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIGZpcnN0IGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjMnhdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBzZWNvbmQgY29udHJvbCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2MyeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHNlY29uZCBjb250cm9sIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBlbmQgcG9pbnQuXG4gICAgICovXG4gICAgYmV6aWVyQ3VydmVUbyAoYzF4LCBjMXksIGMyeCwgYzJ5LCB4LCB5KSB7XG4gICAgICAgIHRoaXMuX2ltcGwuYmV6aWVyQ3VydmVUbyhjMXgsIGMxeSwgYzJ4LCBjMnksIHgsIHkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYSBxdWFkcmF0aWMgQsOpemllciBjdXJ2ZSB0byB0aGUgcGF0aFxuICAgICAqICEjemgg57uY5Yi25LqM5qyh6LSd6LWb5bCU5puy57q/6Lev5b6EXG4gICAgICogQG1ldGhvZCBxdWFkcmF0aWNDdXJ2ZVRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNvbnRyb2wgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgZW5kIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGVuZCBwb2ludC5cbiAgICAgKi9cbiAgICBxdWFkcmF0aWNDdXJ2ZVRvIChjeCwgY3ksIHgsIHkpIHtcbiAgICAgICAgdGhpcy5faW1wbC5xdWFkcmF0aWNDdXJ2ZVRvKGN4LCBjeSwgeCwgeSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhbiBhcmMgdG8gdGhlIHBhdGggd2hpY2ggaXMgY2VudGVyZWQgYXQgKGN4LCBjeSkgcG9zaXRpb24gd2l0aCByYWRpdXMgciBzdGFydGluZyBhdCBzdGFydEFuZ2xlIGFuZCBlbmRpbmcgYXQgZW5kQW5nbGUgZ29pbmcgaW4gdGhlIGdpdmVuIGRpcmVjdGlvbiBieSBjb3VudGVyY2xvY2t3aXNlIChkZWZhdWx0aW5nIHRvIGZhbHNlKS5cbiAgICAgKiAhI3poIOe7mOWItuWchuW8p+i3r+W+hOOAguWchuW8p+i3r+W+hOeahOWchuW/g+WcqCAoY3gsIGN5KSDkvY3nva7vvIzljYrlvoTkuLogciDvvIzmoLnmja4gY291bnRlcmNsb2Nrd2lzZSDvvIjpu5jorqTkuLpmYWxzZe+8ieaMh+WumueahOaWueWQkeS7jiBzdGFydEFuZ2xlIOW8gOWni+e7mOWItu+8jOWIsCBlbmRBbmdsZSDnu5PmnZ/jgIJcbiAgICAgKiBAbWV0aG9kIGFyY1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtjeV0gVGhlIHkgYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3JdIFRoZSBhcmMncyByYWRpdXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydEFuZ2xlXSBUaGUgYW5nbGUgYXQgd2hpY2ggdGhlIGFyYyBzdGFydHMsIG1lYXN1cmVkIGNsb2Nrd2lzZSBmcm9tIHRoZSBwb3NpdGl2ZSB4IGF4aXMgYW5kIGV4cHJlc3NlZCBpbiByYWRpYW5zLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZW5kQW5nbGVdIFRoZSBhbmdsZSBhdCB3aGljaCB0aGUgYXJjIGVuZHMsIG1lYXN1cmVkIGNsb2Nrd2lzZSBmcm9tIHRoZSBwb3NpdGl2ZSB4IGF4aXMgYW5kIGV4cHJlc3NlZCBpbiByYWRpYW5zLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvdW50ZXJjbG9ja3dpc2VdIEFuIG9wdGlvbmFsIEJvb2xlYW4gd2hpY2gsIGlmIHRydWUsIGNhdXNlcyB0aGUgYXJjIHRvIGJlIGRyYXduIGNvdW50ZXItY2xvY2t3aXNlIGJldHdlZW4gdGhlIHR3byBhbmdsZXMuIEJ5IGRlZmF1bHQgaXQgaXMgZHJhd24gY2xvY2t3aXNlLlxuICAgICAqL1xuICAgIGFyYyAoY3gsIGN5LCByLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgY291bnRlcmNsb2Nrd2lzZSkge1xuICAgICAgICB0aGlzLl9pbXBsLmFyYyhjeCwgY3ksIHIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBjb3VudGVyY2xvY2t3aXNlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGFuIGVsbGlwc2UgdG8gdGhlIHBhdGguXG4gICAgICogISN6aCDnu5jliLbmpK3lnIbot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIGVsbGlwc2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2N4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyeF0gVGhlIGVsbGlwc2UncyB4LWF4aXMgcmFkaXVzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbcnldIFRoZSBlbGxpcHNlJ3MgeS1heGlzIHJhZGl1cy5cbiAgICAgKi9cbiAgICBlbGxpcHNlIChjeCwgY3ksIHJ4LCByeSkge1xuICAgICAgICB0aGlzLl9pbXBsLmVsbGlwc2UoY3gsIGN5LCByeCwgcnkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgYW4gY2lyY2xlIHRvIHRoZSBwYXRoLlxuICAgICAqICEjemgg57uY5Yi25ZyG5b2i6Lev5b6E44CCXG4gICAgICogQG1ldGhvZCBjaXJjbGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2N4XSBUaGUgeCBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbY3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyXSBUaGUgY2lyY2xlJ3MgcmFkaXVzLlxuICAgICAqL1xuICAgIGNpcmNsZSAoY3gsIGN5LCByKSB7XG4gICAgICAgIHRoaXMuX2ltcGwuY2lyY2xlKGN4LCBjeSwgcik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhbiByZWN0YW5nbGUgdG8gdGhlIHBhdGguXG4gICAgICogISN6aCDnu5jliLbnn6nlvaLot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIHJlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd10gVGhlIHJlY3RhbmdsZSdzIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbaF0gVGhlIHJlY3RhbmdsZSdzIGhlaWdodC5cbiAgICAgKi9cbiAgICByZWN0ICh4LCB5LCB3LCBoKSB7XG4gICAgICAgIHRoaXMuX2ltcGwucmVjdCh4LCB5LCB3LCBoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGFuIHJvdW5kIGNvcm5lciByZWN0YW5nbGUgdG8gdGhlIHBhdGguXG4gICAgICogISN6aCDnu5jliLblnIbop5Lnn6nlvaLot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIHJvdW5kUmVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeF0gVGhlIHggYXhpcyBvZiB0aGUgY29vcmRpbmF0ZSBmb3IgdGhlIHJlY3RhbmdsZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldIFRoZSB5IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt3XSBUaGUgcmVjdGFuZ2xlcyB3aWR0aC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2hdIFRoZSByZWN0YW5nbGUncyBoZWlnaHQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtyXSBUaGUgcmFkaXVzIG9mIHRoZSByZWN0YW5nbGUuXG4gICAgICovXG4gICAgcm91bmRSZWN0ICh4LCB5LCB3LCBoLCByKSB7XG4gICAgICAgIHRoaXMuX2ltcGwucm91bmRSZWN0KHgsIHksIHcsIGgsIHIpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERyYXdzIGEgZmlsbGVkIHJlY3RhbmdsZS5cbiAgICAgKiAhI3poIOe7mOWItuWhq+WFheefqeW9ouOAglxuICAgICAqIEBtZXRob2QgZmlsbFJlY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFRoZSB4IGF4aXMgb2YgdGhlIGNvb3JkaW5hdGUgZm9yIHRoZSByZWN0YW5nbGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSBUaGUgeSBheGlzIG9mIHRoZSBjb29yZGluYXRlIGZvciB0aGUgcmVjdGFuZ2xlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd10gVGhlIHJlY3RhbmdsZSdzIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbaF0gVGhlIHJlY3RhbmdsZSdzIGhlaWdodC5cbiAgICAgKi9cbiAgICBmaWxsUmVjdCAoeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLnJlY3QoeCwgeSwgdywgaCk7XG4gICAgICAgIHRoaXMuZmlsbCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEVyYXNpbmcgYW55IHByZXZpb3VzbHkgZHJhd24gY29udGVudC5cbiAgICAgKiAhI3poIOaTpumZpOS5i+WJjee7mOWItueahOaJgOacieWGheWuueeahOaWueazleOAglxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbl0gV2hldGhlciB0byBjbGVhbiB0aGUgZ3JhcGhpY3MgaW5uZXIgY2FjaGUuXG4gICAgICovXG4gICAgY2xlYXIgKGNsZWFuKSB7XG4gICAgICAgIHRoaXMuX2ltcGwuY2xlYXIoY2xlYW4pO1xuICAgICAgICBpZiAodGhpcy5fYXNzZW1ibGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9hc3NlbWJsZXIuY2xlYXIoY2xlYW4pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2F1c2VzIHRoZSBwb2ludCBvZiB0aGUgcGVuIHRvIG1vdmUgYmFjayB0byB0aGUgc3RhcnQgb2YgdGhlIGN1cnJlbnQgcGF0aC4gSXQgdHJpZXMgdG8gYWRkIGEgc3RyYWlnaHQgbGluZSBmcm9tIHRoZSBjdXJyZW50IHBvaW50IHRvIHRoZSBzdGFydC5cbiAgICAgKiAhI3poIOWwhueslOeCuei/lOWbnuWIsOW9k+WJjei3r+W+hOi1t+Wni+eCueeahOOAguWug+WwneivleS7juW9k+WJjeeCueWIsOi1t+Wni+eCuee7mOWItuS4gOadoeebtOe6v+OAglxuICAgICAqIEBtZXRob2QgY2xvc2VcbiAgICAgKi9cbiAgICBjbG9zZSAoKSB7XG4gICAgICAgIHRoaXMuX2ltcGwuY2xvc2UoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdHJva2VzIHRoZSBjdXJyZW50IG9yIGdpdmVuIHBhdGggd2l0aCB0aGUgY3VycmVudCBzdHJva2Ugc3R5bGUuXG4gICAgICogISN6aCDmoLnmja7lvZPliY3nmoTnlLvnur/moLflvI/vvIznu5jliLblvZPliY3miJblt7Lnu4/lrZjlnKjnmoTot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIHN0cm9rZVxuICAgICAqL1xuICAgIHN0cm9rZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXNzZW1ibGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5zdHJva2UodGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmlsbHMgdGhlIGN1cnJlbnQgb3IgZ2l2ZW4gcGF0aCB3aXRoIHRoZSBjdXJyZW50IGZpbGwgc3R5bGUuXG4gICAgICogISN6aCDmoLnmja7lvZPliY3nmoTnlLvnur/moLflvI/vvIzloavlhYXlvZPliY3miJblt7Lnu4/lrZjlnKjnmoTot6/lvoTjgIJcbiAgICAgKiBAbWV0aG9kIGZpbGxcbiAgICAgKi9cbiAgICBmaWxsICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hc3NlbWJsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0QXNzZW1ibGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLmZpbGwodGhpcyk7XG4gICAgfVxufSk7XG5cbmNjLkdyYXBoaWNzID0gbW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljcztcbmNjLkdyYXBoaWNzLlR5cGVzID0gVHlwZXM7XG5jYy5HcmFwaGljcy5IZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=