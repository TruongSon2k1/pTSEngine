
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/base-ui/CCWidgetManager.js';
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
var Event; // Support serializing widget in asset db, see cocos-creator/2d-tasks/issues/1894

if (!CC_EDITOR || !Editor.isMainProcess) {
  Event = require('../CCNode').EventType;
}

var TOP = 1 << 0;
var MID = 1 << 1; // vertical center

var BOT = 1 << 2;
var LEFT = 1 << 3;
var CENTER = 1 << 4; // horizontal center

var RIGHT = 1 << 5;
var HORIZONTAL = LEFT | CENTER | RIGHT;
var VERTICAL = TOP | MID | BOT;
var AlignMode = cc.Enum({
  ONCE: 0,
  ON_WINDOW_RESIZE: 1,
  ALWAYS: 2
}); // returns a readonly size of the node

function getReadonlyNodeSize(parent) {
  if (parent instanceof cc.Scene) {
    return CC_EDITOR ? cc.engine.getDesignResolutionSize() : cc.visibleRect;
  } else {
    return parent._contentSize;
  }
}

function computeInverseTransForTarget(widgetNode, target, out_inverseTranslate, out_inverseScale) {
  var scaleX = widgetNode._parent.scaleX;
  var scaleY = widgetNode._parent.scaleY;
  var translateX = 0;
  var translateY = 0;

  for (var node = widgetNode._parent;;) {
    translateX += node.x;
    translateY += node.y;
    node = node._parent; // loop increment

    if (!node) {
      // ERROR: widgetNode should be child of target
      out_inverseTranslate.x = out_inverseTranslate.y = 0;
      out_inverseScale.x = out_inverseScale.y = 1;
      return;
    }

    if (node !== target) {
      var sx = node.scaleX;
      var sy = node.scaleY;
      translateX *= sx;
      translateY *= sy;
      scaleX *= sx;
      scaleY *= sy;
    } else {
      break;
    }
  }

  out_inverseScale.x = scaleX !== 0 ? 1 / scaleX : 1;
  out_inverseScale.y = scaleY !== 0 ? 1 / scaleY : 1;
  out_inverseTranslate.x = -translateX;
  out_inverseTranslate.y = -translateY;
}

var tInverseTranslate = cc.Vec2.ZERO;
var tInverseScale = cc.Vec2.ONE; // align to borders by adjusting node's position and size (ignore rotation)

function align(node, widget) {
  var hasTarget = widget._target;
  var target;
  var inverseTranslate, inverseScale;

  if (hasTarget) {
    target = hasTarget;
    inverseTranslate = tInverseTranslate;
    inverseScale = tInverseScale;
    computeInverseTransForTarget(node, target, inverseTranslate, inverseScale);
  } else {
    target = node._parent;
  }

  var targetSize = getReadonlyNodeSize(target);
  var targetAnchor = target._anchorPoint;
  var isRoot = !CC_EDITOR && target instanceof cc.Scene;
  var x = node.x,
      y = node.y;
  var anchor = node._anchorPoint;

  if (widget._alignFlags & HORIZONTAL) {
    var localLeft,
        localRight,
        targetWidth = targetSize.width;

    if (isRoot) {
      localLeft = cc.visibleRect.left.x;
      localRight = cc.visibleRect.right.x;
    } else {
      localLeft = -targetAnchor.x * targetWidth;
      localRight = localLeft + targetWidth;
    } // adjust borders according to offsets


    localLeft += widget._isAbsLeft ? widget._left : widget._left * targetWidth;
    localRight -= widget._isAbsRight ? widget._right : widget._right * targetWidth;

    if (hasTarget) {
      localLeft += inverseTranslate.x;
      localLeft *= inverseScale.x;
      localRight += inverseTranslate.x;
      localRight *= inverseScale.x;
    }

    var width,
        anchorX = anchor.x,
        scaleX = node.scaleX;

    if (scaleX < 0) {
      anchorX = 1.0 - anchorX;
      scaleX = -scaleX;
    }

    if (widget.isStretchWidth) {
      width = localRight - localLeft;

      if (scaleX !== 0) {
        node.width = width / scaleX;
      }

      x = localLeft + anchorX * width;
    } else {
      width = node.width * scaleX;

      if (widget.isAlignHorizontalCenter) {
        var localHorizontalCenter = widget._isAbsHorizontalCenter ? widget._horizontalCenter : widget._horizontalCenter * targetWidth;
        var targetCenter = (0.5 - targetAnchor.x) * targetSize.width;

        if (hasTarget) {
          localHorizontalCenter *= inverseScale.x;
          targetCenter += inverseTranslate.x;
          targetCenter *= inverseScale.x;
        }

        x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
      } else if (widget.isAlignLeft) {
        x = localLeft + anchorX * width;
      } else {
        x = localRight + (anchorX - 1) * width;
      }
    }
  }

  if (widget._alignFlags & VERTICAL) {
    var localTop,
        localBottom,
        targetHeight = targetSize.height;

    if (isRoot) {
      localBottom = cc.visibleRect.bottom.y;
      localTop = cc.visibleRect.top.y;
    } else {
      localBottom = -targetAnchor.y * targetHeight;
      localTop = localBottom + targetHeight;
    } // adjust borders according to offsets


    localBottom += widget._isAbsBottom ? widget._bottom : widget._bottom * targetHeight;
    localTop -= widget._isAbsTop ? widget._top : widget._top * targetHeight;

    if (hasTarget) {
      // transform
      localBottom += inverseTranslate.y;
      localBottom *= inverseScale.y;
      localTop += inverseTranslate.y;
      localTop *= inverseScale.y;
    }

    var height,
        anchorY = anchor.y,
        scaleY = node.scaleY;

    if (scaleY < 0) {
      anchorY = 1.0 - anchorY;
      scaleY = -scaleY;
    }

    if (widget.isStretchHeight) {
      height = localTop - localBottom;

      if (scaleY !== 0) {
        node.height = height / scaleY;
      }

      y = localBottom + anchorY * height;
    } else {
      height = node.height * scaleY;

      if (widget.isAlignVerticalCenter) {
        var localVerticalCenter = widget._isAbsVerticalCenter ? widget._verticalCenter : widget._verticalCenter * targetHeight;
        var targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;

        if (hasTarget) {
          localVerticalCenter *= inverseScale.y;
          targetMiddle += inverseTranslate.y;
          targetMiddle *= inverseScale.y;
        }

        y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
      } else if (widget.isAlignBottom) {
        y = localBottom + anchorY * height;
      } else {
        y = localTop + (anchorY - 1) * height;
      }
    }
  }

  node.setPosition(x, y);
}

function visitNode(node) {
  var widget = node._widget;

  if (widget) {
    if (CC_DEV) {
      widget._validateTargetInDEV();
    }

    align(node, widget);

    if ((!CC_EDITOR || animationState.animatedSinceLastFrame) && widget.alignMode !== AlignMode.ALWAYS) {
      widgetManager.remove(widget);
    } else {
      activeWidgets.push(widget);
    }
  }

  var children = node._children;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    if (child._active) {
      visitNode(child);
    }
  }
}

if (CC_EDITOR) {
  var animationState = {
    previewing: false,
    time: 0,
    animatedSinceLastFrame: false
  };
}

function refreshScene() {
  // check animation editor
  if (CC_EDITOR && !Editor.isBuilder) {
    var AnimUtils = Editor.require('scene://utils/animation');

    var EditMode = Editor.require('scene://edit-mode');

    if (AnimUtils && EditMode) {
      var nowPreviewing = EditMode.curMode().name === 'animation' && !!AnimUtils.Cache.animation;

      if (nowPreviewing !== animationState.previewing) {
        animationState.previewing = nowPreviewing;

        if (nowPreviewing) {
          animationState.animatedSinceLastFrame = true;
          var component = cc.engine.getInstanceById(AnimUtils.Cache.component);

          if (component) {
            var animation = component.getAnimationState(AnimUtils.Cache.animation);

            if (animation) {
              animationState.time = animation.time;
            }
          }
        } else {
          animationState.animatedSinceLastFrame = false;
        }
      } else if (nowPreviewing) {
        var _component = cc.engine.getInstanceById(AnimUtils.Cache.component);

        if (_component) {
          var _animation = _component.getAnimationState(AnimUtils.Cache.animation);

          if (_animation && animationState.time !== _animation.time) {
            animationState.animatedSinceLastFrame = true;
            animationState.time = AnimUtils.Cache.animation.time;
          }
        }
      }
    }
  }

  var scene = cc.director.getScene();

  if (scene) {
    widgetManager.isAligning = true;

    if (widgetManager._nodesOrderDirty) {
      activeWidgets.length = 0;
      visitNode(scene);
      widgetManager._nodesOrderDirty = false;
    } else {
      var i,
          widget,
          iterator = widgetManager._activeWidgetsIterator;
      var AnimUtils;

      if (CC_EDITOR && (AnimUtils = Editor.require('scene://utils/animation')) && AnimUtils.Cache.animation) {
        var editingNode = cc.engine.getInstanceById(AnimUtils.Cache.rNode);

        if (editingNode) {
          for (i = activeWidgets.length - 1; i >= 0; i--) {
            widget = activeWidgets[i];
            var node = widget.node;

            if (widget.alignMode !== AlignMode.ALWAYS && animationState.animatedSinceLastFrame && node.isChildOf(editingNode)) {
              // widget contains in activeWidgets should aligned at least once
              widgetManager.remove(widget);
            } else {
              align(node, widget);
            }
          }
        }
      } else {
        // loop reversely will not help to prevent out of sync
        // because user may remove more than one item during a step.
        for (iterator.i = 0; iterator.i < activeWidgets.length; ++iterator.i) {
          widget = activeWidgets[iterator.i];
          align(widget.node, widget);
        }
      }
    }

    widgetManager.isAligning = false;
  } // check animation editor


  if (CC_EDITOR) {
    animationState.animatedSinceLastFrame = false;
  }
}

var adjustWidgetToAllowMovingInEditor = CC_EDITOR && function (oldPos) {
  if (widgetManager.isAligning) {
    return;
  }

  var newPos = this.node.position;
  var delta = newPos.sub(oldPos);
  var target = this.node._parent;
  var inverseScale = cc.Vec2.ONE;

  if (this._target) {
    target = this._target;
    computeInverseTransForTarget(this.node, target, new cc.Vec2(), inverseScale);
  }

  var targetSize = getReadonlyNodeSize(target);
  var deltaInPercent;

  if (targetSize.width !== 0 && targetSize.height !== 0) {
    deltaInPercent = new cc.Vec2(delta.x / targetSize.width, delta.y / targetSize.height);
  } else {
    deltaInPercent = cc.Vec2.ZERO;
  }

  if (this.isAlignTop) {
    this.top -= (this.isAbsoluteTop ? delta.y : deltaInPercent.y) * inverseScale.y;
  }

  if (this.isAlignBottom) {
    this.bottom += (this.isAbsoluteBottom ? delta.y : deltaInPercent.y) * inverseScale.y;
  }

  if (this.isAlignLeft) {
    this.left += (this.isAbsoluteLeft ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignRight) {
    this.right -= (this.isAbsoluteRight ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignHorizontalCenter) {
    this.horizontalCenter += (this.isAbsoluteHorizontalCenter ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignVerticalCenter) {
    this.verticalCenter += (this.isAbsoluteVerticalCenter ? delta.y : deltaInPercent.y) * inverseScale.y;
  }
};

var adjustWidgetToAllowResizingInEditor = CC_EDITOR && function (oldSize) {
  if (widgetManager.isAligning) {
    return;
  }

  var newSize = this.node.getContentSize();
  var delta = cc.v2(newSize.width - oldSize.width, newSize.height - oldSize.height);
  var target = this.node._parent;
  var inverseScale = cc.Vec2.ONE;

  if (this._target) {
    target = this._target;
    computeInverseTransForTarget(this.node, target, new cc.Vec2(), inverseScale);
  }

  var targetSize = getReadonlyNodeSize(target);
  var deltaInPercent;

  if (targetSize.width !== 0 && targetSize.height !== 0) {
    deltaInPercent = new cc.Vec2(delta.x / targetSize.width, delta.y / targetSize.height);
  } else {
    deltaInPercent = cc.Vec2.ZERO;
  }

  var anchor = this.node._anchorPoint;

  if (this.isAlignTop) {
    this.top -= (this.isAbsoluteTop ? delta.y : deltaInPercent.y) * (1 - anchor.y) * inverseScale.y;
  }

  if (this.isAlignBottom) {
    this.bottom -= (this.isAbsoluteBottom ? delta.y : deltaInPercent.y) * anchor.y * inverseScale.y;
  }

  if (this.isAlignLeft) {
    this.left -= (this.isAbsoluteLeft ? delta.x : deltaInPercent.x) * anchor.x * inverseScale.x;
  }

  if (this.isAlignRight) {
    this.right -= (this.isAbsoluteRight ? delta.x : deltaInPercent.x) * (1 - anchor.x) * inverseScale.x;
  }
};

var activeWidgets = []; // updateAlignment from scene to node recursively

function updateAlignment(node) {
  var parent = node._parent;

  if (cc.Node.isNode(parent)) {
    updateAlignment(parent);
  }

  var widget = node._widget || node.getComponent(cc.Widget); // node._widget will be null when widget is disabled

  if (widget && parent) {
    align(node, widget);
  }
}

var widgetManager = cc._widgetManager = module.exports = {
  _AlignFlags: {
    TOP: TOP,
    MID: MID,
    // vertical center
    BOT: BOT,
    LEFT: LEFT,
    CENTER: CENTER,
    // horizontal center
    RIGHT: RIGHT
  },
  isAligning: false,
  _nodesOrderDirty: false,
  _activeWidgetsIterator: new cc.js.array.MutableForwardIterator(activeWidgets),
  init: function init(director) {
    director.on(cc.Director.EVENT_AFTER_UPDATE, refreshScene);

    if (CC_EDITOR && cc.engine) {
      cc.engine.on('design-resolution-changed', this.onResized.bind(this));
    } else {
      var thisOnResized = this.onResized.bind(this);
      cc.view.on('canvas-resize', thisOnResized);
      window.addEventListener('orientationchange', thisOnResized);
    }
  },
  add: function add(widget) {
    widget.node._widget = widget;
    this._nodesOrderDirty = true;

    if (CC_EDITOR && !cc.engine.isPlaying) {
      widget.node.on(Event.POSITION_CHANGED, adjustWidgetToAllowMovingInEditor, widget);
      widget.node.on(Event.SIZE_CHANGED, adjustWidgetToAllowResizingInEditor, widget);
    }
  },
  remove: function remove(widget) {
    widget.node._widget = null;

    this._activeWidgetsIterator.remove(widget);

    if (CC_EDITOR && !cc.engine.isPlaying) {
      widget.node.off(Event.POSITION_CHANGED, adjustWidgetToAllowMovingInEditor, widget);
      widget.node.off(Event.SIZE_CHANGED, adjustWidgetToAllowResizingInEditor, widget);
    }
  },
  onResized: function onResized() {
    var scene = cc.director.getScene();

    if (scene) {
      this.refreshWidgetOnResized(scene);
    }
  },
  refreshWidgetOnResized: function refreshWidgetOnResized(node) {
    var widget = cc.Node.isNode(node) && node.getComponent(cc.Widget);

    if (widget && widget.enabled && widget.alignMode === AlignMode.ON_WINDOW_RESIZE) {
      this.add(widget);
    }

    var children = node._children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      this.refreshWidgetOnResized(child);
    }
  },
  updateAlignment: updateAlignment,
  AlignMode: AlignMode
};

if (CC_EDITOR) {
  module.exports._computeInverseTransForTarget = computeInverseTransForTarget;
  module.exports._getReadonlyNodeSize = getReadonlyNodeSize;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGJhc2UtdWlcXENDV2lkZ2V0TWFuYWdlci5qcyJdLCJuYW1lcyI6WyJFdmVudCIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzTWFpblByb2Nlc3MiLCJyZXF1aXJlIiwiRXZlbnRUeXBlIiwiVE9QIiwiTUlEIiwiQk9UIiwiTEVGVCIsIkNFTlRFUiIsIlJJR0hUIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiQWxpZ25Nb2RlIiwiY2MiLCJFbnVtIiwiT05DRSIsIk9OX1dJTkRPV19SRVNJWkUiLCJBTFdBWVMiLCJnZXRSZWFkb25seU5vZGVTaXplIiwicGFyZW50IiwiU2NlbmUiLCJlbmdpbmUiLCJnZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSIsInZpc2libGVSZWN0IiwiX2NvbnRlbnRTaXplIiwiY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCIsIndpZGdldE5vZGUiLCJ0YXJnZXQiLCJvdXRfaW52ZXJzZVRyYW5zbGF0ZSIsIm91dF9pbnZlcnNlU2NhbGUiLCJzY2FsZVgiLCJfcGFyZW50Iiwic2NhbGVZIiwidHJhbnNsYXRlWCIsInRyYW5zbGF0ZVkiLCJub2RlIiwieCIsInkiLCJzeCIsInN5IiwidEludmVyc2VUcmFuc2xhdGUiLCJWZWMyIiwiWkVSTyIsInRJbnZlcnNlU2NhbGUiLCJPTkUiLCJhbGlnbiIsIndpZGdldCIsImhhc1RhcmdldCIsIl90YXJnZXQiLCJpbnZlcnNlVHJhbnNsYXRlIiwiaW52ZXJzZVNjYWxlIiwidGFyZ2V0U2l6ZSIsInRhcmdldEFuY2hvciIsIl9hbmNob3JQb2ludCIsImlzUm9vdCIsImFuY2hvciIsIl9hbGlnbkZsYWdzIiwibG9jYWxMZWZ0IiwibG9jYWxSaWdodCIsInRhcmdldFdpZHRoIiwid2lkdGgiLCJsZWZ0IiwicmlnaHQiLCJfaXNBYnNMZWZ0IiwiX2xlZnQiLCJfaXNBYnNSaWdodCIsIl9yaWdodCIsImFuY2hvclgiLCJpc1N0cmV0Y2hXaWR0aCIsImlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyIiwibG9jYWxIb3Jpem9udGFsQ2VudGVyIiwiX2lzQWJzSG9yaXpvbnRhbENlbnRlciIsIl9ob3Jpem9udGFsQ2VudGVyIiwidGFyZ2V0Q2VudGVyIiwiaXNBbGlnbkxlZnQiLCJsb2NhbFRvcCIsImxvY2FsQm90dG9tIiwidGFyZ2V0SGVpZ2h0IiwiaGVpZ2h0IiwiYm90dG9tIiwidG9wIiwiX2lzQWJzQm90dG9tIiwiX2JvdHRvbSIsIl9pc0Fic1RvcCIsIl90b3AiLCJhbmNob3JZIiwiaXNTdHJldGNoSGVpZ2h0IiwiaXNBbGlnblZlcnRpY2FsQ2VudGVyIiwibG9jYWxWZXJ0aWNhbENlbnRlciIsIl9pc0Fic1ZlcnRpY2FsQ2VudGVyIiwiX3ZlcnRpY2FsQ2VudGVyIiwidGFyZ2V0TWlkZGxlIiwiaXNBbGlnbkJvdHRvbSIsInNldFBvc2l0aW9uIiwidmlzaXROb2RlIiwiX3dpZGdldCIsIkNDX0RFViIsIl92YWxpZGF0ZVRhcmdldEluREVWIiwiYW5pbWF0aW9uU3RhdGUiLCJhbmltYXRlZFNpbmNlTGFzdEZyYW1lIiwiYWxpZ25Nb2RlIiwid2lkZ2V0TWFuYWdlciIsInJlbW92ZSIsImFjdGl2ZVdpZGdldHMiLCJwdXNoIiwiY2hpbGRyZW4iLCJfY2hpbGRyZW4iLCJpIiwibGVuZ3RoIiwiY2hpbGQiLCJfYWN0aXZlIiwicHJldmlld2luZyIsInRpbWUiLCJyZWZyZXNoU2NlbmUiLCJpc0J1aWxkZXIiLCJBbmltVXRpbHMiLCJFZGl0TW9kZSIsIm5vd1ByZXZpZXdpbmciLCJjdXJNb2RlIiwibmFtZSIsIkNhY2hlIiwiYW5pbWF0aW9uIiwiY29tcG9uZW50IiwiZ2V0SW5zdGFuY2VCeUlkIiwiZ2V0QW5pbWF0aW9uU3RhdGUiLCJzY2VuZSIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJpc0FsaWduaW5nIiwiX25vZGVzT3JkZXJEaXJ0eSIsIml0ZXJhdG9yIiwiX2FjdGl2ZVdpZGdldHNJdGVyYXRvciIsImVkaXRpbmdOb2RlIiwick5vZGUiLCJpc0NoaWxkT2YiLCJhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IiLCJvbGRQb3MiLCJuZXdQb3MiLCJwb3NpdGlvbiIsImRlbHRhIiwic3ViIiwiZGVsdGFJblBlcmNlbnQiLCJpc0FsaWduVG9wIiwiaXNBYnNvbHV0ZVRvcCIsImlzQWJzb2x1dGVCb3R0b20iLCJpc0Fic29sdXRlTGVmdCIsImlzQWxpZ25SaWdodCIsImlzQWJzb2x1dGVSaWdodCIsImhvcml6b250YWxDZW50ZXIiLCJpc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlciIsInZlcnRpY2FsQ2VudGVyIiwiaXNBYnNvbHV0ZVZlcnRpY2FsQ2VudGVyIiwiYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IiLCJvbGRTaXplIiwibmV3U2l6ZSIsImdldENvbnRlbnRTaXplIiwidjIiLCJ1cGRhdGVBbGlnbm1lbnQiLCJOb2RlIiwiaXNOb2RlIiwiZ2V0Q29tcG9uZW50IiwiV2lkZ2V0IiwiX3dpZGdldE1hbmFnZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiX0FsaWduRmxhZ3MiLCJqcyIsImFycmF5IiwiTXV0YWJsZUZvcndhcmRJdGVyYXRvciIsImluaXQiLCJvbiIsIkRpcmVjdG9yIiwiRVZFTlRfQUZURVJfVVBEQVRFIiwib25SZXNpemVkIiwiYmluZCIsInRoaXNPblJlc2l6ZWQiLCJ2aWV3Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsImlzUGxheWluZyIsIlBPU0lUSU9OX0NIQU5HRUQiLCJTSVpFX0NIQU5HRUQiLCJvZmYiLCJyZWZyZXNoV2lkZ2V0T25SZXNpemVkIiwiZW5hYmxlZCIsIl9jb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0IiwiX2dldFJlYWRvbmx5Tm9kZVNpemUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFRQyxNQUFSLENBQWU1SCxJQUFmLEtBQXdCQSxJQUFJLENBQUM2SCxZQUFMLENBQWtCbkosRUFBRSxDQUFDb0osTUFBckIsQ0FBckM7O0FBQ0EsUUFBSW5ILE1BQU0sSUFBSUEsTUFBTSxDQUFDMkksT0FBakIsSUFBNEIzSSxNQUFNLENBQUNzRCxTQUFQLEtBQXFCeEYsU0FBUyxDQUFDSSxnQkFBL0QsRUFBaUY7QUFDN0UsV0FBS21LLEdBQUwsQ0FBU3JJLE1BQVQ7QUFDSDs7QUFFRCxRQUFJMkQsUUFBUSxHQUFHdEUsSUFBSSxDQUFDdUUsU0FBcEI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixRQUFRLENBQUNHLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQTBDO0FBQ3RDLFVBQUlFLEtBQUssR0FBR0osUUFBUSxDQUFDRSxDQUFELENBQXBCO0FBQ0EsV0FBSzZFLHNCQUFMLENBQTRCM0UsS0FBNUI7QUFDSDtBQUNKLEdBMURvRDtBQTJEckRnRCxFQUFBQSxlQUFlLEVBQUVBLGVBM0RvQztBQTREckRqSixFQUFBQSxTQUFTLEVBQUVBO0FBNUQwQyxDQUF6RDs7QUErREEsSUFBSWIsU0FBSixFQUFlO0FBQ1hvSyxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZXNCLDZCQUFmLEdBQStDakssNEJBQS9DO0FBQ0EwSSxFQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZXVCLG9CQUFmLEdBQXNDekssbUJBQXRDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIgRXZlbnQ7XHJcblxyXG4vLyBTdXBwb3J0IHNlcmlhbGl6aW5nIHdpZGdldCBpbiBhc3NldCBkYiwgc2VlIGNvY29zLWNyZWF0b3IvMmQtdGFza3MvaXNzdWVzLzE4OTRcclxuaWYgKCFDQ19FRElUT1IgfHwgIUVkaXRvci5pc01haW5Qcm9jZXNzKSB7XHJcbiAgRXZlbnQgPSByZXF1aXJlKCcuLi9DQ05vZGUnKS5FdmVudFR5cGU7XHJcbn1cclxuXHJcbnZhciBUT1AgICAgID0gMSA8PCAwO1xyXG52YXIgTUlEICAgICA9IDEgPDwgMTsgICAvLyB2ZXJ0aWNhbCBjZW50ZXJcclxudmFyIEJPVCAgICAgPSAxIDw8IDI7XHJcbnZhciBMRUZUICAgID0gMSA8PCAzO1xyXG52YXIgQ0VOVEVSICA9IDEgPDwgNDsgICAvLyBob3Jpem9udGFsIGNlbnRlclxyXG52YXIgUklHSFQgICA9IDEgPDwgNTtcclxudmFyIEhPUklaT05UQUwgPSBMRUZUIHwgQ0VOVEVSIHwgUklHSFQ7XHJcbnZhciBWRVJUSUNBTCA9IFRPUCB8IE1JRCB8IEJPVDtcclxuXHJcbnZhciBBbGlnbk1vZGUgPSBjYy5FbnVtKHtcclxuICAgIE9OQ0U6IDAsXHJcbiAgICBPTl9XSU5ET1dfUkVTSVpFOiAxLFxyXG4gICAgQUxXQVlTOiAyLFxyXG59KTtcclxuXHJcbi8vIHJldHVybnMgYSByZWFkb25seSBzaXplIG9mIHRoZSBub2RlXHJcbmZ1bmN0aW9uIGdldFJlYWRvbmx5Tm9kZVNpemUgKHBhcmVudCkge1xyXG4gICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIGNjLlNjZW5lKSB7XHJcbiAgICAgICAgcmV0dXJuIENDX0VESVRPUiA/IGNjLmVuZ2luZS5nZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSgpIDogY2MudmlzaWJsZVJlY3Q7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50Ll9jb250ZW50U2l6ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCAod2lkZ2V0Tm9kZSwgdGFyZ2V0LCBvdXRfaW52ZXJzZVRyYW5zbGF0ZSwgb3V0X2ludmVyc2VTY2FsZSkge1xyXG4gICAgdmFyIHNjYWxlWCA9IHdpZGdldE5vZGUuX3BhcmVudC5zY2FsZVg7XHJcbiAgICB2YXIgc2NhbGVZID0gd2lkZ2V0Tm9kZS5fcGFyZW50LnNjYWxlWTtcclxuICAgIHZhciB0cmFuc2xhdGVYID0gMDtcclxuICAgIHZhciB0cmFuc2xhdGVZID0gMDtcclxuICAgIGZvciAodmFyIG5vZGUgPSB3aWRnZXROb2RlLl9wYXJlbnQ7Oykge1xyXG4gICAgICAgIHRyYW5zbGF0ZVggKz0gbm9kZS54O1xyXG4gICAgICAgIHRyYW5zbGF0ZVkgKz0gbm9kZS55O1xyXG4gICAgICAgIG5vZGUgPSBub2RlLl9wYXJlbnQ7ICAgIC8vIGxvb3AgaW5jcmVtZW50XHJcbiAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgIC8vIEVSUk9SOiB3aWRnZXROb2RlIHNob3VsZCBiZSBjaGlsZCBvZiB0YXJnZXRcclxuICAgICAgICAgICAgb3V0X2ludmVyc2VUcmFuc2xhdGUueCA9IG91dF9pbnZlcnNlVHJhbnNsYXRlLnkgPSAwO1xyXG4gICAgICAgICAgICBvdXRfaW52ZXJzZVNjYWxlLnggPSBvdXRfaW52ZXJzZVNjYWxlLnkgPSAxO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlICE9PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgdmFyIHN4ID0gbm9kZS5zY2FsZVg7XHJcbiAgICAgICAgICAgIHZhciBzeSA9IG5vZGUuc2NhbGVZO1xyXG4gICAgICAgICAgICB0cmFuc2xhdGVYICo9IHN4O1xyXG4gICAgICAgICAgICB0cmFuc2xhdGVZICo9IHN5O1xyXG4gICAgICAgICAgICBzY2FsZVggKj0gc3g7XHJcbiAgICAgICAgICAgIHNjYWxlWSAqPSBzeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG91dF9pbnZlcnNlU2NhbGUueCA9IHNjYWxlWCAhPT0gMCA/ICgxIC8gc2NhbGVYKSA6IDE7XHJcbiAgICBvdXRfaW52ZXJzZVNjYWxlLnkgPSBzY2FsZVkgIT09IDAgPyAoMSAvIHNjYWxlWSkgOiAxO1xyXG4gICAgb3V0X2ludmVyc2VUcmFuc2xhdGUueCA9IC10cmFuc2xhdGVYO1xyXG4gICAgb3V0X2ludmVyc2VUcmFuc2xhdGUueSA9IC10cmFuc2xhdGVZO1xyXG59XHJcblxyXG52YXIgdEludmVyc2VUcmFuc2xhdGUgPSBjYy5WZWMyLlpFUk87XHJcbnZhciB0SW52ZXJzZVNjYWxlID0gY2MuVmVjMi5PTkU7XHJcblxyXG4vLyBhbGlnbiB0byBib3JkZXJzIGJ5IGFkanVzdGluZyBub2RlJ3MgcG9zaXRpb24gYW5kIHNpemUgKGlnbm9yZSByb3RhdGlvbilcclxuZnVuY3Rpb24gYWxpZ24gKG5vZGUsIHdpZGdldCkge1xyXG4gICAgdmFyIGhhc1RhcmdldCA9IHdpZGdldC5fdGFyZ2V0O1xyXG4gICAgdmFyIHRhcmdldDtcclxuICAgIHZhciBpbnZlcnNlVHJhbnNsYXRlLCBpbnZlcnNlU2NhbGU7XHJcbiAgICBpZiAoaGFzVGFyZ2V0KSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gaGFzVGFyZ2V0O1xyXG4gICAgICAgIGludmVyc2VUcmFuc2xhdGUgPSB0SW52ZXJzZVRyYW5zbGF0ZTtcclxuICAgICAgICBpbnZlcnNlU2NhbGUgPSB0SW52ZXJzZVNjYWxlO1xyXG4gICAgICAgIGNvbXB1dGVJbnZlcnNlVHJhbnNGb3JUYXJnZXQobm9kZSwgdGFyZ2V0LCBpbnZlcnNlVHJhbnNsYXRlLCBpbnZlcnNlU2NhbGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGFyZ2V0ID0gbm9kZS5fcGFyZW50O1xyXG4gICAgfVxyXG4gICAgdmFyIHRhcmdldFNpemUgPSBnZXRSZWFkb25seU5vZGVTaXplKHRhcmdldCk7XHJcbiAgICB2YXIgdGFyZ2V0QW5jaG9yID0gdGFyZ2V0Ll9hbmNob3JQb2ludDtcclxuXHJcbiAgICB2YXIgaXNSb290ID0gIUNDX0VESVRPUiAmJiB0YXJnZXQgaW5zdGFuY2VvZiBjYy5TY2VuZTtcclxuICAgIHZhciB4ID0gbm9kZS54LCB5ID0gbm9kZS55O1xyXG4gICAgdmFyIGFuY2hvciA9IG5vZGUuX2FuY2hvclBvaW50O1xyXG5cclxuICAgIGlmICh3aWRnZXQuX2FsaWduRmxhZ3MgJiBIT1JJWk9OVEFMKSB7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbExlZnQsIGxvY2FsUmlnaHQsIHRhcmdldFdpZHRoID0gdGFyZ2V0U2l6ZS53aWR0aDtcclxuICAgICAgICBpZiAoaXNSb290KSB7XHJcbiAgICAgICAgICAgIGxvY2FsTGVmdCA9IGNjLnZpc2libGVSZWN0LmxlZnQueDtcclxuICAgICAgICAgICAgbG9jYWxSaWdodCA9IGNjLnZpc2libGVSZWN0LnJpZ2h0Lng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbExlZnQgPSAtdGFyZ2V0QW5jaG9yLnggKiB0YXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgbG9jYWxSaWdodCA9IGxvY2FsTGVmdCArIHRhcmdldFdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRqdXN0IGJvcmRlcnMgYWNjb3JkaW5nIHRvIG9mZnNldHNcclxuICAgICAgICBsb2NhbExlZnQgKz0gd2lkZ2V0Ll9pc0Fic0xlZnQgPyB3aWRnZXQuX2xlZnQgOiB3aWRnZXQuX2xlZnQgKiB0YXJnZXRXaWR0aDtcclxuICAgICAgICBsb2NhbFJpZ2h0IC09IHdpZGdldC5faXNBYnNSaWdodCA/IHdpZGdldC5fcmlnaHQgOiB3aWRnZXQuX3JpZ2h0ICogdGFyZ2V0V2lkdGg7XHJcblxyXG4gICAgICAgIGlmIChoYXNUYXJnZXQpIHtcclxuICAgICAgICAgICAgbG9jYWxMZWZ0ICs9IGludmVyc2VUcmFuc2xhdGUueDtcclxuICAgICAgICAgICAgbG9jYWxMZWZ0ICo9IGludmVyc2VTY2FsZS54O1xyXG4gICAgICAgICAgICBsb2NhbFJpZ2h0ICs9IGludmVyc2VUcmFuc2xhdGUueDtcclxuICAgICAgICAgICAgbG9jYWxSaWdodCAqPSBpbnZlcnNlU2NhbGUueDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCwgYW5jaG9yWCA9IGFuY2hvci54LCBzY2FsZVggPSBub2RlLnNjYWxlWDtcclxuICAgICAgICBpZiAoc2NhbGVYIDwgMCkge1xyXG4gICAgICAgICAgICBhbmNob3JYID0gMS4wIC0gYW5jaG9yWDtcclxuICAgICAgICAgICAgc2NhbGVYID0gLXNjYWxlWDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdpZGdldC5pc1N0cmV0Y2hXaWR0aCkge1xyXG4gICAgICAgICAgICB3aWR0aCA9IGxvY2FsUmlnaHQgLSBsb2NhbExlZnQ7XHJcbiAgICAgICAgICAgIGlmIChzY2FsZVggIT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aCAvIHNjYWxlWDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB4ID0gbG9jYWxMZWZ0ICsgYW5jaG9yWCAqIHdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICogc2NhbGVYO1xyXG4gICAgICAgICAgICBpZiAod2lkZ2V0LmlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxIb3Jpem9udGFsQ2VudGVyID0gd2lkZ2V0Ll9pc0Fic0hvcml6b250YWxDZW50ZXIgPyB3aWRnZXQuX2hvcml6b250YWxDZW50ZXIgOiB3aWRnZXQuX2hvcml6b250YWxDZW50ZXIgKiB0YXJnZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRDZW50ZXIgPSAoMC41IC0gdGFyZ2V0QW5jaG9yLngpICogdGFyZ2V0U2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbEhvcml6b250YWxDZW50ZXIgKj0gaW52ZXJzZVNjYWxlLng7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VudGVyICs9IGludmVyc2VUcmFuc2xhdGUueDtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZW50ZXIgKj0gaW52ZXJzZVNjYWxlLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4ID0gdGFyZ2V0Q2VudGVyICsgKGFuY2hvclggLSAwLjUpICogd2lkdGggKyBsb2NhbEhvcml6b250YWxDZW50ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAod2lkZ2V0LmlzQWxpZ25MZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gbG9jYWxMZWZ0ICsgYW5jaG9yWCAqIHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeCA9IGxvY2FsUmlnaHQgKyAoYW5jaG9yWCAtIDEpICogd2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdpZGdldC5fYWxpZ25GbGFncyAmIFZFUlRJQ0FMKSB7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbFRvcCwgbG9jYWxCb3R0b20sIHRhcmdldEhlaWdodCA9IHRhcmdldFNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGlmIChpc1Jvb3QpIHtcclxuICAgICAgICAgICAgbG9jYWxCb3R0b20gPSBjYy52aXNpYmxlUmVjdC5ib3R0b20ueTtcclxuICAgICAgICAgICAgbG9jYWxUb3AgPSBjYy52aXNpYmxlUmVjdC50b3AueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsQm90dG9tID0gLXRhcmdldEFuY2hvci55ICogdGFyZ2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBsb2NhbFRvcCA9IGxvY2FsQm90dG9tICsgdGFyZ2V0SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRqdXN0IGJvcmRlcnMgYWNjb3JkaW5nIHRvIG9mZnNldHNcclxuICAgICAgICBsb2NhbEJvdHRvbSArPSB3aWRnZXQuX2lzQWJzQm90dG9tID8gd2lkZ2V0Ll9ib3R0b20gOiB3aWRnZXQuX2JvdHRvbSAqIHRhcmdldEhlaWdodDtcclxuICAgICAgICBsb2NhbFRvcCAtPSB3aWRnZXQuX2lzQWJzVG9wID8gd2lkZ2V0Ll90b3AgOiB3aWRnZXQuX3RvcCAqIHRhcmdldEhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGhhc1RhcmdldCkge1xyXG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm1cclxuICAgICAgICAgICAgbG9jYWxCb3R0b20gKz0gaW52ZXJzZVRyYW5zbGF0ZS55O1xyXG4gICAgICAgICAgICBsb2NhbEJvdHRvbSAqPSBpbnZlcnNlU2NhbGUueTtcclxuICAgICAgICAgICAgbG9jYWxUb3AgKz0gaW52ZXJzZVRyYW5zbGF0ZS55O1xyXG4gICAgICAgICAgICBsb2NhbFRvcCAqPSBpbnZlcnNlU2NhbGUueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBoZWlnaHQsIGFuY2hvclkgPSBhbmNob3IueSwgc2NhbGVZID0gbm9kZS5zY2FsZVk7XHJcbiAgICAgICAgaWYgKHNjYWxlWSA8IDApIHtcclxuICAgICAgICAgICAgYW5jaG9yWSA9IDEuMCAtIGFuY2hvclk7XHJcbiAgICAgICAgICAgIHNjYWxlWSA9IC1zY2FsZVk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3aWRnZXQuaXNTdHJldGNoSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IGxvY2FsVG9wIC0gbG9jYWxCb3R0b207XHJcbiAgICAgICAgICAgIGlmIChzY2FsZVkgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gaGVpZ2h0IC8gc2NhbGVZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHkgPSBsb2NhbEJvdHRvbSArIGFuY2hvclkgKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlLmhlaWdodCAqIHNjYWxlWTtcclxuICAgICAgICAgICAgaWYgKHdpZGdldC5pc0FsaWduVmVydGljYWxDZW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsb2NhbFZlcnRpY2FsQ2VudGVyID0gd2lkZ2V0Ll9pc0Fic1ZlcnRpY2FsQ2VudGVyID8gd2lkZ2V0Ll92ZXJ0aWNhbENlbnRlciA6IHdpZGdldC5fdmVydGljYWxDZW50ZXIgKiB0YXJnZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0TWlkZGxlID0gKDAuNSAtIHRhcmdldEFuY2hvci55KSAqIHRhcmdldFNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVmVydGljYWxDZW50ZXIgKj0gaW52ZXJzZVNjYWxlLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWlkZGxlICs9IGludmVyc2VUcmFuc2xhdGUueTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRNaWRkbGUgKj0gaW52ZXJzZVNjYWxlLnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5ID0gdGFyZ2V0TWlkZGxlICsgKGFuY2hvclkgLSAwLjUpICogaGVpZ2h0ICsgbG9jYWxWZXJ0aWNhbENlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3aWRnZXQuaXNBbGlnbkJvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgeSA9IGxvY2FsQm90dG9tICsgYW5jaG9yWSAqIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHkgPSBsb2NhbFRvcCArIChhbmNob3JZIC0gMSkgKiBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbm9kZS5zZXRQb3NpdGlvbih4LCB5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmlzaXROb2RlIChub2RlKSB7XHJcbiAgICB2YXIgd2lkZ2V0ID0gbm9kZS5fd2lkZ2V0O1xyXG4gICAgaWYgKHdpZGdldCkge1xyXG4gICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgd2lkZ2V0Ll92YWxpZGF0ZVRhcmdldEluREVWKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFsaWduKG5vZGUsIHdpZGdldCk7XHJcbiAgICAgICAgaWYgKCghQ0NfRURJVE9SIHx8IGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUpICYmIHdpZGdldC5hbGlnbk1vZGUgIT09IEFsaWduTW9kZS5BTFdBWVMpIHtcclxuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmUod2lkZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVdpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuX2NoaWxkcmVuO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChjaGlsZC5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZpc2l0Tm9kZShjaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pZiAoQ0NfRURJVE9SKSB7XHJcbiAgICB2YXIgYW5pbWF0aW9uU3RhdGUgPSB7XHJcbiAgICAgICAgcHJldmlld2luZzogZmFsc2UsXHJcbiAgICAgICAgdGltZTogMCxcclxuICAgICAgICBhbmltYXRlZFNpbmNlTGFzdEZyYW1lOiBmYWxzZSxcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZnJlc2hTY2VuZSAoKSB7XHJcbiAgICAvLyBjaGVjayBhbmltYXRpb24gZWRpdG9yXHJcbiAgICBpZiAoQ0NfRURJVE9SICYmICFFZGl0b3IuaXNCdWlsZGVyKSB7XHJcbiAgICAgICAgdmFyIEFuaW1VdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL2FuaW1hdGlvbicpO1xyXG4gICAgICAgIHZhciBFZGl0TW9kZSA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL2VkaXQtbW9kZScpO1xyXG4gICAgICAgIGlmIChBbmltVXRpbHMgJiYgRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgdmFyIG5vd1ByZXZpZXdpbmcgPSAoRWRpdE1vZGUuY3VyTW9kZSgpLm5hbWUgPT09ICdhbmltYXRpb24nICYmICEhQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChub3dQcmV2aWV3aW5nICE9PSBhbmltYXRpb25TdGF0ZS5wcmV2aWV3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS5wcmV2aWV3aW5nID0gbm93UHJldmlld2luZztcclxuICAgICAgICAgICAgICAgIGlmIChub3dQcmV2aWV3aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNjLmVuZ2luZS5nZXRJbnN0YW5jZUJ5SWQoQW5pbVV0aWxzLkNhY2hlLmNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gY29tcG9uZW50LmdldEFuaW1hdGlvblN0YXRlKEFuaW1VdGlscy5DYWNoZS5hbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS50aW1lID0gYW5pbWF0aW9uLnRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS5hbmltYXRlZFNpbmNlTGFzdEZyYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobm93UHJldmlld2luZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNjLmVuZ2luZS5nZXRJbnN0YW5jZUJ5SWQoQW5pbVV0aWxzLkNhY2hlLmNvbXBvbmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGNvbXBvbmVudC5nZXRBbmltYXRpb25TdGF0ZShBbmltVXRpbHMuQ2FjaGUuYW5pbWF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uICYmIGFuaW1hdGlvblN0YXRlLnRpbWUgIT09IGFuaW1hdGlvbi50aW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS50aW1lID0gQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbi50aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xyXG4gICAgaWYgKHNjZW5lKSB7XHJcbiAgICAgICAgd2lkZ2V0TWFuYWdlci5pc0FsaWduaW5nID0gdHJ1ZTtcclxuICAgICAgICBpZiAod2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5KSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVdpZGdldHMubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdmlzaXROb2RlKHNjZW5lKTtcclxuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaSwgd2lkZ2V0LCBpdGVyYXRvciA9IHdpZGdldE1hbmFnZXIuX2FjdGl2ZVdpZGdldHNJdGVyYXRvcjtcclxuICAgICAgICAgICAgdmFyIEFuaW1VdGlscztcclxuICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJlxyXG4gICAgICAgICAgICAgICAgKEFuaW1VdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL2FuaW1hdGlvbicpKSAmJlxyXG4gICAgICAgICAgICAgICAgQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGVkaXRpbmdOb2RlID0gY2MuZW5naW5lLmdldEluc3RhbmNlQnlJZChBbmltVXRpbHMuQ2FjaGUuck5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gYWN0aXZlV2lkZ2V0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQgPSBhY3RpdmVXaWRnZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHdpZGdldC5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2lkZ2V0LmFsaWduTW9kZSAhPT0gQWxpZ25Nb2RlLkFMV0FZUyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pc0NoaWxkT2YoZWRpdGluZ05vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lkZ2V0IGNvbnRhaW5zIGluIGFjdGl2ZVdpZGdldHMgc2hvdWxkIGFsaWduZWQgYXQgbGVhc3Qgb25jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmUod2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduKG5vZGUsIHdpZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb29wIHJldmVyc2VseSB3aWxsIG5vdCBoZWxwIHRvIHByZXZlbnQgb3V0IG9mIHN5bmNcclxuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgdXNlciBtYXkgcmVtb3ZlIG1vcmUgdGhhbiBvbmUgaXRlbSBkdXJpbmcgYSBzdGVwLlxyXG4gICAgICAgICAgICAgICAgZm9yIChpdGVyYXRvci5pID0gMDsgaXRlcmF0b3IuaSA8IGFjdGl2ZVdpZGdldHMubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQgPSBhY3RpdmVXaWRnZXRzW2l0ZXJhdG9yLmldO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduKHdpZGdldC5ub2RlLCB3aWRnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpZGdldE1hbmFnZXIuaXNBbGlnbmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGFuaW1hdGlvbiBlZGl0b3JcclxuICAgIGlmIChDQ19FRElUT1IpIHtcclxuICAgICAgICBhbmltYXRpb25TdGF0ZS5hbmltYXRlZFNpbmNlTGFzdEZyYW1lID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IgPSBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKG9sZFBvcykge1xyXG4gICAgaWYgKHdpZGdldE1hbmFnZXIuaXNBbGlnbmluZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBuZXdQb3MgPSB0aGlzLm5vZGUucG9zaXRpb247XHJcbiAgICB2YXIgZGVsdGEgPSBuZXdQb3Muc3ViKG9sZFBvcyk7XHJcblxyXG4gICAgdmFyIHRhcmdldCA9IHRoaXMubm9kZS5fcGFyZW50O1xyXG4gICAgdmFyIGludmVyc2VTY2FsZSA9IGNjLlZlYzIuT05FO1xyXG5cclxuICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XHJcbiAgICAgICAgY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCh0aGlzLm5vZGUsIHRhcmdldCwgbmV3IGNjLlZlYzIoKSwgaW52ZXJzZVNjYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGFyZ2V0U2l6ZSA9IGdldFJlYWRvbmx5Tm9kZVNpemUodGFyZ2V0KTtcclxuICAgIHZhciBkZWx0YUluUGVyY2VudDtcclxuICAgIGlmICh0YXJnZXRTaXplLndpZHRoICE9PSAwICYmIHRhcmdldFNpemUuaGVpZ2h0ICE9PSAwKSB7XHJcbiAgICAgICAgZGVsdGFJblBlcmNlbnQgPSBuZXcgY2MuVmVjMihkZWx0YS54IC8gdGFyZ2V0U2l6ZS53aWR0aCwgZGVsdGEueSAvIHRhcmdldFNpemUuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRlbHRhSW5QZXJjZW50ID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmlzQWxpZ25Ub3ApIHtcclxuICAgICAgICB0aGlzLnRvcCAtPSAodGhpcy5pc0Fic29sdXRlVG9wID8gZGVsdGEueSA6IGRlbHRhSW5QZXJjZW50LnkpICogaW52ZXJzZVNjYWxlLnk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0FsaWduQm90dG9tKSB7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gKz0gKHRoaXMuaXNBYnNvbHV0ZUJvdHRvbSA/IGRlbHRhLnkgOiBkZWx0YUluUGVyY2VudC55KSAqIGludmVyc2VTY2FsZS55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBbGlnbkxlZnQpIHtcclxuICAgICAgICB0aGlzLmxlZnQgKz0gKHRoaXMuaXNBYnNvbHV0ZUxlZnQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiBpbnZlcnNlU2NhbGUueDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzQWxpZ25SaWdodCkge1xyXG4gICAgICAgIHRoaXMucmlnaHQgLT0gKHRoaXMuaXNBYnNvbHV0ZVJpZ2h0ID8gZGVsdGEueCA6IGRlbHRhSW5QZXJjZW50LngpICogaW52ZXJzZVNjYWxlLng7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc0FsaWduSG9yaXpvbnRhbENlbnRlcikge1xyXG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbENlbnRlciArPSAodGhpcy5pc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlciA/IGRlbHRhLnggOiBkZWx0YUluUGVyY2VudC54KSAqIGludmVyc2VTY2FsZS54O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBbGlnblZlcnRpY2FsQ2VudGVyKSB7XHJcbiAgICAgICAgdGhpcy52ZXJ0aWNhbENlbnRlciArPSAodGhpcy5pc0Fic29sdXRlVmVydGljYWxDZW50ZXIgPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiBpbnZlcnNlU2NhbGUueTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBhZGp1c3RXaWRnZXRUb0FsbG93UmVzaXppbmdJbkVkaXRvciA9IENDX0VESVRPUiAmJiBmdW5jdGlvbiAob2xkU2l6ZSkge1xyXG4gICAgaWYgKHdpZGdldE1hbmFnZXIuaXNBbGlnbmluZykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBuZXdTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICB2YXIgZGVsdGEgPSBjYy52MihuZXdTaXplLndpZHRoIC0gb2xkU2l6ZS53aWR0aCwgbmV3U2l6ZS5oZWlnaHQgLSBvbGRTaXplLmhlaWdodCk7XHJcblxyXG4gICAgdmFyIHRhcmdldCA9IHRoaXMubm9kZS5fcGFyZW50O1xyXG4gICAgdmFyIGludmVyc2VTY2FsZSA9IGNjLlZlYzIuT05FO1xyXG4gICAgaWYgKHRoaXMuX3RhcmdldCkge1xyXG4gICAgICAgIHRhcmdldCA9IHRoaXMuX3RhcmdldDtcclxuICAgICAgICBjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0KHRoaXMubm9kZSwgdGFyZ2V0LCBuZXcgY2MuVmVjMigpLCBpbnZlcnNlU2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0YXJnZXRTaXplID0gZ2V0UmVhZG9ubHlOb2RlU2l6ZSh0YXJnZXQpO1xyXG4gICAgdmFyIGRlbHRhSW5QZXJjZW50O1xyXG4gICAgaWYgKHRhcmdldFNpemUud2lkdGggIT09IDAgJiYgdGFyZ2V0U2l6ZS5oZWlnaHQgIT09IDApIHtcclxuICAgICAgICBkZWx0YUluUGVyY2VudCA9IG5ldyBjYy5WZWMyKGRlbHRhLnggLyB0YXJnZXRTaXplLndpZHRoLCBkZWx0YS55IC8gdGFyZ2V0U2l6ZS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGVsdGFJblBlcmNlbnQgPSBjYy5WZWMyLlpFUk87XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFuY2hvciA9IHRoaXMubm9kZS5fYW5jaG9yUG9pbnQ7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNBbGlnblRvcCkge1xyXG4gICAgICAgIHRoaXMudG9wIC09ICh0aGlzLmlzQWJzb2x1dGVUb3AgPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiAoMSAtIGFuY2hvci55KSAqIGludmVyc2VTY2FsZS55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBbGlnbkJvdHRvbSkge1xyXG4gICAgICAgIHRoaXMuYm90dG9tIC09ICh0aGlzLmlzQWJzb2x1dGVCb3R0b20gPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiBhbmNob3IueSAqIGludmVyc2VTY2FsZS55O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBbGlnbkxlZnQpIHtcclxuICAgICAgICB0aGlzLmxlZnQgLT0gKHRoaXMuaXNBYnNvbHV0ZUxlZnQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiBhbmNob3IueCAqIGludmVyc2VTY2FsZS54O1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNBbGlnblJpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5yaWdodCAtPSAodGhpcy5pc0Fic29sdXRlUmlnaHQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiAoMSAtIGFuY2hvci54KSAqIGludmVyc2VTY2FsZS54O1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGFjdGl2ZVdpZGdldHMgPSBbXTtcclxuXHJcbi8vIHVwZGF0ZUFsaWdubWVudCBmcm9tIHNjZW5lIHRvIG5vZGUgcmVjdXJzaXZlbHlcclxuZnVuY3Rpb24gdXBkYXRlQWxpZ25tZW50IChub2RlKSB7XHJcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5fcGFyZW50O1xyXG4gICAgaWYgKGNjLk5vZGUuaXNOb2RlKHBhcmVudCkpIHtcclxuICAgICAgICB1cGRhdGVBbGlnbm1lbnQocGFyZW50KTtcclxuICAgIH1cclxuICAgIHZhciB3aWRnZXQgPSBub2RlLl93aWRnZXQgfHxcclxuICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpOyAgLy8gbm9kZS5fd2lkZ2V0IHdpbGwgYmUgbnVsbCB3aGVuIHdpZGdldCBpcyBkaXNhYmxlZFxyXG4gICAgaWYgKHdpZGdldCAmJiBwYXJlbnQpIHtcclxuICAgICAgICBhbGlnbihub2RlLCB3aWRnZXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgd2lkZ2V0TWFuYWdlciA9IGNjLl93aWRnZXRNYW5hZ2VyID0gbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBfQWxpZ25GbGFnczoge1xyXG4gICAgICAgIFRPUDogVE9QLFxyXG4gICAgICAgIE1JRDogTUlELCAgICAgICAvLyB2ZXJ0aWNhbCBjZW50ZXJcclxuICAgICAgICBCT1Q6IEJPVCxcclxuICAgICAgICBMRUZUOiBMRUZULFxyXG4gICAgICAgIENFTlRFUjogQ0VOVEVSLCAvLyBob3Jpem9udGFsIGNlbnRlclxyXG4gICAgICAgIFJJR0hUOiBSSUdIVFxyXG4gICAgfSxcclxuICAgIGlzQWxpZ25pbmc6IGZhbHNlLFxyXG4gICAgX25vZGVzT3JkZXJEaXJ0eTogZmFsc2UsXHJcbiAgICBfYWN0aXZlV2lkZ2V0c0l0ZXJhdG9yOiBuZXcgY2MuanMuYXJyYXkuTXV0YWJsZUZvcndhcmRJdGVyYXRvcihhY3RpdmVXaWRnZXRzKSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoZGlyZWN0b3IpIHtcclxuICAgICAgICBkaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHJlZnJlc2hTY2VuZSk7XHJcblxyXG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgY2MuZW5naW5lKSB7XHJcbiAgICAgICAgICAgIGNjLmVuZ2luZS5vbignZGVzaWduLXJlc29sdXRpb24tY2hhbmdlZCcsIHRoaXMub25SZXNpemVkLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHRoaXNPblJlc2l6ZWQgPSB0aGlzLm9uUmVzaXplZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBjYy52aWV3Lm9uKCdjYW52YXMtcmVzaXplJywgdGhpc09uUmVzaXplZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXNPblJlc2l6ZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZGQ6IGZ1bmN0aW9uICh3aWRnZXQpIHtcclxuICAgICAgICB3aWRnZXQubm9kZS5fd2lkZ2V0ID0gd2lkZ2V0O1xyXG4gICAgICAgIHRoaXMuX25vZGVzT3JkZXJEaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICB3aWRnZXQubm9kZS5vbihFdmVudC5QT1NJVElPTl9DSEFOR0VELCBhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IsIHdpZGdldCk7XHJcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9uKEV2ZW50LlNJWkVfQ0hBTkdFRCwgYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IsIHdpZGdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHdpZGdldCkge1xyXG4gICAgICAgIHdpZGdldC5ub2RlLl93aWRnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldHNJdGVyYXRvci5yZW1vdmUod2lkZ2V0KTtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9mZihFdmVudC5QT1NJVElPTl9DSEFOR0VELCBhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IsIHdpZGdldCk7XHJcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9mZihFdmVudC5TSVpFX0NIQU5HRUQsIGFkanVzdFdpZGdldFRvQWxsb3dSZXNpemluZ0luRWRpdG9yLCB3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblJlc2l6ZWQgKCkge1xyXG4gICAgICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgaWYgKHNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdpZGdldE9uUmVzaXplZChzY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlZnJlc2hXaWRnZXRPblJlc2l6ZWQgKG5vZGUpIHtcclxuICAgICAgICB2YXIgd2lkZ2V0ID0gY2MuTm9kZS5pc05vZGUobm9kZSkgJiYgbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBpZiAod2lkZ2V0ICYmIHdpZGdldC5lbmFibGVkICYmIHdpZGdldC5hbGlnbk1vZGUgPT09IEFsaWduTW9kZS5PTl9XSU5ET1dfUkVTSVpFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkKHdpZGdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLl9jaGlsZHJlbjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hXaWRnZXRPblJlc2l6ZWQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB1cGRhdGVBbGlnbm1lbnQ6IHVwZGF0ZUFsaWdubWVudCxcclxuICAgIEFsaWduTW9kZTogQWxpZ25Nb2RlLFxyXG59O1xyXG5cclxuaWYgKENDX0VESVRPUikge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMuX2NvbXB1dGVJbnZlcnNlVHJhbnNGb3JUYXJnZXQgPSBjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0O1xyXG4gICAgbW9kdWxlLmV4cG9ydHMuX2dldFJlYWRvbmx5Tm9kZVNpemUgPSBnZXRSZWFkb25seU5vZGVTaXplO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9