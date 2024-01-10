
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCPageView.js';
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

/**
 * !#en The Page View Size Mode
 * !#zh 页面视图每个页面统一的大小类型
 * @enum PageView.SizeMode
 */
var SizeMode = cc.Enum({
  /**
   * !#en Each page is unified in size
   * !#zh 每个页面统一大小
   * @property {Number} Unified
   */
  Unified: 0,

  /**
   * !#en Each page is in free size
   * !#zh 每个页面大小随意
   * @property {Number} Free
   */
  Free: 1
});
/**
 * !#en The Page View Direction
 * !#zh 页面视图滚动类型
 * @enum PageView.Direction
 */

var Direction = cc.Enum({
  /**
   * !#en Horizontal scroll.
   * !#zh 水平滚动
   * @property {Number} Horizontal
   */
  Horizontal: 0,

  /**
   * !#en Vertical scroll.
   * !#zh 垂直滚动
   * @property {Number} Vertical
   */
  Vertical: 1
});
/**
 * !#en Enum for ScrollView event type.
 * !#zh 滚动视图事件类型
 * @enum PageView.EventType
 */

var EventType = cc.Enum({
  /**
   * !#en The page turning event
   * !#zh 翻页事件
   * @property {Number} PAGE_TURNING
   */
  PAGE_TURNING: 0
});
/**
 * !#en The PageView control
 * !#zh 页面视图组件
 * @class PageView
 * @extends ScrollView
 */

var PageView = cc.Class({
  name: 'cc.PageView',
  "extends": cc.ScrollView,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PageView',
    help: 'i18n:COMPONENT.help_url.pageview',
    inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
    executeInEditMode: false
  },
  ctor: function ctor() {
    this._curPageIdx = 0;
    this._lastPageIdx = 0;
    this._pages = [];
    this._initContentPos = cc.v2();
    this._scrollCenterOffsetX = []; // 每一个页面居中时需要的偏移量（X）

    this._scrollCenterOffsetY = []; // 每一个页面居中时需要的偏移量（Y）
  },
  properties: {
    /**
     * !#en Specify the size type of each page in PageView.
     * !#zh 页面视图中每个页面大小类型
     * @property {PageView.SizeMode} sizeMode
     */
    sizeMode: {
      "default": SizeMode.Unified,
      type: SizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.sizeMode',
      notify: function notify() {
        this._syncSizeMode();
      }
    },

    /**
     * !#en The page view direction
     * !#zh 页面视图滚动类型
     * @property {PageView.Direction} direction
     */
    direction: {
      "default": Direction.Horizontal,
      type: Direction,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.direction',
      notify: function notify() {
        this._syncScrollDirection();
      }
    },

    /**
     * !#en
     * The scroll threshold value, when drag exceeds this value,
     * release the next page will automatically scroll, less than the restore
     * !#zh 滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原。
     * @property {Number} scrollThreshold
     */
    scrollThreshold: {
      "default": 0.5,
      type: cc.Float,
      slide: true,
      range: [0, 1, 0.01],
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.scrollThreshold'
    },

    /**
     * !#en
     * Auto page turning velocity threshold. When users swipe the PageView quickly,
     * it will calculate a velocity based on the scroll distance and time,
     * if the calculated velocity is larger than the threshold, then it will trigger page turning.
     * !#zh
     * 快速滑动翻页临界值。
     * 当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，
     * 该值与此临界值相比较，如果大于临界值，则进行自动翻页。
     * @property {Number} autoPageTurningThreshold
     */
    autoPageTurningThreshold: {
      "default": 100,
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.autoPageTurningThreshold'
    },

    /**
     * !#en Change the PageTurning event timing of PageView.
     * !#zh 设置 PageView PageTurning 事件的发送时机。
     * @property {Number} pageTurningEventTiming
     */
    pageTurningEventTiming: {
      "default": 0.1,
      type: cc.Float,
      range: [0, 1, 0.01],
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageTurningEventTiming'
    },

    /**
     * !#en The Page View Indicator
     * !#zh 页面视图指示器组件
     * @property {PageViewIndicator} indicator
     */
    indicator: {
      "default": null,
      type: cc.PageViewIndicator,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.indicator',
      notify: function notify() {
        if (this.indicator) {
          this.indicator.setPageView(this);
        }
      }
    },

    /**
     * !#en The time required to turn over a page. unit: second
     * !#zh 每个页面翻页时所需时间。单位：秒
     * @property {Number} pageTurningSpeed
     */
    pageTurningSpeed: {
      "default": 0.3,
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageTurningSpeed'
    },

    /**
     * !#en PageView events callback
     * !#zh 滚动视图的事件回调函数
     * @property {Component.EventHandler[]} pageEvents
     */
    pageEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageEvents'
    }
  },
  statics: {
    SizeMode: SizeMode,
    Direction: Direction,
    EventType: EventType
  },
  onEnable: function onEnable() {
    this._super();

    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateAllPagesSize, this);

    if (!CC_EDITOR) {
      this.node.on('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
    }
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateAllPagesSize, this);

    if (!CC_EDITOR) {
      this.node.off('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
    }
  },
  onLoad: function onLoad() {
    this._initPages();

    if (this.indicator) {
      this.indicator.setPageView(this);
    }
  },

  /**
   * !#en Returns current page index
   * !#zh 返回当前页面索引
   * @method getCurrentPageIndex
   * @returns {Number}
   */
  getCurrentPageIndex: function getCurrentPageIndex() {
    return this._curPageIdx;
  },

  /**
   * !#en Set current page index
   * !#zh 设置当前页面索引
   * @method setCurrentPageIndex
   * @param {Number} index
   */
  setCurrentPageIndex: function setCurrentPageIndex(index) {
    this.scrollToPage(index, true);
  },

  /**
   * !#en Returns all pages of pageview
   * !#zh 返回视图中的所有页面
   * @method getPages
   * @returns {Node[]}
   */
  getPages: function getPages() {
    return this._pages;
  },

  /**
   * !#en At the end of the current page view to insert a new view
   * !#zh 在当前页面视图的尾部插入一个新视图
   * @method addPage
   * @param {Node} page
   */
  addPage: function addPage(page) {
    if (!page || this._pages.indexOf(page) !== -1 || !this.content) return;
    this.content.addChild(page);

    this._pages.push(page);

    this._updatePageView();
  },

  /**
   * !#en Inserts a page in the specified location
   * !#zh 将页面插入指定位置中
   * @method insertPage
   * @param {Node} page
   * @param {Number} index
   */
  insertPage: function insertPage(page, index) {
    if (index < 0 || !page || this._pages.indexOf(page) !== -1 || !this.content) return;
    var pageCount = this._pages.length;
    if (index >= pageCount) this.addPage(page);else {
      this._pages.splice(index, 0, page);

      this.content.addChild(page);

      this._updatePageView();
    }
  },

  /**
   * !#en Removes a page from PageView.
   * !#zh 移除指定页面
   * @method removePage
   * @param {Node} page
   */
  removePage: function removePage(page) {
    if (!page || !this.content) return;

    var index = this._pages.indexOf(page);

    if (index === -1) {
      cc.warnID(4300, page.name);
      return;
    }

    this.removePageAtIndex(index);
  },

  /**
   * !#en Removes a page at index of PageView.
   * !#zh 移除指定下标的页面
   * @method removePageAtIndex
   * @param {Number} index
   */
  removePageAtIndex: function removePageAtIndex(index) {
    var pageList = this._pages;
    if (index < 0 || index >= pageList.length) return;
    var page = pageList[index];
    if (!page) return;
    this.content.removeChild(page);
    pageList.splice(index, 1);

    this._updatePageView();
  },

  /**
   * !#en Removes all pages from PageView
   * !#zh 移除所有页面
   * @method removeAllPages
   */
  removeAllPages: function removeAllPages() {
    if (!this.content) {
      return;
    }

    var locPages = this._pages;

    for (var i = 0, len = locPages.length; i < len; i++) {
      this.content.removeChild(locPages[i]);
    }

    this._pages.length = 0;

    this._updatePageView();
  },

  /**
   * !#en Scroll PageView to index.
   * !#zh 滚动到指定页面
   * @method scrollToPage
   * @param {Number} idx index of page.
   * @param {Number} timeInSecond scrolling time
   */
  scrollToPage: function scrollToPage(idx, timeInSecond) {
    if (idx < 0 || idx >= this._pages.length) return;
    timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
    this._curPageIdx = idx;
    this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

    if (this.indicator) {
      this.indicator._changedState();
    }
  },
  //override the method of ScrollView
  getScrollEndedEventTiming: function getScrollEndedEventTiming() {
    return this.pageTurningEventTiming;
  },
  _syncScrollDirection: function _syncScrollDirection() {
    this.horizontal = this.direction === Direction.Horizontal;
    this.vertical = this.direction === Direction.Vertical;
  },
  _syncSizeMode: function _syncSizeMode() {
    if (!this.content) {
      return;
    }

    var layout = this.content.getComponent(cc.Layout);

    if (layout) {
      if (this.sizeMode === SizeMode.Free && this._pages.length > 0) {
        var lastPage = this._pages[this._pages.length - 1];

        if (this.direction === Direction.Horizontal) {
          layout.paddingLeft = (this._view.width - this._pages[0].width) / 2;
          layout.paddingRight = (this._view.width - lastPage.width) / 2;
        } else if (this.direction === Direction.Vertical) {
          layout.paddingTop = (this._view.height - this._pages[0].height) / 2;
          layout.paddingBottom = (this._view.height - lastPage.height) / 2;
        }
      }

      layout.updateLayout();
    }
  },
  // 刷新页面视图
  _updatePageView: function _updatePageView() {
    // 当页面数组变化时修改 content 大小
    var layout = this.content.getComponent(cc.Layout);

    if (layout && layout.enabled) {
      layout.updateLayout();
    }

    var pageCount = this._pages.length;

    if (this._curPageIdx >= pageCount) {
      this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
      this._lastPageIdx = this._curPageIdx;
    } // 进行排序


    var contentPos = this._initContentPos;

    for (var i = 0; i < pageCount; ++i) {
      var page = this._pages[i];
      page.setSiblingIndex(i);

      if (this.direction === Direction.Horizontal) {
        this._scrollCenterOffsetX[i] = Math.abs(contentPos.x + page.x);
      } else {
        this._scrollCenterOffsetY[i] = Math.abs(contentPos.y + page.y);
      }
    } // 刷新 indicator 信息与状态


    if (this.indicator) {
      this.indicator._refresh();
    }
  },
  // 刷新所有页面的大小
  _updateAllPagesSize: function _updateAllPagesSize() {
    if (this.sizeMode !== SizeMode.Unified || !this._view) {
      return;
    }

    var locPages = CC_EDITOR ? this.content.children : this._pages;

    var selfSize = this._view.getContentSize();

    for (var i = 0, len = locPages.length; i < len; i++) {
      locPages[i].setContentSize(selfSize);
    }
  },
  // 初始化页面
  _initPages: function _initPages() {
    if (!this.content) {
      return;
    }

    this._initContentPos = this.content.position;
    var children = this.content.children;

    for (var i = 0; i < children.length; ++i) {
      var page = children[i];

      if (this._pages.indexOf(page) >= 0) {
        continue;
      }

      this._pages.push(page);
    }

    this._syncScrollDirection();

    this._syncSizeMode();

    this._updatePageView();
  },
  _dispatchPageTurningEvent: function _dispatchPageTurningEvent() {
    if (this._lastPageIdx === this._curPageIdx) return;
    this._lastPageIdx = this._curPageIdx;
    cc.Component.EventHandler.emitEvents(this.pageEvents, this, EventType.PAGE_TURNING);
    this.node.emit('page-turning', this);
  },
  // 是否超过自动滚动临界值
  _isScrollable: function _isScrollable(offset, index, nextIndex) {
    if (this.sizeMode === SizeMode.Free) {
      var curPageCenter, nextPageCenter;

      if (this.direction === Direction.Horizontal) {
        curPageCenter = this._scrollCenterOffsetX[index];
        nextPageCenter = this._scrollCenterOffsetX[nextIndex];
        return Math.abs(offset.x) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        curPageCenter = this._scrollCenterOffsetY[index];
        nextPageCenter = this._scrollCenterOffsetY[nextIndex];
        return Math.abs(offset.y) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      }
    } else {
      if (this.direction === Direction.Horizontal) {
        return Math.abs(offset.x) >= this._view.width * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        return Math.abs(offset.y) >= this._view.height * this.scrollThreshold;
      }
    }
  },
  // 快速滑动
  _isQuicklyScrollable: function _isQuicklyScrollable(touchMoveVelocity) {
    if (this.direction === Direction.Horizontal) {
      if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
        return true;
      }
    } else if (this.direction === Direction.Vertical) {
      if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
        return true;
      }
    }

    return false;
  },
  // 通过 idx 获取偏移值数值
  _moveOffsetValue: function _moveOffsetValue(idx) {
    var offset = cc.v2(0, 0);

    if (this.sizeMode === SizeMode.Free) {
      if (this.direction === Direction.Horizontal) {
        offset.x = this._scrollCenterOffsetX[idx];
      } else if (this.direction === Direction.Vertical) {
        offset.y = this._scrollCenterOffsetY[idx];
      }
    } else {
      if (this.direction === Direction.Horizontal) {
        offset.x = idx * this._view.width;
      } else if (this.direction === Direction.Vertical) {
        offset.y = idx * this._view.height;
      }
    }

    return offset;
  },
  _getDragDirection: function _getDragDirection(moveOffset) {
    if (this.direction === Direction.Horizontal) {
      if (moveOffset.x === 0) {
        return 0;
      }

      return moveOffset.x > 0 ? 1 : -1;
    } else if (this.direction === Direction.Vertical) {
      // 由于滚动 Y 轴的原点在在右上角所以应该是小于 0
      if (moveOffset.y === 0) {
        return 0;
      }

      return moveOffset.y < 0 ? 1 : -1;
    }
  },
  _handleReleaseLogic: function _handleReleaseLogic(touch) {
    this._autoScrollToPage();

    if (this._scrolling) {
      this._scrolling = false;

      if (!this._autoScrolling) {
        this._dispatchEvent('scroll-ended');
      }
    }
  },
  _autoScrollToPage: function _autoScrollToPage() {
    var bounceBackStarted = this._startBounceBackIfNeeded();

    if (bounceBackStarted) {
      var bounceBackAmount = this._getHowMuchOutOfBoundary();

      bounceBackAmount = this._clampDelta(bounceBackAmount);

      if (bounceBackAmount.x > 0 || bounceBackAmount.y < 0) {
        this._curPageIdx = this._pages.length === 0 ? 0 : this._pages.length - 1;
      }

      if (bounceBackAmount.x < 0 || bounceBackAmount.y > 0) {
        this._curPageIdx = 0;
      }

      if (this.indicator) {
        this.indicator._changedState();
      }
    } else {
      var moveOffset = this._touchBeganPosition.sub(this._touchEndPosition);

      var index = this._curPageIdx,
          nextIndex = index + this._getDragDirection(moveOffset);

      var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

      if (nextIndex < this._pages.length) {
        if (this._isScrollable(moveOffset, index, nextIndex)) {
          this.scrollToPage(nextIndex, timeInSecond);
          return;
        } else {
          var touchMoveVelocity = this._calculateTouchMoveVelocity();

          if (this._isQuicklyScrollable(touchMoveVelocity)) {
            this.scrollToPage(nextIndex, timeInSecond);
            return;
          }
        }
      }

      this.scrollToPage(index, timeInSecond);
    }
  },
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    this._touchBeganPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    this._super(event, captureListeners);
  },
  _onTouchEnded: function _onTouchEnded(event, captureListeners) {
    this._touchEndPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onTouchCancelled: function _onTouchCancelled(event, captureListeners) {
    this._touchEndPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onMouseWheel: function _onMouseWheel() {}
});
cc.PageView = module.exports = PageView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event page-turning
 * @param {Event.EventCustom} event
 * @param {PageView} pageView - The PageView component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDUGFnZVZpZXcuanMiXSwibmFtZXMiOlsiU2l6ZU1vZGUiLCJjYyIsIkVudW0iLCJVbmlmaWVkIiwiRnJlZSIsIkRpcmVjdGlvbiIsIkhvcml6b250YWwiLCJWZXJ0aWNhbCIsIkV2ZW50VHlwZSIsIlBBR0VfVFVSTklORyIsIlBhZ2VWaWV3IiwiQ2xhc3MiLCJuYW1lIiwiU2Nyb2xsVmlldyIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJjdG9yIiwiX2N1clBhZ2VJZHgiLCJfbGFzdFBhZ2VJZHgiLCJfcGFnZXMiLCJfaW5pdENvbnRlbnRQb3MiLCJ2MiIsIl9zY3JvbGxDZW50ZXJPZmZzZXRYIiwiX3Njcm9sbENlbnRlck9mZnNldFkiLCJwcm9wZXJ0aWVzIiwic2l6ZU1vZGUiLCJ0eXBlIiwidG9vbHRpcCIsIkNDX0RFViIsIm5vdGlmeSIsIl9zeW5jU2l6ZU1vZGUiLCJkaXJlY3Rpb24iLCJfc3luY1Njcm9sbERpcmVjdGlvbiIsInNjcm9sbFRocmVzaG9sZCIsIkZsb2F0Iiwic2xpZGUiLCJyYW5nZSIsImF1dG9QYWdlVHVybmluZ1RocmVzaG9sZCIsInBhZ2VUdXJuaW5nRXZlbnRUaW1pbmciLCJpbmRpY2F0b3IiLCJQYWdlVmlld0luZGljYXRvciIsInNldFBhZ2VWaWV3IiwicGFnZVR1cm5pbmdTcGVlZCIsInBhZ2VFdmVudHMiLCJDb21wb25lbnQiLCJFdmVudEhhbmRsZXIiLCJzdGF0aWNzIiwib25FbmFibGUiLCJfc3VwZXIiLCJub2RlIiwib24iLCJOb2RlIiwiU0laRV9DSEFOR0VEIiwiX3VwZGF0ZUFsbFBhZ2VzU2l6ZSIsIl9kaXNwYXRjaFBhZ2VUdXJuaW5nRXZlbnQiLCJvbkRpc2FibGUiLCJvZmYiLCJvbkxvYWQiLCJfaW5pdFBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VJbmRleCIsInNldEN1cnJlbnRQYWdlSW5kZXgiLCJpbmRleCIsInNjcm9sbFRvUGFnZSIsImdldFBhZ2VzIiwiYWRkUGFnZSIsInBhZ2UiLCJpbmRleE9mIiwiY29udGVudCIsImFkZENoaWxkIiwicHVzaCIsIl91cGRhdGVQYWdlVmlldyIsImluc2VydFBhZ2UiLCJwYWdlQ291bnQiLCJsZW5ndGgiLCJzcGxpY2UiLCJyZW1vdmVQYWdlIiwid2FybklEIiwicmVtb3ZlUGFnZUF0SW5kZXgiLCJwYWdlTGlzdCIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsUGFnZXMiLCJsb2NQYWdlcyIsImkiLCJsZW4iLCJpZHgiLCJ0aW1lSW5TZWNvbmQiLCJ1bmRlZmluZWQiLCJzY3JvbGxUb09mZnNldCIsIl9tb3ZlT2Zmc2V0VmFsdWUiLCJfY2hhbmdlZFN0YXRlIiwiZ2V0U2Nyb2xsRW5kZWRFdmVudFRpbWluZyIsImhvcml6b250YWwiLCJ2ZXJ0aWNhbCIsImxheW91dCIsImdldENvbXBvbmVudCIsIkxheW91dCIsImxhc3RQYWdlIiwicGFkZGluZ0xlZnQiLCJfdmlldyIsIndpZHRoIiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ1RvcCIsImhlaWdodCIsInBhZGRpbmdCb3R0b20iLCJ1cGRhdGVMYXlvdXQiLCJlbmFibGVkIiwiY29udGVudFBvcyIsInNldFNpYmxpbmdJbmRleCIsIk1hdGgiLCJhYnMiLCJ4IiwieSIsIl9yZWZyZXNoIiwiY2hpbGRyZW4iLCJzZWxmU2l6ZSIsImdldENvbnRlbnRTaXplIiwic2V0Q29udGVudFNpemUiLCJwb3NpdGlvbiIsImVtaXRFdmVudHMiLCJlbWl0IiwiX2lzU2Nyb2xsYWJsZSIsIm9mZnNldCIsIm5leHRJbmRleCIsImN1clBhZ2VDZW50ZXIiLCJuZXh0UGFnZUNlbnRlciIsIl9pc1F1aWNrbHlTY3JvbGxhYmxlIiwidG91Y2hNb3ZlVmVsb2NpdHkiLCJfZ2V0RHJhZ0RpcmVjdGlvbiIsIm1vdmVPZmZzZXQiLCJfaGFuZGxlUmVsZWFzZUxvZ2ljIiwidG91Y2giLCJfYXV0b1Njcm9sbFRvUGFnZSIsIl9zY3JvbGxpbmciLCJfYXV0b1Njcm9sbGluZyIsIl9kaXNwYXRjaEV2ZW50IiwiYm91bmNlQmFja1N0YXJ0ZWQiLCJfc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQiLCJib3VuY2VCYWNrQW1vdW50IiwiX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5IiwiX2NsYW1wRGVsdGEiLCJfdG91Y2hCZWdhblBvc2l0aW9uIiwic3ViIiwiX3RvdWNoRW5kUG9zaXRpb24iLCJfY2FsY3VsYXRlVG91Y2hNb3ZlVmVsb2NpdHkiLCJfb25Ub3VjaEJlZ2FuIiwiZXZlbnQiLCJjYXB0dXJlTGlzdGVuZXJzIiwiZ2V0TG9jYXRpb24iLCJfb25Ub3VjaE1vdmVkIiwiX29uVG91Y2hFbmRlZCIsIl9vblRvdWNoQ2FuY2VsbGVkIiwiX29uTW91c2VXaGVlbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUEsUUFBUSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNuQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLE9BQU8sRUFBRSxDQU5VOztBQU9uQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRTtBQVphLENBQVIsQ0FBZjtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHSixFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNwQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lJLEVBQUFBLFVBQVUsRUFBRSxDQU5ROztBQU9wQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFFBQVEsRUFBRTtBQVpVLENB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QUtuRyxNQUFMLENBQVlpRyxLQUFaLEVBQW1CQyxnQkFBbkI7QUFDSCxHQTlmbUI7QUFnZ0JwQkUsRUFBQUEsYUFBYSxFQUFFLHVCQUFVSCxLQUFWLEVBQWlCQyxnQkFBakIsRUFBbUM7QUFDOUMsU0FBS2xHLE1BQUwsQ0FBWWlHLEtBQVosRUFBbUJDLGdCQUFuQjtBQUNILEdBbGdCbUI7QUFvZ0JwQkcsRUFBQUEsYUFBYSxFQUFFLHVCQUFVSixLQUFWLEVBQWlCQyxnQkFBakIsRUFBbUM7QUFDOUMsU0FBS0osaUJBQUwsR0FBeUJHLEtBQUssQ0FBQ2YsS0FBTixDQUFZaUIsV0FBWixFQUF6Qjs7QUFDQSxTQUFLbkcsTUFBTCxDQUFZaUcsS0FBWixFQUFtQkMsZ0JBQW5CO0FBQ0gsR0F2Z0JtQjtBQXlnQnBCSSxFQUFBQSxpQkFBaUIsRUFBRSwyQkFBVUwsS0FBVixFQUFpQkMsZ0JBQWpCLEVBQW1DO0FBQ2xELFNBQUtKLGlCQUFMLEdBQXlCRyxLQUFLLENBQUNmLEtBQU4sQ0FBWWlCLFdBQVosRUFBekI7O0FBQ0EsU0FBS25HLE1BQUwsQ0FBWWlHLEtBQVosRUFBbUJDLGdCQUFuQjtBQUNILEdBNWdCbUI7QUE4Z0JwQkssRUFBQUEsYUFBYSxFQUFFLHlCQUFZLENBQUc7QUE5Z0JWLENBQVQsQ0FBZjtBQWloQkExSixFQUFFLENBQUNTLFFBQUgsR0FBY2tKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5KLFFBQS9CO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBUaGUgUGFnZSBWaWV3IFNpemUgTW9kZVxyXG4gKiAhI3poIOmhtemdouinhuWbvuavj+S4qumhtemdoue7n+S4gOeahOWkp+Wwj+exu+Wei1xyXG4gKiBAZW51bSBQYWdlVmlldy5TaXplTW9kZVxyXG4gKi9cclxudmFyIFNpemVNb2RlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFjaCBwYWdlIGlzIHVuaWZpZWQgaW4gc2l6ZVxyXG4gICAgICogISN6aCDmr4/kuKrpobXpnaLnu5/kuIDlpKflsI9cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBVbmlmaWVkXHJcbiAgICAgKi9cclxuICAgIFVuaWZpZWQ6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRWFjaCBwYWdlIGlzIGluIGZyZWUgc2l6ZVxyXG4gICAgICogISN6aCDmr4/kuKrpobXpnaLlpKflsI/pmo/mhI9cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGcmVlXHJcbiAgICAgKi9cclxuICAgIEZyZWU6IDFcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgUGFnZSBWaWV3IERpcmVjdGlvblxyXG4gKiAhI3poIOmhtemdouinhuWbvua7muWKqOexu+Wei1xyXG4gKiBAZW51bSBQYWdlVmlldy5EaXJlY3Rpb25cclxuICovXHJcbnZhciBEaXJlY3Rpb24gPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBIb3Jpem9udGFsIHNjcm9sbC5cclxuICAgICAqICEjemgg5rC05bmz5rua5YqoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSG9yaXpvbnRhbFxyXG4gICAgICovXHJcbiAgICBIb3Jpem9udGFsOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFZlcnRpY2FsIHNjcm9sbC5cclxuICAgICAqICEjemgg5Z6C55u05rua5YqoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVmVydGljYWxcclxuICAgICAqL1xyXG4gICAgVmVydGljYWw6IDFcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBTY3JvbGxWaWV3IGV2ZW50IHR5cGUuXHJcbiAqICEjemgg5rua5Yqo6KeG5Zu+5LqL5Lu257G75Z6LXHJcbiAqIEBlbnVtIFBhZ2VWaWV3LkV2ZW50VHlwZVxyXG4gKi9cclxudmFyIEV2ZW50VHlwZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBwYWdlIHR1cm5pbmcgZXZlbnRcclxuICAgICAqICEjemgg57+76aG15LqL5Lu2XHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEFHRV9UVVJOSU5HXHJcbiAgICAgKi9cclxuICAgIFBBR0VfVFVSTklORzogMFxyXG5cclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBUaGUgUGFnZVZpZXcgY29udHJvbFxyXG4gKiAhI3poIOmhtemdouinhuWbvue7hOS7tlxyXG4gKiBAY2xhc3MgUGFnZVZpZXdcclxuICogQGV4dGVuZHMgU2Nyb2xsVmlld1xyXG4gKi9cclxudmFyIFBhZ2VWaWV3ID0gY2MuQ2xhc3Moe1xyXG4gICAgbmFtZTogJ2NjLlBhZ2VWaWV3JyxcclxuICAgIGV4dGVuZHM6IGNjLlNjcm9sbFZpZXcsXHJcblxyXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xyXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvUGFnZVZpZXcnLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5wYWdldmlldycsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9jY3BhZ2V2aWV3LmpzJyxcclxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogZmFsc2VcclxuICAgIH0sXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX2xhc3RQYWdlSWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9wYWdlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2luaXRDb250ZW50UG9zID0gY2MudjIoKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRYID0gW107IC8vIOavj+S4gOS4qumhtemdouWxheS4reaXtumcgOimgeeahOWBj+enu+mHj++8iFjvvIlcclxuICAgICAgICB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRZID0gW107IC8vIOavj+S4gOS4qumhtemdouWxheS4reaXtumcgOimgeeahOWBj+enu+mHj++8iFnvvIlcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIHNpemUgdHlwZSBvZiBlYWNoIHBhZ2UgaW4gUGFnZVZpZXcuXHJcbiAgICAgICAgICogISN6aCDpobXpnaLop4blm77kuK3mr4/kuKrpobXpnaLlpKflsI/nsbvlnotcclxuICAgICAgICAgKiBAcHJvcGVydHkge1BhZ2VWaWV3LlNpemVNb2RlfSBzaXplTW9kZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNpemVNb2RlOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFNpemVNb2RlLlVuaWZpZWQsXHJcbiAgICAgICAgICAgIHR5cGU6IFNpemVNb2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LnNpemVNb2RlJyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N5bmNTaXplTW9kZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgcGFnZSB2aWV3IGRpcmVjdGlvblxyXG4gICAgICAgICAqICEjemgg6aG16Z2i6KeG5Zu+5rua5Yqo57G75Z6LXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtQYWdlVmlldy5EaXJlY3Rpb259IGRpcmVjdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGRpcmVjdGlvbjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBEaXJlY3Rpb24uSG9yaXpvbnRhbCxcclxuICAgICAgICAgICAgdHlwZTogRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LmRpcmVjdGlvbicsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zeW5jU2Nyb2xsRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVGhlIHNjcm9sbCB0aHJlc2hvbGQgdmFsdWUsIHdoZW4gZHJhZyBleGNlZWRzIHRoaXMgdmFsdWUsXHJcbiAgICAgICAgICogcmVsZWFzZSB0aGUgbmV4dCBwYWdlIHdpbGwgYXV0b21hdGljYWxseSBzY3JvbGwsIGxlc3MgdGhhbiB0aGUgcmVzdG9yZVxyXG4gICAgICAgICAqICEjemgg5rua5Yqo5Li055WM5YC877yM6buY6K6k5Y2V5L2N55m+5YiG5q+U77yM5b2T5ouW5ou96LaF5Ye66K+l5pWw5YC85pe277yM5p2+5byA5Lya6Ieq5Yqo5rua5Yqo5LiL5LiA6aG177yM5bCP5LqO5pe25YiZ6L+Y5Y6f44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNjcm9sbFRocmVzaG9sZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNjcm9sbFRocmVzaG9sZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAwLjUsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgICAgICBzbGlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgcmFuZ2U6IFswLCAxLCAwLjAxXSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5zY3JvbGxUaHJlc2hvbGQnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEF1dG8gcGFnZSB0dXJuaW5nIHZlbG9jaXR5IHRocmVzaG9sZC4gV2hlbiB1c2VycyBzd2lwZSB0aGUgUGFnZVZpZXcgcXVpY2tseSxcclxuICAgICAgICAgKiBpdCB3aWxsIGNhbGN1bGF0ZSBhIHZlbG9jaXR5IGJhc2VkIG9uIHRoZSBzY3JvbGwgZGlzdGFuY2UgYW5kIHRpbWUsXHJcbiAgICAgICAgICogaWYgdGhlIGNhbGN1bGF0ZWQgdmVsb2NpdHkgaXMgbGFyZ2VyIHRoYW4gdGhlIHRocmVzaG9sZCwgdGhlbiBpdCB3aWxsIHRyaWdnZXIgcGFnZSB0dXJuaW5nLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlv6vpgJ/mu5Hliqjnv7vpobXkuLTnlYzlgLzjgIJcclxuICAgICAgICAgKiDlvZPnlKjmiLflv6vpgJ/mu5Hliqjml7bvvIzkvJrmoLnmja7mu5HliqjlvIDlp4vlkoznu5PmnZ/nmoTot53nprvkuI7ml7bpl7TorqHnrpflh7rkuIDkuKrpgJ/luqblgLzvvIxcclxuICAgICAgICAgKiDor6XlgLzkuI7mraTkuLTnlYzlgLznm7jmr5TovoPvvIzlpoLmnpzlpKfkuo7kuLTnlYzlgLzvvIzliJnov5vooYzoh6rliqjnv7vpobXjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEwMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFnZXZpZXcuYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gQ2hhbmdlIHRoZSBQYWdlVHVybmluZyBldmVudCB0aW1pbmcgb2YgUGFnZVZpZXcuXHJcbiAgICAgICAgICogISN6aCDorr7nva4gUGFnZVZpZXcgUGFnZVR1cm5pbmcg5LqL5Lu255qE5Y+R6YCB5pe25py644CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhZ2VUdXJuaW5nRXZlbnRUaW1pbmdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYWdlVHVybmluZ0V2ZW50VGltaW5nOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuMSxcclxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXHJcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMSwgMC4wMV0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFnZXZpZXcucGFnZVR1cm5pbmdFdmVudFRpbWluZydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBQYWdlIFZpZXcgSW5kaWNhdG9yXHJcbiAgICAgICAgICogISN6aCDpobXpnaLop4blm77mjIfnpLrlmajnu4Tku7ZcclxuICAgICAgICAgKiBAcHJvcGVydHkge1BhZ2VWaWV3SW5kaWNhdG9yfSBpbmRpY2F0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbmRpY2F0b3I6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUGFnZVZpZXdJbmRpY2F0b3IsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFnZXZpZXcuaW5kaWNhdG9yJyxcclxuICAgICAgICAgICAgbm90aWZ5OiAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvci5zZXRQYWdlVmlldyh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHRpbWUgcmVxdWlyZWQgdG8gdHVybiBvdmVyIGEgcGFnZS4gdW5pdDogc2Vjb25kXHJcbiAgICAgICAgICogISN6aCDmr4/kuKrpobXpnaLnv7vpobXml7bmiYDpnIDml7bpl7TjgILljZXkvY3vvJrnp5JcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFnZVR1cm5pbmdTcGVlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhZ2VUdXJuaW5nU3BlZWQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMC4zLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5wYWdlVHVybmluZ1NwZWVkJ1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gUGFnZVZpZXcgZXZlbnRzIGNhbGxiYWNrXHJcbiAgICAgICAgICogISN6aCDmu5rliqjop4blm77nmoTkuovku7blm57osIPlh73mlbBcclxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gcGFnZUV2ZW50c1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhZ2VFdmVudHM6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFnZXZpZXcucGFnZUV2ZW50cydcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXRpY3M6IHtcclxuICAgICAgICBTaXplTW9kZTogU2l6ZU1vZGUsXHJcbiAgICAgICAgRGlyZWN0aW9uOiBEaXJlY3Rpb24sXHJcbiAgICAgICAgRXZlbnRUeXBlOiBFdmVudFR5cGVcclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIHRoaXMuX3VwZGF0ZUFsbFBhZ2VzU2l6ZSwgdGhpcyk7XHJcbiAgICAgICAgaWYoIUNDX0VESVRPUikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub24oJ3Njcm9sbC1lbmRlZC13aXRoLXRocmVzaG9sZCcsIHRoaXMuX2Rpc3BhdGNoUGFnZVR1cm5pbmdFdmVudCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLl91cGRhdGVBbGxQYWdlc1NpemUsIHRoaXMpO1xyXG4gICAgICAgIGlmKCFDQ19FRElUT1IpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZignc2Nyb2xsLWVuZGVkLXdpdGgtdGhyZXNob2xkJywgdGhpcy5fZGlzcGF0Y2hQYWdlVHVybmluZ0V2ZW50LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2luaXRQYWdlcygpO1xyXG4gICAgICAgIGlmICh0aGlzLmluZGljYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLmluZGljYXRvci5zZXRQYWdlVmlldyh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZXR1cm5zIGN1cnJlbnQgcGFnZSBpbmRleFxyXG4gICAgICogISN6aCDov5Tlm57lvZPliY3pobXpnaLntKLlvJVcclxuICAgICAqIEBtZXRob2QgZ2V0Q3VycmVudFBhZ2VJbmRleFxyXG4gICAgICogQHJldHVybnMge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0Q3VycmVudFBhZ2VJbmRleDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJQYWdlSWR4O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gU2V0IGN1cnJlbnQgcGFnZSBpbmRleFxyXG4gICAgICogISN6aCDorr7nva7lvZPliY3pobXpnaLntKLlvJVcclxuICAgICAqIEBtZXRob2Qgc2V0Q3VycmVudFBhZ2VJbmRleFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAgICAgKi9cclxuICAgIHNldEN1cnJlbnRQYWdlSW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9QYWdlKGluZGV4LCB0cnVlKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJldHVybnMgYWxsIHBhZ2VzIG9mIHBhZ2V2aWV3XHJcbiAgICAgKiAhI3poIOi/lOWbnuinhuWbvuS4reeahOaJgOaciemhtemdolxyXG4gICAgICogQG1ldGhvZCBnZXRQYWdlc1xyXG4gICAgICogQHJldHVybnMge05vZGVbXX1cclxuICAgICAqL1xyXG4gICAgZ2V0UGFnZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBBdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHBhZ2UgdmlldyB0byBpbnNlcnQgYSBuZXcgdmlld1xyXG4gICAgICogISN6aCDlnKjlvZPliY3pobXpnaLop4blm77nmoTlsL7pg6jmj5LlhaXkuIDkuKrmlrDop4blm75cclxuICAgICAqIEBtZXRob2QgYWRkUGFnZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXHJcbiAgICAgKi9cclxuICAgIGFkZFBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgaWYgKCFwYWdlIHx8IHRoaXMuX3BhZ2VzLmluZGV4T2YocGFnZSkgIT09IC0xIHx8ICF0aGlzLmNvbnRlbnQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQocGFnZSk7XHJcbiAgICAgICAgdGhpcy5fcGFnZXMucHVzaChwYWdlKTtcclxuICAgICAgICB0aGlzLl91cGRhdGVQYWdlVmlldygpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSW5zZXJ0cyBhIHBhZ2UgaW4gdGhlIHNwZWNpZmllZCBsb2NhdGlvblxyXG4gICAgICogISN6aCDlsIbpobXpnaLmj5LlhaXmjIflrprkvY3nva7kuK1cclxuICAgICAqIEBtZXRob2QgaW5zZXJ0UGFnZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0UGFnZTogZnVuY3Rpb24gKHBhZ2UsIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCAhcGFnZSB8fCB0aGlzLl9wYWdlcy5pbmRleE9mKHBhZ2UpICE9PSAtMSB8fCAhdGhpcy5jb250ZW50KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIHBhZ2VDb3VudCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcclxuICAgICAgICBpZiAoaW5kZXggPj0gcGFnZUNvdW50KVxyXG4gICAgICAgICAgICB0aGlzLmFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VzLnNwbGljZShpbmRleCwgMCwgcGFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChwYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlUGFnZVZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGEgcGFnZSBmcm9tIFBhZ2VWaWV3LlxyXG4gICAgICogISN6aCDnp7vpmaTmjIflrprpobXpnaJcclxuICAgICAqIEBtZXRob2QgcmVtb3ZlUGFnZVxyXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XHJcbiAgICAgICAgaWYgKCFwYWdlIHx8ICF0aGlzLmNvbnRlbnQpIHJldHVybjtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9wYWdlcy5pbmRleE9mKHBhZ2UpO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDQzMDAsIHBhZ2UubmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVQYWdlQXRJbmRleChpbmRleCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBSZW1vdmVzIGEgcGFnZSBhdCBpbmRleCBvZiBQYWdlVmlldy5cclxuICAgICAqICEjemgg56e76Zmk5oyH5a6a5LiL5qCH55qE6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZVBhZ2VBdEluZGV4XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlUGFnZUF0SW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHZhciBwYWdlTGlzdCA9IHRoaXMuX3BhZ2VzO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gcGFnZUxpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHBhZ2UgPSBwYWdlTGlzdFtpbmRleF07XHJcbiAgICAgICAgaWYgKCFwYWdlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUNoaWxkKHBhZ2UpO1xyXG4gICAgICAgIHBhZ2VMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUGFnZVZpZXcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFJlbW92ZXMgYWxsIHBhZ2VzIGZyb20gUGFnZVZpZXdcclxuICAgICAqICEjemgg56e76Zmk5omA5pyJ6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbFBhZ2VzXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUFsbFBhZ2VzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdmFyIGxvY1BhZ2VzID0gdGhpcy5fcGFnZXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxvY1BhZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQ2hpbGQobG9jUGFnZXNbaV0pO1xyXG4gICAgICAgIHRoaXMuX3BhZ2VzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUGFnZVZpZXcoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFNjcm9sbCBQYWdlVmlldyB0byBpbmRleC5cclxuICAgICAqICEjemgg5rua5Yqo5Yiw5oyH5a6a6aG16Z2iXHJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvUGFnZVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBpbmRleCBvZiBwYWdlLlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVJblNlY29uZCBzY3JvbGxpbmcgdGltZVxyXG4gICAgICovXHJcbiAgICBzY3JvbGxUb1BhZ2U6IGZ1bmN0aW9uIChpZHgsIHRpbWVJblNlY29uZCkge1xyXG4gICAgICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9wYWdlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aW1lSW5TZWNvbmQgPSB0aW1lSW5TZWNvbmQgIT09IHVuZGVmaW5lZCA/IHRpbWVJblNlY29uZCA6IDAuMztcclxuICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gaWR4O1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVG9PZmZzZXQodGhpcy5fbW92ZU9mZnNldFZhbHVlKGlkeCksIHRpbWVJblNlY29uZCwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLl9jaGFuZ2VkU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vb3ZlcnJpZGUgdGhlIG1ldGhvZCBvZiBTY3JvbGxWaWV3XHJcbiAgICBnZXRTY3JvbGxFbmRlZEV2ZW50VGltaW5nOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR1cm5pbmdFdmVudFRpbWluZztcclxuICAgIH0sXHJcblxyXG4gICAgX3N5bmNTY3JvbGxEaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmhvcml6b250YWwgPSB0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWw7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNhbCA9IHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWw7XHJcbiAgICB9LFxyXG5cclxuICAgIF9zeW5jU2l6ZU1vZGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpO1xyXG4gICAgICAgIGlmIChsYXlvdXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZU1vZGUgPT09IFNpemVNb2RlLkZyZWUgJiYgdGhpcy5fcGFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RQYWdlID0gdGhpcy5fcGFnZXNbdGhpcy5fcGFnZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnBhZGRpbmdMZWZ0ID0gKHRoaXMuX3ZpZXcud2lkdGggLSB0aGlzLl9wYWdlc1swXS53aWR0aCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxheW91dC5wYWRkaW5nUmlnaHQgPSAodGhpcy5fdmlldy53aWR0aCAtIGxhc3RQYWdlLndpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnBhZGRpbmdUb3AgPSAodGhpcy5fdmlldy5oZWlnaHQgLSB0aGlzLl9wYWdlc1swXS5oZWlnaHQpIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucGFkZGluZ0JvdHRvbSA9ICh0aGlzLl92aWV3LmhlaWdodCAtIGxhc3RQYWdlLmhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxheW91dC51cGRhdGVMYXlvdXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIt+aWsOmhtemdouinhuWbvlxyXG4gICAgX3VwZGF0ZVBhZ2VWaWV3OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g5b2T6aG16Z2i5pWw57uE5Y+Y5YyW5pe25L+u5pS5IGNvbnRlbnQg5aSn5bCPXHJcbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcclxuICAgICAgICBpZiAobGF5b3V0ICYmIGxheW91dC5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGxheW91dC51cGRhdGVMYXlvdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwYWdlQ291bnQgPSB0aGlzLl9wYWdlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJQYWdlSWR4ID49IHBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gcGFnZUNvdW50ID09PSAwID8gMCA6IHBhZ2VDb3VudCAtIDE7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RQYWdlSWR4ID0gdGhpcy5fY3VyUGFnZUlkeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g6L+b6KGM5o6S5bqPXHJcbiAgICAgICAgdmFyIGNvbnRlbnRQb3MgPSB0aGlzLl9pbml0Q29udGVudFBvcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2VDb3VudDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5fcGFnZXNbaV07XHJcbiAgICAgICAgICAgIHBhZ2Uuc2V0U2libGluZ0luZGV4KGkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRYW2ldID0gTWF0aC5hYnMoY29udGVudFBvcy54ICsgcGFnZS54KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFlbaV0gPSBNYXRoLmFicyhjb250ZW50UG9zLnkgKyBwYWdlLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliLfmlrAgaW5kaWNhdG9yIOS/oeaBr+S4jueKtuaAgVxyXG4gICAgICAgIGlmICh0aGlzLmluZGljYXRvcikge1xyXG4gICAgICAgICAgICB0aGlzLmluZGljYXRvci5fcmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8g5Yi35paw5omA5pyJ6aG16Z2i55qE5aSn5bCPXHJcbiAgICBfdXBkYXRlQWxsUGFnZXNTaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZU1vZGUgIT09IFNpemVNb2RlLlVuaWZpZWQgfHwgIXRoaXMuX3ZpZXcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbG9jUGFnZXMgPSBDQ19FRElUT1IgPyB0aGlzLmNvbnRlbnQuY2hpbGRyZW4gOiB0aGlzLl9wYWdlcztcclxuICAgICAgICB2YXIgc2VsZlNpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxvY1BhZ2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxvY1BhZ2VzW2ldLnNldENvbnRlbnRTaXplKHNlbGZTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOWIneWni+WMlumhtemdolxyXG4gICAgX2luaXRQYWdlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuX2luaXRDb250ZW50UG9zID0gdGhpcy5jb250ZW50LnBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY29udGVudC5jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYWdlcy5pbmRleE9mKHBhZ2UpID49IDApIHsgY29udGludWU7IH1cclxuICAgICAgICAgICAgdGhpcy5fcGFnZXMucHVzaChwYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3luY1Njcm9sbERpcmVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3N5bmNTaXplTW9kZSgpO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZ2VWaWV3KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kaXNwYXRjaFBhZ2VUdXJuaW5nRXZlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbGFzdFBhZ2VJZHggPT09IHRoaXMuX2N1clBhZ2VJZHgpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9sYXN0UGFnZUlkeCA9IHRoaXMuX2N1clBhZ2VJZHg7XHJcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMucGFnZUV2ZW50cywgdGhpcywgRXZlbnRUeXBlLlBBR0VfVFVSTklORyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3BhZ2UtdHVybmluZycsIHRoaXMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyDmmK/lkKbotoXov4foh6rliqjmu5rliqjkuLTnlYzlgLxcclxuICAgIF9pc1Njcm9sbGFibGU6IGZ1bmN0aW9uIChvZmZzZXQsIGluZGV4LCBuZXh0SW5kZXgpIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplTW9kZSA9PT0gU2l6ZU1vZGUuRnJlZSkge1xyXG4gICAgICAgICAgICB2YXIgY3VyUGFnZUNlbnRlciwgbmV4dFBhZ2VDZW50ZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgIGN1clBhZ2VDZW50ZXIgPSB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRYW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIG5leHRQYWdlQ2VudGVyID0gdGhpcy5fc2Nyb2xsQ2VudGVyT2Zmc2V0WFtuZXh0SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC54KSA+PSBNYXRoLmFicyhjdXJQYWdlQ2VudGVyIC0gbmV4dFBhZ2VDZW50ZXIpICogdGhpcy5zY3JvbGxUaHJlc2hvbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgY3VyUGFnZUNlbnRlciA9IHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFlbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VDZW50ZXIgPSB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRZW25leHRJbmRleF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMob2Zmc2V0LnkpID49IE1hdGguYWJzKGN1clBhZ2VDZW50ZXIgLSBuZXh0UGFnZUNlbnRlcikgKiB0aGlzLnNjcm9sbFRocmVzaG9sZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC54KSA+PSB0aGlzLl92aWV3LndpZHRoICogdGhpcy5zY3JvbGxUaHJlc2hvbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC55KSA+PSB0aGlzLl92aWV3LmhlaWdodCAqIHRoaXMuc2Nyb2xsVGhyZXNob2xkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyDlv6vpgJ/mu5HliqhcclxuICAgIF9pc1F1aWNrbHlTY3JvbGxhYmxlOiBmdW5jdGlvbiAodG91Y2hNb3ZlVmVsb2NpdHkpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0b3VjaE1vdmVWZWxvY2l0eS54KSA+IHRoaXMuYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0b3VjaE1vdmVWZWxvY2l0eS55KSA+IHRoaXMuYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIOmAmui/hyBpZHgg6I635Y+W5YGP56e75YC85pWw5YC8XHJcbiAgICBfbW92ZU9mZnNldFZhbHVlOiBmdW5jdGlvbiAoaWR4KSB7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IGNjLnYyKDAsIDApO1xyXG4gICAgICAgIGlmICh0aGlzLnNpemVNb2RlID09PSBTaXplTW9kZS5GcmVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldC54ID0gdGhpcy5fc2Nyb2xsQ2VudGVyT2Zmc2V0WFtpZHhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwpIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldC55ID0gdGhpcy5fc2Nyb2xsQ2VudGVyT2Zmc2V0WVtpZHhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQueCA9IGlkeCAqIHRoaXMuX3ZpZXcud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0LnkgPSBpZHggKiB0aGlzLl92aWV3LmhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfSxcclxuXHJcbiAgICBfZ2V0RHJhZ0RpcmVjdGlvbjogZnVuY3Rpb24gKG1vdmVPZmZzZXQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgIGlmIChtb3ZlT2Zmc2V0LnggPT09IDApIHsgcmV0dXJuIDA7IH1cclxuICAgICAgICAgICAgcmV0dXJuIChtb3ZlT2Zmc2V0LnggPiAwID8gMSA6IC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAvLyDnlLHkuo7mu5rliqggWSDovbTnmoTljp/ngrnlnKjlnKjlj7PkuIrop5LmiYDku6XlupTor6XmmK/lsI/kuo4gMFxyXG4gICAgICAgICAgICBpZiAobW92ZU9mZnNldC55ID09PSAwKSB7IHJldHVybiAwOyB9XHJcbiAgICAgICAgICAgIHJldHVybiAobW92ZU9mZnNldC55IDwgMCA/IDEgOiAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfaGFuZGxlUmVsZWFzZUxvZ2ljOiBmdW5jdGlvbih0b3VjaCkge1xyXG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUb1BhZ2UoKTtcclxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2F1dG9TY3JvbGxpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3Njcm9sbC1lbmRlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfYXV0b1Njcm9sbFRvUGFnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBib3VuY2VCYWNrU3RhcnRlZCA9IHRoaXMuX3N0YXJ0Qm91bmNlQmFja0lmTmVlZGVkKCk7XHJcbiAgICAgICAgaWYgKGJvdW5jZUJhY2tTdGFydGVkKSB7XHJcbiAgICAgICAgICAgIGxldCBib3VuY2VCYWNrQW1vdW50ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoKTtcclxuICAgICAgICAgICAgYm91bmNlQmFja0Ftb3VudCA9IHRoaXMuX2NsYW1wRGVsdGEoYm91bmNlQmFja0Ftb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnggPiAwIHx8IGJvdW5jZUJhY2tBbW91bnQueSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSB0aGlzLl9wYWdlcy5sZW5ndGggPT09IDAgPyAwIDogdGhpcy5fcGFnZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm91bmNlQmFja0Ftb3VudC54IDwgMCB8fCBib3VuY2VCYWNrQW1vdW50LnkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGljYXRvci5fY2hhbmdlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlT2Zmc2V0ID0gdGhpcy5fdG91Y2hCZWdhblBvc2l0aW9uLnN1Yih0aGlzLl90b3VjaEVuZFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fY3VyUGFnZUlkeCwgbmV4dEluZGV4ID0gaW5kZXggKyB0aGlzLl9nZXREcmFnRGlyZWN0aW9uKG1vdmVPZmZzZXQpO1xyXG4gICAgICAgICAgICB2YXIgdGltZUluU2Vjb25kID0gdGhpcy5wYWdlVHVybmluZ1NwZWVkICogTWF0aC5hYnMoaW5kZXggLSBuZXh0SW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNTY3JvbGxhYmxlKG1vdmVPZmZzZXQsIGluZGV4LCBuZXh0SW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1BhZ2UobmV4dEluZGV4LCB0aW1lSW5TZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaE1vdmVWZWxvY2l0eSA9IHRoaXMuX2NhbGN1bGF0ZVRvdWNoTW92ZVZlbG9jaXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzUXVpY2tseVNjcm9sbGFibGUodG91Y2hNb3ZlVmVsb2NpdHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9QYWdlKG5leHRJbmRleCwgdGltZUluU2Vjb25kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvUGFnZShpbmRleCwgdGltZUluU2Vjb25kKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoQmVnYW46IGZ1bmN0aW9uIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMuX3RvdWNoQmVnYW5Qb3NpdGlvbiA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfb25Ub3VjaE1vdmVkOiBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcihldmVudCwgY2FwdHVyZUxpc3RlbmVycyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9vblRvdWNoRW5kZWQ6IGZ1bmN0aW9uIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMuX3RvdWNoRW5kUG9zaXRpb24gPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uVG91Y2hDYW5jZWxsZWQ6IGZ1bmN0aW9uIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIHRoaXMuX3RvdWNoRW5kUG9zaXRpb24gPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uTW91c2VXaGVlbDogZnVuY3Rpb24gKCkgeyB9XHJcbn0pO1xyXG5cclxuY2MuUGFnZVZpZXcgPSBtb2R1bGUuZXhwb3J0cyA9IFBhZ2VWaWV3O1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxyXG4gKiAhI3poXHJcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxyXG4gKiBAZXZlbnQgcGFnZS10dXJuaW5nXHJcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XHJcbiAqIEBwYXJhbSB7UGFnZVZpZXd9IHBhZ2VWaWV3IC0gVGhlIFBhZ2VWaWV3IGNvbXBvbmVudC5cclxuICovXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9