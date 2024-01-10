
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize-compiled.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = deserialize;
exports.unpackJSONs = unpackJSONs;
exports.packCustomObjData = packCustomObjData;
exports.hasNativeDep = hasNativeDep;
exports.getDependUuidList = getDependUuidList;
exports.File = exports.Refs = exports.DataTypeID = void 0;

var _js = _interopRequireDefault(require("./js"));

var _vec = _interopRequireDefault(require("../value-types/vec2"));

var _vec2 = _interopRequireDefault(require("../value-types/vec3"));

var _vec3 = _interopRequireDefault(require("../value-types/vec4"));

var _color = _interopRequireDefault(require("../value-types/color"));

var _size = _interopRequireDefault(require("../value-types/size"));

var _rect = _interopRequireDefault(require("../value-types/rect"));

var _quat = _interopRequireDefault(require("../value-types/quat"));

var _mat = _interopRequireDefault(require("../value-types/mat4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) present Xiamen Yaji Software Co., Ltd.

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
// import Attr from './attribute';

/****************************************************************************
 * BUILT-IN TYPES / CONSTAINTS
 ****************************************************************************/
var SUPPORT_MIN_FORMAT_VERSION = 1;
var EMPTY_PLACEHOLDER = 0; // Used for Data.ValueType.
// If a value type is not registered in this list, it will be serialized to Data.Class.

var BuiltinValueTypes = [_vec["default"], // 0
_vec2["default"], // 1
_vec3["default"], // 2
_quat["default"], // 3
_color["default"], // 4
_size["default"], // 5
_rect["default"], // 6
_mat["default"] // 7
]; // Used for Data.ValueTypeCreated.

function BuiltinValueTypeParsers_xyzw(obj, data) {
  obj.x = data[1];
  obj.y = data[2];
  obj.z = data[3];
  obj.w = data[4];
}

var BuiltinValueTypeSetters = [function (obj, data) {
  obj.x = data[1];
  obj.y = data[2];
}, function (obj, data) {
  obj.x = data[1];
  obj.y = data[2];
  obj.z = data[3];
}, BuiltinValueTypeParsers_xyzw, // Vec4
BuiltinValueTypeParsers_xyzw, // Quat
function (obj, data) {
  obj._val = data[1];
}, function (obj, data) {
  obj.width = data[1];
  obj.height = data[2];
}, function (obj, data) {
  obj.x = data[1];
  obj.y = data[2];
  obj.width = data[3];
  obj.height = data[4];
}, function (obj, data) {
  _mat["default"].fromArray(obj, data, 1);
}];

function serializeBuiltinValueTypes(obj) {
  var ctor = obj.constructor;
  var typeId = BuiltinValueTypes.indexOf(ctor);

  switch (ctor) {
    case _vec["default"]:
      // @ts-ignore
      return [typeId, obj.x, obj.y];

    case _vec2["default"]:
      // @ts-ignore
      return [typeId, obj.x, obj.y, obj.z];

    case _vec3["default"]:
    case _quat["default"]:
      // @ts-ignore
      return [typeId, obj.x, obj.y, obj.z, obj.w];

    case _color["default"]:
      // @ts-ignore
      return [typeId, obj._val];

    case _size["default"]:
      // @ts-ignore
      return [typeId, obj.width, obj.height];

    case _rect["default"]:
      // @ts-ignore
      return [typeId, obj.x, obj.y, obj.width, obj.height];

    case _mat["default"]:
      // @ts-ignore
      var res = new Array(1 + 16);
      res[VALUETYPE_SETTER] = typeId;

      _mat["default"].toArray(res, obj, 1);

      return res;

    default:
      return null;
  }
} // // TODO: Used for Data.TypedArray.
// const TypedArrays = [
//     Float32Array,
//     Float64Array,
//
//     Int8Array,
//     Int16Array,
//     Int32Array,
//
//     Uint8Array,
//     Uint16Array,
//     Uint32Array,
//
//     Uint8ClampedArray,
//     // BigInt64Array,
//     // BigUint64Array,
// ];

/****************************************************************************
 * TYPE DECLARATIONS
 ****************************************************************************/
// Includes Bitwise NOT value.
// Both T and U have non-negative integer ranges.
// When the value >= 0 represents T
// When the value is < 0, it represents ~U. Use ~x to extract the value of U.


/*@__DROP_PURE_EXPORT__*/
var DataTypeID = {
  SimpleType: 0,
  InstanceRef: 1,
  Array_InstanceRef: 2,
  Array_AssetRefByInnerObj: 3,
  Class: 4,
  ValueTypeCreated: 5,
  AssetRefByInnerObj: 6,
  TRS: 7,
  ValueType: 8,
  Array_Class: 9,
  CustomizedClass: 10,
  Dict: 11,
  Array: 12,
  ARRAY_LENGTH: 13
};
exports.DataTypeID = DataTypeID;

/**
 * If the value type is different, different Classes will be generated
 */
var CLASS_TYPE = 0;
var CLASS_KEYS = 1;
var CLASS_PROP_TYPE_OFFSET = 2;

/**
 * Mask is used to define the properties and types that need to be deserialized.
 * Instances of the same class may have different Masks due to different default properties removed.
 */
var MASK_CLASS = 0;
var OBJ_DATA_MASK = 0;
var CUSTOM_OBJ_DATA_CLASS = 0;
var CUSTOM_OBJ_DATA_CONTENT = 1;
var VALUETYPE_SETTER = 0;
var DICT_JSON_LAYOUT = 0;
var ARRAY_ITEM_VALUES = 0;
// const TYPEDARRAY_TYPE = 0;
// const TYPEDARRAY_ELEMENTS = 1;
// export interface ITypedArrayData extends Array<number|number[]> {
//     [TYPEDARRAY_TYPE]: number,
//     [TYPEDARRAY_ELEMENTS]: number[],
// }

/*@__DROP_PURE_EXPORT__*/
var Refs = {
  EACH_RECORD_LENGTH: 3,
  OWNER_OFFSET: 0,
  KEY_OFFSET: 1,
  TARGET_OFFSET: 2
};
exports.Refs = Refs;

/*@__DROP_PURE_EXPORT__*/
var File = {
  Version: 0,
  Context: 0,
  SharedUuids: 1,
  SharedStrings: 2,
  SharedClasses: 3,
  SharedMasks: 4,
  Instances: 5,
  InstanceTypes: 6,
  Refs: 7,
  DependObjs: 8,
  DependKeys: 9,
  DependUuidIndices: 10,
  ARRAY_LENGTH: 11
}; // Main file structure

exports.File = File;
var PACKED_SECTIONS = File.Instances;

/****************************************************************************
 * IMPLEMENTS
 ****************************************************************************/

/**
 * !#en Contains meta information collected during deserialization
 * !#zh 包含反序列化后附带的元信息
 * @class Details
 */
var Details = /*#__PURE__*/function () {
  function Details() {
    this.uuidObjList = null;
    this.uuidPropList = null;
    this.uuidList = null;
  }

  var _proto = Details.prototype;

  /**
   * @method init
   * @param {Object} data
   */
  _proto.init = function init(data) {
    this.uuidObjList = data[File.DependObjs];
    this.uuidPropList = data[File.DependKeys];
    this.uuidList = data[File.DependUuidIndices];
  }
  /**
   * @method reset
   */
  ;

  _proto.reset = function reset() {
    this.uuidList = null;
    this.uuidObjList = null;
    this.uuidPropList = null;
  };

  /**
   * @method push
   * @param {Object} obj
   * @param {String} propName
   * @param {String} uuid
   */
  _proto.push = function push(obj, propName, uuid) {
    this.uuidObjList.push(obj);
    this.uuidPropList.push(propName);
    this.uuidList.push(uuid);
  };

  return Details;
}();

Details.pool = new _js["default"].Pool(function (obj) {
  obj.reset();
}, 5);

Details.pool.get = function () {
  return this._get() || new Details();
};

if (CC_EDITOR || CC_TEST) {
  // @ts-ignore
  Details.prototype.assignAssetsBy = function (getter) {
    for (var i = 0, len = this.uuidList.length; i < len; i++) {
      var obj = this.uuidObjList[i];
      var prop = this.uuidPropList[i];
      var uuid = this.uuidList[i];
      obj[prop] = getter(uuid);
    }
  };
}

function dereference(refs, instances, strings) {
  var dataLength = refs.length - 1;
  var i = 0; // owner is object

  var instanceOffset = refs[dataLength] * Refs.EACH_RECORD_LENGTH;

  for (; i < instanceOffset; i += Refs.EACH_RECORD_LENGTH) {
    var _owner = refs[i];
    var target = instances[refs[i + Refs.TARGET_OFFSET]];
    var keyIndex = refs[i + Refs.KEY_OFFSET];

    if (keyIndex >= 0) {
      _owner[strings[keyIndex]] = target;
    } else {
      _owner[~keyIndex] = target;
    }
  } // owner is instance index


  for (; i < dataLength; i += Refs.EACH_RECORD_LENGTH) {
    var _owner2 = instances[refs[i]];
    var _target = instances[refs[i + Refs.TARGET_OFFSET]];
    var _keyIndex = refs[i + Refs.KEY_OFFSET];

    if (_keyIndex >= 0) {
      _owner2[strings[_keyIndex]] = _target;
    } else {
      _owner2[~_keyIndex] = _target;
    }
  }
} //


function deserializeCCObject(data, objectData) {
  var mask = data[File.SharedMasks][objectData[OBJ_DATA_MASK]];
  var clazz = mask[MASK_CLASS];
  var ctor = clazz[CLASS_TYPE]; // if (!ctor) {
  //     return null;
  // }

  var obj = new ctor();
  var keys = clazz[CLASS_KEYS];
  var classTypeOffset = clazz[CLASS_PROP_TYPE_OFFSET];
  var maskTypeOffset = mask[mask.length - 1]; // parse simple type

  var i = MASK_CLASS + 1;

  for (; i < maskTypeOffset; ++i) {
    var _key = keys[mask[i]];
    obj[_key] = objectData[i];
  } // parse advanced type


  for (; i < objectData.length; ++i) {
    var _key2 = keys[mask[i]];
    var _type = clazz[mask[i] + classTypeOffset];
    var op = ASSIGNMENTS[_type];
    op(data, obj, _key2, objectData[i]);
  }

  return obj;
}

function deserializeCustomCCObject(data, ctor, value) {
  var obj = new ctor();

  if (obj._deserialize) {
    obj._deserialize(value, data[File.Context]);
  } else {
    cc.errorID(5303, _js["default"].getClassName(ctor));
  }

  return obj;
} // Parse Functions


function assignSimple(data, owner, key, value) {
  owner[key] = value;
}

function assignInstanceRef(data, owner, key, value) {
  if (value >= 0) {
    owner[key] = data[File.Instances][value];
  } else {
    data[File.Refs][~value * Refs.EACH_RECORD_LENGTH] = owner;
  }
}

function genArrayParser(parser) {
  return function (data, owner, key, value) {
    owner[key] = value;

    for (var i = 0; i < value.length; ++i) {
      // @ts-ignore
      parser(data, value, i, value[i]);
    }
  };
}

function parseAssetRefByInnerObj(data, owner, key, value) {
  owner[key] = null;
  data[File.DependObjs][value] = owner;
}

function parseClass(data, owner, key, value) {
  owner[key] = deserializeCCObject(data, value);
}

function parseCustomClass(data, owner, key, value) {
  var ctor = data[File.SharedClasses][value[CUSTOM_OBJ_DATA_CLASS]];
  owner[key] = deserializeCustomCCObject(data, ctor, value[CUSTOM_OBJ_DATA_CONTENT]);
}

function parseValueTypeCreated(data, owner, key, value) {
  BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](owner[key], value);
}

function parseValueType(data, owner, key, value) {
  var val = new BuiltinValueTypes[value[VALUETYPE_SETTER]]();
  BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
  owner[key] = val;
}

function parseTRS(data, owner, key, value) {
  var typedArray = owner[key];
  typedArray.set(value);
}

function parseDict(data, owner, key, value) {
  var dict = value[DICT_JSON_LAYOUT];
  owner[key] = dict;

  for (var i = DICT_JSON_LAYOUT + 1; i < value.length; i += 3) {
    var _key3 = value[i];
    var _type2 = value[i + 1];
    var subValue = value[i + 2];
    var op = ASSIGNMENTS[_type2];
    op(data, dict, _key3, subValue);
  }
}

function parseArray(data, owner, key, value) {
  var array = value[ARRAY_ITEM_VALUES];
  owner[key] = array;

  for (var i = 0; i < array.length; ++i) {
    var subValue = array[i];
    var _type3 = value[i + 1];

    if (_type3 !== DataTypeID.SimpleType) {
      var op = ASSIGNMENTS[_type3]; // @ts-ignore

      op(data, array, i, subValue);
    }
  }
} // function parseTypedArray (data: IFileData, owner: any, key: string, value: ITypedArrayData) {
//     let val: ValueType = new TypedArrays[value[TYPEDARRAY_TYPE]]();
//     BuiltinValueTypeSetters[value[VALUETYPE_SETTER]](val, value);
//     // obj = new window[serialized.ctor](array.length);
//     // for (let i = 0; i < array.length; ++i) {
//     //     obj[i] = array[i];
//     // }
//     // return obj;
//     owner[key] = val;
// }


var ASSIGNMENTS = new Array(DataTypeID.ARRAY_LENGTH);
ASSIGNMENTS[DataTypeID.SimpleType] = assignSimple; // Only be used in the instances array

ASSIGNMENTS[DataTypeID.InstanceRef] = assignInstanceRef;
ASSIGNMENTS[DataTypeID.Array_InstanceRef] = genArrayParser(assignInstanceRef);
ASSIGNMENTS[DataTypeID.Array_AssetRefByInnerObj] = genArrayParser(parseAssetRefByInnerObj);
ASSIGNMENTS[DataTypeID.Class] = parseClass;
ASSIGNMENTS[DataTypeID.ValueTypeCreated] = parseValueTypeCreated;
ASSIGNMENTS[DataTypeID.AssetRefByInnerObj] = parseAssetRefByInnerObj;
ASSIGNMENTS[DataTypeID.TRS] = parseTRS;
ASSIGNMENTS[DataTypeID.ValueType] = parseValueType;
ASSIGNMENTS[DataTypeID.Array_Class] = genArrayParser(parseClass);
ASSIGNMENTS[DataTypeID.CustomizedClass] = parseCustomClass;
ASSIGNMENTS[DataTypeID.Dict] = parseDict;
ASSIGNMENTS[DataTypeID.Array] = parseArray; // ASSIGNMENTS[DataTypeID.TypedArray] = parseTypedArray;

function parseInstances(data) {
  var instances = data[File.Instances];
  var instanceTypes = data[File.InstanceTypes];
  var instanceTypesLen = instanceTypes === EMPTY_PLACEHOLDER ? 0 : instanceTypes.length;
  var rootIndex = instances[instances.length - 1];
  var normalObjectCount = instances.length - instanceTypesLen;

  if (typeof rootIndex !== 'number') {
    rootIndex = 0;
  } else {
    if (rootIndex < 0) {
      rootIndex = ~rootIndex;
    }

    --normalObjectCount;
  } // DataTypeID.Class


  var insIndex = 0;

  for (; insIndex < normalObjectCount; ++insIndex) {
    instances[insIndex] = deserializeCCObject(data, instances[insIndex]);
  }

  var classes = data[File.SharedClasses];

  for (var typeIndex = 0; typeIndex < instanceTypesLen; ++typeIndex, ++insIndex) {
    var _type4 = instanceTypes[typeIndex];
    var eachData = instances[insIndex];

    if (_type4 >= 0) {
      // class index for DataTypeID.CustomizedClass
      var ctor = classes[_type4]; // class

      instances[insIndex] = deserializeCustomCCObject(data, ctor, eachData);
    } else {
      // Other
      _type4 = ~_type4;
      var op = ASSIGNMENTS[_type4]; // @ts-ignore

      op(data, instances, insIndex, eachData);
    }
  }

  return rootIndex;
} // const DESERIALIZE_AS = Attr.DELIMETER + 'deserializeAs';
// function deserializeAs(klass: AnyCCClass, klassLayout: IClass) {
//     var attrs = Attr.getClassAttrs(klass);
//     let keys = klassLayout[CLASS_KEYS];
//     for (let i = 0; i < keys.length; ++i) {
//         let newKey = attrs[keys[i] + DESERIALIZE_AS];
//         if (newKey) {
//             // @ts-ignore
//             if (keys.includes(newKey)) {
//                 // %s cannot be deserialized by property %s because %s was also present in the serialized data.
//                 cc.warnID(, newKey, keys[i], newKey);
//             }
//             else {
//                 keys[i] = newKey;
//             }
//         }
//     }
// }


function getMissingClass(hasCustomFinder, type) {
  if (!hasCustomFinder) {
    // @ts-ignore
    deserialize.reportMissingClass(type);
  }

  return Object;
}

function doLookupClass(classFinder, type, container, index, silent, hasCustomFinder) {
  var klass = classFinder(type);

  if (!klass) {
    // if (klass.__FSA__) {
    //     deserializeAs(klass, klassLayout as IClass);
    // }
    if (silent) {
      // generate a lazy proxy for ctor
      container[index] = function (container, index, type) {
        return function proxy() {
          var klass = classFinder(type) || getMissingClass(hasCustomFinder, type);
          container[index] = klass;
          return new klass();
        };
      }(container, index, type);

      return;
    } else {
      klass = getMissingClass(hasCustomFinder, type);
    }
  }

  container[index] = klass;
}

function lookupClasses(data, silent, customFinder) {
  var classFinder = customFinder || _js["default"]._getClassById;
  var classes = data[File.SharedClasses];

  for (var i = 0; i < classes.length; ++i) {
    var klassLayout = classes[i];

    if (typeof klassLayout !== 'string') {
      if (CC_DEBUG) {
        if (typeof klassLayout[CLASS_TYPE] === 'function') {
          throw new Error('Can not deserialize the same JSON data again.');
        }
      }

      var _type5 = klassLayout[CLASS_TYPE];
      doLookupClass(classFinder, _type5, klassLayout, CLASS_TYPE, silent, customFinder);
    } else {
      doLookupClass(classFinder, klassLayout, classes, i, silent, customFinder);
    }
  }
}

function cacheMasks(data) {
  var masks = data[File.SharedMasks];

  if (masks) {
    var classes = data[File.SharedClasses];

    for (var i = 0; i < masks.length; ++i) {
      var mask = masks[i]; // @ts-ignore

      mask[MASK_CLASS] = classes[mask[MASK_CLASS]];
    }
  }
}

function parseResult(data) {
  var instances = data[File.Instances];
  var sharedStrings = data[File.SharedStrings];
  var dependSharedUuids = data[File.SharedUuids];
  var dependObjs = data[File.DependObjs];
  var dependKeys = data[File.DependKeys];
  var dependUuids = data[File.DependUuidIndices];

  for (var i = 0; i < dependObjs.length; ++i) {
    var _obj = dependObjs[i];

    if (typeof _obj === 'number') {
      dependObjs[i] = instances[_obj];
    } else {// assigned by DataTypeID.AssetRefByInnerObj or added by Details object directly in _deserialize
    }

    var _key4 = dependKeys[i];

    if (typeof _key4 === 'number') {
      if (_key4 >= 0) {
        _key4 = sharedStrings[_key4];
      } else {
        _key4 = ~_key4;
      }

      dependKeys[i] = _key4;
    } else {// added by Details object directly in _deserialize
    }

    var uuid = dependUuids[i];

    if (typeof uuid === 'number') {
      dependUuids[i] = dependSharedUuids[uuid];
    } else {// added by Details object directly in _deserialize
    }
  }
}

function deserialize(data, details, options) {
  // @ts-ignore
  if (CC_EDITOR && Buffer.isBuffer(data)) {
    // @ts-ignore
    data = data.toString();
  }

  if (typeof data === 'string') {
    data = JSON.parse(data);
  }

  var borrowDetails = !details;
  details = details || Details.pool.get();
  details.init(data);
  options = options || {};
  var version = data[File.Version];
  var preprocessed = false;

  if (typeof version === 'object') {
    preprocessed = version.preprocessed;
    version = version.version;
  }

  if (version < SUPPORT_MIN_FORMAT_VERSION) {
    throw new Error(cc.debug.getError(5304, version));
  }

  options._version = version;
  options.result = details;
  data[File.Context] = options;

  if (!preprocessed) {
    lookupClasses(data, false, options.classFinder);
    cacheMasks(data);
  }

  cc.game._isCloning = true;
  var instances = data[File.Instances];
  var rootIndex = parseInstances(data);
  cc.game._isCloning = false;

  if (data[File.Refs]) {
    dereference(data[File.Refs], instances, data[File.SharedStrings]);
  }

  parseResult(data);

  if (borrowDetails) {
    Details.pool.put(details);
  }

  return instances[rootIndex];
}

;
deserialize.Details = Details;

var FileInfo = function FileInfo(version) {
  this.preprocessed = true;
  this.version = version;
};

function unpackJSONs(data, classFinder) {
  if (data[File.Version] < SUPPORT_MIN_FORMAT_VERSION) {
    throw new Error(cc.debug.getError(5304, data[File.Version]));
  }

  lookupClasses(data, true, classFinder);
  cacheMasks(data);
  var version = new FileInfo(data[File.Version]);
  var sharedUuids = data[File.SharedUuids];
  var sharedStrings = data[File.SharedStrings];
  var sharedClasses = data[File.SharedClasses];
  var sharedMasks = data[File.SharedMasks];
  var sections = data[PACKED_SECTIONS];

  for (var i = 0; i < sections.length; ++i) {
    sections[i].unshift(version, sharedUuids, sharedStrings, sharedClasses, sharedMasks);
  }

  return sections;
}

function packCustomObjData(type, data, hasNativeDep) {
  return [SUPPORT_MIN_FORMAT_VERSION, EMPTY_PLACEHOLDER, EMPTY_PLACEHOLDER, [type], EMPTY_PLACEHOLDER, hasNativeDep ? [data, ~0] : [data], [0], EMPTY_PLACEHOLDER, [], [], []];
}

function hasNativeDep(data) {
  var instances = data[File.Instances];
  var rootInfo = instances[instances.length - 1];

  if (typeof rootInfo !== 'number') {
    return false;
  } else {
    return rootInfo < 0;
  }
}

if (CC_PREVIEW) {
  deserialize.isCompiledJson = function (json) {
    if (Array.isArray(json)) {
      var version = json[0]; // array[0] will not be a number in the editor version

      return typeof version === 'number' || version instanceof FileInfo;
    } else {
      return false;
    }
  };
}

function getDependUuidList(json) {
  var sharedUuids = json[File.SharedUuids];
  return json[File.DependUuidIndices].map(function (index) {
    return sharedUuids[index];
  });
}

if (CC_EDITOR || CC_TEST) {
  cc._deserializeCompiled = deserialize;
  deserialize.macros = {
    EMPTY_PLACEHOLDER: EMPTY_PLACEHOLDER,
    CUSTOM_OBJ_DATA_CLASS: CUSTOM_OBJ_DATA_CLASS,
    CUSTOM_OBJ_DATA_CONTENT: CUSTOM_OBJ_DATA_CONTENT,
    CLASS_TYPE: CLASS_TYPE,
    CLASS_KEYS: CLASS_KEYS,
    CLASS_PROP_TYPE_OFFSET: CLASS_PROP_TYPE_OFFSET,
    MASK_CLASS: MASK_CLASS,
    OBJ_DATA_MASK: OBJ_DATA_MASK,
    DICT_JSON_LAYOUT: DICT_JSON_LAYOUT,
    ARRAY_ITEM_VALUES: ARRAY_ITEM_VALUES,
    PACKED_SECTIONS: PACKED_SECTIONS
  };
  deserialize._BuiltinValueTypes = BuiltinValueTypes;
  deserialize._serializeBuiltinValueTypes = serializeBuiltinValueTypes;
}

if (CC_TEST) {
  cc._Test.deserializeCompiled = {
    deserialize: deserialize,
    dereference: dereference,
    deserializeCCObject: deserializeCCObject,
    deserializeCustomCCObject: deserializeCustomCCObject,
    parseInstances: parseInstances,
    parseResult: parseResult,
    cacheMasks: cacheMasks,
    File: {
      Version: File.Version,
      Context: File.Context,
      SharedUuids: File.SharedUuids,
      SharedStrings: File.SharedStrings,
      SharedClasses: File.SharedClasses,
      SharedMasks: File.SharedMasks,
      Instances: File.Instances,
      InstanceTypes: File.InstanceTypes,
      Refs: File.Refs,
      DependObjs: File.DependObjs,
      DependKeys: File.DependKeys,
      DependUuidIndices: File.DependUuidIndices // ArrayLength: File.ArrayLength,

    },
    DataTypeID: {
      SimpleType: DataTypeID.SimpleType,
      InstanceRef: DataTypeID.InstanceRef,
      Array_InstanceRef: DataTypeID.Array_InstanceRef,
      Array_AssetRefByInnerObj: DataTypeID.Array_AssetRefByInnerObj,
      Class: DataTypeID.Class,
      ValueTypeCreated: DataTypeID.ValueTypeCreated,
      AssetRefByInnerObj: DataTypeID.AssetRefByInnerObj,
      TRS: DataTypeID.TRS,
      ValueType: DataTypeID.ValueType,
      Array_Class: DataTypeID.Array_Class,
      CustomizedClass: DataTypeID.CustomizedClass,
      Dict: DataTypeID.Dict,
      Array: DataTypeID.Array // TypedArray: DataTypeID.TypedArray,

    },
    BuiltinValueTypes: BuiltinValueTypes,
    unpackJSONs: unpackJSONs
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxkZXNlcmlhbGl6ZS1jb21waWxlZC50cyJdLCJuYW1lcyI6WyJTVVBQT1JUX01JTl9GT1JNQVRfVkVSU0lPTiIsIkVNUFRZX1BMQUNFSE9MREVSIiwiQnVpbHRpblZhbHVlVHlwZXMiLCJWZWMyIiwiVmVjMyIsIlZlYzQiLCJRdWF0IiwiQ29sb3IiLCJTaXplIiwiUmVjdCIsIk1hdDQiLCJCdWlsdGluVmFsdWVUeXBlUGFyc2Vyc194eXp3Iiwib2JqIiwiZGF0YSIsIngiLCJ5IiwieiIsInciLCJCdWlsdGluVmFsdWVUeXBlU2V0dGVycyIsIl92YWwiLCJ3aWR0aCIsImhlaWdodCIsImZyb21BcnJheSIsInNlcmlhbGl6ZUJ1aWx0aW5WYWx1ZVR5cGVzIiwiY3RvciIsImNvbnN0cnVjdG9yIiwidHlwZUlkIiwiaW5kZXhPZiIsInJlcyIsIkFycmF5IiwiVkFMVUVUWVBFX1NFVFRFUiIsInRvQXJyYXkiLCJDTEFTU19UWVBFIiwiQ0xBU1NfS0VZUyIsIkNMQVNTX1BST1BfVFlQRV9PRkZTRVQiLCJNQVNLX0NMQVNTIiwiT0JKX0RBVEFfTUFTSyIsIkNVU1RPTV9PQkpfREFUQV9DTEFTUyIsIkNVU1RPTV9PQkpfREFUQV9DT05URU5UIiwiRElDVF9KU09OX0xBWU9VVCIsIkFSUkFZX0lURU1fVkFMVUVTIiwiUEFDS0VEX1NFQ1RJT05TIiwiRmlsZSIsIkluc3RhbmNlcyIsIkRldGFpbHMiLCJ1dWlkT2JqTGlzdCIsInV1aWRQcm9wTGlzdCIsInV1aWRMaXN0IiwiaW5pdCIsIkRlcGVuZE9ianMiLCJEZXBlbmRLZXlzIiwiRGVwZW5kVXVpZEluZGljZXMiLCJyZXNldCIsInB1c2giLCJwcm9wTmFtZSIsInV1aWQiLCJwb29sIiwianMiLCJQb29sIiwiZ2V0IiwiX2dldCIsIkNDX0VESVRPUiIsIkNDX1RFU1QiLCJwcm90b3R5cGUiLCJhc3NpZ25Bc3NldHNCeSIsImdldHRlciIsImkiLCJsZW4iLCJsZW5ndGgiLCJwcm9wIiwiZGVyZWZlcmVuY2UiLCJyZWZzIiwiaW5zdGFuY2VzIiwic3RyaW5ncyIsImRhdGFMZW5ndGgiLCJpbnN0YW5jZU9mZnNldCIsIlJlZnMiLCJFQUNIX1JFQ09SRF9MRU5HVEgiLCJvd25lciIsInRhcmdldCIsIlRBUkdFVF9PRkZTRVQiLCJrZXlJbmRleCIsIktFWV9PRkZTRVQiLCJkZXNlcmlhbGl6ZUNDT2JqZWN0Iiwib2JqZWN0RGF0YSIsIm1hc2siLCJTaGFyZWRNYXNrcyIsImNsYXp6Iiwia2V5cyIsImNsYXNzVHlwZU9mZnNldCIsIm1hc2tUeXBlT2Zmc2V0Iiwia2V5IiwidHlwZSIsIm9wIiwiQVNTSUdOTUVOVFMiLCJkZXNlcmlhbGl6ZUN1c3RvbUNDT2JqZWN0IiwidmFsdWUiLCJfZGVzZXJpYWxpemUiLCJDb250ZXh0IiwiY2MiLCJlcnJvcklEIiwiZ2V0Q2xhc3NOYW1lIiwiYXNzaWduU2ltcGxlIiwiYXNzaWduSW5zdGFuY2VSZWYiLCJnZW5BcnJheVBhcnNlciIsInBhcnNlciIsInBhcnNlQXNzZXRSZWZCeUlubmVyT2JqIiwicGFyc2VDbGFzcyIsInBhcnNlQ3VzdG9tQ2xhc3MiLCJTaGFyZWRDbGFzc2VzIiwicGFyc2VWYWx1ZVR5cGVDcmVhdGVkIiwicGFyc2VWYWx1ZVR5cGUiLCJ2YWwiLCJwYXJzZVRSUyIsInR5cGVkQXJyYXkiLCJzZXQiLCJwYXJzZURpY3QiLCJkaWN0Iiwic3ViVmFsdWUiLCJwYXJzZUFycmF5IiwiYXJyYXkiLCJEYXRhVHlwZUlEIiwiU2ltcGxlVHlwZSIsIkFSUkFZX0xFTkdUSCIsIkluc3RhbmNlUmVmIiwiQXJyYXlfSW5zdGFuY2VSZWYiLCJBcnJheV9Bc3NldFJlZkJ5SW5uZXJPYmoiLCJDbGFzcyIsIlZhbHVlVHlwZUNyZWF0ZWQiLCJBc3NldFJlZkJ5SW5uZXJPYmoiLCJUUlMiLCJWYWx1ZVR5cGUiLCJBcnJheV9DbGFzcyIsIkN1c3RvbWl6ZWRDbGFzcyIsIkRpY3QiLCJwYXJzZUluc3RhbmNlcyIsImluc3RhbmNlVHlwZXMiLCJJbnN0YW5jZVR5cGVzIiwiaW5zdGFuY2VUeXBlc0xlbiIsInJvb3RJbmRleCIsIm5vcm1hbE9iamVjdENvdW50IiwiaW5zSW5kZXgiLCJjbGFzc2VzIiwidHlwZUluZGV4IiwiZWFjaERhdGEiLCJnZXRNaXNzaW5nQ2xhc3MiLCJoYXNDdXN0b21GaW5kZXIiLCJkZXNlcmlhbGl6ZSIsInJlcG9ydE1pc3NpbmdDbGFzcyIsIk9iamVjdCIsImRvTG9va3VwQ2xhc3MiLCJjbGFzc0ZpbmRlciIsImNvbnRhaW5lciIsImluZGV4Iiwic2lsZW50Iiwia2xhc3MiLCJwcm94eSIsImxvb2t1cENsYXNzZXMiLCJjdXN0b21GaW5kZXIiLCJfZ2V0Q2xhc3NCeUlkIiwia2xhc3NMYXlvdXQiLCJDQ19ERUJVRyIsIkVycm9yIiwiY2FjaGVNYXNrcyIsIm1hc2tzIiwicGFyc2VSZXN1bHQiLCJzaGFyZWRTdHJpbmdzIiwiU2hhcmVkU3RyaW5ncyIsImRlcGVuZFNoYXJlZFV1aWRzIiwiU2hhcmVkVXVpZHMiLCJkZXBlbmRPYmpzIiwiZGVwZW5kS2V5cyIsImRlcGVuZFV1aWRzIiwiZGV0YWlscyIsIm9wdGlvbnMiLCJCdWZmZXIiLCJpc0J1ZmZlciIsInRvU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwiYm9ycm93RGV0YWlscyIsInZlcnNpb24iLCJWZXJzaW9uIiwicHJlcHJvY2Vzc2VkIiwiZGVidWciLCJnZXRFcnJvciIsIl92ZXJzaW9uIiwicmVzdWx0IiwiZ2FtZSIsIl9pc0Nsb25pbmciLCJwdXQiLCJGaWxlSW5mbyIsInVucGFja0pTT05zIiwic2hhcmVkVXVpZHMiLCJzaGFyZWRDbGFzc2VzIiwic2hhcmVkTWFza3MiLCJzZWN0aW9ucyIsInVuc2hpZnQiLCJwYWNrQ3VzdG9tT2JqRGF0YSIsImhhc05hdGl2ZURlcCIsInJvb3RJbmZvIiwiQ0NfUFJFVklFVyIsImlzQ29tcGlsZWRKc29uIiwianNvbiIsImlzQXJyYXkiLCJnZXREZXBlbmRVdWlkTGlzdCIsIm1hcCIsIl9kZXNlcmlhbGl6ZUNvbXBpbGVkIiwibWFjcm9zIiwiX0J1aWx0aW5WYWx1ZVR5cGVzIiwiX3NlcmlhbGl6ZUJ1aWx0aW5WYWx1ZVR5cGVzIiwiX1Rlc3QiLCJkZXNlcmlhbGl6ZUNvbXBpbGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWUE7O0FBRUE7QUFDQTtBQUNBO0FBRUEsSUFBTUEsMEJBQTBCLEdBQUcsQ0FBbkM7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxDQUExQixFQUVBO0FBQ0E7O0FBQ0EsSUFBTUMsaUJBQTBDLEdBQUcsQ0FDL0NDLGVBRCtDLEVBQ3ZDO0FBQ1JDLGdCQUYrQyxFQUV2QztBQUNSQyxnQkFIK0MsRUFHdkM7QUFDUkMsZ0JBSitDLEVBSXZDO0FBQ1JDLGlCQUwrQyxFQUt2QztBQUNSQyxnQkFOK0MsRUFNdkM7QUFDUkMsZ0JBUCtDLEVBT3ZDO0FBQ1JDLGVBUitDLENBUXZDO0FBUnVDLENBQW5ELEVBV0E7O0FBQ0EsU0FBU0MsNEJBQVQsQ0FBdUNDLEdBQXZDLEVBQWtEQyxJQUFsRCxFQUF1RTtBQUNuRUQsRUFBQUEsR0FBRyxDQUFDRSxDQUFKLEdBQVFELElBQUksQ0FBQyxDQUFELENBQVo7QUFDQUQsRUFBQUEsR0FBRyxDQUFDRyxDQUFKLEdBQVFGLElBQUksQ0FBQyxDQUFELENBQVo7QUFDQUQsRUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFILElBQUksQ0FBQyxDQUFELENBQVo7QUFDQUQsRUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFKLElBQUksQ0FBQyxDQUFELENBQVo7QUFDSDs7QUFDRCxJQUFNSyx1QkFBK0UsR0FBRyxDQUNwRixVQUFVTixH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QUVELFVBQVUsQ0FBQ0MsVUFEZjtBQUVSRSxNQUFBQSxXQUFXLEVBQUVILFVBQVUsQ0FBQ0csV0FGaEI7QUFHUkMsTUFBQUEsaUJBQWlCLEVBQUVKLFVBQVUsQ0FBQ0ksaUJBSHRCO0FBSVJDLE1BQUFBLHdCQUF3QixFQUFFTCxVQUFVLENBQUNLLHdCQUo3QjtBQUtSQyxNQUFBQSxLQUFLLEVBQUVOLFVBQVUsQ0FBQ00sS0FMVjtBQU1SQyxNQUFBQSxnQkFBZ0IsRUFBRVAsVUFBVSxDQUFDTyxnQkFOckI7QUFPUkMsTUFBQUEsa0JBQWtCLEVBQUVSLFVBQVUsQ0FBQ1Esa0JBUHZCO0FBUVJDLE1BQUFBLEdBQUcsRUFBRVQsVUFBVSxDQUFDUyxHQVJSO0FBU1JDLE1BQUFBLFNBQVMsRUFBRVYsVUFBVSxDQUFDVSxTQVRkO0FBVVJDLE1BQUFBLFdBQVcsRUFBRVgsVUFBVSxDQUFDVyxXQVZoQjtBQVdSQyxNQUFBQSxlQUFlLEVBQUVaLFVBQVUsQ0FBQ1ksZUFYcEI7QUFZUkMsTUFBQUEsSUFBSSxFQUFFYixVQUFVLENBQUNhLElBWlQ7QUFhUnpHLE1BQUFBLEtBQUssRUFBRTRGLFVBQVUsQ0FBQzVGLEtBYlYsQ0FjUjs7QUFkUSxLQXZCZTtBQXVDM0IzQixJQUFBQSxpQkFBaUIsRUFBakJBLGlCQXZDMkI7QUF3QzNCOEwsSUFBQUEsV0FBVyxFQUFYQTtBQXhDMkIsR0FBL0I7QUEwQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSBwcmVzZW50IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxyXG5cclxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcclxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXHJcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxyXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcclxuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXHJcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXHJcblxyXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cclxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IGpzIGZyb20gJy4vanMnO1xyXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZhbHVlLXR5cGUnO1xyXG5pbXBvcnQgVmVjMiBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMyJztcclxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vdmFsdWUtdHlwZXMvdmVjMyc7XHJcbmltcG9ydCBWZWM0IGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzQnO1xyXG5pbXBvcnQgQ29sb3IgZnJvbSAnLi4vdmFsdWUtdHlwZXMvY29sb3InO1xyXG5pbXBvcnQgU2l6ZSBmcm9tICcuLi92YWx1ZS10eXBlcy9zaXplJztcclxuaW1wb3J0IFJlY3QgZnJvbSAnLi4vdmFsdWUtdHlwZXMvcmVjdCc7XHJcbmltcG9ydCBRdWF0IGZyb20gJy4uL3ZhbHVlLXR5cGVzL3F1YXQnO1xyXG5pbXBvcnQgTWF0NCBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXQ0JztcclxuLy8gaW1wb3J0IEF0dHIgZnJvbSAnLi9hdHRyaWJ1dGUnO1xyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQlVJTFQtSU4gVFlQRVMgLyBDT05TVEFJTlRTXHJcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuY29uc3QgU1VQUE9SVF9NSU5fRk9STUFUX1ZFUlNJT04gPSAxO1xyXG5jb25zdCBFTVBUWV9QTEFDRUhPTERFUiA9IDA7XHJcblxyXG4vLyBVc2VkIGZvciBEYXRhLlZhbHVlVHlwZS5cclxuLy8gSWYgYSB2YWx1ZSB0eXBlIGlzIG5vdCByZWdpc3RlcmVkIGluIHRoaXMgbGlzdCwgaXQgd2lsbCBiZSBzZXJpYWxpemVkIHRvIERhdGEuQ2xhc3MuXHJcbmNvbnN0IEJ1aWx0aW5WYWx1ZVR5cGVzOiBBcnJheTx0eXBlb2YgVmFsdWVUeXBlPiA9IFtcclxuICAgIFZlYzIsICAgLy8gMFxyXG4gICAgVmVjMywgICAvLyAxXHJcbiAgICBWZWM0LCAgIC8vIDJcclxuICAgIFF1YXQsICAgLy8gM1xyXG4gICAgQ29sb3IsICAvLyA0XHJcbiAgICBTaXplLCAgIC8vIDVcclxuICAgIFJlY3QsICAgLy8gNlxyXG4gICAgTWF0NCwgICAvLyA3XHJcbl07XHJcblxyXG4vLyBVc2VkIGZvciBEYXRhLlZhbHVlVHlwZUNyZWF0ZWQuXHJcbmZ1bmN0aW9uIEJ1aWx0aW5WYWx1ZVR5cGVQYXJzZXJzX3h5encgKG9iajogVmVjNCwgZGF0YTogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgb2JqLnggPSBkYXRhWzFdO1xyXG4gICAgb2JqLnkgPSBkYXRhWzJdO1xyXG4gICAgb2JqLnogPSBkYXRhWzNdO1xyXG4gICAgb2JqLncgPSBkYXRhWzRdO1xyXG59XHJcbmNvbnN0IEJ1aWx0aW5WYWx1ZVR5cGVTZXR0ZXJzOiBBcnJheTwoKG9iajogVmFsdWVUeXBlLCBkYXRhOiBBcnJheTxudW1iZXI+KSA9PiB2b2lkKT4gPSBbXHJcbiAgICBmdW5jdGlvbiAob2JqOiBWZWMyLCBkYXRhOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgb2JqLnggPSBkYXRhWzFdO1xyXG4gICAgICAgIG9iai55ID0gZGF0YVsyXTtcclxuICAgIH0sXHJcbiAgICBmdW5jdGlvbiAob2JqOiBWZWMzLCBkYXRhOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgb2JqLnggPSBkYXRhWzFdO1xyXG4gICAgICAgIG9iai55ID0gZGF0YVsyXTtcclxuICAgICAgICBvYmoueiA9IGRhdGFbM107XHJcbiAgICB9LFxyXG4gICAgQnVpbHRpblZhbHVlVHlwZVBhcnNlcnNfeHl6dywgICAvLyBWZWM0XHJcbiAgICBCdWlsdGluVmFsdWVUeXBlUGFyc2Vyc194eXp3LCAgIC8vIFF1YXRcclxuICAgIGZ1bmN0aW9uIChvYmo6IENvbG9yLCBkYXRhOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgb2JqLl92YWwgPSBkYXRhWzFdO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uIChvYmo6IFNpemUsIGRhdGE6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBvYmoud2lkdGggPSBkYXRhWzFdO1xyXG4gICAgICAgIG9iai5oZWlnaHQgPSBkYXRhWzJdO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uIChvYmo6IFJlY3QsIGRhdGE6IEFycmF5PG51bWJlcj4pIHtcclxuICAgICAgICBvYmoueCA9IGRhdGFbMV07XHJcbiAgICAgICAgb2JqLnkgPSBkYXRhWzJdO1xyXG4gICAgICAgIG9iai53aWR0aCA9IGRhdGFbM107XHJcbiAgICAgICAgb2JqLmhlaWdodCA9IGRhdGFbNF07XHJcbiAgICB9LFxyXG4gICAgZnVuY3Rpb24gKG9iajogTWF0NCwgZGF0YTogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgICAgIE1hdDQuZnJvbUFycmF5KG9iaiwgZGF0YSwgMSk7XHJcbiAgICB9XHJcbl07XHJcblxyXG5mdW5jdGlvbiBzZXJpYWxpemVCdWlsdGluVmFsdWVUeXBlcyhvYmo6IFZhbHVlVHlwZSk6IElWYWx1ZVR5cGVEYXRhIHwgbnVsbCB7XHJcbiAgICBsZXQgY3RvciA9IG9iai5jb25zdHJ1Y3RvciBhcyB0eXBlb2YgVmFsdWVUeXBlO1xyXG4gICAgbGV0IHR5cGVJZCA9IEJ1aWx0aW5WYWx1ZVR5cGVzLmluZGV4T2YoY3Rvcik7XHJcbiAgICBzd2l0Y2ggKGN0b3IpIHtcclxuICAgICAgICBjYXNlIFZlYzI6XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIFt0eXBlSWQsIG9iai54LCBvYmoueV07XHJcbiAgICAgICAgY2FzZSBWZWMzOlxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiBbdHlwZUlkLCBvYmoueCwgb2JqLnksIG9iai56XTtcclxuICAgICAgICBjYXNlIFZlYzQ6XHJcbiAgICAgICAgY2FzZSBRdWF0OlxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiBbdHlwZUlkLCBvYmoueCwgb2JqLnksIG9iai56LCBvYmoud107XHJcbiAgICAgICAgY2FzZSBDb2xvcjpcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gW3R5cGVJZCwgb2JqLl92YWxdO1xyXG4gICAgICAgIGNhc2UgU2l6ZTpcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gW3R5cGVJZCwgb2JqLndpZHRoLCBvYmouaGVpZ2h0XTtcclxuICAgICAgICBjYXNlIFJlY3Q6XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIFt0eXBlSWQsIG9iai54LCBvYmoueSwgb2JqLndpZHRoLCBvYmouaGVpZ2h0XTtcclxuICAgICAgICBjYXNlIE1hdDQ6XHJcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAgICAgbGV0IHJlczogSVZhbHVlVHlwZURhdGEgPSBuZXcgQXJyYXkoMSArIDE2KTtcclxuICAgICAgICAgICAgcmVzW1ZBTFVFVFlQRV9TRVRURVJdID0gdHlwZUlkO1xyXG4gICAgICAgICAgICBNYXQ0LnRvQXJyYXkocmVzLCBvYmogYXMgTWF0NCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIC8vIFRPRE86IFVzZWQgZm9yIERhdGEuVHlwZWRBcnJheS5cclxuLy8gY29uc3QgVHlwZWRBcnJheXMgPSBbXHJcbi8vICAgICBGbG9hdDMyQXJyYXksXHJcbi8vICAgICBGbG9hdDY0QXJyYXksXHJcbi8vXHJcbi8vICAgICBJbnQ4QXJyYXksXHJcbi8vICAgICBJbnQxNkFycmF5LFxyXG4vLyAgICAgSW50MzJBcnJheSxcclxuLy9cclxuLy8gICAgIFVpbnQ4QXJyYXksXHJcbi8vICAgICBVaW50MTZBcnJheSxcclxuLy8gICAgIFVpbnQzMkFycmF5LFxyXG4vL1xyXG4vLyAgICAgVWludDhDbGFtcGVkQXJyYXksXHJcbi8vICAgICAvLyBCaWdJbnQ2NEFycmF5LFxyXG4vLyAgICAgLy8gQmlnVWludDY0QXJyYXksXHJcbi8vIF07XHJcblxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogVFlQRSBERUNMQVJBVElPTlNcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vLyBJbmNsdWRlcyBCaXR3aXNlIE5PVCB2YWx1ZS5cclxuLy8gQm90aCBUIGFuZCBVIGhhdmUgbm9uLW5lZ2F0aXZlIGludGVnZXIgcmFuZ2VzLlxyXG4vLyBXaGVuIHRoZSB2YWx1ZSA+PSAwIHJlcHJlc2VudHMgVFxyXG4vLyBXaGVuIHRoZSB2YWx1ZSBpcyA8IDAsIGl0IHJlcHJlc2VudHMgflUuIFVzZSB+eCB0byBleHRyYWN0IHRoZSB2YWx1ZSBvZiBVLlxyXG5leHBvcnQgdHlwZSBCbm90PFQgZXh0ZW5kcyBudW1iZXIsIFUgZXh0ZW5kcyBudW1iZXI+ID0gVHxVO1xyXG5cclxuLy8gQ29tYmluZXMgYSBib29sZWFuIGFuZCBhIG51bWJlciBpbnRvIG9uZSB2YWx1ZS5cclxuLy8gVGhlIG51bWJlciBtdXN0ID49IDAuXHJcbi8vIFdoZW4gdGhlIHZhbHVlID49IDAsIHRoZSBib29sZWFuIGlzIHRydWUsIHRoZSBudW1iZXIgaXMgdmFsdWUuXHJcbi8vIFdoZW4gdGhlIHZhbHVlIDwgMCwgdGhlIGJvb2xlYW4gaXMgZmFsc2UsIHRoZSBudW1iZXIgaXMgfnZhbHVlLlxyXG5leHBvcnQgdHlwZSBCb29sQW5kTnVtPEIgZXh0ZW5kcyBib29sZWFuLCBOIGV4dGVuZHMgbnVtYmVyPiA9IEJub3Q8TiwgTj47XHJcblxyXG5leHBvcnQgdHlwZSBTaGFyZWRTdHJpbmcgPSBzdHJpbmc7XHJcbmV4cG9ydCB0eXBlIEVtcHR5ID0gdHlwZW9mIEVNUFRZX1BMQUNFSE9MREVSO1xyXG5leHBvcnQgdHlwZSBTdHJpbmdJbmRleCA9IG51bWJlcjtcclxuZXhwb3J0IHR5cGUgSW5zdGFuY2VJbmRleCA9IG51bWJlcjtcclxuZXhwb3J0IHR5cGUgUm9vdEluc3RhbmNlSW5kZXggPSBJbnN0YW5jZUluZGV4O1xyXG5leHBvcnQgdHlwZSBOb05hdGl2ZURlcCA9IGJvb2xlYW47ICAvLyBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYXNzZXQgZGVwZW5kcyBvbiBhIG5hdGl2ZSBhc3NldFxyXG5leHBvcnQgdHlwZSBSb290SW5mbyA9IEJvb2xBbmROdW08Tm9OYXRpdmVEZXAsIFJvb3RJbnN0YW5jZUluZGV4PjtcclxuXHJcbi8vIFdoZW4gdGhlIHZhbHVlID49IDAgcmVwcmVzZW50cyB0aGUgc3RyaW5nIGluZGV4XHJcbi8vIFdoZW4gdGhlIHZhbHVlIGlzIDwgMCwgaXQganVzdCByZXByZXNlbnRzIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyLiBVc2UgfnggdG8gZXh0cmFjdCB0aGUgdmFsdWUuXHJcbmV4cG9ydCB0eXBlIFN0cmluZ0luZGV4Qm5vdE51bWJlciA9IEJub3Q8U3RyaW5nSW5kZXgsIG51bWJlcj47XHJcblxyXG4vLyBBIHJldmVyc2UgaW5kZXggdXNlZCB0byBhc3NpZ24gY3VycmVudCBwYXJzaW5nIG9iamVjdCB0byB0YXJnZXQgY29tbWFuZCBidWZmZXIgc28gaXQgY291bGQgYmUgYXNzZW1ibGVkIGxhdGVyLlxyXG4vLyBTaG91bGQgPj0gUkVGLk9CSl9PRkZTRVRcclxuZXhwb3J0IHR5cGUgUmV2ZXJzZUluZGV4ID0gbnVtYmVyO1xyXG5cclxuLy8gVXNlZCB0byBpbmRleCB0aGUgY3VycmVudCBvYmplY3RcclxuZXhwb3J0IHR5cGUgSW5zdGFuY2VCbm90UmV2ZXJzZUluZGV4ID0gQm5vdDxJbnN0YW5jZUluZGV4LCBSZXZlcnNlSW5kZXg+O1xyXG5cclxuLypAX19EUk9QX1BVUkVfRVhQT1JUX18qL1xyXG5leHBvcnQgY29uc3QgZW51bSBEYXRhVHlwZUlEIHtcclxuXHJcbiAgICAvLyBGaWVsZHMgdGhhdCBjYW4gYmUgYXNzaWduZWQgZGlyZWN0bHksIGNhbiBiZSB2YWx1ZXMgaW4gYW55IEpTT04sIG9yIGV2ZW4gYSBjb21wbGV4IEpTT04gYXJyYXksIG9iamVjdCAobm8gdHlwZSkuXHJcbiAgICAvLyBDb250YWlucyBudWxsLCBubyB1bmRlZmluZWQsIEpTT04gZG9lcyBub3Qgc3VwcG9ydCBzZXJpYWxpemF0aW9uIG9mIHVuZGVmaW5lZC5cclxuICAgIC8vIFRoaXMgaXMgdGhlIG9ubHkgdHlwZSB0aGF0IHN1cHBvcnRzIG51bGwsIGFuZCBhbGwgb3RoZXIgYWR2YW5jZWQgZmllbGRzIGFyZSBmb3JiaWRkZW4gd2l0aCBudWxsIHZhbHVlcy5cclxuICAgIC8vIElmIHRoZSB2YWx1ZSBvZiBhbiBvYmplY3QgaXMgbGlrZWx5IHRvIGJlIG51bGwsIGl0IG5lZWRzIHRvIGV4aXN0IGFzIGEgbmV3IGNsYXNzLFxyXG4gICAgLy8gYnV0IHRoZSBwcm9iYWJpbGl0eSBvZiB0aGlzIGlzIHZlcnkgbG93IGFuZCB3aWxsIGJlIGFuYWx5emVkIGJlbG93LlxyXG4gICAgU2ltcGxlVHlwZSA9IDAsXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gRXhjZXB0IFNpbXBsZSwgdGhlIHJlc3QgYmVsb25nIHRvIEFkdmFuY2VkIFR5cGUuXHJcblxyXG4gICAgLy8gUmFyZWx5IHdpbGwgaXQgYmUgTlVMTCwgYXMgTlVMTCB3aWxsIGJlIGRyb3BwZWQgYXMgdGhlIGRlZmF1bHQgdmFsdWUuXHJcbiAgICBJbnN0YW5jZVJlZixcclxuXHJcbiAgICAvLyBBcnJheXMgb2YgZXhhY3RseSBlcXVhbCB0eXBlcy5cclxuICAgIC8vIEFycmF5cyB3aWxsIGhhdmUgZGVmYXVsdCB2YWx1ZXMgdGhhdCBkZXZlbG9wZXJzIHdpbGwgcmFyZWx5IGFzc2lnbiB0byBudWxsIG1hbnVhbGx5LlxyXG4gICAgQXJyYXlfSW5zdGFuY2VSZWYsXHJcbiAgICBBcnJheV9Bc3NldFJlZkJ5SW5uZXJPYmosXHJcblxyXG4gICAgLy8gRW1iZWRkZWQgb2JqZWN0XHJcbiAgICAvLyBSYXJlbHkgd2lsbCBpdCBiZSBOVUxMLCBhcyBOVUxMIHdpbGwgYmUgZHJvcHBlZCBhcyB0aGUgZGVmYXVsdCB2YWx1ZS5cclxuICAgIENsYXNzLFxyXG5cclxuICAgIC8vIEV4aXN0aW5nIFZhbHVlVHlwZSAoY3JlYXRlZCBieSB0aGUgQ2xhc3MgY29uc3RydWN0b3IpLlxyXG4gICAgLy8gRGV2ZWxvcGVycyB3aWxsIHJhcmVseSBtYW51YWxseSBhc3NpZ24gYSBudWxsLlxyXG4gICAgVmFsdWVUeXBlQ3JlYXRlZCxcclxuXHJcbiAgICAvLyBSZXNvdXJjZSByZWZlcmVuY2UgZm9yIGVtYmVkZGVkIG9iamVjdHMgKHN1Y2ggYXMgYXJyYXlzKSwgdGhlIHZhbHVlIGlzIHRoZSBpbmRleCBvZiBERVBFTkRfT0JKUy5cclxuICAgIC8vIChUaGUgb2JqZWN0cyBpbiBJTlNUQU5DRVMgZG8gbm90IG5lZWQgdG8gZHluYW1pY2FsbHkgcmVzb2x2ZSByZXNvdXJjZSByZWZlcmVuY2UgcmVsYXRpb25zaGlwcywgc28gdGhlcmUgaXMgbm8gbmVlZCB0byBoYXZlIHRoZSBBc3NldFJlZiB0eXBlLilcclxuICAgIEFzc2V0UmVmQnlJbm5lck9iaixcclxuXHJcbiAgICAvLyBDb21tb24gVHlwZWRBcnJheSBmb3IgY2MuTm9kZSBvbmx5LiBOZXZlciBiZSBudWxsLlxyXG4gICAgVFJTLFxyXG5cclxuICAgIC8vIC8vIEZyb20gdGhlIHBvaW50IG9mIHZpZXcgb2Ygc2ltcGxpZmllZCBpbXBsZW1lbnRhdGlvbixcclxuICAgIC8vIC8vIGl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gZGVzZXJpYWxpemUgVHlwZWRBcnJheSB0aGF0IGlzIGluaXRpYWxpemVkIHRvIG51bGwgaW4gdGhlIGNvbnN0cnVjdG9yLlxyXG4gICAgLy8gLy8gQWxzbywgdGhlIGxlbmd0aCBvZiBUeXBlZEFycmF5IGNhbm5vdCBiZSBjaGFuZ2VkLlxyXG4gICAgLy8gLy8gRGV2ZWxvcGVycyB3aWxsIHJhcmVseSBtYW51YWxseSBhc3NpZ24gYSBudWxsLlxyXG4gICAgLy8gVHlwZWRBcnJheSxcclxuXHJcbiAgICAvLyBWYWx1ZVR5cGUgd2l0aG91dCBkZWZhdWx0IHZhbHVlIChpbiBhcnJheXMsIGRpY3Rpb25hcmllcykuXHJcbiAgICAvLyBEZXZlbG9wZXJzIHdpbGwgcmFyZWx5IG1hbnVhbGx5IGFzc2lnbiBhIG51bGwuXHJcbiAgICBWYWx1ZVR5cGUsXHJcblxyXG4gICAgQXJyYXlfQ2xhc3MsXHJcblxyXG4gICAgLy8gQ3VzdG9taXplZENsYXNzIGVtYmVkZGVkIGluIENsYXNzXHJcbiAgICBDdXN0b21pemVkQ2xhc3MsXHJcblxyXG4gICAgLy8gVW5pdmVyc2FsIGRpY3Rpb25hcnkgd2l0aCB1bmxpbWl0ZWQgdHlwZXMgb2YgdmFsdWVzIChleGNlcHQgVHlwZWRBcnJheSlcclxuICAgIERpY3QsXHJcblxyXG4gICAgLy8gVW5pdmVyc2FsIGFycmF5cywgb2YgYW55IHR5cGUgKGV4Y2VwdCBUeXBlZEFycmF5KSBhbmQgY2FuIGJlIHVuZXF1YWwuXHJcbiAgICAvLyAoVGhlIGVkaXRvciBkb2Vzbid0IHNlZW0gdG8gaGF2ZSBhIGdvb2Qgd2F5IG9mIHN0b3BwaW5nIGFycmF5cyBvZiB1bmVxdWFsIHR5cGVzIGVpdGhlcilcclxuICAgIEFycmF5LFxyXG5cclxuICAgIEFSUkFZX0xFTkdUSCxcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgRGF0YVR5cGVzID0ge1xyXG4gICAgW0RhdGFUeXBlSUQuU2ltcGxlVHlwZV06IG51bWJlciB8IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsIHwgb2JqZWN0O1xyXG4gICAgW0RhdGFUeXBlSUQuSW5zdGFuY2VSZWZdOiBJbnN0YW5jZUJub3RSZXZlcnNlSW5kZXg7XHJcbiAgICBbRGF0YVR5cGVJRC5BcnJheV9JbnN0YW5jZVJlZl06IEFycmF5PERhdGFUeXBlc1tEYXRhVHlwZUlELkluc3RhbmNlUmVmXT47XHJcbiAgICBbRGF0YVR5cGVJRC5BcnJheV9Bc3NldFJlZkJ5SW5uZXJPYmpdOiBBcnJheTxEYXRhVHlwZXNbRGF0YVR5cGVJRC5Bc3NldFJlZkJ5SW5uZXJPYmpdPjtcclxuICAgIFtEYXRhVHlwZUlELkNsYXNzXTogSUNsYXNzT2JqZWN0RGF0YTtcclxuICAgIFtEYXRhVHlwZUlELlZhbHVlVHlwZUNyZWF0ZWRdOiBJVmFsdWVUeXBlRGF0YTtcclxuICAgIFtEYXRhVHlwZUlELkFzc2V0UmVmQnlJbm5lck9ial06IG51bWJlcjtcclxuICAgIFtEYXRhVHlwZUlELlRSU106IElUUlNEYXRhO1xyXG4gICAgLy8gW0RhdGFUeXBlSUQuVHlwZWRBcnJheV06IEFycmF5PEluc3RhbmNlT3JSZXZlcnNlSW5kZXg+O1xyXG4gICAgW0RhdGFUeXBlSUQuVmFsdWVUeXBlXTogSVZhbHVlVHlwZURhdGE7XHJcbiAgICBbRGF0YVR5cGVJRC5BcnJheV9DbGFzc106IEFycmF5PERhdGFUeXBlc1tEYXRhVHlwZUlELkNsYXNzXT47XHJcbiAgICBbRGF0YVR5cGVJRC5DdXN0b21pemVkQ2xhc3NdOiBJQ3VzdG9tT2JqZWN0RGF0YTtcclxuICAgIFtEYXRhVHlwZUlELkRpY3RdOiBJRGljdERhdGE7XHJcbiAgICBbRGF0YVR5cGVJRC5BcnJheV06IElBcnJheURhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBQcmltaXRpdmVPYmplY3RUeXBlSUQgPSAoXHJcbiAgICBEYXRhVHlwZUlELlNpbXBsZVR5cGUgfCAvLyBTaW1wbGVUeXBlIGFsc28gaW5jbHVkZXMgYW55IHB1cmUgSlNPTiBvYmplY3RcclxuICAgIERhdGFUeXBlSUQuQXJyYXkgfFxyXG4gICAgRGF0YVR5cGVJRC5BcnJheV9DbGFzcyB8XHJcbiAgICBEYXRhVHlwZUlELkFycmF5X0Fzc2V0UmVmQnlJbm5lck9iaiB8XHJcbiAgICBEYXRhVHlwZUlELkFycmF5X0luc3RhbmNlUmVmIHxcclxuICAgIERhdGFUeXBlSUQuRGljdFxyXG4pO1xyXG5cclxuZXhwb3J0IHR5cGUgQWR2YW5jZWRUeXBlSUQgPSBFeGNsdWRlPERhdGFUeXBlSUQsIERhdGFUeXBlSUQuU2ltcGxlVHlwZT5cclxuXHJcblxyXG4vLyBDb2xsZWN0aW9uIG9mIGFsbCBkYXRhIHR5cGVzXHJcbmV4cG9ydCB0eXBlIEFueURhdGEgPSBEYXRhVHlwZXNba2V5b2YgRGF0YVR5cGVzXTtcclxuXHJcbmV4cG9ydCB0eXBlIEFkdmFuY2VkRGF0YSA9IERhdGFUeXBlc1tFeGNsdWRlPGtleW9mIERhdGFUeXBlcywgRGF0YVR5cGVJRC5TaW1wbGVUeXBlPl07XHJcblxyXG5leHBvcnQgdHlwZSBPdGhlck9iamVjdERhdGEgPSBJQ3VzdG9tT2JqZWN0RGF0YUNvbnRlbnQgfCBFeGNsdWRlPERhdGFUeXBlc1tQcmltaXRpdmVPYmplY3RUeXBlSURdLCAobnVtYmVyfHN0cmluZ3xib29sZWFufG51bGwpPjtcclxuXHJcbi8vIGNsYXNzIEluZGV4IG9mIERhdGFUeXBlSUQuQ3VzdG9taXplZENsYXNzIG9yIFByaW1pdGl2ZU9iamVjdFR5cGVJRFxyXG5leHBvcnQgdHlwZSBPdGhlck9iamVjdFR5cGVJRCA9IEJub3Q8bnVtYmVyLCBQcmltaXRpdmVPYmplY3RUeXBlSUQ+O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDdG9yPFQ+IGV4dGVuZHMgRnVuY3Rpb24ge1xyXG4gICAgbmV3KCk6IFQ7XHJcbn1cclxuLy8gSW5jbHVkZXMgbm9ybWFsIENDQ2xhc3MgYW5kIGZhc3QgZGVmaW5lZCBjbGFzc1xyXG5leHBvcnQgaW50ZXJmYWNlIENDQ2xhc3M8VD4gZXh0ZW5kcyBDdG9yPFQ+IHtcclxuICAgIF9fdmFsdWVzX186IHN0cmluZ1tdXHJcbn1cclxuZXhwb3J0IHR5cGUgQW55Q3RvciA9IEN0b3I8T2JqZWN0PjtcclxuZXhwb3J0IHR5cGUgQW55Q0NDbGFzcyA9IENDQ2xhc3M8T2JqZWN0PjtcclxuXHJcbi8qKlxyXG4gKiBJZiB0aGUgdmFsdWUgdHlwZSBpcyBkaWZmZXJlbnQsIGRpZmZlcmVudCBDbGFzc2VzIHdpbGwgYmUgZ2VuZXJhdGVkXHJcbiAqL1xyXG5jb25zdCBDTEFTU19UWVBFID0gMDtcclxuY29uc3QgQ0xBU1NfS0VZUyA9IDE7XHJcbmNvbnN0IENMQVNTX1BST1BfVFlQRV9PRkZTRVQgPSAyO1xyXG5leHBvcnQgdHlwZSBJQ2xhc3MgPSBbXHJcbiAgICBzdHJpbmd8QW55Q3RvcixcclxuICAgIHN0cmluZ1tdLFxyXG4gICAgLy8gb2Zmc2V0IC0gSXQgaXMgdXNlZCB0byBzcGVjaWZ5IHRoZSBjb3JyZXNwb25kZW5jZSBiZXR3ZWVuIHRoZSBlbGVtZW50cyBpbiBDTEFTU19LRVlTIGFuZCB0aGVpciBBZHZhbmNlZFR5cGUsXHJcbiAgICAvLyAgICAgICAgICB3aGljaCBpcyBvbmx5IHZhbGlkIGZvciBBZHZhbmNlZFR5cGUuXHJcbiAgICAvLyBXaGVuIHBhcnNpbmcsIHRoZSB0eXBlIG9mIElDbGFzc1tDTEFTU19LRVlTXVt4XSBpcyBJQ2xhc3NbeCArIElDbGFzc1tDTEFTU19QUk9QX1RZUEVfT0ZGU0VUXV1cclxuICAgIC8vIFdoZW4gc2VyaWFsaXppbmcsIElDbGFzc1tDTEFTU19QUk9QX1RZUEVfT0ZGU0VUXSA9IENMQVNTX1BST1BfVFlQRV9PRkZTRVQgKyAxIC0gKFRoZSBudW1iZXIgb2YgU2ltcGxlVHlwZSlcclxuICAgIG51bWJlcixcclxuICAgIC8vIFRoZSBBZHZhbmNlZFR5cGUgdHlwZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eS5cclxuICAgIC4uLkRhdGFUeXBlSURbXVxyXG5dO1xyXG5cclxuLyoqXHJcbiAqIE1hc2sgaXMgdXNlZCB0byBkZWZpbmUgdGhlIHByb3BlcnRpZXMgYW5kIHR5cGVzIHRoYXQgbmVlZCB0byBiZSBkZXNlcmlhbGl6ZWQuXHJcbiAqIEluc3RhbmNlcyBvZiB0aGUgc2FtZSBjbGFzcyBtYXkgaGF2ZSBkaWZmZXJlbnQgTWFza3MgZHVlIHRvIGRpZmZlcmVudCBkZWZhdWx0IHByb3BlcnRpZXMgcmVtb3ZlZC5cclxuICovXHJcbmNvbnN0IE1BU0tfQ0xBU1MgPSAwO1xyXG5leHBvcnQgdHlwZSBJTWFzayA9IFtcclxuICAgIC8vIFRoZSBpbmRleCBvZiBpdHMgQ2xhc3NcclxuICAgIG51bWJlcixcclxuICAgIC8vIFRoZSBpbmRpY2VzIG9mIHRoZSBwcm9wZXJ0eSB0aGF0IG5lZWRzIHRvIGJlIGRlc2VyaWFsaXplZCBpbiBJQ2xhc3MsIGV4Y2VwdCB0aGF0IHRoZSBsYXN0IG51bWJlciByZXByZXNlbnRzIE9GRlNFVC5cclxuICAgIC8vIEFsbCBwcm9wZXJ0aWVzIGJlZm9yZSBPRkZTRVQgYXJlIFNpbXBsZVR5cGUsIGFuZCB0aG9zZSBzdGFydGluZyBhdCBPRkZTRVQgYXJlIEFkdmFuY2VkVHlwZS5cclxuICAgIC8vIGRlZmF1bHQgaXMgMVxyXG4gICAgLi4ubnVtYmVyW11cclxuXTtcclxuXHJcbmNvbnN0IE9CSl9EQVRBX01BU0sgPSAwO1xyXG5leHBvcnQgdHlwZSBJQ2xhc3NPYmplY3REYXRhID0gW1xyXG4gICAgLy8gVGhlIGluZGV4IG9mIGl0cyBNYXNrXHJcbiAgICBudW1iZXIsXHJcbiAgICAvLyBTdGFydGluZyBmcm9tIDEsIHRoZSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydGllcyBpbiB0aGUgTWFza1xyXG4gICAgLi4uQW55RGF0YVtdXHJcbl07XHJcblxyXG5leHBvcnQgdHlwZSBJQ3VzdG9tT2JqZWN0RGF0YUNvbnRlbnQgPSBhbnk7XHJcblxyXG5jb25zdCBDVVNUT01fT0JKX0RBVEFfQ0xBU1MgPSAwO1xyXG5jb25zdCBDVVNUT01fT0JKX0RBVEFfQ09OVEVOVCA9IDE7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUN1c3RvbU9iamVjdERhdGEgZXh0ZW5kcyBBcnJheTxhbnk+IHtcclxuICAgIC8vIFRoZSBpbmRleCBvZiBpdHMgQ2xhc3NcclxuICAgIFtDVVNUT01fT0JKX0RBVEFfQ0xBU1NdOiBudW1iZXI7XHJcbiAgICAvLyBDb250ZW50XHJcbiAgICBbQ1VTVE9NX09CSl9EQVRBX0NPTlRFTlRdOiBJQ3VzdG9tT2JqZWN0RGF0YUNvbnRlbnQ7XHJcbn1cclxuXHJcbmNvbnN0IFZBTFVFVFlQRV9TRVRURVIgPSAwO1xyXG5leHBvcnQgdHlwZSBJVmFsdWVUeXBlRGF0YSA9IFtcclxuICAgIC8vIFByZWRlZmluZWQgcGFyc2luZyBmdW5jdGlvbiBpbmRleFxyXG4gICAgbnVtYmVyLFxyXG4gICAgLy8gU3RhcnRpbmcgd2l0aCAxLCB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZSBpbiB0aGUgYXR0cmlidXRlcyBhcmUgZm9sbG93ZWQgaW4gb3JkZXJcclxuICAgIC4uLm51bWJlcltdXHJcbl07XHJcblxyXG5leHBvcnQgdHlwZSBJVFJTRGF0YSA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdO1xyXG5cclxuY29uc3QgRElDVF9KU09OX0xBWU9VVCA9IDA7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSURpY3REYXRhIGV4dGVuZHMgQXJyYXk8YW55PiB7XHJcbiAgICAvLyBUaGUgcmF3IGpzb24gb2JqZWN0XHJcbiAgICBbRElDVF9KU09OX0xBWU9VVF06IGFueSxcclxuICAgIC8vIGtleVxyXG4gICAgLy8gU2hhcmVkIHN0cmluZ3MgYXJlIG5vdCBjb25zaWRlcmVkIGhlcmUsIGNhbiBiZSBkZWZpbmVkIGFzIENDQ2xhc3MgaWYgaXQgaXMgcmVxdWlyZWQuXHJcbiAgICBbMV06IHN0cmluZztcclxuICAgIC8vIHZhbHVlIHR5cGVcclxuICAgIC8vIFNob3VsZCBub3QgYmUgU2ltcGxlVHlwZSwgU2ltcGxlVHlwZSBpcyBidWlsdCBkaXJlY3RseSBpbnRvIERJQ1RfSlNPTl9MQVlPVVQuXHJcbiAgICBbMl06IEFkdmFuY2VkVHlwZUlEO1xyXG4gICAgLy8gdmFsdWVcclxuICAgIFszXTogQWR2YW5jZWREYXRhO1xyXG4gICAgLy8gTW9yZSByZXBlYXRlZCBrZXkgdmFsdWVzXHJcbiAgICBbaW5kZXg6IG51bWJlcl06IGFueSxcclxufVxyXG5cclxuY29uc3QgQVJSQVlfSVRFTV9WQUxVRVMgPSAwO1xyXG5leHBvcnQgdHlwZSBJQXJyYXlEYXRhID0gW1xyXG4gICAgQW55RGF0YVtdLFxyXG4gICAgLy8gdHlwZXNcclxuICAgIC4uLkRhdGFUeXBlSURbXVxyXG5dO1xyXG5cclxuLy8gY29uc3QgVFlQRURBUlJBWV9UWVBFID0gMDtcclxuLy8gY29uc3QgVFlQRURBUlJBWV9FTEVNRU5UUyA9IDE7XHJcbi8vIGV4cG9ydCBpbnRlcmZhY2UgSVR5cGVkQXJyYXlEYXRhIGV4dGVuZHMgQXJyYXk8bnVtYmVyfG51bWJlcltdPiB7XHJcbi8vICAgICBbVFlQRURBUlJBWV9UWVBFXTogbnVtYmVyLFxyXG4vLyAgICAgW1RZUEVEQVJSQVlfRUxFTUVOVFNdOiBudW1iZXJbXSxcclxuLy8gfVxyXG5cclxuLypAX19EUk9QX1BVUkVfRVhQT1JUX18qL1xyXG5leHBvcnQgY29uc3QgZW51bSBSZWZzIHtcclxuICAgIEVBQ0hfUkVDT1JEX0xFTkdUSCA9IDMsXHJcbiAgICBPV05FUl9PRkZTRVQgPSAwLFxyXG4gICAgS0VZX09GRlNFVCA9IDEsXHJcbiAgICBUQVJHRVRfT0ZGU0VUID0gMixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVmcyBleHRlbmRzIEFycmF5PG51bWJlcj4ge1xyXG4gICAgLy8gb3duZXJcclxuICAgIC8vIFRoZSBvd25lciBvZiBhbGwgdGhlIG9iamVjdHMgaW4gdGhlIGZyb250IGlzIG9mIHR5cGUgb2JqZWN0LCBzdGFydGluZyBmcm9tIE9GRlNFVCAqIDMgYXJlIG9mIHR5cGUgSW5zdGFuY2VJbmRleFxyXG4gICAgWzBdOiAob2JqZWN0IHwgSW5zdGFuY2VJbmRleCksXHJcbiAgICAvLyBwcm9wZXJ0eSBuYW1lXHJcbiAgICBbMV0/OiBTdHJpbmdJbmRleEJub3ROdW1iZXI7XHJcbiAgICAvLyB0YXJnZXQgb2JqZWN0XHJcbiAgICBbMl0/OiBJbnN0YW5jZUluZGV4O1xyXG4gICAgLy8gQWxsIHRoZSBmb2xsb3dpbmcgb2JqZWN0cyBhcmUgYXJyYW5nZWQgaW4gdGhlIG9yZGVyIG9mIHRoZSBmaXJzdCB0aHJlZSB2YWx1ZXMsXHJcbiAgICAvLyBleGNlcHQgdGhhdCB0aGUgbGFzdCBudW1iZXIgcmVwcmVzZW50cyBPRkZTRVQuXHJcbiAgICBbaW5kZXg6IG51bWJlcl06IGFueTtcclxufVxyXG5cclxuLypAX19EUk9QX1BVUkVfRVhQT1JUX18qL1xyXG5leHBvcnQgY29uc3QgZW51bSBGaWxlIHtcclxuICAgIFZlcnNpb24gPSAwLFxyXG4gICAgQ29udGV4dCA9IDAsXHJcblxyXG4gICAgU2hhcmVkVXVpZHMsXHJcbiAgICBTaGFyZWRTdHJpbmdzLFxyXG4gICAgU2hhcmVkQ2xhc3NlcyxcclxuICAgIFNoYXJlZE1hc2tzLFxyXG5cclxuICAgIEluc3RhbmNlcyxcclxuICAgIEluc3RhbmNlVHlwZXMsXHJcblxyXG4gICAgUmVmcyxcclxuXHJcbiAgICBEZXBlbmRPYmpzLFxyXG4gICAgRGVwZW5kS2V5cyxcclxuICAgIERlcGVuZFV1aWRJbmRpY2VzLFxyXG5cclxuICAgIEFSUkFZX0xFTkdUSCxcclxufVxyXG5cclxuLy8gTWFpbiBmaWxlIHN0cnVjdHVyZVxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWxlRGF0YSBleHRlbmRzIEFycmF5PGFueT4ge1xyXG4gICAgLy8gdmVyc2lvblxyXG4gICAgW0ZpbGUuVmVyc2lvbl06IG51bWJlciB8IEZpbGVJbmZvIHwgYW55O1xyXG5cclxuICAgIC8vIFNoYXJlZCBkYXRhIGFyZWEsIHRoZSBoaWdoZXIgdGhlIG51bWJlciBvZiByZWZlcmVuY2VzLCB0aGUgaGlnaGVyIHRoZSBwb3NpdGlvblxyXG5cclxuICAgIFtGaWxlLlNoYXJlZFV1aWRzXTogU2hhcmVkU3RyaW5nW10gfCBFbXB0eTsgLy8gU2hhcmVkIHV1aWQgc3RyaW5ncyBmb3IgZGVwZW5kZW50IGFzc2V0c1xyXG4gICAgW0ZpbGUuU2hhcmVkU3RyaW5nc106IFNoYXJlZFN0cmluZ1tdIHwgRW1wdHk7XHJcbiAgICBbRmlsZS5TaGFyZWRDbGFzc2VzXTogKElDbGFzc3xzdHJpbmd8QW55Q0NDbGFzcylbXTtcclxuICAgIFtGaWxlLlNoYXJlZE1hc2tzXTogSU1hc2tbXSB8IEVtcHR5OyAgLy8gU2hhcmVkIE9iamVjdCBsYXlvdXRzIGZvciBJQ2xhc3NPYmplY3REYXRhXHJcblxyXG4gICAgLy8gRGF0YSBhcmVhXHJcblxyXG4gICAgLy8gQSBvbmUtZGltZW5zaW9uYWwgYXJyYXkgdG8gcmVwcmVzZW50IG9iamVjdCBkYXRhcywgbGF5b3V0IGlzIFsuLi5JQ2xhc3NPYmplY3REYXRhW10sIC4uLk90aGVyT2JqZWN0RGF0YVtdLCBSb290SW5mb11cclxuICAgIC8vIElmIHRoZSBsYXN0IGVsZW1lbnQgaXMgbm90IFJvb3RJbmZvKG51bWJlciksIHRoZSBmaXJzdCBlbGVtZW50IHdpbGwgYmUgdGhlIHJvb3Qgb2JqZWN0IHRvIHJldHVybiBhbmQgaXQgZG9lc24ndCBoYXZlIG5hdGl2ZSBhc3NldFxyXG4gICAgW0ZpbGUuSW5zdGFuY2VzXTogKElDbGFzc09iamVjdERhdGF8T3RoZXJPYmplY3REYXRhfFJvb3RJbmZvKVtdO1xyXG4gICAgW0ZpbGUuSW5zdGFuY2VUeXBlc106IE90aGVyT2JqZWN0VHlwZUlEW10gfCBFbXB0eTtcclxuICAgIC8vIE9iamVjdCByZWZlcmVuY2VzIGluZm9tYXRpb25cclxuICAgIFtGaWxlLlJlZnNdOiBJUmVmcyB8IEVtcHR5O1xyXG5cclxuICAgIC8vIFJlc3VsdCBhcmVhXHJcblxyXG4gICAgLy8gQXNzZXQtZGVwZW5kZW50IG9iamVjdHMgdGhhdCBhcmUgZGVzZXJpYWxpemVkIGFuZCBwYXJzZWQgaW50byBvYmplY3QgYXJyYXlzXHJcbiAgICBbRmlsZS5EZXBlbmRPYmpzXTogKG9iamVjdHxJbnN0YW5jZUluZGV4KVtdO1xyXG4gICAgLy8gQXNzZXQtZGVwZW5kZW50IGtleSBuYW1lIG9yIGFycmF5IGluZGV4XHJcbiAgICBbRmlsZS5EZXBlbmRLZXlzXTogKFN0cmluZ0luZGV4Qm5vdE51bWJlcnxzdHJpbmcpW107XHJcbiAgICAvLyBVVUlEIG9mIGRlcGVuZGVudCBhc3NldHNcclxuICAgIFtGaWxlLkRlcGVuZFV1aWRJbmRpY2VzXTogKFN0cmluZ0luZGV4fHN0cmluZylbXTtcclxufVxyXG5cclxuLy8gdHlwZSBCb2R5ID0gUGljazxJRmlsZURhdGEsIEZpbGUuSW5zdGFuY2VzIHwgRmlsZS5JbnN0YW5jZVR5cGVzIHwgRmlsZS5SZWZzIHwgRmlsZS5EZXBlbmRPYmpzIHwgRmlsZS5EZXBlbmRLZXlzIHwgRmlsZS5EZXBlbmRVdWlkSW5kaWNlcz5cclxudHlwZSBTaGFyZWQgPSBQaWNrPElGaWxlRGF0YSwgRmlsZS5WZXJzaW9uIHwgRmlsZS5TaGFyZWRVdWlkcyB8IEZpbGUuU2hhcmVkU3RyaW5ncyB8IEZpbGUuU2hhcmVkQ2xhc3NlcyB8IEZpbGUuU2hhcmVkTWFza3M+XHJcbmNvbnN0IFBBQ0tFRF9TRUNUSU9OUyA9IEZpbGUuSW5zdGFuY2VzO1xyXG5leHBvcnQgaW50ZXJmYWNlIElQYWNrZWRGaWxlRGF0YSBleHRlbmRzIFNoYXJlZCB7XHJcbiAgICBbUEFDS0VEX1NFQ1RJT05TXTogSUZpbGVEYXRhW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBJQ3VzdG9tSGFuZGxlciB7XHJcbiAgICByZXN1bHQ6IERldGFpbHMsXHJcbiAgICBjdXN0b21FbnY6IGFueSxcclxufVxyXG50eXBlIENsYXNzRmluZGVyID0ge1xyXG4gICAgKHR5cGU6IHN0cmluZyk6IEFueUN0b3I7XHJcbiAgICAvLyAvLyBmb3IgZWRpdG9yXHJcbiAgICAvLyBvbkRlcmVmZXJlbmNlZDogKGN1ck93bmVyOiBvYmplY3QsIGN1clByb3BOYW1lOiBzdHJpbmcsIG5ld093bmVyOiBvYmplY3QsIG5ld1Byb3BOYW1lOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcbmludGVyZmFjZSBJT3B0aW9ucyBleHRlbmRzIFBhcnRpYWw8SUN1c3RvbUhhbmRsZXI+IHtcclxuICAgIGNsYXNzRmluZGVyPzogQ2xhc3NGaW5kZXI7XHJcbiAgICBfdmVyc2lvbj86IG51bWJlcjtcclxufVxyXG5pbnRlcmZhY2UgSUN1c3RvbUNsYXNzIHtcclxuICAgIF9kZXNlcmlhbGl6ZTogKGNvbnRlbnQ6IGFueSwgY29udGV4dDogSUN1c3RvbUhhbmRsZXIpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIElNUExFTUVOVFNcclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vKipcclxuICogISNlbiBDb250YWlucyBtZXRhIGluZm9ybWF0aW9uIGNvbGxlY3RlZCBkdXJpbmcgZGVzZXJpYWxpemF0aW9uXHJcbiAqICEjemgg5YyF5ZCr5Y+N5bqP5YiX5YyW5ZCO6ZmE5bim55qE5YWD5L+h5oGvXHJcbiAqIEBjbGFzcyBEZXRhaWxzXHJcbiAqL1xyXG5jbGFzcyBEZXRhaWxzIHtcclxuICAgIC8qKlxyXG4gICAgICogdGhlIG9iaiBsaXN0IHdob3NlIGZpZWxkIG5lZWRzIHRvIGxvYWQgYXNzZXQgYnkgdXVpZFxyXG4gICAgICogQHByb3BlcnR5IHtPYmplY3RbXX0gdXVpZE9iakxpc3RcclxuICAgICAqL1xyXG4gICAgdXVpZE9iakxpc3Q6IElGaWxlRGF0YVtGaWxlLkRlcGVuZE9ianNdIHwgbnVsbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkIG5hbWUgd2hpY2ggcmVmZXJlbmNlZCB0byB0aGUgYXNzZXRcclxuICAgICAqIEBwcm9wZXJ0eSB7KFN0cmluZ3xOdW1iZXIpW119IHV1aWRQcm9wTGlzdFxyXG4gICAgICovXHJcbiAgICB1dWlkUHJvcExpc3Q6IElGaWxlRGF0YVtGaWxlLkRlcGVuZEtleXNdIHwgbnVsbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIGxpc3Qgb2YgdGhlIGRlcGVuZHMgYXNzZXRzJyB1dWlkXHJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ1tdfSB1dWlkTGlzdFxyXG4gICAgICovXHJcbiAgICB1dWlkTGlzdDogSUZpbGVEYXRhW0ZpbGUuRGVwZW5kVXVpZEluZGljZXNdIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgc3RhdGljIHBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgb2JqLnJlc2V0KCk7XHJcbiAgICB9LCA1KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgaW5pdFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICAgICAqL1xyXG4gICAgaW5pdCAoZGF0YTogSUZpbGVEYXRhKSB7XHJcbiAgICAgICAgdGhpcy51dWlkT2JqTGlzdCA9IGRhdGFbRmlsZS5EZXBlbmRPYmpzXTtcclxuICAgICAgICB0aGlzLnV1aWRQcm9wTGlzdCA9IGRhdGFbRmlsZS5EZXBlbmRLZXlzXTtcclxuICAgICAgICB0aGlzLnV1aWRMaXN0ID0gZGF0YVtGaWxlLkRlcGVuZFV1aWRJbmRpY2VzXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBtZXRob2QgcmVzZXRcclxuICAgICAqL1xyXG4gICAgcmVzZXQgICgpIHtcclxuICAgICAgICB0aGlzLnV1aWRMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnV1aWRPYmpMaXN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnV1aWRQcm9wTGlzdCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQG1ldGhvZCBwdXNoXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1dWlkXHJcbiAgICAgKi9cclxuICAgIHB1c2ggKG9iajogb2JqZWN0LCBwcm9wTmFtZTogc3RyaW5nLCB1dWlkOiBzdHJpbmcpIHtcclxuICAgICAgICAodGhpcy51dWlkT2JqTGlzdCBhcyBvYmplY3RbXSkucHVzaChvYmopO1xyXG4gICAgICAgICh0aGlzLnV1aWRQcm9wTGlzdCBhcyBzdHJpbmdbXSkucHVzaChwcm9wTmFtZSk7XHJcbiAgICAgICAgKHRoaXMudXVpZExpc3QgYXMgc3RyaW5nW10pLnB1c2godXVpZCk7XHJcbiAgICB9O1xyXG59XHJcbkRldGFpbHMucG9vbC5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IERldGFpbHMoKTtcclxufTtcclxuaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBEZXRhaWxzLnByb3RvdHlwZS5hc3NpZ25Bc3NldHNCeSA9IGZ1bmN0aW9uIChnZXR0ZXI6ICh1dWlkOiBzdHJpbmcpID0+IGFueSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSAodGhpcy51dWlkTGlzdCBhcyBzdHJpbmdbXSkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9ICh0aGlzLnV1aWRPYmpMaXN0IGFzIG9iamVjdClbaV07XHJcbiAgICAgICAgICAgIHZhciBwcm9wID0gKHRoaXMudXVpZFByb3BMaXN0IGFzIGFueVtdKVtpXTtcclxuICAgICAgICAgICAgdmFyIHV1aWQgPSAodGhpcy51dWlkTGlzdCBhcyBzdHJpbmdbXSlbaV07XHJcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IGdldHRlcih1dWlkIGFzIHN0cmluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVyZWZlcmVuY2UocmVmczogSVJlZnMsIGluc3RhbmNlczogSUZpbGVEYXRhW0ZpbGUuSW5zdGFuY2VzXSwgc3RyaW5nczogSUZpbGVEYXRhW0ZpbGUuU2hhcmVkU3RyaW5nc10pOiB2b2lkIHtcclxuICAgIGxldCBkYXRhTGVuZ3RoID0gcmVmcy5sZW5ndGggLSAxO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgLy8gb3duZXIgaXMgb2JqZWN0XHJcbiAgICBsZXQgaW5zdGFuY2VPZmZzZXQ6IG51bWJlciA9IHJlZnNbZGF0YUxlbmd0aF0gKiBSZWZzLkVBQ0hfUkVDT1JEX0xFTkdUSDtcclxuICAgIGZvciAoOyBpIDwgaW5zdGFuY2VPZmZzZXQ7IGkgKz0gUmVmcy5FQUNIX1JFQ09SRF9MRU5HVEgpIHtcclxuICAgICAgICBjb25zdCBvd25lciA9IHJlZnNbaV0gYXMgYW55O1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBpbnN0YW5jZXNbcmVmc1tpICsgUmVmcy5UQVJHRVRfT0ZGU0VUXV07XHJcbiAgICAgICAgY29uc3Qga2V5SW5kZXggPSByZWZzW2kgKyBSZWZzLktFWV9PRkZTRVRdIGFzIFN0cmluZ0luZGV4Qm5vdE51bWJlcjtcclxuICAgICAgICBpZiAoa2V5SW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICBvd25lcltzdHJpbmdzW2tleUluZGV4XV0gPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvd25lclt+a2V5SW5kZXhdID0gdGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIG93bmVyIGlzIGluc3RhbmNlIGluZGV4XHJcbiAgICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7IGkgKz0gUmVmcy5FQUNIX1JFQ09SRF9MRU5HVEgpIHtcclxuICAgICAgICBjb25zdCBvd25lciA9IGluc3RhbmNlc1tyZWZzW2ldXSBhcyBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGluc3RhbmNlc1tyZWZzW2kgKyBSZWZzLlRBUkdFVF9PRkZTRVRdXTtcclxuICAgICAgICBjb25zdCBrZXlJbmRleCA9IHJlZnNbaSArIFJlZnMuS0VZX09GRlNFVF0gYXMgU3RyaW5nSW5kZXhCbm90TnVtYmVyO1xyXG4gICAgICAgIGlmIChrZXlJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgIG93bmVyW3N0cmluZ3Nba2V5SW5kZXhdXSA9IHRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG93bmVyW35rZXlJbmRleF0gPSB0YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL1xyXG5cclxuZnVuY3Rpb24gZGVzZXJpYWxpemVDQ09iamVjdCAoZGF0YTogSUZpbGVEYXRhLCBvYmplY3REYXRhOiBJQ2xhc3NPYmplY3REYXRhKSB7XHJcbiAgICBsZXQgbWFzayA9IGRhdGFbRmlsZS5TaGFyZWRNYXNrc11bb2JqZWN0RGF0YVtPQkpfREFUQV9NQVNLXV07XHJcbiAgICBsZXQgY2xhenogPSBtYXNrW01BU0tfQ0xBU1NdO1xyXG4gICAgbGV0IGN0b3IgPSBjbGF6eltDTEFTU19UWVBFXSBhcyBFeGNsdWRlPEFueUN0b3IsIElDdXN0b21DbGFzcz47XHJcbiAgICAvLyBpZiAoIWN0b3IpIHtcclxuICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgIC8vIH1cclxuXHJcbiAgICBsZXQgb2JqID0gbmV3IGN0b3IoKTtcclxuXHJcbiAgICBsZXQga2V5cyA9IGNsYXp6W0NMQVNTX0tFWVNdO1xyXG4gICAgbGV0IGNsYXNzVHlwZU9mZnNldCA9IGNsYXp6W0NMQVNTX1BST1BfVFlQRV9PRkZTRVRdO1xyXG4gICAgbGV0IG1hc2tUeXBlT2Zmc2V0ID0gbWFza1ttYXNrLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIC8vIHBhcnNlIHNpbXBsZSB0eXBlXHJcbiAgICBsZXQgaSA9IE1BU0tfQ0xBU1MgKyAxO1xyXG4gICAgZm9yICg7IGkgPCBtYXNrVHlwZU9mZnNldDsgKytpKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IGtleXNbbWFza1tpXV07XHJcbiAgICAgICAgb2JqW2tleV0gPSBvYmplY3REYXRhW2ldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBhcnNlIGFkdmFuY2VkIHR5cGVcclxuICAgIGZvciAoOyBpIDwgb2JqZWN0RGF0YS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBrZXkgPSBrZXlzW21hc2tbaV1dO1xyXG4gICAgICAgIGxldCB0eXBlID0gY2xhenpbbWFza1tpXSArIGNsYXNzVHlwZU9mZnNldF07XHJcbiAgICAgICAgbGV0IG9wID0gQVNTSUdOTUVOVFNbdHlwZV07XHJcbiAgICAgICAgb3AoZGF0YSwgb2JqLCBrZXksIG9iamVjdERhdGFbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlc2VyaWFsaXplQ3VzdG9tQ0NPYmplY3QgKGRhdGE6IElGaWxlRGF0YSwgY3RvcjogQ3RvcjxJQ3VzdG9tQ2xhc3M+LCB2YWx1ZTogSUN1c3RvbU9iamVjdERhdGFDb250ZW50KSB7XHJcbiAgICBsZXQgb2JqID0gbmV3IGN0b3IoKTtcclxuICAgIGlmIChvYmouX2Rlc2VyaWFsaXplKSB7XHJcbiAgICAgICAgb2JqLl9kZXNlcmlhbGl6ZSh2YWx1ZSwgZGF0YVtGaWxlLkNvbnRleHRdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNjLmVycm9ySUQoNTMwMywganMuZ2V0Q2xhc3NOYW1lKGN0b3IpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8vIFBhcnNlIEZ1bmN0aW9uc1xyXG5cclxudHlwZSBQYXJzZUZ1bmN0aW9uID0gKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBBbnlEYXRhKSA9PiB2b2lkO1xyXG5cclxuZnVuY3Rpb24gYXNzaWduU2ltcGxlIChkYXRhOiBJRmlsZURhdGEsIG93bmVyOiBhbnksIGtleTogc3RyaW5nLCB2YWx1ZTogRGF0YVR5cGVzW0RhdGFUeXBlSUQuU2ltcGxlVHlwZV0pIHtcclxuICAgIG93bmVyW2tleV0gPSB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXNzaWduSW5zdGFuY2VSZWYgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJbnN0YW5jZUJub3RSZXZlcnNlSW5kZXgpIHtcclxuICAgIGlmICh2YWx1ZSA+PSAwKSB7XHJcbiAgICAgICAgb3duZXJba2V5XSA9IGRhdGFbRmlsZS5JbnN0YW5jZXNdW3ZhbHVlXTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIChkYXRhW0ZpbGUuUmVmc10gYXMgSVJlZnMpWyh+dmFsdWUpICogUmVmcy5FQUNIX1JFQ09SRF9MRU5HVEhdID0gb3duZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbkFycmF5UGFyc2VyIChwYXJzZXI6IFBhcnNlRnVuY3Rpb24pOiBQYXJzZUZ1bmN0aW9uIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0YTogSUZpbGVEYXRhLCBvd25lcjogYW55LCBrZXk6IHN0cmluZywgdmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBvd25lcltrZXldID0gdmFsdWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIHBhcnNlcihkYXRhLCB2YWx1ZSwgaSwgdmFsdWVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlQXNzZXRSZWZCeUlubmVyT2JqIChkYXRhOiBJRmlsZURhdGEsIG93bmVyOiBhbnksIGtleTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBvd25lcltrZXldID0gbnVsbDtcclxuICAgIGRhdGFbRmlsZS5EZXBlbmRPYmpzXVt2YWx1ZV0gPSBvd25lcjtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VDbGFzcyAoZGF0YTogSUZpbGVEYXRhLCBvd25lcjogYW55LCBrZXk6IHN0cmluZywgdmFsdWU6IElDbGFzc09iamVjdERhdGEpIHtcclxuICAgIG93bmVyW2tleV0gPSBkZXNlcmlhbGl6ZUNDT2JqZWN0KGRhdGEsIHZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VDdXN0b21DbGFzcyAoZGF0YTogSUZpbGVEYXRhLCBvd25lcjogYW55LCBrZXk6IHN0cmluZywgdmFsdWU6IElDdXN0b21PYmplY3REYXRhKSB7XHJcbiAgICBsZXQgY3RvciA9IGRhdGFbRmlsZS5TaGFyZWRDbGFzc2VzXVt2YWx1ZVtDVVNUT01fT0JKX0RBVEFfQ0xBU1NdXSBhcyBDQ0NsYXNzPElDdXN0b21DbGFzcz47XHJcbiAgICBvd25lcltrZXldID0gZGVzZXJpYWxpemVDdXN0b21DQ09iamVjdChkYXRhLCBjdG9yLCB2YWx1ZVtDVVNUT01fT0JKX0RBVEFfQ09OVEVOVF0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVZhbHVlVHlwZUNyZWF0ZWQgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJVmFsdWVUeXBlRGF0YSkge1xyXG4gICAgQnVpbHRpblZhbHVlVHlwZVNldHRlcnNbdmFsdWVbVkFMVUVUWVBFX1NFVFRFUl1dKG93bmVyW2tleV0sIHZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VWYWx1ZVR5cGUgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJVmFsdWVUeXBlRGF0YSkge1xyXG4gICAgbGV0IHZhbDogVmFsdWVUeXBlID0gbmV3IEJ1aWx0aW5WYWx1ZVR5cGVzW3ZhbHVlW1ZBTFVFVFlQRV9TRVRURVJdXSgpO1xyXG4gICAgQnVpbHRpblZhbHVlVHlwZVNldHRlcnNbdmFsdWVbVkFMVUVUWVBFX1NFVFRFUl1dKHZhbCwgdmFsdWUpO1xyXG4gICAgb3duZXJba2V5XSA9IHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VUUlMgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJVFJTRGF0YSkge1xyXG4gICAgbGV0IHR5cGVkQXJyYXkgPSBvd25lcltrZXldIGFzIChGbG9hdDMyQXJyYXkgfCBGbG9hdDY0QXJyYXkpO1xyXG4gICAgdHlwZWRBcnJheS5zZXQodmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZURpY3QgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJRGljdERhdGEpIHtcclxuICAgIGxldCBkaWN0ID0gdmFsdWVbRElDVF9KU09OX0xBWU9VVF07XHJcbiAgICBvd25lcltrZXldID0gZGljdDtcclxuICAgIGZvciAobGV0IGkgPSBESUNUX0pTT05fTEFZT1VUICsgMTsgaSA8IHZhbHVlLmxlbmd0aDsgaSArPSAzKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IHZhbHVlW2ldIGFzIHN0cmluZztcclxuICAgICAgICBsZXQgdHlwZSA9IHZhbHVlW2kgKyAxXSBhcyBEYXRhVHlwZUlEO1xyXG4gICAgICAgIGxldCBzdWJWYWx1ZSA9IHZhbHVlW2kgKyAyXSBhcyBBbnlEYXRhO1xyXG4gICAgICAgIGxldCBvcCA9IEFTU0lHTk1FTlRTW3R5cGVdO1xyXG4gICAgICAgIG9wKGRhdGEsIGRpY3QsIGtleSwgc3ViVmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUFycmF5IChkYXRhOiBJRmlsZURhdGEsIG93bmVyOiBhbnksIGtleTogc3RyaW5nLCB2YWx1ZTogSUFycmF5RGF0YSkge1xyXG4gICAgbGV0IGFycmF5ID0gdmFsdWVbQVJSQVlfSVRFTV9WQUxVRVNdO1xyXG4gICAgb3duZXJba2V5XSA9IGFycmF5O1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBzdWJWYWx1ZSA9IGFycmF5W2ldIGFzIEFueURhdGE7XHJcbiAgICAgICAgbGV0IHR5cGUgPSB2YWx1ZVtpICsgMV0gYXMgRGF0YVR5cGVJRDtcclxuICAgICAgICBpZiAodHlwZSAhPT0gRGF0YVR5cGVJRC5TaW1wbGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCBvcCA9IEFTU0lHTk1FTlRTW3R5cGVdO1xyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIG9wKGRhdGEsIGFycmF5LCBpLCBzdWJWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBwYXJzZVR5cGVkQXJyYXkgKGRhdGE6IElGaWxlRGF0YSwgb3duZXI6IGFueSwga2V5OiBzdHJpbmcsIHZhbHVlOiBJVHlwZWRBcnJheURhdGEpIHtcclxuLy8gICAgIGxldCB2YWw6IFZhbHVlVHlwZSA9IG5ldyBUeXBlZEFycmF5c1t2YWx1ZVtUWVBFREFSUkFZX1RZUEVdXSgpO1xyXG4vLyAgICAgQnVpbHRpblZhbHVlVHlwZVNldHRlcnNbdmFsdWVbVkFMVUVUWVBFX1NFVFRFUl1dKHZhbCwgdmFsdWUpO1xyXG4vLyAgICAgLy8gb2JqID0gbmV3IHdpbmRvd1tzZXJpYWxpemVkLmN0b3JdKGFycmF5Lmxlbmd0aCk7XHJcbi8vICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XHJcbi8vICAgICAvLyAgICAgb2JqW2ldID0gYXJyYXlbaV07XHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyByZXR1cm4gb2JqO1xyXG4vLyAgICAgb3duZXJba2V5XSA9IHZhbDtcclxuLy8gfVxyXG5cclxuY29uc3QgQVNTSUdOTUVOVFMgPSBuZXcgQXJyYXk8UGFyc2VGdW5jdGlvbj4oRGF0YVR5cGVJRC5BUlJBWV9MRU5HVEgpO1xyXG5BU1NJR05NRU5UU1tEYXRhVHlwZUlELlNpbXBsZVR5cGVdID0gYXNzaWduU2ltcGxlOyAgICAvLyBPbmx5IGJlIHVzZWQgaW4gdGhlIGluc3RhbmNlcyBhcnJheVxyXG5BU1NJR05NRU5UU1tEYXRhVHlwZUlELkluc3RhbmNlUmVmXSA9IGFzc2lnbkluc3RhbmNlUmVmO1xyXG5BU1NJR05NRU5UU1tEYXRhVHlwZUlELkFycmF5X0luc3RhbmNlUmVmXSA9IGdlbkFycmF5UGFyc2VyKGFzc2lnbkluc3RhbmNlUmVmKTtcclxuQVNTSUdOTUVOVFNbRGF0YVR5cGVJRC5BcnJheV9Bc3NldFJlZkJ5SW5uZXJPYmpdID0gZ2VuQXJyYXlQYXJzZXIocGFyc2VBc3NldFJlZkJ5SW5uZXJPYmopO1xyXG5BU1NJR05NRU5UU1tEYXRhVHlwZUlELkNsYXNzXSA9IHBhcnNlQ2xhc3M7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuVmFsdWVUeXBlQ3JlYXRlZF0gPSBwYXJzZVZhbHVlVHlwZUNyZWF0ZWQ7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuQXNzZXRSZWZCeUlubmVyT2JqXSA9IHBhcnNlQXNzZXRSZWZCeUlubmVyT2JqO1xyXG5BU1NJR05NRU5UU1tEYXRhVHlwZUlELlRSU10gPSBwYXJzZVRSUztcclxuQVNTSUdOTUVOVFNbRGF0YVR5cGVJRC5WYWx1ZVR5cGVdID0gcGFyc2VWYWx1ZVR5cGU7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuQXJyYXlfQ2xhc3NdID0gZ2VuQXJyYXlQYXJzZXIocGFyc2VDbGFzcyk7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuQ3VzdG9taXplZENsYXNzXSA9IHBhcnNlQ3VzdG9tQ2xhc3M7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuRGljdF0gPSBwYXJzZURpY3Q7XHJcbkFTU0lHTk1FTlRTW0RhdGFUeXBlSUQuQXJyYXldID0gcGFyc2VBcnJheTtcclxuLy8gQVNTSUdOTUVOVFNbRGF0YVR5cGVJRC5UeXBlZEFycmF5XSA9IHBhcnNlVHlwZWRBcnJheTtcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcGFyc2VJbnN0YW5jZXMgKGRhdGE6IElGaWxlRGF0YSk6IFJvb3RJbnN0YW5jZUluZGV4IHtcclxuICAgIGxldCBpbnN0YW5jZXMgPSBkYXRhW0ZpbGUuSW5zdGFuY2VzXTtcclxuICAgIGxldCBpbnN0YW5jZVR5cGVzID0gZGF0YVtGaWxlLkluc3RhbmNlVHlwZXNdO1xyXG4gICAgbGV0IGluc3RhbmNlVHlwZXNMZW4gPSBpbnN0YW5jZVR5cGVzID09PSBFTVBUWV9QTEFDRUhPTERFUiA/IDAgOiAoaW5zdGFuY2VUeXBlcyBhcyBPdGhlck9iamVjdFR5cGVJRFtdKS5sZW5ndGg7XHJcbiAgICBsZXQgcm9vdEluZGV4ID0gaW5zdGFuY2VzW2luc3RhbmNlcy5sZW5ndGggLSAxXTtcclxuICAgIGxldCBub3JtYWxPYmplY3RDb3VudCA9IGluc3RhbmNlcy5sZW5ndGggLSBpbnN0YW5jZVR5cGVzTGVuO1xyXG4gICAgaWYgKHR5cGVvZiByb290SW5kZXggIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgcm9vdEluZGV4ID0gMDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChyb290SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHJvb3RJbmRleCA9IH5yb290SW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC0tbm9ybWFsT2JqZWN0Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGF0YVR5cGVJRC5DbGFzc1xyXG5cclxuICAgIGxldCBpbnNJbmRleCA9IDA7XHJcbiAgICBmb3IgKDsgaW5zSW5kZXggPCBub3JtYWxPYmplY3RDb3VudDsgKytpbnNJbmRleCkge1xyXG4gICAgICAgIGluc3RhbmNlc1tpbnNJbmRleF0gPSBkZXNlcmlhbGl6ZUNDT2JqZWN0KGRhdGEsIGluc3RhbmNlc1tpbnNJbmRleF0gYXMgSUNsYXNzT2JqZWN0RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNsYXNzZXMgPSBkYXRhW0ZpbGUuU2hhcmVkQ2xhc3Nlc107XHJcbiAgICBmb3IgKGxldCB0eXBlSW5kZXggPSAwOyB0eXBlSW5kZXggPCBpbnN0YW5jZVR5cGVzTGVuOyArK3R5cGVJbmRleCwgKytpbnNJbmRleCkge1xyXG4gICAgICAgIGxldCB0eXBlID0gaW5zdGFuY2VUeXBlc1t0eXBlSW5kZXhdIGFzIE90aGVyT2JqZWN0VHlwZUlEO1xyXG4gICAgICAgIGxldCBlYWNoRGF0YSA9IGluc3RhbmNlc1tpbnNJbmRleF07XHJcbiAgICAgICAgaWYgKHR5cGUgPj0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gY2xhc3MgaW5kZXggZm9yIERhdGFUeXBlSUQuQ3VzdG9taXplZENsYXNzXHJcblxyXG4gICAgICAgICAgICBsZXQgY3RvciA9IGNsYXNzZXNbdHlwZV0gYXMgQ0NDbGFzczxJQ3VzdG9tQ2xhc3M+OyAgLy8gY2xhc3NcclxuICAgICAgICAgICAgaW5zdGFuY2VzW2luc0luZGV4XSA9IGRlc2VyaWFsaXplQ3VzdG9tQ0NPYmplY3QoZGF0YSwgY3RvciwgZWFjaERhdGEgYXMgSUN1c3RvbU9iamVjdERhdGFDb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBPdGhlclxyXG5cclxuICAgICAgICAgICAgdHlwZSA9ICh+dHlwZSkgYXMgUHJpbWl0aXZlT2JqZWN0VHlwZUlEO1xyXG4gICAgICAgICAgICBsZXQgb3AgPSBBU1NJR05NRU5UU1t0eXBlXTtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBvcChkYXRhLCBpbnN0YW5jZXMsIGluc0luZGV4LCBlYWNoRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb290SW5kZXg7XHJcbn1cclxuXHJcbi8vIGNvbnN0IERFU0VSSUFMSVpFX0FTID0gQXR0ci5ERUxJTUVURVIgKyAnZGVzZXJpYWxpemVBcyc7XHJcbi8vIGZ1bmN0aW9uIGRlc2VyaWFsaXplQXMoa2xhc3M6IEFueUNDQ2xhc3MsIGtsYXNzTGF5b3V0OiBJQ2xhc3MpIHtcclxuLy8gICAgIHZhciBhdHRycyA9IEF0dHIuZ2V0Q2xhc3NBdHRycyhrbGFzcyk7XHJcbi8vICAgICBsZXQga2V5cyA9IGtsYXNzTGF5b3V0W0NMQVNTX0tFWVNdO1xyXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XHJcbi8vICAgICAgICAgbGV0IG5ld0tleSA9IGF0dHJzW2tleXNbaV0gKyBERVNFUklBTElaRV9BU107XHJcbi8vICAgICAgICAgaWYgKG5ld0tleSkge1xyXG4vLyAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbi8vICAgICAgICAgICAgIGlmIChrZXlzLmluY2x1ZGVzKG5ld0tleSkpIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vICVzIGNhbm5vdCBiZSBkZXNlcmlhbGl6ZWQgYnkgcHJvcGVydHkgJXMgYmVjYXVzZSAlcyB3YXMgYWxzbyBwcmVzZW50IGluIHRoZSBzZXJpYWxpemVkIGRhdGEuXHJcbi8vICAgICAgICAgICAgICAgICBjYy53YXJuSUQoLCBuZXdLZXksIGtleXNbaV0sIG5ld0tleSk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBrZXlzW2ldID0gbmV3S2V5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBnZXRNaXNzaW5nQ2xhc3MgKGhhc0N1c3RvbUZpbmRlciwgdHlwZSkge1xyXG4gICAgaWYgKCFoYXNDdXN0b21GaW5kZXIpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZGVzZXJpYWxpemUucmVwb3J0TWlzc2luZ0NsYXNzKHR5cGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBkb0xvb2t1cENsYXNzKGNsYXNzRmluZGVyLCB0eXBlOiBzdHJpbmcsIGNvbnRhaW5lcjogYW55W10sIGluZGV4OiBudW1iZXIsIHNpbGVudDogYm9vbGVhbiwgaGFzQ3VzdG9tRmluZGVyKSB7XHJcbiAgICBsZXQga2xhc3MgPSBjbGFzc0ZpbmRlcih0eXBlKTtcclxuICAgIGlmICgha2xhc3MpIHtcclxuICAgICAgICAvLyBpZiAoa2xhc3MuX19GU0FfXykge1xyXG4gICAgICAgIC8vICAgICBkZXNlcmlhbGl6ZUFzKGtsYXNzLCBrbGFzc0xheW91dCBhcyBJQ2xhc3MpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAoc2lsZW50KSB7XHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRlIGEgbGF6eSBwcm94eSBmb3IgY3RvclxyXG4gICAgICAgICAgICBjb250YWluZXJbaW5kZXhdID0gKGZ1bmN0aW9uIChjb250YWluZXIsIGluZGV4LCB0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gcHJveHkgKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrbGFzcyA9IGNsYXNzRmluZGVyKHR5cGUpIHx8IGdldE1pc3NpbmdDbGFzcyhoYXNDdXN0b21GaW5kZXIsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcltpbmRleF0gPSBrbGFzcztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGtsYXNzKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KShjb250YWluZXIsIGluZGV4LCB0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAga2xhc3MgPSBnZXRNaXNzaW5nQ2xhc3MoaGFzQ3VzdG9tRmluZGVyLCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb250YWluZXJbaW5kZXhdID0ga2xhc3M7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvb2t1cENsYXNzZXMgKGRhdGE6IElQYWNrZWRGaWxlRGF0YSwgc2lsZW50OiBib29sZWFuLCBjdXN0b21GaW5kZXI/OiBDbGFzc0ZpbmRlcikge1xyXG4gICAgbGV0IGNsYXNzRmluZGVyID0gY3VzdG9tRmluZGVyIHx8IGpzLl9nZXRDbGFzc0J5SWQ7XHJcbiAgICBsZXQgY2xhc3NlcyA9IGRhdGFbRmlsZS5TaGFyZWRDbGFzc2VzXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCBrbGFzc0xheW91dCA9IGNsYXNzZXNbaV07XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrbGFzc0xheW91dCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtsYXNzTGF5b3V0W0NMQVNTX1RZUEVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGRlc2VyaWFsaXplIHRoZSBzYW1lIEpTT04gZGF0YSBhZ2Fpbi4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdHlwZTogc3RyaW5nID0ga2xhc3NMYXlvdXRbQ0xBU1NfVFlQRV07XHJcbiAgICAgICAgICAgIGRvTG9va3VwQ2xhc3MoY2xhc3NGaW5kZXIsIHR5cGUsIGtsYXNzTGF5b3V0IGFzIElDbGFzcywgQ0xBU1NfVFlQRSwgc2lsZW50LCBjdXN0b21GaW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9Mb29rdXBDbGFzcyhjbGFzc0ZpbmRlciwga2xhc3NMYXlvdXQsIGNsYXNzZXMsIGksIHNpbGVudCwgY3VzdG9tRmluZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhY2hlTWFza3MgKGRhdGE6IElQYWNrZWRGaWxlRGF0YSkge1xyXG4gICAgbGV0IG1hc2tzID0gZGF0YVtGaWxlLlNoYXJlZE1hc2tzXTtcclxuICAgIGlmIChtYXNrcykge1xyXG4gICAgICAgIGxldCBjbGFzc2VzID0gZGF0YVtGaWxlLlNoYXJlZENsYXNzZXNdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFza3MubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgbGV0IG1hc2sgPSBtYXNrc1tpXTtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBtYXNrW01BU0tfQ0xBU1NdID0gY2xhc3Nlc1ttYXNrW01BU0tfQ0xBU1NdXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlUmVzdWx0IChkYXRhOiBJRmlsZURhdGEpIHtcclxuICAgIGxldCBpbnN0YW5jZXMgPSBkYXRhW0ZpbGUuSW5zdGFuY2VzXTtcclxuICAgIGxldCBzaGFyZWRTdHJpbmdzID0gZGF0YVtGaWxlLlNoYXJlZFN0cmluZ3NdO1xyXG4gICAgbGV0IGRlcGVuZFNoYXJlZFV1aWRzID0gZGF0YVtGaWxlLlNoYXJlZFV1aWRzXTtcclxuXHJcbiAgICBsZXQgZGVwZW5kT2JqcyA9IGRhdGFbRmlsZS5EZXBlbmRPYmpzXTtcclxuICAgIGxldCBkZXBlbmRLZXlzID0gZGF0YVtGaWxlLkRlcGVuZEtleXNdO1xyXG4gICAgbGV0IGRlcGVuZFV1aWRzID0gZGF0YVtGaWxlLkRlcGVuZFV1aWRJbmRpY2VzXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcGVuZE9ianMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgb2JqOiBhbnkgPSBkZXBlbmRPYmpzW2ldO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBkZXBlbmRPYmpzW2ldID0gaW5zdGFuY2VzW29ial07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhc3NpZ25lZCBieSBEYXRhVHlwZUlELkFzc2V0UmVmQnlJbm5lck9iaiBvciBhZGRlZCBieSBEZXRhaWxzIG9iamVjdCBkaXJlY3RseSBpbiBfZGVzZXJpYWxpemVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtleTogYW55ID0gZGVwZW5kS2V5c1tpXTtcclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgaWYgKGtleSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSBzaGFyZWRTdHJpbmdzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBrZXkgPSB+a2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlcGVuZEtleXNbaV0gPSBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhZGRlZCBieSBEZXRhaWxzIG9iamVjdCBkaXJlY3RseSBpbiBfZGVzZXJpYWxpemVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHV1aWQgPSBkZXBlbmRVdWlkc1tpXTtcclxuICAgICAgICBpZiAodHlwZW9mIHV1aWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIGRlcGVuZFV1aWRzW2ldID0gKGRlcGVuZFNoYXJlZFV1aWRzIGFzIFNoYXJlZFN0cmluZ1tdKVt1dWlkIGFzIFN0cmluZ0luZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGFkZGVkIGJ5IERldGFpbHMgb2JqZWN0IGRpcmVjdGx5IGluIF9kZXNlcmlhbGl6ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVzZXJpYWxpemUgKGRhdGE6IElGaWxlRGF0YSwgZGV0YWlsczogRGV0YWlscywgb3B0aW9ucz86IElPcHRpb25zKTogb2JqZWN0IHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGlmIChDQ19FRElUT1IgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBsZXQgYm9ycm93RGV0YWlscyA9ICFkZXRhaWxzO1xyXG4gICAgZGV0YWlscyA9IGRldGFpbHMgfHwgRGV0YWlscy5wb29sLmdldCgpO1xyXG4gICAgZGV0YWlscy5pbml0KGRhdGEpO1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgbGV0IHZlcnNpb24gPSBkYXRhW0ZpbGUuVmVyc2lvbl07XHJcbiAgICBsZXQgcHJlcHJvY2Vzc2VkID0gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc2VkID0gdmVyc2lvbi5wcmVwcm9jZXNzZWQ7XHJcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvbjtcclxuICAgIH1cclxuICAgIGlmICh2ZXJzaW9uIDwgU1VQUE9SVF9NSU5fRk9STUFUX1ZFUlNJT04pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoY2MuZGVidWcuZ2V0RXJyb3IoNTMwNCwgdmVyc2lvbikpO1xyXG4gICAgfVxyXG4gICAgb3B0aW9ucy5fdmVyc2lvbiA9IHZlcnNpb247XHJcbiAgICBvcHRpb25zLnJlc3VsdCA9IGRldGFpbHM7XHJcbiAgICBkYXRhW0ZpbGUuQ29udGV4dF0gPSBvcHRpb25zO1xyXG5cclxuICAgIGlmICghcHJlcHJvY2Vzc2VkKSB7XHJcbiAgICAgICAgbG9va3VwQ2xhc3NlcyhkYXRhLCBmYWxzZSwgb3B0aW9ucy5jbGFzc0ZpbmRlcik7XHJcbiAgICAgICAgY2FjaGVNYXNrcyhkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBjYy5nYW1lLl9pc0Nsb25pbmcgPSB0cnVlO1xyXG4gICAgbGV0IGluc3RhbmNlcyA9IGRhdGFbRmlsZS5JbnN0YW5jZXNdO1xyXG4gICAgbGV0IHJvb3RJbmRleCA9IHBhcnNlSW5zdGFuY2VzKGRhdGEpO1xyXG4gICAgY2MuZ2FtZS5faXNDbG9uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKGRhdGFbRmlsZS5SZWZzXSkge1xyXG4gICAgICAgIGRlcmVmZXJlbmNlKGRhdGFbRmlsZS5SZWZzXSBhcyBJUmVmcywgaW5zdGFuY2VzLCBkYXRhW0ZpbGUuU2hhcmVkU3RyaW5nc10pO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnNlUmVzdWx0KGRhdGEpO1xyXG5cclxuICAgIGlmIChib3Jyb3dEZXRhaWxzKSB7XHJcbiAgICAgICAgRGV0YWlscy5wb29sLnB1dChkZXRhaWxzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5zdGFuY2VzW3Jvb3RJbmRleF07XHJcbn07XHJcblxyXG5kZXNlcmlhbGl6ZS5EZXRhaWxzID0gRGV0YWlscztcclxuXHJcbmNsYXNzIEZpbGVJbmZvIHtcclxuICAgIGRlY2xhcmUgdmVyc2lvbjogbnVtYmVyO1xyXG4gICAgcHJlcHJvY2Vzc2VkID0gdHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yICh2ZXJzaW9uOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5wYWNrSlNPTnMgKGRhdGE6IElQYWNrZWRGaWxlRGF0YSwgY2xhc3NGaW5kZXI/OiBDbGFzc0ZpbmRlcik6IElGaWxlRGF0YVtdIHtcclxuICAgIGlmIChkYXRhW0ZpbGUuVmVyc2lvbl0gPCBTVVBQT1JUX01JTl9GT1JNQVRfVkVSU0lPTikge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihjYy5kZWJ1Zy5nZXRFcnJvcig1MzA0LCBkYXRhW0ZpbGUuVmVyc2lvbl0pKTtcclxuICAgIH1cclxuICAgIGxvb2t1cENsYXNzZXMoZGF0YSwgdHJ1ZSwgY2xhc3NGaW5kZXIpO1xyXG4gICAgY2FjaGVNYXNrcyhkYXRhKTtcclxuXHJcbiAgICBsZXQgdmVyc2lvbiA9IG5ldyBGaWxlSW5mbyhkYXRhW0ZpbGUuVmVyc2lvbl0pO1xyXG4gICAgbGV0IHNoYXJlZFV1aWRzID0gZGF0YVtGaWxlLlNoYXJlZFV1aWRzXTtcclxuICAgIGxldCBzaGFyZWRTdHJpbmdzID0gZGF0YVtGaWxlLlNoYXJlZFN0cmluZ3NdO1xyXG4gICAgbGV0IHNoYXJlZENsYXNzZXMgPSBkYXRhW0ZpbGUuU2hhcmVkQ2xhc3Nlc107XHJcbiAgICBsZXQgc2hhcmVkTWFza3MgPSBkYXRhW0ZpbGUuU2hhcmVkTWFza3NdO1xyXG5cclxuICAgIGxldCBzZWN0aW9ucyA9IGRhdGFbUEFDS0VEX1NFQ1RJT05TXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBzZWN0aW9uc1tpXS51bnNoaWZ0KHZlcnNpb24sIHNoYXJlZFV1aWRzLCBzaGFyZWRTdHJpbmdzLCBzaGFyZWRDbGFzc2VzLCBzaGFyZWRNYXNrcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VjdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWNrQ3VzdG9tT2JqRGF0YSAodHlwZTogc3RyaW5nLCBkYXRhOiBJQ2xhc3NPYmplY3REYXRhfE90aGVyT2JqZWN0RGF0YSwgaGFzTmF0aXZlRGVwPzogYm9vbGVhbik6IElGaWxlRGF0YSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAgIFNVUFBPUlRfTUlOX0ZPUk1BVF9WRVJTSU9OLCBFTVBUWV9QTEFDRUhPTERFUiwgRU1QVFlfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgW3R5cGVdLFxyXG4gICAgICAgIEVNUFRZX1BMQUNFSE9MREVSLFxyXG4gICAgICAgIGhhc05hdGl2ZURlcCA/IFtkYXRhLCB+MF0gOiBbZGF0YV0sXHJcbiAgICAgICAgWzBdLFxyXG4gICAgICAgIEVNUFRZX1BMQUNFSE9MREVSLCBbXSwgW10sIFtdXHJcbiAgICBdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGFzTmF0aXZlRGVwIChkYXRhOiBJRmlsZURhdGEpOiBib29sZWFuIHtcclxuICAgIGxldCBpbnN0YW5jZXMgPSBkYXRhW0ZpbGUuSW5zdGFuY2VzXTtcclxuICAgIGxldCByb290SW5mbyA9IGluc3RhbmNlc1tpbnN0YW5jZXMubGVuZ3RoIC0gMV07XHJcbiAgICBpZiAodHlwZW9mIHJvb3RJbmZvICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiByb290SW5mbyA8IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmIChDQ19QUkVWSUVXKSB7XHJcbiAgICBkZXNlcmlhbGl6ZS5pc0NvbXBpbGVkSnNvbiA9IGZ1bmN0aW9uIChqc29uOiBvYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShqc29uKSkge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbiA9IGpzb25bMF07XHJcbiAgICAgICAgICAgIC8vIGFycmF5WzBdIHdpbGwgbm90IGJlIGEgbnVtYmVyIGluIHRoZSBlZGl0b3IgdmVyc2lvblxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInIHx8IHZlcnNpb24gaW5zdGFuY2VvZiBGaWxlSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVwZW5kVXVpZExpc3QgKGpzb246IElGaWxlRGF0YSk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgbGV0IHNoYXJlZFV1aWRzID0ganNvbltGaWxlLlNoYXJlZFV1aWRzXTtcclxuICAgIHJldHVybiBqc29uW0ZpbGUuRGVwZW5kVXVpZEluZGljZXNdLm1hcChpbmRleCA9PiBzaGFyZWRVdWlkc1tpbmRleF0pO1xyXG59XHJcblxyXG5pZiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpIHtcclxuICAgIGNjLl9kZXNlcmlhbGl6ZUNvbXBpbGVkID0gZGVzZXJpYWxpemU7XHJcbiAgICBkZXNlcmlhbGl6ZS5tYWNyb3MgPSB7XHJcbiAgICAgICAgRU1QVFlfUExBQ0VIT0xERVIsXHJcbiAgICAgICAgQ1VTVE9NX09CSl9EQVRBX0NMQVNTLFxyXG4gICAgICAgIENVU1RPTV9PQkpfREFUQV9DT05URU5ULFxyXG4gICAgICAgIENMQVNTX1RZUEUsXHJcbiAgICAgICAgQ0xBU1NfS0VZUyxcclxuICAgICAgICBDTEFTU19QUk9QX1RZUEVfT0ZGU0VULFxyXG4gICAgICAgIE1BU0tfQ0xBU1MsXHJcbiAgICAgICAgT0JKX0RBVEFfTUFTSyxcclxuICAgICAgICBESUNUX0pTT05fTEFZT1VULFxyXG4gICAgICAgIEFSUkFZX0lURU1fVkFMVUVTLFxyXG4gICAgICAgIFBBQ0tFRF9TRUNUSU9OUyxcclxuICAgIH07XHJcbiAgICBkZXNlcmlhbGl6ZS5fQnVpbHRpblZhbHVlVHlwZXMgPSBCdWlsdGluVmFsdWVUeXBlcztcclxuICAgIGRlc2VyaWFsaXplLl9zZXJpYWxpemVCdWlsdGluVmFsdWVUeXBlcyA9IHNlcmlhbGl6ZUJ1aWx0aW5WYWx1ZVR5cGVzO1xyXG59XHJcblxyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAgY2MuX1Rlc3QuZGVzZXJpYWxpemVDb21waWxlZCA9IHtcclxuICAgICAgICBkZXNlcmlhbGl6ZSxcclxuICAgICAgICBkZXJlZmVyZW5jZSxcclxuICAgICAgICBkZXNlcmlhbGl6ZUNDT2JqZWN0LFxyXG4gICAgICAgIGRlc2VyaWFsaXplQ3VzdG9tQ0NPYmplY3QsXHJcbiAgICAgICAgcGFyc2VJbnN0YW5jZXMsXHJcbiAgICAgICAgcGFyc2VSZXN1bHQsXHJcbiAgICAgICAgY2FjaGVNYXNrcyxcclxuICAgICAgICBGaWxlOiB7XHJcbiAgICAgICAgICAgIFZlcnNpb246IEZpbGUuVmVyc2lvbixcclxuICAgICAgICAgICAgQ29udGV4dDogRmlsZS5Db250ZXh0LFxyXG4gICAgICAgICAgICBTaGFyZWRVdWlkczogRmlsZS5TaGFyZWRVdWlkcyxcclxuICAgICAgICAgICAgU2hhcmVkU3RyaW5nczogRmlsZS5TaGFyZWRTdHJpbmdzLFxyXG4gICAgICAgICAgICBTaGFyZWRDbGFzc2VzOiBGaWxlLlNoYXJlZENsYXNzZXMsXHJcbiAgICAgICAgICAgIFNoYXJlZE1hc2tzOiBGaWxlLlNoYXJlZE1hc2tzLFxyXG4gICAgICAgICAgICBJbnN0YW5jZXM6IEZpbGUuSW5zdGFuY2VzLFxyXG4gICAgICAgICAgICBJbnN0YW5jZVR5cGVzOiBGaWxlLkluc3RhbmNlVHlwZXMsXHJcbiAgICAgICAgICAgIFJlZnM6IEZpbGUuUmVmcyxcclxuICAgICAgICAgICAgRGVwZW5kT2JqczogRmlsZS5EZXBlbmRPYmpzLFxyXG4gICAgICAgICAgICBEZXBlbmRLZXlzOiBGaWxlLkRlcGVuZEtleXMsXHJcbiAgICAgICAgICAgIERlcGVuZFV1aWRJbmRpY2VzOiBGaWxlLkRlcGVuZFV1aWRJbmRpY2VzLFxyXG4gICAgICAgICAgICAvLyBBcnJheUxlbmd0aDogRmlsZS5BcnJheUxlbmd0aCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIERhdGFUeXBlSUQ6IHtcclxuICAgICAgICAgICAgU2ltcGxlVHlwZTogRGF0YVR5cGVJRC5TaW1wbGVUeXBlLFxyXG4gICAgICAgICAgICBJbnN0YW5jZVJlZjogRGF0YVR5cGVJRC5JbnN0YW5jZVJlZixcclxuICAgICAgICAgICAgQXJyYXlfSW5zdGFuY2VSZWY6IERhdGFUeXBlSUQuQXJyYXlfSW5zdGFuY2VSZWYsXHJcbiAgICAgICAgICAgIEFycmF5X0Fzc2V0UmVmQnlJbm5lck9iajogRGF0YVR5cGVJRC5BcnJheV9Bc3NldFJlZkJ5SW5uZXJPYmosXHJcbiAgICAgICAgICAgIENsYXNzOiBEYXRhVHlwZUlELkNsYXNzLFxyXG4gICAgICAgICAgICBWYWx1ZVR5cGVDcmVhdGVkOiBEYXRhVHlwZUlELlZhbHVlVHlwZUNyZWF0ZWQsXHJcbiAgICAgICAgICAgIEFzc2V0UmVmQnlJbm5lck9iajogRGF0YVR5cGVJRC5Bc3NldFJlZkJ5SW5uZXJPYmosXHJcbiAgICAgICAgICAgIFRSUzogRGF0YVR5cGVJRC5UUlMsXHJcbiAgICAgICAgICAgIFZhbHVlVHlwZTogRGF0YVR5cGVJRC5WYWx1ZVR5cGUsXHJcbiAgICAgICAgICAgIEFycmF5X0NsYXNzOiBEYXRhVHlwZUlELkFycmF5X0NsYXNzLFxyXG4gICAgICAgICAgICBDdXN0b21pemVkQ2xhc3M6IERhdGFUeXBlSUQuQ3VzdG9taXplZENsYXNzLFxyXG4gICAgICAgICAgICBEaWN0OiBEYXRhVHlwZUlELkRpY3QsXHJcbiAgICAgICAgICAgIEFycmF5OiBEYXRhVHlwZUlELkFycmF5LFxyXG4gICAgICAgICAgICAvLyBUeXBlZEFycmF5OiBEYXRhVHlwZUlELlR5cGVkQXJyYXksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCdWlsdGluVmFsdWVUeXBlcyxcclxuICAgICAgICB1bnBhY2tKU09OcyxcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvIn0=