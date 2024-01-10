
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize-editor.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = _interopRequireDefault(require("./deserialize-compiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var js = require('./js');

var Attr = require('./attribute');

var CCClass = require('./CCClass');

var misc = require('../utils/misc');

// HELPERS

/**
 * !#en Contains information collected during deserialization
 * !#zh 包含反序列化时的一些信息
 * @class Details
 *
 */
var Details = function Details() {
  /**
   * list of the depends assets' uuid
   * @property {String[]} uuidList
   */
  this.uuidList = [];
  /**
   * the obj list whose field needs to load asset by uuid
   * @property {Object[]} uuidObjList
   */

  this.uuidObjList = [];
  /**
   * the corresponding field name which referenced to the asset
   * @property {String[]} uuidPropList
   */

  this.uuidPropList = [];
};
/**
 * @method reset
 */


Details.prototype.reset = function () {
  this.uuidList.length = 0;
  this.uuidObjList.length = 0;
  this.uuidPropList.length = 0;
};

if (CC_EDITOR || CC_TEST) {
  Details.prototype.assignAssetsBy = function (getter) {
    for (var i = 0, len = this.uuidList.length; i < len; i++) {
      var uuid = this.uuidList[i];
      var obj = this.uuidObjList[i];
      var prop = this.uuidPropList[i];
      obj[prop] = getter(uuid);
    }
  };
} // /**
//  * @method getUuidOf
//  * @param {Object} obj
//  * @param {String} propName
//  * @return {String}
//  */
// Details.prototype.getUuidOf = function (obj, propName) {
//     for (var i = 0; i < this.uuidObjList.length; i++) {
//         if (this.uuidObjList[i] === obj && this.uuidPropList[i] === propName) {
//             return this.uuidList[i];
//         }
//     }
//     return "";
// };

/**
 * @method push
 * @param {Object} obj
 * @param {String} propName
 * @param {String} uuid
 */


Details.prototype.push = function (obj, propName, uuid) {
  this.uuidList.push(uuid);
  this.uuidObjList.push(obj);
  this.uuidPropList.push(propName);
};

Details.pool = new js.Pool(function (obj) {
  obj.reset();
}, 10);

Details.pool.get = function () {
  return this._get() || new Details();
}; // IMPLEMENT OF DESERIALIZATION


var _Deserializer = function () {
  function _Deserializer(result, classFinder, customEnv, ignoreEditorOnly) {
    this.result = result;
    this.customEnv = customEnv;
    this.deserializedList = [];
    this.deserializedData = null;
    this._classFinder = classFinder;

    if (!CC_BUILD) {
      this._ignoreEditorOnly = ignoreEditorOnly;
    }

    this._idList = [];
    this._idObjList = [];
    this._idPropList = [];
  }

  function _dereference(self) {
    // 这里不采用遍历反序列化结果的方式，因为反序列化的结果如果引用到复杂的外部库，很容易堆栈溢出。
    var deserializedList = self.deserializedList;
    var idPropList = self._idPropList;
    var idList = self._idList;
    var idObjList = self._idObjList;
    var onDereferenced = self._classFinder && self._classFinder.onDereferenced;
    var i, propName, id;

    if (CC_EDITOR && onDereferenced) {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
        onDereferenced(deserializedList, id, idObjList[i], propName);
      }
    } else {
      for (i = 0; i < idList.length; i++) {
        propName = idPropList[i];
        id = idList[i];
        idObjList[i][propName] = deserializedList[id];
      }
    }
  }

  var prototype = _Deserializer.prototype;

  prototype.deserialize = function (jsonObj) {
    if (Array.isArray(jsonObj)) {
      var jsonArray = jsonObj;
      var refCount = jsonArray.length;
      this.deserializedList.length = refCount; // deserialize

      for (var i = 0; i < refCount; i++) {
        if (jsonArray[i]) {
          if (CC_EDITOR || CC_TEST) {
            this.deserializedList[i] = this._deserializeObject(jsonArray[i], this.deserializedList, '' + i);
          } else {
            this.deserializedList[i] = this._deserializeObject(jsonArray[i]);
          }
        }
      }

      this.deserializedData = refCount > 0 ? this.deserializedList[0] : []; //// callback
      //for (var j = 0; j < refCount; j++) {
      //    if (referencedList[j].onAfterDeserialize) {
      //        referencedList[j].onAfterDeserialize();
      //    }
      //}
    } else {
      this.deserializedList.length = 1;

      if (CC_EDITOR || CC_TEST) {
        this.deserializedData = jsonObj ? this._deserializeObject(jsonObj, this.deserializedList, '0') : null;
      } else {
        this.deserializedData = jsonObj ? this._deserializeObject(jsonObj) : null;
      }

      this.deserializedList[0] = this.deserializedData; //// callback
      //if (deserializedData.onAfterDeserialize) {
      //    deserializedData.onAfterDeserialize();
      //}
    } // dereference


    _dereference(this);

    return this.deserializedData;
  }; ///**
  // * @param {Object} serialized - The obj to deserialize, must be non-nil
  // * @param {Object} [owner] - debug only
  // * @param {String} [propName] - debug only
  // */


  prototype._deserializeObject = function (serialized, owner, propName) {
    var prop;
    var obj = null; // the obj to return

    var klass = null;
    var type = serialized.__type__;

    if (type === 'TypedArray') {
      var array = serialized.array;
      obj = new window[serialized.ctor](array.length);

      for (var i = 0; i < array.length; ++i) {
        obj[i] = array[i];
      }

      return obj;
    } else if (type) {
      // Type Object (including CCClass)
      klass = this._classFinder(type, serialized, owner, propName);

      if (!klass) {
        var notReported = this._classFinder === js._getClassById;

        if (notReported) {
          deserialize.reportMissingClass(type);
        }

        return null;
      } // instantiate a new object


      obj = new klass();

      if (obj._deserialize) {
        obj._deserialize(serialized.content, this);

        return obj;
      }

      if (cc.Class._isCCClass(klass)) {
        _deserializeFireClass(this, obj, serialized, klass);
      } else {
        this._deserializeTypedObject(obj, serialized, klass);
      }
    } else if (!Array.isArray(serialized)) {
      // embedded primitive javascript object
      obj = {};

      this._deserializePrimitiveObject(obj, serialized);
    } else {
      // Array
      obj = new Array(serialized.length);

      for (var _i = 0; _i < serialized.length; _i++) {
        prop = serialized[_i];

        if (typeof prop === 'object' && prop) {
          var isAssetType = this._deserializeObjField(obj, prop, '' + _i);

          if (isAssetType) {
            // fill default value for primitive objects (no constructor)
            obj[_i] = null;
          }
        } else {
          obj[_i] = prop;
        }
      }
    }

    return obj;
  }; // 和 _deserializeObject 不同的地方在于会判断 id 和 uuid


  prototype._deserializeObjField = function (obj, jsonObj, propName) {
    var id = jsonObj.__id__;

    if (id === undefined) {
      var uuid = jsonObj.__uuid__;

      if (uuid) {
        this.result.push(obj, propName, uuid);
        return true;
      } else {
        if (CC_EDITOR || CC_TEST) {
          obj[propName] = this._deserializeObject(jsonObj, obj, propName);
        } else {
          obj[propName] = this._deserializeObject(jsonObj);
        }
      }
    } else {
      var dObj = this.deserializedList[id];

      if (dObj) {
        obj[propName] = dObj;
      } else {
        this._idList.push(id);

        this._idObjList.push(obj);

        this._idPropList.push(propName);
      }
    }
  };

  prototype._deserializePrimitiveObject = function (instance, serialized) {
    for (var propName in serialized) {
      if (serialized.hasOwnProperty(propName)) {
        var prop = serialized[propName];

        if (typeof prop !== 'object') {
          if (propName !== '__type__'
          /* && k != '__id__'*/
          ) {
              instance[propName] = prop;
            }
        } else {
          if (prop) {
            var isAssetType = this._deserializeObjField(instance, prop, propName);

            if (isAssetType) {
              // fill default value for primitive objects (no constructor)
              instance[propName] = null;
            }
          } else {
            instance[propName] = null;
          }
        }
      }
    }
  }; // function _compileTypedObject (accessor, klass, ctorCode) {
  //     if (klass === cc.Vec2) {
  //         return `{` +
  //                     `o${accessor}.x=prop.x||0;` +
  //                     `o${accessor}.y=prop.y||0;` +
  //                `}`;
  //     }
  //     else if (klass === cc.Color) {
  //         return `{` +
  //                    `o${accessor}.r=prop.r||0;` +
  //                    `o${accessor}.g=prop.g||0;` +
  //                    `o${accessor}.b=prop.b||0;` +
  //                    `o${accessor}.a=(prop.a===undefined?255:prop.a);` +
  //                `}`;
  //     }
  //     else if (klass === cc.Size) {
  //         return `{` +
  //                    `o${accessor}.width=prop.width||0;` +
  //                    `o${accessor}.height=prop.height||0;` +
  //                `}`;
  //     }
  //     else {
  //         return `s._deserializeTypedObject(o${accessor},prop,${ctorCode});`;
  //     }
  // }
  // deserialize ValueType


  prototype._deserializeTypedObject = function (instance, serialized, klass) {
    if (klass === cc.Vec2) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      return;
    } else if (klass === cc.Vec3) {
      instance.x = serialized.x || 0;
      instance.y = serialized.y || 0;
      instance.z = serialized.z || 0;
      return;
    } else if (klass === cc.Color) {
      instance.r = serialized.r || 0;
      instance.g = serialized.g || 0;
      instance.b = serialized.b || 0;
      var a = serialized.a;
      instance.a = a === undefined ? 255 : a;
      return;
    } else if (klass === cc.Size) {
      instance.width = serialized.width || 0;
      instance.height = serialized.height || 0;
      return;
    }

    var DEFAULT = Attr.DELIMETER + 'default';
    var attrs = Attr.getClassAttrs(klass);
    var fastDefinedProps = klass.__props__ || Object.keys(instance); // 遍历 instance，如果具有类型，才不会把 __type__ 也读进来

    for (var i = 0; i < fastDefinedProps.length; i++) {
      var propName = fastDefinedProps[i];
      var value = serialized[propName];

      if (value === undefined || !serialized.hasOwnProperty(propName)) {
        // not serialized,
        // recover to default value in ValueType, because eliminated properties equals to
        // its default value in ValueType, not default value in user class
        value = CCClass.getDefault(attrs[propName + DEFAULT]);
      }

      if (typeof value !== 'object') {
        instance[propName] = value;
      } else if (value) {
        this._deserializeObjField(instance, value, propName);
      } else {
        instance[propName] = null;
      }
    }
  };

  function compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, assumeHavePropIfIsValue) {
    if (defaultValue instanceof cc.ValueType) {
      // fast case
      if (!assumeHavePropIfIsValue) {
        sources.push('if(prop){');
      }

      var ctorCode = js.getClassName(defaultValue);
      sources.push("s._deserializeTypedObject(o" + accessorToSet + ",prop," + ctorCode + ");");

      if (!assumeHavePropIfIsValue) {
        sources.push('}else o' + accessorToSet + '=null;');
      }
    } else {
      sources.push('if(prop){');
      sources.push('s._deserializeObjField(o,prop,' + propNameLiteralToSet + ');');
      sources.push('}else o' + accessorToSet + '=null;');
    }
  }

  var compileDeserialize = CC_SUPPORT_JIT ? function (self, klass) {
    var TYPE = Attr.DELIMETER + 'type';
    var EDITOR_ONLY = Attr.DELIMETER + 'editorOnly';
    var DEFAULT = Attr.DELIMETER + 'default';
    var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + 'formerlySerializedAs';
    var attrs = Attr.getClassAttrs(klass);
    var props = klass.__values__; // self, obj, serializedData, klass

    var sources = ['var prop;'];
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass)); // sources.push('var vb,vn,vs,vo,vu,vf;');    // boolean, number, string, object, undefined, function

    for (var p = 0; p < props.length; p++) {
      var propName = props[p];

      if ((CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) && attrs[propName + EDITOR_ONLY]) {
        continue; // skip editor only if in preview
      }

      var accessorToSet, propNameLiteralToSet;

      if (CCClass.IDENTIFIER_RE.test(propName)) {
        propNameLiteralToSet = '"' + propName + '"';
        accessorToSet = '.' + propName;
      } else {
        propNameLiteralToSet = CCClass.escapeForJS(propName);
        accessorToSet = '[' + propNameLiteralToSet + ']';
      }

      var accessorToGet = accessorToSet;

      if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
        var propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];

        if (CCClass.IDENTIFIER_RE.test(propNameToRead)) {
          accessorToGet = '.' + propNameToRead;
        } else {
          accessorToGet = '[' + CCClass.escapeForJS(propNameToRead) + ']';
        }
      }

      sources.push('prop=d' + accessorToGet + ';');
      sources.push("if(typeof " + (CC_JSB || CC_RUNTIME ? '(prop)' : 'prop') + "!==\"undefined\"){"); // function undefined object(null) string boolean number

      var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);

      if (fastMode) {
        var isPrimitiveType;
        var userType = attrs[propName + TYPE];

        if (defaultValue === undefined && userType) {
          isPrimitiveType = userType instanceof Attr.PrimitiveType;
        } else {
          var defaultType = typeof defaultValue;
          isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
        }

        if (isPrimitiveType) {
          sources.push("o" + accessorToSet + "=prop;");
        } else {
          compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, true);
        }
      } else {
        sources.push("if(typeof " + (CC_JSB || CC_RUNTIME ? '(prop)' : 'prop') + "!==\"object\"){" + 'o' + accessorToSet + '=prop;' + '}else{');
        compileObjectTypeJit(sources, defaultValue, accessorToSet, propNameLiteralToSet, false);
        sources.push('}');
      }

      sources.push('}');
    }

    if (cc.js.isChildClassOf(klass, cc._BaseNode) || cc.js.isChildClassOf(klass, cc.Component)) {
      if (CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) {
        var mayUsedInPersistRoot = js.isChildClassOf(klass, cc.Node);

        if (mayUsedInPersistRoot) {
          sources.push('d._id&&(o._id=d._id);');
        }
      } else {
        sources.push('d._id&&(o._id=d._id);');
      }
    }

    if (props[props.length - 1] === '_$erialized') {
      // deep copy original serialized data
      sources.push('o._$erialized=JSON.parse(JSON.stringify(d));'); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

      sources.push('s._deserializePrimitiveObject(o._$erialized,d);');
    }

    return Function('s', 'o', 'd', 'k', sources.join(''));
  } : function (self, klass) {
    var fastMode = misc.BUILTIN_CLASSID_RE.test(js._getClassId(klass));
    var shouldCopyId = cc.js.isChildClassOf(klass, cc._BaseNode) || cc.js.isChildClassOf(klass, cc.Component);
    var shouldCopyRawData;
    var simpleProps = [];
    var simplePropsToRead = simpleProps;
    var advancedProps = [];
    var advancedPropsToRead = advancedProps;
    var advancedPropsValueType = [];

    (function () {
      var props = klass.__values__;
      shouldCopyRawData = props[props.length - 1] === '_$erialized';
      var attrs = Attr.getClassAttrs(klass);
      var TYPE = Attr.DELIMETER + 'type';
      var DEFAULT = Attr.DELIMETER + 'default';
      var FORMERLY_SERIALIZED_AS = Attr.DELIMETER + 'formerlySerializedAs';

      for (var p = 0; p < props.length; p++) {
        var propName = props[p];
        var propNameToRead = propName;

        if (attrs[propName + FORMERLY_SERIALIZED_AS]) {
          propNameToRead = attrs[propName + FORMERLY_SERIALIZED_AS];
        } // function undefined object(null) string boolean number


        var defaultValue = CCClass.getDefault(attrs[propName + DEFAULT]);
        var isPrimitiveType = false;

        if (fastMode) {
          var userType = attrs[propName + TYPE];

          if (defaultValue === undefined && userType) {
            isPrimitiveType = userType instanceof Attr.PrimitiveType;
          } else {
            var defaultType = typeof defaultValue;
            isPrimitiveType = defaultType === 'string' || defaultType === 'number' || defaultType === 'boolean';
          }
        }

        if (fastMode && isPrimitiveType) {
          if (propNameToRead !== propName && simplePropsToRead === simpleProps) {
            simplePropsToRead = simpleProps.slice();
          }

          simpleProps.push(propName);

          if (simplePropsToRead !== simpleProps) {
            simplePropsToRead.push(propNameToRead);
          }
        } else {
          if (propNameToRead !== propName && advancedPropsToRead === advancedProps) {
            advancedPropsToRead = advancedProps.slice();
          }

          advancedProps.push(propName);

          if (advancedPropsToRead !== advancedProps) {
            advancedPropsToRead.push(propNameToRead);
          }

          advancedPropsValueType.push(defaultValue instanceof cc.ValueType && defaultValue.constructor);
        }
      }
    })();

    return function (s, o, d, k) {
      for (var i = 0; i < simpleProps.length; ++i) {
        var _prop = d[simplePropsToRead[i]];

        if (_prop !== undefined) {
          o[simpleProps[i]] = _prop;
        }
      }

      for (var _i2 = 0; _i2 < advancedProps.length; ++_i2) {
        var propName = advancedProps[_i2];
        var prop = d[advancedPropsToRead[_i2]];

        if (prop === undefined) {
          continue;
        }

        if (!fastMode && typeof prop !== 'object') {
          o[propName] = prop;
        } else {
          // fastMode (so will not simpleProp) or object
          var valueTypeCtor = advancedPropsValueType[_i2];

          if (valueTypeCtor) {
            if (fastMode || prop) {
              s._deserializeTypedObject(o[propName], prop, valueTypeCtor);
            } else {
              o[propName] = null;
            }
          } else {
            if (prop) {
              s._deserializeObjField(o, prop, propName);
            } else {
              o[propName] = null;
            }
          }
        }
      }

      if (shouldCopyId && d._id) {
        o._id = d._id;
      }

      if (shouldCopyRawData) {
        // deep copy original serialized data
        o._$erialized = JSON.parse(JSON.stringify(d)); // parse the serialized data as primitive javascript object, so its __id__ will be dereferenced

        s._deserializePrimitiveObject(o._$erialized, d);
      }
    };
  };

  function unlinkUnusedPrefab(self, serialized, obj) {
    var uuid = serialized['asset'] && serialized['asset'].__uuid__;

    if (uuid) {
      var last = self.result.uuidList.length - 1;

      if (self.result.uuidList[last] === uuid && self.result.uuidObjList[last] === obj && self.result.uuidPropList[last] === 'asset') {
        self.result.uuidList.pop();
        self.result.uuidObjList.pop();
        self.result.uuidPropList.pop();
      } else {
        var debugEnvOnlyInfo = 'Failed to skip prefab asset while deserializing PrefabInfo';
        cc.warn(debugEnvOnlyInfo);
      }
    }
  }

  function _deserializeFireClass(self, obj, serialized, klass) {
    var deserialize;

    if (klass.hasOwnProperty('__deserialize__')) {
      deserialize = klass.__deserialize__;
    } else {
      deserialize = compileDeserialize(self, klass); // if (CC_TEST && !isPhantomJS) {
      //     cc.log(deserialize);
      // }

      js.value(klass, '__deserialize__', deserialize, true);
    }

    deserialize(self, obj, serialized, klass); // if preview or build worker

    if (CC_PREVIEW || CC_EDITOR && self._ignoreEditorOnly) {
      if (klass === cc._PrefabInfo && !obj.sync) {
        unlinkUnusedPrefab(self, serialized, obj);
      }
    }
  }

  _Deserializer.pool = new js.Pool(function (obj) {
    obj.result = null;
    obj.customEnv = null;
    obj.deserializedList.length = 0;
    obj.deserializedData = null;
    obj._classFinder = null;
    obj._idList.length = 0;
    obj._idObjList.length = 0;
    obj._idPropList.length = 0;
  }, 1);

  _Deserializer.pool.get = function (result, classFinder, customEnv, ignoreEditorOnly) {
    var cache = this._get();

    if (cache) {
      cache.result = result;
      cache.customEnv = customEnv;
      cache._classFinder = classFinder;

      if (!CC_BUILD) {
        cache._ignoreEditorOnly = ignoreEditorOnly;
      }

      return cache;
    } else {
      return new _Deserializer(result, classFinder, customEnv, ignoreEditorOnly);
    }
  };

  return _Deserializer;
}();
/**
 * @module cc
 */

/**
 * !#en Deserialize json to cc.Asset
 * !#zh 将 JSON 反序列化为对象实例。
 *
 * @method deserialize
 * @param {String|Object} data - the serialized cc.Asset json string or json object.
 * @param {Details} [details] - additional loading result
 * @param {Object} [options]
 * @return {object} the main data(asset)
 */


var deserialize = module.exports = function (data, details, options) {
  options = options || {};
  var classFinder = options.classFinder || js._getClassById; // 启用 createAssetRefs 后，如果有 url 属性则会被统一强制设置为 { uuid: 'xxx' }，必须后面再特殊处理

  var createAssetRefs = options.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE;
  var customEnv = options.customEnv;
  var ignoreEditorOnly = options.ignoreEditorOnly; //var oldJson = JSON.stringify(data, null, 2);

  var tempDetails = !details;
  details = details || Details.pool.get();

  var deserializer = _Deserializer.pool.get(details, classFinder, customEnv, ignoreEditorOnly);

  cc.game._isCloning = true;
  var res = deserializer.deserialize(data);
  cc.game._isCloning = false;

  _Deserializer.pool.put(deserializer);

  if (createAssetRefs) {
    details.assignAssetsBy(Editor.serialize.asAsset);
  }

  if (tempDetails) {
    Details.pool.put(details);
  } //var afterJson = JSON.stringify(data, null, 2);
  //if (oldJson !== afterJson) {
  //    throw new Error('JSON SHOULD not changed');
  //}


  return res;
};

deserialize.Details = Details;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxkZXNlcmlhbGl6ZS1lZGl0b3IuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiQXR0ciIsIkNDQ2xhc3MiLCJtaXNjIiwiRGV0YWlscyIsInV1aWRMaXN0IiwidXVpZE9iakxpc3QiLCJ1dWlkUHJvcExpc3QiLCJwcm90b3R5cGUiLCJyZXNldCIsImxlbmd0aCIsIkNDX0VESVRPUiIsIkNDX1RFU1QiLCJhc3NpZ25Bc3NldHNCeSIsImdldHRlciIsImkiLCJsZW4iLCJ1dWlkIiwib2JqIiwicHJvcCIsInB1c2giLCJwcm9wTmFtZSIsInBvb2wiLCJQb29sIiwiZ2V0IiwiX2dldCIsIl9EZXNlcmlhbGl6ZXIiLCJyZXN1bHQiLCJjbGFzc0ZpbmRlciIsImN1c3RvbUVudiIsImlnbm9yZUVkaXRvck9ubHkiLCJkZXNlcmlhbGl6ZWRMaXN0IiwiZGVzZXJpYWxpemVkRGF0YSIsIl9jbGFzc0ZpbmRlciIsIkNDX0JVSUxEIiwiX2lnbm9yZUVkaXRvck9ubHkiLCJfaWRMaXN0IiwiX2lkT2JqTGlzdCIsIl9pZFByb3BMaXN0IiwiX2RlcmVmZXJlbmNlIiwic2VsZiIsImlkUHJvcExpc3QiLCJpZExpc3QiLCJpZE9iakxpc3QiLCJvbkRlcmVmZXJlbmNlZCIsImlkIiwiZGVzZXJpYWxpemUiLCJqc29uT2JqIiwiQXJyYXkiLCJpc0FycmF5IiwianNvbkFycmF5IiwicmVmQ291bnQiLCJfZGVzZXJpYWxpemVPYmplY3QiLCJzZXJpYWxpemVkIiwib3duZXIiLCJrbGFzcyIsInR5cGUiLCJfX3R5cGVfXyIsImFycmF5Iiwid2luZG93IiwiY3RvciIsIm5vdFJlcG9ydGVkIiwiX2dldENsYXNzQnlJZCIsInJlcG9ydE1pc3NpbmdDbGFzcyIsIl9kZXNlcmlhbGl6ZSIsImNvbnRlbnQiLCJjYyIsIkNsYXNzIiwiX2lzQ0NDbGFzcyIsIl9kZXNlcmlhbGl6ZUZpcmVDbGFzcyIsIl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0IiwiX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0IiwiaXNBc3NldFR5cGUiLCJfZGVzZXJpYWxpemVPYmpGaWVsZCIsIl9faWRfXyIsInVuZGVmaW5lZCIsIl9fdXVpZF9fIiwiZE9iaiIsImluc3RhbmNlIiwiaGFzT3duUHJvcGVydHkiLCJWZWMyIiwieCIsInkiLCJWZWMzIiwieiIsIkNvbG9yIiwiciIsImciLCJiIiwiYSIsIlNpemUiLCJ3aWR0aCIsImhlaWdodCIsIkRFRkFVTFQiLCJERUxJTUVURVIiLCJhdHRycyIsImdldENsYXNzQXR0cnMiLCJmYXN0RGVmaW5lZFByb3BzIiwiX19wcm9wc19fIiwiT2JqZWN0Iiwia2V5cyIsInZhbHVlIiwiZ2V0RGVmYXVsdCIsImNvbXBpbGVPYmplY3RUeXBlSml0Iiwic291cmNlcyIsImRlZmF1bHRWYWx1ZSIsImFjY2Vzc29yVG9TZXQiLCJwcm9wTmFtZUxpdGVyYWxUb1NldCIsImFzc3VtZUhhdmVQcm9wSWZJc1ZhbHVlIiwiVmFsdWVUeXBlIiwiY3RvckNvZGUiLCJnZXRDbGFzc05hbWUiLCJjb21waWxlRGVzZXJpYWxpemUiLCJDQ19TVVBQT1JUX0pJVCIsIlRZUEUiLCJFRElUT1JfT05MWSIsIkZPUk1FUkxZX1NFUklBTElaRURfQVMiLCJwcm9wcyIsIl9fdmFsdWVzX18iLCJmYXN0TW9kZSIsIkJVSUxUSU5fQ0xBU1NJRF9SRSIsInRlc3QiLCJfZ2V0Q2xhc3NJZCIsInAiLCJDQ19QUkVWSUVXIiwiSURFTlRJRklFUl9SRSIsImVzY2FwZUZvckpTIiwiYWNjZXNzb3JUb0dldCIsInByb3BOYW1lVG9SZWFkIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsImlzUHJpbWl0aXZlVHlwZSIsInVzZXJUeXBlIiwiUHJpbWl0aXZlVHlwZSIsImRlZmF1bHRUeXBlIiwiaXNDaGlsZENsYXNzT2YiLCJfQmFzZU5vZGUiLCJDb21wb25lbnQiLCJtYXlVc2VkSW5QZXJzaXN0Um9vdCIsIk5vZGUiLCJGdW5jdGlvbiIsImpvaW4iLCJzaG91bGRDb3B5SWQiLCJzaG91bGRDb3B5UmF3RGF0YSIsInNpbXBsZVByb3BzIiwic2ltcGxlUHJvcHNUb1JlYWQiLCJhZHZhbmNlZFByb3BzIiwiYWR2YW5jZWRQcm9wc1RvUmVhZCIsImFkdmFuY2VkUHJvcHNWYWx1ZVR5cGUiLCJzbGljZSIsImNvbnN0cnVjdG9yIiwicyIsIm8iLCJkIiwiayIsInZhbHVlVHlwZUN0b3IiLCJfaWQiLCJfJGVyaWFsaXplZCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInVubGlua1VudXNlZFByZWZhYiIsImxhc3QiLCJwb3AiLCJkZWJ1Z0Vudk9ubHlJbmZvIiwid2FybiIsIl9fZGVzZXJpYWxpemVfXyIsIl9QcmVmYWJJbmZvIiwic3luYyIsImNhY2hlIiwibW9kdWxlIiwiZXhwb3J0cyIsImRhdGEiLCJkZXRhaWxzIiwib3B0aW9ucyIsImNyZWF0ZUFzc2V0UmVmcyIsInN5cyIsInBsYXRmb3JtIiwiRURJVE9SX0NPUkUiLCJ0ZW1wRGV0YWlscyIsImRlc2VyaWFsaXplciIsImdhbWUiLCJfaXNDbG9uaW5nIiwicmVzIiwicHV0IiwiRWRpdG9yIiwic2VyaWFsaXplIiwiYXNBc3NldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQStCQTs7OztBQS9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSUMsSUFBSSxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUFsQjs7QUFDQSxJQUFJRSxPQUFPLEdBQUdGLE9BQU8sQ0FBQyxXQUFELENBQXJCOztBQUNBLElBQUlHLElBQUksR0FBR0gsT0FBTyxDQUFDLGVBQUQsQ0FBbEI7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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SyxNQUFNLENBQUNDLFNBQVAsQ0FBaUJDLE9BQXhDO0FBQ0g7O0FBQ0QsTUFBSVIsV0FBSixFQUFpQjtBQUNiL0ssSUFBQUEsT0FBTyxDQUFDa0IsSUFBUixDQUFha0ssR0FBYixDQUFpQlgsT0FBakI7QUFDSCxHQXhCZ0UsQ0EwQmpFO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxTQUFPVSxHQUFQO0FBQ0gsQ0FoQ0Q7O0FBa0NBekksV0FBVyxDQUFDMUMsT0FBWixHQUFzQkEsT0FBdEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG52YXIganMgPSByZXF1aXJlKCcuL2pzJyk7XHJcbnZhciBBdHRyID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGUnKTtcclxudmFyIENDQ2xhc3MgPSByZXF1aXJlKCcuL0NDQ2xhc3MnKTtcclxudmFyIG1pc2MgPSByZXF1aXJlKCcuLi91dGlscy9taXNjJyk7XHJcblxyXG5pbXBvcnQgZGVzZXJpYWxpemVDb21waWxlZCBmcm9tICcuL2Rlc2VyaWFsaXplLWNvbXBpbGVkJztcclxuXHJcbi8vIEhFTFBFUlNcclxuXHJcbi8qKlxyXG4gKiAhI2VuIENvbnRhaW5zIGluZm9ybWF0aW9uIGNvbGxlY3RlZCBkdXJpbmcgZGVzZXJpYWxpemF0aW9uXHJcbiAqICEjemgg5YyF5ZCr5Y+N5bqP5YiX5YyW5pe255qE5LiA5Lqb5L+h5oGvXHJcbiAqIEBjbGFzcyBEZXRhaWxzXHJcbiAqXHJcbiAqL1xyXG52YXIgRGV0YWlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gICAgICogbGlzdCBvZiB0aGUgZGVwZW5kcyBhc3NldHMnIHV1aWRcclxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nW119IHV1aWRMaXN0XHJcbiAgICAgKi9cclxuICAgIHRoaXMudXVpZExpc3QgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogdGhlIG9iaiBsaXN0IHdob3NlIGZpZWxkIG5lZWRzIHRvIGxvYWQgYXNzZXQgYnkgdXVpZFxyXG4gICAgICogQHByb3BlcnR5IHtPYmplY3RbXX0gdXVpZE9iakxpc3RcclxuICAgICAqL1xyXG4gICAgdGhpcy51dWlkT2JqTGlzdCA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgY29ycmVzcG9uZGluZyBmaWVsZCBuYW1lIHdoaWNoIHJlZmVyZW5jZWQgdG8gdGhlIGFzc2V0XHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB1dWlkUHJvcExpc3RcclxuICAgICAqL1xyXG4gICAgdGhpcy51dWlkUHJvcExpc3QgPSBbXTtcclxufTtcclxuLyoqXHJcbiAqIEBtZXRob2QgcmVzZXRcclxuICovXHJcbkRldGFpbHMucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy51dWlkTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy51dWlkT2JqTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy51dWlkUHJvcExpc3QubGVuZ3RoID0gMDtcclxufTtcclxuaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICBEZXRhaWxzLnByb3RvdHlwZS5hc3NpZ25Bc3NldHNCeSA9IGZ1bmN0aW9uIChnZXR0ZXIpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy51dWlkTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9IHRoaXMudXVpZExpc3RbaV07XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLnV1aWRPYmpMaXN0W2ldO1xyXG4gICAgICAgICAgICB2YXIgcHJvcCA9IHRoaXMudXVpZFByb3BMaXN0W2ldO1xyXG4gICAgICAgICAgICBvYmpbcHJvcF0gPSBnZXR0ZXIodXVpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG4vLyAvKipcclxuLy8gICogQG1ldGhvZCBnZXRVdWlkT2ZcclxuLy8gICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4vLyAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcclxuLy8gICogQHJldHVybiB7U3RyaW5nfVxyXG4vLyAgKi9cclxuLy8gRGV0YWlscy5wcm90b3R5cGUuZ2V0VXVpZE9mID0gZnVuY3Rpb24gKG9iaiwgcHJvcE5hbWUpIHtcclxuLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51dWlkT2JqTGlzdC5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgIGlmICh0aGlzLnV1aWRPYmpMaXN0W2ldID09PSBvYmogJiYgdGhpcy51dWlkUHJvcExpc3RbaV0gPT09IHByb3BOYW1lKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0aGlzLnV1aWRMaXN0W2ldO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gICAgIHJldHVybiBcIlwiO1xyXG4vLyB9O1xyXG4vKipcclxuICogQG1ldGhvZCBwdXNoXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSB1dWlkXHJcbiAqL1xyXG5EZXRhaWxzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKG9iaiwgcHJvcE5hbWUsIHV1aWQpIHtcclxuICAgIHRoaXMudXVpZExpc3QucHVzaCh1dWlkKTtcclxuICAgIHRoaXMudXVpZE9iakxpc3QucHVzaChvYmopO1xyXG4gICAgdGhpcy51dWlkUHJvcExpc3QucHVzaChwcm9wTmFtZSk7XHJcbn07XHJcblxyXG5EZXRhaWxzLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICBvYmoucmVzZXQoKTtcclxufSwgMTApO1xyXG5cclxuRGV0YWlscy5wb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXQoKSB8fCBuZXcgRGV0YWlscygpO1xyXG59O1xyXG5cclxuLy8gSU1QTEVNRU5UIE9GIERFU0VSSUFMSVpBVElPTlxyXG5cclxudmFyIF9EZXNlcmlhbGl6ZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gX0Rlc2VyaWFsaXplcihyZXN1bHQsIGNsYXNzRmluZGVyLCBjdXN0b21FbnYsIGlnbm9yZUVkaXRvck9ubHkpIHtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcclxuICAgICAgICB0aGlzLmN1c3RvbUVudiA9IGN1c3RvbUVudjtcclxuICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmRlc2VyaWFsaXplZERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2NsYXNzRmluZGVyID0gY2xhc3NGaW5kZXI7XHJcbiAgICAgICAgaWYgKCFDQ19CVUlMRCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVFZGl0b3JPbmx5ID0gaWdub3JlRWRpdG9yT25seTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faWRMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5faWRPYmpMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5faWRQcm9wTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9kZXJlZmVyZW5jZSAoc2VsZikge1xyXG4gICAgICAgIC8vIOi/memHjOS4jemHh+eUqOmBjeWOhuWPjeW6j+WIl+WMlue7k+aenOeahOaWueW8j++8jOWboOS4uuWPjeW6j+WIl+WMlueahOe7k+aenOWmguaenOW8leeUqOWIsOWkjeadgueahOWklumDqOW6k++8jOW+iOWuueaYk+WghuagiOa6ouWHuuOAglxyXG4gICAgICAgIHZhciBkZXNlcmlhbGl6ZWRMaXN0ID0gc2VsZi5kZXNlcmlhbGl6ZWRMaXN0O1xyXG4gICAgICAgIHZhciBpZFByb3BMaXN0ID0gc2VsZi5faWRQcm9wTGlzdDtcclxuICAgICAgICB2YXIgaWRMaXN0ID0gc2VsZi5faWRMaXN0O1xyXG4gICAgICAgIHZhciBpZE9iakxpc3QgPSBzZWxmLl9pZE9iakxpc3Q7XHJcbiAgICAgICAgdmFyIG9uRGVyZWZlcmVuY2VkID0gc2VsZi5fY2xhc3NGaW5kZXIgJiYgc2VsZi5fY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQ7XHJcbiAgICAgICAgdmFyIGksIHByb3BOYW1lLCBpZDtcclxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIG9uRGVyZWZlcmVuY2VkKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBpZExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gaWRQcm9wTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlkID0gaWRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWRPYmpMaXN0W2ldW3Byb3BOYW1lXSA9IGRlc2VyaWFsaXplZExpc3RbaWRdO1xyXG4gICAgICAgICAgICAgICAgb25EZXJlZmVyZW5jZWQoZGVzZXJpYWxpemVkTGlzdCwgaWQsIGlkT2JqTGlzdFtpXSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wTmFtZSA9IGlkUHJvcExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZCA9IGlkTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlkT2JqTGlzdFtpXVtwcm9wTmFtZV0gPSBkZXNlcmlhbGl6ZWRMaXN0W2lkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcHJvdG90eXBlID0gX0Rlc2VyaWFsaXplci5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG90eXBlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24gKGpzb25PYmopIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uT2JqKSkge1xyXG4gICAgICAgICAgICB2YXIganNvbkFycmF5ID0ganNvbk9iajtcclxuICAgICAgICAgICAgdmFyIHJlZkNvdW50ID0ganNvbkFycmF5Lmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0Lmxlbmd0aCA9IHJlZkNvdW50O1xyXG4gICAgICAgICAgICAvLyBkZXNlcmlhbGl6ZVxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uQXJyYXlbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2ldID0gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbkFycmF5W2ldLCB0aGlzLmRlc2VyaWFsaXplZExpc3QsICcnICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3RbaV0gPSB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uQXJyYXlbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZERhdGEgPSByZWZDb3VudCA+IDAgPyB0aGlzLmRlc2VyaWFsaXplZExpc3RbMF0gOiBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gY2FsbGJhY2tcclxuICAgICAgICAgICAgLy9mb3IgKHZhciBqID0gMDsgaiA8IHJlZkNvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHJlZmVyZW5jZWRMaXN0W2pdLm9uQWZ0ZXJEZXNlcmlhbGl6ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmVmZXJlbmNlZExpc3Rbal0ub25BZnRlckRlc2VyaWFsaXplKCk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZExpc3QubGVuZ3RoID0gMTtcclxuICAgICAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2VyaWFsaXplZERhdGEgPSBqc29uT2JqID8gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbk9iaiwgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0LCAnMCcpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzZXJpYWxpemVkRGF0YSA9IGpzb25PYmogPyB0aGlzLl9kZXNlcmlhbGl6ZU9iamVjdChqc29uT2JqKSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kZXNlcmlhbGl6ZWRMaXN0WzBdID0gdGhpcy5kZXNlcmlhbGl6ZWREYXRhO1xyXG5cclxuICAgICAgICAgICAgLy8vLyBjYWxsYmFja1xyXG4gICAgICAgICAgICAvL2lmIChkZXNlcmlhbGl6ZWREYXRhLm9uQWZ0ZXJEZXNlcmlhbGl6ZSkge1xyXG4gICAgICAgICAgICAvLyAgICBkZXNlcmlhbGl6ZWREYXRhLm9uQWZ0ZXJEZXNlcmlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRlcmVmZXJlbmNlXHJcbiAgICAgICAgX2RlcmVmZXJlbmNlKHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5kZXNlcmlhbGl6ZWREYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy8qKlxyXG4gICAgLy8gKiBAcGFyYW0ge09iamVjdH0gc2VyaWFsaXplZCAtIFRoZSBvYmogdG8gZGVzZXJpYWxpemUsIG11c3QgYmUgbm9uLW5pbFxyXG4gICAgLy8gKiBAcGFyYW0ge09iamVjdH0gW293bmVyXSAtIGRlYnVnIG9ubHlcclxuICAgIC8vICogQHBhcmFtIHtTdHJpbmd9IFtwcm9wTmFtZV0gLSBkZWJ1ZyBvbmx5XHJcbiAgICAvLyAqL1xyXG4gICAgcHJvdG90eXBlLl9kZXNlcmlhbGl6ZU9iamVjdCA9IGZ1bmN0aW9uIChzZXJpYWxpemVkLCBvd25lciwgcHJvcE5hbWUpIHtcclxuICAgICAgICB2YXIgcHJvcDtcclxuICAgICAgICB2YXIgb2JqID0gbnVsbDsgICAgIC8vIHRoZSBvYmogdG8gcmV0dXJuXHJcbiAgICAgICAgdmFyIGtsYXNzID0gbnVsbDtcclxuICAgICAgICB2YXIgdHlwZSA9IHNlcmlhbGl6ZWQuX190eXBlX187XHJcbiAgICAgICAgaWYgKHR5cGUgPT09ICdUeXBlZEFycmF5Jykge1xyXG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBzZXJpYWxpemVkLmFycmF5O1xyXG4gICAgICAgICAgICBvYmogPSBuZXcgd2luZG93W3NlcmlhbGl6ZWQuY3Rvcl0oYXJyYXkubGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgb2JqW2ldID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gVHlwZSBPYmplY3QgKGluY2x1ZGluZyBDQ0NsYXNzKVxyXG5cclxuICAgICAgICAgICAga2xhc3MgPSB0aGlzLl9jbGFzc0ZpbmRlcih0eXBlLCBzZXJpYWxpemVkLCBvd25lciwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIWtsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm90UmVwb3J0ZWQgPSB0aGlzLl9jbGFzc0ZpbmRlciA9PT0ganMuX2dldENsYXNzQnlJZDtcclxuICAgICAgICAgICAgICAgIGlmIChub3RSZXBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2VyaWFsaXplLnJlcG9ydE1pc3NpbmdDbGFzcyh0eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpbnN0YW50aWF0ZSBhIG5ldyBvYmplY3RcclxuICAgICAgICAgICAgb2JqID0gbmV3IGtsYXNzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqLl9kZXNlcmlhbGl6ZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqLl9kZXNlcmlhbGl6ZShzZXJpYWxpemVkLmNvbnRlbnQsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2MuQ2xhc3MuX2lzQ0NDbGFzcyhrbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIF9kZXNlcmlhbGl6ZUZpcmVDbGFzcyh0aGlzLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3Qob2JqLCBzZXJpYWxpemVkLCBrbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoICFBcnJheS5pc0FycmF5KHNlcmlhbGl6ZWQpICkge1xyXG5cclxuICAgICAgICAgICAgLy8gZW1iZWRkZWQgcHJpbWl0aXZlIGphdmFzY3JpcHQgb2JqZWN0XHJcblxyXG4gICAgICAgICAgICBvYmogPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3Qob2JqLCBzZXJpYWxpemVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBBcnJheVxyXG5cclxuICAgICAgICAgICAgb2JqID0gbmV3IEFycmF5KHNlcmlhbGl6ZWQubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VyaWFsaXplZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcHJvcCA9IHNlcmlhbGl6ZWRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmIHByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXNBc3NldFR5cGUgPSB0aGlzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG9iaiwgcHJvcCwgJycgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBc3NldFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsbCBkZWZhdWx0IHZhbHVlIGZvciBwcmltaXRpdmUgb2JqZWN0cyAobm8gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqW2ldID0gcHJvcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDlkowgX2Rlc2VyaWFsaXplT2JqZWN0IOS4jeWQjOeahOWcsOaWueWcqOS6juS8muWIpOaWrSBpZCDlkowgdXVpZFxyXG4gICAgcHJvdG90eXBlLl9kZXNlcmlhbGl6ZU9iakZpZWxkID0gZnVuY3Rpb24gKG9iaiwganNvbk9iaiwgcHJvcE5hbWUpIHtcclxuICAgICAgICB2YXIgaWQgPSBqc29uT2JqLl9faWRfXztcclxuICAgICAgICBpZiAoaWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9IGpzb25PYmouX191dWlkX187XHJcbiAgICAgICAgICAgIGlmICh1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdC5wdXNoKG9iaiwgcHJvcE5hbWUsIHV1aWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcE5hbWVdID0gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbk9iaiwgb2JqLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcE5hbWVdID0gdGhpcy5fZGVzZXJpYWxpemVPYmplY3QoanNvbk9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBkT2JqID0gdGhpcy5kZXNlcmlhbGl6ZWRMaXN0W2lkXTtcclxuICAgICAgICAgICAgaWYgKGRPYmopIHtcclxuICAgICAgICAgICAgICAgIG9ialtwcm9wTmFtZV0gPSBkT2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWRMaXN0LnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWRPYmpMaXN0LnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lkUHJvcExpc3QucHVzaChwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvdHlwZS5fZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3QgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHNlcmlhbGl6ZWQpIHtcclxuICAgICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBzZXJpYWxpemVkKSB7XHJcbiAgICAgICAgICAgIGlmIChzZXJpYWxpemVkLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBzZXJpYWxpemVkW3Byb3BOYW1lXTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcCAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWUgIT09ICdfX3R5cGVfXycvKiAmJiBrICE9ICdfX2lkX18nKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gcHJvcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNBc3NldFR5cGUgPSB0aGlzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKGluc3RhbmNlLCBwcm9wLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Fzc2V0VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsbCBkZWZhdWx0IHZhbHVlIGZvciBwcmltaXRpdmUgb2JqZWN0cyAobm8gY29uc3RydWN0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGZ1bmN0aW9uIF9jb21waWxlVHlwZWRPYmplY3QgKGFjY2Vzc29yLCBrbGFzcywgY3RvckNvZGUpIHtcclxuICAgIC8vICAgICBpZiAoa2xhc3MgPT09IGNjLlZlYzIpIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGB7YCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0ueD1wcm9wLnh8fDA7YCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0ueT1wcm9wLnl8fDA7YCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICBgfWA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2UgaWYgKGtsYXNzID09PSBjYy5Db2xvcikge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gYHtgICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBgbyR7YWNjZXNzb3J9LnI9cHJvcC5yfHwwO2AgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0uZz1wcm9wLmd8fDA7YCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS5iPXByb3AuYnx8MDtgICtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICBgbyR7YWNjZXNzb3J9LmE9KHByb3AuYT09PXVuZGVmaW5lZD8yNTU6cHJvcC5hKTtgICtcclxuICAgIC8vICAgICAgICAgICAgICAgIGB9YDtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLlNpemUpIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGB7YCArXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgYG8ke2FjY2Vzc29yfS53aWR0aD1wcm9wLndpZHRofHwwO2AgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgIGBvJHthY2Nlc3Nvcn0uaGVpZ2h0PXByb3AuaGVpZ2h0fHwwO2AgK1xyXG4gICAgLy8gICAgICAgICAgICAgICAgYH1gO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlIHtcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGBzLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0KG8ke2FjY2Vzc29yfSxwcm9wLCR7Y3RvckNvZGV9KTtgO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBkZXNlcmlhbGl6ZSBWYWx1ZVR5cGVcclxuICAgIHByb3RvdHlwZS5fZGVzZXJpYWxpemVUeXBlZE9iamVjdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgc2VyaWFsaXplZCwga2xhc3MpIHtcclxuICAgICAgICBpZiAoa2xhc3MgPT09IGNjLlZlYzIpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UueCA9IHNlcmlhbGl6ZWQueCB8fCAwO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gc2VyaWFsaXplZC55IHx8IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLlZlYzMpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UueCA9IHNlcmlhbGl6ZWQueCB8fCAwO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS55ID0gc2VyaWFsaXplZC55IHx8IDA7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnogPSBzZXJpYWxpemVkLnogfHwgMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChrbGFzcyA9PT0gY2MuQ29sb3IpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UuciA9IHNlcmlhbGl6ZWQuciB8fCAwO1xyXG4gICAgICAgICAgICBpbnN0YW5jZS5nID0gc2VyaWFsaXplZC5nIHx8IDA7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmIgPSBzZXJpYWxpemVkLmIgfHwgMDtcclxuICAgICAgICAgICAgdmFyIGEgPSBzZXJpYWxpemVkLmE7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmEgPSAoYSA9PT0gdW5kZWZpbmVkID8gMjU1IDogYSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoa2xhc3MgPT09IGNjLlNpemUpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2Uud2lkdGggPSBzZXJpYWxpemVkLndpZHRoIHx8IDA7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLmhlaWdodCA9IHNlcmlhbGl6ZWQuaGVpZ2h0IHx8IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XHJcbiAgICAgICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcclxuICAgICAgICB2YXIgZmFzdERlZmluZWRQcm9wcyA9IGtsYXNzLl9fcHJvcHNfXyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoaW5zdGFuY2UpOyAgICAvLyDpgY3ljoYgaW5zdGFuY2XvvIzlpoLmnpzlhbfmnInnsbvlnovvvIzmiY3kuI3kvJrmioogX190eXBlX18g5Lmf6K+76L+b5p2lXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYXN0RGVmaW5lZFByb3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wTmFtZSA9IGZhc3REZWZpbmVkUHJvcHNbaV07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNlcmlhbGl6ZWRbcHJvcE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCAhc2VyaWFsaXplZC5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vdCBzZXJpYWxpemVkLFxyXG4gICAgICAgICAgICAgICAgLy8gcmVjb3ZlciB0byBkZWZhdWx0IHZhbHVlIGluIFZhbHVlVHlwZSwgYmVjYXVzZSBlbGltaW5hdGVkIHByb3BlcnRpZXMgZXF1YWxzIHRvXHJcbiAgICAgICAgICAgICAgICAvLyBpdHMgZGVmYXVsdCB2YWx1ZSBpbiBWYWx1ZVR5cGUsIG5vdCBkZWZhdWx0IHZhbHVlIGluIHVzZXIgY2xhc3NcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGF0dHJzW3Byb3BOYW1lICsgREVGQVVMVF0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbcHJvcE5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2VyaWFsaXplT2JqRmllbGQoaW5zdGFuY2UsIHZhbHVlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtwcm9wTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21waWxlT2JqZWN0VHlwZUppdCAoc291cmNlcywgZGVmYXVsdFZhbHVlLCBhY2Nlc3NvclRvU2V0LCBwcm9wTmFtZUxpdGVyYWxUb1NldCwgYXNzdW1lSGF2ZVByb3BJZklzVmFsdWUpIHtcclxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlIGluc3RhbmNlb2YgY2MuVmFsdWVUeXBlKSB7XHJcbiAgICAgICAgICAgIC8vIGZhc3QgY2FzZVxyXG4gICAgICAgICAgICBpZiAoIWFzc3VtZUhhdmVQcm9wSWZJc1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzLnB1c2goJ2lmKHByb3ApeycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdG9yQ29kZSA9IGpzLmdldENsYXNzTmFtZShkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goYHMuX2Rlc2VyaWFsaXplVHlwZWRPYmplY3QobyR7YWNjZXNzb3JUb1NldH0scHJvcCwke2N0b3JDb2RlfSk7YCk7XHJcbiAgICAgICAgICAgIGlmICghYXNzdW1lSGF2ZVByb3BJZklzVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfWVsc2UgbycgKyBhY2Nlc3NvclRvU2V0ICsgJz1udWxsOycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ2lmKHByb3ApeycpO1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCdzLl9kZXNlcmlhbGl6ZU9iakZpZWxkKG8scHJvcCwnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcE5hbWVMaXRlcmFsVG9TZXQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICcpOycpO1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ31lbHNlIG8nICsgYWNjZXNzb3JUb1NldCArICc9bnVsbDsnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvbXBpbGVEZXNlcmlhbGl6ZSA9IENDX1NVUFBPUlRfSklUID8gZnVuY3Rpb24gKHNlbGYsIGtsYXNzKSB7XHJcbiAgICAgICAgdmFyIFRZUEUgPSBBdHRyLkRFTElNRVRFUiArICd0eXBlJztcclxuICAgICAgICB2YXIgRURJVE9SX09OTFkgPSBBdHRyLkRFTElNRVRFUiArICdlZGl0b3JPbmx5JztcclxuICAgICAgICB2YXIgREVGQVVMVCA9IEF0dHIuREVMSU1FVEVSICsgJ2RlZmF1bHQnO1xyXG4gICAgICAgIHZhciBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTID0gQXR0ci5ERUxJTUVURVIgKyAnZm9ybWVybHlTZXJpYWxpemVkQXMnO1xyXG4gICAgICAgIHZhciBhdHRycyA9IEF0dHIuZ2V0Q2xhc3NBdHRycyhrbGFzcyk7XHJcblxyXG4gICAgICAgIHZhciBwcm9wcyA9IGtsYXNzLl9fdmFsdWVzX187XHJcbiAgICAgICAgLy8gc2VsZiwgb2JqLCBzZXJpYWxpemVkRGF0YSwga2xhc3NcclxuICAgICAgICB2YXIgc291cmNlcyA9IFtcclxuICAgICAgICAgICAgJ3ZhciBwcm9wOydcclxuICAgICAgICBdO1xyXG4gICAgICAgIHZhciBmYXN0TW9kZSA9IG1pc2MuQlVJTFRJTl9DTEFTU0lEX1JFLnRlc3QoanMuX2dldENsYXNzSWQoa2xhc3MpKTtcclxuICAgICAgICAvLyBzb3VyY2VzLnB1c2goJ3ZhciB2Yix2bix2cyx2byx2dSx2ZjsnKTsgICAgLy8gYm9vbGVhbiwgbnVtYmVyLCBzdHJpbmcsIG9iamVjdCwgdW5kZWZpbmVkLCBmdW5jdGlvblxyXG4gICAgICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcHJvcHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcHNbcF07XHJcbiAgICAgICAgICAgIGlmICgoQ0NfUFJFVklFVyB8fCAoQ0NfRURJVE9SICYmIHNlbGYuX2lnbm9yZUVkaXRvck9ubHkpKSAmJiBhdHRyc1twcm9wTmFtZSArIEVESVRPUl9PTkxZXSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7ICAgLy8gc2tpcCBlZGl0b3Igb25seSBpZiBpbiBwcmV2aWV3XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhY2Nlc3NvclRvU2V0LCBwcm9wTmFtZUxpdGVyYWxUb1NldDtcclxuICAgICAgICAgICAgaWYgKENDQ2xhc3MuSURFTlRJRklFUl9SRS50ZXN0KHByb3BOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcE5hbWVMaXRlcmFsVG9TZXQgPSAnXCInICsgcHJvcE5hbWUgKyAnXCInO1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzb3JUb1NldCA9ICcuJyArIHByb3BOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvcE5hbWVMaXRlcmFsVG9TZXQgPSBDQ0NsYXNzLmVzY2FwZUZvckpTKHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGFjY2Vzc29yVG9TZXQgPSAnWycgKyBwcm9wTmFtZUxpdGVyYWxUb1NldCArICddJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFjY2Vzc29yVG9HZXQgPSBhY2Nlc3NvclRvU2V0O1xyXG4gICAgICAgICAgICBpZiAoYXR0cnNbcHJvcE5hbWUgKyBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BOYW1lVG9SZWFkID0gYXR0cnNbcHJvcE5hbWUgKyBGT1JNRVJMWV9TRVJJQUxJWkVEX0FTXTtcclxuICAgICAgICAgICAgICAgIGlmIChDQ0NsYXNzLklERU5USUZJRVJfUkUudGVzdChwcm9wTmFtZVRvUmVhZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvclRvR2V0ID0gJy4nICsgcHJvcE5hbWVUb1JlYWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvclRvR2V0ID0gJ1snICsgQ0NDbGFzcy5lc2NhcGVGb3JKUyhwcm9wTmFtZVRvUmVhZCkgKyAnXSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgncHJvcD1kJyArIGFjY2Vzc29yVG9HZXQgKyAnOycpO1xyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goYGlmKHR5cGVvZiAke0NDX0pTQiB8fCBDQ19SVU5USU1FID8gJyhwcm9wKScgOiAncHJvcCd9IT09XCJ1bmRlZmluZWRcIil7YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBmdW5jdGlvbiB1bmRlZmluZWQgb2JqZWN0KG51bGwpIHN0cmluZyBib29sZWFuIG51bWJlclxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gQ0NDbGFzcy5nZXREZWZhdWx0KGF0dHJzW3Byb3BOYW1lICsgREVGQVVMVF0pO1xyXG4gICAgICAgICAgICBpZiAoZmFzdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc1ByaW1pdGl2ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXNlclR5cGUgPSBhdHRyc1twcm9wTmFtZSArIFRZUEVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHVzZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNQcmltaXRpdmVUeXBlID0gdXNlclR5cGUgaW5zdGFuY2VvZiBBdHRyLlByaW1pdGl2ZVR5cGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFR5cGUgPSB0eXBlb2YgZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUHJpbWl0aXZlVHlwZSA9IGRlZmF1bHRUeXBlID09PSAnc3RyaW5nJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnbnVtYmVyJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnYm9vbGVhbic7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUHJpbWl0aXZlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaChgbyR7YWNjZXNzb3JUb1NldH09cHJvcDtgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBpbGVPYmplY3RUeXBlSml0KHNvdXJjZXMsIGRlZmF1bHRWYWx1ZSwgYWNjZXNzb3JUb1NldCwgcHJvcE5hbWVMaXRlcmFsVG9TZXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGBpZih0eXBlb2YgJHtDQ19KU0IgfHwgQ0NfUlVOVElNRSA/ICcocHJvcCknIDogJ3Byb3AnfSE9PVwib2JqZWN0XCIpe2AgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbycgKyBhY2Nlc3NvclRvU2V0ICsgJz1wcm9wOycgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd9ZWxzZXsnKTtcclxuICAgICAgICAgICAgICAgIGNvbXBpbGVPYmplY3RUeXBlSml0KHNvdXJjZXMsIGRlZmF1bHRWYWx1ZSwgYWNjZXNzb3JUb1NldCwgcHJvcE5hbWVMaXRlcmFsVG9TZXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnfScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLl9CYXNlTm9kZSkgfHwgY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLkNvbXBvbmVudCkpIHtcclxuICAgICAgICAgICAgaWYgKENDX1BSRVZJRVcgfHwgKENDX0VESVRPUiAmJiBzZWxmLl9pZ25vcmVFZGl0b3JPbmx5KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1heVVzZWRJblBlcnNpc3RSb290ID0ganMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1heVVzZWRJblBlcnNpc3RSb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKCdkLl9pZCYmKG8uX2lkPWQuX2lkKTsnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXMucHVzaCgnZC5faWQmJihvLl9pZD1kLl9pZCk7Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3BzW3Byb3BzLmxlbmd0aCAtIDFdID09PSAnXyRlcmlhbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgIC8vIGRlZXAgY29weSBvcmlnaW5hbCBzZXJpYWxpemVkIGRhdGFcclxuICAgICAgICAgICAgc291cmNlcy5wdXNoKCdvLl8kZXJpYWxpemVkPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZCkpOycpO1xyXG4gICAgICAgICAgICAvLyBwYXJzZSB0aGUgc2VyaWFsaXplZCBkYXRhIGFzIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdCwgc28gaXRzIF9faWRfXyB3aWxsIGJlIGRlcmVmZXJlbmNlZFxyXG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goJ3MuX2Rlc2VyaWFsaXplUHJpbWl0aXZlT2JqZWN0KG8uXyRlcmlhbGl6ZWQsZCk7Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGdW5jdGlvbigncycsICdvJywgJ2QnLCAnaycsIHNvdXJjZXMuam9pbignJykpO1xyXG4gICAgfSA6IGZ1bmN0aW9uIChzZWxmLCBrbGFzcykge1xyXG4gICAgICAgIHZhciBmYXN0TW9kZSA9IG1pc2MuQlVJTFRJTl9DTEFTU0lEX1JFLnRlc3QoanMuX2dldENsYXNzSWQoa2xhc3MpKTtcclxuICAgICAgICB2YXIgc2hvdWxkQ29weUlkID0gY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLl9CYXNlTm9kZSkgfHwgY2MuanMuaXNDaGlsZENsYXNzT2Yoa2xhc3MsIGNjLkNvbXBvbmVudCk7XHJcbiAgICAgICAgdmFyIHNob3VsZENvcHlSYXdEYXRhO1xyXG5cclxuICAgICAgICB2YXIgc2ltcGxlUHJvcHMgPSBbXTtcclxuICAgICAgICB2YXIgc2ltcGxlUHJvcHNUb1JlYWQgPSBzaW1wbGVQcm9wcztcclxuICAgICAgICB2YXIgYWR2YW5jZWRQcm9wcyA9IFtdO1xyXG4gICAgICAgIHZhciBhZHZhbmNlZFByb3BzVG9SZWFkID0gYWR2YW5jZWRQcm9wcztcclxuICAgICAgICB2YXIgYWR2YW5jZWRQcm9wc1ZhbHVlVHlwZSA9IFtdO1xyXG5cclxuICAgICAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSBrbGFzcy5fX3ZhbHVlc19fO1xyXG4gICAgICAgICAgICBzaG91bGRDb3B5UmF3RGF0YSA9IHByb3BzW3Byb3BzLmxlbmd0aCAtIDFdID09PSAnXyRlcmlhbGl6ZWQnO1xyXG5cclxuICAgICAgICAgICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcclxuICAgICAgICAgICAgdmFyIFRZUEUgPSBBdHRyLkRFTElNRVRFUiArICd0eXBlJztcclxuICAgICAgICAgICAgdmFyIERFRkFVTFQgPSBBdHRyLkRFTElNRVRFUiArICdkZWZhdWx0JztcclxuICAgICAgICAgICAgdmFyIEZPUk1FUkxZX1NFUklBTElaRURfQVMgPSBBdHRyLkRFTElNRVRFUiArICdmb3JtZXJseVNlcmlhbGl6ZWRBcyc7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBwID0gMDsgcCA8IHByb3BzLmxlbmd0aDsgcCsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wc1twXTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wTmFtZVRvUmVhZCA9IHByb3BOYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzW3Byb3BOYW1lICsgRk9STUVSTFlfU0VSSUFMSVpFRF9BU10pIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZVRvUmVhZCA9IGF0dHJzW3Byb3BOYW1lICsgRk9STUVSTFlfU0VSSUFMSVpFRF9BU107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiB1bmRlZmluZWQgb2JqZWN0KG51bGwpIHN0cmluZyBib29sZWFuIG51bWJlclxyXG4gICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IENDQ2xhc3MuZ2V0RGVmYXVsdChhdHRyc1twcm9wTmFtZSArIERFRkFVTFRdKTtcclxuICAgICAgICAgICAgICAgIHZhciBpc1ByaW1pdGl2ZVR5cGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChmYXN0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyVHlwZSA9IGF0dHJzW3Byb3BOYW1lICsgVFlQRV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIHVzZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJpbWl0aXZlVHlwZSA9IHVzZXJUeXBlIGluc3RhbmNlb2YgQXR0ci5QcmltaXRpdmVUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRUeXBlID0gdHlwZW9mIGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcmltaXRpdmVUeXBlID0gZGVmYXVsdFR5cGUgPT09ICdzdHJpbmcnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUeXBlID09PSAnbnVtYmVyJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VHlwZSA9PT0gJ2Jvb2xlYW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmYXN0TW9kZSAmJiBpc1ByaW1pdGl2ZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcE5hbWVUb1JlYWQgIT09IHByb3BOYW1lICYmIHNpbXBsZVByb3BzVG9SZWFkID09PSBzaW1wbGVQcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVQcm9wc1RvUmVhZCA9IHNpbXBsZVByb3BzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVByb3BzLnB1c2gocHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaW1wbGVQcm9wc1RvUmVhZCAhPT0gc2ltcGxlUHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltcGxlUHJvcHNUb1JlYWQucHVzaChwcm9wTmFtZVRvUmVhZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BOYW1lVG9SZWFkICE9PSBwcm9wTmFtZSAmJiBhZHZhbmNlZFByb3BzVG9SZWFkID09PSBhZHZhbmNlZFByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHNUb1JlYWQgPSBhZHZhbmNlZFByb3BzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFkdmFuY2VkUHJvcHMucHVzaChwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkdmFuY2VkUHJvcHNUb1JlYWQgIT09IGFkdmFuY2VkUHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWR2YW5jZWRQcm9wc1RvUmVhZC5wdXNoKHByb3BOYW1lVG9SZWFkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYWR2YW5jZWRQcm9wc1ZhbHVlVHlwZS5wdXNoKChkZWZhdWx0VmFsdWUgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpICYmIGRlZmF1bHRWYWx1ZS5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHMsIG8sIGQsIGspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaW1wbGVQcm9wcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3AgPSBkW3NpbXBsZVByb3BzVG9SZWFkW2ldXTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvW3NpbXBsZVByb3BzW2ldXSA9IHByb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhZHZhbmNlZFByb3BzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvcE5hbWUgPSBhZHZhbmNlZFByb3BzW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb3AgPSBkW2FkdmFuY2VkUHJvcHNUb1JlYWRbaV1dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFmYXN0TW9kZSAmJiB0eXBlb2YgcHJvcCAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvW3Byb3BOYW1lXSA9IHByb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmYXN0TW9kZSAoc28gd2lsbCBub3Qgc2ltcGxlUHJvcCkgb3Igb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlVHlwZUN0b3IgPSBhZHZhbmNlZFByb3BzVmFsdWVUeXBlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZVR5cGVDdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYXN0TW9kZSB8fCBwcm9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLl9kZXNlcmlhbGl6ZVR5cGVkT2JqZWN0KG9bcHJvcE5hbWVdLCBwcm9wLCB2YWx1ZVR5cGVDdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9bcHJvcE5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuX2Rlc2VyaWFsaXplT2JqRmllbGQobywgcHJvcCwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb1twcm9wTmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRDb3B5SWQgJiYgZC5faWQpIHtcclxuICAgICAgICAgICAgICAgIG8uX2lkID0gZC5faWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNob3VsZENvcHlSYXdEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWVwIGNvcHkgb3JpZ2luYWwgc2VyaWFsaXplZCBkYXRhXHJcbiAgICAgICAgICAgICAgICBvLl8kZXJpYWxpemVkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc2VyaWFsaXplZCBkYXRhIGFzIHByaW1pdGl2ZSBqYXZhc2NyaXB0IG9iamVjdCwgc28gaXRzIF9faWRfXyB3aWxsIGJlIGRlcmVmZXJlbmNlZFxyXG4gICAgICAgICAgICAgICAgcy5fZGVzZXJpYWxpemVQcmltaXRpdmVPYmplY3Qoby5fJGVyaWFsaXplZCwgZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHVubGlua1VudXNlZFByZWZhYiAoc2VsZiwgc2VyaWFsaXplZCwgb2JqKSB7XHJcbiAgICAgICAgdmFyIHV1aWQgPSBzZXJpYWxpemVkWydhc3NldCddICYmIHNlcmlhbGl6ZWRbJ2Fzc2V0J10uX191dWlkX187XHJcbiAgICAgICAgaWYgKHV1aWQpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3QgPSBzZWxmLnJlc3VsdC51dWlkTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5yZXN1bHQudXVpZExpc3RbbGFzdF0gPT09IHV1aWQgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRPYmpMaXN0W2xhc3RdID09PSBvYmogJiZcclxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRQcm9wTGlzdFtsYXN0XSA9PT0gJ2Fzc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQudXVpZExpc3QucG9wKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC51dWlkT2JqTGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0LnV1aWRQcm9wTGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZWJ1Z0Vudk9ubHlJbmZvID0gJ0ZhaWxlZCB0byBza2lwIHByZWZhYiBhc3NldCB3aGlsZSBkZXNlcmlhbGl6aW5nIFByZWZhYkluZm8nO1xyXG4gICAgICAgICAgICAgICAgY2Mud2FybihkZWJ1Z0Vudk9ubHlJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfZGVzZXJpYWxpemVGaXJlQ2xhc3MgKHNlbGYsIG9iaiwgc2VyaWFsaXplZCwga2xhc3MpIHtcclxuICAgICAgICB2YXIgZGVzZXJpYWxpemU7XHJcbiAgICAgICAgaWYgKGtsYXNzLmhhc093blByb3BlcnR5KCdfX2Rlc2VyaWFsaXplX18nKSkge1xyXG4gICAgICAgICAgICBkZXNlcmlhbGl6ZSA9IGtsYXNzLl9fZGVzZXJpYWxpemVfXztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRlc2VyaWFsaXplID0gY29tcGlsZURlc2VyaWFsaXplKHNlbGYsIGtsYXNzKTtcclxuICAgICAgICAgICAgLy8gaWYgKENDX1RFU1QgJiYgIWlzUGhhbnRvbUpTKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coZGVzZXJpYWxpemUpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGpzLnZhbHVlKGtsYXNzLCAnX19kZXNlcmlhbGl6ZV9fJywgZGVzZXJpYWxpemUsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXNlcmlhbGl6ZShzZWxmLCBvYmosIHNlcmlhbGl6ZWQsIGtsYXNzKTtcclxuICAgICAgICAvLyBpZiBwcmV2aWV3IG9yIGJ1aWxkIHdvcmtlclxyXG4gICAgICAgIGlmIChDQ19QUkVWSUVXIHx8IChDQ19FRElUT1IgJiYgc2VsZi5faWdub3JlRWRpdG9yT25seSkpIHtcclxuICAgICAgICAgICAgaWYgKGtsYXNzID09PSBjYy5fUHJlZmFiSW5mbyAmJiAhb2JqLnN5bmMpIHtcclxuICAgICAgICAgICAgICAgIHVubGlua1VudXNlZFByZWZhYihzZWxmLCBzZXJpYWxpemVkLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9EZXNlcmlhbGl6ZXIucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICBvYmoucmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBvYmouY3VzdG9tRW52ID0gbnVsbDtcclxuICAgICAgICBvYmouZGVzZXJpYWxpemVkTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIG9iai5kZXNlcmlhbGl6ZWREYXRhID0gbnVsbDtcclxuICAgICAgICBvYmouX2NsYXNzRmluZGVyID0gbnVsbDtcclxuICAgICAgICBvYmouX2lkTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIG9iai5faWRPYmpMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgb2JqLl9pZFByb3BMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9LCAxKTtcclxuXHJcbiAgICBfRGVzZXJpYWxpemVyLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHJlc3VsdCwgY2xhc3NGaW5kZXIsIGN1c3RvbUVudiwgaWdub3JlRWRpdG9yT25seSkge1xyXG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuX2dldCgpO1xyXG4gICAgICAgIGlmIChjYWNoZSkge1xyXG4gICAgICAgICAgICBjYWNoZS5yZXN1bHQgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIGNhY2hlLmN1c3RvbUVudiA9IGN1c3RvbUVudjtcclxuICAgICAgICAgICAgY2FjaGUuX2NsYXNzRmluZGVyID0gY2xhc3NGaW5kZXI7XHJcbiAgICAgICAgICAgIGlmICghQ0NfQlVJTEQpIHtcclxuICAgICAgICAgICAgICAgIGNhY2hlLl9pZ25vcmVFZGl0b3JPbmx5ID0gaWdub3JlRWRpdG9yT25seTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IF9EZXNlcmlhbGl6ZXIocmVzdWx0LCBjbGFzc0ZpbmRlciwgY3VzdG9tRW52LCBpZ25vcmVFZGl0b3JPbmx5KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBfRGVzZXJpYWxpemVyO1xyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIEBtb2R1bGUgY2NcclxuICovXHJcblxyXG4vKipcclxuICogISNlbiBEZXNlcmlhbGl6ZSBqc29uIHRvIGNjLkFzc2V0XHJcbiAqICEjemgg5bCGIEpTT04g5Y+N5bqP5YiX5YyW5Li65a+56LGh5a6e5L6L44CCXHJcbiAqXHJcbiAqIEBtZXRob2QgZGVzZXJpYWxpemVcclxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBkYXRhIC0gdGhlIHNlcmlhbGl6ZWQgY2MuQXNzZXQganNvbiBzdHJpbmcgb3IganNvbiBvYmplY3QuXHJcbiAqIEBwYXJhbSB7RGV0YWlsc30gW2RldGFpbHNdIC0gYWRkaXRpb25hbCBsb2FkaW5nIHJlc3VsdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAqIEByZXR1cm4ge29iamVjdH0gdGhlIG1haW4gZGF0YShhc3NldClcclxuICovXHJcbmxldCBkZXNlcmlhbGl6ZSA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRhdGEsIGRldGFpbHMsIG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgdmFyIGNsYXNzRmluZGVyID0gb3B0aW9ucy5jbGFzc0ZpbmRlciB8fCBqcy5fZ2V0Q2xhc3NCeUlkO1xyXG4gICAgLy8g5ZCv55SoIGNyZWF0ZUFzc2V0UmVmcyDlkI7vvIzlpoLmnpzmnIkgdXJsIOWxnuaAp+WImeS8muiiq+e7n+S4gOW8uuWItuiuvue9ruS4uiB7IHV1aWQ6ICd4eHgnIH3vvIzlv4XpobvlkI7pnaLlho3nibnmrorlpITnkIZcclxuICAgIHZhciBjcmVhdGVBc3NldFJlZnMgPSBvcHRpb25zLmNyZWF0ZUFzc2V0UmVmcyB8fCBjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5FRElUT1JfQ09SRTtcclxuICAgIHZhciBjdXN0b21FbnYgPSBvcHRpb25zLmN1c3RvbUVudjtcclxuICAgIHZhciBpZ25vcmVFZGl0b3JPbmx5ID0gb3B0aW9ucy5pZ25vcmVFZGl0b3JPbmx5O1xyXG5cclxuICAgIC8vdmFyIG9sZEpzb24gPSBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKTtcclxuXHJcbiAgICB2YXIgdGVtcERldGFpbHMgPSAhZGV0YWlscztcclxuICAgIGRldGFpbHMgPSBkZXRhaWxzIHx8IERldGFpbHMucG9vbC5nZXQoKTtcclxuICAgIHZhciBkZXNlcmlhbGl6ZXIgPSBfRGVzZXJpYWxpemVyLnBvb2wuZ2V0KGRldGFpbHMsIGNsYXNzRmluZGVyLCBjdXN0b21FbnYsIGlnbm9yZUVkaXRvck9ubHkpO1xyXG5cclxuICAgIGNjLmdhbWUuX2lzQ2xvbmluZyA9IHRydWU7XHJcbiAgICB2YXIgcmVzID0gZGVzZXJpYWxpemVyLmRlc2VyaWFsaXplKGRhdGEpO1xyXG4gICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgX0Rlc2VyaWFsaXplci5wb29sLnB1dChkZXNlcmlhbGl6ZXIpO1xyXG4gICAgaWYgKGNyZWF0ZUFzc2V0UmVmcykge1xyXG4gICAgICAgIGRldGFpbHMuYXNzaWduQXNzZXRzQnkoRWRpdG9yLnNlcmlhbGl6ZS5hc0Fzc2V0KTtcclxuICAgIH1cclxuICAgIGlmICh0ZW1wRGV0YWlscykge1xyXG4gICAgICAgIERldGFpbHMucG9vbC5wdXQoZGV0YWlscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy92YXIgYWZ0ZXJKc29uID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMik7XHJcbiAgICAvL2lmIChvbGRKc29uICE9PSBhZnRlckpzb24pIHtcclxuICAgIC8vICAgIHRocm93IG5ldyBFcnJvcignSlNPTiBTSE9VTEQgbm90IGNoYW5nZWQnKTtcclxuICAgIC8vfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbn07XHJcblxyXG5kZXNlcmlhbGl6ZS5EZXRhaWxzID0gRGV0YWlscztcclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=