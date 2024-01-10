
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/deprecated.js';
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
var js = cc.js;

if (CC_DEBUG) {
  var deprecateEnum = function deprecateEnum(obj, oldPath, newPath, hasTypePrefixBefore) {
    if (!CC_SUPPORT_JIT) {
      return;
    }

    hasTypePrefixBefore = hasTypePrefixBefore !== false;
    var enumDef = Function('return ' + newPath)();
    var entries = cc.Enum.getList(enumDef);
    var delimiter = hasTypePrefixBefore ? '_' : '.';

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i].name;
      var oldPropName;

      if (hasTypePrefixBefore) {
        var oldTypeName = oldPath.split('.').slice(-1)[0];
        oldPropName = oldTypeName + '_' + entry;
      } else {
        oldPropName = entry;
      }

      js.get(obj, oldPropName, function (entry) {
        cc.errorID(1400, oldPath + delimiter + entry, newPath + '.' + entry);
        return enumDef[entry];
      }.bind(null, entry));
    }
  };

  var markAsRemoved = function markAsRemoved(ownerCtor, removedProps, ownerName) {
    if (!ownerCtor) {
      // 可能被裁剪了
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);
    removedProps.forEach(function (prop) {
      function error() {
        cc.errorID(1406, ownerName, prop);
      }

      js.getset(ownerCtor.prototype, prop, error, error);
    });
  };

  var markAsDeprecated = function markAsDeprecated(ownerCtor, deprecatedProps, ownerName) {
    if (!ownerCtor) {
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);
    var descriptors = Object.getOwnPropertyDescriptors(ownerCtor.prototype);
    deprecatedProps.forEach(function (prop) {
      var deprecatedProp = prop[0];
      var newProp = prop[1];
      var descriptor = descriptors[deprecatedProp];
      js.getset(ownerCtor.prototype, deprecatedProp, function () {
        cc.warnID(1400, ownerName + "." + deprecatedProp, ownerName + "." + newProp);
        return descriptor.get.call(this);
      }, function (v) {
        cc.warnID(1400, ownerName + "." + deprecatedProp, ownerName + "." + newProp);
        descriptor.set.call(this, v);
      });
    });
  };

  var markAsRemovedInObject = function markAsRemovedInObject(ownerObj, removedProps, ownerName) {
    if (!ownerObj) {
      // 可能被裁剪了
      return;
    }

    removedProps.forEach(function (prop) {
      function error() {
        cc.errorID(1406, ownerName, prop);
      }

      js.getset(ownerObj, prop, error);
    });
  };

  var provideClearError = function provideClearError(owner, obj, ownerName) {
    if (!owner) {
      // 可能被裁剪了
      return;
    }

    var className = ownerName || cc.js.getClassName(owner);
    var Info = 'Sorry, ' + className + '.%s is removed, please use %s instead.';

    var _loop = function _loop() {
      function define(prop, getset) {
        function accessor(newProp) {
          cc.error(Info, prop, newProp);
        }

        if (!Array.isArray(getset)) {
          getset = getset.split(',').map(function (x) {
            return x.trim();
          });
        }

        try {
          js.getset(owner, prop, accessor.bind(null, getset[0]), getset[1] && accessor.bind(null, getset[1]));
        } catch (e) {}
      }

      getset = obj[prop];

      if (prop[0] === '*') {
        // get set
        etProp = prop.slice(1);
        define('g' + etProp, getset);
        define('s' + etProp, getset);
      } else {
        prop.split(',').map(function (x) {
          return x.trim();
        }).forEach(function (x) {
          define(x, getset);
        });
      }
    };

    for (var prop in obj) {
      var getset;
      var etProp;

      _loop();
    }
  };

  var markFunctionWarning = function markFunctionWarning(ownerCtor, obj, ownerName) {
    if (!ownerCtor) {
      // 可能被裁剪了
      return;
    }

    ownerName = ownerName || js.getClassName(ownerCtor);

    for (var prop in obj) {
      (function () {
        var propName = prop;
        var originFunc = ownerCtor[propName];
        if (!originFunc) return;

        function warn() {
          cc.warn('Sorry, %s.%s is deprecated. Please use %s instead', ownerName, propName, obj[propName]);
          return originFunc.apply(this, arguments);
        }

        ownerCtor[propName] = warn;
      })();
    }
  }; // remove cc.info


  js.get(cc, 'info', function () {
    cc.errorID(1400, 'cc.info', 'cc.log');
    return cc.log;
  }); // cc.spriteFrameCache

  js.get(cc, "spriteFrameCache", function () {
    cc.errorID(1404);
  }); // cc.vmath

  js.get(cc, 'vmath', function () {
    cc.warnID(1400, 'cc.vmath', 'cc.math');
    return cc.math;
  });
  js.get(cc.math, 'vec2', function () {
    cc.warnID(1400, 'cc.vmath.vec2', 'cc.Vec2');
    return cc.Vec2;
  });
  js.get(cc.math, 'vec3', function () {
    cc.warnID(1400, 'cc.vmath.vec3', 'cc.Vec3');
    return cc.Vec3;
  });
  js.get(cc.math, 'vec4', function () {
    cc.warnID(1400, 'cc.vmath.vec4', 'cc.Vec4');
    return cc.Vec4;
  });
  js.get(cc.math, 'mat4', function () {
    cc.warnID(1400, 'cc.vmath.mat4', 'cc.Mat4');
    return cc.Mat4;
  });
  js.get(cc.math, 'mat3', function () {
    cc.warnID(1400, 'cc.vmath.mat3', 'cc.Mat3');
    return cc.Mat3;
  });
  js.get(cc.math, 'quat', function () {
    cc.warnID(1400, 'cc.vmath.quat', 'cc.Quat');
    return cc.Quat;
  }); // SpriteFrame

  js.get(cc.SpriteFrame.prototype, '_textureLoaded', function () {
    cc.errorID(1400, 'spriteFrame._textureLoaded', 'spriteFrame.textureLoaded()');
    return this.textureLoaded();
  });
  markAsRemoved(cc.SpriteFrame, ['addLoadedEventListener']);
  markFunctionWarning(cc.Sprite.prototype, {
    setState: 'cc.Sprite.setMaterial',
    getState: 'cc.Sprite.getMaterial'
  }, 'cc.Sprite');
  js.get(cc.SpriteFrame.prototype, 'clearTexture', function () {
    cc.errorID(1406, 'cc.SpriteFrame', 'clearTexture');
    return function () {};
  }); // cc.textureCache

  js.get(cc, 'textureCache', function () {
    cc.errorID(1406, 'cc', 'textureCache');
  }); // Texture

  var Texture2D = cc.Texture2D;
  js.get(Texture2D.prototype, 'releaseTexture', function () {
    cc.errorID(1400, 'texture.releaseTexture()', 'texture.destroy()');
    return this.destroy;
  });
  js.get(Texture2D.prototype, 'getName', function () {
    cc.errorID(1400, 'texture.getName()', 'texture._glID');
    return function () {
      return this._glID || null;
    };
  });
  js.get(Texture2D.prototype, 'isLoaded', function () {
    cc.errorID(1400, 'texture.isLoaded function', 'texture.loaded property');
    return function () {
      return this.loaded;
    };
  });
  js.get(Texture2D.prototype, 'setAntiAliasTexParameters', function () {
    cc.errorID(1400, 'texture.setAntiAliasTexParameters()', 'texture.setFilters(cc.Texture2D.Filter.LINEAR, cc.Texture2D.Filter.LINEAR)');
    return function () {
      this.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR);
    };
  });
  js.get(Texture2D.prototype, 'setAliasTexParameters', function () {
    cc.errorID(1400, 'texture.setAntiAliasTexParameters()', 'texture.setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST)');
    return function () {
      this.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
    };
  }); // cc.macro

  markAsRemovedInObject(cc.macro, ['ENABLE_GL_STATE_CACHE', 'FIX_ARTIFACTS_BY_STRECHING_TEXEL'], 'cc.macro');
  provideClearError(cc.macro, {
    PI: 'Math.PI',
    PI2: 'Math.PI * 2',
    FLT_MAX: 'Number.MAX_VALUE',
    FLT_MIN: 'Number.MIN_VALUE',
    UINT_MAX: 'Number.MAX_SAFE_INTEGER'
  }, 'cc.macro'); // cc.game

  markAsRemovedInObject(cc.game, ['CONFIG_KEY'], 'cc.game'); // cc.sys

  markAsRemovedInObject(cc.sys, ['dumpRoot', 'cleanScript', 'BROWSER_TYPE_WECHAT_GAME', 'BROWSER_TYPE_WECHAT_GAME_SUB', 'BROWSER_TYPE_BAIDU_GAME', 'BROWSER_TYPE_BAIDU_GAME_SUB', 'BROWSER_TYPE_XIAOMI_GAME', 'BROWSER_TYPE_ALIPAY_GAME'], 'cc.sys'); // cc.Director

  provideClearError(cc.Director, {
    EVENT_PROJECTION_CHANGED: '',
    EVENT_BEFORE_VISIT: 'EVENT_AFTER_UPDATE',
    EVENT_AFTER_VISIT: 'EVENT_BEFORE_DRAW'
  }, 'cc.Director');
  markFunctionWarning(cc.Director.prototype, {
    convertToGL: 'cc.view.convertToLocationInView',
    convertToUI: '',
    getWinSize: 'cc.winSize',
    getWinSizeInPixels: 'cc.winSize',
    getVisibleSize: 'cc.view.getVisibleSize',
    getVisibleOrigin: 'cc.view.getVisibleOrigin',
    purgeCachedData: 'cc.assetManager.releaseAll',
    setDepthTest: 'cc.Camera.main.depth',
    setClearColor: 'cc.Camera.main.backgroundColor',
    getRunningScene: 'cc.director.getScene',
    getAnimationInterval: 'cc.game.getFrameRate',
    setAnimationInterval: 'cc.game.setFrameRate',
    isDisplayStats: 'cc.debug.isDisplayStats',
    setDisplayStats: 'cc.debug.setDisplayStats',
    stopAnimation: 'cc.game.pause',
    startAnimation: 'cc.game.resume'
  }, 'cc.Director');
  markAsRemoved(cc.Director, ['pushScene', 'popScene', 'popToRootScene', 'popToSceneStackLevel', 'setProjection', 'getProjection'], 'cc.Director'); // Scheduler

  provideClearError(cc.Scheduler, {
    scheduleCallbackForTarget: 'schedule',
    scheduleUpdateForTarget: 'scheduleUpdate',
    unscheduleCallbackForTarget: 'unschedule',
    unscheduleUpdateForTarget: 'unscheduleUpdate',
    unscheduleAllCallbacksForTarget: 'unscheduleAllForTarget',
    unscheduleAllCallbacks: 'unscheduleAll',
    unscheduleAllCallbacksWithMinPriority: 'unscheduleAllWithMinPriority'
  }, 'cc.Scheduler'); // cc.view

  provideClearError(cc.view, {
    adjustViewPort: 'adjustViewportMeta',
    setViewPortInPoints: 'setViewportInPoints',
    getViewPortRect: 'getViewportRect'
  }, 'cc.view');
  markAsRemovedInObject(cc.view, ['isViewReady', 'setTargetDensityDPI', 'getTargetDensityDPI', 'setFrameZoomFactor', 'canSetContentScaleFactor', 'setContentTranslateLeftTop', 'getContentTranslateLeftTop', 'setViewName', 'getViewName'], 'cc.view'); // cc.PhysicsManager

  markAsRemoved(cc.PhysicsManager, ['attachDebugDrawToCamera', 'detachDebugDrawFromCamera']); // cc.CollisionManager

  markAsRemoved(cc.CollisionManager, ['attachDebugDrawToCamera', 'detachDebugDrawFromCamera']); // cc.Node

  provideClearError(cc._BaseNode.prototype, {
    'tag': 'name',
    'getTag': 'name',
    'setTag': 'name',
    'getChildByTag': 'getChildByName',
    'removeChildByTag': 'getChildByName(name).destroy()'
  });
  markAsRemoved(cc.Node, ['_cascadeColorEnabled', 'cascadeColor', 'isCascadeColorEnabled', 'setCascadeColorEnabled', '_cascadeOpacityEnabled', 'cascadeOpacity', 'isCascadeOpacityEnabled', 'setCascadeOpacityEnabled', 'opacityModifyRGB', 'isOpacityModifyRGB', 'setOpacityModifyRGB', 'ignoreAnchor', 'isIgnoreAnchorPointForPosition', 'ignoreAnchorPointForPosition', 'isRunning', '_sgNode']);
  markFunctionWarning(cc.Node.prototype, {
    getNodeToParentTransform: 'getLocalMatrix',
    getNodeToParentTransformAR: 'getLocalMatrix',
    getNodeToWorldTransform: 'getWorldMatrix',
    getNodeToWorldTransformAR: 'getWorldMatrix',
    getParentToNodeTransform: 'getLocalMatrix',
    getWorldToNodeTransform: 'getWorldMatrix',
    convertTouchToNodeSpace: 'convertToNodeSpaceAR',
    convertTouchToNodeSpaceAR: 'convertToNodeSpaceAR',
    convertToWorldSpace: 'convertToWorldSpaceAR',
    convertToNodeSpace: 'convertToNodeSpaceAR'
  });
  provideClearError(cc.Node.prototype, {
    getRotationX: 'rotationX',
    setRotationX: 'rotationX',
    getRotationY: 'rotationY',
    setRotationY: 'rotationY',
    getPositionX: 'x',
    setPositionX: 'x',
    getPositionY: 'y',
    setPositionY: 'y',
    getSkewX: 'skewX',
    setSkewX: 'skewX',
    getSkewY: 'skewY',
    setSkewY: 'skewY',
    getScaleX: 'scaleX',
    setScaleX: 'scaleX',
    getScaleY: 'scaleY',
    setScaleY: 'scaleY',
    getOpacity: 'opacity',
    setOpacity: 'opacity',
    getColor: 'color',
    setColor: 'color',
    getLocalZOrder: 'zIndex',
    setLocalZOrder: 'zIndex'
  });
  provideClearError(cc.Sprite.prototype, {
    setInsetLeft: 'cc.SpriteFrame insetLeft',
    setInsetRight: 'cc.SpriteFrame insetRight',
    setInsetTop: 'cc.SpriteFrame insetTop',
    setInsetBottom: 'cc.SpriteFrame insetBottom'
  }); // cc.Material

  cc.Material.getInstantiatedBuiltinMaterial = cc.MaterialVariant.createWithBuiltin;
  cc.Material.getInstantiatedMaterial = cc.MaterialVariant.create;
  markFunctionWarning(cc.Material, {
    getInstantiatedBuiltinMaterial: 'cc.MaterialVariant.createWithBuiltin',
    getInstantiatedMaterial: 'cc.MaterialVariant.create'
  }); // cc.RenderComponent

  cc.js.getset(cc.RenderComponent.prototype, 'sharedMaterials', function () {
    cc.warnID(1400, 'sharedMaterials', 'getMaterials');
    return this.materials;
  }, function (v) {
    cc.warnID(1400, 'sharedMaterials', 'setMaterial');
    this.materials = v;
  }); // cc.Camera

  markFunctionWarning(cc.Camera.prototype, {
    getNodeToCameraTransform: 'getWorldToScreenMatrix2D',
    getCameraToWorldPoint: 'getScreenToWorldPoint',
    getWorldToCameraPoint: 'getWorldToScreenPoint',
    getCameraToWorldMatrix: 'getScreenToWorldMatrix2D',
    getWorldToCameraMatrix: 'getWorldToScreenMatrix2D'
  });
  markAsRemoved(cc.Camera, ['addTarget', 'removeTarget', 'getTargets']); // SCENE

  var ERR = '"%s" is not defined in the Scene, it is only defined in normal nodes.';
  CC_EDITOR || Object.defineProperties(cc.Scene.prototype, {
    active: {
      get: function get() {
        cc.error(ERR, 'active');
        return true;
      },
      set: function set() {
        cc.error(ERR, 'active');
      }
    },
    activeInHierarchy: {
      get: function get() {
        cc.error(ERR, 'activeInHierarchy');
        return true;
      }
    },
    getComponent: {
      get: function get() {
        cc.error(ERR, 'getComponent');
        return function () {
          return null;
        };
      }
    },
    addComponent: {
      get: function get() {
        cc.error(ERR, 'addComponent');
        return function () {
          return null;
        };
      }
    }
  }); // cc.dynamicAtlasManager

  markAsRemovedInObject(cc.dynamicAtlasManager, ['minFrameSize'], 'cc.dynamicAtlasManager'); // light component

  if (cc.Light) {
    markAsRemovedInObject(cc.Light.prototype, ['shadowDepthScale'], 'cc.Light.prototype');
  } // Value types


  provideClearError(cc, {
    // AffineTransform
    affineTransformMake: 'cc.AffineTransform.create',
    affineTransformMakeIdentity: 'cc.AffineTransform.identity',
    affineTransformClone: 'cc.AffineTransform.clone',
    affineTransformConcat: 'cc.AffineTransform.concat',
    affineTransformConcatIn: 'cc.AffineTransform.concat',
    affineTransformInvert: 'cc.AffineTransform.invert',
    affineTransformInvertIn: 'cc.AffineTransform.invert',
    affineTransformInvertOut: 'cc.AffineTransform.invert',
    affineTransformEqualToTransform: 'cc.AffineTransform.equal',
    pointApplyAffineTransform: 'cc.AffineTransform.transformVec2',
    sizeApplyAffineTransform: 'cc.AffineTransform.transformSize',
    rectApplyAffineTransform: 'cc.AffineTransform.transformRect',
    obbApplyAffineTransform: 'cc.AffineTransform.transformObb',
    // Vec2
    pointEqualToPoint: 'cc.Vec2 equals',
    // Size
    sizeEqualToSize: 'cc.Size equals',
    // Rect
    rectEqualToRect: 'rectA.equals(rectB)',
    rectContainsRect: 'rectA.containsRect(rectB)',
    rectContainsPoint: 'rect.contains(vec2)',
    rectOverlapsRect: 'rectA.intersects(rectB)',
    rectIntersectsRect: 'rectA.intersects(rectB)',
    rectIntersection: 'rectA.intersection(intersection, rectB)',
    rectUnion: 'rectA.union(union, rectB)',
    rectGetMaxX: 'rect.xMax',
    rectGetMidX: 'rect.center.x',
    rectGetMinX: 'rect.xMin',
    rectGetMaxY: 'rect.yMax',
    rectGetMidY: 'rect.center.y',
    rectGetMinY: 'rect.yMin',
    // Color
    colorEqual: 'colorA.equals(colorB)',
    hexToColor: 'color.fromHEX(hexColor)',
    colorToHex: 'color.toHEX()',
    // Enums
    TextAlignment: 'cc.macro.TextAlignment',
    VerticalTextAlignment: 'cc.macro.VerticalTextAlignment',
    // Point Extensions
    pNeg: 'p.neg()',
    pAdd: 'p1.add(p2)',
    pSub: 'p1.sub(p2)',
    pMult: 'p.mul(factor)',
    pMidpoint: 'p1.add(p2).mul(0.5)',
    pDot: 'p1.dot(p2)',
    pCross: 'p1.cross(p2)',
    pPerp: 'p.rotate(-90 * Math.PI / 180)',
    pRPerp: 'p.rotate(90 * Math.PI / 180)',
    pProject: 'p1.project(p2)',
    pLengthSQ: 'p.magSqr()',
    pDistanceSQ: 'p1.sub(p2).magSqr()',
    pLength: 'p.mag()',
    pDistance: 'p1.sub(p2).mag()',
    pNormalize: 'p.normalize()',
    pForAngle: 'cc.v2(Math.cos(a), Math.sin(a))',
    pToAngle: 'Math.atan2(v.y, v.x)',
    pZeroIn: 'p.x = p.y = 0',
    pIn: 'p1.set(p2)',
    pMultIn: 'p.mulSelf(factor)',
    pSubIn: 'p1.subSelf(p2)',
    pAddIn: 'p1.addSelf(p2)',
    pNormalizeIn: 'p.normalizeSelf()',
    pSameAs: 'p1.equals(p2)',
    pAngle: 'v1.angle(v2)',
    pAngleSigned: 'v1.signAngle(v2)',
    pRotateByAngle: 'p.rotate(radians)',
    pCompMult: 'v1.multiply(v2)',
    pFuzzyEqual: 'v1.fuzzyEquals(v2, tolerance)',
    pLerp: 'p.lerp(endPoint, ratio)',
    pClamp: 'p.clampf(min_inclusive, max_inclusive)',
    rand: 'Math.random() * 0xffffff',
    randomMinus1To1: '(Math.random() - 0.5) * 2',
    container: 'cc.game.container',
    _canvas: 'cc.game.canvas',
    _renderType: 'cc.game.renderType',
    _getError: 'cc.debug.getError',
    _initDebugSetting: 'cc.debug._resetDebugSetting',
    DebugMode: 'cc.debug.DebugMode'
  }, 'cc');
  markAsRemovedInObject(cc, ['blendFuncDisable', 'pFromSize', 'pCompOp', 'pIntersectPoint', 'pSegmentIntersect', 'pLineIntersect', 'obbApplyMatrix', 'getImageFormatByData', 'initEngine'], 'cc');
  markFunctionWarning(cc, {
    // cc.p
    p: 'cc.v2'
  }, 'cc'); // cc.Rect

  provideClearError(cc.Rect, {
    contain: 'rectA.contains(rectB)',
    transformMat4: 'rect.transformMat4(out, mat4)'
  }); // cc.Color

  provideClearError(cc.Color, {
    rgb2hsv: 'color.toHSV()',
    hsv2rgb: 'color.fromHSV(h, s, v)'
  });
  markFunctionWarning(cc.Color, {
    fromHex: 'cc.Color.fromHEX'
  }); // macro functions

  js.get(cc, 'lerp', function () {
    cc.errorID(1400, 'cc.lerp', 'cc.misc.lerp');
    return cc.misc.lerp;
  });
  js.get(cc, 'random0To1', function () {
    cc.errorID(1400, 'cc.random0To1', 'Math.random');
    return Math.random;
  });
  js.get(cc, 'degreesToRadians', function () {
    cc.errorID(1400, 'cc.degreesToRadians', 'cc.misc.degreesToRadians');
    return cc.misc.degreesToRadians;
  });
  js.get(cc, 'radiansToDegrees', function () {
    cc.errorID(1400, 'cc.radiansToDegrees', 'cc.misc.radiansToDegrees');
    return cc.misc.radiansToDegrees;
  });
  js.get(cc, 'clampf', function () {
    cc.errorID(1400, 'cc.clampf', 'cc.misc.clampf');
    return cc.misc.clampf;
  });
  js.get(cc, 'clamp01', function () {
    cc.errorID(1400, 'cc.clamp01', 'cc.misc.clamp01');
    return cc.misc.clamp01;
  });
  js.get(cc, 'ImageFormat', function () {
    cc.errorID(1400, 'cc.ImageFormat', 'cc.macro.ImageFormat');
    return cc.macro.ImageFormat;
  });
  js.get(cc, 'KEY', function () {
    cc.errorID(1400, 'cc.KEY', 'cc.macro.KEY');
    return cc.macro.KEY;
  });
  js.get(cc, 'Easing', function () {
    cc.errorID(1400, 'cc.Easing', 'cc.easing');
    return cc.easing;
  }); // cc.isChildClassOf

  js.get(cc, 'isChildClassOf', function () {
    cc.errorID(1400, 'cc.isChildClassOf', 'cc.js.isChildClassOf');
    return cc.js.isChildClassOf;
  }); // dragon bones

  if (typeof dragonBones !== 'undefined') {
    js.get(dragonBones.CCFactory, 'getFactory', function () {
      cc.errorID(1400, 'dragonBones.CCFactory.getFactory', 'dragonBones.CCFactory.getInstance');
      return dragonBones.CCFactory.getInstance;
    });
  } // renderEngine


  cc.renderer.renderEngine = {
    get gfx() {
      cc.warnID(1400, 'cc.renderer.renderEngine.gfx', 'cc.gfx');
      return cc.gfx;
    },

    get math() {
      cc.warnID(1400, 'cc.renderer.renderEngine.math', 'cc.math');
      return cc.vmath;
    },

    get InputAssembler() {
      cc.warnID(1400, 'cc.renderer.renderEngine.InputAssembler', 'cc.renderer.InputAssembler');
      return cc.renderer.InputAssembler;
    }

  }; // audio

  markAsRemovedInObject(cc.audioEngine, ['getProfile', 'preload', 'setMaxWebAudioSize'], 'cc.audioEngine');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGRlcHJlY2F0ZWQuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIkNDX0RFQlVHIiwiZGVwcmVjYXRlRW51bSIsIm9iaiIsIm9sZFBhdGgiLCJuZXdQYXRoIiwiaGFzVHlwZVByZWZpeEJlZm9yZSIsIkNDX1NVUFBPUlRfSklUIiwiZW51bURlZiIsIkZ1bmN0aW9uIiwiZW50cmllcyIsIkVudW0iLCJnZXRMaXN0IiwiZGVsaW1pdGVyIiwiaSIsImxlbmd0aCIsImVudHJ5IiwibmFtZSIsIm9sZFByb3BOYW1lIiwib2xkVHlwZU5hbWUiLCJzcGxpdCIsInNsaWNlIiwiZ2V0IiwiZXJyb3JJRCIsImJpbmQiLCJtYXJrQXNSZW1vdmVkIiwib3duZXJDdG9yIiwicmVtb3ZlZFByb3BzIiwib3duZXJOYW1lIiwiZ2V0Q2xhc3NOYW1lIiwiZm9yRWFjaCIsInByb3AiLCJlcnJvciIsImdldHNldCIsInByb3RvdHlwZSIsIm1hcmtBc0RlcHJlY2F0ZWQiLCJkZXByZWNhdGVkUHJvcHMiLCJkZXNjcmlwdG9ycyIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZXByZWNhdGVkUHJvcCIsIm5ld1Byb3AiLCJkZXNjcmlwdG9yIiwid2FybklEIiwiY2FsbCIsInYiLCJzZXQiLCJtYXJrQXNSZW1vdmVkSW5PYmplY3QiLCJvd25lck9iaiIsInByb3ZpZGVDbGVhckVycm9yIiwib3duZXIiLCJjbGFzc05hbWUiLCJJbmZvIiwiZGVmaW5lIiwiYWNjZXNzb3IiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJ4IiwidHJpbSIsImUiLCJldFByb3AiLCJtYXJrRnVuY3Rpb25XYXJuaW5nIiwicHJvcE5hbWUiLCJvcmlnaW5GdW5jIiwid2FybiIsImFwcGx5IiwiYXJndW1lbnRzIiwibG9nIiwibWF0aCIsIlZlYzIiLCJWZWMzIiwiVmVjNCIsIk1hdDQiLCJNYXQzIiwiUXVhdCIsIlNwcml0ZUZyYW1lIiwidGV4dHVyZUxvYWRlZCIsIlNwcml0ZSIsInNldFN0YXRlIiwiZ2V0U3RhdGUiLCJUZXh0dXJlMkQiLCJkZXN0cm95IiwiX2dsSUQiLCJsb2FkZWQiLCJzZXRGaWx0ZXJzIiwiRmlsdGVyIiwiTElORUFSIiwiTkVBUkVTVCIsIm1hY3JvIiwiUEkiLCJQSTIiLCJGTFRfTUFYIiwiRkxUX01JTiIsIlVJTlRfTUFYIiwiZ2FtZSIsInN5cyIsIkRpcmVjdG9yIiwiRVZFTlRfUFJPSkVDVElPTl9DSEFOR0VEIiwiRVZFTlRfQkVGT1JFX1ZJU0lUIiwiRVZFTlRfQUZURVJfVklTSVQiLCJjb252ZXJ0VG9HTCIsImNvbnZlcnRUb1VJIiwiZ2V0V2luU2l6ZSIsImdldFdpblNpemVJblBpeGVscyIsImdldFZpc2libGVTaXplIiwiZ2V0VmlzaWJsZU9yaWdpbiIsInB1cmdlQ2FjaGVkRGF0YSIsInNldERlcHRoVGVzdCIsInNldENsZWFyQ29sb3IiLCJnZXRSdW5uaW5nU2NlbmUiLCJnZXRBbmltYXRpb25JbnRlcnZhbCIsInNldEFuaW1hdGlvbkludGVydmFsIiwiaXNEaXNwbGF5U3RhdHMiLCJzZXREaXNwbGF5U3RhdHMiLCJzdG9wQW5pbWF0aW9uIiwic3RhcnRBbmltYXRpb24iLCJTY2hlZHVsZXIiLCJzY2hlZHVsZUNhbGxiYWNrRm9yVGFyZ2V0Iiwic2NoZWR1bGVVcGRhdGVGb3JUYXJnZXQiLCJ1bnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQiLCJ1bnNjaGVkdWxlVXBkYXRlRm9yVGFyZ2V0IiwidW5zY2hlZHVsZUFsbENhbGxiYWNrc0ZvclRhcmdldCIsInVuc2NoZWR1bGVBbGxDYWxsYmFja3MiLCJ1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzV2l0aE1pblByaW9yaXR5IiwidmlldyIsImFkanVzdFZpZXdQb3J0Iiwic2V0Vmlld1BvcnRJblBvaW50cyIsImdldFZpZXdQb3J0UmVjdCIsIlBoeXNpY3NNYW5hZ2VyIiwiQ29sbGlzaW9uTWFuYWdlciIsIl9CYXNlTm9kZSIsIk5vZGUiLCJnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm0iLCJnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUiIsImdldE5vZGVUb1dvcmxkVHJhbnNmb3JtIiwiZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1BUiIsImdldFBhcmVudFRvTm9kZVRyYW5zZm9ybSIsImdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtIiwiY29udmVydFRvdWNoVG9Ob2RlU3BhY2UiLCJjb252ZXJ0VG91Y2hUb05vZGVTcGFjZUFSIiwiY29udmVydFRvV29ybGRTcGFjZSIsImNvbnZlcnRUb05vZGVTcGFjZSIsImdldFJvdGF0aW9uWCIsInNldFJvdGF0aW9uWCIsImdldFJvdGF0aW9uWSIsInNldFJvdGF0aW9uWSIsImdldFBvc2l0aW9uWCIsInNldFBvc2l0aW9uWCIsImdldFBvc2l0aW9uWSIsInNldFBvc2l0aW9uWSIsImdldFNrZXdYIiwic2V0U2tld1giLCJnZXRTa2V3WSIsInNldFNrZXdZIiwiZ2V0U2NhbGVYIiwic2V0U2NhbGVYIiwiZ2V0U2NhbGVZIiwic2V0U2NhbGVZIiwiZ2V0T3BhY2l0eSIsInNldE9wYWNpdHkiLCJnZXRDb2xvciIsInNldENvbG9yIiwiZ2V0TG9jYWxaT3JkZXIiLCJzZXRMb2NhbFpPcmRlciIsInNldEluc2V0TGVmdCIsInNldEluc2V0UmlnaHQiLCJzZXRJbnNldFRvcCIsInNldEluc2V0Qm90dG9tIiwiTWF0ZXJpYWwiLCJnZXRJbnN0YW50aWF0ZWRCdWlsdGluTWF0ZXJpYWwiLCJNYXRlcmlhbFZhcmlhbnQiLCJjcmVhdGVXaXRoQnVpbHRpbiIsImdldEluc3RhbnRpYXRlZE1hdGVyaWFsIiwiY3JlYXRlIiwiUmVuZGVyQ29tcG9uZW50IiwibWF0ZXJpYWxzIiwiQ2FtZXJhIiwiZ2V0Tm9kZVRvQ2FtZXJhVHJhbnNmb3JtIiwiZ2V0Q2FtZXJhVG9Xb3JsZFBvaW50IiwiZ2V0V29ybGRUb0NhbWVyYVBvaW50IiwiZ2V0Q2FtZXJhVG9Xb3JsZE1hdHJpeCIsImdldFdvcmxkVG9DYW1lcmFNYXRyaXgiLCJFUlIiLCJDQ19FRElUT1IiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiU2NlbmUiLCJhY3RpdmUiLCJhY3RpdmVJbkhpZXJhcmNoeSIsImdldENvbXBvbmVudCIsImFkZENvbXBvbmVudCIsImR5bmFtaWNBdGxhc01hbmFnZXIiLCJMaWdodCIsImFmZmluZVRyYW5zZm9ybU1ha2UiLCJhZmZpbmVUcmFuc2Zvcm1NYWtlSWRlbnRpdHkiLCJhZmZpbmVUcmFuc2Zvcm1DbG9uZSIsImFmZmluZVRyYW5zZm9ybUNvbmNhdCIsImFmZmluZVRyYW5zZm9ybUNvbmNhdEluIiwiYWZmaW5lVHJhbnNmb3JtSW52ZXJ0IiwiYWZmaW5lVHJhbnNmb3JtSW52ZXJ0SW4iLCJhZmZpbmVUcmFuc2Zvcm1JbnZlcnRPdXQiLCJhZmZpbmVUcmFuc2Zvcm1FcXVhbFRvVHJhbnNmb3JtIiwicG9pbnRBcHBseUFmZmluZVRyYW5zZm9ybSIsInNpemVBcHBseUFmZmluZVRyYW5zZm9ybSIsInJlY3RBcHBseUFmZmluZVRyYW5zZm9ybSIsIm9iYkFwcGx5QWZmaW5lVHJhbnNmb3JtIiwicG9pbnRFcXVhbFRvUG9pbnQiLCJzaXplRXF1YWxUb1NpemUiLCJyZWN0RXF1YWxUb1JlY3QiLCJyZWN0Q29udGFpbnNSZWN0IiwicmVjdENvbnRhaW5zUG9pbnQiLCJyZWN0T3ZlcmxhcHNSZWN0IiwicmVjdEludGVyc2VjdHNSZWN0IiwicmVjdEludGVyc2VjdGlvbiIsInJlY3RVbmlvbiIsInJlY3RHZXRNYXhYIiwicmVjdEdldE1pZFgiLCJyZWN0R2V0TWluWCIsInJlY3RHZXRNYXhZIiwicmVjdEdldE1pZFkiLCJyZWN0R2V0TWluWSIsImNvbG9yRXF1YWwiLCJoZXhUb0NvbG9yIiwiY29sb3JUb0hleCIsIlRleHRBbGlnbm1lbnQiLCJWZXJ0aWNhbFRleHRBbGlnbm1lbnQiLCJwTmVnIiwicEFkZCIsInBTdWIiLCJwTXVsdCIsInBNaWRwb2ludCIsInBEb3QiLCJwQ3Jvc3MiLCJwUGVycCIsInBSUGVycCIsInBQcm9qZWN0IiwicExlbmd0aFNRIiwicERpc3RhbmNlU1EiLCJwTGVuZ3RoIiwicERpc3RhbmNlIiwicE5vcm1hbGl6ZSIsInBGb3JBbmdsZSIsInBUb0FuZ2xlIiwicFplcm9JbiIsInBJbiIsInBNdWx0SW4iLCJwU3ViSW4iLCJwQWRkSW4iLCJwTm9ybWFsaXplSW4iLCJwU2FtZUFzIiwicEFuZ2xlIiwicEFuZ2xlU2lnbmVkIiwicFJvdGF0ZUJ5QW5nbGUiLCJwQ29tcE11bHQiLCJwRnV6enlFcXVhbCIsInBMZXJwIiwicENsYW1wIiwicmFuZCIsInJhbmRvbU1pbnVzMVRvMSIsImNvbnRhaW5lciIsIl9jYW52YXMiLCJfcmVuZGVyVHlwZSIsIl9nZXRFcnJvciIsIl9pbml0RGVidWdTZXR0aW5nIiwiRGVidWdNb2RlIiwicCIsIlJlY3QiLCJjb250YWluIiwidHJhbnNmb3JtTWF0NCIsIkNvbG9yIiwicmdiMmhzdiIsImhzdjJyZ2IiLCJmcm9tSGV4IiwibWlzYyIsImxlcnAiLCJNYXRoIiwicmFuZG9tIiwiZGVncmVlc1RvUmFkaWFucyIsInJhZGlhbnNUb0RlZ3JlZXMiLCJjbGFtcGYiLCJjbGFtcDAxIiwiSW1hZ2VGb3JtYXQiLCJLRVkiLCJlYXNpbmciLCJpc0NoaWxkQ2xhc3NPZiIsImRyYWdvbkJvbmVzIiwiQ0NGYWN0b3J5IiwiZ2V0SW5zdGFuY2UiLCJyZW5kZXJlciIsInJlbmRlckVuZ2luZSIsImdmeCIsInZtYXRoIiwiSW5wdXRBc3NlbWJsZXIiLCJhdWRpb0VuZ2luZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUVBLElBQUlFLFFBQUosRUFBYztBQUFBLE1BRURDLGFBRkMsR0FFVixTQUFTQSxhQUFULENBQXdCQyxHQUF4QixFQUE2QkMsT0FBN0IsRUFBc0ND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Q2xCcFMsTUFBQUEsRUFBRSxDQUFDMkMsTUFBSCxDQUFVLElBQVYsRUFBZ0IseUNBQWhCLEVBQTJELDRCQUEzRDtBQUNBLGFBQU8zQyxFQUFFLENBQUNnUyxRQUFILENBQVlJLGNBQW5CO0FBQ0g7O0FBWnNCLEdBQTNCLENBOXBCVSxDQTZxQlY7O0FBQ0FyUCxFQUFBQSxxQkFBcUIsQ0FBQy9DLEVBQUUsQ0FBQ3FTLFdBQUosRUFBaUIsQ0FDbEMsWUFEa0MsRUFFbEMsU0FGa0MsRUFHbEMsb0JBSGtDLENBQWpCLEVBSWxCLGdCQUprQixDQUFyQjtBQUtIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXHJcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cclxudmFyIGpzID0gY2MuanM7XHJcblxyXG5pZiAoQ0NfREVCVUcpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBkZXByZWNhdGVFbnVtIChvYmosIG9sZFBhdGgsIG5ld1BhdGgsIGhhc1R5cGVQcmVmaXhCZWZvcmUpIHtcclxuICAgICAgICBpZiAoIUNDX1NVUFBPUlRfSklUKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFzVHlwZVByZWZpeEJlZm9yZSA9IGhhc1R5cGVQcmVmaXhCZWZvcmUgIT09IGZhbHNlO1xyXG4gICAgICAgIHZhciBlbnVtRGVmID0gRnVuY3Rpb24oJ3JldHVybiAnICsgbmV3UGF0aCkoKTtcclxuICAgICAgICB2YXIgZW50cmllcyA9IGNjLkVudW0uZ2V0TGlzdChlbnVtRGVmKTtcclxuICAgICAgICB2YXIgZGVsaW1pdGVyID0gaGFzVHlwZVByZWZpeEJlZm9yZSA/ICdfJyA6ICcuJztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICB2YXIgb2xkUHJvcE5hbWU7XHJcbiAgICAgICAgICAgIGlmIChoYXNUeXBlUHJlZml4QmVmb3JlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkVHlwZU5hbWUgPSBvbGRQYXRoLnNwbGl0KCcuJykuc2xpY2UoLTEpWzBdO1xyXG4gICAgICAgICAgICAgICAgb2xkUHJvcE5hbWUgPSBvbGRUeXBlTmFtZSArICdfJyArIGVudHJ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb2xkUHJvcE5hbWUgPSBlbnRyeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBqcy5nZXQob2JqLCBvbGRQcm9wTmFtZSwgZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE0MDAsIG9sZFBhdGggKyBkZWxpbWl0ZXIgKyBlbnRyeSwgbmV3UGF0aCArICcuJyArIGVudHJ5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbnVtRGVmW2VudHJ5XTtcclxuICAgICAgICAgICAgfS5iaW5kKG51bGwsIGVudHJ5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcmtBc1JlbW92ZWQgKG93bmVyQ3RvciwgcmVtb3ZlZFByb3BzLCBvd25lck5hbWUpIHtcclxuICAgICAgICBpZiAoIW93bmVyQ3Rvcikge1xyXG4gICAgICAgICAgICAvLyDlj6/og73ooqvoo4HliarkuoZcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvd25lck5hbWUgPSBvd25lck5hbWUgfHwganMuZ2V0Q2xhc3NOYW1lKG93bmVyQ3Rvcik7XHJcbiAgICAgICAgcmVtb3ZlZFByb3BzLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3IgKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgxNDA2LCBvd25lck5hbWUsIHByb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGpzLmdldHNldChvd25lckN0b3IucHJvdG90eXBlLCBwcm9wLCBlcnJvciwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcmtBc0RlcHJlY2F0ZWQgKG93bmVyQ3RvciwgZGVwcmVjYXRlZFByb3BzLCBvd25lck5hbWUpIHtcclxuICAgICAgICBpZiAoIW93bmVyQ3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG93bmVyTmFtZSA9IG93bmVyTmFtZSB8fCBqcy5nZXRDbGFzc05hbWUob3duZXJDdG9yKTtcclxuICAgICAgICBsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvd25lckN0b3IucHJvdG90eXBlKTtcclxuICAgICAgICBkZXByZWNhdGVkUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBsZXQgZGVwcmVjYXRlZFByb3AgPSBwcm9wWzBdO1xyXG4gICAgICAgICAgICBsZXQgbmV3UHJvcCA9IHByb3BbMV07XHJcbiAgICAgICAgICAgIGxldCBkZXNjcmlwdG9yID0gZGVzY3JpcHRvcnNbZGVwcmVjYXRlZFByb3BdO1xyXG4gICAgICAgICAgICBqcy5nZXRzZXQob3duZXJDdG9yLnByb3RvdHlwZSwgZGVwcmVjYXRlZFByb3AsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCBgJHtvd25lck5hbWV9LiR7ZGVwcmVjYXRlZFByb3B9YCwgYCR7b3duZXJOYW1lfS4ke25ld1Byb3B9YCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvci5nZXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCBgJHtvd25lck5hbWV9LiR7ZGVwcmVjYXRlZFByb3B9YCwgYCR7b3duZXJOYW1lfS4ke25ld1Byb3B9YCk7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLnNldC5jYWxsKHRoaXMsIHYpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1hcmtBc1JlbW92ZWRJbk9iamVjdCAob3duZXJPYmosIHJlbW92ZWRQcm9wcywgb3duZXJOYW1lKSB7XHJcbiAgICAgICAgaWYgKCFvd25lck9iaikge1xyXG4gICAgICAgICAgICAvLyDlj6/og73ooqvoo4HliarkuoZcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW1vdmVkUHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBlcnJvciAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDE0MDYsIG93bmVyTmFtZSwgcHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganMuZ2V0c2V0KG93bmVyT2JqLCBwcm9wLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvdmlkZUNsZWFyRXJyb3IgKG93bmVyLCBvYmosIG93bmVyTmFtZSkge1xyXG4gICAgICAgIGlmICghb3duZXIpIHtcclxuICAgICAgICAgICAgLy8g5Y+v6IO96KKr6KOB5Ymq5LqGXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IG93bmVyTmFtZSB8fCBjYy5qcy5nZXRDbGFzc05hbWUob3duZXIpO1xyXG4gICAgICAgIHZhciBJbmZvID0gJ1NvcnJ5LCAnICsgY2xhc3NOYW1lICsgJy4lcyBpcyByZW1vdmVkLCBwbGVhc2UgdXNlICVzIGluc3RlYWQuJztcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZpbmUgKHByb3AsIGdldHNldCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYWNjZXNzb3IgKG5ld1Byb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihJbmZvLCBwcm9wLCBuZXdQcm9wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShnZXRzZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0c2V0ID0gZ2V0c2V0LnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAganMuZ2V0c2V0KG93bmVyLCBwcm9wLCBhY2Nlc3Nvci5iaW5kKG51bGwsIGdldHNldFswXSksIGdldHNldFsxXSAmJiBhY2Nlc3Nvci5iaW5kKG51bGwsIGdldHNldFsxXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGdldHNldCA9IG9ialtwcm9wXTtcclxuICAgICAgICAgICAgaWYgKHByb3BbMF0gPT09ICcqJykge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHNldFxyXG4gICAgICAgICAgICAgICAgdmFyIGV0UHJvcCA9IHByb3Auc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBkZWZpbmUoJ2cnICsgZXRQcm9wLCBnZXRzZXQpO1xyXG4gICAgICAgICAgICAgICAgZGVmaW5lKCdzJyArIGV0UHJvcCwgZ2V0c2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHByb3Auc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHgudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lKHgsIGdldHNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFya0Z1bmN0aW9uV2FybmluZyAob3duZXJDdG9yLCBvYmosIG93bmVyTmFtZSkge1xyXG4gICAgICAgIGlmICghb3duZXJDdG9yKSB7XHJcbiAgICAgICAgICAgIC8vIOWPr+iDveiiq+ijgeWJquS6hlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG93bmVyTmFtZSA9IG93bmVyTmFtZSB8fCBqcy5nZXRDbGFzc05hbWUob3duZXJDdG9yKTtcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHByb3A7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3JpZ2luRnVuYyA9IG93bmVyQ3Rvcltwcm9wTmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbkZ1bmMpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB3YXJuICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKCdTb3JyeSwgJXMuJXMgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSAlcyBpbnN0ZWFkJywgb3duZXJOYW1lLCBwcm9wTmFtZSwgb2JqW3Byb3BOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbkZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvd25lckN0b3JbcHJvcE5hbWVdID0gd2FybjtcclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZW1vdmUgY2MuaW5mb1xyXG4gICAganMuZ2V0KGNjLCAnaW5mbycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdjYy5pbmZvJywgJ2NjLmxvZycpO1xyXG4gICAgICAgIHJldHVybiBjYy5sb2c7XHJcbiAgICB9KTtcclxuICAgIC8vIGNjLnNwcml0ZUZyYW1lQ2FjaGVcclxuICAgIGpzLmdldChjYywgXCJzcHJpdGVGcmFtZUNhY2hlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2Mudm1hdGhcclxuICAgIGpzLmdldChjYywgJ3ZtYXRoJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2Mudm1hdGgnLCAnY2MubWF0aCcpO1xyXG4gICAgICAgIHJldHVybiBjYy5tYXRoO1xyXG4gICAgfSk7XHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ3ZlYzInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC52ZWMyJywgJ2NjLlZlYzInKTtcclxuICAgICAgICByZXR1cm4gY2MuVmVjMjtcclxuICAgIH0pXHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ3ZlYzMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC52ZWMzJywgJ2NjLlZlYzMnKTtcclxuICAgICAgICByZXR1cm4gY2MuVmVjMztcclxuICAgIH0pXHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ3ZlYzQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC52ZWM0JywgJ2NjLlZlYzQnKTtcclxuICAgICAgICByZXR1cm4gY2MuVmVjNDtcclxuICAgIH0pXHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ21hdDQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC5tYXQ0JywgJ2NjLk1hdDQnKTtcclxuICAgICAgICByZXR1cm4gY2MuTWF0NDtcclxuICAgIH0pXHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ21hdDMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC5tYXQzJywgJ2NjLk1hdDMnKTtcclxuICAgICAgICByZXR1cm4gY2MuTWF0MztcclxuICAgIH0pXHJcbiAgICBqcy5nZXQoY2MubWF0aCwgJ3F1YXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy52bWF0aC5xdWF0JywgJ2NjLlF1YXQnKTtcclxuICAgICAgICByZXR1cm4gY2MuUXVhdDtcclxuICAgIH0pXHJcblxyXG4gICAgLy8gU3ByaXRlRnJhbWVcclxuICAgIGpzLmdldChjYy5TcHJpdGVGcmFtZS5wcm90b3R5cGUsICdfdGV4dHVyZUxvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdzcHJpdGVGcmFtZS5fdGV4dHVyZUxvYWRlZCcsICdzcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCknKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlTG9hZGVkKCk7XHJcbiAgICB9KTtcclxuICAgIG1hcmtBc1JlbW92ZWQoY2MuU3ByaXRlRnJhbWUsIFtcclxuICAgICAgICAnYWRkTG9hZGVkRXZlbnRMaXN0ZW5lcidcclxuICAgIF0pO1xyXG4gICAgbWFya0Z1bmN0aW9uV2FybmluZyhjYy5TcHJpdGUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgc2V0U3RhdGU6ICdjYy5TcHJpdGUuc2V0TWF0ZXJpYWwnLFxyXG4gICAgICAgIGdldFN0YXRlOiAnY2MuU3ByaXRlLmdldE1hdGVyaWFsJ1xyXG4gICAgfSwgJ2NjLlNwcml0ZScpO1xyXG5cclxuICAgIGpzLmdldChjYy5TcHJpdGVGcmFtZS5wcm90b3R5cGUsICdjbGVhclRleHR1cmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDA2LCAnY2MuU3ByaXRlRnJhbWUnLCAnY2xlYXJUZXh0dXJlJyk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2MudGV4dHVyZUNhY2hlXHJcbiAgICBqcy5nZXQoY2MsICd0ZXh0dXJlQ2FjaGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDA2LCAnY2MnLCAndGV4dHVyZUNhY2hlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUZXh0dXJlXHJcbiAgICBsZXQgVGV4dHVyZTJEID0gY2MuVGV4dHVyZTJEO1xyXG4gICAganMuZ2V0KFRleHR1cmUyRC5wcm90b3R5cGUsICdyZWxlYXNlVGV4dHVyZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICd0ZXh0dXJlLnJlbGVhc2VUZXh0dXJlKCknLCAndGV4dHVyZS5kZXN0cm95KCknKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kZXN0cm95O1xyXG4gICAgfSk7XHJcblxyXG4gICAganMuZ2V0KFRleHR1cmUyRC5wcm90b3R5cGUsICdnZXROYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUuZ2V0TmFtZSgpJywgJ3RleHR1cmUuX2dsSUQnKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2xJRCB8fCBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBqcy5nZXQoVGV4dHVyZTJELnByb3RvdHlwZSwgJ2lzTG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUuaXNMb2FkZWQgZnVuY3Rpb24nLCAndGV4dHVyZS5sb2FkZWQgcHJvcGVydHknKTtcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAganMuZ2V0KFRleHR1cmUyRC5wcm90b3R5cGUsICdzZXRBbnRpQWxpYXNUZXhQYXJhbWV0ZXJzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUuc2V0QW50aUFsaWFzVGV4UGFyYW1ldGVycygpJywgJ3RleHR1cmUuc2V0RmlsdGVycyhjYy5UZXh0dXJlMkQuRmlsdGVyLkxJTkVBUiwgY2MuVGV4dHVyZTJELkZpbHRlci5MSU5FQVIpJyk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRGaWx0ZXJzKFRleHR1cmUyRC5GaWx0ZXIuTElORUFSLCBUZXh0dXJlMkQuRmlsdGVyLkxJTkVBUik7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpzLmdldChUZXh0dXJlMkQucHJvdG90eXBlLCAnc2V0QWxpYXNUZXhQYXJhbWV0ZXJzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ3RleHR1cmUuc2V0QW50aUFsaWFzVGV4UGFyYW1ldGVycygpJywgJ3RleHR1cmUuc2V0RmlsdGVycyhjYy5UZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QsIGNjLlRleHR1cmUyRC5GaWx0ZXIuTkVBUkVTVCknKTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEZpbHRlcnMoVGV4dHVyZTJELkZpbHRlci5ORUFSRVNULCBUZXh0dXJlMkQuRmlsdGVyLk5FQVJFU1QpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjYy5tYWNyb1xyXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLm1hY3JvLCBbXHJcbiAgICAgICAgJ0VOQUJMRV9HTF9TVEFURV9DQUNIRScsXHJcbiAgICAgICAgJ0ZJWF9BUlRJRkFDVFNfQllfU1RSRUNISU5HX1RFWEVMJyxcclxuICAgIF0sICdjYy5tYWNybycpO1xyXG5cclxuICAgIHByb3ZpZGVDbGVhckVycm9yKGNjLm1hY3JvLCB7XHJcbiAgICAgICAgUEk6ICdNYXRoLlBJJyxcclxuICAgICAgICBQSTI6ICdNYXRoLlBJICogMicsXHJcbiAgICAgICAgRkxUX01BWDogJ051bWJlci5NQVhfVkFMVUUnLFxyXG4gICAgICAgIEZMVF9NSU46ICdOdW1iZXIuTUlOX1ZBTFVFJyxcclxuICAgICAgICBVSU5UX01BWDogJ051bWJlci5NQVhfU0FGRV9JTlRFR0VSJ1xyXG4gICAgfSwgJ2NjLm1hY3JvJyk7XHJcblxyXG4gICAgLy8gY2MuZ2FtZVxyXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLmdhbWUsIFtcclxuICAgICAgICAnQ09ORklHX0tFWScsXHJcbiAgICBdLCAnY2MuZ2FtZScpO1xyXG5cclxuICAgIC8vIGNjLnN5c1xyXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLnN5cywgW1xyXG4gICAgICAgICdkdW1wUm9vdCcsXHJcbiAgICAgICAgJ2NsZWFuU2NyaXB0JyxcclxuICAgICAgICAnQlJPV1NFUl9UWVBFX1dFQ0hBVF9HQU1FJyxcclxuICAgICAgICAnQlJPV1NFUl9UWVBFX1dFQ0hBVF9HQU1FX1NVQicsXHJcbiAgICAgICAgJ0JST1dTRVJfVFlQRV9CQUlEVV9HQU1FJyxcclxuICAgICAgICAnQlJPV1NFUl9UWVBFX0JBSURVX0dBTUVfU1VCJyxcclxuICAgICAgICAnQlJPV1NFUl9UWVBFX1hJQU9NSV9HQU1FJyxcclxuICAgICAgICAnQlJPV1NFUl9UWVBFX0FMSVBBWV9HQU1FJyxcclxuICAgIF0sICdjYy5zeXMnKTtcclxuXHJcbiAgICAvLyBjYy5EaXJlY3RvclxyXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MuRGlyZWN0b3IsIHtcclxuICAgICAgICBFVkVOVF9QUk9KRUNUSU9OX0NIQU5HRUQ6ICcnLFxyXG4gICAgICAgIEVWRU5UX0JFRk9SRV9WSVNJVDogJ0VWRU5UX0FGVEVSX1VQREFURScsXHJcbiAgICAgICAgRVZFTlRfQUZURVJfVklTSVQ6ICdFVkVOVF9CRUZPUkVfRFJBVycsXHJcbiAgICB9LCAnY2MuRGlyZWN0b3InKTtcclxuICAgIG1hcmtGdW5jdGlvbldhcm5pbmcoY2MuRGlyZWN0b3IucHJvdG90eXBlLCB7XHJcbiAgICAgICAgY29udmVydFRvR0w6ICdjYy52aWV3LmNvbnZlcnRUb0xvY2F0aW9uSW5WaWV3JyxcclxuICAgICAgICBjb252ZXJ0VG9VSTogJycsXHJcbiAgICAgICAgZ2V0V2luU2l6ZTogJ2NjLndpblNpemUnLFxyXG4gICAgICAgIGdldFdpblNpemVJblBpeGVsczogJ2NjLndpblNpemUnLFxyXG4gICAgICAgIGdldFZpc2libGVTaXplOiAnY2Mudmlldy5nZXRWaXNpYmxlU2l6ZScsXHJcbiAgICAgICAgZ2V0VmlzaWJsZU9yaWdpbjogJ2NjLnZpZXcuZ2V0VmlzaWJsZU9yaWdpbicsXHJcbiAgICAgICAgcHVyZ2VDYWNoZWREYXRhOiAnY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBbGwnLFxyXG4gICAgICAgIHNldERlcHRoVGVzdDogJ2NjLkNhbWVyYS5tYWluLmRlcHRoJyxcclxuICAgICAgICBzZXRDbGVhckNvbG9yOiAnY2MuQ2FtZXJhLm1haW4uYmFja2dyb3VuZENvbG9yJyxcclxuICAgICAgICBnZXRSdW5uaW5nU2NlbmU6ICdjYy5kaXJlY3Rvci5nZXRTY2VuZScsXHJcbiAgICAgICAgZ2V0QW5pbWF0aW9uSW50ZXJ2YWw6ICdjYy5nYW1lLmdldEZyYW1lUmF0ZScsXHJcbiAgICAgICAgc2V0QW5pbWF0aW9uSW50ZXJ2YWw6ICdjYy5nYW1lLnNldEZyYW1lUmF0ZScsXHJcbiAgICAgICAgaXNEaXNwbGF5U3RhdHM6ICdjYy5kZWJ1Zy5pc0Rpc3BsYXlTdGF0cycsXHJcbiAgICAgICAgc2V0RGlzcGxheVN0YXRzOiAnY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzJyxcclxuICAgICAgICBzdG9wQW5pbWF0aW9uOiAnY2MuZ2FtZS5wYXVzZScsXHJcbiAgICAgICAgc3RhcnRBbmltYXRpb246ICdjYy5nYW1lLnJlc3VtZScsXHJcbiAgICB9LCAnY2MuRGlyZWN0b3InKTtcclxuICAgIG1hcmtBc1JlbW92ZWQoY2MuRGlyZWN0b3IsIFtcclxuICAgICAgICAncHVzaFNjZW5lJyxcclxuICAgICAgICAncG9wU2NlbmUnLFxyXG4gICAgICAgICdwb3BUb1Jvb3RTY2VuZScsXHJcbiAgICAgICAgJ3BvcFRvU2NlbmVTdGFja0xldmVsJyxcclxuICAgICAgICAnc2V0UHJvamVjdGlvbicsXHJcbiAgICAgICAgJ2dldFByb2plY3Rpb24nLFxyXG4gICAgXSwgJ2NjLkRpcmVjdG9yJyk7XHJcblxyXG4gICAgLy8gU2NoZWR1bGVyXHJcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5TY2hlZHVsZXIsIHtcclxuICAgICAgICBzY2hlZHVsZUNhbGxiYWNrRm9yVGFyZ2V0OiAnc2NoZWR1bGUnLFxyXG4gICAgICAgIHNjaGVkdWxlVXBkYXRlRm9yVGFyZ2V0OiAnc2NoZWR1bGVVcGRhdGUnLFxyXG4gICAgICAgIHVuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldDogJ3Vuc2NoZWR1bGUnLFxyXG4gICAgICAgIHVuc2NoZWR1bGVVcGRhdGVGb3JUYXJnZXQ6ICd1bnNjaGVkdWxlVXBkYXRlJyxcclxuICAgICAgICB1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzRm9yVGFyZ2V0OiAndW5zY2hlZHVsZUFsbEZvclRhcmdldCcsXHJcbiAgICAgICAgdW5zY2hlZHVsZUFsbENhbGxiYWNrczogJ3Vuc2NoZWR1bGVBbGwnLFxyXG4gICAgICAgIHVuc2NoZWR1bGVBbGxDYWxsYmFja3NXaXRoTWluUHJpb3JpdHk6ICd1bnNjaGVkdWxlQWxsV2l0aE1pblByaW9yaXR5J1xyXG4gICAgfSwgJ2NjLlNjaGVkdWxlcicpO1xyXG5cclxuICAgIC8vIGNjLnZpZXdcclxuICAgIHByb3ZpZGVDbGVhckVycm9yKGNjLnZpZXcsIHtcclxuICAgICAgICBhZGp1c3RWaWV3UG9ydDogJ2FkanVzdFZpZXdwb3J0TWV0YScsXHJcbiAgICAgICAgc2V0Vmlld1BvcnRJblBvaW50czogJ3NldFZpZXdwb3J0SW5Qb2ludHMnLFxyXG4gICAgICAgIGdldFZpZXdQb3J0UmVjdDogJ2dldFZpZXdwb3J0UmVjdCdcclxuICAgIH0sICdjYy52aWV3Jyk7XHJcbiAgICBtYXJrQXNSZW1vdmVkSW5PYmplY3QoY2MudmlldywgW1xyXG4gICAgICAgICdpc1ZpZXdSZWFkeScsXHJcbiAgICAgICAgJ3NldFRhcmdldERlbnNpdHlEUEknLFxyXG4gICAgICAgICdnZXRUYXJnZXREZW5zaXR5RFBJJyxcclxuICAgICAgICAnc2V0RnJhbWVab29tRmFjdG9yJyxcclxuICAgICAgICAnY2FuU2V0Q29udGVudFNjYWxlRmFjdG9yJyxcclxuICAgICAgICAnc2V0Q29udGVudFRyYW5zbGF0ZUxlZnRUb3AnLFxyXG4gICAgICAgICdnZXRDb250ZW50VHJhbnNsYXRlTGVmdFRvcCcsXHJcbiAgICAgICAgJ3NldFZpZXdOYW1lJyxcclxuICAgICAgICAnZ2V0Vmlld05hbWUnXHJcbiAgICBdLCAnY2MudmlldycpO1xyXG5cclxuICAgIC8vIGNjLlBoeXNpY3NNYW5hZ2VyXHJcbiAgICBtYXJrQXNSZW1vdmVkKGNjLlBoeXNpY3NNYW5hZ2VyLCBbXHJcbiAgICAgICAgJ2F0dGFjaERlYnVnRHJhd1RvQ2FtZXJhJyxcclxuICAgICAgICAnZGV0YWNoRGVidWdEcmF3RnJvbUNhbWVyYScsXHJcbiAgICBdKTtcclxuXHJcbiAgICAvLyBjYy5Db2xsaXNpb25NYW5hZ2VyXHJcbiAgICBtYXJrQXNSZW1vdmVkKGNjLkNvbGxpc2lvbk1hbmFnZXIsIFtcclxuICAgICAgICAnYXR0YWNoRGVidWdEcmF3VG9DYW1lcmEnLFxyXG4gICAgICAgICdkZXRhY2hEZWJ1Z0RyYXdGcm9tQ2FtZXJhJyxcclxuICAgIF0pO1xyXG5cclxuICAgIC8vIGNjLk5vZGVcclxuICAgIHByb3ZpZGVDbGVhckVycm9yKGNjLl9CYXNlTm9kZS5wcm90b3R5cGUsIHtcclxuICAgICAgICAndGFnJzogJ25hbWUnLFxyXG4gICAgICAgICdnZXRUYWcnOiAnbmFtZScsXHJcbiAgICAgICAgJ3NldFRhZyc6ICduYW1lJyxcclxuICAgICAgICAnZ2V0Q2hpbGRCeVRhZyc6ICdnZXRDaGlsZEJ5TmFtZScsXHJcbiAgICAgICAgJ3JlbW92ZUNoaWxkQnlUYWcnOiAnZ2V0Q2hpbGRCeU5hbWUobmFtZSkuZGVzdHJveSgpJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgbWFya0FzUmVtb3ZlZChjYy5Ob2RlLCBbXHJcbiAgICAgICAgJ19jYXNjYWRlQ29sb3JFbmFibGVkJyxcclxuICAgICAgICAnY2FzY2FkZUNvbG9yJyxcclxuICAgICAgICAnaXNDYXNjYWRlQ29sb3JFbmFibGVkJyxcclxuICAgICAgICAnc2V0Q2FzY2FkZUNvbG9yRW5hYmxlZCcsXHJcbiAgICAgICAgJ19jYXNjYWRlT3BhY2l0eUVuYWJsZWQnLFxyXG4gICAgICAgICdjYXNjYWRlT3BhY2l0eScsXHJcbiAgICAgICAgJ2lzQ2FzY2FkZU9wYWNpdHlFbmFibGVkJyxcclxuICAgICAgICAnc2V0Q2FzY2FkZU9wYWNpdHlFbmFibGVkJyxcclxuICAgICAgICAnb3BhY2l0eU1vZGlmeVJHQicsXHJcbiAgICAgICAgJ2lzT3BhY2l0eU1vZGlmeVJHQicsXHJcbiAgICAgICAgJ3NldE9wYWNpdHlNb2RpZnlSR0InLFxyXG4gICAgICAgICdpZ25vcmVBbmNob3InLFxyXG4gICAgICAgICdpc0lnbm9yZUFuY2hvclBvaW50Rm9yUG9zaXRpb24nLFxyXG4gICAgICAgICdpZ25vcmVBbmNob3JQb2ludEZvclBvc2l0aW9uJyxcclxuICAgICAgICAnaXNSdW5uaW5nJyxcclxuICAgICAgICAnX3NnTm9kZScsXHJcbiAgICBdKTtcclxuXHJcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLk5vZGUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtOiAnZ2V0TG9jYWxNYXRyaXgnLFxyXG4gICAgICAgIGdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSOiAnZ2V0TG9jYWxNYXRyaXgnLFxyXG4gICAgICAgIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtOiAnZ2V0V29ybGRNYXRyaXgnLFxyXG4gICAgICAgIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVI6ICdnZXRXb3JsZE1hdHJpeCcsXHJcbiAgICAgICAgZ2V0UGFyZW50VG9Ob2RlVHJhbnNmb3JtOiAnZ2V0TG9jYWxNYXRyaXgnLFxyXG4gICAgICAgIGdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtOiAnZ2V0V29ybGRNYXRyaXgnLFxyXG4gICAgICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlOiAnY29udmVydFRvTm9kZVNwYWNlQVInLFxyXG4gICAgICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVI6ICdjb252ZXJ0VG9Ob2RlU3BhY2VBUicsXHJcbiAgICAgICAgY29udmVydFRvV29ybGRTcGFjZTogJ2NvbnZlcnRUb1dvcmxkU3BhY2VBUicsXHJcbiAgICAgICAgY29udmVydFRvTm9kZVNwYWNlOiAnY29udmVydFRvTm9kZVNwYWNlQVInXHJcbiAgICB9KTtcclxuXHJcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5Ob2RlLnByb3RvdHlwZSwge1xyXG4gICAgICAgIGdldFJvdGF0aW9uWDogJ3JvdGF0aW9uWCcsXHJcbiAgICAgICAgc2V0Um90YXRpb25YOiAncm90YXRpb25YJyxcclxuICAgICAgICBnZXRSb3RhdGlvblk6ICdyb3RhdGlvblknLFxyXG4gICAgICAgIHNldFJvdGF0aW9uWTogJ3JvdGF0aW9uWScsXHJcbiAgICAgICAgZ2V0UG9zaXRpb25YOiAneCcsXHJcbiAgICAgICAgc2V0UG9zaXRpb25YOiAneCcsXHJcbiAgICAgICAgZ2V0UG9zaXRpb25ZOiAneScsXHJcbiAgICAgICAgc2V0UG9zaXRpb25ZOiAneScsXHJcbiAgICAgICAgZ2V0U2tld1g6ICdza2V3WCcsXHJcbiAgICAgICAgc2V0U2tld1g6ICdza2V3WCcsXHJcbiAgICAgICAgZ2V0U2tld1k6ICdza2V3WScsXHJcbiAgICAgICAgc2V0U2tld1k6ICdza2V3WScsXHJcbiAgICAgICAgZ2V0U2NhbGVYOiAnc2NhbGVYJyxcclxuICAgICAgICBzZXRTY2FsZVg6ICdzY2FsZVgnLFxyXG4gICAgICAgIGdldFNjYWxlWTogJ3NjYWxlWScsXHJcbiAgICAgICAgc2V0U2NhbGVZOiAnc2NhbGVZJyxcclxuICAgICAgICBnZXRPcGFjaXR5OiAnb3BhY2l0eScsXHJcbiAgICAgICAgc2V0T3BhY2l0eTogJ29wYWNpdHknLFxyXG4gICAgICAgIGdldENvbG9yOiAnY29sb3InLFxyXG4gICAgICAgIHNldENvbG9yOiAnY29sb3InLFxyXG4gICAgICAgIGdldExvY2FsWk9yZGVyOiAnekluZGV4JyxcclxuICAgICAgICBzZXRMb2NhbFpPcmRlcjogJ3pJbmRleCcsXHJcbiAgICB9KTtcclxuXHJcbiAgICBwcm92aWRlQ2xlYXJFcnJvcihjYy5TcHJpdGUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgc2V0SW5zZXRMZWZ0OiAnY2MuU3ByaXRlRnJhbWUgaW5zZXRMZWZ0JyxcclxuICAgICAgICBzZXRJbnNldFJpZ2h0OiAnY2MuU3ByaXRlRnJhbWUgaW5zZXRSaWdodCcsXHJcbiAgICAgICAgc2V0SW5zZXRUb3A6ICdjYy5TcHJpdGVGcmFtZSBpbnNldFRvcCcsXHJcbiAgICAgICAgc2V0SW5zZXRCb3R0b206ICdjYy5TcHJpdGVGcmFtZSBpbnNldEJvdHRvbScsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjYy5NYXRlcmlhbFxyXG4gICAgY2MuTWF0ZXJpYWwuZ2V0SW5zdGFudGlhdGVkQnVpbHRpbk1hdGVyaWFsID0gY2MuTWF0ZXJpYWxWYXJpYW50LmNyZWF0ZVdpdGhCdWlsdGluO1xyXG4gICAgY2MuTWF0ZXJpYWwuZ2V0SW5zdGFudGlhdGVkTWF0ZXJpYWwgPSBjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlO1xyXG4gICAgbWFya0Z1bmN0aW9uV2FybmluZyhjYy5NYXRlcmlhbCwge1xyXG4gICAgICAgIGdldEluc3RhbnRpYXRlZEJ1aWx0aW5NYXRlcmlhbDogJ2NjLk1hdGVyaWFsVmFyaWFudC5jcmVhdGVXaXRoQnVpbHRpbicsXHJcbiAgICAgICAgZ2V0SW5zdGFudGlhdGVkTWF0ZXJpYWw6ICdjYy5NYXRlcmlhbFZhcmlhbnQuY3JlYXRlJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2MuUmVuZGVyQ29tcG9uZW50XHJcbiAgICBjYy5qcy5nZXRzZXQoY2MuUmVuZGVyQ29tcG9uZW50LnByb3RvdHlwZSwgJ3NoYXJlZE1hdGVyaWFscycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy53YXJuSUQoMTQwMCwgJ3NoYXJlZE1hdGVyaWFscycsICdnZXRNYXRlcmlhbHMnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXRlcmlhbHM7XHJcbiAgICB9LCBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIGNjLndhcm5JRCgxNDAwLCAnc2hhcmVkTWF0ZXJpYWxzJywgJ3NldE1hdGVyaWFsJyk7XHJcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMgPSB2O1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyBjYy5DYW1lcmFcclxuICAgIG1hcmtGdW5jdGlvbldhcm5pbmcoY2MuQ2FtZXJhLnByb3RvdHlwZSwge1xyXG4gICAgICAgIGdldE5vZGVUb0NhbWVyYVRyYW5zZm9ybTogJ2dldFdvcmxkVG9TY3JlZW5NYXRyaXgyRCcsXHJcbiAgICAgICAgZ2V0Q2FtZXJhVG9Xb3JsZFBvaW50OiAnZ2V0U2NyZWVuVG9Xb3JsZFBvaW50JyxcclxuICAgICAgICBnZXRXb3JsZFRvQ2FtZXJhUG9pbnQ6ICdnZXRXb3JsZFRvU2NyZWVuUG9pbnQnLFxyXG4gICAgICAgIGdldENhbWVyYVRvV29ybGRNYXRyaXg6ICdnZXRTY3JlZW5Ub1dvcmxkTWF0cml4MkQnLFxyXG4gICAgICAgIGdldFdvcmxkVG9DYW1lcmFNYXRyaXg6ICdnZXRXb3JsZFRvU2NyZWVuTWF0cml4MkQnXHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXJrQXNSZW1vdmVkKGNjLkNhbWVyYSwgW1xyXG4gICAgICAgICdhZGRUYXJnZXQnLFxyXG4gICAgICAgICdyZW1vdmVUYXJnZXQnLFxyXG4gICAgICAgICdnZXRUYXJnZXRzJ1xyXG4gICAgXSk7XHJcblxyXG4gICAgLy8gU0NFTkVcclxuICAgIHZhciBFUlIgPSAnXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIHRoZSBTY2VuZSwgaXQgaXMgb25seSBkZWZpbmVkIGluIG5vcm1hbCBub2Rlcy4nO1xyXG4gICAgQ0NfRURJVE9SIHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNjLlNjZW5lLnByb3RvdHlwZSwge1xyXG4gICAgICAgIGFjdGl2ZToge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUiwgJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFjdGl2ZUluSGllcmFyY2h5OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnYWN0aXZlSW5IaWVyYXJjaHknKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q29tcG9uZW50OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnZ2V0Q29tcG9uZW50Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkQ29tcG9uZW50OiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSLCAnYWRkQ29tcG9uZW50Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjYy5keW5hbWljQXRsYXNNYW5hZ2VyXHJcbiAgICBtYXJrQXNSZW1vdmVkSW5PYmplY3QoY2MuZHluYW1pY0F0bGFzTWFuYWdlciwgW1xyXG4gICAgICAgICdtaW5GcmFtZVNpemUnXHJcbiAgICBdLCAnY2MuZHluYW1pY0F0bGFzTWFuYWdlcicpXHJcblxyXG4gICAgLy8gbGlnaHQgY29tcG9uZW50XHJcbiAgICBpZiAoY2MuTGlnaHQpIHtcclxuICAgICAgICBtYXJrQXNSZW1vdmVkSW5PYmplY3QoY2MuTGlnaHQucHJvdG90eXBlLCBbXHJcbiAgICAgICAgICAgICdzaGFkb3dEZXB0aFNjYWxlJyxcclxuICAgICAgICBdLCAnY2MuTGlnaHQucHJvdG90eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVmFsdWUgdHlwZXNcclxuICAgIHByb3ZpZGVDbGVhckVycm9yKGNjLCB7XHJcbiAgICAgICAgLy8gQWZmaW5lVHJhbnNmb3JtXHJcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtTWFrZTogJ2NjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUnLFxyXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybU1ha2VJZGVudGl0eTogJ2NjLkFmZmluZVRyYW5zZm9ybS5pZGVudGl0eScsXHJcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtQ2xvbmU6ICdjYy5BZmZpbmVUcmFuc2Zvcm0uY2xvbmUnLFxyXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybUNvbmNhdDogJ2NjLkFmZmluZVRyYW5zZm9ybS5jb25jYXQnLFxyXG4gICAgICAgIGFmZmluZVRyYW5zZm9ybUNvbmNhdEluOiAnY2MuQWZmaW5lVHJhbnNmb3JtLmNvbmNhdCcsXHJcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtSW52ZXJ0OiAnY2MuQWZmaW5lVHJhbnNmb3JtLmludmVydCcsXHJcbiAgICAgICAgYWZmaW5lVHJhbnNmb3JtSW52ZXJ0SW46ICdjYy5BZmZpbmVUcmFuc2Zvcm0uaW52ZXJ0JyxcclxuICAgICAgICBhZmZpbmVUcmFuc2Zvcm1JbnZlcnRPdXQ6ICdjYy5BZmZpbmVUcmFuc2Zvcm0uaW52ZXJ0JyxcclxuICAgICAgICBhZmZpbmVUcmFuc2Zvcm1FcXVhbFRvVHJhbnNmb3JtOiAnY2MuQWZmaW5lVHJhbnNmb3JtLmVxdWFsJyxcclxuICAgICAgICBwb2ludEFwcGx5QWZmaW5lVHJhbnNmb3JtOiAnY2MuQWZmaW5lVHJhbnNmb3JtLnRyYW5zZm9ybVZlYzInLFxyXG4gICAgICAgIHNpemVBcHBseUFmZmluZVRyYW5zZm9ybTogJ2NjLkFmZmluZVRyYW5zZm9ybS50cmFuc2Zvcm1TaXplJyxcclxuICAgICAgICByZWN0QXBwbHlBZmZpbmVUcmFuc2Zvcm06ICdjYy5BZmZpbmVUcmFuc2Zvcm0udHJhbnNmb3JtUmVjdCcsXHJcbiAgICAgICAgb2JiQXBwbHlBZmZpbmVUcmFuc2Zvcm06ICdjYy5BZmZpbmVUcmFuc2Zvcm0udHJhbnNmb3JtT2JiJyxcclxuXHJcbiAgICAgICAgLy8gVmVjMlxyXG4gICAgICAgIHBvaW50RXF1YWxUb1BvaW50OiAnY2MuVmVjMiBlcXVhbHMnLFxyXG5cclxuICAgICAgICAvLyBTaXplXHJcbiAgICAgICAgc2l6ZUVxdWFsVG9TaXplOiAnY2MuU2l6ZSBlcXVhbHMnLFxyXG5cclxuICAgICAgICAvLyBSZWN0XHJcbiAgICAgICAgcmVjdEVxdWFsVG9SZWN0OiAncmVjdEEuZXF1YWxzKHJlY3RCKScsXHJcbiAgICAgICAgcmVjdENvbnRhaW5zUmVjdDogJ3JlY3RBLmNvbnRhaW5zUmVjdChyZWN0QiknLFxyXG4gICAgICAgIHJlY3RDb250YWluc1BvaW50OiAncmVjdC5jb250YWlucyh2ZWMyKScsXHJcbiAgICAgICAgcmVjdE92ZXJsYXBzUmVjdDogJ3JlY3RBLmludGVyc2VjdHMocmVjdEIpJyxcclxuICAgICAgICByZWN0SW50ZXJzZWN0c1JlY3Q6ICdyZWN0QS5pbnRlcnNlY3RzKHJlY3RCKScsXHJcbiAgICAgICAgcmVjdEludGVyc2VjdGlvbjogJ3JlY3RBLmludGVyc2VjdGlvbihpbnRlcnNlY3Rpb24sIHJlY3RCKScsXHJcbiAgICAgICAgcmVjdFVuaW9uOiAncmVjdEEudW5pb24odW5pb24sIHJlY3RCKScsXHJcbiAgICAgICAgcmVjdEdldE1heFg6ICdyZWN0LnhNYXgnLFxyXG4gICAgICAgIHJlY3RHZXRNaWRYOiAncmVjdC5jZW50ZXIueCcsXHJcbiAgICAgICAgcmVjdEdldE1pblg6ICdyZWN0LnhNaW4nLFxyXG4gICAgICAgIHJlY3RHZXRNYXhZOiAncmVjdC55TWF4JyxcclxuICAgICAgICByZWN0R2V0TWlkWTogJ3JlY3QuY2VudGVyLnknLFxyXG4gICAgICAgIHJlY3RHZXRNaW5ZOiAncmVjdC55TWluJyxcclxuXHJcbiAgICAgICAgLy8gQ29sb3JcclxuICAgICAgICBjb2xvckVxdWFsOiAnY29sb3JBLmVxdWFscyhjb2xvckIpJyxcclxuICAgICAgICBoZXhUb0NvbG9yOiAnY29sb3IuZnJvbUhFWChoZXhDb2xvciknLFxyXG4gICAgICAgIGNvbG9yVG9IZXg6ICdjb2xvci50b0hFWCgpJyxcclxuXHJcbiAgICAgICAgLy8gRW51bXNcclxuICAgICAgICBUZXh0QWxpZ25tZW50OiAnY2MubWFjcm8uVGV4dEFsaWdubWVudCcsXHJcbiAgICAgICAgVmVydGljYWxUZXh0QWxpZ25tZW50OiAnY2MubWFjcm8uVmVydGljYWxUZXh0QWxpZ25tZW50JyxcclxuXHJcbiAgICAgICAgLy8gUG9pbnQgRXh0ZW5zaW9uc1xyXG4gICAgICAgIHBOZWc6ICdwLm5lZygpJyxcclxuICAgICAgICBwQWRkOiAncDEuYWRkKHAyKScsXHJcbiAgICAgICAgcFN1YjogJ3AxLnN1YihwMiknLFxyXG4gICAgICAgIHBNdWx0OiAncC5tdWwoZmFjdG9yKScsXHJcbiAgICAgICAgcE1pZHBvaW50OiAncDEuYWRkKHAyKS5tdWwoMC41KScsXHJcbiAgICAgICAgcERvdDogJ3AxLmRvdChwMiknLFxyXG4gICAgICAgIHBDcm9zczogJ3AxLmNyb3NzKHAyKScsXHJcbiAgICAgICAgcFBlcnA6ICdwLnJvdGF0ZSgtOTAgKiBNYXRoLlBJIC8gMTgwKScsXHJcbiAgICAgICAgcFJQZXJwOiAncC5yb3RhdGUoOTAgKiBNYXRoLlBJIC8gMTgwKScsXHJcbiAgICAgICAgcFByb2plY3Q6ICdwMS5wcm9qZWN0KHAyKScsXHJcbiAgICAgICAgcExlbmd0aFNROiAncC5tYWdTcXIoKScsXHJcbiAgICAgICAgcERpc3RhbmNlU1E6ICdwMS5zdWIocDIpLm1hZ1NxcigpJyxcclxuICAgICAgICBwTGVuZ3RoOiAncC5tYWcoKScsXHJcbiAgICAgICAgcERpc3RhbmNlOiAncDEuc3ViKHAyKS5tYWcoKScsXHJcbiAgICAgICAgcE5vcm1hbGl6ZTogJ3Aubm9ybWFsaXplKCknLFxyXG4gICAgICAgIHBGb3JBbmdsZTogJ2NjLnYyKE1hdGguY29zKGEpLCBNYXRoLnNpbihhKSknLFxyXG4gICAgICAgIHBUb0FuZ2xlOiAnTWF0aC5hdGFuMih2LnksIHYueCknLFxyXG4gICAgICAgIHBaZXJvSW46ICdwLnggPSBwLnkgPSAwJyxcclxuICAgICAgICBwSW46ICdwMS5zZXQocDIpJyxcclxuICAgICAgICBwTXVsdEluOiAncC5tdWxTZWxmKGZhY3RvciknLFxyXG4gICAgICAgIHBTdWJJbjogJ3AxLnN1YlNlbGYocDIpJyxcclxuICAgICAgICBwQWRkSW46ICdwMS5hZGRTZWxmKHAyKScsXHJcbiAgICAgICAgcE5vcm1hbGl6ZUluOiAncC5ub3JtYWxpemVTZWxmKCknLFxyXG4gICAgICAgIHBTYW1lQXM6ICdwMS5lcXVhbHMocDIpJyxcclxuICAgICAgICBwQW5nbGU6ICd2MS5hbmdsZSh2MiknLFxyXG4gICAgICAgIHBBbmdsZVNpZ25lZDogJ3YxLnNpZ25BbmdsZSh2MiknLFxyXG4gICAgICAgIHBSb3RhdGVCeUFuZ2xlOiAncC5yb3RhdGUocmFkaWFucyknLFxyXG4gICAgICAgIHBDb21wTXVsdDogJ3YxLm11bHRpcGx5KHYyKScsXHJcbiAgICAgICAgcEZ1enp5RXF1YWw6ICd2MS5mdXp6eUVxdWFscyh2MiwgdG9sZXJhbmNlKScsXHJcbiAgICAgICAgcExlcnA6ICdwLmxlcnAoZW5kUG9pbnQsIHJhdGlvKScsXHJcbiAgICAgICAgcENsYW1wOiAncC5jbGFtcGYobWluX2luY2x1c2l2ZSwgbWF4X2luY2x1c2l2ZSknLFxyXG5cclxuICAgICAgICByYW5kOiAnTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmJyxcclxuICAgICAgICByYW5kb21NaW51czFUbzE6ICcoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyJyxcclxuXHJcbiAgICAgICAgY29udGFpbmVyOiAnY2MuZ2FtZS5jb250YWluZXInLFxyXG4gICAgICAgIF9jYW52YXM6ICdjYy5nYW1lLmNhbnZhcycsXHJcbiAgICAgICAgX3JlbmRlclR5cGU6ICdjYy5nYW1lLnJlbmRlclR5cGUnLFxyXG5cclxuICAgICAgICBfZ2V0RXJyb3I6ICdjYy5kZWJ1Zy5nZXRFcnJvcicsXHJcbiAgICAgICAgX2luaXREZWJ1Z1NldHRpbmc6ICdjYy5kZWJ1Zy5fcmVzZXREZWJ1Z1NldHRpbmcnLFxyXG4gICAgICAgIERlYnVnTW9kZTogJ2NjLmRlYnVnLkRlYnVnTW9kZScsXHJcbiAgICB9LCAnY2MnKTtcclxuICAgIG1hcmtBc1JlbW92ZWRJbk9iamVjdChjYywgW1xyXG4gICAgICAgICdibGVuZEZ1bmNEaXNhYmxlJyxcclxuXHJcbiAgICAgICAgJ3BGcm9tU2l6ZScsXHJcbiAgICAgICAgJ3BDb21wT3AnLFxyXG4gICAgICAgICdwSW50ZXJzZWN0UG9pbnQnLFxyXG4gICAgICAgICdwU2VnbWVudEludGVyc2VjdCcsXHJcbiAgICAgICAgJ3BMaW5lSW50ZXJzZWN0JyxcclxuXHJcbiAgICAgICAgJ29iYkFwcGx5TWF0cml4JyxcclxuXHJcbiAgICAgICAgJ2dldEltYWdlRm9ybWF0QnlEYXRhJyxcclxuXHJcbiAgICAgICAgJ2luaXRFbmdpbmUnLFxyXG4gICAgXSwgJ2NjJyk7XHJcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLCB7XHJcbiAgICAgICAgLy8gY2MucFxyXG4gICAgICAgIHA6ICdjYy52MidcclxuICAgIH0sICdjYycpO1xyXG4gICAgLy8gY2MuUmVjdFxyXG4gICAgcHJvdmlkZUNsZWFyRXJyb3IoY2MuUmVjdCwge1xyXG4gICAgICAgIGNvbnRhaW46ICdyZWN0QS5jb250YWlucyhyZWN0QiknLFxyXG4gICAgICAgIHRyYW5zZm9ybU1hdDQ6ICdyZWN0LnRyYW5zZm9ybU1hdDQob3V0LCBtYXQ0KSdcclxuICAgIH0pO1xyXG4gICAgLy8gY2MuQ29sb3JcclxuICAgIHByb3ZpZGVDbGVhckVycm9yKGNjLkNvbG9yLCB7XHJcbiAgICAgICAgcmdiMmhzdjogJ2NvbG9yLnRvSFNWKCknLFxyXG4gICAgICAgIGhzdjJyZ2I6ICdjb2xvci5mcm9tSFNWKGgsIHMsIHYpJ1xyXG4gICAgfSk7XHJcbiAgICBtYXJrRnVuY3Rpb25XYXJuaW5nKGNjLkNvbG9yLCB7XHJcbiAgICAgICAgZnJvbUhleDogJ2NjLkNvbG9yLmZyb21IRVgnLFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBtYWNybyBmdW5jdGlvbnNcclxuICAgIGpzLmdldChjYywgJ2xlcnAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MubGVycCcsICdjYy5taXNjLmxlcnAnKTtcclxuICAgICAgICByZXR1cm4gY2MubWlzYy5sZXJwO1xyXG4gICAgfSk7XHJcbiAgICBqcy5nZXQoY2MsICdyYW5kb20wVG8xJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLnJhbmRvbTBUbzEnLCAnTWF0aC5yYW5kb20nKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb207XHJcbiAgICB9KTtcclxuICAgIGpzLmdldChjYywgJ2RlZ3JlZXNUb1JhZGlhbnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuZGVncmVlc1RvUmFkaWFucycsICdjYy5taXNjLmRlZ3JlZXNUb1JhZGlhbnMnKTtcclxuICAgICAgICByZXR1cm4gY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zO1xyXG4gICAgfSk7XHJcbiAgICBqcy5nZXQoY2MsICdyYWRpYW5zVG9EZWdyZWVzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLnJhZGlhbnNUb0RlZ3JlZXMnLCAnY2MubWlzYy5yYWRpYW5zVG9EZWdyZWVzJyk7XHJcbiAgICAgICAgcmV0dXJuIGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcztcclxuICAgIH0pO1xyXG4gICAganMuZ2V0KGNjLCAnY2xhbXBmJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLmNsYW1wZicsICdjYy5taXNjLmNsYW1wZicpO1xyXG4gICAgICAgIHJldHVybiBjYy5taXNjLmNsYW1wZjtcclxuICAgIH0pO1xyXG4gICAganMuZ2V0KGNjLCAnY2xhbXAwMScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdjYy5jbGFtcDAxJywgJ2NjLm1pc2MuY2xhbXAwMScpO1xyXG4gICAgICAgIHJldHVybiBjYy5taXNjLmNsYW1wMDE7XHJcbiAgICB9KTtcclxuICAgIGpzLmdldChjYywgJ0ltYWdlRm9ybWF0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLkltYWdlRm9ybWF0JywgJ2NjLm1hY3JvLkltYWdlRm9ybWF0Jyk7XHJcbiAgICAgICAgcmV0dXJuIGNjLm1hY3JvLkltYWdlRm9ybWF0O1xyXG4gICAgfSk7XHJcbiAgICBqcy5nZXQoY2MsICdLRVknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuS0VZJywgJ2NjLm1hY3JvLktFWScpO1xyXG4gICAgICAgIHJldHVybiBjYy5tYWNyby5LRVk7XHJcbiAgICB9KTtcclxuICAgIGpzLmdldChjYywgJ0Vhc2luZycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdjYy5FYXNpbmcnLCAnY2MuZWFzaW5nJyk7XHJcbiAgICAgICAgcmV0dXJuIGNjLmVhc2luZztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNjLmlzQ2hpbGRDbGFzc09mXHJcbiAgICBqcy5nZXQoY2MsICdpc0NoaWxkQ2xhc3NPZicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5lcnJvcklEKDE0MDAsICdjYy5pc0NoaWxkQ2xhc3NPZicsICdjYy5qcy5pc0NoaWxkQ2xhc3NPZicpO1xyXG4gICAgICAgIHJldHVybiBjYy5qcy5pc0NoaWxkQ2xhc3NPZjtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGRyYWdvbiBib25lc1xyXG4gICAgaWYgKHR5cGVvZiBkcmFnb25Cb25lcyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBqcy5nZXQoZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LCAnZ2V0RmFjdG9yeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LmdldEZhY3RvcnknLCAnZHJhZ29uQm9uZXMuQ0NGYWN0b3J5LmdldEluc3RhbmNlJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmVuZGVyRW5naW5lXHJcbiAgICBjYy5yZW5kZXJlci5yZW5kZXJFbmdpbmUgPSB7XHJcbiAgICAgICAgZ2V0IGdmeCAoKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2MucmVuZGVyZXIucmVuZGVyRW5naW5lLmdmeCcsICdjYy5nZngnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmdmeDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBtYXRoICgpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDE0MDAsICdjYy5yZW5kZXJlci5yZW5kZXJFbmdpbmUubWF0aCcsICdjYy5tYXRoJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy52bWF0aDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBJbnB1dEFzc2VtYmxlciAoKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCAnY2MucmVuZGVyZXIucmVuZGVyRW5naW5lLklucHV0QXNzZW1ibGVyJywgJ2NjLnJlbmRlcmVyLklucHV0QXNzZW1ibGVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5yZW5kZXJlci5JbnB1dEFzc2VtYmxlcjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvLyBhdWRpb1xyXG4gICAgbWFya0FzUmVtb3ZlZEluT2JqZWN0KGNjLmF1ZGlvRW5naW5lLCBbXHJcbiAgICAgICAgJ2dldFByb2ZpbGUnLFxyXG4gICAgICAgICdwcmVsb2FkJyxcclxuICAgICAgICAnc2V0TWF4V2ViQXVkaW9TaXplJyxcclxuICAgIF0sICdjYy5hdWRpb0VuZ2luZScpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9