
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCButton.js';
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
var Component = require('./CCComponent');

var GraySpriteState = require('../utils/gray-sprite-state');
/**
 * !#en Enum for transition type.
 * !#zh 过渡类型
 * @enum Button.Transition
 */


var Transition = cc.Enum({
  /**
   * !#en The none type.
   * !#zh 不做任何过渡
   * @property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en The color type.
   * !#zh 颜色过渡
   * @property {Number} COLOR
   */
  COLOR: 1,

  /**
   * !#en The sprite type.
   * !#zh 精灵过渡
   * @property {Number} SPRITE
   */
  SPRITE: 2,

  /**
   * !#en The scale type
   * !#zh 缩放过渡
   * @property {Number} SCALE
   */
  SCALE: 3
});
var State = cc.Enum({
  NORMAL: 0,
  HOVER: 1,
  PRESSED: 2,
  DISABLED: 3
});
/**
 * !#en
 * Button component. Can be pressed or clicked. Button has 4 Transition types:
 *
 *   - Button.Transition.NONE   // Button will do nothing
 *   - Button.Transition.COLOR  // Button will change target's color
 *   - Button.Transition.SPRITE // Button will change target Sprite's sprite
 *   - Button.Transition.SCALE // Button will change target node's scale
 *
 * The button can bind events (but you must be on the button's node to bind events).<br/>
 * The following events can be triggered on all platforms.
 *
 *  - cc.Node.EventType.TOUCH_START  // Press
 *  - cc.Node.EventType.TOUCH_MOVE   // After pressing and moving
 *  - cc.Node.EventType.TOUCH_END    // After pressing and releasing
 *  - cc.Node.EventType.TOUCH_CANCEL // Press to cancel
 *
 * The following events are only triggered on the PC platform:
 *
 *   - cc.Node.EventType.MOUSE_DOWN
 *   - cc.Node.EventType.MOUSE_MOVE
 *   - cc.Node.EventType.MOUSE_ENTER
 *   - cc.Node.EventType.MOUSE_LEAVE
 *   - cc.Node.EventType.MOUSE_UP
 *   - cc.Node.EventType.MOUSE_WHEEL
 *
 * User can get the current clicked node with 'event.target' from event object which is passed as parameter in the callback function of click event.
 *
 * !#zh
 * 按钮组件。可以被按下，或者点击。
 *
 * 按钮可以通过修改 Transition 来设置按钮状态过渡的方式：
 *
 *   - Button.Transition.NONE   // 不做任何过渡
 *   - Button.Transition.COLOR  // 进行颜色之间过渡
 *   - Button.Transition.SPRITE // 进行精灵之间过渡
 *   - Button.Transition.SCALE // 进行缩放过渡
 *
 * 按钮可以绑定事件（但是必须要在按钮的 Node 上才能绑定事件）：<br/>
 * 以下事件可以在全平台上都触发：
 *
 *   - cc.Node.EventType.TOUCH_START  // 按下时事件
 *   - cc.Node.EventType.TOUCH_MOVE   // 按住移动后事件
 *   - cc.Node.EventType.TOUCH_END    // 按下后松开后事件
 *   - cc.Node.EventType.TOUCH_CANCEL // 按下取消事件
 *
 * 以下事件只在 PC 平台上触发：
 *
 *   - cc.Node.EventType.MOUSE_DOWN  // 鼠标按下时事件
 *   - cc.Node.EventType.MOUSE_MOVE  // 鼠标按住移动后事件
 *   - cc.Node.EventType.MOUSE_ENTER // 鼠标进入目标事件
 *   - cc.Node.EventType.MOUSE_LEAVE // 鼠标离开目标事件
 *   - cc.Node.EventType.MOUSE_UP    // 鼠标松开事件
 *   - cc.Node.EventType.MOUSE_WHEEL // 鼠标滚轮事件
 *
 * 用户可以通过获取 __点击事件__ 回调函数的参数 event 的 target 属性获取当前点击对象。
 * @class Button
 * @extends Component
 * @uses GraySpriteState
 * @example
 *
 * // Add an event to the button.
 * button.node.on(cc.Node.EventType.TOUCH_START, function (event) {
 *     cc.log("This is a callback after the trigger event");
 * });

 * // You could also add a click event
 * //Note: In this way, you can't get the touch event info, so use it wisely.
 * button.node.on('click', function (button) {
 *    //The event is a custom event, you could get the Button component via first argument
 * })
 *
 */

var Button = cc.Class({
  name: 'cc.Button',
  "extends": Component,
  mixins: [GraySpriteState],
  ctor: function ctor() {
    this._pressed = false;
    this._hovered = false;
    this._fromColor = null;
    this._toColor = null;
    this._time = 0;
    this._transitionFinished = true; // init _originalScale in __preload()

    this._fromScale = cc.Vec2.ZERO;
    this._toScale = cc.Vec2.ZERO;
    this._originalScale = null;
    this._graySpriteMaterial = null;
    this._spriteMaterial = null;
    this._sprite = null;
  },
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Button',
    help: 'i18n:COMPONENT.help_url.button',
    inspector: 'packages://inspector/inspectors/comps/button.js',
    executeInEditMode: true
  },
  properties: {
    /**
     * !#en
     * Whether the Button is disabled.
     * If true, the Button will trigger event and do transition.
     * !#zh
     * 按钮事件是否被响应，如果为 false，则按钮将被禁用。
     * @property {Boolean} interactable
     * @default true
     */
    interactable: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.interactable',
      notify: function notify() {
        this._updateState();

        if (!this.interactable) {
          this._resetState();
        }
      },
      animatable: false
    },
    _resizeToTarget: {
      animatable: false,
      set: function set(value) {
        if (value) {
          this._resizeNodeToTargetNode();
        }
      }
    },

    /**
     * !#en When this flag is true, Button target sprite will turn gray when interactable is false.
     * !#zh 如果这个标记为 true，当 button 的 interactable 属性为 false 的时候，会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰
     * @property {Boolean} enableAutoGrayEffect
     */
    enableAutoGrayEffect: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.auto_gray_effect',
      notify: function notify() {
        this._updateDisabledState(true);
      }
    },

    /**
     * !#en Transition type
     * !#zh 按钮状态改变时过渡方式。
     * @property {Button.Transition} transition
     * @default Button.Transition.Node
     */
    transition: {
      "default": Transition.NONE,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.transition',
      type: Transition,
      animatable: false,
      notify: function notify(oldValue) {
        this._updateTransition(oldValue);
      },
      formerlySerializedAs: 'transition'
    },
    // color transition

    /**
     * !#en Normal state color.
     * !#zh 普通状态下按钮所显示的颜色。
     * @property {Color} normalColor
     */
    normalColor: {
      "default": cc.Color.WHITE,
      displayName: 'Normal',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.NORMAL) {
          this._getTarget().opacity = this.normalColor.a;
        }

        this._updateState();
      }
    },

    /**
     * !#en Pressed state color
     * !#zh 按下状态时按钮所显示的颜色。
     * @property {Color} pressedColor
     */
    pressedColor: {
      "default": cc.color(211, 211, 211),
      displayName: 'Pressed',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.pressed_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.PRESSED) {
          this._getTarget().opacity = this.pressedColor.a;
        }

        this._updateState();
      },
      formerlySerializedAs: 'pressedColor'
    },

    /**
     * !#en Hover state color
     * !#zh 悬停状态下按钮所显示的颜色。
     * @property {Color} hoverColor
     */
    hoverColor: {
      "default": cc.Color.WHITE,
      displayName: 'Hover',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.hover_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.HOVER) {
          this._getTarget().opacity = this.hoverColor.a;
        }

        this._updateState();
      },
      formerlySerializedAs: 'hoverColor'
    },

    /**
     * !#en Disabled state color
     * !#zh 禁用状态下按钮所显示的颜色。
     * @property {Color} disabledColor
     */
    disabledColor: {
      "default": cc.color(124, 124, 124),
      displayName: 'Disabled',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.disabled_color',
      notify: function notify() {
        if (this.transition === Transition.Color && this._getButtonState() === State.DISABLED) {
          this._getTarget().opacity = this.disabledColor.a;
        }

        this._updateState();
      }
    },

    /**
     * !#en Color and Scale transition duration
     * !#zh 颜色过渡和缩放过渡时所需时间
     * @property {Number} duration
     */
    duration: {
      "default": 0.1,
      range: [0, 10],
      tooltip: CC_DEV && 'i18n:COMPONENT.button.duration'
    },

    /**
     * !#en  When user press the button, the button will zoom to a scale.
     * The final scale of the button  equals (button original scale * zoomScale)
     * !#zh 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 scale * zoomScale
     * @property {Number} zoomScale
     */
    zoomScale: {
      "default": 1.2,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.zoom_scale'
    },
    // sprite transition

    /**
     * !#en Normal state sprite
     * !#zh 普通状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} normalSprite
     */
    normalSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Normal',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.normal_sprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Pressed state sprite
     * !#zh 按下状态时按钮所显示的 Sprite 。
     * @property {SpriteFrame} pressedSprite
     */
    pressedSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Pressed',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.pressed_sprite',
      formerlySerializedAs: 'pressedSprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Hover state sprite
     * !#zh 悬停状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} hoverSprite
     */
    hoverSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Hover',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.hover_sprite',
      formerlySerializedAs: 'hoverSprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en Disabled state sprite
     * !#zh 禁用状态下按钮所显示的 Sprite 。
     * @property {SpriteFrame} disabledSprite
     */
    disabledSprite: {
      "default": null,
      type: cc.SpriteFrame,
      displayName: 'Disabled',
      tooltip: CC_DEV && 'i18n:COMPONENT.button.disabled_sprite',
      notify: function notify() {
        this._updateState();
      }
    },

    /**
     * !#en
     * Transition target.
     * When Button state changed:
     *  If Transition type is Button.Transition.NONE, Button will do nothing
     *  If Transition type is Button.Transition.COLOR, Button will change target's color
     *  If Transition type is Button.Transition.SPRITE, Button will change target Sprite's sprite
     * !#zh
     * 需要过渡的目标。
     * 当前按钮状态改变规则：
     * -如果 Transition type 选择 Button.Transition.NONE，按钮不做任何过渡。
     * -如果 Transition type 选择 Button.Transition.COLOR，按钮会对目标颜色进行颜色之间的过渡。
     * -如果 Transition type 选择 Button.Transition.Sprite，按钮会对目标 Sprite 进行 Sprite 之间的过渡。
     * @property {Node} target
     */
    target: {
      "default": null,
      type: cc.Node,
      tooltip: CC_DEV && "i18n:COMPONENT.button.target",
      notify: function notify(oldValue) {
        this._applyTarget();

        if (oldValue && this.target !== oldValue) {
          this._unregisterTargetEvent(oldValue);
        }
      }
    },

    /**
     * !#en If Button is clicked, it will trigger event's handler
     * !#zh 按钮的点击事件列表。
     * @property {Component.EventHandler[]} clickEvents
     */
    clickEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.button.click_events'
    }
  },
  statics: {
    Transition: Transition
  },
  __preload: function __preload() {
    this._applyTarget();

    this._resetState();
  },
  _resetState: function _resetState() {
    this._pressed = false;
    this._hovered = false; // // Restore button status

    var target = this._getTarget();

    var transition = this.transition;
    var originalScale = this._originalScale;

    if (transition === Transition.COLOR && this.interactable) {
      this._setTargetColor(this.normalColor);
    } else if (transition === Transition.SCALE && originalScale) {
      target.setScale(originalScale.x, originalScale.y);
    }

    this._transitionFinished = true;
  },
  onEnable: function onEnable() {
    // check sprite frames
    if (this.normalSprite) {
      this.normalSprite.ensureLoadTexture();
    }

    if (this.hoverSprite) {
      this.hoverSprite.ensureLoadTexture();
    }

    if (this.pressedSprite) {
      this.pressedSprite.ensureLoadTexture();
    }

    if (this.disabledSprite) {
      this.disabledSprite.ensureLoadTexture();
    }

    if (!CC_EDITOR) {
      this._registerNodeEvent();
    }

    this._updateState();
  },
  onDisable: function onDisable() {
    this._resetState();

    if (!CC_EDITOR) {
      this._unregisterNodeEvent();
    }
  },
  _getTarget: function _getTarget() {
    return this.target ? this.target : this.node;
  },
  _onTargetSpriteFrameChanged: function _onTargetSpriteFrameChanged(comp) {
    if (this.transition === Transition.SPRITE) {
      this._setCurrentStateSprite(comp.spriteFrame);
    }
  },
  _onTargetColorChanged: function _onTargetColorChanged(color) {
    if (this.transition === Transition.COLOR) {
      this._setCurrentStateColor(color);
    }
  },
  _onTargetScaleChanged: function _onTargetScaleChanged() {
    var target = this._getTarget(); // update _originalScale if target scale changed


    if (this._originalScale) {
      if (this.transition !== Transition.SCALE || this._transitionFinished) {
        this._originalScale.x = target.scaleX;
        this._originalScale.y = target.scaleY;
      }
    }
  },
  _setTargetColor: function _setTargetColor(color) {
    var target = this._getTarget();

    var cloneColor = color.clone();
    target.opacity = cloneColor.a;
    cloneColor.a = 255; // don't set node opacity via node.color.a

    target.color = cloneColor;
  },
  _getStateColor: function _getStateColor(state) {
    switch (state) {
      case State.NORMAL:
        return this.normalColor;

      case State.HOVER:
        return this.hoverColor;

      case State.PRESSED:
        return this.pressedColor;

      case State.DISABLED:
        return this.disabledColor;
    }
  },
  _getStateSprite: function _getStateSprite(state) {
    switch (state) {
      case State.NORMAL:
        return this.normalSprite;

      case State.HOVER:
        return this.hoverSprite;

      case State.PRESSED:
        return this.pressedSprite;

      case State.DISABLED:
        return this.disabledSprite;
    }
  },
  _setCurrentStateColor: function _setCurrentStateColor(color) {
    switch (this._getButtonState()) {
      case State.NORMAL:
        this.normalColor = color;
        break;

      case State.HOVER:
        this.hoverColor = color;
        break;

      case State.PRESSED:
        this.pressedColor = color;
        break;

      case State.DISABLED:
        this.disabledColor = color;
        break;
    }
  },
  _setCurrentStateSprite: function _setCurrentStateSprite(spriteFrame) {
    switch (this._getButtonState()) {
      case State.NORMAL:
        this.normalSprite = spriteFrame;
        break;

      case State.HOVER:
        this.hoverSprite = spriteFrame;
        break;

      case State.PRESSED:
        this.pressedSprite = spriteFrame;
        break;

      case State.DISABLED:
        this.disabledSprite = spriteFrame;
        break;
    }
  },
  update: function update(dt) {
    var target = this._getTarget();

    if (this._transitionFinished) return;
    if (this.transition !== Transition.COLOR && this.transition !== Transition.SCALE) return;
    this.time += dt;
    var ratio = 1.0;

    if (this.duration > 0) {
      ratio = this.time / this.duration;
    } // clamp ratio


    if (ratio >= 1) {
      ratio = 1;
    }

    if (this.transition === Transition.COLOR) {
      var color = this._fromColor.lerp(this._toColor, ratio);

      this._setTargetColor(color);
    } // Skip if _originalScale is invalid
    else if (this.transition === Transition.SCALE && this._originalScale) {
        target.scale = this._fromScale.lerp(this._toScale, ratio);
      }

    if (ratio === 1) {
      this._transitionFinished = true;
    }
  },
  _registerNodeEvent: function _registerNodeEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  },
  _unregisterNodeEvent: function _unregisterNodeEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
    this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
  },
  _registerTargetEvent: function _registerTargetEvent(target) {
    if (CC_EDITOR) {
      target.on('spriteframe-changed', this._onTargetSpriteFrameChanged, this);
      target.on(cc.Node.EventType.COLOR_CHANGED, this._onTargetColorChanged, this);
    }

    target.on(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
  },
  _unregisterTargetEvent: function _unregisterTargetEvent(target) {
    if (CC_EDITOR) {
      target.off('spriteframe-changed', this._onTargetSpriteFrameChanged, this);
      target.off(cc.Node.EventType.COLOR_CHANGED, this._onTargetColorChanged, this);
    }

    target.off(cc.Node.EventType.SCALE_CHANGED, this._onTargetScaleChanged, this);
  },
  _getTargetSprite: function _getTargetSprite(target) {
    var sprite = null;

    if (target) {
      sprite = target.getComponent(cc.Sprite);
    }

    return sprite;
  },
  _applyTarget: function _applyTarget() {
    var target = this._getTarget();

    this._sprite = this._getTargetSprite(target);

    if (!this._originalScale) {
      this._originalScale = cc.Vec2.ZERO;
    }

    this._originalScale.x = target.scaleX;
    this._originalScale.y = target.scaleY;

    this._registerTargetEvent(target);
  },
  // touch event handler
  _onTouchBegan: function _onTouchBegan(event) {
    if (!this.interactable || !this.enabledInHierarchy) return;
    this._pressed = true;

    this._updateState();

    event.stopPropagation();
  },
  _onTouchMove: function _onTouchMove(event) {
    if (!this.interactable || !this.enabledInHierarchy || !this._pressed) return; // mobile phone will not emit _onMouseMoveOut,
    // so we have to do hit test when touch moving

    var touch = event.touch;

    var hit = this.node._hitTest(touch.getLocation());

    var target = this._getTarget();

    var originalScale = this._originalScale;

    if (this.transition === Transition.SCALE && originalScale) {
      if (hit) {
        this._fromScale.x = originalScale.x;
        this._fromScale.y = originalScale.y;
        this._toScale.x = originalScale.x * this.zoomScale;
        this._toScale.y = originalScale.y * this.zoomScale;
        this._transitionFinished = false;
      } else {
        this.time = 0;
        this._transitionFinished = true;
        target.setScale(originalScale.x, originalScale.y);
      }
    } else {
      var state;

      if (hit) {
        state = State.PRESSED;
      } else {
        state = State.NORMAL;
      }

      this._applyTransition(state);
    }

    event.stopPropagation();
  },
  _onTouchEnded: function _onTouchEnded(event) {
    if (!this.interactable || !this.enabledInHierarchy) return;

    if (this._pressed) {
      cc.Component.EventHandler.emitEvents(this.clickEvents, event);
      this.node.emit('click', this);
    }

    this._pressed = false;

    this._updateState();

    event.stopPropagation();
  },
  _onTouchCancel: function _onTouchCancel() {
    if (!this.interactable || !this.enabledInHierarchy) return;
    this._pressed = false;

    this._updateState();
  },
  _onMouseMoveIn: function _onMouseMoveIn() {
    if (this._pressed || !this.interactable || !this.enabledInHierarchy) return;
    if (this.transition === Transition.SPRITE && !this.hoverSprite) return;

    if (!this._hovered) {
      this._hovered = true;

      this._updateState();
    }
  },
  _onMouseMoveOut: function _onMouseMoveOut() {
    if (this._hovered) {
      this._hovered = false;

      this._updateState();
    }
  },
  // state handler
  _updateState: function _updateState() {
    var state = this._getButtonState();

    this._applyTransition(state);

    this._updateDisabledState();
  },
  _getButtonState: function _getButtonState() {
    var state;

    if (!this.interactable) {
      state = State.DISABLED;
    } else if (this._pressed) {
      state = State.PRESSED;
    } else if (this._hovered) {
      state = State.HOVER;
    } else {
      state = State.NORMAL;
    }

    return state;
  },
  _updateColorTransitionImmediately: function _updateColorTransitionImmediately(state) {
    var color = this._getStateColor(state);

    this._setTargetColor(color);

    this._fromColor = color.clone();
    this._toColor = color;
  },
  _updateColorTransition: function _updateColorTransition(state) {
    if (CC_EDITOR || state === State.DISABLED) {
      this._updateColorTransitionImmediately(state);
    } else {
      var target = this._getTarget();

      var color = this._getStateColor(state);

      this._fromColor = target.color.clone();
      this._toColor = color;
      this.time = 0;
      this._transitionFinished = false;
    }
  },
  _updateSpriteTransition: function _updateSpriteTransition(state) {
    var sprite = this._getStateSprite(state);

    if (this._sprite && sprite) {
      this._sprite.spriteFrame = sprite;
    }
  },
  _updateScaleTransition: function _updateScaleTransition(state) {
    if (state === State.PRESSED) {
      this._zoomUp();
    } else {
      this._zoomBack();
    }
  },
  _zoomUp: function _zoomUp() {
    // skip before __preload()
    if (!this._originalScale) {
      return;
    }

    this._fromScale.x = this._originalScale.x;
    this._fromScale.y = this._originalScale.y;
    this._toScale.x = this._originalScale.x * this.zoomScale;
    this._toScale.y = this._originalScale.y * this.zoomScale;
    this.time = 0;
    this._transitionFinished = false;
  },
  _zoomBack: function _zoomBack() {
    // skip before __preload()
    if (!this._originalScale) {
      return;
    }

    var target = this._getTarget();

    this._fromScale.x = target.scaleX;
    this._fromScale.y = target.scaleY;
    this._toScale.x = this._originalScale.x;
    this._toScale.y = this._originalScale.y;
    this.time = 0;
    this._transitionFinished = false;
  },
  _updateTransition: function _updateTransition(oldTransition) {
    // Reset to normal data when change transition.
    if (oldTransition === Transition.COLOR) {
      this._updateColorTransitionImmediately(State.NORMAL);
    } else if (oldTransition === Transition.SPRITE) {
      this._updateSpriteTransition(State.NORMAL);
    }

    this._updateState();
  },
  _applyTransition: function _applyTransition(state) {
    var transition = this.transition;

    if (transition === Transition.COLOR) {
      this._updateColorTransition(state);
    } else if (transition === Transition.SPRITE) {
      this._updateSpriteTransition(state);
    } else if (transition === Transition.SCALE) {
      this._updateScaleTransition(state);
    }
  },
  _resizeNodeToTargetNode: CC_EDITOR && function () {
    this.node.setContentSize(this._getTarget().getContentSize());
  },
  _updateDisabledState: function _updateDisabledState(force) {
    if (!this._sprite) return;

    if (this.enableAutoGrayEffect || force) {
      var useGrayMaterial = false;

      if (!(this.transition === Transition.SPRITE && this.disabledSprite)) {
        useGrayMaterial = this.enableAutoGrayEffect && !this.interactable;
      }

      this._switchGrayMaterial(useGrayMaterial, this._sprite);
    }
  }
});
cc.Button = module.exports = Button;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event click
 * @param {Event.EventCustom} event
 * @param {Button} button - The Button component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXGNvbXBvbmVudHNcXENDQnV0dG9uLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsInJlcXVpcmUiLCJHcmF5U3ByaXRlU3RhdGUiLCJUcmFuc2l0aW9uIiwiY2MiLCJFbnVtIiwiTk9ORSIsIkNPTE9SIiwiU1BSSVRFIiwiU0NBTEUiLCJTdGF0ZSIsIk5PUk1BTCIsIkhPVkVSIiwiUFJFU1NFRCIsIkRJU0FCTEVEIiwiQnV0dG9uIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwiY3RvciIsIl9wcmVzc2VkIiwiX2hvdmVyZWQiLCJfZnJvbUNvbG9yIiwiX3RvQ29sb3IiLCJfdGltZSIsIl90cmFuc2l0aW9uRmluaXNoZWQiLCJfZnJvbVNjYWxlIiwiVmVjMiIsIlpFUk8iLCJfdG9TY2FsZSIsIl9vcmlnaW5hbFNjYWxlIiwiX2dyYXlTcHJpdGVNYXRlcmlhbCIsIl9zcHJpdGVNYXRlcmlhbCIsIl9zcHJpdGUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicHJvcGVydGllcyIsImludGVyYWN0YWJsZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJub3RpZnkiLCJfdXBkYXRlU3RhdGUiLCJfcmVzZXRTdGF0ZSIsImFuaW1hdGFibGUiLCJfcmVzaXplVG9UYXJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9yZXNpemVOb2RlVG9UYXJnZXROb2RlIiwiZW5hYmxlQXV0b0dyYXlFZmZlY3QiLCJfdXBkYXRlRGlzYWJsZWRTdGF0ZSIsInRyYW5zaXRpb24iLCJ0eXBlIiwib2xkVmFsdWUiLCJfdXBkYXRlVHJhbnNpdGlvbiIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwibm9ybWFsQ29sb3IiLCJDb2xvciIsIldISVRFIiwiZGlzcGxheU5hbWUiLCJfZ2V0QnV0dG9uU3RhdGUiLCJfZ2V0VGFyZ2V0Iiwib3BhY2l0eSIsImEiLCJwcmVzc2VkQ29sb3IiLCJjb2xvciIsImhvdmVyQ29sb3IiLCJkaXNhYmxlZENvbG9yIiwiZHVyYXRpb24iLCJyYW5nZSIsInpvb21TY2FsZSIsIm5vcm1hbFNwcml0ZSIsIlNwcml0ZUZyYW1lIiwicHJlc3NlZFNwcml0ZSIsImhvdmVyU3ByaXRlIiwiZGlzYWJsZWRTcHJpdGUiLCJ0YXJnZXQiLCJOb2RlIiwiX2FwcGx5VGFyZ2V0IiwiX3VucmVnaXN0ZXJUYXJnZXRFdmVudCIsImNsaWNrRXZlbnRzIiwiRXZlbnRIYW5kbGVyIiwic3RhdGljcyIsIl9fcHJlbG9hZCIsIm9yaWdpbmFsU2NhbGUiLCJfc2V0VGFyZ2V0Q29sb3IiLCJzZXRTY2FsZSIsIngiLCJ5Iiwib25FbmFibGUiLCJlbnN1cmVMb2FkVGV4dHVyZSIsIl9yZWdpc3Rlck5vZGVFdmVudCIsIm9uRGlzYWJsZSIsIl91bnJlZ2lzdGVyTm9kZUV2ZW50Iiwibm9kZSIsIl9vblRhcmdldFNwcml0ZUZyYW1lQ2hhbmdlZCIsImNvbXAiLCJfc2V0Q3VycmVudFN0YXRlU3ByaXRlIiwic3ByaXRlRnJhbWUiLCJfb25UYXJnZXRDb2xvckNoYW5nZWQiLCJfc2V0Q3VycmVudFN0YXRlQ29sb3IiLCJfb25UYXJnZXRTY2FsZUNoYW5nZWQiLCJzY2FsZVgiLCJzY2FsZVkiLCJjbG9uZUNvbG9yIiwiY2xvbmUiLCJfZ2V0U3RhdGVDb2xvciIsInN0YXRlIiwiX2dldFN0YXRlU3ByaXRlIiwidXBkYXRlIiwiZHQiLCJ0aW1lIiwicmF0aW8iLCJsZXJwIiwic2NhbGUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hCZWdhbiIsIlRPVUNIX01PVkUiLCJfb25Ub3VjaE1vdmUiLCJUT1VDSF9FTkQiLCJfb25Ub3VjaEVuZGVkIiwiVE9VQ0hfQ0FOQ0VMIiwiX29uVG91Y2hDYW5jZWwiLCJNT1VTRV9FTlRFUiIsIl9vbk1vdXNlTW92ZUluIiwiTU9VU0VfTEVBVkUiLCJfb25Nb3VzZU1vdmVPdXQiLCJvZmYiLCJfcmVnaXN0ZXJUYXJnZXRFdmVudCIsIkNPTE9SX0NIQU5HRUQiLCJTQ0FMRV9DSEFOR0VEIiwiX2dldFRhcmdldFNwcml0ZSIsInNwcml0ZSIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsImV2ZW50IiwiZW5hYmxlZEluSGllcmFyY2h5Iiwic3RvcFByb3BhZ2F0aW9uIiwidG91Y2giLCJoaXQiLCJfaGl0VGVzdCIsImdldExvY2F0aW9uIiwiX2FwcGx5VHJhbnNpdGlvbiIsImVtaXRFdmVudHMiLCJlbWl0IiwiX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbkltbWVkaWF0ZWx5IiwiX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbiIsIl91cGRhdGVTcHJpdGVUcmFuc2l0aW9uIiwiX3VwZGF0ZVNjYWxlVHJhbnNpdGlvbiIsIl96b29tVXAiLCJfem9vbUJhY2siLCJvbGRUcmFuc2l0aW9uIiwic2V0Q29udGVudFNpemUiLCJnZXRDb250ZW50U2l6ZSIsImZvcmNlIiwidXNlR3JheU1hdGVyaWFsIiwiX3N3aXRjaEdyYXlNYXRlcmlhbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBekI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsNEJBQUQsQ0FBL0I7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxJQUFJRSxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3JCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsSUFBSSxFQUFFLENBTmU7O0FBUXJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsS0FBSyxFQUFFLENBYmM7O0FBZXJCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7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OEYsY0FBbEIsRUFBekI7QUFDSCxHQTVzQmlCO0FBOHNCbEJ6RyxFQUFBQSxvQkE5c0JrQixnQ0E4c0JJMEcsS0E5c0JKLEVBOHNCVztBQUN6QixRQUFJLENBQUMsS0FBSzlILE9BQVYsRUFBbUI7O0FBRW5CLFFBQUksS0FBS21CLG9CQUFMLElBQTZCMkcsS0FBakMsRUFBd0M7QUFDcEMsVUFBSUMsZUFBZSxHQUFHLEtBQXRCOztBQUVBLFVBQUksRUFBRSxLQUFLMUcsVUFBTCxLQUFvQm5ELFVBQVUsQ0FBQ0ssTUFBL0IsSUFBeUMsS0FBS3NFLGNBQWhELENBQUosRUFBcUU7QUFDakVrRixRQUFBQSxlQUFlLEdBQUcsS0FBSzVHLG9CQUFMLElBQTZCLENBQUMsS0FBS1gsWUFBckQ7QUFDSDs7QUFDRCxXQUFLd0gsbUJBQUwsQ0FBeUJELGVBQXpCLEVBQTBDLEtBQUsvSCxPQUEvQztBQUNIO0FBQ0o7QUF6dEJpQixDQUFULENBQWI7QUE0dEJBN0IsRUFBRSxDQUFDVyxNQUFILEdBQVltSixNQUFNLENBQUNDLE9BQVAsR0FBaUJwSixNQUE3QjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpO1xuY29uc3QgR3JheVNwcml0ZVN0YXRlID0gcmVxdWlyZSgnLi4vdXRpbHMvZ3JheS1zcHJpdGUtc3RhdGUnKTtcblxuLyoqXG4gKiAhI2VuIEVudW0gZm9yIHRyYW5zaXRpb24gdHlwZS5cbiAqICEjemgg6L+H5rih57G75Z6LXG4gKiBAZW51bSBCdXR0b24uVHJhbnNpdGlvblxuICovXG5sZXQgVHJhbnNpdGlvbiA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIG5vbmUgdHlwZS5cbiAgICAgKiAhI3poIOS4jeWBmuS7u+S9lei/h+a4oVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT05FXG4gICAgICovXG4gICAgTk9ORTogMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGNvbG9yIHR5cGUuXG4gICAgICogISN6aCDpopzoibLov4fmuKFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ09MT1JcbiAgICAgKi9cbiAgICBDT0xPUjogMSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNwcml0ZSB0eXBlLlxuICAgICAqICEjemgg57K+54G16L+H5rihXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNQUklURVxuICAgICAqL1xuICAgIFNQUklURTogMixcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzY2FsZSB0eXBlXG4gICAgICogISN6aCDnvKnmlL7ov4fmuKFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NBTEVcbiAgICAgKi9cbiAgICBTQ0FMRTogM1xufSk7XG5cbmNvbnN0IFN0YXRlID0gY2MuRW51bSh7XG4gICAgTk9STUFMOiAwLFxuICAgIEhPVkVSOiAxLFxuICAgIFBSRVNTRUQ6IDIsXG4gICAgRElTQUJMRUQ6IDMsXG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBCdXR0b24gY29tcG9uZW50LiBDYW4gYmUgcHJlc3NlZCBvciBjbGlja2VkLiBCdXR0b24gaGFzIDQgVHJhbnNpdGlvbiB0eXBlczpcbiAqXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uTk9ORSAgIC8vIEJ1dHRvbiB3aWxsIGRvIG5vdGhpbmdcbiAqICAgLSBCdXR0b24uVHJhbnNpdGlvbi5DT0xPUiAgLy8gQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCdzIGNvbG9yXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uU1BSSVRFIC8vIEJ1dHRvbiB3aWxsIGNoYW5nZSB0YXJnZXQgU3ByaXRlJ3Mgc3ByaXRlXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUgLy8gQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCBub2RlJ3Mgc2NhbGVcbiAqXG4gKiBUaGUgYnV0dG9uIGNhbiBiaW5kIGV2ZW50cyAoYnV0IHlvdSBtdXN0IGJlIG9uIHRoZSBidXR0b24ncyBub2RlIHRvIGJpbmQgZXZlbnRzKS48YnIvPlxuICogVGhlIGZvbGxvd2luZyBldmVudHMgY2FuIGJlIHRyaWdnZXJlZCBvbiBhbGwgcGxhdGZvcm1zLlxuICpcbiAqICAtIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUICAvLyBQcmVzc1xuICogIC0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSAgIC8vIEFmdGVyIHByZXNzaW5nIGFuZCBtb3ZpbmdcbiAqICAtIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCAgICAvLyBBZnRlciBwcmVzc2luZyBhbmQgcmVsZWFzaW5nXG4gKiAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwgLy8gUHJlc3MgdG8gY2FuY2VsXG4gKlxuICogVGhlIGZvbGxvd2luZyBldmVudHMgYXJlIG9ubHkgdHJpZ2dlcmVkIG9uIHRoZSBQQyBwbGF0Zm9ybTpcbiAqXG4gKiAgIC0gY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX01PVkVcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFXG4gKiAgIC0gY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfVVBcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9XSEVFTFxuICpcbiAqIFVzZXIgY2FuIGdldCB0aGUgY3VycmVudCBjbGlja2VkIG5vZGUgd2l0aCAnZXZlbnQudGFyZ2V0JyBmcm9tIGV2ZW50IG9iamVjdCB3aGljaCBpcyBwYXNzZWQgYXMgcGFyYW1ldGVyIGluIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBvZiBjbGljayBldmVudC5cbiAqXG4gKiAhI3poXG4gKiDmjInpkq7nu4Tku7bjgILlj6/ku6XooqvmjInkuIvvvIzmiJbogIXngrnlh7vjgIJcbiAqXG4gKiDmjInpkq7lj6/ku6XpgJrov4fkv67mlLkgVHJhbnNpdGlvbiDmnaXorr7nva7mjInpkq7nirbmgIHov4fmuKHnmoTmlrnlvI/vvJpcbiAqXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uTk9ORSAgIC8vIOS4jeWBmuS7u+S9lei/h+a4oVxuICogICAtIEJ1dHRvbi5UcmFuc2l0aW9uLkNPTE9SICAvLyDov5vooYzpopzoibLkuYvpl7Tov4fmuKFcbiAqICAgLSBCdXR0b24uVHJhbnNpdGlvbi5TUFJJVEUgLy8g6L+b6KGM57K+54G15LmL6Ze06L+H5rihXG4gKiAgIC0gQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUgLy8g6L+b6KGM57yp5pS+6L+H5rihXG4gKlxuICog5oyJ6ZKu5Y+v5Lul57uR5a6a5LqL5Lu277yI5L2G5piv5b+F6aG76KaB5Zyo5oyJ6ZKu55qEIE5vZGUg5LiK5omN6IO957uR5a6a5LqL5Lu277yJ77yaPGJyLz5cbiAqIOS7peS4i+S6i+S7tuWPr+S7peWcqOWFqOW5s+WPsOS4iumDveinpuWPke+8mlxuICpcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCAgLy8g5oyJ5LiL5pe25LqL5Lu2XG4gKiAgIC0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSAgIC8vIOaMieS9j+enu+WKqOWQjuS6i+S7tlxuICogICAtIGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCAgICAvLyDmjInkuIvlkI7mnb7lvIDlkI7kuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwgLy8g5oyJ5LiL5Y+W5raI5LqL5Lu2XG4gKlxuICog5Lul5LiL5LqL5Lu25Y+q5ZyoIFBDIOW5s+WPsOS4iuinpuWPke+8mlxuICpcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9ET1dOICAvLyDpvKDmoIfmjInkuIvml7bkuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9NT1ZFICAvLyDpvKDmoIfmjInkvY/np7vliqjlkI7kuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiAvLyDpvKDmoIfov5vlhaXnm67moIfkuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSAvLyDpvKDmoIfnprvlvIDnm67moIfkuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9VUCAgICAvLyDpvKDmoIfmnb7lvIDkuovku7ZcbiAqICAgLSBjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9XSEVFTCAvLyDpvKDmoIfmu5rova7kuovku7ZcbiAqXG4gKiDnlKjmiLflj6/ku6XpgJrov4fojrflj5YgX1/ngrnlh7vkuovku7ZfXyDlm57osIPlh73mlbDnmoTlj4LmlbAgZXZlbnQg55qEIHRhcmdldCDlsZ7mgKfojrflj5blvZPliY3ngrnlh7vlr7nosaHjgIJcbiAqIEBjbGFzcyBCdXR0b25cbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICogQHVzZXMgR3JheVNwcml0ZVN0YXRlXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEFkZCBhbiBldmVudCB0byB0aGUgYnV0dG9uLlxuICogYnV0dG9uLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uIChldmVudCkge1xuICogICAgIGNjLmxvZyhcIlRoaXMgaXMgYSBjYWxsYmFjayBhZnRlciB0aGUgdHJpZ2dlciBldmVudFwiKTtcbiAqIH0pO1xuXG4gKiAvLyBZb3UgY291bGQgYWxzbyBhZGQgYSBjbGljayBldmVudFxuICogLy9Ob3RlOiBJbiB0aGlzIHdheSwgeW91IGNhbid0IGdldCB0aGUgdG91Y2ggZXZlbnQgaW5mbywgc28gdXNlIGl0IHdpc2VseS5cbiAqIGJ1dHRvbi5ub2RlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChidXR0b24pIHtcbiAqICAgIC8vVGhlIGV2ZW50IGlzIGEgY3VzdG9tIGV2ZW50LCB5b3UgY291bGQgZ2V0IHRoZSBCdXR0b24gY29tcG9uZW50IHZpYSBmaXJzdCBhcmd1bWVudFxuICogfSlcbiAqXG4gKi9cbmxldCBCdXR0b24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkJ1dHRvbicsXG4gICAgZXh0ZW5kczogQ29tcG9uZW50LFxuICAgIG1peGluczogW0dyYXlTcHJpdGVTdGF0ZV0sXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9ob3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Zyb21Db2xvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RvQ29sb3IgPSBudWxsO1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gaW5pdCBfb3JpZ2luYWxTY2FsZSBpbiBfX3ByZWxvYWQoKVxuICAgICAgICB0aGlzLl9mcm9tU2NhbGUgPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIHRoaXMuX3RvU2NhbGUgPSBjYy5WZWMyLlpFUk87XG4gICAgICAgIHRoaXMuX29yaWdpbmFsU2NhbGUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2dyYXlTcHJpdGVNYXRlcmlhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nwcml0ZU1hdGVyaWFsID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9zcHJpdGUgPSBudWxsO1xuICAgIH0sXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvQnV0dG9uJyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmJ1dHRvbicsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvYnV0dG9uLmpzJyxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWVcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBCdXR0b24gaXMgZGlzYWJsZWQuXG4gICAgICAgICAqIElmIHRydWUsIHRoZSBCdXR0b24gd2lsbCB0cmlnZ2VyIGV2ZW50IGFuZCBkbyB0cmFuc2l0aW9uLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOaMiemSruS6i+S7tuaYr+WQpuiiq+WTjeW6lO+8jOWmguaenOS4uiBmYWxzZe+8jOWImeaMiemSruWwhuiiq+emgeeUqOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGludGVyYWN0YWJsZVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBpbnRlcmFjdGFibGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5pbnRlcmFjdGFibGUnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Jlc2l6ZVRvVGFyZ2V0OiB7XG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplTm9kZVRvVGFyZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGVuIHRoaXMgZmxhZyBpcyB0cnVlLCBCdXR0b24gdGFyZ2V0IHNwcml0ZSB3aWxsIHR1cm4gZ3JheSB3aGVuIGludGVyYWN0YWJsZSBpcyBmYWxzZS5cbiAgICAgICAgICogISN6aCDlpoLmnpzov5nkuKrmoIforrDkuLogdHJ1Ze+8jOW9kyBidXR0b24g55qEIGludGVyYWN0YWJsZSDlsZ7mgKfkuLogZmFsc2Ug55qE5pe25YCZ77yM5Lya5L2/55So5YaF572uIHNoYWRlciDorqkgYnV0dG9uIOeahCB0YXJnZXQg6IqC54K555qEIHNwcml0ZSDnu4Tku7blj5jngbBcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVBdXRvR3JheUVmZmVjdFxuICAgICAgICAgKi9cbiAgICAgICAgZW5hYmxlQXV0b0dyYXlFZmZlY3Q6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uYXV0b19ncmF5X2VmZmVjdCcsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVHJhbnNpdGlvbiB0eXBlXG4gICAgICAgICAqICEjemgg5oyJ6ZKu54q25oCB5pS55Y+Y5pe26L+H5rih5pa55byP44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QnV0dG9uLlRyYW5zaXRpb259IHRyYW5zaXRpb25cbiAgICAgICAgICogQGRlZmF1bHQgQnV0dG9uLlRyYW5zaXRpb24uTm9kZVxuICAgICAgICAgKi9cbiAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogVHJhbnNpdGlvbi5OT05FLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24udHJhbnNpdGlvbicsXG4gICAgICAgICAgICB0eXBlOiBUcmFuc2l0aW9uLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBub3RpZnkgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVHJhbnNpdGlvbihvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICd0cmFuc2l0aW9uJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIGNvbG9yIHRyYW5zaXRpb25cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBOb3JtYWwgc3RhdGUgY29sb3IuXG4gICAgICAgICAqICEjemgg5pmu6YCa54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qE6aKc6Imy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IG5vcm1hbENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxDb2xvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ05vcm1hbCcsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5ub3JtYWxfY29sb3InLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLkNvbG9yICYmIHRoaXMuX2dldEJ1dHRvblN0YXRlKCkgPT09IFN0YXRlLk5PUk1BTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRUYXJnZXQoKS5vcGFjaXR5ID0gdGhpcy5ub3JtYWxDb2xvci5hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFByZXNzZWQgc3RhdGUgY29sb3JcbiAgICAgICAgICogISN6aCDmjInkuIvnirbmgIHml7bmjInpkq7miYDmmL7npLrnmoTpopzoibLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gcHJlc3NlZENvbG9yXG4gICAgICAgICAqL1xuICAgICAgICBwcmVzc2VkQ29sb3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLmNvbG9yKDIxMSwgMjExLCAyMTEpLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmVzc2VkJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLnByZXNzZWRfY29sb3InLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLkNvbG9yICYmIHRoaXMuX2dldEJ1dHRvblN0YXRlKCkgPT09IFN0YXRlLlBSRVNTRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGFyZ2V0KCkub3BhY2l0eSA9IHRoaXMucHJlc3NlZENvbG9yLmE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdwcmVzc2VkQ29sb3InXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSG92ZXIgc3RhdGUgY29sb3JcbiAgICAgICAgICogISN6aCDmgqzlgZznirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoTpopzoibLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb2xvcn0gaG92ZXJDb2xvclxuICAgICAgICAgKi9cbiAgICAgICAgaG92ZXJDb2xvcjoge1xuICAgICAgICAgICAgZGVmYXVsdDogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hvdmVyJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLmhvdmVyX2NvbG9yJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5Db2xvciAmJiB0aGlzLl9nZXRCdXR0b25TdGF0ZSgpID09PSBTdGF0ZS5IT1ZFUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXRUYXJnZXQoKS5vcGFjaXR5ID0gdGhpcy5ob3ZlckNvbG9yLmE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdob3ZlckNvbG9yJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIERpc2FibGVkIHN0YXRlIGNvbG9yXG4gICAgICAgICAqICEjemgg56aB55So54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qE6aKc6Imy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGRpc2FibGVkQ29sb3JcbiAgICAgICAgICovXG4gICAgICAgIGRpc2FibGVkQ29sb3I6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGNjLmNvbG9yKDEyNCwgMTI0LCAxMjQpLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEaXNhYmxlZCcsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmJ1dHRvbi5kaXNhYmxlZF9jb2xvcicsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uQ29sb3IgJiYgdGhpcy5fZ2V0QnV0dG9uU3RhdGUoKSA9PT0gU3RhdGUuRElTQUJMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0VGFyZ2V0KCkub3BhY2l0eSA9IHRoaXMuZGlzYWJsZWRDb2xvci5hO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENvbG9yIGFuZCBTY2FsZSB0cmFuc2l0aW9uIGR1cmF0aW9uXG4gICAgICAgICAqICEjemgg6aKc6Imy6L+H5rih5ZKM57yp5pS+6L+H5rih5pe25omA6ZyA5pe26Ze0XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuMSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uZHVyYXRpb24nLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuICBXaGVuIHVzZXIgcHJlc3MgdGhlIGJ1dHRvbiwgdGhlIGJ1dHRvbiB3aWxsIHpvb20gdG8gYSBzY2FsZS5cbiAgICAgICAgICogVGhlIGZpbmFsIHNjYWxlIG9mIHRoZSBidXR0b24gIGVxdWFscyAoYnV0dG9uIG9yaWdpbmFsIHNjYWxlICogem9vbVNjYWxlKVxuICAgICAgICAgKiAhI3poIOW9k+eUqOaIt+eCueWHu+aMiemSruWQju+8jOaMiemSruS8mue8qeaUvuWIsOS4gOS4quWAvO+8jOi/meS4quWAvOetieS6jiBCdXR0b24g5Y6f5aeLIHNjYWxlICogem9vbVNjYWxlXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6b29tU2NhbGVcbiAgICAgICAgICovXG4gICAgICAgIHpvb21TY2FsZToge1xuICAgICAgICAgICAgZGVmYXVsdDogMS4yLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uem9vbV9zY2FsZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBzcHJpdGUgdHJhbnNpdGlvblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBOb3JtYWwgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5pmu6YCa54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gbm9ybWFsU3ByaXRlXG4gICAgICAgICAqL1xuICAgICAgICBub3JtYWxTcHJpdGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnTm9ybWFsJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLm5vcm1hbF9zcHJpdGUnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFByZXNzZWQgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5oyJ5LiL54q25oCB5pe25oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gcHJlc3NlZFNwcml0ZVxuICAgICAgICAgKi9cbiAgICAgICAgcHJlc3NlZFNwcml0ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmVzc2VkJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLnByZXNzZWRfc3ByaXRlJyxcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAncHJlc3NlZFNwcml0ZScsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSG92ZXIgc3RhdGUgc3ByaXRlXG4gICAgICAgICAqICEjemgg5oKs5YGc54q25oCB5LiL5oyJ6ZKu5omA5pi+56S655qEIFNwcml0ZSDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gaG92ZXJTcHJpdGVcbiAgICAgICAgICovXG4gICAgICAgIGhvdmVyU3ByaXRlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0hvdmVyJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuYnV0dG9uLmhvdmVyX3Nwcml0ZScsXG4gICAgICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogJ2hvdmVyU3ByaXRlJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBEaXNhYmxlZCBzdGF0ZSBzcHJpdGVcbiAgICAgICAgICogISN6aCDnpoHnlKjnirbmgIHkuIvmjInpkq7miYDmmL7npLrnmoQgU3ByaXRlIOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1Nwcml0ZUZyYW1lfSBkaXNhYmxlZFNwcml0ZVxuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZWRTcHJpdGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGlzYWJsZWQnLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uZGlzYWJsZWRfc3ByaXRlJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUcmFuc2l0aW9uIHRhcmdldC5cbiAgICAgICAgICogV2hlbiBCdXR0b24gc3RhdGUgY2hhbmdlZDpcbiAgICAgICAgICogIElmIFRyYW5zaXRpb24gdHlwZSBpcyBCdXR0b24uVHJhbnNpdGlvbi5OT05FLCBCdXR0b24gd2lsbCBkbyBub3RoaW5nXG4gICAgICAgICAqICBJZiBUcmFuc2l0aW9uIHR5cGUgaXMgQnV0dG9uLlRyYW5zaXRpb24uQ09MT1IsIEJ1dHRvbiB3aWxsIGNoYW5nZSB0YXJnZXQncyBjb2xvclxuICAgICAgICAgKiAgSWYgVHJhbnNpdGlvbiB0eXBlIGlzIEJ1dHRvbi5UcmFuc2l0aW9uLlNQUklURSwgQnV0dG9uIHdpbGwgY2hhbmdlIHRhcmdldCBTcHJpdGUncyBzcHJpdGVcbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDpnIDopoHov4fmuKHnmoTnm67moIfjgIJcbiAgICAgICAgICog5b2T5YmN5oyJ6ZKu54q25oCB5pS55Y+Y6KeE5YiZ77yaXG4gICAgICAgICAqIC3lpoLmnpwgVHJhbnNpdGlvbiB0eXBlIOmAieaLqSBCdXR0b24uVHJhbnNpdGlvbi5OT05F77yM5oyJ6ZKu5LiN5YGa5Lu75L2V6L+H5rih44CCXG4gICAgICAgICAqIC3lpoLmnpwgVHJhbnNpdGlvbiB0eXBlIOmAieaLqSBCdXR0b24uVHJhbnNpdGlvbi5DT0xPUu+8jOaMiemSruS8muWvueebruagh+minOiJsui/m+ihjOminOiJsuS5i+mXtOeahOi/h+a4oeOAglxuICAgICAgICAgKiAt5aaC5p6cIFRyYW5zaXRpb24gdHlwZSDpgInmi6kgQnV0dG9uLlRyYW5zaXRpb24uU3ByaXRl77yM5oyJ6ZKu5Lya5a+555uu5qCHIFNwcml0ZSDov5vooYwgU3ByaXRlIOS5i+mXtOeahOi/h+a4oeOAglxuICAgICAgICAgKiBAcHJvcGVydHkge05vZGV9IHRhcmdldFxuICAgICAgICAgKi9cbiAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiBcImkxOG46Q09NUE9ORU5ULmJ1dHRvbi50YXJnZXRcIixcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVRhcmdldCgpO1xuICAgICAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAmJiB0aGlzLnRhcmdldCAhPT0gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW5yZWdpc3RlclRhcmdldEV2ZW50KG9sZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSWYgQnV0dG9uIGlzIGNsaWNrZWQsIGl0IHdpbGwgdHJpZ2dlciBldmVudCdzIGhhbmRsZXJcbiAgICAgICAgICogISN6aCDmjInpkq7nmoTngrnlh7vkuovku7bliJfooajjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtDb21wb25lbnQuRXZlbnRIYW5kbGVyW119IGNsaWNrRXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBjbGlja0V2ZW50czoge1xuICAgICAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5idXR0b24uY2xpY2tfZXZlbnRzJyxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIFRyYW5zaXRpb246IFRyYW5zaXRpb24sXG4gICAgfSxcblxuICAgIF9fcHJlbG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX2FwcGx5VGFyZ2V0KCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0U3RhdGUoKTtcbiAgICB9LFxuXG4gICAgX3Jlc2V0U3RhdGUgKCkge1xuICAgICAgICB0aGlzLl9wcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gLy8gUmVzdG9yZSBidXR0b24gc3RhdHVzXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgbGV0IHRyYW5zaXRpb24gPSB0aGlzLnRyYW5zaXRpb247XG4gICAgICAgIGxldCBvcmlnaW5hbFNjYWxlID0gdGhpcy5fb3JpZ2luYWxTY2FsZTtcblxuICAgICAgICBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUiAmJiB0aGlzLmludGVyYWN0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0VGFyZ2V0Q29sb3IodGhpcy5ub3JtYWxDb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TQ0FMRSAmJiBvcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICB0YXJnZXQuc2V0U2NhbGUob3JpZ2luYWxTY2FsZS54LCBvcmlnaW5hbFNjYWxlLnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IHRydWU7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgLy8gY2hlY2sgc3ByaXRlIGZyYW1lc1xuICAgICAgICBpZiAodGhpcy5ub3JtYWxTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsU3ByaXRlLmVuc3VyZUxvYWRUZXh0dXJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaG92ZXJTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuaG92ZXJTcHJpdGUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmVzc2VkU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXNzZWRTcHJpdGUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNwcml0ZSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNwcml0ZS5lbnN1cmVMb2FkVGV4dHVyZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyTm9kZUV2ZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLl9yZXNldFN0YXRlKCk7XG5cbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3VucmVnaXN0ZXJOb2RlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0VGFyZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ID8gdGhpcy50YXJnZXQgOiB0aGlzLm5vZGU7XG4gICAgfSxcblxuICAgIF9vblRhcmdldFNwcml0ZUZyYW1lQ2hhbmdlZCAoY29tcCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNQUklURSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0Q3VycmVudFN0YXRlU3ByaXRlKGNvbXAuc3ByaXRlRnJhbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblRhcmdldENvbG9yQ2hhbmdlZCAoY29sb3IpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5DT0xPUikge1xuICAgICAgICAgICAgdGhpcy5fc2V0Q3VycmVudFN0YXRlQ29sb3IoY29sb3IpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblRhcmdldFNjYWxlQ2hhbmdlZCAoKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgLy8gdXBkYXRlIF9vcmlnaW5hbFNjYWxlIGlmIHRhcmdldCBzY2FsZSBjaGFuZ2VkXG4gICAgICAgIGlmICh0aGlzLl9vcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFuc2l0aW9uICE9PSBUcmFuc2l0aW9uLlNDQUxFIHx8IHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsU2NhbGUueCA9IHRhcmdldC5zY2FsZVg7XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTY2FsZS55ID0gdGFyZ2V0LnNjYWxlWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc2V0VGFyZ2V0Q29sb3IgKGNvbG9yKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgbGV0IGNsb25lQ29sb3IgPSBjb2xvci5jbG9uZSgpO1xuICAgICAgICB0YXJnZXQub3BhY2l0eSA9IGNsb25lQ29sb3IuYTtcbiAgICAgICAgY2xvbmVDb2xvci5hID0gMjU1OyAgLy8gZG9uJ3Qgc2V0IG5vZGUgb3BhY2l0eSB2aWEgbm9kZS5jb2xvci5hXG4gICAgICAgIHRhcmdldC5jb2xvciA9IGNsb25lQ29sb3I7XG4gICAgfSxcblxuICAgIF9nZXRTdGF0ZUNvbG9yIChzdGF0ZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLk5PUk1BTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxDb2xvcjtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuSE9WRVI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaG92ZXJDb2xvcjtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuUFJFU1NFRDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcmVzc2VkQ29sb3I7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLkRJU0FCTEVEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkQ29sb3I7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldFN0YXRlU3ByaXRlIChzdGF0ZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLk5PUk1BTDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxTcHJpdGU7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLkhPVkVSOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhvdmVyU3ByaXRlO1xuICAgICAgICAgICAgY2FzZSBTdGF0ZS5QUkVTU0VEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXNzZWRTcHJpdGU7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLkRJU0FCTEVEOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkU3ByaXRlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXRDdXJyZW50U3RhdGVDb2xvciAoY29sb3IpIHtcbiAgICAgICAgc3dpdGNoICggdGhpcy5fZ2V0QnV0dG9uU3RhdGUoKSApIHtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuTk9STUFMOlxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuSE9WRVI6XG4gICAgICAgICAgICAgICAgdGhpcy5ob3ZlckNvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLlBSRVNTRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVzc2VkQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuRElTQUJMRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3NldEN1cnJlbnRTdGF0ZVNwcml0ZSAoc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgc3dpdGNoICggdGhpcy5fZ2V0QnV0dG9uU3RhdGUoKSApIHtcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuTk9STUFMOlxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsU3ByaXRlID0gc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN0YXRlLkhPVkVSOlxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJTcHJpdGUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuUFJFU1NFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnByZXNzZWRTcHJpdGUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3RhdGUuRElTQUJMRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNwcml0ZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gIT09IFRyYW5zaXRpb24uQ09MT1IgJiYgdGhpcy50cmFuc2l0aW9uICE9PSBUcmFuc2l0aW9uLlNDQUxFKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy50aW1lICs9IGR0O1xuICAgICAgICBsZXQgcmF0aW8gPSAxLjA7XG4gICAgICAgIGlmICh0aGlzLmR1cmF0aW9uID4gMCkge1xuICAgICAgICAgICAgcmF0aW8gPSB0aGlzLnRpbWUgLyB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xhbXAgcmF0aW9cbiAgICAgICAgaWYgKHJhdGlvID49IDEpIHtcbiAgICAgICAgICAgIHJhdGlvID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uQ09MT1IpIHtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2Zyb21Db2xvci5sZXJwKHRoaXMuX3RvQ29sb3IsIHJhdGlvKTtcbiAgICAgICAgICAgIHRoaXMuX3NldFRhcmdldENvbG9yKGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIGlmIF9vcmlnaW5hbFNjYWxlIGlzIGludmFsaWRcbiAgICAgICAgZWxzZSBpZiAodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNDQUxFICYmIHRoaXMuX29yaWdpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgIHRhcmdldC5zY2FsZSA9IHRoaXMuX2Zyb21TY2FsZS5sZXJwKHRoaXMuX3RvU2NhbGUsIHJhdGlvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyYXRpbyA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIF9yZWdpc3Rlck5vZGVFdmVudCAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMuX29uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaENhbmNlbCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLl9vbk1vdXNlTW92ZUluLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLl9vbk1vdXNlTW92ZU91dCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF91bnJlZ2lzdGVyTm9kZUV2ZW50ICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5fb25Ub3VjaENhbmNlbCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5fb25Nb3VzZU1vdmVJbiwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMuX29uTW91c2VNb3ZlT3V0LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3JlZ2lzdGVyVGFyZ2V0RXZlbnQgKHRhcmdldCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0YXJnZXQub24oJ3Nwcml0ZWZyYW1lLWNoYW5nZWQnLCB0aGlzLl9vblRhcmdldFNwcml0ZUZyYW1lQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICB0YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgdGhpcy5fb25UYXJnZXRDb2xvckNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VELCB0aGlzLl9vblRhcmdldFNjYWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF91bnJlZ2lzdGVyVGFyZ2V0RXZlbnQgKHRhcmdldCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0YXJnZXQub2ZmKCdzcHJpdGVmcmFtZS1jaGFuZ2VkJywgdGhpcy5fb25UYXJnZXRTcHJpdGVGcmFtZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGFyZ2V0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCB0aGlzLl9vblRhcmdldENvbG9yQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0Lm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VELCB0aGlzLl9vblRhcmdldFNjYWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9nZXRUYXJnZXRTcHJpdGUgKHRhcmdldCkge1xuICAgICAgICBsZXQgc3ByaXRlID0gbnVsbDtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgc3ByaXRlID0gdGFyZ2V0LmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcHJpdGU7XG4gICAgfSxcblxuICAgIF9hcHBseVRhcmdldCAoKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgdGhpcy5fc3ByaXRlID0gdGhpcy5fZ2V0VGFyZ2V0U3ByaXRlKHRhcmdldCk7XG4gICAgICAgIGlmICghdGhpcy5fb3JpZ2luYWxTY2FsZSkge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTY2FsZSA9IGNjLlZlYzIuWkVSTztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcmlnaW5hbFNjYWxlLnggPSB0YXJnZXQuc2NhbGVYO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFNjYWxlLnkgPSB0YXJnZXQuc2NhbGVZO1xuXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyVGFyZ2V0RXZlbnQodGFyZ2V0KTtcbiAgICB9LFxuXG4gICAgLy8gdG91Y2ggZXZlbnQgaGFuZGxlclxuICAgIF9vblRvdWNoQmVnYW4gKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGFibGUgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fcHJlc3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0sXG5cbiAgICBfb25Ub3VjaE1vdmUgKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRlcmFjdGFibGUgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5IHx8ICF0aGlzLl9wcmVzc2VkKSByZXR1cm47XG4gICAgICAgIC8vIG1vYmlsZSBwaG9uZSB3aWxsIG5vdCBlbWl0IF9vbk1vdXNlTW92ZU91dCxcbiAgICAgICAgLy8gc28gd2UgaGF2ZSB0byBkbyBoaXQgdGVzdCB3aGVuIHRvdWNoIG1vdmluZ1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaDtcbiAgICAgICAgbGV0IGhpdCA9IHRoaXMubm9kZS5faGl0VGVzdCh0b3VjaC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuX2dldFRhcmdldCgpO1xuICAgICAgICBsZXQgb3JpZ2luYWxTY2FsZSA9IHRoaXMuX29yaWdpbmFsU2NhbGU7XG5cbiAgICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TQ0FMRSAmJiBvcmlnaW5hbFNjYWxlKSB7XG4gICAgICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbVNjYWxlLnggPSBvcmlnaW5hbFNjYWxlLng7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJvbVNjYWxlLnkgPSBvcmlnaW5hbFNjYWxlLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9TY2FsZS54ID0gb3JpZ2luYWxTY2FsZS54ICogdGhpcy56b29tU2NhbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9TY2FsZS55ID0gb3JpZ2luYWxTY2FsZS55ICogdGhpcy56b29tU2NhbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0U2NhbGUob3JpZ2luYWxTY2FsZS54LCBvcmlnaW5hbFNjYWxlLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHN0YXRlO1xuICAgICAgICAgICAgaWYgKGhpdCkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gU3RhdGUuUFJFU1NFRDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBTdGF0ZS5OT1JNQUw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseVRyYW5zaXRpb24oc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0sXG5cbiAgICBfb25Ub3VjaEVuZGVkIChldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaW50ZXJhY3RhYmxlIHx8ICF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl9wcmVzc2VkKSB7XG4gICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHModGhpcy5jbGlja0V2ZW50cywgZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ2NsaWNrJywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9LFxuXG4gICAgX29uVG91Y2hDYW5jZWwgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW50ZXJhY3RhYmxlIHx8ICF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3ByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgX29uTW91c2VNb3ZlSW4gKCkge1xuICAgICAgICBpZiAodGhpcy5fcHJlc3NlZCB8fCAhdGhpcy5pbnRlcmFjdGFibGUgfHwgIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uU1BSSVRFICYmICF0aGlzLmhvdmVyU3ByaXRlKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCF0aGlzLl9ob3ZlcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uTW91c2VNb3ZlT3V0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hvdmVyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gc3RhdGUgaGFuZGxlclxuICAgIF91cGRhdGVTdGF0ZSAoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX2dldEJ1dHRvblN0YXRlKCk7XG4gICAgICAgIHRoaXMuX2FwcGx5VHJhbnNpdGlvbihzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURpc2FibGVkU3RhdGUoKTtcbiAgICB9LFxuXG4gICAgX2dldEJ1dHRvblN0YXRlICgpIHtcbiAgICAgICAgbGV0IHN0YXRlO1xuICAgICAgICBpZiAoIXRoaXMuaW50ZXJhY3RhYmxlKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFN0YXRlLkRJU0FCTEVEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3ByZXNzZWQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU3RhdGUuUFJFU1NFRDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9ob3ZlcmVkKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFN0YXRlLkhPVkVSO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBTdGF0ZS5OT1JNQUw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlQ29sb3JUcmFuc2l0aW9uSW1tZWRpYXRlbHkgKHN0YXRlKSB7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2dldFN0YXRlQ29sb3Ioc3RhdGUpO1xuICAgICAgICB0aGlzLl9zZXRUYXJnZXRDb2xvcihjb2xvcik7XG4gICAgICAgIHRoaXMuX2Zyb21Db2xvciA9IGNvbG9yLmNsb25lKCk7XG4gICAgICAgIHRoaXMuX3RvQ29sb3IgPSBjb2xvcjtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCBzdGF0ZSA9PT0gU3RhdGUuRElTQUJMRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbkltbWVkaWF0ZWx5KHN0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2dldFN0YXRlQ29sb3Ioc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5fZnJvbUNvbG9yID0gdGFyZ2V0LmNvbG9yLmNsb25lKCk7XG4gICAgICAgICAgICB0aGlzLl90b0NvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVNwcml0ZVRyYW5zaXRpb24gKHN0YXRlKSB7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9nZXRTdGF0ZVNwcml0ZShzdGF0ZSk7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGUgJiYgc3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVNjYWxlVHJhbnNpdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSBTdGF0ZS5QUkVTU0VEKSB7XG4gICAgICAgICAgICB0aGlzLl96b29tVXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3pvb21CYWNrKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3pvb21VcCAoKSB7XG4gICAgICAgIC8vIHNraXAgYmVmb3JlIF9fcHJlbG9hZCgpXG4gICAgICAgIGlmICghdGhpcy5fb3JpZ2luYWxTY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJvbVNjYWxlLnggPSB0aGlzLl9vcmlnaW5hbFNjYWxlLng7XG4gICAgICAgIHRoaXMuX2Zyb21TY2FsZS55ID0gdGhpcy5fb3JpZ2luYWxTY2FsZS55O1xuICAgICAgICB0aGlzLl90b1NjYWxlLnggPSB0aGlzLl9vcmlnaW5hbFNjYWxlLnggKiB0aGlzLnpvb21TY2FsZTtcbiAgICAgICAgdGhpcy5fdG9TY2FsZS55ID0gdGhpcy5fb3JpZ2luYWxTY2FsZS55ICogdGhpcy56b29tU2NhbGU7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25GaW5pc2hlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfem9vbUJhY2sgKCkge1xuICAgICAgICAvLyBza2lwIGJlZm9yZSBfX3ByZWxvYWQoKVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsU2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcbiAgICAgICAgdGhpcy5fZnJvbVNjYWxlLnggPSB0YXJnZXQuc2NhbGVYO1xuICAgICAgICB0aGlzLl9mcm9tU2NhbGUueSA9IHRhcmdldC5zY2FsZVk7XG4gICAgICAgIHRoaXMuX3RvU2NhbGUueCA9IHRoaXMuX29yaWdpbmFsU2NhbGUueDtcbiAgICAgICAgdGhpcy5fdG9TY2FsZS55ID0gdGhpcy5fb3JpZ2luYWxTY2FsZS55O1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB0aGlzLl90cmFuc2l0aW9uRmluaXNoZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZVRyYW5zaXRpb24gKG9sZFRyYW5zaXRpb24pIHtcbiAgICAgICAgLy8gUmVzZXQgdG8gbm9ybWFsIGRhdGEgd2hlbiBjaGFuZ2UgdHJhbnNpdGlvbi5cbiAgICAgICAgaWYgKG9sZFRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uQ09MT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbkltbWVkaWF0ZWx5KFN0YXRlLk5PUk1BTCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2xkVHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TUFJJVEUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNwcml0ZVRyYW5zaXRpb24oU3RhdGUuTk9STUFMKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVTdGF0ZSgpO1xuICAgIH0sXG5cbiAgICBfYXBwbHlUcmFuc2l0aW9uIChzdGF0ZSkge1xuICAgICAgICBsZXQgdHJhbnNpdGlvbiA9IHRoaXMudHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKHRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uQ09MT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbG9yVHJhbnNpdGlvbihzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvbiA9PT0gVHJhbnNpdGlvbi5TUFJJVEUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNwcml0ZVRyYW5zaXRpb24oc3RhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zaXRpb24gPT09IFRyYW5zaXRpb24uU0NBTEUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjYWxlVHJhbnNpdGlvbihzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Jlc2l6ZU5vZGVUb1RhcmdldE5vZGU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZSh0aGlzLl9nZXRUYXJnZXQoKS5nZXRDb250ZW50U2l6ZSgpKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZURpc2FibGVkU3RhdGUgKGZvcmNlKSB7XG4gICAgICAgIGlmICghdGhpcy5fc3ByaXRlKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlQXV0b0dyYXlFZmZlY3QgfHwgZm9yY2UpIHtcbiAgICAgICAgICAgIGxldCB1c2VHcmF5TWF0ZXJpYWwgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKCEodGhpcy50cmFuc2l0aW9uID09PSBUcmFuc2l0aW9uLlNQUklURSAmJiB0aGlzLmRpc2FibGVkU3ByaXRlKSkge1xuICAgICAgICAgICAgICAgIHVzZUdyYXlNYXRlcmlhbCA9IHRoaXMuZW5hYmxlQXV0b0dyYXlFZmZlY3QgJiYgIXRoaXMuaW50ZXJhY3RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3dpdGNoR3JheU1hdGVyaWFsKHVzZUdyYXlNYXRlcmlhbCwgdGhpcy5fc3ByaXRlKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5CdXR0b24gPSBtb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBjbGlja1xuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7QnV0dG9ufSBidXR0b24gLSBUaGUgQnV0dG9uIGNvbXBvbmVudC5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=