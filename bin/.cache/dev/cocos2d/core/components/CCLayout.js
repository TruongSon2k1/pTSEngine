
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLayout.js';
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
/**
 * !#en Enum for Layout type
 * !#zh 布局类型
 * @enum Layout.Type
 */


var Type = cc.Enum({
  /**
   * !#en None Layout
   * !#zh 取消布局
   *@property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en Horizontal Layout
   * !#zh 水平布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 1,

  /**
   * !#en Vertical Layout
   * !#zh 垂直布局
   * @property {Number} VERTICAL
   */
  VERTICAL: 2,

  /**
   * !#en Grid Layout
   * !#zh 网格布局
   * @property {Number} GRID
   */
  GRID: 3
});
/**
 * !#en Enum for Layout Resize Mode
 * !#zh 缩放模式
 * @enum Layout.ResizeMode
 */

var ResizeMode = cc.Enum({
  /**
   * !#en Don't do any scale.
   * !#zh 不做任何缩放
   * @property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en The container size will be expanded with its children's size.
   * !#zh 容器的大小会根据子节点的大小自动缩放。
   * @property {Number} CONTAINER
   */
  CONTAINER: 1,

  /**
   * !#en Child item size will be adjusted with the container's size.
   * !#zh 子节点的大小会随着容器的大小自动缩放。
   * @property {Number} CHILDREN
   */
  CHILDREN: 2
});
/**
 * !#en Enum for Grid Layout start axis direction.
 * The items in grid layout will be arranged in each axis at first.;
 * !#zh 布局轴向，只用于 GRID 布局。
 * @enum Layout.AxisDirection
 */

var AxisDirection = cc.Enum({
  /**
   * !#en The horizontal axis.
   * !#zh 进行水平方向布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 0,

  /**
   * !#en The vertical axis.
   * !#zh 进行垂直方向布局
   * @property {Number} VERTICAL
   */
  VERTICAL: 1
});
/**
 * !#en Enum for vertical layout direction.
 *  Used in Grid Layout together with AxisDirection is VERTICAL
 * !#zh 垂直方向布局方式
 * @enum Layout.VerticalDirection
 */

var VerticalDirection = cc.Enum({
  /**
   * !#en Items arranged from bottom to top.
   * !#zh 从下到上排列
   * @property {Number} BOTTOM_TO_TOP
   */
  BOTTOM_TO_TOP: 0,

  /**
   * !#en Items arranged from top to bottom.
   * !#zh 从上到下排列
   * @property {Number} TOP_TO_BOTTOM
   */
  TOP_TO_BOTTOM: 1
});
/**
 * !#en Enum for horizontal layout direction.
 *  Used in Grid Layout together with AxisDirection is HORIZONTAL
 * !#zh 水平方向布局方式
 * @enum Layout.HorizontalDirection
 */

var HorizontalDirection = cc.Enum({
  /**
   * !#en Items arranged from left to right.
   * !#zh 从左往右排列
   * @property {Number} LEFT_TO_RIGHT
   */
  LEFT_TO_RIGHT: 0,

  /**
   * !#en Items arranged from right to left.
   * !#zh 从右往左排列
   *@property {Number} RIGHT_TO_LEFT
   */
  RIGHT_TO_LEFT: 1
});
/**
 * !#en
 * The Layout is a container component, use it to arrange child elements easily.<br>
 * Note：<br>
 * 1.Scaling and rotation of child nodes are not considered.<br>
 * 2.After setting the Layout, the results need to be updated until the next frame,
 * unless you manually call {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
 * !#zh
 * Layout 组件相当于一个容器，能自动对它的所有子节点进行统一排版。<br>
 * 注意：<br>
 * 1.不会考虑子节点的缩放和旋转。<br>
 * 2.对 Layout 设置后结果需要到下一帧才会更新，除非你设置完以后手动调用 {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
 * @class Layout
 * @extends Component
 */

var Layout = cc.Class({
  name: 'cc.Layout',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Layout',
    help: 'i18n:COMPONENT.help_url.layout',
    inspector: 'packages://inspector/inspectors/comps/cclayout.js',
    executeInEditMode: true
  },
  properties: {
    _layoutSize: cc.size(300, 200),
    _layoutDirty: {
      "default": true,
      serializable: false
    },
    _resize: ResizeMode.NONE,
    //TODO: refactoring this name after data upgrade machanism is out.
    _N$layoutType: Type.NONE,

    /**
     * !#en The layout type.
     * !#zh 布局类型
     * @property {Layout.Type} type
     * @default Layout.Type.NONE
     */
    type: {
      type: Type,
      get: function get() {
        return this._N$layoutType;
      },
      set: function set(value) {
        this._N$layoutType = value;

        if (CC_EDITOR && this.type !== Type.NONE && this._resize === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.layout_type',
      animatable: false
    },

    /**
     * !#en
     * The are three resize modes for Layout.
     * None, resize Container and resize children.
     * !#zh 缩放模式
     * @property {Layout.ResizeMode} resizeMode
     * @default ResizeMode.NONE
     */
    resizeMode: {
      type: ResizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.resize_mode',
      animatable: false,
      get: function get() {
        return this._resize;
      },
      set: function set(value) {
        if (this.type === Type.NONE && value === ResizeMode.CHILDREN) {
          return;
        }

        this._resize = value;

        if (CC_EDITOR && value === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      }
    },

    /**
     * !#en The cell size for grid layout.
     * !#zh 每个格子的大小，只有布局类型为 GRID 的时候才有效。
     * @property {Size} cellSize
     * @default cc.size(40, 40)
     */
    cellSize: {
      "default": cc.size(40, 40),
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.cell_size',
      type: cc.Size,
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en
     * The start axis for grid layout. If you choose horizontal, then children will layout horizontally at first,
     * and then break line on demand. Choose vertical if you want to layout vertically at first .
     * !#zh 起始轴方向类型，可进行水平和垂直布局排列，只有布局类型为 GRID 的时候才有效。
     * @property {Layout.AxisDirection} startAxis
     */
    startAxis: {
      "default": AxisDirection.HORIZONTAL,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.start_axis',
      type: AxisDirection,
      notify: function notify() {
        if (CC_EDITOR && this._resize === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      },
      animatable: false
    },

    /**
     * !#en The left padding of layout, it only effect the layout in one direction.
     * !#zh 容器内左边距，只会在一个布局方向上生效。
     * @property {Number} paddingLeft
     */
    paddingLeft: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_left',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The right padding of layout, it only effect the layout in one direction.
     * !#zh 容器内右边距，只会在一个布局方向上生效。
     * @property {Number} paddingRight
     */
    paddingRight: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_right',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The top padding of layout, it only effect the layout in one direction.
     * !#zh 容器内上边距，只会在一个布局方向上生效。
     * @property {Number} paddingTop
     */
    paddingTop: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_top',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The bottom padding of layout, it only effect the layout in one direction.
     * !#zh 容器内下边距，只会在一个布局方向上生效。
     * @property {Number} paddingBottom
     */
    paddingBottom: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_bottom',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The distance in x-axis between each element in layout.
     * !#zh 子节点之间的水平间距。
     * @property {Number} spacingX
     */
    spacingX: {
      "default": 0,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.space_x'
    },

    /**
     * !#en The distance in y-axis between each element in layout.
     * !#zh 子节点之间的垂直间距。
     * @property {Number} spacingY
     */
    spacingY: {
      "default": 0,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.space_y'
    },

    /**
     * !#en
     * Only take effect in Vertical layout mode.
     * This option changes the start element's positioning.
     * !#zh 垂直排列子节点的方向。
     * @property {Layout.VerticalDirection} verticalDirection
     */
    verticalDirection: {
      "default": VerticalDirection.TOP_TO_BOTTOM,
      type: VerticalDirection,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.vertical_direction',
      animatable: false
    },

    /**
     * !#en
     * Only take effect in Horizontal layout mode.
     * This option changes the start element's positioning.
     * !#zh 水平排列子节点的方向。
     * @property {Layout.HorizontalDirection} horizontalDirection
     */
    horizontalDirection: {
      "default": HorizontalDirection.LEFT_TO_RIGHT,
      type: HorizontalDirection,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.horizontal_direction',
      animatable: false
    },

    /**
     * !#en Adjust the layout if the children scaled.
     * !#zh 子节点缩放比例是否影响布局。
     * @property affectedByScale
     * @type {Boolean}
     * @default false
     */
    affectedByScale: {
      "default": false,
      notify: function notify() {
        // every time you switch this state, the layout will be calculated.
        this._doLayoutDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.affected_by_scale'
    }
  },
  statics: {
    Type: Type,
    VerticalDirection: VerticalDirection,
    HorizontalDirection: HorizontalDirection,
    ResizeMode: ResizeMode,
    AxisDirection: AxisDirection
  },
  onEnable: function onEnable() {
    this._addEventListeners();

    if (this.node.getContentSize().equals(cc.size(0, 0))) {
      this.node.setContentSize(this._layoutSize);
    }

    this._doLayoutDirty();
  },
  onDisable: function onDisable() {
    this._removeEventListeners();
  },
  _doLayoutDirty: function _doLayoutDirty() {
    this._layoutDirty = true;
  },
  _doScaleDirty: function _doScaleDirty() {
    this._layoutDirty = this._layoutDirty || this.affectedByScale;
  },
  _addEventListeners: function _addEventListeners() {
    cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
    this.node.on(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.on(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);

    this._addChildrenEventListeners();
  },
  _removeEventListeners: function _removeEventListeners() {
    cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
    this.node.off(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.off(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);

    this._removeChildrenEventListeners();
  },
  _addChildrenEventListeners: function _addChildrenEventListeners() {
    var children = this.node.children;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      child.on(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
      child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
      child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);
    }
  },
  _removeChildrenEventListeners: function _removeChildrenEventListeners() {
    var children = this.node.children;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      child.off(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
      child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
      child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);
    }
  },
  _childAdded: function _childAdded(child) {
    child.on(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
    child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
    child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);

    this._doLayoutDirty();
  },
  _childRemoved: function _childRemoved(child) {
    child.off(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
    child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
    child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);

    this._doLayoutDirty();
  },
  _resized: function _resized() {
    this._layoutSize = this.node.getContentSize();

    this._doLayoutDirty();
  },
  _doLayoutHorizontally: function _doLayoutHorizontally(baseWidth, rowBreak, fnPositionY, applyChildren) {
    var layoutAnchor = this.node.getAnchorPoint();
    var children = this.node.children;
    var sign = 1;
    var paddingX = this.paddingLeft;
    var leftBoundaryOfLayout = -layoutAnchor.x * baseWidth;

    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      leftBoundaryOfLayout = (1 - layoutAnchor.x) * baseWidth;
      paddingX = this.paddingRight;
    }

    var nextX = leftBoundaryOfLayout + sign * paddingX - sign * this.spacingX;
    var rowMaxHeight = 0;
    var tempMaxHeight = 0;
    var secondMaxHeight = 0;
    var row = 0;
    var containerResizeBoundary = 0;
    var maxHeightChildAnchorY = 0;
    var activeChildCount = 0;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        activeChildCount++;
      }
    }

    var newChildWidth = this.cellSize.width;

    if (this.type !== Type.GRID && this.resizeMode === ResizeMode.CHILDREN) {
      newChildWidth = (baseWidth - (this.paddingLeft + this.paddingRight) - (activeChildCount - 1) * this.spacingX) / activeChildCount;
    }

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      var childScaleX = this._getUsedScaleValue(child.scaleX);

      var childScaleY = this._getUsedScaleValue(child.scaleY);

      if (!child.activeInHierarchy) {
        continue;
      } //for resizing children


      if (this._resize === ResizeMode.CHILDREN) {
        child.width = newChildWidth / childScaleX;

        if (this.type === Type.GRID) {
          child.height = this.cellSize.height / childScaleY;
        }
      }

      var anchorX = child.anchorX;
      var childBoundingBoxWidth = child.width * childScaleX;
      var childBoundingBoxHeight = child.height * childScaleY;

      if (secondMaxHeight > tempMaxHeight) {
        tempMaxHeight = secondMaxHeight;
      }

      if (childBoundingBoxHeight >= tempMaxHeight) {
        secondMaxHeight = tempMaxHeight;
        tempMaxHeight = childBoundingBoxHeight;
        maxHeightChildAnchorY = child.getAnchorPoint().y;
      }

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        anchorX = 1 - child.anchorX;
      }

      nextX = nextX + sign * anchorX * childBoundingBoxWidth + sign * this.spacingX;
      var rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

      if (rowBreak) {
        var rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this.paddingRight : this.paddingLeft);
        var leftToRightRowBreak = this.horizontalDirection === HorizontalDirection.LEFT_TO_RIGHT && rowBreakBoundary > (1 - layoutAnchor.x) * baseWidth;
        var rightToLeftRowBreak = this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT && rowBreakBoundary < -layoutAnchor.x * baseWidth;

        if (leftToRightRowBreak || rightToLeftRowBreak) {
          if (childBoundingBoxHeight >= tempMaxHeight) {
            if (secondMaxHeight === 0) {
              secondMaxHeight = tempMaxHeight;
            }

            rowMaxHeight += secondMaxHeight;
            secondMaxHeight = tempMaxHeight;
          } else {
            rowMaxHeight += tempMaxHeight;
            secondMaxHeight = childBoundingBoxHeight;
            tempMaxHeight = 0;
          }

          nextX = leftBoundaryOfLayout + sign * (paddingX + anchorX * childBoundingBoxWidth);
          row++;
        }
      }

      var finalPositionY = fnPositionY(child, rowMaxHeight, row);

      if (baseWidth >= childBoundingBoxWidth + this.paddingLeft + this.paddingRight) {
        if (applyChildren) {
          child.setPosition(cc.v2(nextX, finalPositionY));
        }
      }

      var signX = 1;
      var tempFinalPositionY;
      var topMarign = tempMaxHeight === 0 ? childBoundingBoxHeight : tempMaxHeight;

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.height;
        signX = -1;
        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchorY + this.paddingBottom);

        if (tempFinalPositionY < containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionY;
        }
      } else {
        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.height;
        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchorY + this.paddingTop);

        if (tempFinalPositionY > containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionY;
        }
      }

      nextX += rightBoundaryOfChild;
    }

    return containerResizeBoundary;
  },
  _getVerticalBaseHeight: function _getVerticalBaseHeight(children) {
    var newHeight = 0;
    var activeChildCount = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (child.activeInHierarchy) {
          activeChildCount++;
          newHeight += child.height * this._getUsedScaleValue(child.scaleY);
        }
      }

      newHeight += (activeChildCount - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
    } else {
      newHeight = this.node.getContentSize().height;
    }

    return newHeight;
  },
  _doLayoutVertically: function _doLayoutVertically(baseHeight, columnBreak, fnPositionX, applyChildren) {
    var layoutAnchor = this.node.getAnchorPoint();
    var children = this.node.children;
    var sign = 1;
    var paddingY = this.paddingBottom;
    var bottomBoundaryOfLayout = -layoutAnchor.y * baseHeight;

    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      bottomBoundaryOfLayout = (1 - layoutAnchor.y) * baseHeight;
      paddingY = this.paddingTop;
    }

    var nextY = bottomBoundaryOfLayout + sign * paddingY - sign * this.spacingY;
    var columnMaxWidth = 0;
    var tempMaxWidth = 0;
    var secondMaxWidth = 0;
    var column = 0;
    var containerResizeBoundary = 0;
    var maxWidthChildAnchorX = 0;
    var activeChildCount = 0;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        activeChildCount++;
      }
    }

    var newChildHeight = this.cellSize.height;

    if (this.type !== Type.GRID && this.resizeMode === ResizeMode.CHILDREN) {
      newChildHeight = (baseHeight - (this.paddingTop + this.paddingBottom) - (activeChildCount - 1) * this.spacingY) / activeChildCount;
    }

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      var childScaleX = this._getUsedScaleValue(child.scaleX);

      var childScaleY = this._getUsedScaleValue(child.scaleY);

      if (!child.activeInHierarchy) {
        continue;
      } //for resizing children


      if (this.resizeMode === ResizeMode.CHILDREN) {
        child.height = newChildHeight / childScaleY;

        if (this.type === Type.GRID) {
          child.width = this.cellSize.width / childScaleX;
        }
      }

      var anchorY = child.anchorY;
      var childBoundingBoxWidth = child.width * childScaleX;
      var childBoundingBoxHeight = child.height * childScaleY;

      if (secondMaxWidth > tempMaxWidth) {
        tempMaxWidth = secondMaxWidth;
      }

      if (childBoundingBoxWidth >= tempMaxWidth) {
        secondMaxWidth = tempMaxWidth;
        tempMaxWidth = childBoundingBoxWidth;
        maxWidthChildAnchorX = child.getAnchorPoint().x;
      }

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        anchorY = 1 - child.anchorY;
      }

      nextY = nextY + sign * anchorY * childBoundingBoxHeight + sign * this.spacingY;
      var topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

      if (columnBreak) {
        var columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this.paddingTop : this.paddingBottom);
        var bottomToTopColumnBreak = this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP && columnBreakBoundary > (1 - layoutAnchor.y) * baseHeight;
        var topToBottomColumnBreak = this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM && columnBreakBoundary < -layoutAnchor.y * baseHeight;

        if (bottomToTopColumnBreak || topToBottomColumnBreak) {
          if (childBoundingBoxWidth >= tempMaxWidth) {
            if (secondMaxWidth === 0) {
              secondMaxWidth = tempMaxWidth;
            }

            columnMaxWidth += secondMaxWidth;
            secondMaxWidth = tempMaxWidth;
          } else {
            columnMaxWidth += tempMaxWidth;
            secondMaxWidth = childBoundingBoxWidth;
            tempMaxWidth = 0;
          }

          nextY = bottomBoundaryOfLayout + sign * (paddingY + anchorY * childBoundingBoxHeight);
          column++;
        }
      }

      var finalPositionX = fnPositionX(child, columnMaxWidth, column);

      if (baseHeight >= childBoundingBoxHeight + (this.paddingTop + this.paddingBottom)) {
        if (applyChildren) {
          child.setPosition(cc.v2(finalPositionX, nextY));
        }
      }

      var signX = 1;
      var tempFinalPositionX; //when the item is the last column break item, the tempMaxWidth will be 0.

      var rightMarign = tempMaxWidth === 0 ? childBoundingBoxWidth : tempMaxWidth;

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        signX = -1;
        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.width;
        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchorX + this.paddingLeft);

        if (tempFinalPositionX < containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionX;
        }
      } else {
        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.width;
        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchorX + this.paddingRight);

        if (tempFinalPositionX > containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionX;
        }
      }

      nextY += topBoundaryOfChild;
    }

    return containerResizeBoundary;
  },
  _doLayoutBasic: function _doLayoutBasic() {
    var children = this.node.children;
    var allChildrenBoundingBox = null;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        if (!allChildrenBoundingBox) {
          allChildrenBoundingBox = child.getBoundingBoxToWorld();
        } else {
          allChildrenBoundingBox.union(allChildrenBoundingBox, child.getBoundingBoxToWorld());
        }
      }
    }

    if (allChildrenBoundingBox) {
      var leftBottomSpace = this.node.convertToNodeSpaceAR(cc.v2(allChildrenBoundingBox.x, allChildrenBoundingBox.y));
      leftBottomSpace = cc.v2(leftBottomSpace.x - this.paddingLeft, leftBottomSpace.y - this.paddingBottom);
      var rightTopSpace = this.node.convertToNodeSpaceAR(cc.v2(allChildrenBoundingBox.xMax, allChildrenBoundingBox.yMax));
      rightTopSpace = cc.v2(rightTopSpace.x + this.paddingRight, rightTopSpace.y + this.paddingTop);
      var newSize = rightTopSpace.sub(leftBottomSpace);
      newSize = cc.size(parseFloat(newSize.x.toFixed(2)), parseFloat(newSize.y.toFixed(2)));

      if (newSize.width !== 0) {
        // Invert is to get the coordinate point of the child node in the parent coordinate system
        var newAnchorX = -leftBottomSpace.x / newSize.width;
        this.node.anchorX = parseFloat(newAnchorX.toFixed(2));
      }

      if (newSize.height !== 0) {
        // Invert is to get the coordinate point of the child node in the parent coordinate system
        var newAnchorY = -leftBottomSpace.y / newSize.height;
        this.node.anchorY = parseFloat(newAnchorY.toFixed(2));
      }

      this.node.setContentSize(newSize);
    }
  },
  _doLayoutGridAxisHorizontal: function _doLayoutGridAxisHorizontal(layoutAnchor, layoutSize) {
    var baseWidth = layoutSize.width;
    var sign = 1;
    var bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
    var paddingY = this.paddingBottom;

    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
      paddingY = this.paddingTop;
    }

    var fnPositionY = function (child, topOffset, row) {
      return bottomBoundaryOfLayout + sign * (topOffset + child.anchorY * child.height * this._getUsedScaleValue(child.scaleY) + paddingY + row * this.spacingY);
    }.bind(this);

    var newHeight = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      //calculate the new height of container, it won't change the position of it's children
      var boundary = this._doLayoutHorizontally(baseWidth, true, fnPositionY, false);

      newHeight = bottomBoundaryOfLayout - boundary;

      if (newHeight < 0) {
        newHeight *= -1;
      }

      bottomBoundaryOfLayout = -layoutAnchor.y * newHeight;

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        sign = -1;
        bottomBoundaryOfLayout = (1 - layoutAnchor.y) * newHeight;
      }
    }

    this._doLayoutHorizontally(baseWidth, true, fnPositionY, true);

    if (this.resizeMode === ResizeMode.CONTAINER) {
      this.node.setContentSize(baseWidth, newHeight);
    }
  },
  _doLayoutGridAxisVertical: function _doLayoutGridAxisVertical(layoutAnchor, layoutSize) {
    var baseHeight = layoutSize.height;
    var sign = 1;
    var leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
    var paddingX = this.paddingLeft;

    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
      paddingX = this.paddingRight;
    }

    var fnPositionX = function (child, leftOffset, column) {
      return leftBoundaryOfLayout + sign * (leftOffset + child.anchorX * child.width * this._getUsedScaleValue(child.scaleX) + paddingX + column * this.spacingX);
    }.bind(this);

    var newWidth = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      var boundary = this._doLayoutVertically(baseHeight, true, fnPositionX, false);

      newWidth = leftBoundaryOfLayout - boundary;

      if (newWidth < 0) {
        newWidth *= -1;
      }

      leftBoundaryOfLayout = -layoutAnchor.x * newWidth;

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        sign = -1;
        leftBoundaryOfLayout = (1 - layoutAnchor.x) * newWidth;
      }
    }

    this._doLayoutVertically(baseHeight, true, fnPositionX, true);

    if (this.resizeMode === ResizeMode.CONTAINER) {
      this.node.setContentSize(newWidth, baseHeight);
    }
  },
  _doLayoutGrid: function _doLayoutGrid() {
    var layoutAnchor = this.node.getAnchorPoint();
    var layoutSize = this.node.getContentSize();

    if (this.startAxis === AxisDirection.HORIZONTAL) {
      this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
    } else if (this.startAxis === AxisDirection.VERTICAL) {
      this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
    }
  },
  _getHorizontalBaseWidth: function _getHorizontalBaseWidth(children) {
    var newWidth = 0;
    var activeChildCount = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (child.activeInHierarchy) {
          activeChildCount++;
          newWidth += child.width * this._getUsedScaleValue(child.scaleX);
        }
      }

      newWidth += (activeChildCount - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
    } else {
      newWidth = this.node.getContentSize().width;
    }

    return newWidth;
  },
  _doLayout: function _doLayout() {
    if (this.type === Type.HORIZONTAL) {
      var newWidth = this._getHorizontalBaseWidth(this.node.children);

      var fnPositionY = function fnPositionY(child) {
        return child.y;
      };

      this._doLayoutHorizontally(newWidth, false, fnPositionY, true);

      this.node.width = newWidth;
    } else if (this.type === Type.VERTICAL) {
      var newHeight = this._getVerticalBaseHeight(this.node.children);

      var fnPositionX = function fnPositionX(child) {
        return child.x;
      };

      this._doLayoutVertically(newHeight, false, fnPositionX, true);

      this.node.height = newHeight;
    } else if (this.type === Type.NONE) {
      if (this.resizeMode === ResizeMode.CONTAINER) {
        this._doLayoutBasic();
      }
    } else if (this.type === Type.GRID) {
      this._doLayoutGrid();
    }
  },
  _getUsedScaleValue: function _getUsedScaleValue(value) {
    return this.affectedByScale ? Math.abs(value) : 1;
  },

  /**
   * !#en Perform the layout update
   * !#zh 立即执行更新布局
   *
   * @method updateLayout
   *
   * @example
   * layout.type = cc.Layout.HORIZONTAL;
   * layout.node.addChild(childNode);
   * cc.log(childNode.x); // not yet changed
   * layout.updateLayout();
   * cc.log(childNode.x); // changed
   */
  updateLayout: function updateLayout() {
    if (this._layoutDirty && this.node.children.length > 0) {
      this._doLayout();

      this._layoutDirty = false;
    }
  }
});
cc.Layout = module.exports = Layout;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDTGF5b3V0LmpzIl0sIm5hbWVzIjpbIk5vZGVFdmVudCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJUeXBlIiwiY2MiLCJFbnVtIiwiTk9ORSIsIkhPUklaT05UQUwiLCJWRVJUSUNBTCIsIkdSSUQiLCJSZXNpemVNb2RlIiwiQ09OVEFJTkVSIiwiQ0hJTERSRU4iLCJBeGlzRGlyZWN0aW9uIiwiVmVydGljYWxEaXJlY3Rpb24iLCJCT1RUT01fVE9fVE9QIiwiVE9QX1RPX0JPVFRPTSIsIkhvcml6b250YWxEaXJlY3Rpb24iLCJMRUZUX1RPX1JJR0hUIiwiUklHSFRfVE9fTEVGVCIsIkxheW91dCIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJwcm9wZXJ0aWVzIiwiX2xheW91dFNpemUiLCJzaXplIiwiX2xheW91dERpcnR5Iiwic2VyaWFsaXphYmxlIiwiX3Jlc2l6ZSIsIl9OJGxheW91dFR5cGUiLCJ0eXBlIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJlbmdpbmUiLCJpc1BsYXlpbmciLCJyZUxheW91dGVkIiwiX1NjZW5lIiwiRGV0ZWN0Q29uZmxpY3QiLCJjaGVja0NvbmZsaWN0X0xheW91dCIsIl9kb0xheW91dERpcnR5IiwidG9vbHRpcCIsIkNDX0RFViIsImFuaW1hdGFibGUiLCJyZXNpemVNb2RlIiwiY2VsbFNpemUiLCJTaXplIiwibm90aWZ5Iiwic3RhcnRBeGlzIiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInNwYWNpbmdYIiwic3BhY2luZ1kiLCJ2ZXJ0aWNhbERpcmVjdGlvbiIsImhvcml6b250YWxEaXJlY3Rpb24iLCJhZmZlY3RlZEJ5U2NhbGUiLCJzdGF0aWNzIiwib25FbmFibGUiLCJfYWRkRXZlbnRMaXN0ZW5lcnMiLCJub2RlIiwiZ2V0Q29udGVudFNpemUiLCJlcXVhbHMiLCJzZXRDb250ZW50U2l6ZSIsIm9uRGlzYWJsZSIsIl9yZW1vdmVFdmVudExpc3RlbmVycyIsIl9kb1NjYWxlRGlydHkiLCJkaXJlY3RvciIsIm9uIiwiRGlyZWN0b3IiLCJFVkVOVF9BRlRFUl9VUERBVEUiLCJ1cGRhdGVMYXlvdXQiLCJTSVpFX0NIQU5HRUQiLCJfcmVzaXplZCIsIkFOQ0hPUl9DSEFOR0VEIiwiQ0hJTERfQURERUQiLCJfY2hpbGRBZGRlZCIsIkNISUxEX1JFTU9WRUQiLCJfY2hpbGRSZW1vdmVkIiwiQ0hJTERfUkVPUkRFUiIsIl9hZGRDaGlsZHJlbkV2ZW50TGlzdGVuZXJzIiwib2ZmIiwiX3JlbW92ZUNoaWxkcmVuRXZlbnRMaXN0ZW5lcnMiLCJjaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJjaGlsZCIsIlNDQUxFX0NIQU5HRUQiLCJQT1NJVElPTl9DSEFOR0VEIiwiX2RvTGF5b3V0SG9yaXpvbnRhbGx5IiwiYmFzZVdpZHRoIiwicm93QnJlYWsiLCJmblBvc2l0aW9uWSIsImFwcGx5Q2hpbGRyZW4iLCJsYXlvdXRBbmNob3IiLCJnZXRBbmNob3JQb2ludCIsInNpZ24iLCJwYWRkaW5nWCIsImxlZnRCb3VuZGFyeU9mTGF5b3V0IiwieCIsIm5leHRYIiwicm93TWF4SGVpZ2h0IiwidGVtcE1heEhlaWdodCIsInNlY29uZE1heEhlaWdodCIsInJvdyIsImNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5IiwibWF4SGVpZ2h0Q2hpbGRBbmNob3JZIiwiYWN0aXZlQ2hpbGRDb3VudCIsImFjdGl2ZUluSGllcmFyY2h5IiwibmV3Q2hpbGRXaWR0aCIsIndpZHRoIiwiY2hpbGRTY2FsZVgiLCJfZ2V0VXNlZFNjYWxlVmFsdWUiLCJzY2FsZVgiLCJjaGlsZFNjYWxlWSIsInNjYWxlWSIsImhlaWdodCIsImFuY2hvclgiLCJjaGlsZEJvdW5kaW5nQm94V2lkdGgiLCJjaGlsZEJvdW5kaW5nQm94SGVpZ2h0IiwieSIsInJpZ2h0Qm91bmRhcnlPZkNoaWxkIiwicm93QnJlYWtCb3VuZGFyeSIsImxlZnRUb1JpZ2h0Um93QnJlYWsiLCJyaWdodFRvTGVmdFJvd0JyZWFrIiwiZmluYWxQb3NpdGlvblkiLCJzZXRQb3NpdGlvbiIsInYyIiwic2lnblgiLCJ0ZW1wRmluYWxQb3NpdGlvblkiLCJ0b3BNYXJpZ24iLCJfY29udGVudFNpemUiLCJfZ2V0VmVydGljYWxCYXNlSGVpZ2h0IiwibmV3SGVpZ2h0IiwiX2RvTGF5b3V0VmVydGljYWxseSIsImJhc2VIZWlnaHQiLCJjb2x1bW5CcmVhayIsImZuUG9zaXRpb25YIiwicGFkZGluZ1kiLCJib3R0b21Cb3VuZGFyeU9mTGF5b3V0IiwibmV4dFkiLCJjb2x1bW5NYXhXaWR0aCIsInRlbXBNYXhXaWR0aCIsInNlY29uZE1heFdpZHRoIiwiY29sdW1uIiwibWF4V2lkdGhDaGlsZEFuY2hvclgiLCJuZXdDaGlsZEhlaWdodCIsImFuY2hvclkiLCJ0b3BCb3VuZGFyeU9mQ2hpbGQiLCJjb2x1bW5CcmVha0JvdW5kYXJ5IiwiYm90dG9tVG9Ub3BDb2x1bW5CcmVhayIsInRvcFRvQm90dG9tQ29sdW1uQnJlYWsiLCJmaW5hbFBvc2l0aW9uWCIsInRlbXBGaW5hbFBvc2l0aW9uWCIsInJpZ2h0TWFyaWduIiwiX2RvTGF5b3V0QmFzaWMiLCJhbGxDaGlsZHJlbkJvdW5kaW5nQm94IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwidW5pb24iLCJsZWZ0Qm90dG9tU3BhY2UiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsInJpZ2h0VG9wU3BhY2UiLCJ4TWF4IiwieU1heCIsIm5ld1NpemUiLCJzdWIiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsIm5ld0FuY2hvclgiLCJuZXdBbmNob3JZIiwiX2RvTGF5b3V0R3JpZEF4aXNIb3Jpem9udGFsIiwibGF5b3V0U2l6ZSIsInRvcE9mZnNldCIsImJpbmQiLCJib3VuZGFyeSIsIl9kb0xheW91dEdyaWRBeGlzVmVydGljYWwiLCJsZWZ0T2Zmc2V0IiwibmV3V2lkdGgiLCJfZG9MYXlvdXRHcmlkIiwiX2dldEhvcml6b250YWxCYXNlV2lkdGgiLCJfZG9MYXlvdXQiLCJNYXRoIiwiYWJzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCQyxTQUF2QztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlDLElBQUksR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDZjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRSxDQU5TOztBQU9mO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsVUFBVSxFQUFFLENBWkc7O0FBY2Y7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxRQUFRLEVBQUUsQ0FuQks7O0FBb0JmO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFFO0FBekJTLENBQVIsQ0FBWDtBQTRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQUlDLFVBQVUsR0FBR04sRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxJQUFJLEVBQUUsQ0FOZTs7QUFPckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJSyxFQUFBQSxTQUFTLEVBQUUsQ0FaVTs7QUFhckI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxRQUFRLEVBQUU7QUFsQlcsQ0FBUixDQUFqQjtBQXFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUMsYUFBYSxHQUFHVCxFQUFFLENBQUND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QUE2eUJsQjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJdUMsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFFBQUksS0FBSzlDLFlBQUwsSUFBcUIsS0FBS21DLElBQUwsQ0FBVXVCLFFBQVYsQ0FBbUJFLE1BQW5CLEdBQTRCLENBQXJELEVBQXdEO0FBQ3BELFdBQUsrRixTQUFMOztBQUNBLFdBQUszSixZQUFMLEdBQW9CLEtBQXBCO0FBQ0g7QUFDSjtBQS96QmlCLENBQVQsQ0FBYjtBQWswQkE1QixFQUFFLENBQUNnQixNQUFILEdBQVkwSyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzSyxNQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXHJcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxyXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IE5vZGVFdmVudCA9IHJlcXVpcmUoJy4uL0NDTm9kZScpLkV2ZW50VHlwZTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuIEVudW0gZm9yIExheW91dCB0eXBlXHJcbiAqICEjemgg5biD5bGA57G75Z6LXHJcbiAqIEBlbnVtIExheW91dC5UeXBlXHJcbiAqL1xyXG52YXIgVHlwZSA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE5vbmUgTGF5b3V0XHJcbiAgICAgKiAhI3poIOWPlua2iOW4g+WxgFxyXG4gICAgICpAcHJvcGVydHkge051bWJlcn0gTk9ORVxyXG4gICAgICovXHJcbiAgICBOT05FOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEhvcml6b250YWwgTGF5b3V0XHJcbiAgICAgKiAhI3poIOawtOW5s+W4g+WxgFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhPUklaT05UQUxcclxuICAgICAqL1xyXG4gICAgSE9SSVpPTlRBTDogMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVmVydGljYWwgTGF5b3V0XHJcbiAgICAgKiAhI3poIOWeguebtOW4g+WxgFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFZFUlRJQ0FMXHJcbiAgICAgKi9cclxuICAgIFZFUlRJQ0FMOiAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEdyaWQgTGF5b3V0XHJcbiAgICAgKiAhI3poIOe9keagvOW4g+WxgFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEdSSURcclxuICAgICAqL1xyXG4gICAgR1JJRDogMyxcclxufSk7XHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBMYXlvdXQgUmVzaXplIE1vZGVcclxuICogISN6aCDnvKnmlL7mqKHlvI9cclxuICogQGVudW0gTGF5b3V0LlJlc2l6ZU1vZGVcclxuICovXHJcbnZhciBSZXNpemVNb2RlID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gRG9uJ3QgZG8gYW55IHNjYWxlLlxyXG4gICAgICogISN6aCDkuI3lgZrku7vkvZXnvKnmlL5cclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT05FXHJcbiAgICAgKi9cclxuICAgIE5PTkU6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGNvbnRhaW5lciBzaXplIHdpbGwgYmUgZXhwYW5kZWQgd2l0aCBpdHMgY2hpbGRyZW4ncyBzaXplLlxyXG4gICAgICogISN6aCDlrrnlmajnmoTlpKflsI/kvJrmoLnmja7lrZDoioLngrnnmoTlpKflsI/oh6rliqjnvKnmlL7jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05UQUlORVJcclxuICAgICAqL1xyXG4gICAgQ09OVEFJTkVSOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIENoaWxkIGl0ZW0gc2l6ZSB3aWxsIGJlIGFkanVzdGVkIHdpdGggdGhlIGNvbnRhaW5lcidzIHNpemUuXHJcbiAgICAgKiAhI3poIOWtkOiKgueCueeahOWkp+Wwj+S8mumaj+edgOWuueWZqOeahOWkp+Wwj+iHquWKqOe8qeaUvuOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENISUxEUkVOXHJcbiAgICAgKi9cclxuICAgIENISUxEUkVOOiAyXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgR3JpZCBMYXlvdXQgc3RhcnQgYXhpcyBkaXJlY3Rpb24uXHJcbiAqIFRoZSBpdGVtcyBpbiBncmlkIGxheW91dCB3aWxsIGJlIGFycmFuZ2VkIGluIGVhY2ggYXhpcyBhdCBmaXJzdC47XHJcbiAqICEjemgg5biD5bGA6L205ZCR77yM5Y+q55So5LqOIEdSSUQg5biD5bGA44CCXHJcbiAqIEBlbnVtIExheW91dC5BeGlzRGlyZWN0aW9uXHJcbiAqL1xyXG52YXIgQXhpc0RpcmVjdGlvbiA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBob3Jpem9udGFsIGF4aXMuXHJcbiAgICAgKiAhI3poIOi/m+ihjOawtOW5s+aWueWQkeW4g+WxgFxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhPUklaT05UQUxcclxuICAgICAqL1xyXG4gICAgSE9SSVpPTlRBTDogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdmVydGljYWwgYXhpcy5cclxuICAgICAqICEjemgg6L+b6KGM5Z6C55u05pa55ZCR5biD5bGAXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVkVSVElDQUxcclxuICAgICAqL1xyXG4gICAgVkVSVElDQUw6IDEsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgdmVydGljYWwgbGF5b3V0IGRpcmVjdGlvbi5cclxuICogIFVzZWQgaW4gR3JpZCBMYXlvdXQgdG9nZXRoZXIgd2l0aCBBeGlzRGlyZWN0aW9uIGlzIFZFUlRJQ0FMXHJcbiAqICEjemgg5Z6C55u05pa55ZCR5biD5bGA5pa55byPXHJcbiAqIEBlbnVtIExheW91dC5WZXJ0aWNhbERpcmVjdGlvblxyXG4gKi9cclxudmFyIFZlcnRpY2FsRGlyZWN0aW9uID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSXRlbXMgYXJyYW5nZWQgZnJvbSBib3R0b20gdG8gdG9wLlxyXG4gICAgICogISN6aCDku47kuIvliLDkuIrmjpLliJdcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1RUT01fVE9fVE9QXHJcbiAgICAgKi9cclxuICAgIEJPVFRPTV9UT19UT1A6IDAsXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gSXRlbXMgYXJyYW5nZWQgZnJvbSB0b3AgdG8gYm90dG9tLlxyXG4gICAgICogISN6aCDku47kuIrliLDkuIvmjpLliJdcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUT1BfVE9fQk9UVE9NXHJcbiAgICAgKi9cclxuICAgIFRPUF9UT19CT1RUT006IDEsXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gRW51bSBmb3IgaG9yaXpvbnRhbCBsYXlvdXQgZGlyZWN0aW9uLlxyXG4gKiAgVXNlZCBpbiBHcmlkIExheW91dCB0b2dldGhlciB3aXRoIEF4aXNEaXJlY3Rpb24gaXMgSE9SSVpPTlRBTFxyXG4gKiAhI3poIOawtOW5s+aWueWQkeW4g+WxgOaWueW8j1xyXG4gKiBAZW51bSBMYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvblxyXG4gKi9cclxudmFyIEhvcml6b250YWxEaXJlY3Rpb24gPSBjYy5FbnVtKHtcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJdGVtcyBhcnJhbmdlZCBmcm9tIGxlZnQgdG8gcmlnaHQuXHJcbiAgICAgKiAhI3poIOS7juW3puW+gOWPs+aOkuWIl1xyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IExFRlRfVE9fUklHSFRcclxuICAgICAqL1xyXG4gICAgTEVGVF9UT19SSUdIVDogMCxcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBJdGVtcyBhcnJhbmdlZCBmcm9tIHJpZ2h0IHRvIGxlZnQuXHJcbiAgICAgKiAhI3poIOS7juWPs+W+gOW3puaOkuWIl1xyXG4gICAgICpAcHJvcGVydHkge051bWJlcn0gUklHSFRfVE9fTEVGVFxyXG4gICAgICovXHJcbiAgICBSSUdIVF9UT19MRUZUOiAxLFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIFRoZSBMYXlvdXQgaXMgYSBjb250YWluZXIgY29tcG9uZW50LCB1c2UgaXQgdG8gYXJyYW5nZSBjaGlsZCBlbGVtZW50cyBlYXNpbHkuPGJyPlxyXG4gKiBOb3Rl77yaPGJyPlxyXG4gKiAxLlNjYWxpbmcgYW5kIHJvdGF0aW9uIG9mIGNoaWxkIG5vZGVzIGFyZSBub3QgY29uc2lkZXJlZC48YnI+XHJcbiAqIDIuQWZ0ZXIgc2V0dGluZyB0aGUgTGF5b3V0LCB0aGUgcmVzdWx0cyBuZWVkIHRvIGJlIHVwZGF0ZWQgdW50aWwgdGhlIG5leHQgZnJhbWUsXHJcbiAqIHVubGVzcyB5b3UgbWFudWFsbHkgY2FsbCB7eyNjcm9zc0xpbmsgXCJMYXlvdXQvdXBkYXRlTGF5b3V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9feOAglxyXG4gKiAhI3poXHJcbiAqIExheW91dCDnu4Tku7bnm7jlvZPkuo7kuIDkuKrlrrnlmajvvIzog73oh6rliqjlr7nlroPnmoTmiYDmnInlrZDoioLngrnov5vooYznu5/kuIDmjpLniYjjgII8YnI+XHJcbiAqIOazqOaEj++8mjxicj5cclxuICogMS7kuI3kvJrogIPomZHlrZDoioLngrnnmoTnvKnmlL7lkozml4vovazjgII8YnI+XHJcbiAqIDIu5a+5IExheW91dCDorr7nva7lkI7nu5PmnpzpnIDopoHliLDkuIvkuIDluKfmiY3kvJrmm7TmlrDvvIzpmaTpnZ7kvaDorr7nva7lrozku6XlkI7miYvliqjosIPnlKgge3sjY3Jvc3NMaW5rIFwiTGF5b3V0L3VwZGF0ZUxheW91dDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX3jgIJcclxuICogQGNsYXNzIExheW91dFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbnZhciBMYXlvdXQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuTGF5b3V0JyxcclxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcclxuXHJcbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XHJcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9MYXlvdXQnLFxyXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5sYXlvdXQnLFxyXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvY2NsYXlvdXQuanMnLFxyXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgX2xheW91dFNpemU6IGNjLnNpemUoMzAwLCAyMDApLFxyXG4gICAgICAgIF9sYXlvdXREaXJ0eToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIF9yZXNpemU6IFJlc2l6ZU1vZGUuTk9ORSxcclxuXHJcbiAgICAgICAgLy9UT0RPOiByZWZhY3RvcmluZyB0aGlzIG5hbWUgYWZ0ZXIgZGF0YSB1cGdyYWRlIG1hY2hhbmlzbSBpcyBvdXQuXHJcbiAgICAgICAgX04kbGF5b3V0VHlwZTogVHlwZS5OT05FLFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIGxheW91dCB0eXBlLlxyXG4gICAgICAgICAqICEjemgg5biD5bGA57G75Z6LXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYXlvdXQuVHlwZX0gdHlwZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IExheW91dC5UeXBlLk5PTkVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFR5cGUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX04kbGF5b3V0VHlwZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX04kbGF5b3V0VHlwZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgdGhpcy50eXBlICE9PSBUeXBlLk5PTkUgJiYgdGhpcy5fcmVzaXplID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZUxheW91dGVkID0gX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfTGF5b3V0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZUxheW91dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LmxheW91dF90eXBlJyxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBUaGUgYXJlIHRocmVlIHJlc2l6ZSBtb2RlcyBmb3IgTGF5b3V0LlxyXG4gICAgICAgICAqIE5vbmUsIHJlc2l6ZSBDb250YWluZXIgYW5kIHJlc2l6ZSBjaGlsZHJlbi5cclxuICAgICAgICAgKiAhI3poIOe8qeaUvuaooeW8j1xyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGF5b3V0LlJlc2l6ZU1vZGV9IHJlc2l6ZU1vZGVcclxuICAgICAgICAgKiBAZGVmYXVsdCBSZXNpemVNb2RlLk5PTkVcclxuICAgICAgICAgKi9cclxuICAgICAgICByZXNpemVNb2RlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFJlc2l6ZU1vZGUsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnJlc2l6ZV9tb2RlJyxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFR5cGUuTk9ORSAmJiB2YWx1ZSA9PT0gUmVzaXplTW9kZS5DSElMRFJFTikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgdmFsdWUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlTGF5b3V0ZWQgPSBfU2NlbmUuRGV0ZWN0Q29uZmxpY3QuY2hlY2tDb25mbGljdF9MYXlvdXQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlTGF5b3V0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBjZWxsIHNpemUgZm9yIGdyaWQgbGF5b3V0LlxyXG4gICAgICAgICAqICEjemgg5q+P5Liq5qC85a2Q55qE5aSn5bCP77yM5Y+q5pyJ5biD5bGA57G75Z6L5Li6IEdSSUQg55qE5pe25YCZ5omN5pyJ5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtTaXplfSBjZWxsU2l6ZVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGNjLnNpemUoNDAsIDQwKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNlbGxTaXplOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLnNpemUoNDAsIDQwKSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQuY2VsbF9zaXplJyxcclxuICAgICAgICAgICAgdHlwZTogY2MuU2l6ZSxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBzdGFydCBheGlzIGZvciBncmlkIGxheW91dC4gSWYgeW91IGNob29zZSBob3Jpem9udGFsLCB0aGVuIGNoaWxkcmVuIHdpbGwgbGF5b3V0IGhvcml6b250YWxseSBhdCBmaXJzdCxcclxuICAgICAgICAgKiBhbmQgdGhlbiBicmVhayBsaW5lIG9uIGRlbWFuZC4gQ2hvb3NlIHZlcnRpY2FsIGlmIHlvdSB3YW50IHRvIGxheW91dCB2ZXJ0aWNhbGx5IGF0IGZpcnN0IC5cclxuICAgICAgICAgKiAhI3poIOi1t+Wni+i9tOaWueWQkeexu+Wei++8jOWPr+i/m+ihjOawtOW5s+WSjOWeguebtOW4g+WxgOaOkuWIl++8jOWPquacieW4g+WxgOexu+Wei+S4uiBHUklEIOeahOaXtuWAmeaJjeacieaViOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGF5b3V0LkF4aXNEaXJlY3Rpb259IHN0YXJ0QXhpc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXJ0QXhpczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBBeGlzRGlyZWN0aW9uLkhPUklaT05UQUwsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnN0YXJ0X2F4aXMnLFxyXG4gICAgICAgICAgICB0eXBlOiBBeGlzRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgdGhpcy5fcmVzaXplID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZUxheW91dGVkID0gX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfTGF5b3V0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZUxheW91dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgbGVmdCBwYWRkaW5nIG9mIGxheW91dCwgaXQgb25seSBlZmZlY3QgdGhlIGxheW91dCBpbiBvbmUgZGlyZWN0aW9uLlxyXG4gICAgICAgICAqICEjemgg5a655Zmo5YaF5bem6L656Led77yM5Y+q5Lya5Zyo5LiA5Liq5biD5bGA5pa55ZCR5LiK55Sf5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhZGRpbmdMZWZ0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGFkZGluZ0xlZnQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQucGFkZGluZ19sZWZ0JyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgcmlnaHQgcGFkZGluZyBvZiBsYXlvdXQsIGl0IG9ubHkgZWZmZWN0IHRoZSBsYXlvdXQgaW4gb25lIGRpcmVjdGlvbi5cclxuICAgICAgICAgKiAhI3poIOWuueWZqOWGheWPs+i+uei3ne+8jOWPquS8muWcqOS4gOS4quW4g+WxgOaWueWQkeS4iueUn+aViOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYWRkaW5nUmlnaHRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYWRkaW5nUmlnaHQ6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQucGFkZGluZ19yaWdodCcsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gVGhlIHRvcCBwYWRkaW5nIG9mIGxheW91dCwgaXQgb25seSBlZmZlY3QgdGhlIGxheW91dCBpbiBvbmUgZGlyZWN0aW9uLlxyXG4gICAgICAgICAqICEjemgg5a655Zmo5YaF5LiK6L656Led77yM5Y+q5Lya5Zyo5LiA5Liq5biD5bGA5pa55ZCR5LiK55Sf5pWI44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhZGRpbmdUb3BcclxuICAgICAgICAgKi9cclxuICAgICAgICBwYWRkaW5nVG9wOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnBhZGRpbmdfdG9wJyxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgYm90dG9tIHBhZGRpbmcgb2YgbGF5b3V0LCBpdCBvbmx5IGVmZmVjdCB0aGUgbGF5b3V0IGluIG9uZSBkaXJlY3Rpb24uXHJcbiAgICAgICAgICogISN6aCDlrrnlmajlhoXkuIvovrnot53vvIzlj6rkvJrlnKjkuIDkuKrluIPlsYDmlrnlkJHkuIrnlJ/mlYjjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFkZGluZ0JvdHRvbVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHBhZGRpbmdCb3R0b206IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQucGFkZGluZ19ib3R0b20nLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFRoZSBkaXN0YW5jZSBpbiB4LWF4aXMgYmV0d2VlbiBlYWNoIGVsZW1lbnQgaW4gbGF5b3V0LlxyXG4gICAgICAgICAqICEjemgg5a2Q6IqC54K55LmL6Ze055qE5rC05bmz6Ze06Led44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNwYWNpbmdYXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc3BhY2luZ1g6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnNwYWNlX3gnXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlbiBUaGUgZGlzdGFuY2UgaW4geS1heGlzIGJldHdlZW4gZWFjaCBlbGVtZW50IGluIGxheW91dC5cclxuICAgICAgICAgKiAhI3poIOWtkOiKgueCueS5i+mXtOeahOWeguebtOmXtOi3neOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGFjaW5nWVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNwYWNpbmdZOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5zcGFjZV95J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBPbmx5IHRha2UgZWZmZWN0IGluIFZlcnRpY2FsIGxheW91dCBtb2RlLlxyXG4gICAgICAgICAqIFRoaXMgb3B0aW9uIGNoYW5nZXMgdGhlIHN0YXJ0IGVsZW1lbnQncyBwb3NpdGlvbmluZy5cclxuICAgICAgICAgKiAhI3poIOWeguebtOaOkuWIl+WtkOiKgueCueeahOaWueWQkeOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGF5b3V0LlZlcnRpY2FsRGlyZWN0aW9ufSB2ZXJ0aWNhbERpcmVjdGlvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnRpY2FsRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00sXHJcbiAgICAgICAgICAgIHR5cGU6IFZlcnRpY2FsRGlyZWN0aW9uLFxyXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQudmVydGljYWxfZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogT25seSB0YWtlIGVmZmVjdCBpbiBIb3Jpem9udGFsIGxheW91dCBtb2RlLlxyXG4gICAgICAgICAqIFRoaXMgb3B0aW9uIGNoYW5nZXMgdGhlIHN0YXJ0IGVsZW1lbnQncyBwb3NpdGlvbmluZy5cclxuICAgICAgICAgKiAhI3poIOawtOW5s+aOkuWIl+WtkOiKgueCueeahOaWueWQkeOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGF5b3V0Lkhvcml6b250YWxEaXJlY3Rpb259IGhvcml6b250YWxEaXJlY3Rpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBob3Jpem9udGFsRGlyZWN0aW9uOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IEhvcml6b250YWxEaXJlY3Rpb24uTEVGVF9UT19SSUdIVCxcclxuICAgICAgICAgICAgdHlwZTogSG9yaXpvbnRhbERpcmVjdGlvbixcclxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0Lmhvcml6b250YWxfZGlyZWN0aW9uJyxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIEFkanVzdCB0aGUgbGF5b3V0IGlmIHRoZSBjaGlsZHJlbiBzY2FsZWQuXHJcbiAgICAgICAgICogISN6aCDlrZDoioLngrnnvKnmlL7mr5TkvovmmK/lkKblvbHlk43luIPlsYDjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgYWZmZWN0ZWRCeVNjYWxlXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBhZmZlY3RlZEJ5U2NhbGU6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXZlcnkgdGltZSB5b3Ugc3dpdGNoIHRoaXMgc3RhdGUsIHRoZSBsYXlvdXQgd2lsbCBiZSBjYWxjdWxhdGVkLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQuYWZmZWN0ZWRfYnlfc2NhbGUnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgVHlwZTogVHlwZSxcclxuICAgICAgICBWZXJ0aWNhbERpcmVjdGlvbjogVmVydGljYWxEaXJlY3Rpb24sXHJcbiAgICAgICAgSG9yaXpvbnRhbERpcmVjdGlvbjogSG9yaXpvbnRhbERpcmVjdGlvbixcclxuICAgICAgICBSZXNpemVNb2RlOiBSZXNpemVNb2RlLFxyXG4gICAgICAgIEF4aXNEaXJlY3Rpb246IEF4aXNEaXJlY3Rpb24sXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLmVxdWFscyhjYy5zaXplKDAsIDApKSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUodGhpcy5fbGF5b3V0U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kb0xheW91dERpcnR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZG9TY2FsZURpcnR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0aGlzLl9sYXlvdXREaXJ0eSB8fCB0aGlzLmFmZmVjdGVkQnlTY2FsZTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZEV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFLCB0aGlzLnVwZGF0ZUxheW91dCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX3Jlc2l6ZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihOb2RlRXZlbnQuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihOb2RlRXZlbnQuQ0hJTERfQURERUQsIHRoaXMuX2NoaWxkQWRkZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihOb2RlRXZlbnQuQ0hJTERfUkVNT1ZFRCwgdGhpcy5fY2hpbGRSZW1vdmVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oTm9kZUV2ZW50LkNISUxEX1JFT1JERVIsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX2FkZENoaWxkcmVuRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy51cGRhdGVMYXlvdXQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fcmVzaXplZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihOb2RlRXZlbnQuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoTm9kZUV2ZW50LkNISUxEX0FEREVELCB0aGlzLl9jaGlsZEFkZGVkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKE5vZGVFdmVudC5DSElMRF9SRU1PVkVELCB0aGlzLl9jaGlsZFJlbW92ZWQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoTm9kZUV2ZW50LkNISUxEX1JFT1JERVIsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUNoaWxkcmVuRXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2FkZENoaWxkcmVuRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgY2hpbGQub24oTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2RvU2NhbGVEaXJ0eSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGNoaWxkLm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGNoaWxkLm9uKE5vZGVFdmVudC5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XHJcbiAgICAgICAgICAgIGNoaWxkLm9uKCdhY3RpdmUtaW4taGllcmFyY2h5LWNoYW5nZWQnLCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW1vdmVDaGlsZHJlbkV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGNoaWxkLm9mZihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fZG9TY2FsZURpcnR5LCB0aGlzKTtcclxuICAgICAgICAgICAgY2hpbGQub2ZmKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICAgICAgY2hpbGQub2ZmKCdhY3RpdmUtaW4taGllcmFyY2h5LWNoYW5nZWQnLCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9jaGlsZEFkZGVkOiBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fZG9TY2FsZURpcnR5LCB0aGlzKTtcclxuICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XHJcbiAgICAgICAgY2hpbGQub24oTm9kZUV2ZW50LkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICBjaGlsZC5vbignYWN0aXZlLWluLWhpZXJhcmNoeS1jaGFuZ2VkJywgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX2NoaWxkUmVtb3ZlZDogZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgY2hpbGQub2ZmKE5vZGVFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzLl9kb1NjYWxlRGlydHksIHRoaXMpO1xyXG4gICAgICAgIGNoaWxkLm9mZihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcclxuICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIGNoaWxkLm9mZihOb2RlRXZlbnQuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xyXG4gICAgICAgIGNoaWxkLm9mZignYWN0aXZlLWluLWhpZXJhcmNoeS1jaGFuZ2VkJywgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3Jlc2l6ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9sYXlvdXRTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfZG9MYXlvdXRIb3Jpem9udGFsbHk6IGZ1bmN0aW9uIChiYXNlV2lkdGgsIHJvd0JyZWFrLCBmblBvc2l0aW9uWSwgYXBwbHlDaGlsZHJlbikge1xyXG4gICAgICAgIHZhciBsYXlvdXRBbmNob3IgPSB0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKTtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIHZhciBzaWduID0gMTtcclxuICAgICAgICB2YXIgcGFkZGluZ1ggPSB0aGlzLnBhZGRpbmdMZWZ0O1xyXG4gICAgICAgIHZhciBsZWZ0Qm91bmRhcnlPZkxheW91dCA9IC1sYXlvdXRBbmNob3IueCAqIGJhc2VXaWR0aDtcclxuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgc2lnbiA9IC0xO1xyXG4gICAgICAgICAgICBsZWZ0Qm91bmRhcnlPZkxheW91dCA9ICgxIC0gbGF5b3V0QW5jaG9yLngpICogYmFzZVdpZHRoO1xyXG4gICAgICAgICAgICBwYWRkaW5nWCA9IHRoaXMucGFkZGluZ1JpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRYID0gbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgKyBzaWduICogcGFkZGluZ1ggLSBzaWduICogdGhpcy5zcGFjaW5nWDtcclxuICAgICAgICB2YXIgcm93TWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICB2YXIgdGVtcE1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgdmFyIHNlY29uZE1heEhlaWdodCA9IDA7XHJcbiAgICAgICAgdmFyIHJvdyA9IDA7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gMDtcclxuXHJcbiAgICAgICAgdmFyIG1heEhlaWdodENoaWxkQW5jaG9yWSA9IDA7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVDaGlsZENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNoaWxkQ291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5ld0NoaWxkV2lkdGggPSB0aGlzLmNlbGxTaXplLndpZHRoO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09IFR5cGUuR1JJRCAmJiB0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ0hJTERSRU4pIHtcclxuICAgICAgICAgICAgbmV3Q2hpbGRXaWR0aCA9IChiYXNlV2lkdGggLSAodGhpcy5wYWRkaW5nTGVmdCArIHRoaXMucGFkZGluZ1JpZ2h0KSAtIChhY3RpdmVDaGlsZENvdW50IC0gMSkgKiB0aGlzLnNwYWNpbmdYKSAvIGFjdGl2ZUNoaWxkQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRTY2FsZVggPSB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVgpO1xyXG4gICAgICAgICAgICBsZXQgY2hpbGRTY2FsZVkgPSB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVkpO1xyXG4gICAgICAgICAgICBpZiAoIWNoaWxkLmFjdGl2ZUluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2ZvciByZXNpemluZyBjaGlsZHJlblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVzaXplID09PSBSZXNpemVNb2RlLkNISUxEUkVOKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC53aWR0aCA9IG5ld0NoaWxkV2lkdGggLyBjaGlsZFNjYWxlWDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFR5cGUuR1JJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmhlaWdodCA9IHRoaXMuY2VsbFNpemUuaGVpZ2h0IC8gY2hpbGRTY2FsZVk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbmNob3JYID0gY2hpbGQuYW5jaG9yWDtcclxuICAgICAgICAgICAgdmFyIGNoaWxkQm91bmRpbmdCb3hXaWR0aCA9IGNoaWxkLndpZHRoICogY2hpbGRTY2FsZVg7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZEJvdW5kaW5nQm94SGVpZ2h0ID0gY2hpbGQuaGVpZ2h0ICogY2hpbGRTY2FsZVk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vjb25kTWF4SGVpZ2h0ID4gdGVtcE1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcE1heEhlaWdodCA9IHNlY29uZE1heEhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNoaWxkQm91bmRpbmdCb3hIZWlnaHQgPj0gdGVtcE1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kTWF4SGVpZ2h0ID0gdGVtcE1heEhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRlbXBNYXhIZWlnaHQgPSBjaGlsZEJvdW5kaW5nQm94SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbWF4SGVpZ2h0Q2hpbGRBbmNob3JZID0gY2hpbGQuZ2V0QW5jaG9yUG9pbnQoKS55O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgICAgIGFuY2hvclggPSAxIC0gY2hpbGQuYW5jaG9yWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0WCA9IG5leHRYICsgc2lnbiAqIGFuY2hvclggKiBjaGlsZEJvdW5kaW5nQm94V2lkdGggKyBzaWduICogdGhpcy5zcGFjaW5nWDtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0Qm91bmRhcnlPZkNoaWxkID0gc2lnbiAqICgxIC0gYW5jaG9yWCkgKiBjaGlsZEJvdW5kaW5nQm94V2lkdGg7XHJcblxyXG4gICAgICAgICAgICBpZiAocm93QnJlYWspIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3dCcmVha0JvdW5kYXJ5ID0gbmV4dFggKyByaWdodEJvdW5kYXJ5T2ZDaGlsZCArIHNpZ24gKiAoc2lnbiA+IDAgPyB0aGlzLnBhZGRpbmdSaWdodCA6IHRoaXMucGFkZGluZ0xlZnQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRUb1JpZ2h0Um93QnJlYWsgPSB0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24uTEVGVF9UT19SSUdIVCAmJiByb3dCcmVha0JvdW5kYXJ5ID4gKDEgLSBsYXlvdXRBbmNob3IueCkgKiBiYXNlV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRUb0xlZnRSb3dCcmVhayA9IHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUICYmIHJvd0JyZWFrQm91bmRhcnkgPCAtbGF5b3V0QW5jaG9yLnggKiBiYXNlV2lkdGg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRUb1JpZ2h0Um93QnJlYWsgfHwgcmlnaHRUb0xlZnRSb3dCcmVhaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRCb3VuZGluZ0JveEhlaWdodCA+PSB0ZW1wTWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRNYXhIZWlnaHQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZE1heEhlaWdodCA9IHRlbXBNYXhIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TWF4SGVpZ2h0ICs9IHNlY29uZE1heEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kTWF4SGVpZ2h0ID0gdGVtcE1heEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd01heEhlaWdodCArPSB0ZW1wTWF4SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRNYXhIZWlnaHQgPSBjaGlsZEJvdW5kaW5nQm94SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wTWF4SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFggPSBsZWZ0Qm91bmRhcnlPZkxheW91dCArIHNpZ24gKiAocGFkZGluZ1ggKyBhbmNob3JYICogY2hpbGRCb3VuZGluZ0JveFdpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICByb3crKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbmFsUG9zaXRpb25ZID0gZm5Qb3NpdGlvblkoY2hpbGQsIHJvd01heEhlaWdodCwgcm93KTtcclxuICAgICAgICAgICAgaWYgKGJhc2VXaWR0aCA+PSAoY2hpbGRCb3VuZGluZ0JveFdpZHRoICsgdGhpcy5wYWRkaW5nTGVmdCArIHRoaXMucGFkZGluZ1JpZ2h0KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFwcGx5Q2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZXRQb3NpdGlvbihjYy52MihuZXh0WCwgZmluYWxQb3NpdGlvblkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNpZ25YID0gMTtcclxuICAgICAgICAgICAgdmFyIHRlbXBGaW5hbFBvc2l0aW9uWTtcclxuICAgICAgICAgICAgdmFyIHRvcE1hcmlnbiA9ICh0ZW1wTWF4SGVpZ2h0ID09PSAwKSA/IGNoaWxkQm91bmRpbmdCb3hIZWlnaHQgOiB0ZW1wTWF4SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gY29udGFpbmVyUmVzaXplQm91bmRhcnkgfHwgdGhpcy5ub2RlLl9jb250ZW50U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBzaWduWCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdGVtcEZpbmFsUG9zaXRpb25ZID0gZmluYWxQb3NpdGlvblkgKyBzaWduWCAqICh0b3BNYXJpZ24gKiBtYXhIZWlnaHRDaGlsZEFuY2hvclkgKyB0aGlzLnBhZGRpbmdCb3R0b20pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBGaW5hbFBvc2l0aW9uWSA8IGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSB0ZW1wRmluYWxQb3NpdGlvblk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5IHx8IC10aGlzLm5vZGUuX2NvbnRlbnRTaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRlbXBGaW5hbFBvc2l0aW9uWSA9IGZpbmFsUG9zaXRpb25ZICsgc2lnblggKiAodG9wTWFyaWduICogbWF4SGVpZ2h0Q2hpbGRBbmNob3JZICsgdGhpcy5wYWRkaW5nVG9wKTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wRmluYWxQb3NpdGlvblkgPiBjb250YWluZXJSZXNpemVCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gdGVtcEZpbmFsUG9zaXRpb25ZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXh0WCArPSByaWdodEJvdW5kYXJ5T2ZDaGlsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXJSZXNpemVCb3VuZGFyeTtcclxuICAgIH0sXHJcblxyXG4gICAgX2dldFZlcnRpY2FsQmFzZUhlaWdodDogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XHJcbiAgICAgICAgdmFyIG5ld0hlaWdodCA9IDA7XHJcbiAgICAgICAgdmFyIGFjdGl2ZUNoaWxkQ291bnQgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmFjdGl2ZUluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2hpbGRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCArPSBjaGlsZC5oZWlnaHQgKiB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXdIZWlnaHQgKz0gKGFjdGl2ZUNoaWxkQ291bnQgLSAxKSAqIHRoaXMuc3BhY2luZ1kgKyB0aGlzLnBhZGRpbmdCb3R0b20gKyB0aGlzLnBhZGRpbmdUb3A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdIZWlnaHQgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdIZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIF9kb0xheW91dFZlcnRpY2FsbHk6IGZ1bmN0aW9uIChiYXNlSGVpZ2h0LCBjb2x1bW5CcmVhaywgZm5Qb3NpdGlvblgsIGFwcGx5Q2hpbGRyZW4pIHtcclxuICAgICAgICB2YXIgbGF5b3V0QW5jaG9yID0gdGhpcy5ub2RlLmdldEFuY2hvclBvaW50KCk7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG5cclxuICAgICAgICB2YXIgc2lnbiA9IDE7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nQm90dG9tO1xyXG4gICAgICAgIHZhciBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gLWxheW91dEFuY2hvci55ICogYmFzZUhlaWdodDtcclxuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSkge1xyXG4gICAgICAgICAgICBzaWduID0gLTE7XHJcbiAgICAgICAgICAgIGJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQgPSAoMSAtIGxheW91dEFuY2hvci55KSAqIGJhc2VIZWlnaHQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5leHRZID0gYm90dG9tQm91bmRhcnlPZkxheW91dCArIHNpZ24gKiBwYWRkaW5nWSAtIHNpZ24gKiB0aGlzLnNwYWNpbmdZO1xyXG4gICAgICAgIHZhciBjb2x1bW5NYXhXaWR0aCA9IDA7XHJcbiAgICAgICAgdmFyIHRlbXBNYXhXaWR0aCA9IDA7XHJcbiAgICAgICAgdmFyIHNlY29uZE1heFdpZHRoID0gMDtcclxuICAgICAgICB2YXIgY29sdW1uID0gMDtcclxuICAgICAgICB2YXIgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSAwO1xyXG4gICAgICAgIHZhciBtYXhXaWR0aENoaWxkQW5jaG9yWCA9IDA7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVDaGlsZENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUNoaWxkQ291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5ld0NoaWxkSGVpZ2h0ID0gdGhpcy5jZWxsU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gVHlwZS5HUklEICYmIHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DSElMRFJFTikge1xyXG4gICAgICAgICAgICBuZXdDaGlsZEhlaWdodCA9IChiYXNlSGVpZ2h0IC0gKHRoaXMucGFkZGluZ1RvcCArIHRoaXMucGFkZGluZ0JvdHRvbSkgLSAoYWN0aXZlQ2hpbGRDb3VudCAtIDEpICogdGhpcy5zcGFjaW5nWSkgLyBhY3RpdmVDaGlsZENvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IGNoaWxkU2NhbGVYID0gdGhpcy5fZ2V0VXNlZFNjYWxlVmFsdWUoY2hpbGQuc2NhbGVYKTtcclxuICAgICAgICAgICAgbGV0IGNoaWxkU2NhbGVZID0gdGhpcy5fZ2V0VXNlZFNjYWxlVmFsdWUoY2hpbGQuc2NhbGVZKTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZC5hY3RpdmVJbkhpZXJhcmNoeSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vZm9yIHJlc2l6aW5nIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ0hJTERSRU4pIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmhlaWdodCA9IG5ld0NoaWxkSGVpZ2h0IC8gY2hpbGRTY2FsZVk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBUeXBlLkdSSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC53aWR0aCA9IHRoaXMuY2VsbFNpemUud2lkdGggLyBjaGlsZFNjYWxlWDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFuY2hvclkgPSBjaGlsZC5hbmNob3JZO1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRCb3VuZGluZ0JveFdpZHRoID0gY2hpbGQud2lkdGggKiBjaGlsZFNjYWxlWDtcclxuICAgICAgICAgICAgdmFyIGNoaWxkQm91bmRpbmdCb3hIZWlnaHQgPSBjaGlsZC5oZWlnaHQgKiBjaGlsZFNjYWxlWTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWNvbmRNYXhXaWR0aCA+IHRlbXBNYXhXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcE1heFdpZHRoID0gc2Vjb25kTWF4V2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjaGlsZEJvdW5kaW5nQm94V2lkdGggPj0gdGVtcE1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWNvbmRNYXhXaWR0aCA9IHRlbXBNYXhXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRlbXBNYXhXaWR0aCA9IGNoaWxkQm91bmRpbmdCb3hXaWR0aDtcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoQ2hpbGRBbmNob3JYID0gY2hpbGQuZ2V0QW5jaG9yUG9pbnQoKS54O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSkge1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yWSA9IDEgLSBjaGlsZC5hbmNob3JZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRZID0gbmV4dFkgKyBzaWduICogYW5jaG9yWSAqIGNoaWxkQm91bmRpbmdCb3hIZWlnaHQgKyBzaWduICogdGhpcy5zcGFjaW5nWTtcclxuICAgICAgICAgICAgdmFyIHRvcEJvdW5kYXJ5T2ZDaGlsZCA9IHNpZ24gKiAoMSAtIGFuY2hvclkpICogY2hpbGRCb3VuZGluZ0JveEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5CcmVhaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbHVtbkJyZWFrQm91bmRhcnkgPSBuZXh0WSArIHRvcEJvdW5kYXJ5T2ZDaGlsZCArIHNpZ24gKiAoc2lnbiA+IDAgPyB0aGlzLnBhZGRpbmdUb3AgOiB0aGlzLnBhZGRpbmdCb3R0b20pO1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVRvVG9wQ29sdW1uQnJlYWsgPSB0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5CT1RUT01fVE9fVE9QICYmIGNvbHVtbkJyZWFrQm91bmRhcnkgPiAoMSAtIGxheW91dEFuY2hvci55KSAqIGJhc2VIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9wVG9Cb3R0b21Db2x1bW5CcmVhayA9IHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00gJiYgY29sdW1uQnJlYWtCb3VuZGFyeSA8IC1sYXlvdXRBbmNob3IueSAqIGJhc2VIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJvdHRvbVRvVG9wQ29sdW1uQnJlYWsgfHwgdG9wVG9Cb3R0b21Db2x1bW5CcmVhaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZEJvdW5kaW5nQm94V2lkdGggPj0gdGVtcE1heFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRNYXhXaWR0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kTWF4V2lkdGggPSB0ZW1wTWF4V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTWF4V2lkdGggKz0gc2Vjb25kTWF4V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZE1heFdpZHRoID0gdGVtcE1heFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTWF4V2lkdGggKz0gdGVtcE1heFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRNYXhXaWR0aCA9IGNoaWxkQm91bmRpbmdCb3hXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE1heFdpZHRoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFkgPSBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ICsgc2lnbiAqIChwYWRkaW5nWSArIGFuY2hvclkgKiBjaGlsZEJvdW5kaW5nQm94SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW4rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbmFsUG9zaXRpb25YID0gZm5Qb3NpdGlvblgoY2hpbGQsIGNvbHVtbk1heFdpZHRoLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICBpZiAoYmFzZUhlaWdodCA+PSAoY2hpbGRCb3VuZGluZ0JveEhlaWdodCArICh0aGlzLnBhZGRpbmdUb3AgKyB0aGlzLnBhZGRpbmdCb3R0b20pKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFwcGx5Q2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5zZXRQb3NpdGlvbihjYy52MihmaW5hbFBvc2l0aW9uWCwgbmV4dFkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNpZ25YID0gMTtcclxuICAgICAgICAgICAgdmFyIHRlbXBGaW5hbFBvc2l0aW9uWDtcclxuICAgICAgICAgICAgLy93aGVuIHRoZSBpdGVtIGlzIHRoZSBsYXN0IGNvbHVtbiBicmVhayBpdGVtLCB0aGUgdGVtcE1heFdpZHRoIHdpbGwgYmUgMC5cclxuICAgICAgICAgICAgdmFyIHJpZ2h0TWFyaWduID0gKHRlbXBNYXhXaWR0aCA9PT0gMCkgPyBjaGlsZEJvdW5kaW5nQm94V2lkdGggOiB0ZW1wTWF4V2lkdGg7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgICAgIHNpZ25YID0gLTE7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5IHx8IHRoaXMubm9kZS5fY29udGVudFNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRmluYWxQb3NpdGlvblggPSBmaW5hbFBvc2l0aW9uWCArIHNpZ25YICogKHJpZ2h0TWFyaWduICogbWF4V2lkdGhDaGlsZEFuY2hvclggKyB0aGlzLnBhZGRpbmdMZWZ0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wRmluYWxQb3NpdGlvblggPCBjb250YWluZXJSZXNpemVCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gdGVtcEZpbmFsUG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSBjb250YWluZXJSZXNpemVCb3VuZGFyeSB8fCAtdGhpcy5ub2RlLl9jb250ZW50U2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRlbXBGaW5hbFBvc2l0aW9uWCA9IGZpbmFsUG9zaXRpb25YICsgc2lnblggKiAocmlnaHRNYXJpZ24gKiBtYXhXaWR0aENoaWxkQW5jaG9yWCArIHRoaXMucGFkZGluZ1JpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wRmluYWxQb3NpdGlvblggPiBjb250YWluZXJSZXNpemVCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gdGVtcEZpbmFsUG9zaXRpb25YO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV4dFkgKz0gdG9wQm91bmRhcnlPZkNoaWxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5O1xyXG4gICAgfSxcclxuXHJcbiAgICBfZG9MYXlvdXRCYXNpYzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgdmFyIGFsbENoaWxkcmVuQm91bmRpbmdCb3ggPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghYWxsQ2hpbGRyZW5Cb3VuZGluZ0JveCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQm91bmRpbmdCb3ggPSBjaGlsZC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2hpbGRyZW5Cb3VuZGluZ0JveC51bmlvbihhbGxDaGlsZHJlbkJvdW5kaW5nQm94LCBjaGlsZC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhbGxDaGlsZHJlbkJvdW5kaW5nQm94KSB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0Qm90dG9tU3BhY2UgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoYWxsQ2hpbGRyZW5Cb3VuZGluZ0JveC54LCBhbGxDaGlsZHJlbkJvdW5kaW5nQm94LnkpKTtcclxuICAgICAgICAgICAgbGVmdEJvdHRvbVNwYWNlID0gY2MudjIobGVmdEJvdHRvbVNwYWNlLnggLSB0aGlzLnBhZGRpbmdMZWZ0LCBsZWZ0Qm90dG9tU3BhY2UueSAtIHRoaXMucGFkZGluZ0JvdHRvbSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmlnaHRUb3BTcGFjZSA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjYy52MihhbGxDaGlsZHJlbkJvdW5kaW5nQm94LnhNYXgsIGFsbENoaWxkcmVuQm91bmRpbmdCb3gueU1heCkpO1xyXG4gICAgICAgICAgICByaWdodFRvcFNwYWNlID0gY2MudjIocmlnaHRUb3BTcGFjZS54ICsgdGhpcy5wYWRkaW5nUmlnaHQsIHJpZ2h0VG9wU3BhY2UueSArIHRoaXMucGFkZGluZ1RvcCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3U2l6ZSA9IHJpZ2h0VG9wU3BhY2Uuc3ViKGxlZnRCb3R0b21TcGFjZSk7XHJcbiAgICAgICAgICAgIG5ld1NpemUgPSBjYy5zaXplKHBhcnNlRmxvYXQobmV3U2l6ZS54LnRvRml4ZWQoMikpLCBwYXJzZUZsb2F0KG5ld1NpemUueS50b0ZpeGVkKDIpKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobmV3U2l6ZS53aWR0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW52ZXJ0IGlzIHRvIGdldCB0aGUgY29vcmRpbmF0ZSBwb2ludCBvZiB0aGUgY2hpbGQgbm9kZSBpbiB0aGUgcGFyZW50IGNvb3JkaW5hdGUgc3lzdGVtXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QW5jaG9yWCA9ICgtbGVmdEJvdHRvbVNwYWNlLngpIC8gbmV3U2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmNob3JYID0gcGFyc2VGbG9hdChuZXdBbmNob3JYLnRvRml4ZWQoMikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdTaXplLmhlaWdodCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW52ZXJ0IGlzIHRvIGdldCB0aGUgY29vcmRpbmF0ZSBwb2ludCBvZiB0aGUgY2hpbGQgbm9kZSBpbiB0aGUgcGFyZW50IGNvb3JkaW5hdGUgc3lzdGVtXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QW5jaG9yWSA9ICgtbGVmdEJvdHRvbVNwYWNlLnkpIC8gbmV3U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5jaG9yWSA9IHBhcnNlRmxvYXQobmV3QW5jaG9yWS50b0ZpeGVkKDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUobmV3U2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZG9MYXlvdXRHcmlkQXhpc0hvcml6b250YWw6IGZ1bmN0aW9uIChsYXlvdXRBbmNob3IsIGxheW91dFNpemUpIHtcclxuICAgICAgICB2YXIgYmFzZVdpZHRoID0gbGF5b3V0U2l6ZS53aWR0aDtcclxuXHJcbiAgICAgICAgdmFyIHNpZ24gPSAxO1xyXG4gICAgICAgIHZhciBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gLWxheW91dEFuY2hvci55ICogbGF5b3V0U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nQm90dG9tO1xyXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NKSB7XHJcbiAgICAgICAgICAgIHNpZ24gPSAtMTtcclxuICAgICAgICAgICAgYm90dG9tQm91bmRhcnlPZkxheW91dCA9ICgxIC0gbGF5b3V0QW5jaG9yLnkpICogbGF5b3V0U2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGZuUG9zaXRpb25ZID0gZnVuY3Rpb24gKGNoaWxkLCB0b3BPZmZzZXQsIHJvdykge1xyXG4gICAgICAgICAgICByZXR1cm4gYm90dG9tQm91bmRhcnlPZkxheW91dCArIHNpZ24gKiAodG9wT2Zmc2V0ICsgY2hpbGQuYW5jaG9yWSAqIGNoaWxkLmhlaWdodCAqIHRoaXMuX2dldFVzZWRTY2FsZVZhbHVlKGNoaWxkLnNjYWxlWSkgKyBwYWRkaW5nWSArIHJvdyAqIHRoaXMuc3BhY2luZ1kpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcblxyXG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICAgIC8vY2FsY3VsYXRlIHRoZSBuZXcgaGVpZ2h0IG9mIGNvbnRhaW5lciwgaXQgd29uJ3QgY2hhbmdlIHRoZSBwb3NpdGlvbiBvZiBpdCdzIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHRoaXMuX2RvTGF5b3V0SG9yaXpvbnRhbGx5KGJhc2VXaWR0aCwgdHJ1ZSwgZm5Qb3NpdGlvblksIGZhbHNlKTtcclxuICAgICAgICAgICAgbmV3SGVpZ2h0ID0gYm90dG9tQm91bmRhcnlPZkxheW91dCAtIGJvdW5kYXJ5O1xyXG4gICAgICAgICAgICBpZiAobmV3SGVpZ2h0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ICo9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gLWxheW91dEFuY2hvci55ICogbmV3SGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljYWxEaXJlY3Rpb24gPT09IFZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT00pIHtcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAtMTtcclxuICAgICAgICAgICAgICAgIGJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQgPSAoMSAtIGxheW91dEFuY2hvci55KSAqIG5ld0hlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZG9MYXlvdXRIb3Jpem9udGFsbHkoYmFzZVdpZHRoLCB0cnVlLCBmblBvc2l0aW9uWSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShiYXNlV2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfZG9MYXlvdXRHcmlkQXhpc1ZlcnRpY2FsOiBmdW5jdGlvbiAobGF5b3V0QW5jaG9yLCBsYXlvdXRTaXplKSB7XHJcbiAgICAgICAgdmFyIGJhc2VIZWlnaHQgPSBsYXlvdXRTaXplLmhlaWdodDtcclxuXHJcbiAgICAgICAgdmFyIHNpZ24gPSAxO1xyXG4gICAgICAgIHZhciBsZWZ0Qm91bmRhcnlPZkxheW91dCA9IC1sYXlvdXRBbmNob3IueCAqIGxheW91dFNpemUud2lkdGg7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdYID0gdGhpcy5wYWRkaW5nTGVmdDtcclxuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcclxuICAgICAgICAgICAgc2lnbiA9IC0xO1xyXG4gICAgICAgICAgICBsZWZ0Qm91bmRhcnlPZkxheW91dCA9ICgxIC0gbGF5b3V0QW5jaG9yLngpICogbGF5b3V0U2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgcGFkZGluZ1ggPSB0aGlzLnBhZGRpbmdSaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmblBvc2l0aW9uWCA9IGZ1bmN0aW9uIChjaGlsZCwgbGVmdE9mZnNldCwgY29sdW1uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsZWZ0Qm91bmRhcnlPZkxheW91dCArIHNpZ24gKiAobGVmdE9mZnNldCArIGNoaWxkLmFuY2hvclggKiBjaGlsZC53aWR0aCAqIHRoaXMuX2dldFVzZWRTY2FsZVZhbHVlKGNoaWxkLnNjYWxlWCkgKyBwYWRkaW5nWCArIGNvbHVtbiAqIHRoaXMuc3BhY2luZ1gpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gMDtcclxuICAgICAgICBpZiAodGhpcy5yZXNpemVNb2RlID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUikge1xyXG4gICAgICAgICAgICB2YXIgYm91bmRhcnkgPSB0aGlzLl9kb0xheW91dFZlcnRpY2FsbHkoYmFzZUhlaWdodCwgdHJ1ZSwgZm5Qb3NpdGlvblgsIGZhbHNlKTtcclxuICAgICAgICAgICAgbmV3V2lkdGggPSBsZWZ0Qm91bmRhcnlPZkxheW91dCAtIGJvdW5kYXJ5O1xyXG4gICAgICAgICAgICBpZiAobmV3V2lkdGggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCAqPSAtMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAtbGF5b3V0QW5jaG9yLnggKiBuZXdXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24uUklHSFRfVE9fTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAoMSAtIGxheW91dEFuY2hvci54KSAqIG5ld1dpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9kb0xheW91dFZlcnRpY2FsbHkoYmFzZUhlaWdodCwgdHJ1ZSwgZm5Qb3NpdGlvblgsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yZXNpemVNb2RlID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUikge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUobmV3V2lkdGgsIGJhc2VIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2RvTGF5b3V0R3JpZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsYXlvdXRBbmNob3IgPSB0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKTtcclxuICAgICAgICB2YXIgbGF5b3V0U2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGFydEF4aXMgPT09IEF4aXNEaXJlY3Rpb24uSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kb0xheW91dEdyaWRBeGlzSG9yaXpvbnRhbChsYXlvdXRBbmNob3IsIGxheW91dFNpemUpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGFydEF4aXMgPT09IEF4aXNEaXJlY3Rpb24uVkVSVElDQUwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXRHcmlkQXhpc1ZlcnRpY2FsKGxheW91dEFuY2hvciwgbGF5b3V0U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgX2dldEhvcml6b250YWxCYXNlV2lkdGg6IGZ1bmN0aW9uIChjaGlsZHJlbikge1xyXG4gICAgICAgIHZhciBuZXdXaWR0aCA9IDA7XHJcbiAgICAgICAgdmFyIGFjdGl2ZUNoaWxkQ291bnQgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmFjdGl2ZUluSGllcmFyY2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2hpbGRDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoICs9IGNoaWxkLndpZHRoICogdGhpcy5fZ2V0VXNlZFNjYWxlVmFsdWUoY2hpbGQuc2NhbGVYKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdXaWR0aCArPSAoYWN0aXZlQ2hpbGRDb3VudCAtIDEpICogdGhpcy5zcGFjaW5nWCArIHRoaXMucGFkZGluZ0xlZnQgKyB0aGlzLnBhZGRpbmdSaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1dpZHRoID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCkud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdXaWR0aDtcclxuICAgIH0sXHJcblxyXG4gICAgX2RvTGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IFR5cGUuSE9SSVpPTlRBTCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3V2lkdGggPSB0aGlzLl9nZXRIb3Jpem9udGFsQmFzZVdpZHRoKHRoaXMubm9kZS5jaGlsZHJlbik7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm5Qb3NpdGlvblkgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZC55O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXRIb3Jpem9udGFsbHkobmV3V2lkdGgsIGZhbHNlLCBmblBvc2l0aW9uWSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBuZXdXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBUeXBlLlZFUlRJQ0FMKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdIZWlnaHQgPSB0aGlzLl9nZXRWZXJ0aWNhbEJhc2VIZWlnaHQodGhpcy5ub2RlLmNoaWxkcmVuKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmblBvc2l0aW9uWCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLng7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9kb0xheW91dFZlcnRpY2FsbHkobmV3SGVpZ2h0LCBmYWxzZSwgZm5Qb3NpdGlvblgsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IG5ld0hlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBUeXBlLk5PTkUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DT05UQUlORVIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0QmFzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09IFR5cGUuR1JJRCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kb0xheW91dEdyaWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9nZXRVc2VkU2NhbGVWYWx1ZSAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZmZlY3RlZEJ5U2NhbGUgPyBNYXRoLmFicyh2YWx1ZSkgOiAxO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gUGVyZm9ybSB0aGUgbGF5b3V0IHVwZGF0ZVxyXG4gICAgICogISN6aCDnq4vljbPmiafooYzmm7TmlrDluIPlsYBcclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZUxheW91dFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBsYXlvdXQudHlwZSA9IGNjLkxheW91dC5IT1JJWk9OVEFMO1xyXG4gICAgICogbGF5b3V0Lm5vZGUuYWRkQ2hpbGQoY2hpbGROb2RlKTtcclxuICAgICAqIGNjLmxvZyhjaGlsZE5vZGUueCk7IC8vIG5vdCB5ZXQgY2hhbmdlZFxyXG4gICAgICogbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xyXG4gICAgICogY2MubG9nKGNoaWxkTm9kZS54KTsgLy8gY2hhbmdlZFxyXG4gICAgICovXHJcbiAgICB1cGRhdGVMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbGF5b3V0RGlydHkgJiYgdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY2MuTGF5b3V0ID0gbW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9