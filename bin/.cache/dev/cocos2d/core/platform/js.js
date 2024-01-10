
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/js.js';
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
var tempCIDGenerater = new (require('./id-generater'))('TmpCId.');

function _getPropertyDescriptor(obj, name) {
  while (obj) {
    var pd = Object.getOwnPropertyDescriptor(obj, name);

    if (pd) {
      return pd;
    }

    obj = Object.getPrototypeOf(obj);
  }

  return null;
}

function _copyprop(name, source, target) {
  var pd = _getPropertyDescriptor(source, name);

  Object.defineProperty(target, name, pd);
}
/**
 * !#en This module provides some JavaScript utilities. All members can be accessed with `cc.js`.
 * !#zh 这个模块封装了 JavaScript 相关的一些实用函数，你可以通过 `cc.js` 来访问这个模块。
 * @submodule js
 * @module js
 */


var js = {
  /**
   * Check the obj whether is number or not
   * If a number is created by using 'new Number(10086)', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   * @method isNumber
   * @param {*} obj
   * @returns {Boolean}
   */
  isNumber: function isNumber(obj) {
    return typeof obj === 'number' || obj instanceof Number;
  },

  /**
   * Check the obj whether is string or not.
   * If a string is created by using 'new String("blabla")', the typeof it will be "object"...
   * Then you can use this function if you care about this case.
   * @method isString
   * @param {*} obj
   * @returns {Boolean}
   */
  isString: function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
  },

  /**
   * Copy all properties not defined in obj from arguments[1...n]
   * @method addon
   * @param {Object} obj object to extend its properties
   * @param {Object} ...sourceObj source object to copy properties from
   * @return {Object} the result obj
   */
  addon: function addon(obj) {
    'use strict';

    obj = obj || {};

    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];

      if (source) {
        if (typeof source !== 'object') {
          cc.errorID(5402, source);
          continue;
        }

        for (var name in source) {
          if (!(name in obj)) {
            _copyprop(name, source, obj);
          }
        }
      }
    }

    return obj;
  },

  /**
   * copy all properties from arguments[1...n] to obj
   * @method mixin
   * @param {Object} obj
   * @param {Object} ...sourceObj
   * @return {Object} the result obj
   */
  mixin: function mixin(obj) {
    'use strict';

    obj = obj || {};

    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];

      if (source) {
        if (typeof source !== 'object') {
          cc.errorID(5403, source);
          continue;
        }

        for (var name in source) {
          _copyprop(name, source, obj);
        }
      }
    }

    return obj;
  },

  /**
   * Derive the class from the supplied base class.
   * Both classes are just native javascript constructors, not created by cc.Class, so
   * usually you will want to inherit using {{#crossLink "cc/Class:method"}}cc.Class {{/crossLink}} instead.
   * @method extend
   * @param {Function} cls
   * @param {Function} base - the baseclass to inherit
   * @return {Function} the result class
   */
  extend: function extend(cls, base) {
    if (CC_DEV) {
      if (!base) {
        cc.errorID(5404);
        return;
      }

      if (!cls) {
        cc.errorID(5405);
        return;
      }

      if (Object.keys(cls.prototype).length > 0) {
        cc.errorID(5406);
      }
    }

    for (var p in base) {
      if (base.hasOwnProperty(p)) cls[p] = base[p];
    }

    cls.prototype = Object.create(base.prototype, {
      constructor: {
        value: cls,
        writable: true,
        configurable: true
      }
    });
    return cls;
  },

  /**
   * Get super class
   * @method getSuper
   * @param {Function} ctor - the constructor of subclass
   * @return {Function}
   */
  getSuper: function getSuper(ctor) {
    var proto = ctor.prototype; // binded function do not have prototype

    var dunderProto = proto && Object.getPrototypeOf(proto);
    return dunderProto && dunderProto.constructor;
  },

  /**
   * Checks whether subclass is child of superclass or equals to superclass
   *
   * @method isChildClassOf
   * @param {Function} subclass
   * @param {Function} superclass
   * @return {Boolean}
   */
  isChildClassOf: function isChildClassOf(subclass, superclass) {
    if (subclass && superclass) {
      if (typeof subclass !== 'function') {
        return false;
      }

      if (typeof superclass !== 'function') {
        if (CC_DEV) {
          cc.warnID(3625, superclass);
        }

        return false;
      }

      if (subclass === superclass) {
        return true;
      }

      for (;;) {
        subclass = js.getSuper(subclass);

        if (!subclass) {
          return false;
        }

        if (subclass === superclass) {
          return true;
        }
      }
    }

    return false;
  },

  /**
   * Removes all enumerable properties from object
   * @method clear
   * @param {any} obj
   */
  clear: function clear(obj) {
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      delete obj[keys[i]];
    }
  },

  /**
   * Checks whether obj is an empty object
   * @method isEmptyObject
   * @param {any} obj 
   * @returns {Boolean}
   */
  isEmptyObject: function isEmptyObject(obj) {
    for (var key in obj) {
      return false;
    }

    return true;
  },

  /**
   * Get property descriptor in object and all its ancestors
   * @method getPropertyDescriptor
   * @param {Object} obj
   * @param {String} name
   * @return {Object}
   */
  getPropertyDescriptor: _getPropertyDescriptor
};
var tmpValueDesc = {
  value: undefined,
  enumerable: false,
  writable: false,
  configurable: true
};
/**
 * Define value, just help to call Object.defineProperty.<br>
 * The configurable will be true.
 * @method value
 * @param {Object} obj
 * @param {String} prop
 * @param {any} value
 * @param {Boolean} [writable=false]
 * @param {Boolean} [enumerable=false]
 */

js.value = function (obj, prop, value, writable, enumerable) {
  tmpValueDesc.value = value;
  tmpValueDesc.writable = writable;
  tmpValueDesc.enumerable = enumerable;
  Object.defineProperty(obj, prop, tmpValueDesc);
  tmpValueDesc.value = undefined;
};

var tmpGetSetDesc = {
  get: null,
  set: null,
  enumerable: false
};
/**
 * Define get set accessor, just help to call Object.defineProperty(...)
 * @method getset
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} getter
 * @param {Function} [setter=null]
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.getset = function (obj, prop, getter, setter, enumerable, configurable) {
  if (typeof setter !== 'function') {
    enumerable = setter;
    setter = undefined;
  }

  tmpGetSetDesc.get = getter;
  tmpGetSetDesc.set = setter;
  tmpGetSetDesc.enumerable = enumerable;
  tmpGetSetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpGetSetDesc);
  tmpGetSetDesc.get = null;
  tmpGetSetDesc.set = null;
};

var tmpGetDesc = {
  get: null,
  enumerable: false,
  configurable: false
};
/**
 * Define get accessor, just help to call Object.defineProperty(...)
 * @method get
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} getter
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.get = function (obj, prop, getter, enumerable, configurable) {
  tmpGetDesc.get = getter;
  tmpGetDesc.enumerable = enumerable;
  tmpGetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpGetDesc);
  tmpGetDesc.get = null;
};

var tmpSetDesc = {
  set: null,
  enumerable: false,
  configurable: false
};
/**
 * Define set accessor, just help to call Object.defineProperty(...)
 * @method set
 * @param {Object} obj
 * @param {String} prop
 * @param {Function} setter
 * @param {Boolean} [enumerable=false]
 * @param {Boolean} [configurable=false]
 */

js.set = function (obj, prop, setter, enumerable, configurable) {
  tmpSetDesc.set = setter;
  tmpSetDesc.enumerable = enumerable;
  tmpSetDesc.configurable = configurable;
  Object.defineProperty(obj, prop, tmpSetDesc);
  tmpSetDesc.set = null;
};
/**
 * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return "".
 * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
 * @method getClassName
 * @param {Object|Function} objOrCtor - instance or constructor
 * @return {String}
 */


js.getClassName = function (objOrCtor) {
  if (typeof objOrCtor === 'function') {
    var prototype = objOrCtor.prototype;

    if (prototype && prototype.hasOwnProperty('__classname__') && prototype.__classname__) {
      return prototype.__classname__;
    }

    var retval = ''; //  for browsers which have name property in the constructor of the object, such as chrome

    if (objOrCtor.name) {
      retval = objOrCtor.name;
    }

    if (objOrCtor.toString) {
      var arr,
          str = objOrCtor.toString();

      if (str.charAt(0) === '[') {
        // str is "[object objectClass]"
        arr = str.match(/\[\w+\s*(\w+)\]/);
      } else {
        // str is function objectClass () {} for IE Firefox
        arr = str.match(/function\s*(\w+)/);
      }

      if (arr && arr.length === 2) {
        retval = arr[1];
      }
    }

    return retval !== 'Object' ? retval : '';
  } else if (objOrCtor && objOrCtor.constructor) {
    return js.getClassName(objOrCtor.constructor);
  }

  return '';
};

function isTempClassId(id) {
  return typeof id !== 'string' || id.startsWith(tempCIDGenerater.prefix);
} // id 注册


(function () {
  var _idToClass = {};
  var _nameToClass = {};

  function setup(key, publicName, table) {
    js.getset(js, publicName, function () {
      return Object.assign({}, table);
    }, function (value) {
      js.clear(table);
      Object.assign(table, value);
    });
    return function (id, constructor) {
      // deregister old
      if (constructor.prototype.hasOwnProperty(key)) {
        delete table[constructor.prototype[key]];
      }

      js.value(constructor.prototype, key, id); // register class

      if (id) {
        var registered = table[id];

        if (registered && registered !== constructor) {
          var error = 'A Class already exists with the same ' + key + ' : "' + id + '".';

          if (CC_TEST) {
            error += ' (This may be caused by error of unit test.) \
If you dont need serialization, you can set class id to "". You can also call \
cc.js.unregisterClass to remove the id of unused class';
          }

          cc.error(error);
        } else {
          table[id] = constructor;
        } //if (id === "") {
        //    console.trace("", table === _nameToClass);
        //}

      }
    };
  }
  /**
   * Register the class by specified id, if its classname is not defined, the class name will also be set.
   * @method _setClassId
   * @param {String} classId
   * @param {Function} constructor
   * @private
   */

  /**
   * !#en All classes registered in the engine, indexed by ID.
   * !#zh 引擎中已注册的所有类型，通过 ID 进行索引。
   * @property _registeredClassIds
   * @example
   * // save all registered classes before loading scripts
   * let builtinClassIds = cc.js._registeredClassIds;
   * let builtinClassNames = cc.js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * cc.js._registeredClassIds = builtinClassIds;
   * cc.js._registeredClassNames = builtinClassNames;
   */


  js._setClassId = setup('__cid__', '_registeredClassIds', _idToClass);
  /**
   * !#en All classes registered in the engine, indexed by name.
   * !#zh 引擎中已注册的所有类型，通过名称进行索引。
   * @property _registeredClassNames
   * @example
   * // save all registered classes before loading scripts
   * let builtinClassIds = cc.js._registeredClassIds;
   * let builtinClassNames = cc.js._registeredClassNames;
   * // load some scripts that contain CCClass
   * ...
   * // clear all loaded classes
   * cc.js._registeredClassIds = builtinClassIds;
   * cc.js._registeredClassNames = builtinClassNames;
   */

  var doSetClassName = setup('__classname__', '_registeredClassNames', _nameToClass);
  /**
   * Register the class by specified name manually
   * @method setClassName
   * @param {String} className
   * @param {Function} constructor
   */

  js.setClassName = function (className, constructor) {
    doSetClassName(className, constructor); // auto set class id

    if (!constructor.prototype.hasOwnProperty('__cid__')) {
      var id = className || tempCIDGenerater.getNewId();

      if (id) {
        js._setClassId(id, constructor);
      }
    }
  };
  /**
   * Unregister a class from fireball.
   *
   * If you dont need a registered class anymore, you should unregister the class so that Fireball will not keep its reference anymore.
   * Please note that its still your responsibility to free other references to the class.
   *
   * @method unregisterClass
   * @param {Function} ...constructor - the class you will want to unregister, any number of classes can be added
   */


  js.unregisterClass = function () {
    for (var i = 0; i < arguments.length; i++) {
      var p = arguments[i].prototype;
      var classId = p.__cid__;

      if (classId) {
        delete _idToClass[classId];
      }

      var classname = p.__classname__;

      if (classname) {
        delete _nameToClass[classname];
      }
    }
  };
  /**
   * Get the registered class by id
   * @method _getClassById
   * @param {String} classId
   * @return {Function} constructor
   * @private
   */


  js._getClassById = function (classId) {
    return _idToClass[classId];
  };
  /**
   * Get the registered class by name
   * @method getClassByName
   * @param {String} classname
   * @return {Function} constructor
   */


  js.getClassByName = function (classname) {
    return _nameToClass[classname];
  };
  /**
   * Get class id of the object
   * @method _getClassId
   * @param {Object|Function} obj - instance or constructor
   * @param {Boolean} [allowTempId=true] - can return temp id in editor
   * @return {String}
   * @private
   */


  js._getClassId = function (obj, allowTempId) {
    allowTempId = typeof allowTempId !== 'undefined' ? allowTempId : true;
    var res;

    if (typeof obj === 'function' && obj.prototype.hasOwnProperty('__cid__')) {
      res = obj.prototype.__cid__;

      if (!allowTempId && (CC_DEV || CC_EDITOR) && isTempClassId(res)) {
        return '';
      }

      return res;
    }

    if (obj && obj.constructor) {
      var prototype = obj.constructor.prototype;

      if (prototype && prototype.hasOwnProperty('__cid__')) {
        res = obj.__cid__;

        if (!allowTempId && (CC_DEV || CC_EDITOR) && isTempClassId(res)) {
          return '';
        }

        return res;
      }
    }

    return '';
  };
})();
/**
 * Defines a polyfill field for deprecated codes.
 * @method obsolete
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {String} obsoleted - "OldParam" or "YourClass.OldParam"
 * @param {String} newExpr - "NewParam" or "YourClass.NewParam"
 * @param {Boolean} [writable=false]
 */


js.obsolete = function (obj, obsoleted, newExpr, writable) {
  var extractPropName = /([^.]+)$/;
  var oldProp = extractPropName.exec(obsoleted)[0];
  var newProp = extractPropName.exec(newExpr)[0];

  function get() {
    if (CC_DEV) {
      cc.warnID(1400, obsoleted, newExpr);
    }

    return this[newProp];
  }

  if (writable) {
    js.getset(obj, oldProp, get, function (value) {
      if (CC_DEV) {
        cc.warnID(1400, obsoleted, newExpr);
      }

      this[newProp] = value;
    });
  } else {
    js.get(obj, oldProp, get);
  }
};
/**
 * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
 * @method obsoletes
 * @param {any} obj - YourObject or YourClass.prototype
 * @param {any} objName - "YourObject" or "YourClass"
 * @param {Object} props
 * @param {Boolean} [writable=false]
 */


js.obsoletes = function (obj, objName, props, writable) {
  for (var obsoleted in props) {
    var newName = props[obsoleted];
    js.obsolete(obj, objName + '.' + obsoleted, newName, writable);
  }
};

var REGEXP_NUM_OR_STR = /(%d)|(%s)/;
var REGEXP_STR = /%s/;
/**
 * A string tool to construct a string with format string.
 * @method formatStr
 * @param {String|any} msg - A JavaScript string containing zero or more substitution strings (%s).
 * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
 * @returns {String}
 * @example
 * cc.js.formatStr("a: %s, b: %s", a, b);
 * cc.js.formatStr(a, b, c);
 */

js.formatStr = function () {
  var argLen = arguments.length;

  if (argLen === 0) {
    return '';
  }

  var msg = arguments[0];

  if (argLen === 1) {
    return '' + msg;
  }

  var hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg);

  if (hasSubstitution) {
    for (var i = 1; i < argLen; ++i) {
      var arg = arguments[i];
      var regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR;

      if (regExpToTest.test(msg)) {
        var notReplaceFunction = '' + arg;
        msg = msg.replace(regExpToTest, notReplaceFunction);
      } else msg += ' ' + arg;
    }
  } else {
    for (var _i = 1; _i < argLen; ++_i) {
      msg += ' ' + arguments[_i];
    }
  }

  return msg;
}; // see https://github.com/petkaantonov/bluebird/issues/1389


js.shiftArguments = function () {
  var len = arguments.length - 1;
  var args = new Array(len);

  for (var i = 0; i < len; ++i) {
    args[i] = arguments[i + 1];
  }

  return args;
};
/**
 * !#en
 * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members). So we can skip `hasOwnProperty` calls on property lookups. It is a worthwhile optimization than the `{}` literal when `hasOwnProperty` calls are necessary.
 * !#zh
 * 该方法是对 `Object.create(null)` 的简单封装。`Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断。在需要频繁判断 `hasOwnProperty` 时，使用这个方法性能会比 `{}` 更高。
 *
 * @method createMap
 * @param {Boolean} [forceDictMode=false] - Apply the delete operator to newly created map object. This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes which are very expensive for objects that are constantly changing shape.
 * @return {Object}
 */


js.createMap = function (forceDictMode) {
  var map = Object.create(null);

  if (forceDictMode) {
    var INVALID_IDENTIFIER_1 = '.';
    var INVALID_IDENTIFIER_2 = '/';
    map[INVALID_IDENTIFIER_1] = true;
    map[INVALID_IDENTIFIER_2] = true;
    delete map[INVALID_IDENTIFIER_1];
    delete map[INVALID_IDENTIFIER_2];
  }

  return map;
};
/**
 * @class array
 * @static
 */

/**
 * Removes the array item at the specified index.
 * @method removeAt
 * @param {any[]} array
 * @param {Number} index
 */


function removeAt(array, index) {
  array.splice(index, 1);
}
/**
 * Removes the array item at the specified index.
 * It's faster but the order of the array will be changed.
 * @method fastRemoveAt
 * @param {any[]} array
 * @param {Number} index
 */


function fastRemoveAt(array, index) {
  var length = array.length;

  if (index < 0 || index >= length) {
    return;
  }

  array[index] = array[length - 1];
  array.length = length - 1;
}
/**
 * Removes the first occurrence of a specific object from the array.
 * @method remove
 * @param {any[]} array
 * @param {any} value
 * @return {Boolean}
 */


function remove(array, value) {
  var index = array.indexOf(value);

  if (index >= 0) {
    removeAt(array, index);
    return true;
  } else {
    return false;
  }
}
/**
 * Removes the first occurrence of a specific object from the array.
 * It's faster but the order of the array will be changed.
 * @method fastRemove
 * @param {any[]} array
 * @param {Number} value
 */


function fastRemove(array, value) {
  var index = array.indexOf(value);

  if (index >= 0) {
    array[index] = array[array.length - 1];
    --array.length;
  }
}
/**
 * Verify array's Type
 * @method verifyType
 * @param {array} array
 * @param {Function} type
 * @return {Boolean}
 */


function verifyType(array, type) {
  if (array && array.length > 0) {
    for (var i = 0; i < array.length; i++) {
      if (!(array[i] instanceof type)) {
        cc.logID(1300);
        return false;
      }
    }
  }

  return true;
}
/**
 * Removes from array all values in minusArr. For each Value in minusArr, the first matching instance in array will be removed.
 * @method removeArray
 * @param {Array} array Source Array
 * @param {Array} minusArr minus Array
 */


function removeArray(array, minusArr) {
  for (var i = 0, l = minusArr.length; i < l; i++) {
    remove(array, minusArr[i]);
  }
}
/**
 * Inserts some objects at index
 * @method appendObjectsAt
 * @param {Array} array
 * @param {Array} addObjs
 * @param {Number} index
 * @return {Array}
 */


function appendObjectsAt(array, addObjs, index) {
  array.splice.apply(array, [index, 0].concat(addObjs));
  return array;
}
/**
 * Determines whether the array contains a specific value.
 * @method contains
 * @param {any[]} array
 * @param {any} value
 * @return {Boolean}
 */


function contains(array, value) {
  return array.indexOf(value) >= 0;
}
/**
 * Copy an array's item to a new array (its performance is better than Array.slice)
 * @method copy
 * @param {Array} array
 * @return {Array}
 */


function copy(array) {
  var i,
      len = array.length,
      arr_clone = new Array(len);

  for (i = 0; i < len; i += 1) {
    arr_clone[i] = array[i];
  }

  return arr_clone;
}

js.array = {
  remove: remove,
  fastRemove: fastRemove,
  removeAt: removeAt,
  fastRemoveAt: fastRemoveAt,
  contains: contains,
  verifyType: verifyType,
  removeArray: removeArray,
  appendObjectsAt: appendObjectsAt,
  copy: copy,
  MutableForwardIterator: require('../utils/mutable-forward-iterator')
}; // OBJECT POOL

/**
 * !#en
 * A fixed-length object pool designed for general type.<br>
 * The implementation of this object pool is very simple,
 * it can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
 * !#zh
 * 长度固定的对象缓存池，可以用来缓存各种对象类型。<br/>
 * 这个对象池的实现非常精简，它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁。
 * @class Pool
 * @example
 *
 *Example 1:
 *
 *function Details () {
 *    this.uuidList = [];
 *};
 *Details.prototype.reset = function () {
 *    this.uuidList.length = 0;
 *};
 *Details.pool = new js.Pool(function (obj) {
 *    obj.reset();
 *}, 5);
 *Details.pool.get = function () {
 *    return this._get() || new Details();
 *};
 *
 *var detail = Details.pool.get();
 *...
 *Details.pool.put(detail);
 *
 *Example 2:
 *
 *function Details (buffer) {
 *    this.uuidList = buffer;
 *};
 *...
 *Details.pool.get = function (buffer) {
 *    var cached = this._get();
 *    if (cached) {
 *        cached.uuidList = buffer;
 *        return cached;
 *    }
 *    else {
 *        return new Details(buffer);
 *    }
 *};
 *
 *var detail = Details.pool.get( [] );
 *...
 */

/**
 * !#en
 * Constructor for creating an object pool for the specific object type.
 * You can pass a callback argument for process the cleanup logic when the object is recycled.
 * !#zh
 * 使用构造函数来创建一个指定对象类型的对象池，您可以传递一个回调函数，用于处理对象回收时的清理逻辑。
 * @method constructor
 * @param {Function} [cleanupFunc] - the callback method used to process the cleanup logic when the object is recycled.
 * @param {Object} cleanupFunc.obj
 * @param {Number} size - initializes the length of the array
 * @typescript
 * constructor(cleanupFunc: (obj: any) => void, size: number)
 * constructor(size: number)
 */

function Pool(cleanupFunc, size) {
  if (size === undefined) {
    size = cleanupFunc;
    cleanupFunc = null;
  }

  this.get = null;
  this.count = 0;
  this._pool = new Array(size);
  this._cleanup = cleanupFunc;
}
/**
 * !#en
 * Get and initialize an object from pool. This method defaults to null and requires the user to implement it.
 * !#zh
 * 获取并初始化对象池中的对象。这个方法默认为空，需要用户自己实现。
 * @method get
 * @param {any} ...params - parameters to used to initialize the object
 * @returns {Object}
 */

/**
 * !#en
 * The current number of available objects, the default is 0, it will gradually increase with the recycle of the object,
 * the maximum will not exceed the size specified when the constructor is called.
 * !#zh
 * 当前可用对象数量，一开始默认是 0，随着对象的回收会逐渐增大，最大不会超过调用构造函数时指定的 size。
 * @property {Number} count
 * @default 0
 */

/**
 * !#en
 * Get an object from pool, if no available object in the pool, null will be returned.
 * !#zh
 * 获取对象池中的对象，如果对象池没有可用对象，则返回空。
 * @method _get
 * @returns {Object|null}
 */


Pool.prototype._get = function () {
  if (this.count > 0) {
    --this.count;
    var cache = this._pool[this.count];
    this._pool[this.count] = null;
    return cache;
  }

  return null;
};
/**
 * !#en Put an object into the pool.
 * !#zh 向对象池返还一个不再需要的对象。
 * @method put
 */


Pool.prototype.put = function (obj) {
  var pool = this._pool;

  if (this.count < pool.length) {
    if (this._cleanup && this._cleanup(obj) === false) {
      return;
    }

    pool[this.count] = obj;
    ++this.count;
  }
};
/**
 * !#en Resize the pool.
 * !#zh 设置对象池容量。
 * @method resize
 */


Pool.prototype.resize = function (length) {
  if (length >= 0) {
    this._pool.length = length;

    if (this.count > length) {
      this.count = length;
    }
  }
};

js.Pool = Pool; //

cc.js = js;
module.exports = js; // fix submodule pollute ...

/**
 * @submodule cc
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxqcy5qcyJdLCJuYW1lcyI6WyJ0ZW1wQ0lER2VuZXJhdGVyIiwicmVxdWlyZSIsIl9nZXRQcm9wZXJ0eURlc2NyaXB0b3IiLCJvYmoiLCJuYW1lIiwicGQiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRQcm90b3R5cGVPZiIsIl9jb3B5cHJvcCIsInNvdXJjZSIsInRhcmdldCIsImRlZmluZVByb3BlcnR5IiwianMiLCJpc051bWJlciIsIk51bWJlciIsImlzU3RyaW5nIiwiU3RyaW5nIiwiYWRkb24iLCJpIiwibGVuZ3RoIiwiYXJndW1lbnRzIiwiY2MiLCJlcnJvcklEIiwibWl4aW4iLCJleHRlbmQiLCJjbHMiLCJiYXNlIiwiQ0NfREVWIiwia2V5cyIsInByb3RvdHlwZSIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJ3cml0YWJsZSIsImNvbmZpZ3VyYWJsZSIsImdldFN1cGVyIiwiY3RvciIsInByb3RvIiwiZHVuZGVyUHJvdG8iLCJpc0NoaWxkQ2xhc3NPZiIsInN1YmNsYXNzIiwic3VwZXJjbGFzcyIsIndhcm5JRCIsImNsZWFyIiwiaXNFbXB0eU9iamVjdCIsImtleSIsImdldFByb3BlcnR5RGVzY3JpcHRvciIsInRtcFZhbHVlRGVzYyIsInVuZGVmaW5lZCIsImVudW1lcmFibGUiLCJwcm9wIiwidG1wR2V0U2V0RGVzYyIsImdldCIsInNldCIsImdldHNldCIsImdldHRlciIsInNldHRlciIsInRtcEdldERlc2MiLCJ0bXBTZXREZXNjIiwiZ2V0Q2xhc3NOYW1lIiwib2JqT3JDdG9yIiwiX19jbGFzc25hbWVfXyIsInJldHZhbCIsInRvU3RyaW5nIiwiYXJyIiwic3RyIiwiY2hhckF0IiwibWF0Y2giLCJpc1RlbXBDbGFzc0lkIiwiaWQiLCJzdGFydHNXaXRoIiwicHJlZml4IiwiX2lkVG9DbGFzcyIsIl9uYW1lVG9DbGFzcyIsInNldHVwIiwicHVibGljTmFtZSIsInRhYmxlIiwiYXNzaWduIiwicmVnaXN0ZXJlZCIsImVycm9yIiwiQ0NfVEVTVCIsIl9zZXRDbGFzc0lkIiwiZG9TZXRDbGFzc05hbWUiLCJzZXRDbGFzc05hbWUiLCJjbGFzc05hbWUiLCJnZXROZXdJZCIsInVucmVnaXN0ZXJDbGFzcyIsImNsYXNzSWQiLCJfX2NpZF9fIiwiY2xhc3NuYW1lIiwiX2dldENsYXNzQnlJZCIsImdldENsYXNzQnlOYW1lIiwiX2dldENsYXNzSWQiLCJhbGxvd1RlbXBJZCIsInJlcyIsIkNDX0VESVRPUiIsIm9ic29sZXRlIiwib2Jzb2xldGVkIiwibmV3RXhwciIsImV4dHJhY3RQcm9wTmFtZSIsIm9sZFByb3AiLCJleGVjIiwibmV3UHJvcCIsIm9ic29sZXRlcyIsIm9iak5hbWUiLCJwcm9wcyIsIm5ld05hbWUiLCJSRUdFWFBfTlVNX09SX1NUUiIsIlJFR0VYUF9TVFIiLCJmb3JtYXRTdHIiLCJhcmdMZW4iLCJtc2ciLCJoYXNTdWJzdGl0dXRpb24iLCJ0ZXN0IiwiYXJnIiwicmVnRXhwVG9UZXN0Iiwibm90UmVwbGFjZUZ1bmN0aW9uIiwicmVwbGFjZSIsInNoaWZ0QXJndW1lbnRzIiwibGVuIiwiYXJncyIsIkFycmF5IiwiY3JlYXRlTWFwIiwiZm9yY2VEaWN0TW9kZSIsIm1hcCIsIklOVkFMSURfSURFTlRJRklFUl8xIiwiSU5WQUxJRF9JREVOVElGSUVSXzIiLCJyZW1vdmVBdCIsImFycmF5IiwiaW5kZXgiLCJzcGxpY2UiLCJmYXN0UmVtb3ZlQXQiLCJyZW1vdmUiLCJpbmRleE9mIiwiZmFzdFJlbW92ZSIsInZlcmlmeVR5cGUiLCJ0eXBlIiwibG9nSUQiLCJyZW1vdmVBcnJheSIsIm1pbnVzQXJyIiwibCIsImFwcGVuZE9iamVjdHNBdCIsImFkZE9ianMiLCJhcHBseSIsImNvbmNhdCIsImNvbnRhaW5zIiwiY29weSIsImFycl9jbG9uZSIsIk11dGFibGVGb3J3YXJkSXRlcmF0b3IiLCJQb29sIiwiY2xlYW51cEZ1bmMiLCJzaXplIiwiY291bnQiLCJfcG9vbCIsIl9jbGVhbnVwIiwiX2dldCIsImNhY2hlIiwicHV0IiwicG9vbCIsInJlc2l6ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsZ0JBQWdCLEdBQUcsS0FBS0MsT0FBTyxDQUFDLGdCQUFELENBQVosRUFBZ0MsU0FBaEMsQ0FBekI7O0FBR0EsU0FBU0Msc0JBQVQsQ0FBaUNDLEdBQWpDLEVBQXNDQyxJQUF0QyxFQUE0QztBQUN4QyxTQUFPRCxHQUFQLEVBQVk7QUFDUixRQUFJRSxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NKLEdBQWhDLEVBQXFDQyxJQUFyQyxDQUFUOztBQUNBLFFBQUlDLEVBQUosRUFBUTtBQUNKLGFBQU9BLEVBQVA7QUFDSDs7QUFDREYsSUFBQUEsR0FBRyxHQUFHRyxNQUFNLENBQUNFLGNBQVAsQ0FBc0JMLEdBQXRCLENBQU47QUFDSDs7QUFDRCxTQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTTSxTQUFULENBQW1CTCxJQUFuQixFQUF5Qk0sTUFBekIsRUFBaUNDLE1BQWpDLEVBQXlDO0FBQ3JDLE1BQUlOLEVBQUUsR0FBR0gsc0JBQXNCLENBQUNRLE1BQUQsRUFBU04sSUFBVCxDQUEvQjs7QUFDQUUsRUFBQUEsTUFBTSxDQUFDTSxjQUFQLENBQXNCRCxNQUF0QixFQUE4QlAsSUFBOUIsRUFBb0NDLEVBQXBDO0FBQ0g7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQUlRLEVBQUUsR0FBRztBQUVMO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsUUFB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QUFLTCxLQUFoQjs7QUFDQSxNQUFJLEtBQUtELEtBQUwsR0FBYU0sSUFBSSxDQUFDN0ksTUFBdEIsRUFBOEI7QUFDMUIsUUFBSSxLQUFLeUksUUFBTCxJQUFpQixLQUFLQSxRQUFMLENBQWMxSixHQUFkLE1BQXVCLEtBQTVDLEVBQW1EO0FBQy9DO0FBQ0g7O0FBQ0Q4SixJQUFBQSxJQUFJLENBQUMsS0FBS04sS0FBTixDQUFKLEdBQW1CeEosR0FBbkI7QUFDQSxNQUFFLEtBQUt3SixLQUFQO0FBQ0g7QUFDSixDQVREO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0FILElBQUksQ0FBQzFILFNBQUwsQ0FBZW9JLE1BQWYsR0FBd0IsVUFBVTlJLE1BQVYsRUFBa0I7QUFDdEMsTUFBSUEsTUFBTSxJQUFJLENBQWQsRUFBaUI7QUFDYixTQUFLd0ksS0FBTCxDQUFXeEksTUFBWCxHQUFvQkEsTUFBcEI7O0FBQ0EsUUFBSSxLQUFLdUksS0FBTCxHQUFhdkksTUFBakIsRUFBeUI7QUFDckIsV0FBS3VJLEtBQUwsR0FBYXZJLE1BQWI7QUFDSDtBQUNKO0FBQ0osQ0FQRDs7QUFTQVAsRUFBRSxDQUFDMkksSUFBSCxHQUFVQSxJQUFWLEVBRUE7O0FBRUFsSSxFQUFFLENBQUNULEVBQUgsR0FBUUEsRUFBUjtBQUVBc0osTUFBTSxDQUFDQyxPQUFQLEdBQWlCdkosRUFBakIsRUFFQTs7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDA4LTIwMTAgUmljYXJkbyBRdWVzYWRhXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXHJcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cclxuXHJcbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmNvbnN0IHRlbXBDSURHZW5lcmF0ZXIgPSBuZXcgKHJlcXVpcmUoJy4vaWQtZ2VuZXJhdGVyJykpKCdUbXBDSWQuJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gX2dldFByb3BlcnR5RGVzY3JpcHRvciAob2JqLCBuYW1lKSB7XHJcbiAgICB3aGlsZSAob2JqKSB7XHJcbiAgICAgICAgdmFyIHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIG5hbWUpO1xyXG4gICAgICAgIGlmIChwZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jb3B5cHJvcChuYW1lLCBzb3VyY2UsIHRhcmdldCkge1xyXG4gICAgdmFyIHBkID0gX2dldFByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIG5hbWUpO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgcGQpO1xyXG59XHJcblxyXG4vKipcclxuICogISNlbiBUaGlzIG1vZHVsZSBwcm92aWRlcyBzb21lIEphdmFTY3JpcHQgdXRpbGl0aWVzLiBBbGwgbWVtYmVycyBjYW4gYmUgYWNjZXNzZWQgd2l0aCBgY2MuanNgLlxyXG4gKiAhI3poIOi/meS4quaooeWdl+WwgeijheS6hiBKYXZhU2NyaXB0IOebuOWFs+eahOS4gOS6m+WunueUqOWHveaVsO+8jOS9oOWPr+S7pemAmui/hyBgY2MuanNgIOadpeiuv+mXrui/meS4quaooeWdl+OAglxyXG4gKiBAc3VibW9kdWxlIGpzXHJcbiAqIEBtb2R1bGUganNcclxuICovXHJcbnZhciBqcyA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRoZSBvYmogd2hldGhlciBpcyBudW1iZXIgb3Igbm90XHJcbiAgICAgKiBJZiBhIG51bWJlciBpcyBjcmVhdGVkIGJ5IHVzaW5nICduZXcgTnVtYmVyKDEwMDg2KScsIHRoZSB0eXBlb2YgaXQgd2lsbCBiZSBcIm9iamVjdFwiLi4uXHJcbiAgICAgKiBUaGVuIHlvdSBjYW4gdXNlIHRoaXMgZnVuY3Rpb24gaWYgeW91IGNhcmUgYWJvdXQgdGhpcyBjYXNlLlxyXG4gICAgICogQG1ldGhvZCBpc051bWJlclxyXG4gICAgICogQHBhcmFtIHsqfSBvYmpcclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc051bWJlcjogZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IG9iaiBpbnN0YW5jZW9mIE51bWJlcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayB0aGUgb2JqIHdoZXRoZXIgaXMgc3RyaW5nIG9yIG5vdC5cclxuICAgICAqIElmIGEgc3RyaW5nIGlzIGNyZWF0ZWQgYnkgdXNpbmcgJ25ldyBTdHJpbmcoXCJibGFibGFcIiknLCB0aGUgdHlwZW9mIGl0IHdpbGwgYmUgXCJvYmplY3RcIi4uLlxyXG4gICAgICogVGhlbiB5b3UgY2FuIHVzZSB0aGlzIGZ1bmN0aW9uIGlmIHlvdSBjYXJlIGFib3V0IHRoaXMgY2FzZS5cclxuICAgICAqIEBtZXRob2QgaXNTdHJpbmdcclxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmc7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29weSBhbGwgcHJvcGVydGllcyBub3QgZGVmaW5lZCBpbiBvYmogZnJvbSBhcmd1bWVudHNbMS4uLm5dXHJcbiAgICAgKiBAbWV0aG9kIGFkZG9uXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIG9iamVjdCB0byBleHRlbmQgaXRzIHByb3BlcnRpZXNcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5zb3VyY2VPYmogc291cmNlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgcmVzdWx0IG9ialxyXG4gICAgICovXHJcbiAgICBhZGRvbjogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuICAgICAgICBvYmogPSBvYmogfHwge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDU0MDIsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgbmFtZSBpbiBzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICEobmFtZSBpbiBvYmopICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29weXByb3AoIG5hbWUsIHNvdXJjZSwgb2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3B5IGFsbCBwcm9wZXJ0aWVzIGZyb20gYXJndW1lbnRzWzEuLi5uXSB0byBvYmpcclxuICAgICAqIEBtZXRob2QgbWl4aW5cclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5zb3VyY2VPYmpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIHJlc3VsdCBvYmpcclxuICAgICAqL1xyXG4gICAgbWl4aW46IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAndXNlIHN0cmljdCc7XHJcbiAgICAgICAgb2JqID0gb2JqIHx8IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg1NDAzLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICggdmFyIG5hbWUgaW4gc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NvcHlwcm9wKCBuYW1lLCBzb3VyY2UsIG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXJpdmUgdGhlIGNsYXNzIGZyb20gdGhlIHN1cHBsaWVkIGJhc2UgY2xhc3MuXHJcbiAgICAgKiBCb3RoIGNsYXNzZXMgYXJlIGp1c3QgbmF0aXZlIGphdmFzY3JpcHQgY29uc3RydWN0b3JzLCBub3QgY3JlYXRlZCBieSBjYy5DbGFzcywgc29cclxuICAgICAqIHVzdWFsbHkgeW91IHdpbGwgd2FudCB0byBpbmhlcml0IHVzaW5nIHt7I2Nyb3NzTGluayBcImNjL0NsYXNzOm1ldGhvZFwifX1jYy5DbGFzcyB7ey9jcm9zc0xpbmt9fSBpbnN0ZWFkLlxyXG4gICAgICogQG1ldGhvZCBleHRlbmRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNsc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYmFzZSAtIHRoZSBiYXNlY2xhc3MgdG8gaW5oZXJpdFxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHRoZSByZXN1bHQgY2xhc3NcclxuICAgICAqL1xyXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoY2xzLCBiYXNlKSB7XHJcbiAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICBpZiAoIWJhc2UpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwNCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFjbHMpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwNSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNscy5wcm90b3R5cGUpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNTQwNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBiYXNlKSBpZiAoYmFzZS5oYXNPd25Qcm9wZXJ0eShwKSkgY2xzW3BdID0gYmFzZVtwXTtcclxuICAgICAgICBjbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShiYXNlLnByb3RvdHlwZSwge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcjoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNscyxcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY2xzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzdXBlciBjbGFzc1xyXG4gICAgICogQG1ldGhvZCBnZXRTdXBlclxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY3RvciAtIHRoZSBjb25zdHJ1Y3RvciBvZiBzdWJjbGFzc1xyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIGdldFN1cGVyIChjdG9yKSB7XHJcbiAgICAgICAgdmFyIHByb3RvID0gY3Rvci5wcm90b3R5cGU7IC8vIGJpbmRlZCBmdW5jdGlvbiBkbyBub3QgaGF2ZSBwcm90b3R5cGVcclxuICAgICAgICB2YXIgZHVuZGVyUHJvdG8gPSBwcm90byAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xyXG4gICAgICAgIHJldHVybiBkdW5kZXJQcm90byAmJiBkdW5kZXJQcm90by5jb25zdHJ1Y3RvcjtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciBzdWJjbGFzcyBpcyBjaGlsZCBvZiBzdXBlcmNsYXNzIG9yIGVxdWFscyB0byBzdXBlcmNsYXNzXHJcbiAgICAgKlxyXG4gICAgICogQG1ldGhvZCBpc0NoaWxkQ2xhc3NPZlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gc3ViY2xhc3NcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHN1cGVyY2xhc3NcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzQ2hpbGRDbGFzc09mIChzdWJjbGFzcywgc3VwZXJjbGFzcykge1xyXG4gICAgICAgIGlmIChzdWJjbGFzcyAmJiBzdXBlcmNsYXNzKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViY2xhc3MgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1cGVyY2xhc3MgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChDQ19ERVYpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzYyNSwgc3VwZXJjbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN1YmNsYXNzID09PSBzdXBlcmNsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKDs7KSB7XHJcbiAgICAgICAgICAgICAgICBzdWJjbGFzcyA9IGpzLmdldFN1cGVyKHN1YmNsYXNzKTtcclxuICAgICAgICAgICAgICAgIGlmICghc3ViY2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViY2xhc3MgPT09IHN1cGVyY2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGZyb20gb2JqZWN0XHJcbiAgICAgKiBAbWV0aG9kIGNsZWFyXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gb2JqXHJcbiAgICAgKi9cclxuICAgIGNsZWFyOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkZWxldGUgb2JqW2tleXNbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciBvYmogaXMgYW4gZW1wdHkgb2JqZWN0XHJcbiAgICAgKiBAbWV0aG9kIGlzRW1wdHlPYmplY3RcclxuICAgICAqIEBwYXJhbSB7YW55fSBvYmogXHJcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNFbXB0eU9iamVjdDogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgcHJvcGVydHkgZGVzY3JpcHRvciBpbiBvYmplY3QgYW5kIGFsbCBpdHMgYW5jZXN0b3JzXHJcbiAgICAgKiBAbWV0aG9kIGdldFByb3BlcnR5RGVzY3JpcHRvclxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2V0UHJvcGVydHlEZXNjcmlwdG9yOiBfZ2V0UHJvcGVydHlEZXNjcmlwdG9yXHJcbn07XHJcblxyXG5cclxudmFyIHRtcFZhbHVlRGVzYyA9IHtcclxuICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIHdyaXRhYmxlOiBmYWxzZSxcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSB2YWx1ZSwganVzdCBoZWxwIHRvIGNhbGwgT2JqZWN0LmRlZmluZVByb3BlcnR5Ljxicj5cclxuICogVGhlIGNvbmZpZ3VyYWJsZSB3aWxsIGJlIHRydWUuXHJcbiAqIEBtZXRob2QgdmFsdWVcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxyXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcclxuICogQHBhcmFtIHtCb29sZWFufSBbd3JpdGFibGU9ZmFsc2VdXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXHJcbiAqL1xyXG5qcy52YWx1ZSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbHVlLCB3cml0YWJsZSwgZW51bWVyYWJsZSkge1xyXG4gICAgdG1wVmFsdWVEZXNjLnZhbHVlID0gdmFsdWU7XHJcbiAgICB0bXBWYWx1ZURlc2Mud3JpdGFibGUgPSB3cml0YWJsZTtcclxuICAgIHRtcFZhbHVlRGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHRtcFZhbHVlRGVzYyk7XHJcbiAgICB0bXBWYWx1ZURlc2MudmFsdWUgPSB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG52YXIgdG1wR2V0U2V0RGVzYyA9IHtcclxuICAgIGdldDogbnVsbCxcclxuICAgIHNldDogbnVsbCxcclxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBnZXQgc2V0IGFjY2Vzc29yLCBqdXN0IGhlbHAgdG8gY2FsbCBPYmplY3QuZGVmaW5lUHJvcGVydHkoLi4uKVxyXG4gKiBAbWV0aG9kIGdldHNldFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2V0dGVyPW51bGxdXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbmZpZ3VyYWJsZT1mYWxzZV1cclxuICovXHJcbmpzLmdldHNldCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIGdldHRlciwgc2V0dGVyLCBlbnVtZXJhYmxlLCBjb25maWd1cmFibGUpIHtcclxuICAgIGlmICh0eXBlb2Ygc2V0dGVyICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZW51bWVyYWJsZSA9IHNldHRlcjtcclxuICAgICAgICBzZXR0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICB0bXBHZXRTZXREZXNjLmdldCA9IGdldHRlcjtcclxuICAgIHRtcEdldFNldERlc2Muc2V0ID0gc2V0dGVyO1xyXG4gICAgdG1wR2V0U2V0RGVzYy5lbnVtZXJhYmxlID0gZW51bWVyYWJsZTtcclxuICAgIHRtcEdldFNldERlc2MuY29uZmlndXJhYmxlID0gY29uZmlndXJhYmxlO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgdG1wR2V0U2V0RGVzYyk7XHJcbiAgICB0bXBHZXRTZXREZXNjLmdldCA9IG51bGw7XHJcbiAgICB0bXBHZXRTZXREZXNjLnNldCA9IG51bGw7XHJcbn07XHJcblxyXG52YXIgdG1wR2V0RGVzYyA9IHtcclxuICAgIGdldDogbnVsbCxcclxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgY29uZmlndXJhYmxlOiBmYWxzZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlZmluZSBnZXQgYWNjZXNzb3IsIGp1c3QgaGVscCB0byBjYWxsIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSguLi4pXHJcbiAqIEBtZXRob2QgZ2V0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VudW1lcmFibGU9ZmFsc2VdXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbmZpZ3VyYWJsZT1mYWxzZV1cclxuICovXHJcbmpzLmdldCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIGdldHRlciwgZW51bWVyYWJsZSwgY29uZmlndXJhYmxlKSB7XHJcbiAgICB0bXBHZXREZXNjLmdldCA9IGdldHRlcjtcclxuICAgIHRtcEdldERlc2MuZW51bWVyYWJsZSA9IGVudW1lcmFibGU7XHJcbiAgICB0bXBHZXREZXNjLmNvbmZpZ3VyYWJsZSA9IGNvbmZpZ3VyYWJsZTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHRtcEdldERlc2MpO1xyXG4gICAgdG1wR2V0RGVzYy5nZXQgPSBudWxsO1xyXG59O1xyXG5cclxudmFyIHRtcFNldERlc2MgPSB7XHJcbiAgICBzZXQ6IG51bGwsXHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmUgc2V0IGFjY2Vzc29yLCBqdXN0IGhlbHAgdG8gY2FsbCBPYmplY3QuZGVmaW5lUHJvcGVydHkoLi4uKVxyXG4gKiBAbWV0aG9kIHNldFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNldHRlclxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtlbnVtZXJhYmxlPWZhbHNlXVxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtjb25maWd1cmFibGU9ZmFsc2VdXHJcbiAqL1xyXG5qcy5zZXQgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBzZXR0ZXIsIGVudW1lcmFibGUsIGNvbmZpZ3VyYWJsZSkge1xyXG4gICAgdG1wU2V0RGVzYy5zZXQgPSBzZXR0ZXI7XHJcbiAgICB0bXBTZXREZXNjLmVudW1lcmFibGUgPSBlbnVtZXJhYmxlO1xyXG4gICAgdG1wU2V0RGVzYy5jb25maWd1cmFibGUgPSBjb25maWd1cmFibGU7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB0bXBTZXREZXNjKTtcclxuICAgIHRtcFNldERlc2Muc2V0ID0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBvYmplY3QgaXMganVzdCBhIHt9IChhbmQgd2hpY2ggY2xhc3MgbmFtZWQgJ09iamVjdCcpLCBpdCB3aWxsIHJldHVybiBcIlwiLlxyXG4gKiAobW9kaWZpZWQgZnJvbSA8YSBocmVmPVwiaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjQ5NTMxL2hvdy10by1nZXQtYS1qYXZhc2NyaXB0LW9iamVjdHMtY2xhc3NcIj50aGUgY29kZSBmcm9tIHRoaXMgc3RhY2tvdmVyZmxvdyBwb3N0PC9hPilcclxuICogQG1ldGhvZCBnZXRDbGFzc05hbWVcclxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IG9iak9yQ3RvciAtIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmpzLmdldENsYXNzTmFtZSA9IGZ1bmN0aW9uIChvYmpPckN0b3IpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqT3JDdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdmFyIHByb3RvdHlwZSA9IG9iak9yQ3Rvci5wcm90b3R5cGU7XHJcbiAgICAgICAgaWYgKHByb3RvdHlwZSAmJiBwcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ19fY2xhc3NuYW1lX18nKSAmJiBwcm90b3R5cGUuX19jbGFzc25hbWVfXykge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvdG90eXBlLl9fY2xhc3NuYW1lX187XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXR2YWwgPSAnJztcclxuICAgICAgICAvLyAgZm9yIGJyb3dzZXJzIHdoaWNoIGhhdmUgbmFtZSBwcm9wZXJ0eSBpbiB0aGUgY29uc3RydWN0b3Igb2YgdGhlIG9iamVjdCwgc3VjaCBhcyBjaHJvbWVcclxuICAgICAgICBpZiAob2JqT3JDdG9yLm5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dmFsID0gb2JqT3JDdG9yLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmpPckN0b3IudG9TdHJpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGFyciwgc3RyID0gb2JqT3JDdG9yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmIChzdHIuY2hhckF0KDApID09PSAnWycpIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0ciBpcyBcIltvYmplY3Qgb2JqZWN0Q2xhc3NdXCJcclxuICAgICAgICAgICAgICAgIGFyciA9IHN0ci5tYXRjaCgvXFxbXFx3K1xccyooXFx3KylcXF0vKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHN0ciBpcyBmdW5jdGlvbiBvYmplY3RDbGFzcyAoKSB7fSBmb3IgSUUgRmlyZWZveFxyXG4gICAgICAgICAgICAgICAgYXJyID0gc3RyLm1hdGNoKC9mdW5jdGlvblxccyooXFx3KykvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHZhbCA9IGFyclsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dmFsICE9PSAnT2JqZWN0JyA/IHJldHZhbCA6ICcnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAob2JqT3JDdG9yICYmIG9iak9yQ3Rvci5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIHJldHVybiBqcy5nZXRDbGFzc05hbWUob2JqT3JDdG9yLmNvbnN0cnVjdG9yKTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxufTtcclxuXHJcbmZ1bmN0aW9uIGlzVGVtcENsYXNzSWQgKGlkKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCBpZC5zdGFydHNXaXRoKHRlbXBDSURHZW5lcmF0ZXIucHJlZml4KTtcclxufVxyXG5cclxuLy8gaWQg5rOo5YaMXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX2lkVG9DbGFzcyA9IHt9O1xyXG4gICAgdmFyIF9uYW1lVG9DbGFzcyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwIChrZXksIHB1YmxpY05hbWUsIHRhYmxlKSB7XHJcbiAgICAgICAganMuZ2V0c2V0KGpzLCBwdWJsaWNOYW1lLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGFibGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGpzLmNsZWFyKHRhYmxlKTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFibGUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChpZCwgY29uc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgLy8gZGVyZWdpc3RlciBvbGRcclxuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFibGVbY29uc3RydWN0b3IucHJvdG90eXBlW2tleV1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGpzLnZhbHVlKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwga2V5LCBpZCk7XHJcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIGNsYXNzXHJcbiAgICAgICAgICAgIGlmIChpZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZ2lzdGVyZWQgPSB0YWJsZVtpZF07XHJcbiAgICAgICAgICAgICAgICBpZiAocmVnaXN0ZXJlZCAmJiByZWdpc3RlcmVkICE9PSBjb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9ICdBIENsYXNzIGFscmVhZHkgZXhpc3RzIHdpdGggdGhlIHNhbWUgJyArIGtleSArICcgOiBcIicgKyBpZCArICdcIi4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19URVNUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICs9ICcgKFRoaXMgbWF5IGJlIGNhdXNlZCBieSBlcnJvciBvZiB1bml0IHRlc3QuKSBcXFxyXG5JZiB5b3UgZG9udCBuZWVkIHNlcmlhbGl6YXRpb24sIHlvdSBjYW4gc2V0IGNsYXNzIGlkIHRvIFwiXCIuIFlvdSBjYW4gYWxzbyBjYWxsIFxcXHJcbmNjLmpzLnVucmVnaXN0ZXJDbGFzcyB0byByZW1vdmUgdGhlIGlkIG9mIHVudXNlZCBjbGFzcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW2lkXSA9IGNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9pZiAoaWQgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUudHJhY2UoXCJcIiwgdGFibGUgPT09IF9uYW1lVG9DbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciB0aGUgY2xhc3MgYnkgc3BlY2lmaWVkIGlkLCBpZiBpdHMgY2xhc3NuYW1lIGlzIG5vdCBkZWZpbmVkLCB0aGUgY2xhc3MgbmFtZSB3aWxsIGFsc28gYmUgc2V0LlxyXG4gICAgICogQG1ldGhvZCBfc2V0Q2xhc3NJZFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzSWRcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWxsIGNsYXNzZXMgcmVnaXN0ZXJlZCBpbiB0aGUgZW5naW5lLCBpbmRleGVkIGJ5IElELlxyXG4gICAgICogISN6aCDlvJXmk47kuK3lt7Lms6jlhoznmoTmiYDmnInnsbvlnovvvIzpgJrov4cgSUQg6L+b6KGM57Si5byV44CCXHJcbiAgICAgKiBAcHJvcGVydHkgX3JlZ2lzdGVyZWRDbGFzc0lkc1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHNhdmUgYWxsIHJlZ2lzdGVyZWQgY2xhc3NlcyBiZWZvcmUgbG9hZGluZyBzY3JpcHRzXHJcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzSWRzID0gY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcztcclxuICAgICAqIGxldCBidWlsdGluQ2xhc3NOYW1lcyA9IGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcztcclxuICAgICAqIC8vIGxvYWQgc29tZSBzY3JpcHRzIHRoYXQgY29udGFpbiBDQ0NsYXNzXHJcbiAgICAgKiAuLi5cclxuICAgICAqIC8vIGNsZWFyIGFsbCBsb2FkZWQgY2xhc3Nlc1xyXG4gICAgICogY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcyA9IGJ1aWx0aW5DbGFzc0lkcztcclxuICAgICAqIGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcyA9IGJ1aWx0aW5DbGFzc05hbWVzO1xyXG4gICAgICovXHJcbiAgICBqcy5fc2V0Q2xhc3NJZCA9IHNldHVwKCdfX2NpZF9fJywgJ19yZWdpc3RlcmVkQ2xhc3NJZHMnLCBfaWRUb0NsYXNzKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICEjZW4gQWxsIGNsYXNzZXMgcmVnaXN0ZXJlZCBpbiB0aGUgZW5naW5lLCBpbmRleGVkIGJ5IG5hbWUuXHJcbiAgICAgKiAhI3poIOW8leaTjuS4reW3suazqOWGjOeahOaJgOacieexu+Wei++8jOmAmui/h+WQjeensOi/m+ihjOe0ouW8leOAglxyXG4gICAgICogQHByb3BlcnR5IF9yZWdpc3RlcmVkQ2xhc3NOYW1lc1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIC8vIHNhdmUgYWxsIHJlZ2lzdGVyZWQgY2xhc3NlcyBiZWZvcmUgbG9hZGluZyBzY3JpcHRzXHJcbiAgICAgKiBsZXQgYnVpbHRpbkNsYXNzSWRzID0gY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcztcclxuICAgICAqIGxldCBidWlsdGluQ2xhc3NOYW1lcyA9IGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcztcclxuICAgICAqIC8vIGxvYWQgc29tZSBzY3JpcHRzIHRoYXQgY29udGFpbiBDQ0NsYXNzXHJcbiAgICAgKiAuLi5cclxuICAgICAqIC8vIGNsZWFyIGFsbCBsb2FkZWQgY2xhc3Nlc1xyXG4gICAgICogY2MuanMuX3JlZ2lzdGVyZWRDbGFzc0lkcyA9IGJ1aWx0aW5DbGFzc0lkcztcclxuICAgICAqIGNjLmpzLl9yZWdpc3RlcmVkQ2xhc3NOYW1lcyA9IGJ1aWx0aW5DbGFzc05hbWVzO1xyXG4gICAgICovXHJcbiAgICB2YXIgZG9TZXRDbGFzc05hbWUgPSBzZXR1cCgnX19jbGFzc25hbWVfXycsICdfcmVnaXN0ZXJlZENsYXNzTmFtZXMnLCBfbmFtZVRvQ2xhc3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgdGhlIGNsYXNzIGJ5IHNwZWNpZmllZCBuYW1lIG1hbnVhbGx5XHJcbiAgICAgKiBAbWV0aG9kIHNldENsYXNzTmFtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAganMuc2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gKGNsYXNzTmFtZSwgY29uc3RydWN0b3IpIHtcclxuICAgICAgICBkb1NldENsYXNzTmFtZShjbGFzc05hbWUsIGNvbnN0cnVjdG9yKTtcclxuICAgICAgICAvLyBhdXRvIHNldCBjbGFzcyBpZFxyXG4gICAgICAgIGlmICghY29uc3RydWN0b3IucHJvdG90eXBlLmhhc093blByb3BlcnR5KCdfX2NpZF9fJykpIHtcclxuICAgICAgICAgICAgdmFyIGlkID0gY2xhc3NOYW1lIHx8IHRlbXBDSURHZW5lcmF0ZXIuZ2V0TmV3SWQoKTtcclxuICAgICAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBqcy5fc2V0Q2xhc3NJZChpZCwgY29uc3RydWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVucmVnaXN0ZXIgYSBjbGFzcyBmcm9tIGZpcmViYWxsLlxyXG4gICAgICpcclxuICAgICAqIElmIHlvdSBkb250IG5lZWQgYSByZWdpc3RlcmVkIGNsYXNzIGFueW1vcmUsIHlvdSBzaG91bGQgdW5yZWdpc3RlciB0aGUgY2xhc3Mgc28gdGhhdCBGaXJlYmFsbCB3aWxsIG5vdCBrZWVwIGl0cyByZWZlcmVuY2UgYW55bW9yZS5cclxuICAgICAqIFBsZWFzZSBub3RlIHRoYXQgaXRzIHN0aWxsIHlvdXIgcmVzcG9uc2liaWxpdHkgdG8gZnJlZSBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjbGFzcy5cclxuICAgICAqXHJcbiAgICAgKiBAbWV0aG9kIHVucmVnaXN0ZXJDbGFzc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gLi4uY29uc3RydWN0b3IgLSB0aGUgY2xhc3MgeW91IHdpbGwgd2FudCB0byB1bnJlZ2lzdGVyLCBhbnkgbnVtYmVyIG9mIGNsYXNzZXMgY2FuIGJlIGFkZGVkXHJcbiAgICAgKi9cclxuICAgIGpzLnVucmVnaXN0ZXJDbGFzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcCA9IGFyZ3VtZW50c1tpXS5wcm90b3R5cGU7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc0lkID0gcC5fX2NpZF9fO1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NJZCkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIF9pZFRvQ2xhc3NbY2xhc3NJZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNsYXNzbmFtZSA9IHAuX19jbGFzc25hbWVfXztcclxuICAgICAgICAgICAgaWYgKGNsYXNzbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIF9uYW1lVG9DbGFzc1tjbGFzc25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgcmVnaXN0ZXJlZCBjbGFzcyBieSBpZFxyXG4gICAgICogQG1ldGhvZCBfZ2V0Q2xhc3NCeUlkXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NJZFxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBqcy5fZ2V0Q2xhc3NCeUlkID0gZnVuY3Rpb24gKGNsYXNzSWQpIHtcclxuICAgICAgICByZXR1cm4gX2lkVG9DbGFzc1tjbGFzc0lkXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHJlZ2lzdGVyZWQgY2xhc3MgYnkgbmFtZVxyXG4gICAgICogQG1ldGhvZCBnZXRDbGFzc0J5TmFtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzbmFtZVxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGpzLmdldENsYXNzQnlOYW1lID0gZnVuY3Rpb24gKGNsYXNzbmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfbmFtZVRvQ2xhc3NbY2xhc3NuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgY2xhc3MgaWQgb2YgdGhlIG9iamVjdFxyXG4gICAgICogQG1ldGhvZCBfZ2V0Q2xhc3NJZFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IG9iaiAtIGluc3RhbmNlIG9yIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthbGxvd1RlbXBJZD10cnVlXSAtIGNhbiByZXR1cm4gdGVtcCBpZCBpbiBlZGl0b3JcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIGpzLl9nZXRDbGFzc0lkID0gZnVuY3Rpb24gKG9iaiwgYWxsb3dUZW1wSWQpIHtcclxuICAgICAgICBhbGxvd1RlbXBJZCA9ICh0eXBlb2YgYWxsb3dUZW1wSWQgIT09ICd1bmRlZmluZWQnID8gYWxsb3dUZW1wSWQ6IHRydWUpO1xyXG5cclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nICYmIG9iai5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoJ19fY2lkX18nKSkge1xyXG4gICAgICAgICAgICByZXMgPSBvYmoucHJvdG90eXBlLl9fY2lkX187XHJcbiAgICAgICAgICAgIGlmICghYWxsb3dUZW1wSWQgJiYgKENDX0RFViB8fCBDQ19FRElUT1IpICYmIGlzVGVtcENsYXNzSWQocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmogJiYgb2JqLmNvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBvYmouY29uc3RydWN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgICAgICBpZiAocHJvdG90eXBlICYmIHByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnX19jaWRfXycpKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgPSBvYmouX19jaWRfXztcclxuICAgICAgICAgICAgICAgIGlmICghYWxsb3dUZW1wSWQgJiYgKENDX0RFViB8fCBDQ19FRElUT1IpICYmIGlzVGVtcENsYXNzSWQocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGEgcG9seWZpbGwgZmllbGQgZm9yIGRlcHJlY2F0ZWQgY29kZXMuXHJcbiAqIEBtZXRob2Qgb2Jzb2xldGVcclxuICogQHBhcmFtIHthbnl9IG9iaiAtIFlvdXJPYmplY3Qgb3IgWW91ckNsYXNzLnByb3RvdHlwZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gb2Jzb2xldGVkIC0gXCJPbGRQYXJhbVwiIG9yIFwiWW91ckNsYXNzLk9sZFBhcmFtXCJcclxuICogQHBhcmFtIHtTdHJpbmd9IG5ld0V4cHIgLSBcIk5ld1BhcmFtXCIgb3IgXCJZb3VyQ2xhc3MuTmV3UGFyYW1cIlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3cml0YWJsZT1mYWxzZV1cclxuICovXHJcbmpzLm9ic29sZXRlID0gZnVuY3Rpb24gKG9iaiwgb2Jzb2xldGVkLCBuZXdFeHByLCB3cml0YWJsZSkge1xyXG4gICAgdmFyIGV4dHJhY3RQcm9wTmFtZSA9IC8oW14uXSspJC87XHJcbiAgICB2YXIgb2xkUHJvcCA9IGV4dHJhY3RQcm9wTmFtZS5leGVjKG9ic29sZXRlZClbMF07XHJcbiAgICB2YXIgbmV3UHJvcCA9IGV4dHJhY3RQcm9wTmFtZS5leGVjKG5ld0V4cHIpWzBdO1xyXG4gICAgZnVuY3Rpb24gZ2V0ICgpIHtcclxuICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNDAwLCBvYnNvbGV0ZWQsIG5ld0V4cHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpc1tuZXdQcm9wXTtcclxuICAgIH1cclxuICAgIGlmICh3cml0YWJsZSkge1xyXG4gICAgICAgIGpzLmdldHNldChvYmosIG9sZFByb3AsXHJcbiAgICAgICAgICAgIGdldCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDE0MDAsIG9ic29sZXRlZCwgbmV3RXhwcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW25ld1Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAganMuZ2V0KG9iaiwgb2xkUHJvcCwgZ2V0KTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWZpbmVzIGFsbCBwb2x5ZmlsbCBmaWVsZHMgZm9yIG9ic29sZXRlZCBjb2RlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgcHJvcHMuXHJcbiAqIEBtZXRob2Qgb2Jzb2xldGVzXHJcbiAqIEBwYXJhbSB7YW55fSBvYmogLSBZb3VyT2JqZWN0IG9yIFlvdXJDbGFzcy5wcm90b3R5cGVcclxuICogQHBhcmFtIHthbnl9IG9iak5hbWUgLSBcIllvdXJPYmplY3RcIiBvciBcIllvdXJDbGFzc1wiXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wc1xyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFt3cml0YWJsZT1mYWxzZV1cclxuICovXHJcbmpzLm9ic29sZXRlcyA9IGZ1bmN0aW9uIChvYmosIG9iak5hbWUsIHByb3BzLCB3cml0YWJsZSkge1xyXG4gICAgZm9yICh2YXIgb2Jzb2xldGVkIGluIHByb3BzKSB7XHJcbiAgICAgICAgdmFyIG5ld05hbWUgPSBwcm9wc1tvYnNvbGV0ZWRdO1xyXG4gICAgICAgIGpzLm9ic29sZXRlKG9iaiwgb2JqTmFtZSArICcuJyArIG9ic29sZXRlZCwgbmV3TmFtZSwgd3JpdGFibGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIFJFR0VYUF9OVU1fT1JfU1RSID0gLyglZCl8KCVzKS87XHJcbnZhciBSRUdFWFBfU1RSID0gLyVzLztcclxuXHJcbi8qKlxyXG4gKiBBIHN0cmluZyB0b29sIHRvIGNvbnN0cnVjdCBhIHN0cmluZyB3aXRoIGZvcm1hdCBzdHJpbmcuXHJcbiAqIEBtZXRob2QgZm9ybWF0U3RyXHJcbiAqIEBwYXJhbSB7U3RyaW5nfGFueX0gbXNnIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncyAoJXMpLlxyXG4gKiBAcGFyYW0ge2FueX0gLi4uc3Vic3QgLSBKYXZhU2NyaXB0IG9iamVjdHMgd2l0aCB3aGljaCB0byByZXBsYWNlIHN1YnN0aXR1dGlvbiBzdHJpbmdzIHdpdGhpbiBtc2cuIFRoaXMgZ2l2ZXMgeW91IGFkZGl0aW9uYWwgY29udHJvbCBvdmVyIHRoZSBmb3JtYXQgb2YgdGhlIG91dHB1dC5cclxuICogQHJldHVybnMge1N0cmluZ31cclxuICogQGV4YW1wbGVcclxuICogY2MuanMuZm9ybWF0U3RyKFwiYTogJXMsIGI6ICVzXCIsIGEsIGIpO1xyXG4gKiBjYy5qcy5mb3JtYXRTdHIoYSwgYiwgYyk7XHJcbiAqL1xyXG5qcy5mb3JtYXRTdHIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgYXJnTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgIGlmIChhcmdMZW4gPT09IDApIHtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICB2YXIgbXNnID0gYXJndW1lbnRzWzBdO1xyXG4gICAgaWYgKGFyZ0xlbiA9PT0gMSkge1xyXG4gICAgICAgIHJldHVybiAnJyArIG1zZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgaGFzU3Vic3RpdHV0aW9uID0gdHlwZW9mIG1zZyA9PT0gJ3N0cmluZycgJiYgUkVHRVhQX05VTV9PUl9TVFIudGVzdChtc2cpO1xyXG4gICAgaWYgKGhhc1N1YnN0aXR1dGlvbikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJnTGVuOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgdmFyIHJlZ0V4cFRvVGVzdCA9IHR5cGVvZiBhcmcgPT09ICdudW1iZXInID8gUkVHRVhQX05VTV9PUl9TVFIgOiBSRUdFWFBfU1RSO1xyXG4gICAgICAgICAgICBpZiAocmVnRXhwVG9UZXN0LnRlc3QobXNnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm90UmVwbGFjZUZ1bmN0aW9uID0gJycgKyBhcmc7XHJcbiAgICAgICAgICAgICAgICBtc2cgPSBtc2cucmVwbGFjZShyZWdFeHBUb1Rlc3QsIG5vdFJlcGxhY2VGdW5jdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbXNnICs9ICcgJyArIGFyZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ0xlbjsgKytpKSB7XHJcbiAgICAgICAgICAgIG1zZyArPSAnICcgKyBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1zZztcclxufTtcclxuXHJcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL2lzc3Vlcy8xMzg5XHJcbmpzLnNoaWZ0QXJndW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xyXG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyZ3M7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBBIHNpbXBsZSB3cmFwcGVyIG9mIGBPYmplY3QuY3JlYXRlKG51bGwpYCB3aGljaCBlbnN1cmVzIHRoZSByZXR1cm4gb2JqZWN0IGhhdmUgbm8gcHJvdG90eXBlIChhbmQgdGh1cyBubyBpbmhlcml0ZWQgbWVtYmVycykuIFNvIHdlIGNhbiBza2lwIGBoYXNPd25Qcm9wZXJ0eWAgY2FsbHMgb24gcHJvcGVydHkgbG9va3Vwcy4gSXQgaXMgYSB3b3J0aHdoaWxlIG9wdGltaXphdGlvbiB0aGFuIHRoZSBge31gIGxpdGVyYWwgd2hlbiBgaGFzT3duUHJvcGVydHlgIGNhbGxzIGFyZSBuZWNlc3NhcnkuXHJcbiAqICEjemhcclxuICog6K+l5pa55rOV5piv5a+5IGBPYmplY3QuY3JlYXRlKG51bGwpYCDnmoTnroDljZXlsIHoo4XjgIJgT2JqZWN0LmNyZWF0ZShudWxsKWAg55So5LqO5Yib5bu65pegIHByb3RvdHlwZSDvvIjkuZ/lsLHml6Dnu6fmib/vvInnmoTnqbrlr7nosaHjgILov5nmoLfmiJHku6zlnKjor6Xlr7nosaHkuIrmn6Xmib7lsZ7mgKfml7bvvIzlsLHkuI3nlKjov5vooYwgYGhhc093blByb3BlcnR5YCDliKTmlq3jgILlnKjpnIDopoHpopHnuYHliKTmlq0gYGhhc093blByb3BlcnR5YCDml7bvvIzkvb/nlKjov5nkuKrmlrnms5XmgKfog73kvJrmr5QgYHt9YCDmm7Tpq5jjgIJcclxuICpcclxuICogQG1ldGhvZCBjcmVhdGVNYXBcclxuICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VEaWN0TW9kZT1mYWxzZV0gLSBBcHBseSB0aGUgZGVsZXRlIG9wZXJhdG9yIHRvIG5ld2x5IGNyZWF0ZWQgbWFwIG9iamVjdC4gVGhpcyBjYXVzZXMgVjggdG8gcHV0IHRoZSBvYmplY3QgaW4gXCJkaWN0aW9uYXJ5IG1vZGVcIiBhbmQgZGlzYWJsZXMgY3JlYXRpb24gb2YgaGlkZGVuIGNsYXNzZXMgd2hpY2ggYXJlIHZlcnkgZXhwZW5zaXZlIGZvciBvYmplY3RzIHRoYXQgYXJlIGNvbnN0YW50bHkgY2hhbmdpbmcgc2hhcGUuXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmpzLmNyZWF0ZU1hcCA9IGZ1bmN0aW9uIChmb3JjZURpY3RNb2RlKSB7XHJcbiAgICB2YXIgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIGlmIChmb3JjZURpY3RNb2RlKSB7XHJcbiAgICAgICAgY29uc3QgSU5WQUxJRF9JREVOVElGSUVSXzEgPSAnLic7XHJcbiAgICAgICAgY29uc3QgSU5WQUxJRF9JREVOVElGSUVSXzIgPSAnLyc7XHJcbiAgICAgICAgbWFwW0lOVkFMSURfSURFTlRJRklFUl8xXSA9IHRydWU7XHJcbiAgICAgICAgbWFwW0lOVkFMSURfSURFTlRJRklFUl8yXSA9IHRydWU7XHJcbiAgICAgICAgZGVsZXRlIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMV07XHJcbiAgICAgICAgZGVsZXRlIG1hcFtJTlZBTElEX0lERU5USUZJRVJfMl07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhcnJheVxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIGFycmF5IGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cclxuICogQG1ldGhvZCByZW1vdmVBdFxyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUF0IChhcnJheSwgaW5kZXgpIHtcclxuICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBhcnJheSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXHJcbiAqIEl0J3MgZmFzdGVyIGJ1dCB0aGUgb3JkZXIgb2YgdGhlIGFycmF5IHdpbGwgYmUgY2hhbmdlZC5cclxuICogQG1ldGhvZCBmYXN0UmVtb3ZlQXRcclxuICogQHBhcmFtIHthbnlbXX0gYXJyYXlcclxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XHJcbiAqL1xyXG5mdW5jdGlvbiBmYXN0UmVtb3ZlQXQgKGFycmF5LCBpbmRleCkge1xyXG4gICAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcclxuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gbGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgYXJyYXlbaW5kZXhdID0gYXJyYXlbbGVuZ3RoIC0gMV07XHJcbiAgICBhcnJheS5sZW5ndGggPSBsZW5ndGggLSAxO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhIHNwZWNpZmljIG9iamVjdCBmcm9tIHRoZSBhcnJheS5cclxuICogQG1ldGhvZCByZW1vdmVcclxuICogQHBhcmFtIHthbnlbXX0gYXJyYXlcclxuICogQHBhcmFtIHthbnl9IHZhbHVlXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmUgKGFycmF5LCB2YWx1ZSkge1xyXG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIHJlbW92ZUF0KGFycmF5LCBpbmRleCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGEgc3BlY2lmaWMgb2JqZWN0IGZyb20gdGhlIGFycmF5LlxyXG4gKiBJdCdzIGZhc3RlciBidXQgdGhlIG9yZGVyIG9mIHRoZSBhcnJheSB3aWxsIGJlIGNoYW5nZWQuXHJcbiAqIEBtZXRob2QgZmFzdFJlbW92ZVxyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxyXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcclxuICovXHJcbmZ1bmN0aW9uIGZhc3RSZW1vdmUgKGFycmF5LCB2YWx1ZSkge1xyXG4gICAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgIGFycmF5W2luZGV4XSA9IGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIC0tYXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVmVyaWZ5IGFycmF5J3MgVHlwZVxyXG4gKiBAbWV0aG9kIHZlcmlmeVR5cGVcclxuICogQHBhcmFtIHthcnJheX0gYXJyYXlcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gdmVyaWZ5VHlwZSAoYXJyYXksIHR5cGUpIHtcclxuICAgIGlmIChhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIShhcnJheVtpXSBpbnN0YW5jZW9mICB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nSUQoMTMwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZnJvbSBhcnJheSBhbGwgdmFsdWVzIGluIG1pbnVzQXJyLiBGb3IgZWFjaCBWYWx1ZSBpbiBtaW51c0FyciwgdGhlIGZpcnN0IG1hdGNoaW5nIGluc3RhbmNlIGluIGFycmF5IHdpbGwgYmUgcmVtb3ZlZC5cclxuICogQG1ldGhvZCByZW1vdmVBcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBTb3VyY2UgQXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gbWludXNBcnIgbWludXMgQXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUFycmF5IChhcnJheSwgbWludXNBcnIpIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbWludXNBcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgcmVtb3ZlKGFycmF5LCBtaW51c0FycltpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnNlcnRzIHNvbWUgb2JqZWN0cyBhdCBpbmRleFxyXG4gKiBAbWV0aG9kIGFwcGVuZE9iamVjdHNBdFxyXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSBhZGRPYmpzXHJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbmZ1bmN0aW9uIGFwcGVuZE9iamVjdHNBdCAoYXJyYXksIGFkZE9ianMsIGluZGV4KSB7XHJcbiAgICBhcnJheS5zcGxpY2UuYXBwbHkoYXJyYXksIFtpbmRleCwgMF0uY29uY2F0KGFkZE9ianMpKTtcclxuICAgIHJldHVybiBhcnJheTtcclxufVxyXG5cclxuLyoqXHJcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgYXJyYXkgY29udGFpbnMgYSBzcGVjaWZpYyB2YWx1ZS5cclxuICogQG1ldGhvZCBjb250YWluc1xyXG4gKiBAcGFyYW0ge2FueVtdfSBhcnJheVxyXG4gKiBAcGFyYW0ge2FueX0gdmFsdWVcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbnRhaW5zIChhcnJheSwgdmFsdWUpIHtcclxuICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKSA+PSAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSBhbiBhcnJheSdzIGl0ZW0gdG8gYSBuZXcgYXJyYXkgKGl0cyBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiBBcnJheS5zbGljZSlcclxuICogQG1ldGhvZCBjb3B5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKi9cclxuZnVuY3Rpb24gY29weSAoYXJyYXkpIHtcclxuICAgIHZhciBpLCBsZW4gPSBhcnJheS5sZW5ndGgsIGFycl9jbG9uZSA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAxKVxyXG4gICAgICAgIGFycl9jbG9uZVtpXSA9IGFycmF5W2ldO1xyXG4gICAgcmV0dXJuIGFycl9jbG9uZTtcclxufVxyXG5cclxuanMuYXJyYXkgPSB7XHJcbiAgICByZW1vdmUsXHJcbiAgICBmYXN0UmVtb3ZlLFxyXG4gICAgcmVtb3ZlQXQsXHJcbiAgICBmYXN0UmVtb3ZlQXQsXHJcbiAgICBjb250YWlucyxcclxuICAgIHZlcmlmeVR5cGUsXHJcbiAgICByZW1vdmVBcnJheSxcclxuICAgIGFwcGVuZE9iamVjdHNBdCxcclxuICAgIGNvcHksXHJcbiAgICBNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yOiByZXF1aXJlKCcuLi91dGlscy9tdXRhYmxlLWZvcndhcmQtaXRlcmF0b3InKVxyXG59O1xyXG5cclxuLy8gT0JKRUNUIFBPT0xcclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEEgZml4ZWQtbGVuZ3RoIG9iamVjdCBwb29sIGRlc2lnbmVkIGZvciBnZW5lcmFsIHR5cGUuPGJyPlxyXG4gKiBUaGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBvYmplY3QgcG9vbCBpcyB2ZXJ5IHNpbXBsZSxcclxuICogaXQgY2FuIGhlbHBzIHlvdSB0byBpbXByb3ZlIHlvdXIgZ2FtZSBwZXJmb3JtYW5jZSBmb3Igb2JqZWN0cyB3aGljaCBuZWVkIGZyZXF1ZW50IHJlbGVhc2UgYW5kIHJlY3JlYXRlIG9wZXJhdGlvbnM8YnIvPlxyXG4gKiAhI3poXHJcbiAqIOmVv+W6puWbuuWumueahOWvueixoee8k+WtmOaxoO+8jOWPr+S7peeUqOadpee8k+WtmOWQhOenjeWvueixoeexu+Wei+OAgjxici8+XHJcbiAqIOi/meS4quWvueixoeaxoOeahOWunueOsOmdnuW4uOeyvueugO+8jOWug+WPr+S7peW4ruWKqeaCqOaPkOmrmOa4uOaIj+aAp+iDve+8jOmAgueUqOS6juS8mOWMluWvueixoeeahOWPjeWkjeWIm+W7uuWSjOmUgOavgeOAglxyXG4gKiBAY2xhc3MgUG9vbFxyXG4gKiBAZXhhbXBsZVxyXG4gKlxyXG4gKkV4YW1wbGUgMTpcclxuICpcclxuICpmdW5jdGlvbiBEZXRhaWxzICgpIHtcclxuICogICAgdGhpcy51dWlkTGlzdCA9IFtdO1xyXG4gKn07XHJcbiAqRGV0YWlscy5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAqICAgIHRoaXMudXVpZExpc3QubGVuZ3RoID0gMDtcclxuICp9O1xyXG4gKkRldGFpbHMucG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChvYmopIHtcclxuICogICAgb2JqLnJlc2V0KCk7XHJcbiAqfSwgNSk7XHJcbiAqRGV0YWlscy5wb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICogICAgcmV0dXJuIHRoaXMuX2dldCgpIHx8IG5ldyBEZXRhaWxzKCk7XHJcbiAqfTtcclxuICpcclxuICp2YXIgZGV0YWlsID0gRGV0YWlscy5wb29sLmdldCgpO1xyXG4gKi4uLlxyXG4gKkRldGFpbHMucG9vbC5wdXQoZGV0YWlsKTtcclxuICpcclxuICpFeGFtcGxlIDI6XHJcbiAqXHJcbiAqZnVuY3Rpb24gRGV0YWlscyAoYnVmZmVyKSB7XHJcbiAqICAgIHRoaXMudXVpZExpc3QgPSBidWZmZXI7XHJcbiAqfTtcclxuICouLi5cclxuICpEZXRhaWxzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xyXG4gKiAgICB2YXIgY2FjaGVkID0gdGhpcy5fZ2V0KCk7XHJcbiAqICAgIGlmIChjYWNoZWQpIHtcclxuICogICAgICAgIGNhY2hlZC51dWlkTGlzdCA9IGJ1ZmZlcjtcclxuICogICAgICAgIHJldHVybiBjYWNoZWQ7XHJcbiAqICAgIH1cclxuICogICAgZWxzZSB7XHJcbiAqICAgICAgICByZXR1cm4gbmV3IERldGFpbHMoYnVmZmVyKTtcclxuICogICAgfVxyXG4gKn07XHJcbiAqXHJcbiAqdmFyIGRldGFpbCA9IERldGFpbHMucG9vbC5nZXQoIFtdICk7XHJcbiAqLi4uXHJcbiAqL1xyXG4vKipcclxuICogISNlblxyXG4gKiBDb25zdHJ1Y3RvciBmb3IgY3JlYXRpbmcgYW4gb2JqZWN0IHBvb2wgZm9yIHRoZSBzcGVjaWZpYyBvYmplY3QgdHlwZS5cclxuICogWW91IGNhbiBwYXNzIGEgY2FsbGJhY2sgYXJndW1lbnQgZm9yIHByb2Nlc3MgdGhlIGNsZWFudXAgbG9naWMgd2hlbiB0aGUgb2JqZWN0IGlzIHJlY3ljbGVkLlxyXG4gKiAhI3poXHJcbiAqIOS9v+eUqOaehOmAoOWHveaVsOadpeWIm+W7uuS4gOS4quaMh+WumuWvueixoeexu+Wei+eahOWvueixoeaxoO+8jOaCqOWPr+S7peS8oOmAkuS4gOS4quWbnuiwg+WHveaVsO+8jOeUqOS6juWkhOeQhuWvueixoeWbnuaUtuaXtueahOa4heeQhumAu+i+keOAglxyXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjbGVhbnVwRnVuY10gLSB0aGUgY2FsbGJhY2sgbWV0aG9kIHVzZWQgdG8gcHJvY2VzcyB0aGUgY2xlYW51cCBsb2dpYyB3aGVuIHRoZSBvYmplY3QgaXMgcmVjeWNsZWQuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGVhbnVwRnVuYy5vYmpcclxuICogQHBhcmFtIHtOdW1iZXJ9IHNpemUgLSBpbml0aWFsaXplcyB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxyXG4gKiBAdHlwZXNjcmlwdFxyXG4gKiBjb25zdHJ1Y3RvcihjbGVhbnVwRnVuYzogKG9iajogYW55KSA9PiB2b2lkLCBzaXplOiBudW1iZXIpXHJcbiAqIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcilcclxuICovXHJcbmZ1bmN0aW9uIFBvb2wgKGNsZWFudXBGdW5jLCBzaXplKSB7XHJcbiAgICBpZiAoc2l6ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc2l6ZSA9IGNsZWFudXBGdW5jO1xyXG4gICAgICAgIGNsZWFudXBGdW5jID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0ID0gbnVsbDtcclxuICAgIHRoaXMuY291bnQgPSAwO1xyXG4gICAgdGhpcy5fcG9vbCA9IG5ldyBBcnJheShzaXplKTtcclxuICAgIHRoaXMuX2NsZWFudXAgPSBjbGVhbnVwRnVuYztcclxufVxyXG5cclxuLyoqXHJcbiAqICEjZW5cclxuICogR2V0IGFuZCBpbml0aWFsaXplIGFuIG9iamVjdCBmcm9tIHBvb2wuIFRoaXMgbWV0aG9kIGRlZmF1bHRzIHRvIG51bGwgYW5kIHJlcXVpcmVzIHRoZSB1c2VyIHRvIGltcGxlbWVudCBpdC5cclxuICogISN6aFxyXG4gKiDojrflj5blubbliJ3lp4vljJblr7nosaHmsaDkuK3nmoTlr7nosaHjgILov5nkuKrmlrnms5Xpu5jorqTkuLrnqbrvvIzpnIDopoHnlKjmiLfoh6rlt7Hlrp7njrDjgIJcclxuICogQG1ldGhvZCBnZXRcclxuICogQHBhcmFtIHthbnl9IC4uLnBhcmFtcyAtIHBhcmFtZXRlcnMgdG8gdXNlZCB0byBpbml0aWFsaXplIHRoZSBvYmplY3RcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcblxyXG4vKipcclxuICogISNlblxyXG4gKiBUaGUgY3VycmVudCBudW1iZXIgb2YgYXZhaWxhYmxlIG9iamVjdHMsIHRoZSBkZWZhdWx0IGlzIDAsIGl0IHdpbGwgZ3JhZHVhbGx5IGluY3JlYXNlIHdpdGggdGhlIHJlY3ljbGUgb2YgdGhlIG9iamVjdCxcclxuICogdGhlIG1heGltdW0gd2lsbCBub3QgZXhjZWVkIHRoZSBzaXplIHNwZWNpZmllZCB3aGVuIHRoZSBjb25zdHJ1Y3RvciBpcyBjYWxsZWQuXHJcbiAqICEjemhcclxuICog5b2T5YmN5Y+v55So5a+56LGh5pWw6YeP77yM5LiA5byA5aeL6buY6K6k5pivIDDvvIzpmo/nnYDlr7nosaHnmoTlm57mlLbkvJrpgJDmuJDlop7lpKfvvIzmnIDlpKfkuI3kvJrotoXov4fosIPnlKjmnoTpgKDlh73mlbDml7bmjIflrprnmoQgc2l6ZeOAglxyXG4gKiBAcHJvcGVydHkge051bWJlcn0gY291bnRcclxuICogQGRlZmF1bHQgMFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiAhI2VuXHJcbiAqIEdldCBhbiBvYmplY3QgZnJvbSBwb29sLCBpZiBubyBhdmFpbGFibGUgb2JqZWN0IGluIHRoZSBwb29sLCBudWxsIHdpbGwgYmUgcmV0dXJuZWQuXHJcbiAqICEjemhcclxuICog6I635Y+W5a+56LGh5rGg5Lit55qE5a+56LGh77yM5aaC5p6c5a+56LGh5rGg5rKh5pyJ5Y+v55So5a+56LGh77yM5YiZ6L+U5Zue56m644CCXHJcbiAqIEBtZXRob2QgX2dldFxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fG51bGx9XHJcbiAqL1xyXG5Qb29sLnByb3RvdHlwZS5fZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuY291bnQgPiAwKSB7XHJcbiAgICAgICAgLS10aGlzLmNvdW50O1xyXG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuX3Bvb2xbdGhpcy5jb3VudF07XHJcbiAgICAgICAgdGhpcy5fcG9vbFt0aGlzLmNvdW50XSA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogISNlbiBQdXQgYW4gb2JqZWN0IGludG8gdGhlIHBvb2wuXHJcbiAqICEjemgg5ZCR5a+56LGh5rGg6L+U6L+Y5LiA5Liq5LiN5YaN6ZyA6KaB55qE5a+56LGh44CCXHJcbiAqIEBtZXRob2QgcHV0XHJcbiAqL1xyXG5Qb29sLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgcG9vbCA9IHRoaXMuX3Bvb2w7XHJcbiAgICBpZiAodGhpcy5jb3VudCA8IHBvb2wubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NsZWFudXAgJiYgdGhpcy5fY2xlYW51cChvYmopID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvb2xbdGhpcy5jb3VudF0gPSBvYmo7XHJcbiAgICAgICAgKyt0aGlzLmNvdW50O1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqICEjZW4gUmVzaXplIHRoZSBwb29sLlxyXG4gKiAhI3poIOiuvue9ruWvueixoeaxoOWuuemHj+OAglxyXG4gKiBAbWV0aG9kIHJlc2l6ZVxyXG4gKi9cclxuUG9vbC5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gKGxlbmd0aCkge1xyXG4gICAgaWYgKGxlbmd0aCA+PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fcG9vbC5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuY291bnQgPiBsZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3VudCA9IGxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5qcy5Qb29sID0gUG9vbDtcclxuXHJcbi8vXHJcblxyXG5jYy5qcyA9IGpzO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBqcztcclxuXHJcbi8vIGZpeCBzdWJtb2R1bGUgcG9sbHV0ZSAuLi5cclxuLyoqXHJcbiAqIEBzdWJtb2R1bGUgY2NcclxuICovXHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9