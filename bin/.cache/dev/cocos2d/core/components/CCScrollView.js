
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCScrollView.js';
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
var NodeEvent = require('../CCNode').EventType;

var NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED = 5;
var OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
var EPSILON = 1e-4;
var MOVEMENT_FACTOR = 0.7;

var _tempPoint = cc.v2();

var _tempPrevPoint = cc.v2();

var quintEaseOut = function quintEaseOut(time) {
  time -= 1;
  return time * time * time * time * time + 1;
};

var getTimeInMilliseconds = function getTimeInMilliseconds() {
  var currentTime = new Date();
  return currentTime.getMilliseconds();
};
/**
 * !#en Enum for ScrollView event type.
 * !#zh 滚动视图事件类型
 * @enum ScrollView.EventType
 */


var EventType = cc.Enum({
  /**
   * !#en The event emmitted when ScrollView scroll to the top boundary of inner container
   * !#zh 滚动视图滚动到顶部边界事件
   * @property {Number} SCROLL_TO_TOP
   */
  SCROLL_TO_TOP: 0,

  /**
   * !#en The event emmitted when ScrollView scroll to the bottom boundary of inner container
   * !#zh 滚动视图滚动到底部边界事件
   * @property {Number} SCROLL_TO_BOTTOM
   */
  SCROLL_TO_BOTTOM: 1,

  /**
   * !#en The event emmitted when ScrollView scroll to the left boundary of inner container
   * !#zh 滚动视图滚动到左边界事件
   * @property {Number} SCROLL_TO_LEFT
   */
  SCROLL_TO_LEFT: 2,

  /**
   * !#en The event emmitted when ScrollView scroll to the right boundary of inner container
   * !#zh 滚动视图滚动到右边界事件
   * @property {Number} SCROLL_TO_RIGHT
   */
  SCROLL_TO_RIGHT: 3,

  /**
   * !#en The event emmitted when ScrollView is scrolling
   * !#zh 滚动视图正在滚动时发出的事件
   * @property {Number} SCROLLING
   */
  SCROLLING: 4,

  /**
   * !#en The event emmitted when ScrollView scroll to the top boundary of inner container and start bounce
   * !#zh 滚动视图滚动到顶部边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_TOP
   */
  BOUNCE_TOP: 5,

  /**
   * !#en The event emmitted when ScrollView scroll to the bottom boundary of inner container and start bounce
   * !#zh 滚动视图滚动到底部边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_BOTTOM
   */
  BOUNCE_BOTTOM: 6,

  /**
   * !#en The event emmitted when ScrollView scroll to the left boundary of inner container and start bounce
   * !#zh 滚动视图滚动到左边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_LEFT
   */
  BOUNCE_LEFT: 7,

  /**
   * !#en The event emmitted when ScrollView scroll to the right boundary of inner container and start bounce
   * !#zh 滚动视图滚动到右边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_RIGHT
   */
  BOUNCE_RIGHT: 8,

  /**
   * !#en The event emmitted when ScrollView auto scroll ended
   * !#zh 滚动视图滚动结束的时候发出的事件
   * @property {Number} SCROLL_ENDED
   */
  SCROLL_ENDED: 9,

  /**
   * !#en The event emmitted when user release the touch
   * !#zh 当用户松手的时候会发出一个事件
   * @property {Number} TOUCH_UP
   */
  TOUCH_UP: 10,

  /**
   * !#en The event emmitted when ScrollView auto scroll ended with a threshold
   * !#zh 滚动视图自动滚动快要结束的时候发出的事件
   * @property {Number} AUTOSCROLL_ENDED_WITH_THRESHOLD
   */
  AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,

  /**
   * !#en The event emmitted when ScrollView scroll began
   * !#zh 滚动视图滚动开始时发出的事件
   * @property {Number} SCROLL_BEGAN
   */
  SCROLL_BEGAN: 12
});
var eventMap = {
  'scroll-to-top': EventType.SCROLL_TO_TOP,
  'scroll-to-bottom': EventType.SCROLL_TO_BOTTOM,
  'scroll-to-left': EventType.SCROLL_TO_LEFT,
  'scroll-to-right': EventType.SCROLL_TO_RIGHT,
  'scrolling': EventType.SCROLLING,
  'bounce-bottom': EventType.BOUNCE_BOTTOM,
  'bounce-left': EventType.BOUNCE_LEFT,
  'bounce-right': EventType.BOUNCE_RIGHT,
  'bounce-top': EventType.BOUNCE_TOP,
  'scroll-ended': EventType.SCROLL_ENDED,
  'touch-up': EventType.TOUCH_UP,
  'scroll-ended-with-threshold': EventType.AUTOSCROLL_ENDED_WITH_THRESHOLD,
  'scroll-began': EventType.SCROLL_BEGAN
};
/**
 * !#en
 * Layout container for a view hierarchy that can be scrolled by the user,
 * allowing it to be larger than the physical display.
 *
 * !#zh
 * 滚动视图组件
 * @class ScrollView
 * @extends Component
 */

var ScrollView = cc.Class({
  name: 'cc.ScrollView',
  "extends": require('./CCViewGroup'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/ScrollView',
    help: 'i18n:COMPONENT.help_url.scrollview',
    inspector: 'packages://inspector/inspectors/comps/scrollview.js',
    executeInEditMode: false
  },
  ctor: function ctor() {
    this._topBoundary = 0;
    this._bottomBoundary = 0;
    this._leftBoundary = 0;
    this._rightBoundary = 0;
    this._touchMoveDisplacements = [];
    this._touchMoveTimeDeltas = [];
    this._touchMovePreviousTimestamp = 0;
    this._touchMoved = false;
    this._autoScrolling = false;
    this._autoScrollAttenuate = false;
    this._autoScrollStartPosition = cc.v2(0, 0);
    this._autoScrollTargetDelta = cc.v2(0, 0);
    this._autoScrollTotalTime = 0;
    this._autoScrollAccumulatedTime = 0;
    this._autoScrollCurrentlyOutOfBoundary = false;
    this._autoScrollBraking = false;
    this._autoScrollBrakingStartPosition = cc.v2(0, 0);
    this._outOfBoundaryAmount = cc.v2(0, 0);
    this._outOfBoundaryAmountDirty = true;
    this._stopMouseWheel = false;
    this._mouseWheelEventElapsedTime = 0.0;
    this._isScrollEndedWithThresholdEventFired = false; //use bit wise operations to indicate the direction

    this._scrollEventEmitMask = 0;
    this._isBouncing = false;
    this._scrolling = false;
  },
  properties: {
    /**
     * !#en This is a reference to the UI element to be scrolled.
     * !#zh 可滚动展示内容的节点。
     * @property {Node} content
     */
    content: {
      "default": undefined,
      type: cc.Node,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.content',
      formerlySerializedAs: 'content',
      notify: function notify(oldValue) {
        this._calculateBoundary();
      }
    },

    /**
     * !#en Enable horizontal scroll.
     * !#zh 是否开启水平滚动。
     * @property {Boolean} horizontal
     */
    horizontal: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.horizontal'
    },

    /**
     * !#en Enable vertical scroll.
     * !#zh 是否开启垂直滚动。
     * @property {Boolean} vertical
     */
    vertical: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.vertical'
    },

    /**
     * !#en When inertia is set, the content will continue to move when touch ended.
     * !#zh 是否开启滚动惯性。
     * @property {Boolean} inertia
     */
    inertia: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.inertia'
    },

    /**
     * !#en
     * It determines how quickly the content stop moving. A value of 1 will stop the movement immediately.
     * A value of 0 will never stop the movement until it reaches to the boundary of scrollview.
     * !#zh
     * 开启惯性后，在用户停止触摸后滚动多快停止，0表示永不停止，1表示立刻停止。
     * @property {Number} brake
     */
    brake: {
      "default": 0.5,
      type: cc.Float,
      range: [0, 1, 0.1],
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.brake'
    },

    /**
     * !#en When elastic is set, the content will be bounce back when move out of boundary.
     * !#zh 是否允许滚动内容超过边界，并在停止触摸后回弹。
     * @property {Boolean} elastic
     */
    elastic: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.elastic'
    },

    /**
     * !#en The elapse time of bouncing back. A value of 0 will bounce back immediately.
     * !#zh 回弹持续的时间，0 表示将立即反弹。
     * @property {Number} bounceDuration
     */
    bounceDuration: {
      "default": 1,
      range: [0, 10],
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.bounceDuration'
    },

    /**
     * !#en The horizontal scrollbar reference.
     * !#zh 水平滚动的 ScrollBar。
     * @property {Scrollbar} horizontalScrollBar
     */
    horizontalScrollBar: {
      "default": undefined,
      type: cc.Scrollbar,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.horizontal_bar',
      notify: function notify() {
        if (this.horizontalScrollBar) {
          this.horizontalScrollBar.setTargetScrollView(this);

          this._updateScrollBar(0);
        }
      },
      animatable: false
    },

    /**
     * !#en The vertical scrollbar reference.
     * !#zh 垂直滚动的 ScrollBar。
     * @property {Scrollbar} verticalScrollBar
     */
    verticalScrollBar: {
      "default": undefined,
      type: cc.Scrollbar,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.vertical_bar',
      notify: function notify() {
        if (this.verticalScrollBar) {
          this.verticalScrollBar.setTargetScrollView(this);

          this._updateScrollBar(0);
        }
      },
      animatable: false
    },

    /**
     * !#en Scrollview events callback
     * !#zh 滚动视图的事件回调函数
     * @property {Component.EventHandler[]} scrollEvents
     */
    scrollEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.scrollEvents'
    },

    /**
     * !#en If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes
     * It's set to true by default.
     * !#zh 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。
     * 注意，子节点上的 touchstart 事件仍然会触发，触点移动距离非常短的情况下 touchmove 和 touchend 也不会受影响。
     * @property {Boolean} cancelInnerEvents
     */
    cancelInnerEvents: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.cancelInnerEvents'
    },
    // private object
    _view: {
      get: function get() {
        if (this.content) {
          return this.content.parent;
        }
      }
    }
  },
  statics: {
    EventType: EventType
  },

  /**
   * !#en Scroll the content to the bottom boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图底部。
   * @method scrollToBottom
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the bottom of the view.
   * scrollView.scrollToBottom(0.1);
   */
  scrollToBottom: function scrollToBottom(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta, true);
    }
  },

  /**
   * !#en Scroll the content to the top boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图顶部。
   * @method scrollToTop
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the top of the view.
   * scrollView.scrollToTop(0.1);
   */
  scrollToTop: function scrollToTop(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 1),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左边。
   * @method scrollToLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the left of the view.
   * scrollView.scrollToLeft(0.1);
   */
  scrollToLeft: function scrollToLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右边。
   * @method scrollToRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the right of the view.
   * scrollView.scrollToRight(0.1);
   */
  scrollToRight: function scrollToRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the top left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左上角。
   * @method scrollToTopLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the upper left corner of the view.
   * scrollView.scrollToTopLeft(0.1);
   */
  scrollToTopLeft: function scrollToTopLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 1),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the top right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右上角。
   * @method scrollToTopRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the top right corner of the view.
   * scrollView.scrollToTopRight(0.1);
   */
  scrollToTopRight: function scrollToTopRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 1),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the bottom left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左下角。
   * @method scrollToBottomLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the lower left corner of the view.
   * scrollView.scrollToBottomLeft(0.1);
   */
  scrollToBottomLeft: function scrollToBottomLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the bottom right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右下角。
   * @method scrollToBottomRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the lower right corner of the view.
   * scrollView.scrollToBottomRight(0.1);
   */
  scrollToBottomRight: function scrollToBottomRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 0),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll with an offset related to the ScrollView's top left origin, if timeInSecond is omitted, then it will jump to the
   *       specific offset immediately.
   * !#zh 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond参数不传，则立即滚动到指定偏移位置。
   * @method scrollToOffset
   * @param {Vec2} offset - A Vec2, the value of which each axis between 0 and maxScrollOffset
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the specific offset of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to middle position in 0.1 second in x-axis
   * let maxScrollOffset = this.getMaxScrollOffset();
   * scrollView.scrollToOffset(cc.v2(maxScrollOffset.x / 2, 0), 0.1);
   */
  scrollToOffset: function scrollToOffset(offset, timeInSecond, attenuated) {
    var maxScrollOffset = this.getMaxScrollOffset();
    var anchor = cc.v2(0, 0); //if maxScrollOffset is 0, then always align the content's top left origin to the top left corner of its parent

    if (maxScrollOffset.x === 0) {
      anchor.x = 0;
    } else {
      anchor.x = offset.x / maxScrollOffset.x;
    }

    if (maxScrollOffset.y === 0) {
      anchor.y = 1;
    } else {
      anchor.y = (maxScrollOffset.y - offset.y) / maxScrollOffset.y;
    }

    this.scrollTo(anchor, timeInSecond, attenuated);
  },

  /**
   * !#en  Get the positive offset value corresponds to the content's top left boundary.
   * !#zh  获取滚动视图相对于左上角原点的当前滚动偏移
   * @method getScrollOffset
   * @return {Vec2}  - A Vec2 value indicate the current scroll offset.
   */
  getScrollOffset: function getScrollOffset() {
    var topDelta = this._getContentTopBoundary() - this._topBoundary;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    return cc.v2(leftDeta, topDelta);
  },

  /**
   * !#en Get the maximize available  scroll offset
   * !#zh 获取滚动视图最大可以滚动的偏移量
   * @method getMaxScrollOffset
   * @return {Vec2} - A Vec2 value indicate the maximize scroll offset in x and y axis.
   */
  getMaxScrollOffset: function getMaxScrollOffset() {
    var viewSize = this._view.getContentSize();

    var contentSize = this.content.getContentSize();
    var horizontalMaximizeOffset = contentSize.width - viewSize.width;
    var verticalMaximizeOffset = contentSize.height - viewSize.height;
    horizontalMaximizeOffset = horizontalMaximizeOffset >= 0 ? horizontalMaximizeOffset : 0;
    verticalMaximizeOffset = verticalMaximizeOffset >= 0 ? verticalMaximizeOffset : 0;
    return cc.v2(horizontalMaximizeOffset, verticalMaximizeOffset);
  },

  /**
   * !#en Scroll the content to the horizontal percent position of ScrollView.
   * !#zh 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
   * @method scrollToPercentHorizontal
   * @param {Number} percent - A value between 0 and 1.
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the horizontal percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to middle position.
   * scrollView.scrollToBottomRight(0.5, 0.1);
   */
  scrollToPercentHorizontal: function scrollToPercentHorizontal(percent, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(percent, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the percent position of ScrollView in any direction.
   * !#zh 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
   * @method scrollTo
   * @param {Vec2} anchor - A point which will be clamp between cc.v2(0,0) and cc.v2(1,1).
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Vertical scroll to the bottom of the view.
   * scrollView.scrollTo(cc.v2(0, 1), 0.1);
   *
   * // Horizontal scroll to view right.
   * scrollView.scrollTo(cc.v2(1, 0), 0.1);
   */
  scrollTo: function scrollTo(anchor, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(anchor),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the vertical percent position of ScrollView.
   * !#zh 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
   * @method scrollToPercentVertical
   * @param {Number} percent - A value between 0 and 1.
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the vertical percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * // Scroll to middle position.
   * scrollView.scrollToPercentVertical(0.5, 0.1);
   */
  scrollToPercentVertical: function scrollToPercentVertical(percent, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, percent),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en  Stop auto scroll immediately
   * !#zh  停止自动滚动, 调用此 API 可以让 Scrollview 立即停止滚动
   * @method stopAutoScroll
   */
  stopAutoScroll: function stopAutoScroll() {
    this._autoScrolling = false;
    this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
  },

  /**
   * !#en Modify the content position.
   * !#zh 设置当前视图内容的坐标点。
   * @method setContentPosition
   * @param {Vec2} position - The position in content's parent space.
   */
  setContentPosition: function setContentPosition(position) {
    if (position.fuzzyEquals(this.getContentPosition(), EPSILON)) {
      return;
    }

    this.content.setPosition(position);
    this._outOfBoundaryAmountDirty = true;
  },

  /**
   * !#en Query the content's position in its parent space.
   * !#zh 获取当前视图内容的坐标点。
   * @method getContentPosition
   * @returns {Vec2} - The content's position in its parent space.
   */
  getContentPosition: function getContentPosition() {
    return this.content.getPosition();
  },

  /**
   * !#en Query whether the user is currently dragging the ScrollView to scroll it
   * !#zh 用户是否在拖拽当前滚动视图
   * @method isScrolling
   * @returns {Boolean} - Whether the user is currently dragging the ScrollView to scroll it
   */
  isScrolling: function isScrolling() {
    return this._scrolling;
  },

  /**
   * !#en Query whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
   * !#zh 当前滚动视图是否在惯性滚动
   * @method isAutoScrolling
   * @returns {Boolean} - Whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
   */
  isAutoScrolling: function isAutoScrolling() {
    return this._autoScrolling;
  },
  //private methods
  _registerEvent: function _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
  },
  _unregisterEvent: function _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
  },
  _onMouseWheel: function _onMouseWheel(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var deltaMove = cc.v2(0, 0);
    var wheelPrecision = -0.1; //On the windows platform, the scrolling speed of the mouse wheel of ScrollView on chrome and firebox is different

    if (cc.sys.os === cc.sys.OS_WINDOWS && cc.sys.browserType === cc.sys.BROWSER_TYPE_FIREFOX) {
      wheelPrecision = -0.1 / 3;
    }

    if (CC_JSB || CC_RUNTIME) {
      wheelPrecision = -7;
    }

    if (this.vertical) {
      deltaMove = cc.v2(0, event.getScrollY() * wheelPrecision);
    } else if (this.horizontal) {
      deltaMove = cc.v2(event.getScrollY() * wheelPrecision, 0);
    }

    this._mouseWheelEventElapsedTime = 0;

    this._processDeltaMove(deltaMove);

    if (!this._stopMouseWheel) {
      this._handlePressLogic();

      this.schedule(this._checkMouseWheel, 1.0 / 60);
      this._stopMouseWheel = true;
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _checkMouseWheel: function _checkMouseWheel(dt) {
    var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

    var maxElapsedTime = 0.1;

    if (!currentOutOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._processInertiaScroll();

      this.unschedule(this._checkMouseWheel);

      this._dispatchEvent('scroll-ended');

      this._stopMouseWheel = false;
      return;
    }

    this._mouseWheelEventElapsedTime += dt; // mouse wheel event is ended

    if (this._mouseWheelEventElapsedTime > maxElapsedTime) {
      this._onScrollBarTouchEnded();

      this.unschedule(this._checkMouseWheel);

      this._dispatchEvent('scroll-ended');

      this._stopMouseWheel = false;
    }
  },
  _calculateMovePercentDelta: function _calculateMovePercentDelta(options) {
    var anchor = options.anchor;
    var applyToHorizontal = options.applyToHorizontal;
    var applyToVertical = options.applyToVertical;

    this._calculateBoundary();

    anchor = anchor.clampf(cc.v2(0, 0), cc.v2(1, 1));

    var scrollSize = this._view.getContentSize();

    var contentSize = this.content.getContentSize();

    var bottomDeta = this._getContentBottomBoundary() - this._bottomBoundary;

    bottomDeta = -bottomDeta;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    leftDeta = -leftDeta;
    var moveDelta = cc.v2(0, 0);
    var totalScrollDelta = 0;

    if (applyToHorizontal) {
      totalScrollDelta = contentSize.width - scrollSize.width;
      moveDelta.x = leftDeta - totalScrollDelta * anchor.x;
    }

    if (applyToVertical) {
      totalScrollDelta = contentSize.height - scrollSize.height;
      moveDelta.y = bottomDeta - totalScrollDelta * anchor.y;
    }

    return moveDelta;
  },
  _moveContentToTopLeft: function _moveContentToTopLeft(scrollViewSize) {
    var contentSize = this.content.getContentSize();

    var bottomDeta = this._getContentBottomBoundary() - this._bottomBoundary;

    bottomDeta = -bottomDeta;
    var moveDelta = cc.v2(0, 0);
    var totalScrollDelta = 0;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    leftDeta = -leftDeta;

    if (contentSize.height < scrollViewSize.height) {
      totalScrollDelta = contentSize.height - scrollViewSize.height;
      moveDelta.y = bottomDeta - totalScrollDelta;
    }

    if (contentSize.width < scrollViewSize.width) {
      totalScrollDelta = contentSize.width - scrollViewSize.width;
      moveDelta.x = leftDeta;
    }

    this._updateScrollBarState();

    this._moveContent(moveDelta);

    this._adjustContentOutOfBoundary();
  },
  _calculateBoundary: function _calculateBoundary() {
    if (this.content) {
      //refresh content size
      var layout = this.content.getComponent(cc.Layout);

      if (layout && layout.enabledInHierarchy) {
        layout.updateLayout();
      }

      var viewSize = this._view.getContentSize();

      var anchorX = viewSize.width * this._view.anchorX;
      var anchorY = viewSize.height * this._view.anchorY;
      this._leftBoundary = -anchorX;
      this._bottomBoundary = -anchorY;
      this._rightBoundary = this._leftBoundary + viewSize.width;
      this._topBoundary = this._bottomBoundary + viewSize.height;

      this._moveContentToTopLeft(viewSize);
    }
  },
  //this is for nested scrollview
  _hasNestedViewGroup: function _hasNestedViewGroup(event, captureListeners) {
    if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;

    if (captureListeners) {
      //captureListeners are arranged from child to parent
      for (var i = 0; i < captureListeners.length; ++i) {
        var item = captureListeners[i];

        if (this.node === item) {
          if (event.target.getComponent(cc.ViewGroup)) {
            return true;
          }

          return false;
        }

        if (item.getComponent(cc.ViewGroup)) {
          return true;
        }
      }
    }

    return false;
  },
  //This is for Scrollview as children of a Button
  _stopPropagationIfTargetIsMe: function _stopPropagationIfTargetIsMe(event) {
    if (event.eventPhase === cc.Event.AT_TARGET && event.target === this.node) {
      event.stopPropagation();
    }
  },
  // touch event handler
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var touch = event.touch;

    if (this.content) {
      this._handlePressLogic(touch);
    }

    this._touchMoved = false;

    this._stopPropagationIfTargetIsMe(event);
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var touch = event.touch;

    if (this.content) {
      this._handleMoveLogic(touch);
    } // Do not prevent touch events in inner nodes


    if (!this.cancelInnerEvents) {
      return;
    }

    var deltaMove = touch.getLocation().sub(touch.getStartLocation()); //FIXME: touch move delta should be calculated by DPI.

    if (deltaMove.mag() > 7) {
      if (!this._touchMoved && event.target !== this.node) {
        // Simulate touch cancel for target node
        var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
        cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
        cancelEvent.touch = event.touch;
        cancelEvent.simulate = true;
        event.target.dispatchEvent(cancelEvent);
        this._touchMoved = true;
      }
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _onTouchEnded: function _onTouchEnded(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;

    this._dispatchEvent('touch-up');

    var touch = event.touch;

    if (this.content) {
      this._handleReleaseLogic(touch);
    }

    if (this._touchMoved) {
      event.stopPropagation();
    } else {
      this._stopPropagationIfTargetIsMe(event);
    }
  },
  _onTouchCancelled: function _onTouchCancelled(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return; // Filte touch cancel event send from self

    if (!event.simulate) {
      var touch = event.touch;

      if (this.content) {
        this._handleReleaseLogic(touch);
      }
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _processDeltaMove: function _processDeltaMove(deltaMove) {
    this._scrollChildren(deltaMove);

    this._gatherTouchMove(deltaMove);
  },
  // Contains node angle calculations
  _getLocalAxisAlignDelta: function _getLocalAxisAlignDelta(touch) {
    this.node.convertToNodeSpaceAR(touch.getLocation(), _tempPoint);
    this.node.convertToNodeSpaceAR(touch.getPreviousLocation(), _tempPrevPoint);
    return _tempPoint.sub(_tempPrevPoint);
  },
  _handleMoveLogic: function _handleMoveLogic(touch) {
    var deltaMove = this._getLocalAxisAlignDelta(touch);

    this._processDeltaMove(deltaMove);
  },
  _scrollChildren: function _scrollChildren(deltaMove) {
    deltaMove = this._clampDelta(deltaMove);
    var realMove = deltaMove;
    var outOfBoundary;

    if (this.elastic) {
      outOfBoundary = this._getHowMuchOutOfBoundary();
      realMove.x *= outOfBoundary.x === 0 ? 1 : 0.5;
      realMove.y *= outOfBoundary.y === 0 ? 1 : 0.5;
    }

    if (!this.elastic) {
      outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
      realMove = realMove.add(outOfBoundary);
    }

    var scrollEventType = -1;

    if (realMove.y > 0) {
      //up
      var icBottomPos = this.content.y - this.content.anchorY * this.content.height;

      if (icBottomPos + realMove.y >= this._bottomBoundary) {
        scrollEventType = 'scroll-to-bottom';
      }
    } else if (realMove.y < 0) {
      //down
      var icTopPos = this.content.y - this.content.anchorY * this.content.height + this.content.height;

      if (icTopPos + realMove.y <= this._topBoundary) {
        scrollEventType = 'scroll-to-top';
      }
    }

    if (realMove.x < 0) {
      //left
      var icRightPos = this.content.x - this.content.anchorX * this.content.width + this.content.width;

      if (icRightPos + realMove.x <= this._rightBoundary) {
        scrollEventType = 'scroll-to-right';
      }
    } else if (realMove.x > 0) {
      //right
      var icLeftPos = this.content.x - this.content.anchorX * this.content.width;

      if (icLeftPos + realMove.x >= this._leftBoundary) {
        scrollEventType = 'scroll-to-left';
      }
    }

    this._moveContent(realMove, false);

    if (realMove.x !== 0 || realMove.y !== 0) {
      if (!this._scrolling) {
        this._scrolling = true;

        this._dispatchEvent('scroll-began');
      }

      this._dispatchEvent('scrolling');
    }

    if (scrollEventType !== -1) {
      this._dispatchEvent(scrollEventType);
    }
  },
  _handlePressLogic: function _handlePressLogic() {
    if (this._autoScrolling) {
      this._dispatchEvent('scroll-ended');
    }

    this._autoScrolling = false;
    this._isBouncing = false;
    this._touchMovePreviousTimestamp = getTimeInMilliseconds();
    this._touchMoveDisplacements.length = 0;
    this._touchMoveTimeDeltas.length = 0;

    this._onScrollBarTouchBegan();
  },
  _clampDelta: function _clampDelta(delta) {
    var contentSize = this.content.getContentSize();

    var scrollViewSize = this._view.getContentSize();

    if (contentSize.width < scrollViewSize.width) {
      delta.x = 0;
    }

    if (contentSize.height < scrollViewSize.height) {
      delta.y = 0;
    }

    return delta;
  },
  _gatherTouchMove: function _gatherTouchMove(delta) {
    delta = this._clampDelta(delta);

    while (this._touchMoveDisplacements.length >= NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED) {
      this._touchMoveDisplacements.shift();

      this._touchMoveTimeDeltas.shift();
    }

    this._touchMoveDisplacements.push(delta);

    var timeStamp = getTimeInMilliseconds();

    this._touchMoveTimeDeltas.push((timeStamp - this._touchMovePreviousTimestamp) / 1000);

    this._touchMovePreviousTimestamp = timeStamp;
  },
  _startBounceBackIfNeeded: function _startBounceBackIfNeeded() {
    if (!this.elastic) {
      return false;
    }

    var bounceBackAmount = this._getHowMuchOutOfBoundary();

    bounceBackAmount = this._clampDelta(bounceBackAmount);

    if (bounceBackAmount.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      return false;
    }

    var bounceBackTime = Math.max(this.bounceDuration, 0);

    this._startAutoScroll(bounceBackAmount, bounceBackTime, true);

    if (!this._isBouncing) {
      if (bounceBackAmount.y > 0) this._dispatchEvent('bounce-top');
      if (bounceBackAmount.y < 0) this._dispatchEvent('bounce-bottom');
      if (bounceBackAmount.x > 0) this._dispatchEvent('bounce-right');
      if (bounceBackAmount.x < 0) this._dispatchEvent('bounce-left');
      this._isBouncing = true;
    }

    return true;
  },
  _processInertiaScroll: function _processInertiaScroll() {
    var bounceBackStarted = this._startBounceBackIfNeeded();

    if (!bounceBackStarted && this.inertia) {
      var touchMoveVelocity = this._calculateTouchMoveVelocity();

      if (!touchMoveVelocity.fuzzyEquals(cc.v2(0, 0), EPSILON) && this.brake < 1) {
        this._startInertiaScroll(touchMoveVelocity);
      }
    }

    this._onScrollBarTouchEnded();
  },
  _handleReleaseLogic: function _handleReleaseLogic(touch) {
    var delta = this._getLocalAxisAlignDelta(touch);

    this._gatherTouchMove(delta);

    this._processInertiaScroll();

    if (this._scrolling) {
      this._scrolling = false;

      if (!this._autoScrolling) {
        this._dispatchEvent('scroll-ended');
      }
    }
  },
  _isOutOfBoundary: function _isOutOfBoundary() {
    var outOfBoundary = this._getHowMuchOutOfBoundary();

    return !outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON);
  },
  _isNecessaryAutoScrollBrake: function _isNecessaryAutoScrollBrake() {
    if (this._autoScrollBraking) {
      return true;
    }

    if (this._isOutOfBoundary()) {
      if (!this._autoScrollCurrentlyOutOfBoundary) {
        this._autoScrollCurrentlyOutOfBoundary = true;
        this._autoScrollBraking = true;
        this._autoScrollBrakingStartPosition = this.getContentPosition();
        return true;
      }
    } else {
      this._autoScrollCurrentlyOutOfBoundary = false;
    }

    return false;
  },
  getScrollEndedEventTiming: function getScrollEndedEventTiming() {
    return EPSILON;
  },
  _processAutoScrolling: function _processAutoScrolling(dt) {
    var isAutoScrollBrake = this._isNecessaryAutoScrollBrake();

    var brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
    this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
    var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);

    if (this._autoScrollAttenuate) {
      percentage = quintEaseOut(percentage);
    }

    var newPosition = this._autoScrollStartPosition.add(this._autoScrollTargetDelta.mul(percentage));

    var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
    var fireEvent = Math.abs(percentage - 1) <= this.getScrollEndedEventTiming();

    if (fireEvent && !this._isScrollEndedWithThresholdEventFired) {
      this._dispatchEvent('scroll-ended-with-threshold');

      this._isScrollEndedWithThresholdEventFired = true;
    }

    if (this.elastic) {
      var brakeOffsetPosition = newPosition.sub(this._autoScrollBrakingStartPosition);

      if (isAutoScrollBrake) {
        brakeOffsetPosition = brakeOffsetPosition.mul(brakingFactor);
      }

      newPosition = this._autoScrollBrakingStartPosition.add(brakeOffsetPosition);
    } else {
      var moveDelta = newPosition.sub(this.getContentPosition());

      var outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);

      if (!outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
        newPosition = newPosition.add(outOfBoundary);
        reachedEnd = true;
      }
    }

    if (reachedEnd) {
      this._autoScrolling = false;
    }

    var deltaMove = newPosition.sub(this.getContentPosition());

    this._moveContent(this._clampDelta(deltaMove), reachedEnd);

    this._dispatchEvent('scrolling'); // scollTo API controll move


    if (!this._autoScrolling) {
      this._isBouncing = false;
      this._scrolling = false;

      this._dispatchEvent('scroll-ended');
    }
  },
  _startInertiaScroll: function _startInertiaScroll(touchMoveVelocity) {
    var inertiaTotalMovement = touchMoveVelocity.mul(MOVEMENT_FACTOR);

    this._startAttenuatingAutoScroll(inertiaTotalMovement, touchMoveVelocity);
  },
  _calculateAttenuatedFactor: function _calculateAttenuatedFactor(distance) {
    if (this.brake <= 0) {
      return 1 - this.brake;
    } //attenuate formula from: http://learnopengl.com/#!Lighting/Light-casters


    return (1 - this.brake) * (1 / (1 + distance * 0.000014 + distance * distance * 0.000000008));
  },
  _startAttenuatingAutoScroll: function _startAttenuatingAutoScroll(deltaMove, initialVelocity) {
    var time = this._calculateAutoScrollTimeByInitalSpeed(initialVelocity.mag());

    var targetDelta = deltaMove.normalize();
    var contentSize = this.content.getContentSize();

    var scrollviewSize = this._view.getContentSize();

    var totalMoveWidth = contentSize.width - scrollviewSize.width;
    var totalMoveHeight = contentSize.height - scrollviewSize.height;

    var attenuatedFactorX = this._calculateAttenuatedFactor(totalMoveWidth);

    var attenuatedFactorY = this._calculateAttenuatedFactor(totalMoveHeight);

    targetDelta = cc.v2(targetDelta.x * totalMoveWidth * (1 - this.brake) * attenuatedFactorX, targetDelta.y * totalMoveHeight * attenuatedFactorY * (1 - this.brake));
    var originalMoveLength = deltaMove.mag();
    var factor = targetDelta.mag() / originalMoveLength;
    targetDelta = targetDelta.add(deltaMove);

    if (this.brake > 0 && factor > 7) {
      factor = Math.sqrt(factor);
      targetDelta = deltaMove.mul(factor).add(deltaMove);
    }

    if (this.brake > 0 && factor > 3) {
      factor = 3;
      time = time * factor;
    }

    if (this.brake === 0 && factor > 1) {
      time = time * factor;
    }

    this._startAutoScroll(targetDelta, time, true);
  },
  _calculateAutoScrollTimeByInitalSpeed: function _calculateAutoScrollTimeByInitalSpeed(initalSpeed) {
    return Math.sqrt(Math.sqrt(initalSpeed / 5));
  },
  _startAutoScroll: function _startAutoScroll(deltaMove, timeInSecond, attenuated) {
    var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);

    this._autoScrolling = true;
    this._autoScrollTargetDelta = adjustedDeltaMove;
    this._autoScrollAttenuate = attenuated;
    this._autoScrollStartPosition = this.getContentPosition();
    this._autoScrollTotalTime = timeInSecond;
    this._autoScrollAccumulatedTime = 0;
    this._autoScrollBraking = false;
    this._isScrollEndedWithThresholdEventFired = false;
    this._autoScrollBrakingStartPosition = cc.v2(0, 0);

    var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

    if (!currentOutOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._autoScrollCurrentlyOutOfBoundary = true;
    }
  },
  _calculateTouchMoveVelocity: function _calculateTouchMoveVelocity() {
    var totalTime = 0;
    totalTime = this._touchMoveTimeDeltas.reduce(function (a, b) {
      return a + b;
    }, totalTime);

    if (totalTime <= 0 || totalTime >= 0.5) {
      return cc.v2(0, 0);
    }

    var totalMovement = cc.v2(0, 0);
    totalMovement = this._touchMoveDisplacements.reduce(function (a, b) {
      return a.add(b);
    }, totalMovement);
    return cc.v2(totalMovement.x * (1 - this.brake) / totalTime, totalMovement.y * (1 - this.brake) / totalTime);
  },
  _flattenVectorByDirection: function _flattenVectorByDirection(vector) {
    var result = vector;
    result.x = this.horizontal ? result.x : 0;
    result.y = this.vertical ? result.y : 0;
    return result;
  },
  _moveContent: function _moveContent(deltaMove, canStartBounceBack) {
    var adjustedMove = this._flattenVectorByDirection(deltaMove);

    var newPosition = this.getContentPosition().add(adjustedMove);
    this.setContentPosition(newPosition);

    var outOfBoundary = this._getHowMuchOutOfBoundary();

    this._updateScrollBar(outOfBoundary);

    if (this.elastic && canStartBounceBack) {
      this._startBounceBackIfNeeded();
    }
  },
  _getContentLeftBoundary: function _getContentLeftBoundary() {
    var contentPos = this.getContentPosition();
    return contentPos.x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
  },
  _getContentRightBoundary: function _getContentRightBoundary() {
    var contentSize = this.content.getContentSize();
    return this._getContentLeftBoundary() + contentSize.width;
  },
  _getContentTopBoundary: function _getContentTopBoundary() {
    var contentSize = this.content.getContentSize();
    return this._getContentBottomBoundary() + contentSize.height;
  },
  _getContentBottomBoundary: function _getContentBottomBoundary() {
    var contentPos = this.getContentPosition();
    return contentPos.y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
  },
  _getHowMuchOutOfBoundary: function _getHowMuchOutOfBoundary(addition) {
    addition = addition || cc.v2(0, 0);

    if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON) && !this._outOfBoundaryAmountDirty) {
      return this._outOfBoundaryAmount;
    }

    var outOfBoundaryAmount = cc.v2(0, 0);

    if (this._getContentLeftBoundary() + addition.x > this._leftBoundary) {
      outOfBoundaryAmount.x = this._leftBoundary - (this._getContentLeftBoundary() + addition.x);
    } else if (this._getContentRightBoundary() + addition.x < this._rightBoundary) {
      outOfBoundaryAmount.x = this._rightBoundary - (this._getContentRightBoundary() + addition.x);
    }

    if (this._getContentTopBoundary() + addition.y < this._topBoundary) {
      outOfBoundaryAmount.y = this._topBoundary - (this._getContentTopBoundary() + addition.y);
    } else if (this._getContentBottomBoundary() + addition.y > this._bottomBoundary) {
      outOfBoundaryAmount.y = this._bottomBoundary - (this._getContentBottomBoundary() + addition.y);
    }

    if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._outOfBoundaryAmount = outOfBoundaryAmount;
      this._outOfBoundaryAmountDirty = false;
    }

    outOfBoundaryAmount = this._clampDelta(outOfBoundaryAmount);
    return outOfBoundaryAmount;
  },
  _updateScrollBarState: function _updateScrollBarState() {
    if (!this.content) {
      return;
    }

    var contentSize = this.content.getContentSize();

    var scrollViewSize = this._view.getContentSize();

    if (this.verticalScrollBar) {
      if (contentSize.height < scrollViewSize.height) {
        this.verticalScrollBar.hide();
      } else {
        this.verticalScrollBar.show();
      }
    }

    if (this.horizontalScrollBar) {
      if (contentSize.width < scrollViewSize.width) {
        this.horizontalScrollBar.hide();
      } else {
        this.horizontalScrollBar.show();
      }
    }
  },
  _updateScrollBar: function _updateScrollBar(outOfBoundary) {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onScroll(outOfBoundary);
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onScroll(outOfBoundary);
    }
  },
  _onScrollBarTouchBegan: function _onScrollBarTouchBegan() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onTouchBegan();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onTouchBegan();
    }
  },
  _onScrollBarTouchEnded: function _onScrollBarTouchEnded() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onTouchEnded();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onTouchEnded();
    }
  },
  _dispatchEvent: function _dispatchEvent(event) {
    if (event === 'scroll-ended') {
      this._scrollEventEmitMask = 0;
    } else if (event === 'scroll-to-top' || event === 'scroll-to-bottom' || event === 'scroll-to-left' || event === 'scroll-to-right') {
      var flag = 1 << eventMap[event];

      if (this._scrollEventEmitMask & flag) {
        return;
      } else {
        this._scrollEventEmitMask |= flag;
      }
    }

    cc.Component.EventHandler.emitEvents(this.scrollEvents, this, eventMap[event]);
    this.node.emit(event, this);
  },
  _adjustContentOutOfBoundary: function _adjustContentOutOfBoundary() {
    this._outOfBoundaryAmountDirty = true;

    if (this._isOutOfBoundary()) {
      var outOfBoundary = this._getHowMuchOutOfBoundary(cc.v2(0, 0));

      var newPosition = this.getContentPosition().add(outOfBoundary);

      if (this.content) {
        this.content.setPosition(newPosition);

        this._updateScrollBar(0);
      }
    }
  },
  start: function start() {
    this._calculateBoundary(); //Because widget component will adjust content position and scrollview position is correct after visit
    //So this event could make sure the content is on the correct position after loading.


    if (this.content) {
      cc.director.once(cc.Director.EVENT_BEFORE_DRAW, this._adjustContentOutOfBoundary, this);
    }
  },
  _hideScrollbar: function _hideScrollbar() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar.hide();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar.hide();
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR) {
      this._unregisterEvent();

      if (this.content) {
        this.content.off(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        this.content.off(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

        if (this._view) {
          this._view.off(NodeEvent.POSITION_CHANGED, this._calculateBoundary, this);

          this._view.off(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

          this._view.off(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        }
      }
    }

    this._hideScrollbar();

    this.stopAutoScroll();
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR) {
      this._registerEvent();

      if (this.content) {
        this.content.on(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        this.content.on(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

        if (this._view) {
          this._view.on(NodeEvent.POSITION_CHANGED, this._calculateBoundary, this);

          this._view.on(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

          this._view.on(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        }
      }
    }

    this._updateScrollBarState();
  },
  update: function update(dt) {
    if (this._autoScrolling) {
      this._processAutoScrolling(dt);
    }
  }
});
cc.ScrollView = module.exports = ScrollView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-top
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-bottom
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-left
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-right
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scrolling
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-bottom
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-top
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-left
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-right
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-ended
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event touch-up
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
* !#en
* Note: This event is emitted from the node to which the component belongs.
* !#zh
* 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
* @event scroll-began
* @param {Event.EventCustom} event
* @param {ScrollView} scrollView - The ScrollView component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDU2Nyb2xsVmlldy5qcyJdLCJuYW1lcyI6WyJOb2RlRXZlbnQiLCJyZXF1aXJlIiwiRXZlbnRUeXBlIiwiTlVNQkVSX09GX0dBVEhFUkVEX1RPVUNIRVNfRk9SX01PVkVfU1BFRUQiLCJPVVRfT0ZfQk9VTkRBUllfQlJFQUtJTkdfRkFDVE9SIiwiRVBTSUxPTiIsIk1PVkVNRU5UX0ZBQ1RPUiIsIl90ZW1wUG9pbnQiLCJjYyIsInYyIiwiX3RlbXBQcmV2UG9pbnQiLCJxdWludEVhc2VPdXQiLCJ0aW1lIiwiZ2V0VGltZUluTWlsbGlzZWNvbmRzIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiZ2V0TWlsbGlzZWNvbmRzIiwiRW51bSIsIlNDUk9MTF9UT19UT1AiLCJTQ1JPTExfVE9fQk9UVE9NIiwiU0NST0xMX1RPX0xFRlQiLCJTQ1JPTExfVE9fUklHSFQiLCJTQ1JPTExJTkciLCJCT1VOQ0VfVE9QIiwiQk9VTkNFX0JPVFRPTSIsIkJPVU5DRV9MRUZUIiwiQk9VTkNFX1JJR0hUIiwiU0NST0xMX0VOREVEIiwiVE9VQ0hfVVAiLCJBVVRPU0NST0xMX0VOREVEX1dJVEhfVEhSRVNIT0xEIiwiU0NST0xMX0JFR0FOIiwiZXZlbnRNYXAiLCJTY3JvbGxWaWV3IiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsImN0b3IiLCJfdG9wQm91bmRhcnkiLCJfYm90dG9tQm91bmRhcnkiLCJfbGVmdEJvdW5kYXJ5IiwiX3JpZ2h0Qm91bmRhcnkiLCJfdG91Y2hNb3ZlRGlzcGxhY2VtZW50cyIsIl90b3VjaE1vdmVUaW1lRGVsdGFzIiwiX3RvdWNoTW92ZVByZXZpb3VzVGltZXN0YW1wIiwiX3RvdWNoTW92ZWQiLCJfYXV0b1Njcm9sbGluZyIsIl9hdXRvU2Nyb2xsQXR0ZW51YXRlIiwiX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uIiwiX2F1dG9TY3JvbGxUYXJnZXREZWx0YSIsIl9hdXRvU2Nyb2xsVG90YWxUaW1lIiwiX2F1dG9TY3JvbGxBY2N1bXVsYXRlZFRpbWUiLCJfYXV0b1Njcm9sbEN1cnJlbnRseU91dE9mQm91bmRhcnkiLCJfYXV0b1Njcm9sbEJyYWtpbmciLCJfYXV0b1Njcm9sbEJyYWtpbmdTdGFydFBvc2l0aW9uIiwiX291dE9mQm91bmRhcnlBbW91bnQiLCJfb3V0T2ZCb3VuZGFyeUFtb3VudERpcnR5IiwiX3N0b3BNb3VzZVdoZWVsIiwiX21vdXNlV2hlZWxFdmVudEVsYXBzZWRUaW1lIiwiX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCIsIl9zY3JvbGxFdmVudEVtaXRNYXNrIiwiX2lzQm91bmNpbmciLCJfc2Nyb2xsaW5nIiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJ0eXBlIiwiTm9kZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJmb3JtZXJseVNlcmlhbGl6ZWRBcyIsIm5vdGlmeSIsIm9sZFZhbHVlIiwiX2NhbGN1bGF0ZUJvdW5kYXJ5IiwiaG9yaXpvbnRhbCIsImFuaW1hdGFibGUiLCJ2ZXJ0aWNhbCIsImluZXJ0aWEiLCJicmFrZSIsIkZsb2F0IiwicmFuZ2UiLCJlbGFzdGljIiwiYm91bmNlRHVyYXRpb24iLCJob3Jpem9udGFsU2Nyb2xsQmFyIiwiU2Nyb2xsYmFyIiwic2V0VGFyZ2V0U2Nyb2xsVmlldyIsIl91cGRhdGVTY3JvbGxCYXIiLCJ2ZXJ0aWNhbFNjcm9sbEJhciIsInNjcm9sbEV2ZW50cyIsIkNvbXBvbmVudCIsIkV2ZW50SGFuZGxlciIsImNhbmNlbElubmVyRXZlbnRzIiwiX3ZpZXciLCJnZXQiLCJwYXJlbnQiLCJzdGF0aWNzIiwic2Nyb2xsVG9Cb3R0b20iLCJ0aW1lSW5TZWNvbmQiLCJhdHRlbnVhdGVkIiwibW92ZURlbHRhIiwiX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEiLCJhbmNob3IiLCJhcHBseVRvSG9yaXpvbnRhbCIsImFwcGx5VG9WZXJ0aWNhbCIsIl9zdGFydEF1dG9TY3JvbGwiLCJfbW92ZUNvbnRlbnQiLCJzY3JvbGxUb1RvcCIsInNjcm9sbFRvTGVmdCIsInNjcm9sbFRvUmlnaHQiLCJzY3JvbGxUb1RvcExlZnQiLCJzY3JvbGxUb1RvcFJpZ2h0Iiwic2Nyb2xsVG9Cb3R0b21MZWZ0Iiwic2Nyb2xsVG9Cb3R0b21SaWdodCIsInNjcm9sbFRvT2Zmc2V0Iiwib2Zmc2V0IiwibWF4U2Nyb2xsT2Zmc2V0IiwiZ2V0TWF4U2Nyb2xsT2Zmc2V0IiwieCIsInkiLCJzY3JvbGxUbyIsImdldFNjcm9sbE9mZnNldCIsInRvcERlbHRhIiwiX2dldENvbnRlbnRUb3BCb3VuZGFyeSIsImxlZnREZXRhIiwiX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkiLCJ2aWV3U2l6ZSIsImdldENvbnRlbnRTaXplIiwiY29udGVudFNpemUiLCJob3Jpem9udGFsTWF4aW1pemVPZmZzZXQiLCJ3aWR0aCIsInZlcnRpY2FsTWF4aW1pemVPZmZzZXQiLCJoZWlnaHQiLCJzY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsIiwicGVyY2VudCIsInNjcm9sbFRvUGVyY2VudFZlcnRpY2FsIiwic3RvcEF1dG9TY3JvbGwiLCJzZXRDb250ZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImZ1enp5RXF1YWxzIiwiZ2V0Q29udGVudFBvc2l0aW9uIiwic2V0UG9zaXRpb24iLCJnZXRQb3NpdGlvbiIsImlzU2Nyb2xsaW5nIiwiaXNBdXRvU2Nyb2xsaW5nIiwiX3JlZ2lzdGVyRXZlbnQiLCJub2RlIiwib24iLCJUT1VDSF9TVEFSVCIsIl9vblRvdWNoQmVnYW4iLCJUT1VDSF9NT1ZFIiwiX29uVG91Y2hNb3ZlZCIsIlRPVUNIX0VORCIsIl9vblRvdWNoRW5kZWQiLCJUT1VDSF9DQU5DRUwiLCJfb25Ub3VjaENhbmNlbGxlZCIsIk1PVVNFX1dIRUVMIiwiX29uTW91c2VXaGVlbCIsIl91bnJlZ2lzdGVyRXZlbnQiLCJvZmYiLCJldmVudCIsImNhcHR1cmVMaXN0ZW5lcnMiLCJlbmFibGVkSW5IaWVyYXJjaHkiLCJfaGFzTmVzdGVkVmlld0dyb3VwIiwiZGVsdGFNb3ZlIiwid2hlZWxQcmVjaXNpb24iLCJzeXMiLCJvcyIsIk9TX1dJTkRPV1MiLCJicm93c2VyVHlwZSIsIkJST1dTRVJfVFlQRV9GSVJFRk9YIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImdldFNjcm9sbFkiLCJfcHJvY2Vzc0RlbHRhTW92ZSIsIl9oYW5kbGVQcmVzc0xvZ2ljIiwic2NoZWR1bGUiLCJfY2hlY2tNb3VzZVdoZWVsIiwiX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZSIsImR0IiwiY3VycmVudE91dE9mQm91bmRhcnkiLCJfZ2V0SG93TXVjaE91dE9mQm91bmRhcnkiLCJtYXhFbGFwc2VkVGltZSIsIl9wcm9jZXNzSW5lcnRpYVNjcm9sbCIsInVuc2NoZWR1bGUiLCJfZGlzcGF0Y2hFdmVudCIsIl9vblNjcm9sbEJhclRvdWNoRW5kZWQiLCJvcHRpb25zIiwiY2xhbXBmIiwic2Nyb2xsU2l6ZSIsImJvdHRvbURldGEiLCJfZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5IiwidG90YWxTY3JvbGxEZWx0YSIsIl9tb3ZlQ29udGVudFRvVG9wTGVmdCIsInNjcm9sbFZpZXdTaXplIiwiX3VwZGF0ZVNjcm9sbEJhclN0YXRlIiwiX2FkanVzdENvbnRlbnRPdXRPZkJvdW5kYXJ5IiwibGF5b3V0IiwiZ2V0Q29tcG9uZW50IiwiTGF5b3V0IiwidXBkYXRlTGF5b3V0IiwiYW5jaG9yWCIsImFuY2hvclkiLCJldmVudFBoYXNlIiwiRXZlbnQiLCJDQVBUVVJJTkdfUEhBU0UiLCJpIiwibGVuZ3RoIiwiaXRlbSIsInRhcmdldCIsIlZpZXdHcm91cCIsIkFUX1RBUkdFVCIsInN0b3BQcm9wYWdhdGlvbiIsInRvdWNoIiwiX2hhbmRsZU1vdmVMb2dpYyIsImdldExvY2F0aW9uIiwic3ViIiwiZ2V0U3RhcnRMb2NhdGlvbiIsIm1hZyIsImNhbmNlbEV2ZW50IiwiRXZlbnRUb3VjaCIsImdldFRvdWNoZXMiLCJidWJibGVzIiwic2ltdWxhdGUiLCJkaXNwYXRjaEV2ZW50IiwiX2hhbmRsZVJlbGVhc2VMb2dpYyIsIl9zY3JvbGxDaGlsZHJlbiIsIl9nYXRoZXJUb3VjaE1vdmUiLCJfZ2V0TG9jYWxBeGlzQWxpZ25EZWx0YSIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwiZ2V0UHJldmlvdXNMb2NhdGlvbiIsIl9jbGFtcERlbHRhIiwicmVhbE1vdmUiLCJvdXRPZkJvdW5kYXJ5IiwiYWRkIiwic2Nyb2xsRXZlbnRUeXBlIiwiaWNCb3R0b21Qb3MiLCJpY1RvcFBvcyIsImljUmlnaHRQb3MiLCJpY0xlZnRQb3MiLCJfb25TY3JvbGxCYXJUb3VjaEJlZ2FuIiwiZGVsdGEiLCJzaGlmdCIsInB1c2giLCJ0aW1lU3RhbXAiLCJfc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQiLCJib3VuY2VCYWNrQW1vdW50IiwiYm91bmNlQmFja1RpbWUiLCJNYXRoIiwibWF4IiwiYm91bmNlQmFja1N0YXJ0ZWQiLCJ0b3VjaE1vdmVWZWxvY2l0eSIsIl9jYWxjdWxhdGVUb3VjaE1vdmVWZWxvY2l0eSIsIl9zdGFydEluZXJ0aWFTY3JvbGwiLCJfaXNPdXRPZkJvdW5kYXJ5IiwiX2lzTmVjZXNzYXJ5QXV0b1Njcm9sbEJyYWtlIiwiZ2V0U2Nyb2xsRW5kZWRFdmVudFRpbWluZyIsIl9wcm9jZXNzQXV0b1Njcm9sbGluZyIsImlzQXV0b1Njcm9sbEJyYWtlIiwiYnJha2luZ0ZhY3RvciIsInBlcmNlbnRhZ2UiLCJtaW4iLCJuZXdQb3NpdGlvbiIsIm11bCIsInJlYWNoZWRFbmQiLCJhYnMiLCJmaXJlRXZlbnQiLCJicmFrZU9mZnNldFBvc2l0aW9uIiwiaW5lcnRpYVRvdGFsTW92ZW1lbnQiLCJfc3RhcnRBdHRlbnVhdGluZ0F1dG9TY3JvbGwiLCJfY2FsY3VsYXRlQXR0ZW51YXRlZEZhY3RvciIsImRpc3RhbmNlIiwiaW5pdGlhbFZlbG9jaXR5IiwiX2NhbGN1bGF0ZUF1dG9TY3JvbGxUaW1lQnlJbml0YWxTcGVlZCIsInRhcmdldERlbHRhIiwibm9ybWFsaXplIiwic2Nyb2xsdmlld1NpemUiLCJ0b3RhbE1vdmVXaWR0aCIsInRvdGFsTW92ZUhlaWdodCIsImF0dGVudWF0ZWRGYWN0b3JYIiwiYXR0ZW51YXRlZEZhY3RvclkiLCJvcmlnaW5hbE1vdmVMZW5ndGgiLCJmYWN0b3IiLCJzcXJ0IiwiaW5pdGFsU3BlZWQiLCJhZGp1c3RlZERlbHRhTW92ZSIsIl9mbGF0dGVuVmVjdG9yQnlEaXJlY3Rpb24iLCJ0b3RhbFRpbWUiLCJyZWR1Y2UiLCJhIiwiYiIsInRvdGFsTW92ZW1lbnQiLCJ2ZWN0b3IiLCJyZXN1bHQiLCJjYW5TdGFydEJvdW5jZUJhY2siLCJhZGp1c3RlZE1vdmUiLCJjb250ZW50UG9zIiwiZ2V0QW5jaG9yUG9pbnQiLCJfZ2V0Q29udGVudFJpZ2h0Qm91bmRhcnkiLCJhZGRpdGlvbiIsIm91dE9mQm91bmRhcnlBbW91bnQiLCJoaWRlIiwic2hvdyIsIl9vblNjcm9sbCIsImZsYWciLCJlbWl0RXZlbnRzIiwiZW1pdCIsInN0YXJ0IiwiZGlyZWN0b3IiLCJvbmNlIiwiRGlyZWN0b3IiLCJFVkVOVF9CRUZPUkVfRFJBVyIsIl9oaWRlU2Nyb2xsYmFyIiwib25EaXNhYmxlIiwiU0laRV9DSEFOR0VEIiwiU0NBTEVfQ0hBTkdFRCIsIlBPU0lUSU9OX0NIQU5HRUQiLCJvbkVuYWJsZSIsInVwZGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBUCxDQUFxQkMsU0FBdkM7O0FBRUEsSUFBTUMseUNBQXlDLEdBQUcsQ0FBbEQ7QUFDQSxJQUFNQywrQkFBK0IsR0FBRyxJQUF4QztB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgTm9kZUV2ZW50ID0gcmVxdWlyZSgnLi4vQ0NOb2RlJykuRXZlbnRUeXBlO1xyXG5cclxuY29uc3QgTlVNQkVSX09GX0dBVEhFUkVEX1RPVUNIRVNfRk9SX01PVkVfU1BFRUQgPSA1O1xyXG5jb25zdCBPVVRfT0ZfQk9VTkRBUllfQlJFQUtJTkdfRkFDVE9SID0gMC4wNTtcclxuY29uc3QgRVBTSUxPTiA9IDFlLTQ7XHJcbmNvbnN0IE1PVkVNRU5UX0ZBQ1RPUiA9IDAuNztcclxuXHJcbmxldCBfdGVtcFBvaW50ID0gY2MudjIoKTtcclxubGV0IF90ZW1wUHJldlBvaW50ID0gY2MudjIoKTtcclxuXHJcbmxldCBxdWludEVhc2VPdXQgPSBmdW5jdGlvbih0aW1lKSB7XHJcbiAgICB0aW1lIC09IDE7XHJcbiAgICByZXR1cm4gKHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lICsgMSk7XHJcbn07XHJcblxyXG5sZXQgZ2V0VGltZUluTWlsbGlzZWNvbmRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRUaW1lLmdldE1pbGxpc2Vjb25kcygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgU2Nyb2xsVmlldyBldmVudCB0eXBlLlxyXG4gKiAhI3poIOa7muWKqOinhuWbvuS6i+S7tuexu+Wei1xyXG4gKiBAZW51bSBTY3JvbGxWaWV3LkV2ZW50VHlwZVxyXG4gKi9cclxuY29uc3QgRXZlbnRUeXBlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgdG8gdGhlIHRvcCBib3VuZGFyeSBvZiBpbm5lciBjb250YWluZXJcclxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5Yiw6aG26YOo6L6555WM5LqL5Lu2XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX1RPX1RPUFxyXG4gICAgICovXHJcbiAgICBTQ1JPTExfVE9fVE9QIDogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgYm90dG9tIGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lclxyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlupXpg6jovrnnlYzkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ1JPTExfVE9fQk9UVE9NXHJcbiAgICAgKi9cclxuICAgIFNDUk9MTF9UT19CT1RUT00gOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgc2Nyb2xsIHRvIHRoZSBsZWZ0IGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lclxyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlt6bovrnnlYzkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ1JPTExfVE9fTEVGVFxyXG4gICAgICovXHJcbiAgICBTQ1JPTExfVE9fTEVGVCA6IDIsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgdG8gdGhlIHJpZ2h0IGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lclxyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlj7PovrnnlYzkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ1JPTExfVE9fUklHSFRcclxuICAgICAqL1xyXG4gICAgU0NST0xMX1RPX1JJR0hUIDogMyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IGlzIHNjcm9sbGluZ1xyXG4gICAgICogISN6aCDmu5rliqjop4blm77mraPlnKjmu5rliqjml7blj5Hlh7rnmoTkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ1JPTExJTkdcclxuICAgICAqL1xyXG4gICAgU0NST0xMSU5HIDogNCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgdG9wIGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lciBhbmQgc3RhcnQgYm91bmNlXHJcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvua7muWKqOWIsOmhtumDqOi+ueeVjOW5tuS4lOW8gOWni+WbnuW8ueaXtuWPkeWHuueahOS6i+S7tlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJPVU5DRV9UT1BcclxuICAgICAqL1xyXG4gICAgQk9VTkNFX1RPUCA6IDUsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgdG8gdGhlIGJvdHRvbSBib3VuZGFyeSBvZiBpbm5lciBjb250YWluZXIgYW5kIHN0YXJ0IGJvdW5jZVxyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlupXpg6jovrnnlYzlubbkuJTlvIDlp4vlm57lvLnml7blj5Hlh7rnmoTkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1VOQ0VfQk9UVE9NXHJcbiAgICAgKi9cclxuICAgIEJPVU5DRV9CT1RUT00gOiA2LFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgc2Nyb2xsIHRvIHRoZSBsZWZ0IGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lciBhbmQgc3RhcnQgYm91bmNlXHJcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvua7muWKqOWIsOW3pui+ueeVjOW5tuS4lOW8gOWni+WbnuW8ueaXtuWPkeWHuueahOS6i+S7tlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJPVU5DRV9MRUZUXHJcbiAgICAgKi9cclxuICAgIEJPVU5DRV9MRUZUIDogNyxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgcmlnaHQgYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyIGFuZCBzdGFydCBib3VuY2VcclxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5Yiw5Y+z6L6555WM5bm25LiU5byA5aeL5Zue5by55pe25Y+R5Ye655qE5LqL5Lu2XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQk9VTkNFX1JJR0hUXHJcbiAgICAgKi9cclxuICAgIEJPVU5DRV9SSUdIVCA6IDgsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBhdXRvIHNjcm9sbCBlbmRlZFxyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjnu5PmnZ/nmoTml7blgJnlj5Hlh7rnmoTkuovku7ZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ1JPTExfRU5ERURcclxuICAgICAqL1xyXG4gICAgU0NST0xMX0VOREVEIDogOSxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiB1c2VyIHJlbGVhc2UgdGhlIHRvdWNoXHJcbiAgICAgKiAhI3poIOW9k+eUqOaIt+advuaJi+eahOaXtuWAmeS8muWPkeWHuuS4gOS4quS6i+S7tlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRPVUNIX1VQXHJcbiAgICAgKi9cclxuICAgIFRPVUNIX1VQIDogMTAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBhdXRvIHNjcm9sbCBlbmRlZCB3aXRoIGEgdGhyZXNob2xkXHJcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvuiHquWKqOa7muWKqOW/q+imgee7k+adn+eahOaXtuWAmeWPkeWHuueahOS6i+S7tlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFVVE9TQ1JPTExfRU5ERURfV0lUSF9USFJFU0hPTERcclxuICAgICAqL1xyXG4gICAgQVVUT1NDUk9MTF9FTkRFRF9XSVRIX1RIUkVTSE9MRDogMTEsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgYmVnYW5cclxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5byA5aeL5pe25Y+R5Ye655qE5LqL5Lu2XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX0JFR0FOXHJcbiAgICAgKi9cclxuICAgIFNDUk9MTF9CRUdBTjogMTJcclxufSk7XHJcblxyXG5jb25zdCBldmVudE1hcCA9IHtcclxuICAgICdzY3JvbGwtdG8tdG9wJyA6IEV2ZW50VHlwZS5TQ1JPTExfVE9fVE9QLFxyXG4gICAgJ3Njcm9sbC10by1ib3R0b20nOiBFdmVudFR5cGUuU0NST0xMX1RPX0JPVFRPTSxcclxuICAgICdzY3JvbGwtdG8tbGVmdCcgOiBFdmVudFR5cGUuU0NST0xMX1RPX0xFRlQsXHJcbiAgICAnc2Nyb2xsLXRvLXJpZ2h0JyA6IEV2ZW50VHlwZS5TQ1JPTExfVE9fUklHSFQsXHJcbiAgICAnc2Nyb2xsaW5nJyA6IEV2ZW50VHlwZS5TQ1JPTExJTkcsXHJcbiAgICAnYm91bmNlLWJvdHRvbScgOiBFdmVudFR5cGUuQk9VTkNFX0JPVFRPTSxcclxuICAgICdib3VuY2UtbGVmdCcgOiBFdmVudFR5cGUuQk9VTkNFX0xFRlQsXHJcbiAgICAnYm91bmNlLXJpZ2h0JyA6IEV2ZW50VHlwZS5CT1VOQ0VfUklHSFQsXHJcbiAgICAnYm91bmNlLXRvcCcgOiBFdmVudFR5cGUuQk9VTkNFX1RPUCxcclxuICAgICdzY3JvbGwtZW5kZWQnOiBFdmVudFR5cGUuU0NST0xMX0VOREVELFxyXG4gICAgJ3RvdWNoLXVwJyA6IEV2ZW50VHlwZS5UT1VDSF9VUCxcclxuICAgICdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnIDogRXZlbnRUeXBlLkFVVE9TQ1JPTExfRU5ERURfV0lUSF9USFJFU0hPTEQsXHJcbiAgICAnc2Nyb2xsLWJlZ2FuJzogRXZlbnRUeXBlLlNDUk9MTF9CRUdBTlxyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTGF5b3V0IGNvbnRhaW5lciBmb3IgYSB2aWV3IGhpZXJhcmNoeSB0aGF0IGNhbiBiZSBzY3JvbGxlZCBieSB0aGUgdXNlcixcclxuICogYWxsb3dpbmcgaXQgdG8gYmUgbGFyZ2VyIHRoYW4gdGhlIHBoeXNpY2FsIGRpc3BsYXkuXHJcbiAqXHJcbiAqICEjemhcclxuICog5rua5Yqo6KeG5Zu+57uE5Lu2XHJcbiAqIEBjbGFzcyBTY3JvbGxWaWV3XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxubGV0IFNjcm9sbFZpZXcgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuU2Nyb2xsVmlldycsXHJcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDVmlld0dyb3VwJyksXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvU2Nyb2xsVmlldycsXHJcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLnNjcm9sbHZpZXcnLFxyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2Nyb2xsdmlldy5qcycsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IGZhbHNlLFxyXG4gICAgfSxcclxuXHJcbiAgICBjdG9yICgpIHtcclxuICAgICAgICB0aGlzLl90b3BCb3VuZGFyeSA9IDA7XHJcbiAgICAgICAgdGhpcy5fYm90dG9tQm91bmRhcnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xlZnRCb3VuZGFyeSA9IDA7XHJcbiAgICAgICAgdGhpcy5fcmlnaHRCb3VuZGFyeSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMgPSBbXTtcclxuICAgICAgICB0aGlzLl90b3VjaE1vdmVUaW1lRGVsdGFzID0gW107XHJcbiAgICAgICAgdGhpcy5fdG91Y2hNb3ZlUHJldmlvdXNUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxBdHRlbnVhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUYXJnZXREZWx0YSA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUb3RhbFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxBY2N1bXVsYXRlZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEJyYWtpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24gPSBjYy52MigwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fb3V0T2ZCb3VuZGFyeUFtb3VudCA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fc3RvcE1vdXNlV2hlZWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZlbnRFbGFwc2VkVGltZSA9IDAuMDtcclxuICAgICAgICB0aGlzLl9pc1Njcm9sbEVuZGVkV2l0aFRocmVzaG9sZEV2ZW50RmlyZWQgPSBmYWxzZTtcclxuICAgICAgICAvL3VzZSBiaXQgd2lzZSBvcGVyYXRpb25zIHRvIGluZGljYXRlIHRoZSBkaXJlY3Rpb25cclxuICAgICAgICB0aGlzLl9zY3JvbGxFdmVudEVtaXRNYXNrID0gMDtcclxuICAgICAgICB0aGlzLl9pc0JvdW5jaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoaXMgaXMgYSByZWZlcmVuY2UgdG8gdGhlIFVJIGVsZW1lbnQgdG8gYmUgc2Nyb2xsZWQuXHJcbiAgICAgICAgICogISN6aCDlj6/mu5rliqjlsZXnpLrlhoXlrrnnmoToioLngrnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge05vZGV9IGNvbnRlbnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zY3JvbGx2aWV3LmNvbnRlbnQnLFxyXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ2NvbnRlbnQnLFxyXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBFbmFibGUgaG9yaXpvbnRhbCBzY3JvbGwuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblvIDlkK/msLTlubPmu5rliqjjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGhvcml6b250YWxcclxuICAgICAgICAgKi9cclxuICAgICAgICBob3Jpem9udGFsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcuaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBFbmFibGUgdmVydGljYWwgc2Nyb2xsLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5byA5ZCv5Z6C55u05rua5Yqo44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB2ZXJ0aWNhbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnRpY2FsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcudmVydGljYWwnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hlbiBpbmVydGlhIGlzIHNldCwgdGhlIGNvbnRlbnQgd2lsbCBjb250aW51ZSB0byBtb3ZlIHdoZW4gdG91Y2ggZW5kZWQuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblvIDlkK/mu5rliqjmg6/mgKfjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGluZXJ0aWFcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbmVydGlhOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5pbmVydGlhJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogSXQgZGV0ZXJtaW5lcyBob3cgcXVpY2tseSB0aGUgY29udGVudCBzdG9wIG1vdmluZy4gQSB2YWx1ZSBvZiAxIHdpbGwgc3RvcCB0aGUgbW92ZW1lbnQgaW1tZWRpYXRlbHkuXHJcbiAgICAgICAgICogQSB2YWx1ZSBvZiAwIHdpbGwgbmV2ZXIgc3RvcCB0aGUgbW92ZW1lbnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgYm91bmRhcnkgb2Ygc2Nyb2xsdmlldy5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5byA5ZCv5oOv5oCn5ZCO77yM5Zyo55So5oi35YGc5q2i6Kem5pG45ZCO5rua5Yqo5aSa5b+r5YGc5q2i77yMMOihqOekuuawuOS4jeWBnOatou+8jDHooajnpLrnq4vliLvlgZzmraLjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYnJha2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBicmFrZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLjUsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgICAgICByYW5nZTogWzAsIDEsIDAuMV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5icmFrZScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBXaGVuIGVsYXN0aWMgaXMgc2V0LCB0aGUgY29udGVudCB3aWxsIGJlIGJvdW5jZSBiYWNrIHdoZW4gbW92ZSBvdXQgb2YgYm91bmRhcnkuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblhYHorrjmu5rliqjlhoXlrrnotoXov4fovrnnlYzvvIzlubblnKjlgZzmraLop6bmkbjlkI7lm57lvLnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVsYXN0aWNcclxuICAgICAgICAgKi9cclxuICAgICAgICBlbGFzdGljOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcuZWxhc3RpYycsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgZWxhcHNlIHRpbWUgb2YgYm91bmNpbmcgYmFjay4gQSB2YWx1ZSBvZiAwIHdpbGwgYm91bmNlIGJhY2sgaW1tZWRpYXRlbHkuXHJcbiAgICAgICAgICogISN6aCDlm57lvLnmjIHnu63nmoTml7bpl7TvvIwwIOihqOekuuWwhueri+WNs+WPjeW8ueOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBib3VuY2VEdXJhdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJvdW5jZUR1cmF0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEsXHJcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBdLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcuYm91bmNlRHVyYXRpb24nLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGhvcml6b250YWwgc2Nyb2xsYmFyIHJlZmVyZW5jZS5cclxuICAgICAgICAgKiAhI3poIOawtOW5s+a7muWKqOeahCBTY3JvbGxCYXLjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge1Njcm9sbGJhcn0gaG9yaXpvbnRhbFNjcm9sbEJhclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGhvcml6b250YWxTY3JvbGxCYXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TY3JvbGxiYXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5ob3Jpem9udGFsX2JhcicsXHJcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLnNldFRhcmdldFNjcm9sbFZpZXcodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHZlcnRpY2FsIHNjcm9sbGJhciByZWZlcmVuY2UuXHJcbiAgICAgICAgICogISN6aCDlnoLnm7Tmu5rliqjnmoQgU2Nyb2xsQmFy44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTY3JvbGxiYXJ9IHZlcnRpY2FsU2Nyb2xsQmFyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmVydGljYWxTY3JvbGxCYXI6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5TY3JvbGxiYXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy52ZXJ0aWNhbF9iYXInLFxyXG4gICAgICAgICAgICBub3RpZnkgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxTY3JvbGxCYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLnNldFRhcmdldFNjcm9sbFZpZXcodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gU2Nyb2xsdmlldyBldmVudHMgY2FsbGJhY2tcclxuICAgICAgICAgKiAhI3poIOa7muWKqOinhuWbvueahOS6i+S7tuWbnuiwg+WHveaVsFxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSBzY3JvbGxFdmVudHNcclxuICAgICAgICAgKi9cclxuICAgICAgICBzY3JvbGxFdmVudHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5zY3JvbGxFdmVudHMnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBJZiBjYW5jZWxJbm5lckV2ZW50cyBpcyBzZXQgdG8gdHJ1ZSwgdGhlIHNjcm9sbCBiZWhhdmlvciB3aWxsIGNhbmNlbCB0b3VjaCBldmVudHMgb24gaW5uZXIgY29udGVudCBub2Rlc1xyXG4gICAgICAgICAqIEl0J3Mgc2V0IHRvIHRydWUgYnkgZGVmYXVsdC5cclxuICAgICAgICAgKiAhI3poIOWmguaenOi/meS4quWxnuaAp+iiq+iuvue9ruS4uiB0cnVl77yM6YKj5LmI5rua5Yqo6KGM5Li65Lya5Y+W5raI5a2Q6IqC54K55LiK5rOo5YaM55qE6Kem5pG45LqL5Lu277yM6buY6K6k6KKr6K6+572u5Li6IHRydWXjgIJcclxuICAgICAgICAgKiDms6jmhI/vvIzlrZDoioLngrnkuIrnmoQgdG91Y2hzdGFydCDkuovku7bku43nhLbkvJrop6blj5HvvIzop6bngrnnp7vliqjot53nprvpnZ7luLjnn63nmoTmg4XlhrXkuIsgdG91Y2htb3ZlIOWSjCB0b3VjaGVuZCDkuZ/kuI3kvJrlj5flvbHlk43jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGNhbmNlbElubmVyRXZlbnRzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2FuY2VsSW5uZXJFdmVudHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5jYW5jZWxJbm5lckV2ZW50cydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBwcml2YXRlIG9iamVjdFxyXG4gICAgICAgIF92aWV3OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgRXZlbnRUeXBlOiBFdmVudFR5cGUsXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGJvdHRvbSBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxyXG4gICAgICogISN6aCDop4blm77lhoXlrrnlsIblnKjop4Tlrprml7bpl7TlhoXmu5rliqjliLDop4blm77lupXpg6jjgIJcclxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9Cb3R0b21cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXHJcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIGJvdHRvbSBib3VuZGFyeSBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdmlldy5cclxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC4xKTtcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVG9Cb3R0b20gKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAwKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHRvcCBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxyXG4gICAgICogISN6aCDop4blm77lhoXlrrnlsIblnKjop4Tlrprml7bpl7TlhoXmu5rliqjliLDop4blm77pobbpg6jjgIJcclxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9Ub3BcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXHJcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHRvcCBib3VuZGFyeSBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgdmlldy5cclxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoMC4xKTtcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVG9Ub3AgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAxKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGxlZnQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655bCG5Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5Yiw6KeG5Zu+5bem6L6544CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvTGVmdFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcclxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgbGVmdCBib3VuZGFyeSBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIGxlZnQgb2YgdGhlIHZpZXcuXHJcbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgwLjEpO1xyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb0xlZnQgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAwKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHJpZ2h0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuWPs+i+ueOAglxyXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1JpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxyXG4gICAgICogdGhlIGNvbnRlbnQgd2lsbCBqdW1wIHRvIHRoZSByaWdodCBib3VuZGFyeSBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIHJpZ2h0IG9mIHRoZSB2aWV3LlxyXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb1JpZ2h0KDAuMSk7XHJcbiAgICAgKi9cclxuICAgIHNjcm9sbFRvUmlnaHQgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigxLCAwKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogZmFsc2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHRvcCBsZWZ0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuW3puS4iuinkuOAglxyXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1RvcExlZnRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXHJcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHRvcCBsZWZ0IGJvdW5kYXJ5IGltbWVkaWF0ZWx5LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIFNjcm9sbCB0byB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHZpZXcuXHJcbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvVG9wTGVmdCgwLjEpO1xyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb1RvcExlZnQgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAxKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgdG9wIHJpZ2h0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXHJcbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuWPs+S4iuinkuOAglxyXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1RvcFJpZ2h0XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxyXG4gICAgICogdGhlIGNvbnRlbnQgd2lsbCBqdW1wIHRvIHRoZSB0b3AgcmlnaHQgYm91bmRhcnkgaW1tZWRpYXRlbHkuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gU2Nyb2xsIHRvIHRoZSB0b3AgcmlnaHQgY29ybmVyIG9mIHRoZSB2aWV3LlxyXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb1RvcFJpZ2h0KDAuMSk7XHJcbiAgICAgKi9cclxuICAgIHNjcm9sbFRvVG9wUmlnaHQgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcclxuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigxLCAxKSxcclxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXHJcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgYm90dG9tIGxlZnQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655bCG5Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5Yiw6KeG5Zu+5bem5LiL6KeS44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvQm90dG9tTGVmdFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcclxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgYm90dG9tIGxlZnQgYm91bmRhcnkgaW1tZWRpYXRlbHkuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gU2Nyb2xsIHRvIHRoZSBsb3dlciBsZWZ0IGNvcm5lciBvZiB0aGUgdmlldy5cclxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b21MZWZ0KDAuMSk7XHJcbiAgICAgKi9cclxuICAgIHNjcm9sbFRvQm90dG9tTGVmdCAodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XHJcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xyXG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKDAsIDApLFxyXG4gICAgICAgICAgICBhcHBseVRvSG9yaXpvbnRhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbChtb3ZlRGVsdGEsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCAhPT0gZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2Nyb2xsIHRoZSBjb250ZW50IHRvIHRoZSBib3R0b20gcmlnaHQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655bCG5Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5Yiw6KeG5Zu+5Y+z5LiL6KeS44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvQm90dG9tUmlnaHRcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXHJcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIGJvdHRvbSByaWdodCBib3VuZGFyeSBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIGxvd2VyIHJpZ2h0IGNvcm5lciBvZiB0aGUgdmlldy5cclxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b21SaWdodCgwLjEpO1xyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb0JvdHRvbVJpZ2h0ICh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcclxuICAgICAgICBsZXQgbW92ZURlbHRhID0gdGhpcy5fY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSh7XHJcbiAgICAgICAgICAgIGFuY2hvcjogY2MudjIoMSwgMCksXHJcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2Nyb2xsIHdpdGggYW4gb2Zmc2V0IHJlbGF0ZWQgdG8gdGhlIFNjcm9sbFZpZXcncyB0b3AgbGVmdCBvcmlnaW4sIGlmIHRpbWVJblNlY29uZCBpcyBvbWl0dGVkLCB0aGVuIGl0IHdpbGwganVtcCB0byB0aGVcclxuICAgICAqICAgICAgIHNwZWNpZmljIG9mZnNldCBpbW1lZGlhdGVseS5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF5bCG5rua5Yqo5YiwIFNjcm9sbFZpZXcg55u45a+55bem5LiK6KeS5Y6f54K555qE5YGP56e75L2N572uLCDlpoLmnpwgdGltZUluU2Vjb25k5Y+C5pWw5LiN5Lyg77yM5YiZ56uL5Y2z5rua5Yqo5Yiw5oyH5a6a5YGP56e75L2N572u44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvT2Zmc2V0XHJcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG9mZnNldCAtIEEgVmVjMiwgdGhlIHZhbHVlIG9mIHdoaWNoIGVhY2ggYXhpcyBiZXR3ZWVuIDAgYW5kIG1heFNjcm9sbE9mZnNldFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcclxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgc3BlY2lmaWMgb2Zmc2V0IG9mIFNjcm9sbFZpZXcgaW1tZWRpYXRlbHkuXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLy8gU2Nyb2xsIHRvIG1pZGRsZSBwb3NpdGlvbiBpbiAwLjEgc2Vjb25kIGluIHgtYXhpc1xyXG4gICAgICogbGV0IG1heFNjcm9sbE9mZnNldCA9IHRoaXMuZ2V0TWF4U2Nyb2xsT2Zmc2V0KCk7XHJcbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKG1heFNjcm9sbE9mZnNldC54IC8gMiwgMCksIDAuMSk7XHJcbiAgICAgKi9cclxuICAgIHNjcm9sbFRvT2Zmc2V0IChvZmZzZXQsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBtYXhTY3JvbGxPZmZzZXQgPSB0aGlzLmdldE1heFNjcm9sbE9mZnNldCgpO1xyXG5cclxuICAgICAgICBsZXQgYW5jaG9yID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgLy9pZiBtYXhTY3JvbGxPZmZzZXQgaXMgMCwgdGhlbiBhbHdheXMgYWxpZ24gdGhlIGNvbnRlbnQncyB0b3AgbGVmdCBvcmlnaW4gdG8gdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiBpdHMgcGFyZW50XHJcbiAgICAgICAgaWYgKG1heFNjcm9sbE9mZnNldC54ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGFuY2hvci54ID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbmNob3IueCA9IG9mZnNldC54IC8gbWF4U2Nyb2xsT2Zmc2V0Lng7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWF4U2Nyb2xsT2Zmc2V0LnkgPT09IDApIHtcclxuICAgICAgICAgICAgYW5jaG9yLnkgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFuY2hvci55ID0gKG1heFNjcm9sbE9mZnNldC55IC0gb2Zmc2V0LnkgKSAvIG1heFNjcm9sbE9mZnNldC55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxUbyhhbmNob3IsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiAgR2V0IHRoZSBwb3NpdGl2ZSBvZmZzZXQgdmFsdWUgY29ycmVzcG9uZHMgdG8gdGhlIGNvbnRlbnQncyB0b3AgbGVmdCBib3VuZGFyeS5cclxuICAgICAqICEjemggIOiOt+WPlua7muWKqOinhuWbvuebuOWvueS6juW3puS4iuinkuWOn+eCueeahOW9k+WJjea7muWKqOWBj+enu1xyXG4gICAgICogQG1ldGhvZCBnZXRTY3JvbGxPZmZzZXRcclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9ICAtIEEgVmVjMiB2YWx1ZSBpbmRpY2F0ZSB0aGUgY3VycmVudCBzY3JvbGwgb2Zmc2V0LlxyXG4gICAgICovXHJcbiAgICBnZXRTY3JvbGxPZmZzZXQgKCkge1xyXG4gICAgICAgIGxldCB0b3BEZWx0YSA9ICB0aGlzLl9nZXRDb250ZW50VG9wQm91bmRhcnkoKSAtIHRoaXMuX3RvcEJvdW5kYXJ5O1xyXG4gICAgICAgIGxldCBsZWZ0RGV0YSA9IHRoaXMuX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkoKSAtIHRoaXMuX2xlZnRCb3VuZGFyeTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKGxlZnREZXRhLCB0b3BEZWx0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBHZXQgdGhlIG1heGltaXplIGF2YWlsYWJsZSAgc2Nyb2xsIG9mZnNldFxyXG4gICAgICogISN6aCDojrflj5bmu5rliqjop4blm77mnIDlpKflj6/ku6Xmu5rliqjnmoTlgY/np7vph49cclxuICAgICAqIEBtZXRob2QgZ2V0TWF4U2Nyb2xsT2Zmc2V0XHJcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSAtIEEgVmVjMiB2YWx1ZSBpbmRpY2F0ZSB0aGUgbWF4aW1pemUgc2Nyb2xsIG9mZnNldCBpbiB4IGFuZCB5IGF4aXMuXHJcbiAgICAgKi9cclxuICAgIGdldE1heFNjcm9sbE9mZnNldCAoKSB7XHJcbiAgICAgICAgbGV0IHZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIGxldCBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIGxldCBob3Jpem9udGFsTWF4aW1pemVPZmZzZXQgPSAgY29udGVudFNpemUud2lkdGggLSB2aWV3U2l6ZS53aWR0aDtcclxuICAgICAgICBsZXQgdmVydGljYWxNYXhpbWl6ZU9mZnNldCA9IGNvbnRlbnRTaXplLmhlaWdodCAtIHZpZXdTaXplLmhlaWdodDtcclxuICAgICAgICBob3Jpem9udGFsTWF4aW1pemVPZmZzZXQgPSBob3Jpem9udGFsTWF4aW1pemVPZmZzZXQgPj0gMCA/IGhvcml6b250YWxNYXhpbWl6ZU9mZnNldCA6IDA7XHJcbiAgICAgICAgdmVydGljYWxNYXhpbWl6ZU9mZnNldCA9IHZlcnRpY2FsTWF4aW1pemVPZmZzZXQgPj0wID8gdmVydGljYWxNYXhpbWl6ZU9mZnNldCA6IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBjYy52Mihob3Jpem9udGFsTWF4aW1pemVPZmZzZXQsIHZlcnRpY2FsTWF4aW1pemVPZmZzZXQpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2Nyb2xsIHRoZSBjb250ZW50IHRvIHRoZSBob3Jpem9udGFsIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldy5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF5bCG5rua5Yqo5YiwIFNjcm9sbFZpZXcg5rC05bmz5pa55ZCR55qE55m+5YiG5q+U5L2N572u5LiK44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvUGVyY2VudEhvcml6b250YWxcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwZXJjZW50IC0gQSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEuXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxyXG4gICAgICogdGhlIGNvbnRlbnQgd2lsbCBqdW1wIHRvIHRoZSBob3Jpem9udGFsIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldyBpbW1lZGlhdGVseS5cclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAvLyBTY3JvbGwgdG8gbWlkZGxlIHBvc2l0aW9uLlxyXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb0JvdHRvbVJpZ2h0KDAuNSwgMC4xKTtcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVG9QZXJjZW50SG9yaXpvbnRhbCAocGVyY2VudCwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XHJcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xyXG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKHBlcmNlbnQsIDApLFxyXG4gICAgICAgICAgICBhcHBseVRvSG9yaXpvbnRhbDogdHJ1ZSxcclxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiBmYWxzZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgcGVyY2VudCBwb3NpdGlvbiBvZiBTY3JvbGxWaWV3IGluIGFueSBkaXJlY3Rpb24uXHJcbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWcqOinhOWumuaXtumXtOWGhei/m+ihjOWeguebtOaWueWQkeWSjOawtOW5s+aWueWQkeeahOa7muWKqO+8jOW5tuS4lOa7muWKqOWIsOaMh+WumueZvuWIhuavlOS9jee9ruS4iuOAglxyXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1xyXG4gICAgICogQHBhcmFtIHtWZWMyfSBhbmNob3IgLSBBIHBvaW50IHdoaWNoIHdpbGwgYmUgY2xhbXAgYmV0d2VlbiBjYy52MigwLDApIGFuZCBjYy52MigxLDEpLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcclxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgcGVyY2VudCBwb3NpdGlvbiBvZiBTY3JvbGxWaWV3IGltbWVkaWF0ZWx5LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIFZlcnRpY2FsIHNjcm9sbCB0byB0aGUgYm90dG9tIG9mIHRoZSB2aWV3LlxyXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUbyhjYy52MigwLCAxKSwgMC4xKTtcclxuICAgICAqXHJcbiAgICAgKiAvLyBIb3Jpem9udGFsIHNjcm9sbCB0byB2aWV3IHJpZ2h0LlxyXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUbyhjYy52MigxLCAwKSwgMC4xKTtcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVG8gKGFuY2hvciwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XHJcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xyXG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKGFuY2hvciksXHJcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHZlcnRpY2FsIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldy5cclxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5YiwIFNjcm9sbFZpZXcg5Z6C55u05pa55ZCR55qE55m+5YiG5q+U5L2N572u5LiK44CCXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvUGVyY2VudFZlcnRpY2FsXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcGVyY2VudCAtIEEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcclxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgdmVydGljYWwgcGVyY2VudCBwb3NpdGlvbiBvZiBTY3JvbGxWaWV3IGltbWVkaWF0ZWx5LlxyXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxyXG4gICAgICogLy8gU2Nyb2xsIHRvIG1pZGRsZSBwb3NpdGlvbi5cclxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9QZXJjZW50VmVydGljYWwoMC41LCAwLjEpO1xyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb1BlcmNlbnRWZXJ0aWNhbCAocGVyY2VudCwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XHJcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xyXG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKDAsIHBlcmNlbnQpLFxyXG4gICAgICAgICAgICBhcHBseVRvSG9yaXpvbnRhbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuICBTdG9wIGF1dG8gc2Nyb2xsIGltbWVkaWF0ZWx5XHJcbiAgICAgKiAhI3poICDlgZzmraLoh6rliqjmu5rliqgsIOiwg+eUqOatpCBBUEkg5Y+v5Lul6K6pIFNjcm9sbHZpZXcg56uL5Y2z5YGc5q2i5rua5YqoXHJcbiAgICAgKiBAbWV0aG9kIHN0b3BBdXRvU2Nyb2xsXHJcbiAgICAgKi9cclxuICAgIHN0b3BBdXRvU2Nyb2xsICgpIHtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEFjY3VtdWxhdGVkVGltZSA9IHRoaXMuX2F1dG9TY3JvbGxUb3RhbFRpbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNb2RpZnkgdGhlIGNvbnRlbnQgcG9zaXRpb24uXHJcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeinhuWbvuWGheWuueeahOWdkOagh+eCueOAglxyXG4gICAgICogQG1ldGhvZCBzZXRDb250ZW50UG9zaXRpb25cclxuICAgICAqIEBwYXJhbSB7VmVjMn0gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gaW4gY29udGVudCdzIHBhcmVudCBzcGFjZS5cclxuICAgICAqL1xyXG4gICAgc2V0Q29udGVudFBvc2l0aW9uIChwb3NpdGlvbikge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbi5mdXp6eUVxdWFscyh0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpLCBFUFNJTE9OKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnQuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBRdWVyeSB0aGUgY29udGVudCdzIHBvc2l0aW9uIGluIGl0cyBwYXJlbnQgc3BhY2UuXHJcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeinhuWbvuWGheWuueeahOWdkOagh+eCueOAglxyXG4gICAgICogQG1ldGhvZCBnZXRDb250ZW50UG9zaXRpb25cclxuICAgICAqIEByZXR1cm5zIHtWZWMyfSAtIFRoZSBjb250ZW50J3MgcG9zaXRpb24gaW4gaXRzIHBhcmVudCBzcGFjZS5cclxuICAgICAqL1xyXG4gICAgZ2V0Q29udGVudFBvc2l0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50LmdldFBvc2l0aW9uKCk7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUXVlcnkgd2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgZHJhZ2dpbmcgdGhlIFNjcm9sbFZpZXcgdG8gc2Nyb2xsIGl0XHJcbiAgICAgKiAhI3poIOeUqOaIt+aYr+WQpuWcqOaLluaLveW9k+WJjea7muWKqOinhuWbvlxyXG4gICAgICogQG1ldGhvZCBpc1Njcm9sbGluZ1xyXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IC0gV2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgZHJhZ2dpbmcgdGhlIFNjcm9sbFZpZXcgdG8gc2Nyb2xsIGl0XHJcbiAgICAgKi9cclxuICAgIGlzU2Nyb2xsaW5nICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsaW5nO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUXVlcnkgd2hldGhlciB0aGUgU2Nyb2xsVmlldyBpcyBjdXJyZW50bHkgc2Nyb2xsaW5nIGJlY2F1c2Ugb2YgYSBib3VuY2ViYWNrIG9yIGluZXJ0aWEgc2xvd2Rvd24uXHJcbiAgICAgKiAhI3poIOW9k+WJjea7muWKqOinhuWbvuaYr+WQpuWcqOaDr+aAp+a7muWKqFxyXG4gICAgICogQG1ldGhvZCBpc0F1dG9TY3JvbGxpbmdcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSAtIFdoZXRoZXIgdGhlIFNjcm9sbFZpZXcgaXMgY3VycmVudGx5IHNjcm9sbGluZyBiZWNhdXNlIG9mIGEgYm91bmNlYmFjayBvciBpbmVydGlhIHNsb3dkb3duLlxyXG4gICAgICovXHJcbiAgICBpc0F1dG9TY3JvbGxpbmcgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvU2Nyb2xsaW5nO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgLy9wcml2YXRlIG1ldGhvZHNcclxuICAgIF9yZWdpc3RlckV2ZW50ICgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hCZWdhbiwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlZCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZGVkLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoQ2FuY2VsbGVkLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfV0hFRUwsIHRoaXMuX29uTW91c2VXaGVlbCwgdGhpcywgdHJ1ZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF91bnJlZ2lzdGVyRXZlbnQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hCZWdhbiwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZWQsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoQ2FuY2VsbGVkLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1dIRUVMLCB0aGlzLl9vbk1vdXNlV2hlZWwsIHRoaXMsIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Nb3VzZVdoZWVsIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5faGFzTmVzdGVkVmlld0dyb3VwKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgbGV0IHdoZWVsUHJlY2lzaW9uID0gLTAuMTtcclxuICAgICAgICAvL09uIHRoZSB3aW5kb3dzIHBsYXRmb3JtLCB0aGUgc2Nyb2xsaW5nIHNwZWVkIG9mIHRoZSBtb3VzZSB3aGVlbCBvZiBTY3JvbGxWaWV3IG9uIGNocm9tZSBhbmQgZmlyZWJveCBpcyBkaWZmZXJlbnRcclxuICAgICAgICBpZiAoY2Muc3lzLm9zID09PSBjYy5zeXMuT1NfV0lORE9XUyAmJiBjYy5zeXMuYnJvd3NlclR5cGUgPT09IGNjLnN5cy5CUk9XU0VSX1RZUEVfRklSRUZPWCkge1xyXG4gICAgICAgICAgICB3aGVlbFByZWNpc2lvbiA9IC0wLjEvMztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQ0NfSlNCIHx8IENDX1JVTlRJTUUpIHtcclxuICAgICAgICAgICAgd2hlZWxQcmVjaXNpb24gPSAtNztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICBkZWx0YU1vdmUgPSBjYy52MigwLCBldmVudC5nZXRTY3JvbGxZKCkgKiB3aGVlbFByZWNpc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5ob3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIGRlbHRhTW92ZSA9IGNjLnYyKGV2ZW50LmdldFNjcm9sbFkoKSAqIHdoZWVsUHJlY2lzaW9uLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX21vdXNlV2hlZWxFdmVudEVsYXBzZWRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9wcm9jZXNzRGVsdGFNb3ZlKGRlbHRhTW92ZSk7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLl9zdG9wTW91c2VXaGVlbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVQcmVzc0xvZ2ljKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5fY2hlY2tNb3VzZVdoZWVsLCAxLjAgLyA2MCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3VzZVdoZWVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jaGVja01vdXNlV2hlZWwgKGR0KSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRPdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoKTtcclxuICAgICAgICBsZXQgbWF4RWxhcHNlZFRpbWUgPSAwLjE7XHJcblxyXG4gICAgICAgIGlmICghY3VycmVudE91dE9mQm91bmRhcnkuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NJbmVydGlhU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9jaGVja01vdXNlV2hlZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdXNlV2hlZWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2ZW50RWxhcHNlZFRpbWUgKz0gZHQ7XHJcblxyXG4gICAgICAgIC8vIG1vdXNlIHdoZWVsIGV2ZW50IGlzIGVuZGVkXHJcbiAgICAgICAgaWYgKHRoaXMuX21vdXNlV2hlZWxFdmVudEVsYXBzZWRUaW1lID4gbWF4RWxhcHNlZFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fb25TY3JvbGxCYXJUb3VjaEVuZGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9jaGVja01vdXNlV2hlZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcE1vdXNlV2hlZWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhIChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xyXG4gICAgICAgIGxldCBhcHBseVRvSG9yaXpvbnRhbCA9IG9wdGlvbnMuYXBwbHlUb0hvcml6b250YWw7XHJcbiAgICAgICAgbGV0IGFwcGx5VG9WZXJ0aWNhbCA9IG9wdGlvbnMuYXBwbHlUb1ZlcnRpY2FsO1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5KCk7XHJcblxyXG4gICAgICAgIGFuY2hvciA9IGFuY2hvci5jbGFtcGYoY2MudjIoMCwgMCksIGNjLnYyKDEsIDEpKTtcclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbFNpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5jb250ZW50LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGJvdHRvbURldGEgPSB0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSAtIHRoaXMuX2JvdHRvbUJvdW5kYXJ5O1xyXG4gICAgICAgIGJvdHRvbURldGEgPSAtYm90dG9tRGV0YTtcclxuXHJcbiAgICAgICAgbGV0IGxlZnREZXRhID0gdGhpcy5fZ2V0Q29udGVudExlZnRCb3VuZGFyeSgpIC0gdGhpcy5fbGVmdEJvdW5kYXJ5O1xyXG4gICAgICAgIGxlZnREZXRhID0gLWxlZnREZXRhO1xyXG5cclxuICAgICAgICBsZXQgbW92ZURlbHRhID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgbGV0IHRvdGFsU2Nyb2xsRGVsdGEgPSAwO1xyXG4gICAgICAgIGlmIChhcHBseVRvSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICB0b3RhbFNjcm9sbERlbHRhID0gY29udGVudFNpemUud2lkdGggLSBzY3JvbGxTaXplLndpZHRoO1xyXG4gICAgICAgICAgICBtb3ZlRGVsdGEueCA9IGxlZnREZXRhIC0gdG90YWxTY3JvbGxEZWx0YSAqIGFuY2hvci54O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFwcGx5VG9WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICB0b3RhbFNjcm9sbERlbHRhID0gY29udGVudFNpemUuaGVpZ2h0IC0gc2Nyb2xsU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIG1vdmVEZWx0YS55ID0gYm90dG9tRGV0YSAtIHRvdGFsU2Nyb2xsRGVsdGEgKiBhbmNob3IueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtb3ZlRGVsdGE7XHJcbiAgICB9LFxyXG5cclxuICAgIF9tb3ZlQ29udGVudFRvVG9wTGVmdCAoc2Nyb2xsVmlld1NpemUpIHtcclxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcclxuXHJcbiAgICAgICAgbGV0IGJvdHRvbURldGEgPSB0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSAtIHRoaXMuX2JvdHRvbUJvdW5kYXJ5O1xyXG4gICAgICAgIGJvdHRvbURldGEgPSAtYm90dG9tRGV0YTtcclxuICAgICAgICBsZXQgbW92ZURlbHRhID0gY2MudjIoMCwgMCk7XHJcbiAgICAgICAgbGV0IHRvdGFsU2Nyb2xsRGVsdGEgPSAwO1xyXG5cclxuICAgICAgICBsZXQgbGVmdERldGEgPSB0aGlzLl9nZXRDb250ZW50TGVmdEJvdW5kYXJ5KCkgLSB0aGlzLl9sZWZ0Qm91bmRhcnk7XHJcbiAgICAgICAgbGVmdERldGEgPSAtbGVmdERldGE7XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50U2l6ZS5oZWlnaHQgPCBzY3JvbGxWaWV3U2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdG90YWxTY3JvbGxEZWx0YSA9IGNvbnRlbnRTaXplLmhlaWdodCAtIHNjcm9sbFZpZXdTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgbW92ZURlbHRhLnkgPSBib3R0b21EZXRhIC0gdG90YWxTY3JvbGxEZWx0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50U2l6ZS53aWR0aCA8IHNjcm9sbFZpZXdTaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgIHRvdGFsU2Nyb2xsRGVsdGEgPSBjb250ZW50U2l6ZS53aWR0aCAtIHNjcm9sbFZpZXdTaXplLndpZHRoO1xyXG4gICAgICAgICAgICBtb3ZlRGVsdGEueCA9IGxlZnREZXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyU3RhdGUoKTtcclxuICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xyXG4gICAgICAgIHRoaXMuX2FkanVzdENvbnRlbnRPdXRPZkJvdW5kYXJ5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jYWxjdWxhdGVCb3VuZGFyeSAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICAvL3JlZnJlc2ggY29udGVudCBzaXplXHJcbiAgICAgICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgICAgIGlmKGxheW91dCAmJiBsYXlvdXQuZW5hYmxlZEluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQudXBkYXRlTGF5b3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGFuY2hvclggPSB2aWV3U2l6ZS53aWR0aCAqIHRoaXMuX3ZpZXcuYW5jaG9yWDtcclxuICAgICAgICAgICAgbGV0IGFuY2hvclkgPSB2aWV3U2l6ZS5oZWlnaHQgKiB0aGlzLl92aWV3LmFuY2hvclk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9sZWZ0Qm91bmRhcnkgPSAtYW5jaG9yWDtcclxuICAgICAgICAgICAgdGhpcy5fYm90dG9tQm91bmRhcnkgPSAtYW5jaG9yWTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0Qm91bmRhcnkgPSB0aGlzLl9sZWZ0Qm91bmRhcnkgKyB2aWV3U2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5fdG9wQm91bmRhcnkgPSB0aGlzLl9ib3R0b21Cb3VuZGFyeSArIHZpZXdTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50VG9Ub3BMZWZ0KHZpZXdTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vdGhpcyBpcyBmb3IgbmVzdGVkIHNjcm9sbHZpZXdcclxuICAgIF9oYXNOZXN0ZWRWaWV3R3JvdXAgKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmV2ZW50UGhhc2UgIT09IGNjLkV2ZW50LkNBUFRVUklOR19QSEFTRSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAvL2NhcHR1cmVMaXN0ZW5lcnMgYXJlIGFycmFuZ2VkIGZyb20gY2hpbGQgdG8gcGFyZW50XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FwdHVyZUxpc3RlbmVycy5sZW5ndGg7ICsraSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IGNhcHR1cmVMaXN0ZW5lcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZSA9PT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuZ2V0Q29tcG9uZW50KGNjLlZpZXdHcm91cCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmdldENvbXBvbmVudChjYy5WaWV3R3JvdXApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICAvL1RoaXMgaXMgZm9yIFNjcm9sbHZpZXcgYXMgY2hpbGRyZW4gb2YgYSBCdXR0b25cclxuICAgIF9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUgKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmV2ZW50UGhhc2UgPT09IGNjLkV2ZW50LkFUX1RBUkdFVCAmJiBldmVudC50YXJnZXQgPT09IHRoaXMubm9kZSkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHRvdWNoIGV2ZW50IGhhbmRsZXJcclxuICAgIF9vblRvdWNoQmVnYW4gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlUHJlc3NMb2dpYyh0b3VjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUoZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaE1vdmVkIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5faGFzTmVzdGVkVmlld0dyb3VwKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaDtcclxuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVMb2dpYyh0b3VjaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERvIG5vdCBwcmV2ZW50IHRvdWNoIGV2ZW50cyBpbiBpbm5lciBub2Rlc1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5jZWxJbm5lckV2ZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gdG91Y2guZ2V0TG9jYXRpb24oKS5zdWIodG91Y2guZ2V0U3RhcnRMb2NhdGlvbigpKTtcclxuICAgICAgICAvL0ZJWE1FOiB0b3VjaCBtb3ZlIGRlbHRhIHNob3VsZCBiZSBjYWxjdWxhdGVkIGJ5IERQSS5cclxuICAgICAgICBpZiAoZGVsdGFNb3ZlLm1hZygpID4gNykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RvdWNoTW92ZWQgJiYgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNpbXVsYXRlIHRvdWNoIGNhbmNlbCBmb3IgdGFyZ2V0IG5vZGVcclxuICAgICAgICAgICAgICAgIGxldCBjYW5jZWxFdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudFRvdWNoKGV2ZW50LmdldFRvdWNoZXMoKSwgZXZlbnQuYnViYmxlcyk7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxFdmVudC50eXBlID0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMO1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsRXZlbnQudG91Y2ggPSBldmVudC50b3VjaDtcclxuICAgICAgICAgICAgICAgIGNhbmNlbEV2ZW50LnNpbXVsYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGNhbmNlbEV2ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoRW5kZWQgKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3RvdWNoLXVwJyk7XHJcblxyXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVsZWFzZUxvZ2ljKHRvdWNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoTW92ZWQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RvcFByb3BhZ2F0aW9uSWZUYXJnZXRJc01lKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoQ2FuY2VsbGVkIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5faGFzTmVzdGVkVmlld0dyb3VwKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBGaWx0ZSB0b3VjaCBjYW5jZWwgZXZlbnQgc2VuZCBmcm9tIHNlbGZcclxuICAgICAgICBpZiAoIWV2ZW50LnNpbXVsYXRlKSB7XHJcbiAgICAgICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRlbnQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVsZWFzZUxvZ2ljKHRvdWNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUoZXZlbnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfcHJvY2Vzc0RlbHRhTW92ZSAoZGVsdGFNb3ZlKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2hpbGRyZW4oZGVsdGFNb3ZlKTtcclxuICAgICAgICB0aGlzLl9nYXRoZXJUb3VjaE1vdmUoZGVsdGFNb3ZlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gQ29udGFpbnMgbm9kZSBhbmdsZSBjYWxjdWxhdGlvbnNcclxuICAgIF9nZXRMb2NhbEF4aXNBbGlnbkRlbHRhICh0b3VjaCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaC5nZXRMb2NhdGlvbigpLCBfdGVtcFBvaW50KTtcclxuICAgICAgICB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2guZ2V0UHJldmlvdXNMb2NhdGlvbigpLCBfdGVtcFByZXZQb2ludCk7XHJcbiAgICAgICAgcmV0dXJuIF90ZW1wUG9pbnQuc3ViKF90ZW1wUHJldlBvaW50KTtcclxuICAgIH0sXHJcblxyXG4gICAgX2hhbmRsZU1vdmVMb2dpYyAodG91Y2gpIHtcclxuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gdGhpcy5fZ2V0TG9jYWxBeGlzQWxpZ25EZWx0YSh0b3VjaCk7XHJcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0RlbHRhTW92ZShkZWx0YU1vdmUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc2Nyb2xsQ2hpbGRyZW4gKGRlbHRhTW92ZSkge1xyXG4gICAgICAgIGRlbHRhTW92ZSA9IHRoaXMuX2NsYW1wRGVsdGEoZGVsdGFNb3ZlKTtcclxuXHJcbiAgICAgICAgbGV0IHJlYWxNb3ZlID0gZGVsdGFNb3ZlO1xyXG4gICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5O1xyXG4gICAgICAgIGlmICh0aGlzLmVsYXN0aWMpIHtcclxuICAgICAgICAgICAgb3V0T2ZCb3VuZGFyeSA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCk7XHJcbiAgICAgICAgICAgIHJlYWxNb3ZlLnggKj0gKG91dE9mQm91bmRhcnkueCA9PT0gMCA/IDEgOiAwLjUpO1xyXG4gICAgICAgICAgICByZWFsTW92ZS55ICo9IChvdXRPZkJvdW5kYXJ5LnkgPT09IDAgPyAxIDogMC41KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5lbGFzdGljKSB7XHJcbiAgICAgICAgICAgIG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeShyZWFsTW92ZSk7XHJcbiAgICAgICAgICAgIHJlYWxNb3ZlID0gcmVhbE1vdmUuYWRkKG91dE9mQm91bmRhcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbEV2ZW50VHlwZSA9IC0xO1xyXG5cclxuICAgICAgICBpZiAocmVhbE1vdmUueSA+IDApIHsgLy91cFxyXG4gICAgICAgICAgICBsZXQgaWNCb3R0b21Qb3MgPSB0aGlzLmNvbnRlbnQueSAtIHRoaXMuY29udGVudC5hbmNob3JZICogdGhpcy5jb250ZW50LmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChpY0JvdHRvbVBvcyArIHJlYWxNb3ZlLnkgPj0gdGhpcy5fYm90dG9tQm91bmRhcnkpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbEV2ZW50VHlwZSA9ICdzY3JvbGwtdG8tYm90dG9tJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZWFsTW92ZS55IDwgMCkgeyAvL2Rvd25cclxuICAgICAgICAgICAgbGV0IGljVG9wUG9zID0gdGhpcy5jb250ZW50LnkgLSB0aGlzLmNvbnRlbnQuYW5jaG9yWSAqIHRoaXMuY29udGVudC5oZWlnaHQgKyB0aGlzLmNvbnRlbnQuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGljVG9wUG9zICsgcmVhbE1vdmUueSA8PSB0aGlzLl90b3BCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRUeXBlID0gJ3Njcm9sbC10by10b3AnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZWFsTW92ZS54IDwgMCkgeyAvL2xlZnRcclxuICAgICAgICAgICAgbGV0IGljUmlnaHRQb3MgPSB0aGlzLmNvbnRlbnQueCAtIHRoaXMuY29udGVudC5hbmNob3JYICogdGhpcy5jb250ZW50LndpZHRoICsgdGhpcy5jb250ZW50LndpZHRoO1xyXG4gICAgICAgICAgICBpZiAoaWNSaWdodFBvcyArIHJlYWxNb3ZlLnggPD0gdGhpcy5fcmlnaHRCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRUeXBlID0gJ3Njcm9sbC10by1yaWdodCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVhbE1vdmUueCA+IDApIHsgLy9yaWdodFxyXG4gICAgICAgICAgICBsZXQgaWNMZWZ0UG9zID0gdGhpcy5jb250ZW50LnggLSB0aGlzLmNvbnRlbnQuYW5jaG9yWCAqIHRoaXMuY29udGVudC53aWR0aDtcclxuICAgICAgICAgICAgaWYgKGljTGVmdFBvcyArIHJlYWxNb3ZlLnggPj0gdGhpcy5fbGVmdEJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxFdmVudFR5cGUgPSAnc2Nyb2xsLXRvLWxlZnQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChyZWFsTW92ZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAocmVhbE1vdmUueCAhPT0gMCB8fCByZWFsTW92ZS55ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsLWJlZ2FuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsaW5nJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2Nyb2xsRXZlbnRUeXBlICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KHNjcm9sbEV2ZW50VHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgX2hhbmRsZVByZXNzTG9naWMgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdXRvU2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3Njcm9sbC1lbmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNCb3VuY2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl90b3VjaE1vdmVQcmV2aW91c1RpbWVzdGFtcCA9IGdldFRpbWVJbk1pbGxpc2Vjb25kcygpO1xyXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl90b3VjaE1vdmVUaW1lRGVsdGFzLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX29uU2Nyb2xsQmFyVG91Y2hCZWdhbigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2xhbXBEZWx0YSAoZGVsdGEpIHtcclxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBsZXQgc2Nyb2xsVmlld1NpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgaWYgKGNvbnRlbnRTaXplLndpZHRoIDwgc2Nyb2xsVmlld1NpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgZGVsdGEueCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250ZW50U2l6ZS5oZWlnaHQgPCBzY3JvbGxWaWV3U2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgZGVsdGEueSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVsdGE7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nYXRoZXJUb3VjaE1vdmUgKGRlbHRhKSB7XHJcbiAgICAgICAgZGVsdGEgPSB0aGlzLl9jbGFtcERlbHRhKGRlbHRhKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMubGVuZ3RoID49IE5VTUJFUl9PRl9HQVRIRVJFRF9UT1VDSEVTX0ZPUl9NT1ZFX1NQRUVEKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMuc2hpZnQoKTtcclxuICAgICAgICAgICAgdGhpcy5fdG91Y2hNb3ZlVGltZURlbHRhcy5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdG91Y2hNb3ZlRGlzcGxhY2VtZW50cy5wdXNoKGRlbHRhKTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVTdGFtcCA9IGdldFRpbWVJbk1pbGxpc2Vjb25kcygpO1xyXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZVRpbWVEZWx0YXMucHVzaCgodGltZVN0YW1wIC0gdGhpcy5fdG91Y2hNb3ZlUHJldmlvdXNUaW1lc3RhbXApIC8gMTAwMCk7XHJcbiAgICAgICAgdGhpcy5fdG91Y2hNb3ZlUHJldmlvdXNUaW1lc3RhbXAgPSB0aW1lU3RhbXA7XHJcbiAgICB9LFxyXG5cclxuICAgIF9zdGFydEJvdW5jZUJhY2tJZk5lZWRlZCAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVsYXN0aWMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJvdW5jZUJhY2tBbW91bnQgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xyXG4gICAgICAgIGJvdW5jZUJhY2tBbW91bnQgPSB0aGlzLl9jbGFtcERlbHRhKGJvdW5jZUJhY2tBbW91bnQpO1xyXG5cclxuICAgICAgICBpZiAoYm91bmNlQmFja0Ftb3VudC5mdXp6eUVxdWFscyhjYy52MigwLCAwKSwgRVBTSUxPTikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJvdW5jZUJhY2tUaW1lID0gTWF0aC5tYXgodGhpcy5ib3VuY2VEdXJhdGlvbiwgMCk7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKGJvdW5jZUJhY2tBbW91bnQsIGJvdW5jZUJhY2tUaW1lLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0JvdW5jaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnkgPiAwKSB0aGlzLl9kaXNwYXRjaEV2ZW50KCdib3VuY2UtdG9wJyk7XHJcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnkgPCAwKSB0aGlzLl9kaXNwYXRjaEV2ZW50KCdib3VuY2UtYm90dG9tJyk7XHJcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnggPiAwKSB0aGlzLl9kaXNwYXRjaEV2ZW50KCdib3VuY2UtcmlnaHQnKTtcclxuICAgICAgICAgICAgaWYgKGJvdW5jZUJhY2tBbW91bnQueCA8IDApIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JvdW5jZS1sZWZ0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQm91bmNpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIF9wcm9jZXNzSW5lcnRpYVNjcm9sbCAoKSB7XHJcbiAgICAgICAgbGV0IGJvdW5jZUJhY2tTdGFydGVkID0gdGhpcy5fc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQoKTtcclxuICAgICAgICBpZiAoIWJvdW5jZUJhY2tTdGFydGVkICYmIHRoaXMuaW5lcnRpYSkge1xyXG4gICAgICAgICAgICBsZXQgdG91Y2hNb3ZlVmVsb2NpdHkgPSB0aGlzLl9jYWxjdWxhdGVUb3VjaE1vdmVWZWxvY2l0eSgpO1xyXG4gICAgICAgICAgICBpZiAoIXRvdWNoTW92ZVZlbG9jaXR5LmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSAmJiB0aGlzLmJyYWtlIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRJbmVydGlhU2Nyb2xsKHRvdWNoTW92ZVZlbG9jaXR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb25TY3JvbGxCYXJUb3VjaEVuZGVkKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9oYW5kbGVSZWxlYXNlTG9naWMgKHRvdWNoKSB7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gdGhpcy5fZ2V0TG9jYWxBeGlzQWxpZ25EZWx0YSh0b3VjaCk7XHJcbiAgICAgICAgdGhpcy5fZ2F0aGVyVG91Y2hNb3ZlKGRlbHRhKTtcclxuICAgICAgICB0aGlzLl9wcm9jZXNzSW5lcnRpYVNjcm9sbCgpO1xyXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fYXV0b1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsLWVuZGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9pc091dE9mQm91bmRhcnkgKCkge1xyXG4gICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoKTtcclxuICAgICAgICByZXR1cm4gIW91dE9mQm91bmRhcnkuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaXNOZWNlc3NhcnlBdXRvU2Nyb2xsQnJha2UgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hdXRvU2Nyb2xsQnJha2luZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc091dE9mQm91bmRhcnkoKSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQ3VycmVudGx5T3V0T2ZCb3VuZGFyeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24gPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEN1cnJlbnRseU91dE9mQm91bmRhcnkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0U2Nyb2xsRW5kZWRFdmVudFRpbWluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIEVQU0lMT047XHJcbiAgICB9LFxyXG5cclxuICAgIF9wcm9jZXNzQXV0b1Njcm9sbGluZyAoZHQpIHtcclxuICAgICAgICBsZXQgaXNBdXRvU2Nyb2xsQnJha2UgPSB0aGlzLl9pc05lY2Vzc2FyeUF1dG9TY3JvbGxCcmFrZSgpO1xyXG4gICAgICAgIGxldCBicmFraW5nRmFjdG9yID0gaXNBdXRvU2Nyb2xsQnJha2UgPyBPVVRfT0ZfQk9VTkRBUllfQlJFQUtJTkdfRkFDVE9SIDogMTtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQWNjdW11bGF0ZWRUaW1lICs9IGR0ICogKDEgLyBicmFraW5nRmFjdG9yKTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLm1pbigxLCB0aGlzLl9hdXRvU2Nyb2xsQWNjdW11bGF0ZWRUaW1lIC8gdGhpcy5fYXV0b1Njcm9sbFRvdGFsVGltZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9TY3JvbGxBdHRlbnVhdGUpIHtcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IHF1aW50RWFzZU91dChwZXJjZW50YWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHRoaXMuX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uLmFkZCh0aGlzLl9hdXRvU2Nyb2xsVGFyZ2V0RGVsdGEubXVsKHBlcmNlbnRhZ2UpKTtcclxuICAgICAgICBsZXQgcmVhY2hlZEVuZCA9IE1hdGguYWJzKHBlcmNlbnRhZ2UgLSAxKSA8PSBFUFNJTE9OO1xyXG5cclxuICAgICAgICBsZXQgZmlyZUV2ZW50ID0gTWF0aC5hYnMocGVyY2VudGFnZSAtIDEpIDw9IHRoaXMuZ2V0U2Nyb2xsRW5kZWRFdmVudFRpbWluZygpO1xyXG4gICAgICAgIGlmIChmaXJlRXZlbnQgJiYgIXRoaXMuX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnKTtcclxuICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxFbmRlZFdpdGhUaHJlc2hvbGRFdmVudEZpcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVsYXN0aWMpIHtcclxuICAgICAgICAgICAgbGV0IGJyYWtlT2Zmc2V0UG9zaXRpb24gPSBuZXdQb3NpdGlvbi5zdWIodGhpcy5fYXV0b1Njcm9sbEJyYWtpbmdTdGFydFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGlzQXV0b1Njcm9sbEJyYWtlKSB7XHJcbiAgICAgICAgICAgICAgICBicmFrZU9mZnNldFBvc2l0aW9uID0gYnJha2VPZmZzZXRQb3NpdGlvbi5tdWwoYnJha2luZ0ZhY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24uYWRkKGJyYWtlT2Zmc2V0UG9zaXRpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlRGVsdGEgPSBuZXdQb3NpdGlvbi5zdWIodGhpcy5nZXRDb250ZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkobW92ZURlbHRhKTtcclxuICAgICAgICAgICAgaWYgKCFvdXRPZkJvdW5kYXJ5LmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbi5hZGQob3V0T2ZCb3VuZGFyeSk7XHJcbiAgICAgICAgICAgICAgICByZWFjaGVkRW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlYWNoZWRFbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRlbHRhTW92ZSA9IG5ld1Bvc2l0aW9uLnN1Yih0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICB0aGlzLl9tb3ZlQ29udGVudCh0aGlzLl9jbGFtcERlbHRhKGRlbHRhTW92ZSksIHJlYWNoZWRFbmQpO1xyXG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3Njcm9sbGluZycpO1xyXG5cclxuICAgICAgICAvLyBzY29sbFRvIEFQSSBjb250cm9sbCBtb3ZlXHJcbiAgICAgICAgaWYgKCF0aGlzLl9hdXRvU2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQm91bmNpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3Njcm9sbC1lbmRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX3N0YXJ0SW5lcnRpYVNjcm9sbCAodG91Y2hNb3ZlVmVsb2NpdHkpIHtcclxuICAgICAgICBsZXQgaW5lcnRpYVRvdGFsTW92ZW1lbnQgPSB0b3VjaE1vdmVWZWxvY2l0eS5tdWwoTU9WRU1FTlRfRkFDVE9SKTtcclxuICAgICAgICB0aGlzLl9zdGFydEF0dGVudWF0aW5nQXV0b1Njcm9sbChpbmVydGlhVG90YWxNb3ZlbWVudCwgdG91Y2hNb3ZlVmVsb2NpdHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2FsY3VsYXRlQXR0ZW51YXRlZEZhY3RvciAoZGlzdGFuY2UpIHtcclxuICAgICAgICBpZiAodGhpcy5icmFrZSA8PSAwKXtcclxuICAgICAgICAgICAgcmV0dXJuICgxIC0gdGhpcy5icmFrZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2F0dGVudWF0ZSBmb3JtdWxhIGZyb206IGh0dHA6Ly9sZWFybm9wZW5nbC5jb20vIyFMaWdodGluZy9MaWdodC1jYXN0ZXJzXHJcbiAgICAgICAgcmV0dXJuICgxIC0gdGhpcy5icmFrZSkgKiAoMSAvICgxICsgZGlzdGFuY2UgKiAwLjAwMDAxNCArIGRpc3RhbmNlICogZGlzdGFuY2UgKiAwLjAwMDAwMDAwOCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3RhcnRBdHRlbnVhdGluZ0F1dG9TY3JvbGwgKGRlbHRhTW92ZSwgaW5pdGlhbFZlbG9jaXR5KSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLl9jYWxjdWxhdGVBdXRvU2Nyb2xsVGltZUJ5SW5pdGFsU3BlZWQoaW5pdGlhbFZlbG9jaXR5Lm1hZygpKTtcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXJnZXREZWx0YSA9IGRlbHRhTW92ZS5ub3JtYWxpemUoKTtcclxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBsZXQgc2Nyb2xsdmlld1NpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbE1vdmVXaWR0aCA9IChjb250ZW50U2l6ZS53aWR0aCAtIHNjcm9sbHZpZXdTaXplLndpZHRoKTtcclxuICAgICAgICBsZXQgdG90YWxNb3ZlSGVpZ2h0ID0gKGNvbnRlbnRTaXplLmhlaWdodCAtIHNjcm9sbHZpZXdTaXplLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGxldCBhdHRlbnVhdGVkRmFjdG9yWCA9IHRoaXMuX2NhbGN1bGF0ZUF0dGVudWF0ZWRGYWN0b3IodG90YWxNb3ZlV2lkdGgpO1xyXG4gICAgICAgIGxldCBhdHRlbnVhdGVkRmFjdG9yWSA9IHRoaXMuX2NhbGN1bGF0ZUF0dGVudWF0ZWRGYWN0b3IodG90YWxNb3ZlSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdGFyZ2V0RGVsdGEgPSBjYy52Mih0YXJnZXREZWx0YS54ICogdG90YWxNb3ZlV2lkdGggKiAoMSAtIHRoaXMuYnJha2UpICogYXR0ZW51YXRlZEZhY3RvclgsIHRhcmdldERlbHRhLnkgKiB0b3RhbE1vdmVIZWlnaHQgKiBhdHRlbnVhdGVkRmFjdG9yWSAqICgxIC0gdGhpcy5icmFrZSkpO1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luYWxNb3ZlTGVuZ3RoID0gZGVsdGFNb3ZlLm1hZygpO1xyXG4gICAgICAgIGxldCBmYWN0b3IgPSB0YXJnZXREZWx0YS5tYWcoKSAvIG9yaWdpbmFsTW92ZUxlbmd0aDtcclxuICAgICAgICB0YXJnZXREZWx0YSA9IHRhcmdldERlbHRhLmFkZChkZWx0YU1vdmUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5icmFrZSA+IDAgJiYgZmFjdG9yID4gNykge1xyXG4gICAgICAgICAgICBmYWN0b3IgPSBNYXRoLnNxcnQoZmFjdG9yKTtcclxuICAgICAgICAgICAgdGFyZ2V0RGVsdGEgPSBkZWx0YU1vdmUubXVsKGZhY3RvcikuYWRkKGRlbHRhTW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5icmFrZSA+IDAgJiYgZmFjdG9yID4gMykge1xyXG4gICAgICAgICAgICBmYWN0b3IgPSAzO1xyXG4gICAgICAgICAgICB0aW1lID0gdGltZSAqIGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJyYWtlID09PSAwICYmIGZhY3RvciA+IDEpIHtcclxuICAgICAgICAgICAgdGltZSA9IHRpbWUgKiBmYWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwodGFyZ2V0RGVsdGEsIHRpbWUsIHRydWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY2FsY3VsYXRlQXV0b1Njcm9sbFRpbWVCeUluaXRhbFNwZWVkIChpbml0YWxTcGVlZCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5zcXJ0KGluaXRhbFNwZWVkIC8gNSkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3RhcnRBdXRvU2Nyb2xsIChkZWx0YU1vdmUsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xyXG4gICAgICAgIGxldCBhZGp1c3RlZERlbHRhTW92ZSA9IHRoaXMuX2ZsYXR0ZW5WZWN0b3JCeURpcmVjdGlvbihkZWx0YU1vdmUpO1xyXG5cclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsVGFyZ2V0RGVsdGEgPSBhZGp1c3RlZERlbHRhTW92ZTtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQXR0ZW51YXRlID0gYXR0ZW51YXRlZDtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbFRvdGFsVGltZSA9IHRpbWVJblNlY29uZDtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQWNjdW11bGF0ZWRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nU3RhcnRQb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudE91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xyXG4gICAgICAgIGlmICghY3VycmVudE91dE9mQm91bmRhcnkuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jYWxjdWxhdGVUb3VjaE1vdmVWZWxvY2l0eSAoKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdG90YWxUaW1lID0gdGhpcy5fdG91Y2hNb3ZlVGltZURlbHRhcy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYSArIGI7XHJcbiAgICAgICAgfSwgdG90YWxUaW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsVGltZSA8PSAwIHx8IHRvdGFsVGltZSA+PSAwLjUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLnYyKDAsIDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvdGFsTW92ZW1lbnQgPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0b3RhbE1vdmVtZW50ID0gdGhpcy5fdG91Y2hNb3ZlRGlzcGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5hZGQoYik7XHJcbiAgICAgICAgfSwgdG90YWxNb3ZlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjYy52Mih0b3RhbE1vdmVtZW50LnggKiAoMSAtIHRoaXMuYnJha2UpIC8gdG90YWxUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsTW92ZW1lbnQueSAqICgxIC0gdGhpcy5icmFrZSkgLyB0b3RhbFRpbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZmxhdHRlblZlY3RvckJ5RGlyZWN0aW9uICh2ZWN0b3IpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdmVjdG9yO1xyXG4gICAgICAgIHJlc3VsdC54ID0gdGhpcy5ob3Jpem9udGFsID8gcmVzdWx0LnggOiAwO1xyXG4gICAgICAgIHJlc3VsdC55ID0gdGhpcy52ZXJ0aWNhbCA/IHJlc3VsdC55IDogMDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfbW92ZUNvbnRlbnQgKGRlbHRhTW92ZSwgY2FuU3RhcnRCb3VuY2VCYWNrKSB7XHJcbiAgICAgICAgbGV0IGFkanVzdGVkTW92ZSA9IHRoaXMuX2ZsYXR0ZW5WZWN0b3JCeURpcmVjdGlvbihkZWx0YU1vdmUpO1xyXG4gICAgICAgIGxldCBuZXdQb3NpdGlvbiA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCkuYWRkKGFkanVzdGVkTW92ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q29udGVudFBvc2l0aW9uKG5ld1Bvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgbGV0IG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcihvdXRPZkJvdW5kYXJ5KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZWxhc3RpYyAmJiBjYW5TdGFydEJvdW5jZUJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRDb250ZW50TGVmdEJvdW5kYXJ5ICgpIHtcclxuICAgICAgICBsZXQgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRQb3MueCAtIHRoaXMuY29udGVudC5nZXRBbmNob3JQb2ludCgpLnggKiB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKS53aWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldENvbnRlbnRSaWdodEJvdW5kYXJ5ICgpIHtcclxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q29udGVudExlZnRCb3VuZGFyeSgpICsgY29udGVudFNpemUud2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRDb250ZW50VG9wQm91bmRhcnkgKCkge1xyXG4gICAgICAgIGxldCBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSArIGNvbnRlbnRTaXplLmhlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldENvbnRlbnRCb3R0b21Cb3VuZGFyeSAoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRQb3MgPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50UG9zLnkgLSB0aGlzLmNvbnRlbnQuZ2V0QW5jaG9yUG9pbnQoKS55ICogdGhpcy5jb250ZW50LmdldENvbnRlbnRTaXplKCkuaGVpZ2h0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0SG93TXVjaE91dE9mQm91bmRhcnkgKGFkZGl0aW9uKSB7XHJcbiAgICAgICAgYWRkaXRpb24gPSBhZGRpdGlvbiB8fCBjYy52MigwLCAwKTtcclxuICAgICAgICBpZiAoYWRkaXRpb24uZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pICYmICF0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3V0T2ZCb3VuZGFyeUFtb3VudCA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIGlmICh0aGlzLl9nZXRDb250ZW50TGVmdEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi54ID4gdGhpcy5fbGVmdEJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgIG91dE9mQm91bmRhcnlBbW91bnQueCA9IHRoaXMuX2xlZnRCb3VuZGFyeSAtICh0aGlzLl9nZXRDb250ZW50TGVmdEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi54KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2dldENvbnRlbnRSaWdodEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi54IDwgdGhpcy5fcmlnaHRCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICBvdXRPZkJvdW5kYXJ5QW1vdW50LnggPSB0aGlzLl9yaWdodEJvdW5kYXJ5IC0gKHRoaXMuX2dldENvbnRlbnRSaWdodEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi54KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9nZXRDb250ZW50VG9wQm91bmRhcnkoKSArIGFkZGl0aW9uLnkgPCB0aGlzLl90b3BCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICBvdXRPZkJvdW5kYXJ5QW1vdW50LnkgPSB0aGlzLl90b3BCb3VuZGFyeSAtICh0aGlzLl9nZXRDb250ZW50VG9wQm91bmRhcnkoKSArIGFkZGl0aW9uLnkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5KCkgKyBhZGRpdGlvbi55ID4gdGhpcy5fYm90dG9tQm91bmRhcnkpIHtcclxuICAgICAgICAgICAgb3V0T2ZCb3VuZGFyeUFtb3VudC55ID0gdGhpcy5fYm90dG9tQm91bmRhcnkgLSAodGhpcy5fZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5KCkgKyBhZGRpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhZGRpdGlvbi5mdXp6eUVxdWFscyhjYy52MigwLCAwKSwgRVBTSUxPTikpIHtcclxuICAgICAgICAgICAgdGhpcy5fb3V0T2ZCb3VuZGFyeUFtb3VudCA9IG91dE9mQm91bmRhcnlBbW91bnQ7XHJcbiAgICAgICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3V0T2ZCb3VuZGFyeUFtb3VudCA9IHRoaXMuX2NsYW1wRGVsdGEob3V0T2ZCb3VuZGFyeUFtb3VudCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRPZkJvdW5kYXJ5QW1vdW50O1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlU2Nyb2xsQmFyU3RhdGUgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5jb250ZW50LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgbGV0IHNjcm9sbFZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50U2l6ZS5oZWlnaHQgPCBzY3JvbGxWaWV3U2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVydGljYWxTY3JvbGxCYXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhci5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWxTY3JvbGxCYXIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRlbnRTaXplLndpZHRoIDwgc2Nyb2xsVmlld1NpemUud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWxTY3JvbGxCYXIuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlU2Nyb2xsQmFyIChvdXRPZkJvdW5kYXJ5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhcikge1xyXG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxTY3JvbGxCYXIuX29uU2Nyb2xsKG91dE9mQm91bmRhcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmVydGljYWxTY3JvbGxCYXIpIHtcclxuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhci5fb25TY3JvbGwob3V0T2ZCb3VuZGFyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfb25TY3JvbGxCYXJUb3VjaEJlZ2FuICgpIHtcclxuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhci5fb25Ub3VjaEJlZ2FuKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbFNjcm9sbEJhcikge1xyXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLl9vblRvdWNoQmVnYW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblNjcm9sbEJhclRvdWNoRW5kZWQgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWxTY3JvbGxCYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLl9vblRvdWNoRW5kZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGljYWxTY3JvbGxCYXIuX29uVG91Y2hFbmRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2Rpc3BhdGNoRXZlbnQgKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnc2Nyb2xsLWVuZGVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxFdmVudEVtaXRNYXNrID0gMDtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3Njcm9sbC10by10b3AnXHJcbiAgICAgICAgICAgICAgICAgICB8fCBldmVudCA9PT0gJ3Njcm9sbC10by1ib3R0b20nXHJcbiAgICAgICAgICAgICAgICAgICB8fCBldmVudCA9PT0gJ3Njcm9sbC10by1sZWZ0J1xyXG4gICAgICAgICAgICAgICAgICAgfHwgZXZlbnQgPT09ICdzY3JvbGwtdG8tcmlnaHQnKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmxhZyA9ICgxIDw8IGV2ZW50TWFwW2V2ZW50XSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxFdmVudEVtaXRNYXNrICYgZmxhZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRFbWl0TWFzayB8PSBmbGFnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5zY3JvbGxFdmVudHMsIHRoaXMsIGV2ZW50TWFwW2V2ZW50XSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoZXZlbnQsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfYWRqdXN0Q29udGVudE91dE9mQm91bmRhcnkgKCkge1xyXG4gICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzT3V0T2ZCb3VuZGFyeSgpKSB7XHJcbiAgICAgICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoY2MudjIoMCwgMCkpO1xyXG4gICAgICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpLmFkZChvdXRPZkJvdW5kYXJ5KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldFBvc2l0aW9uKG5ld1Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcigwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5KCk7XHJcbiAgICAgICAgLy9CZWNhdXNlIHdpZGdldCBjb21wb25lbnQgd2lsbCBhZGp1c3QgY29udGVudCBwb3NpdGlvbiBhbmQgc2Nyb2xsdmlldyBwb3NpdGlvbiBpcyBjb3JyZWN0IGFmdGVyIHZpc2l0XHJcbiAgICAgICAgLy9TbyB0aGlzIGV2ZW50IGNvdWxkIG1ha2Ugc3VyZSB0aGUgY29udGVudCBpcyBvbiB0aGUgY29ycmVjdCBwb3NpdGlvbiBhZnRlciBsb2FkaW5nLlxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3Iub25jZShjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfRFJBVywgdGhpcy5fYWRqdXN0Q29udGVudE91dE9mQm91bmRhcnksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2hpZGVTY3JvbGxiYXIgKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWxTY3JvbGxCYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVydGljYWxTY3JvbGxCYXIuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlICgpIHtcclxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLl91bnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lm9mZihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQub2ZmKE5vZGVFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcub2ZmKE5vZGVFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlldy5vZmYoTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9mZihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faGlkZVNjcm9sbGJhcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcEF1dG9TY3JvbGwoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGUgKCkge1xyXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5vbihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9uKE5vZGVFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlldy5vbihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcub24oTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhclN0YXRlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXV0b1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQXV0b1Njcm9sbGluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbmNjLlNjcm9sbFZpZXcgPSBtb2R1bGUuZXhwb3J0cyA9IFNjcm9sbFZpZXc7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBzY3JvbGwtdG8tdG9wXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7U2Nyb2xsVmlld30gc2Nyb2xsVmlldyAtIFRoZSBTY3JvbGxWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBzY3JvbGwtdG8tYm90dG9tXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7U2Nyb2xsVmlld30gc2Nyb2xsVmlldyAtIFRoZSBTY3JvbGxWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBzY3JvbGwtdG8tbGVmdFxyXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxyXG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgc2Nyb2xsLXRvLXJpZ2h0XHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7U2Nyb2xsVmlld30gc2Nyb2xsVmlldyAtIFRoZSBTY3JvbGxWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBzY3JvbGxpbmdcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGJvdW5jZS1ib3R0b21cclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGJvdW5jZS10b3BcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IGJvdW5jZS1sZWZ0XHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7U2Nyb2xsVmlld30gc2Nyb2xsVmlldyAtIFRoZSBTY3JvbGxWaWV3IGNvbXBvbmVudC5cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBib3VuY2UtcmlnaHRcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cclxuICogISN6aFxyXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcclxuICogQGV2ZW50IHNjcm9sbC1lbmRlZFxyXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxyXG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgdG91Y2gtdXBcclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbiAvKipcclxuICogISNlblxyXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXHJcbiAqICEjemhcclxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXHJcbiAqIEBldmVudCBzY3JvbGwtYmVnYW5cclxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcclxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxyXG4gKi9cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=