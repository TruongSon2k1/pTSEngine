
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCObject.js';
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
var js = require('./js');

var CCClass = require('./CCClass'); // definitions for CCObject.Flags


var Destroyed = 1 << 0;
var RealDestroyed = 1 << 1;
var ToDestroy = 1 << 2;
var DontSave = 1 << 3;
var EditorOnly = 1 << 4;
var Dirty = 1 << 5;
var DontDestroy = 1 << 6;
var Destroying = 1 << 7;
var Deactivating = 1 << 8;
var LockedInEditor = 1 << 9; //var HideInGame = 1 << 9;

var HideInHierarchy = 1 << 10;
var IsOnEnableCalled = 1 << 11;
var IsEditorOnEnableCalled = 1 << 12;
var IsPreloadStarted = 1 << 13;
var IsOnLoadCalled = 1 << 14;
var IsOnLoadStarted = 1 << 15;
var IsStartCalled = 1 << 16;
var IsRotationLocked = 1 << 17;
var IsScaleLocked = 1 << 18;
var IsAnchorLocked = 1 << 19;
var IsSizeLocked = 1 << 20;
var IsPositionLocked = 1 << 21; // var Hide = HideInGame | HideInHierarchy;
// should not clone or serialize these flags

var PersistentMask = ~(ToDestroy | Dirty | Destroying | DontDestroy | Deactivating | IsPreloadStarted | IsOnLoadStarted | IsOnLoadCalled | IsStartCalled | IsOnEnableCalled | IsEditorOnEnableCalled | IsRotationLocked | IsScaleLocked | IsAnchorLocked | IsSizeLocked | IsPositionLocked
/*RegisteredInEditor*/
);
/**
 * The base class of most of all the objects in Fireball.
 * @class Object
 *
 * @main
 * @private
 */

function CCObject() {
  /**
   * @property {String} _name
   * @default ""
   * @private
   */
  this._name = '';
  /**
   * @property {Number} _objFlags
   * @default 0
   * @private
   */

  this._objFlags = 0;
}

CCClass.fastDefine('cc.Object', CCObject, {
  _name: '',
  _objFlags: 0
});
/**
 * Bit mask that controls object states.
 * @enum Flags
 * @static
 * @private
 */

js.value(CCObject, 'Flags', {
  Destroyed: Destroyed,
  //ToDestroy: ToDestroy,

  /**
   * !#en The object will not be saved.
   * !#zh 该对象将不会被保存。
   * @property {Number} DontSave
   */
  DontSave: DontSave,

  /**
   * !#en The object will not be saved when building a player.
   * !#zh 构建项目时，该对象将不会被保存。
   * @property {Number} EditorOnly
   */
  EditorOnly: EditorOnly,
  Dirty: Dirty,

  /**
   * !#en Dont destroy automatically when loading a new scene.
   * !#zh 加载一个新场景时，不自动删除该对象。
   * @property DontDestroy
   * @private
   */
  DontDestroy: DontDestroy,
  PersistentMask: PersistentMask,
  // FLAGS FOR ENGINE
  Destroying: Destroying,

  /**
   * !#en The node is deactivating.
   * !#zh 节点正在反激活的过程中。
   * @property Deactivating
   * @private
   */
  Deactivating: Deactivating,

  /**
   * !#en The lock node, when the node is locked, cannot be clicked in the scene.
   * !#zh 锁定节点，锁定后场景内不能点击。
   * 
   * @property LockedInEditor
   * @private
   */
  LockedInEditor: LockedInEditor,
  ///**
  // * !#en
  // * Hide in game and hierarchy.
  // * This flag is readonly, it can only be used as an argument of `scene.addEntity()` or `Entity.createWithFlags()`.
  // * !#zh
  // * 在游戏和层级中隐藏该对象。<br/>
  // * 该标记只读，它只能被用作 `scene.addEntity()` 或者 `Entity.createWithFlags()` 的一个参数。
  // * @property {Number} HideInGame
  // */
  //HideInGame: HideInGame,
  // FLAGS FOR EDITOR

  /**
   * !#en Hide the object in editor.
   * !#zh 在编辑器中隐藏该对象。
   * @property {Number} HideInHierarchy
   */
  HideInHierarchy: HideInHierarchy,
  ///**
  // * !#en
  // * Hide in game view, hierarchy, and scene view... etc.
  // * This flag is readonly, it can only be used as an argument of `scene.addEntity()` or `Entity.createWithFlags()`.
  // * !#zh
  // * 在游戏视图，层级，场景视图等等...中隐藏该对象。
  // * 该标记只读，它只能被用作 `scene.addEntity()` 或者 `Entity.createWithFlags()` 的一个参数。
  // * @property {Number} Hide
  // */
  //Hide: Hide,
  // FLAGS FOR COMPONENT
  IsPreloadStarted: IsPreloadStarted,
  IsOnLoadStarted: IsOnLoadStarted,
  IsOnLoadCalled: IsOnLoadCalled,
  IsOnEnableCalled: IsOnEnableCalled,
  IsStartCalled: IsStartCalled,
  IsEditorOnEnableCalled: IsEditorOnEnableCalled,
  IsPositionLocked: IsPositionLocked,
  IsRotationLocked: IsRotationLocked,
  IsScaleLocked: IsScaleLocked,
  IsAnchorLocked: IsAnchorLocked,
  IsSizeLocked: IsSizeLocked
});
var objectsToDestroy = [];

function deferredDestroy() {
  var deleteCount = objectsToDestroy.length;

  for (var i = 0; i < deleteCount; ++i) {
    var obj = objectsToDestroy[i];

    if (!(obj._objFlags & Destroyed)) {
      obj._destroyImmediate();
    }
  } // if we called b.destory() in a.onDestroy(), objectsToDestroy will be resized,
  // but we only destroy the objects which called destory in this frame.


  if (deleteCount === objectsToDestroy.length) {
    objectsToDestroy.length = 0;
  } else {
    objectsToDestroy.splice(0, deleteCount);
  }

  if (CC_EDITOR) {
    deferredDestroyTimer = null;
  }
}

js.value(CCObject, '_deferredDestroy', deferredDestroy);

if (CC_EDITOR) {
  js.value(CCObject, '_clearDeferredDestroyTimer', function () {
    if (deferredDestroyTimer !== null) {
      clearImmediate(deferredDestroyTimer);
      deferredDestroyTimer = null;
    }
  });
} // MEMBER

/**
 * @class Object
 */


var prototype = CCObject.prototype;
/**
 * !#en The name of the object.
 * !#zh 该对象的名称。
 * @property {String} name
 * @default ""
 * @example
 * obj.name = "New Obj";
 */

js.getset(prototype, 'name', function () {
  return this._name;
}, function (value) {
  this._name = value;
}, true);
/**
 * !#en
 * Indicates whether the object is not yet destroyed. (It will not be available after being destroyed)<br>
 * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
 * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
 * If you want to determine whether the current frame has called `destroy`, use `cc.isValid(obj, true)`,
 * but this is often caused by a particular logical requirements, which is not normally required.
 *
 * !#zh
 * 表示该对象是否可用（被 destroy 后将不可用）。<br>
 * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。如果希望判断当前帧是否调用过 `destroy`，请使用 `cc.isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
 *
 * @property {Boolean} isValid
 * @default true
 * @readOnly
 * @example
 * var node = new cc.Node();
 * cc.log(node.isValid);    // true
 * node.destroy();
 * cc.log(node.isValid);    // true, still valid in this frame
 * // after a frame...
 * cc.log(node.isValid);    // false, destroyed in the end of last frame
 */

js.get(prototype, 'isValid', function () {
  return !(this._objFlags & Destroyed);
}, true);

if (CC_EDITOR || CC_TEST) {
  js.get(prototype, 'isRealValid', function () {
    return !(this._objFlags & RealDestroyed);
  });
}

var deferredDestroyTimer = null;
/**
 * !#en
 * Destroy this Object, and release all its own references to other objects.<br/>
 * Actual object destruction will delayed until before rendering.
 * From the next frame, this object is not usable anymore.
 * You can use `cc.isValid(obj)` to check whether the object is destroyed before accessing it.
 * !#zh
 * 销毁该对象，并释放所有它对其它对象的引用。<br/>
 * 实际销毁操作会延迟到当前帧渲染前执行。从下一帧开始，该对象将不再可用。
 * 您可以在访问对象之前使用 `cc.isValid(obj)` 来检查对象是否已被销毁。
 * @method destroy
 * @return {Boolean} whether it is the first time the destroy being called
 * @example
 * obj.destroy();
 */

prototype.destroy = function () {
  if (this._objFlags & Destroyed) {
    cc.warnID(5000);
    return false;
  }

  if (this._objFlags & ToDestroy) {
    return false;
  }

  this._objFlags |= ToDestroy;
  objectsToDestroy.push(this);

  if (CC_EDITOR && deferredDestroyTimer === null && cc.engine && !cc.engine._isUpdating) {
    // auto destroy immediate in edit mode
    deferredDestroyTimer = setImmediate(deferredDestroy);
  }

  return true;
};

if (CC_EDITOR || CC_TEST) {
  /*
   * !#en
   * In fact, Object's "destroy" will not trigger the destruct operation in Firebal Editor.
   * The destruct operation will be executed by Undo system later.
   * !#zh
   * 事实上，对象的 “destroy” 不会在编辑器中触发析构操作，
   * 析构操作将在 Undo 系统中 **延后** 执行。
   * @method realDestroyInEditor
   * @private
   */
  prototype.realDestroyInEditor = function () {
    if (!(this._objFlags & Destroyed)) {
      cc.warnID(5001);
      return;
    }

    if (this._objFlags & RealDestroyed) {
      cc.warnID(5000);
      return;
    }

    this._destruct();

    this._objFlags |= RealDestroyed;
  };
}

function compileDestruct(obj, ctor) {
  var shouldSkipId = obj instanceof cc._BaseNode || obj instanceof cc.Component;
  var idToSkip = shouldSkipId ? '_id' : null;
  var key,
      propsToReset = {};

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === idToSkip) {
        continue;
      }

      switch (typeof obj[key]) {
        case 'string':
          propsToReset[key] = '';
          break;

        case 'object':
        case 'function':
          propsToReset[key] = null;
          break;
      }
    }
  } // Overwrite propsToReset according to Class


  if (cc.Class._isCCClass(ctor)) {
    var attrs = cc.Class.Attr.getClassAttrs(ctor);
    var propList = ctor.__props__;

    for (var i = 0; i < propList.length; i++) {
      key = propList[i];
      var attrKey = key + cc.Class.Attr.DELIMETER + 'default';

      if (attrKey in attrs) {
        if (shouldSkipId && key === '_id') {
          continue;
        }

        switch (typeof attrs[attrKey]) {
          case 'string':
            propsToReset[key] = '';
            break;

          case 'object':
          case 'function':
            propsToReset[key] = null;
            break;

          case 'undefined':
            propsToReset[key] = undefined;
            break;
        }
      }
    }
  }

  if (CC_SUPPORT_JIT) {
    // compile code
    var func = '';

    for (key in propsToReset) {
      var statement;

      if (CCClass.IDENTIFIER_RE.test(key)) {
        statement = 'o.' + key + '=';
      } else {
        statement = 'o[' + CCClass.escapeForJS(key) + ']=';
      }

      var val = propsToReset[key];

      if (val === '') {
        val = '""';
      }

      func += statement + val + ';\n';
    }

    return Function('o', func);
  } else {
    return function (o) {
      for (var key in propsToReset) {
        o[key] = propsToReset[key];
      }
    };
  }
}
/**
 * !#en
 * Clear all references in the instance.
 *
 * NOTE: this method will not clear the `getter` or `setter` functions which defined in the instance of `CCObject`.
 * You can override the `_destruct` method if you need, for example:
 * ```js
 * _destruct: function () {
 *     for (var key in this) {
 *         if (this.hasOwnProperty(key)) {
 *             switch (typeof this[key]) {
 *                 case 'string':
 *                     this[key] = '';
 *                     break;
 *                 case 'object':
 *                 case 'function':
 *                     this[key] = null;
 *                     break;
 *         }
 *     }
 * }
 * ```
 * !#zh
 * 清除实例中的所有引用。
 * 
 * 注意：此方法不会清除在 `CCObject` 实例中定义的 `getter` 或 `setter`。如果需要，你可以重写 `_destruct` 方法。例如：
 * 
 * ```js
 * _destruct: function () {
 *     for (var key in this) {
 *         if (this.hasOwnProperty(key)) {
 *             switch (typeof this[key]) {
 *                 case 'string':
 *                     this[key] = '';
 *                     break;
 *                 case 'object':
 *                 case 'function':
 *                     this[key] = null;
 *                     break;
 *         }
 *     }
 * }
 * ```
 * @method _destruct
 * @private
 */


prototype._destruct = function () {
  var ctor = this.constructor;
  var destruct = ctor.__destruct__;

  if (!destruct) {
    destruct = compileDestruct(this, ctor);
    js.value(ctor, '__destruct__', destruct, true);
  }

  destruct(this);
};
/**
 * !#en
 * Called before the object being destroyed.
 * !#zh
 * 在对象被销毁之前调用。
 * @method _onPreDestroy
 * @private
 */


prototype._onPreDestroy = null;

prototype._destroyImmediate = function () {
  if (this._objFlags & Destroyed) {
    cc.errorID(5000);
    return;
  } // engine internal callback


  if (this._onPreDestroy) {
    this._onPreDestroy();
  }

  if ((CC_TEST ?
  /* make CC_EDITOR mockable*/
  Function('return !CC_EDITOR')() : !CC_EDITOR) || cc.engine._isPlaying) {
    this._destruct();
  }

  this._objFlags |= Destroyed;
};

if (CC_EDITOR) {
  /**
   * !#en
   * The customized serialization for this object. (Editor Only)
   * !#zh
   * 为此对象定制序列化。
   * @method _serialize
   * @param {Boolean} exporting
   * @return {object} the serialized json data object
   * @private
   */
  prototype._serialize = null;
}
/**
 * !#en
 * Init this object from the custom serialized data.
 * !#zh
 * 从自定义序列化数据初始化此对象。
 * @method _deserialize
 * @param {Object} data - the serialized json data
 * @param {_Deserializer} ctx
 * @private
 */


prototype._deserialize = null;
/**
 * @module cc
 */

/**
 * !#en
 * Checks whether the object is non-nil and not yet destroyed.<br>
 * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
 * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
 * If you want to determine whether the current frame has called `destroy`, use `cc.isValid(obj, true)`,
 * but this is often caused by a particular logical requirements, which is not normally required.
 *
 * !#zh
 * 检查该对象是否不为 null 并且尚未销毁。<br>
 * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。如果希望判断当前帧是否调用过 `destroy`，请使用 `cc.isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
 *
 * @method isValid
 * @param {any} value
 * @param {Boolean} [strictMode=false] - If true, Object called destroy() in this frame will also treated as invalid.
 * @return {Boolean} whether is valid
 * @example
 * var node = new cc.Node();
 * cc.log(cc.isValid(node));    // true
 * node.destroy();
 * cc.log(cc.isValid(node));    // true, still valid in this frame
 * // after a frame...
 * cc.log(cc.isValid(node));    // false, destroyed in the end of last frame
 */

cc.isValid = function (value, strictMode) {
  if (typeof value === 'object') {
    return !!value && !(value._objFlags & (strictMode ? Destroyed | ToDestroy : Destroyed));
  } else {
    return typeof value !== 'undefined';
  }
};

if (CC_EDITOR || CC_TEST) {
  js.value(CCObject, '_willDestroy', function (obj) {
    return !(obj._objFlags & Destroyed) && (obj._objFlags & ToDestroy) > 0;
  });
  js.value(CCObject, '_cancelDestroy', function (obj) {
    obj._objFlags &= ~ToDestroy;
    js.array.fastRemove(objectsToDestroy, obj);
  });
}

cc.Object = module.exports = CCObject;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxDQ09iamVjdC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJDQ0NsYXNzIiwiRGVzdHJveWVkIiwiUmVhbERlc3Ryb3llZCIsIlRvRGVzdHJveSIsIkRvbnRTYXZlIiwiRWRpdG9yT25seSIsIkRpcnR5IiwiRG9udERlc3Ryb3kiLCJEZXN0cm95aW5nIiwiRGVhY3RpdmF0aW5nIiwiTG9ja2VkSW5FZGl0b3IiLCJIaWRlSW5IaWVyYXJjaHkiLCJJc09uRW5hYmxlQ2FsbGVkIiwiSXNFZGl0b3JPbkVuYWJsZUNhbGxlZCIsIklzUHJlbG9hZFN0YXJ0ZWQiLCJJc09uTG9hZENhbGxlZCIsIklzT25Mb2FkU3RhcnRlZCIsIklzU3RhcnRDYWxsZWQiLCJJc1JvdGF0aW9uTG9ja2VkIiwiSXNTY2FsZUxvY2tlZCIsIklzQW5jaG9yTG9ja2VkIiwiSXNTaXplTG9ja2VkIiwiSXNQb3NpdGlvbkxvY2tlZCIsIlBlcnNpc3RlbnRNYXNrIiwiQ0NPYmplY3QiLCJfbmFtZSIsIl9vYmpGbGFncyIsImZhc3REZWZpbmUiLCJ2YWx1ZSIsIm9iamVjdHNUb0Rlc3Ryb3kiLCJkZWZlcnJlZERlc3Ryb3kiLCJkZWxldGVDb3VudCIsImxlbmd0aCIsImkiLCJvYmoiLCJfZGVzdHJveUltbWVkaWF0ZSIsInNwbGljZSIsIkNDX0VESVRPUiIsImRlZmVycmVkRGVzdHJveVRpbWVyIiwiY2xlYXJJbW1lZGlhdGUiLCJwcm90b3R5cGUiLCJnZXRzZXQiLCJnZXQiLCJDQ19URVNUIiwiZGVzdHJveSIsImNjIiwid2FybklEIiwicHVzaCIsImVuZ2luZSIsIl9pc1VwZGF0aW5nIiwic2V0SW1tZWRpYXRlIiwicmVhbERlc3Ryb3lJbkVkaXRvciIsIl9kZXN0cnVjdCIsImNvbXBpbGVEZXN0cnVjdCIsImN0b3IiLCJzaG91bGRTa2lwSWQiLCJfQmFzZU5vZGUiLCJDb21wb25lbnQiLCJpZFRvU2tpcCIsImtleSIsInByb3BzVG9SZXNldCIsImhhc093blByb3BlcnR5IiwiQ2xhc3MiLCJfaXNDQ0NsYXNzIiwiYXR0cnMiLCJBdHRyIiwiZ2V0Q2xhc3NBdHRycyIsInByb3BMaXN0IiwiX19wcm9wc19fIiwiYXR0cktleSIsIkRFTElNRVRFUiIsInVuZGVmaW5lZCIsIkNDX1NVUFBPUlRfSklUIiwiZnVuYyIsInN0YXRlbWVudCIsIklERU5USUZJRVJfUkUiLCJ0ZXN0IiwiZXNjYXBlRm9ySlMiLCJ2YWwiLCJGdW5jdGlvbiIsIm8iLCJjb25zdHJ1Y3RvciIsImRlc3RydWN0IiwiX19kZXN0cnVjdF9fIiwiX29uUHJlRGVzdHJveSIsImVycm9ySUQiLCJfaXNQbGF5aW5nIiwiX3NlcmlhbGl6ZSIsIl9kZXNlcmlhbGl6ZSIsImlzVmFsaWQiLCJzdHJpY3RNb2RlIiwiYXJyYXkiLCJmYXN0UmVtb3ZlIiwiT2JqZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSUMsT0FBTyxHQUFHRCxPQUFPLENBQUMsV0FBRCxDQUFyQixFQUVBOzs7QUFFQSxJQUFJRSxTQUFTLEdBQUcsS0FBSyxDQUFyQjtBQUNBLElBQUlDLGFBQWEsR0FBRyxLQUFLLENBQXpCO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEtBQUssQ0FBckI7QUFDQSxJQUFJQyxRQUFRLEdBQUcsS0FBSyxDQUFwQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxLQUFLLENBQXRCO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEtBQUssQ0FBakI7QUFDQSxJQUFJQyxXQUFXLEdBQUcsS0FBSyxDQUF2QjtBQUNBLElBQUlDLFVBQVUsR0FBRyxL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QVcsRUFBRUEsS0FBSyxDQUFDRixTQUFOLElBQW1CZ0UsVUFBVSxHQUFJekYsU0FBUyxHQUFHRSxTQUFoQixHQUE2QkYsU0FBMUQsQ0FBRixDQUFsQjtBQUNILEdBRkQsTUFHSztBQUNELFdBQU8sT0FBTzJCLEtBQVAsS0FBaUIsV0FBeEI7QUFDSDtBQUNKLENBUEQ7O0FBU0EsSUFBSVMsU0FBUyxJQUFJTSxPQUFqQixFQUEwQjtBQUN0QjdDLEVBQUFBLEVBQUUsQ0FBQzhCLEtBQUgsQ0FBU0osUUFBVCxFQUFtQixjQUFuQixFQUFtQyxVQUFVVSxHQUFWLEVBQWU7QUFDOUMsV0FBTyxFQUFFQSxHQUFHLENBQUNSLFNBQUosR0FBZ0J6QixTQUFsQixLQUFnQyxDQUFDaUMsR0FBRyxDQUFDUixTQUFKLEdBQWdCdkIsU0FBakIsSUFBOEIsQ0FBckU7QUFDSCxHQUZEO0FBR0FMLEVBQUFBLEVBQUUsQ0FBQzhCLEtBQUgsQ0FBU0osUUFBVCxFQUFtQixnQkFBbkIsRUFBcUMsVUFBVVUsR0FBVixFQUFlO0FBQ2hEQSxJQUFBQSxHQUFHLENBQUNSLFNBQUosSUFBaUIsQ0FBQ3ZCLFNBQWxCO0FBQ0FMLElBQUFBLEVBQUUsQ0FBQzZGLEtBQUgsQ0FBU0MsVUFBVCxDQUFvQi9ELGdCQUFwQixFQUFzQ0ssR0FBdEM7QUFDSCxHQUhEO0FBSUg7O0FBRURXLEVBQUUsQ0FBQ2dELE1BQUgsR0FBWUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkUsUUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxyXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcclxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxyXG5cclxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXHJcbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbnZhciBqcyA9IHJlcXVpcmUoJy4vanMnKTtcclxudmFyIENDQ2xhc3MgPSByZXF1aXJlKCcuL0NDQ2xhc3MnKTtcclxuXHJcbi8vIGRlZmluaXRpb25zIGZvciBDQ09iamVjdC5GbGFnc1xyXG5cclxudmFyIERlc3Ryb3llZCA9IDEgPDwgMDtcclxudmFyIFJlYWxEZXN0cm95ZWQgPSAxIDw8IDE7XHJcbnZhciBUb0Rlc3Ryb3kgPSAxIDw8IDI7XHJcbnZhciBEb250U2F2ZSA9IDEgPDwgMztcclxudmFyIEVkaXRvck9ubHkgPSAxIDw8IDQ7XHJcbnZhciBEaXJ0eSA9IDEgPDwgNTtcclxudmFyIERvbnREZXN0cm95ID0gMSA8PCA2O1xyXG52YXIgRGVzdHJveWluZyA9IDEgPDwgNztcclxudmFyIERlYWN0aXZhdGluZyA9IDEgPDwgODtcclxudmFyIExvY2tlZEluRWRpdG9yID0gMSA8PCA5O1xyXG4vL3ZhciBIaWRlSW5HYW1lID0gMSA8PCA5O1xyXG52YXIgSGlkZUluSGllcmFyY2h5ID0gMSA8PCAxMDtcclxuXHJcbnZhciBJc09uRW5hYmxlQ2FsbGVkID0gMSA8PCAxMTtcclxudmFyIElzRWRpdG9yT25FbmFibGVDYWxsZWQgPSAxIDw8IDEyO1xyXG52YXIgSXNQcmVsb2FkU3RhcnRlZCA9IDEgPDwgMTM7XHJcbnZhciBJc09uTG9hZENhbGxlZCA9IDEgPDwgMTQ7XHJcbnZhciBJc09uTG9hZFN0YXJ0ZWQgPSAxIDw8IDE1O1xyXG52YXIgSXNTdGFydENhbGxlZCA9IDEgPDwgMTY7XHJcblxyXG52YXIgSXNSb3RhdGlvbkxvY2tlZCA9IDEgPDwgMTc7XHJcbnZhciBJc1NjYWxlTG9ja2VkID0gMSA8PCAxODtcclxudmFyIElzQW5jaG9yTG9ja2VkID0gMSA8PCAxOTtcclxudmFyIElzU2l6ZUxvY2tlZCA9IDEgPDwgMjA7XHJcbnZhciBJc1Bvc2l0aW9uTG9ja2VkID0gMSA8PCAyMTtcclxuXHJcbi8vIHZhciBIaWRlID0gSGlkZUluR2FtZSB8IEhpZGVJbkhpZXJhcmNoeTtcclxuLy8gc2hvdWxkIG5vdCBjbG9uZSBvciBzZXJpYWxpemUgdGhlc2UgZmxhZ3NcclxudmFyIFBlcnNpc3RlbnRNYXNrID0gfihUb0Rlc3Ryb3kgfCBEaXJ0eSB8IERlc3Ryb3lpbmcgfCBEb250RGVzdHJveSB8IERlYWN0aXZhdGluZyB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgSXNQcmVsb2FkU3RhcnRlZCB8IElzT25Mb2FkU3RhcnRlZCB8IElzT25Mb2FkQ2FsbGVkIHwgSXNTdGFydENhbGxlZCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgSXNPbkVuYWJsZUNhbGxlZCB8IElzRWRpdG9yT25FbmFibGVDYWxsZWQgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgIElzUm90YXRpb25Mb2NrZWQgfCBJc1NjYWxlTG9ja2VkIHwgSXNBbmNob3JMb2NrZWQgfCBJc1NpemVMb2NrZWQgfCBJc1Bvc2l0aW9uTG9ja2VkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgLypSZWdpc3RlcmVkSW5FZGl0b3IqLyk7XHJcblxyXG4vKipcclxuICogVGhlIGJhc2UgY2xhc3Mgb2YgbW9zdCBvZiBhbGwgdGhlIG9iamVjdHMgaW4gRmlyZWJhbGwuXHJcbiAqIEBjbGFzcyBPYmplY3RcclxuICpcclxuICogQG1haW5cclxuICogQHByaXZhdGVcclxuICovXHJcbmZ1bmN0aW9uIENDT2JqZWN0ICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IF9uYW1lXHJcbiAgICAgKiBAZGVmYXVsdCBcIlwiXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9uYW1lID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gX29iakZsYWdzXHJcbiAgICAgKiBAZGVmYXVsdCAwXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9vYmpGbGFncyA9IDA7XHJcbn1cclxuQ0NDbGFzcy5mYXN0RGVmaW5lKCdjYy5PYmplY3QnLCBDQ09iamVjdCwgeyBfbmFtZTogJycsIF9vYmpGbGFnczogMCB9KTtcclxuXHJcbi8qKlxyXG4gKiBCaXQgbWFzayB0aGF0IGNvbnRyb2xzIG9iamVjdCBzdGF0ZXMuXHJcbiAqIEBlbnVtIEZsYWdzXHJcbiAqIEBzdGF0aWNcclxuICogQHByaXZhdGVcclxuICovXHJcbmpzLnZhbHVlKENDT2JqZWN0LCAnRmxhZ3MnLCB7XHJcblxyXG4gICAgRGVzdHJveWVkLFxyXG4gICAgLy9Ub0Rlc3Ryb3k6IFRvRGVzdHJveSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG9iamVjdCB3aWxsIG5vdCBiZSBzYXZlZC5cclxuICAgICAqICEjemgg6K+l5a+56LGh5bCG5LiN5Lya6KKr5L+d5a2Y44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRG9udFNhdmVcclxuICAgICAqL1xyXG4gICAgRG9udFNhdmUsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIFRoZSBvYmplY3Qgd2lsbCBub3QgYmUgc2F2ZWQgd2hlbiBidWlsZGluZyBhIHBsYXllci5cclxuICAgICAqICEjemgg5p6E5bu66aG555uu5pe277yM6K+l5a+56LGh5bCG5LiN5Lya6KKr5L+d5a2Y44CCXHJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRWRpdG9yT25seVxyXG4gICAgICovXHJcbiAgICBFZGl0b3JPbmx5LFxyXG5cclxuICAgIERpcnR5LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogISNlbiBEb250IGRlc3Ryb3kgYXV0b21hdGljYWxseSB3aGVuIGxvYWRpbmcgYSBuZXcgc2NlbmUuXHJcbiAgICAgKiAhI3poIOWKoOi9veS4gOS4quaWsOWcuuaZr+aXtu+8jOS4jeiHquWKqOWIoOmZpOivpeWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IERvbnREZXN0cm95XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBEb250RGVzdHJveSxcclxuXHJcbiAgICBQZXJzaXN0ZW50TWFzayxcclxuXHJcbiAgICAvLyBGTEFHUyBGT1IgRU5HSU5FXHJcblxyXG4gICAgRGVzdHJveWluZyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIG5vZGUgaXMgZGVhY3RpdmF0aW5nLlxyXG4gICAgICogISN6aCDoioLngrnmraPlnKjlj43mv4DmtLvnmoTov4fnqIvkuK3jgIJcclxuICAgICAqIEBwcm9wZXJ0eSBEZWFjdGl2YXRpbmdcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIERlYWN0aXZhdGluZyxcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gVGhlIGxvY2sgbm9kZSwgd2hlbiB0aGUgbm9kZSBpcyBsb2NrZWQsIGNhbm5vdCBiZSBjbGlja2VkIGluIHRoZSBzY2VuZS5cclxuICAgICAqICEjemgg6ZSB5a6a6IqC54K577yM6ZSB5a6a5ZCO5Zy65pmv5YaF5LiN6IO954K55Ye744CCXHJcbiAgICAgKiBcclxuICAgICAqIEBwcm9wZXJ0eSBMb2NrZWRJbkVkaXRvclxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgTG9ja2VkSW5FZGl0b3IsXHJcblxyXG4gICAgLy8vKipcclxuICAgIC8vICogISNlblxyXG4gICAgLy8gKiBIaWRlIGluIGdhbWUgYW5kIGhpZXJhcmNoeS5cclxuICAgIC8vICogVGhpcyBmbGFnIGlzIHJlYWRvbmx5LCBpdCBjYW4gb25seSBiZSB1c2VkIGFzIGFuIGFyZ3VtZW50IG9mIGBzY2VuZS5hZGRFbnRpdHkoKWAgb3IgYEVudGl0eS5jcmVhdGVXaXRoRmxhZ3MoKWAuXHJcbiAgICAvLyAqICEjemhcclxuICAgIC8vICog5Zyo5ri45oiP5ZKM5bGC57qn5Lit6ZqQ6JeP6K+l5a+56LGh44CCPGJyLz5cclxuICAgIC8vICog6K+l5qCH6K6w5Y+q6K+777yM5a6D5Y+q6IO96KKr55So5L2cIGBzY2VuZS5hZGRFbnRpdHkoKWAg5oiW6ICFIGBFbnRpdHkuY3JlYXRlV2l0aEZsYWdzKClgIOeahOS4gOS4quWPguaVsOOAglxyXG4gICAgLy8gKiBAcHJvcGVydHkge051bWJlcn0gSGlkZUluR2FtZVxyXG4gICAgLy8gKi9cclxuICAgIC8vSGlkZUluR2FtZTogSGlkZUluR2FtZSxcclxuXHJcbiAgICAvLyBGTEFHUyBGT1IgRURJVE9SXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuIEhpZGUgdGhlIG9iamVjdCBpbiBlZGl0b3IuXHJcbiAgICAgKiAhI3poIOWcqOe8lui+keWZqOS4remakOiXj+ivpeWvueixoeOAglxyXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhpZGVJbkhpZXJhcmNoeVxyXG4gICAgICovXHJcbiAgICBIaWRlSW5IaWVyYXJjaHk6IEhpZGVJbkhpZXJhcmNoeSxcclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiAhI2VuXHJcbiAgICAvLyAqIEhpZGUgaW4gZ2FtZSB2aWV3LCBoaWVyYXJjaHksIGFuZCBzY2VuZSB2aWV3Li4uIGV0Yy5cclxuICAgIC8vICogVGhpcyBmbGFnIGlzIHJlYWRvbmx5LCBpdCBjYW4gb25seSBiZSB1c2VkIGFzIGFuIGFyZ3VtZW50IG9mIGBzY2VuZS5hZGRFbnRpdHkoKWAgb3IgYEVudGl0eS5jcmVhdGVXaXRoRmxhZ3MoKWAuXHJcbiAgICAvLyAqICEjemhcclxuICAgIC8vICog5Zyo5ri45oiP6KeG5Zu+77yM5bGC57qn77yM5Zy65pmv6KeG5Zu+562J562JLi4u5Lit6ZqQ6JeP6K+l5a+56LGh44CCXHJcbiAgICAvLyAqIOivpeagh+iusOWPquivu++8jOWug+WPquiDveiiq+eUqOS9nCBgc2NlbmUuYWRkRW50aXR5KClgIOaIluiAhSBgRW50aXR5LmNyZWF0ZVdpdGhGbGFncygpYCDnmoTkuIDkuKrlj4LmlbDjgIJcclxuICAgIC8vICogQHByb3BlcnR5IHtOdW1iZXJ9IEhpZGVcclxuICAgIC8vICovXHJcbiAgICAvL0hpZGU6IEhpZGUsXHJcblxyXG4gICAgLy8gRkxBR1MgRk9SIENPTVBPTkVOVFxyXG5cclxuICAgIElzUHJlbG9hZFN0YXJ0ZWQsXHJcbiAgICBJc09uTG9hZFN0YXJ0ZWQsXHJcbiAgICBJc09uTG9hZENhbGxlZCxcclxuICAgIElzT25FbmFibGVDYWxsZWQsXHJcbiAgICBJc1N0YXJ0Q2FsbGVkLFxyXG4gICAgSXNFZGl0b3JPbkVuYWJsZUNhbGxlZCxcclxuXHJcbiAgICBJc1Bvc2l0aW9uTG9ja2VkLFxyXG4gICAgSXNSb3RhdGlvbkxvY2tlZCxcclxuICAgIElzU2NhbGVMb2NrZWQsXHJcbiAgICBJc0FuY2hvckxvY2tlZCxcclxuICAgIElzU2l6ZUxvY2tlZCxcclxufSk7XHJcblxyXG52YXIgb2JqZWN0c1RvRGVzdHJveSA9IFtdO1xyXG5cclxuZnVuY3Rpb24gZGVmZXJyZWREZXN0cm95ICgpIHtcclxuICAgIHZhciBkZWxldGVDb3VudCA9IG9iamVjdHNUb0Rlc3Ryb3kubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWxldGVDb3VudDsgKytpKSB7XHJcbiAgICAgICAgdmFyIG9iaiA9IG9iamVjdHNUb0Rlc3Ryb3lbaV07XHJcbiAgICAgICAgaWYgKCEob2JqLl9vYmpGbGFncyAmIERlc3Ryb3llZCkpIHtcclxuICAgICAgICAgICAgb2JqLl9kZXN0cm95SW1tZWRpYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYgd2UgY2FsbGVkIGIuZGVzdG9yeSgpIGluIGEub25EZXN0cm95KCksIG9iamVjdHNUb0Rlc3Ryb3kgd2lsbCBiZSByZXNpemVkLFxyXG4gICAgLy8gYnV0IHdlIG9ubHkgZGVzdHJveSB0aGUgb2JqZWN0cyB3aGljaCBjYWxsZWQgZGVzdG9yeSBpbiB0aGlzIGZyYW1lLlxyXG4gICAgaWYgKGRlbGV0ZUNvdW50ID09PSBvYmplY3RzVG9EZXN0cm95Lmxlbmd0aCkge1xyXG4gICAgICAgIG9iamVjdHNUb0Rlc3Ryb3kubGVuZ3RoID0gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9iamVjdHNUb0Rlc3Ryb3kuc3BsaWNlKDAsIGRlbGV0ZUNvdW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQ0NfRURJVE9SKSB7XHJcbiAgICAgICAgZGVmZXJyZWREZXN0cm95VGltZXIgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5qcy52YWx1ZShDQ09iamVjdCwgJ19kZWZlcnJlZERlc3Ryb3knLCBkZWZlcnJlZERlc3Ryb3kpO1xyXG5cclxuaWYgKENDX0VESVRPUikge1xyXG4gICAganMudmFsdWUoQ0NPYmplY3QsICdfY2xlYXJEZWZlcnJlZERlc3Ryb3lUaW1lcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZGVmZXJyZWREZXN0cm95VGltZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoZGVmZXJyZWREZXN0cm95VGltZXIpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZERlc3Ryb3lUaW1lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIE1FTUJFUlxyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBPYmplY3RcclxuICovXHJcblxyXG52YXIgcHJvdG90eXBlID0gQ0NPYmplY3QucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqICEjZW4gVGhlIG5hbWUgb2YgdGhlIG9iamVjdC5cclxuICogISN6aCDor6Xlr7nosaHnmoTlkI3np7DjgIJcclxuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWVcclxuICogQGRlZmF1bHQgXCJcIlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBvYmoubmFtZSA9IFwiTmV3IE9ialwiO1xyXG4gKi9cclxuanMuZ2V0c2V0KHByb3RvdHlwZSwgJ25hbWUnLFxyXG4gICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcclxuICAgIH0sXHJcbiAgICB0cnVlXHJcbik7XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgb2JqZWN0IGlzIG5vdCB5ZXQgZGVzdHJveWVkLiAoSXQgd2lsbCBub3QgYmUgYXZhaWxhYmxlIGFmdGVyIGJlaW5nIGRlc3Ryb3llZCk8YnI+XHJcbiAqIFdoZW4gYW4gb2JqZWN0J3MgYGRlc3Ryb3lgIGlzIGNhbGxlZCwgaXQgaXMgYWN0dWFsbHkgZGVzdHJveWVkIGFmdGVyIHRoZSBlbmQgb2YgdGhpcyBmcmFtZS5cclxuICogU28gYGlzVmFsaWRgIHdpbGwgcmV0dXJuIGZhbHNlIGZyb20gdGhlIG5leHQgZnJhbWUsIHdoaWxlIGBpc1ZhbGlkYCBpbiB0aGUgY3VycmVudCBmcmFtZSB3aWxsIHN0aWxsIGJlIHRydWUuXHJcbiAqIElmIHlvdSB3YW50IHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGZyYW1lIGhhcyBjYWxsZWQgYGRlc3Ryb3lgLCB1c2UgYGNjLmlzVmFsaWQob2JqLCB0cnVlKWAsXHJcbiAqIGJ1dCB0aGlzIGlzIG9mdGVuIGNhdXNlZCBieSBhIHBhcnRpY3VsYXIgbG9naWNhbCByZXF1aXJlbWVudHMsIHdoaWNoIGlzIG5vdCBub3JtYWxseSByZXF1aXJlZC5cclxuICpcclxuICogISN6aFxyXG4gKiDooajnpLror6Xlr7nosaHmmK/lkKblj6/nlKjvvIjooqsgZGVzdHJveSDlkI7lsIbkuI3lj6/nlKjvvInjgII8YnI+XHJcbiAqIOW9k+S4gOS4quWvueixoeeahCBgZGVzdHJveWAg6LCD55So5Lul5ZCO77yM5Lya5Zyo6L+Z5LiA5bin57uT5p2f5ZCO5omN55yf5q2j6ZSA5q+B44CC5Zug5q2k5LuO5LiL5LiA5bin5byA5aeLIGBpc1ZhbGlkYCDlsLHkvJrov5Tlm54gZmFsc2XvvIzogIzlvZPliY3luKflhoUgYGlzVmFsaWRgIOS7jeeEtuS8muaYryB0cnVl44CC5aaC5p6c5biM5pyb5Yik5pat5b2T5YmN5bin5piv5ZCm6LCD55So6L+HIGBkZXN0cm95YO+8jOivt+S9v+eUqCBgY2MuaXNWYWxpZChvYmosIHRydWUpYO+8jOS4jei/h+i/meW+gOW+gOaYr+eJueauiueahOS4muWKoemcgOaxguW8lei1t+eahO+8jOmAmuW4uOaDheWGteS4i+S4jemcgOimgei/meagt+OAglxyXG4gKlxyXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzVmFsaWRcclxuICogQGRlZmF1bHQgdHJ1ZVxyXG4gKiBAcmVhZE9ubHlcclxuICogQGV4YW1wbGVcclxuICogdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gKiBjYy5sb2cobm9kZS5pc1ZhbGlkKTsgICAgLy8gdHJ1ZVxyXG4gKiBub2RlLmRlc3Ryb3koKTtcclxuICogY2MubG9nKG5vZGUuaXNWYWxpZCk7ICAgIC8vIHRydWUsIHN0aWxsIHZhbGlkIGluIHRoaXMgZnJhbWVcclxuICogLy8gYWZ0ZXIgYSBmcmFtZS4uLlxyXG4gKiBjYy5sb2cobm9kZS5pc1ZhbGlkKTsgICAgLy8gZmFsc2UsIGRlc3Ryb3llZCBpbiB0aGUgZW5kIG9mIGxhc3QgZnJhbWVcclxuICovXHJcbmpzLmdldChwcm90b3R5cGUsICdpc1ZhbGlkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEodGhpcy5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpO1xyXG59LCB0cnVlKTtcclxuXHJcbmlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xyXG4gICAganMuZ2V0KHByb3RvdHlwZSwgJ2lzUmVhbFZhbGlkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuX29iakZsYWdzICYgUmVhbERlc3Ryb3llZCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIGRlZmVycmVkRGVzdHJveVRpbWVyID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIERlc3Ryb3kgdGhpcyBPYmplY3QsIGFuZCByZWxlYXNlIGFsbCBpdHMgb3duIHJlZmVyZW5jZXMgdG8gb3RoZXIgb2JqZWN0cy48YnIvPlxyXG4gKiBBY3R1YWwgb2JqZWN0IGRlc3RydWN0aW9uIHdpbGwgZGVsYXllZCB1bnRpbCBiZWZvcmUgcmVuZGVyaW5nLlxyXG4gKiBGcm9tIHRoZSBuZXh0IGZyYW1lLCB0aGlzIG9iamVjdCBpcyBub3QgdXNhYmxlIGFueW1vcmUuXHJcbiAqIFlvdSBjYW4gdXNlIGBjYy5pc1ZhbGlkKG9iailgIHRvIGNoZWNrIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBkZXN0cm95ZWQgYmVmb3JlIGFjY2Vzc2luZyBpdC5cclxuICogISN6aFxyXG4gKiDplIDmr4Hor6Xlr7nosaHvvIzlubbph4rmlL7miYDmnInlroPlr7nlhbblroPlr7nosaHnmoTlvJXnlKjjgII8YnIvPlxyXG4gKiDlrp7pmYXplIDmr4Hmk43kvZzkvJrlu7bov5/liLDlvZPliY3luKfmuLLmn5PliY3miafooYzjgILku47kuIvkuIDluKflvIDlp4vvvIzor6Xlr7nosaHlsIbkuI3lho3lj6/nlKjjgIJcclxuICog5oKo5Y+v5Lul5Zyo6K6/6Zeu5a+56LGh5LmL5YmN5L2/55SoIGBjYy5pc1ZhbGlkKG9iailgIOadpeajgOafpeWvueixoeaYr+WQpuW3suiiq+mUgOavgeOAglxyXG4gKiBAbWV0aG9kIGRlc3Ryb3lcclxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGUgZGVzdHJveSBiZWluZyBjYWxsZWRcclxuICogQGV4YW1wbGVcclxuICogb2JqLmRlc3Ryb3koKTtcclxuICovXHJcbnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuX29iakZsYWdzICYgRGVzdHJveWVkKSB7XHJcbiAgICAgICAgY2Mud2FybklEKDUwMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIFRvRGVzdHJveSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuX29iakZsYWdzIHw9IFRvRGVzdHJveTtcclxuICAgIG9iamVjdHNUb0Rlc3Ryb3kucHVzaCh0aGlzKTtcclxuXHJcbiAgICBpZiAoQ0NfRURJVE9SICYmIGRlZmVycmVkRGVzdHJveVRpbWVyID09PSBudWxsICYmIGNjLmVuZ2luZSAmJiAhIGNjLmVuZ2luZS5faXNVcGRhdGluZykge1xyXG4gICAgICAgIC8vIGF1dG8gZGVzdHJveSBpbW1lZGlhdGUgaW4gZWRpdCBtb2RlXHJcbiAgICAgICAgZGVmZXJyZWREZXN0cm95VGltZXIgPSBzZXRJbW1lZGlhdGUoZGVmZXJyZWREZXN0cm95KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICAvKlxyXG4gICAgICogISNlblxyXG4gICAgICogSW4gZmFjdCwgT2JqZWN0J3MgXCJkZXN0cm95XCIgd2lsbCBub3QgdHJpZ2dlciB0aGUgZGVzdHJ1Y3Qgb3BlcmF0aW9uIGluIEZpcmViYWwgRWRpdG9yLlxyXG4gICAgICogVGhlIGRlc3RydWN0IG9wZXJhdGlvbiB3aWxsIGJlIGV4ZWN1dGVkIGJ5IFVuZG8gc3lzdGVtIGxhdGVyLlxyXG4gICAgICogISN6aFxyXG4gICAgICog5LqL5a6e5LiK77yM5a+56LGh55qEIOKAnGRlc3Ryb3nigJ0g5LiN5Lya5Zyo57yW6L6R5Zmo5Lit6Kem5Y+R5p6Q5p6E5pON5L2c77yMXHJcbiAgICAgKiDmnpDmnoTmk43kvZzlsIblnKggVW5kbyDns7vnu5/kuK0gKirlu7blkI4qKiDmiafooYzjgIJcclxuICAgICAqIEBtZXRob2QgcmVhbERlc3Ryb3lJbkVkaXRvclxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdG90eXBlLnJlYWxEZXN0cm95SW5FZGl0b3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCAhKHRoaXMuX29iakZsYWdzICYgRGVzdHJveWVkKSApIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDUwMDEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIFJlYWxEZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgY2Mud2FybklEKDUwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2Rlc3RydWN0KCk7XHJcbiAgICAgICAgdGhpcy5fb2JqRmxhZ3MgfD0gUmVhbERlc3Ryb3llZDtcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXBpbGVEZXN0cnVjdCAob2JqLCBjdG9yKSB7XHJcbiAgICB2YXIgc2hvdWxkU2tpcElkID0gb2JqIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlIHx8IG9iaiBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudDtcclxuICAgIHZhciBpZFRvU2tpcCA9IHNob3VsZFNraXBJZCA/ICdfaWQnIDogbnVsbDtcclxuXHJcbiAgICB2YXIga2V5LCBwcm9wc1RvUmVzZXQgPSB7fTtcclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBpZFRvU2tpcCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2Ygb2JqW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gT3ZlcndyaXRlIHByb3BzVG9SZXNldCBhY2NvcmRpbmcgdG8gQ2xhc3NcclxuICAgIGlmIChjYy5DbGFzcy5faXNDQ0NsYXNzKGN0b3IpKSB7XHJcbiAgICAgICAgdmFyIGF0dHJzID0gY2MuQ2xhc3MuQXR0ci5nZXRDbGFzc0F0dHJzKGN0b3IpO1xyXG4gICAgICAgIHZhciBwcm9wTGlzdCA9IGN0b3IuX19wcm9wc19fO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAga2V5ID0gcHJvcExpc3RbaV07XHJcbiAgICAgICAgICAgIHZhciBhdHRyS2V5ID0ga2V5ICsgY2MuQ2xhc3MuQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIGlmIChhdHRyS2V5IGluIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvdWxkU2tpcElkICYmIGtleSA9PT0gJ19pZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGF0dHJzW2F0dHJLZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzVG9SZXNldFtrZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5kZWZpbmVkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNUb1Jlc2V0W2tleV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChDQ19TVVBQT1JUX0pJVCkge1xyXG4gICAgICAgIC8vIGNvbXBpbGUgY29kZVxyXG4gICAgICAgIHZhciBmdW5jID0gJyc7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcHNUb1Jlc2V0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGF0ZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChDQ0NsYXNzLklERU5USUZJRVJfUkUudGVzdChrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZW1lbnQgPSAnby4nICsga2V5ICsgJz0nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50ID0gJ29bJyArIENDQ2xhc3MuZXNjYXBlRm9ySlMoa2V5KSArICddPSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZhbCA9IHByb3BzVG9SZXNldFtrZXldO1xyXG4gICAgICAgICAgICBpZiAodmFsID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdmFsID0gJ1wiXCInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmMgKz0gKHN0YXRlbWVudCArIHZhbCArICc7XFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGdW5jdGlvbignbycsIGZ1bmMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wc1RvUmVzZXQpIHtcclxuICAgICAgICAgICAgICAgIG9ba2V5XSA9IHByb3BzVG9SZXNldFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogQ2xlYXIgYWxsIHJlZmVyZW5jZXMgaW4gdGhlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBOT1RFOiB0aGlzIG1ldGhvZCB3aWxsIG5vdCBjbGVhciB0aGUgYGdldHRlcmAgb3IgYHNldHRlcmAgZnVuY3Rpb25zIHdoaWNoIGRlZmluZWQgaW4gdGhlIGluc3RhbmNlIG9mIGBDQ09iamVjdGAuXHJcbiAqIFlvdSBjYW4gb3ZlcnJpZGUgdGhlIGBfZGVzdHJ1Y3RgIG1ldGhvZCBpZiB5b3UgbmVlZCwgZm9yIGV4YW1wbGU6XHJcbiAqIGBgYGpzXHJcbiAqIF9kZXN0cnVjdDogZnVuY3Rpb24gKCkge1xyXG4gKiAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcclxuICogICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAqICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHRoaXNba2V5XSkge1xyXG4gKiAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICogICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAnJztcclxuICogICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICogICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAqICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAqICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbnVsbDtcclxuICogICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICogICAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqICEjemhcclxuICog5riF6Zmk5a6e5L6L5Lit55qE5omA5pyJ5byV55So44CCXHJcbiAqIFxyXG4gKiDms6jmhI/vvJrmraTmlrnms5XkuI3kvJrmuIXpmaTlnKggYENDT2JqZWN0YCDlrp7kvovkuK3lrprkuYnnmoQgYGdldHRlcmAg5oiWIGBzZXR0ZXJg44CC5aaC5p6c6ZyA6KaB77yM5L2g5Y+v5Lul6YeN5YaZIGBfZGVzdHJ1Y3RgIOaWueazleOAguS+i+Wmgu+8mlxyXG4gKiBcclxuICogYGBganNcclxuICogX2Rlc3RydWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAqICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xyXG4gKiAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICogICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdGhpc1trZXldKSB7XHJcbiAqICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gKiAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICcnO1xyXG4gKiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gKiAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICogICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICogICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xyXG4gKiAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gKiAgICAgICAgIH1cclxuICogICAgIH1cclxuICogfVxyXG4gKiBgYGBcclxuICogQG1ldGhvZCBfZGVzdHJ1Y3RcclxuICogQHByaXZhdGVcclxuICovXHJcbnByb3RvdHlwZS5fZGVzdHJ1Y3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XHJcbiAgICB2YXIgZGVzdHJ1Y3QgPSBjdG9yLl9fZGVzdHJ1Y3RfXztcclxuICAgIGlmICghZGVzdHJ1Y3QpIHtcclxuICAgICAgICBkZXN0cnVjdCA9IGNvbXBpbGVEZXN0cnVjdCh0aGlzLCBjdG9yKTtcclxuICAgICAgICBqcy52YWx1ZShjdG9yLCAnX19kZXN0cnVjdF9fJywgZGVzdHJ1Y3QsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgZGVzdHJ1Y3QodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBDYWxsZWQgYmVmb3JlIHRoZSBvYmplY3QgYmVpbmcgZGVzdHJveWVkLlxyXG4gKiAhI3poXHJcbiAqIOWcqOWvueixoeiiq+mUgOavgeS5i+WJjeiwg+eUqOOAglxyXG4gKiBAbWV0aG9kIF9vblByZURlc3Ryb3lcclxuICogQHByaXZhdGVcclxuICovXHJcbnByb3RvdHlwZS5fb25QcmVEZXN0cm95ID0gbnVsbDtcclxuXHJcbnByb3RvdHlwZS5fZGVzdHJveUltbWVkaWF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3llZCkge1xyXG4gICAgICAgIGNjLmVycm9ySUQoNTAwMCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gZW5naW5lIGludGVybmFsIGNhbGxiYWNrXHJcbiAgICBpZiAodGhpcy5fb25QcmVEZXN0cm95KSB7XHJcbiAgICAgICAgdGhpcy5fb25QcmVEZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChDQ19URVNUID8gKC8qIG1ha2UgQ0NfRURJVE9SIG1vY2thYmxlKi8gRnVuY3Rpb24oJ3JldHVybiAhQ0NfRURJVE9SJykpKCkgOiAhQ0NfRURJVE9SKSB8fCBjYy5lbmdpbmUuX2lzUGxheWluZykge1xyXG4gICAgICAgIHRoaXMuX2Rlc3RydWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fb2JqRmxhZ3MgfD0gRGVzdHJveWVkO1xyXG59O1xyXG5cclxuaWYgKENDX0VESVRPUikge1xyXG4gICAgLyoqXHJcbiAgICAgKiAhI2VuXHJcbiAgICAgKiBUaGUgY3VzdG9taXplZCBzZXJpYWxpemF0aW9uIGZvciB0aGlzIG9iamVjdC4gKEVkaXRvciBPbmx5KVxyXG4gICAgICogISN6aFxyXG4gICAgICog5Li65q2k5a+56LGh5a6a5Yi25bqP5YiX5YyW44CCXHJcbiAgICAgKiBAbWV0aG9kIF9zZXJpYWxpemVcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZXhwb3J0aW5nXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBzZXJpYWxpemVkIGpzb24gZGF0YSBvYmplY3RcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RvdHlwZS5fc2VyaWFsaXplID0gbnVsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogSW5pdCB0aGlzIG9iamVjdCBmcm9tIHRoZSBjdXN0b20gc2VyaWFsaXplZCBkYXRhLlxyXG4gKiAhI3poXHJcbiAqIOS7juiHquWumuS5ieW6j+WIl+WMluaVsOaNruWIneWni+WMluatpOWvueixoeOAglxyXG4gKiBAbWV0aG9kIF9kZXNlcmlhbGl6ZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSBzZXJpYWxpemVkIGpzb24gZGF0YVxyXG4gKiBAcGFyYW0ge19EZXNlcmlhbGl6ZXJ9IGN0eFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxucHJvdG90eXBlLl9kZXNlcmlhbGl6ZSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQG1vZHVsZSBjY1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIENoZWNrcyB3aGV0aGVyIHRoZSBvYmplY3QgaXMgbm9uLW5pbCBhbmQgbm90IHlldCBkZXN0cm95ZWQuPGJyPlxyXG4gKiBXaGVuIGFuIG9iamVjdCdzIGBkZXN0cm95YCBpcyBjYWxsZWQsIGl0IGlzIGFjdHVhbGx5IGRlc3Ryb3llZCBhZnRlciB0aGUgZW5kIG9mIHRoaXMgZnJhbWUuXHJcbiAqIFNvIGBpc1ZhbGlkYCB3aWxsIHJldHVybiBmYWxzZSBmcm9tIHRoZSBuZXh0IGZyYW1lLCB3aGlsZSBgaXNWYWxpZGAgaW4gdGhlIGN1cnJlbnQgZnJhbWUgd2lsbCBzdGlsbCBiZSB0cnVlLlxyXG4gKiBJZiB5b3Ugd2FudCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBmcmFtZSBoYXMgY2FsbGVkIGBkZXN0cm95YCwgdXNlIGBjYy5pc1ZhbGlkKG9iaiwgdHJ1ZSlgLFxyXG4gKiBidXQgdGhpcyBpcyBvZnRlbiBjYXVzZWQgYnkgYSBwYXJ0aWN1bGFyIGxvZ2ljYWwgcmVxdWlyZW1lbnRzLCB3aGljaCBpcyBub3Qgbm9ybWFsbHkgcmVxdWlyZWQuXHJcbiAqXHJcbiAqICEjemhcclxuICog5qOA5p+l6K+l5a+56LGh5piv5ZCm5LiN5Li6IG51bGwg5bm25LiU5bCa5pyq6ZSA5q+B44CCPGJyPlxyXG4gKiDlvZPkuIDkuKrlr7nosaHnmoQgYGRlc3Ryb3lgIOiwg+eUqOS7peWQju+8jOS8muWcqOi/meS4gOW4p+e7k+adn+WQjuaJjeecn+ato+mUgOavgeOAguWboOatpOS7juS4i+S4gOW4p+W8gOWniyBgaXNWYWxpZGAg5bCx5Lya6L+U5ZueIGZhbHNl77yM6ICM5b2T5YmN5bin5YaFIGBpc1ZhbGlkYCDku43nhLbkvJrmmK8gdHJ1ZeOAguWmguaenOW4jOacm+WIpOaWreW9k+WJjeW4p+aYr+WQpuiwg+eUqOi/hyBgZGVzdHJveWDvvIzor7fkvb/nlKggYGNjLmlzVmFsaWQob2JqLCB0cnVlKWDvvIzkuI3ov4fov5nlvoDlvoDmmK/nibnmrornmoTkuJrliqHpnIDmsYLlvJXotbfnmoTvvIzpgJrluLjmg4XlhrXkuIvkuI3pnIDopoHov5nmoLfjgIJcclxuICpcclxuICogQG1ldGhvZCBpc1ZhbGlkXHJcbiAqIEBwYXJhbSB7YW55fSB2YWx1ZVxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtzdHJpY3RNb2RlPWZhbHNlXSAtIElmIHRydWUsIE9iamVjdCBjYWxsZWQgZGVzdHJveSgpIGluIHRoaXMgZnJhbWUgd2lsbCBhbHNvIHRyZWF0ZWQgYXMgaW52YWxpZC5cclxuICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciBpcyB2YWxpZFxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAqIGNjLmxvZyhjYy5pc1ZhbGlkKG5vZGUpKTsgICAgLy8gdHJ1ZVxyXG4gKiBub2RlLmRlc3Ryb3koKTtcclxuICogY2MubG9nKGNjLmlzVmFsaWQobm9kZSkpOyAgICAvLyB0cnVlLCBzdGlsbCB2YWxpZCBpbiB0aGlzIGZyYW1lXHJcbiAqIC8vIGFmdGVyIGEgZnJhbWUuLi5cclxuICogY2MubG9nKGNjLmlzVmFsaWQobm9kZSkpOyAgICAvLyBmYWxzZSwgZGVzdHJveWVkIGluIHRoZSBlbmQgb2YgbGFzdCBmcmFtZVxyXG4gKi9cclxuY2MuaXNWYWxpZCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RyaWN0TW9kZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gISF2YWx1ZSAmJiAhKHZhbHVlLl9vYmpGbGFncyAmIChzdHJpY3RNb2RlID8gKERlc3Ryb3llZCB8IFRvRGVzdHJveSkgOiBEZXN0cm95ZWQpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICBqcy52YWx1ZShDQ09iamVjdCwgJ193aWxsRGVzdHJveScsIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gIShvYmouX29iakZsYWdzICYgRGVzdHJveWVkKSAmJiAob2JqLl9vYmpGbGFncyAmIFRvRGVzdHJveSkgPiAwO1xyXG4gICAgfSk7XHJcbiAgICBqcy52YWx1ZShDQ09iamVjdCwgJ19jYW5jZWxEZXN0cm95JywgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIG9iai5fb2JqRmxhZ3MgJj0gflRvRGVzdHJveTtcclxuICAgICAgICBqcy5hcnJheS5mYXN0UmVtb3ZlKG9iamVjdHNUb0Rlc3Ryb3ksIG9iaik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY2MuT2JqZWN0ID0gbW9kdWxlLmV4cG9ydHMgPSBDQ09iamVjdDtcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=