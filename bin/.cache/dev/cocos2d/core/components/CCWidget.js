
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCWidget.js';
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
var WidgetManager = require('../base-ui/CCWidgetManager');
/**
 * !#en Enum for Widget's alignment mode, indicating when the widget should refresh.
 * !#zh Widget 的对齐模式，表示 Widget 应该何时刷新。
 * @enum Widget.AlignMode
 */

/**
 * !#en
 * Only align once when the Widget is enabled for the first time.
 * This will allow the script or animation to continue controlling the current node.
 * It will only be aligned once before the end of frame when onEnable is called,
 * then immediately disables the Widget.
 * !#zh
 * 仅在 Widget 第一次激活时对齐一次，便于脚本或动画继续控制当前节点。
 * 开启后会在 onEnable 时所在的那一帧结束前对齐一次，然后立刻禁用该 Widget。
 * @property {Number} ONCE
 */

/**
 * !#en Align first from the beginning as ONCE, and then realign it every time the window is resized.
 * !#zh 一开始会像 ONCE 一样对齐一次，之后每当窗口大小改变时还会重新对齐。
 * @property {Number} ON_WINDOW_RESIZE
 */

/**
 * !#en Keep aligning all the way.
 * !#zh 始终保持对齐。
 * @property {Number} ALWAYS
 */


var AlignMode = WidgetManager.AlignMode;
var AlignFlags = WidgetManager._AlignFlags;
var TOP = AlignFlags.TOP;
var MID = AlignFlags.MID;
var BOT = AlignFlags.BOT;
var LEFT = AlignFlags.LEFT;
var CENTER = AlignFlags.CENTER;
var RIGHT = AlignFlags.RIGHT;
var TOP_BOT = TOP | BOT;
var LEFT_RIGHT = LEFT | RIGHT;
/**
 * !#en
 * Stores and manipulate the anchoring based on its parent.
 * Widget are used for GUI but can also be used for other things.
 * Widget will adjust current node's position and size automatically, but the results after adjustment can not be obtained until the next frame unless you call {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}} manually.
 * !#zh
 * Widget 组件，用于设置和适配其相对于父节点的边距，Widget 通常被用于 UI 界面，也可以用于其他地方。
 * Widget 会自动调整当前节点的坐标和宽高，不过目前调整后的结果要到下一帧才能在脚本里获取到，除非你先手动调用 {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}}。
 *
 * @class Widget
 * @extends Component
 */

var Widget = cc.Class({
  name: 'cc.Widget',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Widget',
    help: 'i18n:COMPONENT.help_url.widget',
    inspector: 'packages://inspector/inspectors/comps/ccwidget.js',
    executeInEditMode: true,
    disallowMultiple: true
  },
  properties: {
    /**
     * !#en Specifies an alignment target that can only be one of the parent nodes of the current node.
     * The default value is null, and when null, indicates the current parent.
     * !#zh 指定一个对齐目标，只能是当前节点的其中一个父节点，默认为空，为空时表示当前父节点。
     * @property {Node} target
     * @default null
     */
    target: {
      get: function get() {
        return this._target;
      },
      set: function set(value) {
        this._target = value;

        if (CC_EDITOR && !cc.engine._isPlaying && this.node._parent) {
          // adjust the offsets to keep the size and position unchanged after target chagned
          WidgetManager.updateOffsetsToStayPut(this);
        }
      },
      type: cc.Node,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.target'
    },
    // ENABLE ALIGN ?

    /**
     * !#en Whether to align the top.
     * !#zh 是否对齐上边。
     * @property isAlignTop
     * @type {Boolean}
     * @default false
     */
    isAlignTop: {
      get: function get() {
        return (this._alignFlags & TOP) > 0;
      },
      set: function set(value) {
        this._setAlign(TOP, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_top'
    },

    /**
     * !#en
     * Vertically aligns the midpoint, This will open the other vertical alignment options cancel.
     * !#zh
     * 是否垂直方向对齐中点，开启此项会将垂直方向其他对齐选项取消。
     * @property isAlignVerticalCenter
     * @type {Boolean}
     * @default false
     */
    isAlignVerticalCenter: {
      get: function get() {
        return (this._alignFlags & MID) > 0;
      },
      set: function set(value) {
        if (value) {
          this.isAlignTop = false;
          this.isAlignBottom = false;
          this._alignFlags |= MID;
        } else {
          this._alignFlags &= ~MID;
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_v_center'
    },

    /**
     * !#en Whether to align the bottom.
     * !#zh 是否对齐下边。
     * @property isAlignBottom
     * @type {Boolean}
     * @default false
     */
    isAlignBottom: {
      get: function get() {
        return (this._alignFlags & BOT) > 0;
      },
      set: function set(value) {
        this._setAlign(BOT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_bottom'
    },

    /**
     * !#en Whether to align the left.
     * !#zh 是否对齐左边
     * @property isAlignLeft
     * @type {Boolean}
     * @default false
     */
    isAlignLeft: {
      get: function get() {
        return (this._alignFlags & LEFT) > 0;
      },
      set: function set(value) {
        this._setAlign(LEFT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_left'
    },

    /**
     * !#en
     * Horizontal aligns the midpoint. This will open the other horizontal alignment options canceled.
     * !#zh
     * 是否水平方向对齐中点，开启此选项会将水平方向其他对齐选项取消。
     * @property isAlignHorizontalCenter
     * @type {Boolean}
     * @default false
     */
    isAlignHorizontalCenter: {
      get: function get() {
        return (this._alignFlags & CENTER) > 0;
      },
      set: function set(value) {
        if (value) {
          this.isAlignLeft = false;
          this.isAlignRight = false;
          this._alignFlags |= CENTER;
        } else {
          this._alignFlags &= ~CENTER;
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_h_center'
    },

    /**
     * !#en Whether to align the right.
     * !#zh 是否对齐右边。
     * @property isAlignRight
     * @type {Boolean}
     * @default false
     */
    isAlignRight: {
      get: function get() {
        return (this._alignFlags & RIGHT) > 0;
      },
      set: function set(value) {
        this._setAlign(RIGHT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_right'
    },

    /**
     * !#en
     * Whether the stretched horizontally, when enable the left and right alignment will be stretched horizontally,
     * the width setting is invalid (read only).
     * !#zh
     * 当前是否水平拉伸。当同时启用左右对齐时，节点将会被水平拉伸，此时节点的宽度只读。
     * @property isStretchWidth
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    isStretchWidth: {
      get: function get() {
        return (this._alignFlags & LEFT_RIGHT) === LEFT_RIGHT;
      },
      visible: false
    },

    /**
     * !#en
     * Whether the stretched vertically, when enable the left and right alignment will be stretched vertically,
     * then height setting is invalid (read only)
     * !#zh
     * 当前是否垂直拉伸。当同时启用上下对齐时，节点将会被垂直拉伸，此时节点的高度只读。
     * @property isStretchHeight
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    isStretchHeight: {
      get: function get() {
        return (this._alignFlags & TOP_BOT) === TOP_BOT;
      },
      visible: false
    },
    // ALIGN MARGINS

    /**
     * !#en
     * The margins between the top of this node and the top of parent node,
     * the value can be negative, Only available in 'isAlignTop' open.
     * !#zh
     * 本节点顶边和父节点顶边的距离，可填写负值，只有在 isAlignTop 开启时才有作用。
     * @property top
     * @type {Number}
     * @default 0
     */
    top: {
      get: function get() {
        return this._top;
      },
      set: function set(value) {
        this._top = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.top'
    },

    /**
     * !#en
     * The margins between the bottom of this node and the bottom of parent node,
     * the value can be negative, Only available in 'isAlignBottom' open.
     * !#zh
     * 本节点底边和父节点底边的距离，可填写负值，只有在 isAlignBottom 开启时才有作用。
     * @property bottom
     * @type {Number}
     * @default 0
     */
    bottom: {
      get: function get() {
        return this._bottom;
      },
      set: function set(value) {
        this._bottom = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.bottom'
    },

    /**
     * !#en
     * The margins between the left of this node and the left of parent node,
     * the value can be negative, Only available in 'isAlignLeft' open.
     * !#zh
     * 本节点左边和父节点左边的距离，可填写负值，只有在 isAlignLeft 开启时才有作用。
     * @property left
     * @type {Number}
     * @default 0
     */
    left: {
      get: function get() {
        return this._left;
      },
      set: function set(value) {
        this._left = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.left'
    },

    /**
     * !#en
     * The margins between the right of this node and the right of parent node,
     * the value can be negative, Only available in 'isAlignRight' open.
     * !#zh
     * 本节点右边和父节点右边的距离，可填写负值，只有在 isAlignRight 开启时才有作用。
     * @property right
     * @type {Number}
     * @default 0
     */
    right: {
      get: function get() {
        return this._right;
      },
      set: function set(value) {
        this._right = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.right'
    },

    /**
     * !#en
     * Horizontal aligns the midpoint offset value,
     * the value can be negative, Only available in 'isAlignHorizontalCenter' open.
     * !#zh 水平居中的偏移值，可填写负值，只有在 isAlignHorizontalCenter 开启时才有作用。
     * @property horizontalCenter
     * @type {Number}
     * @default 0
     */
    horizontalCenter: {
      get: function get() {
        return this._horizontalCenter;
      },
      set: function set(value) {
        this._horizontalCenter = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.horizontal_center'
    },

    /**
     * !#en
     * Vertical aligns the midpoint offset value,
     * the value can be negative, Only available in 'isAlignVerticalCenter' open.
     * !#zh 垂直居中的偏移值，可填写负值，只有在 isAlignVerticalCenter 开启时才有作用。
     * @property verticalCenter
     * @type {Number}
     * @default 0
     */
    verticalCenter: {
      get: function get() {
        return this._verticalCenter;
      },
      set: function set(value) {
        this._verticalCenter = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.vertical_center'
    },
    // PARCENTAGE OR ABSOLUTE

    /**
     * !#en If true, horizontalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
     * !#zh 如果为 true，"horizontalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
     * @property isAbsoluteHorizontalCenter
     * @type {Boolean}
     * @default true
     */
    isAbsoluteHorizontalCenter: {
      get: function get() {
        return this._isAbsHorizontalCenter;
      },
      set: function set(value) {
        this._isAbsHorizontalCenter = value;
      },
      animatable: false
    },

    /**
     * !#en If true, verticalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
     * !#zh 如果为 true，"verticalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
     * @property isAbsoluteVerticalCenter
     * @type {Boolean}
     * @default true
     */
    isAbsoluteVerticalCenter: {
      get: function get() {
        return this._isAbsVerticalCenter;
      },
      set: function set(value) {
        this._isAbsVerticalCenter = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, top is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
     * !#zh
     * 如果为 true，"top" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
     * @property isAbsoluteTop
     * @type {Boolean}
     * @default true
     */
    isAbsoluteTop: {
      get: function get() {
        return this._isAbsTop;
      },
      set: function set(value) {
        this._isAbsTop = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, bottom is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
     * !#zh
     * 如果为 true，"bottom" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
     * @property isAbsoluteBottom
     * @type {Boolean}
     * @default true
     */
    isAbsoluteBottom: {
      get: function get() {
        return this._isAbsBottom;
      },
      set: function set(value) {
        this._isAbsBottom = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, left is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
     * !#zh
     * 如果为 true，"left" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
     * @property isAbsoluteLeft
     * @type {Boolean}
     * @default true
     */
    isAbsoluteLeft: {
      get: function get() {
        return this._isAbsLeft;
      },
      set: function set(value) {
        this._isAbsLeft = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, right is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
     * !#zh
     * 如果为 true，"right" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
     * @property isAbsoluteRight
     * @type {Boolean}
     * @default true
     */
    isAbsoluteRight: {
      get: function get() {
        return this._isAbsRight;
      },
      set: function set(value) {
        this._isAbsRight = value;
      },
      animatable: false
    },

    /**
     * !#en Specifies the alignment mode of the Widget, which determines when the widget should refresh.
     * !#zh 指定 Widget 的对齐模式，用于决定 Widget 应该何时刷新。
     * @property {Widget.AlignMode} alignMode
     * @example
     * widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
     */
    alignMode: {
      "default": AlignMode.ON_WINDOW_RESIZE,
      type: AlignMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_mode'
    },
    //
    _wasAlignOnce: {
      "default": undefined,
      formerlySerializedAs: 'isAlignOnce'
    },
    _target: null,

    /**
     * !#zh: 对齐开关，由 AlignFlags 组成
     *
     * @property _alignFlags
     * @type {Number}
     * @default 0
     * @private
     */
    _alignFlags: 0,
    _left: 0,
    _right: 0,
    _top: 0,
    _bottom: 0,
    _verticalCenter: 0,
    _horizontalCenter: 0,
    _isAbsLeft: true,
    _isAbsRight: true,
    _isAbsTop: true,
    _isAbsBottom: true,
    _isAbsHorizontalCenter: true,
    _isAbsVerticalCenter: true,
    // original size before align
    _originalWidth: 0,
    _originalHeight: 0
  },
  statics: {
    AlignMode: AlignMode
  },
  onLoad: function onLoad() {
    if (this._wasAlignOnce !== undefined) {
      // migrate for old version
      this.alignMode = this._wasAlignOnce ? AlignMode.ONCE : AlignMode.ALWAYS;
      this._wasAlignOnce = undefined;
    }
  },
  onEnable: function onEnable() {
    WidgetManager.add(this);
  },
  onDisable: function onDisable() {
    WidgetManager.remove(this);
  },
  _validateTargetInDEV: CC_DEV && function () {
    var target = this._target;

    if (target) {
      var isParent = this.node !== target && this.node.isChildOf(target);

      if (!isParent) {
        cc.errorID(6500);
        this._target = null;
      }
    }
  },
  _setAlign: function _setAlign(flag, isAlign) {
    var current = (this._alignFlags & flag) > 0;

    if (isAlign === current) {
      return;
    }

    var isHorizontal = (flag & LEFT_RIGHT) > 0;

    if (isAlign) {
      this._alignFlags |= flag;

      if (isHorizontal) {
        this.isAlignHorizontalCenter = false;

        if (this.isStretchWidth) {
          // become stretch
          this._originalWidth = this.node.width; // test check conflict

          if (CC_EDITOR && !cc.engine.isPlaying) {
            _Scene.DetectConflict.checkConflict_Widget(this);
          }
        }
      } else {
        this.isAlignVerticalCenter = false;

        if (this.isStretchHeight) {
          // become stretch
          this._originalHeight = this.node.height; // test check conflict

          if (CC_EDITOR && !cc.engine.isPlaying) {
            _Scene.DetectConflict.checkConflict_Widget(this);
          }
        }
      }

      if (CC_EDITOR && !cc.engine._isPlaying && this.node._parent) {
        // adjust the offsets to keep the size and position unchanged after alignment chagned
        WidgetManager.updateOffsetsToStayPut(this, flag);
      }
    } else {
      if (isHorizontal) {
        if (this.isStretchWidth) {
          // will cancel stretch
          this.node.width = this._originalWidth;
        }
      } else {
        if (this.isStretchHeight) {
          // will cancel stretch
          this.node.height = this._originalHeight;
        }
      }

      this._alignFlags &= ~flag;
    }
  },

  /**
   * !#en
   * Immediately perform the widget alignment. You need to manually call this method only if
   * you need to get the latest results after the alignment before the end of current frame.
   * !#zh
   * 立刻执行 widget 对齐操作。这个接口一般不需要手工调用。
   * 只有当你需要在当前帧结束前获得 widget 对齐后的最新结果时才需要手动调用这个方法。
   *
   * @method updateAlignment
   *
   * @example
   * widget.top = 10;       // change top margin
   * cc.log(widget.node.y); // not yet changed
   * widget.updateAlignment();
   * cc.log(widget.node.y); // changed
   */
  updateAlignment: function updateAlignment() {
    WidgetManager.updateAlignment(this.node);
  }
});
/**
 * !#en
 * When turned on, it will only be aligned once at the end of the onEnable frame,
 * then immediately disables the current component.
 * This will allow the script or animation to continue controlling the current node.
 * Note: It will still be aligned at the frame when onEnable is called.
 * !#zh
 * 开启后仅会在 onEnable 的当帧结束时对齐一次，然后立刻禁用当前组件。
 * 这样便于脚本或动画继续控制当前节点。
 * 注意：onEnable 时所在的那一帧仍然会进行对齐。
 * @property {Boolean} isAlignOnce
 * @default false
 * @deprecated
 */

Object.defineProperty(Widget.prototype, 'isAlignOnce', {
  get: function get() {
    if (CC_DEBUG) {
      cc.warn('`widget.isAlignOnce` is deprecated, use `widget.alignMode === cc.Widget.AlignMode.ONCE` instead please.');
    }

    return this.alignMode === AlignMode.ONCE;
  },
  set: function set(value) {
    if (CC_DEBUG) {
      cc.warn('`widget.isAlignOnce` is deprecated, use `widget.alignMode = cc.Widget.AlignMode.*` instead please.');
    }

    this.alignMode = value ? AlignMode.ONCE : AlignMode.ALWAYS;
  }
});
cc.Widget = module.exports = Widget;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIldpZGdldE1hbmFnZXIiLCJyZXF1aXJlIiwiQWxpZ25Nb2RlIiwiQWxpZ25GbGFncyIsIl9BbGlnbkZsYWdzIiwiVE9QIiwiTUlEIiwiQk9UIiwiTEVGVCIsIkNFTlRFUiIsIlJJR0hUIiwiVE9QX0JPVCIsIkxFRlRfUklHSFQiLCJXaWRnZXQiLCJjYyIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJkaXNhbGxvd011bHRpcGxlIiwicHJvcGVydGllcyIsInRhcmdldCIsImdldCIsIl90YXJnZXQiLCJzZXQiLCJ2YWx1ZSIsImVuZ2luZSIsIl9pc1BsYXlpbmciLCJub2RlIiwiX3BhcmVudCIsInVwZGF0ZU9mZnNldHNUb1N0YXlQdXQiLCJ0eXBlIiwiTm9kZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJpc0FsaWduVG9wIiwiX2FsaWduRmxhZ3MiLCJfc2V0QWxpZ24iLCJhbmltYXRhYmxlIiwiaXNBbGlnblZlcnRpY2FsQ2VudGVyIiwiaXNBbGlnbkJvdHRvbSIsImlzQWxpZ25MZWZ0IiwiaXNBbGlnbkhvcml6b250YWxDZW50ZXIiLCJpc0FsaWduUmlnaHQiLCJpc1N0cmV0Y2hXaWR0aCIsInZpc2libGUiLCJpc1N0cmV0Y2hIZWlnaHQiLCJ0b3AiLCJfdG9wIiwiYm90dG9tIiwiX2JvdHRvbSIsImxlZnQiLCJfbGVmdCIsInJpZ2h0IiwiX3JpZ2h0IiwiaG9yaXpvbnRhbENlbnRlciIsIl9ob3Jpem9udGFsQ2VudGVyIiwidmVydGljYWxDZW50ZXIiLCJfdmVydGljYWxDZW50ZXIiLCJpc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlciIsIl9pc0Fic0hvcml6b250YWxDZW50ZXIiLCJpc0Fic29sdXRlVmVydGljYWxDZW50ZXIiLCJfaXNBYnNWZXJ0aWNhbENlbnRlciIsImlzQWJzb2x1dGVUb3AiLCJfaXNBYnNUb3AiLCJpc0Fic29sdXRlQm90dG9tIiwiX2lzQWJzQm90dG9tIiwiaXNBYnNvbHV0ZUxlZnQiLCJfaXNBYnNMZWZ0IiwiaXNBYnNvbHV0ZVJpZ2h0IiwiX2lzQWJzUmlnaHQiLCJhbGlnbk1vZGUiLCJPTl9XSU5ET1dfUkVTSVpFIiwiX3dhc0FsaWduT25jZSIsInVuZGVmaW5lZCIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwiX29yaWdpbmFsV2lkdGgiLCJfb3JpZ2luYWxIZWlnaHQiLCJzdGF0aWNzIiwib25Mb2FkIiwiT05DRSIsIkFMV0FZUyIsIm9uRW5hYmxlIiwiYWRkIiwib25EaXNhYmxlIiwicmVtb3ZlIiwiX3ZhbGlkYXRlVGFyZ2V0SW5ERVYiLCJpc1BhcmVudCIsImlzQ2hpbGRPZiIsImVycm9ySUQiLCJmbGFnIiwiaXNBbGlnbiIsImN1cnJlbnQiLCJpc0hvcml6b250YWwiLCJ3aWR0aCIsImlzUGxheWluZyIsIl9TY2VuZSIsIkRldGVjdENvbmZsaWN0IiwiY2hlY2tDb25mbGljdF9XaWRnZXQiLCJoZWlnaHQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInByb3RvdHlwZSIsIkNDX0RFQlVHIiwid2FybiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLGFBQWEsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQTNCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0FBc0I3RixNQUFNLENBQUM4RixTQUE3QixFQUF3QyxhQUF4QyxFQUF1RDtBQUNuRGpGLEVBQUFBLEdBRG1ELGlCQUM1QztBQUNILFFBQUlrRixRQUFKLEVBQWM7QUFDVjlGLE1BQUFBLEVBQUUsQ0FBQytGLElBQUgsQ0FBUSx5R0FBUjtBQUNIOztBQUNELFdBQU8sS0FBS2xDLFNBQUwsS0FBbUJ6RSxTQUFTLENBQUNrRixJQUFwQztBQUNILEdBTmtEO0FBT25EeEQsRUFBQUEsR0FQbUQsZUFPOUNDLEtBUDhDLEVBT3ZDO0FBQ1IsUUFBSStFLFFBQUosRUFBYztBQUNWOUYsTUFBQUEsRUFBRSxDQUFDK0YsSUFBSCxDQUFRLG9HQUFSO0FBQ0g7O0FBQ0QsU0FBS2xDLFNBQUwsR0FBaUI5QyxLQUFLLEdBQUczQixTQUFTLENBQUNrRixJQUFiLEdBQW9CbEYsU0FBUyxDQUFDbUYsTUFBcEQ7QUFDSDtBQVprRCxDQUF2RDtBQWdCQXZFLEVBQUUsQ0FBQ0QsTUFBSCxHQUFZaUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEcsTUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgV2lkZ2V0TWFuYWdlciA9IHJlcXVpcmUoJy4uL2Jhc2UtdWkvQ0NXaWRnZXRNYW5hZ2VyJyk7XHJcblxyXG4vKipcclxuICogISNlbiBFbnVtIGZvciBXaWRnZXQncyBhbGlnbm1lbnQgbW9kZSwgaW5kaWNhdGluZyB3aGVuIHRoZSB3aWRnZXQgc2hvdWxkIHJlZnJlc2guXHJcbiAqICEjemggV2lkZ2V0IOeahOWvuem9kOaooeW8j++8jOihqOekuiBXaWRnZXQg5bqU6K+l5L2V5pe25Yi35paw44CCXHJcbiAqIEBlbnVtIFdpZGdldC5BbGlnbk1vZGVcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIE9ubHkgYWxpZ24gb25jZSB3aGVuIHRoZSBXaWRnZXQgaXMgZW5hYmxlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcbiAqIFRoaXMgd2lsbCBhbGxvdyB0aGUgc2NyaXB0IG9yIGFuaW1hdGlvbiB0byBjb250aW51ZSBjb250cm9sbGluZyB0aGUgY3VycmVudCBub2RlLlxyXG4gKiBJdCB3aWxsIG9ubHkgYmUgYWxpZ25lZCBvbmNlIGJlZm9yZSB0aGUgZW5kIG9mIGZyYW1lIHdoZW4gb25FbmFibGUgaXMgY2FsbGVkLFxyXG4gKiB0aGVuIGltbWVkaWF0ZWx5IGRpc2FibGVzIHRoZSBXaWRnZXQuXHJcbiAqICEjemhcclxuICog5LuF5ZyoIFdpZGdldCDnrKzkuIDmrKHmv4DmtLvml7blr7npvZDkuIDmrKHvvIzkvr/kuo7ohJrmnKzmiJbliqjnlLvnu6fnu63mjqfliLblvZPliY3oioLngrnjgIJcclxuICog5byA5ZCv5ZCO5Lya5ZyoIG9uRW5hYmxlIOaXtuaJgOWcqOeahOmCo+S4gOW4p+e7k+adn+WJjeWvuem9kOS4gOasoe+8jOeEtuWQjueri+WIu+emgeeUqOivpSBXaWRnZXTjgIJcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE9OQ0VcclxuICovXHJcbi8qKlxyXG4gKiAhI2VuIEFsaWduIGZpcnN0IGZyb20gdGhlIGJlZ2lubmluZyBhcyBPTkNFLCBhbmQgdGhlbiByZWFsaWduIGl0IGV2ZXJ5IHRpbWUgdGhlIHdpbmRvdyBpcyByZXNpemVkLlxyXG4gKiAhI3poIOS4gOW8gOWni+S8muWDjyBPTkNFIOS4gOagt+Wvuem9kOS4gOasoe+8jOS5i+WQjuavj+W9k+eql+WPo+Wkp+Wwj+aUueWPmOaXtui/mOS8mumHjeaWsOWvuem9kOOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gT05fV0lORE9XX1JFU0laRVxyXG4gKi9cclxuLyoqXHJcbiAqICEjZW4gS2VlcCBhbGlnbmluZyBhbGwgdGhlIHdheS5cclxuICogISN6aCDlp4vnu4jkv53mjIHlr7npvZDjgIJcclxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMV0FZU1xyXG4gKi9cclxudmFyIEFsaWduTW9kZSA9IFdpZGdldE1hbmFnZXIuQWxpZ25Nb2RlO1xyXG5cclxudmFyIEFsaWduRmxhZ3MgPSBXaWRnZXRNYW5hZ2VyLl9BbGlnbkZsYWdzO1xyXG52YXIgVE9QICAgICA9IEFsaWduRmxhZ3MuVE9QO1xyXG52YXIgTUlEICAgICA9IEFsaWduRmxhZ3MuTUlEO1xyXG52YXIgQk9UICAgICA9IEFsaWduRmxhZ3MuQk9UO1xyXG52YXIgTEVGVCAgICA9IEFsaWduRmxhZ3MuTEVGVDtcclxudmFyIENFTlRFUiAgPSBBbGlnbkZsYWdzLkNFTlRFUjtcclxudmFyIFJJR0hUICAgPSBBbGlnbkZsYWdzLlJJR0hUO1xyXG52YXIgVE9QX0JPVCA9IFRPUCB8IEJPVDtcclxudmFyIExFRlRfUklHSFQgPSBMRUZUIHwgUklHSFQ7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBTdG9yZXMgYW5kIG1hbmlwdWxhdGUgdGhlIGFuY2hvcmluZyBiYXNlZCBvbiBpdHMgcGFyZW50LlxyXG4gKiBXaWRnZXQgYXJlIHVzZWQgZm9yIEdVSSBidXQgY2FuIGFsc28gYmUgdXNlZCBmb3Igb3RoZXIgdGhpbmdzLlxyXG4gKiBXaWRnZXQgd2lsbCBhZGp1c3QgY3VycmVudCBub2RlJ3MgcG9zaXRpb24gYW5kIHNpemUgYXV0b21hdGljYWxseSwgYnV0IHRoZSByZXN1bHRzIGFmdGVyIGFkanVzdG1lbnQgY2FuIG5vdCBiZSBvYnRhaW5lZCB1bnRpbCB0aGUgbmV4dCBmcmFtZSB1bmxlc3MgeW91IGNhbGwge3sjY3Jvc3NMaW5rIFwiV2lkZ2V0L3VwZGF0ZUFsaWdubWVudDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWFudWFsbHkuXHJcbiAqICEjemhcclxuICogV2lkZ2V0IOe7hOS7tu+8jOeUqOS6juiuvue9ruWSjOmAgumFjeWFtuebuOWvueS6jueItuiKgueCueeahOi+uei3ne+8jFdpZGdldCDpgJrluLjooqvnlKjkuo4gVUkg55WM6Z2i77yM5Lmf5Y+v5Lul55So5LqO5YW25LuW5Zyw5pa544CCXHJcbiAqIFdpZGdldCDkvJroh6rliqjosIPmlbTlvZPliY3oioLngrnnmoTlnZDmoIflkozlrr3pq5jvvIzkuI3ov4fnm67liY3osIPmlbTlkI7nmoTnu5PmnpzopoHliLDkuIvkuIDluKfmiY3og73lnKjohJrmnKzph4zojrflj5bliLDvvIzpmaTpnZ7kvaDlhYjmiYvliqjosIPnlKgge3sjY3Jvc3NMaW5rIFwiV2lkZ2V0L3VwZGF0ZUFsaWdubWVudDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX3jgIJcclxuICpcclxuICogQGNsYXNzIFdpZGdldFxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbnZhciBXaWRnZXQgPSBjYy5DbGFzcyh7XHJcbiAgICBuYW1lOiAnY2MuV2lkZ2V0JywgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpLFxyXG5cclxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcclxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1dpZGdldCcsXHJcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLndpZGdldCcsXHJcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9jY3dpZGdldC5qcycsXHJcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXHJcbiAgICAgICAgZGlzYWxsb3dNdWx0aXBsZTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNwZWNpZmllcyBhbiBhbGlnbm1lbnQgdGFyZ2V0IHRoYXQgY2FuIG9ubHkgYmUgb25lIG9mIHRoZSBwYXJlbnQgbm9kZXMgb2YgdGhlIGN1cnJlbnQgbm9kZS5cclxuICAgICAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBudWxsLCBhbmQgd2hlbiBudWxsLCBpbmRpY2F0ZXMgdGhlIGN1cnJlbnQgcGFyZW50LlxyXG4gICAgICAgICAqICEjemgg5oyH5a6a5LiA5Liq5a+56b2Q55uu5qCH77yM5Y+q6IO95piv5b2T5YmN6IqC54K555qE5YW25Lit5LiA5Liq54i26IqC54K577yM6buY6K6k5Li656m677yM5Li656m65pe26KGo56S65b2T5YmN54i26IqC54K544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtOb2RlfSB0YXJnZXRcclxuICAgICAgICAgKiBAZGVmYXVsdCBudWxsXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGFyZ2V0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLl9pc1BsYXlpbmcgJiYgdGhpcy5ub2RlLl9wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGp1c3QgdGhlIG9mZnNldHMgdG8ga2VlcCB0aGUgc2l6ZSBhbmQgcG9zaXRpb24gdW5jaGFuZ2VkIGFmdGVyIHRhcmdldCBjaGFnbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgV2lkZ2V0TWFuYWdlci51cGRhdGVPZmZzZXRzVG9TdGF5UHV0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC50YXJnZXQnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEVOQUJMRSBBTElHTiA/XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciB0byBhbGlnbiB0aGUgdG9wLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5a+56b2Q5LiK6L6544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWxpZ25Ub3BcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWxpZ25Ub3A6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBUT1ApID4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFsaWduKFRPUCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fdG9wJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogVmVydGljYWxseSBhbGlnbnMgdGhlIG1pZHBvaW50LCBUaGlzIHdpbGwgb3BlbiB0aGUgb3RoZXIgdmVydGljYWwgYWxpZ25tZW50IG9wdGlvbnMgY2FuY2VsLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDmmK/lkKblnoLnm7TmlrnlkJHlr7npvZDkuK3ngrnvvIzlvIDlkK/mraTpobnkvJrlsIblnoLnm7TmlrnlkJHlhbbku5blr7npvZDpgInpobnlj5bmtojjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBbGlnblZlcnRpY2FsQ2VudGVyXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0FsaWduVmVydGljYWxDZW50ZXI6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBNSUQpID4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnblRvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnbkJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduRmxhZ3MgfD0gTUlEO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyAmPSB+TUlEO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fdl9jZW50ZXInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciB0byBhbGlnbiB0aGUgYm90dG9tLlxyXG4gICAgICAgICAqICEjemgg5piv5ZCm5a+56b2Q5LiL6L6544CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWxpZ25Cb3R0b21cclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWxpZ25Cb3R0b206IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBCT1QpID4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFsaWduKEJPVCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fYm90dG9tJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGxlZnQuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblr7npvZDlt6bovrlcclxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBbGlnbkxlZnRcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWxpZ25MZWZ0OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9hbGlnbkZsYWdzICYgTEVGVCkgPiAwO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWxpZ24oTEVGVCwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fbGVmdCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEhvcml6b250YWwgYWxpZ25zIHRoZSBtaWRwb2ludC4gVGhpcyB3aWxsIG9wZW4gdGhlIG90aGVyIGhvcml6b250YWwgYWxpZ25tZW50IG9wdGlvbnMgY2FuY2VsZWQuXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOaYr+WQpuawtOW5s+aWueWQkeWvuem9kOS4reeCue+8jOW8gOWQr+atpOmAiemhueS8muWwhuawtOW5s+aWueWQkeWFtuS7luWvuem9kOmAiemhueWPlua2iOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0FsaWduSG9yaXpvbnRhbENlbnRlclxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNBbGlnbkhvcml6b250YWxDZW50ZXI6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBDRU5URVIpID4gMDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnbkxlZnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWxpZ25SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduRmxhZ3MgfD0gQ0VOVEVSO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyAmPSB+Q0VOVEVSO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25faF9jZW50ZXInLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gV2hldGhlciB0byBhbGlnbiB0aGUgcmlnaHQuXHJcbiAgICAgICAgICogISN6aCDmmK/lkKblr7npvZDlj7PovrnjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBbGlnblJpZ2h0XHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0FsaWduUmlnaHQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBSSUdIVCkgPiAwO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWxpZ24oUklHSFQsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LmFsaWduX3JpZ2h0JyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuXHJcbiAgICAgICAgICogV2hldGhlciB0aGUgc3RyZXRjaGVkIGhvcml6b250YWxseSwgd2hlbiBlbmFibGUgdGhlIGxlZnQgYW5kIHJpZ2h0IGFsaWdubWVudCB3aWxsIGJlIHN0cmV0Y2hlZCBob3Jpem9udGFsbHksXHJcbiAgICAgICAgICogdGhlIHdpZHRoIHNldHRpbmcgaXMgaW52YWxpZCAocmVhZCBvbmx5KS5cclxuICAgICAgICAgKiAhI3poXHJcbiAgICAgICAgICog5b2T5YmN5piv5ZCm5rC05bmz5ouJ5Ly444CC5b2T5ZCM5pe25ZCv55So5bem5Y+z5a+56b2Q5pe277yM6IqC54K55bCG5Lya6KKr5rC05bmz5ouJ5Ly477yM5q2k5pe26IqC54K555qE5a695bqm5Y+q6K+744CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzU3RyZXRjaFdpZHRoXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAgICAgKiBAcmVhZE9ubHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc1N0cmV0Y2hXaWR0aDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fYWxpZ25GbGFncyAmIExFRlRfUklHSFQpID09PSBMRUZUX1JJR0hUO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIHN0cmV0Y2hlZCB2ZXJ0aWNhbGx5LCB3aGVuIGVuYWJsZSB0aGUgbGVmdCBhbmQgcmlnaHQgYWxpZ25tZW50IHdpbGwgYmUgc3RyZXRjaGVkIHZlcnRpY2FsbHksXHJcbiAgICAgICAgICogdGhlbiBoZWlnaHQgc2V0dGluZyBpcyBpbnZhbGlkIChyZWFkIG9ubHkpXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOW9k+WJjeaYr+WQpuWeguebtOaLieS8uOOAguW9k+WQjOaXtuWQr+eUqOS4iuS4i+Wvuem9kOaXtu+8jOiKgueCueWwhuS8muiiq+WeguebtOaLieS8uO+8jOatpOaXtuiKgueCueeahOmrmOW6puWPquivu+OAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc1N0cmV0Y2hIZWlnaHRcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICAgICAqIEByZWFkT25seVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzU3RyZXRjaEhlaWdodDoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fYWxpZ25GbGFncyAmIFRPUF9CT1QpID09PSBUT1BfQk9UO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEFMSUdOIE1BUkdJTlNcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIHRvcCBvZiB0aGlzIG5vZGUgYW5kIHRoZSB0b3Agb2YgcGFyZW50IG5vZGUsXHJcbiAgICAgICAgICogdGhlIHZhbHVlIGNhbiBiZSBuZWdhdGl2ZSwgT25seSBhdmFpbGFibGUgaW4gJ2lzQWxpZ25Ub3AnIG9wZW4uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacrOiKgueCuemhtui+ueWSjOeItuiKgueCuemhtui+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduVG9wIOW8gOWQr+aXtuaJjeacieS9nOeUqOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0b3BcclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICB0b3A6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdG9wID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LnRvcCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGlzIG5vZGUgYW5kIHRoZSBib3R0b20gb2YgcGFyZW50IG5vZGUsXHJcbiAgICAgICAgICogdGhlIHZhbHVlIGNhbiBiZSBuZWdhdGl2ZSwgT25seSBhdmFpbGFibGUgaW4gJ2lzQWxpZ25Cb3R0b20nIG9wZW4uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacrOiKgueCueW6lei+ueWSjOeItuiKgueCueW6lei+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduQm90dG9tIOW8gOWQr+aXtuaJjeacieS9nOeUqOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBib3R0b21cclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBkZWZhdWx0IDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBib3R0b206IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm90dG9tO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYm90dG9tID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LmJvdHRvbScsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIGxlZnQgb2YgdGhpcyBub2RlIGFuZCB0aGUgbGVmdCBvZiBwYXJlbnQgbm9kZSxcclxuICAgICAgICAgKiB0aGUgdmFsdWUgY2FuIGJlIG5lZ2F0aXZlLCBPbmx5IGF2YWlsYWJsZSBpbiAnaXNBbGlnbkxlZnQnIG9wZW4uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacrOiKgueCueW3pui+ueWSjOeItuiKgueCueW3pui+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduTGVmdCDlvIDlkK/ml7bmiY3mnInkvZznlKjjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgbGVmdFxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGxlZnQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xlZnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQubGVmdCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIHJpZ2h0IG9mIHRoaXMgbm9kZSBhbmQgdGhlIHJpZ2h0IG9mIHBhcmVudCBub2RlLFxyXG4gICAgICAgICAqIHRoZSB2YWx1ZSBjYW4gYmUgbmVnYXRpdmUsIE9ubHkgYXZhaWxhYmxlIGluICdpc0FsaWduUmlnaHQnIG9wZW4uXHJcbiAgICAgICAgICogISN6aFxyXG4gICAgICAgICAqIOacrOiKgueCueWPs+i+ueWSjOeItuiKgueCueWPs+i+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduUmlnaHQg5byA5ZCv5pe25omN5pyJ5L2c55So44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHJpZ2h0XHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcmlnaHQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yaWdodCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC5yaWdodCcsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIEhvcml6b250YWwgYWxpZ25zIHRoZSBtaWRwb2ludCBvZmZzZXQgdmFsdWUsXHJcbiAgICAgICAgICogdGhlIHZhbHVlIGNhbiBiZSBuZWdhdGl2ZSwgT25seSBhdmFpbGFibGUgaW4gJ2lzQWxpZ25Ib3Jpem9udGFsQ2VudGVyJyBvcGVuLlxyXG4gICAgICAgICAqICEjemgg5rC05bmz5bGF5Lit55qE5YGP56e75YC877yM5Y+v5aGr5YaZ6LSf5YC877yM5Y+q5pyJ5ZyoIGlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyIOW8gOWQr+aXtuaJjeacieS9nOeUqOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBob3Jpem9udGFsQ2VudGVyXHJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaG9yaXpvbnRhbENlbnRlcjoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob3Jpem9udGFsQ2VudGVyO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faG9yaXpvbnRhbENlbnRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC5ob3Jpem9udGFsX2NlbnRlcicsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIFZlcnRpY2FsIGFsaWducyB0aGUgbWlkcG9pbnQgb2Zmc2V0IHZhbHVlLFxyXG4gICAgICAgICAqIHRoZSB2YWx1ZSBjYW4gYmUgbmVnYXRpdmUsIE9ubHkgYXZhaWxhYmxlIGluICdpc0FsaWduVmVydGljYWxDZW50ZXInIG9wZW4uXHJcbiAgICAgICAgICogISN6aCDlnoLnm7TlsYXkuK3nmoTlgY/np7vlgLzvvIzlj6/loavlhpnotJ/lgLzvvIzlj6rmnInlnKggaXNBbGlnblZlcnRpY2FsQ2VudGVyIOW8gOWQr+aXtuaJjeacieS9nOeUqOOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB2ZXJ0aWNhbENlbnRlclxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZlcnRpY2FsQ2VudGVyOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsQ2VudGVyO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydGljYWxDZW50ZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQudmVydGljYWxfY2VudGVyJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBQQVJDRU5UQUdFIE9SIEFCU09MVVRFXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgdHJ1ZSwgaG9yaXpvbnRhbENlbnRlciBpcyBwaXhlbCBtYXJnaW4sIG90aGVyd2lzZSBpcyBwZXJjZW50YWdlICgwIC0gMSkgbWFyZ2luLlxyXG4gICAgICAgICAqICEjemgg5aaC5p6c5Li6IHRydWXvvIxcImhvcml6b250YWxDZW50ZXJcIiDlsIbkvJrku6Xlg4/ntKDkvZzkuLrlgY/np7vlgLzvvIzlj43kuYvkuLrnmb7liIbmr5TvvIgwIOWIsCAx77yJ44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWJzb2x1dGVIb3Jpem9udGFsQ2VudGVyXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWJzb2x1dGVIb3Jpem9udGFsQ2VudGVyOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWJzSG9yaXpvbnRhbENlbnRlcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzQWJzSG9yaXpvbnRhbENlbnRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW4gSWYgdHJ1ZSwgdmVydGljYWxDZW50ZXIgaXMgcGl4ZWwgbWFyZ2luLCBvdGhlcndpc2UgaXMgcGVyY2VudGFnZSAoMCAtIDEpIG1hcmdpbi5cclxuICAgICAgICAgKiAhI3poIOWmguaenOS4uiB0cnVl77yMXCJ2ZXJ0aWNhbENlbnRlclwiIOWwhuS8muS7peWDj+e0oOS9nOS4uuWBj+enu+WAvO+8jOWPjeS5i+S4uueZvuWIhuavlO+8iDAg5YiwIDHvvInjgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBYnNvbHV0ZVZlcnRpY2FsQ2VudGVyXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWJzb2x1dGVWZXJ0aWNhbENlbnRlcjoge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Fic1ZlcnRpY2FsQ2VudGVyO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNBYnNWZXJ0aWNhbENlbnRlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBJZiB0cnVlLCB0b3AgaXMgcGl4ZWwgbWFyZ2luLCBvdGhlcndpc2UgaXMgcGVyY2VudGFnZSAoMCAtIDEpIG1hcmdpbiByZWxhdGl2ZSB0byB0aGUgcGFyZW50J3MgaGVpZ2h0LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwidG9wXCIg5bCG5Lya5Lul5YOP57Sg5L2c5Li66L656Led77yM5ZCm5YiZ5bCG5Lya5Lul55u45a+554i254mp5L2T6auY5bqm55qE55m+5YiG5q+U77yIMCDliLAgMe+8ieS9nOS4uui+uei3neOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0Fic29sdXRlVG9wXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWJzb2x1dGVUb3A6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBYnNUb3A7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Fic1RvcCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBJZiB0cnVlLCBib3R0b20gaXMgcGl4ZWwgbWFyZ2luLCBvdGhlcndpc2UgaXMgcGVyY2VudGFnZSAoMCAtIDEpIG1hcmdpbiByZWxhdGl2ZSB0byB0aGUgcGFyZW50J3MgaGVpZ2h0LlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwiYm90dG9tXCIg5bCG5Lya5Lul5YOP57Sg5L2c5Li66L656Led77yM5ZCm5YiZ5bCG5Lya5Lul55u45a+554i254mp5L2T6auY5bqm55qE55m+5YiG5q+U77yIMCDliLAgMe+8ieS9nOS4uui+uei3neOAglxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0Fic29sdXRlQm90dG9tXHJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlzQWJzb2x1dGVCb3R0b206IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBYnNCb3R0b207XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Fic0JvdHRvbSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICEjZW5cclxuICAgICAgICAgKiBJZiB0cnVlLCBsZWZ0IGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4gcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIHdpZHRoLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwibGVmdFwiIOWwhuS8muS7peWDj+e0oOS9nOS4uui+uei3ne+8jOWQpuWImeWwhuS8muS7peebuOWvueeItueJqeS9k+WuveW6pueahOeZvuWIhuavlO+8iDAg5YiwIDHvvInkvZzkuLrovrnot53jgIJcclxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBYnNvbHV0ZUxlZnRcclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaXNBYnNvbHV0ZUxlZnQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBYnNMZWZ0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNBYnNMZWZ0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogISNlblxyXG4gICAgICAgICAqIElmIHRydWUsIHJpZ2h0IGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4gcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIHdpZHRoLlxyXG4gICAgICAgICAqICEjemhcclxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwicmlnaHRcIiDlsIbkvJrku6Xlg4/ntKDkvZzkuLrovrnot53vvIzlkKbliJnlsIbkvJrku6Xnm7jlr7nniLbniankvZPlrr3luqbnmoTnmb7liIbmr5TvvIgwIOWIsCAx77yJ5L2c5Li66L656Led44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWJzb2x1dGVSaWdodFxyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBpc0Fic29sdXRlUmlnaHQ6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBYnNSaWdodDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzQWJzUmlnaHQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI2VuIFNwZWNpZmllcyB0aGUgYWxpZ25tZW50IG1vZGUgb2YgdGhlIFdpZGdldCwgd2hpY2ggZGV0ZXJtaW5lcyB3aGVuIHRoZSB3aWRnZXQgc2hvdWxkIHJlZnJlc2guXHJcbiAgICAgICAgICogISN6aCDmjIflrpogV2lkZ2V0IOeahOWvuem9kOaooeW8j++8jOeUqOS6juWGs+WumiBXaWRnZXQg5bqU6K+l5L2V5pe25Yi35paw44CCXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtXaWRnZXQuQWxpZ25Nb2RlfSBhbGlnbk1vZGVcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHdpZGdldC5hbGlnbk1vZGUgPSBjYy5XaWRnZXQuQWxpZ25Nb2RlLk9OX1dJTkRPV19SRVNJWkU7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWxpZ25Nb2RlOiB7XHJcbiAgICAgICAgICAgZGVmYXVsdDogQWxpZ25Nb2RlLk9OX1dJTkRPV19SRVNJWkUsXHJcbiAgICAgICAgICAgdHlwZTogQWxpZ25Nb2RlLFxyXG4gICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LmFsaWduX21vZGUnLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIF93YXNBbGlnbk9uY2U6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ2lzQWxpZ25PbmNlJyxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBfdGFyZ2V0OiBudWxsLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAhI3poOiDlr7npvZDlvIDlhbPvvIznlLEgQWxpZ25GbGFncyDnu4TmiJBcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfYWxpZ25GbGFnc1xyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGRlZmF1bHQgMFxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2FsaWduRmxhZ3M6IDAsXHJcblxyXG4gICAgICAgIF9sZWZ0OiAwLFxyXG4gICAgICAgIF9yaWdodDogMCxcclxuICAgICAgICBfdG9wOiAwLFxyXG4gICAgICAgIF9ib3R0b206IDAsXHJcbiAgICAgICAgX3ZlcnRpY2FsQ2VudGVyOiAwLFxyXG4gICAgICAgIF9ob3Jpem9udGFsQ2VudGVyOiAwLFxyXG4gICAgICAgIF9pc0Fic0xlZnQ6IHRydWUsXHJcbiAgICAgICAgX2lzQWJzUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgX2lzQWJzVG9wOiB0cnVlLFxyXG4gICAgICAgIF9pc0Fic0JvdHRvbTogdHJ1ZSxcclxuICAgICAgICBfaXNBYnNIb3Jpem9udGFsQ2VudGVyOiB0cnVlLFxyXG4gICAgICAgIF9pc0Fic1ZlcnRpY2FsQ2VudGVyOiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBvcmlnaW5hbCBzaXplIGJlZm9yZSBhbGlnblxyXG4gICAgICAgIF9vcmlnaW5hbFdpZHRoOiAwLFxyXG4gICAgICAgIF9vcmlnaW5hbEhlaWdodDogMFxyXG4gICAgfSxcclxuXHJcbiAgICBzdGF0aWNzOiB7XHJcbiAgICAgICAgQWxpZ25Nb2RlOiBBbGlnbk1vZGUsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93YXNBbGlnbk9uY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBtaWdyYXRlIGZvciBvbGQgdmVyc2lvblxyXG4gICAgICAgICAgICB0aGlzLmFsaWduTW9kZSA9IHRoaXMuX3dhc0FsaWduT25jZSA/IEFsaWduTW9kZS5PTkNFIDogQWxpZ25Nb2RlLkFMV0FZUztcclxuICAgICAgICAgICAgdGhpcy5fd2FzQWxpZ25PbmNlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBXaWRnZXRNYW5hZ2VyLmFkZCh0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgV2lkZ2V0TWFuYWdlci5yZW1vdmUodGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIF92YWxpZGF0ZVRhcmdldEluREVWOiBDQ19ERVYgJiYgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB2YXIgaXNQYXJlbnQgPSB0aGlzLm5vZGUgIT09IHRhcmdldCAmJiB0aGlzLm5vZGUuaXNDaGlsZE9mKHRhcmdldCk7XHJcbiAgICAgICAgICAgIGlmICghaXNQYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNjUwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgX3NldEFsaWduOiBmdW5jdGlvbiAoZmxhZywgaXNBbGlnbikge1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gKHRoaXMuX2FsaWduRmxhZ3MgJiBmbGFnKSA+IDA7XHJcbiAgICAgICAgaWYgKGlzQWxpZ24gPT09IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXNIb3Jpem9udGFsID0gKGZsYWcgJiBMRUZUX1JJR0hUKSA+IDA7XHJcbiAgICAgICAgaWYgKGlzQWxpZ24pIHtcclxuICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyB8PSBmbGFnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0FsaWduSG9yaXpvbnRhbENlbnRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdHJldGNoV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBiZWNvbWUgc3RyZXRjaFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsV2lkdGggPSB0aGlzLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCBjaGVjayBjb25mbGljdFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgIWNjLmVuZ2luZS5pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfV2lkZ2V0KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnblZlcnRpY2FsQ2VudGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0cmV0Y2hIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBiZWNvbWUgc3RyZXRjaFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsSGVpZ2h0ID0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0ZXN0IGNoZWNrIGNvbmZsaWN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfU2NlbmUuRGV0ZWN0Q29uZmxpY3QuY2hlY2tDb25mbGljdF9XaWRnZXQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuX2lzUGxheWluZyAmJiB0aGlzLm5vZGUuX3BhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gYWRqdXN0IHRoZSBvZmZzZXRzIHRvIGtlZXAgdGhlIHNpemUgYW5kIHBvc2l0aW9uIHVuY2hhbmdlZCBhZnRlciBhbGlnbm1lbnQgY2hhZ25lZFxyXG4gICAgICAgICAgICAgICAgV2lkZ2V0TWFuYWdlci51cGRhdGVPZmZzZXRzVG9TdGF5UHV0KHRoaXMsIGZsYWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1N0cmV0Y2hXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgY2FuY2VsIHN0cmV0Y2hcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSB0aGlzLl9vcmlnaW5hbFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdHJldGNoSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBjYW5jZWwgc3RyZXRjaFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLl9vcmlnaW5hbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyAmPSB+ZmxhZztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW1tZWRpYXRlbHkgcGVyZm9ybSB0aGUgd2lkZ2V0IGFsaWdubWVudC4gWW91IG5lZWQgdG8gbWFudWFsbHkgY2FsbCB0aGlzIG1ldGhvZCBvbmx5IGlmXHJcbiAgICAgKiB5b3UgbmVlZCB0byBnZXQgdGhlIGxhdGVzdCByZXN1bHRzIGFmdGVyIHRoZSBhbGlnbm1lbnQgYmVmb3JlIHRoZSBlbmQgb2YgY3VycmVudCBmcmFtZS5cclxuICAgICAqICEjemhcclxuICAgICAqIOeri+WIu+aJp+ihjCB3aWRnZXQg5a+56b2Q5pON5L2c44CC6L+Z5Liq5o6l5Y+j5LiA6Iis5LiN6ZyA6KaB5omL5bel6LCD55So44CCXHJcbiAgICAgKiDlj6rmnInlvZPkvaDpnIDopoHlnKjlvZPliY3luKfnu5PmnZ/liY3ojrflvpcgd2lkZ2V0IOWvuem9kOWQjueahOacgOaWsOe7k+aenOaXtuaJjemcgOimgeaJi+WKqOiwg+eUqOi/meS4quaWueazleOAglxyXG4gICAgICpcclxuICAgICAqIEBtZXRob2QgdXBkYXRlQWxpZ25tZW50XHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHdpZGdldC50b3AgPSAxMDsgICAgICAgLy8gY2hhbmdlIHRvcCBtYXJnaW5cclxuICAgICAqIGNjLmxvZyh3aWRnZXQubm9kZS55KTsgLy8gbm90IHlldCBjaGFuZ2VkXHJcbiAgICAgKiB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgKiBjYy5sb2cod2lkZ2V0Lm5vZGUueSk7IC8vIGNoYW5nZWRcclxuICAgICAqL1xyXG4gICAgdXBkYXRlQWxpZ25tZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgV2lkZ2V0TWFuYWdlci51cGRhdGVBbGlnbm1lbnQodGhpcy5ub2RlKTtcclxuICAgIH0sXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogV2hlbiB0dXJuZWQgb24sIGl0IHdpbGwgb25seSBiZSBhbGlnbmVkIG9uY2UgYXQgdGhlIGVuZCBvZiB0aGUgb25FbmFibGUgZnJhbWUsXHJcbiAqIHRoZW4gaW1tZWRpYXRlbHkgZGlzYWJsZXMgdGhlIGN1cnJlbnQgY29tcG9uZW50LlxyXG4gKiBUaGlzIHdpbGwgYWxsb3cgdGhlIHNjcmlwdCBvciBhbmltYXRpb24gdG8gY29udGludWUgY29udHJvbGxpbmcgdGhlIGN1cnJlbnQgbm9kZS5cclxuICogTm90ZTogSXQgd2lsbCBzdGlsbCBiZSBhbGlnbmVkIGF0IHRoZSBmcmFtZSB3aGVuIG9uRW5hYmxlIGlzIGNhbGxlZC5cclxuICogISN6aFxyXG4gKiDlvIDlkK/lkI7ku4XkvJrlnKggb25FbmFibGUg55qE5b2T5bin57uT5p2f5pe25a+56b2Q5LiA5qyh77yM54S25ZCO56uL5Yi756aB55So5b2T5YmN57uE5Lu244CCXHJcbiAqIOi/meagt+S+v+S6juiEmuacrOaIluWKqOeUu+e7p+e7reaOp+WItuW9k+WJjeiKgueCueOAglxyXG4gKiDms6jmhI/vvJpvbkVuYWJsZSDml7bmiYDlnKjnmoTpgqPkuIDluKfku43nhLbkvJrov5vooYzlr7npvZDjgIJcclxuICogQHByb3BlcnR5IHtCb29sZWFufSBpc0FsaWduT25jZVxyXG4gKiBAZGVmYXVsdCBmYWxzZVxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKi9cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdpZGdldC5wcm90b3R5cGUsICdpc0FsaWduT25jZScsIHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oJ2B3aWRnZXQuaXNBbGlnbk9uY2VgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgd2lkZ2V0LmFsaWduTW9kZSA9PT0gY2MuV2lkZ2V0LkFsaWduTW9kZS5PTkNFYCBpbnN0ZWFkIHBsZWFzZS4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25Nb2RlID09PSBBbGlnbk1vZGUuT05DRTtcclxuICAgIH0sXHJcbiAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm4oJ2B3aWRnZXQuaXNBbGlnbk9uY2VgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgd2lkZ2V0LmFsaWduTW9kZSA9IGNjLldpZGdldC5BbGlnbk1vZGUuKmAgaW5zdGVhZCBwbGVhc2UuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWxpZ25Nb2RlID0gdmFsdWUgPyBBbGlnbk1vZGUuT05DRSA6IEFsaWduTW9kZS5BTFdBWVM7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmNjLldpZGdldCA9IG1vZHVsZS5leHBvcnRzID0gV2lkZ2V0O1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==