
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCMacro.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * Predefined constants
 * @class macro
 * @static
 */
cc.macro = {
  /**
   * PI / 180
   * @property RAD
   * @type {Number}
   */
  RAD: Math.PI / 180,

  /**
   * One degree
   * @property DEG
   * @type {Number}
   */
  DEG: 180 / Math.PI,

  /**
   * @property REPEAT_FOREVER
   * @type {Number}
   */
  REPEAT_FOREVER: Number.MAX_VALUE - 1,

  /**
   * @property FLT_EPSILON
   * @type {Number}
   */
  FLT_EPSILON: 0.0000001192092896,

  /**
   * Minimum z index value for node
   * @property MIN_ZINDEX
   * @type {Number}
   */
  MIN_ZINDEX: -Math.pow(2, 15),

  /**
   * Maximum z index value for node
   * @property MAX_ZINDEX
   * @type {Number}
   */
  MAX_ZINDEX: Math.pow(2, 15) - 1,
  //some gl constant variable

  /**
   * @property ONE
   * @type {Number}
   */
  ONE: 1,

  /**
   * @property ZERO
   * @type {Number}
   */
  ZERO: 0,

  /**
   * @property SRC_ALPHA
   * @type {Number}
   */
  SRC_ALPHA: 0x0302,

  /**
   * @property SRC_ALPHA_SATURATE
   * @type {Number}
   */
  SRC_ALPHA_SATURATE: 0x308,

  /**
   * @property SRC_COLOR
   * @type {Number}
   */
  SRC_COLOR: 0x300,

  /**
   * @property DST_ALPHA
   * @type {Number}
   */
  DST_ALPHA: 0x304,

  /**
   * @property DST_COLOR
   * @type {Number}
   */
  DST_COLOR: 0x306,

  /**
   * @property ONE_MINUS_SRC_ALPHA
   * @type {Number}
   */
  ONE_MINUS_SRC_ALPHA: 0x0303,

  /**
   * @property ONE_MINUS_SRC_COLOR
   * @type {Number}
   */
  ONE_MINUS_SRC_COLOR: 0x301,

  /**
   * @property ONE_MINUS_DST_ALPHA
   * @type {Number}
   */
  ONE_MINUS_DST_ALPHA: 0x305,

  /**
   * @property ONE_MINUS_DST_COLOR
   * @type {Number}
   */
  ONE_MINUS_DST_COLOR: 0x0307,

  /**
   * @property ONE_MINUS_CONSTANT_ALPHA
   * @type {Number}
   */
  ONE_MINUS_CONSTANT_ALPHA: 0x8004,

  /**
   * @property ONE_MINUS_CONSTANT_COLOR
   * @type {Number}
   */
  ONE_MINUS_CONSTANT_COLOR: 0x8002,
  //Possible device orientations

  /**
   * Oriented vertically
   * @property ORIENTATION_PORTRAIT
   * @type {Number}
   */
  ORIENTATION_PORTRAIT: 1,

  /**
   * Oriented horizontally
   * @property ORIENTATION_LANDSCAPE
   * @type {Number}
   */
  ORIENTATION_LANDSCAPE: 2,

  /**
   * Oriented automatically
   * @property ORIENTATION_AUTO
   * @type {Number}
   */
  ORIENTATION_AUTO: 3,
  DENSITYDPI_DEVICE: 'device-dpi',
  DENSITYDPI_HIGH: 'high-dpi',
  DENSITYDPI_MEDIUM: 'medium-dpi',
  DENSITYDPI_LOW: 'low-dpi',
  // General configurations

  /**
   * <p>
   *   If enabled, the texture coordinates will be calculated by using this formula: <br/>
   *      - texCoord.left = (rect.x*2+1) / (texture.wide*2);                  <br/>
   *      - texCoord.right = texCoord.left + (rect.width*2-2)/(texture.wide*2); <br/>
   *                                                                                 <br/>
   *  The same for bottom and top.                                                   <br/>
   *                                                                                 <br/>
   *  This formula prevents artifacts by using 99% of the texture.                   <br/>
   *  The "correct" way to prevent artifacts is by expand the texture's border with the same color by 1 pixel<br/>
   *                                                                                  <br/>
   *  Affected component:                                                                 <br/>
   *      - cc.TMXLayer                                                       <br/>
   *                                                                                  <br/>
   *  Enabled by default. To disabled set it to 0. <br/>
   *  To modify it, in Web engine please refer to CCMacro.js, in JSB please refer to CCConfig.h
   * </p>
   *
   * @property {Number} FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX
   */
  FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: true,

  /**
   * Position of the FPS (Default: 0,0 (bottom-left corner))<br/>
   * To modify it, in Web engine please refer to CCMacro.js, in JSB please refer to CCConfig.h
   * @property {Vec2} DIRECTOR_STATS_POSITION
   */
  DIRECTOR_STATS_POSITION: cc.v2(0, 0),

  /**
   * <p>
   *    If enabled, actions that alter the position property (eg: CCMoveBy, CCJumpBy, CCBezierBy, etc..) will be stacked.                  <br/>
   *    If you run 2 or more 'position' actions at the same time on a node, then end position will be the sum of all the positions.        <br/>
   *    If disabled, only the last run action will take effect.
   * </p>
   * @property {Number} ENABLE_STACKABLE_ACTIONS
   */
  ENABLE_STACKABLE_ACTIONS: true,

  /**
   * !#en 
   * The timeout to determine whether a touch is no longer active and should be removed.
   * The reason to add this timeout is due to an issue in X5 browser core, 
   * when X5 is presented in wechat on Android, if a touch is glissed from the bottom up, and leave the page area,
   * no touch cancel event is triggered, and the touch will be considered active forever. 
   * After multiple times of this action, our maximum touches number will be reached and all new touches will be ignored.
   * So this new mechanism can remove the touch that should be inactive if it's not updated during the last 5000 milliseconds.
   * Though it might remove a real touch if it's just not moving for the last 5 seconds which is not easy with the sensibility of mobile touch screen.
   * You can modify this value to have a better behavior if you find it's not enough.
   * !#zh
   * 用于甄别一个触点对象是否已经失效并且可以被移除的延时时长
   * 添加这个时长的原因是 X5 内核在微信浏览器中出现的一个 bug。
   * 在这个环境下，如果用户将一个触点从底向上移出页面区域，将不会触发任何 touch cancel 或 touch end 事件，而这个触点会被永远当作停留在页面上的有效触点。
   * 重复这样操作几次之后，屏幕上的触点数量将达到我们的事件系统所支持的最高触点数量，之后所有的触摸事件都将被忽略。
   * 所以这个新的机制可以在触点在一定时间内没有任何更新的情况下视为失效触点并从事件系统中移除。
   * 当然，这也可能移除一个真实的触点，如果用户的触点真的在一定时间段内完全没有移动（这在当前手机屏幕的灵敏度下会很难）。
   * 你可以修改这个值来获得你需要的效果，默认值是 5000 毫秒。
   * @property {Number} TOUCH_TIMEOUT
   */
  TOUCH_TIMEOUT: 5000,

  /**
   * !#en 
   * The maximum vertex count for a single batched draw call.
   * !#zh
   * 最大可以被单次批处理渲染的顶点数量。
   * @property {Number} BATCH_VERTEX_COUNT
   */
  BATCH_VERTEX_COUNT: 20000,

  /**
   * !#en 
   * Whether or not enabled tiled map auto culling. If you set the TiledMap skew or rotation, then need to manually disable this, otherwise, the rendering will be wrong.
   * !#zh
   * 是否开启瓦片地图的自动裁减功能。瓦片地图如果设置了 skew, rotation 或者采用了摄像机的话，需要手动关闭，否则渲染会出错。
   * @property {Boolean} ENABLE_TILEDMAP_CULLING
   * @default true
   */
  ENABLE_TILEDMAP_CULLING: true,

  /**
   * !#en 
   * Boolean that indicates if the canvas contains an alpha channel, default sets to false for better performance.
   * Though if you want to make your canvas background transparent and show other dom elements at the background, 
   * you can set it to true before `cc.game.run`.
   * Web only.
   * !#zh
   * 用于设置 Canvas 背景是否支持 alpha 通道，默认为 false，这样可以有更高的性能表现。
   * 如果你希望 Canvas 背景是透明的，并显示背后的其他 DOM 元素，你可以在 `cc.game.run` 之前将这个值设为 true。
   * 仅支持 Web
   * @property {Boolean} ENABLE_TRANSPARENT_CANVAS
   * @default false
   */
  ENABLE_TRANSPARENT_CANVAS: false,

  /**
   * !#en
   * Boolean that indicates if the WebGL context is created with `antialias` option turned on, default value is false.
   * Set it to true could make your game graphics slightly smoother, like texture hard edges when rotated.
   * Whether to use this really depend on your game design and targeted platform, 
   * device with retina display usually have good detail on graphics with or without this option, 
   * you probably don't want antialias if your game style is pixel art based.
   * Also, it could have great performance impact with some browser / device using software MSAA.
   * You can set it to true before `cc.game.run`.
   * Web only.
   * !#zh
   * 用于设置在创建 WebGL Context 时是否开启抗锯齿选项，默认值是 false。
   * 将这个选项设置为 true 会让你的游戏画面稍稍平滑一些，比如旋转硬边贴图时的锯齿。是否开启这个选项很大程度上取决于你的游戏和面向的平台。
   * 在大多数拥有 retina 级别屏幕的设备上用户往往无法区分这个选项带来的变化；如果你的游戏选择像素艺术风格，你也多半不会想开启这个选项。
   * 同时，在少部分使用软件级别抗锯齿算法的设备或浏览器上，这个选项会对性能产生比较大的影响。
   * 你可以在 `cc.game.run` 之前设置这个值，否则它不会生效。
   * 仅支持 Web
   * @property {Boolean} ENABLE_WEBGL_ANTIALIAS
   * @default false
   */
  ENABLE_WEBGL_ANTIALIAS: false,

  /**
   * !#en
   * Whether or not enable auto culling.
   * This feature have been removed in v2.0 new renderer due to overall performance consumption.
   * We have no plan currently to re-enable auto culling.
   * If your game have more dynamic objects, we suggest to disable auto culling.
   * If your game have more static objects, we suggest to enable auto culling.
   * !#zh
   * 是否开启自动裁减功能，开启裁减功能将会把在屏幕外的物体从渲染队列中去除掉。
   * 这个功能在 v2.0 的新渲染器中被移除了，因为它在大多数游戏中所带来的损耗要高于性能的提升，目前我们没有计划重新支持自动裁剪。
   * 如果游戏中的动态物体比较多的话，建议将此选项关闭。
   * 如果游戏中的静态物体比较多的话，建议将此选项打开。
   * @property {Boolean} ENABLE_CULLING
   * @deprecated since v2.0
   * @default false
   */
  ENABLE_CULLING: false,

  /**
   * !#en
   * Whether to clear the original image cache after uploaded a texture to GPU. If cleared, [Dynamic Atlas](https://docs.cocos.com/creator/manual/en/advanced-topics/dynamic-atlas.html) will not be supported.
   * Normally you don't need to enable this option on the web platform, because Image object doesn't consume too much memory.
   * But on WeChat Game platform, the current version cache decoded data in Image object, which has high memory usage.
   * So we enabled this option by default on WeChat, so that we can release Image cache immediately after uploaded to GPU.
   * !#zh
   * 是否在将贴图上传至 GPU 之后删除原始图片缓存，删除之后图片将无法进行 [动态合图](https://docs.cocos.com/creator/manual/zh/advanced-topics/dynamic-atlas.html)。
   * 在 Web 平台，你通常不需要开启这个选项，因为在 Web 平台 Image 对象所占用的内存很小。
   * 但是在微信小游戏平台的当前版本，Image 对象会缓存解码后的图片数据，它所占用的内存空间很大。
   * 所以我们在微信平台默认开启了这个选项，这样我们就可以在上传 GL 贴图之后立即释放 Image 对象的内存，避免过高的内存占用。
   * @property {Boolean} CLEANUP_IMAGE_CACHE
   * @default false
   */
  CLEANUP_IMAGE_CACHE: false,

  /**
   * !#en
   * Whether or not show mesh wire frame.
   * !#zh
   * 是否显示网格的线框。
   * @property {Boolean} SHOW_MESH_WIREFRAME
   * @default false
   */
  SHOW_MESH_WIREFRAME: false,

  /**
   * !#en
   * Whether or not show mesh normal.
   * !#zh
   * 是否显示网格的法线。
   * @property {Boolean} SHOW_MESH_NORMAL
   * @default false
   */
  SHOW_MESH_NORMAL: false,

  /**
   * !#en
   * Whether to enable multi-touch.
   * !#zh
   * 是否开启多点触摸
   * @property {Boolean} ENABLE_MULTI_TOUCH
   * @default true
   */
  ENABLE_MULTI_TOUCH: true,

  /**
   * References: 
   * https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
   * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
   * 
   * !#en
   * Whether to use image bitmap first. If enabled, memory usage will increase.
   * 
   * !#zh
   * 是否优先使用 image bitmap，启用之后，内存占用会变高
   * 
   * @property {Boolean} ALLOW_IMAGE_BITMAP
   * @default true
   */
  ALLOW_IMAGE_BITMAP: !cc.sys.isMobile,

  /**
   * !#en
   * Whether to use native TTF renderer which is faster but layout slightly different.
   * 
   * !#zh
   * 是否使用原生的文本渲染机制, 布局和编辑器有差异.
   * 
   * @property {Boolean} ENABLE_NATIVE_TTF_RENDERER
   * @default true
   */
  ENABLE_NATIVE_TTF_RENDERER: true
};
Object.defineProperty(cc.macro, 'ROTATE_ACTION_CCW', {
  set: function set(value) {
    if (cc.RotateTo && cc.RotateBy) {
      cc.RotateTo._reverse = cc.RotateBy._reverse = value;
    }
  }
});
var SUPPORT_TEXTURE_FORMATS = ['.pkm', '.pvr', '.webp', '.jpg', '.jpeg', '.bmp', '.png'];
/**
 * !#en
 * The image format supported by the engine defaults, and the supported formats may differ in different build platforms and device types.
 * Currently all platform and device support ['.webp', '.jpg', '.jpeg', '.bmp', '.png'], The iOS mobile platform also supports the PVR format。
 * !#zh
 * 引擎默认支持的图片格式，支持的格式可能在不同的构建平台和设备类型上有所差别。
 * 目前所有平台和设备支持的格式有 ['.webp', '.jpg', '.jpeg', '.bmp', '.png']. 另外 Ios 手机平台还额外支持了 PVR 格式。
 * @property {String[]} SUPPORT_TEXTURE_FORMATS
 */

cc.macro.SUPPORT_TEXTURE_FORMATS = SUPPORT_TEXTURE_FORMATS;
/**
 * !#en Key map for keyboard event
 * !#zh 键盘事件的按键值
 * @enum macro.KEY
 * @example {@link cocos2d/core/platform/CCCommon/KEY.js}
 */

cc.macro.KEY = {
  /**
   * !#en None
   * !#zh 没有分配
   * @property none
   * @type {Number}
   * @readonly
   */
  none: 0,
  // android

  /**
   * !#en The back key
   * !#zh 返回键
   * @property back
   * @type {Number}
   * @readonly
   */
  back: 6,

  /**
   * !#en The menu key
   * !#zh 菜单键
   * @property menu
   * @type {Number}
   * @readonly
   */
  menu: 18,

  /**
   * !#en The backspace key
   * !#zh 退格键
   * @property backspace
   * @type {Number}
   * @readonly
   */
  backspace: 8,

  /**
   * !#en The tab key
   * !#zh Tab 键
   * @property tab
   * @type {Number}
   * @readonly
   */
  tab: 9,

  /**
   * !#en The enter key
   * !#zh 回车键
   * @property enter
   * @type {Number}
   * @readonly
   */
  enter: 13,

  /**
   * !#en The shift key
   * !#zh Shift 键
   * @property shift
   * @type {Number}
   * @readonly
   */
  shift: 16,
  //should use shiftkey instead

  /**
   * !#en The ctrl key
   * !#zh Ctrl 键
   * @property ctrl
   * @type {Number}
   * @readonly
   */
  ctrl: 17,
  //should use ctrlkey

  /**
   * !#en The alt key
   * !#zh Alt 键
   * @property alt
   * @type {Number}
   * @readonly
   */
  alt: 18,
  //should use altkey

  /**
   * !#en The pause key
   * !#zh 暂停键
   * @property pause
   * @type {Number}
   * @readonly
   */
  pause: 19,

  /**
   * !#en The caps lock key
   * !#zh 大写锁定键
   * @property capslock
   * @type {Number}
   * @readonly
   */
  capslock: 20,

  /**
   * !#en The esc key
   * !#zh ESC 键
   * @property escape
   * @type {Number}
   * @readonly
   */
  escape: 27,

  /**
   * !#en The space key
   * !#zh 空格键
   * @property space
   * @type {Number}
   * @readonly
   */
  space: 32,

  /**
   * !#en The page up key
   * !#zh 向上翻页键
   * @property pageup
   * @type {Number}
   * @readonly
   */
  pageup: 33,

  /**
   * !#en The page down key
   * !#zh 向下翻页键
   * @property pagedown
   * @type {Number}
   * @readonly
   */
  pagedown: 34,

  /**
   * !#en The end key
   * !#zh 结束键
   * @property end
   * @type {Number}
   * @readonly
   */
  end: 35,

  /**
   * !#en The home key
   * !#zh 主菜单键
   * @property home
   * @type {Number}
   * @readonly
   */
  home: 36,

  /**
   * !#en The left key
   * !#zh 向左箭头键
   * @property left
   * @type {Number}
   * @readonly
   */
  left: 37,

  /**
   * !#en The up key
   * !#zh 向上箭头键
   * @property up
   * @type {Number}
   * @readonly
   */
  up: 38,

  /**
   * !#en The right key
   * !#zh 向右箭头键
   * @property right
   * @type {Number}
   * @readonly
   */
  right: 39,

  /**
   * !#en The down key
   * !#zh 向下箭头键
   * @property down
   * @type {Number}
   * @readonly
   */
  down: 40,

  /**
   * !#en The select key
   * !#zh Select 键
   * @property select
   * @type {Number}
   * @readonly
   */
  select: 41,

  /**
   * !#en The insert key
   * !#zh 插入键
   * @property insert
   * @type {Number}
   * @readonly
   */
  insert: 45,

  /**
   * !#en The Delete key
   * !#zh 删除键
   * @property Delete
   * @type {Number}
   * @readonly
   */
  Delete: 46,

  /**
   * !#en The '0' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 0 键
   * @property 0
   * @type {Number}
   * @readonly
   */
  0: 48,

  /**
   * !#en The '1' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 1 键
   * @property 1
   * @type {Number}
   * @readonly
   */
  1: 49,

  /**
   * !#en The '2' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 2 键
   * @property 2
   * @type {Number}
   * @readonly
   */
  2: 50,

  /**
   * !#en The '3' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 3 键
   * @property 3
   * @type {Number}
   * @readonly
   */
  3: 51,

  /**
   * !#en The '4' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 4 键
   * @property 4
   * @type {Number}
   * @readonly
   */
  4: 52,

  /**
   * !#en The '5' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 5 键
   * @property 5
   * @type {Number}
   * @readonly
   */
  5: 53,

  /**
   * !#en The '6' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 6 键
   * @property 6
   * @type {Number}
   * @readonly
   */
  6: 54,

  /**
   * !#en The '7' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 7 键
   * @property 7
   * @type {Number}
   * @readonly
   */
  7: 55,

  /**
   * !#en The '8' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 8 键
   * @property 8
   * @type {Number}
   * @readonly
   */
  8: 56,

  /**
   * !#en The '9' key on the top of the alphanumeric keyboard.
   * !#zh 字母键盘上的 9 键
   * @property 9
   * @type {Number}
   * @readonly
   */
  9: 57,

  /**
   * !#en The a key
   * !#zh A 键
   * @property a
   * @type {Number}
   * @readonly
   */
  a: 65,

  /**
   * !#en The b key
   * !#zh B 键
   * @property b
   * @type {Number}
   * @readonly
   */
  b: 66,

  /**
   * !#en The c key
   * !#zh C 键
   * @property c
   * @type {Number}
   * @readonly
   */
  c: 67,

  /**
   * !#en The d key
   * !#zh D 键
   * @property d
   * @type {Number}
   * @readonly
   */
  d: 68,

  /**
   * !#en The e key
   * !#zh E 键
   * @property e
   * @type {Number}
   * @readonly
   */
  e: 69,

  /**
   * !#en The f key
   * !#zh F 键
   * @property f
   * @type {Number}
   * @readonly
   */
  f: 70,

  /**
   * !#en The g key
   * !#zh G 键
   * @property g
   * @type {Number}
   * @readonly
   */
  g: 71,

  /**
   * !#en The h key
   * !#zh H 键
   * @property h
   * @type {Number}
   * @readonly
   */
  h: 72,

  /**
   * !#en The i key
   * !#zh I 键
   * @property i
   * @type {Number}
   * @readonly
   */
  i: 73,

  /**
   * !#en The j key
   * !#zh J 键
   * @property j
   * @type {Number}
   * @readonly
   */
  j: 74,

  /**
   * !#en The k key
   * !#zh K 键
   * @property k
   * @type {Number}
   * @readonly
   */
  k: 75,

  /**
   * !#en The l key
   * !#zh L 键
   * @property l
   * @type {Number}
   * @readonly
   */
  l: 76,

  /**
   * !#en The m key
   * !#zh M 键
   * @property m
   * @type {Number}
   * @readonly
   */
  m: 77,

  /**
   * !#en The n key
   * !#zh N 键
   * @property n
   * @type {Number}
   * @readonly
   */
  n: 78,

  /**
   * !#en The o key
   * !#zh O 键
   * @property o
   * @type {Number}
   * @readonly
   */
  o: 79,

  /**
   * !#en The p key
   * !#zh P 键
   * @property p
   * @type {Number}
   * @readonly
   */
  p: 80,

  /**
   * !#en The q key
   * !#zh Q 键
   * @property q
   * @type {Number}
   * @readonly
   */
  q: 81,

  /**
   * !#en The r key
   * !#zh R 键
   * @property r
   * @type {Number}
   * @readonly
   */
  r: 82,

  /**
   * !#en The s key
   * !#zh S 键
   * @property s
   * @type {Number}
   * @readonly
   */
  s: 83,

  /**
   * !#en The t key
   * !#zh T 键
   * @property t
   * @type {Number}
   * @readonly
   */
  t: 84,

  /**
   * !#en The u key
   * !#zh U 键
   * @property u
   * @type {Number}
   * @readonly
   */
  u: 85,

  /**
   * !#en The v key
   * !#zh V 键
   * @property v
   * @type {Number}
   * @readonly
   */
  v: 86,

  /**
   * !#en The w key
   * !#zh W 键
   * @property w
   * @type {Number}
   * @readonly
   */
  w: 87,

  /**
   * !#en The x key
   * !#zh X 键
   * @property x
   * @type {Number}
   * @readonly
   */
  x: 88,

  /**
   * !#en The y key
   * !#zh Y 键
   * @property y
   * @type {Number}
   * @readonly
   */
  y: 89,

  /**
   * !#en The z key
   * !#zh Z 键
   * @property z
   * @type {Number}
   * @readonly
   */
  z: 90,

  /**
   * !#en The numeric keypad 0
   * !#zh 数字键盘 0
   * @property num0
   * @type {Number}
   * @readonly
   */
  num0: 96,

  /**
   * !#en The numeric keypad 1
   * !#zh 数字键盘 1
   * @property num1
   * @type {Number}
   * @readonly
   */
  num1: 97,

  /**
   * !#en The numeric keypad 2
   * !#zh 数字键盘 2
   * @property num2
   * @type {Number}
   * @readonly
   */
  num2: 98,

  /**
   * !#en The numeric keypad 3
   * !#zh 数字键盘 3
   * @property num3
   * @type {Number}
   * @readonly
   */
  num3: 99,

  /**
   * !#en The numeric keypad 4
   * !#zh 数字键盘 4
   * @property num4
   * @type {Number}
   * @readonly
   */
  num4: 100,

  /**
   * !#en The numeric keypad 5
   * !#zh 数字键盘 5
   * @property num5
   * @type {Number}
   * @readonly
   */
  num5: 101,

  /**
   * !#en The numeric keypad 6
   * !#zh 数字键盘 6
   * @property num6
   * @type {Number}
   * @readonly
   */
  num6: 102,

  /**
   * !#en The numeric keypad 7
   * !#zh 数字键盘 7
   * @property num7
   * @type {Number}
   * @readonly
   */
  num7: 103,

  /**
   * !#en The numeric keypad 8
   * !#zh 数字键盘 8
   * @property num8
   * @type {Number}
   * @readonly
   */
  num8: 104,

  /**
   * !#en The numeric keypad 9
   * !#zh 数字键盘 9
   * @property num9
   * @type {Number}
   * @readonly
   */
  num9: 105,

  /**
   * !#en The numeric keypad '*'
   * !#zh 数字键盘 *
   * @property *
   * @type {Number}
   * @readonly
   */
  '*': 106,

  /**
   * !#en The numeric keypad '+'
   * !#zh 数字键盘 +
   * @property +
   * @type {Number}
   * @readonly
   */
  '+': 107,

  /**
   * !#en The numeric keypad '-'
   * !#zh 数字键盘 -
   * @property -
   * @type {Number}
   * @readonly
   */
  '-': 109,

  /**
   * !#en The numeric keypad 'delete'
   * !#zh 数字键盘删除键
   * @property numdel
   * @type {Number}
   * @readonly
   */
  'numdel': 110,

  /**
   * !#en The numeric keypad '/'
   * !#zh 数字键盘 /
   * @property /
   * @type {Number}
   * @readonly
   */
  '/': 111,

  /**
   * !#en The F1 function key
   * !#zh F1 功能键
   * @property f1
   * @type {Number}
   * @readonly
   */
  f1: 112,
  //f1-f12 dont work on ie

  /**
   * !#en The F2 function key
   * !#zh F2 功能键
   * @property f2
   * @type {Number}
   * @readonly
   */
  f2: 113,

  /**
   * !#en The F3 function key
   * !#zh F3 功能键
   * @property f3
   * @type {Number}
   * @readonly
   */
  f3: 114,

  /**
   * !#en The F4 function key
   * !#zh F4 功能键
   * @property f4
   * @type {Number}
   * @readonly
   */
  f4: 115,

  /**
   * !#en The F5 function key
   * !#zh F5 功能键
   * @property f5
   * @type {Number}
   * @readonly
   */
  f5: 116,

  /**
   * !#en The F6 function key
   * !#zh F6 功能键
   * @property f6
   * @type {Number}
   * @readonly
   */
  f6: 117,

  /**
   * !#en The F7 function key
   * !#zh F7 功能键
   * @property f7
   * @type {Number}
   * @readonly
   */
  f7: 118,

  /**
   * !#en The F8 function key
   * !#zh F8 功能键
   * @property f8
   * @type {Number}
   * @readonly
   */
  f8: 119,

  /**
   * !#en The F9 function key
   * !#zh F9 功能键
   * @property f9
   * @type {Number}
   * @readonly
   */
  f9: 120,

  /**
   * !#en The F10 function key
   * !#zh F10 功能键
   * @property f10
   * @type {Number}
   * @readonly
   */
  f10: 121,

  /**
   * !#en The F11 function key
   * !#zh F11 功能键
   * @property f11
   * @type {Number}
   * @readonly
   */
  f11: 122,

  /**
   * !#en The F12 function key
   * !#zh F12 功能键
   * @property f12
   * @type {Number}
   * @readonly
   */
  f12: 123,

  /**
   * !#en The numlock key
   * !#zh 数字锁定键
   * @property numlock
   * @type {Number}
   * @readonly
   */
  numlock: 144,

  /**
   * !#en The scroll lock key
   * !#zh 滚动锁定键
   * @property scrolllock
   * @type {Number}
   * @readonly
   */
  scrolllock: 145,

  /**
   * !#en The ';' key.
   * !#zh 分号键
   * @property ;
   * @type {Number}
   * @readonly
   */
  ';': 186,

  /**
   * !#en The ';' key.
   * !#zh 分号键
   * @property semicolon
   * @type {Number}
   * @readonly
   */
  semicolon: 186,

  /**
   * !#en The '=' key.
   * !#zh 等于号键
   * @property equal
   * @type {Number}
   * @readonly
   */
  equal: 187,

  /**
   * !#en The '=' key.
   * !#zh 等于号键
   * @property =
   * @type {Number}
   * @readonly
   */
  '=': 187,

  /**
   * !#en The ',' key.
   * !#zh 逗号键
   * @property ,
   * @type {Number}
   * @readonly
   */
  ',': 188,

  /**
   * !#en The ',' key.
   * !#zh 逗号键
   * @property comma
   * @type {Number}
   * @readonly
   */
  comma: 188,

  /**
   * !#en The dash '-' key.
   * !#zh 中划线键
   * @property dash
   * @type {Number}
   * @readonly
   */
  dash: 189,

  /**
   * !#en The '.' key.
   * !#zh 句号键
   * @property .
   * @type {Number}
   * @readonly
   */
  '.': 190,

  /**
   * !#en The '.' key
   * !#zh 句号键
   * @property period
   * @type {Number}
   * @readonly
   */
  period: 190,

  /**
   * !#en The forward slash key
   * !#zh 正斜杠键
   * @property forwardslash
   * @type {Number}
   * @readonly
   */
  forwardslash: 191,

  /**
   * !#en The grave key
   * !#zh 按键 `
   * @property grave
   * @type {Number}
   * @readonly
   */
  grave: 192,

  /**
   * !#en The '[' key
   * !#zh 按键 [
   * @property [
   * @type {Number}
   * @readonly
   */
  '[': 219,

  /**
   * !#en The '[' key
   * !#zh 按键 [
   * @property openbracket
   * @type {Number}
   * @readonly
   */
  openbracket: 219,

  /**
   * !#en The '\' key
   * !#zh 反斜杠键
   * @property backslash
   * @type {Number}
   * @readonly
   */
  backslash: 220,

  /**
   * !#en The ']' key
   * !#zh 按键 ]
   * @property ]
   * @type {Number}
   * @readonly
   */
  ']': 221,

  /**
   * !#en The ']' key
   * !#zh 按键 ]
   * @property closebracket
   * @type {Number}
   * @readonly
   */
  closebracket: 221,

  /**
   * !#en The quote key
   * !#zh 单引号键
   * @property quote
   * @type {Number}
   * @readonly
   */
  quote: 222,
  // gamepad controll

  /**
   * !#en The dpad left key
   * !#zh 导航键 向左
   * @property dpadLeft
   * @type {Number}
   * @readonly
   */
  dpadLeft: 1000,

  /**
   * !#en The dpad right key
   * !#zh 导航键 向右
   * @property dpadRight
   * @type {Number}
   * @readonly
   */
  dpadRight: 1001,

  /**
   * !#en The dpad up key
   * !#zh 导航键 向上
   * @property dpadUp
   * @type {Number}
   * @readonly
   */
  dpadUp: 1003,

  /**
   * !#en The dpad down key
   * !#zh 导航键 向下
   * @property dpadDown
   * @type {Number}
   * @readonly
   */
  dpadDown: 1004,

  /**
   * !#en The dpad center key
   * !#zh 导航键 确定键
   * @property dpadCenter
   * @type {Number}
   * @readonly
   */
  dpadCenter: 1005
};
/**
 * Image formats
 * @enum macro.ImageFormat
 */

cc.macro.ImageFormat = cc.Enum({
  /**
   * Image Format:JPG
   * @property JPG
   * @type {Number}
   */
  JPG: 0,

  /**
   * Image Format:PNG
   * @property PNG
   * @type {Number}
   */
  PNG: 1,

  /**
   * Image Format:TIFF
   * @property TIFF
   * @type {Number}
   */
  TIFF: 2,

  /**
   * Image Format:WEBP
   * @property WEBP
   * @type {Number}
   */
  WEBP: 3,

  /**
   * Image Format:PVR
   * @property PVR
   * @type {Number}
   */
  PVR: 4,

  /**
   * Image Format:ETC
   * @property ETC
   * @type {Number}
   */
  ETC: 5,

  /**
   * Image Format:S3TC
   * @property S3TC
   * @type {Number}
   */
  S3TC: 6,

  /**
   * Image Format:ATITC
   * @property ATITC
   * @type {Number}
   */
  ATITC: 7,

  /**
   * Image Format:TGA
   * @property TGA
   * @type {Number}
   */
  TGA: 8,

  /**
   * Image Format:RAWDATA
   * @property RAWDATA
   * @type {Number}
   */
  RAWDATA: 9,

  /**
   * Image Format:UNKNOWN
   * @property UNKNOWN
   * @type {Number}
   */
  UNKNOWN: 10
});
/**
 * !#en
 * Enum for blend factor
 * Refer to: http://www.andersriggelsen.dk/glblendfunc.php
 * !#zh
 * 混合因子
 * 可参考: http://www.andersriggelsen.dk/glblendfunc.php
 * @enum macro.BlendFactor
 */

cc.macro.BlendFactor = cc.Enum({
  /**
   * !#en All use
   * !#zh 全部使用
   * @property {Number} ONE
   */
  ONE: 1,
  //cc.macro.ONE

  /**
   * !#en Not all
   * !#zh 全部不用
   * @property {Number} ZERO
   */
  ZERO: 0,
  //cc.ZERO

  /**
   * !#en Using the source alpha
   * !#zh 使用源颜色的透明度
   * @property {Number} SRC_ALPHA
   */
  SRC_ALPHA: 0x302,
  //cc.SRC_ALPHA

  /**
   * !#en Using the source color
   * !#zh 使用源颜色
   * @property {Number} SRC_COLOR
   */
  SRC_COLOR: 0x300,
  //cc.SRC_COLOR

  /**
   * !#en Using the target alpha
   * !#zh 使用目标颜色的透明度
   * @property {Number} DST_ALPHA
   */
  DST_ALPHA: 0x304,
  //cc.DST_ALPHA

  /**
   * !#en Using the target color
   * !#zh 使用目标颜色
   * @property {Number} DST_COLOR
   */
  DST_COLOR: 0x306,
  //cc.DST_COLOR

  /**
   * !#en Minus the source alpha
   * !#zh 减去源颜色的透明度
   * @property {Number} ONE_MINUS_SRC_ALPHA
   */
  ONE_MINUS_SRC_ALPHA: 0x303,
  //cc.ONE_MINUS_SRC_ALPHA

  /**
   * !#en Minus the source color
   * !#zh 减去源颜色
   * @property {Number} ONE_MINUS_SRC_COLOR
   */
  ONE_MINUS_SRC_COLOR: 0x301,
  //cc.ONE_MINUS_SRC_COLOR

  /**
   * !#en Minus the target alpha
   * !#zh 减去目标颜色的透明度
   * @property {Number} ONE_MINUS_DST_ALPHA
   */
  ONE_MINUS_DST_ALPHA: 0x305,
  //cc.ONE_MINUS_DST_ALPHA

  /**
   * !#en Minus the target color
   * !#zh 减去目标颜色
   * @property {Number} ONE_MINUS_DST_COLOR
   */
  ONE_MINUS_DST_COLOR: 0x307 //cc.ONE_MINUS_DST_COLOR

});
/**
 * @enum macro.TextAlignment
 */

cc.macro.TextAlignment = cc.Enum({
  /**
   * @property {Number} LEFT
   */
  LEFT: 0,

  /**
   * @property {Number} CENTER
   */
  CENTER: 1,

  /**
   * @property {Number} RIGHT
   */
  RIGHT: 2
});
/**
 * @enum VerticalTextAlignment
 */

cc.macro.VerticalTextAlignment = cc.Enum({
  /**
   * @property {Number} TOP
   */
  TOP: 0,

  /**
   * @property {Number} CENTER
   */
  CENTER: 1,

  /**
   * @property {Number} BOTTOM
   */
  BOTTOM: 2
});
module.exports = cc.macro;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ01hY3JvLmpzIl0sIm5hbWVzIjpbImNjIiwibWFjcm8iLCJSQUQiLCJNYXRoIiwiUEkiLCJERUciLCJSRVBFQVRfRk9SRVZFUiIsIk51bWJlciIsIk1BWF9WQUxVRSIsIkZMVF9FUFNJTE9OIiwiTUlOX1pJTkRFWCIsInBvdyIsIk1BWF9aSU5ERVgiLCJPTkUiLCJaRVJPIiwiU1JDX0FMUEhBIiwiU1JDX0FMUEhBX1NBVFVSQVRFIiwiU1JDX0NPTE9SIiwiRFNUX0FMUEhBIiwiRFNUX0NPTE9SIiwiT05FX01JTlVTX1NSQ19BTFBIQSIsIk9ORV9NSU5VU19TUkNfQ09MT1IiLCJPTkVfTUlOVVNfRFNUX0FMUEhBIiwiT05FX01JTlVTX0RTVF9DT0xPUiIsIk9ORV9NSU5VU19DT05TVEFOVF9BTFBIQSIsIk9ORV9NSU5VU19DT05TVEFOVF9DT0xPUiIsIk9SSUVOVEFUSU9OX1BPUlRSQUlUIiwiT1JJRU5UQVRJT05fTEFORFNDQVBFIiwiT1JJRU5UQVRJT05fQVVUTyIsIkRFTlNJVFlEUElfREVWSUNFIiwiREVOU0lUWURQSV9ISUdIIiwiREVOU0lUWURQSV9NRURJVU0iLCJERU5TSVRZRFBJX0xPVyIsIkZJWF9BUlRJRkFDVFNfQllfU1RSRUNISU5HX1RFWEVMX1RNWCIsIkRJUkVDVE9SX1NUQVRTX1BPU0lUSU9OIiwidjIiLCJFTkFCTEVfU1RBQ0tBQkxFX0FDVElPTlMiLCJUT1VDSF9USU1FT1VUIiwiQkFUQ0hfVkVSVEVYX0NPVU5UIiwiRU5BQkxFX1RJTEVETUFQX0NVTExJTkciLCJFTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFTIiwiRU5BQkxFX1dFQkdMX0FOVElBTElBUyIsIkVOQUJMRV9DVUxMSU5HIiwiQ0xFQU5VUF9JTUFHRV9DQUNIRSIsIlNIT1dfTUVTSF9XSVJFRlJBTUUiLCJTSE9XX01FU0hfTk9STUFMIiwiRU5BQkxFX01VTFRJX1RPVUNIIiwiQUxMT1dfSU1BR0VfQklUTUFQIiwic3lzIiwiaXNNb2JpbGUiLCJFTkFCTEVfTkFUSVZFX1RURl9SRU5ERVJFUiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwidmFsdWUiLCJSb3RhdGVUbyIsIlJvdGF0ZUJ5IiwiX3JldmVyc2UiLCJTVVBQT1JUX1RFWFRVUkVfRk9STUFUUyIsIktFWSIsIm5vbmUiLCJiYWNrIiwibWVudSIsImJhY2tzcGFjZSIsInRhYiIsImVudGVyIiwic2hpZnQiLCJjdHJsIiwiYWx0IiwicGF1c2UiLCJjYXBzbG9jayIsImVzY2FwZSIsInNwYWNlIiwicGFnZXVwIiwicGFnZWRvd24iLCJlbmQiLCJob21lIiwibGVmdCIsInVwIiwicmlnaHQiLCJkb3duIiwic2VsZWN0IiwiaW5zZXJ0IiwiRGVsZXRlIiwiYSIsImIiLCJjIiwiZCIsImUiLCJmIiwiZyIsImgiLCJpIiwiaiIsImsiLCJsIiwibSIsIm4iLCJvIiwicCIsInEiLCJyIiwicyIsInQiLCJ1IiwidiIsInciLCJ4IiwieSIsInoiLCJudW0wIiwibnVtMSIsIm51bTIiLCJudW0zIiwibnVtNCIsIm51bTUiLCJudW02IiwibnVtNyIsIm51bTgiLCJudW05IiwiZjEiLCJmMiIsImYzIiwiZjQiLCJmNSIsImY2IiwiZjciLCJmOCIsImY5IiwiZjEwIiwiZjExIiwiZjEyIiwibnVtbG9jayIsInNjcm9sbGxvY2siLCJzZW1pY29sb24iLCJlcXVhbCIsImNvbW1hIiwiZGFzaCIsInBlcmlvZCIsImZvcndhcmRzbGFzaCIsImdyYXZlIiwib3BlbmJyYWNrZXQiLCJiYWNrc2xhc2giLCJjbG9zZWJyYWNrZXQiLCJxdW90ZSIsImRwYWRMZWZ0IiwiZHBhZFJpZ2h0IiwiZHBhZFVwIiwiZHBhZERvd24iLCJkcGFkQ2VudGVyIiwiSW1hZ2VGb3JtYXQiLCJFbnVtIiwiSlBHIiwiUE5HIiwiVElGRiIsIldFQlAiLCJQVlIiLCJFVEMiLCJTM1RDIiwiQVRJVEMiLCJUR0EiLCJSQVdEQVRBIiwiVU5LTk9XTiIsIkJsZW5kRmFjdG9yIiwiVGV4dEFsaWdubWVudCIsIkxFRlQiLCJDRU5URVIiLCJSSUdIVCIsIlZlcnRpY2FsVGV4dEFsaWdubWVudCIsIlRPUCIsIkJPVFRPTSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILEdBQVc7QUFDUDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEdBQUcsRUFBRUMsSUFBSSxDQUFDQyxFQUFMLEdBQVUsR0FOUjs7QUFRUDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEdBQUcsRUFBRSxNQUFNRixJQUFJLENBQUNDLEVBYlQ7O0FBZVA7QUFDSjtBQUNBO0FBQ0E7QUFDSUUsRUFBQUEsY0FBYyxFQUFHQyxNQUFNLENBQUNDLFNBQVAsR0FBbUIsQ0FuQjdCOztBQXFCUDtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxXQUFXLEVBQUUsa0JBekJOOztBQTJCUDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFVBQVUsRUFBRSxDQUFDUCxJQUFJLENBQUNRLEdBQUwsQ0FBUyxDQUFULEVBQVksRUFBWixDQWhDTjs7QUFrQ1A7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxVQUFVLEVBQUVULElBQUksQ0FBQ1EsR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLElBQWtCLENBdkN2QjtBQXlDUDs7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNJRSxFQUFBQSxHQUFHLEVBQUUsQ0E5Q0U7O0FBZ0RQO0FBQ0o7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLElBQUksRUFBRSxDQXBEQzs7QUFzRFA7QUFDSjtBQUNBO0FBQ0E7QUFDSUMsRUFB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LEVBQUUsQ0FBQ3VKLElBQUgsQ0FBUTtBQUNyQztBQUNKO0FBQ0E7QUFDSWtCLEVBQUFBLEdBQUcsRUFBRSxDQUpnQzs7QUFLckM7QUFDSjtBQUNBO0FBQ0lILEVBQUFBLE1BQU0sRUFBRSxDQVI2Qjs7QUFTckM7QUFDSjtBQUNBO0FBQ0lJLEVBQUFBLE1BQU0sRUFBRTtBQVo2QixDQUFSLENBQWpDO0FBZUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVLLEVBQUUsQ0FBQ0MsS0FBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8qKlxyXG4gKiBQcmVkZWZpbmVkIGNvbnN0YW50c1xyXG4gKiBAY2xhc3MgbWFjcm9cclxuICogQHN0YXRpY1xyXG4gKi9cclxuY2MubWFjcm8gPSB7XHJcbiAgICAvKipcclxuICAgICAqIFBJIC8gMTgwXHJcbiAgICAgKiBAcHJvcGVydHkgUkFEXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBSQUQ6IE1hdGguUEkgLyAxODAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPbmUgZGVncmVlXHJcbiAgICAgKiBAcHJvcGVydHkgREVHXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBERUc6IDE4MCAvIE1hdGguUEksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgUkVQRUFUX0ZPUkVWRVJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFJFUEVBVF9GT1JFVkVSOiAoTnVtYmVyLk1BWF9WQUxVRSAtIDEpLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IEZMVF9FUFNJTE9OXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBGTFRfRVBTSUxPTjogMC4wMDAwMDAxMTkyMDkyODk2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW11bSB6IGluZGV4IHZhbHVlIGZvciBub2RlXHJcbiAgICAgKiBAcHJvcGVydHkgTUlOX1pJTkRFWFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgTUlOX1pJTkRFWDogLU1hdGgucG93KDIsIDE1KSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1heGltdW0geiBpbmRleCB2YWx1ZSBmb3Igbm9kZVxyXG4gICAgICogQHByb3BlcnR5IE1BWF9aSU5ERVhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE1BWF9aSU5ERVg6IE1hdGgucG93KDIsIDE1KSAtIDEsXHJcblxyXG4gICAgLy9zb21lIGdsIGNvbnN0YW50IHZhcmlhYmxlXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPTkVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE9ORTogMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBaRVJPOiAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFNSQ19BTFBIQVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgU1JDX0FMUEhBOiAweDAzMDIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgU1JDX0FMUEhBX1NBVFVSQVRFXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBTUkNfQUxQSEFfU0FUVVJBVEU6IDB4MzA4LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IFNSQ19DT0xPUlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgU1JDX0NPTE9SOiAweDMwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBEU1RfQUxQSEFcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIERTVF9BTFBIQTogMHgzMDQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgRFNUX0NPTE9SXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBEU1RfQ09MT1I6IDB4MzA2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IE9ORV9NSU5VU19TUkNfQUxQSEFcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE9ORV9NSU5VU19TUkNfQUxQSEE6IDB4MDMwMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfU1JDX0NPTE9SXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPTkVfTUlOVVNfU1JDX0NPTE9SOiAweDMwMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfRFNUX0FMUEhBXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPTkVfTUlOVVNfRFNUX0FMUEhBOiAweDMwNSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfRFNUX0NPTE9SXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPTkVfTUlOVVNfRFNUX0NPTE9SOiAweDAzMDcsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkgT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEE6IDB4ODAwNCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSBPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1JcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE9ORV9NSU5VU19DT05TVEFOVF9DT0xPUjogMHg4MDAyLFxyXG5cclxuICAgIC8vUG9zc2libGUgZGV2aWNlIG9yaWVudGF0aW9uc1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcmllbnRlZCB2ZXJ0aWNhbGx5XHJcbiAgICAgKiBAcHJvcGVydHkgT1JJRU5UQVRJT05fUE9SVFJBSVRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIE9SSUVOVEFUSU9OX1BPUlRSQUlUOiAxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3JpZW50ZWQgaG9yaXpvbnRhbGx5XHJcbiAgICAgKiBAcHJvcGVydHkgT1JJRU5UQVRJT05fTEFORFNDQVBFXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBPUklFTlRBVElPTl9MQU5EU0NBUEU6IDIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcmllbnRlZCBhdXRvbWF0aWNhbGx5XHJcbiAgICAgKiBAcHJvcGVydHkgT1JJRU5UQVRJT05fQVVUT1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgT1JJRU5UQVRJT05fQVVUTzogMyxcclxuXHJcbiAgICBERU5TSVRZRFBJX0RFVklDRTogJ2RldmljZS1kcGknLFxyXG4gICAgREVOU0lUWURQSV9ISUdIOiAnaGlnaC1kcGknLFxyXG4gICAgREVOU0lUWURQSV9NRURJVU06ICdtZWRpdW0tZHBpJyxcclxuICAgIERFTlNJVFlEUElfTE9XOiAnbG93LWRwaScsXHJcblxyXG4gICAgLy8gR2VuZXJhbCBjb25maWd1cmF0aW9uc1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogPHA+XHJcbiAgICAgKiAgIElmIGVuYWJsZWQsIHRoZSB0ZXh0dXJlIGNvb3JkaW5hdGVzIHdpbGwgYmUgY2FsY3VsYXRlZCBieSB1c2luZyB0aGlzIGZvcm11bGE6IDxici8+XHJcbiAgICAgKiAgICAgIC0gdGV4Q29vcmQubGVmdCA9IChyZWN0LngqMisxKSAvICh0ZXh0dXJlLndpZGUqMik7ICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICAgICAgLSB0ZXhDb29yZC5yaWdodCA9IHRleENvb3JkLmxlZnQgKyAocmVjdC53aWR0aCoyLTIpLyh0ZXh0dXJlLndpZGUqMik7IDxici8+XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgVGhlIHNhbWUgZm9yIGJvdHRvbSBhbmQgdG9wLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgVGhpcyBmb3JtdWxhIHByZXZlbnRzIGFydGlmYWN0cyBieSB1c2luZyA5OSUgb2YgdGhlIHRleHR1cmUuICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgVGhlIFwiY29ycmVjdFwiIHdheSB0byBwcmV2ZW50IGFydGlmYWN0cyBpcyBieSBleHBhbmQgdGhlIHRleHR1cmUncyBib3JkZXIgd2l0aCB0aGUgc2FtZSBjb2xvciBieSAxIHBpeGVsPGJyLz5cclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XHJcbiAgICAgKiAgQWZmZWN0ZWQgY29tcG9uZW50OiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICAgICAgLSBjYy5UTVhMYXllciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cclxuICAgICAqICBFbmFibGVkIGJ5IGRlZmF1bHQuIFRvIGRpc2FibGVkIHNldCBpdCB0byAwLiA8YnIvPlxyXG4gICAgICogIFRvIG1vZGlmeSBpdCwgaW4gV2ViIGVuZ2luZSBwbGVhc2UgcmVmZXIgdG8gQ0NNYWNyby5qcywgaW4gSlNCIHBsZWFzZSByZWZlciB0byBDQ0NvbmZpZy5oXHJcbiAgICAgKiA8L3A+XHJcbiAgICAgKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZJWF9BUlRJRkFDVFNfQllfU1RSRUNISU5HX1RFWEVMX1RNWFxyXG4gICAgICovXHJcbiAgICBGSVhfQVJUSUZBQ1RTX0JZX1NUUkVDSElOR19URVhFTF9UTVg6IHRydWUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3NpdGlvbiBvZiB0aGUgRlBTIChEZWZhdWx0OiAwLDAgKGJvdHRvbS1sZWZ0IGNvcm5lcikpPGJyLz5cclxuICAgICAqIFRvIG1vZGlmeSBpdCwgaW4gV2ViIGVuZ2luZSBwbGVhc2UgcmVmZXIgdG8gQ0NNYWNyby5qcywgaW4gSlNCIHBsZWFzZSByZWZlciB0byBDQ0NvbmZpZy5oXHJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IERJUkVDVE9SX1NUQVRTX1BPU0lUSU9OXHJcbiAgICAgKi9cclxuICAgIERJUkVDVE9SX1NUQVRTX1BPU0lUSU9OOiBjYy52MigwLCAwKSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIDxwPlxyXG4gICAgICogICAgSWYgZW5hYmxlZCwgYWN0aW9ucyB0aGF0IGFsdGVyIHRoZSBwb3NpdGlvbiBwcm9wZXJ0eSAoZWc6IENDTW92ZUJ5LCBDQ0p1bXBCeSwgQ0NCZXppZXJCeSwgZXRjLi4pIHdpbGwgYmUgc3RhY2tlZC4gICAgICAgICAgICAgICAgICA8YnIvPlxyXG4gICAgICogICAgSWYgeW91IHJ1biAyIG9yIG1vcmUgJ3Bvc2l0aW9uJyBhY3Rpb25zIGF0IHRoZSBzYW1lIHRpbWUgb24gYSBub2RlLCB0aGVuIGVuZCBwb3NpdGlvbiB3aWxsIGJlIHRoZSBzdW0gb2YgYWxsIHRoZSBwb3NpdGlvbnMuICAgICAgICA8YnIvPlxyXG4gICAgICogICAgSWYgZGlzYWJsZWQsIG9ubHkgdGhlIGxhc3QgcnVuIGFjdGlvbiB3aWxsIHRha2UgZWZmZWN0LlxyXG4gICAgICogPC9wPlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEVOQUJMRV9TVEFDS0FCTEVfQUNUSU9OU1xyXG4gICAgICovXHJcbiAgICBFTkFCTEVfU1RBQ0tBQkxFX0FDVElPTlM6IHRydWUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFxyXG4gICAgICogVGhlIHRpbWVvdXQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSB0b3VjaCBpcyBubyBsb25nZXIgYWN0aXZlIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC5cclxuICAgICAqIFRoZSByZWFzb24gdG8gYWRkIHRoaXMgdGltZW91dCBpcyBkdWUgdG8gYW4gaXNzdWUgaW4gWDUgYnJvd3NlciBjb3JlLCBcclxuICAgICAqIHdoZW4gWDUgaXMgcHJlc2VudGVkIGluIHdlY2hhdCBvbiBBbmRyb2lkLCBpZiBhIHRvdWNoIGlzIGdsaXNzZWQgZnJvbSB0aGUgYm90dG9tIHVwLCBhbmQgbGVhdmUgdGhlIHBhZ2UgYXJlYSxcclxuICAgICAqIG5vIHRvdWNoIGNhbmNlbCBldmVudCBpcyB0cmlnZ2VyZWQsIGFuZCB0aGUgdG91Y2ggd2lsbCBiZSBjb25zaWRlcmVkIGFjdGl2ZSBmb3JldmVyLiBcclxuICAgICAqIEFmdGVyIG11bHRpcGxlIHRpbWVzIG9mIHRoaXMgYWN0aW9uLCBvdXIgbWF4aW11bSB0b3VjaGVzIG51bWJlciB3aWxsIGJlIHJlYWNoZWQgYW5kIGFsbCBuZXcgdG91Y2hlcyB3aWxsIGJlIGlnbm9yZWQuXHJcbiAgICAgKiBTbyB0aGlzIG5ldyBtZWNoYW5pc20gY2FuIHJlbW92ZSB0aGUgdG91Y2ggdGhhdCBzaG91bGQgYmUgaW5hY3RpdmUgaWYgaXQncyBub3QgdXBkYXRlZCBkdXJpbmcgdGhlIGxhc3QgNTAwMCBtaWxsaXNlY29uZHMuXHJcbiAgICAgKiBUaG91Z2ggaXQgbWlnaHQgcmVtb3ZlIGEgcmVhbCB0b3VjaCBpZiBpdCdzIGp1c3Qgbm90IG1vdmluZyBmb3IgdGhlIGxhc3QgNSBzZWNvbmRzIHdoaWNoIGlzIG5vdCBlYXN5IHdpdGggdGhlIHNlbnNpYmlsaXR5IG9mIG1vYmlsZSB0b3VjaCBzY3JlZW4uXHJcbiAgICAgKiBZb3UgY2FuIG1vZGlmeSB0aGlzIHZhbHVlIHRvIGhhdmUgYSBiZXR0ZXIgYmVoYXZpb3IgaWYgeW91IGZpbmQgaXQncyBub3QgZW5vdWdoLlxyXG4gICAgICogISN6aFxyXG4gICAgICog55So5LqO55SE5Yir5LiA5Liq6Kem54K55a+56LGh5piv5ZCm5bey57uP5aSx5pWI5bm25LiU5Y+v5Lul6KKr56e76Zmk55qE5bu25pe25pe26ZW/XHJcbiAgICAgKiDmt7vliqDov5nkuKrml7bplb/nmoTljp/lm6DmmK8gWDUg5YaF5qC45Zyo5b6u5L+h5rWP6KeI5Zmo5Lit5Ye6546w55qE5LiA5LiqIGJ1Z+OAglxyXG4gICAgICog5Zyo6L+Z5Liq546v5aKD5LiL77yM5aaC5p6c55So5oi35bCG5LiA5Liq6Kem54K55LuO5bqV5ZCR5LiK56e75Ye66aG16Z2i5Yy65Z+f77yM5bCG5LiN5Lya6Kem5Y+R5Lu75L2VIHRvdWNoIGNhbmNlbCDmiJYgdG91Y2ggZW5kIOS6i+S7tu+8jOiAjOi/meS4quinpueCueS8muiiq+awuOi/nOW9k+S9nOWBnOeVmeWcqOmhtemdouS4iueahOacieaViOinpueCueOAglxyXG4gICAgICog6YeN5aSN6L+Z5qC35pON5L2c5Yeg5qyh5LmL5ZCO77yM5bGP5bmV5LiK55qE6Kem54K55pWw6YeP5bCG6L6+5Yiw5oiR5Lus55qE5LqL5Lu257O757uf5omA5pSv5oyB55qE5pyA6auY6Kem54K55pWw6YeP77yM5LmL5ZCO5omA5pyJ55qE6Kem5pG45LqL5Lu26YO95bCG6KKr5b+955Wl44CCXHJcbiAgICAgKiDmiYDku6Xov5nkuKrmlrDnmoTmnLrliLblj6/ku6XlnKjop6bngrnlnKjkuIDlrprml7bpl7TlhoXmsqHmnInku7vkvZXmm7TmlrDnmoTmg4XlhrXkuIvop4bkuLrlpLHmlYjop6bngrnlubbku47kuovku7bns7vnu5/kuK3np7vpmaTjgIJcclxuICAgICAqIOW9k+eEtu+8jOi/meS5n+WPr+iDveenu+mZpOS4gOS4quecn+WunueahOinpueCue+8jOWmguaenOeUqOaIt+eahOinpueCueecn+eahOWcqOS4gOWumuaXtumXtOauteWGheWujOWFqOayoeacieenu+WKqO+8iOi/meWcqOW9k+WJjeaJi+acuuWxj+W5leeahOeBteaVj+W6puS4i+S8muW+iOmavu+8ieOAglxyXG4gICAgICog5L2g5Y+v5Lul5L+u5pS56L+Z5Liq5YC85p2l6I635b6X5L2g6ZyA6KaB55qE5pWI5p6c77yM6buY6K6k5YC85pivIDUwMDAg5q+r56eS44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVE9VQ0hfVElNRU9VVFxyXG4gICAgICovXHJcbiAgICBUT1VDSF9USU1FT1VUOiA1MDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBcclxuICAgICAqIFRoZSBtYXhpbXVtIHZlcnRleCBjb3VudCBmb3IgYSBzaW5nbGUgYmF0Y2hlZCBkcmF3IGNhbGwuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmnIDlpKflj6/ku6XooqvljZXmrKHmibnlpITnkIbmuLLmn5PnmoTpobbngrnmlbDph4/jgIJcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCQVRDSF9WRVJURVhfQ09VTlRcclxuICAgICAqL1xyXG4gICAgQkFUQ0hfVkVSVEVYX0NPVU5UOiAyMDAwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCBlbmFibGVkIHRpbGVkIG1hcCBhdXRvIGN1bGxpbmcuIElmIHlvdSBzZXQgdGhlIFRpbGVkTWFwIHNrZXcgb3Igcm90YXRpb24sIHRoZW4gbmVlZCB0byBtYW51YWxseSBkaXNhYmxlIHRoaXMsIG90aGVyd2lzZSwgdGhlIHJlbmRlcmluZyB3aWxsIGJlIHdyb25nLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5byA5ZCv55Om54mH5Zyw5Zu+55qE6Ieq5Yqo6KOB5YeP5Yqf6IO944CC55Om54mH5Zyw5Zu+5aaC5p6c6K6+572u5LqGIHNrZXcsIHJvdGF0aW9uIOaIluiAhemHh+eUqOS6huaRhOWDj+acuueahOivne+8jOmcgOimgeaJi+WKqOWFs+mXre+8jOWQpuWImea4suafk+S8muWHuumUmeOAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBFTkFCTEVfVElMRURNQVBfQ1VMTElOR1xyXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICovXHJcbiAgICBFTkFCTEVfVElMRURNQVBfQ1VMTElORzogdHJ1ZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gXHJcbiAgICAgKiBCb29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBjYW52YXMgY29udGFpbnMgYW4gYWxwaGEgY2hhbm5lbCwgZGVmYXVsdCBzZXRzIHRvIGZhbHNlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2UuXHJcbiAgICAgKiBUaG91Z2ggaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIGNhbnZhcyBiYWNrZ3JvdW5kIHRyYW5zcGFyZW50IGFuZCBzaG93IG90aGVyIGRvbSBlbGVtZW50cyBhdCB0aGUgYmFja2dyb3VuZCwgXHJcbiAgICAgKiB5b3UgY2FuIHNldCBpdCB0byB0cnVlIGJlZm9yZSBgY2MuZ2FtZS5ydW5gLlxyXG4gICAgICogV2ViIG9ubHkuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDnlKjkuo7orr7nva4gQ2FudmFzIOiDjOaZr+aYr+WQpuaUr+aMgSBhbHBoYSDpgJrpgZPvvIzpu5jorqTkuLogZmFsc2XvvIzov5nmoLflj6/ku6XmnInmm7Tpq5jnmoTmgKfog73ooajnjrDjgIJcclxuICAgICAqIOWmguaenOS9oOW4jOacmyBDYW52YXMg6IOM5pmv5piv6YCP5piO55qE77yM5bm25pi+56S66IOM5ZCO55qE5YW25LuWIERPTSDlhYPntKDvvIzkvaDlj6/ku6XlnKggYGNjLmdhbWUucnVuYCDkuYvliY3lsIbov5nkuKrlgLzorr7kuLogdHJ1ZeOAglxyXG4gICAgICog5LuF5pSv5oyBIFdlYlxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBFTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFTXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBFTkFCTEVfVFJBTlNQQVJFTlRfQ0FOVkFTOiBmYWxzZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIEJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgaWYgdGhlIFdlYkdMIGNvbnRleHQgaXMgY3JlYXRlZCB3aXRoIGBhbnRpYWxpYXNgIG9wdGlvbiB0dXJuZWQgb24sIGRlZmF1bHQgdmFsdWUgaXMgZmFsc2UuXHJcbiAgICAgKiBTZXQgaXQgdG8gdHJ1ZSBjb3VsZCBtYWtlIHlvdXIgZ2FtZSBncmFwaGljcyBzbGlnaHRseSBzbW9vdGhlciwgbGlrZSB0ZXh0dXJlIGhhcmQgZWRnZXMgd2hlbiByb3RhdGVkLlxyXG4gICAgICogV2hldGhlciB0byB1c2UgdGhpcyByZWFsbHkgZGVwZW5kIG9uIHlvdXIgZ2FtZSBkZXNpZ24gYW5kIHRhcmdldGVkIHBsYXRmb3JtLCBcclxuICAgICAqIGRldmljZSB3aXRoIHJldGluYSBkaXNwbGF5IHVzdWFsbHkgaGF2ZSBnb29kIGRldGFpbCBvbiBncmFwaGljcyB3aXRoIG9yIHdpdGhvdXQgdGhpcyBvcHRpb24sIFxyXG4gICAgICogeW91IHByb2JhYmx5IGRvbid0IHdhbnQgYW50aWFsaWFzIGlmIHlvdXIgZ2FtZSBzdHlsZSBpcyBwaXhlbCBhcnQgYmFzZWQuXHJcbiAgICAgKiBBbHNvLCBpdCBjb3VsZCBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCB3aXRoIHNvbWUgYnJvd3NlciAvIGRldmljZSB1c2luZyBzb2Z0d2FyZSBNU0FBLlxyXG4gICAgICogWW91IGNhbiBzZXQgaXQgdG8gdHJ1ZSBiZWZvcmUgYGNjLmdhbWUucnVuYC5cclxuICAgICAqIFdlYiBvbmx5LlxyXG4gICAgICogISN6aFxyXG4gICAgICog55So5LqO6K6+572u5Zyo5Yib5bu6IFdlYkdMIENvbnRleHQg5pe25piv5ZCm5byA5ZCv5oqX6ZSv6b2/6YCJ6aG577yM6buY6K6k5YC85pivIGZhbHNl44CCXHJcbiAgICAgKiDlsIbov5nkuKrpgInpobnorr7nva7kuLogdHJ1ZSDkvJrorqnkvaDnmoTmuLjmiI/nlLvpnaLnqI3nqI3lubPmu5HkuIDkupvvvIzmr5TlpoLml4vovaznoazovrnotLTlm77ml7bnmoTplK/pvb/jgILmmK/lkKblvIDlkK/ov5nkuKrpgInpobnlvojlpKfnqIvluqbkuIrlj5blhrPkuo7kvaDnmoTmuLjmiI/lkozpnaLlkJHnmoTlubPlj7DjgIJcclxuICAgICAqIOWcqOWkp+WkmuaVsOaLpeaciSByZXRpbmEg57qn5Yir5bGP5bmV55qE6K6+5aSH5LiK55So5oi35b6A5b6A5peg5rOV5Yy65YiG6L+Z5Liq6YCJ6aG55bim5p2l55qE5Y+Y5YyW77yb5aaC5p6c5L2g55qE5ri45oiP6YCJ5oup5YOP57Sg6Im65pyv6aOO5qC877yM5L2g5Lmf5aSa5Y2K5LiN5Lya5oOz5byA5ZCv6L+Z5Liq6YCJ6aG544CCXHJcbiAgICAgKiDlkIzml7bvvIzlnKjlsJHpg6jliIbkvb/nlKjova/ku7bnuqfliKvmipfplK/pvb/nrpfms5XnmoTorr7lpIfmiJbmtY/op4jlmajkuIrvvIzov5nkuKrpgInpobnkvJrlr7nmgKfog73kuqfnlJ/mr5TovoPlpKfnmoTlvbHlk43jgIJcclxuICAgICAqIOS9oOWPr+S7peWcqCBgY2MuZ2FtZS5ydW5gIOS5i+WJjeiuvue9rui/meS4quWAvO+8jOWQpuWImeWug+S4jeS8mueUn+aViOOAglxyXG4gICAgICog5LuF5pSv5oyBIFdlYlxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBFTkFCTEVfV0VCR0xfQU5USUFMSUFTXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBFTkFCTEVfV0VCR0xfQU5USUFMSUFTOiBmYWxzZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgb3Igbm90IGVuYWJsZSBhdXRvIGN1bGxpbmcuXHJcbiAgICAgKiBUaGlzIGZlYXR1cmUgaGF2ZSBiZWVuIHJlbW92ZWQgaW4gdjIuMCBuZXcgcmVuZGVyZXIgZHVlIHRvIG92ZXJhbGwgcGVyZm9ybWFuY2UgY29uc3VtcHRpb24uXHJcbiAgICAgKiBXZSBoYXZlIG5vIHBsYW4gY3VycmVudGx5IHRvIHJlLWVuYWJsZSBhdXRvIGN1bGxpbmcuXHJcbiAgICAgKiBJZiB5b3VyIGdhbWUgaGF2ZSBtb3JlIGR5bmFtaWMgb2JqZWN0cywgd2Ugc3VnZ2VzdCB0byBkaXNhYmxlIGF1dG8gY3VsbGluZy5cclxuICAgICAqIElmIHlvdXIgZ2FtZSBoYXZlIG1vcmUgc3RhdGljIG9iamVjdHMsIHdlIHN1Z2dlc3QgdG8gZW5hYmxlIGF1dG8gY3VsbGluZy5cclxuICAgICAqICEjemhcclxuICAgICAqIOaYr+WQpuW8gOWQr+iHquWKqOijgeWHj+WKn+iDve+8jOW8gOWQr+ijgeWHj+WKn+iDveWwhuS8muaKiuWcqOWxj+W5leWklueahOeJqeS9k+S7jua4suafk+mYn+WIl+S4reWOu+mZpOaOieOAglxyXG4gICAgICog6L+Z5Liq5Yqf6IO95ZyoIHYyLjAg55qE5paw5riy5p+T5Zmo5Lit6KKr56e76Zmk5LqG77yM5Zug5Li65a6D5Zyo5aSn5aSa5pWw5ri45oiP5Lit5omA5bim5p2l55qE5o2f6ICX6KaB6auY5LqO5oCn6IO955qE5o+Q5Y2H77yM55uu5YmN5oiR5Lus5rKh5pyJ6K6h5YiS6YeN5paw5pSv5oyB6Ieq5Yqo6KOB5Ymq44CCXHJcbiAgICAgKiDlpoLmnpzmuLjmiI/kuK3nmoTliqjmgIHniankvZPmr5TovoPlpJrnmoTor53vvIzlu7rorq7lsIbmraTpgInpobnlhbPpl63jgIJcclxuICAgICAqIOWmguaenOa4uOaIj+S4reeahOmdmeaAgeeJqeS9k+avlOi+g+WkmueahOivne+8jOW7uuiuruWwhuatpOmAiemhueaJk+W8gOOAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBFTkFCTEVfQ1VMTElOR1xyXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxyXG4gICAgICogQGRlZmF1bHQgZmFsc2VcclxuICAgICAqL1xyXG4gICAgRU5BQkxFX0NVTExJTkc6IGZhbHNlLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogV2hldGhlciB0byBjbGVhciB0aGUgb3JpZ2luYWwgaW1hZ2UgY2FjaGUgYWZ0ZXIgdXBsb2FkZWQgYSB0ZXh0dXJlIHRvIEdQVS4gSWYgY2xlYXJlZCwgW0R5bmFtaWMgQXRsYXNdKGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vYWR2YW5jZWQtdG9waWNzL2R5bmFtaWMtYXRsYXMuaHRtbCkgd2lsbCBub3QgYmUgc3VwcG9ydGVkLlxyXG4gICAgICogTm9ybWFsbHkgeW91IGRvbid0IG5lZWQgdG8gZW5hYmxlIHRoaXMgb3B0aW9uIG9uIHRoZSB3ZWIgcGxhdGZvcm0sIGJlY2F1c2UgSW1hZ2Ugb2JqZWN0IGRvZXNuJ3QgY29uc3VtZSB0b28gbXVjaCBtZW1vcnkuXHJcbiAgICAgKiBCdXQgb24gV2VDaGF0IEdhbWUgcGxhdGZvcm0sIHRoZSBjdXJyZW50IHZlcnNpb24gY2FjaGUgZGVjb2RlZCBkYXRhIGluIEltYWdlIG9iamVjdCwgd2hpY2ggaGFzIGhpZ2ggbWVtb3J5IHVzYWdlLlxyXG4gICAgICogU28gd2UgZW5hYmxlZCB0aGlzIG9wdGlvbiBieSBkZWZhdWx0IG9uIFdlQ2hhdCwgc28gdGhhdCB3ZSBjYW4gcmVsZWFzZSBJbWFnZSBjYWNoZSBpbW1lZGlhdGVseSBhZnRlciB1cGxvYWRlZCB0byBHUFUuXHJcbiAgICAgKiAhI3poXHJcbiAgICAgKiDmmK/lkKblnKjlsIbotLTlm77kuIrkvKDoh7MgR1BVIOS5i+WQjuWIoOmZpOWOn+Wni+WbvueJh+e8k+WtmO+8jOWIoOmZpOS5i+WQjuWbvueJh+WwhuaXoOazlei/m+ihjCBb5Yqo5oCB5ZCI5Zu+XShodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL2FkdmFuY2VkLXRvcGljcy9keW5hbWljLWF0bGFzLmh0bWwp44CCXHJcbiAgICAgKiDlnKggV2ViIOW5s+WPsO+8jOS9oOmAmuW4uOS4jemcgOimgeW8gOWQr+i/meS4qumAiemhue+8jOWboOS4uuWcqCBXZWIg5bmz5Y+wIEltYWdlIOWvueixoeaJgOWNoOeUqOeahOWGheWtmOW+iOWwj+OAglxyXG4gICAgICog5L2G5piv5Zyo5b6u5L+h5bCP5ri45oiP5bmz5Y+w55qE5b2T5YmN54mI5pys77yMSW1hZ2Ug5a+56LGh5Lya57yT5a2Y6Kej56CB5ZCO55qE5Zu+54mH5pWw5o2u77yM5a6D5omA5Y2g55So55qE5YaF5a2Y56m66Ze05b6I5aSn44CCXHJcbiAgICAgKiDmiYDku6XmiJHku6zlnKjlvq7kv6HlubPlj7Dpu5jorqTlvIDlkK/kuobov5nkuKrpgInpobnvvIzov5nmoLfmiJHku6zlsLHlj6/ku6XlnKjkuIrkvKAgR0wg6LS05Zu+5LmL5ZCO56uL5Y2z6YeK5pS+IEltYWdlIOWvueixoeeahOWGheWtmO+8jOmBv+WFjei/h+mrmOeahOWGheWtmOWNoOeUqOOAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBDTEVBTlVQX0lNQUdFX0NBQ0hFXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBDTEVBTlVQX0lNQUdFX0NBQ0hFOiBmYWxzZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgb3Igbm90IHNob3cgbWVzaCB3aXJlIGZyYW1lLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5pi+56S6572R5qC855qE57q/5qGG44CCXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IFNIT1dfTUVTSF9XSVJFRlJBTUVcclxuICAgICAqIEBkZWZhdWx0IGZhbHNlXHJcbiAgICAgKi9cclxuICAgIFNIT1dfTUVTSF9XSVJFRlJBTUU6IGZhbHNlLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlblxyXG4gICAgICogV2hldGhlciBvciBub3Qgc2hvdyBtZXNoIG5vcm1hbC5cclxuICAgICAqICEjemhcclxuICAgICAqIOaYr+WQpuaYvuekuue9keagvOeahOazlee6v+OAglxyXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBTSE9XX01FU0hfTk9STUFMXHJcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxyXG4gICAgICovXHJcbiAgICBTSE9XX01FU0hfTk9STUFMOiBmYWxzZSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW5cclxuICAgICAqIFdoZXRoZXIgdG8gZW5hYmxlIG11bHRpLXRvdWNoLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5byA5ZCv5aSa54K56Kem5pG4XHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IEVOQUJMRV9NVUxUSV9UT1VDSFxyXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICovXHJcbiAgICBFTkFCTEVfTVVMVElfVE9VQ0g6IHRydWUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWZlcmVuY2VzOiBcclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbWFnZUJpdG1hcFxyXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd09yV29ya2VyR2xvYmFsU2NvcGUvY3JlYXRlSW1hZ2VCaXRtYXBcclxuICAgICAqIFxyXG4gICAgICogISNlblxyXG4gICAgICogV2hldGhlciB0byB1c2UgaW1hZ2UgYml0bWFwIGZpcnN0LiBJZiBlbmFibGVkLCBtZW1vcnkgdXNhZ2Ugd2lsbCBpbmNyZWFzZS5cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5LyY5YWI5L2/55SoIGltYWdlIGJpdG1hcO+8jOWQr+eUqOS5i+WQju+8jOWGheWtmOWNoOeUqOS8muWPmOmrmFxyXG4gICAgICogXHJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IEFMTE9XX0lNQUdFX0JJVE1BUFxyXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxyXG4gICAgICovXHJcbiAgICBBTExPV19JTUFHRV9CSVRNQVA6ICFjYy5zeXMuaXNNb2JpbGUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBuYXRpdmUgVFRGIHJlbmRlcmVyIHdoaWNoIGlzIGZhc3RlciBidXQgbGF5b3V0IHNsaWdodGx5IGRpZmZlcmVudC5cclxuICAgICAqIFxyXG4gICAgICogISN6aFxyXG4gICAgICog5piv5ZCm5L2/55So5Y6f55Sf55qE5paH5pys5riy5p+T5py65Yi2LCDluIPlsYDlkoznvJbovpHlmajmnInlt67lvIIuXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gRU5BQkxFX05BVElWRV9UVEZfUkVOREVSRVJcclxuICAgICAqIEBkZWZhdWx0IHRydWVcclxuICAgICAqL1xyXG4gICAgRU5BQkxFX05BVElWRV9UVEZfUkVOREVSRVI6IHRydWVcclxuXHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoY2MubWFjcm8sICdST1RBVEVfQUNUSU9OX0NDVycsIHtcclxuICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICBpZiAoY2MuUm90YXRlVG8gJiYgY2MuUm90YXRlQnkpIHtcclxuICAgICAgICAgICAgY2MuUm90YXRlVG8uX3JldmVyc2UgPSBjYy5Sb3RhdGVCeS5fcmV2ZXJzZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5sZXQgU1VQUE9SVF9URVhUVVJFX0ZPUk1BVFMgPSBbJy5wa20nLCAnLnB2cicsICcud2VicCcsICcuanBnJywgJy5qcGVnJywgJy5ibXAnLCAnLnBuZyddO1xyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogVGhlIGltYWdlIGZvcm1hdCBzdXBwb3J0ZWQgYnkgdGhlIGVuZ2luZSBkZWZhdWx0cywgYW5kIHRoZSBzdXBwb3J0ZWQgZm9ybWF0cyBtYXkgZGlmZmVyIGluIGRpZmZlcmVudCBidWlsZCBwbGF0Zm9ybXMgYW5kIGRldmljZSB0eXBlcy5cclxuICogQ3VycmVudGx5IGFsbCBwbGF0Zm9ybSBhbmQgZGV2aWNlIHN1cHBvcnQgWycud2VicCcsICcuanBnJywgJy5qcGVnJywgJy5ibXAnLCAnLnBuZyddLCBUaGUgaU9TIG1vYmlsZSBwbGF0Zm9ybSBhbHNvIHN1cHBvcnRzIHRoZSBQVlIgZm9ybWF044CCXHJcbiAqICEjemhcclxuICog5byV5pOO6buY6K6k5pSv5oyB55qE5Zu+54mH5qC85byP77yM5pSv5oyB55qE5qC85byP5Y+v6IO95Zyo5LiN5ZCM55qE5p6E5bu65bmz5Y+w5ZKM6K6+5aSH57G75Z6L5LiK5pyJ5omA5beu5Yir44CCXHJcbiAqIOebruWJjeaJgOacieW5s+WPsOWSjOiuvuWkh+aUr+aMgeeahOagvOW8j+aciSBbJy53ZWJwJywgJy5qcGcnLCAnLmpwZWcnLCAnLmJtcCcsICcucG5nJ10uIOWPpuWkliBJb3Mg5omL5py65bmz5Y+w6L+Y6aKd5aSW5pSv5oyB5LqGIFBWUiDmoLzlvI/jgIJcclxuICogQHByb3BlcnR5IHtTdHJpbmdbXX0gU1VQUE9SVF9URVhUVVJFX0ZPUk1BVFNcclxuICovXHJcbmNjLm1hY3JvLlNVUFBPUlRfVEVYVFVSRV9GT1JNQVRTID0gU1VQUE9SVF9URVhUVVJFX0ZPUk1BVFM7XHJcblxyXG5cclxuLyoqXHJcbiAqICEjZW4gS2V5IG1hcCBmb3Iga2V5Ym9hcmQgZXZlbnRcclxuICogISN6aCDplK7nm5jkuovku7bnmoTmjInplK7lgLxcclxuICogQGVudW0gbWFjcm8uS0VZXHJcbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvcGxhdGZvcm0vQ0NDb21tb24vS0VZLmpzfVxyXG4gKi9cclxuY2MubWFjcm8uS0VZID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE5vbmVcclxuICAgICAqICEjemgg5rKh5pyJ5YiG6YWNXHJcbiAgICAgKiBAcHJvcGVydHkgbm9uZVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBub25lOjAsXHJcblxyXG4gICAgLy8gYW5kcm9pZFxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBiYWNrIGtleVxyXG4gICAgICogISN6aCDov5Tlm57plK5cclxuICAgICAqIEBwcm9wZXJ0eSBiYWNrXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGJhY2s6NixcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbWVudSBrZXlcclxuICAgICAqICEjemgg6I+c5Y2V6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgbWVudVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBtZW51OjE4LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYmFja3NwYWNlIGtleVxyXG4gICAgICogISN6aCDpgIDmoLzplK5cclxuICAgICAqIEBwcm9wZXJ0eSBiYWNrc3BhY2VcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgYmFja3NwYWNlOjgsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSB0YWIga2V5XHJcbiAgICAgKiAhI3poIFRhYiDplK5cclxuICAgICAqIEBwcm9wZXJ0eSB0YWJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdGFiOjksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbnRlciBrZXlcclxuICAgICAqICEjemgg5Zue6L2m6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZW50ZXJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZW50ZXI6MTMsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzaGlmdCBrZXlcclxuICAgICAqICEjemggU2hpZnQg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgc2hpZnRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc2hpZnQ6MTYsIC8vc2hvdWxkIHVzZSBzaGlmdGtleSBpbnN0ZWFkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBjdHJsIGtleVxyXG4gICAgICogISN6aCBDdHJsIOmUrlxyXG4gICAgICogQHByb3BlcnR5IGN0cmxcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgY3RybDoxNywgLy9zaG91bGQgdXNlIGN0cmxrZXlcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGFsdCBrZXlcclxuICAgICAqICEjemggQWx0IOmUrlxyXG4gICAgICogQHByb3BlcnR5IGFsdFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBhbHQ6MTgsIC8vc2hvdWxkIHVzZSBhbHRrZXlcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHBhdXNlIGtleVxyXG4gICAgICogISN6aCDmmoLlgZzplK5cclxuICAgICAqIEBwcm9wZXJ0eSBwYXVzZVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwYXVzZToxOSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGNhcHMgbG9jayBrZXlcclxuICAgICAqICEjemgg5aSn5YaZ6ZSB5a6a6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgY2Fwc2xvY2tcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgY2Fwc2xvY2s6MjAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlc2Mga2V5XHJcbiAgICAgKiAhI3poIEVTQyDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBlc2NhcGVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZXNjYXBlOjI3LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgc3BhY2Uga2V5XHJcbiAgICAgKiAhI3poIOepuuagvOmUrlxyXG4gICAgICogQHByb3BlcnR5IHNwYWNlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHNwYWNlOjMyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcGFnZSB1cCBrZXlcclxuICAgICAqICEjemgg5ZCR5LiK57+76aG16ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgcGFnZXVwXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHBhZ2V1cDozMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHBhZ2UgZG93biBrZXlcclxuICAgICAqICEjemgg5ZCR5LiL57+76aG16ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgcGFnZWRvd25cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcGFnZWRvd246MzQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBlbmQga2V5XHJcbiAgICAgKiAhI3poIOe7k+adn+mUrlxyXG4gICAgICogQHByb3BlcnR5IGVuZFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBlbmQ6MzUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBob21lIGtleVxyXG4gICAgICogISN6aCDkuLvoj5zljZXplK5cclxuICAgICAqIEBwcm9wZXJ0eSBob21lXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGhvbWU6MzYsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBsZWZ0IGtleVxyXG4gICAgICogISN6aCDlkJHlt6bnrq3lpLTplK5cclxuICAgICAqIEBwcm9wZXJ0eSBsZWZ0XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGxlZnQ6MzcsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSB1cCBrZXlcclxuICAgICAqICEjemgg5ZCR5LiK566t5aS06ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgdXBcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdXA6MzgsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSByaWdodCBrZXlcclxuICAgICAqICEjemgg5ZCR5Y+z566t5aS06ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgcmlnaHRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcmlnaHQ6MzksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBkb3duIGtleVxyXG4gICAgICogISN6aCDlkJHkuIvnrq3lpLTplK5cclxuICAgICAqIEBwcm9wZXJ0eSBkb3duXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGRvd246NDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBzZWxlY3Qga2V5XHJcbiAgICAgKiAhI3poIFNlbGVjdCDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBzZWxlY3RcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc2VsZWN0OjQxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgaW5zZXJ0IGtleVxyXG4gICAgICogISN6aCDmj5LlhaXplK5cclxuICAgICAqIEBwcm9wZXJ0eSBpbnNlcnRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgaW5zZXJ0OjQ1LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgRGVsZXRlIGtleVxyXG4gICAgICogISN6aCDliKDpmaTplK5cclxuICAgICAqIEBwcm9wZXJ0eSBEZWxldGVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgRGVsZXRlOjQ2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJzAnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXHJcbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCAwIOmUrlxyXG4gICAgICogQHByb3BlcnR5IDBcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgMDo0OCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICcxJyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxyXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgMSDplK5cclxuICAgICAqIEBwcm9wZXJ0eSAxXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIDE6NDksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnMicga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cclxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDIg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgMlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICAyOjUwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJzMnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXHJcbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCAzIOmUrlxyXG4gICAgICogQHByb3BlcnR5IDNcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgMzo1MSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICc0JyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxyXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgNCDplK5cclxuICAgICAqIEBwcm9wZXJ0eSA0XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIDQ6NTIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnNScga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cclxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDUg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgNVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICA1OjUzLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJzYnIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXHJcbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCA2IOmUrlxyXG4gICAgICogQHByb3BlcnR5IDZcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgNjo1NCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICc3JyBrZXkgb24gdGhlIHRvcCBvZiB0aGUgYWxwaGFudW1lcmljIGtleWJvYXJkLlxyXG4gICAgICogISN6aCDlrZfmr43plK7nm5jkuIrnmoQgNyDplK5cclxuICAgICAqIEBwcm9wZXJ0eSA3XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIDc6NTUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnOCcga2V5IG9uIHRoZSB0b3Agb2YgdGhlIGFscGhhbnVtZXJpYyBrZXlib2FyZC5cclxuICAgICAqICEjemgg5a2X5q+N6ZSu55uY5LiK55qEIDgg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgOFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICA4OjU2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJzknIGtleSBvbiB0aGUgdG9wIG9mIHRoZSBhbHBoYW51bWVyaWMga2V5Ym9hcmQuXHJcbiAgICAgKiAhI3poIOWtl+avjemUruebmOS4iueahCA5IOmUrlxyXG4gICAgICogQHByb3BlcnR5IDlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgOTo1NyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGEga2V5XHJcbiAgICAgKiAhI3poIEEg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgYVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBhOjY1LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgYiBrZXlcclxuICAgICAqICEjemggQiDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBiXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGI6NjYsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBjIGtleVxyXG4gICAgICogISN6aCBDIOmUrlxyXG4gICAgICogQHByb3BlcnR5IGNcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgYzo2NyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGQga2V5XHJcbiAgICAgKiAhI3poIEQg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBkOjY4LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZSBrZXlcclxuICAgICAqICEjemggRSDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGU6NjksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBmIGtleVxyXG4gICAgICogISN6aCBGIOmUrlxyXG4gICAgICogQHByb3BlcnR5IGZcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZjo3MCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGcga2V5XHJcbiAgICAgKiAhI3poIEcg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZ1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBnOjcxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgaCBrZXlcclxuICAgICAqICEjemggSCDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGg6NzIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBpIGtleVxyXG4gICAgICogISN6aCBJIOmUrlxyXG4gICAgICogQHByb3BlcnR5IGlcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgaTo3MyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGoga2V5XHJcbiAgICAgKiAhI3poIEog6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgalxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBqOjc0LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgayBrZXlcclxuICAgICAqICEjemggSyDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBrXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGs6NzUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBsIGtleVxyXG4gICAgICogISN6aCBMIOmUrlxyXG4gICAgICogQHByb3BlcnR5IGxcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbDo3NixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG0ga2V5XHJcbiAgICAgKiAhI3poIE0g6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgbVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBtOjc3LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbiBrZXlcclxuICAgICAqICEjemggTiDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBuXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG46NzgsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBvIGtleVxyXG4gICAgICogISN6aCBPIOmUrlxyXG4gICAgICogQHByb3BlcnR5IG9cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbzo3OSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHAga2V5XHJcbiAgICAgKiAhI3poIFAg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgcFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBwOjgwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcSBrZXlcclxuICAgICAqICEjemggUSDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBxXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHE6ODEsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSByIGtleVxyXG4gICAgICogISN6aCBSIOmUrlxyXG4gICAgICogQHByb3BlcnR5IHJcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgcjo4MixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHMga2V5XHJcbiAgICAgKiAhI3poIFMg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgc1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBzOjgzLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdCBrZXlcclxuICAgICAqICEjemggVCDplK5cclxuICAgICAqIEBwcm9wZXJ0eSB0XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHQ6ODQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSB1IGtleVxyXG4gICAgICogISN6aCBVIOmUrlxyXG4gICAgICogQHByb3BlcnR5IHVcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgdTo4NSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHYga2V5XHJcbiAgICAgKiAhI3poIFYg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgdlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB2Ojg2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgdyBrZXlcclxuICAgICAqICEjemggVyDplK5cclxuICAgICAqIEBwcm9wZXJ0eSB3XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHc6ODcsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSB4IGtleVxyXG4gICAgICogISN6aCBYIOmUrlxyXG4gICAgICogQHByb3BlcnR5IHhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgeDo4OCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIHkga2V5XHJcbiAgICAgKiAhI3poIFkg6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgeVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICB5Ojg5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgeiBrZXlcclxuICAgICAqICEjemggWiDplK5cclxuICAgICAqIEBwcm9wZXJ0eSB6XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHo6OTAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCAwXHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCAwXHJcbiAgICAgKiBAcHJvcGVydHkgbnVtMFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBudW0wOjk2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgMVxyXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggMVxyXG4gICAgICogQHByb3BlcnR5IG51bTFcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbnVtMTo5NyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDJcclxuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDJcclxuICAgICAqIEBwcm9wZXJ0eSBudW0yXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG51bTI6OTgsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCAzXHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCAzXHJcbiAgICAgKiBAcHJvcGVydHkgbnVtM1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBudW0zOjk5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgNFxyXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggNFxyXG4gICAgICogQHByb3BlcnR5IG51bTRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbnVtNDoxMDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCA1XHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCA1XHJcbiAgICAgKiBAcHJvcGVydHkgbnVtNVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBudW01OjEwMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDZcclxuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDZcclxuICAgICAqIEBwcm9wZXJ0eSBudW02XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG51bTY6MTAyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgN1xyXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggN1xyXG4gICAgICogQHByb3BlcnR5IG51bTdcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgbnVtNzoxMDMsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1lcmljIGtleXBhZCA4XHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCA4XHJcbiAgICAgKiBAcHJvcGVydHkgbnVtOFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBudW04OjEwNCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkIDlcclxuICAgICAqICEjemgg5pWw5a2X6ZSu55uYIDlcclxuICAgICAqIEBwcm9wZXJ0eSBudW05XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG51bTk6MTA1LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJyonXHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCAqXHJcbiAgICAgKiBAcHJvcGVydHkgKlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICAnKic6MTA2LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJysnXHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCArXHJcbiAgICAgKiBAcHJvcGVydHkgK1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICAnKyc6MTA3LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJy0nXHJcbiAgICAgKiAhI3poIOaVsOWtl+mUruebmCAtXHJcbiAgICAgKiBAcHJvcGVydHkgLVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICAnLSc6MTA5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgbnVtZXJpYyBrZXlwYWQgJ2RlbGV0ZSdcclxuICAgICAqICEjemgg5pWw5a2X6ZSu55uY5Yig6Zmk6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgbnVtZGVsXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgICdudW1kZWwnOjExMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG51bWVyaWMga2V5cGFkICcvJ1xyXG4gICAgICogISN6aCDmlbDlrZfplK7nm5ggL1xyXG4gICAgICogQHByb3BlcnR5IC9cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgJy8nOjExMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIEYxIGZ1bmN0aW9uIGtleVxyXG4gICAgICogISN6aCBGMSDlip/og73plK5cclxuICAgICAqIEBwcm9wZXJ0eSBmMVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmMToxMTIsIC8vZjEtZjEyIGRvbnQgd29yayBvbiBpZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgRjIgZnVuY3Rpb24ga2V5XHJcbiAgICAgKiAhI3poIEYyIOWKn+iDvemUrlxyXG4gICAgICogQHByb3BlcnR5IGYyXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGYyOjExMyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIEYzIGZ1bmN0aW9uIGtleVxyXG4gICAgICogISN6aCBGMyDlip/og73plK5cclxuICAgICAqIEBwcm9wZXJ0eSBmM1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmMzoxMTQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBGNCBmdW5jdGlvbiBrZXlcclxuICAgICAqICEjemggRjQg5Yqf6IO96ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZjRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZjQ6MTE1LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgRjUgZnVuY3Rpb24ga2V5XHJcbiAgICAgKiAhI3poIEY1IOWKn+iDvemUrlxyXG4gICAgICogQHByb3BlcnR5IGY1XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGY1OjExNixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIEY2IGZ1bmN0aW9uIGtleVxyXG4gICAgICogISN6aCBGNiDlip/og73plK5cclxuICAgICAqIEBwcm9wZXJ0eSBmNlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmNjoxMTcsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBGNyBmdW5jdGlvbiBrZXlcclxuICAgICAqICEjemggRjcg5Yqf6IO96ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZjdcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZjc6MTE4LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgRjggZnVuY3Rpb24ga2V5XHJcbiAgICAgKiAhI3poIEY4IOWKn+iDvemUrlxyXG4gICAgICogQHByb3BlcnR5IGY4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGY4OjExOSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIEY5IGZ1bmN0aW9uIGtleVxyXG4gICAgICogISN6aCBGOSDlip/og73plK5cclxuICAgICAqIEBwcm9wZXJ0eSBmOVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmOToxMjAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBGMTAgZnVuY3Rpb24ga2V5XHJcbiAgICAgKiAhI3poIEYxMCDlip/og73plK5cclxuICAgICAqIEBwcm9wZXJ0eSBmMTBcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZjEwOjEyMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIEYxMSBmdW5jdGlvbiBrZXlcclxuICAgICAqICEjemggRjExIOWKn+iDvemUrlxyXG4gICAgICogQHByb3BlcnR5IGYxMVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBmMTE6MTIyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgRjEyIGZ1bmN0aW9uIGtleVxyXG4gICAgICogISN6aCBGMTIg5Yqf6IO96ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZjEyXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGYxMjoxMjMsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBudW1sb2NrIGtleVxyXG4gICAgICogISN6aCDmlbDlrZfplIHlrprplK5cclxuICAgICAqIEBwcm9wZXJ0eSBudW1sb2NrXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIG51bWxvY2s6MTQ0LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgc2Nyb2xsIGxvY2sga2V5XHJcbiAgICAgKiAhI3poIOa7muWKqOmUgeWumumUrlxyXG4gICAgICogQHByb3BlcnR5IHNjcm9sbGxvY2tcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsbG9jazoxNDUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnOycga2V5LlxyXG4gICAgICogISN6aCDliIblj7fplK5cclxuICAgICAqIEBwcm9wZXJ0eSA7XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgICc7JzoxODYsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnOycga2V5LlxyXG4gICAgICogISN6aCDliIblj7fplK5cclxuICAgICAqIEBwcm9wZXJ0eSBzZW1pY29sb25cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgc2VtaWNvbG9uOjE4NixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICc9JyBrZXkuXHJcbiAgICAgKiAhI3poIOetieS6juWPt+mUrlxyXG4gICAgICogQHByb3BlcnR5IGVxdWFsXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGVxdWFsOjE4NyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICc9JyBrZXkuXHJcbiAgICAgKiAhI3poIOetieS6juWPt+mUrlxyXG4gICAgICogQHByb3BlcnR5ID1cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgJz0nOjE4NyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICcsJyBrZXkuXHJcbiAgICAgKiAhI3poIOmAl+WPt+mUrlxyXG4gICAgICogQHByb3BlcnR5ICxcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgJywnOjE4OCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICcsJyBrZXkuXHJcbiAgICAgKiAhI3poIOmAl+WPt+mUrlxyXG4gICAgICogQHByb3BlcnR5IGNvbW1hXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGNvbW1hOjE4OCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGRhc2ggJy0nIGtleS5cclxuICAgICAqICEjemgg5Lit5YiS57q/6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgZGFzaFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBkYXNoOjE4OSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICcuJyBrZXkuXHJcbiAgICAgKiAhI3poIOWPpeWPt+mUrlxyXG4gICAgICogQHByb3BlcnR5IC5cclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgJy4nOjE5MCxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICcuJyBrZXlcclxuICAgICAqICEjemgg5Y+l5Y+36ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgcGVyaW9kXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHBlcmlvZDoxOTAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBmb3J3YXJkIHNsYXNoIGtleVxyXG4gICAgICogISN6aCDmraPmlpzmnaDplK5cclxuICAgICAqIEBwcm9wZXJ0eSBmb3J3YXJkc2xhc2hcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZm9yd2FyZHNsYXNoOjE5MSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGdyYXZlIGtleVxyXG4gICAgICogISN6aCDmjInplK4gYFxyXG4gICAgICogQHByb3BlcnR5IGdyYXZlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGdyYXZlOjE5MixcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlICdbJyBrZXlcclxuICAgICAqICEjemgg5oyJ6ZSuIFtcclxuICAgICAqIEBwcm9wZXJ0eSBbXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgICdbJzoyMTksXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnWycga2V5XHJcbiAgICAgKiAhI3poIOaMiemUriBbXHJcbiAgICAgKiBAcHJvcGVydHkgb3BlbmJyYWNrZXRcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgb3BlbmJyYWNrZXQ6MjE5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJ1xcJyBrZXlcclxuICAgICAqICEjemgg5Y+N5pac5p2g6ZSuXHJcbiAgICAgKiBAcHJvcGVydHkgYmFja3NsYXNoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGJhY2tzbGFzaDoyMjAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSAnXScga2V5XHJcbiAgICAgKiAhI3poIOaMiemUriBdXHJcbiAgICAgKiBAcHJvcGVydHkgXVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICAnXSc6MjIxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgJ10nIGtleVxyXG4gICAgICogISN6aCDmjInplK4gXVxyXG4gICAgICogQHByb3BlcnR5IGNsb3NlYnJhY2tldFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBjbG9zZWJyYWNrZXQ6MjIxLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgcXVvdGUga2V5XHJcbiAgICAgKiAhI3poIOWNleW8leWPt+mUrlxyXG4gICAgICogQHByb3BlcnR5IHF1b3RlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIHF1b3RlOjIyMixcclxuXHJcbiAgICAvLyBnYW1lcGFkIGNvbnRyb2xsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBkcGFkIGxlZnQga2V5XHJcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHlt6ZcclxuICAgICAqIEBwcm9wZXJ0eSBkcGFkTGVmdFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBkcGFkTGVmdDoxMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZHBhZCByaWdodCBrZXlcclxuICAgICAqICEjemgg5a+86Iiq6ZSuIOWQkeWPs1xyXG4gICAgICogQHByb3BlcnR5IGRwYWRSaWdodFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBkcGFkUmlnaHQ6MTAwMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGRwYWQgdXAga2V5XHJcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHkuIpcclxuICAgICAqIEBwcm9wZXJ0eSBkcGFkVXBcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKiBAcmVhZG9ubHlcclxuICAgICAqL1xyXG4gICAgZHBhZFVwOjEwMDMsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBkcGFkIGRvd24ga2V5XHJcbiAgICAgKiAhI3poIOWvvOiIqumUriDlkJHkuItcclxuICAgICAqIEBwcm9wZXJ0eSBkcGFkRG93blxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqIEByZWFkb25seVxyXG4gICAgICovXHJcbiAgICBkcGFkRG93bjoxMDA0LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBUaGUgZHBhZCBjZW50ZXIga2V5XHJcbiAgICAgKiAhI3poIOWvvOiIqumUriDnoa7lrprplK5cclxuICAgICAqIEBwcm9wZXJ0eSBkcGFkQ2VudGVyXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKi9cclxuICAgIGRwYWRDZW50ZXI6MTAwNVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEltYWdlIGZvcm1hdHNcclxuICogQGVudW0gbWFjcm8uSW1hZ2VGb3JtYXRcclxuICovXHJcbmNjLm1hY3JvLkltYWdlRm9ybWF0ID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqIEltYWdlIEZvcm1hdDpKUEdcclxuICAgICAqIEBwcm9wZXJ0eSBKUEdcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEpQRzogMCxcclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2UgRm9ybWF0OlBOR1xyXG4gICAgICogQHByb3BlcnR5IFBOR1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUE5HOiAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbWFnZSBGb3JtYXQ6VElGRlxyXG4gICAgICogQHByb3BlcnR5IFRJRkZcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIFRJRkY6IDIsXHJcbiAgICAvKipcclxuICAgICAqIEltYWdlIEZvcm1hdDpXRUJQXHJcbiAgICAgKiBAcHJvcGVydHkgV0VCUFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgV0VCUDogMyxcclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2UgRm9ybWF0OlBWUlxyXG4gICAgICogQHByb3BlcnR5IFBWUlxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUFZSOiA0LFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbWFnZSBGb3JtYXQ6RVRDXHJcbiAgICAgKiBAcHJvcGVydHkgRVRDXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBFVEM6IDUsXHJcbiAgICAvKipcclxuICAgICAqIEltYWdlIEZvcm1hdDpTM1RDXHJcbiAgICAgKiBAcHJvcGVydHkgUzNUQ1xyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUzNUQzogNixcclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2UgRm9ybWF0OkFUSVRDXHJcbiAgICAgKiBAcHJvcGVydHkgQVRJVENcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIEFUSVRDOiA3LFxyXG4gICAgLyoqXHJcbiAgICAgKiBJbWFnZSBGb3JtYXQ6VEdBXHJcbiAgICAgKiBAcHJvcGVydHkgVEdBXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBUR0E6IDgsXHJcbiAgICAvKipcclxuICAgICAqIEltYWdlIEZvcm1hdDpSQVdEQVRBXHJcbiAgICAgKiBAcHJvcGVydHkgUkFXREFUQVxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgUkFXREFUQTogOSxcclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2UgRm9ybWF0OlVOS05PV05cclxuICAgICAqIEBwcm9wZXJ0eSBVTktOT1dOXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBVTktOT1dOOiAxMFxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEVudW0gZm9yIGJsZW5kIGZhY3RvclxyXG4gKiBSZWZlciB0bzogaHR0cDovL3d3dy5hbmRlcnNyaWdnZWxzZW4uZGsvZ2xibGVuZGZ1bmMucGhwXHJcbiAqICEjemhcclxuICog5re35ZCI5Zug5a2QXHJcbiAqIOWPr+WPguiAgzogaHR0cDovL3d3dy5hbmRlcnNyaWdnZWxzZW4uZGsvZ2xibGVuZGZ1bmMucGhwXHJcbiAqIEBlbnVtIG1hY3JvLkJsZW5kRmFjdG9yXHJcbiAqL1xyXG5jYy5tYWNyby5CbGVuZEZhY3RvciA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEFsbCB1c2VcclxuICAgICAqICEjemgg5YWo6YOo5L2/55SoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gT05FXHJcbiAgICAgKi9cclxuICAgIE9ORTogICAgICAgICAgICAgICAgICAgIDEsICAvL2NjLm1hY3JvLk9ORVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIE5vdCBhbGxcclxuICAgICAqICEjemgg5YWo6YOo5LiN55SoXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gWkVST1xyXG4gICAgICovXHJcbiAgICBaRVJPOiAgICAgICAgICAgICAgICAgICAwLCAgICAgIC8vY2MuWkVST1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFVzaW5nIHRoZSBzb3VyY2UgYWxwaGFcclxuICAgICAqICEjemgg5L2/55So5rqQ6aKc6Imy55qE6YCP5piO5bqmXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1JDX0FMUEhBXHJcbiAgICAgKi9cclxuICAgIFNSQ19BTFBIQTogICAgICAgICAgICAgIDB4MzAyLCAgLy9jYy5TUkNfQUxQSEFcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBVc2luZyB0aGUgc291cmNlIGNvbG9yXHJcbiAgICAgKiAhI3poIOS9v+eUqOa6kOminOiJslxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNSQ19DT0xPUlxyXG4gICAgICovXHJcbiAgICBTUkNfQ09MT1I6ICAgICAgICAgICAgICAweDMwMCwgIC8vY2MuU1JDX0NPTE9SXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVXNpbmcgdGhlIHRhcmdldCBhbHBoYVxyXG4gICAgICogISN6aCDkvb/nlKjnm67moIfpopzoibLnmoTpgI/mmI7luqZcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBEU1RfQUxQSEFcclxuICAgICAqL1xyXG4gICAgRFNUX0FMUEhBOiAgICAgICAgICAgICAgMHgzMDQsICAvL2NjLkRTVF9BTFBIQVxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFVzaW5nIHRoZSB0YXJnZXQgY29sb3JcclxuICAgICAqICEjemgg5L2/55So55uu5qCH6aKc6ImyXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRFNUX0NPTE9SXHJcbiAgICAgKi9cclxuICAgIERTVF9DT0xPUjogICAgICAgICAgICAgIDB4MzA2LCAgLy9jYy5EU1RfQ09MT1JcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNaW51cyB0aGUgc291cmNlIGFscGhhXHJcbiAgICAgKiAhI3poIOWHj+WOu+a6kOminOiJsueahOmAj+aYjuW6plxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE9ORV9NSU5VU19TUkNfQUxQSEFcclxuICAgICAqL1xyXG4gICAgT05FX01JTlVTX1NSQ19BTFBIQTogICAgMHgzMDMsICAvL2NjLk9ORV9NSU5VU19TUkNfQUxQSEFcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNaW51cyB0aGUgc291cmNlIGNvbG9yXHJcbiAgICAgKiAhI3poIOWHj+WOu+a6kOminOiJslxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE9ORV9NSU5VU19TUkNfQ09MT1JcclxuICAgICAqL1xyXG4gICAgT05FX01JTlVTX1NSQ19DT0xPUjogICAgMHgzMDEsICAvL2NjLk9ORV9NSU5VU19TUkNfQ09MT1JcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNaW51cyB0aGUgdGFyZ2V0IGFscGhhXHJcbiAgICAgKiAhI3poIOWHj+WOu+ebruagh+minOiJsueahOmAj+aYjuW6plxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE9ORV9NSU5VU19EU1RfQUxQSEFcclxuICAgICAqL1xyXG4gICAgT05FX01JTlVTX0RTVF9BTFBIQTogICAgMHgzMDUsICAvL2NjLk9ORV9NSU5VU19EU1RfQUxQSEFcclxuICAgIC8qKlxyXG4gICAgICogISNlbiBNaW51cyB0aGUgdGFyZ2V0IGNvbG9yXHJcbiAgICAgKiAhI3poIOWHj+WOu+ebruagh+minOiJslxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE9ORV9NSU5VU19EU1RfQ09MT1JcclxuICAgICAqL1xyXG4gICAgT05FX01JTlVTX0RTVF9DT0xPUjogICAgMHgzMDcsICAvL2NjLk9ORV9NSU5VU19EU1RfQ09MT1JcclxufSk7XHJcblxyXG4vKipcclxuICogQGVudW0gbWFjcm8uVGV4dEFsaWdubWVudFxyXG4gKi9cclxuY2MubWFjcm8uVGV4dEFsaWdubWVudCA9IGNjLkVudW0oe1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTEVGVFxyXG4gICAgICovXHJcbiAgICBMRUZUOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXHJcbiAgICAgKi9cclxuICAgIENFTlRFUjogMSxcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJJR0hUXHJcbiAgICAgKi9cclxuICAgIFJJR0hUOiAyXHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIEBlbnVtIFZlcnRpY2FsVGV4dEFsaWdubWVudFxyXG4gKi9cclxuY2MubWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50ID0gY2MuRW51bSh7XHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUT1BcclxuICAgICAqL1xyXG4gICAgVE9QOiAwLFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQ0VOVEVSXHJcbiAgICAgKi9cclxuICAgIENFTlRFUjogMSxcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJPVFRPTVxyXG4gICAgICovXHJcbiAgICBCT1RUT006IDJcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLm1hY3JvO1xyXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==