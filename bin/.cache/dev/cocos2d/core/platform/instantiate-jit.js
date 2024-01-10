
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/instantiate-jit.js';
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
// Some helper methods for compile instantiation code
var CCObject = require('./CCObject');

var Destroyed = CCObject.Flags.Destroyed;
var PersistentMask = CCObject.Flags.PersistentMask;

var Attr = require('./attribute');

var js = require('./js');

var CCClass = require('./CCClass');

var Compiler = require('./compiler');

var DEFAULT = Attr.DELIMETER + 'default';
var IDENTIFIER_RE = CCClass.IDENTIFIER_RE;
var escapeForJS = CCClass.escapeForJS;
var VAR = 'var ';
var LOCAL_OBJ = 'o';
var LOCAL_TEMP_OBJ = 't';
var LOCAL_ARRAY = 'a';
var LINE_INDEX_OF_NEW_OBJ = 0;
var DEFAULT_MODULE_CACHE = {
  'cc.Node': 'cc.Node',
  'cc.Sprite': 'cc.Sprite',
  'cc.Label': 'cc.Label',
  'cc.Button': 'cc.Button',
  'cc.Widget': 'cc.Widget',
  'cc.Animation': 'cc.Animation',
  'cc.ClickEvent': false,
  'cc.PrefabInfo': false
};

try {
  // compatible for IE
  !Float32Array.name && (Float32Array.name = 'Float32Array');
  !Float64Array.name && (Float64Array.name = 'Float64Array');
  !Int8Array.name && (Int8Array.name = 'Int8Array');
  !Int16Array.name && (Int16Array.name = 'Int16Array');
  !Int32Array.name && (Int32Array.name = 'Int32Array');
  !Uint8Array.name && (Uint8Array.name = 'Uint8Array');
  !Uint16Array.name && (Uint16Array.name = 'Uint16Array');
  !Uint32Array.name && (Uint32Array.name = 'Uint32Array');
  !Uint8ClampedArray.name && (Uint8ClampedArray.name = 'Uint8ClampedArray');
} catch (e) {} // compatible for iOS 9


function getTypedArrayName(constructor) {
  if (constructor === Float32Array) {
    return 'Float32Array';
  } else if (constructor === Float64Array) {
    return 'Float64Array';
  } else if (constructor === Int8Array) {
    return 'Int8Array';
  } else if (constructor === Int16Array) {
    return 'Int16Array';
  } else if (constructor === Int32Array) {
    return 'Int32Array';
  } else if (constructor === Uint8Array) {
    return 'Uint8Array';
  } else if (constructor === Uint16Array) {
    return 'Uint16Array';
  } else if (constructor === Uint32Array) {
    return 'Uint32Array';
  } else if (constructor === Uint8ClampedArray) {
    return 'Uint8ClampedArray';
  } else {
    throw new Error("Unknown TypedArray to instantiate: " + constructor);
  }
} // HELPER CLASSES
// ('foo', 'bar')
// -> 'var foo = bar;'


function Declaration(varName, expression) {
  this.varName = varName;
  this.expression = expression;
}

Declaration.prototype.toString = function () {
  return VAR + this.varName + '=' + this.expression + ';';
}; // ('a =', 'var b = x')
// -> 'var b = a = x';
// ('a =', 'x')
// -> 'a = x';


function mergeDeclaration(statement, expression) {
  if (expression instanceof Declaration) {
    return new Declaration(expression.varName, statement + expression.expression);
  } else {
    return statement + expression;
  }
} // ('a', ['var b = x', 'b.foo = bar'])
// -> 'var b = a = x;'
// -> 'b.foo = bar;'
// ('a', 'var b = x')
// -> 'var b = a = x;'
// ('a', 'x')
// -> 'a = x;'


function writeAssignment(codeArray, statement, expression) {
  if (Array.isArray(expression)) {
    expression[0] = mergeDeclaration(statement, expression[0]);
    codeArray.push(expression);
  } else {
    codeArray.push(mergeDeclaration(statement, expression) + ';');
  }
} // ('foo', 'bar')
// -> 'targetExpression.foo = bar'
// ('foo1', 'bar1')
// ('foo2', 'bar2')
// -> 't = targetExpression;'
// -> 't.foo1 = bar1;'
// -> 't.foo2 = bar2;'


function Assignments(targetExpression) {
  this._exps = [];
  this._targetExp = targetExpression;
}

Assignments.prototype.append = function (key, expression) {
  this._exps.push([key, expression]);
};

Assignments.prototype.writeCode = function (codeArray) {
  var targetVar;

  if (this._exps.length > 1) {
    codeArray.push(LOCAL_TEMP_OBJ + '=' + this._targetExp + ';');
    targetVar = LOCAL_TEMP_OBJ;
  } else if (this._exps.length === 1) {
    targetVar = this._targetExp;
  } else {
    return;
  }

  for (var i = 0; i < this._exps.length; i++) {
    var pair = this._exps[i];
    writeAssignment(codeArray, targetVar + getPropAccessor(pair[0]) + '=', pair[1]);
  }
};

Assignments.pool = new js.Pool(function (obj) {
  obj._exps.length = 0;
  obj._targetExp = null;
}, 1);

Assignments.pool.get = function (targetExpression) {
  var cache = this._get() || new Assignments();
  cache._targetExp = targetExpression;
  return cache;
}; // HELPER FUNCTIONS


function equalsToDefault(def, value) {
  if (typeof def === 'function') {
    try {
      def = def();
    } catch (e) {
      return false;
    }
  }

  if (def === value) {
    return true;
  }

  if (def && value && typeof def === 'object' && typeof value === 'object' && def.constructor === value.constructor) {
    if (def instanceof cc.ValueType) {
      if (def.equals(value)) {
        return true;
      }
    } else if (Array.isArray(def)) {
      return def.length === 0 && value.length === 0;
    } else if (def.constructor === Object) {
      return js.isEmptyObject(def) && js.isEmptyObject(value);
    }
  }

  return false;
}

function getPropAccessor(key) {
  return IDENTIFIER_RE.test(key) ? '.' + key : '[' + escapeForJS(key) + ']';
} //

/*
 * Variables:
 * {Object[]} O - objs list
 * {Function[]} F - constructor list
 * {Node} [R] - specify an instantiated prefabRoot that all references to prefabRoot in prefab will redirect to
 * {Object} o - current creating object
 */

/*
 * @param {Object} obj - the object to parse
 * @param {Node} [parent]
 */


function Parser(obj, parent) {
  this.parent = parent;
  this.objsToClear_iN$t = []; // used to reset _iN$t variable

  this.codeArray = []; // datas for generated code

  this.objs = [];
  this.funcs = [];
  this.funcModuleCache = js.createMap();
  js.mixin(this.funcModuleCache, DEFAULT_MODULE_CACHE); // {String[]} - variable names for circular references,
  //              not really global, just local variables shared between sub functions

  this.globalVariables = []; // incremental id for new global variables

  this.globalVariableId = 0; // incremental id for new local variables

  this.localVariableId = 0; // generate codeArray
  //if (Array.isArray(obj)) {
  //    this.codeArray.push(this.instantiateArray(obj));
  //}
  //else {

  this.codeArray.push(VAR + LOCAL_OBJ + ',' + LOCAL_TEMP_OBJ + ';', 'if(R){', LOCAL_OBJ + '=R;', '}else{', LOCAL_OBJ + '=R=new ' + this.getFuncModule(obj.constructor, true) + '();', '}');
  js.value(obj, '_iN$t', {
    globalVar: 'R'
  }, true);
  this.objsToClear_iN$t.push(obj);
  this.enumerateObject(this.codeArray, obj); //}
  // generate code

  var globalVariablesDeclaration;

  if (this.globalVariables.length > 0) {
    globalVariablesDeclaration = VAR + this.globalVariables.join(',') + ';';
  }

  var code = Compiler.flattenCodeArray(['return (function(R){', globalVariablesDeclaration || [], this.codeArray, 'return o;', '})']); // generate method and bind with objs

  this.result = Function('O', 'F', code)(this.objs, this.funcs); // if (CC_TEST && !isPhantomJS) {
  //     console.log(code);
  // }
  // cleanup

  for (var i = 0, len = this.objsToClear_iN$t.length; i < len; ++i) {
    this.objsToClear_iN$t[i]._iN$t = null;
  }

  this.objsToClear_iN$t.length = 0;
}

var proto = Parser.prototype;

proto.getFuncModule = function (func, usedInNew) {
  var clsName = js.getClassName(func);

  if (clsName) {
    var cache = this.funcModuleCache[clsName];

    if (cache) {
      return cache;
    } else if (cache === undefined) {
      var clsNameIsModule = clsName.indexOf('.') !== -1;

      if (clsNameIsModule) {
        try {
          // ensure is module
          clsNameIsModule = func === Function('return ' + clsName)();

          if (clsNameIsModule) {
            this.funcModuleCache[clsName] = clsName;
            return clsName;
          }
        } catch (e) {}
      }
    }
  }

  var index = this.funcs.indexOf(func);

  if (index < 0) {
    index = this.funcs.length;
    this.funcs.push(func);
  }

  var res = 'F[' + index + ']';

  if (usedInNew) {
    res = '(' + res + ')';
  }

  this.funcModuleCache[clsName] = res;
  return res;
};

proto.getObjRef = function (obj) {
  var index = this.objs.indexOf(obj);

  if (index < 0) {
    index = this.objs.length;
    this.objs.push(obj);
  }

  return 'O[' + index + ']';
};

proto.setValueType = function (codeArray, defaultValue, srcValue, targetExpression) {
  var assignments = Assignments.pool.get(targetExpression);
  var fastDefinedProps = defaultValue.constructor.__props__;

  if (!fastDefinedProps) {
    fastDefinedProps = Object.keys(defaultValue);
  }

  for (var i = 0; i < fastDefinedProps.length; i++) {
    var propName = fastDefinedProps[i];
    var prop = srcValue[propName];

    if (defaultValue[propName] === prop) {
      continue;
    }

    var expression = this.enumerateField(srcValue, propName, prop);
    assignments.append(propName, expression);
  }

  assignments.writeCode(codeArray);
  Assignments.pool.put(assignments);
};

proto.enumerateCCClass = function (codeArray, obj, klass) {
  var props = klass.__values__;
  var attrs = Attr.getClassAttrs(klass);

  for (var p = 0; p < props.length; p++) {
    var key = props[p];
    var val = obj[key];
    var defaultValue = attrs[key + DEFAULT];

    if (equalsToDefault(defaultValue, val)) {
      continue;
    }

    if (typeof val === 'object' && val instanceof cc.ValueType) {
      defaultValue = CCClass.getDefault(defaultValue);

      if (defaultValue && defaultValue.constructor === val.constructor) {
        // fast case
        var targetExpression = LOCAL_OBJ + getPropAccessor(key);
        this.setValueType(codeArray, defaultValue, val, targetExpression);
        continue;
      }
    }

    this.setObjProp(codeArray, obj, key, val);
  }
};

proto.instantiateArray = function (value) {
  if (value.length === 0) {
    return '[]';
  }

  var arrayVar = LOCAL_ARRAY + ++this.localVariableId;
  var declaration = new Declaration(arrayVar, 'new Array(' + value.length + ')');
  var codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

  js.value(value, '_iN$t', {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object

  }, true);
  this.objsToClear_iN$t.push(value);

  for (var i = 0; i < value.length; ++i) {
    var statement = arrayVar + '[' + i + ']=';
    var expression = this.enumerateField(value, i, value[i]);
    writeAssignment(codeArray, statement, expression);
  }

  return codeArray;
};

proto.instantiateTypedArray = function (value) {
  var type = value.constructor.name || getTypedArrayName(value.constructor);

  if (value.length === 0) {
    return 'new ' + type;
  }

  var arrayVar = LOCAL_ARRAY + ++this.localVariableId;
  var declaration = new Declaration(arrayVar, 'new ' + type + '(' + value.length + ')');
  var codeArray = [declaration]; // assign a _iN$t flag to indicate that this object has been parsed.

  value._iN$t = {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object

  };
  this.objsToClear_iN$t.push(value);

  for (var i = 0; i < value.length; ++i) {
    if (value[i] !== 0) {
      var statement = arrayVar + '[' + i + ']=';
      writeAssignment(codeArray, statement, value[i]);
    }
  }

  return codeArray;
};

proto.enumerateField = function (obj, key, value) {
  if (typeof value === 'object' && value) {
    var _iN$t = value._iN$t;

    if (_iN$t) {
      // parsed
      var globalVar = _iN$t.globalVar;

      if (!globalVar) {
        // declare a global var
        globalVar = _iN$t.globalVar = 'v' + ++this.globalVariableId;
        this.globalVariables.push(globalVar); // insert assignment statement to assign to global var

        var line = _iN$t.source[LINE_INDEX_OF_NEW_OBJ];
        _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = mergeDeclaration(globalVar + '=', line); // if (typeof line ==='string' && line.startsWith(VAR)) {
        //     // var o=xxx -> var o=global=xxx
        //     var LEN_OF_VAR_O = 5;
        //     _iN$t.source[LINE_INDEX_OF_NEW_OBJ] = line.slice(0, LEN_OF_VAR_O) + '=' + globalVar + line.slice(LEN_OF_VAR_O);
        // }
      }

      return globalVar;
    } else if (ArrayBuffer.isView(value)) {
      return this.instantiateTypedArray(value);
    } else if (Array.isArray(value)) {
      return this.instantiateArray(value);
    } else {
      return this.instantiateObj(value);
    }
  } else if (typeof value === 'function') {
    return this.getFuncModule(value);
  } else if (typeof value === 'string') {
    return escapeForJS(value);
  } else {
    if (key === '_objFlags' && obj instanceof CCObject) {
      value &= PersistentMask;
    }

    return value;
  }
};

proto.setObjProp = function (codeArray, obj, key, value) {
  var statement = LOCAL_OBJ + getPropAccessor(key) + '=';
  var expression = this.enumerateField(obj, key, value);
  writeAssignment(codeArray, statement, expression);
}; // codeArray - the source code array for this object


proto.enumerateObject = function (codeArray, obj) {
  var klass = obj.constructor;

  if (cc.Class._isCCClass(klass)) {
    this.enumerateCCClass(codeArray, obj, klass);
  } else {
    // primitive javascript object
    for (var key in obj) {
      if (!obj.hasOwnProperty(key) || key.charCodeAt(0) === 95 && key.charCodeAt(1) === 95 && // starts with "__"
      key !== '__type__') {
        continue;
      }

      var value = obj[key];

      if (typeof value === 'object' && value && value === obj._iN$t) {
        continue;
      }

      this.setObjProp(codeArray, obj, key, value);
    }
  }
};

proto.instantiateObj = function (obj) {
  if (obj instanceof cc.ValueType) {
    return CCClass.getNewValueTypeCode(obj);
  }

  if (obj instanceof cc.Asset) {
    // register to asset list and just return the reference.
    return this.getObjRef(obj);
  }

  if (obj._objFlags & Destroyed) {
    // the same as cc.isValid(obj)
    return null;
  }

  var createCode;
  var ctor = obj.constructor;

  if (cc.Class._isCCClass(ctor)) {
    if (this.parent) {
      if (this.parent instanceof cc.Component) {
        if (obj instanceof cc._BaseNode || obj instanceof cc.Component) {
          return this.getObjRef(obj);
        }
      } else if (this.parent instanceof cc._BaseNode) {
        if (obj instanceof cc._BaseNode) {
          if (!obj.isChildOf(this.parent)) {
            // should not clone other nodes if not descendant
            return this.getObjRef(obj);
          }
        } else if (obj instanceof cc.Component) {
          if (!obj.node.isChildOf(this.parent)) {
            // should not clone other component if not descendant
            return this.getObjRef(obj);
          }
        }
      }
    }

    createCode = new Declaration(LOCAL_OBJ, 'new ' + this.getFuncModule(ctor, true) + '()');
  } else if (ctor === Object) {
    createCode = new Declaration(LOCAL_OBJ, '{}');
  } else if (!ctor) {
    createCode = new Declaration(LOCAL_OBJ, 'Object.create(null)');
  } else {
    // do not clone unknown type
    return this.getObjRef(obj);
  }

  var codeArray = [createCode]; // assign a _iN$t flag to indicate that this object has been parsed.

  js.value(obj, '_iN$t', {
    globalVar: '',
    // the name of declared global variable used to access this object
    source: codeArray // the source code array for this object
    //propName: '',     // the propName this object defined in its source code,
    //                  // if defined, use LOCAL_OBJ.propName to access the obj, else just use o

  }, true);
  this.objsToClear_iN$t.push(obj);
  this.enumerateObject(codeArray, obj);
  return ['(function(){', codeArray, 'return o;})();'];
};

function compile(node) {
  var root = node instanceof cc._BaseNode && node;
  var parser = new Parser(node, root);
  return parser.result;
}

module.exports = {
  compile: compile,
  equalsToDefault: equalsToDefault
};

if (CC_TEST) {
  cc._Test.IntantiateJit = module.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXZcXGNvY29zMmRcXGNvcmVcXHBsYXRmb3JtXFxpbnN0YW50aWF0ZS1qaXQuanMiXSwibmFtZXMiOlsiQ0NPYmplY3QiLCJyZXF1aXJlIiwiRGVzdHJveWVkIiwiRmxhZ3MiLCJQZXJzaXN0ZW50TWFzayIsIkF0dHIiLCJqcyIsIkNDQ2xhc3MiLCJDb21waWxlciIsIkRFRkFVTFQiLCJERUxJTUVURVIiLCJJREVOVElGSUVSX1JFIiwiZXNjYXBlRm9ySlMiLCJWQVIiLCJMT0NBTF9PQkoiLCJMT0NBTF9URU1QX09CSiIsIkxPQ0FMX0FSUkFZIiwiTElORV9JTkRFWF9PRl9ORVdfT0JKIiwiREVGQVVMVF9NT0RVTEVfQ0FDSEUiLCJGbG9hdDMyQXJyYXkiLCJuYW1lIiwiRmxvYXQ2NEFycmF5IiwiSW50OEFycmF5IiwiSW50MTZBcnJheSIsIkludDMyQXJyYXkiLCJVaW50OEFycmF5IiwiVWludDE2QXJyYXkiLCJVaW50MzJBcnJheSIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiZSIsImdldFR5cGVkQXJyYXlOYW1lIiwiY29uc3RydWN0b3IiLCJFcnJvciIsIkRlY2xhcmF0aW9uIiwidmFyTmFtZSIsImV4cHJlc3Npb24iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm1lcmdlRGVjbGFyYXRpb24iLCJzdGF0ZW1lbnQiLCJ3cml0ZUFzc2lnbm1lbnQiLCJjb2RlQXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiQXNzaWdubWVudHMiLCJ0YXJnZXRFeHByZXNzaW9uIiwiX2V4cHMiLCJfdGFyZ2V0RXhwIiwiYXBwZW5kIiwia2V5Iiwid3JpdGVDb2RlIiwidGFyZ2V0VmFyIiwibGVuZ3RoIiwiaSIsInBhaXIiLCJnZXRQcm9wQWNjZXNzb3IiLCJwb29sIiwiUG9vbCIsIm9iaiIsImdldCIsImNhY2hlIiwiX2dldCIsImVxdWFsc1RvRGVmYXVsdCIsImRlZiIsInZhbHVlIiwiY2MiLCJWYWx1ZVR5cGUiLCJlcXVhbHMiLCJPYmplY3QiLCJpc0VtcHR5T2JqZWN0IiwidGVzdCIsIlBhcnNlciIsInBhcmVudCIsIm9ianNUb0NsZWFyX2lOJHQiLCJvYmpzIiwiZnVuY3MiLCJmdW5jTW9kdWxlQ2FjaGUiLCJjcmVhdGVNYXAiLCJtaXhpbiIsImdsb2JhbFZhcmlhYmxlcyIsImdsb2JhbFZhcmlhYmxlSWQiLCJsb2NhbFZhcmlhYmxlSWQiLCJnZXRGdW5jTW9kdWxlIiwiZ2xvYmFsVmFyIiwiZW51bWVyYXRlT2JqZWN0IiwiZ2xvYmFsVmFyaWFibGVzRGVjbGFyYXRpb24iLCJqb2luIiwiY29kZSIsImZsYXR0ZW5Db2RlQXJyYXkiLCJyZXN1bHQiLCJGdW5jdGlvbiIsImxlbiIsIl9pTiR0IiwicHJvdG8iLCJmdW5jIiwidXNlZEluTmV3IiwiY2xzTmFtZSIsImdldENsYXNzTmFtZSIsInVuZGVmaW5lZCIsImNsc05hbWVJc01vZHVsZSIsImluZGV4T2YiLCJpbmRleCIsInJlcyIsImdldE9ialJlZiIsInNldFZhbHVlVHlwZSIsImRlZmF1bHRWYWx1ZSIsInNyY1ZhbHVlIiwiYXNzaWdubWVudHMiLCJmYXN0RGVmaW5lZFByb3BzIiwiX19wcm9wc19fIiwia2V5cyIsInByb3BOYW1lIiwicHJvcCIsImVudW1lcmF0ZUZpZWxkIiwicHV0IiwiZW51bWVyYXRlQ0NDbGFzcyIsImtsYXNzIiwicHJvcHMiLCJfX3ZhbHVlc19fIiwiYXR0cnMiLCJnZXRDbGFzc0F0dHJzIiwicCIsInZhbCIsImdldERlZmF1bHQiLCJzZXRPYmpQcm9wIiwiaW5zdGFudGlhdGVBcnJheSIsImFycmF5VmFyIiwiZGVjbGFyYXRpb24iLCJzb3VyY2UiLCJpbnN0YW50aWF0ZVR5cGVkQXJyYXkiLCJ0eXBlIiwibGluZSIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiaW5zdGFudGlhdGVPYmoiLCJDbGFzcyIsIl9pc0NDQ2xhc3MiLCJoYXNPd25Qcm9wZXJ0eSIsImNoYXJDb2RlQXQiLCJnZXROZXdWYWx1ZVR5cGVDb2RlIiwiQXNzZXQiLCJfb2JqRmxhZ3MiLCJjcmVhdGVDb2RlIiwiY3RvciIsIkNvbXBvbmVudCIsIl9CYXNlTm9kZSIsImlzQ2hpbGRPZiIsIm5vZGUiLCJjb21waWxlIiwicm9vdCIsInBhcnNlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJDQ19URVNUIiwiX1Rlc3QiLCJJbnRhbnRpYXRlSml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHRixRQUFRLENBQUNHLEtBQVQsQ0FBZUQsU0FBL0I7QUFDQSxJQUFJRSxjQUFjLEdBQUdKLFFBQVEsQ0FBQ0csS0FBVCxDQUFlQyxjQUFwQzs7QUFDQSxJQUFJQyxJQUFJLEdBQUdKLE9BQU8sQ0FBQyxhQUFELENBQWxCOztBQUNBLElBQUlLLEVBQUUsR0FBR0wsT0FBTyxDQUFDLE1BQUQsQ0FBaEI7O0FBQ0EsSUFBSU0sT0FBTyxHQUFHTixPQUFPLENBQUMsV0FBRCxDQUFyQjs7QUFDQSxJQUFJTyxRQUFRLEdBQUdQLE9BQU8sQ0FBQyxZQUFELENBQXRCOztBQUVBLElBQUlRLE9BQU8sR0FBR0osSUFBSSxDQUFDSyxTQUFMLEdBQWlCLFNBQS9CO0FBQ0EsSUFBSUMsYUFBYSxHQUFHSixPQUFPLENBQUNJLGFBQTVCO0FBQ0EsSUFBSUMsV0FBVyxHQUFHTCxPQUFPLENBQUNLLFdBQTFCO0FBRUEsSUFBTUMsR0FBRyxHQUFHLE1BQVo7QUFDQSxJQUFNQyxTQUFTLEdBQUcsR0FBbEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsR0FBdkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsR0FBcEI7QUFDQSxJQUFNQyxxQkFBcUIsR0FBRyxDQUE5QjtBQUVBLElBQU1DLG9CQUFvQixHQUFHO0FB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QUFNLEdBQUcsSUFBSS9FLE1BQUosQ0FBVzRFLElBQVgsRUFBaUJFLElBQWpCLENBQWI7QUFDQSxTQUFPQyxNQUFNLENBQUM3RCxNQUFkO0FBQ0g7O0FBRUQ4RCxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkosRUFBQUEsT0FBTyxFQUFFQSxPQURJO0FBRWJ0RixFQUFBQSxlQUFlLEVBQUVBO0FBRkosQ0FBakI7O0FBS0EsSUFBSTJGLE9BQUosRUFBYTtBQUNUeEYsRUFBQUEsRUFBRSxDQUFDeUYsS0FBSCxDQUFTQyxhQUFULEdBQXlCSixNQUFNLENBQUNDLE9BQWhDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxyXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXHJcblxyXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxyXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcclxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXHJcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xyXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcclxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cclxuXHJcbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxyXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS5cclxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vLyBTb21lIGhlbHBlciBtZXRob2RzIGZvciBjb21waWxlIGluc3RhbnRpYXRpb24gY29kZVxyXG5cclxudmFyIENDT2JqZWN0ID0gcmVxdWlyZSgnLi9DQ09iamVjdCcpO1xyXG52YXIgRGVzdHJveWVkID0gQ0NPYmplY3QuRmxhZ3MuRGVzdHJveWVkO1xyXG52YXIgUGVyc2lzdGVudE1hc2sgPSBDQ09iamVjdC5GbGFncy5QZXJzaXN0ZW50TWFzaztcclxudmFyIEF0dHIgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZScpO1xyXG52YXIganMgPSByZXF1aXJlKCcuL2pzJyk7XHJcbnZhciBDQ0NsYXNzID0gcmVxdWlyZSgnLi9DQ0NsYXNzJyk7XHJcbnZhciBDb21waWxlciA9IHJlcXVpcmUoJy4vY29tcGlsZXInKTtcclxuXHJcbnZhciBERUZBVUxUID0gQXR0ci5ERUxJTUVURVIgKyAnZGVmYXVsdCc7XHJcbnZhciBJREVOVElGSUVSX1JFID0gQ0NDbGFzcy5JREVOVElGSUVSX1JFO1xyXG52YXIgZXNjYXBlRm9ySlMgPSBDQ0NsYXNzLmVzY2FwZUZvckpTO1xyXG5cclxuY29uc3QgVkFSID0gJ3ZhciAnO1xyXG5jb25zdCBMT0NBTF9PQkogPSAnbyc7XHJcbmNvbnN0IExPQ0FMX1RFTVBfT0JKID0gJ3QnO1xyXG5jb25zdCBMT0NBTF9BUlJBWSA9ICdhJztcclxuY29uc3QgTElORV9JTkRFWF9PRl9ORVdfT0JKID0gMDtcclxuXHJcbmNvbnN0IERFRkFVTFRfTU9EVUxFX0NBQ0hFID0ge1xyXG4gICAgJ2NjLk5vZGUnOiAnY2MuTm9kZScsXHJcbiAgICAnY2MuU3ByaXRlJzogJ2NjLlNwcml0ZScsXHJcbiAgICAnY2MuTGFiZWwnOiAnY2MuTGFiZWwnLFxyXG4gICAgJ2NjLkJ1dHRvbic6ICdjYy5CdXR0b24nLFxyXG4gICAgJ2NjLldpZGdldCc6ICdjYy5XaWRnZXQnLFxyXG4gICAgJ2NjLkFuaW1hdGlvbic6ICdjYy5BbmltYXRpb24nLFxyXG4gICAgJ2NjLkNsaWNrRXZlbnQnOiBmYWxzZSxcclxuICAgICdjYy5QcmVmYWJJbmZvJzogZmFsc2VcclxufTtcclxuXHJcbnRyeSB7XHJcbiAgICAvLyBjb21wYXRpYmxlIGZvciBJRVxyXG4gICAgIUZsb2F0MzJBcnJheS5uYW1lICYmIChGbG9hdDMyQXJyYXkubmFtZSA9ICdGbG9hdDMyQXJyYXknKTtcclxuICAgICFGbG9hdDY0QXJyYXkubmFtZSAmJiAoRmxvYXQ2NEFycmF5Lm5hbWUgPSAnRmxvYXQ2NEFycmF5Jyk7XHJcblxyXG4gICAgIUludDhBcnJheS5uYW1lICYmIChJbnQ4QXJyYXkubmFtZSA9ICdJbnQ4QXJyYXknKTtcclxuICAgICFJbnQxNkFycmF5Lm5hbWUgJiYgKEludDE2QXJyYXkubmFtZSA9ICdJbnQxNkFycmF5Jyk7XHJcbiAgICAhSW50MzJBcnJheS5uYW1lICYmIChJbnQzMkFycmF5Lm5hbWUgPSAnSW50MzJBcnJheScpO1xyXG5cclxuICAgICFVaW50OEFycmF5Lm5hbWUgJiYgKFVpbnQ4QXJyYXkubmFtZSA9ICdVaW50OEFycmF5Jyk7XHJcbiAgICAhVWludDE2QXJyYXkubmFtZSAmJiAoVWludDE2QXJyYXkubmFtZSA9ICdVaW50MTZBcnJheScpO1xyXG4gICAgIVVpbnQzMkFycmF5Lm5hbWUgJiYgKFVpbnQzMkFycmF5Lm5hbWUgPSAnVWludDMyQXJyYXknKTtcclxuXHJcbiAgICAhVWludDhDbGFtcGVkQXJyYXkubmFtZSAmJiAoVWludDhDbGFtcGVkQXJyYXkubmFtZSA9ICdVaW50OENsYW1wZWRBcnJheScpO1xyXG59XHJcbmNhdGNoIChlKSB7fVxyXG5cclxuLy8gY29tcGF0aWJsZSBmb3IgaU9TIDlcclxuZnVuY3Rpb24gZ2V0VHlwZWRBcnJheU5hbWUgKGNvbnN0cnVjdG9yKSB7XHJcbiAgICBpZiAoY29uc3RydWN0b3IgPT09IEZsb2F0MzJBcnJheSkgeyByZXR1cm4gJ0Zsb2F0MzJBcnJheSc7IH1cclxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBGbG9hdDY0QXJyYXkpIHsgcmV0dXJuICdGbG9hdDY0QXJyYXknOyB9XHJcblxyXG4gICAgZWxzZSBpZiAoY29uc3RydWN0b3IgPT09IEludDhBcnJheSkgeyByZXR1cm4gJ0ludDhBcnJheSc7IH1cclxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQxNkFycmF5KSB7IHJldHVybiAnSW50MTZBcnJheSc7IH1cclxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBJbnQzMkFycmF5KSB7IHJldHVybiAnSW50MzJBcnJheSc7IH1cclxuXHJcbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDhBcnJheSkgeyByZXR1cm4gJ1VpbnQ4QXJyYXknOyB9XHJcbiAgICBlbHNlIGlmIChjb25zdHJ1Y3RvciA9PT0gVWludDE2QXJyYXkpIHsgcmV0dXJuICdVaW50MTZBcnJheSc7IH1cclxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBVaW50MzJBcnJheSkgeyByZXR1cm4gJ1VpbnQzMkFycmF5JzsgfVxyXG5cclxuICAgIGVsc2UgaWYgKGNvbnN0cnVjdG9yID09PSBVaW50OENsYW1wZWRBcnJheSkgeyByZXR1cm4gJ1VpbnQ4Q2xhbXBlZEFycmF5JzsgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIFR5cGVkQXJyYXkgdG8gaW5zdGFudGlhdGU6ICR7Y29uc3RydWN0b3J9YCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEhFTFBFUiBDTEFTU0VTXHJcblxyXG4vLyAoJ2ZvbycsICdiYXInKVxyXG4vLyAtPiAndmFyIGZvbyA9IGJhcjsnXHJcbmZ1bmN0aW9uIERlY2xhcmF0aW9uICh2YXJOYW1lLCBleHByZXNzaW9uKSB7XHJcbiAgICB0aGlzLnZhck5hbWUgPSB2YXJOYW1lO1xyXG4gICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxufVxyXG5EZWNsYXJhdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gVkFSICsgdGhpcy52YXJOYW1lICsgJz0nICsgdGhpcy5leHByZXNzaW9uICsgJzsnO1xyXG59O1xyXG5cclxuLy8gKCdhID0nLCAndmFyIGIgPSB4JylcclxuLy8gLT4gJ3ZhciBiID0gYSA9IHgnO1xyXG4vLyAoJ2EgPScsICd4JylcclxuLy8gLT4gJ2EgPSB4JztcclxuZnVuY3Rpb24gbWVyZ2VEZWNsYXJhdGlvbiAoc3RhdGVtZW50LCBleHByZXNzaW9uKSB7XHJcbiAgICBpZiAoZXhwcmVzc2lvbiBpbnN0YW5jZW9mIERlY2xhcmF0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEZWNsYXJhdGlvbihleHByZXNzaW9uLnZhck5hbWUsIHN0YXRlbWVudCArIGV4cHJlc3Npb24uZXhwcmVzc2lvbik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc3RhdGVtZW50ICsgZXhwcmVzc2lvbjtcclxuICAgIH1cclxufVxyXG5cclxuLy8gKCdhJywgWyd2YXIgYiA9IHgnLCAnYi5mb28gPSBiYXInXSlcclxuLy8gLT4gJ3ZhciBiID0gYSA9IHg7J1xyXG4vLyAtPiAnYi5mb28gPSBiYXI7J1xyXG4vLyAoJ2EnLCAndmFyIGIgPSB4JylcclxuLy8gLT4gJ3ZhciBiID0gYSA9IHg7J1xyXG4vLyAoJ2EnLCAneCcpXHJcbi8vIC0+ICdhID0geDsnXHJcbmZ1bmN0aW9uIHdyaXRlQXNzaWdubWVudCAoY29kZUFycmF5LCBzdGF0ZW1lbnQsIGV4cHJlc3Npb24pIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGV4cHJlc3Npb24pKSB7XHJcbiAgICAgICAgZXhwcmVzc2lvblswXSA9IG1lcmdlRGVjbGFyYXRpb24oc3RhdGVtZW50LCBleHByZXNzaW9uWzBdKTtcclxuICAgICAgICBjb2RlQXJyYXkucHVzaChleHByZXNzaW9uKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvZGVBcnJheS5wdXNoKG1lcmdlRGVjbGFyYXRpb24oc3RhdGVtZW50LCBleHByZXNzaW9uKSArICc7Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vICgnZm9vJywgJ2JhcicpXHJcbi8vIC0+ICd0YXJnZXRFeHByZXNzaW9uLmZvbyA9IGJhcidcclxuLy8gKCdmb28xJywgJ2JhcjEnKVxyXG4vLyAoJ2ZvbzInLCAnYmFyMicpXHJcbi8vIC0+ICd0ID0gdGFyZ2V0RXhwcmVzc2lvbjsnXHJcbi8vIC0+ICd0LmZvbzEgPSBiYXIxOydcclxuLy8gLT4gJ3QuZm9vMiA9IGJhcjI7J1xyXG5mdW5jdGlvbiBBc3NpZ25tZW50cyAodGFyZ2V0RXhwcmVzc2lvbikge1xyXG4gICAgdGhpcy5fZXhwcyA9IFtdO1xyXG4gICAgdGhpcy5fdGFyZ2V0RXhwID0gdGFyZ2V0RXhwcmVzc2lvbjtcclxufVxyXG5Bc3NpZ25tZW50cy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gKGtleSwgZXhwcmVzc2lvbikge1xyXG4gICAgdGhpcy5fZXhwcy5wdXNoKFtrZXksIGV4cHJlc3Npb25dKTtcclxufTtcclxuQXNzaWdubWVudHMucHJvdG90eXBlLndyaXRlQ29kZSA9IGZ1bmN0aW9uIChjb2RlQXJyYXkpIHtcclxuICAgIHZhciB0YXJnZXRWYXI7XHJcbiAgICBpZiAodGhpcy5fZXhwcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgY29kZUFycmF5LnB1c2goTE9DQUxfVEVNUF9PQkogKyAnPScgKyB0aGlzLl90YXJnZXRFeHAgKyAnOycpO1xyXG4gICAgICAgIHRhcmdldFZhciA9IExPQ0FMX1RFTVBfT0JKO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5fZXhwcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB0YXJnZXRWYXIgPSB0aGlzLl90YXJnZXRFeHA7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2V4cHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcGFpciA9IHRoaXMuX2V4cHNbaV07XHJcbiAgICAgICAgd3JpdGVBc3NpZ25tZW50KGNvZGVBcnJheSwgdGFyZ2V0VmFyICsgZ2V0UHJvcEFjY2Vzc29yKHBhaXJbMF0pICsgJz0nLCBwYWlyWzFdKTtcclxuICAgIH1cclxufTtcclxuXHJcbkFzc2lnbm1lbnRzLnBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLl9leHBzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLl90YXJnZXRFeHAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbkFzc2lnbm1lbnRzLnBvb2wuZ2V0ID0gZnVuY3Rpb24gKHRhcmdldEV4cHJlc3Npb24pIHtcclxuICAgIHZhciBjYWNoZSA9IHRoaXMuX2dldCgpIHx8IG5ldyBBc3NpZ25tZW50cygpO1xyXG4gICAgY2FjaGUuX3RhcmdldEV4cCA9IHRhcmdldEV4cHJlc3Npb247XHJcbiAgICByZXR1cm4gY2FjaGU7XHJcbn07XHJcblxyXG4vLyBIRUxQRVIgRlVOQ1RJT05TXHJcblxyXG5mdW5jdGlvbiBlcXVhbHNUb0RlZmF1bHQgKGRlZiwgdmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGVmID0gZGVmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZGVmID09PSB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRlZiAmJiB2YWx1ZSAmJlxyXG4gICAgICAgIHR5cGVvZiBkZWYgPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICBkZWYuY29uc3RydWN0b3IgPT09IHZhbHVlLmNvbnN0cnVjdG9yKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChkZWYgaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKGRlZi5lcXVhbHModmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlZikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5sZW5ndGggPT09IDAgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZWYuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4ganMuaXNFbXB0eU9iamVjdChkZWYpICYmIGpzLmlzRW1wdHlPYmplY3QodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UHJvcEFjY2Vzc29yIChrZXkpIHtcclxuICAgIHJldHVybiBJREVOVElGSUVSX1JFLnRlc3Qoa2V5KSA/ICgnLicgKyBrZXkpIDogKCdbJyArIGVzY2FwZUZvckpTKGtleSkgKyAnXScpO1xyXG59XHJcblxyXG4vL1xyXG5cclxuLypcclxuICogVmFyaWFibGVzOlxyXG4gKiB7T2JqZWN0W119IE8gLSBvYmpzIGxpc3RcclxuICoge0Z1bmN0aW9uW119IEYgLSBjb25zdHJ1Y3RvciBsaXN0XHJcbiAqIHtOb2RlfSBbUl0gLSBzcGVjaWZ5IGFuIGluc3RhbnRpYXRlZCBwcmVmYWJSb290IHRoYXQgYWxsIHJlZmVyZW5jZXMgdG8gcHJlZmFiUm9vdCBpbiBwcmVmYWIgd2lsbCByZWRpcmVjdCB0b1xyXG4gKiB7T2JqZWN0fSBvIC0gY3VycmVudCBjcmVhdGluZyBvYmplY3RcclxuICovXHJcblxyXG4vKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gdGhlIG9iamVjdCB0byBwYXJzZVxyXG4gKiBAcGFyYW0ge05vZGV9IFtwYXJlbnRdXHJcbiAqL1xyXG5mdW5jdGlvbiBQYXJzZXIgKG9iaiwgcGFyZW50KSB7XHJcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHJcbiAgICB0aGlzLm9ianNUb0NsZWFyX2lOJHQgPSBbXTsgICAvLyB1c2VkIHRvIHJlc2V0IF9pTiR0IHZhcmlhYmxlXHJcbiAgICB0aGlzLmNvZGVBcnJheSA9IFtdO1xyXG5cclxuICAgIC8vIGRhdGFzIGZvciBnZW5lcmF0ZWQgY29kZVxyXG4gICAgdGhpcy5vYmpzID0gW107XHJcbiAgICB0aGlzLmZ1bmNzID0gW107XHJcblxyXG4gICAgdGhpcy5mdW5jTW9kdWxlQ2FjaGUgPSBqcy5jcmVhdGVNYXAoKTtcclxuICAgIGpzLm1peGluKHRoaXMuZnVuY01vZHVsZUNhY2hlLCBERUZBVUxUX01PRFVMRV9DQUNIRSk7XHJcblxyXG4gICAgLy8ge1N0cmluZ1tdfSAtIHZhcmlhYmxlIG5hbWVzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzLFxyXG4gICAgLy8gICAgICAgICAgICAgIG5vdCByZWFsbHkgZ2xvYmFsLCBqdXN0IGxvY2FsIHZhcmlhYmxlcyBzaGFyZWQgYmV0d2VlbiBzdWIgZnVuY3Rpb25zXHJcbiAgICB0aGlzLmdsb2JhbFZhcmlhYmxlcyA9IFtdO1xyXG4gICAgLy8gaW5jcmVtZW50YWwgaWQgZm9yIG5ldyBnbG9iYWwgdmFyaWFibGVzXHJcbiAgICB0aGlzLmdsb2JhbFZhcmlhYmxlSWQgPSAwO1xyXG4gICAgLy8gaW5jcmVtZW50YWwgaWQgZm9yIG5ldyBsb2NhbCB2YXJpYWJsZXNcclxuICAgIHRoaXMubG9jYWxWYXJpYWJsZUlkID0gMDtcclxuXHJcbiAgICAvLyBnZW5lcmF0ZSBjb2RlQXJyYXlcclxuICAgIC8vaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgLy8gICAgdGhpcy5jb2RlQXJyYXkucHVzaCh0aGlzLmluc3RhbnRpYXRlQXJyYXkob2JqKSk7XHJcbiAgICAvL31cclxuICAgIC8vZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb2RlQXJyYXkucHVzaChWQVIgKyBMT0NBTF9PQkogKyAnLCcgKyBMT0NBTF9URU1QX09CSiArICc7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lmKFIpeycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTE9DQUxfT0JKICsgJz1SOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd9ZWxzZXsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExPQ0FMX09CSiArICc9Uj1uZXcgJyArIHRoaXMuZ2V0RnVuY01vZHVsZShvYmouY29uc3RydWN0b3IsIHRydWUpICsgJygpOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd9Jyk7XHJcbiAgICAgICAganMudmFsdWUob2JqLCAnX2lOJHQnLCB7IGdsb2JhbFZhcjogJ1InIH0sIHRydWUpO1xyXG4gICAgICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKG9iaik7XHJcbiAgICAgICAgdGhpcy5lbnVtZXJhdGVPYmplY3QodGhpcy5jb2RlQXJyYXksIG9iaik7XHJcbiAgICAvL31cclxuXHJcbiAgICAvLyBnZW5lcmF0ZSBjb2RlXHJcbiAgICB2YXIgZ2xvYmFsVmFyaWFibGVzRGVjbGFyYXRpb247XHJcbiAgICBpZiAodGhpcy5nbG9iYWxWYXJpYWJsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGdsb2JhbFZhcmlhYmxlc0RlY2xhcmF0aW9uID0gVkFSICsgdGhpcy5nbG9iYWxWYXJpYWJsZXMuam9pbignLCcpICsgJzsnO1xyXG4gICAgfVxyXG4gICAgdmFyIGNvZGUgPSBDb21waWxlci5mbGF0dGVuQ29kZUFycmF5KFsncmV0dXJuIChmdW5jdGlvbihSKXsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxWYXJpYWJsZXNEZWNsYXJhdGlvbiB8fCBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlQXJyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZXR1cm4gbzsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnfSknXSk7XHJcblxyXG4gICAgLy8gZ2VuZXJhdGUgbWV0aG9kIGFuZCBiaW5kIHdpdGggb2Jqc1xyXG4gICAgdGhpcy5yZXN1bHQgPSBGdW5jdGlvbignTycsICdGJywgY29kZSkodGhpcy5vYmpzLCB0aGlzLmZ1bmNzKTtcclxuXHJcbiAgICAvLyBpZiAoQ0NfVEVTVCAmJiAhaXNQaGFudG9tSlMpIHtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhjb2RlKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjbGVhbnVwXHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5vYmpzVG9DbGVhcl9pTiR0Lmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0W2ldLl9pTiR0ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5sZW5ndGggPSAwO1xyXG59XHJcblxyXG52YXIgcHJvdG8gPSBQYXJzZXIucHJvdG90eXBlO1xyXG5cclxucHJvdG8uZ2V0RnVuY01vZHVsZSA9IGZ1bmN0aW9uIChmdW5jLCB1c2VkSW5OZXcpIHtcclxuICAgIHZhciBjbHNOYW1lID0ganMuZ2V0Q2xhc3NOYW1lKGZ1bmMpO1xyXG4gICAgaWYgKGNsc05hbWUpIHtcclxuICAgICAgICB2YXIgY2FjaGUgPSB0aGlzLmZ1bmNNb2R1bGVDYWNoZVtjbHNOYW1lXTtcclxuICAgICAgICBpZiAoY2FjaGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYWNoZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhciBjbHNOYW1lSXNNb2R1bGUgPSBjbHNOYW1lLmluZGV4T2YoJy4nKSAhPT0gLTE7XHJcbiAgICAgICAgICAgIGlmIChjbHNOYW1lSXNNb2R1bGUpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGlzIG1vZHVsZVxyXG4gICAgICAgICAgICAgICAgICAgIGNsc05hbWVJc01vZHVsZSA9IChmdW5jID09PSBGdW5jdGlvbigncmV0dXJuICcgKyBjbHNOYW1lKSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xzTmFtZUlzTW9kdWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVuY01vZHVsZUNhY2hlW2Nsc05hbWVdID0gY2xzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsc05hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgaW5kZXggPSB0aGlzLmZ1bmNzLmluZGV4T2YoZnVuYyk7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgaW5kZXggPSB0aGlzLmZ1bmNzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmZ1bmNzLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVzID0gJ0ZbJyArIGluZGV4ICsgJ10nO1xyXG4gICAgaWYgKHVzZWRJbk5ldykge1xyXG4gICAgICAgIHJlcyA9ICcoJyArIHJlcyArICcpJztcclxuICAgIH1cclxuICAgIHRoaXMuZnVuY01vZHVsZUNhY2hlW2Nsc05hbWVdID0gcmVzO1xyXG4gICAgcmV0dXJuIHJlcztcclxufTtcclxuXHJcbnByb3RvLmdldE9ialJlZiA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciBpbmRleCA9IHRoaXMub2Jqcy5pbmRleE9mKG9iaik7XHJcbiAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgaW5kZXggPSB0aGlzLm9ianMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMub2Jqcy5wdXNoKG9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ09bJyArIGluZGV4ICsgJ10nO1xyXG59O1xyXG5cclxucHJvdG8uc2V0VmFsdWVUeXBlID0gZnVuY3Rpb24gKGNvZGVBcnJheSwgZGVmYXVsdFZhbHVlLCBzcmNWYWx1ZSwgdGFyZ2V0RXhwcmVzc2lvbikge1xyXG4gICAgdmFyIGFzc2lnbm1lbnRzID0gQXNzaWdubWVudHMucG9vbC5nZXQodGFyZ2V0RXhwcmVzc2lvbik7XHJcbiAgICB2YXIgZmFzdERlZmluZWRQcm9wcyA9IGRlZmF1bHRWYWx1ZS5jb25zdHJ1Y3Rvci5fX3Byb3BzX187XHJcbiAgICBpZiAoIWZhc3REZWZpbmVkUHJvcHMpIHtcclxuICAgICAgICBmYXN0RGVmaW5lZFByb3BzID0gT2JqZWN0LmtleXMoZGVmYXVsdFZhbHVlKTtcclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmFzdERlZmluZWRQcm9wcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwcm9wTmFtZSA9IGZhc3REZWZpbmVkUHJvcHNbaV07XHJcbiAgICAgICAgdmFyIHByb3AgPSBzcmNWYWx1ZVtwcm9wTmFtZV07XHJcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZVtwcm9wTmFtZV0gPT09IHByb3ApIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBleHByZXNzaW9uID0gdGhpcy5lbnVtZXJhdGVGaWVsZChzcmNWYWx1ZSwgcHJvcE5hbWUsIHByb3ApO1xyXG4gICAgICAgIGFzc2lnbm1lbnRzLmFwcGVuZChwcm9wTmFtZSwgZXhwcmVzc2lvbik7XHJcbiAgICB9XHJcbiAgICBhc3NpZ25tZW50cy53cml0ZUNvZGUoY29kZUFycmF5KTtcclxuICAgIEFzc2lnbm1lbnRzLnBvb2wucHV0KGFzc2lnbm1lbnRzKTtcclxufTtcclxuXHJcbnByb3RvLmVudW1lcmF0ZUNDQ2xhc3MgPSBmdW5jdGlvbiAoY29kZUFycmF5LCBvYmosIGtsYXNzKSB7XHJcbiAgICB2YXIgcHJvcHMgPSBrbGFzcy5fX3ZhbHVlc19fO1xyXG4gICAgdmFyIGF0dHJzID0gQXR0ci5nZXRDbGFzc0F0dHJzKGtsYXNzKTtcclxuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgcHJvcHMubGVuZ3RoOyBwKyspIHtcclxuICAgICAgICB2YXIga2V5ID0gcHJvcHNbcF07XHJcbiAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBhdHRyc1trZXkgKyBERUZBVUxUXTtcclxuICAgICAgICBpZiAoZXF1YWxzVG9EZWZhdWx0KGRlZmF1bHRWYWx1ZSwgdmFsKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCBpbnN0YW5jZW9mIGNjLlZhbHVlVHlwZSkge1xyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBDQ0NsYXNzLmdldERlZmF1bHQoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAmJiBkZWZhdWx0VmFsdWUuY29uc3RydWN0b3IgPT09IHZhbC5jb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgICAgICAgICAgLy8gZmFzdCBjYXNlXHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0RXhwcmVzc2lvbiA9IExPQ0FMX09CSiArIGdldFByb3BBY2Nlc3NvcihrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZVR5cGUoY29kZUFycmF5LCBkZWZhdWx0VmFsdWUsIHZhbCwgdGFyZ2V0RXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldE9ialByb3AoY29kZUFycmF5LCBvYmosIGtleSwgdmFsKTtcclxuICAgIH1cclxufTtcclxuXHJcbnByb3RvLmluc3RhbnRpYXRlQXJyYXkgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm4gJ1tdJztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXJyYXlWYXIgPSBMT0NBTF9BUlJBWSArICgrK3RoaXMubG9jYWxWYXJpYWJsZUlkKTtcclxuICAgIHZhciBkZWNsYXJhdGlvbiA9IG5ldyBEZWNsYXJhdGlvbihhcnJheVZhciwgJ25ldyBBcnJheSgnICsgdmFsdWUubGVuZ3RoICsgJyknKTtcclxuICAgIHZhciBjb2RlQXJyYXkgPSBbZGVjbGFyYXRpb25dO1xyXG5cclxuICAgIC8vIGFzc2lnbiBhIF9pTiR0IGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIG9iamVjdCBoYXMgYmVlbiBwYXJzZWQuXHJcbiAgICBqcy52YWx1ZSh2YWx1ZSwgJ19pTiR0Jywge1xyXG4gICAgICAgIGdsb2JhbFZhcjogJycsICAgICAgLy8gdGhlIG5hbWUgb2YgZGVjbGFyZWQgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgdG8gYWNjZXNzIHRoaXMgb2JqZWN0XHJcbiAgICAgICAgc291cmNlOiBjb2RlQXJyYXksICAvLyB0aGUgc291cmNlIGNvZGUgYXJyYXkgZm9yIHRoaXMgb2JqZWN0XHJcbiAgICB9LCB0cnVlKTtcclxuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKHZhbHVlKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIHN0YXRlbWVudCA9IGFycmF5VmFyICsgJ1snICsgaSArICddPSc7XHJcbiAgICAgICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmVudW1lcmF0ZUZpZWxkKHZhbHVlLCBpLCB2YWx1ZVtpXSk7XHJcbiAgICAgICAgd3JpdGVBc3NpZ25tZW50KGNvZGVBcnJheSwgc3RhdGVtZW50LCBleHByZXNzaW9uKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlQXJyYXk7XHJcbn07XHJcblxyXG5wcm90by5pbnN0YW50aWF0ZVR5cGVkQXJyYXkgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGxldCB0eXBlID0gdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fCBnZXRUeXBlZEFycmF5TmFtZSh2YWx1ZS5jb25zdHJ1Y3Rvcik7XHJcbiAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuICduZXcgJyArIHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFycmF5VmFyID0gTE9DQUxfQVJSQVkgKyAoKyt0aGlzLmxvY2FsVmFyaWFibGVJZCk7XHJcbiAgICBsZXQgZGVjbGFyYXRpb24gPSBuZXcgRGVjbGFyYXRpb24oYXJyYXlWYXIsICduZXcgJyArIHR5cGUgKyAnKCcgKyB2YWx1ZS5sZW5ndGggKyAnKScpO1xyXG4gICAgbGV0IGNvZGVBcnJheSA9IFtkZWNsYXJhdGlvbl07XHJcblxyXG4gICAgLy8gYXNzaWduIGEgX2lOJHQgZmxhZyB0byBpbmRpY2F0ZSB0aGF0IHRoaXMgb2JqZWN0IGhhcyBiZWVuIHBhcnNlZC5cclxuICAgIHZhbHVlLl9pTiR0ID0ge1xyXG4gICAgICAgIGdsb2JhbFZhcjogJycsICAgICAgLy8gdGhlIG5hbWUgb2YgZGVjbGFyZWQgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgdG8gYWNjZXNzIHRoaXMgb2JqZWN0XHJcbiAgICAgICAgc291cmNlOiBjb2RlQXJyYXksICAvLyB0aGUgc291cmNlIGNvZGUgYXJyYXkgZm9yIHRoaXMgb2JqZWN0XHJcbiAgICB9O1xyXG4gICAgdGhpcy5vYmpzVG9DbGVhcl9pTiR0LnB1c2godmFsdWUpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBpZiAodmFsdWVbaV0gIT09IDApIHtcclxuICAgICAgICAgICAgdmFyIHN0YXRlbWVudCA9IGFycmF5VmFyICsgJ1snICsgaSArICddPSc7XHJcbiAgICAgICAgICAgIHdyaXRlQXNzaWdubWVudChjb2RlQXJyYXksIHN0YXRlbWVudCwgdmFsdWVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlQXJyYXk7XHJcbn07XHJcblxyXG5wcm90by5lbnVtZXJhdGVGaWVsZCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIF9pTiR0ID0gdmFsdWUuX2lOJHQ7XHJcbiAgICAgICAgaWYgKF9pTiR0KSB7XHJcbiAgICAgICAgICAgIC8vIHBhcnNlZFxyXG4gICAgICAgICAgICB2YXIgZ2xvYmFsVmFyID0gX2lOJHQuZ2xvYmFsVmFyO1xyXG4gICAgICAgICAgICBpZiAoIWdsb2JhbFZhcikge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVjbGFyZSBhIGdsb2JhbCB2YXJcclxuICAgICAgICAgICAgICAgIGdsb2JhbFZhciA9IF9pTiR0Lmdsb2JhbFZhciA9ICd2JyArICgrK3RoaXMuZ2xvYmFsVmFyaWFibGVJZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFZhcmlhYmxlcy5wdXNoKGdsb2JhbFZhcik7XHJcbiAgICAgICAgICAgICAgICAvLyBpbnNlcnQgYXNzaWdubWVudCBzdGF0ZW1lbnQgdG8gYXNzaWduIHRvIGdsb2JhbCB2YXJcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gX2lOJHQuc291cmNlW0xJTkVfSU5ERVhfT0ZfTkVXX09CSl07XHJcbiAgICAgICAgICAgICAgICBfaU4kdC5zb3VyY2VbTElORV9JTkRFWF9PRl9ORVdfT0JKXSA9IG1lcmdlRGVjbGFyYXRpb24oZ2xvYmFsVmFyICsgJz0nLCBsaW5lKTtcclxuICAgICAgICAgICAgICAgIC8vIGlmICh0eXBlb2YgbGluZSA9PT0nc3RyaW5nJyAmJiBsaW5lLnN0YXJ0c1dpdGgoVkFSKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIC8vIHZhciBvPXh4eCAtPiB2YXIgbz1nbG9iYWw9eHh4XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIExFTl9PRl9WQVJfTyA9IDU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgX2lOJHQuc291cmNlW0xJTkVfSU5ERVhfT0ZfTkVXX09CSl0gPSBsaW5lLnNsaWNlKDAsIExFTl9PRl9WQVJfTykgKyAnPScgKyBnbG9iYWxWYXIgKyBsaW5lLnNsaWNlKExFTl9PRl9WQVJfTyk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbFZhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZVR5cGVkQXJyYXkodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW50aWF0ZUFycmF5KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbnRpYXRlT2JqKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdW5jTW9kdWxlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gZXNjYXBlRm9ySlModmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ19vYmpGbGFncycgJiYgKG9iaiBpbnN0YW5jZW9mIENDT2JqZWN0KSkge1xyXG4gICAgICAgICAgICB2YWx1ZSAmPSBQZXJzaXN0ZW50TWFzaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxucHJvdG8uc2V0T2JqUHJvcCA9IGZ1bmN0aW9uIChjb2RlQXJyYXksIG9iaiwga2V5LCB2YWx1ZSkge1xyXG4gICAgdmFyIHN0YXRlbWVudCA9IExPQ0FMX09CSiArIGdldFByb3BBY2Nlc3NvcihrZXkpICsgJz0nO1xyXG4gICAgdmFyIGV4cHJlc3Npb24gPSB0aGlzLmVudW1lcmF0ZUZpZWxkKG9iaiwga2V5LCB2YWx1ZSk7XHJcbiAgICB3cml0ZUFzc2lnbm1lbnQoY29kZUFycmF5LCBzdGF0ZW1lbnQsIGV4cHJlc3Npb24pO1xyXG59O1xyXG5cclxuLy8gY29kZUFycmF5IC0gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxyXG5wcm90by5lbnVtZXJhdGVPYmplY3QgPSBmdW5jdGlvbiAoY29kZUFycmF5LCBvYmopIHtcclxuICAgIHZhciBrbGFzcyA9IG9iai5jb25zdHJ1Y3RvcjtcclxuICAgIGlmIChjYy5DbGFzcy5faXNDQ0NsYXNzKGtsYXNzKSkge1xyXG4gICAgICAgIHRoaXMuZW51bWVyYXRlQ0NDbGFzcyhjb2RlQXJyYXksIG9iaiwga2xhc3MpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gcHJpbWl0aXZlIGphdmFzY3JpcHQgb2JqZWN0XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAoa2V5LmNoYXJDb2RlQXQoMCkgPT09IDk1ICYmIGtleS5jaGFyQ29kZUF0KDEpID09PSA5NSAmJiAgIC8vIHN0YXJ0cyB3aXRoIFwiX19cIlxyXG4gICAgICAgICAgICAgICAgIGtleSAhPT0gJ19fdHlwZV9fJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUgPT09IG9iai5faU4kdCkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRPYmpQcm9wKGNvZGVBcnJheSwgb2JqLCBrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5wcm90by5pbnN0YW50aWF0ZU9iaiA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBjYy5WYWx1ZVR5cGUpIHtcclxuICAgICAgICByZXR1cm4gQ0NDbGFzcy5nZXROZXdWYWx1ZVR5cGVDb2RlKG9iaik7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuQXNzZXQpIHtcclxuICAgICAgICAvLyByZWdpc3RlciB0byBhc3NldCBsaXN0IGFuZCBqdXN0IHJldHVybiB0aGUgcmVmZXJlbmNlLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5fb2JqRmxhZ3MgJiBEZXN0cm95ZWQpIHtcclxuICAgICAgICAvLyB0aGUgc2FtZSBhcyBjYy5pc1ZhbGlkKG9iailcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3JlYXRlQ29kZTtcclxuICAgIHZhciBjdG9yID0gb2JqLmNvbnN0cnVjdG9yO1xyXG4gICAgaWYgKGNjLkNsYXNzLl9pc0NDQ2xhc3MoY3RvcikpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgY2MuQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlIHx8IG9iaiBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgY2MuX0Jhc2VOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvYmouaXNDaGlsZE9mKHRoaXMucGFyZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgbm90IGNsb25lIG90aGVyIG5vZGVzIGlmIG5vdCBkZXNjZW5kYW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9ialJlZihvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqLm5vZGUuaXNDaGlsZE9mKHRoaXMucGFyZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgbm90IGNsb25lIG90aGVyIGNvbXBvbmVudCBpZiBub3QgZGVzY2VuZGFudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmpSZWYob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY3JlYXRlQ29kZSA9IG5ldyBEZWNsYXJhdGlvbihMT0NBTF9PQkosICduZXcgJyArIHRoaXMuZ2V0RnVuY01vZHVsZShjdG9yLCB0cnVlKSArICcoKScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoY3RvciA9PT0gT2JqZWN0KSB7XHJcbiAgICAgICAgY3JlYXRlQ29kZSA9IG5ldyBEZWNsYXJhdGlvbihMT0NBTF9PQkosICd7fScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIWN0b3IpIHtcclxuICAgICAgICBjcmVhdGVDb2RlID0gbmV3IERlY2xhcmF0aW9uKExPQ0FMX09CSiwgJ09iamVjdC5jcmVhdGUobnVsbCknKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIGRvIG5vdCBjbG9uZSB1bmtub3duIHR5cGVcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRPYmpSZWYob2JqKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY29kZUFycmF5ID0gW2NyZWF0ZUNvZGVdO1xyXG5cclxuICAgIC8vIGFzc2lnbiBhIF9pTiR0IGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGlzIG9iamVjdCBoYXMgYmVlbiBwYXJzZWQuXHJcbiAgICBqcy52YWx1ZShvYmosICdfaU4kdCcsIHtcclxuICAgICAgICBnbG9iYWxWYXI6ICcnLCAgICAgIC8vIHRoZSBuYW1lIG9mIGRlY2xhcmVkIGdsb2JhbCB2YXJpYWJsZSB1c2VkIHRvIGFjY2VzcyB0aGlzIG9iamVjdFxyXG4gICAgICAgIHNvdXJjZTogY29kZUFycmF5LCAgLy8gdGhlIHNvdXJjZSBjb2RlIGFycmF5IGZvciB0aGlzIG9iamVjdFxyXG4gICAgICAgIC8vcHJvcE5hbWU6ICcnLCAgICAgLy8gdGhlIHByb3BOYW1lIHRoaXMgb2JqZWN0IGRlZmluZWQgaW4gaXRzIHNvdXJjZSBjb2RlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgLy8gaWYgZGVmaW5lZCwgdXNlIExPQ0FMX09CSi5wcm9wTmFtZSB0byBhY2Nlc3MgdGhlIG9iaiwgZWxzZSBqdXN0IHVzZSBvXHJcbiAgICB9LCB0cnVlKTtcclxuICAgIHRoaXMub2Jqc1RvQ2xlYXJfaU4kdC5wdXNoKG9iaik7XHJcblxyXG4gICAgdGhpcy5lbnVtZXJhdGVPYmplY3QoY29kZUFycmF5LCBvYmopO1xyXG4gICAgcmV0dXJuIFsnKGZ1bmN0aW9uKCl7JyxcclxuICAgICAgICAgICAgICAgIGNvZGVBcnJheSxcclxuICAgICAgICAgICAgJ3JldHVybiBvO30pKCk7J107XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gY29tcGlsZSAobm9kZSkge1xyXG4gICAgdmFyIHJvb3QgPSAobm9kZSBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkgJiYgbm9kZTtcclxuICAgIHZhciBwYXJzZXIgPSBuZXcgUGFyc2VyKG5vZGUsIHJvb3QpO1xyXG4gICAgcmV0dXJuIHBhcnNlci5yZXN1bHQ7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY29tcGlsZTogY29tcGlsZSxcclxuICAgIGVxdWFsc1RvRGVmYXVsdDogZXF1YWxzVG9EZWZhdWx0XHJcbn07XHJcblxyXG5pZiAoQ0NfVEVTVCkge1xyXG4gICAgY2MuX1Rlc3QuSW50YW50aWF0ZUppdCA9IG1vZHVsZS5leHBvcnRzO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiLyJ9